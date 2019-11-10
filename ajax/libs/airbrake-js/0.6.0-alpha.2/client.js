var airbrakeJs = airbrakeJs || {}; airbrakeJs["Client"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var jsonifyNotice, truncate, truncateObj;

truncate = __webpack_require__(12);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var filter, re;

re = /^\[(\$.+)\]\s(.+)$/;

filter = function(notice) {
  var err, m;
  err = notice.errors[0];
  if ((err.type != null) && err.type !== '' && err.type !== 'Error') {
    return notice;
  }
  if (err.message == null) {
    return notice;
  }
  m = err.message.match(re);
  if (m) {
    err.type = m[1];
    err.message = m[2];
  }
  return notice;
};

module.exports = filter;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var IGNORED_MESSAGES, filter,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

IGNORED_MESSAGES = ['Script error', 'Script error.'];

filter = function(notice) {
  var msg;
  msg = notice.errors[0].message;
  if (indexOf.call(IGNORED_MESSAGES, msg) >= 0) {
    return null;
  }
  return notice;
};

module.exports = filter;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var filter, re;

re = /^Uncaught\s(.+?):\s(.+)$/;

filter = function(notice) {
  var err, m;
  err = notice.errors[0];
  if ((err.type != null) && err.type !== '' && err.type !== 'Error') {
    return notice;
  }
  if (err.message == null) {
    return notice;
  }
  m = err.message.match(re);
  if (m) {
    err.type = m[1];
    err.message = m[2];
  }
  return notice;
};

module.exports = filter;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

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


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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


/***/ }),
/* 7 */
/***/ (function(module, exports) {

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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var ErrorStackParser, processor;

ErrorStackParser = __webpack_require__(13);

processor = function(e, cb) {
  var backtrace, frame, frames, i, len, msg, type;
  frames = ErrorStackParser.parse(e);
  backtrace = [];
  for (i = 0, len = frames.length; i < len; i++) {
    frame = frames[i];
    backtrace.push({
      "function": frame.functionName || '',
      file: frame.fileName,
      line: frame.lineNumber,
      column: frame.columnNumber
    });
  }
  if (e.message != null) {
    msg = String(e.message);
  } else {
    msg = String(e);
  }
  if ((e.name != null) && e.name !== '') {
    type = e.name;
  } else {
    type = '';
  }
  if (type === '' && msg === '' && backtrace.length === 0) {
    if (typeof console !== "undefined" && console !== null) {
      if (typeof console.warn === "function") {
        console.warn("airbrake: can't process error", e);
      }
    }
    return;
  }
  return cb('stacktracejs', {
    type: type,
    message: msg,
    backtrace: backtrace
  });
};

module.exports = processor;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var jsonifyNotice, report;

jsonifyNotice = __webpack_require__(1);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var cbCount, jsonifyNotice, report;

jsonifyNotice = __webpack_require__(1);

cbCount = 0;

report = function(notice, opts, promise) {
  var cbName, document, head, payload, removeScript, script, url;
  cbCount++;
  cbName = 'airbrakeCb' + String(cbCount);
  global[cbName] = function(resp) {
    var _;
    notice.id = resp.id;
    promise.resolve(notice);
    try {
      return delete global[cbName];
    } catch (error) {
      _ = error;
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var jsonifyNotice, report;

jsonifyNotice = __webpack_require__(1);

report = function(notice, opts, promise) {
  var payload, req, url;
  url = opts.host + "/api/v3/projects/" + opts.projectId + "/notices?key=" + opts.projectKey;
  payload = jsonifyNotice(notice);
  req = new global.XMLHttpRequest();
  req.open('POST', url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(payload);
  return req.onreadystatechange = function() {
    var resp;
    if (req.readyState === 4 && req.status === 201) {
      resp = JSON.parse(req.responseText);
      notice.id = resp.id;
      return promise.resolve(notice);
    }
  };
};

module.exports = report;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var getAttr, truncate;

getAttr = function(obj, attr) {
  var exc;
  try {
    return obj[attr];
  } catch (error) {
    exc = error;
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


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory(require('stackframe'));
    } else {
        root.ErrorStackParser = factory(root.StackFrame);
    }
}(this, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

    return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            } else if (error.stack) {
                return this.parseFFOrSafari(error);
            } else {
                throw new Error('Cannot parse given Error object');
            }
        },

        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
            // Fail-fast but return locations like "(native)"
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }

            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },

        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);

            return filtered.map(function(line) {
                if (line.indexOf('(eval ') > -1) {
                    // Throw away eval information until we implement stacktrace.js/stackframe#8
                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
                }
                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
                var locationParts = this.extractLocation(tokens.pop());
                var functionName = tokens.join(' ') || undefined;
                var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];

                return new StackFrame({
                    functionName: functionName,
                    fileName: fileName,
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        },

        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);

            return filtered.map(function(line) {
                // Throw away eval information until we implement stacktrace.js/stackframe#8
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
                }

                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    // Safari eval frames only have function names and nothing else
                    return new StackFrame({
                        functionName: line
                    });
                } else {
                    var tokens = line.split('@');
                    var locationParts = this.extractLocation(tokens.pop());
                    var functionName = tokens.join('@') || undefined;

                    return new StackFrame({
                        functionName: functionName,
                        fileName: locationParts[0],
                        lineNumber: locationParts[1],
                        columnNumber: locationParts[2],
                        source: line
                    });
                }
            }, this);
        },

        parseOpera: function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            } else if (!e.stack) {
                return this.parseOpera10(e);
            } else {
                return this.parseOpera11(e);
            }
        },

        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame({
                        fileName: match[2],
                        lineNumber: match[1],
                        source: lines[i]
                    }));
                }
            }

            return result;
        },

        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(
                        new StackFrame({
                            functionName: match[3] || undefined,
                            fileName: match[2],
                            lineNumber: match[1],
                            source: lines[i]
                        })
                    );
                }
            }

            return result;
        },

        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);

            return filtered.map(function(line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = (tokens.shift() || '');
                var functionName = functionCall
                        .replace(/<anonymous function(: (\w+))?>/, '$2')
                        .replace(/\([^\)]*\)/g, '') || undefined;
                var argsRaw;
                if (functionCall.match(/\(([^\)]*)\)/)) {
                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
                }
                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
                    undefined : argsRaw.split(',');

                return new StackFrame({
                    functionName: functionName,
                    args: args,
                    fileName: locationParts[0],
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        }
    };
}));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.StackFrame = factory();
    }
}(this, function () {
    'use strict';
    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _capitalize(str) {
        return str[0].toUpperCase() + str.substring(1);
    }

    function _getter(p) {
        return function () {
            return this[p];
        };
    }

    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
    var numericProps = ['columnNumber', 'lineNumber'];
    var stringProps = ['fileName', 'functionName', 'source'];
    var arrayProps = ['args'];

    function StackFrame(obj) {
        if (obj instanceof Object) {
            var props = booleanProps.concat(numericProps.concat(stringProps.concat(arrayProps)));
            for (var i = 0; i < props.length; i++) {
                if (obj.hasOwnProperty(props[i]) && obj[props[i]] !== undefined) {
                    this['set' + _capitalize(props[i])](obj[props[i]]);
                }
            }
        }
    }

    StackFrame.prototype = {
        getArgs: function () {
            return this.args;
        },
        setArgs: function (v) {
            if (Object.prototype.toString.call(v) !== '[object Array]') {
                throw new TypeError('Args must be an Array');
            }
            this.args = v;
        },

        getEvalOrigin: function () {
            return this.evalOrigin;
        },
        setEvalOrigin: function (v) {
            if (v instanceof StackFrame) {
                this.evalOrigin = v;
            } else if (v instanceof Object) {
                this.evalOrigin = new StackFrame(v);
            } else {
                throw new TypeError('Eval Origin must be an Object or StackFrame');
            }
        },

        toString: function () {
            var functionName = this.getFunctionName() || '{anonymous}';
            var args = '(' + (this.getArgs() || []).join(',') + ')';
            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
            return functionName + args + fileName + lineNumber + columnNumber;
        }
    };

    for (var i = 0; i < booleanProps.length; i++) {
        StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
        StackFrame.prototype['set' + _capitalize(booleanProps[i])] = (function (p) {
            return function (v) {
                this[p] = Boolean(v);
            };
        })(booleanProps[i]);
    }

    for (var j = 0; j < numericProps.length; j++) {
        StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
        StackFrame.prototype['set' + _capitalize(numericProps[j])] = (function (p) {
            return function (v) {
                if (!_isNumber(v)) {
                    throw new TypeError(p + ' must be a Number');
                }
                this[p] = Number(v);
            };
        })(numericProps[j]);
    }

    for (var k = 0; k < stringProps.length; k++) {
        StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
        StackFrame.prototype['set' + _capitalize(stringProps[k])] = (function (p) {
            return function (v) {
                this[p] = String(v);
            };
        })(stringProps[k]);
    }

    return StackFrame;
}));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var Client, Promise, makeOnErrorHandler, merge;

