/*!
* js-data
* @version 3.0.0-beta.7 - Homepage <http://www.js-data.io/>
* @author js-data project authors
* @copyright (c) 2014-2016 js-data project authors
* @license MIT <https://github.com/js-data/js-data/blob/master/LICENSE>
*
* @overview js-data is a framework-agnostic, datastore-agnostic ORM/ODM for Node.js and the Browser.
*/
var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

babelHelpers.defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

babelHelpers.toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

babelHelpers;

/**
 * Utility methods used by JSData.
 *
 * @example
 * import {utils} from 'js-data'
 * console.log(utils.isString('foo')) // true
 *
 * @namespace utils
 * @type {Object}
 */

var DOMAIN = 'utils';

var INFINITY = 1 / 0;
var MAX_INTEGER = 1.7976931348623157e+308;
var BOOL_TAG = '[object Boolean]';
var DATE_TAG = '[object Date]';
var FUNC_TAG = '[object Function]';
var NUMBER_TAG = '[object Number]';
var OBJECT_TAG = '[object Object]';
var REGEXP_TAG = '[object RegExp]';
var STRING_TAG = '[object String]';
var objToString = Object.prototype.toString;
var PATH = /^(.+)\.(.+)$/;

var ERRORS = {
  '400': function _() {
    return 'expected: ' + arguments[0] + ', found: ' + (arguments[2] ? arguments[1] : babelHelpers.typeof(arguments[1]));
  },
  '404': function _() {
    return arguments[0] + ' not found';
  }
};

var toInteger = function toInteger(value) {
  if (!value) {
    return 0;
  }
  // Coerce to number
  value = +value;
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  var remainder = value % 1;
  return value === value ? remainder ? value - remainder : value : 0; // eslint-disable-line
};

var toStr = function toStr(value) {
  return objToString.call(value);
};

var isPlainObject = function isPlainObject(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && value.constructor === Object;
};

var mkdirP = function mkdirP(object, path) {
  if (!path) {
    return object;
  }
  var parts = path.split('.');
  parts.forEach(function (key) {
    if (!object[key]) {
      object[key] = {};
    }
    object = object[key];
  });
  return object;
};

var utils = {
  /**
   * Reference to the Promise constructor used by JSData. Defaults to
   * `window.Promise` or `global.Promise`.
   *
   * @example <caption>Make JSData use a different `Promise` constructor</caption>
   * import Promise from 'bluebird'
   * import {utils} from 'js-data'
   * utils.Promise = Promise
   *
   * @name utils.Promise
   * @since 3.0.0
   * @type {Function}
   */
  Promise: Promise,

  /**
   * Shallow copy properties that meet the following criteria from `src` to
   * `dest`:
   *
   * - own enumerable
   * - not a function
   * - does not start with "_"
   *
   * @method utils._
   * @param {Object} dest Destination object.
   * @param {Object} src Source object.
   * @private
   * @since 3.0.0
   */
  _: function _(dest, src) {
    utils.forOwn(src, function (value, key) {
      if (key && utils.isUndefined(dest[key]) && !utils.isFunction(value) && key.indexOf('_') !== 0) {
        dest[key] = value;
      }
    });
  },


  /**
   * Recursively iterates over relations found in `opts.with`.
   *
   * @method utils._forRelation
   * @param {Object} opts Configuration options.
   * @param {Relation} def Relation definition.
   * @param {Function} fn Callback function.
   * @param {*} [thisArg] Execution context for the callback function.
   * @private
   * @since 3.0.0
   */
  _forRelation: function _forRelation(opts, def, fn, thisArg) {
    var relationName = def.relation;
    var containedName = null;
    var index = void 0;
    opts || (opts = {});
    opts.with || (opts.with = []);

    if ((index = utils._getIndex(opts.with, relationName)) >= 0) {
      containedName = relationName;
    } else if ((index = utils._getIndex(opts.with, def.localField)) >= 0) {
      containedName = def.localField;
    }

    if (opts.withAll) {
      fn.call(thisArg, def, {});
      return;
    } else if (!containedName) {
      return;
    }
    var optsCopy = {};
    utils.fillIn(optsCopy, def.getRelation());
    utils.fillIn(optsCopy, opts);
    optsCopy.with = opts.with.slice();
    optsCopy._activeWith = optsCopy.with.splice(index, 1)[0];
    optsCopy.with.forEach(function (relation, i) {
      if (relation && relation.indexOf(containedName) === 0 && relation.length >= containedName.length && relation[containedName.length] === '.') {
        optsCopy.with[i] = relation.substr(containedName.length + 1);
      } else {
        optsCopy.with[i] = '';
      }
    });
    fn.call(thisArg, def, optsCopy);
  },


  /**
   * Find the index of a relation in the given list
   *
   * @method utils._getIndex
   * @param {string[]} list List to search.
   * @param {string} relation Relation to find.
   * @private
   * @returns {number}
   */
  _getIndex: function _getIndex(list, relation) {
    var index = -1;
    list.forEach(function (_relation, i) {
      if (_relation === relation) {
        index = i;
        return false;
      } else if (utils.isObject(_relation)) {
        if (_relation.relation === relation) {
          index = i;
          return false;
        }
      }
    });
    return index;
  },


  /**
   * Define hidden (non-enumerable), writable properties on `target` from the
   * provided `props`.
   *
   * @example
   * import {utils} from 'js-data'
   * function Cat () {}
   * utils.addHiddenPropsToTarget(Cat.prototype, {
   *   say () {
   *     console.log('meow')
   *   }
   * })
   * const cat = new Cat()
   * cat.say() // "meow"
   *
   * @method utils.addHiddenPropsToTarget
   * @param {Object} target That to which `props` should be added.
   * @param {Object} props Properties to be added to `target`.
   * @since 3.0.0
   */
  addHiddenPropsToTarget: function addHiddenPropsToTarget(target, props) {
    var map = {};
    Object.keys(props).forEach(function (propName) {
      var descriptor = Object.getOwnPropertyDescriptor(props, propName);

      descriptor.enumerable = false;
      map[propName] = descriptor;
    });
    Object.defineProperties(target, map);
  },


  /**
   * Return whether the two objects are deeply different.
   *
   * @example
   * import {utils} from 'js-data'
   * utils.areDifferent({}, {}) // false
   * utils.areDifferent({ a: 1 }, { a: 1 }) // false
   * utils.areDifferent({ foo: 'bar' }, {}) // true
   *
   * @method utils.areDifferent
   * @param {Object} a Base object.
   * @param {Object} b Comparison object.
   * @param {Object} [opts] Configuration options.
   * @param {Function} [opts.equalsFn={@link utils.deepEqual}] Equality function.
   * @param {Array} [opts.ignore=[]] Array of strings or RegExp of fields to ignore.
   * @returns {boolean} Whether the two objects are deeply different.
   * @see utils.diffObjects
   * @since 3.0.0
   */
  areDifferent: function areDifferent(newObject, oldObject, opts) {
    opts || (opts = {});
    var diff = utils.diffObjects(newObject, oldObject, opts);
    var diffCount = Object.keys(diff.added).length + Object.keys(diff.removed).length + Object.keys(diff.changed).length;
    return diffCount > 0;
  },


  /**
   * Verified that the given constructor is being invoked via `new`, as opposed
   * to just being called like a normal function.
   *
   * @example
   * import {utils} from 'js-data'
   * function Cat () {
   *   utils.classCallCheck(this, Cat)
   * }
   * const cat = new Cat() // this is ok
   * Cat() // this throws an error
   *
   * @method utils.classCallCheck
   * @param {*} instance Instance that is being constructed.
   * @param {Constructor} ctor Constructor function used to construct the
   * instance.
   * @since 3.0.0
   * @throws {Error} Throws an error if the constructor is being improperly
   * invoked.
   */
  classCallCheck: function classCallCheck(instance, ctor) {
    if (!(instance instanceof ctor)) {
      throw utils.err('' + ctor.name)(500, 'Cannot call a class as a function');
    }
  },


  /**
   * Deep copy a value.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { foo: { bar: 'baz' } }
   * const b = utils.copy(a)
   * a === b // false
   * utils.areDifferent(a, b) // false
   *
   * @param {*} from Value to deep copy.
   * @param {*} [to] Destination object for the copy operation.
   * @param {*} [stackFrom] For internal use.
   * @param {*} [stackTo] For internal use.
   * @param {string[]|RegExp[]} [blacklist] List of strings or RegExp of
   * properties to skip.
   * @param {boolean} [plain] Whether to make a plain copy (don't try to use
   * original prototype).
   * @returns {*} Deep copy of `from`.
   * @since 3.0.0
   */
  copy: function copy(from, to, stackFrom, stackTo, blacklist, plain) {
    if (!to) {
      to = from;
      if (from) {
        if (utils.isArray(from)) {
          to = utils.copy(from, [], stackFrom, stackTo, blacklist, plain);
        } else if (utils.isDate(from)) {
          to = new Date(from.getTime());
        } else if (utils.isRegExp(from)) {
          to = new RegExp(from.source, from.toString().match(/[^\/]*$/)[0]);
          to.lastIndex = from.lastIndex;
        } else if (utils.isObject(from)) {
          if (plain) {
            to = utils.copy(from, {}, stackFrom, stackTo, blacklist, plain);
          } else {
            to = utils.copy(from, Object.create(Object.getPrototypeOf(from)), stackFrom, stackTo, blacklist, plain);
          }
        }
      }
    } else {
      if (from === to) {
        throw utils.err(DOMAIN + '.copy')(500, 'Cannot copy! Source and destination are identical.');
      }

      stackFrom = stackFrom || [];
      stackTo = stackTo || [];

      if (utils.isObject(from)) {
        var index = stackFrom.indexOf(from);
        if (index !== -1) {
          return stackTo[index];
        }

        stackFrom.push(from);
        stackTo.push(to);
      }

      var result = void 0;
      if (utils.isArray(from)) {
        var i = void 0;
        to.length = 0;
        for (i = 0; i < from.length; i++) {
          result = utils.copy(from[i], null, stackFrom, stackTo, blacklist, plain);
          if (utils.isObject(from[i])) {
            stackFrom.push(from[i]);
            stackTo.push(result);
          }
          to.push(result);
        }
      } else {
        if (utils.isArray(to)) {
          to.length = 0;
        } else {
          utils.forOwn(to, function (value, key) {
            delete to[key];
          });
        }
        for (var key in from) {
          if (from.hasOwnProperty(key)) {
            if (utils.isBlacklisted(key, blacklist)) {
              continue;
            }
            result = utils.copy(from[key], null, stackFrom, stackTo, blacklist, plain);
            if (utils.isObject(from[key])) {
              stackFrom.push(from[key]);
              stackTo.push(result);
            }
            to[key] = result;
          }
        }
      }
    }
    return to;
  },


  /**
   * Recursively shallow fill in own enumerable properties from `source` to
   * `dest`.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { foo: { bar: 'baz' }, beep: 'boop' }
   * const b = { beep: 'bip' }
   * utils.deepFillIn(b, a)
   * console.log(b) // {"foo":{"bar":"baz"},"beep":"bip"}
   *
   * @method utils.deepFillIn
   * @param {Object} dest The destination object.
   * @param {Object} source The source object.
   * @see utils.fillIn
   * @see utils.deepMixIn
   * @since 3.0.0
   */
  deepFillIn: function deepFillIn(dest, source) {
    if (source) {
      utils.forOwn(source, function (value, key) {
        var existing = dest[key];
        if (isPlainObject(value) && isPlainObject(existing)) {
          utils.deepFillIn(existing, value);
        } else if (!dest.hasOwnProperty(key) || dest[key] === undefined) {
          dest[key] = value;
        }
      });
    }
    return dest;
  },


  /**
   * Recursively shallow copy own enumerable properties from `source` to `dest`.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { foo: { bar: 'baz' }, beep: 'boop' }
   * const b = { beep: 'bip' }
   * utils.deepFillIn(b, a)
   * console.log(b) // {"foo":{"bar":"baz"},"beep":"boop"}
   *
   * @method utils.deepMixIn
   * @param {Object} dest The destination object.
   * @param {Object} source The source object.
   * @see utils.fillIn
   * @see utils.deepFillIn
   * @since 3.0.0
   */
  deepMixIn: function deepMixIn(dest, source) {
    if (source) {
      utils.forOwn(source, function (value, key) {
        var existing = dest[key];
        if (isPlainObject(value) && isPlainObject(existing)) {
          utils.deepMixIn(existing, value);
        } else {
          dest[key] = value;
        }
      });
    }
    return dest;
  },


  /**
   * Return a diff of the base object to the comparison object.
   *
   * @example
   * import {utils} from 'js-data'
   * const oldObject = { foo: 'bar', a: 1234 }
   * const newObject = { beep: 'boop', a: 5678 }
   * const diff = utils.diffObjects(oldObject, newObject)
   * console.log(diff.added) // {"beep":"boop"}
   * console.log(diff.changed) // {"a":5678}
   * console.log(diff.removed) // {"foo":undefined}
   *
   * @method utils.diffObjects
   * @param {Object} newObject Comparison object.
   * @param {Object} oldObject Base object.
   * @param {Object} [opts] Configuration options.
   * @param {Function} [opts.equalsFn={@link utils.deepEqual}] Equality function.
   * @param {Array} [opts.ignore=[]] Array of strings or RegExp of fields to ignore.
   * @returns {Object} The diff from the base object to the comparison object.
   * @see utils.areDifferent
   * @since 3.0.0
   */
  diffObjects: function diffObjects(newObject, oldObject, opts) {
    opts || (opts = {});
    var equalsFn = opts.equalsFn;
    var blacklist = opts.ignore;
    var diff = {
      added: {},
      changed: {},
      removed: {}
    };
    if (!utils.isFunction(equalsFn)) {
      equalsFn = utils.deepEqual;
    }

    var newKeys = Object.keys(newObject).filter(function (key) {
      return !utils.isBlacklisted(key, blacklist);
    });
    var oldKeys = Object.keys(oldObject).filter(function (key) {
      return !utils.isBlacklisted(key, blacklist);
    });

    // Check for properties that were added or changed
    newKeys.forEach(function (key) {
      var oldValue = oldObject[key];
      var newValue = newObject[key];
      if (equalsFn(oldValue, newValue)) {
        return;
      }
      if (utils.isUndefined(oldValue)) {
        diff.added[key] = newValue;
      } else {
        diff.changed[key] = newValue;
      }
    });

    // Check for properties that were removed
    oldKeys.forEach(function (key) {
      var oldValue = oldObject[key];
      var newValue = newObject[key];
      if (utils.isUndefined(newValue) && !utils.isUndefined(oldValue)) {
        diff.removed[key] = undefined;
      }
    });

    return diff;
  },


  /**
   * Return whether the two values are equal according to the `==` operator.
   *
   * @method utils.equal
   * @param {*} a First value in the comparison.
   * @param {*} b Second value in the comparison.
   * @returns {boolean} Whether the two values are equal according to `==`.
   * @since 3.0.0
   */
  equal: function equal(a, b) {
    return a == b; // eslint-disable-line
  },


  /**
   * Produce a factory function for making Error objects with the provided
   * metadata. Used throughout the various js-data components.
   *
   * @method utils.err
   * @param {string} domain Namespace.
   * @param {string} target Target.
   * @returns {Function} Factory function.
   * @since 3.0.0
   */
  err: function err(domain, target) {
    return function (code) {
      var prefix = '[' + domain + ':' + target + '] ';
      var message = ERRORS[code].apply(null, Array.prototype.slice.call(arguments, 1));
      message = '' + prefix + message + '\nhttp://www.js-data.io/v3.0/docs/errors#' + code;
      return new Error(message);
    };
  },


  /**
   * Add eventing capabilities into the target object.
   *
   * @method utils.eventify
   * @param {Object} target Target object.
   * @param {Function} [getter] Custom getter for retrieving the object's event
   * listeners.
   * @param {Function} [setter] Custom setter for setting the object's event
   * listeners.
   * @since 3.0.0
   */
  eventify: function eventify(target, getter, setter) {
    target = target || this;
    var _events = {};
    if (!getter && !setter) {
      getter = function getter() {
        return _events;
      };
      setter = function setter(value) {
        _events = value;
      };
    }
    Object.defineProperties(target, {
      emit: {
        value: function value() {
          var events = getter.call(this) || {};

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var type = args.shift();
          var listeners = events[type] || [];
          var i = void 0;
          for (i = 0; i < listeners.length; i++) {
            listeners[i].f.apply(listeners[i].c, args);
          }
          listeners = events.all || [];
          args.unshift(type);
          for (i = 0; i < listeners.length; i++) {
            listeners[i].f.apply(listeners[i].c, args);
          }
        }
      },
      off: {
        value: function value(type, func) {
          var events = getter.call(this);
          var listeners = events[type];
          if (!listeners) {
            setter.call(this, {});
          } else if (func) {
            for (var i = 0; i < listeners.length; i++) {
              if (listeners[i].f === func) {
                listeners.splice(i, 1);
                break;
              }
            }
          } else {
            listeners.splice(0, listeners.length);
          }
        }
      },
      on: {
        value: function value(type, func, thisArg) {
          if (!getter.call(this)) {
            setter.call(this, {});
          }
          var events = getter.call(this);
          events[type] = events[type] || [];
          events[type].push({
            c: thisArg,
            f: func
          });
        }
      }
    });
  },


  /**
   * Used for sublcassing. Invoke this method in the context of a superclass to
   * to produce a subclass based on `props` and `classProps`.
   *
   * @example
   * import {utils} from 'js-data'
   * function Animal () {}
   * Animal.extend = utils.extend
   * const Cat = Animal.extend({
   *   say () {
   *     console.log('meow')
   *   }
   * })
   * const cat = new Cat()
   * cat instanceof Animal // true
   * cat instanceof Cat // true
   * cat.say() // "meow"
   *
   * @method utils.extend
   * @param {Object} props Instance properties for the subclass.
   * @param {Object} [props.constructor] Provide a custom constructor function
   * to use as the subclass.
   * @param {Object} props Static properties for the subclass.
   * @returns {Constructor} A new subclass.
   * @since 3.0.0
   */
  extend: function extend(props, classProps) {
    var superClass = this;
    var _subClass = void 0;

    props || (props = {});
    classProps || (classProps = {});

    if (props.hasOwnProperty('constructor')) {
      _subClass = props.constructor;
      delete props.constructor;
    } else {
      _subClass = function subClass() {
        utils.classCallCheck(this, _subClass);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        superClass.apply(this, args);
      };
    }

    // Setup inheritance of instance members
    _subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        configurable: true,
        enumerable: false,
        value: _subClass,
        writable: true
      }
    });

    var obj = Object;
    // Setup inheritance of static members
    if (obj.setPrototypeOf) {
      obj.setPrototypeOf(_subClass, superClass);
    } else if (classProps.strictEs6Class) {
      _subClass.__proto__ = superClass; // eslint-disable-line
    } else {
        utils.forOwn(superClass, function (value, key) {
          _subClass[key] = value;
        });
      }
    if (!_subClass.hasOwnProperty('__super__')) {
      Object.defineProperty(_subClass, '__super__', {
        configurable: true,
        value: superClass
      });
    }

    utils.addHiddenPropsToTarget(_subClass.prototype, props);
    utils.fillIn(_subClass, classProps);

    return _subClass;
  },


  /**
   * Shallow copy own enumerable properties from `src` to `dest` that are on
   * `src` but are missing from `dest.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { foo: 'bar', beep: 'boop' }
   * const b = { beep: 'bip' }
   * utils.fillIn(b, a)
   * console.log(b) // {"foo":"bar","beep":"bip"}
   *
   * @method utils.fillIn
   * @param {Object} dest The destination object.
   * @param {Object} source The source object.
   * @see utils.deepFillIn
   * @see utils.deepMixIn
   * @since 3.0.0
   */
  fillIn: function fillIn(dest, src) {
    utils.forOwn(src, function (value, key) {
      if (!dest.hasOwnProperty(key) || dest[key] === undefined) {
        dest[key] = value;
      }
    });
  },


  /**
   * Find the last index of something according to the given checker function.
   *
   * @method utils.findIndex
   * @param {Array} array The array to search.
   * @param {Function} fn Checker function.
   * @returns {number} Index if found or -1 if not found.
   * @since 3.0.0
   */
  findIndex: function findIndex(array, fn) {
    var index = -1;
    if (!array) {
      return index;
    }
    array.forEach(function (record, i) {
      if (fn(record)) {
        index = i;
        return false;
      }
    });
    return index;
  },


  /**
   * Recursively iterate over a {@link Mapper}'s relations according to
   * `opts.with`.
   *
   * @method utils.forEachRelation
   * @param {Mapper} mapper Mapper.
   * @param {Object} opts Configuration options.
   * @param {Function} fn Callback function.
   * @param {*} thisArg Execution context for the callback function.
   * @since 3.0.0
   */
  forEachRelation: function forEachRelation(mapper, opts, fn, thisArg) {
    var relationList = mapper.relationList || [];
    if (!relationList.length) {
      return;
    }
    relationList.forEach(function (def) {
      utils._forRelation(opts, def, fn, thisArg);
    });
  },


  /**
   * Iterate over an object's own enumerable properties.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { b: 1, c: 4 }
   * let sum = 0
   * utils.forOwn(a, function (value, key) {
   *   sum += value
   * })
   * console.log(sum) // 5
   *
   * @method utils.forOwn
   * @param {Object} object The object whose properties are to be enumerated.
   * @param {Function} fn Iteration function.
   * @param {Object} [thisArg] Content to which to bind `fn`.
   * @since 3.0.0
   */
  forOwn: function forOwn(obj, fn, thisArg) {
    var keys = Object.keys(obj);
    var len = keys.length;
    var i = void 0;
    for (i = 0; i < len; i++) {
      fn.call(thisArg, obj[keys[i]], keys[i], obj);
    }
  },


  /**
   * Proxy for `JSON.parse`.
   *
   * @method utils.fromJson
   * @param {string} json JSON to parse.
   * @returns {Object} Parsed object.
   * @see utils.toJson
   * @since 3.0.0
   */
  fromJson: function fromJson(json) {
    return utils.isString(json) ? JSON.parse(json) : json;
  },


  /**
   * Retrieve the specified property from the given object. Supports retrieving
   * nested properties.
   *
   * @example
   * import {utils} from 'js-data'
   * const a = { foo: { bar: 'baz' }, beep: 'boop' }
   * console.log(utils.get(a, 'beep')) // "boop"
   * console.log(utils.get(a, 'foo.bar')) // "bar"
   *
   * @method utils.get
   * @param {Object} object Object from which to retrieve a property's value.
   * @param {string} prop Property to retrieve.
   * @returns {*} Value of the specified property.
   * @see utils.set
   * @since 3.0.0
   */
  'get': function get(object, prop) {
    if (!prop) {
      return;
    }
    var parts = prop.split('.');
    var last = parts.pop();

    while (prop = parts.shift()) {
      // eslint-disable-line
      object = object[prop];
      if (object == null) {
        // eslint-disable-line
        return;
      }
    }

    return object[last];
  },

  /**
   * Return the superclass for the given instance or subclass. If an instance is
   * provided, then finds the parent class of the instance's constructor.
   *
   * @method utils.getSuper
   * @param {Object|Function} instance Instance or constructor.
   * @param {boolean} [isCtor=false] Whether `instance` is a constructor.
   * @returns {Constructor} The superclass (grandparent constructor).
   * @since 3.0.0
   */
  getSuper: function getSuper(instance, isCtor) {
    var ctor = isCtor ? instance : instance.constructor;
    if (ctor.hasOwnProperty('__super__')) {
      return ctor.__super__;
    }
    return Object.getPrototypeOf(ctor) || ctor.__proto__; // eslint-disable-line
  },


  /**
   * Return the intersection of two arrays.
   *
   * @method utils.intersection
   * @param {Array} array1 First array.
   * @param {Array} array2 Second array.
   * @returns {Array} Array of elements common to both arrays.
   * @since 3.0.0
   */
  intersection: function intersection(array1, array2) {
    if (!array1 || !array2) {
      return [];
    }
    var result = [];
    var item = void 0;
    var i = void 0;
    var len = array1.length;
    for (i = 0; i < len; i++) {
      item = array1[i];
      if (result.indexOf(item) !== -1) {
        continue;
      }
      if (array2.indexOf(item) !== -1) {
        result.push(item);
      }
    }
    return result;
  },


  /**
   * Proxy for `Array.isArray`.
   *
   * @method utils.isArray
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is an array.
   * @since 3.0.0
   */
  isArray: Array.isArray,

  /**
   * Return whether `prop` is matched by any string or regular expression in
   * `blacklist`.
   *
   * @method utils.isBlacklisted
   * @param {string} prop The name of a property to check.
   * @param {Array} blacklist Array of strings and regular expressions.
   * @returns {boolean} Whether `prop` was matched.
   * @since 3.0.0
   */
  isBlacklisted: function isBlacklisted(prop, blacklist) {
    if (!blacklist || !blacklist.length) {
      return false;
    }
    var matches = void 0;
    for (var i = 0; i < blacklist.length; i++) {
      if (toStr(blacklist[i]) === REGEXP_TAG && blacklist[i].test(prop) || blacklist[i] === prop) {
        matches = prop;
        return matches;
      }
    }
    return !!matches;
  },


  /**
   * Return whether the provided value is a boolean.
   *
   * @method utils.isBoolean
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a boolean.
   * @since 3.0.0
   */
  isBoolean: function isBoolean(value) {
    return toStr(value) === BOOL_TAG;
  },


  /**
   * Return whether the provided value is a date.
   *
   * @method utils.isDate
   * @param {*} value The value to test.
   * @returns {Date} Whether the provided value is a date.
   * @since 3.0.0
   */
  isDate: function isDate(value) {
    return value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && toStr(value) === DATE_TAG;
  },


  /**
   * Return whether the provided value is a function.
   *
   * @method utils.isFunction
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a function.
   * @since 3.0.0
   */
  isFunction: function isFunction(value) {
    return typeof value === 'function' || value && toStr(value) === FUNC_TAG;
  },


  /**
   * Return whether the provided value is an integer.
   *
   * @method utils.isInteger
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is an integer.
   * @since 3.0.0
   */
  isInteger: function isInteger(value) {
    return toStr(value) === NUMBER_TAG && value == toInteger(value); // eslint-disable-line
  },


  /**
   * Return whether the provided value is `null`.
   *
   * @method utils.isNull
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is `null`.
   * @since 3.0.0
   */
  isNull: function isNull(value) {
    return value === null;
  },


  /**
   * Return whether the provided value is a number.
   *
   * @method utils.isNumber
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a number.
   * @since 3.0.0
   */
  isNumber: function isNumber(value) {
    var type = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
    return type === 'number' || value && type === 'object' && toStr(value) === NUMBER_TAG;
  },


  /**
   * Return whether the provided value is an object.
   *
   * @method utils.isObject
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is an object.
   * @since 3.0.0
   */
  isObject: function isObject(value) {
    return toStr(value) === OBJECT_TAG;
  },


  /**
   * Return whether the provided value is a regular expression.
   *
   * @method utils.isRegExp
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a regular expression.
   * @since 3.0.0
   */
  isRegExp: function isRegExp(value) {
    return toStr(value) === REGEXP_TAG;
  },


  /**
   * Return whether the provided value is a string or a number.
   *
   * @method utils.isSorN
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a string or a number.
   * @since 3.0.0
   */
  isSorN: function isSorN(value) {
    return utils.isString(value) || utils.isNumber(value);
  },


  /**
   * Return whether the provided value is a string.
   *
   * @method utils.isString
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a string.
   * @since 3.0.0
   */
  isString: function isString(value) {
    return typeof value === 'string' || value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && toStr(value) === STRING_TAG;
  },


  /**
   * Return whether the provided value is a `undefined`.
   *
   * @method utils.isUndefined
   * @param {*} value The value to test.
   * @returns {boolean} Whether the provided value is a `undefined`.
   * @since 3.0.0
   */
  isUndefined: function isUndefined(value) {
    return value === undefined;
  },


  /**
   * Mix in logging capabilities to the target.
   *
   * @method utils.logify
   * @param {*} target The target.
   * @since 3.0.0
   */
  logify: function logify(target) {
    utils.addHiddenPropsToTarget(target, {
      dbg: function dbg() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        this.log.apply(this, ['debug'].concat(args));
      },
      log: function log(level) {
        for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        if (level && !args.length) {
          args.push(level);
          level = 'debug';
        }
        if (level === 'debug' && !this.debug) {
          return;
        }
        var prefix = level.toUpperCase() + ': (' + (this.name || this.constructor.name) + ')';
        if (console[level]) {
          var _console;

          (_console = console)[level].apply(_console, [prefix].concat(args));
        } else {
          var _console2;

          (_console2 = console).log.apply(_console2, [prefix].concat(args));
        }
      }
    });
  },


  /**
   * Adds the given record to the provided array only if it's not already in the
   * array.
   *
   * @method utils.noDupeAdd
   * @param {Array} array The array.
   * @param {*} record The value to add.
   * @param {Function} fn Callback function passed to {@link utils.findIndex}.
   * @since 3.0.0
   */
  noDupeAdd: function noDupeAdd(array, record, fn) {
    if (!array) {
      return;
    }
    var index = this.findIndex(array, fn);
    if (index < 0) {
      array.push(record);
    }
  },


  /**
   * Return a shallow copy of the provided object, minus the properties
   * specified in `keys`.
   *
   * @method utils.omit
   * @param {Object} props The object to copy.
   * @param {string[]} keys Array of strings, representing properties to skip.
   * @returns {Object} Shallow copy of `props`, minus `keys`.
   * @since 3.0.0
   */
  omit: function omit(props, keys) {
    var _props = {};
    utils.forOwn(props, function (value, key) {
      if (keys.indexOf(key) === -1) {
        _props[key] = value;
      }
    });
    return _props;
  },


  /**
   * Return a shallow copy of the provided object, but only include the
   * properties specified in `keys`.
   *
   * @method utils.pick
   * @param {Object} props The object to copy.
   * @param {string[]} keys Array of strings, representing properties to keep.
   * @returns {Object} Shallow copy of `props`, but only including `keys`.
   * @since 3.0.0
   */
  pick: function pick(props, keys) {
    var _props = {};
    utils.forOwn(props, function (value, key) {
      if (keys.indexOf(key) !== -1) {
        _props[key] = value;
      }
    });
    return _props;
  },


  /**
   * Return a plain copy of the given value.
   *
   * @method utils.plainCopy
   * @param {*} value The value to copy.
   * @returns {*} Plain copy of `value`.
   * @see utils.copy
   * @since 3.0.0
   */
  plainCopy: function plainCopy(value) {
    return utils.copy(value, undefined, undefined, undefined, undefined, true);
  },


  /**
   * Shortcut for `utils.Promise.reject(value)`.
   *
   * @method utils.reject
   * @param {*} [value] Value with which to reject the Promise.
   * @returns {Promise} Promise reject with `value`.
   * @see utils.Promise
   * @since 3.0.0
   */
  reject: function reject(value) {
    return utils.Promise.reject(value);
  },


  /**
   * Remove the last item found in array according to the given checker function.
   *
   * @method utils.remove
   * @param {Array} array The array to search.
   * @param {Function} fn Checker function.
   */
  remove: function remove(array, fn) {
    if (!array || !array.length) {
      return;
    }
    var index = this.findIndex(array, fn);
    if (index >= 0) {
      array.splice(index, 1);
    }
  },


  /**
   * Shortcut for `utils.Promise.resolve(value)`.
   *
   * @ignore
   * @param {*} [value] Value with which to resolve the Promise.
   * @returns {Promise} Promise resolved with `value`.
   * @see utils.Promise
   * @since 3.0.0
   */
  resolve: function resolve(value) {
    return utils.Promise.resolve(value);
  },


  /**
   * Set the value at the provided key or path.
   *
   * @method utils.set
   * @param {Object} object The object on which to set a property.
   * @param {(string|Object)} path The key or path to the property. Can also
   * pass in an object of path/value pairs, which will all be set on the target
   * object.
   * @param {*} [value] The value to set.
   */
  set: function set(object, path, value) {
    if (utils.isObject(path)) {
      utils.forOwn(path, function (value, _path) {
        utils.set(object, _path, value);
      });
    } else {
      var parts = PATH.exec(path);
      if (parts) {
        mkdirP(object, parts[1])[parts[2]] = value;
      } else {
        object[path] = value;
      }
    }
  },

  /**
   * Check whether the two provided objects are deeply equal.
   *
   * @method utils.deepEqual
   * @param {Object} a First object in the comparison.
   * @param {Object} b Second object in the comparison.
   * @returns {boolean} Whether the two provided objects are deeply equal.
   * @see utils.equal
   * @since 3.0.0
   */
  deepEqual: function deepEqual(a, b) {
    if (a === b) {
      return true;
    }
    var _equal = true;
    if (utils.isObject(a) && utils.isObject(b)) {
      utils.forOwn(a, function (value, key) {
        _equal = _equal && utils.deepEqual(value, b[key]);
      });
      if (!_equal) {
        return _equal;
      }
      utils.forOwn(b, function (value, key) {
        _equal = _equal && utils.deepEqual(value, a[key]);
      });
    } else if (utils.isArray(a) && utils.isArray(b)) {
      a.forEach(function (value, i) {
        _equal = _equal && utils.deepEqual(value, b[i]);
        if (!_equal) {
          return false;
        }
      });
    } else {
      return false;
    }
    return _equal;
  },


  /**
   * Proxy for `JSON.stringify`.
   *
   * @method utils.toJson
   * @param {*} value Value to serialize to JSON.
   * @returns {string} JSON string.
   * @see utils.fromJson
   * @since 3.0.0
   */
  toJson: JSON.stringify,

  /**
   * Unset the value at the provided key or path.
   *
   * @method utils.unset
   * @param {Object} object The object from which to delete the property.
   * @param {string} path The key or path to the property.
   * @see utils.set
   * @since 3.0.0
   */
  unset: function unset(object, path) {
    var parts = path.split('.');
    var last = parts.pop();

    while (path = parts.shift()) {
      // eslint-disable-line
      object = object[path];
      if (object == null) {
        // eslint-disable-line
        return;
      }
    }

    object[last] = undefined;
  }
};

