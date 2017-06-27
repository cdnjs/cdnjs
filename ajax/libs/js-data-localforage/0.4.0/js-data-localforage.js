/**
* @author Jason Dobry <jason.dobry@gmail.com>
* @file js-data-localforage.js
* @version 0.4.0 - Homepage <http://www.js-data.iojs-data-localforage/>
* @copyright (c) 2014 Jason Dobry 
* @license MIT <https://github.com/js-data/js-data-localforage/blob/master/LICENSE>
*
* @overview My Adapter.
*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.DSLocalForageAdapter=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    var isArray = Array.isArray || function (val) {
        return isKind(val, 'Array');
    };
    module.exports = isArray;


},{"./isKind":2}],2:[function(require,module,exports){
var kindOf = require('./kindOf');
    /**
     * Check if value is from a specific "kind".
     */
    function isKind(val, kind){
        return kindOf(val) === kind;
    }
    module.exports = isKind;


},{"./kindOf":3}],3:[function(require,module,exports){


    var _rKind = /^\[object (.*)\]$/,
        _toString = Object.prototype.toString,
        UNDEF;

    /**
     * Gets the "kind" of value. (e.g. "String", "Number", etc)
     */
    function kindOf(val) {
        if (val === null) {
            return 'Null';
        } else if (val === UNDEF) {
            return 'Undefined';
        } else {
            return _rKind.exec( _toString.call(val) )[1];
        }
    }
    module.exports = kindOf;


},{}],4:[function(require,module,exports){
/**
 * @constant Maximum 32-bit signed integer value. (2^31 - 1)
 */

    module.exports = 2147483647;


},{}],5:[function(require,module,exports){
/**
 * @constant Minimum 32-bit signed integer value (-2^31).
 */

    module.exports = -2147483648;


},{}],6:[function(require,module,exports){
var hasOwn = require('./hasOwn');

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
            var ctor = obj.constructor,
                isProto = !!ctor && obj === ctor.prototype;

            while (key = _dontEnums[i++]) {
                // For constructor, if it is a prototype object the constructor
                // is always non-enumerable unless defined otherwise (and
                // enumerated above).  For non-prototype objects, it will have
                // to be defined on this object, since it cannot be defined on
                // any prototype objects.
                //
                // For other [[DontEnum]] properties, check if the value is
                // different than Object prototype value.
                if (
                    (key !== 'constructor' ||
                        (!isProto && hasOwn(obj, key))) &&
                    obj[key] !== Object.prototype[key]
                ) {
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



},{"./hasOwn":8}],7:[function(require,module,exports){
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



},{"./forIn":6,"./hasOwn":8}],8:[function(require,module,exports){


    /**
     * Safer Object.hasOwnProperty
     */
     function hasOwn(obj, prop){
         return Object.prototype.hasOwnProperty.call(obj, prop);
     }

     module.exports = hasOwn;



},{}],9:[function(require,module,exports){
var forOwn = require('./forOwn');

    /**
     * Get object keys
     */
     var keys = Object.keys || function (obj) {
            var keys = [];
            forOwn(obj, function(val, key){
                keys.push(key);
            });
            return keys;
        };

    module.exports = keys;



},{"./forOwn":7}],10:[function(require,module,exports){
var randInt = require('./randInt');
var isArray = require('../lang/isArray');

    /**
     * Returns a random element from the supplied arguments
     * or from the array (if single argument is an array).
     */
    function choice(items) {
        var target = (arguments.length === 1 && isArray(items))? items : arguments;
        return target[ randInt(0, target.length - 1) ];
    }

    module.exports = choice;



},{"../lang/isArray":1,"./randInt":14}],11:[function(require,module,exports){
var randHex = require('./randHex');
var choice = require('./choice');

  /**
   * Returns pseudo-random guid (UUID v4)
   * IMPORTANT: it's not totally "safe" since randHex/choice uses Math.random
   * by default and sequences can be predicted in some cases. See the
   * "random/random" documentation for more info about it and how to replace
   * the default PRNG.
   */
  function guid() {
    return (
        randHex(8)+'-'+
        randHex(4)+'-'+
        // v4 UUID always contain "4" at this position to specify it was
        // randomly generated
        '4' + randHex(3) +'-'+
        // v4 UUID always contain chars [a,b,8,9] at this position
        choice(8, 9, 'a', 'b') + randHex(3)+'-'+
        randHex(12)
    );
  }
  module.exports = guid;


},{"./choice":10,"./randHex":13}],12:[function(require,module,exports){
var random = require('./random');
var MIN_INT = require('../number/MIN_INT');
var MAX_INT = require('../number/MAX_INT');

    /**
     * Returns random number inside range
     */
    function rand(min, max){
        min = min == null? MIN_INT : min;
        max = max == null? MAX_INT : max;
        return min + (max - min) * random();
    }

    module.exports = rand;


},{"../number/MAX_INT":4,"../number/MIN_INT":5,"./random":15}],13:[function(require,module,exports){
var choice = require('./choice');

    var _chars = '0123456789abcdef'.split('');

    /**
     * Returns a random hexadecimal string
     */
    function randHex(size){
        size = size && size > 0? size : 6;
        var str = '';
        while (size--) {
            str += choice(_chars);
        }
        return str;
    }

    module.exports = randHex;



},{"./choice":10}],14:[function(require,module,exports){
var MIN_INT = require('../number/MIN_INT');
var MAX_INT = require('../number/MAX_INT');
var rand = require('./rand');

    /**
     * Gets random integer inside range or snap to min/max values.
     */
    function randInt(min, max){
        min = min == null? MIN_INT : ~~min;
        max = max == null? MAX_INT : ~~max;
        // can't be max + 0.5 otherwise it will round up if `rand`
        // returns `max` causing it to overflow range.
        // -0.5 and + 0.49 are required to avoid bias caused by rounding
        return Math.round( rand(min - 0.5, max + 0.499999999999) );
    }

    module.exports = randInt;


},{"../number/MAX_INT":4,"../number/MIN_INT":5,"./rand":12}],15:[function(require,module,exports){


    /**
     * Just a wrapper to Math.random. No methods inside mout/random should call
     * Math.random() directly so we can inject the pseudo-random number
     * generator if needed (ie. in case we need a seeded random or a better
     * algorithm than the native one)
     */
    function random(){
        return random.get();
    }

    // we expose the method so it can be swapped if needed
    random.get = Math.random;

    module.exports = random;



},{}],16:[function(require,module,exports){
var JSData;
if (!window && typeof module !== 'undefined' && module.exports) {
  JSData = require('js-data');
} else {
  JSData = window.JSData;
}

var emptyStore = new JSData.DS();
var DSUtils = JSData.DSUtils;
var makePath = DSUtils.makePath;
var deepMixIn = DSUtils.deepMixIn;
var forEach = DSUtils.forEach;
var filter = emptyStore.defaults.defaultFilter;
var guid = require('mout/random/guid');
var keys = require('mout/object/keys');
var P = DSUtils.Promise;

function Defaults() {

}

Defaults.prototype.basePath = '';

function DSLocalForageAdapter(options) {
  options = options || {};
  this.defaults = new Defaults();
  deepMixIn(this.defaults, options);
}

var dsLocalStorageAdapterPrototype = DSLocalForageAdapter.prototype;

dsLocalStorageAdapterPrototype.getPath = function (resourceConfig, options) {
  return makePath(options.basePath || this.defaults.basePath || resourceConfig.basePath, resourceConfig.name);
};

dsLocalStorageAdapterPrototype.getIdPath = function (resourceConfig, options, id) {
  return makePath(options.basePath || this.defaults.basePath || resourceConfig.basePath, resourceConfig.getEndpoint(id, options), id);
};

dsLocalStorageAdapterPrototype.getIds = function (resourceConfig, options) {
  var idsPath = this.getPath(resourceConfig, options);
  return new P(function (resolve) {
    localforage.getItem(idsPath, function (ids) {
      if (ids) {
        return resolve(ids);
      } else {
        return localforage.setItem(idsPath, {}, resolve);
      }
    });
  });
};

dsLocalStorageAdapterPrototype.saveKeys = function (ids, resourceConfig, options) {
  var keysPath = this.getPath(resourceConfig, options);
  return new P(function (resolve) {
    localforage.setItem(keysPath, ids, resolve);
  });
};

dsLocalStorageAdapterPrototype.ensureId = function (id, resourceConfig, options) {
  var _this = this;
  return _this.getIds(resourceConfig, options).then(function (ids) {
    ids[id] = 1;
    return _this.saveKeys(ids, resourceConfig, options);
  });
};

dsLocalStorageAdapterPrototype.removeId = function (id, resourceConfig, options) {
  var _this = this;
  return _this.getIds(resourceConfig, options).then(function (ids) {
    delete ids[id];
    return _this.saveKeys(ids, resourceConfig, options);
  });
};

dsLocalStorageAdapterPrototype.GET = function (key) {
  return new P(function (resolve) {
    localforage.getItem(key, resolve);
  });
};

dsLocalStorageAdapterPrototype.PUT = function (key, value) {
  return this.GET(key).then(function (item) {
    if (item) {
      deepMixIn(item, value);
    }
    return new P(function (resolve) {
      localforage.setItem(key, item || value, resolve);
    });
  });
};

dsLocalStorageAdapterPrototype.DEL = function (key) {
  return new P(function (resolve) {
    localforage.removeItem(key, resolve);
  });
};

dsLocalStorageAdapterPrototype.find = function find(resourceConfig, id, options) {
  options = options || {};
  return this.GET(this.getIdPath(resourceConfig, options, id)).then(function (item) {
    if (!item) {
      return P.reject(new Error('Not Found!'));
    } else {
      return item;
    }
  });
};

dsLocalStorageAdapterPrototype.findAll = function (resourceConfig, params, options) {
  var _this = this;
  options = options || {};
  return _this.getIds(resourceConfig, options).then(function (ids) {
    var idsArray = keys(ids);
    if (!('allowSimpleWhere' in options)) {
      options.allowSimpleWhere = true;
    }
    var tasks = [];
    forEach(idsArray, function (id) {
      tasks.push(new P(function (resolve) {
        localforage.getItem(_this.getIdPath(resourceConfig, options, id), resolve);
      }));
    });
    return P.all(tasks);
  }).then(function (items) {
    return filter.call(emptyStore, items, resourceConfig.name, params, options);
  });
};

dsLocalStorageAdapterPrototype.create = function (resourceConfig, attrs, options) {
  var _this = this;
  var i;
  attrs[resourceConfig.idAttribute] = attrs[resourceConfig.idAttribute] || guid();
  options = options || {};
  return _this.PUT(
    makePath(this.getIdPath(resourceConfig, options, attrs[resourceConfig.idAttribute])),
    attrs
  ).then(function (item) {
      i = item;
      return _this.ensureId(item[resourceConfig.idAttribute], resourceConfig, options);
    }).then(function () {
      return i;
    });
};

dsLocalStorageAdapterPrototype.update = function (resourceConfig, id, attrs, options) {
  var _this = this;
  var i;
  options = options || {};
  return _this.PUT(_this.getIdPath(resourceConfig, options, id), attrs).then(function (item) {
    i = item;
    return _this.ensureId(item[resourceConfig.idAttribute], resourceConfig, options);
  }).then(function () {
    return i;
  });
};

dsLocalStorageAdapterPrototype.updateAll = function (resourceConfig, attrs, params, options) {
  var _this = this;
  return _this.findAll(resourceConfig, params, options).then(function (items) {
    var tasks = [];
    forEach(items, function (item) {
      tasks.push(_this.update(resourceConfig, item[resourceConfig.idAttribute], attrs, options));
    });
    return P.all(tasks);
  });
};

dsLocalStorageAdapterPrototype.destroy = function (resourceConfig, id, options) {
  var _this = this;
  options = options || {};
  return _this.DEL(_this.getIdPath(resourceConfig, options, id)).then(function () {
    return _this.removeId(id, resourceConfig, options);
  }).then(function () {
    return null;
  });
};

dsLocalStorageAdapterPrototype.destroyAll = function (resourceConfig, params, options) {
  var _this = this;
  return _this.findAll(resourceConfig, params, options).then(function (items) {
    var tasks = [];
    forEach(items, function (item) {
      tasks.push(_this.destroy(resourceConfig, item[resourceConfig.idAttribute], options));
    });
    return P.all(tasks);
  });
};

module.exports = DSLocalForageAdapter;

},{"js-data":"js-data","mout/object/keys":9,"mout/random/guid":11}]},{},[16])(16)
});