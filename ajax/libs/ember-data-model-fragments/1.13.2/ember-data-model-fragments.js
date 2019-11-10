/*!
 * @overview  Ember Data Model Fragments
 * @copyright Copyright 2015 Lytics Inc. and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/lytics/ember-data-model-fragments/master/LICENSE
 * @version   1.13.2
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
      @module ember-data-model-fragments
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
            if (!record._internalModel._fragments[key]) { return; }

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
      @module ember-data-model-fragments
    */

    var model$fragments$lib$fragments$array$stateful$$get = ember$lib$main$$default.get;
    var model$fragments$lib$fragments$array$stateful$$set = ember$lib$main$$default.set;
    var model$fragments$lib$fragments$array$stateful$$computed = ember$lib$main$$default.computed;
    var model$fragments$lib$fragments$array$stateful$$copy = ember$lib$main$$default.copy;
    var model$fragments$lib$fragments$array$stateful$$makeArray = ember$lib$main$$default.makeArray;

    /**
      A state-aware array that is tied to an attribute of a `DS.Model` instance.

      @class StatefulArray
      @namespace MF
      @extends Ember.ArrayProxy
    */
    var model$fragments$lib$fragments$array$stateful$$StatefulArray = ember$lib$main$$default.ArrayProxy.extend(ember$lib$main$$default.Copyable, {
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
        Copies the array by calling copy on each of its members.

        @method copy
        @return {array} a new array
      */
      copy: function() {
        return this.map(model$fragments$lib$fragments$array$stateful$$copy);
      },

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

        var processedData = this._normalizeData(model$fragments$lib$fragments$array$stateful$$makeArray(data));
        var content = model$fragments$lib$fragments$array$stateful$$get(this, 'content');

        // This data is canonical, so create rollback point
        model$fragments$lib$fragments$array$stateful$$set(this, '_originalState', processedData);

        // Completely replace the contents with the new data
        content.replace(0, model$fragments$lib$fragments$array$stateful$$get(content, 'length'), processedData);

        this._pendingData = undefined;
      },

      /**
        @method _normalizeData
        @private
        @param {Object} data
      */
      _normalizeData: function(data) {
        return data;
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
        @method _flushChangedAttributes
      */
      _flushChangedAttributes: function() {},

      /**
        @method _adapterDidCommit
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
      @module ember-data-model-fragments
    */

    var model$fragments$lib$fragments$ext$$keys = Object.keys || Ember.keys;
    var model$fragments$lib$fragments$ext$$create = Object.create || Ember.create;

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
        @return {MF.Fragment} fragment
      */
      createFragment: function(modelName, props) {
        var type = this.modelFor(modelName);

        Ember.assert("The '" + type + "' model must be a subclass of MF.Fragment", model$fragments$lib$fragments$fragment$$default.detect(type));

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

        // Add brand to reduce usages of `instanceof`
        fragment._isFragment = true;

        return fragment;
      },

      /**
        Changes serializer fallbacks for fragments to use `serializer:-fragment`
        if registered, then uses the default serializer.

        @method serializerFor
        @private
        @param {String} modelName the record to serialize
        @return {DS.Serializer}
      */
      serializerFor: function(modelOrClass) {
        var modelName;

        if (typeof modelOrClass === 'string') {
          modelName = modelOrClass;
        } else {
          modelName = modelOrClass.modelName;
        }

        // Don't fail on non-model lookups ('application', '-default', etc.)
        var type = this.modelFactoryFor(modelName);

        // For fragments, don't use the application serializer or adapter default
        // as a fallbacks
        if (type && model$fragments$lib$fragments$fragment$$default.detect(type)) {
          var fallbacks = [
            '-fragment',
            '-default'
          ];

          return this.lookupSerializer(modelName, fallbacks);
        }

        return this._super(modelOrClass);
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
          name: MF.fragment('name')
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
        var internalModel = model$fragments$lib$fragments$fragment$$internalModelFor(this);

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
      Before saving a record, its attributes must be moved to in-flight, which must
      happen for all fragments as well

      @method flushChangedAttributes
    */
    model$fragments$lib$fragments$ext$$decorateMethod(model$fragments$lib$fragments$ext$$InternalModelPrototype, 'flushChangedAttributes', function flushChangedAttributesFragments() {
      var fragment;

      // Notify fragments that the record was committed
      for (var key in this._fragments) {
        if (fragment = this._fragments[key]) {
          fragment._flushChangedAttributes();
        }
      }
    });

    /**
      If the adapter did not return a hash in response to a commit,
      merge the changed attributes and relationships into the existing
      saved data and notify all fragments of the commit.

      @method adapterDidCommit
    */
    model$fragments$lib$fragments$ext$$decorateMethod(model$fragments$lib$fragments$ext$$InternalModelPrototype, 'adapterDidCommit', function adapterDidCommitFragments(returnValue, args) {
      var attributes = (args[0] && args[0].attributes) || model$fragments$lib$fragments$ext$$create(null);
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
      var registry = container._registry || container.registry || container;
      var containerKey = 'transform:' + attributeType;
      var match = attributeType.match(/^-mf-(fragment|fragment-array|array)(?:\$([^$]+))?(?:\$(.+))?$/);
      var transformName = match[1];
      var transformType = match[2];
      var polymorphicTypeProp = match[3];

      if (!registry.has(containerKey)) {
        var transformClass = container.lookupFactory('transform:' + transformName);

        registry.register(containerKey, transformClass.extend({
          store: store,
          type: transformType,
          polymorphicTypeProp: polymorphicTypeProp
        }));
      }

      return container.lookup(containerKey);
    }

    /**
      @module ember-data-model-fragments
    */

    var model$fragments$lib$fragments$fragment$$get = ember$lib$main$$default.get;
    var model$fragments$lib$fragments$fragment$$create = Object.create || ember$lib$main$$default.create;
    var model$fragments$lib$fragments$fragment$$copy = ember$lib$main$$default.copy;

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
        name: MF.fragment('name')
      });

      App.Name = MF.Fragment.extend({
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

      @class Fragment
      @namespace MF
      @extends CoreModel
      @uses Ember.Comparable
      @uses Ember.Copyable
    */
    var model$fragments$lib$fragments$fragment$$Fragment = ember$data$lib$system$model$$default.extend(ember$lib$main$$default.Comparable, ember$lib$main$$default.Copyable, {
      /**
        Compare two fragments by identity to allow `FragmentArray` to diff arrays.

        @method compare
        @param a {MF.Fragment} the first fragment to compare
        @param b {MF.Fragment} the second fragment to compare
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
        @return {MF.Fragment} the newly created fragment
      */
      copy: function() {
        var type = this.constructor;
        var props = model$fragments$lib$fragments$fragment$$create(null);

        // Loop over each attribute and copy individually to ensure nested fragments
        // are also copied
        type.eachAttribute(function(name) {
          props[name] = model$fragments$lib$fragments$fragment$$copy(model$fragments$lib$fragments$fragment$$get(this, name));
        }, this);

        return this.store.createFragment(type.modelName, props);
      },

      /**
        @method _flushChangedAttributes
      */
      _flushChangedAttributes: function() {
        model$fragments$lib$fragments$fragment$$internalModelFor(this).flushChangedAttributes();
      },

      /**
        @method _adapterDidCommit
      */
      _adapterDidCommit: function(data) {
        model$fragments$lib$fragments$fragment$$internalModelFor(this).adapterDidCommit({
          attributes: data || model$fragments$lib$fragments$fragment$$create(null)
        });
      },

      toStringExtension: function() {
        return 'owner(' + model$fragments$lib$fragments$fragment$$get(model$fragments$lib$fragments$fragment$$internalModelFor(this)._owner, 'id') + ')';
      }
    }).reopenClass({
      fragmentOwnerProperties: ember$lib$main$$default.computed(function() {
        var props = [];

        this.eachComputedProperty(function(name, meta) {
          if (meta.isFragmentOwner) {
            props.push(name);
          }
        });

        return props;
      }).readOnly()
    });

    function model$fragments$lib$fragments$fragment$$getActualFragmentType(declaredType, options, data) {
      if (!options.polymorphic || !data) {
        return declaredType;
      }

      var typeKey = options.typeKey || 'type';
      var actualType = data[typeKey];

      return actualType || declaredType;
    }

    function model$fragments$lib$fragments$fragment$$internalModelFor(record) {
      var internalModel = record._internalModel;

      // Ensure the internal model has a fragments hash, since we can't override the
      // constructor function anymore
      if (!internalModel._fragments) {
        internalModel._fragments = model$fragments$lib$fragments$fragment$$create(null);
      }

      return internalModel;
    }

    function model$fragments$lib$fragments$fragment$$setFragmentOwner(fragment, record, key) {
      var internalModel = model$fragments$lib$fragments$fragment$$internalModelFor(fragment);

      ember$lib$main$$default.assert("To preserve rollback semantics, fragments can only belong to one owner. Try copying instead", !internalModel._owner || internalModel._owner === record);

      internalModel._owner = record;
      internalModel._name = key;

      // Notify any observers of `fragmentOwner` properties
      model$fragments$lib$fragments$fragment$$get(fragment.constructor, 'fragmentOwnerProperties').forEach(function(name) {
        fragment.notifyPropertyChange(name);
      });

      return fragment;
    }

    function model$fragments$lib$fragments$fragment$$setFragmentData(fragment, data) {
      model$fragments$lib$fragments$fragment$$internalModelFor(fragment).setupData({
        attributes: data
      });
    }

    function model$fragments$lib$fragments$fragment$$createFragment(store, declaredModelName, record, key, options, data) {
      var actualModelName = model$fragments$lib$fragments$fragment$$getActualFragmentType(declaredModelName, options, data);
      var fragment = store.createFragment(actualModelName);

      model$fragments$lib$fragments$fragment$$setFragmentOwner(fragment, record, key);
      model$fragments$lib$fragments$fragment$$setFragmentData(fragment, data);

      return fragment;
    }

    function model$fragments$lib$fragments$fragment$$isFragment(obj) {
      return obj && obj._isFragment;
    }

    var model$fragments$lib$fragments$fragment$$default = model$fragments$lib$fragments$fragment$$Fragment;
    function model$fragments$lib$util$instance$of$type$$isInstanceOfType(type, obj) {
      if (obj instanceof type) {
        return true;
      } else if (Ember.MODEL_FACTORY_INJECTIONS) {
        return obj instanceof type.superclass;
      }

      return false;
    }
    var model$fragments$lib$util$instance$of$type$$default = model$fragments$lib$util$instance$of$type$$isInstanceOfType;
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
      @module ember-data-model-fragments
    */

    var model$fragments$lib$fragments$array$fragment$$get = ember$lib$main$$default.get;
    var model$fragments$lib$fragments$array$fragment$$setProperties = ember$lib$main$$default.setProperties;
    var model$fragments$lib$fragments$array$fragment$$computed = ember$lib$main$$default.computed;
    var model$fragments$lib$fragments$array$fragment$$typeOf = ember$lib$main$$default.typeOf;

    // Normalizes an array of object literals or fragments into fragment instances,
    // reusing fragments from a source content array when possible
    function model$fragments$lib$fragments$array$fragment$$normalizeFragmentArray(array, content, objs, canonical) {
      var record = model$fragments$lib$fragments$array$fragment$$get(array, 'owner');
      var store = model$fragments$lib$fragments$array$fragment$$get(record, 'store');
      var declaredModelName = model$fragments$lib$fragments$array$fragment$$get(array, 'type');
      var options = model$fragments$lib$fragments$array$fragment$$get(array, 'options');
      var key = model$fragments$lib$fragments$array$fragment$$get(array, 'name');
      var fragment;

      return model$fragments$lib$util$map$$default(objs, function(data, index) {
        ember$lib$main$$default.assert("You can only add '" + model$fragments$lib$fragments$array$fragment$$get(array, 'type') + "' fragments or object literals to this property", model$fragments$lib$fragments$array$fragment$$typeOf(data) === 'object' || model$fragments$lib$util$instance$of$type$$default(store.modelFor(model$fragments$lib$fragments$array$fragment$$get(array, 'type')), data));

        if (model$fragments$lib$fragments$fragment$$isFragment(data)) {
          fragment = data;

          var owner = model$fragments$lib$fragments$fragment$$internalModelFor(fragment)._owner;

          ember$lib$main$$default.assert("Fragments can only belong to one owner, try copying instead", !owner || owner === record);

          if (!owner) {
            model$fragments$lib$fragments$fragment$$setFragmentOwner(fragment, record, key);
          }
        } else {
          fragment = content[index];

          if (fragment) {
            // The data could come from a property update, which should leave the
            // fragment in a dirty state, or an adapter operation which should leave
            // it in a clean state
            if (canonical) {
              model$fragments$lib$fragments$fragment$$setFragmentData(fragment, data);
            } else {
              model$fragments$lib$fragments$array$fragment$$setProperties(fragment, data);
            }
          } else {
            fragment = model$fragments$lib$fragments$fragment$$createFragment(store, declaredModelName, record, key, options, data);
          }
        }

        return fragment;
      });
    }

    /**
      A state-aware array of fragments that is tied to an attribute of a `DS.Model`
      instance. `FragmentArray` instances should not be created directly, instead
      use `MF.fragmentArray` or `MF.array`.

      @class FragmentArray
      @namespace MF
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

      /**
        @method _normalizeData
        @private
        @param {Object} data
      */
      _normalizeData: function(data) {
        var content = model$fragments$lib$fragments$array$fragment$$get(this, 'content');

        return model$fragments$lib$fragments$array$fragment$$normalizeFragmentArray(this, content, data, true);
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
        @method _flushChangedAttributes
      */
      _flushChangedAttributes: function() {
        this.map(function(fragment) {
          fragment._flushChangedAttributes();
        });
      },

      /**
        @method _adapterDidCommit
        @private
      */
      _adapterDidCommit: function(data) {
        this._super(data);

        // Notify all records of commit; if the adapter update did not contain new
        // data, just notify each fragment so it can transition to a clean state
        this.forEach(function(fragment, index) {
          fragment._adapterDidCommit(data && data[index]);
        });
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

      /**
        Used to normalize data since all array manipulation methods use this method.

        @method replaceContent
        @private
      */
      replaceContent: function(index, amount, objs) {
        var content = model$fragments$lib$fragments$array$fragment$$get(this, 'content');
        var replacedContent = content.slice(index, index + amount);
        var fragments = model$fragments$lib$fragments$array$fragment$$normalizeFragmentArray(this, replacedContent, objs);

        return content.replace(index, amount, fragments);
      },

      /**
        Adds an existing fragment to the end of the fragment array. Alias for
        `addObject`.

        @method addFragment
        @param {MF.Fragment} fragment
        @return {MF.Fragment} the newly added fragment
      */
      addFragment: function(fragment) {
        return this.addObject(fragment);
      },

      /**
        Removes the given fragment from the array. Alias for `removeObject`.

        @method removeFragment
        @param {MF.Fragment} fragment
        @return {MF.Fragment} the removed fragment
      */
      removeFragment: function(fragment) {
        return this.removeObject(fragment);
      },

      /**
        Creates a new fragment of the fragment array's type and adds it to the end
        of the fragment array

        @method createFragment
        @param {MF.Fragment} fragment
        @return {MF.Fragment} the newly added fragment
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
      @module ember-data-model-fragments
    */

    var model$fragments$lib$fragments$attributes$$get = ember$lib$main$$default.get;
    var model$fragments$lib$fragments$attributes$$setProperties = ember$lib$main$$default.setProperties;
    var model$fragments$lib$fragments$attributes$$isArray = ember$lib$main$$default.isArray;
    var model$fragments$lib$fragments$attributes$$typeOf = ember$lib$main$$default.typeOf;
    var model$fragments$lib$fragments$attributes$$copy = ember$lib$main$$default.copy;
    var model$fragments$lib$fragments$attributes$$computed = ember$lib$main$$default.computed;

    // Create a unique type string for the combination of fragment property type,
    // transform type (or fragment model), and polymorphic type key
    function model$fragments$lib$fragments$attributes$$metaTypeFor(name, type, options) {
      var metaType = '-mf-' + name;

      if (type) {
        metaType += '$' + type;
      }

      if (options && options.polymorphic) {
        metaType += '$' + (options.typeKey || 'type');
      }

      return metaType;
    }

    /**
      `MF.fragment` defines an attribute on a `DS.Model` or `MF.Fragment`. Much
      like `DS.belongsTo`, it creates a property that returns a single fragment of
      the given type.

      It takes an optional hash as a second parameter, currently supported options
      are:

      - `defaultValue`: An object literal or a function to be called to set the
        attribute to a default value if none is supplied. Values are deep copied
        before being used. Note that default values will be passed through the
        fragment's serializer when creating the fragment. Defaults to `null`.
      - `polymorphic`: Whether or not the fragments in the array can be child
        classes of the given type.
      - `typeKey`: If `polymorphic` is true, the property to use as the fragment
        type in the normalized data. Defaults to `type`.

      Example

      ```javascript
      App.Person = DS.Model.extend({
        name: MF.fragment('name', { defaultValue: {} })
      });

      App.Name = MF.Fragment.extend({
        first: DS.attr('string'),
        last: DS.attr('string')
      });
      ```

      @namespace MF
      @method fragment
      @param {String} type the fragment type
      @param {Object} options a hash of options
      @return {Attribute}
    */
    function model$fragments$lib$fragments$attributes$$fragment(declaredModelName, options) {
      options = options || {};

      var metaType = model$fragments$lib$fragments$attributes$$metaTypeFor('fragment', declaredModelName, options);

      function setupFragment(store, record, key) {
        var internalModel = model$fragments$lib$fragments$fragment$$internalModelFor(record);
        var data = model$fragments$lib$fragments$attributes$$getWithDefault(internalModel, key, options, 'object');
        var fragment = internalModel._fragments[key];

        // Regardless of whether being called as a setter or getter, the fragment
        // may not be initialized yet, in which case the data will contain a
        // raw response or a stashed away fragment

        // If we already have a processed fragment in _data and our current fragment is
        // null simply reuse the one from data. We can be in this state after a rollback
        // for example
        if (!fragment && model$fragments$lib$fragments$fragment$$isFragment(data)) {
          fragment = data;
        // Else initialize the fragment
        } else if (data && data !== fragment) {
          if (fragment) {
            model$fragments$lib$fragments$fragment$$setFragmentData(fragment, data);
          } else {
            fragment = model$fragments$lib$fragments$fragment$$createFragment(store, declaredModelName, record, key, options, data);
          }

          internalModel._data[key] = fragment;
        } else {
          // Handle the adapter setting the fragment to null
          fragment = data;
        }

        return fragment;
      }

      function setFragmentValue(record, key, fragment, value) {
        var store = record.store;
        var internalModel = model$fragments$lib$fragments$fragment$$internalModelFor(record);

        ember$lib$main$$default.assert("You can only assign `null`, an object literal or a '" + declaredModelName + "' fragment instance to this property", value === null || model$fragments$lib$fragments$attributes$$typeOf(value) === 'object' || model$fragments$lib$util$instance$of$type$$default(store.modelFor(declaredModelName), value));

        if (!value) {
          fragment = null;
        } else if (model$fragments$lib$fragments$fragment$$isFragment(value)) {
          // A fragment instance was given, so just replace the existing value
          fragment = model$fragments$lib$fragments$fragment$$setFragmentOwner(value, record, key);
        } else if (!fragment) {
          // A property hash was given but the property was null, so create a new
          // fragment with the data
          fragment = model$fragments$lib$fragments$fragment$$createFragment(store, declaredModelName, record, key, options, value);
        } else {
          // The fragment already exists and a property hash is given, so just set
          // its values and let the state machine take care of the dirtiness
          return model$fragments$lib$fragments$attributes$$setProperties(fragment, value);
        }

        if (internalModel._data[key] !== fragment) {
          model$fragments$lib$fragments$states$$fragmentDidDirty(record, key, fragment);
        } else {
          model$fragments$lib$fragments$states$$fragmentDidReset(record, key);
        }

        return fragment;
      }

      return model$fragments$lib$fragments$attributes$$fragmentProperty(metaType, options, setupFragment, setFragmentValue);
    }

    /**
      `MF.fragmentArray` defines an attribute on a `DS.Model` or `MF.Fragment`.
      Much like `DS.hasMany`, it creates a property that returns an array of
      fragments of the given type. The array is aware of its original state and so
      has a `hasDirtyAttributes` property and a `rollback` method.

      It takes an optional hash as a second parameter, currently supported options
      are:

      - `defaultValue`: An array literal or a function to be called to set the
        attribute to a default value if none is supplied. Values are deep copied
        before being used. Note that default values will be passed through the
        fragment's serializer when creating the fragment. Defaults to an empty
        array.
      - `polymorphic`: Whether or not the fragments in the array can be child
        classes of the given type.
      - `typeKey`: If `polymorphic` is true, the property to use as the fragment
        type in the normalized data. Defaults to `type`.

      Example

      ```javascript
      App.Person = DS.Model.extend({
        addresses: MF.fragmentArray('address')
      });

      App.Address = MF.Fragment.extend({
        street: DS.attr('string'),
        city: DS.attr('string'),
        region: DS.attr('string'),
        country: DS.attr('string')
      });
      ```

      @namespace MF
      @method fragmentArray
      @param {String} type the fragment type (optional)
      @param {Object} options a hash of options
      @return {Attribute}
    */
    function model$fragments$lib$fragments$attributes$$fragmentArray(modelName, options) {
      options || (options = {});

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

    /**
      `MF.array` defines an attribute on a `DS.Model` or `MF.Fragment`. It creates a
      property that returns an array of values of the given primitive type. The
      array is aware of its original state and so has a `hasDirtyAttributes`
      property and a `rollback` method.

      It takes an optional hash as a second parameter, currently supported options
      are:

      - `defaultValue`: An array literal or a function to be called to set the
        attribute to a default value if none is supplied. Values are deep copied
        before being used. Note that default values will be passed through the
        fragment's serializer when creating the fragment.

      Example

      ```javascript
      App.Person = DS.Model.extend({
        aliases: MF.array('string')
      });
      ```

      @namespace MF
      @method array
      @param {String} type the type of value contained in the array
      @param {Object} options a hash of options
      @return {Attribute}
    */
    function model$fragments$lib$fragments$attributes$$array(type, options) {
      if (typeof type === 'object') {
        options = type;
        type = undefined;
      } else {
        options || (options = {});
      }

      var metaType = model$fragments$lib$fragments$attributes$$metaTypeFor('array', type);

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
          var internalModel = model$fragments$lib$fragments$fragment$$internalModelFor(this);
          var fragment = setupFragment(this.store, this, key);

          return internalModel._fragments[key] = fragment;
        },
        set: function(key, value) {
          var internalModel = model$fragments$lib$fragments$fragment$$internalModelFor(this);
          var fragment = setupFragment(this.store, this, key);

          fragment = setFragmentValue(this, key, fragment, value);

          return internalModel._fragments[key] = fragment;
        }
      }).meta(meta);
    }

    function model$fragments$lib$fragments$attributes$$fragmentArrayProperty(metaType, options, createArray) {
      function setupFragmentArray(store, record, key) {
        var internalModel = model$fragments$lib$fragments$fragment$$internalModelFor(record);
        var data = model$fragments$lib$fragments$attributes$$getWithDefault(internalModel, key, options, 'array');
        var fragments = internalModel._fragments[key] || null;

        // If we already have a processed fragment in _data and our current fragment is
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
        var internalModel = model$fragments$lib$fragments$fragment$$internalModelFor(record);

        if (model$fragments$lib$fragments$attributes$$isArray(value)) {
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

    /**
      `MF.fragmentOwner` defines a read-only attribute on a `MF.Fragment`
      instance. The attribute returns a reference to the fragment's owner
      record.

      Example

      ```javascript
      App.Person = DS.Model.extend({
        name: MF.fragment('name')
      });

      App.Name = MF.Fragment.extend({
        first: DS.attr('string'),
        last: DS.attr('string'),
        person: MF.fragmentOwner()
      });
      ```

      @namespace MF
      @method fragmentOwner
      @return {Attribute}
    */
    function model$fragments$lib$fragments$attributes$$fragmentOwner() {
      return model$fragments$lib$fragments$attributes$$computed(function() {
        ember$lib$main$$default.assert("Fragment owner properties can only be used on fragments.", model$fragments$lib$fragments$fragment$$isFragment(this));

        return model$fragments$lib$fragments$fragment$$internalModelFor(this)._owner;
      }).meta({
        isFragmentOwner: true
      }).readOnly();
    }

    // The default value of a fragment is either an array or an object,
    // which should automatically get deep copied
    function model$fragments$lib$fragments$attributes$$getDefaultValue(record, options, type) {
      var value;

      if (typeof options.defaultValue === 'function') {
        value = options.defaultValue();
      } else if ('defaultValue' in options) {
        value = options.defaultValue;
      } else if (type === 'array') {
        value = [];
      } else {
        return null;
      }

      ember$lib$main$$default.assert("The fragment's default value must be an " + type, (model$fragments$lib$fragments$attributes$$typeOf(value) == type) || (value === null));

      // Create a deep copy of the resulting value to avoid shared reference errors
      return model$fragments$lib$fragments$attributes$$copy(value, true);
    }

    // Returns the value of the property or the default propery
    function model$fragments$lib$fragments$attributes$$getWithDefault(internalModel, key, options, type) {
      if (key in internalModel._data) {
        return internalModel._data[key];
      } else {
        return model$fragments$lib$fragments$attributes$$getDefaultValue(internalModel, options, type);
      }
    }

    /**
      @module ember-data-model-fragments
    */

    var model$fragments$lib$fragments$transforms$array$$get = ember$lib$main$$default.get;
    var model$fragments$lib$fragments$transforms$array$$makeArray = ember$lib$main$$default.makeArray;
    var model$fragments$lib$fragments$transforms$array$$computed = ember$lib$main$$default.computed;

    /**
      Transform for `MF.array` that transforms array data with the given transform
      type.

      @class ArrayTransform
      @namespace MF
      @extends DS.Transform
    */
    var model$fragments$lib$fragments$transforms$array$$ArrayTransform = ember$data$lib$system$transform$$default.extend({
      store: null,
      type: null,

      deserialize: function deserializeArray(data) {
        if (data == null) {
          return null;
        }

        var transform = model$fragments$lib$fragments$transforms$array$$get(this, 'transform');

        data = model$fragments$lib$fragments$transforms$array$$makeArray(data);

        if (!transform) {
          return data;
        }

        return model$fragments$lib$util$map$$default(data, transform.deserialize, transform);
      },

      serialize: function serializeArray(array) {
        if (array == null) {
          return null;
        }

        var transform = model$fragments$lib$fragments$transforms$array$$get(this, 'transform');

        array = array.toArray ? array.toArray() : array;

        if (!transform) {
          return array;
        }

        return model$fragments$lib$util$map$$default(array, transform.serialize, transform);
      },

      transform: model$fragments$lib$fragments$transforms$array$$computed('type', function() {
        var attributeType = this.get('type');

        if (!attributeType) {
          return null;
        }

        var transform = model$fragments$lib$fragments$transforms$array$$get(this, 'store').container.lookup('transform:' + attributeType);
        ember$lib$main$$default.assert("Unable to find transform for '" + attributeType + "'", !!transform);

        return transform;
      })
    });

    var model$fragments$lib$fragments$transforms$array$$default = model$fragments$lib$fragments$transforms$array$$ArrayTransform;

    /**
      @module ember-data-model-fragments
    */

    var model$fragments$lib$fragments$transforms$fragment$$get = ember$lib$main$$default.get;

    /**
      Transform for `MF.fragment` fragment attribute which delegates work to
      the fragment type's serializer

      @class FragmentTransform
      @namespace MF
      @extends DS.Transform
    */
    var model$fragments$lib$fragments$transforms$fragment$$FragmentTransform = ember$data$lib$system$transform$$default.extend({
      store: null,
      type: null,
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
        var modelName = model$fragments$lib$fragments$transforms$fragment$$get(this, 'type');
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
      @module ember-data-model-fragments
    */

    /**
      Transform for `MF.fragmentArray` fragment attribute which delegates work to
      the fragment type's serializer

      @class FragmentArrayTransform
      @namespace MF
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
          // Needed for ember-2.1 deprecation
          if (!application) {
            application = container;
          }
          application.register('transform:fragment', model$fragments$lib$fragments$transforms$fragment$$default);
          application.register('transform:fragment-array', model$fragments$lib$fragments$transforms$fragment$array$$default);
          application.register('transform:array', model$fragments$lib$fragments$transforms$array$$default);
        }
      }
    ];

    var model$fragments$lib$initializers$$default = model$fragments$lib$initializers$$initializers;

    /**
      Ember Data Model Fragments

      @module ember-data-model-fragments
      @main ember-data-model-fragments
    */
    var model$fragments$lib$main$$MF = ember$lib$main$$default.Namespace.create({
      VERSION: '1.13.2',
      Fragment: model$fragments$lib$fragments$fragment$$default,
      FragmentArray: model$fragments$lib$fragments$array$fragment$$default,
      FragmentTransform: model$fragments$lib$fragments$transforms$fragment$$default,
      FragmentArrayTransform: model$fragments$lib$fragments$transforms$fragment$array$$default,
      ArrayTransform: model$fragments$lib$fragments$transforms$array$$default,
      fragment: model$fragments$lib$fragments$attributes$$fragment,
      fragmentArray: model$fragments$lib$fragments$attributes$$fragmentArray,
      array: model$fragments$lib$fragments$attributes$$array,
      fragmentOwner: model$fragments$lib$fragments$attributes$$fragmentOwner
    });

    ember$lib$main$$default.onLoad('Ember.Application', function(Application) {
      model$fragments$lib$initializers$$default.forEach(Application.initializer, Application);
    });

    if (ember$lib$main$$default.libraries) {
      ember$lib$main$$default.libraries.register('Model Fragments', model$fragments$lib$main$$MF.VERSION);
    }

    ember$lib$main$$default.lookup.MF = model$fragments$lib$main$$MF;

    var model$fragments$lib$main$$default = model$fragments$lib$main$$MF;
}).call(this);

//# sourceMappingURL=ember-data-model-fragments.map