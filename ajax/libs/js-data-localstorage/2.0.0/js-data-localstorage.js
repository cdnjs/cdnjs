/*!
 * js-data-localstorage
 * @version 2.0.0 - Homepage <http://www.js-data.io/docs/dslocalstorageadapter>
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @copyright (c) 2014-2015 Jason Dobry 
 * @license MIT <https://github.com/js-data/js-data-localstorage/blob/master/LICENSE>
 * 
 * @overview localStorage adapter for js-data.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-data"));
	else if(typeof define === 'function' && define.amd)
		define(["js-data"], factory);
	else if(typeof exports === 'object')
		exports["DSLocalStorageAdapter"] = factory(require("js-data"));
	else
		root["DSLocalStorageAdapter"] = factory(root["JSData"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var JSData = __webpack_require__(1);
	var keys = __webpack_require__(2);
	var guid = __webpack_require__(3);

	var emptyStore = new JSData.DS();
	var DSUtils = JSData.DSUtils;
	var omit = DSUtils.omit;
	var makePath = DSUtils.makePath;
	var deepMixIn = DSUtils.deepMixIn;
	var toJson = DSUtils.toJson;
	var fromJson = DSUtils.fromJson;
	var forEach = DSUtils.forEach;
	var removeCircular = DSUtils.removeCircular;

	var filter = emptyStore.defaults.defaultFilter;

	var Defaults = function Defaults() {
	  _classCallCheck(this, Defaults);
	};

	Defaults.prototype.basePath = '';

	var queue = [];
	var taskInProcess = false;

	function enqueue(task) {
	  queue.push(task);
	}

	function dequeue() {
	  if (queue.length && !taskInProcess) {
	    taskInProcess = true;
	    queue[0]();
	  }
	}

	function queueTask(task) {
	  if (!queue.length) {
	    enqueue(task);
	    dequeue();
	  } else {
	    enqueue(task);
	  }
	}

	function createTask(fn) {
	  return new DSUtils.Promise(fn).then(function (result) {
	    taskInProcess = false;
	    queue.shift();
	    setTimeout(dequeue, 0);
	    return result;
	  }, function (err) {
	    taskInProcess = false;
	    queue.shift();
	    setTimeout(dequeue, 0);
	    return DSUtils.Promise.reject(err);
	  });
	}

	var DSLocalStorageAdapter = (function () {
	  function DSLocalStorageAdapter(options) {
	    _classCallCheck(this, DSLocalStorageAdapter);

	    options = options || {};
	    this.defaults = new Defaults();
	    deepMixIn(this.defaults, options);
	  }

	  _createClass(DSLocalStorageAdapter, [{
	    key: 'getPath',
	    value: function getPath(resourceConfig, options) {
	      return makePath(options.basePath || this.defaults.basePath || resourceConfig.basePath, resourceConfig.name);
	    }
	  }, {
	    key: 'getIdPath',
	    value: function getIdPath(resourceConfig, options, id) {
	      return makePath(options.basePath || this.defaults.basePath || resourceConfig.basePath, resourceConfig.endpoint, id);
	    }
	  }, {
	    key: 'getIds',
	    value: function getIds(resourceConfig, options) {
	      var ids = undefined;
	      var idsPath = this.getPath(resourceConfig, options);
	      var idsJson = localStorage.getItem(idsPath);
	      if (idsJson) {
	        ids = fromJson(idsJson);
	      } else {
	        localStorage.setItem(idsPath, toJson({}));
	        ids = {};
	      }
	      return ids;
	    }
	  }, {
	    key: 'saveKeys',
	    value: function saveKeys(ids, resourceConfig, options) {
	      localStorage.setItem(this.getPath(resourceConfig, options), toJson(ids));
	    }
	  }, {
	    key: 'ensureId',
	    value: function ensureId(id, resourceConfig, options) {
	      var ids = this.getIds(resourceConfig, options);
	      ids[id] = 1;
	      this.saveKeys(ids, resourceConfig, options);
	    }
	  }, {
	    key: 'removeId',
	    value: function removeId(id, resourceConfig, options) {
	      var ids = this.getIds(resourceConfig, options);
	      delete ids[id];
	      this.saveKeys(ids, resourceConfig, options);
	    }
	  }, {
	    key: 'GET',
	    value: function GET(key) {
	      return new DSUtils.Promise(function (resolve) {
	        var item = localStorage.getItem(key);
	        resolve(item ? fromJson(item) : undefined);
	      });
	    }
	  }, {
	    key: 'PUT',
	    value: function PUT(key, value) {
	      var DSLocalStorageAdapter = this;
	      return DSLocalStorageAdapter.GET(key).then(function (item) {
	        if (item) {
	          deepMixIn(item, removeCircular(value));
	        }
	        localStorage.setItem(key, toJson(item || value));
	        return DSLocalStorageAdapter.GET(key);
	      });
	    }
	  }, {
	    key: 'DEL',
	    value: function DEL(key) {
	      return new DSUtils.Promise(function (resolve) {
	        localStorage.removeItem(key);
	        resolve();
	      });
	    }
	  }, {
	    key: 'find',
	    value: function find(resourceConfig, id, options) {
	      var _this = this;

	      return createTask(function (resolve, reject) {
	        queueTask(function () {
	          _this.GET(_this.getIdPath(resourceConfig, options || {}, id)).then(function (item) {
	            return !item ? reject(new Error('Not Found!')) : resolve(item);
	          }, reject);
	        });
	      });
	    }
	  }, {
	    key: 'findAll',
	    value: function findAll(resourceConfig, params, options) {
	      var _this2 = this;

	      return createTask(function (resolve, reject) {
	        queueTask(function () {
	          try {
	            (function () {
	              options = options || {};
	              if (!('allowSimpleWhere' in options)) {
	                options.allowSimpleWhere = true;
	              }
	              var items = [];
	              var ids = keys(_this2.getIds(resourceConfig, options));
	              forEach(ids, function (id) {
	                var itemJson = localStorage.getItem(_this2.getIdPath(resourceConfig, options, id));
	                if (itemJson) {
	                  items.push(fromJson(itemJson));
	                }
	              });
	              resolve(filter.call(emptyStore, items, resourceConfig.name, params, options));
	            })();
	          } catch (err) {
	            reject(err);
	          }
	        });
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(resourceConfig, attrs, options) {
	      var _this3 = this;

	      return createTask(function (resolve, reject) {
	        queueTask(function () {
	          attrs[resourceConfig.idAttribute] = attrs[resourceConfig.idAttribute] || guid();
	          options = options || {};
	          _this3.PUT(makePath(_this3.getIdPath(resourceConfig, options, attrs[resourceConfig.idAttribute])), omit(attrs, resourceConfig.relationFields || [])).then(function (item) {
	            _this3.ensureId(item[resourceConfig.idAttribute], resourceConfig, options);
	            resolve(item);
	          })['catch'](reject);
	        });
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(resourceConfig, id, attrs, options) {
	      var _this4 = this;

	      return createTask(function (resolve, reject) {
	        queueTask(function () {
	          options = options || {};
	          _this4.PUT(_this4.getIdPath(resourceConfig, options, id), omit(attrs, resourceConfig.relationFields || [])).then(function (item) {
	            _this4.ensureId(item[resourceConfig.idAttribute], resourceConfig, options);
	            resolve(item);
	          })['catch'](reject);
	        });
	      });
	    }
	  }, {
	    key: 'updateAll',
	    value: function updateAll(resourceConfig, attrs, params, options) {
	      var _this5 = this;

	      return this.findAll(resourceConfig, params, options).then(function (items) {
	        var tasks = [];
	        forEach(items, function (item) {
	          return tasks.push(_this5.update(resourceConfig, item[resourceConfig.idAttribute], omit(attrs, resourceConfig.relationFields || []), options));
	        });
	        return DSUtils.Promise.all(tasks);
	      });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(resourceConfig, id, options) {
	      var _this6 = this;

	      return createTask(function (resolve, reject) {
	        queueTask(function () {
	          options = options || {};
	          _this6.DEL(_this6.getIdPath(resourceConfig, options, id)).then(function () {
	            return _this6.removeId(id, resourceConfig.name, options);
	          }).then(function () {
	            return resolve(null);
	          }, reject);
	        });
	      });
	    }
	  }, {
	    key: 'destroyAll',
	    value: function destroyAll(resourceConfig, params, options) {
	      var _this7 = this;

	      return this.findAll(resourceConfig, params, options).then(function (items) {
	        var tasks = [];
	        forEach(items, function (item) {
	          return tasks.push(_this7.destroy(resourceConfig, item[resourceConfig.idAttribute], options));
	        });
	        return DSUtils.Promise.all(tasks);
	      });
	    }
	  }]);

	  return DSLocalStorageAdapter;
	})();

	module.exports = DSLocalStorageAdapter;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(4);

	    /**
	     * Get object keys
	     */
	     var keys = Object.keys || function (obj) {
	            var keys = [];
	            forOwn(obj, function(val, key){
	                keys.push(key);
	            });
	            return keys;
	        };

	    module.exports = keys;




