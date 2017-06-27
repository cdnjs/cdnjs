// XHook - v1.2.4 - https://github.com/jpillora/xhook
// Jaime Pillora <dev@jpillora.com> - MIT Copyright 2014
(function(window,undefined) {var AFTER, BEFORE, COMMON_EVENTS, EventEmitter, FIRE, FormData, NativeFormData, OFF, ON, READY_STATE, UPLOAD_EVENTS, XHookHttpRequest, XMLHTTP, convertHeaders, document, fakeEvent, mergeObjects, proxyEvents, slice, xhook, _base,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

document = window.document;

BEFORE = 'before';

AFTER = 'after';

READY_STATE = 'readyState';

ON = 'addEventListener';

OFF = 'removeEventListener';

FIRE = 'dispatchEvent';

XMLHTTP = 'XMLHttpRequest';

FormData = 'FormData';

UPLOAD_EVENTS = ['load', 'loadend', 'loadstart'];

COMMON_EVENTS = ['progress', 'abort', 'error', 'timeout'];

(_base = Array.prototype).indexOf || (_base.indexOf = function(item) {
  var i, x, _i, _len;
  for (i = _i = 0, _len = this.length; _i < _len; i = ++_i) {
    x = this[i];
    if (x === item) {
      return i;
    }
  }
  return -1;
});

slice = function(o, n) {
  return Array.prototype.slice.call(o, n);
};

mergeObjects = function(src, dst) {
  var k, v;
  for (k in src) {
    v = src[k];
    if (k === "returnValue") {
      continue;
    }
    try {
      dst[k] = src[k];
    } catch (_error) {}
  }
  return dst;
};

proxyEvents = function(events, src, dst) {
  var event, p, _i, _len;
  p = function(event) {
    return function(e) {
      var clone, k, val;
      clone = {};
      for (k in e) {
        if (k === "returnValue") {
          continue;
        }
        val = e[k];
        clone[k] = val === src ? dst : val;
      }
      clone;
      return dst[FIRE](event, clone);
    };
  };
  for (_i = 0, _len = events.length; _i < _len; _i++) {
    event = events[_i];
    src["on" + event] = p(event);
  }
};

fakeEvent = function(type) {
  var msieEventObject;
  if (document.createEventObject != null) {
    msieEventObject = document.createEventObject();
    msieEventObject.type = type;
    return msieEventObject;
  } else {
    try {
      return new Event(type);
    } catch (_error) {
      return {
        type: type
      };
    }
  }
};

EventEmitter = function(nodeStyle) {
  var emitter, events, listeners;
  events = {};
  listeners = function(event) {
    return events[event] || [];
  };
  emitter = {};
  emitter[ON] = function(event, callback, i) {
    events[event] = listeners(event);
    if (events[event].indexOf(callback) >= 0) {
      return;
    }
    i = i === undefined ? events[event].length : i;
    events[event].splice(i, 0, callback);
  };
  emitter[OFF] = function(event, callback) {
    var i;
    i = listeners(event).indexOf(callback);
    if (i === -1) {
      return;
    }
    listeners(event).splice(i, 1);
  };
  emitter[FIRE] = function() {
    var args, event, i, legacylistener, listener, _i, _len, _ref;
    args = slice(arguments);
    event = args.shift();
    if (!nodeStyle) {
      args[0] = mergeObjects(args[0], fakeEvent(event));
    }
    legacylistener = emitter["on" + event];
    if (legacylistener) {
      legacylistener.apply(undefined, args);
    }
    _ref = listeners(event).concat(listeners("*"));
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      listener = _ref[i];
      listener.apply(undefined, args);
    }
  };
  if (nodeStyle) {
    emitter.listeners = function(event) {
      return slice(listeners(event));
    };
    emitter.on = emitter[ON];
    emitter.off = emitter[OFF];
    emitter.fire = emitter[FIRE];
    emitter.once = function(e, fn) {
      var fire;
      fire = function() {
        emitter.off(e, fire);
        return fn.apply(null, arguments);
      };
      return emitter.on(e, fire);
    };
    emitter.destroy = function() {
      return events = {};
    };
  }
  return emitter;
};

xhook = EventEmitter(true);

xhook.EventEmitter = EventEmitter;

xhook[BEFORE] = function(handler, i) {
  if (handler.length < 1 || handler.length > 2) {
    throw "invalid hook";
  }
  return xhook[ON](BEFORE, handler, i);
};

xhook[AFTER] = function(handler, i) {
  if (handler.length < 2 || handler.length > 3) {
    throw "invalid hook";
  }
  return xhook[ON](AFTER, handler, i);
};

xhook.enable = function() {
  window[XMLHTTP] = XHookHttpRequest;
};

xhook.disable = function() {
  window[XMLHTTP] = xhook[XMLHTTP];
};

convertHeaders = xhook.headers = function(h, dest) {
  var header, headers, k, name, v, value, _i, _len, _ref;
  if (dest == null) {
    dest = {};
  }
  switch (typeof h) {
    case "object":
      headers = [];
      for (k in h) {
        v = h[k];
        name = k.toLowerCase();
        headers.push("" + name + ":\t" + v);
      }
      return headers.join('\n');
    case "string":
      headers = h.split('\n');
      for (_i = 0, _len = headers.length; _i < _len; _i++) {
        header = headers[_i];
        if (/([^:]+):\s*(.+)/.test(header)) {
          name = (_ref = RegExp.$1) != null ? _ref.toLowerCase() : void 0;
          value = RegExp.$2;
          if (dest[name] == null) {
            dest[name] = value;
          }
        }
      }
      return dest;
  }
};

NativeFormData = window[FormData];

if (NativeFormData) {
  xhook[FormData] = NativeFormData;
  window[FormData] = function(form) {
    var entries;
    this.fd = form ? new NativeFormData(form) : new NativeFormData();
    this.form = form;
    entries = [];
    Object.defineProperty(this, 'entries', {
      get: function() {
        var fentries;
        fentries = !form ? [] : slice(form.querySelectorAll("input,select")).filter(function(e) {
          var _ref;
          return ((_ref = e.type) !== 'checkbox' && _ref !== 'radio') || e.checked;
        }).map(function(e) {
          return [e.name, e.type === "file" ? e.files : e.value];
        });
        return fentries.concat(entries);
      }
    });
    this.append = (function(_this) {
      return function() {
        var args;
        args = slice(arguments);
        entries.push(args);
        return _this.fd.append.apply(_this.fd, args);
      };
    })(this);
  };
}

xhook[XMLHTTP] = window[XMLHTTP];

XHookHttpRequest = window[XMLHTTP] = function() {
  var currentState, emitFinal, emitReadyState, facade, hasError, hasErrorHandler, readBody, readHead, request, response, setReadyState, transiting, writeBody, writeHead, xhr;
  xhr = new xhook[XMLHTTP]();
  hasError = false;
  transiting = false;
  request = {};
  request.headers = {};
  request.headerNames = {};
  response = {};
  response.headers = {};
  readHead = function() {
    var key, name, val, _ref;
    response.status = xhr.status;
    response.statusText = xhr.statusText;
    _ref = convertHeaders(xhr.getAllResponseHeaders());
    for (key in _ref) {
      val = _ref[key];
      if (!response.headers[key]) {
        name = key.toLowerCase();
        response.headers[name] = val;
      }
    }
  };
  readBody = function() {
    try {
      response.text = xhr.responseText;
    } catch (_error) {}
    try {
      response.xml = xhr.responseXML;
    } catch (_error) {}
    response.data = xhr.response || response.text;
  };
  writeHead = function() {
    facade.status = response.status;
    facade.statusText = response.statusText;
  };
  writeBody = function() {
    if (response.hasOwnProperty('text')) {
      facade.responseText = response.text;
    }
    if (response.hasOwnProperty('xml')) {
      facade.responseXML = response.xml;
    }
    facade.response = response.data || null;
  };
  emitReadyState = function(n) {
    while (n > currentState && currentState < 4) {
      facade[READY_STATE] = ++currentState;
      if (currentState === 1) {
        facade[FIRE]("loadstart", {});
      }
      if (currentState === 2) {
        writeHead();
      }
      if (currentState === 4) {
        writeHead();
        writeBody();
      }
      facade[FIRE]("readystatechange", {});
      if (currentState === 4) {
        setTimeout(emitFinal, 0);
      }
    }
  };
  emitFinal = function() {
    if (!hasError) {
      facade[FIRE]("load", {});
    }
    facade[FIRE]("loadend", {});
    if (hasError) {
      facade[READY_STATE] = 0;
    }
  };
  currentState = 0;
  setReadyState = function(n) {
    var hooks, process;
    if (n !== 4) {
      emitReadyState(n);
      return;
    }
    hooks = xhook.listeners(AFTER);
    process = function() {
      var hook;
      if (!hooks.length) {
        return emitReadyState(4);
      }
      hook = hooks.shift();
      if (hook.length === 2) {
        hook(request, response);
        return process();
      } else if (hook.length === 3 && request.async) {
        return hook(request, response, process);
      } else {
        return process();
      }
    };
    process();
  };
  facade = request.xhr = EventEmitter();
  xhr.onreadystatechange = function(event) {
    try {
      if (xhr[READY_STATE] === 2) {
        readHead();
      }
    } catch (_error) {}
    if (xhr[READY_STATE] === 4) {
      transiting = false;
      readHead();
      readBody();
    }
    setReadyState(xhr[READY_STATE]);
  };
  hasErrorHandler = function() {
    hasError = true;
  };
  facade[ON]('error', hasErrorHandler);
  facade[ON]('timeout', hasErrorHandler);
  facade[ON]('abort', hasErrorHandler);
  facade[ON]('progress', function() {
    if (currentState < 3) {
      setReadyState(3);
    } else {
      facade[FIRE]("readystatechange", {});
    }
  });
  proxyEvents(COMMON_EVENTS, xhr, facade);
  if ('withCredentials' in xhr || xhook.addWithCredentials) {
    facade.withCredentials = false;
  }
  facade.status = 0;
  facade.open = function(method, url, async, user, pass) {
    request.method = method;
    request.url = url;
    request.async = async !== false;
    request.user = user;
    request.pass = pass;
    setReadyState(1);
  };
  facade.send = function(body) {
    var hooks, k, modk, process, send, _i, _len, _ref;
    _ref = ['type', 'timeout', 'withCredentials'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      modk = k === "type" ? "responseType" : k;
      if (modk in facade) {
        request[k] = facade[modk];
      }
    }
    request.body = body;
    send = function() {
      var header, value, _j, _len1, _ref1, _ref2;
      transiting = true;
      xhr.open(request.method, request.url, request.async, request.user, request.pass);
      _ref1 = ['type', 'timeout', 'withCredentials'];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        k = _ref1[_j];
        modk = k === "type" ? "responseType" : k;
        if (k in request) {
          xhr[modk] = request[k];
        }
      }
      _ref2 = request.headers;
      for (header in _ref2) {
        value = _ref2[header];
        xhr.setRequestHeader(header, value);
      }
      if (window[FormData] && request.body instanceof window[FormData]) {
        request.body = request.body.fd;
      }
      xhr.send(request.body);
    };
    hooks = xhook.listeners(BEFORE);
    process = function() {
      var done, hook;
      if (!hooks.length) {
        return send();
      }
      done = function(userResponse) {
        if (typeof userResponse === 'object' && (typeof userResponse.status === 'number' || typeof response.status === 'number')) {
          mergeObjects(userResponse, response);
          if (__indexOf.call(userResponse, 'data') < 0) {
            userResponse.data = userResponse.response || userResponse.text;
          }
          setReadyState(4);
          return;
        }
        process();
      };
      done.head = function(userResponse) {
        mergeObjects(userResponse, response);
        return setReadyState(2);
      };
      done.progress = function(userResponse) {
        mergeObjects(userResponse, response);
        return setReadyState(3);
      };
      hook = hooks.shift();
      if (hook.length === 1) {
        return done(hook(request));
      } else if (hook.length === 2 && request.async) {
        return hook(request, done);
      } else {
        return done();
      }
    };
    process();
  };
  facade.abort = function() {
    if (transiting) {
      xhr.abort();
    } else {
      facade[FIRE]('abort', {});
    }
  };
  facade.setRequestHeader = function(header, value) {
    var lName, name;
    lName = header != null ? header.toLowerCase() : void 0;
    name = request.headerNames[lName] = request.headerNames[lName] || header;
    if (request.headers[name]) {
      value = request.headers[name] + ', ' + value;
    }
    request.headers[name] = value;
  };
  facade.getResponseHeader = function(header) {
    var name;
    name = header != null ? header.toLowerCase() : void 0;
    return response.headers[name];
  };
  facade.getAllResponseHeaders = function() {
    return convertHeaders(response.headers);
  };
  if (xhr.overrideMimeType) {
    facade.overrideMimeType = function() {
      return xhr.overrideMimeType.apply(xhr, arguments);
    };
  }
  if (xhr.upload) {
    facade.upload = request.upload = EventEmitter();
    proxyEvents(COMMON_EVENTS.concat(UPLOAD_EVENTS), xhr.upload, facade.upload);
  }
  return facade;
};

if (typeof this.define === "function" && this.define.amd) {
  define("xhook", [], function() {
    return xhook;
  });
} else {
  (this.exports || this).xhook = xhook;
}
}.call(this,window));