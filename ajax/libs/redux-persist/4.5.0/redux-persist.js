(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["redux-persist"] = factory();
	else
		root["redux-persist"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var KEY_PREFIX = exports.KEY_PREFIX = 'reduxPersist:';
var REHYDRATE = exports.REHYDRATE = 'persist/REHYDRATE';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NODE_ENV = exports.NODE_ENV = typeof process !== 'undefined' ? undefined : 'production';
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPersistor;

var _constants = __webpack_require__(0);

var _asyncLocalStorage = __webpack_require__(7);

var _asyncLocalStorage2 = _interopRequireDefault(_asyncLocalStorage);

var _purgeStoredState = __webpack_require__(6);

var _purgeStoredState2 = _interopRequireDefault(_purgeStoredState);

var _jsonStringifySafe = __webpack_require__(13);

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

var _env = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPersistor(store, config) {
  // defaults
  var serializer = config.serialize === false ? function (data) {
    return data;
  } : defaultSerializer;
  var deserializer = config.serialize === false ? function (data) {
    return data;
  } : defaultDeserializer;
  var blacklist = config.blacklist || [];
  var whitelist = config.whitelist || false;
  var transforms = config.transforms || [];
  var debounce = config.debounce || false;
  var keyPrefix = config.keyPrefix !== undefined ? config.keyPrefix : _constants.KEY_PREFIX;

  // pluggable state shape (e.g. immutablejs)
  var stateInit = config._stateInit || {};
  var stateIterator = config._stateIterator || defaultStateIterator;
  var stateGetter = config._stateGetter || defaultStateGetter;
  var stateSetter = config._stateSetter || defaultStateSetter;

  // storage with keys -> getAllKeys for localForage support
  var storage = config.storage || (0, _asyncLocalStorage2.default)('local');
  if (storage.keys && !storage.getAllKeys) {
    storage.getAllKeys = storage.keys;
  }

  // initialize stateful values
  var lastState = stateInit;
  var paused = false;
  var storesToProcess = [];
  var timeIterator = null;

  store.subscribe(function () {
    if (paused) return;

    var state = store.getState();

    stateIterator(state, function (subState, key) {
      if (!passWhitelistBlacklist(key)) return;
      if (stateGetter(lastState, key) === stateGetter(state, key)) return;
      if (storesToProcess.indexOf(key) !== -1) return;
      storesToProcess.push(key);
    });

    // time iterator (read: debounce)
    if (timeIterator === null) {
      timeIterator = setInterval(function () {
        if (storesToProcess.length === 0) {
          clearInterval(timeIterator);
          timeIterator = null;
          return;
        }

        var key = storesToProcess[0];
        var storageKey = createStorageKey(key);
        var endState = transforms.reduce(function (subState, transformer) {
          return transformer.in(subState, key);
        }, stateGetter(store.getState(), key));
        if (typeof endState !== 'undefined') storage.setItem(storageKey, serializer(endState), warnIfSetError(key));
        storesToProcess.shift();
      }, debounce);
    }

    lastState = state;
  });

  function passWhitelistBlacklist(key) {
    if (whitelist && whitelist.indexOf(key) === -1) return false;
    if (blacklist.indexOf(key) !== -1) return false;
    return true;
  }

  function adhocRehydrate(incoming) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var state = {};
    if (options.serial) {
      stateIterator(incoming, function (subState, key) {
        try {
          var data = deserializer(subState);
          var value = transforms.reduceRight(function (interState, transformer) {
            return transformer.out(interState, key);
          }, data);
          state = stateSetter(state, key, value);
        } catch (err) {
          if (_env.NODE_ENV !== 'production') console.warn('Error rehydrating data for key "' + key + '"', subState, err);
        }
      });
    } else state = incoming;

    store.dispatch(rehydrateAction(state));
    return state;
  }

  function createStorageKey(key) {
    return '' + keyPrefix + key;
  }

  // return `persistor`
  return {
    rehydrate: adhocRehydrate,
    pause: function pause() {
      paused = true;
    },
    resume: function resume() {
      paused = false;
    },
    purge: function purge(keys) {
      return (0, _purgeStoredState2.default)({ storage: storage, keyPrefix: keyPrefix }, keys);
    }
  };
}

function warnIfSetError(key) {
  return function setError(err) {
    if (err && _env.NODE_ENV !== 'production') {
      console.warn('Error storing data for key:', key, err);
    }
  };
}

function defaultSerializer(data) {
  return (0, _jsonStringifySafe2.default)(data, null, null, function (k, v) {
    if (_env.NODE_ENV !== 'production') return null;
    throw new Error('\n      redux-persist: cannot process cyclical state.\n      Consider changing your state structure to have no cycles.\n      Alternatively blacklist the corresponding reducer key.\n      Cycle encounted at key "' + k + '" with value "' + v + '".\n    ');
  });
}

function defaultDeserializer(serial) {
  return JSON.parse(serial);
}

function rehydrateAction(data) {
  return {
    type: _constants.REHYDRATE,
    payload: data
  };
}

function defaultStateIterator(collection, callback) {
  return Object.keys(collection).forEach(function (key) {
    return callback(collection[key], key);
  });
}

function defaultStateGetter(state, key) {
  return state[key];
}

function defaultStateSetter(state, key, value) {
  state[key] = value;
  return state;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = getStoredState;

var _constants = __webpack_require__(0);

var _asyncLocalStorage = __webpack_require__(7);

var _asyncLocalStorage2 = _interopRequireDefault(_asyncLocalStorage);

var _env = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStoredState(config, onComplete) {
  var storage = config.storage || (0, _asyncLocalStorage2.default)('local');
  var deserializer = config.serialize === false ? function (data) {
    return data;
  } : defaultDeserializer;
  var blacklist = config.blacklist || [];
  var whitelist = config.whitelist || false;
  var transforms = config.transforms || [];
  var keyPrefix = config.keyPrefix !== undefined ? config.keyPrefix : _constants.KEY_PREFIX;

  // fallback getAllKeys to `keys` if present (LocalForage compatability)
  if (storage.keys && !storage.getAllKeys) storage = _extends({}, storage, { getAllKeys: storage.keys });

  var restoredState = {};
  var completionCount = 0;

  storage.getAllKeys(function (err, allKeys) {
    if (err) {
      if (_env.NODE_ENV !== 'production') console.warn('redux-persist/getStoredState: Error in storage.getAllKeys');
      complete(err);
    }

    var persistKeys = allKeys.filter(function (key) {
      return key.indexOf(keyPrefix) === 0;
    }).map(function (key) {
      return key.slice(keyPrefix.length);
    });
    var keysToRestore = persistKeys.filter(passWhitelistBlacklist);

    var restoreCount = keysToRestore.length;
    if (restoreCount === 0) complete(null, restoredState);
    keysToRestore.forEach(function (key) {
      storage.getItem(createStorageKey(key), function (err, serialized) {
        if (err && _env.NODE_ENV !== 'production') console.warn('redux-persist/getStoredState: Error restoring data for key:', key, err);else restoredState[key] = rehydrate(key, serialized);
        completionCount += 1;
        if (completionCount === restoreCount) complete(null, restoredState);
      });
    });
  });

  function rehydrate(key, serialized) {
    var state = null;

    try {
      var data = deserializer(serialized);
      state = transforms.reduceRight(function (subState, transformer) {
        return transformer.out(subState, key);
      }, data);
    } catch (err) {
      if (_env.NODE_ENV !== 'production') console.warn('redux-persist/getStoredState: Error restoring data for key:', key, err);
    }

    return state;
  }

  function complete(err, restoredState) {
    onComplete(err, restoredState);
  }

  function passWhitelistBlacklist(key) {
    if (whitelist && whitelist.indexOf(key) === -1) return false;
    if (blacklist.indexOf(key) !== -1) return false;
    return true;
  }

  function createStorageKey(key) {
    return '' + keyPrefix + key;
  }

  if (typeof onComplete !== 'function' && !!Promise) {
    return new Promise(function (resolve, reject) {
      onComplete = function onComplete(err, restoredState) {
        if (err) reject(err);else resolve(restoredState);
      };
    });
  }
}

function defaultDeserializer(serial) {
  return JSON.parse(serial);
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = purgeStoredState;

var _constants = __webpack_require__(0);

var _env = __webpack_require__(1);

function purgeStoredState(config, keys) {
  var storage = config.storage;
  var keyPrefix = config.keyPrefix !== undefined ? config.keyPrefix : _constants.KEY_PREFIX;

  // basic validation
  if (Array.isArray(config)) throw new Error('redux-persist: purgeStoredState requires config as a first argument (found array). An array of keys is the optional second argument.');
  if (!storage) throw new Error('redux-persist: config.storage required in purgeStoredState');

  if (typeof keys === 'undefined') {
    // if keys is not defined, purge all keys
    return new Promise(function (resolve, reject) {
      storage.getAllKeys(function (err, allKeys) {
        if (err && _env.NODE_ENV !== 'production') {
          console.warn('redux-persist: error during purgeStoredState in storage.getAllKeys');
          reject(err);
        } else {
          resolve(purgeStoredState(config, allKeys.filter(function (key) {
            return key.indexOf(keyPrefix) === 0;
          }).map(function (key) {
            return key.slice(keyPrefix.length);
          })));
        }
      });
    });
  } else {
    // otherwise purge specified keys
    return Promise.all(keys.map(function (key) {
      return storage.removeItem('' + keyPrefix + key, warnIfRemoveError(key));
    }));
  }
}

function warnIfRemoveError(key) {
  return function removeError(err) {
    if (err && _env.NODE_ENV !== 'production') {
      console.warn('Error storing data for key:', key, err);
    }
  };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate, global, process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (type, config) {
  var storage = getStorage(type);
  return {
    getAllKeys: function getAllKeys(cb) {
      return new Promise(function (resolve, reject) {
        try {
          var keys = [];
          for (var i = 0; i < storage.length; i++) {
            keys.push(storage.key(i));
          }
          nextTick(function () {
            cb && cb(null, keys);
            resolve(keys);
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    },
    getItem: function getItem(key, cb) {
      return new Promise(function (resolve, reject) {
        try {
          var s = storage.getItem(key);
          nextTick(function () {
            cb && cb(null, s);
            resolve(s);
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    },
    setItem: function setItem(key, string, cb) {
      return new Promise(function (resolve, reject) {
        try {
          storage.setItem(key, string);
          nextTick(function () {
            cb && cb(null);
            resolve();
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    },
    removeItem: function removeItem(key, cb) {
      return new Promise(function (resolve, reject) {
        try {
          storage.removeItem(key);
          nextTick(function () {
            cb && cb(null);
            resolve();
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    }
  };
};

var _env = __webpack_require__(1);

var genericSetImmediate = typeof setImmediate === 'undefined' ? global.setImmediate : setImmediate;
var nextTick = process && process.nextTick ? process.nextTick : genericSetImmediate;

var noStorage = _env.NODE_ENV === 'production' ? function () {
  /* noop */return null;
} : function () {
  console.error('redux-persist asyncLocalStorage requires a global localStorage object. Either use a different storage backend or if this is a universal redux application you probably should conditionally persist like so: https://gist.github.com/rt2zz/ac9eb396793f95ff3c3b');
  return null;
};

function _hasStorage(storageType) {
  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !(storageType in window)) {
    return false;
  }

  try {
    var storage = window[storageType];
    var testKey = 'redux-persist ' + storageType + ' test';
    storage.setItem(testKey, 'test');
    storage.getItem(testKey);
    storage.removeItem(testKey);
  } catch (e) {
    if (_env.NODE_ENV !== 'production') console.warn('redux-persist ' + storageType + ' test failed, persistence will be disabled.');
    return false;
  }
  return true;
}

function hasLocalStorage() {
  return _hasStorage('localStorage');
}

function hasSessionStorage() {
  return _hasStorage('sessionStorage');
}

function getStorage(type) {
  if (type === 'local') {
    return hasLocalStorage() ? window.localStorage : { getItem: noStorage, setItem: noStorage, removeItem: noStorage, getAllKeys: noStorage };
  }
  if (type === 'session') {
    return hasSessionStorage() ? window.sessionStorage : { getItem: noStorage, setItem: noStorage, removeItem: noStorage, getAllKeys: noStorage };
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).setImmediate, __webpack_require__(3), __webpack_require__(2)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

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
__webpack_require__(19);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = autoRehydrate;

var _constants = __webpack_require__(0);

var _isStatePlainEnough = __webpack_require__(12);

var _isStatePlainEnough2 = _interopRequireDefault(_isStatePlainEnough);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function autoRehydrate() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var stateReconciler = config.stateReconciler || defaultStateReconciler;

  return function (next) {
    return function (reducer, initialState, enhancer) {
      var store = next(liftReducer(reducer), initialState, enhancer);
      return _extends({}, store, {
        replaceReducer: function replaceReducer(reducer) {
          return store.replaceReducer(liftReducer(reducer));
        }
      });
    };
  };

  function liftReducer(reducer) {
    var rehydrated = false;
    var preRehydrateActions = [];
    return function (state, action) {
      if (action.type !== _constants.REHYDRATE) {
        if (config.log && !rehydrated) preRehydrateActions.push(action); // store pre-rehydrate actions for debugging
        return reducer(state, action);
      } else {
        if (config.log && !rehydrated) logPreRehydrate(preRehydrateActions);
        rehydrated = true;

        var inboundState = action.payload;
        var reducedState = reducer(state, action);

        return stateReconciler(state, inboundState, reducedState, config.log);
      }
    };
  }
}

function logPreRehydrate(preRehydrateActions) {
  var concernedActions = preRehydrateActions.slice(1);
  if (concernedActions.length > 0) {
    console.log('\n      redux-persist/autoRehydrate: %d actions were fired before rehydration completed. This can be a symptom of a race\n      condition where the rehydrate action may overwrite the previously affected state. Consider running these actions\n      after rehydration:\n    ', concernedActions.length, concernedActions);
  }
}

function defaultStateReconciler(state, inboundState, reducedState, log) {
  var newState = _extends({}, reducedState);

  Object.keys(inboundState).forEach(function (key) {
    // if initialState does not have key, skip auto rehydration
    if (!state.hasOwnProperty(key)) return;

    // if initial state is an object but inbound state is null/undefined, skip
    if (_typeof(state[key]) === 'object' && !inboundState[key]) {
      if (log) console.log('redux-persist/autoRehydrate: sub state for key `%s` is falsy but initial state is an object, skipping autoRehydrate.', key);
      return;
    }

    // if reducer modifies substate, skip auto rehydration
    if (state[key] !== reducedState[key]) {
      if (log) console.log('redux-persist/autoRehydrate: sub state for key `%s` modified, skipping autoRehydrate.', key);
      newState[key] = reducedState[key];
      return;
    }

    // otherwise take the inboundState
    if ((0, _isStatePlainEnough2.default)(inboundState[key]) && (0, _isStatePlainEnough2.default)(state[key])) newState[key] = _extends({}, state[key], inboundState[key]); // shallow merge
    else newState[key] = inboundState[key]; // hard set

    if (log) console.log('redux-persist/autoRehydrate: key `%s`, rehydrated to ', key, newState[key]);
  });
  return newState;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function createTransform(inbound, outbound) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var whitelist = config.whitelist || null;
  var blacklist = config.blacklist || null;

  function whitelistBlacklistCheck(key) {
    if (whitelist && whitelist.indexOf(key) === -1) return true;
    if (blacklist && blacklist.indexOf(key) !== -1) return true;
    return false;
  }

  return {
    in: function _in(state, key) {
      return !whitelistBlacklistCheck(key) && inbound ? inbound(state, key) : state;
    },
    out: function out(state, key) {
      return !whitelistBlacklistCheck(key) && outbound ? outbound(state, key) : state;
    }
  };
}

exports.default = createTransform;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate, global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = persistStore;

var _constants = __webpack_require__(0);

var _getStoredState = __webpack_require__(5);

var _getStoredState2 = _interopRequireDefault(_getStoredState);

var _createPersistor = __webpack_require__(4);

var _createPersistor2 = _interopRequireDefault(_createPersistor);

var _env = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// try to source setImmediate as follows: setImmediate (global) -> global.setImmediate -> setTimeout(fn, 0)
var genericSetImmediate = typeof setImmediate === 'undefined' ? global.setImmediate || function (fn) {
  return setTimeout(fn, 0);
} : setImmediate;

function persistStore(store) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onComplete = arguments[2];

  // defaults
  // @TODO remove shouldRestore
  var shouldRestore = !config.skipRestore;
  if (_env.NODE_ENV !== 'production' && config.skipRestore) console.warn('redux-persist: config.skipRestore has been deprecated. If you want to skip restoration use `createPersistor` instead');

  var purgeKeys = null;

  // create and pause persistor
  var persistor = (0, _createPersistor2.default)(store, config);
  persistor.pause();

  // restore
  if (shouldRestore) {
    genericSetImmediate(function () {
      (0, _getStoredState2.default)(config, function (err, restoredState) {
        // do not persist state for purgeKeys
        if (purgeKeys) {
          if (purgeKeys === '*') restoredState = {};else purgeKeys.forEach(function (key) {
            return delete restoredState[key];
          });
        }

        store.dispatch(rehydrateAction(restoredState, err));
        complete(err, restoredState);
      });
    });
  } else genericSetImmediate(complete);

  function complete(err, restoredState) {
    persistor.resume();
    onComplete && onComplete(err, restoredState);
  }

  return _extends({}, persistor, {
    purge: function purge(keys) {
      purgeKeys = keys || '*';
      return persistor.purge(keys);
    }
  });
}

function rehydrateAction(payload) {
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return {
    type: _constants.REHYDRATE,
    payload: payload,
    error: error
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).setImmediate, __webpack_require__(3)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isStatePlainEnough;

var _isPlainObject = __webpack_require__(18);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isStatePlainEnough(a) {
  // isPlainObject + duck type not immutable
  if (!a) return false;
  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object') return false;
  if (typeof a.asMutable === 'function') return false;
  if (!(0, _isPlainObject2.default)(a)) return false;
  return true;
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

exports = module.exports = stringify
exports.getSerialize = serializer

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(16);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(14),
    getPrototype = __webpack_require__(15),
    isObjectLike = __webpack_require__(17);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storages = exports.purgeStoredState = exports.persistStore = exports.getStoredState = exports.createTransform = exports.createPersistor = exports.autoRehydrate = undefined;

var _autoRehydrate = __webpack_require__(9);

var _autoRehydrate2 = _interopRequireDefault(_autoRehydrate);

var _createPersistor = __webpack_require__(4);

var _createPersistor2 = _interopRequireDefault(_createPersistor);

var _createTransform = __webpack_require__(10);

var _createTransform2 = _interopRequireDefault(_createTransform);

var _getStoredState = __webpack_require__(5);

var _getStoredState2 = _interopRequireDefault(_getStoredState);

var _persistStore = __webpack_require__(11);

var _persistStore2 = _interopRequireDefault(_persistStore);

var _purgeStoredState = __webpack_require__(6);

var _purgeStoredState2 = _interopRequireDefault(_purgeStoredState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @TODO remove in v5
var deprecated = function deprecated(cb, cb2, cb3) {
  console.error('redux-persist: this method of importing storages has been removed. instead use `import { asyncLocalStorage } from "redux-persist/storages"`');
  if (typeof cb === 'function') cb();
  if (typeof cb2 === 'function') cb2();
  if (typeof cb3 === 'function') cb3();
};
var deprecatedStorage = { getAllKeys: deprecated, getItem: deprecated, setItem: deprecated, removeItem: deprecated };
var storages = {
  asyncLocalStorage: deprecatedStorage,
  asyncSessionStorage: deprecatedStorage
};

exports.autoRehydrate = _autoRehydrate2.default;
exports.createPersistor = _createPersistor2.default;
exports.createTransform = _createTransform2.default;
exports.getStoredState = _getStoredState2.default;
exports.persistStore = _persistStore2.default;
exports.purgeStoredState = _purgeStoredState2.default;
exports.storages = storages;

/***/ })
/******/ ]);
});
//# sourceMappingURL=redux-persist.js.map