/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var randHex = __webpack_require__(5);
	var choice = __webpack_require__(6);

	  /**
	   * Returns pseudo-random guid (UUID v4)
	   * IMPORTANT: it's not totally "safe" since randHex/choice uses Math.random
	   * by default and sequences can be predicted in some cases. See the
	   * "random/random" documentation for more info about it and how to replace
	   * the default PRNG.
	   */
	  function guid() {
	    return (
	        randHex(8)+'-'+
	        randHex(4)+'-'+
	        // v4 UUID always contain "4" at this position to specify it was
	        // randomly generated
	        '4' + randHex(3) +'-'+
	        // v4 UUID always contain chars [a,b,8,9] at this position
	        choice(8, 9, 'a', 'b') + randHex(3)+'-'+
	        randHex(12)
	    );
	  }
	  module.exports = guid;



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(7);
	var forIn = __webpack_require__(8);

	    /**
	     * Similar to Array/forEach but works over object properties and fixes Don't
	     * Enum bug on IE.
	     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
	     */
	    function forOwn(obj, fn, thisObj){
	        forIn(obj, function(val, key){
	            if (hasOwn(obj, key)) {
	                return fn.call(thisObj, obj[key], key, obj);
	            }
	        });
	    }

	    module.exports = forOwn;




/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var choice = __webpack_require__(6);

	    var _chars = '0123456789abcdef'.split('');

	    /**
	     * Returns a random hexadecimal string
	     */
	    function randHex(size){
	        size = size && size > 0? size : 6;
	        var str = '';
	        while (size--) {
	            str += choice(_chars);
	        }
	        return str;
	    }

	    module.exports = randHex;




