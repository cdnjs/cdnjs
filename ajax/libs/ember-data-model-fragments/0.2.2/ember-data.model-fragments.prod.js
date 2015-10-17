/*!
 * @overview  Ember Data Model Fragments
 * @copyright Copyright 2014 Lytics Inc. and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/lytics/ember-data.model-fragments/master/LICENSE
 * @version   0.2.2
 */
(function() {
var define, requireModule, require, requirejs;

(function() {
  var registry = {}, seen = {};

  define = function(name, deps, callback) {
    registry[name] = { deps: deps, callback: callback };
  };

  requirejs = require = requireModule = function(name) {
    if (seen[name]) { return seen[name]; }
    seen[name] = {};

    if (!registry[name]) {
      throw new Error("Could not find module " + name);
    }

    var mod = registry[name],
        deps = mod.deps,
        callback = mod.callback,
        reified = [],
        exports;

    for (var i=0, l=deps.length; i<l; i++) {
      if (deps[i] === 'exports') {
        reified.push(exports = {});
      } else {
        reified.push(requireModule(resolve(deps[i])));
      }
    }

    var value = callback.apply(this, reified);
    return seen[name] = exports || value;

    function resolve(child) {
      if (child.charAt(0) !== '.') { return child; }
      var parts = child.split("/");
      var parentBase = name.split("/").slice(0, -1);

      for (var i=0, l=parts.length; i<l; i++) {
        var part = parts[i];

        if (part === '..') { parentBase.pop(); }
        else if (part === '.') { continue; }
        else { parentBase.push(part); }
      }

      return parentBase.join("/");
    }
  };
})();

define("core-model", 
  ["ember","./model","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var Model = __dependency2__["default"];

    /**
      @module ember-data.model-fragments
    */

    // Ember object prototypes are lazy-loaded
    Model.proto();

    // TODO: is it easier to extend from DS.Model and disable functionality than to
    // cherry-pick common functionality?
    var protoProps = [
      '_setup',
      '_unhandledEvent',
      'send',
      'transitionTo',
      'data',
      'isEmpty',
      'isLoading',
      'isLoaded',
      'isDirty',
      'isSaving',
      'isDeleted',
      'isNew',
      'isValid',
      'serialize',
      'changedAttributes',
      'eachAttribute',
      'fragmentDidDirty',
      'fragmentDidReset',
      'rollbackFragments'
    ].reduce(function(props, name) {
      props[name] = Model.prototype[name] || Ember.meta(Model.prototype).descs[name];
      return props;
    }, {});

    var classProps = [
      'attributes',
      'eachAttribute',
      'transformedAttributes',
      'eachTransformedAttribute'
    ].reduce(function(props, name) {
      props[name] = Model[name] || Ember.meta(Model).descs[name];
      return props;
    }, {});

    /**
      CoreModel is a base model class that has state management, but no relation or
      persistence logic.

      @class CoreModel
    */
    var CoreModel = Ember.Object.extend(protoProps, {
      eachRelationship: Ember.K,
      updateRecordArraysLater: Ember.K
    });

    CoreModel.reopenClass(classProps, {
      eachRelationship: Ember.K
    });

    __exports__["default"] = CoreModel;
  });
define("ember", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember;
  });
define("fragments/array/fragment", 
  ["ember","./stateful","../model","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var StatefulArray = __dependency2__["default"];
    var getActualFragmentType = __dependency3__.getActualFragmentType;

    /**
      @module ember-data.model-fragments
    */

    var get = Ember.get;
    var map = Ember.EnumerableUtils.map;

    /**
      A state-aware array of fragments that is tied to an attribute of a `DS.Model`
      instance. `FragmentArray` instances should not be created directly, instead
      use the `DS.hasManyFragments` attribute.

      @class FragmentArray
      @namespace DS
      @extends StatefulArray
    */
    var FragmentArray = StatefulArray.extend({
      /**
        The type of fragments the array contains

        @property type
        @private
        @type {String}
      */
      type: null,

      options: null,

      init: function() {
        this._super();
        this._isInitializing = false;
      },

      /**
        @method setupData
        @private
        @param {Object} data
      */
      setupData: function(data) {
        var record = get(this, 'owner');
        var store = get(record, 'store');
        var declaredType = get(this, 'type');
        var options = get(this, 'options');
        var key = get(this, 'name');
        var content = get(this, 'content');

        // Mark the fragment array as initializing so that state changes are ignored
        // until after all fragments' data is setup
        this._isInitializing = true;

        // Map data to existing fragments and create new ones where necessary
        data = map(Ember.makeArray(data), function(data, i) {
          var fragment = content[i];

          // Create a new fragment from the data array if needed
          if (!fragment) {
            var actualType = getActualFragmentType(declaredType, options, data);
            fragment = store.buildFragment(actualType);

            fragment.setProperties({
              _owner : record,
              _name  : key
            });
          }

          // Initialize the fragment with the data
          fragment.setupData(data);

          return fragment;
        });

        this._isInitializing = false;

        this._super(data);
      },

      /**
        @method adapterDidCommit
      */
      adapterDidCommit: function() {
        this._super();

        // Notify all records of commit
        this.invoke('adapterDidCommit');
      },

      /**
        If this property is `true`, either the contents of the array do not match
        its original state, or one or more of the fragments in the array are dirty.

        Example

        ```javascript
        array.toArray(); // [ <Fragment:1>, <Fragment:2> ]
        array.get('isDirty'); // false
        array.get('firstObject').set('prop', 'newValue');
        array.get('isDirty'); // true
        ```

        @property isDirty
        @type {Boolean}
        @readOnly
      */
      isDirty: function() {
        return this._super() || this.isAny('isDirty');
      }.property('@each.isDirty', '_originalState'),

      /**
        This method reverts local changes of the array's contents to its original
        state, and calls `rollback` on each fragment.

        Example

        ```javascript
        array.get('firstObject').get('isDirty'); // true
        array.get('isDirty'); // true
        array.rollback();
        array.get('firstObject').get('isDirty'); // false
        array.get('isDirty'); // false
        ```

        @method rollback
      */
      rollback: function() {
        this._super();
        this.invoke('rollback');
      },

      /**
        Serializing a fragment array returns a new array containing the results of
        calling `serialize` on each fragment in the array.

        @method serialize
        @return {Array}
      */
      serialize: function() {
        return this.invoke('serialize');
      },

      replaceContent: function(idx, amt, fragments) {
        var record = get(this, 'owner');
        var store = get(record, 'store');
        var type = get(this, 'type');
        var key = get(this, 'name');
        var originalState = this.originalState;

        // Since all array manipulation methods end up using this method, ensure
        // ensure that fragments are the correct type and have an owner and name
        if (fragments) {
          fragments.forEach(function(fragment) {
            var owner = get(fragment, '_owner');

                        
            if (!owner) {
              fragment.setProperties({
                _owner : record,
                _name  : key
              });
            }
          });
        }

        return get(this, 'content').replace(idx, amt, fragments);
      },

      /**
        Adds an existing fragment to the end of the fragment array. Alias for
        `addObject`.

        @method addFragment
        @param {DS.ModelFragment} fragment
        @return {DS.ModelFragment} the newly added fragment
      */
      addFragment: function(fragment) {
        return this.addObject(fragment);
      },

      /**
        Removes the given fragment from the array. Alias for `removeObject`.

        @method removeFragment
        @param {DS.ModelFragment} fragment
        @return {DS.ModelFragment} the removed fragment
      */
      removeFragment: function(fragment) {
        return this.removeObject(fragment);
      },

      /**
        Creates a new fragment of the fragment array's type and adds it to the end
        of the fragment array

        @method createFragment
        @param {DS.ModelFragment} fragment
        @return {DS.ModelFragment} the newly added fragment
        */
      createFragment: function(props) {
        var record = get(this, 'owner');
        var store = get(record, 'store');
        var type = get(this, 'type');
        var fragment = store.createFragment(type, props);

        return this.pushObject(fragment);
      }
    });

    __exports__["default"] = FragmentArray;
  });
define("fragments/array/stateful", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    /**
      @module ember-data.model-fragments
    */

    var get = Ember.get;
    var set = Ember.set;
    var splice = Array.prototype.splice;

    /**
      A state-aware array that is tied to an attribute of a `DS.Model` instance.

      @class StatefulArray
      @namespace DS
      @extends Ember.ArrayProxy
    */
    var StatefulArray = Ember.ArrayProxy.extend({
      /**
        A reference to the array's owner record.

        @property owner
        @private
        @type {DS.Model}
      */
      owner: null,

      /**
        The array's property name on the owner record.

        @property name
        @private
        @type {String}
      */
      name: null,

      init: function() {
        this._super();
        set(this, '_originalState', []);
      },

      content: function() {
        return Ember.A();
      }.property(),

      /**
        @method setupData
        @private
        @param {Object} data
      */
      setupData: function(data) {
        var content = get(this, 'content');

        data = Ember.makeArray(data);
        set(this, '_originalState', data);

        // Completely replace the contents with the new data
        this.replaceContent(0, get(this, 'content.length'), data);
      },

      /**
        @method adapterDidCommit
      */
      adapterDidCommit: function() {
        // Fragment array has been persisted; use the current state as the original state
        set(this, '_originalState', this.toArray());
      },

      /**
        If this property is `true` the contents of the array do not match its
        original state. The array has local changes that have not yet been saved by
        the adapter. This includes additions, removals, and reordering of elements.

        Example

        ```javascript
        array.toArray(); // [ 'Tom', 'Yehuda' ]
        array.get('isDirty'); // false
        array.popObject(); // 'Yehuda'
        array.get('isDirty'); // true
        ```

        @property isDirty
        @type {Boolean}
        @readOnly
      */
      isDirty: function() {
        return Ember.compare(this.toArray(), get(this, '_originalState')) !== 0;
      }.property('[]', '_originalState'),

      /**
        This method reverts local changes of the array's contents to its original
        state.

        Example

        ```javascript
        array.toArray(); // [ 'Tom', 'Yehuda' ]
        array.popObject(); // 'Yehuda'
        array.toArray(); // [ 'Tom' ]
        array.rollback();
        array.toArray(); // [ 'Tom', 'Yehuda' ]
        ```

        @method rollback
      */
      rollback: function() {
        this.setObjects(get(this, '_originalState'));
      },

      /**
        Method alias for `toArray`.

        @method serialize
        @return {Array}
      */
      serialize: function() {
        return this.toArray();
      },

      arrayContentDidChange: function() {
        this._super.apply(this, arguments);

        var record = get(this, 'owner');
        var key = get(this, 'name');

        // Any change to the size of the fragment array means a potential state change
        if (this.get('isDirty')) {
          record.fragmentDidDirty(key, this);
        } else {
          record.fragmentDidReset(key, this);
        }
      },

      toStringExtension: function() {
        return 'owner(' + get(this, 'owner.id') + ')';
      }
    });

    __exports__["default"] = StatefulArray;
  });
