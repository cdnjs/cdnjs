/**
 * API Bound Models for AngularJS
 * @version v0.13.0 - 2014-03-14
 * @link https://github.com/angular-platanus/restmod
 * @author Ignacio Baixas <iobaixas@gmai.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
/**
 * @namespace constants
 *
 * @description Constants and utilities exposed by the library.
 */

/**
 * @namespace providers
 *
 * @description Angular providers provided by the library.
 */

/**
 * @namespace services
 *
 * @description Angular services provided by the library.
 */

angular.module('plRestmod', ['ng', 'platanus.inflector']);

/**
 * @class Utils
 * @memberOf constants
 *
 * @description Various utilities used across
 * the library
 *
 * This utilities are available as the `Utils` constant when restmod is included.
 */
var Utils = {
  /**
   * @memberof constants.Utils
   *
   * @description Chains to filtering functions together
   *
   * @param  {function} _first original function
   * @param  {function} _fun   function to call on the original function result
   * @return {mixed}        value returned by the last function call
   */
  chain: function(_first, _fun) {
    if(!_first) return _fun;
    return function(_value) {
      return _fun.call(this, _first.call(this, _value));
    };
  },
  /**
   * @memberof constants.Utils
   *
   * @description Override a property value, making overriden function available as this.$super
   *
   * @param  {function} _super Original value
   * @param  {mixed} _fun New property value
   * @return {mixed} Value returned by new function
   */
  override: function(_super, _fun) {
    if(!_super || typeof _fun !== 'function') return _fun;

    return function() {
      var oldSuper = this.$super;
      try {
        this.$super = _super;
        return _fun.apply(this, arguments);
      } finally {
        this.$super = oldSuper;
      }
    };
  },
  /**
   * @memberof constants.Utils
   *
   * @description Extend an object using `Utils.override` instead of just replacing the functions.
   *
   * @param  {object} _target Object to be extended
   * @param  {object} _other  Source object
   */
  extendOverriden: function(_target, _other) {
    for(var key in _other) {
      if(_other.hasOwnProperty(key)) {
        _target[key] = Utils.override(_target[key], _other[key]);
      }
    }
  }
};

// make this available as a restmod constant
angular.module('plRestmod').constant('Utils', Utils);

// Preload some angular stuff
var bind = angular.bind,
    forEach = angular.forEach,
    extend = angular.extend,
    isObject = angular.isObject,
    isArray = angular.isArray,
    isFunction = angular.isFunction,
    arraySlice = Array.prototype.slice;

// Constants
var CREATE_MASK = 'C',
    UPDATE_MASK = 'U',
    READ_MASK = 'R',
    WRITE_MASK = 'CU',
    FULL_MASK = 'CRU';

/**
 * @class $restmodProvider
 * @memberOf providers
 *
 * @description
 *
 * The $restmodProvider exposes $restmod configuration methods
 */
