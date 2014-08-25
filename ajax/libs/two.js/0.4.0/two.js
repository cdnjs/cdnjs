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


//     Underscore.js 1.5.1
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

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
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
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
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

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
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.5.1';

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
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
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
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

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
    if (!initial) throw new TypeError(reduceError);
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
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
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
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
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

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value == null ? _.identity : value);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
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
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, "length").concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
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
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error("bindAll must be passed function names");
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
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var result;
    var timeout = null;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
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
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
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
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
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

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
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
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
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
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
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
    return !!(obj && obj.nodeType === 1);
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

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
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
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
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
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);
/**
 * The Events module pulled from [Backbone.js](http://backbonejs.org/)
 * Stripped and modified to work with node.js and optimize types of calls
 * for animation based events.
 */

var Backbone = Backbone || {};

(function() {

  var array = [];
  var slice = array.slice;

  // Backbone.Events
  // ---------------

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  /**
   * Events API deprecated because of additional calls and checks
   * multiple times a frame tick in two.js
   */

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
      // if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
      this._events || (this._events = {});
      var list = this._events[name] || (this._events[name] = []);
      list.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind events to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      // if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
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
      if (!this._events/** || !eventsApi(this, 'off', name, [callback, context])**/) return this;
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
      // if (!eventsApi(this, 'trigger', name, args)) return this;
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

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Events;
    }
    exports.Backbone = exports.Backbone || Backbone;
  }

})();
/**
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * And modified to work with node.js
 */

