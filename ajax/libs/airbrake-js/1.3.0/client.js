/*! airbrake-js v1.3.0 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("request"), (function webpackLoadOptionalExternalModule() { try { return require("os"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define([, ], factory);
	else if(typeof exports === 'object')
		exports["Client"] = factory(require("request"), (function webpackLoadOptionalExternalModule() { try { return require("os"); } catch(e) {} }()));
	else
		root["airbrakeJs"] = root["airbrakeJs"] || {}, root["airbrakeJs"]["Client"] = factory(root[undefined], root[undefined]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_request__, __WEBPACK_EXTERNAL_MODULE_os__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/error-stack-parser/error-stack-parser.js":
/*!***************************************************************!*\
  !*** ./node_modules/error-stack-parser/error-stack-parser.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define('error-stack-parser', ['stackframe'], factory);
    } else if (true) {
        module.exports = factory(__webpack_require__(/*! stackframe */ "./node_modules/stackframe/stackframe.js"));
    } else {}
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

/***/ "./node_modules/node-libs-browser/node_modules/timers-browserify/main.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/timers-browserify/main.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/promise-polyfill/src/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/src/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(setImmediate) {// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
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
  Promise._immediateFn(function() {
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
      if (newValue instanceof Promise) {
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
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

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

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = function(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
};

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
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

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Promise);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node-libs-browser/node_modules/timers-browserify/main.js */ "./node_modules/node-libs-browser/node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/promise-polyfill/src/polyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/promise-polyfill/src/polyfill.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./node_modules/promise-polyfill/src/index.js");


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

if (!globalNS.Promise) {
  globalNS.Promise = _index__WEBPACK_IMPORTED_MODULE_0__["default"];
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/stackframe/stackframe.js":
/*!***********************************************!*\
  !*** ./node_modules/stackframe/stackframe.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define('stackframe', [], factory);
    } else if (true) {
        module.exports = factory();
    } else {}
}(this, function() {
    'use strict';
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



/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/client.ts":
/*!***********************!*\
  !*** ./src/client.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! promise-polyfill/src/polyfill */ "./node_modules/promise-polyfill/src/polyfill.js");
var stacktracejs_1 = __webpack_require__(/*! ./processor/stacktracejs */ "./src/processor/stacktracejs.ts");
var ignore_1 = __webpack_require__(/*! ./filter/ignore */ "./src/filter/ignore.ts");
var debounce_1 = __webpack_require__(/*! ./filter/debounce */ "./src/filter/debounce.ts");
var uncaught_message_1 = __webpack_require__(/*! ./filter/uncaught_message */ "./src/filter/uncaught_message.ts");
var angular_message_1 = __webpack_require__(/*! ./filter/angular_message */ "./src/filter/angular_message.ts");
var window_1 = __webpack_require__(/*! ./filter/window */ "./src/filter/window.ts");
var node_1 = __webpack_require__(/*! ./filter/node */ "./src/filter/node.ts");
var reporter_1 = __webpack_require__(/*! ./reporter/reporter */ "./src/reporter/reporter.ts");
var fetch_1 = __webpack_require__(/*! ./reporter/fetch */ "./src/reporter/fetch.ts");
var node_2 = __webpack_require__(/*! ./reporter/node */ "./src/reporter/node.ts");
var xhr_1 = __webpack_require__(/*! ./reporter/xhr */ "./src/reporter/xhr.ts");
var jsonp_1 = __webpack_require__(/*! ./reporter/jsonp */ "./src/reporter/jsonp.ts");
var historian_1 = __webpack_require__(/*! ./historian */ "./src/historian.ts");
var Client = /** @class */ (function () {
    function Client(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
        this.opts = {};
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
        this.processor = opts.processor || stacktracejs_1.default;
        this.setReporter(opts.reporter || reporter_1.defaultReporter(opts));
        this.addFilter(ignore_1.default);
        this.addFilter(debounce_1.default());
        this.addFilter(uncaught_message_1.default);
        this.addFilter(angular_message_1.default);
        if (typeof window === 'object') {
            this.addFilter(window_1.default);
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
            this.addFilter(node_1.default);
        }
        historian_1.historian.registerNotifier(this);
    }
    Client.prototype.close = function () {
        for (var _i = 0, _a = this.onClose; _i < _a.length; _i++) {
            var fn = _a[_i];
            fn();
        }
        historian_1.historian.unregisterNotifier(this);
    };
    Client.prototype.setReporter = function (name) {
        switch (name) {
            case 'fetch':
                this.reporter = fetch_1.default;
                break;
            case 'node':
                this.reporter = node_2.default;
                break;
            case 'xhr':
                this.reporter = xhr_1.default;
                break;
            case 'jsonp':
                this.reporter = jsonp_1.default;
                break;
            default:
                this.reporter = name;
        }
    };
    Client.prototype.addFilter = function (filter) {
        this.filters.push(filter);
    };
    Client.prototype.notify = function (err) {
        var _this = this;
        var notice = {
            id: '',
            errors: [],
            context: Object.assign({
                language: 'JavaScript',
                severity: 'error',
                notifier: {
                    name: 'airbrake-js',
                    version: "1.3.0",
                    url: 'https://github.com/airbrake/airbrake-js',
                },
            }, err.context),
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
        var history = historian_1.getHistory();
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
        return this.reporter(notice, this.opts);
    };
    // TODO: fix wrapping for multiple clients
    Client.prototype.wrap = function (fn, props) {
        if (props === void 0) { props = []; }
        if (fn._airbrake) {
            return fn;
        }
        var client = this;
        var airbrakeWrapper = function () {
            var fnArgs = Array.prototype.slice.call(arguments);
            var wrappedArgs = client.wrapArguments(fnArgs);
            try {
                return fn.apply(this, wrappedArgs);
            }
            catch (err) {
                client.notify({ error: err, params: { arguments: fnArgs } });
                historian_1.historian.ignoreNextWindowError();
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
        for (var i in args) {
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
        historian_1.historian.onerror.apply(historian_1.historian, arguments);
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
        var reason = e.reason || e.detail.reason;
        var msg = reason.message || String(reason);
        if (msg.indexOf && msg.indexOf('airbrake: ') === 0) {
            return;
        }
        this.notify(reason);
    };
    return Client;
}());
module.exports = Client;


/***/ }),

/***/ "./src/filter/angular_message.ts":
/*!***************************************!*\
  !*** ./src/filter/angular_message.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = filter;


/***/ }),

/***/ "./src/filter/debounce.ts":
/*!********************************!*\
  !*** ./src/filter/debounce.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = makeFilter;


/***/ }),