/**
 * @class Component
 */
function Component() {
  /**
   * Event listeners attached to this Component. __Do not modify.__ Use
   * {@link Component#on} and {@link Component#off} instead.
   *
   * @name Component#_listeners
   * @instance
   * @since 3.0.0
   * @type {Object}
   */
  Object.defineProperty(this, '_listeners', { value: {} });
}

/**
 * Create a subclass of this component.
 *
 * @method Component.extend
 * @static
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this component.
 * @since 3.0.0
 */
Component.extend = utils.extend;

/**
 * Log the provided values at the "debug" level.
 *
 * @method Component#dbg
 * @param {...*} [args] Values to log.
 * @since 3.0.0
 */
/**
 * Log the provided values. By default sends values to `console[level]`.
 *
 * @method Component#log
 * @param {string} level Log level
 * @param {...*} [args] Values to log.
 * @since 3.0.0
 */
utils.logify(Component.prototype);

/**
 * Register a new event listener on this Component.
 *
 * @example <caption>Listen for all "afterCreate" events in a DataStore</caption>
 * store.on('afterCreate', (mapperName, props, opts, result) => {
 *   console.log(mapperName) // "post"
 *   console.log(props.id) // undefined
 *   console.log(result.id) // 1234
 * })
 * store.create('post', { title: 'Modeling your data' }).then((post) => {
 *   console.log(post.id) // 1234
 * })
 *
 * @example <caption>Listen for the "add" event on a collection</caption>
 * collection.on('add', (records) => {
 *   console.log(records) // [...]
 * })
 *
 * @example <caption>Listen for "change" events on a record</caption>
 * post.on('change', (record, changes) => {
 *   console.log(changes) // { changed: { title: 'Modeling your data' } }
 * })
 * post.title = 'Modeling your data'
 *
 * @method Component#on
 * @param {string} event Name of event to subsribe to.
 * @param {Function} listener Listener function to handle the event.
 * @param {*} [ctx] Optional content in which to invoke the listener.
 * @since 3.0.0
 */
/**
 * Remove an event listener from this Component. If no listener is provided,
 * then all listeners for the specified event will be removed. If no event is
 * specified then all listeners for all events will be removed.
 *
 * @example <caption>Remove a listener to a single event</caption>
 * collection.off('add', handler)
 *
 * @example <caption>Remove all listeners to a single event</caption>
 * record.off('change')
 *
 * @example <caption>Remove all listeners to all events</caption>
 * store.off()
 *
 * @method Component#off
 * @param {string} [event] Name of event to unsubsribe to.
 * @param {Function} [listener] Listener to remove.
 * @since 3.0.0
 */
/**
 * Trigger an event on this Component.
 *
 * @example
 * collection.on('foo', (msg) => {
 *   console.log(msg) // "bar"
 * })
 * collection.emit('foo', 'bar')
 *
 * @example
 * store.on('foo', (msg, val1, val2) => {
 *   console.log(msg, val1, val2) // "bar" "beep" "boop"
 * })
 * store.emit('foo', 'bar', 'beep', 'boop')
 *
 * @method Component#emit
 * @param {string} event Name of event to emit.
 * @param {...*} [args] Arguments to pass to any listeners.
 * @since 3.0.0
 */
utils.eventify(Component.prototype, function () {
  return this._listeners;
}, function (value) {
  this._listeners = value;
});

var DOMAIN$2 = 'Query';
var INDEX_ERR = 'Index inaccessible after first operation';

// Reserved words used by JSData's Query Syntax
var reserved = {
  limit: '',
  offset: '',
  orderBy: '',
  skip: '',
  sort: '',
  where: ''
};

// Used by our JavaScript implementation of the LIKE operator
var escapeRegExp = /([.*+?^=!:${}()|[\]\/\\])/g;
var percentRegExp = /%/g;
var underscoreRegExp = /_/g;
var escape = function escape(pattern) {
  return pattern.replace(escapeRegExp, '\\$1');
};

/**
 * A class used by the {@link Collection} class to build queries to be executed
 * against the collection's data. An instance of `Query` is returned by
 * {@link Collection#query}. Query instances are typically short-lived, and you
 * shouldn't have to create them yourself. Just use {@link Collection#query}.
 *
 * ```javascript
 * import {Query} from 'js-data'
 * ```
 *
 * @example
 * const posts = store.query('post').filter({ status: 'draft' }).limit(2).run()
 *
 * @class Query
 * @extends Component
 * @param {Collection} collection The collection on which this query operates.
 * @since 3.0.0
 */
function Query(collection) {
  utils.classCallCheck(this, Query);

  /**
   * The {@link Collection} on which this query operates.
   *
   * @name Query#collection
   * @since 3.0.0
   * @type {Collection}
   */
  this.collection = collection;

  /**
   * The current data result of this query.
   *
   * @name Query#data
   * @since 3.0.0
   * @type {Array}
   */
  this.data = null;
}

var Query$1 = Component.extend({
  constructor: Query,

  _applyWhereFromObject: function _applyWhereFromObject(where) {
    var fields = [];
    var ops = [];
    var predicates = [];
    utils.forOwn(where, function (clause, field) {
      if (!utils.isObject(clause)) {
        clause = {
          '==': clause
        };
      }
      utils.forOwn(clause, function (expr, op) {
        fields.push(field);
        ops.push(op);
        predicates.push(expr);
      });
    });
    return {
      fields: fields,
      ops: ops,
      predicates: predicates
    };
  },
  _applyWhereFromArray: function _applyWhereFromArray(where) {
    var _this = this;

    var groups = [];
    where.forEach(function (_where, i) {
      if (utils.isString(_where)) {
        return;
      }
      var prev = where[i - 1];
      var parser = utils.isArray(_where) ? _this._applyWhereFromArray : _this._applyWhereFromObject;
      var group = parser.call(_this, _where);
      if (prev === 'or') {
        group.isOr = true;
      }
      groups.push(group);
    });
    groups.isArray = true;
    return groups;
  },
  _testObjectGroup: function _testObjectGroup(keep, first, group, item) {
    var i = void 0;
    var fields = group.fields;
    var ops = group.ops;
    var predicates = group.predicates;
    var len = ops.length;
    for (i = 0; i < len; i++) {
      var op = ops[i];
      var isOr = op.charAt(0) === '|';
      op = isOr ? op.substr(1) : op;
      var expr = this.evaluate(utils.get(item, fields[i]), op, predicates[i]);
      if (expr !== undefined) {
        keep = first ? expr : isOr ? keep || expr : keep && expr;
      }
      first = false;
    }
    return { keep: keep, first: first };
  },
  _testArrayGroup: function _testArrayGroup(keep, first, groups, item) {
    var i = void 0;
    var len = groups.length;
    for (i = 0; i < len; i++) {
      var group = groups[i];
      var parser = group.isArray ? this._testArrayGroup : this._testObjectGroup;
      var result = parser.call(this, true, true, group, item);
      if (groups[i - 1]) {
        if (group.isOr) {
          keep = keep || result.keep;
        } else {
          keep = keep && result.keep;
        }
      } else {
        keep = result.keep;
      }
      first = result.first;
    }
    return { keep: keep, first: first };
  },


  /**
   * Find all entities between two boundaries.
   *
   * @example <caption>Get the users ages 18 to 30.</caption>
   * const users = query.between(18, 30, { index: 'age' }).run()
   *
   * @example <caption>Same as above.</caption>
   * const users = query.between([18], [30], { index: 'age' }).run()
   *
   * @method Query#between
   * @param {Array} leftKeys Keys defining the left boundary.
   * @param {Array} rightKeys Keys defining the right boundary.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.index] Name of the secondary index to use in the
   * query. If no index is specified, the main index is used.
   * @param {boolean} [opts.leftInclusive=true] Whether to include entities
   * on the left boundary.
   * @param {boolean} [opts.rightInclusive=false] Whether to include entities
   * on the left boundary.
   * @param {boolean} [opts.limit] Limit the result to a certain number.
   * @param {boolean} [opts.offset] The number of resulting entities to skip.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  between: function between(leftKeys, rightKeys, opts) {
    opts || (opts = {});
    if (this.data) {
      throw utils.err(DOMAIN$2 + '#between')(500, 'Cannot access index');
    }
    this.data = this.collection.getIndex(opts.index).between(leftKeys, rightKeys, opts);
    return this;
  },


  /**
   * The comparison function used by the {@link Query} class.
   *
   * @method Query#compare
   * @param {Array} orderBy An orderBy clause used for sorting and sub-sorting.
   * @param {number} index The index of the current orderBy clause being used.
   * @param {*} a The first item in the comparison.
   * @param {*} b The second item in the comparison.
   * @returns {number} -1 if `b` should preceed `a`. 0 if `a` and `b` are equal.
   * 1 if `a` should preceed `b`.
   * @since 3.0.0
   */
  compare: function compare(orderBy, index, a, b) {
    var def = orderBy[index];
    var cA = utils.get(a, def[0]);
    var cB = utils.get(b, def[0]);
    if (cA && utils.isString(cA)) {
      cA = cA.toUpperCase();
    }
    if (cB && utils.isString(cB)) {
      cB = cB.toUpperCase();
    }
    if (a === undefined) {
      a = null;
    }
    if (b === undefined) {
      b = null;
    }
    if (def[1].toUpperCase() === 'DESC') {
      var temp = cB;
      cB = cA;
      cA = temp;
    }
    if (cA < cB) {
      return -1;
    } else if (cA > cB) {
      return 1;
    } else {
      if (index < orderBy.length - 1) {
        return this.compare(orderBy, index + 1, a, b);
      } else {
        return 0;
      }
    }
  },


  /**
   * Predicate evaluation function used by the {@link Query} class.
   *
   * @method Query#evaluate
   * @param {*} value The value to evaluate.
   * @param {string} op The operator to use in this evaluation.
   * @param {*} predicate The predicate to use in this evaluation.
   * @returns {boolean} Whether the value passed the evaluation or not.
   * @since 3.0.0
   */
  evaluate: function evaluate(value, op, predicate) {
    var ops = this.constructor.ops;
    if (ops[op]) {
      return ops[op](value, predicate);
    }
    if (op.indexOf('like') === 0) {
      return !utils.isNull(this.like(predicate, op.substr(4)).exec(value));
    } else if (op.indexOf('notLike') === 0) {
      return utils.isNull(this.like(predicate, op.substr(7)).exec(value));
    }
  },


  /**
   * Find the record or records that match the provided query or are accepted by
   * the provided filter function.
   *
   * @example <caption>Get the draft posts created less than three months</caption>
   * const posts = query.filter({
   *   where: {
   *     status: {
   *       '==': 'draft'
   *     },
   *     created_at_timestamp: {
   *       '>=': (new Date().getTime() (1000 * 60 * 60 * 24 * 30 * 3)) // 3 months ago
   *     }
   *   }
   * }).run()
   *
   * @example <caption>Use a custom filter function</caption>
   * const posts = query.filter(function (post) {
   *   return post.isReady()
   * }).run()
   *
   * @method Query#filter
   * @param {(Object|Function)} [queryOrFn={}] Selection query or filter
   * function.
   * @param {Function} [thisArg] Context to which to bind `queryOrFn` if
   * `queryOrFn` is a function.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  filter: function filter(query, thisArg) {
    var _this2 = this;

    /**
     * Selection query as defined by JSData's [Query Syntax][querysyntax].
     *
     * [querysyntax]: http://www.js-data.io/v3.0/docs/query-syntax
     *
     * @example <caption>Empty "findAll" query</caption>
     * store.findAll('post').then((posts) => {
     *   console.log(posts) // [...]
     * })
     *
     * @example <caption>Empty "filter" query</caption>
     * const posts = store.filter('post')
     * console.log(posts) // [...]
     *
     * @example <caption>Complex "findAll" query</caption>
     * const PAGE_SIZE = 10
     * let currentPage = 3
     *
     * // Retrieve a filtered page of blog posts
     * store.findAll('post', {
     *   where: {
     *     status: {
     *       // WHERE status = 'published'
     *       '==': 'published'
     *     },
     *     author: {
     *       // AND author IN ('bob', 'alice')
     *       'in': ['bob', 'alice'],
     *       // OR author IN ('karen')
     *       '|in': ['karen']
     *     }
     *   },
     *   orderBy: [
     *     // ORDER BY date_published DESC,
     *     ['date_published', 'DESC'],
     *     // ORDER BY title ASC
     *     ['title', 'ASC']
     *   ],
     *   // LIMIT 10
     *   limit: PAGE_SIZE,
     *   // SKIP 20
     *   offset: PAGE_SIZE * (currentPage 1)
     * }).then((posts) => {
     *   console.log(posts) // [...]
     * })
     *
     * @namespace query
     * @property {number} [limit] See {@link query.limit}.
     * @property {number} [offset] See {@link query.offset}.
     * @property {string|Array[]} [orderBy] See {@link query.orderBy}.
     * @property {number} [skip] Alias for {@link query.offset}.
     * @property {string|Array[]} [sort] Alias for {@link query.orderBy}.
     * @property {Object} [where] See {@link query.where}.
     * @since 3.0.0
     * @tutorial ["http://www.js-data.io/v3.0/docs/query-syntax","JSData's Query Syntax"]
     */
    query || (query = {});
    this.getData();
    if (utils.isObject(query)) {
      (function () {
        var where = {};

        /**
         * Filtering criteria. Records that do not meet this criteria will be exluded
         * from the result.
         *
         * @example
         * TODO
         *
         * @name query.where
         * @type {Object}
         * @see http://www.js-data.io/v3.0/docs/query-syntax
         * @since 3.0.0
         */
        if (utils.isObject(query.where) || utils.isArray(query.where)) {
          where = query.where;
        }
        utils.forOwn(query, function (value, key) {
          if (!(key in reserved) && !(key in where)) {
            where[key] = {
              '==': value
            };
          }
        });
        var groups = void 0;

        // Apply filter for each field
        if (utils.isObject(where) && Object.keys(where).length !== 0) {
          groups = _this2._applyWhereFromArray([where]);
        } else if (utils.isArray(where)) {
          groups = _this2._applyWhereFromArray(where);
        }

        if (groups) {
          _this2.data = _this2.data.filter(function (item, i) {
            return _this2._testArrayGroup(true, true, groups, item).keep;
          });
        }

        // Sort
        var orderBy = query.orderBy || query.sort;

        if (utils.isString(orderBy)) {
          orderBy = [[orderBy, 'ASC']];
        }
        if (!utils.isArray(orderBy)) {
          orderBy = null;
        }

        /**
         * Determines how records should be ordered in the result.
         *
         * @example
         * TODO
         *
         * @name query.orderBy
         * @type {string|Array[]}
         * @see http://www.js-data.io/v3.0/docs/query-syntax
         * @since 3.0.0
         */
        if (orderBy) {
          (function () {
            var index = 0;
            orderBy.forEach(function (def, i) {
              if (utils.isString(def)) {
                orderBy[i] = [def, 'ASC'];
              }
            });
            _this2.data.sort(function (a, b) {
              return _this2.compare(orderBy, index, a, b);
            });
          })();
        }

        /**
         * Number of records to skip.
         *
         * @example <caption>Retrieve the first "page" of blog posts</caption>
         * const PAGE_SIZE = 10
         * let currentPage = 1
         * PostService.findAll({
         *   offset: PAGE_SIZE * (currentPage 1)
         *   limit: PAGE_SIZE
         * })
         *
         * @name query.offset
         * @type {number}
         * @see http://www.js-data.io/v3.0/docs/query-syntax
         * @since 3.0.0
         */
        if (utils.isNumber(query.skip)) {
          _this2.skip(query.skip);
        } else if (utils.isNumber(query.offset)) {
          _this2.skip(query.offset);
        }

        /**
         * Maximum number of records to retrieve.
         *
         * @example <caption>Retrieve the first "page" of blog posts</caption>
         * const PAGE_SIZE = 10
         * let currentPage = 1
         * PostService.findAll({
         *   offset: PAGE_SIZE * (currentPage 1)
         *   limit: PAGE_SIZE
         * })
         *
         * @name query.limit
         * @type {number}
         * @see http://www.js-data.io/v3.0/docs/query-syntax
         * @since 3.0.0
         */
        if (utils.isNumber(query.limit)) {
          _this2.limit(query.limit);
        }
      })();
    } else if (utils.isFunction(query)) {
      this.data = this.data.filter(query, thisArg);
    }
    return this;
  },


  /**
   * Iterate over all entities.
   *
   * @method Query#forEach
   * @param {Function} forEachFn Iteration function.
   * @param {*} [thisArg] Context to which to bind `forEachFn`.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  forEach: function forEach(forEachFn, thisArg) {
    this.getData().forEach(forEachFn, thisArg);
    return this;
  },


  /**
   * Find the entity or entities that match the provided key.
   *
   * @example <caption>Get the entity whose primary key is 25.</caption>
   * const entities = query.get(25).run()
   *
   * @example <caption>Same as above.</caption>
   * const entities = query.get([25]).run()
   *
   * @example <caption>Get all users who are active and have the "admin" role.</caption>
   * const activeAdmins = query.get(['active', 'admin'], {
   *   index: 'activityAndRoles'
   * }).run()
   *
   * @example <caption>Get all entities that match a certain weather condition.</caption>
   * const niceDays = query.get(['sunny', 'humid', 'calm'], {
   *   index: 'weatherConditions'
   * }).run()
   *
   * @method Query#get
   * @param {Array} keyList Key(s) defining the entity to retrieve. If
   * `keyList` is not an array (i.e. for a single-value key), it will be
   * wrapped in an array.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.string] Name of the secondary index to use in the
   * query. If no index is specified, the main index is used.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  get: function get(keyList, opts) {
    keyList || (keyList = []);
    opts || (opts = {});
    if (this.data) {
      throw utils.err(DOMAIN$2 + '#get')(500, INDEX_ERR);
    }
    if (keyList && !utils.isArray(keyList)) {
      keyList = [keyList];
    }
    if (!keyList.length) {
      this.getData();
      return this;
    }
    this.data = this.collection.getIndex(opts.index).get(keyList);
    return this;
  },


  /**
   * Find the entity or entities that match the provided keyLists.
   *
   * @example <caption>Get the posts where "status" is "draft" or "inReview".</caption>
   * const posts = query.getAll('draft', 'inReview', { index: 'status' }).run()
   *
   * @example <caption>Same as above.</caption>
   * const posts = query.getAll(['draft'], ['inReview'], { index: 'status' }).run()
   *
   * @method Query#getAll
   * @param {...Array} [keyList] Provide one or more keyLists, and all
   * entities matching each keyList will be retrieved. If no keyLists are
   * provided, all entities will be returned.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.index] Name of the secondary index to use in the
   * query. If no index is specified, the main index is used.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  getAll: function getAll() {
    var _this3 = this;

    var opts = {};
    if (this.data) {
      throw utils.err(DOMAIN$2 + '#getAll')(500, INDEX_ERR);
    }

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!args.length || args.length === 1 && utils.isObject(args[0])) {
      this.getData();
      return this;
    } else if (args.length && utils.isObject(args[args.length - 1])) {
      opts = args[args.length - 1];
      args.pop();
    }
    var collection = this.collection;
    var index = collection.getIndex(opts.index);
    this.data = [];
    args.forEach(function (keyList) {
      _this3.data = _this3.data.concat(index.get(keyList));
    });
    return this;
  },


  /**
   * Return the current data result of this query.
   *
   * @method Query#getData
   * @returns {Array} The data in this query.
   * @since 3.0.0
   */
  getData: function getData() {
    if (!this.data) {
      this.data = this.collection.index.getAll();
    }
    return this.data;
  },


  /**
   * Implementation used by the `like` operator. Takes a pattern and flags and
   * returns a `RegExp` instance that can test strings.
   *
   * @method Query#like
   * @param {string} pattern Testing pattern.
   * @param {string} flags Flags for the regular expression.
   * @returns {RegExp} Regular expression for testing strings.
   * @since 3.0.0
   */
  like: function like(pattern, flags) {
    return new RegExp('^' + escape(pattern).replace(percentRegExp, '.*').replace(underscoreRegExp, '.') + '$', flags);
  },


  /**
   * Limit the result.
   *
   * @example <caption>Get only the first 10 draft posts.</caption>
   * const posts = query.get('draft', { index: 'status' }).limit(10).run()
   *
   * @method Query#limit
   * @param {number} num The maximum number of entities to keep in the result.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  limit: function limit(num) {
    if (!utils.isNumber(num)) {
      throw utils.err(DOMAIN$2 + '#limit', 'num')(400, 'number', num);
    }
    var data = this.getData();
    this.data = data.slice(0, Math.min(data.length, num));
    return this;
  },


  /**
   * Apply a mapping function to the result data.
   *
   * @example
   * const ages = UserCollection.query().map((user) => {
   *   return user.age
   * }).run()
   *
   * @method Query#map
   * @param {Function} mapFn Mapping function.
   * @param {*} [thisArg] Context to which to bind `mapFn`.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  map: function map(mapFn, thisArg) {
    this.data = this.getData().map(mapFn, thisArg);
    return this;
  },


  /**
   * Return the result of calling the specified function on each item in this
   * collection's main index.
   *
   * @example
   * const stringAges = UserCollection.query().mapCall('toString').run()
   *
   * @method Query#mapCall
   * @param {string} funcName Name of function to call
   * @parama {...*} [args] Remaining arguments to be passed to the function.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  mapCall: function mapCall(funcName) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    this.data = this.getData().map(function (item) {
      return item[funcName].apply(item, args);
    });
    return this;
  },


  /**
   * Complete the execution of the query and return the resulting data.
   *
   * @method Query#run
   * @returns {Array} The result of executing this query.
   * @since 3.0.0
   */
  run: function run() {
    var data = this.data;
    this.data = null;
    return data;
  },


  /**
   * Skip a number of results.
   *
   * @example <caption>Get all but the first 10 draft posts.</caption>
   * const posts = query.get('draft', { index: 'status' }).skip(10).run()
   *
   * @method Query#skip
   * @param {number} num The number of entities to skip.
   * @returns {Query} A reference to itself for chaining.
   * @since 3.0.0
   */
  skip: function skip(num) {
    if (!utils.isNumber(num)) {
      throw utils.err(DOMAIN$2 + '#skip', 'num')(400, 'number', num);
    }
    var data = this.getData();
    if (num < data.length) {
      this.data = data.slice(num);
    } else {
      this.data = [];
    }
    return this;
  }
}, {
  /**
   * The filtering operators supported by {@link Query#filter}, and which are
   * implemented by adapters (for the most part).
   *
   * @example <caption>Variant 1</caption>
   * const publishedPosts = store.filter('post', {
   *   status: 'published',
   *   limit: 2
   * })
   *
   * @example <caption>Variant 2</caption>
   * const publishedPosts = store.filter('post', {
   *   where: {
   *     status: {
   *       '==': 'published'
   *     }
   *   },
   *   limit: 2
   * })
   *
   * @example <caption>Variant 3</caption>
   * const publishedPosts = store.query('post').filter({
   *   status: 'published'
   * }).limit(2).run()
   *
   * @example <caption>Variant 4</caption>
   * const publishedPosts = store.query('post').filter({
   *   where: {
   *     status: {
   *       '==': 'published'
   *     }
   *   }
   * }).limit(2).run()
   *
   * @example <caption>Multiple operators</caption>
   * const myPublishedPosts = store.filter('post', {
   *   where: {
   *     status: {
   *       '==': 'published'
   *     },
   *     user_id: {
   *       '==': currentUser.id
   *     }
   *   }
   * })
   *
   * @name Query.ops
   * @property {Function} == Equality operator.
   * @property {Function} != Inequality operator.
   * @property {Function} > Greater than operator.
   * @property {Function} >= Greater than (inclusive) operator.
   * @property {Function} < Less than operator.
   * @property {Function} <= Less than (inclusive) operator.
   * @property {Function} isectEmpty Operator that asserts that the intersection
   * between two arrays is empty.
   * @property {Function} isectNotEmpty Operator that asserts that the
   * intersection between two arrays is __not__ empty.
   * @property {Function} in Operator that asserts whether a value is in an
   * array.
   * @property {Function} notIn Operator that asserts whether a value is __not__
   * in an array.
   * @property {Function} contains Operator that asserts whether an array
   * contains a value.
   * @property {Function} notContains Operator that asserts whether an array
   * does __not__ contain a value.
   * @since 3.0.0
   * @type {Object}
   */
  ops: {
    '=': function _(value, predicate) {
      return value == predicate; // eslint-disable-line
    },
    '==': function _(value, predicate) {
      return value == predicate; // eslint-disable-line
    },
    '===': function _(value, predicate) {
      return value === predicate;
    },
    '!=': function _(value, predicate) {
      return value != predicate; // eslint-disable-line
    },
    '!==': function _(value, predicate) {
      return value !== predicate;
    },
    '>': function _(value, predicate) {
      return value > predicate;
    },
    '>=': function _(value, predicate) {
      return value >= predicate;
    },
    '<': function _(value, predicate) {
      return value < predicate;
    },
    '<=': function _(value, predicate) {
      return value <= predicate;
    },
    'isectEmpty': function isectEmpty(value, predicate) {
      return !utils.intersection(value || [], predicate || []).length;
    },
    'isectNotEmpty': function isectNotEmpty(value, predicate) {
      return utils.intersection(value || [], predicate || []).length;
    },
    'in': function _in(value, predicate) {
      return predicate.indexOf(value) !== -1;
    },
    'notIn': function notIn(value, predicate) {
      return predicate.indexOf(value) === -1;
    },
    'contains': function contains(value, predicate) {
      return (value || []).indexOf(predicate) !== -1;
    },
    'notContains': function notContains(value, predicate) {
      return (value || []).indexOf(predicate) === -1;
    }
  }
});

/**
 * Create a subclass of this Query.
 *
 * @example <caption>Extend the class in a cross-browser manner.</caption>
 * import {Query} from 'js-data'
 * const CustomQueryClass = Query.extend({
 *   foo () { return 'bar' }
 * })
 * const customQuery = new CustomQueryClass({ name: 'test' })
 * console.log(customQuery.foo()) // "bar"
 *
 * @example <caption>Extend the class using ES2015 class syntax.</caption>
 * class CustomQueryClass extends Query {
 *   foo () { return 'bar' }
 * }
 * const customQuery = new CustomQueryClass({ name: 'test' })
 * console.log(customQuery.foo()) // "bar"
 *
 * @method Query.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Query class.
 * @since 3.0.0
 */

