/*!
 * MinDB (version 0.1.17) - Database on JavaScript
 * 
 * Will Wen Gunn(iwillwen) and other contributors
 * 
 * @license MIT-license
 * @copyright 2012-2015 iwillwen(willwengunn@gmail.com)
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("min", [], factory);
	else if(typeof exports === 'object')
		exports["min"] = factory();
	else
		root["min"] = factory();
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
	
	module.exports = __webpack_require__(1).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {'use strict';
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(5);
	
	var _utils = __webpack_require__(24);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _events = __webpack_require__(25);
	
	var _mix = __webpack_require__(26);
	
	var _mix2 = _interopRequireDefault(_mix);
	
	var _hash = __webpack_require__(27);
	
	var _hash2 = _interopRequireDefault(_hash);
	
	var _list = __webpack_require__(28);
	
	var _list2 = _interopRequireDefault(_list);
	
	var _set = __webpack_require__(29);
	
	var _set2 = _interopRequireDefault(_set);
	
	var _zset = __webpack_require__(30);
	
	var _zset2 = _interopRequireDefault(_zset);
	
	var _mise = __webpack_require__(31);
	
	var _mise2 = _interopRequireDefault(_mise);
	
	var _stores = __webpack_require__(32);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var noop = _utils2.default.noop;
	
	var min = {};
	exports.default = min;
	
	_utils2.default.extend(min, _events.EventEmitter.prototype);
	min.EventEmitter = _events.EventEmitter;
	min.Promise = Promise;
	
	min.memStore = _stores.memStore;
	min.localStore = _stores.localStore;
	
	var logLevels = ['info', 'warn', 'error'];
	
	min.logLevel = 'info';
	
	Promise.onPossiblyUnhandledRejection(function (err, promise) {
	  if (logLevels.indexOf(min.logLevel) < 1) {
	    console.error(err);
	  }
	});
	
	min.store = new _stores.localStore();
	
	var _keys = min._keys = {};
	var _keysTimer = null;
	var _types = {
	  0: 'mix',
	  1: 'hash',
	  2: 'list',
	  3: 'set',
	  4: 'zset' // Sorted Set
	};
	
	/**
	 * Fork a new MinDB object
	 * @return {Object} new min object
	 */
	min.fork = function () {
	  var rtn = {};
	
	  var keys = Object.getOwnPropertyNames(this);
	
	  for (var i = 0; i < keys.length; i++) {
	    var prop = keys[i];
	    if (this.hasOwnProperty(prop)) {
	      rtn[prop] = this[prop];
	    }
	  }
	
	  return rtn;
	};
	
	/*********
	** Keys **
	*********/
	
	/**
	 * Delete a key
	 * @param  {String}   key      Key
	 * @param  {Function} callback Callback
	 * @return {Promise}           Promise Object
	 */
	min.del = function (key) {
	  var _this = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  // Promise Object
	  var promise = new Promise(function (resolve, reject) {
	
	    // Store
	    var store = _this.store;
	
	    // Key prefix
	    var $key = 'min-' + key;
	
	    if (store.async) {
	      // Async Store Operating
	
	      var load = function load() {
	        // Value processing
	        store.remove($key, function (err) {
	          if (err) {
	            // Error!
	            reject(err);
	            return callback(err);
	          }
	
	          delete _this._keys[key];
	
	          // Done
	          resolve(key);
	          callback(null, key);
	        });
	      };
	
	      if (store.ready) {
	        load();
	      } else {
	        store.on('ready', load);
	      }
	    } else {
	      try {
	        store.remove($key);
	
	        delete _this._keys[key];
	
	        // Done
	        resolve(key);
	        callback(null, key);
	      } catch (err) {
	        // Error!
	        reject(err);
	        callback(err);
	      }
	    }
	  });
	
	  promise.then(function () {
	    _this.emit('del', key);
	    if (_keysTimer) {
	      clearTimeout(_keysTimer);
	    }
	
	    _keysTimer = setTimeout(_this.save.bind(_this), 1000);
	  });
	
	  return promise;
	};
	
	/**
	 * Check a key is exists or not
	 * @param  {String}   key      Key
	 * @param  {Function} callback Callback
	 * @return {Promise}           Promise Object
	 */
	min.exists = function (key) {
	  var _this2 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  // Promise Object
	  return new Promise(function (resolve) {
	    _this2.get(key).then(function (value) {
	      resolve(true);
	      callback(null, true);
	    }).catch(function (err) {
	      resolve(false);
	      return callback(null, false);
	    });
	  });
	};
	
	/**
	 * Rename a old key
	 * @param  {String}   key      the old key
	 * @param  {String}   newKey   the new key
	 * @param  {Function} callback Callback
	 * @return {Promise}           Promise Object
	 */
	min.renamenx = function (key, newKey) {
	  var _this3 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  // Promise object
	  var promise = new Promise(function (resolve, reject) {
	
	    try {
	      (function () {
	        // Error handle
	        var reject = function reject(err) {
	          reject(err);
	          callback(err);
	        };
	
	        var type = null;
	        var value = null;
	
	        _this3.exists(key).then(function (exists) {
	          if (!exists) {
	            var err = new Error('no such key');
	
	            reject(err);
	          } else {
	            return _this3.get(key);
	          }
	        }).then(function (_value) {
	          type = _this3._keys[key];
	          value = _value;
	
	          return _this3.del(key);
	        }).then(function (_) {
	          return _this3.set(newKey, value, callback);
	        }).then(function (_) {
	          _this3._keys[newKey] = type;
	          resolve('OK');
	          callback(null, 'OK');
	        }, reject);
	      })();
	    } catch (err) {
	      reject(err);
	    }
	  });
	
	  promise.then(function (_) {
	    _this3.emit('rename', key, newKey);
	    if (_keysTimer) {
	      clearTimeout(_keysTimer);
	    }
	
	    _keysTimer = setTimeout(_this3.save.bind(_this3), 5 * 1000);
	  });
	
	  return promise;
	};
	
	/**
	 * Rename a old key when the old key is not equal to the new key
	 * and the old key is exiest.
	 * @param  {String}   key      the old key
	 * @param  {String}   newKey   the new key
	 * @param  {Function} callback Callback
	 * @return {Promise}           Promise Object
	 */
	min.rename = function (key, newKey) {
	  var _this4 = this,
	      _arguments = arguments;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  // Promise object
	  var promise = new Promise(function (resolve, reject) {
	
	    // Error handle
	    var _reject = function _reject(err) {
	      reject(err);
	      callback(err);
	    };
	
	    if (key == newKey) {
	      // The origin key is equal to the new key
	      reject(new Error('The key is equal to the new key.'));
	    } else {
	      _this4.renamenx.apply(_this4, _arguments).then(resolve).catch(_reject);
	    }
	  });
	
	  promise.then(function (_) {
	    _this4.emit('rename', key, newKey);
	    if (_keysTimer) {
	      clearTimeout(_keysTimer);
	    }
	
	    _keysTimer = setTimeout(_this4.save.bind(_this4), 5 * 1000);
	  });
	
	  return promise;
	};
	
	/**
	 * Return the keys which match by the pattern
	 * @param  {String}   pattern  Pattern
	 * @param  {Function} callback Callback
	 * @return {Promise}           Promise Object
	 */
	min.keys = function (pattern) {
	  var _this5 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  // Promise object
	  return new Promise(function (resolve) {
	
	    // Stored keys
	    var keys = Object.keys(_this5._keys);
	
	    // Filter
	    var filter = new RegExp(pattern.replace('?', '(.)').replace('*', '(.*)'));
	
	    var ret = [];
	
	    for (var i = 0; i < keys.length; i++) {
	      if (keys[i].match(filter)) {
	        ret.push(keys[i]);
	      }
	    }
	
	    // Done
	    resolve(ret);
	    callback(null, ret);
	  });
	};
	
	/**
	 * Return a key randomly
	 * @param  {Function} callback Callback
	 * @return {Promise}           Promise Object
	 */
	min.randomkey = function () {
	  var _this6 = this;
	
	  var callback = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];
	
	  // Promise Object
	  return new Promise(function (resolve) {
	
	    // Stored keys
	    var keys = Object.keys(_this6._keys);
	
	    // Random Key
	    var index = Math.round(Math.random() * (keys.length - 1));
	
	    // Done
	    var $key = keys[index];
	    resolve($key);
	    callback(null, $key);
	  });
	};
	
	/**
	 * Return the value's type of the key
	 * @param  {String}   key      the key
	 * @param  {Function} callback Callback
	 * @return {Promise}           Promise Object
	 */
	min.type = function (key) {
	  var _this7 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  // Promise Object
	  return new Promise(function (resolve) {
	
	    if (_this7._keys.hasOwnProperty(key)) {
	      resolve(_types[_this7._keys[key]]);
	      callback(null, callback);
	    } else {
	      resolve(null);
	      callback(null, null);
	    }
	  });
	};
	
	/**
	 * Remove all keys in the db
	 * @param  {Function} callback Callback
	 * @return {Object}            min
	 */
	min.empty = function () {
	  var _this8 = this;
	
	  var callback = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];
	
	  var keys = Object.keys(this._keys);
	  var removeds = 0;
	
	  var promise = new Promise(function (resolve) {
	
	    var loop = function loop(key) {
	      if (key) {
	        _this8.del(key, function (err) {
	          if (!err) {
	            removeds++;
	          }
	
	          loop(keys.shift());
	        });
	      } else {
	        resolve(removeds);
	        callback(null, removeds);
	      }
	    };
	
	    loop(keys.shift());
	  });
	  promise.then(function (len) {
	    _this8.emit('empty', len);
	    if (_keysTimer) {
	      clearTimeout(_keysTimer);
	    }
	
	    _keysTimer = setTimeout(_this8.save.bind(_this8), 5 * 1000);
	  });
	
	  return promise;
	};
	
	/**
	 * Save the dataset to the Store Interface manually
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.save = function () {
	  var _this9 = this;
	
	  var callback = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this9.set('min_keys', JSON.stringify(_this9._keys)).then(function (_) {
	      return _this9.dump();
	    }).then(function (_ref) {
	      var _ref2 = _slicedToArray(_ref, 2);
	
	      var dump = _ref2[0];
	      var strResult = _ref2[1];
	
	      resolve([dump, strResult]);
	      callback(dump, strResult);
	    }, function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (_ref3) {
	    var _ref4 = _slicedToArray(_ref3, 2);
	
	    var dump = _ref4[0];
	    var strResult = _ref4[1];
	
	    _this9.emit('save', dump, strResult);
	  });
	
	  return promise;
	};
	
	/**
	 * Return the dataset of MinDB
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.dump = function () {
	  var _this10 = this;
	
	  var callback = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];
	
	  var loop = null;
	  return new Promise(function (resolve, reject) {
	    var rtn = {};
	
	    _this10.keys('*', function (err, keys) {
	      if (err) {
	        reject(err);
	        return callback(err);
	      }
	
	      (loop = function (key) {
	        if (key) {
	          _this10.get(key).then(function (value) {
	            rtn[key] = value;
	            loop(keys.shift());
	          }, function (err) {
	            reject(err);
	            callback(err);
	          });
	        } else {
	          var strResult = JSON.stringify(rtn);
	          resolve([rtn, strResult]);
	          callback(null, rtn, strResult);
	        }
	      })(keys.shift());
	    });
	  });
	};
	
	/**
	 * Restore the dataset to MinDB
	 * @param  {Object}   dump     dump object
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.restore = function (dump) {
	  var _this11 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    var keys = Object.keys(dump);
	
	    var done = function done(_) {
	      _this11.exists('min_keys').then(function (exists) {
	        if (exists) {
	          return _this11.get('min_keys');
	        } else {
	          resolve();
	          callback();
	        }
	      }).then(function (keys) {
	        _keys = JSON.parse(keys);
	
	        resolve();
	        callback();
	      }).catch(function (err) {
	        promise.rejeect(err);
	        callback(err);
	      });
	    };
	
	    var loop = function loop(key) {
	      if (key) {
	        _this11.set(key, dump[key]).then(function (_) {
	          loop(keys.shift());
	        }, function (err) {
	          reject(err);
	          callback(err);
	        });
	      } else {
	        done();
	      }
	    };
	
	    loop(keys.shift());
	  });
	
	  promise.then(function (_) {
	    _this11.save(function (_) {
	      _this11.emit('restore');
	    });
	  });
	};
	
	var watchers = {};
	
	/**
	 * Watch the command actions of the key
	 * @param  {String}   key      key to watch
	 * @param  {String}   command  command to watch
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.watch = function (key, command, callback) {
	  var _this12 = this;
	
	  if ('undefined' === typeof callback && command.apply) {
	    callback = command;
	    command = 'set';
	  }
	
	  var watcherId = Math.random().toString(32).substr(2);
	
	  if (!watchers[key]) watchers[key] = {};
	
	  watchers[key][watcherId] = function (_key) {
	    var _callback;
	
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }
	
	    if (_key !== key) return;
	    (_callback = callback).call.apply(_callback, [_this12].concat(args));
	  };
	
	  watchers[key][watcherId].command = command;
	
	  this.on(command, watchers[key][watcherId]);
	
	  return watcherId;
	};
	
	/**
	 * Unbind the watcher
	 * @param  {String} key       key to unwatch
	 * @param  {String} watcherId watcher's id
	 * @param  {String} command   command
	 */
	min.unwatch = function (key, command, watcherId) {
	  if ('undefined' === typeof watcherId && !!command) {
	    watcherId = command;
	    command = 'set';
	  }
	
	  this.removeListener(command, watchers[key][watcherId]);
	};
	
	/**
	 * Unbind all the watcher of the key
	 * @param  {String} key key to unwatch
	 */
	min.unwatchForKey = function (key) {
	  var watchersList = watchers[key];
	
	  for (var id in watchersList) {
	    var watcher = watchersList[id];
	    this.removeListener(watcher.command, watcher);
	  }
	};
	
	// Methods
	_utils2.default.extend(min, _hash2.default);
	_utils2.default.extend(min, _list2.default);
	_utils2.default.extend(min, _set2.default);
	_utils2.default.extend(min, _zset2.default);
	_utils2.default.extend(min, _mise2.default);
	_utils2.default.extend(min, _mix2.default);
	
	// Apply
	var handle = function handle(err, value) {
	  if (err || !value) {
	    min._keys = {};
	    return;
	  }
	
	  try {
	    min._keys = JSON.parse(keys);
	  } catch (err) {
	    min._keys = {};
	  }
	};
	if (min.store.async) {
	  min.store.get('min-min_keys', handle);
	} else {
	  try {
	    var val = min.store.get('min-min_keys');
	    handle(null, val);
	  } catch (err) {
	    handle(err);
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, Promise, global, setImmediate) {/* @preserve
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2013-2015 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	/**
	 * bluebird build version 3.4.6
	 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
	*/
	!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Promise=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise) {
	var SomePromiseArray = Promise._SomePromiseArray;
	function any(promises) {
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    ret.setHowMany(1);
	    ret.setUnwrap();
	    ret.init();
	    return promise;
	}
	
	Promise.any = function (promises) {
	    return any(promises);
	};
	
	Promise.prototype.any = function () {
	    return any(this);
	};
	
	};
	
	},{}],2:[function(_dereq_,module,exports){
	"use strict";
	var firstLineError;
	try {throw new Error(); } catch (e) {firstLineError = e;}
	var schedule = _dereq_("./schedule");
	var Queue = _dereq_("./queue");
	var util = _dereq_("./util");
	
	function Async() {
	    this._customScheduler = false;
	    this._isTickUsed = false;
	    this._lateQueue = new Queue(16);
	    this._normalQueue = new Queue(16);
	    this._haveDrainedQueues = false;
	    this._trampolineEnabled = true;
	    var self = this;
	    this.drainQueues = function () {
	        self._drainQueues();
	    };
	    this._schedule = schedule;
	}
	
	Async.prototype.setScheduler = function(fn) {
	    var prev = this._schedule;
	    this._schedule = fn;
	    this._customScheduler = true;
	    return prev;
	};
	
	Async.prototype.hasCustomScheduler = function() {
	    return this._customScheduler;
	};
	
	Async.prototype.enableTrampoline = function() {
	    this._trampolineEnabled = true;
	};
	
	Async.prototype.disableTrampolineIfNecessary = function() {
	    if (util.hasDevTools) {
	        this._trampolineEnabled = false;
	    }
	};
	
	Async.prototype.haveItemsQueued = function () {
	    return this._isTickUsed || this._haveDrainedQueues;
	};
	
	
	Async.prototype.fatalError = function(e, isNode) {
	    if (isNode) {
	        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
	            "\n");
	        process.exit(2);
	    } else {
	        this.throwLater(e);
	    }
	};
	
	Async.prototype.throwLater = function(fn, arg) {
	    if (arguments.length === 1) {
	        arg = fn;
	        fn = function () { throw arg; };
	    }
	    if (typeof setTimeout !== "undefined") {
	        setTimeout(function() {
	            fn(arg);
	        }, 0);
	    } else try {
	        this._schedule(function() {
	            fn(arg);
	        });
	    } catch (e) {
	        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	};
	
	function AsyncInvokeLater(fn, receiver, arg) {
	    this._lateQueue.push(fn, receiver, arg);
	    this._queueTick();
	}
	
	function AsyncInvoke(fn, receiver, arg) {
	    this._normalQueue.push(fn, receiver, arg);
	    this._queueTick();
	}
	
	function AsyncSettlePromises(promise) {
	    this._normalQueue._pushOne(promise);
	    this._queueTick();
	}
	
	if (!util.hasDevTools) {
	    Async.prototype.invokeLater = AsyncInvokeLater;
	    Async.prototype.invoke = AsyncInvoke;
	    Async.prototype.settlePromises = AsyncSettlePromises;
	} else {
	    Async.prototype.invokeLater = function (fn, receiver, arg) {
	        if (this._trampolineEnabled) {
	            AsyncInvokeLater.call(this, fn, receiver, arg);
	        } else {
	            this._schedule(function() {
	                setTimeout(function() {
	                    fn.call(receiver, arg);
	                }, 100);
	            });
	        }
	    };
	
	    Async.prototype.invoke = function (fn, receiver, arg) {
	        if (this._trampolineEnabled) {
	            AsyncInvoke.call(this, fn, receiver, arg);
	        } else {
	            this._schedule(function() {
	                fn.call(receiver, arg);
	            });
	        }
	    };
	
	    Async.prototype.settlePromises = function(promise) {
	        if (this._trampolineEnabled) {
	            AsyncSettlePromises.call(this, promise);
	        } else {
	            this._schedule(function() {
	                promise._settlePromises();
	            });
	        }
	    };
	}
	
	Async.prototype.invokeFirst = function (fn, receiver, arg) {
	    this._normalQueue.unshift(fn, receiver, arg);
	    this._queueTick();
	};
	
	Async.prototype._drainQueue = function(queue) {
	    while (queue.length() > 0) {
	        var fn = queue.shift();
	        if (typeof fn !== "function") {
	            fn._settlePromises();
	            continue;
	        }
	        var receiver = queue.shift();
	        var arg = queue.shift();
	        fn.call(receiver, arg);
	    }
	};
	
	Async.prototype._drainQueues = function () {
	    this._drainQueue(this._normalQueue);
	    this._reset();
	    this._haveDrainedQueues = true;
	    this._drainQueue(this._lateQueue);
	};
	
	Async.prototype._queueTick = function () {
	    if (!this._isTickUsed) {
	        this._isTickUsed = true;
	        this._schedule(this.drainQueues);
	    }
	};
	
	Async.prototype._reset = function () {
	    this._isTickUsed = false;
	};
	
	module.exports = Async;
	module.exports.firstLineError = firstLineError;
	
	},{"./queue":26,"./schedule":29,"./util":36}],3:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
	var calledBind = false;
	var rejectThis = function(_, e) {
	    this._reject(e);
	};
	
	var targetRejected = function(e, context) {
	    context.promiseRejectionQueued = true;
	    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
	};
	
	var bindingResolved = function(thisArg, context) {
	    if (((this._bitField & 50397184) === 0)) {
	        this._resolveCallback(context.target);
	    }
	};
	
	var bindingRejected = function(e, context) {
	    if (!context.promiseRejectionQueued) this._reject(e);
	};
	
	Promise.prototype.bind = function (thisArg) {
	    if (!calledBind) {
	        calledBind = true;
	        Promise.prototype._propagateFrom = debug.propagateFromFunction();
	        Promise.prototype._boundValue = debug.boundValueFunction();
	    }
	    var maybePromise = tryConvertToPromise(thisArg);
	    var ret = new Promise(INTERNAL);
	    ret._propagateFrom(this, 1);
	    var target = this._target();
	    ret._setBoundTo(maybePromise);
	    if (maybePromise instanceof Promise) {
	        var context = {
	            promiseRejectionQueued: false,
	            promise: ret,
	            target: target,
	            bindingPromise: maybePromise
	        };
	        target._then(INTERNAL, targetRejected, undefined, ret, context);
	        maybePromise._then(
	            bindingResolved, bindingRejected, undefined, ret, context);
	        ret._setOnCancel(maybePromise);
	    } else {
	        ret._resolveCallback(target);
	    }
	    return ret;
	};
	
	Promise.prototype._setBoundTo = function (obj) {
	    if (obj !== undefined) {
	        this._bitField = this._bitField | 2097152;
	        this._boundTo = obj;
	    } else {
	        this._bitField = this._bitField & (~2097152);
	    }
	};
	
	Promise.prototype._isBound = function () {
	    return (this._bitField & 2097152) === 2097152;
	};
	
	Promise.bind = function (thisArg, value) {
	    return Promise.resolve(value).bind(thisArg);
	};
	};
	
	},{}],4:[function(_dereq_,module,exports){
	"use strict";
	var old;
	if (typeof Promise !== "undefined") old = Promise;
	function noConflict() {
	    try { if (Promise === bluebird) Promise = old; }
	    catch (e) {}
	    return bluebird;
	}
	var bluebird = _dereq_("./promise")();
	bluebird.noConflict = noConflict;
	module.exports = bluebird;
	
	},{"./promise":22}],5:[function(_dereq_,module,exports){
	"use strict";
	var cr = Object.create;
	if (cr) {
	    var callerCache = cr(null);
	    var getterCache = cr(null);
	    callerCache[" size"] = getterCache[" size"] = 0;
	}
	
	module.exports = function(Promise) {
	var util = _dereq_("./util");
	var canEvaluate = util.canEvaluate;
	var isIdentifier = util.isIdentifier;
	
	var getMethodCaller;
	var getGetter;
	if (false) {
	var makeMethodCaller = function (methodName) {
	    return new Function("ensureMethod", "                                    \n\
	        return function(obj) {                                               \n\
	            'use strict'                                                     \n\
	            var len = this.length;                                           \n\
	            ensureMethod(obj, 'methodName');                                 \n\
	            switch(len) {                                                    \n\
	                case 1: return obj.methodName(this[0]);                      \n\
	                case 2: return obj.methodName(this[0], this[1]);             \n\
	                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
	                case 0: return obj.methodName();                             \n\
	                default:                                                     \n\
	                    return obj.methodName.apply(obj, this);                  \n\
	            }                                                                \n\
	        };                                                                   \n\
	        ".replace(/methodName/g, methodName))(ensureMethod);
	};
	
	var makeGetter = function (propertyName) {
	    return new Function("obj", "                                             \n\
	        'use strict';                                                        \n\
	        return obj.propertyName;                                             \n\
	        ".replace("propertyName", propertyName));
	};
	
	var getCompiled = function(name, compiler, cache) {
	    var ret = cache[name];
	    if (typeof ret !== "function") {
	        if (!isIdentifier(name)) {
	            return null;
	        }
	        ret = compiler(name);
	        cache[name] = ret;
	        cache[" size"]++;
	        if (cache[" size"] > 512) {
	            var keys = Object.keys(cache);
	            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
	            cache[" size"] = keys.length - 256;
	        }
	    }
	    return ret;
	};
	
	getMethodCaller = function(name) {
	    return getCompiled(name, makeMethodCaller, callerCache);
	};
	
	getGetter = function(name) {
	    return getCompiled(name, makeGetter, getterCache);
	};
	}
	
	function ensureMethod(obj, methodName) {
	    var fn;
	    if (obj != null) fn = obj[methodName];
	    if (typeof fn !== "function") {
	        var message = "Object " + util.classString(obj) + " has no method '" +
	            util.toString(methodName) + "'";
	        throw new Promise.TypeError(message);
	    }
	    return fn;
	}
	
	function caller(obj) {
	    var methodName = this.pop();
	    var fn = ensureMethod(obj, methodName);
	    return fn.apply(obj, this);
	}
	Promise.prototype.call = function (methodName) {
	    var args = [].slice.call(arguments, 1);;
	    if (false) {
	        if (canEvaluate) {
	            var maybeCaller = getMethodCaller(methodName);
	            if (maybeCaller !== null) {
	                return this._then(
	                    maybeCaller, undefined, undefined, args, undefined);
	            }
	        }
	    }
	    args.push(methodName);
	    return this._then(caller, undefined, undefined, args, undefined);
	};
	
	function namedGetter(obj) {
	    return obj[this];
	}
	function indexedGetter(obj) {
	    var index = +this;
	    if (index < 0) index = Math.max(0, index + obj.length);
	    return obj[index];
	}
	Promise.prototype.get = function (propertyName) {
	    var isIndex = (typeof propertyName === "number");
	    var getter;
	    if (!isIndex) {
	        if (canEvaluate) {
	            var maybeGetter = getGetter(propertyName);
	            getter = maybeGetter !== null ? maybeGetter : namedGetter;
	        } else {
	            getter = namedGetter;
	        }
	    } else {
	        getter = indexedGetter;
	    }
	    return this._then(getter, undefined, undefined, propertyName, undefined);
	};
	};
	
	},{"./util":36}],6:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise, PromiseArray, apiRejection, debug) {
	var util = _dereq_("./util");
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var async = Promise._async;
	
	Promise.prototype["break"] = Promise.prototype.cancel = function() {
	    if (!debug.cancellation()) return this._warn("cancellation is disabled");
	
	    var promise = this;
	    var child = promise;
	    while (promise._isCancellable()) {
	        if (!promise._cancelBy(child)) {
	            if (child._isFollowing()) {
	                child._followee().cancel();
	            } else {
	                child._cancelBranched();
	            }
	            break;
	        }
	
	        var parent = promise._cancellationParent;
	        if (parent == null || !parent._isCancellable()) {
	            if (promise._isFollowing()) {
	                promise._followee().cancel();
	            } else {
	                promise._cancelBranched();
	            }
	            break;
	        } else {
	            if (promise._isFollowing()) promise._followee().cancel();
	            promise._setWillBeCancelled();
	            child = promise;
	            promise = parent;
	        }
	    }
	};
	
	Promise.prototype._branchHasCancelled = function() {
	    this._branchesRemainingToCancel--;
	};
	
	Promise.prototype._enoughBranchesHaveCancelled = function() {
	    return this._branchesRemainingToCancel === undefined ||
	           this._branchesRemainingToCancel <= 0;
	};
	
	Promise.prototype._cancelBy = function(canceller) {
	    if (canceller === this) {
	        this._branchesRemainingToCancel = 0;
	        this._invokeOnCancel();
	        return true;
	    } else {
	        this._branchHasCancelled();
	        if (this._enoughBranchesHaveCancelled()) {
	            this._invokeOnCancel();
	            return true;
	        }
	    }
	    return false;
	};
	
	Promise.prototype._cancelBranched = function() {
	    if (this._enoughBranchesHaveCancelled()) {
	        this._cancel();
	    }
	};
	
	Promise.prototype._cancel = function() {
	    if (!this._isCancellable()) return;
	    this._setCancelled();
	    async.invoke(this._cancelPromises, this, undefined);
	};
	
	Promise.prototype._cancelPromises = function() {
	    if (this._length() > 0) this._settlePromises();
	};
	
	Promise.prototype._unsetOnCancel = function() {
	    this._onCancelField = undefined;
	};
	
	Promise.prototype._isCancellable = function() {
	    return this.isPending() && !this._isCancelled();
	};
	
	Promise.prototype.isCancellable = function() {
	    return this.isPending() && !this.isCancelled();
	};
	
	Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
	    if (util.isArray(onCancelCallback)) {
	        for (var i = 0; i < onCancelCallback.length; ++i) {
	            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
	        }
	    } else if (onCancelCallback !== undefined) {
	        if (typeof onCancelCallback === "function") {
	            if (!internalOnly) {
	                var e = tryCatch(onCancelCallback).call(this._boundValue());
	                if (e === errorObj) {
	                    this._attachExtraTrace(e.e);
	                    async.throwLater(e.e);
	                }
	            }
	        } else {
	            onCancelCallback._resultCancelled(this);
	        }
	    }
	};
	
	Promise.prototype._invokeOnCancel = function() {
	    var onCancelCallback = this._onCancel();
	    this._unsetOnCancel();
	    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
	};
	
	Promise.prototype._invokeInternalOnCancel = function() {
	    if (this._isCancellable()) {
	        this._doInvokeOnCancel(this._onCancel(), true);
	        this._unsetOnCancel();
	    }
	};
	
	Promise.prototype._resultCancelled = function() {
	    this.cancel();
	};
	
	};
	
	},{"./util":36}],7:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(NEXT_FILTER) {
	var util = _dereq_("./util");
	var getKeys = _dereq_("./es5").keys;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	
	function catchFilter(instances, cb, promise) {
	    return function(e) {
	        var boundTo = promise._boundValue();
	        predicateLoop: for (var i = 0; i < instances.length; ++i) {
	            var item = instances[i];
	
	            if (item === Error ||
	                (item != null && item.prototype instanceof Error)) {
	                if (e instanceof item) {
	                    return tryCatch(cb).call(boundTo, e);
	                }
	            } else if (typeof item === "function") {
	                var matchesPredicate = tryCatch(item).call(boundTo, e);
	                if (matchesPredicate === errorObj) {
	                    return matchesPredicate;
	                } else if (matchesPredicate) {
	                    return tryCatch(cb).call(boundTo, e);
	                }
	            } else if (util.isObject(e)) {
	                var keys = getKeys(item);
	                for (var j = 0; j < keys.length; ++j) {
	                    var key = keys[j];
	                    if (item[key] != e[key]) {
	                        continue predicateLoop;
	                    }
	                }
	                return tryCatch(cb).call(boundTo, e);
	            }
	        }
	        return NEXT_FILTER;
	    };
	}
	
	return catchFilter;
	};
	
	},{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise) {
	var longStackTraces = false;
	var contextStack = [];
	
	Promise.prototype._promiseCreated = function() {};
	Promise.prototype._pushContext = function() {};
	Promise.prototype._popContext = function() {return null;};
	Promise._peekContext = Promise.prototype._peekContext = function() {};
	
	function Context() {
	    this._trace = new Context.CapturedTrace(peekContext());
	}
	Context.prototype._pushContext = function () {
	    if (this._trace !== undefined) {
	        this._trace._promiseCreated = null;
	        contextStack.push(this._trace);
	    }
	};
	
	Context.prototype._popContext = function () {
	    if (this._trace !== undefined) {
	        var trace = contextStack.pop();
	        var ret = trace._promiseCreated;
	        trace._promiseCreated = null;
	        return ret;
	    }
	    return null;
	};
	
	function createContext() {
	    if (longStackTraces) return new Context();
	}
	
	function peekContext() {
	    var lastIndex = contextStack.length - 1;
	    if (lastIndex >= 0) {
	        return contextStack[lastIndex];
	    }
	    return undefined;
	}
	Context.CapturedTrace = null;
	Context.create = createContext;
	Context.deactivateLongStackTraces = function() {};
	Context.activateLongStackTraces = function() {
	    var Promise_pushContext = Promise.prototype._pushContext;
	    var Promise_popContext = Promise.prototype._popContext;
	    var Promise_PeekContext = Promise._peekContext;
	    var Promise_peekContext = Promise.prototype._peekContext;
	    var Promise_promiseCreated = Promise.prototype._promiseCreated;
	    Context.deactivateLongStackTraces = function() {
	        Promise.prototype._pushContext = Promise_pushContext;
	        Promise.prototype._popContext = Promise_popContext;
	        Promise._peekContext = Promise_PeekContext;
	        Promise.prototype._peekContext = Promise_peekContext;
	        Promise.prototype._promiseCreated = Promise_promiseCreated;
	        longStackTraces = false;
	    };
	    longStackTraces = true;
	    Promise.prototype._pushContext = Context.prototype._pushContext;
	    Promise.prototype._popContext = Context.prototype._popContext;
	    Promise._peekContext = Promise.prototype._peekContext = peekContext;
	    Promise.prototype._promiseCreated = function() {
	        var ctx = this._peekContext();
	        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
	    };
	};
	return Context;
	};
	
	},{}],9:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise, Context) {
	var getDomain = Promise._getDomain;
	var async = Promise._async;
	var Warning = _dereq_("./errors").Warning;
	var util = _dereq_("./util");
	var canAttachTrace = util.canAttachTrace;
	var unhandledRejectionHandled;
	var possiblyUnhandledRejection;
	var bluebirdFramePattern =
	    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
	var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
	var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
	var stackFramePattern = null;
	var formatStack = null;
	var indentStackFrames = false;
	var printWarning;
	var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
	                        (true ||
	                         util.env("BLUEBIRD_DEBUG") ||
	                         util.env("NODE_ENV") === "development"));
	
	var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
	    (debugging || util.env("BLUEBIRD_WARNINGS")));
	
	var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
	    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));
	
	var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
	    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
	
	Promise.prototype.suppressUnhandledRejections = function() {
	    var target = this._target();
	    target._bitField = ((target._bitField & (~1048576)) |
	                      524288);
	};
	
	Promise.prototype._ensurePossibleRejectionHandled = function () {
	    if ((this._bitField & 524288) !== 0) return;
	    this._setRejectionIsUnhandled();
	    async.invokeLater(this._notifyUnhandledRejection, this, undefined);
	};
	
	Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
	    fireRejectionEvent("rejectionHandled",
	                                  unhandledRejectionHandled, undefined, this);
	};
	
	Promise.prototype._setReturnedNonUndefined = function() {
	    this._bitField = this._bitField | 268435456;
	};
	
	Promise.prototype._returnedNonUndefined = function() {
	    return (this._bitField & 268435456) !== 0;
	};
	
	Promise.prototype._notifyUnhandledRejection = function () {
	    if (this._isRejectionUnhandled()) {
	        var reason = this._settledValue();
	        this._setUnhandledRejectionIsNotified();
	        fireRejectionEvent("unhandledRejection",
	                                      possiblyUnhandledRejection, reason, this);
	    }
	};
	
	Promise.prototype._setUnhandledRejectionIsNotified = function () {
	    this._bitField = this._bitField | 262144;
	};
	
	Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
	    this._bitField = this._bitField & (~262144);
	};
	
	Promise.prototype._isUnhandledRejectionNotified = function () {
	    return (this._bitField & 262144) > 0;
	};
	
	Promise.prototype._setRejectionIsUnhandled = function () {
	    this._bitField = this._bitField | 1048576;
	};
	
	Promise.prototype._unsetRejectionIsUnhandled = function () {
	    this._bitField = this._bitField & (~1048576);
	    if (this._isUnhandledRejectionNotified()) {
	        this._unsetUnhandledRejectionIsNotified();
	        this._notifyUnhandledRejectionIsHandled();
	    }
	};
	
	Promise.prototype._isRejectionUnhandled = function () {
	    return (this._bitField & 1048576) > 0;
	};
	
	Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
	    return warn(message, shouldUseOwnTrace, promise || this);
	};
	
	Promise.onPossiblyUnhandledRejection = function (fn) {
	    var domain = getDomain();
	    possiblyUnhandledRejection =
	        typeof fn === "function" ? (domain === null ?
	                                            fn : util.domainBind(domain, fn))
	                                 : undefined;
	};
	
	Promise.onUnhandledRejectionHandled = function (fn) {
	    var domain = getDomain();
	    unhandledRejectionHandled =
	        typeof fn === "function" ? (domain === null ?
	                                            fn : util.domainBind(domain, fn))
	                                 : undefined;
	};
	
	var disableLongStackTraces = function() {};
	Promise.longStackTraces = function () {
	    if (async.haveItemsQueued() && !config.longStackTraces) {
	        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    if (!config.longStackTraces && longStackTracesIsSupported()) {
	        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
	        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
	        config.longStackTraces = true;
	        disableLongStackTraces = function() {
	            if (async.haveItemsQueued() && !config.longStackTraces) {
	                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	            }
	            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
	            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
	            Context.deactivateLongStackTraces();
	            async.enableTrampoline();
	            config.longStackTraces = false;
	        };
	        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
	        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
	        Context.activateLongStackTraces();
	        async.disableTrampolineIfNecessary();
	    }
	};
	
	Promise.hasLongStackTraces = function () {
	    return config.longStackTraces && longStackTracesIsSupported();
	};
	
	var fireDomEvent = (function() {
	    try {
	        if (typeof CustomEvent === "function") {
	            var event = new CustomEvent("CustomEvent");
	            util.global.dispatchEvent(event);
	            return function(name, event) {
	                var domEvent = new CustomEvent(name.toLowerCase(), {
	                    detail: event,
	                    cancelable: true
	                });
	                return !util.global.dispatchEvent(domEvent);
	            };
	        } else if (typeof Event === "function") {
	            var event = new Event("CustomEvent");
	            util.global.dispatchEvent(event);
	            return function(name, event) {
	                var domEvent = new Event(name.toLowerCase(), {
	                    cancelable: true
	                });
	                domEvent.detail = event;
	                return !util.global.dispatchEvent(domEvent);
	            };
	        } else {
	            var event = document.createEvent("CustomEvent");
	            event.initCustomEvent("testingtheevent", false, true, {});
	            util.global.dispatchEvent(event);
	            return function(name, event) {
	                var domEvent = document.createEvent("CustomEvent");
	                domEvent.initCustomEvent(name.toLowerCase(), false, true,
	                    event);
	                return !util.global.dispatchEvent(domEvent);
	            };
	        }
	    } catch (e) {}
	    return function() {
	        return false;
	    };
	})();
	
	var fireGlobalEvent = (function() {
	    if (util.isNode) {
	        return function() {
	            return process.emit.apply(process, arguments);
	        };
	    } else {
	        if (!util.global) {
	            return function() {
	                return false;
	            };
	        }
	        return function(name) {
	            var methodName = "on" + name.toLowerCase();
	            var method = util.global[methodName];
	            if (!method) return false;
	            method.apply(util.global, [].slice.call(arguments, 1));
	            return true;
	        };
	    }
	})();
	
	function generatePromiseLifecycleEventObject(name, promise) {
	    return {promise: promise};
	}
	
	var eventToObjectGenerator = {
	    promiseCreated: generatePromiseLifecycleEventObject,
	    promiseFulfilled: generatePromiseLifecycleEventObject,
	    promiseRejected: generatePromiseLifecycleEventObject,
	    promiseResolved: generatePromiseLifecycleEventObject,
	    promiseCancelled: generatePromiseLifecycleEventObject,
	    promiseChained: function(name, promise, child) {
	        return {promise: promise, child: child};
	    },
	    warning: function(name, warning) {
	        return {warning: warning};
	    },
	    unhandledRejection: function (name, reason, promise) {
	        return {reason: reason, promise: promise};
	    },
	    rejectionHandled: generatePromiseLifecycleEventObject
	};
	
	var activeFireEvent = function (name) {
	    var globalEventFired = false;
	    try {
	        globalEventFired = fireGlobalEvent.apply(null, arguments);
	    } catch (e) {
	        async.throwLater(e);
	        globalEventFired = true;
	    }
	
	    var domEventFired = false;
	    try {
	        domEventFired = fireDomEvent(name,
	                    eventToObjectGenerator[name].apply(null, arguments));
	    } catch (e) {
	        async.throwLater(e);
	        domEventFired = true;
	    }
	
	    return domEventFired || globalEventFired;
	};
	
	Promise.config = function(opts) {
	    opts = Object(opts);
	    if ("longStackTraces" in opts) {
	        if (opts.longStackTraces) {
	            Promise.longStackTraces();
	        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
	            disableLongStackTraces();
	        }
	    }
	    if ("warnings" in opts) {
	        var warningsOption = opts.warnings;
	        config.warnings = !!warningsOption;
	        wForgottenReturn = config.warnings;
	
	        if (util.isObject(warningsOption)) {
	            if ("wForgottenReturn" in warningsOption) {
	                wForgottenReturn = !!warningsOption.wForgottenReturn;
	            }
	        }
	    }
	    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
	        if (async.haveItemsQueued()) {
	            throw new Error(
	                "cannot enable cancellation after promises are in use");
	        }
	        Promise.prototype._clearCancellationData =
	            cancellationClearCancellationData;
	        Promise.prototype._propagateFrom = cancellationPropagateFrom;
	        Promise.prototype._onCancel = cancellationOnCancel;
	        Promise.prototype._setOnCancel = cancellationSetOnCancel;
	        Promise.prototype._attachCancellationCallback =
	            cancellationAttachCancellationCallback;
	        Promise.prototype._execute = cancellationExecute;
	        propagateFromFunction = cancellationPropagateFrom;
	        config.cancellation = true;
	    }
	    if ("monitoring" in opts) {
	        if (opts.monitoring && !config.monitoring) {
	            config.monitoring = true;
	            Promise.prototype._fireEvent = activeFireEvent;
	        } else if (!opts.monitoring && config.monitoring) {
	            config.monitoring = false;
	            Promise.prototype._fireEvent = defaultFireEvent;
	        }
	    }
	};
	
	function defaultFireEvent() { return false; }
	
	Promise.prototype._fireEvent = defaultFireEvent;
	Promise.prototype._execute = function(executor, resolve, reject) {
	    try {
	        executor(resolve, reject);
	    } catch (e) {
	        return e;
	    }
	};
	Promise.prototype._onCancel = function () {};
	Promise.prototype._setOnCancel = function (handler) { ; };
	Promise.prototype._attachCancellationCallback = function(onCancel) {
	    ;
	};
	Promise.prototype._captureStackTrace = function () {};
	Promise.prototype._attachExtraTrace = function () {};
	Promise.prototype._clearCancellationData = function() {};
	Promise.prototype._propagateFrom = function (parent, flags) {
	    ;
	    ;
	};
	
	function cancellationExecute(executor, resolve, reject) {
	    var promise = this;
	    try {
	        executor(resolve, reject, function(onCancel) {
	            if (typeof onCancel !== "function") {
	                throw new TypeError("onCancel must be a function, got: " +
	                                    util.toString(onCancel));
	            }
	            promise._attachCancellationCallback(onCancel);
	        });
	    } catch (e) {
	        return e;
	    }
	}
	
	function cancellationAttachCancellationCallback(onCancel) {
	    if (!this._isCancellable()) return this;
	
	    var previousOnCancel = this._onCancel();
	    if (previousOnCancel !== undefined) {
	        if (util.isArray(previousOnCancel)) {
	            previousOnCancel.push(onCancel);
	        } else {
	            this._setOnCancel([previousOnCancel, onCancel]);
	        }
	    } else {
	        this._setOnCancel(onCancel);
	    }
	}
	
	function cancellationOnCancel() {
	    return this._onCancelField;
	}
	
	function cancellationSetOnCancel(onCancel) {
	    this._onCancelField = onCancel;
	}
	
	function cancellationClearCancellationData() {
	    this._cancellationParent = undefined;
	    this._onCancelField = undefined;
	}
	
	function cancellationPropagateFrom(parent, flags) {
	    if ((flags & 1) !== 0) {
	        this._cancellationParent = parent;
	        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
	        if (branchesRemainingToCancel === undefined) {
	            branchesRemainingToCancel = 0;
	        }
	        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
	    }
	    if ((flags & 2) !== 0 && parent._isBound()) {
	        this._setBoundTo(parent._boundTo);
	    }
	}
	
	function bindingPropagateFrom(parent, flags) {
	    if ((flags & 2) !== 0 && parent._isBound()) {
	        this._setBoundTo(parent._boundTo);
	    }
	}
	var propagateFromFunction = bindingPropagateFrom;
	
	function boundValueFunction() {
	    var ret = this._boundTo;
	    if (ret !== undefined) {
	        if (ret instanceof Promise) {
	            if (ret.isFulfilled()) {
	                return ret.value();
	            } else {
	                return undefined;
	            }
	        }
	    }
	    return ret;
	}
	
	function longStackTracesCaptureStackTrace() {
	    this._trace = new CapturedTrace(this._peekContext());
	}
	
	function longStackTracesAttachExtraTrace(error, ignoreSelf) {
	    if (canAttachTrace(error)) {
	        var trace = this._trace;
	        if (trace !== undefined) {
	            if (ignoreSelf) trace = trace._parent;
	        }
	        if (trace !== undefined) {
	            trace.attachExtraTrace(error);
	        } else if (!error.__stackCleaned__) {
	            var parsed = parseStackAndMessage(error);
	            util.notEnumerableProp(error, "stack",
	                parsed.message + "\n" + parsed.stack.join("\n"));
	            util.notEnumerableProp(error, "__stackCleaned__", true);
	        }
	    }
	}
	
	function checkForgottenReturns(returnValue, promiseCreated, name, promise,
	                               parent) {
	    if (returnValue === undefined && promiseCreated !== null &&
	        wForgottenReturn) {
	        if (parent !== undefined && parent._returnedNonUndefined()) return;
	        if ((promise._bitField & 65535) === 0) return;
	
	        if (name) name = name + " ";
	        var handlerLine = "";
	        var creatorLine = "";
	        if (promiseCreated._trace) {
	            var traceLines = promiseCreated._trace.stack.split("\n");
	            var stack = cleanStack(traceLines);
	            for (var i = stack.length - 1; i >= 0; --i) {
	                var line = stack[i];
	                if (!nodeFramePattern.test(line)) {
	                    var lineMatches = line.match(parseLinePattern);
	                    if (lineMatches) {
	                        handlerLine  = "at " + lineMatches[1] +
	                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
	                    }
	                    break;
	                }
	            }
	
	            if (stack.length > 0) {
	                var firstUserLine = stack[0];
	                for (var i = 0; i < traceLines.length; ++i) {
	
	                    if (traceLines[i] === firstUserLine) {
	                        if (i > 0) {
	                            creatorLine = "\n" + traceLines[i - 1];
	                        }
	                        break;
	                    }
	                }
	
	            }
	        }
	        var msg = "a promise was created in a " + name +
	            "handler " + handlerLine + "but was not returned from it, " +
	            "see http://goo.gl/rRqMUw" +
	            creatorLine;
	        promise._warn(msg, true, promiseCreated);
	    }
	}
	
	function deprecated(name, replacement) {
	    var message = name +
	        " is deprecated and will be removed in a future version.";
	    if (replacement) message += " Use " + replacement + " instead.";
	    return warn(message);
	}
	
	function warn(message, shouldUseOwnTrace, promise) {
	    if (!config.warnings) return;
	    var warning = new Warning(message);
	    var ctx;
	    if (shouldUseOwnTrace) {
	        promise._attachExtraTrace(warning);
	    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
	        ctx.attachExtraTrace(warning);
	    } else {
	        var parsed = parseStackAndMessage(warning);
	        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
	    }
	
	    if (!activeFireEvent("warning", warning)) {
	        formatAndLogError(warning, "", true);
	    }
	}
	
	function reconstructStack(message, stacks) {
	    for (var i = 0; i < stacks.length - 1; ++i) {
	        stacks[i].push("From previous event:");
	        stacks[i] = stacks[i].join("\n");
	    }
	    if (i < stacks.length) {
	        stacks[i] = stacks[i].join("\n");
	    }
	    return message + "\n" + stacks.join("\n");
	}
	
	function removeDuplicateOrEmptyJumps(stacks) {
	    for (var i = 0; i < stacks.length; ++i) {
	        if (stacks[i].length === 0 ||
	            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
	            stacks.splice(i, 1);
	            i--;
	        }
	    }
	}
	
	function removeCommonRoots(stacks) {
	    var current = stacks[0];
	    for (var i = 1; i < stacks.length; ++i) {
	        var prev = stacks[i];
	        var currentLastIndex = current.length - 1;
	        var currentLastLine = current[currentLastIndex];
	        var commonRootMeetPoint = -1;
	
	        for (var j = prev.length - 1; j >= 0; --j) {
	            if (prev[j] === currentLastLine) {
	                commonRootMeetPoint = j;
	                break;
	            }
	        }
	
	        for (var j = commonRootMeetPoint; j >= 0; --j) {
	            var line = prev[j];
	            if (current[currentLastIndex] === line) {
	                current.pop();
	                currentLastIndex--;
	            } else {
	                break;
	            }
	        }
	        current = prev;
	    }
	}
	
	function cleanStack(stack) {
	    var ret = [];
	    for (var i = 0; i < stack.length; ++i) {
	        var line = stack[i];
	        var isTraceLine = "    (No stack trace)" === line ||
	            stackFramePattern.test(line);
	        var isInternalFrame = isTraceLine && shouldIgnore(line);
	        if (isTraceLine && !isInternalFrame) {
	            if (indentStackFrames && line.charAt(0) !== " ") {
	                line = "    " + line;
	            }
	            ret.push(line);
	        }
	    }
	    return ret;
	}
	
	function stackFramesAsArray(error) {
	    var stack = error.stack.replace(/\s+$/g, "").split("\n");
	    for (var i = 0; i < stack.length; ++i) {
	        var line = stack[i];
	        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
	            break;
	        }
	    }
	    if (i > 0) {
	        stack = stack.slice(i);
	    }
	    return stack;
	}
	
	function parseStackAndMessage(error) {
	    var stack = error.stack;
	    var message = error.toString();
	    stack = typeof stack === "string" && stack.length > 0
	                ? stackFramesAsArray(error) : ["    (No stack trace)"];
	    return {
	        message: message,
	        stack: cleanStack(stack)
	    };
	}
	
	function formatAndLogError(error, title, isSoft) {
	    if (typeof console !== "undefined") {
	        var message;
	        if (util.isObject(error)) {
	            var stack = error.stack;
	            message = title + formatStack(stack, error);
	        } else {
	            message = title + String(error);
	        }
	        if (typeof printWarning === "function") {
	            printWarning(message, isSoft);
	        } else if (typeof console.log === "function" ||
	            typeof console.log === "object") {
	            console.log(message);
	        }
	    }
	}
	
	function fireRejectionEvent(name, localHandler, reason, promise) {
	    var localEventFired = false;
	    try {
	        if (typeof localHandler === "function") {
	            localEventFired = true;
	            if (name === "rejectionHandled") {
	                localHandler(promise);
	            } else {
	                localHandler(reason, promise);
	            }
	        }
	    } catch (e) {
	        async.throwLater(e);
	    }
	
	    if (name === "unhandledRejection") {
	        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
	            formatAndLogError(reason, "Unhandled rejection ");
	        }
	    } else {
	        activeFireEvent(name, promise);
	    }
	}
	
	function formatNonError(obj) {
	    var str;
	    if (typeof obj === "function") {
	        str = "[function " +
	            (obj.name || "anonymous") +
	            "]";
	    } else {
	        str = obj && typeof obj.toString === "function"
	            ? obj.toString() : util.toString(obj);
	        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
	        if (ruselessToString.test(str)) {
	            try {
	                var newStr = JSON.stringify(obj);
	                str = newStr;
	            }
	            catch(e) {
	
	            }
	        }
	        if (str.length === 0) {
	            str = "(empty array)";
	        }
	    }
	    return ("(<" + snip(str) + ">, no stack trace)");
	}
	
	function snip(str) {
	    var maxChars = 41;
	    if (str.length < maxChars) {
	        return str;
	    }
	    return str.substr(0, maxChars - 3) + "...";
	}
	
	function longStackTracesIsSupported() {
	    return typeof captureStackTrace === "function";
	}
	
	var shouldIgnore = function() { return false; };
	var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
	function parseLineInfo(line) {
	    var matches = line.match(parseLineInfoRegex);
	    if (matches) {
	        return {
	            fileName: matches[1],
	            line: parseInt(matches[2], 10)
	        };
	    }
	}
	
	function setBounds(firstLineError, lastLineError) {
	    if (!longStackTracesIsSupported()) return;
	    var firstStackLines = firstLineError.stack.split("\n");
	    var lastStackLines = lastLineError.stack.split("\n");
	    var firstIndex = -1;
	    var lastIndex = -1;
	    var firstFileName;
	    var lastFileName;
	    for (var i = 0; i < firstStackLines.length; ++i) {
	        var result = parseLineInfo(firstStackLines[i]);
	        if (result) {
	            firstFileName = result.fileName;
	            firstIndex = result.line;
	            break;
	        }
	    }
	    for (var i = 0; i < lastStackLines.length; ++i) {
	        var result = parseLineInfo(lastStackLines[i]);
	        if (result) {
	            lastFileName = result.fileName;
	            lastIndex = result.line;
	            break;
	        }
	    }
	    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
	        firstFileName !== lastFileName || firstIndex >= lastIndex) {
	        return;
	    }
	
	    shouldIgnore = function(line) {
	        if (bluebirdFramePattern.test(line)) return true;
	        var info = parseLineInfo(line);
	        if (info) {
	            if (info.fileName === firstFileName &&
	                (firstIndex <= info.line && info.line <= lastIndex)) {
	                return true;
	            }
	        }
	        return false;
	    };
	}
	
	function CapturedTrace(parent) {
	    this._parent = parent;
	    this._promisesCreated = 0;
	    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
	    captureStackTrace(this, CapturedTrace);
	    if (length > 32) this.uncycle();
	}
	util.inherits(CapturedTrace, Error);
	Context.CapturedTrace = CapturedTrace;
	
	CapturedTrace.prototype.uncycle = function() {
	    var length = this._length;
	    if (length < 2) return;
	    var nodes = [];
	    var stackToIndex = {};
	
	    for (var i = 0, node = this; node !== undefined; ++i) {
	        nodes.push(node);
	        node = node._parent;
	    }
	    length = this._length = i;
	    for (var i = length - 1; i >= 0; --i) {
	        var stack = nodes[i].stack;
	        if (stackToIndex[stack] === undefined) {
	            stackToIndex[stack] = i;
	        }
	    }
	    for (var i = 0; i < length; ++i) {
	        var currentStack = nodes[i].stack;
	        var index = stackToIndex[currentStack];
	        if (index !== undefined && index !== i) {
	            if (index > 0) {
	                nodes[index - 1]._parent = undefined;
	                nodes[index - 1]._length = 1;
	            }
	            nodes[i]._parent = undefined;
	            nodes[i]._length = 1;
	            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;
	
	            if (index < length - 1) {
	                cycleEdgeNode._parent = nodes[index + 1];
	                cycleEdgeNode._parent.uncycle();
	                cycleEdgeNode._length =
	                    cycleEdgeNode._parent._length + 1;
	            } else {
	                cycleEdgeNode._parent = undefined;
	                cycleEdgeNode._length = 1;
	            }
	            var currentChildLength = cycleEdgeNode._length + 1;
	            for (var j = i - 2; j >= 0; --j) {
	                nodes[j]._length = currentChildLength;
	                currentChildLength++;
	            }
	            return;
	        }
	    }
	};
	
	CapturedTrace.prototype.attachExtraTrace = function(error) {
	    if (error.__stackCleaned__) return;
	    this.uncycle();
	    var parsed = parseStackAndMessage(error);
	    var message = parsed.message;
	    var stacks = [parsed.stack];
	
	    var trace = this;
	    while (trace !== undefined) {
	        stacks.push(cleanStack(trace.stack.split("\n")));
	        trace = trace._parent;
	    }
	    removeCommonRoots(stacks);
	    removeDuplicateOrEmptyJumps(stacks);
	    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
	    util.notEnumerableProp(error, "__stackCleaned__", true);
	};
	
	var captureStackTrace = (function stackDetection() {
	    var v8stackFramePattern = /^\s*at\s*/;
	    var v8stackFormatter = function(stack, error) {
	        if (typeof stack === "string") return stack;
	
	        if (error.name !== undefined &&
	            error.message !== undefined) {
	            return error.toString();
	        }
	        return formatNonError(error);
	    };
	
	    if (typeof Error.stackTraceLimit === "number" &&
	        typeof Error.captureStackTrace === "function") {
	        Error.stackTraceLimit += 6;
	        stackFramePattern = v8stackFramePattern;
	        formatStack = v8stackFormatter;
	        var captureStackTrace = Error.captureStackTrace;
	
	        shouldIgnore = function(line) {
	            return bluebirdFramePattern.test(line);
	        };
	        return function(receiver, ignoreUntil) {
	            Error.stackTraceLimit += 6;
	            captureStackTrace(receiver, ignoreUntil);
	            Error.stackTraceLimit -= 6;
	        };
	    }
	    var err = new Error();
	
	    if (typeof err.stack === "string" &&
	        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
	        stackFramePattern = /@/;
	        formatStack = v8stackFormatter;
	        indentStackFrames = true;
	        return function captureStackTrace(o) {
	            o.stack = new Error().stack;
	        };
	    }
	
	    var hasStackAfterThrow;
	    try { throw new Error(); }
	    catch(e) {
	        hasStackAfterThrow = ("stack" in e);
	    }
	    if (!("stack" in err) && hasStackAfterThrow &&
	        typeof Error.stackTraceLimit === "number") {
	        stackFramePattern = v8stackFramePattern;
	        formatStack = v8stackFormatter;
	        return function captureStackTrace(o) {
	            Error.stackTraceLimit += 6;
	            try { throw new Error(); }
	            catch(e) { o.stack = e.stack; }
	            Error.stackTraceLimit -= 6;
	        };
	    }
	
	    formatStack = function(stack, error) {
	        if (typeof stack === "string") return stack;
	
	        if ((typeof error === "object" ||
	            typeof error === "function") &&
	            error.name !== undefined &&
	            error.message !== undefined) {
	            return error.toString();
	        }
	        return formatNonError(error);
	    };
	
	    return null;
	
	})([]);
	
	if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
	    printWarning = function (message) {
	        console.warn(message);
	    };
	    if (util.isNode && process.stderr.isTTY) {
	        printWarning = function(message, isSoft) {
	            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
	            console.warn(color + message + "\u001b[0m\n");
	        };
	    } else if (!util.isNode && typeof (new Error().stack) === "string") {
	        printWarning = function(message, isSoft) {
	            console.warn("%c" + message,
	                        isSoft ? "color: darkorange" : "color: red");
	        };
	    }
	}
	
	var config = {
	    warnings: warnings,
	    longStackTraces: false,
	    cancellation: false,
	    monitoring: false
	};
	
	if (longStackTraces) Promise.longStackTraces();
	
	return {
	    longStackTraces: function() {
	        return config.longStackTraces;
	    },
	    warnings: function() {
	        return config.warnings;
	    },
	    cancellation: function() {
	        return config.cancellation;
	    },
	    monitoring: function() {
	        return config.monitoring;
	    },
	    propagateFromFunction: function() {
	        return propagateFromFunction;
	    },
	    boundValueFunction: function() {
	        return boundValueFunction;
	    },
	    checkForgottenReturns: checkForgottenReturns,
	    setBounds: setBounds,
	    warn: warn,
	    deprecated: deprecated,
	    CapturedTrace: CapturedTrace,
	    fireDomEvent: fireDomEvent,
	    fireGlobalEvent: fireGlobalEvent
	};
	};
	
	},{"./errors":12,"./util":36}],10:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise) {
	function returner() {
	    return this.value;
	}
	function thrower() {
	    throw this.reason;
	}
	
	Promise.prototype["return"] =
	Promise.prototype.thenReturn = function (value) {
	    if (value instanceof Promise) value.suppressUnhandledRejections();
	    return this._then(
	        returner, undefined, undefined, {value: value}, undefined);
	};
	
	Promise.prototype["throw"] =
	Promise.prototype.thenThrow = function (reason) {
	    return this._then(
	        thrower, undefined, undefined, {reason: reason}, undefined);
	};
	
	Promise.prototype.catchThrow = function (reason) {
	    if (arguments.length <= 1) {
	        return this._then(
	            undefined, thrower, undefined, {reason: reason}, undefined);
	    } else {
	        var _reason = arguments[1];
	        var handler = function() {throw _reason;};
	        return this.caught(reason, handler);
	    }
	};
	
	Promise.prototype.catchReturn = function (value) {
	    if (arguments.length <= 1) {
	        if (value instanceof Promise) value.suppressUnhandledRejections();
	        return this._then(
	            undefined, returner, undefined, {value: value}, undefined);
	    } else {
	        var _value = arguments[1];
	        if (_value instanceof Promise) _value.suppressUnhandledRejections();
	        var handler = function() {return _value;};
	        return this.caught(value, handler);
	    }
	};
	};
	
	},{}],11:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseReduce = Promise.reduce;
	var PromiseAll = Promise.all;
	
	function promiseAllThis() {
	    return PromiseAll(this);
	}
	
	function PromiseMapSeries(promises, fn) {
	    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
	}
	
	Promise.prototype.each = function (fn) {
	    return PromiseReduce(this, fn, INTERNAL, 0)
	              ._then(promiseAllThis, undefined, undefined, this, undefined);
	};
	
	Promise.prototype.mapSeries = function (fn) {
	    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
	};
	
	Promise.each = function (promises, fn) {
	    return PromiseReduce(promises, fn, INTERNAL, 0)
	              ._then(promiseAllThis, undefined, undefined, promises, undefined);
	};
	
	Promise.mapSeries = PromiseMapSeries;
	};
	
	
	},{}],12:[function(_dereq_,module,exports){
	"use strict";
	var es5 = _dereq_("./es5");
	var Objectfreeze = es5.freeze;
	var util = _dereq_("./util");
	var inherits = util.inherits;
	var notEnumerableProp = util.notEnumerableProp;
	
	function subError(nameProperty, defaultMessage) {
	    function SubError(message) {
	        if (!(this instanceof SubError)) return new SubError(message);
	        notEnumerableProp(this, "message",
	            typeof message === "string" ? message : defaultMessage);
	        notEnumerableProp(this, "name", nameProperty);
	        if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, this.constructor);
	        } else {
	            Error.call(this);
	        }
	    }
	    inherits(SubError, Error);
	    return SubError;
	}
	
	var _TypeError, _RangeError;
	var Warning = subError("Warning", "warning");
	var CancellationError = subError("CancellationError", "cancellation error");
	var TimeoutError = subError("TimeoutError", "timeout error");
	var AggregateError = subError("AggregateError", "aggregate error");
	try {
	    _TypeError = TypeError;
	    _RangeError = RangeError;
	} catch(e) {
	    _TypeError = subError("TypeError", "type error");
	    _RangeError = subError("RangeError", "range error");
	}
	
	var methods = ("join pop push shift unshift slice filter forEach some " +
	    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");
	
	for (var i = 0; i < methods.length; ++i) {
	    if (typeof Array.prototype[methods[i]] === "function") {
	        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
	    }
	}
	
	es5.defineProperty(AggregateError.prototype, "length", {
	    value: 0,
	    configurable: false,
	    writable: true,
	    enumerable: true
	});
	AggregateError.prototype["isOperational"] = true;
	var level = 0;
	AggregateError.prototype.toString = function() {
	    var indent = Array(level * 4 + 1).join(" ");
	    var ret = "\n" + indent + "AggregateError of:" + "\n";
	    level++;
	    indent = Array(level * 4 + 1).join(" ");
	    for (var i = 0; i < this.length; ++i) {
	        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
	        var lines = str.split("\n");
	        for (var j = 0; j < lines.length; ++j) {
	            lines[j] = indent + lines[j];
	        }
	        str = lines.join("\n");
	        ret += str + "\n";
	    }
	    level--;
	    return ret;
	};
	
	function OperationalError(message) {
	    if (!(this instanceof OperationalError))
	        return new OperationalError(message);
	    notEnumerableProp(this, "name", "OperationalError");
	    notEnumerableProp(this, "message", message);
	    this.cause = message;
	    this["isOperational"] = true;
	
	    if (message instanceof Error) {
	        notEnumerableProp(this, "message", message.message);
	        notEnumerableProp(this, "stack", message.stack);
	    } else if (Error.captureStackTrace) {
	        Error.captureStackTrace(this, this.constructor);
	    }
	
	}
	inherits(OperationalError, Error);
	
	var errorTypes = Error["__BluebirdErrorTypes__"];
	if (!errorTypes) {
	    errorTypes = Objectfreeze({
	        CancellationError: CancellationError,
	        TimeoutError: TimeoutError,
	        OperationalError: OperationalError,
	        RejectionError: OperationalError,
	        AggregateError: AggregateError
	    });
	    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
	        value: errorTypes,
	        writable: false,
	        enumerable: false,
	        configurable: false
	    });
	}
	
	module.exports = {
	    Error: Error,
	    TypeError: _TypeError,
	    RangeError: _RangeError,
	    CancellationError: errorTypes.CancellationError,
	    OperationalError: errorTypes.OperationalError,
	    TimeoutError: errorTypes.TimeoutError,
	    AggregateError: errorTypes.AggregateError,
	    Warning: Warning
	};
	
	},{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){
	var isES5 = (function(){
	    "use strict";
	    return this === undefined;
	})();
	
	if (isES5) {
	    module.exports = {
	        freeze: Object.freeze,
	        defineProperty: Object.defineProperty,
	        getDescriptor: Object.getOwnPropertyDescriptor,
	        keys: Object.keys,
	        names: Object.getOwnPropertyNames,
	        getPrototypeOf: Object.getPrototypeOf,
	        isArray: Array.isArray,
	        isES5: isES5,
	        propertyIsWritable: function(obj, prop) {
	            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
	            return !!(!descriptor || descriptor.writable || descriptor.set);
	        }
	    };
	} else {
	    var has = {}.hasOwnProperty;
	    var str = {}.toString;
	    var proto = {}.constructor.prototype;
	
	    var ObjectKeys = function (o) {
	        var ret = [];
	        for (var key in o) {
	            if (has.call(o, key)) {
	                ret.push(key);
	            }
	        }
	        return ret;
	    };
	
	    var ObjectGetDescriptor = function(o, key) {
	        return {value: o[key]};
	    };
	
	    var ObjectDefineProperty = function (o, key, desc) {
	        o[key] = desc.value;
	        return o;
	    };
	
	    var ObjectFreeze = function (obj) {
	        return obj;
	    };
	
	    var ObjectGetPrototypeOf = function (obj) {
	        try {
	            return Object(obj).constructor.prototype;
	        }
	        catch (e) {
	            return proto;
	        }
	    };
	
	    var ArrayIsArray = function (obj) {
	        try {
	            return str.call(obj) === "[object Array]";
	        }
	        catch(e) {
	            return false;
	        }
	    };
	
	    module.exports = {
	        isArray: ArrayIsArray,
	        keys: ObjectKeys,
	        names: ObjectKeys,
	        defineProperty: ObjectDefineProperty,
	        getDescriptor: ObjectGetDescriptor,
	        freeze: ObjectFreeze,
	        getPrototypeOf: ObjectGetPrototypeOf,
	        isES5: isES5,
	        propertyIsWritable: function() {
	            return true;
	        }
	    };
	}
	
	},{}],14:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseMap = Promise.map;
	
	Promise.prototype.filter = function (fn, options) {
	    return PromiseMap(this, fn, options, INTERNAL);
	};
	
	Promise.filter = function (promises, fn, options) {
	    return PromiseMap(promises, fn, options, INTERNAL);
	};
	};
	
	},{}],15:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise, tryConvertToPromise) {
	var util = _dereq_("./util");
	var CancellationError = Promise.CancellationError;
	var errorObj = util.errorObj;
	
	function PassThroughHandlerContext(promise, type, handler) {
	    this.promise = promise;
	    this.type = type;
	    this.handler = handler;
	    this.called = false;
	    this.cancelPromise = null;
	}
	
	PassThroughHandlerContext.prototype.isFinallyHandler = function() {
	    return this.type === 0;
	};
	
	function FinallyHandlerCancelReaction(finallyHandler) {
	    this.finallyHandler = finallyHandler;
	}
	
	FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
	    checkCancel(this.finallyHandler);
	};
	
	function checkCancel(ctx, reason) {
	    if (ctx.cancelPromise != null) {
	        if (arguments.length > 1) {
	            ctx.cancelPromise._reject(reason);
	        } else {
	            ctx.cancelPromise._cancel();
	        }
	        ctx.cancelPromise = null;
	        return true;
	    }
	    return false;
	}
	
	function succeed() {
	    return finallyHandler.call(this, this.promise._target()._settledValue());
	}
	function fail(reason) {
	    if (checkCancel(this, reason)) return;
	    errorObj.e = reason;
	    return errorObj;
	}
	function finallyHandler(reasonOrValue) {
	    var promise = this.promise;
	    var handler = this.handler;
	
	    if (!this.called) {
	        this.called = true;
	        var ret = this.isFinallyHandler()
	            ? handler.call(promise._boundValue())
	            : handler.call(promise._boundValue(), reasonOrValue);
	        if (ret !== undefined) {
	            promise._setReturnedNonUndefined();
	            var maybePromise = tryConvertToPromise(ret, promise);
	            if (maybePromise instanceof Promise) {
	                if (this.cancelPromise != null) {
	                    if (maybePromise._isCancelled()) {
	                        var reason =
	                            new CancellationError("late cancellation observer");
	                        promise._attachExtraTrace(reason);
	                        errorObj.e = reason;
	                        return errorObj;
	                    } else if (maybePromise.isPending()) {
	                        maybePromise._attachCancellationCallback(
	                            new FinallyHandlerCancelReaction(this));
	                    }
	                }
	                return maybePromise._then(
	                    succeed, fail, undefined, this, undefined);
	            }
	        }
	    }
	
	    if (promise.isRejected()) {
	        checkCancel(this);
	        errorObj.e = reasonOrValue;
	        return errorObj;
	    } else {
	        checkCancel(this);
	        return reasonOrValue;
	    }
	}
	
	Promise.prototype._passThrough = function(handler, type, success, fail) {
	    if (typeof handler !== "function") return this.then();
	    return this._then(success,
	                      fail,
	                      undefined,
	                      new PassThroughHandlerContext(this, type, handler),
	                      undefined);
	};
	
	Promise.prototype.lastly =
	Promise.prototype["finally"] = function (handler) {
	    return this._passThrough(handler,
	                             0,
	                             finallyHandler,
	                             finallyHandler);
	};
	
	Promise.prototype.tap = function (handler) {
	    return this._passThrough(handler, 1, finallyHandler);
	};
	
	return PassThroughHandlerContext;
	};
	
	},{"./util":36}],16:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise,
	                          apiRejection,
	                          INTERNAL,
	                          tryConvertToPromise,
	                          Proxyable,
	                          debug) {
	var errors = _dereq_("./errors");
	var TypeError = errors.TypeError;
	var util = _dereq_("./util");
	var errorObj = util.errorObj;
	var tryCatch = util.tryCatch;
	var yieldHandlers = [];
	
	function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
	    for (var i = 0; i < yieldHandlers.length; ++i) {
	        traceParent._pushContext();
	        var result = tryCatch(yieldHandlers[i])(value);
	        traceParent._popContext();
	        if (result === errorObj) {
	            traceParent._pushContext();
	            var ret = Promise.reject(errorObj.e);
	            traceParent._popContext();
	            return ret;
	        }
	        var maybePromise = tryConvertToPromise(result, traceParent);
	        if (maybePromise instanceof Promise) return maybePromise;
	    }
	    return null;
	}
	
	function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
	    if (debug.cancellation()) {
	        var internal = new Promise(INTERNAL);
	        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
	        this._promise = internal.lastly(function() {
	            return _finallyPromise;
	        });
	        internal._captureStackTrace();
	        internal._setOnCancel(this);
	    } else {
	        var promise = this._promise = new Promise(INTERNAL);
	        promise._captureStackTrace();
	    }
	    this._stack = stack;
	    this._generatorFunction = generatorFunction;
	    this._receiver = receiver;
	    this._generator = undefined;
	    this._yieldHandlers = typeof yieldHandler === "function"
	        ? [yieldHandler].concat(yieldHandlers)
	        : yieldHandlers;
	    this._yieldedPromise = null;
	    this._cancellationPhase = false;
	}
	util.inherits(PromiseSpawn, Proxyable);
	
	PromiseSpawn.prototype._isResolved = function() {
	    return this._promise === null;
	};
	
	PromiseSpawn.prototype._cleanup = function() {
	    this._promise = this._generator = null;
	    if (debug.cancellation() && this._finallyPromise !== null) {
	        this._finallyPromise._fulfill();
	        this._finallyPromise = null;
	    }
	};
	
	PromiseSpawn.prototype._promiseCancelled = function() {
	    if (this._isResolved()) return;
	    var implementsReturn = typeof this._generator["return"] !== "undefined";
	
	    var result;
	    if (!implementsReturn) {
	        var reason = new Promise.CancellationError(
	            "generator .return() sentinel");
	        Promise.coroutine.returnSentinel = reason;
	        this._promise._attachExtraTrace(reason);
	        this._promise._pushContext();
	        result = tryCatch(this._generator["throw"]).call(this._generator,
	                                                         reason);
	        this._promise._popContext();
	    } else {
	        this._promise._pushContext();
	        result = tryCatch(this._generator["return"]).call(this._generator,
	                                                          undefined);
	        this._promise._popContext();
	    }
	    this._cancellationPhase = true;
	    this._yieldedPromise = null;
	    this._continue(result);
	};
	
	PromiseSpawn.prototype._promiseFulfilled = function(value) {
	    this._yieldedPromise = null;
	    this._promise._pushContext();
	    var result = tryCatch(this._generator.next).call(this._generator, value);
	    this._promise._popContext();
	    this._continue(result);
	};
	
	PromiseSpawn.prototype._promiseRejected = function(reason) {
	    this._yieldedPromise = null;
	    this._promise._attachExtraTrace(reason);
	    this._promise._pushContext();
	    var result = tryCatch(this._generator["throw"])
	        .call(this._generator, reason);
	    this._promise._popContext();
	    this._continue(result);
	};
	
	PromiseSpawn.prototype._resultCancelled = function() {
	    if (this._yieldedPromise instanceof Promise) {
	        var promise = this._yieldedPromise;
	        this._yieldedPromise = null;
	        promise.cancel();
	    }
	};
	
	PromiseSpawn.prototype.promise = function () {
	    return this._promise;
	};
	
	PromiseSpawn.prototype._run = function () {
	    this._generator = this._generatorFunction.call(this._receiver);
	    this._receiver =
	        this._generatorFunction = undefined;
	    this._promiseFulfilled(undefined);
	};
	
	PromiseSpawn.prototype._continue = function (result) {
	    var promise = this._promise;
	    if (result === errorObj) {
	        this._cleanup();
	        if (this._cancellationPhase) {
	            return promise.cancel();
	        } else {
	            return promise._rejectCallback(result.e, false);
	        }
	    }
	
	    var value = result.value;
	    if (result.done === true) {
	        this._cleanup();
	        if (this._cancellationPhase) {
	            return promise.cancel();
	        } else {
	            return promise._resolveCallback(value);
	        }
	    } else {
	        var maybePromise = tryConvertToPromise(value, this._promise);
	        if (!(maybePromise instanceof Promise)) {
	            maybePromise =
	                promiseFromYieldHandler(maybePromise,
	                                        this._yieldHandlers,
	                                        this._promise);
	            if (maybePromise === null) {
	                this._promiseRejected(
	                    new TypeError(
	                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", value) +
	                        "From coroutine:\u000a" +
	                        this._stack.split("\n").slice(1, -7).join("\n")
	                    )
	                );
	                return;
	            }
	        }
	        maybePromise = maybePromise._target();
	        var bitField = maybePromise._bitField;
	        ;
	        if (((bitField & 50397184) === 0)) {
	            this._yieldedPromise = maybePromise;
	            maybePromise._proxy(this, null);
	        } else if (((bitField & 33554432) !== 0)) {
	            Promise._async.invoke(
	                this._promiseFulfilled, this, maybePromise._value()
	            );
	        } else if (((bitField & 16777216) !== 0)) {
	            Promise._async.invoke(
	                this._promiseRejected, this, maybePromise._reason()
	            );
	        } else {
	            this._promiseCancelled();
	        }
	    }
	};
	
	Promise.coroutine = function (generatorFunction, options) {
	    if (typeof generatorFunction !== "function") {
	        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var yieldHandler = Object(options).yieldHandler;
	    var PromiseSpawn$ = PromiseSpawn;
	    var stack = new Error().stack;
	    return function () {
	        var generator = generatorFunction.apply(this, arguments);
	        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
	                                      stack);
	        var ret = spawn.promise();
	        spawn._generator = generator;
	        spawn._promiseFulfilled(undefined);
	        return ret;
	    };
	};
	
	Promise.coroutine.addYieldHandler = function(fn) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    yieldHandlers.push(fn);
	};
	
	Promise.spawn = function (generatorFunction) {
	    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
	    if (typeof generatorFunction !== "function") {
	        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var spawn = new PromiseSpawn(generatorFunction, this);
	    var ret = spawn.promise();
	    spawn._run(Promise.spawn);
	    return ret;
	};
	};
	
	},{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){
	"use strict";
	module.exports =
	function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
	         getDomain) {
	var util = _dereq_("./util");
	var canEvaluate = util.canEvaluate;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var reject;
	
	if (false) {
	if (canEvaluate) {
	    var thenCallback = function(i) {
	        return new Function("value", "holder", "                             \n\
	            'use strict';                                                    \n\
	            holder.pIndex = value;                                           \n\
	            holder.checkFulfillment(this);                                   \n\
	            ".replace(/Index/g, i));
	    };
	
	    var promiseSetter = function(i) {
	        return new Function("promise", "holder", "                           \n\
	            'use strict';                                                    \n\
	            holder.pIndex = promise;                                         \n\
	            ".replace(/Index/g, i));
	    };
	
	    var generateHolderClass = function(total) {
	        var props = new Array(total);
	        for (var i = 0; i < props.length; ++i) {
	            props[i] = "this.p" + (i+1);
	        }
	        var assignment = props.join(" = ") + " = null;";
	        var cancellationCode= "var promise;\n" + props.map(function(prop) {
	            return "                                                         \n\
	                promise = " + prop + ";                                      \n\
	                if (promise instanceof Promise) {                            \n\
	                    promise.cancel();                                        \n\
	                }                                                            \n\
	            ";
	        }).join("\n");
	        var passedArguments = props.join(", ");
	        var name = "Holder$" + total;
	
	
	        var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
	            'use strict';                                                    \n\
	            function [TheName](fn) {                                         \n\
	                [TheProperties]                                              \n\
	                this.fn = fn;                                                \n\
	                this.asyncNeeded = true;                                     \n\
	                this.now = 0;                                                \n\
	            }                                                                \n\
	                                                                             \n\
	            [TheName].prototype._callFunction = function(promise) {          \n\
	                promise._pushContext();                                      \n\
	                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
	                promise._popContext();                                       \n\
	                if (ret === errorObj) {                                      \n\
	                    promise._rejectCallback(ret.e, false);                   \n\
	                } else {                                                     \n\
	                    promise._resolveCallback(ret);                           \n\
	                }                                                            \n\
	            };                                                               \n\
	                                                                             \n\
	            [TheName].prototype.checkFulfillment = function(promise) {       \n\
	                var now = ++this.now;                                        \n\
	                if (now === [TheTotal]) {                                    \n\
	                    if (this.asyncNeeded) {                                  \n\
	                        async.invoke(this._callFunction, this, promise);     \n\
	                    } else {                                                 \n\
	                        this._callFunction(promise);                         \n\
	                    }                                                        \n\
	                                                                             \n\
	                }                                                            \n\
	            };                                                               \n\
	                                                                             \n\
	            [TheName].prototype._resultCancelled = function() {              \n\
	                [CancellationCode]                                           \n\
	            };                                                               \n\
	                                                                             \n\
	            return [TheName];                                                \n\
	        }(tryCatch, errorObj, Promise, async);                               \n\
	        ";
	
	        code = code.replace(/\[TheName\]/g, name)
	            .replace(/\[TheTotal\]/g, total)
	            .replace(/\[ThePassedArguments\]/g, passedArguments)
	            .replace(/\[TheProperties\]/g, assignment)
	            .replace(/\[CancellationCode\]/g, cancellationCode);
	
	        return new Function("tryCatch", "errorObj", "Promise", "async", code)
	                           (tryCatch, errorObj, Promise, async);
	    };
	
	    var holderClasses = [];
	    var thenCallbacks = [];
	    var promiseSetters = [];
	
	    for (var i = 0; i < 8; ++i) {
	        holderClasses.push(generateHolderClass(i + 1));
	        thenCallbacks.push(thenCallback(i + 1));
	        promiseSetters.push(promiseSetter(i + 1));
	    }
	
	    reject = function (reason) {
	        this._reject(reason);
	    };
	}}
	
	Promise.join = function () {
	    var last = arguments.length - 1;
	    var fn;
	    if (last > 0 && typeof arguments[last] === "function") {
	        fn = arguments[last];
	        if (false) {
	            if (last <= 8 && canEvaluate) {
	                var ret = new Promise(INTERNAL);
	                ret._captureStackTrace();
	                var HolderClass = holderClasses[last - 1];
	                var holder = new HolderClass(fn);
	                var callbacks = thenCallbacks;
	
	                for (var i = 0; i < last; ++i) {
	                    var maybePromise = tryConvertToPromise(arguments[i], ret);
	                    if (maybePromise instanceof Promise) {
	                        maybePromise = maybePromise._target();
	                        var bitField = maybePromise._bitField;
	                        ;
	                        if (((bitField & 50397184) === 0)) {
	                            maybePromise._then(callbacks[i], reject,
	                                               undefined, ret, holder);
	                            promiseSetters[i](maybePromise, holder);
	                            holder.asyncNeeded = false;
	                        } else if (((bitField & 33554432) !== 0)) {
	                            callbacks[i].call(ret,
	                                              maybePromise._value(), holder);
	                        } else if (((bitField & 16777216) !== 0)) {
	                            ret._reject(maybePromise._reason());
	                        } else {
	                            ret._cancel();
	                        }
	                    } else {
	                        callbacks[i].call(ret, maybePromise, holder);
	                    }
	                }
	
	                if (!ret._isFateSealed()) {
	                    if (holder.asyncNeeded) {
	                        var domain = getDomain();
	                        if (domain !== null) {
	                            holder.fn = util.domainBind(domain, holder.fn);
	                        }
	                    }
	                    ret._setAsyncGuaranteed();
	                    ret._setOnCancel(holder);
	                }
	                return ret;
	            }
	        }
	    }
	    var args = [].slice.call(arguments);;
	    if (fn) args.pop();
	    var ret = new PromiseArray(args).promise();
	    return fn !== undefined ? ret.spread(fn) : ret;
	};
	
	};
	
	},{"./util":36}],18:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise,
	                          PromiseArray,
	                          apiRejection,
	                          tryConvertToPromise,
	                          INTERNAL,
	                          debug) {
	var getDomain = Promise._getDomain;
	var util = _dereq_("./util");
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var async = Promise._async;
	
	function MappingPromiseArray(promises, fn, limit, _filter) {
	    this.constructor$(promises);
	    this._promise._captureStackTrace();
	    var domain = getDomain();
	    this._callback = domain === null ? fn : util.domainBind(domain, fn);
	    this._preservedValues = _filter === INTERNAL
	        ? new Array(this.length())
	        : null;
	    this._limit = limit;
	    this._inFlight = 0;
	    this._queue = [];
	    async.invoke(this._asyncInit, this, undefined);
	}
	util.inherits(MappingPromiseArray, PromiseArray);
	
	MappingPromiseArray.prototype._asyncInit = function() {
	    this._init$(undefined, -2);
	};
	
	MappingPromiseArray.prototype._init = function () {};
	
	MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    var values = this._values;
	    var length = this.length();
	    var preservedValues = this._preservedValues;
	    var limit = this._limit;
	
	    if (index < 0) {
	        index = (index * -1) - 1;
	        values[index] = value;
	        if (limit >= 1) {
	            this._inFlight--;
	            this._drainQueue();
	            if (this._isResolved()) return true;
	        }
	    } else {
	        if (limit >= 1 && this._inFlight >= limit) {
	            values[index] = value;
	            this._queue.push(index);
	            return false;
	        }
	        if (preservedValues !== null) preservedValues[index] = value;
	
	        var promise = this._promise;
	        var callback = this._callback;
	        var receiver = promise._boundValue();
	        promise._pushContext();
	        var ret = tryCatch(callback).call(receiver, value, index, length);
	        var promiseCreated = promise._popContext();
	        debug.checkForgottenReturns(
	            ret,
	            promiseCreated,
	            preservedValues !== null ? "Promise.filter" : "Promise.map",
	            promise
	        );
	        if (ret === errorObj) {
	            this._reject(ret.e);
	            return true;
	        }
	
	        var maybePromise = tryConvertToPromise(ret, this._promise);
	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            var bitField = maybePromise._bitField;
	            ;
	            if (((bitField & 50397184) === 0)) {
	                if (limit >= 1) this._inFlight++;
	                values[index] = maybePromise;
	                maybePromise._proxy(this, (index + 1) * -1);
	                return false;
	            } else if (((bitField & 33554432) !== 0)) {
	                ret = maybePromise._value();
	            } else if (((bitField & 16777216) !== 0)) {
	                this._reject(maybePromise._reason());
	                return true;
	            } else {
	                this._cancel();
	                return true;
	            }
	        }
	        values[index] = ret;
	    }
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= length) {
	        if (preservedValues !== null) {
	            this._filter(values, preservedValues);
	        } else {
	            this._resolve(values);
	        }
	        return true;
	    }
	    return false;
	};
	
	MappingPromiseArray.prototype._drainQueue = function () {
	    var queue = this._queue;
	    var limit = this._limit;
	    var values = this._values;
	    while (queue.length > 0 && this._inFlight < limit) {
	        if (this._isResolved()) return;
	        var index = queue.pop();
	        this._promiseFulfilled(values[index], index);
	    }
	};
	
	MappingPromiseArray.prototype._filter = function (booleans, values) {
	    var len = values.length;
	    var ret = new Array(len);
	    var j = 0;
	    for (var i = 0; i < len; ++i) {
	        if (booleans[i]) ret[j++] = values[i];
	    }
	    ret.length = j;
	    this._resolve(ret);
	};
	
	MappingPromiseArray.prototype.preservedValues = function () {
	    return this._preservedValues;
	};
	
	function map(promises, fn, options, _filter) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	
	    var limit = 0;
	    if (options !== undefined) {
	        if (typeof options === "object" && options !== null) {
	            if (typeof options.concurrency !== "number") {
	                return Promise.reject(
	                    new TypeError("'concurrency' must be a number but it is " +
	                                    util.classString(options.concurrency)));
	            }
	            limit = options.concurrency;
	        } else {
	            return Promise.reject(new TypeError(
	                            "options argument must be an object but it is " +
	                             util.classString(options)));
	        }
	    }
	    limit = typeof limit === "number" &&
	        isFinite(limit) && limit >= 1 ? limit : 0;
	    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
	}
	
	Promise.prototype.map = function (fn, options) {
	    return map(this, fn, options, null);
	};
	
	Promise.map = function (promises, fn, options, _filter) {
	    return map(promises, fn, options, _filter);
	};
	
	
	};
	
	},{"./util":36}],19:[function(_dereq_,module,exports){
	"use strict";
	module.exports =
	function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
	var util = _dereq_("./util");
	var tryCatch = util.tryCatch;
	
	Promise.method = function (fn) {
	    if (typeof fn !== "function") {
	        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
	    }
	    return function () {
	        var ret = new Promise(INTERNAL);
	        ret._captureStackTrace();
	        ret._pushContext();
	        var value = tryCatch(fn).apply(this, arguments);
	        var promiseCreated = ret._popContext();
	        debug.checkForgottenReturns(
	            value, promiseCreated, "Promise.method", ret);
	        ret._resolveFromSyncValue(value);
	        return ret;
	    };
	};
	
	Promise.attempt = Promise["try"] = function (fn) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    ret._pushContext();
	    var value;
	    if (arguments.length > 1) {
	        debug.deprecated("calling Promise.try with more than 1 argument");
	        var arg = arguments[1];
	        var ctx = arguments[2];
	        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
	                                  : tryCatch(fn).call(ctx, arg);
	    } else {
	        value = tryCatch(fn)();
	    }
	    var promiseCreated = ret._popContext();
	    debug.checkForgottenReturns(
	        value, promiseCreated, "Promise.try", ret);
	    ret._resolveFromSyncValue(value);
	    return ret;
	};
	
	Promise.prototype._resolveFromSyncValue = function (value) {
	    if (value === util.errorObj) {
	        this._rejectCallback(value.e, false);
	    } else {
	        this._resolveCallback(value, true);
	    }
	};
	};
	
	},{"./util":36}],20:[function(_dereq_,module,exports){
	"use strict";
	var util = _dereq_("./util");
	var maybeWrapAsError = util.maybeWrapAsError;
	var errors = _dereq_("./errors");
	var OperationalError = errors.OperationalError;
	var es5 = _dereq_("./es5");
	
	function isUntypedError(obj) {
	    return obj instanceof Error &&
	        es5.getPrototypeOf(obj) === Error.prototype;
	}
	
	var rErrorKey = /^(?:name|message|stack|cause)$/;
	function wrapAsOperationalError(obj) {
	    var ret;
	    if (isUntypedError(obj)) {
	        ret = new OperationalError(obj);
	        ret.name = obj.name;
	        ret.message = obj.message;
	        ret.stack = obj.stack;
	        var keys = es5.keys(obj);
	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            if (!rErrorKey.test(key)) {
	                ret[key] = obj[key];
	            }
	        }
	        return ret;
	    }
	    util.markAsOriginatingFromRejection(obj);
	    return obj;
	}
	
	function nodebackForPromise(promise, multiArgs) {
	    return function(err, value) {
	        if (promise === null) return;
	        if (err) {
	            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
	            promise._attachExtraTrace(wrapped);
	            promise._reject(wrapped);
	        } else if (!multiArgs) {
	            promise._fulfill(value);
	        } else {
	            var args = [].slice.call(arguments, 1);;
	            promise._fulfill(args);
	        }
	        promise = null;
	    };
	}
	
	module.exports = nodebackForPromise;
	
	},{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise) {
	var util = _dereq_("./util");
	var async = Promise._async;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	
	function spreadAdapter(val, nodeback) {
	    var promise = this;
	    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
	    var ret =
	        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}
	
	function successAdapter(val, nodeback) {
	    var promise = this;
	    var receiver = promise._boundValue();
	    var ret = val === undefined
	        ? tryCatch(nodeback).call(receiver, null)
	        : tryCatch(nodeback).call(receiver, null, val);
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}
	function errorAdapter(reason, nodeback) {
	    var promise = this;
	    if (!reason) {
	        var newReason = new Error(reason + "");
	        newReason.cause = reason;
	        reason = newReason;
	    }
	    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}
	
	Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
	                                                                     options) {
	    if (typeof nodeback == "function") {
	        var adapter = successAdapter;
	        if (options !== undefined && Object(options).spread) {
	            adapter = spreadAdapter;
	        }
	        this._then(
	            adapter,
	            errorAdapter,
	            undefined,
	            this,
	            nodeback
	        );
	    }
	    return this;
	};
	};
	
	},{"./util":36}],22:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function() {
	var makeSelfResolutionError = function () {
	    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	};
	var reflectHandler = function() {
	    return new Promise.PromiseInspection(this._target());
	};
	var apiRejection = function(msg) {
	    return Promise.reject(new TypeError(msg));
	};
	function Proxyable() {}
	var UNDEFINED_BINDING = {};
	var util = _dereq_("./util");
	
	var getDomain;
	if (util.isNode) {
	    getDomain = function() {
	        var ret = process.domain;
	        if (ret === undefined) ret = null;
	        return ret;
	    };
	} else {
	    getDomain = function() {
	        return null;
	    };
	}
	util.notEnumerableProp(Promise, "_getDomain", getDomain);
	
	var es5 = _dereq_("./es5");
	var Async = _dereq_("./async");
	var async = new Async();
	es5.defineProperty(Promise, "_async", {value: async});
	var errors = _dereq_("./errors");
	var TypeError = Promise.TypeError = errors.TypeError;
	Promise.RangeError = errors.RangeError;
	var CancellationError = Promise.CancellationError = errors.CancellationError;
	Promise.TimeoutError = errors.TimeoutError;
	Promise.OperationalError = errors.OperationalError;
	Promise.RejectionError = errors.OperationalError;
	Promise.AggregateError = errors.AggregateError;
	var INTERNAL = function(){};
	var APPLY = {};
	var NEXT_FILTER = {};
	var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
	var PromiseArray =
	    _dereq_("./promise_array")(Promise, INTERNAL,
	                               tryConvertToPromise, apiRejection, Proxyable);
	var Context = _dereq_("./context")(Promise);
	 /*jshint unused:false*/
	var createContext = Context.create;
	var debug = _dereq_("./debuggability")(Promise, Context);
	var CapturedTrace = debug.CapturedTrace;
	var PassThroughHandlerContext =
	    _dereq_("./finally")(Promise, tryConvertToPromise);
	var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
	var nodebackForPromise = _dereq_("./nodeback");
	var errorObj = util.errorObj;
	var tryCatch = util.tryCatch;
	function check(self, executor) {
	    if (typeof executor !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(executor));
	    }
	    if (self.constructor !== Promise) {
	        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	}
	
	function Promise(executor) {
	    this._bitField = 0;
	    this._fulfillmentHandler0 = undefined;
	    this._rejectionHandler0 = undefined;
	    this._promise0 = undefined;
	    this._receiver0 = undefined;
	    if (executor !== INTERNAL) {
	        check(this, executor);
	        this._resolveFromExecutor(executor);
	    }
	    this._promiseCreated();
	    this._fireEvent("promiseCreated", this);
	}
	
	Promise.prototype.toString = function () {
	    return "[object Promise]";
	};
	
	Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
	    var len = arguments.length;
	    if (len > 1) {
	        var catchInstances = new Array(len - 1),
	            j = 0, i;
	        for (i = 0; i < len - 1; ++i) {
	            var item = arguments[i];
	            if (util.isObject(item)) {
	                catchInstances[j++] = item;
	            } else {
	                return apiRejection("expecting an object but got " +
	                    "A catch statement predicate " + util.classString(item));
	            }
	        }
	        catchInstances.length = j;
	        fn = arguments[i];
	        return this.then(undefined, catchFilter(catchInstances, fn, this));
	    }
	    return this.then(undefined, fn);
	};
	
	Promise.prototype.reflect = function () {
	    return this._then(reflectHandler,
	        reflectHandler, undefined, this, undefined);
	};
	
	Promise.prototype.then = function (didFulfill, didReject) {
	    if (debug.warnings() && arguments.length > 0 &&
	        typeof didFulfill !== "function" &&
	        typeof didReject !== "function") {
	        var msg = ".then() only accepts functions but was passed: " +
	                util.classString(didFulfill);
	        if (arguments.length > 1) {
	            msg += ", " + util.classString(didReject);
	        }
	        this._warn(msg);
	    }
	    return this._then(didFulfill, didReject, undefined, undefined, undefined);
	};
	
	Promise.prototype.done = function (didFulfill, didReject) {
	    var promise =
	        this._then(didFulfill, didReject, undefined, undefined, undefined);
	    promise._setIsFinal();
	};
	
	Promise.prototype.spread = function (fn) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
	};
	
	Promise.prototype.toJSON = function () {
	    var ret = {
	        isFulfilled: false,
	        isRejected: false,
	        fulfillmentValue: undefined,
	        rejectionReason: undefined
	    };
	    if (this.isFulfilled()) {
	        ret.fulfillmentValue = this.value();
	        ret.isFulfilled = true;
	    } else if (this.isRejected()) {
	        ret.rejectionReason = this.reason();
	        ret.isRejected = true;
	    }
	    return ret;
	};
	
	Promise.prototype.all = function () {
	    if (arguments.length > 0) {
	        this._warn(".all() was passed arguments but it does not take any");
	    }
	    return new PromiseArray(this).promise();
	};
	
	Promise.prototype.error = function (fn) {
	    return this.caught(util.originatesFromRejection, fn);
	};
	
	Promise.getNewLibraryCopy = module.exports;
	
	Promise.is = function (val) {
	    return val instanceof Promise;
	};
	
	Promise.fromNode = Promise.fromCallback = function(fn) {
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
	                                         : false;
	    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
	    if (result === errorObj) {
	        ret._rejectCallback(result.e, true);
	    }
	    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
	    return ret;
	};
	
	Promise.all = function (promises) {
	    return new PromiseArray(promises).promise();
	};
	
	Promise.cast = function (obj) {
	    var ret = tryConvertToPromise(obj);
	    if (!(ret instanceof Promise)) {
	        ret = new Promise(INTERNAL);
	        ret._captureStackTrace();
	        ret._setFulfilled();
	        ret._rejectionHandler0 = obj;
	    }
	    return ret;
	};
	
	Promise.resolve = Promise.fulfilled = Promise.cast;
	
	Promise.reject = Promise.rejected = function (reason) {
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    ret._rejectCallback(reason, true);
	    return ret;
	};
	
	Promise.setScheduler = function(fn) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    return async.setScheduler(fn);
	};
	
	Promise.prototype._then = function (
	    didFulfill,
	    didReject,
	    _,    receiver,
	    internalData
	) {
	    var haveInternalData = internalData !== undefined;
	    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
	    var target = this._target();
	    var bitField = target._bitField;
	
	    if (!haveInternalData) {
	        promise._propagateFrom(this, 3);
	        promise._captureStackTrace();
	        if (receiver === undefined &&
	            ((this._bitField & 2097152) !== 0)) {
	            if (!((bitField & 50397184) === 0)) {
	                receiver = this._boundValue();
	            } else {
	                receiver = target === this ? undefined : this._boundTo;
	            }
	        }
	        this._fireEvent("promiseChained", this, promise);
	    }
	
	    var domain = getDomain();
	    if (!((bitField & 50397184) === 0)) {
	        var handler, value, settler = target._settlePromiseCtx;
	        if (((bitField & 33554432) !== 0)) {
	            value = target._rejectionHandler0;
	            handler = didFulfill;
	        } else if (((bitField & 16777216) !== 0)) {
	            value = target._fulfillmentHandler0;
	            handler = didReject;
	            target._unsetRejectionIsUnhandled();
	        } else {
	            settler = target._settlePromiseLateCancellationObserver;
	            value = new CancellationError("late cancellation observer");
	            target._attachExtraTrace(value);
	            handler = didReject;
	        }
	
	        async.invoke(settler, target, {
	            handler: domain === null ? handler
	                : (typeof handler === "function" &&
	                    util.domainBind(domain, handler)),
	            promise: promise,
	            receiver: receiver,
	            value: value
	        });
	    } else {
	        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
	    }
	
	    return promise;
	};
	
	Promise.prototype._length = function () {
	    return this._bitField & 65535;
	};
	
	Promise.prototype._isFateSealed = function () {
	    return (this._bitField & 117506048) !== 0;
	};
	
	Promise.prototype._isFollowing = function () {
	    return (this._bitField & 67108864) === 67108864;
	};
	
	Promise.prototype._setLength = function (len) {
	    this._bitField = (this._bitField & -65536) |
	        (len & 65535);
	};
	
	Promise.prototype._setFulfilled = function () {
	    this._bitField = this._bitField | 33554432;
	    this._fireEvent("promiseFulfilled", this);
	};
	
	Promise.prototype._setRejected = function () {
	    this._bitField = this._bitField | 16777216;
	    this._fireEvent("promiseRejected", this);
	};
	
	Promise.prototype._setFollowing = function () {
	    this._bitField = this._bitField | 67108864;
	    this._fireEvent("promiseResolved", this);
	};
	
	Promise.prototype._setIsFinal = function () {
	    this._bitField = this._bitField | 4194304;
	};
	
	Promise.prototype._isFinal = function () {
	    return (this._bitField & 4194304) > 0;
	};
	
	Promise.prototype._unsetCancelled = function() {
	    this._bitField = this._bitField & (~65536);
	};
	
	Promise.prototype._setCancelled = function() {
	    this._bitField = this._bitField | 65536;
	    this._fireEvent("promiseCancelled", this);
	};
	
	Promise.prototype._setWillBeCancelled = function() {
	    this._bitField = this._bitField | 8388608;
	};
	
	Promise.prototype._setAsyncGuaranteed = function() {
	    if (async.hasCustomScheduler()) return;
	    this._bitField = this._bitField | 134217728;
	};
	
	Promise.prototype._receiverAt = function (index) {
	    var ret = index === 0 ? this._receiver0 : this[
	            index * 4 - 4 + 3];
	    if (ret === UNDEFINED_BINDING) {
	        return undefined;
	    } else if (ret === undefined && this._isBound()) {
	        return this._boundValue();
	    }
	    return ret;
	};
	
	Promise.prototype._promiseAt = function (index) {
	    return this[
	            index * 4 - 4 + 2];
	};
	
	Promise.prototype._fulfillmentHandlerAt = function (index) {
	    return this[
	            index * 4 - 4 + 0];
	};
	
	Promise.prototype._rejectionHandlerAt = function (index) {
	    return this[
	            index * 4 - 4 + 1];
	};
	
	Promise.prototype._boundValue = function() {};
	
	Promise.prototype._migrateCallback0 = function (follower) {
	    var bitField = follower._bitField;
	    var fulfill = follower._fulfillmentHandler0;
	    var reject = follower._rejectionHandler0;
	    var promise = follower._promise0;
	    var receiver = follower._receiverAt(0);
	    if (receiver === undefined) receiver = UNDEFINED_BINDING;
	    this._addCallbacks(fulfill, reject, promise, receiver, null);
	};
	
	Promise.prototype._migrateCallbackAt = function (follower, index) {
	    var fulfill = follower._fulfillmentHandlerAt(index);
	    var reject = follower._rejectionHandlerAt(index);
	    var promise = follower._promiseAt(index);
	    var receiver = follower._receiverAt(index);
	    if (receiver === undefined) receiver = UNDEFINED_BINDING;
	    this._addCallbacks(fulfill, reject, promise, receiver, null);
	};
	
	Promise.prototype._addCallbacks = function (
	    fulfill,
	    reject,
	    promise,
	    receiver,
	    domain
	) {
	    var index = this._length();
	
	    if (index >= 65535 - 4) {
	        index = 0;
	        this._setLength(0);
	    }
	
	    if (index === 0) {
	        this._promise0 = promise;
	        this._receiver0 = receiver;
	        if (typeof fulfill === "function") {
	            this._fulfillmentHandler0 =
	                domain === null ? fulfill : util.domainBind(domain, fulfill);
	        }
	        if (typeof reject === "function") {
	            this._rejectionHandler0 =
	                domain === null ? reject : util.domainBind(domain, reject);
	        }
	    } else {
	        var base = index * 4 - 4;
	        this[base + 2] = promise;
	        this[base + 3] = receiver;
	        if (typeof fulfill === "function") {
	            this[base + 0] =
	                domain === null ? fulfill : util.domainBind(domain, fulfill);
	        }
	        if (typeof reject === "function") {
	            this[base + 1] =
	                domain === null ? reject : util.domainBind(domain, reject);
	        }
	    }
	    this._setLength(index + 1);
	    return index;
	};
	
	Promise.prototype._proxy = function (proxyable, arg) {
	    this._addCallbacks(undefined, undefined, arg, proxyable, null);
	};
	
	Promise.prototype._resolveCallback = function(value, shouldBind) {
	    if (((this._bitField & 117506048) !== 0)) return;
	    if (value === this)
	        return this._rejectCallback(makeSelfResolutionError(), false);
	    var maybePromise = tryConvertToPromise(value, this);
	    if (!(maybePromise instanceof Promise)) return this._fulfill(value);
	
	    if (shouldBind) this._propagateFrom(maybePromise, 2);
	
	    var promise = maybePromise._target();
	
	    if (promise === this) {
	        this._reject(makeSelfResolutionError());
	        return;
	    }
	
	    var bitField = promise._bitField;
	    if (((bitField & 50397184) === 0)) {
	        var len = this._length();
	        if (len > 0) promise._migrateCallback0(this);
	        for (var i = 1; i < len; ++i) {
	            promise._migrateCallbackAt(this, i);
	        }
	        this._setFollowing();
	        this._setLength(0);
	        this._setFollowee(promise);
	    } else if (((bitField & 33554432) !== 0)) {
	        this._fulfill(promise._value());
	    } else if (((bitField & 16777216) !== 0)) {
	        this._reject(promise._reason());
	    } else {
	        var reason = new CancellationError("late cancellation observer");
	        promise._attachExtraTrace(reason);
	        this._reject(reason);
	    }
	};
	
	Promise.prototype._rejectCallback =
	function(reason, synchronous, ignoreNonErrorWarnings) {
	    var trace = util.ensureErrorObject(reason);
	    var hasStack = trace === reason;
	    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
	        var message = "a promise was rejected with a non-error: " +
	            util.classString(reason);
	        this._warn(message, true);
	    }
	    this._attachExtraTrace(trace, synchronous ? hasStack : false);
	    this._reject(reason);
	};
	
	Promise.prototype._resolveFromExecutor = function (executor) {
	    var promise = this;
	    this._captureStackTrace();
	    this._pushContext();
	    var synchronous = true;
	    var r = this._execute(executor, function(value) {
	        promise._resolveCallback(value);
	    }, function (reason) {
	        promise._rejectCallback(reason, synchronous);
	    });
	    synchronous = false;
	    this._popContext();
	
	    if (r !== undefined) {
	        promise._rejectCallback(r, true);
	    }
	};
	
	Promise.prototype._settlePromiseFromHandler = function (
	    handler, receiver, value, promise
	) {
	    var bitField = promise._bitField;
	    if (((bitField & 65536) !== 0)) return;
	    promise._pushContext();
	    var x;
	    if (receiver === APPLY) {
	        if (!value || typeof value.length !== "number") {
	            x = errorObj;
	            x.e = new TypeError("cannot .spread() a non-array: " +
	                                    util.classString(value));
	        } else {
	            x = tryCatch(handler).apply(this._boundValue(), value);
	        }
	    } else {
	        x = tryCatch(handler).call(receiver, value);
	    }
	    var promiseCreated = promise._popContext();
	    bitField = promise._bitField;
	    if (((bitField & 65536) !== 0)) return;
	
	    if (x === NEXT_FILTER) {
	        promise._reject(value);
	    } else if (x === errorObj) {
	        promise._rejectCallback(x.e, false);
	    } else {
	        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
	        promise._resolveCallback(x);
	    }
	};
	
	Promise.prototype._target = function() {
	    var ret = this;
	    while (ret._isFollowing()) ret = ret._followee();
	    return ret;
	};
	
	Promise.prototype._followee = function() {
	    return this._rejectionHandler0;
	};
	
	Promise.prototype._setFollowee = function(promise) {
	    this._rejectionHandler0 = promise;
	};
	
	Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
	    var isPromise = promise instanceof Promise;
	    var bitField = this._bitField;
	    var asyncGuaranteed = ((bitField & 134217728) !== 0);
	    if (((bitField & 65536) !== 0)) {
	        if (isPromise) promise._invokeInternalOnCancel();
	
	        if (receiver instanceof PassThroughHandlerContext &&
	            receiver.isFinallyHandler()) {
	            receiver.cancelPromise = promise;
	            if (tryCatch(handler).call(receiver, value) === errorObj) {
	                promise._reject(errorObj.e);
	            }
	        } else if (handler === reflectHandler) {
	            promise._fulfill(reflectHandler.call(receiver));
	        } else if (receiver instanceof Proxyable) {
	            receiver._promiseCancelled(promise);
	        } else if (isPromise || promise instanceof PromiseArray) {
	            promise._cancel();
	        } else {
	            receiver.cancel();
	        }
	    } else if (typeof handler === "function") {
	        if (!isPromise) {
	            handler.call(receiver, value, promise);
	        } else {
	            if (asyncGuaranteed) promise._setAsyncGuaranteed();
	            this._settlePromiseFromHandler(handler, receiver, value, promise);
	        }
	    } else if (receiver instanceof Proxyable) {
	        if (!receiver._isResolved()) {
	            if (((bitField & 33554432) !== 0)) {
	                receiver._promiseFulfilled(value, promise);
	            } else {
	                receiver._promiseRejected(value, promise);
	            }
	        }
	    } else if (isPromise) {
	        if (asyncGuaranteed) promise._setAsyncGuaranteed();
	        if (((bitField & 33554432) !== 0)) {
	            promise._fulfill(value);
	        } else {
	            promise._reject(value);
	        }
	    }
	};
	
	Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
	    var handler = ctx.handler;
	    var promise = ctx.promise;
	    var receiver = ctx.receiver;
	    var value = ctx.value;
	    if (typeof handler === "function") {
	        if (!(promise instanceof Promise)) {
	            handler.call(receiver, value, promise);
	        } else {
	            this._settlePromiseFromHandler(handler, receiver, value, promise);
	        }
	    } else if (promise instanceof Promise) {
	        promise._reject(value);
	    }
	};
	
	Promise.prototype._settlePromiseCtx = function(ctx) {
	    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
	};
	
	Promise.prototype._settlePromise0 = function(handler, value, bitField) {
	    var promise = this._promise0;
	    var receiver = this._receiverAt(0);
	    this._promise0 = undefined;
	    this._receiver0 = undefined;
	    this._settlePromise(promise, handler, receiver, value);
	};
	
	Promise.prototype._clearCallbackDataAtIndex = function(index) {
	    var base = index * 4 - 4;
	    this[base + 2] =
	    this[base + 3] =
	    this[base + 0] =
	    this[base + 1] = undefined;
	};
	
	Promise.prototype._fulfill = function (value) {
	    var bitField = this._bitField;
	    if (((bitField & 117506048) >>> 16)) return;
	    if (value === this) {
	        var err = makeSelfResolutionError();
	        this._attachExtraTrace(err);
	        return this._reject(err);
	    }
	    this._setFulfilled();
	    this._rejectionHandler0 = value;
	
	    if ((bitField & 65535) > 0) {
	        if (((bitField & 134217728) !== 0)) {
	            this._settlePromises();
	        } else {
	            async.settlePromises(this);
	        }
	    }
	};
	
	Promise.prototype._reject = function (reason) {
	    var bitField = this._bitField;
	    if (((bitField & 117506048) >>> 16)) return;
	    this._setRejected();
	    this._fulfillmentHandler0 = reason;
	
	    if (this._isFinal()) {
	        return async.fatalError(reason, util.isNode);
	    }
	
	    if ((bitField & 65535) > 0) {
	        async.settlePromises(this);
	    } else {
	        this._ensurePossibleRejectionHandled();
	    }
	};
	
	Promise.prototype._fulfillPromises = function (len, value) {
	    for (var i = 1; i < len; i++) {
	        var handler = this._fulfillmentHandlerAt(i);
	        var promise = this._promiseAt(i);
	        var receiver = this._receiverAt(i);
	        this._clearCallbackDataAtIndex(i);
	        this._settlePromise(promise, handler, receiver, value);
	    }
	};
	
	Promise.prototype._rejectPromises = function (len, reason) {
	    for (var i = 1; i < len; i++) {
	        var handler = this._rejectionHandlerAt(i);
	        var promise = this._promiseAt(i);
	        var receiver = this._receiverAt(i);
	        this._clearCallbackDataAtIndex(i);
	        this._settlePromise(promise, handler, receiver, reason);
	    }
	};
	
	Promise.prototype._settlePromises = function () {
	    var bitField = this._bitField;
	    var len = (bitField & 65535);
	
	    if (len > 0) {
	        if (((bitField & 16842752) !== 0)) {
	            var reason = this._fulfillmentHandler0;
	            this._settlePromise0(this._rejectionHandler0, reason, bitField);
	            this._rejectPromises(len, reason);
	        } else {
	            var value = this._rejectionHandler0;
	            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
	            this._fulfillPromises(len, value);
	        }
	        this._setLength(0);
	    }
	    this._clearCancellationData();
	};
	
	Promise.prototype._settledValue = function() {
	    var bitField = this._bitField;
	    if (((bitField & 33554432) !== 0)) {
	        return this._rejectionHandler0;
	    } else if (((bitField & 16777216) !== 0)) {
	        return this._fulfillmentHandler0;
	    }
	};
	
	function deferResolve(v) {this.promise._resolveCallback(v);}
	function deferReject(v) {this.promise._rejectCallback(v, false);}
	
	Promise.defer = Promise.pending = function() {
	    debug.deprecated("Promise.defer", "new Promise");
	    var promise = new Promise(INTERNAL);
	    return {
	        promise: promise,
	        resolve: deferResolve,
	        reject: deferReject
	    };
	};
	
	util.notEnumerableProp(Promise,
	                       "_makeSelfResolutionError",
	                       makeSelfResolutionError);
	
	_dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection,
	    debug);
	_dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
	_dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
	_dereq_("./direct_resolve")(Promise);
	_dereq_("./synchronous_inspection")(Promise);
	_dereq_("./join")(
	    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);
	Promise.Promise = Promise;
	Promise.version = "3.4.6";
	_dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
	_dereq_('./call_get.js')(Promise);
	_dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
	_dereq_('./timers.js')(Promise, INTERNAL, debug);
	_dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
	_dereq_('./nodeify.js')(Promise);
	_dereq_('./promisify.js')(Promise, INTERNAL);
	_dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
	_dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
	_dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
	_dereq_('./settle.js')(Promise, PromiseArray, debug);
	_dereq_('./some.js')(Promise, PromiseArray, apiRejection);
	_dereq_('./filter.js')(Promise, INTERNAL);
	_dereq_('./each.js')(Promise, INTERNAL);
	_dereq_('./any.js')(Promise);
	                                                         
	    util.toFastProperties(Promise);                                          
	    util.toFastProperties(Promise.prototype);                                
	    function fillTypes(value) {                                              
	        var p = new Promise(INTERNAL);                                       
	        p._fulfillmentHandler0 = value;                                      
	        p._rejectionHandler0 = value;                                        
	        p._promise0 = value;                                                 
	        p._receiver0 = value;                                                
	    }                                                                        
	    // Complete slack tracking, opt out of field-type tracking and           
	    // stabilize map                                                         
	    fillTypes({a: 1});                                                       
	    fillTypes({b: 2});                                                       
	    fillTypes({c: 3});                                                       
	    fillTypes(1);                                                            
	    fillTypes(function(){});                                                 
	    fillTypes(undefined);                                                    
	    fillTypes(false);                                                        
	    fillTypes(new Promise(INTERNAL));                                        
	    debug.setBounds(Async.firstLineError, util.lastLineError);               
	    return Promise;                                                          
	
	};
	
	},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise, INTERNAL, tryConvertToPromise,
	    apiRejection, Proxyable) {
	var util = _dereq_("./util");
	var isArray = util.isArray;
	
	function toResolutionValue(val) {
	    switch(val) {
	    case -2: return [];
	    case -3: return {};
	    }
	}
	
	function PromiseArray(values) {
	    var promise = this._promise = new Promise(INTERNAL);
	    if (values instanceof Promise) {
	        promise._propagateFrom(values, 3);
	    }
	    promise._setOnCancel(this);
	    this._values = values;
	    this._length = 0;
	    this._totalResolved = 0;
	    this._init(undefined, -2);
	}
	util.inherits(PromiseArray, Proxyable);
	
	PromiseArray.prototype.length = function () {
	    return this._length;
	};
	
	PromiseArray.prototype.promise = function () {
	    return this._promise;
	};
	
	PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
	    var values = tryConvertToPromise(this._values, this._promise);
	    if (values instanceof Promise) {
	        values = values._target();
	        var bitField = values._bitField;
	        ;
	        this._values = values;
	
	        if (((bitField & 50397184) === 0)) {
	            this._promise._setAsyncGuaranteed();
	            return values._then(
	                init,
	                this._reject,
	                undefined,
	                this,
	                resolveValueIfEmpty
	           );
	        } else if (((bitField & 33554432) !== 0)) {
	            values = values._value();
	        } else if (((bitField & 16777216) !== 0)) {
	            return this._reject(values._reason());
	        } else {
	            return this._cancel();
	        }
	    }
	    values = util.asArray(values);
	    if (values === null) {
	        var err = apiRejection(
	            "expecting an array or an iterable object but got " + util.classString(values)).reason();
	        this._promise._rejectCallback(err, false);
	        return;
	    }
	
	    if (values.length === 0) {
	        if (resolveValueIfEmpty === -5) {
	            this._resolveEmptyArray();
	        }
	        else {
	            this._resolve(toResolutionValue(resolveValueIfEmpty));
	        }
	        return;
	    }
	    this._iterate(values);
	};
	
	PromiseArray.prototype._iterate = function(values) {
	    var len = this.getActualLength(values.length);
	    this._length = len;
	    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
	    var result = this._promise;
	    var isResolved = false;
	    var bitField = null;
	    for (var i = 0; i < len; ++i) {
	        var maybePromise = tryConvertToPromise(values[i], result);
	
	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            bitField = maybePromise._bitField;
	        } else {
	            bitField = null;
	        }
	
	        if (isResolved) {
	            if (bitField !== null) {
	                maybePromise.suppressUnhandledRejections();
	            }
	        } else if (bitField !== null) {
	            if (((bitField & 50397184) === 0)) {
	                maybePromise._proxy(this, i);
	                this._values[i] = maybePromise;
	            } else if (((bitField & 33554432) !== 0)) {
	                isResolved = this._promiseFulfilled(maybePromise._value(), i);
	            } else if (((bitField & 16777216) !== 0)) {
	                isResolved = this._promiseRejected(maybePromise._reason(), i);
	            } else {
	                isResolved = this._promiseCancelled(i);
	            }
	        } else {
	            isResolved = this._promiseFulfilled(maybePromise, i);
	        }
	    }
	    if (!isResolved) result._setAsyncGuaranteed();
	};
	
	PromiseArray.prototype._isResolved = function () {
	    return this._values === null;
	};
	
	PromiseArray.prototype._resolve = function (value) {
	    this._values = null;
	    this._promise._fulfill(value);
	};
	
	PromiseArray.prototype._cancel = function() {
	    if (this._isResolved() || !this._promise._isCancellable()) return;
	    this._values = null;
	    this._promise._cancel();
	};
	
	PromiseArray.prototype._reject = function (reason) {
	    this._values = null;
	    this._promise._rejectCallback(reason, false);
	};
	
	PromiseArray.prototype._promiseFulfilled = function (value, index) {
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	        return true;
	    }
	    return false;
	};
	
	PromiseArray.prototype._promiseCancelled = function() {
	    this._cancel();
	    return true;
	};
	
	PromiseArray.prototype._promiseRejected = function (reason) {
	    this._totalResolved++;
	    this._reject(reason);
	    return true;
	};
	
	PromiseArray.prototype._resultCancelled = function() {
	    if (this._isResolved()) return;
	    var values = this._values;
	    this._cancel();
	    if (values instanceof Promise) {
	        values.cancel();
	    } else {
	        for (var i = 0; i < values.length; ++i) {
	            if (values[i] instanceof Promise) {
	                values[i].cancel();
	            }
	        }
	    }
	};
	
	PromiseArray.prototype.shouldCopyValues = function () {
	    return true;
	};
	
	PromiseArray.prototype.getActualLength = function (len) {
	    return len;
	};
	
	return PromiseArray;
	};
	
	},{"./util":36}],24:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var THIS = {};
	var util = _dereq_("./util");
	var nodebackForPromise = _dereq_("./nodeback");
	var withAppended = util.withAppended;
	var maybeWrapAsError = util.maybeWrapAsError;
	var canEvaluate = util.canEvaluate;
	var TypeError = _dereq_("./errors").TypeError;
	var defaultSuffix = "Async";
	var defaultPromisified = {__isPromisified__: true};
	var noCopyProps = [
	    "arity",    "length",
	    "name",
	    "arguments",
	    "caller",
	    "callee",
	    "prototype",
	    "__isPromisified__"
	];
	var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");
	
	var defaultFilter = function(name) {
	    return util.isIdentifier(name) &&
	        name.charAt(0) !== "_" &&
	        name !== "constructor";
	};
	
	function propsFilter(key) {
	    return !noCopyPropsPattern.test(key);
	}
	
	function isPromisified(fn) {
	    try {
	        return fn.__isPromisified__ === true;
	    }
	    catch (e) {
	        return false;
	    }
	}
	
	function hasPromisified(obj, key, suffix) {
	    var val = util.getDataPropertyOrDefault(obj, key + suffix,
	                                            defaultPromisified);
	    return val ? isPromisified(val) : false;
	}
	function checkValid(ret, suffix, suffixRegexp) {
	    for (var i = 0; i < ret.length; i += 2) {
	        var key = ret[i];
	        if (suffixRegexp.test(key)) {
	            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
	            for (var j = 0; j < ret.length; j += 2) {
	                if (ret[j] === keyWithoutAsyncSuffix) {
	                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
	                        .replace("%s", suffix));
	                }
	            }
	        }
	    }
	}
	
	function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
	    var keys = util.inheritedDataKeys(obj);
	    var ret = [];
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var value = obj[key];
	        var passesDefaultFilter = filter === defaultFilter
	            ? true : defaultFilter(key, value, obj);
	        if (typeof value === "function" &&
	            !isPromisified(value) &&
	            !hasPromisified(obj, key, suffix) &&
	            filter(key, value, obj, passesDefaultFilter)) {
	            ret.push(key, value);
	        }
	    }
	    checkValid(ret, suffix, suffixRegexp);
	    return ret;
	}
	
	var escapeIdentRegex = function(str) {
	    return str.replace(/([$])/, "\\$");
	};
	
	var makeNodePromisifiedEval;
	if (false) {
	var switchCaseArgumentOrder = function(likelyArgumentCount) {
	    var ret = [likelyArgumentCount];
	    var min = Math.max(0, likelyArgumentCount - 1 - 3);
	    for(var i = likelyArgumentCount - 1; i >= min; --i) {
	        ret.push(i);
	    }
	    for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
	        ret.push(i);
	    }
	    return ret;
	};
	
	var argumentSequence = function(argumentCount) {
	    return util.filledRange(argumentCount, "_arg", "");
	};
	
	var parameterDeclaration = function(parameterCount) {
	    return util.filledRange(
	        Math.max(parameterCount, 3), "_arg", "");
	};
	
	var parameterCount = function(fn) {
	    if (typeof fn.length === "number") {
	        return Math.max(Math.min(fn.length, 1023 + 1), 0);
	    }
	    return 0;
	};
	
	makeNodePromisifiedEval =
	function(callback, receiver, originalName, fn, _, multiArgs) {
	    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
	    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
	    var shouldProxyThis = typeof callback === "string" || receiver === THIS;
	
	    function generateCallForArgumentCount(count) {
	        var args = argumentSequence(count).join(", ");
	        var comma = count > 0 ? ", " : "";
	        var ret;
	        if (shouldProxyThis) {
	            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
	        } else {
	            ret = receiver === undefined
	                ? "ret = callback({{args}}, nodeback); break;\n"
	                : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
	        }
	        return ret.replace("{{args}}", args).replace(", ", comma);
	    }
	
	    function generateArgumentSwitchCase() {
	        var ret = "";
	        for (var i = 0; i < argumentOrder.length; ++i) {
	            ret += "case " + argumentOrder[i] +":" +
	                generateCallForArgumentCount(argumentOrder[i]);
	        }
	
	        ret += "                                                             \n\
	        default:                                                             \n\
	            var args = new Array(len + 1);                                   \n\
	            var i = 0;                                                       \n\
	            for (var i = 0; i < len; ++i) {                                  \n\
	               args[i] = arguments[i];                                       \n\
	            }                                                                \n\
	            args[i] = nodeback;                                              \n\
	            [CodeForCall]                                                    \n\
	            break;                                                           \n\
	        ".replace("[CodeForCall]", (shouldProxyThis
	                                ? "ret = callback.apply(this, args);\n"
	                                : "ret = callback.apply(receiver, args);\n"));
	        return ret;
	    }
	
	    var getFunctionCode = typeof callback === "string"
	                                ? ("this != null ? this['"+callback+"'] : fn")
	                                : "fn";
	    var body = "'use strict';                                                \n\
	        var ret = function (Parameters) {                                    \n\
	            'use strict';                                                    \n\
	            var len = arguments.length;                                      \n\
	            var promise = new Promise(INTERNAL);                             \n\
	            promise._captureStackTrace();                                    \n\
	            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
	            var ret;                                                         \n\
	            var callback = tryCatch([GetFunctionCode]);                      \n\
	            switch(len) {                                                    \n\
	                [CodeForSwitchCase]                                          \n\
	            }                                                                \n\
	            if (ret === errorObj) {                                          \n\
	                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
	            }                                                                \n\
	            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
	            return promise;                                                  \n\
	        };                                                                   \n\
	        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
	        return ret;                                                          \n\
	    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
	        .replace("[GetFunctionCode]", getFunctionCode);
	    body = body.replace("Parameters", parameterDeclaration(newParameterCount));
	    return new Function("Promise",
	                        "fn",
	                        "receiver",
	                        "withAppended",
	                        "maybeWrapAsError",
	                        "nodebackForPromise",
	                        "tryCatch",
	                        "errorObj",
	                        "notEnumerableProp",
	                        "INTERNAL",
	                        body)(
	                    Promise,
	                    fn,
	                    receiver,
	                    withAppended,
	                    maybeWrapAsError,
	                    nodebackForPromise,
	                    util.tryCatch,
	                    util.errorObj,
	                    util.notEnumerableProp,
	                    INTERNAL);
	};
	}
	
	function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
	    var defaultThis = (function() {return this;})();
	    var method = callback;
	    if (typeof method === "string") {
	        callback = fn;
	    }
	    function promisified() {
	        var _receiver = receiver;
	        if (receiver === THIS) _receiver = this;
	        var promise = new Promise(INTERNAL);
	        promise._captureStackTrace();
	        var cb = typeof method === "string" && this !== defaultThis
	            ? this[method] : callback;
	        var fn = nodebackForPromise(promise, multiArgs);
	        try {
	            cb.apply(_receiver, withAppended(arguments, fn));
	        } catch(e) {
	            promise._rejectCallback(maybeWrapAsError(e), true, true);
	        }
	        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
	        return promise;
	    }
	    util.notEnumerableProp(promisified, "__isPromisified__", true);
	    return promisified;
	}
	
	var makeNodePromisified = canEvaluate
	    ? makeNodePromisifiedEval
	    : makeNodePromisifiedClosure;
	
	function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
	    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
	    var methods =
	        promisifiableMethods(obj, suffix, suffixRegexp, filter);
	
	    for (var i = 0, len = methods.length; i < len; i+= 2) {
	        var key = methods[i];
	        var fn = methods[i+1];
	        var promisifiedKey = key + suffix;
	        if (promisifier === makeNodePromisified) {
	            obj[promisifiedKey] =
	                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
	        } else {
	            var promisified = promisifier(fn, function() {
	                return makeNodePromisified(key, THIS, key,
	                                           fn, suffix, multiArgs);
	            });
	            util.notEnumerableProp(promisified, "__isPromisified__", true);
	            obj[promisifiedKey] = promisified;
	        }
	    }
	    util.toFastProperties(obj);
	    return obj;
	}
	
	function promisify(callback, receiver, multiArgs) {
	    return makeNodePromisified(callback, receiver, undefined,
	                                callback, null, multiArgs);
	}
	
	Promise.promisify = function (fn, options) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    if (isPromisified(fn)) {
	        return fn;
	    }
	    options = Object(options);
	    var receiver = options.context === undefined ? THIS : options.context;
	    var multiArgs = !!options.multiArgs;
	    var ret = promisify(fn, receiver, multiArgs);
	    util.copyDescriptors(fn, ret, propsFilter);
	    return ret;
	};
	
	Promise.promisifyAll = function (target, options) {
	    if (typeof target !== "function" && typeof target !== "object") {
	        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    options = Object(options);
	    var multiArgs = !!options.multiArgs;
	    var suffix = options.suffix;
	    if (typeof suffix !== "string") suffix = defaultSuffix;
	    var filter = options.filter;
	    if (typeof filter !== "function") filter = defaultFilter;
	    var promisifier = options.promisifier;
	    if (typeof promisifier !== "function") promisifier = makeNodePromisified;
	
	    if (!util.isIdentifier(suffix)) {
	        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	
	    var keys = util.inheritedDataKeys(target);
	    for (var i = 0; i < keys.length; ++i) {
	        var value = target[keys[i]];
	        if (keys[i] !== "constructor" &&
	            util.isClass(value)) {
	            promisifyAll(value.prototype, suffix, filter, promisifier,
	                multiArgs);
	            promisifyAll(value, suffix, filter, promisifier, multiArgs);
	        }
	    }
	
	    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
	};
	};
	
	
	},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(
	    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
	var util = _dereq_("./util");
	var isObject = util.isObject;
	var es5 = _dereq_("./es5");
	var Es6Map;
	if (typeof Map === "function") Es6Map = Map;
	
	var mapToEntries = (function() {
	    var index = 0;
	    var size = 0;
	
	    function extractEntry(value, key) {
	        this[index] = value;
	        this[index + size] = key;
	        index++;
	    }
	
	    return function mapToEntries(map) {
	        size = map.size;
	        index = 0;
	        var ret = new Array(map.size * 2);
	        map.forEach(extractEntry, ret);
	        return ret;
	    };
	})();
	
	var entriesToMap = function(entries) {
	    var ret = new Es6Map();
	    var length = entries.length / 2 | 0;
	    for (var i = 0; i < length; ++i) {
	        var key = entries[length + i];
	        var value = entries[i];
	        ret.set(key, value);
	    }
	    return ret;
	};
	
	function PropertiesPromiseArray(obj) {
	    var isMap = false;
	    var entries;
	    if (Es6Map !== undefined && obj instanceof Es6Map) {
	        entries = mapToEntries(obj);
	        isMap = true;
	    } else {
	        var keys = es5.keys(obj);
	        var len = keys.length;
	        entries = new Array(len * 2);
	        for (var i = 0; i < len; ++i) {
	            var key = keys[i];
	            entries[i] = obj[key];
	            entries[i + len] = key;
	        }
	    }
	    this.constructor$(entries);
	    this._isMap = isMap;
	    this._init$(undefined, -3);
	}
	util.inherits(PropertiesPromiseArray, PromiseArray);
	
	PropertiesPromiseArray.prototype._init = function () {};
	
	PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        var val;
	        if (this._isMap) {
	            val = entriesToMap(this._values);
	        } else {
	            val = {};
	            var keyOffset = this.length();
	            for (var i = 0, len = this.length(); i < len; ++i) {
	                val[this._values[i + keyOffset]] = this._values[i];
	            }
	        }
	        this._resolve(val);
	        return true;
	    }
	    return false;
	};
	
	PropertiesPromiseArray.prototype.shouldCopyValues = function () {
	    return false;
	};
	
	PropertiesPromiseArray.prototype.getActualLength = function (len) {
	    return len >> 1;
	};
	
	function props(promises) {
	    var ret;
	    var castValue = tryConvertToPromise(promises);
	
	    if (!isObject(castValue)) {
	        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    } else if (castValue instanceof Promise) {
	        ret = castValue._then(
	            Promise.props, undefined, undefined, undefined, undefined);
	    } else {
	        ret = new PropertiesPromiseArray(castValue).promise();
	    }
	
	    if (castValue instanceof Promise) {
	        ret._propagateFrom(castValue, 2);
	    }
	    return ret;
	}
	
	Promise.prototype.props = function () {
	    return props(this);
	};
	
	Promise.props = function (promises) {
	    return props(promises);
	};
	};
	
	},{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){
	"use strict";
	function arrayMove(src, srcIndex, dst, dstIndex, len) {
	    for (var j = 0; j < len; ++j) {
	        dst[j + dstIndex] = src[j + srcIndex];
	        src[j + srcIndex] = void 0;
	    }
	}
	
	function Queue(capacity) {
	    this._capacity = capacity;
	    this._length = 0;
	    this._front = 0;
	}
	
	Queue.prototype._willBeOverCapacity = function (size) {
	    return this._capacity < size;
	};
	
	Queue.prototype._pushOne = function (arg) {
	    var length = this.length();
	    this._checkCapacity(length + 1);
	    var i = (this._front + length) & (this._capacity - 1);
	    this[i] = arg;
	    this._length = length + 1;
	};
	
	Queue.prototype._unshiftOne = function(value) {
	    var capacity = this._capacity;
	    this._checkCapacity(this.length() + 1);
	    var front = this._front;
	    var i = (((( front - 1 ) &
	                    ( capacity - 1) ) ^ capacity ) - capacity );
	    this[i] = value;
	    this._front = i;
	    this._length = this.length() + 1;
	};
	
	Queue.prototype.unshift = function(fn, receiver, arg) {
	    this._unshiftOne(arg);
	    this._unshiftOne(receiver);
	    this._unshiftOne(fn);
	};
	
	Queue.prototype.push = function (fn, receiver, arg) {
	    var length = this.length() + 3;
	    if (this._willBeOverCapacity(length)) {
	        this._pushOne(fn);
	        this._pushOne(receiver);
	        this._pushOne(arg);
	        return;
	    }
	    var j = this._front + length - 3;
	    this._checkCapacity(length);
	    var wrapMask = this._capacity - 1;
	    this[(j + 0) & wrapMask] = fn;
	    this[(j + 1) & wrapMask] = receiver;
	    this[(j + 2) & wrapMask] = arg;
	    this._length = length;
	};
	
	Queue.prototype.shift = function () {
	    var front = this._front,
	        ret = this[front];
	
	    this[front] = undefined;
	    this._front = (front + 1) & (this._capacity - 1);
	    this._length--;
	    return ret;
	};
	
	Queue.prototype.length = function () {
	    return this._length;
	};
	
	Queue.prototype._checkCapacity = function (size) {
	    if (this._capacity < size) {
	        this._resizeTo(this._capacity << 1);
	    }
	};
	
	Queue.prototype._resizeTo = function (capacity) {
	    var oldCapacity = this._capacity;
	    this._capacity = capacity;
	    var front = this._front;
	    var length = this._length;
	    var moveItemsCount = (front + length) & (oldCapacity - 1);
	    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
	};
	
	module.exports = Queue;
	
	},{}],27:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(
	    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
	var util = _dereq_("./util");
	
	var raceLater = function (promise) {
	    return promise.then(function(array) {
	        return race(array, promise);
	    });
	};
	
	function race(promises, parent) {
	    var maybePromise = tryConvertToPromise(promises);
	
	    if (maybePromise instanceof Promise) {
	        return raceLater(maybePromise);
	    } else {
	        promises = util.asArray(promises);
	        if (promises === null)
	            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
	    }
	
	    var ret = new Promise(INTERNAL);
	    if (parent !== undefined) {
	        ret._propagateFrom(parent, 3);
	    }
	    var fulfill = ret._fulfill;
	    var reject = ret._reject;
	    for (var i = 0, len = promises.length; i < len; ++i) {
	        var val = promises[i];
	
	        if (val === undefined && !(i in promises)) {
	            continue;
	        }
	
	        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
	    }
	    return ret;
	}
	
	Promise.race = function (promises) {
	    return race(promises, undefined);
	};
	
	Promise.prototype.race = function () {
	    return race(this, undefined);
	};
	
	};
	
	},{"./util":36}],28:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise,
	                          PromiseArray,
	                          apiRejection,
	                          tryConvertToPromise,
	                          INTERNAL,
	                          debug) {
	var getDomain = Promise._getDomain;
	var util = _dereq_("./util");
	var tryCatch = util.tryCatch;
	
	function ReductionPromiseArray(promises, fn, initialValue, _each) {
	    this.constructor$(promises);
	    var domain = getDomain();
	    this._fn = domain === null ? fn : util.domainBind(domain, fn);
	    if (initialValue !== undefined) {
	        initialValue = Promise.resolve(initialValue);
	        initialValue._attachCancellationCallback(this);
	    }
	    this._initialValue = initialValue;
	    this._currentCancellable = null;
	    if(_each === INTERNAL) {
	        this._eachValues = Array(this._length);
	    } else if (_each === 0) {
	        this._eachValues = null;
	    } else {
	        this._eachValues = undefined;
	    }
	    this._promise._captureStackTrace();
	    this._init$(undefined, -5);
	}
	util.inherits(ReductionPromiseArray, PromiseArray);
	
	ReductionPromiseArray.prototype._gotAccum = function(accum) {
	    if (this._eachValues !== undefined && 
	        this._eachValues !== null && 
	        accum !== INTERNAL) {
	        this._eachValues.push(accum);
	    }
	};
	
	ReductionPromiseArray.prototype._eachComplete = function(value) {
	    if (this._eachValues !== null) {
	        this._eachValues.push(value);
	    }
	    return this._eachValues;
	};
	
	ReductionPromiseArray.prototype._init = function() {};
	
	ReductionPromiseArray.prototype._resolveEmptyArray = function() {
	    this._resolve(this._eachValues !== undefined ? this._eachValues
	                                                 : this._initialValue);
	};
	
	ReductionPromiseArray.prototype.shouldCopyValues = function () {
	    return false;
	};
	
	ReductionPromiseArray.prototype._resolve = function(value) {
	    this._promise._resolveCallback(value);
	    this._values = null;
	};
	
	ReductionPromiseArray.prototype._resultCancelled = function(sender) {
	    if (sender === this._initialValue) return this._cancel();
	    if (this._isResolved()) return;
	    this._resultCancelled$();
	    if (this._currentCancellable instanceof Promise) {
	        this._currentCancellable.cancel();
	    }
	    if (this._initialValue instanceof Promise) {
	        this._initialValue.cancel();
	    }
	};
	
	ReductionPromiseArray.prototype._iterate = function (values) {
	    this._values = values;
	    var value;
	    var i;
	    var length = values.length;
	    if (this._initialValue !== undefined) {
	        value = this._initialValue;
	        i = 0;
	    } else {
	        value = Promise.resolve(values[0]);
	        i = 1;
	    }
	
	    this._currentCancellable = value;
	
	    if (!value.isRejected()) {
	        for (; i < length; ++i) {
	            var ctx = {
	                accum: null,
	                value: values[i],
	                index: i,
	                length: length,
	                array: this
	            };
	            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
	        }
	    }
	
	    if (this._eachValues !== undefined) {
	        value = value
	            ._then(this._eachComplete, undefined, undefined, this, undefined);
	    }
	    value._then(completed, completed, undefined, value, this);
	};
	
	Promise.prototype.reduce = function (fn, initialValue) {
	    return reduce(this, fn, initialValue, null);
	};
	
	Promise.reduce = function (promises, fn, initialValue, _each) {
	    return reduce(promises, fn, initialValue, _each);
	};
	
	function completed(valueOrReason, array) {
	    if (this.isFulfilled()) {
	        array._resolve(valueOrReason);
	    } else {
	        array._reject(valueOrReason);
	    }
	}
	
	function reduce(promises, fn, initialValue, _each) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
	    return array.promise();
	}
	
	function gotAccum(accum) {
	    this.accum = accum;
	    this.array._gotAccum(accum);
	    var value = tryConvertToPromise(this.value, this.array._promise);
	    if (value instanceof Promise) {
	        this.array._currentCancellable = value;
	        return value._then(gotValue, undefined, undefined, this, undefined);
	    } else {
	        return gotValue.call(this, value);
	    }
	}
	
	function gotValue(value) {
	    var array = this.array;
	    var promise = array._promise;
	    var fn = tryCatch(array._fn);
	    promise._pushContext();
	    var ret;
	    if (array._eachValues !== undefined) {
	        ret = fn.call(promise._boundValue(), value, this.index, this.length);
	    } else {
	        ret = fn.call(promise._boundValue(),
	                              this.accum, value, this.index, this.length);
	    }
	    if (ret instanceof Promise) {
	        array._currentCancellable = ret;
	    }
	    var promiseCreated = promise._popContext();
	    debug.checkForgottenReturns(
	        ret,
	        promiseCreated,
	        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
	        promise
	    );
	    return ret;
	}
	};
	
	},{"./util":36}],29:[function(_dereq_,module,exports){
	"use strict";
	var util = _dereq_("./util");
	var schedule;
	var noAsyncScheduler = function() {
	    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	};
	var NativePromise = util.getNativePromise();
	if (util.isNode && typeof MutationObserver === "undefined") {
	    var GlobalSetImmediate = global.setImmediate;
	    var ProcessNextTick = process.nextTick;
	    schedule = util.isRecentNode
	                ? function(fn) { GlobalSetImmediate.call(global, fn); }
	                : function(fn) { ProcessNextTick.call(process, fn); };
	} else if (typeof NativePromise === "function" &&
	           typeof NativePromise.resolve === "function") {
	    var nativePromise = NativePromise.resolve();
	    schedule = function(fn) {
	        nativePromise.then(fn);
	    };
	} else if ((typeof MutationObserver !== "undefined") &&
	          !(typeof window !== "undefined" &&
	            window.navigator &&
	            (window.navigator.standalone || window.cordova))) {
	    schedule = (function() {
	        var div = document.createElement("div");
	        var opts = {attributes: true};
	        var toggleScheduled = false;
	        var div2 = document.createElement("div");
	        var o2 = new MutationObserver(function() {
	            div.classList.toggle("foo");
	            toggleScheduled = false;
	        });
	        o2.observe(div2, opts);
	
	        var scheduleToggle = function() {
	            if (toggleScheduled) return;
	                toggleScheduled = true;
	                div2.classList.toggle("foo");
	            };
	
	            return function schedule(fn) {
	            var o = new MutationObserver(function() {
	                o.disconnect();
	                fn();
	            });
	            o.observe(div, opts);
	            scheduleToggle();
	        };
	    })();
	} else if (typeof setImmediate !== "undefined") {
	    schedule = function (fn) {
	        setImmediate(fn);
	    };
	} else if (typeof setTimeout !== "undefined") {
	    schedule = function (fn) {
	        setTimeout(fn, 0);
	    };
	} else {
	    schedule = noAsyncScheduler;
	}
	module.exports = schedule;
	
	},{"./util":36}],30:[function(_dereq_,module,exports){
	"use strict";
	module.exports =
	    function(Promise, PromiseArray, debug) {
	var PromiseInspection = Promise.PromiseInspection;
	var util = _dereq_("./util");
	
	function SettledPromiseArray(values) {
	    this.constructor$(values);
	}
	util.inherits(SettledPromiseArray, PromiseArray);
	
	SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
	    this._values[index] = inspection;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	        return true;
	    }
	    return false;
	};
	
	SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    var ret = new PromiseInspection();
	    ret._bitField = 33554432;
	    ret._settledValueField = value;
	    return this._promiseResolved(index, ret);
	};
	SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
	    var ret = new PromiseInspection();
	    ret._bitField = 16777216;
	    ret._settledValueField = reason;
	    return this._promiseResolved(index, ret);
	};
	
	Promise.settle = function (promises) {
	    debug.deprecated(".settle()", ".reflect()");
	    return new SettledPromiseArray(promises).promise();
	};
	
	Promise.prototype.settle = function () {
	    return Promise.settle(this);
	};
	};
	
	},{"./util":36}],31:[function(_dereq_,module,exports){
	"use strict";
	module.exports =
	function(Promise, PromiseArray, apiRejection) {
	var util = _dereq_("./util");
	var RangeError = _dereq_("./errors").RangeError;
	var AggregateError = _dereq_("./errors").AggregateError;
	var isArray = util.isArray;
	var CANCELLATION = {};
	
	
	function SomePromiseArray(values) {
	    this.constructor$(values);
	    this._howMany = 0;
	    this._unwrap = false;
	    this._initialized = false;
	}
	util.inherits(SomePromiseArray, PromiseArray);
	
	SomePromiseArray.prototype._init = function () {
	    if (!this._initialized) {
	        return;
	    }
	    if (this._howMany === 0) {
	        this._resolve([]);
	        return;
	    }
	    this._init$(undefined, -5);
	    var isArrayResolved = isArray(this._values);
	    if (!this._isResolved() &&
	        isArrayResolved &&
	        this._howMany > this._canPossiblyFulfill()) {
	        this._reject(this._getRangeError(this.length()));
	    }
	};
	
	SomePromiseArray.prototype.init = function () {
	    this._initialized = true;
	    this._init();
	};
	
	SomePromiseArray.prototype.setUnwrap = function () {
	    this._unwrap = true;
	};
	
	SomePromiseArray.prototype.howMany = function () {
	    return this._howMany;
	};
	
	SomePromiseArray.prototype.setHowMany = function (count) {
	    this._howMany = count;
	};
	
	SomePromiseArray.prototype._promiseFulfilled = function (value) {
	    this._addFulfilled(value);
	    if (this._fulfilled() === this.howMany()) {
	        this._values.length = this.howMany();
	        if (this.howMany() === 1 && this._unwrap) {
	            this._resolve(this._values[0]);
	        } else {
	            this._resolve(this._values);
	        }
	        return true;
	    }
	    return false;
	
	};
	SomePromiseArray.prototype._promiseRejected = function (reason) {
	    this._addRejected(reason);
	    return this._checkOutcome();
	};
	
	SomePromiseArray.prototype._promiseCancelled = function () {
	    if (this._values instanceof Promise || this._values == null) {
	        return this._cancel();
	    }
	    this._addRejected(CANCELLATION);
	    return this._checkOutcome();
	};
	
	SomePromiseArray.prototype._checkOutcome = function() {
	    if (this.howMany() > this._canPossiblyFulfill()) {
	        var e = new AggregateError();
	        for (var i = this.length(); i < this._values.length; ++i) {
	            if (this._values[i] !== CANCELLATION) {
	                e.push(this._values[i]);
	            }
	        }
	        if (e.length > 0) {
	            this._reject(e);
	        } else {
	            this._cancel();
	        }
	        return true;
	    }
	    return false;
	};
	
	SomePromiseArray.prototype._fulfilled = function () {
	    return this._totalResolved;
	};
	
	SomePromiseArray.prototype._rejected = function () {
	    return this._values.length - this.length();
	};
	
	SomePromiseArray.prototype._addRejected = function (reason) {
	    this._values.push(reason);
	};
	
	SomePromiseArray.prototype._addFulfilled = function (value) {
	    this._values[this._totalResolved++] = value;
	};
	
	SomePromiseArray.prototype._canPossiblyFulfill = function () {
	    return this.length() - this._rejected();
	};
	
	SomePromiseArray.prototype._getRangeError = function (count) {
	    var message = "Input array must contain at least " +
	            this._howMany + " items but contains only " + count + " items";
	    return new RangeError(message);
	};
	
	SomePromiseArray.prototype._resolveEmptyArray = function () {
	    this._reject(this._getRangeError(0));
	};
	
	function some(promises, howMany) {
	    if ((howMany | 0) !== howMany || howMany < 0) {
	        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    ret.setHowMany(howMany);
	    ret.init();
	    return promise;
	}
	
	Promise.some = function (promises, howMany) {
	    return some(promises, howMany);
	};
	
	Promise.prototype.some = function (howMany) {
	    return some(this, howMany);
	};
	
	Promise._SomePromiseArray = SomePromiseArray;
	};
	
	},{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise) {
	function PromiseInspection(promise) {
	    if (promise !== undefined) {
	        promise = promise._target();
	        this._bitField = promise._bitField;
	        this._settledValueField = promise._isFateSealed()
	            ? promise._settledValue() : undefined;
	    }
	    else {
	        this._bitField = 0;
	        this._settledValueField = undefined;
	    }
	}
	
	PromiseInspection.prototype._settledValue = function() {
	    return this._settledValueField;
	};
	
	var value = PromiseInspection.prototype.value = function () {
	    if (!this.isFulfilled()) {
	        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    return this._settledValue();
	};
	
	var reason = PromiseInspection.prototype.error =
	PromiseInspection.prototype.reason = function () {
	    if (!this.isRejected()) {
	        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    return this._settledValue();
	};
	
	var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
	    return (this._bitField & 33554432) !== 0;
	};
	
	var isRejected = PromiseInspection.prototype.isRejected = function () {
	    return (this._bitField & 16777216) !== 0;
	};
	
	var isPending = PromiseInspection.prototype.isPending = function () {
	    return (this._bitField & 50397184) === 0;
	};
	
	var isResolved = PromiseInspection.prototype.isResolved = function () {
	    return (this._bitField & 50331648) !== 0;
	};
	
	PromiseInspection.prototype.isCancelled = function() {
	    return (this._bitField & 8454144) !== 0;
	};
	
	Promise.prototype.__isCancelled = function() {
	    return (this._bitField & 65536) === 65536;
	};
	
	Promise.prototype._isCancelled = function() {
	    return this._target().__isCancelled();
	};
	
	Promise.prototype.isCancelled = function() {
	    return (this._target()._bitField & 8454144) !== 0;
	};
	
	Promise.prototype.isPending = function() {
	    return isPending.call(this._target());
	};
	
	Promise.prototype.isRejected = function() {
	    return isRejected.call(this._target());
	};
	
	Promise.prototype.isFulfilled = function() {
	    return isFulfilled.call(this._target());
	};
	
	Promise.prototype.isResolved = function() {
	    return isResolved.call(this._target());
	};
	
	Promise.prototype.value = function() {
	    return value.call(this._target());
	};
	
	Promise.prototype.reason = function() {
	    var target = this._target();
	    target._unsetRejectionIsUnhandled();
	    return reason.call(target);
	};
	
	Promise.prototype._value = function() {
	    return this._settledValue();
	};
	
	Promise.prototype._reason = function() {
	    this._unsetRejectionIsUnhandled();
	    return this._settledValue();
	};
	
	Promise.PromiseInspection = PromiseInspection;
	};
	
	},{}],33:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var util = _dereq_("./util");
	var errorObj = util.errorObj;
	var isObject = util.isObject;
	
	function tryConvertToPromise(obj, context) {
	    if (isObject(obj)) {
	        if (obj instanceof Promise) return obj;
	        var then = getThen(obj);
	        if (then === errorObj) {
	            if (context) context._pushContext();
	            var ret = Promise.reject(then.e);
	            if (context) context._popContext();
	            return ret;
	        } else if (typeof then === "function") {
	            if (isAnyBluebirdPromise(obj)) {
	                var ret = new Promise(INTERNAL);
	                obj._then(
	                    ret._fulfill,
	                    ret._reject,
	                    undefined,
	                    ret,
	                    null
	                );
	                return ret;
	            }
	            return doThenable(obj, then, context);
	        }
	    }
	    return obj;
	}
	
	function doGetThen(obj) {
	    return obj.then;
	}
	
	function getThen(obj) {
	    try {
	        return doGetThen(obj);
	    } catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	
	var hasProp = {}.hasOwnProperty;
	function isAnyBluebirdPromise(obj) {
	    try {
	        return hasProp.call(obj, "_promise0");
	    } catch (e) {
	        return false;
	    }
	}
	
	function doThenable(x, then, context) {
	    var promise = new Promise(INTERNAL);
	    var ret = promise;
	    if (context) context._pushContext();
	    promise._captureStackTrace();
	    if (context) context._popContext();
	    var synchronous = true;
	    var result = util.tryCatch(then).call(x, resolve, reject);
	    synchronous = false;
	
	    if (promise && result === errorObj) {
	        promise._rejectCallback(result.e, true, true);
	        promise = null;
	    }
	
	    function resolve(value) {
	        if (!promise) return;
	        promise._resolveCallback(value);
	        promise = null;
	    }
	
	    function reject(reason) {
	        if (!promise) return;
	        promise._rejectCallback(reason, synchronous, true);
	        promise = null;
	    }
	    return ret;
	}
	
	return tryConvertToPromise;
	};
	
	},{"./util":36}],34:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function(Promise, INTERNAL, debug) {
	var util = _dereq_("./util");
	var TimeoutError = Promise.TimeoutError;
	
	function HandleWrapper(handle)  {
	    this.handle = handle;
	}
	
	HandleWrapper.prototype._resultCancelled = function() {
	    clearTimeout(this.handle);
	};
	
	var afterValue = function(value) { return delay(+this).thenReturn(value); };
	var delay = Promise.delay = function (ms, value) {
	    var ret;
	    var handle;
	    if (value !== undefined) {
	        ret = Promise.resolve(value)
	                ._then(afterValue, null, null, ms, undefined);
	        if (debug.cancellation() && value instanceof Promise) {
	            ret._setOnCancel(value);
	        }
	    } else {
	        ret = new Promise(INTERNAL);
	        handle = setTimeout(function() { ret._fulfill(); }, +ms);
	        if (debug.cancellation()) {
	            ret._setOnCancel(new HandleWrapper(handle));
	        }
	        ret._captureStackTrace();
	    }
	    ret._setAsyncGuaranteed();
	    return ret;
	};
	
	Promise.prototype.delay = function (ms) {
	    return delay(ms, this);
	};
	
	var afterTimeout = function (promise, message, parent) {
	    var err;
	    if (typeof message !== "string") {
	        if (message instanceof Error) {
	            err = message;
	        } else {
	            err = new TimeoutError("operation timed out");
	        }
	    } else {
	        err = new TimeoutError(message);
	    }
	    util.markAsOriginatingFromRejection(err);
	    promise._attachExtraTrace(err);
	    promise._reject(err);
	
	    if (parent != null) {
	        parent.cancel();
	    }
	};
	
	function successClear(value) {
	    clearTimeout(this.handle);
	    return value;
	}
	
	function failureClear(reason) {
	    clearTimeout(this.handle);
	    throw reason;
	}
	
	Promise.prototype.timeout = function (ms, message) {
	    ms = +ms;
	    var ret, parent;
	
	    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
	        if (ret.isPending()) {
	            afterTimeout(ret, message, parent);
	        }
	    }, ms));
	
	    if (debug.cancellation()) {
	        parent = this.then();
	        ret = parent._then(successClear, failureClear,
	                            undefined, handleWrapper, undefined);
	        ret._setOnCancel(handleWrapper);
	    } else {
	        ret = this._then(successClear, failureClear,
	                            undefined, handleWrapper, undefined);
	    }
	
	    return ret;
	};
	
	};
	
	},{"./util":36}],35:[function(_dereq_,module,exports){
	"use strict";
	module.exports = function (Promise, apiRejection, tryConvertToPromise,
	    createContext, INTERNAL, debug) {
	    var util = _dereq_("./util");
	    var TypeError = _dereq_("./errors").TypeError;
	    var inherits = _dereq_("./util").inherits;
	    var errorObj = util.errorObj;
	    var tryCatch = util.tryCatch;
	    var NULL = {};
	
	    function thrower(e) {
	        setTimeout(function(){throw e;}, 0);
	    }
	
	    function castPreservingDisposable(thenable) {
	        var maybePromise = tryConvertToPromise(thenable);
	        if (maybePromise !== thenable &&
	            typeof thenable._isDisposable === "function" &&
	            typeof thenable._getDisposer === "function" &&
	            thenable._isDisposable()) {
	            maybePromise._setDisposable(thenable._getDisposer());
	        }
	        return maybePromise;
	    }
	    function dispose(resources, inspection) {
	        var i = 0;
	        var len = resources.length;
	        var ret = new Promise(INTERNAL);
	        function iterator() {
	            if (i >= len) return ret._fulfill();
	            var maybePromise = castPreservingDisposable(resources[i++]);
	            if (maybePromise instanceof Promise &&
	                maybePromise._isDisposable()) {
	                try {
	                    maybePromise = tryConvertToPromise(
	                        maybePromise._getDisposer().tryDispose(inspection),
	                        resources.promise);
	                } catch (e) {
	                    return thrower(e);
	                }
	                if (maybePromise instanceof Promise) {
	                    return maybePromise._then(iterator, thrower,
	                                              null, null, null);
	                }
	            }
	            iterator();
	        }
	        iterator();
	        return ret;
	    }
	
	    function Disposer(data, promise, context) {
	        this._data = data;
	        this._promise = promise;
	        this._context = context;
	    }
	
	    Disposer.prototype.data = function () {
	        return this._data;
	    };
	
	    Disposer.prototype.promise = function () {
	        return this._promise;
	    };
	
	    Disposer.prototype.resource = function () {
	        if (this.promise().isFulfilled()) {
	            return this.promise().value();
	        }
	        return NULL;
	    };
	
	    Disposer.prototype.tryDispose = function(inspection) {
	        var resource = this.resource();
	        var context = this._context;
	        if (context !== undefined) context._pushContext();
	        var ret = resource !== NULL
	            ? this.doDispose(resource, inspection) : null;
	        if (context !== undefined) context._popContext();
	        this._promise._unsetDisposable();
	        this._data = null;
	        return ret;
	    };
	
	    Disposer.isDisposer = function (d) {
	        return (d != null &&
	                typeof d.resource === "function" &&
	                typeof d.tryDispose === "function");
	    };
	
	    function FunctionDisposer(fn, promise, context) {
	        this.constructor$(fn, promise, context);
	    }
	    inherits(FunctionDisposer, Disposer);
	
	    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
	        var fn = this.data();
	        return fn.call(resource, resource, inspection);
	    };
	
	    function maybeUnwrapDisposer(value) {
	        if (Disposer.isDisposer(value)) {
	            this.resources[this.index]._setDisposable(value);
	            return value.promise();
	        }
	        return value;
	    }
	
	    function ResourceList(length) {
	        this.length = length;
	        this.promise = null;
	        this[length-1] = null;
	    }
	
	    ResourceList.prototype._resultCancelled = function() {
	        var len = this.length;
	        for (var i = 0; i < len; ++i) {
	            var item = this[i];
	            if (item instanceof Promise) {
	                item.cancel();
	            }
	        }
	    };
	
	    Promise.using = function () {
	        var len = arguments.length;
	        if (len < 2) return apiRejection(
	                        "you must pass at least 2 arguments to Promise.using");
	        var fn = arguments[len - 1];
	        if (typeof fn !== "function") {
	            return apiRejection("expecting a function but got " + util.classString(fn));
	        }
	        var input;
	        var spreadArgs = true;
	        if (len === 2 && Array.isArray(arguments[0])) {
	            input = arguments[0];
	            len = input.length;
	            spreadArgs = false;
	        } else {
	            input = arguments;
	            len--;
	        }
	        var resources = new ResourceList(len);
	        for (var i = 0; i < len; ++i) {
	            var resource = input[i];
	            if (Disposer.isDisposer(resource)) {
	                var disposer = resource;
	                resource = resource.promise();
	                resource._setDisposable(disposer);
	            } else {
	                var maybePromise = tryConvertToPromise(resource);
	                if (maybePromise instanceof Promise) {
	                    resource =
	                        maybePromise._then(maybeUnwrapDisposer, null, null, {
	                            resources: resources,
	                            index: i
	                    }, undefined);
	                }
	            }
	            resources[i] = resource;
	        }
	
	        var reflectedResources = new Array(resources.length);
	        for (var i = 0; i < reflectedResources.length; ++i) {
	            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
	        }
	
	        var resultPromise = Promise.all(reflectedResources)
	            .then(function(inspections) {
	                for (var i = 0; i < inspections.length; ++i) {
	                    var inspection = inspections[i];
	                    if (inspection.isRejected()) {
	                        errorObj.e = inspection.error();
	                        return errorObj;
	                    } else if (!inspection.isFulfilled()) {
	                        resultPromise.cancel();
	                        return;
	                    }
	                    inspections[i] = inspection.value();
	                }
	                promise._pushContext();
	
	                fn = tryCatch(fn);
	                var ret = spreadArgs
	                    ? fn.apply(undefined, inspections) : fn(inspections);
	                var promiseCreated = promise._popContext();
	                debug.checkForgottenReturns(
	                    ret, promiseCreated, "Promise.using", promise);
	                return ret;
	            });
	
	        var promise = resultPromise.lastly(function() {
	            var inspection = new Promise.PromiseInspection(resultPromise);
	            return dispose(resources, inspection);
	        });
	        resources.promise = promise;
	        promise._setOnCancel(resources);
	        return promise;
	    };
	
	    Promise.prototype._setDisposable = function (disposer) {
	        this._bitField = this._bitField | 131072;
	        this._disposer = disposer;
	    };
	
	    Promise.prototype._isDisposable = function () {
	        return (this._bitField & 131072) > 0;
	    };
	
	    Promise.prototype._getDisposer = function () {
	        return this._disposer;
	    };
	
	    Promise.prototype._unsetDisposable = function () {
	        this._bitField = this._bitField & (~131072);
	        this._disposer = undefined;
	    };
	
	    Promise.prototype.disposer = function (fn) {
	        if (typeof fn === "function") {
	            return new FunctionDisposer(fn, this, createContext());
	        }
	        throw new TypeError();
	    };
	
	};
	
	},{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){
	"use strict";
	var es5 = _dereq_("./es5");
	var canEvaluate = typeof navigator == "undefined";
	
	var errorObj = {e: {}};
	var tryCatchTarget;
	var globalObject = typeof self !== "undefined" ? self :
	    typeof window !== "undefined" ? window :
	    typeof global !== "undefined" ? global :
	    this !== undefined ? this : null;
	
	function tryCatcher() {
	    try {
	        var target = tryCatchTarget;
	        tryCatchTarget = null;
	        return target.apply(this, arguments);
	    } catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	
	var inherits = function(Child, Parent) {
	    var hasProp = {}.hasOwnProperty;
	
	    function T() {
	        this.constructor = Child;
	        this.constructor$ = Parent;
	        for (var propertyName in Parent.prototype) {
	            if (hasProp.call(Parent.prototype, propertyName) &&
	                propertyName.charAt(propertyName.length-1) !== "$"
	           ) {
	                this[propertyName + "$"] = Parent.prototype[propertyName];
	            }
	        }
	    }
	    T.prototype = Parent.prototype;
	    Child.prototype = new T();
	    return Child.prototype;
	};
	
	
	function isPrimitive(val) {
	    return val == null || val === true || val === false ||
	        typeof val === "string" || typeof val === "number";
	
	}
	
	function isObject(value) {
	    return typeof value === "function" ||
	           typeof value === "object" && value !== null;
	}
	
	function maybeWrapAsError(maybeError) {
	    if (!isPrimitive(maybeError)) return maybeError;
	
	    return new Error(safeToString(maybeError));
	}
	
	function withAppended(target, appendee) {
	    var len = target.length;
	    var ret = new Array(len + 1);
	    var i;
	    for (i = 0; i < len; ++i) {
	        ret[i] = target[i];
	    }
	    ret[i] = appendee;
	    return ret;
	}
	
	function getDataPropertyOrDefault(obj, key, defaultValue) {
	    if (es5.isES5) {
	        var desc = Object.getOwnPropertyDescriptor(obj, key);
	
	        if (desc != null) {
	            return desc.get == null && desc.set == null
	                    ? desc.value
	                    : defaultValue;
	        }
	    } else {
	        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
	    }
	}
	
	function notEnumerableProp(obj, name, value) {
	    if (isPrimitive(obj)) return obj;
	    var descriptor = {
	        value: value,
	        configurable: true,
	        enumerable: false,
	        writable: true
	    };
	    es5.defineProperty(obj, name, descriptor);
	    return obj;
	}
	
	function thrower(r) {
	    throw r;
	}
	
	var inheritedDataKeys = (function() {
	    var excludedPrototypes = [
	        Array.prototype,
	        Object.prototype,
	        Function.prototype
	    ];
	
	    var isExcludedProto = function(val) {
	        for (var i = 0; i < excludedPrototypes.length; ++i) {
	            if (excludedPrototypes[i] === val) {
	                return true;
	            }
	        }
	        return false;
	    };
	
	    if (es5.isES5) {
	        var getKeys = Object.getOwnPropertyNames;
	        return function(obj) {
	            var ret = [];
	            var visitedKeys = Object.create(null);
	            while (obj != null && !isExcludedProto(obj)) {
	                var keys;
	                try {
	                    keys = getKeys(obj);
	                } catch (e) {
	                    return ret;
	                }
	                for (var i = 0; i < keys.length; ++i) {
	                    var key = keys[i];
	                    if (visitedKeys[key]) continue;
	                    visitedKeys[key] = true;
	                    var desc = Object.getOwnPropertyDescriptor(obj, key);
	                    if (desc != null && desc.get == null && desc.set == null) {
	                        ret.push(key);
	                    }
	                }
	                obj = es5.getPrototypeOf(obj);
	            }
	            return ret;
	        };
	    } else {
	        var hasProp = {}.hasOwnProperty;
	        return function(obj) {
	            if (isExcludedProto(obj)) return [];
	            var ret = [];
	
	            /*jshint forin:false */
	            enumeration: for (var key in obj) {
	                if (hasProp.call(obj, key)) {
	                    ret.push(key);
	                } else {
	                    for (var i = 0; i < excludedPrototypes.length; ++i) {
	                        if (hasProp.call(excludedPrototypes[i], key)) {
	                            continue enumeration;
	                        }
	                    }
	                    ret.push(key);
	                }
	            }
	            return ret;
	        };
	    }
	
	})();
	
	var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
	function isClass(fn) {
	    try {
	        if (typeof fn === "function") {
	            var keys = es5.names(fn.prototype);
	
	            var hasMethods = es5.isES5 && keys.length > 1;
	            var hasMethodsOtherThanConstructor = keys.length > 0 &&
	                !(keys.length === 1 && keys[0] === "constructor");
	            var hasThisAssignmentAndStaticMethods =
	                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;
	
	            if (hasMethods || hasMethodsOtherThanConstructor ||
	                hasThisAssignmentAndStaticMethods) {
	                return true;
	            }
	        }
	        return false;
	    } catch (e) {
	        return false;
	    }
	}
	
	function toFastProperties(obj) {
	    /*jshint -W027,-W055,-W031*/
	    function FakeConstructor() {}
	    FakeConstructor.prototype = obj;
	    var l = 8;
	    while (l--) new FakeConstructor();
	    return obj;
	    eval(obj);
	}
	
	var rident = /^[a-z$_][a-z$_0-9]*$/i;
	function isIdentifier(str) {
	    return rident.test(str);
	}
	
	function filledRange(count, prefix, suffix) {
	    var ret = new Array(count);
	    for(var i = 0; i < count; ++i) {
	        ret[i] = prefix + i + suffix;
	    }
	    return ret;
	}
	
	function safeToString(obj) {
	    try {
	        return obj + "";
	    } catch (e) {
	        return "[no string representation]";
	    }
	}
	
	function isError(obj) {
	    return obj !== null &&
	           typeof obj === "object" &&
	           typeof obj.message === "string" &&
	           typeof obj.name === "string";
	}
	
	function markAsOriginatingFromRejection(e) {
	    try {
	        notEnumerableProp(e, "isOperational", true);
	    }
	    catch(ignore) {}
	}
	
	function originatesFromRejection(e) {
	    if (e == null) return false;
	    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
	        e["isOperational"] === true);
	}
	
	function canAttachTrace(obj) {
	    return isError(obj) && es5.propertyIsWritable(obj, "stack");
	}
	
	var ensureErrorObject = (function() {
	    if (!("stack" in new Error())) {
	        return function(value) {
	            if (canAttachTrace(value)) return value;
	            try {throw new Error(safeToString(value));}
	            catch(err) {return err;}
	        };
	    } else {
	        return function(value) {
	            if (canAttachTrace(value)) return value;
	            return new Error(safeToString(value));
	        };
	    }
	})();
	
	function classString(obj) {
	    return {}.toString.call(obj);
	}
	
	function copyDescriptors(from, to, filter) {
	    var keys = es5.names(from);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        if (filter(key)) {
	            try {
	                es5.defineProperty(to, key, es5.getDescriptor(from, key));
	            } catch (ignore) {}
	        }
	    }
	}
	
	var asArray = function(v) {
	    if (es5.isArray(v)) {
	        return v;
	    }
	    return null;
	};
	
	if (typeof Symbol !== "undefined" && Symbol.iterator) {
	    var ArrayFrom = typeof Array.from === "function" ? function(v) {
	        return Array.from(v);
	    } : function(v) {
	        var ret = [];
	        var it = v[Symbol.iterator]();
	        var itResult;
	        while (!((itResult = it.next()).done)) {
	            ret.push(itResult.value);
	        }
	        return ret;
	    };
	
	    asArray = function(v) {
	        if (es5.isArray(v)) {
	            return v;
	        } else if (v != null && typeof v[Symbol.iterator] === "function") {
	            return ArrayFrom(v);
	        }
	        return null;
	    };
	}
	
	var isNode = typeof process !== "undefined" &&
	        classString(process).toLowerCase() === "[object process]";
	
	function env(key, def) {
	    return isNode ? process.env[key] : def;
	}
	
	function getNativePromise() {
	    if (typeof Promise === "function") {
	        try {
	            var promise = new Promise(function(){});
	            if ({}.toString.call(promise) === "[object Promise]") {
	                return Promise;
	            }
	        } catch (e) {}
	    }
	}
	
	function domainBind(self, cb) {
	    return self.bind(cb);
	}
	
	var ret = {
	    isClass: isClass,
	    isIdentifier: isIdentifier,
	    inheritedDataKeys: inheritedDataKeys,
	    getDataPropertyOrDefault: getDataPropertyOrDefault,
	    thrower: thrower,
	    isArray: es5.isArray,
	    asArray: asArray,
	    notEnumerableProp: notEnumerableProp,
	    isPrimitive: isPrimitive,
	    isObject: isObject,
	    isError: isError,
	    canEvaluate: canEvaluate,
	    errorObj: errorObj,
	    tryCatch: tryCatch,
	    inherits: inherits,
	    withAppended: withAppended,
	    maybeWrapAsError: maybeWrapAsError,
	    toFastProperties: toFastProperties,
	    filledRange: filledRange,
	    toString: safeToString,
	    canAttachTrace: canAttachTrace,
	    ensureErrorObject: ensureErrorObject,
	    originatesFromRejection: originatesFromRejection,
	    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
	    classString: classString,
	    copyDescriptors: copyDescriptors,
	    hasDevTools: typeof chrome !== "undefined" && chrome &&
	                 typeof chrome.loadTimes === "function",
	    isNode: isNode,
	    env: env,
	    global: globalObject,
	    getNativePromise: getNativePromise,
	    domainBind: domainBind
	};
	ret.isRecentNode = ret.isNode && (function() {
	    var version = process.versions.node.split(".").map(Number);
	    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
	})();
	
	if (ret.isNode) ret.toFastProperties(process);
	
	try {throw new Error(); } catch (e) {ret.lastLineError = e;}
	module.exports = ret;
	
	},{"./es5":13}]},{},[4])(4)
	});                    ;if (typeof window !== 'undefined' && window !== null) {                               window.P = window.Promise;                                                     } else if (typeof self !== 'undefined' && self !== null) {                             self.P = self.Promise;                                                         }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2), (function() { return this; }()), __webpack_require__(4).setImmediate))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
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
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
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
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(3).nextTick;
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).setImmediate, __webpack_require__(4).clearImmediate))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	if (!__webpack_require__(6)()) {
		Object.defineProperty(__webpack_require__(7), 'Symbol',
			{ value: __webpack_require__(8), configurable: true, enumerable: false,
				writable: true });
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		var symbol;
		if (typeof Symbol !== 'function') return false;
		symbol = Symbol('test symbol');
		try { String(symbol); } catch (e) { return false; }
		if (typeof Symbol.iterator === 'symbol') return true;
	
		// Return 'true' for polyfills
		if (typeof Symbol.isConcatSpreadable !== 'object') return false;
		if (typeof Symbol.iterator !== 'object') return false;
		if (typeof Symbol.toPrimitive !== 'object') return false;
		if (typeof Symbol.toStringTag !== 'object') return false;
		if (typeof Symbol.unscopables !== 'object') return false;
	
		return true;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = new Function("return this")();


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var d              = __webpack_require__(9)
	  , validateSymbol = __webpack_require__(22)
	
	  , create = Object.create, defineProperties = Object.defineProperties
	  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
	  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null);
	
	if (typeof Symbol === 'function') NativeSymbol = Symbol;
	
	var generateName = (function () {
		var created = create(null);
		return function (desc) {
			var postfix = 0, name, ie11BugWorkaround;
			while (created[desc + (postfix || '')]) ++postfix;
			desc += (postfix || '');
			created[desc] = true;
			name = '@@' + desc;
			defineProperty(objPrototype, name, d.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty(this, name, d(value));
				ie11BugWorkaround = false;
			}));
			return name;
		};
	}());
	
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
		return SymbolPolyfill(description);
	};
	module.exports = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
		symbol = create(HiddenSymbol.prototype);
		description = (description === undefined ? '' : String(description));
		return defineProperties(symbol, {
			__description__: d('', description),
			__name__: d('', generateName(description))
		});
	};
	defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (globalSymbols[key]) return globalSymbols[key];
			return (globalSymbols[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d(function (s) {
			var key;
			validateSymbol(s);
			for (key in globalSymbols) if (globalSymbols[key] === s) return key;
		}),
		hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
		isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
			SymbolPolyfill('isConcatSpreadable')),
		iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
		match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
		replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
		search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
		species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
		split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
		toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
		toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
		unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
	});
	defineProperties(HiddenSymbol.prototype, {
		constructor: d(SymbolPolyfill),
		toString: d('', function () { return this.__name__; })
	});
	
	defineProperties(SymbolPolyfill.prototype, {
		toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
		valueOf: d(function () { return validateSymbol(this); })
	});
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('',
		function () { return validateSymbol(this); }));
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));
	
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var assign        = __webpack_require__(10)
	  , normalizeOpts = __webpack_require__(17)
	  , isCallable    = __webpack_require__(18)
	  , contains      = __webpack_require__(19)
	
	  , d;
	
	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}
	
		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};
	
	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}
	
		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(11)()
		? Object.assign
		: __webpack_require__(12);


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== 'function') return false;
		obj = { foo: 'raz' };
		assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
		return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keys  = __webpack_require__(13)
	  , value = __webpack_require__(16)
	
	  , max = Math.max;
	
	module.exports = function (dest, src/*, …srcn*/) {
		var error, i, l = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try { dest[key] = src[key]; } catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(14)()
		? Object.keys
		: __webpack_require__(15);


/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		try {
			Object.keys('primitive');
			return true;
		} catch (e) { return false; }
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	var keys = Object.keys;
	
	module.exports = function (object) {
		return keys(object == null ? object : Object(object));
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	var forEach = Array.prototype.forEach, create = Object.create;
	
	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};
	
	module.exports = function (options/*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (options == null) return;
			process(Object(options), result);
		});
		return result;
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	// Deprecated
	
	'use strict';
	
	module.exports = function (obj) { return typeof obj === 'function'; };


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(20)()
		? String.prototype.contains
		: __webpack_require__(21);


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	var str = 'razdwatrzy';
	
	module.exports = function () {
		if (typeof str.contains !== 'function') return false;
		return ((str.contains('dwa') === true) && (str.contains('foo') === false));
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	var indexOf = String.prototype.indexOf;
	
	module.exports = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isSymbol = __webpack_require__(23);
	
	module.exports = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (x) {
		return (x && ((typeof x === 'symbol') || (x['@@toStringTag'] === 'Symbol'))) || false;
	};


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Utils
	var utils = {
	  noop: function noop() {
	    return false;
	  },
	
	  // Class Inherits
	  inherits: function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  },
	
	  // Object Extend
	  extend: function extend(target) {
	    for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      objs[_key - 1] = arguments[_key];
	    }
	
	    for (var i = 0, l = objs.length; i < l; i++) {
	      var keys = Object.getOwnPropertyNames(objs[i] || {});
	
	      for (var j = 0; j < keys.length; j++) {
	        target[keys[j]] = objs[i][keys[j]];
	      }
	    }
	
	    return target;
	  },
	  isNumber: function isNumber(obj) {
	    return toString.call(obj) == '[object Number]';
	  },
	  isUndefined: function isUndefined(val) {
	    return val === void 0;
	  },
	  isObject: function isObject(obj) {
	    return obj === Object(obj);
	  },
	  arrayUnique: function arrayUnique(array) {
	    var u = {};
	    var ret = [];
	    for (var i = 0, l = array.length; i < l; ++i) {
	      if (u.hasOwnProperty(array[i]) && !utils.isObject(array[i])) {
	        continue;
	      }
	      ret.push(array[i]);
	      u[array[i]] = 1;
	    }
	    return ret;
	  },
	  arrayInter: function arrayInter(array) {
	    for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      rest[_key2 - 1] = arguments[_key2];
	    }
	
	    return utils.arrayUnique(array).filter(function (item) {
	      var ret = true;
	
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = rest[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var other = _step.value;
	
	          if (other.indexOf(item) < 0) {
	            ret = false;
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	
	      return ret;
	    });
	  },
	  arrayDiff: function arrayDiff(array) {
	    for (var _len3 = arguments.length, rest = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      rest[_key3 - 1] = arguments[_key3];
	    }
	
	    var inter = utils.arrayInter.apply(utils, [array].concat(rest));
	    var union = utils.arrayUnique(array.concat.apply(array, rest));
	    return union.filter(function (item) {
	      return inter.indexOf(item) < 0;
	    });
	  },
	  flatten: (function (_flatten) {
	    function flatten(_x, _x2, _x3, _x4) {
	      return _flatten.apply(this, arguments);
	    }
	
	    flatten.toString = function () {
	      return _flatten.toString();
	    };
	
	    return flatten;
	  })(function (input, shallow, strict, startIndex) {
	    var output = [];
	    var idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0,
	            len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  })
	};
	
	exports.default = utils;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EventEmitter = undefined;
	
	var _utils = __webpack_require__(24);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var noop = _utils2.default.noop;
	
	var defaultMaxListeners = 10;
	
	var EventEmitter = exports.EventEmitter = (function () {
	  function EventEmitter() {
	    _classCallCheck(this, EventEmitter);
	
	    this._events = this._events || {};
	    this._maxListeners = this._maxListeners || defaultMaxListeners;
	  }
	
	  _createClass(EventEmitter, [{
	    key: 'setMaxListeners',
	    value: function setMaxListeners(n) {
	      if (typeof n !== 'number' || n < 0) throw TypeError('n must be a positive number');
	      this._maxListeners = n;
	    }
	  }, {
	    key: 'emit',
	    value: function emit(type) {
	      var er = undefined,
	          handler = undefined,
	          len = undefined,
	          args = undefined,
	          i = undefined,
	          listeners = undefined;
	
	      if (!this._events) this._events = {};
	
	      // If there is no 'error' event listener then throw.
	      if (type === 'error') {
	        if (!this._events.error || _typeof(this._events.error) === 'object' && !this._events.error.length) {
	          er = arguments[1];
	          if (this.domain) {
	            if (!er) er = new TypeError('Uncaught, unspecified "error" event.');
	          } else if (er instanceof Error) {
	            throw er; // Unhandled 'error' event
	          } else {
	              throw TypeError('Uncaught, unspecified "error" event.');
	            }
	          return false;
	        }
	      }
	
	      handler = this._events[type];
	
	      if (typeof handler === 'undefined') return false;
	
	      if (typeof handler === 'function') {
	        switch (arguments.length) {
	          // fast cases
	          case 1:
	            handler.call(this);
	            break;
	          case 2:
	            handler.call(this, arguments[1]);
	            break;
	          case 3:
	            handler.call(this, arguments[1], arguments[2]);
	            break;
	          // slower
	          default:
	            len = arguments.length;
	            args = new Array(len - 1);
	            for (i = 1; i < len; i++) {
	              args[i - 1] = arguments[i];
	            }handler.apply(this, args);
	        }
	      } else if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object') {
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++) {
	          args[i - 1] = arguments[i];
	        }listeners = handler.slice();
	        len = listeners.length;
	        for (i = 0; i < len; i++) {
	          listeners[i].apply(this, args);
	        }
	      }
	
	      return true;
	    }
	  }, {
	    key: 'addListener',
	    value: function addListener(type, listener) {
	      var m = undefined;
	
	      if (typeof listener !== 'function') throw TypeError('listener must be a function');
	
	      if (!this._events) this._events = {};
	
	      // To avoid recursion in the case that type === "newListener"! Before
	      // adding it to the listeners, first emit "newListener".
	      if (this._events.newListener) this.emit('newListener', type, typeof listener.listener === 'function' ? listener.listener : listener);
	
	      if (!this._events[type])
	        // Optimize the case of one listener. Don't need the extra array object.
	        this._events[type] = listener;else if (_typeof(this._events[type]) === 'object')
	        // If we've already got an array, just append.
	        this._events[type].push(listener);else
	        // Adding the second element, need to change to array.
	        this._events[type] = [this._events[type], listener];
	
	      // Check for listener leak
	      if (_typeof(this._events[type]) === 'object' && !this._events[type].warned) {
	        m = this._maxListeners;
	        if (m && m > 0 && this._events[type].length > m) {
	          this._events[type].warned = true;
	          console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	          console.trace();
	        }
	      }
	
	      return this;
	    }
	  }, {
	    key: 'once',
	    value: function once(type, listener) {
	      if (typeof listener !== 'function') throw TypeError('listener must be a function');
	
	      function g() {
	        this.removeListener(type, g);
	        listener.apply(this, arguments);
	      }
	
	      g.listener = listener;
	      this.on(type, g);
	
	      return this;
	    }
	  }, {
	    key: 'removeListener',
	    value: function removeListener(type, listener) {
	      var list = undefined,
	          position = undefined,
	          length = undefined,
	          i = undefined;
	
	      if (typeof listener !== 'function') throw TypeError('listener must be a function');
	
	      if (!this._events || !this._events[type]) return this;
	
	      list = this._events[type];
	      length = list.length;
	      position = -1;
	
	      if (list === listener || typeof list.listener === 'function' && list.listener === listener) {
	        this._events[type] = undefined;
	        if (this._events.removeListener) this.emit('removeListener', type, listener);
	      } else if ((typeof list === 'undefined' ? 'undefined' : _typeof(list)) === 'object') {
	        for (i = length; i-- > 0;) {
	          if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	            position = i;
	            break;
	          }
	        }
	
	        if (position < 0) return this;
	
	        if (list.length === 1) {
	          list.length = 0;
	          this._events[type] = undefined;
	        } else {
	          list.splice(position, 1);
	        }
	
	        if (this._events.removeListener) this.emit('removeListener', type, listener);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'removeAllListeners',
	    value: function removeAllListeners(type) {
	      if (!this._events) return this;
	
	      // not listening for removeListener, no need to emit
	      if (!this._events.removeListener) {
	        if (arguments.length === 0) this._events = {};else if (this._events[type]) this._events[type] = undefined;
	        return this;
	      }
	
	      // emit removeListener for all listeners on all events
	      if (arguments.length === 0) {
	        var keys = Object.keys(this._events);
	
	        for (var i = 0; i < keys.length; i++) {
	          var key = keys[i];
	          if (key === 'removeListener') continue;
	          this.removeAllListeners(key);
	        }
	        this.removeAllListeners('removeListener');
	        this._events = {};
	        return this;
	      }
	
	      var listeners = this._events[type];
	
	      if (typeof listeners === 'function') {
	        this.removeListener(type, listeners);
	      } else {
	        // LIFO order
	        while (listeners.length) {
	          this.removeListener(type, listeners[listeners.length - 1]);
	        }
	      }
	      this._events[type] = undefined;
	
	      return this;
	    }
	  }, {
	    key: 'listeners',
	    value: function listeners(type) {
	      var ret = undefined;
	      if (!this._events || !this._events[type]) ret = [];else if (typeof this._events[type] === 'function') ret = [this._events[type]];else ret = this._events[type].slice();
	      return ret;
	    }
	  }]);
	
	  return EventEmitter;
	})();
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	EventEmitter.listenerCount = function (emitter, type) {
	  var ret = undefined;
	  if (!emitter._events || !emitter._events[type]) ret = 0;else if (typeof emitter._events[type] === 'function') ret = 1;else ret = emitter._events[type].length;
	  return ret;
	};
	EventEmitter.inherits = function (ctor) {
	  _utils2.default.inherits(ctor, EventEmitter);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(24);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var noop = _utils2.default.noop;
	
	var min = {};
	exports.default = min;
	
	var _keysTimer = null;
	
	/******************************
	** Mix(String/Number/Object) **
	******************************/
	
	/**
	 * Set the value of a key
	 * @param  {String}   key      Key
	 * @param  {Mix}      value    Value
	 * @param  {Function} callback Callback
	 * @return {Promise}           Promise Object
	 */
	min.set = function (key, value, callback) {
	  var _this = this;
	
	  // Promise Object
	  var promise = new Promise(function (resolve, reject) {
	
	    // Store
	    var store = _this.store;
	
	    // Callback and Promise's shim
	    callback = callback || _utils2.default.noop;
	
	    // Key prefix
	    var $key = 'min-' + key;
	
	    if (store.async) {
	      // Async Store Operating
	      var load = function load(_) {
	        // Value processing
	        var $value = JSON.stringify(value);
	        store.set($key, $value, function (err) {
	          if (err) {
	            // Error!
	            reject(err);
	            return callback(err);
	          }
	
	          _this._keys[key] = 0;
	
	          // Done
	          resolve(key);
	          callback(null, key, value);
	        });
	      };
	      if (store.ready) {
	        load();
	      } else {
	        store.on('ready', load);
	      }
	    } else {
	      // Value processing
	      var $value = JSON.stringify(value);
	      store.set($key, $value);
	      _this._keys[key] = 0;
	
	      // Done
	      resolve(key);
	      callback(null, key, value);
	    }
	  });
	
	  promise.then(function (_) {
	    _this.emit('set', key, value);
	
	    if (_keysTimer) {
	      clearTimeout(_keysTimer);
	    }
	
	    _keysTimer = setTimeout(_this.save.bind(_this), 1000);
	  });
	
	  return promise;
	};
	
	/**
	 * Set the value of a key, only if the key does not exist
	 * @param  {String}   key      the key
	 * @param  {Mix}      value    Value
	 * @param  {Function} callback Callback
	 * @return {Promise}           Promise Object
	 */
	min.setnx = function (key, value) {
	  var _this2 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  // Promise Object
	  return new Promise(function (resolve, reject) {
	
	    _this2.exists(key, function (err, exists) {
	      if (err) {
	        callback(err);
	        reject(err);
	      }
	
	      if (exists) {
	        // The key is exists
	        return reject(new Error('The key is exists.'));
	      } else {
	        _this2.set(key, value, callback).then(function (key) {
	          // Done
	          callback(null, key);
	          resolve(key);
	        }, function (err) {
	          callback(err);
	          reject(err);
	        });
	      }
	    });
	  });
	};
	
	/**
	 * Set the value and expiration of a key
	 * @param  {String}   key      key
	 * @param  {Number}   seconds  TTL
	 * @param  {Mix}      value    value
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise object
	 */
	min.setex = function (key, seconds, value) {
	  var _this3 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  // Promise Object
	  return new Promise(function (resolve, reject) {
	
	    // TTL
	    var timeout = function timeout(_) {
	      _this3.del(key, noop);
	    };
	
	    // Set
	    _this3.set(key, value, function (err, result) {
	      // Done
	      setTimeout(timeout, seconds * 1000);
	      callback(err, result);
	    }).then(function (key) {
	      // Done
	      setTimeout(timeout, seconds * 1000);
	      resolve(key);
	      callback(null, key);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	
	/**
	 * Set the value and expiration in milliseconds of a key
	 * @param  {String}   key      key
	 * @param  {Number}   millionseconds  TTL
	 * @param  {Mix}      value    value
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise object
	 */
	min.psetex = function (key, milliseconds, value) {
	  var _this4 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  // Promise Object
	  return new Promise(function (resolve, reject) {
	
	    // TTL
	    var timeout = function timeout(_) {
	      _this4.del(key, _utils2.default.noop);
	    };
	
	    // Set
	    _this4.set(key, value, function (err, result) {
	      // Done
	      setTimeout(timeout, milliseconds);
	      callback(err, result);
	    }).then(function (key) {
	      // Done
	      setTimeout(timeout, milliseconds);
	      resolve(key);
	      callback(null, key);
	    }).catch(reject.bind(promise));
	  });
	};
	
	/**
	 * Set multiple keys to multiple values
	 * @param  {Object}   plainObject      Object to set
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise object
	 */
	min.mset = function (plainObject) {
	  var _this5 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  return new Promise(function (resolve, reject) {
	
	    // keys
	    var keys = Object.keys(plainObject);
	    // counter
	    var i = 0;
	
	    // the results and errors to return
	    var results = [];
	    var errors = [];
	
	    // Loop
	    var next = function next(key, index) {
	      // remove the current element of the plainObject
	      delete keys[index];
	
	      _this5.set(key, plainObject[key]).then(function (key) {
	        results.push(key);
	
	        i++;
	        if (keys[i]) {
	          next(keys[i], i);
	        } else {
	          out();
	        }
	      }, function (err) {
	        errors.push(err);
	
	        i++;
	        if (keys[i]) {
	          return next(keys[i], i);
	        } else {
	          return out();
	        }
	      });
	    };
	
	    function out() {
	      if (errors.length > 0) {
	        callback(errors);
	        reject(errors);
	      } else {
	        callback(null, results);
	        resolve(results);
	      }
	    }
	
	    next(keys[i], i);
	  });
	};
	
	/**
	 * Set multiple keys to multiple values, only if none of the keys exist
	 * @param  {Object}   plainObject      Object to set
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise object
	 */
	min.msetnx = function (plainObject) {
	  var _this6 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  return new Promise(function (resolve, reject) {
	
	    var keys = Object.keys(plainObject);
	    var i = 0;
	
	    var results = [];
	    var errors = [];
	
	    var next = function next(key, index) {
	      delete keys[index];
	
	      _this6.setnx(key, plainObject[key]).then(function (key) {
	        results.push(key);
	
	        i++;
	        if (keys[i]) {
	          next(keys[i], i);
	        } else {
	          out();
	        }
	      }, function (err) {
	        errors.push(err);
	        out();
	      });
	    };
	
	    function out() {
	      if (errors.length) {
	        callback(errors);
	        return reject(errors);
	      } else {
	        callback(null, results);
	        resolve(results);
	      }
	    }
	
	    next(keys[i], i);
	  });
	};
	
	/**
	 * Append a value to a key
	 * @param  {String}   key      key
	 * @param  {String}   value    value
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.append = function (key, value) {
	  var _this7 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  return new Promise(function (resolve, reject) {
	
	    _this7.exists(key).then(function (exists) {
	      if (exists) {
	        return _this7.get(key);
	      } else {
	        var p = new Promise();
	
	        p.resolve('');
	
	        return p;
	      }
	    }).then(function (currVal) {
	      return _this7.set(key, currVal + value);
	    }).then(function (_) {
	      return _this7.strlen(key);
	    }).then(function (len) {
	      resolve(len);
	      callback(null, len);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	
	/**
	 * Get the value of a key
	 * @param  {String}   key      Key
	 * @param  {Function} callback Callback
	 * @return {Promise}           Promise Object
	 */
	min.get = function (key) {
	  var _this8 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  // Promise Object
	  var promise = new Promise(function (resolve, reject) {
	
	    // Store
	    var store = _this8.store;
	
	    // Key prefix
	    var $key = 'min-' + key;
	
	    if (store.async) {
	      // Async Store Operating
	      var load = function load(_) {
	        // Value processing
	        store.get($key, function (err, value) {
	          if (err) {
	            var _err = new Error('no such key "' + key + '"');
	            // Error!
	            reject(_err);
	            return callback(_err);
	          }
	
	          if (value) {
	            // Done
	            try {
	              var ret = JSON.parse(value);
	              resolve(ret);
	              callback(null, ret);
	            } catch (err) {
	              reject(err);
	              callback(err);
	            }
	          } else {
	            var _err2 = new Error('no such key "' + key + '"');
	
	            reject(_err2);
	            callback(_err2);
	          }
	        });
	      };
	      if (store.ready) {
	        load();
	      } else {
	        store.on('ready', load);
	      }
	    } else {
	      try {
	        // Value processing
	        var _value = _this8.store.get($key);
	
	        if (_value) {
	          try {
	            var value = JSON.parse(_value);
	            // Done
	            resolve(value);
	            callback(null, value);
	          } catch (err) {
	            reject(err);
	            callback(err);
	          }
	        } else {
	          var err = new Error('no such key "' + key + '"');
	
	          reject(err);
	          callback(err);
	        }
	      } catch (err) {
	        // Error!
	        reject(err);
	        callback(err);
	      }
	    }
	  });
	
	  promise.then(function (value) {
	    return _this8.emit('get', key, value);
	  });
	
	  return promise;
	};
	
	min.getrange = function (key, start, end) {
	  var _this9 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    var len = end - start + 1;
	
	    _this9.get(key).then(function (value) {
	      var val = value.substr(start, len);
	
	      resolve(val);
	      callback(null, val);
	    }, function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (value) {
	    return _this9.emit('getrange', key, start, end, value);
	  });
	
	  return promise;
	};
	
	/**
	 * Get the values of a set of keys
	 * @param  {Array}   keys      the keys
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise object
	 */
	min.mget = function (keys) {
	  var _this10 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  // Promise Object
	  return new Promise(function (resolve, reject) {
	
	    var multi = _this10.multi();
	
	    for (var i = 0; i < keys.length; i++) {
	      multi.get(keys[i]);
	    }
	
	    multi.exec(function (err, results) {
	      if (err) {
	        callback(err);
	        return reject(err);
	      }
	
	      callback(err);
	      resolve(results);
	    });
	  });
	};
	
	/**
	 * Set the value of a key and return its old value
	 * @param  {String}   key      key
	 * @param  {Mix}   value       value
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise object
	 */
	min.getset = function (key, value) {
	  var _this11 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    var _value = null;
	
	    _this11.get(key).then(function ($value) {
	      _value = $value;
	
	      return _this11.set(key, value);
	    }).then(function (_) {
	      resolve(_value);
	      callback(null, _value);
	    }, function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (old) {
	    return _this11.emit('getset', key, value, old);
	  });
	
	  return promise;
	};
	
	/**
	 * Get the length of a key
	 * @param  {String}   key      Key
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.strlen = function (key) {
	  var _this12 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  return new Promise(function (resolve, reject) {
	
	    _this12.get(key).then(function (value) {
	      if ('string' === typeof value) {
	        var len = value.length;
	
	        resolve(len);
	        callback(null, len);
	      } else {
	        var err = new TypeError();
	
	        reject(err);
	        callback(err);
	      }
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	
	/**
	 * Increment the integer value of a key by one
	 * @param  {String}   key      key
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.incr = function (key) {
	  var _this13 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this13.exists(key).then(function (exists) {
	      if (exists) {
	        return _this13.get(key);
	      } else {
	        var p = new Promise();
	
	        p.resolve(0);
	
	        return p;
	      }
	    }).then(function (curr) {
	      if (isNaN(parseInt(curr))) {
	        reject('value wrong');
	        return callback('value wrong');
	      }
	
	      curr = parseInt(curr);
	
	      return _this13.set(key, ++curr);
	    }).then(function (key) {
	      return _this13.get(key);
	    }).then(function (value) {
	      resolve(value);
	      callback(null, value, key);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (value) {
	    return _this13.emit('incr', key, value);
	  });
	
	  return promise;
	};
	
	/**
	 * Increment the integer value of a key by the given amount
	 * @param  {String}   key      key
	 * @param  {Number}   increment increment
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.incrby = function (key, increment) {
	  var _this14 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this14.exists(key).then(function (exists) {
	      if (exists) {
	        return _this14.get(key);
	      } else {
	        var p = new Promise();
	
	        p.resolve(0);
	
	        return p;
	      }
	    }).then(function (curr) {
	      if (isNaN(parseFloat(curr))) {
	        reject('value wrong');
	        return callback('value wrong');
	      }
	
	      curr = parseFloat(curr);
	
	      return _this14.set(key, curr + increment);
	    }).then(function (key, value) {
	      resolve(value);
	      callback(null, value);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (value) {
	    return _this14.emit('incrby', key, increment, value);
	  });
	
	  return promise;
	};
	
	min.incrbyfloat = min.incrby;
	
	min.decr = function (key) {
	  var _this15 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this15.exists(key).then(function (exists) {
	      if (exists) {
	        return _this15.get(key);
	      } else {
	        var p = new Promise();
	
	        p.resolve(0);
	
	        return p;
	      }
	    }).then(function (curr) {
	      if (isNaN(parseInt(curr))) {
	        reject('value wrong');
	        return callback('value wrong');
	      }
	
	      curr = parseInt(curr);
	
	      return _this15.set(key, --curr);
	    }).then(function (key) {
	      return _this15.get(key);
	    }).then(function (value) {
	      resolve(value);
	      callback(null, value, key);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (curr) {
	    return _this15.emit('decr', key, curr);
	  });
	
	  return promise;
	};
	
	min.decrby = function (key, decrement) {
	  var _this16 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this16.exists(key).then(function (exists) {
	      if (exists) {
	        return _this16.get(key);
	      } else {
	        var p = new Promise();
	
	        p.resolve(0);
	
	        return p;
	      }
	    }).then(function (curr) {
	      if (isNaN(parseInt(curr))) {
	        reject('value wrong');
	        return callback('value wrong');
	      }
	
	      curr = parseInt(curr);
	
	      return _this16.set(key, curr - decrement);
	    }).then(function (key, value) {
	      resolve(value);
	      callback(null, value);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	  promise.then(function (curr) {
	    return _this16.emit('decrby', key, decrement, curr);
	  });
	
	  return promise;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {'use strict';
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(24);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var noop = _utils2.default.noop;
	
	var min = {};
	exports.default = min;
	
	/**
	 * Set the field in the hash on the key with the value
	 * @param  {String}   key      Hash key
	 * @param  {String}   field    field to set
	 * @param  {Mix}   value       value
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise object
	 */
	
	min.hset = function (key, field, value) {
	  var _this = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	    // check the key status
	    _this.exists(key, function (err, exists) {
	      if (err) {
	        reject(err);
	        return callback(err);
	      }
	
	      if (exists) {
	        // fetch the value
	        _this.get(key, function (err, body) {
	          if (err) {
	            reject(err);
	            return callback(err);
	          }
	
	          // update the hash
	          body[field] = value;
	
	          _this.set(key, body, function (err) {
	            if (err) {
	              reject(err);
	              return callback(err);
	            }
	
	            resolve([key, field, value]);
	            callback(null, key, field, value);
	          });
	        });
	      } else {
	        // create a hash
	        var body = {};
	
	        body[field] = value;
	
	        _this.set(key, body, function (err) {
	          if (err) {
	            reject(err);
	            return callback(err);
	          }
	
	          _this._keys[key] = 1;
	
	          resolve([key, field, value]);
	          callback(null, key, field, value);
	        });
	      }
	    });
	  });
	  promise.then(function (_) {
	    return _this.emit('hset', key, field, value);
	  });
	
	  return promise;
	};
	
	/**
	 * Set the value of a hash field, only if the field does not exist
	 * @param  {String}   key      key
	 * @param  {String}   field    hash field
	 * @param  {Mix}   value       value
	 * @param  {Function} callback Callback
	 * @return {Promise}            promise
	 */
	min.hsetnx = function (key, field, value) {
	  var _this2 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  return new Promise(function (resolve, reject) {
	    _this2.hexists(key, field, function (err, exists) {
	      if (err) {
	        reject(err);
	        return callback(err);
	      }
	
	      if (!exists) {
	        _this2.hset(key, field, value).then(function (_ref) {
	          var _ref2 = _slicedToArray(_ref, 3);
	
	          var key = _ref2[0];
	          var field = _ref2[1];
	          var value = _ref2[2];
	
	          resolve([key, field, value]);
	          callback(null, key, field, value);
	        });
	      } else {
	        var _err = new Error('The field of the hash is exists');
	
	        reject(_err);
	        return callback(_err);
	      }
	    });
	  });
	};
	
	/**
	 * Set multiple hash fields to multiple values
	 * @param  {String}   key      key
	 * @param  {Object}   docs     values
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.hmset = function (key, docs) {
	  var _this3 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  var keys = Object.keys(docs);
	
	  var i = 0;
	
	  var results = [];
	  var errors = [];
	
	  return new Promise(function (resolve, reject) {
	    var next = function next(field, index) {
	      delete keys[index];
	
	      _this3.hset(key, field, docs[field]).then(function (_ref3) {
	        var _ref4 = _slicedToArray(_ref3, 3);
	
	        var key = _ref4[0];
	        var field = _ref4[1];
	        var value = _ref4[2];
	
	        results.push([key, field, value]);
	
	        i++;
	        if (keys[i]) {
	          next(keys[i], i);
	        } else {
	          out();
	        }
	      }, function (err) {
	        errors.push(err);
	
	        i++;
	        if (keys[i]) {
	          return next(keys[i], i);
	        } else {
	          return out();
	        }
	      });
	    };
	
	    function out() {
	      if (errors.length > 0) {
	        callback(errors);
	        reject(errors);
	      } else {
	        callback(null, results);
	        resolve(results);
	      }
	    }
	
	    next(keys[i], i);
	  });
	};
	
	/**
	 * Get the value of a hash field
	 * @param  {String}   key      key
	 * @param  {String}   field    hash field
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.hget = function (key, field) {
	  var _this4 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  return new Promise(function (resolve, reject) {
	
	    _this4.hexists(key, field, function (err, exists) {
	      if (err) {
	        reject(err);
	        return callback(err);
	      }
	
	      if (exists) {
	        _this4.get(key).then(function (value) {
	          var data = value[field];
	          resolve(data);
	          callback(null, data);
	        }, function (err) {
	          reject(err);
	          callback(err);
	        });
	      } else {
	        var _err2 = new Error('no such field');
	
	        reject(_err2);
	        callback(_err2);
	      }
	    });
	  });
	};
	
	/**
	 * Get the values of all the given hash fields
	 * @param  {String}   key      key
	 * @param  {Array}   fields    hash fields
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.hmget = function (key, fields) {
	  var _this5 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  return new Promise(function (resolve, reject) {
	    var multi = _this5.multi();
	
	    fields.forEach(function (field) {
	      multi.hget(key, field);
	    });
	
	    multi.exec(function (err, replies) {
	      if (err) {
	        callback(err);
	        return reject(err);
	      }
	
	      resolve(replies);
	      callback(null, replies);
	    });
	  });
	};
	
	/**
	 * Get all the fields and values in a hash
	 * @param  {String}   key      key
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.hgetall = function (key) {
	  var _this6 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  return new Promise(function (resolve, reject) {
	    _this6.exists(key, function (err, exists) {
	      if (err) {
	        callback(err);
	        return reject(err);
	      }
	
	      if (exists) {
	        _this6.get(key).then(function (data) {
	          resolve(data);
	          callback(null, data);
	        }).catch(function (err) {
	          reject(err);
	          callback(err);
	        });
	      } else {
	        var _err3 = new Error('no such key');
	
	        callback(_err3);
	        return reject(_err3);
	      }
	    });
	  });
	};
	
	/**
	 * Delete one hash field
	 * @param  {String}   key      key
	 * @param  {String}   field    hash field
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.hdel = function (key, field) {
	  var _this7 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  var promise = new Promise(function (resolve, reject) {
	    _this7.hexists(key, field, function (err, exists) {
	      if (err) {
	        callback(err);
	        return reject(err);
	      }
	
	      if (exists) {
	        _this7.get(key).then(function (data) {
	          var removed = data[field];
	          delete data[field];
	
	          _this7.set(key, data).then(function (_) {
	            resolve([key, field, removed]);
	            callback(null, key, field, removed);
	          }, function (err) {
	            reject(err);
	            callback(err);
	          });
	        }, function (err) {
	          return callback(err);
	        });
	      } else {
	        var _err4 = new Error('no such key');
	
	        callback(_err4);
	        return reject(_err4);
	      }
	    });
	  });
	
	  promise.then(function (_ref5) {
	    var _ref6 = _slicedToArray(_ref5, 3);
	
	    var key = _ref6[0];
	    var field = _ref6[1];
	    var value = _ref6[2];
	
	    _this7.emit('hdel', key, field, value);
	  });
	
	  return promise;
	};
	
	/**
	 * Get the number of fields in a hash
	 * @param  {String}   key      key
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.hlen = function (key) {
	  var _this8 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  return new Promise(function (resolve, reject) {
	    _this8.exists(key, function (err, exists) {
	      if (err) {
	        reject(err);
	        return callback(err);
	      }
	
	      if (exists) {
	        _this8.get(key).then(function (data) {
	          var length = Object.keys(data).length;
	
	          resolve(length);
	          callback(null, length);
	        }, function (err) {
	          reject(err);
	          callback(err);
	        });
	      } else {
	        resolve(0);
	        callback(null, 0);
	      }
	    });
	  });
	};
	
	/**
	 * Get all the fields in a hash
	 * @param  {String}   key      key
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.hkeys = function (key) {
	  var _this9 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  return new Promise(function (resolve, reject) {
	
	    _this9.exists(key, function (err, exists) {
	      if (err) {
	        reject(err);
	        return callback(err);
	      }
	
	      if (exists) {
	        _this9.get(key).then(function (data) {
	          var keys = Object.keys(data);
	
	          resolve(keys);
	          callback(null, keys);
	        }, function (err) {
	          reject(err);
	          callback(err);
	        });
	      } else {
	        resolve([]);
	        callback(null, []);
	      }
	    });
	  });
	};
	
	/**
	 * Determine if a hash field exists
	 * @param  {String}   key      key of the hash
	 * @param  {String}   field    the field
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise object
	 */
	min.hexists = function (key, field) {
	  var _this10 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  return new Promise(function (resolve, reject) {
	    _this10.exists(key).then(function (exists) {
	      if (exists) {
	        return _this10.get(key);
	      } else {
	        resolve(false);
	        callback(null, false);
	      }
	    }).then(function (value) {
	      if (value.hasOwnProperty(field)) {
	        resolve(true);
	        callback(null, true);
	      } else {
	        resolve(false);
	        callback(null, false);
	      }
	    }, function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	
	min.hincr = function (key, field) {
	  var _this11 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  var promise = new Promise(function (resolve, reject) {
	    _this11.hexists(key, field).then(function (exists) {
	      if (exists) {
	        return _this11.hget(key, field);
	      } else {
	        var p = new Promise();
	
	        p.resolve(0);
	
	        return p;
	      }
	    }).then(function (curr) {
	      if (isNaN(parseFloat(curr))) {
	        var err = new Error('value wrong');
	        reject(err);
	        return callback(err);
	      }
	
	      curr = parseFloat(curr);
	
	      return _this11.hset(key, field, ++curr);
	    }).then(function (_ref7) {
	      var _ref8 = _slicedToArray(_ref7, 3);
	
	      var value = _ref8[2];
	
	      resolve(value);
	      callback(null, value);
	    }, function (err) {
	      reject(err);
	      callback(null, err);
	    });
	  });
	
	  promise.then(function (curr) {
	    return _this11.emit('hincr', key, field, curr);
	  });
	
	  return promise;
	};
	
	min.hincrby = function (key, field, increment) {
	  var _this12 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this12.hexists(key, field).then(function (exists) {
	      if (exists) {
	        return _this12.hget(key, field);
	      } else {
	        var p = new Promise();
	
	        p.resolve(0);
	
	        return p;
	      }
	    }).then(function (curr) {
	      if (isNaN(parseFloat(curr))) {
	        var err = new Error('value wrong');
	        reject(err);
	        return callback(err);
	      }
	
	      curr = parseFloat(curr);
	
	      return _this12.hset(key, field, curr + increment);
	    }).then(function (_ref9) {
	      var _ref10 = _slicedToArray(_ref9, 3);
	
	      var value = _ref10[2];
	
	      resolve(value);
	      callback(null, value);
	    }, function (err) {
	      reject(err);
	      callback(null, err);
	    });
	  });
	
	  promise.then(function (curr) {
	    _this12.emit('hincr', key, field, curr);
	  });
	  return promise;
	};
	
	min.hincrbyfloat = min.hincrby;
	
	min.hdecr = function (key, field) {
	  var _this13 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  var promise = new Promise(function (resolve, reject) {
	    _this13.hexists(key, field).then(function (exists) {
	      if (exists) {
	        return _this13.hget(key, field);
	      } else {
	        var p = new Promise();
	
	        p.resolve(0);
	
	        return p;
	      }
	    }).then(function (curr) {
	      if (isNaN(parseFloat(curr))) {
	        var err = new Error('value wrong');
	        reject(err);
	        return callback(err);
	      }
	
	      curr = parseFloat(curr);
	
	      return _this13.hset(key, field, --curr);
	    }).then(function (_ref11) {
	      var _ref12 = _slicedToArray(_ref11, 3);
	
	      var value = _ref12[2];
	
	      resolve(value);
	      callback(null, value);
	    }, function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (curr) {
	    _this13.emit('hdecr', key, field, curr);
	  });
	
	  return promise;
	};
	
	min.hdecrby = function (key, field, decrement) {
	  var _this14 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	    _this14.hexists(key, field).then(function (exists) {
	      if (exists) {
	        return _this14.hget(key, field);
	      } else {
	        var p = new Promise();
	
	        p.resolve(0);
	
	        return p;
	      }
	    }).then(function (curr) {
	      if (isNaN(parseFloat(curr))) {
	        var err = new Error('value wrong');
	        reject(err);
	        return callback(err);
	      }
	
	      curr = parseFloat(curr);
	
	      return _this14.hset(key, field, curr - decrement);
	    }).then(function (_ref13) {
	      var _ref14 = _slicedToArray(_ref13, 3);
	
	      var value = _ref14[2];
	
	      resolve(value);
	      callback(null, value);
	    }, function (err) {
	      reject(err);
	      callback(null, err);
	    });
	  });
	
	  promise.then(function (curr) {
	    return _this14.emit('hincr', key, field, curr);
	  });
	
	  return promise;
	};
	
	min.hdecrbyfloat = min.hdecrby;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {'use strict';
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(24);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var noop = _utils2.default.noop;
	var min = {};
	exports.default = min;
	
	/******************************
	**           List            **
	******************************/
	
	/**
	 * Prepend one or multiple values to a list
	 * @param  {String}   key      key
	 * @param  {Mix}   value       value
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	
	min.lpush = function (key) {
	  var _this = this;
	
	  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    values[_key - 1] = arguments[_key];
	  }
	
	  var callback = noop;
	
	  if (values[values.length - 1].apply) {
	    callback = values.splice(values.length - 1)[0];
	  }
	
	  var promise = new Promise(function (resolve, reject) {
	    _this.exists(key, function (err, exists) {
	      if (err) {
	        reject(err);
	        return callback(err);
	      }
	
	      if (exists) {
	        _this.get(key, function (err, data) {
	          if (err) {
	            reject(err);
	            return callback(err);
	          }
	
	          data.unshift.apply(data, values);
	
	          _this.set(key, data, function (err) {
	            if (err) {
	              reject(err);
	              return callback(err);
	            }
	
	            var length = data.length;
	
	            resolve(length);
	            callback(null, length);
	          });
	        });
	      } else {
	        var data = values.slice();
	
	        _this.set(key, data, function (err) {
	          if (err) {
	            reject(err);
	            return callback(err);
	          }
	
	          _this._keys[key] = 2;
	
	          resolve(1);
	          callback(null, 1);
	        });
	      }
	    });
	  });
	
	  promise.then(function (len) {
	    return _this.emit('lpush', key, values, len);
	  });
	
	  return promise;
	};
	
	/**
	 * Prepend a value to a list, only if the list exists
	 * @param  {String}   key      key
	 * @param  {Mix}   value       value
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.lpushx = function (key) {
	  var _this2 = this;
	
	  for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    values[_key2 - 1] = arguments[_key2];
	  }
	
	  var callback = noop;
	
	  if (values[values.length - 1].apply) {
	    callback = values.splice(values.length - 1)[0];
	  }
	
	  var promise = new Promise(function (resolve, reject) {
	    _this2.exists(key, function (err, exists) {
	      if (err) {
	        reject(err);
	        return callback(err);
	      }
	
	      if (exists) {
	        _this2.get(key, function (err, data) {
	          if (err) {
	            reject(err);
	            return callback(err);
	          }
	
	          if (!data.length) {
	            var err = new Error('The list is empty.');
	
	            callback(err);
	            return reject(err);
	          }
	
	          data.unshift.apply(data, values);
	
	          _this2.set(key, data, function (err) {
	            if (err) {
	              reject(err);
	              return callback(err);
	            }
	
	            var length = data.length;
	
	            resolve(length);
	            callback(null, length);
	          });
	        });
	      } else {
	        var _err = new Error('no such key');
	
	        callback(_err);
	        return reject(_err);
	      }
	    });
	  });
	  promise.then(function (len) {
	    return _this2.emit('lpush', key, values, len);
	  });
	
	  return promise;
	};
	
	/**
	 * Append one or multiple values to a list
	 * @param  {String}   key      key
	 * @param  {Mix}   value       value
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.rpush = function (key) {
	  var _this3 = this;
	
	  for (var _len3 = arguments.length, values = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    values[_key3 - 1] = arguments[_key3];
	  }
	
	  var callback = noop;
	
	  if (values[values.length - 1].apply) {
	    callback = values.splice(values.length - 1)[0];
	  }
	
	  var promise = new Promise(function (resolve, reject) {
	    _this3.exists(key, function (err, exists) {
	      if (err) {
	        reject(err);
	        return callback(err);
	      }
	
	      if (exists) {
	        _this3.get(key, function (err, data) {
	          if (err) {
	            reject(err);
	            return callback(err);
	          }
	
	          data.push.apply(data, values);
	
	          _this3.set(key, data, function (err) {
	            if (err) {
	              reject(err);
	              return callback(err);
	            }
	
	            var length = data.length;
	
	            resolve(length);
	            callback(null, length);
	          });
	        });
	      } else {
	        var data = values.slice();
	
	        _this3.set(key, data, function (err) {
	          if (err) {
	            reject(err);
	            return callback(err);
	          }
	
	          resolve(1);
	          callback(null, 1);
	        });
	      }
	    });
	  });
	  promise.then(function (len) {
	    return _this3.emit('rpush', key, values, len);
	  });
	
	  return promise;
	};
	
	/**
	 * Prepend a value to a list, only if the list exists
	 * @param  {String}   key      key
	 * @param  {Mix}   value       value
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.rpushx = function (key) {
	  var _this4 = this;
	
	  for (var _len4 = arguments.length, values = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    values[_key4 - 1] = arguments[_key4];
	  }
	
	  var callback = noop;
	
	  if (values[values.length - 1].apply) {
	    callback = values.splice(values.length - 1)[0];
	  }
	
	  var promise = new Promise(function (resolve, reject) {
	    _this4.exists(key, function (err, exists) {
	      if (err) {
	        reject(err);
	        return callback(err);
	      }
	
	      if (exists) {
	        _this4.get(key, function (err, data) {
	          if (err) {
	            reject(err);
	            return callback(err);
	          }
	
	          if (!data.length) {
	            var _err2 = new Error('The list is empty.');
	
	            callback(_err2);
	            return reject(_err2);
	          }
	
	          data.push.apply(data, values);
	
	          _this4.set(key, data, function (err) {
	            if (err) {
	              reject(err);
	              return callback(err);
	            }
	
	            var length = data.length;
	
	            resolve(length);
	            callback(null, length);
	          });
	        });
	      } else {
	        var _err3 = new Error('no such key');
	
	        callback(_err3);
	        return reject(_err3);
	      }
	    });
	  });
	  promise.then(function (len) {
	    return _this4.emit('rpush', key, values, len);
	  });
	
	  return promise;
	};
	
	/**
	 * Remove and get the first element in a list
	 * @param  {String}   key      key
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.lpop = function (key) {
	  var _this5 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  var val = null;
	  var promise = new Promise(function (resolve, reject) {
	
	    _this5.exists(key).then(function (exists) {
	      if (exists) {
	        return _this5.get(key);
	      } else {
	        resolve(null);
	        callback(null, null);
	      }
	    }).then(function (data) {
	      val = data.shift();
	
	      return _this5.set(key, data);
	    }).then(function (_) {
	      resolve(val);
	      callback(null, val);
	    }, function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (value) {
	    return _this5.emit('lpop', key, value);
	  });
	
	  return promise;
	};
	
	/**
	 * Remove and get the last element in a list
	 * @param  {String}   key      key
	 * @param  {Function} callback Callback
	 * @return {Promise}           promise
	 */
	min.rpop = function (key) {
	  var _this6 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  var value = null;
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this6.exists(key).then(function (exists) {
	      if (exists) {
	        return _this6.get(key);
	      } else {
	        resolve(null);
	        callback(null, null);
	      }
	    }).then(function (data) {
	      value = data.pop();
	
	      return _this6.set(key, data);
	    }).then(function (_) {
	      resolve(value);
	      callback(null, value);
	    }, function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (value) {
	    return _this6.emit('rpop', key, value);
	  });
	
	  return promise;
	};
	
	/**
	 * Get the length of a list
	 * @param  {String}   key      key
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.llen = function (key) {
	  var _this7 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  return new Promise(function (resolve, reject) {
	
	    _this7.exists(key, function (err, exists) {
	      if (err) {
	        reject(err);
	        return callback(err);
	      }
	
	      if (exists) {
	        _this7.get(key, function (err, data) {
	          if (err) {
	            reject(err);
	            return callback(err);
	          }
	
	          var length = data.length;
	
	          resolve(length);
	          callback(null, length);
	        });
	      } else {
	        resolve(0);
	        callback(null, 0);
	      }
	    });
	  });
	};
	
	/**
	 * Get a range of elements from a list
	 * @param  {String}   key      key
	 * @param  {Number}   start    min score
	 * @param  {Number}   stop     max score
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.lrange = function (key, start, stop) {
	  var _this8 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  return new Promise(function (resolve, reject) {
	
	    _this8.exists(key, function (err, exists) {
	      if (err) {
	        reject(err);
	        return callback(err);
	      }
	
	      if (exists) {
	        _this8.get(key, function (err, data) {
	          if (err) {
	            reject(err);
	            return callback(err);
	          }
	
	          if (stop < 0) {
	            stop = data.length + stop;
	          }
	
	          var values = data.slice(start, stop + 1);
	
	          resolve(values);
	          callback(null, values);
	        });
	      } else {
	        resolve([]);
	        callback(null, []);
	      }
	    });
	  });
	};
	
	/**
	 * Remove elements from a list
	 * @param  {String}   key      key
	 * @param  {Number}   count    count to remove
	 * @param  {Mix}      value    value
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.lrem = function (key, count, value) {
	  var _this9 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var removeds = 0;
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this9.exists(key).then(function (exists) {
	      if (exists) {
	        return _this9.get(key);
	      } else {
	        resolve(0);
	        callback(null, 0);
	      }
	    }).then(function (data) {
	      switch (true) {
	        case count > 0:
	          for (var i = 0; i < data.length && removeds < count; i++) {
	            if (data[i] === value) {
	              data.splice(i, 1)[0];
	
	              removeds++;
	            }
	          }
	          break;
	        case count < 0:
	          for (var i = data.length - 1; i >= 0 && removeds < -count; i--) {
	            if (data[i] === value) {
	              data.splice(i, 1)[0];
	
	              removeds++;
	            }
	          }
	          break;
	        case count == 0:
	          for (var i = data.length - 1; i >= 0; i--) {
	            if (data[i] === value) {
	              data.splice(i, 1)[0];
	
	              removeds++;
	            }
	          }
	          break;
	      }
	
	      return _this9.set(key, data);
	    }).then(function () {
	      resolve(removeds);
	      callback(null, removeds);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (removeds) {
	    return _this9.emit('lrem', key, count, value, removeds);
	  });
	
	  return promise;
	};
	
	/**
	 * Remove elements from a list
	 * @param  {String}   key      key
	 * @param  {Number}   index    position to set
	 * @param  {Mix}      value    value
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.lset = function (key, index, value) {
	  var _this10 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this10.exists(key).then(function (exists) {
	      if (exists) {
	        return _this10.get(key);
	      } else {
	        throw new Error('no such key');
	      }
	    }).then(function (data) {
	      if (index < 0 && data.length > 0) {
	        index = data.length + index;
	      }
	
	      if (!data[index] || !data.length) {
	        throw new Error('Illegal index');
	      }
	
	      if (data.length == index) {
	        data.push(value);
	      } else {
	        data[index] = value;
	      }
	
	      return _this10.set(key, data);
	    }).then(function () {
	      resolve();
	      callback(null);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (len) {
	    return _this10.emit('lset', key, index, value, len);
	  });
	
	  return promise;
	};
	
	/**
	 * Trim a list to the specified range
	 * @param  {String}   key      key
	 * @param  {Number}   start    start
	 * @param  {Number}   stop     stop
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.ltrim = function (key, start, stop) {
	  var _this11 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  return new Promise(function (resolve, reject) {
	
	    _this11.exists(key).then(function (exists) {
	      if (!exists) {
	        throw new Error('no such key');
	      }
	
	      return _this11.get(key);
	    }).then(function (data) {
	      if (start < 0) {
	        start = data.length + start;
	      }
	
	      if (stop < 0) {
	        stop = data.length + stop;
	      }
	
	      var values = data.slice(start, stop + 1);
	
	      return _this11.set(key, values);
	    }).then(function () {
	      return _this11.get(key);
	    }).then(function (values) {
	      resolve(values);
	      callback(null, values, key);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	
	/**
	 * Get an element from a list by its index
	 * @param  {String}   key      key
	 * @param  {Number}   index    index
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.lindex = function (key, index) {
	  var _this12 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  return new Promise(function (resolve, reject) {
	
	    _this12.exists(key).then(function (exists) {
	      if (!exists) {
	        var err = new Error('no such key');
	
	        reject(err);
	        return callback(err);
	      }
	
	      return _this12.get(key);
	    }).then(function (data) {
	      if (index > data.length - 1) {
	        throw new Error('Illegal index');
	      }
	
	      var value = data[index];
	
	      resolve(value);
	      callback(null, value);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	
	/**
	 * Insert an element before another element in a list
	 * @param  {String}   key      key
	 * @param  {Mix}   pivot       pivot
	 * @param  {Mix}   value       value
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.linsertBefore = function (key, pivot, value) {
	  var _this13 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this13.exists(key).then(function (exists) {
	      if (exists) {
	        return _this13.get(key);
	      } else {
	        throw new Error('no such key');
	      }
	    }).then(function (data) {
	      var index = data.indexOf(pivot);
	
	      if (index < 0) {
	        resolve(-1);
	        callback(null, -1);
	        return;
	      }
	
	      var prev = data.slice(0, index);
	      var next = data.slice(index);
	
	      var newData = prev.slice();
	      newData.push.apply(newData, [value].concat(_toConsumableArray(next)));
	
	      return _this13.set(key, newData);
	    }).then(function (key) {
	      if (key.substr) {
	        return _this13.get(key);
	      }
	    }).then(function (data) {
	      resolve(data.length);
	      callback(null, data.length);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (len) {
	    return _this13.emit('linsertBefore', key, pivot, value, len);
	  });
	
	  return promise;
	};
	
	/**
	 * Insert an element after another element in a list
	 * @param  {String}   key      key
	 * @param  {Mix}   pivot       pivot
	 * @param  {Mix}   value       value
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.linsertAfter = function (key, pivot, value) {
	  var _this14 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this14.exists(key).then(function (exists) {
	      if (exists) {
	        return _this14.get(key);
	      } else {
	        throw new Error('no such key');
	      }
	    }).then(function (data) {
	      var index = data.indexOf(pivot) + 1;
	
	      if (index < 0) {
	        resolve(-1);
	        callback(null, -1);
	        return;
	      }
	
	      var prev = data.slice(0, index);
	      var next = data.slice(index);
	
	      var newData = prev.slice();
	      newData.push.apply(newData, [value].concat(_toConsumableArray(next)));
	
	      return _this14.set(key, newData);
	    }).then(function (key) {
	      if (key.substr) {
	        return _this14.get(key);
	      }
	    }).then(function (data) {
	      resolve(data.length);
	      callback(null, data.length);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (len) {
	    return _this14.emit('linsertAfter', key, pivot, value, len);
	  });
	
	  return promise;
	};
	
	/**
	 * Remove the last element in a list, append it to another list and return it
	 * @param  {String}   src      source
	 * @param  {String}   dest     destination
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.rpoplpush = function (src, dest) {
	  var _this15 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  var value = null;
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this15.rpop(src).then(function (_) {
	      return _this15.lpush(dest, value = _);
	    }).then(function (length) {
	      resolve([value, length]);
	      callback(null, value, length);
	    }, function (err) {
	      callback(err);
	      reject(err);
	    });
	  });
	
	  promise.then(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2);
	
	    var value = _ref2[0];
	    var len = _ref2[1];
	    return _this15.emit('rpoplpush', src, dest, value, len);
	  });
	
	  return promise;
	};
	
	/**
	 * Remove the last element in a list, append it to another list and return it
	 * @param  {String}   src      source
	 * @param  {String}   dest     destination
	 * @param  {Function} callback callback
	 * @return {Promise}           promise
	 */
	min.lpoprpush = function (src, dest) {
	  var _this16 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  var value = null;
	
	  var promise = new Promise(function (resolve, reject) {
	    _this16.lpop(src).then(function (_) {
	      return _this16.rpush(dest, value = _);
	    }).then(function (length) {
	      resolve(value, length);
	      callback(null, value, length);
	    }, function (err) {
	      callback(err);
	      reject(err);
	    });
	  });
	
	  promise.then(function (value, len) {
	    return _this16.emit('lpoprpush', src, dest, value, len);
	  });
	
	  return promise;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {'use strict';
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(24);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var noop = _utils2.default.noop;
	
	var min = {};
	exports.default = min;
	
	/******************************
	**           Set             **
	******************************/
	
	min.sadd = function (key) {
	  var _this = this;
	
	  for (var _len = arguments.length, members = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    members[_key - 1] = arguments[_key];
	  }
	
	  var promise = new Promise(function (resolve, reject) {
	
	    var added = 0;
	
	    var callback = noop;
	
	    if (members[members.length - 1] instanceof Function) {
	      callback = members.pop();
	    }
	
	    _this.exists(key).then(function (exists) {
	      if (exists) {
	        return _this.get(key);
	      } else {
	        var data = _utils2.default.arrayUnique(members);
	
	        return _this.set(key, data);
	      }
	    }).then(function () {
	      if (Array.isArray(arguments[0])) {
	        var data = arguments[0];
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = members[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var curr = _step.value;
	
	            if (data.indexOf(curr) >= 0) {
	              continue;
	            } else {
	              data.push(curr);
	              added++;
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	
	        return _this.set(key, data);
	      } else if (typeof arguments[0] === 'string') {
	        added += members.length;
	
	        _this._keys[key] = 3;
	
	        resolve(added);
	        callback(null, added);
	      }
	    }).then(function (_) {
	      _this._keys[key] = 3;
	
	      resolve(added);
	      callback(null, added);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (len) {
	    return _this.emit('sadd', key, len);
	  });
	
	  return promise;
	};
	
	min.srem = function (key) {
	  var _this2 = this;
	
	  for (var _len2 = arguments.length, members = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    members[_key2 - 1] = arguments[_key2];
	  }
	
	  var callback = noop;
	  var promise = new Promise(function (resolve, reject) {
	
	    var removeds = 0;
	
	    if (members[members.length - 1] instanceof Function) {
	      callback = members.pop();
	    }
	
	    _this2.exists(key).then(function (exists) {
	      if (exists) {
	        return _this2.get(key);
	      } else {
	        throw new Error('no such key');
	      }
	    }).then(function (data) {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = members[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var curr = _step2.value;
	
	          var i = data.indexOf(curr);
	          if (i >= 0) {
	            data.splice(i, 1);
	            removeds++;
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	
	      return _this2.set(key, data);
	    }).then(function (_) {
	
	      _this2._keys[key] = 3;
	
	      resolve(removeds);
	      callback(null, removeds);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (len) {
	    return _this2.emit('srem', key, members, len);
	  });
	
	  return promise;
	};
	
	min.smembers = function (key) {
	  var _this3 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  return new Promise(function (resolve, reject) {
	
	    _this3.exists(key).then(function (exists) {
	      if (exists) {
	        return _this3.get(key);
	      } else {
	        throw new Error('no such key');
	      }
	    }).then(function (members) {
	      resolve(members);
	      callback(null, members);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	
	min.sismember = function (key, value) {
	  var _this4 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  return new Promise(function (resolve, reject) {
	    _this4.exists(key).then(function (exists) {
	      if (exists) {
	        return _this4.get(key);
	      } else {
	        throw new Error('no such key');
	      }
	    }).then(function (members) {
	      var res = members.indexOf(value) >= 0 ? true : false;
	
	      resolve(res);
	      callback(null, res);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	
	min.scard = function (key) {
	  var _this5 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  return new Promise(function (resolve, reject) {
	
	    _this5.exists(key).then(function (exists) {
	      if (exists) {
	        return _this5.get(key);
	      } else {
	        throw new Error('no such key');
	      }
	    }).then(function (data) {
	      var length = data.length;
	
	      resolve(length);
	      callback(null, length);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	
	min.smove = function (src, dest, member) {
	  var _this6 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this6.exists(src).then(function (exists) {
	      if (exists) {
	        return _this6.sismember(src, member);
	      } else {
	        throw new Error('no such key');
	      }
	    }).then(function (isMember) {
	      if (isMember) {
	        return _this6.srem(src, member);
	      } else {
	        throw new Error('no such member');
	      }
	    }).then(function () {
	      return _this6.sadd(dest, member);
	    }).then(function (_) {
	      _this6._keys[dest] = 3;
	      resolve(1);
	      callback(null, 1);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (ok) {
	    return _this6.emit('smove', src, dest, member, ok);
	  });
	
	  return promise;
	};
	
	min.srandmember = function (key) {
	  var _this7 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  return new Promise(function (resolve, reject) {
	
	    _this7.exists(key).then(function (exists) {
	      if (exists) {
	        return _this7.get(key);
	      } else {
	        resolve(null);
	        callback(null, null);
	      }
	    }).then(function (members) {
	      var index = Math.floor(Math.random() * members.length) || 0;
	
	      var member = members[index];
	
	      resolve(member);
	      callback(null, member);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	
	min.spop = function (key) {
	  var _this8 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    var member = null;
	
	    _this8.exists(key).then(function (exists) {
	      if (exists) {
	        return _this8.srandmember(key);
	      } else {
	        resolve(null);
	        callback(null, null);
	      }
	    }).then(function (_member) {
	      member = _member;
	
	      return _this8.srem(key, member);
	    }).then(function (_) {
	      resolve(member);
	      callback(null, member);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (value) {
	    return _this8.emit('spop', key, value);
	  });
	
	  return promise;
	};
	
	min.sunion = function () {
	  var _this9 = this;
	
	  for (var _len3 = arguments.length, keys = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    keys[_key3] = arguments[_key3];
	  }
	
	  return new Promise(function (resolve, reject) {
	
	    var callback = noop;
	
	    if (keys[keys.length - 1] instanceof Function) {
	      callback = keys.pop();
	    }
	
	    var members = [];
	
	    var loop = function loop(index) {
	      var curr = keys[index];
	
	      if (curr) {
	        _this9.exists(curr).then(function (exists) {
	          if (exists) {
	            return _this9.get(curr);
	          } else {
	            loop(++index);
	          }
	        }).then(function (data) {
	          if (Array.isArray(data)) {
	            members = members.concat(data);
	          }
	
	          loop(++index);
	        }, function (err) {
	          reject(err);
	          return callback(err);
	        });
	      } else {
	        members = _utils2.default.arrayUnique(members);
	        resolve(members);
	        callback(null, members);
	      }
	    };
	
	    loop(0);
	  });
	};
	
	min.sunionstore = function (dest) {
	  var _this10 = this;
	
	  for (var _len4 = arguments.length, keys = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    keys[_key4 - 1] = arguments[_key4];
	  }
	
	  var promise = new Promise(function (resolve, reject) {
	
	    if (keys[keys.length - 1] instanceof Function) {
	      callback = keys.pop();
	    }
	
	    var members = null;
	
	    _this10.sunion.apply(_this10, keys).then(function (_members) {
	      members = _members;
	
	      return _this10.del(dest);
	    }).then(function () {
	      return _this10.sadd.apply(_this10, [dest].concat(_toConsumableArray(members)));
	    }).then(function (length) {
	      resolve([length, members]);
	      callback(null, length, members);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	  var callback = noop;
	
	  promise.then(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2);
	
	    var length = _ref2[0];
	    var members = _ref2[1];
	    return _this10.emit('sunionstore', dest, keys, length, members);
	  });
	
	  return promise;
	};
	
	min.sinter = function () {
	  var _this11 = this;
	
	  for (var _len5 = arguments.length, keys = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	    keys[_key5] = arguments[_key5];
	  }
	
	  return new Promise(function (resolve, reject) {
	
	    var callback = noop;
	
	    if (keys[keys.length - 1] instanceof Function) {
	      callback = keys.pop();
	    }
	
	    var memberRows = [];
	
	    var loop = function loop(index) {
	      var curr = keys[index];
	
	      if (curr) {
	        _this11.exists(curr).then(function (exists) {
	          if (exists) {
	            return _this11.get(curr);
	          } else {
	            loop(++index);
	          }
	        }).then(function (data) {
	          if (Array.isArray(data)) {
	            memberRows.push(data);
	          }
	
	          loop(++index);
	        }, function (err) {
	          reject(err);
	          return callback(err);
	        });
	      } else {
	        var members = _utils2.default.arrayInter.apply(_utils2.default, memberRows);
	        resolve(members);
	        callback(null, members);
	      }
	    };
	    loop(0);
	  });
	};
	
	min.sinterstore = function (dest) {
	  var _this12 = this;
	
	  for (var _len6 = arguments.length, keys = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
	    keys[_key6 - 1] = arguments[_key6];
	  }
	
	  return new Promise(function (resolve, reject) {
	
	    var callback = noop;
	
	    if (keys[keys.length - 1] instanceof Function) {
	      callback = keys.pop();
	    }
	
	    promise.then(function (_ref3) {
	      var _ref4 = _slicedToArray(_ref3, 2);
	
	      var length = _ref4[0];
	      var members = _ref4[1];
	      return _this12.emit('sinterstore', dest, keys, length, members);
	    });
	
	    var members = null;
	
	    _this12.sinter.apply(_this12, keys).then(function (_members) {
	      members = _members;
	
	      return _this12.del(dest);
	    }).then(function () {
	      return _this12.sadd.apply(_this12, [dest].concat(_toConsumableArray(members)));
	    }).then(function (length) {
	      resolve([members.length, members]);
	      callback(null, members.length, members);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	
	min.sdiff = function () {
	  var _this13 = this;
	
	  for (var _len7 = arguments.length, keys = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	    keys[_key7] = arguments[_key7];
	  }
	
	  return new Promise(function (resolve, reject) {
	
	    var callback = noop;
	
	    if (keys[keys.length - 1] instanceof Function) {
	      callback = keys.pop();
	    }
	
	    var memberRows = [];
	
	    var loop = function loop(index) {
	      var curr = keys[index];
	
	      if (curr) {
	        _this13.exists(curr).then(function (exists) {
	          if (exists) {
	            return _this13.get(curr);
	          } else {
	            loop(++index);
	          }
	        }).then(function (data) {
	          if (Array.isArray(data)) {
	            memberRows.push(data);
	          }
	
	          loop(++index);
	        }).catch(function (err) {
	          reject(err);
	          return callback(err);
	        });
	      } else {
	        var members = _utils2.default.arrayDiff.apply(_utils2.default, memberRows);
	
	        resolve(members);
	        callback(null, members);
	      }
	    };
	    loop(0);
	  });
	};
	
	min.sdiffstore = function (dest) {
	  var _this14 = this;
	
	  for (var _len8 = arguments.length, keys = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
	    keys[_key8 - 1] = arguments[_key8];
	  }
	
	  return new Promise(function (resolve, reject) {
	
	    var callback = noop;
	
	    if (keys[keys.length - 1] instanceof Function) {
	      callback = keys.pop();
	    }
	
	    promise.then(function (_ref5) {
	      var _ref6 = _slicedToArray(_ref5, 2);
	
	      var length = _ref6[0];
	      var members = _ref6[1];
	      return _this14.emit('sdiffstore', dest, keys, length, members);
	    });
	
	    var members = null;
	
	    _this14.sdiff.apply(_this14, keys).then(function (_members) {
	      members = _members;
	
	      return _this14.del(dest);
	    }).then(function (exists) {
	      return _this14.sadd.apply(_this14, [dest].concat(_toConsumableArray(members)));
	    }).then(function (length) {
	      resolve([length, members]);
	      callback(null, length, members);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(24);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	var noop = _utils2.default.noop;
	
	var min = {};
	exports.default = min;
	
	/******************************
	**         Sorted Set        **
	******************************/
	
	min.zadd = function (key, score, member) {
	  var _this = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this.exists(key).then(function (exists) {
	      if (exists) {
	        return _this.get(key);
	      } else {
	        var score2HashsMap = {};
	        score2HashsMap[score] = [0];
	
	        return _this.set(key, {
	          // members
	          ms: [member],
	          // mapping hash to score
	          hsm: { 0: score },
	          // mapping score to hash
	          shm: score2HashsMap
	        });
	      }
	    }).then(function (_key) {
	      if ('string' === typeof _key) {
	        _this._keys[key] = 4;
	
	        resolve(1, 1);
	        callback(null, 1, 1);
	      } else if ('object' === (typeof _key === 'undefined' ? 'undefined' : _typeof(_key))) {
	        var data = _key;
	
	        if (data.ms.indexOf(member) >= 0) {
	          var len = data.ms.length;
	
	          resolve(0, len);
	          return callback(null, 0, len);
	        }
	
	        // new hash
	        var hash = data.ms.length;
	        // append the new member
	        data.ms.push(member);
	
	        // mapping hash to score
	        data.hsm[hash] = score;
	
	        // mapping score to hash
	        if (Array.isArray(data.shm[score])) {
	          data.shm[score].push(hash);
	        } else {
	          data.shm[score] = [hash];
	        }
	
	        return _this.set(key, data);
	      }
	    }).then(function () {
	      return _this.get(key);
	    }).then(function (data) {
	      _this._keys[key] = 4;
	
	      var len = data.ms.length;
	
	      resolve(1, len);
	      callback(null, 1, len);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (len) {
	    return _this.emit('zadd', key, score, member, len);
	  });
	
	  return promise;
	};
	
	min.zcard = function (key) {
	  var _this2 = this;
	
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  return new Promise(function (resolve, reject) {
	
	    _this2.exists(key).then(function (exists) {
	      if (exists) {
	        return _this2.get(key);
	      } else {
	        var err = new Error('no such key');
	
	        reject(err);
	        callback(err);
	      }
	    }).then(function (data) {
	      var len = data.ms.filter(Boolean).length;
	
	      resolve(len);
	      callback(null, len);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	
	min.zcount = function (key, min, max) {
	  var _this3 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this3.exists(key).then(function (exists) {
	      if (exists) {
	        return _this3.get(key);
	      } else {
	        var err = new Error('no such key');
	
	        reject(err);
	        callback(err);
	      }
	    }).then(function (data) {
	      var hashs = Object.keys(data.shm).filter(function (score) {
	        return min <= score && score <= max;
	      }).map(function (score) {
	        return data.shm[score];
	      });
	
	      var len = hashs.map(function (hash) {
	        return hash.length;
	      }).reduce(function (a, b) {
	        return a + b;
	      });
	
	      resolve(len);
	      callback(null, len);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (len) {
	    return _this3.emit('zcount', key, min, max, value, len);
	  });
	
	  return promise;
	};
	
	min.zrem = function (key) {
	  var _this4 = this;
	
	  for (var _len = arguments.length, members = Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
	    members[_key2 - 1] = arguments[_key2];
	  }
	
	  var callback = noop;
	
	  if (members[members.length - 1] instanceof Function) {
	    callback = members.pop();
	  }
	  var promise = new Promise(function (resolve, reject) {
	
	    var removeds = 0;
	
	    _this4.exists(key).then(function (exists) {
	      if (exists) {
	        return _this4.get(key);
	      } else {
	        var err = new Error('no such key');
	
	        reject(err);
	        callback(err);
	      }
	    }).then(function (data) {
	      var p = new Promise(noop);
	
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = members[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var hash = _step.value;
	
	          var i = data.ms.indexOf(hash);
	
	          if (i >= 0) {
	            delete data.ms[i];
	            var score = data.hsm[i];
	            delete data.hsm[i];
	
	            var ii = data.shm[String(score)].indexOf(i);
	            if (ii >= 0) {
	              data.shm[String(score)].splice(ii, 1);
	            }
	
	            removeds++;
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	
	      p.resolve(data);
	
	      return p;
	    }).then(function (data) {
	      return _this4.set(key, data);
	    }).then(function (_) {
	      resolve(removeds);
	      callback(null, removeds);
	    }).catch(function (err) {
	      reject(err);
	      callback(null, err);
	    });
	  });
	
	  promise.then(function (removeds) {
	    return _this4.emit('zrem', key, members, removeds);
	  });
	
	  return promise;
	};
	
	min.zscore = function (key, member) {
	  var _this5 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  return new Promise(function (resolve, reject) {
	
	    _this5.exists(key).then(function (exists) {
	      if (exists) {
	        return _this5.get(key);
	      } else {
	        var err = new Error('no such key');
	
	        reject(err);
	        callback(err);
	      }
	    }).then(function (data) {
	      var hash = data.ms.indexOf(member);
	
	      if (hash >= 0) {
	        var score = data.hsm[hash];
	
	        resolve(score);
	        callback(null, score);
	      } else {
	        var err = new Error('This member does not be in the set');
	
	        reject(err);
	        callback(err);
	      }
	    });
	  });
	};
	
	min.zrange = function (key, min, max) {
	  var _this6 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	    _this6.exists(key).then(function (exists) {
	      if (exists) {
	        return _this6.get(key);
	      } else {
	        var err = new Error('no such key');
	
	        reject(err);
	        callback(err);
	      }
	    }).then(function (data) {
	      var hashs = Object.keys(data.shm).map(function (s) {
	        return parseFloat(s);
	      }).sort().filter(function (score) {
	        return min <= score && score <= max;
	      }).map(function (score) {
	        return data.shm[score];
	      });
	
	      var members = hashs.map(function (hash) {
	        return hash.map(function (row) {
	          return data.ms[row];
	        });
	      }).reduce(function (a, b) {
	        return a.concat(b);
	      });
	
	      resolve(members);
	      callback(null, members);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	
	    promise.withScore = function () {
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];
	
	      return new Promise(function (resolve, reject) {
	        promise.then(function (members) {
	          var multi = _this6.multi();
	
	          members.forEach(function (member) {
	            return multi.zscore(key, member);
	          });
	
	          multi.exec(function (err, replies) {
	            if (err) {
	              callback(err);
	              return p.reject(err);
	            }
	
	            var rtn = replies.map(function (reply, ii) {
	              return {
	                member: members[ii],
	                score: reply
	              };
	            });
	
	            resolve(rtn);
	            callback(null, rtn);
	          });
	        });
	      });
	    };
	  });
	
	  return promise;
	};
	
	min.zrevrange = function (key, min, max) {
	  var _this7 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    _this7.exists(key).then(function (exists) {
	      if (exists) {
	        return _this7.get(key);
	      } else {
	        var err = new Error('no such key');
	
	        reject(err);
	        callback(err);
	      }
	    }).then(function (data) {
	      var hashs = Object.keys(data.shm).map(function (s) {
	        return parseFloat(s);
	      }).sort(function (a, b) {
	        return b > a;
	      }).filter(function (score) {
	        return min <= score && score <= max;
	      }).map(function (score) {
	        return data.shm[score];
	      });
	
	      var members = hashs.map(function (hash) {
	        return hash.map(function (row) {
	          return data.ms[row];
	        });
	      }).reduce(function (a, b) {
	        return a.concat(b);
	      });
	
	      resolve(members);
	      callback(null, members);
	    }, function (err) {
	      reject(err);
	      callback(err);
	    });
	
	    promise.withScore = function () {
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];
	
	      return new Promise(function (resolve, reject) {
	        promise.then(function (members) {
	          var multi = _this7.multi();
	
	          members.forEach(function (member) {
	            return multi.zscore(key, member);
	          });
	
	          multi.exec(function (err, replies) {
	            if (err) {
	              callback(err);
	              return p.reject(err);
	            }
	
	            var rtn = replies.map(function (reply, ii) {
	              return {
	                member: members[ii],
	                score: reply
	              };
	            });
	
	            resolve(rtn);
	            callback(null, rtn);
	          });
	        });
	      });
	    };
	  });
	
	  return promise;
	};
	
	min.zincrby = function (key, increment, member) {
	  var _this8 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    var newScore = null;
	
	    _this8.exists(key).then(function (exists) {
	      if (exists) {
	        return _this8.zscore(key, member);
	      } else {
	        _this8.zadd(key, 0, member, callback).then(resolve.bind(promise), reject.bind(promise));
	      }
	    }).then(function (_) {
	      return _this8.get(key);
	    }).then(function (data) {
	      var hash = data.ms.indexOf(member);
	      var score = data.hsm[hash];
	
	      newScore = score + increment;
	
	      var ii = data.shm[score].indexOf(hash);
	      data.shm[score].splice(ii, 1);
	
	      data.hsm[hash] = newScore;
	      if (data.shm[newScore]) {
	        data.shm[newScore].push(hash);
	      } else {
	        data.shm[newScore] = [hash];
	      }
	
	      return _this8.set(key, data);
	    }).then(function (_) {
	      resolve(newScore);
	      callback(null, newScore);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (score) {
	    return _this8.emit('zincrby', key, increment, member, score);
	  });
	
	  return promise;
	};
	
	min.zdecrby = function (key, decrement, member) {
	  var _this9 = this;
	
	  var callback = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];
	
	  var promise = new Promise(function (resolve, reject) {
	
	    var newScore = null;
	
	    _this9.exists(key).then(function (exists) {
	      if (exists) {
	        return _this9.zscore(key, member);
	      } else {
	        var err = new Error('no such key');
	
	        reject(err);
	        callback(err);
	      }
	    }).then(function (_) {
	      return _this9.get(key);
	    }).then(function (data) {
	      var hash = data.ms.indexOf(member);
	      var score = data.hsm[hash];
	
	      newScore = score - decrement;
	
	      var ii = data.shm[score].indexOf(hash);
	      data.shm[score].splice(ii, 1);
	
	      data.hsm[hash] = newScore;
	      if (data.shm[newScore]) {
	        data.shm[newScore].push(hash);
	      } else {
	        data.shm[newScore] = [hash];
	      }
	
	      return _this9.set(key, data);
	    }).then(function (_) {
	      resolve(newScore);
	      callback(null, newScore);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	
	  promise.then(function (score) {
	    return _this9.emit('zdecrby', keys, decrement, member, score);
	  });
	
	  return promise;
	};
	
	min.zrank = function (key, member) {
	  var _this10 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  return new Promise(function (resolve, reject) {
	
	    _this10.exists(key).then(function (exists) {
	      if (exists) {
	        return _this10.get(key);
	      } else {
	        throw new Error('no such key');
	      }
	    }).then(function (data) {
	      var scores = Object.keys(data.shm).map(function (s) {
	        return parseFloat(s);
	      }).sort();
	      var score = parseFloat(data.hsm[data.ms.indexOf(member)]);
	
	      var rank = scores.indexOf(score) + 1;
	
	      resolve(rank);
	      callback(null, rank);
	    }).catch(function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	
	min.zrevrank = function (key, member) {
	  var _this11 = this;
	
	  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	  return new Promise(function (resolve, reject) {
	    _this11.exists(key).then(function (exists) {
	      if (exists) {
	        return _this11.get(key);
	      } else {
	        throw new Error('no such key');
	      }
	    }).then(function (data) {
	      var scores = Object.keys(data.shm).map(function (s) {
	        return parseFloat(s);
	      }).sort();
	      var score = parseFloat(data.hsm[data.ms.indexOf(member)]);
	
	      var rank = scores.reverse().indexOf(score) + 1;
	
	      resolve(rank);
	      callback(null, rank);
	    }, function (err) {
	      reject(err);
	      callback(err);
	    });
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(24);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var noop = _utils2.default.noop;
	
	var min = {};
	exports.default = min;
	
	/******************************
	**            Mise           **
	******************************/
	
	var Multi = (function () {
	  function Multi(_min) {
	    var _this = this;
	
	    _classCallCheck(this, Multi);
	
	    this.queue = [];
	    this.last = null;
	    this.state = 0;
	    this.min = _min;
	
	    var keys = Object.getOwnPropertyNames(_min);
	
	    for (var i = 0; i < keys.length; i++) {
	      var prop = keys[i];
	
	      if ('function' === typeof _min[prop]) {
	        (function (method) {
	          _this[method] = function () {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	              args[_key] = arguments[_key];
	            }
	
	            _this.queue.push({
	              method: method,
	              args: args
	            });
	
	            return _this;
	          };
	        })(prop);
	      }
	    }
	  }
	
	  _createClass(Multi, [{
	    key: 'exec',
	    value: function exec() {
	      var _this2 = this;
	
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];
	
	      var results = [];
	      return new Promise(function (resolve, reject) {
	        var loop = function loop(task) {
	          if (task) {
	            _this2.min[task.method].apply(_this2.min, task.args).then(function () {
	              for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                args[_key2] = arguments[_key2];
	              }
	
	              if (args.length > 1) {
	                results.push(args);
	              } else {
	                results.push(args[0]);
	              }
	              loop(_this2.queue.shift());
	            }).catch(function (err) {
	              reject(err);
	              callback(err, results);
	            });
	          } else {
	            resolve(results);
	            callback(null, results);
	          }
	        };
	
	        loop(_this2.queue.shift());
	      });
	    }
	  }]);
	
	  return Multi;
	})();
	
	min.multi = function () {
	  return new Multi(this);
	};
	
	var Sorter = (function () {
	  function Sorter(key, _min) {
	    var _this3 = this;
	
	    var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	    _classCallCheck(this, Sorter);
	
	    this.min = _min;
	    this.callback = callback;
	    this.result = [];
	    this.keys = {};
	    this.sortFn = function (a, b) {
	      if (_utils2.default.isNumber(a) && _utils2.default.isNumber(b)) {
	        return a - b;
	      } else {
	        return JSON.stringify(a) > JSON.stringify(b);
	      }
	    };
	
	    this.promise = new Promise(function (resolve, reject) {
	      var run = function run(_) {
	        _this3.min.exists(key).then(function (exists) {
	          if (exists) {
	            return _this3.min.get(key);
	          } else {
	            return new Error('no such key');
	          }
	        }).then(function (value) {
	          return new Promise(function (resolve, reject) {
	            switch (true) {
	              case Array.isArray(value):
	                resolve(value);
	                break;
	              case value.ms && Array.isArray(value.ms):
	                resolve(value.ms);
	                break;
	
	              default:
	                resolve(new Error('content type wrong'));
	            }
	          });
	        }).then(function (data) {
	          _this3.result = data.sort(_this3.sortFn);
	
	          _this3.result.forEach(function (chunk) {
	            _this3.keys[chunk] = chunk;
	          });
	
	          resolve(_this3.result);
	          _this3.callback(null, _this3.result);
	        }).catch(function (err) {
	          reject(err);
	          _this3.callback(err);
	        });
	      };
	
	      // Promise Shim
	      var loop = function loop(methods) {
	        var curr = methods.shift();
	
	        if (curr) {
	          _this3[curr] = function () {
	            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	              args[_key3] = arguments[_key3];
	            }
	
	            return _this3.promise[curr].apply(_this3.promise, args);
	          };
	
	          loop(methods);
	        } else {
	          run();
	        }
	      };
	
	      loop(['then', 'catch']);
	    });
	  }
	
	  _createClass(Sorter, [{
	    key: 'by',
	    value: function by(pattern) {
	      var _this4 = this;
	
	      var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	      var src2ref = {};
	      var aviKeys = [];
	
	      // TODO: Sort by hash field
	      var field = null;
	
	      if (pattern.indexOf('->') > 0) {
	        var i = pattern.indexOf('->');
	        field = pattern.substr(i + 2);
	        pattern = pattern.substr(0, pattern.length - i);
	      }
	
	      this.min.keys(pattern).then(function (keys) {
	        var filter = new RegExp(pattern.replace('?', '(.)').replace('*', '(.*)'));
	
	        for (var i = 0; i < keys.length; i++) {
	          var symbol = filter.exec(keys[i])[1];
	
	          if (_this4.result.indexOf(symbol) >= 0) {
	            src2ref[keys[i]] = symbol;
	          }
	        }
	
	        aviKeys = Object.keys(src2ref);
	
	        return _this4.min.mget(aviKeys.slice());
	      }).then(function (values) {
	        var reverse = {};
	
	        for (var i = 0; i < values.length; i++) {
	          reverse[JSON.stringify(values[i])] = aviKeys[i];
	        }
	
	        values.sort(_this4.sortFn);
	
	        var newResult = values.map(function (value) {
	          return reverse[JSON.stringify(value)];
	        }).map(function (key) {
	          return src2ref[key];
	        });
	
	        _this4.result = newResult;
	
	        _this4.promise.resolve(newResult);
	        callback(null, newResult);
	      }).catch(function (err) {
	        _this4.promise.reject(err);
	        callback(err);
	        _this4.callback(err);
	      });
	
	      return this;
	    }
	  }, {
	    key: 'asc',
	    value: function asc() {
	      var _this5 = this;
	
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];
	
	      this.sortFn = function (a, b) {
	        if (_utils2.default.isNumber(a) && _utils2.default.isNumber(b)) {
	          return a - b;
	        } else {
	          return JSON.stringify(a) > JSON.stringify(b);
	        }
	      };
	
	      var handle = function handle(result) {
	        _this5.result = result.sort(_this5.sortFn);
	
	        _this5.promise.resolve(_this5.result);
	        callback(null, _this5.result);
	      };
	
	      if (this.promise.ended) {
	        handle(this.result);
	      } else {
	        this.promise.once('resolve', handle);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'desc',
	    value: function desc() {
	      var _this6 = this;
	
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];
	
	      this.sortFn = function (a, b) {
	        if (_utils2.default.isNumber(a) && _utils2.default.isNumber(b)) {
	          return b - a;
	        } else {
	          return JSON.stringify(a) < JSON.stringify(b);
	        }
	      };
	
	      var handle = function handle(result) {
	        _this6.result = result.sort(_this6.sortFn);
	
	        _this6.promise.resolve(_this6.result);
	        callback(null, _this6.result);
	      };
	
	      if (this.promise.ended) {
	        handle(this.result);
	      } else {
	        this.promise.once('resolve', handle);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'get',
	    value: function get(pattern) {
	      var _this7 = this;
	
	      var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	      var handle = function handle(_result) {
	        var result = [];
	
	        var loop = function loop(res) {
	          var curr = res.shift();
	
	          if (!_utils2.default.isUndefined(curr)) {
	            if (Array.isArray(curr)) {
	              var key = _this7.keys[curr[0]];
	
	              _this7.min.get(pattern.replace('*', key)).then(function (value) {
	                curr.push(value);
	                result.push(curr);
	
	                loop(res);
	              }, function (err) {
	                _this7.promise.reject(err);
	                callback(err);
	              });
	            } else if (curr.substr || _utils2.default.isNumber(curr)) {
	              (function () {
	                var key = _this7.keys[curr];
	
	                _this7.min.get(pattern.replace('*', key)).then(function (value) {
	                  result.push([value]);
	                  if (value.substr || _utils2.default.isNumber(value)) {
	                    _this7.keys[value] = key;
	                  } else {
	                    _this7.keys[JSON.stringify(value)] = key;
	                  }
	
	                  loop(res);
	                }, function (err) {
	                  _this7.promise.reject(err);
	                  callback(err);
	                });
	              })();
	            }
	          } else {
	            _this7.result = result;
	
	            _this7.promise.resolve(result);
	            callback(null, result);
	          }
	        };
	
	        loop(_result.slice());
	      };
	
	      if (this.promise.ended) {
	        handle(this.result);
	      } else {
	        this.promise.once('resolve', handle);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'hget',
	    value: function hget(pattern, field) {
	      var _this8 = this;
	
	      var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	      var handle = function handle(_result) {
	        var result = [];
	
	        var loop = function loop(res) {
	          var curr = res.shift();
	
	          if (!_utils2.default.isUndefined(curr)) {
	            if (Array.isArray(curr)) {
	              var key = _this8.keys[curr[0]];
	
	              _this8.min.hget(pattern.replace('*', key), field).then(function (value) {
	                curr.push(value);
	                result.push(curr);
	
	                loop(res);
	              }, function (err) {
	                _this8.promise.reject(err);
	                callback(err);
	              });
	            } else if (curr.substr || _utils2.default.isNumber(curr)) {
	              (function () {
	                var key = _this8.keys[curr];
	
	                _this8.min.hget(pattern.replace('*', key)).then(function (value) {
	                  result.push([value]);
	                  if (value.substr || _utils2.default.isNumber(value)) {
	                    _this8.keys[value] = key;
	                  } else {
	                    _this8.keys[JSON.stringify(value)] = key;
	                  }
	
	                  loop(res);
	                }, function (err) {
	                  _this8.promise.reject(err);
	                  callback(err);
	                });
	              })();
	            }
	          } else {
	            _this8.result = result;
	
	            _this8.promise.resolve(result);
	            callback(null, result);
	          }
	        };
	
	        loop(_result.slice());
	      };
	
	      if (this.promise.ended) {
	        handle(this.result);
	      } else {
	        this.promise.once('resolve', handle);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'limit',
	    value: function limit(offset, count) {
	      var _this9 = this;
	
	      var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	
	      var handle = function handle(result) {
	        _this9.result = result.splice(offset, count);
	
	        _this9.promise.resolve(_this9.result);
	        callback(null, _this9.result);
	      };
	
	      if (this.promise.ended) {
	        handle(this.result);
	      } else {
	        this.promise.once('resolve', handle);
	      }
	
	      return this;
	    }
	  }, {
	    key: 'flatten',
	    value: function flatten() {
	      var _this10 = this;
	
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];
	
	      if (this.promise.ended) {
	        var rtn = [];
	
	        for (var i = 0; i < this.result.length; i++) {
	          for (var j = 0; j < this.result[i].length; j++) {
	            rtn.push(this.result[i][j]);
	          }
	        }
	
	        this.result = rtn;
	
	        this.promise.resolve(rtn);
	        callback(null, rtn);
	      } else {
	        this.promise.once('resolve', function (result) {
	          var rtn = [];
	
	          for (var i = 0; i < result.length; i++) {
	            for (var j = 0; j < result[i].length; j++) {
	              rtn.push(result[i][j]);
	            }
	          }
	
	          _this10.result = rtn;
	
	          _this10.promise.resolve(rtn);
	          callback(null, rtn);
	        });
	      }
	
	      return this;
	    }
	  }, {
	    key: 'store',
	    value: function store(dest) {
	      var _this11 = this;
	
	      var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	      if (this.promise.ended) {
	        this.min.set(dest, this.result).then(function (_) {
	          _this11.promise.resolve(_this11.result);
	          callback(null, _this11.result);
	        }, function (err) {
	          _this11.promise.reject(err);
	          callback(err);
	        });
	      } else {
	        this.promise.once('resolve', function (result) {
	          _this11.min.set(dest, result).then(function (_) {
	            _this11.promise.resolve(result);
	            callback(null, result);
	          }, function (err) {
	            _this11.promise.reject(err);
	            callback(err);
	          });
	        });
	      }
	
	      return this;
	    }
	  }]);
	
	  return Sorter;
	})();
	
	min.sort = function (key) {
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	  return new Sorter(key, undefined, callback);
	};
	
	var Scanner = (function () {
	  function Scanner(cursor, pattern, count, min) {
	    _classCallCheck(this, Scanner);
	
	    pattern = pattern || '*';
	
	    this.cursor = cursor || 0;
	    this.pattern = new RegExp(pattern.replace('*', '(.*)'));
	    this.limit = count > -1 ? count : 10;
	    this.end = this.cursor;
	
	    this.parent = min;
	  }
	
	  _createClass(Scanner, [{
	    key: 'scan',
	    value: function scan() {
	      var _this12 = this;
	
	      var callback = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];
	
	      var rtn = [];
	
	      this.parent.get('min_keys').then(function (data) {
	        data = JSON.parse(data);
	
	        var keys = Object.keys(data);
	
	        var scan = function scan(ii) {
	          var key = keys[ii];
	
	          if (key && _this12.pattern.test(key) && key !== 'min_keys') {
	            rtn.push(key);
	
	            if (++_this12.end - _this12.cursor >= _this12.limit) {
	              return callback(null, rtn, _this12.end);
	            }
	          } else if (!key) {
	            _this12.end = 0;
	            return callback(null, rtn, _this12.end);
	          }
	
	          return scan(++ii);
	        };
	
	        scan(_this12.cursor);
	      }, function (err) {
	        callback(err);
	      });
	
	      return this;
	    }
	  }, {
	    key: 'match',
	    value: function match(pattern) {
	      var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	      this.pattern = new RegExp(pattern.replace('*', '(.*)'));
	      this.end = this.cursor;
	
	      return this.scan(callback);
	    }
	  }, {
	    key: 'count',
	    value: function count(_count) {
	      var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	      this.limit = _count;
	      this.end = this.cursor;
	
	      return this.scan(callback);
	    }
	  }]);
	
	  return Scanner;
	})();
	
	min.scan = function (cursor) {
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	
	  var scanner = new Scanner(cursor, null, -1, undefined);
	
	  scanner.scan(callback);
	
	  return scanner;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var memStore = exports.memStore = (function () {
	  function memStore() {
	    _classCallCheck(this, memStore);
	  }
	
	  _createClass(memStore, [{
	    key: "get",
	    value: function get(key) {
	      if (sessionStorage) {
	        return sessionStorage.getItem(key);
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: "set",
	    value: function set(key, value) {
	      if (sessionStorage) {
	        return sessionStorage.setItem(key, value);
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: "remove",
	    value: function remove(key) {
	      if (sessionStorage) {
	        return sessionStorage.removeItem(key);
	      } else {
	        return false;
	      }
	    }
	  }]);
	
	  return memStore;
	})();
	
	var localStore = exports.localStore = (function () {
	  function localStore() {
	    _classCallCheck(this, localStore);
	  }
	
	  _createClass(localStore, [{
	    key: "get",
	    value: function get(key) {
	      if (localStorage) {
	        return localStorage.getItem(key);
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: "set",
	    value: function set(key, value) {
	      if (localStorage) {
	        return localStorage.setItem(key, value);
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: "remove",
	    value: function remove(key) {
	      if (localStorage) {
	        return localStorage.removeItem(key);
	      } else {
	        return false;
	      }
	    }
	  }]);
	
	  return localStore;
	})();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=min.debug.js.map