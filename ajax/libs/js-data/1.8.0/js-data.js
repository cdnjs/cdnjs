/*!
 * js-data
 * @version 1.8.0 - Homepage <http://www.js-data.io/>
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @copyright (c) 2014-2015 Jason Dobry 
 * @license MIT <https://github.com/js-data/js-data/blob/master/LICENSE>
 * 
 * @overview Robust framework-agnostic data store.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("bluebird"), (function webpackLoadOptionalExternalModule() { try { return require("js-data-schema"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define(["bluebird", "js-data-schema"], factory);
	else if(typeof exports === 'object')
		exports["JSData"] = factory(require("bluebird"), (function webpackLoadOptionalExternalModule() { try { return require("js-data-schema"); } catch(e) {} }()));
	else
		root["JSData"] = factory(root["bluebird"], root["Schemator"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
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

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var DSUtils = _interopRequire(__webpack_require__(1));

	var DSErrors = _interopRequire(__webpack_require__(2));

	var DS = _interopRequire(__webpack_require__(3));

	module.exports = {
	  DS: DS,
	  createStore: function createStore(options) {
	    return new DS(options);
	  },
	  DSUtils: DSUtils,
	  DSErrors: DSErrors,
	  version: {
	    full: "1.8.0",
	    major: parseInt("1", 10),
	    minor: parseInt("8", 10),
	    patch: parseInt("0", 10),
	    alpha: true ? "false" : false,
	    beta: true ? "false" : false
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	/* jshint eqeqeq:false */

	var DSErrors = _interopRequire(__webpack_require__(2));

	var forEach = _interopRequire(__webpack_require__(9));

	var slice = _interopRequire(__webpack_require__(10));

	var forOwn = _interopRequire(__webpack_require__(14));

	var contains = _interopRequire(__webpack_require__(11));

	var deepMixIn = _interopRequire(__webpack_require__(15));

	var pascalCase = _interopRequire(__webpack_require__(19));

	var remove = _interopRequire(__webpack_require__(12));

	var pick = _interopRequire(__webpack_require__(16));

	var sort = _interopRequire(__webpack_require__(13));

	var upperCase = _interopRequire(__webpack_require__(20));

	var observe = _interopRequire(__webpack_require__(8));

	var es6Promise = _interopRequire(__webpack_require__(21));

	var BinaryHeap = _interopRequire(__webpack_require__(22));

	var w = undefined,
	    _Promise = undefined;
	var DSUtils = undefined;
	var objectProto = Object.prototype;
	var toString = objectProto.toString;
	es6Promise.polyfill();

	var isArray = Array.isArray || function isArray(value) {
	  return toString.call(value) == "[object Array]" || false;
	};

	var isRegExp = function (value) {
	  return toString.call(value) == "[object RegExp]" || false;
	};

	// adapted from lodash.isBoolean
	var isBoolean = function (value) {
	  return value === true || value === false || value && typeof value == "object" && toString.call(value) == "[object Boolean]" || false;
	};

	// adapted from lodash.isString
	var isString = function (value) {
	  return typeof value == "string" || value && typeof value == "object" && toString.call(value) == "[object String]" || false;
	};

	var isObject = function (value) {
	  return toString.call(value) == "[object Object]" || false;
	};

	// adapted from lodash.isDate
	var isDate = function (value) {
	  return value && typeof value == "object" && toString.call(value) == "[object Date]" || false;
	};

	// adapted from lodash.isNumber
	var isNumber = function (value) {
	  var type = typeof value;
	  return type == "number" || value && type == "object" && toString.call(value) == "[object Number]" || false;
	};

	// adapted from lodash.isFunction
	var isFunction = function (value) {
	  return typeof value == "function" || value && toString.call(value) === "[object Function]" || false;
	};

	// shorthand argument checking functions, using these shaves 1.18 kb off of the minified build
	var isStringOrNumber = function (value) {
	  return isString(value) || isNumber(value);
	};
	var isStringOrNumberErr = function (field) {
	  return new DSErrors.IA("\"" + field + "\" must be a string or a number!");
	};
	var isObjectErr = function (field) {
	  return new DSErrors.IA("\"" + field + "\" must be an object!");
	};
	var isArrayErr = function (field) {
	  return new DSErrors.IA("\"" + field + "\" must be an array!");
	};

	// adapted from mout.isEmpty
	var isEmpty = function (val) {
	  if (val == null) {
	    // jshint ignore:line
	    // typeof null == 'object' so we check it first
	    return true;
	  } else if (typeof val === "string" || isArray(val)) {
	    return !val.length;
	  } else if (typeof val === "object") {
	    var _ret = (function () {
	      var result = true;
	      forOwn(val, function () {
	        result = false;
	        return false; // break loop
	      });
	      return {
	        v: result
	      };
	    })();

	    if (typeof _ret === "object") return _ret.v;
	  } else {
	    return true;
	  }
	};

	var intersection = function (array1, array2) {
	  if (!array1 || !array2) {
	    return [];
	  }
	  var result = [];
	  var item = undefined;
	  for (var i = 0, _length = array1.length; i < _length; i++) {
	    item = array1[i];
	    if (DSUtils.contains(result, item)) {
	      continue;
	    }
	    if (DSUtils.contains(array2, item)) {
	      result.push(item);
	    }
	  }
	  return result;
	};

	var filter = function (array, cb, thisObj) {
	  var results = [];
	  forEach(array, function (value, key, arr) {
	    if (cb(value, key, arr)) {
	      results.push(value);
	    }
	  }, thisObj);
	  return results;
	};

	function finallyPolyfill(cb) {
	  var constructor = this.constructor;

	  return this.then(function (value) {
	    return constructor.resolve(cb()).then(function () {
	      return value;
	    });
	  }, function (reason) {
	    return constructor.resolve(cb()).then(function () {
	      throw reason;
	    });
	  });
	}

	try {
	  w = window;
	  if (!w.Promise.prototype["finally"]) {
	    w.Promise.prototype["finally"] = finallyPolyfill;
	  }
	  _Promise = w.Promise;
	  w = {};
	} catch (e) {
	  w = null;
	  _Promise = __webpack_require__(4);
	}

	function Events(target) {
	  var events = {};
	  target = target || this;
	  target.on = function (type, func, ctx) {
	    events[type] = events[type] || [];
	    events[type].push({
	      f: func,
	      c: ctx
	    });
	  };
	  target.off = function (type, func) {
	    var listeners = events[type];
	    if (!listeners) {
	      events = {};
	    } else if (func) {
	      for (var i = 0; i < listeners.length; i++) {
	        if (listeners[i] === func) {
	          listeners.splice(i, 1);
	          break;
	        }
	      }
	    } else {
	      listeners.splice(0, listeners.length);
	    }
	  };
	  target.emit = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var listeners = events[args.shift()] || [];
	    if (listeners) {
	      for (var i = 0; i < listeners.length; i++) {
	        listeners[i].f.apply(listeners[i].c, args);
	      }
	    }
	  };
	}

	var toPromisify = ["beforeValidate", "validate", "afterValidate", "beforeCreate", "afterCreate", "beforeUpdate", "afterUpdate", "beforeDestroy", "afterDestroy"];

	var isBlacklisted = function (prop, bl) {
	  var i = undefined;
	  if (!bl || !bl.length) {
	    return false;
	  }
	  for (i = 0; i < bl.length; i++) {
	    if (bl[i] === prop) {
	      return true;
	    }
	  }
	  return false;
	};

	// adapted from angular.copy
	var copy = function (source, destination, stackSource, stackDest, blacklist) {
	  if (!destination) {
	    destination = source;
	    if (source) {
	      if (isArray(source)) {
	        destination = copy(source, [], stackSource, stackDest, blacklist);
	      } else if (isDate(source)) {
	        destination = new Date(source.getTime());
	      } else if (isRegExp(source)) {
	        destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
	        destination.lastIndex = source.lastIndex;
	      } else if (isObject(source)) {
	        destination = copy(source, Object.create(Object.getPrototypeOf(source)), stackSource, stackDest, blacklist);
	      }
	    }
	  } else {
	    if (source === destination) {
	      throw new Error("Cannot copy! Source and destination are identical.");
	    }

	    stackSource = stackSource || [];
	    stackDest = stackDest || [];

	    if (isObject(source)) {
	      var index = stackSource.indexOf(source);
	      if (index !== -1) {
	        return stackDest[index];
	      }

	      stackSource.push(source);
	      stackDest.push(destination);
	    }

	    var result = undefined;
	    if (isArray(source)) {
	      var i = undefined;
	      destination.length = 0;
	      for (i = 0; i < source.length; i++) {
	        result = copy(source[i], null, stackSource, stackDest, blacklist);
	        if (isObject(source[i])) {
	          stackSource.push(source[i]);
	          stackDest.push(result);
	        }
	        destination.push(result);
	      }
	    } else {
	      if (isArray(destination)) {
	        destination.length = 0;
	      } else {
	        forEach(destination, function (value, key) {
	          delete destination[key];
	        });
	      }
	      for (var key in source) {
	        if (source.hasOwnProperty(key)) {
	          if (isBlacklisted(key, blacklist)) {
	            continue;
	          }
	          result = copy(source[key], null, stackSource, stackDest, blacklist);
	          if (isObject(source[key])) {
	            stackSource.push(source[key]);
	            stackDest.push(result);
	          }
	          destination[key] = result;
	        }
	      }
	    }
	  }
	  return destination;
	};

	// adapted from angular.equals
	var equals = function (o1, o2) {
	  if (o1 === o2) {
	    return true;
	  }
	  if (o1 === null || o2 === null) {
	    return false;
	  }
	  if (o1 !== o1 && o2 !== o2) {
	    return true;
	  } // NaN === NaN
	  var t1 = typeof o1,
	      t2 = typeof o2,
	      length,
	      key,
	      keySet;
	  if (t1 == t2) {
	    if (t1 == "object") {
	      if (isArray(o1)) {
	        if (!isArray(o2)) {
	          return false;
	        }
	        if ((length = o1.length) == o2.length) {
	          // jshint ignore:line
	          for (key = 0; key < length; key++) {
	            if (!equals(o1[key], o2[key])) {
	              return false;
	            }
	          }
	          return true;
	        }
	      } else if (isDate(o1)) {
	        if (!isDate(o2)) {
	          return false;
	        }
	        return equals(o1.getTime(), o2.getTime());
	      } else if (isRegExp(o1) && isRegExp(o2)) {
	        return o1.toString() == o2.toString();
	      } else {
	        if (isArray(o2)) {
	          return false;
	        }
	        keySet = {};
	        for (key in o1) {
	          if (key.charAt(0) === "$" || isFunction(o1[key])) {
	            continue;
	          }
	          if (!equals(o1[key], o2[key])) {
	            return false;
	          }
	          keySet[key] = true;
	        }
	        for (key in o2) {
	          if (!keySet.hasOwnProperty(key) && key.charAt(0) !== "$" && o2[key] !== undefined && !isFunction(o2[key])) {
	            return false;
	          }
	        }
	        return true;
	      }
	    }
	  }
	  return false;
	};

	var resolveId = function (definition, idOrInstance) {
	  if (isString(idOrInstance) || isNumber(idOrInstance)) {
	    return idOrInstance;
	  } else if (idOrInstance && definition) {
	    return idOrInstance[definition.idAttribute] || idOrInstance;
	  } else {
	    return idOrInstance;
	  }
	};

	var resolveItem = function (resource, idOrInstance) {
	  if (resource && (isString(idOrInstance) || isNumber(idOrInstance))) {
	    return resource.index[idOrInstance] || idOrInstance;
	  } else {
	    return idOrInstance;
	  }
	};

	var isValidString = function (val) {
	  return val != null && val !== ""; // jshint ignore:line
	};

	var join = function (items, separator) {
	  separator = separator || "";
	  return filter(items, isValidString).join(separator);
	};

	var makePath = function () {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var result = join(args, "/");
	  return result.replace(/([^:\/]|^)\/{2,}/g, "$1/");
	};

	DSUtils = {
	  // Options that inherit from defaults
	  _: function _(parent, options) {
	    var _this = this;
	    options = options || {};
	    if (options && options.constructor === parent.constructor) {
	      return options;
	    } else if (!isObject(options)) {
	      throw new DSErrors.IA("\"options\" must be an object!");
	    }
	    forEach(toPromisify, function (name) {
	      if (typeof options[name] === "function" && options[name].toString().indexOf("for (var _len = arg") === -1) {
	        options[name] = _this.promisify(options[name]);
	      }
	    });
	    var O = function Options(attrs) {
	      var self = this;
	      forOwn(attrs, function (value, key) {
	        self[key] = value;
	      });
	    };
	    O.prototype = parent;
	    O.prototype.orig = function () {
	      var orig = {};
	      forOwn(this, function (value, key) {
	        orig[key] = value;
	      });
	      return orig;
	    };
	    return new O(options);
	  },
	  _n: isNumber,
	  _s: isString,
	  _sn: isStringOrNumber,
	  _snErr: isStringOrNumberErr,
	  _o: isObject,
	  _oErr: isObjectErr,
	  _a: isArray,
	  _aErr: isArrayErr,
	  compute: function compute(fn, field) {
	    var _this = this;
	    var args = [];
	    forEach(fn.deps, function (dep) {
	      args.push(_this[dep]);
	    });
	    // compute property
	    _this[field] = fn[fn.length - 1].apply(_this, args);
	  },
	  contains: contains,
	  copy: copy,
	  deepMixIn: deepMixIn,
	  diffObjectFromOldObject: observe.diffObjectFromOldObject,
	  BinaryHeap: BinaryHeap,
	  equals: equals,
	  Events: Events,
	  filter: filter,
	  forEach: forEach,
	  forOwn: forOwn,
	  fromJson: function fromJson(json) {
	    return isString(json) ? JSON.parse(json) : json;
	  },
	  get: __webpack_require__(17),
	  intersection: intersection,
	  isArray: isArray,
	  isBoolean: isBoolean,
	  isDate: isDate,
	  isEmpty: isEmpty,
	  isFunction: isFunction,
	  isObject: isObject,
	  isNumber: isNumber,
	  isRegExp: isRegExp,
	  isString: isString,
	  makePath: makePath,
	  observe: observe,
	  pascalCase: pascalCase,
	  pick: pick,
	  Promise: _Promise,
	  promisify: function promisify(fn, target) {
	    var _this = this;
	    if (!fn) {
	      return;
	    } else if (typeof fn !== "function") {
	      throw new Error("Can only promisify functions!");
	    }
	    return function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return new _this.Promise(function (resolve, reject) {

	        args.push(function (err, result) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(result);
	          }
	        });

	        try {
	          var promise = fn.apply(target || this, args);
	          if (promise && promise.then) {
	            promise.then(resolve, reject);
	          }
	        } catch (err) {
	          reject(err);
	        }
	      });
	    };
	  },
	  remove: remove,
	  set: __webpack_require__(18),
	  slice: slice,
	  sort: sort,
	  toJson: JSON.stringify,
	  updateTimestamp: function updateTimestamp(timestamp) {
	    var newTimestamp = typeof Date.now === "function" ? Date.now() : new Date().getTime();
	    if (timestamp && newTimestamp <= timestamp) {
	      return timestamp + 1;
	    } else {
	      return newTimestamp;
	    }
	  },
	  upperCase: upperCase,
	  removeCircular: function removeCircular(object) {
	    return (function rmCirc(value, context) {
	      var i = undefined;
	      var nu = undefined;

	      if (typeof value === "object" && value !== null && !(value instanceof Boolean) && !(value instanceof Date) && !(value instanceof Number) && !(value instanceof RegExp) && !(value instanceof String)) {

	        // check if current object points back to itself
	        var current = context.current;
	        var parent = context.context;
	        while (parent) {
	          if (parent.current === current) {
	            return undefined;
	          }
	          parent = parent.context;
	        }

	        if (DSUtils.isArray(value)) {
	          nu = [];
	          for (i = 0; i < value.length; i += 1) {
	            nu[i] = rmCirc(value[i], { context: context, current: value[i] });
	          }
	        } else {
	          nu = {};
	          forOwn(value, function (v, k) {
	            nu[k] = rmCirc(value[k], { context: context, current: value[k] });
	          });
	        }
	        return nu;
	      }
	      return value;
	    })(object, { context: null, current: object });
	  },
	  resolveItem: resolveItem,
	  resolveId: resolveId,
	  w: w
	};

	module.exports = DSUtils;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var IllegalArgumentError = (function (_Error) {
	  function IllegalArgumentError(message) {
	    _classCallCheck(this, IllegalArgumentError);

	    _get(Object.getPrototypeOf(IllegalArgumentError.prototype), "constructor", this).call(this, this);
	    if (typeof Error.captureStackTrace === "function") {
	      Error.captureStackTrace(this, this.constructor);
	    }
	    this.type = this.constructor.name;
	    this.message = message || "Illegal Argument!";
	  }

	  _inherits(IllegalArgumentError, _Error);

	  return IllegalArgumentError;
	})(Error);

	var RuntimeError = (function (_Error2) {
	  function RuntimeError(message) {
	    _classCallCheck(this, RuntimeError);

	    _get(Object.getPrototypeOf(RuntimeError.prototype), "constructor", this).call(this, this);
	    if (typeof Error.captureStackTrace === "function") {
	      Error.captureStackTrace(this, this.constructor);
	    }
	    this.type = this.constructor.name;
	    this.message = message || "RuntimeError Error!";
	  }

	  _inherits(RuntimeError, _Error2);

	  return RuntimeError;
	})(Error);

	var NonexistentResourceError = (function (_Error3) {
	  function NonexistentResourceError(resourceName) {
	    _classCallCheck(this, NonexistentResourceError);

	    _get(Object.getPrototypeOf(NonexistentResourceError.prototype), "constructor", this).call(this, this);
	    if (typeof Error.captureStackTrace === "function") {
	      Error.captureStackTrace(this, this.constructor);
	    }
	    this.type = this.constructor.name;
	    this.message = "" + resourceName + " is not a registered resource!";
	  }

	  _inherits(NonexistentResourceError, _Error3);

	  return NonexistentResourceError;
	})(Error);

	module.exports = {
	  IllegalArgumentError: IllegalArgumentError,
	  IA: IllegalArgumentError,
	  RuntimeError: RuntimeError,
	  R: RuntimeError,
	  NonexistentResourceError: NonexistentResourceError,
	  NER: NonexistentResourceError
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	/* jshint eqeqeq:false */

	var DSUtils = _interopRequire(__webpack_require__(1));

	var DSErrors = _interopRequire(__webpack_require__(2));

	var syncMethods = _interopRequire(__webpack_require__(6));

	var asyncMethods = _interopRequire(__webpack_require__(7));

	var Schemator = undefined;

	function lifecycleNoopCb(resource, attrs, cb) {
	  cb(null, attrs);
	}

	function lifecycleNoop(resource, attrs) {
	  return attrs;
	}

	function compare(_x, _x2, _x3, _x4) {
	  var _again = true;

	  _function: while (_again) {
	    _again = false;
	    var orderBy = _x,
	        index = _x2,
	        a = _x3,
	        b = _x4;
	    def = cA = cB = undefined;

	    var def = orderBy[index];
	    var cA = DSUtils.get(a, def[0]),
	        cB = DSUtils.get(b, def[0]);
	    if (DSUtils._s(cA)) {
	      cA = DSUtils.upperCase(cA);
	    }
	    if (DSUtils._s(cB)) {
	      cB = DSUtils.upperCase(cB);
	    }
	    if (def[1] === "DESC") {
	      if (cB < cA) {
	        return -1;
	      } else if (cB > cA) {
	        return 1;
	      } else {
	        if (index < orderBy.length - 1) {
	          _x = orderBy;
	          _x2 = index + 1;
	          _x3 = a;
	          _x4 = b;
	          _again = true;
	          continue _function;
	        } else {
	          return 0;
	        }
	      }
	    } else {
	      if (cA < cB) {
	        return -1;
	      } else if (cA > cB) {
	        return 1;
	      } else {
	        if (index < orderBy.length - 1) {
	          _x = orderBy;
	          _x2 = index + 1;
	          _x3 = a;
	          _x4 = b;
	          _again = true;
	          continue _function;
	        } else {
	          return 0;
	        }
	      }
	    }
	  }
	}

	var Defaults = (function () {
	  function Defaults() {
	    _classCallCheck(this, Defaults);
	  }

	  _createClass(Defaults, {
	    errorFn: {
	      value: function errorFn(a, b) {
	        if (this.error && typeof this.error === "function") {
	          try {
	            if (typeof a === "string") {
	              throw new Error(a);
	            } else {
	              throw a;
	            }
	          } catch (err) {
	            a = err;
	          }
	          this.error(this.name || null, a || null, b || null);
	        }
	      }
	    }
	  });

	  return Defaults;
	})();

	var defaultsPrototype = Defaults.prototype;

	defaultsPrototype.actions = {};
	defaultsPrototype.afterCreate = lifecycleNoopCb;
	defaultsPrototype.afterCreateInstance = lifecycleNoop;
	defaultsPrototype.afterDestroy = lifecycleNoopCb;
	defaultsPrototype.afterEject = lifecycleNoop;
	defaultsPrototype.afterInject = lifecycleNoop;
	defaultsPrototype.afterReap = lifecycleNoop;
	defaultsPrototype.afterUpdate = lifecycleNoopCb;
	defaultsPrototype.afterValidate = lifecycleNoopCb;
	defaultsPrototype.allowSimpleWhere = true;
	defaultsPrototype.basePath = "";
	defaultsPrototype.beforeCreate = lifecycleNoopCb;
	defaultsPrototype.beforeCreateInstance = lifecycleNoop;
	defaultsPrototype.beforeDestroy = lifecycleNoopCb;
	defaultsPrototype.beforeEject = lifecycleNoop;
	defaultsPrototype.beforeInject = lifecycleNoop;
	defaultsPrototype.beforeReap = lifecycleNoop;
	defaultsPrototype.beforeUpdate = lifecycleNoopCb;
	defaultsPrototype.beforeValidate = lifecycleNoopCb;
	defaultsPrototype.bypassCache = false;
	defaultsPrototype.cacheResponse = !!DSUtils.w;
	defaultsPrototype.defaultAdapter = "http";
	defaultsPrototype.debug = true;
	defaultsPrototype.eagerEject = false;
	// TODO: Implement eagerInject in DS#create
	defaultsPrototype.eagerInject = false;
	defaultsPrototype.endpoint = "";
	defaultsPrototype.error = console ? function (a, b, c) {
	  return console[typeof console.error === "function" ? "error" : "log"](a, b, c);
	} : false;
	defaultsPrototype.fallbackAdapters = ["http"];
	defaultsPrototype.findBelongsTo = true;
	defaultsPrototype.findHasOne = true;
	defaultsPrototype.findHasMany = true;
	defaultsPrototype.findInverseLinks = true;
	defaultsPrototype.findStrictCache = true;
	defaultsPrototype.idAttribute = "id";
	defaultsPrototype.ignoredChanges = [/\$/];
	defaultsPrototype.ignoreMissing = false;
	defaultsPrototype.keepChangeHistory = false;
	defaultsPrototype.loadFromServer = false;
	defaultsPrototype.log = console ? function (a, b, c, d, e) {
	  return console[typeof console.info === "function" ? "info" : "log"](a, b, c, d, e);
	} : false;

	defaultsPrototype.logFn = function (a, b, c, d) {
	  var _this = this;
	  if (_this.debug && _this.log && typeof _this.log === "function") {
	    _this.log(_this.name || null, a || null, b || null, c || null, d || null);
	  }
	};

	defaultsPrototype.maxAge = false;
	defaultsPrototype.notify = !!DSUtils.w;
	defaultsPrototype.reapAction = !!DSUtils.w ? "inject" : "none";
	defaultsPrototype.reapInterval = !!DSUtils.w ? 30000 : false;
	defaultsPrototype.resetHistoryOnInject = true;
	defaultsPrototype.strategy = "single";
	defaultsPrototype.upsert = !!DSUtils.w;
	defaultsPrototype.useClass = true;
	defaultsPrototype.useFilter = false;
	defaultsPrototype.validate = lifecycleNoopCb;
	defaultsPrototype.defaultFilter = function (collection, resourceName, params, options) {
	  var filtered = collection;
	  var where = null;
	  var reserved = {
	    skip: "",
	    offset: "",
	    where: "",
	    limit: "",
	    orderBy: "",
	    sort: ""
	  };

	  params = params || {};
	  options = options || {};

	  if (DSUtils._o(params.where)) {
	    where = params.where;
	  } else {
	    where = {};
	  }

	  if (options.allowSimpleWhere) {
	    DSUtils.forOwn(params, function (value, key) {
	      if (!(key in reserved) && !(key in where)) {
	        where[key] = {
	          "==": value
	        };
	      }
	    });
	  }

	  if (DSUtils.isEmpty(where)) {
	    where = null;
	  }

	  if (where) {
	    filtered = DSUtils.filter(filtered, function (attrs) {
	      var first = true;
	      var keep = true;
	      DSUtils.forOwn(where, function (clause, field) {
	        if (DSUtils._s(clause)) {
	          clause = {
	            "===": clause
	          };
	        } else if (DSUtils._n(clause) || DSUtils.isBoolean(clause)) {
	          clause = {
	            "==": clause
	          };
	        }
	        if (DSUtils._o(clause)) {
	          DSUtils.forOwn(clause, function (term, op) {
	            var expr = undefined;
	            var isOr = op[0] === "|";
	            var val = attrs[field];
	            op = isOr ? op.substr(1) : op;
	            if (op === "==") {
	              expr = val == term;
	            } else if (op === "===") {
	              expr = val === term;
	            } else if (op === "!=") {
	              expr = val != term;
	            } else if (op === "!==") {
	              expr = val !== term;
	            } else if (op === ">") {
	              expr = val > term;
	            } else if (op === ">=") {
	              expr = val >= term;
	            } else if (op === "<") {
	              expr = val < term;
	            } else if (op === "<=") {
	              expr = val <= term;
	            } else if (op === "isectEmpty") {
	              expr = !DSUtils.intersection(val || [], term || []).length;
	            } else if (op === "isectNotEmpty") {
	              expr = DSUtils.intersection(val || [], term || []).length;
	            } else if (op === "in") {
	              if (DSUtils._s(term)) {
	                expr = term.indexOf(val) !== -1;
	              } else {
	                expr = DSUtils.contains(term, val);
	              }
	            } else if (op === "notIn") {
	              if (DSUtils._s(term)) {
	                expr = term.indexOf(val) === -1;
	              } else {
	                expr = !DSUtils.contains(term, val);
	              }
	            } else if (op === "contains") {
	              if (DSUtils._s(val)) {
	                expr = val.indexOf(term) !== -1;
	              } else {
	                expr = DSUtils.contains(val, term);
	              }
	            } else if (op === "notContains") {
	              if (DSUtils._s(val)) {
	                expr = val.indexOf(term) === -1;
	              } else {
	                expr = !DSUtils.contains(val, term);
	              }
	            }
	            if (expr !== undefined) {
	              keep = first ? expr : isOr ? keep || expr : keep && expr;
	            }
	            first = false;
	          });
	        }
	      });
	      return keep;
	    });
	  }

	  var orderBy = null;

	  if (DSUtils._s(params.orderBy)) {
	    orderBy = [[params.orderBy, "ASC"]];
	  } else if (DSUtils._a(params.orderBy)) {
	    orderBy = params.orderBy;
	  }

	  if (!orderBy && DSUtils._s(params.sort)) {
	    orderBy = [[params.sort, "ASC"]];
	  } else if (!orderBy && DSUtils._a(params.sort)) {
	    orderBy = params.sort;
	  }

	  // Apply 'orderBy'
	  if (orderBy) {
	    (function () {
	      var index = 0;
	      DSUtils.forEach(orderBy, function (def, i) {
	        if (DSUtils._s(def)) {
	          orderBy[i] = [def, "ASC"];
	        } else if (!DSUtils._a(def)) {
	          throw new DSErrors.IA("DS.filter(\"" + resourceName + "\"[, params][, options]): " + DSUtils.toJson(def) + ": Must be a string or an array!", {
	            params: {
	              "orderBy[i]": {
	                actual: typeof def,
	                expected: "string|array"
	              }
	            }
	          });
	        }
	      });
	      filtered = DSUtils.sort(filtered, function (a, b) {
	        return compare(orderBy, index, a, b);
	      });
	    })();
	  }

	  var limit = DSUtils._n(params.limit) ? params.limit : null;
	  var skip = null;

	  if (DSUtils._n(params.skip)) {
	    skip = params.skip;
	  } else if (DSUtils._n(params.offset)) {
	    skip = params.offset;
	  }

	  // Apply 'limit' and 'skip'
	  if (limit && skip) {
	    filtered = DSUtils.slice(filtered, skip, Math.min(filtered.length, skip + limit));
	  } else if (DSUtils._n(limit)) {
	    filtered = DSUtils.slice(filtered, 0, Math.min(filtered.length, limit));
	  } else if (DSUtils._n(skip)) {
	    if (skip < filtered.length) {
	      filtered = DSUtils.slice(filtered, skip);
	    } else {
	      filtered = [];
	    }
	  }

	  return filtered;
	};

	var DS = (function () {
	  function DS(options) {
	    _classCallCheck(this, DS);

	    var _this = this;
	    options = options || {};

	    try {
	      Schemator = __webpack_require__(5);
	    } catch (e) {}

	    if (!Schemator || typeof Schemator !== "function") {
	      try {
	        Schemator = window.Schemator;
	      } catch (e) {}
	    }

	    Schemator = Schemator || options.schemator;
	    if (typeof Schemator === "function") {
	      _this.schemator = new Schemator();
	    }

	    _this.store = {};
	    // alias store, shaves 0.1 kb off the minified build
	    _this.s = _this.store;
	    _this.definitions = {};
	    // alias definitions, shaves 0.3 kb off the minified build
	    _this.defs = _this.definitions;
	    _this.adapters = {};
	    _this.defaults = new Defaults();
	    _this.observe = DSUtils.observe;
	    DSUtils.forOwn(options, function (v, k) {
	      _this.defaults[k] = v;
	    });
	  }

	  _createClass(DS, {
	    getAdapter: {
	      value: function getAdapter(options) {
	        var errorIfNotExist = false;
	        options = options || {};
	        if (DSUtils._s(options)) {
	          errorIfNotExist = true;
	          options = {
	            adapter: options
	          };
	        }
	        var adapter = this.adapters[options.adapter];
	        if (adapter) {
	          return adapter;
	        } else if (errorIfNotExist) {
	          throw new Error("" + options.adapter + " is not a registered adapter!");
	        } else {
	          return this.adapters[options.defaultAdapter];
	        }
	      }
	    },
	    registerAdapter: {
	      value: function registerAdapter(name, Adapter, options) {
	        var _this = this;
	        options = options || {};
	        if (DSUtils.isFunction(Adapter)) {
	          _this.adapters[name] = new Adapter(options);
	        } else {
	          _this.adapters[name] = Adapter;
	        }
	        if (options["default"]) {
	          _this.defaults.defaultAdapter = name;
	        }
	      }
	    },
	    is: {
	      value: function is(resourceName, instance) {
	        var definition = this.defs[resourceName];
	        if (!definition) {
	          throw new DSErrors.NER(resourceName);
	        }
	        return instance instanceof definition[definition["class"]];
	      }
	    }
	  });

	  return DS;
	})();

	var dsPrototype = DS.prototype;

	dsPrototype.getAdapter.shorthand = false;
	dsPrototype.registerAdapter.shorthand = false;
	dsPrototype.errors = DSErrors;
	dsPrototype.utils = DSUtils;
	DSUtils.deepMixIn(dsPrototype, syncMethods);
	DSUtils.deepMixIn(dsPrototype, asyncMethods);

	module.exports = DS;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	if(typeof __WEBPACK_EXTERNAL_MODULE_5__ === 'undefined') {var e = new Error("Cannot find module \"undefined\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var DSUtils = _interopRequire(__webpack_require__(1));

	var DSErrors = _interopRequire(__webpack_require__(2));

	var defineResource = _interopRequire(__webpack_require__(23));

	var eject = _interopRequire(__webpack_require__(24));

	var ejectAll = _interopRequire(__webpack_require__(25));

	var filter = _interopRequire(__webpack_require__(26));

	var inject = _interopRequire(__webpack_require__(27));

	var link = _interopRequire(__webpack_require__(28));

	var linkAll = _interopRequire(__webpack_require__(29));

	var linkInverse = _interopRequire(__webpack_require__(30));

	var unlinkInverse = _interopRequire(__webpack_require__(31));

	var NER = DSErrors.NER;
	var IA = DSErrors.IA;
	var R = DSErrors.R;

	function diffIsEmpty(diff) {
	  return !(DSUtils.isEmpty(diff.added) && DSUtils.isEmpty(diff.removed) && DSUtils.isEmpty(diff.changed));
	}

	module.exports = {
	  changes: function changes(resourceName, id, options) {
	    var _this = this;
	    var definition = _this.defs[resourceName];
	    options = options || {};

	    id = DSUtils.resolveId(definition, id);
	    if (!definition) {
	      throw new NER(resourceName);
	    } else if (!DSUtils._sn(id)) {
	      throw DSUtils._snErr("id");
	    }
	    options = DSUtils._(definition, options);


	    var item = _this.get(resourceName, id);
	    if (item) {
	      var _ret = (function () {
	        if (DSUtils.w) {
	          _this.s[resourceName].observers[id].deliver();
	        }
	        var ignoredChanges = options.ignoredChanges || [];
	        DSUtils.forEach(definition.relationFields, function (field) {
	          return ignoredChanges.push(field);
	        });
	        var diff = DSUtils.diffObjectFromOldObject(item, _this.s[resourceName].previousAttributes[id], DSUtils.equals, ignoredChanges);
	        DSUtils.forOwn(diff, function (changeset, name) {
	          var toKeep = [];
	          DSUtils.forOwn(changeset, function (value, field) {
	            if (!DSUtils.isFunction(value)) {
	              toKeep.push(field);
	            }
	          });
	          diff[name] = DSUtils.pick(diff[name], toKeep);
	        });
	        DSUtils.forEach(definition.relationFields, function (field) {
	          delete diff.added[field];
	          delete diff.removed[field];
	          delete diff.changed[field];
	        });
	        return {
	          v: diff
	        };
	      })();

	      if (typeof _ret === "object") {
	        return _ret.v;
	      }
	    }
	  },
	  changeHistory: function changeHistory(resourceName, id) {
	    var _this = this;
	    var definition = _this.defs[resourceName];
	    var resource = _this.s[resourceName];

	    id = DSUtils.resolveId(definition, id);
	    if (resourceName && !_this.defs[resourceName]) {
	      throw new NER(resourceName);
	    } else if (id && !DSUtils._sn(id)) {
	      throw DSUtils._snErr("id");
	    }


	    if (!definition.keepChangeHistory) {
	      definition.errorFn("changeHistory is disabled for this resource!");
	    } else {
	      if (resourceName) {
	        var item = _this.get(resourceName, id);
	        if (item) {
	          return resource.changeHistories[id];
	        }
	      } else {
	        return resource.changeHistory;
	      }
	    }
	  },
	  compute: function compute(resourceName, instance) {
	    var _this = this;
	    var definition = _this.defs[resourceName];

	    instance = DSUtils.resolveItem(_this.s[resourceName], instance);
	    if (!definition) {
	      throw new NER(resourceName);
	    } else if (!instance) {
	      throw new R("Item not in the store!");
	    } else if (!DSUtils._o(instance) && !DSUtils._sn(instance)) {
	      throw new IA("\"instance\" must be an object, string or number!");
	    }

	    DSUtils.forOwn(definition.computed, function (fn, field) {
	      DSUtils.compute.call(instance, fn, field);
	    });
	    return instance;
	  },
	  createInstance: function createInstance(resourceName, attrs, options) {
	    var definition = this.defs[resourceName];
	    var item = undefined;

	    attrs = attrs || {};

	    if (!definition) {
	      throw new NER(resourceName);
	    } else if (attrs && !DSUtils.isObject(attrs)) {
	      throw new IA("\"attrs\" must be an object!");
	    }

	    options = DSUtils._(definition, options);


	    if (options.notify) {
	      options.beforeCreateInstance(options, attrs);
	    }

	    if (options.useClass) {
	      var Constructor = definition[definition["class"]];
	      item = new Constructor();
	    } else {
	      item = {};
	    }
	    DSUtils.deepMixIn(item, attrs);
	    if (definition.computed) {
	      this.compute(definition.name, item);
	    }
	    if (options.notify) {
	      options.afterCreateInstance(options, item);
	    }
	    return item;
	  },
	  defineResource: defineResource,
	  digest: function digest() {
	    this.observe.Platform.performMicrotaskCheckpoint();
	  },
	  eject: eject,
	  ejectAll: ejectAll,
	  filter: filter,
	  get: function get(resourceName, id, options) {
	    var _this = this;
	    var definition = _this.defs[resourceName];

	    if (!definition) {
	      throw new NER(resourceName);
	    } else if (!DSUtils._sn(id)) {
	      throw DSUtils._snErr("id");
	    }

	    options = DSUtils._(definition, options);


	    // cache miss, request resource from server
	    var item = _this.s[resourceName].index[id];
	    if (!item && options.loadFromServer) {
	      _this.find(resourceName, id, options);
	    }

	    // return resource from cache
	    return item;
	  },
	  getAll: function getAll(resourceName, ids) {
	    var _this = this;
	    var definition = _this.defs[resourceName];
	    var resource = _this.s[resourceName];
	    var collection = [];

	    if (!definition) {
	      throw new NER(resourceName);
	    } else if (ids && !DSUtils._a(ids)) {
	      throw DSUtils._aErr("ids");
	    }


	    if (DSUtils._a(ids)) {
	      var _length = ids.length;
	      for (var i = 0; i < _length; i++) {
	        if (resource.index[ids[i]]) {
	          collection.push(resource.index[ids[i]]);
	        }
	      }
	    } else {
	      collection = resource.collection.slice();
	    }

	    return collection;
	  },
	  hasChanges: function hasChanges(resourceName, id) {
	    var _this = this;
	    var definition = _this.defs[resourceName];

	    id = DSUtils.resolveId(definition, id);

	    if (!definition) {
	      throw new NER(resourceName);
	    } else if (!DSUtils._sn(id)) {
	      throw DSUtils._snErr("id");
	    }


	    // return resource from cache
	    if (_this.get(resourceName, id)) {
	      return diffIsEmpty(_this.changes(resourceName, id));
	    } else {
	      return false;
	    }
	  },
	  inject: inject,
	  lastModified: function lastModified(resourceName, id) {
	    var definition = this.defs[resourceName];
	    var resource = this.s[resourceName];

	    id = DSUtils.resolveId(definition, id);
	    if (!definition) {
	      throw new NER(resourceName);
	    }


	    if (id) {
	      if (!(id in resource.modified)) {
	        resource.modified[id] = 0;
	      }
	      return resource.modified[id];
	    }
	    return resource.collectionModified;
	  },
	  lastSaved: function lastSaved(resourceName, id) {
	    var definition = this.defs[resourceName];
	    var resource = this.s[resourceName];

	    id = DSUtils.resolveId(definition, id);
	    if (!definition) {
	      throw new NER(resourceName);
	    }


	    if (!(id in resource.saved)) {
	      resource.saved[id] = 0;
	    }
	    return resource.saved[id];
	  },
	  link: link,
	  linkAll: linkAll,
	  linkInverse: linkInverse,
	  previous: function previous(resourceName, id) {
	    var _this = this;
	    var definition = _this.defs[resourceName];
	    var resource = _this.s[resourceName];

	    id = DSUtils.resolveId(definition, id);
	    if (!definition) {
	      throw new NER(resourceName);
	    } else if (!DSUtils._sn(id)) {
	      throw DSUtils._snErr("id");
	    }


	    // return resource from cache
	    return resource.previousAttributes[id] ? DSUtils.copy(resource.previousAttributes[id]) : undefined;
	  },
	  unlinkInverse: unlinkInverse
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var create = _interopRequire(__webpack_require__(40));

	var destroy = _interopRequire(__webpack_require__(41));

	var destroyAll = _interopRequire(__webpack_require__(42));

	var find = _interopRequire(__webpack_require__(43));

	var findAll = _interopRequire(__webpack_require__(44));

	var loadRelations = _interopRequire(__webpack_require__(45));

	var reap = _interopRequire(__webpack_require__(46));

	var save = _interopRequire(__webpack_require__(47));

	var update = _interopRequire(__webpack_require__(48));

	var updateAll = _interopRequire(__webpack_require__(49));

	module.exports = {
	  create: create,
	  destroy: destroy,
	  destroyAll: destroyAll,
	  find: find,
	  findAll: findAll,
	  loadRelations: loadRelations,
	  reap: reap,
	  refresh: function refresh(resourceName, id, options) {
	    var _this = this;
	    var DSUtils = _this.utils;

	    return new DSUtils.Promise(function (resolve, reject) {
	      var definition = _this.defs[resourceName];
	      id = DSUtils.resolveId(_this.defs[resourceName], id);
	      if (!definition) {
	        reject(new _this.errors.NER(resourceName));
	      } else if (!DSUtils._sn(id)) {
	        reject(DSUtils._snErr("id"));
	      } else {
	        options = DSUtils._(definition, options);
	        options.bypassCache = true;
	        resolve(_this.get(resourceName, id));
	      }
	    }).then(function (item) {
	      return item ? _this.find(resourceName, id, options) : item;
	    });
	  },
	  save: save,
	  update: update,
	  updateAll: updateAll
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */

	// Modifications
	// Copyright 2014-2015 Jason Dobry
	//
	// Summary of modifications:
	// Fixed use of "delete" keyword for IE8 compatibility
	// Exposed diffObjectFromOldObject on the exported object
	// Added the "equals" argument to diffObjectFromOldObject to be used to check equality
	// Added a way in diffObjectFromOldObject to ignore changes to certain properties
	// Removed all code related to:
	// - ArrayObserver
	// - ArraySplice
	// - PathObserver
	// - CompoundObserver
	// - Path
	// - ObserverTransform

	(function(global) {
	  var testingExposeCycleCount = global.testingExposeCycleCount;

	  // Detect and do basic sanity checking on Object/Array.observe.
	  function detectObjectObserve() {
	    if (typeof Object.observe !== 'function' ||
	        typeof Array.observe !== 'function') {
	      return false;
	    }

	    var records = [];

	    function callback(recs) {
	      records = recs;
	    }

	    var test = {};
	    var arr = [];
	    Object.observe(test, callback);
	    Array.observe(arr, callback);
	    test.id = 1;
	    test.id = 2;
	    delete test.id;
	    arr.push(1, 2);
	    arr.length = 0;

	    Object.deliverChangeRecords(callback);
	    if (records.length !== 5)
	      return false;

	    if (records[0].type != 'add' ||
	        records[1].type != 'update' ||
	        records[2].type != 'delete' ||
	        records[3].type != 'splice' ||
	        records[4].type != 'splice') {
	      return false;
	    }

	    Object.unobserve(test, callback);
	    Array.unobserve(arr, callback);

	    return true;
	  }

	  var hasObserve = detectObjectObserve();

	  var createObject = ('__proto__' in {}) ?
	    function(obj) { return obj; } :
	    function(obj) {
	      var proto = obj.__proto__;
	      if (!proto)
	        return obj;
	      var newObject = Object.create(proto);
	      Object.getOwnPropertyNames(obj).forEach(function(name) {
	        Object.defineProperty(newObject, name,
	                             Object.getOwnPropertyDescriptor(obj, name));
	      });
	      return newObject;
	    };

	  var MAX_DIRTY_CHECK_CYCLES = 1000;

	  function dirtyCheck(observer) {
	    var cycles = 0;
	    while (cycles < MAX_DIRTY_CHECK_CYCLES && observer.check_()) {
	      cycles++;
	    }
	    if (testingExposeCycleCount)
	      global.dirtyCheckCycleCount = cycles;

	    return cycles > 0;
	  }

	  function objectIsEmpty(object) {
	    for (var prop in object)
	      return false;
	    return true;
	  }

	  function diffIsEmpty(diff) {
	    return objectIsEmpty(diff.added) &&
	           objectIsEmpty(diff.removed) &&
	           objectIsEmpty(diff.changed);
	  }

	  function isBlacklisted(prop, bl) {
	    if (!bl || !bl.length) {
	      return false;
	    }
	    var matches;
	    for (var i = 0; i < bl.length; i++) {
	      if ((Object.prototype.toString.call(bl[i]) === '[object RegExp]' && bl[i].test(prop)) || bl[i] === prop) {
	        return matches = prop;
	      }
	    }
	    return !!matches;
	  }

	  function diffObjectFromOldObject(object, oldObject, equals, bl) {
	    var added = {};
	    var removed = {};
	    var changed = {};

	    for (var prop in oldObject) {
	      var newValue = object[prop];

	      if (isBlacklisted(prop, bl))
	        continue;

	      if (newValue !== undefined && (equals ? equals(newValue, oldObject[prop]) : newValue === oldObject[prop]))
	        continue;

	      if (!(prop in object)) {
	        removed[prop] = undefined;
	        continue;
	      }

	      if (equals ? !equals(newValue, oldObject[prop]) : newValue !== oldObject[prop])
	        changed[prop] = newValue;
	    }

	    for (var prop in object) {
	      if (prop in oldObject)
	        continue;

	      if (isBlacklisted(prop, bl))
	        continue;

	      added[prop] = object[prop];
	    }

	    if (Array.isArray(object) && object.length !== oldObject.length)
	      changed.length = object.length;

	    return {
	      added: added,
	      removed: removed,
	      changed: changed
	    };
	  }

	  var eomTasks = [];
	  function runEOMTasks() {
	    if (!eomTasks.length)
	      return false;

	    for (var i = 0; i < eomTasks.length; i++) {
	      eomTasks[i]();
	    }
	    eomTasks.length = 0;
	    return true;
	  }

	  var runEOM = hasObserve ? (function(){
	    return function(fn) {
	      return Promise.resolve().then(fn);
	    }
	  })() :
	  (function() {
	    return function(fn) {
	      eomTasks.push(fn);
	    };
	  })();

	  var observedObjectCache = [];

	  function newObservedObject() {
	    var observer;
	    var object;
	    var discardRecords = false;
	    var first = true;

	    function callback(records) {
	      if (observer && observer.state_ === OPENED && !discardRecords)
	        observer.check_(records);
	    }

	    return {
	      open: function(obs) {
	        if (observer)
	          throw Error('ObservedObject in use');

	        if (!first)
	          Object.deliverChangeRecords(callback);

	        observer = obs;
	        first = false;
	      },
	      observe: function(obj, arrayObserve) {
	        object = obj;
	        if (arrayObserve)
	          Array.observe(object, callback);
	        else
	          Object.observe(object, callback);
	      },
	      deliver: function(discard) {
	        discardRecords = discard;
	        Object.deliverChangeRecords(callback);
	        discardRecords = false;
	      },
	      close: function() {
	        observer = undefined;
	        Object.unobserve(object, callback);
	        observedObjectCache.push(this);
	      }
	    };
	  }

	  function getObservedObject(observer, object, arrayObserve) {
	    var dir = observedObjectCache.pop() || newObservedObject();
	    dir.open(observer);
	    dir.observe(object, arrayObserve);
	    return dir;
	  }

	  var UNOPENED = 0;
	  var OPENED = 1;
	  var CLOSED = 2;

	  var nextObserverId = 1;

	  function Observer() {
	    this.state_ = UNOPENED;
	    this.callback_ = undefined;
	    this.target_ = undefined; // TODO(rafaelw): Should be WeakRef
	    this.directObserver_ = undefined;
	    this.value_ = undefined;
	    this.id_ = nextObserverId++;
	  }

	  Observer.prototype = {
	    open: function(callback, target) {
	      if (this.state_ != UNOPENED)
	        throw Error('Observer has already been opened.');

	      addToAll(this);
	      this.callback_ = callback;
	      this.target_ = target;
	      this.connect_();
	      this.state_ = OPENED;
	      return this.value_;
	    },

	    close: function() {
	      if (this.state_ != OPENED)
	        return;

	      removeFromAll(this);
	      this.disconnect_();
	      this.value_ = undefined;
	      this.callback_ = undefined;
	      this.target_ = undefined;
	      this.state_ = CLOSED;
	    },

	    deliver: function() {
	      if (this.state_ != OPENED)
	        return;

	      dirtyCheck(this);
	    },

	    report_: function(changes) {
	      try {
	        this.callback_.apply(this.target_, changes);
	      } catch (ex) {
	        Observer._errorThrownDuringCallback = true;
	        console.error('Exception caught during observer callback: ' +
	                       (ex.stack || ex));
	      }
	    },

	    discardChanges: function() {
	      this.check_(undefined, true);
	      return this.value_;
	    }
	  }

	  var collectObservers = !hasObserve;
	  var allObservers;
	  Observer._allObserversCount = 0;

	  if (collectObservers) {
	    allObservers = [];
	  }

	  function addToAll(observer) {
	    Observer._allObserversCount++;
	    if (!collectObservers)
	      return;

	    allObservers.push(observer);
	  }

	  function removeFromAll(observer) {
	    Observer._allObserversCount--;
	  }

	  var runningMicrotaskCheckpoint = false;

	  global.Platform = global.Platform || {};

	  global.Platform.performMicrotaskCheckpoint = function() {
	    if (runningMicrotaskCheckpoint)
	      return;

	    if (!collectObservers)
	      return;

	    runningMicrotaskCheckpoint = true;

	    var cycles = 0;
	    var anyChanged, toCheck;

	    do {
	      cycles++;
	      toCheck = allObservers;
	      allObservers = [];
	      anyChanged = false;

	      for (var i = 0; i < toCheck.length; i++) {
	        var observer = toCheck[i];
	        if (observer.state_ != OPENED)
	          continue;

	        if (observer.check_())
	          anyChanged = true;

	        allObservers.push(observer);
	      }
	      if (runEOMTasks())
	        anyChanged = true;
	    } while (cycles < MAX_DIRTY_CHECK_CYCLES && anyChanged);

	    if (testingExposeCycleCount)
	      global.dirtyCheckCycleCount = cycles;

	    runningMicrotaskCheckpoint = false;
	  };

	  if (collectObservers) {
	    global.Platform.clearObservers = function() {
	      allObservers = [];
	    };
	  }

	  function ObjectObserver(object) {
	    Observer.call(this);
	    this.value_ = object;
	    this.oldObject_ = undefined;
	  }

	  ObjectObserver.prototype = createObject({
	    __proto__: Observer.prototype,

	    arrayObserve: false,

	    connect_: function(callback, target) {
	      if (hasObserve) {
	        this.directObserver_ = getObservedObject(this, this.value_,
	                                                 this.arrayObserve);
	      } else {
	        this.oldObject_ = this.copyObject(this.value_);
	      }

	    },

	    copyObject: function(object) {
	      var copy = Array.isArray(object) ? [] : {};
	      for (var prop in object) {
	        copy[prop] = object[prop];
	      };
	      if (Array.isArray(object))
	        copy.length = object.length;
	      return copy;
	    },

	    check_: function(changeRecords, skipChanges) {
	      var diff;
	      var oldValues;
	      if (hasObserve) {
	        if (!changeRecords)
	          return false;

	        oldValues = {};
	        diff = diffObjectFromChangeRecords(this.value_, changeRecords,
	                                           oldValues);
	      } else {
	        oldValues = this.oldObject_;
	        diff = diffObjectFromOldObject(this.value_, this.oldObject_);
	      }

	      if (diffIsEmpty(diff))
	        return false;

	      if (!hasObserve)
	        this.oldObject_ = this.copyObject(this.value_);

	      this.report_([
	        diff.added || {},
	        diff.removed || {},
	        diff.changed || {},
	        function(property) {
	          return oldValues[property];
	        }
	      ]);

	      return true;
	    },

	    disconnect_: function() {
	      if (hasObserve) {
	        this.directObserver_.close();
	        this.directObserver_ = undefined;
	      } else {
	        this.oldObject_ = undefined;
	      }
	    },

	    deliver: function() {
	      if (this.state_ != OPENED)
	        return;

	      if (hasObserve)
	        this.directObserver_.deliver(false);
	      else
	        dirtyCheck(this);
	    },

	    discardChanges: function() {
	      if (this.directObserver_)
	        this.directObserver_.deliver(true);
	      else
	        this.oldObject_ = this.copyObject(this.value_);

	      return this.value_;
	    }
	  });

	  var observerSentinel = {};

	  var expectedRecordTypes = {
	    add: true,
	    update: true,
	    'delete': true
	  };

	  function diffObjectFromChangeRecords(object, changeRecords, oldValues) {
	    var added = {};
	    var removed = {};

	    for (var i = 0; i < changeRecords.length; i++) {
	      var record = changeRecords[i];
	      if (!expectedRecordTypes[record.type]) {
	        console.error('Unknown changeRecord type: ' + record.type);
	        console.error(record);
	        continue;
	      }

	      if (!(record.name in oldValues))
	        oldValues[record.name] = record.oldValue;

	      if (record.type == 'update')
	        continue;

	      if (record.type == 'add') {
	        if (record.name in removed)
	          delete removed[record.name];
	        else
	          added[record.name] = true;

	        continue;
	      }

	      // type = 'delete'
	      if (record.name in added) {
	        delete added[record.name];
	        delete oldValues[record.name];
	      } else {
	        removed[record.name] = true;
	      }
	    }

	    for (var prop in added)
	      added[prop] = object[prop];

	    for (var prop in removed)
	      removed[prop] = undefined;

	    var changed = {};
	    for (var prop in oldValues) {
	      if (prop in added || prop in removed)
	        continue;

	      var newValue = object[prop];
	      if (oldValues[prop] !== newValue)
	        changed[prop] = newValue;
	    }

	    return {
	      added: added,
	      removed: removed,
	      changed: changed
	    };
	  }

	  // Export the observe-js object for **Node.js**, with backwards-compatibility
	  // for the old `require()` API. Also ensure `exports` is not a DOM Element.
	  // If we're in the browser, export as a global object.

	  global.Observer = Observer;
	  global.Observer.runEOM_ = runEOM;
	  global.Observer.observerSentinel_ = observerSentinel; // for testing.
	  global.Observer.hasObjectObserve = hasObserve;
	  global.diffObjectFromOldObject = diffObjectFromOldObject;
	  global.ObjectObserver = ObjectObserver;

	})(exports);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Array forEach
	     */
	    function forEach(arr, callback, thisObj) {
	        if (arr == null) {
	            return;
	        }
	        var i = -1,
	            len = arr.length;
	        while (++i < len) {
	            // we iterate over sparse items since there is no way to make it
	            // work properly on IE 7-8. see #64
	            if ( callback.call(thisObj, arr[i], i, arr) === false ) {
	                break;
	            }
	        }
	    }

	    module.exports = forEach;




/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var indexOf = __webpack_require__(32);

	    /**
	     * If array contains values.
	     */
	    function contains(arr, val) {
	        return indexOf(arr, val) !== -1;
	    }
	    module.exports = contains;



/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var indexOf = __webpack_require__(32);

	    /**
	     * Remove a single item from the array.
	     * (it won't remove duplicates, just a single item)
	     */
	    function remove(arr, item){
	        var idx = indexOf(arr, item);
	        if (idx !== -1) arr.splice(idx, 1);
	    }

	    module.exports = remove;



/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Merge sort (http://en.wikipedia.org/wiki/Merge_sort)
	     */
	    function mergeSort(arr, compareFn) {
	        if (arr == null) {
	            return [];
	        } else if (arr.length < 2) {
	            return arr;
	        }

	        if (compareFn == null) {
	            compareFn = defaultCompare;
	        }

	        var mid, left, right;

	        mid   = ~~(arr.length / 2);
	        left  = mergeSort( arr.slice(0, mid), compareFn );
	        right = mergeSort( arr.slice(mid, arr.length), compareFn );

	        return merge(left, right, compareFn);
	    }

	    function defaultCompare(a, b) {
	        return a < b ? -1 : (a > b? 1 : 0);
	    }

	    function merge(left, right, compareFn) {
	        var result = [];

	        while (left.length && right.length) {
	            if (compareFn(left[0], right[0]) <= 0) {
	                // if 0 it should preserve same order (stable)
	                result.push(left.shift());
	            } else {
	                result.push(right.shift());
	            }
	        }

	        if (left.length) {
	            result.push.apply(result, left);
	        }

	        if (right.length) {
	            result.push.apply(result, right);
	        }

	        return result;
	    }

	    module.exports = mergeSort;




/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(33);
	var forIn = __webpack_require__(34);

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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(14);
	var isPlainObject = __webpack_require__(36);

	    /**
	     * Mixes objects into the target object, recursively mixing existing child
	     * objects.
	     */
	    function deepMixIn(target, objects) {
	        var i = 0,
	            n = arguments.length,
	            obj;

	        while(++i < n){
	            obj = arguments[i];
	            if (obj) {
	                forOwn(obj, copyProp, target);
	            }
	        }

	        return target;
	    }

	    function copyProp(val, key) {
	        var existing = this[key];
	        if (isPlainObject(val) && isPlainObject(existing)) {
	            deepMixIn(existing, val);
	        } else {
	            this[key] = val;
	        }
	    }

	    module.exports = deepMixIn;




/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var slice = __webpack_require__(10);

	    /**
	     * Return a copy of the object, filtered to only have values for the whitelisted keys.
	     */
	    function pick(obj, var_keys){
	        var keys = typeof arguments[1] !== 'string'? arguments[1] : slice(arguments, 1),
	            out = {},
	            i = 0, key;
	        while (key = keys[i++]) {
	            out[key] = obj[key];
	        }
	        return out;
	    }

	    module.exports = pick;




/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isPrimitive = __webpack_require__(35);

	    /**
	     * get "nested" object property
	     */
	    function get(obj, prop){
	        var parts = prop.split('.'),
	            last = parts.pop();

	        while (prop = parts.shift()) {
	            obj = obj[prop];
	            if (obj == null) return;
	        }

	        return obj[last];
	    }

	    module.exports = get;




/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var namespace = __webpack_require__(37);

	    /**
	     * set "nested" object property
	     */
	    function set(obj, prop, val){
	        var parts = (/^(.+)\.(.+)$/).exec(prop);
	        if (parts){
	            namespace(obj, parts[1])[parts[2]] = val;
	        } else {
	            obj[prop] = val;
	        }
	    }

	    module.exports = set;




/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(38);
	var camelCase = __webpack_require__(39);
	var upperCase = __webpack_require__(20);
	    /**
	     * camelCase + UPPERCASE first char
	     */
	    function pascalCase(str){
	        str = toString(str);
	        return camelCase(str).replace(/^[a-z]/, upperCase);
	    }

	    module.exports = pascalCase;



/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(38);
	    /**
	     * "Safer" String.toUpperCase()
	     */
	    function upperCase(str){
	        str = toString(str);
	        return str.toUpperCase();
	    }
	    module.exports = upperCase;



/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   2.0.1
	 */

	(function() {
	    "use strict";

	    function $$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function $$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function $$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var $$utils$$_isArray;

	    if (!Array.isArray) {
	      $$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      $$utils$$_isArray = Array.isArray;
	    }

	    var $$utils$$isArray = $$utils$$_isArray;
	    var $$utils$$now = Date.now || function() { return new Date().getTime(); };
	    function $$utils$$F() { }

	    var $$utils$$o_create = (Object.create || function (o) {
	      if (arguments.length > 1) {
	        throw new Error('Second argument not supported');
	      }
	      if (typeof o !== 'object') {
	        throw new TypeError('Argument must be an object');
	      }
	      $$utils$$F.prototype = o;
	      return new $$utils$$F();
	    });

	    var $$asap$$len = 0;

	    var $$asap$$default = function asap(callback, arg) {
	      $$asap$$queue[$$asap$$len] = callback;
	      $$asap$$queue[$$asap$$len + 1] = arg;
	      $$asap$$len += 2;
	      if ($$asap$$len === 2) {
	        // If len is 1, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        $$asap$$scheduleFlush();
	      }
	    };

	    var $$asap$$browserGlobal = (typeof window !== 'undefined') ? window : {};
	    var $$asap$$BrowserMutationObserver = $$asap$$browserGlobal.MutationObserver || $$asap$$browserGlobal.WebKitMutationObserver;

	    // test for web worker but not in IE10
	    var $$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function $$asap$$useNextTick() {
	      return function() {
	        process.nextTick($$asap$$flush);
	      };
	    }

	    function $$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new $$asap$$BrowserMutationObserver($$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function $$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = $$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function $$asap$$useSetTimeout() {
	      return function() {
	        setTimeout($$asap$$flush, 1);
	      };
	    }

	    var $$asap$$queue = new Array(1000);

	    function $$asap$$flush() {
	      for (var i = 0; i < $$asap$$len; i+=2) {
	        var callback = $$asap$$queue[i];
	        var arg = $$asap$$queue[i+1];

	        callback(arg);

	        $$asap$$queue[i] = undefined;
	        $$asap$$queue[i+1] = undefined;
	      }

	      $$asap$$len = 0;
	    }

	    var $$asap$$scheduleFlush;

	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
	      $$asap$$scheduleFlush = $$asap$$useNextTick();
	    } else if ($$asap$$BrowserMutationObserver) {
	      $$asap$$scheduleFlush = $$asap$$useMutationObserver();
	    } else if ($$asap$$isWorker) {
	      $$asap$$scheduleFlush = $$asap$$useMessageChannel();
	    } else {
	      $$asap$$scheduleFlush = $$asap$$useSetTimeout();
	    }

	    function $$$internal$$noop() {}
	    var $$$internal$$PENDING   = void 0;
	    var $$$internal$$FULFILLED = 1;
	    var $$$internal$$REJECTED  = 2;
	    var $$$internal$$GET_THEN_ERROR = new $$$internal$$ErrorObject();

	    function $$$internal$$selfFullfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function $$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.')
	    }

	    function $$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        $$$internal$$GET_THEN_ERROR.error = error;
	        return $$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function $$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function $$$internal$$handleForeignThenable(promise, thenable, then) {
	       $$asap$$default(function(promise) {
	        var sealed = false;
	        var error = $$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            $$$internal$$resolve(promise, value);
	          } else {
	            $$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          $$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          $$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function $$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === $$$internal$$FULFILLED) {
	        $$$internal$$fulfill(promise, thenable._result);
	      } else if (promise._state === $$$internal$$REJECTED) {
	        $$$internal$$reject(promise, thenable._result);
	      } else {
	        $$$internal$$subscribe(thenable, undefined, function(value) {
	          $$$internal$$resolve(promise, value);
	        }, function(reason) {
	          $$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function $$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        $$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = $$$internal$$getThen(maybeThenable);

	        if (then === $$$internal$$GET_THEN_ERROR) {
	          $$$internal$$reject(promise, $$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          $$$internal$$fulfill(promise, maybeThenable);
	        } else if ($$utils$$isFunction(then)) {
	          $$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          $$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function $$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        $$$internal$$reject(promise, $$$internal$$selfFullfillment());
	      } else if ($$utils$$objectOrFunction(value)) {
	        $$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        $$$internal$$fulfill(promise, value);
	      }
	    }

	    function $$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      $$$internal$$publish(promise);
	    }

	    function $$$internal$$fulfill(promise, value) {
	      if (promise._state !== $$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = $$$internal$$FULFILLED;

	      if (promise._subscribers.length === 0) {
	      } else {
	        $$asap$$default($$$internal$$publish, promise);
	      }
	    }

	    function $$$internal$$reject(promise, reason) {
	      if (promise._state !== $$$internal$$PENDING) { return; }
	      promise._state = $$$internal$$REJECTED;
	      promise._result = reason;

	      $$asap$$default($$$internal$$publishRejection, promise);
	    }

	    function $$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + $$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + $$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        $$asap$$default($$$internal$$publish, parent);
	      }
	    }

	    function $$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          $$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function $$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var $$$internal$$TRY_CATCH_ERROR = new $$$internal$$ErrorObject();

	    function $$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        $$$internal$$TRY_CATCH_ERROR.error = e;
	        return $$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function $$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = $$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = $$$internal$$tryCatch(callback, detail);

	        if (value === $$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          $$$internal$$reject(promise, $$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== $$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        $$$internal$$resolve(promise, value);
	      } else if (failed) {
	        $$$internal$$reject(promise, error);
	      } else if (settled === $$$internal$$FULFILLED) {
	        $$$internal$$fulfill(promise, value);
	      } else if (settled === $$$internal$$REJECTED) {
	        $$$internal$$reject(promise, value);
	      }
	    }

	    function $$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          $$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          $$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        $$$internal$$reject(promise, e);
	      }
	    }

	    function $$$enumerator$$makeSettledResult(state, position, value) {
	      if (state === $$$internal$$FULFILLED) {
	        return {
	          state: 'fulfilled',
	          value: value
	        };
	      } else {
	        return {
	          state: 'rejected',
	          reason: value
	        };
	      }
	    }

	    function $$$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor($$$internal$$noop, label);
	      this._abortOnReject = abortOnReject;

	      if (this._validateInput(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;

	        this._init();

	        if (this.length === 0) {
	          $$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            $$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        $$$internal$$reject(this.promise, this._validationError());
	      }
	    }

	    $$$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return $$utils$$isArray(input);
	    };

	    $$$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    $$$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };

	    var $$$enumerator$$default = $$$enumerator$$Enumerator;

	    $$$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var promise = this.promise;
	      var input   = this._input;

	      for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };

	    $$$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      if ($$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== $$$internal$$PENDING) {
	          entry._onerror = null;
	          this._settledAt(entry._state, i, entry._result);
	        } else {
	          this._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        this._remaining--;
	        this._result[i] = this._makeResult($$$internal$$FULFILLED, i, entry);
	      }
	    };

	    $$$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;

	      if (promise._state === $$$internal$$PENDING) {
	        this._remaining--;

	        if (this._abortOnReject && state === $$$internal$$REJECTED) {
	          $$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = this._makeResult(state, i, value);
	        }
	      }

	      if (this._remaining === 0) {
	        $$$internal$$fulfill(promise, this._result);
	      }
	    };

	    $$$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
	      return value;
	    };

	    $$$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      $$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt($$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt($$$internal$$REJECTED, i, reason);
	      });
	    };

	    var $$promise$all$$default = function all(entries, label) {
	      return new $$$enumerator$$default(this, entries, true /* abort on reject */, label).promise;
	    };

	    var $$promise$race$$default = function race(entries, label) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor($$$internal$$noop, label);

	      if (!$$utils$$isArray(entries)) {
	        $$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        $$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        $$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
	        $$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    };

	    var $$promise$resolve$$default = function resolve(object, label) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor($$$internal$$noop, label);
	      $$$internal$$resolve(promise, object);
	      return promise;
	    };

	    var $$promise$reject$$default = function reject(reason, label) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor($$$internal$$noop, label);
	      $$$internal$$reject(promise, reason);
	      return promise;
	    };

	    var $$es6$promise$promise$$counter = 0;

	    function $$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function $$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var $$es6$promise$promise$$default = $$es6$promise$promise$$Promise;

	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise’s eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function $$es6$promise$promise$$Promise(resolver) {
	      this._id = $$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];

	      if ($$$internal$$noop !== resolver) {
	        if (!$$utils$$isFunction(resolver)) {
	          $$es6$promise$promise$$needsResolver();
	        }

	        if (!(this instanceof $$es6$promise$promise$$Promise)) {
	          $$es6$promise$promise$$needsNew();
	        }

	        $$$internal$$initializePromise(this, resolver);
	      }
	    }

	    $$es6$promise$promise$$Promise.all = $$promise$all$$default;
	    $$es6$promise$promise$$Promise.race = $$promise$race$$default;
	    $$es6$promise$promise$$Promise.resolve = $$promise$resolve$$default;
	    $$es6$promise$promise$$Promise.reject = $$promise$reject$$default;

	    $$es6$promise$promise$$Promise.prototype = {
	      constructor: $$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;

	        if (state === $$$internal$$FULFILLED && !onFulfillment || state === $$$internal$$REJECTED && !onRejection) {
	          return this;
	        }

	        var child = new this.constructor($$$internal$$noop);
	        var result = parent._result;

	        if (state) {
	          var callback = arguments[state - 1];
	          $$asap$$default(function(){
	            $$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          $$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }

	        return child;
	      },

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };

	    var $$es6$promise$polyfill$$default = function polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	        local = global;
	      } else if (typeof window !== 'undefined' && window.document) {
	        local = window;
	      } else {
	        local = self;
	      }

	      var es6PromiseSupport =
	        "Promise" in local &&
	        // Some of these methods are missing from
	        // Firefox/Chrome experimental implementations
	        "resolve" in local.Promise &&
	        "reject" in local.Promise &&
	        "all" in local.Promise &&
	        "race" in local.Promise &&
	        // Older version of the spec had a resolver object
	        // as the arg rather than a function
	        (function() {
	          var resolve;
	          new local.Promise(function(r) { resolve = r; });
	          return $$utils$$isFunction(resolve);
	        }());

	      if (!es6PromiseSupport) {
	        local.Promise = $$es6$promise$promise$$default;
	      }
	    };

	    var es6$promise$umd$$ES6Promise = {
	      'Promise': $$es6$promise$promise$$default,
	      'polyfill': $$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(51)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = es6$promise$umd$$ES6Promise;
	    }
	}).call(this);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50), (function() { return this; }()), __webpack_require__(52)(module)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * yabh
	 * @version 1.0.0 - Homepage <http://jmdobry.github.io/yabh/>
	 * @author Jason Dobry <jason.dobry@gmail.com>
	 * @copyright (c) 2015 Jason Dobry 
	 * @license MIT <https://github.com/jmdobry/yabh/blob/master/LICENSE>
	 * 
	 * @overview Yet another Binary Heap.
	 */
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define(factory);
		else if(typeof exports === 'object')
			exports["BinaryHeap"] = factory();
		else
			root["BinaryHeap"] = factory();
	})(this, function() {
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

		var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

		var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

		/**
		 * @method bubbleUp
		 * @param {array} heap The heap.
		 * @param {function} weightFunc The weight function.
		 * @param {number} n The index of the element to bubble up.
		 */
		function bubbleUp(heap, weightFunc, n) {
		  var element = heap[n];
		  var weight = weightFunc(element);
		  // When at 0, an element can not go up any further.
		  while (n > 0) {
		    // Compute the parent element's index, and fetch it.
		    var parentN = Math.floor((n + 1) / 2) - 1;
		    var _parent = heap[parentN];
		    // If the parent has a lesser weight, things are in order and we
		    // are done.
		    if (weight >= weightFunc(_parent)) {
		      break;
		    } else {
		      heap[parentN] = element;
		      heap[n] = _parent;
		      n = parentN;
		    }
		  }
		}

		/**
		 * @method bubbleDown
		 * @param {array} heap The heap.
		 * @param {function} weightFunc The weight function.
		 * @param {number} n The index of the element to sink down.
		 */
		var bubbleDown = function (heap, weightFunc, n) {
		  var length = heap.length;
		  var node = heap[n];
		  var nodeWeight = weightFunc(node);

		  while (true) {
		    var child2N = (n + 1) * 2,
		        child1N = child2N - 1;
		    var swap = null;
		    if (child1N < length) {
		      var child1 = heap[child1N],
		          child1Weight = weightFunc(child1);
		      // If the score is less than our node's, we need to swap.
		      if (child1Weight < nodeWeight) {
		        swap = child1N;
		      }
		    }
		    // Do the same checks for the other child.
		    if (child2N < length) {
		      var child2 = heap[child2N],
		          child2Weight = weightFunc(child2);
		      if (child2Weight < (swap === null ? nodeWeight : weightFunc(heap[child1N]))) {
		        swap = child2N;
		      }
		    }

		    if (swap === null) {
		      break;
		    } else {
		      heap[n] = heap[swap];
		      heap[swap] = node;
		      n = swap;
		    }
		  }
		};

		var BinaryHeap = (function () {
		  function BinaryHeap(weightFunc, compareFunc) {
		    _classCallCheck(this, BinaryHeap);

		    if (!weightFunc) {
		      weightFunc = function (x) {
		        return x;
		      };
		    }
		    if (!compareFunc) {
		      compareFunc = function (x, y) {
		        return x === y;
		      };
		    }
		    if (typeof weightFunc !== "function") {
		      throw new Error("BinaryHeap([weightFunc][, compareFunc]): \"weightFunc\" must be a function!");
		    }
		    if (typeof compareFunc !== "function") {
		      throw new Error("BinaryHeap([weightFunc][, compareFunc]): \"compareFunc\" must be a function!");
		    }
		    this.weightFunc = weightFunc;
		    this.compareFunc = compareFunc;
		    this.heap = [];
		  }

		  _createClass(BinaryHeap, {
		    push: {
		      value: function push(node) {
		        this.heap.push(node);
		        bubbleUp(this.heap, this.weightFunc, this.heap.length - 1);
		      }
		    },
		    peek: {
		      value: function peek() {
		        return this.heap[0];
		      }
		    },
		    pop: {
		      value: function pop() {
		        var front = this.heap[0];
		        var end = this.heap.pop();
		        if (this.heap.length > 0) {
		          this.heap[0] = end;
		          bubbleDown(this.heap, this.weightFunc, 0);
		        }
		        return front;
		      }
		    },
		    remove: {
		      value: function remove(node) {
		        var length = this.heap.length;
		        for (var i = 0; i < length; i++) {
		          if (this.compareFunc(this.heap[i], node)) {
		            var removed = this.heap[i];
		            var end = this.heap.pop();
		            if (i !== length - 1) {
		              this.heap[i] = end;
		              bubbleUp(this.heap, this.weightFunc, i);
		              bubbleDown(this.heap, this.weightFunc, i);
		            }
		            return removed;
		          }
		        }
		        return null;
		      }
		    },
		    removeAll: {
		      value: function removeAll() {
		        this.heap = [];
		      }
		    },
		    size: {
		      value: function size() {
		        return this.heap.length;
		      }
		    }
		  });

		  return BinaryHeap;
		})();

		module.exports = BinaryHeap;

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	module.exports = defineResource;
	/*jshint evil:true, loopfunc:true*/

	var DSUtils = _interopRequire(__webpack_require__(1));

	var DSErrors = _interopRequire(__webpack_require__(2));

	var Resource = function Resource(options) {
	  _classCallCheck(this, Resource);

	  DSUtils.deepMixIn(this, options);
	  if ("endpoint" in options) {
	    this.endpoint = options.endpoint;
	  } else {
	    this.endpoint = this.name;
	  }
	};

	var instanceMethods = ["compute", "refresh", "save", "update", "destroy", "loadRelations", "changeHistory", "changes", "hasChanges", "lastModified", "lastSaved", "link", "linkInverse", "previous", "unlinkInverse"];

	function defineResource(definition) {
	  var _this = this;
	  var definitions = _this.defs;

	  if (DSUtils._s(definition)) {
	    definition = {
	      name: definition.replace(/\s/gi, "")
	    };
	  }
	  if (!DSUtils._o(definition)) {
	    throw DSUtils._oErr("definition");
	  } else if (!DSUtils._s(definition.name)) {
	    throw new DSErrors.IA("\"name\" must be a string!");
	  } else if (_this.s[definition.name]) {
	    throw new DSErrors.R("" + definition.name + " is already registered!");
	  }

	  try {
	    var def;

	    var _class;

	    var _ret = (function () {
	      // Inherit from global defaults
	      Resource.prototype = _this.defaults;
	      definitions[definition.name] = new Resource(definition);

	      def = definitions[definition.name];

	      // alias name, shaves 0.08 kb off the minified build
	      def.n = def.name;


	      if (!DSUtils._s(def.idAttribute)) {
	        throw new DSErrors.IA("\"idAttribute\" must be a string!");
	      }

	      // Setup nested parent configuration
	      if (def.relations) {
	        def.relationList = [];
	        def.relationFields = [];
	        DSUtils.forOwn(def.relations, function (relatedModels, type) {
	          DSUtils.forOwn(relatedModels, function (defs, relationName) {
	            if (!DSUtils._a(defs)) {
	              relatedModels[relationName] = [defs];
	            }
	            DSUtils.forEach(relatedModels[relationName], function (d) {
	              d.type = type;
	              d.relation = relationName;
	              d.name = def.n;
	              def.relationList.push(d);
	              if (d.localField) {
	                def.relationFields.push(d.localField);
	              }
	            });
	          });
	        });
	        if (def.relations.belongsTo) {
	          DSUtils.forOwn(def.relations.belongsTo, function (relatedModel, modelName) {
	            DSUtils.forEach(relatedModel, function (relation) {
	              if (relation.parent) {
	                def.parent = modelName;
	                def.parentKey = relation.localKey;
	                def.parentField = relation.localField;
	              }
	            });
	          });
	        }
	        if (typeof Object.freeze === "function") {
	          Object.freeze(def.relations);
	          Object.freeze(def.relationList);
	        }
	      }

	      def.getResource = function (resourceName) {
	        return _this.defs[resourceName];
	      };

	      def.getEndpoint = function (id, options) {
	        options.params = options.params || {};

	        var item = undefined;
	        var parentKey = def.parentKey;
	        var endpoint = options.hasOwnProperty("endpoint") ? options.endpoint : def.endpoint;
	        var parentField = def.parentField;
	        var parentDef = definitions[def.parent];
	        var parentId = options.params[parentKey];

	        if (parentId === false || !parentKey || !parentDef) {
	          if (parentId === false) {
	            delete options.params[parentKey];
	          }
	          return endpoint;
	        } else {
	          delete options.params[parentKey];

	          if (DSUtils._sn(id)) {
	            item = def.get(id);
	          } else if (DSUtils._o(id)) {
	            item = id;
	          }

	          if (item) {
	            parentId = parentId || item[parentKey] || (item[parentField] ? item[parentField][parentDef.idAttribute] : null);
	          }

	          if (parentId) {
	            var _ret2 = (function () {
	              delete options.endpoint;
	              var _options = {};
	              DSUtils.forOwn(options, function (value, key) {
	                _options[key] = value;
	              });
	              return {
	                v: DSUtils.makePath(parentDef.getEndpoint(parentId, DSUtils._(parentDef, _options)), parentId, endpoint)
	              };
	            })();

	            if (typeof _ret2 === "object") return _ret2.v;
	          } else {
	            return endpoint;
	          }
	        }
	      };

	      // Remove this in v0.11.0 and make a breaking change notice
	      // the the `filter` option has been renamed to `defaultFilter`
	      if (def.filter) {
	        def.defaultFilter = def.filter;
	        delete def.filter;
	      }

	      // Create the wrapper class for the new resource
	      _class = def["class"] = DSUtils.pascalCase(def.name);

	      try {
	        if (typeof def.useClass === "function") {
	          eval("function " + _class + "() { def.useClass.call(this); }");
	          def[_class] = eval(_class);
	          def[_class].prototype = (function (proto) {
	            function Ctor() {}

	            Ctor.prototype = proto;
	            return new Ctor();
	          })(def.useClass.prototype);
	        } else {
	          eval("function " + _class + "() {}");
	          def[_class] = eval(_class);
	        }
	      } catch (e) {
	        def[_class] = function () {};
	      }

	      // Apply developer-defined methods
	      if (def.methods) {
	        DSUtils.deepMixIn(def[_class].prototype, def.methods);
	      }

	      def[_class].prototype.set = function (key, value) {
	        DSUtils.set(this, key, value);
	        _this.compute(def.n, this);
	        return this;
	      };

	      def[_class].prototype.get = function (key) {
	        return DSUtils.get(this, key);
	      };

	      // Prepare for computed properties
	      if (def.computed) {
	        DSUtils.forOwn(def.computed, function (fn, field) {
	          if (DSUtils.isFunction(fn)) {
	            def.computed[field] = [fn];
	            fn = def.computed[field];
	          }
	          if (def.methods && field in def.methods) {
	            def.errorFn("Computed property \"" + field + "\" conflicts with previously defined prototype method!");
	          }
	          var deps;
	          if (fn.length === 1) {
	            var match = fn[0].toString().match(/function.*?\(([\s\S]*?)\)/);
	            deps = match[1].split(",");
	            def.computed[field] = deps.concat(fn);
	            fn = def.computed[field];
	            if (deps.length) {
	              def.errorFn("Use the computed property array syntax for compatibility with minified code!");
	            }
	          }
	          deps = fn.slice(0, fn.length - 1);
	          DSUtils.forEach(deps, function (val, index) {
	            deps[index] = val.trim();
	          });
	          fn.deps = DSUtils.filter(deps, function (dep) {
	            return !!dep;
	          });
	        });
	      }

	      if (definition.schema && _this.schemator) {
	        def.schema = _this.schemator.defineSchema(def.n, definition.schema);

	        if (!definition.hasOwnProperty("validate")) {
	          def.validate = function (resourceName, attrs, cb) {
	            def.schema.validate(attrs, {
	              ignoreMissing: def.ignoreMissing
	            }, function (err) {
	              if (err) {
	                return cb(err);
	              } else {
	                return cb(null, attrs);
	              }
	            });
	          };
	        }
	      }

	      DSUtils.forEach(instanceMethods, function (name) {
	        def[_class].prototype["DS" + DSUtils.pascalCase(name)] = function () {
	          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }

	          args.unshift(this[def.idAttribute] || this);
	          args.unshift(def.n);
	          return _this[name].apply(_this, args);
	        };
	      });

	      def[_class].prototype.DSCreate = function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        args.unshift(this);
	        args.unshift(def.n);
	        return _this.create.apply(_this, args);
	      };

	      // Initialize store data for the new resource
	      _this.s[def.n] = {
	        collection: [],
	        expiresHeap: new DSUtils.BinaryHeap(function (x) {
	          return x.expires;
	        }, function (x, y) {
	          return x.item === y;
	        }),
	        completedQueries: {},
	        queryData: {},
	        pendingQueries: {},
	        index: {},
	        modified: {},
	        saved: {},
	        previousAttributes: {},
	        observers: {},
	        changeHistories: {},
	        changeHistory: [],
	        collectionModified: 0
	      };

	      if (def.reapInterval) {
	        setInterval(function () {
	          return _this.reap(def.n, { isInterval: true });
	        }, def.reapInterval);
	      }

	      // Proxy DS methods with shorthand ones
	      var fns = ["registerAdapter", "getAdapter", "is"];
	      for (key in _this) {
	        if (typeof _this[key] === "function") {
	          fns.push(key);
	        }
	      }

	      DSUtils.forEach(fns, function (key) {
	        var k = key;
	        if (_this[k].shorthand !== false) {
	          def[k] = function () {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	              args[_key] = arguments[_key];
	            }

	            args.unshift(def.n);
	            return _this[k].apply(_this, args);
	          };
	        } else {
	          def[k] = function () {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	              args[_key] = arguments[_key];
	            }

	            return _this[k].apply(_this, args);
	          };
	        }
	      });

	      def.beforeValidate = DSUtils.promisify(def.beforeValidate);
	      def.validate = DSUtils.promisify(def.validate);
	      def.afterValidate = DSUtils.promisify(def.afterValidate);
	      def.beforeCreate = DSUtils.promisify(def.beforeCreate);
	      def.afterCreate = DSUtils.promisify(def.afterCreate);
	      def.beforeUpdate = DSUtils.promisify(def.beforeUpdate);
	      def.afterUpdate = DSUtils.promisify(def.afterUpdate);
	      def.beforeDestroy = DSUtils.promisify(def.beforeDestroy);
	      def.afterDestroy = DSUtils.promisify(def.afterDestroy);

	      var defaultAdapter = undefined;
	      if (def.hasOwnProperty("defaultAdapter")) {
	        defaultAdapter = def.defaultAdapter;
	      }
	      DSUtils.forOwn(def.actions, function (action, name) {
	        if (def[name] && !def.actions[name]) {
	          throw new Error("Cannot override existing method \"" + name + "\"!");
	        }
	        def[name] = function (id, options) {
	          if (DSUtils._o(id)) {
	            options = id;
	          }
	          options = options || {};
	          var adapter = _this.getAdapter(action.adapter || defaultAdapter || "http");
	          var config = DSUtils.deepMixIn({}, action);
	          if (!options.hasOwnProperty("endpoint") && config.endpoint) {
	            options.endpoint = config.endpoint;
	          }
	          if (typeof options.getEndpoint === "function") {
	            config.url = options.getEndpoint(def, options);
	          } else {
	            var args = [options.basePath || adapter.defaults.basePath || def.basePath, def.getEndpoint(DSUtils._sn(id) ? id : null, options)];
	            if (DSUtils._sn(id)) {
	              args.push(id);
	            }
	            args.push(action.pathname || name);
	            config.url = DSUtils.makePath.apply(null, args);
	          }
	          config.method = config.method || "GET";
	          DSUtils.deepMixIn(config, options);
	          return adapter.HTTP(config);
	        };
	      });

	      // Mix-in events
	      DSUtils.Events(def);


	      return {
	        v: def
	      };
	    })();

	    if (typeof _ret === "object") return _ret.v;
	  } catch (err) {
	    delete definitions[definition.name];
	    delete _this.s[definition.name];
	    throw err;
	  }
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = eject;

	function eject(resourceName, id, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.defs[resourceName];
	  var resource = _this.s[resourceName];
	  var item = undefined;
	  var found = false;

	  id = DSUtils.resolveId(definition, id);

	  if (!definition) {
	    throw new _this.errors.NER(resourceName);
	  } else if (!DSUtils._sn(id)) {
	    throw DSUtils._snErr("id");
	  }

	  options = DSUtils._(definition, options);


	  for (var i = 0; i < resource.collection.length; i++) {
	    if (resource.collection[i][definition.idAttribute] == id) {
	      // jshint ignore:line
	      item = resource.collection[i];
	      resource.expiresHeap.remove(item);
	      found = true;
	      break;
	    }
	  }
	  if (found) {
	    var _ret = (function () {
	      if (options.notify) {
	        definition.beforeEject(options, item);
	        definition.emit("DS.beforeEject", definition, item);
	      }
	      _this.unlinkInverse(definition.n, id);
	      resource.collection.splice(i, 1);
	      if (DSUtils.w) {
	        resource.observers[id].close();
	      }
	      delete resource.observers[id];

	      delete resource.index[id];
	      delete resource.previousAttributes[id];
	      delete resource.completedQueries[id];
	      delete resource.pendingQueries[id];
	      DSUtils.forEach(resource.changeHistories[id], function (changeRecord) {
	        DSUtils.remove(resource.changeHistory, changeRecord);
	      });
	      var toRemove = [];
	      DSUtils.forOwn(resource.queryData, function (items, queryHash) {
	        if (items.$$injected) {
	          DSUtils.remove(items, item);
	        }
	        if (!items.length) {
	          toRemove.push(queryHash);
	        }
	      });
	      DSUtils.forEach(toRemove, function (queryHash) {
	        delete resource.completedQueries[queryHash];
	        delete resource.queryData[queryHash];
	      });
	      delete resource.changeHistories[id];
	      delete resource.modified[id];
	      delete resource.saved[id];
	      resource.collectionModified = DSUtils.updateTimestamp(resource.collectionModified);

	      if (options.notify) {
	        definition.afterEject(options, item);
	        definition.emit("DS.afterEject", definition, item);
	      }

	      return {
	        v: item
	      };
	    })();

	    if (typeof _ret === "object") {
	      return _ret.v;
	    }
	  }
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = ejectAll;

	function ejectAll(resourceName, params, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.defs[resourceName];
	  params = params || {};

	  if (!definition) {
	    throw new _this.errors.NER(resourceName);
	  } else if (!DSUtils._o(params)) {
	    throw DSUtils._oErr("params");
	  }


	  var resource = _this.s[resourceName];
	  var queryHash = DSUtils.toJson(params);
	  var items = _this.filter(definition.n, params);
	  var ids = [];
	  if (DSUtils.isEmpty(params)) {
	    resource.completedQueries = {};
	  } else {
	    delete resource.completedQueries[queryHash];
	  }
	  DSUtils.forEach(items, function (item) {
	    if (item && item[definition.idAttribute]) {
	      ids.push(item[definition.idAttribute]);
	    }
	  });
	  DSUtils.forEach(ids, function (id) {
	    _this.eject(definition.n, id, options);
	  });
	  resource.collectionModified = DSUtils.updateTimestamp(resource.collectionModified);
	  return items;
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = filter;

	function filter(resourceName, params, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.defs[resourceName];
	  var resource = _this.s[resourceName];

	  if (!definition) {
	    throw new _this.errors.NER(resourceName);
	  } else if (params && !DSUtils._o(params)) {
	    throw DSUtils._oErr("params");
	  }

	  // Protect against null
	  params = params || {};

	  options = DSUtils._(definition, options);


	  var queryHash = DSUtils.toJson(params);

	  if (!(queryHash in resource.completedQueries) && options.loadFromServer) {
	    // This particular query has never been completed

	    if (!resource.pendingQueries[queryHash]) {
	      // This particular query has never even been started
	      _this.findAll(resourceName, params, options);
	    }
	  }

	  return definition.defaultFilter.call(_this, resource.collection, resourceName, params, options);
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	module.exports = inject;

	var DSUtils = _interopRequire(__webpack_require__(1));

	var DSErrors = _interopRequire(__webpack_require__(2));

	function _getReactFunction(DS, definition, resource) {
	  var name = definition.n;
	  return function _react(added, removed, changed, oldValueFn, firstTime) {
	    var target = this;
	    var item = undefined;
	    var innerId = oldValueFn && oldValueFn(definition.idAttribute) ? oldValueFn(definition.idAttribute) : target[definition.idAttribute];

	    DSUtils.forEach(definition.relationFields, function (field) {
	      delete added[field];
	      delete removed[field];
	      delete changed[field];
	    });

	    if (!DSUtils.isEmpty(added) || !DSUtils.isEmpty(removed) || !DSUtils.isEmpty(changed) || firstTime) {
	      item = DS.get(name, innerId);
	      resource.modified[innerId] = DSUtils.updateTimestamp(resource.modified[innerId]);
	      resource.collectionModified = DSUtils.updateTimestamp(resource.collectionModified);
	      if (definition.keepChangeHistory) {
	        var changeRecord = {
	          resourceName: name,
	          target: item,
	          added: added,
	          removed: removed,
	          changed: changed,
	          timestamp: resource.modified[innerId]
	        };
	        resource.changeHistories[innerId].push(changeRecord);
	        resource.changeHistory.push(changeRecord);
	      }
	    }

	    if (definition.computed) {
	      item = item || DS.get(name, innerId);
	      DSUtils.forOwn(definition.computed, function (fn, field) {
	        var compute = false;
	        // check if required fields changed
	        DSUtils.forEach(fn.deps, function (dep) {
	          if (dep in added || dep in removed || dep in changed || !(field in item)) {
	            compute = true;
	          }
	        });
	        compute = compute || !fn.deps.length;
	        if (compute) {
	          DSUtils.compute.call(item, fn, field);
	        }
	      });
	    }

	    if (definition.relations) {
	      item = item || DS.get(name, innerId);
	      DSUtils.forEach(definition.relationList, function (def) {
	        if (item[def.localField] && (def.localKey in added || def.localKey in removed || def.localKey in changed)) {
	          DS.link(name, item[definition.idAttribute], [def.relation]);
	        }
	      });
	    }

	    if (definition.idAttribute in changed) {
	      definition.errorFn("Doh! You just changed the primary key of an object! Your data for the \"" + name + "\" resource is now in an undefined (probably broken) state.");
	    }
	  };
	}

	function _inject(definition, resource, attrs, options) {
	  var _this = this;
	  var _react = _getReactFunction(_this, definition, resource, attrs, options);

	  var injected = undefined;
	  if (DSUtils._a(attrs)) {
	    injected = [];
	    for (var i = 0; i < attrs.length; i++) {
	      injected.push(_inject.call(_this, definition, resource, attrs[i], options));
	    }
	  } else {
	    // check if "idAttribute" is a computed property
	    var c = definition.computed;
	    var idA = definition.idAttribute;
	    if (c && c[idA]) {
	      (function () {
	        var args = [];
	        DSUtils.forEach(c[idA].deps, function (dep) {
	          args.push(attrs[dep]);
	        });
	        attrs[idA] = c[idA][c[idA].length - 1].apply(attrs, args);
	      })();
	    }
	    if (!(idA in attrs)) {
	      var error = new DSErrors.R("" + definition.n + ".inject: \"attrs\" must contain the property specified by \"idAttribute\"!");
	      options.errorFn(error);
	      throw error;
	    } else {
	      try {
	        DSUtils.forEach(definition.relationList, function (def) {
	          var relationName = def.relation;
	          var relationDef = _this.defs[relationName];
	          var toInject = attrs[def.localField];
	          if (toInject) {
	            if (!relationDef) {
	              throw new DSErrors.R("" + definition.n + " relation is defined but the resource is not!");
	            }
	            if (DSUtils._a(toInject)) {
	              (function () {
	                var items = [];
	                DSUtils.forEach(toInject, function (toInjectItem) {
	                  if (toInjectItem !== _this.s[relationName].index[toInjectItem[relationDef.idAttribute]]) {
	                    try {
	                      var injectedItem = _this.inject(relationName, toInjectItem, options.orig());
	                      if (def.foreignKey) {
	                        injectedItem[def.foreignKey] = attrs[definition.idAttribute];
	                      }
	                      items.push(injectedItem);
	                    } catch (err) {
	                      options.errorFn(err, "Failed to inject " + def.type + " relation: \"" + relationName + "\"!");
	                    }
	                  }
	                });
	                attrs[def.localField] = items;
	              })();
	            } else {
	              if (toInject !== _this.s[relationName].index[toInject[relationDef.idAttribute]]) {
	                try {
	                  attrs[def.localField] = _this.inject(relationName, attrs[def.localField], options.orig());
	                  if (def.foreignKey) {
	                    attrs[def.localField][def.foreignKey] = attrs[definition.idAttribute];
	                  }
	                } catch (err) {
	                  options.errorFn(err, "Failed to inject " + def.type + " relation: \"" + relationName + "\"!");
	                }
	              }
	            }
	          }
	        });

	        var id = attrs[idA];
	        var item = _this.get(definition.n, id);
	        var initialLastModified = item ? resource.modified[id] : 0;

	        if (!item) {
	          if (options.useClass) {
	            if (attrs instanceof definition[definition["class"]]) {
	              item = attrs;
	            } else {
	              item = new definition[definition["class"]]();
	            }
	          } else {
	            item = {};
	          }
	          DSUtils.deepMixIn(item, attrs);

	          resource.collection.push(item);
	          resource.changeHistories[id] = [];

	          if (DSUtils.w) {
	            resource.observers[id] = new _this.observe.ObjectObserver(item);
	            resource.observers[id].open(_react, item);
	          }

	          resource.index[id] = item;
	          _react.call(item, {}, {}, {}, null, true);
	          resource.previousAttributes[id] = DSUtils.copy(item, null, null, null, definition.relationFields);
	        } else {
	          DSUtils.deepMixIn(item, attrs);
	          if (definition.resetHistoryOnInject) {
	            resource.previousAttributes[id] = DSUtils.copy(item, null, null, null, definition.relationFields);
	            if (resource.changeHistories[id].length) {
	              DSUtils.forEach(resource.changeHistories[id], function (changeRecord) {
	                DSUtils.remove(resource.changeHistory, changeRecord);
	              });
	              resource.changeHistories[id].splice(0, resource.changeHistories[id].length);
	            }
	          }
	          if (DSUtils.w) {
	            resource.observers[id].deliver();
	          }
	        }
	        resource.modified[id] = initialLastModified && resource.modified[id] === initialLastModified ? DSUtils.updateTimestamp(resource.modified[id]) : resource.modified[id];
	        resource.expiresHeap.remove(item);
	        var timestamp = new Date().getTime();
	        resource.expiresHeap.push({
	          item: item,
	          timestamp: timestamp,
	          expires: definition.maxAge ? timestamp + definition.maxAge : Number.MAX_VALUE
	        });
	        injected = item;
	      } catch (err) {
	        options.errorFn(err, attrs);
	      }
	    }
	  }
	  return injected;
	}

	function _link(definition, injected, options) {
	  var _this = this;

	  DSUtils.forEach(definition.relationList, function (def) {
	    if (options.findBelongsTo && def.type === "belongsTo" && injected[definition.idAttribute]) {
	      _this.link(definition.n, injected[definition.idAttribute], [def.relation]);
	    } else if (options.findHasMany && def.type === "hasMany" || options.findHasOne && def.type === "hasOne") {
	      _this.link(definition.n, injected[definition.idAttribute], [def.relation]);
	    }
	  });
	}

	function inject(resourceName, attrs, options) {
	  var _this = this;
	  var definition = _this.defs[resourceName];
	  var resource = _this.s[resourceName];
	  var injected = undefined;

	  if (!definition) {
	    throw new DSErrors.NER(resourceName);
	  } else if (!DSUtils._o(attrs) && !DSUtils._a(attrs)) {
	    throw new DSErrors.IA("" + resourceName + ".inject: \"attrs\" must be an object or an array!");
	  }

	  var name = definition.n;
	  options = DSUtils._(definition, options);

	  if (options.notify) {
	    options.beforeInject(options, attrs);
	    definition.emit("DS.beforeInject", definition, attrs);
	  }

	  injected = _inject.call(_this, definition, resource, attrs, options);
	  resource.collectionModified = DSUtils.updateTimestamp(resource.collectionModified);

	  if (options.findInverseLinks) {
	    if (DSUtils._a(injected)) {
	      if (injected.length) {
	        _this.linkInverse(name, injected[0][definition.idAttribute]);
	      }
	    } else {
	      _this.linkInverse(name, injected[definition.idAttribute]);
	    }
	  }

	  if (DSUtils._a(injected)) {
	    DSUtils.forEach(injected, function (injectedI) {
	      _link.call(_this, definition, injectedI, options);
	    });
	  } else {
	    _link.call(_this, definition, injected, options);
	  }

	  if (options.notify) {
	    options.afterInject(options, injected);
	    definition.emit("DS.afterInject", definition, injected);
	  }

	  return injected;
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = link;

	function link(resourceName, id, relations) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.defs[resourceName];

	  relations = relations || [];

	  id = DSUtils.resolveId(definition, id);
	  if (!definition) {
	    throw new _this.errors.NER(resourceName);
	  } else if (!DSUtils._sn(id)) {
	    throw DSUtils._snErr("id");
	  } else if (!DSUtils._a(relations)) {
	    throw DSUtils._aErr("relations");
	  }


	  var linked = _this.get(resourceName, id);

	  if (linked) {
	    DSUtils.forEach(definition.relationList, function (def) {
	      var relationName = def.relation;
	      if (relations.length && !DSUtils.contains(relations, relationName) || !def.localField) {
	        return;
	      }
	      var params = {};
	      if (def.type === "belongsTo") {
	        var _parent = linked[def.localKey] ? _this.get(relationName, linked[def.localKey]) : null;
	        if (_parent) {
	          linked[def.localField] = _parent;
	        }
	      } else if (def.type === "hasMany") {
	        params[def.foreignKey] = linked[definition.idAttribute];
	        linked[def.localField] = _this.defaults.constructor.prototype.defaultFilter.call(_this, _this.s[relationName].collection, relationName, params, { allowSimpleWhere: true });
	      } else if (def.type === "hasOne") {
	        params[def.foreignKey] = linked[definition.idAttribute];
	        var children = _this.defaults.constructor.prototype.defaultFilter.call(_this, _this.s[relationName].collection, relationName, params, { allowSimpleWhere: true });
	        if (children.length) {
	          linked[def.localField] = children[0];
	        }
	      }
	    });
	  }

	  return linked;
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = linkAll;

	function linkAll(resourceName, params, relations) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.defs[resourceName];

	  relations = relations || [];

	  if (!definition) {
	    throw new _this.errors.NER(resourceName);
	  } else if (!DSUtils._a(relations)) {
	    throw DSUtils._aErr("relations");
	  }


	  var linked = _this.filter(resourceName, params);

	  if (linked) {
	    DSUtils.forEach(definition.relationList, function (def) {
	      var relationName = def.relation;
	      if (relations.length && !DSUtils.contains(relations, relationName) || !def.localField) {
	        return;
	      }
	      if (def.type === "belongsTo") {
	        DSUtils.forEach(linked, function (injectedItem) {
	          var parent = injectedItem[def.localKey] ? _this.get(relationName, injectedItem[def.localKey]) : null;
	          if (parent) {
	            injectedItem[def.localField] = parent;
	          }
	        });
	      } else if (def.type === "hasMany") {
	        DSUtils.forEach(linked, function (injectedItem) {
	          var params = {};
	          params[def.foreignKey] = injectedItem[definition.idAttribute];
	          injectedItem[def.localField] = _this.defaults.constructor.prototype.defaultFilter.call(_this, _this.s[relationName].collection, relationName, params, { allowSimpleWhere: true });
	        });
	      } else if (def.type === "hasOne") {
	        DSUtils.forEach(linked, function (injectedItem) {
	          var params = {};
	          params[def.foreignKey] = injectedItem[definition.idAttribute];
	          var children = _this.defaults.constructor.prototype.defaultFilter.call(_this, _this.s[relationName].collection, relationName, params, { allowSimpleWhere: true });
	          if (children.length) {
	            injectedItem[def.localField] = children[0];
	          }
	        });
	      }
	    });
	  }

	  return linked;
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = linkInverse;

	function linkInverse(resourceName, id, relations) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.defs[resourceName];

	  relations = relations || [];

	  id = DSUtils.resolveId(definition, id);
	  if (!definition) {
	    throw new _this.errors.NER(resourceName);
	  } else if (!DSUtils._sn(id)) {
	    throw DSUtils._snErr("id");
	  } else if (!DSUtils._a(relations)) {
	    throw DSUtils._aErr("relations");
	  }


	  var linked = _this.get(resourceName, id);

	  if (linked) {
	    DSUtils.forOwn(_this.defs, function (d) {
	      DSUtils.forOwn(d.relations, function (relatedModels) {
	        DSUtils.forOwn(relatedModels, function (defs, relationName) {
	          if (relations.length && !DSUtils.contains(relations, d.n)) {
	            return;
	          }
	          if (definition.n === relationName) {
	            _this.linkAll(d.n, {}, [definition.n]);
	          }
	        });
	      });
	    });
	  }

	  return linked;
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = unlinkInverse;

	function unlinkInverse(resourceName, id, relations) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.defs[resourceName];

	  relations = relations || [];

	  id = DSUtils.resolveId(definition, id);
	  if (!definition) {
	    throw new _this.errors.NER(resourceName);
	  } else if (!DSUtils._sn(id)) {
	    throw DSUtils._snErr("id");
	  } else if (!DSUtils._a(relations)) {
	    throw DSUtils._aErr("relations");
	  }


	  var linked = _this.get(resourceName, id);

	  if (linked) {
	    DSUtils.forOwn(_this.defs, function (d) {
	      DSUtils.forOwn(d.relations, function (relatedModels) {
	        DSUtils.forOwn(relatedModels, function (defs, relationName) {
	          if (definition.n === relationName) {
	            DSUtils.forEach(defs, function (def) {
	              DSUtils.forEach(_this.s[def.name].collection, function (item) {
	                if (def.type === "hasMany" && item[def.localField]) {
	                  (function () {
	                    var index = undefined;
	                    DSUtils.forEach(item[def.localField], function (subItem, i) {
	                      if (subItem === linked) {
	                        index = i;
	                      }
	                    });
	                    if (index !== undefined) {
	                      item[def.localField].splice(index, 1);
	                    }
	                  })();
	                } else if (item[def.localField] === linked) {
	                  delete item[def.localField];
	                }
	              });
	            });
	          }
	        });
	      });
	    });
	  }

	  return linked;
	}

/***/ },
/* 32 */
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Safer Object.hasOwnProperty
	     */
	     function hasOwn(obj, prop){
	         return Object.prototype.hasOwnProperty.call(obj, prop);
	     }

	     module.exports = hasOwn;




/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(33);

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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Checks if the object is a primitive
	     */
	    function isPrimitive(value) {
	        // Using switch fallthrough because it's simple to read and is
	        // generally fast: http://jsperf.com/testing-value-is-primitive/5
	        switch (typeof value) {
	            case "string":
	            case "number":
	            case "boolean":
	                return true;
	        }

	        return value == null;
	    }

	    module.exports = isPrimitive;




/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Checks if the value is created by the `Object` constructor.
	     */
	    function isPlainObject(value) {
	        return (!!value && typeof value === 'object' &&
	            value.constructor === Object);
	    }

	    module.exports = isPlainObject;




/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var forEach = __webpack_require__(9);

	    /**
	     * Create nested object if non-existent
	     */
	    function namespace(obj, path){
	        if (!path) return obj;
	        forEach(path.split('.'), function(key){
	            if (!obj[key]) {
	                obj[key] = {};
	            }
	            obj = obj[key];
	        });
	        return obj;
	    }

	    module.exports = namespace;




/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Typecast a value to a String, using an empty string value for null or
	     * undefined.
	     */
	    function toString(val){
	        return val == null ? '' : val.toString();
	    }

	    module.exports = toString;




/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(38);
	var replaceAccents = __webpack_require__(53);
	var removeNonWord = __webpack_require__(54);
	var upperCase = __webpack_require__(20);
	var lowerCase = __webpack_require__(55);
	    /**
	    * Convert string to camelCase text.
	    */
	    function camelCase(str){
	        str = toString(str);
	        str = replaceAccents(str);
	        str = removeNonWord(str)
	            .replace(/[\-_]/g, ' ') //convert all hyphens and underscores to spaces
	            .replace(/\s[a-z]/g, upperCase) //convert first char of each word to UPPERCASE
	            .replace(/\s+/g, '') //remove spaces
	            .replace(/^[A-Z]/g, lowerCase); //convert first char to lowercase
	        return str;
	    }
	    module.exports = camelCase;



/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = create;

	function create(resourceName, attrs, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.defs[resourceName];

	  options = options || {};
	  attrs = attrs || {};

	  var rejectionError = undefined;
	  if (!definition) {
	    rejectionError = new _this.errors.NER(resourceName);
	  } else if (!DSUtils._o(attrs)) {
	    rejectionError = DSUtils._oErr("attrs");
	  } else {
	    options = DSUtils._(definition, options);
	    if (options.upsert && DSUtils._sn(attrs[definition.idAttribute])) {
	      return _this.update(resourceName, attrs[definition.idAttribute], attrs, options);
	    }
	  }

	  return new DSUtils.Promise(function (resolve, reject) {
	    if (rejectionError) {
	      reject(rejectionError);
	    } else {
	      resolve(attrs);
	    }
	  }).then(function (attrs) {
	    return options.beforeValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.validate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.afterValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.beforeCreate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit("DS.beforeCreate", definition, attrs);
	    }
	    return _this.getAdapter(options).create(definition, attrs, options);
	  }).then(function (attrs) {
	    return options.afterCreate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit("DS.afterCreate", definition, attrs);
	    }
	    if (options.cacheResponse) {
	      var created = _this.inject(definition.n, attrs, options.orig());
	      var id = created[definition.idAttribute];
	      var resource = _this.s[resourceName];
	      resource.completedQueries[id] = new Date().getTime();
	      resource.saved[id] = DSUtils.updateTimestamp(resource.saved[id]);
	      return created;
	    } else {
	      return _this.createInstance(resourceName, attrs, options);
	    }
	  });
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = destroy;

	function destroy(resourceName, id, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.defs[resourceName];
	  var item = undefined;

	  return new DSUtils.Promise(function (resolve, reject) {
	    id = DSUtils.resolveId(definition, id);
	    if (!definition) {
	      reject(new _this.errors.NER(resourceName));
	    } else if (!DSUtils._sn(id)) {
	      reject(DSUtils._snErr("id"));
	    } else {
	      item = _this.get(resourceName, id) || { id: id };
	      options = DSUtils._(definition, options);
	      resolve(item);
	    }
	  }).then(function (attrs) {
	    return options.beforeDestroy.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit("DS.beforeDestroy", definition, attrs);
	    }
	    if (options.eagerEject) {
	      _this.eject(resourceName, id);
	    }
	    return _this.getAdapter(options).destroy(definition, id, options);
	  }).then(function () {
	    return options.afterDestroy.call(item, options, item);
	  }).then(function (item) {
	    if (options.notify) {
	      definition.emit("DS.afterDestroy", definition, item);
	    }
	    _this.eject(resourceName, id);
	    return id;
	  })["catch"](function (err) {
	    if (options && options.eagerEject && item) {
	      _this.inject(resourceName, item, { notify: false });
	    }
	    return DSUtils.Promise.reject(err);
	  });
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = destroyAll;

	function destroyAll(resourceName, params, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.defs[resourceName];
	  var ejected = undefined,
	      toEject = undefined;

	  params = params || {};

	  return new DSUtils.Promise(function (resolve, reject) {
	    if (!definition) {
	      reject(new _this.errors.NER(resourceName));
	    } else if (!DSUtils._o(params)) {
	      reject(DSUtils._oErr("attrs"));
	    } else {
	      options = DSUtils._(definition, options);
	      resolve();
	    }
	  }).then(function () {
	    toEject = _this.defaults.defaultFilter.call(_this, resourceName, params);
	    return options.beforeDestroy(options, toEject);
	  }).then(function () {
	    if (options.notify) {
	      definition.emit("DS.beforeDestroy", definition, toEject);
	    }
	    if (options.eagerEject) {
	      ejected = _this.ejectAll(resourceName, params);
	    }
	    return _this.getAdapter(options).destroyAll(definition, params, options);
	  }).then(function () {
	    return options.afterDestroy(options, toEject);
	  }).then(function () {
	    if (options.notify) {
	      definition.emit("DS.afterDestroy", definition, toEject);
	    }
	    return ejected || _this.ejectAll(resourceName, params);
	  })["catch"](function (err) {
	    if (options && options.eagerEject && ejected) {
	      _this.inject(resourceName, ejected, { notify: false });
	    }
	    return DSUtils.Promise.reject(err);
	  });
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint -W082 */
	module.exports = find;

	function find(resourceName, id, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.defs[resourceName];
	  var resource = _this.s[resourceName];

	  return new DSUtils.Promise(function (resolve, reject) {
	    if (!definition) {
	      reject(new _this.errors.NER(resourceName));
	    } else if (!DSUtils._sn(id)) {
	      reject(DSUtils._snErr("id"));
	    } else {
	      options = DSUtils._(definition, options);

	      if (options.params) {
	        options.params = DSUtils.copy(options.params);
	      }

	      if (options.bypassCache || !options.cacheResponse) {
	        delete resource.completedQueries[id];
	      }
	      if ((!options.findStrictCache || id in resource.completedQueries) && _this.get(resourceName, id)) {
	        resolve(_this.get(resourceName, id));
	      } else {
	        delete resource.completedQueries[id];
	        resolve();
	      }
	    }
	  }).then(function (item) {
	    if (!item) {
	      if (!(id in resource.pendingQueries)) {
	        var promise = undefined;
	        var strategy = options.findStrategy || options.strategy;
	        if (strategy === "fallback") {
	          (function () {
	            var makeFallbackCall = function (index) {
	              return _this.getAdapter((options.findFallbackAdapters || options.fallbackAdapters)[index]).find(definition, id, options)["catch"](function (err) {
	                index++;
	                if (index < options.fallbackAdapters.length) {
	                  return makeFallbackCall(index);
	                } else {
	                  return DSUtils.Promise.reject(err);
	                }
	              });
	            };

	            promise = makeFallbackCall(0);
	          })();
	        } else {
	          promise = _this.getAdapter(options).find(definition, id, options);
	        }

	        resource.pendingQueries[id] = promise.then(function (data) {
	          // Query is no longer pending
	          delete resource.pendingQueries[id];
	          if (options.cacheResponse) {
	            var injected = _this.inject(resourceName, data, options.orig());
	            resource.completedQueries[id] = new Date().getTime();
	            resource.saved[id] = DSUtils.updateTimestamp(resource.saved[id]);
	            return injected;
	          } else {
	            return _this.createInstance(resourceName, data, options.orig());
	          }
	        });
	      }
	      return resource.pendingQueries[id];
	    } else {
	      return item;
	    }
	  })["catch"](function (err) {
	    if (resource) {
	      delete resource.pendingQueries[id];
	    }
	    return DSUtils.Promise.reject(err);
	  });
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = findAll;
	/* jshint -W082 */
	function processResults(data, resourceName, queryHash, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var resource = _this.s[resourceName];
	  var idAttribute = _this.defs[resourceName].idAttribute;
	  var date = new Date().getTime();

	  data = data || [];

	  // Query is no longer pending
	  delete resource.pendingQueries[queryHash];
	  resource.completedQueries[queryHash] = date;

	  // Update modified timestamp of collection
	  resource.collectionModified = DSUtils.updateTimestamp(resource.collectionModified);

	  // Merge the new values into the cache
	  var injected = _this.inject(resourceName, data, options.orig());

	  // Make sure each object is added to completedQueries
	  if (DSUtils._a(injected)) {
	    DSUtils.forEach(injected, function (item) {
	      if (item) {
	        var id = item[idAttribute];
	        if (id) {
	          resource.completedQueries[id] = date;
	          resource.saved[id] = DSUtils.updateTimestamp(resource.saved[id]);
	        }
	      }
	    });
	  } else {
	    options.errorFn("response is expected to be an array!");
	    resource.completedQueries[injected[idAttribute]] = date;
	  }

	  return injected;
	}

	function findAll(resourceName, params, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.defs[resourceName];
	  var resource = _this.s[resourceName];
	  var queryHash = undefined;

	  return new DSUtils.Promise(function (resolve, reject) {
	    params = params || {};

	    if (!_this.defs[resourceName]) {
	      reject(new _this.errors.NER(resourceName));
	    } else if (!DSUtils._o(params)) {
	      reject(DSUtils._oErr("params"));
	    } else {
	      options = DSUtils._(definition, options);
	      queryHash = DSUtils.toJson(params);

	      if (options.params) {
	        options.params = DSUtils.copy(options.params);
	      }

	      if (options.bypassCache || !options.cacheResponse) {
	        delete resource.completedQueries[queryHash];
	        delete resource.queryData[queryHash];
	      }
	      if (queryHash in resource.completedQueries) {
	        if (options.useFilter) {
	          resolve(_this.filter(resourceName, params, options.orig()));
	        } else {
	          resolve(resource.queryData[queryHash]);
	        }
	      } else {
	        resolve();
	      }
	    }
	  }).then(function (items) {
	    if (!(queryHash in resource.completedQueries)) {
	      if (!(queryHash in resource.pendingQueries)) {
	        var promise = undefined;
	        var strategy = options.findAllStrategy || options.strategy;
	        if (strategy === "fallback") {
	          (function () {
	            var makeFallbackCall = function (index) {
	              return _this.getAdapter((options.findAllFallbackAdapters || options.fallbackAdapters)[index]).findAll(definition, params, options)["catch"](function (err) {
	                index++;
	                if (index < options.fallbackAdapters.length) {
	                  return makeFallbackCall(index);
	                } else {
	                  return Promise.reject(err);
	                }
	              });
	            };

	            promise = makeFallbackCall(0);
	          })();
	        } else {
	          promise = _this.getAdapter(options).findAll(definition, params, options);
	        }

	        resource.pendingQueries[queryHash] = promise.then(function (data) {
	          delete resource.pendingQueries[queryHash];
	          if (options.cacheResponse) {
	            resource.queryData[queryHash] = processResults.call(_this, data, resourceName, queryHash, options);
	            resource.queryData[queryHash].$$injected = true;
	            return resource.queryData[queryHash];
	          } else {
	            DSUtils.forEach(data, function (item, i) {
	              data[i] = _this.createInstance(resourceName, item, options.orig());
	            });
	            return data;
	          }
	        });
	      }

	      return resource.pendingQueries[queryHash];
	    } else {
	      return items;
	    }
	  })["catch"](function (err) {
	    if (resource) {
	      delete resource.pendingQueries[queryHash];
	    }
	    return DSUtils.Promise.reject(err);
	  });
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = loadRelations;

	function loadRelations(resourceName, instance, relations, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var DSErrors = _this.errors;

	  var definition = _this.defs[resourceName];
	  var fields = [];

	  return new DSUtils.Promise(function (resolve, reject) {
	    if (DSUtils._sn(instance)) {
	      instance = _this.get(resourceName, instance);
	    }

	    if (DSUtils._s(relations)) {
	      relations = [relations];
	    }

	    if (!definition) {
	      reject(new DSErrors.NER(resourceName));
	    } else if (!DSUtils._o(instance)) {
	      reject(new DSErrors.IA("\"instance(id)\" must be a string, number or object!"));
	    } else if (!DSUtils._a(relations)) {
	      reject(new DSErrors.IA("\"relations\" must be a string or an array!"));
	    } else {
	      (function () {
	        var _options = DSUtils._(definition, options);
	        if (!_options.hasOwnProperty("findBelongsTo")) {
	          _options.findBelongsTo = true;
	        }
	        if (!_options.hasOwnProperty("findHasMany")) {
	          _options.findHasMany = true;
	        }

	        var tasks = [];

	        DSUtils.forEach(definition.relationList, function (def) {
	          var relationName = def.relation;
	          var relationDef = definition.getResource(relationName);
	          var __options = DSUtils._(relationDef, options);
	          if (DSUtils.contains(relations, relationName) || DSUtils.contains(relations, def.localField)) {
	            var task = undefined;
	            var params = {};
	            if (__options.allowSimpleWhere) {
	              params[def.foreignKey] = instance[definition.idAttribute];
	            } else {
	              params.where = {};
	              params.where[def.foreignKey] = {
	                "==": instance[definition.idAttribute]
	              };
	            }

	            if (def.type === "hasMany") {
	              task = _this.findAll(relationName, params, __options.orig());
	            } else if (def.type === "hasOne") {
	              if (def.localKey && instance[def.localKey]) {
	                task = _this.find(relationName, instance[def.localKey], __options.orig());
	              } else if (def.foreignKey) {
	                task = _this.findAll(relationName, params, __options.orig()).then(function (hasOnes) {
	                  return hasOnes.length ? hasOnes[0] : null;
	                });
	              }
	            } else if (instance[def.localKey]) {
	              task = _this.find(relationName, instance[def.localKey], options);
	            }

	            if (task) {
	              tasks.push(task);
	              fields.push(def.localField || false);
	            }
	          }
	        });

	        resolve(tasks);
	      })();
	    }
	  }).then(function (tasks) {
	    return DSUtils.Promise.all(tasks);
	  }).then(function (loadedRelations) {
	    DSUtils.forEach(fields, function (field, index) {
	      if (field) {
	        instance[field] = loadedRelations[index];
	      }
	    });
	    return instance;
	  });
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = reap;

	function reap(resourceName, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.defs[resourceName];
	  var resource = _this.s[resourceName];

	  return new DSUtils.Promise(function (resolve, reject) {

	    if (!definition) {
	      reject(new _this.errors.NER(resourceName));
	    } else {
	      options = DSUtils._(definition, options);
	      if (!options.hasOwnProperty("notify")) {
	        options.notify = false;
	      }
	      var items = [];
	      var now = new Date().getTime();
	      var expiredItem = undefined;
	      while ((expiredItem = resource.expiresHeap.peek()) && expiredItem.expires < now) {
	        items.push(expiredItem.item);
	        delete expiredItem.item;
	        resource.expiresHeap.pop();
	      }
	      resolve(items);
	    }
	  }).then(function (items) {
	    if (options.isInterval || options.notify) {
	      definition.beforeReap(options, items);
	      definition.emit("DS.beforeReap", definition, items);
	    }
	    if (options.reapAction === "inject") {
	      (function () {
	        var timestamp = new Date().getTime();
	        DSUtils.forEach(items, function (item) {
	          resource.expiresHeap.push({
	            item: item,
	            timestamp: timestamp,
	            expires: definition.maxAge ? timestamp + definition.maxAge : Number.MAX_VALUE
	          });
	        });
	      })();
	    } else if (options.reapAction === "eject") {
	      DSUtils.forEach(items, function (item) {
	        _this.eject(resourceName, item[definition.idAttribute]);
	      });
	    } else if (options.reapAction === "refresh") {
	      var _ret2 = (function () {
	        var tasks = [];
	        DSUtils.forEach(items, function (item) {
	          tasks.push(_this.refresh(resourceName, item[definition.idAttribute]));
	        });
	        return {
	          v: DSUtils.Promise.all(tasks)
	        };
	      })();

	      if (typeof _ret2 === "object") return _ret2.v;
	    }
	    return items;
	  }).then(function (items) {
	    if (options.isInterval || options.notify) {
	      definition.afterReap(options, items);
	      definition.emit("DS.afterReap", definition, items);
	    }
	    return items;
	  });
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = save;

	function save(resourceName, id, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var DSErrors = _this.errors;

	  var definition = _this.defs[resourceName];
	  var item = undefined;
	  var noChanges = undefined;

	  return new DSUtils.Promise(function (resolve, reject) {
	    id = DSUtils.resolveId(definition, id);
	    if (!definition) {
	      reject(new DSErrors.NER(resourceName));
	    } else if (!DSUtils._sn(id)) {
	      reject(DSUtils._snErr("id"));
	    } else if (!_this.get(resourceName, id)) {
	      reject(new DSErrors.R("id \"" + id + "\" not found in cache!"));
	    } else {
	      item = _this.get(resourceName, id);
	      options = DSUtils._(definition, options);
	      resolve(item);
	    }
	  }).then(function (attrs) {
	    return options.beforeValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.validate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.afterValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.beforeUpdate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit("DS.beforeUpdate", definition, attrs);
	    }
	    if (options.changesOnly) {
	      var resource = _this.s[resourceName];
	      if (DSUtils.w) {
	        resource.observers[id].deliver();
	      }
	      var toKeep = [];
	      var changes = _this.changes(resourceName, id);

	      for (var key in changes.added) {
	        toKeep.push(key);
	      }
	      for (key in changes.changed) {
	        toKeep.push(key);
	      }
	      changes = DSUtils.pick(attrs, toKeep);
	      if (DSUtils.isEmpty(changes)) {
	        // no changes, return
	        noChanges = true;
	        return attrs;
	      } else {
	        attrs = changes;
	      }
	    }
	    return _this.getAdapter(options).update(definition, id, attrs, options);
	  }).then(function (data) {
	    return options.afterUpdate.call(data, options, data);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit("DS.afterUpdate", definition, attrs);
	    }
	    if (noChanges) {
	      return attrs;
	    } else if (options.cacheResponse) {
	      var injected = _this.inject(definition.n, attrs, options.orig());
	      var resource = _this.s[resourceName];
	      var _id = injected[definition.idAttribute];
	      resource.saved[_id] = DSUtils.updateTimestamp(resource.saved[_id]);
	      if (!definition.resetHistoryOnInject) {
	        resource.previousAttributes[_id] = DSUtils.copy(injected, null, null, null, definition.relationFields);
	      }
	      return injected;
	    } else {
	      return _this.createInstance(resourceName, attrs, options.orig());
	    }
	  });
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = update;

	function update(resourceName, id, attrs, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var DSErrors = _this.errors;

	  var definition = _this.defs[resourceName];

	  return new DSUtils.Promise(function (resolve, reject) {
	    id = DSUtils.resolveId(definition, id);
	    if (!definition) {
	      reject(new DSErrors.NER(resourceName));
	    } else if (!DSUtils._sn(id)) {
	      reject(DSUtils._snErr("id"));
	    } else {
	      options = DSUtils._(definition, options);
	      resolve(attrs);
	    }
	  }).then(function (attrs) {
	    return options.beforeValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.validate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.afterValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.beforeUpdate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit("DS.beforeUpdate", definition, attrs);
	    }
	    return _this.getAdapter(options).update(definition, id, attrs, options);
	  }).then(function (data) {
	    return options.afterUpdate.call(data, options, data);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit("DS.afterUpdate", definition, attrs);
	    }
	    if (options.cacheResponse) {
	      var injected = _this.inject(definition.n, attrs, options.orig());
	      var resource = _this.s[resourceName];
	      var _id = injected[definition.idAttribute];
	      resource.saved[_id] = DSUtils.updateTimestamp(resource.saved[_id]);
	      if (!definition.resetHistoryOnInject) {
	        resource.previousAttributes[_id] = DSUtils.copy(injected, null, null, null, definition.relationFields);
	      }
	      return injected;
	    } else {
	      return _this.createInstance(resourceName, attrs, options.orig());
	    }
	  });
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = updateAll;

	function updateAll(resourceName, attrs, params, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var DSErrors = _this.errors;

	  var definition = _this.defs[resourceName];

	  return new DSUtils.Promise(function (resolve, reject) {
	    if (!definition) {
	      reject(new DSErrors.NER(resourceName));
	    } else {
	      options = DSUtils._(definition, options);
	      resolve(attrs);
	    }
	  }).then(function (attrs) {
	    return options.beforeValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.validate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.afterValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.beforeUpdate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit("DS.beforeUpdate", definition, attrs);
	    }
	    return _this.getAdapter(options).updateAll(definition, attrs, params, options);
	  }).then(function (data) {
	    return options.afterUpdate.call(data, options, data);
	  }).then(function (data) {
	    if (options.notify) {
	      definition.emit("DS.afterUpdate", definition, attrs);
	    }
	    var origOptions = options.orig();
	    if (options.cacheResponse) {
	      var _ret = (function () {
	        var injected = _this.inject(definition.n, data, origOptions);
	        var resource = _this.s[resourceName];
	        DSUtils.forEach(injected, function (i) {
	          var id = i[definition.idAttribute];
	          resource.saved[id] = DSUtils.updateTimestamp(resource.saved[id]);
	          if (!definition.resetHistoryOnInject) {
	            resource.previousAttributes[id] = DSUtils.copy(i, null, null, null, definition.relationFields);
	          }
	        });
	        return {
	          v: injected
	        };
	      })();

	      if (typeof _ret === "object") return _ret.v;
	    } else {
	      var _ret2 = (function () {
	        var instances = [];
	        DSUtils.forEach(data, function (item) {
	          instances.push(_this.createInstance(resourceName, item, origOptions));
	        });
	        return {
	          v: instances
	        };
	      })();

	      if (typeof _ret2 === "object") return _ret2.v;
	    }
	  });
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};

	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canMutationObserver = typeof window !== 'undefined'
	    && window.MutationObserver;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;

	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }

	    var queue = [];

	    if (canMutationObserver) {
	        var hiddenDiv = document.createElement("div");
	        var observer = new MutationObserver(function () {
	            var queueList = queue.slice();
	            queue.length = 0;
	            queueList.forEach(function (fn) {
	                fn();
	            });
	        });

	        observer.observe(hiddenDiv, { attributes: true });

	        return function nextTick(fn) {
	            if (!queue.length) {
	                hiddenDiv.setAttribute('yes', 'no');
	            }
	            queue.push(fn);
	        };
	    }

	    if (canPost) {
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);

	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }

	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];

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


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(38);
	    /**
	    * Replaces all accented chars with regular ones
	    */
	    function replaceAccents(str){
	        str = toString(str);

	        // verifies if the String has accents and replace them
	        if (str.search(/[\xC0-\xFF]/g) > -1) {
	            str = str
	                    .replace(/[\xC0-\xC5]/g, "A")
	                    .replace(/[\xC6]/g, "AE")
	                    .replace(/[\xC7]/g, "C")
	                    .replace(/[\xC8-\xCB]/g, "E")
	                    .replace(/[\xCC-\xCF]/g, "I")
	                    .replace(/[\xD0]/g, "D")
	                    .replace(/[\xD1]/g, "N")
	                    .replace(/[\xD2-\xD6\xD8]/g, "O")
	                    .replace(/[\xD9-\xDC]/g, "U")
	                    .replace(/[\xDD]/g, "Y")
	                    .replace(/[\xDE]/g, "P")
	                    .replace(/[\xE0-\xE5]/g, "a")
	                    .replace(/[\xE6]/g, "ae")
	                    .replace(/[\xE7]/g, "c")
	                    .replace(/[\xE8-\xEB]/g, "e")
	                    .replace(/[\xEC-\xEF]/g, "i")
	                    .replace(/[\xF1]/g, "n")
	                    .replace(/[\xF2-\xF6\xF8]/g, "o")
	                    .replace(/[\xF9-\xFC]/g, "u")
	                    .replace(/[\xFE]/g, "p")
	                    .replace(/[\xFD\xFF]/g, "y");
	        }
	        return str;
	    }
	    module.exports = replaceAccents;



/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(38);
	    // This pattern is generated by the _build/pattern-removeNonWord.js script
	    var PATTERN = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g;

	    /**
	     * Remove non-word chars.
	     */
	    function removeNonWord(str){
	        str = toString(str);
	        return str.replace(PATTERN, '');
	    }

	    module.exports = removeNonWord;



/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(38);
	    /**
	     * "Safer" String.toLowerCase()
	     */
	    function lowerCase(str){
	        str = toString(str);
	        return str.toLowerCase();
	    }

	    module.exports = lowerCase;



/***/ }
/******/ ])
});