function sort(a, b, hashCode) {
  // Short-curcuit comparison if a and b are strictly equal
  // This is absolutely necessary for indexed objects that
  // don't have the idAttribute field
  if (a === b) {
    return 0;
  }
  if (hashCode) {
    a = hashCode(a);
    b = hashCode(b);
  }
  if (a === null && b === null) {
    return 0;
  }

  if (a === null) {
    return -1;
  }

  if (b === null) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

function insertAt(array, index, value) {
  array.splice(index, 0, value);
  return array;
}

function removeAt(array, index) {
  array.splice(index, 1);
  return array;
}

function binarySearch(array, value, field) {
  var lo = 0;
  var hi = array.length;
  var compared = void 0;
  var mid = void 0;

  while (lo < hi) {
    mid = (lo + hi) / 2 | 0;
    compared = sort(value, array[mid], field);
    if (compared === 0) {
      return {
        found: true,
        index: mid
      };
    } else if (compared < 0) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  return {
    found: false,
    index: hi
  };
}

function Index(fieldList, opts) {
  utils.classCallCheck(this, Index);
  fieldList || (fieldList = []);

  if (!utils.isArray(fieldList)) {
    throw new Error('fieldList must be an array.');
  }

  opts || (opts = {});
  this.fieldList = fieldList;
  this.fieldGetter = opts.fieldGetter;
  this.hashCode = opts.hashCode;
  this.isIndex = true;
  this.keys = [];
  this.values = [];
}

utils.addHiddenPropsToTarget(Index.prototype, {
  'set': function set(keyList, value) {
    if (!utils.isArray(keyList)) {
      keyList = [keyList];
    }

    var key = keyList.shift() || null;
    var pos = binarySearch(this.keys, key);

    if (keyList.length === 0) {
      if (pos.found) {
        var dataLocation = binarySearch(this.values[pos.index], value, this.hashCode);
        if (!dataLocation.found) {
          insertAt(this.values[pos.index], dataLocation.index, value);
        }
      } else {
        insertAt(this.keys, pos.index, key);
        insertAt(this.values, pos.index, [value]);
      }
    } else {
      if (pos.found) {
        this.values[pos.index].set(keyList, value);
      } else {
        insertAt(this.keys, pos.index, key);
        var newIndex = new Index([], { hashCode: this.hashCode });
        newIndex.set(keyList, value);
        insertAt(this.values, pos.index, newIndex);
      }
    }
  },
  'get': function get(keyList) {
    if (!utils.isArray(keyList)) {
      keyList = [keyList];
    }

    var key = keyList.shift() || null;
    var pos = binarySearch(this.keys, key);

    if (keyList.length === 0) {
      if (pos.found) {
        if (this.values[pos.index].isIndex) {
          return this.values[pos.index].getAll();
        } else {
          return this.values[pos.index];
        }
      } else {
        return [];
      }
    } else {
      if (pos.found) {
        return this.values[pos.index].get(keyList);
      } else {
        return [];
      }
    }
  },
  getAll: function getAll(opts) {
    opts || (opts = {});
    var results = [];
    var values = this.values;
    if (opts.order === 'desc') {
      for (var i = values.length - 1; i >= 0; i--) {
        var value = values[i];
        if (value.isIndex) {
          results = results.concat(value.getAll(opts));
        } else {
          results = results.concat(value);
        }
      }
    } else {
      for (var _i = 0; _i < values.length; _i++) {
        var _value = values[_i];
        if (_value.isIndex) {
          results = results.concat(_value.getAll(opts));
        } else {
          results = results.concat(_value);
        }
      }
    }
    return results;
  },
  visitAll: function visitAll(cb, thisArg) {
    this.values.forEach(function (value) {
      if (value.isIndex) {
        value.visitAll(cb, thisArg);
      } else {
        value.forEach(cb, thisArg);
      }
    });
  },
  between: function between(leftKeys, rightKeys, opts) {
    opts || (opts = {});
    if (!utils.isArray(leftKeys)) {
      leftKeys = [leftKeys];
    }
    if (!utils.isArray(rightKeys)) {
      rightKeys = [rightKeys];
    }
    utils.fillIn(opts, {
      leftInclusive: true,
      rightInclusive: false,
      limit: undefined,
      offset: 0
    });

    var results = this._between(leftKeys, rightKeys, opts);

    if (opts.limit) {
      return results.slice(opts.offset, opts.limit + opts.offset);
    } else {
      return results.slice(opts.offset);
    }
  },
  _between: function _between(leftKeys, rightKeys, opts) {
    var results = [];

    var leftKey = leftKeys.shift();
    var rightKey = rightKeys.shift();

    var pos = void 0;

    if (leftKey !== undefined) {
      pos = binarySearch(this.keys, leftKey);
    } else {
      pos = {
        found: false,
        index: 0
      };
    }

    if (leftKeys.length === 0) {
      if (pos.found && opts.leftInclusive === false) {
        pos.index += 1;
      }

      for (var i = pos.index; i < this.keys.length; i += 1) {
        if (rightKey !== undefined) {
          if (opts.rightInclusive) {
            if (this.keys[i] > rightKey) {
              break;
            }
          } else {
            if (this.keys[i] >= rightKey) {
              break;
            }
          }
        }

        if (this.values[i].isIndex) {
          results = results.concat(this.values[i].getAll());
        } else {
          results = results.concat(this.values[i]);
        }

        if (opts.limit) {
          if (results.length >= opts.limit + opts.offset) {
            break;
          }
        }
      }
    } else {
      for (var _i2 = pos.index; _i2 < this.keys.length; _i2 += 1) {
        var currKey = this.keys[_i2];
        if (currKey > rightKey) {
          break;
        }

        if (this.values[_i2].isIndex) {
          if (currKey === leftKey) {
            results = results.concat(this.values[_i2]._between(utils.copy(leftKeys), rightKeys.map(function () {
              return undefined;
            }), opts));
          } else if (currKey === rightKey) {
            results = results.concat(this.values[_i2]._between(leftKeys.map(function () {
              return undefined;
            }), utils.copy(rightKeys), opts));
          } else {
            results = results.concat(this.values[_i2].getAll());
          }
        } else {
          results = results.concat(this.values[_i2]);
        }

        if (opts.limit) {
          if (results.length >= opts.limit + opts.offset) {
            break;
          }
        }
      }
    }

    if (opts.limit) {
      return results.slice(0, opts.limit + opts.offset);
    } else {
      return results;
    }
  },
  peek: function peek() {
    if (this.values.length) {
      if (this.values[0].isIndex) {
        return this.values[0].peek();
      } else {
        return this.values[0];
      }
    }
    return [];
  },
  clear: function clear() {
    this.keys = [];
    this.values = [];
  },
  insertRecord: function insertRecord(data) {
    var keyList = this.fieldList.map(function (field) {
      if (utils.isFunction(field)) {
        return field(data) || null;
      } else {
        return data[field] || null;
      }
    });
    this.set(keyList, data);
  },
  removeRecord: function removeRecord(data) {
    var _this = this;

    var removed = void 0;
    this.values.forEach(function (value, i) {
      if (value.isIndex) {
        if (value.removeRecord(data)) {
          if (value.keys.length === 0) {
            removeAt(_this.keys, i);
            removeAt(_this.values, i);
          }
          removed = true;
          return false;
        }
      } else {
        var dataLocation = binarySearch(value, data, _this.hashCode);
        if (dataLocation.found) {
          removeAt(value, dataLocation.index);
          if (value.length === 0) {
            removeAt(_this.keys, i);
            removeAt(_this.values, i);
          }
          removed = true;
          return false;
        }
      }
    });
    return removed ? data : undefined;
  },
  updateRecord: function updateRecord(data) {
    this.removeRecord(data);
    this.insertRecord(data);
  }
});

var DOMAIN$1 = 'Collection';

var COLLECTION_DEFAULTS = {
  /**
   * Whether to call {@link Record#commit} on records that are added to the
   * collection and already exist in the collection.
   *
   * @name Collection#commitOnMerge
   * @type {boolean}
   * @default true
   */
  commitOnMerge: true,

  /**
   * Field to be used as the unique identifier for records in this collection.
   * Defaults to `"id"` unless {@link Collection#mapper} is set, in which case
   * this will default to {@link Mapper#idAttribute}.
   *
   * @name Collection#idAttribute
   * @type {string}
   * @default "id"
   */
  idAttribute: 'id',

  /**
   * What to do when inserting a record into this Collection that shares a
   * primary key with a record already in this Collection.
   *
   * Possible values:
   * merge
   * replace
   *
   * Merge:
   *
   * Recursively shallow copy properties from the new record onto the existing
   * record.
   *
   * Replace:
   *
   * Shallow copy top-level properties from the new record onto the existing
   * record. Any top-level own properties of the existing record that are _not_
   * on the new record will be removed.
   *
   * @name Collection#onConflict
   * @type {string}
   * @default "merge"
   */
  onConflict: 'merge'
};

/**
 * An ordered set of {@link Record} instances.
 *
 * @example
 * import {Collection, Record} from 'js-data'
 * const user1 = new Record({ id: 1 })
 * const user2 = new Record({ id: 2 })
 * const UserCollection = new Collection([user1, user2])
 * UserCollection.get(1) === user1 // true
 *
 * @class Collection
 * @extends Component
 * @type {Function}
 * @param {Array} [records] Initial set of records to insert into the
 * collection.
 * @param {Object} [opts] Configuration options.
 * @param {string} [opts.commitOnMerge] See {@link Collection#commitOnMerge}.
 * @param {string} [opts.idAttribute] See {@link Collection#idAttribute}.
 * @param {string} [opts.onConflict="merge"] See {@link Collection#onConflict}.
 * @param {string} [opts.mapper] See {@link Collection#mapper}.
 * @since 3.0.0
 */
function Collection(records, opts) {
  utils.classCallCheck(this, Collection);
  Collection.__super__.call(this);

  if (records && !utils.isArray(records)) {
    opts = records;
    records = [];
  }
  if (utils.isString(opts)) {
    opts = { idAttribute: opts };
  }

  // Default values for arguments
  records || (records = []);
  opts || (opts = {});

  /**
   * Default Mapper for this collection. Optional. If a Mapper is provided, then
   * the collection will use the {@link Mapper#idAttribute} setting, and will
   * wrap records in {@link Mapper#recordClass}.
   *
   * @example
   * import {Collection, Mapper} from 'js-data'
   *
   * class MyMapperClass extends Mapper {
   *   foo () { return 'bar' }
   * }
   * const myMapper = new MyMapperClass()
   * const collection = new Collection(null, { mapper: myMapper })
   *
   * @name Collection#mapper
   * @type {Mapper}
   * @default null
   * @since 3.0.0
   */
  Object.defineProperties(this, {
    mapper: {
      value: undefined,
      writable: true
    },
    // Query class used by this collection
    queryClass: {
      value: undefined,
      writable: true
    }
  });

  // Apply user-provided configuration
  utils.fillIn(this, opts);
  // Fill in any missing options with the defaults
  utils.fillIn(this, utils.copy(COLLECTION_DEFAULTS));

  if (!this.queryClass) {
    this.queryClass = Query$1;
  }

  var idAttribute = this.recordId();

  Object.defineProperties(this, {
    /**
     * The main index, which uses @{link Collection#recordId} as the key.
     *
     * @name Collection#index
     * @type {Index}
     */
    index: {
      value: new Index([idAttribute], {
        hashCode: function hashCode(obj) {
          return utils.get(obj, idAttribute);
        }
      })
    },

    /**
     * Object that holds the secondary indexes of this collection.
     *
     * @name Collection#indexes
     * @type {Object.<string, Index>}
     */
    indexes: {
      value: {}
    }
  });

  // Insert initial data into the collection
  if (records) {
    this.add(records);
  }
}

var Collection$1 = Component.extend({
  constructor: Collection,

  /**
   * Used to bind to events emitted by records in this Collection.
   *
   * @method Collection#_onRecordEvent
   * @since 3.0.0
   * @private
   * @param {...*} [arg] Args passed to {@link Collection#emit}.
   */
  _onRecordEvent: function _onRecordEvent() {
    this.emit.apply(this, arguments);
  },


  /**
   * Insert the provided record or records.
   *
   * If a record is already in the collection then the provided record will
   * either merge with or replace the existing record based on the value of the
   * `onConflict` option.
   *
   * The collection's secondary indexes will be updated as each record is
   * visited.
   *
   * @method Collection#add
   * @since 3.0.0
   * @param {(Object|Object[]|Record|Record[])} data The record or records to insert.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.commitOnMerge=true] See {@link Collection#commitOnMerge}.
   * @param {string} [opts.onConflict] See {@link Collection#onConflict}.
   * @returns {(Object|Object[]|Record|Record[])} The added record or records.
   */
  add: function add(records, opts) {
    var _this = this;

    // Default values for arguments
    opts || (opts = {});

    // Fill in "opts" with the Collection's configuration
    utils._(opts, this);
    records = this.beforeAdd(records, opts) || records;

    // Track whether just one record or an array of records is being inserted
    var singular = false;
    var idAttribute = this.recordId();
    if (!utils.isArray(records)) {
      if (utils.isObject(records)) {
        records = [records];
        singular = true;
      } else {
        throw utils.err(DOMAIN$1 + '#add', 'records')(400, 'object or array', records);
      }
    }

    // Map the provided records to existing records.
    // New records will be inserted. If any records map to existing records,
    // they will be merged into the existing records according to the onConflict
    // option.
    records = records.map(function (record) {
      var id = _this.recordId(record);
      if (!utils.isSorN(id)) {
        throw utils.err(DOMAIN$1 + '#add', 'record.' + idAttribute)(400, 'string or number', id);
      }
      // Grab existing record if there is one
      var existing = _this.get(id);
      // If the currently visited record is just a reference to an existing
      // record, then there is nothing to be done. Exit early.
      if (record === existing) {
        return existing;
      }

      if (existing) {
        // Here, the currently visited record corresponds to a record already
        // in the collection, so we need to merge them
        var onConflict = opts.onConflict || _this.onConflict;
        if (onConflict === 'merge') {
          utils.deepMixIn(existing, record);
        } else if (onConflict === 'replace') {
          utils.forOwn(existing, function (value, key) {
            if (key !== idAttribute && !record.hasOwnProperty(key)) {
              delete existing[key];
            }
          });
          existing.set(record);
        } else {
          throw utils.err(DOMAIN$1 + '#add', 'opts.onConflict')(400, 'one of (merge, replace)', onConflict, true);
        }
        record = existing;
        if (opts.commitOnMerge && utils.isFunction(record.commit)) {
          record.commit();
        }
        // Update all indexes in the collection
        _this.updateIndexes(record);
      } else {
        // Here, the currently visted record does not correspond to any record
        // in the collection, so (optionally) instantiate this record and insert
        // it into the collection
        record = _this.mapper ? _this.mapper.createRecord(record, opts) : record;
        _this.index.insertRecord(record);
        utils.forOwn(_this.indexes, function (index, name) {
          index.insertRecord(record);
        });
        if (record && utils.isFunction(record.on)) {
          record.on('all', _this._onRecordEvent, _this);
        }
      }
      return record;
    });
    // Finally, return the inserted data
    var result = singular ? records[0] : records;
    // TODO: Make this more performant (batch events?)
    this.emit('add', result);
    return this.afterAdd(records, opts, result) || result;
  },


  /**
   * Lifecycle hook called by {@link Collection#add}. If this method returns a
   * value then {@link Collection#add} will return that same value.
   *
   * @method Collection#method
   * @since 3.0.0
   * @param {(Object|Object[]|Record|Record[])} result The record or records
   * that were added to this Collection by {@link Collection#add}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#add}.
   */
  afterAdd: function afterAdd() {},


  /**
   * Lifecycle hook called by {@link Collection#remove}. If this method returns
   * a value then {@link Collection#remove} will return that same value.
   *
   * @method Collection#afterRemove
   * @since 3.0.0
   * @param {(string|number)} id The `id` argument passed to {@link Collection#remove}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#remove}.
   * @param {Object} record The result that will be returned by {@link Collection#remove}.
   */
  afterRemove: function afterRemove() {},


  /**
   * Lifecycle hook called by {@link Collection#removeAll}. If this method
   * returns a value then {@link Collection#removeAll} will return that same
   * value.
   *
   * @method Collection#afterRemoveAll
   * @since 3.0.0
   * @param {Object} query The `query` argument passed to {@link Collection#removeAll}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#removeAll}.
   * @param {Object} records The result that will be returned by {@link Collection#removeAll}.
   */
  afterRemoveAll: function afterRemoveAll() {},


  /**
   * Lifecycle hook called by {@link Collection#add}. If this method returns a
   * value then the `records` argument in {@link Collection#add} will be
   * re-assigned to the returned value.
   *
   * @method Collection#beforeAdd
   * @since 3.0.0
   * @param {(Object|Object[]|Record|Record[])} records The `records` argument passed to {@link Collection#add}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#add}.
   */
  beforeAdd: function beforeAdd() {},


  /**
   * Lifecycle hook called by {@link Collection#remove}.
   *
   * @method Collection#beforeRemove
   * @since 3.0.0
   * @param {(string|number)} id The `id` argument passed to {@link Collection#remove}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#remove}.
   */
  beforeRemove: function beforeRemove() {},


  /**
   * Lifecycle hook called by {@link Collection#removeAll}.
   *
   * @method Collection#beforeRemoveAll
   * @since 3.0.0
   * @param {Object} query The `query` argument passed to {@link Collection#removeAll}.
   * @param {Object} opts The `opts` argument passed to {@link Collection#removeAll}.
   */
  beforeRemoveAll: function beforeRemoveAll() {},


  /**
   * Find all records between two boundaries.
   *
   * Shortcut for `collection.query().between(18, 30, { index: 'age' }).run()`
   *
   * @example <caption>Get all users ages 18 to 30</caption>
   * const users = collection.between(18, 30, { index: 'age' })
   *
   * @example <caption>Same as above</caption>
   * const users = collection.between([18], [30], { index: 'age' })
   *
   * @method Collection#between
   * @since 3.0.0
   * @param {Array} leftKeys Keys defining the left boundary.
   * @param {Array} rightKeys Keys defining the right boundary.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.index] Name of the secondary index to use in the
   * query. If no index is specified, the main index is used.
   * @param {boolean} [opts.leftInclusive=true] Whether to include records
   * on the left boundary.
   * @param {boolean} [opts.rightInclusive=false] Whether to include records
   * on the left boundary.
   * @param {boolean} [opts.limit] Limit the result to a certain number.
   * @param {boolean} [opts.offset] The number of resulting records to skip.
   * @returns {Array} The result.
   */
  between: function between(leftKeys, rightKeys, opts) {
    return this.query().between(leftKeys, rightKeys, opts).run();
  },


  /**
   * Create a new secondary index on the contents of the collection.
   *
   * @example <caption>Index users by age</caption>
   * collection.createIndex('age')
   *
   * @example <caption>Index users by status and role</caption>
   * collection.createIndex('statusAndRole', ['status', 'role'])
   *
   * @method Collection#createIndex
   * @since 3.0.0
   * @param {string} name The name of the new secondary index.
   * @param {string[]} [fieldList] Array of field names to use as the key or
   * compound key of the new secondary index. If no fieldList is provided, then
   * the name will also be the field that is used to index the collection.
   * @returns {Collection} A reference to itself for chaining.
   */
  createIndex: function createIndex(name, fieldList, opts) {
    var _this2 = this;

    if (utils.isString(name) && fieldList === undefined) {
      fieldList = [name];
    }
    opts || (opts = {});
    opts.hashCode || (opts.hashCode = function (obj) {
      return _this2.recordId(obj);
    });
    var index = this.indexes[name] = new Index(fieldList, opts);
    this.index.visitAll(index.insertRecord, index);
    return this;
  },


  /**
   * Find the record or records that match the provided query or pass the
   * provided filter function.
   *
   * Shortcut for `collection.query().filter(queryOrFn[, thisArg]).run()`
   *
   * @example <caption>Get the draft posts created less than three months</caption>
   * const posts = collection.filter({
   *   where: {
   *     status: {
   *       '==': 'draft'
   *     },
   *     created_at_timestamp: {
   *       '>=': (new Date().getTime() - (1000 * 60 * 60 * 24 * 30 * 3)) // 3 months ago
   *     }
   *   }
   * })
   *
   * @example <caption>Use a custom filter function</caption>
   * const posts = collection.filter(function (post) {
   *   return post.isReady()
   * })
   *
   * @method Collection#filter
   * @since 3.0.0
   * @param {(Object|Function)} [queryOrFn={}] Selection query or filter
   * function.
   * @param {Object} [thisArg] Context to which to bind `queryOrFn` if
   * `queryOrFn` is a function.
   * @returns {Array} The result.
   */
  filter: function filter(query, thisArg) {
    return this.query().filter(query, thisArg).run();
  },


  /**
   * Iterate over all records.
   *
   * @example
   * collection.forEach(function (record) {
   *   // do something
   * })
   *
   * @method Collection#forEach
   * @since 3.0.0
   * @param {Function} forEachFn Iteration function.
   * @param {*} [thisArg] Context to which to bind `forEachFn`.
   * @returns {Array} The result.
   */
  forEach: function forEach(cb, thisArg) {
    this.index.visitAll(cb, thisArg);
  },


  /**
   * Get the record with the given id.
   *
   * @method Collection#get
   * @since 3.0.0
   * @param {(string|number)} id The primary key of the record to get.
   * @returns {(Object|Record)} The record with the given id.
   */
  get: function get(id) {
    var instances = this.query().get(id).run();
    return instances.length ? instances[0] : undefined;
  },


  /**
   * Find the record or records that match the provided keyLists.
   *
   * Shortcut for `collection.query().getAll(keyList1, keyList2, ...).run()`
   *
   * @example <caption>Get the posts where "status" is "draft" or "inReview"</caption>
   * const posts = collection.getAll('draft', 'inReview', { index: 'status' })
   *
   * @example <caption>Same as above</caption>
   * const posts = collection.getAll(['draft'], ['inReview'], { index: 'status' })
   *
   * @method Collection#getAll
   * @since 3.0.0
   * @param {...Array} [keyList] Provide one or more keyLists, and all
   * records matching each keyList will be retrieved. If no keyLists are
   * provided, all records will be returned.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.index] Name of the secondary index to use in the
   * query. If no index is specified, the main index is used.
   * @returns {Array} The result.
   */
  getAll: function getAll() {
    var _query;

    return (_query = this.query()).getAll.apply(_query, arguments).run();
  },


  /**
   * Return the index with the given name. If no name is provided, return the
   * main index. Throws an error if the specified index does not exist.
   *
   * @method Collection#getIndex
   * @since 3.0.0
   * @param {string} [name] The name of the index to retrieve.
   */
  getIndex: function getIndex(name) {
    var index = name ? this.indexes[name] : this.index;
    if (!index) {
      throw utils.err(DOMAIN$1 + '#getIndex', name)(404, 'index');
    }
    return index;
  },


  /**
   * Limit the result.
   *
   * Shortcut for `collection.query().limit(maximumNumber).run()`
   *
   * @example
   * const posts = collection.limit(10)
   *
   * @method Collection#limit
   * @since 3.0.0
   * @param {number} num The maximum number of records to keep in the result.
   * @returns {Array} The result.
   */
  limit: function limit(num) {
    return this.query().limit(num).run();
  },


  /**
   * Apply a mapping function to all records.
   *
   * @example
   * const names = collection.map(function (user) {
   *   return user.name
   * })
   *
   * @method Collection#map
   * @since 3.0.0
   * @param {Function} mapFn Mapping function.
   * @param {*} [thisArg] Context to which to bind `mapFn`.
   * @returns {Array} The result of the mapping.
   */
  map: function map(cb, thisArg) {
    var data = [];
    this.index.visitAll(function (value) {
      data.push(cb.call(thisArg, value));
    });
    return data;
  },


  /**
   * Return the result of calling the specified function on each record in this
   * collection's main index.
   *
   * @method Collection#mapCall
   * @since 3.0.0
   * @param {string} funcName Name of function to call
   * @parama {...*} [args] Remaining arguments to be passed to the function.
   * @returns {Array} The result.
   */
  mapCall: function mapCall(funcName) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var data = [];
    this.index.visitAll(function (record) {
      data.push(record[funcName].apply(record, args));
    });
    return data;
  },


  /**
   * Return the primary key of the given, or if no record is provided, return the
   * name of the field that holds the primary key of records in this Collection.
   *
   * @method Collection#recordId
   * @since 3.0.0
   * @param {(Object|Record)} [record] The record whose primary key is to be
   * returned.
   * @returns {(string|number)} Primary key or name of field that holds primary
   * key.
   */
  recordId: function recordId(record) {
    if (record) {
      return utils.get(record, this.recordId());
    }
    return this.mapper ? this.mapper.idAttribute : this.idAttribute;
  },


  /**
   * Create a new query to be executed against the contents of the collection.
   * The result will be all or a subset of the contents of the collection.
   *
   * @example <caption>Grab page 2 of users between ages 18 and 30</caption>
   * collection.query()
   *   .between(18, 30, { index: 'age' }) // between ages 18 and 30
   *   .skip(10) // second page
   *   .limit(10) // page size
   *   .run()
   *
   * @method Collection#query
   * @since 3.0.0
   * @returns {Query} New query object.
   */
  query: function query() {
    var Ctor = this.queryClass;
    return new Ctor(this);
  },


  /**
   * Reduce the data in the collection to a single value and return the result.
   *
   * @example
   * const totalVotes = collection.reduce(function (prev, record) {
   *   return prev + record.upVotes + record.downVotes
   * }, 0)
   *
   * @method Collection#reduce
   * @since 3.0.0
   * @param {Function} cb Reduction callback.
   * @param {*} initialValue Initial value of the reduction.
   * @returns {*} The result.
   */
  reduce: function reduce(cb, initialValue) {
    var data = this.getAll();
    return data.reduce(cb, initialValue);
  },


  /**
   * Remove the record with the given id from this Collection.
   *
   * @method Collection#remove
   * @since 3.0.0
   * @param {(string|number)} id The primary key of the record to be removed.
   * @param {Object} [opts] Configuration options.
   * @returns {Object|Record} The removed record, if any.
   */
  remove: function remove(id, opts) {
    // Default values for arguments
    opts || (opts = {});
    this.beforeRemove(id, opts);
    var record = this.get(id);

    // The record is in the collection, remove it
    if (record) {
      this.index.removeRecord(record);
      utils.forOwn(this.indexes, function (index, name) {
        index.removeRecord(record);
      });
      if (record && utils.isFunction(record.off)) {
        record.off('all', this._onRecordEvent, this);
        this.emit('remove', record);
      }
    }
    return this.afterRemove(id, opts, record) || record;
  },


  /**
   * Remove the record selected by "query" from this collection.
   *
   * @method Collection#removeAll
   * @since 3.0.0
   * @param {Object} [query={}] Selection query. See {@link query}.
   * @param {Object} [query.where] See {@link query.where}.
   * @param {number} [query.offset] See {@link query.offset}.
   * @param {number} [query.limit] See {@link query.limit}.
   * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options.
   * @returns {(Object[]|Record[])} The removed records, if any.
   */
  removeAll: function removeAll(query, opts) {
    var _this3 = this;

    // Default values for arguments
    opts || (opts = {});
    this.beforeRemoveAll(query, opts);
    var records = this.filter(query);

    // Remove each selected record from the collection
    records.forEach(function (item) {
      _this3.remove(_this3.recordId(item), opts);
    });
    return this.afterRemoveAll(query, opts, records) || records;
  },


  /**
   * Skip a number of results.
   *
   * Shortcut for `collection.query().skip(numberToSkip).run()`
   *
   * @example
   * const posts = collection.skip(10)
   *
   * @method Collection#skip
   * @since 3.0.0
   * @param {number} num The number of records to skip.
   * @returns {Array} The result.
   */
  skip: function skip(num) {
    return this.query().skip(num).run();
  },


  /**
   * Return the plain JSON representation of all items in this collection.
   * Assumes records in this collection have a toJSON method.
   *
   * @method Collection#toJSON
   * @since 3.0.0
   * @param {Object} [opts] Configuration options.
   * @param {string[]} [opts.with] Array of relation names or relation fields
   * to include in the representation.
   * @returns {Array} The records.
   */
  toJSON: function toJSON(opts) {
    return this.mapCall('toJSON', opts);
  },


  /**
   * Update a record's position in a single index of this collection. See
   * {@link Collection#updateIndexes} to update a record's position in all
   * indexes at once.
   *
   * @method Collection#updateIndex
   * @since 3.0.0
   * @param {Object} record The record to update.
   * @param {Object} [opts] Configuration options.
   * @param {string} [opts.index] The index in which to update the record's
   * position. If you don't specify an index then the record will be updated
   * in the main index.
   */
  updateIndex: function updateIndex(record, opts) {
    opts || (opts = {});
    this.getIndex(opts.index).updateRecord(record);
  },


  /**
   * TODO
   *
   * @method Collection#updateIndexes
   * @since 3.0.0
   * @param {Object} record TODO
   * @param {Object} [opts] Configuration options.
   */
  updateIndexes: function updateIndexes(record) {
    this.index.updateRecord(record);
    utils.forOwn(this.indexes, function (index, name) {
      index.updateRecord(record);
    });
  }
});

/**
 * Create a subclass of this Collection.
 *
 * @example <caption>Extend the class in a cross-browser manner.</caption>
 * import {Collection} from 'js-data'
 * const CustomCollectionClass = Collection.extend({
 *   foo () { return 'bar' }
 * })
 * const customCollection = new CustomCollectionClass()
 * console.log(customCollection.foo()) // "bar"
 *
 * @example <caption>Extend the class using ES2015 class syntax.</caption>
 * class CustomCollectionClass extends Collection {
 *   foo () { return 'bar' }
 * }
 * const customCollection = new CustomCollectionClass()
 * console.log(customCollection.foo()) // "bar"
 *
 * @method Collection.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Collection class.
 * @since 3.0.0
 */

var DOMAIN$5 = 'Record';

var superMethod = function superMethod(mapper, name) {
  var store = mapper.datastore;
  if (store && store[name]) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return store[name].apply(store, [mapper.name].concat(args));
    };
  }
  return mapper[name].bind(mapper);
};

/**
 * js-data's Record class.
 *
 * ```javascript
 * import {Record} from 'js-data'
 * ```
 *
 * @class Record
 * @extends Component
 * @param {Object} [props] The initial properties of the new Record instance.
 * @param {Object} [opts] Configuration options.
 * @param {boolean} [opts.noValidate=false] Whether to skip validation on the
 * initial properties.
 * @since 3.0.0
 */
function Record(props, opts) {
  utils.classCallCheck(this, Record);
  props || (props = {});
  opts || (opts = {});
  var _props = {};
  Object.defineProperties(this, {
    _get: {
      value: function value(key) {
        return utils.get(_props, key);
      }
    },
    _set: {
      value: function value(key, _value) {
        return utils.set(_props, key, _value);
      }
    },
    _unset: {
      value: function value(key) {
        return utils.unset(_props, key);
      }
    }
  });
  var _set = this._set;
  // TODO: Optimize these strings
  _set('creating', true);
  if (opts.noValidate) {
    _set('noValidate', true);
  }
  utils.fillIn(this, props);
  _set('creating', false);
  _set('noValidate', false);
  _set('previous', utils.plainCopy(props));
}