/***/ "./src/filter/ignore.ts":
/*!******************************!*\
  !*** ./src/filter/ignore.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IGNORED_MESSAGES = [
    'Script error',
    'Script error.',
    'InvalidAccessError',
];
function filter(notice) {
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
exports.default = filter;


/***/ }),

/***/ "./src/filter/node.ts":
/*!****************************!*\
  !*** ./src/filter/node.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function filter(notice) {
    var os;
    try {
        os = __webpack_require__(/*! os */ "os");
    }
    catch (_) { }
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
        if (true) {
            notice.context.environment = "development";
        }
        notice.params.process = {
            pid: process.pid,
            cwd: process.cwd(),
            execPath: process.execPath,
            argv: process.argv,
        };
        for (var name_1 in ['uptime', 'cpuUsage', 'memoryUsage']) {
            if (process[name_1]) {
                notice.params.process[name_1] = process[name_1]();
            }
        }
    }
    return notice;
}
exports.default = filter;


/***/ }),

/***/ "./src/filter/uncaught_message.ts":
/*!****************************************!*\
  !*** ./src/filter/uncaught_message.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp([
    '^',
    'Uncaught\\s',
    '(.+?)',
    ':\\s',
    '(.+)',
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
exports.default = filter;


/***/ }),

/***/ "./src/filter/window.ts":
/*!******************************!*\
  !*** ./src/filter/window.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function filter(notice) {
    if (window.navigator && window.navigator.userAgent) {
        notice.context.userAgent = window.navigator.userAgent;
    }
    if (window.location) {
        notice.context.url = String(window.location);
        // Set root directory to group errors on different subdomains together.
        notice.context.rootDirectory = window.location.protocol + '//' + window.location.host;
    }
    return notice;
}
exports.default = filter;


/***/ }),

/***/ "./src/historian.ts":
/*!**************************!*\
  !*** ./src/historian.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(/*! ./instrumentation/dom */ "./src/instrumentation/dom.ts");
