/** @license
 * eventsource.js
 * Available under MIT License (MIT)
 * https://github.com/Yaffle/EventSource/
 */

/*jslint indent: 2, vars: true, plusplus: true */
/*global setTimeout, clearTimeout */

(function (global) {
  "use strict";

  function Map() {
    this.data = {};
  }

  Map.prototype = {
    get: function (key) {
      return this.data[key + "~"];
    },
    set: function (key, value) {
      this.data[key + "~"] = value;
    },
    "delete": function (key) {
      delete this.data[key + "~"];
    }
  };

  function EventTarget() {
    this.listeners = new Map();
  }

  function throwError(e) {
    setTimeout(function () {
      throw e;
    }, 0);
  }

  EventTarget.prototype = {
    dispatchEvent: function (event) {
      event.target = this;
      var type = event.type.toString();
      var listeners = this.listeners;
      var typeListeners = listeners.get(type);
      if (typeListeners === undefined) {
        return;
      }
      var length = typeListeners.length;
      var i = -1;
      var listener = undefined;
      while (++i < length) {
        listener = typeListeners[i];
        try {
          listener.call(this, event);
        } catch (e) {
          throwError(e);
        }
      }
    },
    addEventListener: function (type, callback) {
      type = type.toString();
      var listeners = this.listeners;
      var typeListeners = listeners.get(type);
      if (typeListeners === undefined) {
        typeListeners = [];
        listeners.set(type, typeListeners);
      }
      var i = typeListeners.length;
      while (--i >= 0) {
        if (typeListeners[i] === callback) {
          return;
        }
      }
      typeListeners.push(callback);
    },
    removeEventListener: function (type, callback) {
      type = type.toString();
      var listeners = this.listeners;
      var typeListeners = listeners.get(type);
      if (typeListeners === undefined) {
        return;
      }
      var length = typeListeners.length;
      var filtered = [];
      var i = -1;
      while (++i < length) {
        if (typeListeners[i] !== callback) {
          filtered.push(typeListeners[i]);
        }
      }
      if (filtered.length === 0) {
        listeners["delete"](type);
      } else {
        listeners.set(type, filtered);
      }
    }
  };

  function Event(type) {
    this.type = type;
    this.target = undefined;
  }

  function MessageEvent(type, options) {
    Event.call(this, type);
    this.data = options.data;
    this.lastEventId = options.lastEventId;
  }

  MessageEvent.prototype = Event.prototype;

  var XHR = global.XMLHttpRequest;
  var XDR = global.XDomainRequest;
  var isCORSSupported = XHR !== undefined && (new XHR()).withCredentials !== undefined;
  var isXHR = isCORSSupported;
  var Transport = isCORSSupported ? XHR : (XDR !== undefined ? XDR : undefined);
  var WAITING = -1;
  var CONNECTING = 0;
  var OPEN = 1;
  var CLOSED = 2;
  var AFTER_CR = 3;
  var FIELD_START = 4;
  var FIELD = 5;
  var VALUE_START = 6;
  var VALUE = 7;
  var contentTypeRegExp = /^text\/event\-stream;?(\s*charset\=utf\-8)?$/i;

  var MINIMUM_DURATION = 1000;
  var MAXIMUM_DURATION = 18000000;

  function getDuration(value, def) {
    var n = value;
    if (n !== n) {
      n = def;
    }
    return (n < MINIMUM_DURATION ? MINIMUM_DURATION : (n > MAXIMUM_DURATION ? MAXIMUM_DURATION : n));
  }

  function fire(that, f, event) {
    try {
      if (typeof f === "function") {
        f.call(that, event);
      }
    } catch (e) {
      throwError(e);
    }
  }

  function EventSource(url, options) {
    url = url.toString();

    var withCredentials = isCORSSupported && options !== undefined && Boolean(options.withCredentials);
    var initialRetry = getDuration(1000, 0);
    var heartbeatTimeout = getDuration(45000, 0);

    var lastEventId = "";
    var that = this;
    var retry = initialRetry;
    var wasActivity = false;
    var xhr = new Transport();
    var timeout = 0;
    var timeout0 = 0;
    var charOffset = 0;
    var currentState = WAITING;
    var dataBuffer = [];
    var lastEventIdBuffer = "";
    var eventTypeBuffer = "";
    var onTimeout = undefined;

    var state = FIELD_START;
    var field = "";
    var value = "";

    function close() {
      currentState = CLOSED;
      if (xhr !== undefined) {
        xhr.abort();
        xhr = undefined;
      }
      if (timeout !== 0) {
        clearTimeout(timeout);
        timeout = 0;
      }
      if (timeout0 !== 0) {
        clearTimeout(timeout0);
        timeout0 = 0;
      }
      that.readyState = CLOSED;
    }

    function onEvent(type) {
      var responseText = currentState === OPEN || currentState === CONNECTING ? xhr.responseText : "";
      var event = undefined;
      var isWrongStatusCodeOrContentType = false;

      if (currentState === CONNECTING) {
        var status = 0;
        var statusText = "";
        var contentType = undefined;
        if (isXHR) {
          try {
            status = xhr.status;
            statusText = xhr.statusText;
            contentType = xhr.getResponseHeader("Content-Type");
          } catch (error) {
            // https://bugs.webkit.org/show_bug.cgi?id=29121
            status = 0;
            statusText = "";
            contentType = undefined;
            // FF < 14, WebKit
            // https://bugs.webkit.org/show_bug.cgi?id=29658
            // https://bugs.webkit.org/show_bug.cgi?id=77854
          }
        } else if (type !== "" && type !== "error") {
          status = 200;
          statusText = "OK";
          contentType = xhr.contentType;
        }
        if (contentType === undefined || contentType === null) {
          contentType = "";
        }
        if (status === 0 && statusText === "" && type === "load" && responseText !== "") {
          status = 200;
          statusText = "OK";
          if (contentType === "") { // Opera 12
            var tmp = (/^data\:([^,]*?)(?:;base64)?,[\S]*$/).exec(url);
            if (tmp !== undefined && tmp !== null) {
              contentType = tmp[1];
            }
          }
        }
        if (status === 200 && contentTypeRegExp.test(contentType)) {
          currentState = OPEN;
          wasActivity = true;
          retry = initialRetry;
          that.readyState = OPEN;
          event = new Event("open");
          that.dispatchEvent(event);
          fire(that, that.onopen, event);
          if (currentState === CLOSED) {
            return;
          }
        } else {
          if (status !== 0) {
            var message = "";
            if (status !== 200) {
              message = "EventSource's response has a status " + status + " " + statusText.replace(/\s+/g, " ") + " that is not 200. Aborting the connection.";
            } else {
              message = "EventSource's response has a Content-Type specifying an unsupported type: " + contentType.replace(/\s+/g, " ") + ". Aborting the connection.";
            }
            setTimeout(function () {
              throw new Error(message);
            }, 0);
            isWrongStatusCodeOrContentType = true;
          }
        }
      }

      if (currentState === OPEN) {
        if (responseText.length > charOffset) {
          wasActivity = true;
        }
        var i = charOffset - 1;
        var length = responseText.length;
        var c = "\n";
        while (++i < length) {
          c = responseText.charAt(i);
          if (state === AFTER_CR && c === "\n") {
            state = FIELD_START;
          } else {
            if (state === AFTER_CR) {
              state = FIELD_START;
            }
            if (c === "\r" || c === "\n") {
              if (field === "data") {
                dataBuffer.push(value);
              } else if (field === "id") {
                lastEventIdBuffer = value;
              } else if (field === "event") {
                eventTypeBuffer = value;
              } else if (field === "retry") {
                initialRetry = getDuration(Number(value), initialRetry);
                retry = initialRetry;
              } else if (field === "heartbeatTimeout") {
                heartbeatTimeout = getDuration(Number(value), heartbeatTimeout);
                if (timeout !== 0) {
                  clearTimeout(timeout);
                  timeout = setTimeout(onTimeout, heartbeatTimeout);
                }
              }
              value = "";
              field = "";
              if (state === FIELD_START) {
                if (dataBuffer.length !== 0) {
                  lastEventId = lastEventIdBuffer;
                  if (eventTypeBuffer === "") {
                    eventTypeBuffer = "message";
                  }
                  event = new MessageEvent(eventTypeBuffer, {
                    data: dataBuffer.join("\n"),
                    lastEventId: lastEventIdBuffer
                  });
                  that.dispatchEvent(event);
                  if (eventTypeBuffer === "message") {
                    fire(that, that.onmessage, event);
                  }
                  if (currentState === CLOSED) {
                    return;
                  }
                }
                dataBuffer.length = 0;
                eventTypeBuffer = "";
              }
              state = c === "\r" ? AFTER_CR : FIELD_START;
            } else {
              if (state === FIELD_START) {
                state = FIELD;
              }
              if (state === FIELD) {
                if (c === ":") {
                  state = VALUE_START;
                } else {
                  field += c;
                }
              } else if (state === VALUE_START) {
                if (c !== " ") {
                  value += c;
                }
                state = VALUE;
              } else if (state === VALUE) {
                value += c;
              }
            }
          }
        }
        charOffset = length;
      }

      if ((currentState === OPEN || currentState === CONNECTING) &&
          (type === "load" || type === "error" || isWrongStatusCodeOrContentType || (charOffset > 1024 * 1024) || (timeout === 0 && !wasActivity))) {
        if (isWrongStatusCodeOrContentType) {
          close();
        } else {
          currentState = WAITING;
          xhr.abort();
          if (timeout !== 0) {
            clearTimeout(timeout);
            timeout = 0;
          }
          if (retry > initialRetry * 16) {
            retry = initialRetry * 16;
          }
          if (retry > MAXIMUM_DURATION) {
            retry = MAXIMUM_DURATION;
          }
          timeout = setTimeout(onTimeout, retry);
          retry = retry * 2 + 1;

          that.readyState = CONNECTING;
        }
        event = new Event("error");
        that.dispatchEvent(event);
        fire(that, that.onerror, event);
      } else {
        if (timeout === 0) {
          wasActivity = false;
          timeout = setTimeout(onTimeout, heartbeatTimeout);
        }
      }
    }

    function onProgress() {
      onEvent("progress");
    }

    function onLoad() {
      onEvent("load");
    }

    function onError() {
      onEvent("error");
    }

    if (isXHR) {
      // workaround for Opera issue with "progress" events
      timeout0 = setTimeout(function f() {
        if (xhr.readyState === 3) {
          onEvent("progress");
        }
        timeout0 = setTimeout(f, 500);
      }, 0);
    }

    onTimeout = function () {
      timeout = 0;
      if (currentState !== WAITING) {
        onEvent("");
        return;
      }
      // loading indicator in Safari, Chrome < 14, Firefox
      // https://bugzilla.mozilla.org/show_bug.cgi?id=736723
      if (isXHR && (xhr.sendAsBinary !== undefined || xhr.onloadend === undefined) && global.document !== undefined && global.document.readyState !== undefined && global.document.readyState !== "complete") {
        timeout = setTimeout(onTimeout, 4);
        return;
      }
      // XDomainRequest#abort removes onprogress, onerror, onload

      xhr.onload = onLoad;
      xhr.onerror = onError;

      if (isXHR) {
        // improper fix to match Firefox behaviour, but it is better than just ignore abort
        // see https://bugzilla.mozilla.org/show_bug.cgi?id=768596
        // https://bugzilla.mozilla.org/show_bug.cgi?id=880200
        // https://code.google.com/p/chromium/issues/detail?id=153570
        xhr.onabort = onError;

        // Firefox 3.5 - 3.6 - ? < 9.0
        // onprogress is not fired sometimes or delayed
        xhr.onreadystatechange = onProgress;
      }

      xhr.onprogress = onProgress;

      wasActivity = false;
      timeout = setTimeout(onTimeout, heartbeatTimeout);

      charOffset = 0;
      currentState = CONNECTING;
      dataBuffer.length = 0;
      eventTypeBuffer = "";
      lastEventIdBuffer = lastEventId;
      value = "";
      field = "";
      state = FIELD_START;

      var s = url.slice(0, 5);
      if (s !== "data:" && s !== "blob:") {
        s = url + ((url.indexOf("?", 0) === -1 ? "?" : "&") + "lastEventId=" + encodeURIComponent(lastEventId) + "&r=" + (Math.random() + 1).toString().slice(2));
      } else {
        s = url;
      }
      xhr.open("GET", s, true);

      if (isXHR) {
        // withCredentials should be set after "open" for Safari and Chrome (< 19 ?)
        xhr.withCredentials = withCredentials;

        xhr.responseType = "text";

        // Request header field Cache-Control is not allowed by Access-Control-Allow-Headers.
        // "Cache-control: no-cache" are not honored in Chrome and Firefox
        // https://bugzilla.mozilla.org/show_bug.cgi?id=428916
        //xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Accept", "text/event-stream");
        // Request header field Last-Event-ID is not allowed by Access-Control-Allow-Headers.
        //xhr.setRequestHeader("Last-Event-ID", lastEventId);
      }

      xhr.send(undefined);
    };

    EventTarget.call(this);
    this.close = close;
    this.url = url;
    this.readyState = CONNECTING;
    this.withCredentials = withCredentials;

    this.onopen = undefined;
    this.onmessage = undefined;
    this.onerror = undefined;

    onTimeout();
  }

  function F() {
    this.CONNECTING = CONNECTING;
    this.OPEN = OPEN;
    this.CLOSED = CLOSED;
  }
  F.prototype = EventTarget.prototype;

  EventSource.prototype = new F();
  F.call(EventSource);

  var isEventSourceSupported = function () {
    if (global.EventSource !== undefined) {
      try {
        var es = new global.EventSource("data:text/event-stream;charset=utf-8,");
        es.close();
        return es.withCredentials === false &&
               es.url !== ""; // to filter out Opera 12 implementation
      } catch (error) {
        throwError(error);
      }
    }
    return false;
  };

  if (Transport !== undefined && !isEventSourceSupported()) {
    // Why replace a native EventSource ?
    // https://bugzilla.mozilla.org/show_bug.cgi?id=444328
    // https://bugzilla.mozilla.org/show_bug.cgi?id=831392
    // https://code.google.com/p/chromium/issues/detail?id=260144
    // https://code.google.com/p/chromium/issues/detail?id=225654
    // ...
    global.NativeEventSource = global.EventSource;
    global.EventSource = EventSource;
  }

}(this));
