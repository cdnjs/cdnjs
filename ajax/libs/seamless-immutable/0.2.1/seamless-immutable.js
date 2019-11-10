(function(){
  "use strict";

  function addPropertyTo(target, methodName, value) {
    Object.defineProperty(target, methodName, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: value
    });
  }

  function banProperty(target, methodName) {
    addPropertyTo(target, methodName, function() {
      throw new ImmutableError("The " + methodName +
        " method cannot be invoked on an ImmutableArray.");
    });
  }

  var immutabilityTag = "__immutable_invariants_hold";

  function addImmutabilityTag(target) {
    addPropertyTo(target, immutabilityTag, true);
  }

  function isImmutable(target) {
    if (typeof target === "object") {
      return target === null || target.hasOwnProperty(immutabilityTag);
    } else {
      // Only objects are even potentially mutable.
      return true;
    }
  }

  var mutatingObjectMethods = [
    "setPrototypeOf"
  ];

  var nonMutatingObjectMethods = [
    "keys"
  ];

  var mutatingArrayMethods = mutatingObjectMethods.concat([
    "push", "pop", "sort", "splice", "shift", "unshift", "reverse"
  ]);

  var nonMutatingArrayMethods = nonMutatingObjectMethods.concat([
    "map", "filter", "slice", "concat", "reduce", "reduceRight"
  ]);

  function ImmutableError() {}
  ImmutableError.prototype = Error.prototype;

  function makeImmutable(obj, bannedMethods) {
    // Make all mutating methods throw exceptions.
    for (var index in bannedMethods) {
      banProperty(obj, bannedMethods[index]);
    }

    // Tag it so we can quickly tell it's immutable later.
    addImmutabilityTag(obj);

    // Freeze it and return it.
    Object.freeze(obj);

    return obj;
  }

  function makeMethodReturnImmutable(obj, methodName) {
    var currentMethod = obj[methodName];

    addPropertyTo(obj, methodName, function() {
      return Immutable(currentMethod.apply(obj, arguments));
    })
  }

  function makeImmutableArray() {
    var result = [];

    // Populate the array before it gets frozen.
    for (var index in arguments) {
      result.push(Immutable(arguments[index]));
    }

    // Don't change their implementations, but wrap these functions to make sure
    // they always return an immutable value.
    for (var index in nonMutatingArrayMethods) {
      var methodName = nonMutatingArrayMethods[index];
      makeMethodReturnImmutable(result, methodName);
    }

    return makeImmutable(result, mutatingArrayMethods);
  }

  function makeImmutableObject(obj) {
    var result = {};

    // Populate the object before it gets frozen.
    switch (typeof obj) {
      case "object":
        if (obj !== null) {
          for (var key in obj) {
            result[key] = Immutable(obj[key]);
          }
        }
        break;
      case "undefined":
        // We're making an empty ImmutableMap. No problem.
        break;
      default:
        throw new TypeError(
          "ImmutableMap constructor does not accept an argument of type " +
          (typeof obj) + ".")
    }

    return makeImmutable(result, mutatingObjectMethods);
  }

  function Immutable(obj) {
    // If the user passes multiple arguments, assume what they want is an array.
    if (arguments.length > 1) {
      return makeImmutableArray.apply(makeImmutableArray, arguments);
    } else if (isImmutable(obj)) {
      return obj;
    } else if (obj instanceof Array) {
      return makeImmutableArray.apply(makeImmutableArray, obj);
    } else {
      return makeImmutableObject(obj);
    }
  }

  // Export the library
  Immutable.isImmutable    = isImmutable;
  Immutable.ImmutableError = ImmutableError;

  Object.freeze(Immutable);

  if (typeof module === "object") {
    module.exports = Immutable;
  } else if (typeof exports === "object") {
    exports.Immutable = Immutable;
  } else if (typeof window === "object") {
    window.Immutable = Immutable;
  } else if (typeof global === "object") {
    global.Immutable = Immutable;
  }
})();