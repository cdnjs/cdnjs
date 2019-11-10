/**
 * API Bound Models for AngularJS
 * @version v0.16.2 - 2014-08-18
 * @link https://github.com/angular-platanus/restmod
 * @author Ignacio Baixas <iobaixas@gmai.com>
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

  var BASE_CHAIN = []; // The base mixin chain

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
     * Base model chain is by default empty, all mixins added to the chain are
     * prepended to every generated model.
     *
     * Usage:
     *
     * ```javascript
     * $provider.pushModelBase('ChangeModel', 'LazyRelations', 'ThrottledModel')
     * ```
     */
    pushModelBase: function(/* _mix_names */) {
      Array.prototype.push.apply(BASE_CHAIN, arguments);
      return this;
    },

    /**
     * @class restmod
     *
     * @description
     *
     * The restmod service provides factory methods for the different restmod consumables.
     */
    $get: ['RMModelFactory', 'RMBuilder', function(factory, Builder) {

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
         * the model is *anonymous* and can only be used in another model context.
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

          // Generate a new model type.
          var Model = factory(_baseUrl);

          // Load builder and execute it.
          var builder = new Builder(Model);
          builder.loadMixinChain(BASE_CHAIN);
          builder.loadMixinChain(Model.$chain = arraySlice.call(arguments, 1));

          return Model;
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
         * A mixin can also be passed to the {@link restmodProvider#pushModelBase} method to provide
         * a base behavior for all generated models.
         *
         * @param {mixed} _mix One or more mixins, description objects or description blocks.
         * @return {object} The mixin
         */
        mixin: function(/* _mix */) {
          return { $isAbstract: true, $chain: arraySlice.call(arguments, 0) };
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

RMModule.factory('RMBuilder', ['$injector', '$parse', '$filter', '$inflector', 'RMUtils', function($injector, $parse, $filter, $inflector, Utils) {

  // TODO: add urlPrefix option

  var forEach = angular.forEach,
      bind = angular.bind,
      isObject = angular.isObject,
      isArray = angular.isArray,
      isFunction = angular.isFunction;

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
   * With the exception of properties starting with a special character (**@** or **~**),
   * each property in the definition object asigns a behavior to the same named property
   * in a model's record.
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
   * * `serialize` sets the encoder and decoder beaviour for an attribute, maps to {@link BuilderApi#attrSerializer}
   * * `hasMany` sets a one to many hierarchical relation under the attribute name, maps to {@link BuilderApi#attrAsCollection}
   * * `hasOne` sets a one to one hierarchical relation under the attribute name, maps to {@link BuilderApi#attrAsResource}
   * * `belongsTo` sets a one to one reference relation under the attribute name, maps to {@link BuilderApi#attrAsReference}
   * * `belongsToMany` sets a one to many reference relation under the attribute name, maps to {@link BuilderApi#attrAsReferenceToMany}
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
  function BuilderDSL(_targetModel) {
    this.$$m = _targetModel;
    this.$$s = _targetModel.$$getSerializer();
    this.$$mappings = {
      init: ['attrDefault'],
      mask: ['attrMask'],
      ignore: ['attrMask'],
      map: ['attrMap'],
      decode: ['attrDecoder', 'param', 'chain'],
      encode: ['attrEncoder', 'param', 'chain'],
      serialize: ['attrSerializer'],
      // relations
      hasMany: ['attrAsCollection', 'path', 'source', 'inverseOf'], // TODO: rename source to map, but disable attrMap if map is used here...
      hasOne: ['attrAsResource', 'path', 'source', 'inverseOf'],
      belongsTo: ['attrAsReference', 'key', 'prefetch'],
      belongsToMany: ['attrAsReferenceToMany', 'keys']
    };
  }

  BuilderDSL.prototype = {

    /**
     * @memberof BuilderApi#
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
      this.$$m.$$setUrlPrefix(_prefix);
      return this;
    },

    /**
     * @memberof BuilderApi#
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
      this.$$m.$$setPrimaryKey(_key);
      return this;
    },

    /**
     * @memberof BuilderApi#
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
     * @return {BuilderApi} self
     */
    setNameDecoder: function(_decoder) {
      this.$$s.setNameDecoder(_decoder);
      return this;
    },

    /**
     * @memberof BuilderApi#
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
     * @return {BuilderApi} self
     */
    setNameEncoder: function(_encoder) {
      this.$$s.setNameEncoder(_encoder);
      return this;
    },

    /**
     * @memberof BuilderApi#
     *
     * @description Disables renaming alltogether
     *
     * @return {BuilderApi} self
     */
    disableRenaming: function() {
      return this
        .setNameDecoder(false)
        .setNameEncoder(false);
    },

    /**
     * @memberof BuilderApi#
     *
     * @description
     *
     * Sets the object "packer", the packer is responsable of providing the object wrapping strategy
     * so it matches the API.
     *
     * The method accepts a packer name, an instance or a packer contructor, if the first (preferred)
     * option is used, then a <Name>Packer factory must be available that return an object or a constructor.
     *
     * In case of using a constructor function, the constructor will be called passing the model type
     * as first parameter:
     *
     * ```javascript
     * // like this:
     * var packer = new MyPacker(theModelType);
     * ```
     *
     * ### Packer structure.
     *
     * Custom packers must implement the following methods:
     *
     * * **unpack(_rawData, _record):** unwraps data belonging to a single record, must return the unpacked
     * data to be passed to `$decode`.
     * * **unpackMany(_rawData, _collection):** unwraps the data belonging to a collection of records,
     * must return the unpacked data array, each array element will be passed to $decode on each new element.
     * * **pack(_rawData, _record):** wraps the encoded data from a record before is sent to the server,
     * must return the packed data object to be sent.
     *
     * Currently the following builtin strategies are provided:
     * TODO: provide builtin strategies!
     *
     * @param {string|object} _mode The packer instance, constructor or name
     * @return {BuilderApi} self
     */
    setPacker: function(_packer) {
      this.$$m.$$setPacker(_packer);
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
          this.$$mappings[_mapping[0]] = _mapping;
          _mapping[0] = _name;
        }
      } else Utils.extendOverriden(this, _name);
      return this;
    },

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
          map = this.$$mappings[key];
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
      this.$$m.$$setDefault(_attr, _init);
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
      this.$$s.setMask(_attr, _mask);
      return this;
    },

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
    attrMap: function(_attr, _serverName) {
      this.$$s.setMapping(_attr, _serverName);
      return this;
    },

    /**
     * @memberof BuilderApi#
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
        _serializer = $injector.get($inflector.camelize(_serializer, true) + 'Serializer');
      }

      // TODO: if(!_serializer) throw $setupError
      if(isFunction(_serializer)) _serializer = _serializer(_opt);
      if(_serializer.decode) this.$$s.setDecoder(_name, bind(_serializer, _serializer.decode));
      if(_serializer.encode) this.$$s.setEncoder(_name, bind(_serializer, _serializer.encode));
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
    attrDecoder: function(_name, _filter, _filterParam, _chain) {
      this.$$s.setDecoder(_name, _filter, _filterParam, _chain);
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
    attrEncoder: function(_name, _filter, _filterParam, _chain) {
      this.$$s.setEncoder(_name, _filter, _filterParam, _chain);
      return this;
    },

    /**
     * @memberof BuilderApi#
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
      this.$$m.$$setDefault(_attr, function() {

        if(typeof _model === 'string') {
          _model = $injector.get(_model);

          if(_inverseOf) {
            _model.$$getSerializer().setMask(_inverseOf, Utils.WRITE_MASK);
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
      });

      if(_source || _url) this.$$s.setMapping(_attr, _source || _url);
      this.$$s.setDecoder(_attr, function(_raw) {
        this[_attr].$reset().$feed(_raw);
      });
      this.$$s.setMask(_attr, Utils.WRITE_MASK);

      return this;
    },

    /**
     * @memberof BuilderApi#
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

      this.$$m.$$setDefault(_attr, function() {

        if(typeof _model === 'string') {
          _model = $injector.get(_model);

          if(_inverseOf) {
            _model.$$getSerializer().setMask(_inverseOf, Utils.WRITE_MASK);
          }
        }

        var scope = this.$buildScope(_model, _url || $inflector.parameterize(_attr)),
            inst = _model.$new(null, scope);

        // TODO: provide a way to modify scope behavior just for this relation

        if(_inverseOf) {
          inst[_inverseOf] = this;
        }

        return inst;
      });

      if(_source || _url) this.$$s.setMapping(_attr, _source || _url);
      this.$$s.setDecoder(_attr, function(_raw) {
        this[_attr].$decode(_raw);
      });
      this.$$s.setMask(_attr, Utils.WRITE_MASK);

      return this;
    },

    /**
     * @memberof BuilderApi#
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
     * so the type should not be anonymous.
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

      this.$$m.$$setDefault(_attr, null);
      this.$$s.setMask(_attr, Utils.WRITE_MASK);

      function loadModel() {
        if(typeof _model === 'string') {
          _model = $injector.get(_model);
        }
      }

      // TODO: the following code assumes that attribute is at root level! (when uses this[_attr] or this[_attr + 'Id'])

      // inline data handling
      this.$$s.setDecoder(_attr, function(_raw) {
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
        this.$$s.setMapping(_attr + 'Id', _key || '*', true); // use dummy  set a mapping if explicit key is given.
        this.$$s.setDecoder(_attr + 'Id', function(_value) {
          if(_value === undefined) return;
          if(!this[_attr] || this[_attr].$pk !== _value) {
            if(_value !== null && _value !== false) {
              loadModel();
              this[_attr] = _model.$new(_value);
              if(_prefetch) this[_attr].$fetch();
            } else {
              this[_attr] = null;
            }
          }
        });

        this.$$s.setEncoder(_attr + 'Id', function() {
          return this[_attr] ? this[_attr].$pk : null;
        });
      }

      return this;
    },

    /**
     * @memberof BuilderApi#
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
     * so the referenced type should not be anonymous.
     *
     * When a object containing a belongsToMany reference is encoded for a server request, only the primary key value is sent for each object.
     *
     * @param {string}  _name Attribute name
     * @param {string|object} _model Other model, supports a model name or a direct reference.
     * @param {string} _keys Server name for the property that holds the referenced keys in response and request.
     * @return {BuilderApi} self
     */
    attrAsReferenceToMany: function(_attr, _model, _keys) {

      this.$$m.$$setDefault(_attr, function() { return []; });
      this.$$s.setMask(_attr, Utils.WRITE_MASK);

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
            _ref.push(_model.$new(_raw[i]));
          }
        }
      }

      // inline data handling
      this.$$s.setDecoder(_attr, function(_raw) {
        // TODO: if _keys == _attr then inbound data will be processed twice!
        if(_raw) processInbound(_raw, this[_attr]);
      });

      // foreign key handling
      if(_keys !== false) {
        this.$$s.setMapping(_attr + 'Ids', _keys || '*', true); // TODO: $inflector.singularize(_attr)
        this.$$s.setDecoder(_attr + 'Ids', function(_raw) {
          if(_raw) processInbound(_raw, this[_attr]);
        });

        this.$$s.setEncoder(_attr + 'Ids', function() {
          var result = [], others = this[_attr];
          for(var i = 0, l = others.length; i < l; i++) {
            result.push(others[i].$pk);
          }
          return result;
        });
      }

      return this;
    },

    /**
     * @memberof BuilderApi#
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
     * @return {BuilderApi} self
     */
    define: function(_name, _fun) {
      if(typeof _name === 'string') {
        this.$$m.prototype[_name] = Utils.override(this.$$m.prototype[_name], _fun);
      } else {
        Utils.extendOverriden(this.$$m.prototype, _name);
      }
      return this;
    },

    /**
     * @memberof BuilderApi#
     *
     * @description Registers a class method
     *
     * It is posible to override an existing method using define,
     * if overriden, the old method can be called using `this.$super`
     * inside de new method.
     *
     * @param {string} _name Method name
     * @param {function} _fun Function to define
     * @return {BuilderApi} self
     */
    classDefine: function(_name, _fun) {
      this.$$m.$$addScopeMethod(_name, _fun);
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
      this.$$m.$on(_hook, _do);
      return this;
    },

    /// Experimental modifiers

    /**
     * @memberof BuilderApi#
     *
     * @description Expression attributes are evaluated every time new data is fed to the model.
     *
     * @param {string}  _name Attribute name
     * @param {string} _expr Angular expression to evaluate
     * @return {BuilderApi} self
     */
    attrExpression: function(_name, _expr) {
      var filter = $parse(_expr);
      this.$$m.$on('after-feed', function() {
        this[_name] = filter(this);
      });
      return this;
    }
  };

  function Builder(_target) {
    this.dsl = new BuilderDSL(_target);
  }

  Builder.prototype = {
    // use the builder to process a mixin chain
    loadMixinChain: function(_chain) {
      for(var i = 0, l = _chain.length; i < l; i++) {
        this.loadMixin(_chain[i]);
      }
    },

    // use the builder to process a single mixin
    loadMixin: function(_mix) {
      if(_mix.$chain) {
        this.loadMixinChain(_mix.$chain);
      } else if(typeof _mix === 'string') {
        this.loadMixin($injector.get(_mix));
      } else if(isArray(_mix) || isFunction(_mix)) {
        // TODO: maybe invoke should only be called for BASE_CHAIN functions
        $injector.invoke(_mix, this.dsl, { $builder: this.dsl });
      } else this.dsl.describe(_mix);
    }
  };

  return Builder;

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
   * * after-feed (only called if no errors)
   * * after-fetch-many[-error]
   *
   * @property {boolean} $isCollection Helper flag to separate collections from the main type
   * @property {object} $scope The collection scope (hierarchical scope, not angular scope)
   * @property {object} $params The collection query parameters
   * @property {boolean} $resolved The collection resolve status
   *
   */
  return {

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
      // force item unscoping if model is not anonymous (maybe make this optional)
      var baseUrl = this.$type.$url();
      return Utils.joinUrl(baseUrl ? baseUrl : this.$url(), _pk);
    },

    /**
     * @memberof CollectionApi#
     *
     * @description Feeds raw collection data into the collection, marks collection as $resolved
     *
     * This method is for use in collections only.
     *
     * @param {array} _raw Data to add
     * @return {CollectionApi} self
     */
    $feed: function(_raw) {

      if(!_raw || !angular.isArray(_raw)) {
        throw new Error('Error in resource {0} configuration. Expected response to be array');
      }

      if(!this.$resolved) this.length = 0; // reset contents if not resolved.
      for(var i = 0, l = _raw.length; i < l; i++) {
        this.$buildRaw(_raw[i]).$reveal(); // build and disclose every item.
      }
      this.$resolved = true;
      return this;
    },

    /**
     * @memberof CollectionApi#
     *
     * @description
     *
     * Unpacks and decode raw data from a server generated structure into this collection.
     *
     * ATTENTION: do not override this method to change the object wrapping strategy,
     * instead, check {@link BuilderApi#setPacker} for instruction about loading a new packer.
     *
     * @param  {mixed} _raw Raw server data
     * @return {CollectionApi} this
     */
    $unwrap: function(_raw) {
      _raw = this.$$unpack(_raw);
      return this.$feed(_raw);
    },

    /**
     * @memberof CollectionApi#
     *
     * @description Resets the collection's resolve status.
     *
     * This method is for use in collections only.
     *
     * @return {CollectionApi} self
     */
    $reset: function() {
      this.$cancel(); // cancel pending requests.
      this.$resolved = false;
      return this;
    },

    /**
     * @memberof CollectionApi#
     *
     * @description Begin a server request to populate collection. This method does not
     * clear the collection contents, use `$refresh` to reset and fetch.
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
     * @description Resets and fetches content.
     *
     * @param  {object} _params `$fetch` params
     * @return {CollectionApi} self
     */
    $refresh: function(_params) {
      return this.$reset().$fetch(_params);
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
RMModule.factory('RMCommonApi', ['$http', '$q', function($http, $q) {

  var EMPTY_ARRAY = [];

  /**
   * @class CommonApi
   *
   * @description
   *
   * Provides a common framework for other restmod components.
   *
   * This API is included in {@link RecordApi}, {@link CollectionApi} and {@link StaticApi},
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
    $decorate: function(_hooks, _fun) {

      var oldDispatcher = this.$$dsp;

      // set new dispatcher
      this.$$dsp = (typeof _hooks === 'function' || !_hooks) ? _hooks : function(_hook, _args, _ctx) {
        if(oldDispatcher) oldDispatcher.apply(null, arguments);
        var extraCb = _hooks[_hook];
        if(extraCb) extraCb.apply(_ctx, _args || EMPTY_ARRAY);
      };

      try {
        return _fun.call(this);
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
      if(!this.$promise) this.$promise = $q.when(this);
      this.$promise = this.$promise.then(_success, _error);
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
      if(!this.$promise) this.$promise = $q.when(this);
      this.$promise = this.$promise['finally'](_cb);
      return this;
    },

    // Communication API

    /**
     * @memberof CommonApi#
     *
     * @description Low level communication method, wraps the $http api.
     *
     * This method is responsible for request queuing and lifecycle. This method guaraties that:
     * * The $promise property will always contain the last request promise right after calling the method.
     * * Pending requests will be available at the $pending property (array)
     * * Current request execution status can be queried using the $status property (current request, not last).
     * * The $status property refers to the current request inside $send `_success` and `_error` callbacks.
     *
     * @param {object} _options $http options
     * @param {function} _success sucess callback (sync)
     * @param {function} _error error callback (sync)
     * @return {CommonApi} self
     */
    $send: function(_options, _success, _error) {

      var self = this, dsp = this.$dispatcher();

      this.$pending = (this.$pending || []);
      this.$pending.push(_options);

      function performRequest() {

        // if request was canceled, then just return a resolved promise
        if(_options.canceled) {
          self.$pending.splice(0, 1);
          self.$status = 'canceled';
          return $q.when(self); // it is necesary to return a promise to be consistent.
        }

        self.$decorate(dsp, function() {
          this.$response = null;
          this.$status = 'pending';
          this.$dispatch('before-request', [_options]);
        });

        var $promise = $http(_options).then(function(_response) {

          return self.$decorate(dsp, function() {

            this.$pending.splice(0, 1);
            if(this.$promise === $promise) this.$promise = undefined; // reset promise to avoid unnecessary waiting

            if(_options.canceled) {
              // if request was canceled during request, ignore post request actions.
              this.$status =  'canceled';
            } else {
              this.$status = 'ok';
              this.$response = _response;

              this.$dispatch('after-request', [_response]);
              if(_success) _success.call(this, _response);
            }

            return this;
          });

        }, function(_response) {

          return self.$decorate(dsp, function() {

            this.$pending.splice(0, 1);
            if(this.$promise === $promise) this.$promise = undefined; // reset promise to avoid unnecessary waiting

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

        return $promise;
      }

      // chain requests, do not allow parallel request per resource.
      // IDEA: allow various request modes: parallel, serial, just one (discard), etc

      if(this.$promise) {
        this.$promise = this.$promise.then(performRequest, performRequest);
      } else {
        this.$promise = performRequest();
      }

      return this;
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

      // reset request
      this.$promise = null;
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
    }
  };

  return CommonApi;

}]);
RMModule.factory('RMModelFactory', ['$injector', '$inflector', 'RMUtils', 'RMScopeApi', 'RMCommonApi', 'RMRecordApi', 'RMCollectionApi', 'RMSerializerFactory', function($injector, $inflector, Utils, ScopeApi, CommonApi, RecordApi, CollectionApi, buildSerializer) {

  return function(_identity) {

    var extend = angular.extend;

    // Private model attributes
    var urlPrefix = null,
        baseUrl = null,
        name = null,
        primaryKey = 'id',
        packer = null,
        serializer = buildSerializer(),
        defaults = [];

    // setup model identity
    if(_identity)
    {
      if(typeof _identity === 'string') {
        baseUrl = _identity;
      } else {
        baseUrl = _identity.url;
        name = _identity.name;
      }

      // infer name from url.
      if(!name && baseUrl) {
        name = baseUrl.replace(/(.*?)([^\/]+$)/, '$2'); // TODO: make sure name is singular -> $inflector.singularize(this.$$name)
      }
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
      col.$isCollection = true;
      col.$type = Model;
      col.$scope = _scope;
      col.$params = _params;
      col.$resolved = false;
      // this.$initialize();
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

      // sets the model url prefix
      $$setUrlPrefix: function(_prefix) {
        urlPrefix = _prefix;
      },

      // sets the model primary key
      $$setPrimaryKey: function(_key) {
        primaryKey = _key;
      },

      // gets the model serializer
      $$getSerializer: function() {
        return serializer;
      },

      // sets the model packer
      $$setPacker: function(_packer) {
        if(typeof _packer === 'string') {
          _packer = $injector.get($inflector.camelize(_packer, true) + 'Packer');
        }

        if(typeof _packer === 'function') {
          _packer = new _packer(Model);
        }

        packer = _packer;
      },

      // sets an attrinute default value
      $$setDefault: function(_attr, _default) {
        defaults.push([_attr, _default]);
      },

      // registers a new scope method (available at type and collection)
      $$addScopeMethod: function(_name, _fun) {
        if(typeof _name === 'string') {
          Collection.prototype[_name] = Utils.override(Collection.prototype[_name], _fun);
          Model[_name] = Utils.override(Model[_name], _fun);
        } else {
          Utils.extendOverriden(Collection.prototype, _name);
          Utils.extendOverriden(Model, _name);
        }
      },

      // extracts the primary key from a raw data record
      $$inferKey: function(_rawData) {
        if(!_rawData || typeof _rawData[primaryKey] === 'undefined') return null;
        return _rawData[primaryKey];
      },

      // creates a new model bound by default to the static scope
      $$new: function(_pk, _scope) {
        return new Model(_scope || Model, _pk);
      },

      // creates a new collection bound by default to the static scope
      $$collection: function(_params, _scope) {
        return newCollection(_scope || Model, _params);
      },

      /**
       * @memberof StaticApi#
       *
       * @description
       *
       * Gets the model primary key
       *
       * @return {mixed} model primary key
       */
      $getPrimaryKey: function() {
        return primaryKey;
      },

      /**
       * @memberof StaticApi#
       *
       * @description Returns true if model is anonymous.
       *
       * An anonymous model can only be used as a nested resource (using relations)
       *
       * @return {boolean} true if model is anonymous.
       */
      $anonymous: function() {
        return !baseUrl;
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
            return urlPrefix ? Utils.joinUrl(urlPrefix, _url) : _url;
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
        return urlPrefix ? Utils.joinUrl(urlPrefix, baseUrl) : baseUrl;
      },

      /**
       * @memberof StaticApi#
       *
       * @description Returns the model name.
       *
       * Returns the name given The name can be given when  is infered from the base url or
       *
       * @return {string} The base url.
       */
      $name: function() {
        return name;
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
    }, ScopeApi, CommonApi);

    ///// Setup record api

    extend(Model.prototype, {

      // provide key inferenc
      $$inferKey: Model.$$inferKey,

      // loads the default parameter values
      $$loadDefaults: function() {
        var tmp;
        for(var i = 0; (tmp = defaults[i]); i++) {
          this[tmp[0]] = (typeof tmp[1] === 'function') ? tmp[1].apply(this) : tmp[1];
        }
      },

      // pack adaptor used by $wrap
      $$pack: function(_raw) {
        if(packer) {
          _raw = packer.pack(_raw, this);
        }
        return _raw;
      },

      // unpack adaptor used by $unwrap
      $$unpack: function(_raw) {
        if(packer) {
          _raw = packer.unpack(_raw, this);
        }
        return _raw;
      },

      // gets the model default serializer
      $$getSerializer: function() {
        return serializer;
      }
    }, RecordApi, CommonApi);

    ///// Setup collection api

    extend(Collection.prototype, {

      // provide key inference
      $$inferKey: Model.$$inferKey,

      // provide record contructor
      $$new: function(_pk, _scope) {
        return new Model(_scope || this, _pk);
      },

      // provide collection constructor
      $$collection: function(_params, _scope) {
        _params = this.$params ? extend({}, this.$params, _params) : _params;
        return newCollection(_scope || this.$scope, _params);
      },

      // provide unpack function
      $$unpack: function(_raw) {
        if(packer) {
          _raw = packer.unpackMany(_raw, this);
        }
        return _raw;
      },
    }, CollectionApi, ScopeApi, CommonApi);

    return Model;
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
    this.$partial = _partial;
  };

  RelationScope.prototype = {
    // nest collection url
    $url: function() {
      return Utils.joinUrl(this.$scope.$url(), this.$partial);
    },

    // record url is nested only for anonymous resources
    $urlFor: function(_pk) {
      if(this.$target.$anonymous()) {
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
      this.$$loadDefaults();

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
      this.$$getSerializer().decode(this, _raw, _mask || Utils.READ_MASK);
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
      var raw = this.$$getSerializer().encode(this, _mask || Utils.CREATE_MASK);
      this.$dispatch('before-render', [raw]);
      return raw;
    },

    /**
     * @memberof RecordApi#
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
     * @return {RecordApi} this
     */
    $unwrap: function(_raw, _mask) {
      _raw = this.$$unpack(_raw);
      return this.$decode(_raw, _mask);
    },

    /**
     * @memberof RecordApi#
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
    },

    /**
     * @memberof RecordApi#
     *
     * @description Begin a server request for updated resource data.
     *
     * The request's promise is provided as the $promise property.
     *
     * @param {object} _params Optional list of params to be passed to object request.
     * @return {RecordApi} this
     */
    $fetch: function(_params) {
      // verify that instance has a bound url
      var url = this.$scope.$fetchUrlFor ? this.$scope.$fetchUrlFor(this.$pk) : this.$url();
      if(!url) throw new Error('Cannot fetch an unbound resource');

      var request = { method: 'GET', url: url, params: _params };

      this.$dispatch('before-fetch', [request]);
      return this.$send(request, function(_response) {
        this.$unwrap(_response.data);
        this.$dispatch('after-fetch', [_response]);
      }, function(_response) {
        this.$dispatch('after-fetch-error', [_response]);
      });
    },

    /**
     * @memberof RecordApi#
     *
     * @description Begin a server request to create/update resource.
     *
     * If resource is new and it belongs to a collection and it hasnt been revealed, then it will be revealed.
     *
     * The request's promise is provided as the $promise property.
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
        if(!url) throw new Error('Create is not supported by this resource');
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
     * The request's promise is provided as the $promise property.
     *
     * @return {RecordApi} this
     */
    $destroy: function() {
      var url = this.$scope.$destroyUrlFor ? this.$scope.$destroyUrlFor(this.$pk) : this.$url();
      if(!url) throw new Error('Cannot destroy an unbound resource');
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
      return this.$$new(_pk, _scope);
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
    $buildRaw: function(_raw) {
      var obj = this.$new(this.$$inferKey(_raw));
      obj.$decode(_raw);
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
      return this.$new(_pk).$fetch(_params);
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
      return this.$$collection(_params, _scope);
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
RMModule.factory('RMSerializerFactory', ['$injector', '$inflector', '$filter', 'RMUtils', function($injector, $inflector, $filter, Utils) {

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
        nameDecoder = $inflector.camelize,
        nameEncoder = function(_v) { return $inflector.parameterize(_v, '_'); };

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
            value = _from[nameEncoder ? nameEncoder(maps[i].path) : maps[i].path];
          }

          if(!maps[i].forced && value === undefined) continue;

          value = decodeProp(value, fullName, _mask, _ctx);
          if(value !== undefined) _to[maps[i].path] = value;
        }
      }

      // implicit mappings
      for(key in _from) {
        if(_from.hasOwnProperty(key) && key[0] !== '$') {
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

          decodedName = nameDecoder ? nameDecoder(key) : key;

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
            encodedName = nameEncoder ? nameEncoder(key) : key;
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
              _to[nameEncoder ? nameEncoder(maps[i].path) : maps[i].path] = value;
            }
          }
        }
      }
    }

    function encodeProp(_value, _name, _mask, _ctx) {
      var filter = encoders[_name], result = _value;

      if(filter) {
        result = filter.call(_ctx, _value);
      } else if(_value != null && typeof _value === 'object' && typeof _value.toJSON !== 'function') {
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

      // sets the model name decoder
      setNameDecoder: function(_fun) {
        nameDecoder = _fun;
      },

      // sets the model name encoder
      setNameEncoder: function(_fun) {
        nameEncoder = _fun;
      },

      // specifies a single server to client property mapping
      setMapping: function(_attr, _serverPath, _forced) {
        // extract parent node from client name:
        var index = _attr.lastIndexOf('.'),
            node = index !== -1 ? _attr.substr(0, index) : '',
            leaf = index !== -1 ? _attr.substr(index + 1) : _attr;

        mapped[_attr] = true;

        var nodes = (mappings[node] || (mappings[node] = []));
        nodes.push({ path: leaf, map: _serverPath === '*' ? null : _serverPath.split('.'), mapPath: _serverPath, forced: _forced });
      },

      // sets an attrinute mask
      setMask: function(_attr, _mask) {
        if(!_mask) {
          delete masks[_attr];
        } else {
          masks[_attr] = _mask;
        }
      },

      // sets an attrinute decoder
      setDecoder: function(_attr, _filter, _filterParam, _chain) {

        if(typeof _filter === 'string') {
          var filter = $filter(_filter);
          // TODO: if(!_filter) throw $setupError
          _filter = function(_value) { return filter(_value, _filterParam); };
        }

        decoders[_attr] = _chain ? Utils.chain(decoders[_attr], _filter) : _filter;
      },

      // sets an attribute encoder
      setEncoder: function(_attr, _filter, _filterParam, _chain) {

        if(typeof _filter === 'string') {
          var filter = $filter(_filter);
          // TODO: if(!_filter) throw $setupError
          _filter = function(_value) { return filter(_value, _filterParam); };
        }

        encoders[_attr] = _chain ? Utils.chain(encoders[_attr], _filter) : _filter;
      },

      // decodes a raw record into a record
      decode: function(_record, _raw, _mask) {
        decode(_raw, _record, '', _mask, _record);
      },

      // encodes a record, returning a raw record
      encode: function(_record, _mask) {
        var raw = {};
        encode(_record, raw, '', _mask, _record);
        return raw;
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
RMModule.factory('RMUtils', [function() {

  return {

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
     * Simple url joining, returns null if _head or _tail is null.
     *
     * @param  {string} _head Url prefix
     * @param  {string} _tail Url suffix
     * @return {string} Resulting url
     */
    joinUrl: function(_head, _tail) {
      if(!_head || !_tail) return null;
      return (_head+'').replace(/\/$/, '') + '/' + (_tail+'').replace(/(\/$|^\/)/g, '');
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
    extendOverriden: function(_target, _other) {
      for(var key in _other) {
        if(_other.hasOwnProperty(key)) {
          _target[key] = this.override(_target[key], _other[key]);
        }
      }
    },
    /**
     * @memberof Utils
     *
     * @description
     *
     * Generates a new array type, handles platform specifics.
     *
     * Based on the awesome blog post of Dean Edwards: http://dean.edwards.name/weblog/2006/11/hooray/
     *
     * @return {object} Independent array type.
     */
    buildArrayType: function() {

      var arrayType, ieMode = true;

      if(ieMode)
      {
        // create an <iframe>.
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        // write a script into the <iframe> and steal its Array object.
        frames[frames.length - 1].document.write('<script>parent.RestmodArray = Array;<\/script>');

        // take the array object and move it to local context.
        arrayType = window.RestmodArray;
        delete window.RestmodArray;

        // remove iframe (need to test this a little more)
        document.body.removeChild(iframe);

      } else {
        arrayType = function() {  }; // a constructor cant be provided
        arrayType.prototype = [];
      }

      return arrayType;
    }
  };
}]);
})(angular);