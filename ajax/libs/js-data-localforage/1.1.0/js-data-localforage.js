/*!
 * js-data-localforage
 * @version 1.1.0 - Homepage <http://www.js-data.io/docs/dslocalforageadapter>
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @copyright (c) 2014-2015 Jason Dobry 
 * @license MIT <https://github.com/js-data/js-data-localforage/blob/master/LICENSE>
 * 
 * @overview localforage adapter for js-data.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-data"), require("localforage"));
	else if(typeof define === 'function' && define.amd)
		define(["js-data", "localforage"], factory);
	else if(typeof exports === 'object')
		exports["DSLocalForageAdapter"] = factory(require("js-data"), require("localforage"));
	else
		root["DSLocalForageAdapter"] = factory(root["JSData"], root["localforage"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var JSData = _interopRequire(__webpack_require__(1));

	var localforage = _interopRequire(__webpack_require__(2));

	var emptyStore = new JSData.DS();
	var DSUtils = JSData.DSUtils;
	var makePath = DSUtils.makePath;
	var deepMixIn = DSUtils.deepMixIn;
	var forEach = DSUtils.forEach;
	var filter = emptyStore.defaults.defaultFilter;
	var removeCircular = DSUtils.removeCircular;
	var omit = __webpack_require__(3);
	var guid = __webpack_require__(5);
	var keys = __webpack_require__(4);
	var P = DSUtils.Promise;

	var Defaults = function Defaults() {
	  _classCallCheck(this, Defaults);
	};

	Defaults.prototype.basePath = "";

	var DSLocalForageAdapter = (function () {
	  function DSLocalForageAdapter(options) {
	    _classCallCheck(this, DSLocalForageAdapter);

	    this.defaults = new Defaults();
	    deepMixIn(this.defaults, options);
	  }

	  _createClass(DSLocalForageAdapter, {
	    getPath: {
	      value: function getPath(resourceConfig, options) {
	        return makePath(options.basePath || this.defaults.basePath || resourceConfig.basePath, resourceConfig.name);
	      }
	    },
	    getIdPath: {
	      value: function getIdPath(resourceConfig, options, id) {
	        return makePath(options.basePath || this.defaults.basePath || resourceConfig.basePath, resourceConfig.getEndpoint(id, options), id);
	      }
	    },
	    getIds: {
	      value: function getIds(resourceConfig, options) {
	        var idsPath = this.getPath(resourceConfig, options);
	        return new P(function (resolve, reject) {
	          localforage.getItem(idsPath, function (err, ids) {
	            if (err) {
	              return reject(err);
	            } else if (ids) {
	              return resolve(ids);
	            } else {
	              return localforage.setItem(idsPath, {}, function (err, v) {
	                if (err) {
	                  reject(err);
	                } else {
	                  resolve(v);
	                }
	              });
	            }
	          });
	        });
	      }
	    },
	    saveKeys: {
	      value: function saveKeys(ids, resourceConfig, options) {
	        var keysPath = this.getPath(resourceConfig, options);
	        return new P(function (resolve, reject) {
	          localforage.setItem(keysPath, ids, function (err, v) {
	            if (err) {
	              reject(err);
	            } else {
	              resolve(v);
	            }
	          });
	        });
	      }
	    },
	    ensureId: {
	      value: function ensureId(id, resourceConfig, options) {
	        var _this = this;

	        return this.getIds(resourceConfig, options).then(function (ids) {
	          ids[id] = 1;
	          return _this.saveKeys(ids, resourceConfig, options);
	        });
	      }
	    },
	    removeId: {
	      value: function removeId(id, resourceConfig, options) {
	        var _this = this;

	        return this.getIds(resourceConfig, options).then(function (ids) {
	          delete ids[id];
	          return _this.saveKeys(ids, resourceConfig, options);
	        });
	      }
	    },
	    GET: {
	      value: function GET(key) {
	        return new P(function (resolve, reject) {
	          localforage.getItem(key, function (err, v) {
	            if (err) {
	              reject(err);
	            } else {
	              resolve(v);
	            }
	          });
	        });
	      }
	    },
	    PUT: {
	      value: function PUT(key, value) {
	        value = removeCircular(value);
	        return this.GET(key).then(function (item) {
	          if (item) {
	            deepMixIn(item, value);
	          }
	          return new P(function (resolve, reject) {
	            localforage.setItem(key, item || value, function (err, v) {
	              return err ? reject(err) : resolve(v);
	            });
	          });
	        });
	      }
	    },
	    DEL: {
	      value: function DEL(key) {
	        return new P(function (resolve) {
	          return localforage.removeItem(key, resolve);
	        });
	      }
	    },
	    find: {
	      value: function find(resourceConfig, id, options) {
	        options = options || {};
	        return this.GET(this.getIdPath(resourceConfig, options, id)).then(function (item) {
	          if (!item) {
	            return P.reject(new Error("Not Found!"));
	          } else {
	            return item;
	          }
	        });
	      }
	    },
	    findAll: {
	      value: function findAll(resourceConfig, params, options) {
	        var _this = this;

	        options = options || {};
	        return this.getIds(resourceConfig, options).then(function (ids) {
	          var idsArray = keys(ids);
	          if (!("allowSimpleWhere" in options)) {
	            options.allowSimpleWhere = true;
	          }
	          var tasks = [];
	          forEach(idsArray, function (id) {
	            tasks.push(_this.GET(_this.getIdPath(resourceConfig, options, id)));
	          });
	          return P.all(tasks);
	        }).then(function (items) {
	          return filter.call(emptyStore, items, resourceConfig.name, params, options);
	        });
	      }
	    },
	    create: {
	      value: function create(resourceConfig, attrs, options) {
	        var _this = this;

	        var i = undefined;
	        attrs[resourceConfig.idAttribute] = attrs[resourceConfig.idAttribute] || guid();
	        options = options || {};
	        return this.PUT(makePath(this.getIdPath(resourceConfig, options, attrs[resourceConfig.idAttribute])), omit(attrs, resourceConfig.relationFields || [])).then(function (item) {
	          i = item;
	          return _this.ensureId(item[resourceConfig.idAttribute], resourceConfig, options);
	        }).then(function () {
	          return i;
	        });
	      }
	    },
	    update: {
	      value: function update(resourceConfig, id, attrs, options) {
	        var _this = this;

	        var i = undefined;
	        options = options || {};
	        return this.PUT(this.getIdPath(resourceConfig, options, id), omit(attrs, resourceConfig.relationFields || [])).then(function (item) {
	          i = item;
	          return _this.ensureId(item[resourceConfig.idAttribute], resourceConfig, options);
	        }).then(function () {
	          return i;
	        });
	      }
	    },
	    updateAll: {
	      value: function updateAll(resourceConfig, attrs, params, options) {
	        var _this = this;

	        return this.findAll(resourceConfig, params, options).then(function (items) {
	          var tasks = [];
	          forEach(items, function (item) {
	            tasks.push(_this.update(resourceConfig, item[resourceConfig.idAttribute], omit(attrs, resourceConfig.relationFields || []), options));
	          });
	          return P.all(tasks);
	        });
	      }
	    },
	    destroy: {
	      value: function destroy(resourceConfig, id, options) {
	        var _this = this;

	        options = options || {};
	        return this.DEL(this.getIdPath(resourceConfig, options, id)).then(function () {
	          return _this.removeId(id, resourceConfig, options);
	        }).then(function () {
	          return null;
	        });
	      }
	    },
	    destroyAll: {
	      value: function destroyAll(resourceConfig, params, options) {
	        var _this = this;

	        return this.findAll(resourceConfig, params, options).then(function (items) {
	          var tasks = [];
	          forEach(items, function (item) {
	            tasks.push(_this.destroy(resourceConfig, item[resourceConfig.idAttribute], options));
	          });
	          return P.all(tasks);
	        });
	      }
	    }
	  });

	  return DSLocalForageAdapter;
	})();

	module.exports = DSLocalForageAdapter;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var slice = __webpack_require__(6);
	var contains = __webpack_require__(7);

	    /**
	     * Return a copy of the object, filtered to only contain properties except the blacklisted keys.
	     */
	    function omit(obj, var_keys){
	        var keys = typeof arguments[1] !== 'string'? arguments[1] : slice(arguments, 1),
	            out = {};

	        for (var property in obj) {
	            if (obj.hasOwnProperty(property) && !contains(keys, property)) {
	                out[property] = obj[property];
	            }
	        }
	        return out;
	    }

	    module.exports = omit;




