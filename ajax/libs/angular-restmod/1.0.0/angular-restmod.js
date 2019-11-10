/**
 * API Bound Models for AngularJS
 * @version v1.0.0 - 2014-09-10
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