var Record$1 = Component.extend({
  constructor: Record,

  /**
   * Returns the {@link Mapper} paired with this record's class, if any.
   *
   * @private
   * @method Record#_mapper
   * @returns {Mapper} The {@link Mapper} paired with this record's class, if any.
   * @since 3.0.0
   */
  _mapper: function _mapper() {
    var mapper = this.constructor.mapper;
    if (!mapper) {
      throw utils.err(DOMAIN$5 + '#_mapper', '')(404, 'mapper');
    }
    return mapper;
  },


  /**
   * Lifecycle hook.
   *
   * @method Record#afterLoadRelations
   * @param {string[]} relations The `relations` argument passed to {@link Record#loadRelations}.
   * @param {Object} opts The `opts` argument passed to {@link Record#loadRelations}.
   * @since 3.0.0
   */
  afterLoadRelations: function afterLoadRelations() {},


  /**
   * Lifecycle hook.
   *
   * @method Record#beforeLoadRelations
   * @param {string[]} relations The `relations` argument passed to {@link Record#loadRelations}.
   * @param {Object} opts The `opts` argument passed to {@link Record#loadRelations}.
   * @since 3.0.0
   */
  beforeLoadRelations: function beforeLoadRelations() {},


  /**
   * Return changes to this record since it was instantiated or
   * {@link Record#commit} was called.
   *
   * @method Record#changes
   * @param [opts] Configuration options.
   * @param {Function} [opts.equalsFn={@link utils.deepEqual}] Equality function.
   * @param {Array} [opts.ignore=[]] Array of strings or RegExp of fields to ignore.
   * @returns {Object} Object describing the changes to this record since it was
   * instantiated or its {@link Record#commit} method was last called.
   * @since 3.0.0
   */
  changes: function changes(opts) {
    opts || (opts = {});
    return utils.diffObjects(typeof this.toJSON === 'function' ? this.toJSON(opts) : this, this._get('previous'), opts);
  },


  /**
   * Make the record's current in-memory state it's only state, with any
   * previous property values being set to current values.
   *
   * @method Record#commit
   * @since 3.0.0
   */
  commit: function commit() {
    this._set('changed'); // unset
    this._set('previous', utils.plainCopy(this));
  },


  /**
   * Call {@link Mapper#destroy} using this record's primary key.
   *
   * @method Record#destroy
   * @param {Object} [opts] Configuration options passed to {@link Mapper#destroy}.
   * @returns {Promise} The result of calling {@link Mapper#destroy} with the
   * primary key of this record.
   * @since 3.0.0
   */
  destroy: function destroy(opts) {
    opts || (opts = {});
    var mapper = this._mapper();
    return superMethod(mapper, 'destroy')(utils.get(this, mapper.idAttribute), opts);
  },


  /**
   * Return the value at the given path for this instance.
   *
   * @method Record#get
   * @param {string} key Path of value to retrieve.
   * @returns {*} Value at path.
   * @since 3.0.0
   */
  'get': function get(key) {
    return utils.get(this, key);
  },


  /**
   * Return whether this record has changed since it was instantiated or
   * {@link Record#commit} was called.
   *
   * @method Record#hasChanges
   * @param [opts] Configuration options.
   * @param {Function} [opts.equalsFn={@link utils.deepEqual}] Equality function.
   * @param {Array} [opts.ignore=[]] Array of strings or RegExp of fields to ignore.
   * @returns {boolean} Return whether the record has changed since it was
   * instantiated or since its {@link Record#commit} method was called.
   * @since 3.0.0
   */
  hasChanges: function hasChanges(opts) {
    var quickHasChanges = !!(this._get('changed') || []).length;
    return quickHasChanges || utils.areDifferent(typeof this.toJSON === 'function' ? this.toJSON(opts) : this, this._get('previous'), opts);
  },


  /**
   * Return whether the record in its current state passes validation.
   *
   * @method Record#isValid
   * @param {Object} [opts] Configuration options. Passed to {@link Mapper#validate}.
   * @returns {boolean} Whether the record in its current state passes
   * validation.
   * @since 3.0.0
   */
  isValid: function isValid(opts) {
    return !this._mapper().validate(this, opts);
  },


  /**
   * Lazy load relations of this record, to be attached to the record once their
   * loaded.
   *
   * @method Record#loadRelations
   * @param {string[]} [relations] List of relations to load.
   * @param {Object} [opts] Configuration options.
   * @returns {Promise} Resolves with the record, with the loaded relations now
   * attached.
   * @since 3.0.0
   */
  loadRelations: function loadRelations(relations, opts) {
    var _this = this;

    var op = void 0;
    var mapper = this._mapper();

    // Default values for arguments
    relations || (relations = []);
    if (utils.isString(relations)) {
      relations = [relations];
    }
    opts || (opts = {});
    opts.with = relations;

    // Fill in "opts" with the Model's configuration
    utils._(opts, mapper);
    opts.adapter = mapper.getAdapterName(opts);

    // beforeLoadRelations lifecycle hook
    op = opts.op = 'beforeLoadRelations';
    return utils.resolve(this[op](relations, opts)).then(function () {
      // Now delegate to the adapter
      op = opts.op = 'loadRelations';
      mapper.dbg(op, _this, relations, opts);
      var tasks = [];
      var task = void 0;
      utils.forEachRelation(mapper, opts, function (def, optsCopy) {
        var relatedMapper = def.getRelation();
        optsCopy.raw = false;
        if (utils.isFunction(def.load)) {
          task = def.load(mapper, def, _this, opts);
        } else if (def.type === 'hasMany' || def.type === 'hasOne') {
          if (def.foreignKey) {
            task = superMethod(relatedMapper, 'findAll')(babelHelpers.defineProperty({}, def.foreignKey, utils.get(_this, mapper.idAttribute)), optsCopy).then(function (relatedData) {
              if (def.type === 'hasOne') {
                return relatedData.length ? relatedData[0] : undefined;
              }
              return relatedData;
            });
          } else if (def.localKeys) {
            task = superMethod(relatedMapper, 'findAll')({
              where: babelHelpers.defineProperty({}, relatedMapper.idAttribute, {
                'in': utils.get(_this, def.localKeys)
              })
            });
          } else if (def.foreignKeys) {
            task = superMethod(relatedMapper, 'findAll')({
              where: babelHelpers.defineProperty({}, def.foreignKeys, {
                'contains': utils.get(_this, mapper.idAttribute)
              })
            }, opts);
          }
        } else if (def.type === 'belongsTo') {
          var key = utils.get(_this, def.foreignKey);
          if (utils.isSorN(key)) {
            task = superMethod(relatedMapper, 'find')(key, optsCopy);
          }
        }
        if (task) {
          task = task.then(function (relatedData) {
            def.setLocalField(_this, relatedData);
          });
          tasks.push(task);
        }
      });
      return Promise.all(tasks);
    }).then(function () {
      // afterLoadRelations lifecycle hook
      op = opts.op = 'afterLoadRelations';
      return utils.resolve(_this[op](relations, opts)).then(function () {
        return _this;
      });
    });
  },


  /**
   * Return the properties with which this record was instantiated.
   *
   * @method Record#previous
   * @param {string} [key] If specified, return just the initial value of the
   * given key.
   * @returns {Object} The initial properties of this record.
   * @since 3.0.0
   */
  previous: function previous(key) {
    if (key) {
      return this._get('previous.' + key);
    }
    return this._get('previous');
  },


  /**
   * Revert changes to this record back to the properties it had when it was
   * instantiated.
   *
   * @method Record#revert
   * @param {Object} [opts] Configuration options.
   * @param {string[]} [opts.preserve] Array of strings or Regular Expressions
   * denoting properties that should not be reverted.
   * @since 3.0.0
   */
  revert: function revert(opts) {
    var _this2 = this;

    var previous = this._get('previous');
    opts || (opts = {});
    opts.preserve || (opts.preserve = []);
    utils.forOwn(this, function (value, key) {
      if (key !== _this2._mapper().idAttribute && !previous.hasOwnProperty(key) && _this2.hasOwnProperty(key) && opts.preserve.indexOf(key) === -1) {
        delete _this2[key];
      }
    });
    utils.forOwn(previous, function (value, key) {
      if (opts.preserve.indexOf(key) === -1) {
        _this2[key] = value;
      }
    });
    this.commit();
  },


  /**
   * Delegates to {@link Mapper#create} or {@link Mapper#update}.
   *
   * @method Record#save
   * @param {Object} [opts] Configuration options. See {@link Mapper#create} and
   * {@link Mapper#update}.
   * @param {boolean} [opts.changesOnly] Equality function. Default uses `===`.
   * @param {Function} [opts.equalsFn] Passed to {@link Record#changes} when
   * `opts.changesOnly` is `true`.
   * @param {Array} [opts.ignore] Passed to {@link Record#changes} when
   * `opts.changesOnly` is `true`.
   * @returns {Promise} The result of calling {@link Mapper#create} or
   * {@link Mapper#update}.
   * @since 3.0.0
   */
  save: function save(opts) {
    var _this3 = this;

    opts || (opts = {});
    var mapper = this._mapper();
    var id = utils.get(this, mapper.idAttribute);
    var props = this;
    if (utils.isUndefined(id)) {
      return superMethod(mapper, 'create')(props, opts);
    }
    if (opts.changesOnly) {
      var changes = this.changes(opts);
      props = {};
      utils.fillIn(props, changes.added);
      utils.fillIn(props, changes.changed);
    }
    return superMethod(mapper, 'update')(id, props, opts).then(function (result) {
      var record = opts.raw ? result.data : result;
      if (record) {
        utils.deepMixIn(_this3, record);
        _this3.commit();
      }
      return result;
    });
  },


  /**
   * Set the value for a given key, or the values for the given keys if "key" is
   * an object.
   *
   * @method Record#set
   * @param {(string|Object)} key Key to set or hash of key-value pairs to set.
   * @param {*} [value] Value to set for the given key.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.silent=false] Whether to trigger change events.
   * @since 3.0.0
   */
  'set': function set(key, value, opts) {
    if (utils.isObject(key)) {
      opts = value;
    }
    opts || (opts = {});
    if (opts.silent) {
      this._set('silent', true);
    }
    utils.set(this, key, value);
    if (!this._get('eventId')) {
      this._set('silent'); // unset
    }
  },


  /**
   * Return a plain object representation of this record. If the class from
   * which this record was created has a Mapper, then {@link Mapper#toJSON} will
   * be called with this record instead.
   *
   * @method Record#toJSON
   * @param {Object} [opts] Configuration options.
   * @param {string[]} [opts.with] Array of relation names or relation fields
   * to include in the representation. Only available as an option if the class
   * from which this record was created has a Mapper and this record resides in
   * an instance of {@link DataStore}.
   * @returns {Object} Plain object representation of this record.
   * @since 3.0.0
   */
  toJSON: function toJSON(opts) {
    var _this4 = this;

    var mapper = this.constructor.mapper;
    if (mapper) {
      return mapper.toJSON(this, opts);
    } else {
      var _ret = function () {
        var json = {};
        utils.forOwn(_this4, function (prop, key) {
          json[key] = utils.plainCopy(prop);
        });
        return {
          v: json
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
    }
  },


  /**
   * Unset the value for a given key.
   *
   * @method Record#unset
   * @param {string} key Key to unset.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.silent=false] Whether to trigger change events.
   * @since 3.0.0
   */
  unset: function unset(key, opts) {
    this.set(key, undefined, opts);
  },


  /**
   * Validate this record based on its current properties.
   *
   * @method Record#validate
   * @param {Object} [opts] Configuration options. Passed to {@link Mapper#validate}.
   * @returns {*} Array of errors or `undefined` if no errors.
   * @since 3.0.0
   */
  validate: function validate(opts) {
    return this._mapper().validate(this, opts);
  }
});

/**
 * Allow records to emit events.
 *
 * An record's registered listeners are stored in the record's private data.
 */
utils.eventify(Record.prototype, function () {
  return this._get('events');
}, function (value) {
  this._set('events', value);
});

/**
 * Create a subclass of this Record.
 *
 * @example <caption>Extend the class in a cross-browser manner.</caption>
 * import {Record} from 'js-data'
 * const CustomRecordClass = Record.extend({
 *   foo () { return 'bar' }
 * })
 * const customRecord = new CustomRecordClass()
 * console.log(customRecord.foo()) // "bar"
 *
 * @example <caption>Extend the class using ES2015 class syntax.</caption>
 * class CustomRecordClass extends Record {
 *   foo () { return 'bar' }
 * }
 * const customRecord = new CustomRecordClass()
 * console.log(customRecord.foo()) // "bar"
 *
 * @method Record.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Record class.
 * @since 3.0.0
 */

var DOMAIN$6 = 'Schema';

/**
 * A function map for each of the seven primitive JSON types defined by the core specification.
 * Each function will check a given value and return true or false if the value is an instance of that type.
 * ```
 *   types.integer(1) // returns true
 *   types.string({}) // returns false
 * ```
 * http://json-schema.org/latest/json-schema-core.html#anchor8
 * @name Schema.types
 * @type {Object}
 */
var types = {
  array: utils.isArray,
  boolean: utils.isBoolean,
  integer: utils.isInteger,
  'null': utils.isNull,
  number: utils.isNumber,
  object: utils.isObject,
  string: utils.isString
};

/**
 * @ignore
 */
var segmentToString = function segmentToString(segment, prev) {
  var str = '';
  if (segment) {
    if (utils.isNumber(segment)) {
      str += '[' + segment + ']';
    } else if (prev) {
      str += '.' + segment;
    } else {
      str += '' + segment;
    }
  }
  return str;
};

/**
 * @ignore
 */
var makePath = function makePath(opts) {
  opts || (opts = {});
  var path = '';
  var segments = opts.path || [];
  segments.forEach(function (segment) {
    path += segmentToString(segment, path);
  });
  path += segmentToString(opts.prop, path);
  return path;
};

/**
 * @ignore
 */
var makeError = function makeError(actual, expected, opts) {
  return {
    expected: expected,
    actual: '' + actual,
    path: makePath(opts)
  };
};

/**
 * @ignore
 */
var addError = function addError(actual, expected, opts, errors) {
  errors.push(makeError(actual, expected, opts));
};

/**
 * @ignore
 */
var maxLengthCommon = function maxLengthCommon(keyword, value, schema, opts) {
  var max = schema[keyword];
  if (value.length > max) {
    return makeError(value.length, 'length no more than ' + max, opts);
  }
};

/**
 * @ignore
 */
var minLengthCommon = function minLengthCommon(keyword, value, schema, opts) {
  var min = schema[keyword];
  if (value.length < min) {
    return makeError(value.length, 'length no less than ' + min, opts);
  }
};

/**
 * A map of all object member validation functions for each keyword defined in the JSON Schema.
 * @name Schema.validationKeywords
 * @type {Object}
 */
var validationKeywords = {
  /**
   * Validates the provided value against all schemas defined in the Schemas `allOf` keyword.
   * The instance is valid against if and only if it is valid against all the schemas declared in the Schema's value.
   *
   * The value of this keyword MUST be an array. This array MUST have at least one element.
   * Each element of this array MUST be a valid JSON Schema.
   *
   * see http://json-schema.org/latest/json-schema-validation.html#anchor82
   *
   * @name Schema.validationKeywords.allOf
   * @method
   * @param {*} value Value to be validated.
   * @param {Object} [schema] Schema containing the `allOf` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */

  allOf: function allOf(value, schema, opts) {
    var allErrors = [];
    schema.allOf.forEach(function (_schema) {
      allErrors = allErrors.concat(_validate(value, _schema, opts) || []);
    });
    return allErrors.length ? undefined : allErrors;
  },


  /**
   * Validates the provided value against all schemas defined in the Schemas `anyOf` keyword.
   * The instance is valid against this keyword if and only if it is valid against
   * at least one of the schemas in this keyword's value.
   *
   * The value of this keyword MUST be an array. This array MUST have at least one element.
   * Each element of this array MUST be an object, and each object MUST be a valid JSON Schema.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor85
   *
   * @name Schema.validationKeywords.anyOf
   * @method
   * @param {*} value Value to be validated.
   * @param {Object} [schema] Schema containing the `anyOf` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  anyOf: function anyOf(value, schema, opts) {
    var validated = false;
    var allErrors = [];
    schema.anyOf.forEach(function (_schema) {
      var errors = _validate(value, _schema, opts);
      if (errors) {
        allErrors = allErrors.concat(errors);
      } else {
        validated = true;
      }
    });
    return validated ? undefined : allErrors;
  },


  /**
   * http://json-schema.org/latest/json-schema-validation.html#anchor70
   *
   * @name Schema.validationKeywords.dependencies
   * @method
   * @param {*} value TODO
   * @param {Object} schema TODO
   * @param {Object} opts TODO
   */
  dependencies: function dependencies(value, schema, opts) {
    // TODO
  },


  /**
   * Validates the provided value against an array of possible values defined by the Schema's `enum` keyword
   * Validation succeeds if the value is deeply equal to one of the values in the array.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor76
   *
   * @name Schema.validationKeywords.enum
   * @method
   * @param {*} value Value to validate
   * @param {Object} [schema] Schema containing the `enum` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  enum: function _enum(value, schema, opts) {
    var possibleValues = schema['enum'];
    if (utils.findIndex(possibleValues, function (item) {
      return utils.deepEqual(item, value);
    }) === -1) {
      return makeError(value, 'one of (' + possibleValues.join(', ') + ')', opts);
    }
  },


  /**
   * Validates each of the provided array values against a schema or an array of schemas defined by the Schema's `items` keyword
   * see http://json-schema.org/latest/json-schema-validation.html#anchor37 for validation rules.
   *
   * @name Schema.validationKeywords.items
   * @method
   * @param {*} value [Array] Array to be validated.
   * @param {Object} [schema] Schema containing the items keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  items: function items(value, schema, opts) {
    opts || (opts = {});
    // TODO: additionalItems
    var items = schema.items;
    var errors = [];
    var checkingTuple = utils.isArray(items);
    var length = value.length;
    for (var prop = 0; prop < length; prop++) {
      if (checkingTuple) {
        // Validating a tuple, instead of just checking each item against the
        // same schema
        items = schema.items[prop];
      }
      opts.prop = prop;
      errors = errors.concat(_validate(value[prop], items, opts) || []);
    }
    return errors.length ? errors : undefined;
  },


  /**
   * Validates the provided number against a maximum value defined by the Schema's `maximum` keyword
   * Validation succeeds if the value is a number, and is less than, or equal to, the value of this keyword.
   * http://json-schema.org/latest/json-schema-validation.html#anchor17
   *
   * @name Schema.validationKeywords.maximum
   * @method
   * @param {*} value [Number] number to validate against the keyword.
   * @param {Object} schema [schema] Schema containing the `maximum` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  maximum: function maximum(value, schema, opts) {
    // Must be a number
    var maximum = schema.maximum;
    // Must be a boolean
    // Depends on maximum
    // default: false
    var exclusiveMaximum = schema.exclusiveMaximum;
    if ((typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === (typeof maximum === 'undefined' ? 'undefined' : babelHelpers.typeof(maximum)) && !(exclusiveMaximum ? maximum > value : maximum >= value)) {
      return exclusiveMaximum ? makeError(value, 'no more than nor equal to ' + maximum, opts) : makeError(value, 'no more than ' + maximum, opts);
    }
  },


  /**
   * Validates the length of the provided array against a maximum value defined by the Schema's `maxItems` keyword.
   * Validation succeeds if the length of the array is less than, or equal to the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor42
   *
   * @name Schema.validationKeywords.maxItems
   * @method
   * @param {*} value [array] Array to be validated.
   * @param {Object} [schema] Schema containing the `maxItems` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  maxItems: function maxItems(value, schema, opts) {
    if (utils.isArray(value)) {
      return maxLengthCommon('maxItems', value, schema, opts);
    }
  },


  /**
   * Validates the length of the provided string against a maximum value defined in the Schema's `maxLength` keyword.
   * Validation succeeds if the length of the string is less than, or equal to the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor26
   *
   * @name Schema.validationKeywords.maxLength
   * @method
   * @param {*} value [string] String to be validated.
   * @param {Object} [schema] Schema containing the `maxLength` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  maxLength: function maxLength(value, schema, opts) {
    return maxLengthCommon('maxLength', value, schema, opts);
  },


  /**
   * Validates the count of the provided object's properties against a maximum value defined in the Schema's `maxProperties` keyword.
   * Validation succeeds if the object's property count is less than, or equal to the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor54
   *
   * @name Schema.validationKeywords.maxProperties
   * @method
   * @param {*} value [Object] Object to be validated.
   * @param {Object} [schema] Schema containing the `maxProperties` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  maxProperties: function maxProperties(value, schema, opts) {
    // validate only objects
    if (!utils.isObject(value)) return;
    var maxProperties = schema.maxProperties;
    var length = Object.keys(value).length;
    if (length > maxProperties) {
      return makeError(length, 'no more than ' + maxProperties + ' properties', opts);
    }
  },


  /**
   * Validates the provided value against a minimum value defined by the Schema's `minimum` keyword
   * Validation succeeds if the value is a number and is greater than, or equal to, the value of this keyword.
   * http://json-schema.org/latest/json-schema-validation.html#anchor21
   *
   * @name Schema.validationKeywords.minimum
   * @method
   * @param {*} value [number] number to validate against the keyword.
   * @param {Object} [schema] Schema containing the `minimum` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  minimum: function minimum(value, schema, opts) {
    // Must be a number
    var minimum = schema.minimum;
    // Must be a boolean
    // Depends on minimum
    // default: false
    var exclusiveMinimum = schema.exclusiveMinimum;
    if ((typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === (typeof minimum === 'undefined' ? 'undefined' : babelHelpers.typeof(minimum)) && !(exclusiveMinimum ? value > minimum : value >= minimum)) {
      return exclusiveMinimum ? makeError(value, 'no less than nor equal to ' + minimum, opts) : makeError(value, 'no less than ' + minimum, opts);
    }
  },


  /**
   * Validates the length of the provided array against a minimum value defined by the Schema's `minItems` keyword.
   * Validation succeeds if the length of the array is greater than, or equal to the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor45
   *
   * @name Schema.validationKeywords.minItems
   * @method
   * @param {*} value [array] Array to be validated.
   * @param {Object} [schema] Schema containing the `minItems` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  minItems: function minItems(value, schema, opts) {
    if (utils.isArray(value)) {
      return minLengthCommon('minItems', value, schema, opts);
    }
  },


  /**
   * Validates the length of the provided string against a minimum value defined in the Schema's `minLength` keyword.
   * Validation succeeds if the length of the string is greater than, or equal to the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor29
   *
   * @name Schema.validationKeywords.minLength
   * @method
   * @param {*} value [string] String to be validated.
   * @param {Object} [schema] Schema containing the `minLength` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  minLength: function minLength(value, schema, opts) {
    return minLengthCommon('minLength', value, schema, opts);
  },


  /**
   * Validates the count of the provided object's properties against a minimum value defined in the Schema's `minProperties` keyword.
   * Validation succeeds if the object's property count is greater than, or equal to the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor57
   *
   * @name Schema.validationKeywords.minProperties
   * @method
   * @param {*} value [Object] Object to be validated.
   * @param {Object} [schema] Schema containing the `minProperties` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  minProperties: function minProperties(value, schema, opts) {
    // validate only objects
    if (!utils.isObject(value)) return;
    var minProperties = schema.minProperties;
    var length = Object.keys(value).length;
    if (length < minProperties) {
      return makeError(length, 'no more than ' + minProperties + ' properties', opts);
    }
  },


  /**
   * Validates the provided number is a multiple of the number defined in the Schema's `multipleOf` keyword.
   * Validation succeeds if the number can be divided equally into the value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor14
   *
   * @name Schema.validationKeywords.multipleOf
   * @method
   * @param {*} value [number] Number to be validated.
   * @param {Object} [schema] Schema containing the `multipleOf` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  multipleOf: function multipleOf(value, schema, opts) {
    var multipleOf = schema.multipleOf;
    if (utils.isNumber(value)) {
      if (value / multipleOf % 1 !== 0) {
        return makeError(value, 'multipleOf ' + multipleOf, opts);
      }
    }
  },


  /**
   * Validates the provided value is not valid with any of the schemas defined in the Schema's `not` keyword.
   * An instance is valid against this keyword if and only if it is NOT valid against the schemas in this keyword's value.
   *
   * see http://json-schema.org/latest/json-schema-validation.html#anchor91
   * @name Schema.validationKeywords.not
   * @method
   * @param {*} value to be checked.
   * @param {Object} [schema] Schema containing the not keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  not: function not(value, schema, opts) {
    if (!_validate(value, schema.not, opts)) {
      // TODO: better messaging
      return makeError('succeeded', 'should have failed', opts);
    }
  },


  /**
   * Validates the provided value is valid with one and only one of the schemas defined in the Schema's `oneOf` keyword.
   * An instance is valid against this keyword if and only if it is valid against a single schemas in this keyword's value.
   *
   * see http://json-schema.org/latest/json-schema-validation.html#anchor88
   * @name Schema.validationKeywords.oneOf
   * @method
   * @param {*} value to be checked.
   * @param {Object} [schema] Schema containing the `oneOf` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  oneOf: function oneOf(value, schema, opts) {
    var validated = false;
    var allErrors = [];
    schema.oneOf.forEach(function (_schema) {
      var errors = _validate(value, _schema, opts);
      if (errors) {
        allErrors = allErrors.concat(errors);
      } else if (validated) {
        allErrors = [makeError('valid against more than one', 'valid against only one', opts)];
        validated = false;
        return false;
      } else {
        validated = true;
      }
    });
    return validated ? undefined : allErrors;
  },


  /**
   * Validates the provided string matches a pattern defined in the Schema's `pattern` keyword.
   * Validation succeeds if the string is a match of the regex value of this keyword.
   *
   * see http://json-schema.org/latest/json-schema-validation.html#anchor33
   * @name Schema.validationKeywords.pattern
   * @method
   * @param {*} value [string] String to be validated.
   * @param {Object} [schema] Schema containing the `pattern` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  pattern: function pattern(value, schema, opts) {
    var pattern = schema.pattern;
    if (utils.isString(value) && !value.match(pattern)) {
      return makeError(value, pattern, opts);
    }
  },


  /**
   * Validates the provided object's properties against a map of values defined in the Schema's `properties` keyword.
   * Validation succeeds if the object's property are valid with each of the schema's in the provided map.
   * Validation also depends on the additionalProperties and or patternProperties.
   *
   * see http://json-schema.org/latest/json-schema-validation.html#anchor64 for more info.
   *
   * @name Schema.validationKeywords.properties
   * @method
   * @param {*} value [Object] Object to be validated.
   * @param {Object} [schema] Schema containing the `properties` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  properties: function properties(value, schema, opts) {
    opts || (opts = {});
    // Can be a boolean or an object
    // Technically the default is an "empty schema", but here "true" is
    // functionally the same
    var additionalProperties = utils.isUndefined(schema.additionalProperties) ? true : schema.additionalProperties;
    // "s": The property set of the instance to validate.
    var toValidate = {};
    // "p": The property set from "properties".
    // Default is an object
    var properties = schema.properties || {};
    // "pp": The property set from "patternProperties".
    // Default is an object
    var patternProperties = schema.patternProperties || {};
    var errors = [];

    // Collect set "s"
    utils.forOwn(value, function (_value, prop) {
      toValidate[prop] = undefined;
    });
    // Remove from "s" all elements of "p", if any.
    utils.forOwn(properties || {}, function (_schema, prop) {
      if (utils.isUndefined(value[prop]) && !utils.isUndefined(_schema['default'])) {
        value[prop] = utils.copy(_schema['default']);
      }
      opts.prop = prop;
      errors = errors.concat(_validate(value[prop], _schema, opts) || []);
      delete toValidate[prop];
    });
    // For each regex in "pp", remove all elements of "s" which this regex
    // matches.
    utils.forOwn(patternProperties, function (_schema, pattern) {
      utils.forOwn(toValidate, function (undef, prop) {
        if (prop.match(pattern)) {
          opts.prop = prop;
          errors = errors.concat(_validate(value[prop], _schema, opts) || []);
          delete toValidate[prop];
        }
      });
    });
    var keys = Object.keys(toValidate);
    // If "s" is not empty, validation fails
    if (additionalProperties === false) {
      if (keys.length) {
        addError('extra fields: ' + keys.join(', '), 'no extra fields', opts, errors);
      }
    } else if (utils.isObject(additionalProperties)) {
      // Otherwise, validate according to provided schema
      keys.forEach(function (prop) {
        opts.prop = prop;
        errors = errors.concat(_validate(value[prop], additionalProperties, opts) || []);
      });
    }
    return errors.length ? errors : undefined;
  },


  /**
   * Validates the provided object's has all properties listed in the Schema's `properties` keyword array.
   * Validation succeeds if the object contains all properties provided in the array value of this keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor61
   *
   * @name Schema.validationKeywords.required
   * @method
   * @param {*} value [Object] Object to be validated.
   * @param {Object} [schema] Schema containing the `required` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  required: function required(value, schema, opts) {
    opts || (opts = {});
    var required = schema.required;
    var errors = [];
    if (!opts.existingOnly) {
      required.forEach(function (prop) {
        if (utils.isUndefined(utils.get(value, prop))) {
          var prevProp = opts.prop;
          opts.prop = prop;
          addError(undefined, 'a value', opts, errors);
          opts.prop = prevProp;
        }
      });
    }
    return errors.length ? errors : undefined;
  },


  /**
   * Validates the provided value's type is equal to the type, or array of types, defined in the Schema's `type` keyword.
   * see http://json-schema.org/latest/json-schema-validation.html#anchor79
   *
   * @name Schema.validationKeywords.type
   * @method
   * @param {*} value Value to be validated.
   * @param {Object} [schema] Schema containing the `type` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  type: function type(value, schema, opts) {
    var type = schema.type;
    var validType = void 0;
    // Can be one of several types
    if (utils.isString(type)) {
      type = [type];
    }
    // Try to match the value against an expected type
    type.forEach(function (_type) {
      // TODO: throw an error if type is not defined
      if (types[_type](value, schema, opts)) {
        // Matched a type
        validType = _type;
        return false;
      }
    });
    // Value did not match any expected type
    if (!validType) {
      return makeError(!utils.isUndefined(value) && value !== null ? typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value) : '' + value, 'one of (' + type.join(', ') + ')', opts);
    }
    // Run keyword validators for matched type
    // http://json-schema.org/latest/json-schema-validation.html#anchor12
    var validator = typeGroupValidators[validType];
    if (validator) {
      return validator(value, schema, opts);
    }
  },


  /**
   * Validates the provided array values are unique.
   * Validation succeeds if the items in the array are unique, but only if the value of this keyword is true
   * see http://json-schema.org/latest/json-schema-validation.html#anchor49
   *
   * @name Schema.validationKeywords.uniqueItems
   * @method
   * @param {*} value [array] Array to be validated.
   * @param {Object} [schema] Schema containing the `uniqueItems` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  uniqueItems: function uniqueItems(value, schema, opts) {
    if (value && value.length && schema.uniqueItems) {
      var length = value.length;
      var item = void 0,
          i = void 0,
          j = void 0;
      // Check n - 1 items
      for (i = length - 1; i > 0; i--) {
        item = value[i];
        // Only compare against unchecked items
        for (j = i - 1; j >= 0; j--) {
          // Found a duplicate
          if (utils.deepEqual(item, value[j])) {
            return makeError(item, 'no duplicates', opts);
          }
        }
      }
    }
  }
};

/**
 * @ignore
 */
var validateKeyword = function validateKeyword(op, value, schema, opts) {
  return !utils.isUndefined(schema[op]) && validationKeywords[op](value, schema, opts);
};

/**
 * @ignore
 */
var runOps = function runOps(ops, value, schema, opts) {
  var errors = [];
  ops.forEach(function (op) {
    errors = errors.concat(validateKeyword(op, value, schema, opts) || []);
  });
  return errors.length ? errors : undefined;
};

var ANY_OPS = ['enum', 'type', 'allOf', 'anyOf', 'oneOf', 'not'];
var ARRAY_OPS = ['items', 'maxItems', 'minItems', 'uniqueItems'];
var NUMERIC_OPS = ['multipleOf', 'maximum', 'minimum'];
var OBJECT_OPS = ['maxProperties', 'minProperties', 'required', 'properties', 'dependencies'];
var STRING_OPS = ['maxLength', 'minLength', 'pattern'];

/**
 * http://json-schema.org/latest/json-schema-validation.html#anchor75
 * @ignore
 */
var validateAny = function validateAny(value, schema, opts) {
  return runOps(ANY_OPS, value, schema, opts);
};

/**
 * Validates the provided value against a given Schema according to the http://json-schema.org/ v4 specification.
 *
 * @name Schema.validate
 * @method
 * @param {*} value Value to be validated.
 * @param {Object} [schema] Valid Schema according to the http://json-schema.org/ v4 specification.
 * @param {Object} [opts] Configuration options.
 * @returns {(array|undefined)} Array of errors or `undefined` if valid.
 */
var _validate = function _validate(value, schema, opts) {
  var errors = [];
  opts || (opts = {});
  var shouldPop = void 0;
  var prevProp = opts.prop;
  if (utils.isUndefined(schema)) {
    return;
  }
  if (!utils.isObject(schema)) {
    throw utils.err(DOMAIN$6 + '#validate')(500, 'Invalid schema at path: "' + opts.path + '"');
  }
  if (utils.isUndefined(opts.path)) {
    opts.path = [];
  }
  // Track our location as we recurse
  if (!utils.isUndefined(opts.prop)) {
    shouldPop = true;
    opts.path.push(opts.prop);
    opts.prop = undefined;
  }
  // Validate against parent schema
  if (schema['extends']) {
    // opts.path = path
    // opts.prop = prop
    if (utils.isFunction(schema['extends'].validate)) {
      errors = errors.concat(schema['extends'].validate(value, opts) || []);
    } else {
      errors = errors.concat(_validate(value, schema['extends'], opts) || []);
    }
  }
  if (utils.isUndefined(value)) {
    // Check if property is required
    if (schema.required === true && !opts.existingOnly) {
      addError(value, 'a value', opts, errors);
    }
    if (shouldPop) {
      opts.path.pop();
      opts.prop = prevProp;
    }
    return errors.length ? errors : undefined;
  }

  errors = errors.concat(validateAny(value, schema, opts) || []);
  if (shouldPop) {
    opts.path.pop();
    opts.prop = prevProp;
  }
  return errors.length ? errors : undefined;
};

// These strings are cached for optimal performance of the change detection
// boolean - Whether a Record is changing in the current execution frame
var changingPath = 'changing';
// string[] - Properties that have changed in the current execution frame
var changedPath = 'changed';
// boolean - Whether a Record is currently being instantiated
var creatingPath = 'creating';
// number - The setTimeout change event id of a Record, if any
var eventIdPath = 'eventId';
// boolean - Whether to skip validation for a Record's currently changing property
var noValidatePath = 'noValidate';
// boolean - Whether to skip change notification for a Record's currently
// changing property
var silentPath = 'silent';
var validationFailureMsg = 'validation failed';

/**
 * Assemble a property descriptor which will be added to the prototype of
 * {@link Mapper#recordClass}. This method is called when
 * {@link Mapper#applySchema} is set to `true`.
 *
 * TODO: Make this more configurable, i.e. not so tied to the Record class.
 *
 * @ignore
 */
var makeDescriptor = function makeDescriptor(prop, schema, opts) {
  var descriptor = {
    // Better to allow configurability, but at the user's own risk
    configurable: true,
    // These properties are enumerable by default, but regardless of their
    // enumerability, they won't be "own" properties of individual records
    enumerable: utils.isUndefined(schema.enumerable) ? true : !!schema.enumerable
  };
  // Cache a few strings for optimal performance
  var keyPath = 'props.' + prop;
  var previousPath = 'previous.' + prop;
  var getter = opts.getter;
  var setter = opts.setter;
  var unsetter = opts.unsetter;

  descriptor.get = function () {
    return this._get(keyPath);
  };

  if (utils.isFunction(schema.get)) {
    (function () {
      var originalGet = descriptor.get;
      descriptor.get = function () {
        return schema.get.call(this, originalGet);
      };
    })();
  }

  descriptor.set = function (value) {
    var _this = this;

    // These are accessed a lot
    var _get = this[getter];
    var _set = this[setter];
    var _unset = this[unsetter];

    // Optionally check that the new value passes validation
    if (!_get(noValidatePath)) {
      var errors = schema.validate(value);
      if (errors) {
        // Immediately throw an error, preventing the record from getting into
        // an invalid state
        var error = new Error(validationFailureMsg);
        error.errors = errors;
        throw error;
      }
    }
    // TODO: Make it so tracking can be turned on for all properties instead of
    // only per-property
    if (schema.track && !_get(creatingPath)) {
      (function () {
        var previous = _get(previousPath);
        var current = _get(keyPath);
        var changing = _get(changingPath);
        var changed = _get(changedPath);

        if (!changing) {
          // Track properties that are changing in the current event loop
          changed = [];
        }

        // Add changing properties to this array once at most
        var index = changed.indexOf(prop);
        if (current !== value && index === -1) {
          changed.push(prop);
        }
        if (previous === value) {
          if (index >= 0) {
            changed.splice(index, 1);
          }
        }
        // No changes in current event loop
        if (!changed.length) {
          changing = false;
          _unset(changingPath);
          _unset(changedPath);
          // Cancel pending change event
          if (_get(eventIdPath)) {
            clearTimeout(_get(eventIdPath));
            _unset(eventIdPath);
          }
        }
        // Changes detected in current event loop
        if (!changing && changed.length) {
          _set(changedPath, changed);
          _set(changingPath, true);
          // Saving the timeout id allows us to batch all changes in the same
          // event loop into a single "change"
          // TODO: Optimize
          _set(eventIdPath, setTimeout(function () {
            // Previous event loop where changes were gathered has ended, so
            // notify any listeners of those changes and prepare for any new
            // changes
            _unset(changedPath);
            _unset(eventIdPath);
            _unset(changingPath);
            // TODO: Optimize
            if (!_get(silentPath)) {
              var i = void 0;
              for (i = 0; i < changed.length; i++) {
                _this.emit('change:' + changed[i], _this, utils.get(_this, changed[i]));
              }
              _this.emit('change', _this, _this.changes());
            }
            _unset(silentPath);
          }, 0));
        }
      })();
    }
    _set(keyPath, value);
    return value;
  };

  if (utils.isFunction(schema.set)) {
    (function () {
      var originalSet = descriptor.set;
      descriptor.set = function (value) {
        return schema.set.call(this, value, originalSet);
      };
    })();
  }

  return descriptor;
};

/**
 * A map of validation functions grouped by type.
 *
 * @name Schema.typeGroupValidators
 * @type {Object}
 */
var typeGroupValidators = {
  /**
   * Validates the provided value against the schema using all of the validation keywords specific to instances of an array.
   * The validation keywords for the type `array` are:
   *```
   * ['items', 'maxItems', 'minItems', 'uniqueItems']
   *```
   * see http://json-schema.org/latest/json-schema-validation.html#anchor25
   *
   * @name Schema.typeGroupValidators.array
   * @method
   * @param {*} value [array] Array to be validated.
   * @param {Object} [schema] Schema containing at least one array keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  array: function array(value, schema, opts) {
    return runOps(ARRAY_OPS, value, schema, opts);
  },

  /**
   * Validates the provided value against the schema using all of the validation keywords specific to instances of an integer.
   * The validation keywords for the type `integer` are:
   *```
   * ['multipleOf', 'maximum', 'minimum']
   *```
   * @name Schema.typeGroupValidators.integer
   * @method
   * @param {*} value [number] Number to be validated.
   * @param {Object} [schema] Schema containing at least one `integer` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  integer: function integer(value, schema, opts) {
    // Additional validations for numerics are the same
    return typeGroupValidators.numeric(value, schema, opts);
  },

  /**
   * Validates the provided value against the schema using all of the validation keywords specific to instances of an number.
   * The validation keywords for the type `number` are:
   *```
   * ['multipleOf', 'maximum', 'minimum']
   *```
   * @name Schema.typeGroupValidators.number
   * @method
   * @param {*} value [number] Number to be validated.
   * @param {Object} [schema] Schema containing at least one `number` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  number: function number(value, schema, opts) {
    // Additional validations for numerics are the same
    return typeGroupValidators.numeric(value, schema, opts);
  },

  /**
   * Validates the provided value against the schema using all of the validation keywords specific to instances of a number or integer.
   * The validation keywords for the type `numeric` are:
   *```
   * ['multipleOf', 'maximum', 'minimum']
   *```
   * See http://json-schema.org/latest/json-schema-validation.html#anchor13.
   *
   * @name Schema.typeGroupValidators.numeric
   * @method
   * @param {*} value [number] Number to be validated.
   * @param {Object} [schema] Schema containing at least one `numeric` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  numeric: function numeric(value, schema, opts) {
    return runOps(NUMERIC_OPS, value, schema, opts);
  },

  /**
   * Validates the provided value against the schema using all of the validation keywords specific to instances of an object.
   * The validation keywords for the type `object` are:
   *```
   * ['maxProperties', 'minProperties', 'required', 'properties', 'dependencies']
   *```
   * See http://json-schema.org/latest/json-schema-validation.html#anchor53.
   *
   * @name Schema.typeGroupValidators.object
   * @method
   * @param {*} value [number] Object to be validated.
   * @param {Object} [schema] Schema containing at least one `object` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  object: function object(value, schema, opts) {
    return runOps(OBJECT_OPS, value, schema, opts);
  },

  /**
   * Validates the provided value against the schema using all of the validation keywords specific to instances of an string.
   * The validation keywords for the type `string` are:
   *```
   * ['maxLength', 'minLength', 'pattern']
   *```
   * See http://json-schema.org/latest/json-schema-validation.html#anchor25.
   *
   * @name Schema.typeGroupValidators.string
   * @method
   * @param {*} value [number] String to be validated.
   * @param {Object} [schema] Schema containing at least one `string` keyword.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  string: function string(value, schema, opts) {
    return runOps(STRING_OPS, value, schema, opts);
  }
};

/**
 * js-data's Schema class.
 *
 * ```javascript
 * import {Schema} from 'js-data'
 * ```
 *
 * @class Schema
 * @extends Component
 * @param {Object} definition Schema definition according to json-schema.org
 */
function Schema(definition) {
  definition || (definition = {});
  // TODO: schema validation
  utils.fillIn(this, definition);

  // TODO: rework this to make sure all possible keywords are converted
  if (definition.properties) {
    utils.forOwn(definition.properties, function (_definition, prop) {
      if (!(_definition instanceof Schema)) {
        definition.properties[prop] = new Schema(_definition);
      }
    });
  }
}

var Schema$1 = Component.extend({
  constructor: Schema,

  /**
   * This adds ES5 getters/setters to the target based on the "properties" in
   * this Schema, which makes possible change tracking and validation on
   * property assignment.
   *
   * @name Schema#validate
   * @method
   * @param {Object} target The prototype to which to apply this schema.
   */
  apply: function apply(target, opts) {
    opts || (opts = {});
    opts.getter = opts.getter || '_get';
    opts.setter = opts.setter || '_set';
    opts.unsetter = opts.unsetter || '_unset';
    var properties = this.properties || {};
    utils.forOwn(properties, function (schema, prop) {
      Object.defineProperty(target, prop, makeDescriptor(prop, schema, opts));
    });
  },


  /**
   * Validate the provided value against this schema.
   *
   * @name Schema#validate
   * @method
   * @param {*} value Value to validate.
   * @param {Object} [opts] Configuration options.
   * @returns {(array|undefined)} Array of errors or `undefined` if valid.
   */
  validate: function validate(value, opts) {
    return _validate(value, this, opts);
  }
}, {
  typeGroupValidators: typeGroupValidators,
  types: types,
  validate: _validate,
  validationKeywords: validationKeywords
});

// TODO: remove this when the rest of the project is cleaned
var belongsToType = 'belongsTo';
var hasManyType = 'hasMany';
var hasOneType = 'hasOne';

var DOMAIN$7 = 'Relation';

function Relation(relatedMapper) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  utils.classCallCheck(this, Relation);

  options.type = this.constructor.TYPE_NAME;
  this.validateOptions(relatedMapper, options);

  if ((typeof relatedMapper === 'undefined' ? 'undefined' : babelHelpers.typeof(relatedMapper)) === 'object') {
    Object.defineProperty(this, 'relatedMapper', { value: relatedMapper });
  }

  Object.defineProperty(this, 'inverse', { writable: true });
  utils.fillIn(this, options);
}

Relation.extend = utils.extend;

utils.addHiddenPropsToTarget(Relation.prototype, {
  get canAutoAddLinks() {
    return utils.isUndefined(this.add) || !!this.add;
  },

  get relatedCollection() {
    return this.mapper.datastore.getCollection(this.relation);
  },

  validateOptions: function validateOptions(related, opts) {
    var DOMAIN_ERR = 'new ' + DOMAIN$7;

    var localField = opts.localField;
    if (!localField) {
      throw utils.err(DOMAIN_ERR, 'opts.localField')(400, 'string', localField);
    }

    var foreignKey = opts.foreignKey = opts.foreignKey || opts.localKey;
    if (!foreignKey && (opts.type === belongsToType || opts.type === hasOneType)) {
      throw utils.err(DOMAIN_ERR, 'opts.foreignKey')(400, 'string', foreignKey);
    }

    if (utils.isString(related)) {
      opts.relation = related;
      if (!utils.isFunction(opts.getRelation)) {
        throw utils.err(DOMAIN_ERR, 'opts.getRelation')(400, 'function', opts.getRelation);
      }
    } else if (related) {
      opts.relation = related.name;
    } else {
      throw utils.err(DOMAIN_ERR, 'related')(400, 'Mapper or string', related);
    }
  },
  assignTo: function assignTo(mapper) {
    this.name = mapper.name;
    Object.defineProperty(this, 'mapper', { value: mapper });

    mapper.relationList || Object.defineProperty(mapper, 'relationList', { value: [] });
    mapper.relationFields || Object.defineProperty(mapper, 'relationFields', { value: [] });
    mapper.relationList.push(this);
    mapper.relationFields.push(this.localField);
  },
  canFindLinkFor: function canFindLinkFor() {
    return Boolean(this.foreignKey || this.localKey);
  },
  getRelation: function getRelation() {
    return this.relatedMapper;
  },
  getForeignKey: function getForeignKey(record) {
    return utils.get(record, this.mapper.idAttribute);
  },
  setForeignKey: function setForeignKey(record, relatedRecord) {
    if (!record || !relatedRecord) {
      return;
    }

    this._setForeignKey(record, relatedRecord);
  },
  _setForeignKey: function _setForeignKey(record, relatedRecord) {
    var _this = this;

    var idAttribute = this.mapper.idAttribute;

    if (!utils.isArray(relatedRecord)) {
      relatedRecord = [relatedRecord];
    }

    relatedRecord.forEach(function (relatedRecordItem) {
      utils.set(relatedRecordItem, _this.foreignKey, utils.get(record, idAttribute));
    });
  },
  getLocalField: function getLocalField(record) {
    return utils.get(record, this.localField);
  },
  setLocalField: function setLocalField(record, data) {
    return utils.set(record, this.localField, data);
  },
  getInverse: function getInverse(mapper) {
    if (!this.inverse) {
      this.findInverseRelation(mapper);
    }

    return this.inverse;
  },
  findInverseRelation: function findInverseRelation(mapper) {
    var _this2 = this;

    this.getRelation().relationList.forEach(function (def) {
      if (def.getRelation() === mapper && _this2.isInversedTo(def)) {
        _this2.inverse = def;
        return true;
      }
    });
  },
  isInversedTo: function isInversedTo(def) {
    return !def.foreignKey || def.foreignKey === this.foreignKey;
  },
  linkRecords: function linkRecords(relatedMapper, records) {
    var _this3 = this;

    var datastore = this.mapper.datastore;

    records.forEach(function (record) {
      var relatedData = _this3.getLocalField(record);

      if (utils.isFunction(_this3.add)) {
        relatedData = _this3.add(datastore, _this3, record);
      } else if (relatedData) {
        relatedData = _this3.linkRecord(record, relatedData);
      }

      var isEmptyLinks = !relatedData || utils.isArray(relatedData) && !relatedData.length;

      if (isEmptyLinks && _this3.canFindLinkFor(record)) {
        relatedData = _this3.findExistingLinksFor(relatedMapper, record);
      }

      if (relatedData) {
        _this3.setLocalField(record, relatedData);
      }
    });
  },
  linkRecord: function linkRecord(record, relatedRecord) {
    var relatedId = utils.get(relatedRecord, this.mapper.idAttribute);

    if (relatedRecord !== this.relatedCollection.get(relatedId)) {
      this.setForeignKey(record, relatedRecord);

      if (this.canAutoAddLinks) {
        relatedRecord = this.relatedCollection.add(relatedRecord);
      }
    }

    return relatedRecord;
  },
  findExistingLinksByForeignKey: function findExistingLinksByForeignKey(foreignId) {
    return this.relatedCollection.filter(babelHelpers.defineProperty({}, this.foreignKey, foreignId));
  }
});

var BelongsToRelation = Relation.extend({
  getForeignKey: function getForeignKey(record) {
    return utils.get(record, this.foreignKey);
  },
  _setForeignKey: function _setForeignKey(record, relatedRecord) {
    utils.set(record, this.foreignKey, utils.get(relatedRecord, this.getRelation().idAttribute));
  },
  findExistingLinksFor: function findExistingLinksFor(relatedMapper, record) {
    var relatedId = utils.get(record, this.foreignKey);

    if (!utils.isUndefined(relatedId)) {
      return this.relatedCollection.get(relatedId);
    }
  }
}, {
  TYPE_NAME: 'belongsTo'
});

var HasManyRelation = Relation.extend({
  validateOptions: function validateOptions(related, opts) {
    Relation.prototype.validateOptions.call(this, related, opts);

    var localKeys = opts.localKeys;
    var foreignKeys = opts.foreignKeys;
    var foreignKey = opts.foreignKey;


    if (!foreignKey && !localKeys && !foreignKeys) {
      throw utils.err('new Relation', 'opts.<foreignKey|localKeys|foreignKeys>')(400, 'string', foreignKey);
    }
  },
  canFindLinkFor: function canFindLinkFor(record) {
    var hasForeignKeys = this.foreignKey || this.foreignKeys;

    return Boolean(hasForeignKeys || this.localKeys && utils.get(record, this.localKeys));
  },
  linkRecord: function linkRecord(record, relatedRecords) {
    var _this = this;

    var relatedCollection = this.relatedCollection;

    return relatedRecords.map(function (toInsertItem) {
      var relatedId = relatedCollection.recordId(toInsertItem);

      if (toInsertItem !== relatedCollection.get(relatedId)) {
        if (_this.foreignKey) {
          // TODO: slow, could be optimized? But user loses hook
          _this.setForeignKey(record, toInsertItem);
        }

        if (_this.canAutoAddLinks) {
          toInsertItem = relatedCollection.add(toInsertItem);
        }
      }

      return toInsertItem;
    });
  },
  findExistingLinksFor: function findExistingLinksFor(relatedMapper, record) {
    var recordId = utils.get(record, relatedMapper.idAttribute);
    var localKeysValue = this.localKeys ? utils.get(record, this.localKeys) : null;
    var records = void 0;

    if (this.foreignKey) {
      records = this.findExistingLinksByForeignKey(recordId);
    } else if (this.localKeys && localKeysValue) {
      records = this.findExistingLinksByLocalKeys(localKeysValue);
    } else if (this.foreignKeys) {
      records = this.findExistingLinksByForeignKeys(recordId);
    }

    if (records && records.length) {
      return records;
    }
  },
  findExistingLinksByLocalKeys: function findExistingLinksByLocalKeys(localKeysValue) {
    return this.relatedCollection.filter({
      where: babelHelpers.defineProperty({}, this.mapper.idAttribute, {
        'in': localKeysValue
      })
    });
  },
  findExistingLinksByForeignKeys: function findExistingLinksByForeignKeys(foreignId) {
    return this.relatedCollection.filter({
      where: babelHelpers.defineProperty({}, this.foreignKeys, {
        'contains': foreignId
      })
    });
  }
}, {
  TYPE_NAME: 'hasMany'
});

var HasOneRelation = Relation.extend({
  findExistingLinksFor: function findExistingLinksFor(relatedMapper, record) {
    var recordId = utils.get(record, relatedMapper.idAttribute);
    var records = this.findExistingLinksByForeignKey(recordId);

    if (records.length) {
      return records[0];
    }
  }
}, {
  TYPE_NAME: 'hasOne'
});

[BelongsToRelation, HasManyRelation, HasOneRelation].forEach(function (RelationType) {
  Relation[RelationType.TYPE_NAME] = function (related, options) {
    return new RelationType(related, options);
  };
});

/**
 * TODO
 *
 * @name module:js-data.belongsTo
 * @method
 * @param {Mapper} related The relation the target belongs to.
 * @param {Object} opts Configuration options.
 * @param {string} opts.foreignKey The field that holds the primary key of the
 * related record.
 * @param {string} opts.localField The field that holds a reference to the
 * related record object.
 * @returns {Function} Invocation function, which accepts the target as the only
 * parameter.
 */
var belongsTo = function belongsTo(related, opts) {
  return function (mapper) {
    Relation.belongsTo(related, opts).assignTo(mapper);
  };
};

/**
 * TODO
 *
 * @name module:js-data.hasMany
 * @method
 * @param {Mapper} related The relation of which the target has many.
 * @param {Object} opts Configuration options.
 * @param {string} [opts.foreignKey] The field that holds the primary key of the
 * related record.
 * @param {string} opts.localField The field that holds a reference to the
 * related record object.
 * @returns {Function} Invocation function, which accepts the target as the only
 * parameter.
 */
var hasMany = function hasMany(related, opts) {
  return function (mapper) {
    Relation.hasMany(related, opts).assignTo(mapper);
  };
};

/**
 * TODO
 *
 * @name module:js-data.hasOne
 * @method
 * @param {Mapper} related The relation of which the target has one.
 * @param {Object} opts Configuration options.
 * @param {string} [opts.foreignKey] The field that holds the primary key of the
 * related record.
 * @param {string} opts.localField The field that holds a reference to the
 * related record object.
 * @returns {Function} Invocation function, which accepts the target as the only
 * parameter.
 */
var hasOne = function hasOne(related, opts) {
  return function (mapper) {
    Relation.hasOne(related, opts).assignTo(mapper);
  };
};

var DOMAIN$4 = 'Mapper';
var validatingHooks = ['beforeCreate', 'beforeCreateMany', 'beforeUpdate', 'beforeUpdateAll', 'beforeUpdateMany'];
var makeNotify = function makeNotify(num) {
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var opts = args[args.length - num];
    var op = opts.op;
    this.dbg.apply(this, [op].concat(args));

    // Automatic validation
    if (validatingHooks.indexOf(op) !== -1 && opts.validate !== false) {
      // Save current value of option
      var originalExistingOnly = opts.existingOnly;

      // For updates, ignore required fields if they aren't present
      if (op.indexOf('beforeUpdate') === 0 && utils.isUndefined(opts.existingOnly)) {
        opts.existingOnly = true;
      }
      var errors = this.validate(args[op === 'beforeUpdate' ? 1 : 0], utils.pick(opts, ['existingOnly']));

      // Restore option
      opts.existingOnly = originalExistingOnly;

      // Abort lifecycle due to validation errors
      if (errors) {
        return utils.reject(errors);
      }
    }

    // Emit lifecycle event
    if (opts.notify || opts.notify === undefined && this.notify) {
      setTimeout(function () {
        _this.emit.apply(_this, [op].concat(args));
      });
    }
  };
};

// These are the default implementations of all of the lifecycle hooks
var notify = makeNotify(1);
var notify2 = makeNotify(2);

// This object provides meta information used by Mapper#crud to actually
// execute each lifecycle method
var LIFECYCLE_METHODS = {
  count: {
    defaults: [{}, {}],
    skip: true,
    types: []
  },
  destroy: {
    defaults: [{}, {}],
    skip: true,
    types: []
  },
  destroyAll: {
    defaults: [{}, {}],
    skip: true,
    types: []
  },
  find: {
    defaults: [undefined, {}],
    types: []
  },
  findAll: {
    defaults: [{}, {}],
    types: []
  },
  sum: {
    defaults: [undefined, {}, {}],
    skip: true,
    types: []
  },
  update: {
    adapterArgs: function adapterArgs(mapper, id, props, opts) {
      return [id, mapper.toJSON(props, opts), opts];
    },

    beforeAssign: 1,
    defaults: [undefined, {}, {}],
    types: []
  },
  updateAll: {
    adapterArgs: function adapterArgs(mapper, props, query, opts) {
      return [mapper.toJSON(props, opts), query, opts];
    },

    beforeAssign: 0,
    defaults: [{}, {}, {}],
    types: []
  },
  updateMany: {
    adapterArgs: function adapterArgs(mapper, records, opts) {
      return [records.map(function (record) {
        return mapper.toJSON(record, opts);
      }), opts];
    },

    beforeAssign: 0,
    defaults: [[], {}],
    types: []
  }
};

var MAPPER_DEFAULTS = {
  /**
   * Hash of registered adapters. Don't modify directly. Use
   * {@link Mapper#registerAdapter} instead.
   *
   * @default {}
   * @name Mapper#_adapters
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   */
  _adapters: {},

  /**
   * Whether to augment {@link Mapper#recordClass} with getter/setter property
   * accessors according to the properties defined in {@link Mapper#schema}.
   * This makes possible validation and change tracking on individual properties
   * when using the dot (e.g. `user.name = "Bob"`) operator to modify a
   * property.
   *
   * @default true
   * @name Mapper#applySchema
   * @since 3.0.0
   * @type {boolean}
   */
  applySchema: true,

  /**
   * Whether to enable debug-level logs.
   *
   * @default false
   * @name Mapper#debug
   * @since 3.0.0
   * @type {boolean}
   */
  debug: false,

  /**
   * The name of the registered adapter that this Mapper should used by default.
   *
   * @default "http"
   * @name Mapper#defaultAdapter
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   * @type {string}
   */
  defaultAdapter: 'http',

  /**
   * The field used as the unique identifier on records handled by this Mapper.
   *
   * @default id
   * @name Mapper#idAttribute
   * @since 3.0.0
   * @type {string}
   */
  idAttribute: 'id',

  /**
   * Whether this Mapper should emit operational events.
   *
   * @default true
   * @name Mapper#notify
   * @since 3.0.0
   * @type {boolean}
   */
  notify: true,

  /**
   * Whether {@link Mapper#create}, {@link Mapper#createMany},
   * {@link Mapper#update}, {@link Mapper#updateAll}, {@link Mapper#updateMany},
   * {@link Mapper#find}, {@link Mapper#findAll}, {@link Mapper#destroy},
   * {@link Mapper#destroyAll}, {@link Mapper#count}, and {@link Mapper#sum}
   * should return a raw result object that contains both the instance data
   * returned by the adapter _and_ metadata about the operation.
   *
   * The default is to NOT return the result object, and instead return just the
   * instance data.
   *
   * @default false
   * @name Mapper#raw
   * @since 3.0.0
   * @type {boolean}
   */
  raw: false
};

/**
 * The core of JSData's [ORM/ODM][orm] implementation. Given a minimum amout of
 * meta information about a resource, a Mapper can perform generic CRUD
 * operations against that resource. Apart from its configuration, a Mapper is
 * stateless. The particulars of various persistence layers have been abstracted
 * into adapters, which a Mapper uses to perform its operations.
 *
 * The term "Mapper" comes from the [Data Mapper Pattern][pattern] described in
 * Martin Fowler's [Patterns of Enterprise Application Architecture][book]. A
 * Data Mapper moves data between [in-memory object instances][record] and a
 * relational or document-based database. JSData's Mapper can work with any
 * persistence layer you can write an adapter for.
 *
 * _("Model" is a heavily overloaded term and is avoided in this documentation
 * to prevent confusion.)_
 *
 * [orm]: https://en.wikipedia.org/wiki/Object-relational_mapping
 * [pattern]: https://en.wikipedia.org/wiki/Data_mapper_pattern
 * [book]: http://martinfowler.com/books/eaa.html
 * [record]: Record.html
 *
 * @example <caption>Import and instantiate</caption>
 * import {Mapper} from 'js-data'
 *
 * const UserService = new Mapper({ name: 'user' })
 *
 * @example <caption>Define a Mapper using the Container component</caption>
 * import {Container} from 'js-data'
 *
 * const store = new Container()
 * store.defineMapper('user')
 *
 * @class Mapper
 * @extends Component
 * @param {Object} opts Configuration options.
 * @param {boolean} [opts.applySchema=true] See {@link Mapper#applySchema}.
 * @param {boolean} [opts.debug=false] See {@link Mapper#debug}.
 * @param {string} [opts.defaultAdapter=http] See {@link Mapper#defaultAdapter}.
 * @param {string} [opts.idAttribute=id] See {@link Mapper#idAttribute}.
 * @param {string} opts.name See {@link Mapper#name}.
 * @param {boolean} [opts.notify] See {@link Mapper#notify}.
 * @param {boolean} [opts.raw=false] See {@link Mapper#raw}.
 * @param {Function|boolean} [opts.recordClass] See {@link Mapper#recordClass}.
 * @returns {Mapper} A new {@link Mapper} instance.
 * @see http://www.js-data.io/v3.0/docs/components-of-jsdata#mapper
 * @since 3.0.0
 * @tutorial ["http://www.js-data.io/v3.0/docs/components-of-jsdata#mapper","Components of JSData: Mapper"]
 * @tutorial ["http://www.js-data.io/v3.0/docs/modeling-your-data","Modeling your data"]
 */
function Mapper(opts) {
  var _this2 = this;

  utils.classCallCheck(this, Mapper);
  Mapper.__super__.call(this);
  opts || (opts = {});

  // Prepare certain properties to be non-enumerable
  Object.defineProperties(this, {
    _adapters: {
      value: undefined,
      writable: true
    },

    /**
     * Set to `false` to force the Mapper to work with POJO objects only.
     *
     * @example <caption>Use POJOs only.</caption>
     * import {Mapper, Record} from 'js-data'
     * const UserMapper = new Mapper({ recordClass: false })
     * UserMapper.recordClass // false
     * const user = UserMapper#createRecord()
     * user instanceof Record // false
     *
     * @example <caption>Set to a custom class to have records wrapped in your custom class.</caption>
     * import {Mapper, Record} from 'js-data'
     *  // Custom class
     * class User {
     *   constructor (props = {}) {
     *     for (var key in props) {
     *       if (props.hasOwnProperty(key)) {
     *         this[key] = props[key]
     *       }
     *     }
     *   }
     * }
     * const UserMapper = new Mapper({ recordClass: User })
     * UserMapper.recordClass // function User() {}
     * const user = UserMapper#createRecord()
     * user instanceof Record // false
     * user instanceof User // true
     *
     *
     * @example <caption>Extend the {@link Record} class.</caption>
     * import {Mapper, Record} from 'js-data'
     *  // Custom class
     * class User extends Record {
     *   constructor () {
     *     super(props)
     *   }
     * }
     * const UserMapper = new Mapper({ recordClass: User })
     * UserMapper.recordClass // function User() {}
     * const user = UserMapper#createRecord()
     * user instanceof Record // true
     * user instanceof User // true
     *
     * @name Mapper#recordClass
     * @default {@link Record}
     * @see Record
     * @since 3.0.0
     */
    recordClass: {
      value: undefined,
      writable: true
    },

    /**
     * The meta information describing this Mapper's available lifecycle
     * methods. __Do not modify.__
     *
     * TODO: Improve documentation.
     *
     * @name Mapper#lifecycleMethods
     * @since 3.0.0
     * @type {Object}
     */
    lifecycleMethods: {
      value: LIFECYCLE_METHODS
    },

    /**
     * This Mapper's {@link Schema}.
     *
     * @name Mapper#schema
     * @see Schema
     * @since 3.0.0
     * @type {Schema}
     */
    schema: {
      value: undefined,
      writable: true
    }
  });

  // Apply user-provided configuration
  utils.fillIn(this, opts);
  // Fill in any missing options with the defaults
  utils.fillIn(this, utils.copy(MAPPER_DEFAULTS));

  /**
   * The name for this Mapper. This is the minimum amount of meta information
   * required for a Mapper to be able to execute CRUD operations for a
   * Resource.
   *
   * @name Mapper#name
   * @since 3.0.0
   * @type {string}
   */
  if (!this.name) {
    throw utils.err('new ' + DOMAIN$4, 'opts.name')(400, 'string', this.name);
  }

  // Setup schema, with an empty default schema if necessary
  if (!(this.schema instanceof Schema$1)) {
    this.schema = new Schema$1(this.schema || {});
  }

  if (this.schema instanceof Schema$1) {
    this.schema.type || (this.schema.type = 'object');
  }

  // Create a subclass of Record that's tied to this Mapper
  if (utils.isUndefined(this.recordClass)) {
    (function () {
      var superClass = Record$1;
      _this2.recordClass = superClass.extend({
        constructor: function Record() {
          var subClass = function Record(props, opts) {
            utils.classCallCheck(this, subClass);
            superClass.call(this, props, opts);
          };
          return subClass;
        }()
      });
    })();
  }

  if (this.recordClass) {
    this.recordClass.mapper = this;

    // We can only apply the schema to the prototype of this.recordClass if the
    // class extends Record
    if (utils.getSuper(this.recordClass, true) === Record$1 && this.schema && this.schema.apply && this.applySchema) {
      this.schema.apply(this.recordClass.prototype);
    }
  }
}

var Mapper$1 = Component.extend({
  constructor: Mapper,

  /**
   * Mapper lifecycle hook called by {@link Mapper#count}. If this method
   * returns a promise then {@link Mapper#count} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterCount
   * @param {Object} query The `query` argument passed to {@link Mapper#count}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#count}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterCount: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#create}. If this method
   * returns a promise then {@link Mapper#create} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterCreate
   * @param {Object} props The `props` argument passed to {@link Mapper#create}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#create}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterCreate: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#createMany}. If this method
   * returns a promise then {@link Mapper#createMany} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterCreateMany
   * @param {Array} records The `records` argument passed to {@link Mapper#createMany}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#createMany}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterCreateMany: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#destroy}. If this method
   * returns a promise then {@link Mapper#destroy} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterDestroy
   * @param {(string|number)} id The `id` argument passed to {@link Mapper#destroy}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#destroy}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterDestroy: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#destroyAll}. If this method
   * returns a promise then {@link Mapper#destroyAll} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterDestroyAll
   * @param {*} data The `data` returned by the adapter.
   * @param {query} query The `query` argument passed to {@link Mapper#destroyAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#destroyAll}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterDestroyAll: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#find}. If this method
   * returns a promise then {@link Mapper#find} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterFind
   * @param {(string|number)} id The `id` argument passed to {@link Mapper#find}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#find}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterFind: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#findAll}. If this method
   * returns a promise then {@link Mapper#findAll} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterFindAll
   * @param {Object} query The `query` argument passed to {@link Mapper#findAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#findAll}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterFindAll: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#sum}. If this method
   * returns a promise then {@link Mapper#sum} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterSum
   * @param {Object} query The `query` argument passed to {@link Mapper#sum}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#sum}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterSum: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#update}. If this method
   * returns a promise then {@link Mapper#update} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterUpdate
   * @param {(string|number)} id The `id` argument passed to {@link Mapper#update}.
   * @param {props} props The `props` argument passed to {@link Mapper#update}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#update}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterUpdate: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#updateAll}. If this method
   * returns a promise then {@link Mapper#updateAll} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterUpdateAll
   * @param {Object} props The `props` argument passed to {@link Mapper#updateAll}.
   * @param {Object} query The `query` argument passed to {@link Mapper#updateAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#updateAll}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterUpdateAll: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#updateMany}. If this method
   * returns a promise then {@link Mapper#updateMany} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#afterUpdateMany
   * @param {Array} records The `records` argument passed to {@link Mapper#updateMany}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#updateMany}.
   * @param {*} result The result, if any.
   * @since 3.0.0
   */
  afterUpdateMany: notify2,

  /**
   * Mapper lifecycle hook called by {@link Mapper#create}. If this method
   * returns a promise then {@link Mapper#create} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeCreate
   * @param {Object} props The `props` argument passed to {@link Mapper#create}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#create}.
   * @since 3.0.0
   */
  beforeCreate: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#createMany}. If this method
   * returns a promise then {@link Mapper#createMany} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeCreateMany
   * @param {Array} records The `records` argument passed to {@link Mapper#createMany}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#createMany}.
   * @since 3.0.0
   */
  beforeCreateMany: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#count}. If this method
   * returns a promise then {@link Mapper#count} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeCount
   * @param {Object} query The `query` argument passed to {@link Mapper#count}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#count}.
   * @since 3.0.0
   */
  beforeCount: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#destroy}. If this method
   * returns a promise then {@link Mapper#destroy} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeDestroy
   * @param {(string|number)} id The `id` argument passed to {@link Mapper#destroy}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#destroy}.
   * @since 3.0.0
   */
  beforeDestroy: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#destroyAll}. If this method
   * returns a promise then {@link Mapper#destroyAll} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeDestroyAll
   * @param {query} query The `query` argument passed to {@link Mapper#destroyAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#destroyAll}.
   * @since 3.0.0
   */
  beforeDestroyAll: notify,

  /**
   * Mappers lifecycle hook called by {@link Mapper#find}. If this method
   * returns a promise then {@link Mapper#find} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeFind
   * @param {(string|number)} id The `id` argument passed to {@link Mapper#find}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#find}.
   * @since 3.0.0
   */
  beforeFind: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#findAll}. If this method
   * returns a promise then {@link Mapper#findAll} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeFindAll
   * @param {Object} query The `query` argument passed to {@link Mapper#findAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#findAll}.
   * @since 3.0.0
   */
  beforeFindAll: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#sum}. If this method
   * returns a promise then {@link Mapper#sum} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeSum
   * @param {string} field The `field` argument passed to {@link Mapper#sum}.
   * @param {Object} query The `query` argument passed to {@link Mapper#sum}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#sum}.
   * @since 3.0.0
   */
  beforeSum: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#update}. If this method
   * returns a promise then {@link Mapper#update} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeUpdate
   * @param {(string|number)} id The `id` argument passed to {@link Mapper#update}.
   * @param {props} props The `props` argument passed to {@link Mapper#update}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#update}.
   * @since 3.0.0
   */
  beforeUpdate: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#updateAll}. If this method
   * returns a promise then {@link Mapper#updateAll} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeUpdateAll
   * @param {Object} props The `props` argument passed to {@link Mapper#updateAll}.
   * @param {Object} query The `query` argument passed to {@link Mapper#updateAll}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#updateAll}.
   * @since 3.0.0
   */
  beforeUpdateAll: notify,

  /**
   * Mapper lifecycle hook called by {@link Mapper#updateMany}. If this method
   * returns a promise then {@link Mapper#updateMany} will wait for the promise
   * to resolve before continuing.
   *
   * @method Mapper#beforeUpdateMany
   * @param {Array} records The `records` argument passed to {@link Mapper#updateMany}.
   * @param {Object} opts The `opts` argument passed to {@link Mapper#updateMany}.
   * @since 3.0.0
   */
  beforeUpdateMany: notify,

  /**
   * This method is called at the end of most lifecycle methods. It does the
   * following:
   *
   * 1. If `opts.raw` is `true`, add this Mapper's configuration to the `opts`
   * argument as metadata for the operation.
   * 2. Wrap the result data appropriately using {@link Mapper#wrap}, which
   * calls {@link Mapper#createRecord}.
   *
   * @method Mapper#_end
   * @private
   * @since 3.0.0
   */
  _end: function _end(result, opts, skip) {
    if (opts.raw) {
      utils._(result, opts);
    }
    if (skip) {
      return result;
    }
    var _data = opts.raw ? result.data : result;
    if (_data && utils.isFunction(this.wrap)) {
      _data = this.wrap(_data, opts);
      if (opts.raw) {
        result.data = _data;
      } else {
        result = _data;
      }
    }
    return result;
  },


  /**
   * Define a belongsTo relationship. Only useful if you're managing your
   * Mappers manually and not using a Container or DataStore component.
   *
   * @example
   * PostService.belongsTo(UserService, {
   *   // post.user_id points to user.id
   *   foreignKey: 'user_id'
   *   // user records will be attached to post records at "post.user"
   *   localField: 'user'
   * })
   *
   * CommentService.belongsTo(UserService, {
   *   // comment.user_id points to user.id
   *   foreignKey: 'user_id'
   *   // user records will be attached to comment records at "comment.user"
   *   localField: 'user'
   * })
   * CommentService.belongsTo(PostService, {
   *   // comment.post_id points to post.id
   *   foreignKey: 'post_id'
   *   // post records will be attached to comment records at "comment.post"
   *   localField: 'post'
   * })
   *
   * @method Mapper#belongsTo
   * @see http://www.js-data.io/v3.0/docs/relations
   * @since 3.0.0
   */
  belongsTo: function belongsTo$$(relatedMapper, opts) {
    return belongsTo(relatedMapper, opts)(this);
  },


  /**
   * Select records according to the `query` argument and return the count.
   *
   * {@link Mapper#beforeCount} will be called before calling the adapter.
   * {@link Mapper#afterCount} will be called after calling the adapter.
   *
   * @example <caption>Get the number of published blog posts</caption>
   * PostService.count({ status: 'published' }).then((numPublished) => {
   *   console.log(numPublished) // e.g. 45
   * })
   *
   * @method Mapper#count
   * @param {Object} [query={}] Selection query. See {@link query}.
   * @param {Object} [query.where] See {@link query.where}.
   * @param {number} [query.offset] See {@link query.offset}.
   * @param {number} [query.limit] See {@link query.limit}.
   * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options. Refer to the `count` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @returns {Promise} Resolves with the count of the selected records.
   * @since 3.0.0
   */
  count: function count(query, opts) {
    return this.crud('count', query, opts);
  },


  /**
   * Create and save a new the record using the provided `props`.
   *
   * {@link Mapper#beforeCreate} will be called before calling the adapter.
   * {@link Mapper#afterCreate} will be called after calling the adapter.
   *
   * @example <caption>Create and save a new blog post</caption>
   * PostService.create({
   *   title: 'Modeling your data',
   *   status: 'draft'
   * }).then((post) => {
   *   console.log(post) // { id: 1234, status: 'draft', ... }
   * })
   *
   * @method Mapper#create
   * @param {Object} props The properties for the new record.
   * @param {Object} [opts] Configuration options. Refer to the `create` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @param {string[]} [opts.with=[]] Relations to create in a cascading
   * create if `props` contains nested relations. NOT performed in a
   * transaction. Each nested create will result in another {@link Mapper#create}
   * or {@link Mapper#createMany} call.
   * @param {string[]} [opts.pass=[]] Relations to send to the adapter as part
   * of the payload. Normally relations are not sent.
   * @returns {Promise} Resolves with the created record.
   * @since 3.0.0
   */
  create: function create(props, opts) {
    var _this3 = this;

    var op = void 0,
        adapter = void 0;
    // Default values for arguments
    props || (props = {});
    opts || (opts = {});

    // Fill in "opts" with the Mapper's configuration
    utils._(opts, this);
    adapter = opts.adapter = this.getAdapterName(opts);

    // beforeCreate lifecycle hook
    op = opts.op = 'beforeCreate';
    return utils.resolve(this[op](props, opts)).then(function (_props) {
      // Allow for re-assignment from lifecycle hook
      props = utils.isUndefined(_props) ? props : _props;

      // Deep pre-create belongsTo relations
      var belongsToRelationData = {};
      opts.with || (opts.with = []);
      var tasks = [];
      utils.forEachRelation(_this3, opts, function (def, optsCopy) {
        var relationData = def.getLocalField(props);
        var relatedMapper = def.getRelation();
        var relatedIdAttribute = relatedMapper.idAttribute;
        optsCopy.raw = false;
        if (!relationData) {
          return;
        }
        if (def.type === belongsToType) {
          // Create belongsTo relation first because we need a generated id to
          // attach to the child
          tasks.push(relatedMapper.create(relationData, optsCopy).then(function (data) {
            def.setLocalField(belongsToRelationData, data);
            def.setForeignKey(props, data);
          }));
        } else if (def.type === hasManyType && def.localKeys) {
          // Create his hasMany relation first because it uses localKeys
          tasks.push(relatedMapper.createMany(relationData, optsCopy).then(function (data) {
            def.setLocalField(belongsToRelationData, data);
            utils.set(props, def.localKeys, data.map(function (record) {
              return utils.get(record, relatedIdAttribute);
            }));
          }));
        }
      });
      return utils.Promise.all(tasks).then(function () {
        // Now delegate to the adapter for the main create
        op = opts.op = 'create';
        _this3.dbg(op, props, opts);
        return utils.resolve(_this3.getAdapter(adapter)[op](_this3, _this3.toJSON(props, { with: opts.pass || [] }), opts));
      }).then(function (data) {
        var createdRecord = opts.raw ? data.data : data;
        // Deep post-create hasMany and hasOne relations
        tasks = [];
        utils.forEachRelation(_this3, opts, function (def, optsCopy) {
          var relationData = def.getLocalField(props);
          if (!relationData) {
            return;
          }
          optsCopy.raw = false;
          var task = void 0;
          // Create hasMany and hasOne after the main create because we needed
          // a generated id to attach to these items
          if (def.type === hasManyType && def.foreignKey) {
            def.setForeignKey(createdRecord, relationData);
            task = def.getRelation().createMany(relationData, optsCopy).then(function (data) {
              def.setLocalField(createdRecord, data);
            });
          } else if (def.type === hasOneType) {
            def.setForeignKey(createdRecord, relationData);
            task = def.getRelation().create(relationData, optsCopy).then(function (data) {
              def.setLocalField(createdRecord, data);
            });
          } else if (def.type === belongsToType && def.getLocalField(belongsToRelationData)) {
            def.setLocalField(createdRecord, def.getLocalField(belongsToRelationData));
          } else if (def.type === hasManyType && def.localKeys && def.getLocalField(belongsToRelationData)) {
            def.setLocalField(createdRecord, def.getLocalField(belongsToRelationData));
          }
          if (task) {
            tasks.push(task);
          }
        });
        return utils.Promise.all(tasks).then(function () {
          return data;
        });
      });
    }).then(function (result) {
      result = _this3._end(result, opts);
      // afterCreate lifecycle hook
      op = opts.op = 'afterCreate';
      return utils.resolve(_this3[op](props, opts, result)).then(function (_result) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_result) ? result : _result;
      });
    });
  },


  /**
   * Use {@link Mapper#createRecord} instead.
   * @deprecated
   * @method Mapper#createInstance
   * @param {Object|Array} props See {@link Mapper#createRecord}.
   * @param {Object} [opts] See {@link Mapper#createRecord}.
   * @returns {Object|Array} See {@link Mapper#createRecord}.
   * @see Mapper#createRecord
   * @since 3.0.0
   */
  createInstance: function createInstance(props, opts) {
    return this.createRecord(props, opts);
  },


  /**
   * Given an array of records, batch create them via an adapter.
   *
   * {@link Mapper#beforeCreateMany} will be called before calling the adapter.
   * {@link Mapper#afterCreateMany} will be called after calling the adapter.
   *
   * @example <caption>Create and save several new blog posts</caption>
   * PostService.createMany([{
   *   title: 'Modeling your data',
   *   status: 'draft'
   * }, {
   *   title: 'Reading data',
   *   status: 'draft'
   * }]).then((posts) => {
   *   console.log(posts[0]) // { id: 1234, status: 'draft', ... }
   *   console.log(posts[1]) // { id: 1235, status: 'draft', ... }
   * })
   *
   * @method Mapper#createMany
   * @param {Record[]} records Array of records to be created in one batch.
   * @param {Object} [opts] Configuration options. Refer to the `createMany`
   * method of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @param {string[]} [opts.with=[]] Relations to create in a cascading
   * create if `records` contains nested relations. NOT performed in a
   * transaction. Each nested create will result in another {@link Mapper#createMany}
   * call.
   * @param {string[]} [opts.pass=[]] Relations to send to the adapter as part
   * of the payload. Normally relations are not sent.
   * @returns {Promise} Resolves with the created records.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
   */
  createMany: function createMany(records, opts) {
    var _this4 = this;

    var op = void 0,
        adapter = void 0;
    // Default values for arguments
    records || (records = []);
    opts || (opts = {});

    // Fill in "opts" with the Mapper's configuration
    utils._(opts, this);
    adapter = opts.adapter = this.getAdapterName(opts);

    // beforeCreateMany lifecycle hook
    op = opts.op = 'beforeCreateMany';
    return utils.resolve(this[op](records, opts)).then(function (_records) {
      // Allow for re-assignment from lifecycle hook
      records = utils.isUndefined(_records) ? records : _records;

      // Deep pre-create belongsTo relations
      var belongsToRelationData = {};
      opts.with || (opts.with = []);
      var tasks = [];
      utils.forEachRelation(_this4, opts, function (def, optsCopy) {
        var relationData = records.map(function (record) {
          return def.getLocalField(record);
        }).filter(function (relatedRecord) {
          return relatedRecord;
        });
        if (def.type === belongsToType && relationData.length === records.length) {
          // Create belongsTo relation first because we need a generated id to
          // attach to the child
          tasks.push(def.getRelation().createMany(relationData, optsCopy).then(function (data) {
            var relatedRecords = optsCopy.raw ? data.data : data;
            def.setLocalField(belongsToRelationData, relatedRecords);
            records.forEach(function (record, i) {
              def.setForeignKey(record, relatedRecords[i]);
            });
          }));
        }
      });
      return utils.Promise.all(tasks).then(function () {
        // Now delegate to the adapter
        op = opts.op = 'createMany';
        var json = records.map(function (record) {
          return _this4.toJSON(record, { with: opts.pass || [] });
        });
        _this4.dbg(op, records, opts);
        return utils.resolve(_this4.getAdapter(adapter)[op](_this4, json, opts));
      }).then(function (data) {
        var createdRecords = opts.raw ? data.data : data;

        // Deep post-create hasOne relations
        tasks = [];
        utils.forEachRelation(_this4, opts, function (def, optsCopy) {
          var relationData = records.map(function (record) {
            return def.getLocalField(record);
          }).filter(function (relatedRecord) {
            return relatedRecord;
          });
          if (relationData.length !== records.length) {
            return;
          }
          var belongsToData = def.getLocalField(belongsToRelationData);
          var task = void 0;
          // Create hasMany and hasOne after the main create because we needed
          // a generated id to attach to these items
          if (def.type === hasManyType) {
            // Not supported
            _this4.log('warn', 'deep createMany of hasMany type not supported!');
          } else if (def.type === hasOneType) {
            createdRecords.forEach(function (createdRecord, i) {
              def.setForeignKey(createdRecord, relationData[i]);
            });
            task = def.getRelation().createMany(relationData, optsCopy).then(function (data) {
              var relatedData = opts.raw ? data.data : data;
              createdRecords.forEach(function (createdRecord, i) {
                def.setLocalField(createdRecord, relatedData[i]);
              });
            });
          } else if (def.type === belongsToType && belongsToData && belongsToData.length === createdRecords.length) {
            createdRecords.forEach(function (createdRecord, i) {
              def.setLocalField(createdRecord, belongsToData[i]);
            });
          }
          if (task) {
            tasks.push(task);
          }
        });
        return utils.Promise.all(tasks).then(function () {
          return data;
        });
      });
    }).then(function (result) {
      result = _this4._end(result, opts);
      // afterCreateMany lifecycle hook
      op = opts.op = 'afterCreateMany';
      return utils.resolve(_this4[op](records, opts, result)).then(function (_result) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_result) ? result : _result;
      });
    });
  },


  /**
   * Create an unsaved, uncached instance of this Mapper's
   * {@link Mapper#recordClass}.
   *
   * Returns `props` if `props` is already an instance of
   * {@link Mapper#recordClass}.
   *
   * __Note:__ This method does __not__ interact with any adapter, and does
   * __not__ save any data. It only creates new objects in memory.
   *
   * @example <caption>Create empty unsaved record instance</caption>
   * const post = PostService.createRecord()
   *
   * @example <caption>Create an unsaved record instance with inital properties</caption>
   * const post = PostService.createRecord({
   *   title: 'Modeling your data',
   *   status: 'draft'
   * })
   *
   * @example <caption>Create a record instance that corresponds to a saved record</caption>
   * const post = PostService.createRecord({
   *   // JSData thinks this record has been saved if it has a primary key
   *   id: 1234,
   *   title: 'Modeling your data',
   *   status: 'draft'
   * })
   *
   * @example <caption>Create record instances from an array</caption>
   * const posts = PostService.createRecord([{
   *   title: 'Modeling your data',
   *   status: 'draft'
   * }, {
   *   title: 'Reading data',
   *   status: 'draft'
   * }])
   *
   * @example <caption>Records are validated by default</caption>
   * import {Mapper} from 'js-data'
   * const PostService = new Mapper({
   *   name: 'post',
   *   schema: { properties: { title: { type: 'string' } } }
   * })
   * try {
   *   const post = PostService.createRecord({
   *     title: 1234,
   *   })
   * } catch (err) {
   *   console.log(err.errors) // [{ expected: 'one of (string)', actual: 'number', path: 'title' }]
   * }
   *
   * @example <caption>Skip validation</caption>
   * import {Mapper} from 'js-data'
   * const PostService = new Mapper({
   *   name: 'post',
   *   schema: { properties: { title: { type: 'string' } } }
   * })
   * const post = PostService.createRecord({
   *   title: 1234,
   * }, { noValidate: true })
   * console.log(post.isValid()) // false
   *
   * @method Mapper#createRecord
   * @param {Object|Object[]} props The properties for the Record instance or an
   * array of property objects for the Record instances.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.noValidate=false] Whether to skip validation when
   * the Record instances are created.
   * @returns {Record|Record[]} The Record instance or Record instances.
   * @since 3.0.0
   */
  createRecord: function createRecord(props, opts) {
    var _this5 = this;

    props || (props = {});
    if (utils.isArray(props)) {
      return props.map(function (_props) {
        return _this5.createRecord(_props, opts);
      });
    }
    if (!utils.isObject(props)) {
      throw utils.err(DOMAIN$4 + '#createRecord', 'props')(400, 'array or object', props);
    }
    var recordClass = this.recordClass;
    var relationList = this.relationList || [];
    relationList.forEach(function (def) {
      var relatedMapper = def.getRelation();
      var relationData = def.getLocalField(props);
      if (relationData && !relatedMapper.is(relationData)) {
        if (utils.isArray(relationData) && (!relationData.length || relatedMapper.is(relationData[0]))) {
          return;
        }
        utils.set(props, def.localField, relatedMapper.createRecord(relationData, opts));
      }
    });
    // Check to make sure "props" is not already an instance of this Mapper.
    return recordClass ? props instanceof recordClass ? props : new recordClass(props, opts) : props; // eslint-disable-line
  },


  /**
   * Lifecycle invocation method.
   *
   * TODO: Improve documentation for this method.
   *
   * @method Mapper#crud
   * @param {string} method Name of the lifecycle method to invoke.
   * @param {...*} args Arguments to pass to the lifecycle method.
   * @returns {Promise}
   * @since 3.0.0
   */
  crud: function crud(method) {
    var _this6 = this;

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var config = this.lifecycleMethods[method];
    if (!config) {
      throw utils.err(DOMAIN$4 + '#crud', method)(404, 'method');
    }

    var upper = '' + method.charAt(0).toUpperCase() + method.substr(1);
    var before = 'before' + upper;
    var after = 'after' + upper;

    var op = void 0,
        adapter = void 0;

    // Default values for arguments
    config.defaults.forEach(function (value, i) {
      if (utils.isUndefined(args[i])) {
        args[i] = utils.copy(value);
      }
    });

    var opts = args[args.length - 1];

    // Fill in "opts" with the Mapper's configuration
    utils._(opts, this);
    adapter = opts.adapter = this.getAdapterName(opts);

    // before lifecycle hook
    op = opts.op = before;
    return utils.resolve(this[op].apply(this, babelHelpers.toConsumableArray(args))).then(function (_value) {
      var _getAdapter;

      if (!utils.isUndefined(args[config.beforeAssign])) {
        // Allow for re-assignment from lifecycle hook
        args[config.beforeAssign] = utils.isUndefined(_value) ? args[config.beforeAssign] : _value;
      }
      // Now delegate to the adapter
      op = opts.op = method;
      args = config.adapterArgs ? config.adapterArgs.apply(config, [_this6].concat(babelHelpers.toConsumableArray(args))) : args;
      _this6.dbg.apply(_this6, [op].concat(babelHelpers.toConsumableArray(args)));
      return utils.resolve((_getAdapter = _this6.getAdapter(adapter))[op].apply(_getAdapter, [_this6].concat(babelHelpers.toConsumableArray(args))));
    }).then(function (result) {
      result = _this6._end(result, opts, !!config.skip);
      args.push(result);
      // after lifecycle hook
      op = opts.op = after;
      return utils.resolve(_this6[op].apply(_this6, babelHelpers.toConsumableArray(args))).then(function (_result) {
        // Allow for re-assignment from lifecycle hook
        return utils.isUndefined(_result) ? result : _result;
      });
    });
  },


  /**
   * Using an adapter, destroy the record with the given primary key.
   *
   * {@link Mapper#beforeDestroy} will be called before destroying the record.
   * {@link Mapper#afterDestroy} will be called after destroying the record.
   *
   * @example <caption>Destroy a specific blog post</caption>
   * PostService.destroy(1234).then(() => {
   *   // Blog post #1234 has been destroyed
   * })
   *
   * @example <caption>Get full response</caption>
   * PostService.destroy(1234, { raw: true }).then((result) => {
   *   console.log(result.deleted) e.g. 1
   *   console.log(...) // etc., more metadata can be found on the result
   * })
   *
   * @method Mapper#destroy
   * @param {(string|number)} id The primary key of the record to destroy.
   * @param {Object} [opts] Configuration options. Refer to the `destroy` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @returns {Promise} Resolves when the record has been destroyed. Resolves
   * even if no record was found to be destroyed.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
   */
  destroy: function destroy(id, opts) {
    return this.crud('destroy', id, opts);
  },


  /**
   * Destroy the records selected by `query` via an adapter. If no `query` is
   * provided then all records will be destroyed.
   *
   * {@link Mapper#beforeDestroyAll} will be called before destroying the records.
   * {@link Mapper#afterDestroyAll} will be called after destroying the records.
   *
   * @example <caption>Destroy all blog posts</caption>
   * PostService.destroyAll().then(() => {
   *   // All blog posts have been destroyed
   * })
   *
   * @example <caption>Destroy all "draft" blog posts</caption>
   * PostService.destroyAll({ status: 'draft' }).then(() => {
   *   // All "draft" blog posts have been destroyed
   * })
   *
   * @example <caption>Get full response</caption>
   * const query = null
   * const options = { raw: true }
   * PostService.destroyAll(query, options).then((result) => {
   *   console.log(result.deleted) e.g. 14
   *   console.log(...) // etc., more metadata can be found on the result
   * })
   *
   * @method Mapper#destroyAll
   * @param {Object} [query={}] Selection query. See {@link query}.
   * @param {Object} [query.where] See {@link query.where}.
   * @param {number} [query.offset] See {@link query.offset}.
   * @param {number} [query.limit] See {@link query.limit}.
   * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options. Refer to the `destroyAll`
   * method of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @returns {Promise} Resolves when the records have been destroyed. Resolves
   * even if no records were found to be destroyed.
   * @see query
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
   */
  destroyAll: function destroyAll(query, opts) {
    return this.crud('destroyAll', query, opts);
  },


  /**
   * Retrieve via an adapter the record with the given primary key.
   *
   * {@link Mapper#beforeFind} will be called before calling the adapter.
   * {@link Mapper#afterFind} will be called after calling the adapter.
   *
   * @example
   * PostService.find(1).then((post) => {
   *   console.log(post) // { id: 1, ...}
   * })
   *
   * @example <caption>Get full response</caption>
   * PostService.find(1, { raw: true }).then((result) => {
   *   console.log(result.data) // { id: 1, ...}
   *   console.log(result.found) // 1
   *   console.log(...) // etc., more metadata can be found on the result
   * })
   *
   * @method Mapper#find
   * @param {(string|number)} id The primary key of the record to retrieve.
   * @param {Object} [opts] Configuration options. Refer to the `find` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @param {string[]} [opts.with=[]] Relations to eager load in the request.
   * @returns {Promise} Resolves with the found record. Resolves with
   * `undefined` if no record was found.
   * @see http://www.js-data.io/v3.0/docs/reading-data
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/reading-data","Reading data"]
   */
  find: function find(id, opts) {
    return this.crud('find', id, opts);
  },


  /**
   * Using the `query` argument, select records to retrieve via an adapter.
   *
   * {@link Mapper#beforeFindAll} will be called before calling the adapter.
   * {@link Mapper#afterFindAll} will be called after calling the adapter.
   *
   * @example <caption>Find all "published" blog posts</caption>
   * PostService.findAll({ status: 'published' }).then((posts) => {
   *   console.log(posts) // [{ id: 1, status: 'published', ...}, ...]
   * })
   *
   * @example <caption>Get full response</caption>
   * PostService.findAll({ status: 'published' }, { raw: true }).then((result) => {
   *   console.log(result.data) // [{ id: 1, status: 'published', ...}, ...]
   *   console.log(result.found) // e.g. 13
   *   console.log(...) // etc., more metadata can be found on the result
   * })
   *
   * @method Mapper#findAll
   * @param {Object} [query={}] Selection query. See {@link query}.
   * @param {Object} [query.where] See {@link query.where}.
   * @param {number} [query.offset] See {@link query.offset}.
   * @param {number} [query.limit] See {@link query.limit}.
   * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options. Refer to the `findAll` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @param {string[]} [opts.with=[]] Relations to eager load in the request.
   * @returns {Promise} Resolves with the found records, if any.
   * @see query
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/reading-data","Reading data"]
   */
  findAll: function findAll(query, opts) {
    return this.crud('findAll', query, opts);
  },


  /**
   * Return the registered adapter with the given name or the default adapter if
   * no name is provided.
   *
   * @method Mapper#getAdapter
   * @param {string} [name] The name of the adapter to retrieve.
   * @returns {Adapter} The adapter.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   */
  getAdapter: function getAdapter(name) {
    this.dbg('getAdapter', 'name:', name);
    var adapter = this.getAdapterName(name);
    if (!adapter) {
      throw utils.err(DOMAIN$4 + '#getAdapter', 'name')(400, 'string', name);
    }
    return this.getAdapters()[adapter];
  },


  /**
   * Return the name of a registered adapter based on the given name or options,
   * or the name of the default adapter if no name provided.
   *
   * @method Mapper#getAdapterName
   * @param {(Object|string)} [opts] The name of an adapter or options, if any.
   * @returns {string} The name of the adapter.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   */
  getAdapterName: function getAdapterName(opts) {
    opts || (opts = {});
    if (utils.isString(opts)) {
      opts = { adapter: opts };
    }
    return opts.adapter || opts.defaultAdapter;
  },


  /**
   * Get the object of registered adapters for this Mapper.
   *
   * @method Mapper#getAdapters
   * @returns {Object} {@link Mapper#_adapters}
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   */
  getAdapters: function getAdapters() {
    return this._adapters;
  },


  /**
   * Returns this Mapper's {@link Schema}.
   *
   * @method Mapper#getSchema
   * @returns {Schema} This Mapper's {@link Schema}.
   * @see Mapper#schema
   * @since 3.0.0
   */
  getSchema: function getSchema() {
    return this.schema;
  },


  /**
   * Defines a hasMany relationship. Only useful if you're managing your
   * Mappers manually and not using a Container or DataStore component.
   *
   * @example
   * UserService.hasMany(PostService, {
   *   // post.user_id points to user.id
   *   foreignKey: 'user_id'
   *   // post records will be attached to user records at "user.posts"
   *   localField: 'posts'
   * })
   *
   * @method Mapper#hasMany
   * @see http://www.js-data.io/v3.0/docs/relations
   * @since 3.0.0
   */
  hasMany: function hasMany$$(relatedMapper, opts) {
    return hasMany(relatedMapper, opts)(this);
  },


  /**
   * Defines a hasOne relationship. Only useful if you're managing your Mappers
   * manually and not using a {@link Container} or {@link DataStore} component.
   *
   * @example
   * UserService.hasOne(ProfileService, {
   *   // profile.user_id points to user.id
   *   foreignKey: 'user_id'
   *   // profile records will be attached to user records at "user.profile"
   *   localField: 'profile'
   * })
   *
   * @method Mapper#hasOne
   * @see http://www.js-data.io/v3.0/docs/relations
   * @since 3.0.0
   */
  hasOne: function hasOne$$(relatedMapper, opts) {
    return hasOne(relatedMapper, opts)(this);
  },


  /**
   * Return whether `record` is an instance of this Mapper's recordClass.
   *
   * @example
   * const post = PostService.createRecord()
   *
   * console.log(PostService.is(post)) // true
   * // Equivalent to what's above
   * console.log(post instanceof PostService.recordClass) // true
   *
   * @method Mapper#is
   * @param {Object|Record} record The record to check.
   * @returns {boolean} Whether `record` is an instance of this Mapper's
   * {@link Mapper#recordClass}.
   * @since 3.0.0
   */
  is: function is(record) {
    var recordClass = this.recordClass;
    return recordClass ? record instanceof recordClass : false;
  },


  /**
   * Register an adapter on this Mapper under the given name.
   *
   * @method Mapper#registerAdapter
   * @param {string} name The name of the adapter to register.
   * @param {Adapter} adapter The adapter to register.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.default=false] Whether to make the adapter the
   * default adapter for this Mapper.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   */
  registerAdapter: function registerAdapter(name, adapter, opts) {
    opts || (opts = {});
    this.getAdapters()[name] = adapter;
    // Optionally make it the default adapter for the target.
    if (opts === true || opts.default) {
      this.defaultAdapter = name;
    }
  },


  /**
   * Select records according to the `query` argument, and aggregate the sum
   * value of the property specified by `field`.
   *
   * {@link Mapper#beforeSum} will be called before calling the adapter.
   * {@link Mapper#afterSum} will be called after calling the adapter.
   *
   * @example
   * PurchaseOrderService.sum('amount', { status: 'paid' }).then((amountPaid) => {
   *   console.log(amountPaid) // e.g. 451125.34
   * })
   *
   * @method Mapper#sum
   * @param {string} field The field to sum.
   * @param {Object} [query={}] Selection query. See {@link query}.
   * @param {Object} [query.where] See {@link query.where}.
   * @param {number} [query.offset] See {@link query.offset}.
   * @param {number} [query.limit] See {@link query.limit}.
   * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options. Refer to the `sum` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @returns {Promise} Resolves with the aggregated sum.
   * @since 3.0.0
   */
  sum: function sum(field, query, opts) {
    return this.crud('sum', field, query, opts);
  },


  /**
   * Return a plain object representation of the given record. Relations can
   * be optionally be included. Non-schema properties can be excluded.
   *
   * @example
   * import {Mapper, Schema} from 'js-data'
   * const PersonService = new Mapper({
   *   name: 'person',
   *   schema: {
   *     properties: {
   *       name: { type: 'string' },
   *       id: { type: 'string' }
   *     }
   *   }
   * })
   * const person = PersonService.createRecord({ id: 1, name: 'John', foo: 'bar' })
   * console.log(PersonService.toJSON(person)) // {"id":1,"name":"John","foo":"bar"}
   * console.log(PersonService.toJSON(person), { strict: true }) // {"id":1,"name":"John"}
   *
   * @method Mapper#toJSON
   * @param {Record|Record[]} records Record or records from which to create a
   * POJO representation.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.strict] Whether to include properties that are not
   * defined in {@link Mapper#schema}.
   * @param {string[]} [opts.with] Array of relation names or relation fields
   * to include in the POJO representation.
   * @param {boolean} [opts.withAll] Whether to simply include all relations in
   * the representation. Overrides `opts.with`.
   * @returns {Object|Object[]} POJO representation of the record or records.
   * @since 3.0.0
   */
  toJSON: function toJSON(records, opts) {
    var _this7 = this;

    var record = void 0;
    opts || (opts = {});
    if (utils.isArray(records)) {
      return records.map(function (record) {
        return _this7.toJSON(record, opts);
      });
    } else {
      record = records;
    }
    var relationFields = (this ? this.relationFields : []) || [];
    var json = {};
    var properties = void 0;
    if (this && this.schema) {
      properties = this.schema.properties || {};
      // TODO: Make this work recursively
      utils.forOwn(properties, function (opts, prop) {
        json[prop] = utils.plainCopy(record[prop]);
      });
    }
    properties || (properties = {});
    if (!opts.strict) {
      for (var key in record) {
        if (!properties[key] && relationFields.indexOf(key) === -1) {
          json[key] = utils.plainCopy(record[key]);
        }
      }
    }
    // The user wants to include relations in the resulting plain object
    // representation
    if (this && opts.withAll) {
      opts.with = relationFields.slice();
    }
    if (this && opts.with) {
      if (utils.isString(opts.with)) {
        opts.with = [opts.with];
      }
      utils.forEachRelation(this, opts, function (def, optsCopy) {
        var relationData = def.getLocalField(record);
        if (relationData) {
          // The actual recursion
          if (utils.isArray(relationData)) {
            def.setLocalField(json, relationData.map(function (item) {
              return def.getRelation().toJSON(item, optsCopy);
            }));
          } else {
            def.setLocalField(json, def.getRelation().toJSON(relationData, optsCopy));
          }
        }
      });
    }
    return json;
  },


  /**
   * Using an adapter, update the record with the primary key specified by the
   * `id` argument.
   *
   * {@link Mapper#beforeUpdate} will be called before updating the record.
   * {@link Mapper#afterUpdate} will be called after updating the record.
   *
   * @example <caption>Update a specific post</caption>
   * PostService.update(1234, {
   *   status: 'published',
   *   published_at: new Date()
   * }).then((post) => {
   *   console.log(post) // { id: 1234, status: 'published', ... }
   * })
   *
   * @method Mapper#update
   * @param {(string|number)} id The primary key of the record to update.
   * @param {Object} props The update to apply to the record.
   * @param {Object} [opts] Configuration options. Refer to the `update` method
   * of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * transaction.
   * @returns {Promise} Resolves with the updated record. Rejects if the record
   * could not be found.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
   */
  update: function update(id, props, opts) {
    return this.crud('update', id, props, opts);
  },


  /**
   * Using the `query` argument, perform the a single updated to the selected
   * records.
   *
   * {@link Mapper#beforeUpdateAll} will be called before making the update.
   * {@link Mapper#afterUpdateAll} will be called after making the update.
   *
   * @example <caption>Turn all of John's blog posts into drafts.</caption>
   * const update = { status: draft: published_at: null }
   * const query = { userId: 1234 }
   * PostService.updateAll(update, query).then((posts) => {
   *   console.log(posts) // [...]
   * })
   *
   * @method Mapper#updateAll
   * @param {Object} props Update to apply to selected records.
   * @param {Object} [query={}] Selection query. See {@link query}.
   * @param {Object} [query.where] See {@link query.where}.
   * @param {number} [query.offset] See {@link query.offset}.
   * @param {number} [query.limit] See {@link query.limit}.
   * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options. Refer to the `updateAll`
   * method of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @returns {Promise} Resolves with the update records, if any.
   * @see query
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
   */
  updateAll: function updateAll(props, query, opts) {
    return this.crud('updateAll', props, query, opts);
  },


  /**
   * Given an array of updates, perform each of the updates via an adapter. Each
   * "update" is a hash of properties with which to update an record. Each
   * update must contain the primary key of the record to be updated.
   *
   * {@link Mapper#beforeUpdateMany} will be called before making the update.
   * {@link Mapper#afterUpdateMany} will be called after making the update.
   *
   * @example
   * PostService.updateMany([
   *   { id: 1234, status: 'draft' },
   *   { id: 2468, status: 'published', published_at: new Date() }
   * ]).then((posts) => {
   *   console.log(posts) // [...]
   * })
   *
   * @method Mapper#updateMany
   * @param {Record[]} records Array up record updates.
   * @param {Object} [opts] Configuration options. Refer to the `updateMany`
   * method of whatever adapter you're using for more configuration options.
   * @param {boolean} [opts.adapter={@link Mapper#defaultAdapter}] Name of the
   * adapter to use.
   * @param {boolean} [opts.notify={@link Mapper#notify}] See {@link Mapper#notify}.
   * @param {boolean} [opts.raw={@link Mapper#raw}] See {@link Mapper#raw}.
   * @returns {Promise} Resolves with the updated records. Rejects if any of the
   * records could be found.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
   */
  updateMany: function updateMany(records, opts) {
    return this.crud('updateMany', records, opts);
  },


  /**
   * Validate the given record or records according to this Mapper's
   * {@link Schema}. If there are no validation errors then the return value
   * will be `undefined`.
   *
   * @example
   * import {Mapper, Schema} from 'js-data'
   * const PersonSchema = new Schema({
   *   properties: {
   *     name: { type: 'string' },
   *     id: { type: 'string' }
   *   }
   * })
   * const PersonService = new Mapper({
   *   name: 'person',
   *   schema: PersonSchema
   * })
   * let errors = PersonService.validate({ name: 'John' })
   * console.log(errors) // undefined
   * errors = PersonService.validate({ name: 123 })
   * console.log(errors) // [{ expected: 'one of (string)', actual: 'number', path: 'name' }]
   *
   * @method Mapper#validate
   * @param {Object|Object[]} record The record or records to validate.
   * @param {Object} [opts] Configuration options. Passed to
   * {@link Schema#validate}.
   * @returns {Object[]} Array of errors or `undefined` if no errors.
   * @since 3.0.0
   */
  validate: function validate(record, opts) {
    opts || (opts = {});
    var schema = this.getSchema();
    var _opts = utils.pick(opts, ['existingOnly']);
    if (utils.isArray(record)) {
      var errors = record.map(function (_record) {
        return schema.validate(_record, utils.pick(_opts, ['existingOnly']));
      });
      var hasErrors = false;
      errors.forEach(function (err) {
        if (err) {
          hasErrors = true;
        }
      });
      if (hasErrors) {
        return errors;
      }
      return undefined;
    }
    return schema.validate(record, _opts);
  },


  /**
   * Method used to wrap data returned by an adapter with this Mapper's
   * {@link Mapper#recordClass}. This method is used by all of a Mapper's CRUD
   * methods. The provided implementation of this method assumes that the `data`
   * passed to it is a record or records that need to be wrapped with
   * {@link Mapper#createRecord}. Override with care.
   *
   * Provided implementation of {@link Mapper#wrap}:
   *
   * ```
   * function (data, opts) {
   *   return this.createRecord(data, opts)
   * }
   * ```
   *
   * @example <caption>Override to customize behavior</caption>
   * const PostMapper = new Mapper({
   *   name: 'post',
   *   wrap (data, opts) {
   *     const originalWrap = this.constructor.prototype.wrap
   *     // Let's say "GET /post" doesn't return JSON quite like JSData expects,
   *     // but the actual post records are nested under a "posts" field. So,
   *     // we override Mapper#wrap to handle this special case.
   *     if (opts.op === 'findAll') {
   *       return originalWrap.call(this, data.posts, opts)
   *     }
   *     // Otherwise perform original behavior
   *     return originalWrap.call(this, data, opts)
   *   }
   * })
   *
   * @method Mapper#wrap
   * @param {Object|Object[]} data The record or records to be wrapped.
   * @param {Object} [opts] Configuration options. Passed to {@link Mapper#createRecord}.
   * @returns {Record|Record[]} The wrapped record or records.
   * @since 3.0.0
   */
  wrap: function wrap(data, opts) {
    return this.createRecord(data, opts);
  },


  /**
   * @ignore
   */
  defineRelations: function defineRelations() {
    var _this8 = this;

    // Setup the mapper's relations, including generating Mapper#relationList
    // and Mapper#relationFields
    utils.forOwn(this.relations, function (group, type) {
      utils.forOwn(group, function (relations, _name) {
        if (utils.isObject(relations)) {
          relations = [relations];
        }
        relations.forEach(function (def) {
          var relatedMapper = _this8.datastore.getMapperByName(_name) || _name;
          def.getRelation = function () {
            return _this8.datastore.getMapper(_name);
          };

          if (typeof Relation[type] !== 'function') {
            throw utils.err(DOMAIN$4, 'defineRelations')(400, 'relation type (hasOne, hasMany, etc)', type, true);
          }

          _this8[type](relatedMapper, def);
        });
      });
    });
  }
});

/**
 * Create a subclass of this Mapper.
 *
 * @example <caption>Extend the class in a cross-browser manner.</caption>
 * import {Mapper} from 'js-data'
 * const CustomMapperClass = Mapper.extend({
 *   foo () { return 'bar' }
 * })
 * const customMapper = new CustomMapperClass({ name: 'test' })
 * console.log(customMapper.foo()) // "bar"
 *
 * @example <caption>Extend the class using ES2015 class syntax.</caption>
 * class CustomMapperClass extends Mapper {
 *   foo () { return 'bar' }
 * }
 * const customMapper = new CustomMapperClass({ name: 'test' })
 * console.log(customMapper.foo()) // "bar"
 *
 * @method Mapper.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Mapper class.
 * @since 3.0.0
 */

var DOMAIN$3 = 'Container';

var proxiedMapperMethods = [
/**
 * Wrapper for {@link Mapper#count}.
 *
 * @example <caption>Get the number of published blog posts</caption>
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.count('post', { status: 'published' }).then((numPublished) => {
 *   console.log(numPublished) // e.g. 45
 * })
 *
 * @method Container#count
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object} [query] See {@link Mapper#count}.
 * @param {Object} [opts] See {@link Mapper#count}.
 * @returns {Promise} See {@link Mapper#count}.
 * @see Mapper#count
 * @since 3.0.0
 */
'count',

/**
 * Wrapper for {@link Mapper#create}.
 *
 * @example <caption>Create and save a new blog post</caption>
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.create('post', {
 *   title: 'Modeling your data',
 *   status: 'draft'
 * }).then((post) => {
 *   console.log(post) // { id: 1234, status: 'draft', ... }
 * })
 *
 * @method Container#create
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object} props See {@link Mapper#create}.
 * @param {Object} [opts] See {@link Mapper#create}.
 * @returns {Promise} See {@link Mapper#create}.
 * @see Mapper#create
 * @since 3.0.0
 */
'create',

/**
 * Wrapper for {@link Mapper#createMany}.
 *
 * @example <caption>Create and save several new blog posts</caption>
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.createMany('post', [{
 *   title: 'Modeling your data',
 *   status: 'draft'
 * }, {
 *   title: 'Reading data',
 *   status: 'draft'
 * }]).then((posts) => {
 *   console.log(posts[0]) // { id: 1234, status: 'draft', ... }
 *   console.log(posts[1]) // { id: 1235, status: 'draft', ... }
 * })
 *
 * @method Container#createMany
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Record[]} records See {@link Mapper#createMany}.
 * @param {Object} [opts] See {@link Mapper#createMany}.
 * @returns {Promise} See {@link Mapper#createMany}.
 * @see Mapper#createMany
 * @since 3.0.0
 */
'createMany',

/**
 * Wrapper for {@link Mapper#createRecord}.
 *
 * __Note:__ This method does __not__ interact with any adapter, and does
 * __not__ save any data. It only creates new objects in memory.
 *
 * @example <caption>Create empty unsaved record instance</caption>
 * import {Container} from 'js-data'
 * const store = new Container()
 * store.defineMapper('post')
 * const post = PostService.createRecord()
 *
 * @method Container#createRecord
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object|Object[]} props See {@link Mapper#createRecord}.
 * @param {Object} [opts] See {@link Mapper#createRecord}.
 * @returns {Promise} See {@link Mapper#createRecord}.
 * @see Mapper#createRecord
 * @since 3.0.0
 */
'createRecord',

/**
 * Wrapper for {@link Mapper#dbg}.
 *
 * @method Container#dbg
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {...*} args See {@link Mapper#dbg}.
 * @see Mapper#dbg
 * @since 3.0.0
 */
'dbg',

/**
 * Wrapper for {@link Mapper#destroy}.
 *
 * @example <caption>Destroy a specific blog post</caption>
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.destroy('post', 1234).then(() => {
 *   // Blog post #1234 has been destroyed
 * })
 *
 * @method Container#destroy
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {(string|number)} id See {@link Mapper#destroy}.
 * @param {Object} [opts] See {@link Mapper#destroy}.
 * @returns {Promise} See {@link Mapper#destroy}.
 * @see Mapper#destroy
 * @since 3.0.0
 */
'destroy',

/**
 * Wrapper for {@link Mapper#destroyAll}.
 *
 * @example <caption>Destroy all "draft" blog posts</caption>
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.destroyAll('post', { status: 'draft' }).then(() => {
 *   // All "draft" blog posts have been destroyed
 * })
 *
 * @method Container#destroyAll
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object} [query] See {@link Mapper#destroyAll}.
 * @param {Object} [opts] See {@link Mapper#destroyAll}.
 * @returns {Promise} See {@link Mapper#destroyAll}.
 * @see Mapper#destroyAll
 * @since 3.0.0
 */
'destroyAll',

/**
 * Wrapper for {@link Mapper#find}.
 *
 * @example
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.find('post', 1).then((post) => {
 *   console.log(post) // { id: 1, ...}
 * })
 *
 * @method Container#find
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {(string|number)} id See {@link Mapper#find}.
 * @param {Object} [opts] See {@link Mapper#find}.
 * @returns {Promise} See {@link Mapper#find}.
 * @see Mapper#find
 * @since 3.0.0
 */
'find',

/**
 * Wrapper for {@link Mapper#createRecord}.
 *
 * @example <caption>Find all "published" blog posts</caption>
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.findAll('post', { status: 'published' }).then((posts) => {
 *   console.log(posts) // [{ id: 1, ...}, ...]
 * })
 *
 * @method Container#findAll
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object} [query] See {@link Mapper#findAll}.
 * @param {Object} [opts] See {@link Mapper#findAll}.
 * @returns {Promise} See {@link Mapper#findAll}.
 * @see Mapper#findAll
 * @since 3.0.0
 */
'findAll',

/**
 * Wrapper for {@link Mapper#getSchema}.
 *
 * @method Container#getSchema
 * @param {string} name Name of the {@link Mapper} to target.
 * @returns {Schema} See {@link Mapper#getSchema}.
 * @see Mapper#getSchema
 * @since 3.0.0
 */
'getSchema',

/**
 * Wrapper for {@link Mapper#is}.
 *
 * @example
 * import {Container} from 'js-data'
 * const store = new Container()
 * store.defineMapper('post')
 * const post = store.createRecord()
 *
 * console.log(store.is('post', post)) // true
 * // Equivalent to what's above
 * console.log(post instanceof store.getMapper('post').recordClass) // true
 *
 * @method Container#is
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object|Record} record See {@link Mapper#is}.
 * @returns {boolean} See {@link Mapper#is}.
 * @see Mapper#is
 * @since 3.0.0
 */
'is',

/**
 * Wrapper for {@link Mapper#log}.
 *
 * @method Container#log
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {...*} args See {@link Mapper#log}.
 * @see Mapper#log
 * @since 3.0.0
 */
'log',

/**
 * Wrapper for {@link Mapper#sum}.
 *
 * @example
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('purchase_order')
 *
 * store.sum('purchase_order', 'amount', { status: 'paid' }).then((amountPaid) => {
 *   console.log(amountPaid) // e.g. 451125.34
 * })
 *
 * @method Container#sum
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {string} field See {@link Mapper#sum}.
 * @param {Object} [query] See {@link Mapper#sum}.
 * @param {Object} [opts] See {@link Mapper#sum}.
 * @returns {Promise} See {@link Mapper#sum}.
 * @see Mapper#sum
 * @since 3.0.0
 */
'sum',

/**
 * Wrapper for {@link Mapper#toJSON}.
 *
 * @example
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('person', {
 *   schema: {
 *     properties: {
 *       name: { type: 'string' },
 *       id: { type: 'string' }
 *     }
 *   }
 * })
 * const person = store.createRecord('person', { id: 1, name: 'John', foo: 'bar' })
 * console.log(store.toJSON('person', person)) // {"id":1,"name":"John","foo":"bar"}
 * console.log(store.toJSON('person', person), { strict: true }) // {"id":1,"name":"John"}
 *
 * @method Container#toJSON
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Record|Record[]} records See {@link Mapper#toJSON}.
 * @param {Object} [opts] See {@link Mapper#toJSON}.
 * @returns {Object|Object[]} See {@link Mapper#toJSON}.
 * @see Mapper#toJSON
 * @since 3.0.0
 */
'toJSON',

/**
 * Wrapper for {@link Mapper#update}.
 *
 * @example
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.update('post', 1234, {
 *   status: 'published',
 *   published_at: new Date()
 * }).then((post) => {
 *   console.log(post) // { id: 1234, status: 'published', ... }
 * })
 *
 * @method Container#update
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {(string|number)} id See {@link Mapper#update}.
 * @param {Object} record See {@link Mapper#update}.
 * @param {Object} [opts] See {@link Mapper#update}.
 * @returns {Promise} See {@link Mapper#update}.
 * @see Mapper#update
 * @since 3.0.0
 * @tutorial ["http://www.js-data.io/v3.0/docs/saving-data","Saving data"]
 */
'update',

/**
 * Wrapper for {@link Mapper#updateAll}.
 *
 * @example <caption>Turn all of John's blog posts into drafts.</caption>
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * const update = { status: draft: published_at: null }
 * const query = { userId: 1234 }
 * store.updateAll('post', update, query).then((posts) => {
 *   console.log(posts) // [...]
 * })
 *
 * @method Container#updateAll
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {Object} update See {@link Mapper#updateAll}.
 * @param {Object} [query] See {@link Mapper#updateAll}.
 * @param {Object} [opts] See {@link Mapper#updateAll}.
 * @returns {Promise} See {@link Mapper#updateAll}.
 * @see Mapper#updateAll
 * @since 3.0.0
 */
'updateAll',

/**
 * Wrapper for {@link Mapper#updateMany}.
 *
 * @example
 * import {Container} from 'js-data'
 * import RethinkDBAdapter from 'js-data-rethinkdb'
 * const store = new Container()
 * store.registerAdapter('rethinkdb', new RethinkDBAdapter(), { default: true })
 * store.defineMapper('post')
 *
 * store.updateMany('post', [
 *   { id: 1234, status: 'draft' },
 *   { id: 2468, status: 'published', published_at: new Date() }
 * ]).then((posts) => {
 *   console.log(posts) // [...]
 * })
 *
 * @method Container#updateMany
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {(Object[]|Record[])} records See {@link Mapper#updateMany}.
 * @param {Object} [opts] See {@link Mapper#updateMany}.
 * @returns {Promise} See {@link Mapper#updateMany}.
 * @see Mapper#updateMany
 * @since 3.0.0
 */
'updateMany',

/**
 * Wrapper for {@link Mapper#validate}.
 *
 * @example
 * import {Container} from 'js-data'
 * const store = new Container()
 * store.defineMapper('post', {
 *   schema: {
 *     properties: {
 *       name: { type: 'string' },
 *       id: { type: 'string' }
 *     }
 *   }
 * })
 * let errors = store.validate('post', { name: 'John' })
 * console.log(errors) // undefined
 * errors = store.validate('post', { name: 123 })
 * console.log(errors) // [{ expected: 'one of (string)', actual: 'number', path: 'name' }]
 *
 * @method Container#validate
 * @param {string} name Name of the {@link Mapper} to target.
 * @param {(Object[]|Record[])} records See {@link Mapper#validate}.
 * @param {Object} [opts] See {@link Mapper#validate}.
 * @returns {Promise} See {@link Mapper#validate}.
 * @see Mapper#validate
 * @since 3.0.0
 */
'validate'];

function Container(opts) {
  utils.classCallCheck(this, Container);
  Container.__super__.call(this);
  opts || (opts = {});

  Object.defineProperties(this, {
    // Holds the adapters, shared by all mappers in this container
    _adapters: {
      value: {}
    },
    // The the mappers in this container
    _mappers: {
      value: {}
    }
  });

  // Apply options provided by the user
  utils.fillIn(this, opts);

  /**
   * Defaults options to pass to {@link Container#mapperClass} when creating a
   * new {@link Mapper}.
   *
   * @default {}
   * @name Container#mapperDefaults
   * @since 3.0.0
   * @type {Object}
   */
  this.mapperDefaults = this.mapperDefaults || {};

  /**
   * Constructor function to use in {@link Container#defineMapper} to create a
   * new mapper.
   *
   * {@link Mapper}
   * @name Container#mapperClass
   * @since 3.0.0
   * @type {Constructor}
   */
  this.mapperClass = this.mapperClass || Mapper$1;
}

var props = {
  constructor: Container,

  /**
   * Register a new event listener on this Container.
   *
   * Proxy for {@link Component#on}. If an event was emitted by a Mapper in the
   * Container, then the name of the Mapper will be prepended to the arugments
   * passed to the listener.
   *
   * @method Container#on
   * @param {string} event Name of event to subsribe to.
   * @param {Function} listener Listener function to handle the event.
   * @param {*} [ctx] Optional content in which to invoke the listener.
   * @since 3.0.0
   */

  /**
   * Used to bind to events emitted by mappers in this container.
   *
   * @method Container#_onMapperEvent
   * @param {string} name Name of the mapper that emitted the event.
   * @param {...*} [args] Args See {@link Mapper#emit}.
   * @private
   * @since 3.0.0
   */
  _onMapperEvent: function _onMapperEvent(name) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var type = args.shift();
    this.emit.apply(this, [type, name].concat(args));
  },


  /**
   * Return a container scoped to a particular mapper.
   *
   * @example
   * import {Container} from 'js-data'
   * const store = new Container()
   * const UserMapper = store.defineMapper('user')
   * const UserStore = store.as('user')
   *
   * const user1 = store.createRecord('user', { name: 'John' })
   * const user2 = UserStore.createRecord({ name: 'John' })
   * const user3 = UserMapper.createRecord({ name: 'John' })
   * assert.deepEqual(user1, user2)
   * assert.deepEqual(user2, user3)
   * assert.deepEqual(user1, user3)
   *
   * @method Container#as
   * @param {string} name Name of the {@link Mapper}.
   * @returns {Object} A container scoped to a particular mapper.
   * @since 3.0.0
   */
  as: function as(name) {
    var _this = this;

    var props = {};
    proxiedMapperMethods.forEach(function (method) {
      props[method] = {
        writable: true,
        value: function value() {
          var _getMapper;

          return (_getMapper = this.getMapper(name))[method].apply(_getMapper, arguments);
        }
      };
    });
    props.getMapper = {
      writable: true,
      value: function value() {
        return _this.getMapper(name);
      }
    };
    return Object.create(this, props);
  },


  /**
   * Create a new mapper and register it in this container.
   *
   * @example
   * import {Container} from 'js-data'
   * const store = new Container({
   *   mapperDefaults: { foo: 'bar' }
   * })
   * // Container#defineMapper returns a direct reference to the newly created
   * // Mapper.
   * const UserMapper = store.defineMapper('user')
   * UserMapper === store.getMapper('user') // true
   * UserMapper === store.as('user').getMapper() // true
   * UserMapper.foo // "bar"
   *
   * @method Container#defineMapper
   * @param {string} name Name under which to register the new {@link Mapper}.
   * {@link Mapper#name} will be set to this value.
   * @param {Object} [opts] Configuration options. Passed to
   * {@link Container#mapperClass} when creating the new {@link Mapper}.
   * @returns {Mapper} The newly created instance of {@link Mapper}.
   * @see Container#as
   * @since 3.0.0
   */
  defineMapper: function defineMapper(name, opts) {
    var _this2 = this;

    // For backwards compatibility with defineResource
    if (utils.isObject(name)) {
      opts = name;
      name = opts.name;
    }
    if (!utils.isString(name)) {
      throw utils.err(DOMAIN$3 + '#defineMapper', 'name')(400, 'string', name);
    }

    // Default values for arguments
    opts || (opts = {});
    // Set Mapper#name
    opts.name = name;
    opts.relations || (opts.relations = {});

    // Check if the user is overriding the datastore's default mapperClass
    var mapperClass = opts.mapperClass || this.mapperClass;
    delete opts.mapperClass;

    // Apply the datastore's defaults to the options going into the mapper
    utils.fillIn(opts, this.mapperDefaults);

    // Instantiate a mapper
    var mapper = this._mappers[name] = new mapperClass(opts); // eslint-disable-line
    mapper.relations || (mapper.relations = {});
    // Make sure the mapper's name is set
    mapper.name = name;
    // All mappers in this datastore will share adapters
    mapper._adapters = this.getAdapters();

    mapper.datastore = this;

    mapper.on('all', function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _this2._onMapperEvent.apply(_this2, [name].concat(args));
    });
    mapper.defineRelations();

    return mapper;
  },
  defineResource: function defineResource(name, opts) {
    console.warn('DEPRECATED: defineResource is deprecated, use defineMapper instead');
    return this.defineMapper(name, opts);
  },


  /**
   * Return the registered adapter with the given name or the default adapter if
   * no name is provided.
   *
   * @method Container#getAdapter
   * @param {string} [name] The name of the adapter to retrieve.
   * @returns {Adapter} The adapter.
   * @since 3.0.0
   */
  getAdapter: function getAdapter(name) {
    var adapter = this.getAdapterName(name);
    if (!adapter) {
      throw utils.err(DOMAIN$3 + '#getAdapter', 'name')(400, 'string', name);
    }
    return this.getAdapters()[adapter];
  },


  /**
   * Return the name of a registered adapter based on the given name or options,
   * or the name of the default adapter if no name provided.
   *
   * @method Container#getAdapterName
   * @param {(Object|string)} [opts] The name of an adapter or options, if any.
   * @returns {string} The name of the adapter.
   * @since 3.0.0
   */
  getAdapterName: function getAdapterName(opts) {
    opts || (opts = {});
    if (utils.isString(opts)) {
      opts = { adapter: opts };
    }
    return opts.adapter || this.mapperDefaults.defaultAdapter;
  },


  /**
   * Return the registered adapters of this container.
   *
   * @method Container#getAdapters
   * @returns {Adapter}
   * @since 3.0.0
   */
  getAdapters: function getAdapters() {
    return this._adapters;
  },


  /**
   * Return the mapper registered under the specified name.
   *
   * @example
   * import {Container} from 'js-data'
   * const container = new Container()
   * // Container#defineMapper returns a direct reference to the newly created
   * // Mapper.
   * const UserMapper = container.defineMapper('user')
   * UserMapper === container.getMapper('user') // true
   * UserMapper === container.as('user').getMapper() // true
   * container.getMapper('profile') // throws Error, there is no mapper with name "profile"
   *
   * @method Container#getMapper
   * @param {string} name {@link Mapper#name}.
   * @returns {Mapper}
   * @since 3.0.0
   */
  getMapper: function getMapper(name) {
    var mapper = this.getMapperByName(name);
    if (!mapper) {
      throw utils.err(DOMAIN$3 + '#getMapper', name)(404, 'mapper');
    }
    return mapper;
  },


  /**
   * Return the mapper registered under the specified name.
   * Doesn't throw error if mapper doesn't exist.
   *
   * @example
   * import {Container} from 'js-data'
   * const container = new Container()
   * // Container#defineMapper returns a direct reference to the newly created
   * // Mapper.
   * const UserMapper = container.defineMapper('user')
   * UserMapper === container.getMapperByName('user') // true
   * container.getMapperByName('profile') // undefined
   *
   * @method Container#getMapperByName
   * @param {string} name {@link Mapper#name}.
   * @returns {Mapper}
   * @since 3.0.0
   */
  getMapperByName: function getMapperByName(name) {
    return this._mappers[name];
  },


  /**
   * Register an adapter on this container under the given name. Adapters
   * registered on a container are shared by all mappers in the container.
   *
   * @example
   * import {Container} from 'js-data'
   * import HttpAdapter from 'js-data-http'
   * const container = new Container()
   * container.registerAdapter('http', new HttpAdapter, { default: true })
   *
   * @method Container#registerAdapter
   * @param {string} name The name of the adapter to register.
   * @param {Adapter} adapter The adapter to register.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.default=false] Whether to make the adapter the
   * default adapter for all Mappers in this container.
   * @since 3.0.0
   * @tutorial ["http://www.js-data.io/v3.0/docs/connecting-to-a-data-source","Connecting to a data source"]
   */
  registerAdapter: function registerAdapter(name, adapter, opts) {
    opts || (opts = {});
    this.getAdapters()[name] = adapter;
    // Optionally make it the default adapter for the target.
    if (opts === true || opts.default) {
      this.mapperDefaults.defaultAdapter = name;
      utils.forOwn(this._mappers, function (mapper) {
        mapper.defaultAdapter = name;
      });
    }
  }
};

proxiedMapperMethods.forEach(function (method) {
  props[method] = function (name) {
    var _getMapper2;

    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return (_getMapper2 = this.getMapper(name))[method].apply(_getMapper2, args);
  };
});

Component.extend(props);

/**
 * Create a subclass of this Container.
 *
 * @example <caption>Extend the class in a cross-browser manner.</caption>
 * import {Container} from 'js-data'
 * const CustomContainerClass = Container.extend({
 *   foo () { return 'bar' }
 * })
 * const customContainer = new CustomContainerClass()
 * console.log(customContainer.foo()) // "bar"
 *
 * @example <caption>Extend the class using ES2015 class syntax.</caption>
 * class CustomContainerClass extends Container {
 *   foo () { return 'bar' }
 * }
 * const customContainer = new CustomContainerClass()
 * console.log(customContainer.foo()) // "bar"
 *
 * @method Container.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this Container.
 * @since 3.0.0
 */

var DOMAIN$9 = 'LinkedCollection';

/**
 * TODO
 *
 * ```javascript
 * import {LinkedCollection} from 'js-data'
 * ```
 *
 * @class LinkedCollection
 * @extends Collection
 * @param {Array} [records] Initial set of records to insert into the
 * collection. See {@link Collection}.
 * @param {Object} [opts] Configuration options. See {@link Collection}.
 * @returns {Mapper}
 */
function LinkedCollection(records, opts) {
  utils.classCallCheck(this, LinkedCollection);
  // Make sure this collection has somewhere to store "added" timestamps
  Object.defineProperties(this, {
    _added: {
      value: {}
    },
    datastore: {
      writable: true,
      value: undefined
    }
  });

  LinkedCollection.__super__.call(this, records, opts);

  // Make sure this collection has a reference to a datastore
  if (!this.datastore) {
    throw utils.err('new ' + DOMAIN$9, 'opts.datastore')(400, 'DataStore', this.datastore);
  }
  return this;
}

var LinkedCollection$1 = Collection$1.extend({
  constructor: LinkedCollection,

  _onRecordEvent: function _onRecordEvent() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    utils.getSuper(this).prototype._onRecordEvent.apply(this, args);
    var event = args[0];
    // This is a very brute force method
    // Lots of room for optimization
    if (utils.isString(event) && event.indexOf('change') === 0) {
      this.updateIndexes(args[1]);
    }
  },
  add: function add(records, opts) {
    var _this = this;

    var mapper = this.mapper;
    var timestamp = new Date().getTime();
    var singular = utils.isObject(records) && !utils.isArray(records);

    if (singular) {
      records = [records];
    }

    records = utils.getSuper(this).prototype.add.call(this, records, opts);

    if (mapper.relationList.length && records.length) {
      // Check the currently visited record for relations that need to be
      // inserted into their respective collections.
      mapper.relationList.forEach(function (def) {
        def.linkRecords(mapper, records);
      });
    }

    records.forEach(function (record) {
      return _this._addMeta(record, timestamp);
    });

    return singular ? records[0] : records;
  },
  remove: function remove(id, opts) {
    var mapper = this.mapper;
    var record = utils.getSuper(this).prototype.remove.call(this, id, opts);
    if (record) {
      this._clearMeta(record);
    }
    return record;
  },
  removeAll: function removeAll(query, opts) {
    var mapper = this.mapper;
    var records = utils.getSuper(this).prototype.removeAll.call(this, query, opts);
    records.forEach(this._clearMeta, this);
    return records;
  },
  _clearMeta: function _clearMeta(record) {
    delete this._added[this.recordId(record)];
    if (this.mapper.recordClass) {
      record._set('$'); // unset
    }
  },
  _addMeta: function _addMeta(record, timestamp) {
    // Track when this record was added
    this._added[this.recordId(record)] = timestamp;

    if (this.mapper.recordClass) {
      record._set('$', timestamp);
    }
  }
});

/**
 * Create a subclass of this LinkedCollection.
 *
 * @example <caption>Extend the class in a cross-browser manner.</caption>
 * import {LinkedCollection} from 'js-data'
 * const CustomLinkedCollectionClass = LinkedCollection.extend({
 *   foo () { return 'bar' }
 * })
 * const customLinkedCollection = new CustomLinkedCollectionClass()
 * console.log(customLinkedCollection.foo()) // "bar"
 *
 * @example <caption>Extend the class using ES2015 class syntax.</caption>
 * class CustomLinkedCollectionClass extends LinkedCollection {
 *   foo () { return 'bar' }
 * }
 * const customLinkedCollection = new CustomLinkedCollectionClass()
 * console.log(customLinkedCollection.foo()) // "bar"
 *
 * @method LinkedCollection.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this LinkedCollection class.
 * @since 3.0.0
 */

var DOMAIN$8 = 'DataStore';
var proxiedCollectionMethods = ['add', 'between', 'createIndex', 'filter', 'get', 'getAll', 'query', 'toJson'];
var ownMethodsForScoping = ['addToCache', 'cachedFind', 'cachedFindAll', 'cacheFind', 'cacheFindAll', 'hashQuery'];

var safeSet = function safeSet(record, field, value) {
  if (record && record._set) {
    record._set('props.' + field, value);
  } else {
    utils.set(record, field, value);
  }
};

var cachedFn = function cachedFn(name, hashOrId, opts) {
  var cached = this._completedQueries[name][hashOrId];
  if (utils.isFunction(cached)) {
    return cached(name, hashOrId, opts);
  }
  return cached;
};

function DataStore(opts) {
  utils.classCallCheck(this, DataStore);
  DataStore.__super__.call(this, opts);

  this.collectionClass = this.collectionClass || LinkedCollection$1;
  this._collections = {};
  this._pendingQueries = {};
  this._completedQueries = {};
  return this;
}

/**
 * The `DataStore` class is an extension of {@link Container}. Not only does
 * `DataStore` manage mappers, but also collections. `DataStore` implements the
 * asynchronous {@link Mapper} methods, such as {@link Mapper#find} and
 * {@link Mapper#create}. If you use the asynchronous `DataStore` methods
 * instead of calling them directly on the mappers, then the results of the
 * method calls will be inserted into the store's collections. You can think of
 * a `DataStore` as an [Identity Map](https://en.wikipedia.org/wiki/Identity_map_pattern)
 * for the [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)
 * (the Mappers).
 *
 * ```javascript
 * import {DataStore} from 'js-data'
 * ```
 *
 * @example
 * import {DataStore} from 'js-data'
 * import HttpAdapter from 'js-data-http'
 * const store = new DataStore()
 *
 * // DataStore#defineMapper returns a direct reference to the newly created
 * // Mapper.
 * const UserMapper = store.defineMapper('user')
 *
 * // DataStore#as returns the store scoped to a particular Mapper.
 * const UserStore = store.as('user')
 *
 * // Call "find" on "UserMapper" (Stateless ORM)
 * UserMapper.find(1).then((user) => {
 *   // retrieved a "user" record via the http adapter, but that's it
 *
 *   // Call "find" on "store" targeting "user" (Stateful DataStore)
 *   return store.find('user', 1) // same as "UserStore.find(1)"
 * }).then((user) => {
 *   // not only was a "user" record retrieved, but it was added to the
 *   // store's "user" collection
 *   const cachedUser = store.getCollection('user').get(1)
 *   console.log(user === cachedUser) // true
 * })
 *
 * @class DataStore
 * @extends Container
 * @param {Object} [opts] Configuration options. See {@link Container}.
 * @returns {DataStore}
 * @see Container
 * @since 3.0.0
 * @tutorial ["http://www.js-data.io/v3.0/docs/components-of-jsdata#datastore","Components of JSData: DataStore"]
 * @tutorial ["http://www.js-data.io/v3.0/docs/working-with-the-datastore","Working with the DataStore"]
 * @tutorial ["http://www.js-data.io/v3.0/docs/jsdata-and-the-browser","Notes on using JSData in the Browser"]
 */
var props$1 = {
  constructor: DataStore,

  _callSuper: function _callSuper(method) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return this.constructor.__super__.prototype[method].apply(this, args);
  },


  /**
   * TODO
   *
   * @method DataStore#_end
   * @private
   * @param {string} name Name of the {@link LinkedCollection} to which to
   * add the data.
   * @param {Object} data TODO.
   * @param {Object} [opts] Configuration options.
   * @returns {(Object|Array)} Result.
   */
  _end: function _end(name, result, opts) {
    var data = opts.raw ? result.data : result;
    if (data && utils.isFunction(this.addToCache)) {
      data = this.addToCache(name, data, opts);
      if (opts.raw) {
        result.data = data;
      } else {
        result = data;
      }
    }
    return result;
  },


  /**
   * Register a new event listener on this DataStore.
   *
   * Proxy for {@link Container#on}. If an event was emitted by a Mapper or
   * Collection in the DataStore, then the name of the Mapper or Collection will
   * be prepended to the arugments passed to the provided event handler.
   *
   * @method DataStore#on
   * @param {string} event Name of event to subsribe to.
   * @param {Function} listener Listener function to handle the event.
   * @param {*} [ctx] Optional content in which to invoke the listener.
   */

  /**
   * Used to bind to events emitted by collections in this store.
   *
   * @method DataStore#_onCollectionEvent
   * @private
   * @param {string} name Name of the collection that emitted the event.
   * @param {...*} [args] Args passed to {@link Collection#emit}.
   */
  _onCollectionEvent: function _onCollectionEvent(name) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    var type = args.shift();
    this.emit.apply(this, [type, name].concat(args));
  },


  /**
   * TODO
   *
   * @method DataStore#addToCache
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {*} data Data from which data should be selected for add.
   * @param {Object} [opts] Configuration options.
   */
  addToCache: function addToCache(name, data, opts) {
    return this.getCollection(name).add(data, opts);
  },


  /**
   * Return a store scoped to a particular mapper/collection pair.
   *
   * @example
   * import {DataStore} from 'js-data'
   * const store = new DataStore()
   * const UserMapper = store.defineMapper('user')
   * const UserStore = store.as('user')
   *
   * const user1 = store.createRecord('user', { name: 'John' })
   * const user2 = UserStore.createRecord({ name: 'John' })
   * const user3 = UserMapper.createRecord({ name: 'John' })
   * assert.deepEqual(user1, user2)
   * assert.deepEqual(user2, user3)
   * assert.deepEqual(user1, user3)
   *
   * @method DataStore#as
   * @param {string} name Name of the {@link Mapper}.
   * @returns {Object} A store scoped to a particular mapper/collection pair.
   * @since 3.0.0
   */
  as: function as(name) {
    var _this = this;

    var props = {};
    ownMethodsForScoping.forEach(function (method) {
      props[method] = {
        writable: true,
        value: function value() {
          for (var _len3 = arguments.length, args = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return this[method].apply(this, [name].concat(args));
        }
      };
    });
    proxiedMapperMethods.forEach(function (method) {
      props[method] = {
        writable: true,
        value: function value() {
          var _getMapper;

          return (_getMapper = this.getMapper(name))[method].apply(_getMapper, arguments);
        }
      };
    });
    props.getMapper = {
      writable: true,
      value: function value() {
        return _this.getMapper(name);
      }
    };
    proxiedCollectionMethods.forEach(function (method) {
      props[method] = {
        writable: true,
        value: function value() {
          var _getCollection;

          return (_getCollection = this.getCollection(name))[method].apply(_getCollection, arguments);
        }
      };
    });
    props.getCollection = {
      writable: true,
      value: function value() {
        return _this.getCollection(name);
      }
    };
    return Object.create(this, props);
  },


  /**
   * Retrieve a cached `find` result, if any.
   *
   * @method DataStore#cachedFind
   * @param {string} name The `name` argument passed to {@link DataStore#find}.
   * @param {(string|number)} id The `id` argument passed to {@link DataStore#find}.
   * @param {Object} opts The `opts` argument passed to {@link DataStore#find}.
   * @since 3.0.0
   */
  cachedFind: cachedFn,

  /**
   * Retrieve a cached `findAll` result, if any.
   *
   * @method DataStore#cachedFindAll
   * @param {string} name The `name` argument passed to {@link DataStore#findAll}.
   * @param {string} hash The result of calling {@link DataStore#hashQuery} on
   * the `query` argument passed to {@link DataStore#findAll}.
   * @param {Object} opts The `opts` argument passed to {@link DataStore#findAll}.
   * @since 3.0.0
   */
  cachedFindAll: cachedFn,

  /**
   * Cache a `find` result. The default implementation does the following:
   *
   * ```
   * // Find and return the record from the data store
   * return this.get(name, id)
   * ```
   *
   * Override this method to customize.
   *
   * @method DataStore#cacheFind
   * @param {string} name The `name` argument passed to {@link DataStore#find}.
   * @param {*} data The result to cache.
   * @param {(string|number)} id The `id` argument passed to {@link DataStore#find}.
   * @param {Object} opts The `opts` argument passed to {@link DataStore#find}.
   * @since 3.0.0
   */
  cacheFind: function cacheFind(name, data, id, opts) {
    var _this2 = this;

    this._completedQueries[name][id] = function (name, id, opts) {
      return _this2.get(name, id);
    };
  },


  /**
   * Cache a `findAll` result. The default implementation does the following:
   *
   * ```
   * // Find and return the records from the data store
   * return this.filter(name, utils.fromJson(hash))
   * ```
   *
   * Override this method to customize.
   *
   * @method DataStore#cacheFindAll
   * @param {string} name The `name` argument passed to {@link DataStore#findAll}.
   * @param {*} data The result to cache.
   * @param {string} hash The result of calling {@link DataStore#hashQuery} on
   * the `query` argument passed to {@link DataStore#findAll}.
   * @param {Object} opts The `opts` argument passed to {@link DataStore#findAll}.
   * @since 3.0.0
   */
  cacheFindAll: function cacheFindAll(name, data, hash, opts) {
    var _this3 = this;

    this._completedQueries[name][hash] = function (name, hash, opts) {
      return _this3.filter(name, utils.fromJson(hash));
    };
  },
  clear: function clear() {
    var removed = {};
    utils.forOwn(this._collections, function (collection, name) {
      removed[name] = collection.removeAll();
    });
    return removed;
  },


  /**
   * Wrapper for {@link Mapper#create}. Adds the created to the store.
   *
   * @method DataStore#create
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} record Passed to {@link Mapper#create}.
   * @param {Object} [opts] Passed to {@link Mapper#create}. See
   * {@link Mapper#create} for more configuration options.
   * @returns {Promise} Resolves with the result of the create.
   * @since 3.0.0
   */
  create: function create(name, record, opts) {
    var _this4 = this;

    opts || (opts = {});
    return this._callSuper('create', name, record, opts).then(function (result) {
      return _this4._end(name, result, opts);
    });
  },


  /**
   * Wrapper for {@link Mapper#createMany}. Adds the created records to the
   * store.
   *
   * @method DataStore#createMany
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Array} records Passed to {@link Mapper#createMany}.
   * @param {Object} [opts] Passed to {@link Mapper#createMany}. See
   * {@link Mapper#createMany} for more configuration options.
   * @returns {Promise} Resolves with the result of the create.
   * @since 3.0.0
   */
  createMany: function createMany(name, records, opts) {
    var _this5 = this;

    opts || (opts = {});
    return this._callSuper('createMany', name, records, opts).then(function (result) {
      return _this5._end(name, result, opts);
    });
  },
  defineMapper: function defineMapper(name, opts) {
    // Complexity of this method is beyond simply using => functions to bind context
    var self = this;
    var mapper = utils.getSuper(self).prototype.defineMapper.call(self, name, opts);
    self._pendingQueries[name] = {};
    self._completedQueries[name] = {};
    mapper.relationList || Object.defineProperty(mapper, 'relationList', { value: [] });

    // The datastore uses a subclass of Collection that is "datastore-aware"
    var collection = self._collections[name] = new self.collectionClass(null, { // eslint-disable-line
      // Make sure the collection has somewhere to store "added" timestamps
      _added: {},
      // Give the collection a reference to this datastore
      datastore: self,
      // The mapper tied to the collection
      mapper: mapper
    });

    var schema = mapper.schema || {};
    var properties = schema.properties || {};
    // TODO: Make it possible index nested properties?
    utils.forOwn(properties, function (opts, prop) {
      if (opts.indexed) {
        collection.createIndex(prop);
      }
    });

    // Create a secondary index on the "added" timestamps of records in the
    // collection
    collection.createIndex('addedTimestamps', ['$'], {
      fieldGetter: function fieldGetter(obj) {
        return collection._added[collection.recordId(obj)];
      }
    });

    collection.on('all', function () {
      for (var _len4 = arguments.length, args = Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
        args[_key5] = arguments[_key5];
      }

      self._onCollectionEvent.apply(self, [name].concat(args));
    });

    var idAttribute = mapper.idAttribute;

    mapper.relationList.forEach(function (def) {
      var relation = def.relation;
      var localField = def.localField;
      var path = 'links.' + localField;
      var foreignKey = def.foreignKey;
      var type = def.type;
      var updateOpts = { index: foreignKey };
      var descriptor = void 0;

      var getter = function getter() {
        return this._get(path);
      };

      if (type === belongsToType) {
        (function () {
          if (!collection.indexes[foreignKey]) {
            collection.createIndex(foreignKey);
          }

          descriptor = {
            get: getter,
            set: function set(record) {
              var _self = this;
              var current = this._get(path);
              if (record === current) {
                return current;
              }
              var id = utils.get(_self, idAttribute);
              var inverseDef = def.getInverse(mapper);

              if (record) {
                var relatedIdAttribute = def.getRelation().idAttribute;
                var relatedId = utils.get(record, relatedIdAttribute);

                // Prefer store record
                if (!utils.isUndefined(relatedId)) {
                  record = self.get(relation, relatedId) || record;
                }

                // Set locals
                _self._set(path, record);
                safeSet(_self, foreignKey, relatedId);
                collection.updateIndex(_self, updateOpts);

                // Update (set) inverse relation
                if (inverseDef.type === hasOneType) {
                  utils.set(record, inverseDef.localField, _self);
                } else if (inverseDef.type === hasManyType) {
                  var children = utils.get(record, inverseDef.localField);
                  utils.noDupeAdd(children, _self, function (_record) {
                    return id === utils.get(_record, idAttribute);
                  });
                }
              } else {
                // Unset locals
                _self._set(path, undefined);
                safeSet(_self, foreignKey, undefined);
                collection.updateIndex(_self, updateOpts);
              }
              if (current) {
                if (inverseDef.type === hasOneType) {
                  utils.set(current, inverseDef.localField, undefined);
                } else if (inverseDef.type === hasManyType) {
                  var _children = utils.get(current, inverseDef.localField);
                  utils.remove(_children, function (_record) {
                    return id === utils.get(_record, idAttribute);
                  });
                }
              }
              return record;
            }
          };

          var foreignKeyDescriptor = Object.getOwnPropertyDescriptor(mapper.recordClass.prototype, foreignKey);
          if (!foreignKeyDescriptor) {
            foreignKeyDescriptor = {
              enumerable: true
            };
          }
          var originalGet = foreignKeyDescriptor.get;
          foreignKeyDescriptor.get = function () {
            if (originalGet) {
              return originalGet.call(this);
            }
            return this._get('props.' + foreignKey);
          };
          var originalSet = foreignKeyDescriptor.set;
          foreignKeyDescriptor.set = function (value) {
            if (originalSet) {
              originalSet.call(this, value);
            }
            if (utils.isUndefined(value)) {
              // Unset locals
              utils.set(this, localField, undefined);
            } else {
              safeSet(this, foreignKey, value);
              var storeRecord = self.get(relation, value);
              if (storeRecord) {
                utils.set(this, localField, storeRecord);
              }
            }
          };
          Object.defineProperty(mapper.recordClass.prototype, foreignKey, foreignKeyDescriptor);
        })();
      } else if (type === hasManyType) {
        (function () {
          var localKeys = def.localKeys;
          var foreignKeys = def.foreignKeys;

          // TODO: Handle case when belongsTo relation isn't ever defined
          if (self._collections[relation] && foreignKey && !self.getCollection(relation).indexes[foreignKey]) {
            self.getCollection(relation).createIndex(foreignKey);
          }

          descriptor = {
            get: function get() {
              var _self = this;
              var current = getter.call(_self);
              if (!current) {
                _self._set(path, []);
              }
              return getter.call(_self);
            },
            set: function set(records) {
              var _self = this;
              records || (records = []);
              if (records && !utils.isArray(records)) {
                records = [records];
              }
              var id = utils.get(_self, idAttribute);
              var relatedIdAttribute = def.getRelation().idAttribute;
              var inverseDef = def.getInverse(mapper);
              var inverseLocalField = inverseDef.localField;
              var linked = _self._get(path);
              if (!linked) {
                linked = [];
              }

              var current = linked;
              linked = [];
              var toLink = {};
              records.forEach(function (record) {
                var relatedId = utils.get(record, relatedIdAttribute);
                if (!utils.isUndefined(relatedId)) {
                  // Prefer store record
                  record = self.get(relation, relatedId) || record;
                  toLink[relatedId] = record;
                }
                linked.push(record);
              });
              if (foreignKey) {
                records.forEach(function (record) {
                  // Update (set) inverse relation
                  safeSet(record, foreignKey, id);
                  self.getCollection(relation).updateIndex(record, updateOpts);
                  utils.set(record, inverseLocalField, _self);
                });
                current.forEach(function (record) {
                  var relatedId = utils.get(record, relatedIdAttribute);
                  if (!utils.isUndefined(relatedId) && !toLink.hasOwnProperty(relatedId)) {
                    // Update (unset) inverse relation
                    safeSet(record, foreignKey, undefined);
                    self.getCollection(relation).updateIndex(record, updateOpts);
                    utils.set(record, inverseLocalField, undefined);
                  }
                });
              } else if (localKeys) {
                (function () {
                  var _localKeys = [];
                  records.forEach(function (record) {
                    // Update (set) inverse relation
                    utils.set(record, inverseLocalField, _self);
                    _localKeys.push(utils.get(record, relatedIdAttribute));
                  });
                  // Update locals
                  utils.set(_self, localKeys, _localKeys);
                  // Update (unset) inverse relation
                  current.forEach(function (record) {
                    var relatedId = utils.get(record, relatedIdAttribute);
                    if (!utils.isUndefined(relatedId) && !toLink.hasOwnProperty(relatedId)) {
                      // Update inverse relation
                      utils.set(record, inverseLocalField, undefined);
                    }
                  });
                })();
              } else if (foreignKeys) {
                // Update (unset) inverse relation
                current.forEach(function (record) {
                  var _localKeys = utils.get(record, foreignKeys) || [];
                  utils.remove(_localKeys, function (_key) {
                    return id === _key;
                  });
                  var _localField = utils.get(record, inverseLocalField) || [];
                  utils.remove(_localField, function (_record) {
                    return id === utils.get(_record, idAttribute);
                  });
                });
                // Update (set) inverse relation
                records.forEach(function (record) {
                  var _localKeys = utils.get(record, foreignKeys) || [];
                  utils.noDupeAdd(_localKeys, id, function (_key) {
                    return id === _key;
                  });
                  var _localField = utils.get(record, inverseLocalField) || [];
                  utils.noDupeAdd(_localField, _self, function (_record) {
                    return id === utils.get(_record, idAttribute);
                  });
                });
              }

              _self._set(path, linked);
              return linked;
            }
          };
        })();
      } else if (type === hasOneType) {
        // TODO: Handle case when belongsTo relation isn't ever defined
        if (self._collections[relation] && foreignKey && !self.getCollection(relation).indexes[foreignKey]) {
          self.getCollection(relation).createIndex(foreignKey);
        }
        descriptor = {
          get: getter,
          set: function set(record) {
            var _self = this;
            var current = this._get(path);
            if (record === current) {
              return current;
            }
            var relatedId = utils.get(record, def.getRelation().idAttribute);
            var inverseLocalField = def.getInverse(mapper).localField;
            // Update (unset) inverse relation
            if (current) {
              safeSet(current, foreignKey, undefined);
              self.getCollection(relation).updateIndex(current, updateOpts);
              utils.set(current, inverseLocalField, undefined);
            }
            if (record) {
              // Prefer store record
              if (!utils.isUndefined(relatedId)) {
                record = self.get(relation, relatedId) || record;
              }

              // Set locals
              _self._set(path, record);

              // Update (set) inverse relation
              safeSet(record, foreignKey, utils.get(_self, idAttribute));
              self.getCollection(relation).updateIndex(record, updateOpts);
              utils.set(record, inverseLocalField, _self);
            } else {
              // Set locals
              _self._set(path, undefined);
            }
            return record;
          }
        };
      }

      if (descriptor) {
        descriptor.enumerable = utils.isUndefined(def.enumerable) ? false : def.enumerable;
        if (def.get) {
          (function () {
            var origGet = descriptor.get;
            descriptor.get = function () {
              var _this6 = this;

              return def.get(def, this, function () {
                for (var _len5 = arguments.length, args = Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
                  args[_key6] = arguments[_key6];
                }

                return origGet.apply(_this6, args);
              });
            };
          })();
        }
        if (def.set) {
          (function () {
            var origSet = descriptor.set;
            descriptor.set = function (related) {
              var _this7 = this;

              return def.set(def, this, related, function (value) {
                return origSet.call(_this7, value === undefined ? related : value);
              });
            };
          })();
        }
        Object.defineProperty(mapper.recordClass.prototype, localField, descriptor);
      }
    });

    return mapper;
  },


  /**
   * Wrapper for {@link Mapper#destroy}. Removes any destroyed record from the
   * store.
   *
   * @method DataStore#destroy
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(string|number)} id Passed to {@link Mapper#destroy}.
   * @param {Object} [opts] Passed to {@link Mapper#destroy}. See
   * {@link Mapper#destroy} for more configuration options.
   * @returns {Promise} Resolves when the delete completes.
   * @since 3.0.0
   */
  destroy: function destroy(name, id, opts) {
    var _this8 = this;

    opts || (opts = {});
    return this._callSuper('destroy', name, id, opts).then(function (result) {
      if (opts.raw) {
        result.data = _this8.getCollection(name).remove(id, opts);
      } else {
        result = _this8.getCollection(name).remove(id, opts);
      }
      delete _this8._pendingQueries[name][id];
      delete _this8._completedQueries[name][id];
      return result;
    });
  },


  /**
   * Wrapper for {@link Mapper#destroyAll}. Removes any destroyed records from
   * the store.
   *
   * @method DataStore#destroyAll
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} [query] Passed to {@link Mapper#destroyAll}.
   * @param {Object} [opts] Passed to {@link Mapper#destroyAll}. See
   * {@link Mapper#destroyAll} for more configuration options.
   * @returns {Promise} Resolves when the delete completes.
   * @since 3.0.0
   */
  destroyAll: function destroyAll(name, query, opts) {
    var _this9 = this;

    opts || (opts = {});
    return this._callSuper('destroyAll', name, query, opts).then(function (result) {
      if (opts.raw) {
        result.data = _this9.getCollection(name).removeAll(query, opts);
      } else {
        result = _this9.getCollection(name).removeAll(query, opts);
      }
      var hash = _this9.hashQuery(name, query, opts);
      delete _this9._pendingQueries[name][hash];
      delete _this9._completedQueries[name][hash];
      return result;
    });
  },
  eject: function eject(name, id, opts) {
    console.warn('DEPRECATED: "eject" is deprecated, use "remove" instead');
    return this.remove(name, id, opts);
  },
  ejectAll: function ejectAll(name, query, opts) {
    console.warn('DEPRECATED: "ejectAll" is deprecated, use "removeAll" instead');
    return this.removeAll(name, query, opts);
  },


  /**
   * Wrapper for {@link Mapper#find}. Adds any found record to the store.
   *
   * @method DataStore#find
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(string|number)} id Passed to {@link Mapper#find}.
   * @param {Object} [opts] Passed to {@link Mapper#find}.
   * @returns {Promise} Resolves with the result, if any.
   * @since 3.0.0
   */
  find: function find(name, id, opts) {
    var _this10 = this;

    opts || (opts = {});
    var pendingQuery = this._pendingQueries[name][id];

    utils.fillIn(opts, this.getMapper(name));

    if (pendingQuery) {
      return pendingQuery;
    }
    var item = this.cachedFind(name, id, opts);
    var promise = void 0;

    if (opts.force || !item) {
      promise = this._pendingQueries[name][id] = this._callSuper('find', name, id, opts).then(function (result) {
        delete _this10._pendingQueries[name][id];
        result = _this10._end(name, result, opts);
        _this10.cacheFind(name, result, id, opts);
        return result;
      }, function (err) {
        delete _this10._pendingQueries[name][id];
        return utils.reject(err);
      });
    } else {
      promise = utils.resolve(item);
    }
    return promise;
  },


  /**
   * Wrapper for {@link Mapper#findAll}. Adds any found records to the store.
   *
   * @method DataStore#findAll
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} [query] Passed to {@link Model.findAll}.
   * @param {Object} [opts] Passed to {@link Model.findAll}.
   * @returns {Promise} Resolves with the result, if any.
   * @since 3.0.0
   */
  findAll: function findAll(name, query, opts) {
    var _this11 = this;

    opts || (opts = {});
    var hash = this.hashQuery(name, query, opts);
    var pendingQuery = this._pendingQueries[name][hash];

    utils.fillIn(opts, this.getMapper(name));

    if (pendingQuery) {
      return pendingQuery;
    }

    var items = this.cachedFindAll(name, hash, opts);
    var promise = void 0;

    if (opts.force || !items) {
      promise = this._pendingQueries[name][hash] = this._callSuper('findAll', name, query, opts).then(function (result) {
        delete _this11._pendingQueries[name][hash];
        result = _this11._end(name, result, opts);
        _this11.cacheFindAll(name, result, hash, opts);
        return result;
      }, function (err) {
        delete _this11._pendingQueries[name][hash];
        return utils.reject(err);
      });
    } else {
      promise = utils.resolve(items);
    }
    return promise;
  },


  /**
   * Return the {@link LinkedCollection} with the given name.
   *
   * @method DataStore#getCollection
   * @param {string} name Name of the {@link LinkedCollection} to retrieve.
   * @returns {LinkedCollection}
   * @since 3.0.0
   * @throws {Error} Thrown if the specified {@link LinkedCollection} does not
   * exist.
   */
  getCollection: function getCollection(name) {
    var collection = this._collections[name];
    if (!collection) {
      throw utils.err(DOMAIN$8 + '#getCollection', name)(404, 'collection');
    }
    return collection;
  },


  /**
   * Hashing function used to cache {@link DataStore#find} and
   * {@link DataStore#findAll} requests. This method simply JSONifies the
   * `query` argument passed to {@link DataStore#find} or
   * {@link DataStore#findAll}.
   *
   * Override this method for custom hashing behavior.
   * @method DataStore#hashQuery
   * @param {string} name The `name` argument passed to {@link DataStore#find}
   * or {@link DataStore#findAll}.
   * @param {Object} query The `query` argument passed to {@link DataStore#find}
   * or {@link DataStore#findAll}.
   * @returns {string} The JSONified `query`.
   * @since 3.0.0
   */
  hashQuery: function hashQuery(name, query, opts) {
    return utils.toJson(query);
  },
  inject: function inject(name, records, opts) {
    console.warn('DEPRECATED: "inject" is deprecated, use "add" instead');
    return this.add(name, records, opts);
  },


  /**
   * Wrapper for {@link LinkedCollection#remove}. Removes the specified
   * {@link Record} from the store.
   *
   * @method DataStore#remove
   * @param {string} name The name of the {@link LinkedCollection} to target.
   * @param {string|number} id The primary key of the {@link Record} to remove.
   * @param {Object} [opts] Configuration options.
   * @param {string[]} [opts.with] Relations of the {@link Record} to also
   * remove from the store.
   * @returns {Record} The removed {@link Record}, if any.
   * @since 3.0.0
   */
  remove: function remove(name, id, opts) {
    var record = this.getCollection(name).remove(id, opts);
    if (record) {
      this.removeRelated(name, [record], opts);
    }
    return record;
  },


  /**
   * Wrapper for {@link LinkedCollection#removeAll}. Removes the selected
   * {@link Record}s from the store.
   *
   * @method DataStore#removeAll
   * @param {string} name The name of the {@link LinkedCollection} to target.
   * @param {Object} [query={}] Selection query. See {@link query}.
   * @param {Object} [query.where] See {@link query.where}.
   * @param {number} [query.offset] See {@link query.offset}.
   * @param {number} [query.limit] See {@link query.limit}.
   * @param {string|Array[]} [query.orderBy] See {@link query.orderBy}.
   * @param {Object} [opts] Configuration options.
   * @param {string[]} [opts.with] Relations of the {@link Record} to also
   * remove from the store.
   * @returns {Record} The removed {@link Record}s, if any.
   * @since 3.0.0
   */
  removeAll: function removeAll(name, query, opts) {
    var records = this.getCollection(name).removeAll(query, opts);
    if (records.length) {
      this.removeRelated(name, records, opts);
    }
    return records;
  },


  /**
   * Remove from the store {@link Record}s that are related to the provided
   * {@link Record}(s).
   *
   * @method DataStore#removeRelated
   * @param {string} name The name of the {@link LinkedCollection} to target.
   * @param {Record|Record[]} records {@link Record}s whose relations are to be
   * removed.
   * @param {Object} [opts] Configuration options.
   * @param {string[]} [opts.with] Relations of the {@link Record}(s) to remove
   * from the store.
   * @since 3.0.0
   */
  removeRelated: function removeRelated(name, records, opts) {
    var _this12 = this;

    if (!utils.isArray(records)) {
      records = [records];
    }
    utils.forEachRelation(this.getMapper(name), opts, function (def, optsCopy) {
      records.forEach(function (record) {
        var relatedData = void 0;
        var query = void 0;
        if (def.foreignKey && (def.type === hasOneType || def.type === hasManyType)) {
          query = babelHelpers.defineProperty({}, def.foreignKey, def.getForeignKey(record));
        } else if (def.type === hasManyType && def.localKeys) {
          query = {
            where: babelHelpers.defineProperty({}, def.getRelation().idAttribute, {
              'in': utils.get(record, def.localKeys)
            })
          };
        } else if (def.type === hasManyType && def.foreignKeys) {
          query = {
            where: babelHelpers.defineProperty({}, def.foreignKeys, {
              'contains': def.getForeignKey(record)
            })
          };
        } else if (def.type === belongsToType) {
          relatedData = _this12.remove(def.relation, def.getForeignKey(record), optsCopy);
        }
        if (query) {
          relatedData = _this12.removeAll(def.relation, query, optsCopy);
        }
        if (relatedData) {
          if (utils.isArray(relatedData) && !relatedData.length) {
            return;
          }
          if (def.type === hasOneType) {
            relatedData = relatedData[0];
          }
          def.setLocalField(record, relatedData);
        }
      });
    });
  },


  /**
   * Wrapper for {@link Mapper#update}. Adds the updated {@link Record} to the
   * store.
   *
   * @method DataStore#update
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(string|number)} id Passed to {@link Mapper#update}.
   * @param {Object} record Passed to {@link Mapper#update}.
   * @param {Object} [opts] Passed to {@link Mapper#update}. See
   * {@link Mapper#update} for more configuration options.
   * @returns {Promise} Resolves with the result of the update.
   * @since 3.0.0
   */
  update: function update(name, id, record, opts) {
    var _this13 = this;

    opts || (opts = {});
    return this._callSuper('update', name, id, record, opts).then(function (result) {
      return _this13._end(name, result, opts);
    });
  },


  /**
   * Wrapper for {@link Mapper#updateAll}. Adds the updated {@link Record}s to
   * the store.
   *
   * @method DataStore#updateAll
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {Object} props Passed to {@link Mapper#updateAll}.
   * @param {Object} [query] Passed to {@link Mapper#updateAll}.
   * @param {Object} [opts] Passed to {@link Mapper#updateAll}. See
   * {@link Mapper#updateAll} for more configuration options.
   * @returns {Promise} Resolves with the result of the update.
   * @since 3.0.0
   */
  updateAll: function updateAll(name, props, query, opts) {
    var _this14 = this;

    opts || (opts = {});
    return this._callSuper('updateAll', name, query, props, opts).then(function (result) {
      return _this14._end(name, result, opts);
    });
  },


  /**
   * Wrapper for {@link Mapper#updateMany}. Adds the updated {@link Record}s to
   * the store.
   *
   * @method DataStore#updateMany
   * @param {string} name Name of the {@link Mapper} to target.
   * @param {(Object[]|Record[])} records Passed to {@link Mapper#updateMany}.
   * @param {Object} [opts] Passed to {@link Mapper#updateMany}. See
   * {@link Mapper#updateMany} for more configuration options.
   * @returns {Promise} Resolves with the result of the update.
   * @since 3.0.0
   */
  updateMany: function updateMany(name, records, opts) {
    var _this15 = this;

    opts || (opts = {});
    return this._callSuper('updateMany', name, records, opts).then(function (result) {
      return _this15._end(name, result, opts);
    });
  }
};

proxiedCollectionMethods.forEach(function (method) {
  props$1[method] = function (name) {
    var _getCollection2;

    for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key7 = 1; _key7 < _len6; _key7++) {
      args[_key7 - 1] = arguments[_key7];
    }

    return (_getCollection2 = this.getCollection(name))[method].apply(_getCollection2, args);
  };
});

var DataStore$1 = Container.extend(props$1);

/**
 * Create a subclass of this DataStore.
 *
 * @example <caption>Extend the class in a cross-browser manner.</caption>
 * import {DataStore} from 'js-data'
 * const CustomDataStoreClass = DataStore.extend({
 *   foo () { return 'bar' }
 * })
 * const customDataStore = new CustomDataStoreClass()
 * console.log(customDataStore.foo()) // "bar"
 *
 * @example <caption>Extend the class using ES2015 class syntax.</caption>
 * class CustomDataStoreClass extends DataStore {
 *   foo () { return 'bar' }
 * }
 * const customDataStore = new CustomDataStoreClass()
 * console.log(customDataStore.foo()) // "bar"
 *
 * @method DataStore.extend
 * @param {Object} [props={}] Properties to add to the prototype of the
 * subclass.
 * @param {Object} [classProps={}] Static properties to add to the subclass.
 * @returns {Constructor} Subclass of this DataStore.
 * @since 3.0.0
 */

/**
 * Registered as `js-data` in NPM and Bower.
 *
 * Also available from CDN.JS and JSDelivr.
 *
 * @module js-data
 *
 * @example <caption>Install from NPM</caption>
 * npm i --save js-data@beta
 * @example <caption>Install from Bower</caption>
 * bower i --save js-data@3.0.0-beta.1
 * @example <caption>Install from CDN.JS</caption>
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/js-data/3.0.0-beta.1/js-data.min.js"></script>
 * @example <caption>Install from JSDelivr</caption>
 * <script src="https://cdn.jsdelivr.net/js-data/3.0.0-beta.1/js-data.min.js"></script>
 * @example <caption>Load into your app via script tag</caption>
 * <script src="/path/to/js-data.min.js"></script>
 * <script>
 *   console.log(JSData.version.full); // "3.0.0-beta.1"
 * </script>
 * @example <caption>Load into your app via CommonJS</caption>
 * var JSData = require('js-data');
 * @example <caption>Load into your app via ES2015 Modules</caption>
 * import * as JSData from 'js-data';
 * @example <caption>Load into your app via AMD</caption>
 * define('myApp', ['js-data'], function (JSData) { ... })
 */

/**
 * Describes the version of this `JSData` object.
 *
 * @example
 * console.log(JSData.version.full) // "3.0.0-beta.1"
 *
 * @name version
 * @memberof module:js-data
 * @property {string} full The full semver value.
 * @property {number} major The major version number.
 * @property {number} minor The minor version number.
 * @property {number} patch The patch version number.
 * @property {(string|boolean)} alpha The alpha version value, otherwise `false`
 * if the current version is not alpha.
 * @property {(string|boolean)} beta The beta version value, otherwise `false`
 * if the current version is not beta.
 * @since 2.0.0
 * @type {Object}
 */
var version = {
  beta: 7,
  full: '3.0.0-beta.7',
  major: 3,
  minor: 0,
  patch: 0
};

export { version, Collection$1 as Collection, Component, Container, DataStore$1 as DataStore, Index, LinkedCollection$1 as LinkedCollection, Mapper$1 as Mapper, Query$1 as Query, Record$1 as Record, Schema$1 as Schema, utils, belongsTo, hasMany, hasOne, belongsToType, hasManyType, hasOneType };
//# sourceMappingURL=js-data.es2015.js.map