define("fragments/attributes", 
  ["ember","./array/stateful","./array/fragment","./model","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var StatefulArray = __dependency2__["default"];
    var FragmentArray = __dependency3__["default"];
    var getActualFragmentType = __dependency4__.getActualFragmentType;

    /**
      @module ember-data.model-fragments
    */

    var get = Ember.get;

    /**
      `DS.hasOneFragment` defines an attribute on a `DS.Model` or `DS.ModelFragment`
      instance. Much like `DS.belongsTo`, it creates a property that returns a
      single fragment of the given type.

      `DS.hasOneFragment` takes an optional hash as a second parameter, currently
      supported options are:

      - `defaultValue`: An object literal or a function to be called to set the
        attribute to a default value if none is supplied. Values are deep copied
        before being used. Note that default values will be passed through the
        fragment's serializer when creating the fragment.

      Example

      ```javascript
      App.Person = DS.Model.extend({
        name: DS.hasOneFragment('name', { defaultValue: {} })
      });

      App.Name = DS.ModelFragment.extend({
        first  : DS.attr('string'),
        last   : DS.attr('string')
      });
      ```

      @namespace
      @method hasOneFragment
      @for DS
      @param {String} type the fragment type
      @param {Object} options a hash of options
      @return {Attribute}
    */
    function hasOneFragment(declaredType, options) {
      options = options || {};

      var meta = {
        type: 'fragment',
        isAttribute: true,
        isFragment: true,
        options: options
      };

      return Ember.computed(function(key, value) {
        var record = this;
        var data = this._data[key] || getDefaultValue(this, options, 'object');
        var fragment = this._fragments[key];
        var actualType = getActualFragmentType(declaredType, options, data);

        function setOwner(fragment) {
                    return fragment.setProperties({
            _owner : record,
            _name  : key
          });
        }

        // Regardless of whether being called as a setter or getter, the fragment
        // may not be initialized yet, in which case the data will contain a
        // partial raw response
        if (data && data !== fragment) {
          fragment || (fragment = setOwner(this.store.buildFragment(actualType)));
          fragment.setupData(data);
          this._data[key] = fragment;
        } else {
          // Handle the adapter setting the fragment to null
          fragment = data;
        }

        // Handle being called as a setter
        if (arguments.length > 1) {
          
          fragment = value ? setOwner(value) : null;

          if (this._data[key] !== fragment) {
            this.fragmentDidDirty(key, fragment);
          } else {
            this.fragmentDidReset(key, fragment);
          }
        }

        return this._fragments[key] = fragment;
      }).property('data').meta(meta);
    }

    /**
      `DS.hasManyFragments` defines an attribute on a `DS.Model` or
      `DS.ModelFragment` instance. Much like `DS.hasMany`, it creates a property
      that returns an array of fragments of the given type. The array is aware of
      its original state and so has a `isDirty` property and a `rollback` method.
      If a fragment type is not given, values are not converted to fragments, but
      passed straight through.

      `DS.hasOneFragment` takes an optional hash as a second parameter, currently
      supported options are:

      - `defaultValue`: An array literal or a function to be called to set the
        attribute to a default value if none is supplied. Values are deep copied
        before being used. Note that default values will be passed through the
        fragment's serializer when creating the fragment.

      Example

      ```javascript
      App.Person = DS.Model.extend({
        addresses: DS.hasManyFragments('name', { defaultValue: [] })
      });

      App.Address = DS.ModelFragment.extend({
        street  : DS.attr('string'),
        city    : DS.attr('string'),
        region  : DS.attr('string'),
        country : DS.attr('string')
      });
      ```

      @namespace
      @method hasManyFragments
      @for DS
      @param {String} type the fragment type (optional)
      @param {Object} options a hash of options
      @return {Attribute}
    */
    function hasManyFragments(declaredType, options) {
      // If a declaredType is not given, it implies an array of primitives
      if (Ember.typeOf(declaredType) !== 'string') {
        options = declaredType;
        declaredType = null;
      }

      options = options || {};

      var meta = {
        type: 'fragment',
        isAttribute: true,
        isFragment: true,
        options: options,
        kind: 'hasMany'
      };

      return Ember.computed(function(key, value) {
        var record = this;
        var data = this._data[key] || getDefaultValue(this, options, 'array');
        var fragments = this._fragments[key] || null;

        function createArray() {
          var arrayClass = declaredType ? FragmentArray : StatefulArray;

          return arrayClass.create({
            type    : declaredType,
            options : options,
            name    : key,
            owner   : record
          });
        }

        // Create a fragment array and initialize with data
        if (data && data !== fragments) {
          fragments || (fragments = createArray());
          fragments.setupData(data);
          this._data[key] = fragments;
        } else {
          // Handle the adapter setting the fragment array to null
          fragments = data;
        }

        if (arguments.length > 1) {
          if (Ember.isArray(value)) {
            fragments || (fragments = createArray());
            fragments.setObjects(value);
          } else if (value === null) {
            fragments = null;
          } else {
                      }

          if (this._data[key] !== fragments || get(fragments, 'isDirty')) {
            this.fragmentDidDirty(key, fragments);
          } else {
            this.fragmentDidReset(key, fragments);
          }
        }

        return this._fragments[key] = fragments;
      }).property('data').meta(meta);
    }

    // Like `DS.belongsTo`, when used within a model fragment is a reference
    // to the owner record
    /**
      `DS.fragmentOwner` defines a read-only attribute on a `DS.ModelFragment`
      instance. The attribute returns a reference to the fragment's owner
      record.

      Example

      ```javascript
      App.Person = DS.Model.extend({
        name: DS.hasOneFragment('name')
      });

      App.Name = DS.ModelFragment.extend({
        first  : DS.attr('string'),
        last   : DS.attr('string'),
        person : DS.fragmentOwner()
      });
      ```

      @namespace
      @method fragmentOwner
      @for DS
      @return {Attribute}
    */
    function fragmentOwner() {
      // TODO: add a warning when this is used on a non-fragment
      return Ember.computed.alias('_owner').readOnly();
    }

    // The default value of a fragment is either an array or an object,
    // which should automatically get deep copied
    function getDefaultValue(record, options, type) {
      var value;

      if (typeof options.defaultValue === "function") {
        value = options.defaultValue();
      } else if (options.defaultValue) {
        value = options.defaultValue;
      } else {
        return null;
      }

      
      // Create a deep copy of the resulting value to avoid shared reference errors
      return Ember.copy(value, true);
    }

    __exports__.hasOneFragment = hasOneFragment;
    __exports__.hasManyFragments = hasManyFragments;
    __exports__.fragmentOwner = fragmentOwner;
  });