(function() {

  var root = this;
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = raf;
    }
    exports.requestAnimationFrame = raf;
    return;
  }

  for (var x = 0; x < vendors.length && !root.requestAnimationFrame; ++x) {
    root.requestAnimationFrame = root[vendors[x]+'RequestAnimationFrame'];
    root.cancelAnimationFrame =
      root[vendors[x]+'CancelAnimationFrame'] || root[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!root.requestAnimationFrame)
    root.requestAnimationFrame = raf;

  if (!root.cancelAnimationFrame)
    root.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };

  function raf(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = root.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  }

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
    pow = Math.pow,
    min = Math.min,
    max = Math.max;

  /**
   * Localized variables
   */

  var count = 0;

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

    _.each(params, function(v, k) {
      if (k === 'fullscreen' || k === 'width' || k === 'height' || k === 'autostart') {
        return;
      }
      this[k] = v;
    }, this);

    // Specified domElement overrides type declaration.
    if (_.isElement(params.domElement)) {
      this.type = Two.Types[params.domElement.tagName.toLowerCase()];
    }

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
      dom.bind(root, 'resize', fitted);
      fitted();


    } else if (!_.isElement(params.domElement)) {

      this.renderer.setSize(params.width, params.height, this.ratio);
      this.width = params.width;
      this.height = params.height;

    }

    this.scene = this.renderer.scene;

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

    Version: 'v0.4.0',

    Identifier: 'two_',

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
      change: 'change',
      remove: 'remove',
      insert: 'insert'
    },

    Commands: {
      move: 'M',
      line: 'L',
      curve: 'C',
      close: 'Z'
    },

    Resolution: 8,

    Instances: [],

    noConflict: function() {
      root.Two = previousTwo;
      return this;
    },

    uniqueId: function() {
      var id = count;
      count++;
      return id;
    },

    Utils: {

      /**
       * Release an arbitrary class' events from the two.js corpus and recurse
       * through its children and or vertices.
       */
      release: function(obj) {

        if (!_.isObject(obj)) {
          return;
        }

        if (_.isFunction(obj.unbind)) {
          obj.unbind();
        }

        if (obj.vertices) {
          if (_.isFunction(obj.vertices.unbind)) {
            obj.vertices.unbind();
          }
          _.each(obj.vertices, function(v) {
            if (_.isFunction(v.unbind)) {
              v.unbind();
            }
          });
        }

        if (obj.children) {
          _.each(obj.children, function(obj) {
            Two.Utils.release(obj);
          });
        }

      },

      Curve: {

        CollinearityEpsilon: pow(10, -30),

        RecursionLimit: 16,

        CuspLimit: 0,

        Tolerance: {
          distance: 0.25,
          angle: 0,
          epsilon: 0.01
        },

        // Lookup tables for abscissas and weights with values for n = 2 .. 16.
        // As values are symmetric, only store half of them and adapt algorithm
        // to factor in symmetry.
        abscissas: [
          [  0.5773502691896257645091488],
          [0,0.7745966692414833770358531],
          [  0.3399810435848562648026658,0.8611363115940525752239465],
          [0,0.5384693101056830910363144,0.9061798459386639927976269],
          [  0.2386191860831969086305017,0.6612093864662645136613996,0.9324695142031520278123016],
          [0,0.4058451513773971669066064,0.7415311855993944398638648,0.9491079123427585245261897],
          [  0.1834346424956498049394761,0.5255324099163289858177390,0.7966664774136267395915539,0.9602898564975362316835609],
          [0,0.3242534234038089290385380,0.6133714327005903973087020,0.8360311073266357942994298,0.9681602395076260898355762],
          [  0.1488743389816312108848260,0.4333953941292471907992659,0.6794095682990244062343274,0.8650633666889845107320967,0.9739065285171717200779640],
          [0,0.2695431559523449723315320,0.5190961292068118159257257,0.7301520055740493240934163,0.8870625997680952990751578,0.9782286581460569928039380],
          [  0.1252334085114689154724414,0.3678314989981801937526915,0.5873179542866174472967024,0.7699026741943046870368938,0.9041172563704748566784659,0.9815606342467192506905491],
          [0,0.2304583159551347940655281,0.4484927510364468528779129,0.6423493394403402206439846,0.8015780907333099127942065,0.9175983992229779652065478,0.9841830547185881494728294],
          [  0.1080549487073436620662447,0.3191123689278897604356718,0.5152486363581540919652907,0.6872929048116854701480198,0.8272013150697649931897947,0.9284348836635735173363911,0.9862838086968123388415973],
          [0,0.2011940939974345223006283,0.3941513470775633698972074,0.5709721726085388475372267,0.7244177313601700474161861,0.8482065834104272162006483,0.9372733924007059043077589,0.9879925180204854284895657],
          [  0.0950125098376374401853193,0.2816035507792589132304605,0.4580167776572273863424194,0.6178762444026437484466718,0.7554044083550030338951012,0.8656312023878317438804679,0.9445750230732325760779884,0.9894009349916499325961542]
        ],

        weights: [
          [1],
          [0.8888888888888888888888889,0.5555555555555555555555556],
          [0.6521451548625461426269361,0.3478548451374538573730639],
          [0.5688888888888888888888889,0.4786286704993664680412915,0.2369268850561890875142640],
          [0.4679139345726910473898703,0.3607615730481386075698335,0.1713244923791703450402961],
          [0.4179591836734693877551020,0.3818300505051189449503698,0.2797053914892766679014678,0.1294849661688696932706114],
          [0.3626837833783619829651504,0.3137066458778872873379622,0.2223810344533744705443560,0.1012285362903762591525314],
          [0.3302393550012597631645251,0.3123470770400028400686304,0.2606106964029354623187429,0.1806481606948574040584720,0.0812743883615744119718922],
          [0.2955242247147528701738930,0.2692667193099963550912269,0.2190863625159820439955349,0.1494513491505805931457763,0.0666713443086881375935688],
          [0.2729250867779006307144835,0.2628045445102466621806889,0.2331937645919904799185237,0.1862902109277342514260976,0.1255803694649046246346943,0.0556685671161736664827537],
          [0.2491470458134027850005624,0.2334925365383548087608499,0.2031674267230659217490645,0.1600783285433462263346525,0.1069393259953184309602547,0.0471753363865118271946160],
          [0.2325515532308739101945895,0.2262831802628972384120902,0.2078160475368885023125232,0.1781459807619457382800467,0.1388735102197872384636018,0.0921214998377284479144218,0.0404840047653158795200216],
          [0.2152638534631577901958764,0.2051984637212956039659241,0.1855383974779378137417166,0.1572031671581935345696019,0.1215185706879031846894148,0.0801580871597602098056333,0.0351194603317518630318329],
          [0.2025782419255612728806202,0.1984314853271115764561183,0.1861610000155622110268006,0.1662692058169939335532009,0.1395706779261543144478048,0.1071592204671719350118695,0.0703660474881081247092674,0.0307532419961172683546284],
          [0.1894506104550684962853967,0.1826034150449235888667637,0.1691565193950025381893121,0.1495959888165767320815017,0.1246289712555338720524763,0.0951585116824927848099251,0.0622535239386478928628438,0.0271524594117540948517806]
        ]

      },

      /**
       * Account for high dpi rendering.
       * http://www.html5rocks.com/en/tutorials/canvas/hidpi/
       */

      devicePixelRatio: root.devicePixelRatio || 1,

      getBackingStoreRatio: function(ctx) {
        return ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1;
      },

      getRatio: function(ctx) {
        return Two.Utils.devicePixelRatio / getBackingStoreRatio(ctx);
      },

      /**
       * Properly defer play calling until after all objects
       * have been updated with their newest styles.
       */
      setPlaying: function(b) {

        this.playing = !!b;
        return this;

      },

      /**
       * Return the computed matrix of a nested object.
       * TODO: Optimize traversal.
       */
      getComputedMatrix: function(object, matrix) {

        matrix = (matrix && matrix.identity()) || new Two.Matrix();
        var parent = object, matrices = [];

        while (parent && parent._matrix) {
          matrices.push(parent._matrix);
          parent = parent.parent;
        }

        matrices.reverse();

        _.each(matrices, function(m) {

          var e = m.elements;
          matrix.multiply(
            e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9]);

        });

        return matrix;

      },

      deltaTransformPoint: function(matrix, x, y) {

        var dx = x * matrix.a + y * matrix.c + 0;
        var dy = x * matrix.b + y * matrix.d + 0;

        return new Two.Vector(dx, dy);

      },

      /**
       * https://gist.github.com/2052247
       */
      decomposeMatrix: function(matrix) {

        // calculate delta transform point
        var px = Two.Utils.deltaTransformPoint(matrix, 0, 1);
        var py = Two.Utils.deltaTransformPoint(matrix, 1, 0);

        // calculate skew
        var skewX = ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
        var skewY = ((180 / Math.PI) * Math.atan2(py.y, py.x));

        return {
            translateX: matrix.e,
            translateY: matrix.f,
            scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
            scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
            skewX: skewX,
            skewY: skewY,
            rotation: skewX // rotation is the same as skew x
        };

      },

      /**
       * Walk through item properties and pick the ones of interest.
       * Will try to resolve styles applied via CSS
       */
      applySvgAttributes: function(node, elem) {
        var attributes = {}, styles = {}, i, key, value, attr;

        // Not available in non browser environments
        if (getComputedStyle) {
          // Convert CSSStyleDeclaration to a normal object
          var computedStyles = getComputedStyle(node);
          i = computedStyles.length;

          while(i--) {
            key = computedStyles[i];
            value = computedStyles[key];
            // Gecko returns undefined for unset properties
            // Webkit returns the default value
            if (value !== undefined) {
              styles[key] = value;
            }
          }
        }

        // Convert NodeMap to a normal object
        i = node.attributes.length;
        while(i--) {
          attr = node.attributes[i];
          attributes[attr.nodeName] = attr.value;
        }

        // Getting the correct opacity is a bit tricky, since SVG path elements don't
        // support opacity as an attribute, but you can apply it via CSS.
        // So we take the opacity and set (stroke/fill)-opacity to the same value.
        if (!_.isUndefined(styles.opacity)) {
          styles['stroke-opacity'] = styles.opacity;
          styles['fill-opacity'] = styles.opacity;
        }

        // Merge attributes and applied styles (attributes take precedence)
        _.extend(styles, attributes);

        // Similarly visibility is influenced by the value of both display and visibility.
        // Calculate a unified value here which defaults to `true`.
        styles.visible = !(_.isUndefined(styles.display) && styles.display === 'none')
          || (_.isUndefined(styles.visibility) && styles.visibility === 'hidden');

        // Now iterate the whole thing
        for (key in styles) {
          value = styles[key];

          switch (key) {
            case 'transform':
              if (value === 'none') break;
              var m = node.getCTM();

              // Might happen when transform string is empty or not valid.
              if (m === null) break;

              // // Option 1: edit the underlying matrix and don't force an auto calc.
              // var m = node.getCTM();
              // elem._matrix.manual = true;
              // elem._matrix.set(m.a, m.b, m.c, m.d, m.e, m.f);

              // Option 2: Decompose and infer Two.js related properties.
              var transforms = Two.Utils.decomposeMatrix(node.getCTM());

              elem.translation.set(transforms.translateX, transforms.translateY);
              elem.rotation = transforms.rotation;
              // Warning: Two.js elements only support uniform scalars...
              elem.scale = transforms.scaleX;

              // Override based on attributes.
              if (styles.x) {
                elem.translation.x = styles.x;
              }

              if (styles.y) {
                elem.translation.y = styles.y;
              }

              break;
            case 'visible':
              elem.visible = value;
              break;
            case 'stroke-linecap':
              elem.cap = value;
              break;
            case 'stroke-linejoin':
              elem.join = value;
              break;
            case 'stroke-miterlimit':
              elem.miter = value;
              break;
            case 'stroke-width':
              elem.linewidth = parseFloat(value);
              break;
            case 'stroke-opacity':
            case 'fill-opacity':
            case 'opacity':
              elem.opacity = parseFloat(value);
              break;
            case 'fill':
            case 'stroke':
              elem[key] = (value === 'none') ? 'transparent' : value;
              break;
            case 'id':
              elem.id = value;
              break;
            case 'class':
              elem.classList = value.split(' ');
              break;
          }
        }

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

          // Switched up order to inherit more specific styles
          Two.Utils.applySvgAttributes(node, group);

          for (var i = 0, l = node.childNodes.length; i < l; i++) {
            var n = node.childNodes[i];
            var tag = n.nodeName;
            if (!tag) return;

            var tagName = tag.replace(/svg\:/ig, '').toLowerCase();

            if (tagName in Two.Utils.read) {
              var o = Two.Utils.read[tagName].call(this, n);
              group.add(o);
            }
          }

          return group;

        },

        polygon: function(node, open) {

          var points = node.getAttribute('points');

          var verts = [];
          points.replace(/(-?[\d\.?]+),(-?[\d\.?]+)/g, function(match, p1, p2) {
            verts.push(new Two.Anchor(parseFloat(p1), parseFloat(p2)));
          });

          var poly = new Two.Polygon(verts, !open).noStroke();
          poly.fill = 'black';

          return Two.Utils.applySvgAttributes(node, poly);

        },

        polyline: function(node) {
          return Two.Utils.read.polygon(node, true);
        },

        path: function(node) {

          var path = node.getAttribute('d');

          // Create a Two.Polygon from the paths.

          var coord = new Two.Anchor();
          var control, coords;
          var closed = false, relative = false;
          var commands = path.match(/[a-df-z][^a-df-z]*/ig);
          var last = commands.length - 1;

          // Split up polybeziers

          _.each(commands.slice(0), function(command, i) {

            var type = command[0];
            var lower = type.toLowerCase();
            var items = command.slice(1).trim().split(/[\s,]+|(?=\s?[+\-])/);
            var pre, post, result = [], bin;

            if (i <= 0) {
              commands = [];
            }

            switch (lower) {
              case 'h':
              case 'v':
                if (items.length > 1) {
                  bin = 1;
                }
                break;
              case 'm':
              case 'l':
              case 't':
                if (items.length > 2) {
                  bin = 2;
                }
                break;
              case 's':
              case 'q':
                if (items.length > 4) {
                  bin = 4;
                }
                break;
              case 'c':
                if (items.length > 6) {
                  bin = 6;
                }
                break;
              case 'a':
                // TODO: Handle Ellipses
                break;
            }

            if (bin) {

              for (var j = 0, l = items.length, times = 0; j < l; j+=bin) {

                var ct = type;
                if (times > 0) {

                  switch (type) {
                    case 'm':
                      ct = 'l';
                      break;
                    case 'M':
                      ct = 'L';
                      break;
                  }

                }

                result.push([ct].concat(items.slice(j, j + bin)).join(' '));
                times++;

              }

              commands = Array.prototype.concat.apply(commands, result);

            } else {

              commands.push(command);

            }

          });

          // Create the vertices for our Two.Polygon

          var points = _.flatten(_.map(commands, function(command, i) {

            var result, x, y;
            var type = command[0];
            var lower = type.toLowerCase();

            coords = command.slice(1).trim();
            coords = coords.replace(/(-?\d+(?:\.\d*)?)[eE]([+\-]?\d+)/g, function(match, n1, n2) {
              return parseFloat(n1) * pow(10, n2);
            });
            coords = coords.split(/[\s,]+|(?=\s?[+\-])/);
            relative = type === lower;

            var x1, y1, x2, y2, x3, y3, x4, y4, reflection;

            switch (lower) {

              case 'z':
                if (i >= last) {
                  closed = true;
                } else {
                  x = coord.x;
                  y = coord.y;
                  result = new Two.Anchor(
                    x, y,
                    undefined, undefined,
                    undefined, undefined,
                    Two.Commands.close
                  );
                }
                break;

              case 'm':
              case 'l':

                x = parseFloat(coords[0]);
                y = parseFloat(coords[1]);

                result = new Two.Anchor(
                  x, y,
                  undefined, undefined,
                  undefined, undefined,
                  lower === 'm' ? Two.Commands.move : Two.Commands.line
                );

                if (relative) {
                  result.addSelf(coord);
                }

                // result.controls.left.copy(result);
                // result.controls.right.copy(result);

                coord = result;
                break;

              case 'h':
              case 'v':

                var a = lower === 'h' ? 'x' : 'y';
                var b = a === 'x' ? 'y' : 'x';

                result = new Two.Anchor(
                  undefined, undefined,
                  undefined, undefined,
                  undefined, undefined,
                  Two.Commands.line
                );
                result[a] = parseFloat(coords[0]);
                result[b] = coord[b];

                if (relative) {
                  result[a] += coord[a];
                }

                // result.controls.left.copy(result);
                // result.controls.right.copy(result);

                coord = result;
                break;

              case 'c':
              case 's':

                x1 = coord.x;
                y1 = coord.y;

                if (!control) {
                  control = new Two.Vector();//.copy(coord);
                }

                if (lower === 'c') {

                  x2 = parseFloat(coords[0]);
                  y2 = parseFloat(coords[1]);
                  x3 = parseFloat(coords[2]);
                  y3 = parseFloat(coords[3]);
                  x4 = parseFloat(coords[4]);
                  y4 = parseFloat(coords[5]);

                } else {

                  // Calculate reflection control point for proper x2, y2
                  // inclusion.

                  reflection = getReflection(coord, control, relative);

                  x2 = reflection.x;
                  y2 = reflection.y;
                  x3 = parseFloat(coords[0]);
                  y3 = parseFloat(coords[1]);
                  x4 = parseFloat(coords[2]);
                  y4 = parseFloat(coords[3]);

                }

                if (relative) {
                  x2 += x1;
                  y2 += y1;
                  x3 += x1;
                  y3 += y1;
                  x4 += x1;
                  y4 += y1;
                }

                if (!_.isObject(coord.controls)) {
                  Two.Anchor.AppendCurveProperties(coord);
                }

                coord.controls.right.set(x2 - coord.x, y2 - coord.y);
                result = new Two.Anchor(
                  x4, y4,
                  x3 - x4, y3 - y4,
                  undefined, undefined,
                  Two.Commands.curve
                );

                coord = result;
                control = result.controls.left;

                break;

              case 't':
              case 'q':

                x1 = coord.x;
                y1 = coord.y;

                if (!control) {
                  control = new Two.Vector();//.copy(coord);
                }

                if (control.isZero()) {
                  x2 = x1;
                  y2 = y1;
                } else {
                  x2 = control.x;
                  y1 = control.y;
                }

                if (lower === 'q') {

                  x3 = parseFloat(coords[0]);
                  y3 = parseFloat(coords[1]);
                  x4 = parseFloat(coords[1]);
                  y4 = parseFloat(coords[2]);

                } else {

                  reflection = getReflection(coord, control, relative);

                  x3 = reflection.x;
                  y3 = reflection.y;
                  x4 = parseFloat(coords[0]);
                  y4 = parseFloat(coords[1]);

                }

                if (relative) {
                  x2 += x1;
                  y2 += y1;
                  x3 += x1;
                  y3 += y1;
                  x4 += x1;
                  y4 += y1;
                }

                if (!_.isObject(coord.controls)) {
                  Two.Anchor.AppendCurveProperties(coord);
                }

                coord.controls.right.set(x2 - coord.x, y2 - coord.y);
                result = new Two.Anchor(
                  x4, y4,
                  x3 - x4, y3 - y4,
                  undefined, undefined,
                  Two.Commands.curve
                );

                coord = result;
                control = result.controls.left;

                break;

              case 'a':
                throw new Two.Utils.Error('not yet able to interpret Elliptical Arcs.');
            }

            return result;

          }));

          if (points.length <= 1) {
            return;
          }

          points = _.compact(points);

          var poly = new Two.Polygon(points, closed, undefined, true).noStroke();
          poly.fill = 'black';

          return Two.Utils.applySvgAttributes(node, poly);

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
            return new Two.Anchor(x, y);
          }, this);

          var circle = new Two.Polygon(points, true, true).noStroke();
          circle.translation.set(x, y);
          circle.fill = 'black';

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
            return new Two.Anchor(x, y);
          }, this);

          var ellipse = new Two.Polygon(points, true, true).noStroke();
          ellipse.translation.set(x, y);
          ellipse.fill = 'black';

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
            new Two.Anchor(w2, h2),
            new Two.Anchor(-w2, h2),
            new Two.Anchor(-w2, -h2),
            new Two.Anchor(w2, -h2)
          ];

          var rect = new Two.Polygon(points, true).noStroke();
          rect.translation.set(x + w2, y + h2);
          rect.fill = 'black';

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
            new Two.Anchor(- w2, - h2),
            new Two.Anchor(w2, h2)
          ];

          // Center line and translate to desired position.

          var line = new Two.Polygon(points).noFill();
          line.translation.set(x1 + w2, y1 + h2);

          return Two.Utils.applySvgAttributes(node, line);

        }

      },

      /**
       * Given 2 points (a, b) and corresponding control point for each
       * return an array of points that represent points plotted along
       * the curve. Number points determined by limit.
       */
      subdivide: function(x1, y1, x2, y2, x3, y3, x4, y4, limit) {

        limit = limit || Two.Utils.Curve.RecursionLimit;
        var amount = limit + 1;

        // TODO: Issue 73
        // Don't recurse if the end points are identical
        if (x1 === x4 && y1 === y4) {
          return [new Two.Anchor(x4, y4)];
        }

        return _.map(_.range(0, amount), function(i) {

          var t = i / amount;
          var x = getPointOnCubicBezier(t, x1, x2, x3, x4);
          var y = getPointOnCubicBezier(t, y1, y2, y3, y4);

          return new Two.Anchor(x, y);

        });

      },

      getPointOnCubicBezier: function(t, a, b, c, d) {
        var k = 1 - t;
        return (k * k * k * a) + (3 * k * k * t * b) + (3 * k * t * t * c) +
           (t * t * t * d);
      },

      /**
       * Given 2 points (a, b) and corresponding control point for each
       * return a float that represents the length of the curve using
       * Gauss-Legendre algorithm. Limit iterations of calculation by `limit`.
       */
      getCurveLength: function(x1, y1, x2, y2, x3, y3, x4, y4, limit) {

        // TODO: Better / fuzzier equality check
        // Linear calculation
        if (x1 === x2 && y1 === y2 && x3 === x4 && y3 === y4) {
          var dx = x4 - x1;
          var dy = y4 - y1;
          return sqrt(dx * dx + dy * dy);
        }

        // Calculate the coefficients of a Bezier derivative.
        var ax = 9 * (x2 - x3) + 3 * (x4 - x1),
          bx = 6 * (x1 + x3) - 12 * x2,
          cx = 3 * (x2 - x1),

          ay = 9 * (y2 - y3) + 3 * (y4 - y1),
          by = 6 * (y1 + y3) - 12 * y2,
          cy = 3 * (y2 - y1);

        var integrand = function(t) {
          // Calculate quadratic equations of derivatives for x and y
          var dx = (ax * t + bx) * t + cx,
            dy = (ay * t + by) * t + cy;
          return sqrt(dx * dx + dy * dy);
        };

        return integrate(
          integrand, 0, 1, limit || Two.Utils.Curve.RecursionLimit
        );

      },

      /**
       * Integration for `getCurveLength` calculations. Referenced from
       * Paper.js: https://github.com/paperjs/paper.js/blob/master/src/util/Numerical.js#L101
       */
      integrate: function(f, a, b, n) {
        var x = Two.Utils.Curve.abscissas[n - 2],
          w = Two.Utils.Curve.weights[n - 2],
          A = 0.5 * (b - a),
          B = A + a,
          i = 0,
          m = (n + 1) >> 1,
          sum = n & 1 ? w[i++] * f(B) : 0; // Handle odd n
        while (i < m) {
          var Ax = A * x[i];
          sum += w[i++] * (f(B + Ax) + f(B - Ax));
        }
        return A * sum;
      },

      /**
       * Creates a set of points that have u, v values for anchor positions
       */
      getCurveFromPoints: function(points, closed) {

        var l = points.length, last = l - 1;

        for (var i = 0; i < l; i++) {

          var point = points[i];

          if (!_.isObject(point.controls)) {
            Two.Anchor.AppendCurveProperties(point);
          }

          var prev = closed ? mod(i - 1, l) : max(i - 1, 0);
          var next = closed ? mod(i + 1, l) : min(i + 1, last);

          var a = points[prev];
          var b = point;
          var c = points[next];
          getControlPoints(a, b, c);

          b._command = i === 0 ? Two.Commands.move : Two.Commands.curve;

          b.controls.left.x = _.isNumber(b.controls.left.x) ? b.controls.left.x : b.x;
          b.controls.left.y = _.isNumber(b.controls.left.y) ? b.controls.left.y : b.y;

          b.controls.right.x = _.isNumber(b.controls.right.x) ? b.controls.right.x : b.x;
          b.controls.right.y = _.isNumber(b.controls.right.y) ? b.controls.right.y : b.y;

        }

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

        b.u = _.isObject(b.controls.left) ? b.controls.left : new Two.Vector(0, 0);
        b.v = _.isObject(b.controls.right) ? b.controls.right : new Two.Vector(0, 0);

        // TODO: Issue 73
        if (d1 < 0.0001 || d2 < 0.0001) {
          if (!b._relative) {
            b.controls.left.copy(b);
            b.controls.right.copy(b);
          }
          return b;
        }

        d1 *= 0.33; // Why 0.33?
        d2 *= 0.33;

        if (a2 < a1) {
          mid += HALF_PI;
        } else {
          mid -= HALF_PI;
        }

        b.controls.left.x = cos(mid) * d1;
        b.controls.left.y = sin(mid) * d1;

        mid -= PI;

        b.controls.right.x = cos(mid) * d2;
        b.controls.right.y = sin(mid) * d2;

        if (!b._relative) {
          b.controls.left.x += b.x;
          b.controls.left.y += b.y;
          b.controls.right.x += b.x;
          b.controls.right.y += b.y;
        }

        return b;

      },

      /**
       * Get the reflection of a point "b" about point "a". Where "a" is in
       * absolute space and "b" is relative to "a".
       *
       * http://www.w3.org/TR/SVG11/implnote.html#PathElementImplementationNotes
       */
      getReflection: function(a, b, relative) {

        return new Two.Vector(
          2 * a.x - (b.x + a.x) - (relative ? a.x : 0),
          2 * a.y - (b.y + a.y) - (relative ? a.y : 0)
        );

      },

      angleBetween: function(A, B) {

        var dx, dy;

        if (arguments.length >= 4) {

          dx = arguments[0] - arguments[2];
          dy = arguments[1] - arguments[3];

          return atan2(dy, dx);

        }

        dx = A.x - B.x;
        dy = A.y - B.y;

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

      // A pretty fast toFixed(3) alternative
      // See http://jsperf.com/parsefloat-tofixed-vs-math-round/18
      toFixed: function(v) {
        return Math.floor(v * 1000) / 1000;
      },

      mod: function(v, l) {

        while (v < 0) {
          v += l;
        }

        return v % l;

      },

      /**
       * Array like collection that triggers inserted and removed events
       * removed : pop / shift / splice
       * inserted : push / unshift / splice (with > 2 arguments)
       */
      Collection: function() {

        Array.call(this);

        if (arguments.length > 1) {
          Array.prototype.push.apply(this, arguments);
        } else if( arguments[0] && Array.isArray(arguments[0]) ) {
          Array.prototype.push.apply(this, arguments[0]);
        }

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

  Two.Utils.Collection.prototype = new Array();
  Two.Utils.Collection.constructor = Two.Utils.Collection;

  _.extend(Two.Utils.Collection.prototype, Backbone.Events, {

    pop: function() {
      var popped = Array.prototype.pop.apply(this, arguments);
      this.trigger(Two.Events.remove, [popped]);
      return popped;
    },

    shift: function() {
      var shifted = Array.prototype.shift.apply(this, arguments);
      this.trigger(Two.Events.remove, [shifted]);
      return shifted;
    },

    push: function() {
      var pushed = Array.prototype.push.apply(this, arguments);
      this.trigger(Two.Events.insert, arguments);
      return pushed;
    },

    unshift: function() {
      var unshifted = Array.prototype.unshift.apply(this, arguments);
      this.trigger(Two.Events.insert, arguments);
      return unshifted;
    },

    splice: function() {
      var spliced = Array.prototype.splice.apply(this, arguments);
      var inserted;

      this.trigger(Two.Events.remove, spliced);

      if (arguments.length > 2) {
        inserted = this.slice(arguments[0], arguments.length-2);
        this.trigger(Two.Events.insert, inserted);
      }
      return spliced;
    }

  });

  // Localize utils

  var distanceBetween = Two.Utils.distanceBetween,
    distanceBetweenSquared = Two.Utils.distanceBetweenSquared,
    angleBetween = Two.Utils.angleBetween,
    getControlPoints = Two.Utils.getControlPoints,
    getCurveFromPoints = Two.Utils.getCurveFromPoints,
    solveSegmentIntersection = Two.Utils.solveSegmentIntersection,
    decoupleShapes = Two.Utils.decoupleShapes,
    mod = Two.Utils.mod,
    getBackingStoreRatio = Two.Utils.getBackingStoreRatio,
    getPointOnCubicBezier = Two.Utils.getPointOnCubicBezier,
    getCurveLength = Two.Utils.getCurveLength,
    integrate = Two.Utils.integrate,
    getReflection = Two.Utils.getReflection;

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
        renderer.setSize(width, height, this.ratio);
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

    remove: function(o) {

      var objects = o;
      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      this.scene.remove(objects);

      return this;

    },

    clear: function() {

      this.scene.remove(_.toArray(this.scene.children));
      return this;

    },

    makeLine: function(x1, y1, x2, y2) {

      var width = x2 - x1;
      var height = y2 - y1;

      var w2 = width / 2;
      var h2 = height / 2;

      var points = [
        new Two.Anchor(- w2, - h2),
        new Two.Anchor(w2, h2)
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
        new Two.Anchor(-w2, -h2),
        new Two.Anchor(w2, -h2),
        new Two.Anchor(w2, h2),
        new Two.Anchor(-w2, h2)
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
        return new Two.Anchor(x, y);
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
          points.push(new Two.Anchor(x, y));
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
          points.push(new Two.Anchor(x, y));
        }
      }

      var last = arguments[l - 1];
      var poly = new Two.Polygon(points, !(_.isBoolean(last) ? last : undefined));
      var rect = poly.getBoundingClientRect();
      poly.center().translation
        .set(rect.left + rect.width / 2, rect.top + rect.height / 2);

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
     * interprets them into something compatible for Two.js — this is slightly
     * different than a direct transcription.
     *
     * @param {Object} svgNode - The node to be parsed
     * @param {Boolean} noWrappingGroup - Don't create a top-most group but
     *                                    append all contents directly
     */
    interpret: function(svgNode, noWrapInGroup) {

      var tag = svgNode.tagName.toLowerCase();

      if (!(tag in Two.Utils.read)) {
        return null;
      }

      var node = Two.Utils.read[tag].call(this, svgNode);

      if (noWrapInGroup && node instanceof Two.Group) {
        this.add(_.values(node.children));
      } else {
        this.add(node);
      }

      return node;

    }

  });

  function fitToWindow() {

    var wr = document.body.getBoundingClientRect();

    var width = this.width = wr.width;
    var height = this.height = wr.height;

    this.renderer.setSize(width, height, this.ratio);
    this.trigger(Two.Events.resize, width, height);

  }

  function getNow() {
    return ((root.performance && root.performance.now)
      ? root.performance : Date).now();
  }

  // Request Animation Frame

  (function() {

    requestAnimationFrame(arguments.callee);

    Two.Instances.forEach(function(t) {

      if (t.playing) {
        t.update();
      }

    });

  })();

  //exports to multiple environments
  if (typeof define === 'function' && define.amd)
  //AMD
  define(function(){ return Two; });
  else if (typeof module != "undefined" && module.exports)
  //Node
  module.exports = Two;

})();

