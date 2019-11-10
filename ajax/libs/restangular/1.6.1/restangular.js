/**
 * Restful Resources service for AngularJS apps
 * @version v1.6.1 - 2017-01-06 * @link https://github.com/mgonto/restangular
 * @author Martin Gontovnikas <martin@gon.to>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */(function(root, factory) {
  /* global define, require */
  // https://github.com/umdjs/umd/blob/master/templates/returnExports.js
  if (typeof define === 'function' && define.amd) {
    define(['lodash', 'angular'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('lodash'), require('angular'));
  } else {
    // No global export, Restangular will register itself as Angular.js module
    factory(root._, root.angular);
  }
}(this, function(_, angular) {

  var restangular = angular.module('restangular', []);

  restangular.provider('Restangular', function() {
    // Configuration
    var Configurer = {};
    Configurer.init = function(object, config) {
      object.configuration = config;

      /**
       * Those are HTTP safe methods for which there is no need to pass any data with the request.
       */
      var safeMethods = ['get', 'head', 'options', 'trace', 'getlist'];
      config.isSafe = function(operation) {
        return _.includes(safeMethods, operation.toLowerCase());
      };

      var absolutePattern = /^https?:\/\//i;
      config.isAbsoluteUrl = function(string) {
        return _.isUndefined(config.absoluteUrl) || _.isNull(config.absoluteUrl) ?
          string && absolutePattern.test(string) :
          config.absoluteUrl;
      };

      config.absoluteUrl = _.isUndefined(config.absoluteUrl) ? true : config.absoluteUrl;
      object.setSelfLinkAbsoluteUrl = function(value) {
        config.absoluteUrl = value;
      };
      /**
       * This is the BaseURL to be used with Restangular
       */
      config.baseUrl = _.isUndefined(config.baseUrl) ? '' : config.baseUrl;
      object.setBaseUrl = function(newBaseUrl) {
        config.baseUrl = /\/$/.test(newBaseUrl) ?
          newBaseUrl.substring(0, newBaseUrl.length - 1) :
          newBaseUrl;
        return this;
      };

      /**
       * Sets the extra fields to keep from the parents
       */
      config.extraFields = config.extraFields || [];
      object.setExtraFields = function(newExtraFields) {
        config.extraFields = newExtraFields;
        return this;
      };

      /**
       * Some default $http parameter to be used in EVERY call
       **/
      config.defaultHttpFields = config.defaultHttpFields || {};
      object.setDefaultHttpFields = function(values) {
        config.defaultHttpFields = values;
        return this;
      };

      /**
       * Always return plain data, no restangularized object
       **/
      config.plainByDefault = config.plainByDefault || false;
      object.setPlainByDefault = function(value) {
        config.plainByDefault = value === true ? true : false;
        return this;
      };

      config.withHttpValues = function(httpLocalConfig, obj) {
        return _.defaults(obj, httpLocalConfig, config.defaultHttpFields);
      };

      config.encodeIds = _.isUndefined(config.encodeIds) ? true : config.encodeIds;
      object.setEncodeIds = function(encode) {
        config.encodeIds = encode;
      };

      config.defaultRequestParams = config.defaultRequestParams || {
        get: {},
        post: {},
        put: {},
        remove: {},
        common: {}
      };

      object.setDefaultRequestParams = function(param1, param2) {
        var methods = [],
          params = param2 || param1;
        if (!_.isUndefined(param2)) {
          if (_.isArray(param1)) {
            methods = param1;
          } else {
            methods.push(param1);
          }
        } else {
          methods.push('common');
        }

        _.each(methods, function(method) {
          config.defaultRequestParams[method] = params;
        });
        return this;
      };

      object.requestParams = config.defaultRequestParams;

      config.defaultHeaders = config.defaultHeaders || {};
      object.setDefaultHeaders = function(headers) {
        config.defaultHeaders = headers;
        object.defaultHeaders = config.defaultHeaders;
        return this;
      };

      object.defaultHeaders = config.defaultHeaders;

      /**
       * Method overriders will set which methods are sent via POST with an X-HTTP-Method-Override
       **/
      config.methodOverriders = config.methodOverriders || [];
      object.setMethodOverriders = function(values) {
        var overriders = _.extend([], values);
        if (config.isOverridenMethod('delete', overriders)) {
          overriders.push('remove');
        }
        config.methodOverriders = overriders;
        return this;
      };

      config.jsonp = _.isUndefined(config.jsonp) ? false : config.jsonp;
      object.setJsonp = function(active) {
        config.jsonp = active;
      };

      config.isOverridenMethod = function(method, values) {
        var search = values || config.methodOverriders;
        return !_.isUndefined(_.find(search, function(one) {
          return one.toLowerCase() === method.toLowerCase();
        }));
      };

      /**
       * Sets the URL creator type. For now, only Path is created. In the future we'll have queryParams
       **/
      config.urlCreator = config.urlCreator || 'path';
      object.setUrlCreator = function(name) {
        if (!_.has(config.urlCreatorFactory, name)) {
          throw new Error('URL Path selected isn\'t valid');
        }

        config.urlCreator = name;
        return this;
      };

      /**
       * You can set the restangular fields here. The 3 required fields for Restangular are:
       *
       * id: Id of the element
       * route: name of the route of this element
       * parentResource: the reference to the parent resource
       *
       *  All of this fields except for id, are handled (and created) by Restangular. By default,
       *  the field values will be id, route and parentResource respectively
       */
      config.restangularFields = config.restangularFields || {
        id: 'id',
        route: 'route',
        parentResource: 'parentResource',
        restangularCollection: 'restangularCollection',
        cannonicalId: '__cannonicalId',
        etag: 'restangularEtag',
        selfLink: 'href',
        get: 'get',
        getList: 'getList',
        put: 'put',
        post: 'post',
        remove: 'remove',
        head: 'head',
        trace: 'trace',
        options: 'options',
        patch: 'patch',
        getRestangularUrl: 'getRestangularUrl',
        getRequestedUrl: 'getRequestedUrl',
        putElement: 'putElement',
        addRestangularMethod: 'addRestangularMethod',
        getParentList: 'getParentList',
        clone: 'clone',
        ids: 'ids',
        httpConfig: '_$httpConfig',
        reqParams: 'reqParams',
        one: 'one',
        all: 'all',
        several: 'several',
        oneUrl: 'oneUrl',
        allUrl: 'allUrl',
        customPUT: 'customPUT',
        customPATCH: 'customPATCH',
        customPOST: 'customPOST',
        customDELETE: 'customDELETE',
        customGET: 'customGET',
        customGETLIST: 'customGETLIST',
        customOperation: 'customOperation',
        doPUT: 'doPUT',
        doPATCH: 'doPATCH',
        doPOST: 'doPOST',
        doDELETE: 'doDELETE',
        doGET: 'doGET',
        doGETLIST: 'doGETLIST',
        fromServer: 'fromServer',
        withConfig: 'withConfig',
        withHttpConfig: 'withHttpConfig',
        singleOne: 'singleOne',
        plain: 'plain',
        save: 'save',
        restangularized: 'restangularized'
      };
      object.setRestangularFields = function(resFields) {
        config.restangularFields =
          _.extend(config.restangularFields, resFields);
        return this;
      };

      config.isRestangularized = function(obj) {
        return !!obj[config.restangularFields.restangularized];
      };

      config.setFieldToElem = function(field, elem, value) {
        var properties = field.split('.');
        var idValue = elem;
        _.each(_.initial(properties), function(prop) {
          idValue[prop] = {};
          idValue = idValue[prop];
        });
        idValue[_.last(properties)] = value;
        return this;
      };

      config.getFieldFromElem = function(field, elem) {
        var properties = field.split('.');
        var idValue = elem;
        _.each(properties, function(prop) {
          if (idValue) {
            idValue = idValue[prop];
          }
        });
        return angular.copy(idValue);
      };

      config.setIdToElem = function(elem, id /*, route */ ) {
        config.setFieldToElem(config.restangularFields.id, elem, id);
        return this;
      };

      config.getIdFromElem = function(elem) {
        return config.getFieldFromElem(config.restangularFields.id, elem);
      };

      config.isValidId = function(elemId) {
        return '' !== elemId && !_.isUndefined(elemId) && !_.isNull(elemId);
      };

      config.setUrlToElem = function(elem, url /*, route */ ) {
        config.setFieldToElem(config.restangularFields.selfLink, elem, url);
        return this;
      };

      config.getUrlFromElem = function(elem) {
        return config.getFieldFromElem(config.restangularFields.selfLink, elem);
      };

      config.useCannonicalId = _.isUndefined(config.useCannonicalId) ? false : config.useCannonicalId;
      object.setUseCannonicalId = function(value) {
        config.useCannonicalId = value;
        return this;
      };

      config.getCannonicalIdFromElem = function(elem) {
        var cannonicalId = elem[config.restangularFields.cannonicalId];
        var actualId = config.isValidId(cannonicalId) ? cannonicalId : config.getIdFromElem(elem);
        return actualId;
      };

      /**
       * Sets the Response parser. This is used in case your response isn't directly the data.
       * For example if you have a response like {meta: {'meta'}, data: {name: 'Gonto'}}
       * you can extract this data which is the one that needs wrapping
       *
       * The ResponseExtractor is a function that receives the response and the method executed.
       */

      config.responseInterceptors = config.responseInterceptors || [];

      config.defaultResponseInterceptor = function(data /*, operation, what, url, response, deferred */ ) {
        return data;
      };

      config.responseExtractor = function(data, operation, what, url, response, deferred) {
        var interceptors = angular.copy(config.responseInterceptors);
        interceptors.push(config.defaultResponseInterceptor);
        var theData = data;
        _.each(interceptors, function(interceptor) {
          theData = interceptor(theData, operation,
            what, url, response, deferred);
        });
        return theData;
      };

      object.addResponseInterceptor = function(extractor) {
        config.responseInterceptors.push(extractor);
        return this;
      };

      config.errorInterceptors = config.errorInterceptors || [];
      object.addErrorInterceptor = function(interceptor) {
        config.errorInterceptors.push(interceptor);
        return this;
      };

      object.setResponseInterceptor = object.addResponseInterceptor;
      object.setResponseExtractor = object.addResponseInterceptor;
      object.setErrorInterceptor = object.addErrorInterceptor;

      /**
       * Response interceptor is called just before resolving promises.
       */


      /**
       * Request interceptor is called before sending an object to the server.
       */
      config.requestInterceptors = config.requestInterceptors || [];

      config.defaultInterceptor = function(element, operation, path, url, headers, params, httpConfig) {
        return {
          element: element,
          headers: headers,
          params: params,
          httpConfig: httpConfig
        };
      };

      config.fullRequestInterceptor = function(element, operation, path, url, headers, params, httpConfig) {
        var interceptors = angular.copy(config.requestInterceptors);
        var defaultRequest = config.defaultInterceptor(element, operation, path, url, headers, params, httpConfig);
        return _.reduce(interceptors, function(request, interceptor) {
          return _.extend(request, interceptor(request.element, operation,
            path, url, request.headers, request.params, request.httpConfig));
        }, defaultRequest);
      };

      object.addRequestInterceptor = function(interceptor) {
        config.requestInterceptors.push(function(elem, operation, path, url, headers, params, httpConfig) {
          return {
            headers: headers,
            params: params,
            element: interceptor(elem, operation, path, url),
            httpConfig: httpConfig
          };
        });
        return this;
      };

      object.setRequestInterceptor = object.addRequestInterceptor;

      object.addFullRequestInterceptor = function(interceptor) {
        config.requestInterceptors.push(interceptor);
        return this;
      };

      object.setFullRequestInterceptor = object.addFullRequestInterceptor;

      config.onBeforeElemRestangularized = config.onBeforeElemRestangularized || function(elem) {
        return elem;
      };
      object.setOnBeforeElemRestangularized = function(post) {
        config.onBeforeElemRestangularized = post;
        return this;
      };

      object.setRestangularizePromiseInterceptor = function(interceptor) {
        config.restangularizePromiseInterceptor = interceptor;
        return this;
      };

      /**
       * This method is called after an element has been "Restangularized".
       *
       * It receives the element, a boolean indicating if it's an element or a collection
       * and the name of the model
       *
       */
      config.onElemRestangularized = config.onElemRestangularized || function(elem) {
        return elem;
      };
      object.setOnElemRestangularized = function(post) {
        config.onElemRestangularized = post;
        return this;
      };

      config.shouldSaveParent = config.shouldSaveParent || function() {
        return true;
      };
      object.setParentless = function(values) {
        if (_.isArray(values)) {
          config.shouldSaveParent = function(route) {
            return !_.includes(values, route);
          };
        } else if (_.isBoolean(values)) {
          config.shouldSaveParent = function() {
            return !values;
          };
        }
        return this;
      };

      /**
       * This lets you set a suffix to every request.
       *
       * For example, if your api requires that for JSon requests you do /users/123.json, you can set that
       * in here.
       *
       *
       * By default, the suffix is null
       */
      config.suffix = _.isUndefined(config.suffix) ? null : config.suffix;
      object.setRequestSuffix = function(newSuffix) {
        config.suffix = newSuffix;
        return this;
      };

      /**
       * Add element transformers for certain routes.
       */
      config.transformers = config.transformers || {};
      config.matchTransformers = config.matchTransformers || [];
      object.addElementTransformer = function(type, secondArg, thirdArg) {
        var isCollection = null;
        var transformer = null;
        if (arguments.length === 2) {
          transformer = secondArg;
        } else {
          transformer = thirdArg;
          isCollection = secondArg;
        }

        var transformerFn = function(coll, elem) {
          if (_.isNull(isCollection) || (coll === isCollection)) {
            return transformer(elem);
          }
          return elem;
        };

        if (_.isRegExp(type)) {
          config.matchTransformers.push({
            regexp: type,
            transformer: transformerFn
          });
        } else {
          if (!config.transformers[type]) {
            config.transformers[type] = [];
          }
          config.transformers[type].push(transformerFn);
        }

        return object;
      };

      object.extendCollection = function(route, fn) {
        return object.addElementTransformer(route, true, fn);
      };

      object.extendModel = function(route, fn) {
        return object.addElementTransformer(route, false, fn);
      };

      config.transformElem = function(elem, isCollection, route, Restangular, force) {
        if (!force && !config.transformLocalElements && !elem[config.restangularFields.fromServer]) {
          return elem;
        }

        var changedElem = elem;

        var matchTransformers = config.matchTransformers;
        if (matchTransformers) {
          _.each(matchTransformers, function(transformer) {
            if (transformer.regexp.test(route)) {
              changedElem = transformer.transformer(isCollection, changedElem);
            }
          });
        }

        var typeTransformers = config.transformers[route];
        if (typeTransformers) {
          _.each(typeTransformers, function(transformer) {
            changedElem = transformer(isCollection, changedElem);
          });
        }
        return config.onElemRestangularized(changedElem, isCollection, route, Restangular);
      };

      config.transformLocalElements = _.isUndefined(config.transformLocalElements) ?
        false :
        config.transformLocalElements;

      object.setTransformOnlyServerElements = function(active) {
        config.transformLocalElements = !active;
      };

      config.fullResponse = _.isUndefined(config.fullResponse) ? false : config.fullResponse;
      object.setFullResponse = function(full) {
        config.fullResponse = full;
        return this;
      };


      //Internal values and functions
      config.urlCreatorFactory = {};

      /**
       * Base URL Creator. Base prototype for everything related to it
       **/

      var BaseCreator = function() {};

      BaseCreator.prototype.setConfig = function(config) {
        this.config = config;
        return this;
      };

      BaseCreator.prototype.parentsArray = function(current) {
        var parents = [];
        while (current) {
          parents.push(current);
          current = current[this.config.restangularFields.parentResource];
        }
        return parents.reverse();
      };

      function RestangularResource(config, $http, url, configurer) {
        var resource = {};
        _.each(_.keys(configurer), function(key) {
          var value = configurer[key];

          // Add default parameters
          value.params = _.extend({}, value.params, config.defaultRequestParams[value.method.toLowerCase()]);
          // We don't want the ? if no params are there
          if (_.isEmpty(value.params)) {
            delete value.params;
          }

          if (config.isSafe(value.method)) {

            resource[key] = function() {
              return $http(_.extend(value, {
                url: url
              }));
            };

          } else {

            resource[key] = function(data) {
              return $http(_.extend(value, {
                url: url,
                data: data
              }));
            };

          }
        });

        return resource;
      }

      BaseCreator.prototype.resource = function(current, $http, localHttpConfig, callHeaders, callParams, what, etag, operation) {

        var params = _.defaults(callParams || {}, this.config.defaultRequestParams.common);
        var headers = _.defaults(callHeaders || {}, this.config.defaultHeaders);

        if (etag) {
          if (!config.isSafe(operation)) {
            headers['If-Match'] = etag;
          } else {
            headers['If-None-Match'] = etag;
          }
        }

        var url = this.base(current);

        if (what || what === 0) {
          var add = '';
          if (!/\/$/.test(url)) {
            add += '/';
          }
          add += what;
          url += add;
        }

        if (this.config.suffix &&
          url.indexOf(this.config.suffix, url.length - this.config.suffix.length) === -1 &&
          !this.config.getUrlFromElem(current)) {
          url += this.config.suffix;
        }

        current[this.config.restangularFields.httpConfig] = undefined;

        return RestangularResource(this.config, $http, url, {
          getList: this.config.withHttpValues(localHttpConfig, {
            method: 'GET',
            params: params,
            headers: headers
          }),

          get: this.config.withHttpValues(localHttpConfig, {
            method: 'GET',
            params: params,
            headers: headers
          }),

          jsonp: this.config.withHttpValues(localHttpConfig, {
            method: 'jsonp',
            params: params,
            headers: headers
          }),

          put: this.config.withHttpValues(localHttpConfig, {
            method: 'PUT',
            params: params,
            headers: headers
          }),

          post: this.config.withHttpValues(localHttpConfig, {
            method: 'POST',
            params: params,
            headers: headers
          }),

          remove: this.config.withHttpValues(localHttpConfig, {
            method: 'DELETE',
            params: params,
            headers: headers
          }),

          head: this.config.withHttpValues(localHttpConfig, {
            method: 'HEAD',
            params: params,
            headers: headers
          }),

          trace: this.config.withHttpValues(localHttpConfig, {
            method: 'TRACE',
            params: params,
            headers: headers
          }),

          options: this.config.withHttpValues(localHttpConfig, {
            method: 'OPTIONS',
            params: params,
            headers: headers
          }),

          patch: this.config.withHttpValues(localHttpConfig, {
            method: 'PATCH',
            params: params,
            headers: headers
          })
        });
      };

      /**
       * This is the Path URL creator. It uses Path to show Hierarchy in the Rest API.
       * This means that if you have an Account that then has a set of Buildings, a URL to a building
       * would be /accounts/123/buildings/456
       **/
      var Path = function() {};

      Path.prototype = new BaseCreator();

      Path.prototype.normalizeUrl = function(url) {
        var parts = /((?:http[s]?:)?\/\/)?(.*)?/.exec(url);
        parts[2] = parts[2].replace(/[\\\/]+/g, '/');
        return (typeof parts[1] !== 'undefined') ? parts[1] + parts[2] : parts[2];
      };

      Path.prototype.base = function(current) {
        var __this = this;
        return _.reduce(this.parentsArray(current), function(acum, elem) {
          var elemUrl;
          var elemSelfLink = __this.config.getUrlFromElem(elem);
          if (elemSelfLink) {
            if (__this.config.isAbsoluteUrl(elemSelfLink)) {
              return elemSelfLink;
            } else {
              elemUrl = elemSelfLink;
            }
          } else {
            elemUrl = elem[__this.config.restangularFields.route];

            if (elem[__this.config.restangularFields.restangularCollection]) {
              var ids = elem[__this.config.restangularFields.ids];
              if (ids) {
                elemUrl += '/' + ids.join(',');
              }
            } else {
              var elemId;
              if (__this.config.useCannonicalId) {
                elemId = __this.config.getCannonicalIdFromElem(elem);
              } else {
                elemId = __this.config.getIdFromElem(elem);
              }

              if (config.isValidId(elemId) && !elem.singleOne) {
                elemUrl += '/' + (__this.config.encodeIds ? encodeURIComponent(elemId) : elemId);
              }
            }
          }
          acum = acum.replace(/\/$/, '') + '/' + elemUrl;
          return __this.normalizeUrl(acum);

        }, this.config.baseUrl);
      };



      Path.prototype.fetchUrl = function(current, what) {
        var baseUrl = this.base(current);
        if (what) {
          baseUrl += '/' + what;
        }
        return baseUrl;
      };

      Path.prototype.fetchRequestedUrl = function(current, what) {
        var url = this.fetchUrl(current, what);
        var params = current[config.restangularFields.reqParams];

        // From here on and until the end of fetchRequestedUrl,
        // the code has been kindly borrowed from angular.js
        // The reason for such code bloating is coherence:
        //   If the user were to use this for cache management, the
        //   serialization of parameters would need to be identical
        //   to the one done by angular for cache keys to match.
        function sortedKeys(obj) {
          var keys = [];
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              keys.push(key);
            }
          }
          return keys.sort();
        }

        function forEachSorted(obj, iterator, context) {
          var keys = sortedKeys(obj);
          for (var i = 0; i < keys.length; i++) {
            iterator.call(context, obj[keys[i]], keys[i]);
          }
          return keys;
        }

        function encodeUriQuery(val, pctEncodeSpaces) {
          return encodeURIComponent(val).
          replace(/%40/gi, '@').
          replace(/%3A/gi, ':').
          replace(/%24/g, '$').
          replace(/%2C/gi, ',').
          replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
        }

        if (!params) {
          return url + (this.config.suffix || '');
        }

        var parts = [];
        forEachSorted(params, function(value, key) {
          if (value === null || value === undefined) {
            return;
          }
          if (!angular.isArray(value)) {
            value = [value];
          }

          angular.forEach(value, function(v) {
            if (angular.isObject(v)) {
              v = angular.toJson(v);
            }
            parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(v));
          });
        });

        return url + (this.config.suffix || '') + ((url.indexOf('?') === -1) ? '?' : '&') + parts.join('&');
      };

      config.urlCreatorFactory.path = Path;
    };

    var globalConfiguration = {};

    Configurer.init(this, globalConfiguration);



    this.$get = ['$http', '$q', function($http, $q) {

      function createServiceForConfiguration(config) {
        var service = {};

        var urlHandler = new config.urlCreatorFactory[config.urlCreator]();
        urlHandler.setConfig(config);

        function restangularizeBase(parent, elem, route, reqParams, fromServer) {
          elem[config.restangularFields.route] = route;
          elem[config.restangularFields.getRestangularUrl] = _.bind(urlHandler.fetchUrl, urlHandler, elem);
          elem[config.restangularFields.getRequestedUrl] = _.bind(urlHandler.fetchRequestedUrl, urlHandler, elem);
          elem[config.restangularFields.addRestangularMethod] = _.bind(addRestangularMethodFunction, elem);
          elem[config.restangularFields.clone] = _.bind(copyRestangularizedElement, elem, elem);
          elem[config.restangularFields.reqParams] = _.isEmpty(reqParams) ? null : reqParams;
          elem[config.restangularFields.withHttpConfig] = _.bind(withHttpConfig, elem);
          elem[config.restangularFields.plain] = _.bind(stripRestangular, elem, elem);

          // Tag element as restangularized
          elem[config.restangularFields.restangularized] = true;

          // RequestLess connection
          elem[config.restangularFields.one] = _.bind(one, elem, elem);
          elem[config.restangularFields.all] = _.bind(all, elem, elem);
          elem[config.restangularFields.several] = _.bind(several, elem, elem);
          elem[config.restangularFields.oneUrl] = _.bind(oneUrl, elem, elem);
          elem[config.restangularFields.allUrl] = _.bind(allUrl, elem, elem);

          elem[config.restangularFields.fromServer] = !!fromServer;

          if (parent && config.shouldSaveParent(route)) {
            var parentId = config.getIdFromElem(parent);
            var parentUrl = config.getUrlFromElem(parent);

            var restangularFieldsForParent = _.union(
              _.values(_.pick(config.restangularFields, ['route', 'singleOne', 'parentResource'])),
              config.extraFields
            );
            var parentResource = _.pick(parent, restangularFieldsForParent);

            if (config.isValidId(parentId)) {
              config.setIdToElem(parentResource, parentId, route);
            }
            if (config.isValidId(parentUrl)) {
              config.setUrlToElem(parentResource, parentUrl, route);
            }

            elem[config.restangularFields.parentResource] = parentResource;
          } else {
            elem[config.restangularFields.parentResource] = null;
          }
          return elem;
        }

        function one(parent, route, id, singleOne) {
          var error;
          if (_.isNumber(route) || _.isNumber(parent)) {
            error = 'You\'re creating a Restangular entity with the number ';
            error += 'instead of the route or the parent. For example, you can\'t call .one(12).';
            throw new Error(error);
          }
          if (_.isUndefined(route)) {
            error = 'You\'re creating a Restangular entity either without the path. ';
            error += 'For example you can\'t call .one(). Please check if your arguments are valid.';
            throw new Error(error);
          }
          var elem = {};
          config.setIdToElem(elem, id, route);
          config.setFieldToElem(config.restangularFields.singleOne, elem, singleOne);
          return restangularizeElem(parent, elem, route, false);
        }


        function all(parent, route) {
          return restangularizeCollection(parent, [], route, false);
        }

        function several(parent, route /*, ids */ ) {
          var collection = [];
          collection[config.restangularFields.ids] = Array.prototype.splice.call(arguments, 2);
          return restangularizeCollection(parent, collection, route, false);
        }

        function oneUrl(parent, route, url) {
          if (!route) {
            throw new Error('Route is mandatory when creating new Restangular objects.');
          }
          var elem = {};
          config.setUrlToElem(elem, url, route);
          return restangularizeElem(parent, elem, route, false);
        }


        function allUrl(parent, route, url) {
          if (!route) {
            throw new Error('Route is mandatory when creating new Restangular objects.');
          }
          var elem = {};
          config.setUrlToElem(elem, url, route);
          return restangularizeCollection(parent, elem, route, false);
        }
        // Promises
        function restangularizePromise(promise, isCollection, valueToFill) {
          promise.call = _.bind(promiseCall, promise);
          promise.get = _.bind(promiseGet, promise);
          promise[config.restangularFields.restangularCollection] = isCollection;
          if (isCollection) {
            promise.push = _.bind(promiseCall, promise, 'push');
          }
          promise.$object = valueToFill;
          if (config.restangularizePromiseInterceptor) {
            config.restangularizePromiseInterceptor(promise);
          }
          return promise;
        }

        function promiseCall(method) {
          var deferred = $q.defer();
          var callArgs = arguments;
          var filledValue = {};
          this.then(function(val) {
            var params = Array.prototype.slice.call(callArgs, 1);
            var func = val[method];
            func.apply(val, params);
            filledValue = val;
            deferred.resolve(val);
          });
          return restangularizePromise(deferred.promise, this[config.restangularFields.restangularCollection], filledValue);
        }

        function promiseGet(what) {
          var deferred = $q.defer();
          var filledValue = {};
          this.then(function(val) {
            filledValue = val[what];
            deferred.resolve(filledValue);
          });
          return restangularizePromise(deferred.promise, this[config.restangularFields.restangularCollection], filledValue);
        }

        function resolvePromise(deferred, response, data, filledValue) {
          _.extend(filledValue, data);

          // Trigger the full response interceptor.
          if (config.fullResponse) {
            return deferred.resolve(_.extend(response, {
              data: data
            }));
          } else {
            deferred.resolve(data);
          }
        }


        // Elements
        function stripRestangular(elem) {
          if (_.isArray(elem)) {
            var array = [];
            _.each(elem, function(value) {
              array.push(config.isRestangularized(value) ? stripRestangular(value) : value);
            });
            return array;
          } else {
            return _.omit(elem, _.values(_.omit(config.restangularFields, 'id')));
          }
        }

        function addCustomOperation(elem) {
          elem[config.restangularFields.customOperation] = _.bind(customFunction, elem);
          var requestMethods = {
            get: customFunction,
            delete: customFunction
          };
          _.each(['put', 'patch', 'post'], function(name) {
            requestMethods[name] = function(operation, elem, path, params, headers) {
              return _.bind(customFunction, this)(operation, path, params, headers, elem);
            };
          });
          _.each(requestMethods, function(requestFunc, name) {
            var callOperation = name === 'delete' ? 'remove' : name;
            _.each(['do', 'custom'], function(alias) {
              elem[alias + name.toUpperCase()] = _.bind(requestFunc, elem, callOperation);
            });
          });
          elem[config.restangularFields.customGETLIST] = _.bind(fetchFunction, elem);
          elem[config.restangularFields.doGETLIST] = elem[config.restangularFields.customGETLIST];
        }

        function copyRestangularizedElement(element) {
          var copiedElement = angular.copy(element);

          // check if we're dealing with a collection (i.e. an array)
          // and restangularize the element using the proper restangularizer,
          // element / collection
          if (_.isArray(element)) {
            return restangularizeCollection(
              element[config.restangularFields.parentResource],
              copiedElement,
              element[config.restangularFields.route],
              element[config.restangularFields.fromServer],
              element[config.restangularFields.reqParams]
            );
          }

          // not a collection, restangularize it as an element
          return restangularizeElem(
            element[config.restangularFields.parentResource],
            copiedElement,
            element[config.restangularFields.route],
            element[config.restangularFields.fromServer],
            element[config.restangularFields.restangularCollection],
            element[config.restangularFields.reqParams]
          );
        }

        function restangularizeElem(parent, element, route, fromServer, collection, reqParams) {
          var elem = config.onBeforeElemRestangularized(element, false, route);

          var localElem = restangularizeBase(parent, elem, route, reqParams, fromServer);

          if (config.useCannonicalId) {
            localElem[config.restangularFields.cannonicalId] = config.getIdFromElem(localElem);
          }

          if (collection) {
            localElem[config.restangularFields.getParentList] = function() {
              return collection;
            };
          }

          localElem[config.restangularFields.restangularCollection] = false;
          localElem[config.restangularFields.get] = _.bind(getFunction, localElem);
          localElem[config.restangularFields.getList] = _.bind(fetchFunction, localElem);
          localElem[config.restangularFields.put] = _.bind(putFunction, localElem);
          localElem[config.restangularFields.post] = _.bind(postFunction, localElem);
          localElem[config.restangularFields.remove] = _.bind(deleteFunction, localElem);
          localElem[config.restangularFields.head] = _.bind(headFunction, localElem);
          localElem[config.restangularFields.trace] = _.bind(traceFunction, localElem);
          localElem[config.restangularFields.options] = _.bind(optionsFunction, localElem);
          localElem[config.restangularFields.patch] = _.bind(patchFunction, localElem);
          localElem[config.restangularFields.save] = _.bind(save, localElem);

          addCustomOperation(localElem);
          return config.transformElem(localElem, false, route, service, true);
        }

        function restangularizeCollection(parent, element, route, fromServer, reqParams) {
          var elem = config.onBeforeElemRestangularized(element, true, route);

          var localElem = restangularizeBase(parent, elem, route, reqParams, fromServer);
          localElem[config.restangularFields.restangularCollection] = true;
          localElem[config.restangularFields.post] = _.bind(postFunction, localElem, null);
          localElem[config.restangularFields.remove] = _.bind(deleteFunction, localElem);
          localElem[config.restangularFields.head] = _.bind(headFunction, localElem);
          localElem[config.restangularFields.trace] = _.bind(traceFunction, localElem);
          localElem[config.restangularFields.putElement] = _.bind(putElementFunction, localElem);
          localElem[config.restangularFields.options] = _.bind(optionsFunction, localElem);
          localElem[config.restangularFields.patch] = _.bind(patchFunction, localElem);
          localElem[config.restangularFields.get] = _.bind(getById, localElem);
          localElem[config.restangularFields.getList] = _.bind(fetchFunction, localElem, null);

          addCustomOperation(localElem);
          return config.transformElem(localElem, true, route, service, true);
        }

        function restangularizeCollectionAndElements(parent, element, route, fromServer) {
          var collection = restangularizeCollection(parent, element, route, fromServer);
          _.each(collection, function(elem) {
            if (elem) {
              restangularizeElem(parent, elem, route, fromServer);
            }
          });
          return collection;
        }

        function getById(id, reqParams, headers) {
          return this.customGET(id.toString(), reqParams, headers);
        }

        function putElementFunction(idx, params, headers) {
          var __this = this;
          var elemToPut = this[idx];
          var deferred = $q.defer();
          var filledArray = [];
          filledArray = config.transformElem(filledArray, true, elemToPut[config.restangularFields.route], service);
          elemToPut.put(params, headers).then(function(serverElem) {
            var newArray = copyRestangularizedElement(__this);
            newArray[idx] = serverElem;
            filledArray = newArray;
            deferred.resolve(newArray);
          }, function(response) {
            deferred.reject(response);
          });

          return restangularizePromise(deferred.promise, true, filledArray);
        }

        function parseResponse(resData, operation, route, fetchUrl, response, deferred) {
          var data = config.responseExtractor(resData, operation, route, fetchUrl, response, deferred);
          var etag = response.headers('ETag');
          if (data && etag) {
            data[config.restangularFields.etag] = etag;
          }
          return data;
        }


        function fetchFunction(what, reqParams, headers) {
          var __this = this;
          var deferred = $q.defer();
          var operation = 'getList';
          var url = urlHandler.fetchUrl(this, what);
          var whatFetched = what || __this[config.restangularFields.route];

          var request = config.fullRequestInterceptor(null, operation,
            whatFetched, url, headers || {}, reqParams || {}, this[config.restangularFields.httpConfig] || {});

          var filledArray = [];
          filledArray = config.transformElem(filledArray, true, whatFetched, service);

          var method = 'getList';

          if (config.jsonp) {
            method = 'jsonp';
          }

          var okCallback = function(response) {
            var resData = response.data;
            var fullParams = response.config.params;
            var data = parseResponse(resData, operation, whatFetched, url, response, deferred);

            // support empty response for getList() calls (some APIs respond with 204 and empty body)
            if (_.isUndefined(data) || '' === data) {
              data = [];
            }
            if (!_.isArray(data)) {
              throw new Error('Response for getList SHOULD be an array and not an object or something else');
            }

            if (true === config.plainByDefault) {
              return resolvePromise(deferred, response, data, filledArray);
            }

            var processedData = _.map(data, function(elem) {
              if (!__this[config.restangularFields.restangularCollection]) {
                return restangularizeElem(__this, elem, what, true, data);
              } else {
                return restangularizeElem(__this[config.restangularFields.parentResource],
                  elem, __this[config.restangularFields.route], true, data);
              }
            });

            processedData = _.extend(data, processedData);

            if (!__this[config.restangularFields.restangularCollection]) {
              resolvePromise(
                deferred,
                response,
                restangularizeCollection(
                  __this,
                  processedData,
                  what,
                  true,
                  fullParams
                ),
                filledArray
              );
            } else {
              resolvePromise(
                deferred,
                response,
                restangularizeCollection(
                  __this[config.restangularFields.parentResource],
                  processedData,
                  __this[config.restangularFields.route],
                  true,
                  fullParams
                ),
                filledArray
              );
            }
          };

          urlHandler.resource(this, $http, request.httpConfig, request.headers, request.params, what,
            this[config.restangularFields.etag], operation)[method]().then(okCallback, function error(response) {
            if (response.status === 304 && __this[config.restangularFields.restangularCollection]) {
              resolvePromise(deferred, response, __this, filledArray);
            } else if (_.every(config.errorInterceptors, function(cb) {
                return cb(response, deferred, okCallback) !== false;
              })) {
              // triggered if no callback returns false
              deferred.reject(response);
            }
          });

          return restangularizePromise(deferred.promise, true, filledArray);
        }

        function withHttpConfig(httpConfig) {
          this[config.restangularFields.httpConfig] = httpConfig;
          return this;
        }

        function save(params, headers) {
          if (this[config.restangularFields.fromServer]) {
            return this[config.restangularFields.put](params, headers);
          } else {
            return _.bind(elemFunction, this)('post', undefined, params, undefined, headers);
          }
        }

        function elemFunction(operation, what, params, obj, headers) {
          var __this = this;
          var deferred = $q.defer();
          var resParams = params || {};
          var route = what || this[config.restangularFields.route];
          var fetchUrl = urlHandler.fetchUrl(this, what);

          var callObj = obj || this;
          // fallback to etag on restangular object (since for custom methods we probably don't explicitly specify the etag field)
          var etag = callObj[config.restangularFields.etag] || (operation !== 'post' ? this[config.restangularFields.etag] : null);

          if (_.isObject(callObj) && config.isRestangularized(callObj)) {
            callObj = stripRestangular(callObj);
          }
          var request = config.fullRequestInterceptor(callObj, operation, route, fetchUrl,
            headers || {}, resParams || {}, this[config.restangularFields.httpConfig] || {});

          var filledObject = {};
          filledObject = config.transformElem(filledObject, false, route, service);

          var okCallback = function(response) {
            var resData = response.data;
            var fullParams = response.config.params;
            var elem = parseResponse(resData, operation, route, fetchUrl, response, deferred);

            // accept 0 as response
            if (elem !== null && elem !== undefined && elem !== '') {
              var data;

              if (true === config.plainByDefault) {
                return resolvePromise(deferred, response, elem, filledObject);
              }

              if (operation === 'post' && !__this[config.restangularFields.restangularCollection]) {
                data = restangularizeElem(
                  __this[config.restangularFields.parentResource],
                  elem,
                  route,
                  true,
                  null,
                  fullParams
                );
                resolvePromise(deferred, response, data, filledObject);
              } else {
                data = restangularizeElem(
                  __this[config.restangularFields.parentResource],
                  elem,
                  __this[config.restangularFields.route],
                  true,
                  null,
                  fullParams
                );

                data[config.restangularFields.singleOne] = __this[config.restangularFields.singleOne];
                resolvePromise(deferred, response, data, filledObject);
              }

            } else {
              resolvePromise(deferred, response, undefined, filledObject);
            }
          };

          var errorCallback = function(response) {
            if (response.status === 304 && config.isSafe(operation)) {
              resolvePromise(deferred, response, __this, filledObject);
            } else if (_.every(config.errorInterceptors, function(cb) {
                return cb(response, deferred, okCallback) !== false;
              })) {
              // triggered if no callback returns false
              deferred.reject(response);
            }
          };
          // Overriding HTTP Method
          var callOperation = operation;
          var callHeaders = _.extend({}, request.headers);
          var isOverrideOperation = config.isOverridenMethod(operation);
          if (isOverrideOperation) {
            callOperation = 'post';
            callHeaders = _.extend(callHeaders, {
              'X-HTTP-Method-Override': operation === 'remove' ? 'DELETE' : operation.toUpperCase()
            });
          } else if (config.jsonp && callOperation === 'get') {
            callOperation = 'jsonp';
          }

          if (config.isSafe(operation)) {
            if (isOverrideOperation) {
              urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params,
                what, etag, callOperation)[callOperation]({}).then(okCallback, errorCallback);
            } else {
              urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params,
                what, etag, callOperation)[callOperation]().then(okCallback, errorCallback);
            }
          } else {
            urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params,
              what, etag, callOperation)[callOperation](request.element).then(okCallback, errorCallback);
          }

          return restangularizePromise(deferred.promise, false, filledObject);
        }

        function getFunction(params, headers) {
          return _.bind(elemFunction, this)('get', undefined, params, undefined, headers);
        }

        function deleteFunction(params, headers) {
          return _.bind(elemFunction, this)('remove', undefined, params, undefined, headers);
        }

        function putFunction(params, headers) {
          return _.bind(elemFunction, this)('put', undefined, params, undefined, headers);
        }

        function postFunction(what, elem, params, headers) {
          return _.bind(elemFunction, this)('post', what, params, elem, headers);
        }

        function headFunction(params, headers) {
          return _.bind(elemFunction, this)('head', undefined, params, undefined, headers);
        }

        function traceFunction(params, headers) {
          return _.bind(elemFunction, this)('trace', undefined, params, undefined, headers);
        }

        function optionsFunction(params, headers) {
          return _.bind(elemFunction, this)('options', undefined, params, undefined, headers);
        }

        function patchFunction(elem, params, headers) {
          return _.bind(elemFunction, this)('patch', undefined, params, elem, headers);
        }

        function customFunction(operation, path, params, headers, elem) {
          return _.bind(elemFunction, this)(operation, path, params, elem, headers);
        }

        function addRestangularMethodFunction(name, operation, path, defaultParams, defaultHeaders, defaultElem) {
          var bindedFunction;
          if (operation === 'getList') {
            bindedFunction = _.bind(fetchFunction, this, path);
          } else {
            bindedFunction = _.bind(customFunction, this, operation, path);
          }

          var createdFunction = function(params, headers, elem) {
            var callParams = _.defaults({
              params: params,
              headers: headers,
              elem: elem
            }, {
              params: defaultParams,
              headers: defaultHeaders,
              elem: defaultElem
            });
            return bindedFunction(callParams.params, callParams.headers, callParams.elem);
          };

          if (config.isSafe(operation)) {
            this[name] = createdFunction;
          } else {
            this[name] = function(elem, params, headers) {
              return createdFunction(params, headers, elem);
            };
          }
        }

        function withConfigurationFunction(configurer) {
          var newConfig = angular.copy(_.omit(config, 'configuration'));
          Configurer.init(newConfig, newConfig);
          configurer(newConfig);
          return createServiceForConfiguration(newConfig);
        }

        function toService(route, parent) {
          var knownCollectionMethods = _.values(config.restangularFields);
          var serv = {};
          var collection = (parent || service).all(route);
          serv.one = _.bind(one, (parent || service), parent, route);
          serv.post = _.bind(collection.post, collection);
          serv.getList = _.bind(collection.getList, collection);
          serv.withHttpConfig = _.bind(collection.withHttpConfig, collection);
          serv.get = _.bind(collection.get, collection);

          for (var prop in collection) {
            if (collection.hasOwnProperty(prop) && _.isFunction(collection[prop]) && !_.includes(knownCollectionMethods, prop)) {
              serv[prop] = _.bind(collection[prop], collection);
            }
          }

          return serv;
        }


        Configurer.init(service, config);

        service.copy = _.bind(copyRestangularizedElement, service);

        service.service = _.bind(toService, service);

        service.withConfig = _.bind(withConfigurationFunction, service);

        service.one = _.bind(one, service, null);

        service.all = _.bind(all, service, null);

        service.several = _.bind(several, service, null);

        service.oneUrl = _.bind(oneUrl, service, null);

        service.allUrl = _.bind(allUrl, service, null);

        service.stripRestangular = _.bind(stripRestangular, service);

        service.restangularizeElement = _.bind(restangularizeElem, service);

        service.restangularizeCollection = _.bind(restangularizeCollectionAndElements, service);

        return service;
      }

      return createServiceForConfiguration(globalConfiguration);
    }];
  });
  return restangular.name;
}));