define("fragments/ext", 
  ["../store","../model","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Store = __dependency1__["default"];
    var Model = __dependency2__["default"];

    /**
      @module ember-data.model-fragments
    */

    var get = Ember.get;

    /**
      @class Store
      @namespace DS
    */
    Store.reopen({
      /**
        Build a new fragment of the given type with injections
        applied that starts in the 'empty' state.

        @method buildFragment
        @private
        @param {subclass of DS.ModelFragment} type
        @return {DS.ModelFragment} fragment
      */
      buildFragment: function(type) {
        type = this.modelFor(type);

        // TODO: ModelFragment should be able to be referenced by an import here,
        // but because CoreModel depends on the changes to DS.Model in this file,
        // it would create a circular reference
        
        return type.create({
          store: this
        });
      },

      /**
        Create a new fragment that does not yet have an owner record.
        The properties passed to this method are set on the newly created
        fragment.

        To create a new instance of the `name` fragment:

        ```js
        store.createFragment('name', {
          first: "Alex",
          last: "Routé"
        });
        ```

        @method createRecord
        @param {String} type
        @param {Object} properties a hash of properties to set on the
          newly created fragment.
        @return {DS.ModelFragment} fragment
      */
      createFragment: function(type, props) {
        var fragment = this.buildFragment(type);

        if (props) {
          fragment.setProperties(props);
        }

        fragment.send('loadedData');

        return fragment;
      }
    });

    /**
      @class Model
      @namespace DS
      */
    Model.reopen({
      _setup: function() {
        this._super();
        this._fragments = {};
      },

      /**
        This method updates all fragment data _before_ the owner's observes fire
        to ensure that fragment observers aren't working with stale data (this works
        because the owner's `_data` hash has already changed by this time)

        @method updateFragmentData
        @private
        @param {DS.Model} record
      */
      updateFragmentData: Ember.beforeObserver('data', function(record) {
        var fragment;

        for (var key in record._fragments) {
          fragment = record._fragments[key];

          // The data may have updated, but not changed at all, in which case
          // treat the update as a rollback
          if (fragment && record._data[key] && fragment !== record._data[key]) {
            fragment.setupData(record._data[key]);
            record._data[key] = fragment;
          }
        }
      }),

      /**
        If the adapter did not return a hash in response to a commit,
        merge the changed attributes and relationships into the existing
        saved data and notify all fragments of the commit.

        @method adapterDidCommit
      */
      adapterDidCommit: function(data) {
        this._super.apply(this, arguments);

        var fragment;

        // Notify fragments that the record was committed
        for (var key in this._fragments) {
          if (fragment = this._fragments[key]) {
            fragment.adapterDidCommit();
          }
        }
      },

      /**
        Returns an object, whose keys are changed properties, and value is
        an [oldProp, newProp] array. When the model has fragments that have
        changed, the property value is simply `true`.

        Example

        ```javascript
        App.Mascot = DS.Model.extend({
          type: DS.attr('string'),
          name: DS.hasOneFragment('name')
        });

        App.Name = DS.Model.extend({
          first : DS.attr('string'),
          last  : DS.attr('string')
        });

        var person = store.createRecord('person');
        person.changedAttributes(); // {}
        person.get('name').set('first', 'Tomster');
        person.set('type', 'Hamster');
        person.changedAttributes(); // { name: true, type: [undefined, 'Hamster'] }
        ```

        @method changedAttributes
        @return {Object} an object, whose keys are changed properties,
          and value is an [oldProp, newProp] array.
      */
      changedAttributes: function() {
        var diffData = this._super();

        Ember.keys(this._fragments).forEach(function(name) {
          // An actual diff of the fragment or fragment array is outside the scope
          // of this method, so just indicate that there is a change instead
          if (name in this._attributes) {
            diffData[name] = true;
          }
        }, this);

        return diffData;
      },

      /**
        If the model `isDirty` this function will discard any unsaved
        changes, recursively doing the same for all fragment properties.

        Example

        ```javascript
        record.get('name'); // 'Untitled Document'
        record.set('name', 'Doc 1');
        record.get('name'); // 'Doc 1'
        record.rollback();
        record.get('name'); // 'Untitled Document'
        ```

        @method rollback
      */
      rollback: function() {
        this._super();

        // Rollback fragments after data changes -- otherwise observers get tangled up
        this.rollbackFragments();
      },

      /**
        @method rollbackFragments
        @private
        */
      rollbackFragments: function() {
        var fragment;

        for (var key in this._fragments) {
          fragment = this._fragments[key] = this._data[key];
          fragment && fragment.rollback();
        }
      },

      /**
        @method fragmentDidDirty
        @private
      */
      fragmentDidDirty: function(key, fragment) {
        if (!get(this, 'isDeleted')) {
          // Add the fragment as a placeholder in the owner record's
          // `_attributes` hash to indicate it is dirty
          this._attributes[key] = fragment;

          this.send('becomeDirty');
        }
      },

      /**
        @method fragmentDidReset
        @private
        */
      fragmentDidReset: function(key, fragment) {
        // Make sure there's no entry in the owner record's
        // `_attributes` hash to indicate the fragment is dirty
        delete this._attributes[key];

        // Don't reset if the record is new, otherwise it will enter the 'deleted' state
        // NOTE: This case almost never happens with attributes because their initial value
        // is always undefined, which is *usually* not what attributes get 'reset' to
        if (!get(this, 'isNew')) {
          this.send('propertyWasReset', key);
        }
      }
    });

    __exports__.Store = Store;
    __exports__.Model = Model;
  });
