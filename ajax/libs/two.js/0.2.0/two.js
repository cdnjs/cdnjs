/**
 * two.js
 * a two-dimensional drawing api meant for modern browsers. It is renderer 
 * agnostic enabling the same api for rendering in multiple contexts: webgl, 
 * canvas2d, and svg.
 *
 * Copyright (c) 2012 - 2013 jonobr1 / http://jonobr1.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */


//     Underscore.js 1.3.3
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.3';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      rand = Math.floor(Math.random() * (index + 1));
      shuffled[index] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, val, context) {
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      if (a === void 0) return 1;
      if (b === void 0) return -1;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj)                                     return [];
    if (_.isArray(obj))                           return slice.call(obj);
    if (_.isArguments(obj))                       return slice.call(obj);
    if (obj.toArray && _.isFunction(obj.toArray)) return obj.toArray();
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.isArray(obj) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var results = [];
    // The `isSorted` flag is irrelevant if the array only contains two elements.
    if (array.length < 3) isSorted = true;
    _.reduce(initial, function (memo, value, index) {
      if (isSorted ? _.last(memo) !== value || !memo.length : !_.include(memo, value)) {
        memo.push(value);
        results.push(array[index]);
      }
      return memo;
    }, []);
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1), true);
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more, result;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        result = func.apply(context, args);
      }
      whenDone();
      throttling = true;
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      if (immediate && !timeout) func.apply(context, args);
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var result = {};
    each(_.flatten(slice.call(arguments, 1)), function(key) {
      if (key in obj) result[key] = obj[key];
    });
    return result;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return _.isNumber(obj) && isFinite(obj);
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    '\\': '\\',
    "'": "'",
    'r': '\r',
    'n': '\n',
    't': '\t',
    'u2028': '\u2028',
    'u2029': '\u2029'
  };

  for (var p in escapes) escapes[escapes[p]] = p;
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(unescaper, function(match, escape) {
      return escapes[escape];
    });
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    settings = _.defaults(settings || {}, _.templateSettings);

    // Compile the template source, taking care to escape characters that
    // cannot be included in a string literal and then unescape them in code
    // blocks.
    var source = "__p+='" + text
      .replace(escaper, function(match) {
        return '\\' + escapes[match];
      })
      .replace(settings.escape || noMatch, function(match, code) {
        return "'+\n_.escape(" + unescape(code) + ")+\n'";
      })
      .replace(settings.interpolate || noMatch, function(match, code) {
        return "'+\n(" + unescape(code) + ")+\n'";
      })
      .replace(settings.evaluate || noMatch, function(match, code) {
        return "';\n" + unescape(code) + "\n;__p+='";
      }) + "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __p='';" +
      "var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" +
      source + "return __p;\n";

    var render = new Function(settings.variable || 'obj', '_', source);
    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for build time
    // precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' +
      source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);
var Backbone = Backbone || {};

