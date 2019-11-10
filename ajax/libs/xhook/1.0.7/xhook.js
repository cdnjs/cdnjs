// XHook - v0.1.2 - https://github.com/jpillora/xhook
// Jaime Pillora <dev@jpillora.com> - MIT Copyright 2013
(function(window,document,undefined) {
var EVENTS, FNS, PROPS, READY_STATE, RESPONSE_TEXT, WITH_CREDS, convertHeaders, create, patchClass, patchXhr, xhook, xhooks,
  __slice = [].slice;

FNS = ["open", "setRequestHeader", "send", "abort", "getAllResponseHeaders", "getResponseHeader", "overrideMimeType"];

EVENTS = ["readystatechange", "progress", "loadstart", "loadend", "load", "error", "abort"];

PROPS = ["readyState", "responseText", "withCredentials", "statusText", "status", "response", "responseType", "responseXML", "upload"];

READY_STATE = PROPS[0];

RESPONSE_TEXT = PROPS[1];

WITH_CREDS = PROPS[2];

create = function(parent) {
  var F;
  F = function() {};
  F.prototype = parent;
  return new F;
};

xhooks = [];

xhook = function(callback, i) {
  if (i == null) {
    i = xhooks.length;
  }
  return xhooks.splice(i, 0, callback);
};

convertHeaders = function(h, dest) {
  var header, headers, k, v, _i, _len;
  if (dest == null) {
    dest = {};
  }
  switch (typeof h) {
    case "object":
      headers = [];
      for (k in h) {
        v = h[k];
        headers.push("" + k + ":\t" + v);
      }
      return headers.join('\n');
    case "string":
      headers = h.split('\n');
      for (_i = 0, _len = headers.length; _i < _len; _i++) {
        header = headers[_i];
        if (/([^:]+):\s*(.+)/.test(header)) {
          if (!dest[RegExp.$1]) {
            dest[RegExp.$1] = RegExp.$2;
          }
        }
      }
      return dest;
  }
};

xhook.headers = convertHeaders;

xhook.PROPS = PROPS;

patchClass = function(name) {
  var Class;
  Class = window[name];
  if (!Class) {
    return;
  }
  return window[name] = function(arg) {
    if (typeof arg === "string" && !/\.XMLHTTP/.test(arg)) {
      return;
    }
    return patchXhr(new Class(arg), Class);
  };
};

patchClass("ActiveXObject");

patchClass("XMLHttpRequest");

patchXhr = function(xhr, Class) {
  var callback, cloneEvent, data, eventListeners, eventName, fn, requestHeaders, responseHeaders, setAllValues, setValue, user, userOnCalls, userOnChanges, userRequestHeaders, userResponseHeaders, userSets, x, xhrDup, _fn, _i, _j, _k, _len, _len1, _len2;
  if (xhooks.length === 0) {
    return xhr;
  }
  xhrDup = {};
  x = {};
  x[WITH_CREDS] = false;
  requestHeaders = {};
  responseHeaders = {};
  data = {};
  eventListeners = {};
  cloneEvent = function(e) {
    var clone, key, val, _ref;
    clone = {};
    _ref = e || {};
    for (key in _ref) {
      val = _ref[key];
      clone[key] = val === xhr ? x : val;
    }
    return clone;
  };
  x.addEventListener = function(event, fn) {
    return (eventListeners[event] = eventListeners[event] || []).push(fn);
  };
  x.removeEventListener = function(event, fn) {
    var f, fi, i, _i, _len, _ref;
    fi = -1;
    _ref = eventListeners[event] || [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      f = _ref[i];
      if (f === fn) {
        fi = i;
      }
    }
    if (fi === -1) {
      return;
    }
    return eventListeners[event].splice(fi, 1);
  };
  x.dispatchEvent = function(event) {
    return user.trigger(event);
  };
  user = create(data);
  userSets = {};
  user.set = function(prop, val) {
    var _results;
    userSets[prop] = 1;
    if (prop === READY_STATE) {
      _results = [];
      while (x[READY_STATE] < val) {
        x[READY_STATE]++;
        if (x[READY_STATE] === xhr[READY_STATE]) {
          continue;
        }
        user.trigger('readystatechange');
        if (x[READY_STATE] === 1) {
          user.trigger('loadstart');
        }
        if (x[READY_STATE] === 4) {
          user.trigger('load');
          _results.push(user.trigger('loadend'));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    } else {
      return x[prop] = val;
    }
  };
  userRequestHeaders = create(requestHeaders);
  user.setRequestHeader = function(key, val) {
    userRequestHeaders[key] = val;
    if (!data.opened) {
      return;
    }
    return xhr.setRequestHeader(key, val);
  };
  userResponseHeaders = create(responseHeaders);
  user.setResponseHeader = function(key, val) {
    return userResponseHeaders[key] = val;
  };
  userOnChanges = {};
  userOnCalls = {};
  user.onChange = function(event, callback) {
    return (userOnChanges[event] = userOnChanges[event] || []).push(callback);
  };
  user.onCall = function(event, callback) {
    return (userOnCalls[event] = userOnCalls[event] || []).push(callback);
  };
  user.trigger = function(event, obj) {
    var fn, _i, _len, _ref, _ref1;
    if (obj == null) {
      obj = {};
    }
    event = event.replace(/^on/, '');
    obj.type = event;
    if ((_ref = x['on' + event]) != null) {
      _ref.call(x, obj);
    }
    _ref1 = eventListeners[event] || [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      fn = _ref1[_i];
      fn.call(x, obj);
    }
  };
  user.serialize = function() {
    var k, p, props, req, res, v, _i, _len;
    props = {};
    for (_i = 0, _len = PROPS.length; _i < _len; _i++) {
      p = PROPS[_i];
      props[p] = x[p];
    }
    res = {};
    for (k in userResponseHeaders) {
      v = userResponseHeaders[k];
      res[k] = v;
    }
    req = {};
    for (k in userRequestHeaders) {
      v = userRequestHeaders[k];
      req[k] = v;
    }
    return {
      method: data.method,
      url: data.url,
      async: data.async,
      body: data.body,
      responseHeaders: res,
      requestHeaders: req,
      props: props
    };
  };
  user.deserialize = function(obj) {
    var h, k, p, v, _i, _len, _ref, _ref1, _ref2, _ref3;
    _ref = ['method', 'url', 'async', 'body'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      if (obj[k]) {
        user[k] = obj[k];
      }
    }
    _ref1 = obj.responseHeaders || {};
    for (h in _ref1) {
      v = _ref1[h];
      user.setResponseHeader(h, v);
    }
    _ref2 = obj.requestHeaders || {};
    for (h in _ref2) {
      v = _ref2[h];
      user.setRequestHeader(h, v);
    }
    _ref3 = obj.props || {};
    for (p in _ref3) {
      v = _ref3[p];
      user.set(p, v);
    }
  };
  for (_i = 0, _len = FNS.length; _i < _len; _i++) {
    fn = FNS[_i];
    if (xhr[fn]) {
      (function(key) {
        return x[key] = function() {
          var args, callback, callbacks, newargs, result, _j, _len1;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          data.opened = !data.opened && key === 'open';
          data.sent = !data.sent && key === 'send';
          switch (key) {
            case "getAllResponseHeaders":
              return convertHeaders(userResponseHeaders);
            case "send":
              data.body = args[0];
              break;
            case "open":
              data.method = args[0];
              data.url = args[1];
              data.async = args[2];
          }
          newargs = args;
          callbacks = userOnCalls[key] || [];
          for (_j = 0, _len1 = callbacks.length; _j < _len1; _j++) {
            callback = callbacks[_j];
            result = callback(args);
            if (result === false) {
              return;
            }
            if (result) {
              newargs = result;
            }
          }
          if (key === "setRequestHeader") {
            requestHeaders[newargs[0]] = newargs[1];
            if (userRequestHeaders[args[0]] !== undefined) {
              return;
            }
          }
          if (xhr[key]) {
            return xhr[key].apply(xhr, newargs);
          }
        };
      })(fn);
    }
  }
  setAllValues = function() {
    var err, prop, _j, _len1, _results;
    try {
      _results = [];
      for (_j = 0, _len1 = PROPS.length; _j < _len1; _j++) {
        prop = PROPS[_j];
        _results.push(setValue(prop, xhr[prop]));
      }
      return _results;
    } catch (_error) {
      err = _error;
      if (err.constructor.name === 'TypeError') {
        throw err;
      }
    }
  };
  setValue = function(prop, curr) {
    var callback, callbacks, key, override, prev, result, val, _j, _len1;
    prev = xhrDup[prop];
    if (curr === prev) {
      return;
    }
    xhrDup[prop] = curr;
    if (prop === READY_STATE) {
      if (curr === 1) {
        for (key in userRequestHeaders) {
          val = userRequestHeaders[key];
          xhr.setRequestHeader(key, val);
        }
      }
      if (curr === 2) {
        data.statusCode = xhr.status;
        convertHeaders(xhr.getAllResponseHeaders(), responseHeaders);
      }
    }
    callbacks = userOnChanges[prop] || [];
    for (_j = 0, _len1 = callbacks.length; _j < _len1; _j++) {
      callback = callbacks[_j];
      result = callback(curr, prev);
      if (result !== undefined) {
        override = result;
      }
    }
    if (userSets[prop]) {
      return;
    }
    return x[prop] = override === undefined ? curr : override;
  };
  _fn = function(eventName) {
    return xhr[eventName] = function(event) {
      setAllValues();
      return user.trigger(eventName, cloneEvent(event));
    };
  };
  for (_j = 0, _len1 = EVENTS.length; _j < _len1; _j++) {
    eventName = EVENTS[_j];
    _fn("on" + eventName);
  }
  setAllValues();
  for (_k = 0, _len2 = xhooks.length; _k < _len2; _k++) {
    callback = xhooks[_k];
    callback.call(null, user);
  }
  return x;
};

window.xhook = xhook;
}(window,document));