define("fragments/model", 
  ["ember","../core-model","./states","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var CoreModel = __dependency2__["default"];
    var FragmentRootState = __dependency3__["default"];

    /**
      @module ember-data.model-fragments
    */

    var get = Ember.get;

    /**
      The class that all nested object structures, or 'fragments', descend from.
      Fragments are bound to a single 'owner' record (an instance of `DS.Model`)
      and cannot change owners once set. They behave like models, but they have
      no `save` method since their persistence is managed entirely through their
      owner. Because of this, a fragment's state directly influences its owner's
      state, e.g. when a record's fragment `isDirty`, its owner `isDirty`.

      Example:

      ```javascript
      App.Person = DS.Model.extend({
        name: DS.hasOneFragment('name')
      });

      App.Name = DS.ModelFragment.extend({
        first  : DS.attr('string'),
        last   : DS.attr('string')
      });
      ```

      With JSON response:

      ```json
      {
        "id": "1",
        "name": {
          "first": "Robert",
          "last": "Jackson"
        }
      }
      ```

      ```javascript
      var person = store.getbyid('person', '1');
      var name = person.get('name');

      person.get('isDirty'); // false
      name.get('isDirty'); // false
      name.get('first'); // 'Robert'

      name.set('first', 'The Animal');
      name.get('isDirty'); // true
      person.get('isDirty'); // true

      person.rollback();
      name.get('first'); // 'Robert'
      person.get('isDirty'); // false
      person.get('isDirty'); // false
      ```

      @class ModelFragment
      @namespace DS
      @extends CoreModel
      @uses Ember.Comparable
      @uses Ember.Copyable
    */
    var ModelFragment = CoreModel.extend(Ember.Comparable, Ember.Copyable, {
      /**
        The fragment's property name on the owner record.

        @property _name
        @private
        @type {String}
      */
      _name: null,

      /**
        A reference to the fragment's owner record.

        @property _owner
        @private
        @type {DS.Model}
      */
      _owner: null,

      /**
        A reference to a state object descriptor indicating fragment's current state.

        @property currentState
        @private
        @type {Object}
      */
      currentState: FragmentRootState.empty,

      /**
        @method setupData
        @private
        @param {Object} data
      */
      setupData: function(data) {
        var store = get(this, 'store');
        var key = get(this, 'name');
        var type = store.modelFor(this.constructor);
        var serializer = store.serializerFor(type);

        // Setting data means the record is now clean
        this._attributes = {};

        // TODO: do normalization in the transform, not on the fly
        this._data = serializer.normalize(type, data, key);

        // Initiate state change
        this.send('pushedData');

        // Notify attribute properties/observers of internal change to `_data`
        this.notifyPropertyChange('data');
      },

      /**
        Like `DS.Model#rollback`, if the fragment `isDirty` this function will
        discard any unsaved changes, recursively doing the same for all fragment
        properties.

        Example

        ```javascript
        fragment.get('type'); // 'Human'
        fragment.set('type', 'Hamster');
        fragment.get('type'); // 'Hamster'
        fragment.rollback();
        fragment.get('type'); // 'Human'
        ```

        @method rollback
      */
      rollback: function() {
        this._attributes = {};

        // Rollback fragments from the bottom up
        this.rollbackFragments();

        // Initiate state change
        this.send('rolledBack');

        // Notify attribute properties/observers of internal change to `_data`
        this.notifyPropertyChange('data');
      },

      /**
        Compare two fragments by identity to allow `FragmentArray` to diff arrays.

        @method compare
        @param a {DS.ModelFragment} the first fragment to compare
        @param b {DS.ModelFragment} the second fragment to compare
        @return {Integer} the result of the comparison
      */
      compare: function(f1, f2) {
        return f1 === f2 ? 0 : 1;
      },

      /**
        Create a new fragment that is a copy of the current fragment. Copied
        fragments do not have the same owner record set, so they may be added
        to other records safely.

        @method copy
        @return {DS.ModelFragment} the newly created fragment
      */
      copy: function() {
        var store = get(this, 'store');
        var type = store.modelFor(this.constructor);
        var data = {};

        // TODO: handle copying sub-fragments
        Ember.merge(data, this._data);
        Ember.merge(data, this._attributes);

        return this.store.createFragment(type, data);
      },

      /**
        @method adapterDidCommit
      */
      adapterDidCommit: function() {
        // Merge in-flight attributes if any
        if (Ember.keys(this._inFlightAttributes).length) {
          Ember.mixin(this._data, this._inFlightAttributes);
          this._inFlightAttributes = {};
        }

        var fragment;

        // Notify fragments that the owner record was committed
        for (var key in this._fragments) {
          if (fragment = this._fragments[key]) {
            fragment.adapterDidCommit();
          }
        }

        // Transition directly to a clean state
        this.transitionTo('saved');
      },

      toStringExtension: function() {
        return 'owner(' + get(this, '_owner.id') + ')';
      },

      init: function() {
        this._super();
        this._setup();
      }
    });

    /**
     * `getActualFragmentType` returns the actual type of a fragment based on its declared type
     * and whether it is configured to be polymorphic.
     *
     * @private
     * @param {String} declaredType the type as declared by `DS.hasOneFragment` or `DS.hasManyFragments`
     * @param {Object} options the fragment options
     * @param {Object} data the fragment data
     * @return {String} the actual fragment type
     */
    function getActualFragmentType(declaredType, options, data) {
      if (!options.polymorphic || !data) {
        return declaredType;
      }

      var typeKey = options.typeKey || 'type';
      var actualType = data[typeKey];

      return actualType || declaredType;
    }

    __exports__["default"] = ModelFragment;
    __exports__.getActualFragmentType = getActualFragmentType;
  });
