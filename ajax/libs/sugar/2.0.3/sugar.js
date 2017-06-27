/*
 *  Sugar v2.0.2
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) Andrew Plummer
 *  https://sugarjs.com/
 *
 * ---------------------------- */
(function() {
  'use strict';

  /***
   * @module Core
   * @description Core functionality including the ability to define methods and
   *              extend onto natives.
   *
   ***/

  // The global to export.
  var Sugar;

  // The name of Sugar in the global namespace.
  var SUGAR_GLOBAL = 'Sugar';

  // Natives available on initialization. Letting Object go first to ensure its
  // global is set by the time the rest are checking for chainable Object methods.
  var NATIVE_NAMES = 'Object Number String Array Date RegExp Function';

  // Static method flag
  var STATIC   = 0x1;

  // Instance method flag
  var INSTANCE = 0x2;

  // IE8 has a broken defineProperty but no defineProperties so this saves a try/catch.
  var PROPERTY_DESCRIPTOR_SUPPORT = !!(Object.defineProperty && Object.defineProperties);

  // The global context. Rhino uses a different "global" keyword so
  // do an extra check to be sure that it's actually the global context.
  var globalContext = typeof global !== 'undefined' && global.Object === Object ? global : this;

  // Is the environment node?
  var hasExports = typeof module !== 'undefined' && module.exports;

  // Whether object instance methods can be mapped to the prototype.
  var allowObjectPrototype = false;

  // A map from Array to SugarArray.
  var namespacesByName = {};

  // A map from [object Object] to namespace.
  var namespacesByClassString = {};

  // Defining properties.
  var defineProperty = PROPERTY_DESCRIPTOR_SUPPORT ?  Object.defineProperty : definePropertyShim;

  // A default chainable class for unknown types.
  var DefaultChainable = getNewChainableClass('Chainable');


  // Global methods

  function setupGlobal() {
    Sugar = globalContext[SUGAR_GLOBAL];
    if (Sugar) {
      // Reuse already defined Sugar global object.
      return;
    }
    Sugar = function(arg) {
      forEachProperty(Sugar, function(sugarNamespace, name) {
        // Although only the only enumerable properties on the global
        // object are Sugar namespaces, environments that can't set
        // non-enumerable properties will step through the utility methods
        // as well here, so use this check to only allow true namespaces.
        if (hasOwn(namespacesByName, name)) {
          sugarNamespace.extend(arg);
        }
      });
      return Sugar;
    };
    if (hasExports) {
      module.exports = Sugar;
    } else {
      try {
        globalContext[SUGAR_GLOBAL] = Sugar;
      } catch (e) {
        // Contexts such as QML have a read-only global context.
      }
    }
    forEachProperty(NATIVE_NAMES.split(' '), function(name) {
      createNamespace(name);
    });
    setGlobalProperties();
  }

  /***
   * @method createNamespace(name)
   * @returns SugarNamespace
   * @namespace Sugar
   * @short Creates a new Sugar namespace.
   * @extra This method is for plugin developers who want to define methods to be
   *        used with natives that Sugar does not handle by default. The new
   *        namespace will appear on the `Sugar` global with all the methods of
   *        normal namespaces, including the ability to define new methods. When
   *        extended, any defined methods will be mapped to `name` in the global
   *        context.
   *
   * @example
   *
   *   Sugar.createNamespace('Boolean');
   *
   * @param {string} name - The namespace name.
   *
   ***/
  function createNamespace(name) {

    // Is the current namespace Object?
    var isObject = name === 'Object';

    // A Sugar namespace is also a chainable class: Sugar.Array, etc.
    var sugarNamespace = getNewChainableClass(name, true);

    /***
     * @method extend([opts])
     * @returns Sugar
     * @namespace Sugar
     * @short Extends Sugar defined methods onto natives.
     * @extra This method can be called on individual namespaces like
     *        `Sugar.Array` or on the `Sugar` global itself, in which case
     *        [opts] will be forwarded to each `extend` call. For more,
     *        see `extending`.
     *
     * @options
     *
     *   methods           An array of method names to explicitly extend.
     *
     *   except            An array of method names or global namespaces (`Array`,
     *                     `String`) to explicitly exclude. Namespaces should be the
     *                     actual global objects, not strings.
     *
     *   namespaces        An array of global namespaces (`Array`, `String`) to
     *                     explicitly extend. Namespaces should be the actual
     *                     global objects, not strings.
     *
     *   enhance           A shortcut to disallow all "enhance" flags at once
     *                     (flags listed below). For more, see `enhanced methods`.
     *                     Default is `true`.
     *
     *   enhanceString     A boolean allowing String enhancements. Default is `true`.
     *
     *   enhanceArray      A boolean allowing Array enhancements. Default is `true`.
     *
     *   objectPrototype   A boolean allowing Sugar to extend Object.prototype
     *                     with instance methods. This option is off by default
     *                     and should generally not be used except with caution.
     *                     For more, see `object methods`.
     *
     * @example
     *
     *   Sugar.Array.extend();
     *   Sugar.extend();
     *
     * @option {Array<string>} [methods]
     * @option {Array<string|NativeConstructor>} [except]
     * @option {Array<NativeConstructor>} [namespaces]
     * @option {boolean} [enhance]
     * @option {boolean} [enhanceString]
     * @option {boolean} [enhanceArray]
     * @option {boolean} [objectPrototype]
     * @param {ExtendOptions} [opts]
     *
     ***
     * @method extend([opts])
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Extends Sugar defined methods for a specific namespace onto natives.
     * @param {ExtendOptions} [opts]
     *
     ***/
    var extend = function (opts) {

      var nativeClass = globalContext[name], nativeProto = nativeClass.prototype;
      var staticMethods = {}, instanceMethods = {}, methodsByName;

      function objectRestricted(name, target) {
        return isObject && target === nativeProto &&
               (!allowObjectPrototype || name === 'get' || name === 'set');
      }

      function arrayOptionExists(field, val) {
        var arr = opts[field];
        if (arr) {
          for (var i = 0, el; el = arr[i]; i++) {
            if (el === val) {
              return true;
            }
          }
        }
        return false;
      }

      function arrayOptionExcludes(field, val) {
        return opts[field] && !arrayOptionExists(field, val);
      }

      function disallowedByFlags(methodName, target, flags) {
        // Disallowing methods by flag currently only applies if methods already
        // exist to avoid enhancing native methods, as aliases should still be
        // extended (i.e. Array#all should still be extended even if Array#every
        // is being disallowed by a flag).
        if (!target[methodName] || !flags) {
          return false;
        }
        for (var i = 0; i < flags.length; i++) {
          if (opts[flags[i]] === false) {
            return true;
          }
        }
      }

      function namespaceIsExcepted() {
        return arrayOptionExists('except', nativeClass) ||
               arrayOptionExcludes('namespaces', nativeClass);
      }

      function methodIsExcepted(methodName) {
        return arrayOptionExists('except', methodName);
      }

      function canExtend(methodName, method, target) {
        return !objectRestricted(methodName, target) &&
               !disallowedByFlags(methodName, target, method.flags) &&
               !methodIsExcepted(methodName);
      }

      opts = opts || {};
      methodsByName = opts.methods;

      if (namespaceIsExcepted()) {
        return;
      } else if (isObject && typeof opts.objectPrototype === 'boolean') {
        // Store "objectPrototype" flag for future reference.
        allowObjectPrototype = opts.objectPrototype;
      }

      forEachProperty(methodsByName || sugarNamespace, function(method, methodName) {
        if (methodsByName) {
          // If we have method names passed in an array,
          // then we need to flip the key and value here
          // and find the method in the Sugar namespace.
          methodName = method;
          method = sugarNamespace[methodName];
        }
        if (hasOwn(method, 'instance') && canExtend(methodName, method, nativeProto)) {
          instanceMethods[methodName] = method.instance;
        }
        if(hasOwn(method, 'static') && canExtend(methodName, method, nativeClass)) {
          staticMethods[methodName] = method;
        }
      });

      // Accessing the extend target each time instead of holding a reference as
      // it may have been overwritten (for example Date by Sinon). Also need to
      // access through the global to allow extension of user-defined namespaces.
      extendNative(nativeClass, staticMethods);
      extendNative(nativeProto, instanceMethods);

      if (!methodsByName) {
        // If there are no method names passed, then
        // all methods in the namespace will be extended
        // to the native. This includes all future defined
        // methods, so add a flag here to check later.
        setProperty(sugarNamespace, 'active', true);
      }
      return sugarNamespace;
    };

    function defineWithOptionCollect(methodName, instance, args) {
      setProperty(sugarNamespace, methodName, function(arg1, arg2, arg3) {
        var opts = collectDefineOptions(arg1, arg2, arg3);
        defineMethods(sugarNamespace, opts.methods, instance, args, opts.last);
        return sugarNamespace;
      });
    }

    /***
     * @method defineStatic(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Defines static methods on the namespace that can later be extended
     *        onto the native globals.
     * @extra Accepts either a single object mapping names to functions, or name
     *        and function as two arguments. If `extend` was previously called
     *        with no arguments, the method will be immediately mapped to its
     *        native when defined.
     *
     * @example
     *
     *   Sugar.Number.defineStatic({
     *     isOdd: function (num) {
     *       return num % 2 === 1;
     *     }
     *   });
     *
     * @signature defineStatic(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    defineWithOptionCollect('defineStatic', STATIC);

    /***
     * @method defineInstance(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Defines methods on the namespace that can later be extended as
     *        instance methods onto the native prototype.
     * @extra Accepts either a single object mapping names to functions, or name
     *        and function as two arguments. All functions should accept the
     *        native for which they are mapped as their first argument, and should
     *        never refer to `this`. If `extend` was previously called with no
     *        arguments, the method will be immediately mapped to its native when
     *        defined.
     *
     *        Methods cannot accept more than 4 arguments in addition to the
     *        native (5 arguments total). Any additional arguments will not be
     *        mapped. If the method needs to accept unlimited arguments, use
     *        `defineInstanceWithArguments`. Otherwise if more options are
     *        required, use an options object instead.
     *
     * @example
     *
     *   Sugar.Number.defineInstance({
     *     square: function (num) {
     *       return num * num;
     *     }
     *   });
     *
     * @signature defineInstance(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    defineWithOptionCollect('defineInstance', INSTANCE);

    /***
     * @method defineInstanceAndStatic(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short A shortcut to define both static and instance methods on the namespace.
     * @extra This method is intended for use with `Object` instance methods. Sugar
     *        will not map any methods to `Object.prototype` by default, so defining
     *        instance methods as static helps facilitate their proper use.
     *
     * @example
     *
     *   Sugar.Object.defineInstanceAndStatic({
     *     isAwesome: function (obj) {
     *       // check if obj is awesome!
     *     }
     *   });
     *
     * @signature defineInstanceAndStatic(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    defineWithOptionCollect('defineInstanceAndStatic', INSTANCE | STATIC);


    /***
     * @method defineStaticWithArguments(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Defines static methods that collect arguments.
     * @extra This method is identical to `defineStatic`, except that when defined
     *        methods are called, they will collect any arguments past `n - 1`,
     *        where `n` is the number of arguments that the method accepts.
     *        Collected arguments will be passed to the method in an array
     *        as the last argument defined on the function.
     *
     * @example
     *
     *   Sugar.Number.defineStaticWithArguments({
     *     addAll: function (num, args) {
     *       for (var i = 0; i < args.length; i++) {
     *         num += args[i];
     *       }
     *       return num;
     *     }
     *   });
     *
     * @signature defineStaticWithArguments(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    defineWithOptionCollect('defineStaticWithArguments', STATIC, true);

    /***
     * @method defineInstanceWithArguments(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Defines instance methods that collect arguments.
     * @extra This method is identical to `defineInstance`, except that when
     *        defined methods are called, they will collect any arguments past
     *        `n - 1`, where `n` is the number of arguments that the method
     *        accepts. Collected arguments will be passed to the method as the
     *        last argument defined on the function.
     *
     * @example
     *
     *   Sugar.Number.defineInstanceWithArguments({
     *     addAll: function (num, args) {
     *       for (var i = 0; i < args.length; i++) {
     *         num += args[i];
     *       }
     *       return num;
     *     }
     *   });
     *
     * @signature defineInstanceWithArguments(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    defineWithOptionCollect('defineInstanceWithArguments', INSTANCE, true);

    /***
     * @method defineStaticPolyfill(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Defines static methods that are mapped onto the native if they do
     *        not already exist.
     * @extra Intended only for use creating polyfills that follow the ECMAScript
     *        spec. Accepts either a single object mapping names to functions, or
     *        name and function as two arguments.
     *
     * @example
     *
     *   Sugar.Object.defineStaticPolyfill({
     *     keys: function (obj) {
     *       // get keys!
     *     }
     *   });
     *
     * @signature defineStaticPolyfill(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    setProperty(sugarNamespace, 'defineStaticPolyfill', function(arg1, arg2, arg3) {
      var opts = collectDefineOptions(arg1, arg2, arg3);
      extendNative(globalContext[name], opts.methods, true, opts.last);
      return sugarNamespace;
    });

    /***
     * @method defineInstancePolyfill(methods)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Defines instance methods that are mapped onto the native prototype
     *        if they do not already exist.
     * @extra Intended only for use creating polyfills that follow the ECMAScript
     *        spec. Accepts either a single object mapping names to functions, or
     *        name and function as two arguments. This method differs from
     *        `defineInstance` as there is no static signature (as the method
     *        is mapped as-is to the native), so it should refer to its `this`
     *        object.
     *
     * @example
     *
     *   Sugar.Array.defineInstancePolyfill({
     *     indexOf: function (arr, el) {
     *       // index finding code here!
     *     }
     *   });
     *
     * @signature defineInstancePolyfill(methodName, methodFn)
     * @param {Object} methods - Methods to be defined.
     * @param {string} methodName - Name of a single method to be defined.
     * @param {Function} methodFn - Function body of a single method to be defined.
     ***/
    setProperty(sugarNamespace, 'defineInstancePolyfill', function(arg1, arg2, arg3) {
      var opts = collectDefineOptions(arg1, arg2, arg3);
      extendNative(globalContext[name].prototype, opts.methods, true, opts.last);
      // Map instance polyfills to chainable as well.
      forEachProperty(opts.methods, function(fn, methodName) {
        defineChainableMethod(sugarNamespace, methodName, fn);
      });
      return sugarNamespace;
    });

    /***
     * @method alias(toName, from)
     * @returns SugarNamespace
     * @namespace SugarNamespace
     * @short Aliases one Sugar method to another.
     *
     * @example
     *
     *   Sugar.Array.alias('all', 'every');
     *
     * @signature alias(toName, fn)
     * @param {string} toName - Name for new method.
     * @param {string|Function} from - Method to alias, or string shortcut.
     ***/
    setProperty(sugarNamespace, 'alias', function(name, source) {
      var method = typeof source === 'string' ? sugarNamespace[source] : source;
      setMethod(sugarNamespace, name, method);
      return sugarNamespace;
    });

    // Each namespace can extend only itself through its .extend method.
    setProperty(sugarNamespace, 'extend', extend);

    // Cache the class to namespace relationship for later use.
    namespacesByName[name] = sugarNamespace;
    namespacesByClassString['[object ' + name + ']'] = sugarNamespace;

    mapNativeToChainable(name);
    mapObjectChainablesToNamespace(sugarNamespace);


    // Export
    return Sugar[name] = sugarNamespace;
  }

  function setGlobalProperties() {
    setProperty(Sugar, 'extend', Sugar);
    setProperty(Sugar, 'toString', toString);
    setProperty(Sugar, 'createNamespace', createNamespace);

    setProperty(Sugar, 'util', {
      'hasOwn': hasOwn,
      'getOwn': getOwn,
      'setProperty': setProperty,
      'classToString': classToString,
      'defineProperty': defineProperty,
      'forEachProperty': forEachProperty,
      'mapNativeToChainable': mapNativeToChainable
    });
  }

  function toString() {
    return SUGAR_GLOBAL;
  }


  // Defining Methods

  function defineMethods(sugarNamespace, methods, type, args, flags) {
    forEachProperty(methods, function(method, methodName) {
      var instanceMethod, staticMethod = method;
      if (args) {
        staticMethod = wrapMethodWithArguments(method);
      }
      if (flags) {
        staticMethod.flags = flags;
      }

      // A method may define its own custom implementation, so
      // make sure that's not the case before creating one.
      if (type & INSTANCE && !method.instance) {
        instanceMethod = wrapInstanceMethod(method, args);
        setProperty(staticMethod, 'instance', instanceMethod);
      }

      if (type & STATIC) {
        setProperty(staticMethod, 'static', true);
      }

      setMethod(sugarNamespace, methodName, staticMethod);

      if (sugarNamespace.active) {
        // If the namespace has been activated (.extend has been called),
        // then map this method as well.
        sugarNamespace.extend(methodName);
      }
    });
  }

  function collectDefineOptions(arg1, arg2, arg3) {
    var methods, last;
    if (typeof arg1 === 'string') {
      methods = {};
      methods[arg1] = arg2;
      last = arg3;
    } else {
      methods = arg1;
      last = arg2;
    }
    return {
      last: last,
      methods: methods
    };
  }

  function wrapInstanceMethod(fn, args) {
    return args ? wrapMethodWithArguments(fn, true) : wrapInstanceMethodFixed(fn);
  }

  function wrapMethodWithArguments(fn, instance) {
    // Functions accepting enumerated arguments will always have "args" as the
    // last argument, so subtract one from the function length to get the point
    // at which to start collecting arguments. If this is an instance method on
    // a prototype, then "this" will be pushed into the arguments array so start
    // collecting 1 argument earlier.
    var startCollect = fn.length - 1 - (instance ? 1 : 0);
    return function() {
      var args = [], collectedArgs = [], len;
      if (instance) {
        args.push(this);
      }
      len = Math.max(arguments.length, startCollect);
      // Optimized: no leaking arguments
      for (var i = 0; i < len; i++) {
        if (i < startCollect) {
          args.push(arguments[i]);
        } else {
          collectedArgs.push(arguments[i]);
        }
      }
      args.push(collectedArgs);
      return fn.apply(this, args);
    };
  }

  function wrapInstanceMethodFixed(fn) {
    switch(fn.length) {
      // Wrapped instance methods will always be passed the instance
      // as the first argument, but requiring the argument to be defined
      // may cause confusion here, so return the same wrapped function regardless.
      case 0:
      case 1:
        return function() {
          return fn(this);
        };
      case 2:
        return function(a) {
          return fn(this, a);
        };
      case 3:
        return function(a, b) {
          return fn(this, a, b);
        };
      case 4:
        return function(a, b, c) {
          return fn(this, a, b, c);
        };
      case 5:
        return function(a, b, c, d) {
          return fn(this, a, b, c, d);
        };
    }
  }

  // Method helpers

  function extendNative(target, source, polyfill, override) {
    forEachProperty(source, function(method, name) {
      if (polyfill && !override && target[name]) {
        // Method exists, so bail.
        return;
      }
      setProperty(target, name, method);
    });
  }

  function setMethod(sugarNamespace, methodName, method) {
    sugarNamespace[methodName] = method;
    if (method.instance) {
      defineChainableMethod(sugarNamespace, methodName, method.instance, true);
    }
  }


  // Chainables

  function getNewChainableClass(name) {
    var fn = function SugarChainable(obj, arg) {
      if (!(this instanceof fn)) {
        return new fn(obj, arg);
      }
      if (this.constructor !== fn) {
        // Allow modules to define their own constructors.
        obj = this.constructor.apply(obj, arguments);
      }
      this.raw = obj;
    };
    setProperty(fn, 'toString', function() {
      return SUGAR_GLOBAL + name;
    });
    setProperty(fn.prototype, 'valueOf', function() {
      return this.raw;
    });
    return fn;
  }

  function defineChainableMethod(sugarNamespace, methodName, fn) {
    var wrapped = wrapWithChainableResult(fn), existing, collision, dcp;
    dcp = DefaultChainable.prototype;
    existing = dcp[methodName];

    // If the method was previously defined on the default chainable, then a
    // collision exists, so set the method to a disambiguation function that will
    // lazily evaluate the object and find it's associated chainable. An extra
    // check is required to avoid false positives from Object inherited methods.
    collision = existing && existing !== Object.prototype[methodName];

    // The disambiguation function is only required once.
    if (!existing || !existing.disambiguate) {
      dcp[methodName] = collision ? disambiguateMethod(methodName) : wrapped;
    }

    // The target chainable always receives the wrapped method. Additionally,
    // if the target chainable is Sugar.Object, then map the wrapped method
    // to all other namespaces as well if they do not define their own method
    // of the same name. This way, a Sugar.Number will have methods like
    // isEqual that can be called on any object without having to traverse up
    // the prototype chain and perform disambiguation, which costs cycles.
    // Note that the "if" block below actually does nothing on init as Object
    // goes first and no other namespaces exist yet. However it needs to be
    // here as Object instance methods defined later also need to be mapped
    // back onto existing namespaces.
    sugarNamespace.prototype[methodName] = wrapped;
    if (sugarNamespace === Sugar.Object) {
      mapObjectChainableToAllNamespaces(methodName, wrapped);
    }
  }

  function mapObjectChainablesToNamespace(sugarNamespace) {
    forEachProperty(Sugar.Object && Sugar.Object.prototype, function(val, methodName) {
      if (typeof val === 'function') {
        setObjectChainableOnNamespace(sugarNamespace, methodName, val);
      }
    });
  }

  function mapObjectChainableToAllNamespaces(methodName, fn) {
    forEachProperty(namespacesByName, function(sugarNamespace) {
      setObjectChainableOnNamespace(sugarNamespace, methodName, fn);
    });
  }

  function setObjectChainableOnNamespace(sugarNamespace, methodName, fn) {
    var proto = sugarNamespace.prototype;
    if (!hasOwn(proto, methodName)) {
      proto[methodName] = fn;
    }
  }

  function wrapWithChainableResult(fn) {
    return function() {
      return new DefaultChainable(fn.apply(this.raw, arguments));
    };
  }

  function disambiguateMethod(methodName) {
    var fn = function() {
      var raw = this.raw, sugarNamespace, fn;
      if (raw != null) {
        // Find the Sugar namespace for this unknown.
        sugarNamespace = namespacesByClassString[classToString(raw)];
      }
      if (!sugarNamespace) {
        // If no sugarNamespace can be resolved, then default
        // back to Sugar.Object so that undefined and other
        // non-supported types can still have basic object
        // methods called on them, such as type checks.
        sugarNamespace = Sugar.Object;
      }

      fn = new sugarNamespace(raw)[methodName];

      if (fn.disambiguate) {
        // If the method about to be called on this chainable is
        // itself a disambiguation method, then throw an error to
        // prevent infinite recursion.
        throw new TypeError('Cannot resolve namespace for ' + raw);
      }

      return fn.apply(this, arguments);
    };
    fn.disambiguate = true;
    return fn;
  }

  function mapNativeToChainable(name, methodNames) {
    var sugarNamespace = namespacesByName[name],
        nativeProto = globalContext[name].prototype;

    if (!methodNames && ownPropertyNames) {
      methodNames = ownPropertyNames(nativeProto);
    }

    forEachProperty(methodNames, function(methodName) {
      if (nativeMethodProhibited(methodName)) {
        // Sugar chainables have their own constructors as well as "valueOf"
        // methods, so exclude them here. The __proto__ argument should be trapped
        // by the function check below, however simply accessing this property on
        // Object.prototype causes QML to segfault, so pre-emptively excluding it.
        return;
      }
      try {
        var fn = nativeProto[methodName];
        if (typeof fn !== 'function') {
          // Bail on anything not a function.
          return;
        }
      } catch (e) {
        // Function.prototype has properties that
        // will throw errors when accessed.
        return;
      }
      defineChainableMethod(sugarNamespace, methodName, fn);
    });
  }

  function nativeMethodProhibited(methodName) {
    return methodName === 'constructor' ||
           methodName === 'valueOf' ||
           methodName === '__proto__';
  }


  // Util

  // Internal references
  var ownPropertyNames = Object.getOwnPropertyNames,
      internalToString = Object.prototype.toString,
      internalHasOwnProperty = Object.prototype.hasOwnProperty;

  // Defining this as a variable here as the ES5 module
  // overwrites it to patch DONTENUM.
  var forEachProperty = function (obj, fn) {
    for(var key in obj) {
      if (!hasOwn(obj, key)) continue;
      if (fn.call(obj, obj[key], key, obj) === false) break;
    }
  };

  function definePropertyShim(obj, prop, descriptor) {
    obj[prop] = descriptor.value;
  }

  function setProperty(target, name, value, enumerable) {
    defineProperty(target, name, {
      value: value,
      enumerable: !!enumerable,
      configurable: true,
      writable: true
    });
  }

  // PERF: Attempts to speed this method up get very Heisenbergy. Quickly
  // returning based on typeof works for primitives, but slows down object
  // types. Even === checks on null and undefined (no typeof) will end up
  // basically breaking even. This seems to be as fast as it can go.
  function classToString(obj) {
    return internalToString.call(obj);
  }

  function hasOwn(obj, prop) {
    return !!obj && internalHasOwnProperty.call(obj, prop);
  }

  function getOwn(obj, prop) {
    if (hasOwn(obj, prop)) {
      return obj[prop];
    }
  }

  setupGlobal();

  /***
   * @module Common
   * @description Internal utility and common methods.
   ***/

  // Flag allowing native methods to be enhanced
  var ENHANCEMENTS_FLAG = 'enhance';

  // For type checking, etc. Excludes object as this is more nuanced.
  var NATIVE_TYPES = 'Boolean Number String Date RegExp Function Array Error Set Map';

  // Do strings have no keys?
  var NO_KEYS_IN_STRING_OBJECTS = !('0' in Object('a'));

  // Prefix for private properties
  var PRIVATE_PROP_PREFIX = '_sugar_';

  // Matches 1..2 style ranges in properties
  var PROPERTY_RANGE_REG = /^(.*?)\[([-\d]*)\.\.([-\d]*)\](.*)$/;

  // WhiteSpace/LineTerminator as defined in ES5.1 plus Unicode characters in the Space, Separator category.
  var TRIM_CHARS = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';

  // Regex for matching a formatted string
  var STRING_FORMAT_REG = /([{}])\1|\{([^}]*)\}|(%)%|(%(\w*))/g;

  // Common chars
  var HALF_WIDTH_ZERO = 0x30,
      FULL_WIDTH_ZERO = 0xff10,
      HALF_WIDTH_PERIOD   = '.',
      FULL_WIDTH_PERIOD   = '．',
      HALF_WIDTH_COMMA    = ',',
      OPEN_BRACE  = '{',
      CLOSE_BRACE = '}';

  // Namespace aliases
  var sugarObject   = Sugar.Object,
      sugarArray    = Sugar.Array,
      sugarDate     = Sugar.Date,
      sugarString   = Sugar.String,
      sugarNumber   = Sugar.Number,
      sugarFunction = Sugar.Function,
      sugarRegExp   = Sugar.RegExp;

  // Class checks
  var isSerializable,
      isBoolean, isNumber, isString,
      isDate, isRegExp, isFunction,
      isArray, isSet, isMap, isError;

  function buildClassChecks() {

    var knownTypes = {};

    function addCoreTypes() {

      var names = spaceSplit(NATIVE_TYPES);

      isBoolean = buildPrimitiveClassCheck(names[0]);
      isNumber  = buildPrimitiveClassCheck(names[1]);
      isString  = buildPrimitiveClassCheck(names[2]);

      isDate   = buildClassCheck(names[3]);
      isRegExp = buildClassCheck(names[4]);

      // Wanted to enhance performance here by using simply "typeof"
      // but Firefox has two major issues that make this impossible,
      // one fixed, the other not, so perform a full class check here.
      //
      // 1. Regexes can be typeof "function" in FF < 3
      //    https://bugzilla.mozilla.org/show_bug.cgi?id=61911 (fixed)
      //
      // 2. HTMLEmbedElement and HTMLObjectElement are be typeof "function"
      //    https://bugzilla.mozilla.org/show_bug.cgi?id=268945 (won't fix)
      isFunction = buildClassCheck(names[5]);


      isArray = Array.isArray || buildClassCheck(names[6]);
      isError = buildClassCheck(names[7]);

      isSet = buildClassCheck(names[8], typeof Set !== 'undefined' && Set);
      isMap = buildClassCheck(names[9], typeof Map !== 'undefined' && Map);

      // Add core types as known so that they can be checked by value below,
      // notably excluding Functions and adding Arguments and Error.
      addKnownType('Arguments');
      addKnownType(names[0]);
      addKnownType(names[1]);
      addKnownType(names[2]);
      addKnownType(names[3]);
      addKnownType(names[4]);
      addKnownType(names[6]);

    }

    function addArrayTypes() {
      var types = 'Int8 Uint8 Uint8Clamped Int16 Uint16 Int32 Uint32 Float32 Float64';
      forEach(spaceSplit(types), function(str) {
        addKnownType(str + 'Array');
      });
    }

    function addKnownType(className) {
      var str = '[object '+ className +']';
      knownTypes[str] = true;
    }

    function isKnownType(className) {
      return knownTypes[className];
    }

    function buildClassCheck(className, globalObject) {
      if (globalObject && isClass(new globalObject, 'Object')) {
        return getConstructorClassCheck(globalObject);
      } else {
        return getToStringClassCheck(className);
      }
    }

    function getConstructorClassCheck(obj) {
      var ctorStr = String(obj);
      return function(obj) {
        return String(obj.constructor) === ctorStr;
      };
    }

    function getToStringClassCheck(className) {
      return function(obj, str) {
        // perf: Returning up front on instanceof appears to be slower.
        return isClass(obj, className, str);
      };
    }

    function buildPrimitiveClassCheck(className) {
      var type = className.toLowerCase();
      return function(obj) {
        var t = typeof obj;
        return t === type || t === 'object' && isClass(obj, className);
      };
    }

    addCoreTypes();
    addArrayTypes();

    isSerializable = function(obj, className) {
      // Only known objects can be serialized. This notably excludes functions,
      // host objects, Symbols (which are matched by reference), and instances
      // of classes. The latter can arguably be matched by value, but
      // distinguishing between these and host objects -- which should never be
      // compared by value -- is very tricky so not dealing with it here.
      className = className || classToString(obj);
      return isKnownType(className) || isPlainObject(obj, className);
    };

  }

  function isClass(obj, className, str) {
    if (!str) {
      str = classToString(obj);
    }
    return str === '[object '+ className +']';
  }

  // Wrapping the core's "define" methods to
  // save a few bytes in the minified script.
  function wrapNamespace(method) {
    return function(sugarNamespace, arg1, arg2) {
      sugarNamespace[method](arg1, arg2);
    };
  }

  // Method define aliases
  var alias                       = wrapNamespace('alias'),
      defineStatic                = wrapNamespace('defineStatic'),
      defineInstance              = wrapNamespace('defineInstance'),
      defineStaticPolyfill        = wrapNamespace('defineStaticPolyfill'),
      defineInstancePolyfill      = wrapNamespace('defineInstancePolyfill'),
      defineInstanceAndStatic     = wrapNamespace('defineInstanceAndStatic'),
      defineInstanceWithArguments = wrapNamespace('defineInstanceWithArguments');

  function defineInstanceSimilar(sugarNamespace, set, fn, flags) {
    defineInstance(sugarNamespace, collectSimilarMethods(set, fn), flags);
  }

  function defineInstanceAndStaticSimilar(sugarNamespace, set, fn, flags) {
    defineInstanceAndStatic(sugarNamespace, collectSimilarMethods(set, fn), flags);
  }

  function collectSimilarMethods(set, fn) {
    var methods = {};
    if (isString(set)) {
      set = spaceSplit(set);
    }
    forEach(set, function(el, i) {
      fn(methods, el, i);
    });
    return methods;
  }

  // This song and dance is to fix methods to a different length
  // from what they actually accept in order to stay in line with
  // spec. Additionally passing argument length, as some methods
  // throw assertion errors based on this (undefined check is not
  // enough). Fortunately for now spec is such that passing 3
  // actual arguments covers all requirements. Note that passing
  // the argument length also forces the compiler to not rewrite
  // length of the compiled function.
  function fixArgumentLength(fn) {
    var staticFn = function(a) {
      var args = arguments;
      return fn(a, args[1], args[2], args.length - 1);
    };
    staticFn.instance = function(b) {
      var args = arguments;
      return fn(this, b, args[1], args.length);
    };
    return staticFn;
  }

  function defineAccessor(namespace, name, fn) {
    setProperty(namespace, name, fn);
  }

  function defineOptionsAccessor(namespace, defaults) {
    var obj = simpleClone(defaults);

    function getOption(name) {
      return obj[name];
    }

    function setOption(arg1, arg2) {
      var options;
      if (arguments.length === 1) {
        options = arg1;
      } else {
        options = {};
        options[arg1] = arg2;
      }
      forEachProperty(options, function(val, name) {
        if (val === null) {
          val = defaults[name];
        }
        obj[name] = val;
      });
    }

    defineAccessor(namespace, 'getOption', getOption);
    defineAccessor(namespace, 'setOption', setOption);
    return getOption;
  }

  // For methods defined directly on the prototype like Range
  function defineOnPrototype(ctor, methods) {
    var proto = ctor.prototype;
    forEachProperty(methods, function(val, key) {
      proto[key] = val;
    });
  }

  // Argument helpers

  function assertArgument(exists) {
    if (!exists) {
      throw new TypeError('Argument required');
    }
  }

  function assertCallable(obj) {
    if (!isFunction(obj)) {
      throw new TypeError('Function is not callable');
    }
  }

  function assertArray(obj) {
    if (!isArray(obj)) {
      throw new TypeError('Array required');
    }
  }

  function assertWritable(obj) {
    if (isPrimitive(obj)) {
      // If strict mode is active then primitives will throw an
      // error when attempting to write properties. We can't be
      // sure if strict mode is available, so pre-emptively
      // throw an error here to ensure consistent behavior.
      throw new TypeError('Property cannot be written');
    }
  }

  // Coerces an object to a positive integer.
  // Does not allow Infinity.
  function coercePositiveInteger(n) {
    n = +n || 0;
    if (n < 0 || !isNumber(n) || !isFinite(n)) {
      throw new RangeError('Invalid number');
    }
    return trunc(n);
  }


  // General helpers

  function isDefined(o) {
    return o !== undefined;
  }

  function isUndefined(o) {
    return o === undefined;
  }

  function privatePropertyAccessor(key) {
    var privateKey = PRIVATE_PROP_PREFIX + key;
    return function(obj, val) {
      if (arguments.length > 1) {
        setProperty(obj, privateKey, val);
        return obj;
      }
      return obj[privateKey];
    };
  }

  function setChainableConstructor(sugarNamespace, createFn) {
    sugarNamespace.prototype.constructor = function() {
      return createFn.apply(this, arguments);
    };
  }

  // Fuzzy matching helpers

  function getMatcher(f) {
    if (!isPrimitive(f)) {
      var className = classToString(f);
      if (isRegExp(f, className)) {
        return regexMatcher(f);
      } else if (isDate(f, className)) {
        return dateMatcher(f);
      } else if (isFunction(f, className)) {
        return functionMatcher(f);
      } else if (isPlainObject(f, className)) {
        return fuzzyMatcher(f);
      }
    }
    // Default is standard isEqual
    return defaultMatcher(f);
  }

  function fuzzyMatcher(obj) {
    var matchers = {};
    return function(el, i, arr) {
      var matched = true;
      if (!isObjectType(el)) {
        return false;
      }
      forEachProperty(obj, function(val, key) {
        matchers[key] = getOwn(matchers, key) || getMatcher(val);
        if (matchers[key].call(arr, el[key], i, arr) === false) {
          matched = false;
        }
        return matched;
      });
      return matched;
    };
  }

  function defaultMatcher(f) {
    return function(el) {
      return isEqual(el, f);
    };
  }

  function regexMatcher(reg) {
    reg = RegExp(reg);
    return function(el) {
      return reg.test(el);
    };
  }

  function dateMatcher(d) {
    var ms = d.getTime();
    return function(el) {
      return !!(el && el.getTime) && el.getTime() === ms;
    };
  }

  function functionMatcher(fn) {
    return function(el, i, arr) {
      // Return true up front if match by reference
      return el === fn || fn.call(arr, el, i, arr);
    };
  }

  // Object helpers

  function getKeys(obj) {
    return Object.keys(obj);
  }

  function deepHasProperty(obj, key, any) {
    return handleDeepProperty(obj, key, any, true);
  }

  function deepGetProperty(obj, key, any) {
    return handleDeepProperty(obj, key, any, false);
  }

  function deepSetProperty(obj, key, val) {
    handleDeepProperty(obj, key, false, false, true, false, val);
    return obj;
  }

  function handleDeepProperty(obj, key, any, has, fill, fillLast, val) {
    var ns, bs, ps, cbi, set, isLast, isPush, isIndex, nextIsIndex, exists;
    ns = obj || undefined;
    if (key == null) return;

    if (isObjectType(key)) {
      // Allow array and array-like accessors
      bs = [key];
    } else {
      key = String(key);
      if (key.indexOf('..') !== -1) {
        return handleArrayIndexRange(obj, key, any, val);
      }
      bs = key.split('[');
    }

    set = isDefined(val);

    for (var i = 0, blen = bs.length; i < blen; i++) {
      ps = bs[i];

      if (isString(ps)) {
        ps = periodSplit(ps);
      }

      for (var j = 0, plen = ps.length; j < plen; j++) {
        key = ps[j];

        // Is this the last key?
        isLast = i === blen - 1 && j === plen - 1;

        // Index of the closing ]
        cbi = key.indexOf(']');

        // Is the key an array index?
        isIndex = cbi !== -1;

        // Is this array push syntax "[]"?
        isPush = set && cbi === 0;

        // If the bracket split was successful and this is the last element
        // in the dot split, then we know the next key will be an array index.
        nextIsIndex = blen > 1 && j === plen - 1;

        if (isPush) {
          // Set the index to the end of the array
          key = ns.length;
        } else if (isIndex) {
          // Remove the closing ]
          key = key.slice(0, -1);
        }

        // If the array index is less than 0, then
        // add its length to allow negative indexes.
        if (isIndex && key < 0) {
          key = +key + ns.length;
        }

        // Bracket keys may look like users[5] or just [5], so the leading
        // characters are optional. We can enter the namespace if this is the
        // 2nd part, if there is only 1 part, or if there is an explicit key.
        if (i || key || blen === 1) {

          exists = any ? key in ns : hasOwn(ns, key);

          // Non-existent namespaces are only filled if they are intermediate
          // (not at the end) or explicitly filling the last.
          if (fill && (!isLast || fillLast) && !exists) {
            // For our purposes, last only needs to be an array.
            ns = ns[key] = nextIsIndex || (fillLast && isLast) ? [] : {};
            continue;
          }

          if (has) {
            if (isLast || !exists) {
              return exists;
            }
          } else if (set && isLast) {
            assertWritable(ns);
            ns[key] = val;
          }

          ns = exists ? ns[key] : undefined;
        }

      }
    }
    return ns;
  }

  // Get object property with support for 0..1 style range notation.
  function handleArrayIndexRange(obj, key, any, val) {
    var match, start, end, leading, trailing, arr, set;
    match = key.match(PROPERTY_RANGE_REG);
    if (!match) {
      return;
    }

    set = isDefined(val);
    leading = match[1];

    if (leading) {
      arr = handleDeepProperty(obj, leading, any, false, set ? true : false, true);
    } else {
      arr = obj;
    }

    assertArray(arr);

    trailing = match[4];
    start    = match[2] ? +match[2] : 0;
    end      = match[3] ? +match[3] : arr.length;

    // A range of 0..1 is inclusive, so we need to add 1 to the end. If this
    // pushes the index from -1 to 0, then set it to the full length of the
    // array, otherwise it will return nothing.
    end = end === -1 ? arr.length : end + 1;

    if (set) {
      for (var i = start; i < end; i++) {
        handleDeepProperty(arr, i + trailing, any, false, true, false, val);
      }
    } else {
      arr = arr.slice(start, end);

      // If there are trailing properties, then they need to be mapped for each
      // element in the array.
      if (trailing) {
        if (trailing.charAt(0) === HALF_WIDTH_PERIOD) {
          // Need to chomp the period if one is trailing after the range. We
          // can't do this at the regex level because it will be required if
          // we're setting the value as it needs to be concatentated together
          // with the array index to be set.
          trailing = trailing.slice(1);
        }
        return arr.map(function(el) {
          return handleDeepProperty(el, trailing);
        });
      }
    }
    return arr;
  }

  function getOwnKey(obj, key) {
    if (hasOwn(obj, key)) {
      return key;
    }
  }

  function hasProperty(obj, prop) {
    return !isPrimitive(obj) && prop in obj;
  }

  function isObjectType(obj, type) {
    return !!obj && (type || typeof obj) === 'object';
  }

  function isPrimitive(obj, type) {
    type = type || typeof obj;
    return obj == null || type === 'string' || type === 'number' || type === 'boolean';
  }

  function isPlainObject(obj, className) {
    return isObjectType(obj) &&
           isClass(obj, 'Object', className) &&
           hasValidPlainObjectPrototype(obj) &&
           hasOwnEnumeratedProperties(obj);
  }

  function hasValidPlainObjectPrototype(obj) {
    var hasToString = 'toString' in obj;
    var hasConstructor = 'constructor' in obj;
    // An object created with Object.create(null) has no methods in the
    // prototype chain, so check if any are missing. The additional hasToString
    // check is for false positives on some host objects in old IE which have
    // toString but no constructor. If the object has an inherited constructor,
    // then check if it is Object (the "isPrototypeOf" tapdance here is a more
    // robust way of ensuring this if the global has been hijacked). Note that
    // accessing the constructor directly (without "in" or "hasOwnProperty")
    // will throw a permissions error in IE8 on cross-domain windows.
    return (!hasConstructor && !hasToString) ||
            (hasConstructor && !hasOwn(obj, 'constructor') &&
             hasOwn(obj.constructor.prototype, 'isPrototypeOf'));
  }

  function hasOwnEnumeratedProperties(obj) {
    // Plain objects are generally defined as having enumerated properties
    // all their own, however in early IE environments without defineProperty,
    // there may also be enumerated methods in the prototype chain, so check
    // for both of these cases.
    var objectProto = Object.prototype;
    for (var key in obj) {
      var val = obj[key];
      if (!hasOwn(obj, key) && val !== objectProto[key]) {
        return false;
      }
    }
    return true;
  }

  function simpleRepeat(n, fn) {
    for (var i = 0; i < n; i++) {
      fn(i);
    }
  }

  function simpleClone(obj) {
    return simpleMerge({}, obj);
  }

  function simpleMerge(target, source) {
    forEachProperty(source, function(val, key) {
      target[key] = val;
    });
    return target;
  }

  // Make primtives types like strings into objects.
  function coercePrimitiveToObject(obj) {
    if (isPrimitive(obj)) {
      obj = Object(obj);
    }
    if (NO_KEYS_IN_STRING_OBJECTS && isString(obj)) {
      forceStringCoercion(obj);
    }
    return obj;
  }

  // Force strings to have their indexes set in
  // environments that don't do this automatically.
  function forceStringCoercion(obj) {
    var i = 0, chr;
    while (chr = obj.charAt(i)) {
      obj[i++] = chr;
    }
  }

  // Equality helpers

  function isEqual(a, b, stack) {
    var aClass, bClass;
    if (a === b) {
      // Return quickly up front when matched by reference,
      // but be careful about 0 !== -0.
      return a !== 0 || 1 / a === 1 / b;
    }
    aClass = classToString(a);
    bClass = classToString(b);
    if (aClass !== bClass) {
      return false;
    }

    if (isSerializable(a, aClass) && isSerializable(b, bClass)) {
      return objectIsEqual(a, b, aClass, stack);
    } else if (isSet(a, aClass) && isSet(b, bClass)) {
      return a.size === b.size && isEqual(setToArray(a), setToArray(b), stack);
    } else if (isMap(a, aClass) && isMap(b, bClass)) {
      return a.size === b.size && isEqual(mapToArray(a), mapToArray(b), stack);
    } else if (isError(a, aClass) && isError(b, bClass)) {
      return a.toString() === b.toString();
    }

    return false;
  }

  function objectIsEqual(a, b, aClass, stack) {
    var aType = typeof a, bType = typeof b, propsEqual, count;
    if (aType !== bType) {
      return false;
    }
    if (isObjectType(a.valueOf())) {
      if (a.length !== b.length) {
        // perf: Quickly returning up front for arrays.
        return false;
      }
      count = 0;
      propsEqual = true;
      iterateWithCyclicCheck(a, false, stack, function(key, val, cyc, stack) {
        if (!cyc && (!(key in b) || !isEqual(val, b[key], stack))) {
          propsEqual = false;
        }
        count++;
        return propsEqual;
      });
      if (!propsEqual || count !== getKeys(b).length) {
        return false;
      }
    }
    // Stringifying the value handles NaN, wrapped primitives, dates, and errors in one go.
    return a.valueOf().toString() === b.valueOf().toString();
  }

  // Serializes an object in a way that will provide a token unique
  // to the type, class, and value of an object. Host objects, class
  // instances etc, are not serializable, and are held in an array
  // of references that will return the index as a unique identifier
  // for the object. This array is passed from outside so that the
  // calling function can decide when to dispose of this array.
  function serializeInternal(obj, refs, stack) {
    var type = typeof obj, className, value, ref;

    // Return quickly for primitives to save cycles
    if (isPrimitive(obj, type) && !isRealNaN(obj)) {
      return type + obj;
    }

    className = classToString(obj);

    if (!isSerializable(obj, className)) {
      ref = indexOf(refs, obj);
      if (ref === -1) {
        ref = refs.length;
        refs.push(obj);
      }
      return ref;
    } else if (isObjectType(obj)) {
      value = serializeDeep(obj, refs, stack) + obj.toString();
    } else if (1 / obj === -Infinity) {
      value = '-0';
    } else if (obj.valueOf) {
      value = obj.valueOf();
    }
    return type + className + value;
  }

  function serializeDeep(obj, refs, stack) {
    var result = '';
    iterateWithCyclicCheck(obj, true, stack, function(key, val, cyc, stack) {
      result += cyc ? 'CYC' : key + serializeInternal(val, refs, stack);
    });
    return result;
  }

  function iterateWithCyclicCheck(obj, sortedKeys, stack, fn) {

    function next(val, key) {
      var cyc = false;

      // Allowing a step into the structure before triggering this check to save
      // cycles on standard JSON structures and also to try as hard as possible to
      // catch basic properties that may have been modified.
      if (stack.length > 1) {
        var i = stack.length;
        while (i--) {
          if (stack[i] === val) {
            cyc = true;
          }
        }
      }

      stack.push(val);
      fn(key, val, cyc, stack);
      stack.pop();
    }

    function iterateWithSortedKeys() {
      // Sorted keys is required for serialization, where object order
      // does not matter but stringified order does.
      var arr = getKeys(obj).sort(), key;
      for (var i = 0; i < arr.length; i++) {
        key = arr[i];
        next(obj[key], arr[i]);
      }
    }

    // This method for checking for cyclic structures was egregiously stolen from
    // the ingenious method by @kitcambridge from the Underscore script:
    // https://github.com/documentcloud/underscore/issues/240
    if (!stack) {
      stack = [];
    }

    if (sortedKeys) {
      iterateWithSortedKeys();
    } else {
      forEachProperty(obj, next);
    }
  }


  // Array helpers

  function isArrayIndex(n) {
    return n >>> 0 == n && n != 0xFFFFFFFF;
  }

  function iterateOverSparseArray(arr, fn, fromIndex, loop) {
    var indexes = getSparseArrayIndexes(arr, fromIndex, loop), index;
    for (var i = 0, len = indexes.length; i < len; i++) {
      index = indexes[i];
      fn.call(arr, arr[index], index, arr);
    }
    return arr;
  }

  // It's unclear whether or not sparse arrays qualify as "simple enumerables".
  // If they are not, however, the wrapping function will be deoptimized, so
  // isolate here (also to share between es5 and array modules).
  function getSparseArrayIndexes(arr, fromIndex, loop, fromRight) {
    var indexes = [], i;
    for (i in arr) {
      if (isArrayIndex(i) && (loop || (fromRight ? i <= fromIndex : i >= fromIndex))) {
        indexes.push(+i);
      }
    }
    indexes.sort(function(a, b) {
      var aLoop = a > fromIndex;
      var bLoop = b > fromIndex;
      if (aLoop !== bLoop) {
        return aLoop ? -1 : 1;
      }
      return a - b;
    });
    return indexes;
  }

  function getEntriesForIndexes(obj, find, loop, isString) {
    var result, length = obj.length;
    if (!isArray(find)) {
      return entryAtIndex(obj, find, length, loop, isString);
    }
    result = new Array(find.length);
    forEach(find, function(index, i) {
      result[i] = entryAtIndex(obj, index, length, loop, isString);
    });
    return result;
  }

  function getNormalizedIndex(index, length, loop) {
    if (index && loop) {
      index = index % length;
    }
    if (index < 0) index = length + index;
    return index;
  }

  function entryAtIndex(obj, index, length, loop, isString) {
    index = getNormalizedIndex(index, length, loop);
    return isString ? obj.charAt(index) : obj[index];
  }

  function mapWithShortcuts(el, f, context, mapArgs) {
    if (!f) {
      return el;
    } else if (f.apply) {
      return f.apply(context, mapArgs || []);
    } else if (isArray(f)) {
      return f.map(function(m) {
        return mapWithShortcuts(el, m, context, mapArgs);
      });
    } else if (isFunction(el[f])) {
      return el[f].call(el);
    } else {
      return deepGetProperty(el, f);
    }
  }

  function spaceSplit(str) {
    return str.split(' ');
  }

  function commaSplit(str) {
    return str.split(HALF_WIDTH_COMMA);
  }

  function periodSplit(str) {
    return str.split(HALF_WIDTH_PERIOD);
  }

  function forEach(arr, fn) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (!(i in arr)) {
        return iterateOverSparseArray(arr, fn, i);
      }
      fn(arr[i], i);
    }
  }

  function filter(arr, fn) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      var el = arr[i];
      if (i in arr && fn(el, i)) {
        result.push(el);
      }
    }
    return result;
  }

  function map(arr, fn) {
    // perf: Not using fixed array len here as it may be sparse.
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      if (i in arr) {
        result.push(fn(arr[i], i));
      }
    }
    return result;
  }

  function indexOf(arr, el) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (i in arr && arr[i] === el) return i;
    }
    return -1;
  }

  // Number helpers

  var trunc = Math.trunc || function(n) {
    if (n === 0 || !isFinite(n)) return n;
    return n < 0 ? ceil(n) : floor(n);
  };

  function isRealNaN(obj) {
    // This is only true of NaN
    return obj != null && obj !== obj;
  }

  function withPrecision(val, precision, fn) {
    var multiplier = pow(10, abs(precision || 0));
    fn = fn || round;
    if (precision < 0) multiplier = 1 / multiplier;
    return fn(val * multiplier) / multiplier;
  }

  function padNumber(num, place, sign, base, replacement) {
    var str = abs(num).toString(base || 10);
    str = repeatString(replacement || '0', place - str.replace(/\.\d+/, '').length) + str;
    if (sign || num < 0) {
      str = (num < 0 ? '-' : '+') + str;
    }
    return str;
  }

  function getOrdinalSuffix(num) {
    if (num >= 11 && num <= 13) {
      return 'th';
    } else {
      switch(num % 10) {
        case 1:  return 'st';
        case 2:  return 'nd';
        case 3:  return 'rd';
        default: return 'th';
      }
    }
  }

  // Fullwidth number helpers
  var fullWidthNumberReg, fullWidthNumberMap, fullWidthNumbers;

  function buildFullWidthNumber() {
    var fwp = FULL_WIDTH_PERIOD, hwp = HALF_WIDTH_PERIOD, hwc = HALF_WIDTH_COMMA, fwn = '';
    fullWidthNumberMap = {};
    for (var i = 0, digit; i <= 9; i++) {
      digit = chr(i + FULL_WIDTH_ZERO);
      fwn += digit;
      fullWidthNumberMap[digit] = chr(i + HALF_WIDTH_ZERO);
    }
    fullWidthNumberMap[hwc] = '';
    fullWidthNumberMap[fwp] = hwp;
    // Mapping this to itself to capture it easily
    // in stringToNumber to detect decimals later.
    fullWidthNumberMap[hwp] = hwp;
    fullWidthNumberReg = allCharsReg(fwn + fwp + hwc + hwp);
    fullWidthNumbers = fwn;
  }

  // Takes into account full-width characters, commas, and decimals.
  function stringToNumber(str, base) {
    var sanitized, isDecimal;
    sanitized = str.replace(fullWidthNumberReg, function(chr) {
      var replacement = getOwn(fullWidthNumberMap, chr);
      if (replacement === HALF_WIDTH_PERIOD) {
        isDecimal = true;
      }
      return replacement;
    });
    return isDecimal ? parseFloat(sanitized) : parseInt(sanitized, base || 10);
  }

  // Math aliases
  var abs   = Math.abs,
      pow   = Math.pow,
      min   = Math.min,
      max   = Math.max,
      ceil  = Math.ceil,
      floor = Math.floor,
      round = Math.round;


  // String helpers

  var chr = String.fromCharCode;

  function trim(str) {
    return str.trim();
  }

  function repeatString(str, num) {
    var result = '';
    str = str.toString();
    while (num > 0) {
      if (num & 1) {
        result += str;
      }
      if (num >>= 1) {
        str += str;
      }
    }
    return result;
  }

  function simpleCapitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function createFormatMatcher(bracketMatcher, percentMatcher, precheck) {

    var reg = STRING_FORMAT_REG;
    var compileMemoized = memoizeFunction(compile);

    function getToken(format, match) {
      var get, token, literal, fn;
      var bKey = match[2];
      var pLit = match[3];
      var pKey = match[5];
      if (match[4] && percentMatcher) {
        token = pKey;
        get = percentMatcher;
      } else if (bKey) {
        token = bKey;
        get = bracketMatcher;
      } else if (pLit && percentMatcher) {
        literal = pLit;
      } else {
        literal = match[1] || match[0];
      }
      if (get) {
        assertPassesPrecheck(precheck, bKey, pKey);
        fn = function(obj, opt) {
          return get(obj, token, opt);
        };
      }
      format.push(fn || getLiteral(literal));
    }

    function getSubstring(format, str, start, end) {
      if (end > start) {
        var sub = str.slice(start, end);
        assertNoUnmatched(sub, OPEN_BRACE);
        assertNoUnmatched(sub, CLOSE_BRACE);
        format.push(function() {
          return sub;
        });
      }
    }

    function getLiteral(str) {
      return function() {
        return str;
      };
    }

    function assertPassesPrecheck(precheck, bt, pt) {
      if (precheck && !precheck(bt, pt)) {
        throw new TypeError('Invalid token '+ (bt || pt) +' in format string');
      }
    }

    function assertNoUnmatched(str, chr) {
      if (str.indexOf(chr) !== -1) {
        throw new TypeError('Unmatched '+ chr +' in format string');
      }
    }

    function compile(str) {
      var format = [], lastIndex = 0, match;
      reg.lastIndex = 0;
      while(match = reg.exec(str)) {
        getSubstring(format, str, lastIndex, match.index);
        getToken(format, match);
        lastIndex = reg.lastIndex;
      }
      getSubstring(format, str, lastIndex, str.length);
      return format;
    }

    return function(str, obj, opt) {
      var format = compileMemoized(str), result = '';
      for (var i = 0; i < format.length; i++) {
        result += format[i](obj, opt);
      }
      return result;
    };
  }

  // Inflection helper

  var Inflections = {};

  function getAcronym(str) {
    return Inflections.acronyms && Inflections.acronyms.find(str);
  }

  function getHumanWord(str) {
    return Inflections.human && Inflections.human.find(str);
  }

  function runHumanRules(str) {
    return Inflections.human && Inflections.human.runRules(str) || str;
  }

  // RegExp helpers

  function allCharsReg(src) {
    return RegExp('[' + src + ']', 'g');
  }

  function getRegExpFlags(reg, add) {
    var flags = '';
    add = add || '';
    function checkFlag(prop, flag) {
      if (prop || add.indexOf(flag) > -1) {
        flags += flag;
      }
    }
    checkFlag(reg.global, 'g');
    checkFlag(reg.ignoreCase, 'i');
    checkFlag(reg.multiline, 'm');
    checkFlag(reg.sticky, 'y');
    return flags;
  }

  function escapeRegExp(str) {
    if (!isString(str)) str = String(str);
    return str.replace(/([\\\/\'*+?|()\[\]{}.^$-])/g,'\\$1');
  }

  // Date helpers

  var _utc = privatePropertyAccessor('utc');

  function callDateGet(d, method) {
    return d['get' + (_utc(d) ? 'UTC' : '') + method]();
  }

  function callDateSet(d, method, value, safe) {
    // "Safe" denotes not setting the date if the value is the same as what is
    // currently set. In theory this should be a noop, however it will cause
    // timezone shifts when in the middle of a DST fallback. This is unavoidable
    // as the notation itself is ambiguous (i.e. there are two "1:00ams" on
    // November 1st, 2015 in northern hemisphere timezones that follow DST),
    // however when advancing or rewinding dates this can throw off calculations
    // so avoiding this unintentional shifting on an opt-in basis.
    if (safe && value === callDateGet(d, method, value)) {
      return;
    }
    d['set' + (_utc(d) ? 'UTC' : '') + method](value);
  }

  // Memoization helpers

  var INTERNAL_MEMOIZE_LIMIT = 1000;

  // Note that attemps to consolidate this with Function#memoize
  // ended up clunky as that is also serializing arguments. Separating
  // these implementations turned out to be simpler.
  function memoizeFunction(fn) {
    var memo = {}, counter = 0;

    return function(key) {
      if (hasOwn(memo, key)) {
        return memo[key];
      }
      if (counter === INTERNAL_MEMOIZE_LIMIT) {
        memo = {};
        counter = 0;
      }
      counter++;
      return memo[key] = fn(key);
    };
  }

  // ES6 helpers

  function setToArray(set) {
    var arr = new Array(set.size), i = 0;
    set.forEach(function(val) {
      arr[i++] = val;
    });
    return arr;
  }

  function mapToArray(map) {
    var arr = new Array(map.size), i = 0;
    map.forEach(function(val, key) {
      arr[i++] = [key, val];
    });
    return arr;
  }

  buildClassChecks();
  buildFullWidthNumber();

  /***
   * @module ES6
   * @description Polyfills that provide basic ES6 compatibility. This module
   *              provides the base for Sugar functionality, but is not a full
   *              polyfill suite.
   *
   ***/


  /*** @namespace String ***/

  function getCoercedStringSubject(obj) {
    if (obj == null) {
      throw new TypeError('String required.');
    }
    return String(obj);
  }

  function getCoercedSearchString(obj) {
    if (isRegExp(obj)) {
      throw new TypeError();
    }
    return String(obj);
  }

  defineInstancePolyfill(sugarString, {

    /***
     * @method includes(search, [pos] = 0)
     * @returns Boolean
     * @polyfill ES6
     * @short Returns true if `search` is contained within the string.
     * @extra Search begins at [pos], which defaults to the beginning of the
     *        string. Sugar enhances this method to allow matching a regex.
     *
     * @example
     *
     *   'jumpy'.includes('py')      -> true
     *   'broken'.includes('ken', 3) -> true
     *   'broken'.includes('bro', 3) -> false
     *
     ***/
    'includes': function(searchString) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, pos = arguments[1];
      var str = getCoercedStringSubject(this);
      searchString = getCoercedSearchString(searchString);
      return str.indexOf(searchString, pos) !== -1;
    },

    /***
     * @method startsWith(search, [pos] = 0)
     * @returns Boolean
     * @polyfill ES6
     * @short Returns true if the string starts with substring `search`.
     * @extra Search begins at [pos], which defaults to the entire string length.
     *
     * @example
     *
     *   'hello'.startsWith('hell')   -> true
     *   'hello'.startsWith('HELL')   -> false
     *   'hello'.startsWith('ell', 1) -> true
     *
     ***/
    'startsWith': function(searchString) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, position = arguments[1];
      var str, start, pos, len, searchLength;
      str = getCoercedStringSubject(this);
      searchString = getCoercedSearchString(searchString);
      pos = +position || 0;
      len = str.length;
      start = min(max(pos, 0), len);
      searchLength = searchString.length;
      if (searchLength + start > len) {
        return false;
      }
      if (str.substr(start, searchLength) === searchString) {
        return true;
      }
      return false;
    },

    /***
     * @method endsWith(search, [pos] = length)
     * @returns Boolean
     * @polyfill ES6
     * @short Returns true if the string ends with substring `search`.
     * @extra Search ends at [pos], which defaults to the entire string length.
     *
     * @example
     *
     *   'jumpy'.endsWith('py')    -> true
     *   'jumpy'.endsWith('MPY')   -> false
     *   'jumpy'.endsWith('mp', 4) -> false
     *
     ***/
    'endsWith': function(searchString) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, endPosition = arguments[1];
      var str, start, end, pos, len, searchLength;
      str = getCoercedStringSubject(this);
      searchString = getCoercedSearchString(searchString);
      len = str.length;
      pos = len;
      if (isDefined(endPosition)) {
        pos = +endPosition || 0;
      }
      end = min(max(pos, 0), len);
      searchLength = searchString.length;
      start = end - searchLength;
      if (start < 0) {
        return false;
      }
      if (str.substr(start, searchLength) === searchString) {
        return true;
      }
      return false;
    },

    /***
     * @method repeat([num] = 0)
     * @returns String
     * @polyfill ES6
     * @short Returns the string repeated [num] times.
     *
     * @example
     *
     *   'jumpy'.repeat(2) -> 'jumpyjumpy'
     *   'a'.repeat(5)     -> 'aaaaa'
     *   'a'.repeat(0)     -> ''
     *
     ***/
    'repeat': function(num) {
      num = coercePositiveInteger(num);
      return repeatString(this, num);
    }

  });


  /*** @namespace Number ***/

  defineStaticPolyfill(sugarNumber, {

    /***
     * @method isNaN(value)
     * @returns Boolean
     * @polyfill ES6
     * @static
     * @short Returns true only if the number is `NaN`.
     * @extra This is differs from the global `isNaN`, which returns true for
     *        anything that is not a number.
     *
     * @example
     *
     *   Number.isNaN(NaN) -> true
     *   Number.isNaN('n') -> false
     *
     ***/
    'isNaN': function(obj) {
      return isRealNaN(obj);
    }

  });


  /*** @namespace Array ***/

  function getCoercedObject(obj) {
    if (obj == null) {
      throw new TypeError('Object required.');
    }
    return coercePrimitiveToObject(obj);
  }

  defineStaticPolyfill(sugarArray, {

    /***
     * @method from(a, [map], [context])
     * @returns Mixed
     * @polyfill ES6
     * @static
     * @short Creates an array from an array-like object.
     * @extra If a function is passed for [map], it will be map each element of
     *        the array. [context] is the `this` object if passed.
     *
     * @callback map
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   Array.from({0:'a',1:'b',length:2}); -> ['a','b']
     *
     ***/
    'from': function(a) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, map = arguments[1], context = arguments[2];
      var len, arr;
      if (isDefined(map)) {
        assertCallable(map);
      }
      a = getCoercedObject(a);
      len = trunc(max(0, a.length || 0));
      if (!isArrayIndex(len)) {
        throw new RangeError('Invalid array length');
      }
      if (isFunction(this)) {
        arr = new this(len);
        arr.length = len;
      } else {
        arr = new Array(len);
      }
      for (var i = 0; i < len; i++) {
        setProperty(arr, i, isDefined(map) ? map.call(context, a[i], i) : a[i], true);
      }
      return arr;
    }

  });

  defineInstancePolyfill(sugarArray, {

    'find': function(f) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, context = arguments[1];
      assertCallable(f);
      for (var i = 0, len = this.length; i < len; i++) {
        if (f.call(context, this[i], i, this)) {
          return this[i];
        }
      }
    },

    'findIndex': function(f) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, context = arguments[1];
      assertCallable(f);
      for (var i = 0, len = this.length; i < len; i++) {
        if (f.call(context, this[i], i, this)) {
          return i;
        }
      }
      return -1;
    }

  });

  /***
   * @module ES7
   * @description Polyfills that provide basic ES7 compatibility. This module
   *              provides the base for Sugar functionality, but is not a full
   *              polyfill suite.
   *
   ***/


  /*** @namespace Array ***/

  function sameValueZero(a, b) {
    if (isRealNaN(a)) {
      return isRealNaN(b);
    }
    return a === b ? a !== 0 || 1 / a === 1 / b : false;
  }

  defineInstancePolyfill(sugarArray, {

    /***
     * @method includes(search, [fromIndex] = 0)
     * @returns Boolean
     * @polyfill ES7
     * @short Returns true if `search` is contained within the array.
     * @extra Search begins at [fromIndex], which defaults to the beginning of the
     *        array.
     *
     * @example
     *
     *   [1,2,3].includes(2)    -> true
     *   [1,2,3].includes(4)    -> false
     *   [1,2,3].includes(2, 3) -> false
     *
     ***/
    'includes': function(search) {
      // Force compiler to respect argument length.
      var argLen = arguments.length, fromIndex = arguments[1];
      var arr = this, len;
      if (isString(arr)) return arr.includes(search, fromIndex);
      fromIndex = fromIndex ? fromIndex.valueOf() : 0;
      len = arr.length;
      if (fromIndex < 0) {
        fromIndex = max(0, fromIndex + len);
      }
      for (var i = fromIndex; i < len; i++) {
        if (sameValueZero(search, arr[i])) {
          return true;
        }
      }
      return false;
    }

  });

  /***
   * @module Date
   * @description Date parsing and formatting, relative formats, number shortcuts,
   *              and locale support with default English locales.
   *
   ***/

  var DATE_OPTIONS = {
    'newDateInternal': defaultNewDate
  };

  var LOCALE_ARRAY_FIELDS = [
    'months', 'weekdays', 'units', 'numerals', 'placeholders',
    'articles', 'tokens', 'timeMarkers', 'ampm', 'timeSuffixes',
    'parse', 'timeParse', 'timeFrontParse', 'modifiers'
  ];

  // Regex for stripping Timezone Abbreviations
  var TIMEZONE_ABBREVIATION_REG = /(\w{3})[()\s\d]*$/;

  // One minute in milliseconds
  var MINUTES = 60 * 1000;

  // Date unit indexes
  var HOURS_INDEX   = 3,
      DAY_INDEX     = 4,
      WEEK_INDEX    = 5,
      MONTH_INDEX   = 6,
      YEAR_INDEX    = 7;

  // ISO Defaults
  var ISO_FIRST_DAY_OF_WEEK = 1,
      ISO_FIRST_DAY_OF_WEEK_YEAR = 4;

  var ParsingTokens = {
    'yyyy': {
      param: 'year',
      src: '\\d{4}'
    },
    'MM': {
      param: 'month',
      src: '[01]?\\d'
    },
    'dd': {
      param: 'date',
      src: '[0123]?\\d'
    },
    'hh': {
      param: 'hour',
      src: '[0-2]?\\d'
    },
    'mm': {
      param: 'minute',
      src: '[0-5]\\d'
    },
    'ss': {
      param: 'second',
      src: '[0-5]\\d(?:[,.]\\d+)?'
    },
    'yy': {
      param: 'year',
      src: '\\d{2}'
    },
    'y': {
      param: 'year',
      src: '\\d'
    },
    'yearSign': {
      src: '[+-]',
      sign: true
    },
    'tzHour': {
      src: '[0-1]\\d'
    },
    'tzMinute': {
      src: '[0-5]\\d'
    },
    'tzSign': {
      src: '[+−-]',
      sign: true
    },
    'ihh': {
      param: 'hour',
      src: '[0-2]?\\d(?:[,.]\\d+)?'
    },
    'imm': {
      param: 'minute',
      src: '[0-5]\\d(?:[,.]\\d+)?'
    },
    'GMT': {
      param: 'utc',
      src: 'GMT',
      val: 1
    },
    'Z': {
      param: 'utc',
      src: 'Z',
      val: 1
    },
    'timestamp': {
      src: '\\d+'
    }
  };

  var LocalizedParsingTokens = {
    'year': {
      base: 'yyyy',
      requiresSuffix: true
    },
    'month': {
      base: 'MM',
      requiresSuffix: true
    },
    'date': {
      base: 'dd',
      requiresSuffix: true
    },
    'hour': {
      base: 'hh',
      requiresSuffixOr: ':'
    },
    'minute': {
      base: 'mm'
    },
    'second': {
      base: 'ss'
    },
    'num': {
      src: '\\d+',
      requiresNumerals: true
    }
  };

  var CoreParsingFormats = [
    {
      // 12-1978
      // 08-1978 (MDY)
      src: '{MM}[-.\\/]{yyyy}'
    },
    {
      // 12/08/1978
      // 08/12/1978 (MDY)
      time: true,
      src: '{dd}[-.\\/]{MM}(?:[-.\\/]{yyyy|yy|y})?',
      mdy: '{MM}[-.\\/]{dd}(?:[-.\\/]{yyyy|yy|y})?'
    },
    {
      // 1975-08-25
      time: true,
      src: '{yyyy}[-.\\/]{MM}(?:[-.\\/]{dd})?'
    },
    {
      // .NET JSON
      src: '\\\\/Date\\({timestamp}(?:[+-]\\d{4,4})?\\)\\\\/'
    },
    {
      // ISO-8601
      src: '{yearSign?}{yyyy}(?:-?{MM}(?:-?{dd}(?:T{ihh}(?::?{imm}(?::?{ss})?)?)?)?)?{tzOffset?}'
    }
  ];

  var CoreOutputFormats = {
    'ISO8601': '{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{SSS}{Z}',
    'RFC1123': '{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {ZZ}',
    'RFC1036': '{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {ZZ}'
  };

  var FormatTokensBase = [
    {
      ldml: 'Dow',
      strf: 'a',
      lowerToken: 'dow',
      get: function(d, localeCode) {
        return localeManager.get(localeCode).getWeekdayName(getWeekday(d), 2);
      }
    },
    {
      ldml: 'Weekday',
      strf: 'A',
      lowerToken: 'weekday',
      allowAlternates: true,
      get: function(d, localeCode, alternate) {
        return localeManager.get(localeCode).getWeekdayName(getWeekday(d), alternate);
      }
    },
    {
      ldml: 'Mon',
      strf: 'b h',
      lowerToken: 'mon',
      get: function(d, localeCode) {
        return localeManager.get(localeCode).getMonthName(getMonth(d), 2);
      }
    },
    {
      ldml: 'Month',
      strf: 'B',
      lowerToken: 'month',
      allowAlternates: true,
      get: function(d, localeCode, alternate) {
        return localeManager.get(localeCode).getMonthName(getMonth(d), alternate);
      }
    },
    {
      strf: 'C',
      get: function(d) {
        return getYear(d).toString().slice(0, 2);
      }
    },
    {
      ldml: 'd date day',
      strf: 'd',
      strfPadding: 2,
      ldmlPaddedToken: 'dd',
      ordinalToken: 'do',
      get: function(d) {
        return getDate(d);
      }
    },
    {
      strf: 'e',
      get: function(d) {
        return padNumber(getDate(d), 2, false, 10, ' ');
      }
    },
    {
      ldml: 'H 24hr',
      strf: 'H',
      strfPadding: 2,
      ldmlPaddedToken: 'HH',
      get: function(d) {
        return getHours(d);
      }
    },
    {
      ldml: 'h hours 12hr',
      strf: 'I',
      strfPadding: 2,
      ldmlPaddedToken: 'hh',
      get: function(d) {
        return getHours(d) % 12 || 12;
      }
    },
    {
      ldml: 'D',
      strf: 'j',
      strfPadding: 3,
      ldmlPaddedToken: 'DDD',
      get: function(d) {
        var s = setUnitAndLowerToEdge(cloneDate(d), MONTH_INDEX);
        return getDaysSince(d, s) + 1;
      }
    },
    {
      ldml: 'M',
      strf: 'm',
      strfPadding: 2,
      ordinalToken: 'Mo',
      ldmlPaddedToken: 'MM',
      get: function(d) {
        return getMonth(d) + 1;
      }
    },
    {
      ldml: 'm minutes',
      strf: 'M',
      strfPadding: 2,
      ldmlPaddedToken: 'mm',
      get: function(d) {
        return callDateGet(d, 'Minutes');
      }
    },
    {
      ldml: 'Q',
      get: function(d) {
        return ceil((getMonth(d) + 1) / 3);
      }
    },
    {
      ldml: 'TT',
      strf: 'p',
      get: function(d, localeCode) {
        return getMeridiemToken(d, localeCode);
      }
    },
    {
      ldml: 'tt',
      strf: 'P',
      get: function(d, localeCode) {
        return getMeridiemToken(d, localeCode).toLowerCase();
      }
    },
    {
      ldml: 'T',
      lowerToken: 't',
      get: function(d, localeCode) {
        return getMeridiemToken(d, localeCode).charAt(0);
      }
    },
    {
      ldml: 's seconds',
      strf: 'S',
      strfPadding: 2,
      ldmlPaddedToken: 'ss',
      get: function(d) {
        return callDateGet(d, 'Seconds');
      }
    },
    {
      ldml: 'S ms',
      strfPadding: 3,
      ldmlPaddedToken: 'SSS',
      get: function(d) {
        return callDateGet(d, 'Milliseconds');
      }
    },
    {
      ldml: 'e',
      strf: 'u',
      ordinalToken: 'eo',
      get: function(d) {
        return getWeekday(d) || 7;
      }
    },
    {
      strf: 'U',
      strfPadding: 2,
      get: function(d) {
        // Sunday first, 0-53
        return getWeekNumber(d, false, 0);
      }
    },
    {
      ldml: 'W',
      strf: 'V',
      strfPadding: 2,
      ordinalToken: 'Wo',
      ldmlPaddedToken: 'WW',
      get: function(d) {
        // Monday first, 1-53 (ISO8601)
        return getWeekNumber(d, true);
      }
    },
    {
      strf: 'w',
      get: function(d) {
        return getWeekday(d);
      }
    },
    {
      ldml: 'w',
      ordinalToken: 'wo',
      ldmlPaddedToken: 'ww',
      get: function(d, localeCode) {
        // Locale dependent, 1-53
        var loc = localeManager.get(localeCode),
            dow = loc.getFirstDayOfWeek(localeCode),
            doy = loc.getFirstDayOfWeekYear(localeCode);
        return getWeekNumber(d, true, dow, doy);
      }
    },
    {
      strf: 'W',
      strfPadding: 2,
      get: function(d) {
        // Monday first, 0-53
        return getWeekNumber(d, false);
      }
    },
    {
      ldmlPaddedToken: 'gggg',
      ldmlTwoDigitToken: 'gg',
      get: function(d, localeCode) {
        return getWeekYear(d, localeCode);
      }
    },
    {
      strf: 'G',
      strfPadding: 4,
      strfTwoDigitToken: 'g',
      ldmlPaddedToken: 'GGGG',
      ldmlTwoDigitToken: 'GG',
      get: function(d, localeCode) {
        return getWeekYear(d, localeCode, true);
      }
    },
    {
      ldml: 'year',
      ldmlPaddedToken: 'yyyy',
      ldmlTwoDigitToken: 'yy',
      strf: 'Y',
      strfPadding: 4,
      strfTwoDigitToken: 'y',
      get: function(d) {
        return getYear(d);
      }
    },
    {
      ldml: 'ZZ',
      strf: 'z',
      get: function(d) {
        return getUTCOffset(d);
      }
    },
    {
      ldml: 'X',
      get: function(d) {
        return trunc(d.getTime() / 1000);
      }
    },
    {
      ldml: 'x',
      get: function(d) {
        return d.getTime();
      }
    },
    {
      ldml: 'Z',
      get: function(d) {
        return getUTCOffset(d, true);
      }
    },
    {
      ldml: 'z',
      strf: 'Z',
      get: function(d) {
        // Note that this is not accurate in all browsing environments!
        // https://github.com/moment/moment/issues/162
        // It will continue to be supported for Node and usage with the
        // understanding that it may be blank.
        var match = d.toString().match(TIMEZONE_ABBREVIATION_REG);
        return match ? match[1]: '';
      }
    },
    {
      strf: 'D',
      alias: '%m/%d/%y'
    },
    {
      strf: 'F',
      alias: '%Y-%m-%d'
    },
    {
      strf: 'r',
      alias: '%I:%M:%S %p'
    },
    {
      strf: 'R',
      alias: '%H:%M'
    },
    {
      strf: 'T',
      alias: '%H:%M:%S'
    },
    {
      strf: 'x',
      alias: '{short}'
    },
    {
      strf: 'X',
      alias: '{time}'
    },
    {
      strf: 'c',
      alias: '{stamp}'
    }
  ];

  var DateUnits = [
    {
      name: 'millisecond',
      method: 'Milliseconds',
      multiplier: 1,
      start: 0,
      end: 999
    },
    {
      name: 'second',
      method: 'Seconds',
      multiplier: 1000,
      start: 0,
      end: 59
    },
    {
      name: 'minute',
      method: 'Minutes',
      multiplier: 60 * 1000,
      start: 0,
      end: 59
    },
    {
      name: 'hour',
      method: 'Hours',
      multiplier: 60 * 60 * 1000,
      start: 0,
      end: 23
    },
    {
      name: 'day',
      alias: 'date',
      method: 'Date',
      ambiguous: true,
      multiplier: 24 * 60 * 60 * 1000,
      start: 1,
      end: function(d) {
        return getDaysInMonth(d);
      }
    },
    {
      name: 'week',
      method: 'ISOWeek',
      ambiguous: true,
      multiplier: 7 * 24 * 60 * 60 * 1000
    },
    {
      name: 'month',
      method: 'Month',
      ambiguous: true,
      multiplier: 30.4375 * 24 * 60 * 60 * 1000,
      start: 0,
      end: 11
    },
    {
      name: 'year',
      method: 'FullYear',
      ambiguous: true,
      multiplier: 365.25 * 24 * 60 * 60 * 1000,
      start: 0
    }
  ];

  /***
   * @method getOption(name)
   * @returns Mixed
   * @accessor
   * @short Gets an option used interally by Date.
   * @example
   *
   *   Sugar.Date.getOption('newDateInternal');
   *
   * @param {string} name
   *
   ***
   * @method setOption(name, value)
   * @accessor
   * @short Sets an option used interally by Date.
   * @extra If `value` is `null`, the default value will be restored.
   * @options
   *
   *   newDateInternal   Sugar's internal date constructor. Date methods often
   *                     construct a `new Date()` internally as a reference point
   *                     (`isToday`, relative formats like `tomorrow`, etc). This
   *                     can be overridden if you need it to be something else.
   *                     Most commonly, this allows you to return a shifted date
   *                     to simulate a specific timezone, as dates in Javascript
   *                     are always local.
   *
   * @example
   *
   *   Sugar.Date.setOption('newDateInternal', function() {
   *     var d = new Date(), offset;
   *     offset = (d.getTimezoneOffset() - 600) * 60 * 1000; // Hawaii time!
   *     d.setTime(d.getTime() + offset);
   *     return d;
   *   });
   *
   * @signature setOption(options)
   * @param {DateOptions} options
   * @param {string} name
   * @param {any} value
   * @option {Function} newDateInternal
   *
   ***/
  var _dateOptions = defineOptionsAccessor(sugarDate, DATE_OPTIONS);

  function setDateChainableConstructor() {
    setChainableConstructor(sugarDate, createDate);
  }

  // General helpers

  function getNewDate() {
    return _dateOptions('newDateInternal')();
  }

  function defaultNewDate() {
    return new Date;
  }

  function cloneDate(d) {
    // Rhino environments have a bug where new Date(d) truncates
    // milliseconds so need to call getTime() here.
    var clone = new Date(d.getTime());
    _utc(clone, !!_utc(d));
    return clone;
  }

  function dateIsValid(d) {
    return !isNaN(d.getTime());
  }

  function assertDateIsValid(d) {
    if (!dateIsValid(d)) {
      throw new TypeError('Date is not valid');
    }
  }

  function getHours(d) {
    return callDateGet(d, 'Hours');
  }

  function getWeekday(d) {
    return callDateGet(d, 'Day');
  }

  function getDate(d) {
    return callDateGet(d, 'Date');
  }

  function getMonth(d) {
    return callDateGet(d, 'Month');
  }

  function getYear(d) {
    return callDateGet(d, 'FullYear');
  }

  function setDate(d, val) {
    callDateSet(d, 'Date', val);
  }

  function setMonth(d, val) {
    callDateSet(d, 'Month', val);
  }

  function setYear(d, val) {
    callDateSet(d, 'FullYear', val);
  }

  function getDaysInMonth(d) {
    return 32 - callDateGet(new Date(getYear(d), getMonth(d), 32), 'Date');
  }

  function setWeekday(d, dow, dir) {
    if (!isNumber(dow)) return;
    var currentWeekday = getWeekday(d);
    if (dir) {
      // Allow a "direction" parameter to determine whether a weekday can
      // be set beyond the current weekday in either direction.
      var ndir = dir > 0 ? 1 : -1;
      var offset = dow % 7 - currentWeekday;
      if (offset && offset / abs(offset) !== ndir) {
        dow += 7 * ndir;
      }
    }
    setDate(d, getDate(d) + dow - currentWeekday);
    return d.getTime();
  }

  // Normal callDateSet method with ability
  // to handle ISOWeek setting as well.
  function callDateSetWithWeek(d, method, value, safe) {
    if (method === 'ISOWeek') {
      setISOWeekNumber(d, value);
    } else {
      callDateSet(d, method, value, safe);
    }
  }

  // UTC helpers

  function isUTC(d) {
    return !!_utc(d) || tzOffset(d) === 0;
  }

  function getUTCOffset(d, iso) {
    var offset = _utc(d) ? 0 : tzOffset(d), hours, mins, colon;
    colon  = iso === true ? ':' : '';
    if (!offset && iso) return 'Z';
    hours = padNumber(trunc(-offset / 60), 2, true);
    mins = padNumber(abs(offset % 60), 2);
    return  hours + colon + mins;
  }

  function tzOffset(d) {
    return d.getTimezoneOffset();
  }

  // Argument helpers

  function collectDateArguments(args, allowDuration) {
    var arg1 = args[0], arg2 = args[1];
    if (allowDuration && isString(arg1)) {
      arg1 = getDateParamsFromString(arg1);
    } else if (isNumber(arg1) && isNumber(arg2)) {
      arg1 = collectDateParamsFromArguments(args);
      arg2 = null;
    } else {
      if (isObjectType(arg1)) {
        arg1 = simpleClone(arg1);
      }
    }
    return [arg1, arg2];
  }

  function collectDateParamsFromArguments(args) {
    var params = {}, index = 0;
    walkUnitDown(YEAR_INDEX, function(unit) {
      var arg = args[index++];
      if (isDefined(arg)) {
        params[unit.name] = arg;
      }
    });
    return params;
  }

  function getDateParamsFromString(str) {
    var match, num, params = {};
    match = str.match(/^(-?\d*[\d.]\d*)?\s?(\w+?)s?$/i);
    if (match) {
      if (isUndefined(num)) {
        num = +match[1];
        if (isNaN(num)) {
          num = 1;
        }
      }
      params[match[2].toLowerCase()] = num;
    }
    return params;
  }

  // Iteration helpers

  // Years -> Milliseconds
  function iterateOverDateUnits(fn, startIndex, endIndex) {
    endIndex = endIndex || 0;
    if (isUndefined(startIndex)) {
      startIndex = YEAR_INDEX;
    }
    for (var index = startIndex; index >= endIndex; index--) {
      if (fn(DateUnits[index], index) === false) {
        break;
      }
    }
  }

  // Years -> Milliseconds using getLower/Higher methods
  function walkUnitDown(unitIndex, fn) {
    while (unitIndex >= 0) {
      if (fn(DateUnits[unitIndex], unitIndex) === false) {
        break;
      }
      unitIndex = getLowerUnitIndex(unitIndex);
    }
  }

  // Moving lower from specific unit
  function getLowerUnitIndex(index) {
    if (index === MONTH_INDEX) {
      return DAY_INDEX;
    } else if (index === WEEK_INDEX) {
      return HOURS_INDEX;
    }
    return index - 1;
  }

  // Moving higher from specific unit
  function getHigherUnitIndex(index) {
    return index === DAY_INDEX ? MONTH_INDEX : index + 1;
  }

  // Years -> Milliseconds checking all date params including "weekday"
  function iterateOverDateParams(params, fn, startIndex, endIndex) {

    function run(name, unit, i) {
      var val = getDateParam(params, name);
      if (isDefined(val)) {
        fn(name, val, unit, i);
      }
    }

    iterateOverDateUnits(function (unit, i) {
      var result = run(unit.name, unit, i);
      if (result !== false && i === DAY_INDEX) {
        // Check for "weekday", which has a distinct meaning
        // in the context of setting a date, but has the same
        // meaning as "day" as a unit of time.
        result = run('weekday', unit, i);
      }
      return result;
    }, startIndex, endIndex);

  }

  // Years -> Days
  function iterateOverHigherDateParams(params, fn) {
    iterateOverDateParams(params, fn, YEAR_INDEX, DAY_INDEX);
  }

  // Advancing helpers

  function advanceDate(d, unit, num, reset) {
    var set = {};
    set[unit] = num;
    return updateDate(d, set, reset, 1);
  }

  function advanceDateWithArgs(d, args, dir) {
    args = collectDateArguments(args, true);
    return updateDate(d, args[0], args[1], dir);
  }

  // Edge helpers

  function resetTime(d) {
    return setUnitAndLowerToEdge(d, HOURS_INDEX);
  }

  function resetLowerUnits(d, unitIndex) {
    return setUnitAndLowerToEdge(d, getLowerUnitIndex(unitIndex));
  }

  function moveToBeginningOfWeek(d, firstDayOfWeek) {
    setWeekday(d, floor((getWeekday(d) - firstDayOfWeek) / 7) * 7 + firstDayOfWeek);
    return d;
  }

  function moveToEndOfWeek(d, firstDayOfWeek) {
    var target = firstDayOfWeek - 1;
    setWeekday(d, ceil((getWeekday(d) - target) / 7) * 7 + target);
    return d;
  }

  function moveToBeginningOfUnit(d, unitIndex, localeCode) {
    if (unitIndex === WEEK_INDEX) {
      moveToBeginningOfWeek(d, localeManager.get(localeCode).getFirstDayOfWeek());
    }
    return setUnitAndLowerToEdge(d, getLowerUnitIndex(unitIndex));
  }

  function moveToEndOfUnit(d, unitIndex, localeCode, stopIndex) {
    if (unitIndex === WEEK_INDEX) {
      moveToEndOfWeek(d, localeManager.get(localeCode).getFirstDayOfWeek());
    }
    return setUnitAndLowerToEdge(d, getLowerUnitIndex(unitIndex), stopIndex, true);
  }

  function setUnitAndLowerToEdge(d, startIndex, stopIndex, end) {
    walkUnitDown(startIndex, function(unit, i) {
      var val = end ? unit.end : unit.start;
      if (isFunction(val)) {
        val = val(d);
      }
      callDateSet(d, unit.method, val);
      return !isDefined(stopIndex) || i > stopIndex;
    });
    return d;
  }

  // Param helpers

  function getDateParamKey(params, key) {
    return getOwnKey(params, key) ||
           getOwnKey(params, key + 's') ||
           (key === 'day' && getOwnKey(params, 'date'));
  }

  function getDateParam(params, key) {
    return getOwn(params, getDateParamKey(params, key));
  }

  function deleteDateParam(params, key) {
    delete params[getDateParamKey(params, key)];
  }

  function getUnitIndexForParamName(name) {
    var params = {}, unitIndex;
    params[name] = 1;
    iterateOverDateParams(params, function(name, val, unit, i) {
      unitIndex = i;
      return false;
    });
    return unitIndex;
  }

  // Time distance helpers

  function getDaysSince(d1, d2) {
    return getTimeDistanceForUnit(d1, d2, DateUnits[DAY_INDEX]);
  }

  function getTimeDistanceForUnit(d1, d2, unit) {
    var fwd = d2 > d1, num, tmp;
    if (!fwd) {
      tmp = d2;
      d2  = d1;
      d1  = tmp;
    }
    num = d2 - d1;
    if (unit.multiplier > 1) {
      num = trunc(num / unit.multiplier);
    }
    // For higher order with potential ambiguity, use the numeric calculation
    // as a starting point, then iterate until we pass the target date.
    if (unit.ambiguous) {
      d1 = cloneDate(d1);
      if (num) {
        advanceDate(d1, unit.name, num);
      }
      while (d1 < d2) {
        advanceDate(d1, unit.name, 1);
        if (d1 > d2) {
          break;
        }
        num += 1;
      }
    }
    return fwd ? -num : num;
  }

  // Parsing helpers

  function getParsingTokenValue(token, str) {
    var val;
    if (token.val) {
      val = token.val;
    } else if (token.sign) {
      val = str === '+' ? 1 : -1;
    } else if (token.bool) {
      val = !!val;
    } else {
      val = +str.replace(/,/, '.');
    }
    if (token.param === 'month') {
      val -= 1;
    }
    return val;
  }

  function getYearFromAbbreviation(str, d, prefer) {
    // Following IETF here, adding 1900 or 2000 depending on the last two digits.
    // Note that this makes no accordance for what should happen after 2050, but
    // intentionally ignoring this for now. https://www.ietf.org/rfc/rfc2822.txt
    var val = +str, delta;
    val += val < 50 ? 2000 : 1900;
    if (prefer) {
      delta = val - getYear(d);
      if (delta / abs(delta) !== prefer) {
        val += prefer * 100;
      }
    }
    return val;
  }

  // Week number helpers

  function setISOWeekNumber(d, num) {
    if (isNumber(num)) {
      // Intentionally avoiding updateDate here to prevent circular dependencies.
      var isoWeek = cloneDate(d), dow = getWeekday(d);
      moveToFirstDayOfWeekYear(isoWeek, ISO_FIRST_DAY_OF_WEEK, ISO_FIRST_DAY_OF_WEEK_YEAR);
      setDate(isoWeek, getDate(isoWeek) + 7 * (num - 1));
      setYear(d, getYear(isoWeek));
      setMonth(d, getMonth(isoWeek));
      setDate(d, getDate(isoWeek));
      setWeekday(d, dow || 7);
    }
    return d.getTime();
  }

  function getWeekNumber(d, allowPrevious, firstDayOfWeek, firstDayOfWeekYear) {
    var isoWeek, n = 0;
    if (isUndefined(firstDayOfWeek)) {
      firstDayOfWeek = ISO_FIRST_DAY_OF_WEEK;
    }
    if (isUndefined(firstDayOfWeekYear)) {
      firstDayOfWeekYear = ISO_FIRST_DAY_OF_WEEK_YEAR;
    }
    // Moving to the end of the week allows for forward year traversal, ie
    // Dec 29 2014 is actually week 01 of 2015.
    isoWeek = moveToEndOfWeek(cloneDate(d), firstDayOfWeek);
    moveToFirstDayOfWeekYear(isoWeek, firstDayOfWeek, firstDayOfWeekYear);
    if (allowPrevious && d < isoWeek) {
      // If the date is still before the start of the year, then it should be
      // the last week of the previous year, ie Jan 1 2016 is actually week 53
      // of 2015, so move to the beginning of the week to traverse the year.
      isoWeek = moveToBeginningOfWeek(cloneDate(d), firstDayOfWeek);
      moveToFirstDayOfWeekYear(isoWeek, firstDayOfWeek, firstDayOfWeekYear);
    }
    while (isoWeek <= d) {
      // Doing a very simple walk to get the week number.
      setDate(isoWeek, getDate(isoWeek) + 7);
      n++;
    }
    return n;
  }

  // Week year helpers

  function getWeekYear(d, localeCode, iso) {
    var year, month, firstDayOfWeek, firstDayOfWeekYear, week, loc;
    year = getYear(d);
    month = getMonth(d);
    if (month === 0 || month === 11) {
      if (!iso) {
        loc = localeManager.get(localeCode);
        firstDayOfWeek = loc.getFirstDayOfWeek(localeCode);
        firstDayOfWeekYear = loc.getFirstDayOfWeekYear(localeCode);
      }
      week = getWeekNumber(d, false, firstDayOfWeek, firstDayOfWeekYear);
      if (month === 0 && week === 0) {
        year -= 1;
      } else if (month === 11 && week === 1) {
        year += 1;
      }
    }
    return year;
  }

  function moveToFirstDayOfWeekYear(d, firstDayOfWeek, firstDayOfWeekYear) {
    setUnitAndLowerToEdge(d, MONTH_INDEX);
    setDate(d, firstDayOfWeekYear);
    moveToBeginningOfWeek(d, firstDayOfWeek);
  }

  // Relative helpers

  function dateRelative(d, dRelative, arg1, arg2) {
    var adu, format, type, localeCode, fn;
    assertDateIsValid(d);
    if (isFunction(arg1)) {
      fn = arg1;
    } else {
      localeCode = arg1;
      fn = arg2;
    }
    adu = getAdjustedUnitForDate(d, dRelative);
    if (fn) {
      format = fn.apply(d, adu.concat(localeManager.get(localeCode)));
      if (format) {
        return dateFormat(d, format, localeCode);
      }
    }
    // Adjust up if time is in ms, as this doesn't
    // look very good for a standard relative date.
    if (adu[1] === 0) {
      adu[1] = 1;
      adu[0] = 1;
    }
    if (dRelative) {
      type = 'duration';
    } else if (adu[2] > 0) {
      type = 'future';
    } else {
      type = 'past';
    }
    return localeManager.get(localeCode).getRelativeFormat(adu, type);
  }

  // Gets an "adjusted date unit" which is a way of representing
  // the largest possible meaningful unit. In other words, if passed
  // 3600000, this will return an array which represents "1 hour".
  function getAdjustedUnit(ms, fn) {
    var unitIndex = 0, value = 0;
    iterateOverDateUnits(function(unit, i) {
      value = abs(fn(unit));
      if (value >= 1) {
        unitIndex = i;
        return false;
      }
    });
    return [value, unitIndex, ms];
  }

  // Gets the adjusted unit based on simple division by
  // date unit multiplier.
  function getAdjustedUnitForNumber(ms) {
    return getAdjustedUnit(ms, function(unit) {
      return trunc(withPrecision(ms / unit.multiplier, 1));
    });
  }

  // Gets the adjusted unit using the unitsFromNow methods,
  // which use internal date methods that neatly avoid vaguely
  // defined units of time (days in month, leap years, etc).
  // Reserving dRelative to allow another date to be relative to.
  function getAdjustedUnitForDate(d, dRelative) {
    var ms;
    if (!dRelative) {
      dRelative = getNewDate();
      if (d > dRelative) {
        // If our date is greater than the one that we got from getNewDate, it
        // means that we are finding the unit for a date that is in the future
        // relative to now. However, often the incoming date was created in
        // the same cycle as our comparison, but our "now" date will have been
        // created an instant after it, creating situations where "5 minutes from
        // now" becomes "4 minutes from now" in the same tick. To prevent this,
        // subtract a buffer of 10ms to compensate.
        dRelative = new Date(dRelative.getTime() - 10);
      }
    }
    ms = d - dRelative;
    return getAdjustedUnit(ms, function(u) {
      return abs(getTimeDistanceForUnit(d, dRelative, u));
    });
  }

  // Foramtting helpers

  // Formatting tokens
  var ldmlTokens, strfTokens;

  function dateFormat(d, format, localeCode) {
    assertDateIsValid(d);
    format = CoreOutputFormats[format] || format || '{long}';
    return dateFormatMatcher(format, d, localeCode);
  }

  function getMeridiemToken(d, localeCode) {
    var hours = getHours(d);
    return localeManager.get(localeCode).ampm[trunc(hours / 12)] || '';
  }

  function buildDateFormatTokens() {

    function addFormats(target, tokens, fn) {
      if (tokens) {
        forEach(spaceSplit(tokens), function(token) {
          target[token] = fn;
        });
      }
    }

    function buildLowercase(get) {
      return function(d, localeCode) {
        return get(d, localeCode).toLowerCase();
      };
    }

    function buildOrdinal(get) {
      return function(d, localeCode) {
        var n = get(d, localeCode);
        return n + localeManager.get(localeCode).getOrdinal(n);
      };
    }

    function buildPadded(get, padding) {
      return function(d, localeCode) {
        return padNumber(get(d, localeCode), padding);
      };
    }

    function buildTwoDigits(get) {
      return function(d, localeCode) {
        return get(d, localeCode) % 100;
      };
    }

    function buildAlias(alias) {
      return function(d, localeCode) {
        return dateFormatMatcher(alias, d, localeCode);
      };
    }

    function buildAlternates(f) {
      for (var n = 1; n <= 5; n++) {
        buildAlternate(f, n);
      }
    }

    function buildAlternate(f, n) {
      var alternate = function(d, localeCode) {
        return f.get(d, localeCode, n);
      };
      addFormats(ldmlTokens, f.ldml + n, alternate);
      if (f.lowerToken) {
        ldmlTokens[f.lowerToken + n] = buildLowercase(alternate);
      }
    }

    function getIdentityFormat(name) {
      return function(d, localeCode) {
        var loc = localeManager.get(localeCode);
        return dateFormatMatcher(loc[name], d, localeCode);
      };
    }

    ldmlTokens = {};
    strfTokens = {};

    forEach(FormatTokensBase, function(f) {
      var get = f.get, getPadded;
      if (f.lowerToken) {
        ldmlTokens[f.lowerToken] = buildLowercase(get);
      }
      if (f.ordinalToken) {
        ldmlTokens[f.ordinalToken] = buildOrdinal(get, f);
      }
      if (f.ldmlPaddedToken) {
        ldmlTokens[f.ldmlPaddedToken] = buildPadded(get, f.ldmlPaddedToken.length);
      }
      if (f.ldmlTwoDigitToken) {
        ldmlTokens[f.ldmlTwoDigitToken] = buildPadded(buildTwoDigits(get), 2);
      }
      if (f.strfTwoDigitToken) {
        strfTokens[f.strfTwoDigitToken] = buildPadded(buildTwoDigits(get), 2);
      }
      if (f.strfPadding) {
        getPadded = buildPadded(get, f.strfPadding);
      }
      if (f.alias) {
        get = buildAlias(f.alias);
      }
      if (f.allowAlternates) {
        buildAlternates(f);
      }
      addFormats(ldmlTokens, f.ldml, get);
      addFormats(strfTokens, f.strf, getPadded || get);
    });

    forEachProperty(CoreOutputFormats, function(src, name) {
      addFormats(ldmlTokens, name, buildAlias(src));
    });

    defineInstanceSimilar(sugarDate, 'short medium long full', function(methods, name) {
      var fn = getIdentityFormat(name);
      addFormats(ldmlTokens, name, fn);
      methods[name] = fn;
    });

    addFormats(ldmlTokens, 'time', getIdentityFormat('time'));
    addFormats(ldmlTokens, 'stamp', getIdentityFormat('stamp'));
  }

  // Format matcher

  var dateFormatMatcher;

  function buildDateFormatMatcher() {

    function getLdml(d, token, localeCode) {
      return getOwn(ldmlTokens, token)(d, localeCode);
    }

    function getStrf(d, token, localeCode) {
      return getOwn(strfTokens, token)(d, localeCode);
    }

    function checkDateToken(ldml, strf) {
      return hasOwn(ldmlTokens, ldml) || hasOwn(strfTokens, strf);
    }

    // Format matcher for LDML or STRF tokens.
    dateFormatMatcher = createFormatMatcher(getLdml, getStrf, checkDateToken);
  }

  // Comparison helpers

  function fullCompareDate(date, d, margin) {
    var tmp;
    if (!dateIsValid(date)) return;
    if (isString(d)) {
      d = trim(d).toLowerCase();
      switch(true) {
        case d === 'future':    return date.getTime() > getNewDate().getTime();
        case d === 'past':      return date.getTime() < getNewDate().getTime();
        case d === 'today':     return compareDay(date);
        case d === 'tomorrow':  return compareDay(date,  1);
        case d === 'yesterday': return compareDay(date, -1);
        case d === 'weekday':   return getWeekday(date) > 0 && getWeekday(date) < 6;
        case d === 'weekend':   return getWeekday(date) === 0 || getWeekday(date) === 6;

        case (isDefined(tmp = English.weekdayMap[d])):
          return getWeekday(date) === tmp;
        case (isDefined(tmp = English.monthMap[d])):
          return getMonth(date) === tmp;
      }
    }
    return compareDate(date, d, margin);
  }

  function compareDate(date, d, margin, localeCode, options) {
    var loMargin = 0, hiMargin = 0, timezoneShift, compareEdges, override, min, max, p, t;

    function getTimezoneShift() {
      // If there is any specificity in the date then we're implicitly not
      // checking absolute time, so ignore timezone shifts.
      if (p.set && p.set.specificity) {
        return 0;
      }
      return (tzOffset(p.date) - tzOffset(date)) * MINUTES;
    }

    function addSpecificUnit() {
      var unit = DateUnits[p.set.specificity];
      return advanceDate(cloneDate(p.date), unit.name, 1).getTime() - 1;
    }

    if (_utc(date)) {
      options = options || {};
      options.fromUTC = true;
      options.setUTC = true;
    }

    p = getExtendedDate(null, d, options, true);

    if (margin > 0) {
      loMargin = hiMargin = margin;
      override = true;
    }
    if (!dateIsValid(p.date)) return false;
    if (p.set && p.set.specificity) {
      if (isDefined(p.set.edge) || isDefined(p.set.shift)) {
        compareEdges = true;
        moveToBeginningOfUnit(p.date, p.set.specificity, localeCode);
      }
      if (compareEdges || p.set.specificity === MONTH_INDEX) {
        max = moveToEndOfUnit(cloneDate(p.date), p.set.specificity, localeCode).getTime();
      } else {
        max = addSpecificUnit();
      }
      if (!override && isDefined(p.set.sign) && p.set.specificity) {
        // If the time is relative, there can occasionally be an disparity between
        // the relative date and "now", which it is being compared to, so set an
        // extra margin to account for this.
        loMargin = 50;
        hiMargin = -50;
      }
    }
    t   = date.getTime();
    min = p.date.getTime();
    max = max || min;
    timezoneShift = getTimezoneShift();
    if (timezoneShift) {
      min -= timezoneShift;
      max -= timezoneShift;
    }
    return t >= (min - loMargin) && t <= (max + hiMargin);
  }

  function compareDay(d, shift) {
    var comp = getNewDate();
    if (shift) {
      setDate(comp, getDate(comp) + shift);
    }
    return getYear(d) === getYear(comp) &&
           getMonth(d) === getMonth(comp) &&
           getDate(d) === getDate(comp);
  }

  // Create helpers

  function createDate(d, options, forceClone) {
    return getExtendedDate(null, d, options, forceClone).date;
  }

  function createDateWithContext(contextDate, d, options, forceClone) {
    return getExtendedDate(contextDate, d, options, forceClone).date;
  }

  function getExtendedDate(contextDate, d, opt, forceClone) {

    var date, set, loc, options, afterCallbacks, relative, weekdayDir;

    afterCallbacks = [];
    options = getDateOptions(opt);

    function getDateOptions(opt) {
      var options = isString(opt) ? { locale: opt } : opt || {};
      options.prefer = +!!getOwn(options, 'future') - +!!getOwn(options, 'past');
      return options;
    }

    function getFormatParams(match, dif) {
      var set = getOwn(options, 'params') || {};
      forEach(dif.to, function(field, i) {
        var str = match[i + 1], token, val;
        if (!str) return;
        if (field === 'yy' || field === 'y') {
          field = 'year';
          val = getYearFromAbbreviation(str, date, getOwn(options, 'prefer'));
        } else if (token = getOwn(ParsingTokens, field)) {
          field = token.param || field;
          val = getParsingTokenValue(token, str);
        } else {
          val = loc.getTokenValue(field, str);
        }
        set[field] = val;
      });
      return set;
    }

    // Clone date will set the utc flag, but it will
    // be overriden later, so set option flags instead.
    function cloneDateByFlag(d, clone) {
      if (_utc(d) && !isDefined(getOwn(options, 'fromUTC'))) {
        options.fromUTC = true;
      }
      if (_utc(d) && !isDefined(getOwn(options, 'setUTC'))) {
        options.setUTC = true;
      }
      if (clone) {
        d = new Date(d.getTime());
      }
      return d;
    }

    function afterDateSet(fn) {
      afterCallbacks.push(fn);
    }

    function fireCallbacks() {
      forEach(afterCallbacks, function(fn) {
        fn.call();
      });
    }

    function parseStringDate(str) {

      str = str.toLowerCase();

      // The act of getting the locale will initialize
      // if it is missing and add the required formats.
      loc = localeManager.get(getOwn(options, 'locale'));

      for (var i = 0, dif, match; dif = loc.compiledFormats[i]; i++) {
        match = str.match(dif.reg);
        if (match) {

          // Note that caching the format will modify the compiledFormats array
          // which is not a good idea to do inside its for loop, however we
          // know at this point that we have a matched format and that we will
          // break out below, so simpler to do it here.
          loc.cacheFormat(dif, i);

          set = getFormatParams(match, dif);

          if (isDefined(set.timestamp)) {
            str = set.timestamp;
            set = null;
            break;
          }

          if (isDefined(set.ampm)) {
            handleAmpm(set.ampm);
          }

          if (set.utc || isDefined(set.tzHour)) {
            handleTimezoneOffset(set.tzHour, set.tzMinute, set.tzSign);
          }

          if (isDefined(set.shift) && isUndefined(set.unit)) {
            // "next january", "next monday", etc
            handleUnitlessShift();
          }

          if (isDefined(set.num) && isUndefined(set.unit)) {
            // "the second of January", etc
            handleUnitlessNum(set.num);
          }

          if (set.midday) {
            // "noon" and "midnight"
            handleMidday(set.midday);
          }

          if (isDefined(set.day)) {
            // Relative day localizations such as "today" and "tomorrow".
            handleRelativeDay(set.day);
          }

          if (isDefined(set.unit)) {
            // "3 days ago", etc
            handleRelativeUnit(set.unit);
          }

          if (set.edge) {
            // "the end of January", etc
            handleEdge(set.edge, set);
          }

          if (set.yearSign) {
            set.year *= set.yearSign;
          }

          break;
        }
      }

      if (!set) {
        // Fall back to native parsing
        date = new Date(str);
        if (getOwn(options, 'fromUTC')) {
          // Falling back to system date here which cannot be parsed as UTC,
          // so if we're forcing UTC then simply add the offset.
          date.setTime(date.getTime() + (tzOffset(date) * MINUTES));
        }
      } else if (relative) {
        updateDate(date, set, false, 1);
      } else {
        if (_utc(date)) {
          // UTC times can traverse into other days or even months,
          // so preemtively reset the time here to prevent this.
          resetTime(date);
        }
        updateDate(date, set, true, 0, getOwn(options, 'prefer'), weekdayDir);
      }
      fireCallbacks();
      return date;
    }

    function handleAmpm(ampm) {
      if (ampm === 1 && set.hour < 12) {
        // If the time is 1pm-11pm advance the time by 12 hours.
        set.hour += 12;
      } else if (ampm === 0 && set.hour === 12) {
        // If it is 12:00am then set the hour to 0.
        set.hour = 0;
      }
    }

    function handleTimezoneOffset(tzHour, tzMinute, tzSign) {
      // Adjust for timezone offset
      _utc(date, true);
      var offset = (tzSign || 1) * ((tzHour || 0) * 60 + (tzMinute || 0));
      if (offset) {
        set.minute = (set.minute || 0) - offset;
      }
    }

    function handleUnitlessShift() {
      if (isDefined(set.month)) {
        // "next January"
        set.unit = YEAR_INDEX;
      } else if (isDefined(set.weekday)) {
        // "next Monday"
        set.unit = WEEK_INDEX;
      }
    }

    function handleUnitlessNum(num) {
      if (isDefined(set.weekday)) {
        // "The second Tuesday of March"
        setOrdinalWeekday(num);
      } else if (isDefined(set.month)) {
        // "The second of March"
        set.date = set.num;
      }
    }

    function handleMidday(hour) {
      set.hour = hour % 24;
      if (hour > 23) {
        // If the date has hours past 24, we need to prevent it from traversing
        // into a new day as that would make it being part of a new week in
        // ambiguous dates such as "Monday".
        afterDateSet(function() {
          advanceDate(date, 'date', trunc(hour / 24));
        });
      }
    }

    function handleRelativeDay() {
      resetTime(date);
      if (isUndefined(set.unit)) {
        set.unit = DAY_INDEX;
        set.num  = set.day;
        delete set.day;
      }
    }

    function handleRelativeUnit(unitIndex) {
      var num = isDefined(set.num) ? set.num : 1;

      // If a weekday is defined, there are 3 possible formats being applied:
      //
      // 1. "the day after monday": unit is days
      // 2. "next monday": short for "next week monday", unit is weeks
      // 3. "the 2nd monday of next month": unit is months
      //
      // In the first case, we need to set the weekday up front, as the day is
      // relative to it. The second case also needs to be handled up front for
      // formats like "next monday at midnight" which will have its weekday reset
      // if not set up front. The last case will set up the params necessary to
      // shift the weekday and allow separateAbsoluteUnits below to handle setting
      // it after the date has been shifted.
      if(isDefined(set.weekday)) {
        if(unitIndex === MONTH_INDEX) {
          setOrdinalWeekday(num);
          num = 1;
        } else {
          updateDate(date, { weekday: set.weekday }, true);
          delete set.weekday;
        }
      }

      if (set.half) {
        // Allow localized "half" as a standalone colloquialism. Purposely avoiding
        // the locale number system to reduce complexity. The units "month" and
        // "week" are purposely excluded in the English date formats below, as
        // "half a week" and "half a month" are meaningless as exact dates.
        num *= set.half;
      }

      if (isDefined(set.shift)) {
        // Shift and unit, ie "next month", "last week", etc.
        num *= set.shift;
      } else if (set.sign) {
        // Unit and sign, ie "months ago", "weeks from now", etc.
        num *= set.sign;
      }

      if (isDefined(set.day)) {
        // "the day after tomorrow"
        num += set.day;
        delete set.day;
      }

      // Formats like "the 15th of last month" or "6:30pm of next week"
      // contain absolute units in addition to relative ones, so separate
      // them here, remove them from the params, and set up a callback to
      // set them after the relative ones have been set.
      separateAbsoluteUnits(unitIndex);

      // Finally shift the unit.
      set[English.units[unitIndex]] = num;
      relative = true;
    }

    function handleEdge(edge, params) {
      var edgeIndex = params.unit, weekdayOfMonth;
      if (!edgeIndex) {
        // If we have "the end of January", then we need to find the unit index.
        iterateOverHigherDateParams(params, function(unitName, val, unit, i) {
          if (unitName === 'weekday' && isDefined(params.month)) {
            // If both a month and weekday exist, then we have a format like
            // "the last tuesday in November, 2012", where the "last" is still
            // relative to the end of the month, so prevent the unit "weekday"
            // from taking over.
            return;
          }
          edgeIndex = i;
        });
      }
      if (edgeIndex === MONTH_INDEX && isDefined(params.weekday)) {
        // If a weekday in a month exists (as described above),
        // then set it up to be set after the date has been shifted.
        weekdayOfMonth = params.weekday;
        delete params.weekday;
      }
      afterDateSet(function() {
        var stopIndex;
        // "edge" values that are at the very edge are "2" so the beginning of the
        // year is -2 and the end of the year is 2. Conversely, the "last day" is
        // actually 00:00am so it is 1. -1 is reserved but unused for now.
        if (edge < 0) {
          moveToBeginningOfUnit(date, edgeIndex, getOwn(options, 'locale'));
        } else if (edge > 0) {
          if (edge === 1) {
            stopIndex = DAY_INDEX;
            moveToBeginningOfUnit(date, DAY_INDEX);
          }
          moveToEndOfUnit(date, edgeIndex, getOwn(options, 'locale'), stopIndex);
        }
        if (isDefined(weekdayOfMonth)) {
          setWeekday(date, weekdayOfMonth, -edge);
          resetTime(date);
        }
      });
      if (edgeIndex === MONTH_INDEX) {
        params.specificity = DAY_INDEX;
      } else {
        params.specificity = edgeIndex - 1;
      }
    }

    function setOrdinalWeekday(num) {
      // If we have "the 2nd Tuesday of June", then pass the "weekdayDir"
      // flag along to updateDate so that the date does not accidentally traverse
      // into the previous month. This needs to be independent of the "prefer"
      // flag because we are only ensuring that the weekday is in the future, not
      // the entire date.
      set.weekday = 7 * (num - 1) + set.weekday;
      set.date = 1;
      weekdayDir = 1;
    }

    function separateAbsoluteUnits(unitIndex) {
      var params;

      iterateOverDateParams(set, function(name, val, unit, i) {
        // If there is a time unit set that is more specific than
        // the matched unit we have a string like "5:30am in 2 minutes",
        // which is meaningless, so invalidate the date...
        if (i >= unitIndex) {
          date.setTime(NaN);
          return false;
        } else if (i < unitIndex) {
          // ...otherwise set the params to set the absolute date
          // as a callback after the relative date has been set.
          params = params || {};
          params[name] = val;
          deleteDateParam(set, name);
        }
      });
      if (params) {
        afterDateSet(function() {
          updateDate(date, params, true, false, getOwn(options, 'prefer'), weekdayDir);
        });
        if (set.edge) {
          // "the end of March of next year"
          handleEdge(set.edge, params);
          delete set.edge;
        }
      }
    }

    if (contextDate && d) {
      // If a context date is passed ("get" and "unitsFromNow"),
      // then use it as the starting point.
      date = cloneDateByFlag(contextDate, true);
    } else {
      date = getNewDate();
    }

    _utc(date, getOwn(options, 'fromUTC'));

    if (isString(d)) {
      date = parseStringDate(d);
    } else if (isDate(d)) {
      date = cloneDateByFlag(d, hasOwn(options, 'clone') || forceClone);
    } else if (isObjectType(d)) {
      set = simpleClone(d);
      updateDate(date, set, true);
    } else if (isNumber(d) || d === null) {
      date.setTime(d);
    }
    // A date created by parsing a string presumes that the format *itself* is
    // UTC, but not that the date, once created, should be manipulated as such. In
    // other words, if you are creating a date object from a server time
    // "2012-11-15T12:00:00Z", in the majority of cases you are using it to create
    // a date that will, after creation, be manipulated as local, so reset the utc
    // flag here unless "setUTC" is also set.
    _utc(date, !!getOwn(options, 'setUTC'));
    return {
      set: set,
      date: date
    };
  }

  function updateDate(d, params, reset, advance, prefer, weekdayDir) {
    var upperUnitIndex;

    function setUpperUnit(unitName, unitIndex) {
      if (prefer && !upperUnitIndex) {
        if (unitName === 'weekday') {
          upperUnitIndex = WEEK_INDEX;
        } else {
          upperUnitIndex = getHigherUnitIndex(unitIndex);
        }
      }
    }

    function setSpecificity(unitIndex) {
      // Other functions may preemptively set the specificity before arriving
      // here so concede to them if they have already set more specific units.
      if (unitIndex > params.specificity) {
        return;
      }
      params.specificity = unitIndex;
    }

    function canDisambiguate() {
      if (!upperUnitIndex || upperUnitIndex > YEAR_INDEX) {
        return;
      }
      switch(prefer) {
        case -1: return d > getNewDate();
        case  1: return d < getNewDate();
      }
    }

    function disambiguateHigherUnit() {
      var unit = DateUnits[upperUnitIndex];
      advance = prefer;
      setUnit(unit.name, 1, unit, upperUnitIndex);
    }

    function handleFraction(unit, unitIndex, fraction) {
      if (unitIndex) {
        var lowerUnit = DateUnits[getLowerUnitIndex(unitIndex)];
        var val = round(unit.multiplier / lowerUnit.multiplier * fraction);
        params[lowerUnit.name] = val;
      }
    }

    function monthHasShifted(d, targetMonth) {
      if (targetMonth < 0) {
        targetMonth = targetMonth % 12 + 12;
      }
      return targetMonth % 12 !== getMonth(d);
    }

    function setUnit(unitName, value, unit, unitIndex) {
      var method = unit.method, checkMonth, fraction;

      setUpperUnit(unitName, unitIndex);
      setSpecificity(unitIndex);

      fraction = value % 1;
      if (fraction) {
        handleFraction(unit, unitIndex, fraction);
        value = trunc(value);
      }

      if (unitName === 'weekday') {
        if (!advance) {
          // Weekdays are always considered absolute units so simply set them
          // here even if it is an "advance" operation. This is to help avoid
          // ambiguous meanings in "advance" as well as to neatly allow formats
          // like "Wednesday of next week" without more complex logic.
          setWeekday(d, value, weekdayDir);
        }
        return;
      }
      checkMonth = unitIndex === MONTH_INDEX && getDate(d) > 28;

      // If we are advancing or rewinding, then we need we need to set the
      // absolute time if the unit is "hours" or less. This is due to the fact
      // that setting by method is ambiguous during DST shifts. For example,
      // 1:00am on November 1st 2015 occurs twice in North American timezones
      // with DST, the second time being after the clocks are rolled back at
      // 2:00am. When springing forward this is automatically handled as there
      // is no 2:00am so the date automatically jumps to 3:00am. However, when
      // rolling back, setHours(2) will always choose the first "2am" even if
      // the date is currently set to the second, causing unintended jumps.
      // This ambiguity is unavoidable when setting dates as the notation is
      // ambiguous. However when advancing, we clearly want the resulting date
      // to be an acutal hour ahead, which can only be accomplished by setting
      // the absolute time. Conversely, any unit higher than "hours" MUST use
      // the internal set methods, as they are ambiguous as absolute units of
      // time. Years may be 365 or 366 days depending on leap years, months are
      // all over the place, and even days may be 23-25 hours depending on DST
      // shifts. Finally, note that the kind of jumping described above will
      // occur when calling ANY "set" method on the date and will occur even if
      // the value being set is identical to the one currently set (i.e.
      // setHours(2) on a date at 2am may not be a noop). This is precarious,
      // so avoiding this situation in callDateSet by checking up front that
      // the value is not the same before setting.
      if (advance && !unit.ambiguous) {
        d.setTime(d.getTime() + (value * advance * unit.multiplier));
        return;
      } else if (advance) {
        if (unitIndex === WEEK_INDEX) {
          value *= 7;
          method = DateUnits[DAY_INDEX].method;
        }
        value = (value * advance) + callDateGet(d, method);
      }
      callDateSetWithWeek(d, method, value, advance);
      if (checkMonth && monthHasShifted(d, value)) {
        // As we are setting the units in reverse order, there is a chance that
        // our date may accidentally traverse into a new month, such as setting
        // { month: 1, date 15 } on January 31st. Check for this here and reset
        // the date to the last day of the previous month if this has happened.
        setDate(d, 0);
      }
    }

    if (isNumber(params) && advance) {
      // If param is a number and advancing, the number is in milliseconds.
      params = { millisecond: params };
    } else if (isNumber(params)) {
      // Otherwise just set the timestamp and return.
      d.setTime(params);
      return d;
    }

    iterateOverDateParams(params, setUnit);

    if (reset && params.specificity) {
      resetLowerUnits(d, params.specificity);
    }

    // If past or future is preferred, then the process of "disambiguation" will
    // ensure that an ambiguous time/date ("4pm", "thursday", "June", etc.) will
    // be in the past or future. Weeks are only considered ambiguous if there is
    // a weekday, i.e. "thursday" is an ambiguous week, but "the 4th" is an
    // ambiguous month.
    if (canDisambiguate()) {
      disambiguateHigherUnit();
    }
    return d;
  }

  // Locales

  // Locale helpers
  var English, localeManager;

  function getEnglishVariant(v) {
    return simpleMerge(simpleClone(EnglishLocaleBaseDefinition), v);
  }

  function arrayToRegAlternates(arr) {
    var joined = arr.join('');
    if (!arr || !arr.length) {
      return '';
    }
    if (joined.length === arr.length) {
      return '[' + joined + ']';
    }
    // map handles sparse arrays so no need to compact the array here.
    return map(arr, escapeRegExp).join('|');
  }

  function getRegNonCapturing(src, opt) {
    if (src.length > 1) {
      src = '(?:' + src + ')';
    }
    if (opt) {
      src += '?';
    }
    return src;
  }

  function getParsingTokenWithSuffix(field, src, suffix) {
    var token = LocalizedParsingTokens[field];
    if (token.requiresSuffix) {
      src = getRegNonCapturing(src + getRegNonCapturing(suffix));
    } else if (token.requiresSuffixOr) {
      src += getRegNonCapturing(token.requiresSuffixOr + '|' + suffix);
    } else {
      src += getRegNonCapturing(suffix, true);
    }
    return src;
  }

  function getArrayWithOffset(arr, n, alternate, offset) {
    var val;
    if (alternate > 1) {
      val = arr[n + (alternate - 1) * offset];
    }
    return val || arr[n];
  }

  function buildLocales() {

    function LocaleManager(loc) {
      this.locales = {};
      this.add(loc);
    }

    LocaleManager.prototype = {

      get: function(code, fallback) {
        var loc = this.locales[code];
        if (!loc && LazyLoadedLocales[code]) {
          loc = this.add(code, LazyLoadedLocales[code]);
        } else if (!loc && code) {
          loc = this.locales[code.slice(0, 2)];
        }
        return loc || fallback === false ? loc : this.current;
      },

      getAll: function() {
        return this.locales;
      },

      set: function(code) {
        var loc = this.get(code, false);
        if (!loc) {
          throw new TypeError('Invalid Locale: ' + code);
        }
        return this.current = loc;
      },

      add: function(code, def) {
        if (!def) {
          def = code;
          code = def.code;
        } else {
          def.code = code;
        }
        var loc = def.compiledFormats ? def : getNewLocale(def);
        this.locales[code] = loc;
        if (!this.current) {
          this.current = loc;
        }
        return loc;
      },

      remove: function(code) {
        if (this.current.code === code) {
          this.current = this.get('en');
        }
        return delete this.locales[code];
      }

    };

    // Sorry about this guys...
    English = getNewLocale(AmericanEnglishDefinition);
    localeManager = new LocaleManager(English);
  }

  function getNewLocale(def) {

    function Locale(def) {
      this.init(def);
    }

    Locale.prototype = {

      getMonthName: function(n, alternate) {
        if (this.monthSuffix) {
          return (n + 1) + this.monthSuffix;
        }
        return getArrayWithOffset(this.months, n, alternate, 12);
      },

      getWeekdayName: function(n, alternate) {
        return getArrayWithOffset(this.weekdays, n, alternate, 7);
      },

      getTokenValue: function(field, str) {
        var map = this[field + 'Map'], val;
        if (map) {
          val = map[str];
        }
        if (isUndefined(val)) {
          val = this.getNumber(str);
          if (field === 'month') {
            // Months are the only numeric date field
            // whose value is not the same as its number.
            val -= 1;
          }
        }
        return val;
      },

      getNumber: function(str) {
        var num = this.numeralMap[str];
        if (isDefined(num)) {
          return num;
        }
        // The unary plus operator here show better performance and handles
        // every format that parseFloat does with the exception of trailing
        // characters, which are guaranteed not to be in our string at this point.
        num = +str.replace(/,/, '.');
        if (!isNaN(num)) {
          return num;
        }
        num = this.getNumeralValue(str);
        if (!isNaN(num)) {
          this.numeralMap[str] = num;
          return num;
        }
        return num;
      },

      getNumeralValue: function(str) {
        var place = 1, num = 0, lastWasPlace, isPlace, numeral, digit, arr;
        // Note that "numerals" that need to be converted through this method are
        // all considered to be single characters in order to handle CJK. This
        // method is by no means unique to CJK, but the complexity of handling
        // inflections in non-CJK languages adds too much overhead for not enough
        // value, so avoiding for now.
        arr = str.split('');
        for (var i = arr.length - 1; numeral = arr[i]; i--) {
          digit = getOwn(this.numeralMap, numeral);
          if (isUndefined(digit)) {
            digit = getOwn(fullWidthNumberMap, numeral) || 0;
          }
          isPlace = digit > 0 && digit % 10 === 0;
          if (isPlace) {
            if (lastWasPlace) {
              num += place;
            }
            if (i) {
              place = digit;
            } else {
              num += digit;
            }
          } else {
            num += digit * place;
            place *= 10;
          }
          lastWasPlace = isPlace;
        }
        return num;
      },

      getOrdinal: function(n) {
        var suffix = this.ordinalSuffix;
        return suffix || getOrdinalSuffix(n);
      },

      getRelativeFormat: function(adu, type) {
        return this.convertAdjustedToFormat(adu, type);
      },

      getDuration: function(ms) {
        return this.convertAdjustedToFormat(getAdjustedUnitForNumber(max(0, ms)), 'duration');
      },

      getFirstDayOfWeek: function() {
        var val = this.firstDayOfWeek;
        return isDefined(val) ? val : ISO_FIRST_DAY_OF_WEEK;
      },

      getFirstDayOfWeekYear: function() {
        return this.firstDayOfWeekYear || ISO_FIRST_DAY_OF_WEEK_YEAR;
      },

      convertAdjustedToFormat: function(adu, type) {
        var sign, unit, mult,
            num    = adu[0],
            u      = adu[1],
            ms     = adu[2],
            format = this[type] || this.relative;
        if (isFunction(format)) {
          return format.call(this, num, u, ms, type);
        }
        mult = !this.plural || num === 1 ? 0 : 1;
        unit = this.units[mult * 8 + u] || this.units[u];
        sign = this[ms > 0 ? 'fromNow' : 'ago'];
        return format.replace(/\{(.*?)\}/g, function(full, match) {
          switch(match) {
            case 'num': return num;
            case 'unit': return unit;
            case 'sign': return sign;
          }
        });
      },

      cacheFormat: function(dif, i) {
        this.compiledFormats.splice(i, 1);
        this.compiledFormats.unshift(dif);
      },

      addFormat: function(src, to) {
        var loc = this;

        function getTokenSrc(str) {
          var suffix, src, val,
              opt   = str.match(/\?$/),
              nc    = str.match(/^(\d+)\??$/),
              slice = str.match(/(\d)(?:-(\d))?/),
              key   = str.replace(/[^a-z]+$/i, '');

          // Allowing alias tokens such as {time}
          if (val = getOwn(loc.parsingAliases, key)) {
            src = replaceParsingTokens(val);
            if (opt) {
              src = getRegNonCapturing(src, true);
            }
            return src;
          }

          if (nc) {
            src = loc.tokens[nc[1]];
          } else if (val = getOwn(ParsingTokens, key)) {
            src = val.src;
          } else {
            val = getOwn(loc.parsingTokens, key) || getOwn(loc, key);

            // Both the "months" array and the "month" parsing token can be accessed
            // by either {month} or {months}, falling back as necessary, however
            // regardless of whether or not a fallback occurs, the final field to
            // be passed to addRawFormat must be normalized as singular.
            key = key.replace(/s$/, '');

            if (!val) {
              val = getOwn(loc.parsingTokens, key) || getOwn(loc, key + 's');
            }

            if (isString(val)) {
              src = val;
              suffix = loc[key + 'Suffix'];
            } else {
              if (slice) {
                val = filter(val, function(m, i) {
                  var mod = i % (loc.units ? 8 : val.length);
                  return mod >= slice[1] && mod <= (slice[2] || slice[1]);
                });
              }
              src = arrayToRegAlternates(val);
            }
          }
          if (!src) {
            return '';
          }
          if (nc) {
            // Non-capturing tokens like {0}
            src = getRegNonCapturing(src);
          } else {
            // Capturing group and add to parsed tokens
            to.push(key);
            src = '(' + src + ')';
          }
          if (suffix) {
            // Date/time suffixes such as those in CJK
            src = getParsingTokenWithSuffix(key, src, suffix);
          }
          if (opt) {
            src += '?';
          }
          return src;
        }

        function replaceParsingTokens(str) {

          // Make spaces optional
          str = str.replace(/ /g, ' ?');

          return str.replace(/\{([^,]+?)\}/g, function(match, token) {
            var tokens = token.split('|'), src;
            if (tokens.length > 1) {
              src = getRegNonCapturing(map(tokens, getTokenSrc).join('|'));
            } else {
              src = getTokenSrc(token);
            }
            return src;
          });
        }

        if (!to) {
          to = [];
          src = replaceParsingTokens(src);
        }

        loc.addRawFormat(src, to);
      },

      addRawFormat: function(format, to) {
        this.compiledFormats.unshift({
          reg: RegExp('^ *' + format + ' *$', 'i'),
          to: to
        });
      },

      init: function(def) {
        var loc = this;

        // -- Initialization helpers

        function initFormats() {
          loc.compiledFormats = [];
          loc.parsingAliases = {};
          loc.parsingTokens = {};
        }

        function initDefinition() {
          simpleMerge(loc, def);
        }

        function initArrayFields() {
          forEach(LOCALE_ARRAY_FIELDS, function(name) {
            var val = loc[name];
            if (isString(val)) {
              loc[name] = commaSplit(val);
            } else if (!val) {
              loc[name] = [];
            }
          });
        }

        // -- Value array build helpers

        function buildValueArray(name, mod, map, fn) {
          var field = name, all = [], setMap;
          if (!loc[field]) {
            field += 's';
          }
          if (!map) {
            map = {};
            setMap = true;
          }
          forAllAlternates(field, function(alt, j, i) {
            var idx = j * mod + i, val;
            val = fn ? fn(i) : i;
            map[alt] = val;
            map[alt.toLowerCase()] = val;
            all[idx] = alt;
          });
          loc[field] = all;
          if (setMap) {
            loc[name + 'Map'] = map;
          }
        }

        function forAllAlternates(field, fn) {
          forEach(loc[field], function(str, i) {
            forEachAlternate(str, function(alt, j) {
              fn(alt, j, i);
            });
          });
        }

        function forEachAlternate(str, fn) {
          var arr = map(str.split('+'), function(split) {
            return split.replace(/(.+):(.+)$/, function(full, base, suffixes) {
              return map(suffixes.split('|'), function(suffix) {
                return base + suffix;
              }).join('|');
            });
          }).join('|');
          forEach(arr.split('|'), fn);
        }

        function buildNumerals() {
          var map = {};
          buildValueArray('numeral', 10, map);
          buildValueArray('article', 1, map, function() {
            return 1;
          });
          buildValueArray('placeholder', 4, map, function(n) {
            return pow(10, n + 1);
          });
          loc.numeralMap = map;
        }

        function buildTimeFormats() {
          loc.parsingAliases['time'] = getTimeFormat();
          loc.parsingAliases['tzOffset'] = getTZOffsetFormat();
        }

        function getTimeFormat() {
          var src;
          if (loc.ampmFront) {
            // "ampmFront" exists mostly for CJK locales, which also presume that
            // time suffixes exist, allowing this to be a simpler regex.
            src = '{ampm?} {hour} (?:{minute} (?::?{second})?)?';
          } else if(loc.ampm.length) {
            src = '{hour}(?:[.:]{minute}(?:[.:]{second})? {ampm?}| {ampm})';
          } else {
            src = '{hour}(?:[.:]{minute}(?:[.:]{second})?)';
          }
          return src;
        }

        function getTZOffsetFormat() {
          return '(?:{Z}|{GMT?}(?:{tzSign}{tzHour}(?::?{tzMinute}(?: \\([\\w\\s]+\\))?)?)?)?';
        }

        function buildParsingTokens() {
          forEachProperty(LocalizedParsingTokens, function(token, name) {
            var src, arr;
            src = token.base ? ParsingTokens[token.base].src : token.src;
            if (token.requiresNumerals || loc.numeralUnits) {
              src += getNumeralSrc();
            }
            arr = loc[name + 's'];
            if (arr && arr.length) {
              src += '|' + arrayToRegAlternates(arr);
            }
            loc.parsingTokens[name] = src;
          });
        }

        function getNumeralSrc() {
          var all, src = '';
          all = loc.numerals.concat(loc.placeholders).concat(loc.articles);
          if (loc.allowsFullWidth) {
            all = all.concat(fullWidthNumbers.split(''));
          }
          if (all.length) {
            src = '|(?:' + arrayToRegAlternates(all) + ')+';
          }
          return src;
        }

        function buildTimeSuffixes() {
          iterateOverDateUnits(function(unit, i) {
            var token = loc.timeSuffixes[i];
            if (token) {
              loc[(unit.alias || unit.name) + 'Suffix'] = token;
            }
          });
        }

        function buildModifiers() {
          forEach(loc.modifiers, function(modifier) {
            var name = modifier.name, mapKey = name + 'Map', map;
            map = loc[mapKey] || {};
            forEachAlternate(modifier.src, function(alt, j) {
              var token = getOwn(loc.parsingTokens, name), val = modifier.value;
              map[alt] = val;
              loc.parsingTokens[name] = token ? token + '|' + alt : alt;
              if (modifier.name === 'sign' && j === 0) {
                // Hooking in here to set the first "fromNow" or "ago" modifier
                // directly on the locale, so that it can be reused in the
                // relative format.
                loc[val === 1 ? 'fromNow' : 'ago'] = alt;
              }
            });
            loc[mapKey] = map;
          });
        }

        // -- Format adding helpers

        function addCoreFormats() {
          forEach(CoreParsingFormats, function(df) {
            var src = df.src;
            if (df.mdy && loc.mdy) {
              // Use the mm/dd/yyyy variant if it
              // exists and the locale requires it
              src = df.mdy;
            }
            if (df.time) {
              // Core formats that allow time require the time
              // reg on both sides, so add both versions here.
              loc.addFormat(getFormatWithTime(src, true));
              loc.addFormat(getFormatWithTime(src));
            } else {
              loc.addFormat(src);
            }
          });
          loc.addFormat('{time}');
        }

        function addLocaleFormats() {
          addFormatSet('parse');
          addFormatSet('timeParse', true);
          addFormatSet('timeFrontParse', true, true);
        }

        function addFormatSet(field, allowTime, timeFront) {
          forEach(loc[field], function(format) {
            if (allowTime) {
              format = getFormatWithTime(format, timeFront);
            }
            loc.addFormat(format);
          });
        }

        function getFormatWithTime(baseFormat, timeBefore) {
          if (timeBefore) {
            return getTimeBefore() + baseFormat;
          }
          return baseFormat + getTimeAfter();
        }

        function getTimeBefore() {
          return getRegNonCapturing('{time}[,\\s\\u3000]', true);
        }

        function getTimeAfter() {
          var markers = ',?[\\s\\u3000]', localized;
          localized = arrayToRegAlternates(loc.timeMarkers);
          if (localized) {
            markers += '| (?:' + localized + ') ';
          }
          markers = getRegNonCapturing(markers, loc.timeMarkerOptional);
          return getRegNonCapturing(markers + '{time}', true);
        }

        initFormats();
        initDefinition();
        initArrayFields();

        buildValueArray('month', 12);
        buildValueArray('weekday', 7);
        buildValueArray('unit', 8);
        buildValueArray('ampm', 2);

        buildNumerals();
        buildTimeFormats();
        buildParsingTokens();
        buildTimeSuffixes();
        buildModifiers();

        // The order of these formats is important. Order is reversed so formats
        // that are initialized later will take precedence. Generally, this means
        // that more specific formats should come later.
        addCoreFormats();
        addLocaleFormats();

      }

    };

    return new Locale(def);
  }


  /***
   * @method [units]Since(d, [options])
   * @returns Number
   * @short Returns the time since [d].
   * @extra [d] will accept a date object, timestamp, or string. If not specified,
   *        [d] is assumed to be now. `unitsAgo` is provided as an alias to make
   *        this more readable when [d] is assumed to be the current date.
   *        [options] can be an object or a locale code as a string. See `create`
   *        for more.
   *
   * @set
   *   millisecondsSince
   *   secondsSince
   *   minutesSince
   *   hoursSince
   *   daysSince
   *   weeksSince
   *   monthsSince
   *   yearsSince
   *
   * @example
   *
   *   new Date().millisecondsSince('1 hour ago') -> 3,600,000
   *   new Date().daysSince('1 week ago')         -> 7
   *   new Date().yearsSince('15 years ago')      -> 15
   *   lastYear.yearsAgo()                 -> 1
   *
   * @param {string|number|Date} d
   * @param {DateCreateOptions} options
   *
   ***
   * @method [units]Ago()
   * @returns Number
   * @short Returns the time ago in the appropriate unit.
   *
   * @set
   *   millisecondsAgo
   *   secondsAgo
   *   minutesAgo
   *   hoursAgo
   *   daysAgo
   *   weeksAgo
   *   monthsAgo
   *   yearsAgo
   *
   * @example
   *
   *   lastYear.millisecondsAgo() -> 3,600,000
   *   lastYear.daysAgo()         -> 7
   *   lastYear.yearsAgo()        -> 15
   *
   ***
   * @method [units]Until([d], [options])
   * @returns Number
   * @short Returns the time until [d].
   * @extra [d] will accept a date object, timestamp, or string. If not specified,
   *        [d] is assumed to be now. `unitsFromNow` is provided as an alias to
   *        make this more readable when [d] is assumed to be the current date.
   *        [options] can be an object or a locale code as a string. See `create`
   *        for more.
   *
   *
   * @set
   *   millisecondsUntil
   *   secondsUntil
   *   minutesUntil
   *   hoursUntil
   *   daysUntil
   *   weeksUntil
   *   monthsUntil
   *   yearsUntil
   *
   * @example
   *
   *   new Date().millisecondsUntil('1 hour from now') -> 3,600,000
   *   new Date().daysUntil('1 week from now')         -> 7
   *   new Date().yearsUntil('15 years from now')      -> 15
   *   nextYear.yearsFromNow()                  -> 1
   *
   * @param {string|number|Date} d
   * @param {DateCreateOptions} options
   *
   ***
   * @method [units]FromNow()
   * @returns Number
   * @short Returns the time from now in the appropriate unit.
   *
   * @set
   *   millisecondsFromNow
   *   secondsFromNow
   *   minutesFromNow
   *   hoursFromNow
   *   daysFromNow
   *   weeksFromNow
   *   monthsFromNow
   *   yearsFromNow
   *
   * @example
   *
   *   nextYear.millisecondsFromNow() -> 3,600,000
   *   nextYear.daysFromNow()         -> 7
   *   nextYear.yearsFromNow()        -> 15
   *
   ***
   * @method add[Units](n, [reset] = false)
   * @returns Date
   * @short Adds `n` units to the date. If [reset] is true, all lower units will
   *        be reset.
   * @extra This method modifies the date! Note that in the case of `addMonths`,
   *        the date may fall on a date that doesn't exist (i.e. February 30). In
   *        this case the date will be shifted to the last day of the month. Don't
   *        use `addMonths` if you need precision.
   *
   * @set
   *   addMilliseconds
   *   addSeconds
   *   addMinutes
   *   addHours
   *   addDays
   *   addWeeks
   *   addMonths
   *   addYears
   *
   * @example
   *
   *   new Date().addYears(5)        -> current time + 5 years
   *   new Date().addDays(5)         -> current time + 5 days
   *   new Date().addDays(5, true)   -> current time + 5 days (time reset)
   *
   * @param {number} n
   * @param {boolean} [reset]
   *
   ***
   * @method isLast[Unit]([localeCode])
   * @returns Boolean
   * @short Returns true if the date is last week, month, or year.
   * @extra This method takes an optional locale code for `isLastWeek`, which is
   *        locale dependent. The default locale code is `en`, which places
   *        Sunday at the beginning of the week. You can pass `en-GB` as a quick
   *        way to force Monday as the beginning of the week.
   *
   * @set
   *   isLastWeek
   *   isLastMonth
   *   isLastYear
   *
   * @example
   *
   *   yesterday.isLastWeek()  -> true or false?
   *   yesterday.isLastMonth() -> probably not...
   *   yesterday.isLastYear()  -> even less likely...
   *
   * @param {string} [localeCode]
   *
   ***
   * @method isThis[Unit]([localeCode])
   * @returns Boolean
   * @short Returns true if the date is this week, month, or year.
   * @extra This method takes an optional locale code for `isThisWeek`, which is
   *        locale dependent. The default locale code is `en`, which places
   *        Sunday at the beginning of the week. You can pass `en-GB` as a quick
   *        way to force Monday as the beginning of the week.
   *
   * @set
   *   isThisWeek
   *   isThisMonth
   *   isThisYear
   *
   * @example
   *
   *   tomorrow.isThisWeek()  -> true or false?
   *   tomorrow.isThisMonth() -> probably...
   *   tomorrow.isThisYear()  -> signs point to yes...
   *
   * @param {string} [localeCode]
   *
   ***
   * @method isNext[Unit]([localeCode])
   * @returns Boolean
   * @short Returns true if the date is next week, month, or year.
   * @extra This method takes an optional locale code for `isNextWeek`, which is
   *        locale dependent. The default locale code is `en`, which places
   *        Sunday at the beginning of the week. You can pass `en-GB` as a quick
   *        way to force Monday as the beginning of the week.
   *
   * @set
   *   isNextWeek
   *   isNextMonth
   *   isNextYear
   *
   * @example
   *
   *   tomorrow.isNextWeek()  -> true or false?
   *   tomorrow.isNextMonth() -> probably not...
   *   tomorrow.isNextYear()  -> even less likely...
   *
   * @param {string} [localeCode]
   *
   ***
   * @method beginningOf[Unit]([localeCode])
   * @returns Date
   * @short Sets the date to the beginning of the appropriate unit.
   * @extra This method modifies the date! A locale code can be passed for
   *        `beginningOfWeek`, which is locale dependent. If consistency is
   *        needed, use `beginningOfISOWeek` instead.
   *
   * @set
   *   beginningOfDay
   *   beginningOfWeek
   *   beginningOfMonth
   *   beginningOfYear
   *
   * @example
   *
   *   new Date().beginningOfDay()   -> the beginning of today (resets the time)
   *   new Date().beginningOfWeek()  -> the beginning of the week
   *   new Date().beginningOfMonth() -> the beginning of the month
   *   new Date().beginningOfYear()  -> the beginning of the year
   *
   * @param {string} [localeCode]
   *
   ***
   * @method endOf[Unit]([localeCode])
   * @returns Date
   * @short Sets the date to the end of the appropriate unit.
   * @extra This method modifies the date! A locale code can be passed for
   *        `endOfWeek`, which is locale dependent. If consistency is needed, use
   *        `endOfISOWeek` instead.
   *
   * @set
   *   endOfDay
   *   endOfWeek
   *   endOfMonth
   *   endOfYear
   *
   * @example
   *
   *   new Date().endOfDay()   -> the end of today (sets the time to 23:59:59.999)
   *   new Date().endOfWeek()  -> the end of the week
   *   new Date().endOfMonth() -> the end of the month
   *   new Date().endOfYear()  -> the end of the year
   *
   * @param {string} [localeCode]
   *
   ***/
  function buildDateUnitMethods() {

    defineInstanceSimilar(sugarDate, DateUnits, function(methods, unit, index) {
      var name = unit.name, caps = simpleCapitalize(name);

      if (index > DAY_INDEX) {
        forEach(['Last','This','Next'], function(shift) {
          methods['is' + shift + caps] = function(d, localeCode) {
            return compareDate(d, shift + ' ' + name, 0, localeCode, { locale: 'en' });
          };
        });
      }
      if (index > HOURS_INDEX) {
        methods['beginningOf' + caps] = function(d, localeCode) {
          return moveToBeginningOfUnit(d, index, localeCode);
        };
        methods['endOf' + caps] = function(d, localeCode) {
          return moveToEndOfUnit(d, index, localeCode);
        };
      }

      methods['add' + caps + 's'] = function(d, num, reset) {
        return advanceDate(d, name, num, reset);
      };

      var since = function(date, d, options) {
        return getTimeDistanceForUnit(date, createDateWithContext(date, d, options, true), unit);
      };
      var until = function(date, d, options) {
        return getTimeDistanceForUnit(createDateWithContext(date, d, options, true), date, unit);
      };

      methods[name + 'sAgo']   = methods[name + 'sUntil']   = until;
      methods[name + 'sSince'] = methods[name + 'sFromNow'] = since;

    });

  }

  /***
   * @method is[Day]()
   * @returns Boolean
   * @short Returns true if the date falls on the specified day.
   *
   * @set
   *   isToday
   *   isYesterday
   *   isTomorrow
   *   isWeekday
   *   isWeekend
   *   isSunday
   *   isMonday
   *   isTuesday
   *   isWednesday
   *   isThursday
   *   isFriday
   *   isSaturday
   *
   * @example
   *
   *   tomorrow.isToday() -> false
   *   thursday.isTomorrow() -> ?
   *   yesterday.isWednesday() -> ?
   *   today.isWeekend() -> ?
   *
   ***
   * @method isFuture()
   * @returns Boolean
   * @short Returns true if the date is in the future.
   *
   * @example
   *
   *   lastWeek.isFuture() -> false
   *   nextWeek.isFuture() -> true
   *
   ***
   * @method isPast()
   * @returns Boolean
   * @short Returns true if the date is in the past.
   *
   * @example
   *
   *   lastWeek.isPast() -> true
   *   nextWeek.isPast() -> false
   *
   ***/
  function buildRelativeAliases() {
    var special  = spaceSplit('Today Yesterday Tomorrow Weekday Weekend Future Past');
    var weekdays = English.weekdays.slice(0, 7);
    var months   = English.months.slice(0, 12);
    var together = special.concat(weekdays).concat(months);
    defineInstanceSimilar(sugarDate, together, function(methods, name) {
      methods['is'+ name] = function(d) {
        return fullCompareDate(d, name);
      };
    });
  }

  defineStatic(sugarDate, {

    /***
     * @method create(d, [options])
     * @returns Date
     * @static
     * @short Alternate date constructor which accepts text formats, a timestamp,
     *        objects, or another date.
     * @extra If no argument is given, the date is assumed to be now. The second
     *        argument can either be an options object or a locale code as a
     *        shortcut. For more, see `date parsing`.
     *
     * @options
     *
     *   locale     A locale code to parse the date in. This can also be passed as
     *              the second argument to this method. Default is the current
     *              locale, which is `en` if none is set.
     *
     *   past       If `true`, ambiguous dates like `Sunday` will be parsed as
     *              `last Sunday`. Note that non-ambiguous dates are not
     *              guaranteed to be in the past.
     *              Default is `false`.
     *
     *   future     If `true`, ambiguous dates like `Sunday` will be parsed as
     *              `next Sunday`. Note that non-ambiguous dates are not
     *              guaranteed to be in the future.
     *              Default is `false`.
     *
     *   fromUTC    If `true`, dates with no timezone notation will be parsed as
     *              UTC (no timezone offset). This is useful for server
     *              timestamps, etc. Note that this flag is not required if the
     *              timezone is specified in the string, either as an explicit
     *              value (ex. +0900 or -09:00) or "Z", which is UTC time.
     *
     *   setUTC     If `true`, this will set a flag on the date that tells Sugar
     *              to internally use UTC methods like `getUTCHours` when handling
     *              it. This flag is the same as calling the `setUTC` method on
     *              the date after parsing is complete. Note that this is
     *              different from `fromUTC`, which parses a string as UTC, but
     *              does not set this flag.
     *
     *   clone      If `true` and `d` is a date, it will be cloned.
     *
     *   params     An optional object that is populated with properties that are
     *              parsed from string input. This option is useful when parsed
     *              properties need to be retained.
     *
     * @example
     *
     *   Date.create('July')                      -> July of this year
     *   Date.create('1776')                      -> 1776
     *   Date.create('today')                     -> today
     *   Date.create('Wednesday')                 -> This wednesday
     *   Date.create('next Friday')               -> Next friday
     *   Date.create('July 4, 1776')              -> July 4, 1776
     *   Date.create(-446806800000)               -> November 5, 1955
     *   Date.create('1776年07月04日', 'ja')      -> July 4, 1776
     *   Date.create('August', {past: true})      -> August of this or last year
     *   Date.create('August', {future: true})    -> August of this or next year
     *   Date.create('Thursday', {fromUTC: true}) -> Thursday at 12:00am UTC time
     *
     * @param {string|number|Date} d
     * @param {DateCreateOptions} [options]
     *
     * @option {string} [locale]
     * @option {boolean} [past]
     * @option {boolean} [future]
     * @option {boolean} [fromUTC]
     * @option {boolean} [setUTC]
     * @option {boolean} [clone]
     * @option {Object} [params]
     *
     ***/
    'create': function(d, options) {
      return createDate(d, options);
    },

    /***
     * @method getLocale([localeCode] = current)
     * @returns Locale
     * @static
     * @short Gets the locale object for the given code, or the current locale.
     * @extra The locale object has various properties that dictate how dates are
     *        parsed and formatted for that locale. The locale object is exposed
     *        here mostly for introspection - it should be uncommon to need to
     *        maniplate the object itself. For more, see `date locales`.
     *
     * @example
     *
     *   Date.getLocale()     -> Returns the current locale
     *   Date.getLocale('en') -> Returns the EN locale
     *
     * @param {string} [localeCode]
     *
     ***/
    'getLocale': function(code) {
      return localeManager.get(code, !code);
    },

    /***
     * @method getAllLocales()
     * @returns Array<Locale>
     * @static
     * @short Returns all available locales as an object.
     * @extra For more, see `date locales`.
     * @example
     *
     *   Date.getAllLocales()
     *
     ***/
    'getAllLocales': function() {
      return localeManager.getAll();
    },

    /***
     * @method getAllLocaleCodes()
     * @returns string[]
     * @static
     * @short Returns all available locale codes as an array of strings.
     * @extra For more, see `date locales`.
     * @example
     *
     *   Date.getAllLocaleCodes()
     *
     ***/
    'getAllLocaleCodes': function() {
      return getKeys(localeManager.getAll());
    },

    /***
     * @method setLocale(code)
     * @returns Locale
     * @static
     * @short Sets the current locale to be used with dates.
     * @extra Sugar has native support for 17 major locales. In addition, you can
     *        define a new locale with `addLocale`. For more, see `date locales`.
     * @example
     *
     *   Date.setLocale('en')
     *
     * @param {string} code
     *
     ***/
    'setLocale': function(code) {
      return localeManager.set(code);
    },

    /***
     * @method addLocale(code, def)
     * @returns Locale
     * @static
     * @short Adds a locale definition to the locales understood by Sugar.
     * @extra This method should only be required for adding locale definitions
     *        that don't already exist. For more, see `date locales`.
     * @example
     *
     *   Date.addLocale('eo', {})
     *
     * @param {string} code
     * @param {Object} def
     *
     ***/
    'addLocale': function(code, set) {
      return localeManager.add(code, set);
    },

    /***
     * @method removeLocale(code)
     * @returns Locale
     * @static
     * @short Deletes the the locale by `code` from Sugar's known locales.
     * @extra For more, see `date locales`.
     * @example
     *
     *   Date.removeLocale('foo')
     *
     * @param {string} code
     *
     ***/
    'removeLocale': function(code) {
      return localeManager.remove(code);
    }

  });

  defineInstanceWithArguments(sugarDate, {

    /***
     * @method set(set, [reset] = false)
     * @returns Date
     * @short Sets the date object.
     * @extra This method accepts multiple formats including a single number as
     *        a timestamp, an object, or enumerated arguments. If [reset] is
     *        `true`, any units more specific than those passed will be reset.
     *
     * @example
     *
     *   new Date().set({year:2011,month:11,day:31}) -> December 31, 2011
     *   new Date().set(2011, 11, 31)                -> December 31, 2011
     *   new Date().set(86400000)                    -> 1 day after Jan 1, 1970
     *   new Date().set({year:2004,month:6}, true)   -> June 1, 2004, 00:00:00.000
     *
     * @signature set(milliseconds)
     * @signature set(year, month, [day], [hour], [minute], [second], [millliseconds])
     * @param {Object} set
     * @param {boolean} [reset]
     * @param {number} year
     * @param {number} month
     * @param {number} [day]
     * @param {number} [hour]
     * @param {number} [minute]
     * @param {number} [second]
     * @param {number} [milliseconds]
     *
     ***/
    'set': function(d, args) {
      args = collectDateArguments(args);
      return updateDate(d, args[0], args[1]);
    },

    /***
     * @method advance(set, [reset] = false)
     * @returns Date
     * @short Shifts the date forward.
     * @extra `set` accepts multiple formats including an object, a string in the
     *        format "3 days", a single number as milliseconds, or enumerated
     *        parameters (as with the Date constructor). If [reset] is `true`, any
     *        units more specific than those passed will be reset. This method
     *        modifies the date!
     *
     * @example
     *
     *   new Date().advance({ year: 2 }) -> 2 years in the future
     *   new Date().advance('2 hours')   -> 2 hours in the future
     *   new Date().advance(0, 2, 3)     -> 2 months 3 days in the future
     *   new Date().advance(86400000)    -> 1 day in the future
     *
     * @signature advance(milliseconds)
     * @signature advance(year, month, [day], [hour], [minute], [second], [millliseconds])
     * @param {string|Object} set
     * @param {boolean} [reset]
     * @param {number} year
     * @param {number} month
     * @param {number} [day]
     * @param {number} [hour]
     * @param {number} [minute]
     * @param {number} [second]
     * @param {number} [milliseconds]
     *
     ***/
    'advance': function(d, args) {
      return advanceDateWithArgs(d, args, 1);
    },

    /***
     * @method rewind(set, [reset] = false)
     * @returns Date
     * @short Shifts the date backward.
     * @extra [set] accepts multiple formats including an object, a string in the
     *        format "3 days", a single number as milliseconds, or enumerated
     *        parameters (as with the Date constructor). If [reset] is `true`, any
     *        units more specific than those passed will be reset. This method
     *        modifies the date!
     *
     * @example
     *
     *   new Date().rewind({ year: 2 }) -> 2 years in the past
     *   new Date().rewind('2 weeks')   -> 2 weeks in the past
     *   new Date().rewind(0, 2, 3)     -> 2 months 3 days in the past
     *   new Date().rewind(86400000)    -> 1 day in the past
     *
     * @signature advance(milliseconds)
     * @signature advance(year, month, [day], [hour], [minute], [second], [millliseconds])
     * @param {string|Object} set
     * @param {boolean} [reset]
     * @param {number} year
     * @param {number} month
     * @param {number} [day]
     * @param {number} [hour]
     * @param {number} [minute]
     * @param {number} [second]
     * @param {number} [milliseconds]
     *
     ***/
    'rewind': function(d, args) {
      return advanceDateWithArgs(d, args, -1);
    }

  });

  defineInstance(sugarDate, {

    /***
     * @method get(d, [options])
     * @returns Date
     * @short Gets a new date using the current one as a starting point.
     * @extra This method is identical to `Date.create`, except that relative
     *        formats like `next month` are relative to the date instance rather
     *        than the current date. Accepts a locale code as a string in place
     *        of [options]. See `create` for more.
     *
     * @example
     *
     *   nextYear.get('monday') -> monday of the week exactly 1 year from now
     *   millenium.get('2 years before') -> 2 years before Jan 1, 2000.
     *
     * @param {string|number|Date} d
     * @param {DateCreateOptions} options
     *
     ***/
    'get': function(date, d, options) {
      return createDateWithContext(date, d, options);
    },

    /***
     * @method setWeekday(dow)
     * @short Sets the weekday of the date, starting with Sunday at `0`.
     * @extra This method modifies the date!
     *
     * @example
     *
     *   d = new Date(); d.setWeekday(1); d; -> Monday of this week
     *   d = new Date(); d.setWeekday(6); d; -> Saturday of this week
     *
     * @param {number} dow
     *
     ***/
    'setWeekday': function(date, dow) {
      return setWeekday(date, dow);
    },

    /***
     * @method setISOWeek(num)
     * @short Sets the week (of the year) as defined by the ISO8601 standard.
     * @extra Note that this standard places Sunday at the end of the week (day 7).
     *        This method modifies the date!
     *
     * @example
     *
     *   d = new Date(); d.setISOWeek(15); d; -> 15th week of the year
     *
     * @param {number} num
     *
     ***/
    'setISOWeek': function(date, num) {
      return setISOWeekNumber(date, num);
    },

    /***
     * @method getISOWeek()
     * @returns Number
     * @short Gets the date's week (of the year) as defined by the ISO8601 standard.
     * @extra Note that this standard places Sunday at the end of the week (day 7).
     *        If `utc` is set on the date, the week will be according to UTC time.
     *
     * @example
     *
     *   new Date().getISOWeek() -> today's week of the year
     *
     ***/
    'getISOWeek': function(date) {
      return getWeekNumber(date, true);
    },

    /***
     * @method beginningOfISOWeek()
     * @returns Date
     * @short Set the date to the beginning of week as defined by ISO8601.
     * @extra Note that this standard places Monday at the start of the week.
     *        This method modifies the date!
     *
     * @example
     *
     *   new Date().beginningOfISOWeek() -> Monday
     *
     ***/
    'beginningOfISOWeek': function(date) {
      var day = getWeekday(date);
      if (day === 0) {
        day = -6;
      } else if (day !== 1) {
        day = 1;
      }
      setWeekday(date, day);
      return resetTime(date);
    },

    /***
     * @method endOfISOWeek()
     * @returns Date
     * @short Set the date to the end of week as defined by this ISO8601 standard.
     * @extra Note that this standard places Sunday at the end of the week.
     *        This method modifies the date!
     *
     * @example
     *
     *   new Date().endOfISOWeek() -> Sunday
     *
     ***/
    'endOfISOWeek': function(date) {
      if (getWeekday(date) !== 0) {
        setWeekday(date, 7);
      }
      return moveToEndOfUnit(date, DAY_INDEX);
    },

    /***
     * @method getUTCOffset([iso] = false)
     * @returns String
     * @short Returns a string representation of the offset from UTC time. If [iso]
     *        is true the offset will be in ISO8601 format.
     *
     * @example
     *
     *   new Date().getUTCOffset()     -> "+0900"
     *   new Date().getUTCOffset(true) -> "+09:00"
     *
     * @param {boolean} iso
     *
     ***/
    'getUTCOffset': function(date, iso) {
      return getUTCOffset(date, iso);
    },

    /***
     * @method setUTC([on] = false)
     * @returns Date
     * @short Controls a flag on the date that tells Sugar to internally use UTC
     *        methods like `getUTCHours`.
     * @extra This flag is most commonly used for output in UTC time with the
     *        `format` method. Note that this flag only governs which methods are
     *        called internally – date native methods like `setHours` will still
     *        return local non-UTC values. This method will modify the date!
     *
     * @example
     *
     *   new Date().setUTC(true).long()  -> formatted with UTC methods
     *   new Date().setUTC(false).long() -> formatted without UTC methods
     *
     * @param {boolean} on
     *
     ***/
    'setUTC': function(date, on) {
      return _utc(date, on);
    },

    /***
     * @method isUTC()
     * @returns Boolean
     * @short Returns true if the date has no timezone offset.
     * @extra This will also return true for dates whose internal utc flag is set
     *        with `setUTC`. Even if the utc flag is set, `getTimezoneOffset`
     *        will always report the same thing as Javascript always reports that
     *        based on the environment's locale.
     *
     * @example
     *
     *   new Date().isUTC() -> true or false (depends on the local offset)
     *   new Date().setUTC(true).isUTC() -> true
     *
     ***/
    'isUTC': function(date) {
      return isUTC(date);
    },

    /***
     * @method isValid()
     * @returns Boolean
     * @short Returns true if the date is valid.
     *
     * @example
     *
     *   new Date().isValid()         -> true
     *   new Date('flexor').isValid() -> false
     *
     ***/
    'isValid': function(date) {
      return dateIsValid(date);
    },

    /***
     * @method isAfter(d, [margin] = 0)
     * @returns Boolean
     * @short Returns true if the date is after `d`.
     * @extra [margin] is to allow extra margin of error in ms. `d` will accept
     *        a date object, timestamp, or string. If not specified, `d` is
     *        assumed to be now. See `create` for formats.
     *
     * @example
     *
     *   today.isAfter('tomorrow')  -> false
     *   today.isAfter('yesterday') -> true
     *
     * @param {string|number|Date} d
     * @param {number} [margin]
     *
     ***/
    'isAfter': function(date, d, margin) {
      return date.getTime() > createDate(d).getTime() - (margin || 0);
    },

    /***
     * @method isBefore(d, [margin] = 0)
     * @returns Boolean
     * @short Returns true if the date is before `d`.
     * @extra [margin] is to allow extra margin of error in ms. `d` will accept
     *        a date object, timestamp, or text format. If not specified, `d` is
     *        assumed to be now. See `create` for formats.
     *
     * @example
     *
     *   today.isBefore('tomorrow')  -> true
     *   today.isBefore('yesterday') -> false
     *
     * @param {string|number|Date} d
     * @param {number} [margin]
     *
     ***/
    'isBefore': function(date, d, margin) {
      return date.getTime() < createDate(d).getTime() + (margin || 0);
    },

    /***
     * @method isBetween(d1, d2, [margin] = 0)
     * @returns Boolean
     * @short Returns true if the date is later or equal to `d1` and before or
     *        equal to `d2`.
     * @extra [margin] is to allow extra margin of error in ms. `d1` and `d2` will
     *        accept a date object, timestamp, or text format. If not specified,
     *        they are assumed to be now.  See `create` for formats.
     *
     * @example
     *
     *   new Date().isBetween('yesterday', 'tomorrow')    -> true
     *   new Date().isBetween('last year', '2 years ago') -> false
     *
     * @param {string|number|Date} d1
     * @param {string|number|Date} d2
     * @param {number} [margin]
     *
     ***/
    'isBetween': function(date, d1, d2, margin) {
      var t  = date.getTime();
      var t1 = createDate(d1).getTime();
      var t2 = createDate(d2).getTime();
      var lo = min(t1, t2);
      var hi = max(t1, t2);
      margin = margin || 0;
      return (lo - margin <= t) && (hi + margin >= t);
    },

    /***
     * @method isLeapYear()
     * @returns Boolean
     * @short Returns true if the date is a leap year.
     *
     * @example
     *
     *   millenium.isLeapYear() -> true
     *
     ***/
    'isLeapYear': function(date) {
      var year = getYear(date);
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    },

    /***
     * @method daysInMonth()
     * @returns Number
     * @short Returns the number of days in the date's month.
     *
     * @example
     *
     *   may.daysInMonth() -> 31
     *   feb.daysInMonth() -> 28 or 29
     *
     ***/
    'daysInMonth': function(date) {
      return getDaysInMonth(date);
    },

    /***
     * @method format([f], [localeCode] = currentLocaleCode)
     * @returns String
     * @short Returns the date as a string using the format `f`.
     * @extra `f` is a string that contains tokens in either LDML format using
     *        curly braces, or "strftime" format using a percent sign. If `f` is
     *        not specified, the locale specific `{long}` format is used. [localeCode]
     *        is a locale code to use (if not specified the current locale is
     *        used). For more, see `date formatting`.
     *
     * @example
     *
     *   new Date().format()                        -> ex. February 13, 2012 11:21 AM
     *   new Date().format('{Weekday} {d} {Month}') -> ex. Monday July 4
     *   new Date().format('{hh}:{mm}')             -> ex. 15:57
     *   new Date().format('%H:%M')                 -> ex. 15:57
     *   new Date().format('{12hr}:{mm}{tt}')       -> ex. 3:57pm
     *   new Date().format('ISO8601')               -> ex. 2011-07-05 12:24:55.528Z
     *   new Date().format('{Weekday}', 'ja')       -> ex. 先週
     *
     * @param {string} f
     * @param {string} [localeCode]
     *
     ***
     * @method short([localeCode] = currentLocaleCode)
     * @returns String
     * @short Outputs the date in the short format for the current locale.
     * @extra [localeCode] overrides the current locale code if passed.
     *
     * @example
     *
     *   new Date().short()     -> ex. 02/13/2016
     *   new Date().short('fi') -> ex. 13.2.2016
     *
     * @param {string} [localeCode]
     *
     ***
     * @method medium([localeCode] = currentLocaleCode)
     * @returns String
     * @short Outputs the date in the medium format for the current locale.
     * @extra [localeCode] overrides the current locale code if passed.
     *
     * @example
     *
     *   new Date().medium()     -> ex. February 13, 2016
     *   new Date().medium('ja') -> ex. 2016年2月13日
     *
     * @param {string} [localeCode]
     *
     ***
     * @method long([localeCode] = currentLocaleCode)
     * @returns String
     * @short Outputs the date in the long format for the current locale.
     * @extra [localeCode] overrides the current locale code if passed.
     *
     * @example
     *
     *   new Date().long()     -> ex. February 13, 2016 6:22 PM
     *   new Date().long('es') -> ex. 13 de febrero de 2016 18:22
     *
     * @param {string} [localeCode]
     *
     ***
     * @method full([localeCode] = currentLocaleCode)
     * @returns String
     * @short Outputs the date in the full format for the current locale.
     * @extra [localeCode] overrides the current locale code if passed.
     *
     * @example
     *
     *   new Date().full()     -> ex. Saturday, February 13, 2016 6:23 PM
     *   new Date().full('ru') -> ex. суббота, 13 февраля 2016 г., 18:23
     *
     * @param {string} [localeCode]
     *
     ***/
    'format': function(date, f, localeCode) {
      return dateFormat(date, f, localeCode);
    },

    /***
     * @method relative([localeCode] = currentLocaleCode, [fn])
     * @returns String
     * @short Returns the date in a text format relative to the current time,
     *        such as "5 minutes ago".
     * @extra [fn] is a function that can be passed to provide more granular
     *        control over the resulting string. Its return value will be passed
     *        to `format`. If nothing is returned, the relative format will be
     *        used. [fn] may be passed as the first argument in place of [locale].
     *        For more about formats, see `date formatting`.
     *
     * @callback relativeFn
     *
     *   num   The offset number in `unit`.
     *   unit  A numeric representation of the unit that `num` is in, starting at
     *         0 for ms.
     *   ms    The absolute offset in milliseconds.
     *   loc   The locale object, either specified by [locale] or default.
     *
     * @example
     *
     *   hourAgo.relative() -> 1 hour ago
     *   jan.relative()     -> ex. 5 months ago
     *   jan.relative('ja') -> 3ヶ月前
     *   jan.relative(function(num, unit, ms, loc) {
     *     // Return an absolute date for anything over 6 months.
     *     if(unit == 6 && num > 6 || unit > 6) {
     *       return '{Month} {d}, {yyyy}';
     *     }
     *   }); -> ex. 5 months ago
     *
     * @signature relative([fn])
     * @param {string} [localeCode]
     * @param {relativeFn} [fn]
     * @callbackParam {number} num
     * @callbackParam {number} unit
     * @callbackParam {number} ms
     * @callbackParam {Locale} loc
     * @callbackReturns {string} relativeFn
     *
     ***/
    'relative': function(date, localeCode, fn) {
      return dateRelative(date, null, localeCode, fn);
    },

    /***
     * @method relativeTo(d, [localeCode] = currentLocaleCode)
     * @returns String
     * @short Returns the date in a text format relative to `d`, such as
     *        "5 minutes".
     * @extra `d` will accept a date object, timestamp, or string. [localeCode]
     *        applies to the method output, not `d`.
     *
     * @example
     *
     *   jan.relativeTo(jul)                 -> 5 months
     *   yesterday.relativeTo('today', 'ja') -> 一日
     *
     * @param {string|number|Date} d
     * @param {string} code
     *
     *
     ***/
    'relativeTo': function(date, d, localeCode) {
      return dateRelative(date, createDate(d), localeCode);
    },

    /***
     * @method is(d, [margin] = 0)
     * @returns Boolean
     * @short Returns true if the date matches `d`.
     * @extra `d` will accept a date object, timestamp, or text format. In the
     *        case of objects and text formats, `is` will additionally compare
     *        based on the precision implied in the input. In the case of text
     *        formats `d` will use the currently set locale. [margin] allows an
     *        extra margin of error in milliseconds. See `create` for formats.
     *
     * @example
     *
     *   new Date().is('July')               -> true or false?
     *   new Date().is('1776')               -> false
     *   new Date().is('today')              -> true
     *   new Date().is('weekday')            -> true or false?
     *   new Date().is('July 4, 1776')       -> false
     *   new Date().is(-6106093200000)       -> false
     *   new Date().is(new Date(1776, 6, 4)) -> false
     *
     * @param {string|number|Date} d
     * @param {number} [margin]
     *
     ***/
    'is': function(date, d, margin) {
      return fullCompareDate(date, d, margin);
    },

    /***
     * @method reset([unit] = 'day', [localeCode] = currentLocaleCode)
     * @returns Date
     * @short Resets the date to the beginning of [unit].
     * @extra This method effectively resets all smaller units, pushing the date
     *        to the beginning of [unit]. Default is `day`, which effectively
     *        resets the time. [localeCode] is provided for resetting weeks, which
     *        is locale dependent. This method modifies the date!
     *
     * @example
     *
     *   new Date().reset('day')   -> Beginning of the day
     *   new Date().reset('month') -> Beginning of the month
     *
     * @param {string} [unit]
     * @param {string} [localeCode]
     *
     ***/
    'reset': function(date, unit, localeCode) {
      var unitIndex = unit ? getUnitIndexForParamName(unit) : DAY_INDEX;
      moveToBeginningOfUnit(date, unitIndex, localeCode);
      return date;
    },

    /***
     * @method clone()
     * @returns Date
     * @short Clones the date.
     * @extra Note that the UTC flag will be preserved if set. This flag is
     *        set via the `setUTC` method or an option on `Date.create`.
     *
     * @example
     *
     *   new Date().clone() -> Copy of now
     *
     ***/
    'clone': function(date) {
      return cloneDate(date);
    },

    /***
     * @method iso()
     * @alias toISOString
     *
     ***/
    'iso': function(date) {
      return date.toISOString();
    },

    /***
     * @method getWeekday()
     * @returns Number
     * @short Alias for `getDay`.
     *
     * @example
     *
     *   new Date().getWeekday();    -> (ex.) 3
     *
     ***/
    'getWeekday': function(date) {
      return getWeekday(date);
    },

    /***
     * @method getUTCWeekday()
     * @returns Number
     * @short Alias for `getUTCDay`.
     *
     * @example
     *
     *   new Date().getUTCWeekday(); -> (ex.) 3
     *
     ***/
    'getUTCWeekday': function(date) {
      return date.getUTCDay();
    }

  });


  /*** @namespace Number ***/

  /***
   * @method [dateUnit]()
   * @returns Number
   * @short Takes the number as a unit of time and converts to milliseconds.
   * @extra Method names can be singular or plural.  Note that as "a month" is
   *        ambiguous as a unit of time, `months` will be equivalent to 30.4375
   *        days, the average number in a month. Be careful using `months` if you
   *        need exact precision.
   *
   * @set
   *   millisecond
   *   milliseconds
   *   second
   *   seconds
   *   minute
   *   minutes
   *   hour
   *   hours
   *   day
   *   days
   *   week
   *   weeks
   *   month
   *   months
   *   year
   *   years
   *
   * @example
   *
   *   (5).milliseconds() -> 5
   *   (10).hours()       -> 36000000
   *   (1).day()          -> 86400000
   *
   ***
   * @method [dateUnit]Before(d, [options])
   * @returns Date
   * @short Returns a date that is `n` units before [d], where `n` is the number.
   * @extra [d] will accept a date object, timestamp, or text format. Note that
   *        "months" is ambiguous as a unit of time. If the target date falls on a
   *        day that does not exist (i.e. August 31 -> February 31), the date will
   *        be shifted to the last day of the month. Be careful using
   *        `monthsBefore` if you need exact precision. [options] can be an object
   *        or a locale code as a string. See `create` for more.
   *
   *
   * @set
   *   millisecondBefore
   *   millisecondsBefore
   *   secondBefore
   *   secondsBefore
   *   minuteBefore
   *   minutesBefore
   *   hourBefore
   *   hoursBefore
   *   dayBefore
   *   daysBefore
   *   weekBefore
   *   weeksBefore
   *   monthBefore
   *   monthsBefore
   *   yearBefore
   *   yearsBefore
   *
   * @example
   *
   *   (5).daysBefore('tuesday')          -> 5 days before tuesday of this week
   *   (1).yearBefore('January 23, 1997') -> January 23, 1996
   *
   * @param {string|number|Date} d
   * @param {DateCreateOptions} options
   *
   ***
   * @method [dateUnit]Ago()
   * @returns Date
   * @short Returns a date that is `n` units ago.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date
   *        falls on a day that does not exist (i.e. August 31 -> February 31), the
   *        date will be shifted to the last day of the month. Be careful using
   *        `monthsAgo` if you need exact precision.
   *
   * @set
   *   millisecondAgo
   *   millisecondsAgo
   *   secondAgo
   *   secondsAgo
   *   minuteAgo
   *   minutesAgo
   *   hourAgo
   *   hoursAgo
   *   dayAgo
   *   daysAgo
   *   weekAgo
   *   weeksAgo
   *   monthAgo
   *   monthsAgo
   *   yearAgo
   *   yearsAgo
   *
   * @example
   *
   *   (5).weeksAgo() -> 5 weeks ago
   *   (1).yearAgo()  -> January 23, 1996
   *
   ***
   * @method [dateUnit]After(d, [options])
   * @returns Date
   * @short Returns a date `n` units after [d], where `n` is the number.
   * @extra [d] will accept a date object, timestamp, or text format. Note that
   *        "months" is ambiguous as a unit of time. If the target date falls on a
   *        day that does not exist (i.e. August 31 -> February 31), the date will
   *        be shifted to the last day of the month. Be careful using
   *        `monthsAfter` if you need exact precision. [options] can be an object
   *        or a locale code as a string. See `create` for more.
   *
   * @set
   *   millisecondAfter
   *   millisecondsAfter
   *   secondAfter
   *   secondsAfter
   *   minuteAfter
   *   minutesAfter
   *   hourAfter
   *   hoursAfter
   *   dayAfter
   *   daysAfter
   *   weekAfter
   *   weeksAfter
   *   monthAfter
   *   monthsAfter
   *   yearAfter
   *   yearsAfter
   *
   * @example
   *
   *   (5).daysAfter('tuesday')          -> 5 days after tuesday of this week
   *   (1).yearAfter('January 23, 1997') -> January 23, 1998
   *
   * @param {string|number|Date} d
   * @param {DateCreateOptions} options
   *
   ***
   * @method [dateUnit]FromNow()
   * @returns Date
   * @short Returns a date `n` units from now.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date
   *        falls on a day that does not exist (i.e. August 31 -> February 31), the
   *        date will be shifted to the last day of the month. Be careful using
   *        `monthsFromNow` if you need exact precision.
   *
   * @set
   *   millisecondFromNow
   *   millisecondsFromNow
   *   secondFromNow
   *   secondsFromNow
   *   minuteFromNow
   *   minutesFromNow
   *   hourFromNow
   *   hoursFromNow
   *   dayFromNow
   *   daysFromNow
   *   weekFromNow
   *   weeksFromNow
   *   monthFromNow
   *   monthsFromNow
   *   yearFromNow
   *   yearsFromNow
   *
   * @example
   *
   *   (5).weeksFromNow() -> 5 weeks ago
   *   (1).yearFromNow()  -> January 23, 1998
   *
   ***/
  function buildNumberUnitMethods() {
    defineInstanceSimilar(sugarNumber, DateUnits, function(methods, unit) {
      var name = unit.name, base, after, before;
      base = function(n) {
        return round(n * unit.multiplier);
      };
      after = function(n, d, options) {
        return advanceDate(createDate(d, options, true), name, n);
      };
      before = function(n, d, options) {
        return advanceDate(createDate(d, options, true), name, -n);
      };
      methods[name] = base;
      methods[name + 's'] = base;
      methods[name + 'Before'] = before;
      methods[name + 'sBefore'] = before;
      methods[name + 'Ago'] = before;
      methods[name + 'sAgo'] = before;
      methods[name + 'After'] = after;
      methods[name + 'sAfter'] = after;
      methods[name + 'FromNow'] = after;
      methods[name + 'sFromNow'] = after;
    });
  }

  defineInstance(sugarNumber, {

    /***
     * @method duration([localeCode] = currentLocaleCode)
     * @returns String
     * @short Takes the number as milliseconds and returns a localized string.
     * @extra This method is the same as `Date#relative` without the localized
     *        equivalent of "from now" or "ago". [localeCode] can be passed as the
     *        first (and only) parameter. Note that this method is only available
     *        when the dates module is included.
     *
     * @example
     *
     *   (500).duration() -> '500 milliseconds'
     *   (1200).duration() -> '1 second'
     *   (75).minutes().duration() -> '1 hour'
     *   (75).minutes().duration('es') -> '1 hora'
     *
     * @param {string} [localeCode]
     *
     ***/
    'duration': function(n, localeCode) {
      return localeManager.get(localeCode).getDuration(n);
    }

  });


  var EnglishLocaleBaseDefinition = {
    'code': 'en',
    'plural': true,
    'timeMarkers': 'at',
    'ampm': 'AM|A.M.|a,PM|P.M.|p',
    'units': 'millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s',
    'months': 'Jan:uary|,Feb:ruary|,Mar:ch|,Apr:il|,May,Jun:e|,Jul:y|,Aug:ust|,Sep:tember|t|,Oct:ober|,Nov:ember|,Dec:ember|',
    'weekdays': 'Sun:day|,Mon:day|,Tue:sday|,Wed:nesday|,Thu:rsday|,Fri:day|,Sat:urday|+weekend',
    'numerals': 'zero,one|first,two|second,three|third,four:|th,five|fifth,six:|th,seven:|th,eight:|h,nin:e|th,ten:|th',
    'articles': 'a,an,the',
    'tokens': 'the,st|nd|rd|th,of|in,a|an,on',
    'time': '{H}:{mm}',
    'past': '{num} {unit} {sign}',
    'future': '{num} {unit} {sign}',
    'duration': '{num} {unit}',
    'modifiers': [
      { 'name': 'half',   'src': 'half', 'value': .5 },
      { 'name': 'midday', 'src': 'noon', 'value': 12 },
      { 'name': 'midday', 'src': 'midnight', 'value': 24 },
      { 'name': 'day',    'src': 'yesterday', 'value': -1 },
      { 'name': 'day',    'src': 'today|tonight', 'value': 0 },
      { 'name': 'day',    'src': 'tomorrow', 'value': 1 },
      { 'name': 'sign',   'src': 'ago|before', 'value': -1 },
      { 'name': 'sign',   'src': 'from now|after|from|in|later', 'value': 1 },
      { 'name': 'edge',   'src': 'first day|first|beginning', 'value': -2 },
      { 'name': 'edge',   'src': 'last day', 'value': 1 },
      { 'name': 'edge',   'src': 'end|last', 'value': 2 },
      { 'name': 'shift',  'src': 'last', 'value': -1 },
      { 'name': 'shift',  'src': 'the|this', 'value': 0 },
      { 'name': 'shift',  'src': 'next', 'value': 1 }
    ],
    'parse': [
      '(?:just)? now',
      '{shift} {unit:5-7}',
      "{months?} (?:{year}|'{yy})",
      '{midday} {4?} {day|weekday}',
      '{months},?(?:[-.\\/\\s]{year})?',
      '{edge} of (?:day)? {day|weekday}',
      '{0} {num}{1?} {weekday} {2} {months},? {year?}',
      '{shift?} {day?} {weekday?} {timeMarker?} {midday}',
      '{sign?} {3?} {half} {3?} {unit:3-4|unit:7} {sign?}',
      '{0?} {edge} {weekday?} {2} {shift?} {unit:4-7?} {months?},? {year?}'
    ],
    'timeParse': [
      '{day|weekday}',
      '{shift} {unit:5?} {weekday}',
      '{0?} {date}{1?} {2?} {months?}',
      '{weekday} {2?} {shift} {unit:5}',
      '{0?} {num} {2?} {months}\\.?,? {year?}',
      '{num?} {unit:4-5} {sign} {day|weekday}',
      '{year}[-.\\/\\s]{months}[-.\\/\\s]{date}',
      '{0|months} {date?}{1?} of {shift} {unit:6-7}',
      '{0?} {num}{1?} {weekday} of {shift} {unit:6}',
      "{date}[-.\\/\\s]{months}[-.\\/\\s](?:{year}|'?{yy})",
      "{weekday?}\\.?,? {months}\\.?,? {date}{1?},? (?:{year}|'{yy})?"
    ],
    'timeFrontParse': [
      '{sign} {num} {unit}',
      '{num} {unit} {sign}',
      '{4?} {day|weekday}'
    ]
  };

  var AmericanEnglishDefinition = getEnglishVariant({
    'mdy': true,
    'firstDayOfWeek': 0,
    'firstDayOfWeekYear': 1,
    'short':  '{MM}/{dd}/{yyyy}',
    'medium': '{Month} {d}, {yyyy}',
    'long':   '{Month} {d}, {yyyy} {time}',
    'full':   '{Weekday}, {Month} {d}, {yyyy} {time}',
    'stamp':  '{Dow} {Mon} {d} {yyyy} {time}',
    'time':   '{h}:{mm} {TT}'
  });

  var BritishEnglishDefinition = getEnglishVariant({
    'short':  '{dd}/{MM}/{yyyy}',
    'medium': '{d} {Month} {yyyy}',
    'long':   '{d} {Month} {yyyy} {H}:{mm}',
    'full':   '{Weekday}, {d} {Month}, {yyyy} {time}',
    'stamp':  '{Dow} {d} {Mon} {yyyy} {time}'
  });

  var CanadianEnglishDefinition = getEnglishVariant({
    'short':  '{yyyy}-{MM}-{dd}',
    'medium': '{d} {Month}, {yyyy}',
    'long':   '{d} {Month}, {yyyy} {H}:{mm}',
    'full':   '{Weekday}, {d} {Month}, {yyyy} {time}',
    'stamp':  '{Dow} {d} {Mon} {yyyy} {time}'
  });

  var LazyLoadedLocales = {
    'en-US': AmericanEnglishDefinition,
    'en-GB': BritishEnglishDefinition,
    'en-AU': BritishEnglishDefinition,
    'en-CA': CanadianEnglishDefinition
  };

  buildLocales();
  buildDateFormatTokens();
  buildDateFormatMatcher();
  buildDateUnitMethods();
  buildNumberUnitMethods();
  buildRelativeAliases();
  setDateChainableConstructor();

  /***
   * @module String
   * @description String manupulation, encoding, truncation, and formatting, and more.
   *
   ***/

  // Flag allowing native string methods to be enhanced
  var STRING_ENHANCEMENTS_FLAG = 'enhanceString';

  // Matches non-punctuation characters except apostrophe for capitalization.
  var CAPITALIZE_REG = /[^\u0000-\u0040\u005B-\u0060\u007B-\u007F]+('s)?/g;

  // Regex matching camelCase.
  var CAMELIZE_REG = /(^|_)([^_]+)/g;

  // Regex matching any HTML entity.
  var HTML_ENTITY_REG = /&#?(x)?([\w\d]{0,5});/gi;

  // Very basic HTML escaping regex.
  var HTML_ESCAPE_REG = /[&<>]/g;

  // Special HTML entities.
  var HTMLFromEntityMap = {
    'lt':    '<',
    'gt':    '>',
    'amp':   '&',
    'nbsp':  ' ',
    'quot':  '"',
    'apos':  "'"
  };

  var HTMLToEntityMap;

  // Words that should not be capitalized in titles
  var DOWNCASED_WORDS = [
    'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at',
    'by', 'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over',
    'with', 'for'
  ];

  // HTML tags that do not have inner content.
  var HTML_VOID_ELEMENTS = [
    'area','base','br','col','command','embed','hr','img',
    'input','keygen','link','meta','param','source','track','wbr'
  ];

  var LEFT_TRIM_REG  = RegExp('^['+ TRIM_CHARS +']+');
  var RIGHT_TRIM_REG = RegExp('['+ TRIM_CHARS +']+$');
  var TRUNC_REG      = RegExp('(?=[' + TRIM_CHARS + '])');

  // Reference to native String#includes to enhance later.
  var nativeIncludes = String.prototype.includes;

  // Base64
  var encodeBase64, decodeBase64;

  // Format matcher for String#format.
  var stringFormatMatcher = createFormatMatcher(deepGetProperty);

  function padString(num, padding) {
    return repeatString(isDefined(padding) ? padding : ' ', num);
  }

  function truncateString(str, length, from, ellipsis, split) {
    var str1, str2, len1, len2;
    if (str.length <= length) {
      return str.toString();
    }
    ellipsis = isUndefined(ellipsis) ? '...' : ellipsis;
    switch(from) {
      case 'left':
        str2 = split ? truncateOnWord(str, length, true) : str.slice(str.length - length);
        return ellipsis + str2;
      case 'middle':
        len1 = ceil(length / 2);
        len2 = floor(length / 2);
        str1 = split ? truncateOnWord(str, len1) : str.slice(0, len1);
        str2 = split ? truncateOnWord(str, len2, true) : str.slice(str.length - len2);
        return str1 + ellipsis + str2;
      default:
        str1 = split ? truncateOnWord(str, length) : str.slice(0, length);
        return str1 + ellipsis;
    }
  }

  function stringEach(str, search, fn) {
    var chunks, chunk, reg, result = [];
    if (isFunction(search)) {
      fn = search;
      reg = /[\s\S]/g;
    } else if (!search) {
      reg = /[\s\S]/g;
    } else if (isString(search)) {
      reg = RegExp(escapeRegExp(search), 'gi');
    } else if (isRegExp(search)) {
      reg = RegExp(search.source, getRegExpFlags(search, 'g'));
    }
    // Getting the entire array of chunks up front as we need to
    // pass this into the callback function as an argument.
    chunks = runGlobalMatch(str, reg);

    if (chunks) {
      for(var i = 0, len = chunks.length, r; i < len; i++) {
        chunk = chunks[i];
        result[i] = chunk;
        if (fn) {
          r = fn.call(str, chunk, i, chunks);
          if (r === false) {
            break;
          } else if (isDefined(r)) {
            result[i] = r;
          }
        }
      }
    }
    return result;
  }

  // "match" in < IE9 has enumable properties that will confuse for..in
  // loops, so ensure that the match is a normal array by manually running
  // "exec". Note that this method is also slightly more performant.
  function runGlobalMatch(str, reg) {
    var result = [], match, lastLastIndex;
    while ((match = reg.exec(str)) != null) {
      if (reg.lastIndex === lastLastIndex) {
        reg.lastIndex += 1;
      } else {
        result.push(match[0]);
      }
      lastLastIndex = reg.lastIndex;
    }
    return result;
  }

  function eachWord(str, fn) {
    return stringEach(trim(str), /\S+/g, fn);
  }

  function stringCodes(str, fn) {
    var codes = new Array(str.length), i, len;
    for(i = 0, len = str.length; i < len; i++) {
      var code = str.charCodeAt(i);
      codes[i] = code;
      if (fn) {
        fn.call(str, code, i, str);
      }
    }
    return codes;
  }

  function stringUnderscore(str) {
    var areg = Inflections.acronyms && Inflections.acronyms.reg;
    return str
      .replace(/[-\s]+/g, '_')
      .replace(areg, function(acronym, index) {
        return (index > 0 ? '_' : '') + acronym.toLowerCase();
      })
      .replace(/([A-Z\d]+)([A-Z][a-z])/g,'$1_$2')
      .replace(/([a-z\d])([A-Z])/g,'$1_$2')
      .toLowerCase();
  }

  function stringCamelize(str, upper) {
    str = stringUnderscore(str);
    return str.replace(CAMELIZE_REG, function(match, pre, word, index) {
      var cap = upper !== false || index > 0, acronym;
      acronym = getAcronym(word);
      if (acronym && cap) {
        return acronym;
      }
      return cap ? stringCapitalize(word, true) : word;
    });
  }

  function stringSpacify(str) {
    return stringUnderscore(str).replace(/_/g, ' ');
  }

  function stringCapitalize(str, downcase, all) {
    if (downcase) {
      str = str.toLowerCase();
    }
    return all ? str.replace(CAPITALIZE_REG, simpleCapitalize) : simpleCapitalize(str);
  }

  function stringTitleize(str) {
    var fullStopPunctuation = /[.:;!]$/, lastHadPunctuation;
    str = runHumanRules(str);
    str = stringSpacify(str);
    return eachWord(str, function(word, index, words) {
      word = getHumanWord(word) || word;
      word = getAcronym(word) || word;
      var hasPunctuation, isFirstOrLast;
      var first = index == 0, last = index == words.length - 1;
      hasPunctuation = fullStopPunctuation.test(word);
      isFirstOrLast = first || last || hasPunctuation || lastHadPunctuation;
      lastHadPunctuation = hasPunctuation;
      if (isFirstOrLast || indexOf(DOWNCASED_WORDS, word) === -1) {
        return stringCapitalize(word, false, true);
      } else {
        return word;
      }
    }).join(' ');
  }

  function stringParameterize(str, separator) {
    if (separator === undefined) separator = '-';
    str = str.replace(/[^a-z0-9\-_]+/gi, separator);
    if (separator) {
      var reg = RegExp('^{s}+|{s}+$|({s}){s}+'.split('{s}').join(escapeRegExp(separator)), 'g');
      str = str.replace(reg, '$1');
    }
    return encodeURI(str.toLowerCase());
  }

  function reverseString(str) {
    return str.split('').reverse().join('');
  }

  function truncateOnWord(str, limit, fromLeft) {
    if (fromLeft) {
      return reverseString(truncateOnWord(reverseString(str), limit));
    }
    var words = str.split(TRUNC_REG);
    var count = 0;
    return filter(words, function(word) {
      count += word.length;
      return count <= limit;
    }).join('');
  }

  function unescapeHTML(str) {
    return str.replace(HTML_ENTITY_REG, function(full, hex, code) {
      var special = HTMLFromEntityMap[code];
      return special || chr(hex ? parseInt(code, 16) : +code);
    });
  }

  function tagIsVoid(tag) {
    return indexOf(HTML_VOID_ELEMENTS, tag.toLowerCase()) !== -1;
  }

  function stringReplaceAll(str, f, replace) {
    var i = 0, tokens;
    if (isString(f)) {
      f = RegExp(escapeRegExp(f), 'g');
    } else if (f && !f.global) {
      f = RegExp(f.source, getRegExpFlags(f, 'g'));
    }
    if (!replace) {
      replace = '';
    } else {
      tokens = replace;
      replace = function() {
        var t = tokens[i++];
        return t != null ? t : '';
      };
    }
    return str.replace(f, replace);
  }

  function replaceTags(str, find, replacement, strip) {
    var tags = isString(find) ? [find] : find, reg, src;
    tags = map(tags || [], function(t) {
      return escapeRegExp(t);
    }).join('|');
    src = tags.replace('all', '') || '[^\\s>]+';
    src = '<(\\/)?(' + src + ')(\\s+[^<>]*?)?\\s*(\\/)?>';
    reg = RegExp(src, 'gi');
    return runTagReplacements(str.toString(), reg, strip, replacement);
  }

  function runTagReplacements(str, reg, strip, replacement, fullString) {

    var match;
    var result = '';
    var currentIndex = 0;
    var openTagName;
    var openTagAttributes;
    var openTagCount = 0;

    function processTag(index, tagName, attributes, tagLength, isVoid) {
      var content = str.slice(currentIndex, index), s = '', r = '';
      if (isString(replacement)) {
        r = replacement;
      } else if (replacement) {
        r = replacement.call(fullString, tagName, content, attributes, fullString) || '';
      }
      if (strip) {
        s = r;
      } else {
        content = r;
      }
      if (content) {
        content = runTagReplacements(content, reg, strip, replacement, fullString);
      }
      result += s + content + (isVoid ? '' : s);
      currentIndex = index + (tagLength || 0);
    }

    fullString = fullString || str;
    reg = RegExp(reg.source, 'gi');

    while(match = reg.exec(str)) {

      var tagName         = match[2];
      var attributes      = (match[3]|| '').slice(1);
      var isClosingTag    = !!match[1];
      var isSelfClosing   = !!match[4];
      var tagLength       = match[0].length;
      var isVoid          = tagIsVoid(tagName);
      var isOpeningTag    = !isClosingTag && !isSelfClosing && !isVoid;
      var isSameAsCurrent = tagName === openTagName;

      if (!openTagName) {
        result += str.slice(currentIndex, match.index);
        currentIndex = match.index;
      }

      if (isOpeningTag) {
        if (!openTagName) {
          openTagName = tagName;
          openTagAttributes = attributes;
          openTagCount++;
          currentIndex += tagLength;
        } else if (isSameAsCurrent) {
          openTagCount++;
        }
      } else if (isClosingTag && isSameAsCurrent) {
        openTagCount--;
        if (openTagCount === 0) {
          processTag(match.index, openTagName, openTagAttributes, tagLength, isVoid);
          openTagName       = null;
          openTagAttributes = null;
        }
      } else if (!openTagName) {
        processTag(match.index, tagName, attributes, tagLength, isVoid);
      }
    }
    if (openTagName) {
      processTag(str.length, openTagName, openTagAttributes);
    }
    result += str.slice(currentIndex);
    return result;
  }

  function numberOrIndex(str, n, from) {
    if (isString(n)) {
      n = str.indexOf(n);
      if (n === -1) {
        n = from ? str.length : 0;
      }
    }
    return n;
  }

  function buildBase64() {
    var encodeAscii, decodeAscii;

    function catchEncodingError(fn) {
      return function(str) {
        try {
          return fn(str);
        } catch(e) {
          return '';
        }
      };
    }

    if (typeof Buffer !== 'undefined') {
      encodeBase64 = function(str) {
        return new Buffer(str).toString('base64');
      };
      decodeBase64 = function(str) {
        return new Buffer(str, 'base64').toString('utf8');
      };
      return;
    }
    if (typeof btoa !== 'undefined') {
      encodeAscii = catchEncodingError(btoa);
      decodeAscii = catchEncodingError(atob);
    } else {
      var key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var base64reg = /[^A-Za-z0-9\+\/\=]/g;
      encodeAscii = function(str) {
        var output = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        do {
          chr1 = str.charCodeAt(i++);
          chr2 = str.charCodeAt(i++);
          chr3 = str.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }
          output += key.charAt(enc1);
          output += key.charAt(enc2);
          output += key.charAt(enc3);
          output += key.charAt(enc4);
          chr1 = chr2 = chr3 = '';
          enc1 = enc2 = enc3 = enc4 = '';
        } while (i < str.length);
        return output;
      };
      decodeAscii = function(input) {
        var output = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        if (input.match(base64reg)) {
          return '';
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        do {
          enc1 = key.indexOf(input.charAt(i++));
          enc2 = key.indexOf(input.charAt(i++));
          enc3 = key.indexOf(input.charAt(i++));
          enc4 = key.indexOf(input.charAt(i++));
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
          output = output + chr(chr1);
          if (enc3 != 64) {
            output = output + chr(chr2);
          }
          if (enc4 != 64) {
            output = output + chr(chr3);
          }
          chr1 = chr2 = chr3 = '';
          enc1 = enc2 = enc3 = enc4 = '';
        } while (i < input.length);
        return output;
      };
    }
    encodeBase64 = function(str) {
      return encodeAscii(unescape(encodeURIComponent(str)));
    };
    decodeBase64 = function(str) {
      return decodeURIComponent(escape(decodeAscii(str)));
    };
  }

  function buildEntities() {
    HTMLToEntityMap = {};
    forEachProperty(HTMLFromEntityMap, function(val, key) {
      HTMLToEntityMap[val] = '&' + key + ';';
    });
  }

  function callIncludesWithRegexSupport(str, search, position) {
    if (!isRegExp(search)) {
      return nativeIncludes.call(str, search, position);
    }
    if (position) {
      str = str.slice(position);
    }
    return search.test(str);
  }

  defineInstance(sugarString, {

    // Enhancment to String#includes to allow a regex.
    'includes': fixArgumentLength(callIncludesWithRegexSupport)

  }, [ENHANCEMENTS_FLAG, STRING_ENHANCEMENTS_FLAG]);

  defineInstance(sugarString, {

    /***
     * @method at(index, [loop] = false)
     * @returns Mixed
     * @short Gets the character(s) at a given index.
     * @extra When [loop] is true, overshooting the end of the string will begin
     *        counting from the other end. `index` may be negative. If `index` is
     *        an array, multiple elements will be returned.
     * @example
     *
     *   'jumpy'.at(0)             -> 'j'
     *   'jumpy'.at(2)             -> 'm'
     *   'jumpy'.at(5)             -> ''
     *   'jumpy'.at(5, true)       -> 'j'
     *   'jumpy'.at(-1)            -> 'y'
     *   'lucky charms'.at([2, 4]) -> ['u','k']
     *
     * @param {number|Array<number>} index
     * @param {boolean} [loop]
     *
     ***/
    'at': function(str, index, loop) {
      return getEntriesForIndexes(str, index, loop, true);
    },

    /***
     * @method escapeURL([param] = false)
     * @returns String
     * @short Escapes characters in a string to make a valid URL.
     * @extra If [param] is true, it will also escape valid URL characters. Use
     *        this when the entire string is meant for use in a query string.
     *
     * @example
     *
     *   'a, b, and c'.escapeURL() -> 'a,%20b,%20and%20c'
     *   'http://foo.com/'.escapeURL(true) -> 'http%3A%2F%2Ffoo.com%2F'
     *
     * @param {boolean} [param]
     *
     ***/
    'escapeURL': function(str, param) {
      return param ? encodeURIComponent(str) : encodeURI(str);
    },

    /***
     * @method unescapeURL([partial] = false)
     * @returns String
     * @short Restores escaped characters in a URL escaped string.
     * @extra If [partial] is true, it will only unescape non-valid URL tokens,
     *        and is included here for completeness, but should be rarely needed.
     *
     * @example
     *
     *   'http%3A%2F%2Ffoo.com%2F'.unescapeURL()     -> 'http://foo.com/'
     *   'http%3A%2F%2Ffoo.com%2F'.unescapeURL(true) -> 'http%3A%2F%2Ffoo.com%2F'
     *
     * @param {boolean} [partial]
     *
     ***/
    'unescapeURL': function(str, param) {
      return param ? decodeURI(str) : decodeURIComponent(str);
    },

    /***
     * @method escapeHTML()
     * @returns String
     * @short Converts HTML characters to their entity equivalents.
     *
     * @example
     *
     *   '<p>some text</p>'.escapeHTML() -> '&lt;p&gt;some text&lt;/p&gt;'
     *   'one & two'.escapeHTML()        -> 'one &amp; two'
     *
     ***/
    'escapeHTML': function(str) {
      return str.replace(HTML_ESCAPE_REG, function(chr) {
        return getOwn(HTMLToEntityMap, chr);
      });
    },

    /***
     * @method unescapeHTML()
     * @returns String
     * @short Restores escaped HTML characters.
     *
     * @example
     *
     *   '&lt;p&gt;some text&lt;/p&gt;'.unescapeHTML() -> '<p>some text</p>'
     *   'one &amp; two'.unescapeHTML()                -> 'one & two'
     *
     ***/
    'unescapeHTML': function(str) {
      return unescapeHTML(str);
    },

    /***
     * @method stripTags([tag] = 'all', [replace])
     * @returns String
     * @short Strips HTML tags from the string.
     * @extra [tag] may be an array of tags or 'all', in which case all tags will
     *        be stripped. [replace] will replace what was stripped, and may be a
     *        string or a function to handle replacements. If this function returns
     *        a string, then it will be used for the replacement. If it returns
     *        `undefined`, the tags will be stripped normally.
     *
     * @callback tagReplaceFn
     *
     *   tag     The tag name.
     *   inner   The tag content.
     *   attr    The attributes on the tag, if any, as a string.
     *   outer   The entire matched tag string.
     *
     * @example
     *
     *   '<p>just <b>some</b> text</p>'.stripTags()    -> 'just some text'
     *   '<p>just <b>some</b> text</p>'.stripTags('p') -> 'just <b>some</b> text'
     *   '<p>hi!</p>'.stripTags('p', function(all, content) {
     *     return '|';
     *   }); -> '|hi!|'
     *
     * @param {string} tag
     * @param {string|tagReplaceFn} replace
     * @callbackParam {string} tag
     * @callbackParam {string} inner
     * @callbackParam {string} attr
     * @callbackParam {string} outer
     * @callbackReturns {string} tagReplaceFn
     *
     ***/
    'stripTags': function(str, tag, replace) {
      return replaceTags(str, tag, replace, true);
    },

    /***
     * @method removeTags([tag] = 'all', [replace])
     * @returns String
     * @short Removes HTML tags and their contents from the string.
     * @extra [tag] may be an array of tags or 'all', in which case all tags will
     *        be removed. [replace] will replace what was removed, and may be a
     *        string or a function to handle replacements. If this function returns
     *        a string, then it will be used for the replacement. If it returns
     *        `undefined`, the tags will be removed normally.
     *
     * @callback tagReplaceFn
     *
     *   tag     The tag name.
     *   inner   The tag content.
     *   attr    The attributes on the tag, if any, as a string.
     *   outer   The entire matched tag string.
     *
     * @example
     *
     *   '<p>just <b>some</b> text</p>'.removeTags()    -> ''
     *   '<p>just <b>some</b> text</p>'.removeTags('b') -> '<p>just text</p>'
     *   '<p>hi!</p>'.removeTags('p', function(all, content) {
     *     return 'bye!';
     *   }); -> 'bye!'
     *
     * @param {string} tag
     * @param {string|tagReplaceFn} replace
     * @callbackParam {string} tag
     * @callbackParam {string} inner
     * @callbackParam {string} attr
     * @callbackParam {string} outer
     * @callbackReturns {string} tagReplaceFn
     *
     ***/
    'removeTags': function(str, tag, replace) {
      return replaceTags(str, tag, replace, false);
    },

    /***
     * @method encodeBase64()
     * @returns String
     * @short Encodes the string into base64 encoding.
     * @extra This method wraps native methods when available, and uses a custom
     *        implementation when not available. It can also handle Unicode
     *        string encodings.
     *
     * @example
     *
     *   'gonna get encoded!'.encodeBase64()  -> 'Z29ubmEgZ2V0IGVuY29kZWQh'
     *   'http://twitter.com/'.encodeBase64() -> 'aHR0cDovL3R3aXR0ZXIuY29tLw=='
     *
     ***/
    'encodeBase64': function(str) {
      return encodeBase64(str);
    },

    /***
     * @method decodeBase64()
     * @returns String
     * @short Decodes the string from base64 encoding.
     * @extra This method wraps native methods when available, and uses a custom
     *        implementation when not available. It can also handle Unicode string
     *        encodings.
     *
     * @example
     *
     *   'aHR0cDovL3R3aXR0ZXIuY29tLw=='.decodeBase64() -> 'http://twitter.com/'
     *   'anVzdCBnb3QgZGVjb2RlZA=='.decodeBase64()     -> 'just got decoded!'
     *
     ***/
    'decodeBase64': function(str) {
      return decodeBase64(str);
    },

    /***
     * @method forEach([search], [callback])
     * @returns Array
     * @short Runs callback [fn] against every character in the string, or every
     *        every occurence of [search] if it is provided.
     * @extra Returns an array of matches. [search] may be either a string or
     *        regex, and defaults to every character in the string. If [fn]
     *        returns false at any time it will break out of the loop.
     *
     * @callback stringEachFn
     *
     *   match  The current match.
     *   i      The current index.
     *   arr    An array of all matches.
     *
     * @example
     *
     *   'jumpy'.forEach(log)     -> ['j','u','m','p','y']
     *   'jumpy'.forEach(/[r-z]/) -> ['u','y']
     *   'jumpy'.forEach(/mp/)    -> ['mp']
     *   'jumpy'.forEach(/[r-z]/, function(m) {
     *     // Called twice: "u", "y"
     *   });
     *
     * @signature forEach(callback)
     * @param {string|RegExp} [search]
     * @param {stringEachFn} [callback]
     * @callbackParam {string} match
     * @callbackParam {number} i
     * @callbackParam {Array<string>} arr
     *
     ***/
    'forEach': function(str, search, fn) {
      return stringEach(str, search, fn);
    },

    /***
     * @method chars([callback])
     * @returns Array
     * @short Runs [fn] against each character in the string, and returns an array.
     *
     * @callback eachCharFn
     *
     *   char  The current character.
     *   i     The current index.
     *   arr   An array of all characters.
     *
     * @example
     *
     *   'jumpy'.chars() -> ['j','u','m','p','y']
     *   'jumpy'.chars(function(c) {
     *     // Called 5 times: "j","u","m","p","y"
     *   });
     *
     * @param {eachCharFn} [callback]
     * @callbackParam {string} char
     * @callbackParam {number} i
     * @callbackParam {Array<string>} arr
     *
     ***/
    'chars': function(str, search, fn) {
      return stringEach(str, search, fn);
    },

    /***
     * @method words([callback])
     * @returns Array
     * @short Runs [fn] against each word in the string, and returns an array.
     * @extra A "word" is defined as any sequence of non-whitespace characters.
     *
     * @callback eachWordFn
     *
     *   word  The current word.
     *   i     The current index.
     *   arr   An array of all words.
     *
     * @example
     *
     *   'broken wear'.words() -> ['broken','wear']
     *   'broken wear'.words(function(w) {
     *     // Called twice: "broken", "wear"
     *   });
     *
     * @param {eachWordFn} [callback]
     * @callbackParam {string} word
     * @callbackParam {number} i
     * @callbackParam {Array<string>} arr
     *
     ***/
    'words': function(str, fn) {
      return stringEach(trim(str), /\S+/g, fn);
    },

    /***
     * @method lines([callback])
     * @returns Array
     * @short Runs [fn] against each line in the string, and returns an array.
     *
     * @callback eachLineFn
     *
     *   line  The current line.
     *   i     The current index.
     *   arr   An array of all lines.
     *
     * @example
     *
     *   lineText.lines() -> array of lines
     *   lineText.lines(function(l) {
     *     // Called once per line
     *   });
     *
     * @param {eachLineFn} [callback]
     * @callbackParam {string} line
     * @callbackParam {number} i
     * @callbackParam {Array<string>} arr
     *
     ***/
    'lines': function(str, fn) {
      return stringEach(trim(str), /^.*$/gm, fn);
    },

    /***
     * @method codes([callback])
     * @returns Array
     * @short Runs callback [fn] against each character code in the string.
     *        Returns an array of character codes.
     *
     * @callback eachCodeFn
     *
     *   code  The current character code.
     *   i     The current index.
     *   str   The string being operated on.
     *
     * @example
     *
     *   'jumpy'.codes() -> [106,117,109,112,121]
     *   'jumpy'.codes(function(c) {
     *     // Called 5 times: 106, 117, 109, 112, 121
     *   });
     *
     * @param {eachCodeFn} [callback]
     * @callbackParam {number} code
     * @callbackParam {number} i
     * @callbackParam {string} str
     *
     ***/
    'codes': function(str, fn) {
      return stringCodes(str, fn);
    },

    /***
     * @method shift(n)
     * @returns Array
     * @short Shifts each character in the string `n` places in the character map.
     *
     * @example
     *
     *   'a'.shift(1)  -> 'b'
     *   'ク'.shift(1) -> 'グ'
     *
     * @param {number} n
     *
     ***/
    'shift': function(str, n) {
      var result = '';
      n = n || 0;
      stringCodes(str, function(c) {
        result += chr(c + n);
      });
      return result;
    },

    /***
     * @method isBlank()
     * @returns Boolean
     * @short Returns true if the string has length 0 or contains only whitespace.
     *
     * @example
     *
     *   ''.isBlank()      -> true
     *   '   '.isBlank()   -> true
     *   'noway'.isBlank() -> false
     *
     ***/
    'isBlank': function(str) {
      return trim(str).length === 0;
    },

    /***
     * @method isEmpty()
     * @returns Boolean
     * @short Returns true if the string has length 0.
     *
     * @example
     *
     *   ''.isEmpty()  -> true
     *   'a'.isBlank() -> false
     *   ' '.isBlank() -> false
     *
     ***/
    'isEmpty': function(str) {
      return str.length === 0;
    },

    /***
     * @method insert(str, [index] = length)
     * @returns String
     * @short Adds `str` at [index]. Allows negative values.
     *
     * @example
     *
     *   'dopamine'.insert('e', 3)       -> dopeamine
     *   'spelling eror'.insert('r', -3) -> spelling error
     *
     * @param {string} str
     * @param {number} [index]
     *
     ***/
    'insert': function(str, substr, index) {
      index = isUndefined(index) ? str.length : index;
      return str.slice(0, index) + substr + str.slice(index);
    },

    /***
     * @method remove(f)
     * @returns String
     * @short Removes the first occurrence of `f` in the string.
     * @extra `f` can be a either case-sensitive string or a regex. In either case
     *        only the first match will be removed. To remove multiple occurrences,
     *        use `removeAll`.
     *
     * @example
     *
     *   'schfifty five'.remove('f')      -> 'schifty five'
     *   'schfifty five'.remove(/[a-f]/g) -> 'shfifty five'
     *
     * @param {string|RegExp} f
     *
     ***/
    'remove': function(str, f) {
      return str.replace(f, '');
    },

    /***
     * @method removeAll(f)
     * @returns String
     * @short Removes any occurences of `f` in the string.
     * @extra `f` can be either a case-sensitive string or a regex. In either case
     *        all matches will be removed. To remove only a single occurence, use
     *        `remove`.
     *
     * @example
     *
     *   'schfifty five'.removeAll('f')     -> 'schity ive'
     *   'schfifty five'.removeAll(/[a-f]/) -> 'shity iv'
     *
     * @param {string|RegExp} f
     *
     ***/
    'removeAll': function(str, f) {
      return stringReplaceAll(str, f);
    },

    /***
     * @method reverse()
     * @returns String
     * @short Reverses the string.
     *
     * @example
     *
     *   'jumpy'.reverse()        -> 'ypmuj'
     *   'lucky charms'.reverse() -> 'smrahc ykcul'
     *
     ***/
    'reverse': function(str) {
      return reverseString(str);
    },

    /***
     * @method compact()
     * @returns String
     * @short Compacts whitespace in the string to a single space and trims the ends.
     *
     * @example
     *
     *   'too \n much \n space'.compact() -> 'too much space'
     *   'enough \n '.compact()           -> 'enought'
     *
     ***/
    'compact': function(str) {
      return trim(str).replace(/([\r\n\s　])+/g, function(match, whitespace) {
        return whitespace === '　' ? whitespace : ' ';
      });
    },

    /***
     * @method from([index] = 0)
     * @returns String
     * @short Returns a section of the string starting from [index].
     *
     * @example
     *
     *   'lucky charms'.from()   -> 'lucky charms'
     *   'lucky charms'.from(7)  -> 'harms'
     *
     * @param {number} [index]
     *
     ***/
    'from': function(str, from) {
      return str.slice(numberOrIndex(str, from, true));
    },

    /***
     * @method to([index] = end)
     * @returns String
     * @short Returns a section of the string ending at [index].
     *
     * @example
     *
     *   'lucky charms'.to()   -> 'lucky charms'
     *   'lucky charms'.to(7)  -> 'lucky ch'
     *
     * @param {number} [index]
     *
     ***/
    'to': function(str, to) {
      if (isUndefined(to)) to = str.length;
      return str.slice(0, numberOrIndex(str, to));
    },

    /***
     * @method dasherize()
     * @returns String
     * @short Converts underscores and camel casing to hypens.
     *
     * @example
     *
     *   'a_farewell_to_arms'.dasherize() -> 'a-farewell-to-arms'
     *   'capsLock'.dasherize()           -> 'caps-lock'
     *
     ***/
    'dasherize': function(str) {
      return stringUnderscore(str).replace(/_/g, '-');
    },

    /***
     * @method underscore()
     * @returns String
     * @short Converts hyphens and camel casing to underscores.
     *
     * @example
     *
     *   'a-farewell-to-arms'.underscore() -> 'a_farewell_to_arms'
     *   'capsLock'.underscore()           -> 'caps_lock'
     *
     ***/
    'underscore': function(str) {
      return stringUnderscore(str);
    },

    /***
     * @method camelize([upper] = true)
     * @returns String
     * @short Converts underscores and hyphens to camel case.
     * @extra If [upper] is true, the string will be UpperCamelCase. If the
     *        inflections module is included, acronyms can also be defined that
     *        will be used when camelizing.
     *
     * @example
     *
     *   'caps_lock'.camelize()              -> 'CapsLock'
     *   'moz-border-radius'.camelize()      -> 'MozBorderRadius'
     *   'moz-border-radius'.camelize(false) -> 'mozBorderRadius'
     *   'http-method'.camelize()            -> 'HTTPMethod'
     *
     * @param {boolean} [upper]
     *
     ***/
    'camelize': function(str, upper) {
      return stringCamelize(str, upper);
    },

    /***
     * @method spacify()
     * @returns String
     * @short Converts camelcase, underscores, and hyphens to spaces.
     *
     * @example
     *
     *   'camelCase'.spacify()                         -> 'camel case'
     *   'an-ugly-string'.spacify()                    -> 'an ugly string'
     *   'oh-no_youDid-not'.spacify().capitalize(true) -> 'something else'
     *
     ***/
    'spacify': function(str) {
      return stringSpacify(str);
    },

    /***
     * @method titleize()
     * @returns String
     * @short Creates a title version of the string.
     * @extra Capitalizes all the words and replaces some characters in the string
     *        to create a nicer looking title. String#titleize is meant for
     *        creating pretty output.
     *
     * @example
     *
     *   'man from the boondocks'.titleize() -> 'Man from the Boondocks'
     *   'x-men: apocalypse'.titleize() -> 'X Men: Apocalypse'
     *   'TheManWithoutAPast'.titleize() -> 'The Man Without a Past'
     *   'raiders_of_the_lost_ark'.titleize() -> 'Raiders of the Lost Ark'
     *
     ***/
    'titleize': function(str) {
      return stringTitleize(str);
    },

    /***
     * @method parameterize()
     * @returns String
     * @short Replaces special characters in a string so that it may be used as
     *        part of a pretty URL.
     *
     * @example
     *
     *   'hell, no!'.parameterize() -> 'hell-no'
     *
     ***/
    'parameterize': function(str, separator) {
      return stringParameterize(str, separator);
    },

    /***
     * @method truncate(length, [from] = 'right', [ellipsis] = '...')
     * @returns String
     * @short Truncates a string.
     * @extra [from] can be `'right'`, `'left'`, or `'middle'`. If the string is
     *        shorter than `length`, [ellipsis] will not be added.
     *
     * @example
     *
     *   'sittin on the dock'.truncate(10)           -> 'sittin on ...'
     *   'sittin on the dock'.truncate(10, 'left')   -> '...n the dock'
     *   'sittin on the dock'.truncate(10, 'middle') -> 'sitti... dock'
     *
     * @param {number} length
     * @param {string} [from]
     * @param {string} [ellipsis]
     *
     ***/
    'truncate': function(str, length, from, ellipsis) {
      return truncateString(str, length, from, ellipsis);
    },

    /***
     * @method truncateOnWord(length, [from] = 'right', [ellipsis] = '...')
     * @returns String
     * @short Truncates a string without splitting up words.
     * @extra [from] can be `'right'`, `'left'`, or `'middle'`. If the string is
     *        shorter than `length`, [ellipsis] will not be added. A "word" is
     *        defined as any sequence of non-whitespace characters.
     *
     * @example
     *
     *   'here we go'.truncateOnWord(5)         -> 'here...'
     *   'here we go'.truncateOnWord(5, 'left') -> '...we go'
     *
     * @param {number} length
     * @param {string} [from]
     * @param {string} [ellipsis]
     *
     ***/
    'truncateOnWord': function(str, length, from, ellipsis) {
      return truncateString(str, length, from, ellipsis, true);
    },

    /***
     * @method pad(num, [padding] = ' ')
     * @returns String
     * @short Pads the string out with [padding] to be exactly `num` characters.
     *
     * @example
     *
     *   'wasabi'.pad(8)      -> ' wasabi '
     *   'wasabi'.pad(8, '-') -> '-wasabi-'
     *
     * @param {number} num
     * @param {string} [padding]
     *
     ***/
    'pad': function(str, num, padding) {
      var half, front, back;
      num   = coercePositiveInteger(num);
      half  = max(0, num - str.length) / 2;
      front = floor(half);
      back  = ceil(half);
      return padString(front, padding) + str + padString(back, padding);
    },

    /***
     * @method padLeft(num, [padding] = ' ')
     * @returns String
     * @short Pads the string out from the left with [padding] to be exactly
     *        `num` characters.
     *
     * @example
     *
     *   'wasabi'.padLeft(8)      -> '  wasabi'
     *   'wasabi'.padLeft(8, '-') -> '--wasabi'
     *
     * @param {number} num
     * @param {string} [padding]
     *
     ***/
    'padLeft': function(str, num, padding) {
      num = coercePositiveInteger(num);
      return padString(max(0, num - str.length), padding) + str;
    },

    /***
     * @method padRight(num, [padding] = ' ')
     * @returns String
     * @short Pads the string out from the right with [padding] to be exactly
     *        `num` characters.
     *
     * @example
     *
     *   'wasabi'.padRight(8)      -> 'wasabi  '
     *   'wasabi'.padRight(8, '-') -> 'wasabi--'
     *
     * @param {number} num
     * @param {string} [padding]
     *
     ***/
    'padRight': function(str, num, padding) {
      num = coercePositiveInteger(num);
      return str + padString(max(0, num - str.length), padding);
    },

    /***
     * @method first([n] = 1)
     * @returns String
     * @short Returns the first [n] characters of the string.
     *
     * @example
     *
     *   'lucky charms'.first()  -> 'l'
     *   'lucky charms'.first(3) -> 'luc'
     *
     * @param {number} [n]
     *
     ***/
    'first': function(str, num) {
      if (isUndefined(num)) num = 1;
      return str.substr(0, num);
    },

    /***
     * @method last([n] = 1)
     * @returns String
     * @short Returns the last [n] characters of the string.
     *
     * @example
     *
     *   'lucky charms'.last()  -> 's'
     *   'lucky charms'.last(3) -> 'rms'
     *
     * @param {number} [n]
     *
     ***/
    'last': function(str, num) {
      if (isUndefined(num)) num = 1;
      var start = str.length - num < 0 ? 0 : str.length - num;
      return str.substr(start);
    },

    /***
     * @method toNumber([base] = 10)
     * @returns Number
     * @short Converts the string into a number.
     * @extra Any value with a "." fill be converted to a floating point value,
     *        otherwise an integer.
     *
     * @example
     *
     *   '153'.toNumber()    -> 153
     *   '12,000'.toNumber() -> 12000
     *   '10px'.toNumber()   -> 10
     *   'ff'.toNumber(16)   -> 255
     *
     * @param {number} [base]
     *
     ***/
    'toNumber': function(str, base) {
      return stringToNumber(str, base);
    },

    /***
     * @method capitalize([lower] = false, [all] = false)
     * @returns String
     * @short Capitalizes the first character of the string.
     * @extra If [lower] is true, the remainder of the string will be downcased.
     *        If [all] is true, all words in the string will be capitalized.
     *
     * @example
     *
     *   'hello'.capitalize()           -> 'Hello'
     *   'HELLO'.capitalize(true)       -> 'Hello'
     *   'hello kitty'.capitalize()     -> 'Hello kitty'
     *   'hEllO kItTy'.capitalize(true, true) -> 'Hello Kitty'
     *
     * @param {boolean} [lower]
     * @param {boolean} [all]
     *
     ***/
    'capitalize': function(str, lower, all) {
      return stringCapitalize(str, lower, all);
    },

    /***
     * @method trimLeft()
     * @returns String
     * @short Removes leading whitespace from the string.
     * @extra Whitespace is defined as line breaks, tabs, and any character in the
     *        "Space, Separator" Unicode category, conforming to the the ES5 `trim`
     *        spec.
     *
     * @example
     *
     *   '   wasabi   '.trimLeft()  -> 'wasabi   '
     *
     ***/
    'trimLeft': function(str) {
      return str.replace(LEFT_TRIM_REG, '');
    },

    /***
     * @method trimRight()
     * @returns String
     * @short Removes trailing whitespace from the string.
     * @extra Whitespace is defined as line breaks, tabs, and any character in the
     *        "Space, Separator" Unicode category, conforming to the the ES5 `trim`
     *        spec.
     *
     * @example
     *
     *   '   wasabi   '.trimRight() -> '   wasabi'
     *
     ***/
    'trimRight': function(str) {
      return str.replace(RIGHT_TRIM_REG, '');
    }

  });

  defineInstanceWithArguments(sugarString, {

    /***
     * @method replaceAll(f, [str1], [str2], ...)
     * @returns String
     * @short Replaces all occurences of `f` with arguments passed.
     * @extra This method is intended to be a quick way to perform multiple string
     *        replacements quickly when the replacement token differs depending on
     *        position. `f` can be either a case-sensitive string or a regex.
     *        In either case all matches will be replaced.
     *
     * @example
     *
     *   '-x -y -z'.replaceAll('-', 1, 2, 3)               -> '1x 2y 3z'
     *   'one and two'.replaceAll(/one|two/, '1st', '2nd') -> '1st and 2nd'
     *
     * @param {string|RegExp} f
     * @param {string} [str1]
     * @param {string} [str2]
     *
     ***/
    'replaceAll': function(str, f, args) {
      return stringReplaceAll(str, f, args);
    },

    /***
     * @method format(obj1, [obj2], ...)
     * @returns String
     * @short Replaces `{}` tokens in the string with arguments or properties.
     * @extra Tokens support `deep properties`. If a single object is passed, its
     *        properties can be accessed by keywords such as `{name}`. If multiple
     *        objects or a non-object are passed, they can be accessed by the
     *        argument position like `{0}`. Literal braces in the string can be
     *        escaped by repeating them.
     *
     * @example
     *
     *   'Welcome, {name}.'.format({ name: 'Bill' }) -> 'Welcome, Bill.'
     *   'You are {0} years old today.'.format(5)    -> 'You are 5 years old today.'
     *   '{0.name} and {1.name}'.format(users)       -> logs first two users' names
     *   '${currencies.usd.balance}'.format(Harry)   -> "$500"
     *   '{{Hello}}'.format('Hello')                 -> "{Hello}"
     *
     * @param {any} [obj1]
     * @param {any} [obj2]
     *
     ***/
    'format': function(str, args) {
      var arg1 = args[0] && args[0].valueOf();
      // Unwrap if a single object is passed in.
      if (args.length === 1 && isObjectType(arg1)) {
        args = arg1;
      }
      return stringFormatMatcher(str, args);
    }

  });

  buildBase64();
  buildEntities();

  /***
   * @module Array
   * @description Array manipulation and traversal, alphanumeric sorting and collation.
   *
   ***/

  var HALF_WIDTH_NINE = 0x39;
  var FULL_WIDTH_NINE = 0xff19;

  // Undefined array elements in < IE8 will not be visited by concat
  // and so will not be copied. This means that non-sparse arrays will
  // become sparse, so detect for this here.
  var HAS_CONCAT_BUG = !('0' in [].concat(undefined).concat());

  var ARRAY_OPTIONS = {
    'sortIgnore':      null,
    'sortNatural':     true,
    'sortIgnoreCase':  true,
    'sortOrder':       getSortOrder(),
    'sortCollate':     collateStrings,
    'sortEquivalents': getSortEquivalents()
  };

  /***
   * @method getOption(name)
   * @returns Mixed
   * @accessor
   * @short Gets an option used interally by Array.
   * @extra Options listed below. Current options are for sorting strings with
   *        `sortBy`.
   *
   * @example
   *
   *   Sugar.Array.getOption('sortNatural')
   *
   * @param {string} name
   *
   ***
   * @method setOption(name, value)
   * @accessor
   * @short Sets an option used interally by Array.
   * @extra Options listed below. Current options are for sorting strings with
   *        `sortBy`. If `value` is `null`, the default value will be restored.
   *
   * @options
   *
   *   sortIgnore        A regex to ignore when sorting. An example usage of this
   *                     option would be to ignore numbers in a list to instead
   *                     sort by the first text that appears. Default is `null`.
   *
   *   sortIgnoreCase    A boolean that ignores case when sorting.
   *                     Default is `true`.
   *
   *   sortNatural       A boolean that turns on natural sorting. "Natural" means
   *                     that numerals like "10" will be sorted after "9" instead
   *                     of after "1". Default is `true`.
   *
   *   sortOrder         A string of characters to use as the base sort order. The
   *                     default is an order natural to most major world languages.
   *
   *   sortEquivalents   A table of equivalent characters used when sorting. The
   *                     default produces a natural sort order for most world
   *                     languages, however can be modified for others. For
   *                     example, setting "ä" and "ö" to `null` in the table would
   *                     produce a Scandanavian sort order. Note that setting this
   *                     option to `null` will restore the default table, but any
   *                     mutations made to that table will persist.
   *
   *   sortCollate       The collation function used when sorting strings. The
   *                     default function produces a natural sort order that can
   *                     be customized with the other "sort" options. Overriding
   *                     the function directly here will also override these
   *                     options.
   *
   * @example
   *
   *   Sugar.Array.setOption('sortIgnore', /^\d+\./)
   *   Sugar.Array.setOption('sortIgnoreCase', false)
   *
   * @signature setOption(options)
   * @param {ArrayOptions} options
   * @param {string} name
   * @param {any} value
   * @option {RegExp} [sortIgnore]
   * @option {boolean} [sortIgnoreCase]
   * @option {boolean} [sortNatural]
   * @option {string} [sortOrder]
   * @option {Object} [sortEquivalents]
   * @option {Function} [sortCollate]
   *
   ***/
  var _arrayOptions = defineOptionsAccessor(sugarArray, ARRAY_OPTIONS);


  function setArrayChainableConstructor() {
    setChainableConstructor(sugarArray, arrayCreate);
  }

  function isArrayOrInherited(obj) {
    return obj && obj.constructor && isArray(obj.constructor.prototype);
  }

  function arrayCreate(obj, clone) {
    var arr;
    if (isArrayOrInherited(obj)) {
      arr = clone ? arrayClone(obj) : obj;
    } else if (isObjectType(obj) || isString(obj)) {
      arr = Array.from(obj);
    } else if (isDefined(obj)) {
      arr = [obj];
    }
    return arr || [];
  }

  function arrayClone(arr) {
    var clone = new Array(arr.length);
    forEach(arr, function(el, i) {
      clone[i] = el;
    });
    return clone;
  }

  function arrayConcat(arr1, arr2) {
    if (HAS_CONCAT_BUG) {
      return arraySafeConcat(arr1, arr2);
    }
    return arr1.concat(arr2);
  }

  // Avoids issues with [undefined] in < IE9
  function arrayWrap(obj) {
    var arr = [];
    arr.push(obj);
    return arr;
  }

  // Avoids issues with concat in < IE8
  function arraySafeConcat(arr, arg) {
    var result = arrayClone(arr), len = result.length, arr2;
    arr2 = isArray(arg) ? arg : [arg];
    result.length += arr2.length;
    forEach(arr2, function(el, i) {
      result[len + i] = el;
    });
    return result;
  }


  function arrayAppend(arr, el, index) {
    var spliceArgs;
    index = +index;
    if (isNaN(index)) {
      index = arr.length;
    }
    spliceArgs = [index, 0];
    if (isDefined(el)) {
      spliceArgs = spliceArgs.concat(el);
    }
    arr.splice.apply(arr, spliceArgs);
    return arr;
  }

  function arrayRemove(arr, f) {
    var matcher = getMatcher(f), i = 0;
    while(i < arr.length) {
      if (matcher(arr[i], i, arr)) {
        arr.splice(i, 1);
      } else {
        i++;
      }
    }
    return arr;
  }

  function arrayExclude(arr, f) {
    var result = [], matcher = getMatcher(f);
    for (var i = 0; i < arr.length; i++) {
      if (!matcher(arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }
    return result;
  }

  function arrayUnique(arr, map) {
    var result = [], obj = {}, refs = [];
    forEach(arr, function(el, i) {
      var transformed = map ? mapWithShortcuts(el, map, arr, [el, i, arr]) : el;
      var key = serializeInternal(transformed, refs);
      if (!hasOwn(obj, key)) {
        result.push(el);
        obj[key] = true;
      }
    });
    return result;
  }

  function arrayFlatten(arr, level, current) {
    var result = [];
    level = level || Infinity;
    current = current || 0;
    forEach(arr, function(el) {
      if (isArray(el) && current < level) {
        result = result.concat(arrayFlatten(el, level, current + 1));
      } else {
        result.push(el);
      }
    });
    return result;
  }

  function arrayCompact(arr, all) {
    return filter(arr, function(el) {
      return el || (!all && el != null && el.valueOf() === el.valueOf());
    });
  }

  function arrayShuffle(arr) {
    arr = arrayClone(arr);
    var i = arr.length, j, x;
    while(i) {
      j = (Math.random() * i) | 0;
      x = arr[--i];
      arr[i] = arr[j];
      arr[j] = x;
    }
    return arr;
  }

  function arrayGroupBy(arr, map, fn) {
    var result = {}, key;
    forEach(arr, function(el, i) {
      key = mapWithShortcuts(el, map, arr, [el, i, arr]);
      if (!hasOwn(result, key)) {
        result[key] = [];
      }
      result[key].push(el);
    });
    if (fn) {
      forEachProperty(result, fn);
    }
    return result;
  }

  function arrayIntersectOrSubtract(arr1, arr2, subtract) {
    var result = [], obj = {}, refs = [];
    if (!isArray(arr2)) {
      arr2 = arrayWrap(arr2);
    }
    forEach(arr2, function(el) {
      obj[serializeInternal(el, refs)] = true;
    });
    forEach(arr1, function(el) {
      var key = serializeInternal(el, refs);
      if (hasOwn(obj, key) !== subtract) {
        delete obj[key];
        result.push(el);
      }
    });
    return result;
  }

  // Collation helpers

  function compareValue(aVal, bVal) {
    var cmp, i, collate;
    if (isString(aVal) && isString(bVal)) {
      collate = _arrayOptions('sortCollate');
      return collate(aVal, bVal);
    } else if (isArray(aVal) && isArray(bVal)) {
      if (aVal.length < bVal.length) {
        return -1;
      } else if (aVal.length > bVal.length) {
        return 1;
      } else {
        for(i = 0; i < aVal.length; i++) {
          cmp = compareValue(aVal[i], bVal[i]);
          if (cmp !== 0) {
            return cmp;
          }
        }
        return 0;
      }
    }
    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
  }

  function codeIsNumeral(code) {
    return (code >= HALF_WIDTH_ZERO && code <= HALF_WIDTH_NINE) ||
           (code >= FULL_WIDTH_ZERO && code <= FULL_WIDTH_NINE);
  }

  function collateStrings(a, b) {
    var aValue, bValue, aChar, bChar, aEquiv, bEquiv, index = 0, tiebreaker = 0;

    var sortOrder       = _arrayOptions('sortOrder');
    var sortIgnore      = _arrayOptions('sortIgnore');
    var sortNatural     = _arrayOptions('sortNatural');
    var sortIgnoreCase  = _arrayOptions('sortIgnoreCase');
    var sortEquivalents = _arrayOptions('sortEquivalents');

    a = getCollationReadyString(a, sortIgnore, sortIgnoreCase);
    b = getCollationReadyString(b, sortIgnore, sortIgnoreCase);

    do {

      aChar  = getCollationCharacter(a, index, sortEquivalents);
      bChar  = getCollationCharacter(b, index, sortEquivalents);
      aValue = getSortOrderIndex(aChar, sortOrder);
      bValue = getSortOrderIndex(bChar, sortOrder);

      if (aValue === -1 || bValue === -1) {
        aValue = a.charCodeAt(index) || null;
        bValue = b.charCodeAt(index) || null;
        if (sortNatural && codeIsNumeral(aValue) && codeIsNumeral(bValue)) {
          aValue = stringToNumber(a.slice(index));
          bValue = stringToNumber(b.slice(index));
        }
      } else {
        aEquiv = aChar !== a.charAt(index);
        bEquiv = bChar !== b.charAt(index);
        if (aEquiv !== bEquiv && tiebreaker === 0) {
          tiebreaker = aEquiv - bEquiv;
        }
      }
      index += 1;
    } while(aValue != null && bValue != null && aValue === bValue);
    if (aValue === bValue) return tiebreaker;
    return aValue - bValue;
  }

  function getCollationReadyString(str, sortIgnore, sortIgnoreCase) {
    if (!isString(str)) str = String(str);
    if (sortIgnoreCase) {
      str = str.toLowerCase();
    }
    if (sortIgnore) {
      str = str.replace(sortIgnore, '');
    }
    return str;
  }

  function getCollationCharacter(str, index, sortEquivalents) {
    var chr = str.charAt(index);
    return getOwn(sortEquivalents, chr) || chr;
  }

  function getSortOrderIndex(chr, sortOrder) {
    if (!chr) {
      return null;
    } else {
      return sortOrder.indexOf(chr);
    }
  }

  function getSortOrder() {
    var order = 'AÁÀÂÃĄBCĆČÇDĎÐEÉÈĚÊËĘFGĞHıIÍÌİÎÏJKLŁMNŃŇÑOÓÒÔPQRŘSŚŠŞTŤUÚÙŮÛÜVWXYÝZŹŻŽÞÆŒØÕÅÄÖ';
    return map(order.split(''), function(str) {
      return str + str.toLowerCase();
    }).join('');
  }

  function getSortEquivalents() {
    var equivalents = {};
    forEach(spaceSplit('AÁÀÂÃÄ CÇ EÉÈÊË IÍÌİÎÏ OÓÒÔÕÖ Sß UÚÙÛÜ'), function(set) {
      var first = set.charAt(0);
      forEach(set.slice(1).split(''), function(chr) {
        equivalents[chr] = first;
        equivalents[chr.toLowerCase()] = first.toLowerCase();
      });
    });
    return equivalents;
  }

  defineStatic(sugarArray, {

    /***
     *
     * @method create([obj], [clone] = false)
     * @returns Array
     * @static
     * @short Creates an array from an unknown object.
     * @extra This method is similar to native `Array.from` but is faster when
     *        `obj` is already an array. When [clone] is true, the array will be
     *        shallow cloned. Additionally, it will not fail on `undefined`,
     *        `null`, or numbers, producing an empty array in the case of
     *        `undefined` and wrapping `obj` otherwise.
     *
     * @example
     *
     *   Array.create()          -> []
     *   Array.create(8)         -> [8]
     *   Array.create('abc')     -> ['a','b','c']
     *   Array.create([1,2,3])   -> [1, 2, 3]
     *   Array.create(undefined) -> []
     *
     * @param {number|ArrayLike<T>} [obj]
     * @param {boolean} [clone]
     *
     ***/
    'create': function(obj, clone) {
      return arrayCreate(obj, clone);
    },

    /***
     *
     * @method construct(n, map)
     * @returns Array
     * @static
     * @short Constructs an array of `n` length from the values of `map`.
     * @extra This function is essentially a shortcut for using `Array.from` with
     *        `new Array(n)`.
     *
     * @callback indexMapFn
     *
     *   i   The index of the current iteration.
     *
     * @example
     *
     *   Array.construct(4, function(i) {
     *     return i * i;
     *   }); -> [0, 1, 4]
     *
     * @param {number} n
     * @param {indexMapFn} map
     * @callbackParam {number} i
     * @callbackReturns {any} indexMapFn
     *
     ***/
    'construct': function(n, fn) {
      n = coercePositiveInteger(n);
      return Array.from(new Array(n), function(el, i) {
        return fn && fn(i);
      });
    }

  });

  defineInstance(sugarArray, {

    /***
     * @method isEmpty()
     * @returns Boolean
     * @short Returns true if the array has a length of zero.
     *
     * @example
     *
     *   [].isEmpty()    -> true
     *   ['a'].isEmpty() -> false
     *
     ***/
    'isEmpty': function(arr) {
      return arr.length === 0;
    },

    /***
     * @method isEqual(arr)
     * @returns Boolean
     * @short Returns true if the array is equal to `arr`.
     * @extra Objects in the array are considered equal if they are not obserably
     *        distinguishable. This method is an instance alias for
     *        `Object.isEqual()`.
     *
     * @example
     *
     *   ['a','b'].isEqual(['a','b']) -> true
     *   ['a','b'].isEqual(['a','c']) -> false
     *   [{a:'a'}].isEqual([{a:'a'}]) -> true
     *   [5].isEqual([Object(5)])     -> false
     *
     * @param {Array} arr
     *
     ***/
    'isEqual': function(a, b) {
      return isEqual(a, b);
    },

    /***
     * @method clone()
     * @returns Array
     * @short Creates a shallow clone of the array.
     *
     * @example
     *
     *   [1,2,3].clone() -> [1,2,3]
     *
     ***/
    'clone': function(arr) {
      return arrayClone(arr);
    },

    /***
     * @method at(index, [loop] = false)
     * @returns ArrayElement
     * @short Gets the element(s) at `index`.
     * @extra When [loop] is true, overshooting the end of the array will begin
     *        counting from the other end. `index` may be negative. If `index` is
     *        an array, multiple elements will be returned.
     *
     * @example
     *
     *   [1,2,3].at(0)       -> 1
     *   [1,2,3].at(2)       -> 3
     *   [1,2,3].at(4)       -> undefined
     *   [1,2,3].at(4, true) -> 2
     *   [1,2,3].at(-1)      -> 3
     *   [1,2,3].at([0, 1])  -> [1, 2]
     *
     * @param {number|number[]} index
     * @param {boolean} [loop]
     *
     ***/
    'at': function(arr, index, loop) {
      return getEntriesForIndexes(arr, index, loop);
    },

    /***
     * @method add(item, [index])
     * @returns Array
     * @short Adds `item` to the array and returns the result as a new array.
     * @extra If `item` is also an array, it will be concatenated instead of
     *        inserted. [index] will control where `item` is added. Use `append`
     *        to modify the original array.
     *
     * @example
     *
     *   [1,2,3,4].add(5)       -> [1,2,3,4,5]
     *   [1,2,3,4].add(8, 1)    -> [1,8,2,3,4]
     *   [1,2,3,4].add([5,6,7]) -> [1,2,3,4,5,6,7]
     *
     * @param {ArrayElement|Array} item
     * @param {number} [index]
     *
     ***/
    'add': function(arr, item, index) {
      return arrayAppend(arrayClone(arr), item, index);
    },

    /***
     * @method subtract(item)
     * @returns Array
     * @short Subtracts `item` from the array and returns the result as a new array.
     * @extra If `item` is also an array, all elements in it will be removed. In
     *        addition to primitives, this method will also deep-check objects for
     *        equality.
     *
     * @example
     *
     *   [1,3,5].subtract([5,7,9])     -> [1,3]
     *   ['a','b'].subtract(['b','c']) -> ['a']
     *   [1,2,3].subtract(2)           -> [1,3]
     *
     * @param {ArrayElement|Array} item
     *
     ***/
    'subtract': function(arr, item) {
      return arrayIntersectOrSubtract(arr, item, true);
    },

    /***
     * @method append(item, [index])
     * @returns Array
     * @short Appends `item` to the array.
     * @extra If `item` is also an array, it will be concatenated instead of
     *        inserted. This method modifies the array! Use `add` to create a new
     *        array. Additionally, `insert` is provided as an alias that reads
     *        better when using an index.
     *
     * @example
     *
     *   [1,2,3,4].append(5)       -> [1,2,3,4,5]
     *   [1,2,3,4].append([5,6,7]) -> [1,2,3,4,5,6,7]
     *   [1,2,3,4].append(8, 1)    -> [1,8,2,3,4]
     *
     * @param {ArrayElement|Array} item
     * @param {number} index
     *
     ***/
    'append': function(arr, item, index) {
      return arrayAppend(arr, item, index);
    },

    /***
     * @method removeAt(start, [end])
     * @returns Array
     * @short Removes element at `start`. If [end] is specified, removes the range
     *        between `start` and [end]. This method will modify the array!
     *
     * @example
     *
     *   ['a','b','c'].removeAt(0) -> ['b','c']
     *   [1,2,3,4].removeAt(1, 2)  -> [1, 4]
     *
     * @param {number} start
     * @param {number} [end]
     *
     ***/
    'removeAt': function(arr, start, end) {
      if (isUndefined(start)) return arr;
      if (isUndefined(end))   end = start;
      arr.splice(start, end - start + 1);
      return arr;
    },

    /***
     * @method unique([map])
     * @returns Array
     * @short Removes all duplicate elements in the array.
     * @extra [map] may be a function returning the value to be uniqued or a
     *        string acting as a shortcut. This is most commonly used when you
     *        only need to check a single field that can ensure the object's
     *        uniqueness (such as an `id` field). If [map] is not passed, then
     *        objects will be deep checked for equality. Supports
     *        `deep properties`.
     *
     * @callback mapFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,2,3].unique()            -> [1,2,3]
     *   [{a:'a'},{a:'a'}].unique()    -> [{a:'a'}]
     *
     *   users.unique(function(user) {
     *     return user.id;
     *   }); -> users array uniqued by id
     *
     *   users.unique('id')            -> users array uniqued by id
     *
     * @param {string|mapFn} map
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {NewArrayElement} mapFn
     *
     ***/
    'unique': function(arr, map) {
      return arrayUnique(arr, map);
    },

    /***
     * @method flatten([limit] = Infinity)
     * @returns Array
     * @short Returns a flattened, one-dimensional copy of the array.
     * @extra You can optionally specify a [limit], which will only flatten to
     *        that depth.
     *
     * @example
     *
     *   [[1], 2, [3]].flatten() -> [1,2,3]
     *   [[1],[],2,3].flatten()  -> [1,2,3]
     *
     * @param {number} [limit]
     *
     ***/
    'flatten': function(arr, limit) {
      return arrayFlatten(arr, limit);
    },

    /***
     * @method first([num] = 1)
     * @returns Mixed
     * @short Returns the first element(s) in the array.
     * @extra When `num` is passed, returns the first `num` elements in the array.
     *
     * @example
     *
     *   [1,2,3].first()  -> 1
     *   [1,2,3].first(2) -> [1,2]
     *
     * @param {number} [num]
     *
     ***/
    'first': function(arr, num) {
      if (isUndefined(num)) return arr[0];
      if (num < 0) num = 0;
      return arr.slice(0, num);
    },

    /***
     * @method last([num] = 1)
     * @returns Mixed
     * @short Returns the last element(s) in the array.
     * @extra When `num` is passed, returns the last `num` elements in the array.
     *
     * @example
     *
     *   [1,2,3].last()  -> 3
     *   [1,2,3].last(2) -> [2,3]
     *
     * @param {number} [num]
     *
     ***/
    'last': function(arr, num) {
      if (isUndefined(num)) return arr[arr.length - 1];
      var start = arr.length - num < 0 ? 0 : arr.length - num;
      return arr.slice(start);
    },

    /***
     * @method from(index)
     * @returns Array
     * @short Returns a slice of the array from `index`.
     *
     * @example
     *
     *   ['a','b','c'].from(1) -> ['b','c']
     *   ['a','b','c'].from(2) -> ['c']
     *
     * @param {number} [index]
     *
     ***/
    'from': function(arr, num) {
      return arr.slice(num);
    },

    /***
     * @method to(index)
     * @returns Array
     * @short Returns a slice of the array up to `index`.
     *
     * @example
     *
     *   ['a','b','c'].to(1) -> ['a']
     *   ['a','b','c'].to(2) -> ['a','b']
     *
     * @param {number} [index]
     *
     ***/
    'to': function(arr, num) {
      if (isUndefined(num)) num = arr.length;
      return arr.slice(0, num);
    },

    /***
     * @method compact([all] = false)
     * @returns Array
     * @short Removes all instances of `undefined`, `null`, and `NaN` from the array.
     * @extra If [all] is `true`, all "falsy" elements will be removed. This
     *        includes empty strings, `0`, and `false`.
     *
     * @example
     *
     *   [1,null,2,undefined,3].compact() -> [1,2,3]
     *   [1,'',2,false,3].compact()       -> [1,'',2,false,3]
     *   [1,'',2,false,3].compact(true)   -> [1,2,3]
     *   [null, [null, 'bye']].compact()  -> ['hi', [null, 'bye']]
     *
     * @param {boolean} [all]
     *
     ***/
    'compact': function(arr, all) {
      return arrayCompact(arr, all);
    },

    /***
     * @method groupBy(map, [fn])
     * @returns Object
     * @short Groups the array by `map`.
     * @extra Will return an object whose keys are the mapped from `map`, which
     *        may be a mapping function, or a string acting as a shortcut. `map`
     *        supports `deep properties`. Optionally calls [fn] for each group.
     *
     * @callback mapFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @callback groupFn
     *
     *   arr  The current group as an array.
     *   key  The unique key of the current group.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   ['a','aa','aaa'].groupBy('length') -> { 1: ['a'], 2: ['aa'], 3: ['aaa'] }
     *
     *   users.groupBy(function(n) {
     *     return n.age;
     *   }); -> users array grouped by age
     *
     *   users.groupBy('age', function(age, users) {
     *     // iterates each grouping
     *   });
     *
     * @param {string|mapFn} map
     * @param {groupFn} fn
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {NewArrayElement} mapFn
     *
     ***/
    'groupBy': function(arr, map, fn) {
      return arrayGroupBy(arr, map, fn);
    },

    /***
     * @method inGroups(num, [padding])
     * @returns Array
     * @short Groups the array into `num` arrays.
     * @extra If specified, [padding] will be added to the last array to be of
     *        equal length.
     *
     * @example
     *
     *   [1,2,3,4,5,6,7].inGroups(3)    -> [[1,2,3],[4,5,6],[7]]
     *   [1,2,3,4,5,6,7].inGroups(3, 0) -> [[1,2,3],[4,5,6],[7,0,0]]
     *
     * @param {number} num
     * @param {any} [padding]
     *
     ***/
    'inGroups': function(arr, num, padding) {
      var pad = isDefined(padding);
      var result = new Array(num);
      var divisor = ceil(arr.length / num);
      simpleRepeat(num, function(i) {
        var index = i * divisor;
        var group = arr.slice(index, index + divisor);
        if (pad && group.length < divisor) {
          simpleRepeat(divisor - group.length, function() {
            group.push(padding);
          });
        }
        result[i] = group;
      });
      return result;
    },

    /***
     * @method inGroupsOf(num, [padding] = null)
     * @returns Array
     * @short Groups the array into arrays of `num` elements each.
     * @extra [padding] will be added to the last array to be of equal length.
     *
     * @example
     *
     *   [1,2,3,4,5,6,7].inGroupsOf(4)    -> [ [1,2,3,4], [5,6,7] ]
     *   [1,2,3,4,5,6,7].inGroupsOf(4, 0) -> [ [1,2,3,4], [5,6,7,0] ]
     *
     * @param {number} num
     * @param {any} [padding]
     *
     ***/
    'inGroupsOf': function(arr, num, padding) {
      var result = [], len = arr.length, group;
      if (len === 0 || num === 0) return arr;
      if (isUndefined(num)) num = 1;
      if (isUndefined(padding)) padding = null;
      simpleRepeat(ceil(len / num), function(i) {
        group = arr.slice(num * i, num * i + num);
        while(group.length < num) {
          group.push(padding);
        }
        result.push(group);
      });
      return result;
    },

    /***
     * @method shuffle()
     * @returns Array
     * @short Returns a copy of the array with the elements randomized.
     * @extra Uses Fisher-Yates algorithm.
     *
     * @example
     *
     *   [1,2,3,4].shuffle()  -> [?,?,?,?]
     *
     ***/
    'shuffle': function(arr) {
      return arrayShuffle(arr);
    },

    /***
     * @method sample([num] = 1, [remove] = false)
     * @returns Mixed
     * @short Returns a random element from the array.
     * @extra If [num] is passed, will return an array of [num] elements. If
     *        [remove] is true, sampled elements will also be removed from the
     *        array. [remove] can also be passed in place of [num].
     *
     * @example
     *
     *   [1,2,3,4,5].sample()  -> // Random element
     *   [1,2,3,4,5].sample(1) -> // Array of 1 random element
     *   [1,2,3,4,5].sample(3) -> // Array of 3 random elements
     *
     * @param {number} [num]
     * @param {boolean} [remove]
     *
     ***/
    'sample': function(arr, arg1, arg2) {
      var result = [], num, remove, single;
      if (isBoolean(arg1)) {
        remove = arg1;
      } else {
        num = arg1;
        remove = arg2;
      }
      if (isUndefined(num)) {
        num = 1;
        single = true;
      }
      if (!remove) {
        arr = arrayClone(arr);
      }
      num = min(num, arr.length);
      for (var i = 0, index; i < num; i++) {
        index = trunc(Math.random() * arr.length);
        result.push(arr[index]);
        arr.splice(index, 1);
      }
      return single ? result[0] : result;
    },

    /***
     * @method sortBy([map], [desc] = false)
     * @returns Array
     * @short Enhanced sorting function that will sort the array by `map`.
     * @extra `map` may be a function, a string acting as a shortcut, an array
     *        (comparison by multiple values), or blank (direct comparison of
     *        array values). `map` supports `deep properties`. [desc] will sort
     *        the array in descending order. When the field being sorted on is
     *        a string, the resulting order will be determined by an internal
     *        collation algorithm that is optimized for major Western languages,
     *        but can be customized using sorting accessors such as `sortIgnore`.
     *        This method will modify the array!
     *
     * @callback sortMapFn
     *
     *   el   An array element.
     *
     * @example
     *
     *   ['world','a','new'].sortBy('length')       -> ['a','new','world']
     *   ['world','a','new'].sortBy('length', true) -> ['world','new','a']
     *   users.sortBy(function(n) {
     *     return n.age;
     *   }); -> users array sorted by age
     *   users.sortBy('age') -> users array sorted by age
     *
     * @param {string|sortMapFn} [map]
     * @param {boolean} [desc]
     * @callbackParam {ArrayElement} el
     * @callbackReturns {NewArrayElement} sortMapFn
     *
     ***/
    'sortBy': function(arr, map, desc) {
      arr.sort(function(a, b) {
        var aProperty = mapWithShortcuts(a, map, arr, [a]);
        var bProperty = mapWithShortcuts(b, map, arr, [b]);
        return compareValue(aProperty, bProperty) * (desc ? -1 : 1);
      });
      return arr;
    },

    /***
     * @method remove(search)
     * @returns Array
     * @short Removes any element in the array that matches `search`.
     * @extra This method will modify the array! Use `exclude` for a
     *        non-destructive alias. This method implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,3].remove(3)         -> [1,2]
     *   ['a','b','c'].remove(/b/) -> ['a','c']
     *   [{a:1},{b:2}].remove(function(n) {
     *     return n['a'] == 1;
     *   }); -> [{b:2}]
     *
     * @param {ArrayElement|searchFn} search
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'remove': function(arr, f) {
      return arrayRemove(arr, f);
    },

    /***
     * @method exclude(search)
     * @returns Array
     * @short Returns a new array with every element that does not match `search`.
     * @extra This method can be thought of as the inverse of `Array#filter`. It
     *        will not modify the original array, Use `remove` to modify the
     *        array in place. Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,3].exclude(3)         -> [1,2]
     *   ['a','b','c'].exclude(/b/) -> ['a','c']
     *   [{a:1},{b:2}].exclude(function(n) {
     *     return n['a'] == 1;
     *   }); -> [{b:2}]
     *
     * @param {ArrayElement|searchFn} search
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'exclude': function(arr, f) {
      return arrayExclude(arr, f);
    },

    /***
     * @method union(arr)
     * @returns Array
     * @short Returns a new array containing elements in both arrays with
     *        duplicates removed.
     * @extra In addition to primitives, this method will also deep-check objects
     *        for equality.
     *
     * @example
     *
     *   [1,3,5].union([5,7,9])     -> [1,3,5,7,9]
     *   ['a','b'].union(['b','c']) -> ['a','b','c']
     *
     * @param {Array} arr
     *
     ***/
    'union': function(arr1, arr2) {
      return arrayUnique(arrayConcat(arr1, arr2));
    },

    /***
     * @method intersect(arr)
     * @returns Array
     * @short Returns a new array containing any elements that both arrays have in
     *        common.
     * @extra In addition to primitives, this method will also deep-check objects
     *        for equality.
     *
     * @example
     *
     *   [1,3,5].intersect([5,7,9])     -> [5]
     *   ['a','b'].intersect(['b','c']) -> ['b']
     *
     * @param {Array} arr
     *
     ***/
    'intersect': function(arr1, arr2) {
      return arrayIntersectOrSubtract(arr1, arr2, false);
    }

  });

  defineInstanceWithArguments(sugarArray, {

    /***
     * @method zip([arr1], [arr2], ...)
     * @returns Array
     * @short Merges multiple arrays together.
     * @extra This method "zips up" smaller arrays into one large whose elements
     *        are "all elements at index 0", "all elements at index 1", etc.
     *        Useful when you have associated data that is split over separated
     *        arrays. If the arrays passed have more elements than the original
     *        array, they will be discarded. If they have fewer elements, the
     *        missing elements will filled with `null`.
     *
     * @example
     *
     *   [1,2,3].zip([4,5,6]) -> [[1,2], [3,4], [5,6]]
     *
     * @param {Array} arr1
     * @param {Array} arr2
     *
     ***/
    'zip': function(arr, args) {
      return map(arr, function(el, i) {
        return [el].concat(map(args, function(k) {
          return (i in k) ? k[i] : null;
        }));
      });
    }

  });

  /***
   * @method insert(item, [index])
   * @returns Array
   * @short Appends `item` to the array at [index].
   * @extra This method is simply a more readable alias for `append` when passing
   *        an index. If `el` is an array it will be joined. This method modifies
   *        the array! Use `add` as a non-destructive alias.
   *
   * @example
   *
   *   [1,3,4,5].insert(2, 1)     -> [1,2,3,4,5]
   *   [1,4,5,6].insert([2,3], 1) -> [1,2,3,4,5,6]
   *
   * @param {ArrayElement|Array} item
   * @param {number} [index]
   *
   ***/
  alias(sugarArray, 'insert', 'append');

  setArrayChainableConstructor();

  /***
   * @module Object
   * @description Object creation, manipulation, comparison, type checking, and more.
   *
   * Much thanks to kangax for his informative aricle about how problems with
   * instanceof and constructor: http://bit.ly/1Qds27W
   *
   ***/

  // Matches bracket-style query strings like user[name]
  var DEEP_QUERY_STRING_REG = /^(.+?)(\[.*\])$/;

  // Matches any character not allowed in a decimal number.
  var NON_DECIMAL_REG = /[^\d.-]/;

  // Native methods for merging by descriptor when available.
  var getOwnPropertyNames      = Object.getOwnPropertyNames;
  var getOwnPropertySymbols    = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Basic Helpers

  function isArguments(obj, className) {
    className = className || classToString(obj);
    // .callee exists on Arguments objects in < IE8
    return hasProperty(obj, 'length') && (className === '[object Arguments]' || !!obj.callee);
  }

  // Query Strings | Creating

  function toQueryStringWithOptions(obj, opts) {
    opts = opts || {};
    if (isUndefined(opts.separator)) {
      opts.separator = '_';
    }
    return toQueryString(obj, opts.deep, opts.transform, opts.prefix || '', opts.separator);
  }

  function toQueryString(obj, deep, transform, prefix, separator) {
    if (isArray(obj)) {
      return collectArrayAsQueryString(obj, deep, transform, prefix, separator);
    } else if (isObjectType(obj) && obj.toString === internalToString) {
      return collectObjectAsQueryString(obj, deep, transform, prefix, separator);
    } else if (prefix) {
      return getURIComponentValue(obj, prefix, transform);
    }
    return '';
  }

  function collectArrayAsQueryString(arr, deep, transform, prefix, separator) {
    var el, qc, key, result = [];
    // Intentionally treating sparse arrays as dense here by avoiding map,
    // otherwise indexes will shift during the process of serialization.
    for (var i = 0, len = arr.length; i < len; i++) {
      el = arr[i];
      key = prefix + (prefix && deep ? '[]' : '');
      if (!key && !isObjectType(el)) {
        // If there is no key, then the values of the array should be
        // considered as null keys, so use them instead;
        qc = sanitizeURIComponent(el);
      } else {
        qc = toQueryString(el, deep, transform, key, separator);
      }
      result.push(qc);
    }
    return result.join('&');
  }

  function collectObjectAsQueryString(obj, deep, transform, prefix, separator) {
    var result = [];
    forEachProperty(obj, function(val, key) {
      var fullKey;
      if (prefix && deep) {
        fullKey = prefix + '[' + key + ']';
      } else if (prefix) {
        fullKey = prefix + separator + key;
      } else {
        fullKey = key;
      }
      result.push(toQueryString(val, deep, transform, fullKey, separator));
    });
    return result.join('&');
  }

  function getURIComponentValue(obj, prefix, transform) {
    var value;
    if (transform) {
      value = transform(obj, prefix);
    } else if (isDate(obj)) {
      value = obj.getTime();
    } else {
      value = obj;
    }
    return sanitizeURIComponent(prefix) + '=' + sanitizeURIComponent(value);
  }

  function sanitizeURIComponent(obj) {
    // undefined, null, and NaN are represented as a blank string,
    // while false and 0 are stringified.
    return !obj && obj !== false && obj !== 0 ? '' : encodeURIComponent(obj);
  }


  // Query Strings | Parsing

  function fromQueryStringWithOptions(obj, opts) {
    var str = String(obj || '').replace(/^.*?\?/, ''), result = {}, auto;
    opts = opts || {};
    if (str) {
      forEach(str.split('&'), function(p) {
        var split = p.split('=');
        var key = decodeURIComponent(split[0]);
        var val = split.length === 2 ? decodeURIComponent(split[1]) : '';
        auto = opts.auto !== false;
        parseQueryComponent(result, key, val, opts.deep, auto, opts.separator, opts.transform);
      });
    }
    return result;
  }

  function parseQueryComponent(obj, key, val, deep, auto, separator, transform) {
    var match;
    if (separator) {
      key = mapQuerySeparatorToKeys(key, separator);
      deep = true;
    }
    if (deep === true && (match = key.match(DEEP_QUERY_STRING_REG))) {
      parseDeepQueryComponent(obj, match, val, deep, auto, separator, transform);
    } else {
      setQueryProperty(obj, key, val, auto, transform);
    }
  }

  function parseDeepQueryComponent(obj, match, val, deep, auto, separator, transform) {
    var key = match[1];
    var inner = match[2].slice(1, -1).split('][');
    forEach(inner, function(k) {
      if (!hasOwn(obj, key)) {
        obj[key] = k ? {} : [];
      }
      obj = getOwn(obj, key);
      key = k ? k : obj.length.toString();
    });
    setQueryProperty(obj, key, val, auto, transform);
  }

  function mapQuerySeparatorToKeys(key, separator) {
    var split = key.split(separator), result = split[0];
    for (var i = 1, len = split.length; i < len; i++) {
      result += '[' + split[i] + ']';
    }
    return result;
  }

  function setQueryProperty(obj, key, val, auto, transform) {
    var fnValue;
    if (transform) {
      fnValue = transform(val, key, obj);
    }
    if (isDefined(fnValue)) {
      val = fnValue;
    } else if (auto) {
      val = getQueryValueAuto(obj, key, val);
    }
    obj[key] = val;
  }

  function getQueryValueAuto(obj, key, val) {
    if (!val) {
      return null;
    } else if (val === 'true') {
      return true;
    } else if (val === 'false') {
      return false;
    }
    var num = +val;
    if (!isNaN(num) && stringIsDecimal(val)) {
      return num;
    }
    var existing = getOwn(obj, key);
    if (val && existing) {
      return isArray(existing) ? existing.concat(val) : [existing, val];
    }
    return val;
  }

  function stringIsDecimal(str) {
    return str !== '' && !NON_DECIMAL_REG.test(str);
  }


  // Object Merging

  function mergeWithOptions(target, source, opts) {
    opts = opts || {};
    return objectMerge(target, source, opts.deep, opts.resolve, opts.hidden, opts.descriptor);
  }

  function defaults(target, sources, opts) {
    opts = opts || {};
    opts.resolve = opts.resolve || false;
    return mergeAll(target, sources, opts);
  }

  function mergeAll(target, sources, opts) {
    if (!isArray(sources)) {
      sources = [sources];
    }
    forEach(sources, function(source) {
      return mergeWithOptions(target, source, opts);
    });
    return target;
  }

  function iterateOverProperties(hidden, obj, fn) {
    if (getOwnPropertyNames && hidden) {
      iterateOverKeys(getOwnPropertyNames, obj, fn, hidden);
    } else {
      forEachProperty(obj, fn);
    }
    if (getOwnPropertySymbols) {
      iterateOverKeys(getOwnPropertySymbols, obj, fn, hidden);
    }
  }

  // "keys" may include symbols
  function iterateOverKeys(getFn, obj, fn, hidden) {
    var keys = getFn(obj), desc;
    for (var i = 0, key; key = keys[i]; i++) {
      desc = getOwnPropertyDescriptor(obj, key);
      if (desc.enumerable || hidden) {
        fn(obj[key], key);
      }
    }
  }

  function mergeByPropertyDescriptor(target, source, prop, sourceVal) {
    var descriptor = getOwnPropertyDescriptor(source, prop);
    if (isDefined(descriptor.value)) {
      descriptor.value = sourceVal;
    }
    defineProperty(target, prop, descriptor);
  }

  function objectMerge(target, source, deep, resolve, hidden, descriptor) {
    var resolveByFunction = isFunction(resolve), resolveConflicts = resolve !== false;

    if (isUndefined(target)) {
      target = getNewObjectForMerge(source);
    } else if (resolveConflicts && isDate(target) && isDate(source)) {
      // A date's timestamp is a property that can only be reached through its
      // methods, so actively set it up front if both are dates.
      target.setTime(source.getTime());
    }

    if (isPrimitive(target)) {
      // Will not merge into a primitive type, so simply override.
      return source;
    }

    // If the source object is a primitive
    // type then coerce it into an object.
    if (isPrimitive(source)) {
      source = coercePrimitiveToObject(source);
    }

    iterateOverProperties(hidden, source, function(val, key) {
      var sourceVal, targetVal, resolved, goDeep, result;

      sourceVal = source[key];

      // We are iterating over properties of the source, so hasOwnProperty on
      // it is guaranteed to always be true. However, the target may happen to
      // have properties in its prototype chain that should not be considered
      // as conflicts.
      targetVal = getOwn(target, key);

      if (resolveByFunction) {
        result = resolve(key, targetVal, sourceVal, target, source);
        if (isUndefined(result)) {
          // Result is undefined so do not merge this property.
          return;
        } else if (isDefined(result) && result !== Sugar) {
          // If the source returns anything except undefined, then the conflict
          // has been resolved, so don't continue traversing into the object. If
          // the returned value is the Sugar global object, then allowing Sugar
          // to resolve the conflict, so continue on.
          sourceVal = result;
          resolved = true;
        }
      } else if (isUndefined(sourceVal)) {
        // Will not merge undefined.
        return;
      }

      // Regex properties are read-only, so intentionally disallowing deep
      // merging for now. Instead merge by reference even if deep.
      goDeep = !resolved && deep && isObjectType(sourceVal) && !isRegExp(sourceVal);

      if (!goDeep && !resolveConflicts && isDefined(targetVal)) {
        return;
      }

      if (goDeep) {
        sourceVal = objectMerge(targetVal, sourceVal, deep, resolve, hidden, descriptor);
      }

      // getOwnPropertyNames is standing in as
      // a test for property descriptor support
      if (getOwnPropertyNames && descriptor) {
        mergeByPropertyDescriptor(target, source, key, sourceVal);
      } else {
        target[key] = sourceVal;
      }

    });
    return target;
  }

  function getNewObjectForMerge(source) {
    var klass = classToString(source);
    // Primitive types, dates, and regexes have no "empty" state. If they exist
    // at all, then they have an associated value. As we are only creating new
    // objects when they don't exist in the target, these values can come alone
    // for the ride when created.
    if (isArray(source, klass)) {
      return [];
    } else if (isPlainObject(source, klass)) {
      return {};
    } else if (isDate(source, klass)) {
      return new Date(source.getTime());
    } else if (isRegExp(source, klass)) {
      return RegExp(source.source, getRegExpFlags(source));
    } else if (isPrimitive(source && source.valueOf())) {
      return source;
    }
    // If the object is not of a known type, then simply merging its
    // properties into a plain object will result in something different
    // (it will not respond to instanceof operator etc). Similarly we don't
    // want to call a constructor here as we can't know for sure what the
    // original constructor was called with (Events etc), so throw an
    // error here instead. Non-standard types can be handled if either they
    // already exist and simply have their properties merged, if the merge
    // is not deep so their references will simply be copied over, or if a
    // resolve function is used to assist the merge.
    throw new TypeError('Must be a basic data type');
  }

  function clone(source, deep) {
    var target = getNewObjectForMerge(source);
    return objectMerge(target, source, deep, true, true, true);
  }


  // Keys/Values

  function objectSize(obj) {
    return getKeysWithObjectCoercion(obj).length;
  }

  function getKeysWithObjectCoercion(obj) {
    return getKeys(coercePrimitiveToObject(obj));
  }

  function getValues(obj) {
    var values = [];
    forEachProperty(obj, function(val) {
      values.push(val);
    });
    return values;
  }

  function tap(obj, arg) {
    var fn = arg;
    if (!isFunction(arg)) {
      fn = function() {
        if (arg) obj[arg]();
      };
    }
    fn.call(obj, obj);
    return obj;
  }

  // Select/Reject

  function objectSelect(obj, f) {
    return selectFromObject(obj, f, true);
  }

  function objectReject(obj, f) {
    return selectFromObject(obj, f, false);
  }

  function selectFromObject(obj, f, select) {
    var match, result = {};
    f = [].concat(f);
    forEachProperty(obj, function(val, key) {
      match = false;
      for (var i = 0; i < f.length; i++) {
        if (matchInObject(f[i], key)) {
          match = true;
        }
      }
      if (match === select) {
        result[key] = val;
      }
    });
    return result;
  }

  function matchInObject(match, key) {
    if (isRegExp(match)) {
      return match.test(key);
    } else if (isObjectType(match)) {
      return key in match;
    } else {
      return key === String(match);
    }
  }

  // Remove/Exclude

  function objectRemove(obj, f) {
    var matcher = getMatcher(f);
    forEachProperty(obj, function(val, key) {
      if (matcher(val, key, obj)) {
        delete obj[key];
      }
    });
    return obj;
  }

  function objectExclude(obj, f) {
    var result = {};
    var matcher = getMatcher(f);
    forEachProperty(obj, function(val, key) {
      if (!matcher(val, key, obj)) {
        result[key] = val;
      }
    });
    return result;
  }

  function objectIntersectOrSubtract(obj1, obj2, subtract) {
    if (!isObjectType(obj1)) {
      return subtract ? obj1 : {};
    }
    obj2 = coercePrimitiveToObject(obj2);
    function resolve(key, val, val1) {
      var exists = key in obj2 && isEqual(val1, obj2[key]);
      if (exists !== subtract) {
        return val1;
      }
    }
    return objectMerge({}, obj1, false, resolve);
  }

  /***
   * @method is[Type]()
   * @returns Boolean
   * @short Returns true if the object is an object of that type.
   *
   * @set
   *   isArray
   *   isBoolean
   *   isDate
   *   isError
   *   isFunction
   *   isMap
   *   isNumber
   *   isRegExp
   *   isSet
   *   isString
   *
   * @example
   *
   *   Object.isArray([3]) -> true
   *   Object.isNumber(3)  -> true
   *   Object.isString(8)  -> false
   *
   ***/
  function buildClassCheckMethods() {
    var checks = [isBoolean, isNumber, isString, isDate, isRegExp, isFunction, isArray, isError, isSet, isMap];
    defineInstanceAndStaticSimilar(sugarObject, NATIVE_TYPES, function(methods, name, i) {
      methods['is' + name] = checks[i];
    });
  }

  defineStatic(sugarObject, {

    /***
     * @method fromQueryString(str, [options])
     * @returns Object
     * @static
     * @short Converts the query string of a URL into an object.
     * @extra Options can be passed with [options] for more control over the result.
     *
     * @options
     *
     *   deep        If the string contains "deep" syntax `foo[]`, this will
     *               be automatically converted to an array. (Default `false`)
     *
     *   auto        If `true`, booleans `"true"` and `"false"`, numbers, and arrays
     *               (repeated keys) will be automatically cast to native
     *               values. (Default `true`)
     *
     *   transform   A function whose return value becomes the final value. If
     *               the function returns `undefined`, then the original value
     *               will be used. This allows the function to intercept only
     *               certain keys or values. (Default `undefined`)
     *
     *   separator   If passed, keys will be split on this string to extract
     *               deep values. (Default `''`)
     *
     * @callback queryStringTransformFn
     *
     *   key   The key component of the query string (before `=`).
     *   val   The value component of the query string (after `=`).
     *   obj   A reference to the object being built.
     *
     * @example
     *
     *   Object.fromQueryString('a=1&b=2')                 -> {a:1,b:2}
     *   Object.fromQueryString('a[]=1&a[]=2',{deep:true}) -> {a:['1','2']}
     *   Object.fromQueryString('a_b=c',{separator:'_'})   -> {a:{b:'c'}}
     *   Object.fromQueryString('id=123', {transform:idToNumber});
     *
     * @param {string} str
     * @param {QueryStringParseOptions} options
     * @callbackParam {string} key
     * @callbackParam {Property} val
     * @callbackParam {Object} obj
     * @callbackReturns {NewProperty} queryStringTransformFn
     * @option {boolean} [deep]
     * @option {boolean} [auto]
     * @option {string} [separator]
     * @option {queryStringTransformFn} [transform]
     *
     ***/
    'fromQueryString': function(obj, options) {
      return fromQueryStringWithOptions(obj, options);
    }

  });

  defineInstanceAndStatic(sugarObject, {

    /***
     * @method has(key, [inherited] = false)
     * @returns Boolean
     * @short Checks if the object has property `key`.
     * @extra Supports `deep properties`. If [inherited] is `true`,
     *        properties defined in the prototype chain will also return `true`.
     *        The default of `false` for this argument makes this method suited
     *        to working with objects as data stores by default.
     *
     * @example
     *
     *   Object.has(usersByName, 'Harry')     -> true
     *   Object.has(data, 'users[1].profile') -> true
     *   Object.has([], 'forEach')            -> false
     *   Object.has([], 'forEach', true)      -> true
     *
     * @param {string} key
     * @param {boolean} [inherited]
     *
     ***/
    'has': function(obj, key, any) {
      return deepHasProperty(obj, key, any);
    },

    /***
     * @method get(key, [inherited] = false)
     * @returns Mixed
     * @short Gets a property of the object.
     * @extra Supports `deep properties`. If [inherited] is `true`,
     *        properties defined in the prototype chain will also be returned.
     *        The default of `false` for this argument makes this method suited
     *        to working with objects as data stores by default.
     *
     * @example
     *
     *   Object.get(Harry, 'name');           -> 'Harry'
     *   Object.get(Harry, 'profile.likes');  -> Harry's likes
     *   Object.get(data, 'users[3].name')    -> User 3's name
     *   Object.get(data, 'users[1..2]')      -> Users 1 and 2
     *   Object.get(data, 'users[1..2].name') -> Names of users 1 and 2
     *   Object.get(data, 'users[-2..-1]')    -> Last 2 users
     *
     * @param {string} key
     * @param {boolean} [inherited]
     *
     ***/
    'get': function(obj, key, any) {
      return deepGetProperty(obj, key, any);
    },

    /***
     * @method set(key, val)
     * @returns Object
     * @short Sets a property on the object.
     * @extra Using a dot or square bracket in `key` is considered "deep" syntax,
     *        and will attempt to traverse into the object to set the property,
     *        creating properties that do not exist along the way. If the missing
     *        property is referenced using square brackets, an empty array will be
     *        created, otherwise an empty object. A special `[]` carries the
     *        meaning of "the last index + 1", and will effectively push `val`
     *        onto the end of the array. Lastly, a `..` separator inside the
     *        brackets is "range" notation, and will set properties on all
     *        elements in the specified range. Range members may be negative,
     *        which will be offset from the end of the array.
     *
     * @example
     *
     *   Object.set({}, 'name', 'Harry');         -> {name:'Harry'}
     *   Object.set({}, 'user.name', 'Harry');    -> {user:{name:'Harry'}}
     *   Object.set({}, 'users[].name', 'Bob')    -> {users:[{name:'Bob'}}
     *   Object.set({}, 'users[1].name','Bob')    -> {users:[undefined, {name:'Bob'}]}
     *   Object.set({}, 'users[0..1].name','Bob') -> {users:[{name:'Bob'},{name:'Bob'}]}
     *
     * @param {string} key
     * @param {Property} val
     *
     ***/
    'set': function(obj, key, val) {
      return deepSetProperty(obj, key, val);
    },

    /***
     * @method size()
     * @returns Number
     * @short Returns the number of properties in the object.
     *
     * @example
     *
     *   Object.size({foo:'bar'}) -> 1
     *
     ***/
    'size': function(obj) {
      return objectSize(obj);
    },

    /***
     * @method isEmpty()
     * @returns Boolean
     * @short Returns true if the number of properties in the object is zero.
     *
     * @example
     *
     *   Object.isEmpty({})    -> true
     *   Object.isEmpty({a:1}) -> false
     *
     ***/
    'isEmpty': function(obj) {
      return objectSize(obj) === 0;
    },

    /***
     * @method toQueryString([options])
     * @returns Object
     * @short Converts the object into a query string.
     * @extra Accepts deep objects and arrays. [options] can be passed for more
     *        control over the result.
     *
     * @options
     *
     *   deep        If `true`, non-standard "deep" syntax `foo[]` will be
     *               used for output. Note that `separator` will be ignored,
     *               as this option overrides shallow syntax. (Default `false`)
     *
     *   prefix      If passed, this string will be prefixed to all keys,
     *               separated by the `separator`. (Default `''`).
     *
     *   transform   A function whose return value becomes the final value
     *               in the string. (Default `undefined`)
     *
     *   separator   A string that is used to separate keys, either for deep
     *               objects, or when `prefix` is passed.(Default `_`).
     *
     * @callback queryStringTransformFn
     *
     *   key  The key of the current iteration.
     *   val  The value of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.toQueryString({foo:'bar'})                  -> 'foo=bar'
     *   Object.toQueryString({foo:['a','b']})              -> 'foo=a&foo=b'
     *   Object.toQueryString({foo:['a','b']}, {deep:true}) -> 'foo[]=a&foo[]=b'
     *
     * @param {Object} obj
     * @param {QueryStringOptions} [options]
     * @callbackParam {string} key
     * @callbackParam {Property} val
     * @callbackParam {Object} obj
     * @callbackReturns {NewProperty} queryStringTransformFn
     * @option {boolean} [deep]
     * @option {string} [prefix]
     * @option {string} [separator]
     * @option {queryStringTransformFn} [transform]
     *
     ***/
    'toQueryString': function(obj, options) {
      return toQueryStringWithOptions(obj, options);
    },

    /***
     * @method isEqual(obj)
     * @returns Boolean
     * @short Returns true if `obj` is equivalent to the object.
     * @extra If both objects are built-in types, they will be considered
     *        equivalent if they are not "observably distinguishable". This means
     *        that primitives and object types, `0` and `-0`, and sparse and
     *        dense arrays are all not equal. Functions and non-built-ins like
     *        instances of user-defined classes and host objects like Element and
     *        Event are strictly compared `===`, and will only be equal if they
     *        are the same reference. Plain objects as well as Arrays will be
     *        traversed into and deeply checked by their non-inherited, enumerable
     *        properties. Other allowed types include Typed Arrays, Sets, Maps,
     *        Arguments, Dates, Regexes, and Errors.
     *
     * @example
     *
     *   Object.isEqual({a:2}, {a:2})         -> true
     *   Object.isEqual({a:2}, {a:3})         -> false
     *   Object.isEqual(5, Object(5))         -> false
     *   Object.isEqual(Object(5), Object(5)) -> true
     *   Object.isEqual(NaN, NaN)             -> false
     *
     * @param {Object} obj
     *
     ***/
    'isEqual': function(obj1, obj2) {
      return isEqual(obj1, obj2);
    },

    /***
     * @method merge(source, [options])
     * @returns Object
     * @short Merges properties from `source` into the object.
     * @extra This method will modify the object! Use `add` for a non-destructive
     *        alias.
     *
     * @options
     *
     *   deep         If `true` deep properties are merged recursively.
     *                (Default `false`)
     *
     *   hidden       If `true`, non-enumerable properties will be merged as well.
     *                (Default `false`)
     *
     *   descriptor   If `true`, properties will be merged by property descriptor.
     *                Use this option to merge getters or setters, or to preserve
     *                `enumerable`, `configurable`, etc.
     *                (Default `false`)
     *
     *   resolve      Determines which property wins in the case of conflicts.
     *                If `true`, `source` wins. If `false`, the original property wins.
     *                If a function is passed, its return value will decide the result.
     *                Any non-undefined return value will resolve the conflict
     *                for that property (will not continue if `deep`). Returning
     *                `undefined` will do nothing (no merge). Finally, returning
     *                the global object `Sugar` will allow Sugar to handle the
     *                merge as normal. (Default `true`)
     *
     * @callback resolveFn
     *
     *   key        The key of the current iteration.
     *   targetVal  The current value for the key in the target.
     *   sourceVal  The current value for the key in `source`.
     *   target     The target object.
     *   source     The source object.
     *
     * @example
     *
     *   Object.merge({one:1},{two:2})                 -> {one:1,two:2}
     *   Object.merge({one:1},{one:9,two:2})           -> {one:9,two:2}
     *   Object.merge({x:{a:1}},{x:{b:2}},{deep:true}) -> {x:{a:1,b:2}}
     *   Object.merge({a:1},{a:2},{resolve:mergeAdd})  -> {a:3}
     *
     * @param {Object} source
     * @param {ObjectMergeOptions} [options]
     * @callbackParam {string} key
     * @callbackParam {Property} targetVal
     * @callbackParam {Property} sourceVal
     * @callbackParam {Object} target
     * @callbackParam {Object} source
     * @callbackReturns {boolean} resolveFn
     * @option {boolean} [deep]
     * @option {boolean} [hidden]
     * @option {boolean} [descriptor]
     * @option {boolean|resolveFn} [resolve]
     *
     ***/
    'merge': function(target, source, opts) {
      return mergeWithOptions(target, source, opts);
    },

    /***
     * @method add(obj, [options])
     * @returns Object
     * @short Adds properties in `obj` and returns a new object.
     * @extra This method will not modify the original object. See `merge` for options.
     *
     * @example
     *
     *   Object.add({one:1},{two:2})                 -> {one:1,two:2}
     *   Object.add({one:1},{one:9,two:2})           -> {one:9,two:2}
     *   Object.add({x:{a:1}},{x:{b:2}},{deep:true}) -> {x:{a:1,b:2}}
     *   Object.add({a:1},{a:2},{resolve:mergeAdd})  -> {a:3}
     *
     * @param {Object} obj
     * @param {ObjectMergeOptions} [options]
     *
     ***/
    'add': function(obj1, obj2, opts) {
      return mergeWithOptions(clone(obj1), obj2, opts);
    },

    /***
     * @method mergeAll(sources, [options])
     * @returns Object
     * @short Merges properties from an array of `sources`.
     * @extra This method will modify the object! Use `addAll` for a non-destructive
     *        alias. See `merge` for options.
     *
     * @example
     *
     *   Object.mergeAll({one:1},[{two:2},{three:3}]) -> {one:1,two:2,three:3}
     *   Object.mergeAll({x:{a:1}},[{x:{b:2}},{x:{c:3}}],{deep:true}) -> {x:{a:1,b:2,c:3}}
     *
     * @param {Array<Object>} sources
     * @param {ObjectMergeOptions} [options]
     *
     ***/
    'mergeAll': function(target, sources, opts) {
      return mergeAll(target, sources, opts);
    },

    /***
     * @method addAll(sources, [options])
     * @returns Object
     * @short Adds properties from an array of `sources` and returns a new object.
     * @extra This method will not modify the object. See `merge` for options.
     *
     * @example
     *
     *   Object.addAll({one:1},[{two:2},{three:3}]) -> {one:1,two:2,three:3}
     *   Object.addAll({x:{a:1}},[{x:{b:2}},{x:{c:3}}],{deep:true}) -> {x:{a:1,b:2,c:3}}
     *
     * @param {Array<Object>} sources
     * @param {ObjectMergeOptions} [options]
     *
     ***/
    'addAll': function(obj, sources, opts) {
      return mergeAll(clone(obj), sources, opts);
    },

    /***
     * @method defaults(sources, [options])
     * @returns Object
     * @short Merges properties from one or multiple `sources` while preserving
     *        the object's defined properties.
     * @extra This method modifies the object! See `merge` for options.
     *
     * @example
     *
     *   Object.defaults({one:1},[{one:9},{two:2}])                   -> {one:1,two:2}
     *   Object.defaults({x:{a:1}},[{x:{a:9}},{x:{b:2}}],{deep:true}) -> {x:{a:1,b:2}}
     *
     * @param {Array<Object>} sources
     * @param {ObjectMergeOptions} [options]
     *
     ***/
    'defaults': function(target, sources, opts) {
      return defaults(target, sources, opts);
    },

    /***
     * @method intersect(obj)
     * @returns Object
     * @short Returns a new object whose properties are those that the object has
     *        in common both with `obj`.
     * @extra If both key and value do not match, then the property will not be included.
     *
     * @example
     *
     *   Object.intersect({a:'a'},{b:'b'}) -> {}
     *   Object.intersect({a:'a'},{a:'b'}) -> {}
     *   Object.intersect({a:'a',b:'b'},{b:'b',z:'z'}) -> {b:'b'}
     *
     * @param {Object} obj
     *
     ***/
    'intersect': function(obj1, obj2) {
      return objectIntersectOrSubtract(obj1, obj2, false);
    },

    /***
     * @method subtract(obj)
     * @returns Object
     * @short Returns a clone of the object with any properties shared with `obj` excluded.
     * @extra If both key and value do not match, then the property will not be excluded.
     *
     * @example
     *
     *   Object.subtract({a:'a',b:'b'},{b:'b'}) -> {a:'a'}
     *   Object.subtract({a:'a',b:'b'},{a:'b'}) -> {a:'a',b:'b'}
     *
     * @param {Object} obj
     *
     ***/
    'subtract': function(obj1, obj2) {
      return objectIntersectOrSubtract(obj1, obj2, true);
    },

    /***
     * @method clone([deep] = false)
     * @returns Object
     * @short Creates a clone of the object.
     * @extra Default is a shallow clone, unless [deep] is true.
     *
     * @example
     *
     *   Object.clone({foo:'bar'})       -> creates shallow clone
     *   Object.clone({foo:'bar'}, true) -> creates a deep clone
     *
     * @param {boolean} [deep]
     *
     ***/
    'clone': function(obj, deep) {
      return clone(obj, deep);
    },

    /***
     * @method values()
     * @returns Array
     * @short Returns an array containing the values in the object.
     * @extra Values are in no particular order. Does not include inherited or
     *        non-enumerable properties.
     *
     * @example
     *
     *   Object.values({a:'a',b:'b'}) -> ['a','b']
     *
     ***/
    'values': function(obj) {
      return getValues(obj);
    },

    /***
     * @method invert([multi] = false)
     * @returns Object
     * @short Creates a new object with the keys and values swapped.
     * @extra If [multi] is true, values will be an array of all keys, othewise
     *        collisions will be overwritten.
     *
     * @example
     *
     *   Object.invert({foo:'bar'})     -> {bar:'foo'}
     *   Object.invert({a:1,b:1}, true) -> {1:['a','b']}
     *
     * @param {boolean} [multi]
     *
     ***/
    'invert': function(obj, multi) {
      var result = {};
      multi = multi === true;
      forEachProperty(obj, function(val, key) {
        if (hasOwn(result, val) && multi) {
          result[val].push(key);
        } else if (multi) {
          result[val] = [key];
        } else {
          result[val] = key;
        }
      });
      return result;
    },

    /***
     * @method tap(fn)
     * @returns Object
     * @short Runs `fn` and returns the object.
     * @extra A string can also be used as a shortcut to a method. This method is
     *        designed to run an intermediary function that "taps into" a method
     *        chain. As such, it is fairly useless as a static method. However it
     *        can be quite useful when combined with chainables.
     *
     * @callback tapFn
     *
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Sugar.Array([1,4,9]).map(Math.sqrt).tap('pop') -> [1,2]
     *   Sugar.Object({a:'a'}).tap(logArgs).merge({b:'b'})  -> {a:'a',b:'b'}
     *
     * @param {tapFn} fn
     * @callbackParam {Object} obj
     * @callbackReturns {any} tapFn
     *
     ***/
    'tap': function(obj, arg) {
      return tap(obj, arg);
    },

    /***
     * @method isArguments()
     * @returns Boolean
     * @short Returns true if the object is an arguments object.
     *
     * @example
     *
     *   Object.isArguments([1]) -> false
     *
     ***/
    'isArguments': function(obj) {
      return isArguments(obj);
    },

    /***
     * @method isObject()
     * @returns Boolean
     * @short Returns true if the object is a "plain" object.
     * @extra Plain objects do not include instances of classes or "host" objects,
     *        such as Elements, Events, etc.
     *
     * @example
     *
     *   Object.isObject({ broken:'wear' }) -> true
     *
     ***/
    'isObject': function(obj) {
      return isPlainObject(obj);
    },

    /***
     * @method remove(search)
     * @returns Object
     * @short Deletes all properties in the object matching `search`.
     * @extra This method will modify the object!. Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   key  The key of the current iteration.
     *   val  The value of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.remove({a:'a',b:'b'}, 'a');           -> {b:'b'}
     *   Object.remove({a:'a',b:'b',z:'z'}, /[a-f]/); -> {z:'z'}
     *
     * @param {Property|searchFn} search
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'remove': function(obj, f) {
      return objectRemove(obj, f);
    },

    /***
     * @method exclude(search)
     * @returns Object
     * @short Returns a new object with all properties matching `search` removed.
     * @extra This is a non-destructive version of `remove` and will not modify
     *        the object. Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   key  The key of the current iteration.
     *   val  The value of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.exclude({a:'a',b:'b'}, 'a');           -> {b:'b'}
     *   Object.exclude({a:'a',b:'b',z:'z'}, /[a-f]/); -> {z:'z'}
     *
     * @param {Property|searchFn} search
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'exclude': function(obj, f) {
      return objectExclude(obj, f);
    },

    /***
     * @method select(find)
     * @returns Object
     * @short Builds a new object containing the keys specified in `find`.
     * @extra When `find` is a string, a single key will be selected. Arrays or
     *        objects match multiple keys, and a regex will match keys by regex.
     *
     * @example
     *
     *   Object.select({a:1,b:2}, 'a')           -> {a:1}
     *   Object.select({a:1,b:2}, ['a', 'b'])    -> {a:1,b:2}
     *   Object.select({a:1,b:2}, /[a-z]/)       -> {a:1,b:2}
     *   Object.select({a:1,b:2}, {a:'a',b:'b'}) -> {a:1,b:2}
     *
     * @param {string|RegExp|Array<string>|Object} find
     *
     ***/
    'select': function(obj, f) {
      return objectSelect(obj, f);
    },

    /***
     * @method reject(find)
     * @returns Object
     * @short Builds a new object containing all keys except those in `find`.
     * @extra When `find` is a string, a single key will be rejected. Arrays or
     *        objects match multiple keys, and a regex will match keys by regex.
     *
     * @example
     *
     *   Object.reject({a:1,b:2}, 'a')        -> {b:2}
     *   Object.reject({a:1,b:2}, /[a-z]/)    -> {}
     *   Object.reject({a:1,b:2}, {a:'a'})    -> {b:2}
     *   Object.reject({a:1,b:2}, ['a', 'b']) -> {}
     *
     * @param {string|RegExp|Array<string>|Object} find
     *
     ***/
    'reject': function(obj, f) {
      return objectReject(obj, f);
    }

  });

  // TODO: why is this here?
  defineInstance(sugarObject, {

    /***
     * @method keys()
     * @returns Array
     * @polyfill ES5
     * @short Returns an array containing the keys of all of the non-inherited,
     *        enumerable properties of the object.
     *
     * @example
     *
     *   Object.keys({a:'a',b:'b'}) -> ['a','b']
     *
     ***/
    'keys': function(obj) {
      return getKeys(obj);
    }

  });

  buildClassCheckMethods();

  /***
   * @module Enumerable
   * @description Counting, mapping, and finding methods on both arrays and objects.
   *
   ***/

  function sum(obj, map) {
    var sum = 0;
    enumerateWithMapping(obj, map, function(val) {
      sum += val;
    });
    return sum;
  }

  function average(obj, map) {
    var sum = 0, count = 0;
    enumerateWithMapping(obj, map, function(val) {
      sum += val;
      count++;
    });
    // Prevent divide by 0
    return sum / (count || 1);
  }

  function median(obj, map) {
    var result = [], middle, len;
    enumerateWithMapping(obj, map, function(val) {
      result.push(val);
    });
    len = result.length;
    if (!len) return 0;
    result.sort(function(a, b) {
      // IE7 will throw errors on non-numbers!
      return (a || 0) - (b || 0);
    });
    middle = trunc(len / 2);
    return len % 2 ? result[middle] : (result[middle - 1] + result[middle]) / 2;
  }

  function getMinOrMax(obj, arg1, arg2, max, asObject) {
    var result = [], pushVal, edge, all, map;
    if (isBoolean(arg1)) {
      all = arg1;
      map = arg2;
    } else {
      map = arg1;
    }
    enumerateWithMapping(obj, map, function(val, key) {
      if (isUndefined(val)) {
        throw new TypeError('Cannot compare with undefined');
      }
      pushVal = asObject ? key : obj[key];
      if (val === edge) {
        result.push(pushVal);
      } else if (isUndefined(edge) || (max && val > edge) || (!max && val < edge)) {
        result = [pushVal];
        edge = val;
      }
    });
    return getReducedMinMaxResult(result, obj, all, asObject);
  }

  function getLeastOrMost(obj, arg1, arg2, most, asObject) {
    var group = {}, refs = [], minMaxResult, result, all, map;
    if (isBoolean(arg1)) {
      all = arg1;
      map = arg2;
    } else {
      map = arg1;
    }
    enumerateWithMapping(obj, map, function(val, key) {
      var groupKey = serializeInternal(val, refs);
      var arr = getOwn(group, groupKey) || [];
      arr.push(asObject ? key : obj[key]);
      group[groupKey] = arr;
    });
    minMaxResult = getMinOrMax(group, !!all, 'length', most, true);
    if (all) {
      result = [];
      // Flatten result
      forEachProperty(minMaxResult, function(val) {
        result = result.concat(val);
      });
    } else {
      result = getOwn(group, minMaxResult);
    }
    return getReducedMinMaxResult(result, obj, all, asObject);
  }


  // Support

  function getReducedMinMaxResult(result, obj, all, asObject) {
    if (asObject && all) {
      // The method has returned an array of keys so use this array
      // to build up the resulting object in the form we want it in.
      return result.reduce(function(o, key) {
        o[key] = obj[key];
        return o;
      }, {});
    } else if (result && !all) {
      result = result[0];
    }
    return result;
  }

  function enumerateWithMapping(obj, map, fn) {
    var arrayIndexes = isArray(obj);
    forEachProperty(obj, function(val, key) {
      if (arrayIndexes) {
        if (!isArrayIndex(key)) {
          return;
        }
        key = +key;
      }
      var mapped = mapWithShortcuts(val, map, obj, [val, key, obj]);
      fn(mapped, key);
    });
  }

  /*** @namespace Array ***/

  // Flag allowing native array methods to be enhanced
  var ARRAY_ENHANCEMENTS_FLAG = 'enhanceArray';

  // Enhanced map function
  var enhancedMap = buildEnhancedMapping('map');

  // Enhanced matcher methods
  var enhancedFind      = buildEnhancedMatching('find'),
      enhancedSome      = buildEnhancedMatching('some'),
      enhancedEvery     = buildEnhancedMatching('every'),
      enhancedFilter    = buildEnhancedMatching('filter'),
      enhancedFindIndex = buildEnhancedMatching('findIndex');

  function arrayNone() {
    return !enhancedSome.apply(this, arguments);
  }

  function arrayCount(arr, f) {
    if (isUndefined(f)) {
      return arr.length;
    }
    return enhancedFilter.apply(this, arguments).length;
  }

  // Enhanced methods

  function buildEnhancedMapping(name) {
    return wrapNativeArrayMethod(name, enhancedMapping);
  }


  function buildEnhancedMatching(name) {
    return wrapNativeArrayMethod(name, enhancedMatching);
  }

  function enhancedMapping(map, context) {
    if (isFunction(map)) {
      return map;
    } else if (map) {
      return function(el, i, arr) {
        return mapWithShortcuts(el, map, context, [el, i, arr]);
      };
    }
  }

  function enhancedMatching(f) {
    var matcher;
    if (isFunction(f)) {
      return f;
    }
    matcher = getMatcher(f);
    return function(el, i, arr) {
      return matcher(el, i, arr);
    };
  }

  function wrapNativeArrayMethod(methodName, wrapper) {
    var nativeFn = Array.prototype[methodName];
    return function(arr, f, context, argsLen) {
      var args = new Array(2);
      assertArgument(argsLen > 0);
      args[0] = wrapper(f, context);
      args[1] = context;
      return nativeFn.apply(arr, args);
    };
  }


  /***
   * @method [fn]FromIndex(startIndex, [loop], ...)
   * @returns Mixed
   * @short Runs native array functions beginning from `startIndex`.
   * @extra If [loop] is `true`, once the end of the array has been reached,
   *        iteration will continue from the start of the array up to
   *        `startIndex - 1`. If [loop] is false it can be omitted. Standard
   *        arguments are then passed which will be forwarded to the native
   *        methods. When available, methods are always `enhanced`. This includes
   *        `deep properties` for `map`, and `enhanced matching` for `some`,
   *        `every`, `filter`, `find`, and `findIndex`. Note also that
   *        `forEachFromIndex` is optimized for sparse arrays and may be faster
   *        than native `forEach`.
   *
   * @set
   *   mapFromIndex
   *   forEachFromIndex
   *   filterFromIndex
   *   someFromIndex
   *   everyFromIndex
   *   reduceFromIndex
   *   reduceRightFromIndex
   *   findFromIndex
   *   findIndexFromIndex
   *
   * @example
   *
   *   users.mapFromIndex(2, 'name');
   *   users.mapFromIndex(2, true, 'name');
   *   names.forEachFromIndex(10, log);
   *   names.everyFromIndex(15, /^[A-F]/);
   *
   * @signature [fn]FromIndex(startIndex, ...)
   * @param {number} startIndex
   * @param {boolean} loop
   *
   ***/
  function buildFromIndexMethods() {

    var methods = {
      'forEach': {
        base: forEachAsNative
      },
      'map': {
        wrapper: enhancedMapping
      },
      'some every': {
        wrapper: enhancedMatching
      },
      'findIndex': {
        wrapper: enhancedMatching,
        result: indexResult
      },
      'reduce': {
        apply: applyReduce
      },
      'filter find': {
        wrapper: enhancedMatching
      },
      'reduceRight': {
        apply: applyReduce,
        slice: sliceArrayFromRight,
        clamp: clampStartIndexFromRight
      }
    };

    forEachProperty(methods, function(opts, key) {
      forEach(spaceSplit(key), function(baseName) {
        var methodName = baseName + 'FromIndex';
        var fn = createFromIndexWithOptions(baseName, opts);
        defineInstanceWithArguments(sugarArray, methodName, fn);
      });
    });

    function forEachAsNative(fn) {
      forEach(this, fn);
    }

    // Methods like filter and find have a direct association between the value
    // returned by the callback and the element of the current iteration. This
    // means that when looping, array elements must match the actual index for
    // which they are being called, so the array must be sliced. This is not the
    // case for methods like forEach and map, which either do not use return
    // values or use them in a way that simply getting the element at a shifted
    // index will not affect the final return value. However, these methods will
    // still fail on sparse arrays, so always slicing them here. For example, if
    // "forEachFromIndex" were to be called on [1,,2] from index 1, although the
    // actual index 1 would itself would be skipped, when the array loops back to
    // index 0, shifting it by adding 1 would result in the element for that
    // iteration being undefined. For shifting to work, all gaps in the array
    // between the actual index and the shifted index would have to be accounted
    // for. This is infeasible and is easily solved by simply slicing the actual
    // array instead so that gaps align. Note also that in the case of forEach,
    // we are using the internal function which handles sparse arrays in a way
    // that does not increment the index, and so is highly optimized compared to
    // the others here, which are simply going through the native implementation.
    function sliceArrayFromLeft(arr, startIndex, loop) {
      var result = arr;
      if (startIndex) {
        result = arr.slice(startIndex);
        if (loop) {
          result = result.concat(arr.slice(0, startIndex));
        }
      }
      return result;
    }

    // When iterating from the right, indexes are effectively shifted by 1.
    // For example, iterating from the right from index 2 in an array of 3
    // should also include the last element in the array. This matches the
    // "lastIndexOf" method which also iterates from the right.
    function sliceArrayFromRight(arr, startIndex, loop) {
      if (!loop) {
        startIndex += 1;
        arr = arr.slice(0, max(0, startIndex));
      }
      return arr;
    }

    function clampStartIndex(startIndex, len) {
      return min(len, max(0, startIndex));
    }

    // As indexes are shifted by 1 when starting from the right, clamping has to
    // go down to -1 to accommodate the full range of the sliced array.
    function clampStartIndexFromRight(startIndex, len) {
      return min(len, max(-1, startIndex));
    }

    function applyReduce(arr, startIndex, fn, context, len, loop) {
      return function(acc, val, i) {
        i = getNormalizedIndex(i + startIndex, len, loop);
        return fn.call(arr, acc, val, i, arr);
      };
    }

    function applyEach(arr, startIndex, fn, context, len, loop) {
      return function(el, i) {
        i = getNormalizedIndex(i + startIndex, len, loop);
        return fn.call(context, arr[i], i, arr);
      };
    }

    function indexResult(result, startIndex, len) {
      if (result !== -1) {
        result = (result + startIndex) % len;
      }
      return result;
    }

    function createFromIndexWithOptions(methodName, opts) {

      var baseFn = opts.base || Array.prototype[methodName],
          applyCallback = opts.apply || applyEach,
          sliceArray = opts.slice || sliceArrayFromLeft,
          clampIndex = opts.clamp || clampStartIndex,
          getResult = opts.result,
          wrapper = opts.wrapper;

      return function(arr, startIndex, args) {
        var callArgs = [], argIndex = 0, lastArg, result, len, loop, fn;
        len = arr.length;
        if (isBoolean(args[0])) {
          loop = args[argIndex++];
        }
        fn = args[argIndex++];
        lastArg = args[argIndex];
        if (startIndex < 0) {
          startIndex += len;
        }
        startIndex = clampIndex(startIndex, len);
        assertArgument(args.length);
        fn = wrapper ? wrapper(fn, lastArg) : fn;
        callArgs.push(applyCallback(arr, startIndex, fn, lastArg, len, loop));
        if (lastArg) {
          callArgs.push(lastArg);
        }
        result = baseFn.apply(sliceArray(arr, startIndex, loop), callArgs);
        if (getResult) {
          result = getResult(result, startIndex, len);
        }
        return result;
      };
    }
  }

  defineInstance(sugarArray, {

    /***
     * @method map(map, [context])
     * @returns New Array
     * @polyfill ES5
     * @short Maps the array to another array whose elements are the values
     *        returned by the `map` callback.
     * @extra [context] is the `this` object. Sugar enhances this method to accept
     *        a string for `map`, which is a shortcut for a function that gets
     *        a property or invokes a function on each element.
     *        Supports `deep properties`.
     *
     * @callback mapFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,3].map(function(n) {
     *     return n * 3;
     *   }); -> [3,6,9]
     *
     *   ['a','aa','aaa'].map('length') -> [1,2,3]
     *   ['A','B','C'].map('toLowerCase') -> ['a','b','c']
     *   users.map('name') -> array of user names
     *
     * @param {string|mapFn} map
     * @param {any} context
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {NewArrayElement} mapFn
     *
     ***/
    'map': fixArgumentLength(enhancedMap),

    /***
     * @method some(search, [context])
     * @returns Boolean
     * @polyfill ES5
     * @short Returns true if `search` is true for any element in the array.
     * @extra [context] is the `this` object. Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   ['a','b','c'].some(function(n) {
     *     return n == 'a';
     *   });
     *   ['a','b','c'].some(function(n) {
     *     return n == 'd';
     *   });
     *   ['a','b','c'].some('a')    -> true
     *   [{a:2},{b:5}].some({a:2})  -> true
     *   users.some({ name: /^H/ }) -> true if any have a name starting with H
     *
     * @param {ArrayElement|searchFn} search
     * @param {any} context
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'some': fixArgumentLength(enhancedSome),

    /***
     * @method every(search, [context])
     * @returns Boolean
     * @polyfill ES5
     * @short Returns true if `search` is true for all elements of the array.
     * @extra [context] is the `this` object. Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   ['a','a','a'].every(function(n) {
     *     return n == 'a';
     *   });
     *   ['a','a','a'].every('a')   -> true
     *   [{a:2},{a:2}].every({a:2}) -> true
     *   users.every({ name: /^H/ }) -> true if all have a name starting with H
     *
     * @param {ArrayElement|searchFn} search
     * @param {any} context
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'every': fixArgumentLength(enhancedEvery),

    /***
     * @method filter(search, [context])
     * @returns Array
     * @polyfill ES5
     * @short Returns any elements in the array that match `search`.
     * @extra [context] is the `this` object. Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,3].filter(function(n) {
     *     return n > 1;
     *   });
     *   [1,2,2,4].filter(2) -> 2
     *   users.filter({ name: /^H/ }) -> all users with a name starting with H
     *
     * @param {ArrayElement|searchFn} search
     * @param {any} context
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'filter': fixArgumentLength(enhancedFilter),

    /***
     * @method find(search, [context])
     * @returns Mixed
     * @polyfill ES6
     * @short Returns the first element in the array that matches `search`.
     * @extra Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   users.find(function(user) {
     *     return user.name = 'Harry';
     *   }); -> harry!
     *
     *   users.find({ name: 'Harry' }); -> harry!
     *   users.find({ name: /^[A-H]/ });  -> First user with name starting with A-H
     *   users.find({ titles: ['Ms', 'Dr'] }); -> not harry!
     *
     * @param {ArrayElement|searchFn} search
     * @param {any} context
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'find': fixArgumentLength(enhancedFind),

    /***
     * @method findIndex(search, [context])
     * @returns Number
     * @polyfill ES6
     * @short Returns the index of the first element in the array that matches
     *        `search`, or `-1` if none.
     * @extra [context] is the `this` object. Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,3,4].findIndex(function(n) {
     *     return n % 2 == 0;
     *   }); -> 1
     *   ['a','b','c'].findIndex('c');        -> 2
     *   ['cuba','japan','canada'].find(/^c/) -> 0
     *
     * @param {ArrayElement|searchFn} search
     * @param {any} context
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'findIndex': fixArgumentLength(enhancedFindIndex)

  }, [ENHANCEMENTS_FLAG, ARRAY_ENHANCEMENTS_FLAG]);


  defineInstance(sugarArray, {

    /***
     * @method none(search, [context])
     *
     * @returns Boolean
     * @short Returns true if none of the elements in the array match `search`.
     * @extra [context] is the `this` object. Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,3].none(5)         -> true
     *   ['a','b','c'].none(/b/) -> false
     *   users.none(function(user) {
     *     return user.name == 'Wolverine';
     *   }); -> probably true
     *   users.none({ name: 'Wolverine' }); -> same as above
     *
     * @param {ArrayElement|searchFn} search
     * @param {any} context
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'none': fixArgumentLength(arrayNone),

    /***
     * @method count(search, [context])
     * @returns Number
     * @short Counts all elements in the array that match `search`.
     * @extra Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   ['a','b','a'].count('a') -> 2
     *   ['a','b','c'].count(/b/) -> 1
     *   users.count(function(user) {
     *     return user.age > 30;
     *   }); -> number of users older than 30
     *
     * @param {ArrayElement|searchFn} search
     * @param {any} context
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'count': fixArgumentLength(arrayCount),

    /***
     * @method min([all] = false, [map])
     * @returns Mixed
     * @short Returns the element in the array with the lowest value.
     * @extra [map] may be passed in place of [all], and is a function mapping the
     *        value to be checked or a string acting as a shortcut. If [all] is
     *        true, multiple elements will be returned. Supports `deep properties`.
     *
     * @callback mapFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,3].min()                          -> 1
     *   ['fee','fo','fum'].min('length')       -> 'fo'
     *   ['fee','fo','fum'].min(true, 'length') -> ['fo']
     *   users.min('age')                       -> youngest guy!
     *
     *   ['fee','fo','fum'].min(true, function(n) {
     *     return n.length;
     *   }); -> ['fo']
     *
     * @signature min([map])
     * @param {string|mapFn} map
     * @param {boolean} all
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {NewArrayElement} mapFn
     *
     ***/
    'min': function(arr, all, map) {
      return getMinOrMax(arr, all, map);
    },

    /***
     * @method max([all] = false, [map])
     * @returns Mixed
     * @short Returns the element in the array with the greatest value.
     * @extra [map] may be passed in place of [all], and is a function mapping the
     *        value to be checked or a string acting as a shortcut. If [all] is
     *        true, multiple elements will be returned. Supports `deep properties`.
     *
     * @callback mapFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,3].max()                          -> 3
     *   ['fee','fo','fum'].max('length')       -> 'fee'
     *   ['fee','fo','fum'].max(true, 'length') -> ['fee','fum']
     *   users.max('age')                       -> oldest guy!
     *
     *   ['fee','fo','fum'].max(true, function(n) {
     *     return n.length;
     *   }); -> ['fee', 'fum']
     *
     * @signature max([map])
     * @param {string|mapFn} map
     * @param {boolean} all
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {NewArrayElement} mapFn
     *
     ***/
    'max': function(arr, all, map) {
      return getMinOrMax(arr, all, map, true);
    },

    /***
     * @method least([all] = false, [map])
     * @returns Array
     * @short Returns the elements in the array with the least commonly occuring value.
     * @extra [map] may be passed in place of [all], and is a function mapping the
     *        value to be checked or a string acting as a shortcut. If [all] is
     *        true, will return multiple values in an array.
     *        Supports `deep properties`.
     *
     * @callback mapFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [3,2,2].least() -> 3
     *   ['fe','fo','fum'].least(true, 'length') -> ['fum']
     *   users.least('profile.type')             -> (user with least commonly occurring type)
     *   users.least(true, 'profile.type')       -> (users with least commonly occurring type)
     *
     * @signature least([map])
     * @param {string|mapFn} map
     * @param {boolean} all
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {NewArrayElement} mapFn
     *
     ***/
    'least': function(arr, all, map) {
      return getLeastOrMost(arr, all, map);
    },

    /***
     * @method most([all] = false, [map])
     * @returns Array
     * @short Returns the elements in the array with the most commonly occuring value.
     * @extra [map] may be passed in place of [all], and is a function mapping the
     *        value to be checked or a string acting as a shortcut. If [all] is
     *        true, will return multiple values in an array.
     *        Supports `deep properties`.
     *
     * @callback mapFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [3,2,2].most(2) -> 2
     *   ['fe','fo','fum'].most(true, 'length') -> ['fe','fo']
     *   users.most('profile.type')             -> (user with most commonly occurring type)
     *   users.most(true, 'profile.type')       -> (users with most commonly occurring type)
     *
     * @signature most([map])
     * @param {string|mapFn} map
     * @param {boolean} all
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {NewArrayElement} mapFn
     *
     ***/
    'most': function(arr, all, map) {
      return getLeastOrMost(arr, all, map, true);
    },

    /***
     * @method sum([map])
     * @returns Number
     * @short Sums all values in the array.
     * @extra [map] may be a function mapping the value to be summed or a string
     *        acting as a shortcut.
     *
     * @callback mapFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,2].sum() -> 5
     *   users.sum(function(user) {
     *     return user.votes;
     *   }); -> total votes!
     *   users.sum('votes') -> total votes!
     *
     * @param {string|mapFn} map
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {NewArrayElement} mapFn
     *
     ***/
    'sum': function(arr, map) {
      return sum(arr, map);
    },

    /***
     * @method average([map])
     * @returns Number
     * @short Gets the mean average for all values in the array.
     * @extra [map] may be a function mapping the value to be averaged or a string
     *        acting as a shortcut. Supports `deep properties`.
     *
     * @callback mapFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,3,4].average() -> 2
     *   users.average(function(user) {
     *     return user.age;
     *   }); -> average user age
     *   users.average('age') -> average user age
     *   users.average('currencies.usd.balance') -> average USD balance
     *
     * @param {string|mapFn} map
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {NewArrayElement} mapFn
     *
     ***/
    'average': function(arr, map) {
      return average(arr, map);
    },

    /***
     * @method median([map])
     * @returns Number
     * @short Gets the median average for all values in the array.
     * @extra [map] may be a function mapping the value to be averaged or a string
     *        acting as a shortcut.
     *
     * @callback mapFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   arr  A reference to the array.
     *
     * @example
     *
     *   [1,2,2].median() -> 2
     *   [{a:1},{a:2},{a:2}].median('a') -> 2
     *   users.median('age') -> median user age
     *   users.median('currencies.usd.balance') -> median USD balance
     *
     * @param {string|mapFn} map
     * @callbackParam {ArrayElement} el
     * @callbackParam {number} i
     * @callbackParam {Array} arr
     * @callbackReturns {NewArrayElement} mapFn
     *
     ***/
    'median': function(arr, map) {
      return median(arr, map);
    }

  });


  /*** @namespace Object ***/

  // Object matchers
  var objectSome  = wrapObjectMatcher('some'),
      objectFind  = wrapObjectMatcher('find'),
      objectEvery = wrapObjectMatcher('every');

  function objectForEach(obj, fn) {
    assertCallable(fn);
    forEachProperty(obj, function(val, key) {
      fn(val, key, obj);
    });
    return obj;
  }

  function objectMap(obj, map) {
    var result = {};
    forEachProperty(obj, function(val, key) {
      result[key] = mapWithShortcuts(val, map, obj, [val, key, obj]);
    });
    return result;
  }

  function objectReduce(obj, fn, acc) {
    var init = isDefined(acc);
    forEachProperty(obj, function(val, key) {
      if (!init) {
        acc = val;
        init = true;
        return;
      }
      acc = fn(acc, val, key, obj);
    });
    return acc;
  }

  function objectNone(obj, f) {
    return !objectSome(obj, f);
  }

  function objectFilter(obj, f) {
    var matcher = getMatcher(f), result = {};
    forEachProperty(obj, function(val, key) {
      if (matcher(val, key, obj)) {
        result[key] = val;
      }
    });
    return result;
  }

  function objectCount(obj, f) {
    var matcher = getMatcher(f), count = 0;
    forEachProperty(obj, function(val, key) {
      if (matcher(val, key, obj)) {
        count++;
      }
    });
    return count;
  }

  // Support

  function wrapObjectMatcher(name) {
    var nativeFn = Array.prototype[name];
    return function(obj, f) {
      var matcher = getMatcher(f);
      return nativeFn.call(getKeys(obj), function(key) {
        return matcher(obj[key], key, obj);
      });
    };
  }

  defineInstanceAndStatic(sugarObject, {

    /***
     * @method forEach(fn)
     * @returns Object
     * @short Runs `fn` against each property in the object.
     * @extra Does not iterate over inherited or non-enumerable properties.
     *
     * @callback eachFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.forEach({a:'b'}, function(val, key) {
     *     // val = 'b', key = a
     *   });
     *
     * @param {eachFn} fn
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     *
     ***/
    'forEach': function(obj, fn) {
      return objectForEach(obj, fn);
    },

    /***
     * @method map(map)
     * @returns Object
     * @short Maps the object to another object whose properties are the values
     *        returned by `map`.
     * @extra `map` can also be a string, which is a shortcut for a function that
     *        gets that property (or invokes a function) on each element.
     *        Supports `deep properties`.
     *
     * @callback mapFn
     *
     *   val  The value of the current property.
     *   key  The key of the current property.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   data.map(function(val, key) {
     *     return key;
     *   }); -> {a:'b'}
     *   users.map('age');
     *
     * @param {string|mapFn} map
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {NewProperty} mapFn
     *
     ***/
    'map': function(obj, map) {
      return objectMap(obj, map);
    },

    /***
     * @method some(search)
     * @returns Boolean
     * @short Returns true if `search` is true for any property in the object.
     * @extra Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.some({a:1,b:2}, function(val) {
     *     return val == 1;
     *   }); -> true
     *   Object.some({a:1,b:2}, 1); -> true
     *
     * @param {Property|searchFn} search
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'some': objectSome,

    /***
     * @method every(search)
     * @returns Boolean
     * @short Returns true if `search` is true for all properties in the object.
     * @extra Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.every({a:1,b:2}, function(val) {
     *     return val > 0;
     *   }); -> true
     *   Object.every({a:'a',b:'b'}, /[a-z]/); -> true
     *
     * @param {Property|searchFn} search
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'every': objectEvery,

    /***
     * @method filter(search)
     * @returns Array
     * @short Returns a new object with properties that match `search`.
     * @extra Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.filter({a:1,b:2}, function(val) {
     *     return val == 1;
     *   }); -> {a:1}
     *   Object.filter({a:'a',z:'z'}, /[a-f]/); -> {a:'a'}
     *   Object.filter(usersByName, /^H/); -> all users with names starting with H
     *
     * @param {Property|searchFn} search
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'filter': function(obj, f) {
      return objectFilter(obj, f);
    },

    /***
     * @method reduce(reduceFn, [init])
     * @returns Mixed
     * @short Reduces the object to a single result.
     * @extra This operation is sometimes called "accumulation", as it takes the
     *        result of the last iteration of `fn` and passes it as the first
     *        argument to the next iteration, "accumulating" that value as it goes.
     *        The return value of this method will be the return value of the final
     *        iteration of `fn`. If [init] is passed, it will be the initial
     *        "accumulator" (the first argument). If [init] is not passed, then a
     *        property of the object will be used instead and `fn` will not be
     *        called for that property. Note that object properties have no order,
     *        and this may lead to bugs (for example if performing division or
     *        subtraction operations on a value). If order is important, use an
     *        array instead!
     *
     * @callback reduceFn
     *
     *   acc  The "accumulator", either [init], the result of the last iteration
     *        of `fn`, or a property of `obj`.
     *   val  The value of the current property called for `fn`.
     *   key  The key of the current property called for `fn`.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.reduce({a:2,b:4}, function(a, b) {
     *     return a * b;
     *   }); -> 8
     *
     *   Object.reduce({a:2,b:4}, function(a, b) {
     *     return a * b;
     *   }, 10); -> 80
     *
     *
     * @param {reduceFn} reduceFn
     * @param {any} [init]
     * @callbackParam {Property} acc
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     *
     ***/
    'reduce': function(obj, fn, init) {
      return objectReduce(obj, fn, init);
    },

    /***
     * @method find(search)
     * @returns Boolean
     * @short Returns the first key whose value matches `search`.
     * @extra Implements `enhanced matching`. Note that "first" is
     *        implementation-dependent. If order is important an array should be
     *        used instead.
     *
     * @callback searchFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.find({a:1,b:2}, function(val) {
     *     return val == 2;
     *   }); -> 'b'
     *   Object.find({a:'a',b:'b'}, /[a-z]/); -> 'a'
     *
     * @param {Property|searchFn} search
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'find': objectFind,

    /***
     * @method count(search)
     * @returns Number
     * @short Counts all properties in the object that match `search`.
     * @extra Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.count({a:'a',b:'b',c:'a'}, 'a') -> 2
     *   Object.count(usersByName, function(user) {
     *     return user.age > 30;
     *   }); -> number of users older than 30
     *   Object.count(usersByName, { name: /^[H-Z]/ });
     *
     * @param {Property|searchFn} search
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'count': function(obj, f) {
      return objectCount(obj, f);
    },

    /***
     * @method none(search)
     * @returns Boolean
     * @short Returns true if none of the properties in the object match `search`.
     * @extra Implements `enhanced matching`.
     *
     * @callback searchFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.none({a:1,b:2}, 3); -> true
     *   Object.none(usersByName, function(user) {
     *     return user.name == 'Wolverine';
     *   }); -> probably true
     *
     * @param {Property|searchFn} search
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {boolean} searchFn
     *
     ***/
    'none': function(obj, f) {
      return objectNone(obj, f);
    },

    /***
     * @method sum([map])
     * @returns Number
     * @short Sums all properties in the object.
     * @extra [map] may be a function mapping the value to be summed or a string
     *        acting as a shortcut.
     *
     * @callback mapFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.sum({a:35,b:13}); -> 48
     *   Object.sum(usersByName, function(user) {
     *     return user.votes;
     *   }); -> total user votes
     *
     * @param {string|mapFn} map
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {NewProperty} mapFn
     *
     ***/
    'sum': function(obj, map) {
      return sum(obj, map);
    },

    /***
     * @method average([map])
     * @returns Number
     * @short Gets the mean average of all properties in the object.
     * @extra [map] may be a function mapping the value to be averaged or a string
     *        acting as a shortcut.
     *
     * @callback mapFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.average({a:35,b:11}); -> 23
     *   Object.average(usersByName, 'age'); -> average user age
     *   Object.average(usersByName, 'currencies.usd.balance'); -> USD mean balance
     *
     * @param {string|mapFn} map
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {NewProperty} mapFn
     *
     ***/
    'average': function(obj, map) {
      return average(obj, map);
    },

    /***
     * @method median([map])
     * @returns Number
     * @short Gets the median average of all properties in the object.
     * @extra [map] may be a function mapping the value to be averaged or a string
     *        acting as a shortcut.
     *
     * @callback mapFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.median({a:1,b:2,c:2}) -> 2
     *   Object.median(usersByName, 'age'); -> median user age
     *   Object.median(usersByName, 'currencies.usd.balance'); -> USD median balance
     *
     * @param {string|mapFn} map
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {NewProperty} mapFn
     *
     ***/
    'median': function(obj, map) {
      return median(obj, map);
    },

    /***
     * @method min([all] = false, [map])
     * @returns Mixed
     * @short Returns the key of the property in the object with the lowest value.
     * @extra If [all] is true, will return an object with all properties in the
     *        object with the lowest value. [map] may be passed in place of [all]
     *        and is a function mapping the value to be checked or a string acting
     *        as a shortcut.
     *
     * @callback mapFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.min({a:1,b:2,c:3})                    -> 'a'
     *   Object.min({a:'aaa',b:'bb',c:'c'}, 'length') -> 'c'
     *   Object.min({a:1,b:1,c:3}, true)              -> {a:1,b:1}
     *
     * @signature min([map])
     * @param {string|mapFn} map
     * @param {boolean} [all]
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {NewProperty} mapFn
     *
     ***/
    'min': function(obj, all, map) {
      return getMinOrMax(obj, all, map, false, true);
    },

    /***
     * @method max([all] = false, [map])
     * @returns Mixed
     * @short Returns the key of the property in the object with the highest value.
     * @extra If [all] is true, will return an object with all properties in the
     *        object with the highest value. [map] may be passed in place of [all]
     *        and is a function mapping the value to be checked or a string acting
     *        as a shortcut.
     *
     * @callback mapFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.max({a:1,b:2,c:3})                    -> 'c'
     *   Object.max({a:'aaa',b:'bb',c:'c'}, 'length') -> 'a'
     *   Object.max({a:1,b:3,c:3}, true)              -> {b:3,c:3}
     *
     * @signature max([map])
     * @param {string|mapFn} map
     * @param {boolean} [all]
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {NewProperty} mapFn
     *
     ***/
    'max': function(obj, all, map) {
      return getMinOrMax(obj, all, map, true, true);
    },

    /***
     * @method least([all] = false, [map])
     * @returns Mixed
     * @short Returns the key of the property in the object with the least commonly
     *        occuring value.
     * @extra If [all] is true, will return an object with all properties in the
     *        object with the least common value. [map] may be passed in place of
     *        [all] and is a function mapping the value to be checked or a string
     *        acting as a shortcut.
     *
     * @callback mapFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.least({a:1,b:3,c:3})                   -> 'a'
     *   Object.least({a:'aa',b:'bb',c:'c'}, 'length') -> 'c'
     *   Object.least({a:1,b:3,c:3}, true)             -> {a:1}
     *
     * @signature least([map])
     * @param {string|mapFn} map
     * @param {boolean} [all]
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {NewProperty} mapFn
     *
     ***/
    'least': function(obj, all, map) {
      return getLeastOrMost(obj, all, map, false, true);
    },

    /***
     * @method most([all] = false, [map])
     * @returns Mixed
     * @short Returns the key of the property in the object with the most commonly
     *        occuring value.
     * @extra If [all] is true, will return an object with all properties in the
     *        object with the most common value. [map] may be passed in place of
     *        [all] and is a function mapping the value to be checked or a string
     *        acting as a shortcut.
     *
     * @callback mapFn
     *
     *   val  The value of the current iteration.
     *   key  The key of the current iteration.
     *   obj  A reference to the object.
     *
     * @example
     *
     *   Object.most({a:1,b:3,c:3})                   -> 'b'
     *   Object.most({a:'aa',b:'bb',c:'c'}, 'length') -> 'a'
     *   Object.most({a:1,b:3,c:3}, true)             -> {b:3,c:3}
     *
     * @signature most([map])
     * @param {string|mapFn} map
     * @param {boolean} [all]
     * @callbackParam {Property} val
     * @callbackParam {string} key
     * @callbackParam {Object} obj
     * @callbackReturns {NewProperty} mapFn
     *
     ***/
    'most': function(obj, all, map) {
      return getLeastOrMost(obj, all, map, true, true);
    }

  });


  buildFromIndexMethods();

  /***
   * @module Number
   * @description Number formatting, precision rounding, Math aliases, and more.
   *
   ***/


  var NUMBER_OPTIONS = {
    'decimal': HALF_WIDTH_PERIOD,
    'thousands': HALF_WIDTH_COMMA
  };

  // Abbreviation Units
  var BASIC_UNITS         = '|kmbt',
      MEMORY_UNITS        = '|KMGTPE',
      MEMORY_BINARY_UNITS = '|,Ki,Mi,Gi,Ti,Pi,Ei',
      METRIC_UNITS_SHORT  = 'nμm|k',
      METRIC_UNITS_FULL   = 'yzafpnμm|KMGTPEZY';


  /***
   * @method getOption(name)
   * @returns Mixed
   * @accessor
   * @short Gets an option used interally by Number.
   * @example
   *
   *   Sugar.Number.getOption('thousands');
   *
   * @param {string} name
   *
   ***
   * @method setOption(name, value)
   * @accessor
   * @short Sets an option used interally by Number.
   * @extra If `value` is `null`, the default value will be restored.
   * @options
   *
   *   decimal     A string used as the decimal marker by `format`, `abbr`,
   *               `metric`, and `bytes`. Default is `.`.
   *
   *   thousands   A string used as the thousands marker by `format`, `abbr`,
   *               `metric`, and `bytes`. Default is `,`.
   *
   *
   * @example
   *
   *   Sugar.Number.setOption('decimal', ',');
   *   Sugar.Number.setOption('thousands', ' ');
   *
   * @signature setOption(options)
   * @param {NumberOptions} options
   * @param {string} name
   * @param {any} value
   * @option {string} decimal
   * @option {string} thousands
   *
   ***/
  var _numberOptions = defineOptionsAccessor(sugarNumber, NUMBER_OPTIONS);


  function abbreviateNumber(num, precision, ustr, bytes) {
    var fixed        = num.toFixed(20),
        decimalPlace = fixed.search(/\./),
        numeralPlace = fixed.search(/[1-9]/),
        significant  = decimalPlace - numeralPlace,
        units, unit, mid, i, divisor;
    if (significant > 0) {
      significant -= 1;
    }
    units = commaSplit(ustr);
    if (units.length === 1) {
      units = ustr.split('');
    }
    mid = units.indexOf('|');
    if (mid === -1) {
      // Skipping the placeholder means the units should start from zero,
      // otherwise assume they end at zero.
      mid = units[0] === '_' ? 0 : units.length;
    }
    i = max(min(floor(significant / 3), units.length - mid - 1), -mid);
    unit = units[i + mid];
    while (unit === '_') {
      i += i < 0 ? -1 : 1;
      unit = units[i + mid];
    }
    if (unit === '|') {
      unit = '';
    }
    if (significant < -9) {
      precision = abs(significant) - 9;
    }
    divisor = bytes ? pow(2, 10 * i) : pow(10, i * 3);
    return numberFormat(withPrecision(num / divisor, precision || 0)) + unit;
  }

  function numberFormat(num, place) {
    var result = '', thousands, decimal, fraction, integer, split, str;

    decimal   = _numberOptions('decimal');
    thousands = _numberOptions('thousands');

    if (isNumber(place)) {
      str = withPrecision(num, place || 0).toFixed(max(place, 0));
    } else {
      str = num.toString();
    }

    str = str.replace(/^-/, '');
    split    = periodSplit(str);
    integer  = split[0];
    fraction = split[1];
    if (/e/.test(str)) {
      result = str;
    } else {
      for(var i = integer.length; i > 0; i -= 3) {
        if (i < integer.length) {
          result = thousands + result;
        }
        result = integer.slice(max(0, i - 3), i) + result;
      }
    }
    if (fraction) {
      result += decimal + repeatString('0', (place || 0) - fraction.length) + fraction;
    }
    return (num < 0 ? '-' : '') + result;
  }

  function isInteger(n) {
    return n % 1 === 0;
  }

  function isMultipleOf(n1, n2) {
    return n1 % n2 === 0;
  }

  function createRoundingFunction(fn) {
    return function(n, precision) {
      return precision ? withPrecision(n, precision, fn) : fn(n);
    };
  }

  defineStatic(sugarNumber, {

    /***
     * @method random([n1], [n2])
     * @returns Number
     * @static
     * @short Returns a random integer from [n1] to [n2] (both inclusive).
     * @extra If only 1 number is passed, the other will be 0. If none are passed,
     *        the number will be either 0 or 1.
     *
     * @example
     *
     *   Number.random(50, 100) -> ex. 85
     *   Number.random(50)      -> ex. 27
     *   Number.random()        -> ex. 0
     *
     * @param {number} [n1]
     * @param {number} [n2]
     *
     ***/
    'random': function(n1, n2) {
      var minNum, maxNum;
      if (arguments.length == 1) n2 = n1, n1 = 0;
      minNum = min(n1 || 0, isUndefined(n2) ? 1 : n2);
      maxNum = max(n1 || 0, isUndefined(n2) ? 1 : n2) + 1;
      return trunc((Math.random() * (maxNum - minNum)) + minNum);
    }

  });

  defineInstance(sugarNumber, {

    /***
     * @method isInteger()
     * @returns Boolean
     * @short Returns true if the number has no trailing decimal.
     *
     * @example
     *
     *   (420).isInteger() -> true
     *   (4.5).isInteger() -> false
     *
     ***/
    'isInteger': function(n) {
      return isInteger(n);
    },

    /***
     * @method isOdd()
     * @returns Boolean
     * @short Returns true if the number is odd.
     *
     * @example
     *
     *   (3).isOdd()  -> true
     *   (18).isOdd() -> false
     *
     ***/
    'isOdd': function(n) {
      return isInteger(n) && !isMultipleOf(n, 2);
    },

    /***
     * @method isEven()
     * @returns Boolean
     * @short Returns true if the number is even.
     *
     * @example
     *
     *   (6).isEven()  -> true
     *   (17).isEven() -> false
     *
     ***/
    'isEven': function(n) {
      return isMultipleOf(n, 2);
    },

    /***
     * @method isMultipleOf(num)
     * @returns Boolean
     * @short Returns true if the number is a multiple of `num`.
     *
     * @example
     *
     *   (6).isMultipleOf(2)  -> true
     *   (17).isMultipleOf(2) -> false
     *   (32).isMultipleOf(4) -> true
     *   (34).isMultipleOf(4) -> false
     *
     * @param {number} num
     *
     ***/
    'isMultipleOf': function(n, num) {
      return isMultipleOf(n, num);
    },

    /***
     * @method log([base] = Math.E)
     * @returns Number
     * @short Returns the logarithm of the number with `base`, or the natural
     *        logarithm of the number if `base` is undefined.
     *
     * @example
     *
     *   (64).log(2) -> 6
     *   (9).log(3)  -> 2
     *   (5).log()   -> 1.6094379124341003
     *
     * @param {number} [base]
     *
     ***/
    'log': function(n, base) {
      return Math.log(n) / (base ? Math.log(base) : 1);
    },

    /***
     * @method abbr([precision] = 0)
     * @returns String
     * @short Returns an abbreviated form of the number ("k" for thousand, "m"
     *        for million, etc).
     * @extra [precision] will round to the given precision. `thousands` and
     *        `decimal` allow custom separators to be used.
     *
     * @example
     *
     *   (1000).abbr()    -> "1k"
     *   (1000000).abbr() -> "1m"
     *   (1280).abbr(1)   -> "1.3k"
     *
     * @param {number} [precision]
     *
     ***/
    'abbr': function(n, precision) {
      return abbreviateNumber(n, precision, BASIC_UNITS);
    },

    /***
     * @method metric([precision] = 0, [units] = "nμm|k")
     * @returns String
     * @short Returns the number as a string in metric notation.
     * @extra [precision] will round to the given precision (can be negative).
     *        [units] is a string that determines both the unit notation and the
     *        min/max unit allowed. The default is natural notation for common
     *        units (meters, grams, etc). "all" can be passed for [units] and is a
     *        shortcut to all standard SI units. The token `,` if present separates
     *        units, otherwise each character is a unit. The token `|` if present
     *        marks where fractional units end, otherwise no fractional units are
     *        used. Finally, the token `_` if present is a placeholder for no unit.
     *
     * @example
     *
     *   (1000).metric()        -> "1k"
     *   (1000000).metric()     -> "1,000k"
     *   (1249).metric(2) + 'g' -> "1.25kg"
     *   (0.025).metric() + 'm' -> "25mm"
     *   (1000000).metric(0, 'nμm|kM') -> "1M"
     *
     * @param {number} [precision]
     * @param {string} [units]
     *
     ***/
    'metric': function(n, precision, units) {
      if (units === 'all') {
        units = METRIC_UNITS_FULL;
      } else if (!units) {
        units = METRIC_UNITS_SHORT;
      }
      return abbreviateNumber(n, precision, units);
    },

    /***
     * @method bytes([precision] = 0, [binary] = false, [units] = 'si')
     * @returns String
     * @short Returns an abbreviated form of the number, with 'B' on the end for "bytes".
     * @extra [precision] will round to the given precision. If [binary] is `true`,
     *        powers of 1024 will be used instead of 1000, and units will default
     *        to the binary units "KiB", "MiB", etc. Units can be overridden by
     *        passing "si" or "binary" for [units], or further customized by
     *        passing a unit string. See `metric` for more.
     *
     * @example
     *
     *   (1000).bytes()                 -> "1KB"
     *   (1289).bytes(2)                -> "1.29KB"
     *   (1000).bytes(2, true)          -> "0.98KiB"
     *   (1000).bytes(2, true, 'si')    -> "0.98KB"
     *
     * @param {number} [precision]
     * @param {boolean} [binary]
     * @param {string} [units]
     *
     ***/
    'bytes': function(n, precision, binary, units) {
      if (units === 'binary' || (!units && binary)) {
        units = MEMORY_BINARY_UNITS;
      } else if(units === 'si' || !units) {
        units = MEMORY_UNITS;
      }
      return abbreviateNumber(n, precision, units, binary) + 'B';
    },

    /***
     * @method format([place] = 0)
     * @returns String
     * @short Formats the number to a readable string.
     * @extra If [place] is `undefined`, the place will automatically be determined.
     *        `thousands` and `decimal` allow custom markers to be used.
     *
     * @example
     *
     *   (56782).format()    -> '56,782'
     *   (56782).format(2)   -> '56,782.00'
     *   (4388.43).format(2) -> '4,388.43'
     *
     * @param {number} [place]
     *
     ***/
    'format': function(n, place) {
      return numberFormat(n, place);
    },

    /***
     * @method hex([pad] = 1)
     * @returns String
     * @short Converts the number to hexidecimal.
     * @extra [pad] will pad the resulting string to that many places.
     *
     * @example
     *
     *   (255).hex()   -> 'ff';
     *   (255).hex(4)  -> '00ff';
     *   (23654).hex() -> '5c66';
     *
     * @param {number} [pad]
     *
     ***/
    'hex': function(n, pad) {
      return padNumber(n, pad || 1, false, 16);
    },

    /***
     * @method times(fn)
     * @returns Mixed
     * @short Calls `fn` a number of times equivalent to the number.
     * @extra Any non-undefined return values of `fn` will be collected and
     *        returned in an array.
     *
     * @callback indexMapFn
     *
     *   i   The index of the current iteration.
     *
     * @example
     *
     *   (8).times(logHello) -> logs "hello" 8 times
     *   (7).times(function(n) {
     *     return Math.pow(2, n);
     *   });
     *
     * @callbackParam {number} i
     * @callbackReturns {any} indexMapFn
     * @param {indexMapFn} fn
     *
     ***/
    'times': function(n, fn) {
      var arr, result;
      for(var i = 0; i < n; i++) {
        result = fn.call(n, i);
        if (isDefined(result)) {
          if (!arr) {
            arr = [];
          }
          arr.push(result);
        }
      }
      return arr;
    },

    /***
     * @method chr()
     * @returns String
     * @short Returns a string at the code point of the number.
     *
     * @example
     *
     *   (65).chr() -> "A"
     *   (75).chr() -> "K"
     *
     ***/
    'chr': function(n) {
      return chr(n);
    },

    /***
     * @method pad([place] = 0, [sign] = false, [base] = 10)
     * @returns String
     * @short Pads a number with "0" to `place`.
     * @extra [sign] allows you to force the sign as well (+05, etc). [base] can
     *        change the base for numeral conversion.
     *
     * @example
     *
     *   (5).pad(2)        -> '05'
     *   (-5).pad(4)       -> '-0005'
     *   (82).pad(3, true) -> '+082'
     *
     * @param {number} place
     * @param {boolean} [sign]
     * @param {number} [base]
     *
     ***/
    'pad': function(n, place, sign, base) {
      return padNumber(n, place, sign, base);
    },

    /***
     * @method ordinalize()
     * @returns String
     * @short Returns an ordinalized English string, i.e. "1st", "2nd", etc.
     *
     * @example
     *
     *   (1).ordinalize() -> '1st';
     *   (2).ordinalize() -> '2nd';
     *   (8).ordinalize() -> '8th';
     *
     ***/
    'ordinalize': function(n) {
      var num = abs(n), last = +num.toString().slice(-2);
      return n + getOrdinalSuffix(last);
    },

    /***
     * @method toNumber()
     * @returns Number
     * @short Identity function for compatibilty.
     *
     * @example
     *
     *   (420).toNumber() -> 420
     *
     ***/
    'toNumber': function(n) {
      return n.valueOf();
    },

    /***
     * @method round([precision] = 0)
     * @returns Number
     * @short Shortcut for `Math.round` that also allows a `precision`.
     *
     * @example
     *
     *   (3.241).round()  -> 3
     *   (-3.841).round() -> -4
     *   (3.241).round(2) -> 3.24
     *   (3748).round(-2) -> 3800
     *
     * @param {number} [precision]
     *
     ***/
    'round': createRoundingFunction(round),

    /***
     * @method ceil([precision] = 0)
     * @returns Number
     * @short Shortcut for `Math.ceil` that also allows a `precision`.
     *
     * @example
     *
     *   (3.241).ceil()  -> 4
     *   (-3.241).ceil() -> -3
     *   (3.241).ceil(2) -> 3.25
     *   (3748).ceil(-2) -> 3800
     *
     * @param {number} [precision]
     *
     ***/
    'ceil': createRoundingFunction(ceil),

    /***
     * @method floor([precision] = 0)
     * @returns Number
     * @short Shortcut for `Math.floor` that also allows a `precision`.
     *
     * @example
     *
     *   (3.241).floor()  -> 3
     *   (-3.841).floor() -> -4
     *   (3.241).floor(2) -> 3.24
     *   (3748).floor(-2) -> 3700
     *
     * @param {number} [precision]
     *
     ***/
    'floor': createRoundingFunction(floor)

  });

  /***
   * @method [math]()
   * @returns Number
   * @short Math related functions are mapped as shortcuts to numbers and are
   *        identical. Note that `log` provides some special defaults.
   *
   * @set
   *   abs
   *   sin
   *   asin
   *   cos
   *   acos
   *   tan
   *   atan
   *   sqrt
   *   exp
   *   pow
   *
   * @example
   *
   *   (3).pow(3) -> 27
   *   (-3).abs() -> 3
   *   (1024).sqrt() -> 32
   *
   ***/
  function buildMathAliases() {
    defineInstanceSimilar(sugarNumber, 'abs pow sin asin cos acos tan atan exp pow sqrt', function(methods, name) {
      methods[name] = function(n, arg) {
        // Note that .valueOf() here is only required due to a
        // very strange bug in iOS7 that only occurs occasionally
        // in which Math.abs() called on non-primitive numbers
        // returns a completely different number (Issue #400)
        return Math[name](n.valueOf(), arg);
      };
    });
  }

  buildMathAliases();

  /***
   * @module Function
   * @description Lazy, throttled, and memoized functions, delayed functions and
   *              handling of timers, argument currying.
   *
   ***/

  var _lock     = privatePropertyAccessor('lock');
  var _timers   = privatePropertyAccessor('timers');
  var _partial  = privatePropertyAccessor('partial');
  var _canceled = privatePropertyAccessor('canceled');

  var createInstanceFromPrototype = Object.create || function(prototype) {
    var ctor = function() {};
    ctor.prototype = prototype;
    return new ctor;
  };

  function setDelay(fn, ms, after, scope, args) {
    // Delay of infinity is never called of course...
    ms = coercePositiveInteger(ms || 0);
    if (!_timers(fn)) {
      _timers(fn, []);
    }
    // This is a workaround for <= IE8, which apparently has the
    // ability to call timeouts in the queue on the same tick (ms?)
    // even if functionally they have already been cleared.
    _canceled(fn, false);
    _timers(fn).push(setTimeout(function() {
      if (!_canceled(fn)) {
        after.apply(scope, args || []);
      }
    }, ms));
  }

  function cancelFunction(fn) {
    var timers = _timers(fn), timer;
    if (isArray(timers)) {
      while(timer = timers.shift()) {
        clearTimeout(timer);
      }
    }
    _canceled(fn, true);
    return fn;
  }

  function createLazyFunction(fn, ms, immediate, limit) {
    var queue = [], locked = false, execute, rounded, perExecution, result;
    ms = ms || 1;
    limit = limit || Infinity;
    rounded = ceil(ms);
    perExecution = round(rounded / ms) || 1;
    execute = function() {
      var queueLength = queue.length, maxPerRound;
      if (queueLength == 0) return;
      // Allow fractions of a millisecond by calling
      // multiple times per actual timeout execution
      maxPerRound = max(queueLength - perExecution, 0);
      while(queueLength > maxPerRound) {
        // Getting uber-meta here...
        result = Function.prototype.apply.apply(fn, queue.shift());
        queueLength--;
      }
      setDelay(lazy, rounded, function() {
        locked = false;
        execute();
      });
    };
    function lazy() {
      // If the execution has locked and it's immediate, then
      // allow 1 less in the queue as 1 call has already taken place.
      if (queue.length < limit - (locked && immediate ? 1 : 0)) {
        // Optimized: no leaking arguments
        var args = []; for(var $i = 0, $len = arguments.length; $i < $len; $i++) args.push(arguments[$i]);
        queue.push([this, args]);
      }
      if (!locked) {
        locked = true;
        if (immediate) {
          execute();
        } else {
          setDelay(lazy, rounded, execute);
        }
      }
      // Return the memoized result
      return result;
    }
    return lazy;
  }

  // Collecting arguments in an array instead of
  // passing back the arguments object which will
  // deopt this function in V8.
  function collectArguments() {
    var args = arguments, i = args.length, arr = new Array(i);
    while (i--) {
      arr[i] = args[i];
    }
    return arr;
  }

  function createHashedMemoizeFunction(fn, hashFn, limit) {
    var map = {}, refs = [], counter = 0;
    return function() {
      var hashObj = hashFn.apply(this, arguments);
      var key = serializeInternal(hashObj, refs);
      if (hasOwn(map, key)) {
        return getOwn(map, key);
      }
      if (counter === limit) {
        map = {};
        refs = [];
        counter = 0;
      }
      counter++;
      return map[key] = fn.apply(this, arguments);
    };
  }

  defineInstance(sugarFunction, {

    /***
     * @method lazy([ms] = 1, [immediate] = false, [limit] = Infinity)
     * @returns Function
     * @short Creates a lazy function that, when called repeatedly, will queue
     *        execution and wait [ms] milliseconds to execute.
     * @extra If [immediate] is `true`, first execution will happen immediately,
     *        then lock. If [limit] is a fininte number, calls past [limit] will
     *        be ignored while execution is locked. Compare this to `throttle`,
     *        which will execute only once per [ms] milliseconds. Note that [ms]
     *        can also be a fraction. Calling `cancel` on a lazy function will
     *        clear the entire queue.
     *
     * @example
     *
     *   var fn = logHello.lazy(250);
     *   runTenTimes(fn); -> Logs 10 times each time 250ms later
     *
     *   var fn = logHello.lazy(250, false, 5);
     *   runTenTimes(fn); -> Logs 5 times each time 250ms later
     *
     * @param {number} [ms]
     * @param {number} [limit]
     * @param {boolean} [immediate]
     *
     ***/
    'lazy': function(fn, ms, immediate, limit) {
      return createLazyFunction(fn, ms, immediate, limit);
    },

    /***
     * @method throttle([ms] = 1)
     * @returns Function
     * @short Creates a "throttled" version of the function that will only be
     *        executed once per `ms` milliseconds.
     * @extra This is functionally equivalent to calling `lazy` with a [limit] of
     *        `1` and [immediate] as `true`. `throttle` is appropriate when you
     *        want to make sure a function is only executed at most once for a
     *        given duration.
     *
     * @example
     *
     *   var fn = logHello.throttle(50);
     *   runTenTimes(fn);
     *
     * @param {number} [ms]
     *
     ***/
    'throttle': function(fn, ms) {
      return createLazyFunction(fn, ms, true, 1);
    },

    /***
     * @method debounce([ms] = 1)
     * @returns Function
     * @short Creates a "debounced" function that postpones its execution until
     *        after `ms` milliseconds have passed.
     * @extra This method is useful to execute a function after things have
     *        "settled down". A good example of this is when a user tabs quickly
     *        through form fields, execution of a heavy operation should happen
     *        after a few milliseconds when they have "settled" on a field.
     *
     * @example
     *
     *   var fn = logHello.debounce(250)
     *   runTenTimes(fn); -> called once 250ms later
     *
     * @param {number} [ms]
     *
     ***/
    'debounce': function(fn, ms) {
      function debounced() {
        // Optimized: no leaking arguments
        var args = []; for(var $i = 0, $len = arguments.length; $i < $len; $i++) args.push(arguments[$i]);
        cancelFunction(debounced);
        setDelay(debounced, ms, fn, this, args);
      }
      return debounced;
    },

    /***
     * @method cancel()
     * @returns Function
     * @short Cancels a delayed function scheduled to be run.
     * @extra `delay`, `lazy`, `throttle`, and `debounce` can all set delays.
     *
     * @example
     *
     *   logHello.delay(500).cancel() -> never logs
     *
     ***/
    'cancel': function(fn) {
      return cancelFunction(fn);
    },

    /***
     * @method after(n)
     * @returns Function
     * @short Creates a function that will execute after `n` calls.
     * @extra `after` is useful for running a final callback after a specific
     *        number of operations, often when the order in which the operations
     *        will complete is unknown. The created function will be passed an
     *        array of the arguments that it has collected from each after `n`.
     *        Note that the function will execute on every call after `n`.
     *        Use `once` in conjunction with this method to prevent being
     *        triggered by subsequent calls.
     *
     * @example
     *
     *   var fn = logHello.after(5);
     *   runTenTimes(fn); -> logs 6 times
     *
     *   var fn = logHello.once().after(5)
     *   runTenTimes(fn); -> logs once
     *
     * @param {number} [n]
     *
     ***/
    'after': function(fn, num) {
      var count = 0, collectedArgs = [];
      num = coercePositiveInteger(num);
      return function() {
        // Optimized: no leaking arguments
        var args = []; for(var $i = 0, $len = arguments.length; $i < $len; $i++) args.push(arguments[$i]);
        collectedArgs.push(args);
        count++;
        if (count >= num) {
          return fn.call(this, collectedArgs);
        }
      };
    },

    /***
     * @method once()
     * @returns Function
     * @short Creates a function that will execute only once and store the result.
     * @extra `once` is useful for creating functions that will cache the result
     *        of an expensive operation and use it on subsequent calls. Also it
     *        can be useful for creating initialization functions that only need
     *        to be run once.
     *
     * @example
     *
     *   var fn = logHello.once();
     *   runTenTimes(fn); -> logs once
     *
     ***/
    'once': function(fn) {
      var called = false, val;
      return function() {
        if (called) {
          return val;
        }
        called = true;
        return val = fn.apply(this, arguments);
      };
    },

    /***
     * @method memoize([hashFn], [limit])
     * @returns Function
     * @short Creates a function that will memoize results for unique calls.
     * @extra `memoize` can be thought of as a more powerful `once`. Where `once`
     *        will only call a function once ever, memoized functions will be
     *        called once per unique call. A "unique call" is determined by the
     *        return value of [hashFn], which is passed the arguments of each call.
     *        If [hashFn] is undefined, it will deeply serialize all arguments,
     *        such that any different argument signature will result in a unique
     *        call. [hashFn] may be a string (allows `deep properties`) that acts
     *        as a shortcut to return a property of the first argument passed.
     *        [limit] sets an upper limit on memoized results. The default is no
     *        limit, meaning that unique calls will continue to memoize results.
     *        For most use cases this is fine, however [limit] is useful for more
     *        persistent (often server-side) applications for whom memory leaks
     *        are a concern.
     *
     * @example
     *
     *   var fn = logHello.memoize();
     *   fn(1); fn(1); fn(2); -> logs twice, memoizing once
     *
     *   var fn = calculateUserBalance.memoize('id');
     *   fn(Harry); fn(Mark); fn(Mark); -> logs twice, memoizing once
     *
     * @param {string|Function} [hashFn]
     * @param {number} [limit]
     *
     ***/
    'memoize': function(fn, arg1, arg2) {
      var hashFn, limit, prop;
      if (isNumber(arg1)) {
        limit = arg1;
      } else {
        hashFn = arg1;
        limit  = arg2;
      }
      if (isString(hashFn)) {
        prop = hashFn;
        hashFn = function(obj) {
          return deepGetProperty(obj, prop);
        };
      } else if (!hashFn) {
        hashFn = collectArguments;
      }
      return createHashedMemoizeFunction(fn, hashFn, limit);
    },

    /***
     * @method lock([n])
     * @returns Function
     * @short Locks the number of arguments accepted by the function.
     * @extra If not passed, [n] will be the length of the function. This method
     *        can be called on functions created by `partial`, in which case it
     *        will lock the total arguments during execution.
     *
     * @example
     *
     *   logArgs.lock(2)(1,2,3)      -> logs 1,2
     *
     * @param {number} [n]
     *
     ***/
    'lock': function(fn, n) {
      var lockedFn;
      if (_partial(fn)) {
        _lock(fn, isNumber(n) ? n : null);
        return fn;
      }
      lockedFn = function() {
        arguments.length = min(_lock(lockedFn), arguments.length);
        return fn.apply(this, arguments);
      };
      _lock(lockedFn, isNumber(n) ? n : fn.length);
      return lockedFn;
    }

  });

  defineInstanceWithArguments(sugarFunction, {

    /***
     * @method partial([arg1], [arg2], ...)
     * @returns Function
     * @short Returns a new version of the function which has part of its arguments
     *        pre-emptively filled in, also known as "currying".
     * @extra `undefined` can be passed as any argument, and is a placeholder that
     *        will be replaced with arguments passed when the function is executed.
     *        This allows currying of arguments even when they occur toward the end
     *        of an argument list (the example demonstrates this more clearly).
     *
     * @example
     *
     *   logArgs.partial(undefined, 'b')('a') -> logs a, b
     *
     * @param {any} [arg1]
     * @param {any} [arg2]
     *
     ***/
    'partial': function(fn, curriedArgs) {
      var curriedLen = curriedArgs.length;
      var partialFn = function() {
        var argIndex = 0, applyArgs = [], self = this, lock = _lock(partialFn), result, i;
        for (i = 0; i < curriedLen; i++) {
          var arg = curriedArgs[i];
          if (isDefined(arg)) {
            applyArgs[i] = arg;
          } else {
            applyArgs[i] = arguments[argIndex++];
          }
        }
        for (i = argIndex; i < arguments.length; i++) {
          applyArgs.push(arguments[i]);
        }
        if (lock === null) {
          lock = curriedLen;
        }
        if (isNumber(lock)) {
          applyArgs.length = min(applyArgs.length, lock);
        }
        // If the bound "this" object is an instance of the partialed
        // function, then "new" was used, so preserve the prototype
        // so that constructor functions can also be partialed.
        if (self instanceof partialFn) {
          self = createInstanceFromPrototype(fn.prototype);
          result = fn.apply(self, applyArgs);
          // An explicit return value is allowed from constructors
          // as long as they are of "object" type, so return the
          // correct result here accordingly.
          return isObjectType(result) ? result : self;
        }
        return fn.apply(self, applyArgs);
      };
      _partial(partialFn, true);
      return partialFn;
    },

    /***
     * @method delay([ms] = 1, [arg1], [arg2], ...)
     * @returns Function
     * @short Executes the function after `ms` milliseconds.
     * @extra Returns a reference to itself. `delay` is also a way to execute non-
     *        blocking operations that will wait until the CPU is free. Delayed
     *        functions can be canceled using the `cancel` method. Can also curry
     *        arguments passed in after `ms`.
     *
     * @example
     *
     *   logHello.delay(500)     -> logs after 500ms
     *   logArgs.delay(500, 'a') -> logs "a" after 500ms
     *
     * @param {number} [ms]
     * @param {any} [arg1]
     * @param {any} [arg2]
     *
     ***/
    'delay': function(fn, ms, args) {
      setDelay(fn, ms, fn, fn, args);
      return fn;
    },

    /***
     * @method every([ms] = 1, [arg1], [arg2], ...)
     * @returns Function
     * @short Executes the function every `ms` milliseconds.
     * @extra Returns a reference to itself. `every` uses `setTimeout`, which
     *        means that you are guaranteed a period of idle time equal to [ms]
     *        after execution has finished. Compare this to `setInterval` which
     *        will try to run a function every [ms], even when execution itself
     *        takes up a portion of that time. In most cases avoiding `setInterval`
     *        is better as calls won't "back up" when the CPU is under strain,
     *        however this also means that calls are less likely to happen at
     *        exact intervals of [ms], so the use case here should be considered.
     *        Additionally, `every` can curry arguments passed in after [ms], and
     *        also be canceled with `cancel`.
     *
     * @example
     *
     *   logHello.every(1000)        -> logs every second
     *   logArgs.every(1000, 'Hola') -> logs 'hola' every second
     *
     * @param {number} [ms]
     * @param {any} [arg1]
     * @param {any} [arg2]
     *
     ***/
    'every': function(fn, ms, args) {
      function execute () {
        // Set the delay first here, so that cancel
        // can be called within the executing function.
        setDelay(fn, ms, execute);
        fn.apply(fn, args);
      }
      setDelay(fn, ms, execute);
      return fn;
    }

  });

  /***
   * @module RegExp
   * @description RegExp escaping and flag manipulation.
   *
   * Note here that methods on the RegExp class like .exec and .test will fail in
   * the current version of SpiderMonkey being used by CouchDB when using
   * shorthand regex notation like /foo/. This is the reason for the intermixed
   * use of shorthand and compiled regexes here. If you're using JS in CouchDB, it
   * is safer to ALWAYS compile your regexes from a string.
   *
   ***/

  defineStatic(sugarRegExp, {

    /***
     * @method escape([str] = '')
     * @returns String
     * @static
     * @short Escapes all RegExp tokens in a string.
     *
     * @example
     *
     *   RegExp.escape('really?')      -> 'really\?'
     *   RegExp.escape('yes.')         -> 'yes\.'
     *   RegExp.escape('(not really)') -> '\(not really\)'
     *
     * @param {string} str
     *
     ***/
    'escape': function(str) {
      return escapeRegExp(str);
    }

  });

  defineInstance(sugarRegExp, {

    /***
     * @method getFlags()
     * @returns String
     * @short Returns the flags of the regex as a string.
     *
     * @example
     *
     *   /texty/gim.getFlags() -> 'gim'
     *
     ***/
    'getFlags': function(r) {
      return getRegExpFlags(r);
    },

    /***
     * @method setFlags(flags)
     * @returns RegExp
     * @short Creates a copy of the regex with `flags` set.
     *
     * @example
     *
     *   /texty/.setFlags('gim') -> now has global, ignoreCase, and multiline set
     *
     * @param {string} flags
     *
     ***/
    'setFlags': function(r, flags) {
      return RegExp(r.source, flags);
    },

    /***
     * @method addFlags(flags)
     * @returns RegExp
     * @short Creates a copy of the regex with `flags` added.
     *
     * @example
     *
     *   /texty/.addFlags('g')  -> /texty/g
     *   /texty/.addFlags('im') -> /texty/im
     *
     * @param {string} flags
     *
     ***/
    'addFlags': function(r, flags) {
      return RegExp(r.source, getRegExpFlags(r, flags));
    },

    /***
     * @method removeFlags(flags)
     * @returns RegExp
     * @short Creates a copy of the regex with `flags` removed.
     *
     * @example
     *
     *   /texty/gim.removeFlags('g')  -> /texty/im
     *   /texty/gim.removeFlags('im') -> /texty/g
     *
     * @param {string} flags
     *
     ***/
    'removeFlags': function(r, flags) {
      var reg = allCharsReg(flags);
      return RegExp(r.source, getRegExpFlags(r).replace(reg, ''));
    }

  });

  /***
   * @module Range
   * @description Date, Number, and String ranges that can be manipulated and compared,
   *              or enumerate over specific points within the range.
   *
   ***/

  var DURATION_UNITS = 'year|month|week|day|hour|minute|second|millisecond';
  var DURATION_REG   = RegExp('(\\d+)?\\s*('+ DURATION_UNITS +')s?', 'i');

  var MULTIPLIERS = {
    'Hours': 60 * 60 * 1000,
    'Minutes': 60 * 1000,
    'Seconds': 1000,
    'Milliseconds': 1
  };

  var PrimitiveRangeConstructor = function(start, end) {
    return new Range(start, end);
  };

  function Range(start, end) {
    this.start = cloneRangeMember(start);
    this.end   = cloneRangeMember(end);
  }

  function getRangeMemberNumericValue(m) {
    return isString(m) ? m.charCodeAt(0) : m;
  }

  function getRangeMemberPrimitiveValue(m) {
    if (m == null) return m;
    return isDate(m) ? m.getTime() : m.valueOf();
  }

  function getPrecision(n) {
    var split = periodSplit(n.toString());
    return split[1] ? split[1].length : 0;
  }

  function getGreaterPrecision(n1, n2) {
    return max(getPrecision(n1), getPrecision(n2));
  }

  function cloneRangeMember(m) {
    if (isDate(m)) {
      return new Date(m.getTime());
    } else {
      return getRangeMemberPrimitiveValue(m);
    }
  }

  function isValidRangeMember(m) {
    var val = getRangeMemberPrimitiveValue(m);
    return (!!val || val === 0) && valueIsNotInfinite(m);
  }

  function valueIsNotInfinite(m) {
    return m !== -Infinity && m !== Infinity;
  }

  function rangeIsValid(range) {
    return isValidRangeMember(range.start) &&
           isValidRangeMember(range.end) &&
           typeof range.start === typeof range.end;
  }

  function rangeEvery(range, step, countOnly, fn) {
    var increment,
        precision,
        dio,
        unit,
        start   = range.start,
        end     = range.end,
        inverse = end < start,
        current = start,
        index   = 0,
        result  = [];

    if (!rangeIsValid(range)) {
      return [];
    }
    if (isFunction(step)) {
      fn = step;
      step = null;
    }
    step = step || 1;
    if (isNumber(start)) {
      precision = getGreaterPrecision(start, step);
      increment = function() {
        return incrementNumber(current, step, precision);
      };
    } else if (isString(start)) {
      increment = function() {
        return incrementString(current, step);
      };
    } else if (isDate(start)) {
      dio  = getDateIncrementObject(step);
      step = dio[0];
      unit = dio[1];
      increment = function() {
        return incrementDate(current, step, unit);
      };
    }
    // Avoiding infinite loops
    if (inverse && step > 0) {
      step *= -1;
    }
    while(inverse ? current >= end : current <= end) {
      if (!countOnly) {
        result.push(current);
      }
      if (fn) {
        fn(current, index, range);
      }
      current = increment();
      index++;
    }
    return countOnly ? index - 1 : result;
  }

  function getDateIncrementObject(amt) {
    var match, val, unit;
    if (isNumber(amt)) {
      return [amt, 'Milliseconds'];
    }
    match = amt.match(DURATION_REG);
    val = +match[1] || 1;
    unit = simpleCapitalize(match[2].toLowerCase());
    if (unit.match(/hour|minute|second/i)) {
      unit += 's';
    } else if (unit === 'Year') {
      unit = 'FullYear';
    } else if (unit === 'Week') {
      unit = 'Date';
      val *= 7;
    } else if (unit === 'Day') {
      unit = 'Date';
    }
    return [val, unit];
  }

  function incrementDate(src, amount, unit) {
    var mult = MULTIPLIERS[unit], d;
    if (mult) {
      d = new Date(src.getTime() + (amount * mult));
    } else {
      d = new Date(src);
      callDateSet(d, unit, callDateGet(src, unit) + amount);
    }
    return d;
  }

  function incrementString(current, amount) {
    return chr(current.charCodeAt(0) + amount);
  }

  function incrementNumber(current, amount, precision) {
    return withPrecision(current + amount, precision);
  }

  function rangeClamp(range, obj) {
    var clamped,
        start = range.start,
        end = range.end,
        min = end < start ? end : start,
        max = start > end ? start : end;
    if (obj < min) {
      clamped = min;
    } else if (obj > max) {
      clamped = max;
    } else {
      clamped = obj;
    }
    return cloneRangeMember(clamped);
  }

  defineOnPrototype(Range, {

    /***
     * @method toString()
     * @returns String
     * @short Returns a string representation of the range.
     *
     * @example
     *
     *   Number.range(1, 5).toString() -> 1..5
     *   janToMay.toString()           -> January 1, xxxx..May 1, xxxx
     *
     ***/
    'toString': function() {
      return rangeIsValid(this) ? this.start + '..' + this.end : 'Invalid Range';
    },

    /***
     * @method isValid()
     * @returns Boolean
     * @short Returns true if the range is valid, false otherwise.
     *
     * @example
     *
     *   janToMay.isValid() -> true
     *   Number.range(NaN, NaN).isValid()                           -> false
     *
     ***/
    'isValid': function() {
      return rangeIsValid(this);
    },

    /***
     * @method span()
     * @returns Number
     * @short Returns the span of the range. If the range is a date range, the
     *        value is in milliseconds.
     * @extra The span includes both the start and the end.
     *
     * @example
     *
     *   Number.range(5, 10).span()  -> 6
     *   Number.range(40, 25).span() -> 16
     *   janToMay.span()             -> 10368000001 (or more depending on leap year)
     *
     ***/
    'span': function() {
      var n = getRangeMemberNumericValue(this.end) - getRangeMemberNumericValue(this.start);
      return rangeIsValid(this) ? abs(n) + 1 : NaN;
    },

    /***
     * @method contains(el)
     * @returns Boolean
     * @short Returns true if `el` is contained inside the range. `el` may be a
     *        value or another range.
     *
     * @example
     *
     *   Number.range(5, 10).contains(7)         -> true
     *   Number.range(5, 10).contains(2)         -> false
     *   janToMay.contains(mar)                  -> true
     *   janToMay.contains(marToAug)             -> false
     *   janToMay.contains(febToApr)             -> true
     *
     * @param {RangeElement} el
     *
     ***/
    'contains': function(el) {
      if (el == null) return false;
      if (el.start && el.end) {
        return el.start >= this.start && el.start <= this.end &&
               el.end   >= this.start && el.end   <= this.end;
      } else {
        return el >= this.start && el <= this.end;
      }
    },

    /***
     * @method every(amount, [fn])
     * @returns Array
     * @short Iterates through the range by `amount`, calling [fn] for each step.
     * @extra Returns an array of each increment visited. For date ranges,
     *        `amount` can also be a string like `"2 days"`. This will step
     *        through the range by incrementing a date object by that specific
     *        unit, and so is generally preferable for vague units such as
     *        `"2 months"`.
     *
     * @callback rangeEveryFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   r    A reference to the range.
     *
     * @example
     *
     *   Number.range(2, 8).every(2) -> [2,4,6,8]
     *   janToMay.every('2 months')  -> [Jan 1, Mar 1, May 1]
     *
     *   sepToOct.every('week', function() {
     *     // Will be called every week from September to October
     *   })
     *
     * @param {string|number} amount
     * @param {rangeEveryFn} [fn]
     * @callbackParam {RangeElement} el
     * @callbackParam {number} i
     * @callbackParam {Range} r
     *
     ***/
    'every': function(amount, fn) {
      return rangeEvery(this, amount, false, fn);
    },

    /***
     * @method toArray()
     * @returns Array
     * @short Creates an array from the range.
     * @extra If the range is a date range, every millisecond between the start
     *        and end dates will be returned. To control this use `every` instead.
     *
     * @example
     *
     *   Number.range(1, 5).toArray() -> [1,2,3,4,5]
     *   Date.range('1 millisecond ago', 'now').toArray() -> [1ms ago, now]
     *
     ***/
    'toArray': function() {
      return rangeEvery(this);
    },

    /***
     * @method union(range)
     * @returns Range
     * @short Returns a new range with the earliest starting point as its start,
     *        and the latest ending point as its end. If the two ranges do not
     *        intersect this will effectively remove the "gap" between them.
     *
     * @example
     *
     *   oneToTen.union(fiveToTwenty) -> 1..20
     *   janToMay.union(marToAug)     -> Jan 1, xxxx..Aug 1, xxxx
     *
     * @param {Range} range
     *
     ***/
    'union': function(range) {
      return new Range(
        this.start < range.start ? this.start : range.start,
        this.end   > range.end   ? this.end   : range.end
      );
    },

    /***
     * @method intersect(range)
     * @returns Range
     * @short Returns a new range with the latest starting point as its start,
     *        and the earliest ending point as its end. If the two ranges do not
     *        intersect this will effectively produce an invalid range.
     *
     * @example
     *
     *   oneToTen.intersect(fiveToTwenty) -> 5..10
     *   janToMay.intersect(marToAug)     -> Mar 1, xxxx..May 1, xxxx
     *
     * @param {Range} range
     *
     ***/
    'intersect': function(range) {
      if (range.start > this.end || range.end < this.start) {
        return new Range(NaN, NaN);
      }
      return new Range(
        this.start > range.start ? this.start : range.start,
        this.end   < range.end   ? this.end   : range.end
      );
    },

    /***
     * @method clone()
     * @returns Range
     * @short Clones the range.
     * @extra Members of the range will also be cloned.
     *
     * @example
     *
     *   Number.range(1, 5).clone() -> Returns a copy of the range.
     *
     ***/
    'clone': function() {
      return new Range(this.start, this.end);
    },

    /***
     * @method clamp(el)
     * @returns Mixed
     * @short Clamps `el` to be within the range if it falls outside.
     *
     * @example
     *
     *   Number.range(1, 5).clamp(8)     -> 5
     *   janToMay.clamp(aug) -> May 1, xxxx
     *
     * @param {RangeElement} el
     *
     ***/
    'clamp': function(el) {
      return rangeClamp(this, el);
    }

  });


  /*** @namespace Number ***/

  defineStatic(sugarNumber, {

    /***
     * @method range([start], [end])
     * @returns Range
     * @static
     * @short Creates a new number range between [start] and [end]. See `ranges`
     *        for more.
     *
     * @example
     *
     *   Number.range(5, 10)
     *   Number.range(20, 15)
     *
     * @param {number} [start]
     * @param {number} [end]
     *
     ***/
    'range': PrimitiveRangeConstructor

  });

  defineInstance(sugarNumber, {

    /***
     * @method upto(num, [step] = 1, [fn])
     * @returns Array
     * @short Returns an array containing numbers from the number up to `num`.
     * @extra Optionally calls [fn] for each number in that array. [step] allows
     *        multiples other than 1. [fn] can be passed in place of [step].
     *
     * @callback rangeEveryFn
     *
     *   el   The element of the current iteration.
     *   i    The index of the current iteration.
     *   r    A reference to the range.
     *
     * @example
     *
     *   (2).upto(6) -> [2, 3, 4, 5, 6]
     *   (2).upto(6, function(n) {
     *     // This function is called 5 times receiving n as the value.
     *   });
     *   (2).upto(8, 2) -> [2, 4, 6, 8]
     *
     * @signature upto(num, [fn])
     * @param {number} num
     * @param {number} [step]
     * @param {rangeEveryFn} [fn]
     * @callbackParam {RangeElement} el
     * @callbackParam {number} i
     * @callbackParam {Range} r
     *
     ***/
    'upto': function(n, num, step, fn) {
      return rangeEvery(new Range(n, num), step, false, fn);
    },

    /***
     * @method clamp([start] = Infinity, [end] = Infinity)
     * @returns Number
     * @short Constrains the number so that it falls on or between [start] and
     *        [end].
     * @extra This will build a range object that has an equivalent `clamp` method.
     *
     * @example
     *
     *   (3).clamp(50, 100)  -> 50
     *   (85).clamp(50, 100) -> 85
     *
     * @param {number} [start]
     * @param {number} [end]
     *
     ***/
    'clamp': function(n, start, end) {
      return rangeClamp(new Range(start, end), n);
    },

    /***
     * @method cap([max] = Infinity)
     * @returns Number
     * @short Constrains the number so that it is no greater than [max].
     * @extra This will build a range object that has an equivalent `cap` method.
     *
     * @example
     *
     *   (100).cap(80) -> 80
     *
     * @param {number} [max]
     *
     ***/
    'cap': function(n, max) {
      return rangeClamp(new Range(undefined, max), n);
    }

  });

  /***
   * @method downto(num, [step] = 1, [fn])
   * @returns Array
   * @short Returns an array containing numbers from the number down to `num`.
   * @extra Optionally calls [fn] for each number in that array. [step] allows
   *        multiples other than 1. [fn] can be passed in place of [step].
   *
   * @callback rangeEveryFn
   *
   *   el   The element of the current iteration.
   *   i    The index of the current iteration.
   *   r    A reference to the range.
   *
   * @example
   *
   *   (8).downto(3) -> [8, 7, 6, 5, 4, 3]
   *   (8).downto(3, function(n) {
   *     // This function is called 6 times receiving n as the value.
   *   });
   *   (8).downto(2, 2) -> [8, 6, 4, 2]
   *
   * @signature upto(num, [fn])
   * @param {number} num
   * @param {number} [step]
   * @param {rangeEveryFn} [fn]
   * @callbackParam {RangeElement} el
   * @callbackParam {number} i
   * @callbackParam {Range} r
   *
   ***/
  alias(sugarNumber, 'downto', 'upto');


  /*** @namespace String ***/

  defineStatic(sugarString, {

    /***
     * @method range([start], [end])
     * @returns Range
     * @static
     * @short Creates a new string range between [start] and [end]. See `ranges`
     *        for more.
     *
     * @example
     *
     *   String.range('a', 'z')
     *   String.range('t', 'm')
     *
     * @param {string} [start]
     * @param {string} [end]
     *
     ***/
    'range': PrimitiveRangeConstructor

  });


  /*** @namespace Date ***/


  var FULL_CAPTURED_DURATION = '((?:\\d+)?\\s*(?:' + DURATION_UNITS + '))s?';

  // Duration text formats
  var RANGE_REG_FROM_TO        = /(?:from)?\s*(.+)\s+(?:to|until)\s+(.+)$/i,
      RANGE_REG_REAR_DURATION  = RegExp('(.+)\\s*for\\s*' + FULL_CAPTURED_DURATION, 'i'),
      RANGE_REG_FRONT_DURATION = RegExp('(?:for)?\\s*'+ FULL_CAPTURED_DURATION +'\\s*(?:starting)?\\s*at\\s*(.+)', 'i');

  var DateRangeConstructor = function(start, end) {
    if (arguments.length === 1 && isString(start)) {
      return createDateRangeFromString(start);
    }
    return new Range(getDateForRange(start), getDateForRange(end));
  };

  function createDateRangeFromString(str) {
    var match, datetime, duration, dio, start, end;
    if (sugarDate.get && (match = str.match(RANGE_REG_FROM_TO))) {
      start = getDateForRange(match[1].replace('from', 'at'));
      end = sugarDate.get(start, match[2]);
      return new Range(start, end);
    }
    if (match = str.match(RANGE_REG_FRONT_DURATION)) {
      duration = match[1];
      datetime = match[2];
    }
    if (match = str.match(RANGE_REG_REAR_DURATION)) {
      datetime = match[1];
      duration = match[2];
    }
    if (datetime && duration) {
      start = getDateForRange(datetime);
      dio = getDateIncrementObject(duration);
      end = incrementDate(start, dio[0], dio[1]);
    } else {
      start = str;
    }
    return new Range(getDateForRange(start), getDateForRange(end));
  }

  function getDateForRange(d) {
    if (isDate(d)) {
      return d;
    } else if (d == null) {
      return new Date();
    } else if (sugarDate.create) {
      return sugarDate.create(d);
    }
    return new Date(d);
  }

  /***
   * @method [dateUnit]()
   * @returns Number
   * @namespace Range
   * @short Returns the span of a date range in the given unit.
   * @extra Higher order units ("days" and greater) walk the date to avoid
   *        discrepancies with ambiguity. Lower order units simply subtract the
   *        start from the end.
   *
   * @set
   *   milliseconds
   *   seconds
   *   minutes
   *   hours
   *   days
   *   weeks
   *   months
   *   years
   *
   * @example
   *
   *   janToMay.months()  -> 4
   *   janToMay.days()    -> 121
   *   janToMay.hours()   -> 2904
   *   janToMay.minutes() -> 220320
   *
   ***/
  function buildDateRangeUnits() {
    var methods = {};
    forEach(DURATION_UNITS.split('|'), function(unit, i) {
      var name = unit + 's', mult, fn;
      if (i < 4) {
        fn = function() {
          return rangeEvery(this, unit, true);
        };
      } else {
        mult = MULTIPLIERS[simpleCapitalize(name)];
        fn = function() {
          return trunc((this.end - this.start) / mult);
        };
      }
      methods[name] = fn;
    });
    defineOnPrototype(Range, methods);
  }

  defineStatic(sugarDate,   {

    /***
     * @method range([start], [end])
     * @returns Range
     * @namespace Date
     * @static
     * @short Creates a new date range between [start] and [end].
     * @extra Arguments may be either dates or strings which will be forwarded to
     *        the date constructor (`create` will be used if present in the build).
     *        If either [start] or [end] are undefined, they will default to the
     *        current date. This method also accepts an alternate syntax of a
     *        single string describing the range in natural language. See `ranges`
     *        for more.
     *
     * @example
     *
     *   Date.range(jan, may)
     *   Date.range('today', 'tomorrow')
     *   Date.range('now', '5 days ago')
     *   Date.range('last Monday')
     *   Date.range('Monday to Friday')
     *   Date.range('tomorrow from 3pm to 5pm')
     *   Date.range('1 hour starting at 5pm Tuesday')
     *
     * @param {string|Date} [start]
     * @param {string|Date} [end]
     *
     ***/
    'range': DateRangeConstructor

  });

  buildDateRangeUnits();

}).call(this);