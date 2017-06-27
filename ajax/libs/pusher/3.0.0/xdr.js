/*!
 * Pusher JavaScript Library v3.0.0
 * http://pusher.com/
 *
 * Copyright 2014, Pusher
 * Released under the MIT licence.
 */

;(function() {
  var MAX_BUFFER_LENGTH = 256*1024;

  function HTTPRequest(hooks, method, url) {
    Pusher.EventsDispatcher.call(this);

    this.hooks = hooks;
    this.method = method;
    this.url = url;
  }
  var prototype = HTTPRequest.prototype;
  Pusher.Util.extend(prototype, Pusher.EventsDispatcher.prototype);

  prototype.start = function(payload) {
    var self = this;

    self.position = 0;
    self.xhr = self.hooks.getRequest(self);

    self.unloader = function() {
      self.close();
    };
    Pusher.Util.addWindowListener("unload", self.unloader);

    self.xhr.open(self.method, self.url, true);
    self.xhr.send(payload);
  };

  prototype.close = function() {
    if (this.unloader) {
      Pusher.Util.removeWindowListener("unload", this.unloader);
      this.unloader = null;
    }
    if (this.xhr) {
      this.hooks.abortRequest(this.xhr);
      this.xhr = null;
    }
  };

  prototype.onChunk = function(status, data) {
    while (true) {
      var chunk = this.advanceBuffer(data);
      if (chunk) {
        this.emit("chunk", { status: status, data: chunk });
      } else {
        break;
      }
    }
    if (this.isBufferTooLong(data)) {
      this.emit("buffer_too_long");
    }
  };

  prototype.advanceBuffer = function(buffer) {
    var unreadData = buffer.slice(this.position);
    var endOfLinePosition = unreadData.indexOf("\n");

    if (endOfLinePosition !== -1) {
      this.position += endOfLinePosition + 1;
      return unreadData.slice(0, endOfLinePosition);
    } else {
      // chunk is not finished yet, don't move the buffer pointer
      return null;
    }
  };

  prototype.isBufferTooLong = function(buffer) {
    return this.position === buffer.length && buffer.length > MAX_BUFFER_LENGTH;
  };

  Pusher.HTTP.Request = HTTPRequest;
}).call(this);

;(function() {
  var hooks = {
    getRequest: function(socket) {
      var xdr = new window.XDomainRequest();
      xdr.ontimeout = function() {
        socket.emit("error", new Pusher.Errors.RequestTimedOut());
        socket.close();
      };
      xdr.onerror = function(e) {
        socket.emit("error", e);
        socket.close();
      };
      xdr.onprogress = function() {
        if (xdr.responseText && xdr.responseText.length > 0) {
          socket.onChunk(200, xdr.responseText);
        }
      };
      xdr.onload = function() {
        if (xdr.responseText && xdr.responseText.length > 0) {
          socket.onChunk(200, xdr.responseText);
        }
        socket.emit("finished", 200);
        socket.close();
      };
      return xdr;
    },
    abortRequest: function(xdr) {
      xdr.ontimeout = xdr.onerror = xdr.onprogress = xdr.onload = null;
      xdr.abort();
    }
  };

  Pusher.HTTP.getXDR = function(method, url) {
    return new Pusher.HTTP.Request(hooks, method, url);
  };
}).call(this);