var Historian = /** @class */ (function () {
    function Historian() {
        var _this = this;
        this.historyMaxLen = 20;
        this.notifiers = [];
        this.errors = [];
        this.ignoreWindowError = 0;
        this.history = [];
        this.ignoreNextXHR = 0;
        if (typeof console === 'object' && console.error) {
            this.consoleError = console.error;
        }
        if (typeof window === 'object') {
            var self_1 = this;
            var oldHandler_1 = window.onerror;
            window.onerror = function () {
                if (oldHandler_1) {
                    oldHandler_1.apply(this, arguments);
                }
                self_1.onerror.apply(self_1, arguments);
            };
            this.domEvents();
            if (typeof fetch === 'function') {
                this.fetch();
            }
            if (typeof history === 'object') {
                this.location();
            }
        }
        if (typeof process === 'object' && typeof process.on === 'function') {
            process.on('uncaughtException', function (err) {
                var exit = function () {
                    if (process.listeners('uncaughtException').length !== 1) {
                        return;
                    }
                    if (_this.consoleError) {
                        _this.consoleError('uncaught exception', err);
                    }
                    process.exit(1);
                };
                _this.notify(err).then(exit).catch(exit);
            });
            process.on('unhandledRejection', function (reason, _p) {
                var msg = reason.message || String(reason);
                if (msg.indexOf && msg.indexOf('airbrake: ') === 0) {
                    return;
                }
                _this.notify(reason);
            });
        }
        if (typeof console === 'object') {
            this.console();
        }
        if (typeof XMLHttpRequest !== 'undefined') {
            this.xhr();
        }
    }
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
        return Promise.resolve({});
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
            if (key === 'date') {
                continue;
            }
            if (state[key] !== this.lastState[key]) {
                return false;
            }
        }
        return true;
    };
    Historian.prototype.domEvents = function () {
        var handler = dom_1.makeEventHandler(this);
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
        var client = this;
        var methods = ['debug', 'log', 'info', 'warn', 'error'];
        var _loop_1 = function (m) {
            if (!(m in console)) {
                return "continue";
            }
            var oldFn = console[m];
            var newFn = function () {
                oldFn.apply(console, arguments);
                client.pushHistory({
                    type: 'log',
                    severity: m,
                    arguments: Array.prototype.slice.call(arguments),
                });
            };
            newFn.inner = oldFn;
            console[m] = newFn;
        };
        for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
            var m = methods_1[_i];
            _loop_1(m);
        }
    };
    Historian.prototype.fetch = function () {
        var client = this;
        var oldFetch = fetch;
        window.fetch = function (input, init) {
            var state = {
                type: 'xhr',
                date: new Date(),
            };
            if (typeof input === 'string') {
                state.url = input;
            }
            else {
                state.url = input.url;
            }
            if (init && init.method) {
                state.method = init.method;
            }
            else {
                state.method = 'GET';
            }
            // Some platforms (e.g. react-native) implement fetch via XHR.
            client.ignoreNextXHR++;
            setTimeout(function () { return client.ignoreNextXHR--; });
            var promise = oldFetch.apply(this, arguments);
            promise.then(function (req) {
                state.statusCode = req.status;
                state.duration = new Date().getTime() - state.date.getTime();
                client.pushHistory(state);
            });
            return promise;
        };
    };
    Historian.prototype.xhr = function () {
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
            if (index >= 0) {
                url = url.slice(index);
            }
            else {
                url = '/';
            }
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
exports.default = Historian;
exports.historian = new Historian();
function getHistory() {
    return exports.historian.getHistory();
}
exports.getHistory = getHistory;


/***/ }),

/***/ "./src/instrumentation/dom.ts":
/*!************************************!*\
  !*** ./src/instrumentation/dom.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    if (elem.className) {
        s.push('.');
        s.push(elem.className.split(' ').join('.'));
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
            state.target = "<" + err.toString() + ">";
        }
        client.pushHistory(state);
    };
}
exports.makeEventHandler = makeEventHandler;


/***/ }),

/***/ "./src/internal/compat.ts":
/*!********************************!*\
  !*** ./src/internal/compat.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (!Object.assign) {
    Object.assign = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _loop_1 = function (source) {
            if (source) {
                Object.keys(source).forEach(function (key) { return target[key] = source[key]; });
            }
        };
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var source = args_1[_a];
            _loop_1(source);
        }
        return target;
    };
}


/***/ }),