angular.module('plRestmod').provider('$restmod', function() {

  var BASE_CHAIN = []; // The base mixin chain

  return {
    /**
     * @memberof providers.$restmodProvider
     *
     * @description
     * Adds mixins to the base model chain.
     *
     * Non abstract models should NOT be added to this chain.
     *
     * Base model chain is by default empty, all mixins added to the chain are
     * prepended to every generated model.
     *
     * Usage:
     *
     * ```javascript
     * $provider.pushModelBase('ChangeModel', 'LazyRelations', 'ThrottledModel')
     * ```
     */
    pushModelBase: function(/* mixins */) {
      Array.prototype.push.apply(BASE_CHAIN, arguments);
      return this;
    },

    /**
     * @class $restmod
     * @memberOf services
     *
     * @description The restmod service provides the `model` and `mixin` factories.
     */
    $get: ['$http', '$q', '$injector', '$parse', '$filter', '$inflector', function($http, $q, $injector, $parse, $filter, $inflector) {

      var restmod = {
        /**
         * @function model
         * @memberOf services.$restmod#
         *
         * @description
         *
         * The model factory is used to generate mode types using a rich building DSL provided
         * by the {@link restmod.class:ModelBuilder ModelBuilder}.
         *
         * For more information about model generation see {@link Building a Model}
         */
        model: function(_baseUrl/* , _mix */) {

          var masks = {},
              urlPrefix = null,
              primaryKey = 'id',
              defaults = [],
              decoders = {},
              encoders = {},
              callbacks = {},
              nameDecoder = $inflector.camelize,
              nameEncoder = function(_v) { return $inflector.parameterize(_v, '_'); };

          // runs all callbacks associated with a given hook.
          function callback(_hook, _ctx /*, args */) {
            var cbs, i, args, cb;

            // execute static callbacks
            if(!!(cbs = callbacks[_hook])) {
              args = arraySlice.call(arguments, 2);
              for(i = 0; !!(cb = cbs[i]); i++) {
                cb.apply(_ctx, args);
              }
            }

            // execute instance callbacks
            if(_ctx.$cb && (cbs = _ctx.$cb[_hook])) {
              if(!args) args = arraySlice.call(arguments, 2);
              for(i = 0; !!(cb = cbs[i]); i++) {
                cb.apply(_ctx, args);
              }
            }
          }

          // common http behavior, used both in collections and model instances.
          function send(_target, _config, _success, _error) {

            _target.$pending = (_target.$pending || []);
            _target.$pending.push(_config);

            function performRequest() {

              // if request was canceled, then just return a resolved promise
              if(_config.canceled) {
                _target.$status = 'canceled';
                return $q.resolve(_target);
              }

              _target.$response = null;
              _target.$error = false;

              callback('before-request', _target, _config);

              return $http(_config).then(function(_response) {

                // IDEA: a response interceptor could add additional error states based on returned data,
                // this could allow for additional error state behaviours (for example, an interceptor
                // could watch for rails validation errors and store them in the model, then return false
                // to trigger a promise queue error).

                // if request was canceled, ignore post request actions.
                if(_config.canceled) {
                  _target.$status = 'canceled';
                  return _target;
                }

                _target.$pending.splice(_target.$pending.indexOf(_config), 1);
                if(_target.$pending.length === 0) _target.$pending = null; // reset pending so it can be used as boolean
                _target.$status = 'ok';
                _target.$response = _response;

                callback('after-request', _target, _response);
                if(_success) _success.call(_target, _response);

                return _target;

              }, function(_response) {

                // if request was canceled, ignore error handling
                if(_config.canceled) {
                  _target.$status = 'canceled';
                  return _target;
                }

                _target.$pending.splice(_target.$pending.indexOf(_config), 1);
                if(_target.$pending.length === 0) _target.$pending = null; // reset pending so it can be used as boolean
                _target.$status = 'error';
                _target.$response = _response;

                callback('after-request-error', _target, _response);
                if(_error) _error.call(_target, _response);
                return $q.reject(_target);
              });
            }

            // chain requests, do not allow parallel request per resource.
            // TODO: allow various request modes: parallel, serial, just one (discard), etc
            if(_target.$promise) {
              _target.$promise = _target.$promise.then(performRequest, performRequest);
            } else {
              _target.$promise = performRequest();
            }
          }

          function cancel(_target) {
            // cancel every pending request.
            if(_target.$pending) {
              forEach(_target.$pending, function(_config) {
                _config.canceled = true;
              });
            }

            // reset request
            _target.$promise = null;
          }

          // recursive transformation function, used by $decode and $encode.
          function transform(_data, _ctx, _prefix, _mask, _decode, _into) {

            var key, decodedName, encodedName, fullName, mask, filter, value, result = _into || {};

            for(key in _data) {
              if(_data.hasOwnProperty(key) && key[0] !== '$') {

                decodedName = (_decode && nameDecoder) ? nameDecoder(key) : key;
                fullName = _prefix + decodedName;

                // skip property if masked for this operation
                mask = masks[fullName];
                if(mask && mask.indexOf(_mask) !== -1) {
                  continue;
                }

                value = _data[key];
                filter = _decode ? decoders[fullName] : encoders[fullName];

                if(filter) {
                  value = filter.call(_ctx, value);
                  if(value === undefined) continue; // ignore value if filter returns undefined
                } else if(typeof value === 'object' && value &&
                  (_decode || typeof value.toJSON !== 'function')) {
                  // IDEA: make extended decoding/encoding optional, could be a little taxing for some apps
                  value = transformExtended(value, _ctx, fullName, _mask, _decode);
                }

                encodedName = (!_decode && nameEncoder) ? nameEncoder(decodedName) : decodedName;
                result[encodedName] = value;
              }
            }

            return result;
          }

          // extended part of transformation function, enables deep object transform.
          function transformExtended(_data, _ctx, _prefix, _mask, _decode) {
            if(isArray(_data))
            {
              var fullName = _prefix + '[]',
                  filter = _decode ? decoders[fullName] : encoders[fullName],
                  result = [], i, l, value;

              for(i = 0, l = _data.length; i < l; i++) {
                value = _data[i];
                if(filter) {
                  value = filter.call(_ctx, value);
                } else if(typeof value === 'object' && value &&
                  (_decode || typeof value.toJSON !== 'function')) {
                  value = transformExtended(value, _ctx, _prefix, _mask, _decode);
                }
                result.push(value);
              }

              return result;
            } else {
              return transform(_data, _ctx, _prefix + '.', _mask, _decode);
            }
          }

          // spacial url joining func used by default routing implementation.
          function joinUrl(_head, _tail) {
            if(!_head || !_tail) return null;
            return (_head+'').replace(/\/$/, '') + '/' + (_tail+'').replace(/(\/$|^\/)/g, '');
          }

          /**
           * @class Model
           *
           * @property {string} $partial The model partial url, relative to the context.
           * @property {ModelCollection|Model} $context The model context (parent).
           * @property {promise} $promise The last request promise, returns the model.
           * @property {boolean} $pending The last request status.
           * @property {string} $error The last request error, if any.
           *
           * @description
           *
           * The base model type, this is the starting point for every model generated by $restmod.
           *
           * Inherits all static methods from {@link ModelCollection}.
           *
           * #### About object creation
           *
           * Direct construction of object instances using `new` is not recommended. A collection of
           * static methods are available to generate new instances of a model, for more information
           * read the {@link ModelCollection} documentation.
           */
          function Model(_scope, _pk, _init) {

            this.$scope = _scope;
            this.$pk = _pk;
            this.$type = Model;

            var tmp;

            // apply defaults
            for(var i = 0; (tmp = defaults[i]); i++) {
              this[tmp[0]] = (typeof tmp[1] === 'function') ? tmp[1].apply(this) : tmp[1];
            }

            // after initialization hook
            callback('after-init', this);
          }

          // Model default behavior:

          /**
           * @memberof Model
           *
           * @description Returns a resource bound to a given url, with no parent scope.
           *
           * This can be used to create singleton resources:
           *
           * ```javascript
           * module('BikeShop', []).factory('Status', function($restmod) {
           *   return $restmod.model(null).$single('/api/status');
           * };)
           * ```
           *
           * @param {string} _url Url to bound resource to.
           * @return {Model} new resource instance.
           */
          Model.$single = function(_url) {
            return new Model({
              $urlFor: function() {
                return urlPrefix ? joinUrl(urlPrefix, _url) : _url;
              }
            }, '');
          };

          /**
           * @memberof Model
           *
           * @description Returns true if model is anonymous.
           *
           * An anonymous model can only be used as a nested resource (using relations)
           *
           * @return {boolean} true if model is anonymous.
           */
          Model.$anonymous = function() {
            return !_baseUrl;
          };

          /**
           * @memberof Model
           *
           * @description Returns the model base url.
           *
           * This method should not be overriden directly.
           *
           * @return {string} base url for this model, null if model us anonymous.
           */
          Model.$baseUrl = function() {
            // TODO: urlPrefix could be a function that allows base url transformation...
            return urlPrefix ? joinUrl(urlPrefix, _baseUrl) : _baseUrl;
          };

          /**
           * @memberof Model
           *
           * @description Returns a model's object private key from model decoded data.
           * If data is not an object, then it is considered to be the primary key value.
           *
           * The private key is the passed to the $urlFor function to obtain an object's url.
           *
           * This method should not be overriden directly, use the {@link ModelBuilder#setPrimaryKey}
           * method to change the primary key.
           *
           * @param {object} _data decoded object data (or pk)
           * @return {mixed} object private key
           */
          Model.$inferKey = function(_data) {
            if(!_data || typeof _data[primaryKey] === 'undefined') return null;
            return _data[primaryKey];
          };

          /** Runtime modifiers - private api for now */

          // sets an attribute mask at runtime
          Model.$$setMask = function(_attr, _mask) {
            if(!_mask) {
              delete masks[_attr];
            } else {
              masks[_attr] = _mask === true ? FULL_MASK : _mask;
            }
          };

          // registers a new global hook
          Model.$$registerHook = function(_hook, _fun) {
            var cbs = callbacks[_hook];
            if(!cbs) cbs = callbacks[_hook] = [];
            cbs.push(_fun);
            return this;
          };

          // TODO: add urlPrefix option

          // TODO: type reflection methods
          // Model.$ignored
          // Model.$relation

          Model.prototype = {
            /**
             * @memberof Model#
             *
             * @description Returns the url this object is bound to.
             *
             * This is the url used by fetch to retrieve the resource related data.
             *
             * @return {string} bound url.
             */
            $url: function() {
              return this.$scope.$urlFor(this.$pk);
            },

            /**
             * @memberof Model#
             *
             * @description Default item child scope factory.
             *
             * By default, no create url is provided and the update/destroy url providers
             * attempt to first use the unscoped resource url.
             *
             * @param {mixed} _for Scope target type, accepts any model class.
             * @param {string} _partial Partial route.
             * @return {Scope} New scope.
             */
            $buildScope: function(_for, _partial) {
              if(_for.$buildOwnScope) {
                // TODO
              } else {
                var self = this;
                return {
                  $collectionUrl: function() {
                    // collection url is always nested
                    return joinUrl(self.$url(), _partial);
                  },
                  $urlFor: function(_pk) {
                    // resource url is nested only for anonymous resources
                    if(_for.$anonymous()) {
                      return this.$fetchUrlFor();
                    } else {
                      return _for.$urlFor(_pk);
                    }
                  },
                  $fetchUrlFor: function(/* _pk */) {
                    // fetch url is nested
                    return joinUrl(self.$url(), _partial);
                  },
                  $createUrlFor: function() {
                    // create is not posible in nested members
                    return null;
                  }
                };
              }
            },

            /**
             * @memberof Model#
             *
             * @description Copyies another object's properties.
             *
             * @param {object} _other Object to merge.
             * @return {Model} self
             */
            $extend: function(_other) {
              for(var tmp in _other) {
                if (_other.hasOwnProperty(tmp)) {
                  this[tmp] = _other[tmp];
                }
              }
              return this;
            },

            /**
             * @memberof Model#
             *
             * @description Iterates over the object non-private properties
             *
             * @param {function} _fun Function to call for each
             * @return {Model} self
             */
            $each: function(_fun, _ctx) {
              for(var key in this) {
                if(this.hasOwnProperty(key) && key[0] !== '$') {
                  _fun.call(_ctx || this[key], this[key], key);
                }
              }

              return this;
            },

            /**
             * @memberof Model#
             *
             * @description Allows calling custom hooks, usefull when implementing custom actions.
             *
             * Passes through every additional arguments to registered hooks.
             * Hooks are registered using the ModelBuilder.on method.
             *
             * @param {string} _hook hook name
             * @return {Model} self
             */
            $callback: function(_hook /*, args */) {
              callback(_hook, this, arraySlice.call(arguments, 1));
              return this;
            },

            /**
             * @memberof Model#
             *
             * @description Registers instance hooks.
             *
             * @param {string} _hook Hook name
             * @param {function} _fun Callback
             * @return {Model} self
             */
            $on: function(_hook, _fun) {
              var hooks = (this.$cb || (this.$cb = {}))[_hook] || (this.$cb[_hook] = []);
              hooks.push(_fun);
              return this;
            },

            /**
             * @memberof Model#
             *
             * @description Low level communication method, wraps the $http api.
             *
             * @param {object} _options $http options
             * @param {function} _success sucess callback (sync)
             * @param {function} _error error callback (sync)
             * @return {Model} self
             */
            $send: function(_options, _success, _error) {
              send(this, _options, _success, _error);
              return this;
            },

            /**
             * @memberof Model#
             *
             * @description Promise chaining method, keeps the model instance as the chain context.
             *
             * Calls `$q.then` on the model's last promise.
             *
             * Usage:
             *
             * ```javascript
             * col.$fetch().$then(function() { });
             * ```
             *
             * @param {function} _success success callback
             * @param {function} _error error callback
             * @return {Model} self
             */
            $then: function(_success, _error) {
              this.$promise = this.$promise.then(_success, _error);
              return this;
            },

            /**
             * @memberof Model#
             *
             * @description Promise chaining, keeps the model instance as the chain context.
             *
             * Calls ´$q.finally´ on the collection's last promise, updates last promise with finally result.
             *
             * Usage:
             *
             * ```javascript
             * col.$fetch().$finally(function() { });
             * ```
             *
             * @param {function} _cb callback
             * @return {Model} self
             */
            $finally: function(_cb) {
              this.$promise = this.$promise['finally'](_cb);
              return this;
            },

            /**
             * @memberof Model#
             *
             * @description Feed raw data to this instance.
             *
             * @param {object} _raw Raw data to be fed
             * @return {Model} this
             */
            $decode: function(_raw, _mask) {
              transform(_raw, this, '', _mask || READ_MASK, true, this);
              if(!this.$pk) this.$pk = Model.$inferKey(this); // TODO: improve this, warn if key changes
              callback('after-feed', this, _raw);
              return this;
            },

            /**
             * @memberof Model#
             *
             * @description Generate data to be sent to the server when creating/updating the resource.
             *
             * @param {string} _action Action that originated the render
             * @return {Model} this
             */
            $encode: function(_mask) {
              var raw = transform(this, this, '', _mask || CREATE_MASK, false);
              callback('before-render', this, raw);
              return raw;
            },

            /**
             * @memberof Model#
             *
             * @description Begin a server request for updated resource data.
             *
             * The request's promise is provided as the $promise property.
             *
             * @return {Model} this
             */
            $fetch: function() {
              // verify that instance has a bound url
              var url = this.$scope.$fetchUrlFor ? this.$scope.$fetchUrlFor(this.$pk) : this.$url();
              if(!url) throw new Error('Cannot fetch an unbound resource');
              var request = { method: 'GET', url: url };

              callback('before-fetch', this, request);
              return this.$send(request, function(_response) {

                var data = _response.data;
                if (!data || isArray(data)) {
                  throw new Error('Expected object while feeding resource');
                }
                this.$decode(data);

                callback('after-fetch', this, _response );
              }, function(_response) {
                callback('after-fetch-error', this, _response );
              });
            },

            /**
             * @memberof Model#
             *
             * @description Begin a server request to create/update resource.
             *
             * The request's promise is provided as the $promise property.
             *
             * @return {Model} this
             */
            $save: function() {
              var url = this.$scope.$updateUrlFor ? this.$scope.$updateUrlFor(this.$pk) : this.$url(),
                  request;

              if(url) {
                // If bound, update
                request = { method: 'PUT', url: url, data: this.$encode(CREATE_MASK) };
                callback('before-update', this, request);
                callback('before-save', this, request);
                return this.$send(request, function(_response) {
                  var data = _response.data;
                  if (data && !isArray(data)) this.$decode(data);
                  callback('after-update', this, _response);
                  callback('after-save', this, _response);
                }, function(_response) {
                  callback('after-update-error', this, _response);
                  callback('after-save-error', this, _response);
                });
              } else {
                // If not bound create.
                url = this.$scope.$createUrlFor ? this.$scope.$createUrlFor(this.$pk) : (this.$scope.$url && this.$scope.$url());
                if(!url) throw new Error('Create is not supported by this resource');
                request = { method: 'POST', url: url, data: this.$encode(UPDATE_MASK) };
                callback('before-save', this, request);
                callback('before-create', this, request);
                return this.$send(request, function(_response) {
                  var data = _response.data;
                  if (data && !isArray(data)) this.$decode(data);
                  callback('after-create', this, _response);
                  callback('after-save', this, _response);
                }, function(_response) {
                  callback('after-create-error', this, _response);
                  callback('after-save-error', this, _response);
                });
              }
            },

            /**
             * @memberof Model#
             *
             * @description Begin a server request to destroy the resource.
             *
             * The request's promise is provided as the $promise property.
             *
             * @return {Model} this
             */
            $destroy: function() {
              var url = this.$scope.$destroyUrlFor ? this.$scope.$destroyUrlFor(this.$pk) : this.$url();
              if(!url) throw new Error('Cannot destroy an unbound resource');
              var request = { method: 'DELETE', url: url };
              callback('before-destroy', this, request);
              return this.$send(request, function(_response) {

                // call scope callback
                if(this.$scope.$remove) {
                  this.$scope.$remove(this);
                }

                callback('after-destroy', this, _response);
              }, function(_response) {
                callback('after-destroy-error', this, _response);
              });
            }
          };

          /**
           * @class ModelCollection
           *
           * @description
           *
           * Collections are sets of model instances bound to a given api resource. When a model
           * class is generated, the corresponding collection class is also generated.
           */
          var Collection = {

            /**
             * @memberof ModelCollection#
             *
             * @description Gets this collection url without query string.
             *
             * @return {string} The collection url.
             */
            $url: function() {
              return this.$scope ? this.$scope.$collectionUrl() : Model.$baseUrl();
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Part of the scope interface, provides urls for collection's items.
             *
             * @param {Model} _pk Item key to provide the url to.
             * @return {string|null} The url or nill if item does not meet the url requirements.
             */
            $urlFor: function(_pk) {
              // force item unscoping if model is not anonymous (maybe make this optional)
              var baseUrl = Model.$baseUrl();
              return joinUrl(baseUrl ? baseUrl : this.$url(), _pk);
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Allows calling custom hooks, usefull when implementing custom actions.
             *
             * Passes through every additional arguments to registered hooks.
             * Hooks are registered using the ModelBuilder.on method.
             *
             * @param {string} _hook hook name
             * @return {ModelCollection} self
             */
            $callback: function(_hook /*, args */) {
              callback(_hook, this, arraySlice.call(arguments, 1));
              return this;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Registers instance hooks.
             *
             * @param {string} _hook Hook name
             * @param {function} _fun Callback
             * @return {ModelCollection} self
             */
            $on: function(_hook, _fun) {
              var hooks = (this.$cb || (this.$cb = {}))[_hook] || (this.$cb[_hook] = []);
              hooks.push(_fun);
              return this;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Loads a new model instance bound to this context and a given pk.
             *
             * ATENTION: this method does not adds the new object to the collection, it is intended to be a base
             * building method that can be overriden to provide special caching logics.
             *
             * @param {mixed} _pk object private key
             * @return {Model} New model instance
             */
            $load: function(_pk) {
              return new Model(this, _pk);
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Builds a new instance of this model, sets its primary key.
             *
             * @param {mixed} _pk object private key
             * @return {Model} New model instance
             */
            $new: function(_pk) {
              var obj = this.$load(_pk);
              if(this.$isCollection) this.$add(obj);
              return obj;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Builds a new instance of this model
             *
             * @param  {object} _init Initial values
             * @return {Model} model instance
             */
            $build: function(_init) {
              var obj = this.$load(Model.$inferKey(_init));
              angular.extend(obj, _init);

              if(this.$isCollection) this.$add(obj);
              return obj;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Builds a new instance of this model using undecoded data
             *
             * @param  {object} _raw Undecoded data
             * @return {Model} model instance
             */
            $buildRaw: function(_raw) {
              var obj = this.$load(Model.$inferKey(_raw)); // TODO: using infer key on raw...
              obj.$decode(_raw);

              if(this.$isCollection) this.$add(obj);
              return obj;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Attempts to resolve a resource using provided private key.
             *
             * @param {mixed} _pk Private key
             * @return {Model} model instance
             */
            $find: function(_pk) {
              return this.$load(_pk).$fetch();
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Builds and saves a new instance of this model
             *
             * @param  {object} _attr Data to be saved
             * @return {Model} model instance
             */
            $create: function(_attr) {
              return this.$build(_attr).$save();
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Builds a new Model collection
             *
             * Collections are bound to an api resource.
             *
             * @param  {object} _params  Additional query string parameters
             * @param  {string} _url     Optional collection URL (relative to context)
             * @param  {object} _context Collection context override
             * @return {Collection} Model Collection
             */
            $collection: function(_params, _scope) {

              var col = [];

              // Since Array cannot be extended, use method injection
              // TODO: try to find a faster alternative, use for loop instead for example.
              for(var key in Collection) {
                if(this.hasOwnProperty(key)) col[key] = this[key];
              }

              col.$isCollection = true;
              col.$scope = _scope || this.$scope;
              col.$params = this.$params ? extend({}, this.$params, _params) : _params;
              col.$resolved = false;

              return col;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Generates a new collection bound to this context and url and calls $fetch on it.
             *
             * @param {object} _params Collection parameters
             * @return {Collection} Model collection
             */
            $search: function(_params) {
              return this.$collection(_params).$fetch();
            },

            // Collection exclusive methods

            /**
             * @memberof ModelCollection#
             *
             * @description Promise chaining method, keeps the collection instance as the chain context.
             *
             * Calls `$q.then` on the collection's last promise.
             *
             * Usage:
             *
             * ```javascript
             * col.$fetch().$then(function() { });
             * ```
             *
             * @param {function} _success success callback
             * @param {function} _error error callback
             * @return {ModelCollection} self
             */
            $then: function(_success, _error) {
              if(!this.$isCollection) throw new Error('$then is only supported by collections');
              this.$promise = this.$promise.then(_success, _error);
              return this;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Promise chaining, keeps the collection instance as the chain context.
             *
             * Calls ´$q.finally´ on the collection's last promise, updates last promise with finally result.
             *
             * Usage:
             *
             * ```javascript
             * col.$fetch().$finally(function() { });
             * ```
             *
             * @param {function} _cb callback
             * @return {ModelCollection} self
             */
            $finally: function(_cb) {
              this.$promise = this.$promise['finally'](_cb);
              return this;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Feeds raw collection data into the collection, marks collection as $resolved
             *
             * This method is for use in collections only.
             *
             * @param {array} _raw Data to add
             * @return {Collection} self
             */
            $feed: function(_raw) {
              if(!this.$isCollection) throw new Error('$feed is only supported by collections');
              if(!this.$resolved) this.length = 0; // reset contents if not resolved.
              forEach(_raw, this.$buildRaw, this);
              this.$resolved = true;
              return this;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Resets the collection's resolve status.
             *
             * This method is for use in collections only.
             *
             * @return {Collection} self
             */
            $reset: function() {
              if(!this.$isCollection) throw new Error('$reset is only supported by collections');
              cancel(this); // cancel pending requests.
              this.$resolved = false;
              return this;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Begin a server request to populate collection. This method does not
             * clear the collection contents, use `$refresh` to reset and fetch.
             *
             * This method is for use in collections only.
             *
             * TODO: support POST data queries (complex queries scenarios)
             *
             * @param {object} _params Additional request parameters, these parameters are not stored in collection.
             * @return {Collection} self
             */
            $fetch: function(_params) {

              if(!this.$isCollection) throw new Error('$fetch is only supported by collections');

              var params = _params ? extend({}, this.$params || {}, _params) : this.$params,
                  request = { method: 'GET', url: this.$url(), params: params };

              // TODO: check that collection is bound.
              callback('before-fetch-many', this, request);
              send(this, request, function(_response) {
                var data = _response.data;
                if(!data || !isArray(data)) {
                  throw new Error('Error in resource {0} configuration. Expected response to be array');
                }
                this.$feed(data); // feed retrieved data.
                callback('after-fetch-many', this, _response);
              }, function(_response) {
                callback('after-fetch-many-error', this, _response);
              });

              return this;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Resets and fetches content.
             *
             * @param  {object} _params `$fetch` params
             * @return {Collection} self
             */
            $refresh: function(_params) {
              return this.$reset().$fetch(_params);
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Adds an item to the back of the collection. This method does not attempt to send changes
             * to the server. To create a new item and add it use $create or $build.
             *
             * Triggers after-add callbacks.
             *
             * @param {Model} _obj Item to be added
             * @return {Collection} self
             */
            $add: function(_obj, _idx) {
              // TODO: make sure object is f type Model?
              if(this.$isCollection) {
                if(typeof _idx !== 'undefined') {
                  this.splice(_idx, 0, _obj);
                } else {
                  this.push(_obj);
                }
                callback('after-add', this, _obj);
              }
              return this;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description  Removes an item from the collection.
             *
             * This method does not send a DELETE request to the server, it just removes the
             * item locally. To remove an item AND send a DELETE use the item's $destroy method.
             *
             * Triggers after-remove callbacks.
             *
             * @param {Model} _obj Item to be removed
             * @return {Collection} self
             */
            $remove: function(_obj) {
              var idx = this.$indexOf(_obj);
              if(idx !== -1) {
                this.splice(idx, 1);
                callback('after-remove', this, _obj);
              }
              return this;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Finds the location of an object in the array.
             *
             * If a function is provided then the index of the first item for which the function returns true is returned.
             *
             * @param {Model|function} _obj Object to find
             * @return {number} Object index or -1 if not found
             */
            $indexOf: function(_obj) {
              var accept = typeof _obj === 'function' ? _obj : false;
              if(this.$isCollection) {
                for(var i = 0, l = this.length; i < l; i++) {
                  if(accept ? accept(this[i]) : this[i] === _obj) return i;
                }
              }
              return -1;
            }
          };

          // Model customization phase:
          // - Generate the model builder DSL
          // - Process metadata from base chain
          // - Process metadata from arguments

          // Available mappings.
          var mappings = {
            init: ['attrDefault'],
            mask: ['attrMask'],
            ignore: ['attrMask'],
            decode: ['attrDecoder', 'param', 'chain'],
            encode: ['attrEncoder', 'param', 'chain'],
            serialize: ['attrSerializer'],
            // relations
            hasMany: ['attrAsCollection', 'path', 'source', 'inverseOf'],
            hasOne: ['attrAsResource', 'path', 'source', 'inverseOf'],
            belongsTo: ['attrAsReference', 'inline', 'key', 'source', 'prefetch']
          };

          /**
           * @class ModelBuilder
           *
           * @description
           *
           * Provides the DSL for model generation.
           *
           * ### About model descriptions
           *
           * This class is also responsible for parsing **model description objects** passed to
           * the mixin chain.
           *
           * Example of description:
           *
           * ```javascript
           * $restmod.model('', {
           *   propWithDefault: { init: 20 },
           *   propWithDecoder: { decode: 'date', chain: true },
           *   relation: { hasMany: 'Other' },
           * });
           * ```
           *
           * The descriptions are processed by the `describe` method and mapped to builder attribute methods.
           *
           * The following built in property modifiers are provided (see each method docs for usage information):
           *
           * * `init` maps to {@link ModelBuilder#attrDefault}
           * * `mask` and `ignore` maps to {@link ModelBuilder#attrMask}
           * * `decode` maps to {@link ModelBuilder#attrDecoder}
           * * `encode` maps to {@link ModelBuilder#attrEncoder}
           * * `serialize` maps to {@link ModelBuilder#attrSerializer}
           * * `hasMany` maps to {@link ModelBuilder#hasMany}
           * * `hasOne` maps to {@link ModelBuilder#hasOne}
           *
           * Mapping a *primitive* to a property is the same as using the `init` modifier.
           * Mapping a *function* to a property calls {@link ModelBuilder#define} on the function.
           *
           */
          var Builder = {

            setHttpOptions: function(_options) {
              // TODO.
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Sets an url prefix to be added to every url generated by the model.
             *
             * This applies even to objects generated by the `$single` method.
             *
             * This method is intended to be used in a base model mixin so everymodel that extends from it
             * gets the same url prefix.
             *
             * Usage:
             *
             * ```javascript
             * var BaseModel = $restmod.mixin(function() {
             *   this.setUrlPrefix('/api');
             * })
             *
             * var bike = $restmod.model('/bikes', BaseModel).$build({ id: 1 });
             * console.log(bike.$url()) // outputs '/api/bikes/1'
             * ```
             *
             * @param {string} _prefix url portion
             * @return {ModelBuilder} self
             */
            setUrlPrefix: function(_prefix) {
              urlPrefix = _prefix;
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Changes the model's primary key.
             *
             * Primary keys are passed to scope's url methods to generate urls. The default primary key is 'id'.
             *
             * @param {string|function} _key New primary key.
             * @return {ModelBuilder} self
             */
            setPrimaryKey: function(_key) {
              primaryKey = _key;
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Changes the way restmod renames attributes every time a server resource is decoded.
             *
             * This is intended to be used as a way of keeping property naming style consistent accross
             * languajes. By default, property naming in js should use camelcase and property naming
             * in JSON api should use snake case with underscores.
             *
             * If `false` is given, then renaming is disabled
             *
             * @param {function|false} _value decoding function
             * @return {ModelBuilder} self
             */
            setNameDecoder: function(_decoder) {
              nameDecoder = _decoder;
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Changes the way restmod renames attributes every time a local resource is encoded to be sent.
             *
             * This is intended to be used as a way of keeping property naming style consistent accross
             * languajes. By default, property naming in js should use camelcase and property naming
             * in JSON api should use snake case with underscores.
             *
             * If `false` is given, then renaming is disabled
             *
             * @param {function|false} _value encoding function
             * @return {ModelBuilder} self
             */
            setNameEncoder: function(_encoder) {
              nameEncoder = _encoder;
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Disables renaming alltogether
             *
             * @return {ModelBuilder} self
             */
            disableRenaming: function() {
              return this
                .setNameDecoder(false)
                .setNameEncoder(false);
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Extends the builder DSL
             *
             * Adds a function to de builder and alternatively maps the function to an
             * attribute definition keyword that can be later used when calling
             * `define` or `attribute`.
             *
             * Mapping works as following:
             *
             *    // Given the following call
             *    builder.extend('testAttr', function(_attr, _test, _param1, param2) {
             *      // wharever..
             *    }, ['test', 'testP1', 'testP2']);
             *
             *    // A call to
             *    builder.attribute('chapter', { test: 'hello', testP1: 'world' });
             *
             *    // Its equivalent to
             *    builder.testAttr('chapter', 'hello', 'world');
             *
             * The method can also be passed an object with various methods to be added.
             *
             * @param {string|object} _name function name or object to merge
             * @param {function} _fun function
             * @param {array} _mapping function mapping definition
             * @return {ModelBuilder} self
             */
            extend: function(_name, _fun, _mapping) {
              if(typeof _name === 'string') {
                this[_name] = Utils.override(this[name], _fun);
                if(_mapping) {
                  mappings[_mapping[0]] = _mapping;
                  _mapping[0] = _name;
                }
              } else Utils.extendOverriden(this, _name);
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Parses a description object, calls the proper builder method depending
             * on each property description type.
             *
             * @param {object} _description The description object
             * @return {ModelBuilder} self
             */
            describe: function(_description) {
              forEach(_description, function(_desc, _attr) {
                switch(_attr.charAt(0)) {
                case '@':
                  this.classDefine(_attr.substring(1), _desc);
                  break;
                case '~':
                  _attr = $inflector.parameterize(_attr.substring(1));
                  this.on(_attr, _desc);
                  break;
                default:
                  if(isObject(_desc)) this.attribute(_attr, _desc);
                  else if(isFunction(_desc)) this.define(_attr, _desc);
                  else this.attrDefault(_attr, _desc);
                }
              }, this);
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Sets an attribute properties.
             *
             * This method uses the attribute modifiers mapping to call proper
             * modifiers on the argument.
             *
             * For example, using the following description on the createdAt attribute
             *
             *    { decode: 'date', param; 'YY-mm-dd' }
             *
             * Is the same as calling
             *
             *    builder.attrDecoder('createdAt', 'date', 'YY-mm-dd')
             *
             * @param {string} _name Attribute name
             * @param {object} _description Description object
             * @return {ModelBuilder} self
             */
            attribute: function(_name, _description) {
              var key, map, args, i;
              for(key in _description) {
                if(_description.hasOwnProperty(key)) {
                  map = mappings[key];
                  if(map) {
                    args = [_name, _description[key]];
                    for(i = 1; i < map.length; i++) {
                      args.push(_description[map[i]]);
                    }
                    args.push(_description);
                    this[map[0]].apply(this, args);
                  }
                }
              }
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Sets the default value for an attribute.
             *
             * Defaults values are set only on object construction phase.
             *
             * if `_init` is a function, then its evaluated every time the
             * default value is required.
             *
             * @param {string} _attr Attribute name
             * @param {mixed} _init Defaulf value / iniline function
             * @return {ModelBuilder} self
             */
            attrDefault: function(_attr, _init) {
              // IDEA: maybe fixed defaults could be added to Model prototype...
              defaults.push([_attr, _init]);
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Sets an attribute mask.
             *
             * An attribute mask prevents the attribute to be loaded from or sent to the server on certain operations.
             *
             * The attribute mask is a string composed by:
             * * C: To prevent attribute from being sent on create
             * * R: To prevent attribute from being loaded from server
             * * U: To prevent attribute from being sent on update
             *
             * For example, the following will prevent an attribute to be send on create or update:
             *
             * ```javascript
             * builder.attrMask('readOnly', 'CU');
             * ```
             *
             * If a true boolean value is passed as mask, then 'CRU' will be used
             * If a false boolean valus is passed as mask, then mask will be removed
             *
             * @param {string} _attr Attribute name
             * @param {boolean|string} _mask Attribute mask
             * @return {ModelBuilder} self
             */
            attrMask: function(_attr, _mask) {
              Model.$$setMask(_attr, _mask);
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Assigns a serializer to a given attribute.
             *
             * A _serializer is:
             * * an object that defines both a `decode` and a `encode` method
             * * a function that when called returns an object that matches the above description.
             * * a string that represents an injectable that matches any of the above descriptions.
             *
             * @param {string} _name Attribute name
             * @param {string|object|function} _serializer The serializer
             * @return {ModelBuilder} self
             */
            attrSerializer: function(_name, _serializer, _opt) {
              if(typeof _serializer === 'string') {
                _serializer = $injector.get($inflector.camelize(_serializer, true) + 'Serializer');
              }

              // TODO: if(!_serializer) throw $setupError
              if(isFunction(_serializer)) _serializer = _serializer(_opt);
              if(_serializer.decode) this.attrDecoder(_name, bind(_serializer, _serializer.decode));
              if(_serializer.encode) this.attrEncoder(_name, bind(_serializer, _serializer.encode));
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Assigns a decoding function/filter to a given attribute.
             *
             * @param {string} _name Attribute name
             * @param {string|function} _filter filter or function to register
             * @param {mixed} _filterParam Misc filter parameter
             * @param {boolean} _chain If true, filter is chained to the current attribute filter.
             * @return {ModelBuilder} self
             */
            attrDecoder: function(_name, _filter, _filterParam, _chain) {
              if(typeof _filter === 'string') {
                var filter = $filter(_filter);
                // TODO: if(!_filter) throw $setupError
                _filter = function(_value) { return filter(_value, _filterParam); };
              }

              decoders[_name] = _chain ? Utils.chain(decoders[_name], _filter) : _filter;
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Assigns a encoding function/filter to a given attribute.
             *
             * @param {string} _name Attribute name
             * @param {string|function} _filter filter or function to register
             * @param {mixed} _filterParam Misc filter parameter
             * @param {boolean} _chain If true, filter is chained to the current attribute filter.
             * @return {ModelBuilder} self
             */
            attrEncoder: function(_name, _filter, _filterParam, _chain) {
              if(typeof _filter === 'string') {
                var filter = $filter(_filter);
                // TODO: if(!_filter) throw $setupError
                _filter = function(_value) { return filter(_value, _filterParam); };
              }

              encoders[_name] = _chain ? Utils.chain(encoders[_name], _filter) : _filter;
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Registers a model **resources** relation
             *
             * @param {string}  _name Attribute name
             * @param {string|object} _model Other model, supports a model name or a direct reference.
             * @param {string} _url Partial url
             * @param {string} _source Inline resource alias (optional)
             * @param {string} _inverseOf Inverse property name (optional)
             * @return {ModelBuilder} self
             */
            attrAsCollection: function(_attr, _model, _url, _source, _inverseOf) {
              return this.attrDefault(_attr, function() {

                if(typeof _model === 'string') {
                  _model = $injector.get(_model);

                  if(_inverseOf) {
                    _model.$$setMask(_inverseOf, WRITE_MASK);
                  }
                }

                var self = this,
                    scope = this.$buildScope(_model, _url || $inflector.parameterize(_attr)),
                    col = _model.$collection(null, scope);

                // TODO: there should be a way to modify scope behavior just for this relation,
                // since relation item scope IS the collection, then the collection should
                // be extended to provide a modified scope. For this an additional _extensions
                // parameters could be added to collection, then these 'extensions' are inherited
                // by child collections, the other alternative is to enable full property inheritance ...

                // set inverse property if required.
                if(_inverseOf) {
                  col.$on('after-add', function(_obj) {
                    _obj[_inverseOf] = self;
                  });
                }

                return col;
              // simple support for inline data, TODO: maybe deprecate this.
              }).attrDecoder(_source || _url || _attr, function(_raw) {
                this[_attr].$reset().$feed(_raw);
              }).attrMask(_attr, WRITE_MASK);
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Registers a model **resource** relation
             *
             * @param {string}  _name Attribute name
             * @param {string|object} _model Other model, supports a model name or a direct reference.
             * @param {string} _url Partial url (optional)
             * @param {string} _source Inline resource alias (optional)
             * @param {string} _inverseOf Inverse property name (optional)
             * @return {ModelBuilder} self
             */
            attrAsResource: function(_attr, _model, _url, _source, _inverseOf) {

              return this
                .attrDefault(_attr, function() {

                  if(typeof _model === 'string') {
                    _model = $injector.get(_model);

                    if(_inverseOf) {
                      _model.$$setMask(_inverseOf, WRITE_MASK);
                    }
                  }

                  var scope = this.$buildScope(_model, _url || $inflector.parameterize(_attr)),
                      inst = new _model(scope);

                  // TODO: provide a way to modify scope behavior just for this relation

                  if(_inverseOf) {
                    inst[_inverseOf] = this;
                  }

                  return inst;
                })
                // simple support for inline data, TODO: maybe deprecate this.
                .attrDecoder(_source || _url || _attr, function(_raw) {
                  this[_attr].$decode(_raw);
                })
                .attrMask(_attr, WRITE_MASK);
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Registers a model **reference** relation.
             *
             * A reference relation
             *
             * @param {string}  _name Attribute name
             * @param {string|object} _model Other model, supports a model name or a direct reference.
             * @param {bool} _inline If true, model data is expected to be inlined in parent response.
             * @param {string} _key reference id property name (optional, defaults to _attr + 'Id')
             * @param {bool} _prefetch if set to true, $fetch will be automatically called on relation object load.
             * @return {ModelBuilder} self
             */
            attrAsReference: function(_attr, _model, _inline, _key, _source, _prefetch) {

              var watch = _inline ? (_source || _attr) : (_key || (_attr + 'Id'));
              this
                .attrDefault(_attr, null)
                .attrMask(_attr, WRITE_MASK)
                .attrDecoder(watch , function(_raw) {

                  // load model
                  if(typeof _model === 'string') {
                    _model = $injector.get(_model);
                  }

                  // only reload object if id changes
                  if(_inline)
                  {
                    if(!this[_attr] || this[_attr].$pk !== _model.$inferKey(_raw)) { // TODO: using infer key on raw...
                      this[_attr] = _model.$buildRaw(_raw);
                    } else {
                      this[_attr].$decode(_raw);
                    }
                  }
                  else
                  {
                    if(!this[_attr] || this[_attr].$pk !== _raw) {
                      this[_attr] = _model.$load(_raw); // use $new instead of $build
                      if(_prefetch) {
                        this[_attr].$fetch();
                      }
                    }
                  }
                });
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Registers an instance method
             *
             * Usage:
             *    builder.define(function(_super) {
             *      return $fetch()
             *    });
             *
             * It is posible to override an existing method using define,
             * if overriden, the old method can be called using `this.$super`
             * inside de new method.
             *
             * @param {string} _name Method name
             * @param {function} _fun Function to define
             * @return {ModelBuilder} self
             */
            define: function(_name, _fun) {
              if(typeof _name === 'string') {
                Model.prototype[_name] = Utils.override(Model.prototype[_name], _fun);
              } else {
                Utils.extendOverriden(Model.prototype, _name);
              }
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Registers a class method
             *
             * It is posible to override an existing method using define,
             * if overriden, the old method can be called using `this.$super`
             * inside de new method.
             *
             * @param {string} _name Method name
             * @param {function} _fun Function to define
             * @return {ModelBuilder} self
             */
            classDefine: function(_name, _fun) {
              if(typeof _name === 'string') {
                Collection[_name] = Utils.override(Collection[_name], _fun);
              } else {
                Utils.extendOverriden(Collection, _name);
              }
              return this;
            },

            /**
             * @memberof ModelBuilder#
             *
             * @description Adds an event hook
             *
             * Hooks are used to extend or modify the model behavior, and are not
             * designed to be used as an event listening system.
             *
             * The given function is executed in the hook's context, different hooks
             * make different parameters available to callbacks.
             *
             * @param {string} _hook The hook name, refer to restmod docs for builtin hooks.
             * @param {function} _do function to be executed
             * @return {ModelBuilder} self
             */
            on: function(_hook, _do) {
              Model.$$registerHook(_hook, _do);
              return this;
            },

            /// Experimental modifiers

            /**
             * @memberof ModelBuilder#
             *
             * @description Expression attributes are evaluated every time new data is fed to the model.
             *
             * @param {string}  _name Attribute name
             * @param {string} _expr Angular expression to evaluate
             * @return {ModelBuilder} self
             */
            attrExpression: function(_name, _expr) {
              var filter = $parse(_expr);
              this.on('after-feed', function() {
                this[_name] = filter(this);
              });
            }
          };

          // use the builder to process a mixin chain
          function loadMixinChain(_chain) {
            for(var i = 0, l = _chain.length; i < l; i++) {
              loadMixin(_chain[i]);
            }
          }

          // use the builder to process a single mixin
          function loadMixin(_mix) {
            if(_mix.$chain) {
              loadMixinChain(_mix.$chain);
            } else if(typeof _mix === 'string') {
              loadMixin($injector.get(_mix));
            } else if(isArray(_mix) || isFunction(_mix)) {
              // TODO: maybe invoke should only be called for BASE_CHAIN functions
              $injector.invoke(_mix, Builder, { $builder: Builder });
            } else Builder.describe(_mix);
          }

          loadMixinChain(BASE_CHAIN);
          loadMixinChain(Model.$chain = arraySlice.call(arguments, 1));

          // TODO postprocessing of collection prototype.
          extend(Model, Collection);

          return Model;
        },

        /**
         * @method mixin
         * @memberOf services.$restmod#
         *
         * @description
         *
         * The mixin factory
         *
         * A mixin is just a metadata container that can be included in a mixin chain.
         *
         * @return {object} The abstract model
         */
        mixin: function(/* mixins */) {
          return { $isAbstract: true, $chain: arraySlice.call(arguments, 0) };
        },

        /**
         * @method singleton
         * @memberOf services.$restmod#
         *
         * Shorcut method used to create singleton resources. see {@link Model@$single}.
         *
         * @param {string} _url Resource url,
         * @param {mixed} _mixins Mixin chain.
         * @return {object} New resource instance.
         */
        singleton: function(_url/*, _mixins*/) {
          return restmod.model.apply(this, arguments).$single(_url);
        }
      };

      return restmod;
    }]
  };
})
.factory('model', ['$restmod', function($restmod) {
  return $restmod.model;
}])
.factory('mixin', ['$restmod', function($restmod) {
  return $restmod.mixin;
}]);

})(angular);