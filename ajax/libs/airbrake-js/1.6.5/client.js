/*! airbrake-js v1.6.5 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory((function webpackLoadOptionalExternalModule() { try { return require("os"); } catch(e) {} }()), require("cross-fetch"));
	else if(typeof define === 'function' && define.amd)
		define(["os", "cross-fetch"], factory);
	else if(typeof exports === 'object')
		exports["Client"] = factory((function webpackLoadOptionalExternalModule() { try { return require("os"); } catch(e) {} }()), require("cross-fetch"));
	else
		root["airbrakeJs"] = root["airbrakeJs"] || {}, root["airbrakeJs"]["Client"] = factory(root[undefined], root["fetch"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_os__, __WEBPACK_EXTERNAL_MODULE_cross_fetch__) {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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



/***/ }),

/***/ "./node_modules/promise-polyfill/src/finally.js":
/*!******************************************************!*\
  !*** ./node_modules/promise-polyfill/src/finally.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
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
}

/* harmony default export */ __webpack_exports__["default"] = (finallyConstructor);


/***/ }),

/***/ "./node_modules/promise-polyfill/src/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/src/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(setImmediate) {/* harmony import */ var _finally__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./finally */ "./node_modules/promise-polyfill/src/finally.js");


// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

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
function Promise(fn) {
  if (!(this instanceof Promise))
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

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = _finally__WEBPACK_IMPORTED_MODULE_0__["default"];

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

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
/* harmony import */ var _finally__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./finally */ "./node_modules/promise-polyfill/src/finally.js");



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
  globalNS['Promise'] = _index__WEBPACK_IMPORTED_MODULE_0__["default"];
} else if (!globalNS.Promise.prototype['finally']) {
  globalNS.Promise.prototype['finally'] = _finally__WEBPACK_IMPORTED_MODULE_1__["default"];
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

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
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
  this._clearFn.call(scope, this._id);
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
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

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
	g = g || new Function("return this")();
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

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
__webpack_require__(/*! promise-polyfill/src/polyfill */ "./node_modules/promise-polyfill/src/polyfill.js");
var jsonify_notice_1 = __importDefault(__webpack_require__(/*! ./jsonify_notice */ "./src/jsonify_notice.ts"));
var stacktracejs_1 = __importDefault(__webpack_require__(/*! ./processor/stacktracejs */ "./src/processor/stacktracejs.ts"));
var angular_message_1 = __importDefault(__webpack_require__(/*! ./filter/angular_message */ "./src/filter/angular_message.ts"));
var debounce_1 = __importDefault(__webpack_require__(/*! ./filter/debounce */ "./src/filter/debounce.ts"));
var ignore_1 = __importDefault(__webpack_require__(/*! ./filter/ignore */ "./src/filter/ignore.ts"));
var node_1 = __importDefault(__webpack_require__(/*! ./filter/node */ "./src/filter/node.ts"));
var uncaught_message_1 = __importDefault(__webpack_require__(/*! ./filter/uncaught_message */ "./src/filter/uncaught_message.ts"));
var window_1 = __importDefault(__webpack_require__(/*! ./filter/window */ "./src/filter/window.ts"));
var http_req_1 = __webpack_require__(/*! ./http_req */ "./src/http_req/index.ts");
var historian_1 = __webpack_require__(/*! ./historian */ "./src/historian.ts");
var routes_1 = __webpack_require__(/*! ./routes */ "./src/routes.ts");
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
        this.processor = this.opts.processor || stacktracejs_1.default;
        this.requester = http_req_1.makeRequester(this.opts);
        this.addFilter(ignore_1.default);
        this.addFilter(debounce_1.default());
        this.addFilter(uncaught_message_1.default);
        this.addFilter(angular_message_1.default);
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
        var historianOpts = opts.instrumentation || {};
        if (typeof historianOpts.console === undefined) {
            historianOpts.console = !isDevEnv(opts.environment);
        }
        this.historian = historian_1.Historian.instance(historianOpts);
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
            version: "1.6.5",
            url: 'https://github.com/airbrake/airbrake-js',
        };
        return this.sendNotice(notice);
    };
    Client.prototype.sendNotice = function (notice) {
        var body = jsonify_notice_1.default(notice, {
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
        if (!this.routes) {
            this.routes = new routes_1.Routes(this.opts);
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
            (e.detail && e.detail.reason) ||
            'unhandled rejection with no reason given';
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
        notice.context.rootDirectory =
            window.location.protocol + '//' + window.location.host;
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
var CONSOLE_METHODS = ['debug', 'log', 'info', 'warn', 'error'];
var Historian = /** @class */ (function () {
    function Historian(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
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
                this.fetch();
            }
            if (enabled(opts.history) && typeof history === 'object') {
                this.location();
            }
        }
        if (typeof process === 'object' && typeof process.on === 'function') {
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
    Historian.prototype.fetch = function () {
        // tslint:disable-next-line:no-this-assignment
        var client = this;
        var oldFetch = window.fetch;
        window.fetch = function (input, init) {
            var state = {
                type: 'xhr',
                date: new Date(),
            };
            state.url = typeof input === 'string' ? input : input.url;
            state.method = init && init.method ? init.method : 'GET';
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
exports.Historian = Historian;
function enabled(v) {
    return v === undefined || v === true;
}


/***/ }),

/***/ "./src/http_req/fetch.ts":
/*!*******************************!*\
  !*** ./src/http_req/fetch.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-var-requires
var fetch = __webpack_require__(/*! cross-fetch */ "cross-fetch");
var index_1 = __webpack_require__(/*! ./index */ "./src/http_req/index.ts");
var rateLimitReset = 0;
function request(req) {
    var utime = Date.now() / 1000;
    if (utime < rateLimitReset) {
        return Promise.reject(index_1.errors.ipRateLimited);
    }
    var opt = {
        method: req.method,
        body: req.body,
    };
    return fetch(req.url, opt).then(function (resp) {
        if (resp.status === 401) {
            throw index_1.errors.unauthorized;
        }
        if (resp.status === 429) {
            var s = resp.headers.get('X-RateLimit-Delay');
            if (!s) {
                throw index_1.errors.ipRateLimited;
            }
            var n = parseInt(s, 10);
            if (n > 0) {
                rateLimitReset = Date.now() / 1000 + n;
            }
            throw index_1.errors.ipRateLimited;
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
exports.request = request;


/***/ }),

/***/ "./src/http_req/index.ts":
/*!*******************************!*\
  !*** ./src/http_req/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = __webpack_require__(/*! ./fetch */ "./src/http_req/fetch.ts");
var node_1 = __webpack_require__(/*! ./node */ "./src/http_req/node.ts");
function makeRequester(opts) {
    if (opts.request) {
        return node_1.makeRequester(opts.request);
    }
    return fetch_1.request;
}
exports.makeRequester = makeRequester;
exports.errors = {
    unauthorized: new Error('airbrake: unauthorized: project id or key are wrong'),
    ipRateLimited: new Error('airbrake: IP is rate limited'),
};


/***/ }),

/***/ "./src/http_req/node.ts":
/*!******************************!*\
  !*** ./src/http_req/node.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! ./index */ "./src/http_req/index.ts");
function makeRequester(api) {
    return function (req) {
        return request(req, api);
    };
}
exports.makeRequester = makeRequester;
var rateLimitReset = 0;
function request(req, api) {
    var utime = Date.now() / 1000;
    if (utime < rateLimitReset) {
        return Promise.reject(index_1.errors.ipRateLimited);
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
                reject(index_1.errors.unauthorized);
                return;
            }
            if (resp.statusCode === 429) {
                reject(index_1.errors.ipRateLimited);
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
            error = new Error("airbrake: node: unexpected response: code=" + resp.statusCode + " body='" + body + "'");
            reject(error);
        });
    });
}


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
exports.makeEventHandler = makeEventHandler;