/***/ "./src/jsonify_notice.ts":
/*!*******************************!*\
  !*** ./src/jsonify_notice.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var maxObjectLength = 128;
// jsonifyNotice serializes notice to JSON and truncates params,
// environment and session keys.
function jsonifyNotice(notice, maxLength) {
    if (maxLength === void 0) { maxLength = 64000; }
    var s = '';
    try {
        s = JSON.stringify(notice);
    }
    catch (_) { }
    if (s !== '' && s.length < maxLength) {
        return s;
    }
    if (notice.errors) {
        for (var i in notice.errors) {
            var t = new Truncator();
            notice.errors[i] = t.truncate(notice.errors[i]);
        }
    }
    var keys = ['context', 'params', 'environment', 'session'];
    for (var level = 0; level < 8; level++) {
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var obj = notice[key];
            if (obj) {
                notice[key] = truncateObject(obj, level);
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
    for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
        var key = keys_2[_a];
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
exports.default = jsonifyNotice;
// truncateObject truncates each key in the object separately, which is
// useful for handling circular references.
function truncateObject(obj, level) {
    var maxLength = scale(maxObjectLength, level);
    var dst = {};
    var length = 0;
    for (var key in obj) {
        dst[key] = truncate(obj[key], level);
        length++;
        if (length >= maxLength) {
            break;
        }
    }
    return dst;
}
function scale(num, level) {
    return (num >> level) || 1;
}
function truncate(value, level) {
    var t = new Truncator(level);
    return t.truncate(value);
}
exports.truncate = truncate;
var Truncator = /** @class */ (function () {
    function Truncator(level) {
        if (level === void 0) { level = 0; }
        this.maxStringLength = 1024;
        this.maxObjectLength = maxObjectLength;
        this.maxArrayLength = maxObjectLength;
        this.maxDepth = 8;
        this.keys = [];
        this.seen = [];
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
                return String(value);
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
            return value.toString();
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
        for (var i in arr) {
            var el = arr[i];
            dst.push(this.truncate(el, i, depth));
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
        for (var attr in obj) {
            var value = getAttr(obj, attr);
            if (value === undefined || typeof value === 'function') {
                continue;
            }
            dst[attr] = this.truncate(value, attr, depth);
            length++;
            if (length >= this.maxObjectLength) {
                break;
            }
        }
        return dst;
    };
    return Truncator;
}());
function getAttr(obj, attr) {
    // Ignore browser specific exception trying to read attribute (#79).
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


/***/ }),

/***/ "./src/processor/stacktracejs.ts":
/*!***************************************!*\
  !*** ./src/processor/stacktracejs.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ErrorStackParser = __webpack_require__(/*! error-stack-parser */ "./node_modules/error-stack-parser/error-stack-parser.js");
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
function processor(err) {
    var backtrace = [];
    if (!err.noStack) {
        var frames_1 = parse(err);
        if (frames_1.length === 0) {
            try {
                throw new Error('fake');
            }
            catch (fakeErr) {
                frames_1 = parse(fakeErr);
                frames_1.shift();
                frames_1.shift();
            }
        }
        for (var _i = 0, frames_2 = frames_1; _i < frames_2.length; _i++) {
            var frame = frames_2[_i];
            backtrace.push({
                function: frame.functionName || '',
                file: frame.fileName || '',
                line: frame.lineNumber || 0,
                column: frame.columnNumber || 0,
            });
        }
    }
    var type;
    if (err.name) {
        type = err.name;
    }
    else {
        type = '';
    }
    var msg;
    if (err.message) {
        msg = String(err.message);
    }
    else {
        msg = String(err);
    }
    return {
        type: type,
        message: msg,
        backtrace: backtrace,
    };
}
exports.default = processor;


/***/ }),

/***/ "./src/reporter/fetch.ts":
/*!*******************************!*\
  !*** ./src/reporter/fetch.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var jsonify_notice_1 = __webpack_require__(/*! ../jsonify_notice */ "./src/jsonify_notice.ts");
