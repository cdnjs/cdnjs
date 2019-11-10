/**
 * API Bound Models for AngularJS
 * @version v1.1.4 - 2014-11-26
 * @link https://github.com/angular-platanus/restmod
 * @author Ignacio Baixas <ignacio@platan.us>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
// Preload some angular stuff
var RMModule = angular.module('restmod', ['ng', 'platanus.inflector']);

/**
 * @class restmodProvider
 *
 * @description
 *
 * The restmodProvider exposes restmod configuration methods
 */
RMModule.provider('restmod', [function() {

  var BASE_CHAIN = ['RMBuilderExt', 'RMBuilderRelations', 'RMBuilderComputed'];

  function wrapInInvoke(_mixin) {
    return function(_injector) {
      _injector.invoke(_mixin, this, { $builder: this });
    };
  }

  return {
    /**
     * @memberof restmodProvider#
     *
     * @description
     *
     * Adds base mixins for every generated model.
     *
     * **ATTENTION** Model names should NOT be added to this chain.
     *
     * All mixins added to the chain are prepended to every generated model.
     *
     * Usage:
     *
     * ```javascript
     * $provider.rebase('ChangeModel', 'LazyRelations', 'ThrottledModel')
     * ```
     */
    rebase: function(/* _mix_names */) {
      var mixin, i, l = arguments.length;
      for(i = 0; i < l; i++) {
        mixin = arguments[i];
        if(angular.isArray(mixin) || angular.isFunction(mixin)) {
          mixin = wrapInInvoke(mixin);
        }
        BASE_CHAIN.push(mixin);
      }
      return this;
    },

    /**
     * @class restmod
     *
     * @description
     *
     * The restmod service provides factory methods for the different restmod consumables.
     */
    $get: ['RMModelFactory', '$log', function(buildModel, $log) {

      var arraySlice = Array.prototype.slice;

      var restmod = {
        /**
         * @memberOf restmod#
         *
         * @description
         *
         * The model factory is used to generate new restmod model types. It's recommended to put models inside factories,
         * this is usefull later when defining relations and inheritance, since the angular $injector is used by
         * these features. It's also the angular way of doing things.
         *
         * A simple model can be built like this:
         *
         * ```javascript
         * angular.module('bike-app').factory('Bike', function(restmod) {
         *   return restmod.model('/bikes');
         * });
         *```
         *
         * The `_url` parameter is the resource url the generated model will be bound to, if `null` is given then
         * the model is *nested* and can only be used in another model context.
         *
         * The model also accepts one or more definition providers as one or more arguments after the _url parameter,
         * posible definition providers are:
         *
         * * A definition object (more on this at the {@link BuilderApi}):
         *
         * ```javascript
         * restmod.model('/bikes', {
         *   viewed: { init: false },
         *   parts: { hasMany: 'Part' },
         *   '~afterCreate': function() {
         *     alert('Bike created!!');
         *   }
         * });
         *```
         *
         * * A definition function (more on this at the {@link BuilderApi}):
         *
         * ```javascript
         * restmod.model('/bikes', function() {
         *   this.attrDefault('viewed', false);
         *   this.attrMask('id', 'CU');
         * });
         *```
         *
         * * A mixin (generated using the mixin method) or model factory name:
         *
         * ```javascript
         * restmod.model('/bikes', 'BaseModel', 'PagedModel');
         *```
         *
         * * A mixin (generated using the mixin method) or model object:
         *
         * ```javascript
         * restmod.model('/bikes', BaseModel, PagedModel);
         * ```
         *
         * @param {string} _url Resource url.
         * @param {mixed} _mix One or more mixins, description objects or description blocks.
         * @return {StaticApi} The new model.
         */
        model: function(_baseUrl/* , _mix */) {
          var model = buildModel(_baseUrl, BASE_CHAIN);

          if(arguments.length > 1) {
            model.mix(arraySlice.call(arguments, 1));
            $log.warn('Passing mixins and difinitions in the model method will be deprecated in restmod 1.2, use restmod.model().$mix() instead.');
          }

          return model;
        },

        /**
         * @memberOf restmod#
         *
         * @description
         *
         * The mixin factory is used to pack model behaviors without the overload of generating a new
         * model. The mixin can then be passed as argument to a call to {@link restmod#model#model}
         * to extend the model capabilities.
         *
         * A mixin can also be passed to the {@link restmodProvider#rebase} method to provide
         * a base behavior for all generated models.
         *
         * @param {mixed} _mix One or more mixins, description objects or description blocks.
         * @return {object} The mixin
         */
        mixin: function(/* _mix */) {
          return { $isAbstract: true, $$chain: arraySlice.call(arguments, 0) };
        },

        /**
         * @memberOf restmod#
         *
         * @description
         *
         * Shorcut method used to create singleton resources.
         *
         * Same as calling `restmod.model(null).$single(_url)`
         *
         * Check the {@link StaticApi#$single} documentation for more information.
         *
         * @param {string} _url Resource url,
         * @param {mixed} _mix Mixin chain.
         * @return {RecordApi} New resource instance.
         */
        singleton: function(_url/*, _mix */) {
          return restmod.model.apply(this, arguments).single(_url);
        }
      };

      return restmod;
    }]
  };
}])
.factory('model', ['restmod', function(restmod) {
  return restmod.model;
}])
.factory('mixin', ['restmod', function(restmod) {
  return restmod.mixin;
}]);

