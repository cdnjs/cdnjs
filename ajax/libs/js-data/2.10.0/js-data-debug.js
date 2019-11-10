/*!
 * js-data
 * @version 2.10.0 - Homepage <http://www.js-data.io/>
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @copyright (c) 2014-2016 Jason Dobry 
 * @license MIT <https://github.com/js-data/js-data/blob/master/LICENSE>
 * 
 * @overview Robust framework-agnostic data store.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JSData"] = factory();
	else
		root["JSData"] = factory();
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
	
	var _index = __webpack_require__(1);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _errors = __webpack_require__(3);
	
	var _errors2 = _interopRequireDefault(_errors);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * The library export.
	 *   - window.JSData
	 *   - require('js-data')
	 *   - define(['js-data', function (JSData) { ... }]);
	 *   - import JSData from 'js-data'
	 */
	module.exports = {
	  DS: _index2.default,
	  DSUtils: _utils2.default,
	  DSErrors: _errors2.default,
	  createStore: function createStore(options) {
	    return new _index2.default(options);
	  },
	
	  version: {
	    full: '2.10.0',
	    major: parseInt('2', 10),
	    minor: parseInt('10', 10),
	    patch: parseInt('0', 10),
	    alpha:  true ? 'false' : false,
	    beta:  true ? 'false' : false
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* jshint eqeqeq:false */
	
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _errors = __webpack_require__(3);
	
	var _errors2 = _interopRequireDefault(_errors);
	
	var _index = __webpack_require__(41);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(47);
	
	var _index4 = _interopRequireDefault(_index3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function lifecycleNoopCb(resource, attrs, cb) {
	  cb(null, attrs);
	}
	
	function lifecycleNoop(resource, attrs) {
	  return attrs;
	}
	
	function compare(orderBy, index, a, b) {
	  var def = orderBy[index];
	  var cA = _utils2.default.get(a, def[0]);
	  var cB = _utils2.default.get(b, def[0]);
	  if (_utils2.default._s(cA)) {
	    cA = _utils2.default.upperCase(cA);
	  }
	  if (_utils2.default._s(cB)) {
	    cB = _utils2.default.upperCase(cB);
	  }
	  if (def[1] === 'DESC') {
	    if (cB < cA) {
	      return -1;
	    } else if (cB > cA) {
	      return 1;
	    } else {
	      if (index < orderBy.length - 1) {
	        return compare(orderBy, index + 1, a, b);
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
	        return compare(orderBy, index + 1, a, b);
	      } else {
	        return 0;
	      }
	    }
	  }
	}
	
	var Defaults = function () {
	  function Defaults() {
	    _classCallCheck(this, Defaults);
	  }
	
	  _createClass(Defaults, [{
	    key: 'errorFn',
	    value: function errorFn(a, b) {
	      if (this.error && typeof this.error === 'function') {
	        try {
	          if (typeof a === 'string') {
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
	  }]);
	
	  return Defaults;
	}();
	
	var defaultsPrototype = Defaults.prototype;
	
	defaultsPrototype.actions = {};
	defaultsPrototype.afterCreate = lifecycleNoopCb;
	defaultsPrototype.afterCreateCollection = lifecycleNoop;
	defaultsPrototype.afterCreateInstance = lifecycleNoop;
	defaultsPrototype.afterDestroy = lifecycleNoopCb;
	defaultsPrototype.afterEject = lifecycleNoop;
	defaultsPrototype.afterFind = lifecycleNoopCb;
	defaultsPrototype.afterFindAll = lifecycleNoopCb;
	defaultsPrototype.afterInject = lifecycleNoop;
	defaultsPrototype.afterLoadRelations = lifecycleNoopCb;
	defaultsPrototype.afterReap = lifecycleNoop;
	defaultsPrototype.afterUpdate = lifecycleNoopCb;
	defaultsPrototype.afterValidate = lifecycleNoopCb;
	defaultsPrototype.allowSimpleWhere = true;
	defaultsPrototype.applyDefaultsOnInject = false;
	defaultsPrototype.basePath = '';
	defaultsPrototype.beforeCreate = lifecycleNoopCb;
	defaultsPrototype.beforeCreateCollection = lifecycleNoop;
	defaultsPrototype.beforeCreateInstance = lifecycleNoop;
	defaultsPrototype.beforeDestroy = lifecycleNoopCb;
	defaultsPrototype.beforeEject = lifecycleNoop;
	defaultsPrototype.beforeInject = lifecycleNoop;
	defaultsPrototype.beforeReap = lifecycleNoop;
	defaultsPrototype.beforeUpdate = lifecycleNoopCb;
	defaultsPrototype.beforeValidate = lifecycleNoopCb;
	defaultsPrototype.bypassCache = false;
	defaultsPrototype.cacheResponse = !!_utils2.default.w;
	defaultsPrototype.csp = false;
	defaultsPrototype.clearEmptyQueries = true;
	defaultsPrototype.computed = {};
	defaultsPrototype.defaultAdapter = 'http';
	defaultsPrototype.debug = false;
	defaultsPrototype.defaultValues = {};
	defaultsPrototype.eagerEject = false;
	// TODO: Implement eagerInject in DS#create
	defaultsPrototype.eagerInject = false;
	defaultsPrototype.endpoint = '';
	defaultsPrototype.error = console ? function (a, b, c) {
	  return console[typeof console.error === 'function' ? 'error' : 'log'](a, b, c);
	} : false;
	defaultsPrototype.errorHandler = function () {
	  return _utils2.default.Promise.reject(arguments.length <= 0 ? undefined : arguments[0]);
	};
	defaultsPrototype.fallbackAdapters = ['http'];
	defaultsPrototype.findStrictCache = false;
	defaultsPrototype.idAttribute = 'id';
	defaultsPrototype.ignoredChanges = [/\$/];
	defaultsPrototype.instanceEvents = !!_utils2.default.w;
	defaultsPrototype.keepChangeHistory = false;
	defaultsPrototype.linkRelations = !!_utils2.default.w;
	defaultsPrototype.log = console ? function (a, b, c, d, e) {
	  return console[typeof console.info === 'function' ? 'info' : 'log'](a, b, c, d, e);
	} : false;
	
	defaultsPrototype.logFn = function (a, b, c, d) {
	  var _this = this;
	  if (_this.debug && _this.log && typeof _this.log === 'function') {
	    _this.log(_this.name || null, a || null, b || null, c || null, d || null);
	  }
	};
	
	defaultsPrototype.maxAge = false;
	defaultsPrototype.methods = {};
	defaultsPrototype.notify = !!_utils2.default.w;
	defaultsPrototype.omit = [];
	defaultsPrototype.onConflict = 'merge';
	defaultsPrototype.reapAction = _utils2.default.w ? 'inject' : 'none';
	defaultsPrototype.reapInterval = _utils2.default.w ? 30000 : false;
	defaultsPrototype.relationsEnumerable = false;
	defaultsPrototype.resetHistoryOnInject = true;
	defaultsPrototype.returnMeta = false;
	defaultsPrototype.scopes = {};
	defaultsPrototype.strategy = 'single';
	defaultsPrototype.upsert = !!_utils2.default.w;
	defaultsPrototype.useClass = true;
	defaultsPrototype.useFilter = false;
	defaultsPrototype.usePendingFind = true;
	defaultsPrototype.usePendingFindAll = true;
	defaultsPrototype.validate = lifecycleNoopCb;
	defaultsPrototype.watchChanges = !!_utils2.default.w;
	
	var escapeRegExp = /([.*+?^=!:${}()|[\]\/\\])/g;
	var percentRegExp = /%/g;
	var underscoreRegExp = /_/g;
	
	function escape(pattern) {
	  return pattern.replace(escapeRegExp, '\\$1');
	}
	
	function like(pattern, flags) {
	  return new RegExp('^' + escape(pattern).replace(percentRegExp, '.*').replace(underscoreRegExp, '.') + '$', flags);
	}
	
	defaultsPrototype.defaultFilter = function (collection, resourceName, params, options) {
	  var definition = this.definitions[resourceName];
	  var idA = 'id';
	  var resource = void 0;
	  if (definition) {
	    idA = definition.idAttribute;
	    resource = this.store[resourceName];
	  }
	  var filtered = collection;
	  var where = null;
	  var reserved = {
	    skip: '',
	    offset: '',
	    where: '',
	    limit: '',
	    orderBy: '',
	    sort: ''
	  };
	
	  params = params || {};
	  options = options || {};
	
	  if (_utils2.default._o(params.where)) {
	    where = params.where;
	  } else {
	    where = {};
	  }
	
	  if (options.allowSimpleWhere) {
	    _utils2.default.forOwn(params, function (value, key) {
	      if (!(key in reserved) && !(key in where)) {
	        where[key] = {
	          '==': value
	        };
	      }
	    });
	  }
	
	  if (_utils2.default.isEmpty(where)) {
	    where = null;
	  }
	
	  if (where) {
	    filtered = _utils2.default.filter(filtered, function (attrs) {
	      var first = true;
	      var keep = true;
	
	      if (options.excludeTemporary && resource && resource.temporaryItems[attrs[idA]]) {
	        return false;
	      }
	
	      _utils2.default.forOwn(where, function (clause, field) {
	        if (!_utils2.default._o(clause)) {
	          clause = {
	            '==': clause
	          };
	        }
	        _utils2.default.forOwn(clause, function (term, op) {
	          var expr = void 0;
	          var isOr = op[0] === '|';
	          var val = _utils2.default.get(attrs, field);
	          op = isOr ? op.substr(1) : op;
	          if (op === '==') {
	            expr = val == term; // eslint-disable-line
	          } else if (op === '===') {
	            expr = val === term;
	          } else if (op === '!=') {
	            expr = val != term; // eslint-disable-line
	          } else if (op === '!==') {
	            expr = val !== term;
	          } else if (op === '>') {
	            expr = val > term;
	          } else if (op === '>=') {
	            expr = val >= term;
	          } else if (op === '<') {
	            expr = val < term;
	          } else if (op === '<=') {
	            expr = val <= term;
	          } else if (op === 'isectEmpty') {
	            expr = !_utils2.default.intersection(val || [], term || []).length;
	          } else if (op === 'isectNotEmpty') {
	            expr = _utils2.default.intersection(val || [], term || []).length;
	          } else if (op === 'in') {
	            if (_utils2.default._s(term)) {
	              expr = term.indexOf(val) !== -1;
	            } else {
	              expr = _utils2.default.contains(term, val);
	            }
	          } else if (op === 'notIn') {
	            if (_utils2.default._s(term)) {
	              expr = term.indexOf(val) === -1;
	            } else {
	              expr = !_utils2.default.contains(term, val);
	            }
	          } else if (op.indexOf('like') === 0) {
	            expr = like(term, op.substr(4)).exec(val) !== null;
	          } else if (op.indexOf('notLike') === 0) {
	            expr = like(term, op.substr(7)).exec(val) === null;
	          } else if (op === 'contains') {
	            if (_utils2.default._s(val)) {
	              expr = val.indexOf(term) !== -1;
	            } else {
	              expr = _utils2.default.contains(val, term);
	            }
	          } else if (op === 'notContains') {
	            if (_utils2.default._s(val)) {
	              expr = val.indexOf(term) === -1;
	            } else {
	              expr = !_utils2.default.contains(val, term);
	            }
	          }
	          if (expr !== undefined) {
	            keep = first ? expr : isOr ? keep || expr : keep && expr;
	          }
	          first = false;
	        });
	      });
	
	      return keep;
	    });
	  } else if (options.excludeTemporary && resource) {
	    filtered = _utils2.default.filter(filtered, function (attrs) {
	      return resource.temporaryItems[attrs[idA]];
	    });
	  }
	
	  var orderBy = null;
	
	  if (_utils2.default._s(params.orderBy)) {
	    orderBy = [[params.orderBy, 'ASC']];
	  } else if (_utils2.default._a(params.orderBy)) {
	    orderBy = params.orderBy;
	  }
	
	  if (!orderBy && _utils2.default._s(params.sort)) {
	    orderBy = [[params.sort, 'ASC']];
	  } else if (!orderBy && _utils2.default._a(params.sort)) {
	    orderBy = params.sort;
	  }
	
	  // Apply 'orderBy'
	  if (orderBy) {
	    (function () {
	      var index = 0;
	      _utils2.default.forEach(orderBy, function (def, i) {
	        if (_utils2.default._s(def)) {
	          orderBy[i] = [def, 'ASC'];
	        } else if (!_utils2.default._a(def)) {
	          throw new _errors2.default.IA('DS.filter("' + resourceName + '"[, params][, options]): ' + _utils2.default.toJson(def) + ': Must be a string or an array!', {
	            params: {
	              'orderBy[i]': {
	                actual: typeof def === 'undefined' ? 'undefined' : _typeof(def),
	                expected: 'string|array'
	              }
	            }
	          });
	        }
	      });
	      filtered = _utils2.default.sort(filtered, function (a, b) {
	        return compare(orderBy, index, a, b);
	      });
	    })();
	  }
	
	  var limit = _utils2.default._n(params.limit) ? params.limit : null;
	  var skip = null;
	
	  if (_utils2.default._n(params.skip)) {
	    skip = params.skip;
	  } else if (_utils2.default._n(params.offset)) {
	    skip = params.offset;
	  }
	
	  // Apply 'limit' and 'skip'
	  if (limit && skip) {
	    filtered = _utils2.default.slice(filtered, skip, Math.min(filtered.length, skip + limit));
	  } else if (_utils2.default._n(limit)) {
	    filtered = _utils2.default.slice(filtered, 0, Math.min(filtered.length, limit));
	  } else if (_utils2.default._n(skip)) {
	    if (skip < filtered.length) {
	      filtered = _utils2.default.slice(filtered, skip);
	    } else {
	      filtered = [];
	    }
	  }
	
	  return filtered === collection ? filtered.slice() : filtered;
	};
	
	var DS = function () {
	  function DS(options) {
	    _classCallCheck(this, DS);
	
	    var _this = this;
	    options = options || {};
	
	    _this.store = {};
	    _this.definitions = {};
	    _this.adapters = {};
	    _this.defaults = new Defaults();
	    _this.observe = _utils2.default.observe;
	    _utils2.default.forOwn(options, function (v, k) {
	      if (k === 'omit') {
	        _this.defaults.omit = v.concat(Defaults.prototype.omit);
	      } else {
	        _this.defaults[k] = v;
	      }
	    });
	    _this.defaults.logFn('new data store created', _this.defaults);
	
	    var P = _utils2.default.Promise;
	
	    if (P && !P.prototype.spread) {
	      P.prototype.spread = function (cb) {
	        return this.then(function (arr) {
	          return cb.apply(this, arr);
	        });
	      };
	    }
	
	    _utils2.default.Events(_this);
	  }
	
	  _createClass(DS, [{
	    key: 'getAdapterName',
	    value: function getAdapterName(options) {
	      var errorIfNotExist = false;
	      options = options || {};
	      this.defaults.logFn('getAdapterName', options);
	      if (_utils2.default._s(options)) {
	        errorIfNotExist = true;
	        options = {
	          adapter: options
	        };
	      }
	      if (this.adapters[options.adapter]) {
	        return options.adapter;
	      } else if (errorIfNotExist) {
	        throw new Error(options.adapter + ' is not a registered adapter!');
	      } else {
	        return options.defaultAdapter;
	      }
	    }
	  }, {
	    key: 'getAdapter',
	    value: function getAdapter(options) {
	      options = options || {};
	      this.defaults.logFn('getAdapter', options);
	      return this.adapters[this.getAdapterName(options)];
	    }
	  }, {
	    key: 'registerAdapter',
	    value: function registerAdapter(name, Adapter, options) {
	      var _this = this;
	      options = options || {};
	      _this.defaults.logFn('registerAdapter', name, Adapter, options);
	      if (_utils2.default.isFunction(Adapter)) {
	        _this.adapters[name] = new Adapter(options);
	      } else {
	        _this.adapters[name] = Adapter;
	      }
	      if (options.default) {
	        _this.defaults.defaultAdapter = name;
	      }
	      _this.defaults.logFn('default adapter is ' + _this.defaults.defaultAdapter);
	    }
	  }, {
	    key: 'is',
	    value: function is(resourceName, instance) {
	      var definition = this.definitions[resourceName];
	      if (!definition) {
	        throw new _errors2.default.NER(resourceName);
	      }
	      return instance instanceof definition[definition.class];
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      var _this2 = this;
	
	      var ejected = {};
	      _utils2.default.forOwn(this.definitions, function (definition) {
	        var name = definition.name;
	        ejected[name] = definition.ejectAll();
	        _this2.store[name].completedQueries = {};
	        _this2.store[name].queryData = {};
	      });
	      return ejected;
	    }
	  }, {
	    key: 'errorFn',
	    value: function errorFn() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      var options = args[args.length - 1];
	      var defaultHandler = this.defaults.errorHandler;
	      var errorHandler = options ? options.errorHandler : defaultHandler;
	      errorHandler = errorHandler || defaultHandler;
	      return function (err) {
	        return errorHandler.apply(undefined, [err].concat(args));
	      };
	    }
	  }]);
	
	  return DS;
	}();
	
	var dsPrototype = DS.prototype;
	
	dsPrototype.getAdapterName.shorthand = false;
	dsPrototype.getAdapter.shorthand = false;
	dsPrototype.registerAdapter.shorthand = false;
	dsPrototype.errors = _errors2.default;
	dsPrototype.utils = _utils2.default;
	
	function addMethods(target, obj) {
	  _utils2.default.forOwn(obj, function (v, k) {
	    target[k] = v;
	    target[k].before = function (fn) {
	      var orig = target[k];
	      target[k] = function () {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          args[_key2] = arguments[_key2];
	        }
	
	        return orig.apply(this, fn.apply(this, args) || args);
	      };
	    };
	  });
	}
	
	addMethods(dsPrototype, _index2.default);
	addMethods(dsPrototype, _index4.default);
	
	exports.default = DS;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* jshint eqeqeq:false */
	
	/**
	 * Mix of ES6 and CommonJS module imports because the interop of Babel + Webpack + ES6 modules + CommonJS isn't very good.
	 */
	
	
	var _errors = __webpack_require__(3);
	
	var _errors2 = _interopRequireDefault(_errors);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BinaryHeap = __webpack_require__(4);
	var forEach = __webpack_require__(5);
	var slice = __webpack_require__(6);
	var forOwn = __webpack_require__(7);
	var contains = __webpack_require__(10);
	var deepMixIn = __webpack_require__(12);
	var pascalCase = __webpack_require__(14);
	var remove = __webpack_require__(21);
	var pick = __webpack_require__(22);
	var _keys = __webpack_require__(23);
	var sort = __webpack_require__(24);
	var upperCase = __webpack_require__(19);
	var get = __webpack_require__(25);
	var set = __webpack_require__(27);
	var observe = __webpack_require__(29);
	var guid = __webpack_require__(30);
	var w = void 0,
	    P = void 0,
	    File = void 0;
	var objectProto = Object.prototype;
	var toString = objectProto.toString;
	
	/**
	 * Attempt to detect the global Promise constructor.
	 * JSData will still work without one, as long you do something like this:
	 *
	 * var JSData = require('js-data');
	 * JSData.DSUtils.Promise = MyPromiseLib;
	 */
	try {
	  P = Promise;
	} catch (e) {
	  console.error('js-data requires a global Promise constructor!');
	}
	
	try {
	  File = window.File;
	} catch (e) {
	  File = function File() {};
	}
	
	function _isArray(value) {
	  return toString.call(value) === '[object Array]' || false;
	}
	
	var isArray = Array.isArray || _isArray;
	
	function isRegExp(value) {
	  return toString.call(value) === '[object RegExp]' || false;
	}
	
	// adapted from lodash.isString
	function isString(value) {
	  return typeof value === 'string' || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && toString.call(value) === '[object String]' || false;
	}
	
	function isObject(value) {
	  return toString.call(value) === '[object Object]' || false;
	}
	
	// adapted from lodash.isDate
	function isDate(value) {
	  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && toString.call(value) === '[object Date]' || false;
	}
	
	// adapted from lodash.isNumber
	function isNumber(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return type === 'number' || value && type === 'object' && toString.call(value) === '[object Number]' || false;
	}
	
	// adapted from lodash.isFunction
	function isFunction(value) {
	  return typeof value === 'function' || value && toString.call(value) === '[object Function]' || false;
	}
	
	// shorthand argument checking functions, using these shaves 1.18 kb off of the minified build
	function isStringOrNumber(value) {
	  return isString(value) || isNumber(value);
	}
	
	function isStringOrNumberErr(field) {
	  return new _errors2.default.IA('"' + field + '" must be a string or a number!');
	}
	
	function isObjectErr(field) {
	  return new _errors2.default.IA('"' + field + '" must be an object!');
	}
	
	function isArrayErr(field) {
	  return new _errors2.default.IA('"' + field + '" must be an array!');
	}
	
	// adapted from mout.isEmpty
	function isEmpty(val) {
	  if (val == null) {
	    // jshint ignore:line
	    // typeof null == 'object' so we check it first
	    return true;
	  } else if (typeof val === 'string' || isArray(val)) {
	    return !val.length;
	  } else if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
	    var result = true;
	    forOwn(val, function () {
	      result = false;
	      return false; // break loop
	    });
	    return result;
	  } else {
	    return true;
	  }
	}
	
	// Find the intersection between two arrays
	function intersection(array1, array2) {
	  if (!array1 || !array2) {
	    return [];
	  }
	  var result = [];
	  var item = void 0;
	  for (var i = 0, length = array1.length; i < length; i++) {
	    item = array1[i];
	    if (contains(result, item)) {
	      continue;
	    }
	    if (contains(array2, item)) {
	      result.push(item);
	    }
	  }
	  return result;
	}
	
	function filter(array, cb, thisObj) {
	  var results = [];
	  forEach(array, function (value, key, arr) {
	    if (cb(value, key, arr)) {
	      results.push(value);
	    }
	  }, thisObj);
	  return results;
	}
	
	/**
	 * Attempt to detect whether we are in the browser.
	 */
	try {
	  w = window;
	  w = {};
	} catch (e) {
	  w = null;
	}
	
	/**
	 * Event mixin. Usage:
	 *
	 * function handler() { ... }
	 * Events(myObject);
	 * myObject.on('foo', handler);
	 * myObject.emit('foo', 'some', 'data');
	 * myObject.off('foo', handler);
	 */
	function Events(target) {
	  var events = {};
	  target = target || this;
	  Object.defineProperties(target, {
	    on: {
	      value: function value(type, func, ctx) {
	        events[type] = events[type] || [];
	        events[type].push({
	          f: func,
	          c: ctx
	        });
	      }
	    },
	    off: {
	      value: function value(type, func) {
	        var listeners = events[type];
	        if (!listeners) {
	          events = {};
	        } else if (func) {
	          for (var i = 0; i < listeners.length; i++) {
	            if (listeners[i].f === func) {
	              listeners.splice(i, 1);
	              break;
	            }
	          }
	        } else {
	          listeners.splice(0, listeners.length);
	        }
	      }
	    },
	    emit: {
	      value: function value() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        var listeners = events[args.shift()] || [];
	        if (listeners) {
	          for (var i = 0; i < listeners.length; i++) {
	            listeners[i].f.apply(listeners[i].c, args);
	          }
	        }
	      }
	    }
	  });
	}
	
	/**
	 * Lifecycle hooks that should support promises.
	 */
	var toPromisify = ['beforeValidate', 'validate', 'afterValidate', 'beforeCreate', 'afterCreate', 'beforeUpdate', 'afterUpdate', 'beforeDestroy', 'afterDestroy'];
	
	/**
	 * Return whether "prop" is in the blacklist.
	 */
	var isBlacklisted = observe.isBlacklisted;
	
	// adapted from angular.copy
	function copy(source, destination, stackSource, stackDest, blacklist) {
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
	      throw new Error('Cannot copy! Source and destination are identical.');
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
	
	    var result = void 0;
	    if (isArray(source)) {
	      var i = void 0;
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
	}
	
	// adapted from angular.equals
	function equals(o1, o2) {
	  if (o1 === o2) {
	    return true;
	  }
	  if (o1 === null || o2 === null) {
	    return false;
	  }
	  if (o1 !== o1 && o2 !== o2) {
	    // eslint-disable-line
	    return true;
	  } // NaN === NaN
	  var t1 = typeof o1 === 'undefined' ? 'undefined' : _typeof(o1);
	  var t2 = typeof o2 === 'undefined' ? 'undefined' : _typeof(o2);
	  var length, key, keySet;
	  if (t1 == t2) {
	    // eslint-disable-line
	    if (t1 == 'object') {
	      // eslint-disable-line
	      if (isArray(o1)) {
	        if (!isArray(o2)) {
	          return false;
	        }
	        if ((length = o1.length) === o2.length) {
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
	        return o1.toString() == o2.toString(); // eslint-disable-line
	      } else {
	        if (isArray(o2)) {
	          return false;
	        }
	        keySet = {};
	        for (key in o1) {
	          if (key.charAt(0) === '$' || isFunction(o1[key])) {
	            continue;
	          }
	          if (!equals(o1[key], o2[key])) {
	            return false;
	          }
	          keySet[key] = true;
	        }
	        for (key in o2) {
	          if (!keySet.hasOwnProperty(key) && key.charAt(0) !== '$' && o2[key] !== undefined && !isFunction(o2[key])) {
	            return false;
	          }
	        }
	        return true;
	      }
	    }
	  }
	  return false;
	}
	
	/**
	 * Given either an instance or the primary key of an instance, return the primary key.
	 */
	function resolveId(definition, idOrInstance) {
	  if (isString(idOrInstance) || isNumber(idOrInstance)) {
	    return idOrInstance;
	  } else if (idOrInstance && definition) {
	    return idOrInstance[definition.idAttribute] || idOrInstance;
	  } else {
	    return idOrInstance;
	  }
	}
	
	/**
	 * Given either an instance or the primary key of an instance, return the instance.
	 */
	function resolveItem(resource, idOrInstance) {
	  if (resource && (isString(idOrInstance) || isNumber(idOrInstance))) {
	    return resource.index[idOrInstance] || idOrInstance;
	  } else {
	    return idOrInstance;
	  }
	}
	
	function isValidString(val) {
	  return val != null && val !== ''; // jshint ignore:line
	}
	
	function join(items, separator) {
	  separator = separator || '';
	  return filter(items, isValidString).join(separator);
	}
	
	function makePath() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  var result = join(args, '/');
	  return result.replace(/([^:\/]|^)\/{2,}/g, '$1/');
	}
	
	exports.default = {
	  Promise: P,
	  /**
	   * Method to wrap an "options" object so that it will inherit from
	   * some parent object, such as a resource definition.
	   */
	  _: function _(parent, options) {
	    var _this = this;
	    parent = parent || {};
	    options = options || {};
	    if (options && options.constructor === parent.constructor) {
	      return options;
	    } else if (!isObject(options)) {
	      throw new _errors2.default.IA('"options" must be an object!');
	    }
	    forEach(toPromisify, function (name) {
	      if (typeof options[name] === 'function' && options[name].toString().indexOf('for (var _len = arg') === -1) {
	        options[name] = _this.promisify(options[name]);
	      }
	    });
	    // Dynamic constructor function
	    var O = function Options(attrs) {
	      var self = this;
	      forOwn(attrs, function (value, key) {
	        self[key] = value;
	      });
	    };
	    // Inherit from some parent object
	    O.prototype = parent;
	    // Give us a way to get the original options back.
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
	  applyScope: function applyScope(definition, params, options) {
	    var scope = options.scope;
	    var _params = copy(params);
	    if (scope) {
	      if (isString(scope)) {
	        scope = [scope];
	      }
	    } else {
	      scope = [];
	    }
	    scope.unshift('defaultScope');
	    forEach(scope, function (_scope) {
	      var scopeDef = options.scopes[_scope];
	      if (typeof scopeDef === 'function') {
	        deepMixIn(params, scopeDef(definition));
	      } else if (scopeDef) {
	        deepMixIn(params, scopeDef);
	      }
	    });
	    deepMixIn(params, _params);
	  },
	  compute: function compute(fn, field) {
	    var _this = this;
	    var args = [];
	    if (!isObject(fn)) {
	      forEach(fn.deps, function (dep) {
	        args.push(get(_this, dep));
	      });
	      // compute property
	      set(_this, field, fn[fn.length - 1].apply(_this, args));
	    }
	  },
	
	  contains: contains,
	  copy: copy,
	  deepMixIn: deepMixIn,
	  diffObjectFromOldObject: observe.diffObjectFromOldObject,
	  BinaryHeap: BinaryHeap,
	  equals: equals,
	  Events: Events,
	  filter: filter,
	  fillIn: function fillIn(target, obj) {
	    forOwn(obj, function (v, k) {
	      if (!(k in target)) {
	        target[k] = v;
	      }
	    });
	    return target;
	  },
	
	  forEach: forEach,
	  forOwn: forOwn,
	  fromJson: function fromJson(json) {
	    return isString(json) ? JSON.parse(json) : json;
	  },
	
	  get: get,
	  guid: guid,
	  intersection: intersection,
	  isArray: isArray,
	  isBlacklisted: isBlacklisted,
	  isEmpty: isEmpty,
	  isFunction: isFunction,
	  isObject: isObject,
	  isNumber: isNumber,
	  isString: isString,
	  keys: _keys,
	  makePath: makePath,
	  observe: observe,
	  omit: function omit(obj, bl) {
	    var toRemove = [];
	    forOwn(obj, function (v, k) {
	      if (isBlacklisted(k, bl)) {
	        toRemove.push(k);
	      }
	    });
	    forEach(toRemove, function (k) {
	      delete obj[k];
	    });
	    return obj;
	  },
	
	  pascalCase: pascalCase,
	  pick: pick,
	  // Turn the given node-style callback function into one that can return a promise.
	  promisify: function promisify(fn, target) {
	    var _this = this;
	    if (!fn) {
	      return;
	    } else if (typeof fn !== 'function') {
	      throw new Error('Can only promisify functions!');
	    }
	    return function () {
	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
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
	  set: set,
	  slice: slice,
	  sort: sort,
	  toJson: JSON.stringify,
	  updateTimestamp: function updateTimestamp(timestamp) {
	    var newTimestamp = typeof Date.now === 'function' ? Date.now() : new Date().getTime();
	    if (timestamp && newTimestamp <= timestamp) {
	      return timestamp + 1;
	    } else {
	      return newTimestamp;
	    }
	  },
	
	  upperCase: upperCase,
	  // Return a copy of "object" with cycles removed.
	  removeCircular: function removeCircular(object) {
	    return function rmCirc(value, ctx) {
	      var i = void 0;
	      var nu = void 0;
	
	      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null && !(value instanceof Boolean) && !(value instanceof Date) && !(value instanceof Number) && !(value instanceof RegExp) && !(value instanceof String) && (!File || !(value instanceof File))) {
	        // check if current object points back to itself
	        var cur = ctx.cur;
	        var parent = ctx.ctx;
	        while (parent) {
	          if (parent.cur === cur) {
	            return undefined;
	          }
	          parent = parent.ctx;
	        }
	
	        if (isArray(value)) {
	          nu = [];
	          for (i = 0; i < value.length; i += 1) {
	            nu[i] = rmCirc(value[i], { ctx: ctx, cur: value[i] });
	          }
	        } else {
	          nu = {};
	          forOwn(value, function (v, k) {
	            nu[k] = rmCirc(value[k], { ctx: ctx, cur: value[k] });
	          });
	        }
	        return nu;
	      }
	      return value;
	    }(object, { ctx: null, cur: object });
	  },
	
	  resolveItem: resolveItem,
	  resolveId: resolveId,
	  respond: function respond(response, meta, options) {
	    if (options.returnMeta === 'array') {
	      return [response, meta];
	    } else if (options.returnMeta === 'object') {
	      return { response: response, meta: meta };
	    } else {
	      return response;
	    }
	  },
	
	  w: w,
	  // This is where the magic of relations happens.
	  applyRelationGettersToTarget: function applyRelationGettersToTarget(store, definition, target) {
	    this.forEach(definition.relationList, function (def) {
	      var relationName = def.relation;
	      var localField = def.localField;
	      var localKey = def.localKey;
	      var foreignKey = def.foreignKey;
	      var localKeys = def.localKeys;
	      var foreignKeys = def.foreignKeys;
	      var enumerable = typeof def.enumerable === 'boolean' ? def.enumerable : !!definition.relationsEnumerable;
	      if (typeof def.link === 'boolean' ? def.link : !!definition.linkRelations) {
	        delete target[localField];
	        var prop = {
	          enumerable: enumerable
	        };
	        if (def.type === 'belongsTo') {
	          prop.get = function () {
	            var key = get(this, localKey);
	            var hasKey = !!(key || key === 0);
	            return hasKey ? definition.getResource(relationName).get(key) : undefined;
	          };
	          prop.set = function (parent) {
	            if (parent) {
	              set(this, localKey, get(parent, definition.getResource(relationName).idAttribute));
	            }
	            return get(this, localField);
	          };
	        } else if (def.type === 'hasMany') {
	          prop.get = function () {
	            var params = {};
	            if (foreignKey) {
	              params[foreignKey] = this[definition.idAttribute];
	              return definition.getResource(relationName).defaultFilter.call(store, store.store[relationName].collection, relationName, params, { allowSimpleWhere: true });
	            } else if (localKeys) {
	              var keys = get(this, localKeys) || [];
	              return definition.getResource(relationName).getAll(isArray(keys) ? keys : _keys(keys));
	            } else if (foreignKeys) {
	              set(params, 'where.' + foreignKeys + '.contains', this[definition.idAttribute]);
	              return definition.getResource(relationName).defaultFilter.call(store, store.store[relationName].collection, relationName, params);
	            }
	            return undefined;
	          };
	          prop.set = function (children) {
	            var _this2 = this;
	
	            if (children && children.length) {
	              (function () {
	                var id = get(_this2, definition.idAttribute);
	                if (foreignKey) {
	                  forEach(children, function (child) {
	                    set(child, foreignKey, id);
	                  });
	                } else if (localKeys) {
	                  (function () {
	                    var keys = [];
	                    forEach(children, function (child) {
	                      keys.push(get(child, definition.getResource(relationName).idAttribute));
	                    });
	                    set(_this2, localKeys, keys);
	                  })();
	                } else if (foreignKeys) {
	                  forEach(children, function (child) {
	                    var keys = get(child, foreignKeys);
	                    if (keys) {
	                      if (!contains(keys, id)) {
	                        keys.push(id);
	                      }
	                    } else {
	                      set(child, foreignKeys, [id]);
	                    }
	                  });
	                }
	              })();
	            }
	            return get(this, localField);
	          };
	        } else if (def.type === 'hasOne') {
	          if (localKey) {
	            prop.get = function () {
	              var key = get(this, localKey);
	              var hasKey = !!(key || key === 0);
	              return hasKey ? definition.getResource(relationName).get(key) : undefined;
	            };
	            prop.set = function (sibling) {
	              if (sibling) {
	                set(this, localKey, get(sibling, definition.getResource(relationName).idAttribute));
	              }
	              return get(this, localField);
	            };
	          } else {
	            prop.get = function () {
	              var params = {};
	              params[foreignKey] = this[definition.idAttribute];
	              var items = params[foreignKey] ? definition.getResource(relationName).defaultFilter.call(store, store.store[relationName].collection, relationName, params, { allowSimpleWhere: true }) : [];
	              if (items.length) {
	                return items[0];
	              }
	              return undefined;
	            };
	            prop.set = function (sibling) {
	              if (sibling) {
	                set(sibling, foreignKey, get(this, definition.idAttribute));
	              }
	              return get(this, localField);
	            };
	          }
	        }
	        if (def.get) {
	          (function () {
	            var orig = prop.get;
	            prop.get = function () {
	              var _this3 = this;
	
	              return def.get(definition, def, this, function () {
	                for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	                  args[_key4] = arguments[_key4];
	                }
	
	                return orig.apply(_this3, args);
	              });
	            };
	          })();
	        }
	        Object.defineProperty(target, localField, prop);
	      }
	    });
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Thrown during a method call when an argument passed into the method is invalid.
	 */
	var IllegalArgumentError = function (_Error) {
	  _inherits(IllegalArgumentError, _Error);
	
	  function IllegalArgumentError(message) {
	    _classCallCheck(this, IllegalArgumentError);
	
	    var _this = _possibleConstructorReturn(this, (IllegalArgumentError.__proto__ || Object.getPrototypeOf(IllegalArgumentError)).call(this));
	
	    if (typeof Error.captureStackTrace === 'function') {
	      Error.captureStackTrace(_this, _this.constructor);
	    }
	    _this.type = _this.constructor.name;
	    _this.message = message;
	    return _this;
	  }
	
	  return IllegalArgumentError;
	}(Error);
	
	/**
	 * Thrown when an invariant is violated or unrecoverable error is encountered during execution.
	 */
	
	
	var RuntimeError = function (_Error2) {
	  _inherits(RuntimeError, _Error2);
	
	  function RuntimeError(message) {
	    _classCallCheck(this, RuntimeError);
	
	    var _this2 = _possibleConstructorReturn(this, (RuntimeError.__proto__ || Object.getPrototypeOf(RuntimeError)).call(this));
	
	    if (typeof Error.captureStackTrace === 'function') {
	      Error.captureStackTrace(_this2, _this2.constructor);
	    }
	    _this2.type = _this2.constructor.name;
	    _this2.message = message;
	    return _this2;
	  }
	
	  return RuntimeError;
	}(Error);
	
	/**
	 * Thrown when attempting to access or work with a non-existent resource.
	 */
	
	
	var NonexistentResourceError = function (_Error3) {
	  _inherits(NonexistentResourceError, _Error3);
	
	  function NonexistentResourceError(resourceName) {
	    _classCallCheck(this, NonexistentResourceError);
	
	    var _this3 = _possibleConstructorReturn(this, (NonexistentResourceError.__proto__ || Object.getPrototypeOf(NonexistentResourceError)).call(this));
	
	    if (typeof Error.captureStackTrace === 'function') {
	      Error.captureStackTrace(_this3, _this3.constructor);
	    }
	    _this3.type = _this3.constructor.name;
	    _this3.message = resourceName + ' is not a registered resource!';
	    return _this3;
	  }
	
	  return NonexistentResourceError;
	}(Error);
	
	exports.default = {
	  IllegalArgumentError: IllegalArgumentError,
	  IA: IllegalArgumentError,
	  RuntimeError: RuntimeError,
	  R: RuntimeError,
	  NonexistentResourceError: NonexistentResourceError,
	  NER: NonexistentResourceError
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define('yabh', factory) :
	  (global.BinaryHeap = factory());
	}(this, function () { 'use strict';
	
	  /**
	   * @method bubbleUp
	   * @param {array} heap The heap.
	   * @param {function} weightFunc The weight function.
	   * @param {number} n The index of the element to bubble up.
	   */
	  var bubbleUp = function bubbleUp(heap, weightFunc, n) {
	    var element = heap[n];
	    var weight = weightFunc(element);
	    // When at 0, an element can not go up any further.
	    while (n > 0) {
	      // Compute the parent element's index, and fetch it.
	      var parentN = Math.floor((n + 1) / 2) - 1;
	      var parent = heap[parentN];
	      // If the parent has a lesser weight, things are in order and we
	      // are done.
	      if (weight >= weightFunc(parent)) {
	        break;
	      } else {
	        heap[parentN] = element;
	        heap[n] = parent;
	        n = parentN;
	      }
	    }
	  };
	
	  /**
	   * @method bubbleDown
	   * @param {array} heap The heap.
	   * @param {function} weightFunc The weight function.
	   * @param {number} n The index of the element to sink down.
	   */
	  var bubbleDown = function bubbleDown(heap, weightFunc, n) {
	    var length = heap.length;
	    var node = heap[n];
	    var nodeWeight = weightFunc(node);
	
	    while (true) {
	      var child2N = (n + 1) * 2;
	      var child1N = child2N - 1;
	      var swap = null;
	      if (child1N < length) {
	        var child1 = heap[child1N];
	        var child1Weight = weightFunc(child1);
	        // If the score is less than our node's, we need to swap.
	        if (child1Weight < nodeWeight) {
	          swap = child1N;
	        }
	      }
	      // Do the same checks for the other child.
	      if (child2N < length) {
	        var child2 = heap[child2N];
	        var child2Weight = weightFunc(child2);
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
	
	  function BinaryHeap(weightFunc, compareFunc) {
	    if (!weightFunc) {
	      weightFunc = function weightFunc(x) {
	        return x;
	      };
	    }
	    if (!compareFunc) {
	      compareFunc = function compareFunc(x, y) {
	        return x === y;
	      };
	    }
	    if (typeof weightFunc !== 'function') {
	      throw new Error('BinaryHeap([weightFunc][, compareFunc]): "weightFunc" must be a function!');
	    }
	    if (typeof compareFunc !== 'function') {
	      throw new Error('BinaryHeap([weightFunc][, compareFunc]): "compareFunc" must be a function!');
	    }
	    this.weightFunc = weightFunc;
	    this.compareFunc = compareFunc;
	    this.heap = [];
	  }
	
	  var BHProto = BinaryHeap.prototype;
	
	  BHProto.push = function (node) {
	    this.heap.push(node);
	    bubbleUp(this.heap, this.weightFunc, this.heap.length - 1);
	  };
	
	  BHProto.peek = function () {
	    return this.heap[0];
	  };
	
	  BHProto.pop = function () {
	    var front = this.heap[0];
	    var end = this.heap.pop();
	    if (this.heap.length > 0) {
	      this.heap[0] = end;
	      bubbleDown(this.heap, this.weightFunc, 0);
	    }
	    return front;
	  };
	
	  BHProto.remove = function (node) {
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
	  };
	
	  BHProto.removeAll = function () {
	    this.heap = [];
	  };
	
	  BHProto.size = function () {
	    return this.heap.length;
	  };
	
	  return BinaryHeap;
	
	}));
	//# sourceMappingURL=yabh.js.map

/***/ },
/* 5 */
/***/ function(module, exports) {

	
	
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
/* 6 */
/***/ function(module, exports) {

	
	
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

	var hasOwn = __webpack_require__(8);
	var forIn = __webpack_require__(9);
	
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
/* 8 */
/***/ function(module, exports) {

	
	
	    /**
	     * Safer Object.hasOwnProperty
	     */
	     function hasOwn(obj, prop){
	         return Object.prototype.hasOwnProperty.call(obj, prop);
	     }
	
	     module.exports = hasOwn;
	
	


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(8);
	
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
/* 10 */
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
/* 11 */
/***/ function(module, exports) {

	
	
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

	var forOwn = __webpack_require__(7);
	var isPlainObject = __webpack_require__(13);
	
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
/* 13 */
/***/ function(module, exports) {

	
	
	    /**
	     * Checks if the value is created by the `Object` constructor.
	     */
	    function isPlainObject(value) {
	        return (!!value && typeof value === 'object' &&
	            value.constructor === Object);
	    }
	
	    module.exports = isPlainObject;
	
	


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(15);
	var camelCase = __webpack_require__(16);
	var upperCase = __webpack_require__(19);
	    /**
	     * camelCase + UPPERCASE first char
	     */
	    function pascalCase(str){
	        str = toString(str);
	        return camelCase(str).replace(/^[a-z]/, upperCase);
	    }
	
	    module.exports = pascalCase;
	


/***/ },
/* 15 */
/***/ function(module, exports) {

	
	
	    /**
	     * Typecast a value to a String, using an empty string value for null or
	     * undefined.
	     */
	    function toString(val){
	        return val == null ? '' : val.toString();
	    }
	
	    module.exports = toString;
	
	


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(15);
	var replaceAccents = __webpack_require__(17);
	var removeNonWord = __webpack_require__(18);
	var upperCase = __webpack_require__(19);
	var lowerCase = __webpack_require__(20);
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(15);
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(15);
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(15);
	    /**
	     * "Safer" String.toUpperCase()
	     */
	    function upperCase(str){
	        str = toString(str);
	        return str.toUpperCase();
	    }
	    module.exports = upperCase;
	


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(15);
	    /**
	     * "Safer" String.toLowerCase()
	     */
	    function lowerCase(str){
	        str = toString(str);
	        return str.toLowerCase();
	    }
	
	    module.exports = lowerCase;
	


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var indexOf = __webpack_require__(11);
	
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var slice = __webpack_require__(6);
	
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(7);
	
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
/* 24 */
/***/ function(module, exports) {

	
	
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isPrimitive = __webpack_require__(26);
	
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
/* 26 */
/***/ function(module, exports) {

	
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var namespace = __webpack_require__(28);
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var forEach = __webpack_require__(5);
	
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
/* 29 */
/***/ function(module, exports) {

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
	  global.isBlacklisted = isBlacklisted;
	  global.Observer.runEOM_ = runEOM;
	  global.Observer.observerSentinel_ = observerSentinel; // for testing.
	  global.Observer.hasObjectObserve = hasObserve;
	  global.diffObjectFromOldObject = diffObjectFromOldObject;
	  global.ObjectObserver = ObjectObserver;
	
	})(exports);


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var randHex = __webpack_require__(31);
	var choice = __webpack_require__(32);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var choice = __webpack_require__(32);
	
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var randInt = __webpack_require__(33);
	var isArray = __webpack_require__(38);
	
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var MIN_INT = __webpack_require__(34);
	var MAX_INT = __webpack_require__(35);
	var rand = __webpack_require__(36);
	
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
/* 34 */
/***/ function(module, exports) {

	/**
	 * @constant Minimum 32-bit signed integer value (-2^31).
	 */
	
	    module.exports = -2147483648;
	


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * @constant Maximum 32-bit signed integer value. (2^31 - 1)
	 */
	
	    module.exports = 2147483647;
	


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var random = __webpack_require__(37);
	var MIN_INT = __webpack_require__(34);
	var MAX_INT = __webpack_require__(35);
	
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
/* 37 */
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(39);
	    /**
	     */
	    var isArray = Array.isArray || function (val) {
	        return isKind(val, 'Array');
	    };
	    module.exports = isArray;
	


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var kindOf = __webpack_require__(40);
	    /**
	     * Check if value is from a specific "kind".
	     */
	    function isKind(val, kind){
	        return kindOf(val) === kind;
	    }
	    module.exports = isKind;
	


/***/ },
/* 40 */
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _errors = __webpack_require__(3);
	
	var _errors2 = _interopRequireDefault(_errors);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NER = _errors2.default.NER;
	var IA = _errors2.default.IA;
	var R = _errors2.default.R;
	
	var fakeId = 'DS_' + new Date().getTime();
	
	function diffIsEmpty(diff) {
	  return !(_utils2.default.isEmpty(diff.added) && _utils2.default.isEmpty(diff.removed) && _utils2.default.isEmpty(diff.changed));
	}
	
	function check(fnName, resourceName, id, options) {
	  var _this = this;
	  var definition = _this.definitions[resourceName];
	  options = options || {};
	
	  id = _utils2.default.resolveId(definition, id);
	  if (!definition) {
	    throw new NER(resourceName);
	  } else if (!_utils2.default._sn(id)) {
	    throw _utils2.default._snErr('id');
	  }
	  id = id === fakeId ? undefined : id;
	
	  options = _utils2.default._(definition, options);
	
	  options.logFn(fnName, id, options);
	
	  return { _this: _this, definition: definition, _resourceName: resourceName, _id: id, _options: options };
	}
	
	exports.default = {
	  // Return the changes for the given item, if any.
	  //
	  // @param resourceName The name of the type of resource of the item whose changes are to be returned.
	  // @param id The primary key of the item whose changes are to be returned.
	  // @param options Optional configuration.
	  // @param options.ignoredChanges Array of strings or regular expressions of fields, the changes of which are to be ignored.
	  // @returns The changes of the given item, if any.
	  changes: function changes(resourceName, id, options) {
	    var _check$call = check.call(this, 'changes', resourceName, id, options);
	
	    var _this = _check$call._this;
	    var definition = _check$call.definition;
	    var _resourceName = _check$call._resourceName;
	    var _id = _check$call._id;
	    var _options = _check$call._options;
	
	
	    var item = definition.get(_id);
	    if (item) {
	      var _ret = function () {
	        var observer = _this.store[_resourceName].observers[_id];
	        if (observer && typeof observer === 'function') {
	          // force observation handler to be fired for item if there are changes and `Object.observe` is not available
	          observer.deliver();
	        }
	
	        var ignoredChanges = _options.ignoredChanges || [];
	        // add linked relations to list of ignored changes
	        _utils2.default.forEach(definition.relationFields, function (field) {
	          if (!_utils2.default.contains(ignoredChanges, field)) {
	            ignoredChanges.push(field);
	          }
	        });
	        // calculate changes
	        var diff = _utils2.default.diffObjectFromOldObject(item, _this.store[_resourceName].previousAttributes[_id], _utils2.default.equals, ignoredChanges);
	        // remove functions from diff
	        _utils2.default.forOwn(diff, function (changeset, name) {
	          var toKeep = [];
	          _utils2.default.forOwn(changeset, function (value, field) {
	            if (!_utils2.default.isFunction(value)) {
	              toKeep.push(field);
	            }
	          });
	          diff[name] = _utils2.default.pick(diff[name], toKeep);
	        });
	        // definitely ignore changes to linked relations
	        _utils2.default.forEach(definition.relationFields, function (field) {
	          delete diff.added[field];
	          delete diff.removed[field];
	          delete diff.changed[field];
	        });
	        return {
	          v: diff
	        };
	      }();
	
	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	  },
	
	
	  // Return the change history of the given item, if any.
	  //
	  // @param resourceName The name of the type of resource of the item whose change history is to be returned.
	  // @param id The primary key of the item whose change history is to be returned.
	  // @returns The change history of the given item, if any.
	  changeHistory: function changeHistory(resourceName, id) {
	    var _check$call2 = check.call(this, 'changeHistory', resourceName, id || fakeId);
	
	    var _this = _check$call2._this;
	    var definition = _check$call2.definition;
	    var _resourceName = _check$call2._resourceName;
	    var _id = _check$call2._id;
	
	    var resource = _this.store[_resourceName];
	
	    if (!definition.keepChangeHistory) {
	      definition.errorFn('changeHistory is disabled for this resource!');
	    } else {
	      if (_resourceName) {
	        var item = definition.get(_id);
	        if (item) {
	          return resource.changeHistories[_id];
	        }
	      } else {
	        return resource.changeHistory;
	      }
	    }
	  },
	  commit: function commit(resourceName, id) {
	    var _check$call3 = check.call(this, 'commit', resourceName, id);
	
	    var _this = _check$call3._this;
	    var definition = _check$call3.definition;
	    var _resourceName = _check$call3._resourceName;
	    var _id = _check$call3._id;
	
	    var resource = _this.store[_resourceName];
	    var item = _this.store[_resourceName].index[_id];
	    if (item) {
	      var relationFields = definition.relationFields || [];
	      var previousAttributes = {};
	      for (var key in item) {
	        if (relationFields.indexOf(key) === -1) {
	          previousAttributes[key] = _utils2.default.copy(item[key], null, null, null, []);
	        }
	      }
	      resource.previousAttributes[_id] = previousAttributes;
	    }
	
	    if (resource.changeHistories[_id].length) {
	      _utils2.default.forEach(resource.changeHistories[_id], function (changeRecord) {
	        _utils2.default.remove(resource.changeHistory, changeRecord);
	      });
	      resource.changeHistories[_id].splice(0, resource.changeHistories[_id].length);
	    }
	    return item;
	  },
	
	
	  // Re-compute the computed properties of the given item.
	  //
	  // @param resourceName The name of the type of resource of the item whose computed properties are to be re-computed.
	  // @param instance The instance whose computed properties are to be re-computed.
	  // @returns The item whose computed properties were re-computed.
	  compute: function compute(resourceName, instance) {
	    var _this = this;
	    var definition = _this.definitions[resourceName];
	
	    instance = _utils2.default.resolveItem(_this.store[resourceName], instance);
	    if (!definition) {
	      throw new NER(resourceName);
	    } else if (!instance) {
	      throw new R('Item not in the store!');
	    } else if (!_utils2.default._o(instance) && !_utils2.default._sn(instance)) {
	      throw new IA('"instance" must be an object, string or number!');
	    }
	
	    definition.logFn('compute', instance);
	
	    // re-compute all computed properties
	    _utils2.default.forOwn(definition.computed, function (fn, field) {
	      _utils2.default.compute.call(instance, fn, field);
	    });
	    return instance;
	  },
	
	
	  // Factory function to create an instance of the specified Resource.
	  //
	  // @param resourceName The name of the type of resource of which to create an instance.
	  // @param attrs Hash of properties with which to initialize the instance.
	  // @param options Optional configuration.
	  // @param options.defaultValues Default values with which to initialize the instance.
	  // @returns The new instance.
	  createInstance: function createInstance(resourceName, attrs, options) {
	    var definition = this.definitions[resourceName];
	    var item = void 0;
	
	    attrs = attrs || {};
	
	    if (!definition) {
	      throw new NER(resourceName);
	    } else if (attrs && !_utils2.default.isObject(attrs)) {
	      throw new IA('"attrs" must be an object!');
	    }
	
	    options = _utils2.default._(definition, options);
	
	    var relationList = definition.relationList || [];
	    if (relationList.length) {
	      _utils2.default.forEach(relationList, function (def) {
	        var relationData = _utils2.default.get(attrs, def.localField);
	        if (relationData) {
	          if (_utils2.default.isArray(relationData)) {
	            (function () {
	              var array = [];
	              var Resource = definition.getResource(def.relation);
	              var _options = options.orig();
	              _utils2.default.forEach(relationData, function (relationDataItem) {
	                array.push(Resource.createInstance(relationDataItem, _options));
	              });
	              _utils2.default.set(attrs, def.localField, array);
	            })();
	          } else if (_utils2.default.isObject(relationData)) {
	            _utils2.default.set(attrs, def.localField, definition.getResource(def.relation).createInstance(relationData, options.orig()));
	          }
	        }
	      });
	    }
	
	    options.logFn('createInstance', attrs, options);
	
	    // lifecycle
	    options.beforeCreateInstance(options, attrs);
	
	    // grab instance constructor function from Resource definition
	    var Constructor = definition[definition.class];
	
	    // create instance
	    item = new Constructor();
	
	    if (definition.instanceEvents) {
	      _utils2.default.Events(item);
	    }
	
	    // add default values
	    if (options.defaultValues) {
	      _utils2.default.deepMixIn(item, _utils2.default.copy(options.defaultValues));
	    }
	    _utils2.default.deepMixIn(item, attrs);
	
	    // compute computed properties
	    if (definition.computed) {
	      definition.compute(item);
	    }
	    // lifecycle
	    options.afterCreateInstance(options, item);
	    return item;
	  },
	
	
	  // Create a new collection of the specified Resource.
	  //
	  // @param resourceName The name of the type of resource of which to create a collection
	  // @param arr Possibly empty array of data from which to create the collection.
	  // @param params The criteria by which to filter items. Will be passed to `DS#findAll` if `fetch` is called. See http://www.js-data.io/docs/query-syntax
	  // @param options Optional configuration.
	  // @param options.notify Whether to call the beforeCreateCollection and afterCreateCollection lifecycle hooks..
	  // @returns The new collection.
	  createCollection: function createCollection(resourceName, arr, params, options) {
	    var _this = this;
	    var definition = _this.definitions[resourceName];
	
	    arr = arr || [];
	    params = params || {};
	
	    if (!definition) {
	      throw new NER(resourceName);
	    } else if (arr && !_utils2.default.isArray(arr)) {
	      throw new IA('"arr" must be an array!');
	    }
	
	    options = _utils2.default._(definition, options);
	
	    options.logFn('createCollection', arr, options);
	
	    // lifecycle
	    options.beforeCreateCollection(options, arr);
	
	    // define the API for this collection
	    Object.defineProperties(arr, {
	      //  Call DS#findAll with the params of this collection, filling the collection with the results.
	      fetch: {
	        value: function value(params, options) {
	          var __this = this;
	          __this.params = params || __this.params;
	          return definition.findAll(__this.params, options).then(function (data) {
	            if (data === __this) {
	              return __this;
	            }
	            data.unshift(__this.length);
	            data.unshift(0);
	            __this.splice.apply(__this, data);
	            data.shift();
	            data.shift();
	            if (data.$$injected) {
	              _this.store[resourceName].queryData[_utils2.default.toJson(__this.params)] = __this;
	              __this.$$injected = true;
	            }
	            return __this;
	          });
	        }
	      },
	      // params for this collection. See http://www.js-data.io/docs/query-syntax
	      params: {
	        value: params,
	        writable: true
	      },
	      // name of the resource type of this collection
	      resourceName: {
	        value: resourceName
	      }
	    });
	
	    // lifecycle
	    options.afterCreateCollection(options, arr);
	    return arr;
	  },
	
	  defineResource: __webpack_require__(42),
	  digest: function digest() {
	    this.observe.Platform.performMicrotaskCheckpoint();
	  },
	
	  eject: __webpack_require__(43),
	  ejectAll: __webpack_require__(44),
	  filter: __webpack_require__(45),
	
	  // Return the item with the given primary key if its in the store.
	  //
	  // @param resourceName The name of the type of resource of the item to retrieve.
	  // @param id The primary key of the item to retrieve.
	  // @returns The item with the given primary key if it's in the store.
	  // /
	  get: function get(resourceName, id) {
	    var _check$call4 = check.call(this, 'get', resourceName, id);
	
	    var _this = _check$call4._this;
	    var _resourceName = _check$call4._resourceName;
	    var _id = _check$call4._id;
	
	    // return the item if it exists
	
	    return _this.store[_resourceName].index[_id];
	  },
	
	
	  // Return the items in the store that have the given primary keys.
	  //
	  // @param resourceName The name of the type of resource of the items to retrieve.
	  // @param ids The primary keys of the items to retrieve.
	  // @returns The items with the given primary keys if they're in the store.
	  getAll: function getAll(resourceName, ids) {
	    var _this = this;
	    var definition = _this.definitions[resourceName];
	    var resource = _this.store[resourceName];
	    var collection = [];
	
	    if (!definition) {
	      throw new NER(resourceName);
	    } else if (ids && !_utils2.default._a(ids)) {
	      throw _utils2.default._aErr('ids');
	    }
	
	    definition.logFn('getAll', ids);
	
	    if (_utils2.default._a(ids)) {
	      // return just the items with the given primary keys
	      var length = ids.length;
	      for (var i = 0; i < length; i++) {
	        if (resource.index[ids[i]]) {
	          collection.push(resource.index[ids[i]]);
	        }
	      }
	    } else {
	      // most efficient of retrieving ALL items from the store
	      collection = resource.collection.slice();
	    }
	
	    return collection;
	  },
	
	
	  // Return the whether the item with the given primary key has any changes.
	  //
	  // @param resourceName The name of the type of resource of the item.
	  // @param id The primary key of the item.
	  // @returns Whether the item with the given primary key has any changes.
	  hasChanges: function hasChanges(resourceName, id) {
	    var _check$call5 = check.call(this, 'hasChanges', resourceName, id);
	
	    var definition = _check$call5.definition;
	    var _id = _check$call5._id;
	
	
	    return definition.get(_id) ? diffIsEmpty(definition.changes(_id)) : false;
	  },
	
	  inject: __webpack_require__(46),
	
	  // Return whether the item with the given primary key is a temporary item.
	  //
	  // @param resourceName The name of the type of resource of the item.
	  // @param id The primary key of the item.
	  // @returns Whether the item with the given primary key is a temporary item.
	  isNew: function isNew(resourceName, id) {
	    var _check$call6 = check.call(this, 'isNew', resourceName, id || fakeId);
	
	    var _this = _check$call6._this;
	    var _resourceName = _check$call6._resourceName;
	    var _id = _check$call6._id;
	
	    var resource = _this.store[_resourceName];
	
	    return !!resource.temporaryItems[_id];
	  },
	
	
	  // Return the timestamp from the last time the item with the given primary key was changed.
	  //
	  // @param resourceName The name of the type of resource of the item.
	  // @param id The primary key of the item.
	  // @returns Timestamp from the last time the item was changed.
	  lastModified: function lastModified(resourceName, id) {
	    var _check$call7 = check.call(this, 'lastModified', resourceName, id || fakeId);
	
	    var _this = _check$call7._this;
	    var _resourceName = _check$call7._resourceName;
	    var _id = _check$call7._id;
	
	    var resource = _this.store[_resourceName];
	
	    if (_id) {
	      if (!(_id in resource.modified)) {
	        resource.modified[_id] = 0;
	      }
	      return resource.modified[_id];
	    }
	    return resource.collectionModified;
	  },
	
	
	  // Return the timestamp from the last time the item with the given primary key was saved via an adapter.
	  //
	  // @param resourceName The name of the type of resource of the item.
	  // @param id The primary key of the item.
	  // @returns Timestamp from the last time the item was saved.
	  lastSaved: function lastSaved(resourceName, id) {
	    var _check$call8 = check.call(this, 'lastSaved', resourceName, id || fakeId);
	
	    var _this = _check$call8._this;
	    var _resourceName = _check$call8._resourceName;
	    var _id = _check$call8._id;
	
	    var resource = _this.store[_resourceName];
	
	    if (!(_id in resource.saved)) {
	      resource.saved[_id] = 0;
	    }
	    return resource.saved[_id];
	  },
	
	
	  // Return the previous attributes of the item with the given primary key before it was changed.
	  //
	  // @param resourceName The name of the type of resource of the item.
	  // @param id The primary key of the item.
	  // @returns The previous attributes of the item
	  previous: function previous(resourceName, id) {
	    var _check$call9 = check.call(this, 'previous', resourceName, id);
	
	    var _this = _check$call9._this;
	    var _resourceName = _check$call9._resourceName;
	    var _id = _check$call9._id;
	
	    var resource = _this.store[_resourceName];
	
	    // return resource from cache
	    return resource.previousAttributes[_id] ? _utils2.default.copy(resource.previousAttributes[_id]) : undefined;
	  },
	
	
	  // Revert all attributes of the item with the given primary key to their previous values.
	  //
	  // @param resourceName The name of the type of resource of the item.
	  // @param id The primary key of the item.
	  // @param options Optional configuration.
	  // @returns The reverted item
	  revert: function revert(resourceName, id, options) {
	    var _check$call10 = check.call(this, 'revert', resourceName, id, options);
	
	    var _this = _check$call10._this;
	    var definition = _check$call10.definition;
	    var _resourceName = _check$call10._resourceName;
	    var _id = _check$call10._id;
	    var _options = _check$call10._options;
	
	
	    var preserve = _options.preserve || [];
	    var injectObj = {};
	
	    if (preserve.length === 0) {
	      injectObj = _this.previous(_resourceName, _id);
	    } else {
	      var _ret3 = function () {
	        var instance = definition.get(id);
	        var previousInstance = _this.previous(_resourceName, _id);
	
	        if (!instance) {
	          return {
	            v: void 0
	          };
	        }
	
	        _utils2.default.forOwn(instance, function (value, key) {
	          if (_utils2.default.contains(preserve, key)) {
	            injectObj[key] = instance[key];
	          } else {
	            injectObj[key] = previousInstance[key];
	          }
	        });
	      }();
	
	      if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
	    }
	
	    return definition.inject(injectObj, {
	      onConflict: 'replace'
	    });
	  }
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* jshint evil:true, loopfunc:true */
	
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _errors = __webpack_require__(3);
	
	var _errors2 = _interopRequireDefault(_errors);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * These are DS methods that will be proxied by instances. e.g.
	 *
	 * var store = new JSData.DS()
	 * var User = store.defineResource('user')
	 * var user = User.createInstance({ id: 1 })
	 *
	 * store.update(resourceName, id, attrs[, options]) // DS method
	 * User.update(id, attrs[, options]) // DS method proxied on a Resource
	 * user.DSUpdate(attrs[, options]) // DS method proxied on an Instance
	 */
	var instanceMethods = ['compute', 'eject', 'refresh', 'save', 'update', 'destroy', 'loadRelations', 'changeHistory', 'changes', 'commit', 'hasChanges', 'isNew', 'lastModified', 'lastSaved', 'previous', 'revert'];
	
	module.exports = function defineResource(definition) {
	  var _this = this;
	  var definitions = _this.definitions;
	
	  /**
	   * This allows the name-only definition shorthand.
	   * store.defineResource('user') is the same as store.defineResource({ name: 'user'})
	   */
	  if (_utils2.default._s(definition)) {
	    definition = {
	      name: definition.replace(/\s/gi, '')
	    };
	  }
	  if (!_utils2.default._o(definition)) {
	    throw _utils2.default._oErr('definition');
	  } else if (!_utils2.default._s(definition.name)) {
	    throw new _errors2.default.IA('"name" must be a string!');
	  } else if (definitions[definition.name]) {
	    throw new _errors2.default.R(definition.name + ' is already registered!');
	  }
	
	  /**
	   * Dynamic Resource constructor function.
	   *
	   * A Resource inherits from the defaults of the data store that created it.
	   */
	  function Resource(options) {
	    this.defaultValues = {};
	    this.methods = {};
	    this.computed = {};
	    this.scopes = {};
	    this.actions = {};
	    _utils2.default.deepMixIn(this, options);
	    var parent = _this.defaults;
	    if (definition.extends && definitions[definition.extends]) {
	      parent = definitions[definition.extends];
	    }
	    _utils2.default.fillIn(this.defaultValues, parent.defaultValues);
	    _utils2.default.fillIn(this.methods, parent.methods);
	    _utils2.default.fillIn(this.computed, parent.computed);
	    _utils2.default.fillIn(this.scopes, parent.scopes);
	    _utils2.default.fillIn(this.actions, parent.actions);
	    this.endpoint = 'endpoint' in options ? options.endpoint : this.name;
	  }
	
	  try {
	    var def;
	
	    var _class;
	
	    var _ret = function () {
	      // Resources can inherit from another resource instead of inheriting directly from the data store defaults.
	      if (definition.extends && definitions[definition.extends]) {
	        // Inherit from another resource
	        Resource.prototype = definitions[definition.extends];
	      } else {
	        // Inherit from global defaults
	        Resource.prototype = _this.defaults;
	      }
	      definitions[definition.name] = new Resource(definition);
	
	      def = definitions[definition.name];
	
	
	      def.getResource = function (resourceName) {
	        return _this.definitions[resourceName];
	      };
	
	      def.logFn('Preparing resource.');
	
	      if (!_utils2.default._s(def.idAttribute)) {
	        throw new _errors2.default.IA('"idAttribute" must be a string!');
	      }
	
	      // Setup nested parent configuration
	      if (def.relations) {
	        def.relationList = [];
	        def.relationFields = [];
	        _utils2.default.forOwn(def.relations, function (relatedModels, type) {
	          _utils2.default.forOwn(relatedModels, function (defs, relationName) {
	            if (!_utils2.default._a(defs)) {
	              relatedModels[relationName] = [defs];
	            }
	            _utils2.default.forEach(relatedModels[relationName], function (d) {
	              d.type = type;
	              d.relation = relationName;
	              d.name = def.name;
	              def.relationList.push(d);
	              if (d.localField) {
	                def.relationFields.push(d.localField);
	              }
	            });
	          });
	        });
	        if (def.relations.belongsTo) {
	          def.parents = {};
	          _utils2.default.forOwn(def.relations.belongsTo, function (relatedModel, modelName) {
	            _utils2.default.forEach(relatedModel, function (relation) {
	              if (relation.parent) {
	                def.parent = modelName;
	                def.parentKey = relation.localKey;
	                def.parentField = relation.localField;
	                def.parents[modelName] = {
	                  key: def.parentKey,
	                  field: def.parentField
	                };
	              }
	            });
	          });
	        }
	        if (typeof Object.freeze === 'function') {
	          Object.freeze(def.relations);
	          Object.freeze(def.relationList);
	        }
	      }
	
	      // Create the wrapper class for the new resource
	      _class = def['class'] = _utils2.default.pascalCase(def.name);
	
	      try {
	        if (typeof def.useClass === 'function') {
	          if (def.csp) {
	            def[_class] = function () {
	              def.useClass.call(this);
	            };
	          } else {
	            def[_class] = new Function('def', 'return function ' + _class + '() { def.useClass.call(this); }')(def); // eslint-disable-line
	          }
	          def[_class].prototype = function (proto) {
	            function Ctor() {}
	
	            Ctor.prototype = proto;
	            return new Ctor();
	          }(def.useClass.prototype);
	        } else if (def.csp) {
	          def[_class] = function () {};
	        } else {
	          def[_class] = new Function('return function ' + _class + '() {}')(); // eslint-disable-line
	        }
	      } catch (e) {
	        def[_class] = function () {};
	      }
	
	      // Apply developer-defined instance methods
	      _utils2.default.forOwn(def.methods, function (fn, m) {
	        def[_class].prototype[m] = fn;
	      });
	
	      /**
	       * var user = User.createInstance({ id: 1 })
	       * user.set('foo', 'bar')
	       */
	      def[_class].prototype.set = function (key, value) {
	        var _this2 = this;
	
	        _utils2.default.set(this, key, value);
	        def.compute(this);
	        if (def.instanceEvents) {
	          setTimeout(function () {
	            _this2.emit('DS.change', def, _this2);
	          }, 0);
	        }
	        def.handleChange(this);
	        return this;
	      };
	
	      /**
	       * var user = User.createInstance({ id: 1 })
	       * user.get('id') // 1
	       */
	      def[_class].prototype.get = function (key) {
	        return _utils2.default.get(this, key);
	      };
	
	      // Setup the relation links
	      _utils2.default.applyRelationGettersToTarget(_this, def, def[_class].prototype);
	
	      var parentOmit = null;
	      if (!def.hasOwnProperty('omit')) {
	        parentOmit = def.omit;
	        def.omit = [];
	      } else {
	        parentOmit = _this.defaults.omit;
	      }
	      def.omit = def.omit.concat(parentOmit || []);
	
	      // Prepare for computed properties
	      _utils2.default.forOwn(def.computed, function (fn, field) {
	        if (_utils2.default.isFunction(fn)) {
	          def.computed[field] = [fn];
	          fn = def.computed[field];
	        }
	        if (def.methods && field in def.methods) {
	          def.errorFn('Computed property "' + field + '" conflicts with previously defined prototype method!');
	        }
	        def.omit.push(field);
	        if (_utils2.default.isArray(fn)) {
	          var deps;
	          if (fn.length === 1) {
	            var match = fn[0].toString().match(/function.*?\(([\s\S]*?)\)/);
	            deps = match[1].split(',');
	            deps = _utils2.default.filter(deps, function (x) {
	              return x;
	            });
	            def.computed[field] = deps.concat(fn);
	            fn = def.computed[field];
	            if (deps.length) {
	              def.errorFn('Use the computed property array syntax for compatibility with minified code!');
	            }
	          }
	          deps = fn.slice(0, fn.length - 1);
	          _utils2.default.forEach(deps, function (val, index) {
	            deps[index] = val.trim();
	          });
	          fn.deps = _utils2.default.filter(deps, function (dep) {
	            return !!dep;
	          });
	        } else if (_utils2.default.isObject(fn)) {
	          Object.defineProperty(def[_class].prototype, field, fn);
	        }
	      });
	
	      // add instance proxies of DS methods
	      _utils2.default.forEach(instanceMethods, function (name) {
	        def[_class].prototype['DS' + _utils2.default.pascalCase(name)] = function () {
	          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }
	
	          args.unshift(this[def.idAttribute] || this);
	          args.unshift(def.name);
	          return _this[name].apply(_this, args);
	        };
	      });
	
	      // manually add instance proxy for DS#create
	      def[_class].prototype.DSCreate = function () {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          args[_key2] = arguments[_key2];
	        }
	
	        args.unshift(this);
	        args.unshift(def.name);
	        return _this.create.apply(_this, args);
	      };
	
	      // Initialize store data for the new resource
	      _this.store[def.name] = {
	        collection: [],
	        expiresHeap: new _utils2.default.BinaryHeap(function (x) {
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
	        collectionModified: 0,
	        temporaryItems: {}
	      };
	
	      var resource = _this.store[def.name];
	
	      // start the reaping
	      if (def.reapInterval) {
	        setInterval(function () {
	          return def.reap();
	        }, def.reapInterval);
	      }
	
	      // proxy DS methods with shorthand ones
	      var fns = ['registerAdapter', 'getAdapterName', 'getAdapter', 'is', '!clear'];
	      for (var key in _this) {
	        if (typeof _this[key] === 'function') {
	          fns.push(key);
	        }
	      }
	
	      /**
	       * Create the Resource shorthands that proxy DS methods. e.g.
	       *
	       * var store = new JSData.DS()
	       * var User = store.defineResource('user')
	       *
	       * store.update(resourceName, id, attrs[, options]) // DS method
	       * User.update(id, attrs[, options]) // DS method proxied on a Resource
	       */
	      _utils2.default.forEach(fns, function (key) {
	        var k = key;
	        if (k[0] === '!') {
	          return;
	        }
	        if (_this[k].shorthand !== false) {
	          def[k] = function () {
	            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	              args[_key3] = arguments[_key3];
	            }
	
	            args.unshift(def.name);
	            return _this[k].apply(_this, args);
	          };
	          def[k].before = function (fn) {
	            var orig = def[k];
	            def[k] = function () {
	              for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	                args[_key4] = arguments[_key4];
	              }
	
	              return orig.apply(def, fn.apply(def, args) || args);
	            };
	          };
	        } else {
	          def[k] = function () {
	            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	              args[_key5] = arguments[_key5];
	            }
	
	            return _this[k].apply(_this, args);
	          };
	        }
	      });
	
	      def.beforeValidate = _utils2.default.promisify(def.beforeValidate);
	      def.validate = _utils2.default.promisify(def.validate);
	      def.afterValidate = _utils2.default.promisify(def.afterValidate);
	      def.beforeCreate = _utils2.default.promisify(def.beforeCreate);
	      def.afterCreate = _utils2.default.promisify(def.afterCreate);
	      def.afterFind = _utils2.default.promisify(def.afterFind);
	      def.afterFindAll = _utils2.default.promisify(def.afterFindAll);
	      def.afterLoadRelations = _utils2.default.promisify(def.afterLoadRelations);
	      def.beforeUpdate = _utils2.default.promisify(def.beforeUpdate);
	      def.afterUpdate = _utils2.default.promisify(def.afterUpdate);
	      def.beforeDestroy = _utils2.default.promisify(def.beforeDestroy);
	      def.afterDestroy = _utils2.default.promisify(def.afterDestroy);
	
	      var defaultAdapter = void 0;
	      if (def.hasOwnProperty('defaultAdapter')) {
	        defaultAdapter = def.defaultAdapter;
	      }
	
	      // setup "actions"
	      _utils2.default.forOwn(def.actions, function (action, name) {
	        if (def[name] && !def.actions[name]) {
	          throw new Error('Cannot override existing method "' + name + '"!');
	        }
	        action.request = action.request || function (config) {
	          return config;
	        };
	        action.response = action.response || function (response) {
	          return response;
	        };
	        action.responseError = action.responseError || function (err) {
	          return _utils2.default.Promise.reject(err);
	        };
	        def[name] = function (id, options) {
	          if (_utils2.default._o(id)) {
	            options = id;
	          }
	          options = options || {};
	          var adapter = def.getAdapter(action.adapter || defaultAdapter || 'http');
	          var config = _utils2.default.deepMixIn({}, action);
	          if (!options.hasOwnProperty('endpoint') && config.endpoint) {
	            options.endpoint = config.endpoint;
	          }
	          if (typeof options.getEndpoint === 'function') {
	            config.url = options.getEndpoint(def, options);
	          } else {
	            var _args = [options.basePath || def.basePath || adapter.defaults.basePath, adapter.getEndpoint(def, _utils2.default._sn(id) ? id : null, options)];
	            if (_utils2.default._sn(id)) {
	              _args.push(id);
	            }
	            _args.push(action.pathname || name);
	            config.url = _utils2.default.makePath.apply(null, _args);
	          }
	          config.method = config.method || 'GET';
	          config.resourceName = def.name;
	          _utils2.default.deepMixIn(config, options);
	          return new _utils2.default.Promise(function (resolve) {
	            return resolve(config);
	          }).then(options.request || action.request).then(function (config) {
	            return adapter.HTTP(config);
	          }).then(function (data) {
	            if (data && data.config) {
	              data.config.resourceName = def.name;
	            }
	            return data;
	          }).then(options.response || action.response, options.responseError || action.responseError);
	        };
	      });
	
	      // mix in events
	      _utils2.default.Events(def);
	
	      def.handleChange = function (data) {
	        resource.collectionModified = _utils2.default.updateTimestamp(resource.collectionModified);
	        if (def.notify) {
	          setTimeout(function () {
	            def.emit('DS.change', def, data);
	          }, 0);
	        }
	      };
	
	      def.logFn('Done preparing resource.');
	
	      return {
	        v: def
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  } catch (err) {
	    _this.defaults.errorFn(err);
	    delete definitions[definition.name];
	    delete _this.store[definition.name];
	    throw err;
	  }
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/* jshint eqeqeq:false */
	/**
	 * Eject an item from the store, if it is currently in the store.
	 *
	 * @param resourceName The name of the resource type of the item eject.
	 * @param id The primary key of the item to eject.
	 * @param options Optional configuration.
	 * @param options.notify Whether to emit the "DS.beforeEject" and "DS.afterEject" events
	 * @param options.clearEmptyQueries Whether to remove cached findAll queries that become empty as a result of this method call.
	 * @returns The ejected item if one was ejected.
	 */
	module.exports = function eject(resourceName, id, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.definitions[resourceName];
	  var resource = _this.store[resourceName];
	  var item = void 0;
	  var found = false;
	
	  id = DSUtils.resolveId(definition, id);
	
	  if (!definition) {
	    throw new _this.errors.NER(resourceName);
	  } else if (!DSUtils._sn(id)) {
	    throw DSUtils._snErr('id');
	  }
	
	  options = DSUtils._(definition, options);
	
	  options.logFn('eject', id, options);
	
	  // find the item to eject
	  for (var i = 0; i < resource.collection.length; i++) {
	    if (resource.collection[i][definition.idAttribute] == id) {
	      // eslint-disable-line
	      item = resource.collection[i];
	      // remove its expiration timestamp
	      resource.expiresHeap.remove(item);
	      found = true;
	      break;
	    }
	  }
	  if (found) {
	    var _ret = function () {
	      // lifecycle
	      definition.beforeEject(options, item);
	      if (options.notify) {
	        definition.emit('DS.beforeEject', definition, item);
	      }
	
	      // find the item in any ($$injected) cached queries
	      var toRemove = [];
	      DSUtils.forOwn(resource.queryData, function (items, queryHash) {
	        if (items.$$injected) {
	          DSUtils.remove(items, item);
	        }
	        // optionally remove any empty queries
	        if (!items.length && options.clearEmptyQueries) {
	          toRemove.push(queryHash);
	        }
	      });
	
	      // clean up
	      DSUtils.forEach(resource.changeHistories[id], function (changeRecord) {
	        DSUtils.remove(resource.changeHistory, changeRecord);
	      });
	      DSUtils.forEach(toRemove, function (queryHash) {
	        delete resource.completedQueries[queryHash];
	        delete resource.queryData[queryHash];
	      });
	      if (resource.observers[id] && typeof resource.observers[id].close === 'function') {
	        // stop observation
	        resource.observers[id].close();
	      }
	      delete resource.observers[id];
	      delete resource.index[id];
	      delete resource.previousAttributes[id];
	      delete resource.completedQueries[id];
	      delete resource.pendingQueries[id];
	      delete resource.changeHistories[id];
	      delete resource.modified[id];
	      delete resource.saved[id];
	      if (definition.instanceEvents && item.off) {
	        item.off();
	      }
	
	      // remove it from the store
	      resource.collection.splice(i, 1);
	      // collection has been modified
	      definition.handleChange(item);
	
	      // lifecycle
	      definition.afterEject(options, item);
	      if (options.notify) {
	        definition.emit('DS.afterEject', definition, item);
	      }
	
	      return {
	        v: item
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Eject a collection of items from the store, if any items currently in the store match the given criteria.
	 *
	 * @param resourceName The name of the resource type of the items eject.
	 * @param params The criteria by which to match items to eject. See http://www.js-data.io/docs/query-syntax
	 * @param options Optional configuration.
	 * @returns The collection of items that were ejected, if any.
	 */
	module.exports = function ejectAll(resourceName, params, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.definitions[resourceName];
	  params = params || {};
	
	  if (!definition) {
	    throw new _this.errors.NER(resourceName);
	  } else if (!DSUtils._o(params)) {
	    throw DSUtils._oErr('params');
	  }
	
	  options = DSUtils._(definition, options);
	  definition.logFn('ejectAll', params, options);
	
	  DSUtils.applyScope(definition, params, options);
	
	  var resource = _this.store[resourceName];
	  var queryHash = DSUtils.toJson(params);
	
	  // get items that match the criteria
	  var items = void 0;
	
	  if (DSUtils.isEmpty(params)) {
	    items = definition.getAll();
	    // remove all completed queries if ejecting all items
	    resource.completedQueries = {};
	  } else {
	    items = definition.filter(params);
	    // remove matching completed query, if any
	    delete resource.completedQueries[queryHash];
	  }
	  // prepare to remove matching items
	  DSUtils.forEach(items, function (item) {
	    if (item && item[definition.idAttribute]) {
	      definition.eject(item[definition.idAttribute], options);
	    }
	  });
	  // collection has been modified
	  definition.handleChange(items);
	  return items;
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Return the subset of items currently in the store that match the given criteria.
	 *
	 * The actual filtering is delegated to DS#defaults.defaultFilter, which can be overridden by developers.
	 *
	 * @param resourceName The name of the resource type of the items to filter.
	 * @param params The criteria by which to filter items. See http://www.js-data.io/docs/query-syntax
	 * @param options Optional configuration.
	 * @returns Matching items.
	 */
	module.exports = function filter(resourceName, params, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.definitions[resourceName];
	
	  if (!definition) {
	    throw new _this.errors.NER(resourceName);
	  } else if (params && !DSUtils._o(params)) {
	    throw DSUtils._oErr('params');
	  }
	
	  // Protect against null
	  params = params || {};
	  options = DSUtils._(definition, options);
	  options.logFn('filter', params, options);
	
	  DSUtils.applyScope(definition, params, options);
	
	  // delegate filtering to DS#defaults.defaultFilter, which can be overridden by developers.
	  return definition.defaultFilter.call(_this, _this.store[resourceName].collection, resourceName, params, options);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _errors = __webpack_require__(3);
	
	var _errors2 = _interopRequireDefault(_errors);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * This is a beast of a file, but it's where a significant portion of the magic happens.
	 *
	 * DS#inject makes up the core of how data gets into the store.
	 */
	
	/**
	 * This factory function produces an observer handler function tailor-made for the current item being injected.
	 *
	 * The observer handler is what allows computed properties and change tracking to function.
	 *
	 * @param definition Resource definition produced by DS#defineResource
	 * @param resource Resource data as internally stored by the data store
	 * @returns {Function} Observer handler function
	 * @private
	 */
	function makeObserverHandler(definition, resource) {
	  var DS = this;
	
	  // using "var" avoids a JSHint error
	  var name = definition.name;
	
	  /**
	   * This will be called by observe-js when a new change record is available for the observed object
	   *
	   * @param added Change record for added properties
	   * @param removed Change record for removed properties
	   * @param changed Change record for changed properties
	   * @param oldValueFn Function that can be used to get the previous value of a changed property
	   * @param firstTime Whether this is the first time this function is being called for the given item. Will only be true once.
	   */
	  return function _react(added, removed, changed, oldValueFn, firstTime) {
	    var target = this;
	    var item = void 0;
	
	    // Get the previous primary key of the observed item, in-case some knucklehead changed it
	    var innerId = oldValueFn && oldValueFn(definition.idAttribute) ? oldValueFn(definition.idAttribute) : target[definition.idAttribute];
	
	    // Ignore changes to relation links
	    _utils2.default.forEach(definition.relationFields, function (field) {
	      delete added[field];
	      delete removed[field];
	      delete changed[field];
	    });
	
	    // Detect whether there are actually any changes
	    if (!_utils2.default.isEmpty(added) || !_utils2.default.isEmpty(removed) || !_utils2.default.isEmpty(changed) || firstTime) {
	      item = DS.get(name, innerId);
	
	      // update item and collection "modified" timestamps
	      resource.modified[innerId] = _utils2.default.updateTimestamp(resource.modified[innerId]);
	
	      if (item && definition.instanceEvents) {
	        setTimeout(function () {
	          item.emit('DS.change', definition, item);
	        }, 0);
	      }
	
	      definition.handleChange(item);
	
	      // Save a change record for the item
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
	
	    // Recompute computed properties if any computed properties depend on changed properties
	    if (definition.computed) {
	      item = item || DS.get(name, innerId);
	      _utils2.default.forOwn(definition.computed, function (fn, field) {
	        if (_utils2.default._o(fn)) {
	          return;
	        }
	        var compute = false;
	        // check if required fields changed
	        _utils2.default.forEach(fn.deps, function (dep) {
	          if (dep in added || dep in removed || dep in changed || !(field in item)) {
	            compute = true;
	          }
	        });
	        compute = compute || !fn.deps.length;
	        if (compute) {
	          _utils2.default.compute.call(item, fn, field);
	        }
	      });
	    }
	
	    if (definition.idAttribute in changed) {
	      definition.errorFn('Doh! You just changed the primary key of an object! Your data for the "' + name + '" resource is now in an undefined (probably broken) state.');
	    }
	  };
	}
	
	/**
	 * A recursive function for injecting data into the store.
	 *
	 * @param definition Resource definition produced by DS#defineResource
	 * @param resource Resource data as internally stored by the data store
	 * @param attrs The data to be injected. Will be an object or an array of objects.
	 * @param options Optional configuration.
	 * @returns The injected data
	 * @private
	 */
	function _inject(definition, resource, attrs, options) {
	  var _this = this;
	  var injected = void 0;
	
	  if (_utils2.default._a(attrs)) {
	    // have an array of objects, go ahead and inject each one individually and return the resulting array
	    injected = [];
	    for (var i = 0; i < attrs.length; i++) {
	      injected.push(_inject.call(_this, definition, resource, attrs[i], options));
	    }
	  } else {
	    // check if "idAttribute" is a computed property
	    var c = definition.computed;
	    var idA = definition.idAttribute;
	    // compute the primary key if necessary
	    if (c && c[idA]) {
	      (function () {
	        var args = [];
	        _utils2.default.forEach(c[idA].deps, function (dep) {
	          args.push(attrs[dep]);
	        });
	        attrs[idA] = c[idA][c[idA].length - 1].apply(attrs, args);
	      })();
	    } else if (options.temporary) {
	      attrs[idA] = _utils2.default.guid();
	    }
	
	    if (!(idA in attrs)) {
	      var error = new _errors2.default.R(definition.name + '.inject: "attrs" must contain the property specified by "idAttribute"!');
	      options.errorFn(error);
	      throw error;
	    } else {
	      try {
	        (function () {
	          // when injecting object that contain their nested relations, this code
	          // will recursively inject them into their proper places in the data store.
	          // Magic!
	          _utils2.default.forEach(definition.relationList, function (def) {
	            var relationName = def.relation;
	            var relationDef = _this.definitions[relationName];
	            var toInject = attrs[def.localField];
	            if (typeof def.inject === 'function') {
	              def.inject(definition, def, attrs);
	            } else if (toInject && def.inject !== false) {
	              if (!relationDef) {
	                throw new _errors2.default.R(definition.name + ' relation is defined but the resource is not!');
	              }
	              // handle injecting hasMany relations
	              if (_utils2.default._a(toInject)) {
	                (function () {
	                  var items = [];
	                  _utils2.default.forEach(toInject, function (toInjectItem) {
	                    if (toInjectItem !== _this.store[relationName].index[toInjectItem[relationDef.idAttribute]]) {
	                      try {
	                        var injectedItem = relationDef.inject(toInjectItem, options.orig());
	                        if (def.foreignKey) {
	                          _utils2.default.set(injectedItem, def.foreignKey, attrs[definition.idAttribute]);
	                        }
	                        items.push(injectedItem);
	                      } catch (err) {
	                        options.errorFn(err, 'Failed to inject ' + def.type + ' relation: "' + relationName + '"!');
	                      }
	                    }
	                  });
	                })();
	              } else {
	                // handle injecting belongsTo and hasOne relations
	                if (toInject !== _this.store[relationName].index[toInject[relationDef.idAttribute]]) {
	                  try {
	                    var _injected = relationDef.inject(attrs[def.localField], options.orig());
	                    if (def.foreignKey) {
	                      _utils2.default.set(_injected, def.foreignKey, attrs[definition.idAttribute]);
	                    }
	                    if (def.localKey) {
	                      _utils2.default.set(attrs, def.localKey, _utils2.default.get(_injected, relationDef.idAttribute));
	                    }
	                  } catch (err) {
	                    options.errorFn(err, 'Failed to inject ' + def.type + ' relation: "' + relationName + '"!');
	                  }
	                }
	              }
	            }
	          });
	
	          // primary key of item being injected
	          var id = attrs[idA];
	          // item being injected
	          var item = definition.get(id);
	          // 0 if the item is new, otherwise the previous last modified timestamp of the item
	          var initialLastModified = item ? resource.modified[id] : 0;
	
	          // item is new
	          if (!item) {
	            if (attrs instanceof definition[definition['class']]) {
	              item = attrs;
	            } else {
	              item = new definition[definition['class']]();
	              if (options.applyDefaultsOnInject && options.defaultValues) {
	                _utils2.default.deepMixIn(item, _utils2.default.copy(options.defaultValues));
	              }
	            }
	
	            if (definition.instanceEvents && typeof item.emit !== 'function') {
	              _utils2.default.Events(item);
	            }
	            // remove relation properties from the item, since those relations have been injected by now
	            _utils2.default.forEach(definition.relationList, function (def) {
	              if (typeof def.link === 'boolean' ? def.link : !!definition.linkRelations) {
	                delete attrs[def.localField];
	              }
	            });
	
	            // copy remaining properties to the injected item
	            _utils2.default.deepMixIn(item, attrs);
	
	            // add item to collection
	            resource.collection.push(item);
	            resource.changeHistories[id] = [];
	
	            // create the observer handler for the data to be injected
	            var _react = makeObserverHandler.call(_this, definition, resource);
	
	            // If we're in the browser, start observation
	            if (definition.watchChanges) {
	              resource.observers[id] = new _this.observe.ObjectObserver(item);
	              resource.observers[id].open(_react, item);
	            }
	
	            // index item
	            resource.index[id] = item;
	            // fire observation handler for the first time
	            _react.call(item, {}, {}, {}, null, true);
	            // save "previous" attributes of the injected item, for change diffs later
	            resource.previousAttributes[id] = _utils2.default.copy(item, null, null, null, definition.relationFields);
	            // mark item as temporary if guid has been generated
	            if (options.temporary) {
	              resource.temporaryItems[id] = true;
	            }
	          } else {
	            // item is being re-injected
	            // new properties take precedence
	            if (options.onConflict === 'merge') {
	              _utils2.default.deepMixIn(item, attrs);
	              _utils2.default.forOwn(definition.computed, function (fn, field) {
	                _utils2.default.compute.call(item, fn, field);
	              });
	            } else if (options.onConflict === 'replace') {
	              _utils2.default.forOwn(definition.computed, function (fn, field) {
	                _utils2.default.compute.call(attrs, fn, field);
	              });
	              _utils2.default.forOwn(item, function (v, k) {
	                if (k !== definition.idAttribute) {
	                  if (!attrs.hasOwnProperty(k)) {
	                    delete item[k];
	                  }
	                }
	              });
	              _utils2.default.forOwn(attrs, function (v, k) {
	                if (k !== definition.idAttribute) {
	                  item[k] = v;
	                }
	              });
	            }
	
	            if (definition.resetHistoryOnInject) {
	              // clear change history for item
	              _this.commit(definition.name, id);
	            }
	            if (resource.observers[id] && typeof resource.observers[id] === 'function') {
	              // force observation callback to be fired if there are any changes to the item and `Object.observe` is not available
	              resource.observers[id].deliver();
	            }
	          }
	          // update modified timestamp of item
	          resource.modified[id] = initialLastModified && resource.modified[id] === initialLastModified ? _utils2.default.updateTimestamp(resource.modified[id]) : resource.modified[id];
	
	          // reset expiry tracking for item
	          resource.expiresHeap.remove(item);
	          var timestamp = new Date().getTime();
	          resource.expiresHeap.push({
	            item: item,
	            timestamp: timestamp,
	            expires: definition.maxAge ? timestamp + definition.maxAge : Number.MAX_VALUE
	          });
	
	          // final injected item
	          injected = item;
	        })();
	      } catch (err) {
	        options.errorFn(err, attrs);
	      }
	    }
	  }
	  return injected;
	}
	
	/**
	 * Inject the given object or array of objects into the data store.
	 *
	 * @param resourceName The name of the type of resource of the data to be injected.
	 * @param attrs Object or array of objects. Objects must contain a primary key.
	 * @param options Optional configuration.
	 * @param options.notify Whether to emit the "DS.beforeInject" and "DS.afterInject" events.
	 * @returns The injected data.
	 */
	module.exports = function inject(resourceName, attrs, options) {
	  var _this = this;
	  var definition = _this.definitions[resourceName];
	  var resource = _this.store[resourceName];
	  var injected = void 0;
	
	  if (!definition) {
	    throw new _errors2.default.NER(resourceName);
	  } else if (!_utils2.default._o(attrs) && !_utils2.default._a(attrs)) {
	    throw new _errors2.default.IA(resourceName + '.inject: "attrs" must be an object or an array!');
	  }
	
	  options = _utils2.default._(definition, options);
	  options.logFn('inject', attrs, options);
	
	  // lifecycle
	  options.beforeInject(options, attrs);
	  if (options.notify) {
	    definition.emit('DS.beforeInject', definition, attrs);
	  }
	
	  // start the recursive injection of data
	  injected = _inject.call(_this, definition, resource, attrs, options);
	
	  // collection was modified
	  definition.handleChange(injected);
	
	  // lifecycle
	  options.afterInject(options, injected);
	  if (options.notify) {
	    definition.emit('DS.afterInject', definition, injected);
	  }
	
	  return injected;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  create: __webpack_require__(48),
	  destroy: __webpack_require__(49),
	  destroyAll: __webpack_require__(50),
	  find: __webpack_require__(51),
	  findAll: __webpack_require__(52),
	  loadRelations: __webpack_require__(53),
	  reap: __webpack_require__(54),
	  refresh: function refresh(resourceName, id, options) {
	    var _this = this;
	    var DSUtils = _this.utils;
	
	    return new DSUtils.Promise(function (resolve, reject) {
	      var definition = _this.definitions[resourceName];
	      id = DSUtils.resolveId(_this.definitions[resourceName], id);
	      if (!definition) {
	        reject(new _this.errors.NER(resourceName));
	      } else if (!DSUtils._sn(id)) {
	        reject(DSUtils._snErr('id'));
	      } else {
	        options = DSUtils._(definition, options);
	        options.bypassCache = true;
	        options.logFn('refresh', id, options);
	        resolve(_this.get(resourceName, id));
	      }
	    }).then(function (item) {
	      return item ? _this.find(resourceName, id, options) : item;
	    }).catch(_this.errorFn('refresh', resourceName, id, options));
	  },
	  refreshAll: function refreshAll(resourceName, params, options) {
	    var _this = this;
	    var DSUtils = _this.utils;
	    var definition = _this.definitions[resourceName];
	    params = params || {};
	
	    return new DSUtils.Promise(function (resolve, reject) {
	      if (!definition) {
	        reject(new _this.errors.NER(resourceName));
	      } else if (!DSUtils._o(params)) {
	        reject(DSUtils._oErr('params'));
	      } else {
	        options = DSUtils._(definition, options);
	        options.bypassCache = true;
	        options.logFn('refreshAll', params, options);
	        resolve(_this.filter(resourceName, params, options));
	      }
	    }).then(function (existing) {
	      options.bypassCache = true;
	      return _this.findAll(resourceName, params, options).then(function (found) {
	        DSUtils.forEach(existing, function (item) {
	          if (found.indexOf(item) === -1) {
	            definition.eject(item);
	          }
	        });
	        return found;
	      });
	    }).catch(_this.errorFn('refreshAll', resourceName, params, options));
	  },
	
	  save: __webpack_require__(55),
	  update: __webpack_require__(56),
	  updateAll: __webpack_require__(57)
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Using an adapter, create a new item.
	 *
	 * Generally a primary key will NOT be provided in the properties hash,
	 * because the adapter's persistence layer should be generating one.
	 *
	 * @param resourceName The name of the type of resource of the new item.
	 * @param attrs Hash of properties with which to create the new item.
	 * @param options Optional configuration.
	 * @param options.cacheResponse Whether the newly created item as returned by the adapter should be injected into the data store.
	 * @param options.upsert If the properties hash contains a primary key, attempt to call DS#update instead.
	 * @param options.notify Whether to emit the "DS.beforeCreate" and "DS.afterCreate" events.
	 * @param options.beforeValidate Lifecycle hook.
	 * @param options.validate Lifecycle hook.
	 * @param options.afterValidate Lifecycle hook.
	 * @param options.beforeCreate Lifecycle hook.
	 * @param options.afterCreate Lifecycle hook.
	 */
	module.exports = function create(resourceName, attrs, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.definitions[resourceName];
	  var resource = _this.store[resourceName];
	  var adapter = void 0;
	
	  options = options || {};
	  attrs = attrs || {};
	
	  var rejectionError = void 0;
	  if (!definition) {
	    rejectionError = new _this.errors.NER(resourceName);
	  } else if (!DSUtils._o(attrs)) {
	    rejectionError = DSUtils._oErr('attrs');
	  } else {
	    options = DSUtils._(definition, options);
	    if (options.upsert && DSUtils._sn(attrs[definition.idAttribute]) && !resource.temporaryItems[attrs[definition.idAttribute]]) {
	      return _this.update(resourceName, attrs[definition.idAttribute], attrs, options);
	    }
	    options.logFn('create', attrs, options);
	  }
	
	  return new DSUtils.Promise(function (resolve, reject) {
	    if (rejectionError) {
	      reject(rejectionError);
	    } else {
	      resolve(attrs);
	    }
	  })
	  // start lifecycle
	  .then(function (attrs) {
	    return options.beforeValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.validate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.afterValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.beforeCreate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit('DS.beforeCreate', definition, attrs);
	    }
	    adapter = _this.getAdapterName(options);
	    return _this.adapters[adapter].create(definition, DSUtils.omit(attrs, options.omit), options);
	  }).then(function (attrs) {
	    return options.afterCreate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit('DS.afterCreate', definition, attrs);
	    }
	    if (options.cacheResponse) {
	      // injected created intem into the store
	      var created = _this.inject(definition.name, attrs, options.orig());
	      var id = created[definition.idAttribute];
	      // mark item's `find` query as completed, so a subsequent `find` call for this item will resolve immediately
	      var _resource = _this.store[resourceName];
	      _resource.completedQueries[id] = new Date().getTime();
	      _resource.saved[id] = DSUtils.updateTimestamp(_resource.saved[id]);
	      return created;
	    } else {
	      // just return an un-injected instance
	      return _this.createInstance(resourceName, attrs, options);
	    }
	  }).then(function (item) {
	    return DSUtils.respond(item, { adapter: adapter }, options);
	  })['catch'](_this.errorFn('create', resourceName, attrs, options));
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Using an adapter, destroy an item.
	 *
	 * @param resourceName The name of the type of resource of the item to destroy.
	 * @param id The primary key of the item to destroy.
	 * @param options Optional configuration.
	 * @param options.eagerEject Whether to eject the item from the store before the adapter operation completes, re-injecting if the adapter operation fails.
	 * @param options.notify Whether to emit the "DS.beforeDestroy" and "DS.afterDestroy" events.
	 * @param options.beforeDestroy Lifecycle hook.
	 * @param options.afterDestroy Lifecycle hook.
	 * @returns The primary key of the destroyed item.
	 */
	module.exports = function destroy(resourceName, id, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.definitions[resourceName];
	  var item = void 0,
	      adapter = void 0;
	
	  return new DSUtils.Promise(function (resolve, reject) {
	    id = DSUtils.resolveId(definition, id);
	    if (!definition) {
	      reject(new _this.errors.NER(resourceName));
	    } else if (!DSUtils._sn(id)) {
	      reject(DSUtils._snErr('id'));
	    } else {
	      // check if the item is in the store
	      item = definition.get(id) || { id: id };
	      options = DSUtils._(definition, options);
	      options.logFn('destroy', id, options);
	      resolve(item);
	    }
	  })
	  // start lifecycle
	  .then(function (attrs) {
	    return options.beforeDestroy.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit('DS.beforeDestroy', definition, attrs);
	    }
	    // don't wait for the adapter, remove the item from the store
	    if (options.eagerEject) {
	      definition.eject(id);
	    }
	    adapter = definition.getAdapter(options);
	    return adapter.destroy(definition, id, options);
	  }).then(function () {
	    return options.afterDestroy.call(item, options, item);
	  }).then(function (item) {
	    if (options.notify) {
	      definition.emit('DS.afterDestroy', definition, item);
	    }
	    // make sure the item is removed from the store
	    definition.eject(id);
	    return DSUtils.respond(id, { adapter: adapter }, options);
	  })['catch'](function (err) {
	    // rollback by re-injecting the item into the store
	    if (options && options.eagerEject && item) {
	      definition.inject(item, { notify: false });
	    }
	    return _this.errorFn('destroy', resourceName, id, options)(err);
	  });
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Using an adapter, destroy an item.
	 *
	 * @param resourceName The name of the type of resource of the item to destroy.
	 * @param params The criteria by which to filter items to destroy. See http://www.js-data.io/docs/query-syntax
	 * @param options Optional configuration.
	 * @param options.eagerEject Whether to eject the items from the store before the adapter operation completes, re-injecting if the adapter operation fails.
	 * @param options.notify Whether to emit the "DS.beforeDestroy" and "DS.afterDestroy" events.
	 * @param options.beforeDestroy Lifecycle hook.
	 * @param options.afterDestroy Lifecycle hook.
	 * @returns The ejected items, if any.
	 */
	module.exports = function destroyAll(resourceName, params, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.definitions[resourceName];
	  var ejected = void 0,
	      toEject = void 0,
	      adapter = void 0;
	
	  params = params || {};
	
	  return new DSUtils.Promise(function (resolve, reject) {
	    if (!definition) {
	      reject(new _this.errors.NER(resourceName));
	    } else if (!DSUtils._o(params)) {
	      reject(DSUtils._oErr('attrs'));
	    } else {
	      options = DSUtils._(definition, options);
	      options.logFn('destroyAll', params, options);
	      DSUtils.applyScope(definition, params, options);
	      resolve();
	    }
	  }).then(function () {
	    // find items that are to be ejected from the store
	    toEject = definition.defaultFilter.call(_this, resourceName, params);
	    return options.beforeDestroy(options, toEject);
	  }).then(function () {
	    if (options.notify) {
	      definition.emit('DS.beforeDestroy', definition, toEject);
	    }
	    // don't wait for the adapter, remove the items from the store
	    if (options.eagerEject) {
	      ejected = definition.ejectAll(params);
	    }
	    adapter = definition.getAdapterName(options);
	    return _this.adapters[adapter].destroyAll(definition, params, options);
	  }).then(function () {
	    return options.afterDestroy(options, toEject);
	  }).then(function () {
	    if (options.notify) {
	      definition.emit('DS.afterDestroy', definition, toEject);
	    }
	    // make sure items are removed from the store
	    return ejected || definition.ejectAll(params);
	  }).then(function (items) {
	    return DSUtils.respond(items, { adapter: adapter }, options);
	  })['catch'](function (err) {
	    // rollback by re-injecting the items into the store
	    if (options && options.eagerEject && ejected) {
	      definition.inject(ejected, { notify: false });
	    }
	    return _this.errorFn('destroyAll', resourceName, params, options)(err);
	  });
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';
	
	/* jshint -W082 */
	
	/**
	 * Using an adapter, retrieve a single item.
	 *
	 * @param resourceName The of the type of resource of the item to retrieve.
	 * @param id The primary key of the item to retrieve.
	 * @param options Optional configuration.
	 * @param options.bypassCache Whether to ignore any cached item and force the retrieval through the adapter.
	 * @param options.cacheResponse Whether to inject the found item into the data store.
	 * @param options.strictCache Whether to only consider items to be "cached" if they were injected into the store as the result of `find` or `findAll`.
	 * @param options.strategy The retrieval strategy to use.
	 * @param options.findStrategy The retrieval strategy to use. Overrides "strategy".
	 * @param options.fallbackAdapters Array of names of adapters to use if using "fallback" strategy.
	 * @param options.findFallbackAdapters Array of names of adapters to use if using "fallback" strategy. Overrides "fallbackAdapters".
	 * @returns The item.
	 */
	module.exports = function find(resourceName, id, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.definitions[resourceName];
	  var resource = _this.store[resourceName];
	  var adapter = void 0;
	
	  return new DSUtils.Promise(function (resolve, reject) {
	    if (!definition) {
	      reject(new _this.errors.NER(resourceName));
	    } else if (!DSUtils._sn(id)) {
	      reject(DSUtils._snErr('id'));
	    } else {
	      options = DSUtils._(definition, options);
	      options.logFn('find', id, options);
	
	      if (options.params) {
	        options.params = DSUtils.copy(options.params);
	      }
	
	      if (options.bypassCache || !options.cacheResponse) {
	        delete resource.completedQueries[id];
	      }
	
	      var expired = options.maxAge && id in resource.completedQueries && resource.completedQueries[id] + options.maxAge < new Date().getTime();
	
	      if ((!options.findStrictCache || id in resource.completedQueries) && definition.get(id) && !options.bypassCache && !expired) {
	        // resolve immediately with the cached item
	        resolve(definition.get(id));
	      } else {
	        // we're going to delegate to the adapter next
	        delete resource.completedQueries[id];
	        resolve();
	      }
	    }
	  }).then(function (item) {
	    if (!item) {
	      var usePendingFind = DSUtils.isFunction(options.usePendingFind) ? options.usePendingFind.call(this, resourceName, id, options) : options.usePendingFind;
	      if (!(id in resource.pendingQueries) && usePendingFind) {
	        var promise = void 0;
	        var strategy = options.findStrategy || options.strategy;
	
	        // try subsequent adapters if the preceeding one fails
	        if (strategy === 'fallback') {
	          var makeFallbackCall = function makeFallbackCall(index) {
	            adapter = definition.getAdapterName((options.findFallbackAdapters || options.fallbackAdapters)[index]);
	            return _this.adapters[adapter].find(definition, id, options)['catch'](function (err) {
	              index++;
	              if (index < options.fallbackAdapters.length) {
	                return makeFallbackCall(index);
	              } else {
	                return DSUtils.Promise.reject(err);
	              }
	            });
	          };
	
	          promise = makeFallbackCall(0);
	        } else {
	          adapter = definition.getAdapterName(options);
	          // just make a single attempt
	          promise = _this.adapters[adapter].find(definition, id, options);
	        }
	
	        resource.pendingQueries[id] = promise.then(function (data) {
	          return options.afterFind.call(data, options, data);
	        }).then(function (data) {
	          // Query is no longer pending
	          delete resource.pendingQueries[id];
	          if (options.cacheResponse) {
	            // inject the item into the data store
	            var injected = definition.inject(data, options.orig());
	            // mark the item as "cached"
	            resource.completedQueries[id] = new Date().getTime();
	            resource.saved[id] = DSUtils.updateTimestamp(resource.saved[id]);
	            return injected;
	          } else {
	            // just return an un-injected instance
	            return definition.createInstance(data, options.orig());
	          }
	        });
	      }
	      return resource.pendingQueries[id];
	    } else {
	      // resolve immediately with the item
	      return item;
	    }
	  }).then(function (item) {
	    return DSUtils.respond(item, { adapter: adapter }, options);
	  })['catch'](function (err) {
	    if (resource) {
	      delete resource.pendingQueries[id];
	    }
	    return _this.errorFn('find', resourceName, id, options)(err);
	  });
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';
	
	/* jshint -W082 */
	function processResults(data, resourceName, queryHash, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.definitions[resourceName];
	  var resource = _this.store[resourceName];
	  var idAttribute = definition.idAttribute;
	  var date = new Date().getTime();
	
	  data = data || [];
	
	  // Query is no longer pending
	  delete resource.pendingQueries[queryHash];
	  resource.completedQueries[queryHash] = date;
	
	  // Merge the new values into the cache
	  var injected = definition.inject(data, options.orig());
	
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
	    options.errorFn('response is expected to be an array!');
	    resource.completedQueries[injected[idAttribute]] = date;
	  }
	
	  return injected;
	}
	
	/**
	 * Using an adapter, retrieve a collection of items.
	 *
	 * @param resourceName The name of the type of resource of the items to retrieve.
	 * @param params The criteria by which to filter items to retrieve. See http://www.js-data.io/docs/query-syntax
	 * @param options Optional configuration.
	 * @param options.bypassCache Whether to ignore any cached query for these items and force the retrieval through the adapter.
	 * @param options.cacheResponse Whether to inject the found items into the data store.
	 * @returns The items.
	 */
	module.exports = function findAll(resourceName, params, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.definitions[resourceName];
	  var resource = _this.store[resourceName];
	  var queryHash = void 0,
	      adapter = void 0;
	
	  return new DSUtils.Promise(function (resolve, reject) {
	    params = params || {};
	
	    if (!_this.definitions[resourceName]) {
	      reject(new _this.errors.NER(resourceName));
	    } else if (!DSUtils._o(params)) {
	      reject(DSUtils._oErr('params'));
	    } else {
	      options = DSUtils._(definition, options);
	      queryHash = DSUtils.toJson(params);
	      options.logFn('findAll', params, options);
	
	      if (options.params) {
	        options.params = DSUtils.copy(options.params);
	      }
	
	      DSUtils.applyScope(definition, params, options);
	
	      // force a new request
	      if (options.bypassCache || !options.cacheResponse) {
	        delete resource.completedQueries[queryHash];
	        delete resource.queryData[queryHash];
	      }
	
	      var expired = options.maxAge && queryHash in resource.completedQueries && resource.completedQueries[queryHash] + options.maxAge < new Date().getTime();
	
	      if (queryHash in resource.completedQueries && !expired) {
	        if (options.useFilter) {
	          if (options.localKeys) {
	            resolve(definition.getAll(options.localKeys, options.orig()));
	          } else {
	            // resolve immediately by filtering data from the data store
	            resolve(definition.filter(params, options.orig()));
	          }
	        } else {
	          // resolve immediately by returning the cached array from the previously made query
	          resolve(resource.queryData[queryHash]);
	        }
	      } else {
	        resolve();
	      }
	    }
	  }).then(function (items) {
	    if (!items) {
	      var usePendingFindAll = DSUtils.isFunction(options.usePendingFindAll) ? options.usePendingFindAll.call(this, resourceName, params, options) : options.usePendingFindAll;
	      if (!(queryHash in resource.pendingQueries) && usePendingFindAll) {
	        var promise = void 0;
	        var strategy = options.findAllStrategy || options.strategy;
	
	        // try subsequent adapters if the preceeding one fails
	        if (strategy === 'fallback') {
	          var makeFallbackCall = function makeFallbackCall(index) {
	            adapter = definition.getAdapterName((options.findAllFallbackAdapters || options.fallbackAdapters)[index]);
	            return _this.adapters[adapter].findAll(definition, params, options)['catch'](function (err) {
	              index++;
	              if (index < options.fallbackAdapters.length) {
	                return makeFallbackCall(index);
	              } else {
	                return DSUtils.Promise.reject(err);
	              }
	            });
	          };
	
	          promise = makeFallbackCall(0);
	        } else {
	          adapter = definition.getAdapterName(options);
	          // just make a single attempt
	          promise = _this.adapters[adapter].findAll(definition, params, options);
	        }
	
	        resource.pendingQueries[queryHash] = promise.then(function (data) {
	          return options.afterFindAll.call(data, options, data);
	        }).then(function (data) {
	          // Query is no longer pending
	          delete resource.pendingQueries[queryHash];
	          if (options.cacheResponse) {
	            // inject the items into the data store
	            resource.queryData[queryHash] = processResults.call(_this, data, resourceName, queryHash, options);
	            resource.queryData[queryHash].$$injected = true;
	            return resource.queryData[queryHash];
	          } else {
	            DSUtils.forEach(data, function (item, i) {
	              data[i] = definition.createInstance(item, options.orig());
	            });
	            return data;
	          }
	        });
	      }
	
	      return resource.pendingQueries[queryHash];
	    } else {
	      // resolve immediately with the items
	      return items;
	    }
	  }).then(function (items) {
	    return DSUtils.respond(items, { adapter: adapter }, options);
	  })['catch'](function (err) {
	    if (resource) {
	      delete resource.pendingQueries[queryHash];
	    }
	    return _this.errorFn('findAll', resourceName, params, options)(err);
	  });
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	/**
	 * Load the specified relations for the given instance.
	 *
	 * @param resourceName The name of the type of resource of the instance for which to load relations.
	 * @param instance The instance or the primary key of the instance.
	 * @param relations An array of the relations to load.
	 * @param options Optional configuration.
	 * @returns The instance, now with its relations loaded.
	 */
	module.exports = function loadRelations(resourceName, instance, relations, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var DSErrors = _this.errors;
	
	  var definition = _this.definitions[resourceName];
	  var _options = void 0;
	
	  return new DSUtils.Promise(function (resolve, reject) {
	    if (DSUtils._sn(instance)) {
	      instance = definition.get(instance);
	    }
	
	    if (DSUtils._s(relations)) {
	      relations = [relations];
	    }
	
	    relations = relations || [];
	
	    if (!definition) {
	      reject(new DSErrors.NER(resourceName));
	    } else if (!DSUtils._o(instance)) {
	      reject(new DSErrors.IA('"instance(id)" must be a string, number or object!'));
	    } else if (!DSUtils._a(relations)) {
	      reject(new DSErrors.IA('"relations" must be a string or an array!'));
	    } else {
	      (function () {
	        _options = DSUtils._(definition, options);
	        _options.logFn('loadRelations', instance, relations, _options);
	
	        var tasks = [];
	
	        DSUtils.forEach(definition.relationList, function (def) {
	          var relationName = def.relation;
	          var relationDef = definition.getResource(relationName);
	          var __options = DSUtils._(relationDef, options);
	
	          // relations can be loaded based on resource name or field name
	          if (!relations.length || DSUtils.contains(relations, relationName) || DSUtils.contains(relations, def.localField)) {
	            var task = void 0;
	            var params = {};
	            if (__options.allowSimpleWhere) {
	              params[def.foreignKey] = instance[definition.idAttribute];
	            } else {
	              params.where = {};
	              params.where[def.foreignKey] = {
	                '==': instance[definition.idAttribute]
	              };
	            }
	
	            var orig = __options.orig();
	            var defKey = def.localKey ? DSUtils.get(instance, def.localKey) : null;
	            var hasDefKey = !!(defKey || defKey === 0);
	
	            if (typeof def.load === 'function') {
	              task = def.load(definition, def, instance, orig);
	            } else {
	              if (def.type === 'hasMany') {
	                if (def.localKeys) {
	                  delete params[def.foreignKey];
	                  var keys = DSUtils.get(instance, def.localKeys) || [];
	                  keys = DSUtils._a(keys) ? keys : DSUtils.keys(keys);
	                  params.where = _defineProperty({}, relationDef.idAttribute, {
	                    'in': keys
	                  });
	                  orig.localKeys = keys;
	                } else if (def.foreignKeys) {
	                  delete params[def.foreignKey];
	                  params.where = _defineProperty({}, def.foreignKeys, {
	                    contains: instance[definition.idAttribute]
	                  });
	                }
	                task = relationDef.findAll(params, orig);
	              } else if (def.type === 'hasOne') {
	                if (def.localKey && hasDefKey) {
	                  task = relationDef.find(defKey, orig);
	                } else if (def.foreignKey) {
	                  task = relationDef.findAll(params, orig).then(function (hasOnes) {
	                    return hasOnes.length ? hasOnes[0] : null;
	                  });
	                }
	              } else if (hasDefKey) {
	                task = relationDef.find(defKey, orig);
	              }
	            }
	
	            if (task) {
	              if (!_options.linkRelations) {
	                task = task.then(function (data) {
	                  instance[def.localField] = data;
	                });
	              }
	              tasks.push(task);
	            }
	          }
	        });
	
	        resolve(tasks);
	      })();
	    }
	  }).then(function (tasks) {
	    return DSUtils.Promise.all(tasks);
	  }).then(function () {
	    return _options.afterLoadRelations.call(instance, _options, instance);
	  }).catch(_this.errorFn('loadRelations', resourceName, instance, relations, options));
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * Find expired items of the specified resource type and perform the configured action.
	 *
	 * @param resourceName The name of the type of resource of the items to reap.
	 * @param options Optional configuration.
	 * @returns The reaped items.
	 */
	module.exports = function reap(resourceName, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var definition = _this.definitions[resourceName];
	  var resource = _this.store[resourceName];
	
	  return new DSUtils.Promise(function (resolve, reject) {
	    if (!definition) {
	      reject(new _this.errors.NER(resourceName));
	    } else {
	      options = DSUtils._(definition, options);
	      if (!options.hasOwnProperty('notify')) {
	        options.notify = false;
	      }
	      options.logFn('reap', options);
	      var items = [];
	      var now = new Date().getTime();
	      var expiredItem = void 0;
	
	      // find the expired items
	      while ((expiredItem = resource.expiresHeap.peek()) && expiredItem.expires < now) {
	        items.push(expiredItem.item);
	        delete expiredItem.item;
	        resource.expiresHeap.pop();
	      }
	      resolve(items);
	    }
	  }).then(function (items) {
	    // only hit lifecycle if there are items
	    if (items.length) {
	      definition.beforeReap(options, items);
	      if (options.notify) {
	        definition.emit('DS.beforeReap', definition, items);
	      }
	    }
	
	    if (options.reapAction === 'inject') {
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
	    } else if (options.reapAction === 'eject') {
	      DSUtils.forEach(items, function (item) {
	        definition.eject(item[definition.idAttribute]);
	      });
	    } else if (options.reapAction === 'refresh') {
	      var _ret2 = function () {
	        var tasks = [];
	        DSUtils.forEach(items, function (item) {
	          tasks.push(definition.refresh(item[definition.idAttribute]));
	        });
	        return {
	          v: DSUtils.Promise.all(tasks)
	        };
	      }();
	
	      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	    }
	    return items;
	  }).then(function (items) {
	    // only hit lifecycle if there are items
	    if (items.length) {
	      definition.afterReap(options, items);
	      if (options.notify) {
	        definition.emit('DS.afterReap', definition, items);
	      }
	    }
	    return items;
	  }).catch(_this.errorFn('reap', resourceName, options));
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * Save a single item in its present state.
	 *
	 * @param resourceName The name of the type of resource of the item.
	 * @param id The primary key of the item.
	 * @param options Optional congifuration.
	 * @returns The item, now saved.
	 */
	module.exports = function save(resourceName, id, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var DSErrors = _this.errors;
	
	  var definition = _this.definitions[resourceName];
	  var resource = _this.store[resourceName];
	  var item = void 0,
	      noChanges = void 0,
	      adapter = void 0;
	
	  return new DSUtils.Promise(function (resolve, reject) {
	    id = DSUtils.resolveId(definition, id);
	    if (!definition) {
	      reject(new DSErrors.NER(resourceName));
	    } else if (!DSUtils._sn(id)) {
	      reject(DSUtils._snErr('id'));
	    } else if (!definition.get(id)) {
	      reject(new DSErrors.R('id "' + id + '" not found in cache!'));
	    } else {
	      item = definition.get(id);
	      options = DSUtils._(definition, options);
	      options.logFn('save', id, options);
	      resolve(item);
	    }
	  })
	  // start lifecycle
	  .then(function (attrs) {
	    return options.beforeValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.validate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.afterValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.beforeUpdate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit('DS.beforeUpdate', definition, attrs);
	    }
	    // only send changed properties to the adapter
	    if (options.changesOnly) {
	      var key;
	
	      var _ret = function () {
	        if (resource.observers[id] && typeof resource.observers[id] === 'function') {
	          resource.observers[id].deliver();
	        }
	        var toKeep = [];
	        var changes = definition.changes(id);
	
	        for (key in changes.added) {
	          toKeep.push(key);
	        }
	        for (key in changes.changed) {
	          toKeep.push(key);
	        }
	        DSUtils.forEach(options.always, function (property) {
	          toKeep.push(property);
	        });
	        changes = DSUtils.pick(attrs, toKeep);
	        // no changes? no save
	        if (DSUtils.isEmpty(changes)) {
	          // no changes, return
	          options.logFn('save - no changes', id, options);
	          noChanges = true;
	          return {
	            v: attrs
	          };
	        } else {
	          attrs = changes;
	        }
	      }();
	
	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	    adapter = definition.getAdapterName(options);
	    return _this.adapters[adapter].update(definition, id, DSUtils.omit(attrs, options.omit), options);
	  }).then(function (data) {
	    return options.afterUpdate.call(data, options, data);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit('DS.afterUpdate', definition, attrs);
	    }
	    if (noChanges) {
	      // no changes, just return
	      return attrs;
	    } else if (options.cacheResponse) {
	      // inject the reponse into the store, updating the item
	      var injected = definition.inject(attrs, options.orig());
	      // mark the item as "saved"
	      resource.saved[id] = DSUtils.updateTimestamp(resource.saved[id]);
	      if (!definition.resetHistoryOnInject) {
	        resource.previousAttributes[id] = DSUtils.copy(injected, null, null, null, definition.relationFields);
	      }
	      return injected;
	    } else {
	      // just return an instance
	      return definition.createInstance(attrs, options.orig());
	    }
	  }).then(function (item) {
	    return DSUtils.respond(item, { adapter: adapter }, options);
	  }).catch(_this.errorFn('save', resourceName, id, options));
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Update a single item using the supplied properties hash.
	 *
	 * @param resourceName The name of the type of resource of the item to update.
	 * @param id The primary key of the item to update.
	 * @param attrs The attributes with which to update the item.
	 * @param options Optional configuration.
	 * @returns The item, now updated.
	 */
	module.exports = function update(resourceName, id, attrs, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var DSErrors = _this.errors;
	
	  var definition = _this.definitions[resourceName];
	  var adapter = void 0;
	
	  return new DSUtils.Promise(function (resolve, reject) {
	    id = DSUtils.resolveId(definition, id);
	    if (!definition) {
	      reject(new DSErrors.NER(resourceName));
	    } else if (!DSUtils._sn(id)) {
	      reject(DSUtils._snErr('id'));
	    } else {
	      options = DSUtils._(definition, options);
	      options.logFn('update', id, attrs, options);
	      resolve(attrs);
	    }
	  })
	  // start lifecycle
	  .then(function (attrs) {
	    return options.beforeValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.validate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.afterValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.beforeUpdate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit('DS.beforeUpdate', definition, attrs);
	    }
	    adapter = definition.getAdapterName(options);
	    return _this.adapters[adapter].update(definition, id, DSUtils.omit(attrs, options.omit), options);
	  }).then(function (data) {
	    return options.afterUpdate.call(data, options, data);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit('DS.afterUpdate', definition, attrs);
	    }
	    if (options.cacheResponse) {
	      // inject the updated item into the store
	      var injected = definition.inject(attrs, options.orig());
	      var resource = _this.store[resourceName];
	      var _id = injected[definition.idAttribute];
	      // mark the item as "saved"
	      resource.saved[_id] = DSUtils.updateTimestamp(resource.saved[_id]);
	      if (!definition.resetHistoryOnInject) {
	        resource.previousAttributes[_id] = DSUtils.copy(injected, null, null, null, definition.relationFields);
	      }
	      return injected;
	    } else {
	      // just return an instance
	      return definition.createInstance(attrs, options.orig());
	    }
	  }).then(function (item) {
	    return DSUtils.respond(item, { adapter: adapter }, options);
	  }).catch(_this.errorFn('update', resourceName, id, attrs, options));
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * Update a collection of items using the supplied properties hash.
	 *
	 * @param resourceName The name of the type of resource of the items to update.
	 * @param attrs  The attributes with which to update the item.
	 * @param params The criteria by which to select items to update. See http://www.js-data.io/docs/query-syntax
	 * @param options Optional configuration.
	 * @returns The updated items.
	 */
	module.exports = function updateAll(resourceName, attrs, params, options) {
	  var _this = this;
	  var DSUtils = _this.utils;
	  var DSErrors = _this.errors;
	
	  var definition = _this.definitions[resourceName];
	  var adapter = void 0;
	
	  return new DSUtils.Promise(function (resolve, reject) {
	    if (!definition) {
	      reject(new DSErrors.NER(resourceName));
	    } else {
	      options = DSUtils._(definition, options);
	      options.logFn('updateAll', attrs, params, options);
	      DSUtils.applyScope(definition, params, options);
	      resolve(attrs);
	    }
	  })
	  // start lifecycle
	  .then(function (attrs) {
	    return options.beforeValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.validate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.afterValidate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    return options.beforeUpdate.call(attrs, options, attrs);
	  }).then(function (attrs) {
	    if (options.notify) {
	      definition.emit('DS.beforeUpdate', definition, attrs);
	    }
	    adapter = definition.getAdapterName(options);
	    return _this.adapters[adapter].updateAll(definition, DSUtils.omit(attrs, options.omit), params, options);
	  }).then(function (data) {
	    return options.afterUpdate.call(data, options, data);
	  }).then(function (data) {
	    if (options.notify) {
	      definition.emit('DS.afterUpdate', definition, attrs);
	    }
	    var origOptions = options.orig();
	    if (options.cacheResponse) {
	      var _ret = function () {
	        // inject the updated items into the store
	        var injected = definition.inject(data, origOptions);
	        var resource = _this.store[resourceName];
	        // mark the items as "saved"
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
	      }();
	
	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    } else {
	      var _ret2 = function () {
	        // just return instances
	        var instances = [];
	        DSUtils.forEach(data, function (item) {
	          instances.push(definition.createInstance(item, origOptions));
	        });
	        return {
	          v: instances
	        };
	      }();
	
	      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	    }
	  }).then(function (items) {
	    return DSUtils.respond(items, { adapter: adapter }, options);
	  }).catch(_this.errorFn('updateAll', resourceName, attrs, params, options));
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-data-debug.js.map