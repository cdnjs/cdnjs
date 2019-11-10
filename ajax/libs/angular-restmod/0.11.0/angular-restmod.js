/**
 * API Bound Models for AngularJS
 * @version v0.11.0 - 2014-01-22
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

/**
 * @class SyncMask
 * @memberOf constants
 *
 * @description The object property synchronization mask.
 */
var SyncMask = {
  NONE: 0x00,
  ALL: 0xFFFF,
  SYSTEM_ALL: 0x1FFFF,

  SYSTEM: 0x10000,

  DECODE_CREATE: 0x0001,
  DECODE_UPDATE: 0x0002,
  DECODE_USER: 0x0004,
  DECODE_SAVE: 0x0003,

  ENCODE_CREATE: 0x0100,
  ENCODE_UPDATE: 0x0200,
  ENCODE_USER: 0x0400,
  ENCODE_SAVE: 0x0300,

  // Compound masks
  DECODE: 0x00FF,
  ENCODE: 0xFF00,
  CREATE: 0x0101,
  UPDATE: 0x0202,
  USER: 0x0404,
  SAVE: 0x0303
};

// Cache some angular stuff
var bind = angular.bind,
    forEach = angular.forEach,
    extend = angular.extend,
    isObject = angular.isObject,
    isArray = angular.isArray,
    isFunction = angular.isFunction,
    arraySlice = Array.prototype.slice;

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

          var masks = {
                $type: SyncMask.SYSTEM_ALL,
                $scope: SyncMask.SYSTEM_ALL,
                $promise: SyncMask.SYSTEM_ALL,
                $pending: SyncMask.SYSTEM_ALL,
                $response: SyncMask.SYSTEM_ALL,
                $error: SyncMask.SYSTEM_ALL,
                $cb: SyncMask.SYSTEM_ALL
              },
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

            callback('before-request', _target, _config);

            _target.$pending = true;
            _target.$response = null;
            _target.$error = false;

            _target.$promise = $http(_config).then(function(_response) {

              // IDEA: a response interceptor could add additional error states based on returned data,
              // this could allow for additional error state behaviours (for example, an interceptor
              // could watch for rails validation errors and store them in the model, then return false
              // to trigger a promise queue error).

              _target.$pending = false;
              _target.$response = _response;

              callback('after-request', _target, _response);

              if(_success) _success.call(_target, _response);

              return _target;

            }, function(_response) {

              _target.$pending = false;
              _target.$response = _response;
              _target.$error = true;

              callback('after-request-error', _target, _response);

              if(_error) _error.call(_target, _response);

              return $q.reject(_target);
            });
          }

          // recursive transformation function, used by $decode and $encode.
          function transform(_data, _ctx, _prefix, _mask, _decode, _into) {

            var key, decodedName, encodedName, fullName, filter, value, result = _into || {};

            for(key in _data) {
              if(_data.hasOwnProperty(key)) {

                decodedName = (_decode && nameDecoder) ? nameDecoder(key) : key;
                fullName = _prefix + decodedName;

                // check if property is masked for this operation
                if(!((masks[fullName] || 0) & _mask)) {

                  value = _data[key];
                  filter = _decode ? decoders[fullName] : encoders[fullName];

                  if(filter) {
                    value = filter.call(_ctx, value);
                    if(value === undefined) continue; // ignore value if filter returns undefined
                  } else if(typeof value === 'object' && value &&
                    (_decode || typeof value.toJSON !== 'function')) {
                    // IDEA: make extended decoding/encoding optional, could be a little taxxing for some apps
                    value = transformExtended(value, _ctx, fullName, _mask, _decode);
                  }

                  encodedName = (!_decode && nameEncoder) ? nameEncoder(decodedName) : decodedName;
                  result[encodedName] = value;
                }
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
          function Model(_scope, _pk) {

            this.$scope = _scope;
            this.$pk = _pk;
            this.$pending = false;
            this.$type = Model;

            var tmp;

            // apply defaults
            for(var i = 0; (tmp = defaults[i]); i++) {
              this[tmp[0]] = (typeof tmp[1] === 'function') ? tmp[1].apply(this) : tmp[1];
            }
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
                return _url;
              }
            }, '');
          };

          Model.inferKey = function(_data) {
            if(typeof _data === 'object') {
              if(typeof _data.id === 'undefined') return null;
              return _data.id;
            } else {
              return _data;
            }
          };

          /** Runtime modifiers */

          // sets an attribute mask at runtime
          Model.setMask = function(_attr, _mask) {
            masks[_attr] = _mask;
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
              return this.$scope.$urlFor(this);
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
                  $urlFor: function() {
                    return joinUrl(self.$url(true), _partial);
                  },
                  $createUrlFor: function() {
                    // create is not posible in nested members
                    return null;
                  },
                  $updateUrlFor: function(_item) {
                    // prefer unscoped but fallback to scoped during an update
                    return _for.$urlFor(_item) || this.$urlFor();
                  },
                  $destroyUrlFor: function(_item) {
                    return _for.$baseUrl ? _for.$urlFor(_item) : this.$urlFor();
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
             * @description Iterates over the object properties
             *
             * @param {function} _fun Function to call for each
             * @param {SyncMask} _mask Mask used to filter the returned properties, defaults to SyncMask.SYSTEM
             * @return {Model} self
             */
            $each: function(_fun, _mask, _ctx) {
              if(_mask === undefined) _mask = SyncMask.SYSTEM;

              for(var key in this) {
                if(this.hasOwnProperty(key)) {
                  // Only iterate at base level for now
                  if(!((masks[key] || 0) & _mask)) {
                    _fun.call(_ctx || this[key], this[key], key);
                  }
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
             * @param {string} _mask Action mask
             * @return {Model} this
             */
            $decode: function(_raw, _mask) {
              transform(_raw, this, '', _mask || SyncMask.DECODE_USER, true, this);
              if(!this.$pk) this.$pk = Model.inferKey(_raw); // TODO: improve this, warn if key changes
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
              var raw = transform(this, this, '', _mask || SyncMask.ENCODE_USER, false);
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
              var url = this.$url();
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
              var url = this.$scope.$updateUrlFor ? this.$scope.$updateUrlFor(this) : this.$url(),
                  request;

              if(url) {
                // If bound, update
                request = { method: 'PUT', url: url, data: this.$encode(SyncMask.ENCODE_UPDATE) };
                callback('before-update', this, request);
                callback('before-save', this, request);
                return this.$send(request, function(_response) {
                  var data = _response.data;
                  if (data && !isArray(data)) this.$decode(data, SyncMask.DECODE_UPDATE);
                  callback('after-update', this, _response);
                  callback('after-save', this, _response);
                }, function(_response) {
                  callback('after-update-error', this, _response);
                  callback('after-save-error', this, _response);
                });
              } else {
                // If not bound create.
                url = (this.$scope.$createUrlFor && this.$scope.$createUrlFor(this)) || (this.$scope.$url && this.$scope.$url());
                if(!url) throw new Error('Create is not supported by this resource');
                request = { method: 'POST', url: url, data: this.$encode(SyncMask.ENCODE_CREATE) };
                callback('before-save', this, request);
                callback('before-create', this, request);
                return this.$send(request, function(_response) {
                  var data = _response.data;
                  if (data && !isArray(data)) this.$decode(data, SyncMask.DECODE_CREATE);
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
              var url = this.$scope.$destroyUrlFor ? this.$scope.$destroyUrlFor(this) : this.$url();
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

            $baseUrl: _baseUrl,

            /**
             * @memberof ModelCollection#
             *
             * @description Gets this collection url without query string.
             *
             * @return {string} The collection url.
             */
            $url: function() {
              return this.$scope ? this.$scope.$urlFor(this) : this.$baseUrl;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Part of the scope interface, provides urls for collection's items.
             *
             * @param {Model} _for Item to provide the url to.
             * @return {string|null} The url or nill if item does not meet the url requirements.
             */
            $urlFor: function(_for) {
              // force items unscoping if model is not anonymous (maybe make this optional)
              return joinUrl(this.$baseUrl ? this.$baseUrl : this.$url(), _for.$pk);
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
             * @description Creates a new model instance bound to this context.
             *
             * @param {mixed} _pk object private key
             * @return {Model} New model instance
             */
            $new: function(_pk) {
              return new Model(this, _pk);
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Builds a new instance of this model
             *
             * If `_init` is not an object, then its treated as a primary key.
             *
             * @param  {object} _init Initial values
             * @return {Model} model instance
             */
            $build: function(_init) {
              var obj = this.$new(Model.inferKey(_init));
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
              var obj = this.$new(Model.inferKey(_raw));
              obj.$decode(_raw);

              if(this.$isCollection) this.$add(obj);
              return obj;
            },

            /**
             * @memberof ModelCollection#
             *
             * @description Attempts to resolve a resource using provided data
             *
             * If `_init` is not an object, then its treated as a primary key.
             *
             * @param  {object} _init Data to provide
             * @return {Model} model instance
             */
            $find: function(_init) {
              return this.$new(Model.inferKey(_init)).$fetch();
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
              col.$pending = false;
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
             * @description Sets the private key provider for this model instances.
             *
             * Private keys are passed to scope's $url methods to generate the instance url.
             *
             * @param {function} the new provider, receives an object and returns the key.
             * @return {ModelBuilder} self
             */
            setKeyProvider: function(_provider) {
              Model.inferKey = _provider;
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
                switch(_attr[0]) {
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
             * @param {string} _attr Attribute name
             * @param {boolean|integer} _mask Ignore mask or true to use SyncMask.ALL
             * @param {boolean} _reset If set to true, old mask is reset.
             * @return {ModelBuilder} self
             */
            attrMask: function(_attr, _mask, _reset) {

              if(_mask === true) {
                masks[_attr] = SyncMask.ALL;
              } else if(_mask === false) {
                delete masks[_attr];
              } else if(_reset) {
                masks[_attr] = _mask;
              } else {
                masks[_attr] |= _mask;
              }

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
                    _model.setMask(_inverseOf, SyncMask.ENCODE);
                  }
                }

                var self = this,
                    scope = this.$buildScope(_model, _url || $inflector.parameterize(_attr)),
                    col = _model.$collection(null, scope);

                // TODO: provide a way to modify scope behavior just for this relation,
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
                this[_attr].$feed(_raw);
              }).attrMask(_attr, SyncMask.ENCODE);
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
                      _model.setMask(_inverseOf, SyncMask.ENCODE);
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
                .attrMask(_attr, SyncMask.ENCODE);
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
                .attrMask(_attr, SyncMask.ENCODE)
                .attrDecoder(watch , function(_raw) {

                  // load model
                  if(typeof _model === 'string') {
                    _model = $injector.get(_model);
                  }

                  // only reload object if id changes
                  if(_inline)
                  {
                    if(!this[_attr] || this[_attr].$pk !== _model.inferKey(_raw)) {
                      this[_attr] = _model.$buildRaw(_raw);
                    } else {
                      this[_attr].$decode(_raw);
                    }
                  }
                  else
                  {
                    if(!this[_attr] || this[_attr].$pk !== _raw) {
                      this[_attr] = _model.$build(_raw);
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
              var cbs = callbacks[_hook];
              if(!cbs) cbs = callbacks[_hook] = [];
              cbs.push(_do);
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
}])
// make SyncMask available as constant
.constant('SyncMask', SyncMask);

})(angular);