/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(8);

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var randHex = __webpack_require__(9);
	var choice = __webpack_require__(10);

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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Create slice of source array or array-like object
	     */
	    function slice(arr, start, end){
	        var len = arr.length;

	        if (start == null) {
	            start = 0;
	        } else if (start < 0) {
	            start = Math.max(len + start, 0);
	        } else {
	            start = Math.min(start, len);
	        }

	        if (end == null) {
	            end = len;
	        } else if (end < 0) {
	            end = Math.max(len + end, 0);
	        } else {
	            end = Math.min(end, len);
	        }

	        var result = [];
	        while (start < end) {
	            result.push(arr[start++]);
	        }

	        return result;
	    }

	    module.exports = slice;




/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var indexOf = __webpack_require__(11);

	    /**
	     * If array contains values.
	     */
	    function contains(arr, val) {
	        return indexOf(arr, val) !== -1;
	    }
	    module.exports = contains;



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(12);
	var forIn = __webpack_require__(13);

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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var choice = __webpack_require__(10);

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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var randInt = __webpack_require__(14);
	var isArray = __webpack_require__(15);

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Array.indexOf
	     */
	    function indexOf(arr, item, fromIndex) {
	        fromIndex = fromIndex || 0;
	        if (arr == null) {
	            return -1;
	        }

	        var len = arr.length,
	            i = fromIndex < 0 ? len + fromIndex : fromIndex;
	        while (i < len) {
	            // we iterate over sparse items since there is no way to make it
	            // work properly on IE 7-8. see #64
	            if (arr[i] === item) {
	                return i;
	            }

	            i++;
	        }

	        return -1;
	    }

	    module.exports = indexOf;



/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Safer Object.hasOwnProperty
	     */
	     function hasOwn(obj, prop){
	         return Object.prototype.hasOwnProperty.call(obj, prop);
	     }

	     module.exports = hasOwn;




/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(12);

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var MIN_INT = __webpack_require__(16);
	var MAX_INT = __webpack_require__(17);
	var rand = __webpack_require__(18);

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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(19);
	    /**
	     */
	    var isArray = Array.isArray || function (val) {
	        return isKind(val, 'Array');
	    };
	    module.exports = isArray;



/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @constant Minimum 32-bit signed integer value (-2^31).
	 */

	    module.exports = -2147483648;



/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @constant Maximum 32-bit signed integer value. (2^31 - 1)
	 */

	    module.exports = 2147483647;



/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var random = __webpack_require__(20);
	var MIN_INT = __webpack_require__(16);
	var MAX_INT = __webpack_require__(17);

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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var kindOf = __webpack_require__(21);
	    /**
	     * Check if value is from a specific "kind".
	     */
	    function isKind(val, kind){
	        return kindOf(val) === kind;
	    }
	    module.exports = isKind;



/***/ },
/* 20 */
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
/* 21 */
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