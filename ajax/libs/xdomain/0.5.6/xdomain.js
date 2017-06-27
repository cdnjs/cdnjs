// XDomain - v0.4.3 - https://github.com/jpillora/xdomain
// Jaime Pillora <dev@jpillora.com> - MIT Copyright 2013
(function(window,document,undefined) {
// XHook - v0.1.2b - https://github.com/jpillora/xhook
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
          } else if (key === "getRequestHeader") {
            return userResponseHeaders[newargs[0]];
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
'use strict';
var Frame, PING, currentOrigin, feature, getMessage, guid, masters, onMessage, p, parseUrl, script, setMessage, setupMaster, setupSlave, slaves, toRegExp, warn, _i, _j, _len, _len1, _ref, _ref1;

currentOrigin = location.protocol + '//' + location.host;

warn = function(str) {
  str = "xdomain (" + currentOrigin + "): " + str;
  if (console['warn']) {
    return console.warn(str);
  } else {
    return alert(str);
  }
};

_ref = ['postMessage', 'JSON'];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  feature = _ref[_i];
  if (!window[feature]) {
    warn("requires '" + feature + "' and this browser does not support it");
    return;
  }
}

PING = 'XPING';

guid = function() {
  return (Math.random() * Math.pow(2, 32)).toString(16);
};

parseUrl = function(url) {
  if (/(https?:\/\/[^\/]+)(\/.*)?/.test(url)) {
    return {
      origin: RegExp.$1,
      path: RegExp.$2
    };
  } else {
    return null;
  }
};

toRegExp = function(obj) {
  var str;
  if (obj instanceof RegExp) {
    return obj;
  }
  str = obj.toString().replace(/\W/g, function(str) {
    return "\\" + str;
  }).replace(/\\\*/g, ".+");
  return new RegExp("^" + str + "$");
};

onMessage = function(fn) {
  if (document.addEventListener) {
    return window.addEventListener("message", fn);
  } else {
    return window.attachEvent("onmessage", fn);
  }
};

setMessage = function(obj) {
  return JSON.stringify(obj);
};

getMessage = function(str) {
  return JSON.parse(str);
};

setupSlave = function(masters) {
  onMessage(function(event) {
    var frame, k, master, masterRegex, message, origin, p, pathRegex, proxyXhr, regex, req, v, _ref1;
    origin = event.origin;
    pathRegex = null;
    for (master in masters) {
      regex = masters[master];
      try {
        masterRegex = toRegExp(master);
        if (masterRegex.test(origin)) {
          pathRegex = toRegExp(regex);
          break;
        }
      } catch (_error) {}
    }
    if (!pathRegex) {
      warn("blocked request from: '" + origin + "'");
      return;
    }
    frame = event.source;
    message = getMessage(event.data);
    req = message.req;
    p = parseUrl(req.url);
    if (!(p && pathRegex.test(p.path))) {
      warn("blocked request to path: '" + p.path + "' by regex: " + regex);
      return;
    }
    proxyXhr = new XMLHttpRequest();
    proxyXhr.open(req.method, req.url);
    proxyXhr.onreadystatechange = function() {
      var m, res, _j, _ref1;
      if (proxyXhr.readyState !== 4) {
        return;
      }
      res = {
        props: {}
      };
      _ref1 = xhook.PROPS;
      for (_j = _ref1.length - 1; _j >= 0; _j += -1) {
        p = _ref1[_j];
        if (p !== 'responseXML') {
          res.props[p] = proxyXhr[p];
        }
      }
      res.responseHeaders = xhook.headers(proxyXhr.getAllResponseHeaders());
      m = setMessage({
        id: message.id,
        res: res
      });
      return frame.postMessage(m, origin);
    };
    _ref1 = req.requestHeaders;
    for (k in _ref1) {
      v = _ref1[k];
      proxyXhr.setRequestHeader(k, v);
    }
    return proxyXhr.send(req.body || null);
  });
  if (window === window.parent) {
    return warn("slaves must be in an iframe");
  } else {
    return window.parent.postMessage(PING, '*');
  }
};

setupMaster = function(slaves) {
  onMessage(function(e) {
    var _ref1;
    return (_ref1 = Frame.prototype.frames[e.origin]) != null ? _ref1.recieve(e) : void 0;
  });
  return xhook(function(xhr) {
    xhr.onCall('open', function(args) {
      var p;
      p = parseUrl(args[1]);
      if (!(p && slaves[p.origin])) {
        return;
      }
      if (args[2] === false) {
        warn("sync not supported");
      }
      setTimeout(function() {
        return xhr.set('readyState', 1);
      });
      return false;
    });
    return xhr.onCall('send', function() {
      var frame, p;
      p = parseUrl(xhr.url);
      if (!(p && slaves[p.origin])) {
        return;
      }
      frame = new Frame(p.origin, slaves[p.origin]);
      frame.send(xhr.serialize(), function(res) {
        return xhr.deserialize(res);
      });
      return false;
    });
  });
};

Frame = (function() {
  Frame.prototype.frames = {};

  function Frame(origin, proxyPath) {
    this.origin = origin;
    this.proxyPath = proxyPath;
    if (this.frames[this.origin]) {
      return this.frames[this.origin];
    }
    this.frames[this.origin] = this;
    this.listeners = {};
    this.frame = document.createElement("iframe");
    this.frame.id = this.frame.name = 'xdomain-' + guid();
    this.frame.src = this.origin + this.proxyPath;
    this.frame.setAttribute('style', 'display:none;');
    document.body.appendChild(this.frame);
    this.waits = 0;
    this.ready = false;
  }

  Frame.prototype.post = function(msg) {
    return this.frame.contentWindow.postMessage(msg, this.origin);
  };

  Frame.prototype.listen = function(id, callback) {
    if (this.listeners[id]) {
      throw "already listening for: " + id;
    }
    return this.listeners[id] = callback;
  };

  Frame.prototype.unlisten = function(id) {
    return delete this.listeners[id];
  };

  Frame.prototype.recieve = function(event) {
    var cb, message;
    if (event.data === PING) {
      this.ready = true;
      return;
    }
    message = getMessage(event.data);
    cb = this.listeners[message.id];
    if (!cb) {
      warn("unkown message (" + message.id + ")");
      return;
    }
    this.unlisten(message.id);
    return cb(message.res);
  };

  Frame.prototype.send = function(req, callback) {
    var _this = this;
    return this.readyCheck(function() {
      var id;
      id = guid();
      _this.listen(id, function(data) {
        return callback(data);
      });
      return _this.post(setMessage({
        id: id,
        req: req
      }));
    });
  };

  Frame.prototype.readyCheck = function(callback) {
    var _this = this;
    if (this.ready === true) {
      return callback();
    }
    if (this.waits++ >= 100) {
      throw "Timeout connecting to iframe: " + this.origin;
    }
    return setTimeout(function() {
      return _this.readyCheck(callback);
    }, 100);
  };

  return Frame;

})();

window.xdomain = function(o) {
  if (!o) {
    return;
  }
  if (o.masters) {
    setupSlave(o.masters);
  }
  if (o.slaves) {
    setupMaster(o.slaves);
  }
};

xdomain.origin = currentOrigin;

_ref1 = document.getElementsByTagName("script");
for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
  script = _ref1[_j];
  if (/xdomain/.test(script.src)) {
    if (script.hasAttribute('slave')) {
      p = parseUrl(script.getAttribute('slave'));
      if (!p) {
        return;
      }
      slaves = {};
      slaves[p.origin] = p.path;
      xdomain({
        slaves: slaves
      });
    }
    if (script.hasAttribute('master')) {
      masters = {};
      masters[script.getAttribute('master')] = /./;
      xdomain({
        masters: masters
      });
    }
  }
}
}(window,document));