;(function() {
  var CONNECTING = 0;
  var OPEN = 1;
  var CLOSED = 3;

  var autoIncrement = 1;

  function HTTPSocket(hooks, url) {
    this.hooks = hooks;
    this.session = randomNumber(1000) + "/" + randomString(8);
    this.location = getLocation(url);
    this.readyState = CONNECTING;
    this.openStream();
  }
  var prototype = HTTPSocket.prototype;

  prototype.send = function(payload) {
    return this.sendRaw(JSON.stringify([payload]));
  };

  prototype.ping = function() {
    this.hooks.sendHeartbeat(this);
  };

  prototype.close = function(code, reason) {
    this.onClose(code, reason, true);
  };

  /** For internal use only */
  prototype.sendRaw = function(payload) {
    if (this.readyState === OPEN) {
      try {
        createRequest(
          "POST", getUniqueURL(getSendURL(this.location, this.session))
        ).start(payload);
        return true;
      } catch(e) {
        return false;
      }
    } else {
      return false;
    }
  };

  /** For internal use only */
  prototype.reconnect = function() {
    this.closeStream();
    this.openStream();
  };

  /** For internal use only */
  prototype.onClose = function(code, reason, wasClean) {
    this.closeStream();
    this.readyState = CLOSED;
    if (this.onclose) {
      this.onclose({
        code: code,
        reason: reason,
        wasClean: wasClean
      });
    }
  };

  /** @private */
  prototype.onChunk = function(chunk) {
    if (chunk.status !== 200) {
      return;
    }
    if (this.readyState === OPEN) {
      this.onActivity();
    }

    var payload;
    var type = chunk.data.slice(0, 1);
    switch(type) {
      case 'o':
        payload = JSON.parse(chunk.data.slice(1) || '{}');
        this.onOpen(payload);
        break;
      case 'a':
        payload = JSON.parse(chunk.data.slice(1) || '[]');
        for (var i = 0; i < payload.length; i++){
          this.onEvent(payload[i]);
        }
        break;
      case 'm':
        payload = JSON.parse(chunk.data.slice(1) || 'null');
        this.onEvent(payload);
        break;
      case 'h':
        this.hooks.onHeartbeat(this);
        break;
      case 'c':
        payload = JSON.parse(chunk.data.slice(1) || '[]');
        this.onClose(payload[0], payload[1], true);
        break;
    }
  };

  /** @private */
  prototype.onOpen = function(options) {
    if (this.readyState === CONNECTING) {
      if (options && options.hostname) {
        this.location.base = replaceHost(this.location.base, options.hostname);
      }
      this.readyState = OPEN;

      if (this.onopen) {
        this.onopen();
      }
    } else {
      this.onClose(1006, "Server lost session", true);
    }
  };

  /** @private */
  prototype.onEvent = function(event) {
    if (this.readyState === OPEN && this.onmessage) {
      this.onmessage({ data: event });
    }
  };

  /** @private */
  prototype.onActivity = function() {
    if (this.onactivity) {
      this.onactivity();
    }
  };

  /** @private */
  prototype.onError = function(error) {
    if (this.onerror) {
      this.onerror(error);
    }
  };

  /** @private */
  prototype.openStream = function() {
    var self = this;

    self.stream = createRequest(
      "POST",
      getUniqueURL(self.hooks.getReceiveURL(self.location, self.session))
    );

    self.stream.bind("chunk", function(chunk) {
      self.onChunk(chunk);
    });
    self.stream.bind("finished", function(status) {
      self.hooks.onFinished(self, status);
    });
    self.stream.bind("buffer_too_long", function() {
      self.reconnect();
    });

    try {
      self.stream.start();
    } catch (error) {
      Pusher.Util.defer(function() {
        self.onError(error);
        self.onClose(1006, "Could not start streaming", false);
      });
    }
  };

  /** @private */
  prototype.closeStream = function() {
    if (this.stream) {
      this.stream.unbind_all();
      this.stream.close();
      this.stream = null;
    }
  };

  function getLocation(url) {
    var parts = /([^\?]*)\/*(\??.*)/.exec(url);
    return {
      base: parts[1],
      queryString: parts[2]
    };
  }

  function getSendURL(url, session) {
    return url.base + "/" + session + "/xhr_send";
  }

  function getUniqueURL(url) {
    var separator = (url.indexOf('?') === -1) ? "?" : "&";
    return url + separator + "t=" + (+new Date()) + "&n=" + autoIncrement++;
  }

  function replaceHost(url, hostname) {
    var urlParts = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(url);
    return urlParts[1] + hostname + urlParts[3];
  }

  function randomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  function randomString(length) {
    var result = [];
    for (var i = 0; i < length; i++) {
      result.push(randomNumber(32).toString(32));
    }
    return result.join('');
  }

  function createRequest(method, url) {
    if (Pusher.Util.isXHRSupported()) {
      return Pusher.HTTP.getXHR(method, url);
    } else if (Pusher.Util.isXDRSupported(url.indexOf("https:") === 0)) {
      return Pusher.HTTP.getXDR(method, url);
    } else {
      throw "Cross-origin HTTP requests are not supported";
    }
  }

  Pusher.HTTP.Socket = HTTPSocket;
}).call(this);

;(function() {
  var hooks = {
    getReceiveURL: function(url, session) {
      return url.base + "/" + session + "/xhr_streaming" + url.queryString;
    },
    onHeartbeat: function(socket) {
      socket.sendRaw("[]");
    },
    sendHeartbeat: function(socket) {
      socket.sendRaw("[]");
    },
    onFinished: function(socket, status) {
      socket.onClose(1006, "Connection interrupted (" + status + ")", false);
    }
  };

  Pusher.HTTP.getStreamingSocket = function(url) {
    return new Pusher.HTTP.Socket(hooks, url);
  };
}).call(this);

;(function() {
  var hooks = {
    getReceiveURL: function(url, session) {
      return url.base + "/" + session + "/xhr" + url.queryString;
    },
    onHeartbeat: function() {
      // next HTTP request will reset server's activity timer
    },
    sendHeartbeat: function(socket) {
      socket.sendRaw("[]");
    },
    onFinished: function(socket, status) {
      if (status === 200) {
        socket.reconnect();
      } else {
        socket.onClose(1006, "Connection interrupted (" + status + ")", false);
      }
    }
  };

  Pusher.HTTP.getPollingSocket = function(url) {
    return new Pusher.HTTP.Socket(hooks, url);
  };
}).call(this);

