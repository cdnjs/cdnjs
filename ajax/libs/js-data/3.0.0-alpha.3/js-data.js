/*!
* js-data
* @version 3.0.0-alpha.3 - Homepage <http://www.js-data.io/>
* @author Jason Dobry <jason.dobry@gmail.com>
* @copyright (c) 2014-2015 Jason Dobry
* @license MIT <https://github.com/js-data/js-data/blob/master/LICENSE>
*
* @overview Robust framework-agnostic data store.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.JSData = {}));
}(this, function (exports) { 'use strict';

  var babelHelpers = {};

  babelHelpers.typeof = function (obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
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

  babelHelpers;
  /**
   * @module utils
   * @memberof module:js-data
   */

  /**
   * Return whether the provided value is an array.
   * @method
   * @param {*} [value] - The value to test.
   */
  var isArray = Array.isArray;
  /**
   * Return whether the provided value is an object type.
   * @param {*} [value] - The value to test.
   */
  function isObject(value) {
    return toString.call(value) === '[object Object]' || false;
  }
  function isPlainObject(value) {
    return !!value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && value.constructor === Object;
  }
  /**
   * Return whether the provided value is a regular expression type.
   * @param {*} [value] - The value to test.
   */
  function isRegExp(value) {
    return toString.call(value) === '[object RegExp]' || false;
  }
  /**
   * Return whether the provided value is a string type.
   * @param {*} [value] - The value to test.
   */
  function isString(value) {
    return typeof value === 'string' || value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && toString.call(value) === '[object String]' || false;
  }
  /**
   * Return whether the provided value is a date type.
   * @param {*} [value] - The value to test.
   */
  function isDate(value) {
    return value && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && toString.call(value) === '[object Date]' || false;
  }
  /**
   * Return whether the provided value is a number type.
   * @param {*} [value] - The value to test.
   */
  function isNumber(value) {
    var type = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
    return type === 'number' || value && type === 'object' && toString.call(value) === '[object Number]' || false;
  }
  /**
   * Return whether the provided value is a boolean type.
   * @param {*} [value] - The value to test.
   */
  function isBoolean(value) {
    return toString.call(value) === '[object Boolean]';
  }
  /**
   * Return whether the provided value is a function.
   * @param {*} [value] - The value to test.
   */
  function isFunction(value) {
    return typeof value === 'function' || value && toString.call(value) === '[object Function]' || false;
  }
  /**
   * Return whether the provided value is a string or a number.
   * @param {*} [value] - The value to test.
   */
  function isSorN(value) {
    return isString(value) || isNumber(value);
  }
  /**
   * Get the value at the provided key or path.
   * @param {Object} object - The object from which to retrieve a property.
   * @param {string} prop - The key or path to the property.
   */
  function get(object, prop) {
    if (!prop) {
      return;
    }
    var parts = prop.split('.');
    var last = parts.pop();

    while (prop = parts.shift()) {
      object = object[prop];
      if (object == null) return;
    }

    return object[last];
  }
  /**
   * Unset the value at the provided key or path.
   * @param {Object} object - The object on which to unset a property.
   * @param {string} prop - The key or path to the property.
   */
  function unset(object, prop) {
    var parts = prop.split('.');
    var last = parts.pop();

    while (prop = parts.shift()) {
      object = object[prop];
      if (object == null) return;
    }

    object[last] = undefined;
    delete object[last];
  }
  function mkdirP(object, path) {
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
  }
  var PATH = /^(.+)\.(.+)$/;
  /**
   * Set the value at the provided key or path.
   * @param {Object} object - The object on which to set a property.
   * @param {(string|Object)} path - The key or path to the property. Can also
   * pass in an object of path/value pairs, which will all be set on the target
   * object.
   * @param {*} [value] - The value to set.
   */
  function _set(object, path, value) {
    if (isObject(path)) {
      forOwn(path, function (value, _path) {
        _set(object, _path, value);
      });
    } else {
      var parts = PATH.exec(path);
      if (parts) {
        mkdirP(object, parts[1])[parts[2]] = value;
      } else {
        object[path] = value;
      }
    }
  }
  /**
   * Iterate over an object's own enumerable properties.
   * @param {Object} object - The object whose properties are to be enumerated.
   * @param {Function} fn - Iteration function.
   * @param {Object} [thisArg] - Content to which to bind `fn`.
   */
  function forOwn(obj, fn, thisArg) {
    var keys = Object.keys(obj);
    var len = keys.length;
    var i = undefined;
    for (i = 0; i < len; i++) {
      fn.call(thisArg, obj[keys[i]], keys[i], obj);
    }
  }
  /**
   * Recursively shallow copy own enumberable properties from `source` to `dest`.
   * @param {Object} dest - The destination object.
   * @param {Object} source - The source object.
   */
  function deepMixIn(dest, source) {
    if (source) {
      forOwn(source, function (value, key) {
        var existing = this[key];
        if (isPlainObject(value) && isPlainObject(existing)) {
          deepMixIn(existing, value);
        } else {
          this[key] = value;
        }
      }, dest);
    }
    return dest;
  }
  /**
   * Proxy for `Promise.resolve`.
   * @param {*} [value] - Value with which to resolve the Promise.
   * @return {Promise} Promise resolved with `value`.
   */
  function resolve$1(value) {
    return Promise.resolve(value);
  }
  /**
   * Proxy for `Promise.reject`.
   * @param {*} [value] - Value with which to reject the Promise.
   * @return {Promise} Promise reject with `value`.
   */
  function reject(value) {
    return Promise.reject(value);
  }
  /**
   * Shallow copy own enumerable non-function properties from `Model` to `opts`.
   * @param {Model} Model - The source Model.
   * @param {Object} opts - The target object.
   */
  function _(Model, opts) {
    for (var key in Model) {
      var value = Model[key];
      if (opts[key] === undefined && !isFunction(value)) {
        opts[key] = value;
      }
    }
  }
  /**
   * Return the intersection of two arrays.
   * @param {Array} array1 - First array.
   * @param {Array} array2 - Second array.
   * @return {Array} Array of elements common to both arrays.
   */
  function intersection(array1, array2) {
    if (!array1 || !array2) {
      return [];
    }
    var result = [];
    var item = undefined;
    var i = undefined;
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
  }
  /**
   * Shallow copy own enumerable properties from `src` to `dest` that are on `src`
   * but are missing from `dest.
   * @param {Object} dest - The destination object.
   * @param {Object} source - The source object.
   */
  function fillIn(dest, src) {
    forOwn(src, function (value, key) {
      if (dest[key] === undefined) {
        dest[key] = value;
      }
    });
  }
  /**
   * Return whether `prop` is matched by any string or regular expression in `bl`.
   * @param {string} prop - The name of a property.
   * @param {Array} bl - Array of strings and regular expressions.
   * @return {boolean} Whether `prop` was matched.
   */
  function isBlacklisted(prop, bl) {
    if (!bl || !bl.length) {
      return false;
    }
    var matches = undefined;
    for (var i = 0; i < bl.length; i++) {
      if (Object.prototype.toString.call(bl[i]) === '[object RegExp]' && bl[i].test(prop) || bl[i] === prop) {
        matches = prop;
        return matches;
      }
    }
    return !!matches;
  }
  /**
   * Proxy for `JSON.parse`.
   * @param {string} json - JSON to parse.
   * @return {Object} Parsed object.
   */
  function fromJson(json) {
    return isString(json) ? JSON.parse(json) : json;
  }
  /**
   * Proxy for `JSON.stringify`.
   * @method
   * @param {*} value - Value to serialize to JSON.
   * @return {string} JSON string.
   */
  var toJson = JSON.stringify;
  /**
   * Deep copy a value.
   * @param {*} from - Value to deep copy.
   * @return {*} Deep copy of `from`.
   */
  function copy(from, to, stackFrom, stackTo, blacklist) {
    if (!to) {
      to = from;
      if (from) {
        if (isArray(from)) {
          to = copy(from, [], stackFrom, stackTo, blacklist);
        } else if (isDate(from)) {
          to = new Date(from.getTime());
        } else if (isRegExp(from)) {
          to = new RegExp(from.source, from.toString().match(/[^\/]*$/)[0]);
          to.lastIndex = from.lastIndex;
        } else if (isObject(from)) {
          to = copy(from, Object.create(Object.getPrototypeOf(from)), stackFrom, stackTo, blacklist);
        }
      }
    } else {
      if (from === to) {
        throw new Error('Cannot copy! Source and destination are identical.');
      }

      stackFrom = stackFrom || [];
      stackTo = stackTo || [];

      if (isObject(from)) {
        var index = stackFrom.indexOf(from);
        if (index !== -1) {
          return stackTo[index];
        }

        stackFrom.push(from);
        stackTo.push(to);
      }

      var result = undefined;
      if (isArray(from)) {
        var i = undefined;
        to.length = 0;
        for (i = 0; i < from.length; i++) {
          result = copy(from[i], null, stackFrom, stackTo, blacklist);
          if (isObject(from[i])) {
            stackFrom.push(from[i]);
            stackTo.push(result);
          }
          to.push(result);
        }
      } else {
        if (isArray(to)) {
          to.length = 0;
        } else {
          forOwn(to, function (value, key) {
            delete to[key];
          });
        }
        for (var key in from) {
          if (from.hasOwnProperty(key)) {
            if (isBlacklisted(key, blacklist)) {
              continue;
            }
            result = copy(from[key], null, stackFrom, stackTo, blacklist);
            if (isObject(from[key])) {
              stackFrom.push(from[key]);
              stackTo.push(result);
            }
            to[key] = result;
          }
        }
      }
    }
    return to;
  }
  var SPLIT = /\s+/;
  var NON_ALPHA = /[^A-Za-z]/g;
  var PASCAL_CASE = /(\w)(\w*)/g;
  function pascalize(g0, g1, g2) {
    return '' + g1.toUpperCase() + g2.toLowerCase();
  }
  function mapToPascal(x) {
    return x.replace(NON_ALPHA, '').replace(PASCAL_CASE, pascalize);
  }
  /**
   * Convert a string to pascalcase.
   * @param {string} str - String to convert.
   * @return {string} Converted string.
   */
  function pascalCase(str) {
    return str.split(SPLIT).map(mapToPascal).join('');
  }
  /**
   * Convert a string to camelcase.
   * @param {string} str - String to convert.
   * @return {string} Converted string.
   */
  function camelCase(str) {
    str = pascalCase(str);
    if (str) {
      return str.charAt(0).toLowerCase() + str.slice(1);
    }
    return str;
  }
  /**
   * Add eventing capabilities into the target object.
   * @param {Object} target - Target object.
   * @param {Function} [getter] - Custom getter for retrieving the object's event
   * listeners.
   * @param {Function} [setter] - Custom setter for setting the object's event
   * listeners.
   */
  function eventify(target, getter, setter) {
    target = target || this;
    var _events = {};
    if (!getter && !setter) {
      getter = function () {
        return _events;
      };
      setter = function (value) {
        _events = value;
      };
    }
    Object.defineProperties(target, {
      on: {
        value: function value(type, func, ctx) {
          if (!getter.call(this)) {
            setter.call(this, {});
          }
          var events = getter.call(this);
          events[type] = events[type] || [];
          events[type].push({
            f: func,
            c: ctx
          });
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
      emit: {
        value: function value() {
          var events = getter.call(this) || {};

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var type = args.shift();
          var listeners = events[type] || [];
          var i = undefined;
          for (i = 0; i < listeners.length; i++) {
            listeners[i].f.apply(listeners[i].c, args);
          }
          listeners = events.all || [];
          args.unshift(type);
          for (i = 0; i < listeners.length; i++) {
            listeners[i].f.apply(listeners[i].c, args);
          }
        }
      }
    });
  }

  // RiveraGroup/node-tiny-uuid
  // DO WTF YOU WANT TO PUBLIC LICENSE
  function uuid(a, b) {
    for (b = a = ''; // b - result , a - numeric variable
    a++ < 36; b += a * 51 & 52 // if "a" is not 9 or 14 or 19 or 24
    ? //  return a random number or 4
    (a ^ 15 // if "a" is not 15
    ? // genetate a random number from 0 to 15
    8 ^ Math.random() * (a ^ 20 ? 16 : 4) // unless "a" is 20, in which case a random number from 8 to 11
    : 4 //  otherwise 4
    ).toString(16) : '-' //  in other cases (if "a" is 9,14,19,24) insert "-"
    ) {}
    return b;
  }

  function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : babelHelpers.typeof(call)) === 'object' || typeof call === 'function') ? call : self;
  }

  function addHiddenPropsToTarget(target, props) {
    forOwn(props, function (value, key) {
      props[key] = {
        value: value
      };
    });
    Object.defineProperties(target, props);
  }

  var _utils = Object.freeze({
    isArray: isArray,
    isObject: isObject,
    isRegExp: isRegExp,
    isString: isString,
    isDate: isDate,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isFunction: isFunction,
    isSorN: isSorN,
    get: get,
    unset: unset,
    set: _set,
    forOwn: forOwn,
    deepMixIn: deepMixIn,
    resolve: resolve$1,
    reject: reject,
    _: _,
    intersection: intersection,
    fillIn: fillIn,
    isBlacklisted: isBlacklisted,
    fromJson: fromJson,
    toJson: toJson,
    copy: copy,
    pascalCase: pascalCase,
    camelCase: camelCase,
    eventify: eventify,
    uuid: uuid,
    classCallCheck: classCallCheck,
    possibleConstructorReturn: possibleConstructorReturn,
    addHiddenPropsToTarget: addHiddenPropsToTarget
  });

  /**
   * A class used by the @{link Collection} class to build queries to be executed
   * against the collection's data. An instance of `Query` is returned by
   * {@link Model.query} and {@link Collection.query}.
   * @class Query
   * @param {Collection} collection - The collection on which this query operates.
   */
  function Query(collection) {
    classCallCheck(this, Query);

    /**
     * The collection on which this query operates.
     * @type {Collection}
     */
    this.collection = collection;
    /**
     * The data result of this query.
     * @type {Array}
     */
    this.data = null;
  }

  var reserved = {
    skip: '',
    offset: '',
    where: '',
    limit: '',
    orderBy: '',
    sort: ''
  };

  function compare(orderBy, index, a, b) {
    var def = orderBy[index];
    var cA = get(a, def[0]);
    var cB = get(b, def[0]);
    if (cA && isString(cA)) {
      cA = cA.toUpperCase();
    }
    if (cB && isString(cB)) {
      cB = cB.toUpperCase();
    }
    if (def[1] === 'DESC') {
      if (cB < cA) {
        return -1;
      } else if (cB > cA) {
        return 1;
      } else {
        if (index < orderBy.length - 1) {
          return compare(orderBy, index + 1, a, b);
        } else {
          return 0;
        }
      }
    } else {
      if (cA < cB) {
        return -1;
      } else if (cA > cB) {
        return 1;
      } else {
        if (index < orderBy.length - 1) {
          return compare(orderBy, index + 1, a, b);
        } else {
          return 0;
        }
      }
    }
  }

  var escapeRegExp = /([.*+?^=!:${}()|[\]\/\\])/g;
  var percentRegExp = /%/g;
  var underscoreRegExp = /_/g;

  function escape(pattern) {
    return pattern.replace(escapeRegExp, '\\$1');
  }

  function like(pattern, flags) {
    return new RegExp('^' + escape(pattern).replace(percentRegExp, '.*').replace(underscoreRegExp, '.') + '$', flags);
  }

  function evaluate(value, op, predicate) {
    switch (op) {
      case '==':
        return value == predicate; // eslint-disable-line
      case '===':
        return value === predicate;
      case '!=':
        return value != predicate; // eslint-disable-line
      case '!==':
        return value !== predicate;
      case '>':
        return value > predicate;
      case '>=':
        return value >= predicate;
      case '<':
        return value < predicate;
      case '<=':
        return value <= predicate;
      case 'isectEmpty':
        return !intersection(value || [], predicate || []).length;
      case 'isectNotEmpty':
        return intersection(value || [], predicate || []).length;
      case 'in':
        return predicate.indexOf(value) !== -1;
      case 'notIn':
        return predicate.indexOf(value) === -1;
      case 'contains':
        return value.indexOf(predicate) !== -1;
      case 'notContains':
        return value.indexOf(predicate) === -1;
      default:
        if (op.indexOf('like') === 0) {
          return like(predicate, op.substr(4)).exec(value) !== null;
        } else if (op.indexOf('notLike') === 0) {
          return like(predicate, op.substr(7)).exec(value) === null;
        }
    }
  }

  addHiddenPropsToTarget(Query.prototype, {
    /**
     * Return the current data result of this query.
     * @memberof Query
     * @instance
     * @return {Array} The data in this query.
     */

    getData: function getData() {
      if (!this.data) {
        this.data = this.collection.index.getAll();
      }
      return this.data;
    },

    /**
     * Find all entities between two boundaries.
     *
     * Get the users ages 18 to 30
     * ```js
     * const users = query.between(18, 30, { index: 'age' }).run()
     * ```
     * Same as above
     * ```js
     * const users = query.between([18], [30], { index: 'age' }).run()
     * ```
     *
     * @memberof Query
     * @instance
     * @param {Array} leftKeys - Keys defining the left boundary.
     * @param {Array} rightKeys - Keys defining the right boundary.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.index] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @param {boolean} [opts.leftInclusive=true] - Whether to include entities
     * on the left boundary.
     * @param {boolean} [opts.rightInclusive=false] - Whether to include entities
     * on the left boundary.
     * @param {boolean} [opts.limit] - Limit the result to a certain number.
     * @param {boolean} [opts.offset] - The number of resulting entities to skip.
     * @return {Query} A reference to itself for chaining.
     */
    between: function between(leftKeys, rightKeys, opts) {
      opts || (opts = {});
      var collection = this.collection;
      var index = opts.index ? collection.indexes[opts.index] : collection.index;
      if (this.data) {
        throw new Error('Cannot access index after first operation!');
      }
      this.data = index.between(leftKeys, rightKeys, opts);
      return this;
    },

    /**
     * Find the entity or entities that match the provided key.
     *
     * #### Example
     *
     * Get the entity whose primary key is 25
     * ```js
     * const entities = query.get(25).run()
     * ```
     * Same as above
     * ```js
     * const entities = query.get([25]).run()
     * ```
     * Get all users who are active and have the "admin" role
     * ```js
     * const activeAdmins = query.get(['active', 'admin'], {
     *   index: 'activityAndRoles'
     * }).run()
     * ```
     * Get all entities that match a certain weather condition
     * ```js
     * const niceDays = query.get(['sunny', 'humid', 'calm'], {
     *   index: 'weatherConditions'
     * }).run()
     * ```
     *
     * @memberof Query
     * @instance
     * @param {Array} keyList - Key(s) defining the entity to retrieve. If
     * `keyList` is not an array (i.e. for a single-value key), it will be
     * wrapped in an array.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.string] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @return {Query} A reference to itself for chaining.
     */
    get: function get() {
      var keyList = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
      var opts = arguments[1];

      opts || (opts = {});
      if (this.data) {
        throw new Error('Cannot access index after first operation!');
      }
      if (keyList && !isArray(keyList)) {
        keyList = [keyList];
      }
      if (!keyList.length) {
        this.getData();
        return this;
      }
      var collection = this.collection;
      var index = opts.index ? collection.indexes[opts.index] : collection.index;
      this.data = index.get(keyList);
      return this;
    },

    /**
     * Find the entity or entities that match the provided keyLists.
     *
     * #### Example
     *
     * Get the posts where "status" is "draft" or "inReview"
     * ```js
     * const posts = query.getAll('draft', 'inReview', { index: 'status' }).run()
     * ```
     * Same as above
     * ```js
     * const posts = query.getAll(['draft'], ['inReview'], { index: 'status' }).run()
     * ```
     *
     * @memberof Query
     * @instance
     * @param {...Array} [keyList] - Provide one or more keyLists, and all
     * entities matching each keyList will be retrieved. If no keyLists are
     * provided, all entities will be returned.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.index] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @return {Query} A reference to itself for chaining.
     */
    getAll: function getAll() {
      var _this = this;

      var opts = {};
      if (this.data) {
        throw new Error('Cannot access index after first operation!');
      }

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!args.length || args.length === 1 && isObject(args[0])) {
        this.getData();
        return this;
      } else if (args.length && isObject(args[args.length - 1])) {
        opts = args[args.length - 1];
        args.pop();
      }
      var collection = this.collection;
      var index = opts.index ? collection.indexes[opts.index] : collection.index;
      this.data = [];
      args.forEach(function (keyList) {
        _this.data = _this.data.concat(index.get(keyList));
      });
      return this;
    },

    /**
     * Find the entity or entities that match the provided query or pass the
     * provided filter function.
     *
     * #### Example
     *
     * Get the draft posts created less than three months
     * ```js
     * const posts = query.filter({
     *   where: {
     *     status: {
     *       '==': 'draft'
     *     },
     *     created_at_timestamp: {
     *       '>=': (new Date().getTime() - (1000 * 60 * 60 * 24 * 30 * 3)) // 3 months ago
     *     }
     *   }
     * }).run()
     * ```
     * Use a custom filter function
     * ```js
     * const posts = query.filter(function (post) {
     *   return post.isReady()
     * }).run()
     * ```
     *
     * @memberof Query
     * @instance
     * @param {(Object|Function)} [queryOrFn={}] - Selection query or filter
     * function.
     * @param {Function} [thisArg] - Context to which to bind `queryOrFn` if
     * `queryOrFn` is a function.
     * @return {Query} A reference to itself for chaining.
     */
    filter: function filter(query, thisArg) {
      var _this2 = this;

      query || (query = {});
      this.getData();
      if (isObject(query)) {
        (function () {
          var where = {};
          // Filter
          if (isObject(query.where)) {
            where = query.where;
          }
          forOwn(query, function (value, key) {
            if (!(key in reserved) && !(key in where)) {
              where[key] = {
                '==': value
              };
            }
          });

          var fields = [];
          var ops = [];
          var predicates = [];
          forOwn(where, function (clause, field) {
            if (!isObject(clause)) {
              clause = {
                '==': clause
              };
            }
            forOwn(clause, function (expr, op) {
              fields.push(field);
              ops.push(op);
              predicates.push(expr);
            });
          });
          if (fields.length) {
            (function () {
              var i = undefined;
              var len = fields.length;
              _this2.data = _this2.data.filter(function (item) {
                var first = true;
                var keep = true;

                for (i = 0; i < len; i++) {
                  var op = ops[i];
                  var isOr = op.charAt(0) === '|';
                  op = isOr ? op.substr(1) : op;
                  var expr = evaluate(get(item, fields[i]), op, predicates[i]);
                  if (expr !== undefined) {
                    keep = first ? expr : isOr ? keep || expr : keep && expr;
                  }
                  first = false;
                }
                return keep;
              });
            })();
          }

          // Sort
          var orderBy = query.orderBy || query.sort;

          if (isString(orderBy)) {
            orderBy = [[orderBy, 'ASC']];
          }
          if (!isArray(orderBy)) {
            orderBy = null;
          }

          // Apply 'orderBy'
          if (orderBy) {
            (function () {
              var index = 0;
              orderBy.forEach(function (def, i) {
                if (isString(def)) {
                  orderBy[i] = [def, 'ASC'];
                }
              });
              _this2.data.sort(function (a, b) {
                return compare(orderBy, index, a, b);
              });
            })();
          }

          // Skip
          if (isNumber(query.skip)) {
            _this2.skip(query.skip);
          } else if (isNumber(query.offset)) {
            _this2.skip(query.offset);
          }
          // Limit
          if (isNumber(query.limit)) {
            _this2.limit(query.limit);
          }
        })();
      } else if (isFunction(query)) {
        this.data = this.data.filter(query, thisArg);
      }
      return this;
    },

    /**
     * Skip a number of results.
     *
     * #### Example
     *
     * Get all but the first 10 draft posts
     * ```js
     * const posts = query.get('draft', { index: 'status' }).skip(10).run()
     * ```
     *
     * @memberof Query
     * @instance
     * @param {number} num - The number of entities to skip.
     * @return {Query} A reference to itself for chaining.
     */
    skip: function skip(num) {
      if (!isNumber(num)) {
        throw new TypeError('skip: Expected number but found ' + (typeof num === 'undefined' ? 'undefined' : babelHelpers.typeof(num)) + '!');
      }
      var data = this.getData();
      if (num < data.length) {
        this.data = data.slice(num);
      } else {
        this.data = [];
      }
      return this;
    },

    /**
     * Limit the result.
     *
     * #### Example
     *
     * Get only the first 10 draft posts
     * ```js
     * const posts = query.get('draft', { index: 'status' }).limit(10).run()
     * ```
     *
     * @memberof Query
     * @instance
     * @param {number} num - The maximum number of entities to keep in the result.
     * @return {Query} A reference to itself for chaining.
     */
    limit: function limit(num) {
      if (!isNumber(num)) {
        throw new TypeError('limit: Expected number but found ' + (typeof num === 'undefined' ? 'undefined' : babelHelpers.typeof(num)) + '!');
      }
      var data = this.getData();
      this.data = data.slice(0, Math.min(data.length, num));
      return this;
    },

    /**
     * Iterate over all entities.
     *
     * @memberof Query
     * @instance
     * @param {Function} forEachFn - Iteration function.
     * @param {*} [thisArg] - Context to which to bind `forEachFn`.
     * @return {Query} A reference to itself for chaining.
     */
    forEach: function forEach(forEachFn, thisArg) {
      this.getData().forEach(forEachFn, thisArg);
      return this;
    },

    /**
     * Apply a mapping function to the result data.
     *
     * @memberof Query
     * @instance
     * @param {Function} mapFn - Mapping function.
     * @param {*} [thisArg] - Context to which to bind `mapFn`.
     * @return {Query} A reference to itself for chaining.
     */
    map: function map(mapFn, thisArg) {
      this.data = this.getData().map(mapFn, thisArg);
      return this;
    },

    /**
     * Complete the execution of the query and return the resulting data.
     *
     * @memberof Query
     * @instance
     * @return {Array} The result of executing this query.
     */
    run: function run() {
      var data = this.data;
      this.data = null;
      return data;
    }
  });

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
    var compared = undefined;
    var mid = undefined;

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

  var blacklist = { '>': 1, '>=': 1, '<': 1, '<=': 1 };

  function Index(fieldList, opts) {
    classCallCheck(this, Index);
    fieldList || (fieldList = []);

    if (!isArray(fieldList)) {
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

  addHiddenPropsToTarget(Index.prototype, {
    set: function set(keyList, value) {
      if (!isArray(keyList)) {
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
    get: function get(keyList) {
      if (!isArray(keyList)) {
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
    getAll: function getAll() {
      var results = [];
      this.values.forEach(function (value) {
        if (value.isIndex) {
          results = results.concat(value.getAll());
        } else {
          results = results.concat(value);
        }
      });
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
    query: function query(_query) {
      var leftKeys = undefined;
      var rightKeys = undefined;

      if (_query['>']) {
        leftKeys = _query['>'];
        _query.leftInclusive = false;
      } else if (_query['>=']) {
        leftKeys = _query['>='];
        _query.leftInclusive = true;
      }

      if (_query['<']) {
        rightKeys = _query['<'];
        _query.rightInclusive = false;
      } else if (_query['<=']) {
        rightKeys = _query['<='];
        _query.rightInclusive = true;
      }

      if (leftKeys.length !== rightKeys.length) {
        throw new Error('Key arrays must be same length');
      }

      var _opts = {};
      forOwn(_query, function (value, key) {
        if (!blacklist[key]) {
          _opts[key] = value;
        }
      });
      return this.between(leftKeys, rightKeys, _opts);
    },
    between: function between(leftKeys, rightKeys) {
      var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      if (!isArray(leftKeys)) {
        leftKeys = [leftKeys];
      }
      if (!isArray(rightKeys)) {
        rightKeys = [rightKeys];
      }
      fillIn(opts, {
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

      var pos = undefined;

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
        for (var i = pos.index; i < this.keys.length; i += 1) {
          var currKey = this.keys[i];
          if (currKey > rightKey) {
            break;
          }

          if (this.values[i].isIndex) {
            if (currKey === leftKey) {
              results = results.concat(this.values[i]._between(copy(leftKeys), rightKeys.map(function () {
                return undefined;
              }), opts));
            } else if (currKey === rightKey) {
              results = results.concat(this.values[i]._between(leftKeys.map(function () {
                return undefined;
              }), copy(rightKeys), opts));
            } else {
              results = results.concat(this.values[i].getAll());
            }
          } else {
            results = results.concat(this.values[i]);
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
    remove: function remove(keyList, value) {
      if (!isArray(keyList)) {
        keyList = [keyList];
      }

      var key = keyList.shift();
      var pos = binarySearch(this.keys, key);

      if (keyList.length === 0) {
        if (pos.found) {
          var dataLocation = binarySearch(this.values[pos.index], value, this.hashCode);
          if (dataLocation.found) {
            removeAt(this.values[pos.index], dataLocation.index);
            if (this.values[pos.index].length === 0) {
              removeAt(this.keys, pos.index);
              removeAt(this.values, pos.index);
            }
          }
        }
      } else {
        if (pos.found) {
          this.values[pos.index].delete(keyList, value);
        }
      }
    },
    clear: function clear() {
      this.keys = [];
      this.values = [];
    },
    insertRecord: function insertRecord(data) {
      var keyList = this.fieldList.map(function (field) {
        if (isFunction(field)) {
          return field(data) || null;
        } else {
          return data[field] || null;
        }
      });

      this.set(keyList, data);
    },
    removeRecord: function removeRecord(data) {
      var _this = this;

      var removed = undefined;
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

  /**
   * @class Collection
   * @param {Array} [data=[]] - Initial set of entities to insert into the
   * collection.
   * @param {string} [idAttribute='id'] - Field to use as the unique identifier
   * of each entity in the collection.
   */
  function Collection() {
    var _this = this;

    var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var idAttribute = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

    classCallCheck(this, Collection);
    if (!isArray(data)) {
      throw new TypeError('new Collection([data]): data: Expected array. Found ' + (typeof data === 'undefined' ? 'undefined' : babelHelpers.typeof(data)));
    }
    /**
     * Field to use as the unique identifier for each entity in this collection.
     * @type {string}
     */
    this.idAttribute = idAttribute;

    /**
     * The main index, which uses @{link Collection#idAttribute} as the key.
     * @type {Index}
     */
    this.index = new Index([idAttribute], {
      hashCode: function hashCode(obj) {
        return get(obj, idAttribute);
      }
    });
    /**
     * Object that holds the other secondary indexes of this collection.
     * @type {Object.<string, Index>}
     */
    this.indexes = {};
    data.forEach(function (record) {
      _this.index.insertRecord(record);
      if (record && isFunction(record.on)) {
        record.on('all', _this._onModelEvent, _this);
      }
    });
  }

  addHiddenPropsToTarget(Collection.prototype, {
    _onModelEvent: function _onModelEvent() {
      this.emit.apply(this, arguments);
    },

    /**
     * Create a new secondary index on the contents of the collection.
     *
     * #### Example
     *
     * Index users by age
     * ```js
     * collection.createIndex('age')
     * ```
     * Index users by status and role
     * ```js
     * collection.createIndex('statusAndRole', ['status', 'role'])
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {string} name - The name of the new secondary index.
     * @param {string[]} [keyList] - Array of field names to use as the key or
     * compound key of the new secondary index. If no keyList is provided, then
     * the name will also be the field that is used to index the collection.
     * @return {Collection} A reference to itself for chaining.
     */
    createIndex: function createIndex(name, keyList, opts) {
      if (isString(name) && keyList === undefined) {
        keyList = [name];
      }
      opts || (opts = {});
      var idAttribute = this.idAttribute;
      opts.hashCode = function (obj) {
        return get(obj, idAttribute);
      };
      var index = this.indexes[name] = new Index(keyList, opts);
      this.index.visitAll(index.insertRecord, index);
      return this;
    },

    /**
     * Create a new query to be executed against the contents of the collection.
     * The result will be all or a subset of the contents of the collection.
     *
     * #### Example
     *
     * Grab page 2 of users between ages 18 and 30
     * ```js
     * collection.query()
     *   .between(18, 30, { index: 'age' }) // between ages 18 and 30
     *   .skip(10) // second page
     *   .limit(10) // page size
     *   .run()
     * ```
     *
     * @memberof Collection
     * @instance
     * @return {Query} New query object.
     */
    query: function query() {
      return new Query(this);
    },

    /**
     * Find all entities between two boundaries.
     *
     * Shortcut for `collection.query().between(18, 30, { index: 'age' }).run()`
     *
     * Get all users ages 18 to 30
     * ```js
     * const users = collection.between(18, 30, { index: 'age' })
     * ```
     * Same as above
     * ```js
     * const users = collection.between([18], [30], { index: 'age' })
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {Array} leftKeys - Keys defining the left boundary.
     * @param {Array} rightKeys - Keys defining the right boundary.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.index] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @param {boolean} [opts.leftInclusive=true] - Whether to include entities
     * on the left boundary.
     * @param {boolean} [opts.rightInclusive=false] - Whether to include entities
     * on the left boundary.
     * @param {boolean} [opts.limit] - Limit the result to a certain number.
     * @param {boolean} [opts.offset] - The number of resulting entities to skip.
     * @return {Array} The result.
     */
    between: function between(leftKeys, rightKeys, opts) {
      return this.query().between(leftKeys, rightKeys, opts).run();
    },

    /**
     * Find the entity or entities that match the provided key.
     *
     * Shortcut for `collection.query().get(keyList).run()`
     *
     * #### Example
     *
     * Get the entity whose primary key is 25
     * ```js
     * const entities = collection.get(25)
     * ```
     * Same as above
     * ```js
     * const entities = collection.get([25])
     * ```
     * Get all users who are active and have the "admin" role
     * ```js
     * const activeAdmins = collection.get(['active', 'admin'], {
     *   index: 'activityAndRoles'
     * })
     * ```
     * Get all entities that match a certain weather condition
     * ```js
     * const niceDays = collection.get(['sunny', 'humid', 'calm'], {
     *   index: 'weatherConditions'
     * })
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {Array} keyList - Key(s) defining the entity to retrieve. If
     * `keyList` is not an array (i.e. for a single-value key), it will be
     * wrapped in an array.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.string] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @return {Array} The result.
     */
    get: function get(keyList, opts) {
      return this.query().get(keyList, opts).run();
    },

    /**
     * Find the entity or entities that match the provided keyLists.
     *
     * Shortcut for `collection.query().getAll(keyList1, keyList2).run()`
     *
     * #### Example
     *
     * Get the posts where "status" is "draft" or "inReview"
     * ```js
     * const posts = collection.getAll('draft', 'inReview', { index: 'status' })
     * ```
     * Same as above
     * ```js
     * const posts = collection.getAll(['draft'], ['inReview'], { index: 'status' })
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {...Array} [keyList] - Provide one or more keyLists, and all
     * entities matching each keyList will be retrieved. If no keyLists are
     * provided, all entities will be returned.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.index] - Name of the secondary index to use in the
     * query. If no index is specified, the main index is used.
     * @return {Array} The result.
     */
    getAll: function getAll() {
      var _query;

      return (_query = this.query()).getAll.apply(_query, arguments).run();
    },

    /**
     * Find the entity or entities that match the provided query or pass the
     * provided filter function.
     *
     * Shortcut for `collection.query().filter(queryOrFn[, thisArg]).run()`
     *
     * #### Example
     *
     * Get the draft posts created less than three months
     * ```js
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
     * ```
     * Use a custom filter function
     * ```js
     * const posts = collection.filter(function (post) {
     *   return post.isReady()
     * })
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {(Object|Function)} [queryOrFn={}] - Selection query or filter
     * function.
     * @param {Object} [thisArg] - Context to which to bind `queryOrFn` if
     * `queryOrFn` is a function.
     * @return {Array} The result.
     */
    filter: function filter(query, thisArg) {
      return this.query().filter(query, thisArg).run();
    },

    /**
     * Skip a number of results.
     *
     * Shortcut for `collection.query().skip(numberToSkip).run()`
     *
     * #### Example
     *
     * ```js
     * const posts = collection.skip(10)
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {number} num - The number of entities to skip.
     * @return {Array} The result.
     */
    skip: function skip(num) {
      return this.query().skip(num).run();
    },

    /**
     * Limit the result.
     *
     * Shortcut for `collection.query().limit(maximumNumber).run()`
     *
     * #### Example
     *
     * ```js
     * const posts = collection.limit(10)
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {number} num - The maximum number of entities to keep in the result.
     * @return {Array} The result.
     */
    limit: function limit(num) {
      return this.query().limit(num).run();
    },

    /**
     * Iterate over all entities.
     *
     * #### Example
     *
     * ```js
     * collection.forEach(function (entity) {
     *   // do something
     * })
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {Function} forEachFn - Iteration function.
     * @param {*} [thisArg] - Context to which to bind `forEachFn`.
     * @return {Array} The result.
     */
    forEach: function forEach(cb, thisArg) {
      this.index.visitAll(cb, thisArg);
    },

    /**
     * Reduce the data in the collection to a single value and return the result.
     *
     * #### Example
     *
     * ```js
     * const totalVotes = collection.reduce(function (prev, entity) {
     *   return prev + entity.upVotes + entity.downVotes
     * }, 0)
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {Function} callback - Reduction callback.
     * @param {*} initialValue - Initial value of the reduction.
     * @return {*} The result.
     */
    reduce: function reduce(callback, initialValue) {
      var data = this.getAll();
      return data.reduce(callback, initialValue);
    },

    /**
     * Apply a mapping function to all entities.
     *
     * #### Example
     *
     * ```js
     * const names = collection.map(function (user) {
     *   return user.name
     * })
     * ```
     *
     * @memberof Collection
     * @instance
     * @param {Function} mapFn - Mapping function.
     * @param {*} [thisArg] - Context to which to bind `mapFn`.
     * @return {Array} The result of the mapping.
     */
    map: function map(cb, thisArg) {
      var data = [];
      this.index.visitAll(function (value) {
        data.push(cb.call(thisArg, value));
      });
      return data;
    },

    /**
     * Instead a record into this collection, updating all indexes with the new
     * record.
     * one index.
     * @memberof Collection
     * @instance
     * @param {Object} record - The record to insert.
     */
    insert: function insert(record) {
      this.index.insertRecord(record);
      forOwn(this.indexes, function (index, name) {
        index.insertRecord(record);
      });
      if (record && isFunction(record.on)) {
        record.on('all', this._onModelEvent, this);
      }
    },

    /**
     * Update the given record's position in all indexes of this collection. See
     * {@link Collection#updateRecord} to update a record's in only one of the
     * indexes.
     * @memberof Collection
     * @instance
     * @param {Object} record - The record to update.
     */
    update: function update(record) {
      this.index.updateRecord(record);
      forOwn(this.indexes, function (index, name) {
        index.updateRecord(record);
      });
    },

    /**
     * Remove the given record from all indexes in this collection.
     * @memberof Collection
     * @instance
     * @param {Object} record - The record to be removed.
     */
    remove: function remove(record) {
      this.index.removeRecord(record);
      forOwn(this.indexes, function (index, name) {
        index.removeRecord(record);
      });
      if (record && isFunction(record.off)) {
        record.off('all', this._onModelEvent, this);
      }
    },

    /**
     * Update a record's position in a single index of this collection. See
     * {@link Collection#update} to update a record's position in all indexes at
     * once.
     * @memberof Collection
     * @instance
     * @param {Object} record - The record to update.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.index] The index in which to update the record's
     * position. If you don't specify an index then the record will be updated
     * in the main index.
     */
    updateRecord: function updateRecord(record, opts) {
      opts || (opts = {});
      var index = opts.index ? this.indexes[opts.index] : this.index;
      index.updateRecord(record);
    }
  });

  eventify(Collection.prototype, function () {
    return this._events;
  }, function (value) {
    this._events = value;
  });

  var op = 'belongsTo';

  /**
   * Steps to apply a "belongsTo" relationship
   * 1. Choose the localField and localKey
   * 2. Configure property descriptor, possibly including custom getter/setter
   * 3. Add property to prototype of target Model
   *
   * The added property is where an instance of the related Model will be
   * attached to an instance of the target Model, e.g. if Comment belongsTo
   * User and "localField" is set to "user", "comment.user" will be a reference to
   * the user.
   *
   * @ignore
   */
  function applyBelongsTo(Model, Relation, opts) {
    opts || (opts = {});
    // Choose field where the relation will be attached
    var localField = opts.localField = opts.localField || Relation.name.toLowerCase();
    // Choose field that holds the primary key of the relation
    var localKey = opts.localKey = opts.localKey || Relation.name.toLowerCase() + '_id';

    // Setup configuration of the property
    var descriptor = {
      // Whether the field specified by "localField" will show up in "for...in"
      enumerable: opts.enumerable !== undefined ? !!opts.enumerable : false,
      // Set default method for retrieving the linked relation
      get: function get$$() {
        if (!this._get('$')) {
          return this._get('links.' + localField);
        }
        var key = get(this, localKey);
        var item = key !== undefined ? Relation.get(key) : undefined;
        this._set('links.' + localField, item);
        return item;
      },

      // Set default method for setting the linked relation
      set: function set(parent) {
        this._set('links.' + localField, parent);
        _set(this, localKey, parent[Relation.idAttribute]);
        return get(this, localField);
      }
    };

    var originalGet = descriptor.get;
    var originalSet = descriptor.set;

    // Check whether the relation shouldn't actually be linked via a getter
    if (opts.link === false || opts.link === undefined && !Model.linkRelations) {
      delete descriptor.get;
      delete descriptor.set;
      descriptor.writable = true;
    }

    // Check for user-defined getter
    if (opts.get) {
      // Set user-defined getter
      descriptor.get = function () {
        var _this = this;

        // Call user-defined getter, passing in:
        //  - target Model
        //  - related Model
        //  - instance of target Model
        //  - the original getter function, in case the user wants to use it
        return opts.get(Model, Relation, this, originalGet ? function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return originalGet.apply(_this, args);
        } : undefined);
      };
      delete descriptor.writable;
    }

    // Check for user-defined setter
    if (opts.set) {
      // Set user-defined setter
      descriptor.set = function (parent) {
        var _this2 = this;

        // Call user-defined getter, passing in:
        //  - target Model
        //  - related Model
        //  - instance of target Model
        //  - instance of related Model
        //  - the original setter function, in case the user wants to use it
        return opts.set(Model, Relation, this, parent, originalSet ? function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return originalSet.apply(_this2, args);
        } : undefined);
      };
      delete descriptor.writable;
    }

    if (descriptor.get) {
      descriptor.set || (descriptor.set = function () {});
    }

    // Finally, added property to prototype of target Model
    Object.defineProperty(Model.prototype, localField, descriptor);

    if (!Model.relationList) {
      Model.relationList = [];
    }
    if (!Model.relationFields) {
      Model.relationFields = [];
    }
    opts.type = 'belongsTo';
    opts.name = Model.name;
    opts.relation = Relation.name;
    opts.Relation = Relation;
    Model.relationList.push(opts);
    Model.relationFields.push(localField);
    Model.collection.createIndex(localKey);

    // Return target Model for chaining
    return Model;
  }

  /**
   * @memberof! module:js-data
   * @example
   * // ES6
   * import {belongsTo, Model} from 'js-data'
   * class User extends Model {}
   *
   * // @belongsTo(User) (ES7)
   * class Comment extends Model {}
   * belongsTo(User)(Comment)
   *
   * // ES5
   * var JSData = require('js-data')
   * var User = JSData.Model.extend({}, { name: 'User' })
   * var Comment = JSDataModel.extend({}, { name: 'Comment' })
   * JSData.belongsTo(User)(Comment)
   *
   * @param {Model} Model - The Model the target belongs to.
   * @param {Object} [opts] - Configuration options.
   * @param {string} [opts.localField] - The field on the target where the relation
   * will be attached.
   * @return {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  function belongsTo(Model, opts) {
    return function (target) {
      target.dbg(op, 'Model:', Model, 'opts:', opts);
      return applyBelongsTo(target, Model, opts);
    };
  }

  /**
   * @memberof! module:js-data
   * @example
   * // ES6
   * import {configure, Model} from 'js-data'
   *
   * // @configure(opts) (ES7)
   * class User extends JSData.Model {}
   * configure(opts)(User)
   *
   * // ES5
   * var JSData = require('js-data')
   * var User = JSData.Model.extend()
   * User.configure(opts)
   *
   * @param {Object} opts - Properties to apply to the target.
   * @param {boolean} [overwrite=true] - Whether to overwrite properties that
   * already exist on the target.
   */
  function configure(opts) {
    var overwrite = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    opts = opts || {};
    return function (target) {
      forOwn(opts, function (value, key) {
        if (target[key] === undefined || overwrite) {
          target[key] = copy(value);
        }
      });
      return target;
    };
  }

  var op$1 = 'hasMany';

  /**
   * Steps to apply a "hasMany" relationship
   * 1. Choose the localField and foreignKey or localKeys
   * 2. Configure property descriptor, possibly including custom getter/setter
   * 3. Add property to prototype of target Model
   *
   * The added property is where instances of the related Model will be
   * attached to an instance of the target Model, e.g. if User hasMany Comment
   * and "localField" is set to "comments", "user.comments" will be a reference to
   * the array of comments.
   *
   * @ignore
   */
  function applyHasMany(target, Relation, opts) {
    opts || (opts = {});
    // Choose field where the relation will be attached
    var localField = opts.localField || camelCase(Relation.name) + 'Collection';
    // Choose field on related instances that holds the primary key of instances
    // of the target Model
    var foreignKey = opts.foreignKey;
    var localKeys = opts.localKeys;
    var foreignKeys = opts.foreignKeys;

    if (!foreignKey && !localKeys && !foreignKeys) {
      foreignKey = opts.foreignKey = camelCase(target.name) + 'Id';
    }
    if (foreignKey) {
      Relation.collection.createIndex(foreignKey);
    }

    // Setup configuration of the property
    var descriptor = {
      // Whether the field specified by "localField" will show up in "for...in"
      enumerable: opts.enumerable !== undefined ? !!opts.enumerable : false,
      // Set default method for retrieving the linked relation
      get: function get$$() {
        if (!this._get('$')) {
          return this._get('links.' + localField);
        }
        var query = {};
        var items = undefined;
        if (foreignKey) {
          // Make a FAST retrieval of the relation using a secondary index
          items = Relation.getAll(get(this, target.idAttribute), { index: foreignKey });
        } else if (localKeys) {
          var keys = get(this, localKeys) || [];
          var args = isArray(keys) ? keys : Object.keys(keys);
          // Make a slower retrieval using the ids in the "localKeys" array
          items = Relation.getAll.apply(Relation, args);
        } else if (foreignKeys) {
          _set(query, 'where.' + foreignKeys + '.contains', get(this, target.idAttribute));
          // Make a much slower retrieval
          items = Relation.filter(query);
        }
        this._set('links.' + localField, items);
        return items;
      },

      // Set default method for setting the linked relation
      set: function set(children) {
        var _this = this;

        this._set('links.' + localField, children);
        if (children && children.length) {
          (function () {
            var id = get(_this, target.idAttribute);
            if (foreignKey) {
              children.forEach(function (child) {
                _set(child, foreignKey, id);
              });
            } else if (localKeys) {
              (function () {
                var keys = [];
                children.forEach(function (child) {
                  keys.push(get(child, Relation.idAttribute));
                });
                _set(_this, localKeys, keys);
              })();
            } else if (foreignKeys) {
              children.forEach(function (child) {
                var keys = get(child, foreignKeys);
                if (keys) {
                  if (keys.indexOf(id) === -1) {
                    keys.push(id);
                  }
                } else {
                  _set(child, foreignKeys, [id]);
                }
              });
            }
          })();
        }
        return get(this, localField);
      }
    };

    // Check whether the relation shouldn't actually be linked via a getter
    if (opts.link === false || opts.link === undefined && !target.linkRelations) {
      delete descriptor.get;
      delete descriptor.set;
      descriptor.writable = true;
    }

    // Check for user-defined getter
    if (opts.get) {
      (function () {
        var originalGet = descriptor.get;
        // Set user-defined getter
        descriptor.get = function () {
          var _this2 = this;

          // Call user-defined getter, passing in:
          //  - target Model
          //  - related Model
          //  - instance of target Model
          //  - the original getter function, in case the user wants to use it
          return opts.get(target, Relation, this, originalGet ? function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return originalGet.apply(_this2, args);
          } : undefined);
        };
      })();
    }

    // Check for user-defined setter
    if (opts.set) {
      (function () {
        var originalSet = descriptor.set;
        // Set user-defined setter
        descriptor.set = function (children) {
          var _this3 = this;

          // Call user-defined getter, passing in:
          //  - target Model
          //  - related Model
          //  - instance of target Model
          //  - instances of related Model
          //  - the original setter function, in case the user wants to use it
          return opts.set(target, Relation, this, children, originalSet ? function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return originalSet.apply(_this3, args);
          } : undefined);
        };
      })();
    }

    // Finally, added property to prototype of target Model
    Object.defineProperty(target.prototype, localField, descriptor);

    if (!target.relationList) {
      target.relationList = [];
    }
    if (!target.relationFields) {
      target.relationFields = [];
    }
    opts.type = 'hasMany';
    opts.name = target.name;
    opts.relation = Relation.name;
    opts.Relation = Relation;
    target.relationList.push(opts);
    target.relationFields.push(localField);

    // Return target Model for chaining
    return target;
  }

  /**
   * @memberof! module:js-data
   * @example
   * // ES6
   * import {hasMany, Model} from 'js-data'
   * class Comment extends Model {}
   *
   * // @hasMany(Comment)
   * class User extends Model {}
   * hasMany(Comment)(User)
   *
   * // ES5
   * var JSData = require('js-data')
   * var User = JSData.Model.extend({}, { name: 'User' })
   * var Comment = JSDataModel.extend({}, { name: 'Comment' })
   * JSData.hasMany(User)(Comment)
   *
   * @param {Model} Model - The Model of which the target has many.
   * @param {Object} [opts] - Configuration options.
   * @param {string} [opts.localField] - The field on the target where the relation
   * will be attached.
   * @return {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  function hasMany(Model, opts) {
    return function (target) {
      target.dbg(op$1, 'Model:', Model, 'opts:', opts);
      return applyHasMany(target, Model, opts);
    };
  }

  var op$2 = 'hasOne';

  /**
   * Steps to apply a "hasOne" relationship
   * 1. Choose the foreignKey and localKey
   * 2. Configure property descriptor, possibly including custom getter/setter
   * 3. Add property to prototype of target Model
   *
   * The added property is where an instance of the related Model will be
   * attached to an instance of the target Model, e.g. if User hasOne
   * Profile and "localField" is set to "profile", "user.profile" will be a
   * reference to the profile.
   *
   * @ignore
   */
  function applyHasOne(Model, Relation, opts) {
    opts || (opts = {});
    // Choose field where the relation will be attached
    var localField = opts.localField = opts.localField || camelCase(Relation.name);
    // Choose field that holds the primary key of the relation
    var foreignKey = opts.foreignKey = opts.foreignKey || camelCase(Model.name) + 'Id';

    // Setup configuration of the property
    var descriptor = {
      // Whether the field specified by "localField" will show up in "for...in"
      enumerable: opts.enumerable !== undefined ? !!opts.enumerable : false,
      // Set default method for retrieving the linked relation
      get: function get$$() {
        if (!this._get('$')) {
          return this._get('links.' + localField);
        }
        var items = Relation.getAll(get(this, Model.idAttribute), { index: foreignKey });
        var item = items && items.length ? items[0] : undefined;
        this._set('links.' + localField, item);
        return item;
      },

      // Set default method for setting the linked relation
      set: function set(child) {
        this._set('links.' + localField, child);
        _set(child, foreignKey, get(this, Model.idAttribute));
        return get(this, localField);
      }
    };

    // Check whether the relation shouldn't actually be linked via a getter
    if (opts.link === false || opts.link === undefined && !Model.linkRelations) {
      delete descriptor.get;
      delete descriptor.set;
    }

    // Check for user-defined getter
    if (opts.get) {
      (function () {
        var originalGet = descriptor.get;
        // Set user-defined getter
        descriptor.get = function () {
          var _this = this;

          // Call user-defined getter, passing in:
          //  - target Model
          //  - related Model
          //  - instance of target Model
          //  - the original getter function, in case the user wants to use it
          return opts.get(Model, Relation, this, originalGet ? function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return originalGet.apply(_this, args);
          } : undefined);
        };
      })();
    }

    // Check for user-defined setter
    if (opts.set) {
      (function () {
        var originalSet = descriptor.set;
        // Set user-defined setter
        descriptor.set = function (child) {
          var _this2 = this;

          // Call user-defined getter, passing in:
          //  - target Model
          //  - related Model
          //  - instance of target Model
          //  - instance of related Model
          //  - the original setter function, in case the user wants to use it
          return opts.set(Model, Relation, this, child, originalSet ? function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return originalSet.apply(_this2, args);
          } : undefined);
        };
      })();
    }

    // Finally, added property to prototype of target Model
    Object.defineProperty(Model.prototype, localField, descriptor);

    if (!Model.relationList) {
      Model.relationList = [];
    }
    if (!Model.relationFields) {
      Model.relationFields = [];
    }
    opts.type = 'hasOne';
    opts.name = Model.name;
    opts.relation = Relation.name;
    opts.Relation = Relation;
    Model.relationList.push(opts);
    Model.relationFields.push(localField);
    Model.collection.createIndex(foreignKey);

    // Return target Model for chaining
    return Model;
  }

  /**
   * @memberof! module:js-data
   * @example
   * // ES6
   * import {hasOne, Model} from 'js-data'
   * class User extends Model {}
   *
   * // @hasOne(User) (ES7)
   * class Comment extends Model {}
   * hasOne(User, {...})(Comment)
   *
   * // ES5
   * var JSData = require('js-data')
   * var User = JSData.Model.extend({}, { name: 'User' })
   * var Comment = JSDataModel.extend({}, { name: 'Comment' })
   * JSData.hasOne(User, {...})(Comment)
   *
   * @param {Model} Model - The Model of which the target has one.
   * @param {Object} [opts] - Configuration options.
   * @param {string} [opts.localField] - The field on the target where the relation
   * will be attached.
   * @return {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  function hasOne(Model, opts) {
    return function (target) {
      target.dbg(op$2, 'Model:', Model, 'opts:', opts);
      return applyHasOne(target, Model, opts);
    };
  }

  var types = {
    array: isArray,
    boolean: isBoolean,
    integer: isNumber,
    number: isNumber,
    'null': function _null(value) {
      return value === null;
    },
    object: isObject,
    string: isString
  };

  var rules = {
    type: function type(predicate, value) {
      if (value === undefined) {
        return;
      }
      if (isString(predicate)) {
        predicate = [predicate];
      }
      var errors = predicate.map(function (type) {
        var validator = types[type];
        if (!validator) {
          return 'type: Unknown type ' + predicate;
        }
        return validator(value) ? undefined : 1;
      });
      return errors.indexOf(undefined) !== -1 ? undefined : 'type: Expected: ' + predicate.join(' or ') + '. Actual: ' + (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value));
    },
    anyOf: function anyOf(schemas, value) {
      var validated = false;
      var allErrors = [];
      schemas.forEach(function (schema) {
        var errors = validate(schema, value);
        if (errors) {
          allErrors = allErrors.concat(errors);
        } else {
          validated = true;
        }
      });
      return validated ? undefined : allErrors;
    },
    allOf: function allOf(schemas, value) {
      var allErrors = [];
      schemas.forEach(function (schema) {
        allErrors = allErrors.concat(validate(schema, value) || []);
      });
      return allErrors.length ? undefined : allErrors;
    },
    oneOf: function oneOf(schemas, value) {
      var validated = false;
      var allErrors = [];
      schemas.forEach(function (schema) {
        var errors = validate(schema, value);
        if (errors) {
          allErrors = allErrors.concat(errors);
        } else if (validated) {
          allErrors = ['more than one schema validated'];
          validated = false;
          return false;
        } else {
          validated = true;
        }
      });
      return validated ? undefined : allErrors;
    }
  };

  function validate(schema, value) {
    var errors = [];
    forOwn(schema, function (predicate, rule) {
      var validator = rules[rule];
      if (validator) {
        var err = validator(predicate, value);
        if (err) {
          errors.push(err);
        }
      }
    });
    return errors.length ? errors : undefined;
  }

  var op$3 = 'setSchema';

  /**
   * @param {Model} target - Target Model.
   * @param {string} key - Key for new property.
   * @param {Object} opts - Configuration options.
   * @ignore
   */
  function makeDescriptor(target, key, opts) {
    var descriptor = {
      enumerable: opts.enumerable !== undefined ? opts.enumerable : true
    };
    descriptor.get = function () {
      return this._get('props.' + key);
    };
    descriptor.set = function (value) {
      var _this = this;

      // TODO: rework this
      // if (isFunction(opts.validate) && !opts.validate(value)) {
      //   return false
      // }
      var _get = this._get;
      var _set = this._set;
      var _unset = this._unset;
      if (!_get('noValidate')) {
        var errors = validate(opts, value);
        if (errors) {
          throw new Error(errors.join(', '));
        }
      }
      if (opts.track && !_get('creating')) {
        (function () {
          var changing = _get('changing');
          var previous = _get('previous.' + key);
          var current = _get('props.' + key);
          var changed = _get('changed');
          if (!changing) {
            changed = [];
          }
          var index = changed.indexOf(key);
          if (current !== value && index === -1) {
            changed.push(key);
          }
          if (previous !== value) {
            _set('changes.' + key, value);
          } else {
            _unset('changes.' + key);
            if (index >= 0) {
              changed.splice(index, 1);
            }
          }
          if (!changed.length) {
            changing = false;
            _unset('changing');
            _unset('changed');
            if (_get('eventId')) {
              clearTimeout(_get('eventId'));
              _unset('eventId');
            }
          }
          if (!changing && changed.length) {
            _set('changed', changed);
            _set('changing', true);
            _set('eventId', setTimeout(function () {
              _unset('changed');
              _unset('eventId');
              _unset('changing');
              if (!_get('silent')) {
                var i = undefined;
                for (i = 0; i < changed.length; i++) {
                  _this.emit('change:' + changed[i], _this, get(_this, changed[i]));
                }
                _this.emit('change', _this, _get('changes'));
              }
              _unset('silent');
            }, 0));
          }
        })();
      }
      _set('props.' + key, value);
      if (_get('$') && opts.indexed) {
        target.collection.updateRecord(this, { index: key });
      }
      return value;
    };
    if (opts.indexed) {
      // Update index
      // TODO: Make this configurable, ie. immediate or lazy update
      target.createIndex(key);
    }
    if (opts.get) {
      if (descriptor.get) {
        (function () {
          var originalGet = descriptor.get;
          descriptor.get = function () {
            return opts.get.call(this, originalGet);
          };
        })();
      } else {
        descriptor.get = opts.get;
      }
    }
    if (opts.set) {
      if (descriptor.set) {
        (function () {
          var originalSet = descriptor.set;
          descriptor.set = function (value) {
            return opts.set.call(this, value, originalSet);
          };
        })();
      } else {
        descriptor.set = opts.set;
      }
    }
    return descriptor;
  }

  /**
   * @memberof! module:js-data
   * @example
   * // ES6
   * import {setSchema, Model} from 'js-data'
   * const properties = {
   *   first: {},
   *   last: {},
   *   role: {
   *     value: 'dev'
   *   },
   *   // computed property
   *   name: {
   *     get() { return `${this.first} ${this.last}` },
   *     set(value) {
   *       let parts = value.split(' ')
   *       this.first = parts[0]
   *       this.last = parts[1]
   *       return this
   *     }
   *   }
   * }
   *
   * // @setSchema(properties) (ES7)
   * class User extends Model {}
   * User.setSchema(properties)
   *
   * // ES5
   * var JSData = require('js-data')
   * var User = JSData.Model.extend({}, { name: 'User' })
   * User.setSchema(properties)
   *
   * @param {Object.<string, Object>} opts - Property configurations.
   * @return {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  function setSchema(opts) {
    opts || (opts = {});

    return function (target) {
      target.dbg(op$3, 'opts:', opts);

      target.schema || (target.schema = {});
      configure(target.schema, opts);

      forOwn(opts, function (prop, key) {
        var descriptor = makeDescriptor(target, key, prop);
        // TODO: This won't work for properties of Object type, because all
        // instances will share the prototype value
        if (!descriptor.writable) {
          Object.defineProperty(target.prototype, key, descriptor);
        }
      });
      return target;
    };
  }

  var op$4 = 'registerAdapter';

  /**
   * Add the provided adapter to the target's "adapters" property, registering it
   * with the specified.
   * @memberof! module:js-data
   * @param {string} name - The name under which to register the adapter.
   * @param {Adapter} adapter - The adapter to register.
   * @param {Object} opts - Configuration options.
   * @param {boolean} [opts.default=false] - Whether to make the adapter the
   * default adapter for the target.
   * @return {Function} Invocation function, which accepts the target as the only
   * parameter.
   */
  function registerAdapter(name, adapter, opts) {
    opts || (opts = {});
    opts.op = op$4;
    return function (target) {
      target.dbg(op$4, 'name:', name, 'adapter:', adapter, 'opts:', opts);
      // Register the adapter
      target.adapters[name] = adapter;
      // Optionally make it the default adapter for the target.
      if (opts === true || opts.default) {
        target.defaultAdapter = name;
      }
    };
  }

  var resolve = resolve$1;

  var keysToSkip = {
    length: 1,
    name: 1,
    arguments: 1,
    prototype: 1,
    caller: 1,
    __super__: 1
  };

  var isBrowser = false;

  try {
    isBrowser = !!window;
  } catch (e) {}

  var handleResponse = function handleResponse(model, data, opts, adapterName) {
    if (opts.raw) {
      data.adapter = adapterName;
      if (opts.autoInject) {
        data.data = model.inject(data.data);
      }
      return data;
    } else if (opts.autoInject) {
      data = model.inject(data);
    }
    return data;
  };

  /**
   * js-data's Model class.
   * @class Model
   * @example {@lang javascript}class User extends Model {}
   *
   * @abstract
   * @param {Object} [props] The initial properties of the new instance.
   * @param {Object} [opts] Configuration options.
   * @param {boolean} [opts.noValidate=false] Whether to skip validation on the
   * initial properties.
   */
  function Model(props, opts) {
    classCallCheck(this, Model);
    props || (props = {});
    opts || (opts = {});
    var _props = {};
    Object.defineProperties(this, {
      _get: {
        value: function value(key) {
          return get(_props, key);
        }
      },
      _set: {
        value: function value(key, _value) {
          return _set(_props, key, _value);
        }
      },
      _unset: {
        value: function value(key) {
          return unset(_props, key);
        }
      }
    });
    this._set('creating', true);
    if (opts.noValidate) {
      this._set('noValidate', true);
    }
    fillIn(this, props);
    this._unset('creating');
    this._set('changes', {});
    this._unset('noValidate');
    this._set('previous', copy(props));
  }

  /**
   * Instance members
   */
  addHiddenPropsToTarget(Model.prototype, {
    schema: function schema(key) {
      var _schema = this.constructor.schema;
      return key ? _schema[key] : _schema;
    },
    validate: function validate$$(obj, value) {
      var errors = [];
      var _schema = this.schema();
      if (!obj) {
        obj = this;
      } else if (isString(obj)) {
        var prop = _schema[obj];
        if (prop) {
          errors = validate(prop, value) || [];
        }
      } else {
        forOwn(_schema, function (prop, key) {
          errors = errors.concat(validate(prop, get(obj, key)) || []);
        });
      }
      return errors.length ? errors : undefined;
    },

    /**
     * @param {Object} [opts] Configuration options. @see {@link Model.create}.
     */
    create: function create(opts) {
      return this.constructor.create(this, opts);
    },
    save: function save(opts) {
      // TODO: move actual save logic here
      var Ctor = this.constructor;

      var adapterName = Ctor.getAdapterName(opts);
      return Ctor.getAdapter(adapterName).update(Ctor, get(this, Ctor.idAttribute), this, opts);
    },

    /**
     * @param {Object} [opts] Configuration options. @see {@link Model.destroy}.
     */
    destroy: function destroy(opts) {
      // TODO: move actual destroy logic here
      var Ctor = this.constructor;
      return Ctor.destroy(get(this, Ctor.idAttribute), opts);
    },

    // TODO: move logic for single-item async operations onto the instance.

    /**
     * Return the value at the given path for this instance.
     *
     * @param {string} key - Path of value to retrieve.
     * @return {*} Value at path.
     */
    get: function get$$(key) {
      return get(this, key);
    },

    /**
     * Set the value for a given key, or the values for the given keys if "key" is
     * an object.
     *
     * @param {(string|Object)} key - Key to set or hash of key-value pairs to set.
     * @param {*} [value] - Value to set for the given key.
     * @param {Object} [opts] - Optional configuration.
     * @param {boolean} [opts.silent=false] - Whether to trigger change events.
     */
    set: function set(key, value, opts) {
      if (isObject(key)) {
        opts = value;
      }
      opts || (opts = {});
      if (opts.silent) {
        this._set('silent', true);
      }
      _set(this, key, value);
      if (!this._get('eventId')) {
        this._unset('silent');
      }
    },

    /**
     * Unset the value for a given key.
     *
     * @param {string} key - Key to unset.
     * @param {Object} [opts] - Optional configuration.
     * @param {boolean} [opts.silent=false] - Whether to trigger change events.
     */
    unset: function unset$$(key, opts) {
      opts || (opts = {});
      if (opts.silent) {
        this._set('silent', true);
      }
      unset(this, key);
      if (!this._get('eventId')) {
        this._unset('silent');
      }
    },
    hashCode: function hashCode() {
      return get(this, this.constructor.idAttribute);
    },
    changes: function changes(key) {
      if (key) {
        return this._get('changes.' + key);
      }
      return this._get('changes');
    },
    changed: function changed() {
      return this._get('changed');
    },
    hasChanges: function hasChanges() {
      return !!(this._get('changed') || []).length;
    },
    commit: function commit() {
      this._unset('changed');
      this._set('changes', {});
      this._set('previous', copy(this));
      return this;
    },
    previous: function previous(key) {
      if (key) {
        return this._get('previous.' + key);
      }
      return this._get('previous');
    },
    revert: function revert(opts) {
      var _this2 = this;

      var previous = this._get('previous') || {};
      opts || (opts = {});
      opts.preserve || (opts.preserve = []);
      forOwn(this, function (value, key) {
        if (key !== _this2.constructor.idAttribute && !previous.hasOwnProperty(key) && _this2.hasOwnProperty(key) && opts.preserve.indexOf(key) === -1) {
          delete _this2[key];
        }
      });
      forOwn(previous, function (value, key) {
        if (opts.preserve.indexOf(key) === -1) {
          _this2[key] = value;
        }
      });
      this.commit();
      return this;
    },

    /**
     * Return a plain object representation of this instance.
     *
     * @param {Object} [opts] - Configuration options.
     * @param {string[]} [opts.with] - Array of relation names or relation fields
     * to include in the representation.
     * @return {Object} Plain object representation of instance.
     */
    toJSON: function toJSON(opts) {
      var _this3 = this;

      opts || (opts = {});
      var Ctor = this.constructor;
      var json = this;
      if (this instanceof Model) {
        json = {};
        _set(json, this);
        if (Ctor && Ctor.relationList && opts.with) {
          if (isString(opts.with)) {
            opts.with = [opts.with];
          }
          Ctor.relationList.forEach(function (def) {
            var containedName = undefined;
            if (opts.with.indexOf(def.relation) !== -1) {
              containedName = def.relation;
            } else if (opts.with.indexOf(def.localField) !== -1) {
              containedName = def.localField;
            }
            if (containedName) {
              (function () {
                var optsCopy = { with: opts.with.slice() };
                optsCopy.with.splice(optsCopy.with.indexOf(containedName), 1);
                optsCopy.with.forEach(function (relation, i) {
                  if (relation && relation.indexOf(containedName) === 0 && relation.length >= containedName.length && relation[containedName.length] === '.') {
                    optsCopy.with[i] = relation.substr(containedName.length + 1);
                  } else {
                    optsCopy.with[i] = '';
                  }
                });
                var relationData = get(_this3, def.localField);
                if (relationData) {
                  if (isArray(relationData)) {
                    _set(json, def.localField, relationData.map(function (item) {
                      return def.Relation.prototype.toJSON.call(item, optsCopy);
                    }));
                  } else {
                    _set(json, def.localField, def.Relation.prototype.toJSON.call(relationData, optsCopy));
                  }
                }
              })();
            }
          });
        }
      }
      return json;
    }
  });

  /**
   * Static members
   */
  fillIn(Model, {
    /**
     * Whether {@link Model.destroy} and {@link Model.destroyAll} should
     * automatically eject the specified item(s) from the Model's collection on
     * success.
     *
     * @memberof Model
     * @type {boolean}
     * @default true
     */
    autoEject: true,

    /**
     * Whether {@link Model.create}, {@link Model.createMany},
     * {@link Model.update}, {@link Model.updateAll}, and {@link Model.updateMany}
     * should automatically inject the specified item(s) returned by the adapter
     * into the the Model's collection on success.
     *
     * __Defaults to `true` in the Browser.__
     *
     * __Defaults to `false` in Node.js__
     *
     * @memberof Model
     * @type {boolean}
     */
    autoInject: isBrowser,
    bypassCache: false,

    /**
     * Whether to disallow the use of `new Function` in {@link Model.extend}.
     *
     * You may set this to `true` if you so desire, but the class (constructor
     * function) produced by {@link Model.extend} will not be a named function,
     * which makes for slightly less debuggability.
     *
     * @memberof Model
     * @type {boolean}
     * @default false
     */
    csp: false,

    /**
     * The name of the registered adapter that should be used by default by any
     * of the Model's static methods that use an adapter.
     *
     * @memberof Model
     * @type {string}
     * @default http
     */
    defaultAdapter: 'http',

    /**
     * Whether to enable debug-level logs.
     *
     * @memberof Model
     * @type {boolean}
     * @default false
     */
    debug: false,
    eagerEject: false,

    /**
     * The field on instances of {@link Model} that should be used as the unique
     * identifier for instances of the Model.
     *
     * @memberof Model
     * @type {string}
     * @default id
     */
    idAttribute: 'id',

    /**
     * Whether to add property accessors to the prototype of {@link Model} for
     * each of the Model's relations. For each relation, the property accessor
     * will be added as the field specified by the `localField` option of the
     * relation definition. A relation property accessor returns related data by
     * accessing the related Model. If the related Model's collection is empty,
     * then the property accessors won't return anything.
     *
     * __Defaults to `true` in the Browser.__
     *
     * __Defaults to `false` in Node.js__
     *
     * @memberof Model
     * @type {boolean}
     */
    linkRelations: isBrowser,

    /**
     * What to do when injecting an item into the Model's collection that shares a
     * primary key with an item already in the Model's collection.
     *
     * Possible values:
     * - merge
     * - replace
     *
     * Merge:
     *
     * Recursively shallow copy properties from the new item onto the existing
     * item.
     *
     * Replace:
     *
     * Shallow copy top-level properties from the new item onto the existing item.
     * Any top-level own properties of the existing item that are _not_ on the new
     * item will be removed.
     *
     * @memberof Model
     * @type {string}
     * @default merge
     */
    onConflict: 'merge',

    /**
     * Whether the relation property accessors should be enumerable. It's
     * recommended that this stay false.
     *
     * @memberof Model
     * @type {boolean}
     * @default false
     */
    relationsEnumerable: false,

    /**
     * Whether {@link Model.create}, {@link Model.createMany},
     * {@link Model.update}, {@link Model.updateAll}, {@link Model.updateMany},
     * {@link Model.find}, {@link Model.findAll}, {@link Model.destroy}, and
     * {@link Model.destroyAll} should return a raw result object that contains
     * both the instance data returned by the adapter _and_ metadata about the
     * operation.
     *
     * The default is to NOT return the result object, and instead return just the
     * instance data.
     *
     * @memberof Model
     * @type {boolean}
     * @default false
     */
    raw: false,

    /**
     * Whether {@link Model.create}, {@link Model.createMany},
     * {@link Model.update}, {@link Model.updateAll}, {@link Model.updateMany},
     * {@link Model.find}, {@link Model.findAll}, {@link Model.destroy}, and
     * {@link Model.destroyAll} should return a raw result object that contains
     * both the instance data returned by the adapter _and_ metadata about the
     * operation.
     *
     * The default is to NOT return the result object, and instead return just the
     * instance data.
     *
     * @memberof Model
     * @type {boolean}
     * @default false
     */
    upsert: true,

    /**
     * Create a new secondary index in the Collection instance of this Model.
     *
     * @param {string} name - The name of the new secondary index
     * @param {string[]} keyList - The list of keys to be used to create the index.
     */
    createIndex: function createIndex(name, keyList) {
      this.dbg('createIndex', 'name:', name, 'keyList:', keyList);
      this.collection.createIndex(name, keyList);
    },

    /**
     * Create a new instance of this Model from the provided properties.
     *
     * @param {Object} props - The initial properties of the new instance.
     * @return {Model} The instance.
     */
    createInstance: function createInstance(props) {
      var Ctor = this;
      // Check to make sure "props" is not already an instance of this Model.
      return props instanceof Ctor ? props : new Ctor(props);
    },

    /**
     * Check whether "instance" is actually an instance of this Model.
     *
     * @param {Model} The instance to check.
     * @return {boolean} Whether "instance" is an instance of this Model.
     */
    is: function is(instance) {
      return instance instanceof this;
    },
    getAutoPkItems: function getAutoPkItems() {
      return this.getAll().filter(function (item) {
        return item._get('autoPk');
      });
    },
    changes: function changes(id, key) {
      this.dbg('changes', 'id:', id);
      var instance = this.get(id);
      if (instance) {
        return instance.changes(key);
      }
    },
    changed: function changed(id) {
      this.dbg('changed', 'id:', id);
      var instance = this.get(id);
      if (instance) {
        return instance.changed();
      }
    },
    hasChanges: function hasChanges(id) {
      this.dbg('hasChanges', 'id:', id);
      var instance = this.get(id);
      if (instance) {
        return instance.hasChanges();
      }
    },

    /**
     * Insert the provided item or items into the Collection instance of this
     * Model.
     *
     * If an item is already in the collection then the provided item will either
     * merge with or replace the existing item based on the value of the
     * "onConflict" option.
     *
     * The collection's secondary indexes will be updated as each item is visited.
     *
     * @param {(Object|Object[]|Model|Model[])} items - The item or items to insert.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.onConflict] - What to do when an item is already in
     * the Collection instance. Possible values are `merge` or `replace`.
     * @return {(Model|Model[])} The injected entity or entities.
     */
    inject: function inject(items, opts) {
      var _this = this;
      var op = 'inject';
      _this.dbg(op, 'item(s):', items, 'opts:', opts);
      opts || (opts = {});
      opts.op = op;
      var singular = false;
      var collection = _this.collection;
      var idAttribute = _this.idAttribute;
      var relationList = _this.relationList || [];
      if (!isArray(items)) {
        items = [items];
        singular = true;
      }
      var timestamp = new Date().getTime();
      items = items.map(function (props) {
        var id = get(props, idAttribute);
        var autoPk = false;
        if (!isSorN(id)) {
          if (opts.autoPk || opts.autoPk === undefined && _this.autoPk) {
            id = uuid();
            _set(props, idAttribute, id);
            autoPk = true;
          } else {
            throw new TypeError('User#' + idAttribute + ': Expected string or number, found ' + (typeof id === 'undefined' ? 'undefined' : babelHelpers.typeof(id)) + '!');
          }
        }
        var existing = _this.get(id);
        if (props === existing) {
          return existing;
        }

        relationList.forEach(function (def) {
          var Relation = def.Relation;
          var relationIdAttribute = Relation.idAttribute;
          var foreignKey = def.foreignKey;

          var toInject = get(props, def.localField);

          if (isFunction(def.inject)) {
            def.inject(_this, def, props);
          } else if (toInject && def.inject !== false) {
            if (isArray(toInject)) {
              toInject = toInject.map(function (toInjectItem) {
                if (toInjectItem !== Relation.get(get(toInjectItem, relationIdAttribute))) {
                  try {
                    if (foreignKey) {
                      _set(toInjectItem, foreignKey, id);
                    }
                    toInjectItem = Relation.inject(toInjectItem);
                  } catch (err) {
                    throw new Error('Failed to inject ' + def.type + ' relation: "' + def.relation + '"! ' + err.message);
                  }
                }
                return toInjectItem;
              });
              if (def.localKeys) {
                _set(props, def.localKeys, toInject.map(function (injected) {
                  return get(injected, relationIdAttribute);
                }));
              }
            } else {
              // handle injecting belongsTo and hasOne relations
              if (toInject !== Relation.get(get(toInject, relationIdAttribute))) {
                try {
                  if (def.localKey) {
                    _set(props, def.localKey, get(toInject, Relation.idAttribute));
                  }
                  if (foreignKey) {
                    _set(toInject, def.foreignKey, get(props, idAttribute));
                  }
                  toInject = Relation.inject(toInject);
                } catch (err) {
                  throw new Error('Failed to inject ' + def.type + ' relation: "' + def.relation + '"!');
                }
              }
            }
          }
          // remove relation properties from the item, since those relations have been injected by now
          if (def.link || def.link === undefined && _this.linkRelations) {
            unset(props, def.localField);
          } else {
            _set(props, def.localField, toInject);
          }
        });

        if (existing) {
          var onConflict = opts.onConflict || _this.onConflict;
          if (onConflict === 'merge') {
            deepMixIn(existing, props);
          } else if (onConflict === 'replace') {
            forOwn(existing, function (value, key) {
              if (key !== idAttribute && !props.hasOwnProperty(key)) {
                delete existing[key];
              }
            });
            existing.set(props);
          }
          props = existing;
          collection.update(props);
        } else {
          props = _this.createInstance(props);
          if (autoPk) {
            props._set('autoPk', autoPk);
          }
          collection.insert(props);
        }
        props._set('$', timestamp);
        return props;
      });
      return singular ? items.length ? items[0] : undefined : items;
    },

    /**
     * Remove the instance with the given primary key from the Collection instance
     * of this Model.
     *
     * @param {(string|number)} id - The primary key of the instance to be removed.
     * @return {Model} The removed item, if any.
     */
    eject: function eject(id, opts) {
      var op = 'eject';
      this.dbg(op, 'id:', id, 'opts:', opts);
      opts || (opts = {});
      opts.op = op;
      var item = this.get(id);
      if (item) {
        item._unset('$');
        this.collection.remove(item);
      }
      return item;
    },

    /**
     * Remove the instances selected by "query" from the Collection instance of
     * this Model.
     *
     * @param {Object} [query] - The query used to select instances to remove.
     * @return {Model[]} The removed instances, if any.
     */
    ejectAll: function ejectAll(params, opts) {
      var op = 'ejectAll';
      this.dbg(op, 'params:', params, 'opts:', opts);
      opts || (opts = {});
      opts.op = op;
      var items = this.filter(params);
      var collection = this.collection;
      items.forEach(function (item) {
        collection.remove(item);
      });
      return items;
    },

    /**
     * Return the instance in the Collection instance of this Model that has
     * the given primary key, if such an instance can be found.
     *
     * @param {(string|number)} id - Primary key of the instance to retrieve.
     * @return {Model} The instance or undefined.
     */
    get: function get(id) {
      this.dbg('get', 'id:', id);
      var instances = this.collection.get(id);
      return instances.length ? instances[0] : undefined;
    },

    /**
     * Proxy for Collection#between
     */
    between: function between() {
      var _collection;

      return (_collection = this.collection).between.apply(_collection, arguments);
    },

    /**
     * Proxy for Collection#getAll
     */
    getAll: function getAll() {
      var _collection2;

      return (_collection2 = this.collection).getAll.apply(_collection2, arguments);
    },

    /**
     * Proxy for Collection#filter
     */
    filter: function filter(query, opts) {
      opts || (opts = {});
      return this.collection.filter(query, opts);
    },

    /**
    * Proxy for `Model.collection.query()`.
     * @return {Query}
     */
    query: function query() {
      return this.collection.query();
    },

    /**
     * Return the registered adapter with the given name or the default adapter if
     * no name is provided.
     *
     * @param {string} [name]- The name of the adapter to retrieve.
     * @return {Adapter} The adapter, if any.
     */
    getAdapter: function getAdapter(name) {
      this.dbg('getAdapter', 'name:', name);
      var adapter = this.getAdapterName(name);
      if (!adapter) {
        throw new ReferenceError(adapter + ' not found!');
      }
      return this.adapters[adapter];
    },

    /**
     * Return the name of a registered adapter based on the given name or options,
     * or the name of the default adapter if no name provided
     *
     * @param {Object} [opts] - The options, if any.
     * @return {string} The name of the adapter.
     */
    getAdapterName: function getAdapterName(opts) {
      opts || (opts = {});
      if (isString(opts)) {
        opts = { adapter: opts };
      }
      return opts.adapter || opts.defaultAdapter;
    },

    /**
     * Lifecycle hook. Called by `Model.create` after `Model.create` checks
     * whether it can do an upsert and before `Model.create` calls the `create`
     * method of an adapter.
     *
     * `Model.beforeCreate` will receive the same arguments that are passed to
     * `Model.create`. If `Model.beforeCreate` returns a promise, `Model.create`
     * will wait for the promise to resolve before continuing. If the promise
     * rejects, then the promise returned by `Model.create` will reject. If
     * `Model.beforeCreate` does not return a promise, `Model.create` will resume
     * execution immediately.
     *
     * @param {Object} props - Properties object that was passed to `Model.create`.
     * @param {Object} opts - Options object that was passed to `Model.create`.
     */
    beforeCreate: function beforeCreate() {},

    /**
     * The "C" in "CRUD", `Model.create` creates a single entity using the
     * `create` method of an adapter. If the `props` passed to `Model.create`
     * contain a primary key as configured by `Model.idAttribute` and
     * `opts.upsert` is `true` of `Model.upsert` is `true` and `opts.upsert` is
     * not `false`, then `Model.update` will be called instead.
     *
     * 1. `Model.beforeCreate` is called and passed the same arguments passed to
     * `Model.create`.
     * 1. `props` and `opts` are passed to the `create` method of the adapter
     * specified by `opts.adapter` or `Model.defaultAdapter`.
     * 1. `Model.afterCreate` is called with the `data` argument returned by the
     * adapter's `create` method and the `opts` argument passed to `Model.create`.
     * 1. If `opts.raw` is `true` or `Model.raw` is `true` and `opts.raw` is not
     * `false`, then a result object is returned that contained the created entity
     * and some metadata about the operation and its result. Otherwise, the
     * promise returned by `Model.create` resolves with the created entity.
     *
     * @param {Object} props - The properties from which to create the new entity.
     * @param {Object} [opts] - Configuration options.
     * @param {string} [opts.adapter] - The name of the registered adapter to use.
     * @param {boolean} [opts.raw] - The name of the registered adapter to use.
     * @param {boolean} [opts.upsert] - Whether to call {@link Model.update}
     * instead if `props` has a primary key.
     * @return {Object} The created entity, or if `raw` is `true` then a result
     * object.
     */
    create: function create(props, opts) {
      var _this4 = this;

      var op = 'create';
      this.dbg(op, 'props:', props, 'opts:', opts);
      var adapterName = undefined;

      props || (props = {});
      opts || (opts = {});
      _(this, opts);
      opts.op = op;

      if (opts.upsert && get(props, this.idAttribute) && (!this.is(props) || !props._get('autoPk'))) {
        return this.update(get(props, this.idAttribute), props, opts);
      }
      return resolve(this.beforeCreate(props, opts)).then(function () {
        adapterName = _this4.getAdapterName(opts);
        return _this4.getAdapter(adapterName).create(_this4, _this4.prototype.toJSON.call(props, opts), opts);
      }).then(function (data) {
        return resolve(_this4.afterCreate(data, opts)).then(function () {
          if (_this4.is(props) && props._get('$')) {
            _this4.eject(get(props, _this4.idAttribute));
          }
          return handleResponse(_this4, data, opts, adapterName);
        });
      });
    },

    /**
     * Lifecycle hook. Called by `Model.create` after `Model.create` call the
     * `create` method of an adapter.
     *
     * `Model.afterCreate` will receive the `data` argument returned by the
     * adapter's `create` method and the `opts` argument passed to `Model.create`.
     * If `Model.afterCreate` returns a promise, `Model.create` will wait for the
     * promise to resolve before continuing. If the promise rejects, then the
     * promise returned by `Model.create` will reject. If `Model.afterCreate` does
     * not return a promise, `Model.create` will resume execution immediately.
     *
     * @param {Object} data - Data object returned by the adapter's `create` method.
     * @param {Object} opts - Options object that was passed to `Model.create`.
     */
    afterCreate: function afterCreate() {},
    beforeCreateMany: function beforeCreateMany() {},
    createMany: function createMany(items, opts) {
      var _this5 = this;

      var op = 'createMany';
      this.dbg(op, 'items:', items, 'opts:', opts);
      var adapterName = undefined;

      items || (items = []);
      opts || (opts = {});
      _(this, opts);
      opts.op = op;

      if (opts.upsert) {
        var _ret2 = (function () {
          var hasId = true;
          items.forEach(function (item) {
            hasId = hasId && get(item, _this5.idAttribute) && (!isFunction(item._get) || !item._get('autoPk'));
          });
          if (hasId) {
            return {
              v: _this5.updateMany(items, opts)
            };
          }
        })();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret2)) === "object") return _ret2.v;
      }

      return resolve(this.beforeCreateMany(items, opts)).then(function () {
        adapterName = _this5.getAdapterName(opts);
        return _this5.getAdapter(adapterName).createMany(_this5, items.map(function (item) {
          return _this5.prototype.toJSON.call(item, opts);
        }), opts);
      }).then(function (data) {
        return resolve(_this5.afterCreateMany(data, opts)).then(function () {
          items.forEach(function (item) {
            if (_this5.is(item) && item._get('$')) {
              _this5.eject(get(item, _this5.idAttribute));
            }
          });
          return handleResponse(_this5, data, opts, adapterName);
        });
      });
    },
    afterCreateMany: function afterCreateMany() {},
    beforeFind: function beforeFind() {},
    find: function find(id, opts) {
      var _this6 = this;

      var op = 'find';
      this.dbg(op, 'id:', id, 'opts:', opts);
      var adapterName = undefined;

      opts || (opts = {});
      _(this, opts);
      opts.op = op;

      return resolve(this.beforeFind(id, opts)).then(function () {
        adapterName = _this6.getAdapterName(opts);
        return _this6.getAdapter(adapterName).find(_this6, id, opts);
      }).then(function (data) {
        return resolve(_this6.afterFind(data, opts)).then(function () {
          return handleResponse(_this6, data, opts, adapterName);
        });
      });
    },
    afterFind: function afterFind() {},
    beforeFindAll: function beforeFindAll() {},
    findAll: function findAll(query, opts) {
      var _this7 = this;

      var op = 'findAll';
      this.dbg(op, 'query:', query, 'opts:', opts);
      var adapterName = undefined;

      query || (query = {});
      opts || (opts = {});
      _(this, opts);
      opts.op = op;

      return resolve(this.beforeFindAll(query, opts)).then(function () {
        adapterName = _this7.getAdapterName(opts);
        return _this7.getAdapter(adapterName).findAll(_this7, query, opts);
      }).then(function (data) {
        return resolve(_this7.afterFindAll(data, opts)).then(function () {
          return handleResponse(_this7, data, opts, adapterName);
        });
      });
    },
    afterFindAll: function afterFindAll() {},
    beforeUpdate: function beforeUpdate() {},
    update: function update(id, props, opts) {
      var _this8 = this;

      var op = 'update';
      this.dbg(op, 'id:', id, 'props:', props, 'opts:', opts);
      var adapterName = undefined;

      props || (props = {});
      opts || (opts = {});
      _(this, opts);
      opts.op = op;

      return resolve(this.beforeUpdate(id, props, opts)).then(function () {
        adapterName = _this8.getAdapterName(opts);
        return _this8.getAdapter(adapterName).update(_this8, id, _this8.prototype.toJSON.call(props, opts), opts);
      }).then(function (data) {
        return resolve(_this8.afterUpdate(id, data, opts)).then(function () {
          return handleResponse(_this8, data, opts, adapterName);
        });
      });
    },
    afterUpdate: function afterUpdate() {},
    beforeUpdateMany: function beforeUpdateMany() {},
    updateMany: function updateMany(items, opts) {
      var _this9 = this;

      var op = 'updateMany';
      this.dbg(op, 'items:', items, 'opts:', opts);
      var adapterName = undefined;

      items || (items = []);
      opts || (opts = {});
      _(this, opts);
      opts.op = op;

      return resolve(this.beforeUpdateMany(items, opts)).then(function () {
        adapterName = _this9.getAdapterName(opts);
        return _this9.getAdapter(adapterName).updateMany(_this9, items.map(function (item) {
          return _this9.prototype.toJSON.call(item, opts);
        }), opts);
      }).then(function (data) {
        return resolve(_this9.afterUpdateMany(data, opts)).then(function () {
          return handleResponse(_this9, data, opts, adapterName);
        });
      });
    },
    afterUpdateMany: function afterUpdateMany() {},
    beforeUpdateAll: function beforeUpdateAll() {},

    /**
     * @param {Object} query={} - Selection query.
     * @param {Object} props - Update to apply to selected entities.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.raw=false] TODO
     */
    updateAll: function updateAll(query, props, opts) {
      var _this10 = this;

      var op = 'updateAll';
      this.dbg(op, 'query:', query, 'props:', props, 'opts:', opts);
      var adapterName = undefined;

      query || (query = {});
      props || (props = {});
      opts || (opts = {});
      _(this, opts);
      opts.op = op;

      return resolve(this.beforeUpdateAll(query, props, opts)).then(function () {
        adapterName = _this10.getAdapterName(opts);
        return _this10.getAdapter(adapterName).updateAll(_this10, query, props, opts);
      }).then(function (data) {
        return resolve(_this10.afterUpdateAll(query, data, opts)).then(function () {
          return handleResponse(_this10, data, opts, adapterName);
        });
      });
    },
    afterUpdateAll: function afterUpdateAll() {},
    beforeDestroy: function beforeDestroy() {},

    /**
     * @param {(string|number)} id
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.raw=false] TODO
     */
    destroy: function destroy(id, opts) {
      var _this11 = this;

      var op = 'destroy';
      this.dbg(op, 'id:', id, 'opts:', opts);
      var adapterName = undefined;

      opts || (opts = {});
      _(this, opts);
      opts.op = op;

      return resolve(this.beforeDestroy(id, opts)).then(function () {
        adapterName = _this11.getAdapterName(opts);
        return _this11.getAdapter(adapterName).destroy(_this11, id, opts);
      }).then(function (data) {
        return resolve(_this11.afterDestroy(id, opts)).then(function () {
          if (opts.raw) {
            data.adapter = adapterName;
            if (opts.autoEject) {
              data.data = _this11.eject(id, opts);
            }
            return data;
          } else if (opts.autoEject) {
            data = _this11.eject(id, opts);
          }
          return data;
        });
      });
    },
    afterDestroy: function afterDestroy() {},
    beforeDestroyAll: function beforeDestroyAll() {},
    destroyAll: function destroyAll(query, opts) {
      var _this12 = this;

      var op = 'destroyAll';
      this.dbg(op, 'query:', query, 'opts:', opts);
      var adapterName = undefined;

      query || (query = {});
      opts || (opts = {});
      _(this, opts);
      opts.op = op;

      return resolve(this.beforeDestroyAll(query, opts)).then(function () {
        adapterName = _this12.getAdapterName(opts);
        return _this12.getAdapter(adapterName).destroyAll(_this12, query, opts);
      }).then(function (data) {
        return resolve(_this12.afterDestroyAll(query, opts)).then(function () {
          if (opts.raw) {
            data.adapter = adapterName;
            if (opts.autoEject) {
              data.data = _this12.ejectAll(query, opts);
            }
            return data;
          } else if (opts.autoEject) {
            data = _this12.ejectAll(query, opts);
          }
          return data;
        });
      });
    },
    afterDestroyAll: function afterDestroyAll() {},
    beforeLoadRelations: function beforeLoadRelations() {},
    loadRelations: function loadRelations(id, relations, opts) {
      var _this13 = this;

      var _this = this;
      var instance = _this.is(id) ? id : undefined;
      id = instance ? get(instance, _this.idAttribute) : id;
      var op = 'loadRelations';
      _this.dbg(op, 'id:', id, 'relations:', relations, 'opts:', opts);
      relations || (relations = []);
      opts || (opts = {});
      var relationList = _this.relationList || [];
      _(_this, opts);
      opts.op = op;
      return resolve(_this.beforeLoadRelations(id, relations, opts)).then(function () {
        if (isSorN(id) && !instance) {
          instance = _this.get(instance);
        }
        if (!instance) {
          throw new Error('You passed an id of an instance not found in the collection of the Model!');
        }
        if (isString(relations)) {
          relations = [relations];
        }
        return Promise.all(relationList.map(function (def) {
          if (isFunction(def.load)) {
            return def.load(_this, def, instance, opts);
          }
          var task = undefined;
          if (def.foreignKey) {
            task = def.Relation.findAll(babelHelpers.defineProperty({}, def.foreignKey, id), opts);
          } else if (def.localKey) {
            var key = get(instance, def.localKey);
            if (isSorN(key)) {
              task = def.Relation.find(key, opts);
            }
          } else if (def.localKeys) {
            task = def.Relation.findAll(babelHelpers.defineProperty({}, def.Relation.idAttribute, {
              'in': get(instance, def.localKeys)
            }), opts);
          } else if (def.foreignKeys) {
            task = def.Relation.findAll(babelHelpers.defineProperty({}, def.Relation.idAttribute, {
              'contains': get(instance, _this.idAttribute)
            }), opts);
          }
          if (task) {
            task = task.then(function (data) {
              if (opts.raw) {
                data = data.data;
              }
              _set(instance, def.localField, def.type === 'hasOne' ? data.length ? data[0] : undefined : data);
            });
          }
          return task;
        }));
      }).then(function () {
        return resolve(_this13.afterLoadRelations(instance, relations, opts)).then(function () {
          return instance;
        });
      });
    },
    afterLoadRelations: function afterLoadRelations() {},
    log: function log(level) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (level && !args.length) {
        args.push(level);
        level = 'debug';
      }
      if (level === 'debug' && !this.debug) {
        return;
      }
      var prefix = level.toUpperCase() + ': (' + this.name + ')';
      if (console[level]) {
        var _console;

        (_console = console)[level].apply(_console, [prefix].concat(args));
      } else {
        var _console2;

        (_console2 = console).log.apply(_console2, [prefix].concat(args));
      }
    },
    dbg: function dbg() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.log.apply(this, ['debug'].concat(args));
    },

    /**
     * Usage:
     *
     * Post.belongsTo(User, {
     *   localKey: 'myUserId'
     * })
     *
     * Comment.belongsTo(User)
     * Comment.belongsTo(Post, {
     *   localField: '_post'
     * })
     */
    belongsTo: function belongsTo$$(model, opts) {
      return belongsTo(model, opts)(this);
    },

    /**
     * Usage:
     *
     * User.hasMany(Post, {
     *   localField: 'my_posts'
     * })
     */
    hasMany: function hasMany$$(model, opts) {
      return hasMany(model, opts)(this);
    },

    /**
     * Usage:
     *
     * User.hasOne(Profile, {
     *   localField: '_profile'
     * })
     */
    hasOne: function hasOne$$(model, opts) {
      return hasOne(model, opts)(this);
    },

    /**
     * Invoke the {@link module:js-data.exports.setSchema setSchema} decorator on
     * this Model.
     * @param {Object} opts - Property configurations.
     * @return {Model} A reference to the Model for chaining.
     */
    setSchema: function setSchema$$(opts) {
      return setSchema(opts)(this);
    },

    /**
     * Invoke the {@link module:js-data.exports.configure configure} decorator on
     * this Model.
     * @param {Object} opts - Configuration
     * @return {Model} A reference to the Model for chaining.
     */
    configure: function configure$$(opts) {
      return configure(opts)(this);
    },

    /**
     * Invoke the {@link module:js-data.exports.registerAdapter registerAdapter}
     * decorator on this Model.
     * @param {string} name - The name of the adapter to register.
     * @param {Adapter} adapter - The adapter to register.
     * @param {Object} [opts] - Configuration options.
     * @param {boolean} [opts.default=false] - Whether to make the adapter the
     * default for this Model.
     * @return {Model} A reference to the Model for chaining.
     */
    registerAdapter: function registerAdapter$$(name, adapter, opts) {
      return registerAdapter(name, adapter, opts)(this);
    },

    /**
     * Extend this Model and return a new child Model. Static properties on this
     * Model will be shallow copied to the child Model. The child Model's
     * prototype will point to the parent Model.
     *
     * @example
     * var User = JSData.Model.extend({}, { name: 'User' })
     * @param {Object} props={} - Properties to add to the prototype of the class.
     * @param {Function} [props.initialize] - Optional function to invoke during
     * construction of instances of the class. Will receive any arguments passed
     * to the constructor. "this" will refer to the instance being constructed.
     * @param {Object} classProps - Static properties to add to the class.
     * @param {string} classProps.name - Name of the class. Required.
     * @param {string} [classProps.idAttribute='id'] - Field to use as the unique
     * identifier for instances of the class.
     * @param {Object} [classProps.schema] - Value to pass to the {@link Model.setSchema setSchema}
     * method of the class after the class is created.
     */
    extend: function extend(props, classProps) {
      var Parent = this;
      var Child = undefined;

      Parent.dbg('extend', 'props:', props, 'classProps:', classProps);

      props || (props = {});
      classProps || (classProps = {});

      var initialize = props.initialize;
      delete props.initialize;

      if (props.hasOwnProperty('constructor')) {
        Child = props.constructor;
        delete props.constructor;
      } else {
        if (!classProps.name) {
          throw new TypeError('name: Expected string, found ' + babelHelpers.typeof(classProps.name) + '!');
        }
        if (classProps.csp) {
          Child = function () {
            classCallCheck(this, Child);

            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            var _this = possibleConstructorReturn(this, (Child.__super__ || Object.getPrototypeOf(Child)).apply(this, args));
            if (initialize) {
              initialize.apply(_this, args);
            }
            return _this;
          };
        } else {
          var name = pascalCase(classProps.name);
          var func = 'return function ' + name + '() {\n                        classCallCheck(this, ' + name + ')\n                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n                          args[_key] = arguments[_key];\n                        }\n                        var _this = possibleConstructorReturn(this, (' + name + '.__super__ || Object.getPrototypeOf(' + name + ')).apply(this, args));\n                        if (initialize) {\n                          initialize.apply(_this, arguments)\n                        }\n                        return _this\n                      }';
          Child = new Function('classCallCheck', 'possibleConstructorReturn', 'Parent', 'initialize', func)(classCallCheck, possibleConstructorReturn, Parent, initialize); // eslint-disable-line
        }
      }

      classProps.shortname = classProps.shortname || camelCase(Child.name || classProps.name);
      delete classProps.name;

      var _schema = classProps.schema;
      delete classProps.schema;

      Child.prototype = Object.create(Parent && Parent.prototype, {
        constructor: {
          value: Child,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });

      if (Parent && classProps.strictEs6Class) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(Child, Parent);
        } else {
          Child.__proto__ = Parent; // eslint-disable-line
        }
      } else {
          var keys = Object.getOwnPropertyNames(Parent);
          keys.forEach(function (key) {
            if (keysToSkip[key]) {
              return;
            }
            Object.defineProperty(Child, key, Object.getOwnPropertyDescriptor(Parent, key));
          });
        }
      Object.defineProperty(Child, '__super__', {
        configurable: true,
        value: Parent
      });

      configure(props)(Child.prototype);
      configure(classProps)(Child);
      if (_schema) {
        setSchema(_schema)(Child);
      }

      return Child;
    }
  });

  Object.defineProperties(Model, {
    /**
     * @ignore
     */
    __events: {
      configurable: true,
      value: {}
    },

    /**
     * Create a property where a Model's registered listeners can be stored.
     * @ignore
     */
    _events: {
      get: function get() {
        // Make sure that a Model always has _its own_ set of registered listeners.
        // This check has to be made because ES6 class inheritance shallow copies
        // static properties, which means a child model would only have a reference
        // to the parent model's listeners.
        if (this.__events === (this.__super__ ? this.__super__ : Object.getPrototypeOf(this)).__events) {
          Object.defineProperty(this, '__events', {
            value: {}
          });
        }
        return this.__events;
      }
    },

    /**
     * @ignore
     */
    _adapters: {
      configurable: true,
      value: {}
    },

    /**
     * Hash of adapters registered with this Model.
     *
     * @name adapters
     * @memberof Model
     * @type {Object}
     */
    adapters: {
      get: function get() {
        var parentAdapters = (this.__super__ ? this.__super__ : Object.getPrototypeOf(this))._adapters;
        // Make sure that a Model always has _its own_ set of registered adapters.
        // This check has to be made because ES6 class inheritance shallow copies
        // static properties, which means a child model would only have a reference
        // to the parent model's adapters.
        if (this._adapters === parentAdapters) {
          Object.defineProperty(this, '_adapters', {
            value: {}
          });
          fillIn(this._adapters, parentAdapters);
        }
        return this._adapters;
      }
    },

    /**
     * @ignore
     */
    _collection: {
      configurable: true,
      value: new Collection([], 'id')
    },

    /**
     * This Model's {@link Collection} instance. This is where instances of the
     * Model are stored if {@link Model.autoInject} is `true`.
     *
     * __You should use {@link Model.inject}, {@link Model.eject}, and
     * {@link Model.ejectAll} if you need to manually get data in and out of this
     * collection.__
     *
     * @name collection
     * @memberof Model
     * @type {Collection}
     */
    collection: {
      get: function get() {
        // Make sure that a Model always has _its own_ collection. This check has to
        // be made because ES6 class inheritance shallow copies static properties,
        // which means a child Model would only have a reference to the parent
        // Model's collection.
        if (this._collection === (this.__super__ ? this.__super__ : Object.getPrototypeOf(this))._collection) {
          Object.defineProperty(this, '_collection', {
            value: new Collection([], this.idAttribute)
          });
          this._collection.on('all', this.emit, this);
          this._collection.createIndex('lastInjected', ['$'], {
            fieldGetter: function fieldGetter(obj) {
              return obj._get('$');
            }
          });
        }
        return this._collection;
      }
    }
  });

  /**
   * Allow Models themselves emit events. Any events emitted on a Model's
   * collection will also be emitted on the Model itself.
   *
   * A Model's registered listeners are stored on the Model's `__events` property.
   */
  eventify(Model, function () {
    return this._events;
  }, function (value) {
    this._events = value;
  });

  /**
   * Allow instancess to emit events. Any events emitted instances in a Model's
   * collection will also be emitted on the collection itself, and hence, on the
   * Model as well.
   *
   * An instance's registered listeners are stored in the instance's private data
   * hash.
   */
  eventify(Model.prototype, function () {
    return this._get('events');
  }, function (value) {
    this._set('events', value);
  });

  // function lifecycleNoopCb (resource, attrs, cb) {
  //   cb(null, attrs)
  // }

  // function lifecycleNoop (resource, attrs) {
  //   return attrs
  // }

  // class Defaults {
  //   errorFn (a, b) {
  //     if (this.error && typeof this.error === 'function') {
  //       try {
  //         if (typeof a === 'string') {
  //           throw new Error(a)
  //         } else {
  //           throw a
  //         }
  //       } catch (err) {
  //         a = err
  //       }
  //       this.error(this.name || null, a || null, b || null)
  //     }
  //   }
  // }

  // var defaultsPrototype = Defaults.prototype

  // defaultsPrototype.actions = {}
  // defaultsPrototype.afterCreate = lifecycleNoopCb
  // defaultsPrototype.afterCreateCollection = lifecycleNoop
  // defaultsPrototype.afterCreateInstance = lifecycleNoop
  // defaultsPrototype.afterDestroy = lifecycleNoopCb
  // defaultsPrototype.afterEject = lifecycleNoop
  // defaultsPrototype.afterFind = lifecycleNoopCb
  // defaultsPrototype.afterFindAll = lifecycleNoopCb
  // defaultsPrototype.afterInject = lifecycleNoop
  // defaultsPrototype.afterLoadRelations = lifecycleNoopCb
  // defaultsPrototype.afterReap = lifecycleNoop
  // defaultsPrototype.afterUpdate = lifecycleNoopCb
  // defaultsPrototype.afterValidate = lifecycleNoopCb
  // defaultsPrototype.allowSimpleWhere = true
  // defaultsPrototype.basePath = ''
  // defaultsPrototype.beforeCreate = lifecycleNoopCb
  // defaultsPrototype.beforeCreateCollection = lifecycleNoop
  // defaultsPrototype.beforeCreateInstance = lifecycleNoop
  // defaultsPrototype.beforeDestroy = lifecycleNoopCb
  // defaultsPrototype.beforeEject = lifecycleNoop
  // defaultsPrototype.beforeInject = lifecycleNoop
  // defaultsPrototype.beforeReap = lifecycleNoop
  // defaultsPrototype.beforeUpdate = lifecycleNoopCb
  // defaultsPrototype.beforeValidate = lifecycleNoopCb
  // defaultsPrototype.bypassCache = false
  // defaultsPrototype.cacheResponse = !!DSUtils.w
  // defaultsPrototype.csp = false
  // defaultsPrototype.clearEmptyQueries = true
  // defaultsPrototype.computed = {}
  // defaultsPrototype.defaultAdapter = 'http'
  // defaultsPrototype.debug = false
  // defaultsPrototype.defaultValues = {}
  // defaultsPrototype.eagerEject = false
  // // TODO: Implement eagerInject in DS#create
  // defaultsPrototype.eagerInject = false
  // defaultsPrototype.endpoint = ''
  // defaultsPrototype.error = console ? (a, b, c) => console[typeof console.error === 'function' ? 'error' : 'log'](a, b, c) : false
  // defaultsPrototype.errorHandler = function (...args) {
  //   return DSUtils.Promise.reject(args[0])
  // }
  // defaultsPrototype.fallbackAdapters = ['http']
  // defaultsPrototype.findStrictCache = false
  // defaultsPrototype.idAttribute = 'id'
  // defaultsPrototype.ignoredChanges = [/\$/]
  // defaultsPrototype.instanceEvents = !!DSUtils.w
  // defaultsPrototype.keepChangeHistory = false
  // defaultsPrototype.linkRelations = !!DSUtils.w
  // defaultsPrototype.log = console ? (a, b, c, d, e) => console[typeof console.info === 'function' ? 'info' : 'log'](a, b, c, d, e) : false

  // defaultsPrototype.logFn = function (a, b, c, d) {
  //   let _this = this
  //   if (_this.debug && _this.log && typeof _this.log === 'function') {
  //     _this.log(_this.name || null, a || null, b || null, c || null, d || null)
  //   }
  // }

  // defaultsPrototype.maxAge = false
  // defaultsPrototype.methods = {}
  // defaultsPrototype.notify = !!DSUtils.w
  // defaultsPrototype.omit = []
  // defaultsPrototype.onConflict = 'merge'
  // defaultsPrototype.reapAction = DSUtils.w ? 'inject' : 'none'
  // defaultsPrototype.reapInterval = DSUtils.w ? 30000 : false
  // defaultsPrototype.relationsEnumerable = false
  // defaultsPrototype.resetHistoryOnInject = true
  // defaultsPrototype.returnMeta = false
  // defaultsPrototype.scopes = {}
  // defaultsPrototype.strategy = 'single'
  // defaultsPrototype.upsert = !!DSUtils.w
  // defaultsPrototype.useClass = true
  // defaultsPrototype.useFilter = false
  // defaultsPrototype.validate = lifecycleNoopCb
  // defaultsPrototype.watchChanges = !!DSUtils.w

  // class _DS {
  //   constructor (options) {
  //     let _this = this
  //     options = options || {}

  //     _this.store = {}
  //     _this.definitions = {}
  //     _this.adapters = {}
  //     _this.defaults = new Defaults()
  //     _this.observe = DSUtils.observe
  //     DSUtils.forOwn(options, function (v, k) {
  //       if (k === 'omit') {
  //         _this.defaults.omit = v.concat(Defaults.prototype.omit)
  //       } else {
  //         _this.defaults[k] = v
  //       }
  //     })

  //     DSUtils.Events(_this)
  //   }

  //   getAdapterName (options) {
  //     let errorIfNotExist = false
  //     options = options || {}
  //     if (DSUtils._s(options)) {
  //       errorIfNotExist = true
  //       options = {
  //         adapter: options
  //       }
  //     }
  //     if (this.adapters[options.adapter]) {
  //       return options.adapter
  //     } else if (errorIfNotExist) {
  //       throw new Error(`${options.adapter} is not a registered adapter!`)
  //     } else {
  //       return options.defaultAdapter
  //     }
  //   }

  //   getAdapter (options) {
  //     options = options || {}
  //     return this.adapters[this.getAdapterName(options)]
  //   }

  //   registerAdapter (name, Adapter, options) {
  //     let _this = this
  //     options = options || {}
  //     if (DSUtils.isFunction(Adapter)) {
  //       _this.adapters[name] = new Adapter(options)
  //     } else {
  //       _this.adapters[name] = Adapter
  //     }
  //     if (options.default) {
  //       _this.defaults.defaultAdapter = name
  //     }
  //   }

  //   errorFn (...args) {
  //     let options = args[args.length - 1]
  //     let defaultHandler = this.defaults.errorHandler
  //     let errorHandler = options ? options.errorHandler : defaultHandler
  //     errorHandler = errorHandler || defaultHandler
  //     return function (err) {
  //       return errorHandler(err, ...args)
  //     }
  //   }
  // }

  // var dsPrototype = _DS.prototype

  // dsPrototype.getAdapterName.shorthand = false
  // dsPrototype.getAdapter.shorthand = false
  // dsPrototype.registerAdapter.shorthand = false
  // dsPrototype.errors = DSErrors
  // dsPrototype.utils = DSUtils

  function DS(opts) {
    classCallCheck(this, DS);
    opts || (opts = {});
    this.definitions = {};
  }

  addHiddenPropsToTarget(DS.prototype, {
    clear: function clear() {
      var ejected = {};
      forOwn(this.definitions, function (definition) {
        var name = definition.name;
        ejected[name] = definition.ejectAll();
      });
      return ejected;
    },
    defineModel: function defineModel(opts) {
      var Child = Model.extend(opts.methods || {}, opts);
      this.definitions[Child.name] = Child;
      return Child;
    }
  });

  DS.prototype.defineResource = DS.prototype.defineModel;

  forOwn(Model, function (value, key) {
    if (isFunction(value)) {
      DS.prototype[key] = function (name) {
        var _definitions$name;

        if (!this.definitions[name]) {
          throw new Error(name + ' is not a registered Model!');
        }

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return (_definitions$name = this.definitions[name])[key].apply(_definitions$name, args);
      };
    }
  });

  /**
   * Registered as `js-data` in NPM and Bower.
   * #### Script tag
   * ```js
   * window.JSData
   * ```
   * #### CommonJS
   * ```js
   * var JSData = require('js-data')
   * ```
   * #### ES6 Modules
   * ```js
   * import JSData from 'js-data'
   * ```
   * #### AMD
   * ```js
   * define('myApp', ['js-data'], function (JSData) { ... })
   * ```
   *
   * @module js-data
   * @property {Function} belongsTo - {@link module:js-data.exports.belongsTo belongsTo}
   * decorator function.
   * @property {Function} configure - {@link module:js-data.exports.configure configure}
   * decorator function.
   * @property {Function} Collection - {@link Collection} class.
   * @property {Function} DS - {@link DS} class.
   * @property {Function} hasMany - {@link module:js-data.exports.hasMany hasMany}
   * decorator function.
   * @property {Function} hasOne - {@link module:js-data.exports.hasOne hasOne}
   * decorator function.
   * @property {Function} initialize - {@link module:js-data.exports.initialize initialize}
   * decorator function.
   * @property {Function} Model - {@link Model} class.
   * @property {Function} registerAdapter - {@link registerAdapter} decorator
   * function.
   * @property {Function} setSchema - {@link setSchema} decorator function.
   * @property {Function} Query - {@link Query} class.
   * @property {Object} utils - Utility methods used by the `js-data` module. See
   * {@link module:js-data.module:utils utils}.
   * @property {Object} version - Details of the current version of the `js-data`
   * module.
   * @property {string} version.full - The full semver value.
   * @property {number} version.major - The major version number.
   * @property {number} version.minor - The minor version number.
   * @property {number} version.patch - The patch version number.
   * @property {(string|boolean)} version.alpha - The alpha version value,
   * otherwise `false` if the current version is not alpha.
   * @property {(string|boolean)} version.beta - The beta version value,
   * otherwise `false` if the current version is not beta.
   */

  if (!Promise.prototype.spread) {
    Promise.prototype.spread = function (cb) {
      return this.then(function (arr) {
        return cb.apply(this, arr);
      });
    };
  }

  var utils = _utils;

  var version = {
    full: '3.0.0-alpha.3',
    major: parseInt('3', 10),
    minor: parseInt('0', 10),
    patch: parseInt('0', 10),
    alpha: '3' !== 'false' ? '3' : false,
    beta: 'false' !== 'false' ? 'false' : false
  };

  exports.utils = utils;
  exports.version = version;
  exports.Collection = Collection;
  exports.Query = Query;
  exports.DS = DS;
  exports.belongsTo = belongsTo;
  exports.configure = configure;
  exports.hasMany = hasMany;
  exports.hasOne = hasOne;
  exports.setSchema = setSchema;
  exports.registerAdapter = registerAdapter;
  exports.Model = Model;
  exports.rules = rules;
  exports.validate = validate;

}));
//# sourceMappingURL=js-data-debug.js.map
