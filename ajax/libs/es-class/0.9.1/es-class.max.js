/*!
Copyright (C) 2014 by Andrea Giammarchi - @WebReflection

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
    WITH = 'with',

    // used to copy non enumerable properties on IE
    nonEnumerables = [
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ],

    // IE < 9 bug only
    hasIEEnumerableBug = !{valueOf:0}[nonEnumerables[2]](nonEnumerables[5]),

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

    // basic ad-hoc private fallback for old browsers
    // use es5-shim if you want a properly patched polyfill
    gOPD = Object.getOwnPropertyDescriptor || function (object, key) {
        return {value: object[key]};
    },

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

    // used to avoid setting `arguments` and other function properties
    // when public static are copied over
    nativeFunctionOPN = new RegExp('^(?:' + gOPN(function () {}).join('|') + ')$'),

    superRegExp = /\bsuper\b/.test(function () {
      // this test should never be minifier sensistive
      this['super']();
    }) ? /\bsuper\b/ : /.*/
    // In 2010 Opera 10.5 for Linux Debian 6
    // goes nut with methods to string representation,
    // truncating pieces of text in an unpredictable way.
    // If you are targeting such browser
    // be aware that super invocation might fail.
    // This is the only exception I could find
    // from year 2000 to modern days browsers
    // plus everything else would work just fine.

  ;

  // verified broken IE8
  try {
    defineProperty({}, '{}', {});
  } catch(o_O) {
    defineProperty = function (object, name, descriptor) {
      object[name] = descriptor.value;
      return object;
    };
  }

  // copy all imported enumerable methods and properties
  function addMixins(mixins, target, inherits) {
    for (var
      source,
      init = [],
      i = 0; i < mixins.length; i++
    ) {
      source = mixins[i];
      if (hOP.call(source, INIT)) {
        init.push(source[INIT]);
      }
      copyOwn(source, target, inherits, false, false);
    }
    return init;
  }

  // configure source own properties in the target
  function copyOwn(source, target, inherits, publicStatic, allowInit) {
    for (var
      key,
      noFunctionCheck = typeof source !== 'function',
      names = gOPN(source),
      i = 0; i < names.length; i++
    ) {
      key = names[i];
      if (
        (noFunctionCheck || !nativeFunctionOPN.test(key)) &&
        isNotASpecialKey(key, allowInit)
      ) {
        if (hOP.call(target, key)) {
          warn('duplicated: ' + key);
        }
        setProperty(inherits, target, key, gOPD(source, key), publicStatic);
      }
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

  // is key is UPPER_CASE and the property is public static
  // it will define the property as non configurable and non writable
  function isConfigurable(key, publicStatic) {
    return publicStatic ? !/^[A-Z_]+$/.test(key) : true;
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

  // set a property via defineProperty using a common descriptor
  // only if properties where not defined yet.
  // If publicStatic is true, properties are both non configurable and non writable
  function setProperty(inherits, target, key, descriptor, publicStatic) {
    var
      hasValue = hOP.call(descriptor, 'value'),
      configurable,
      value
    ;
    if (publicStatic) {
      if (hOP.call(target, key)) {
        return;
      }
    } else if (hasValue) {
      value = descriptor.value;
      if (typeof value === 'function' && superRegExp.test(value)) {
        descriptor.value = wrap(inherits, key, value, publicStatic);
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
          warn(key + ' is not implemented');
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
    if (hOP.call(descriptor, gs) && superRegExp.test(descriptor[gs])) {
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
      hasSuper = hasParent && hasConstructor && superRegExp.test(constructor),
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
    return constructor;
  };

}(Object));