/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var randInt = __webpack_require__(9);
	var isArray = __webpack_require__(10);

	    /**
	     * Returns a random element from the supplied arguments
	     * or from the array (if single argument is an array).
	     */
	    function choice(items) {
	        var target = (arguments.length === 1 && isArray(items))? items : arguments;
	        return target[ randInt(0, target.length - 1) ];
	    }

	    module.exports = choice;




/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Safer Object.hasOwnProperty
	     */
	     function hasOwn(obj, prop){
	         return Object.prototype.hasOwnProperty.call(obj, prop);
	     }

	     module.exports = hasOwn;




/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(7);

	    var _hasDontEnumBug,
	        _dontEnums;

	    function checkDontEnum(){
	        _dontEnums = [
	                'toString',
	                'toLocaleString',
	                'valueOf',
	                'hasOwnProperty',
	                'isPrototypeOf',
	                'propertyIsEnumerable',
	                'constructor'
	            ];

	        _hasDontEnumBug = true;

	        for (var key in {'toString': null}) {
	            _hasDontEnumBug = false;
	        }
	    }

	    /**
	     * Similar to Array/forEach but works over object properties and fixes Don't
	     * Enum bug on IE.
	     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
	     */
	    function forIn(obj, fn, thisObj){
	        var key, i = 0;
	        // no need to check if argument is a real object that way we can use
	        // it for arrays, functions, date, etc.

	        //post-pone check till needed
	        if (_hasDontEnumBug == null) checkDontEnum();

	        for (key in obj) {
	            if (exec(fn, obj, key, thisObj) === false) {
	                break;
	            }
	        }


	        if (_hasDontEnumBug) {
	            var ctor = obj.constructor,
	                isProto = !!ctor && obj === ctor.prototype;

	            while (key = _dontEnums[i++]) {
	                // For constructor, if it is a prototype object the constructor
	                // is always non-enumerable unless defined otherwise (and
	                // enumerated above).  For non-prototype objects, it will have
	                // to be defined on this object, since it cannot be defined on
	                // any prototype objects.
	                //
	                // For other [[DontEnum]] properties, check if the value is
	                // different than Object prototype value.
	                if (
	                    (key !== 'constructor' ||
	                        (!isProto && hasOwn(obj, key))) &&
	                    obj[key] !== Object.prototype[key]
	                ) {
	                    if (exec(fn, obj, key, thisObj) === false) {
	                        break;
	                    }
	                }
	            }
	        }
	    }

	    function exec(fn, obj, key, thisObj){
	        return fn.call(thisObj, obj[key], key, obj);
	    }

	    module.exports = forIn;




