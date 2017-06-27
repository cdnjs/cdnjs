//     Fiber.js 1.0.5
//     @author: Kirollos Risk
//
//     Copyright (c) 2012 LinkedIn.
//     All Rights Reserved. Apache Software License 2.0
//     http://www.apache.org/licenses/LICENSE-2.0

(function () {
  /*jshint bitwise: true, camelcase: false, curly: true, eqeqeq: true,
    forin: false, immed: true, indent: 2, latedef: true, newcap: false,
    noarg: true, noempty: false, nonew: true, plusplus: false,
    quotmark: single, regexp: false, undef: true, unused: true, strict: false,
    trailing: true, asi: false, boss: false, debug: false, eqnull: true,
    es5: false, esnext: false, evil: true, expr: false, funcscope: false,
    iterator: false, lastsemic: false, laxbreak: false, laxcomma: false,
    loopfunc: false, multistr: true, onecase: false, proto: false,
    regexdash: false, scripturl: false, smarttabs: false, shadow: true,
    sub: true, supernew: true, validthis: false */

  /*global exports, global, define, module */

  (function (root, factory) {
    if (typeof exports === 'object') {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory(this);
    } else if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(function () {
        return factory(root);
      });
    } else {
      // Browser globals (root is window)
      root.Fiber = factory(root);
    }
  }(this, function (global) {

    // Baseline setup
    // --------------

    // Stores whether the object is being initialized. i.e., whether
    // to run the `init` function, or not.
    var initializing = false,

    // Keep a few prototype references around - for speed access,
    // and saving bytes in the minified version.
    ArrayProto = Array.prototype,

    // Save the previous value of `Fiber`.
    previousFiber = global.Fiber;

    // Helper function to copy properties from one object to the other.
    function copy(from, to) {
      var name;
      for (name in from) {
        if (from.hasOwnProperty(name)) {
          to[name] = from[name];
        }
      }
    }

    // The base `Fiber` implementation.
    function Fiber() {}

    // ###Extend
    //
    // Returns a subclass.
    Fiber.extend = function (fn) {
      // Keep a reference to the current prototye.
      var parent = this.prototype,

      // Invoke the function which will return an object literal used to
      // define the prototype. Additionally, pass in the parent prototype,
      // which will allow instances to use it.
      properties = fn(parent),

      // Stores the constructor's prototype.
      proto;

      // The constructor function for a subclass.
      function child() {
        if (!initializing) {
          // Custom initialization is done in the `init` method.
          this.init.apply(this, arguments);
          // Prevent subsequent calls to `init`. Note: although a `delete
          // this.init` would remove the `init` function from the instance, it
          // would still exist in its super class' prototype.  Therefore,
          // explicitly set `init` to `void 0` to obtain the `undefined`
          // primitive value (in case the global's `undefined` property has
          // been re-assigned).
          this.init = void 0;
        }
      }

      // Instantiate a base class (but only create the instance, without
      // running `init`). And, make every `constructor` instance an instance
      // of `this` and of `constructor`.
      initializing = true;
      proto = child.prototype = new this;
      initializing = false;

      // Add default `init` function, which a class may override; it should
      // call the super class' `init` function (if it exists);
      proto.init = function () {
        if (typeof parent.init === 'function') {
          parent.init.apply(this, arguments);
        }
      };

       // Copy the properties over onto the new prototype.
      copy(properties, proto);

      // Enforce the constructor to be what we expect.
      proto.constructor = child;

      // Keep a reference to the parent prototype.
      // (Note: currently used by decorators and mixins, so that the parent
      // can be inferred).
      child.__base__ = parent;

      // Make this class extendable, this can be overridden by providing a
      // custom extend method on the proto.
      child.extend = child.prototype.extend || Fiber.extend;


      return child;
    };

    // Utilities
    // ---------

    // ###Proxy
    //
    // Returns a proxy object for accessing base methods with a given context.
    //
    // - `base`: the instance' parent class prototype.
    // - `instance`: a Fiber class instance.
    //
    // Overloads:
    //
    // - `Fiber.proxy( instance )`
    // - `Fiber.proxy( base, instance )`
    //
    Fiber.proxy = function (base, instance) {
      var name,
        iface = {},
        wrap;

      // If there's only 1 argument specified, then it is the instance,
      // thus infer `base` from its constructor.
      if (arguments.length === 1) {
        instance = base;
        base = instance.constructor.__base__;
      }

      // Returns a function which calls another function with `instance` as
      // the context.
      wrap = function (fn) {
        return function () {
          return base[fn].apply(instance, arguments);
        };
      };

      // For each function in `base`, create a wrapped version.
      for (name in base) {
        if (base.hasOwnProperty(name) && typeof base[name] === 'function') {
          iface[name] = wrap(name);
        }
      }
      return iface;
    };

    // ###Decorate
    //
    // Decorate an instance with given decorator(s).
    //
    // - `instance`: a Fiber class instance.
    // - `decorator[s]`: the argument list of decorator functions.
    //
    // Note: when a decorator is executed, the argument passed in is the super
    // class' prototype, and the context (i.e. the `this` binding) is the
    // instance.
    //
    //  *Example usage:*
    //
    //     function Decorator( base ) {
    //       // this === obj
    //       return {
    //         greet: function() {
    //           console.log('hi!');
    //         }
    //       };
    //     }
    //
    //     var obj = new Bar(); // Some instance of a Fiber class
    //     Fiber.decorate(obj, Decorator);
    //     obj.greet(); // hi!
    //
    Fiber.decorate = function (instance /*, decorator[s] */) {
      var i,
        // Get the base prototype.
        base = instance.constructor.__base__,
        // Get all the decorators in the arguments.
        decorators = ArrayProto.slice.call(arguments, 1),
        len = decorators.length;

      for (i = 0; i < len; i++) {
        copy(decorators[i].call(instance, base), instance);
      }
    };

    // ###Mixin
    //
    // Add functionality to a Fiber definition
    //
    // - `definition`: a Fiber class definition.
    // - `mixin[s]`: the argument list of mixins.
    //
    // Note: when a mixing is executed, the argument passed in is the super
    // class' prototype (i.e., the base)
    //
    // Overloads:
    //
    // - `Fiber.mixin( definition, mix_1 )`
    // - `Fiber.mixin( definition, mix_1, ..., mix_n )`
    //
    // *Example usage:*
    //
    //     var Definition = Fiber.extend(function(base) {
    //       return {
    //         method1: function(){}
    //       }
    //     });
    //
    //     function Mixin(base) {
    //       return {
    //         method2: function(){}
    //       }
    //     }
    //
    //     Fiber.mixin(Definition, Mixin);
    //     var obj = new Definition();
    //     obj.method2();
    //
    Fiber.mixin = function (definition /*, mixin[s] */) {
      var i,
        // Get the base prototype.
        base = definition.__base__,
        // Get all the mixins in the arguments.
        mixins = ArrayProto.slice.call(arguments, 1),
        len = mixins.length;

      for (i = 0; i < len; i++) {
        copy(mixins[i](base), definition.prototype);
      }
    };

    // ###noConflict
    //
    // Run Fiber.js in *noConflict* mode, returning the `fiber` variable to
    // its previous owner. Returns a reference to the Fiber object.
    Fiber.noConflict = function () {
      global.Fiber = previousFiber;
      return Fiber;
    };

    return Fiber;
  }));
} ());