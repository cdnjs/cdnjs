/*!
 * js-data-http
 * @version 3.0.0-beta.1 - Homepage <http://www.js-data.io/docs/dshttpadapter>
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @copyright (c) 2014-2015 Jason Dobry 
 * @license MIT <https://github.com/js-data/js-data-http/blob/master/LICENSE>
 * 
 * @overview Http adapter for js-data.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-data"));
	else if(typeof define === 'function' && define.amd)
		define(["js-data"], factory);
	else if(typeof exports === 'object')
		exports["DSHttpAdapter"] = factory(require("js-data"));
	else
		root["DSHttpAdapter"] = factory(root["JSData"]);
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
	var DSUtils = JSData.DSUtils;
	var deepMixIn = DSUtils.deepMixIn;
	var removeCircular = DSUtils.removeCircular;
	var copy = DSUtils.copy;
	var makePath = DSUtils.makePath;
	var isString = DSUtils.isString;
	var isNumber = DSUtils.isNumber;

	function encode(val) {
	  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+');
	}

	function buildUrl(url, params) {
	  if (!params) {
	    return url;
	  }

	  var parts = [];

	  DSUtils.forOwn(params, function (val, key) {
	    if (val === null || typeof val === 'undefined') {
	      return;
	    }
	    if (!DSUtils.isArray(val)) {
	      val = [val];
	    }

	    DSUtils.forEach(val, function (v) {
	      if (window.toString.call(v) === '[object Date]') {
	        v = v.toISOString();
	      } else if (DSUtils.isObject(v)) {
	        v = DSUtils.toJson(v);
	      }
	      parts.push(encode(key) + '=' + encode(v));
	    });
	  });

	  if (parts.length > 0) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
	  }

	  return url;
	}

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

	defaultsPrototype.httpLibName = 'axios';

	defaultsPrototype.basePath = '';

	defaultsPrototype.forceTrailingSlash = '';

	defaultsPrototype.httpConfig = {};

	defaultsPrototype.useFetch = false;

	var DSHttpAdapter = (function () {
	  function DSHttpAdapter(options) {
	    _classCallCheck(this, DSHttpAdapter);

	    options = options || {};
	    this.defaults = new Defaults();
	    this.http = options.http;
	    delete options.http;
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

	    if (this.defaults.useFetch && window.fetch) {
	      this.defaults.deserialize = function (resourceConfig, response) {
	        return response.json();
	      };
	      this.http = function (config) {

	        var requestConfig = {
	          method: config.method,
	          // turn the plain headers object into the Fetch Headers object
	          headers: new window.Headers(config.headers)
	        };

	        if (config.data) {
	          requestConfig.body = DSUtils.toJson(config.data);
	        }

	        return window.fetch(new window.Request(buildUrl(config.url, config.params), requestConfig)).then(function (response) {
	          response.config = {
	            method: config.method,
	            url: config.url
	          };
	          return response;
	        });
	      };
	    }

	    if (!this.http) {
	      try {
	        this.http = window[this.defaults.httpLibName];
	      } catch (e) {}
	    }
	  }

	  _createClass(DSHttpAdapter, [{
	    key: 'getEndpoint',
	    value: function getEndpoint(resourceConfig, id, options) {
	      var _this2 = this;

	      options = options || {};
	      options.params = options.params || {};

	      var item = undefined;
	      var parentKey = resourceConfig.parentKey;
	      var endpoint = options.hasOwnProperty('endpoint') ? options.endpoint : resourceConfig.endpoint;
	      var parentField = resourceConfig.parentField;
	      var parentDef = resourceConfig.getResource(resourceConfig.parent);
	      var parentId = options.params[parentKey];

	      if (parentId === false || !parentKey || !parentDef) {
	        if (parentId === false) {
	          delete options.params[parentKey];
	        }
	        return endpoint;
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
	          var _ret = (function () {
	            delete options.endpoint;
	            var _options = {};
	            DSUtils.forOwn(options, function (value, key) {
	              _options[key] = value;
	            });
	            return {
	              v: DSUtils.makePath(_this2.getEndpoint(parentDef, parentId, DSUtils._(parentDef, _options)), parentId, endpoint)
	            };
	          })();

	          if (typeof _ret === 'object') return _ret.v;
	        } else {
	          return endpoint;
	        }
	      }
	    }
	  }, {
	    key: 'getPath',
	    value: function getPath(method, resourceConfig, id, options) {
	      var _this = this;
	      options = options || {};
	      var args = [options.basePath || _this.defaults.basePath || resourceConfig.basePath, this.getEndpoint(resourceConfig, isString(id) || isNumber(id) || method === 'create' ? id : null, options)];
	      if (method === 'find' || method === 'update' || method === 'destroy') {
	        args.push(id);
	      }
	      return makePath.apply(DSUtils, args);
	    }
	  }, {
	    key: 'HTTP',
	    value: function HTTP(config) {
	      var _this = this;
	      var start = new Date();
	      config = copy(config);
	      config = deepMixIn(config, _this.defaults.httpConfig);
	      if (_this.defaults.forceTrailingSlash && config.url[config.url.length - 1] !== '/') {
	        config.url += '/';
	      }
	      if (typeof config.data === 'object') {
	        config.data = removeCircular(config.data);
	      }
	      config.method = config.method.toUpperCase();
	      var suffix = config.suffix || _this.defaults.suffix;
	      if (suffix && config.url.substr(config.url.length - suffix.length) !== suffix) {
	        config.url += suffix;
	      }

	      function logResponse(data) {
	        var str = start.toUTCString() + ' - ' + config.method.toUpperCase() + ' ' + config.url + ' - ' + data.status + ' ' + (new Date().getTime() - start.getTime()) + 'ms';
	        if (data.status >= 200 && data.status < 300) {
	          if (_this.defaults.log) {
	            _this.defaults.log(str, data);
	          }
	          return data;
	        } else {
	          if (_this.defaults.error) {
	            _this.defaults.error('\'FAILED: ' + str, data);
	          }
	          return DSUtils.Promise.reject(data);
	        }
	      }

	      if (!this.http) {
	        throw new Error('You have not configured this adapter with an http library!');
	      }

	      return this.http(config).then(logResponse, logResponse);
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
	        return !item ? DSUtils.Promise.reject(new Error('Not Found!')) : item;
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
	      return _this.POST(_this.getPath('create', resourceConfig, attrs, options), options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs), options).then(function (data) {
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
	      return _this.PUT(_this.getPath('update', resourceConfig, id, options), options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs), options).then(function (data) {
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
	      return this.PUT(_this.getPath('updateAll', resourceConfig, attrs, options), options.serialize ? options.serialize(resourceConfig, attrs) : _this.defaults.serialize(resourceConfig, attrs), options).then(function (data) {
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

	module.exports = DSHttpAdapter;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;