/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var MIN_INT = __webpack_require__(11);
	var MAX_INT = __webpack_require__(12);
	var rand = __webpack_require__(13);

	    /**
	     * Gets random integer inside range or snap to min/max values.
	     */
	    function randInt(min, max){
	        min = min == null? MIN_INT : ~~min;
	        max = max == null? MAX_INT : ~~max;
	        // can't be max + 0.5 otherwise it will round up if `rand`
	        // returns `max` causing it to overflow range.
	        // -0.5 and + 0.49 are required to avoid bias caused by rounding
	        return Math.round( rand(min - 0.5, max + 0.499999999999) );
	    }

	    module.exports = randInt;



/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(14);
	    /**
	     */
	    var isArray = Array.isArray || function (val) {
	        return isKind(val, 'Array');
	    };
	    module.exports = isArray;



/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @constant Minimum 32-bit signed integer value (-2^31).
	 */

	    module.exports = -2147483648;



/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @constant Maximum 32-bit signed integer value. (2^31 - 1)
	 */

	    module.exports = 2147483647;



/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var random = __webpack_require__(15);
	var MIN_INT = __webpack_require__(11);
	var MAX_INT = __webpack_require__(12);

	    /**
	     * Returns random number inside range
	     */
	    function rand(min, max){
	        min = min == null? MIN_INT : min;
	        max = max == null? MAX_INT : max;
	        return min + (max - min) * random();
	    }

	    module.exports = rand;



/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var kindOf = __webpack_require__(16);
	    /**
	     * Check if value is from a specific "kind".
	     */
	    function isKind(val, kind){
	        return kindOf(val) === kind;
	    }
	    module.exports = isKind;



/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Just a wrapper to Math.random. No methods inside mout/random should call
	     * Math.random() directly so we can inject the pseudo-random number
	     * generator if needed (ie. in case we need a seeded random or a better
	     * algorithm than the native one)
	     */
	    function random(){
	        return random.get();
	    }

	    // we expose the method so it can be swapped if needed
	    random.get = Math.random;

	    module.exports = random;




/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	

	    var _rKind = /^\[object (.*)\]$/,
	        _toString = Object.prototype.toString,
	        UNDEF;

	    /**
	     * Gets the "kind" of value. (e.g. "String", "Number", etc)
	     */
	    function kindOf(val) {
	        if (val === null) {
	            return 'Null';
	        } else if (val === UNDEF) {
	            return 'Undefined';
	        } else {
	            return _rKind.exec( _toString.call(val) )[1];
	        }
	    }
	    module.exports = kindOf;



/***/ }
/******/ ])
});
;