/***/ }),

/***/ "./src/jsonify_notice.ts":
/*!*******************************!*\
  !*** ./src/jsonify_notice.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = jsonifyNotice;
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
exports.truncate = truncate;
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
exports.default = processor;


/***/ }),

/***/ "./src/routes.ts":
/*!***********************!*\
  !*** ./src/routes.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_req_1 = __webpack_require__(/*! ./http_req */ "./src/http_req/index.ts");
var FLUSH_INTERVAL = 15000; // 15 seconds
var Routes = /** @class */ (function () {
    function Routes(opts) {
        // TODO: use RouteKey as map key
        this.m = {};
        this.opts = opts;
        this.url = this.opts.host + "/api/v5/projects/" + this.opts.projectId + "/routes-stats?key=" + this.opts.projectKey;
        this.requester = http_req_1.makeRequester(this.opts);
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
        var req = {
            method: 'POST',
            url: this.url,
            body: JSON.stringify({ environment: this.opts.environment, routes: routes }),
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
exports.Routes = Routes;
var NS_PER_MS = 1e6;
function toTime(tm) {
    if (tm instanceof Date) {
        return tm.getTime();
    }
    if (typeof tm === 'number') {
        return tm;
    }
    if (tm instanceof Array) {
        return tm[0] + tm[1] / NS_PER_MS;
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
    if (start instanceof Array && end instanceof Array) {
        var ms = end[0] - start[0];
        ms += (end[1] - start[1]) / NS_PER_MS;
        return ms;
    }
    throw new Error("unsupported type: " + typeof start);
}


/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./src/client.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/client.ts */"./src/client.ts");


/***/ }),

/***/ "cross-fetch":
/*!********************************************************************************************************!*\
  !*** external {"commonjs":"cross-fetch","commonjs2":"cross-fetch","amd":"cross-fetch","root":"fetch"} ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_cross_fetch__;

/***/ }),

/***/ "os":
/*!**************************************************************!*\
  !*** external {"commonjs":"os","commonjs2":"os","amd":"os"} ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if(typeof __WEBPACK_EXTERNAL_MODULE_os__ === 'undefined') {var e = new Error("Cannot find module 'undefined'"); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = __WEBPACK_EXTERNAL_MODULE_os__;

/***/ })

/******/ });
});
//# sourceMappingURL=client.js.map