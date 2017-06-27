/*!
 * js-data-angular
 * @version 2.3.0 - Homepage <https://www.js-data.io/docs/js-data-angular/>
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @copyright (c) 2014-2015 Jason Dobry 
 * @license MIT <https://github.com/js-data/js-data-angular/blob/master/LICENSE>
 * 
 * @overview Angular wrapper for js-data.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory((function webpackLoadOptionalExternalModule() { try { return require("js-data"); } catch(e) {} }()), (function webpackLoadOptionalExternalModule() { try { return require("angular"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define(["js-data", "angular"], factory);
	else if(typeof exports === 'object')
		exports["jsDataAngularModuleName"] = factory((function webpackLoadOptionalExternalModule() { try { return require("js-data"); } catch(e) {} }()), (function webpackLoadOptionalExternalModule() { try { return require("angular"); } catch(e) {} }()));
	else
		root["jsDataAngularModuleName"] = factory(root["JSData"], root["angular"]);
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

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	/*jshint loopfunc:true*/
	var angular = undefined,
	    JSData = undefined;
	try {
	  JSData = __webpack_require__(1);
	} catch (e) {}

	if (!JSData) {
	  try {
	    JSData = window.JSData;
	  } catch (e) {}
	}
	if (!JSData) {
	  throw new Error('js-data must be loaded!');
	}
	try {
	  angular = __webpack_require__(2);
	} catch (e) {}

	if (!angular) {
	  try {
	    angular = window.angular;
	  } catch (e) {}
	}
	if (!angular) {
	  throw new Error('angular must be loaded!');
	}

	var DSUtils = JSData.DSUtils;
	var DSErrors = JSData.DSErrors;
	var deepMixIn = DSUtils.deepMixIn;
	var copy = DSUtils.copy;
	var removeCircular = DSUtils.removeCircular;
	var isString = DSUtils.isString;
	var isNumber = DSUtils.isNumber;
	var makePath = DSUtils.makePath;
	var httpLoaded = false;

	var adapters = [{
	  project: 'js-data-http',
	  name: 'http',
	  'class': 'DSHttpAdapter'
	}, {
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

	var functionsToWrap = ['compute', 'digest', 'eject', 'inject', 'link', 'linkAll', 'linkInverse', 'unlinkInverse'];

	function registerAdapter(adapter) {
	  var Adapter = undefined;

	  try {
	    Adapter = __webpack_require__(3)(adapter.project);
	  } catch (e) {}

	  if (!Adapter) {
	    Adapter = window[adapter['class']];
	  }

	  if (Adapter) {
	    if (adapter.name === 'http') {
	      httpLoaded = true;
	    }
	    adapter.loaded = true;
	    angular.module('js-data').provider(adapter['class'], function () {
	      var _this = this;
	      _this.defaults = {};
	      _this.$get = [function () {
	        return new Adapter(_this.defaults);
	      }];
	    });
	  }
	}

	var DSProvider = function DSProvider() {
	  _classCallCheck(this, DSProvider);

	  var _this = this;
	  var deps = [];

	  for (var i = 0; i < adapters.length; i++) {
	    if (adapters[i].loaded) {
	      deps.push(adapters[i]['class']);
	    }
	  }

	  _this.defaults = {};

	  JSData.DS.prototype.bindAll = function (resourceName, params, scope, expr, cb) {
	    var _this = this;

	    params = params || {};

	    if (!_this.definitions[resourceName]) {
	      throw new DSErrors.NER(resourceName);
	    } else if (!DSUtils.isObject(params)) {
	      throw new DSErrors.IA('"params" must be an object!');
	    } else if (!DSUtils.isObject(scope)) {
	      throw new DSErrors.IA('"scope" must be an object!');
	    } else if (!DSUtils.isString(expr)) {
	      throw new DSErrors.IA('"expr" must be a string!');
	    }

	    try {
	      return scope.$watch(function () {
	        return _this.lastModified(resourceName);
	      }, function () {
	        var items = _this.filter(resourceName, params);
	        DSUtils.set(scope, expr, items);
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

	    id = DSUtils.resolveId(_this.definitions[resourceName], id);
	    if (!_this.definitions[resourceName]) {
	      throw new DSErrors.NER(resourceName);
	    } else if (!DSUtils.isString(id) && !DSUtils.isNumber(id)) {
	      throw new DSErrors.IA('"id" must be a string or a number!');
	    } else if (!DSUtils.isObject(scope)) {
	      throw new DSErrors.IA('"scope" must be an object!');
	    } else if (!DSUtils.isString(expr)) {
	      throw new DSErrors.IA('"expr" must be a string!');
	    }

	    try {
	      return scope.$watch(function () {
	        return _this.lastModified(resourceName, id);
	      }, function () {
	        var item = _this.get(resourceName, id);
	        DSUtils.set(scope, expr, item);
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
	        executor.call(undefined, angular.bind(deferred, deferred.resolve), angular.bind(deferred, deferred.reject));
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

	    var _loop = function () {
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

	    // Wrap certain sync functions with $apply
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

	angular.module('js-data', ['ng']).value('DSUtils', JSData.DSUtils).value('DSErrors', JSData.DSErrors).provider('DS', DSProvider);

	for (var i = 0; i < adapters.length; i++) {
	  registerAdapter(adapters[i]);
	}

	if (!httpLoaded) {
	  (function () {
	    var Defaults = (function () {
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
	    })();

	    var defaultsPrototype = Defaults.prototype;

	    defaultsPrototype.basePath = '';

	    defaultsPrototype.forceTrailingSlash = '';

	    defaultsPrototype.httpConfig = {};

	    var DSHttpAdapter = (function () {
	      function DSHttpAdapter(options) {
	        _classCallCheck(this, DSHttpAdapter);

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
	      }

	      _createClass(DSHttpAdapter, [{
	        key: 'getPath',
	        value: function getPath(method, resourceConfig, id, options) {
	          var _this = this;
	          options = options || {};
	          var args = [options.basePath || _this.defaults.basePath || resourceConfig.basePath, resourceConfig.getEndpoint(isString(id) || isNumber(id) || method === 'create' ? id : null, options)];
	          if (method === 'find' || method === 'update' || method === 'destroy') {
	            args.push(id);
	          }
	          return makePath.apply(DSUtils, args);
	        }
	      }, {
	        key: 'GET',
	        value: function GET(url, config) {
	          config = config || {};
	          if (!('method' in config)) {
	            config.method = 'get';
	          }
	          return this.HTTP(deepMixIn(config, {
	            url: url
	          }));
	        }
	      }, {
	        key: 'POST',
	        value: function POST(url, attrs, config) {
	          config = config || {};
	          config = DSUtils.copy(config);
	          if (!('method' in config)) {
	            config.method = 'post';
	          }
	          return this.HTTP(deepMixIn(config, {
	            url: url,
	            data: attrs
	          }));
	        }
	      }, {
	        key: 'PUT',
	        value: function PUT(url, attrs, config) {
	          config = config || {};
	          if (!('method' in config)) {
	            config.method = 'put';
	          }
	          return this.HTTP(deepMixIn(config, {
	            url: url,
	            data: attrs || {}
	          }));
	        }
	      }, {
	        key: 'DEL',
	        value: function DEL(url, config) {
	          config = config || {};
	          if (!('method' in config)) {
	            config.method = 'delete';
	          }
	          return this.HTTP(deepMixIn(config, {
	            url: url
	          }));
	        }
	      }, {
	        key: 'find',
	        value: function find(resourceConfig, id, options) {
	          var _this = this;
	          options = options ? copy(options) : {};
	          options.suffix = options.suffix || resourceConfig.suffix;
	          options.params = options.params || {};
	          options.params = _this.defaults.queryTransform(resourceConfig, options.params);
	          return _this.GET(_this.getPath('find', resourceConfig, id, options), options).then(function (data) {
	            var item = (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	            return !item ? JSData.DSUtils.Promise.reject(new Error('Not Found!')) : item;
	          });
	        }
	      }, {
	        key: 'findAll',
	        value: function findAll(resourceConfig, params, options) {
	          var _this = this;
	          options = options ? copy(options) : {};
	          options.suffix = options.suffix || resourceConfig.suffix;
	          options.params = options.params || {};
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
	          options = options ? copy(options) : {};
	          options.suffix = options.suffix || resourceConfig.suffix;
	          options.params = options.params || {};
	          options.params = _this.defaults.queryTransform(resourceConfig, options.params);
	          return _this.POST(_this.getPath('create', resourceConfig, attrs, options), (options.serialize ? options.serialize : _this.defaults.serialize)(resourceConfig, attrs), options).then(function (data) {
	            return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	          });
	        }
	      }, {
	        key: 'update',
	        value: function update(resourceConfig, id, attrs, options) {
	          var _this = this;
	          options = options ? copy(options) : {};
	          options.suffix = options.suffix || resourceConfig.suffix;
	          options.params = options.params || {};
	          options.params = _this.defaults.queryTransform(resourceConfig, options.params);
	          return _this.PUT(_this.getPath('update', resourceConfig, id, options), (options.serialize ? options.serialize : _this.defaults.serialize)(resourceConfig, attrs), options).then(function (data) {
	            return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	          });
	        }
	      }, {
	        key: 'updateAll',
	        value: function updateAll(resourceConfig, attrs, params, options) {
	          var _this = this;
	          options = options ? copy(options) : {};
	          options.suffix = options.suffix || resourceConfig.suffix;
	          options.params = options.params || {};
	          if (params) {
	            params = _this.defaults.queryTransform(resourceConfig, params);
	            deepMixIn(options.params, params);
	          }
	          return this.PUT(_this.getPath('updateAll', resourceConfig, attrs, options), (options.serialize ? options.serialize : _this.defaults.serialize)(resourceConfig, attrs), options).then(function (data) {
	            return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	          });
	        }
	      }, {
	        key: 'destroy',
	        value: function destroy(resourceConfig, id, options) {
	          var _this = this;
	          options = options ? copy(options) : {};
	          options.suffix = options.suffix || resourceConfig.suffix;
	          options.params = options.params || {};
	          options.params = _this.defaults.queryTransform(resourceConfig, options.params);
	          return _this.DEL(_this.getPath('destroy', resourceConfig, id, options), options).then(function (data) {
	            return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
	          });
	        }
	      }, {
	        key: 'destroyAll',
	        value: function destroyAll(resourceConfig, params, options) {
	          var _this = this;
	          options = options ? copy(options) : {};
	          options.suffix = options.suffix || resourceConfig.suffix;
	          options.params = options.params || {};
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
	    })();

	    var dsHttpAdapterPrototype = DSHttpAdapter.prototype;

	    var DSHttpAdapterProvider = function DSHttpAdapterProvider() {
	      _classCallCheck(this, DSHttpAdapterProvider);

	      var _this = this;
	      _this.defaults = {};
	      _this.$get = ['$http', 'DS', '$q', function ($http, DS, $q) {
	        dsHttpAdapterPrototype.HTTP = function (config) {
	          var _this = this;
	          var start = new Date();
	          config = copy(config);
	          config = deepMixIn(config, _this.defaults.httpConfig);
	          if (_this.defaults.forceTrailingSlash && config.url[config.url.length - 1] !== '/') {
	            config.url += '/';
	          }
	          config.method = config.method.toUpperCase();
	          if (typeof config.data === 'object') {
	            config.data = removeCircular(config.data);
	          }
	          var suffix = config.suffix || _this.defaults.suffix;
	          if (suffix && config.url.substr(config.url.length - suffix.length) !== suffix) {
	            config.url += suffix;
	          }

	          function logResponse(data) {
	            var str = '' + start.toUTCString() + ' - ' + data.config.method.toUpperCase() + ' ' + data.config.url + ' - ' + data.status + ' ' + (new Date().getTime() - start.getTime()) + 'ms';
	            if (data.status >= 200 && data.status < 300) {
	              if (_this.defaults.log) {
	                _this.defaults.log(str, data);
	              }
	              return data;
	            } else {
	              if (_this.defaults.error) {
	                _this.defaults.error('FAILED: ' + str, data);
	              }
	              return $q.reject(data);
	            }
	          }

	          return $http(config).then(logResponse, logResponse);
	        };

	        var adapter = new DSHttpAdapter(_this.defaults);
	        DS.registerAdapter('http', adapter, { 'default': true });
	        return adapter;
	      }];
	    };

	    angular.module('js-data').provider('DSHttpAdapter', DSHttpAdapterProvider);
	  })();
	}
	angular.module('js-data').run(['DS', 'DSHttpAdapter', function (DS, DSHttpAdapter) {
	  return DS.registerAdapter('http', DSHttpAdapter, { 'default': true });
	}]);

	// return the module name
	exports['default'] = 'js-data';
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	if(typeof __WEBPACK_EXTERNAL_MODULE_1__ === 'undefined') {var e = new Error("Cannot find module \"undefined\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	if(typeof __WEBPACK_EXTERNAL_MODULE_2__ === 'undefined') {var e = new Error("Cannot find module \"angular\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
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
	webpackContext.id = 3;


/***/ }
/******/ ])
});
;