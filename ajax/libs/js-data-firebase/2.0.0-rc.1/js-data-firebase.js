/*!
 * js-data-firebase
 * @version 2.0.0-rc.1 - Homepage <http://www.js-data.io/docs/dsfirebaseadapter>
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @copyright (c) 2014-2015 Jason Dobry 
 * @license MIT <https://github.com/js-data/js-data-firebase/blob/master/LICENSE>
 * 
 * @overview localStorage adapter for js-data.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-data"), require("firebase"));
	else if(typeof define === 'function' && define.amd)
		define(["js-data", "firebase"], factory);
	else if(typeof exports === 'object')
		exports["DSFirebaseAdapter"] = factory(require("js-data"), require("firebase"));
	else
		root["DSFirebaseAdapter"] = factory(root["JSData"], root["Firebase"]);
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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var JSData = __webpack_require__(1);
	var Firebase = __webpack_require__(2);
	var values = __webpack_require__(3);

	var emptyStore = new JSData.DS();
	var DSUtils = JSData.DSUtils;
	var omit = DSUtils.omit;
	var deepMixIn = DSUtils.deepMixIn;
	var removeCircular = DSUtils.removeCircular;
	var forOwn = DSUtils.forOwn;

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

	var DSFirebaseAdapter = (function () {
	  function DSFirebaseAdapter(options) {
	    _classCallCheck(this, DSFirebaseAdapter);

	    options = options || {};
	    this.defaults = new Defaults();
	    deepMixIn(this.defaults, options);
	    this.ref = new Firebase(options.basePath || this.defaults.basePath);
	  }

	  _createClass(DSFirebaseAdapter, [{
	    key: 'getRef',
	    value: function getRef(resourceConfig, options) {
	      options = options || {};
	      return this.ref.child(options.endpoint || resourceConfig.endpoint);
	    }
	  }, {
	    key: 'find',
	    value: function find(resourceConfig, id, options) {
	      var _this = this;

	      return createTask(function (resolve, reject) {
	        queueTask(function () {
	          _this.getRef(resourceConfig, options).child(id).once('value', function (dataSnapshot) {
	            var item = dataSnapshot.val();
	            if (!item) {
	              reject(new Error('Not Found!'));
	            } else {
	              item[resourceConfig.idAttribute] = item[resourceConfig.idAttribute] || id;
	              resolve(item);
	            }
	          }, reject, _this);
	        });
	      });
	    }
	  }, {
	    key: 'findAll',
	    value: function findAll(resourceConfig, params, options) {
	      var _this2 = this;

	      return createTask(function (resolve, reject) {
	        queueTask(function () {
	          _this2.getRef(resourceConfig, options).once('value', function (dataSnapshot) {
	            var data = dataSnapshot.val();
	            forOwn(data, function (value, key) {
	              if (!value[resourceConfig.idAttribute]) {
	                value[resourceConfig.idAttribute] = '/' + key;
	              }
	            });
	            resolve(filter.call(emptyStore, values(data), resourceConfig.name, params, options));
	          }, reject, _this2);
	        });
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(resourceConfig, attrs, options) {
	      var _this3 = this;

	      var id = attrs[resourceConfig.idAttribute];
	      if (DSUtils.isString(id) || DSUtils.isNumber(id)) {
	        return this.update(resourceConfig, id, attrs, options);
	      } else {
	        return createTask(function (resolve, reject) {
	          queueTask(function () {
	            var resourceRef = _this3.getRef(resourceConfig, options);
	            var itemRef = resourceRef.push(removeCircular(omit(attrs, resourceConfig.relationFields || [])), function (err) {
	              if (err) {
	                return reject(err);
	              } else {
	                var _id = itemRef.toString().replace(resourceRef.toString(), '');
	                itemRef.child(resourceConfig.idAttribute).set(_id, function (err) {
	                  if (err) {
	                    reject(err);
	                  } else {
	                    itemRef.once('value', function (dataSnapshot) {
	                      try {
	                        resolve(dataSnapshot.val());
	                      } catch (err) {
	                        reject(err);
	                      }
	                    }, reject, _this3);
	                  }
	                });
	              }
	            });
	          });
	        });
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update(resourceConfig, id, attrs, options) {
	      var _this4 = this;

	      return createTask(function (resolve, reject) {
	        queueTask(function () {
	          attrs = removeCircular(omit(attrs || {}, resourceConfig.relationFields || []));
	          var itemRef = _this4.getRef(resourceConfig, options).child(id);
	          itemRef.once('value', function (dataSnapshot) {
	            try {
	              (function () {
	                var item = dataSnapshot.val() || {};
	                var fields = undefined,
	                    removed = undefined,
	                    i = undefined;
	                if (resourceConfig.relations) {
	                  fields = resourceConfig.relationFields;
	                  removed = [];
	                  for (i = 0; i < fields.length; i++) {
	                    removed.push(attrs[fields[i]]);
	                    delete attrs[fields[i]];
	                  }
	                }
	                deepMixIn(item, attrs);
	                if (resourceConfig.relations) {
	                  fields = resourceConfig.relationFields;
	                  for (i = 0; i < fields.length; i++) {
	                    var toAddBack = removed.shift();
	                    if (toAddBack) {
	                      attrs[fields[i]] = toAddBack;
	                    }
	                  }
	                }
	                itemRef.set(item, function (err) {
	                  if (err) {
	                    reject(err);
	                  } else {
	                    resolve(item);
	                  }
	                });
	              })();
	            } catch (err) {
	              reject(err);
	            }
	          }, reject, _this4);
	        });
	      });
	    }
	  }, {
	    key: 'updateAll',
	    value: function updateAll(resourceConfig, attrs, params, options) {
	      var _this5 = this;

	      return this.findAll(resourceConfig, params, options).then(function (items) {
	        var tasks = [];
	        DSUtils.forEach(items, function (item) {
	          tasks.push(_this5.update(resourceConfig, item[resourceConfig.idAttribute], attrs, options));
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
	          _this6.getRef(resourceConfig, options).child(id).remove(function (err) {
	            if (err) {
	              reject(err);
	            } else {
	              resolve();
	            }
	          });
	        });
	      });
	    }
	  }, {
	    key: 'destroyAll',
	    value: function destroyAll(resourceConfig, params, options) {
	      var _this7 = this;

	      return this.findAll(resourceConfig, params, options).then(function (items) {
	        var tasks = [];
	        DSUtils.forEach(items, function (item) {
	          tasks.push(_this7.destroy(resourceConfig, item[resourceConfig.idAttribute], options));
	        });
	        return DSUtils.Promise.all(tasks);
	      });
	    }
	  }]);

	  return DSFirebaseAdapter;
	})();

	module.exports = DSFirebaseAdapter;

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

	var forOwn = __webpack_require__(4);

	    /**
	     * Get object values
	     */
	    function values(obj) {
	        var vals = [];
	        forOwn(obj, function(val, key){
	            vals.push(val);
	        });
	        return vals;
	    }

	    module.exports = values;




/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(5);
	var forIn = __webpack_require__(6);

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

	

	    /**
	     * Safer Object.hasOwnProperty
	     */
	     function hasOwn(obj, prop){
	         return Object.prototype.hasOwnProperty.call(obj, prop);
	     }

	     module.exports = hasOwn;




/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(5);

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




/***/ }
/******/ ])
});
;