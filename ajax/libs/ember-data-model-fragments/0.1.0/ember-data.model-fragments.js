/*!
 * @overview  Ember Data Model Fragments
 * @copyright Copyright 2014 Lytics Inc. and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/lytics/ember-data.model-fragments/master/LICENSE
 * @version   0.1.0
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

define("fragments/array/fragment", 
  ["./primitive","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var PrimitiveArray = __dependency1__["default"];

    var get = Ember.get;
    var map = Ember.EnumerableUtils.map;

    //
    // Fragment Arrays
    //

    var FragmentArray = PrimitiveArray.extend({
      type: null,

      // Initialize/merge fragments with data array
      setupData: function(data) {
        var record = get(this, 'owner');
        var store = get(record, 'store');
        var type = get(this, 'type');
        var key = get(this, 'name');
        var content = get(this, 'content');

        // Map data to existing fragments and create new ones where necessary
        data = map(Ember.makeArray(data), function(data, i) {
          var fragment = content[i];

          if (!fragment) {
            fragment = store.buildFragment(type);

            fragment.setProperties({
              _owner : record,
              _name  : key
            });
          }

          fragment.setupData(data);

          return fragment;
        });

        this._super(data);
      },

      isDirty: function() {
        return this._super() || this.isAny('isDirty');
      }.property('@each.isDirty'),

      rollback: function() {
        this._super();
        this.invoke('rollback');
      },

      serialize: function() {
        return this.invoke('serialize');
      },

      // All array manipulation methods end up using this method, which
      // is a good place to ensure fragments have the correct props set
      replaceContent: function(idx, amt, fragments) {
        var record = get(this, 'owner');
        var store = get(record, 'store');
        var type = get(this, 'type');
        var key = get(this, 'name');
        var originalState = this.originalState;

        // Ensure all fragments have their owner/name set
        if (fragments) {
          fragments.forEach(function(fragment) {
            var owner = get(fragment, '_owner');

            Ember.assert("You can only add '" + type + "' fragments to this property", fragment instanceof store.modelFor(type));
            Ember.assert("Fragments can only belong to one owner, try copying instead", !owner || owner === record);

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

      addFragment: function(fragment) {
        return get(this, 'content').addObject(fragment);
      },

      removeFragment: function(fragment) {
        return get(this, 'content').removeObject(fragment);
      },

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
define("fragments/array/primitive", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var get = Ember.get;
    var splice = Array.prototype.splice;

    //
    // Primitive Arrays
    //

    var PrimitiveArray = Ember.ArrayProxy.extend({
      owner: null,

      name: null,

      init: function() {
        this._super();
        this.originalState = [];
      },

      content: function() {
        return Ember.A();
      }.property(),

      // Set new data array
      setupData: function(data) {
        var content = get(this, 'content');

        data = this.originalState = Ember.makeArray(data);

        // Use non-KVO mutator to prevent parent record from dirtying
        splice.apply(content, [ 0, content.length ].concat(data));
      },

      isDirty: function() {
        return Ember.compare(this.toArray(), this.originalState) !== 0;
      }.property('[]'),

      rollback: function() {
        this.setObjects(this.originalState);
      },

      serialize: function() {
        return this.toArray();
      },

      // Any change to the size of the fragment array means a potential state change
      arrayContentDidChange: function() {
        this._super.apply(this, arguments);

        var record = get(this, 'owner');
        var key = get(this, 'name');

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

    __exports__["default"] = PrimitiveArray;
  });
define("fragments/attributes", 
  ["./array/primitive","./array/fragment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var PrimitiveArray = __dependency1__["default"];
    var FragmentArray = __dependency2__["default"];

    var get = Ember.get;

    // Like `DS.belongsTo`, declares that the property contains a single
    // model fragment of the given type
    function hasOneFragment (type, options) {
      options = options || {};

      var meta = {
        type: 'fragment',
        isAttribute: true,
        isFragment: true,
        options: options
      };

      return Ember.computed(function(key, value) {
        var data = this._data[key] || getDefaultValue(this, options, 'array');
        var fragment = this._fragments[key];

        if (data && data !== fragment) {
          if (!fragment) {
            fragment = this.store.buildFragment(type);

            // Set the correct owner/name on the fragment
            fragment.setProperties({
              _owner : this,
              _name  : key
            });
          }

          fragment.setupData(data);
          this._data[key] = fragment;
        }

        if (arguments.length > 1) {
          Ember.assert("You can only assign a '" + type + "' fragment to this property", value instanceof this.store.modelFor(type));

          fragment = value;

          if (this._data[key] !== fragment) {
            this.fragmentDidDirty(key, fragment);
          } else {
            this.fragmentDidReset(key, fragment);
          }
        }

        return this._fragments[key] = fragment;
      }).property('data').meta(meta);
    }

    // Like `DS.hasMany`, declares that the property contains an array of
    // either primitives, or model fragments of the given type
    function hasManyFragments(type, options) {
      // If a type is not given, it implies an array of primitives
      if (Ember.typeOf(type) !== 'string') {
        options = type;
        type = null;
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
          var arrayClass = type ? FragmentArray : PrimitiveArray;

          return arrayClass.create({
            type  : type,
            name  : key,
            owner : record
          });
        }

        // Create a fragment array and initialize with data
        if (data && data !== fragments) {
          fragments || (fragments = createArray());
          fragments.setupData(data);
          this._data[key] = fragments;
        }

        if (arguments.length > 1) {
          if (Ember.isArray(value)) {
            fragments || (fragments = createArray());
            fragments.setObjects(value);
          } else if (value === null) {
            fragments = null;
          } else {
            Ember.assert("A fragment array property can only be assigned an array or null");
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

      Ember.assert("The fragment's default value must be an " + type, Ember.typeOf(value) == type);

      return Ember.copy(value, true);
    }

    __exports__.hasOneFragment = hasOneFragment;
    __exports__.hasManyFragments = hasManyFragments;
    __exports__.fragmentOwner = fragmentOwner;
  });
define("fragments/model", 
  ["../store","../model","./states","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Store = __dependency1__["default"];
    var Model = __dependency2__["default"];
    var FragmentRootState = __dependency3__["default"];

    var get = Ember.get;

    //
    // Fragment Creation
    //

    Store.reopen({
      // Create a fragment with injections applied that starts
      // in the 'empty' state
      buildFragment: function(type) {
        type = this.modelFor(type);

        return type.create({
          store: this
        });
      },

      // Create a fragment that starts in the 'created' state
      createFragment: function(type, props) {
        var fragment = this.buildFragment(type);

        if (props) {
          fragment.setProperties(props);
        }

        fragment.send('loadedData');

        return fragment;
      }
    });

    //
    // Add fragment support to `DS.Model`
    // TODO: handle the case where there's no response to a commit, and
    // in-flight attributes just get merged
    //

    Model.reopen({
      _setup: function() {
        this._super();
        this._fragments = {};
      },

      // Update all fragment data before the owner's observes fire to ensure that
      // fragment observers aren't working with stale data (this works because the
      // owner's `_data` hash has already changed by this time)
      updateFragmentData: Ember.beforeObserver('data', function(record) {
        var fragment;

        for (var key in record._fragments) {
          fragment = record._fragments[key];

          // The data may have updated, but not changed at all, in which case
          // treat the update as a rollback
          if (fragment && fragment !== record._data[key]) {
            fragment.setupData(record._data[key]);
            record._data[key] = fragment;
          }
        }
      }),

      rollback: function() {
        this._super();

        // Rollback fragments after data changes -- otherwise observers get tangled up
        this.rollbackFragments();
      },

      rollbackFragments: function() {
        var fragment;

        for (var key in this._fragments) {
          fragment = this._fragments[key] = this._data[key];
          fragment.rollback();
        }
      },

      // A fragment property became dirty
      fragmentDidDirty: function(key, fragment) {
        if (!get(this, 'isDeleted')) {
          // Add the fragment as a placeholder in the owner record's
          // `_attributes` hash to indicate it is dirty
          this._attributes[key] = fragment;

          this.send('becomeDirty');
        }
      },

      // A fragment property became clean
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

    //
    // Model Fragment
    //

    var ModelFragment = Ember.Object.extend(Ember.Comparable, Ember.Copyable, {
      _name: null,

      _owner: null,

      currentState: FragmentRootState.empty,

      // Initialize/merge data
      setupData: function(data) {
        var store = get(this, 'store');
        var key = get(this, 'name');
        var type = store.modelFor(this.constructor);
        var serializer = store.serializerFor(type);

        // Setting data means the record is now clean
        this._attributes = {};

        // TODO: do normalization in the transform, not on the fly
        this._data = serializer.normalize(type, data, key);

        this.send('pushedData');

        this.notifyPropertyChange('data');
      },

      // Rollback the fragment
      rollback: function() {
        this._attributes = {};

        this.rollbackFragments();

        this.send('rolledBack');

        this.notifyPropertyChange('data');
      },

      // Basic identity comparison to allow `FragmentArray` to diff arrays
      compare: function(f1, f2) {
        return f1 === f2 ? 0 : 1;
      },

      // Copying a fragment has special semantics: a new fragment is created
      // in the `loaded.created` state, without the same owner set, so that it
      // can be added to another record safely
      // TODO: handle copying sub-fragments
      copy: function() {
        var store = get(this, 'store');
        var type = store.modelFor(this.constructor);
        var data = {};

        Ember.merge(data, this._data);
        Ember.merge(data, this._attributes);

        return this.store.createFragment(type, data);
      },

      toStringExtension: function() {
        return 'owner(' + get(this, '_owner.id') + ')';
      },

      init: function() {
        this._super();
        this._setup();
      }
    });

    //
    // Borrow functionality from DS.Model
    // TODO: is it easier to extend from DS.Model and disable functionality than to
    // cherry-pick common functionality?
    //

    // Ember object prototypes are lazy-loaded
    Model.proto();

    var protoPropNames = [
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
      'eachAttribute',
      'fragmentDidDirty',
      'fragmentDidReset',
      'rollbackFragments'
    ];

    var protoProps = protoPropNames.reduce(function(props, name) {
      props[name] = Model.prototype[name] || Ember.meta(Model.prototype).descs[name];
      return props;
    }, {});

    ModelFragment.reopen(protoProps, {
      eachRelationship: Ember.K,
      updateRecordArraysLater: Ember.K
    });

    var classPropNames = [
      'attributes',
      'eachAttribute',
      'transformedAttributes',
      'eachTransformedAttribute'
    ];

    var classProps = classPropNames.reduce(function(props, name) {
      props[name] = Model[name] || Ember.meta(Model).descs[name];
      return props;
    }, {});

    ModelFragment.reopenClass(classProps, {
      eachRelationship: Ember.K
    });

    __exports__["default"] = ModelFragment;
  });
define("fragments/states", 
  ["../states","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var RootState = __dependency1__["default"];

    var get = Ember.get;

    //
    // Fragment State Machine
    //

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

    var FragmentRootState = {
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
            if (!record._fragments[key]) { return; }

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

    //
    // Fragment Transform
    //

    // Delegate to the specific serializer for the fragment
    var FragmentTransform = Transform.extend({
      deserialize: function(data) {
        // TODO: figure out how to get a handle to the fragment here
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
  ["./fragments/model","./fragments/array/fragment","./fragments/transform","./fragments/attributes","./initializers","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    var ModelFragment = __dependency1__["default"];
    var FragmentArray = __dependency2__["default"];
    var FragmentTransform = __dependency3__["default"];
    var hasOneFragment = __dependency4__.hasOneFragment;
    var hasManyFragments = __dependency4__.hasManyFragments;
    var fragmentOwner = __dependency4__.fragmentOwner;
    var initializers = __dependency5__["default"];

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
      Ember.libraries.register('Model Fragments', '0.1.0');
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