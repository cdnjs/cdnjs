/*!
* js-data-angular
* @version 3.2.1 - Homepage <https://github.com/js-data/js-data-angular>
* @copyright (c) 2014-2016 js-data-angular project authors
* @license MIT <https://github.com/js-data/js-data-angular/blob/master/LICENSE>
*
* @overview Angular wrapper for js-data.
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-data"), require("angular"), (function webpackLoadOptionalExternalModule() { try { return require("axios"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define(["js-data", "angular"], function webpackLoadOptionalExternalModuleAmd(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__) {
			return factory(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, root["axios"]);
		});
	else if(typeof exports === 'object')
		exports["jsDataAngularModuleName"] = factory(require("js-data"), require("angular"), (function webpackLoadOptionalExternalModule() { try { return require("axios"); } catch(e) {} }()));
	else
		root["jsDataAngularModuleName"] = factory(root["JSData"], root["angular"], root["axios"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* jshint loopfunc:true */
	var JSData = __webpack_require__(1);
	var DSHttpAdapter = __webpack_require__(2);
	var angular = __webpack_require__(4);
	
	var DSUtils = JSData.DSUtils;
	var DSErrors = JSData.DSErrors;
	var get = DSUtils.get;
	var isString = DSUtils.isString;
	var isNumber = DSUtils.isNumber;
	var isObject = DSUtils.isObject;
	var set = DSUtils.set;
	var resolveId = DSUtils.resolveId;
	
	
	var adapters = [{
	  project: 'js-data-localstorage',
	  name: 'localstorage',
	  'class': 'DSLocalStorageAdapter'
	}, {
	  project: 'js-data-localforage',
	  name: 'localforage',
	  'class': 'DSLocalForageAdapter'
	}, {
	  project: 'js-data-firebase',
	  name: 'firebase',
	  'class': 'DSFirebaseAdapter'
	}, {
	  project: 'js-data-sql',
	  name: 'sql',
	  'class': 'DSSqlAdapter'
	}];
	
	var functionsToWrap = ['compute', 'digest', 'eject', 'inject'];
	
	function registerAdapter(adapter) {
	  var Adapter = void 0;
	
	  try {
	    Adapter = __webpack_require__(5)(adapter.project);
	  } catch (e) {}
	
	  if (!Adapter) {
	    Adapter = window[adapter.class];
	  }
	
	  if (Adapter) {
	    adapter.loaded = true;
	    angular.module('js-data').provider(adapter.class, function () {
	      var _this = this;
	      _this.defaults = {};
	      _this.$get = [function () {
	        return new Adapter(_this.defaults);
	      }];
	    });
	  }
	}
	
	var DSHttpAdapterProvider = function DSHttpAdapterProvider() {
	  _classCallCheck(this, DSHttpAdapterProvider);
	
	  var defaults = {};
	  this.defaults = defaults;
	
	  this.$get = ['$http', 'DS', function ($http, DS) {
	    defaults.http = defaults.http || $http;
	    var adapter = new DSHttpAdapter(defaults);
	    DS.registerAdapter('http', adapter, { 'default': true });
	    return adapter;
	  }];
	};
	
	var DSProvider = function DSProvider() {
	  _classCallCheck(this, DSProvider);
	
	  var _this = this;
	  var deps = [];
	
	  for (var i = 0; i < adapters.length; i++) {
	    if (adapters[i].loaded) {
	      deps.push(adapters[i].class);
	    }
	  }
	
	  _this.defaults = {};
	
	  JSData.DS.prototype.bindAll = function (resourceName, params, scope, expr, cb) {
	    var _this = this;
	
	    params = params || {};
	
	    if (!_this.definitions[resourceName]) {
	      throw new DSErrors.NER(resourceName);
	    } else if (!isObject(params)) {
	      throw new DSErrors.IA('"params" must be an object!');
	    } else if (!isObject(scope)) {
	      throw new DSErrors.IA('"scope" must be an object!');
	    } else if (!isString(expr)) {
	      throw new DSErrors.IA('"expr" must be a string!');
	    }
	
	    var idAttribute = _this.definitions[resourceName].idAttribute;
	
	    try {
	      return scope.$watch(function () {
	        return _this.lastModified(resourceName);
	      }, function () {
	        var items = _this.filter(resourceName, params);
	        if (items && items.length) {
	          angular.forEach(items, function (item) {
	            _this.compute(resourceName, get(item, idAttribute));
	          });
	        }
	        set(scope, expr, items);
	        if (cb) {
	          cb(null, items);
	        }
	      });
	    } catch (err) {
	      if (cb) {
	        cb(err);
	      } else {
	        throw err;
	      }
	    }
	  };
	
	  JSData.DS.prototype.bindOne = function (resourceName, id, scope, expr, cb) {
	    var _this = this;
	
	    id = resolveId(_this.definitions[resourceName], id);
	    if (!_this.definitions[resourceName]) {
	      throw new DSErrors.NER(resourceName);
	    } else if (!isString(id) && !isNumber(id)) {
	      throw new DSErrors.IA('"id" must be a string or a number!');
	    } else if (!isObject(scope)) {
	      throw new DSErrors.IA('"scope" must be an object!');
	    } else if (!isString(expr)) {
	      throw new DSErrors.IA('"expr" must be a string!');
	    }
	
	    try {
	      return scope.$watch(function () {
	        return _this.lastModified(resourceName, id);
	      }, function () {
	        var item = _this.get(resourceName, id);
	        if (item) {
	          _this.compute(resourceName, id);
	        }
	        set(scope, expr, item);
	        if (cb) {
	          cb(null, item);
	        }
	      });
	    } catch (err) {
	      if (cb) {
	        cb(err);
	      } else {
	        throw err;
	      }
	    }
	  };
	
	  function load() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var $rootScope = args[args.length - 2];
	    var $q = args[args.length - 1];
	    var store = new JSData.DS(_this.defaults);
	    var originals = {};
	
	    function QPromise(executor) {
	      var deferred = $q.defer();
	
	      try {
	        executor(angular.bind(deferred, deferred.resolve), angular.bind(deferred, deferred.reject));
	      } catch (err) {
	        deferred.reject(err);
	      }
	
	      return deferred.promise;
	    }
	
	    QPromise.all = $q.all;
	    QPromise.when = $q.when;
	    QPromise.reject = $q.reject;
	
	    DSUtils.Promise = QPromise;
	
	    // Register any adapters that have been loaded
	    if (args.length) {
	      for (var i = 0; i < args.length; i++) {
	        for (var j = 0; j < adapters.length; j++) {
	          if (adapters[j].loaded && !adapters[j].registered) {
	            adapters[j].registered = true;
	            store.registerAdapter(adapters[j].name, args[i]);
	            break;
	          }
	        }
	      }
	    }
	
	    // Wrap certain sync functions with $apply
	
	    var _loop = function _loop() {
	      var name = functionsToWrap[k];
	      originals[name] = store[name];
	      store[name] = function () {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          args[_key2] = arguments[_key2];
	        }
	
	        if (!$rootScope.$$phase) {
	          return $rootScope.$apply(function () {
	            return originals[name].apply(store, args);
	          });
	        }
	        return originals[name].apply(store, args);
	      };
	    };
	
	    for (var k = 0; k < functionsToWrap.length; k++) {
	      _loop();
	    }
	
	    // Hook into the digest loop
	    if (typeof Object.observe !== 'function' || typeof Array.observe !== 'function') {
	      $rootScope.$watch(function () {
	        return store.observe.Platform.performMicrotaskCheckpoint();
	      });
	    }
	
	    return store;
	  }
	
	  deps.push('$rootScope');
	  deps.push('$q');
	  deps.push(load);
	
	  _this.$get = deps;
	};
	
	angular.module('js-data', ['ng']).value('DSUtils', DSUtils).value('DSErrors', DSErrors).value('DSVersion', JSData.version).provider('DS', DSProvider).provider('DSHttpAdapter', DSHttpAdapterProvider).run(['DS', 'DSHttpAdapter', function (DS, DSHttpAdapter) {
	  DS.registerAdapter('http', DSHttpAdapter, { 'default': true });
	}]);
	
	for (var i = 0; i < adapters.length; i++) {
	  registerAdapter(adapters[i]);
	}
	
	// return the module name
	module.exports = 'js-data';
	try {
	  module.exports.name = 'js-data';
	} catch (e) {}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var JSData = __webpack_require__(1);
	var axios = null;
	
	try {
	  axios = __webpack_require__(3);
	} catch (e) {}
	
	var DSUtils = JSData.DSUtils;
	var deepMixIn = DSUtils.deepMixIn;
	var removeCircular = DSUtils.removeCircular;
	var copy = DSUtils.copy;
	var makePath = DSUtils.makePath;
	var isString = DSUtils.isString;
	var isNumber = DSUtils.isNumber;
	
	
	function isUndefined(value) {
	  return value === undefined;
	}
	
	var Defaults = function () {
	  function Defaults() {
	    _classCallCheck(this, Defaults);
	  }
	
	  _createClass(Defaults, [{
	    key: 'queryTransform',
	    value: function queryTransform(resourceConfig, params) {
	      return params;
	    }
	  }, {
	    key: 'deserialize',
	    value: function deserialize(resourceConfig, data) {
	      return data ? 'data' in data ? data.data : data : data;
	    }
	  }, {
	    key: 'serialize',
	    value: function serialize(resourceConfig, data) {
	      return data;
	    }
	  }, {
	    key: 'log',
	    value: function log() {}
	  }, {
	    key: 'error',
	    value: function error() {}
	  }]);
	
	  return Defaults;
	}();
	
	var defaultsPrototype = Defaults.prototype;
	
	defaultsPrototype.basePath = '';
	
	defaultsPrototype.forceTrailingSlash = '';
	
	defaultsPrototype.httpConfig = {};
	
	defaultsPrototype.verbsUseBasePath = false;
	
	var DSHttpAdapter = function () {
	  function DSHttpAdapter(options) {
	    _classCallCheck(this, DSHttpAdapter);
	
	    options || (options = {});
	    this.defaults = new Defaults();
	    if (console) {
	      this.defaults.log = function (a, b) {
	        return console[typeof console.info === 'function' ? 'info' : 'log'](a, b);
	      };
	    }
	    if (console) {
	      this.defaults.error = function (a, b) {
	        return console[typeof console.error === 'function' ? 'error' : 'log'](a, b);
	      };
	    }
	    deepMixIn(this.defaults, options);
	    this.http = options.http || axios;
	  }
	
	  _createClass(DSHttpAdapter, [{
	    key: 'getEndpoint',
	    value: function getEndpoint(resourceConfig, id, options) {
	      options || (options = {});
	      options.params = isUndefined(options.params) ? {} : options.params;
	
	      var endpoint = options.hasOwnProperty('endpoint') ? options.endpoint : resourceConfig.endpoint;
	      var parents = resourceConfig.parents || (resourceConfig.parent ? _defineProperty({}, resourceConfig.parent, {
	        key: resourceConfig.parentKey,
	        field: resourceConfig.parentField
	      }) : {});
	
	      DSUtils.forOwn(parents, function (parent, parentName) {
	        var _this2 = this;
	
	        var item = void 0;
	        var parentKey = parent.key;
	        var parentField = parent.field;
	        var parentDef = resourceConfig.getResource(parentName);
	        var parentId = options.params[parentKey];
	
	        if (parentId === false || !parentKey || !parentDef) {
	          if (parentId === false) {
	            delete options.params[parentKey];
	          }
	        } else {
	          delete options.params[parentKey];
	
	          if (DSUtils._sn(id)) {
	            item = resourceConfig.get(id);
	          } else if (DSUtils._o(id)) {
	            item = id;
	          }
	
	          if (item) {
	            parentId = parentId || item[parentKey] || (item[parentField] ? item[parentField][parentDef.idAttribute] : null);
	          }
	
	          if (parentId) {
	            (function () {
	              delete options.endpoint;
	              var _options = {};
	              DSUtils.forOwn(options, function (value, key) {
	                _options[key] = value;
	              });
	              endpoint = DSUtils.makePath(_this2.getEndpoint(parentDef, parentId, DSUtils._(parentDef, _options)), parentId, endpoint);
	            })();
	          }
	        }
	      }, this);
	
	      return endpoint;
	    }
	  }, {
	    key: 'getPath',
	    value: function getPath(method, resourceConfig, id, options) {
	      var _this = this;
	      options || (options = {});
	      if (isString(options.urlPath)) {
	        return makePath.apply(DSUtils, [options.basePath || _this.defaults.basePath || resourceConfig.basePath, options.urlPath]);
	      } else {
	        var args = [options.basePath || _this.defaults.basePath || resourceConfig.basePath, this.getEndpoint(resourceConfig, isString(id) || isNumber(id) || method === 'create' ? id : null, options)];
	        if (method === 'find' || method === 'update' || method === 'destroy') {
	          args.push(id);
	        }
	        return makePath.apply(DSUtils, args);
	      }
	    }
	  }, {
	    key: 'HTTP',
	    value: function HTTP(config) {
	      var _this = this;
	      var start = new Date();
	
	      // blacklist `data` as it can be large and will take a lot of time to copy
	      var payload = config.data;
	      var cache = config.cache;
	      var timeout = config.timeout;
	      config = copy(config, null, null, null, ['data', 'cache', 'timeout']);
	      config = deepMixIn(config, _this.defaults.httpConfig);
	      config.data = payload;
	      config.cache = cache;
	      config.timeout = timeout;
	      if (!('verbsUseBasePath' in config)) {
	        config.verbsUseBasePath = _this.defaults.verbsUseBasePath;
	      }
	      if (!config.urlOverride && config.verbsUseBasePath) {
	        config.url = makePath(config.basePath || _this.defaults.basePath, config.url);
	      }
	      if (_this.defaults.forceTrailingSlash && config.url[config.url.length - 1] !== '/' && !config.urlOverride) {
	        config.url += '/';
	      }
	      if (_typeof(config.data) === 'object') {
	        config.data = removeCircular(config.data);
	      }
	      config.method = config.method.toUpperCase();
	      var suffix = isUndefined(config.suffix) ? _this.defaults.suffix : config.suffix;
	      if (suffix && config.url.substr(config.url.length - suffix.length) !== suffix && !config.urlOverride) {
	        config.url += suffix;
	      }
	
	      // logs the HTTP response
	      function logResponse(data, isRejection) {
	        data = data || {};
	        // examine the data object
	        if (data instanceof Error) {
	          // log the Error object
	          _this.defaults.error('FAILED: ' + (data.message || 'Unknown Error'), data);
	          return DSUtils.Promise.reject(data);
	        } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
	          var str = start.toUTCString() + ' - ' + config.method + ' ' + config.url + ' - ' + data.status + ' ' + (new Date().getTime() - start.getTime()) + 'ms';
	
	          if (data.status >= 200 && data.status < 300 && !isRejection) {
	            if (_this.defaults.log) {
	              _this.defaults.log(str, data);
	            }
	            return data;
	          } else {
	            if (_this.defaults.error) {
	              _this.defaults.error('FAILED: ' + str, data);
	            }
	            return DSUtils.Promise.reject(data);
	          }
	        } else {
	          // unknown type for 'data' that is not an Object or Error
	          _this.defaults.error('FAILED', data);
	          return DSUtils.Promise.reject(data);
	        }
	      }
	
	      if (!this.http) {
	        throw new Error('You have not configured this adapter with an http library!');
	      }
	
	      return this.http(config).then(logResponse, function (data) {
	        return logResponse(data, true);
	      });
	    }
	  }, {
	    key: 'GET',
	    value: function GET(url, config) {
	      config = config || {};
	      config.method = config.method || 'get';
	      config.urlOverride = !!config.url;
	      config.url = config.url || url;
	      return this.HTTP(config);
	    }
	  }, {
	    key: 'POST',
	    value: function POST(url, attrs, config) {
	      config = config || {};
	      config.method = config.method || 'post';
	      config.urlOverride = !!config.url;
	      config.url = config.url || url;
	      config.data = config.data || attrs;
	      return this.HTTP(config);
	    }
	  }, {
	    key: 'PUT',
	    value: function PUT(url, attrs, config) {
	      config = config || {};
	      config.method = config.method || 'put';
	      config.urlOverride = !!config.url;
	      config.url = config.url || url;
	      config.data = config.data || attrs;
	      return this.HTTP(config);
	    }
	  }, {
	    key: 'DEL',
	    value: function DEL(url, config) {
	      config = config || {};
	      config.method = config.method || 'delete';
	      config.urlOverride = !!config.url;
	      config.url = config.url || url;
	      return this.HTTP(config);
	    }
	  }, {
	    key: 'find',
	    value: function find(resourceConfig, id, options) {
	      var _this = this;
	      options || (options = {});
	      options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
	      options.params = isUndefined(options.params) ? {} : copy(options.params);
	      options.params = _this.defaults.queryTransform(resourceConfig, options.params);
	      return _this.GET(_this.getPath('find', resourceConfig, id, options), options).then(function (data) {
	        var item = (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	        return !item ? DSUtils.Promise.reject(new Error('Not Found!')) : item;
	      });
	    }
	  }, {
	    key: 'findAll',
	    value: function findAll(resourceConfig, params, options) {
	      var _this = this;
	      options || (options = {});
	      options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
	      options.params = isUndefined(options.params) ? {} : copy(options.params);
	      if (params) {
	        params = _this.defaults.queryTransform(resourceConfig, params);
	        deepMixIn(options.params, params);
	      }
	      return _this.GET(_this.getPath('findAll', resourceConfig, params, options), options).then(function (data) {
	        return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(resourceConfig, attrs, options) {
	      var _this = this;
	      options || (options = {});
	      options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
	      options.params = isUndefined(options.params) ? {} : copy(options.params);
	      options.params = _this.defaults.queryTransform(resourceConfig, options.params);
	      return _this.POST(_this.getPath('create', resourceConfig, attrs, options), options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs), options).then(function (data) {
	        return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(resourceConfig, id, attrs, options) {
	      var _this = this;
	      options || (options = {});
	      options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
	      options.params = isUndefined(options.params) ? {} : copy(options.params);
	      options.params = _this.defaults.queryTransform(resourceConfig, options.params);
	      return _this.PUT(_this.getPath('update', resourceConfig, id, options), options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs), options).then(function (data) {
	        return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	      });
	    }
	  }, {
	    key: 'updateAll',
	    value: function updateAll(resourceConfig, attrs, params, options) {
	      var _this = this;
	      options || (options = {});
	      options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
	      options.params = isUndefined(options.params) ? {} : copy(options.params);
	      if (params) {
	        params = _this.defaults.queryTransform(resourceConfig, params);
	        deepMixIn(options.params, params);
	      }
	      return this.PUT(_this.getPath('updateAll', resourceConfig, attrs, options), options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs), options).then(function (data) {
	        return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	      });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(resourceConfig, id, options) {
	      var _this = this;
	      options || (options = {});
	      options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
	      options.params = isUndefined(options.params) ? {} : copy(options.params);
	      options.params = _this.defaults.queryTransform(resourceConfig, options.params);
	      return _this.DEL(_this.getPath('destroy', resourceConfig, id, options), options).then(function (data) {
	        return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	      });
	    }
	  }, {
	    key: 'destroyAll',
	    value: function destroyAll(resourceConfig, params, options) {
	      var _this = this;
	      options || (options = {});
	      options.suffix = isUndefined(options.suffix) ? resourceConfig.suffix : options.suffix;
	      options.params = isUndefined(options.params) ? {} : copy(options.params);
	      if (params) {
	        params = _this.defaults.queryTransform(resourceConfig, params);
	        deepMixIn(options.params, params);
	      }
	      return this.DEL(_this.getPath('destroyAll', resourceConfig, params, options), options).then(function (data) {
	        return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	      });
	    }
	  }]);
	
	  return DSHttpAdapter;
	}();
	
	DSHttpAdapter.version = {
	  full: '3.2.1',
	  major: parseInt('3', 10),
	  minor: parseInt('2', 10),
	  patch: parseInt('1', 10),
	  alpha:  true ? 'false' : false,
	  beta:  true ? 'false' : false
	};
	
	module.exports = DSHttpAdapter;

/***/ },
/* 3 */
/***/ function(module, exports) {

	if(typeof __WEBPACK_EXTERNAL_MODULE_3__ === 'undefined') {var e = new Error("Cannot find module \"axios\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var map = {};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 5;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-data-angular.js.map