var reporter_1 = __webpack_require__(/*! ./reporter */ "./src/reporter/reporter.ts");
var rateLimitReset = 0;
function report(notice, opts) {
    var utime = Date.now() / 1000;
    if (utime < rateLimitReset) {
        notice.error = reporter_1.errors.ipRateLimited;
        return Promise.resolve(notice);
    }
    var url = opts.host + "/api/v3/projects/" + opts.projectId + "/notices?key=" + opts.projectKey;
    var payload = jsonify_notice_1.default(notice);
    var opt = {
        method: 'POST',
        body: payload,
    };
    return new Promise(function (resolve, _reject) {
        fetch(url, opt).then(function (req) {
            if (req.status === 401) {
                notice.error = reporter_1.errors.unauthorized;
                resolve(notice);
                return;
            }
            if (req.status === 429) {
                notice.error = reporter_1.errors.ipRateLimited;
                resolve(notice);
                var s = req.headers.get('X-RateLimit-Delay');
                if (!s) {
                    return;
                }
                var n = parseInt(s, 10);
                if (n > 0) {
                    rateLimitReset = Date.now() / 1000 + n;
                }
                return;
            }
            if (req.status >= 200 && req.status < 500) {
                var json = void 0;
                try {
                    json = req.json();
                }
                catch (err) {
                    notice.error = err;
                    resolve(notice);
                    return;
                }
                json.then(function (resp) {
                    if (resp.id) {
                        notice.id = resp.id;
                        resolve(notice);
                        return;
                    }
                    if (resp.message) {
                        notice.error = new Error(resp.message);
                        resolve(notice);
                        return;
                    }
                });
                return;
            }
            req.text().then(function (body) {
                notice.error = new Error("airbrake: fetch: unexpected response: code=" + req.status + " body='" + body + "'");
                resolve(notice);
            });
        }).catch(function (err) {
            notice.error = err;
            resolve(notice);
        });
    });
}
exports.default = report;


/***/ }),

/***/ "./src/reporter/jsonp.ts":
/*!*******************************!*\
  !*** ./src/reporter/jsonp.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var jsonify_notice_1 = __webpack_require__(/*! ../jsonify_notice */ "./src/jsonify_notice.ts");
var cbCount = 0;
function report(notice, opts) {
    return new Promise(function (resolve, _reject) {
        cbCount++;
        var cbName = 'airbrakeCb' + String(cbCount);
        window[cbName] = function (resp) {
            try {
                delete window[cbName];
            }
            catch (_) { // IE
                window[cbName] = undefined;
            }
            if (resp.id) {
                notice.id = resp.id;
                resolve(notice);
                return;
            }
            if (resp.message) {
                notice.error = new Error(resp.message);
                resolve(notice);
                return;
            }
            notice.error = new Error(resp);
            resolve(notice);
        };
        var payload = encodeURIComponent(jsonify_notice_1.default(notice));
        var url = opts.host + "/api/v3/projects/" + opts.projectId + "/create-notice?key=" + opts.projectKey + "&callback=" + cbName + "&body=" + payload;
        var document = window.document;
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = url;
        script.onload = function () { return head.removeChild(script); };
        script.onerror = function () {
            head.removeChild(script);
            notice.error = new Error('airbrake: JSONP script error');
            resolve(notice);
        };
        head.appendChild(script);
    });
}
exports.default = report;


/***/ }),

/***/ "./src/reporter/node.ts":
/*!******************************!*\
  !*** ./src/reporter/node.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var jsonify_notice_1 = __webpack_require__(/*! ../jsonify_notice */ "./src/jsonify_notice.ts");
var reporter_1 = __webpack_require__(/*! ./reporter */ "./src/reporter/reporter.ts");
var rateLimitReset = 0;
function report(notice, opts) {
    var request = __webpack_require__(/*! request */ "request");
    var utime = Date.now() / 1000;
    if (utime < rateLimitReset) {
        notice.error = reporter_1.errors.ipRateLimited;
        return Promise.resolve(notice);
    }
    var url = opts.host + "/api/v3/projects/" + opts.projectId + "/notices?key=" + opts.projectKey;
    var payload = jsonify_notice_1.default(notice);
    return new Promise(function (resolve, _reject) {
        var requestWrapper = opts.request || request;
        requestWrapper({
            url: url,
            method: 'POST',
            body: payload,
            headers: {
                'content-type': 'application/json'
            },
            timeout: opts.timeout
        }, function (error, response, body) {
            if (error) {
                notice.error = error;
                resolve(notice);
                return;
            }
            if (!response.statusCode) {
                notice.error = new Error('airbrake: node: statusCode is null or undefined');
                resolve(notice);
                return;
            }
            if (response.statusCode === 401) {
                notice.error = reporter_1.errors.unauthorized;
                resolve(notice);
                return;
            }
            if (response.statusCode === 429) {
                notice.error = reporter_1.errors.ipRateLimited;
                resolve(notice);
                var h = response.headers['x-ratelimit-delay'];
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
            if (response.statusCode >= 200 && response.statusCode < 500) {
                var resp = void 0;
                try {
                    resp = JSON.parse(body);
                }
                catch (err) {
                    notice.error = err;
                    resolve(notice);
                    return;
                }
                if (resp.id) {
                    notice.id = resp.id;
                    resolve(notice);
                    return;
                }
                if (resp.message) {
                    notice.error = new Error(resp.message);
                    resolve(notice);
                    return;
                }
            }
            body = body.trim();
            notice.error = new Error("airbrake: node: unexpected response: code=" + response.statusCode + " body='" + body + "'");
            resolve(notice);
        });
    });
}
exports.default = report;


/***/ }),

