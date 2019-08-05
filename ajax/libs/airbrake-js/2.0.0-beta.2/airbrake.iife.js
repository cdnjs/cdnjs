/* airbrake-js v2.0.0-beta.2 */
this.airbrakeJs = this.airbrakeJs || {};
this.airbrakeJs.Client = (function () {
  'use strict';

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

  /** @suppress {undefinedVars} */
  var globalNS = (function() {
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    throw new Error('unable to locate global object');
  })();

  if (!('Promise' in globalNS)) {
    globalNS['Promise'] = Promise$1;
  } else if (!globalNS.Promise.prototype['finally']) {
    globalNS.Promise.prototype['finally'] = finallyConstructor;
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

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

  var FILTERED = '[Filtered]';
  var MAX_OBJ_LENGTH = 128;
  // jsonifyNotice serializes notice to JSON and truncates params,
  // environment and session keys.
  function jsonifyNotice(notice, _a) {
      var _b = _a === void 0 ? {} : _a, _c = _b.maxLength, maxLength = _c === void 0 ? 64000 : _c, _d = _b.keysBlacklist, keysBlacklist = _d === void 0 ? [] : _d;
      if (notice.errors) {
          for (var i = 0; i < notice.errors.length; i++) {
              var t = new Truncator({ keysBlacklist: keysBlacklist });
              notice.errors[i] = t.truncate(notice.errors[i]);
          }
      }
      var s = '';
      var keys = ['context', 'params', 'environment', 'session'];
      for (var level = 0; level < 8; level++) {
          var opts = { level: level, keysBlacklist: keysBlacklist };
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
          this.keysBlacklist = [];
          this.seen = [];
          var level = opts.level || 0;
          this.keysBlacklist = opts.keysBlacklist || [];
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
              return "[Circular " + this.getPath(value) + "]";
          }
          var type = objectType(value);
          depth++;
          if (depth > this.maxDepth) {
              return "[Truncated " + type + "]";
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
              if (isBlacklisted(key, this.keysBlacklist)) {
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
  function isBlacklisted(key, keysBlacklist) {
      for (var _i = 0, keysBlacklist_1 = keysBlacklist; _i < keysBlacklist_1.length; _i++) {
          var v = keysBlacklist_1[_i];
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var stackframe = createCommonjsModule(function (module, exports) {
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

      var props = booleanProps.concat(numericProps, stringProps, arrayProps);

      function StackFrame(obj) {
          if (obj instanceof Object) {
              for (var i = 0; i < props.length; i++) {
                  if (obj.hasOwnProperty(props[i]) && obj[props[i]] !== undefined) {
                      this['set' + _capitalize(props[i])](obj[props[i]]);
                  }
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
  });

  var errorStackParser = createCommonjsModule(function (module, exports) {
  (function(root, factory) {
      // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

      /* istanbul ignore next */
      {
          module.exports = factory(stackframe);
      }
  }(commonjsGlobal, function ErrorStackParser(StackFrame) {

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
  });

  var hasConsole = typeof console === 'object' && console.warn;
  function parse(err) {
      try {
          return errorStackParser.parse(err);
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
  function processor(err) {
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

  var re = new RegExp([
      '^',
      '\\[(\\$.+)\\]',
      '\\s',
      '([\\s\\S]+)',
      '$',
  ].join(''));
  function filter(notice) {
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

  function makeFilter() {
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
  function filter$1(notice) {
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

  function filter$2(notice) {
      var os;
      try {
          os = require('os');
      }
      catch (_) {
          // ignore
      }
      if (os) {
          notice.context.os = os.type() + "/" + os.release();
          notice.context.architecture = os.arch();
          notice.context.hostname = os.hostname();
          notice.params.os = {
              homedir: os.homedir(),
              uptime: os.uptime(),
              freemem: os.freemem(),
              totalmem: os.totalmem(),
              loadavg: os.loadavg(),
          };
      }
      if (process) {
          notice.context.platform = process.platform;
          if (!notice.context.rootDirectory) {
              notice.context.rootDirectory = process.cwd();
          }
          notice.params.process = {
              pid: process.pid,
              cwd: process.cwd(),
              execPath: process.execPath,
              argv: process.argv,
          };
          ['uptime', 'cpuUsage', 'memoryUsage'].map(function (name) {
              if (process[name]) {
                  notice.params.process[name] = process[name]();
              }
          });
      }
      return notice;
  }

  var re$1 = new RegExp([
      '^',
      'Uncaught\\s',
      '(.+?)',
      ':\\s',
      '(.+)',
      '$',
  ].join(''));
  function filter$3(notice) {
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

  function filter$4(notice) {
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

  var browserPonyfill = createCommonjsModule(function (module, exports) {
  var __self__ = (function (root) {
  function F() {
  this.fetch = false;
  this.DOMException = root.DOMException;
  }
  F.prototype = root;
  return new F();
  })(typeof self !== 'undefined' ? self : commonjsGlobal);
  (function(self) {

  var irrelevant = (function (exports) {
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

    return exports;

  }({}));
  })(__self__);
  delete __self__.fetch.polyfill;
  exports = __self__.fetch; // To enable: import fetch from 'cross-fetch'
  exports.default = __self__.fetch; // For TypeScript consumers without esModuleInterop.
  exports.fetch = __self__.fetch; // To enable: import {fetch} from 'cross-fetch'
  exports.Headers = __self__.Headers;
  exports.Request = __self__.Request;
  exports.Response = __self__.Response;
  module.exports = exports;
  });
  var browserPonyfill_1 = browserPonyfill.fetch;
  var browserPonyfill_2 = browserPonyfill.Headers;
  var browserPonyfill_3 = browserPonyfill.Request;
  var browserPonyfill_4 = browserPonyfill.Response;

  var errors = {
      unauthorized: new Error('airbrake: unauthorized: project id or key are wrong'),
      ipRateLimited: new Error('airbrake: IP is rate limited'),
  };

  var rateLimitReset = 0;
  function request(req) {
      var utime = Date.now() / 1000;
      if (utime < rateLimitReset) {
          return Promise.reject(errors.ipRateLimited);
      }
      var opt = {
          method: req.method,
          body: req.body,
      };
      return browserPonyfill(req.url, opt).then(function (resp) {
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
                  rateLimitReset = Date.now() / 1000 + n;
              }
              throw errors.ipRateLimited;
          }
          if (resp.status === 204) {
              return { json: null };
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
              var err = new Error("airbrake: fetch: unexpected response: code=" + resp.status + " body='" + body + "'");
              throw err;
          });
      });
  }

  function makeRequester(api) {
      return function (req) {
          return request$1(req, api);
      };
  }
  var rateLimitReset$1 = 0;
  function request$1(req, api) {
      var utime = Date.now() / 1000;
      if (utime < rateLimitReset$1) {
          return Promise.reject(errors.ipRateLimited);
      }
      return new Promise(function (resolve, reject) {
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
                  error = new Error("airbrake: request: response statusCode is " + resp.statusCode);
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
                      rateLimitReset$1 = Date.now() / 1000 + n;
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
              error = new Error("airbrake: node: unexpected response: code=" + resp.statusCode + " body='" + body + "'");
              reject(error);
          });
      });
  }

  function makeRequester$1(opts) {
      if (opts.request) {
          return makeRequester(opts.request);
      }
      return request;
  }

  var elemAttrs = ['type', 'name', 'src'];
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
                  s.push("[" + attr + "=\"" + value + "\"]");
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
  function makeEventHandler(client) {
      return function (event) {
          var target;
          try {
              target = event.target;
          }
          catch (_) {
              return;
          }
          if (!target) {
              return;
          }
          var state = { type: event.type };
          try {
              state.target = elemPath(target);
          }
          catch (err) {
              state.target = "<" + String(err) + ">";
          }
          client.pushHistory(state);
      };
  }

  var CONSOLE_METHODS = ['debug', 'log', 'info', 'warn', 'error'];
  var Historian = /** @class */ (function () {
      function Historian(opts) {
          var _this = this;
          if (opts === void 0) { opts = {}; }
          this.historyMaxLen = 20;
          this.notifiers = [];
          this.errors = [];
          this.ignoreWindowError = 0;
          this.history = [];
          this.ignoreNextXHR = 0;
          if (enabled(opts.console) && typeof console === 'object' && console.error) {
              this.consoleError = console.error;
          }
          if (typeof window === 'object') {
              if (enabled(opts.onerror)) {
                  // tslint:disable-next-line:no-this-assignment
                  var self_1 = this;
                  var oldHandler_1 = window.onerror;
                  window.onerror = function () {
                      if (oldHandler_1) {
                          oldHandler_1.apply(this, arguments);
                      }
                      self_1.onerror.apply(self_1, arguments);
                  };
              }
              this.domEvents();
              if (enabled(opts.fetch) && typeof fetch === 'function') {
                  this.instrumentFetch();
              }
              if (enabled(opts.history) && typeof history === 'object') {
                  this.location();
              }
          }
          // Don't use process.on when windows is defined such as Electron apps.
          if (typeof window === 'undefined' &&
              typeof process === 'object' &&
              typeof process.on === 'function') {
              process.on('uncaughtException', function (err) {
                  _this.notify(err).then(function () {
                      if (process.listeners('uncaughtException').length !== 1) {
                          return;
                      }
                      if (_this.consoleError) {
                          _this.consoleError('uncaught exception', err);
                      }
                      process.exit(1);
                  });
              });
              process.on('unhandledRejection', function (reason, _p) {
                  var msg = reason.message || String(reason);
                  if (msg.indexOf && msg.indexOf('airbrake: ') === 0) {
                      return;
                  }
                  _this.notify(reason).then(function () {
                      if (process.listeners('unhandledRejection').length !== 1) {
                          return;
                      }
                      if (_this.consoleError) {
                          _this.consoleError('unhandled rejection', reason);
                      }
                      process.exit(1);
                  });
              });
          }
          if (enabled(opts.console) && typeof console === 'object') {
              this.console();
          }
          if (enabled(opts.xhr) && typeof XMLHttpRequest !== 'undefined') {
              this.xhr();
          }
      }
      Historian.instance = function (opts) {
          if (opts === void 0) { opts = {}; }
          if (!Historian._instance) {
              Historian._instance = new Historian(opts);
          }
          return Historian._instance;
      };
      Historian.prototype.registerNotifier = function (notifier) {
          this.notifiers.push(notifier);
          for (var _i = 0, _a = this.errors; _i < _a.length; _i++) {
              var err = _a[_i];
              this.notifyNotifiers(err);
          }
          this.errors = [];
      };
      Historian.prototype.unregisterNotifier = function (notifier) {
          var i = this.notifiers.indexOf(notifier);
          if (i !== -1) {
              this.notifiers.splice(i, 1);
          }
      };
      Historian.prototype.notify = function (err) {
          if (this.notifiers.length > 0) {
              return this.notifyNotifiers(err);
          }
          this.errors.push(err);
          if (this.errors.length > this.historyMaxLen) {
              this.errors = this.errors.slice(-this.historyMaxLen);
          }
          return Promise.resolve(null);
      };
      Historian.prototype.notifyNotifiers = function (err) {
          var promises = [];
          for (var _i = 0, _a = this.notifiers; _i < _a.length; _i++) {
              var notifier = _a[_i];
              promises.push(notifier.notify(err));
          }
          return Promise.all(promises).then(function (notices) {
              return notices[0];
          });
      };
      Historian.prototype.onerror = function (message, filename, line, column, err) {
          if (this.ignoreWindowError > 0) {
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
      Historian.prototype.ignoreNextWindowError = function () {
          var _this = this;
          this.ignoreWindowError++;
          setTimeout(function () { return _this.ignoreWindowError--; });
      };
      Historian.prototype.getHistory = function () {
          return this.history;
      };
      Historian.prototype.pushHistory = function (state) {
          if (this.isDupState(state)) {
              if (this.lastState.num) {
                  this.lastState.num++;
              }
              else {
                  this.lastState.num = 2;
              }
              return;
          }
          if (!state.date) {
              state.date = new Date();
          }
          this.history.push(state);
          this.lastState = state;
          if (this.history.length > this.historyMaxLen) {
              this.history = this.history.slice(-this.historyMaxLen);
          }
      };
      Historian.prototype.isDupState = function (state) {
          if (!this.lastState) {
              return false;
          }
          for (var key in state) {
              if (!state.hasOwnProperty(key) || key === 'date') {
                  continue;
              }
              if (state[key] !== this.lastState[key]) {
                  return false;
              }
          }
          return true;
      };
      Historian.prototype.domEvents = function () {
          var handler = makeEventHandler(this);
          if (window.addEventListener) {
              window.addEventListener('load', handler);
              window.addEventListener('error', function (event) {
                  if ('error' in event) {
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
      };
      Historian.prototype.console = function () {
          // tslint:disable-next-line:no-this-assignment
          var client = this;
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
                  client.pushHistory({
                      type: 'log',
                      severity: m,
                      arguments: args,
                  });
              });
              newFn.inner = oldFn;
              console[m] = newFn;
          };
          for (var _i = 0, CONSOLE_METHODS_1 = CONSOLE_METHODS; _i < CONSOLE_METHODS_1.length; _i++) {
              var m = CONSOLE_METHODS_1[_i];
              _loop_1(m);
          }
      };
      Historian.prototype.unwrapConsole = function () {
          for (var _i = 0, CONSOLE_METHODS_2 = CONSOLE_METHODS; _i < CONSOLE_METHODS_2.length; _i++) {
              var m = CONSOLE_METHODS_2[_i];
              if (m in console && console[m].inner) {
                  console[m] = console[m].inner;
              }
          }
      };
      Historian.prototype.instrumentFetch = function () {
          // tslint:disable-next-line:no-this-assignment
          var client = this;
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
              client.ignoreNextXHR++;
              setTimeout(function () { return client.ignoreNextXHR--; });
              return oldFetch
                  .apply(this, arguments)
                  .then(function (resp) {
                  state.statusCode = resp.status;
                  state.duration = new Date().getTime() - state.date.getTime();
                  client.pushHistory(state);
                  return resp;
              })
                  .catch(function (err) {
                  state.error = err;
                  state.duration = new Date().getTime() - state.date.getTime();
                  client.pushHistory(state);
                  throw err;
              });
          };
      };
      Historian.prototype.xhr = function () {
          // tslint:disable-next-line:no-this-assignment
          var client = this;
          var oldOpen = XMLHttpRequest.prototype.open;
          XMLHttpRequest.prototype.open = function (method, url, _async, _user, _password) {
              if (client.ignoreNextXHR === 0) {
                  this.__state = {
                      type: 'xhr',
                      method: method,
                      url: url,
                  };
              }
              oldOpen.apply(this, arguments);
          };
          var oldSend = XMLHttpRequest.prototype.send;
          XMLHttpRequest.prototype.send = function (_data) {
              var oldFn = this.onreadystatechange;
              this.onreadystatechange = function (_ev) {
                  if (this.readyState === 4 && this.__state) {
                      client.recordReq(this);
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
      };
      Historian.prototype.recordReq = function (req) {
          var state = req.__state;
          state.statusCode = req.status;
          state.duration = new Date().getTime() - state.date.getTime();
          this.pushHistory(state);
      };
      Historian.prototype.location = function () {
          this.lastLocation = document.location.pathname;
          // tslint:disable-next-line:no-this-assignment
          var client = this;
          var oldFn = window.onpopstate;
          window.onpopstate = function (_event) {
              client.recordLocation(document.location.pathname);
              if (oldFn) {
                  return oldFn.apply(this, arguments);
              }
          };
          var oldPushState = history.pushState;
          history.pushState = function (_state, _title, url) {
              if (url) {
                  client.recordLocation(url.toString());
              }
              oldPushState.apply(this, arguments);
          };
      };
      Historian.prototype.recordLocation = function (url) {
          var index = url.indexOf('://');
          if (index >= 0) {
              url = url.slice(index + 3);
              index = url.indexOf('/');
              url = index >= 0 ? url.slice(index) : '/';
          }
          else if (url.charAt(0) !== '/') {
              url = '/' + url;
          }
          this.pushHistory({
              type: 'location',
              from: this.lastLocation,
              to: url,
          });
          this.lastLocation = url;
      };
      return Historian;
  }());
  function enabled(v) {
      return v === undefined || v === true;
  }

  var FLUSH_INTERVAL = 15000; // 15 seconds
  var Routes = /** @class */ (function () {
      function Routes(opts) {
          // TODO: use RouteKey as map key
          this.m = {};
          this.opts = opts;
          this.url = this.opts.host + "/api/v5/projects/" + this.opts.projectId + "/routes-stats?key=" + this.opts.projectKey;
          this.requester = makeRequester$1(this.opts);
      }
      Routes.prototype.notifyRequest = function (req) {
          var _this = this;
          var ms = durationMs(req.start, req.end);
          if (ms === 0) {
              ms = 0.1;
          }
          var minute = 60 * 1000;
          req.start = new Date(Math.floor(toTime(req.start) / minute) * minute);
          var key = {
              method: req.method,
              route: req.route,
              statusCode: req.statusCode,
              time: req.start,
          };
          var keyStr = JSON.stringify(key);
          var stat;
          if (keyStr in this.m) {
              stat = this.m[keyStr];
          }
          else {
              stat = {
                  count: 0,
                  sum: 0,
                  sumsq: 0,
              };
              if (this.opts.TDigest) {
                  stat.tdigest = new this.opts.TDigest();
              }
              this.m[keyStr] = stat;
          }
          stat.count++;
          stat.sum += ms;
          stat.sumsq += ms * ms;
          if (stat.tdigest) {
              stat.tdigest.push(ms);
          }
          if (this.timer) {
              return;
          }
          this.timer = setTimeout(function () {
              _this.flush();
          }, FLUSH_INTERVAL);
      };
      Routes.prototype.flush = function () {
          var routes = [];
          for (var keyStr in this.m) {
              if (!this.m.hasOwnProperty(keyStr)) {
                  continue;
              }
              var key = JSON.parse(keyStr);
              var v = __assign({}, key, this.m[keyStr]);
              if (v.tdigest) {
                  v.tdigestCentroids = this.tdigestCentroids(v.tdigest);
                  delete v.tdigest;
              }
              routes.push(v);
          }
          this.m = {};
          this.timer = null;
          var outJSON = JSON.stringify({
              environment: this.opts.environment,
              routes: routes,
          });
          var req = {
              method: 'POST',
              url: this.url,
              body: outJSON,
          };
          this.requester(req)
              .then(function (_resp) {
              // nothing
          })
              .catch(function (err) {
              if (console.error) {
                  console.error('can not report routes stats', err);
              }
          });
      };
      Routes.prototype.tdigestCentroids = function (td) {
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
      };
      return Routes;
  }());
  function toTime(tm) {
      if (tm instanceof Date) {
          return tm.getTime();
      }
      if (typeof tm === 'number') {
          return tm;
      }
      throw new Error("unsupported type: " + typeof tm);
  }
  function durationMs(start, end) {
      if (start instanceof Date && end instanceof Date) {
          return end.getTime() - start.getTime();
      }
      if (typeof start === 'number' && typeof end === 'number') {
          return end - start;
      }
      throw new Error("unsupported type: " + typeof start);
  }

  var Client = /** @class */ (function () {
      function Client(opts) {
          var _this = this;
          this.filters = [];
          this.offline = false;
          this.todo = [];
          this.onClose = [];
          if (!opts.projectId || !opts.projectKey) {
              throw new Error('airbrake: projectId and projectKey are required');
          }
          this.opts = opts;
          this.opts.host = this.opts.host || 'https://api.airbrake.io';
          this.opts.timeout = this.opts.timeout || 10000;
          this.opts.keysBlacklist = this.opts.keysBlacklist || [/password/, /secret/];
          this.url = this.opts.host + "/api/v3/projects/" + this.opts.projectId + "/notices?key=" + this.opts.projectKey;
          this.processor = this.opts.processor || processor;
          this.requester = makeRequester$1(this.opts);
          this.addFilter(filter$1);
          this.addFilter(makeFilter());
          this.addFilter(filter$3);
          this.addFilter(filter);
          if (!this.opts.environment &&
              typeof process !== 'undefined' &&
              process.env.NODE_ENV) {
              this.opts.environment = process.env.NODE_ENV;
          }
          if (this.opts.environment) {
              this.addFilter(function (notice) {
                  notice.context.environment = _this.opts.environment;
                  return notice;
              });
          }
          if (typeof window === 'object') {
              this.addFilter(filter$4);
              if (window.addEventListener) {
                  this.onOnline = this.onOnline.bind(this);
                  window.addEventListener('online', this.onOnline);
                  this.onOffline = this.onOffline.bind(this);
                  window.addEventListener('offline', this.onOffline);
                  this.onUnhandledrejection = this.onUnhandledrejection.bind(this);
                  window.addEventListener('unhandledrejection', this.onUnhandledrejection);
                  this.onClose.push(function () {
                      window.removeEventListener('online', _this.onOnline);
                      window.removeEventListener('offline', _this.onOffline);
                      window.removeEventListener('unhandledrejection', _this.onUnhandledrejection);
                  });
              }
          }
          else {
              this.addFilter(filter$2);
          }
          var historianOpts = opts.instrumentation || {};
          if (typeof historianOpts.console === undefined) {
              historianOpts.console = !isDevEnv(opts.environment);
          }
          this.historian = Historian.instance(historianOpts);
          this.historian.registerNotifier(this);
      }
      Client.prototype.close = function () {
          for (var _i = 0, _a = this.onClose; _i < _a.length; _i++) {
              var fn = _a[_i];
              fn();
          }
          this.historian.unregisterNotifier(this);
      };
      Client.prototype.addFilter = function (filter) {
          this.filters.push(filter);
      };
      Client.prototype.notify = function (err) {
          var _this = this;
          var notice = {
              id: '',
              errors: [],
              context: __assign({ severity: 'error' }, err.context),
              params: err.params || {},
              environment: err.environment || {},
              session: err.session || {},
          };
          if (typeof err !== 'object' || err.error === undefined) {
              err = { error: err };
          }
          if (!err.error) {
              notice.error = new Error("airbrake: got err=" + JSON.stringify(err.error) + ", wanted an Error");
              return Promise.resolve(notice);
          }
          if (this.opts.ignoreWindowError && err.context && err.context.windowError) {
              notice.error = new Error('airbrake: window error is ignored');
              return Promise.resolve(notice);
          }
          if (this.offline) {
              return new Promise(function (resolve, reject) {
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
                      notice.error = new Error('airbrake: offline queue is too large');
                      j.resolve(notice);
                  }
              });
          }
          var history = this.historian.getHistory();
          if (history.length > 0) {
              notice.context.history = history;
          }
          var error = this.processor(err.error);
          notice.errors.push(error);
          for (var _i = 0, _a = this.filters; _i < _a.length; _i++) {
              var filter = _a[_i];
              var r = filter(notice);
              if (r === null) {
                  notice.error = new Error('airbrake: error is filtered');
                  return Promise.resolve(notice);
              }
              notice = r;
          }
          if (!notice.context) {
              notice.context = {};
          }
          notice.context.language = 'JavaScript';
          notice.context.notifier = {
              name: 'airbrake-js',
              version: '2.0.0-beta.2',
              url: 'https://github.com/airbrake/airbrake-js',
          };
          return this.sendNotice(notice);
      };
      Client.prototype.sendNotice = function (notice) {
          var body = jsonifyNotice(notice, {
              keysBlacklist: this.opts.keysBlacklist,
          });
          if (this.opts.reporter) {
              if (typeof this.opts.reporter === 'function') {
                  return this.opts.reporter(notice);
              }
              else {
                  console.warn('airbrake: options.reporter must be a function');
              }
          }
          var req = {
              method: 'POST',
              url: this.url,
              body: body,
          };
          return this.requester(req)
              .then(function (resp) {
              notice.id = resp.json.id;
              return notice;
          })
              .catch(function (err) {
              notice.error = err;
              return notice;
          });
      };
      // TODO: fix wrapping for multiple clients
      Client.prototype.wrap = function (fn, props) {
          if (props === void 0) { props = []; }
          if (fn._airbrake) {
              return fn;
          }
          // tslint:disable-next-line:no-this-assignment
          var client = this;
          var airbrakeWrapper = function () {
              var fnArgs = Array.prototype.slice.call(arguments);
              var wrappedArgs = client.wrapArguments(fnArgs);
              try {
                  return fn.apply(this, wrappedArgs);
              }
              catch (err) {
                  client.notify({ error: err, params: { arguments: fnArgs } });
                  this.historian.ignoreNextWindowError();
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
      Client.prototype.wrapArguments = function (args) {
          for (var i = 0; i < args.length; i++) {
              var arg = args[i];
              if (typeof arg === 'function') {
                  args[i] = this.wrap(arg);
              }
          }
          return args;
      };
      Client.prototype.call = function (fn) {
          var _args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              _args[_i - 1] = arguments[_i];
          }
          var wrapper = this.wrap(fn);
          return wrapper.apply(this, Array.prototype.slice.call(arguments, 1));
      };
      Client.prototype.onerror = function () {
          this.historian.onerror.apply(this.historian, arguments);
      };
      Client.prototype.notifyRequest = function (req) {
          if (!this.opts.TDigest) {
              return;
          }
          if (!this.routes) {
              this.routes = new Routes(this.opts);
          }
          this.routes.notifyRequest(req);
      };
      Client.prototype.onOnline = function () {
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
      Client.prototype.onOffline = function () {
          this.offline = true;
      };
      Client.prototype.onUnhandledrejection = function (e) {
          // Handle native or bluebird Promise rejections
          // https://developer.mozilla.org/en-US/docs/Web/Events/unhandledrejection
          // http://bluebirdjs.com/docs/api/error-management-configuration.html
          var reason = e.reason ||
              (e.detail && e.detail.reason);
          if (!reason) {
              return;
          }
          var msg = reason.message || String(reason);
          if (msg.indexOf && msg.indexOf('airbrake: ') === 0) {
              return;
          }
          this.notify(reason);
      };
      return Client;
  }());
  function isDevEnv(env) {
      return env && env.startsWith && env.startsWith('dev');
  }

  return Client;

}());
//# sourceMappingURL=airbrake.iife.js.map
