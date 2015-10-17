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
  var canIsolateES5Props = core.__isES5Supported;

  var ko;

  var ctor = function ModelLibraryKnockoutAdapter() {
    this.name = "ko";
  };
  // protoFn used instead of proto here to avoid naming collision with function params.
  var protoFn = ctor.prototype;

  protoFn.initialize = function () {
    ko = core.requireLib("ko", "The Knockout library");
    ko.extenders.intercept = function (target, interceptorOptions) {
      var instance = interceptorOptions.instance;
      var property = interceptorOptions.property;

      // create a computed observable to intercept writes to our observable
      var result;
      if (target.splice) {
        result = ko.computed({
          read: target  //always return the original observables value
        });
      } else {
        result = ko.computed({
          read: target,  //always return the original observables value
          write: function (newValue) {
            instance._$interceptor(property, newValue, target);
            return instance;
          }
        });
      }
      //return the new computed observable
      return result;
    };

  };

  protoFn.getTrackablePropertyNames = function (entity) {
    var names = [];
    for (var p in entity) {
      if (p === "entityType") continue;
      if (p === "_$typeName") continue;

      var propDescr = getES5PropDescriptor(entity, p);
      if (propDescr && propDescr.get) {
        names.push(p);
      } else {
        var val = entity[p];
        if (ko.isObservable(val)) {
          names.push(p);
        } else if (!core.isFunction(val)) {
          names.push(p);
        }
      }
    }
    return names;
  };

  protoFn.initializeEntityPrototype = function (proto) {

    proto.getProperty = function (propertyName) {
      return this[propertyName]();
    };

    proto.setProperty = function (propertyName, value) {
      this[propertyName](value);
      // allow set property chaining.
      return this;
    };

    if (canIsolateES5Props) {
      isolateES5Props(proto);
    }

  };

  function isolateES5Props(proto) {

    var stype = proto.entityType || proto.complexType;
    var es5Descriptors = {};
    stype.getProperties().forEach(function (prop) {
      var propDescr = getES5PropDescriptor(proto, prop.name);
      if (propDescr) {
        es5Descriptors[prop.name] = propDescr;
      }
    });
    if (!core.isEmpty(es5Descriptors)) {
      var extra = stype._extra;
      extra.es5Descriptors = es5Descriptors;
      stype._koDummy = ko.observable(null);
    }

  }

  function getES5PropDescriptor(proto, propName) {
    if (!canIsolateES5Props) {
      return null;
    }
    if (proto.hasOwnProperty(propName)) {
      return Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(proto, propName);
    } else {
      var nextProto = Object.getPrototypeOf(proto);
      return nextProto ? getES5PropDescriptor(nextProto, propName) : null;
    }
  }

  protoFn.startTracking = function (entity, proto) {
    // create ko's for each property and assign defaultValues

    var stype = entity.entityType || entity.complexType;
    var es5Descriptors = stype._extra.es5Descriptors || {};

    // sort unmapped properties to the end
    stype.getProperties().sort(function (p1, p2) {
      var v1 = p1.isUnmapped ? 1 : 0;
      var v2 = p2.isUnmapped ? 1 : 0;
      return v1 - v2;
    }).forEach(function (prop) {
      var propName = prop.name;
      var val = entity[propName];
      var propDescr = es5Descriptors[propName];
      var koObj;

      // check if property is an ES5 property
      if (propDescr) {
        var getFn = propDescr.get.bind(entity);
        if (propDescr.set) {
          var setFn = propDescr.set.bind(entity);
          var rawAccessorFn = function (newValue) {
            if (arguments.length === 0) {
              getFn();
              return;
            } else {
              setFn(newValue);
            }
          }
          koObj = ko.computed({
            read: function () {
              stype._koDummy();
              return getFn();
            },
            write: function (newValue) {
              entity._$interceptor(prop, newValue, rawAccessorFn);
              stype._koDummy.valueHasMutated();
              return entity;
            }
          });
        } else {
          koObj = ko.computed({
            read: getFn,
            write: function () {
            }

          });
        }
        // check if property is already exposed as a ko object
      } else if (ko.isObservable(val)) {
        if (prop.isNavigationProperty) {
          throw new Error("Cannot assign a navigation property in an entity ctor.: " + propName);
        }
        koObj = val;
        // otherwise
      } else {
        val = initializeValueForProp(entity, prop, val);
        koObj = prop.isScalar ? ko.observable(val) : ko.observableArray(val);
      }


      if (prop.isScalar) {
        if (propDescr) {
          Object.defineProperty(entity, propName, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: koObj
          });
        } else {
          var koExt = koObj.extend({ intercept: { instance: entity, property: prop } });
          entity[propName] = koExt;
        }
      } else {
        val._koObj = koObj;
        // code to suppress extra breeze notification when
        // ko's array methods are called.
        koObj.subscribe(onBeforeChange, null, "beforeChange");
        // code to insure that any direct breeze changes notify ko
        val.arrayChanged.subscribe(onArrayChanged);

        koObj.equalityComparer = function () {
          throw new Error("Collection navigation properties may NOT be set.");
        };
        entity[propName] = koObj;
      }

    });

  };

  function initializeValueForProp(entity, prop, val) {
    if (prop.isDataProperty) {
      if (prop.isComplexProperty) {
        // TODO: right now we create Empty complexObjects here - these should actually come from the entity
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
        throw new Error("Cannot assign a navigation property in an entity ctor.: " + prop.name);
      }
      if (prop.isScalar) {
        // TODO: change this to nullEntity later.
        val = null;
      } else {
        val = breeze.makeRelationArray([], entity, prop);
      }
    } else {
      throw new Error("unknown property: " + prop.name);
    }
    return val;
  }


  function onBeforeChange(args) {
    args._koObj._suppressBreeze = true;
  }

  function onArrayChanged(args) {
    var koObj = args.array._koObj;
    if (koObj._suppressBreeze) {
      koObj._suppressBreeze = false;
    } else {
      koObj.valueHasMutated();
    }
  }

  breeze.config.registerAdapter("modelLibrary", ctor);

}));