(function(Two) {

  var Vector = Two.Vector = function(x, y) {

    this.x = x || 0;
    this.y = y || 0;

  };

  _.extend(Vector, {

    zero: new Two.Vector()

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
      var dx = this.x - v.x,
          dy = this.y - v.y;
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
    },

    toString: function() {
      return this.x + ',' + this.y;
    },

    toObject: function() {
      return { x: this.x, y: this.y };
    }

  });

  var BoundProto = {

    set: function(x, y) {
      this._x = x;
      this._y = y;
      return this.trigger(Two.Events.change);
    },

    copy: function(v) {
      this._x = v.x;
      this._y = v.y;
      return this.trigger(Two.Events.change);
    },

    clear: function() {
      this._x = 0;
      this._y = 0;
      return this.trigger(Two.Events.change);
    },

    clone: function() {
      return new Vector(this._x, this._y);
    },

    add: function(v1, v2) {
      this._x = v1.x + v2.x;
      this._y = v1.y + v2.y;
      return this.trigger(Two.Events.change);
    },

    addSelf: function(v) {
      this._x += v.x;
      this._y += v.y;
      return this.trigger(Two.Events.change);
    },

    sub: function(v1, v2) {
      this._x = v1.x - v2.x;
      this._y = v1.y - v2.y;
      return this.trigger(Two.Events.change);
    },

    subSelf: function(v) {
      this._x -= v.x;
      this._y -= v.y;
      return this.trigger(Two.Events.change);
    },

    multiplySelf: function(v) {
      this._x *= v.x;
      this._y *= v.y;
      return this.trigger(Two.Events.change);
    },

    multiplyScalar: function(s) {
      this._x *= s;
      this._y *= s;
      return this.trigger(Two.Events.change);
    },

    divideScalar: function(s) {
      if (s) {
        this._x /= s;
        this._y /= s;
        return this.trigger(Two.Events.change);
      }
      return this.clear();
    },

    negate: function() {
      return this.multiplyScalar(-1);
    },

    dot: function(v) {
      return this._x * v.x + this._y * v.y;
    },

    lengthSquared: function() {
      return this._x * this._x + this._y * this._y;
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
      var dx = this._x - v.x,
          dy = this._y - v.y;
      return dx * dx + dy * dy;
    },

    setLength: function(l) {
      return this.normalize().multiplyScalar(l);
    },

    equals: function(v) {
      return (this.distanceTo(v) < 0.0001 /* almost same position */);
    },

    lerp: function(v, t) {
      var x = (v.x - this._x) * t + this._x;
      var y = (v.y - this._y) * t + this._y;
      return this.set(x, y);
    },

    isZero: function() {
      return (this.length() < 0.0001 /* almost zero */ );
    },

    toString: function() {
      return this._x + ',' + this._y;
    },

    toObject: function() {
      return { x: this._x, y: this._y };
    }

  };

  var xgs = {
    get: function() {
      return this._x;
    },
    set: function(v) {
      this._x = v;
      this.trigger(Two.Events.change, 'x');
    }
  };

  var ygs = {
    get: function() {
      return this._y;
    },
    set: function(v) {
      this._y = v;
      this.trigger(Two.Events.change, 'y');
    }
  };

  /**
   * Override Backbone bind / on in order to add properly broadcasting.
   * This allows Two.Vector to not broadcast events unless event listeners
   * are explicity bound to it.
   */

  Two.Vector.prototype.bind = Two.Vector.prototype.on = function() {

    if (!this._bound) {
      this._x = this.x;
      this._y = this.y;
      Object.defineProperty(this, 'x', xgs);
      Object.defineProperty(this, 'y', ygs);
      _.extend(this, BoundProto);
      this._bound = true; // Reserved for event initialization check
    }

    Backbone.Events.bind.apply(this, arguments);

    return this;

  };

})(Two);

