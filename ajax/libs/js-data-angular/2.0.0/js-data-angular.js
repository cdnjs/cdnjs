/**
* @author Jason Dobry <jason.dobry@gmail.com>
* @file js-data-angular.js
* @version 2.0.0 - Homepage <http://www.js-data.io/js-data-angular/>
* @copyright (c) 2014 Jason Dobry <https://github.com/jmdobry/>
* @license MIT <https://github.com/js-data/js-data-angular/blob/master/LICENSE>
*
* @overview Angular wrapper for js-data.js.
*/
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jshint loopfunc:true*/
(function (window, angular, undefined) {
  'use strict';

  var JSData;

  try {
    JSData = require('js-data');
  } catch (e) {

  }

  if (!JSData) {
    JSData = window.JSData;
  }

  if (!JSData) {
    throw new Error('js-data must be loaded!');
  }

  var DSUtils = JSData.DSUtils;

  var deepMixIn = JSData.DSUtils.deepMixIn;
  var httpLoaded = false;

  var adapters = [
    {
      project: 'js-data-http',
      name: 'http',
      class: 'DSHttpAdapter'
    },
    {
      project: 'js-data-localstorage',
      name: 'localstorage',
      class: 'DSLocalStorageAdapter'
    },
    {
      project: 'js-data-localforage',
      name: 'localforage',
      class: 'DSLocalForageAdapter'
    },
    {
      project: 'js-data-firebase',
      name: 'firebase',
      class: 'DSFirebaseAdapter'
    }
  ];

  var functionsToWrap = [
    'compute',
    'digest',
    'eject',
    'inject',
    'link',
    'linkAll',
    'linkInverse',
    'unlinkInverse'
  ];

  function Defaults() {

  }

  function DSHttpAdapter(options) {
    this.defaults = new Defaults();
    deepMixIn(this.defaults, options);
  }

  function registerAdapter(adapter) {
    var Adapter;

    try {
      Adapter = require(adapter.project);
    } catch (e) {

    }

    if (!Adapter) {
      Adapter = window[adapter.class];
    }

    if (Adapter) {
      if (adapter.name === 'http') {
        httpLoaded = true;
      }
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

  angular.module('js-data', ['ng'])
    .value('DSUtils', JSData.DSUtils)
    .value('DSErrors', JSData.DSErrors)
    .provider('DS', function () {

      var _this = this;
      var DSErrors = JSData.DSErrors;
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
        var args = Array.prototype.slice.call(arguments);
        var $rootScope = args[args.length - 2];
        var $q = args[args.length - 1];
        var store = new JSData.DS(_this.defaults);
        var originals = {};

        function QPromise(executor) {
          var deferred = $q.defer();

          try {
            executor.call(undefined,
              angular.bind(deferred, deferred.resolve),
              angular.bind(deferred, deferred.reject));
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
              }
            }
          }
        }

        // Wrap certain sync functions with $apply
        for (var k = 0; k < functionsToWrap.length; k++) {
          originals[functionsToWrap[k]] = store[functionsToWrap[k]];
          store[functionsToWrap[k]] = (function (name) {
            return function () {
              var args = arguments;
              if (!$rootScope.$$phase) {
                return $rootScope.$apply(function () {
                  return originals[name].apply(store, args);
                });
              }
              return originals[name].apply(store, args);
            };
          })(functionsToWrap[k]);
        }

        // Hook into the digest loop
        if (typeof Object.observe !== 'function' || typeof Array.observe !== 'function') {
          $rootScope.$watch(function () {
            store.observe.Platform.performMicrotaskCheckpoint();
          });
        }

        return store;
      }

      deps.push('$rootScope');
      deps.push('$q');
      deps.push(load);

      _this.$get = deps;
    });


  for (var i = 0; i < adapters.length; i++) {
    registerAdapter(adapters[i]);
  }

  if (!httpLoaded) {
    var defaultsPrototype = Defaults.prototype;

    defaultsPrototype.queryTransform = function (resource, params) {
      return params;
    };

    defaultsPrototype.basePath = '';

    defaultsPrototype.forceTrailingSlash = '';

    defaultsPrototype.httpConfig = {};

    defaultsPrototype.log = console ? function (a, b) {
      console[typeof console.info === 'function' ? 'info' : 'log'](a, b);
    } : function () {
    };

    defaultsPrototype.error = console ? function (a, b) {
      console[typeof console.error === 'function' ? 'error' : 'log'](a, b);
    } : function () {
    };

    defaultsPrototype.deserialize = function (resource, data) {
      return data ? ('data' in data ? data.data : data) : data;
    };

    defaultsPrototype.serialize = function (resource, data) {
      return data;
    };

    var dsHttpAdapterPrototype = DSHttpAdapter.prototype;

    dsHttpAdapterPrototype.getPath = function (method, resourceConfig, id, options) {
      var _this = this;
      options = options || {};
      var args = [
        options.basePath || _this.defaults.basePath || resourceConfig.basePath,
        resourceConfig.getEndpoint((DSUtils.isString(id) || DSUtils.isNumber(id) || method === 'create') ? id : null, options)
      ];
      if (method === 'find' || method === 'update' || method === 'destroy') {
        args.push(id);
      }
      return DSUtils.makePath.apply(DSUtils, args);
    };

    dsHttpAdapterPrototype.GET = function (url, config) {
      config = config || {};
      if (!('method' in config)) {
        config.method = 'get';
      }
      return this.HTTP(deepMixIn(config, {
        url: url
      }));
    };

    dsHttpAdapterPrototype.POST = function (url, attrs, config) {
      config = config || {};
      config = DSUtils.copy(config);
      if (!('method' in config)) {
        config.method = 'post';
      }
      return this.HTTP(deepMixIn(config, {
        url: url,
        data: attrs
      }));
    };

    dsHttpAdapterPrototype.PUT = function (url, attrs, config) {
      config = config || {};
      if (!('method' in config)) {
        config.method = 'put';
      }
      return this.HTTP(deepMixIn(config, {
        url: url,
        data: attrs || {}
      }));
    };

    dsHttpAdapterPrototype.DEL = function (url, config) {
      config = config || {};
      if (!('method' in config)) {
        config.method = 'delete';
      }
      return this.HTTP(deepMixIn(config, {
        url: url
      }));
    };

    dsHttpAdapterPrototype.find = function (resourceConfig, id, options) {
      var _this = this;
      options = options || {};
      return _this.GET(
        _this.getPath('find', resourceConfig, id, options),
        options
      ).then(function (data) {
          return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
        });
    };

    dsHttpAdapterPrototype.findAll = function (resourceConfig, params, options) {
      var _this = this;
      options = options || {};
      options = DSUtils.copy(options);
      options.params = options.params || {};
      if (params) {
        params = _this.defaults.queryTransform(resourceConfig, params);
        deepMixIn(options.params, params);
      }
      return _this.GET(
        _this.getPath('findAll', resourceConfig, params, options),
        options
      ).then(function (data) {
          return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
        });
    };

    dsHttpAdapterPrototype.create = function (resourceConfig, attrs, options) {
      var _this = this;
      options = options || {};
      return _this.POST(
        _this.getPath('create', resourceConfig, attrs, options),
        (options.serialize ? options.serialize : _this.defaults.serialize)(resourceConfig, attrs),
        options
      ).then(function (data) {
          return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
        });
    };

    dsHttpAdapterPrototype.update = function (resourceConfig, id, attrs, options) {
      var _this = this;
      options = options || {};
      return _this.PUT(
        _this.getPath('update', resourceConfig, id, options),
        (options.serialize ? options.serialize : _this.defaults.serialize)(resourceConfig, attrs),
        options
      ).then(function (data) {
          return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
        });
    };

    dsHttpAdapterPrototype.updateAll = function (resourceConfig, attrs, params, options) {
      var _this = this;
      options = options || {};
      options = DSUtils.copy(options);
      options.params = options.params || {};
      if (params) {
        params = _this.defaults.queryTransform(resourceConfig, params);
        deepMixIn(options.params, params);
      }
      return this.PUT(
        _this.getPath('updateAll', resourceConfig, attrs, options),
        (options.serialize ? options.serialize : _this.defaults.serialize)(resourceConfig, attrs),
        options
      ).then(function (data) {
          return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
        });
    };

    dsHttpAdapterPrototype.destroy = function (resourceConfig, id, options) {
      var _this = this;
      options = options || {};
      return _this.DEL(
        _this.getPath('destroy', resourceConfig, id, options),
        options
      ).then(function (data) {
          return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
        });
    };

    dsHttpAdapterPrototype.destroyAll = function (resourceConfig, params, options) {
      var _this = this;
      options = options || {};
      options = DSUtils.copy(options);
      options.params = options.params || {};
      if (params) {
        params = _this.defaults.queryTransform(resourceConfig, params);
        deepMixIn(options.params, params);
      }
      return this.DEL(
        _this.getPath('destroyAll', resourceConfig, params, options),
        options
      ).then(function (data) {
          return (options.deserialize ? options.deserialize : _this.defaults.deserialize)(resourceConfig, data);
        });
    };

    angular.module('js-data').provider('DSHttpAdapter', function () {
      var _this = this;
      _this.defaults = {};
      _this.$get = ['$http', 'DS', '$q', function ($http, DS, $q) {
        dsHttpAdapterPrototype.HTTP = function (config) {
          var _this = this;
          var start = new Date();
          config = deepMixIn(config, _this.defaults.httpConfig);
          if (_this.defaults.forceTrailingSlash && config.url[config.url.length] !== '/') {
            config.url += '/';
          }
          config.method = config.method.toUpperCase();

          function logResponse(data) {
            var str = start.toUTCString() + ' - ' + data.config.method.toUpperCase() + ' ' + data.config.url + ' - ' + data.status + ' ' + (new Date().getTime() - start.getTime()) + 'ms';
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
        DS.registerAdapter('http', adapter, { default: true });
        return adapter;
      }];
    });

    angular.module('js-data').run(['DS', 'DSHttpAdapter', function (DS, DSHttpAdapter) {
      DS.registerAdapter('http', DSHttpAdapter, { default: true });
    }]);
  }

})(window, window.angular);

},{"js-data":"js-data"}]},{},[1]);