define("fragments/states", 
  ["ember","../states","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var RootState = __dependency2__["default"];

    /**
      @module ember-data.model-fragments
    */

    var get = Ember.get;

    var didSetProperty = RootState.loaded.saved.didSetProperty;
    var propertyWasReset = RootState.loaded.updated.uncommitted.propertyWasReset;

    var dirtySetup = function(fragment) {
      var record = get(fragment, '_owner');
      var key = get(fragment, '_name');

      // A newly created fragment may not have an owner yet
      if (record) {
        record.fragmentDidDirty(key, fragment);
      }
    };

    /**
      Like `DS.Model` instances, all fragments have a `currentState` property
      that reflects where they are in the model lifecycle. However, there are much
      fewer states that a fragment can be in, since the `loading` state doesn't
      apply, `inFlight` states are no different than the owner record's, and there
      is no concept of a `deleted` state.

      This is the simplified hierarchy of valid states for a fragment:

      ```text
      * root
        * empty
        * loaded
          * created
          * saved
          * updated
      ```

      Note that there are no `uncommitted` sub-states because it's implied by the
      `created` and `updated` states (since there are no `inFlight` substates).

      @class FragmentRootState
    */
    var FragmentRootState = {
      // Include all `DS.Model` state booleans for consistency
      isEmpty: false,
      isLoading: false,
      isLoaded: false,
      isDirty: false,
      isSaving: false,
      isDeleted: false,
      isNew: false,
      isValid: true,

      didSetProperty: didSetProperty,

      propertyWasReset: Ember.K,

      becomeDirty: Ember.K,

      rolledBack: Ember.K,

      empty: {
        isEmpty: true,

        loadedData: function(fragment) {
          fragment.transitionTo('loaded.created');
        },

        pushedData: function(fragment) {
          fragment.transitionTo('loaded.saved');
        }
      },

      loaded: {
        pushedData: function(fragment) {
          fragment.transitionTo('saved');
        },

        saved: {
          setup: function(fragment) {
            var record = get(fragment, '_owner');
            var key = get(fragment, '_name');

            // Abort if fragment is still initializing
            if (!record._fragments[key] || fragment._isInitializing) { return; }

            // Reset the property on the owner record if no other siblings
            // are dirty (or there are no siblings)
            if (!get(record, key + '.isDirty')) {
              record.fragmentDidReset(key, fragment);
            }
          },

          pushedData: Ember.K,

          becomeDirty: function(fragment) {
            fragment.transitionTo('updated');
          }
        },

        created: {
          isDirty: true,

          setup: dirtySetup,
        },

        updated: {
          isDirty: true,

          setup: dirtySetup,

          propertyWasReset: propertyWasReset,

          rolledBack: function(fragment) {
            fragment.transitionTo('saved');
          }
        }
      }
    };

    function mixin(original, hash) {
      for (var prop in hash) {
        original[prop] = hash[prop];
      }

      return original;
    }

    // Wouldn't it be awesome if this was public?
    function wireState(object, parent, name) {
      object = mixin(parent ? Ember.create(parent) : {}, object);
      object.parentState = parent;
      object.stateName = name;

      for (var prop in object) {
        if (!object.hasOwnProperty(prop) || prop === 'parentState' || prop === 'stateName') {
          continue;
        }
        if (typeof object[prop] === 'object') {
          object[prop] = wireState(object[prop], object, name + "." + prop);
        }
      }

      return object;
    }

    FragmentRootState = wireState(FragmentRootState, null, 'root');

    __exports__["default"] = FragmentRootState;
  });
