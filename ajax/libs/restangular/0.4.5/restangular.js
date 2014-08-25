/**
 * Restfull Resources service for AngularJS apps
 * @version v0.4.4 - 2013-04-16
 * @link https://github.com/mgonto/restangular
 * @author Martin Gontovnikas <martin@gonto.com.ar>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
var module = angular.module('restangular', ['ngResource']);

module.provider('Restangular', function() {
        // Configuration
        /**
         * Those are HTTP safe methods for which there is no need to pass any data with the request.
         */
        var safeMethods= ["get", "head", "options", "trace"];
        function isSafe(operation) {
          return _.contains(safeMethods, operation);
        }
        /**
         * This is the BaseURL to be used with Restangular
         */
        this.baseUrl = "";
        this.setBaseUrl = function(baseUrl) {
            this.baseUrl = baseUrl;
        }
        
        /**
         * Sets the extra fields to keep from the parents
         */
        this.extraFields = [];
        this.setExtraFields = function(extraFields) {
            this.extraFields = extraFields;
        }
        
        /**
         * Sets the URL creator type. For now, only Path is created. In the future we'll have queryParams
        **/
        this.urlCreator = "path";
        this.setUrlCreator = function(name) {
            if (!_.has(urlCreatorFactory, name)) {
                throw new Error("URL Path selected isn't valid");
            }
            this.urlCreator = name;
        }
        
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
        this.restangularFields = {
            id: "id",
            route: "route",
            parentResource: "parentResource",
            restangularCollection: "restangularCollection"
        }
        this.setRestangularFields = function(resFields) {
            this.restangularFields = _.extend(this.restangularFields, resFields);
        }
        
        /**
         * Sets the Response parser. This is used in case your response isn't directly the data.
         * For example if you have a response like {meta: {'meta'}, data: {name: 'Gonto'}}
         * you can extract this data which is the one that needs wrapping
         *
         * The ResponseExtractor is a function that receives the response and the method executed.
         */
        this.responseExtractor = function(response, method) {
            return response;
        }
        this.setResponseExtractor = function(extractor) {
            this.responseExtractor = extractor;
        }

        //Internal values and functions
        var urlCreatorFactory = {};
        
        /**
         * This is the Path URL creator. It uses Path to show Hierarchy in the Rest API.
         * This means that if you have an Account that then has a set of Buildings, a URL to a building
         * would be /accounts/123/buildings/456
        **/
        var Path = function(baseUrl, restangularFields) {
            this.baseUrl = baseUrl;
            this.restangularFields = restangularFields;
        }
        
        Path.prototype.base = function(current) {
            var __restangularFields = this.restangularFields;
            return this.baseUrl + _.reduce(this.parentsArray(current), function(acum, elem) {
                var currUrl = acum + "/" + elem[__restangularFields.route];
                
                if (!elem[__restangularFields.restangularCollection]) {
                    currUrl += "/" + elem[__restangularFields.id];
                }
                
                return currUrl;
            }, '');
        }
        
        Path.prototype.parentsArray = function(current) {
            var parents = [];
            while(!_.isUndefined(current)) {
                parents.push(current);
                current = current[this.restangularFields.parentResource];
            }
            return parents.reverse();
        }
        
        Path.prototype.fetchUrl = function(what, current) {
            return this.base(current) + "/" + what.toLowerCase();
        }
        
        Path.prototype.resource = function(current, $resource, headers) {
            return $resource(this.base(current) + "/:what" , {}, {
                getArray: {method: 'GET', params: {}, isArray: true, headers: headers || {}},
                get: {method: 'GET', params: {}, isArray: false, headers: headers || {}},
                put: {method: 'PUT', params: {}, isArray: false, headers: headers || {}},
                post: {method: 'POST', params: {}, isArray: false, headers: headers || {}},
                remove: {method: 'DELETE', params: {}, isArray: false, headers: headers || {}},
                head: {method: 'HEAD', params: {}, isArray: false, headers: headers || {}},
                trace: {method: 'TRACE', params: {}, isArray: false, headers: headers || {}},
                options: {method: 'OPTIONS', params: {}, isArray: false, headers: headers || {}},
                patch: {method: 'PATCH', params: {}, isArray: false, headers: headers || {}}
            });
        }
        
        urlCreatorFactory.path = Path;
        
        
        
       this.$get = ['$resource', '$q', function($resource, $q) {
          var urlHandler = new urlCreatorFactory[this.urlCreator](this.baseUrl, this.restangularFields);
          var __extraFields = this.extraFields;
          var __responseExtractor = this.responseExtractor;
          var __restangularFields = this.restangularFields;
          
          function restangularizeBase(parent, elem, route) {
              elem[__restangularFields.route] = route;
              
              if (parent) {
                  var restangularFieldsForParent = _.chain(__restangularFields)
                          .pick(['id', 'route', 'parentResource'])
                          .values()
                          .union(__extraFields)
                          .value();
                  elem[__restangularFields.parentResource]= _.pick(parent, restangularFieldsForParent);
              }
              return elem;
          }
          
          function restangularizeElem(parent, elem, route) {
              var localElem = restangularizeBase(parent, elem, route);
              localElem[__restangularFields.restangularCollection] = false;
              localElem.get = _.bind(getFunction, localElem);
              localElem.getList = _.bind(fetchFunction, localElem);
              localElem.put = _.bind(putFunction, localElem);
              localElem.post = _.bind(postFunction, localElem);
              localElem.remove = _.bind(deleteFunction, localElem);
              localElem.head = _.bind(headFunction, localElem);
              localElem.trace = _.bind(traceFunction, localElem);
              localElem.options = _.bind(optionsFunction, localElem);
              localElem.patch = _.bind(patchFunction, localElem);
              return localElem;
          }
          
          function restangularizeCollection(parent, elem, route) {
              var localElem = restangularizeBase(parent, elem, route);
              localElem[__restangularFields.restangularCollection] = true;
              localElem.post = _.bind(postFunction, localElem, null);
              localElem.head = _.bind(headFunction, localElem);
              localElem.trace = _.bind(traceFunction, localElem);
              localElem.options = _.bind(optionsFunction, localElem);
              localElem.patch = _.bind(patchFunction, localElem);
              localElem.getList = _.bind(fetchFunction, localElem, null);
              return localElem;
          }
          
          function fetchFunction(what, params, headers) {
              var search = what ? {what: what} : {};
              var __this = this;
              var deferred = $q.defer();
              
              urlHandler.resource(this, $resource, headers).getArray(_.extend(search, params), function(resData) {
                  var data = __responseExtractor(resData, 'get');
                  var processedData = _.map(data, function(elem) {
                      if (!__this[__restangularFields.restangularCollection]) {
                          return restangularizeElem(__this, elem, what);
                      } else {
                          return restangularizeElem(null, elem, __this[__restangularFields.route]);
                      }
                      
                  });
                  if (!__this[__restangularFields.restangularCollection]) {
                      deferred.resolve(restangularizeCollection(__this, processedData, what));
                  } else {
                      deferred.resolve(restangularizeCollection(null, processedData, __this[__restangularFields.route]));
                  }
              }, function error() {
                  deferred.reject(arguments)
              });
              
              return deferred.promise;
          }
          
          function elemFunction(operation, params, obj, headers) {
              var __this = this;
              var deferred = $q.defer();
              var resParams = params || {};
              var resObj = obj || this;
              
              var okCallback = function(resData) {
                  var elem = __responseExtractor(resData, operation) || resObj;
                  if (operation === "post" && !__this[__restangularFields.restangularCollection]) {
                    deferred.resolve(restangularizeElem(__this, elem, resParams.what));
                  } else {
                    deferred.resolve(restangularizeElem(__this[__restangularFields.parentResource], elem, __this[__restangularFields.route]));
                  }

              };
              
              var errorCallback = function() {
                  deferred.reject(arguments)
              };

              if (isSafe(operation)) {
                  urlHandler.resource(this, $resource, headers)[operation](resParams, okCallback, errorCallback);
              } else {
                  urlHandler.resource(this, $resource, headers)[operation](resParams, resObj, okCallback, errorCallback);
              }
              
              return deferred.promise;
          }
          
          function getFunction(params, headers) {
              return _.bind(elemFunction, this)("get", params, undefined, headers);
          }
          
          function deleteFunction(params, headers) {
              return _.bind(elemFunction, this)("remove", params, {}, headers);
          }
          
          function putFunction(params, headers) {
              return _.bind(elemFunction, this)("put", params, undefined, headers);
          }

          function postFunction(what, elem, params, headers) {
              return _.bind(elemFunction, this)("post", _.extend({what: what}, params), elem, headers);
          }

         function headFunction(params, headers) {
           return _.bind(elemFunction, this)("head", params, undefined, headers);
         }

         function traceFunction(params, headers) {
           return _.bind(elemFunction, this)("trace", params, undefined, headers);
         }

         function optionsFunction(params, headers) {
           return _.bind(elemFunction, this)("options", params, undefined, headers);
         }

         function patchFunction(params, headers) {
           return _.bind(elemFunction, this)("patch", params, undefined, headers);
         }
          
          
          var service = {};
          
          service.one = function(route, id) {
              var elem = {};
              elem[__restangularFields.id] = id;
              return restangularizeElem(null, elem , route);
          }
          
          service.all = function(route) {
              return restangularizeCollection(null, {} , route, true);
          }
          
          return service;
       
        }];
    }
);

