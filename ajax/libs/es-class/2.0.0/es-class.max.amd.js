/*!
Copyright (C) 2015 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
define(function () {
var Class = Class || (function (Object) {
  'use strict';

  /*! (C) Andrea Giammarchi - MIT Style License */

  var
    // shortcuts for minifiers and ES3 private keywords too
    CONSTRUCTOR = 'constructor',
    EXTENDS = 'extends',
    IMPLEMENTS = 'implements',
    INIT = 'init',
    PROTOTYPE = 'prototype',
    STATIC = 'static',
    SUPER = 'super',
    VALUE = 'value',
    WITH = 'with',

    // infamous property used as fallback
    // for IE8 and lower only
    PROTO = '__proto__',

    // used to copy non enumerable properties on IE
    nonEnumerables = [
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ],

    // Espruino 1.7x does not have (yet) Object.prototype.propertyIsEnumerable
    propertyIsEnumerable = {}[nonEnumerables[2]] || function (p) {
      for (var k in this) if (p === k) return this.hasOwnProperty(p);
      return false;
    },

    // IE < 9 bug only
    hasIEEnumerableBug = !propertyIsEnumerable.call({valueOf:0}, nonEnumerables[5]),

    // shortcut for own properties
    hOP = Object[nonEnumerables[0]],

    // basic ad-hoc private fallback for old browsers
    // use es5-shim if you want a properly patched polyfill
    create = Object.create || function (proto) {
      /*jshint newcap: false */
      var isInstance = this instanceof create;
      create[PROTOTYPE] = isInstance ? createPrototype : proto;
      return isInstance ? this : new create();
    },

    // very old browsers actually work better
    // without assigning null as prototype
    createPrototype = create[PROTOTYPE],

    // redefined if not present
    defineProperty = Object.defineProperty,

    // redefined if not present
    gOPD = Object.getOwnPropertyDescriptor,

    // basic ad-hoc private fallback for old browsers
    // use es5-shim if you want a properly patched polyfill
    gOPN = Object.getOwnPropertyNames || function (object) {
        var names = [], i, key;
        for (key in object) {
          if (hOP.call(object, key)) {
            names.push(key);
          }
        }
        if (hasIEEnumerableBug) {
          for (i = 0; i < nonEnumerables.length; i++) {
            key = nonEnumerables[i];
            if (hOP.call(object, key)) {
              names.push(key);
            }
          }
        }
        return names;
    },

    // basic ad-hoc private fallback for old browsers
    // returns empty Array if nonexistent
    gOPS = Object.getOwnPropertySymbols || function () {
      return [];
    },

    // needed to verify the existence
    getPrototypeOf = Object.getPrototypeOf,

    // needed to allow Classes as traits
    gPO = getPrototypeOf || function (o) {
      return o[PROTO] || null;
    },

    // equivalent of Reflect.ownKeys
    oK = function (o) {
      return gOPN(o).concat(gOPS(o));
    },

    // used to filter mixin  Symbol
    isArray = Array.isArray || function (a) {
      return Object[PROTOTYPE].toString.call(a) === '[object Array]';
    },

    // used to avoid setting `arguments` and other function properties
    // when public static are copied over
    nativeFunctionOPN = gOPN(function () {}).concat('arguments'),
    indexOf = nativeFunctionOPN.indexOf || function (v) {
      for (var i = this.length; i-- && this[i] !== v;) {}
      return i;
    },

    // used to flag classes
    isClassDescriptor = {value: true},

    trustSuper = ('' + function () {
      // this test should never be minifier sensitive
      // or the indexOf check after will fail
      this['super']();
    }).indexOf(SUPER) < 0 ?
      // In 2010 Opera 10.5 for Linux Debian 6
      // goes nut with methods to string representation,
      // truncating pieces of text in an unpredictable way.
      // If you are targeting such browser
      // be aware that super invocation might fail.
      // This is the only exception I could find
      // from year 2000 to modern days browsers
      // plus everything else would work just fine.
      function () { return true; } :
      // all other JS engines should be just fine
      function (method) {
        var
          str = '' + method,
          i = str.indexOf(SUPER)
        ;
        return i < 0 ?
          false :
          isBoundary(str.charCodeAt(i - 1)) &&
          isBoundary(str.charCodeAt(i + 5));
      }
  ;

  // verified broken IE8 or older browsers
  try {
    defineProperty({}, '{}', {});
  } catch(o_O) {
    if ('__defineGetter__' in {}) {
      defineProperty = function (object, name, descriptor) {
        if (hOP.call(descriptor, VALUE)) {
          object[name] = descriptor[VALUE];
        } else {
          if (hOP.call(descriptor, 'get')) {
            object.__defineGetter__(name, descriptor.get);
          }
          if (hOP.call(descriptor, 'set')) {
            object.__defineSetter__(name, descriptor.set);
          }
        }
        return object;
      };
      gOPD = function (object, key) {
        var
          get = object.__lookupGetter__(key),
          set = object.__lookupSetter__(key),
          descriptor = {}
        ;
        if (get || set) {
          if (get) {
            descriptor.get = get;
          }
          if (set) {
            descriptor.set = set;
          }
        } else {
          descriptor[VALUE] = object[key];
        }
        return descriptor;
      };
    } else {
      defineProperty = function (object, name, descriptor) {
        object[name] = descriptor[VALUE];
        return object;
      };
      gOPD = function (object, key) {
        return {value: object[key]};
      };
    }
  }

  // copy all imported enumerable methods and properties
  function addMixins(mixins, target, inherits) {
    for (var
      source,
      init = [],
      i = 0; i < mixins.length; i++
    ) {
      source = transformMixin(mixins[i]);
      if (hOP.call(source, INIT)) {
        init.push(source[INIT]);
      }
      copyOwn(source, target, inherits, false, false);
    }
    return init;
  }

  // deep copy all properties of an object (static objects only)
  function copyDeep(source) {
    for (var
      key, descriptor, value,
      target = create(gPO(source)),
      names = oK(source),
      i = 0; i < names.length; i++
    ) {
      key = names[i];
      descriptor = gOPD(source, key);
      if (hOP.call(descriptor, VALUE)) {
        copyValueIfObject(descriptor, copyDeep);
      }
      defineProperty(target, key, descriptor);
    }
    return target;
  }

  // given two objects, performs a deep copy
  // per each property not present in the target
  // otherwise merges, without overwriting,
  // all properties within the object
  function copyMerged(source, target) {
    for (var
      key, descriptor, value, tvalue,
      names = oK(source),
      i = 0; i < names.length; i++
    ) {
      key = names[i];
      descriptor = gOPD(source, key);
      // target already has this property
      if (hOP.call(target, key)) {
        // verify the descriptor can  be merged
        if (hOP.call(descriptor, VALUE)) {
          value = descriptor[VALUE];
          // which means, verify it's an object
          if (isObject(value)) {
            // in such case, verify the target can be modified
            descriptor = gOPD(target, key);
            // meaning verify it's a data descriptor
            if (hOP.call(descriptor, VALUE)) {
              tvalue = descriptor[VALUE];
              // and it's actually an object
              if (isObject(tvalue)) {
                copyMerged(value, tvalue);
              }
            }
          }
        }
      } else {
        // target has no property at all
        if (hOP.call(descriptor, VALUE)) {
          // copy deep if it's an object
          copyValueIfObject(descriptor, copyDeep);
        }
        defineProperty(target, key, descriptor);
      }
    }
  }

  // configure source own properties in the target
  function copyOwn(source, target, inherits, publicStatic, allowInit) {
    for (var
      key,
      noFunctionCheck = typeof source !== 'function',
      names = oK(source),
      i = 0; i < names.length; i++
    ) {
      key = names[i];
      if (
        (noFunctionCheck || indexOf.call(nativeFunctionOPN, key) < 0) &&
        isNotASpecialKey(key, allowInit)
      ) {
        if (hOP.call(target, key)) {
          warn('duplicated: ' + key.toString());
        }
        setProperty(inherits, target, key, gOPD(source, key), publicStatic);
      }
    }
  }

  // shortcut to copy objects into descriptor.value
  function copyValueIfObject(where, how) {
    var what = where[VALUE];
    if (isObject(what)) {
      where[VALUE] = how(what);
    }
  }


  // return the right constructor analyzing the parent.
  // if the parent is empty there is no need to call it.
  function createConstructor(hasParentPrototype, parent) {
    var Class = function Class() {};
    return hasParentPrototype && ('' + parent) !== ('' + Class) ?
      function Class() {
        return parent.apply(this, arguments);
      } :
      Class
    ;
  }

  // common defineProperty wrapper
  function define(target, key, value, publicStatic) {
    var configurable = isConfigurable(key, publicStatic);
    defineProperty(target, key, {
      enumerable: false, // was: publicStatic,
      configurable: configurable,
      writable: configurable,
      value: value
    });
  }

  // verifies a specific char code is not in [A-Za-z_]
  // used to avoid RegExp for non RegExp aware environment
  function isBoundary(code) {
    return code ?
      (code < 65 || 90 < code) &&
      (code < 97 || 122 < code) &&
      code !== 95 :
      true;
  }

  // if key is UPPER_CASE and the property is public static
  // it will define the property as non configurable and non writable
  function isConfigurable(key, publicStatic) {
    return publicStatic ? !isPublicStatic(key) : true;
  }

  // verifies a key is not special for the class
  function isNotASpecialKey(key, allowInit) {
    return  key !== CONSTRUCTOR &&
            key !== EXTENDS &&
            key !== IMPLEMENTS &&
            // Blackberry 7 and old WebKit bug only:
            //  user defined functions have
            //  enumerable prototype and constructor
            key !== PROTOTYPE &&
            key !== STATIC &&
            key !== SUPER &&
            key !== WITH &&
            (allowInit || key !== INIT);
  }

  // verifies a generic value is actually an object
  function isObject(value) {
    /*jshint eqnull: true */
    return value != null && typeof value === 'object';
  }

  // verifies the entire string is upper case
  // and contains eventually an underscore
  // used to avoid RegExp for non RegExp aware environment
  function isPublicStatic(key) {
    for(var c, i = 0; i < key.length; i++) {
      c = key.charCodeAt(i);
      if ((c < 65 || 90 < c) && c !== 95) {
        return false;
      }
    }
    return true;
  }

  // will eventually convert classes or constructors
  // into trait objects, before assigning them as such
  function transformMixin(trait) {
    if (isObject(trait)) return trait;
    else {
      var i, key, keys, object, proto;
      if (trait.isClass) {
        if (trait.length) {
          warn((trait.name || 'Class') + ' should not expect arguments');
        }
        for (
          object = {init: trait},
          proto = trait.prototype;
          proto && proto !== Object.prototype;
          proto = gPO(proto)
        ) {
          for (i = 0, keys = oK(proto); i < keys.length; i++) {
            key = keys[i];
            if (isNotASpecialKey(key, false) && !hOP.call(object, key)) {
              defineProperty(object, key, gOPD(proto, key));
            }
          }
        }
      } else {
        for (
          i = 0,
          object = {},
          proto = trait({}),
          keys = oK(proto);
          i < keys.length; i++
        ) {
          key = keys[i];
          if (key !== INIT) {
            // if this key is the mixin one
            if (~key.toString().indexOf('mixin:init') && isArray(proto[key])) {
              // set the init simply as own method
              object.init = proto[key][0];
            } else {
              // simply assign the descriptor
              defineProperty(object, key, gOPD(proto, key));
            }
          }
        }
      }
      return object;
    }
  }

  // set a property via defineProperty using a common descriptor
  // only if properties where not defined yet.
  // If publicStatic is true, properties are both non configurable and non writable
  function setProperty(inherits, target, key, descriptor, publicStatic) {
    var
      hasValue = hOP.call(descriptor, VALUE),
      configurable,
      value
    ;
    if (publicStatic) {
      if (hOP.call(target, key)) {
        // in case the value is not a static one
        if (
          inherits &&
          isObject(target[key]) &&
          isObject(inherits[CONSTRUCTOR][key])
        ) {
          copyMerged(inherits[CONSTRUCTOR][key], target[key]);
        }
        return;
      } else if (hasValue) {
        // in case it's an object perform a deep copy
        copyValueIfObject(descriptor, copyDeep);
      }
    } else if (hasValue) {
      value = descriptor[VALUE];
      if (typeof value === 'function' && trustSuper(value)) {
        descriptor[VALUE] = wrap(inherits, key, value, publicStatic);
      }
    } else {
      wrapGetOrSet(inherits, key, descriptor, 'get');
      wrapGetOrSet(inherits, key, descriptor, 'set');
    }
    configurable = isConfigurable(key, publicStatic);
    descriptor.enumerable = false; // was: publicStatic;
    descriptor.configurable = configurable;
    if (hasValue) {
      descriptor.writable = configurable;
    }
    defineProperty(target, key, descriptor);
  }

  // basic check against expected properties or methods
  // used when `implements` is used
  function verifyImplementations(interfaces, target) {
    for (var
      current,
      key,
      i = 0; i < interfaces.length; i++
    ) {
      current = interfaces[i];
      for (key in current) {
        if (hOP.call(current, key) && !hOP.call(target, key)) {
          warn(key.toString() + ' is not implemented');
        }
      }
    }
  }

  // warn if something doesn't look right
  // such overwritten public statics
  // or traits / mixins assigning twice same thing
  function warn(message) {
    try {
      console.warn(message);
    } catch(meh) {
      /*\_(ツ)_*/
    }
  }

  // lightweight wrapper for methods that requires
  // .super(...) invokaction - inspired by old klass.js
  function wrap(inherits, key, method, publicStatic) {
    return function () {
      if (!hOP.call(this, SUPER)) {
        // define it once in order to use
        // fast assignment every other time
        define(this, SUPER, null, publicStatic);
      }
      var
        previous = this[SUPER],
        current = (this[SUPER] = inherits[key]),
        result = method.apply(this, arguments)
      ;
      this[SUPER] = previous;
      return result;
    };
  }

  // get/set shortcut for the eventual wrapper
  function wrapGetOrSet(inherits, key, descriptor, gs, publicStatic) {
    if (hOP.call(descriptor, gs) && trustSuper(descriptor[gs])) {
      descriptor[gs] = wrap(
        gOPD(inherits, key),
        gs,
        descriptor[gs],
        publicStatic
      );
    }
  }

  // the actual Class({ ... }) definition
  return function (description) {
    var
      hasConstructor = hOP.call(description, CONSTRUCTOR),
      hasParent = hOP.call(description, EXTENDS),
      parent = hasParent && description[EXTENDS],
      hasParentPrototype = hasParent && typeof parent === 'function',
      inherits = hasParentPrototype ? parent[PROTOTYPE] : parent,
      constructor = hasConstructor ?
        description[CONSTRUCTOR] :
        createConstructor(hasParentPrototype, parent),
      hasSuper = hasParent && hasConstructor && trustSuper(constructor),
      prototype = hasParent ? create(inherits) : constructor[PROTOTYPE],
      mixins,
      length
    ;
    if (hasSuper) {
      constructor = wrap(inherits, CONSTRUCTOR, constructor, false);
    }
    // add modules/mixins (that might swap the constructor)
    if (hOP.call(description, WITH)) {
      mixins = addMixins([].concat(description[WITH]), prototype, inherits);
      length = mixins.length;
      if (length) {
        constructor = (function (parent) {
          return function () {
            var i = 0;
            while (i < length) mixins[i++].call(this);
            return parent.apply(this, arguments);
          };
        }(constructor));
        constructor[PROTOTYPE] = prototype;
      }
    }
    if (hOP.call(description, STATIC)) {
      // add new public static properties first
      copyOwn(description[STATIC], constructor, inherits, true, true);
    }
    if (hasParent) {
      // in case it's a function
      if (parent !== inherits) {
        // copy possibly inherited statics too
        copyOwn(parent, constructor, inherits, true, true);
      }
      constructor[PROTOTYPE] = prototype;
    }
    if (prototype[CONSTRUCTOR] !== constructor) {
      define(prototype, CONSTRUCTOR, constructor, false);
    }
    // enrich the prototype
    copyOwn(description, prototype, inherits, false, true);
    if (hOP.call(description, IMPLEMENTS)) {
      verifyImplementations([].concat(description[IMPLEMENTS]), prototype);
    }
    if (hasParent && !getPrototypeOf) {
      define(prototype, PROTO, inherits, false);
    }
    return defineProperty(constructor, 'isClass', isClassDescriptor);
  };

}(Object));
  return Class;

});