RMModule.factory('RMCollectionApi', ['RMUtils', function(Utils) {

  var extend = angular.extend;

  /**
   * @class CollectionApi
   *
   * @extends ScopeApi
   * @extends CommonApi
   *
   * @description
   *
   * A restmod collection is an extended array type bound REST resource route.
   *
   * Every time a new restmod model is created, an associated collection type is created too.
   *
   * TODO: talk about fetch/refresh behaviour, lifecycles, collection scopes, adding/removing
   *
   * For `$fetch` on a collection:
   *
   * * before-fetch-many
   * * before-request
   * * after-request[-error]
   * * after-feed (called for every record if no errors)
   * * after-feed-many (only called if no errors)
   * * after-fetch-many[-error]
   *
   * @property {boolean} $isCollection Helper flag to separate collections from the main type
   * @property {object} $scope The collection scope (hierarchical scope, not angular scope)
   * @property {object} $params The collection query parameters
   *
   */
  return {

    $isCollection: true,

    /**
     * @memberof CollectionApi#
     *
     * @description Called by collection constructor on initialization.
     *
     * Note: Is better to add a hook on after-init than overriding this method.
     */
    $initialize: function() {
      // after initialization hook
      this.$dispatch('after-collection-init');
    },

    /**
     * @memberof CollectionApi#
     *
     * @description Feeds raw collection data into the collection.
     *
     * This method is for use in collections only.
     *
     * @param {array} _raw Data to add
     * @param  {string} _mask 'CRU' mask
     * @return {CollectionApi} self
     */
    $decode: function(_raw, _mask) {

      Utils.assert(_raw && angular.isArray(_raw), 'Collection $decode expected array');

      for(var i = 0, l = _raw.length; i < l; i++) {
        this.$buildRaw(_raw[i], _mask).$reveal(); // build and disclose every item.
      }

      this.$dispatch('after-feed-many', [_raw]);
      return this;
    },

    /**
     * @memberof CollectionApi#
     *
     * @description Encodes array data into a its serialized version.
     *
     * @param  {string} _mask 'CRU' mask
     * @return {CollectionApi} self
     */
    $encode: function(_mask) {
      var raw = [];
      for(var i = 0, l = this.length; i < l; i++) {
        raw.push(this[i].$encode(_mask));
      }

      this.$dispatch('before-render-many', [raw]);
      return raw;
    },

    /**
     * @memberof CollectionApi#
     *
     * @description Resets the collection's contents
     *
     * @return {CollectionApi} self
     */
    $clear: function() {
      return this.$always(function() {
        this.length = 0; // reset the collection contents
      });
    },

    /**
     * @memberof CollectionApi#
     *
     * @description Begin a server request to populate collection. This method does not
     * clear the collection contents by default, use `$refresh` to reset and fetch.
     *
     * This method is for use in collections only.
     *
     * @param {object|function} _params Additional request parameters, not stored in collection,
     * if a function is given, then it will be called with the request object to allow requet customization.
     * @return {CollectionApi} self
     */
    $fetch: function(_params) {
      return this.$action(function() {
        var request = { method: 'GET', url: this.$url('fetchMany'), params: this.$params };

        if(_params) {
          request.params = request.params ? extend(request.params, _params) : _params;
        }

        // TODO: check that collection is bound.

        this
          .$dispatch('before-fetch-many', [request])
          .$send(request, function(_response) {
            this
              .$unwrap(_response.data)
              .$dispatch('after-fetch-many', [_response]);
          }, function(_response) {
            this.$dispatch('after-fetch-many-error', [_response]);
          });
      });
    },

    /**
     * @memberof CollectionApi#
     *
     * @description Adds an item to the back of the collection. This method does not attempt to send changes
     * to the server. To create a new item and add it use $create or $build.
     *
     * Triggers after-add callbacks.
     *
     * @param {RecordApi} _obj Item to be added
     * @return {CollectionApi} self
     */
    $add: function(_obj, _idx) {
      Utils.assert(_obj.$type && _obj.$type === this.$type, 'Collection $add expects record of the same $type');

      return this.$action(function() {
        if(_obj.$position === undefined) {
          if(_idx !== undefined) {
            this.splice(_idx, 0, _obj);
          } else {
            this.push(_obj);
          }
          _obj.$position = true; // use true for now, keeping position updated can be expensive
          this.$dispatch('after-add', [_obj]);
        }
      });
    },

    /**
     * @memberof CollectionApi#
     *
     * @description  Removes an item from the collection.
     *
     * This method does not send a DELETE request to the server, it just removes the
     * item locally. To remove an item AND send a DELETE use the item's $destroy method.
     *
     * Triggers after-remove callbacks.
     *
     * @param {RecordApi} _obj Item to be removed
     * @return {CollectionApi} self
     */
    $remove: function(_obj) {
      return this.$action(function() {
        var idx = this.$indexOf(_obj);
        if(idx !== -1) {
          this.splice(idx, 1);
          _obj.$position = undefined;
          this.$dispatch('after-remove', [_obj]);
        }
      });
    },

    /**
     * @memberof CollectionApi#
     *
     * @description Finds the location of an object in the array.
     *
     * If a function is provided then the index of the first item for which the function returns true is returned.
     *
     * @param {RecordApi|function} _obj Object to find
     * @return {number} Object index or -1 if not found
     */
    $indexOf: function(_obj) {
      var accept = typeof _obj === 'function' ? _obj : false;
      for(var i = 0, l = this.length; i < l; i++) {
        if(accept ? accept(this[i]) : this[i] === _obj) return i;
      }
      return -1;
    }
  };

}]);
RMModule.factory('RMCommonApi', ['$http', 'RMFastQ', '$log', function($http, $q, $log) {

  var EMPTY_ARRAY = [];

  function wrapPromise(_ctx, _fun) {
    var dsp = _ctx.$dispatcher();
    return function(_last) {
      // save and reset promise
      var oldPromise = _ctx.$promise;
      _ctx.$promise = undefined;
      try {
        _ctx.$last = _last;
        var result = dsp ? _ctx.$decorate(dsp, _fun, [_ctx]) : _fun.call(_ctx, _ctx);
        return result === undefined ? _ctx.$promise : result;
      } finally {
        _ctx.$promise = oldPromise; // restore old promise
      }
    };
  }

  /**
   * @class CommonApi
   *
   * @description
   *
   * Provides a common framework for restmod resources.
   *
   * This API is included in {@link RecordApi} and {@link CollectionApi}.
   * making its methods available in every structure generated by restmod.
   *
   * TODO: Describe hook mechanism, promise mechanism and send lifecycle.
   *
   * @property {promise} $promise The last operation promise (undefined if no promise has been created yet)
   * @property {array} $pending Pending requests associated to this resource (undefined if no request has been initiated)
   * @property {object} $$cb Scope call backs (undefined if no callbacks have been defined, private api)
   * @property {function} $$dsp The current event dispatcher (private api)
   */
  var CommonApi = {

    /**
     * @memberof CommonApi#
     *
     * @description Gets this resource url.
     *
     * @param {string} _for Intended usage for the url (optional)
     * @return {string} The resource url.
     */
    $url: function(_for) {
      if(_for) {
        _for = '$' + _for + 'UrlFor';
        if(this.$scope[_for]) return this.$scope[_for](this);
      } else if(this.$scope.$cannonicalUrlFor) {
        return this.$scope.$cannonicalUrlFor(this);
      }

      return this.$scope.$urlFor(this);
    },

    // Hooks API

    /**
     * @memberof CommonApi#
     *
     * @description Executes a given hook callbacks using the current dispatcher context.
     *
     * This method can be used to provide custom object lifecycle hooks.
     *
     * Usage:
     *
     * ```javascript
     * var mixin = restmod.mixin({
     *   triggerDummy: function(_param) {
     *     this.$dispatch('dummy-hook', _param);
     *   }
     * });
     *
     * // Then hook can be used at model definition to provide type-level customization:
     * var Bike $resmod.model('/api/bikes', mixin, {
     *   '~dummy-hook': function() {
     *     alert('This is called for every bike');
     *   }
     * };
     *
     * // or at instance level:
     * var myBike = Bike.$build();
     * myBike.$on('dummy-hook', function() {
     *   alert('This is called for myBike only');
     * });
     *
     * // or event at decorated context level
     * myBike.$decorate({
     *   'dummy-hook': function() {
     *     alert('This is called for myBike only inside the decorated context');
     *   }
     * }, fuction() {
     *  // decorated context
     * });
     * ```
     *
     * @param  {string} _hook Hook name
     * @param  {array} _args Hook arguments
     * @param  {object} _ctx Hook execution context override
     *
     * @return {CommonApi} self
     */
    $dispatch: function(_hook, _args, _ctx) {
      var cbs, i, cb, dsp = this.$$dsp;

      if(!_ctx) _ctx = this;

      // context callbacks
      if(dsp) {
        this.$$dsp = undefined; // disable dsp for hooks
        dsp(_hook, _args, _ctx);
      }

      // instance callbacks
      if(this.$$cb && (cbs = this.$$cb[_hook])) {
        for(i = 0; !!(cb = cbs[i]); i++) {
          cb.apply(_ctx, _args || EMPTY_ARRAY);
        }
      }

      // bubble up the object scope, bubble to type only if there isnt a viable parent scope.
      if(this.$scope && this.$scope.$dispatch) {
        this.$scope.$dispatch(_hook, _args, _ctx);
      } else if(this.$type) {
        this.$type.$dispatch(_hook, _args, _ctx);
      }

      this.$$dsp = dsp; // reenable dsp.

      return this;
    },

    /**
     * @memberof CommonApi#
     *
     * @description Registers an instance hook.
     *
     * An instance hook is called only for events generated by the calling object.
     *
     * ```javascript
     * var bike = Model.$build(), bike2 = Model.$build();
     * bike.$on('before-save', function() { alert('saved!'); });
     *
     * bike.$save(); // 'saved!' alert is shown after bike is saved
     * bike2.$save(); // no alert is shown after bike2 is saved
     * ```
     *
     * @param {string} _hook Hook name
     * @param {function} _fun Callback
     * @return {CommonApi} self
     */
    $on: function(_hook, _fun) {
      var hooks = (this.$$cb || (this.$$cb = {}))[_hook] || (this.$$cb[_hook] = []);
      hooks.push(_fun);
      return this;
    },

    /**
     * @memberof CommonApi#
     *
     * @description Registers hooks to be used only inside the given function (decorated context).
     *
     * ```javascript
     * // special fetch method that sends a special token header.
     * restmod.mixin({
     *   $fetchWithToken: function(_token) {
     *     return this.$decorate({
     *       'before-fetch': function(_req) {
     *         _req.headers = _req.headers || {};
     *         _req.headers['Token'] = _token;
     *       }
     *     ), function() {
     *       return this.$fetch();
     *     })
     *   }
     * });
     * ```
     *
     * @param {object|function} _hooks Hook mapping object or hook execution method.
     * @param {function} _fun Function to be executed in with decorated context, this function is executed in the callee object context.
     * @return {CommonApi} self
     */
    $decorate: function(_hooks, _fun, _args) {

      var oldDispatcher = this.$$dsp;

      // set new dispatcher
      this.$$dsp = (typeof _hooks === 'function' || !_hooks) ? _hooks : function(_hook, _args, _ctx) {
        if(oldDispatcher) oldDispatcher.apply(null, arguments);
        var extraCb = _hooks[_hook];
        if(extraCb) extraCb.apply(_ctx, _args || EMPTY_ARRAY);
      };

      try {
        return _fun.apply(this, _args);
      } finally {
        // reset dispatcher with old value
        this.$$dsp = oldDispatcher;
      }
    },

    /**
     * @memberof CommonApi#
     *
     * @description Retrieves the current object's event dispatcher function.
     *
     * This method can be used in conjuction with `$decorate` to provide a consistent hook context
     * during async operations. This is important when building extensions that want to support the
     * contextual hook system in asynchronic operations.
     *
     * For more information aboout contextual hooks, see the {@link CommonApi#decorate} documentation.
     *
     * Usage:
     *
     * ```javascript
     * restmod.mixin({
     *   $saveAndTrack: function() {
     *     var dsp = this.$dispatcher(), // capture the current dispatcher function.
     *         self = this;
     *     this.$save().$then(function() {
     *       this.$send({ path: '/traces', data: 'ble' }, function() {
     *         this.$decorate(dsp, function() {
     *           // the event is dispatched using the dispatcher function available when $saveAndTrack was called.
     *           this.$dispatch('trace-stored');
     *         });
     *       });
     *     });
     *   }
     * })
     * ```
     *
     * @return {function} Dispatcher evaluator
     */
    $dispatcher: function() {
      return this.$$dsp;
    },

    // Promise API

    /**
     * @memberof CommonApi#
     *
     * @description Returns this object last promise.
     *
     * If promise does not exist, then a new one is generated that resolves to the object itsef. The
     * new promise is not set as the current object promise, for that use `$then`.
     *
     * Usage:
     *
     * ```javascript
     * col.$fetch().$asPromise();
     * ```
     *
     * @return {promise} $q promise
     */
    $asPromise: function() {
      var _this = this;
      return this.$promise ? this.$promise.then(
        function() { return _this; },
        function() { return $q.reject(_this); }
      ) : $q.when(this);
    },

    /**
     * @memberof CommonApi#
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
     * @return {CommonApi} self
     */
    $then: function(_success, _error) {

      if(!this.$promise) {
        this.$promise = $q.when(wrapPromise(this, _success)(this));
      } else {
        this.$promise = this.$promise.then(
          _success ? wrapPromise(this, _success) : _success,
          _error ? wrapPromise(this, _error) : _error
        );
      }

      return this;
    },

    /**
     * @memberof CommonApi#
     *
     * @description Promise chaining method, similar to then but executes same callback in success or error.
     *
     * Usage:
     *
     * ```javascript
     * col.$fetch().$always(function() { });
     * ```
     *
     * @param {function} _fun success/error callback
     * @return {CommonApi} self
     */
    $always: function(_fun) {
      return this.$then(_fun, _fun);
    },

    /**
     * @memberof CommonApi#
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
     * @return {CommonApi} self
     */
    $finally: function(_cb) {
      this.$promise = this.$promise['finally'](wrapPromise(this, _cb));
      return this;
    },

    // Communication API

    /**
     * @memberof CommonApi#
     *
     * @description Low level communication method, wraps the $http api.
     *
     * * You can access last request promise using the `$asPromise` method.
     * * Pending requests will be available at the $pending property (array).
     * * Current request execution status can be queried using the $status property (current request, not last).
     * * The $status property refers to the current request inside $send `_success` and `_error` callbacks.
     *
     * @param {object} _options $http options
     * @param {function} _success sucess callback (sync)
     * @param {function} _error error callback (sync)
     * @return {CommonApi} self
     */
    $send: function(_options, _success, _error) {

      // make sure a style base was selected for the model
      if(!this.$type.getProperty('style')) {
        $log.warn('No API style base was selected, see the Api Integration FAQ for more information on this warning');
      }

      var action = this.$$action;

      return this.$always(function() {

        this.$response = null;
        this.$status = 'pending';
        this.$dispatch('before-request', [_options]);

        return $http(_options).then(wrapPromise(this, function() {
          if(action && action.canceled) {
            // if request was canceled during request, ignore post request actions.
            this.$status =  'canceled';
          } else {
            this.$status = 'ok';
            this.$response = this.$last;
            this.$dispatch('after-request', [this.$last]);
            if(_success) _success.call(this, this.$last);
          }
        }), wrapPromise(this, function() {
          if(action && action.canceled) {
            // if request was canceled during request, ignore error handling
            this.$status = 'canceled';
          } else {
            this.$status = 'error';
            this.$response = this.$last;

            // IDEA: Consider flushing pending request in case of an error. Also continue ignoring requests
            // until the error flag is reset by user.

            this.$dispatch('after-request-error', [this.$last]);
            if(_error) _error.call(this, this.$last);
            return $q.reject(this); // TODO: this will step over any promise generated in _error!!
          }
        }));
      });
    },

    // Actions API

    /**
     * @memberof CommonApi#
     *
     * @description Registers a new action to be executed in the promise queue.
     *
     * Registered pending actions can be canceled using `$cancel`
     *
     * `$cancel` will also cancel any ongoing call to `$send` (will not abort it yet though...)
     *
     * @return {CommonApi} self
     */
    $action: function(_fun) {
      var status = {
        canceled: false
      }, pending = this.$pending || (this.$pending = []);

      pending.push(status);

      return this.$always(function() {
        var oldAction = this.$$action;
        try {
          if(!status.canceled) {
            this.$$action = status;
            return _fun.call(this);
          } else {
            return $q.reject(this);
          }
        } finally {
          // restore object state and pending actions
          this.$$action = oldAction;
        }
      }).$finally(function() {
        // after action and related async code finishes, remove status from pending list
        pending.splice(pending.indexOf(status), 1);
      });
    },

    /**
     * @memberof CommonApi#
     *
     * @description Cancels all pending actions registered with $action.
     *
     * @return {CommonApi} self
     */
    $cancel: function() {
      // cancel every pending request.
      if(this.$pending) {
        angular.forEach(this.$pending, function(_status) {
          _status.canceled = true;
        });
      }

      return this;
    },

    /**
     * @memberof CommonApi#
     *
     * @description Returns true if object has queued actions
     *
     * @return {Boolean} Object request pending status.
     */
    $hasPendingActions: function() {
      var pendingCount = 0;

      if(this.$pending) {
        angular.forEach(this.$pending, function(_status) {
          if(!_status.canceled) pendingCount++;
        });
      }

      return pendingCount > 0;
    }
  };

  return CommonApi;

}]);
RMModule.factory('RMExtendedApi', ['$q', 'RMPackerCache', function($q, packerCache) {

  /**
   * @class ExtendedApi
   *
   * @description
   *
   * Provides a common framework **on top** of the {@link RecordApi} and {@link CollectionApi}.
   *
   * @property {boolean} $resolved The collection resolve status, is undefined on intialization
   */
  return {

    // override decode to detect resolution of resource
    $decode: function(_raw, _mask) {
      if(this.$resolved === false && this.$clear) this.$clear(); // clear if not resolved.
      this.$super(_raw, _mask);
      this.$resolved = true;
      return this;
    },

    /// Misc common methods

    /**
     * @memberof ExtendedApi#
     *
     * @description
     *
     * Unpacks and decode raw data from a server generated structure.
     *
     * ATTENTION: do not override this method to change the object wrapping strategy,
     * instead, override the static {@link Model.$unpack} method.
     *
     * @param  {mixed} _raw Raw server data
     * @param  {string} _mask 'CRU' mask
     * @return {ExtendedApi} this
     */
    $unwrap: function(_raw, _mask) {
      try {
        packerCache.prepare();
        _raw = this.$type.unpack(this, _raw);
        return this.$decode(_raw, _mask);
      } finally {
        packerCache.clear();
      }
    },

    /**
     * @memberof ExtendedApi#
     *
     * @description
     *
     * Encode and packs object into a server compatible structure that can be used for PUT/POST operations.
     *
     * ATTENTION: do not override this method to change the object wrapping strategy,
     * instead, override the static {@link Model.$pack} method.
     *
     * @param  {string} _mask 'CRU' mask
     * @return {string} raw data
     */
    $wrap: function(_mask) {
      var raw = this.$encode(_mask);
      raw = this.$type.pack(this, raw);
      return raw;
    },

    /**
     * @memberof ExtendedApi#
     *
     * @description Resets the resource's $resolved status.
     *
     * After being reset, calls to `$resolve` will execute a new $fetch.
     *
     * Also, if reset, resource will be cleared on new data.
     *
     * @return {ExtendedApi} self
     */
    $reset: function() {
      // cancel outside promise chain
      // TODO: find a way of only ignoring requests that will lead to resolution, maybe using action metadata
      return this.$cancel().$action(function() {
        this.$resolved = false;
      });
    },

    /**
     * @memberof ExtendedApi#
     *
     * @description Resolves the resource's contents.
     *
     * If already resolved then this method will return a resolved promise, if not then
     * it will initiate a `$fetch` operation and return the operation promise.
     *
     * This method will trigger a `before-resolve` event before checking the resolve status.
     *
     * @param  {object} _params `$fetch` params
     * @return {promise} Promise that resolves to the resource.
     */
    $resolve: function(_params) {
      return this.$action(function() { // chain resolution in request promise chain
        this.$dispatch('before-resolve', []);
        if(!this.$resolved) this.$fetch(_params);
      });
    },

    /**
     * @memberof ExtendedApi#
     *
     * @description Resets and fetches the resource contents.
     *
     * @param  {object} _params `$fetch` params
     * @return {ExtendedApi} self
     */
    $refresh: function(_params) {
      return this.$reset().$fetch(_params);
    }
  };

}]);
RMModule.factory('RMRecordApi', ['RMUtils', function(Utils) {

  /**
   * @class RelationScope
   *
   * @description
   *
   * Special scope a record provides to resources related via hasMany or hasOne relation.
   */
  var RelationScope = function(_scope, _target, _partial) {
    this.$scope = _scope;
    this.$target = _target;
    this.$partial = Utils.cleanUrl(_partial);
  };

  RelationScope.prototype = {

    $nestedUrl: function() {
      return Utils.joinUrl(this.$scope.$url(), this.$partial);
    },

    // url is nested for collections and nested records
    $urlFor: function(_resource) {
      if(_resource.$isCollection || this.$target.isNested()) {
        return this.$nestedUrl();
      } else {
        return this.$target.$urlFor(_resource);
      }
    },

    // a record's fetch url is always nested
    $fetchUrlFor: function(/* _resource */) {
      return this.$nestedUrl();
    },

    // create is not posible in nested members
    $createUrlFor: function() {
      return null;
    }
  };

  /**
   * @class RecordApi
   * @extends CommonApi
   *
   * @property {object} $scope The record's scope (see {@link ScopeApi})
   * @property {mixed} $pk The record's primary key
   *
   * @description
   *
   * Provides record synchronization and manipulation methods. This is the base API for every restmod record.
   *
   * TODO: Talk about the object lifecycle.
   *
   * ### Object lifecycle hooks
   *
   * For `$fetch`:
   *
   * * before-fetch
   * * before-request
   * * after-request[-error]
   * * after-feed (only called if no errors)
   * * after-fetch[-error]
   *
   * For `$save` when creating:
   *
   * * before-render
   * * before-save
   * * before-create
   * * before-request
   * * after-request[-error]
   * * after-feed (only called if no errors)
   * * after-create[-error]
   * * after-save[-error]
   *
   * For `$save` when updating:
   *
   * * before-render
   * * before-save
   * * before-update
   * * before-request
   * * after-request[-error]
   * * after-feed (only called if no errors)
   * * after-update[-error]
   * * after-save[-error]
   *
   * For `$destroy`:
   *
   * * before-destroy
   * * before-request
   * * after-request[-error]
   * * after-destroy[-error]
   *
   * @property {mixed} $pk The record primary key
   * @property {object} $scope The collection scope (hierarchical scope, not angular scope)
   */
	return {

    /**
     * @memberof RecordApi#
     *
     * @description Called by record constructor on initialization.
     *
     * Note: Is better to add a hook to after-init than overriding this method.
     */
    $initialize: function() {
      // apply defaults
      this.$super();

      // after initialization hook
      // TODO: put this on $new so it can use stacked DSP?
      this.$dispatch('after-init');
    },

    /**
     * @memberof RecordApi#
     *
     * @description Called the resource's scope $urlFor method to build the url for the record using the proper scope.
     *
     * By default the resource partial url is just its `$pk` property. This can be overriden to provide other routing approaches.
     *
     * @return {string} The resource partial url
     */
    $buildUrl: function(_scope) {
      return (this.$pk === undefined || this.$pk === null) ? null : Utils.joinUrl(_scope.$url(), this.$pk + '');
    },

    /**
     * @memberof RecordApi#
     *
     * @description Default item child scope factory.
     *
     * By default, no create url is provided and the update/destroy url providers
     * attempt to first use the unscoped resource url.
     *
     * // TODO: create special api to hold scope (so it is not necessary to recreate the whole object every time.)
     *
     * @param {mixed} _for Scope target type, accepts any model class.
     * @param {string} _partial Partial route.
     * @return {RelationScope} New scope.
     */
    $buildScope: function(_for, _partial) {
      if(_for.$buildOwnScope) {
        // TODO
      } else {
        return new RelationScope(this, _for, _partial);
      }
    },

    /**
     * @memberof RecordApi#
     *
     * @description Iterates over the object non-private properties
     *
     * @param {function} _fun Function to call for each
     * @return {RecordApi} self
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
     * @memberof RecordApi#
     *
     * @description Feed raw data to this instance.
     *
     * @param {object} _raw Raw data to be fed
     * @param {string} _mask 'CRU' mask
     * @return {RecordApi} this
     */
    $decode: function(_raw, _mask) {
      // IDEA: let user override serializer
      this.$type.decode(this, _raw, _mask || Utils.READ_MASK);
      if(this.$pk === undefined || this.$pk === null) this.$pk = this.$type.inferKey(_raw); // TODO: warn if key changes
      this.$dispatch('after-feed', [_raw]);
      return this;
    },

    /**
     * @memberof RecordApi#
     *
     * @description Generate data to be sent to the server when creating/updating the resource.
     *
     * @param {string} _mask 'CRU' mask
     * @return {string} raw data
     */
    $encode: function(_mask) {
      var raw = this.$type.encode(this, _mask || Utils.CREATE_MASK);
      this.$dispatch('before-render', [raw]);
      return raw;
    },

    /**
     * @memberof RecordApi#
     *
     * @description Begin a server request for updated resource data.
     *
     * The request's promise can be accessed using the `$asPromise` method.
     *
     * @param {object} _params Optional list of params to be passed to object request.
     * @return {RecordApi} this
     */
    $fetch: function(_params) {
      return this.$action(function() {
        var url = this.$url('fetch');
        Utils.assert(!!url, 'Cant $fetch if resource is not bound');

        var request = { method: 'GET', url: url, params: _params };

        this.$dispatch('before-fetch', [request]);
        this.$send(request, function(_response) {
          this.$unwrap(_response.data);
          this.$dispatch('after-fetch', [_response]);
        }, function(_response) {
          this.$dispatch('after-fetch-error', [_response]);
        });
      });
    },

    /**
     * @memberof RecordApi#
     *
     * @description Copyies another object's non-private properties.
     *
     * This method runs inside the promise chain, so calling
     *
     * ```javascript
     * Bike.$find(1).$extend({ size: "L" }).$save();
     * ```
     * Will first fetch the bike data and after it is loaded the new size will be applied and then the
     * updated model saved.
     *
     * @param {object} _other Object to merge.
     * @return {RecordApi} self
     */
    $extend: function(_other) {
      return this.$action(function() {
        for(var tmp in _other) {
          if (_other.hasOwnProperty(tmp) && tmp[0] !== '$') {
            this[tmp] = _other[tmp];
          }
        }
      });
    },

    /**
     * @memberof RecordApi#
     *
     * @description Shortcut method used to extend and save a model.
     *
     * This method will not force a PUT, if object is new `$update` will attempt to POST.
     *
     * @param {object} _other Data to change
     * @return {RecordApi} self
     */
    $update: function(_other) {
      return this.$extend(_other).$save();
    },

    /**
     * @memberof RecordApi#
     *
     * @description Begin a server request to create/update/patch resource.
     *
     * A patch is only executed if model is identified and a patch property list is given. It is posible to
     * change the method used for PATCH operations by setting the `patchMethod` configuration.
     *
     * If resource is new and it belongs to a collection and it hasnt been revealed, then it will be revealed.
     *
     * The request's promise can be accessed using the `$asPromise` method.
     *
     * @param {array} _patch Optional list of properties to send in update operation.
     * @return {RecordApi} this
     */
    $save: function(_patch) {
      return this.$action(function() {
        var url = this.$url('update'), request;

        if(url) {

          // If bound, update
          if(_patch) {
            request = {
              method: this.$type.getProperty('patchMethod', 'PATCH'), // allow user to override patch method
              url: url,
              // Use special mask for patches, mask everything that is not in the patch list.
              data: this.$wrap(function(_name) { return _patch.indexOf(_name) === -1; })
            };
          } else {
            request = { method: 'PUT', url: url, data: this.$wrap(Utils.UPDATE_MASK) };
          }

          this
            .$dispatch('before-update', [request, !!_patch])
            .$dispatch('before-save', [request])
            .$send(request, function(_response) {
              this
                .$unwrap(_response.data)
                .$dispatch('after-update', [_response, !!_patch])
                .$dispatch('after-save', [_response]);
            }, function(_response) {
              this
                .$dispatch('after-update-error', [_response, !!_patch])
                .$dispatch('after-save-error', [_response]);
            });
        } else {
          // If not bound create.
          url = this.$url('create') || this.$scope.$url();
          Utils.assert(!!url, 'Cant $create if parent scope is not bound');

          request = { method: 'POST', url: url, data: this.$wrap(Utils.CREATE_MASK) };
          this
            .$dispatch('before-save', [request])
            .$dispatch('before-create', [request])
            .$send(request, function(_response) {
              this.$unwrap(_response.data);

              // reveal item (if not yet positioned)
              if(this.$scope.$isCollection && this.$position === undefined && !this.$preventReveal) {
                this.$scope.$add(this, this.$revealAt);
              }

              this
                .$dispatch('after-create', [_response])
                .$dispatch('after-save', [_response]);
            }, function(_response) {
              this
                .$dispatch('after-create-error', [_response])
                .$dispatch('after-save-error', [_response]);
            });
        }
      });
    },

    /**
     * @memberof RecordApi#
     *
     * @description Begin a server request to destroy the resource.
     *
     * The request's promise can be accessed using the `$asPromise` method.
     *
     * @return {RecordApi} this
     */
    $destroy: function() {
      return this.$action(function() {
        var url = this.$url('destroy');
        if(url)
        {
          var request = { method: 'DELETE', url: url };

          this
            .$dispatch('before-destroy', [request])
            .$send(request, function(_response) {

              // remove from scope
              if(this.$scope.$remove) {
                this.$scope.$remove(this);
              }

              this.$dispatch('after-destroy', [_response]);
            }, function(_response) {
              this.$dispatch('after-destroy-error', [_response]);
            });
        }
        else
        {
          // If not yet bound, just remove from parent
          if(this.$scope.$remove) this.$scope.$remove(this);
        }
      });
    },

    // Collection related methods.

    /**
     * @memberof RecordApi#
     *
     * @description Changes the location of the object in the bound collection.
     *
     * If object hasn't been revealed, then this method will change the index where object will be revealed at.
     *
     * @param  {integer} _to New object position (index)
     * @return {RecordApi} this
     */
    $moveTo: function(_to) {
      if(this.$position !== undefined) {
        // TODO: move item to given index.
        // TODO: callback
      } else {
        this.$revealAt = _to;
      }
      return this;
    },

    /**
     * @memberof RecordApi#
     *
     * @description Reveal in collection
     *
     * If instance is bound to a collection and it hasnt been revealed (because it's new and hasn't been saved),
     * then calling this method without parameters will force the object to be added to the collection.
     *
     * If this method is called with **_show** set to `false`, then the object wont be revealed by a save operation.
     *
     * @param  {boolean} _show Whether to reveal inmediatelly or prevent automatic reveal.
     * @return {RecordApi} this
     */
    $reveal: function(_show) {
      if(_show === undefined || _show) {
        this.$scope.$add(this, this.$revealAt);
      } else {
        this.$preventReveal = true;
      }
      return this;
    }
  };

}]);
RMModule.factory('RMScopeApi', ['RMUtils', function(Utils) {

  /**
   * @class ScopeApi
   *
   * @description Common behaviour for record scopes.
   *
   * Record scopes are starting points for record operations (like base type or a collection)
   *
   * TODO: Talk about record building here
   */
  return {

    /**
     * @memberof ScopeApi#
     *
     * @description provides urls for scope's resources.
     *
     * @param {mixed} _resource The target resource.
     * @return {string|null} The url or nill if resource does not meet the url requirements.
     */
    $urlFor: function(_resource) {
      // force item unscoping if model is not nested (maybe make this optional)
      var scope = this.$type.isNested() ? this : this.$type;
      return typeof _resource.$buildUrl === 'function' ? _resource.$buildUrl(scope) : scope.$url();
    },

    /**
     * @memberof ScopeApi#
     *
     * @description Builds a new instance of this model, bound to this instance scope, sets its primary key.
     *
     * @param {mixed} _pk object private key
     * @param {object} _scope scope override (optional)
     * @return {RecordApi} New model instance
     */
    $new: function(_pk, _scope) {
      return this.$super(_pk, _scope);
    },

    /**
     * @memberof ScopeApi#
     *
     * @description Builds a new instance of this model, does not assign a pk to the created object.
     *
     * ATTENTION: item will not show in collection until `$save` is called. To reveal item before than call `$reveal`.
     *
     * @param  {object} _init Initial values
     * @return {RecordApi} single record
     */
    $build: function(_init) {
      return this.$new().$extend(_init);
    },

    /**
     * @memberof ScopeApi#
     *
     * @description Builds a new instance of this model using undecoded data.
     *
     * ATTENTION: does not automatically reveal item in collection, chain a call to $reveal to do so.
     *
     * @param  {object} _raw Undecoded data
     * @return {RecordApi} single record
     */
    $buildRaw: function(_raw, _mask) {
      var obj = this.$new(this.$type.inferKey(_raw));
      obj.$decode(_raw, _mask);
      return obj;
    },

    /**
     * @memberof ScopeApi#
     *
     * @description Attempts to resolve a resource using provided private key.
     *
     * @param {mixed} _pk Private key
     * @param {object} _params Additional query parameters
     * @return {RecordApi} single record
     */
    $find: function(_pk, _params) {
      return this.$new(_pk).$resolve(_params);
    },

    /**
     * @memberof ScopeApi#
     *
     * @description Builds and saves a new instance of this model
     *
     * @param  {object} _attr Data to be saved
     * @return {RecordApi} single record
     */
    $create: function(_attr) {
      return this.$build(_attr).$save();
    },

    /**
     * @memberof ScopeApi#
     *
     * @description Builds a new collection bound to this scope.
     *
     * If scope is another collection then it will inherit its parameters
     *
     * Collections are bound to an api resource.
     *
     * @param  {object} _params  Additional query string parameters
     * @param  {object} _scope  Scope override (optional)
     * @return {CollectionApi} Model Collection
     */
    $collection: function(_params, _scope) {
      return this.$super(_params, _scope);
    },

    /**
     * @memberof ScopeApi#
     *
     * @description Generates a new collection bound to this context and url and calls $fetch on it.
     *
     * @param {object} _params Collection parameters
     * @return {CollectionApi} record collection
     */
    $search: function(_params) {
      return this.$collection(_params).$fetch();
    }
  };

}]);
RMModule.factory('RMViewApi', [function() {

  /**
   * @class CollectionApi
   *
   * @extends ScopeApi
   * @extends CommonApi
   *
   * @description
   *
   * A restmod collection is an extended array type bound REST resource route.
   *
   * Every time a new restmod model is created, an associated collection type is created too.
   *
   * TODO: talk about fetch/refresh behaviour, lifecycles, collection scopes, adding/removing
   *
   * For `$fetch` on a collection:
   *
   * * before-fetch-many
   * * before-request
   * * after-request[-error]
   * * after-feed (called for every record if no errors)
   * * after-feed-many (only called if no errors)
   * * after-fetch-many[-error]
   *
   * @property {boolean} $isCollection Helper flag to separate collections from the main type
   * @property {object} $scope The collection scope (hierarchical scope, not angular scope)
   * @property {object} $params The collection query parameters
   *
   */
  var API = {

    $isCollection: true,

    /**
     * @memberof CollectionApi#
     *
     * @description Called by collection constructor on initialization.
     *
     * Note: Is better to add a hook on after-init than overriding this method.
     */
    $initialize: function() {

      this.$collection.on('after-add', function() {

      }).on('after-remove', function() {

      }).on('after-clear', function() {

      });
    },

    $reload: function() {

    }
  };

  // Proxy common collection methods to collection

  angular.forEach(['$fetch', '$create', '$new', '$build', '$buildRaw'], function(_method) {
    API[_method] = function() {
      return this.$collection[_method].apply(this.$collection, arguments);
    };
  });

  return API;

}]);
RMModule.factory('RMBuilder', ['$injector', 'inflector', '$log', 'RMUtils', function($injector, inflector, $log, Utils) {

  // TODO: add urlPrefix option

  var forEach = angular.forEach,
      isObject = angular.isObject,
      isArray = angular.isArray,
      isFunction = angular.isFunction,
      extend = angular.extend,
      VAR_RGX = /^[A-Z]+[A-Z_0-9]*$/;

  /**
   * @class BuilderApi
   *
   * @description
   *
   * Provides the DSL for model generation, it supports to modes of model definitions:
   *
   * ## Definition object
   *
   * This is the preferred way of describing a model behavior.
   *
   * A model description object looks like this:
   *
   * ```javascript
   * restmod.model({
   *
   *   // MODEL CONFIGURATION
   *
   *   $config: {
   *     name: 'resource',
   *     primaryKey: '_id'
   *   },
   *
   *   // ATTRIBUTE MODIFIERS AND RELATIONS
   *
   *   propWithDefault: { init: 20 },
   *   propWithDecoder: { decode: 'date', chain: true },
   *   hasManyRelation: { hasMany: 'Other' },
   *   hasOneRelation: { hasOne: 'Other' },
   *
   *   // HOOKS
   *
   *   $hooks: {
   *     'after-create': function() {
   *     }
   *   },
   *
   *   // METHODS
   *
   *   $extend: {
   *     Record: {
   *       instanceMethod: function() {
   *       }
   *     },
   *     Model: {
   *       scopeMethod: function() {
   *       }
   *     }
   *   }
   * });
   * ```
   *
   * Special model configuration variables can be set by using a `$config` block:
   *
   * ```javascript
   * restmod.model({
   *
   *   $config: {
   *     name: 'resource',
   *     primaryKey: '_id'
   *   }
   *
   *  });
   * ```
   *
   * With the exception of model configuration variables and properties starting with a special character (**@** or **~**),
   * each property in the definition object asigns a behavior to the same named property in a model's record.
   *
   * To modify a property behavior assign an object with the desired modifiers to a
   * definition property with the same name. Builtin modifiers are:
   *
   * The following built in property modifiers are provided (see each mapped-method docs for usage information):
   *
   * * `init` sets an attribute default value, see {@link BuilderApi#attrDefault}
   * * `mask` and `ignore` sets an attribute mask, see {@link BuilderApi#attrMask}
   * * `map` sets an explicit server attribute mapping, see {@link BuilderApi#attrMap}
   * * `decode` sets how an attribute is decoded after being fetch, maps to {@link BuilderApi#attrDecoder}
   * * `encode` sets how an attribute is encoded before being sent, maps to {@link BuilderApi#attrEncoder}
   * * `volatile` sets the attribute volatility, maps to {@link BuilderApi#attrVolatile}
   *
   * **For relations modifiers take a look at {@link RelationBuilderApi}**
   *
   * **For other extended bundled methods check out the {@link ExtendedBuilderApi}**
   *
   * If other kind of value (different from object or function) is passed to a definition property,
   * then it is considered to be a default value. (same as calling {@link BuilderApi#define} at a definition function)
   *
   * ```javascript
   * var Model = restmod.model('/', {
   *   im20: 20 // same as { init: 20 }
   * })
   *
   * // then say hello is available for use at model records
   * Model.$new().im20; // 20
   * ```
   *
   * To add/override methods from the record api, use the `$extend` block:
   *
   * ```javascript
   * var Model = restmod.model('/', {
   *   $extend: {
   *     sayHello: function() { alert('hello!'); }
   *   }
   * })
   *
   * // then say hello is available for use at model records
   * Model.$new().sayHello();
   * ```
   *
   * To add a static method or a collection method, you must specify the method scope: , prefix the definition key with **^**, to add it to the model collection prototype,
   * prefix it with ***** static/collection methods to the Model, prefix the definition property name with **@**
   * (same as calling {@link BuilderApi#scopeDefine} at a definition function).
   *
   * ```javascript
   * var Model = restmod.model('/', {
   *   $extend: {
   *     'Collection.count': function() { return this.length; },  // scope is set using a prefix
   *
   *     Model: {
   *       sayHello: function() { alert('hello!'); } // scope is set using a block
   *     }
   * })
   *
   * // then the following call will be valid.
   * Model.sayHello();
   * Model.$collection().count();
   * ```
   *
   * More information about method scopes can be found in {@link BuilderApi#define}
   *
   * To add hooks to the Model lifecycle events use the `$hooks` block:
   *
   * ```javascript
   * var Model = restmod.model('/', {
   *   $hooks: {
   *     'after-init': function() { alert('hello!'); }
   *   }
   * })
   *
   * // the after-init hook is called after every record initialization.
   * Model.$new(); // alerts 'hello!';
   * ```
   *
   * ## Definition function
   *
   * The definition function gives complete access to the model builder api, every model builder function described
   * in this page can be called from the definition function by referencing *this*.
   *
   * ```javascript
   * restmod.model('', function() {
   *   this.attrDefault('propWithDefault', 20)
   *       .attrAsCollection('hasManyRelation', 'ModelName')
   *       .on('after-create', function() {
   *         // do something after create.
   *       });
   * });
   * ```
   *
   */
  function Builder(_baseDsl) {

    var mappings = {
      init: ['attrDefault'],
      mask: ['attrMask'],
      ignore: ['attrMask'],
      map: ['attrMap', 'force'],
      decode: ['attrDecoder', 'param', 'chain'],
      encode: ['attrEncoder', 'param', 'chain'],
      'volatile': ['attrVolatile']
    };

    // DSL core functions.

    this.dsl = extend(_baseDsl, {

      /**
       * @memberof BuilderApi#
       *
       * @description Parses a description object, calls the proper builder method depending
       * on each property description type.
       *
       * @param {object} _description The description object
       * @return {BuilderApi} self
       */
      describe: function(_description) {
        forEach(_description, function(_desc, _attr) {
          switch(_attr.charAt(0)) {
          case '@':
            $log.warn('Usage of @ in description objects will be removed in 1.2, use a $extend block instead');
            this.define('Scope.' + _attr.substring(1), _desc); // set static method
            break;
          case '~':
            _attr = inflector.parameterize(_attr.substring(1));
            $log.warn('Usage of ~ in description objects will be removed in 1.2, use a $hooks block instead');
            this.on(_attr, _desc);
            break;
          default:
            if(_attr === '$config') { // configuration block
              for(var key in _desc) {
                if(_desc.hasOwnProperty(key)) this.setProperty(key, _desc[key]);
              }
            } else if(_attr === '$extend') { // extension block
              for(var key in _desc) {
                if(_desc.hasOwnProperty(key)) this.define(key, _desc[key]);
              }
            } else if(_attr === '$hooks') { // hooks block
              for(var key in _desc) {
                if(_desc.hasOwnProperty(key)) this.on(key, _desc[key]);
              }
            } else if(VAR_RGX.test(_attr)) {
              $log.warn('Usage of ~ in description objects will be removed in 1.2, use a $config block instead');
              _attr = inflector.camelize(_attr.toLowerCase());
              this.setProperty(_attr, _desc);
            }
            else if(isObject(_desc)) this.attribute(_attr, _desc);
            else if(isFunction(_desc)) this.define(_attr, _desc);
            else this.attrDefault(_attr, _desc);
          }
        }, this);
        return this;
      },

      /**
       * @memberof BuilderApi#
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
       * @return {BuilderApi} self
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
       * @memberof BuilderApi#
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
       * @return {BuilderApi} self
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
      }
    });
  }

  Builder.prototype = {

    // use the builder to process a mixin chain
    chain: function(_chain) {
      for(var i = 0, l = _chain.length; i < l; i++) {
        this.mixin(_chain[i]);
      }
    },

    // use the builder to process a single mixin
    mixin: function(_mix) {
      if(_mix.$$chain) {
        this.chain(_mix.$$chain);
      } else if(typeof _mix === 'string') {
        this.mixin($injector.get(_mix));
      } else if(isArray(_mix)) {
        this.chain(_mix);
      } else if(isFunction(_mix)) {
        _mix.call(this.dsl, $injector);
      } else {
        this.dsl.describe(_mix);
      }
    }
  };

  return Builder;

}]);
RMModule.factory('RMBuilderComputed', ['restmod',
  function(restmod) {
    /**
     * @class RMBuilderComputedApi
     *
     * @description
     *
     * Builder DSL extension to build computed properties.
     *
     * A computed property is a "virtual" property which is created using
     * other model properties. For example, a user has a firstName and lastName,
     * A computed property, fullName, is generated from the two.
     *
     * Adds the following property modifiers:
     * * `computed` function will be assigned as getter to Model, maps to {@link RMBuilderComputedApi#attrAsComputed}
     *
     */
    var EXT = {

      /**
       * @memberof RMBuilderComputedApi#
       *
       * @description Registers a model computed property
       *
       * @param {string}  _attr Attribute name
       * @param {function} _fn Function that returns the desired attribute value when run.
       * @return {BuilderApi} self
       */
      attrAsComputed: function(_attr, _fn) {
        this.attrComputed(_attr, _fn);
        return this;
      }
    };

    return restmod.mixin(function() {
      this.extend('attrAsComputed', EXT.attrAsComputed, ['computed']);
    });
  }
]);
RMModule.factory('RMBuilderExt', ['$injector', '$parse', 'inflector', '$log', 'restmod', function($injector, $parse, inflector, $log, restmod) {

  var bind = angular.bind,
      isFunction = angular.isFunction;

  /**
   * @class ExtendedBuilderApi
   *
   * @description
   *
   * Non-core builder extensions
   *
   * Adds the following property modifiers:
   * * `serialize` sets the encoder and decoder beaviour for an attribute, maps to {@link BuilderApi#attrSerializer}
   *
   */
  var EXT = {
    /**
     * @memberof ExtendedBuilderApi#
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
     * var BaseModel = restmod.mixin(function() {
     *   this.setUrlPrefix('/api');
     * })
     *
     * var bike = restmod.model('/bikes', BaseModel).$build({ id: 1 });
     * console.log(bike.$url()) // outputs '/api/bikes/1'
     * ```
     *
     * @param {string} _prefix url portion
     * @return {BuilderApi} self
     */
    setUrlPrefix: function(_prefix) {
      return this.setProperty('urlPrefix', _prefix);
    },

    /**
     * @memberof ExtendedBuilderApi#
     *
     * @description Changes the model's primary key.
     *
     * Primary keys are passed to scope's url methods to generate urls. The default primary key is 'id'.
     *
     * **ATTENTION** Primary keys are extracted from raw data, so _key must use raw api naming.
     *
     * @param {string|function} _key New primary key.
     * @return {BuilderApi} self
     */
    setPrimaryKey: function(_key) {
      return this.setProperty('primaryKey', _key);
    },

    /**
     * @memberof ExtendedBuilderApi#
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
     * @return {BuilderApi} self
     */
    attrSerializer: function(_name, _serializer, _opt) {
      if(typeof _serializer === 'string') {
        _serializer = $injector.get(inflector.camelize(_serializer, true) + 'Serializer');
      }

      if(isFunction(_serializer)) _serializer = _serializer(_opt);
      if(_serializer.decode) this.attrDecoder(_name, bind(_serializer, _serializer.decode));
      if(_serializer.encode) this.attrEncoder(_name, bind(_serializer, _serializer.encode));
      return this;
    },

    /// Experimental modifiers

    /**
     * @memberof ExtendedBuilderApi#
     *
     * @description Expression attributes are evaluated every time new data is fed to the model.
     *
     * @param {string}  _name Attribute name
     * @param {string} _expr Angular expression to evaluate
     * @return {BuilderApi} self
     */
    attrExpression: function(_name, _expr) {
      var filter = $parse(_expr);
      return this.on('after-feed', function() {
        this[_name] = filter(this);
      });
    }
  };

  return restmod.mixin(function() {
    this.extend('setUrlPrefix', EXT.setUrlPrefix)
        .extend('setPrimaryKey', EXT.setPrimaryKey)
        .extend('attrSerializer', EXT.attrSerializer, ['serialize']);
  });
}]);
RMModule.factory('RMBuilderRelations', ['$injector', 'inflector', '$log', 'RMUtils', 'restmod', 'RMPackerCache', function($injector, inflector, $log, Utils, restmod, packerCache) {

  // wraps a hook callback to give access to the $owner object
  function wrapHook(_fun, _owner) {
    return function() {
      var oldOwner = this.$owner;
      this.$owner = _owner;
      try {
        return _fun.apply(this, arguments);
      } finally {
        this.$owner = oldOwner;
      }
    };
  }

  // wraps a bunch of hooks
  function applyHooks(_target, _hooks, _owner) {
    for(var key in _hooks) {
      if(_hooks.hasOwnProperty(key)) {
        _target.$on(key, wrapHook(_hooks[key], _owner));
      }
    }
  }

  /**
   * @class RelationBuilderApi
   *
   * @description
   *
   * Builder DSL extension to build model relations
   *
   * Adds the following property modifiers:
   * * `hasMany` sets a one to many hierarchical relation under the attribute name, maps to {@link RelationBuilderApi#attrAsCollection}
   * * `hasOne` sets a one to one hierarchical relation under the attribute name, maps to {@link RelationBuilderApi#attrAsResource}
   * * `belongsTo` sets a one to one reference relation under the attribute name, maps to {@link RelationBuilderApi#attrAsReference}
   * * `belongsToMany` sets a one to many reference relation under the attribute name, maps to {@link RelationBuilderApi#attrAsReferenceToMany}
   *
   */
  var EXT = {
    /**
     * @memberof RelationBuilderApi#
     *
     * @description Registers a model **resources** relation
     *
     * @param {string}  _name Attribute name
     * @param {string|object} _model Other model, supports a model name or a direct reference.
     * @param {string} _url Partial url
     * @param {string} _source Inline resource alias (optional)
     * @param {string} _inverseOf Inverse property name (optional)
     * @param {object} _params Generated collection default parameters
     * @param {object} _hooks Hooks to be applied just to the generated collection
     * @return {BuilderApi} self
     */
    attrAsCollection: function(_attr, _model, _url, _source, _inverseOf, _params, _hooks) {

      var options, globalHooks; // global relation configuration

      this.attrDefault(_attr, function() {

        if(typeof _model === 'string') {
          _model = $injector.get(_model);

          // retrieve global options
          options = _model.getProperty('hasMany', {});
          globalHooks = options.hooks;

          if(_inverseOf) {
            var desc = _model.$$getDescription(_inverseOf);
            if(!desc || desc.relation !== 'belongs_to') {
              $log.warn('Must define an inverse belongsTo relation for inverseOf to work');
              _inverseOf = false; // disable the inverse if no inverse relation is found.
            }
          }
        }

        var scope = this.$buildScope(_model, _url || inflector.parameterize(_attr)), col; // TODO: name to url transformation should be a Model strategy

        // setup collection
        col = _model.$collection(_params || null, scope);
        if(globalHooks) applyHooks(col, globalHooks, this);
        if(_hooks) applyHooks(col, _hooks, this);
        col.$dispatch('after-has-many-init');

        // set inverse property if required.
        if(_inverseOf) {
          var self = this;
          col.$on('after-add', function(_obj) {
            _obj[_inverseOf] = self;
          });
        }

        return col;
      });

      if(_source || _url) this.attrMap(_attr, _source || _url);

      this.attrDecoder(_attr, function(_raw) {
            this[_attr].$reset().$decode(_raw);
          })
          .attrMask(_attr, Utils.WRITE_MASK)
          .attrMeta(_attr, { relation: 'has_many' });

      return this;
    },

    /**
     * @memberof RelationBuilderApi#
     *
     * @description Registers a model **resource** relation
     *
     * @param {string}  _name Attribute name
     * @param {string|object} _model Other model, supports a model name or a direct reference.
     * @param {string} _url Partial url (optional)
     * @param {string} _source Inline resource alias (optional)
     * @param {string} _inverseOf Inverse property name (optional)
     * @param {object} _hooks Hooks to be applied just to the instantiated record
     * @return {BuilderApi} self
     */
    attrAsResource: function(_attr, _model, _url, _source, _inverseOf, _hooks) {

      var options, globalHooks; // global relation configuration

      this.attrDefault(_attr, function() {

        if(typeof _model === 'string') {
          _model = $injector.get(_model);

          // retrieve global options
          options = _model.getProperty('hasOne', {});
          globalHooks = options.hooks;

          if(_inverseOf) {
            var desc = _model.$$getDescription(_inverseOf);
            if(!desc || desc.relation !== 'belongs_to') {
              $log.warn('Must define an inverse belongsTo relation for inverseOf to work');
              _inverseOf = false; // disable the inverse if no inverse relation is found.
            }
          }
        }

        var scope = this.$buildScope(_model, _url || inflector.parameterize(_attr)), inst;

        // setup record
        inst = _model.$new(null, scope);
        if(globalHooks) applyHooks(inst, globalHooks, this);
        if(_hooks) applyHooks(inst, _hooks, this);
        inst.$dispatch('after-has-one-init');

        if(_inverseOf) {
          inst[_inverseOf] = this;
        }

        return inst;
      });

      if(_source || _url) this.attrMap(_attr, _source || _url);

      this.attrDecoder(_attr, function(_raw) {
            this[_attr].$decode(_raw);
          })
          .attrMask(_attr, Utils.WRITE_MASK)
          .attrMeta(_attr, { relation: 'has_one' });

      return this;
    },

    /**
     * @memberof RelationBuilderApi#
     *
     * @description Registers a model **reference** relation.
     *
     * A reference relation expects the host object to provide the primary key of the referenced object or the referenced object itself (including its key).
     *
     * For example, given the following resource structure with a foreign key:
     *
     * ```json
     * {
     *   user_id: 20
     * }
     * ```
     *
     * Or this other structure with inlined data:
     *
     * ```json
     * {
     *   user: {
     *     id: 30,
     *     name: 'Steve'
     *   }
     * }
     * ```
     *
     * You should define the following model:
     *
     * ```javascript
     * restmod.model('/bikes', {
     *   user: { belongsTo: 'User' } // works for both cases detailed above
     * })
     * ```
     *
     * The object generated by the relation is not scoped to the host object, but to it's base class instead (not like hasOne),
     * so the type should not be nested.
     *
     * Its also posible to override the **foreign key name**.
     *
     * When a object containing a belongsTo reference is encoded for a server request, only the primary key value is sent using the
     * same **foreign key name** that was using on decoding. (`user_id` in the above example).
     *
     * @param {string}  _name Attribute name
     * @param {string|object} _model Other model, supports a model name or a direct reference.
     * @param {string} _key foreign key property name (optional, defaults to _attr + '_id').
     * @param {bool} _prefetch if set to true, $fetch will be automatically called on relation object load.
     * @return {BuilderApi} self
     */
    attrAsReference: function(_attr, _model, _key, _prefetch) {

      this.attrDefault(_attr, null)
          .attrMask(_attr, Utils.WRITE_MASK)
          .attrMeta(_attr, { relation: 'belongs_to' });

      function loadModel() {
        if(typeof _model === 'string') {
          _model = $injector.get(_model);
        }
      }

      // TODO: the following code assumes that attribute is at root level! (when uses this[_attr] or this[_attr + 'Id'])

      // inline data handling
      this.attrDecoder(_attr, function(_raw) {
        if(_raw === null) return null;
        loadModel();
        if(!this[_attr] || this[_attr].$pk !== _model.inferKey(_raw)) {
          this[_attr] = _model.$buildRaw(_raw);
        } else {
          this[_attr].$decode(_raw);
        }
      });

      // foreign key handling
      if(_key !== false) {
        this.attrMap(_attr + 'Id', _key || '*', true) // set a forced mapping to always generate key
            .attrDecoder(_attr + 'Id', function(_value) {
              if(_value === undefined) return;
              if(!this[_attr] || this[_attr].$pk !== _value) {
                if(_value !== null && _value !== false) {
                  loadModel();
                  this[_attr] = packerCache.resolve(_model.$new(_value)); // resolve inmediatelly if cached
                  if(_prefetch) this[_attr].$fetch();
                } else {
                  this[_attr] = null;
                }
              }
            })
            .attrEncoder(_attr + 'Id', function() {
              return this[_attr] ? this[_attr].$pk : null;
            });
      }

      return this;
    },

    /**
     * @memberof RelationBuilderApi#
     *
     * @description Registers a model **reference** relation.
     *
     * A reference relation expects the host object to provide the primary key of the referenced objects or the referenced objects themselves (including its key).
     *
     * For example, given the following resource structure with a foreign key array:
     *
     * ```json
     * {
     *   users_ids: [20, 30]
     * }
     * ```
     *
     * Or this other structure with inlined data:
     *
     * ```json
     * {
     *   users: [{
     *     id: 20,
     *     name: 'Steve'
     *   },{
     *     id: 30,
     *     name: 'Pili'
     *   }]
     * }
     * ```
     *
     * You should define the following model:
     *
     * ```javascript
     * restmod.model('/bikes', {
     *   users: { belongsToMany: 'User' } // works for both cases detailed above
     * })
     * ```
     *
     * The object generated by the relation is not scoped to the host object, but to it's base class instead (unlike hasMany),
     * so the referenced type should not be nested.
     *
     * When a object containing a belongsToMany reference is encoded for a server request, only the primary key value is sent for each object.
     *
     * @param {string}  _name Attribute name
     * @param {string|object} _model Other model, supports a model name or a direct reference.
     * @param {string} _keys Server name for the property that holds the referenced keys in response and request.
     * @return {BuilderApi} self
     */
    attrAsReferenceToMany: function(_attr, _model, _keys) {

      this.attrDefault(_attr, function() { return []; })
          .attrMask(_attr, Utils.WRITE_MASK)
          .attrMeta(_attr, { relation: 'belongs_to_many' });

      // TODO: the following code assumes that attribute is at root level! (when uses this[_attr])

      function loadModel() {
        if(typeof _model === 'string') {
          _model = $injector.get(_model);
        }
      }

      function processInbound(_raw, _ref) {
        loadModel();
        _ref.length = 0;
        // TODO: reuse objects that do not change (compare $pks)
        for(var i = 0, l = _raw.length; i < l; i++) {
          if(typeof _raw[i] === 'object') {
            _ref.push(_model.$buildRaw(_raw[i]));
          } else {
            _ref.push(packerCache.resolve(_model.$new(_raw[i])));
          }
        }
      }

      // inline data handling
      this.attrDecoder(_attr, function(_raw) {
        // TODO: if _keys == _attr then inbound data will be processed twice!
        if(_raw) processInbound(_raw, this[_attr]);
      });

      // foreign key handling
      if(_keys !== false) {
        var attrIds = inflector.singularize(_attr) + 'Ids';
        this.attrMap(attrIds, _keys || '*', true)
            .attrDecoder(attrIds, function(_raw) {
              if(_raw) processInbound(_raw, this[_attr]);
            })
            .attrEncoder(attrIds, function() {
              var result = [], others = this[_attr];
              for(var i = 0, l = others.length; i < l; i++) {
                result.push(others[i].$pk);
              }
              return result;
            });
      }

      return this;
    }
  };

  return restmod.mixin(function() {
    this.extend('attrAsCollection', EXT.attrAsCollection, ['hasMany', 'path', 'source', 'inverseOf', 'params', 'hooks']) // TODO: rename source to map, but disable attrMap if map is used here...
        .extend('attrAsResource', EXT.attrAsResource, ['hasOne', 'path', 'source', 'inverseOf', 'hooks'])
        .extend('attrAsReference', EXT.attrAsReference, ['belongsTo', 'key', 'prefetch'])
        .extend('attrAsReferenceToMany', EXT.attrAsReferenceToMany, ['belongsToMany', 'keys']);
  });

}]);
RMModule.factory('RMModelFactory', ['$injector', 'inflector', 'RMUtils', 'RMScopeApi', 'RMCommonApi', 'RMRecordApi', 'RMCollectionApi', 'RMExtendedApi', 'RMSerializer', 'RMBuilder',
  function($injector, inflector, Utils, ScopeApi, CommonApi, RecordApi, CollectionApi, ExtendedApi, Serializer, Builder) {

  var NAME_RGX = /(.*?)([^\/]+)\/?$/,
      extend = Utils.extendOverriden;

  return function(_baseUrl, _baseChain) {

    // IDEA: make constructor inaccessible, use separate type for records?
    // * Will ensure proper usage.
    // * Will lose type checking
    function Model(_scope, _pk) {
      this.$scope = _scope || Model;
      this.$pk = _pk;
      this.$initialize();
    }

    _baseUrl = Utils.cleanUrl(_baseUrl);

    var config = {
        primaryKey: 'id',
        urlPrefix: null
      },
      serializer = new Serializer(Model),
      defaults = [],                    // attribute defaults as an array of [key, value]
      computes = [],                    // computed attributes
      meta = {},                        // atribute metadata
      hooks = {},
      builder;                          // the model builder

    // make sure the resource name and plural name are available if posible:

    if(!config.name && _baseUrl) {
      config.name = inflector.singularize(_baseUrl.replace(NAME_RGX, '$2'));
    }

    if(!config.plural && config.name) {
      config.plural = inflector.pluralize(config.name);
    }

    var Collection = Utils.buildArrayType(),
        Dummy = function(_asCollection) {
          this.$isCollection = _asCollection;
          this.$initialize();
        };

    // Collection factory (since a constructor cant be provided...)
    function newCollection(_scope, _params) {
      var col = new Collection();
      col.$scope = _scope;
      col.$params = _params;
      col.$initialize();
      return col;
    }

    ///// Setup static api

    /**
     * @class StaticApi
     * @extends ScopeApi
     * @extends CommonApi
     *
     * @description
     *
     * The restmod type API, every generated restmod model type exposes this API.
     *
     * @property {object} $type Reference to the type itself, for compatibility with the {@link ScopeApi}
     *
     * #### About object creation
     *
     * Direct construction of object instances using `new` is not recommended. A collection of
     * static methods are available to generate new instances of a model, for more information
     * read the {@link ModelCollection} documentation.
     */
    extend(Model, {

      // gets an attribute description (metadata)
      $$getDescription: function(_attribute) {
        return meta[_attribute];
      },

      // definition chain
      $$chain: [],

      // keep a reference to type itself for scope api compatibility
      $type: Model,

      // creates a new model bound by default to the static scope
      $new: function(_pk, _scope) {
        return new Model(_scope || Model, _pk);
      },

      // creates a new collection bound by default to the static scope
      $collection: function(_params, _scope) {
        return newCollection(_scope || Model, _params);
      },

      // gets scope url
      $url: function() {
        return config.urlPrefix ? Utils.joinUrl(config.urlPrefix, _baseUrl) : _baseUrl;
      },

      // bubbles events comming from related resources
      $dispatch: function(_hook, _args, _ctx) {
        var cbs = hooks[_hook], i, cb;
        if(cbs) {
          for(i = 0; !!(cb = cbs[i]); i++) {
            cb.apply(_ctx || this, _args || []);
          }
        }
        return this;
      },

      /**
       * @memberof StaticApi#
       *
       * @description
       *
       * Extracts the primary key from raw record data.
       *
       * Uses the key configured in the PRIMARY_KEY variable or 'id' by default.
       *
       * Some considerations:
       * * This method can be overriden to handle other scenarios.
       * * This method should not change the raw data passed to it.
       * * The primary key value extracted by this method should be comparable using the == operator.
       *
       * @param  {string} _rawData Raw object data (before it goes into decode)
       * @return {mixed} The primary key value.
       */
      inferKey: function(_rawData) {
        if(!_rawData || typeof _rawData[config.primaryKey] === 'undefined') return null;
        return _rawData[config.primaryKey];
      },

      /**
       * @memberof StaticApi#
       *
       * @description
       *
       * Gets a model's internal property value.
       *
       * Some builtin properties:
       * * url
       * * urlPrefix
       * * primaryKey
       *
       * @param  {string} _key Property name
       * @param  {mixed} _default Value to return if property is not defined
       * @return {mixed} value
       */
      getProperty: function(_key, _default) {
        var val = config[_key];
        return val !== undefined ? val : _default;
      },

      /**
       * @memberof StaticApi#
       *
       * @description Returns true if model is nested.
       *
       * An nested model can only be used as a nested resource (using hasMany or hasOne relations)
       *
       * @return {boolean} true if model is nested.
       */
      isNested: function() {
        return !_baseUrl;
      },

      /**
       * @memberof StaticApi#
       *
       * @description Returns a resource bound to a given url, with no parent scope.
       *
       * This can be used to create singleton resources:
       *
       * ```javascript
       * module('BikeShop', []).factory('Status', function(restmod) {
       *   return restmod.model(null).$single('/api/status');
       * };)
       * ```
       *
       * @param {string} _url Url to bound resource to.
       * @return {Model} new resource instance.
       */
      single: function(_url) {
        return new Model({
          $urlFor: function() {
            return config.urlPrefix ? Utils.joinUrl(config.urlPrefix, _url) : _url;
          }
        }, '');
      },

      /**
       * Builds a new dummy resource, the dummy resource can be used to execute random queries
       * using the same infrastructure as records and collections.
       *
       * @return {Dummy} the dummy object
       */
      dummy: function(_asCollection) {
        return new Dummy(_asCollection);
      },

      /**
       * @memberof StaticApi#
       *
       * @description Returns the model API name.
       *
       * This name should match the one used throughout the API. It's only used by some extended
       * functionality, like the default packer.
       *
       * By default model name is infered from the url, but for nested models and special cases
       * it should be manually set by writing the name and plural properties:
       *
       * ```javascript
       * restmod.model(null, {
       *   __name__: 'resource',
       *   __plural__: 'resourciness' // set only if inflector cant properly gess the name.
       * });
       * ```
       *
       * @return {boolean} If true, return plural name
       * @return {string} The base url.
       */
      identity: function(_plural) {
        return _plural ? config.plural : config.name;
      },

      /**
       * @memberof StaticApi#
       *
       * @description Modifies model behavior.
       *
       * @params {mixed} _mixins One or more mixins or model definitions.
       * @return {Model} The model
       */
      mix: function(/* mixins */) {
        builder.chain(arguments);
        this.$$chain.push.apply(this.$$chain, arguments);
        return this;
      },

      // Strategies

      /**
       * @memberof StaticApi#
       *
       * @description The model unpacking strategy
       *
       * This method is called to extract record data from a request response, its also
       * responsible of handling the response metadata.
       *
       * Override this method to change the metadata processing strategy, by default its a noop
       *
       * @params {mixed} _resource Related resource instance
       * @params {mixed} _raw Response raw data
       * @return {mixed} Resource raw data
       */
      unpack: function(_resource, _raw) { return _raw; },

      /**
       * @memberof StaticApi#
       *
       * @description The model packing strategy
       *
       * This method is called to wrap raw record data to be sent in a request.
       *
       * Override this method to change the request packing strategy, by default its a noop
       *
       * @params {mixed} _resource Related resource instance
       * @params {mixed} _raw Record data to be sent (can be an array if resource is collection)
       * @return {mixed} Wrapped data
       */
      pack: function(_record, _raw) { return _raw; },

      /**
       * @memberof StaticApi#
       *
       * @description The model decoding strategy
       *
       * This method is called to populate a record from raw data (unppacked)
       */
      decode: serializer.decode,

      /**
       * @memberof StaticApi#
       *
       * @description The model encoding strategy
       *
       * This method is called to extract raw data from a record to be sent to server (before packing)
       */
      encode: serializer.encode,

      /**
       * @memberof StaticApi#
       *
       * @description The model name decoding strategy
       *
       * This method is called on every raw record data property to rename it, by default is not defined.
       *
       * Override this method to change the property renaming strategy.
       *
       * @params {string} _name Response (raw) name
       * @return {string} Record name
       */
      decodeName: null,

      /**
       * @memberof StaticApi#
       *
       * @description The model name encoding strategy
       *
       * This method is called when encoding a record to rename the record properties into the raw data properties,
       * by default is not defined.
       *
       * Override this method to change the property renaming strategy
       *
       * @params {string} _name Record name
       * @return {string} Response (raw) name
       */
      encodeName: null

    }, ScopeApi);

    ///// Setup record api

    extend(Model.prototype, {

      $type: Model,

      // default initializer: loads the default parameter values
      $initialize: function() {
        var tmp, i, self = this;
        for(i = 0; (tmp = defaults[i]); i++) {
          this[tmp[0]] = (typeof tmp[1] === 'function') ? tmp[1].apply(this) : tmp[1];
        }

        for(i = 0; (tmp = computes[i]); i++) {
          Object.defineProperty(self, tmp[0], {
            enumerable: true,
            get: tmp[1]
          });
        }
      }

    }, CommonApi, RecordApi, ExtendedApi);

    ///// Setup collection api

    extend(Collection.prototype, {

      $type: Model,

      // provide record contructor
      $new: function(_pk, _scope) {
        return Model.$new(_pk, _scope || this);
      },

      // provide collection constructor
      $collection: function(_params, _scope) {
        _params = this.$params ? angular.extend({}, this.$params, _params) : _params;
        return newCollection(_scope || this.$scope, _params);
      }

    }, ScopeApi, CommonApi, CollectionApi, ExtendedApi);

    ///// Setup dummy api

    extend(Dummy.prototype, {

      $type: Model,

      $initialize: function() {
        // Nothing by default
      }

    }, CommonApi);

    ///// Setup builder

    var APIS = {
      Model: Model,
      Record: Model.prototype,
      Collection: Collection.prototype,
      Dummy: Dummy.prototype
    };

    // helper used to extend api's
    function helpDefine(_api, _name, _fun) {
      var api = APIS[_api];

      Utils.assert(!!api, 'Invalid api name $1', _api);

      if(_name) {
        api[_name] = Utils.override(api[_name], _fun);
      } else {
        Utils.extendOverriden(api, _fun);
      }
    }

    // load the builder
    builder = new Builder(angular.extend(serializer.dsl(), {

      /**
       * @memberof BuilderApi#
       *
       * Sets one of the model's configuration properties.
       *
       * The following configuration parameters are available by default:
       * * primaryKey: The model's primary key, defaults to **id**. Keys must use server naming convention!
       * * urlPrefix: Url prefix to prepend to resource url, usefull to use in a base mixin when multiples models have the same prefix.
       * * url: The resource base url, null by default. If not given resource is considered nested.
       *
       * @param {string} _key The configuration key to set.
       * @param {mixed} _value The configuration value.
       * @return {BuilderApi} self
       */
      setProperty: function (_key, _value) {
        config[_key] = _value;
        return this;
      },

      /**
       * @memberof BuilderApi#
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
       * @return {BuilderApi} self
       */
      attrDefault: function(_attr, _init) {
        defaults.push([_attr, _init]);
        return this;
      },

      /**
       * @memberof BuilderApi#
       *
       * @description Sets a computed value for an attribute.
       *
       * Computed values are set only on object construction phase.
       * Computed values are always masked
       *
       * @param {string} _attr Attribute name
       * @param {function} _fn Function that returns value
       * @return {BuilderApi} self
       */
      attrComputed: function(_attr, _fn) {
        computes.push([_attr, _fn]);
        this.attrMask(_attr, true);
        return this;
      },

      /**
       * @memberof BuilderApi#
       *
       * @description Registers attribute metadata.
       *
       * @param {string} _name Attribute name
       * @param {object} _metadata Attribute metadata
       * @return {BuilderApi} self
       */
      attrMeta: function(_name, _metadata) {
        meta[_name] = extend(meta[_name] || {}, _metadata);
        return this;
      },

      /**
       * @memberof BuilderApi#
       *
       * @description Adds methods to the model
       *
       * This method allows to extend the different model API's.
       *
       * The following API's can be extended using this method:
       * * Model: The static API, affects the Model object itself.
       * * Record: Affects each record generated by the model.
       * * Collection: Affects each collection generated by the model.
       * * Scope: Affects both the static API and collections.
       * * Resource: Affects records and collections.
       *
       * If no api is given
       *
       *
       * If no scope is given,
       * By default this method extends the **Record** prototype.
       * If called with an object
       * instead of a function it can be used to extend the collection and the type with
       * specific implementations.
       *
       * Usage:
       *
       * ```javascript
       * restmod.mixin(function() {
       *   this.define('myRecordMethod', function() {})
       *       .define('Model.myStaticMethod', function() {})
       *       .define('Collection', { }); // object to extend collection api with
       * });
       * ```
       *
       * It is posible to override an existing method using define, if overriden,
       * the old method can be called using `this.$super` inside de new method.
       *
       * @param {string} _where
       * @param {function} _fun Function to define or object with particular implementations
       * @param {string} _api One of the api names listed above, if not given defaults to 'Record'
       * @return {BuilderApi} self
       */
      define: function(_where, _fun) {

        var name = false, api = 'Record';
        if(typeof _fun === 'object' && _fun) {
          api = _where;
        } else {
          name = _where.split('.');
          if(name.length === 1) {
            name = name[0];
          } else {
            api = name[0];
            name = name[1];
          }
        }

        switch(api) {
        // Virtual API's
        case 'Scope':
          helpDefine('Model', name, _fun);
          helpDefine('Collection', name, _fun);
          break;
        case 'Resource':
          helpDefine('Record', name, _fun);
          helpDefine('Collection', name, _fun);
          helpDefine('Dummy', name, _fun);
          break;
        default:
          helpDefine(api, name, _fun);
        }

        return this;
      },

      /**
       * @memberof BuilderApi#
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
       * @return {BuilderApi} self
       */
      on: function(_hook, _do) {
        (hooks[_hook] || (hooks[_hook] = [])).push(_do);
        return this;
      }
    }));

    builder.chain(_baseChain); // load base chain.

    return Model;
  };

}]);

/**
 * @class FastQ
 *
 * @description
 *
 * Synchronous promise implementation (partial)
 *
 */
RMModule.factory('RMFastQ', [function() {

  var isFunction = angular.isFunction;

  function simpleQ(_val, _withError) {

    if(_val && isFunction(_val.then)) return wrappedQ(_val);

    return {
      simple: true,

      then: function(_success, _error) {
        return simpleQ(_withError ? _error(_val) : _success(_val));
      },
      'finally': function(_cb) {
        var result = _cb();
        if(result && isFunction(_val.then)) {
          // if finally returns a promise, then
          return wrappedQ(_val.then(
            function() { return _withError ? simpleQ(_val, true) : _val; },
            function() { return _withError ? simpleQ(_val, true) : _val; })
          );
        } else {
          return this;
        }
      }
    };
  }

  function wrappedQ(_promise) {
    if(_promise.simple) return _promise;

    var simple;

    // when resolved, make $q a simpleQ
    _promise.then(function(_val) {
      simple = simpleQ(_val);
    }, function(_val) {
      simple = simpleQ(_val, true);
    });

    return {
      then: function(_success, _error) {
        return simple ?
          simple.then(_success, _error) :
          wrappedQ(_promise.then(_success, _error));
      },
      'finally': function(_cb) {
        return simple ?
          simple['finally'](_cb) :
          wrappedQ(_promise['finally'](_cb));
      }
    };
  }

  return {
    reject: function(_reason) {
      return simpleQ(_reason, true);
    },

    // non waiting promise, if resolved executes immediately
    when: function(_val) {
      return simpleQ(_val, false);
    },

    wrap: wrappedQ
  };
}]);

RMModule.factory('RMPackerCache', [function() {

  var packerCache;

  /**
   * @class PackerCache
   *
   * @description
   *
   * The packer cache service enables packing strategies to register raw object data that can be then used by
   * supporting relations during the decoding process to preload other related resources.
   *
   * This is specially useful for apis that include linked objects data in external metadata.
   *
   * The packer cache is reset on every response unwrapping so it's not supposed to be used as an
   * application wide cache.
   *
   * ### For extension developers:
   *
   * Use the `feed` method to add new raw data to cache.
   *
   * ### For relation developers:
   *
   * Use the `resolve` method to inject cache data into a given identified record.
   *
   */
  return {
    /**
     * @memberof PackerCache#
     *
     * @description Feed data to the cache.
     *
     * @param {string} _name Resource name (singular)
     * @param {array} _rawRecords Raw record data as an array
     */
    feed: function(_name, _rawRecords) {
      packerCache[_name] = _rawRecords; // TODO: maybe append new record to support extended scenarios.
    },

    // IDEA: feedSingle: would require two step resolve many -> single

    /**
     * @memberof PackerCache#
     *
     * @description Searches for data matching the record's pk, if found data is then fed to the record using $decode.
     *
     * @param {RecordApi} _record restmod record to resolve, must be identified.
     * @return {RecordApi} The record, so call can be nested.
     */
    resolve: function(_record) {

      if(packerCache) { // make sure this is a packer cache enabled context.

        var modelType = _record.$type,
            cache = packerCache[modelType.identity(true)];

        if(cache && _record.$pk) {
          for(var i = 0, l = cache.length; i < l; i++) {
            if(_record.$pk === modelType.inferKey(cache[i])) { // this could be sort of slow? nah
              _record.$decode(cache[i]);
              break;
            }
          }
        }
      }

      return _record;
    },

    // private api method used by the unwrapper function.
    prepare: function() {
      packerCache = {};
    },

    // private api internal method used by the unwrapper function.
    clear: function() {
      packerCache = null;
    }
  };

}]);
RMModule.factory('RMSerializer', ['$injector', 'inflector', '$filter', 'RMUtils', function($injector, inflector, $filter, Utils) {

  function extract(_from, _path) {
    var node;
    for(var i = 0; _from && (node = _path[i]); i++) {
      _from = _from[node];
    }
    return _from;
  }

  function insert(_into, _path, _value) {
    for(var i = 0, l = _path.length-1; i < l; i++) {
      var node = _path[i];
      _into = _into[node] || (_into[node] = {});
    }
    _into[_path[_path.length-1]] = _value;
  }

  return function(_strategies) {

    var isArray = angular.isArray;

    // Private serializer attributes
    var masks = {},
        decoders = {},
        encoders = {},
        mapped = {},
        mappings = {},
        vol = {};

    function isMasked(_name, _mask) {
      if(typeof _mask === 'function') return _mask(_name);
      var mask = masks[_name];
      return (mask && (mask === true || mask.indexOf(_mask) !== -1));
    }

    function decode(_from, _to, _prefix, _mask, _ctx) {
      var key, decodedName, fullName, value, maps, isMapped, i, l,
          prefix = _prefix ? _prefix + '.' : '';

      // explicit mappings
      maps = mappings[_prefix];
      if(maps) {
        for(i = 0, l = maps.length; i < l; i++) {
          fullName = prefix + maps[i].path;
          if(isMasked(fullName, _mask)) continue;

          if(maps[i].map) {
            value = extract(_from, maps[i].map);
          } else {
            value = _from[_strategies.encodeName ? _strategies.encodeName(maps[i].path) : maps[i].path];
          }

          if(!maps[i].forced && value === undefined) continue;

          value = decodeProp(value, fullName, _mask, _ctx);
          if(value !== undefined) _to[maps[i].path] = value;
        }
      }

      // implicit mappings
      for(key in _from) {
        if(_from.hasOwnProperty(key)) {

          decodedName = _strategies.decodeName ? _strategies.decodeName(key) : key;
          if(decodedName[0] === '$') continue;

          if(maps) {
            // ignore already mapped keys
            // TODO: ignore nested mappings too.
            for(
              // is this so much faster than using .some? http://jsperf.com/some-vs-for-loop
              isMapped = false, i = 0, l = maps.length;
              i < l && !(isMapped = (maps[i].mapPath === key));
              i++
            );
            if(isMapped) continue;
          }

          fullName = prefix + decodedName;
          // prevent masked or already mapped properties to be set
          if(mapped[fullName] || isMasked(fullName, _mask)) continue;

          value = decodeProp(_from[key], fullName, _mask, _ctx);
          if(value !== undefined) _to[decodedName] = value; // ignore value if filter returns undefined
        }
      }
    }

    function decodeProp(_value, _name, _mask, _ctx) {
      var filter = decoders[_name], result = _value;

      if(filter) {
        result = filter.call(_ctx, _value);
      } else if(typeof _value === 'object') {
        // IDEA: make extended decoding/encoding optional, could be a little taxing for some apps
        if(isArray(_value)) {
          result = [];
          for(var i = 0, l = _value.length; i < l; i++) {
            result.push(decodeProp(_value[i], _name + '[]', _mask, _ctx));
          }
        } else if(_value) {
          result = {};
          decode(_value, result, _name, _mask, _ctx);
        }
      }

      return result;
    }

    function encode(_from, _to, _prefix, _mask, _ctx) {
      var key, fullName, encodedName, value, maps,
          prefix = _prefix ? _prefix + '.' : '';

      // implicit mappings
      for(key in _from) {
        if(_from.hasOwnProperty(key) && key[0] !== '$') {
          fullName = prefix + key;
          // prevent masked or already mapped properties to be copied
          if(mapped[fullName] || isMasked(fullName, _mask)) continue;

          value = encodeProp(_from[key], fullName, _mask, _ctx);
          if(value !== undefined) {
            encodedName = _strategies.encodeName ? _strategies.encodeName(key) : key;
            _to[encodedName] = value;
          }

          if(vol[fullName]) delete _from[key];
        }
      }

      // explicit mappings:
      maps = mappings[_prefix];
      if(maps) {
        for(var i = 0, l = maps.length; i < l; i++) {
          fullName = prefix + maps[i].path;
          if(isMasked(fullName, _mask)) continue;

          value = _from[maps[i].path];
          if(!maps[i].forced && value === undefined) continue;

          value = encodeProp(value, fullName, _mask, _ctx);
          if(value !== undefined) {
            if(maps[i].map) {
              insert(_to, maps[i].map, value);
            } else {
              _to[_strategies.encodeName ? _strategies.encodeName(maps[i].path) : maps[i].path] = value;
            }
          }
        }
      }
    }

    function encodeProp(_value, _name, _mask, _ctx) {
      var filter = encoders[_name], result = _value;

      if(filter) {
        result = filter.call(_ctx, _value);
      } else if(_value !== null && typeof _value === 'object' && typeof _value.toJSON !== 'function') {
        // IDEA: make deep decoding/encoding optional, could be a little taxing for some apps
        if(isArray(_value)) {
          result = [];
          for(var i = 0, l = _value.length; i < l; i++) {
            result.push(encodeProp(_value[i], _name + '[]', _mask, _ctx));
          }
        } else if(_value) {
          result = {};
          encode(_value, result, _name, _mask, _ctx);
        }
      }

      return result;
    }

    return {

      // decodes a raw record into a record
      decode: function(_record, _raw, _mask) {
        decode(_raw, _record, '', _mask, _record);
      },

      // encodes a record, returning a raw record
      encode: function(_record, _mask) {
        var raw = {};
        encode(_record, raw, '', _mask, _record);
        return raw;
      },

      // builds a serializerd DSL, is a standalone object that can be extended.
      dsl: function() {

        return {

          /**
           * @memberof BuilderApi#
           *
           * @description Sets an attribute mapping.
           *
           * Allows a explicit server to model property mapping to be defined.
           *
           * For example, to map the response property `stats.created_at` to model's `created` property.
           *
           * ```javascript
           * builder.attrMap('created', 'stats.created_at');
           * ```
           *
           * It's also posible to use a wildcard '*' as server name to use the default name decoder as
           * server name. This is used to force a property to be processed on decode/encode even if its
           * not present on request/record (respectively), by doing this its posible, for example, to define
           * a dynamic property that is generated automatically before the object is send to the server.
           *
           * @param {string} _attr Attribute name
           * @param {string} _serverName Server (request/response) property name
           * @return {BuilderApi} self
           */
          attrMap: function(_attr, _serverPath, _forced) {
            // extract parent node from client name:
            var index = _attr.lastIndexOf('.'),
                node = index !== -1 ? _attr.substr(0, index) : '',
                leaf = index !== -1 ? _attr.substr(index + 1) : _attr;

            mapped[_attr] = true;

            var nodes = (mappings[node] || (mappings[node] = []));
            nodes.push({ path: leaf, map: _serverPath === '*' ? null : _serverPath.split('.'), mapPath: _serverPath, forced: _forced });
            return this;
          },

          /**
           * @memberof BuilderApi#
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
           * @return {BuilderApi} self
           */
          attrMask: function(_attr, _mask) {
            if(!_mask) {
              delete masks[_attr];
            } else {
              masks[_attr] = _mask;
            }
            return this;
          },

          /**
           * @memberof BuilderApi#
           *
           * @description Assigns a decoding function/filter to a given attribute.
           *
           * @param {string} _name Attribute name
           * @param {string|function} _filter filter or function to register
           * @param {mixed} _filterParam Misc filter parameter
           * @param {boolean} _chain If true, filter is chained to the current attribute filter.
           * @return {BuilderApi} self
           */
          attrDecoder: function(_attr, _filter, _filterParam, _chain) {

            if(typeof _filter === 'string') {
              var filter = $filter(_filter);
              _filter = function(_value) { return filter(_value, _filterParam); };
            }

            decoders[_attr] = _chain ? Utils.chain(decoders[_attr], _filter) : _filter;
            return this;
          },

          /**
           * @memberof BuilderApi#
           *
           * @description Assigns a encoding function/filter to a given attribute.
           *
           * @param {string} _name Attribute name
           * @param {string|function} _filter filter or function to register
           * @param {mixed} _filterParam Misc filter parameter
           * @param {boolean} _chain If true, filter is chained to the current attribute filter.
           * @return {BuilderApi} self
           */
          attrEncoder: function(_attr, _filter, _filterParam, _chain) {

            if(typeof _filter === 'string') {
              var filter = $filter(_filter);
              _filter = function(_value) { return filter(_value, _filterParam); };
            }

            encoders[_attr] = _chain ? Utils.chain(encoders[_attr], _filter) : _filter;
            return this;
          },

          /**
           * @memberof BuilderApi#
           *
           * @description Makes an attribute volatile, a volatile attribute is deleted from source after encoding.
           *
           * @param {string} _name Attribute name
           * @param {boolean} _isVolatile defaults to true, if set to false then the attribute is no longer volatile.
           * @return {BuilderApi} self
           */
          attrVolatile: function(_attr, _isVolatile) {
            vol[_attr] = _isVolatile === undefined ? true : _isVolatile;
            return this;
          }
        };
      }
    };
  };

}]);
RMModule.factory('DefaultPacker', ['restmod', 'inflector', 'RMPackerCache', function(restmod, inflector, packerCache) {

  function include(_source, _list, _do) {
    for(var i = 0, l = _list.length; i < l; i++) {
      _do(_list[i], _source[_list[i]]);
    }
  }

  function exclude(_source, _skip, _do) {
    for(var key in _source) {
      if(_source.hasOwnProperty(key) && _skip.indexOf(key) === -1) {
        _do(key, _source[key]);
      }
    }
  }

  // process links and stores them in the packer cache
  function processFeature(_raw, _name, _feature, _other, _do) {
    if(_feature === '.' || _feature === true) {
      var skip = [_name];
      if(_other) skip.push.apply(skip, angular.isArray(_other) ? _other : [_other]);
      exclude(_raw, skip, _do);
    } else if(typeof _feature === 'string') {
      exclude(_raw[_feature], [], _do);
    } else { // links is an array
      include(_raw, _feature, _do);
    }
  }

  /**
   * @class DefaultPacker
   *
   * @description
   *
   * Simple `$unpack` implementation that attempts to cover the standard proposed by
   * [active_model_serializers](https://github.com/rails-api/active_model_serializers.
   *
   * This is a simplified version of the wrapping structure recommented by the jsonapi.org standard,
   * it supports side loaded associated resources (via supporting relations) and metadata extraction.
   *
   * To activate add mixin to model chain
   *
   * ```javascript
   * restmodProvide.rebase('DefaultPacker');
   * ```
   *
   * ### Json root
   *
   * By default the mixin will use the singular model name as json root for single resource requests
   * and pluralized name for collection requests. Make sure the model name is correctly set.
   *
   * To override the name used by the mixin set the **jsonRootSingle** and **jsonRootMany** variables.
   * Or set **jsonRoot** to override both.
   *
   * ### Side loaded resources
   *
   * By default the mixin will look for links to other resources in the 'linked' root property, you
   * can change this by setting the jsonLinks variable. To use the root element as link source
   * use `jsonLinks: '.'`. You can also explicitly select which properties to consider links using an
   * array of property names. To skip links processing altogether, set it to false.
   *
   * Links are expected to use the pluralized version of the name for the referenced model. For example,
   * given the following response:
   *
   * ```json
   * {
   *   bikes: [...],
   *   links {
   *     parts: [...]
   *   }
   * }
   * ```
   *
   * Restmod will expect that the Part model plural name is correctly set parts. Only properties declared
   * as reference relations (belongsTo and belongsToMany) will be correctly resolved.
   *
   * ### Metadata
   *
   * By default metadata is only captured if it comes in the 'meta' root property. Metadata is then
   * stored in the $meta property of the resource being unwrapped.
   *
   * Just like links, to change the metadata source property set the jsonMeta property to the desired name, set
   * it to '.' to capture the entire raw response or set it to false to skip metadata and set it to an array of properties
   * to be extract selected properties.
   *
   * @property {mixed} single The expected single resource wrapper property name
   * @property {object} plural The expected collection wrapper property name
   * @property {mixed} links The links repository property name
   * @property {object} meta The metadata repository property name
   *
   */
  return restmod.mixin(function() {
    this.define('Model.unpack', function(_resource, _raw) {
      var name = null,
          links = this.getProperty('jsonLinks', 'linked'),
          meta = this.getProperty('jsonMeta', 'meta');

      if(_resource.$isCollection) {
        name = this.getProperty('jsonRootMany') || this.getProperty('jsonRoot') || this.getProperty('plural');
      } else {
        // TODO: use plural for single resource option.
        name = this.getProperty('jsonRootSingle') || this.getProperty('jsonRoot') || this.getProperty('name');
      }

      if(meta) {
        _resource.$metadata = {};
        processFeature(_raw, name, meta, links, function(_key, _value) {
          _resource.$metadata[_key] = _value;
        });
      }

      if(links) {
        processFeature(_raw, name, links, meta, function(_key, _value) {
          // TODO: check that cache is an array.
          packerCache.feed(_key, _value);
        });
      }

      return _raw[name];
    });
  });

}]);
/**
 * @class Utils
 *
 * @description
 *
 * Various utilities used across the library.
 *
 */
RMModule.factory('RMUtils', ['$log', function($log) {

  // determine browser support for object prototype changing
  var IFRAME_REF = [];
  var PROTO_SETTER = (function() {
    var Test = function() {};
    if(Object.setPrototypeOf) {
      return function(_target, _proto) {
        Object.setPrototypeOf(_target, _proto); // Not sure about supporting this...
      };
    } else if((new Test).__proto__ === Test.prototype) {
      return function(_target, _proto) {
        _target.__proto__ = _proto;
      };
    }
  })();

  var Utils = {

    // Ignore Masks
    CREATE_MASK: 'C',
    UPDATE_MASK: 'U',
    READ_MASK: 'R',
    WRITE_MASK: 'CU',
    FULL_MASK: 'CRU',

    /**
     * @memberof Utils
     *
     * @description
     *
     * Formats a string
     *
     * @param  {string} _str String to format
     * @param  {array} _args String arguments
     * @return {string} Formated string
     */
    format: function(_str, _args) {
      for(var i = 0; _args && i < _args.length; i++) {
        _str = _str.replace('$' + (i+1), _args[i]);
      }
      return _str;
    },

    /**
     * @memberof Utils
     *
     * @description
     *
     * Test for a condition to be met, if not an exception is thrown.
     *
     * @param  {boolean} _condition Condition to assert
     * @param  {string} _msg Error message
     */
    assert: function(_condition, _msg /*, params */) {
      if(!_condition) {
        var params = Array.prototype.slice.call(arguments, 2);
        _msg = Utils.format(_msg, params);
        $log.error(_msg); // log error message
        throw new Error(_msg);
      }
    },

    /**
     * @memberof Utils
     *
     * @description
     *
     * Simple url joining, returns null if _head or _tail is null.
     *
     * @param  {string} _head Url prefix
     * @param  {string} _tail Url suffix
     * @return {string} Resulting url
     */
    joinUrl: function(_head, _tail) {
      if(!_head || !_tail) return null;
      return (_head+'').replace(/\/$/, '') + '/' + (_tail+'').replace(/^\//, '');
    },

    /**
     * @memberof Utils
     *
     * @description
     *
     * Cleans trailing slashes from an url
     *
     * @param  {string} _url Url to clean
     * @return {string} Resulting url
     */
    cleanUrl: function(_url) {
      return _url ? _url.replace(/\/$/, '') : _url;
    },

    /**
     * @memberof Utils
     *
     * @description
     *
     * Chains to filtering functions together
     *
     * @param  {function} _first original function
     * @param  {function} _fun   function to call on the original function result
     * @return {mixed} value returned by the last function call
     */
    chain: function(_first, _fun) {
      if(!_first) return _fun;
      return function(_value) {
        return _fun.call(this, _first.call(this, _value));
      };
    },

    /**
     * @memberof Utils
     *
     * @description
     *
     * Override a property value, making overriden function available as this.$super
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
     * @memberof Utils
     *
     * @description
     *
     * Extend an object using `Utils.override` instead of just replacing the functions.
     *
     * @param  {object} _target Object to be extended
     * @param  {object} _other  Source object
     */
    extendOverriden: function(_target) {
      for(var i = 1; i < arguments.length; i++) {
        var other = arguments[i];
        for(var key in other) {
          if(other.hasOwnProperty(key)) {
            _target[key] = _target[key] && typeof _target[key] === 'function' ? Utils.override(_target[key], other[key]) : other[key];
          }
        }
      }

      return _target;
    },

    /**
     * @memberof Utils
     *
     * @description
     *
     * Generates a new array type, handles platform specifics (bag-O-hacks)
     *
     * @return {object} Independent array type.
     */
    buildArrayType: function(_forceIframe) {

      var arrayType;

      if(PROTO_SETTER && !_forceIframe) {

        // Use object prototype override technique
        //
        // Very nice array subclassing analysis: http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/#why_subclass_an_array
        //

        var SubArray = function() {
          var arr = [ ];
          arr.push.apply(arr, arguments);
          PROTO_SETTER(arr, SubArray.prototype);
          return arr;
        };

        SubArray.prototype = [];
        SubArray.prototype.last = function() {
          return this[this.length - 1];
        };

        arrayType = SubArray;

      } else  {

        // Use iframe hijack technique for IE11<
        //
        // Based on the awesome blog post of Dean Edwards: http://dean.edwards.name/weblog/2006/11/hooray/
        //

        // create a hidden <iframe>.
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.height = 0;
        iframe.width = 0;
        iframe.border = 0;

        document.body.appendChild(iframe);

        // write a script into the <iframe> and steal its Array object.
        window.frames[window.frames.length - 1].document.write('<script>parent.RestmodArray = Array;<\/script>');

        // take the array object and move it to local context.
        arrayType = window.RestmodArray;
        delete window.RestmodArray;

        // copy this context Array's extensions to new array type (could be a little slow...)
        for(var key in Array.prototype) {
          if(typeof Array.prototype[key] === 'function' && !arrayType.prototype[key]) {
            arrayType.prototype[key] = Array.prototype[key];
          }
        }

        // remove iframe from DOM.
        //
        // Even though MS says that removing iframe from DOM will release it's related structures (http://msdn.microsoft.com/en-us/library/ie/gg622929(v=vs.85).aspx),
        // actually keeping it referenced has proven to be enough to keep the structures alive. (that includes our array type)
        //
        document.body.removeChild(iframe);
        IFRAME_REF.push(iframe); // keep iframe reference!
      }

      return arrayType;
    }
  };

  return Utils;
}]);
})(angular);