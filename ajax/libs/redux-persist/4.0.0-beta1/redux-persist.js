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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.storages = exports.purgeStoredState = exports.persistStore = exports.getStoredState = exports.createTransform = exports.createPersistor = exports.autoRehydrate = undefined;
	
	var _asyncLocalStorage = __webpack_require__(3);
	
	var _asyncLocalStorage2 = _interopRequireDefault(_asyncLocalStorage);
	
	var _autoRehydrate = __webpack_require__(10);
	
	var _autoRehydrate2 = _interopRequireDefault(_autoRehydrate);
	
	var _createPersistor = __webpack_require__(4);
	
	var _createPersistor2 = _interopRequireDefault(_createPersistor);
	
	var _createTransform = __webpack_require__(11);
	
	var _createTransform2 = _interopRequireDefault(_createTransform);
	
	var _getStoredState = __webpack_require__(5);
	
	var _getStoredState2 = _interopRequireDefault(_getStoredState);
	
	var _persistStore = __webpack_require__(12);
	
	var _persistStore2 = _interopRequireDefault(_persistStore);
	
	var _purgeStoredState = __webpack_require__(6);
	
	var _purgeStoredState2 = _interopRequireDefault(_purgeStoredState);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var storageDeprecatedMessage = function storageDeprecatedMessage(type) {
	  return '\n  To import async' + type + 'Storage please import from \'redux-persist/storages\'. For Example:\n  `import { async' + type + 'Storage } from \'redux-persist/storages\'`\n  or `var async' + type + 'Storage = require(\'redux-persist/storages\').async' + type + 'Storage`\n';
	};
	
	var storages = {
	  asyncLocalStorage: (0, _asyncLocalStorage2.default)('local', { deprecated: storageDeprecatedMessage('Local') }),
	  asyncSessionStorage: (0, _asyncLocalStorage2.default)('session', { deprecated: storageDeprecatedMessage('Session') })
	};
	
	exports.autoRehydrate = _autoRehydrate2.default;
	exports.createPersistor = _createPersistor2.default;
	exports.createTransform = _createTransform2.default;
	exports.getStoredState = _getStoredState2.default;
	exports.persistStore = _persistStore2.default;
	exports.purgeStoredState = _purgeStoredState2.default;
	exports.storages = storages;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var KEY_PREFIX = exports.KEY_PREFIX = 'reduxPersist:';
	var REHYDRATE = exports.REHYDRATE = 'persist/REHYDRATE';

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(9).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
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
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate, __webpack_require__(2).clearImmediate))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, global, process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = function (type, config) {
	  var deprecated = config && config.deprecated;
	  var storage = getStorage(type);
	  return {
	    getAllKeys: function getAllKeys(cb) {
	      // warn if deprecated
	      if (deprecated) console.warn('redux-persist: ', deprecated);
	
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
	
	var genericSetImmediate = typeof setImmediate === 'undefined' ? global.setImmediate : setImmediate;
	var nextTick = process && process.nextTick ? process.nextTick : genericSetImmediate;
	
	var noStorage = (undefined) === 'production' ? function () {
	  /* noop */return null;
	} : function () {
	  console.error('redux-persist asyncLocalStorage requires a global localStorage object. Either use a different storage backend or if this is a universal redux application you probably should conditionally persist like so: https://gist.github.com/rt2zz/ac9eb396793f95ff3c3b');
	  return null;
	};
	
	function hasLocalStorage() {
	  var storageExists = void 0;
	  try {
	    storageExists = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && !!window.localStorage;
	    if (storageExists) {
	      var testKey = 'redux-persist localStorage test';
	      // @TODO should we also test set and remove?
	      window.localStorage.getItem(testKey);
	    }
	  } catch (e) {
	    if ((undefined) !== 'production') console.warn('redux-persist localStorage getItem test failed, persistence will be disabled.');
	    return false;
	  }
	  return storageExists;
	}
	
	function hasSessionStorage() {
	  try {
	    return (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && typeof window.sessionStorage !== 'undefined';
	  } catch (e) {
	    return false;
	  }
	}
	
	function getStorage(type) {
	  if (type === 'local') {
	    return hasLocalStorage() ? window.localStorage : { getItem: noStorage, setItem: noStorage, removeItem: noStorage, getAllKeys: noStorage };
	  }
	  if (type === 'session') {
	    return hasSessionStorage() ? window.sessionStorage : { getItem: noStorage, setItem: noStorage, removeItem: noStorage, getAllKeys: noStorage };
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate, (function() { return this; }()), __webpack_require__(9)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createPersistor;
	
	var _constants = __webpack_require__(1);
	
	var _asyncLocalStorage = __webpack_require__(3);
	
	var _asyncLocalStorage2 = _interopRequireDefault(_asyncLocalStorage);
	
	var _purgeStoredState = __webpack_require__(6);
	
	var _purgeStoredState2 = _interopRequireDefault(_purgeStoredState);
	
	var _jsonStringifySafe = __webpack_require__(14);
	
	var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);
	
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
	          if ((undefined) !== 'production') console.warn('Error rehydrating data for key "' + key + '"', subState, err);
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
	    if (err && (undefined) !== 'production') {
	      console.warn('Error storing data for key:', key, err);
	    }
	  };
	}
	
	function defaultSerializer(data) {
	  return (0, _jsonStringifySafe2.default)(data, null, null, function (k, v) {
	    if ((undefined) !== 'production') return null;
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = getStoredState;
	
	var _forEach = __webpack_require__(32);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	var _constants = __webpack_require__(1);
	
	var _asyncLocalStorage = __webpack_require__(3);
	
	var _asyncLocalStorage2 = _interopRequireDefault(_asyncLocalStorage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getStoredState(config, onComplete) {
	  var storage = config.storage || (0, _asyncLocalStorage2.default)('local');
	  var deserialize = config.deserialize || defaultDeserialize;
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
	      if ((undefined) !== 'production') console.warn('redux-persist/getStoredState: Error in storage.getAllKeys');
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
	    (0, _forEach2.default)(keysToRestore, function (key) {
	      storage.getItem(createStorageKey(key), function (err, serialized) {
	        if (err && (undefined) !== 'production') console.warn('redux-persist/getStoredState: Error restoring data for key:', key, err);else restoredState[key] = rehydrate(key, serialized);
	        completionCount += 1;
	        if (completionCount === restoreCount) complete(null, restoredState);
	      });
	    });
	  });
	
	  function rehydrate(key, serialized) {
	    var state = null;
	
	    try {
	      var data = deserialize(serialized);
	      state = transforms.reduceRight(function (subState, transformer) {
	        return transformer.out(subState, key);
	      }, data);
	    } catch (err) {
	      if ((undefined) !== 'production') console.warn('redux-persist/getStoredState: Error restoring data for key:', key, err);
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
	
	function defaultDeserialize(serial) {
	  return JSON.parse(serial);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = purgeStoredState;
	
	var _constants = __webpack_require__(1);
	
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
	        if (err && (undefined) !== 'production') {
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
	    if (err && (undefined) !== 'production') {
	      console.warn('Error storing data for key:', key, err);
	    }
	  };
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;
	
	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = strictIndexOf;


/***/ },
/* 9 */
/***/ function(module, exports) {

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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = autoRehydrate;
	
	var _constants = __webpack_require__(1);
	
	var _isStatePlainEnough = __webpack_require__(13);
	
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
	  if (preRehydrateActions.length > 0) {
	    console.log('\n      redux-persist/autoRehydrate: %d actions were fired before rehydration completed. This can be a symptom of a race\n      condition where the rehydrate action may overwrite the previously affected state. Consider running these actions\n      after rehydration:\n    ', preRehydrateActions.length);
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

/***/ },
/* 11 */
/***/ function(module, exports) {

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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = persistStore;
	
	var _constants = __webpack_require__(1);
	
	var _getStoredState = __webpack_require__(5);
	
	var _getStoredState2 = _interopRequireDefault(_getStoredState);
	
	var _createPersistor = __webpack_require__(4);
	
	var _createPersistor2 = _interopRequireDefault(_createPersistor);
	
	var _omit = __webpack_require__(36);
	
	var _omit2 = _interopRequireDefault(_omit);
	
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
	  if ((undefined) !== 'production' && config.skipRestore) console.warn('redux-persist: config.skipRestore has been deprecated. If you want to skip restoration use `createPersistor` instead');
	
	  var purgeKeys = null;
	
	  // create and pause persistor
	  var persistor = (0, _createPersistor2.default)(store, config);
	  persistor.pause();
	
	  // restore
	  if (shouldRestore) {
	    genericSetImmediate(function () {
	      (0, _getStoredState2.default)(config, function (err, restoredState) {
	        // do not persist state for purgeKeys
	        restoredState = purgeKeys ? purgeKeys === '*' ? {} : (0, _omit2.default)(restoredState, purgeKeys) : restoredState;
	
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
	      persistor.purge(keys);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = isStatePlainEnough;
	
	var _isPlainObject = __webpack_require__(35);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isStatePlainEnough(a) {
	  // isPlainObject + duck type not immutable
	  if (!a) return false;
	  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object') return false;
	  if (typeof a.mergeDeep === 'function') return false;
	  if (!(0, _isPlainObject2.default)(a)) return false;
	  return true;
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

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


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(33);
	
	/**
	 * Casts `value` as an array if it's not one.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.4.0
	 * @category Lang
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast array.
	 * @example
	 *
	 * _.castArray(1);
	 * // => [1]
	 *
	 * _.castArray({ 'a': 1 });
	 * // => [{ 'a': 1 }]
	 *
	 * _.castArray('abc');
	 * // => ['abc']
	 *
	 * _.castArray(null);
	 * // => [null]
	 *
	 * _.castArray(undefined);
	 * // => [undefined]
	 *
	 * _.castArray();
	 * // => []
	 *
	 * var array = [1, 2, 3];
	 * console.log(_.castArray(array) === array);
	 * // => true
	 */
	function castArray() {
	  if (!arguments.length) {
	    return [];
	  }
	  var value = arguments[0];
	  return isArray(value) ? value : [value];
	}
	
	module.exports = castArray;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(8);
	
	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array == null ? 0 : array.length;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}
	
	module.exports = arrayIncludes;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array == null ? 0 : array.length;
	
	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arrayIncludesWith;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(25);
	
	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}
	
	module.exports = baseAssignValue;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(15),
	    arrayIncludes = __webpack_require__(16),
	    arrayIncludesWith = __webpack_require__(17),
	    arrayMap = __webpack_require__(7),
	    baseUnary = __webpack_require__(23),
	    cacheHas = __webpack_require__(24);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of methods like `_.difference` without support
	 * for excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;
	
	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  }
	  else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee == null ? value : iteratee(value);
	
	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseDifference;


/***/ },
/* 20 */
/***/ function(module, exports) {

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


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var basePickBy = __webpack_require__(22);
	
	/**
	 * The base implementation of `_.pick` without support for individual
	 * property identifiers.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick.
	 * @returns {Object} Returns the new object.
	 */
	function basePick(object, props) {
	  object = Object(object);
	  return basePickBy(object, props, function(value, key) {
	    return key in object;
	  });
	}
	
	module.exports = basePick;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(18);
	
	/**
	 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick from.
	 * @param {Function} predicate The function invoked per property.
	 * @returns {Object} Returns the new object.
	 */
	function basePickBy(object, props, predicate) {
	  var index = -1,
	      length = props.length,
	      result = {};
	
	  while (++index < length) {
	    var key = props[index],
	        value = object[key];
	
	    if (predicate(value, key)) {
	      baseAssignValue(result, key, value);
	    }
	  }
	  return result;
	}
	
	module.exports = basePickBy;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
	module.exports = baseUnary;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(8);
	
	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array == null ? 0 : array.length;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}
	
	module.exports = arrayIncludes;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(28);
	
	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());
	
	module.exports = defineProperty;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = nativeKeysIn;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	module.exports = getValue;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(30);
	
	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);
	
	module.exports = getPrototype;


/***/ },
/* 30 */
/***/ function(module, exports) {

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


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 34 */
/***/ function(module, exports) {

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


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(20),
	    getPrototype = __webpack_require__(29),
	    isObjectLike = __webpack_require__(34);
	
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


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(7),
	    baseDifference = __webpack_require__(19),
	    basePick = __webpack_require__(21),
	    flatRest = __webpack_require__(26),
	    getAllKeysIn = __webpack_require__(27),
	    toKey = __webpack_require__(31);
	
	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable string keyed properties of `object` that are
	 * not omitted.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property identifiers to omit.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.omit(object, ['a', 'c']);
	 * // => { 'b': '2' }
	 */
	var omit = flatRest(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  props = arrayMap(props, toKey);
	  return basePick(object, baseDifference(getAllKeysIn(object), props));
	});
	
	module.exports = omit;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=redux-persist.js.map