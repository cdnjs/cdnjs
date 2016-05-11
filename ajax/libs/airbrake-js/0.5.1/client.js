(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.airbrakeJs || (g.airbrakeJs = {})).Client = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var Client, Promise, merge;

require('./internal/compat');

merge = require('./internal/merge');

Promise = require('./internal/promise');

Client = (function() {
  function Client(opts) {
    var reporter;
    if (opts == null) {
      opts = {};
    }
    this._projectId = opts.projectId || 0;
    this._projectKey = opts.projectKey || '';
    this._host = 'https://api.airbrake.io';
    this._context = {};
    this._params = {};
    this._env = {};
    this._session = {};
    this._processor = null;
    this._reporters = [];
    this._filters = [];
    if (opts.processor !== void 0) {
      this._processor = opts.processor;
    } else {
      this._processor = require('./processors/stack');
    }
    if (opts.reporter !== void 0) {
      this.addReporter(opts.reporter);
    } else {
      if ('withCredentials' in new global.XMLHttpRequest()) {
        reporter = require('./reporters/xhr');
      } else {
        reporter = require('./reporters/jsonp');
      }
      this.addReporter(reporter);
    }
  }

  Client.prototype.setProject = function(id, key) {
    this._projectId = id;
    return this._projectKey = key;
  };

  Client.prototype.setHost = function(host) {
    return this._host = host;
  };

  Client.prototype.addContext = function(context) {
    return merge(this._context, context);
  };

  Client.prototype.setEnvironmentName = function(envName) {
    return this._context.environment = envName;
  };

  Client.prototype.addParams = function(params) {
    return merge(this._params, params);
  };

  Client.prototype.addEnvironment = function(env) {
    return merge(this._env, env);
  };

  Client.prototype.addSession = function(session) {
    return merge(this._session, session);
  };

  Client.prototype.addReporter = function(reporter) {
    return this._reporters.push(reporter);
  };

  Client.prototype.addFilter = function(filter) {
    return this._filters.push(filter);
  };

  Client.prototype.push = function(err) {
    var defContext, promise, ref;
    defContext = {
      language: 'JavaScript',
      sourceMapEnabled: true
    };
    if ((ref = global.navigator) != null ? ref.userAgent : void 0) {
      defContext.userAgent = global.navigator.userAgent;
    }
    if (global.location) {
      defContext.url = String(global.location);
    }
    promise = new Promise();
    this._processor(err.error || err, (function(_this) {
      return function(processorName, errInfo) {
        var filterFn, j, k, len, len1, notice, opts, ref1, ref2, reporterFn;
        notice = {
          notifier: {
            name: 'airbrake-js-' + processorName,
            version: '0.5.1',
            url: 'https://github.com/airbrake/airbrake-js'
          },
          errors: [errInfo],
          context: merge(defContext, _this._context, err.context),
          params: merge({}, _this._params, err.params),
          environment: merge({}, _this._env, err.environment),
          session: merge({}, _this._session, err.session)
        };
        ref1 = _this._filters;
        for (j = 0, len = ref1.length; j < len; j++) {
          filterFn = ref1[j];
          if (!filterFn(notice)) {
            return;
          }
        }
        opts = {
          projectId: _this._projectId,
          projectKey: _this._projectKey,
          host: _this._host
        };
        ref2 = _this._reporters;
        for (k = 0, len1 = ref2.length; k < len1; k++) {
          reporterFn = ref2[k];
          reporterFn(notice, opts, promise);
        }
      };
    })(this));
    return promise;
  };

  Client.prototype._wrapArguments = function(args) {
    var arg, i, j, len;
    for (i = j = 0, len = args.length; j < len; i = ++j) {
      arg = args[i];
      if (typeof arg === 'function') {
        args[i] = this.wrap(arg);
      }
    }
    return args;
  };

  Client.prototype.wrap = function(fn) {
    var airbrakeWrapper, prop, self;
    if (fn.__airbrake__) {
      return fn;
    }
    self = this;
    airbrakeWrapper = function() {
      var args, exc;
      args = self._wrapArguments(arguments);
      try {
        return fn.apply(this, args);
      } catch (_error) {
        exc = _error;
        args = Array.prototype.slice.call(arguments);
        self.push({
          error: exc,
          params: {
            "arguments": args
          }
        });
        return null;
      }
    };
    for (prop in fn) {
      if (fn.hasOwnProperty(prop)) {
        airbrakeWrapper[prop] = fn[prop];
      }
    }
    airbrakeWrapper.__airbrake__ = true;
    airbrakeWrapper.__inner__ = fn;
    return airbrakeWrapper;
  };

  return Client;

})();

