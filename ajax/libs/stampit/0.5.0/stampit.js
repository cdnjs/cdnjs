(function(e){if("function"==typeof bootstrap)bootstrap("stampit",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeStampit=e}else"undefined"!=typeof window?window.stampit=e():global.stampit=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){


    /**
     * Array forEach
     */
    function forEach(arr, callback, thisObj) {
        if (arr == null) {
            return;
        }
        var i = -1,
            len = arr.length;
        while (++i < len) {
            // we iterate over sparse items since there is no way to make it
            // work properly on IE 7-8. see #64
            if ( callback.call(thisObj, arr[i], i, arr) === false ) {
                break;
            }
        }
    }

    module.exports = forEach;



},{}],2:[function(require,module,exports){
var shimIndexOf = function shimIndexOf() {

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
            "use strict";
            if (this == null) {
                throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = 0;
            if (arguments.length > 1) {
                n = Number(arguments[1]);
                if (n != n) { // shortcut for verifying if it's NaN
                    n = 0;
                } else if (n != 0 && n != Infinity && n != -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        }
    }

}

module.exports = shimIndexOf;

},{}],3:[function(require,module,exports){
/**
 * Stampit
 **
 * Create objects from reusable, composable behaviors.
 **
 * Copyright (c) 2013 Eric Elliott
 * http://opensource.org/licenses/MIT
 **/
'use strict';
var forEach = require('mout/array/forEach');
var mixIn = require('mout/object/mixIn');
var forOwn = require('mout/object/forOwn');
var stringify = require('json-stringify-safe');
var indexOf = require('./indexof'); // shim indexOf for stringify
var mixInChain = require('./mixinchain.js');

var create = function (o) {
  if (arguments.length > 1) {
    throw new Error('Object.create implementation only accepts the first parameter.');
  }
  function F() {}
  F.prototype = o;
  return new F();
};

if(!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}

var extractFunctions = function extractFunctions(arg) {
  var arr = [],
    args = [].slice.call(arguments);

  if (typeof arg === 'function') {
    arr = args.map(function (fn) {
      if (typeof fn === 'function') {
        return fn;
      }
    });
  } else if (typeof arg === 'object') {
    args.forEach(function (obj) {
      forOwn(obj, function (fn) {
        arr.push(fn);
      });
    });
  } else if ( Array.isArray(arg) ) {
    forEach(arg, function (fn) {
      arr.push(fn);
    });
  }
  return arr;
};

/**
 * Return a factory function that will produce new objects using the
 * prototypes that are passed in or composed.
 *
 * @param  {Object} [methods] A map of method names and bodies for delegation.
 * @param  {Object} [state]   A map of property names and values to clone for each new object.
 * @param  {Function} [enclose] A closure (function) used to create private data and privileged methods.
 * @return {Function} factory A factory to produce objects using the given prototypes.
 * @return {Function} factory.create Just like calling the factory function.
 * @return {Object} factory.fixed An object map containing the fixed prototypes.
 * @return {Function} factory.methods Add methods to the methods prototype. Chainable.
 * @return {Function} factory.state Add properties to the state prototype. Chainable.
 * @return {Function} factory.enclose Add or replace the closure prototype. Not chainable.
 */
var stampit = function stampit(methods, state, enclose) {
  var fixed = {
      methods: methods || {},
      state: state ?
          JSON.parse(stringify(state)) :
          {},
      enclose: extractFunctions(enclose)
    },

    factory = function factory(properties) {
      var instance = mixIn(create(fixed.methods || {}),
        fixed.state, properties),
        closures = fixed.enclose;

      forEach(closures, function (fn) {
        if (typeof fn === 'function') {
          instance = fn.call(instance) || instance;
        }
      });

      return instance;
    };

  return mixIn(factory, {
    create: factory,
    fixed: fixed,
    /**
     * Take n objects and add them to the methods prototype.
     * @return {Object} stamp  The factory in question (`this`).
     */
    methods: function methods() {
      var obj = fixed.methods || {},
        args = [obj].concat([].slice.call(arguments));
      fixed.methods = mixInChain.apply(this, args);
      return this;
    },
    /**
     * Take n objects and add them to the state prototype.
     * @return {Object} stamp  The factory in question (`this`).
     */
    state: function state() {
      var obj = fixed.state || {},
        args = [obj].concat([].slice.call(arguments));
      fixed.state = mixIn.apply(this, args);
      return this;
    },
    /**
     * Take n functions, an array of functions, or n objects and add
     * the functions to the enclose prototype.
     * @return {Object} stamp  The factory in question (`this`).
     */
    enclose: function enclose() {
      fixed.enclose = fixed.enclose
        .concat( extractFunctions.apply(null, arguments) );
      return this;
    }
  });
};

/**
 * Take two or more factories produced from stampit() and
 * combine them to produce a new factory. Combining overrides
 * properties with last-in priority.
 *
 * @param {...Function} factory A factory produced by stampit().
 * @return {Function} A new stampit factory composed from arguments.
 */
var compose = function compose() {
  var args = [].slice.call(arguments),
    obj = stampit();

  forEach(args, function (source) {
    if (source) {
      if (source.fixed.methods) {
        obj.fixed.methods = mixInChain({}, obj.fixed.methods,
          source.fixed.methods);
      }

      if (source.fixed.state) {
        obj.fixed.state = mixIn({}, obj.fixed.state,
          source.fixed.state);
      }

      if (source.fixed.enclose) {
        obj.fixed.enclose = obj.fixed.enclose
          .concat(source.fixed.enclose);
      }
    }
  });

  return stampit(obj.fixed.methods, obj.fixed.state,
    obj.fixed.enclose);
};

/**
 * Take an old-fashioned JS constructor and return a stampit stamp
 * that you can freely compose with other stamps.
 * @param  {Function} Constructor 
 * @return {Function}             A composable stampit factory
 *                                (aka stamp).
 */
var convertConstructor = function convertConstructor(Constructor) {
  return stampit().methods(Constructor.prototype).enclose(Constructor);
};

indexOf();

module.exports = mixIn(stampit, {
  compose: compose,
  /**
   * Alias for mixIn
   */
  extend: mixIn,
  /**
   * Take a destination object followed by one or more source objects,
   * and copy the source object properties to the destination object,
   * with last in priority overrides.
   * @param {Object} destination An object to copy properties to.
   * @param {...Object} source An object to copy properties from.
   * @returns {Object}
   */
  mixIn: mixIn,

  convertConstructor: convertConstructor
});

},{"./mixinchain.js":4,"mout/array/forEach":1,"mout/object/mixIn":5,"mout/object/forOwn":6,"./indexof":2,"json-stringify-safe":7}],4:[function(require,module,exports){
var forIn = require('mout/object/forIn');

function copyProp(val, key){
    this[key] = val;
}

module.exports = function mixInChain(target, objects){
    var i = 0,
        n = arguments.length,
        obj;
    while(++i < n){
        obj = arguments[i];
        if (obj != null) {
            forIn(obj, copyProp, target);
        }
    }
    return target;
};

},{"mout/object/forIn":8}],7:[function(require,module,exports){
module.exports = stringify;

function getSerialize (fn, decycle) {
  var seen = [];
  decycle = decycle || function(key, value) {
    return '[Circular]';
  };
  return function(key, value) {
    var ret = value;
    if (typeof value === 'object' && value) {
      if (seen.indexOf(value) !== -1)
        ret = decycle(key, value);
      else
        seen.push(value);
    }
    if (fn) ret = fn(key, ret);
    return ret;
  }
}

function stringify(obj, fn, spaces, decycle) {
  return JSON.stringify(obj, getSerialize(fn, decycle), spaces);
}

stringify.getSerialize = getSerialize;

},{}],5:[function(require,module,exports){
var forOwn = require('./forOwn');

    /**
    * Combine properties from all the objects into first one.
    * - This method affects target object in place, if you want to create a new Object pass an empty object as first param.
    * @param {object} target    Target Object
    * @param {...object} objects    Objects to be combined (0...n objects).
    * @return {object} Target Object.
    */
    function mixIn(target, objects){
        var i = 0,
            n = arguments.length,
            obj;
        while(++i < n){
            obj = arguments[i];
            if (obj != null) {
                forOwn(obj, copyProp, target);
            }
        }
        return target;
    }

    function copyProp(val, key){
        this[key] = val;
    }

    module.exports = mixIn;


},{"./forOwn":6}],6:[function(require,module,exports){
var hasOwn = require('./hasOwn');
var forIn = require('./forIn');

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forOwn(obj, fn, thisObj){
        forIn(obj, function(val, key){
            if (hasOwn(obj, key)) {
                return fn.call(thisObj, obj[key], key, obj);
            }
        });
    }

    module.exports = forOwn;



},{"./hasOwn":9,"./forIn":8}],8:[function(require,module,exports){


    var _hasDontEnumBug,
        _dontEnums;

    function checkDontEnum(){
        _dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ];

        _hasDontEnumBug = true;

        for (var key in {'toString': null}) {
            _hasDontEnumBug = false;
        }
    }

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forIn(obj, fn, thisObj){
        var key, i = 0;
        // no need to check if argument is a real object that way we can use
        // it for arrays, functions, date, etc.

        //post-pone check till needed
        if (_hasDontEnumBug == null) checkDontEnum();

        for (key in obj) {
            if (exec(fn, obj, key, thisObj) === false) {
                break;
            }
        }

        if (_hasDontEnumBug) {
            while (key = _dontEnums[i++]) {
                // since we aren't using hasOwn check we need to make sure the
                // property was overwritten
                if (obj[key] !== Object.prototype[key]) {
                    if (exec(fn, obj, key, thisObj) === false) {
                        break;
                    }
                }
            }
        }
    }

    function exec(fn, obj, key, thisObj){
        return fn.call(thisObj, obj[key], key, obj);
    }

    module.exports = forIn;



},{}],9:[function(require,module,exports){


    /**
     * Safer Object.hasOwnProperty
     */
     function hasOwn(obj, prop){
         return Object.prototype.hasOwnProperty.call(obj, prop);
     }

     module.exports = hasOwn;



},{}]},{},[3])(3)
});
;