/***/ "./src/reporter/reporter.ts":
/*!**********************************!*\
  !*** ./src/reporter/reporter.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function defaultReporter(opts) {
    if (opts.request) {
        return 'node';
    }
    if (typeof fetch === 'function') {
        return 'fetch';
    }
    if (typeof XMLHttpRequest === 'function') {
        return 'xhr';
    }
    if (typeof window === 'object') {
        return 'jsonp';
    }
    return 'node';
}
exports.defaultReporter = defaultReporter;
exports.errors = {
    unauthorized: new Error('airbrake: unauthorized: project id or key are wrong'),
    ipRateLimited: new Error('airbrake: IP is rate limited'),
};


/***/ }),

/***/ "./src/reporter/xhr.ts":
/*!*****************************!*\
  !*** ./src/reporter/xhr.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var jsonify_notice_1 = __webpack_require__(/*! ../jsonify_notice */ "./src/jsonify_notice.ts");
var reporter_1 = __webpack_require__(/*! ./reporter */ "./src/reporter/reporter.ts");
var rateLimitReset = 0;
function report(notice, opts) {
    var utime = Date.now() / 1000;
    if (utime < rateLimitReset) {
        notice.error = reporter_1.errors.ipRateLimited;
        return Promise.resolve(notice);
    }
    var url = opts.host + "/api/v3/projects/" + opts.projectId + "/notices?key=" + opts.projectKey;
    var payload = jsonify_notice_1.default(notice);
    return new Promise(function (resolve, _reject) {
        var req = new XMLHttpRequest();
        req.open('POST', url, true);
        req.timeout = opts.timeout;
        req.onreadystatechange = function () {
            if (req.readyState !== 4) {
                return;
            }
            if (req.status === 401) {
                notice.error = reporter_1.errors.unauthorized;
                resolve(notice);
                return;
            }
            if (req.status === 429) {
                notice.error = reporter_1.errors.ipRateLimited;
                resolve(notice);
                var s = req.getResponseHeader('X-RateLimit-Delay');
                if (!s) {
                    return;
                }
                var n = parseInt(s, 10);
                if (n > 0) {
                    rateLimitReset = Date.now() / 1000 + n;
                }
                return;
            }
            if (req.status >= 200 && req.status < 500) {
                var resp = void 0;
                try {
                    resp = JSON.parse(req.responseText);
                }
                catch (err) {
                    notice.error = err;
                    resolve(notice);
                    return;
                }
                if (resp.id) {
                    notice.id = resp.id;
                    resolve(notice);
                    return;
                }
                if (resp.message) {
                    notice.error = new Error(resp.message);
                    resolve(notice);
                    return;
                }
            }
            var body = req.responseText.trim();
            notice.error = new Error("airbrake: xhr: unexpected response: code=" + req.status + " body='" + body + "'");
            resolve(notice);
        };
        req.send(payload);
    });
}
exports.default = report;


/***/ }),

/***/ 0:
/*!******************************************************!*\
  !*** multi ./src/internal/compat.ts ./src/client.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/internal/compat.ts */"./src/internal/compat.ts");
module.exports = __webpack_require__(/*! ./src/client.ts */"./src/client.ts");


/***/ }),

/***/ "os":
/*!***************************************************!*\
  !*** external {"commonjs":"os","commonjs2":"os"} ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if(typeof __WEBPACK_EXTERNAL_MODULE_os__ === 'undefined') {var e = new Error("Cannot find module \"undefined\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = __WEBPACK_EXTERNAL_MODULE_os__;

/***/ }),

/***/ "request":
/*!*************************************************************!*\
  !*** external {"commonjs":"request","commonjs2":"request"} ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_request__;

/***/ })

/******/ });
});
//# sourceMappingURL=client.js.map