(function(Two) {

  // Localized variables
  var commands = Two.Commands;

  /**
   * An object that holds 3 `Two.Vector`s, the anchor point and its
   * corresponding handles: `left` and `right`.
   */
  var Anchor = Two.Anchor = function(x, y, ux, uy, vx, vy, command) {

    Two.Vector.call(this, x, y);

    this._broadcast = _.bind(function() {
      this.trigger(Two.Events.change);
    }, this);

    this._command = command || commands.move;
    this._relative = true;

    if (!command) {
      return this;
    }

    Anchor.AppendCurveProperties(this);

    if (_.isNumber(ux)) {
      this.controls.left.x = ux;
    }
    if (_.isNumber(uy)) {
      this.controls.left.y = uy;
    }
    if (_.isNumber(vx)) {
      this.controls.right.x = vx;
    }
    if (_.isNumber(vy)) {
      this.controls.right.y = vy;
    }

  };

  _.extend(Anchor, {

    AppendCurveProperties: function(anchor) {
      anchor.controls = {
        left: new Two.Vector(0, 0),
        right: new Two.Vector(0, 0)
      };
    }

  });

  var AnchorProto = {

    listen: function() {

      if (!_.isObject(this.controls)) {
        Anchor.AppendCurveProperties(this);
      }

      this.controls.left.bind(Two.Events.change, this._broadcast);
      this.controls.right.bind(Two.Events.change, this._broadcast);

      return this;

    },

    ignore: function() {

      this.controls.left.unbind(Two.Events.change, this._broadcast);
      this.controls.right.unbind(Two.Events.change, this._broadcast);

      return this;

    },

    clone: function() {

      var controls = this.controls;

      var clone = new Two.Anchor(
        this.x,
        this.y,
        controls && controls.left.x,
        controls && controls.left.y,
        controls && controls.right.x,
        controls && controls.right.y,
        this.command
      );
      clone.relative = this._relative;
      return clone;

    },

    toObject: function() {
      var o = {
        x: this.x,
        y: this.y
      };
      if (this._command) {
        o.command = this._command;
      }
      if (this._relative) {
        o.relative = this._relative;
      }
      if (this.controls) {
        o.controls = {
          left: this.controls.left.toObject(),
          right: this.controls.right.toObject()
        };
      }
      return o;
    }

  };

  Object.defineProperty(Anchor.prototype, 'command', {

    get: function() {
      return this._command;
    },

    set: function(c) {
      this._command = c;
      if (this._command === commands.curve && !_.isObject(this.controls)) {
        Anchor.AppendCurveProperties(this);
      }
      return this.trigger(Two.Events.change);
    }

  });

  Object.defineProperty(Anchor.prototype, 'relative', {

    get: function() {
      return this._relative;
    },

    set: function(b) {
      if (this._relative == b) {
        return this;
      }
      this._relative = !!b;
      return this.trigger(Two.Events.change);
    }

  });

  _.extend(Anchor.prototype, Two.Vector.prototype, AnchorProto);

  // Make it possible to bind and still have the Anchor specific
  // inheritance from Two.Vector
  Two.Anchor.prototype.bind = Two.Anchor.prototype.on = function() {
    Two.Vector.prototype.bind.apply(this, arguments);
    _.extend(this, AnchorProto);
  };

  Two.Anchor.prototype.unbind = Two.Anchor.prototype.off = function() {
    Two.Vector.prototype.unbind.apply(this, arguments);
    _.extend(this, AnchorProto);
  };

})(Two);

(function(Two) {

  /**
   * Constants
   */
  var cos = Math.cos, sin = Math.sin, tan = Math.tan;

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
    Multiply: function(A, B, C) {

      if (B.length <= 3) { // Multiply Vector

        var x, y, z, e = A;

        var a = B[0] || 0,
            b = B[1] || 0,
            c = B[2] || 0;

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

      C = C || new Two.Array(9);

      C[0] = A0 * B0 + A1 * B3 + A2 * B6;
      C[1] = A0 * B1 + A1 * B4 + A2 * B7;
      C[2] = A0 * B2 + A1 * B5 + A2 * B8;
      C[3] = A3 * B0 + A4 * B3 + A5 * B6;
      C[4] = A3 * B1 + A4 * B4 + A5 * B7;
      C[5] = A3 * B2 + A4 * B5 + A5 * B8;
      C[6] = A6 * B0 + A7 * B3 + A8 * B6;
      C[7] = A6 * B1 + A7 * B4 + A8 * B7;
      C[8] = A6 * B2 + A7 * B5 + A8 * B8;

      return C;

    }

  });

  _.extend(Matrix.prototype, Backbone.Events, {

    /**
     * Takes an array of elements or the arguments list itself to
     * set and update the current matrix's elements. Only updates
     * specified values.
     */
    set: function(a) {

      var elements = a;
      if (!_.isArray(elements)) {
        elements = _.toArray(arguments);
      }

      _.extend(this.elements, elements);

      return this.trigger(Two.Events.change);

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

        return this.trigger(Two.Events.change);

      }

      if (l <= 3) { // Multiply Vector

        var x, y, z;
        a = a || 0;
        b = b || 0;
        c = c || 0;
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

      var A0 = A[0], A1 = A[1], A2 = A[2];
      var A3 = A[3], A4 = A[4], A5 = A[5];
      var A6 = A[6], A7 = A[7], A8 = A[8];

      var B0 = B[0], B1 = B[1], B2 = B[2];
      var B3 = B[3], B4 = B[4], B5 = B[5];
      var B6 = B[6], B7 = B[7], B8 = B[8];

      this.elements[0] = A0 * B0 + A1 * B3 + A2 * B6;
      this.elements[1] = A0 * B1 + A1 * B4 + A2 * B7;
      this.elements[2] = A0 * B2 + A1 * B5 + A2 * B8;

      this.elements[3] = A3 * B0 + A4 * B3 + A5 * B6;
      this.elements[4] = A3 * B1 + A4 * B4 + A5 * B7;
      this.elements[5] = A3 * B2 + A4 * B5 + A5 * B8;

      this.elements[6] = A6 * B0 + A7 * B3 + A8 * B6;
      this.elements[7] = A6 * B1 + A7 * B4 + A8 * B7;
      this.elements[8] = A6 * B2 + A7 * B5 + A8 * B8;

      return this.trigger(Two.Events.change);

    },

    inverse: function(out) {

      var a = this.elements;
      out = out || new Two.Matrix();

      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];

      var b01 = a22 * a11 - a12 * a21;
      var b11 = -a22 * a10 + a12 * a20;
      var b21 = a21 * a10 - a11 * a20;

      // Calculate the determinant
      var det = a00 * b01 + a01 * b11 + a02 * b21;

      if (!det) {
        return null;
      }

      det = 1.0 / det;

      out.elements[0] = b01 * det;
      out.elements[1] = (-a22 * a01 + a02 * a21) * det;
      out.elements[2] = (a12 * a01 - a02 * a11) * det;
      out.elements[3] = b11 * det;
      out.elements[4] = (a22 * a00 - a02 * a20) * det;
      out.elements[5] = (-a12 * a00 + a02 * a10) * det;
      out.elements[6] = b21 * det;
      out.elements[7] = (-a21 * a00 + a01 * a20) * det;
      out.elements[8] = (a11 * a00 - a01 * a10) * det;

      return out;

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
    toString: function(fullMatrix) {
      var temp = [];

      this.toArray(fullMatrix, temp);

      return temp.join(' ');

    },

    /**
     * Create a transform array to be used with rendering apis.
     */
    toArray: function(fullMatrix, output) {

     var elements = this.elements;
     var hasOutput = !!output;

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

        if (hasOutput) {
          output[0] = a;
          output[1] = d;
          output[2] = g;
          output[3] = b;
          output[4] = e;
          output[5] = h;
          output[6] = c;
          output[7] = f;
          output[8] = i;
          return;
        }

        return [
          a, d, g, b, e, h, c, f, i
        ];
      }

      if (hasOutput) {
        output[0] = a;
        output[1] = d;
        output[2] = b;
        output[3] = e;
        output[4] = c;
        output[5] = f;
        return;
      }

      return [
        a, d, b, e, c, f  // Specific format see LN:19
      ];

    },

    /**
     * Clone the current matrix.
     */
    clone: function() {
      var a, b, c, d, e, f, g, h, i;

      a = this.elements[0];
      b = this.elements[1];
      c = this.elements[2];
      d = this.elements[3];
      e = this.elements[4];
      f = this.elements[5];
      g = this.elements[6];
      h = this.elements[7];
      i = this.elements[8];

      return new Two.Matrix(a, b, c, d, e, f, g, h, i);

    }

  });

})(Two);