__webpack_require__(5);

merge = __webpack_require__(6);

Promise = __webpack_require__(7);

makeOnErrorHandler = function(notifier) {
  return function(message, file, line, column, error) {
    if (error) {
      return notifier.notify(error);
    } else {
      return notifier.notify({
        error: {
          message: message,
          fileName: file,
          lineNumber: line,
          columnNumber: column || 0
        }
      });
    }
  };
};

Client = (function() {
  function Client(opts) {
    var reporter;
    if (opts == null) {
      opts = {};
    }
    this._projectId = opts.projectId || 0;
    this._projectKey = opts.projectKey || '';
    this._host = opts.host || 'https://api.airbrake.io';
    this._processor = null;
    this._reporters = [];
    this._filters = [];
    if (opts.processor !== void 0) {
      this._processor = opts.processor;
    } else {
      this._processor = __webpack_require__(8);
    }
    if (opts.reporter !== void 0) {
      this.addReporter(opts.reporter);
    } else {
      if ((opts.host == null) && 'withCredentials' in new global.XMLHttpRequest()) {
        reporter = 'compat';
      } else if (global.document != null) {
        reporter = 'jsonp';
      } else {
        reporter = 'xhr';
      }
      this.addReporter(reporter);
    }
    this.addFilter(__webpack_require__(3));
    this.addFilter(__webpack_require__(4));
    this.addFilter(__webpack_require__(2));
    this.onerror = makeOnErrorHandler(this);
    if ((global.onerror == null) && opts.onerror !== false) {
      global.onerror = this.onerror;
    }
  }

  Client.prototype.setProject = function(id, key) {
    this._projectId = id;
    return this._projectKey = key;
  };

  Client.prototype.setHost = function(host) {
    return this._host = host;
  };

  Client.prototype.addReporter = function(reporter) {
    switch (reporter) {
      case 'compat':
        reporter = __webpack_require__(9);
        break;
      case 'xhr':
        reporter = __webpack_require__(11);
        break;
      case 'jsonp':
        reporter = __webpack_require__(10);
    }
    return this._reporters.push(reporter);
  };

  Client.prototype.addFilter = function(filter) {
    return this._filters.push(filter);
  };

  Client.prototype.notify = function(err) {
    var context, promise, ref;
    context = {
      language: 'JavaScript',
      sourceMapEnabled: true
    };
    if ((ref = global.navigator) != null ? ref.userAgent : void 0) {
      context.userAgent = global.navigator.userAgent;
    }
    if (global.location) {
      context.url = String(global.location);
      context.rootDirectory = global.location.protocol + '//' + global.location.host;
    }
    promise = new Promise();
    this._processor(err.error || err, (function(_this) {
      return function(processorName, errInfo) {
        var filterFn, j, k, len, len1, notice, opts, ref1, ref2, reporterFn;
        notice = {
          errors: [errInfo],
          context: merge(context, err.context),
          params: err.params || {},
          environment: err.environment || {},
          session: err.session || {}
        };
        notice.context.notifier = {
          name: 'airbrake-js',
          version: "0.6.0-alpha.2",
          url: 'https://github.com/airbrake/airbrake-js'
        };
        ref1 = _this._filters;
        for (j = 0, len = ref1.length; j < len; j++) {
          filterFn = ref1[j];
          notice = filterFn(notice);
          if (notice === null || notice === false) {
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
      } catch (error1) {
        exc = error1;
        args = Array.prototype.slice.call(arguments);
        self.notify({
          error: exc,
          params: {
            "arguments": args
          }
        });
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);
//# sourceMappingURL=client.js.map