(function() {

  var array = [];
  var slice = array.slice;

  // Backbone.Events
  // ---------------

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
    } else if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
    } else {
      return true;
    }
  };

  // Optimized internal dispatch function for triggering events. Tries to
  // keep the usual cases speedy (most Backbone events have 3 arguments).
  var triggerEvents = function(obj, events, args) {
    var ev, i = -1, l = events.length;
    switch (args.length) {
    case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx);
    return;
    case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0]);
    return;
    case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
    return;
    case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
    return;
    default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var Events = Backbone.Events = {

    // Bind one or more space separated events, or an events map,
    // to a `callback` function. Passing `"all"` will bind the callback to
    // all events fired.
    on: function(name, callback, context) {
      if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
      this._events || (this._events = {});
      var list = this._events[name] || (this._events[name] = []);
      list.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind events to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      this.on(name, once, context);
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `events` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var list, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (list = this._events[name]) {
          events = [];
          if (callback || context) {
            for (j = 0, k = list.length; j < k; j++) {
              ev = list[j];
              if ((callback && callback !== (ev.callback._callback || ev.callback)) ||
                  (context && context !== ev.context)) {
                events.push(ev);
              }
            }
          }
          this._events[name] = events;
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(this, events, args);
      if (allEvents) triggerEvents(this, allEvents, arguments);
      return this;
    },

    // An inversion-of-control version of `on`. Tell *this* object to listen to
    // an event in another object ... keeping track of what it's listening to.
    listenTo: function(object, events, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = object._listenerId || (object._listenerId = _.uniqueId('l'));
      listeners[id] = object;
      object.on(events, callback || this, this);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(object, events, callback) {
      var listeners = this._listeners;
      if (!listeners) return;
      if (object) {
        object.off(events, callback, this);
        if (!events && !callback) delete listeners[object._listenerId];
      } else {
        for (var id in listeners) {
          listeners[id].off(null, null, this);
        }
        this._listeners = {};
      }
      return this;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

})();
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = 
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());
(function() {

  var root = this;
  var previousTwo = root.Two || {};

  /**
   * Constants
   */

  var sin = Math.sin,
    cos = Math.cos,
    atan2 = Math.atan2,
    sqrt = Math.sqrt,
    round = Math.round,
    abs = Math.abs,
    PI = Math.PI,
    TWO_PI = PI * 2,
    HALF_PI = PI / 2,
    pow = Math.pow;

  /**
   * Cross browser dom events.
   */
  var dom = {

    hasEventListeners: _.isFunction(root.addEventListener),

    bind: function(elem, event, func, bool) {
      if (this.hasEventListeners) {
        elem.addEventListener(event, func, !!bool);
      } else {
        elem.attachEvent('on' + event, func);
      }
      return this;
    },

    unbind: function(elem, event, func, bool) {
      if (this.hasEventListeners) {
        elem.removeEventListeners(event, func, !!bool);
      } else {
        elem.detachEvent('on' + event, func);
      }
      return this;
    }

  };

  /**
   * @class
   */
  var Two = root.Two = function(options) {

    // Determine what Renderer to use and setup a scene.

    var params = _.defaults(options || {}, {
      fullscreen: false,
      width: 640,
      height: 480,
      type: Two.Types.svg,
      autostart: false
    });

    this.type = params.type;
    this.renderer = new Two[this.type](this);
    Two.Utils.setPlaying.call(this, params.autostart);
    this.frameCount = 0;

    if (params.fullscreen) {

      var fitted = _.bind(fitToWindow, this);
      _.extend(document.body.style, {
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed'
      });
      _.extend(this.renderer.domElement.style, {
        display: 'block',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed'
      });
      dom.bind(window, 'resize', fitted);
      fitted();


    } else {

      this.renderer.setSize(params.width, params.height);
      this.width = params.width;
      this.height = params.height;

    }

    this.scene = new Two.Group();
    this.renderer.add(this.scene);

    Two.Instances.push(this);

  };

  _.extend(Two, {

    /**
     * Primitive
     */

    Array: root.Float32Array || Array,

    Types: {
      webgl: 'WebGLRenderer',
      svg: 'SVGRenderer',
      canvas: 'CanvasRenderer'
    },

    Properties: {
      hierarchy: 'hierarchy',
      demotion: 'demotion'
    },

    Events: {
      play: 'play',
      pause: 'pause',
      update: 'update',
      render: 'render',
      resize: 'resize',
      change: 'change'
    },

    Resolution: 8,

    Instances: [],

    noConflict: function() {
      root.Two = previousTwo;
      return this;
    },

    Utils: {

      Curve: {

        CollinearityEpsilon: pow(10, -30),

        RecursionLimit: 16,

        CuspLimit: 0,

        Tolerance: {
          distance: 0.25,
          angle: 0,
          epsilon: 0.01
        }

      },

      /**
       * Properly defer play calling until after all objects
       * have been updated with their newest styles.
       */
      setPlaying: function(b) {

        _.defer(_.bind(function() {
          this.playing = !!b;
        }, this));

      },

      applySvgAttributes: function(node, elem) {

        elem.cap = 'butt';
        elem.join = 'bevel';

        _.each(node.attributes, function(v, k) {

          var property = v.nodeName;

          switch (property) {

            case 'transform':

              // Need to figure out how to decompose matrix into
              // translation, rotation, scale.

              // var transforms = node[k].baseVal;
              // var matrix = new Two.Matrix();
              // _.each(_.range(transforms.numberOfItems), function(i) {
              //   var m = transforms.getItem(i).matrix;
              //   matrix.multiply(m.a, m.b, m.c, m.d, m.e, m.f);
              // });
              // elem.setMatrix(matrix);
              break;
            case 'visibility':
              elem.visible = !!v.nodeValue;
              break;
            case 'stroke-linecap':
              elem.cap = v.nodeValue;
              break;
            case 'stroke-linejoin':
              elem.join = v.nodeValue;
              break;
            case 'stroke-miterlimit':
              elem.miter = v.nodeValue;
              break;
            case 'stroke-width':
              elem.linewidth = parseFloat(v.nodeValue);
              break;
            case 'stroke-opacity':
            case 'fill-opacity':
              elem.opacity = v.nodeValue;
              break;
            case 'fill':
              elem.fill = v.nodeValue;
              break;
            case 'stroke':
              elem.stroke = v.nodeValue;
              break;
          }

        });

        return elem;

      },

      /**
       * Read any number of SVG node types and create Two equivalents of them.
       */
      read: {

        svg: function() {
          return Two.Utils.read.g.apply(this, arguments);
        },

        g: function(node) {

          var group = new Two.Group();

          this.add(group);

          _.each(node.childNodes, function(n) {

            if (!n.localName) {
              return;
            }

            var tag = n.localName.toLowerCase();

            if ((tag in Two.Utils.read)) {
              n = Two.Utils.read[tag].call(this, n);
              group.add(n);
            }

          }, this);

          return Two.Utils.applySvgAttributes(node, group);

        },

        polygon: function(node, open) {

          var points = node.points;
          var verts = _.map(_.range(points.numberOfItems), function(i) {
            var p = points.getItem(i);
            return new Two.Vector(p.x, p.y);
          });

          var poly = new Two.Polygon(verts, !open).noStroke();

          return Two.Utils.applySvgAttributes(node, poly);

        },

        polyline: function(node) {
          return Two.Utils.read.polygon(node, true);
        },

        path: function(node) {

          var data = node.getAttribute('d');
          // Retrieve an array of all commands.
          var paths = _.flatten(_.map(_.compact(data.split(/M/g)), function(str) {
            var rels = _.map(_.compact(str.split(/m/g)), function(str, i) {
              if (i <= 0) {
                return str;
              }
              return 'm' + str;
            });
            rels[0] = 'M' + rels[0];
            return rels;
          }));

          // Create Two.Polygons from the paths.
          var length = paths.length;
          var coord = new Two.Vector();
          var control = new Two.Vector();
          var polys = _.map(paths, function(path) {

            var coords, relative = false;
            var closed = false;

            var points = _.flatten(_.map(path.match(/[a-z][^a-z]*/ig), function(command) {

              var result, x, y;
              var type = command[0];
              var lower = type.toLowerCase();

              coords = command.slice(1).trim().split(/[\s,]+|(?=[+\-])/);
              relative = type === lower;

              var x1, y1, x2, y2, x3, y3, x4, y4, reflection;

              switch(lower) {

                case 'z':
                  closed = true;
                  break;

                case 'm':
                case 'l':

                  x = parseFloat(coords[0]);
                  y = parseFloat(coords[1]);

                  result = new Two.Vector(x, y);

                  if (relative) {
                    result.addSelf(coord);
                  }

                  coord.copy(result);
                  break;

                case 'h':
                case 'v':

                  var a = lower === 'h' ? 'x' : 'y';
                  var b = a === 'x' ? 'y' : 'x';

                  result = new Two.Vector();
                  result[a] = parseFloat(coords[0]);
                  result[b] = coord[b];

                  if (relative) {
                    result[a] += coord[a];
                  }

                  coord.copy(result);
                  break;

                case 's':
                case 'c':

                  x1 = coord.x, y1 = coord.y;

                  if (lower === 'c') {

                    x2 = parseFloat(coords[0]), y2 = parseFloat(coords[1]);
                    x3 = parseFloat(coords[2]), y3 = parseFloat(coords[3]);
                    x4 = parseFloat(coords[4]), y4 = parseFloat(coords[5]);

                  } else {

                    // Calculate reflection control point for proper x2, y2
                    // inclusion.

                    reflection = new Two.Vector().copy(coord).subSelf(control);

                    x2 = parseFloat(reflection.x), y2 = parseFloat(reflection.y);
                    x3 = parseFloat(coords[0]), y3 = parseFloat(coords[1]);
                    x4 = parseFloat(coords[2]), y4 = parseFloat(coords[3]);

                  }

                  if (relative) {
                    x2 += x1, y2 += y1;
                    x3 += x1, y3 += y1;
                    x4 += x1, y4 += y1;
                  }

                  result = Two.Utils.subdivide(x1, y1, x2, y2, x3, y3, x4, y4);
                  coord.set(x4, y4);
                  control.set(x3, y3);
                  break;

                case 't':
                case 'q':

                  x1 = coord.x, y1 = coord.y;
                  if (control.isZero()) {
                    x2 = x1, y2 = y1;
                  } else {
                    x2 = control.x, y1 = control.y;
                  }

                  if (lower === 'q') {

                    x3 = parseFloat(coords[0]), y3 = parseFloat(coords[1]);
                    x4 = parseFloat(coords[1]), y4 = parseFloat(coords[2]);

                  } else {

                    reflection = new Two.Vector().copy(coord).subSelf(control);

                    x3 = parseFloat(reflection.x), y3 = parseFloat(reflection.y);
                    x4 = parseFloat(coords[0]), y4 = parseFloat(coords[1]);

                  }

                  if (relative) {
                    x2 += x1, y2 += y1;
                    x3 += x1, y3 += y1;
                    x4 += x1, y4 += y1;
                  }

                  result = Two.Utils.subdivide(x1, y1, x2, y2, x3, y3, x4, y4);
                  coord.set(x4, y4);
                  control.set(x3, y3);
                  break;

                case 'a':
                  throw new Two.Utils.Error('not yet able to interpret Elliptical Arcs.');
              }

              return result;

            }));

            if (_.isUndefined(points[points.length - 1])) {
              points.pop();
            }

            var poly = new Two.Polygon(points, closed).noStroke();
            return Two.Utils.applySvgAttributes(node, poly);

          });

          return polys;

        },

        circle: function(node) {

          var x = parseFloat(node.getAttribute('cx'));
          var y = parseFloat(node.getAttribute('cy'));
          var r = parseFloat(node.getAttribute('r'));

          var amount = Two.Resolution;
          var points = _.map(_.range(amount), function(i) {
            var pct = i / amount;
            var theta = pct * TWO_PI;
            var x = r * cos(theta);
            var y = r * sin(theta);
            return new Two.Vector(x, y);
          }, this);

          var circle = new Two.Polygon(points, true, true).noStroke();
          circle.translation.set(x, y);

          return Two.Utils.applySvgAttributes(node, circle);

        },

        ellipse: function(node) {

          var x = parseFloat(node.getAttribute('cx'));
          var y = parseFloat(node.getAttribute('cy'));
          var width = parseFloat(node.getAttribute('rx'));
          var height = parseFloat(node.getAttribute('ry'));

          var amount = Two.Resolution;
          var points = _.map(_.range(amount), function(i) {
            var pct = i / amount;
            var theta = pct * TWO_PI;
            var x = width * cos(theta);
            var y = height * sin(theta);
            return new Two.Vector(x, y);
          }, this);

          var ellipse = new Two.Polygon(points, true, true).noStroke();
          ellipse.translation.set(x, y);

          return Two.Utils.applySvgAttributes(node, ellipse);

        },

        rect: function(node) {

          var x = parseFloat(node.getAttribute('x'));
          var y = parseFloat(node.getAttribute('y'));
          var width = parseFloat(node.getAttribute('width'));
          var height = parseFloat(node.getAttribute('height'));

          var w2 = width / 2;
          var h2 = height / 2;

          var points = [
            new Two.Vector(w2, h2),
            new Two.Vector(-w2, h2),
            new Two.Vector(-w2, -h2),
            new Two.Vector(w2, -h2)
          ];

          var rect = new Two.Polygon(points, true).noStroke();
          rect.translation.set(x + w2, y + h2);

          return Two.Utils.applySvgAttributes(node, rect);

        },

        line: function(node) {

          var x1 = parseFloat(node.getAttribute('x1'));
          var y1 = parseFloat(node.getAttribute('y1'));
          var x2 = parseFloat(node.getAttribute('x2'));
          var y2 = parseFloat(node.getAttribute('y2'));

          var width = x2 - x1;
          var height = y2 - y1;

          var w2 = width / 2;
          var h2 = height / 2;

          var points = [
            new Two.Vector(- w2, - h2),
            new Two.Vector(w2, h2)
          ];

          // Center line and translate to desired position.

          var line = new Two.Polygon(points).noFill();
          line.translation.set(x1 + w2, y1 + h2);

          return Two.Utils.applySvgAttributes(node, line);

        }

      },

      /**
       * Given 2 points (a, b) and corresponding control point for each
       * return an array of points that represent an Adaptive Subdivision
       * of Bezier Curves. Founded in the online article:
       *
       * http://www.antigrain.com/research/adaptive_bezier/index.html
       *
       * Where level represents how many levels deep the function has
       * already recursed.
       *
       */
      subdivide: function(x1, y1, x2, y2, x3, y3, x4, y4, level) {

        // Constants
        var epsilon = Two.Utils.Curve.CollinearityEpsilon,
          limit = Two.Utils.Curve.RecursionLimit,
          cuspLimit = Two.Utils.Curve.CuspLimit,
          tolerance = Two.Utils.Curve.Tolerance,
          da1, da2;

        level = level || 0;

        if (level > limit) {
          return [];
        }

        var x12 = (x1 + x2) / 2,
            y12 = (y1 + y2) / 2,
            x23 = (x2 + x3) / 2,
            y23 = (y2 + y3) / 2,
            x34 = (x3 + x4) / 2,
            y34 = (y3 + y4) / 2,
            x123  = (x12 + x23) / 2,
            y123  = (y12 + y23) / 2,
            x234  = (x23 + x34) / 2,
            y234  = (y23 + y34) / 2,
            x1234 = (x123 + x234) / 2,
            y1234 = (y123 + y234) / 2;


        // Try to approximate the full cubic curve by a single straight line.
        var dx = x4 - x1;
        var dy = y4 - y1;

        var d2 = abs(((x2 - x4) * dy - (y2 - y4) * dx));
        var d3 = abs(((x3 - x4) * dy - (y3 - y4) * dx));

        if (level > 0) {

          if (d2 > epsilon && d3 > epsilon) {

            if ((d2 + d3) * (d2 + d3) <= tolerance.distance * (dx * dx + dy * dy)) {

              if (tolerance.angle < tolerance.epsilon) {
                return [new Two.Vector(x1234, y1234)];
              }

              var a23 = atan2(y3 - y2, x3 - x2);
              da1 = abs(a23 - atan2(y2 - y1, x2 - x1));
              da2 = abs(atan2(y4 - y3, x4 - x3) - a23);

              if (da1 >= PI) da1 = TWO_PI - da1;
              if (da2 >= PI) da2 = TWO_PI - da2;

              if (da1 + da2 < tolerance.angle) {
                return [new Two.Vector(x1234, y1234)];
              }

              if (cuspLimit !== 0) {

                if (da1 > cuspLimit) {
                  return [new Two.Vector(x2, y2)];
                }

                if (da2 > cuspLimit) {
                  return [new Two.Vector(x3, y3)];
                }

              }

            }

          }

        } else {

          if (d2 > epsilon) {

            if (d2 * d2 <= tolerance.distance * (dx * dx + dy * dy)) {

              if (tolerance.angle < tolerance.epsilon) {
                return [new Two.Vector(x1234, y1234)];
              }

              da1 = abs(atan2(y3 - y2, x3 - x2) - atan2(y2 - y1, x2 - x1));
              if (da1 >= PI) da1 = TWO_PI - da1;

              if (da1 < tolerance.angle) {
                return [
                  new Two.Vector(x2, y2),
                  new Two.Vector(x3, y3)
                ];
              }

              if (cuspLimit !== 0) {

                if (da1 > cuspLimit) {
                  return [new Two.Vector(x2, y2)];
                }

              }

            } else if (d3 > epsilon) {

              if (d3 * d3 <= tolerance.distance * (dx * dx + dy * dy)) {

                if (tolerance.angle < tolerance.epsilon) {
                  return [new Two.Vector(x1234, y1234)];
                }

                da1 = abs(atan2(y4 - y3, x4 - x3) - atan2(y3 - y2, x3 - x2));
                if (da1 >= PI) da1 = TWO_PI - da1;

                if (da1 < tolerance.angle) {
                  return [
                    new Two.Vector(x2, y2),
                    new Two.Vector(x3, y3)
                  ];
                }

                if (cuspLimit !== 0) {

                  if (da1 > cuspLimit) {
                    return [new Two.Vector2(x3, y3)];
                  }

                }

              }

            } else {

              dx = x1234 - (x1 + x4) / 2;
              dy = y1234 - (y1 + y4) / 2;
              if (dx * dx + dy * dy <= tolerance.distance) {
                return [new Two.Vector(x1234, y1234)];
              }

            }

          }

        }

        return Two.Utils.subdivide(
          x1, y1, x12, y12, x123, y123, x1234, y1234, level + 1
        ).concat(Two.Utils.subdivide(
          x1234, y1234, x234, y234, x34, y34, x4, y4, level + 1
        ));

      },

      /**
       * Creates a set of points that have u, v values for anchor positions
       */
      getCurveFromPoints: function(points, closed) {

        var curve = [], l = points.length, last = l - 1;

        for (var i = 0; i < l; i++) {

          var p = points[i];
          var point = { x: p.x, y: p.y };
          curve.push(point);

          var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
          var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

          var a = points[prev];
          var b = point;
          var c = points[next];
          getControlPoints(a, b, c);

          if (!b.u.x && !b.u.y) {
            b.u.x = b.x;
            b.u.y = b.y;
          }

          if (!b.v.x && !b.v.y) {
            b.v.x = b.x;
            b.v.y = b.y;
          }

        }

        return curve;

      },

      /**
       * Given three coordinates return the control points for the middle, b,
       * vertex.
       */
      getControlPoints: function(a, b, c) {

        var a1 = angleBetween(a, b);
        var a2 = angleBetween(c, b);

        var d1 = distanceBetween(a, b);
        var d2 = distanceBetween(c, b);

        var mid = (a1 + a2) / 2;

        // So we know which angle corresponds to which side.

        var u, v;

        if (d1 < 0.0001 || d2 < 0.0001) {
          b.u = { x: b.x, y: b.y };
          b.v = { x: b.x, y: b.y };
          return b;
        }

        d1 *= 0.33; // Why 0.33?
        d2 *= 0.33;

        if (a2 < a1) {
          mid += HALF_PI;
        } else {
          mid -= HALF_PI;
        }

        u = {
          x: b.x + cos(mid) * d1,
          y: b.y + sin(mid) * d1
        };

        mid -= PI;

        v = {
          x: b.x + cos(mid) * d2,
          y: b.y + sin(mid) * d2
        };

        b.u = u;
        b.v = v;

        return b;

      },

      angleBetween: function(A, B) {

        var dx = A.x - B.x;
        var dy = A.y - B.y;

        return atan2(dy, dx);

      },

      distanceBetweenSquared: function(p1, p2) {

        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;

        return dx * dx + dy * dy;

      },

      distanceBetween: function(p1, p2) {

        return sqrt(distanceBetweenSquared(p1, p2));

      },

      mod: function(v, l) {

        while (v < 0) {
          v += l;
        }

        return v % l;

      },

      // Custom Error Throwing for Two.js

      Error: function(message) {
        this.name = 'two.js';
        this.message = message;
      }

    }

  });

  Two.Utils.Error.prototype = new Error();
  Two.Utils.Error.prototype.constructor = Two.Utils.Error;

  // Localize utils

  var distanceBetween = Two.Utils.distanceBetween,
    distanceBetweenSquared = Two.Utils.distanceBetweenSquared,
    angleBetween = Two.Utils.angleBetween,
    getControlPoints = Two.Utils.getControlPoints,
    getCurveFromPoints = Two.Utils.getCurveFromPoints,
    solveSegmentIntersection = Two.Utils.solveSegmentIntersection,
    decoupleShapes = Two.Utils.decoupleShapes,
    mod = Two.Utils.mod;

  _.extend(Two.prototype, Backbone.Events, {

    appendTo: function(elem) {

      elem.appendChild(this.renderer.domElement);
      return this;

    },

    play: function() {

      Two.Utils.setPlaying.call(this, true);

      return this.trigger(Two.Events.play);

    },

    pause: function() {

      this.playing = false;

      return this.trigger(Two.Events.pause);

    },

    /**
     * Update positions and calculations in one pass before rendering.
     */
    update: function() {

      var animated = !!this._lastFrame;
      var now = getNow();

      this.frameCount++;

      if (animated) {
        this.timeDelta = parseFloat((now - this._lastFrame).toFixed(3));
      }
      this._lastFrame = now;

      var width = this.width;
      var height = this.height;
      var renderer = this.renderer;

      // Update width / height for the renderer
      if (width !== renderer.width || height !== renderer.height) {
        renderer.setSize(width, height);
      }

      this.trigger(Two.Events.update, this.frameCount, this.timeDelta);

      return this.render();

    },

    /**
     * Render all drawable - visible objects of the scene.
     */
    render: function() {

      this.renderer.render();

      return this.trigger(Two.Events.render, this.frameCount);

    },

    /**
     * Convenience Methods
     */

    add: function(o) {

      var objects = o;
      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      this.scene.add(objects);
      return this;

    },

    makeLine: function(x1, y1, x2, y2) {

      var width = x2 - x1;
      var height = y2 - y1;

      var w2 = width / 2;
      var h2 = height / 2;

      var points = [
        new Two.Vector(- w2, - h2),
        new Two.Vector(w2, h2)
      ];

      // Center line and translate to desired position.

      var line = new Two.Polygon(points).noFill();
      line.translation.set(x1 + w2, y1 + h2);

      this.scene.add(line);
      return line;

    },

    makeRectangle: function(x, y, width, height) {

      var w2 = width / 2;
      var h2 = height / 2;

      var points = [
        new Two.Vector(w2, h2),
        new Two.Vector(-w2, h2),
        new Two.Vector(-w2, -h2),
        new Two.Vector(w2, -h2)
      ];

      var rect = new Two.Polygon(points, true);
      rect.translation.set(x, y);

      this.scene.add(rect);
      return rect;

    },

    makeCircle: function(ox, oy, r) {

      return this.makeEllipse(ox, oy, r, r);

    },

    makeEllipse: function(ox, oy, width, height) {

      var amount = Two.Resolution;

      var points = _.map(_.range(amount), function(i) {
        var pct = i / amount;
        var theta = pct * TWO_PI;
        var x = width * cos(theta);
        var y = height * sin(theta);
        return new Two.Vector(x, y);
      }, this);

      var ellipse = new Two.Polygon(points, true, true);
      ellipse.translation.set(ox, oy);

      this.scene.add(ellipse);

      return ellipse;

    },

    makeCurve: function(p) {

      var l = arguments.length, points = p;
      if (!_.isArray(p)) {
        points = [];
        for (var i = 0; i < l; i+=2) {
          var x = arguments[i];
          if (!_.isNumber(x)) {
            break;
          }
          var y = arguments[i + 1];
          points.push(new Two.Vector(x, y));
        }
      }

      var last = arguments[l - 1];
      var poly = new Two.Polygon(points, !(_.isBoolean(last) ? last : undefined), true);
      var rect = poly.getBoundingClientRect();

      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;

      _.each(poly.vertices, function(v) {
        v.x -= cx;
        v.y -= cy;
      });

      poly.translation.set(cx, cy);

      this.scene.add(poly);

      return poly;

    },

    /**
     * Convenience method to make and draw a Two.Polygon.
     */
    makePolygon: function(p) {

      var l = arguments.length, points = p;
      if (!_.isArray(p)) {
        points = [];
        for (var i = 0; i < l; i+=2) {
          var x = arguments[i];
          if (!_.isNumber(x)) {
            break;
          }
          var y = arguments[i + 1];
          points.push(new Two.Vector(x, y));
        }
      }

      var last = arguments[l - 1];
      var poly = new Two.Polygon(points, !(_.isBoolean(last) ? last : undefined));
      poly.center();

      this.scene.add(poly);

      return poly;

    },

    makeGroup: function(o) {

      var objects = o;
      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      var group = new Two.Group();
      this.scene.add(group);
      group.add(objects);

      return group;

    },

    // Utility Functions will go here.

    /**
     * Interpret an SVG Node and add it to this instance's scene. The
     * distinction should be made that this doesn't `import` svg's, it solely
     * interprets them into something compatible for Two.js — this is slightly
     * different than a direct transcription.
     */
    interpret: function(svgNode) {

      var tag = svgNode.tagName.toLowerCase();

      if (!(tag in Two.Utils.read)) {
        return null;
      }

      var node = Two.Utils.read[tag].call(this, svgNode);

      this.add(node);

      return node;

    }

  });

  function fitToWindow() {

    var wr = document.body.getBoundingClientRect();

    var width = this.width = wr.width;
    var height = this.height = wr.height;

    this.renderer.setSize(width, height);
    this.trigger(Two.Events.resize, width, height);

  }

  function getNow() {
    return ((window.performance && window.performance.now)
      ? window.performance : Date).now();
  }

  // Request Animation Frame

  (function() {

    _.each(Two.Instances, function(t) {

      if (t.playing) {
        t.update();
      }

    });

    requestAnimationFrame(arguments.callee);

  })();

})();
(function() {

  var Vector = Two.Vector = function(x, y) {

    x = x || 0;
    y = y || 0;

    Object.defineProperty(this, 'x', {
      get: function() {
        return x;
      },
      set: function(v) {
        x = v;
        this.trigger('change', 'x');
      }
    });

    Object.defineProperty(this, 'y', {
      get: function() {
        return y;
      },
      set: function(v) {
        y = v;
        this.trigger('change', 'y');
      }
    });

  };

  _.extend(Vector, {

  });

  _.extend(Vector.prototype, Backbone.Events, {

    set: function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    },

    copy: function(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    },

    clear: function() {
      this.x = 0;
      this.y = 0;
      return this;
    },

    clone: function() {
      return new Vector(this.x, this.y);
    },

    add: function(v1, v2) {
      this.x = v1.x + v2.x;
      this.y = v1.y + v2.y;
      return this;
    },

    addSelf: function(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    },

    sub: function(v1, v2) {
      this.x = v1.x - v2.x;
      this.y = v1.y - v2.y;
      return this;
    },

    subSelf: function(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    },

    multiplySelf: function(v) {
      this.x *= v.x;
      this.y *= v.y;
      return this;
    },

    multiplyScalar: function(s) {
      this.x *= s;
      this.y *= s;
      return this;
    },

    divideScalar: function(s) {
      if (s) {
        this.x /= s;
        this.y /= s;
      } else {
        this.set(0, 0);
      }
      return this;
    },

    negate: function() {
      return this.multiplyScalar(-1);
    },

    dot: function(v) {
      return this.x * v.x + this.y * v.y;
    },

    lengthSquared: function() {
      return this.x * this.x + this.y * this.y;
    },

    length: function() {
      return Math.sqrt(this.lengthSquared());
    },

    normalize: function() {
      return this.divideScalar(this.length());
    },

    distanceTo: function(v) {
      return Math.sqrt(this.distanceToSquared(v));
    },

    distanceToSquared: function(v) {
      var dx = this.x - v.x, dy = this.y - v.y;
      return dx * dx + dy * dy;
    },

    setLength: function(l) {
      return this.normalize().multiplyScalar(l);
    },

    equals: function(v) {
      return (this.distanceTo(v) < 0.0001 /* almost same position */);
    },

    lerp: function(v, t) {
      var x = (v.x - this.x) * t + this.x;
      var y = (v.y - this.y) * t + this.y;
      return this.set(x, y);
    },

    isZero: function() {
      return (this.length() < 0.0001 /* almost zero */ );
    }

  });

})();
(function() {

  /**
   * Constants
   */
  var range = _.range(6),
    cos = Math.cos, sin = Math.sin, tan = Math.tan;

  /**
   * Two.Matrix contains an array of elements that represent
   * the two dimensional 3 x 3 matrix as illustrated below:
   *
   * =====
   * a b c
   * d e f
   * g h i  // this row is not really used in 2d transformations
   * =====
   *
   * String order is for transform strings: a, d, b, e, c, f
   *
   * @class
   */
  var Matrix = Two.Matrix = function(a, b, c, d, e, f) {

    this.elements = new Two.Array(9);

    var elements = a;
    if (!_.isArray(elements)) {
      elements = _.toArray(arguments);
    }

    // initialize the elements with default values.

    this.identity().set(elements);

  };

  _.extend(Matrix, {

    Identity: [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ],

    /**
     * Multiply two matrix 3x3 arrays
     */
    Multiply: function(A, B) {

      if (B.length <= 3) { // Multiply Vector

        var x, y, z;
        var a = B[0] || 0, b = B[1] || 0, c = B[2] || 0;
        var e = A;

        // Go down rows first
        // a, d, g, b, e, h, c, f, i

        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;

        return { x: x, y: y, z: z };

      }

      var A0 = A[0], A1 = A[1], A2 = A[2];
      var A3 = A[3], A4 = A[4], A5 = A[5];
      var A6 = A[6], A7 = A[7], A8 = A[8];

      var B0 = B[0], B1 = B[1], B2 = B[2];
      var B3 = B[3], B4 = B[4], B5 = B[5];
      var B6 = B[6], B7 = B[7], B8 = B[8];

      return [
        A0 * B0 + A1 * B3 + A2 * B6,
        A0 * B1 + A1 * B4 + A2 * B7,
        A0 * B2 + A1 * B5 + A2 * B8,
        A3 * B0 + A4 * B3 + A5 * B6,
        A3 * B1 + A4 * B4 + A5 * B7,
        A3 * B2 + A4 * B5 + A5 * B8,
        A6 * B0 + A7 * B3 + A8 * B6,
        A6 * B1 + A7 * B4 + A8 * B7,
        A6 * B2 + A7 * B5 + A8 * B8
      ];
    }

  });

  _.extend(Matrix.prototype, {

    /**
     * Takes an array of elements or the arguments list itself to
     * set and update the current matrix's elements. Only updates
     * specified values.
     */
    set: function(a, b, c, d, e, f) {

      var elements = a, l = arguments.length;
      if (!_.isArray(elements)) {
        elements = _.toArray(arguments);
      }

      _.each(elements, function(v, i) {
        if (_.isNumber(v)) {
          this.elements[i] = v;
        }
      }, this);

      return this;

    },

    /**
     * Turn matrix to identity, like resetting.
     */
    identity: function() {

      this.set(Matrix.Identity);

      return this;

    },

    /**
     * Multiply scalar or multiply by another matrix.
     */
    multiply: function(a, b, c, d, e, f, g, h, i) {

      var elements = arguments, l = elements.length;

      // Multiply scalar

      if (l <= 1) {

        _.each(this.elements, function(v, i) {
          this.elements[i] = v * a;
        }, this);

        return this;

      }

      if (l <= 3) { // Multiply Vector

        var x, y, z;
        a = a || 0, b = b || 0, c = c || 0;
        e = this.elements;

        // Go down rows first
        // a, d, g, b, e, h, c, f, i

        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;

        return { x: x, y: y, z: z };

      }

      // Multiple matrix

      var A = this.elements;
      var B = elements;

      A0 = A[0], A1 = A[1], A2 = A[2];
      A3 = A[3], A4 = A[4], A5 = A[5];
      A6 = A[6], A7 = A[7], A8 = A[8];

      B0 = B[0], B1 = B[1], B2 = B[2];
      B3 = B[3], B4 = B[4], B5 = B[5];
      B6 = B[6], B7 = B[7], B8 = B[8];

      this.elements[0] = A0 * B0 + A1 * B3 + A2 * B6;
      this.elements[1] = A0 * B1 + A1 * B4 + A2 * B7;
      this.elements[2] = A0 * B2 + A1 * B5 + A2 * B8;

      this.elements[3] = A3 * B0 + A4 * B3 + A5 * B6;
      this.elements[4] = A3 * B1 + A4 * B4 + A5 * B7;
      this.elements[5] = A3 * B2 + A4 * B5 + A5 * B8;

      this.elements[6] = A6 * B0 + A7 * B3 + A8 * B6;
      this.elements[7] = A6 * B1 + A7 * B4 + A8 * B7;
      this.elements[8] = A6 * B2 + A7 * B5 + A8 * B8;

      return this;

    },

    /**
     * Set a scalar onto the matrix.
     */
    scale: function(sx, sy) {

      var l = arguments.length;
      if (l <= 1) {
        sy = sx;
      }

      return this.multiply(sx, 0, 0, 0, sy, 0, 0, 0, 1);

    },

    /**
     * Rotate the matrix.
     */
    rotate: function(radians) {

      var c = cos(radians);
      var s = sin(radians);

      return this.multiply(c, -s, 0, s, c, 0, 0, 0, 1);

    },

    /**
     * Translate the matrix.
     */
    translate: function(x, y) {

      return this.multiply(1, 0, x, 0, 1, y, 0, 0, 1);

    },

    /*
     * Skew the matrix by an angle in the x axis direction.
     */
    skewX: function(radians) {

      var a = tan(radians);

      return this.multiply(1, a, 0, 0, 1, 0, 0, 0, 1);

    },

    /*
     * Skew the matrix by an angle in the y axis direction.
     */
    skewY: function(radians) {

      var a = tan(radians);

      return this.multiply(1, 0, 0, a, 1, 0, 0, 0, 1);

    },

    /**
     * Create a transform string to be used with rendering apis.
     */
    toString: function() {

      return this.toArray().join(' ');

    },

    /**
     * Create a transform array to be used with rendering apis.
     */
    toArray: function(fullMatrix) {

      var elements = this.elements;

      var a = parseFloat(elements[0].toFixed(3));
      var b = parseFloat(elements[1].toFixed(3));
      var c = parseFloat(elements[2].toFixed(3));
      var d = parseFloat(elements[3].toFixed(3));
      var e = parseFloat(elements[4].toFixed(3));
      var f = parseFloat(elements[5].toFixed(3));

      if (!!fullMatrix) {

        var g = parseFloat(elements[6].toFixed(3));
        var h = parseFloat(elements[7].toFixed(3));
        var i = parseFloat(elements[8].toFixed(3));

        return [
          a, d, g, b, e, h, c, f, i
        ];
      }

      return [
        a, d, b, e, c, f  // Specific format see LN:19
      ];

    },

    /**
     * Clone the current matrix.
     */
    clone: function() {

      var a = this.elements[0],
          b = this.elements[1],
          c = this.elements[2],
          d = this.elements[3],
          e = this.elements[4],
          f = this.elements[5];
          g = this.elements[6];
          h = this.elements[7];
          i = this.elements[8];

      return new Two.Matrix(a, b, c, d, e, f, g, h, i);

    }

  });

})();
(function() {

  /**
   * Scope specific variables
   */

  // Localize variables
  var getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  var svg = {

    version: 1.1,

    ns: 'http://www.w3.org/2000/svg',
    xlink: 'http://www.w3.org/1999/xlink',

    /**
     * Create an svg namespaced element.
     */
    createElement: function(name, attrs) {
      var tag = name.toLowerCase();
      var elem = document.createElementNS(this.ns, tag);
      if (tag === 'svg') {
        attrs = _.defaults(attrs || {}, {
          version: this.version
        });
      }
      if (_.isObject(attrs)) {
        this.setAttributes(elem, attrs);
      }
      return elem;
    },

    /**
     * Add attributes from an svg element.
     */
    setAttributes: function(elem, attrs) {
      _.each(attrs, function(v, k) {
        this.setAttribute(k, v);
      }, elem);
      return this;
    },

    /**
     * Remove attributes from an svg element.
     */
    removeAttributes: function(elem, attrs) {
      _.each(attrs, function(a) {
        this.removeAttribute(a);
      }, elem);
      return this;
    },

    /**
     * Turn a set of vertices into a string for the d property of a path
     * element. It is imperative that the string collation is as fast as
     * possible, because this call will be happening multiple times a 
     * second.
     */
    toString: function(points, closed, curved) {

      var l = points.length,
        last = l - 1;

      if (!curved) {
        return _.map(points, function(v, i) {
          var command;
          if (i <= 0) {
            command = 'M';
          } else {
            command = 'L';
          }
          command += ' ' + v.x.toFixed(3) + ' ' + v.y.toFixed(3);
          if (i >= last && closed) {
            command += ' Z';
          }
          return command;
        }).join(' ');
      }

      var curve = getCurveFromPoints(points, closed);

      return _.map(curve, function(b, i) {

        var command;
        var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
        var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

        var a = curve[prev];
        var c = curve[next];

        var vx = a.v.x.toFixed(3);
        var vy = a.v.y.toFixed(3);

        var ux = b.u.x.toFixed(3);
        var uy = b.u.y.toFixed(3);

        var x = b.x.toFixed(3);
        var y = b.y.toFixed(3);

        if (i <= 0) {
          command = 'M ' + x + ' ' + y;
        } else {
          command = 'C ' + 
            vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;
        }

        // Add a final point and close it off

        if (i >= last && closed) {

          vx = b.v.x.toFixed(3);
          vy = b.v.y.toFixed(3);

          ux = c.u.x.toFixed(3);
          uy = c.u.y.toFixed(3);

          x = c.x.toFixed(3);
          y = c.y.toFixed(3);

          command += 
            ' C ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;

          command += ' Z';
        }

        return command;

      }).join(' ');

    }

  };

  /**
   * @class
   */
  var Renderer = Two[Two.Types.svg] = function() {

    this.count = 0;
    this.domElement = svg.createElement('svg');
    this.elements = [];

    this.domElement.style.visibility = 'hidden';

    this.unveil = _.once(_.bind(function() {
      this.domElement.style.visibility = 'visible';
    }, this));

  };

  _.extend(Renderer, {

    Identifier: 'two-'

  });

  _.extend(Renderer.prototype, Backbone.Events, {

    setSize: function(width, height) {

      this.width = width;
      this.height = height;

      svg.setAttributes(this.domElement, {
        width: width,
        height: height
      });

      return this;

    },

    /**
     * Add an object or objects to the renderer.
     */
    add: function(o) {

      var l = arguments.length,
        objects = o,
        elements = this.elements,
        domElement = this.domElement;

      if (!_.isArray(o)) {
        objects = _.map(arguments, function(a) {
          return a;
        });
      }

      _.each(objects, function(object) {

        var elem, tag, styles, isGroup = object instanceof Two.Group;

        if (_.isUndefined(object.id)) {
          object.id = generateId.call(this);
        }

        // Generate an SVG equivalent element here.

        if (isGroup) {
          tag = 'g';
          if (_.isUndefined(object.parent)) { // For the "scene".
            object.parent = this;
            object.unbind(Two.Events.change)
              .bind(Two.Events.change, _.bind(this.update, this));
          }
          styles = getStyles(object);
          // Remove unnecessary fluff from group
          delete styles.stroke;
          delete styles.fill;
          delete styles['fill-opacity'];
          delete styles['stroke-opacity'];
          delete styles['stroke-linecap'];
          delete styles['stroke-linejoin'];
          delete styles['stroke-miterlimit'];
          delete styles['stroke-width'];
        } else {
          tag = 'path';
          styles = getStyles(object);
        }

        elem = svg.createElement(tag, styles);

        domElement.appendChild(elem);
        elements.push(elem);

      }, this);

      return this;

    },

    update: function(id, property, value, closed, curved) {

      var elements = this.elements;
      var elem = elements[id];

      switch (property) {

        case Two.Properties.hierarchy:
          _.each(value, function(j) {
            elem.appendChild(elements[j]);
          });
          break;
        case Two.Properties.demotion:
          _.each(value, function(j) {
            elem.removeChild(elements[j]);
          });
          break;
        default:
          setStyles(elem, property, value, closed, curved);
      }

      return this;

    },

    render: function() {

      this.unveil();

      return this;

    }

  });

  function getStyles(o) {

    var styles = {},
      id = o.id,
      translation = o.translation,
      rotation = o.rotation,
      scale = o.scale,
      stroke = o.stroke,
      linewidth = o.linewidth,
      fill = o.fill,
      opacity = o.opacity,
      visible = o.visible,
      cap = o.cap,
      join = o.join,
      miter = o.miter,
      curved = o.curved,
      closed = o.closed,
      vertices = o.vertices;

    if (id) {
      styles.id = Renderer.Identifier + id;
    }
    if (translation && _.isNumber(scale) && _.isNumber(rotation)) {
      // styles.transform = 'translate(' + translation.x + ',' + translation.y
      //   + ') scale(' + scale + ') rotate(' + rotation + ')'
      styles.transform = 'matrix(' + o._matrix.toString() + ')';
    }
    if (stroke) {
      styles.stroke = stroke;
    }
    if (fill) {
      styles.fill = fill;
    }
    if (opacity) {
      styles['stroke-opacity'] = styles['fill-opacity'] = opacity;
    }
    // if (visible) {
    styles.visibility = visible ? 'visible' : 'hidden';
    // }
    if (cap) {
      styles['stroke-linecap'] = cap;
    }
    if (join) {
      styles['stroke-linejoin'] = join;
    }
    if (miter) {
      styles['stroke-miterlimit'] = miter;
    }
    if (linewidth) {
      styles['stroke-width'] = linewidth;
    }
    if (vertices) {
      styles.d = svg.toString(vertices, closed, curved);
    }

    return styles;

  }

  function setStyles(elem, property, value, closed, curved) {

    switch (property) {

      case 'matrix':
        property = 'transform';
        value = 'matrix(' + value.toString() + ')';
        break;
      case 'visible':
        property = 'visibility';
        value = value ? 'visible' : 'hidden';
        break;
      case 'cap':
        property = 'stroke-linecap';
        break;
      case 'join':
        property = 'stroke-linejoin';
        break;
      case 'miter':
        property = 'stroke-miterlimit';
        break;
      case 'linewidth':
        property = 'stroke-width';
        break;
      case 'vertices':
        property = 'd';
        value = svg.toString(value, closed, curved);
        break;
      case 'opacity':
        svg.setAttributes(elem, {
          'stroke-opacity': value,
          'fill-opacity': value
        });
        return;

    }

    elem.setAttribute(property, value);

  }

  function generateId() {
    var count = this.count;
    this.count++;
    return count;
  }

})();
(function() {

  /**
   * Constants
   */

  // Localize variables
  var getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  /**
   * A canvas specific representation of Two.Group
   */
  var Group = function(styles) {

    _.each(styles, function(v, k) {
      this[k] = v;
    }, this);

    this.children = {};

  };

  _.extend(Group.prototype, {

    appendChild: function(elem) {

      var parent = elem.parent;
      var id = elem.id;

      if (!_.isUndefined(parent)) {
        delete parent.children[id];
      }

      this.children[id] = elem;
      elem.parent = this;

      return this;

    },

    removeChild: function(elem) {

      delete this.children[elem.id];

      return this;

    },

    render: function(ctx) {

      var matrix = this.matrix;

      ctx.save();
      ctx.transform(
        matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);

      _.each(this.children, function(child) {
        child.render(ctx);
      });

      ctx.restore();

      return this;

    }

  });

  /**
   * A canvas specific representation of a drawable element.
   */
  var Element = function(styles) {

    _.each(styles, function(v, k) {
      this[k] = v;
    }, this);

  };

  _.extend(Element.prototype, {

    render: function(ctx) {

      var matrix = this.matrix,
        stroke = this.stroke,
        linewidth = this.linewidth,
        fill = this.fill,
        opacity = this.opacity,
        visible = this.visible,
        cap = this.cap,
        join = this.join,
        miter = this.miter,
        curved = this.curved,
        closed = this.closed,
        commands = this.commands,
        length = commands.length,
        last = length - 1;

      if (!visible) {
        return this;
      }

      // Transform

      ctx.save();

      if (matrix) {
        ctx.transform(
          matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
      }

      // Styles

      if (fill) {
        ctx.fillStyle = fill;
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
      }
      if (linewidth) {
        ctx.lineWidth = linewidth;
      }
      if (miter) {
        ctx.miterLimit = miter;
      }
      if (join) {
        ctx.lineJoin = join;
      }
      if (cap) {
        ctx.lineCap = cap;
      }
      if (_.isNumber(opacity)) {
        ctx.globalAlpha = opacity;
      }

      ctx.beginPath();
      _.each(commands, function(b, i) {

        var x = b.x.toFixed(3), y = b.y.toFixed(3);

        if (curved) {

          var prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
          var next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

          var a = commands[prev];
          var c = commands[next];

          var vx = a.v.x.toFixed(3);
          var vy = a.v.y.toFixed(3);

          var ux = b.u.x.toFixed(3);
          var uy = b.u.y.toFixed(3);

          if (i <= 0) {

            ctx.moveTo(x, y);

          } else {

            ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            // Add a final point and close it off

            if (i >= last && closed) {

              vx = b.v.x.toFixed(3);
              vy = b.v.y.toFixed(3);

              ux = c.u.x.toFixed(3);
              uy = c.u.y.toFixed(3);

              x = c.x.toFixed(3);
              y = c.y.toFixed(3);

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            }

          }

        } else {

          if (i <= 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

        }
      });

      // Loose ends

      if (closed && !curved) {
        ctx.closePath();
      }

      ctx.fill();
      ctx.stroke();

      ctx.restore();

    }

  });

  var canvas = {

    /**
     * Turn a set of vertices into a string for drawing in a canvas.
     */
    toArray: function(points, curved, closed) {

      var l = points.length,
        last = l - 1;

      if (!curved) {
        return _.map(points, function(v, i) {
          return { x: v.x, y: v.y };
        });
      }

      return getCurveFromPoints(points, closed);

    }

  };

  var Renderer = Two[Two.Types.canvas] = function() {

    this.count = 0;
    this.domElement = document.createElement('canvas');
    this.ctx = this.domElement.getContext('2d');

    this.elements = [];

    // Everything drawn on the canvas needs to come from the stage.
    this.stage = null;

  };

  _.extend(Renderer, {

    

  });

  _.extend(Renderer, {

    Group: Group,

    Element: Element,

    getStyles: getStyles,

    setStyles: setStyles,

    Utils: canvas

  });

  _.extend(Renderer.prototype, Backbone.Events, {

    setSize: function(width, height) {

      this.width = this.domElement.width = width;
      this.height = this.domElement.height = height;

      _.extend(this.domElement.style, {
        width: this.width + 'px',
        height: this.height + 'px'
      });

      return this;

    },

    add: function(o) {

      var proto = Object.getPrototypeOf(this);
        constructor = proto.constructor;

      var l = arguments.length,
        objects = o,
        elements = this.elements,
        domElement = this.domElement,

        // For extensibility with WebGlRenderer

        Group = constructor.Group,
        Element = constructor.Element,
        getStyles = constructor.getStyles;

      if (!_.isArray(o)) {
        objects = _.map(arguments, function(a) {
          return a;
        });
      }

      _.each(objects, function(object) {

        var elem, tag, styles, isGroup = object instanceof Two.Group,
          isStage = _.isNull(this.stage);

        if (_.isUndefined(object.id)) {
          object.id = generateId.call(this);
        }

        // Generate an element, a JavaScript object, that holds all the
        // necessary information to draw to the canvas successfully.

        if (isGroup) {
          // Kind of represents a matrix, save and restore set.
          styles = getStyles.call(this, object);
          delete styles.stroke;
          delete styles.fill;
          delete styles.opacity;
          delete styles.cap;
          delete styles.join;
          delete styles.miter;
          delete styles.linewidth;
          elem = new Group(styles);
          if (isStage) { // Set the stage

            this.stage = elem;
            this.stage.object = object; // Reference for BoundingBox calc.

            object.parent = this;
            object.unbind(Two.Events.change)
              .bind(Two.Events.change, _.bind(this.update, this));

          }
        } else {
          // Has styles and draw commands.
          elem = new Element(getStyles.call(this, object));
        }

        elements.push(elem);
        if (!isStage) {
          this.stage.appendChild(elem);
        }

      }, this);

      return this;

    },

    update: function(id, property, value, closed, curved, strokeChanged) {

      var proto = Object.getPrototypeOf(this);
      var constructor = proto.constructor;

      var elements = this.elements;
      var elem = elements[id];

      switch (property) {
        case Two.Properties.hierarchy:
          _.each(value, function(j) {
            elem.appendChild(elements[j]);
          });
          break;
        case Two.Properties.demotion:
          _.each(value, function(j) {
            elem.removeChild(elements[j]);
            this.elements[j] = null;
          }, this);
          break;
        default:
          constructor.setStyles.call(this, elem, property, value, closed, curved, strokeChanged);
      }

      return this;

    },

    render: function() {

      if (_.isNull(this.stage)) {
        return this;
      }

      // TODO: Test performance between these two

      // var rect = this.stage.object.getBoundingClientRect();
      // this.ctx.clearRect(rect.left, rect.top, rect.width, rect.height);

      this.ctx.clearRect(0, 0, this.width, this.height);

      this.stage.render(this.ctx);

      return this;

    }

  });

  function resetTransform(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function getStyles(o) {

    var styles = {},
      id = o.id,
      matrix = o._matrix,
      stroke = o.stroke,
      linewidth = o.linewidth,
      fill = o.fill,
      opacity = o.opacity,
      visible = o.visible,
      cap = o.cap,
      join = o.join,
      miter = o.miter,
      curved = o.curved,
      closed = o.closed,
      vertices = o.vertices;

    if (id) {
      styles.id = id;
    }
    if (_.isObject(matrix)) {
      styles.matrix = matrix.toArray();
    }
    if (stroke) {
      styles.stroke = stroke;
    }
    if (fill) {
      styles.fill = fill;
    }
    if (_.isNumber(opacity)) {
      styles.opacity = opacity;
    }
    if (cap) {
      styles.cap = cap;
    }
    if (join) {
      styles.join = join;
    }
    if (miter) {
      styles.miter = miter;
    }
    if (linewidth) {
      styles.linewidth = linewidth;
    }
    if (vertices) {
      styles.commands = canvas.toArray(vertices, curved, closed);
    }
    styles.visible = !!visible;
    styles.curved = !!curved;
    styles.closed = !!closed;

    return styles;

  }

  function setStyles(elem, property, value, closed, curved) {

    switch (property) {

      case 'matrix':
        property = 'matrix';
        value = value.toArray();
        break;
      case 'vertices':
        property = 'commands';
        elem.curved = curved;
        elem.closed = closed;
        value = canvas.toArray(value, elem.curved, elem.closed);
        break;

    }

    elem[property] = value;

  }

  function generateId() {
    var count = this.count;
    this.count++;
    return count;
  }

})();
(function() {

  var CanvasRenderer = Two[Two.Types.canvas],
    multiplyMatrix = Two.Matrix.Multiply,
    getCommands = Two[Two.Types.canvas].Utils.toArray,
    mod = Two.Utils.mod;

  var Group = function(styles) {

    CanvasRenderer.Group.call(this, styles);

  };

  _.extend(Group.prototype, CanvasRenderer.Group.prototype, {

    appendChild: function() {

      CanvasRenderer.Group.prototype.appendChild.apply(this, arguments);

      this.updateMatrix();

      return this;

    },

    updateTexture: function(ctx) {

      _.each(this.children, function(child) {
        child.updateTexture(ctx);
      });

      return this;

    },

    updateMatrix: function(parent) {

      var matrix = (parent && parent._matrix) || this.parent && this.parent._matrix;
      var scale = (parent && parent._scale) || this.parent && this.parent._scale;

      if (!matrix) {
        return this;
      }

      this._matrix = multiplyMatrix(this.matrix, matrix);
      this._scale = this.scale * scale;

      _.each(this.children, function(child) {
        child.updateMatrix(this);
      }, this);

      return this;

    },

    render: function(gl, program) {

      _.each(this.children, function(child) {
        child.render(gl, program);
      });

    }

  });

  var Element = function(styles) {

    CanvasRenderer.Element.call(this, styles);

  };

  _.extend(Element.prototype, CanvasRenderer.Element.prototype, {

    updateMatrix: function(parent) {

      var matrix = (parent && parent._matrix) || this.parent && this.parent._matrix;
      var scale = (parent && parent._scale) || this.parent && this.parent._scale;

      if (!matrix) {
        return this;
      }

      this._matrix = multiplyMatrix(this.matrix, matrix);
      this._scale = this.scale * scale;

      return this;

    },

    updateTexture: function(ctx) {

      webgl.updateTexture(ctx, this);
      return this;

    },

    render: function(gl, program) {

      if (!this.visible || !this.opacity || !this.buffer) {
        return this;
      }

      // Draw Texture

      gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordsBuffer);

      gl.vertexAttribPointer(program.textureCoords, 2, gl.FLOAT, false, 0, 0);

      gl.bindTexture(gl.TEXTURE_2D, this.texture);


      // Draw Rect

      gl.uniformMatrix3fv(program.matrix, false, this._matrix);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

      gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      return this;

    }

  });

  var webgl = {

    canvas: document.createElement('canvas'),

    uv: new Two.Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1
    ]),

    /**
     * Returns the rect of a set of verts. Typically takes vertices that are
     * "centered" around 0 and returns them to be anchored upper-left.
     */
    getBoundingClientRect: function(vertices, border, curved) {

      var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

      _.each(vertices, function(v, i) {

        var x = v.x, y = v.y, a, b, c, d;

        top = Math.min(y, top);
        left = Math.min(x, left);
        right = Math.max(x, right);
        bottom = Math.max(y, bottom);

        if (!!curved) {

          a = v.u.x, b = v.u.y;
          c = v.v.x, d = v.v.y;

          top = Math.min(b, d, top);
          left = Math.min(a, c, left);
          right = Math.max(a, c, right);
          bottom = Math.max(b, d, bottom);

        }

      });

      // Expand borders

      if (_.isNumber(border)) {
        top -= border;
        left -= border;
        right += border;
        bottom += border;
      }

      var width = right - left;
      var height = bottom - top;

      var centroid = {
        x: Math.abs(left),
        y: Math.abs(top)
      };

      return {
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: width,
        height: height,
        centroid: centroid
      };

    },

    getTriangles: function(rect) {
      var top = rect.top,
        left = rect.left,
        right = rect.right,
        bottom = rect.bottom;
      return new Two.Array([
        left, top,
        right, top,
        left, bottom,
        left, bottom,
        right, top,
        right, bottom
      ]);
    },

    updateCanvas: function(elem) {

      var commands = elem.commands;
      var canvas = this.canvas;
      var ctx = this.ctx;

      // Styles

      var scale = elem._scale,
        stroke = elem.stroke,
        linewidth = elem.linewidth * scale,
        fill = elem.fill,
        opacity = elem.opacity,
        cap = elem.cap,
        join = elem.join,
        miter = elem.miter,
        curved = elem.curved,
        closed = elem.closed,
        length = commands.length,
        last = length - 1;

      canvas.width = Math.max(Math.ceil(elem.rect.width * scale), 1);
      canvas.height = Math.max(Math.ceil(elem.rect.height * scale), 1);

      var centroid = elem.rect.centroid;
      var cx = centroid.x * scale, cy = centroid.y * scale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (fill) {
        ctx.fillStyle = fill;
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
      }
      if (linewidth) {
        ctx.lineWidth = linewidth;
      }
      if (miter) {
        ctx.miterLimit = miter;
      }
      if (join) {
        ctx.lineJoin = join;
      }
      if (cap) {
        ctx.lineCap = cap;
      }
      if (_.isNumber(opacity)) {
        ctx.globalAlpha = opacity;
      }

      ctx.beginPath();
      _.each(commands, function(b, i) {

        var x = (b.x * scale + cx).toFixed(3),
          y = (b.y * scale + cy).toFixed(3);

        if (curved) {

          var prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
          var next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

          var a = commands[prev];
          var c = commands[next];

          var vx = (a.v.x * scale + cx).toFixed(3);
          var vy = (a.v.y * scale + cy).toFixed(3);

          var ux = (b.u.x * scale + cx).toFixed(3);
          var uy = (b.u.y * scale + cy).toFixed(3);

          if (i <= 0) {

            ctx.moveTo(x, y);

          } else {

            ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            // Add a final point and close it off

            if (i >= last && closed) {

              vx = (b.v.x * scale + cx).toFixed(3);
              vy = (b.v.y * scale + cy).toFixed(3);

              ux = (c.u.x * scale + cx).toFixed(3);
              uy = (c.u.y * scale + cy).toFixed(3);

              x = (c.x * scale + cx).toFixed(3);
              y = (c.y * scale + cy).toFixed(3);

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            }

          }

        } else {

          if (i <= 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

        }
      });

      // Loose ends

      if (closed && !curved) {
        ctx.closePath();
      }

      ctx.fill();
      ctx.stroke();

    },

    updateTexture: function(gl, elem) {

      this.updateCanvas(elem);

      if (elem.texture) {
        gl.deleteTexture(elem.texture);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, elem.textureCoordsBuffer);

      elem.texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, elem.texture);

      // Set the parameters so we can render any size image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      // Upload the image into the texture.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);

    },

    updateBuffer: function(gl, elem, program) {

      if (_.isObject(elem.buffer)) {
        gl.deleteBuffer(elem.buffer);
      }

      elem.buffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem.buffer);
      gl.enableVertexAttribArray(program.position);

      gl.bufferData(gl.ARRAY_BUFFER, elem.triangles, gl.STATIC_DRAW);

      if (_.isObject(elem.textureCoordsBuffer)) {
        gl.deleteBuffer(elem.textureCoordsBuffer);
      }

      elem.textureCoordsBuffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem.textureCoordsBuffer);
      gl.enableVertexAttribArray(program.textureCoords);

      gl.bufferData(gl.ARRAY_BUFFER, this.uv, gl.STATIC_DRAW);

    },

    program: {

      create: function(gl, shaders) {

        var program = gl.createProgram();
        _.each(shaders, function(s) {
          gl.attachShader(program, s);
        });

        gl.linkProgram(program);
        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
          error = gl.getProgramInfoLog(program);
          gl.deleteProgram(program);
          throw new Two.Utils.Error('unable to link program: ' + error);
        }

        return program;

      }

    },

    shaders: {

      create: function(gl, source, type) {

        var shader = gl.createShader(gl[type]);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
          var error = gl.getShaderInfoLog(shader);
          gl.deleteShader(shader);
          throw new Two.Utils.Error('unable to compile shader ' + shader + ': ' + error);
        }

        return shader;

      },

      types: {
        vertex: 'VERTEX_SHADER',
        fragment: 'FRAGMENT_SHADER'
      },

      vertex: [
        'attribute vec2 a_position;',
        'attribute vec2 a_textureCoords;',
        '',
        'uniform mat3 u_matrix;',
        'uniform vec2 u_resolution;',
        '',
        'varying vec2 v_textureCoords;',
        '',
        'void main() {',
        '   vec2 projected = (u_matrix * vec3(a_position, 1)).xy;',
        '   vec2 normal = projected / u_resolution;',
        '   vec2 clipspace = (normal * 2.0) - 1.0;',
        '',
        '   gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);',
        '   v_textureCoords = a_textureCoords;',
        '}'
      ].join('\n'),

      fragment: [
        'precision mediump float;',
        '',
        'uniform sampler2D u_image;',
        'varying vec2 v_textureCoords;',
        '',
        'void main() {',
        '  gl_FragColor = texture2D(u_image, v_textureCoords);',
        '}'
      ].join('\n')

    }

  };

  webgl.ctx = webgl.canvas.getContext('2d');

  var Renderer = Two[Two.Types.webgl] = function(options) {

    this.count = 0;
    this.domElement = document.createElement('canvas');

    this.elements = [];

    // Everything drawn on the canvas needs to come from the stage.
    this.stage = null;

    // http://games.greggman.com/game/webgl-and-alpha/
    // http://www.khronos.org/registry/webgl/specs/latest/#5.2
    var params = _.defaults(options || {}, {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      stencil: true,
      preserveDrawingBuffer: false
    });

    var gl = this.ctx = this.domElement.getContext('webgl', params) || 
      this.domElement.getContext('experimental-webgl', params);

    if (!this.ctx) {
      throw new Two.Utils.Error(
        'unable to create a webgl context. Try using another renderer.');
    }

    // Compile Base Shaders to draw in pixel space.
    var vs = webgl.shaders.create(
      gl, webgl.shaders.vertex, webgl.shaders.types.vertex);
    var fs = webgl.shaders.create(
      gl, webgl.shaders.fragment, webgl.shaders.types.fragment);

    this.program = webgl.program.create(gl, [vs, fs]);
    gl.useProgram(this.program);

    // Create and bind the drawing buffer

    // look up where the vertex data needs to go.
    this.program.position = gl.getAttribLocation(this.program, 'a_position');
    this.program.matrix = gl.getUniformLocation(this.program, 'u_matrix');
    this.program.textureCoords = gl.getAttribLocation(this.program, 'a_textureCoords');

    // Copied from Three.js WebGLRenderer
    gl.disable(gl.DEPTH_TEST);

    // Setup some initial statements of the gl context
    gl.enable(gl.BLEND);
    gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE, gl.ONE_MINUS_SRC_ALPHA );

  };

  _.extend(Renderer, {

    Group: Group,

    Element: Element,

    getStyles: getStyles,

    setStyles: setStyles

  });

  _.extend(Renderer.prototype, Backbone.Events, CanvasRenderer.prototype, {

    setSize: function(width, height) {

      CanvasRenderer.prototype.setSize.apply(this, arguments);

      this.ctx.viewport(0, 0, width, height);

      var resolutionLocation = this.ctx.getUniformLocation(
        this.program, 'u_resolution');
      this.ctx.uniform2f(resolutionLocation, width, height);

      return this;

    },

    render: function() {

      if (_.isNull(this.stage)) {
        return this;
      }

      // Draw a green rectangle

      this.stage.render(this.ctx, this.program);

      return this;

    }

  });

  function getStyles(o) {

    var styles = {},
      id = o.id,
      matrix = o._matrix,
      stroke = o.stroke,
      linewidth = o.linewidth,
      fill = o.fill,
      opacity = o.opacity,
      visible = o.visible,
      cap = o.cap,
      join = o.join,
      miter = o.miter,
      curved = o.curved,
      closed = o.closed,
      vertices = o.vertices;

    if (id) {
      styles.id = id;
    }
    if (_.isObject(matrix)) {
      styles.matrix = styles._matrix = matrix.toArray(true);
      styles.scale = styles._scale = 1;
    }
    if (stroke) {
      styles.stroke = stroke;
    }
    if (fill) {
      styles.fill = fill;
    }
    if (_.isNumber(opacity)) {
      styles.opacity = opacity;
    }
    if (cap) {
      styles.cap = cap;
    }
    if (join) {
      styles.join = join;
    }
    if (miter) {
      styles.miter = miter;
    }
    if (linewidth) {
      styles.linewidth = linewidth;
    }
    if (vertices) {
      styles.vertices = getCommands(vertices, curved, closed);
      styles.commands = styles.vertices;
      styles.rect = webgl.getBoundingClientRect(styles.commands, styles.linewidth, styles.curved);
      styles.triangles = webgl.getTriangles(styles.rect);
    }
    styles.visible = !!visible;
    styles.curved = !!curved;
    styles.closed = !!closed;

    // Update buffer and texture

    if (o instanceof Two.Polygon) {
      webgl.updateBuffer(this.ctx, styles, this.program);
      Element.prototype.updateTexture.call(styles, this.ctx);
    }

    return styles;

  }

  function setStyles(elem, property, value, closed, curved, strokeChanged) {

    var textureNeedsUpdate = false;

    if (/matrix/.test(property)) {
      elem[property] = value.toArray(true);
      if (_.isNumber(closed)) {
        textureNeedsUpdate = elem.scale !== closed;
        elem.scale = closed;
      }
      elem.updateMatrix();
    } else if (/(stroke|fill|opacity|cap|join|miter|linewidth)/.test(property)) {
      elem[property] = value;
      elem.rect = webgl.getBoundingClientRect(elem.commands, elem.linewidth, elem.curved);
      elem.triangles = webgl.getTriangles(elem.rect);
      webgl.updateBuffer(this.ctx, elem, this.program);
      textureNeedsUpdate = true;
    } else if (property === 'vertices') {
      if (!_.isUndefined(closed)) {
        elem.closed = closed;
      }
      if (!_.isUndefined(curved)) {
        elem.curved = curved;
      }
      if (strokeChanged) {
        elem.commands = getCommands(value, elem.curved, elem.closed);
      } else {
        elem.vertices = getCommands(value, elem.curved, elem.closed);
        elem.commands = elem.vertices;
      }
      elem.rect = webgl.getBoundingClientRect(elem.vertices, elem.linewidth, elem.curved);
      elem.triangles = webgl.getTriangles(elem.rect);
      webgl.updateBuffer(this.ctx, elem, this.program);
      textureNeedsUpdate = true;
    } else {
      elem[property] = value;
    }

    if (textureNeedsUpdate) {
      elem.updateTexture(this.ctx);
    }

  }

})();
(function() {

  var Shape = Two.Shape = function(limited) {

    // Define matrix properties which all inherited
    // objects of Shape have.

    this._matrix = new Two.Matrix();

    var updateMatrix = _.debounce(_.bind(function() {
      var transform = this._matrix
        .identity()
        .translate(this.translation.x, this.translation.y)
        .scale(this.scale)
        .rotate(this.rotation);
      this.trigger(Two.Events.change, this.id, 'matrix', transform, this.scale);
    }, this), 0);

    this._rotation = 'rotation';

    Object.defineProperty(this, 'rotation', {
      get: function() {
        return this._rotation;
      },
      set: function(v) {
        this._rotation = v;
        updateMatrix();
      }
    });

    this._scale = 'scale';

    Object.defineProperty(this, 'scale', {
      get: function() {
        return this._scale;
      },
      set: function(v) {
        this._scale = v;
        updateMatrix();
      }
    });

    this.translation = new Two.Vector();
    this.rotation = 0.0;
    this.scale = 1.0;

    this.translation.bind(Two.Events.change, updateMatrix);

    if (!!limited) {
      return this;
    }

    // Style properties

    Shape.MakeGetterSetter(this, Shape.Properties);

    this.fill = '#fff';
    this.stroke = '#000';
    this.linewidth = 1.0;
    this.opacity = 1.0;
    this.visible = true;

    this.cap = 'round';
    this.join = 'round';
    this.miter = 1;

  };

  _.extend(Shape, {

    Properties: [
      'fill',
      'stroke',
      'linewidth',
      'opacity',
      'visible',
      'cap',
      'join',
      'miter'
    ],

    MakeGetterSetter: function(shape, properties) {

      if (!_.isArray(properties)) {
        properties = [properties];
      }

      _.each(properties, function(k) {

        var secret = '_' + k;

        Object.defineProperty(shape, k, {
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            this.trigger(Two.Events.change, this.id, k, v, this);
          }
        });

      });

    }

  });

  _.extend(Shape.prototype, Backbone.Events, {

    addTo: function(group) {
      group.add(this);
      return this;
    },

    noFill: function() {
      this.fill = 'transparent';
      return this;
    },

    noStroke: function() {
      this.stroke = 'transparent';
      return this;
    },

    clone: function() {
      var clone = new Shape();
      clone.translation.copy(this.translation);
      _.each(Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      return this;
    }

  });

})();
(function() {

  var Group = Two.Group = function(o) {

    Two.Shape.call(this, true);

    delete this.stroke;
    delete this.fill;
    delete this.linewidth;
    delete this.opacity;

    delete this.cap;
    delete this.join;
    delete this.miter;

    Group.MakeGetterSetter(this, Two.Shape.Properties);

    this.children = {};

  };

  _.extend(Group, {

    MakeGetterSetter: function(group, properties) {

      if (!_.isArray(properties)) {
        properties = [properties];
      }

      _.each(properties, function(k) {

        var secret = '_' + k;

        Object.defineProperty(group, k, {
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            _.each(this.children, function(child) { // Trickle down styles
              child[k] = v;
            });
          }
        });

      });

    }

  });

  _.extend(Group.prototype, Two.Shape.prototype, {

    /**
     * Group has a gotcha in that it's at the moment required to be bound to
     * an instance of two in order to add elements correctly. This needs to
     * be rethought and fixed.
     */
    clone: function(parent) {

      parent = parent || this.parent;

      var children = _.map(this.children, function(child) {
        return child.clone(parent);
      });

      var group = new Group();
      parent.add(group);
      group.add(children);

      group.translation.copy(this.translation);
      group.rotation = this.rotation;
      group.scale = this.scale;

      return group;

    },

    /**
     * Anchors all children around the center of the group.
     */
    center: function() {

      var rect = this.getBoundingClientRect();

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      _.each(this.children, function(child) {
        child.translation.subSelf(rect.centroid);
      });

      this.translation.copy(rect.centroid);

      return this;

    },

    /**
     * Add an object to the group.
     */
    add: function(o) {

      var l = arguments.length,
        objects = o,
        children = this.children,
        grandparent = this.parent,
        ids = [];

      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      // A bubbled up version of 'change' event for the children.

      var broadcast = _.bind(function(id, property, value, closed, curved, strokeChanged) {
        this.trigger(Two.Events.change, id, property, value, closed, curved, strokeChanged);
      }, this);

      // Add the objects

      _.each(objects, function(object) {

        var id = object.id, parent = object.parent;

        if (_.isUndefined(id)) {
          grandparent.add(object);
          id = object.id;
        }

        if (_.isUndefined(children[id])) {
          // Release object from previous parent.
          if (parent) {
            delete parent.children[id];
          }
          // Add it to this group and update parent-child relationship.
          children[id] = object;
          object.parent = this;
          object.unbind(Two.Events.change)
            .bind(Two.Events.change, broadcast);
          ids.push(id);
        }

      }, this);

      if (ids.length > 0) {
        this.trigger(Two.Events.change, this.id, Two.Properties.hierarchy, ids);
      }

      return this;
      // return this.center();

    },

    /**
     * Remove an object from the group.
     */
    remove: function(o) {

      var l = arguments.length,
        objects = o,
        children = this.children,
        grandparent = this.parent,
        ids = [];

      if (l <= 0 && grandparent) {
        grandparent.remove(this);
        return this;
      }

      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      _.each(objects, function(object) {

        var id = object.id, grandchildren = object.children;

        if (!(id in children)) {
          return;
        }

        delete children[id];
        object.unbind(Two.Events.change);

        ids.push(id);

      });

      if (ids.length > 0) {
        this.trigger(Two.Events.change, this.id, Two.Properties.demotion, ids);
      }

      return this;
      // return this.center();

    },

    /**
     * Return an object with top, left, right, bottom, width, and height
     * parameters of the group.
     */
    getBoundingClientRect: function() {

      var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

      _.each(this.children, function(child) {

        var rect = child.getBoundingClientRect();

        if (!top || !left || !right || !bottom) {
          return;
        }

        top = Math.min(rect.top, top);
        left = Math.min(rect.left, left);
        right = Math.max(rect.right, right);
        bottom = Math.max(rect.bottom, bottom);

      }, this);

      var ul = this._matrix.multiply(left, top, 1);
      var ll = this._matrix.multiply(right, bottom, 1);

      return {
        top: ul.y,
        left: ul.x,
        right: ll.x,
        bottom: ll.y,
        width: ll.x - ul.x,
        height: ll.y - ul.y
      };

    },

    /**
     * Trickle down of noFill
     */
    noFill: function() {
      _.each(this.children, function(child) {
        child.noFill();
      });
      return this;
    },

    /**
     * Trickle down of noStroke
     */
    noStroke: function() {
      _.each(this.children, function(child) {
        child.noStroke();
      });
      return this;
    }

  });

})();

