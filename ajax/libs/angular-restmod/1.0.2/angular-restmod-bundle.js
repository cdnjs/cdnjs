/**
 * API Bound Models for AngularJS
 * @version v1.0.2 - 2014-09-12
 * @link https://github.com/angular-platanus/restmod
 * @author Ignacio Baixas <ignacio@platan.us>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
/**
 * Angular inflection library
 * @version v0.2.0 - 2014-08-22
 * @link https://github.com/platanus/angular-inflector
 * @author Ignacio Baixas <ignacio@platan.us>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
angular.module('platanus.inflector', [])
  /**
   * @class inflectorProvider
   *
   * @description
   *
   * The inflectorProvider exposes inflector configuration options, mainly related to locales.
   */
  .provider('inflector', [function () {

    var activeLocale = 'en', localeMap = {
      /**
       * English transformation rules.
       *
       * Taken from https://code.google.com/p/inflection-js/source/browse/trunk/inflection.js
       */
      en: {
        uncountable: [
          'music', 'art', 'love', 'happiness', 'advice', 'furniture', 'luggage',
          'sugar', 'butter', 'water', 'electricity', 'gas', 'power', 'currency',
          'equipment', 'information', 'rice', 'money', 'species', 'series',
          'fish', 'sheep', 'moose', 'deer', 'news'
        ],

        plural: [
          [new RegExp('(m)an$', 'gi'),                 '$1en'],
          [new RegExp('(pe)rson$', 'gi'),              '$1ople'],
          [new RegExp('(child)$', 'gi'),               '$1ren'],
          [new RegExp('^(ox)$', 'gi'),                 '$1en'],
          [new RegExp('(ax|test)is$', 'gi'),           '$1es'],
          [new RegExp('(octop|vir)us$', 'gi'),         '$1i'],
          [new RegExp('(alias|status)$', 'gi'),        '$1es'],
          [new RegExp('(bu)s$', 'gi'),                 '$1ses'],
          [new RegExp('(buffal|tomat|potat)o$', 'gi'), '$1oes'],
          [new RegExp('([ti])um$', 'gi'),              '$1a'],
          [new RegExp('sis$', 'gi'),                   'ses'],
          [new RegExp('(?:([^f])fe|([lr])f)$', 'gi'),  '$1$2ves'],
          [new RegExp('(hive)$', 'gi'),                '$1s'],
          [new RegExp('([^aeiouy]|qu)y$', 'gi'),       '$1ies'],
          [new RegExp('(x|ch|ss|sh)$', 'gi'),          '$1es'],
          [new RegExp('(matr|vert|ind)ix|ex$', 'gi'),  '$1ices'],
          [new RegExp('([m|l])ouse$', 'gi'),           '$1ice'],
          [new RegExp('(quiz)$', 'gi'),                '$1zes'],
          [new RegExp('s$', 'gi'),                     's'],
          [new RegExp('$', 'gi'),                      's']
        ],

        singular: [
          [new RegExp('(m)en$', 'gi'),                                                       '$1an'],
          [new RegExp('(pe)ople$', 'gi'),                                                    '$1rson'],
          [new RegExp('(child)ren$', 'gi'),                                                  '$1'],
          [new RegExp('([ti])a$', 'gi'),                                                     '$1um'],
          [new RegExp('((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$','gi'), '$1$2sis'],
          [new RegExp('(hive)s$', 'gi'),                                                     '$1'],
          [new RegExp('(tive)s$', 'gi'),                                                     '$1'],
          [new RegExp('(curve)s$', 'gi'),                                                    '$1'],
          [new RegExp('([lr])ves$', 'gi'),                                                   '$1f'],
          [new RegExp('([^fo])ves$', 'gi'),                                                  '$1fe'],
          [new RegExp('([^aeiouy]|qu)ies$', 'gi'),                                           '$1y'],
          [new RegExp('(s)eries$', 'gi'),                                                    '$1eries'],
          [new RegExp('(m)ovies$', 'gi'),                                                    '$1ovie'],
          [new RegExp('(x|ch|ss|sh)es$', 'gi'),                                              '$1'],
          [new RegExp('([m|l])ice$', 'gi'),                                                  '$1ouse'],
          [new RegExp('(bus)es$', 'gi'),                                                     '$1'],
          [new RegExp('(o)es$', 'gi'),                                                       '$1'],
          [new RegExp('(shoe)s$', 'gi'),                                                     '$1'],
          [new RegExp('(cris|ax|test)es$', 'gi'),                                            '$1is'],
          [new RegExp('(octop|vir)i$', 'gi'),                                                '$1us'],
          [new RegExp('(alias|status)es$', 'gi'),                                            '$1'],
          [new RegExp('^(ox)en', 'gi'),                                                      '$1'],
          [new RegExp('(vert|ind)ices$', 'gi'),                                              '$1ex'],
          [new RegExp('(matr)ices$', 'gi'),                                                  '$1ix'],
          [new RegExp('(quiz)zes$', 'gi'),                                                   '$1'],
          [new RegExp('s$', 'gi'),                                                           '']
        ]
      }
    };

    // helper function used by singularize and pluralize
    function applyRules(_string, _ruleSet, _skip) {

      if(_skip.indexOf(_string.toLowerCase()) === -1) {
        var i = 0, rule;
        while(rule = _ruleSet[i++]) {
          if(_string.match(rule[0])) {
            return _string.replace(rule[0], rule[1]);
          }
        }
      }

      return _string;
    }

    return {

      /**
       * @memberof inflectorProvider#
       *
       * @description
       *
       * Registers a new locale, see the default english locale implementation for information about the required structure.
       *
       * @param {string} _locale Locale name
       * @param {object} _def Locale definition
       */
      registerLocale: function(_locale, _def) {
        localeMap[_locale] = _def;
      },

      /**
       * @memberof inflectorProvider#
       *
       * @description
       *
       * Sets the default locale, defaults to 'en'
       *
       * @param {string} _locale Locale name
       */
      setLocale: function(_locale) {
        activeLocale = _locale;
      },

      /**
       * @class inflector
       *
       * @description
       *
       * The inflector service provides a set of string transformation methods.
       */
      $get: ['$log', function($log) {

        function loadRulesFor(_locale) {
          _locale = _locale || activeLocale;
          var rules = localeMap[_locale];
          if(!rules) $log.warn('Invalid inflector locale ' + _locale);
          return rules;
        }

        return {

          /**
           * @memberof inflector#
           *
           * @description
           *
           * Transform a string to camelcase, removing every space, dash and underscore
           *
           * @param {string} _string String to transform
           * @param {boolean} _constant If set to false, first letter is not uppercased, defaults to false.
           * @return {string} The transformed string
           */
          camelize: function(_string, _constant) {
            if (typeof _string !== 'string') return _string;
            return _string.replace(/(?:^[-_\s]*|[-_\s]+)([A-Z\d])/gi, function (match, _first, _index) {
              return (!_constant && _index === 0) ? _first : _first.toUpperCase();
            });
          },

          /**
           * @memberof inflector#
           *
           * @description
           *
           * Transforms a camelcase string to a snakecase string
           *
           * @param {string} _string String to transform
           * @param {string} _sep Separator, defaults to '-'
           * @return {string} The transformed string
           */
          parameterize: function(_string, _sep) {
            if (typeof _string !== 'string') return _string;
            return _string.replace(/(?:[A-Z]+|[0-9]+)/g, function (_match, _index) {
              return _index === 0 ? _match : (_sep || '-') + _match;
            }).toLowerCase();
          },

          /**
           * @memberof inflector#
           *
           * @description
           *
           * Transforms a string to snakecase, replaces every space, dash and undercore by the provided separator.
           *
           * @param {string} _string String to transform
           * @param {string} _sep Separator, defaults to '-'
           * @return {string} The transformed string
           */
          dasherize: function(_string, _sep) {
            return _string.replace(/[-_\s]+/g, _sep || '-');
          },

          /**
           * @memberof inflector#
           *
           * @description
           *
           * Transforms a string to its singular form.
           *
           * @param {string} _string String to transform
           * @param {string} _locale) Locale to use, defaults to the default locale
           * @return {string} The transformed string
           */
          singularize: function(_string, _locale) {
            var rules = loadRulesFor(_locale);
            return rules ? applyRules(_string, rules.singular, rules.uncountable) : _string;
          },

          /**
           * @memberof inflector#
           *
           * @description
           *
           * Transforms a string to its plural form.
           *
           * @param {string} _string String to transform
           * @param {string} _locale) Locale to use, defaults to the default locale
           * @return {string} The transformed string
           */
          pluralize: function(_string, _locale) {
            var rules = loadRulesFor(_locale);
            return rules ? applyRules(_string, rules.plural, rules.uncountable) : _string;
          }
        };

      }]
    };
  }]);

})(angular);
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

  var BASE_CHAIN = ['RMBuilderExt', 'RMBuilderRelations'];

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
            model.$mix(arraySlice.call(arguments, 1));
            $log.warn('Passing mixins and difinitions in the model method will be deprecated in restmod 1.1, use restmod.model().$mix() instead.');
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
          return restmod.model.apply(this, arguments).$single(_url);
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
     * @description Gets this collection url without query string.
     *
     * @return {string} The collection url.
     */
    $url: function() {
      return this.$scope.$url();
    },

    /**
     * @memberof CollectionApi#
     *
     * @description Part of the scope interface, provides urls for collection's items.
     *
     * @param {RecordApi} _pk Item key to provide the url to.
     * @return {string|null} The url or nill if item does not meet the url requirements.
     */
    $urlFor: function(_pk) {
      // force item unscoping if model is not nested (maybe make this optional)
      var baseUrl = this.$type.$url();
      return Utils.joinUrl(baseUrl ? baseUrl : this.$url(), _pk);
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
      this.length = 0; // reset the collection contents
      return this;
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
      var request = { method: 'GET', url: this.$url(), params: this.$params };

      if(_params) {
        request.params = request.params ? extend(request.params, _params) : _params;
      }

      // TODO: check that collection is bound.
      this.$dispatch('before-fetch-many', [request]);
      return this.$send(request, function(_response) {
        this.$unwrap(_response.data); // feed retrieved data.
        this.$dispatch('after-fetch-many', [_response]);
      }, function(_response) {
        this.$dispatch('after-fetch-many-error', [_response]);
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

      // TODO: make sure object is f type Model?
      if(_obj.$position === undefined) {
        if(_idx !== undefined) {
          this.splice(_idx, 0, _obj);
        } else {
          this.push(_obj);
        }
        _obj.$position = true; // use true for now, keeping position updated can be expensive
        this.$dispatch('after-add', [_obj]);
      }
      return this;
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
      var idx = this.$indexOf(_obj);
      if(idx !== -1) {
        this.splice(idx, 1);
        _obj.$position = undefined;
        this.$dispatch('after-remove', [_obj]);
      }
      return this;
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
RMModule.factory('RMCommonApi', ['$http', '$q', '$log', 'RMPackerCache', function($http, $q, $log, packerCache) {

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
   * Provides a common framework for other restmod components.
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

      if(!this.$promise) { // TODO: $promise is resolved...
        // if there is no pending promise, just execute success callback,
        // if callback returns a promise, then set it as the current promise.
        this.$last = null;
        var result = _success.call(this, this);
        if(result !== undefined) this.$promise = $q.when(result);
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
      this.$promise = this.$asPromise()['finally'](_cb);
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
      if(!this.$getProperty('style')) {
        $log.warn('No API style base was selected, see the Api Integration FAQ for more information on this warning');
      }

      this.$pending = (this.$pending || []);
      this.$pending.push(_options);

      return this.$then(function() {

        // if request was canceled, then just return a resolved promise
        if(_options.canceled) {
          this.$pending.splice(0, 1);
          this.$status = 'canceled';
          return;
        }

        this.$response = null;
        this.$status = 'pending';
        this.$dispatch('before-request', [_options]);

        var dsp = this.$dispatcher(), _this = this;
        return $http(_options).then(function(_response) {

          return _this.$decorate(dsp, function() {

            this.$pending.splice(0, 1);

            if(_options.canceled) {
              // if request was canceled during request, ignore post request actions.
              this.$status =  'canceled';
            } else {
              this.$status = 'ok';
              this.$response = _response;

              this.$dispatch('after-request', [_response]);
              if(_success) _success.call(this, _response);
            }
          });

        }, function(_response) {

          return _this.$decorate(dsp, function() {

            this.$pending.splice(0, 1);

            if(_options.canceled) {
              // if request was canceled during request, ignore error handling
              this.$status = 'canceled';
              return this;
            } else {
              this.$status = 'error';
              this.$response = _response;

              // IDEA: Consider flushing pending request in case of an error. Also continue ignoring requests
              // until the error flag is reset by user.

              this.$dispatch('after-request-error', [_response]);
              if(_error) _error.call(this, _response);
              return $q.reject(this);
            }
          });
        });
      });
    },

    /**
     * @memberof CommonApi#
     *
     * @description Cancels all pending requests initiated with $send.
     *
     * @return {CommonApi} self
     */
    $cancel: function() {
      // cancel every pending request.
      if(this.$pending) {
        angular.forEach(this.$pending, function(_config) {
          _config.canceled = true;
        });
      }

      return this;
    },

    /**
     * @memberof CommonApi#
     *
     * @description Returns true if object has queued pending request
     *
     * @return {Boolean} Object request pending status.
     */
    $hasPendingRequests: function() {
      var pendingCount = 0;

      if(this.$pending) {
        angular.forEach(this.$pending, function(_config) {
          if(!_config.canceled) pendingCount++;
        });
      }

      return pendingCount > 0;
    },

    /// Misc common methods

    /**
     * @memberof CommonApi#
     *
     * @description
     *
     * Unpacks and decode raw data from a server generated structure.
     *
     * ATTENTION: do not override this method to change the object wrapping strategy,
     * instead, check {@link BuilderApi#setPacker} for instruction about loading a new packer.
     *
     * @param  {mixed} _raw Raw server data
     * @param  {string} _mask 'CRU' mask
     * @return {CommonApi} this
     */
    $unwrap: function(_raw, _mask) {
      try {
        packerCache.prepare();
        _raw = this.$$unpack(_raw);
        return this.$decode(_raw, _mask);
      } finally {
        packerCache.clear();
      }
    },

    /**
     * @memberof CommonApi#
     *
     * @description
     *
     * Encode and packs object into a server compatible structure that can be used for PUT/POST operations.
     *
     * ATTENTION: do not override this method to change the object wrapping strategy,
     * instead, check {@link BuilderApi#setPacker} for instruction about loading a new packer.
     *
     * @param  {string} _mask 'CRU' mask
     * @return {string} raw data
     */
    $wrap: function(_mask) {
      var raw = this.$encode(_mask);
      raw = this.$$pack(raw);
      return raw;
    }
  };

  return CommonApi;

}]);
RMModule.factory('RMExtendedApi', ['$q', function($q) {

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
      this.$cancel(); // TODO: find another way of ignoring pending requests that will lead to resolution
      this.$resolved = false;
      return this;
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
      return this.$then(function() { // chain resolution in request promise chain
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
    // nest collection url
    $url: function() {
      return Utils.joinUrl(this.$scope.$url(), this.$partial);
    },

    // record url is nested only for nested resources
    $urlFor: function(_pk) {
      if(this.$target.$isNested()) {
        return this.$fetchUrlFor();
      } else {
        return this.$target.$urlFor(_pk);
      }
    },

    // fetch url is nested
    $fetchUrlFor: function(/* _pk */) {
      return Utils.joinUrl(this.$scope.$url(), this.$partial);
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
     * @description Copyies another object's non-private properties.
     *
     * @param {object} _other Object to merge.
     * @return {RecordApi} self
     */
    $extend: function(_other) {
      for(var tmp in _other) {
        if (_other.hasOwnProperty(tmp) && tmp[0] !== '$') {
          this[tmp] = _other[tmp];
        }
      }
      return this;
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
      this.$super(_raw, _mask || Utils.READ_MASK);
      if(!this.$pk) this.$pk = this.$$inferKey(_raw); // TODO: warn if key changes
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
      var raw = this.$super(_mask || Utils.CREATE_MASK);
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
      var url = this.$scope.$fetchUrlFor ? this.$scope.$fetchUrlFor(this.$pk) : this.$url();
      Utils.assert(!!url, 'Cant $fetch if resource is not bound');

      var request = { method: 'GET', url: url, params: _params };

      this.$dispatch('before-fetch', [request]);
      this.$send(request, function(_response) {
        this.$unwrap(_response.data);
        this.$dispatch('after-fetch', [_response]);
      }, function(_response) {
        this.$dispatch('after-fetch-error', [_response]);
      });

      return this;
    },

    /**
     * @memberof RecordApi#
     *
     * @description Begin a server request to create/update resource.
     *
     * If resource is new and it belongs to a collection and it hasnt been revealed, then it will be revealed.
     *
     * The request's promise can be accessed using the `$asPromise` method.
     *
     * @return {RecordApi} this
     */
    $save: function() {

      var url = this.$scope.$updateUrlFor ? this.$scope.$updateUrlFor(this.$pk) : this.$url(), request;

      if(url) {
        // If bound, update
        request = { method: 'PUT', url: url, data: this.$wrap(Utils.UPDATE_MASK) };
        this.$dispatch('before-update', [request]);
        this.$dispatch('before-save', [request]);
        return this.$send(request, function(_response) {
          this.$unwrap(_response.data);
          this.$dispatch('after-update', [_response]);
          this.$dispatch('after-save', [_response]);
        }, function(_response) {
          this.$dispatch('after-update-error', [_response]);
          this.$dispatch('after-save-error', [_response]);
        });
      } else {
        // If not bound create.
        url = this.$scope.$createUrlFor ? this.$scope.$createUrlFor(this.$pk) : (this.$scope.$url && this.$scope.$url());
        Utils.assert(!!url, 'Cant $create if parent scope is not bound');

        request = { method: 'POST', url: url, data: this.$wrap(Utils.CREATE_MASK) };
        this.$dispatch('before-save', [request]);
        this.$dispatch('before-create', [request]);
        return this.$send(request, function(_response) {
          this.$unwrap(_response.data);

          // reveal item (if not yet positioned)
          if(this.$scope.$isCollection && this.$position === undefined && !this.$preventReveal) {
            this.$scope.$add(this, this.$revealAt);
          }

          this.$dispatch('after-create', [_response]);
          this.$dispatch('after-save', [_response]);
        }, function(_response) {
          this.$dispatch('after-create-error', [_response]);
          this.$dispatch('after-save-error', [_response]);
        });
      }
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
      var url = this.$scope.$destroyUrlFor ? this.$scope.$destroyUrlFor(this.$pk) : this.$url();
      Utils.assert(!!url, 'Cant $destroy if resource is not bound');

      var request = { method: 'DELETE', url: url };

      this.$dispatch('before-destroy', [request]);
      return this.$send(request, function(_response) {

        // call scope callback
        if(this.$scope.$remove) {
          this.$scope.$remove(this);
        }

        this.$dispatch('after-destroy', [_response]);
      }, function(_response) {
        this.$dispatch('after-destroy-error', [_response]);
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
RMModule.factory('RMScopeApi', [function() {

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
      var obj = this.$new(this.$$inferKey(_raw));
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
RMModule.factory('RMBuilder', ['$injector', 'inflector', 'RMUtils', function($injector, inflector, Utils) {

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
   *   URL: 'resource',
   *   NAME: 'resource',
   *   PRIMARY_KEY: '_id',
   *
   *   // ATTRIBUTE MODIFIERS
   *
   *   propWithDefault: { init: 20 },
   *   propWithDecoder: { decode: 'date', chain: true },
   *
   *   // RELATIONS
   *
   *   hasManyRelation: { hasMany: 'Other' },
   *   hasOneRelation: { hasOne: 'Other' }
   *
   *   // METHODS
   *
   *   instanceMethod: function() {
   *   },
   *
   *   '@classMethod': function() {
   *   },
   *
   *   // HOOKS
   *
   *   '~afterCreate': function() {
   *   }
   * });
   * ```
   *
   * Special model configuration variables can be set by refering to the variable name in capitalized form, like this:
   *
   * ```javascript
   * restmod.model({
   *
   *   URL: 'resource',
   *   NAME: 'resource',
   *   PRIMARY_KEY: '_id'
   *
   *  });
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
   *
   * To add/override methods from the record api, a function can be passed to one of the
   * description properties:
   *
   * ```javascript
   * var Model = restmod.model('/', {
   *   sayHello: function() { alert('hello!'); }
   * })
   *
   * // then say hello is available for use at model records
   * Model.$new().sayHello();
   * ```
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
   * To add static/collection methods to the Model, prefix the definition property name with **@**
   * (same as calling {@link BuilderApi#classDefine} at a definition function).
   *
   * ```javascript
   * var Model = restmod.model('/', {
   *   '@sayHello': function() { alert('hello!'); }
   * })
   *
   * // then say hello is available for use at model type and collection.
   * Model.sayHello();
   * Model.$collection().sayHello();
   * ```
   *
   * To add hooks to the Model lifecycle events, prefix the definition property name with **~** and make sure the
   * property name matches the event name (same as calling {@link BuilderApi#on} at a definition function).
   *
   * ```javascript
   * var Model = restmod.model('/', {
   *   '~afterInit': function() { alert('hello!'); }
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
      encode: ['attrEncoder', 'param', 'chain']
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
            _attr = _attr.substring(1);
            if(isFunction(_desc)) this.classDefine(_attr, _desc); // set type and collection by default
            else this.define(_attr, _desc);
            break;
          case '~':
            _attr = inflector.parameterize(_attr.substring(1));
            this.on(_attr, _desc);
            break;
          default:
            if(VAR_RGX.test(_attr)) {
              _attr = inflector.camelize(_attr.toLowerCase());

              // allow packer and renamer to be set as configuration variables
              if(_attr === 'packer') this.setPacker(_desc);
              else if(_attr === 'renamer') this.setRenamer(_desc);
              else this.setProperty(_attr, _desc);
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
     * @return {BuilderApi} self
     */
    attrAsCollection: function(_attr, _model, _url, _source, _inverseOf) {

      this.attrDefault(_attr, function() {

        if(typeof _model === 'string') {
          _model = $injector.get(_model);

          if(_inverseOf) {
            var desc = _model.$$getDescription(_inverseOf);
            if(!desc || desc.relation !== 'belongs_to') {
              $log.warn('Must define an inverse belongsTo relation for inverseOf to work');
              _inverseOf = false; // disable the inverse if no inverse relation is found.
            }
          }
        }

        var self = this,
            scope = this.$buildScope(_model, _url || inflector.parameterize(_attr)),
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
     * @return {BuilderApi} self
     */
    attrAsResource: function(_attr, _model, _url, _source, _inverseOf) {

      this.attrDefault(_attr, function() {

        if(typeof _model === 'string') {
          _model = $injector.get(_model);

          if(_inverseOf) {
            var desc = _model.$$getDescription(_inverseOf);
            if(!desc || desc.relation !== 'belongs_to') {
              $log.warn('Must define an inverse belongsTo relation for inverseOf to work');
              _inverseOf = false; // disable the inverse if no inverse relation is found.
            }
          }
        }

        var scope = this.$buildScope(_model, _url || inflector.parameterize(_attr)),
            inst = _model.$new(null, scope);

        // TODO: provide a way to modify scope behavior just for this relation

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
        if(!this[_attr] || this[_attr].$pk !== _model.$$inferKey(_raw)) {
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
    this.extend('attrAsCollection', EXT.attrAsCollection, ['hasMany', 'path', 'source', 'inverseOf']) // TODO: rename source to map, but disable attrMap if map is used here...
        .extend('attrAsResource', EXT.attrAsResource, ['hasOne', 'path', 'source', 'inverseOf'])
        .extend('attrAsReference', EXT.attrAsReference, ['belongsTo', 'key', 'prefetch'])
        .extend('attrAsReferenceToMany', EXT.attrAsReferenceToMany, ['belongsToMany', 'keys']);
  });

}]);
RMModule.factory('RMModelFactory', ['$injector', 'inflector', 'RMUtils', 'RMScopeApi', 'RMCommonApi', 'RMRecordApi', 'RMCollectionApi', 'RMExtendedApi', 'RMSerializer', 'RMBuilder',
  function($injector, inflector, Utils, ScopeApi, CommonApi, RecordApi, CollectionApi, ExtendedApi, Serializer, Builder) {

  var NAME_RGX = /(.*?)([^\/]+)\/?$/,
      extend = Utils.extendOverriden;

  return function(_baseUrl, _baseChain) {

    _baseUrl = Utils.cleanUrl(_baseUrl);

    var config = {
        primaryKey: 'id',
        urlPrefix: null
      },
      serializer = new Serializer(),
      packer = null,
      defaults = [],                    // attribute defaults as an array of [key, value]
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

    // IDEA: make constructor inaccessible, use separate type for records?
    // * Will ensure proper usage.
    // * Will lose type checking
    function Model(_scope, _pk) {
      this.$type = Model;
      this.$scope = _scope || Model;
      this.$pk = _pk;
      this.$initialize();
    }

    var Collection = Utils.buildArrayType();

    // Collection factory (since a constructor cant be provided...)
    function newCollection(_scope, _params) {
      var col = new Collection();
      col.$type = Model;
      col.$scope = _scope;
      col.$params = _params;
      col.$initialize();
      return col;
    }

    // packer adaptor generator
    function adaptPacker(_fun) {
      return function(_raw) {
        if(packer) {
          // a packer instance must be built every time.
          var inst = typeof packer === 'function' ? new packer(Model) : packer;
          return inst[_fun](_raw, this);
        }

        return _raw;
      };
    }

    // Infer key adaptor.
    function inferKey() {
      return Model.$inferKey.apply(Model, arguments);
    }

    // Get property adaptor.
    function getProperty() {
      return Model.$getProperty.apply(Model, arguments);
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

      // definition chain
      $$chain: [],

      // infer key adaptor
      $$inferKey: inferKey,

      // creates a new model bound by default to the static scope
      $new: function(_pk, _scope) {
        return new Model(_scope || Model, _pk);
      },

      // creates a new collection bound by default to the static scope
      $collection: function(_params, _scope) {
        return newCollection(_scope || Model, _params);
      },

      // gets an attribute description (metadata)
      $$getDescription: function(_attribute) {
        return meta[_attribute];
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
      $inferKey: function(_rawData) {
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
      $getProperty: function(_key, _default) {
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
      $isNested: function() {
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
      $single: function(_url) {
        return new Model({
          $urlFor: function() {
            return config.urlPrefix ? Utils.joinUrl(config.urlPrefix, _url) : _url;
          }
        }, '');
      },

      /**
       * @memberof StaticApi#
       *
       * @description Returns the model base url.
       *
       * @return {string} The base url.
       */
      $url: function() {
        return config.urlPrefix ? Utils.joinUrl(config.urlPrefix, _baseUrl) : _baseUrl;
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
      $name: function(_plural) {
        return _plural ? config.plural : config.name;
      },

      /**
       * @memberof StaticApi#
       *
       * @description Part of the scope interface, provides urls for collection's items.
       *
       * @param {Model} _pk Item key to provide the url to.
       * @return {string|null} The url or nill if item does not meet the url requirements.
       */
      $urlFor: function(_pk) {
        // TODO: move to scope api, unify with collection
        return Utils.joinUrl(this.$url(), _pk);
      },

      /**
       * @memberof StaticApi#
       *
       * @description Modifies model behavior.
       *
       * @params {mixed} _mixins One or more mixins or model definitions.
       * @return {Model} The model
       */
      $mix: function(/* mixins */) {
        builder.chain(arguments);
        this.$$chain.push.apply(this.$$chain, arguments);
        return this;
      },

      /**
       * @memberof StaticApi#
       *
       * @description Simple $dispatch implementation for CommonApi compat.
       *
       * @param  {string} _hook Hook name
       * @param  {array} _args Hook arguments
       * @param  {object} _ctx Hook execution context override
       *
       * @return {Model} The model
       */
      $dispatch: function(_hook, _args, _ctx) {
        var cbs = hooks[_hook], i, cb;
        if(cbs) {
          for(i = 0; !!(cb = cbs[i]); i++) {
            cb.apply(_ctx || this, _args || []);
          }
        }
        return this;
      }

    }, ScopeApi);

    ///// Setup record api

    extend(Model.prototype, {

      // infer key adaptor
      $$inferKey: inferKey,

      // default initialize: loads the default parameter values
      $initialize: function() {
        var tmp;
        for(var i = 0; (tmp = defaults[i]); i++) {
          this[tmp[0]] = (typeof tmp[1] === 'function') ? tmp[1].apply(this) : tmp[1];
        }
      },

      // packer pack adaptor used by $wrap
      $$pack: adaptPacker('pack'),

      // packer unpack adaptor used by $unwrap
      $$unpack: adaptPacker('unpack'),

      // serializer decode adaptor used by $decode
      $decode: function(_raw, _mask) {
        serializer.decode(this, _raw, _mask);
      },

      // serializer encode adaptor used by $encode
      $encode: function(_mask) {
        return serializer.encode(this, _mask);
      },

      // expose getProperty in records
      $getProperty: getProperty
    }, CommonApi, RecordApi, ExtendedApi);

    ///// Setup collection api

    extend(Collection.prototype, {

      // infer key adaptor
      $$inferKey: inferKey,

      // provide record contructor
      $new: function(_pk, _scope) {
        return new Model(_scope || this, _pk);
      },

      // provide collection constructor
      $collection: function(_params, _scope) {
        _params = this.$params ? angular.extend({}, this.$params, _params) : _params;
        return newCollection(_scope || this.$scope, _params);
      },

      // packer pack adaptor used by $wrap
      $$pack: adaptPacker('packMany'),

      // packer unpack adaptor used by $unwrap
      $$unpack: adaptPacker('unpackMany'),

      // expose getProperty in collection
      $getProperty: getProperty

    }, ScopeApi, CommonApi, CollectionApi, ExtendedApi);

    ///// Setup builder

    /**
     * @class SerializerBuilderApi
     *
     * @description
     *
     * Provides an isolated set of methods to customize the serializer behaviour.
     *
     */
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
       * @memberof ExtendedBuilderApi#
       *
       * @description
       *
       * Sets the object "packer", the packer is responsable of providing the object wrapping strategy
       * so it matches the API.
       *
       * The method accepts a packer name, an instance or a packer factory, if the first (preferred)
       * option is used, then a <Name>Packer factory must be available that return an object or factory function.
       *
       * In case of using a factory function, the constructor will be called passing the model type object
       * as first parameter:
       *
       * ```javascript
       * // like this:
       * var packer = new packerFactory(Model);
       * ```
       *
       * ### Packer structure.
       *
       * Custom packers must implement all of the following methods:
       *
       * * **unpack(_rawData, _record):** unwraps data belonging to a single record, must return the unpacked
       * data to be passed to `$decode`.
       * * **unpackMany(_rawData, _collection):** unwraps the data belonging to a collection of records,
       * must return the unpacked data array, each array element will be passed to $decode on each new element.
       * * **pack(_rawData, _record):** wraps the encoded data from a record before is sent to the server,
       * must return the packed data object to be sent.
       * * **packMany(_rawData, _collection):** wraps the encoded data from a collection before is sent to the server,
       * must return the packed data object to be sent.
       *
       * Currently the following builtin strategies are provided:
       * * {@link DefaultPacker} with json root, metadata and links support.
       *
       * @param {string|object} _mode The packer instance, constructor or name
       * @return {BuilderApi} self
       */
      setPacker: function(_packer) {

        if(typeof _packer === 'string') {
          _packer = $injector.get(inflector.camelize(_packer, true) + 'Packer');
        }

        packer = _packer;
        return this;
      },

      /**
       * @memberof BuilderApi#
       *
       * @description Adds methods to the model
       *
       * By default this method adds **record** methods. If called with an object
       * instead of a function it can be used to extend the collection and the type with
       * specific implementations.
       *
       * Usage:
       *
       * ```javascript
       * restmod.mixin(function() {
       *   this.define('myMethod', function() {})
       *       .define('myMethod', {
       *         record: function() {}, // called when record.myMethod is called.
       *         collection: function() {}, // called when collection.myMethod is called.
       *         type: function() {} // called when Model.myMethod is called.
       *       });
       * });
       * ```
       *
       * It is posible to override an existing method using define,
       * if overriden, the old method can be called using `this.$super`
       * inside de new method.
       *
       * @param {string} _name Method name
       * @param {function} _fun Function to define or object with particular implementations
       * @return {BuilderApi} self
       */
      define: function(_name, _fun) {
        if(typeof _fun === 'function') {
          Model.prototype[_name] = Utils.override(Model.prototype[_name], _fun);
        } else {
          if(_fun.type) Model[_name] = Utils.override(Model[_name], _fun.type);
          if(_fun.collection) Collection.prototype[_name] = Utils.override(Collection.prototype[_name], _fun.collection);
          if(_fun.record) Model.prototype[_name] = Utils.override(Model.prototype[_name], _fun.record);
        }
        return this;
      },

      /**
       * @memberof BuilderApi#
       *
       * @description Registers a scope method
       *
       * Same as calling `define('name', { type: fun, collection: fun })`.
       * See {@link BuilderApi#define} for more information.
       *
       * @param {string} _name Method name
       * @param {function} _fun Function to define
       * @return {BuilderApi} self
       */
      classDefine:  function(_name, _fun) {
        this.define(_name, { type: _fun, collection: _fun });
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

RMModule.factory('RMPackerCache', [function() {

  var packerCache;

  /**
   * @class PackerCache
   *
   * @description
   *
   * The packer cache service enables packers to register raw object data that can be then used by
   * supporting relations during the decoding process to preload other related resources.
   *
   * This is specially useful for apis that include linked objects data in external metadata.
   *
   * The packer cache is reset on every response unwrapping so it's not supposed to be used as an
   * application wide cache.
   *
   * ### For packer developers:
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
            cache = packerCache[modelType.$name(true)];

        if(cache && _record.$pk) {
          for(var i = 0, l = cache.length; i < l; i++) {
            if(_record.$pk === modelType.$$inferKey(cache[i])) { // this could be sort of slow? nah
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

  return function() {

    var isArray = angular.isArray;

    // Private serializer attributes
    var masks = {},
        decoders = {},
        encoders = {},
        mapped = {},
        mappings = {},
        renamer = null;

    function isMasked(_name, _mask) {
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
            value = _from[renamer ? renamer.encode(maps[i].path) : maps[i].path];
          }

          if(!maps[i].forced && value === undefined) continue;

          value = decodeProp(value, fullName, _mask, _ctx);
          if(value !== undefined) _to[maps[i].path] = value;
        }
      }

      // implicit mappings
      for(key in _from) {
        if(_from.hasOwnProperty(key)) {

          decodedName = renamer ? renamer.decode(key) : key;
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
            encodedName = renamer ? renamer.encode(key) : key;
            _to[encodedName] = value;
          }
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
              _to[renamer ? renamer.encode(maps[i].path) : maps[i].path] = value;
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

        /**
         * @class SerializerBuilderApi
         *
         * @description
         *
         * Provides an isolated set of methods to customize the serializer behaviour.
         *
         */
        return {
          /**
           * @memberof SerializerBuilderApi#
           *
           * @description Changes the way restmod maps attributes names from records to json api data.
           *
           * This is intended to be used as a way of keeping property naming style consistent accross
           * languajes. By default, property renaming is disabled.
           *
           * As setPacker, this method accepts a renamer name, an instance or a factory, if the first (preferred)
           * option is used, then a <Name>Renamer factory must be available that return an object or factory function.
           *
           * ### Renamer structure
           *
           * Custom renamers must implement all of the following methods:
           *
           * * **decode(_apiName):** transforms an api name to a record name, decoding happens before $-prefixed attribute filtering.
           * * **encode(_recordName):** transforms a record property name to the corresponding api name.
           *
           * If `false` is given, then renaming is disabled.
           *
           * @param {function|false} _value decoding function
           * @return {SerializerBuilderApi} self
           */
          setRenamer: function(_renamer) {

            if(typeof _packer === 'string') {
              _renamer = $injector.get(inflector.camelize(_renamer, true) + 'Renamer');
            }

            renamer = _renamer;
            return this;
          },

          /**
           * @memberof SerializerBuilderApi#
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
           * @return {SerializerBuilderApi} self
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
           * @memberof SerializerBuilderApi#
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
           * @memberof SerializerBuilderApi#
           *
           * @description Assigns a decoding function/filter to a given attribute.
           *
           * @param {string} _name Attribute name
           * @param {string|function} _filter filter or function to register
           * @param {mixed} _filterParam Misc filter parameter
           * @param {boolean} _chain If true, filter is chained to the current attribute filter.
           * @return {SerializerBuilderApi} self
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
           * @memberof SerializerBuilderApi#
           *
           * @description Assigns a encoding function/filter to a given attribute.
           *
           * @param {string} _name Attribute name
           * @param {string|function} _filter filter or function to register
           * @param {mixed} _filterParam Misc filter parameter
           * @param {boolean} _chain If true, filter is chained to the current attribute filter.
           * @return {SerializerBuilderApi} self
           */
          attrEncoder: function(_attr, _filter, _filterParam, _chain) {

            if(typeof _filter === 'string') {
              var filter = $filter(_filter);
              _filter = function(_value) { return filter(_value, _filterParam); };
            }

            encoders[_attr] = _chain ? Utils.chain(encoders[_attr], _filter) : _filter;
            return this;
          }
        };
      }
    };
  };

}]);
RMModule.factory('DefaultPacker', ['inflector', 'RMPackerCache', function(inflector, packerCache) {

  /**
   * @class DefaultPacker
   *
   * @description
   *
   * Simple packer implementation that attempts to cover the standard proposed by
   * [active_model_serializers]{@link https://github.com/rails-api/active_model_serializers}.
   *
   * This is a simplified version of the wrapping structure recommented by the jsonapi.org standard,
   * it supports side loaded associated resources (via supporting relations) and metadata extraction.
   *
   * To activate use
   *
   * ```javascript
   * PACKER: 'default'
   * ```
   *
   * ### Json root
   *
   * By default the packer will use the singular model name as json root for single resource requests
   * and pluralized name for collection requests. Make sure the model name is correctly set.
   *
   * To override the name used by the packer set the JSON_ROOT_SINGLE and JSON_ROOT_MANY variables.
   * Or set JSON_ROOT to override both.
   *
   * ### Side loaded resources
   *
   * By default the packer will look for links to other resources in the 'linked' root property, you
   * can change this by setting the JSON_LINKS variable. To use the root element as link source
   * use `JSON_LINKS: true`. To skip links processing, set it to false.
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
   * To change the metadata source property set the JSON_META property to the desired name, set
   * it to '.' to capture the entire raw response or set it to false to skip metadata. It can also be set
   * to a function, for custom processsing.
   *
   * @property {mixed} single The expected single resource wrapper property name
   * @property {object} plural The expected collection wrapper property name
   * @property {mixed} links The links repository property name
   * @property {object} meta The metadata repository property name
   *
   */
  function Packer(_model) {
    this.single = _model.$getProperty('jsonRootSingle') || _model.$getProperty('jsonRoot') || _model.$getProperty('name');
    this.plural = _model.$getProperty('jsonRootMany') || _model.$getProperty('jsonRoot') || _model.$getProperty('plural');

    // Special options
    this.links = _model.$getProperty('jsonLinks', 'linked');
    this.meta = _model.$getProperty('jsonMeta', 'meta');
    // TODO: use plural for single resource option.
  }

  // process metadata
  function processMeta(_packer, _raw, _skip) {
    var metaDef = _packer.meta;
    if(typeof metaDef === 'string') {
      if(metaDef === '.') {
        var meta = {};
        for(var key in _raw) {
          if(_raw.hasOwnProperty(key) && key !== _skip && key !== _packer.links) { // skip links and object root if extracting from root.
            meta[key] = _raw[key];
          }
        }
        return meta;
      } else {
        return _raw[metaDef];
      }
    } else if(typeof metaDef === 'function') {
      return metaDef(_raw);
    }
  }

  // process links and stores them in the packer cache
	function processLinks(_packer, _raw, _skip) {
    var source = _packer.links === '.' ? _raw : _raw[_packer.links];
    if(!source) return;

    // feed packer cache
    for(var key in source) {
      if(source.hasOwnProperty(key) && key !== _skip) {
        var cache = source[key];
        // TODO: check that cache is an array.
        packerCache.feed(key, cache);
      }
    }
  }

  Packer.prototype = {

    unpack: function(_unpackedRaw, _record) {
      if(this.meta) _record.$metadata = processMeta(this, _unpackedRaw, this.single);
      if(this.links) processLinks(this, _unpackedRaw, this.single);
      return _unpackedRaw[this.single];
    },

    unpackMany: function(_unpackedRaw, _collection) {
      if(this.meta) _collection.$metadata = processMeta(this, _unpackedRaw, this.plural);
      if(this.links) processLinks(this, _unpackedRaw, this.plural);
      return _unpackedRaw[this.plural];
    },

    pack: function(_raw) {
      return _raw; // no special packing
    },

    packMany: function(_raw) {
      return _raw; // no special packing
    }
  };

  return Packer;

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