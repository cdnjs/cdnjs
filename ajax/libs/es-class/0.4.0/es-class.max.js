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
    WITH = 'with',
    INIT = 'init',
    PROTOTYPE = 'prototype',
    STATIC = 'static',
    SUPER = 'super',

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
    // use es5-shim if you want a properly patched Object.create polyfill
    create = Object.create || function (proto) {
      /*jshint newcap: false */
      var isInstance = this instanceof create;
      create[PROTOTYPE] = isInstance ? null : proto;
      return isInstance ? this : new create();
    },

    // redefined if not present
    defineProperty = Object.defineProperty,

    superRegExp = /create/.test(function () {
      create();
    }) ? /\bsuper\b/ : /.*/

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
  // throws if there is any duplicated name in the prototype
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
      copyEnumerables(source, target, inherits, false, false);
    }
    return init;
  }

  function isNotASpecialKey(key, allowInit) {
    return  key !== CONSTRUCTOR &&
            key !== EXTENDS &&
            key !== WITH &&
            key !== STATIC &&
            // Blackberry 7 and old WebKit bug only:
            //  user defined functions have
            //  enumerable prototype and constructor
            key !== PROTOTYPE &&
            (allowInit || key !== INIT);
  }

  // configure enumerable source properties in the target
  function copyEnumerables(source, target, inherits, publicStatic, allowInit) {
    var key, i;
    for (key in source) {
      if (isNotASpecialKey(key, allowInit) && hOP.call(source, key)) {
        if (hOP.call(target, key)) {
          try {
            console.warn('duplicated: ' + key);
          } catch(meh) {
            /*\_(ツ)_*/
          }
        }
        setProperty(inherits, target, key, source[key], publicStatic);
      }
    }
    if (hasIEEnumerableBug) {
      for (i = 0; i < nonEnumerables.length; i++) {
        key = nonEnumerables[i];
        if (hOP.call(source, key)) {
          setProperty(inherits, target, key, source[key], publicStatic);
        }
      }
    }
  }

  function define(target, key, value, publicStatic) {
    return defineProperty(target, key, {
      enumerable: publicStatic,
      configurable: !publicStatic,
      writable: !publicStatic,
      value: value
    });
  }

  function wrap(inherits, target, key, value, publicStatic) {
    return function () {
      var
        current = this[SUPER],
        result = value.apply(
          define(this, SUPER, inherits[key], publicStatic),
          arguments
        )
      ;
      define(this, SUPER, current, publicStatic);
      return result;
    };
  }

  // set a property via defineProperty using a common descriptor
  // only if properties where not defined yet.
  // If publicStatic is true, properties are both non configurable and non writable
  function setProperty(inherits, target, key, value, publicStatic) {
    if (publicStatic) {
      if (hOP.call(target, key)) {
        return target;
      }
    } else {
      if (typeof value === 'function' && superRegExp.test(value)) {
        value = wrap(inherits, target, key, value, publicStatic);
      }
    }
    return define(target, key, value, publicStatic);
  }

  // Class({ ... })
  return function (description) {
    var
      hasConstructor = hOP.call(description, CONSTRUCTOR),
      constructor = hasConstructor ?
        description[CONSTRUCTOR] : function Class() {},
      hasParent = hOP.call(description, EXTENDS),
      parent = hasParent && description[EXTENDS],
      inherits = hasParent && typeof parent === 'function' ?
        parent[PROTOTYPE] : parent,
      prototype = hasParent ?
        setProperty(inherits, create(inherits), CONSTRUCTOR, constructor, false) :
        constructor[PROTOTYPE],
      mixins,
      length
    ;
    if (hOP.call(description, STATIC)) {
      // add new public static properties first
      copyEnumerables(description[STATIC], constructor, inherits, true, true);
    }
    if (hasParent) {
      // in case it's a function
      if (parent !== inherits) {
        // copy possibly inherited statics too
        copyEnumerables(parent, constructor, inherits, true, true);
      }
      constructor[PROTOTYPE] = prototype;
    }
    // add modules/mixins
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
    // enrich the prototype
    copyEnumerables(description, prototype, inherits, false, true);
    return constructor;
  };

}(Object));