(function(Two) {

  // Localize variables
  var mod = Two.Utils.mod, toFixed = Two.Utils.toFixed;

  var svg = {

    version: 1.1,

    ns: 'http://www.w3.org/2000/svg',
    xlink: 'http://www.w3.org/1999/xlink',

    /**
     * Create an svg namespaced element.
     */
    createElement: function(name, attrs) {
      var tag = name;
      var elem = document.createElementNS(this.ns, tag);
      if (tag === 'svg') {
        attrs = _.defaults(attrs || {}, {
          version: this.version
        });
      }
      if (_.isObject(attrs)) {
        svg.setAttributes(elem, attrs);
      }
      return elem;
    },

    /**
     * Add attributes from an svg element.
     */
    setAttributes: function(elem, attrs) {
      for (var key in attrs) {
        elem.setAttribute(key, attrs[key]);
      }
      return this;
    },

    /**
     * Remove attributes from an svg element.
     */
    removeAttributes: function(elem, attrs) {
      for (var key in attrs) {
        elem.removeAttribute(key);
      }
      return this;
    },

    /**
     * Turn a set of vertices into a string for the d property of a path
     * element. It is imperative that the string collation is as fast as
     * possible, because this call will be happening multiple times a
     * second.
     */
    toString: function(points, closed) {

      var l = points.length,
        last = l - 1,
        d, // The elusive last Two.Commands.move point
        ret = '';

      for (var i = 0; i < l; i++) {
        var b = points[i];
        var command;
        var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
        var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

        var a = points[prev];
        var c = points[next];

        var vx, vy, ux, uy, ar, bl, br, cl;

        // Access x and y directly,
        // bypassing the getter
        var x = toFixed(b._x);
        var y = toFixed(b._y);

        switch (b._command) {

          case Two.Commands.close:
            command = Two.Commands.close;
            break;

          case Two.Commands.curve:

            ar = (a.controls && a.controls.right) || a;
            bl = (b.controls && b.controls.left) || b;

            if (a._relative) {
              vx = toFixed((ar.x + a.x));
              vy = toFixed((ar.y + a.y));
            } else {
              vx = toFixed(ar.x);
              vy = toFixed(ar.y);
            }

            if (b._relative) {
              ux = toFixed((bl.x + b.x));
              uy = toFixed((bl.y + b.y));
            } else {
              ux = toFixed(bl.x);
              uy = toFixed(bl.y);
            }

            command = ((i === 0) ? Two.Commands.move : Two.Commands.curve) +
              ' ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;
            break;

          case Two.Commands.move:
            d = b;
            command = Two.Commands.move + ' ' + x + ' ' + y;
            break;

          default:
            command = b._command + ' ' + x + ' ' + y;

        }

        // Add a final point and close it off

        if (i >= last && closed) {

          if (b._command === Two.Commands.curve) {

            // Make sure we close to the most previous Two.Commands.move
            c = d;

            br = (b.controls && b.controls.right) || b;
            cl = (c.controls && c.controls.left) || c;

            if (b._relative) {
              vx = toFixed((br.x + b.x));
              vy = toFixed((br.y + b.y));
            } else {
              vx = toFixed(br.x);
              vy = toFixed(br.y);
            }

            if (c._relative) {
              ux = toFixed((cl.x + c.x));
              uy = toFixed((cl.y + c.y));
            } else {
              ux = toFixed(cl.x);
              uy = toFixed(cl.y);
            }

            x = toFixed(c.x);
            y = toFixed(c.y);

            command +=
              ' C ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;
          }

          command += ' Z';

        }

        ret += command + ' ';

      }

      return ret;

    },

    getClip: function(shape) {

      clip = shape._renderer.clip;

      if (!clip) {

        root = shape;

        while (root.parent) {
          root = root.parent;
        }

        clip = shape._renderer.clip = svg.createElement('clipPath');
        root.defs.appendChild(clip);

      }

      return clip;

    },

    group: {

      // TODO: Can speed up.
      // TODO: How does this effect a f
      appendChild: function(id) {

        var elem = this.domElement.querySelector('#' + id);

        if (!elem) {
          return;
        }

        var tag = elem.nodeName;

        if (!tag) {
          return;
        }

        var tagName = tag.replace(/svg\:/ig, '').toLowerCase();

        // Defer additions while clipping
        if (/clippath/.test(tagName)) {
          return;
        }

        this.elem.appendChild(elem);

      },

      // TODO: Can speed up.
      removeChild: function(id) {

        var elem = this.domElement.querySelector('#' + id);

        if (!elem) {
          return;
        }

        var tag = elem.nodeName;

        if (!tag) {
          return;
        }

        var tagName = tag.replace(/svg\:/ig, '').toLowerCase();

        // Defer subtractions while clipping
        if (/clippath/.test(tagName)) {
          return;
        }

        this.elem.removeChild(elem);

      },

      renderChild: function(child) {
        svg[child._renderer.type].render.call(child, this);
      },

      render: function(domElement) {

        this._update();

        // Shortcut for hidden objects.
        // Doesn't reset the flags, so changes are stored and
        // applied once the object is visible again
        if (this._opacity === 0 && !this._flagOpacity) {
          return this;
        }

        if (!this._renderer.elem) {
          this._renderer.elem = svg.createElement('g', {
            id: this.id
          });
          domElement.appendChild(this._renderer.elem);
        }

        // _Update styles for the <g>
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        var context = {
          domElement: domElement,
          elem: this._renderer.elem
        };

        if (flagMatrix) {
          this._renderer.elem.setAttribute('transform', 'matrix(' + this._matrix.toString() + ')');
        }

        for (var id in this.children) {
          var child = this.children[id];
          svg[child._renderer.type].render.call(child, domElement);
        }

        if (this._flagOpacity) {
          this._renderer.elem.setAttribute('opacity', this._opacity);
        }

        if (this._flagAdditions) {
          _.each(this.additions, svg.group.appendChild, context);
        }

        if (this._flagSubtractions) {
          _.each(this.subtractions, svg.group.removeChild, context);
        }

        /**
         * Commented two-way functionality of clips / masks with groups and
         * polygons. Uncomment when this bug is fixed:
         * https://code.google.com/p/chromium/issues/detail?id=370951
         */

        // if (this._flagClip) {

        //   clip = svg.getClip(this);
        //   elem = this._renderer.elem;

        //   if (this._clip) {
        //     elem.removeAttribute('id');
        //     clip.setAttribute('id', this.id);
        //     clip.appendChild(elem);
        //   } else {
        //     clip.removeAttribute('id');
        //     elem.setAttribute('id', this.id);
        //     this.parent._renderer.elem.appendChild(elem); // TODO: should be insertBefore
        //   }

        // }

        if (this._flagMask) {
          if (this._mask) {
            this._renderer.elem.setAttribute('clip-path', 'url(#' + this._mask.id + ')');
          } else {
            this._renderer.elem.removeAttribute('clip-path');
          }
        }

        return this.flagReset();

      }

    },

    polygon: {

      render: function(domElement) {

        this._update();

        // Shortcut for hidden objects.
        // Doesn't reset the flags, so changes are stored and
        // applied once the object is visible again
        if (this._opacity === 0 && !this._flagOpacity) {
          return this;
        }

        // Collect any attribute that needs to be changed here
        var changed = {};

        var flagMatrix = this._matrix.manual || this._flagMatrix;

        if (flagMatrix) {
          changed.transform = 'matrix(' + this._matrix.toString() + ')';
        }

        if (this._flagVertices) {
          var vertices = svg.toString(this._vertices, this._closed);
          changed.d = vertices;
        }

        if (this._flagFill) {
          changed.fill = this._fill;
        }

        if (this._flagStroke) {
          changed.stroke = this._stroke;
        }

        if (this._flagLinewidth) {
          changed['stroke-width'] = this._linewidth;
        }

        if (this._flagOpacity) {
          changed['stroke-opacity'] = this._opacity;
          changed['fill-opacity'] = this._opacity;
        }

        if (this._flagVisible) {
          changed.visibility = this._visible ? 'visible' : 'hidden';
        }

        if (this._flagCap) {
          changed['stroke-linecap'] = this._cap;
        }

        if (this._flagJoin) {
          changed['stroke-linejoin'] = this._join;
        }

        if (this._flagMiter) {
          changed['stroke-miterlimit'] = this.miter;
        }

        // If there is no attached DOM element yet,
        // create it with all necessary attributes.
        if (!this._renderer.elem) {

          changed.id = this.id;
          this._renderer.elem = svg.createElement('path', changed);
          domElement.appendChild(this._renderer.elem);

        // Otherwise apply all pending attributes
        } else {
          svg.setAttributes(this._renderer.elem, changed);
        }

        if (this._flagClip) {

          clip = svg.getClip(this);
          elem = this._renderer.elem;

          if (this._clip) {
            elem.removeAttribute('id');
            clip.setAttribute('id', this.id);
            clip.appendChild(elem);
          } else {
            clip.removeAttribute('id');
            elem.setAttribute('id', this.id);
            this.parent._renderer.elem.appendChild(elem); // TODO: should be insertBefore
          }

        }

        /**
         * Commented two-way functionality of clips / masks with groups and
         * polygons. Uncomment when this bug is fixed:
         * https://code.google.com/p/chromium/issues/detail?id=370951
         */

        // if (this._flagMask) {
        //   if (this._mask) {
        //     elem.setAttribute('clip-path', 'url(#' + this._mask.id + ')');
        //   } else {
        //     elem.removeAttribute('clip-path');
        //   }
        // }

        return this.flagReset();

      }

    }

  };

  /**
   * @class
   */
  var Renderer = Two[Two.Types.svg] = function(params) {

    this.domElement = params.domElement || svg.createElement('svg');

    this.scene = new Two.Group();
    this.scene.parent = this;

    this.defs = svg.createElement('defs');
    this.domElement.appendChild(this.defs);

  };

  _.extend(Renderer, {

    Utils: svg

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

    render: function() {

      svg.group.render.call(this.scene, this.domElement);

      return this;

    }

  });

})(Two);

(function(Two) {

  /**
   * Constants
   */
  var mod = Two.Utils.mod, toFixed = Two.Utils.toFixed;
  var getRatio = Two.Utils.getRatio;

  var canvas = {

    group: {

      renderChild: function(child) {
        canvas[child._renderer.type].render.call(child, this.ctx, true, this.clip);
      },

      render: function(ctx) {

        // TODO: Add a check here to only invoke _update if need be.
        this._update();

        var matrix = this._matrix.elements;
        var parent = this.parent;
        this._renderer.opacity = this._opacity
          * (parent && parent._renderer ? parent._renderer.opacity : 1);

        var mask = this._mask;
        // var clip = this._clip;

        if (!this._renderer.context) {
          this._renderer.context = {};
        }

        this._renderer.context.ctx = ctx;
        // this._renderer.context.clip = clip;

        ctx.save();

        ctx.transform(
          matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5]);

        if (mask) {
          canvas[mask._renderer.type].render.call(mask, ctx, true);
        }

        _.each(this.children, canvas.group.renderChild, this._renderer.context);

        ctx.restore();

       /**
         * Commented two-way functionality of clips / masks with groups and
         * polygons. Uncomment when this bug is fixed:
         * https://code.google.com/p/chromium/issues/detail?id=370951
         */

        // if (clip) {
        //   ctx.clip();
        // }

        return this.flagReset();

      }

    },

    polygon: {

      render: function(ctx, forced, parentClipped) {

        var matrix, stroke, linewidth, fill, opacity, visible, cap, join, miter,
            closed, commands, length, last, next, prev, a, c, d, ux, uy, vx, vy,
            ar, bl, br, cl, x, y, mask, clip;

        // TODO: Add a check here to only invoke _update if need be.
        this._update();

        matrix = this._matrix.elements;
        stroke = this._stroke;
        linewidth = this._linewidth;
        fill = this._fill;
        opacity = this._opacity * this.parent._renderer.opacity;
        visible = this._visible;
        cap = this._cap;
        join = this._join;
        miter = this._miter;
        closed = this._closed;
        commands = this._vertices; // Commands
        length = commands.length;
        last = length - 1;

        // mask = this._mask;
        clip = this._clip;

        if (!forced && (!visible || clip)) {
          return this;
        }

        // Transform

        ctx.save();

        if (matrix) {
          ctx.transform(
            matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5]);
        }

       /**
         * Commented two-way functionality of clips / masks with groups and
         * polygons. Uncomment when this bug is fixed:
         * https://code.google.com/p/chromium/issues/detail?id=370951
         */

        // if (mask) {
        //   canvas[mask._renderer.type].render.call(mask, ctx, true);
        // }

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
        commands.forEach(function(b, i) {

          x = toFixed(b.x);
          y = toFixed(b.y);

          switch (b._command) {

            case Two.Commands.close:
              ctx.closePath();
              break;

            case Two.Commands.curve:

              prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
              next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

              a = commands[prev];
              c = commands[next];
              ar = (a.controls && a.controls.right) || a;
              bl = (b.controls && b.controls.left) || b;

              if (a._relative) {
                vx = (ar.x + toFixed(a.x));
                vy = (ar.y + toFixed(a.y));
              } else {
                vx = toFixed(ar.x);
                vy = toFixed(ar.y);
              }

              if (b._relative) {
                ux = (bl.x + toFixed(b.x));
                uy = (bl.y + toFixed(b.y));
              } else {
                ux = toFixed(bl.x);
                uy = toFixed(bl.y);
              }

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

              if (i >= last && closed) {

                c = d;

                br = (b.controls && b.controls.right) || b;
                cl = (c.controls && c.controls.left) || c;

                if (b._relative) {
                  vx = (br.x + toFixed(b.x));
                  vy = (br.y + toFixed(b.y));
                } else {
                  vx = toFixed(br.x);
                  vy = toFixed(br.y);
                }

                if (c._relative) {
                  ux = (cl.x + toFixed(c.x));
                  uy = (cl.y + toFixed(c.y));
                } else {
                  ux = toFixed(cl.x);
                  uy = toFixed(cl.y);
                }

                x = toFixed(c.x);
                y = toFixed(c.y);

                ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

              }

              break;

            case Two.Commands.line:
              ctx.lineTo(x, y);
              break;

            case Two.Commands.move:
              d = b;
              ctx.moveTo(x, y);
              break;

          }

        });

        // Loose ends

        if (closed) {
          ctx.closePath();
        }

        if (!clip && !parentClipped) {
          ctx.fill();
          ctx.stroke();
        }

        ctx.restore();

        if (clip && !parentClipped) {
          ctx.clip();
        }

        return this.flagReset();

      }

    }

  };

  var Renderer = Two[Two.Types.canvas] = function(params) {

    this.domElement = params.domElement || document.createElement('canvas');
    this.ctx = this.domElement.getContext('2d');
    this.overdraw = params.overdraw || false;

    // Everything drawn on the canvas needs to be added to the scene.
    this.scene = new Two.Group();
    this.scene.parent = this;

  };

  _.extend(Renderer, {

    Utils: canvas

  });

  _.extend(Renderer.prototype, Backbone.Events, {

    setSize: function(width, height, ratio) {

      this.width = width;
      this.height = height;

      this.ratio = _.isUndefined(ratio) ? getRatio(this.ctx) : ratio;

      this.domElement.width = width * this.ratio;
      this.domElement.height = height * this.ratio;

      _.extend(this.domElement.style, {
        width: width + 'px',
        height: height + 'px'
      });

      return this;

    },

    render: function() {

      var isOne = this.ratio === 1;

      if (!isOne) {
        this.ctx.save();
        this.ctx.scale(this.ratio, this.ratio);
      }

      if (!this.overdraw) {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }

      canvas.group.render.call(this.scene, this.ctx);

      if (!isOne) {
        this.ctx.restore();
      }

      return this;

    }

  });

  function resetTransform(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

})(Two);

