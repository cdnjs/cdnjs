/*!
* js-data-localstorage
* @version 2.3.2 - Homepage <http://www.js-data.io/docs/dslocalstorageadapter>
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

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* global: localStorage */
	var JSData = __webpack_require__(1);
	var guid = __webpack_require__(2);
	var unique = __webpack_require__(13);
	var map = __webpack_require__(22);

	var emptyStore = new JSData.DS();
	var DSUtils = JSData.DSUtils;

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
	    this.storage = options.storage || localStorage;
	    DSUtils.deepMixIn(this.defaults, options);
	  }

	  _createClass(DSLocalStorageAdapter, [{
	    key: 'getPath',
	    value: function getPath(resourceConfig, options) {
	      options = options || {};
	      return DSUtils.makePath(options.basePath || this.defaults.basePath || resourceConfig.basePath, resourceConfig.name);
	    }
	  }, {
	    key: 'getIdPath',
	    value: function getIdPath(resourceConfig, options, id) {
	      options = options || {};
	      return DSUtils.makePath(options.basePath || this.defaults.basePath || resourceConfig.basePath, resourceConfig.endpoint, id);
	    }
	  }, {
	    key: 'getIds',
	    value: function getIds(resourceConfig, options) {
	      var ids = undefined;
	      var idsPath = this.getPath(resourceConfig, options);
	      var idsJson = this.storage.getItem(idsPath);
	      if (idsJson) {
	        ids = DSUtils.fromJson(idsJson);
	      } else {
	        ids = {};
	      }
	      return ids;
	    }
	  }, {
	    key: 'saveKeys',
	    value: function saveKeys(ids, resourceConfig, options) {
	      var idsPath = this.getPath(resourceConfig, options);
	      if (!DSUtils.isEmpty(ids)) {
	        this.storage.setItem(idsPath, DSUtils.toJson(ids));
	      } else {
	        this.storage.removeItem(idsPath);
	      }
	    }
	  }, {
	    key: 'ensureId',
	    value: function ensureId(id, resourceConfig, options) {
	      var ids = this.getIds(resourceConfig, options);
	      if (DSUtils.isArray(id)) {
	        if (!id.length) {
	          return;
	        }
	        DSUtils.forEach(id, function (_id) {
	          ids[_id] = 1;
	        });
	      } else {
	        ids[id] = 1;
	      }
	      this.saveKeys(ids, resourceConfig, options);
	    }
	  }, {
	    key: 'removeId',
	    value: function removeId(id, resourceConfig, options) {
	      var ids = this.getIds(resourceConfig, options);
	      if (DSUtils.isArray(id)) {
	        if (!id.length) {
	          return;
	        }
	        DSUtils.forEach(id, function (_id) {
	          delete ids[_id];
	        });
	      } else {
	        delete ids[id];
	      }
	      this.saveKeys(ids, resourceConfig, options);
	    }
	  }, {
	    key: 'GET',
	    value: function GET(key) {
	      var _this = this;

	      return new DSUtils.Promise(function (resolve) {
	        var item = _this.storage.getItem(key);
	        resolve(item ? DSUtils.fromJson(item) : undefined);
	      });
	    }
	  }, {
	    key: 'PUT',
	    value: function PUT(key, value) {
	      var _this2 = this;

	      var DSLocalStorageAdapter = this;
	      return DSLocalStorageAdapter.GET(key).then(function (item) {
	        if (item) {
	          DSUtils.deepMixIn(item, DSUtils.removeCircular(value));
	        }
	        _this2.storage.setItem(key, DSUtils.toJson(item || value));
	        return DSLocalStorageAdapter.GET(key);
	      });
	    }
	  }, {
	    key: 'DEL',
	    value: function DEL(key) {
	      var _this3 = this;

	      return new DSUtils.Promise(function (resolve) {
	        _this3.storage.removeItem(key);
	        resolve();
	      });
	    }
	  }, {
	    key: 'find',
	    value: function find(resourceConfig, id, options) {
	      var _this4 = this;

	      var instance = undefined;
	      options = options || {};
	      options.with = options.with || [];
	      return new DSUtils.Promise(function (resolve, reject) {
	        _this4.GET(_this4.getIdPath(resourceConfig, options || {}, id)).then(function (item) {
	          return !item ? reject(new Error('Not Found!')) : item;
	        }).then(function (_instance) {
	          instance = _instance;
	          var tasks = [];

	          DSUtils.forEach(resourceConfig.relationList, function (def) {
	            var relationName = def.relation;
	            var relationDef = resourceConfig.getResource(relationName);
	            var containedName = null;
	            if (DSUtils.contains(options.with, relationName)) {
	              containedName = relationName;
	            } else if (DSUtils.contains(options.with, def.localField)) {
	              containedName = def.localField;
	            }
	            if (containedName) {
	              (function () {
	                var __options = DSUtils.deepMixIn({}, options.orig ? options.orig() : options);
	                __options.with = options.with.slice();
	                __options = DSUtils._(relationDef, __options);
	                DSUtils.remove(__options.with, containedName);
	                DSUtils.forEach(__options.with, function (relation, i) {
	                  if (relation && relation.indexOf(containedName) === 0 && relation.length >= containedName.length && relation[containedName.length] === '.') {
	                    __options.with[i] = relation.substr(containedName.length + 1);
	                  } else {
	                    __options.with[i] = '';
	                  }
	                });

	                var task = undefined;

	                if ((def.type === 'hasOne' || def.type === 'hasMany') && def.foreignKey) {
	                  task = _this4.findAll(resourceConfig.getResource(relationName), {
	                    where: _defineProperty({}, def.foreignKey, {
	                      '==': instance[resourceConfig.idAttribute]
	                    })
	                  }, __options).then(function (relatedItems) {
	                    if (def.type === 'hasOne' && relatedItems.length) {
	                      DSUtils.set(instance, def.localField, relatedItems[0]);
	                    } else {
	                      DSUtils.set(instance, def.localField, relatedItems);
	                    }
	                    return relatedItems;
	                  });
	                } else if (def.type === 'hasMany' && def.localKeys) {
	                  var localKeys = [];
	                  var itemKeys = instance[def.localKeys] || [];
	                  itemKeys = Array.isArray(itemKeys) ? itemKeys : DSUtils.keys(itemKeys);
	                  localKeys = localKeys.concat(itemKeys || []);
	                  task = _this4.findAll(resourceConfig.getResource(relationName), {
	                    where: _defineProperty({}, relationDef.idAttribute, {
	                      'in': DSUtils.filter(unique(localKeys), function (x) {
	                        return x;
	                      })
	                    })
	                  }, __options).then(function (relatedItems) {
	                    DSUtils.set(instance, def.localField, relatedItems);
	                    return relatedItems;
	                  });
	                } else if (def.type === 'belongsTo' || def.type === 'hasOne' && def.localKey) {
	                  task = _this4.find(resourceConfig.getResource(relationName), DSUtils.get(instance, def.localKey), __options).then(function (relatedItem) {
	                    DSUtils.set(instance, def.localField, relatedItem);
	                    return relatedItem;
	                  });
	                }

	                if (task) {
	                  tasks.push(task);
	                }
	              })();
	            }
	          });

	          return DSUtils.Promise.all(tasks);
	        }).then(function () {
	          return resolve(instance);
	        }).catch(reject);
	      });
	    }
	  }, {
	    key: 'findAll',
	    value: function findAll(resourceConfig, params, options) {
	      var _this5 = this;

	      var items = null;
	      options = options || {};
	      options.with = options.with || [];
	      return new DSUtils.Promise(function (resolve, reject) {
	        try {
	          (function () {
	            options = options || {};
	            if (!('allowSimpleWhere' in options)) {
	              options.allowSimpleWhere = true;
	            }
	            var items = [];
	            var ids = DSUtils.keys(_this5.getIds(resourceConfig, options));
	            DSUtils.forEach(ids, function (id) {
	              var itemJson = _this5.storage.getItem(_this5.getIdPath(resourceConfig, options, id));
	              if (itemJson) {
	                items.push(DSUtils.fromJson(itemJson));
	              }
	            });
	            resolve(filter.call(emptyStore, items, resourceConfig.name, params, options));
	          })();
	        } catch (err) {
	          reject(err);
	        }
	      }).then(function (_items) {
	        items = _items;
	        var tasks = [];
	        DSUtils.forEach(resourceConfig.relationList, function (def) {
	          var relationName = def.relation;
	          var relationDef = resourceConfig.getResource(relationName);
	          var containedName = null;
	          if (DSUtils.contains(options.with, relationName)) {
	            containedName = relationName;
	          } else if (DSUtils.contains(options.with, def.localField)) {
	            containedName = def.localField;
	          }
	          if (containedName) {
	            (function () {
	              var __options = DSUtils.deepMixIn({}, options.orig ? options.orig() : options);
	              __options.with = options.with.slice();
	              __options = DSUtils._(relationDef, __options);
	              DSUtils.remove(__options.with, containedName);
	              DSUtils.forEach(__options.with, function (relation, i) {
	                if (relation && relation.indexOf(containedName) === 0 && relation.length >= containedName.length && relation[containedName.length] === '.') {
	                  __options.with[i] = relation.substr(containedName.length + 1);
	                } else {
	                  __options.with[i] = '';
	                }
	              });

	              var task = undefined;

	              if ((def.type === 'hasOne' || def.type === 'hasMany') && def.foreignKey) {
	                task = _this5.findAll(resourceConfig.getResource(relationName), {
	                  where: _defineProperty({}, def.foreignKey, {
	                    'in': DSUtils.filter(map(items, function (item) {
	                      return DSUtils.get(item, resourceConfig.idAttribute);
	                    }), function (x) {
	                      return x;
	                    })
	                  })
	                }, __options).then(function (relatedItems) {
	                  DSUtils.forEach(items, function (item) {
	                    var attached = [];
	                    DSUtils.forEach(relatedItems, function (relatedItem) {
	                      if (DSUtils.get(relatedItem, def.foreignKey) === item[resourceConfig.idAttribute]) {
	                        attached.push(relatedItem);
	                      }
	                    });
	                    if (def.type === 'hasOne' && attached.length) {
	                      DSUtils.set(item, def.localField, attached[0]);
	                    } else {
	                      DSUtils.set(item, def.localField, attached);
	                    }
	                  });
	                  return relatedItems;
	                });
	              } else if (def.type === 'hasMany' && def.localKeys) {
	                (function () {
	                  var localKeys = [];
	                  DSUtils.forEach(items, function (item) {
	                    var itemKeys = item[def.localKeys] || [];
	                    itemKeys = Array.isArray(itemKeys) ? itemKeys : DSUtils.keys(itemKeys);
	                    localKeys = localKeys.concat(itemKeys || []);
	                  });
	                  task = _this5.findAll(resourceConfig.getResource(relationName), {
	                    where: _defineProperty({}, relationDef.idAttribute, {
	                      'in': DSUtils.filter(unique(localKeys), function (x) {
	                        return x;
	                      })
	                    })
	                  }, __options).then(function (relatedItems) {
	                    DSUtils.forEach(items, function (item) {
	                      var attached = [];
	                      var itemKeys = item[def.localKeys] || [];
	                      itemKeys = Array.isArray(itemKeys) ? itemKeys : DSUtils.keys(itemKeys);
	                      DSUtils.forEach(relatedItems, function (relatedItem) {
	                        if (itemKeys && DSUtils.contains(itemKeys, relatedItem[relationDef.idAttribute])) {
	                          attached.push(relatedItem);
	                        }
	                      });
	                      DSUtils.set(item, def.localField, attached);
	                    });
	                    return relatedItems;
	                  });
	                })();
	              } else if (def.type === 'belongsTo' || def.type === 'hasOne' && def.localKey) {
	                task = _this5.findAll(resourceConfig.getResource(relationName), {
	                  where: _defineProperty({}, relationDef.idAttribute, {
	                    'in': DSUtils.filter(map(items, function (item) {
	                      return DSUtils.get(item, def.localKey);
	                    }), function (x) {
	                      return x;
	                    })
	                  })
	                }, __options).then(function (relatedItems) {
	                  DSUtils.forEach(items, function (item) {
	                    DSUtils.forEach(relatedItems, function (relatedItem) {
	                      if (relatedItem[relationDef.idAttribute] === item[def.localKey]) {
	                        DSUtils.set(item, def.localField, relatedItem);
	                      }
	                    });
	                  });
	                  return relatedItems;
	                });
	              }

	              if (task) {
	                tasks.push(task);
	              }
	            })();
	          }
	        });
	        return DSUtils.Promise.all(tasks);
	      }).then(function () {
	        return items;
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(resourceConfig, attrs, options) {
	      var _this6 = this;

	      return createTask(function (resolve, reject) {
	        queueTask(function () {
	          attrs[resourceConfig.idAttribute] = attrs[resourceConfig.idAttribute] || guid();
	          options = options || {};
	          _this6.PUT(DSUtils.makePath(_this6.getIdPath(resourceConfig, options, attrs[resourceConfig.idAttribute])), DSUtils.omit(attrs, resourceConfig.relationFields || [])).then(function (item) {
	            _this6.ensureId(item[resourceConfig.idAttribute], resourceConfig, options);
	            resolve(item);
	          }).catch(reject);
	        });
	      });
	    }
	  }, {
	    key: 'createMany',
	    value: function createMany(resourceConfig, items, options) {
	      var _this7 = this;

	      return createTask(function (resolve, reject) {
	        queueTask(function () {
	          var tasks = [];
	          var ids = [];
	          DSUtils.forEach(items, function (attrs) {
	            var id = attrs[resourceConfig.idAttribute] = attrs[resourceConfig.idAttribute] || guid();
	            ids.push(id);
	            options = options || {};
	            tasks.push(_this7.PUT(DSUtils.makePath(_this7.getIdPath(resourceConfig, options, id)), DSUtils.omit(attrs, resourceConfig.relationFields || [])));
	          });
	          _this7.ensureId(ids, resourceConfig, options);
	          return DSUtils.Promise.all(tasks).then(resolve).catch(reject);
	        });
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(resourceConfig, id, attrs, options) {
	      var _this8 = this;

	      return createTask(function (resolve, reject) {
	        queueTask(function () {
	          options = options || {};
	          _this8.PUT(_this8.getIdPath(resourceConfig, options, id), DSUtils.omit(attrs, resourceConfig.relationFields || [])).then(function (item) {
	            _this8.ensureId(item[resourceConfig.idAttribute], resourceConfig, options);
	            resolve(item);
	          }).catch(reject);
	        });
	      });
	    }
	  }, {
	    key: 'updateAll',
	    value: function updateAll(resourceConfig, attrs, params, options) {
	      var _this9 = this;

	      return this.findAll(resourceConfig, params, options).then(function (items) {
	        var tasks = [];
	        DSUtils.forEach(items, function (item) {
	          return tasks.push(_this9.update(resourceConfig, item[resourceConfig.idAttribute], DSUtils.omit(attrs, resourceConfig.relationFields || []), options));
	        });
	        return DSUtils.Promise.all(tasks);
	      });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(resourceConfig, id, options) {
	      var _this10 = this;

	      return createTask(function (resolve, reject) {
	        queueTask(function () {
	          options = options || {};
	          _this10.DEL(_this10.getIdPath(resourceConfig, options, id)).then(function () {
	            return _this10.removeId(id, resourceConfig, options);
	          }).then(function () {
	            return resolve(null);
	          }, reject);
	        });
	      });
	    }
	  }, {
	    key: 'destroyAll',
	    value: function destroyAll(resourceConfig, params, options) {
	      var _this11 = this;

	      return this.findAll(resourceConfig, params, options).then(function (items) {
	        var ids = [];
	        DSUtils.forEach(items, function (item) {
	          var id = item[resourceConfig.idAttribute];
	          ids.push(id);
	          _this11.storage.removeItem(_this11.getIdPath(resourceConfig, options, id));
	        });
	        _this11.removeId(ids, resourceConfig, options);
	        return ids;
	      });
	    }
	  }]);

	  return DSLocalStorageAdapter;
	})();

	DSLocalStorageAdapter.version = {
	  full: '2.3.2',
	  major: parseInt('2', 10),
	  minor: parseInt('3', 10),
	  patch: parseInt('2', 10),
	  alpha:  true ? 'false' : false,
	  beta:  true ? 'false' : false
	};

	module.exports = DSLocalStorageAdapter;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var randHex = __webpack_require__(3);
	var choice = __webpack_require__(4);

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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var choice = __webpack_require__(4);

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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var randInt = __webpack_require__(5);
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var MIN_INT = __webpack_require__(6);
	var MAX_INT = __webpack_require__(7);
	var rand = __webpack_require__(8);

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
/* 6 */
/***/ function(module, exports) {

	/**
	 * @constant Minimum 32-bit signed integer value (-2^31).
	 */

	    module.exports = -2147483648;



/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * @constant Maximum 32-bit signed integer value. (2^31 - 1)
	 */

	    module.exports = 2147483647;



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var random = __webpack_require__(9);
	var MIN_INT = __webpack_require__(6);
	var MAX_INT = __webpack_require__(7);

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
/* 9 */
/***/ function(module, exports) {

	

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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(11);
	    /**
	     */
	    var isArray = Array.isArray || function (val) {
	        return isKind(val, 'Array');
	    };
	    module.exports = isArray;



/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var kindOf = __webpack_require__(12);
	    /**
	     * Check if value is from a specific "kind".
	     */
	    function isKind(val, kind){
	        return kindOf(val) === kind;
	    }
	    module.exports = isKind;



/***/ },
/* 12 */
/***/ function(module, exports) {

	

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



/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var filter = __webpack_require__(14);

	    /**
	     * @return {array} Array of unique items
	     */
	    function unique(arr, compare){
	        compare = compare || isEqual;
	        return filter(arr, function(item, i, arr){
	            var n = arr.length;
	            while (++i < n) {
	                if ( compare(item, arr[i]) ) {
	                    return false;
	                }
	            }
	            return true;
	        });
	    }

	    function isEqual(a, b){
	        return a === b;
	    }

	    module.exports = unique;




/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var makeIterator = __webpack_require__(15);

	    /**
	     * Array filter
	     */
	    function filter(arr, callback, thisObj) {
	        callback = makeIterator(callback, thisObj);
	        var results = [];
	        if (arr == null) {
	            return results;
	        }

	        var i = -1, len = arr.length, value;
	        while (++i < len) {
	            value = arr[i];
	            if (callback(value, i, arr)) {
	                results.push(value);
	            }
	        }

	        return results;
	    }

	    module.exports = filter;




/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(16);
	var prop = __webpack_require__(17);
	var deepMatches = __webpack_require__(18);

	    /**
	     * Converts argument into a valid iterator.
	     * Used internally on most array/object/collection methods that receives a
	     * callback/iterator providing a shortcut syntax.
	     */
	    function makeIterator(src, thisObj){
	        if (src == null) {
	            return identity;
	        }
	        switch(typeof src) {
	            case 'function':
	                // function is the first to improve perf (most common case)
	                // also avoid using `Function#call` if not needed, which boosts
	                // perf a lot in some cases
	                return (typeof thisObj !== 'undefined')? function(val, i, arr){
	                    return src.call(thisObj, val, i, arr);
	                } : src;
	            case 'object':
	                return function(val){
	                    return deepMatches(val, src);
	                };
	            case 'string':
	            case 'number':
	                return prop(src);
	        }
	    }

	    module.exports = makeIterator;




/***/ },
/* 16 */
/***/ function(module, exports) {

	

	    /**
	     * Returns the first argument provided to it.
	     */
	    function identity(val){
	        return val;
	    }

	    module.exports = identity;




/***/ },
/* 17 */
/***/ function(module, exports) {

	

	    /**
	     * Returns a function that gets a property of the passed object
	     */
	    function prop(name){
	        return function(obj){
	            return obj[name];
	        };
	    }

	    module.exports = prop;




/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(19);
	var isArray = __webpack_require__(10);

	    function containsMatch(array, pattern) {
	        var i = -1, length = array.length;
	        while (++i < length) {
	            if (deepMatches(array[i], pattern)) {
	                return true;
	            }
	        }

	        return false;
	    }

	    function matchArray(target, pattern) {
	        var i = -1, patternLength = pattern.length;
	        while (++i < patternLength) {
	            if (!containsMatch(target, pattern[i])) {
	                return false;
	            }
	        }

	        return true;
	    }

	    function matchObject(target, pattern) {
	        var result = true;
	        forOwn(pattern, function(val, key) {
	            if (!deepMatches(target[key], val)) {
	                // Return false to break out of forOwn early
	                return (result = false);
	            }
	        });

	        return result;
	    }

	    /**
	     * Recursively check if the objects match.
	     */
	    function deepMatches(target, pattern){
	        if (target && typeof target === 'object') {
	            if (isArray(target) && isArray(pattern)) {
	                return matchArray(target, pattern);
	            } else {
	                return matchObject(target, pattern);
	            }
	        } else {
	            return target === pattern;
	        }
	    }

	    module.exports = deepMatches;




/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(20);
	var forIn = __webpack_require__(21);

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
/* 20 */
/***/ function(module, exports) {

	

	    /**
	     * Safer Object.hasOwnProperty
	     */
	     function hasOwn(obj, prop){
	         return Object.prototype.hasOwnProperty.call(obj, prop);
	     }

	     module.exports = hasOwn;




/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(20);

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var makeIterator = __webpack_require__(15);

	    /**
	     * Array map
	     */
	    function map(arr, callback, thisObj) {
	        callback = makeIterator(callback, thisObj);
	        var results = [];
	        if (arr == null){
	            return results;
	        }

	        var i = -1, len = arr.length;
	        while (++i < len) {
	            results[i] = callback(arr[i], i, arr);
	        }

	        return results;
	    }

	     module.exports = map;



/***/ }
/******/ ])
});
;