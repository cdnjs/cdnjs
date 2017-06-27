/**
 * Restfull Resources service for AngularJS apps
 * @version v0.3.2 - 2013-04-12
 * @link https://github.com/mgonto/restangular
 * @author Martin Gontovnikas <martin@gonto.com.ar>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
var module = angular.module('restangular', ['ngResource']);

module.provider('Restangular', function() {
        // Configuration
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
        var Path = function(baseUrl) {
            this.baseUrl = baseUrl;
        }
        
        Path.prototype.base = function(current) {
            return this.baseUrl + _.reduce(this.parentsArray(current), function(acum, elem) {
                var currUrl = acum + "/" + elem.route;
                if (elem.id) {
                    currUrl += "/" + elem.id;
                }
                return currUrl;
            }, '');
        }
        
        Path.prototype.parentsArray = function(current) {
            var parents = [];
            while(!_.isUndefined(current)) {
                parents.push(current);
                current = current.parentResource;
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
                remove: {method: 'DELETE', params: {}, isArray: false, headers: headers || {}}
            });
        }
        
        urlCreatorFactory.path = Path;
        
        
        
       this.$get = ['$resource', '$q', function($resource, $q) {
          var urlHandler = new urlCreatorFactory[this.urlCreator](this.baseUrl);
          var __extraFields = this.extraFields;
          var __responseExtractor = this.responseExtractor;
          
          function restangularize(parent, elem, route) {
              elem.route = route;
              elem.getList = _.bind(fetchFunction, elem);
              elem.get = _.bind(getFunction, elem);
              elem.put = _.bind(putFunction, elem);
              elem.post = _.bind(postFunction, elem);
              elem.remove = _.bind(deleteFunction, elem);
              
              if (parent) {
                  elem.parentResource = _.pick(parent, _.union(['id', 'route', 'parentResource'], __extraFields));
              }
              return elem;
          }
          
          function fetchFunction(what, params, headers) {
              var search = what ? {what: what} : {};
              var __this = this;
              var deferred = $q.defer();
              
              urlHandler.resource(this, $resource, headers).getArray(_.extend(search, params), function(resData) {
                  var data = __responseExtractor(resData, 'get');
                  var processedData = _.map(data, function(elem) {
                      if (what) {
                          return restangularize(__this, elem, what);
                      } else {
                          return restangularize(null, elem, __this.route);
                      }
                      
                  });
                  deferred.resolve(processedData);
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
                  var elem = __responseExtractor(resData, operation);
                  if (elem) {
                      deferred.resolve(restangularize(__this.parentResource, elem, __this.route));
                  } else {
                      deferred.resolve();
                  }
              };
              
              var errorCallback = function() {
                  deferred.reject(arguments)
              };
              
              if (operation === 'get') {
                  urlHandler.resource(this, $resource, headers)[operation](resParams, okCallback, errorCallback);
              } else {
                  urlHandler.resource(this, $resource, headers)[operation](resParams, resObj, okCallback, errorCallback);
              }
              
              return deferred.promise;
          }
          
          function getFunction(params, headers) {
              return _.bind(elemFunction, this)("get", params, undefined, headers);;
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
          
          
          var service = {};
          
          service.one = function(route, id) {
              return restangularize(null, {
                  id: id
              }, route);
          }
          
          service.all = function(route) {
              return restangularize(null, {} , route);
          }
          
          return service;
       
        }];
    }
);