(function(Two) {

  /**
   * Constants
   */

  var multiplyMatrix = Two.Matrix.Multiply,
    mod = Two.Utils.mod,
    identity = [1, 0, 0, 0, 1, 0, 0, 0, 1],
    transformation = new Two.Array(9),
    getRatio = Two.Utils.getRatio,
    toFixed = Two.Utils.toFixed;

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

    group: {

      renderChild: function(child) {
        webgl[child._renderer.type].render.call(child, this.gl, this.program);
      },

      render: function(gl, program) {

        this._update();

        var parent = this.parent;
        var flagParentMatrix = (parent._matrix && parent._matrix.manual) || parent._flagMatrix;
        var flagMatrix = this._matrix.manual || this._flagMatrix;

        if (flagParentMatrix || flagMatrix) {

          if (!this._renderer.matrix) {
            this._renderer.matrix = new Two.Array(9);
          }

          // Reduce amount of object / array creation / deletion
          this._matrix.toArray(true, transformation);

          multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
          this._renderer.scale = this._scale * parent._renderer.scale;

          if (flagParentMatrix) {
            this._flagMatrix = true;
          }

        }

        if (this._mask) {

          gl.enable(gl.STENCIL_TEST);
          gl.stencilFunc(gl.ALWAYS, 1, 1);

          gl.colorMask(false, false, false, true);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);

          webgl[this._mask._renderer.type].render.call(this._mask, gl, program, this);

          gl.colorMask(true, true, true, true);
          gl.stencilFunc(gl.NOTEQUAL, 0, 1);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);

        }

        this._flagOpacity = parent._flagOpacity || this._flagOpacity;

        this._renderer.opacity = this._opacity
          * (parent && parent._renderer ? parent._renderer.opacity : 1);

        _.each(this.children, webgl.group.renderChild, {
          gl: gl,
          program: program
        });

        if (this._mask) {

          gl.colorMask(false, false, false, false);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);

          webgl[this._mask._renderer.type].render.call(this._mask, gl, program, this);

          gl.colorMask(true, true, true, true);
          gl.stencilFunc(gl.NOTEQUAL, 0, 1);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);

          gl.disable(gl.STENCIL_TEST);

        }

        return this.flagReset();

      }

    },

    polygon: {

      render: function(gl, program, forcedParent) {

        if (!this._visible || !this._opacity) {
          return this;
        }

        // Calculate what changed

        var parent = this.parent;
        var flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        var flagTexture = this._flagVertices || this._flagFill
          || this._flagStroke || this._flagLinewidth || this._flagOpacity
          || parent._flagOpacity || this._flagVisible || this._flagCap
          || this._flagJoin || this._flagMiter || this._flagScale;

        this._update();

        if (flagParentMatrix || flagMatrix) {

          if (!this._renderer.matrix) {
            this._renderer.matrix = new Two.Array(9);
          }

          // Reduce amount of object / array creation / deletion

          this._matrix.toArray(true, transformation);

          multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
          this._renderer.scale = this._scale * parent._renderer.scale;

        }

        if (flagTexture) {

          if (!this._renderer.rect) {
            this._renderer.rect = {};
          }

          if (!this._renderer.triangles) {
            this._renderer.triangles = new Two.Array(12);
          }

          this._renderer.opacity = this._opacity * parent._renderer.opacity;

          webgl.getBoundingClientRect(this._vertices, this._linewidth, this._renderer.rect);
          webgl.getTriangles(this._renderer.rect, this._renderer.triangles);

          webgl.updateBuffer(gl, this, program);
          webgl.updateTexture(gl, this);

        }

        // if (this._mask) {
        //   webgl[this._mask._renderer.type].render.call(mask, gl, program, this);
        // }

        if (this._clip && !forcedParent) {
          return;
        }

        // Draw Texture

        gl.bindBuffer(gl.ARRAY_BUFFER, this._renderer.textureCoordsBuffer);

        gl.vertexAttribPointer(program.textureCoords, 2, gl.FLOAT, false, 0, 0);

        gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);


        // Draw Rect

        gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._renderer.buffer);

        gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        return this.flagReset();

      }

    },

    /**
     * Returns the rect of a set of verts. Typically takes vertices that are
     * "centered" around 0 and returns them to be anchored upper-left.
     */
    getBoundingClientRect: function(vertices, border, rect) {

      var left = Infinity, right = -Infinity,
          top = Infinity, bottom = -Infinity,
          width, height;

      vertices.forEach(function(v) {

        var x = v.x, y = v.y, controls = v.controls;
        var a, b, c, d, cl, cr;

        top = Math.min(y, top);
        left = Math.min(x, left);
        right = Math.max(x, right);
        bottom = Math.max(y, bottom);

        if (!v.controls) {
          return;
        }

        cl = controls.left;
        cr = controls.right;

        if (!cl || !cr) {
          return;
        }

        a = v._relative ? cl.x + x : cl.x;
        b = v._relative ? cl.y + y : cl.y;
        c = v._relative ? cr.x + x : cr.x;
        d = v._relative ? cr.y + y : cr.y;

        if (!a || !b || !c || !d) {
          return;
        }

        top = Math.min(b, d, top);
        left = Math.min(a, c, left);
        right = Math.max(a, c, right);
        bottom = Math.max(b, d, bottom);

      });

      // Expand borders

      if (_.isNumber(border)) {
        top -= border;
        left -= border;
        right += border;
        bottom += border;
      }

      width = right - left;
      height = bottom - top;

      rect.top = top;
      rect.left = left;
      rect.right = right;
      rect.bottom = bottom;
      rect.width = width;
      rect.height = height;

      if (!rect.centroid) {
        rect.centroid = {};
      }

      rect.centroid.x = - left;
      rect.centroid.y = - top;

    },

    getTriangles: function(rect, triangles) {

      var top = rect.top,
          left = rect.left,
          right = rect.right,
          bottom = rect.bottom;

      // First Triangle

      triangles[0] = left;
      triangles[1] = top;

      triangles[2] = right;
      triangles[3] = top;

      triangles[4] = left;
      triangles[5] = bottom;

      // Second Triangle

      triangles[6] = left;
      triangles[7] = bottom;

      triangles[8] = right;
      triangles[9] = top;

      triangles[10] = right;
      triangles[11] = bottom;

    },

    updateCanvas: function(elem) {

      var commands = elem._vertices;
      var canvas = this.canvas;
      var ctx = this.ctx;

      // Styles
      var scale = elem._renderer.scale;
      var stroke = elem._stroke;
      var linewidth = elem._linewidth * scale;
      var fill = elem._fill;
      var opacity = elem._renderer.opacity || elem._opacity;
      var cap = elem._cap;
      var join = elem._join;
      var miter = elem._miter;
      var closed = elem._closed;
      var length = commands.length;
      var last = length - 1;

      canvas.width = Math.max(Math.ceil(elem._renderer.rect.width * scale), 1);
      canvas.height = Math.max(Math.ceil(elem._renderer.rect.height * scale), 1);

      var centroid = elem._renderer.rect.centroid;
      var cx = centroid.x * scale;
      var cy = centroid.y * scale;

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

      var d;
      ctx.beginPath();
      commands.forEach(function(b, i) {

        var next, prev, a, c, ux, uy, vx, vy, ar, bl, br, cl, x, y;
        x = toFixed(b.x * scale + cx);
        y = toFixed(b.y * scale + cy);

        switch (b._command) {

          case Two.Commands.close:
            ctx.closePath();
            break;

          case Two.Commands.curve:

            prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
            next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

            a = commands[prev];
            c = commands[next];
            ar = (a.controls && a.controls.right) || a;
            bl = (b.controls && b.controls.left) || b;

            if (a._relative) {
              vx = toFixed((ar.x + a.x) * scale + cx);
              vy = toFixed((ar.y + a.y) * scale + cy);
            } else {
              vx = toFixed(ar.x * scale + cx);
              vy = toFixed(ar.y * scale + cy);
            }

            if (b._relative) {
              ux = toFixed((bl.x + b.x) * scale + cx);
              uy = toFixed((bl.y + b.y) * scale + cy);
            } else {
              ux = toFixed(bl.x * scale + cx);
              uy = toFixed(bl.y * scale + cy);
            }

            ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            if (i >= last && closed) {

              c = d;

              br = (b.controls && b.controls.right) || b;
              cl = (c.controls && c.controls.left) || c;

              if (b._relative) {
                vx = toFixed((br.x + b.x) * scale + cx);
                vy = toFixed((br.y + b.y) * scale + cy);
              } else {
                vx = toFixed(br.x * scale + cx);
                vy = toFixed(br.y * scale + cy);
              }

              if (c._relative) {
                ux = toFixed((cl.x + c.x) * scale + cx);
                uy = toFixed((cl.y + c.y) * scale + cy);
              } else {
                ux = toFixed(cl.x * scale + cx);
                uy = toFixed(cl.y * scale + cy);
              }

              x = toFixed(c.x * scale + cx);
              y = toFixed(c.y * scale + cy);

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            }

            break;

          case Two.Commands.line:
            ctx.lineTo(x, y);
            break;

          case Two.Commands.move:
            d = b;
            ctx.moveTo(x, y);
            break;

        }

      });

      // Loose ends

      if (closed) {
        ctx.closePath();
      }

      ctx.fill();
      ctx.stroke();

    },

    updateTexture: function(gl, elem) {

      this.updateCanvas(elem);

      if (elem._renderer.texture) {
        gl.deleteTexture(elem._renderer.texture);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, elem._renderer.textureCoordsBuffer);

      elem._renderer.texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, elem._renderer.texture);

      // Set the parameters so we can render any size image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      if (this.canvas.width <= 0 || this.canvas.height <= 0) {
        return;
      }

      // Upload the image into the texture.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);

    },

    updateBuffer: function(gl, elem, program) {

      if (_.isObject(elem._renderer.buffer)) {
        gl.deleteBuffer(elem._renderer.buffer);
      }

      elem._renderer.buffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem._renderer.buffer);
      gl.enableVertexAttribArray(program.position);

      gl.bufferData(gl.ARRAY_BUFFER, elem._renderer.triangles, gl.STATIC_DRAW);

      if (_.isObject(elem._renderer.textureCoordsBuffer)) {
        gl.deleteBuffer(elem._renderer.textureCoordsBuffer);
      }

      elem._renderer.textureCoordsBuffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem._renderer.textureCoordsBuffer);
      gl.enableVertexAttribArray(program.textureCoords);

      gl.bufferData(gl.ARRAY_BUFFER, this.uv, gl.STATIC_DRAW);

    },

    program: {

      create: function(gl, shaders) {
        var program, linked, error;
        program = gl.createProgram();
        _.each(shaders, function(s) {
          gl.attachShader(program, s);
        });

        gl.linkProgram(program);
        linked = gl.getProgramParameter(program, gl.LINK_STATUS);
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
        var shader, compiled, error;
        shader = gl.createShader(gl[type]);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
          error = gl.getShaderInfoLog(shader);
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
        '   vec2 projected = (u_matrix * vec3(a_position, 1.0)).xy;',
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

    var params, gl, vs, fs;
    this.domElement = options.domElement || document.createElement('canvas');

    // Everything drawn on the canvas needs to come from the stage.
    this.scene = new Two.Group();
    this.scene.parent = this;

    this._renderer = {
      matrix: new Two.Array(identity),
      scale: 1,
      opacity: 1
    };
    this._flagMatrix = true;

    // http://games.greggman.com/game/webgl-and-alpha/
    // http://www.khronos.org/registry/webgl/specs/latest/#5.2
    params = _.defaults(options || {}, {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      stencil: true,
      preserveDrawingBuffer: true,
      overdraw: false
    });

    this.overdraw = params.overdraw;

    gl = this.ctx = this.domElement.getContext('webgl', params) ||
      this.domElement.getContext('experimental-webgl', params);

    if (!this.ctx) {
      throw new Two.Utils.Error(
        'unable to create a webgl context. Try using another renderer.');
    }

    // Compile Base Shaders to draw in pixel space.
    vs = webgl.shaders.create(
      gl, webgl.shaders.vertex, webgl.shaders.types.vertex);
    fs = webgl.shaders.create(
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

    // https://code.google.com/p/chromium/issues/detail?id=316393
    // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, gl.TRUE);

    gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE, gl.ONE_MINUS_SRC_ALPHA );

  };

  _.extend(Renderer.prototype, Backbone.Events, {

    setSize: function(width, height, ratio) {

      this.width = width;
      this.height = height;

      this.ratio = _.isUndefined(ratio) ? getRatio(this.ctx) : ratio;

      this.domElement.width = width * this.ratio;
      this.domElement.height = height * this.ratio;

      _.extend(this.domElement.style, {
        width: width + 'px',
        height: height + 'px'
      });

      width *= this.ratio;
      height *= this.ratio;

      // Set for this.stage parent scaling to account for HDPI
      this._renderer.matrix[0] = this._renderer.matrix[4] = this._renderer.scale = this.ratio;

      this._flagMatrix = true;

      this.ctx.viewport(0, 0, width, height);

      var resolutionLocation = this.ctx.getUniformLocation(
        this.program, 'u_resolution');
      this.ctx.uniform2f(resolutionLocation, width, height);

      return this;

    },

    render: function() {

      var gl = this.ctx;

      if (!this.overdraw) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }

      webgl.group.render.call(this.scene, gl, this.program);
      this._flagMatrix = false;

      return this;

    }

  });

})(Two);