(function() {

  /**
   * Constants
   */

  var min = Math.min, max = Math.max, round = Math.round;

  var Polygon = Two.Polygon = function(vertices, closed, curved) {

    Two.Shape.call(this);

    // Further getter setters for Polygon for closed and curved properties

    // Add additional logic for watching the vertices.

    closed = !!closed;
    curved = !!curved;
    
    var beginning = 0.0;
    var ending = 1.0;
    var strokeChanged = false;
    var renderedVertices = vertices.slice(0);

    var updateVertices = _.debounce(_.bind(function(property) { // Call only once a frame.

      var l, ia, ib, last;

      if (strokeChanged) {

        l = this.vertices.length;
        last = l - 1;

        ia = round((beginning) * last);
        ib = round((ending) * last);

        renderedVertices.length = 0;

        for (var i = ia; i < ib + 1; i++) {
          var v = this.vertices[i];
          renderedVertices.push(new Two.Vector(v.x, v.y));
        }

      }

      this.trigger(Two.Events.change,
        this.id, 'vertices', renderedVertices, closed, curved, strokeChanged);

      strokeChanged = false;

    }, this), 0);

    Object.defineProperty(this, 'closed', {
      get: function() {
        return closed;
      },
      set: function(v) {
        closed = !!v;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'curved', {
      get: function() {
        return curved;
      },
      set: function(v) {
        curved = !!v;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'beginning', {
      get: function() {
        return beginning;
      },
      set: function(v) {
        beginning = min(max(v, 0.0), 1.0);
        strokeChanged = true;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'ending', {
      get: function() {
        return ending;
      },
      set: function(v) {
        ending = min(max(v, 0.0), 1);
        strokeChanged = true;
        updateVertices();
      }
    });

    // At the moment cannot alter the array itself, just it's points.

    this.vertices = vertices.slice(0);

    _.each(this.vertices, function(v) {

      v.bind(Two.Events.change, updateVertices);

    }, this);

    updateVertices();

  };

  _.extend(Polygon.prototype, Two.Shape.prototype, {

    clone: function() {

      var points = _.map(this.vertices, function(v) {
        return new Two.Vector(v.x, v.y);
      });

      var clone = new Polygon(points, this.closed, this.curved);

      _.each(Two.Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      return clone;

    },

    center: function() {

      var rect = this.getBoundingClientRect();

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      _.each(this.vertices, function(v) {
        v.subSelf(rect.centroid);
      });

      this.translation.addSelf(rect.centroid);

      return this;

    },

    /**
     * Remove self from the scene / parent.
     */
    remove: function() {

      if (!this.parent) {
        return this;
      }

      this.parent.remove(this);

      return this;

    },

    getBoundingClientRect: function() {

      var border = this.linewidth;
      var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

      _.each(this.vertices, function(v) {
        var x = v.x, y = v.y;
        top = Math.min(y, top);
        left = Math.min(x, left);
        right = Math.max(x, right);
        bottom = Math.max(y, bottom);
      });

      // Expand borders

      top -= border;
      left -= border;
      right += border;
      bottom += border;

      var ul = this._matrix.multiply(left, top, 1);
      var ll = this._matrix.multiply(right, bottom, 1);

      return {
        top: ul.y,
        left: ul.x,
        right: ll.x,
        bottom: ll.y,
        width: ll.x - ul.x,
        height: ll.y - ul.y
      };

    }

  });

})();