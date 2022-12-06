/* airbrake-js v2.1.8 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Airbrake = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * @this {Promise}
     */
    function finallyConstructor(callback) {
      var constructor = this.constructor;
      return this.then(
        function(value) {
          // @ts-ignore
          return constructor.resolve(callback()).then(function() {
            return value;
          });
        },
        function(reason) {
          // @ts-ignore
          return constructor.resolve(callback()).then(function() {
            // @ts-ignore
            return constructor.reject(reason);
          });
        }
      );
    }

    function allSettled(arr) {
      var P = this;
      return new P(function(resolve, reject) {
        if (!(arr && typeof arr.length !== 'undefined')) {
          return reject(
            new TypeError(
              typeof arr +
                ' ' +
                arr +
                ' is not iterable(cannot read property Symbol(Symbol.iterator))'
            )
          );
        }
        var args = Array.prototype.slice.call(arr);
        if (args.length === 0) return resolve([]);
        var remaining = args.length;

        function res(i, val) {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(
                val,
                function(val) {
                  res(i, val);
                },
                function(e) {
                  args[i] = { status: 'rejected', reason: e };
                  if (--remaining === 0) {
                    resolve(args);
                  }
                }
              );
              return;
            }
          }
          args[i] = { status: 'fulfilled', value: val };
          if (--remaining === 0) {
            resolve(args);
          }
        }

        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    }

    // Store setTimeout reference so promise-polyfill will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var setTimeoutFunc = setTimeout;

    function isArray(x) {
      return Boolean(x && typeof x.length !== 'undefined');
    }

    function noop() {}

    // Polyfill for Function.prototype.bind
    function bind(fn, thisArg) {
      return function() {
        fn.apply(thisArg, arguments);
      };
    }

    /**
     * @constructor
     * @param {Function} fn
     */
    function Promise$1(fn) {
      if (!(this instanceof Promise$1))
        throw new TypeError('Promises must be constructed via new');
      if (typeof fn !== 'function') throw new TypeError('not a function');
      /** @type {!number} */
      this._state = 0;
      /** @type {!boolean} */
      this._handled = false;
      /** @type {Promise|undefined} */
      this._value = undefined;
      /** @type {!Array<!Function>} */
      this._deferreds = [];

      doResolve(fn, this);
    }

    function handle(self, deferred) {
      while (self._state === 3) {
        self = self._value;
      }
      if (self._state === 0) {
        self._deferreds.push(deferred);
        return;
      }
      self._handled = true;
      Promise$1._immediateFn(function() {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
          return;
        }
        var ret;
        try {
          ret = cb(self._value);
        } catch (e) {
          reject(deferred.promise, e);
          return;
        }
        resolve(deferred.promise, ret);
      });
    }

    function resolve(self, newValue) {
      try {
        // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
        if (newValue === self)
          throw new TypeError('A promise cannot be resolved with itself.');
        if (
          newValue &&
          (typeof newValue === 'object' || typeof newValue === 'function')
        ) {
          var then = newValue.then;
          if (newValue instanceof Promise$1) {
            self._state = 3;
            self._value = newValue;
            finale(self);
            return;
          } else if (typeof then === 'function') {
            doResolve(bind(then, newValue), self);
            return;
          }
        }
        self._state = 1;
        self._value = newValue;
        finale(self);
      } catch (e) {
        reject(self, e);
      }
    }

    function reject(self, newValue) {
      self._state = 2;
      self._value = newValue;
      finale(self);
    }

    function finale(self) {
      if (self._state === 2 && self._deferreds.length === 0) {
        Promise$1._immediateFn(function() {
          if (!self._handled) {
            Promise$1._unhandledRejectionFn(self._value);
          }
        });
      }

      for (var i = 0, len = self._deferreds.length; i < len; i++) {
        handle(self, self._deferreds[i]);
      }
      self._deferreds = null;
    }

    /**
     * @constructor
     */
    function Handler(onFulfilled, onRejected, promise) {
      this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
      this.onRejected = typeof onRejected === 'function' ? onRejected : null;
      this.promise = promise;
    }

    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
    function doResolve(fn, self) {
      var done = false;
      try {
        fn(
          function(value) {
            if (done) return;
            done = true;
            resolve(self, value);
          },
          function(reason) {
            if (done) return;
            done = true;
            reject(self, reason);
          }
        );
      } catch (ex) {
        if (done) return;
        done = true;
        reject(self, ex);
      }
    }

    Promise$1.prototype['catch'] = function(onRejected) {
      return this.then(null, onRejected);
    };

    Promise$1.prototype.then = function(onFulfilled, onRejected) {
      // @ts-ignore
      var prom = new this.constructor(noop);

      handle(this, new Handler(onFulfilled, onRejected, prom));
      return prom;
    };

    Promise$1.prototype['finally'] = finallyConstructor;

    Promise$1.all = function(arr) {
      return new Promise$1(function(resolve, reject) {
        if (!isArray(arr)) {
          return reject(new TypeError('Promise.all accepts an array'));
        }

        var args = Array.prototype.slice.call(arr);
        if (args.length === 0) return resolve([]);
        var remaining = args.length;

        function res(i, val) {
          try {
            if (val && (typeof val === 'object' || typeof val === 'function')) {
              var then = val.then;
              if (typeof then === 'function') {
                then.call(
                  val,
                  function(val) {
                    res(i, val);
                  },
                  reject
                );
                return;
              }
            }
            args[i] = val;
            if (--remaining === 0) {
              resolve(args);
            }
          } catch (ex) {
            reject(ex);
          }
        }

        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };

    Promise$1.allSettled = allSettled;

    Promise$1.resolve = function(value) {
      if (value && typeof value === 'object' && value.constructor === Promise$1) {
        return value;
      }

      return new Promise$1(function(resolve) {
        resolve(value);
      });
    };

    Promise$1.reject = function(value) {
      return new Promise$1(function(resolve, reject) {
        reject(value);
      });
    };

    Promise$1.race = function(arr) {
      return new Promise$1(function(resolve, reject) {
        if (!isArray(arr)) {
          return reject(new TypeError('Promise.race accepts an array'));
        }

        for (var i = 0, len = arr.length; i < len; i++) {
          Promise$1.resolve(arr[i]).then(resolve, reject);
        }
      });
    };

    // Use polyfill for setImmediate for performance gains
    Promise$1._immediateFn =
      // @ts-ignore
      (typeof setImmediate === 'function' &&
        function(fn) {
          // @ts-ignore
          setImmediate(fn);
        }) ||
      function(fn) {
        setTimeoutFunc(fn, 0);
      };

    Promise$1._unhandledRejectionFn = function _unhandledRejectionFn(err) {
      if (typeof console !== 'undefined' && console) {
        console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
      }
    };

    var FILTERED = '[Filtered]';
    var MAX_OBJ_LENGTH = 128;
    // jsonifyNotice serializes notice to JSON and truncates params,
    // environment and session keys.
    function jsonifyNotice(notice, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.maxLength, maxLength = _c === void 0 ? 64000 : _c, _d = _b.keysBlocklist, keysBlocklist = _d === void 0 ? [] : _d;
        if (notice.errors) {
            for (var i = 0; i < notice.errors.length; i++) {
                var t = new Truncator({ keysBlocklist: keysBlocklist });
                notice.errors[i] = t.truncate(notice.errors[i]);
            }
        }
        var s = '';
        var keys = ['params', 'environment', 'session'];
        for (var level = 0; level < 8; level++) {
            var opts = { level: level, keysBlocklist: keysBlocklist };
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var obj = notice[key];
                if (obj) {
                    notice[key] = truncate(obj, opts);
                }
            }
            s = JSON.stringify(notice);
            if (s.length < maxLength) {
                return s;
            }
        }
        var params = {
            json: s.slice(0, Math.floor(maxLength / 2)) + '...',
        };
        keys.push('errors');
        for (var _e = 0, keys_2 = keys; _e < keys_2.length; _e++) {
            var key = keys_2[_e];
            var obj = notice[key];
            if (!obj) {
                continue;
            }
            s = JSON.stringify(obj);
            params[key] = s.length;
        }
        var err = new Error("airbrake: notice exceeds max length and can't be truncated");
        err.params = params;
        throw err;
    }
    function scale(num, level) {
        return num >> level || 1;
    }
    var Truncator = /** @class */ (function () {
        function Truncator(opts) {
            this.maxStringLength = 1024;
            this.maxObjectLength = MAX_OBJ_LENGTH;
            this.maxArrayLength = MAX_OBJ_LENGTH;
            this.maxDepth = 8;
            this.keys = [];
            this.keysBlocklist = [];
            this.seen = [];
            var level = opts.level || 0;
            this.keysBlocklist = opts.keysBlocklist || [];
            this.maxStringLength = scale(this.maxStringLength, level);
            this.maxObjectLength = scale(this.maxObjectLength, level);
            this.maxArrayLength = scale(this.maxArrayLength, level);
            this.maxDepth = scale(this.maxDepth, level);
        }
        Truncator.prototype.truncate = function (value, key, depth) {
            if (key === void 0) { key = ''; }
            if (depth === void 0) { depth = 0; }
            if (value === null || value === undefined) {
                return value;
            }
            switch (typeof value) {
                case 'boolean':
                case 'number':
                case 'function':
                    return value;
                case 'string':
                    return this.truncateString(value);
                case 'object':
                    break;
                default:
                    return this.truncateString(String(value));
            }
            if (value instanceof String) {
                return this.truncateString(value.toString());
            }
            if (value instanceof Boolean ||
                value instanceof Number ||
                value instanceof Date ||
                value instanceof RegExp) {
                return value;
            }
            if (value instanceof Error) {
                return this.truncateString(value.toString());
            }
            if (this.seen.indexOf(value) >= 0) {
                return "[Circular ".concat(this.getPath(value), "]");
            }
            var type = objectType(value);
            depth++;
            if (depth > this.maxDepth) {
                return "[Truncated ".concat(type, "]");
            }
            this.keys.push(key);
            this.seen.push(value);
            switch (type) {
                case 'Array':
                    return this.truncateArray(value, depth);
                case 'Object':
                    return this.truncateObject(value, depth);
                default:
                    var saved = this.maxDepth;
                    this.maxDepth = 0;
                    var obj = this.truncateObject(value, depth);
                    obj.__type = type;
                    this.maxDepth = saved;
                    return obj;
            }
        };
        Truncator.prototype.getPath = function (value) {
            var index = this.seen.indexOf(value);
            var path = [this.keys[index]];
            for (var i = index; i >= 0; i--) {
                var sub = this.seen[i];
                if (sub && getAttr(sub, path[0]) === value) {
                    value = sub;
                    path.unshift(this.keys[i]);
                }
            }
            return '~' + path.join('.');
        };
        Truncator.prototype.truncateString = function (s) {
            if (s.length > this.maxStringLength) {
                return s.slice(0, this.maxStringLength) + '...';
            }
            return s;
        };
        Truncator.prototype.truncateArray = function (arr, depth) {
            if (depth === void 0) { depth = 0; }
            var length = 0;
            var dst = [];
            for (var i = 0; i < arr.length; i++) {
                var el = arr[i];
                dst.push(this.truncate(el, i.toString(), depth));
                length++;
                if (length >= this.maxArrayLength) {
                    break;
                }
            }
            return dst;
        };
        Truncator.prototype.truncateObject = function (obj, depth) {
            if (depth === void 0) { depth = 0; }
            var length = 0;
            var dst = {};
            for (var key in obj) {
                if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                    continue;
                }
                if (isBlocklisted(key, this.keysBlocklist)) {
                    dst[key] = FILTERED;
                    continue;
                }
                var value = getAttr(obj, key);
                if (value === undefined || typeof value === 'function') {
                    continue;
                }
                dst[key] = this.truncate(value, key, depth);
                length++;
                if (length >= this.maxObjectLength) {
                    break;
                }
            }
            return dst;
        };
        return Truncator;
    }());
    function truncate(value, opts) {
        if (opts === void 0) { opts = {}; }
        var t = new Truncator(opts);
        return t.truncate(value);
    }
    function getAttr(obj, attr) {
        // Ignore browser specific exception trying to read an attribute (#79).
        try {
            return obj[attr];
        }
        catch (_) {
            return;
        }
    }
    function objectType(obj) {
        var s = Object.prototype.toString.apply(obj);
        return s.slice('[object '.length, -1);
    }
    function isBlocklisted(key, keysBlocklist) {
        for (var _i = 0, keysBlocklist_1 = keysBlocklist; _i < keysBlocklist_1.length; _i++) {
            var v = keysBlocklist_1[_i];
            if (v === key) {
                return true;
            }
            if (v instanceof RegExp) {
                if (key.match(v)) {
                    return true;
                }
            }
        }
        return false;
    }

    var Span = /** @class */ (function () {
        function Span(metric, name, startTime) {
            this._dur = 0;
            this._level = 0;
            this._metric = metric;
            this.name = name;
            this.startTime = startTime || new Date();
        }
        Span.prototype.end = function (endTime) {
            this.endTime = endTime ? endTime : new Date();
            this._dur += this.endTime.getTime() - this.startTime.getTime();
            this._metric._incGroup(this.name, this._dur);
            this._metric = null;
        };
        Span.prototype._pause = function () {
            if (this._paused()) {
                return;
            }
            var now = new Date();
            this._dur += now.getTime() - this.startTime.getTime();
            this.startTime = null;
        };
        Span.prototype._resume = function () {
            if (!this._paused()) {
                return;
            }
            this.startTime = new Date();
        };
        Span.prototype._paused = function () {
            return this.startTime == null;
        };
        return Span;
    }());
    var BaseMetric = /** @class */ (function () {
        function BaseMetric() {
            this._spans = {};
            this._groups = {};
            this.startTime = new Date();
        }
        BaseMetric.prototype.end = function (endTime) {
            if (!this.endTime) {
                this.endTime = endTime || new Date();
            }
        };
        BaseMetric.prototype.isRecording = function () {
            return true;
        };
        BaseMetric.prototype.startSpan = function (name, startTime) {
            var span = this._spans[name];
            if (span) {
                span._level++;
            }
            else {
                span = new Span(this, name, startTime);
                this._spans[name] = span;
            }
        };
        BaseMetric.prototype.endSpan = function (name, endTime) {
            var span = this._spans[name];
            if (!span) {
                console.error('airbrake: span=%s does not exist', name);
                return;
            }
            if (span._level > 0) {
                span._level--;
            }
            else {
                span.end(endTime);
                delete this._spans[span.name];
            }
        };
        BaseMetric.prototype._incGroup = function (name, ms) {
            this._groups[name] = (this._groups[name] || 0) + ms;
        };
        BaseMetric.prototype._duration = function () {
            if (!this.endTime) {
                this.endTime = new Date();
            }
            return this.endTime.getTime() - this.startTime.getTime();
        };
        return BaseMetric;
    }());
    var NoopMetric = /** @class */ (function () {
        function NoopMetric() {
        }
        NoopMetric.prototype.isRecording = function () {
            return false;
        };
        NoopMetric.prototype.startSpan = function (_name, _startTime) { };
        NoopMetric.prototype.endSpan = function (_name, _startTime) { };
        NoopMetric.prototype._incGroup = function (_name, _ms) { };
        return NoopMetric;
    }());

    var Scope = /** @class */ (function () {
        function Scope() {
            this._noopMetric = new NoopMetric();
            this._context = {};
            this._historyMaxLen = 20;
            this._history = [];
        }
        Scope.prototype.clone = function () {
            var clone = new Scope();
            clone._context = __assign({}, this._context);
            clone._history = this._history.slice();
            return clone;
        };
        Scope.prototype.setContext = function (context) {
            this._context = __assign(__assign({}, this._context), context);
        };
        Scope.prototype.context = function () {
            var ctx = __assign({}, this._context);
            if (this._history.length > 0) {
                ctx.history = this._history.slice();
            }
            return ctx;
        };
        Scope.prototype.pushHistory = function (state) {
            if (this._isDupState(state)) {
                if (this._lastRecord.num) {
                    this._lastRecord.num++;
                }
                else {
                    this._lastRecord.num = 2;
                }
                return;
            }
            if (!state.date) {
                state.date = new Date();
            }
            this._history.push(state);
            this._lastRecord = state;
            if (this._history.length > this._historyMaxLen) {
                this._history = this._history.slice(-this._historyMaxLen);
            }
        };
        Scope.prototype._isDupState = function (state) {
            if (!this._lastRecord) {
                return false;
            }
            for (var key in state) {
                if (!state.hasOwnProperty(key) || key === 'date') {
                    continue;
                }
                if (state[key] !== this._lastRecord[key]) {
                    return false;
                }
            }
            return true;
        };
        Scope.prototype.routeMetric = function () {
            return this._routeMetric || this._noopMetric;
        };
        Scope.prototype.setRouteMetric = function (metric) {
            this._routeMetric = metric;
        };
        Scope.prototype.queueMetric = function () {
            return this._queueMetric || this._noopMetric;
        };
        Scope.prototype.setQueueMetric = function (metric) {
            this._queueMetric = metric;
        };
        return Scope;
    }());

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var errorStackParser = {exports: {}};

    var stackframe = {exports: {}};

    var hasRequiredStackframe;

    function requireStackframe () {
    	if (hasRequiredStackframe) return stackframe.exports;
    	hasRequiredStackframe = 1;
    	(function (module, exports) {
    		(function(root, factory) {
    		    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    		    /* istanbul ignore next */
    		    {
    		        module.exports = factory();
    		    }
    		}(commonjsGlobal, function() {
    		    function _isNumber(n) {
    		        return !isNaN(parseFloat(n)) && isFinite(n);
    		    }

    		    function _capitalize(str) {
    		        return str.charAt(0).toUpperCase() + str.substring(1);
    		    }

    		    function _getter(p) {
    		        return function() {
    		            return this[p];
    		        };
    		    }

    		    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
    		    var numericProps = ['columnNumber', 'lineNumber'];
    		    var stringProps = ['fileName', 'functionName', 'source'];
    		    var arrayProps = ['args'];
    		    var objectProps = ['evalOrigin'];

    		    var props = booleanProps.concat(numericProps, stringProps, arrayProps, objectProps);

    		    function StackFrame(obj) {
    		        if (!obj) return;
    		        for (var i = 0; i < props.length; i++) {
    		            if (obj[props[i]] !== undefined) {
    		                this['set' + _capitalize(props[i])](obj[props[i]]);
    		            }
    		        }
    		    }

    		    StackFrame.prototype = {
    		        getArgs: function() {
    		            return this.args;
    		        },
    		        setArgs: function(v) {
    		            if (Object.prototype.toString.call(v) !== '[object Array]') {
    		                throw new TypeError('Args must be an Array');
    		            }
    		            this.args = v;
    		        },

    		        getEvalOrigin: function() {
    		            return this.evalOrigin;
    		        },
    		        setEvalOrigin: function(v) {
    		            if (v instanceof StackFrame) {
    		                this.evalOrigin = v;
    		            } else if (v instanceof Object) {
    		                this.evalOrigin = new StackFrame(v);
    		            } else {
    		                throw new TypeError('Eval Origin must be an Object or StackFrame');
    		            }
    		        },

    		        toString: function() {
    		            var fileName = this.getFileName() || '';
    		            var lineNumber = this.getLineNumber() || '';
    		            var columnNumber = this.getColumnNumber() || '';
    		            var functionName = this.getFunctionName() || '';
    		            if (this.getIsEval()) {
    		                if (fileName) {
    		                    return '[eval] (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
    		                }
    		                return '[eval]:' + lineNumber + ':' + columnNumber;
    		            }
    		            if (functionName) {
    		                return functionName + ' (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
    		            }
    		            return fileName + ':' + lineNumber + ':' + columnNumber;
    		        }
    		    };

    		    StackFrame.fromString = function StackFrame$$fromString(str) {
    		        var argsStartIndex = str.indexOf('(');
    		        var argsEndIndex = str.lastIndexOf(')');

    		        var functionName = str.substring(0, argsStartIndex);
    		        var args = str.substring(argsStartIndex + 1, argsEndIndex).split(',');
    		        var locationString = str.substring(argsEndIndex + 1);

    		        if (locationString.indexOf('@') === 0) {
    		            var parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString, '');
    		            var fileName = parts[1];
    		            var lineNumber = parts[2];
    		            var columnNumber = parts[3];
    		        }

    		        return new StackFrame({
    		            functionName: functionName,
    		            args: args || undefined,
    		            fileName: fileName,
    		            lineNumber: lineNumber || undefined,
    		            columnNumber: columnNumber || undefined
    		        });
    		    };

    		    for (var i = 0; i < booleanProps.length; i++) {
    		        StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
    		        StackFrame.prototype['set' + _capitalize(booleanProps[i])] = (function(p) {
    		            return function(v) {
    		                this[p] = Boolean(v);
    		            };
    		        })(booleanProps[i]);
    		    }

    		    for (var j = 0; j < numericProps.length; j++) {
    		        StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
    		        StackFrame.prototype['set' + _capitalize(numericProps[j])] = (function(p) {
    		            return function(v) {
    		                if (!_isNumber(v)) {
    		                    throw new TypeError(p + ' must be a Number');
    		                }
    		                this[p] = Number(v);
    		            };
    		        })(numericProps[j]);
    		    }

    		    for (var k = 0; k < stringProps.length; k++) {
    		        StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
    		        StackFrame.prototype['set' + _capitalize(stringProps[k])] = (function(p) {
    		            return function(v) {
    		                this[p] = String(v);
    		            };
    		        })(stringProps[k]);
    		    }

    		    return StackFrame;
    		}));
    } (stackframe));
    	return stackframe.exports;
    }

    (function (module, exports) {
    	(function(root, factory) {
    	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    	    /* istanbul ignore next */
    	    {
    	        module.exports = factory(requireStackframe());
    	    }
    	}(commonjsGlobal, function ErrorStackParser(StackFrame) {

    	    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
    	    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
    	    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;

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

    	            var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
    	            var parts = regExp.exec(urlLike.replace(/[()]/g, ''));
    	            return [parts[1], parts[2] || undefined, parts[3] || undefined];
    	        },

    	        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
    	            var filtered = error.stack.split('\n').filter(function(line) {
    	                return !!line.match(CHROME_IE_STACK_REGEXP);
    	            }, this);

    	            return filtered.map(function(line) {
    	                if (line.indexOf('(eval ') > -1) {
    	                    // Throw away eval information until we implement stacktrace.js/stackframe#8
    	                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(,.*$)/g, '');
    	                }
    	                var sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').replace(/^.*?\s+/, '');

    	                // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
    	                // case it has spaces in it, as the string is split on \s+ later on
    	                var location = sanitizedLine.match(/ (\(.+\)$)/);

    	                // remove the parenthesized location from the line, if it was matched
    	                sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;

    	                // if a location was matched, pass it to extractLocation() otherwise pass all sanitizedLine
    	                // because this line doesn't have function name
    	                var locationParts = this.extractLocation(location ? location[1] : sanitizedLine);
    	                var functionName = location && sanitizedLine || undefined;
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
    	                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1');
    	                }

    	                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
    	                    // Safari eval frames only have function names and nothing else
    	                    return new StackFrame({
    	                        functionName: line
    	                    });
    	                } else {
    	                    var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
    	                    var matches = line.match(functionNameRegex);
    	                    var functionName = matches && matches[1] ? matches[1] : undefined;
    	                    var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));

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
    	                    .replace(/\([^)]*\)/g, '') || undefined;
    	                var argsRaw;
    	                if (functionCall.match(/\(([^)]*)\)/)) {
    	                    argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, '$1');
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
    } (errorStackParser));

    var ErrorStackParser = errorStackParser.exports;

    var hasConsole = typeof console === 'object' && console.warn;
    function parse(err) {
        try {
            return ErrorStackParser.parse(err);
        }
        catch (parseErr) {
            if (hasConsole && err.stack) {
                console.warn('ErrorStackParser:', parseErr.toString(), err.stack);
            }
        }
        if (err.fileName) {
            return [err];
        }
        return [];
    }
    function espProcessor(err) {
        var backtrace = [];
        if (err.noStack) {
            backtrace.push({
                function: err.functionName || '',
                file: err.fileName || '',
                line: err.lineNumber || 0,
                column: err.columnNumber || 0,
            });
        }
        else {
            var frames_2 = parse(err);
            if (frames_2.length === 0) {
                try {
                    throw new Error('fake');
                }
                catch (fakeErr) {
                    frames_2 = parse(fakeErr);
                    frames_2.shift();
                    frames_2.shift();
                }
            }
            for (var _i = 0, frames_1 = frames_2; _i < frames_1.length; _i++) {
                var frame = frames_1[_i];
                backtrace.push({
                    function: frame.functionName || '',
                    file: frame.fileName || '',
                    line: frame.lineNumber || 0,
                    column: frame.columnNumber || 0,
                });
            }
        }
        var type = err.name ? err.name : '';
        var msg = err.message ? String(err.message) : String(err);
        return {
            type: type,
            message: msg,
            backtrace: backtrace,
        };
    }

    var re$1 = new RegExp([
        '^',
        '\\[(\\$.+)\\]',
        '\\s',
        '([\\s\\S]+)',
        '$',
    ].join(''));
    function angularMessageFilter(notice) {
        var err = notice.errors[0];
        if (err.type !== '' && err.type !== 'Error') {
            return notice;
        }
        var m = err.message.match(re$1);
        if (m !== null) {
            err.type = m[1];
            err.message = m[2];
        }
        return notice;
    }

    function makeDebounceFilter() {
        var lastNoticeJSON;
        var timeout;
        return function (notice) {
            var s = JSON.stringify(notice.errors);
            if (s === lastNoticeJSON) {
                return null;
            }
            if (timeout) {
                clearTimeout(timeout);
            }
            lastNoticeJSON = s;
            timeout = setTimeout(function () {
                lastNoticeJSON = '';
            }, 1000);
            return notice;
        };
    }

    var IGNORED_MESSAGES = [
        'Script error',
        'Script error.',
        'InvalidAccessError',
    ];
    function ignoreNoiseFilter(notice) {
        var err = notice.errors[0];
        if (err.type === '' && IGNORED_MESSAGES.indexOf(err.message) !== -1) {
            return null;
        }
        if (err.backtrace && err.backtrace.length > 0) {
            var frame = err.backtrace[0];
            if (frame.file === '<anonymous>') {
                return null;
            }
        }
        return notice;
    }

    var re = new RegExp([
        '^',
        'Uncaught\\s',
        '(.+?)',
        ':\\s',
        '(.+)',
        '$',
    ].join(''));
    function uncaughtMessageFilter(notice) {
        var err = notice.errors[0];
        if (err.type !== '' && err.type !== 'Error') {
            return notice;
        }
        var m = err.message.match(re);
        if (m !== null) {
            err.type = m[1];
            err.message = m[2];
        }
        return notice;
    }

    var browserPonyfill = {exports: {}};

    (function (module, exports) {
    	var global = typeof self !== 'undefined' ? self : commonjsGlobal;
    	var __self__ = (function () {
    	function F() {
    	this.fetch = false;
    	this.DOMException = global.DOMException;
    	}
    	F.prototype = global;
    	return new F();
    	})();
    	(function(self) {

    	((function (exports) {

    	  var support = {
    	    searchParams: 'URLSearchParams' in self,
    	    iterable: 'Symbol' in self && 'iterator' in Symbol,
    	    blob:
    	      'FileReader' in self &&
    	      'Blob' in self &&
    	      (function() {
    	        try {
    	          new Blob();
    	          return true
    	        } catch (e) {
    	          return false
    	        }
    	      })(),
    	    formData: 'FormData' in self,
    	    arrayBuffer: 'ArrayBuffer' in self
    	  };

    	  function isDataView(obj) {
    	    return obj && DataView.prototype.isPrototypeOf(obj)
    	  }

    	  if (support.arrayBuffer) {
    	    var viewClasses = [
    	      '[object Int8Array]',
    	      '[object Uint8Array]',
    	      '[object Uint8ClampedArray]',
    	      '[object Int16Array]',
    	      '[object Uint16Array]',
    	      '[object Int32Array]',
    	      '[object Uint32Array]',
    	      '[object Float32Array]',
    	      '[object Float64Array]'
    	    ];

    	    var isArrayBufferView =
    	      ArrayBuffer.isView ||
    	      function(obj) {
    	        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    	      };
    	  }

    	  function normalizeName(name) {
    	    if (typeof name !== 'string') {
    	      name = String(name);
    	    }
    	    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    	      throw new TypeError('Invalid character in header field name')
    	    }
    	    return name.toLowerCase()
    	  }

    	  function normalizeValue(value) {
    	    if (typeof value !== 'string') {
    	      value = String(value);
    	    }
    	    return value
    	  }

    	  // Build a destructive iterator for the value list
    	  function iteratorFor(items) {
    	    var iterator = {
    	      next: function() {
    	        var value = items.shift();
    	        return {done: value === undefined, value: value}
    	      }
    	    };

    	    if (support.iterable) {
    	      iterator[Symbol.iterator] = function() {
    	        return iterator
    	      };
    	    }

    	    return iterator
    	  }

    	  function Headers(headers) {
    	    this.map = {};

    	    if (headers instanceof Headers) {
    	      headers.forEach(function(value, name) {
    	        this.append(name, value);
    	      }, this);
    	    } else if (Array.isArray(headers)) {
    	      headers.forEach(function(header) {
    	        this.append(header[0], header[1]);
    	      }, this);
    	    } else if (headers) {
    	      Object.getOwnPropertyNames(headers).forEach(function(name) {
    	        this.append(name, headers[name]);
    	      }, this);
    	    }
    	  }

    	  Headers.prototype.append = function(name, value) {
    	    name = normalizeName(name);
    	    value = normalizeValue(value);
    	    var oldValue = this.map[name];
    	    this.map[name] = oldValue ? oldValue + ', ' + value : value;
    	  };

    	  Headers.prototype['delete'] = function(name) {
    	    delete this.map[normalizeName(name)];
    	  };

    	  Headers.prototype.get = function(name) {
    	    name = normalizeName(name);
    	    return this.has(name) ? this.map[name] : null
    	  };

    	  Headers.prototype.has = function(name) {
    	    return this.map.hasOwnProperty(normalizeName(name))
    	  };

    	  Headers.prototype.set = function(name, value) {
    	    this.map[normalizeName(name)] = normalizeValue(value);
    	  };

    	  Headers.prototype.forEach = function(callback, thisArg) {
    	    for (var name in this.map) {
    	      if (this.map.hasOwnProperty(name)) {
    	        callback.call(thisArg, this.map[name], name, this);
    	      }
    	    }
    	  };

    	  Headers.prototype.keys = function() {
    	    var items = [];
    	    this.forEach(function(value, name) {
    	      items.push(name);
    	    });
    	    return iteratorFor(items)
    	  };

    	  Headers.prototype.values = function() {
    	    var items = [];
    	    this.forEach(function(value) {
    	      items.push(value);
    	    });
    	    return iteratorFor(items)
    	  };

    	  Headers.prototype.entries = function() {
    	    var items = [];
    	    this.forEach(function(value, name) {
    	      items.push([name, value]);
    	    });
    	    return iteratorFor(items)
    	  };

    	  if (support.iterable) {
    	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    	  }

    	  function consumed(body) {
    	    if (body.bodyUsed) {
    	      return Promise.reject(new TypeError('Already read'))
    	    }
    	    body.bodyUsed = true;
    	  }

    	  function fileReaderReady(reader) {
    	    return new Promise(function(resolve, reject) {
    	      reader.onload = function() {
    	        resolve(reader.result);
    	      };
    	      reader.onerror = function() {
    	        reject(reader.error);
    	      };
    	    })
    	  }

    	  function readBlobAsArrayBuffer(blob) {
    	    var reader = new FileReader();
    	    var promise = fileReaderReady(reader);
    	    reader.readAsArrayBuffer(blob);
    	    return promise
    	  }

    	  function readBlobAsText(blob) {
    	    var reader = new FileReader();
    	    var promise = fileReaderReady(reader);
    	    reader.readAsText(blob);
    	    return promise
    	  }

    	  function readArrayBufferAsText(buf) {
    	    var view = new Uint8Array(buf);
    	    var chars = new Array(view.length);

    	    for (var i = 0; i < view.length; i++) {
    	      chars[i] = String.fromCharCode(view[i]);
    	    }
    	    return chars.join('')
    	  }

    	  function bufferClone(buf) {
    	    if (buf.slice) {
    	      return buf.slice(0)
    	    } else {
    	      var view = new Uint8Array(buf.byteLength);
    	      view.set(new Uint8Array(buf));
    	      return view.buffer
    	    }
    	  }

    	  function Body() {
    	    this.bodyUsed = false;

    	    this._initBody = function(body) {
    	      this._bodyInit = body;
    	      if (!body) {
    	        this._bodyText = '';
    	      } else if (typeof body === 'string') {
    	        this._bodyText = body;
    	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
    	        this._bodyBlob = body;
    	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
    	        this._bodyFormData = body;
    	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
    	        this._bodyText = body.toString();
    	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
    	        this._bodyArrayBuffer = bufferClone(body.buffer);
    	        // IE 10-11 can't handle a DataView body.
    	        this._bodyInit = new Blob([this._bodyArrayBuffer]);
    	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
    	        this._bodyArrayBuffer = bufferClone(body);
    	      } else {
    	        this._bodyText = body = Object.prototype.toString.call(body);
    	      }

    	      if (!this.headers.get('content-type')) {
    	        if (typeof body === 'string') {
    	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
    	        } else if (this._bodyBlob && this._bodyBlob.type) {
    	          this.headers.set('content-type', this._bodyBlob.type);
    	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
    	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    	        }
    	      }
    	    };

    	    if (support.blob) {
    	      this.blob = function() {
    	        var rejected = consumed(this);
    	        if (rejected) {
    	          return rejected
    	        }

    	        if (this._bodyBlob) {
    	          return Promise.resolve(this._bodyBlob)
    	        } else if (this._bodyArrayBuffer) {
    	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
    	        } else if (this._bodyFormData) {
    	          throw new Error('could not read FormData body as blob')
    	        } else {
    	          return Promise.resolve(new Blob([this._bodyText]))
    	        }
    	      };

    	      this.arrayBuffer = function() {
    	        if (this._bodyArrayBuffer) {
    	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
    	        } else {
    	          return this.blob().then(readBlobAsArrayBuffer)
    	        }
    	      };
    	    }

    	    this.text = function() {
    	      var rejected = consumed(this);
    	      if (rejected) {
    	        return rejected
    	      }

    	      if (this._bodyBlob) {
    	        return readBlobAsText(this._bodyBlob)
    	      } else if (this._bodyArrayBuffer) {
    	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    	      } else if (this._bodyFormData) {
    	        throw new Error('could not read FormData body as text')
    	      } else {
    	        return Promise.resolve(this._bodyText)
    	      }
    	    };

    	    if (support.formData) {
    	      this.formData = function() {
    	        return this.text().then(decode)
    	      };
    	    }

    	    this.json = function() {
    	      return this.text().then(JSON.parse)
    	    };

    	    return this
    	  }

    	  // HTTP methods whose capitalization should be normalized
    	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    	  function normalizeMethod(method) {
    	    var upcased = method.toUpperCase();
    	    return methods.indexOf(upcased) > -1 ? upcased : method
    	  }

    	  function Request(input, options) {
    	    options = options || {};
    	    var body = options.body;

    	    if (input instanceof Request) {
    	      if (input.bodyUsed) {
    	        throw new TypeError('Already read')
    	      }
    	      this.url = input.url;
    	      this.credentials = input.credentials;
    	      if (!options.headers) {
    	        this.headers = new Headers(input.headers);
    	      }
    	      this.method = input.method;
    	      this.mode = input.mode;
    	      this.signal = input.signal;
    	      if (!body && input._bodyInit != null) {
    	        body = input._bodyInit;
    	        input.bodyUsed = true;
    	      }
    	    } else {
    	      this.url = String(input);
    	    }

    	    this.credentials = options.credentials || this.credentials || 'same-origin';
    	    if (options.headers || !this.headers) {
    	      this.headers = new Headers(options.headers);
    	    }
    	    this.method = normalizeMethod(options.method || this.method || 'GET');
    	    this.mode = options.mode || this.mode || null;
    	    this.signal = options.signal || this.signal;
    	    this.referrer = null;

    	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    	      throw new TypeError('Body not allowed for GET or HEAD requests')
    	    }
    	    this._initBody(body);
    	  }

    	  Request.prototype.clone = function() {
    	    return new Request(this, {body: this._bodyInit})
    	  };

    	  function decode(body) {
    	    var form = new FormData();
    	    body
    	      .trim()
    	      .split('&')
    	      .forEach(function(bytes) {
    	        if (bytes) {
    	          var split = bytes.split('=');
    	          var name = split.shift().replace(/\+/g, ' ');
    	          var value = split.join('=').replace(/\+/g, ' ');
    	          form.append(decodeURIComponent(name), decodeURIComponent(value));
    	        }
    	      });
    	    return form
    	  }

    	  function parseHeaders(rawHeaders) {
    	    var headers = new Headers();
    	    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    	    // https://tools.ietf.org/html/rfc7230#section-3.2
    	    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    	    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
    	      var parts = line.split(':');
    	      var key = parts.shift().trim();
    	      if (key) {
    	        var value = parts.join(':').trim();
    	        headers.append(key, value);
    	      }
    	    });
    	    return headers
    	  }

    	  Body.call(Request.prototype);

    	  function Response(bodyInit, options) {
    	    if (!options) {
    	      options = {};
    	    }

    	    this.type = 'default';
    	    this.status = options.status === undefined ? 200 : options.status;
    	    this.ok = this.status >= 200 && this.status < 300;
    	    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    	    this.headers = new Headers(options.headers);
    	    this.url = options.url || '';
    	    this._initBody(bodyInit);
    	  }

    	  Body.call(Response.prototype);

    	  Response.prototype.clone = function() {
    	    return new Response(this._bodyInit, {
    	      status: this.status,
    	      statusText: this.statusText,
    	      headers: new Headers(this.headers),
    	      url: this.url
    	    })
    	  };

    	  Response.error = function() {
    	    var response = new Response(null, {status: 0, statusText: ''});
    	    response.type = 'error';
    	    return response
    	  };

    	  var redirectStatuses = [301, 302, 303, 307, 308];

    	  Response.redirect = function(url, status) {
    	    if (redirectStatuses.indexOf(status) === -1) {
    	      throw new RangeError('Invalid status code')
    	    }

    	    return new Response(null, {status: status, headers: {location: url}})
    	  };

    	  exports.DOMException = self.DOMException;
    	  try {
    	    new exports.DOMException();
    	  } catch (err) {
    	    exports.DOMException = function(message, name) {
    	      this.message = message;
    	      this.name = name;
    	      var error = Error(message);
    	      this.stack = error.stack;
    	    };
    	    exports.DOMException.prototype = Object.create(Error.prototype);
    	    exports.DOMException.prototype.constructor = exports.DOMException;
    	  }

    	  function fetch(input, init) {
    	    return new Promise(function(resolve, reject) {
    	      var request = new Request(input, init);

    	      if (request.signal && request.signal.aborted) {
    	        return reject(new exports.DOMException('Aborted', 'AbortError'))
    	      }

    	      var xhr = new XMLHttpRequest();

    	      function abortXhr() {
    	        xhr.abort();
    	      }

    	      xhr.onload = function() {
    	        var options = {
    	          status: xhr.status,
    	          statusText: xhr.statusText,
    	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
    	        };
    	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
    	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
    	        resolve(new Response(body, options));
    	      };

    	      xhr.onerror = function() {
    	        reject(new TypeError('Network request failed'));
    	      };

    	      xhr.ontimeout = function() {
    	        reject(new TypeError('Network request failed'));
    	      };

    	      xhr.onabort = function() {
    	        reject(new exports.DOMException('Aborted', 'AbortError'));
    	      };

    	      xhr.open(request.method, request.url, true);

    	      if (request.credentials === 'include') {
    	        xhr.withCredentials = true;
    	      } else if (request.credentials === 'omit') {
    	        xhr.withCredentials = false;
    	      }

    	      if ('responseType' in xhr && support.blob) {
    	        xhr.responseType = 'blob';
    	      }

    	      request.headers.forEach(function(value, name) {
    	        xhr.setRequestHeader(name, value);
    	      });

    	      if (request.signal) {
    	        request.signal.addEventListener('abort', abortXhr);

    	        xhr.onreadystatechange = function() {
    	          // DONE (success or failure)
    	          if (xhr.readyState === 4) {
    	            request.signal.removeEventListener('abort', abortXhr);
    	          }
    	        };
    	      }

    	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    	    })
    	  }

    	  fetch.polyfill = true;

    	  if (!self.fetch) {
    	    self.fetch = fetch;
    	    self.Headers = Headers;
    	    self.Request = Request;
    	    self.Response = Response;
    	  }

    	  exports.Headers = Headers;
    	  exports.Request = Request;
    	  exports.Response = Response;
    	  exports.fetch = fetch;

    	  Object.defineProperty(exports, '__esModule', { value: true });

    	  return exports;

    	}))({});
    	})(__self__);
    	__self__.fetch.ponyfill = true;
    	// Remove "polyfill" property added by whatwg-fetch
    	delete __self__.fetch.polyfill;
    	// Choose between native implementation (global) or custom implementation (__self__)
    	// var ctx = global.fetch ? global : __self__;
    	var ctx = __self__; // this line disable service worker support temporarily
    	exports = ctx.fetch; // To enable: import fetch from 'cross-fetch'
    	exports.default = ctx.fetch; // For TypeScript consumers without esModuleInterop.
    	exports.fetch = ctx.fetch; // To enable: import {fetch} from 'cross-fetch'
    	exports.Headers = ctx.Headers;
    	exports.Request = ctx.Request;
    	exports.Response = ctx.Response;
    	module.exports = exports;
    } (browserPonyfill, browserPonyfill.exports));

    var fetch$1 = /*@__PURE__*/getDefaultExportFromCjs(browserPonyfill.exports);

    var errors = {
        unauthorized: new Error('airbrake: unauthorized: project id or key are wrong'),
        ipRateLimited: new Error('airbrake: IP is rate limited'),
    };

    var rateLimitReset$1 = 0;
    function request$1(req) {
        var utime = Date.now() / 1000;
        if (utime < rateLimitReset$1) {
            return Promise$1.reject(errors.ipRateLimited);
        }
        var opt = {
            method: req.method,
            body: req.body,
            headers: req.headers,
        };
        return fetch$1(req.url, opt).then(function (resp) {
            if (resp.status === 401) {
                throw errors.unauthorized;
            }
            if (resp.status === 429) {
                var s = resp.headers.get('X-RateLimit-Delay');
                if (!s) {
                    throw errors.ipRateLimited;
                }
                var n = parseInt(s, 10);
                if (n > 0) {
                    rateLimitReset$1 = Date.now() / 1000 + n;
                }
                throw errors.ipRateLimited;
            }
            if (resp.status === 204) {
                return { json: null };
            }
            if (resp.status === 404) {
                throw new Error('404 Not Found');
            }
            if (resp.status >= 200 && resp.status < 300) {
                return resp.json().then(function (json) {
                    return { json: json };
                });
            }
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(function (json) {
                    var err = new Error(json.message);
                    throw err;
                });
            }
            return resp.text().then(function (body) {
                var err = new Error("airbrake: fetch: unexpected response: code=".concat(resp.status, " body='").concat(body, "'"));
                throw err;
            });
        });
    }

    function makeRequester$1(api) {
        return function (req) {
            return request(req, api);
        };
    }
    var rateLimitReset = 0;
    function request(req, api) {
        var utime = Date.now() / 1000;
        if (utime < rateLimitReset) {
            return Promise$1.reject(errors.ipRateLimited);
        }
        return new Promise$1(function (resolve, reject) {
            api({
                url: req.url,
                method: req.method,
                body: req.body,
                headers: {
                    'content-type': 'application/json',
                },
                timeout: req.timeout,
            }, function (error, resp, body) {
                if (error) {
                    reject(error);
                    return;
                }
                if (!resp.statusCode) {
                    error = new Error("airbrake: request: response statusCode is ".concat(resp.statusCode));
                    reject(error);
                    return;
                }
                if (resp.statusCode === 401) {
                    reject(errors.unauthorized);
                    return;
                }
                if (resp.statusCode === 429) {
                    reject(errors.ipRateLimited);
                    var h = resp.headers['x-ratelimit-delay'];
                    if (!h) {
                        return;
                    }
                    var s = void 0;
                    if (typeof h === 'string') {
                        s = h;
                    }
                    else if (h instanceof Array) {
                        s = h[0];
                    }
                    else {
                        return;
                    }
                    var n = parseInt(s, 10);
                    if (n > 0) {
                        rateLimitReset = Date.now() / 1000 + n;
                    }
                    return;
                }
                if (resp.statusCode === 204) {
                    resolve({ json: null });
                    return;
                }
                if (resp.statusCode >= 200 && resp.statusCode < 300) {
                    var json = void 0;
                    try {
                        json = JSON.parse(body);
                    }
                    catch (err) {
                        reject(err);
                        return;
                    }
                    resolve(json);
                    return;
                }
                if (resp.statusCode >= 400 && resp.statusCode < 500) {
                    var json = void 0;
                    try {
                        json = JSON.parse(body);
                    }
                    catch (err) {
                        reject(err);
                        return;
                    }
                    error = new Error(json.message);
                    reject(error);
                    return;
                }
                body = body.trim();
                error = new Error("airbrake: node: unexpected response: code=".concat(resp.statusCode, " body='").concat(body, "'"));
                reject(error);
            });
        });
    }

    function makeRequester(opts) {
        if (opts.request) {
            return makeRequester$1(opts.request);
        }
        return request$1;
    }

    var tdigest;
    var hasTdigest = false;
    try {
        tdigest = require('tdigest');
        hasTdigest = true;
    }
    catch (err) { }
    var TDigestStat = /** @class */ (function () {
        function TDigestStat() {
            this.count = 0;
            this.sum = 0;
            this.sumsq = 0;
            this._td = new tdigest.Digest();
        }
        TDigestStat.prototype.add = function (ms) {
            if (ms === 0) {
                ms = 0.00001;
            }
            this.count += 1;
            this.sum += ms;
            this.sumsq += ms * ms;
            if (this._td) {
                this._td.push(ms);
            }
        };
        TDigestStat.prototype.toJSON = function () {
            return {
                count: this.count,
                sum: this.sum,
                sumsq: this.sumsq,
                tdigestCentroids: tdigestCentroids(this._td),
            };
        };
        return TDigestStat;
    }());
    var TDigestStatGroups = /** @class */ (function (_super) {
        __extends(TDigestStatGroups, _super);
        function TDigestStatGroups() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.groups = {};
            return _this;
        }
        TDigestStatGroups.prototype.addGroups = function (totalMs, groups) {
            this.add(totalMs);
            for (var name_1 in groups) {
                if (groups.hasOwnProperty(name_1)) {
                    this.addGroup(name_1, groups[name_1]);
                }
            }
        };
        TDigestStatGroups.prototype.addGroup = function (name, ms) {
            var stat = this.groups[name];
            if (!stat) {
                stat = new TDigestStat();
                this.groups[name] = stat;
            }
            stat.add(ms);
        };
        TDigestStatGroups.prototype.toJSON = function () {
            return {
                count: this.count,
                sum: this.sum,
                sumsq: this.sumsq,
                tdigestCentroids: tdigestCentroids(this._td),
                groups: this.groups,
            };
        };
        return TDigestStatGroups;
    }(TDigestStat));
    function tdigestCentroids(td) {
        var means = [];
        var counts = [];
        td.centroids.each(function (c) {
            means.push(c.mean);
            counts.push(c.n);
        });
        return {
            mean: means,
            count: counts,
        };
    }

    var FLUSH_INTERVAL$2 = 15000; // 15 seconds
    var QueryInfo = /** @class */ (function () {
        function QueryInfo(query) {
            if (query === void 0) { query = ''; }
            this.method = '';
            this.route = '';
            this.query = '';
            this.func = '';
            this.file = '';
            this.line = 0;
            this.startTime = new Date();
            this.query = query;
        }
        QueryInfo.prototype._duration = function () {
            if (!this.endTime) {
                this.endTime = new Date();
            }
            return this.endTime.getTime() - this.startTime.getTime();
        };
        return QueryInfo;
    }());
    var QueriesStats = /** @class */ (function () {
        function QueriesStats(opt) {
            this._m = {};
            this._opt = opt;
            this._url = "".concat(opt.host, "/api/v5/projects/").concat(opt.projectId, "/queries-stats?key=").concat(opt.projectKey);
            this._requester = makeRequester(opt);
        }
        QueriesStats.prototype.start = function (query) {
            if (query === void 0) { query = ''; }
            return new QueryInfo(query);
        };
        QueriesStats.prototype.notify = function (q) {
            var _this = this;
            if (!hasTdigest) {
                return;
            }
            if (!this._opt.performanceStats) {
                return;
            }
            if (!this._opt.queryStats) {
                return;
            }
            var ms = q._duration();
            var minute = 60 * 1000;
            var startTime = new Date(Math.floor(q.startTime.getTime() / minute) * minute);
            var key = {
                method: q.method,
                route: q.route,
                query: q.query,
                func: q.func,
                file: q.file,
                line: q.line,
                time: startTime,
            };
            var keyStr = JSON.stringify(key);
            var stat = this._m[keyStr];
            if (!stat) {
                stat = new TDigestStat();
                this._m[keyStr] = stat;
            }
            stat.add(ms);
            if (this._timer) {
                return;
            }
            this._timer = setTimeout(function () {
                _this._flush();
            }, FLUSH_INTERVAL$2);
        };
        QueriesStats.prototype._flush = function () {
            var queries = [];
            for (var keyStr in this._m) {
                if (!this._m.hasOwnProperty(keyStr)) {
                    continue;
                }
                var key = JSON.parse(keyStr);
                var v = __assign(__assign({}, key), this._m[keyStr].toJSON());
                queries.push(v);
            }
            this._m = {};
            this._timer = null;
            var outJSON = JSON.stringify({
                environment: this._opt.environment,
                queries: queries,
            });
            var req = {
                method: 'POST',
                url: this._url,
                body: outJSON,
            };
            this._requester(req)
                .then(function (_resp) {
                // nothing
            })
                .catch(function (err) {
                if (console.error) {
                    console.error('can not report queries stats', err);
                }
            });
        };
        return QueriesStats;
    }());

    var FLUSH_INTERVAL$1 = 15000; // 15 seconds
    var QueueMetric = /** @class */ (function (_super) {
        __extends(QueueMetric, _super);
        function QueueMetric(queue) {
            var _this = _super.call(this) || this;
            _this.queue = queue;
            _this.startTime = new Date();
            return _this;
        }
        return QueueMetric;
    }(BaseMetric));
    var QueuesStats = /** @class */ (function () {
        function QueuesStats(opt) {
            this._m = {};
            this._opt = opt;
            this._url = "".concat(opt.host, "/api/v5/projects/").concat(opt.projectId, "/queues-stats?key=").concat(opt.projectKey);
            this._requester = makeRequester(opt);
        }
        QueuesStats.prototype.notify = function (q) {
            var _this = this;
            if (!hasTdigest) {
                return;
            }
            if (!this._opt.performanceStats) {
                return;
            }
            if (!this._opt.queueStats) {
                return;
            }
            var ms = q._duration();
            if (ms === 0) {
                ms = 0.00001;
            }
            var minute = 60 * 1000;
            var startTime = new Date(Math.floor(q.startTime.getTime() / minute) * minute);
            var key = {
                queue: q.queue,
                time: startTime,
            };
            var keyStr = JSON.stringify(key);
            var stat = this._m[keyStr];
            if (!stat) {
                stat = new TDigestStatGroups();
                this._m[keyStr] = stat;
            }
            stat.addGroups(ms, q._groups);
            if (this._timer) {
                return;
            }
            this._timer = setTimeout(function () {
                _this._flush();
            }, FLUSH_INTERVAL$1);
        };
        QueuesStats.prototype._flush = function () {
            var queues = [];
            for (var keyStr in this._m) {
                if (!this._m.hasOwnProperty(keyStr)) {
                    continue;
                }
                var key = JSON.parse(keyStr);
                var v = __assign(__assign({}, key), this._m[keyStr].toJSON());
                queues.push(v);
            }
            this._m = {};
            this._timer = null;
            var outJSON = JSON.stringify({
                environment: this._opt.environment,
                queues: queues,
            });
            var req = {
                method: 'POST',
                url: this._url,
                body: outJSON,
            };
            this._requester(req)
                .then(function (_resp) {
                // nothing
            })
                .catch(function (err) {
                if (console.error) {
                    console.error('can not report queues breakdowns', err);
                }
            });
        };
        return QueuesStats;
    }());

    var FLUSH_INTERVAL = 15000; // 15 seconds
    var RouteMetric = /** @class */ (function (_super) {
        __extends(RouteMetric, _super);
        function RouteMetric(method, route, statusCode, contentType) {
            if (method === void 0) { method = ''; }
            if (route === void 0) { route = ''; }
            if (statusCode === void 0) { statusCode = 0; }
            if (contentType === void 0) { contentType = ''; }
            var _this = _super.call(this) || this;
            _this.method = method;
            _this.route = route;
            _this.statusCode = statusCode;
            _this.contentType = contentType;
            _this.startTime = new Date();
            return _this;
        }
        return RouteMetric;
    }(BaseMetric));
    var RoutesStats = /** @class */ (function () {
        function RoutesStats(opt) {
            this._m = {};
            this._opt = opt;
            this._url = "".concat(opt.host, "/api/v5/projects/").concat(opt.projectId, "/routes-stats?key=").concat(opt.projectKey);
            this._requester = makeRequester(opt);
        }
        RoutesStats.prototype.notify = function (req) {
            var _this = this;
            if (!hasTdigest) {
                return;
            }
            if (!this._opt.performanceStats) {
                return;
            }
            var ms = req._duration();
            var minute = 60 * 1000;
            var startTime = new Date(Math.floor(req.startTime.getTime() / minute) * minute);
            var key = {
                method: req.method,
                route: req.route,
                statusCode: req.statusCode,
                time: startTime,
            };
            var keyStr = JSON.stringify(key);
            var stat = this._m[keyStr];
            if (!stat) {
                stat = new TDigestStat();
                this._m[keyStr] = stat;
            }
            stat.add(ms);
            if (this._timer) {
                return;
            }
            this._timer = setTimeout(function () {
                _this._flush();
            }, FLUSH_INTERVAL);
        };
        RoutesStats.prototype._flush = function () {
            var routes = [];
            for (var keyStr in this._m) {
                if (!this._m.hasOwnProperty(keyStr)) {
                    continue;
                }
                var key = JSON.parse(keyStr);
                var v = __assign(__assign({}, key), this._m[keyStr].toJSON());
                routes.push(v);
            }
            this._m = {};
            this._timer = null;
            var outJSON = JSON.stringify({
                environment: this._opt.environment,
                routes: routes,
            });
            var req = {
                method: 'POST',
                url: this._url,
                body: outJSON,
            };
            this._requester(req)
                .then(function (_resp) {
                // nothing
            })
                .catch(function (err) {
                if (console.error) {
                    console.error('can not report routes stats', err);
                }
            });
        };
        return RoutesStats;
    }());
    var RoutesBreakdowns = /** @class */ (function () {
        function RoutesBreakdowns(opt) {
            this._m = {};
            this._opt = opt;
            this._url = "".concat(opt.host, "/api/v5/projects/").concat(opt.projectId, "/routes-breakdowns?key=").concat(opt.projectKey);
            this._requester = makeRequester(opt);
        }
        RoutesBreakdowns.prototype.notify = function (req) {
            var _this = this;
            if (!hasTdigest) {
                return;
            }
            if (!this._opt.performanceStats) {
                return;
            }
            if (req.statusCode < 200 ||
                (req.statusCode >= 300 && req.statusCode < 400) ||
                req.statusCode === 404 ||
                Object.keys(req._groups).length === 0) {
                return;
            }
            var ms = req._duration();
            if (ms === 0) {
                ms = 0.00001;
            }
            var minute = 60 * 1000;
            var startTime = new Date(Math.floor(req.startTime.getTime() / minute) * minute);
            var key = {
                method: req.method,
                route: req.route,
                responseType: this._responseType(req),
                time: startTime,
            };
            var keyStr = JSON.stringify(key);
            var stat = this._m[keyStr];
            if (!stat) {
                stat = new TDigestStatGroups();
                this._m[keyStr] = stat;
            }
            stat.addGroups(ms, req._groups);
            if (this._timer) {
                return;
            }
            this._timer = setTimeout(function () {
                _this._flush();
            }, FLUSH_INTERVAL);
        };
        RoutesBreakdowns.prototype._flush = function () {
            var routes = [];
            for (var keyStr in this._m) {
                if (!this._m.hasOwnProperty(keyStr)) {
                    continue;
                }
                var key = JSON.parse(keyStr);
                var v = __assign(__assign({}, key), this._m[keyStr].toJSON());
                routes.push(v);
            }
            this._m = {};
            this._timer = null;
            var outJSON = JSON.stringify({
                environment: this._opt.environment,
                routes: routes,
            });
            var req = {
                method: 'POST',
                url: this._url,
                body: outJSON,
            };
            this._requester(req)
                .then(function (_resp) {
                // nothing
            })
                .catch(function (err) {
                if (console.error) {
                    console.error('can not report routes breakdowns', err);
                }
            });
        };
        RoutesBreakdowns.prototype._responseType = function (req) {
            if (req.statusCode >= 500) {
                return '5xx';
            }
            if (req.statusCode >= 400) {
                return '4xx';
            }
            if (!req.contentType) {
                return '';
            }
            var s = req.contentType.split(';')[0].split('/');
            return s[s.length - 1];
        };
        return RoutesBreakdowns;
    }());

    var NOTIFIER_NAME = 'airbrake-js/browser';
    var NOTIFIER_VERSION = '2.1.8';
    var NOTIFIER_URL = 'https://github.com/airbrake/airbrake-js/tree/master/packages/browser';

    // API version to poll.
    var API_VER = '2020-06-18';
    // How frequently we should poll the config API.
    var DEFAULT_INTERVAL = 600000; // 10 minutes
    var NOTIFIER_INFO = {
        notifier_name: NOTIFIER_NAME,
        notifier_version: NOTIFIER_VERSION,
        os: typeof window !== 'undefined' &&
            window.navigator &&
            window.navigator.userAgent
            ? window.navigator.userAgent
            : undefined,
        language: 'JavaScript',
    };
    // Remote config settings.
    var ERROR_SETTING = 'errors';
    var APM_SETTING = 'apm';
    var RemoteSettings = /** @class */ (function () {
        function RemoteSettings(opt) {
            this._opt = opt;
            this._requester = makeRequester(opt);
            this._data = new SettingsData(opt.projectId, {
                project_id: null,
                poll_sec: 0,
                updated_at: 0,
                config_route: '',
                settings: [],
            });
            this._origErrorNotifications = opt.errorNotifications;
            this._origPerformanceStats = opt.performanceStats;
        }
        RemoteSettings.prototype.poll = function () {
            var _this = this;
            // First request is immediate. When it's done, we cancel it since we want to
            // change interval time to the default value.
            var pollerId = setInterval(function () {
                _this._doRequest();
                clearInterval(pollerId);
            }, 0);
            // Second fetch is what always runs in background.
            return setInterval(this._doRequest.bind(this), DEFAULT_INTERVAL);
        };
        RemoteSettings.prototype._doRequest = function () {
            var _this = this;
            this._requester(this._requestParams(this._opt))
                .then(function (resp) {
                _this._data.merge(resp.json);
                _this._opt.host = _this._data.errorHost();
                _this._opt.apmHost = _this._data.apmHost();
                _this._processErrorNotifications(_this._data);
                _this._processPerformanceStats(_this._data);
            })
                .catch(function (_) {
                return;
            });
        };
        RemoteSettings.prototype._requestParams = function (opt) {
            return {
                method: 'GET',
                url: this._pollUrl(opt),
                headers: {
                    Accept: 'application/json',
                    'Cache-Control': 'no-cache,no-store',
                },
            };
        };
        RemoteSettings.prototype._pollUrl = function (opt) {
            var url = this._data.configRoute(opt.remoteConfigHost);
            var queryParams = '?';
            for (var _i = 0, _a = this._entries(NOTIFIER_INFO); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                queryParams += "&".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(value));
            }
            return url + queryParams;
        };
        RemoteSettings.prototype._processErrorNotifications = function (data) {
            if (!this._origErrorNotifications) {
                return;
            }
            this._opt.errorNotifications = data.errorNotifications();
        };
        RemoteSettings.prototype._processPerformanceStats = function (data) {
            if (!this._origPerformanceStats) {
                return;
            }
            this._opt.performanceStats = data.performanceStats();
        };
        // Polyfill from:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#polyfill
        RemoteSettings.prototype._entries = function (obj) {
            var ownProps = Object.keys(obj);
            var i = ownProps.length;
            var resArray = new Array(i);
            while (i--)
                resArray[i] = [ownProps[i], obj[ownProps[i]]];
            return resArray;
        };
        return RemoteSettings;
    }());
    var SettingsData = /** @class */ (function () {
        function SettingsData(projectId, data) {
            this._projectId = projectId;
            this._data = data;
        }
        SettingsData.prototype.merge = function (other) {
            this._data = __assign(__assign({}, this._data), other);
        };
        SettingsData.prototype.configRoute = function (remoteConfigHost) {
            var host = remoteConfigHost.replace(/\/$/, '');
            var configRoute = this._data.config_route;
            if (configRoute === null ||
                configRoute === undefined ||
                configRoute === '') {
                return "".concat(host, "/").concat(API_VER, "/config/").concat(this._projectId, "/config.json");
            }
            else {
                return "".concat(host, "/").concat(configRoute);
            }
        };
        SettingsData.prototype.errorNotifications = function () {
            var s = this._findSetting(ERROR_SETTING);
            if (s === null) {
                return true;
            }
            return s.enabled;
        };
        SettingsData.prototype.performanceStats = function () {
            var s = this._findSetting(APM_SETTING);
            if (s === null) {
                return true;
            }
            return s.enabled;
        };
        SettingsData.prototype.errorHost = function () {
            var s = this._findSetting(ERROR_SETTING);
            if (s === null) {
                return null;
            }
            return s.endpoint;
        };
        SettingsData.prototype.apmHost = function () {
            var s = this._findSetting(APM_SETTING);
            if (s === null) {
                return null;
            }
            return s.endpoint;
        };
        SettingsData.prototype._findSetting = function (name) {
            var settings = this._data.settings;
            if (settings === null || settings === undefined) {
                return null;
            }
            var setting = settings.find(function (s) {
                return s.name === name;
            });
            if (setting === undefined) {
                return null;
            }
            return setting;
        };
        return SettingsData;
    }());

    var BaseNotifier = /** @class */ (function () {
        function BaseNotifier(opt) {
            var _this = this;
            this._filters = [];
            this._performanceFilters = [];
            this._scope = new Scope();
            this._onClose = [];
            if (!opt.projectId || !opt.projectKey) {
                throw new Error('airbrake: projectId and projectKey are required');
            }
            this._opt = opt;
            this._opt.host = this._opt.host || 'https://api.airbrake.io';
            this._opt.remoteConfigHost =
                this._opt.remoteConfigHost || 'https://notifier-configs.airbrake.io';
            this._opt.apmHost = this._opt.apmHost || 'https://api.airbrake.io';
            this._opt.timeout = this._opt.timeout || 10000;
            this._opt.keysBlocklist = this._opt.keysBlocklist || [/password/, /secret/];
            this._url = "".concat(this._opt.host, "/api/v3/projects/").concat(this._opt.projectId, "/notices?key=").concat(this._opt.projectKey);
            this._opt.errorNotifications = this._opt.errorNotifications !== false;
            this._opt.performanceStats = this._opt.performanceStats !== false;
            this._opt.queryStats = this._opt.queryStats !== false;
            this._opt.queueStats = this._opt.queueStats !== false;
            this._opt.remoteConfig = this._opt.remoteConfig !== false;
            this._processor = this._opt.processor || espProcessor;
            this._requester = makeRequester(this._opt);
            this.addFilter(ignoreNoiseFilter);
            this.addFilter(makeDebounceFilter());
            this.addFilter(uncaughtMessageFilter);
            this.addFilter(angularMessageFilter);
            this.addFilter(function (notice) {
                notice.context.notifier = {
                    name: NOTIFIER_NAME,
                    version: NOTIFIER_VERSION,
                    url: NOTIFIER_URL,
                };
                if (_this._opt.environment) {
                    notice.context.environment = _this._opt.environment;
                }
                return notice;
            });
            this.routes = new Routes(this);
            this.queues = new Queues(this);
            this.queries = new QueriesStats(this._opt);
            if (this._opt.remoteConfig) {
                var pollerId_1 = new RemoteSettings(this._opt).poll();
                this._onClose.push(function () { return clearInterval(pollerId_1); });
            }
        }
        BaseNotifier.prototype.close = function () {
            for (var _i = 0, _a = this._onClose; _i < _a.length; _i++) {
                var fn = _a[_i];
                fn();
            }
        };
        BaseNotifier.prototype.scope = function () {
            return this._scope;
        };
        BaseNotifier.prototype.setActiveScope = function (scope) {
            this._scope = scope;
        };
        BaseNotifier.prototype.addFilter = function (filter) {
            this._filters.push(filter);
        };
        BaseNotifier.prototype.addPerformanceFilter = function (performanceFilter) {
            this._performanceFilters.push(performanceFilter);
        };
        BaseNotifier.prototype.notify = function (err) {
            var notice = {
                errors: [],
                context: __assign(__assign({ severity: 'error' }, this.scope().context()), err.context),
                params: err.params || {},
                environment: err.environment || {},
                session: err.session || {},
            };
            if (typeof err !== 'object' || err.error === undefined) {
                err = { error: err };
            }
            if (!this._opt.errorNotifications) {
                notice.error = new Error("airbrake: not sending this error, errorNotifications is disabled err=".concat(JSON.stringify(err.error)));
                return Promise$1.resolve(notice);
            }
            if (!err.error) {
                notice.error = new Error("airbrake: got err=".concat(JSON.stringify(err.error), ", wanted an Error"));
                return Promise$1.resolve(notice);
            }
            var error = this._processor(err.error);
            notice.errors.push(error);
            for (var _i = 0, _a = this._filters; _i < _a.length; _i++) {
                var filter = _a[_i];
                var r = filter(notice);
                if (r === null) {
                    notice.error = new Error('airbrake: error is filtered');
                    return Promise$1.resolve(notice);
                }
                notice = r;
            }
            if (!notice.context) {
                notice.context = {};
            }
            notice.context.language = 'JavaScript';
            return this._sendNotice(notice);
        };
        BaseNotifier.prototype._sendNotice = function (notice) {
            var body = jsonifyNotice(notice, {
                keysBlocklist: this._opt.keysBlocklist,
            });
            if (this._opt.reporter) {
                if (typeof this._opt.reporter === 'function') {
                    return this._opt.reporter(notice);
                }
                else {
                    console.warn('airbrake: options.reporter must be a function');
                }
            }
            var req = {
                method: 'POST',
                url: this._url,
                body: body,
            };
            return this._requester(req)
                .then(function (resp) {
                notice.id = resp.json.id;
                notice.url = resp.json.url;
                return notice;
            })
                .catch(function (err) {
                notice.error = err;
                return notice;
            });
        };
        BaseNotifier.prototype.wrap = function (fn, props) {
            if (props === void 0) { props = []; }
            if (fn._airbrake) {
                return fn;
            }
            // tslint:disable-next-line:no-this-assignment
            var client = this;
            var airbrakeWrapper = function () {
                var fnArgs = Array.prototype.slice.call(arguments);
                var wrappedArgs = client._wrapArguments(fnArgs);
                try {
                    return fn.apply(this, wrappedArgs);
                }
                catch (err) {
                    client.notify({ error: err, params: { arguments: fnArgs } });
                    client._ignoreNextWindowError();
                    throw err;
                }
            };
            for (var prop in fn) {
                if (fn.hasOwnProperty(prop)) {
                    airbrakeWrapper[prop] = fn[prop];
                }
            }
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var prop = props_1[_i];
                if (fn.hasOwnProperty(prop)) {
                    airbrakeWrapper[prop] = fn[prop];
                }
            }
            airbrakeWrapper._airbrake = true;
            airbrakeWrapper.inner = fn;
            return airbrakeWrapper;
        };
        BaseNotifier.prototype._wrapArguments = function (args) {
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                if (typeof arg === 'function') {
                    args[i] = this.wrap(arg);
                }
            }
            return args;
        };
        BaseNotifier.prototype._ignoreNextWindowError = function () { };
        BaseNotifier.prototype.call = function (fn) {
            var wrapper = this.wrap(fn);
            return wrapper.apply(this, Array.prototype.slice.call(arguments, 1));
        };
        return BaseNotifier;
    }());
    var Routes = /** @class */ (function () {
        function Routes(notifier) {
            this._notifier = notifier;
            this._routes = new RoutesStats(notifier._opt);
            this._breakdowns = new RoutesBreakdowns(notifier._opt);
            this._opt = notifier._opt;
        }
        Routes.prototype.start = function (method, route, statusCode, contentType) {
            if (method === void 0) { method = ''; }
            if (route === void 0) { route = ''; }
            if (statusCode === void 0) { statusCode = 0; }
            if (contentType === void 0) { contentType = ''; }
            var metric = new RouteMetric(method, route, statusCode, contentType);
            if (!this._opt.performanceStats) {
                return metric;
            }
            var scope = this._notifier.scope().clone();
            scope.setContext({ httpMethod: method, route: route });
            scope.setRouteMetric(metric);
            this._notifier.setActiveScope(scope);
            return metric;
        };
        Routes.prototype.notify = function (req) {
            if (!this._opt.performanceStats) {
                return;
            }
            req.end();
            for (var _i = 0, _a = this._notifier._performanceFilters; _i < _a.length; _i++) {
                var performanceFilter = _a[_i];
                if (performanceFilter(req) === null) {
                    return;
                }
            }
            this._routes.notify(req);
            this._breakdowns.notify(req);
        };
        return Routes;
    }());
    var Queues = /** @class */ (function () {
        function Queues(notifier) {
            this._notifier = notifier;
            this._queues = new QueuesStats(notifier._opt);
            this._opt = notifier._opt;
        }
        Queues.prototype.start = function (queue) {
            var metric = new QueueMetric(queue);
            if (!this._opt.performanceStats) {
                return metric;
            }
            var scope = this._notifier.scope().clone();
            scope.setContext({ queue: queue });
            scope.setQueueMetric(metric);
            this._notifier.setActiveScope(scope);
            return metric;
        };
        Queues.prototype.notify = function (q) {
            if (!this._opt.performanceStats) {
                return;
            }
            q.end();
            this._queues.notify(q);
        };
        return Queues;
    }());

    function windowFilter(notice) {
        if (window.navigator && window.navigator.userAgent) {
            notice.context.userAgent = window.navigator.userAgent;
        }
        if (window.location) {
            notice.context.url = String(window.location);
            // Set root directory to group errors on different subdomains together.
            notice.context.rootDirectory =
                window.location.protocol + '//' + window.location.host;
        }
        return notice;
    }

    var CONSOLE_METHODS = ['debug', 'log', 'info', 'warn', 'error'];
    function instrumentConsole(notifier) {
        var _loop_1 = function (m) {
            if (!(m in console)) {
                return "continue";
            }
            var oldFn = console[m];
            var newFn = (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                oldFn.apply(console, args);
                notifier.scope().pushHistory({
                    type: 'log',
                    severity: m,
                    arguments: args,
                });
            });
            newFn.inner = oldFn;
            console[m] = newFn;
        };
        // tslint:disable-next-line:no-this-assignment
        for (var _i = 0, CONSOLE_METHODS_1 = CONSOLE_METHODS; _i < CONSOLE_METHODS_1.length; _i++) {
            var m = CONSOLE_METHODS_1[_i];
            _loop_1(m);
        }
    }

    var elemAttrs = ['type', 'name', 'src'];
    function instrumentDOM(notifier) {
        var handler = makeEventHandler(notifier);
        if (window.addEventListener) {
            window.addEventListener('load', handler);
            window.addEventListener('error', function (event) {
                if (getProp(event, 'error')) {
                    return;
                }
                handler(event);
            }, true);
        }
        if (typeof document === 'object' && document.addEventListener) {
            document.addEventListener('DOMContentLoaded', handler);
            document.addEventListener('click', handler);
            document.addEventListener('keypress', handler);
        }
    }
    function makeEventHandler(notifier) {
        return function (event) {
            var target = getProp(event, 'target');
            if (!target) {
                return;
            }
            var state = { type: event.type };
            try {
                state.target = elemPath(target);
            }
            catch (err) {
                state.target = "<".concat(String(err), ">");
            }
            notifier.scope().pushHistory(state);
        };
    }
    function elemName(elem) {
        if (!elem) {
            return '';
        }
        var s = [];
        if (elem.tagName) {
            s.push(elem.tagName.toLowerCase());
        }
        if (elem.id) {
            s.push('#');
            s.push(elem.id);
        }
        if (elem.classList && Array.from) {
            s.push('.');
            s.push(Array.from(elem.classList).join('.'));
        }
        else if (elem.className) {
            var str = classNameString(elem.className);
            if (str !== '') {
                s.push('.');
                s.push(str);
            }
        }
        if (elem.getAttribute) {
            for (var _i = 0, elemAttrs_1 = elemAttrs; _i < elemAttrs_1.length; _i++) {
                var attr = elemAttrs_1[_i];
                var value = elem.getAttribute(attr);
                if (value) {
                    s.push("[".concat(attr, "=\"").concat(value, "\"]"));
                }
            }
        }
        return s.join('');
    }
    function classNameString(name) {
        if (name.split) {
            return name.split(' ').join('.');
        }
        if (name.baseVal && name.baseVal.split) {
            // SVGAnimatedString
            return name.baseVal.split(' ').join('.');
        }
        console.error('unsupported HTMLElement.className type', typeof name);
        return '';
    }
    function elemPath(elem) {
        var maxLen = 10;
        var path = [];
        var parent = elem;
        while (parent) {
            var name_1 = elemName(parent);
            if (name_1 !== '') {
                path.push(name_1);
                if (path.length > maxLen) {
                    break;
                }
            }
            parent = parent.parentNode;
        }
        if (path.length === 0) {
            return String(elem);
        }
        return path.reverse().join(' > ');
    }
    function getProp(obj, prop) {
        try {
            return obj[prop];
        }
        catch (_) {
            // Permission denied to access property
            return null;
        }
    }

    function instrumentFetch(notifier) {
        // tslint:disable-next-line:no-this-assignment
        var oldFetch = window.fetch;
        window.fetch = function (req, options) {
            var state = {
                type: 'xhr',
                date: new Date(),
            };
            state.method = options && options.method ? options.method : 'GET';
            if (typeof req === 'string') {
                state.url = req;
            }
            else {
                state.method = req.method;
                state.url = req.url;
            }
            // Some platforms (e.g. react-native) implement fetch via XHR.
            notifier._ignoreNextXHR++;
            setTimeout(function () { return notifier._ignoreNextXHR--; });
            return oldFetch
                .apply(this, arguments)
                .then(function (resp) {
                state.statusCode = resp.status;
                state.duration = new Date().getTime() - state.date.getTime();
                notifier.scope().pushHistory(state);
                return resp;
            })
                .catch(function (err) {
                state.error = err;
                state.duration = new Date().getTime() - state.date.getTime();
                notifier.scope().pushHistory(state);
                throw err;
            });
        };
    }

    var lastLocation = '';
    // In some environments (i.e. Cypress) document.location may sometimes be null
    function getCurrentLocation() {
        return document.location && document.location.pathname;
    }
    function instrumentLocation(notifier) {
        lastLocation = getCurrentLocation();
        var oldFn = window.onpopstate;
        window.onpopstate = function abOnpopstate(_event) {
            var url = getCurrentLocation();
            if (url) {
                recordLocation(notifier, url);
            }
            if (oldFn) {
                return oldFn.apply(this, arguments);
            }
        };
        var oldPushState = history.pushState;
        history.pushState = function abPushState(_state, _title, url) {
            if (url) {
                recordLocation(notifier, url.toString());
            }
            oldPushState.apply(this, arguments);
        };
    }
    function recordLocation(notifier, url) {
        var index = url.indexOf('://');
        if (index >= 0) {
            url = url.slice(index + 3);
            index = url.indexOf('/');
            url = index >= 0 ? url.slice(index) : '/';
        }
        else if (url.charAt(0) !== '/') {
            url = '/' + url;
        }
        notifier.scope().pushHistory({
            type: 'location',
            from: lastLocation,
            to: url,
        });
        lastLocation = url;
    }

    function instrumentXHR(notifier) {
        function recordReq(req) {
            var state = req.__state;
            state.statusCode = req.status;
            state.duration = new Date().getTime() - state.date.getTime();
            notifier.scope().pushHistory(state);
        }
        var oldOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function abOpen(method, url, _async, _user, _password) {
            if (notifier._ignoreNextXHR === 0) {
                this.__state = {
                    type: 'xhr',
                    method: method,
                    url: url,
                };
            }
            oldOpen.apply(this, arguments);
        };
        var oldSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function abSend(_data) {
            var oldFn = this.onreadystatechange;
            this.onreadystatechange = function (_ev) {
                if (this.readyState === 4 && this.__state) {
                    recordReq(this);
                }
                if (oldFn) {
                    return oldFn.apply(this, arguments);
                }
            };
            if (this.__state) {
                this.__state.date = new Date();
            }
            return oldSend.apply(this, arguments);
        };
    }

    var Notifier = /** @class */ (function (_super) {
        __extends(Notifier, _super);
        function Notifier(opt) {
            var _this = _super.call(this, opt) || this;
            _this.offline = false;
            _this.todo = [];
            _this._ignoreWindowError = 0;
            _this._ignoreNextXHR = 0;
            if (typeof window === 'undefined') {
                return _this;
            }
            _this.addFilter(windowFilter);
            if (window.addEventListener) {
                _this.onOnline = _this.onOnline.bind(_this);
                window.addEventListener('online', _this.onOnline);
                _this.onOffline = _this.onOffline.bind(_this);
                window.addEventListener('offline', _this.onOffline);
                _this.onUnhandledrejection = _this.onUnhandledrejection.bind(_this);
                window.addEventListener('unhandledrejection', _this.onUnhandledrejection);
                _this._onClose.push(function () {
                    window.removeEventListener('online', _this.onOnline);
                    window.removeEventListener('offline', _this.onOffline);
                    window.removeEventListener('unhandledrejection', _this.onUnhandledrejection);
                });
            }
            _this._instrument(opt.instrumentation);
            return _this;
        }
        Notifier.prototype._instrument = function (opt) {
            if (opt === void 0) { opt = {}; }
            if (opt.console === undefined) {
                opt.console = !isDevEnv(this._opt.environment);
            }
            if (enabled(opt.onerror)) {
                // tslint:disable-next-line:no-this-assignment
                var self_1 = this;
                var oldHandler_1 = window.onerror;
                window.onerror = function abOnerror() {
                    if (oldHandler_1) {
                        oldHandler_1.apply(this, arguments);
                    }
                    self_1.onerror.apply(self_1, arguments);
                };
            }
            instrumentDOM(this);
            if (enabled(opt.fetch) && typeof fetch === 'function') {
                instrumentFetch(this);
            }
            if (enabled(opt.history) && typeof history === 'object') {
                instrumentLocation(this);
            }
            if (enabled(opt.console) && typeof console === 'object') {
                instrumentConsole(this);
            }
            if (enabled(opt.xhr) && typeof XMLHttpRequest !== 'undefined') {
                instrumentXHR(this);
            }
        };
        Notifier.prototype.notify = function (err) {
            var _this = this;
            if (this.offline) {
                return new Promise$1(function (resolve, reject) {
                    _this.todo.push({
                        err: err,
                        resolve: resolve,
                        reject: reject,
                    });
                    while (_this.todo.length > 100) {
                        var j = _this.todo.shift();
                        if (j === undefined) {
                            break;
                        }
                        j.resolve({
                            error: new Error('airbrake: offline queue is too large'),
                        });
                    }
                });
            }
            return _super.prototype.notify.call(this, err);
        };
        Notifier.prototype.onOnline = function () {
            this.offline = false;
            var _loop_1 = function (j) {
                this_1.notify(j.err).then(function (notice) {
                    j.resolve(notice);
                });
            };
            var this_1 = this;
            for (var _i = 0, _a = this.todo; _i < _a.length; _i++) {
                var j = _a[_i];
                _loop_1(j);
            }
            this.todo = [];
        };
        Notifier.prototype.onOffline = function () {
            this.offline = true;
        };
        Notifier.prototype.onUnhandledrejection = function (e) {
            // Handle native or bluebird Promise rejections
            // https://developer.mozilla.org/en-US/docs/Web/Events/unhandledrejection
            // http://bluebirdjs.com/docs/api/error-management-configuration.html
            var reason = e.reason || (e.detail && e.detail.reason);
            if (!reason) {
                return;
            }
            var msg = reason.message || String(reason);
            if (msg.indexOf && msg.indexOf('airbrake: ') === 0) {
                return;
            }
            if (typeof reason !== 'object' || reason.error === undefined) {
                this.notify({
                    error: reason,
                    context: {
                        unhandledRejection: true,
                    },
                });
                return;
            }
            this.notify(__assign(__assign({}, reason), { context: {
                    unhandledRejection: true,
                } }));
        };
        Notifier.prototype.onerror = function (message, filename, line, column, err) {
            if (this._ignoreWindowError > 0) {
                return;
            }
            if (err) {
                this.notify({
                    error: err,
                    context: {
                        windowError: true,
                    },
                });
                return;
            }
            // Ignore errors without file or line.
            if (!filename || !line) {
                return;
            }
            this.notify({
                error: {
                    message: message,
                    fileName: filename,
                    lineNumber: line,
                    columnNumber: column,
                    noStack: true,
                },
                context: {
                    windowError: true,
                },
            });
        };
        Notifier.prototype._ignoreNextWindowError = function () {
            var _this = this;
            this._ignoreWindowError++;
            setTimeout(function () { return _this._ignoreWindowError--; });
        };
        return Notifier;
    }(BaseNotifier));
    function isDevEnv(env) {
        return env && env.startsWith && env.startsWith('dev');
    }
    function enabled(v) {
        return v === undefined || v === true;
    }

    exports.BaseNotifier = BaseNotifier;
    exports.Notifier = Notifier;
    exports.QueryInfo = QueryInfo;
    exports.Scope = Scope;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=airbrake.js.map