(function(Two) {

  var Shape = Two.Shape = function() {

    // Private object for renderer specific variables.
    this._renderer = {};

    this.id = Two.Identifier + Two.uniqueId();
    this.classList = [];

    // Define matrix properties which all inherited
    // objects of Shape have.

    this._matrix = new Two.Matrix();

    this.translation = new Two.Vector();
    this.translation.bind(Two.Events.change, _.bind(Shape.FlagMatrix, this));
    this.rotation = 0;
    this.scale = 1;

  };

  _.extend(Shape, Backbone.Events, {

    FlagMatrix: function() {
      this._flagMatrix = true;
    },

    MakeObservable: function(object) {

      Object.defineProperty(object, 'rotation', {
        get: function() {
          return this._rotation;
        },
        set: function(v) {
          this._rotation = v;
          this._flagMatrix = true;
        }
      });

      Object.defineProperty(object, 'scale', {
        get: function() {
          return this._scale;
        },
        set: function(v) {
          this._scale = v;
          this._flagMatrix = true;
          this._flagScale = true;
        }
      });

    }

  });

  _.extend(Shape.prototype, {

    // Flags

    _flagMatrix: true,

    // _flagMask: false,
    // _flagClip: false,

    // Underlying Properties

    _rotation: 0,
    _scale: 1,

    // _mask: null,
    // _clip: false,

    addTo: function(group) {
      group.add(this);
      return this;
    },

    clone: function() {
      var clone = new Shape();
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      _.each(Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      return clone._update();
    },

    /**
     * Set the parent of this object to another object
     * and updates parent-child relationships
     * Calling with no arguments will simply remove the parenting
     */
    replaceParent: function(newParent) {
        var id = this.id, index;
        // Release object from previous parent.
        if (this.parent) {
          delete this.parent.children[id];
          index = _.indexOf(parent.additions, id);
          if (index >= 0) {
            this.parent.additions.splice(index, 1);
          }
          this.parent.subtractions.push(id);
          this._flagSubtractions = true;
        }

        if (newParent) {
          // Add it to this group and update parent-child relationship.
          newParent.children[id] = this;
          this.parent = newParent;
          newParent.additions.push(id);
          newParent._flagAdditions = true;
        } else {
          delete this.parent;
        }
        return this;
    },

    /**
     * To be called before render that calculates and collates all information
     * to be as up-to-date as possible for the render. Called once a frame.
     */
    _update: function(deep) {

      if (!this._matrix.manual && this._flagMatrix) {
        this._matrix
          .identity()
          .translate(this.translation.x, this.translation.y)
          .scale(this.scale)
          .rotate(this.rotation);

      }

      if (deep) {
        // Bubble up to parents mainly for `getBoundingClientRect` method.
        if (this.parent && this.parent._update) {
          this.parent._update();
        }
      }

      return this;

    },

    flagReset: function() {

      this._flagMatrix = this._flagScale = false;

      return this;

    }

  });

  Shape.MakeObservable(Shape.prototype);

})(Two);

(function(Two) {

  /**
   * Constants
   */

  var min = Math.min, max = Math.max, round = Math.round,
    getComputedMatrix = Two.Utils.getComputedMatrix;

  var commands = {};

  _.each(Two.Commands, function(v, k) {
    commands[k] = new RegExp(v);
  });

  var Polygon = Two.Polygon = function(vertices, closed, curved, manual) {

    Two.Shape.call(this);

    this._renderer.type = 'polygon';

    this._closed = !!closed;
    this._curved = !!curved;

    this.beginning = 0;
    this.ending = 1;

    // Style properties

    this.fill = '#fff';
    this.stroke = '#000';
    this.linewidth = 1.0;
    this.opacity = 1.0;
    this.visible = true;

    this.cap = 'butt';      // Default of Adobe Illustrator
    this.join = 'miter';    // Default of Adobe Illustrator
    this.miter = 4;         // Default of Adobe Illustrator

    this._vertices = [];
    this.vertices = vertices;

    // Determines whether or not two.js should calculate curves, lines, and
    // commands automatically for you or to let the developer manipulate them
    // for themselves.
    this.automatic = !manual;

  };

  _.extend(Polygon, {

    Properties: [
      'fill',
      'stroke',
      'linewidth',
      'opacity',
      'visible',
      'cap',
      'join',
      'miter',

      'closed',
      'curved',
      'automatic',
      'beginning',
      'ending'
    ],

    FlagVertices: function() {
      this._flagVertices = true;
      this._flagLength = true;
    },

    MakeObservable: function(object) {

      Two.Shape.MakeObservable(object);

      // Only the first 8 properties are flagged like this. The subsequent
      // properties behave differently and need to be hand written.
      _.each(Polygon.Properties.slice(0, 8), function(property) {

        var secret = '_' + property;
        var flag = '_flag' + property.charAt(0).toUpperCase() + property.slice(1);

        Object.defineProperty(object, property, {
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            this[flag] = true;
          }
        });

      });

      Object.defineProperty(object, 'length', {
        get: function() {
          if (this._flagLength) {
            this._updateLength();
          }
          return this._length;
        }
      });

      Object.defineProperty(object, 'closed', {
        get: function() {
          return this._closed;
        },
        set: function(v) {
          this._closed = !!v;
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'curved', {
        get: function() {
          return this._curved;
        },
        set: function(v) {
          this._curved = !!v;
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'automatic', {
        get: function() {
          return this._automatic;
        },
        set: function(v) {
          if (v === this._automatic) {
            return;
          }
          this._automatic = !!v;
          var method = this._automatic ? 'ignore' : 'listen';
          _.each(this.vertices, function(v) {
            v[method]();
          });
        }
      });

      Object.defineProperty(object, 'beginning', {
        get: function() {
          return this._beginning;
        },
        set: function(v) {
          this._beginning = min(max(v, 0.0), this._ending);
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'ending', {
        get: function() {
          return this._ending;
        },
        set: function(v) {
          this._ending = min(max(v, this._beginning), 1.0);
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'vertices', {

        get: function() {
          return this._collection;
        },

        set: function(vertices) {

          var updateVertices = _.bind(Polygon.FlagVertices, this);

          var bindVerts = _.bind(function(items) {

            // This function is called a lot
            // when importing a large SVG
            var i = items.length;
            while(i--) {
              items[i].bind(Two.Events.change, updateVertices);
            }

            updateVertices();

          }, this);

          var unbindVerts = _.bind(function(items) {

            _.each(items, function(v) {
              v.unbind(Two.Events.change, updateVertices);
            }, this);

            updateVertices();

          }, this);

          // Remove previous listeners
          if (this._collection) {
            this._collection.unbind();
          }

          // Create new Collection with copy of vertices
          this._collection = new Two.Utils.Collection(vertices.slice(0));

          // Listen for Collection changes and bind / unbind
          this._collection.bind(Two.Events.insert, bindVerts);
          this._collection.bind(Two.Events.remove, unbindVerts);

          // Bind Initial Vertices
          bindVerts(this._collection);

        }

      });

      Object.defineProperty(object, 'clip', {
        get: function() {
          return this._clip;
        },
        set: function(v) {
          this._clip = v;
          this._flagClip = true;
        }
      });

    }

  });

  _.extend(Polygon.prototype, Two.Shape.prototype, {

    // Flags
    // http://en.wikipedia.org/wiki/Flag

    _flagVertices: true,
    _flagLength: true,

    _flagFill: true,
    _flagStroke: true,
    _flagLinewidth: true,
    _flagOpacity: true,
    _flagVisible: true,

    _flagCap: true,
    _flagJoin: true,
    _flagMiter: true,

    _flagClip: false,

    // Underlying Properties

    _length: 0,

    _fill: '#fff',
    _stroke: '#000',
    _linewidth: 1.0,
    _opacity: 1.0,
    _visible: true,

    _cap: 'round',
    _join: 'round',
    _miter: 4,

    _closed: true,
    _curved: false,
    _automatic: true,
    _beginning: 0,
    _ending: 1.0,

    _clip: false,

    clone: function(parent) {

      parent = parent || this.parent;

      var points = _.map(this.vertices, function(v) {
        return v.clone();
      });

      var clone = new Polygon(points, this.closed, this.curved, !this.automatic);

      _.each(Two.Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      parent.add(clone);

      return clone;

    },

    toObject: function() {

      var result = {
        vertices: _.map(this.vertices, function(v) {
          return v.toObject();
        })
      };

      _.each(Two.Shape.Properties, function(k) {
        result[k] = this[k];
      }, this);

      result.translation = this.translation.toObject;
      result.rotation = this.rotation;
      result.scale = this.scale;

      return result;

    },

    noFill: function() {
      this.fill = 'transparent';
      return this;
    },

    noStroke: function() {
      this.stroke = 'transparent';
      return this;
    },

    /**
     * Orient the vertices of the shape to the upper lefthand
     * corner of the polygon.
     */
    corner: function() {

      var rect = this.getBoundingClientRect(true);

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      _.each(this.vertices, function(v) {
        v.addSelf(rect.centroid);
      });

      return this;

    },

    /**
     * Orient the vertices of the shape to the center of the
     * polygon.
     */
    center: function() {

      var rect = this.getBoundingClientRect(true);

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      _.each(this.vertices, function(v) {
        v.subSelf(rect.centroid);
      });

      // this.translation.addSelf(rect.centroid);

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

    /**
     * Return an object with top, left, right, bottom, width, and height
     * parameters of the group.
     */
    getBoundingClientRect: function(shallow) {

      // TODO: Update this to not __always__ update. Just when it needs to.
      this._update(true);

      var matrix = !!shallow ? this._matrix : getComputedMatrix(this);

      var border = this.linewidth / 2, x, y;
      var left = Infinity, right = -Infinity,
          top = Infinity, bottom = -Infinity;


      _.each(this._vertices, function(v) {
        x = v.x;
        y = v.y;
        v = matrix.multiply(x, y , 1);
        top = min(v.y - border, top);
        left = min(v.x - border, left);
        right = max(v.x + border, right);
        bottom = max(v.y + border, bottom);
      });

      return {
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: right - left,
        height: bottom - top
      };

    },

    /**
     * Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s
     * coordinates to that percentage on this Two.Polygon's curve.
     */
    getPointAt: function(t, obj) {
      var x, x1, x2, x3, x4, y, y1, y2, y3, y4, left, right;
      var target = this.length * Math.min(Math.max(t, 0), 1);
      var length = this.vertices.length;
      var last = length - 1;

      var a = null;
      var b = null;

      for (var i = 0, l = this._lengths.length, sum = 0; i < l; i++) {

        if (sum + this._lengths[i] > target) {
          a = this.vertices[this.closed ? Two.Utils.mod(i, length) : i];
          b = this.vertices[Math.min(Math.max(i - 1, 0), last)];
          target -= sum;
          t = target / this._lengths[i];
          break;
        }

        sum += this._lengths[i];

      }

      if (_.isNull(a) || _.isNull(b)) {
        return null;
      }

      right = b.controls && b.controls.right;
      left = a.controls && a.controls.left;

      x1 = b.x;
      y1 = b.y;
      x2 = (right || b).x;
      y2 = (right || b).y;
      x3 = (left || a).x;
      y3 = (left || a).y;
      x4 = a.x;
      y4 = a.y;

      if (right && b._relative) {
        x2 += b.x;
        y2 += b.y;
      }

      if (left && a._relative) {
        x3 += a.x;
        y3 += a.y;
      }

      x = Two.Utils.getPointOnCubicBezier(t, x1, x2, x3, x4);
      y = Two.Utils.getPointOnCubicBezier(t, y1, y2, y3, y4);

      if (_.isObject(obj)) {
        obj.x = x;
        obj.y = y;
        return obj;
      }

      return new Two.Vector(x, y);

    },

    /**
     * Based on closed / curved and sorting of vertices plot where all points
     * should be and where the respective handles should be too.
     */
    plot: function() {

      if (this.curved) {
        Two.Utils.getCurveFromPoints(this._vertices, this.closed);
        return this;
      }

      for (var i = 0; i < this._vertices.length; i++) {
        this._vertices[i]._command = i === 0 ? Two.Commands.move : Two.Commands.line;
      }

      return this;

    },

    subdivide: function(limit) {
      //TODO: DRYness (function below)
      this._update();

      var last = this.vertices.length - 1;
      var b = this.vertices[last];
      var closed = this._closed || this.vertices[last]._command === Two.Commands.close;
      var points = [];
      _.each(this.vertices, function(a, i) {

        if (i <= 0 && !closed) {
          b = a;
          return;
        }

        if (a.command === Two.Commands.move) {
          points.push(new Two.Anchor(b.x, b.y));
          if (i > 0) {
            points[points.length - 1].command = Two.Commands.line;
          }
          b = a;
          return;
        }

        var verts = getSubdivisions(a, b, limit);
        points = points.concat(verts);

        // Assign commands to all the verts
        _.each(verts, function(v, i) {
          if (i <= 0 && b.command === Two.Commands.move) {
            v.command = Two.Commands.move;
          } else {
            v.command = Two.Commands.line;
          }
        });

        if (i >= last) {

          // TODO: Add check if the two vectors in question are the same values.
          if (this._closed && this._automatic) {

            b = a;

            verts = getSubdivisions(a, b, limit);
            points = points.concat(verts);

            // Assign commands to all the verts
            _.each(verts, function(v, i) {
              if (i <= 0 && b.command === Two.Commands.move) {
                v.command = Two.Commands.move;
              } else {
                v.command = Two.Commands.line;
              }
            });

          } else if (closed) {
            points.push(new Two.Anchor(a.x, a.y));
          }

          points[points.length - 1].command = closed ? Two.Commands.close : Two.Commands.line;

        }

        b = a;

      }, this);

      this._automatic = false;
      this._curved = false;
      this.vertices = points;

      return this;

    },

    _updateLength: function(limit) {
      //TODO: DRYness (function above)
      this._update();

      var last = this.vertices.length - 1;
      var b = this.vertices[last];
      var closed = this._closed || this.vertices[last]._command === Two.Commands.close;
      var sum = 0;

      if (_.isUndefined(this._lengths)) {
        this._lengths = [];
      }

      _.each(this.vertices, function(a, i) {

        if ((i <= 0 && !closed) || a.command === Two.Commands.move) {
          b = a;
          this._lengths[i] = 0;
          return;
        }

        this._lengths[i] = getCurveLength(a, b, limit);
        sum += this._lengths[i];

        if (i >= last && closed) {

          b = a;

          this._lengths[i + 1] = getCurveLength(a, b, limit);
          sum += this._lengths[i + 1];

        }

        b = a;

      }, this);

      this._length = sum;

      return this;

    },

    _update: function() {

      if (this._flagVertices) {

        var l = this.vertices.length;
        var last = l - 1, v;

        var ia = round((this._beginning) * last);
        var ib = round((this._ending) * last);

        this._vertices.length = 0;

        for (var i = ia; i < ib + 1; i++) {
          v = this.vertices[i];
          this._vertices.push(v);
        }

        if (this._automatic) {
          this.plot();
        }

      }

      Two.Shape.prototype._update.call(this);

      return this;

    },

    flagReset: function() {

      this._flagVertices =  this._flagFill =  this._flagStroke =
         this._flagLinewidth = this._flagOpacity = this._flagVisible =
         this._flagCap = this._flagJoin = this._flagMiter = 
         this._flagClip = false;

      Two.Shape.prototype.flagReset.call(this);

      return this;

    }

  });

  Polygon.MakeObservable(Polygon.prototype);

  /**
   * Utility functions
   */

  function getCurveLength(a, b, limit) {
    // TODO: DRYness
    var x1, x2, x3, x4, y1, y2, y3, y4;

    var right = b.controls && b.controls.right;
    var left = a.controls && a.controls.left;

    x1 = b.x;
    y1 = b.y;
    x2 = (right || b).x;
    y2 = (right || b).y;
    x3 = (left || a).x;
    y3 = (left || a).y;
    x4 = a.x;
    y4 = a.y;

    if (right && b._relative) {
      x2 += b.x;
      y2 += b.y;
    }

    if (left && a._relative) {
      x3 += a.x;
      y3 += a.y;
    }

    return Two.Utils.getCurveLength(x1, y1, x2, y2, x3, y3, x4, y4, limit);

  }

  function getSubdivisions(a, b, limit) {
    // TODO: DRYness
    var x1, x2, x3, x4, y1, y2, y3, y4;

    var right = b.controls && b.controls.right;
    var left = a.controls && a.controls.left;

    x1 = b.x;
    y1 = b.y;
    x2 = (right || b).x;
    y2 = (right || b).y;
    x3 = (left || a).x;
    y3 = (left || a).y;
    x4 = a.x;
    y4 = a.y;

    if (right && b._relative) {
      x2 += b.x;
      y2 += b.y;
    }

    if (left && a._relative) {
      x3 += a.x;
      y3 += a.y;
    }

    return Two.Utils.subdivide(x1, y1, x2, y2, x3, y3, x4, y4, limit);

  }

})(Two);

(function(Two) {

  /**
   * Constants
   */
  var min = Math.min, max = Math.max;

  var Group = Two.Group = function() {

    Two.Shape.call(this, true);

    this._renderer.type = 'group';

    this.additions = [];
    this.subtractions = [];

    this.children = {};

  };

  _.extend(Group, {

    MakeObservable: function(object) {

      var properties = Two.Polygon.Properties.slice(0);
      var oi = _.indexOf(properties, 'opacity');

      if (oi >= 0) {

        properties.splice(oi, 1);

        Object.defineProperty(object, 'opacity', {

          get: function() {
            return this._opacity;
          },

          set: function(v) {
            this._opacity = v;
            this._flagOpacity = true;
          }

        });

      }

      Two.Shape.MakeObservable(object);
      Group.MakeGetterSetters(object, properties);

      Object.defineProperty(object, 'mask', {
        get: function() {
          return this._mask;
        },
        set: function(v) {
          this._mask = v;
          this._flagMask = true;
          if (!v.clip) {
            v.clip = true;
          }
        }
      });

    },

    MakeGetterSetters: function(group, properties) {

      if (!_.isArray(properties)) {
        properties = [properties];
      }

      _.each(properties, function(k) {
        Group.MakeGetterSetter(group, k);
      });

    },

    MakeGetterSetter: function(group, k) {

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

    }

  });

  _.extend(Group.prototype, Two.Shape.prototype, {

    // Flags
    // http://en.wikipedia.org/wiki/Flag

    _flagAdditions: false,
    _flagSubtractions: false,
    _flagOpacity: true,

    _flagMask: false,

    // Underlying Properties

    _fill: '#fff',
    _stroke: '#000',
    _linewidth: 1.0,
    _opacity: 1.0,
    _visible: true,

    _cap: 'round',
    _join: 'round',
    _miter: 4,

    _closed: true,
    _curved: false,
    _automatic: true,
    _beginning: 0,
    _ending: 1.0,

    _mask: null,

    /**
     * TODO: Group has a gotcha in that it's at the moment required to be bound to
     * an instance of two in order to add elements correctly. This needs to
     * be rethought and fixed.
     */
    clone: function(parent) {

      parent = parent || this.parent;

      var group = new Group();
      parent.add(group);

      var children = _.map(this.children, function(child) {
        return child.clone(group);
      });

      group.translation.copy(this.translation);
      group.rotation = this.rotation;
      group.scale = this.scale;

      return group;

    },

    toObject: function() {

      var result = {
        children: {},
        translation: this.translation.toObject(),
        rotation: this.rotation,
        scale: this.scale
      };

      _.each(this.children, function(child, i) {
        result.children[i] = child.toObject();
      }, this);

      return result;

    },

    /**
     * Anchor all children to the upper left hand corner
     * of the group.
     */
    corner: function() {

      var rect = this.getBoundingClientRect(true),
       corner = { x: rect.left, y: rect.top };

      _.each(this.children, function(child) {
        child.translation.subSelf(corner);
      });

      return this;

    },

    /**
     * Anchors all children around the center of the group,
     * effectively placing the shape around the unit circle.
     */
    center: function() {

      var rect = this.getBoundingClientRect(true);

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      _.each(this.children, function(child) {
        child.translation.subSelf(rect.centroid);
      });

      // this.translation.copy(rect.centroid);

      return this;

    },

    /**
     * Recursively search for id. Returns the first element found.
     * Returns null if none found.
     */
    getById: function (id) {
      var search = function (node, id) {
        if (node.id === id) {
          return node;
        }
        for (var child in node.children) {
          var found = search(node.children[child], id);
          if (found) return found;
        }
      };
      return search(this, id) || null;
    },

    /**
     * Recursively search for classes. Returns an array of matching elements.
     * Empty array if none found.
     */
    getByClassName: function (cl) {
      var found = [];
      var search = function (node, cl) {
        if (node.classList.indexOf(cl) != -1) {
          found.push(node);
        }
        for (var child in node.children) {
          search(node.children[child], cl);
        }
        return found;
      };
      return search(this, cl);
    },

    /**
     * Recursively search for children of a specific type,
     * e.g. Two.Polygon. Pass a reference to this type as the param.
     * Returns an empty array if none found.
     */
    getByType: function(type) {
      var found = [];
      var search = function (node, type) {
        for (var id in node.children) {
          if (node.children[id] instanceof type) {
            found.push(node.children[id]);
          } else if (node.children[id] instanceof Two.Group) {
            search(node.children[id], type);
          }
        }
        return found;
      };
      return search(this, type);
    },

    /**
     * Add objects to the group.
     */
    add: function(objects) {

      var l = arguments.length,
        children = this.children,
        grandparent = this.parent,
        ids = this.additions,
        id, parent, index;

      if (!_.isArray(objects)) {
        objects = _.toArray(arguments);
      }

      // Add the objects

      _.each(objects, function(object) {

        if (!object) {
          return;
        }

        id = object.id;
        parent = object.parent;

        if (_.isUndefined(children[id])) {
          // Release object from previous parent.
          if (parent) {
            delete parent.children[id];
            index = _.indexOf(parent.additions, id);
            if (index >= 0) {
              parent.additions.splice(index, 1);
            }
          }
          // Add it to this group and update parent-child relationship.
          children[id] = object;
          object.parent = this;
          ids.push(id);
          this._flagAdditions = true;
        }

      }, this);

      return this;

    },

    /**
     * Remove objects from the group.
     */
    remove: function(objects) {

      var l = arguments.length,
        children = this.children,
        grandparent = this.parent,
        ids = this.subtractions,
        id, parent, index, grandchildren;

      if (l <= 0 && grandparent) {
        grandparent.remove(this);
        return this;
      }

      if (!_.isArray(objects)) {
        objects = _.toArray(arguments);
      }

      _.each(objects, function(object) {

        id = object.id;
        grandchildren = object.children;
        parent = object.parent;

        if (!(id in children)) {
          return;
        }

        delete children[id];
        delete object.parent;

        index = _.indexOf(parent.additions, id);
        if (index >= 0) {
          parent.additions.splice(index, 1);
        }

        ids.push(id);
        this._flagSubtractions = true;

      }, this);

      return this;

    },

    /**
     * Return an object with top, left, right, bottom, width, and height
     * parameters of the group.
     */
    getBoundingClientRect: function() {
      var rect;

      // TODO: Update this to not __always__ update. Just when it needs to.
      this._update(true);

      // Variables need to be defined here, because of nested nature of groups.
      var left = Infinity, right = -Infinity,
          top = Infinity, bottom = -Infinity;

      _.each(this.children, function(child) {

        rect = child.getBoundingClientRect();

        if (!_.isNumber(rect.top)   || !_.isNumber(rect.left)   ||
            !_.isNumber(rect.right) || !_.isNumber(rect.bottom)) {
          return;
        }

        top = min(rect.top, top);
        left = min(rect.left, left);
        right = max(rect.right, right);
        bottom = max(rect.bottom, bottom);

      }, this);

      return {
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: right - left,
        height: bottom - top
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
    },

    /**
     * Trickle down subdivide
     */
    subdivide: function() {
      var args = arguments;
      _.each(this.children, function(child) {
        child.subdivide.apply(child, args);
      });
      return this;
    },

    flagReset: function() {

      if (this._flagAdditions) {
        this.additions.length = 0;
        this._flagAdditions = false;
      }

      if (this._flagSubtractions) {
        this.subtractions.length = 0;
        this._flagSubtractions = false;
      }

      this._flagMask = this._flagOpacity = false;

      Two.Shape.prototype.flagReset.call(this);

      return this;

    }

  });

  Group.MakeObservable(Group.prototype);

})(Two);
