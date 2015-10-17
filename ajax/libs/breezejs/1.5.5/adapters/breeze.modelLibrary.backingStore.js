(function (factory) {
  if (typeof breeze === "object") {
    factory(breeze);
  } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS or Node: hard-coded dependency on "breeze"
    factory(require("breeze"));
  } else if (typeof define === "function" && define["amd"]) {
    // AMD anonymous module with hard-coded dependency on "breeze"
    define(["breeze"], factory);
  }
}(function (breeze) {
  "use strict";
  var core = breeze.core;

  var ctor = function ModelLibraryBackingStoreAdapter() {
    this.name = "backingStore";
  };
  // protoFn used instead of proto here to avoid naming collision with function params.
  var protoFn = ctor.prototype;

  protoFn.initialize = function () {

  };

  protoFn.getTrackablePropertyNames = function (entity) {
    var names = [];
    for (var p in entity) {
      if (p === "entityType") continue;
      if (p === "_$typeName") continue;
      if (p === "_pendingSets") continue;
      if (p === "_backingStore") continue;
      var val = entity[p];
      if (!core.isFunction(val)) {
        names.push(p);
      }
    }
    return names;
  };

  // This method is called during Metadata initialization
  protoFn.initializeEntityPrototype = function (proto) {

    proto.getProperty = function (propertyName) {
      return this[propertyName];
    };

    proto.setProperty = function (propertyName, value) {
      //if (!this._backingStore.hasOwnProperty(propertyName)) {
      //    throw new Error("Unknown property name:" + propertyName);
      //}
      this[propertyName] = value;
      // allow setProperty chaining.
      return this;
    };

    movePropDefsToProto(proto);
  };

  // This method is called when an EntityAspect is first created - this will occur as part of the entityType.createEntity call.
  // which can be called either directly or via standard query materialization

  // entity is either an entity or a complexObject
  protoFn.startTracking = function (entity, proto) {
    // can't touch the normal property sets within this method - access the backingStore directly instead.
    var bs = movePropsToBackingStore(entity);

    // assign default values to the entity
    var stype = entity.entityType || entity.complexType;
    stype.getProperties().forEach(function (prop) {

      var propName = prop.name;
      var val = entity[propName];

      if (prop.isDataProperty) {
        if (prop.isComplexProperty) {
          if (prop.isScalar) {
            val = prop.dataType._createInstanceCore(entity, prop);
          } else {
            val = breeze.makeComplexArray([], entity, prop);
          }
        } else if (!prop.isScalar) {
          val = breeze.makePrimitiveArray([], entity, prop);
        } else if (val === undefined) {
          val = prop.defaultValue;
        }

      } else if (prop.isNavigationProperty) {
        if (val !== undefined) {
          throw new Error("Cannot assign a navigation property in an entity ctor.: " + prop.Name);
        }
        if (prop.isScalar) {
          // TODO: change this to nullstob later.
          val = null;
        } else {
          val = breeze.makeRelationArray([], entity, prop);
        }
      } else {
        throw new Error("unknown property: " + propName);
      }
      // can't touch the normal property sets within this method (IE9 Bug) - so we access the backingStore directly instead.
      // otherwise we could just do
      // entity[propName] = val
      // after all of the interception logic had been injected.
      if (prop.isSettable || prop.isNavigationProperty) {
        bs[propName] = val;
      }
    });
  };


  // private methods

  // This method is called during Metadata initialization to correctly "wrap" properties.
  function movePropDefsToProto(proto) {
    var stype = proto.entityType || proto.complexType;
    var extra = stype._extra;

    var alreadyWrapped = extra.alreadyWrappedProps || {};

    stype.getProperties().forEach(function (prop) {
      var propName = prop.name;
      // we only want to wrap props that haven't already been wrapped
      if (alreadyWrapped[propName]) return;

      // If property is already defined on the prototype then wrap it in another propertyDescriptor.
      // otherwise create a propDescriptor for it.
      var descr;
      if (propName in proto) {
        descr = wrapPropDescription(proto, prop);
      } else {
        descr = makePropDescription(proto, prop);
      }
      // descr will be null for a wrapped descr that is not configurable
      if (descr != null) {
        Object.defineProperty(proto, propName, descr);
      }
      alreadyWrapped[propName] = true;
    });
    extra.alreadyWrappedProps = alreadyWrapped;
  }

  // This method is called when an instance is first created via materialization or createEntity.
  // this method cannot be called while a 'defineProperty' accessor is executing
  // because of IE bug mentioned above.

  function movePropsToBackingStore(instance) {

    var bs = getBackingStore(instance);
    var proto = Object.getPrototypeOf(instance);
    var stype = proto.entityType || proto.complexType;
    stype.getProperties().forEach(function (prop) {
      var propName = prop.name;
      if (prop.isUnmapped) {
        // insure that any unmapped properties that were added after entityType
        // was first created are wrapped with a property descriptor.
        if (!core.getPropertyDescriptor(proto, propName)) {
          var descr = makePropDescription(proto, prop);
          Object.defineProperty(proto, propName, descr);
        }
      }
      if (!instance.hasOwnProperty(propName)) return;
      // pulls off the value, removes the instance property and then rewrites it via ES5 accessor
      var value = instance[propName];
      delete instance[propName];
      instance[propName] = value;
    });
    return bs;
  }



  function makePropDescription(proto, property) {
    var propName = property.name;
    var pendingStores = proto._pendingBackingStores;
    if (!pendingStores) {
      pendingStores = [];
      proto._pendingBackingStores = pendingStores;
    }
    var descr = {
      get: function () {
        var bs = this._backingStore || getBackingStore(this);
        return bs[propName];
      },
      set: function (value) {
        // IE9 cannot touch instance._backingStore here
        var bs = this._backingStore || getPendingBackingStore(this);
        var accessorFn = getAccessorFn(bs, propName);
        this._$interceptor(property, value, accessorFn);
      },
      enumerable: true,
      configurable: true
    };

    descr.set.rawSet = function (value) {
      var bs = this._backingStore || getPendingBackingStore(this);
      var accessorFn = getAccessorFn(bs, propName);
      accessorFn(value);
    };
    return descr;

  }

  function getAccessorFn(bs, propName) {
    return function() {
      if (arguments.length === 0) {
        return bs[propName];
      } else {
        bs[propName] = arguments[0];
        return undefined;
      }
    };
  }


  function wrapPropDescription(proto, property) {
    if (!proto.hasOwnProperty(property.name)) {
      var nextProto = Object.getPrototypeOf(proto);
      return wrapPropDescription(nextProto, property);
    }

    var propDescr = Object.getOwnPropertyDescriptor(proto, property.name);
    // if not configurable; we can't touch it - so leave.
    if (!propDescr.configurable) return undefined;
    // if a data descriptor - don't change it - this is basically a static property - i.e. defined on every instance of the type with the same value.
    if (propDescr.value) return undefined;
    // if a read only property descriptor - no need to change it.
    if (!propDescr.set) return undefined;

    var localAccessorFn = function (entity) {
      return function () {
        if (arguments.length === 0) {
          return propDescr.get.bind(entity)();
        } else {
          var set = propDescr.set;
          var rawSet = set.rawSet || set;
          rawSet.bind(entity)(arguments[0]);
          return undefined;
        }
      };
    };

    var newDescr = {
      get: function () {
        return propDescr.get.bind(this)();
      },
      set: function (value) {
        this._$interceptor(property, value, localAccessorFn(this));
      },
      enumerable: propDescr.enumerable,
      configurable: true
    };
    newDescr.set.rawSet = propDescr.set;
    return newDescr;
  };


  function getBackingStore(instance) {
    var proto = Object.getPrototypeOf(instance);
    processPendingStores(proto);
    var bs = instance._backingStore;
    if (!bs) {
      bs = {};
      instance._backingStore = bs;
    }
    return bs;
  }

  // workaround for IE9 bug where instance properties cannot be changed when executing a property 'set' method.
  function getPendingBackingStore(instance) {
    var proto = Object.getPrototypeOf(instance);
    var pendingStores = proto._pendingBackingStores;
    var pending = core.arrayFirst(pendingStores, function (pending) {
      return pending.entity === instance;
    });
    if (pending) return pending.backingStore;
    var bs = {};
    pendingStores.push({ entity: instance, backingStore: bs });
    return bs;
  }

  function processPendingStores(proto) {
    var pendingStores = proto._pendingBackingStores;
    if (pendingStores) {
      pendingStores.forEach(function (pending) {
        pending.entity._backingStore = pending.backingStore;
      });
      pendingStores.length = 0;
    }
  }


  breeze.config.registerAdapter("modelLibrary", ctor);

}));