define("fragments/transform", 
  ["../transform","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Transform = __dependency1__["default"];

    /**
      @module ember-data.model-fragments
    */

    /**
      Transform for all fragment attributes which delegates work to
      fragment serializers.

      @class FragmentTransform
      @namespace DS
      @extends DS.Transform
    */
    var FragmentTransform = Transform.extend({
      deserialize: function(data) {
        // TODO: figure out how to get a handle to the fragment type here
        // without having to patch `DS.JSONSerializer#applyTransforms`
        return data;
      },

      serialize: function(fragment) {
        return fragment ? fragment.serialize() : null;
      }
    });

    __exports__["default"] = FragmentTransform;
  });
define("initializers", 
  ["./fragments/transform","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var FragmentTransform = __dependency1__["default"];

    var initializers = [
      {
        name: "fragmentTransform",
        before: "store",

        initialize: function(container, application) {
          application.register('transform:fragment', FragmentTransform);
        }
      }
    ];

    __exports__["default"] = initializers;
  });
define("main", 
  ["ember","./fragments/ext","./fragments/model","./fragments/array/fragment","./fragments/transform","./fragments/attributes","./initializers","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var ext = __dependency2__["default"];
    var ModelFragment = __dependency3__["default"];
    var FragmentArray = __dependency4__["default"];
    var FragmentTransform = __dependency5__["default"];
    var hasOneFragment = __dependency6__.hasOneFragment;
    var hasManyFragments = __dependency6__.hasManyFragments;
    var fragmentOwner = __dependency6__.fragmentOwner;
    var initializers = __dependency7__["default"];

    /**
      Ember Data Model Fragments

      @module ember-data.model-fragments
      @main ember-data.model-fragments
    */

    DS.ModelFragment = ModelFragment;
    DS.FragmentArray = FragmentArray;
    DS.FragmentTransform = FragmentTransform;
    DS.hasOneFragment = hasOneFragment;
    DS.hasManyFragments = hasManyFragments;
    DS.fragmentOwner = fragmentOwner;

    Ember.onLoad('Ember.Application', function(Application) {
      initializers.forEach(Application.initializer, Application);
    });

    if (Ember.libraries) {
      Ember.libraries.register('Model Fragments', '0.2.2');
    }

    // Something must be exported...
    __exports__["default"] = DS;
  });
define("model", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = DS.Model;
  });
define("states", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = DS.RootState;
  });
define("store", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = DS.Store;
  });
define("transform", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = DS.Transform;
  });
requireModule("main")["default"];
}());