module.exports = Client;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./internal/compat":2,"./internal/merge":4,"./internal/promise":5,"./processors/stack":7,"./reporters/jsonp":8,"./reporters/xhr":9}],2:[function(require,module,exports){
var base;

if ((base = Array.prototype).indexOf == null) {
  base.indexOf = function(obj, start) {
    var i, j, ref, ref1;
    start = start || 0;
    for (i = j = ref = start, ref1 = this.length; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
      if (this[i] === obj) {
        return i;
      }
    }
    return -1;
  };
}



},{}],3:[function(require,module,exports){
var jsonifyNotice, truncate, truncateObj;

truncate = require('./truncate');

truncateObj = function(obj, n) {
  var dst, key;
  if (n == null) {
    n = 1000;
  }
  dst = {};
  for (key in obj) {
    dst[key] = truncate(obj[key], n = n);
  }
  return dst;
};

jsonifyNotice = function(notice, n, maxLength) {
  var err, s;
  if (n == null) {
    n = 1000;
  }
  if (maxLength == null) {
    maxLength = 64000;
  }
  while (true) {
    notice.params = truncateObj(notice.params, n = n);
    notice.environment = truncateObj(notice.environment, n = n);
    notice.session = truncateObj(notice.session, n = n);
    s = JSON.stringify(notice);
    if (s.length < maxLength) {
      return s;
    }
    if (n === 0) {
      break;
    }
    n = Math.floor(n / 2);
  }
  err = new Error("airbrake-js: cannot jsonify notice (length=" + s.length + " maxLength=" + maxLength + ")");
  err.params = {
    json: s.slice(0, +Math.floor(n / 2) + 1 || 9e9) + '...'
  };
  throw err;
};

module.exports = jsonifyNotice;



},{"./truncate":6}],4:[function(require,module,exports){
var merge;

merge = function() {
  var dst, i, key, len, obj, objs;
  objs = Array.prototype.slice.call(arguments);
  dst = objs.shift() || {};
  for (i = 0, len = objs.length; i < len; i++) {
    obj = objs[i];
    for (key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        dst[key] = obj[key];
      }
    }
  }
  return dst;
};

module.exports = merge;



},{}],5:[function(require,module,exports){
var Promise;

Promise = (function() {
  function Promise(executor) {
    var reject, resolve;
    this._onResolved = [];
    this._onRejected = [];
    resolve = (function(_this) {
      return function() {
        return _this.resolve.apply(_this, arguments);
      };
    })(this);
    reject = (function(_this) {
      return function() {
        return _this.reject.apply(_this, arguments);
      };
    })(this);
    if (executor != null) {
      executor(resolve, reject);
    }
  }

  Promise.prototype.then = function(onResolved, onRejected) {
    if (onResolved) {
      if (this._resolvedWith != null) {
        onResolved(this._resolvedWith);
      }
      this._onResolved.push(onResolved);
    }
    if (onRejected) {
      if (this._rejectedWith != null) {
        onRejected(this._resolvedWith);
      }
      this._onRejected.push(onRejected);
    }
    return this;
  };

  Promise.prototype["catch"] = function(onRejected) {
    if (this._rejectedWith != null) {
      onRejected(this._rejectedWith);
    }
    this._onRejected.push(onRejected);
    return this;
  };

  Promise.prototype.resolve = function() {
    var fn, i, len, ref;
    this._resolvedWith = arguments;
    ref = this._onResolved;
    for (i = 0, len = ref.length; i < len; i++) {
      fn = ref[i];
      fn.apply(this, this._resolvedWith);
    }
    return this;
  };

  Promise.prototype.reject = function() {
    var fn, i, len, ref;
    this._rejectedWith = arguments;
    ref = this._onRejected;
    for (i = 0, len = ref.length; i < len; i++) {
      fn = ref[i];
      fn.apply(this, this._rejectedWith);
    }
    return this;
  };

  return Promise;

})();

module.exports = Promise;



},{}],6:[function(require,module,exports){
var getAttr, truncate;

getAttr = function(obj, attr) {
  var exc;
  try {
    return obj[attr];
  } catch (_error) {
    exc = _error;
    return void 0;
  }
};

truncate = function(value, n, depth) {
  var fn, getPath, keys, nn, seen;
  if (n == null) {
    n = 1000;
  }
  if (depth == null) {
    depth = 5;
  }
  nn = 0;
  keys = [];
  seen = [];
  getPath = function(value) {
    var i, index, j, path, ref;
    index = seen.indexOf(value);
    path = [keys[index]];
    for (i = j = ref = index; ref <= 0 ? j <= 0 : j >= 0; i = ref <= 0 ? ++j : --j) {
      if (seen[i] && getAttr(seen[i], path[0]) === value) {
        value = seen[i];
        path.unshift(keys[i]);
      }
    }
    return '~' + path.join('.');
  };
  fn = function(value, key, dd) {
    var dst, el, i, j, len, val;
    if (key == null) {
      key = '';
    }
    if (dd == null) {
      dd = 0;
    }
    nn++;
    if (nn > n) {
      return '[Truncated]';
    }
    if (value === null || value === void 0) {
      return value;
    }
    switch (typeof value) {
      case 'boolean':
      case 'number':
      case 'string':
      case 'function':
        return value;
      case 'object':
        break;
      default:
        return String(value);
    }
    if (value instanceof Boolean || value instanceof Number || value instanceof String || value instanceof Date || value instanceof RegExp) {
      return value;
    }
    if (seen.indexOf(value) >= 0) {
      return "[Circular " + (getPath(value)) + "]";
    }
    dd++;
    if (dd > depth) {
      return '[Truncated]';
    }
    keys.push(key);
    seen.push(value);
    nn--;
    if (Object.prototype.toString.apply(value) === '[object Array]') {
      dst = [];
      for (i = j = 0, len = value.length; j < len; i = ++j) {
        el = value[i];
        nn++;
        if (nn >= n) {
          break;
        }
        dst.push(fn(el, key = i, dd));
      }
      return dst;
    }
    dst = {};
    for (key in value) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      nn++;
      if (nn >= n) {
        break;
      }
      val = getAttr(value, key);
      if (val !== void 0) {
        dst[key] = fn(val, key = key, dd);
      }
    }
    return dst;
  };
  return fn(value);
};

module.exports = truncate;



},{}],7:[function(require,module,exports){
var processor, rules, typeMessageRe;

rules = [
  {
    name: 'v8',
    re: /^\s*at\s(.+?)\s\((?:(?:(.+):(\d+):(\d+))|(.+))\)$/,
    fn: function(m) {
      return {
        "function": m[1],
        file: m[2] || m[5],
        line: m[3] && parseInt(m[3], 10) || 0,
        column: m[4] && parseInt(m[4], 10) || 0
      };
    }
  }, {
    name: 'firefox30',
    re: /^(.*)@(.+):(\d+):(\d+)$/,
    fn: function(m) {
      var evaledRe, file, func, mm;
      func = m[1];
      file = m[2];
      evaledRe = /^(\S+)\s(line\s\d+\s>\seval.*)$/;
      if (mm = file.match(evaledRe)) {
        if (func.length > 0) {
          func = func + ' ' + mm[2];
        } else {
          func = mm[2];
        }
        file = mm[1];
      }
      return {
        "function": func,
        file: file,
        line: parseInt(m[3], 10),
        column: parseInt(m[4], 10)
      };
    }
  }, {
    name: 'firefox14',
    re: /^(.*)@(.+):(\d+)$/,
    fn: function(m, i, e) {
      var column;
      if (i === 0) {
        column = e.columnNumber || 0;
      } else {
        column = 0;
      }
      return {
        "function": m[1],
        file: m[2],
        line: parseInt(m[3], 10),
        column: column
      };
    }
  }, {
    name: 'v8-short',
    re: /^\s*at\s(.+):(\d+):(\d+)$/,
    fn: function(m) {
      return {
        "function": '',
        file: m[1],
        line: parseInt(m[2], 10),
        column: parseInt(m[3], 10)
      };
    }
  }, {
    name: 'phantomjs',
    re: /^\s*at\s(.+):(\d+)$/,
    fn: function(m) {
      return {
        "function": '',
        file: m[1],
        line: parseInt(m[2], 10),
        column: 0
      };
    }
  }, {
    name: 'default',
    re: /.+/,
    fn: function(m) {
      return {
        "function": m[0],
        file: '',
        line: 0,
        column: 0
      };
    }
  }
];

typeMessageRe = /^\S+:\s.+$/;

processor = function(e, cb) {
  var backtrace, i, j, k, len, len1, line, lines, m, msg, processorName, rule, stack, type, uncaughtExcRe;
  processorName = 'nostack';
  stack = e.stack || '';
  lines = stack.split('\n');
  backtrace = [];
  for (i = j = 0, len = lines.length; j < len; i = ++j) {
    line = lines[i];
    if (line === '') {
      continue;
    }
    for (k = 0, len1 = rules.length; k < len1; k++) {
      rule = rules[k];
      m = line.match(rule.re);
      if (!m) {
        continue;
      }
      processorName = rule.name;
      backtrace.push(rule.fn(m, i, e));
      break;
    }
  }
  if ((processorName === 'v8' || processorName === 'v8-short') && backtrace.length > 0 && backtrace[0]["function"].match(typeMessageRe)) {
    backtrace = backtrace.slice(1);
  }
  if (backtrace.length === 0 && ((e.fileName != null) || (e.lineNumber != null) || (e.columnNumber != null))) {
    backtrace.push({
      "function": '',
      file: e.fileName || '',
      line: parseInt(e.lineNumber, 10) || 0,
      column: parseInt(e.columnNumber, 10) || 0
    });
  }
  if (backtrace.length === 0 && ((e.filename != null) || (e.lineno != null) || (e.column != null) || (e.colno != null))) {
    backtrace.push({
      "function": '',
      file: e.filename || '',
      line: parseInt(e.lineno, 10) || 0,
      column: parseInt(e.column || e.colno, 10) || 0
    });
  }
  if (e.message != null) {
    msg = e.message;
  } else {
    msg = String(e);
  }
  if ((e.name != null) && e.name !== '') {
    type = e.name;
    msg = type + ': ' + msg;
  } else {
    uncaughtExcRe = /^Uncaught\s(.+?):\s.+$/;
    m = msg.match(uncaughtExcRe);
    if (m) {
      type = m[1];
    } else {
      type = '';
    }
  }
  return cb(processorName, {
    'type': type,
    'message': msg,
    'backtrace': backtrace
  });
};

module.exports = processor;



},{}],8:[function(require,module,exports){
(function (global){
var cbCount, jsonifyNotice, report;

jsonifyNotice = require('../internal/jsonify_notice');

cbCount = 0;

report = function(notice, opts, promise) {
  var cbName, document, head, payload, removeScript, script, url;
  cbCount++;
  cbName = "airbrakeCb" + String(cbCount);
  global[cbName] = function(resp) {
    var _;
    notice.id = resp.id;
    promise.resolve(notice);
    try {
      return delete global[cbName];
    } catch (_error) {
      _ = _error;
      return global[cbName] = void 0;
    }
  };
  payload = encodeURIComponent(jsonifyNotice(notice));
  url = opts.host + "/api/v3/projects/" + opts.projectId + "/create-notice?key=" + opts.projectKey + "&callback=" + cbName + "&body=" + payload;
  document = global.document;
  head = document.getElementsByTagName('head')[0];
  script = document.createElement('script');
  script.src = url;
  removeScript = function() {
    return head.removeChild(script);
  };
  script.onload = removeScript;
  script.onerror = removeScript;
  return head.appendChild(script);
};

module.exports = report;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/jsonify_notice":3}],9:[function(require,module,exports){
(function (global){
var jsonifyNotice, report;

jsonifyNotice = require('../internal/jsonify_notice');

report = function(notice, opts, promise) {
  var payload, req, url;
  url = opts.host + "/api/v3/projects/" + opts.projectId + "/create-notice?key=" + opts.projectKey;
  payload = jsonifyNotice(notice);
  req = new global.XMLHttpRequest();
  req.open('POST', url, true);
  req.send(payload);
  return req.onreadystatechange = function() {
    var resp;
    if (req.readyState === 4 && req.status === 200) {
      resp = JSON.parse(req.responseText);
      notice.id = resp.id;
      return promise.resolve(notice);
    }
  };
};

module.exports = report;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/jsonify_notice":3}]},{},[1])(1)
});