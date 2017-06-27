/*!
 * @overview  Ember Data Model Fragments
 * @copyright Copyright 2015 Lytics Inc. and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/lytics/ember-data.model-fragments/master/LICENSE
 * @version   0.3.3+8b1fcdd5
 */

(function() {
    "use strict";
    var ember$lib$main$$default = Ember;
    var ember$data$lib$main$$default = DS;
    var ember$data$lib$serializers$json$api$serializer$$default = DS.JSONAPISerializer;
    var ember$data$lib$serializers$json$serializer$$default = DS.JSONSerializer;
    var ember$data$lib$system$model$internal$model$$default = DS.InternalModel;
    var ember$data$lib$system$model$states$$default = DS.RootState;
    var ember$data$lib$system$model$$default = DS.Model;
    var ember$data$lib$system$snapshot$$default = DS.Snapshot;
    var ember$data$lib$system$store$$default = DS.Store;
    var ember$data$lib$system$transform$$default = DS.Transform;

    /**
      @module ember-data.model-fragments
    */

    var model$fragments$lib$fragments$states$$get = ember$lib$main$$default.get;
    var model$fragments$lib$fragments$states$$create = Object.create || ember$lib$main$$default.create;

    var model$fragments$lib$fragments$states$$didSetProperty = ember$data$lib$system$model$states$$default.loaded.saved.didSetProperty;
    var model$fragments$lib$fragments$states$$propertyWasReset = ember$data$lib$system$model$states$$default.loaded.updated.uncommitted.propertyWasReset;

    var model$fragments$lib$fragments$states$$dirtySetup = function(internalModel) {
      var record = internalModel._owner;
      var key = internalModel._name;

      // A newly created fragment may not have an owner yet
      if (record) {
        model$fragments$lib$fragments$states$$fragmentDidDirty(record, key, internalModel);
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
    var model$fragments$lib$fragments$states$$FragmentRootState = {
      // Include all `DS.Model` state booleans for consistency
      isEmpty: false,
      isLoading: false,
      isLoaded: false,
      isDirty: false,
      isSaving: false,
      isDeleted: false,
      isNew: false,
      isValid: true,

      didSetProperty: model$fragments$lib$fragments$states$$didSetProperty,

      propertyWasReset: ember$lib$main$$default.K,

      becomeDirty: ember$lib$main$$default.K,

      rolledBack: ember$lib$main$$default.K,

      empty: {
        isEmpty: true,

        loadedData: function(internalModel) {
          internalModel.transitionTo('loaded.created');
        },

        pushedData: function(internalModel) {
          internalModel.transitionTo('loaded.saved');
        }
      },

      loaded: {
        pushedData: function(internalModel) {
          internalModel.transitionTo('saved');
        },

        saved: {
          setup: function(internalModel) {
            var record = internalModel._owner;
            var key = internalModel._name;

            // Abort if fragment is still initializing
            if (!record._internalModel._fragments[key] || internalModel._isInitializing) { return; }

            // Reset the property on the owner record if no other siblings
            // are dirty (or there are no siblings)
            if (!model$fragments$lib$fragments$states$$get(record, key + '.hasDirtyAttributes')) {
              model$fragments$lib$fragments$states$$fragmentDidReset(record, key, internalModel);
            }
          },

          pushedData: ember$lib$main$$default.K,

          didCommit: ember$lib$main$$default.K,

          becomeDirty: function(internalModel) {
            internalModel.transitionTo('updated');
          }
        },

        created: {
          isDirty: true,

          setup: model$fragments$lib$fragments$states$$dirtySetup,

          didCommit: function(internalModel) {
            internalModel.transitionTo('saved');
          }
        },

        updated: {
          isDirty: true,

          setup: model$fragments$lib$fragments$states$$dirtySetup,

          propertyWasReset: model$fragments$lib$fragments$states$$propertyWasReset,

          didCommit: function(internalModel) {
            internalModel.transitionTo('saved');
          },

          rolledBack: function(internalModel) {
            internalModel.transitionTo('saved');
          }
        }
      }
    };

    function model$fragments$lib$fragments$states$$mixin(original, hash) {
      for (var prop in hash) {
        original[prop] = hash[prop];
      }

      return original;
    }

    // Wouldn't it be awesome if this was public?
    function model$fragments$lib$fragments$states$$wireState(object, parent, name) {
      object = model$fragments$lib$fragments$states$$mixin(parent ? model$fragments$lib$fragments$states$$create(parent) : {}, object);
      object.parentState = parent;
      object.stateName = name;

      for (var prop in object) {
        if (!object.hasOwnProperty(prop) || prop === 'parentState' || prop === 'stateName') {
          continue;
        }
        if (typeof object[prop] === 'object') {
          object[prop] = model$fragments$lib$fragments$states$$wireState(object[prop], object, name + "." + prop);
        }
      }

      return object;
    }

    model$fragments$lib$fragments$states$$FragmentRootState = model$fragments$lib$fragments$states$$wireState(model$fragments$lib$fragments$states$$FragmentRootState, null, 'root');

    var model$fragments$lib$fragments$states$$default = model$fragments$lib$fragments$states$$FragmentRootState;
    function model$fragments$lib$fragments$states$$fragmentDidDirty(record, key, fragment) {
      if (!model$fragments$lib$fragments$states$$get(record, 'isDeleted')) {
        // Add the fragment as a placeholder in the owner record's
        // `_attributes` hash to indicate it is dirty
        record._internalModel._attributes[key] = fragment;

        record.send('becomeDirty');
      }
    }

    function model$fragments$lib$fragments$states$$fragmentDidReset(record, key) {
      // Make sure there's no entry in the owner record's
      // `_attributes` hash to indicate the fragment is dirty
      delete record._internalModel._attributes[key];

      // Don't reset if the record is new, otherwise it will enter the 'deleted' state
      // NOTE: This case almost never happens with attributes because their initial value
      // is always undefined, which is *usually* not what attributes get 'reset' to
      if (!model$fragments$lib$fragments$states$$get(record, 'isNew')) {
        record.send('propertyWasReset', key);
      }
    }

    /**
      @module ember-data.model-fragments
    */

    var model$fragments$lib$fragments$array$stateful$$get = ember$lib$main$$default.get;
    var model$fragments$lib$fragments$array$stateful$$set = ember$lib$main$$default.set;
    var model$fragments$lib$fragments$array$stateful$$computed = ember$lib$main$$default.computed;

    /**
      A state-aware array that is tied to an attribute of a `DS.Model` instance.

      @class StatefulArray
      @namespace DS
      @extends Ember.ArrayProxy
    */
    var model$fragments$lib$fragments$array$stateful$$StatefulArray = ember$lib$main$$default.ArrayProxy.extend({
      /**
        A reference to the array's owner record.

        @property owner
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
        this._pendingData = undefined;
        model$fragments$lib$fragments$array$stateful$$set(this, '_originalState', []);
      },

      content: model$fragments$lib$fragments$array$stateful$$computed(function() {
        return ember$lib$main$$default.A();
      }),

      /**
        @method setupData
        @private
        @param {Object} data
      */
      setupData: function(data) {
        // Since replacing the contents of the array can trigger changes to fragment
        // array properties, this method can get invoked recursively with the same
        // data, so short circuit here once it's been setup the first time
        if (this._pendingData === data) {
          return;
        }

        this._pendingData = data;

        var processedData = this._processData(data);

        // This data is canonical, so create rollback point
        model$fragments$lib$fragments$array$stateful$$set(this, '_originalState', processedData);

        // Completely replace the contents with the new data
        this.replaceContent(0, model$fragments$lib$fragments$array$stateful$$get(this, 'content.length'), processedData);

        this._pendingData = undefined;
      },

      /**
        @method _processData
        @private
        @param {Object} data
      */
      _processData: function(data) {
        // Simply ensure that the data is an actual array
        return ember$lib$main$$default.makeArray(data);
      },

      /**
        @method _createSnapshot
        @private
      */
      _createSnapshot: function() {
        // Since elements are not models, a snapshot is simply a mapping of raw values
        return this.toArray();
      },

      /**
        @method adapterDidCommit
        @private
      */
      _adapterDidCommit: function(data) {
        if (data) {
          this.setupData(data);
        } else {
          // Fragment array has been persisted; use the current state as the original state
          model$fragments$lib$fragments$array$stateful$$set(this, '_originalState', this.toArray());
        }
      },

      /**
        @method isDirty
        @deprecated Use `hasDirtyAttributes` instead
      */
      isDirty: model$fragments$lib$fragments$array$stateful$$computed('hasDirtyAttributes', function() {
        ember$lib$main$$default.deprecate('The `isDirty` method of fragment arrays has been deprecated, please use `hasDirtyAttributes` instead');
        return this.get('hasDirtyAttributes');
      }),

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

        @property hasDirtyAttributes
        @type {Boolean}
        @readOnly
      */
      hasDirtyAttributes: model$fragments$lib$fragments$array$stateful$$computed('[]', '_originalState', function() {
        return ember$lib$main$$default.compare(this.toArray(), model$fragments$lib$fragments$array$stateful$$get(this, '_originalState')) !== 0;
      }),

      /**
        @method rollback
        @deprecated Use `rollbackAttributes()` instead
      */
      rollback: function() {
        ember$lib$main$$default.deprecate('Using array.rollback() has been deprecated. Use array.rollbackAttributes() to discard any unsaved changes to fragments in the array.');
        this.rollbackAttributes();
      },

      /**
        This method reverts local changes of the array's contents to its original
        state.

        Example

        ```javascript
        array.toArray(); // [ 'Tom', 'Yehuda' ]
        array.popObject(); // 'Yehuda'
        array.toArray(); // [ 'Tom' ]
        array.rollbackAttributes();
        array.toArray(); // [ 'Tom', 'Yehuda' ]
        ```

        @method rollbackAttributes
      */
      rollbackAttributes: function() {
        this.setObjects(model$fragments$lib$fragments$array$stateful$$get(this, '_originalState'));
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

        var record = model$fragments$lib$fragments$array$stateful$$get(this, 'owner');
        var key = model$fragments$lib$fragments$array$stateful$$get(this, 'name');

        // Any change to the size of the fragment array means a potential state change
        if (model$fragments$lib$fragments$array$stateful$$get(this, 'hasDirtyAttributes')) {
          model$fragments$lib$fragments$states$$fragmentDidDirty(record, key, this);
        } else {
          model$fragments$lib$fragments$states$$fragmentDidReset(record, key);
        }
      },

      toStringExtension: function() {
        return 'owner(' + model$fragments$lib$fragments$array$stateful$$get(this, 'owner.id') + ')';
      }
    });

    var model$fragments$lib$fragments$array$stateful$$default = model$fragments$lib$fragments$array$stateful$$StatefulArray;

    /**
      @module ember-data.model-fragments
    */

    var model$fragments$lib$fragments$ext$$keys = Object.keys || Ember.keys;

    /**
      @class Store
      @namespace DS
    */
    ember$data$lib$system$store$$default.reopen({
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
      createFragment: function(modelName, props) {
        var type = this.modelFor(modelName);

        Ember.assert("The '" + type + "' model must be a subclass of DS.ModelFragment", model$fragments$lib$fragments$model$$default.detect(type));

        var internalModel = new ember$data$lib$system$model$internal$model$$default(type, null, this, this.container);

        // Re-wire the internal model to use the fragment state machine
        internalModel.currentState = model$fragments$lib$fragments$states$$default.empty;

        internalModel._name = null;
        internalModel._owner = null;

        internalModel.loadedData();

        var fragment = internalModel.getRecord();

        if (props) {
          fragment.setProperties(props);
        }

        return fragment;
      }
    });

    /**
      @class Model
      @namespace DS
      */
    ember$data$lib$system$model$$default.reopen({
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
        var internalModel = model$fragments$lib$fragments$model$$internalModelFor(this);

        model$fragments$lib$fragments$ext$$keys(internalModel._fragments).forEach(function(name) {
          // An actual diff of the fragment or fragment array is outside the scope
          // of this method, so just indicate that there is a change instead
          if (name in internalModel._attributes) {
            diffData[name] = true;
          }
        }, this);

        return diffData;
      },
    });

    // Replace a method on an object with a new one that calls the original and then
    // invokes a function with the result
    function model$fragments$lib$fragments$ext$$decorateMethod(obj, name, fn) {
      var originalFn = obj[name];

      obj[name] = function() {
        var value = originalFn.apply(this, arguments);

        return fn.call(this, value, arguments);
      };
    }

    var model$fragments$lib$fragments$ext$$InternalModelPrototype = ember$data$lib$system$model$internal$model$$default.prototype;

    /**
      Override parent method to snapshot fragment attributes before they are
      passed to the `DS.Model#serialize`.

      @method _createSnapshot
      @private
    */
    model$fragments$lib$fragments$ext$$decorateMethod(model$fragments$lib$fragments$ext$$InternalModelPrototype, 'createSnapshot', function createFragmentSnapshot(snapshot) {
      var attrs = snapshot._attributes;

      model$fragments$lib$fragments$ext$$keys(attrs).forEach(function(key) {
        var attr = attrs[key];

        // If the attribute has a `_createSnapshot` method, invoke it before the
        // snapshot gets passed to the serializer
        if (attr && typeof attr._createSnapshot === 'function') {
          attrs[key] = attr._createSnapshot();
        }
      });

      return snapshot;
    });

    /**
      If the model `hasDirtyAttributes` this function will discard any unsaved
      changes, recursively doing the same for all fragment properties.

      Example

      ```javascript
      record.get('name'); // 'Untitled Document'
      record.set('name', 'Doc 1');
      record.get('name'); // 'Doc 1'
      record.rollbackAttributes();
      record.get('name'); // 'Untitled Document'
      ```

      @method rollbackAttributes
    */
    model$fragments$lib$fragments$ext$$decorateMethod(model$fragments$lib$fragments$ext$$InternalModelPrototype, 'rollbackAttributes', function rollbackFragments() {
      for (var key in this._fragments) {
        if (this._fragments[key]) {
          this._fragments[key].rollbackAttributes();
        }
      }
    });

    /**
      If the adapter did not return a hash in response to a commit,
      merge the changed attributes and relationships into the existing
      saved data and notify all fragments of the commit.

      @method adapterDidCommit
    */
    model$fragments$lib$fragments$ext$$decorateMethod(model$fragments$lib$fragments$ext$$InternalModelPrototype, 'adapterDidCommit', function adapterDidCommit(returnValue, args) {
      var attributes = (args[0] && args[0].attributes) || {};
      var fragment;

      // Notify fragments that the record was committed
      for (var key in this._fragments) {
        if (fragment = this._fragments[key]) {
          fragment._adapterDidCommit(attributes[key]);
        }
      }
    });

    /**
      @class JSONSerializer
      @namespace DS
    */
    ember$data$lib$serializers$json$serializer$$default.reopen({
      /**
        Enables fragment properties to have custom transforms based on the fragment
        type, so that deserialization does not have to happen on the fly

        @method transformFor
        @private
      */
      transformFor: function(attributeType) {
        if (attributeType.indexOf('-mf-') === 0) {
          return model$fragments$lib$fragments$ext$$getFragmentTransform(this.container, this.store, attributeType);
        }

        return this._super.apply(this, arguments);
      }
    });

    // Retrieve or create a transform for the specific fragment type
    function model$fragments$lib$fragments$ext$$getFragmentTransform(container, store, attributeType) {
      var registry = container._registry || container;
      var containerKey = 'transform:' + attributeType;
      var match = attributeType.match(/^-mf-(fragment|fragment-array|array)(?:\$([^$]+))?(?:\$(.+))?$/);
      var transformType = match[1];
      var modelName = match[2];
      var polymorphicTypeProp = match[3];

      if (!registry.has(containerKey)) {
        var transformClass = container.lookupFactory('transform:' + transformType);

        registry.register(containerKey, transformClass.extend({
          store: store,
          modelName: modelName,
          polymorphicTypeProp: polymorphicTypeProp
        }));
      }

      return container.lookup(containerKey);
    }

    /**
      @module ember-data.model-fragments
    */

    var model$fragments$lib$fragments$model$$get = ember$lib$main$$default.get;
    var model$fragments$lib$fragments$model$$create = Object.create || ember$lib$main$$default.create;
    var model$fragments$lib$fragments$model$$merge = ember$lib$main$$default.merge;

    /**
      The class that all nested object structures, or 'fragments', descend from.
      Fragments are bound to a single 'owner' record (an instance of `DS.Model`)
      and cannot change owners once set. They behave like models, but they have
      no `save` method since their persistence is managed entirely through their
      owner. Because of this, a fragment's state directly influences its owner's
      state, e.g. when a record's fragment `hasDirtyAttributes`, its owner
      `hasDirtyAttributes`.

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

      person.get('hasDirtyAttributes'); // false
      name.get('hasDirtyAttributes'); // false
      name.get('first'); // 'Robert'

      name.set('first', 'The Animal');
      name.get('hasDirtyAttributes'); // true
      person.get('hasDirtyAttributes'); // true

      person.rollbackAttributes();
      name.get('first'); // 'Robert'
      person.get('hasDirtyAttributes'); // false
      person.get('hasDirtyAttributes'); // false
      ```

      @class ModelFragment
      @namespace DS
      @extends CoreModel
      @uses Ember.Comparable
      @uses Ember.Copyable
    */
    var model$fragments$lib$fragments$model$$ModelFragment = ember$data$lib$system$model$$default.extend(ember$lib$main$$default.Comparable, ember$lib$main$$default.Copyable, {
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
        var data = {};

        // TODO: handle copying sub-fragments
        model$fragments$lib$fragments$model$$merge(data, this._data);
        model$fragments$lib$fragments$model$$merge(data, this._attributes);

        return this.store.createFragment(this.constructor.modelName, data);
      },

      /**
        @method adapterDidCommit
      */
      _adapterDidCommit: function(data) {
        model$fragments$lib$fragments$model$$internalModelFor(this).setupData({
          attributes: data || {}
        });
      },

      toStringExtension: function() {
        return 'owner(' + model$fragments$lib$fragments$model$$get(model$fragments$lib$fragments$model$$internalModelFor(this)._owner, 'id') + ')';
      }
    });

    function model$fragments$lib$fragments$model$$getActualFragmentType(declaredType, options, data) {
      if (!options.polymorphic || !data) {
        return declaredType;
      }

      var typeKey = options.typeKey || 'type';
      var actualType = data[typeKey];

      return actualType || declaredType;
    }

    function model$fragments$lib$fragments$model$$internalModelFor(record) {
      var internalModel = record._internalModel;

      // Ensure the internal model has a fragments hash, since we can't override the
      // constructor function anymore
      if (!internalModel._fragments) {
        internalModel._fragments = model$fragments$lib$fragments$model$$create(null);
      }

      return internalModel;
    }

    function model$fragments$lib$fragments$model$$setFragmentOwner(fragment, record, key) {
      var internalModel = model$fragments$lib$fragments$model$$internalModelFor(fragment);

      ember$lib$main$$default.assert("Fragments can only belong to one owner, try copying instead", !internalModel._owner || internalModel._owner === record);

      internalModel._owner = record;
      internalModel._name = key;

      return fragment;
    }

    var model$fragments$lib$fragments$model$$default = model$fragments$lib$fragments$model$$ModelFragment;
    function model$fragments$lib$util$map$$map(obj, callback, thisArg) {
      return obj.map ? obj.map(callback, thisArg) : model$fragments$lib$util$map$$mapPolyfill.call(obj, callback, thisArg);
    }

    var model$fragments$lib$util$map$$default = model$fragments$lib$util$map$$map;

    // https://github.com/emberjs/ember.js/blob/v1.11.0/packages/ember-metal/lib/array.js
    function model$fragments$lib$util$map$$mapPolyfill(fun /*, thisp */) {
      if (this === void 0 || this === null || typeof fun !== "function") {
        throw new TypeError();
      }

      var t = Object(this);
      var len = t.length >>> 0;
      var res = new Array(len);
      var thisp = arguments[1];

      for (var i = 0; i < len; i++) {
        if (i in t) {
          res[i] = fun.call(thisp, t[i], i, t);
        }
      }

      return res;
    }

    /**
      @module ember-data.model-fragments
    */

    var model$fragments$lib$fragments$array$fragment$$get = ember$lib$main$$default.get;
    var model$fragments$lib$fragments$array$fragment$$computed = ember$lib$main$$default.computed;

    /**
      A state-aware array of fragments that is tied to an attribute of a `DS.Model`
      instance. `FragmentArray` instances should not be created directly, instead
      use the `DS.hasManyFragments` attribute.

      @class FragmentArray
      @namespace DS
      @extends StatefulArray
    */
    var model$fragments$lib$fragments$array$fragment$$FragmentArray = model$fragments$lib$fragments$array$stateful$$default.extend({
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
        @method _processData
        @private
        @param {Object} data
      */
      _processData: function(data) {
        var record = model$fragments$lib$fragments$array$fragment$$get(this, 'owner');
        var store = model$fragments$lib$fragments$array$fragment$$get(record, 'store');
        var declaredType = model$fragments$lib$fragments$array$fragment$$get(this, 'type');
        var options = model$fragments$lib$fragments$array$fragment$$get(this, 'options');
        var key = model$fragments$lib$fragments$array$fragment$$get(this, 'name');
        var content = model$fragments$lib$fragments$array$fragment$$get(this, 'content');

        // Mark the fragment array as initializing so that state changes are ignored
        // until after all fragments' data is setup
        this._isInitializing = true;

        // Map data to existing fragments and create new ones where necessary
        var processedData = model$fragments$lib$util$map$$default(ember$lib$main$$default.makeArray(data), function(data, i) {
          var fragment = content[i];

          // Create a new fragment from the data array if needed
          if (!fragment) {
            var actualType = model$fragments$lib$fragments$model$$getActualFragmentType(declaredType, options, data);
            fragment = store.createFragment(actualType);

            model$fragments$lib$fragments$model$$setFragmentOwner(fragment, record, key);
          }

          // Initialize the fragment with the data
          model$fragments$lib$fragments$model$$internalModelFor(fragment).setupData({
            attributes: data
          });

          return fragment;
        });

        this._isInitializing = false;

        return processedData;
      },

      /**
        @method _createSnapshot
        @private
      */
      _createSnapshot: function() {
        // Snapshot each fragment
        return this.map(function(fragment) {
          return fragment._createSnapshot();
        });
      },

      /**
        @method adapterDidCommit
        @private
      */
      _adapterDidCommit: function(data) {
        this._super(data);

        // If the adapter update did not contain new data, just notify each fragment
        // so it can transition to a clean state
        if (!data) {
          // Notify all records of commit
          this.forEach(function(fragment) {
            fragment._adapterDidCommit();
          });
        }
      },

      /**
        If this property is `true`, either the contents of the array do not match
        its original state, or one or more of the fragments in the array are dirty.

        Example

        ```javascript
        array.toArray(); // [ <Fragment:1>, <Fragment:2> ]
        array.get('hasDirtyAttributes'); // false
        array.get('firstObject').set('prop', 'newValue');
        array.get('hasDirtyAttributes'); // true
        ```

        @property hasDirtyAttributes
        @type {Boolean}
        @readOnly
      */
      hasDirtyAttributes: model$fragments$lib$fragments$array$fragment$$computed('@each.hasDirtyAttributes', '_originalState', function() {
        return this._super() || this.isAny('hasDirtyAttributes');
      }),

      /**
        This method reverts local changes of the array's contents to its original
        state, and calls `rollbackAttributes` on each fragment.

        Example

        ```javascript
        array.get('firstObject').get('hasDirtyAttributes'); // true
        array.get('hasDirtyAttributes'); // true
        array.rollbackAttributes();
        array.get('firstObject').get('hasDirtyAttributes'); // false
        array.get('hasDirtyAttributes'); // false
        ```

        @method rollbackAttributes
      */
      rollbackAttributes: function() {
        this._super();
        this.invoke('rollbackAttributes');
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
        var array = this;
        var record = model$fragments$lib$fragments$array$fragment$$get(this, 'owner');
        var key = model$fragments$lib$fragments$array$fragment$$get(this, 'name');

        // Since all array manipulation methods end up using this method, ensure
        // ensure that fragments are the correct type and have an owner and name
        if (fragments) {
          fragments.forEach(function(fragment) {
            var owner = model$fragments$lib$fragments$model$$internalModelFor(fragment)._owner;

            ember$lib$main$$default.assert("Fragments can only belong to one owner, try copying instead", !owner || owner === record);
            ember$lib$main$$default.assert("You can only add '" + model$fragments$lib$fragments$array$fragment$$get(array, 'type') + "' fragments to this property", (function (type) {
              if (fragment instanceof type) {
                return true;
              } else if (ember$lib$main$$default.MODEL_FACTORY_INJECTIONS) {
                return fragment instanceof type.superclass;
              }

              return false;
            })(model$fragments$lib$fragments$array$fragment$$get(record, 'store').modelFor(model$fragments$lib$fragments$array$fragment$$get(array, 'type'))));

            if (!owner) {
              model$fragments$lib$fragments$model$$setFragmentOwner(fragment, record, key);
            }
          });
        }

        return model$fragments$lib$fragments$array$fragment$$get(this, 'content').replace(idx, amt, fragments);
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
        var record = model$fragments$lib$fragments$array$fragment$$get(this, 'owner');
        var store = model$fragments$lib$fragments$array$fragment$$get(record, 'store');
        var type = model$fragments$lib$fragments$array$fragment$$get(this, 'type');
        var fragment = store.createFragment(type, props);

        return this.pushObject(fragment);
      }
    });

    var model$fragments$lib$fragments$array$fragment$$default = model$fragments$lib$fragments$array$fragment$$FragmentArray;
    var model$fragments$lib$util$ember$new$computed$$Ember = window.Ember;
    var model$fragments$lib$util$ember$new$computed$$computed = model$fragments$lib$util$ember$new$computed$$Ember.computed;
    var model$fragments$lib$util$ember$new$computed$$supportsSetterGetter;

    try {
      model$fragments$lib$util$ember$new$computed$$Ember.computed({
        set: function() { },
        get: function() { }
      });
      model$fragments$lib$util$ember$new$computed$$supportsSetterGetter = true;
    } catch(e) {
      model$fragments$lib$util$ember$new$computed$$supportsSetterGetter = false;
    }

    var model$fragments$lib$util$ember$new$computed$$default = function() {
      var polyfillArguments = [];
      var config = arguments[arguments.length - 1];

      if (typeof config === 'function' || model$fragments$lib$util$ember$new$computed$$supportsSetterGetter) {
        return model$fragments$lib$util$ember$new$computed$$computed.apply(this, arguments);
      }

      for (var i = 0, l = arguments.length - 1; i < l; i++) {
        polyfillArguments.push(arguments[i]);
      }

      var func;
      if (config.set) {
        func = function(key, value) {
          if (arguments.length > 1) {
            return config.set.call(this, key, value);
          } else {
            return config.get.call(this, key);
          }
        };
      } else {
        func = function(key) {
          return config.get.call(this, key);
        };
      }

      polyfillArguments.push(func);

      return model$fragments$lib$util$ember$new$computed$$computed.apply(this, polyfillArguments);
    };

    /**
      @module ember-data.model-fragments
    */

    var model$fragments$lib$fragments$attributes$$get = ember$lib$main$$default.get;

    // Create a unique type string for the combination of fragment property type,
    // fragment model name, and polymorphic type key
    function model$fragments$lib$fragments$attributes$$metaTypeFor(type, modelName, options) {
      var metaType = '-mf-' + type;

      if (modelName) {
        metaType += '$' + modelName;
      }

      if (options && options.polymorphic) {
        metaType += '$' + (options.typeKey || 'type');
      }

      return metaType;
    }

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
    function model$fragments$lib$fragments$attributes$$hasOneFragment(declaredModelName, options) {
      options = options || {};

      var metaType = model$fragments$lib$fragments$attributes$$metaTypeFor('fragment', declaredModelName, options);

      function setupFragment(store, record, key) {
        var internalModel = model$fragments$lib$fragments$model$$internalModelFor(record);
        var data = internalModel._data[key] || model$fragments$lib$fragments$attributes$$getDefaultValue(internalModel, options, 'object');
        var fragment = internalModel._fragments[key];
        var actualTypeName = model$fragments$lib$fragments$model$$getActualFragmentType(declaredModelName, options, data);

        // Regardless of whether being called as a setter or getter, the fragment
        // may not be initialized yet, in which case the data will contain a
        // raw response or a stashed away fragment

        // If we already have a processed fragment in _data and our current fragmet is
        // null simply reuse the one from data. We can be in this state after a rollback
        // for example
        if (!fragment && model$fragments$lib$fragments$attributes$$isInstanceOfType(store.modelFor(actualTypeName), data)) {
          fragment = data;
        // Else initialize the fragment
        } else if (data && data !== fragment) {
          fragment || (fragment = model$fragments$lib$fragments$model$$setFragmentOwner(store.createFragment(actualTypeName), record, key));
          // Make sure to first cache the fragment before calling setupData, so if setupData causes this CP to be accessed
          // again we have it cached already
          internalModel._data[key] = fragment;
          model$fragments$lib$fragments$model$$internalModelFor(fragment).setupData({
            attributes: data
          });
        } else {
          // Handle the adapter setting the fragment to null
          fragment = data;
        }

        return fragment;
      }

      function setFragmentValue(record, key, fragment, value) {
        ember$lib$main$$default.assert("You can only assign a '" + declaredModelName + "' fragment to this property", value === null || model$fragments$lib$fragments$attributes$$isInstanceOfType(record.store.modelFor(declaredModelName), value));

        var internalModel = model$fragments$lib$fragments$model$$internalModelFor(record);
        fragment = value ? model$fragments$lib$fragments$model$$setFragmentOwner(value, record, key) : null;

        if (internalModel._data[key] !== fragment) {
          model$fragments$lib$fragments$states$$fragmentDidDirty(record, key, fragment);
        } else {
          model$fragments$lib$fragments$states$$fragmentDidReset(record, key);
        }

        return fragment;
      }

      return model$fragments$lib$fragments$attributes$$fragmentProperty(metaType, options, setupFragment, setFragmentValue);
    }

    // Check whether a fragment is an instance of the given type, respecting model
    // factory injections
    function model$fragments$lib$fragments$attributes$$isInstanceOfType(type, fragment) {
      if (fragment instanceof type) {
        return true;
      } else if (ember$lib$main$$default.MODEL_FACTORY_INJECTIONS) {
        return fragment instanceof type.superclass;
      }

      return false;
    }

    /**
      `DS.hasManyFragments` defines an attribute on a `DS.Model` or
      `DS.ModelFragment` instance. Much like `DS.hasMany`, it creates a property
      that returns an array of fragments of the given type. The array is aware of
      its original state and so has a `hasDirtyAttributes` property and a `rollback` method.
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
        addresses: DS.hasManyFragments('address', { defaultValue: [] })
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
    function model$fragments$lib$fragments$attributes$$hasManyFragments(modelName, options) {
      options || (options = {});

      // If a modelName is not given, it implies an array of primitives
      if (ember$lib$main$$default.typeOf(modelName) !== 'string') {
        return model$fragments$lib$fragments$attributes$$arrayProperty(options);
      }

      var metaType = model$fragments$lib$fragments$attributes$$metaTypeFor('fragment-array', modelName, options);

      return model$fragments$lib$fragments$attributes$$fragmentArrayProperty(metaType, options, function createFragmentArray(record, key) {
        return model$fragments$lib$fragments$array$fragment$$default.create({
          type: modelName,
          options: options,
          name: key,
          owner: record
        });
      });
    }

    function model$fragments$lib$fragments$attributes$$arrayProperty(options) {
      options || (options = {});

      var metaType = model$fragments$lib$fragments$attributes$$metaTypeFor('array');

      return model$fragments$lib$fragments$attributes$$fragmentArrayProperty(metaType, options, function createStatefulArray(record, key) {
        return model$fragments$lib$fragments$array$stateful$$default.create({
          options: options,
          name: key,
          owner: record
        });
      });
    }

    function model$fragments$lib$fragments$attributes$$fragmentProperty(type, options, setupFragment, setFragmentValue) {
      options = options || {};

      var meta = {
        type: type,
        isAttribute: true,
        isFragment: true,
        options: options
      };

      return model$fragments$lib$util$ember$new$computed$$default({
        get: function(key) {
          var internalModel = model$fragments$lib$fragments$model$$internalModelFor(this);
          var fragment = setupFragment(this.store, this, key);

          return internalModel._fragments[key] = fragment;
        },
        set: function(key, value) {
          var internalModel = model$fragments$lib$fragments$model$$internalModelFor(this);
          var fragment = setupFragment(this.store, this, key);

          fragment = setFragmentValue(this, key, fragment, value);

          return internalModel._fragments[key] = fragment;
        }
      }).meta(meta);
    }

    function model$fragments$lib$fragments$attributes$$fragmentArrayProperty(metaType, options, createArray) {
      function setupFragmentArray(store, record, key) {
        var internalModel = model$fragments$lib$fragments$model$$internalModelFor(record);
        var data = internalModel._data[key] || model$fragments$lib$fragments$attributes$$getDefaultValue(internalModel, options, 'array');
        var fragments = internalModel._fragments[key] || null;

        // If we already have a processed fragment in _data and our current fragmet is
        // null simply reuse the one from data. We can be in this state after a rollback
        // for example
        if (data instanceof model$fragments$lib$fragments$array$stateful$$default && !fragments) {
          fragments = data;
        // Create a fragment array and initialize with data
        } else if (data && data !== fragments) {
          fragments || (fragments = createArray(record, key));
          internalModel._data[key] = fragments;
          fragments.setupData(data);
        } else {
          // Handle the adapter setting the fragment array to null
          fragments = data;
        }

        return fragments;
      }

      function setFragmentValue(record, key, fragments, value) {
        var internalModel = model$fragments$lib$fragments$model$$internalModelFor(record);

        if (ember$lib$main$$default.isArray(value)) {
          fragments || (fragments = createArray(record, key));
          fragments.setObjects(value);
        } else if (value === null) {
          fragments = null;
        } else {
          ember$lib$main$$default.assert("A fragment array property can only be assigned an array or null");
        }

        if (internalModel._data[key] !== fragments || model$fragments$lib$fragments$attributes$$get(fragments, 'hasDirtyAttributes')) {
          model$fragments$lib$fragments$states$$fragmentDidDirty(record, key, fragments);
        } else {
          model$fragments$lib$fragments$states$$fragmentDidReset(record, key);
        }

        return fragments;
      }

      return model$fragments$lib$fragments$attributes$$fragmentProperty(metaType, options, setupFragmentArray, setFragmentValue);
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
    function model$fragments$lib$fragments$attributes$$fragmentOwner() {
      // TODO: add a warning when this is used on a non-fragment
      return ember$lib$main$$default.computed(function() {
        return model$fragments$lib$fragments$model$$internalModelFor(this)._owner;
      }).readOnly();
    }

    // The default value of a fragment is either an array or an object,
    // which should automatically get deep copied
    function model$fragments$lib$fragments$attributes$$getDefaultValue(record, options, type) {
      var value;

      if (typeof options.defaultValue === "function") {
        value = options.defaultValue();
      } else if (options.defaultValue) {
        value = options.defaultValue;
      } else {
        return null;
      }

      ember$lib$main$$default.assert("The fragment's default value must be an " + type, ember$lib$main$$default.typeOf(value) == type);

      // Create a deep copy of the resulting value to avoid shared reference errors
      return ember$lib$main$$default.copy(value, true);
    }

    /**
      @module ember-data.model-fragments
    */

    var model$fragments$lib$fragments$transforms$array$$makeArray = ember$lib$main$$default.makeArray;

    /**
      Transform for array-like attributes fragment attribute with no model

      @class ArrayTransform
      @namespace DS
      @extends DS.Transform
    */
    var model$fragments$lib$fragments$transforms$array$$ArrayTransform = ember$data$lib$system$transform$$default.extend({
      deserialize: function deserializeArray(data) {
        return data == null ? null : model$fragments$lib$fragments$transforms$array$$makeArray(data);
      },

      serialize: function serializeArray(array) {
        return array && array.toArray ? array.toArray() : array;
      }
    });

    var model$fragments$lib$fragments$transforms$array$$default = model$fragments$lib$fragments$transforms$array$$ArrayTransform;

    /**
      @module ember-data.model-fragments
    */

    var model$fragments$lib$fragments$transforms$fragment$$get = ember$lib$main$$default.get;

    /**
      Transform for `DS.hasOneFragment` fragment attribute which delegates work to
      the fragment type's serializer

      @class FragmentTransform
      @namespace DS
      @extends DS.Transform
    */
    var model$fragments$lib$fragments$transforms$fragment$$FragmentTransform = ember$data$lib$system$transform$$default.extend({
      store: null,
      modelName: null,
      polymorphicTypeProp: null,

      deserialize: function deserializeFragment(data) {
        if (data == null) {
          return null;
        }

        return this.deserializeSingle(data);
      },

      serialize: function serializeFragment(snapshot) {
        if (!snapshot) {
          return null;
        }

        var store = this.store;
        var serializer = store.serializerFor(snapshot.modelName);

        return serializer.serialize(snapshot);
      },

      modelNameFor: function modelNameFor(data) {
        var modelName = model$fragments$lib$fragments$transforms$fragment$$get(this, 'modelName');
        var polymorphicTypeProp = model$fragments$lib$fragments$transforms$fragment$$get(this, 'polymorphicTypeProp');

        if (data && polymorphicTypeProp && data[polymorphicTypeProp]) {
          modelName = data[polymorphicTypeProp];
        }

        return modelName;
      },

      deserializeSingle: function deserializeSingle(data) {
        var store = this.store;
        var modelName = this.modelNameFor(data);
        var serializer = store.serializerFor(modelName);

        ember$lib$main$$default.assert("The `JSONAPISerializer` is not suitable for model fragments, please use `JSONSerializer`", !(serializer instanceof ember$data$lib$serializers$json$api$serializer$$default));

        var isNewSerializerAPI = model$fragments$lib$fragments$transforms$fragment$$get(serializer, 'isNewSerializerAPI');
        var typeClass = store.modelFor(modelName);
        var serialized = serializer.normalize(typeClass, data);

        // The new serializer API returns a full JSON API document, but we only need
        // the attributes hash
        if (isNewSerializerAPI) {
          return model$fragments$lib$fragments$transforms$fragment$$get(serialized, 'data.attributes');
        } else {
          return serialized;
        }
      }
    });

    var model$fragments$lib$fragments$transforms$fragment$$default = model$fragments$lib$fragments$transforms$fragment$$FragmentTransform;

    /**
      @module ember-data.model-fragments
    */

    /**
      Transform for `DS.hasManyFragments` fragment attribute which delegates work to
      the fragment type's serializer

      @class FragmentArrayTransform
      @namespace DS
      @extends DS.Transform
    */
    var model$fragments$lib$fragments$transforms$fragment$array$$FragmentArrayTransform = model$fragments$lib$fragments$transforms$fragment$$default.extend({
      deserialize: function deserializeFragmentArray(data) {
        if (data == null) {
          return null;
        }

        return model$fragments$lib$util$map$$default(data, function(datum) {
          return this.deserializeSingle(datum);
        }, this);
      },

      serialize: function serializeFragmentArray(snapshots) {
        if (!snapshots) {
          return null;
        }

        var store = this.store;

        return model$fragments$lib$util$map$$default(snapshots, function(snapshot) {
          var serializer = store.serializerFor(snapshot.modelName);

          return serializer.serialize(snapshot);
        });
      }
    });

    var model$fragments$lib$fragments$transforms$fragment$array$$default = model$fragments$lib$fragments$transforms$fragment$array$$FragmentArrayTransform;

    var model$fragments$lib$initializers$$initializers = [
      {
        name: "fragmentTransform",
        before: "store",

        initialize: function(container, application) {
          application.register('transform:fragment', model$fragments$lib$fragments$transforms$fragment$$default);
          application.register('transform:fragment-array', model$fragments$lib$fragments$transforms$fragment$array$$default);
          application.register('transform:array', model$fragments$lib$fragments$transforms$array$$default);
        }
      }
    ];

    var model$fragments$lib$initializers$$default = model$fragments$lib$initializers$$initializers;

    function model$fragments$lib$main$$exportMethods(scope) {
      scope.ModelFragment = model$fragments$lib$fragments$model$$default;
      scope.FragmentArray = model$fragments$lib$fragments$array$fragment$$default;
      scope.FragmentTransform = model$fragments$lib$fragments$transforms$fragment$$default;
      scope.FragmentArrayTransform = model$fragments$lib$fragments$transforms$fragment$array$$default;
      scope.ArrayTransform = model$fragments$lib$fragments$transforms$array$$default;
      scope.hasOneFragment = model$fragments$lib$fragments$attributes$$hasOneFragment;
      scope.hasManyFragments = model$fragments$lib$fragments$attributes$$hasManyFragments;
      scope.fragmentOwner = model$fragments$lib$fragments$attributes$$fragmentOwner;
    }

    /**
      Ember Data Model Fragments

      @module ember-data.model-fragments
      @main ember-data.model-fragments
    */
    var model$fragments$lib$main$$MF = ember$lib$main$$default.Namespace.create({
      VERSION: '0.3.3+8b1fcdd5'
    });

    model$fragments$lib$main$$exportMethods(model$fragments$lib$main$$MF);

    // This will be removed at some point in favor of the `MF` namespace
    model$fragments$lib$main$$exportMethods(ember$data$lib$main$$default);

    ember$lib$main$$default.onLoad('Ember.Application', function(Application) {
      model$fragments$lib$initializers$$default.forEach(Application.initializer, Application);
    });

    if (ember$lib$main$$default.libraries) {
      ember$lib$main$$default.libraries.register('Model Fragments', model$fragments$lib$main$$MF.VERSION);
    }

    var model$fragments$lib$main$$default = model$fragments$lib$main$$MF;
}).call(this);

//# sourceMappingURL=ember-data.model-fragments.map