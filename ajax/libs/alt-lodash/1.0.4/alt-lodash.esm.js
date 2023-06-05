function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/**
 * Creates an array of elements split into groups the length of chunkSize.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The array to process.
 * @param {number} [chunkSize=1] - The length of each chunk.
 * @param {T[][]} [cache=[]] - The array to store the chunked elements.
 * @returns {T[][]} - The new array of chunks.
 *
 * @example
 *
 * chunk([1, 2, 3, 4, 5], 2);
 * // returns [[1, 2], [3, 4], [5]]
 *
 * chunk([1, 2, 3, 4, 5], 3);
 * // returns [[1, 2, 3], [4, 5]]
 *
 * chunk([1, 2, 3, 4, 5], 0);
 * // returns []
 */
var chunk = function chunk(array, chunkSize, cache) {
  if (chunkSize === void 0) {
    chunkSize = 1;
  }
  if (cache === void 0) {
    cache = [];
  }
  var tmp = [].concat(array);
  if (chunkSize <= 0) {
    return cache;
  }
  while (tmp.length) {
    cache.push(tmp.splice(0, chunkSize));
  }
  return cache;
};

/**
 * Creates a new array with all falsey values removed. The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The array to compact.
 * @returns {T[]} - Returns the new array of filtered values.
 *
 * @example
 * const arr = [0, 1, false, 2, '', 3];
 * const result = compact(arr);
 * console.log(result);
 * // expected output: [1, 2, 3]
 */
var compact = function compact(array) {
  return array.filter(function (x) {
    return !!x;
  });
};

// interface Concat {
// 	<T>(array: T[], ...restArray: T[]): T[];
// 	<T>(array: T[], collection2: T | T[], ...restArray: T[]): T[];
// 	<T>(array: T[], collection2: T | T[], collection3: T | T[], ...restArray: T[]): T[];
// }
/**
 * Concatenates two or more arrays into a new array
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The first array to concatenate
 * @param {...any[]} restArray - The rest of the arrays to concatenate
 * @returns {T[]} - A new array that contains all the elements from the input arrays
 *
 * @example
 *
 * const arr1 = [1, 2, 3];
 * const arr2 = [4, 5, 6];
 * const arr3 = [7, 8, 9];
 *
 * const result = concat(arr1, arr2, arr3);
 * console.log(result); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
var concat = function concat(array) {
  var newArray = [];
  newArray = newArray.concat(array);
  for (var _len = arguments.length, restArray = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restArray[_key - 1] = arguments[_key];
  }
  restArray.forEach(function (c) {
    newArray = newArray.concat(c);
  });
  return [].concat(newArray);
};

/**
 * Creates an array of unique values that are included in the first given array and not included in the rest of the given arrays.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[] | null | undefined} array - The array to inspect.
 * @param {...T[][]} restArray - The arrays to exclude values.
 * @returns {T[]} - The new array of filtered values.
 *
 * @example
 *
 * difference([2, 1], [2, 3]); // -> [1]
 * difference([1, 2, 3], [2, 3, 4], [3, 4, 5]); // -> [1]
 * difference([1, 2, 3], [4, 5, 6]); // -> [1, 2, 3]
 * difference([], [1, 2, 3]); // -> []
 * difference(null, [1, 2, 3]); // -> []
 */
var difference = function difference(array) {
  if (array === null || array === undefined) return [];
  for (var _len = arguments.length, restArray = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restArray[_key - 1] = arguments[_key];
  }
  var valuesToExclude = new Set(restArray.flat(Infinity));
  return array.filter(function (value) {
    return !valuesToExclude.has(value);
  });
};

/**
 * Returns the first argument it receives.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} value - The value to return.
 *
 * @returns {T} - Returns the input value.
 *
 * @example
 *
 * identity('hello'); // returns 'hello'
 * identity(42); // returns 42
 */
var identity = function identity(value) {
  return value;
};

/**
 * Returns the difference between the first array and other arrays or values, using a comparator function to compare values.
 *
 * @since 1.0.0
 *
 * @param {Array} array - The array to inspect.
 * @param {...Array|Function|string} args - The values or arrays to exclude.
 * If a string is provided as the last argument, it is used as a property name to extract from each element of the array.
 * If a function is provided as the last argument, it is used to extract a comparison value from each element in the arrays to exclude.
 * @param {Function|string} [iteratee=identity] - The iteratee invoked per element to generate the criterion by which uniqueness is computed.
 * If a string is provided instead, it will be used to create a property accessor function.
 * If iteratee is not provided, it defaults to identity.
 *
 * @returns {Array} - Returns the new array of filtered values.
 *
 * @example
 * const arr1 = [2.1, 1.2, 3.3];
 * const arr2 = [3.4, 2.5];
 * console.log(differenceBy(arr1, arr2, Math.floor)); // [1.2]
 *
 * const arr3 = [ { 'x': 2 }, { 'x': 1 } ];
 * const arr4 = [ { 'x': 1 } ];
 * console.log(differenceBy(arr3, arr4, 'x')); // [ { x: 2 } ]
 *
 * const arr5 = [{ x: 1 }, { x: 2 }, { x: 3 }];
 * console.log(differenceBy(arr5, { x: 2 }, 'x')); // [{ x: 1 }, { x: 3 }]
 */
var differenceBy = function differenceBy(array) {
  var _args$pop;
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var predicate = (_args$pop = args.pop()) != null ? _args$pop : identity;
  if (typeof predicate === 'string') {
    var prop = predicate;
    predicate = function predicate(item) {
      return item[prop];
    };
  }
  var flatArray = args.flat(Infinity).map(predicate);
  return array.filter(function (c) {
    return !flatArray.includes(predicate(c));
  });
};

/**
 * Returns the difference between the first array and all other arguments using a provided comparator function
 *
 * @since 1.0.0
 *
 * @template T
 *
 * @param {T[]} array - The array to process
 * @param {...any[]} args - The arrays of values to exclude
 * @param {Function} comparator - The function invoked per element to compare values
 * @returns {T[]} - Returns a new array of filtered values
 *
 * @example
 *
 * const a = [1, 2, 3, 4];
 * const b = [3, 4];
 *
 * const result = differenceWith(a, b, (a, b) => a === b);
 *
 * console.log(result);	//	=>	[1, 2]
 */
var differenceWith = function differenceWith(array) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var comparator = args.pop();
  var flatArray = args.flat(Infinity);
  return array.filter(function (c) {
    return !flatArray.some(function (s) {
      return comparator(s, c);
    });
  });
};

/**
 * Creates a slice of `array` with `n` elements dropped from the beginning.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The array to query.
 * @param {number} [n=1] - The number of elements to drop.
 *
 * @returns {T[]} - Returns the slice of `array`.
 *
 * @example
 * drop([1, 2, 3, 4]); // returns [2, 3, 4]
 * drop([1, 2, 3, 4], 2); // returns [3, 4]
 */
var drop = function drop(array, n) {
  if (n === void 0) {
    n = 1;
  }
  return array.slice(n);
};

/**
 * Creates a slice of an array with `n` elements dropped from the end.
 *
 * @since 1.0.0
 *
 * @param {Array} array - The array to query.
 * @param {number} [n=1] - The number of elements to drop from the end.
 *
 * @returns {Array} - Returns the slice of `array`.
 *
 * @example
 *
 * dropRight([1, 2, 3, 4, 5], 2);
 * // => [1, 2, 3]
 *
 * dropRight([1, 2, 3, 4, 5]);
 * // => [1, 2, 3, 4]
 */
var dropRight = function dropRight(array, n) {
  if (n === void 0) {
    n = 1;
  }
  return array.slice(0, -n || array.length);
};

/**
 * Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned.
 *
 * @param {Object} object - The object to query.
 * @param {(string|Array|*)} path - The path of the property to get.
 * @param {*} [defaultValue] - The value returned for undefined resolved values.
 * @returns {*} - Returns the resolved value.
 * @since 1.0.0
 *
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * get(object, 'a[0].b.c');
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * get(object, 'a.b.c', 'default');
 * // => 'default'
 */
var get = function get(object, path, defaultValue) {
  //	One Way
  // return path
  // 	.split(/[\.\[\]\'\"]/)
  // 	.filter((p: any) => p)
  // 	.reduce((o: any, p: any) => o ? o[p] : defaultValue, object);
  // If path is not defined or it has false value
  if (!path) return undefined;
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
  // Regex explained: https://regexr.com/58j0k
  var pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  if (pathArray === null) return defaultValue;
  // Find value
  var result = pathArray.reduce(function (prevObj, key) {
    return prevObj && prevObj[key];
  }, object);
  // If found value is undefined return default value; otherwise return the value
  return result === undefined ? defaultValue : result;
  // //	Faster Way
  // if (typeof object === 'undefined' || object === null) return;
  // let newPath = path.split(/[\.\[\]\"\']{1,2}/);
  // for (var i = 0, l = newPath.length; i < l; i++) {
  // 	if (newPath[i] === '') continue;
  // 	object = object[newPath[i]];
  // 	if (typeof object === 'undefined' || object === null) return;
  // }
  // return object ?? defaultValue;
};

var createPredicate = function createPredicate(iteratee, equalyCompare) {
  if (equalyCompare === void 0) {
    equalyCompare = true;
  }
  //	Specially for .includes
  if (equalyCompare === false) {
    return iteratee;
  }
  if (typeof iteratee === 'string') {
    return function (item) {
      return get(item, iteratee);
    };
  } else if (Array.isArray(iteratee)) {
    return function (item) {
      return item[iteratee[0]] === iteratee[1];
    };
  } else if (typeof iteratee === 'object') {
    return function (item) {
      return Object.keys(iteratee).every(function (v) {
        return !(v in iteratee) || item[v] === iteratee[v];
      });
    };
  } else if (typeof iteratee === 'function') {
    return iteratee;
    //	return (item: any) => iteratee(item);
  } else if (equalyCompare && ['number', 'boolean'].some(function (s) {
    return s === typeof iteratee;
  })) {
    return function (item) {
      return item === iteratee;
    };
  }
  return iteratee;
};

/**
 * Creates a slice of the `array` with elements dropped from the end.
 * Elements are dropped until `predicate` returns falsey.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The array to inspect.
 * @param {Function} [predicate=identity] - The function invoked per iteration.
 * @returns {T[]} - Returns the slice of `array`.
 *
 * @example
 *
 * dropRightWhile([1, 2, 3, 4], n => n > 2);
 * // => [1, 2]
 *
 * dropRightWhile([{ 'user': 'barney', 'active': true }, { 'user': 'fred', 'active': false }, { 'user': 'pebbles', 'active': false }], o => !o.active);
 * // => [{ 'user': 'barney', 'active': true }]
 */
var dropRightWhile = function dropRightWhile(array, predicate) {
  if (predicate === void 0) {
    predicate = identity;
  }
  var fn = createPredicate(predicate);
  for (var i = array.length - 1; i >= 0; i--) {
    if (!fn(array[i])) {
      return array.slice(0, i + 1);
    }
  }
  return array;
};

/**
 * Creates a new array with elements dropped until the predicate returns false.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The input array.
 * @param {Function} [predicate=identity] - The function invoked per iteration.
 * @returns {T[]} - Returns the slice of the array.
 *
 * @example
 * dropWhile([1, 2, 3], n => n < 3); // Returns [3]
 *
 * dropWhile(['foo', 'bar', 'baz'], str => str.startsWith('f')); // Returns ['bar', 'baz']
 */
var dropWhile = function dropWhile(array, predicate) {
  if (predicate === void 0) {
    predicate = identity;
  }
  var fn = createPredicate(predicate);
  for (var i = 0; i < array.length; i++) {
    if (!fn(array[i])) {
      return array.slice(i);
    }
  }
  return array;
};

/**
 * Fill an array with a specified value from a start index to an end index.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The input array to be filled.
 * @param {*} value - The value to fill the array with.
 * @param {number} [start=0] - The start index to begin filling the array from.
 * @param {number} [end=array.length] - The end index to stop filling the array at.
 * @returns {T[]} - A new filled array.
 *
 * @example
 *
 * const arr = [1, 2, 3, 4, 5];
 * const filledArr = fill(arr, 0, 2, 4);
 * console.log(filledArr); // Output: [1, 2, 0, 0, 5]
 *
 * const arr2 = [1, 2, 3, 4, 5];
 * const filledArr2 = fill(arr2, '*', 1);
 * console.log(filledArr2); // Output: [1, '*', '*', '*', '*', '*']
 */
var fill = function fill(array, value, start, end) {
  if (start === void 0) {
    start = 0;
  }
  if (end === void 0) {
    end = array.length;
  }
  array.fill(value, start, end);
  return array;
};

var reverseCollection = function reverseCollection(collection) {
  if (Array.isArray(collection)) {
    return collection.reverse();
  } else if (collection && typeof collection === 'object' || !(collection instanceof Map)) {
    var mappedEntries = new Map(Object.entries(collection));
    var reverseMappedEntries = [].concat(mappedEntries.entries()).reverse();
    return new Map([].concat(reverseMappedEntries));
  }
  return collection;
};

var applyArrayFn = function applyArrayFn(_ref) {
  var collection = _ref.collection,
    fnName = _ref.fnName,
    iteratee = _ref.iteratee,
    _ref$checkFromEnd = _ref.checkFromEnd,
    checkFromEnd = _ref$checkFromEnd === void 0 ? false : _ref$checkFromEnd,
    _ref$fromIndex = _ref.fromIndex,
    fromIndex = _ref$fromIndex === void 0 ? 0 : _ref$fromIndex,
    _ref$toIndex = _ref.toIndex,
    toIndex = _ref$toIndex === void 0 ? -1 : _ref$toIndex,
    _ref$equalyCompare = _ref.equalyCompare,
    equalyCompare = _ref$equalyCompare === void 0 ? true : _ref$equalyCompare,
    initialValue = _ref.initialValue;
  iteratee = createPredicate(iteratee, equalyCompare);
  if (Array.isArray(collection)) {
    var collectionToTest = fromIndex > 0 ? [].concat(collection.slice(fromIndex, toIndex === -1 ? collection.length : toIndex)) : [].concat(collection);
    var collectionInReverse = checkFromEnd ? reverseCollection([].concat(collectionToTest)) : [].concat(collectionToTest);
    if (fnName === 'reduce') return collectionInReverse[fnName](iteratee, initialValue);
    return collectionInReverse[fnName](iteratee);
  }
  if (collection && typeof collection === 'object') {
    var _collectionInReverse = checkFromEnd ? reverseCollection(_extends({}, collection)) : _extends({}, collection);
    if (fnName === 'reduce') {
      return Object.entries(_collectionInReverse)[fnName](function (result, _ref2, index) {
        var key = _ref2[0],
          value = _ref2[1];
        return iteratee(result, value, key, _collectionInReverse, index);
      }, initialValue);
    }
    return Object.entries(_collectionInReverse)[fnName](function (_ref3, index) {
      var key = _ref3[0],
        value = _ref3[1];
      return iteratee(value, key, _collectionInReverse, index);
    });
  }
  if (fnName === 'reduce') return collection[fnName](iteratee, initialValue);
  return collection[fnName](iteratee);
};

/**
 * Returns the index of the first element in the array that satisfies the provided predicate function.
 *
 * @since 1.0.0
 *
 * @param {Array} array - The array to search.
 * @param {Function} [predicate=identity] - The function invoked per iteration.
 * @param {number} [fromIndex=0] - The index to search from.
 * @returns {number} - Returns the index of the found element, else -1.
 *
 * @example
 *
 * const users = [
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' },
 *   { id: 3, name: 'Bob' }
 * ];
 *
 * findIndex(users, ({ id }) => id === 2);
 * // => 1
 *
 * findIndex(users, ({ name }) => name === 'Mary');
 * // => -1
 */
var findIndex = function findIndex(array, predicate, fromIndex) {
  if (predicate === void 0) {
    predicate = identity;
  }
  if (fromIndex === void 0) {
    fromIndex = 0;
  }
  return applyArrayFn({
    collection: array,
    fnName: 'findIndex',
    iteratee: predicate,
    fromIndex: fromIndex
  });
};

/**
 * Returns the index of the last element in the array that satisfies the provided testing function.
 *
 * @since 1.0.0
 *
 * @param {Array} array - The array to search in.
 * @param {Function} [predicate=identity] - The function invoked per iteration.
 * @param {number} [fromIndex=0] - The index to start searching from.
 * @param {number} [toIndex=array.length-1] - The index to stop searching at.
 *
 * @returns {number} - Returns the index of the found element, else -1.
 *
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'active': false },
 *   { 'user': 'fred', 'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * const result = findLastIndex(users, user => user.user === 'fred');
 * console.log(result);
 * // => 1
 */
var findLastIndex = function findLastIndex(array, predicate, fromIndex, toIndex) {
  if (predicate === void 0) {
    predicate = identity;
  }
  if (fromIndex === void 0) {
    fromIndex = 0;
  }
  if (toIndex === void 0) {
    toIndex = array.length - 1;
  }
  var fn = createPredicate(predicate);
  if (fn === undefined) return array.lastIndexOf(predicate);
  for (var i = toIndex; i >= fromIndex; i--) {
    if (fn(array[i])) {
      return i;
    }
  }
  return -1;
};

/**
 * Returns the first element of an array, or undefined if the array is empty.
 *
 * @since 1.0.0
 *
 * @param {T[]} array - The array to query.
 *
 * @returns {T | undefined} - The first element of the array, or undefined if the array is empty.
 *
 * @example
 *
 * head([1, 2, 3]); // => 1
 *
 * head([]); // => undefined
 */
var head = function head(array) {
  return array[0];
};

/**
 * Returns the first element of an array, or undefined if the array is empty.
 *
 * @since 1.0.0
 *
 * @param {T[]} array - The array to query.
 *
 * @returns {T | undefined} - The first element of the array, or undefined if the array is empty.
 *
 * @example
 *
 * first([1, 2, 3]); // => 1
 *
 * first([]); // => undefined
 */
var first = head;

/**
 * Flattens an array of nested arrays into a single flat array.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The array to flatten.
 * @returns {any[]} - Returns the new flattened array.
 *
 * @example
 *
 * flatten([1, [2, [3, [4]], 5]]); // Returns: [1, 2, 3, 4, 5]
 * flatten(['a', ['b', ['c']]]); // Returns: ['a', 'b', 'c']
 */
var flatten = function flatten(array) {
  return array.flat();
};

/**
 * Recursively flattens `array`.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The array to flatten.
 * @returns {any[]} - Returns the new flattened array.
 *
 * @example
 *
 * flattenDeep([1, [2, [3, [4]], 5]]); // [1, 2, 3, 4, 5]
 */
var flattenDeep = function flattenDeep(array) {
  return array.flat(Infinity);
};

/**
 * Flattens an array up to the specified depth.
 *
 * @since 1.0.0
 *
 * @param {Array} array - The array to flatten.
 * @param {number} [depth=1] - The maximum recursion depth.
 * @returns {Array} - The new flattened array.
 *
 * @example
 *
 * flattenDepth([1, [2, [3, [4]], 5]], 2);
 * // => [1, 2, 3, [4], 5]
 */
var flattenDepth = function flattenDepth(array, depth) {
  if (depth === void 0) {
    depth = 1;
  }
  return array.flat(depth);
};

/**
 * Creates an object from an array of key-value pairs.
 *
 * @since 1.0.0
 *
 * @param {T[][]} array - The array of key-value pairs to convert to an object.
 * @returns {Object} - An object created from the key-value pairs in the input array.
 *
 * @example
 *
 * fromPairs([['a', 1], ['b', 2], ['c', 3]]); // {a: 1, b: 2, c: 3}
 */
var fromPairs = function fromPairs(array) {
  return Object.fromEntries(array);
};

/**
 * Returns the index of the first occurrence of a value in an array, or -1 if not found.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The input array to search.
 * @param {T} value - The value to search for.
 * @param {number} [startIndex=0] - The index to start the search from.
 * @returns {number} - The index of the first occurrence of the value, or -1 if not found.
 *
 * @example
 *
 * const fruits = ['apple', 'banana', 'mango', 'orange'];
 * const index1 = indexOf(fruits, 'banana'); // 1
 * const index2 = indexOf(fruits, 'papaya'); // -1
 */
var indexOf = function indexOf(array, value, startIndex) {
  if (startIndex === void 0) {
    startIndex = 0;
  }
  return array.indexOf(value, startIndex);
};

/**
 * Returns all the elements of an array except the last one.
 *
 * @since 1.0.0
 *
 * @param {Array} array - The array to query.
 * @returns {Array} - A new array with all elements except the last one.
 *
 * @example
 *
 * initial([1, 2, 3]); // returns [1, 2]
 */
var initial = function initial(array) {
  return array.slice(0, -1);
};

/**
 * Returns an array of unique values that are included in all given arrays, using `SameValueZero` for equality comparisons.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {...Array<T>} array - The arrays to inspect.
 * @returns {Array<T>} - The array of common elements.
 * @example
 *
 * intersection([1, 2, 3], [4, 3, 2])
 * // => [2, 3]
 *
 * intersection(['apple', 'banana', 'orange'], ['pear', 'apple', 'orange'])
 * // => ['apple', 'orange']
 */
var intersection = function intersection() {
  for (var _len = arguments.length, array = new Array(_len), _key = 0; _key < _len; _key++) {
    array[_key] = arguments[_key];
  }
  return [].concat(array).reduce(function (a, b) {
    return a.filter(function (c) {
      return b.includes(c);
    });
  });
};

/**
 * Returns an array of unique values that are included in all given arrays, using a provided iteratee function.
 *
 * @since 1.0.0
 *
 * @param {Array} array - The array to inspect.
 * @param {...Array} args - The arrays to intersect with.
 * @param {Function|string} [iteratee=identity] - The iteratee invoked per element.
 * If a string is provided, it will be used as a property name to create a function that returns the property of the elements.
 *
 * @returns {Array} - Returns the new array of intersecting values.
 *
 * @example
 *
 * intersectionBy([2.1, 1.2], [4.3, 2.4], [1.2, 2.4]);
 * // => [2.1]
 *
 * intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }]
 *
 * intersectionBy([{'x': 1, 'y': 2}, {'x': 2, 'y': 1}], [{'x': 1, 'y': 2}], (o) => o.x);
 * // => [{'x': 1, 'y': 2}]
 */
var intersectionBy = function intersectionBy(array) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var iteratee = args ? args.pop() : [identity];
  if (typeof iteratee === 'string') {
    var prop = iteratee;
    iteratee = function iteratee(item) {
      return item[prop];
    };
  }
  return array.filter(function (item1) {
    return args.every(function (arr2) {
      return arr2.find(function (item2) {
        return iteratee(item1) === iteratee(item2);
      });
    });
  });
};

/**
 * This method is like `intersection` except that it accepts `comparator` which is invoked to compare elements of `array` to `values`.
 * The order and references of result values are determined by the first array.
 *
 * @since 1.0.0
 *
 * @param {T[]} array - The array to inspect.
 * @param {...any} args - The arrays of values to inspect.
 * @returns {T[]} - Returns the new array of intersecting values.
 *
 * @example
 *
 * intersectionWith(
 *   [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }],
 *   [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }],
 *   (a, b) => a.x === b.x && a.y === b.y
 * );
 * // => [{ 'x': 1, 'y': 2 }]
 */
var intersectionWith = function intersectionWith(array) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var comparator = args.pop();
  return array.filter(function (item1) {
    return args.every(function (arr2) {
      return arr2.find(function (item2) {
        return comparator(item1, item2);
      });
    });
  });
};

/**
 * Joins all elements of an array into a string separated by the specified separator.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The array to join.
 * @param {string} [joiner=','] - The separator to use when joining the elements.
 * @returns {string} - The string created by joining the array elements.
 *
 * @example
 *
 * join([1, 2, 3], '-'); // returns '1-2-3'
 * join(['a', 'b', 'c'], ''); // returns 'abc'
 */
var join = function join(array, joiner) {
  if (joiner === void 0) {
    joiner = ',';
  }
  return array.join(joiner);
};

/**
 * Returns the last element of an array.
 *
 * @since 1.0.0
 *
 * @param {Array} array - The array to query.
 * @returns {*} - Returns the last element of the array.
 *
 * @example
 *
 * last([1, 2, 3])
 * // => 3
 *
 * last([])
 * // => undefined
 */
var last = function last(array) {
  return array[array.length - 1];
};

/**
 * Returns the index of the last occurrence of the specified element in the array, searching backwards from the given index.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The input array to search in.
 * @param {T} element - The element to search for.
 * @param {number} [fromIndex=array.length - 1] - The index to start the search from.
 *
 * @returns {number} - The index of the last occurrence of the element in the array, or -1 if not found.
 *
 * @example
 * const fruits = ['apple', 'banana', 'orange', 'banana', 'orange'];
 * const lastIndex1 = lastIndexOf(fruits, 'banana'); // returns 3
 * const lastIndex2 = lastIndexOf(fruits, 'orange', 2); // returns 2
 */
var lastIndexOf = function lastIndexOf(array, element, fromIndex) {
  if (fromIndex === void 0) {
    fromIndex = array.length - 1;
  }
  return array.lastIndexOf(element, fromIndex);
};

/**
 * Gets the element at index `n` of `array`. If `n` is negative, the nth element from the end is returned.
 *
 * @since 1.0.0
 *
 * @param {T[]} array - The array to query.
 * @param {number} [index=0] - The index of the element to return.
 *
 * @returns {T | undefined} - Returns the nth element of `array`.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * console.log(nth(arr)); // Output: 1
 * console.log(nth(arr, 2)); // Output: 3
 * console.log(nth(arr, -1)); // Output: 5
 */
var nth = function nth(array, index) {
  if (index === void 0) {
    index = 0;
  }
  return index >= 0 ? array[index] : array[array.length + index];
};

/**
 * Removes elements from an array corresponding to the specified indexes, and returns an array of removed elements.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The array to modify.
 * @param {number|number[]} indexes - The indexes of the elements to remove from the array.
 * @returns {T[]} - An array of removed elements.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const removed = pullAt(arr, [1, 3]);
 * console.log(arr); // [1, 3, 5]
 * console.log(removed); // [2, 4]
 */
var pullAt = function pullAt(array, indexes) {
  if (Array.isArray(indexes)) {
    return indexes.reverse().map(function (indexes) {
      return array.splice(indexes, 1)[0];
    }).reverse();
  }
  var element = [nth(array, indexes)];
  array.splice(indexes, 1);
  return element;
};

/**
 * Removes all instances of specified elements from an array.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The array to modify.
 * @param {T[]} elementsToRemove - The elements to remove from the array.
 * @returns {T[]} - The modified array with specified elements removed.
 *
 * @example
 *
 * const arr = ['a', 'b', 'c', 'a', 'b', 'c'];
 *
 * pullAll(arr, ['a', 'c']);
 *
 * console.log(arr);
 * // expected output: ['b', 'b']
 */
var pullAll = function pullAll(array, elementsToRemove) {
  var indexesToRemove = [];
  array.forEach(function (f, index) {
    if (elementsToRemove.some(function (s) {
      return s === f;
    })) indexesToRemove.push(index);
  });
  return pullAt(array, indexesToRemove);
};

/**
 * Removes all occurrences of specified values from an array.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The array to modify.
 * @param {...T} elementsToRemove - The values to remove.
 * @returns {T[]} - The modified array with values removed.
 *
 * @example
 * const arr = ['a', 'b', 'c', 'a', 'b', 'c'];
 * const result = pull(arr, 'a', 'c');
 * console.log(result); // Output: ['b', 'b']
 */
var pull = function pull(array) {
  for (var _len = arguments.length, elementsToRemove = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    elementsToRemove[_key - 1] = arguments[_key];
  }
  return pullAll(array, elementsToRemove);
};

/**
 * Removes all given elements from the array using a custom iteratee function
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The source array
 * @param {T[]} elementsToRemove - The array of elements to be removed
 * @param {Function} [iteratee=identity] - The function invoked per iteration
 * @returns {T[]} - The new array with removed elements
 *
 * @example
 *
 * const users = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }, { name: 'Bob', age: 40 }];
 * const removedUsers = pullAllBy(users, [{ name: 'John' }, { name: 'Jane' }], 'name');
 *
 * console.log(removedUsers); // [{ name: 'Bob', age: 40 }]
 */
var pullAllBy = function pullAllBy(array, elementsToRemove, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  var fn = createPredicate(iteratee);
  var indexesToRemove = [];
  array.forEach(function (f, index) {
    if (elementsToRemove.some(function (s) {
      return fn(s) === fn(f);
    })) indexesToRemove.push(index);
  });
  return pullAt(array, indexesToRemove);
};

/**
 * Removes all given elements from the array using a custom comparator function.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The input array.
 * @param {T[]} elementsToRemove - The elements to be removed from the array.
 * @param {Function} comparator - The comparator function to be used for comparison.
 *
 * @returns {T[]} - The modified array.
 *
 * @example
 *
 * const arr = [{ id: 1, name: 'John' }, { id: 2, name: 'Mary' }, { id: 3, name: 'Peter' }];
 * const result = pullAllWith(arr, [{ id: 1, name: 'John' }, { id: 3, name: 'Peter' }], (a, b) => a.id === b.id);
 * console.log(result); // [{ id: 2, name: 'Mary' }]
 */
var pullAllWith = function pullAllWith(array, elementsToRemove, comparator) {
  var indexesToRemove = [];
  array.forEach(function (f, index) {
    if (elementsToRemove.some(function (s) {
      return comparator(s, f);
    })) indexesToRemove.push(index);
  });
  return pullAt(array, indexesToRemove);
};

/**
 * Removes all elements from an array that satisfy the predicate and returns an array with the removed elements.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The array to modify.
 * @param {Function} [predicate=identity] - The function invoked per iteration.
 * @returns {T[]} - An array of removed elements.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const removed = remove(arr, n => n % 2 === 0);
 * console.log(arr); // [1, 3, 5]
 * console.log(removed); // [2, 4]
 */
var remove = function remove(array, predicate) {
  if (predicate === void 0) {
    predicate = identity;
  }
  // in order to not mutate the original array until the very end
  // we want to cache the indexes to remove while preparing the result to return
  var toRemove = [];
  var result = array.filter(function (item, i) {
    return predicate(item) && toRemove.push(i);
  });
  // just before returning, we can then remove the items, making sure we start
  // from the higher indexes: otherwise they would shift at each removal
  toRemove.reverse().forEach(function (i) {
    return array.splice(i, 1);
  });
  return result;
  // const fn = createPredicate(predicate);
  // let removedArray: T[] = [];
  // let updatedArray: T[] = [];
  // array.forEach((element, index) => {
  // 	if ((fn as any)(array[index])) {
  // 		removedArray.push(element);
  // 	} else {
  // 		updatedArray.push(element);
  // 	}
  // });
  // array = [...updatedArray];
  // return removedArray;
};

/**
 * Reverses an array in place.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The input array.
 * @returns {T[]} - The reversed array.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * reverse(arr); // [5, 4, 3, 2, 1]
 */
var reverse = function reverse(array) {
  return array.reverse();
};

/**
 * Returns a new array containing the elements of the original array starting from `start` up to, but not including, `end`.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} array - The original array.
 * @param {number} [start=0] - The start index (inclusive). Defaults to 0.
 * @param {number} [end=array.length] - The end index (exclusive). Defaults to the length of the array.
 * @returns {T[]} - A new array containing the elements from the original array between the specified start and end indexes.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * slice(arr);         // [1, 2, 3, 4, 5]
 * slice(arr, 2);      // [3, 4, 5]
 * slice(arr, 2, 4);   // [3, 4]
 */
var slice = function slice(array, start, end) {
  if (start === void 0) {
    start = 0;
  }
  if (end === void 0) {
    end = array.length;
  }
  return array.slice(start, end);
};

//  This method uses binary search algorithm to get possible index
var baseSortedIndex = function baseSortedIndex(collection, element, fn) {
  var start = 0;
  var end = collection.length - 1;
  while (start <= end) {
    var mid = Math.floor((start + end) / 2);
    if (fn) {
      if (fn(collection[mid]) === fn(element)) return mid;else if (fn(collection[mid]) < fn(element)) start = mid + 1;else end = mid - 1;
    } else {
      if (collection[mid] === element) return mid;else if (collection[mid] < element) start = mid + 1;else end = mid - 1;
    }
  }
  return end + 1;
};

/**
 * Returns the index at which the specified value should be inserted into the
 * array in order to maintain its sorted order.
 *
 * @template T The type of the array elements.
 * @param {T[]} array - The sorted array to search in.
 * @param {T} value - The value to search for.
 * @returns {number} - The index at which the specified value should be inserted.
 *
 * @example
 * sortedIndex([10, 20, 30, 40], 35); // Returns 3
 */
var sortedIndex = function sortedIndex(array, value) {
  return baseSortedIndex(array, value);
};

/**
 * Uses a function to determine the sort order of the input array and returns the index at which the input value should be inserted in order to maintain that sort order.
 * @template T
 * @param {T[]} array - The sorted array to inspect.
 * @param {T} value - The value to evaluate.
 * @param {Function} [iteratee=identity] - The iteratee invoked per element.
 * @returns {number} - Returns the index at which the value should be inserted into the array.
 *
 * @example
 *
 * var objects = [{ 'x': 4 }, { 'x': 5 }];
 *
 * sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
 * // => 0
 *
 * sortedIndexBy(objects, { 'x': 4 }, 'x');
 * // => 0
 */
var sortedIndexBy = function sortedIndexBy(array, value, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  var fn = createPredicate(iteratee);
  return baseSortedIndex(array, value, fn);
};

/**
 * Returns the index of the first occurrence of the specified value in a sorted array, or -1 if not found.
 *
 * @template T
 * @param {T[]} array - The sorted input array to search.
 * @param {T} value - The value to search for.
 * @returns {number} - The index of the first occurrence of the value, or -1 if not found.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * console.log(sortedIndexOf(arr, 3)); // Output: 2
 * console.log(sortedIndexOf(arr, 6)); // Output: -1
 */
var sortedIndexOf = function sortedIndexOf(array, value) {
  return [].concat(array).sort().indexOf(value);
};

//  This method uses binary search algorithm to get possible last index
var baseSortedLastIndex = function baseSortedLastIndex(collection, element, fn) {
  var low = 0,
    high = collection.length - 1,
    res = -1;
  while (low <= high) {
    // Normal Binary Search Logic
    var mid = Math.floor((low + high) / 2);
    if (fn) {
      if (fn(collection[mid]) > fn(element)) high = mid - 1;else if (fn(collection[mid]) < fn(element)) low = mid + 1;else {
        res = mid;
        low = mid + 1;
      }
    } else {
      if (collection[mid] > element) high = mid - 1;else if (collection[mid] < element) low = mid + 1;else {
        res = mid;
        low = mid + 1;
      }
    }
  }
  return res + 1;
};

/**
 * This method is like `sortedIndex` except that it returns the highest index at which value should be inserted into array in order to maintain its sort order.
 * @param {Array} array - The sorted array to inspect.
 * @param {*} value - The value to evaluate.
 * @returns {number} - Returns the index at which value should be inserted into array.
 *
 * @example
 * sortedLastIndex([4, 5, 5, 5, 6], 5);	// => 4
 */
var sortedLastIndex = function sortedLastIndex(array, value) {
  return baseSortedLastIndex(array, value);
};

/**
 * Returns the highest index at which value should be inserted into array
 * in order to maintain its sorted order, based on a provided iteratee function.
 *
 * @template T
 * @param {T[]} array - The sorted array to inspect.
 * @param {T} value - The value to evaluate.
 * @param {Function} [iteratee=identity] - The iteratee invoked per element.
 * @returns {number} - Returns the index at which value should be inserted into array.
 *
 * @example
 * const users = [{ id: 1, name: 'Jane' }, { id: 2, name: 'John' }, { id: 3, name: 'Mary' }];
 * sortedLastIndexBy(users, { id: 2 }, ({ id }) => id); // 3
 */
var sortedLastIndexBy = function sortedLastIndexBy(array, value, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  var fn = createPredicate(iteratee);
  return baseSortedLastIndex(array, value, fn);
};

/**
 * Returns the index of the last occurrence of a specified value in a sorted array.
 * Uses a binary search algorithm for efficiency.
 *
 * @template T
 * @param {T[]} array - The sorted array to search in.
 * @param {T} value - The value to search for.
 * @returns {number} - The index of the last occurrence of the value, or -1 if not found.
 *
 * @example
 * const arr = [1, 2, 3, 4, 4, 4, 5, 6];
 *
 * sortedLastIndexOf(arr, 4); // returns 5
 * sortedLastIndexOf(arr, 7); // returns -1
 */
var sortedLastIndexOf = function sortedLastIndexOf(array, value) {
  var index = [].concat(array).reverse().indexOf(value);
  return index >= 0 ? array.length - 1 - index : -1;
};

/**
 * Creates a new array with all duplicate values removed. Assumes the input array is already sorted.
 *
 * @template T
 * @param {T[]} array - The input array to remove duplicates from.
 * @returns {T[]} - Returns the new array of unique values.
 *
 * @example
 *
 * sortedUniq([1, 1, 2, 2, 3, 4, 4, 5]); // Returns: [1, 2, 3, 4, 5]
 */
var sortedUniq = function sortedUniq(array) {
  return Array.from(new Set([].concat(array)));
};

/**
 * This function creates a new array with unique values from the input `array`,
 * based on the result of applying the `iteratee` function to each element. The order of
 * elements in the returned array is based on the order of the first occurrence of each value.
 *
 * @template T
 * @param {T[]} array - The input array to process.
 * @param {Function} iteratee - The function invoked per iteration.
 * @returns {T[]} - A new array of unique values.
 *
 * @example
 * const array = [{ x: 1 }, { x: 2 }, { x: 1 }];
 * const result = sortedUniqBy(array, o => o.x);
 * console.log(result); // Output: [{ x: 1 }, { x: 2 }]
 */
var sortedUniqBy = function sortedUniqBy(array, iteratee) {
  var mappedValues = new Map();
  array.forEach(function (element) {
    var updatedElement = iteratee(element);
    if (updatedElement && !mappedValues.has(updatedElement)) {
      mappedValues.set(updatedElement, element);
    }
  });
  return Array.from(new Set([].concat(mappedValues.values())));
};

/**
 * Returns all the elements of an array except for the first one.
 *
 * @template T
 * @param {T[]} array - The input array.
 * @returns {T[]} - A new array containing all elements of the input array except the first one.
 *
 * @example
 * const arr = [1, 2, 3, 4];
 * const result = tail(arr);
 * console.log(result); // [2, 3, 4]
 */
var tail = function tail(array) {
  var rest = array.slice(1);
  return rest;
};

/**
 * Creates a slice of the `array` with `n` elements taken from the beginning.
 *
 * @template T
 * @param {T[]} array - The array to query.
 * @param {number} [n=1] - The number of elements to take.
 * @returns {T[]} - Returns the slice of `array`.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 *
 * take(numbers, 3); // => [1, 2, 3]
 * take(numbers, 1); // => [1]
 * take(numbers);    // => [1]
 */
var take = function take(array, n) {
  if (n === void 0) {
    n = 1;
  }
  return array.slice(0, n);
};

/**
 * Creates a new array with the last `n` elements of `array`.
 *
 * @param {Array} array - The input array.
 * @param {number} [length=1] - The number of elements to take.
 * @returns {Array} - Returns the new array.
 *
 * @example
 * takeRight([1, 2, 3, 4, 5], 3);
 * // => [3, 4, 5]
 *
 * takeRight([1, 2, 3, 4, 5]);
 * // => [5]
 */
var takeRight = function takeRight(array, length) {
  if (length === void 0) {
    length = 1;
  }
  return [].concat(array).splice(-length, length);
};

/**
 * Creates a new array with the elements from the end of the given array
 * that satisfy the provided predicate function, stopping as soon as an element
 * does not satisfy it.
 *
 * @param {Array} array - The source array to query.
 * @param {Function} [predicate=identity] - The function invoked per iteration.
 * @returns {Array} - Returns the new array of elements.
 *
 * @example
 * takeRightWhile([1, 2, 3, 4, 5], n => n > 3);
 * // => [4, 5]
 *
 * takeRightWhile([{ name: 'John', active: false }, { name: 'Mary', active: true }], { active: true });
 * // => [{ name: 'Mary', active: true }]
 */
var takeRightWhile = function takeRightWhile(array, predicate) {
  if (predicate === void 0) {
    predicate = identity;
  }
  if (array.length === 0) return array;
  var fn = createPredicate(predicate);
  var arrayToReturn = [];
  for (var i = array.length - 1; i >= 0; i--) {
    if (fn(array[i])) {
      arrayToReturn.push(array[i]);
    } else {
      return arrayToReturn.reverse();
    }
  }
  return [];
};

/**
 * Creates a new array containing the elements of the input array, up until the predicate returns false.
 *
 * @template T
 * @param {T[]} array - The input array.
 * @param {Function} [predicate=identity] - The predicate function to be called on each element.
 * @returns {T[]} - The new array of elements that passed the predicate, until the first that returned false.
 *
 * @example
 *
 * takeWhile([1, 2, 3, 4], n => n < 3);
 * // Returns: [1, 2]
 *
 * takeWhile(['cat', 'dog', 'emu'], animal => animal.length <= 3);
 * // Returns: ['cat', 'dog']
 */
var takeWhile = function takeWhile(array, predicate) {
  if (predicate === void 0) {
    predicate = identity;
  }
  if (array.length === 0) return array;
  var fn = createPredicate(predicate);
  var collectionToReturn = [];
  for (var i = 0; i < array.length; i++) {
    if (fn(array[i])) {
      collectionToReturn.push(array[i]);
    } else {
      return collectionToReturn;
    }
  }
  return [];
};

/**
 * Creates an array of unique values, in order, from all given arrays using Set.
 *
 * @param {T[]} array - The first array.
 * @param {T[][]} restArray - The rest of the arrays.
 *
 * @returns {T[]} - The new array of combined unique values.
 *
 * @example
 * const result = union([2], [1, 2]);
 * console.log(result);
 * // => [2, 1]
 */
var union = function union(array) {
  for (var _len = arguments.length, restArray = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restArray[_key - 1] = arguments[_key];
  }
  return [].concat(new Set(array.concat.apply(array, restArray)));
};

/**
 * Creates an array of unique values, in order, by iterating over all elements of all the given arrays, and returning the unique elements by using an iteratee function to extract a value for comparison.
 *
 * @template T
 *
 * @param {T[]} array - The array to inspect.
 * @param {...any} args - The rest of the arrays to inspect.
 * @param {string|Function} [iteratee=identity] - The iteratee invoked per element.
 *
 * @returns {T[]} - Returns the new array of combined values.
 *
 * @example
 *
 * unionBy([2.1], [1.2, 2.3], Math.floor);
 * // returns [2.1, 1.2]
 */
var unionBy = function unionBy(array) {
  var _args$pop;
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var iteratee = (_args$pop = args.pop()) != null ? _args$pop : identity;
  if (typeof iteratee === 'string') {
    var prop = iteratee;
    iteratee = function iteratee(item) {
      return item[prop];
    };
  }
  return array.concat.apply(array, args).filter(function (x, i, self) {
    return i === self.findIndex(function (y) {
      return iteratee(x) === iteratee(y);
    });
  });
};

/**
 * This method creates an array of unique values that are included in all given arrays, using a comparator function for equality comparisons.
 *
 * @template T
 * @param {T[]} array - The array to inspect.
 * @param {...T[][]} args - The arrays to check for the union.
 * @param {Function} [comparator=identity] - The function to compare values.
 * @returns {T[]} - Returns the new array of combined values.
 * @example
 *
 * unionWith([{ x: 1, y: 2 }, { x: 2, y: 1 }], [{ x: 1, y: 2 }, { x: 2, y: 1 }], (a, b) => a.x === b.x);
 * // => [{ x: 1, y: 2 }, { x: 2, y: 1 }]
 */
var unionWith = function unionWith(array) {
  var _args$pop;
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var comparator = (_args$pop = args.pop()) != null ? _args$pop : identity;
  return array.concat.apply(array, args).filter(function (x, i, self) {
    return i === self.findIndex(function (y) {
      return comparator(x, y);
    });
  });
};

/**
 * Creates a new array with unique elements from the original array.
 *
 * @template T
 * @param {T[]} array - The array to inspect.
 * @returns {T[]} - Returns the new array of unique elements.
 *
 * @example
 * uniq([2, 1, 2]) // returns [2, 1]
 */
var uniq = function uniq(array) {
  return Array.from(new Set(array));
};

/**
 * Creates a new array of unique values, based on the result of the given iteratee function.
 *
 * @template T
 * @param {T[]} array - The input array.
 * @param {Function} [iteratee=identity] - The function used to get the unique value for each element.
 * @returns {T[]} - The new array of unique values.
 *
 * @example
 * const array = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 1, name: 'Jim' }];
 * const result = uniqBy(array, 'id');
 * console.log(result); // Output: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
 */
var uniqBy = function uniqBy(array, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  if (typeof iteratee === 'string') {
    var prop = iteratee;
    iteratee = function iteratee(item) {
      return item[prop];
    };
  }
  return array.filter(function (x, i, self) {
    return i === self.findIndex(function (y) {
      return iteratee(x) === iteratee(y);
    });
  });
};

/**
 * Creates a duplicate-free version of an array, using a comparator function to compare the elements.
 *
 * @template T
 * @param {T[]} array - The array to inspect.
 * @param {Function} [comparator=identity] - The function invoked per iteration to compare elements.
 * @returns {T[]} - Returns the new duplicate free array.
 *
 * @example
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
 *
 * uniqWith(objects, isEqual); // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 */
var uniqWith = function uniqWith(array, comparator) {
  if (comparator === void 0) {
    comparator = identity;
  }
  return array.filter(function (x, i, self) {
    return i === self.findIndex(function (y) {
      return comparator(x, y);
    });
  });
};

/**
 * Adds one or more elements to the beginning of an array and returns the new length of the array.
 *
 * @template T
 * @param {T[]} array - The array to add elements to.
 * @param {...T[]} elements - The elements to add to the beginning of the array.
 * @returns {T[]} - The modified array with new elements added to the beginning.
 *
 * @example
 *
 * unshift([1, 2, 3], 4); // Returns [4, 1, 2, 3]
 * unshift(['a', 'b'], 'c', 'd'); // Returns ['c', 'd', 'a', 'b']
 */
var unshift = function unshift(array) {
  for (var _len = arguments.length, elements = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    elements[_key - 1] = arguments[_key];
  }
  array.unshift.apply(array, elements.flat());
  return array;
};

/**
 * Zips together arrays into an array of arrays, with each array element at the same index.
 *
 * @template T
 * @param {T[]} array - The first array to zip.
 * @param {...T[][]} args - The other arrays to zip.
 * @returns {T[][]} - An array of arrays, each containing one element from each input array at the same index.
 * @example
 *
 * zip([1, 2], [10, 20], [100, 200]); // returns [[1, 10, 100], [2, 20, 200]]
 */
var zip = function zip(array) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return array.map(function (value, idx) {
    return [value].concat(args.map(function (arr) {
      return arr[idx];
    }));
  });
};

/**
 * This function takes an array of arrays and groups the elements of the inner arrays by their index
 * into a new array of arrays.
 *
 * @param {Array.<Array>} array - The array of arrays to unzip
 * @returns {Array.<Array>} - A new array of arrays containing the grouped elements
 *
 * @example
 *
 * unzip([[1, 'a'], [2, 'b'], [3, 'c']]); // [[1, 2, 3], ['a', 'b', 'c']]
 */
//	@ts-ignore
var unzip = function unzip(_ref) {
  var array = _ref.slice(0);
  return zip.apply(void 0, array);
};

/**
 * This method is like `unzip` except that it accepts `iteratee` to specify how regrouped values should be combined.
 *
 * @template T
 * @param {any[][]} array - The array of grouped elements to process.
 * @param {Function} [predicate=identity] - The iteratee to combine regrouped values.
 * @returns {any[]} - Returns the new array of regrouped elements.
 *
 * @example
 * const zipped = zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 *
 * const unzipped = unzipWith(zipped, (str: string, num: number, bool: boolean) => `${str}${num}${bool}`; );
 * // => ['a1true', 'b2false']
 */
var unzipWith = function unzipWith(array, predicate) {
  if (predicate === void 0) {
    predicate = identity;
  }
  var fn = createPredicate(predicate);
  var unzipped = unzip(array);
  return unzipped.map(function (m) {
    return fn.apply(void 0, m);
  });
};

/**
 * Returns a new array with all instances of the provided values removed.
 *
 * @template T
 * @param {T[]} array - The source array.
 * @param {...T} exception - The values to exclude from the returned array.
 * @returns {T[]} - A new array without the specified values.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const result = without(arr, 2, 4); // result = [1, 3, 5]
 */
var without = function without(array) {
  for (var _len = arguments.length, exception = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    exception[_key - 1] = arguments[_key];
  }
  return array.filter(function (f) {
    return !exception.includes(f);
  });
};

/**
 * Returns an array of unique values that are included only in one of the given arrays.
 * @template T
 * @param {T[]} array - The input array.
 * @param {...T[][]} restArray - The rest of the arrays to be compared.
 * @returns {T[]} - An array of unique values from the input arrays.
 *
 * @example
 * xor([2, 1], [2, 3]) // returns [1, 3]
 * xor(['a', 'b', 'c'], ['b', 'd'], ['d', 'e']) // returns ['a', 'c', 'e']
 */
var xor = function xor(array) {
  for (var _len = arguments.length, restArray = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restArray[_key - 1] = arguments[_key];
  }
  var flatArray = concat.apply(void 0, [array].concat(restArray));
  var mappedData = new Map();
  for (var _iterator = _createForOfIteratorHelperLoose(flatArray), _step; !(_step = _iterator()).done;) {
    var elem = _step.value;
    mappedData.set(elem, mappedData.has(elem) ? mappedData.get(elem) + 1 : 1);
  }
  var difference = [];
  mappedData.forEach(function (value, key) {
    if (value === 1) difference.push(key);
  });
  return difference;
};

/**
 * Creates an array of unique values that are included in exactly one of the given arrays
 *
 * @template T
 * @param {T[]} array - The array to inspect.
 * @param {...any} args - The arrays to inspect.
 * @param {Function} [iteratee=identity] - The iteratee invoked per element.
 * @returns {T[]} - Returns the new array of filtered values.
 *
 * @example
 *
 * const arr1 = [1, 2, 3, 4];
 * const arr2 = [2, 4, 6];
 * const arr3 = [1, 2, 5];
 *
 * const result = xorBy(arr1, arr2, arr3, (n) => n % 2);
 * console.log(result); // Output: [3, 6]
 */
var xorBy = function xorBy(array) {
  var _args$pop;
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var iteratee = (_args$pop = args.pop()) != null ? _args$pop : identity;
  var fn = createPredicate(iteratee);
  var flatArray = concat.apply(void 0, [array].concat(args));
  var mappedData = new Map();
  for (var _iterator = _createForOfIteratorHelperLoose(flatArray), _step; !(_step = _iterator()).done;) {
    var elem = _step.value;
    var modifiedData = fn(elem);
    mappedData.set(modifiedData, mappedData.has(modifiedData) ? [].concat(mappedData.get(modifiedData), [elem]) : [elem]);
  }
  var difference = [];
  mappedData.forEach(function (value) {
    if (value.length === 1) difference.push(value[0]);
  });
  return difference;
};

/**
 * Creates an array of unique values that are included in the first given array,
 * but not in any of the other given arrays, using a custom comparator function to determine uniqueness.
 *
 * @template T The type of elements in the arrays.
 * @param {T[]} array - The array to inspect.
 * @param {...T[][]} args - The arrays to exclude.
 * @param {function} comparator - The function to determine the uniqueness of each element.
 * @returns {T[]} - Returns the new array of filtered values.
 *
 * @example
 *
 * const array1 = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
 * const array2 = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
 * const result = xorWith(array1, array2, (a, b) => a.x === b.x && a.y === b.y);
 * console.log(result);
 * // => [{x: 2, y: 1}, {x: 1, y: 1}]
 */
var xorWith = function xorWith(array) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var comparator = args.pop();
  var flatArray = concat.apply(void 0, [array].concat(args));
  var mappedData = new Map();
  var _loop = function _loop() {
    var elem = _step.value;
    var savedRecord = [].concat(mappedData.keys()).find(function (d) {
      return comparator(d, elem);
    });
    if (savedRecord) {
      mappedData.set(savedRecord, mappedData.get(savedRecord) + 1);
    } else {
      mappedData.set(elem, 1);
    }
  };
  for (var _iterator = _createForOfIteratorHelperLoose(flatArray), _step; !(_step = _iterator()).done;) {
    _loop();
  }
  var difference = [];
  for (var _iterator2 = _createForOfIteratorHelperLoose(mappedData), _step2; !(_step2 = _iterator2()).done;) {
    var _step2$value = _step2.value,
      key = _step2$value[0],
      value = _step2$value[1];
    if (value === 1) difference.push(key);
  }
  return difference;
};

/**
 * Creates an object from arrays of property names and values, where property names become object keys and values become object values.
 *
 * @param {Array} [props=[]] - An array of property names.
 * @param {Array} [values=[]] - An array of values.
 * @returns {Object} - The new object.
 *
 * @example
 *
 * zipObject(['a', 'b'], [1, 2]) // {a: 1, b: 2}
 * zipObject(['a', 'b'], [1]) // {a: 1, b: undefined}
 */
var zipObject = function zipObject(props, values) {
  if (props === void 0) {
    props = [];
  }
  if (values === void 0) {
    values = [];
  }
  return props.reduce(function (acc, key, idx) {
    acc[key] = values[idx];
    return acc;
  }, {});
};

/**
 * Creates an array of grouped elements, the first element of the tuples containing the first element of the passed arrays, and so on.
 * The provided function is used to combine the tuples in the resulting arrays.
 * If no function is provided, the default function returns the array of tuples.
 *
 * @template T
 * @template TResult
 * @param {T[][]} arrays - The arrays to be grouped together.
 * @param {Function} [iteratee] - The function to combine the elements of the tuples in the resulting arrays.
 * @returns {TResult[]} - Returns the new array of grouped elements.
 *
 * @example
 * zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c);
 * // => [111, 222]
 */
var zipWith = function zipWith(arrays) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var lastElement = args[args.length - 1];
  if (lastElement instanceof Function && typeof lastElement === 'function') {
    var fn = args.pop();
    return arrays.map(function (value, idx) {
      return fn.apply(void 0, [value].concat(args.map(function (arr) {
        return arr[idx];
      })));
    });
  }
  //	Below is zip method
  return arrays.map(function (value, idx) {
    return [identity(value)].concat(args.map(function (arr) {
      return arr[idx];
    }));
  });
};

var array = {
  __proto__: null,
  chunk: chunk,
  compact: compact,
  concat: concat,
  difference: difference,
  differenceBy: differenceBy,
  differenceWith: differenceWith,
  drop: drop,
  dropRight: dropRight,
  dropRightWhile: dropRightWhile,
  dropWhile: dropWhile,
  fill: fill,
  findIndex: findIndex,
  findLastIndex: findLastIndex,
  first: first,
  flatten: flatten,
  flattenDeep: flattenDeep,
  flattenDepth: flattenDepth,
  fromPairs: fromPairs,
  head: head,
  indexOf: indexOf,
  initial: initial,
  intersection: intersection,
  intersectionBy: intersectionBy,
  intersectionWith: intersectionWith,
  join: join,
  last: last,
  lastIndexOf: lastIndexOf,
  nth: nth,
  pull: pull,
  pullAll: pullAll,
  pullAllBy: pullAllBy,
  pullAllWith: pullAllWith,
  pullAt: pullAt,
  remove: remove,
  reverse: reverse,
  slice: slice,
  sortedIndex: sortedIndex,
  sortedIndexBy: sortedIndexBy,
  sortedIndexOf: sortedIndexOf,
  sortedLastIndex: sortedLastIndex,
  sortedLastIndexBy: sortedLastIndexBy,
  sortedLastIndexOf: sortedLastIndexOf,
  sortedUniq: sortedUniq,
  sortedUniqBy: sortedUniqBy,
  tail: tail,
  take: take,
  takeRight: takeRight,
  takeRightWhile: takeRightWhile,
  takeWhile: takeWhile,
  union: union,
  unionBy: unionBy,
  unionWith: unionWith,
  uniq: uniq,
  uniqBy: uniqBy,
  uniqWith: uniqWith,
  unshift: unshift,
  unzip: unzip,
  unzipWith: unzipWith,
  without: without,
  xor: xor,
  xorBy: xorBy,
  xorWith: xorWith,
  zip: zip,
  zipObject: zipObject,
  zipWith: zipWith
};

var prepareObjectTypes = {
  push: 'push',
  count: 'count',
  replace: 'replace' //	return the new object by replacing the previous one if match found
};

var prepareObject = function prepareObject(_ref) {
  var collection = _ref.collection,
    predicate = _ref.predicate,
    _ref$operation = _ref.operation,
    operation = _ref$operation === void 0 ? prepareObjectTypes.push : _ref$operation,
    _ref$includeCondition = _ref.includeConditionFailRecord,
    includeConditionFailRecord = _ref$includeCondition === void 0 ? false : _ref$includeCondition;
  var fn = createPredicate(predicate);
  var conditionFailedRecords = {};
  var result = collection.reduce(function (group, item) {
    var _item$predicate;
    var converted = fn(item);
    //	@ts-ignore
    var key = (_item$predicate = item[predicate]) != null ? _item$predicate : converted;
    switch (operation) {
      case prepareObjectTypes.push:
        if (converted) {
          group[key] = group.hasOwnProperty(key) ? group[key] : [];
          group[key].push(item);
        } else if (includeConditionFailRecord) {
          conditionFailedRecords[key] = conditionFailedRecords.hasOwnProperty(key) ? conditionFailedRecords[key] : [];
          conditionFailedRecords[key].push(item);
        }
        break;
      case prepareObjectTypes.count:
        if (converted) {
          group[key] = group.hasOwnProperty(key) ? group[key] : 0;
          group[key] = ++group[key];
        } else if (includeConditionFailRecord) {
          conditionFailedRecords[key] = conditionFailedRecords.hasOwnProperty(key) ? conditionFailedRecords[key] : 0;
          conditionFailedRecords[key] = ++conditionFailedRecords[key];
        }
        break;
      case prepareObjectTypes.replace:
        if (converted) {
          group[key] = group.hasOwnProperty(key) ? group[key] : {};
          group[key] = _extends({}, item);
        } else if (includeConditionFailRecord) {
          conditionFailedRecords[key] = conditionFailedRecords.hasOwnProperty(key) ? conditionFailedRecords[key] : {};
          conditionFailedRecords[key] = _extends({}, item);
        }
        break;
    }
    return group;
  }, {});
  return {
    result: _extends({}, result),
    conditionFailedRecords: _extends({}, conditionFailedRecords)
  };
};

/**
 * Groups the elements in the array by a given criterion, and counts the number of elements in each group.
 *
 * @template T
 * @param {T[]} collection - The array to iterate over.
 * @param {Function} [predicate = identity] - The function invoked per iteration.
 *
 * @returns {Object} - An object with keys representing the group and values representing the count of elements in that group.
 *
 * @example
 *
 * countBy([6.1, 4.2, 6.3], Math.floor) // => { '4': 1, '6': 2 }
 * countBy(['one', 'two', 'three'], 'length') // => { '3': 2, '5': 1 }
 * countBy(['one', 'two', 'three'], word => word[0]) // => { o: 2, t: 1 }
 */
var countBy = function countBy(collection, predicate) {
  if (predicate === void 0) {
    predicate = identity;
  }
  var _prepareObject = prepareObject({
      collection: collection,
      predicate: predicate,
      operation: prepareObjectTypes.count
    }),
    result = _prepareObject.result;
  return result;
};

/**
 * Applies a function to each element in a collection.
 *
 * @template T
 * @param {T} collection - The collection to iterate over.
 * @param {Function} [iteratee = identity] - The function to apply to each element.
 *
 * @returns {T} - The original collection.
 *
 * @example
 * const arr = [1, 2, 3];
 * forEach(arr, n => console.log(n)); // => 1, 2, 3
 *
 * const obj = { a: 1, b: 2, c: 3 };
 * forEach(obj, (value, key) => console.log(key, value)); // => "a 1", "b 2", "c 3"
 */
var forEach = function forEach(collection, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  applyArrayFn({
    collection: collection,
    fnName: 'forEach',
    iteratee: iteratee
  });
  return collection;
};

/**
 * Applies a function to each element in a collection.
 *
 * @template T
 * @param {T} collection - The collection to iterate over.
 * @param {Function} [iteratee = identity] - The function to apply to each element.
 * @returns {T} - The original collection.
 *
 * @example
 * const arr = [1, 2, 3];
 * each(arr, n => console.log(n)); // => 1, 2, 3
 *
 * const obj = { a: 1, b: 2, c: 3 };
 * each(obj, (value, key) => console.log(key, value)); // => "a 1", "b 2", "c 3"
 */
var each = forEach;

/**
 * Applies an iteratee function to each element of an array-like object, starting from the end of the collection.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} collection - The collection to iterate over.
 * @param {Function} [iteratee=identity] - The function invoked per iteration.
 * @returns {T} - Returns the original collection.
 *
 * @example
 *
 * const arr = [1, 2, 3];
 *
 * forEachRight(arr, (value, index) => {
 *   console.log(`Value: ${value} Index: ${index}`);
 * });
 * // Output:
 * // Value: 3 Index: 2
 * // Value: 2 Index: 1
 * // Value: 1 Index: 0
 *
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * forEachRight(obj, (value, key) => {
 *   console.log(`Key: ${key} Value: ${value}`);
 * });
 * // Output:
 * // Key: c Value: 3
 * // Key: b Value: 2
 * // Key: a Value: 1
 */
var forEachRight = function forEachRight(collection, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  applyArrayFn({
    collection: collection,
    fnName: 'forEach',
    iteratee: iteratee,
    checkFromEnd: true
  });
  return collection;
};

/**
 * Applies an iteratee function to each element of an array-like object, starting from the end of the collection.
 *
 * @template T
 * @param {T} collection - The collection to iterate over.
 * @param {Function} [iteratee=identity] - The function invoked per iteration.
 * @returns {T} - Returns the original collection.
 *
 * @example
 *
 * const arr = [1, 2, 3];
 *
 * eachRight(arr, (value, index) => {
 *   console.log(`Value: ${value} Index: ${index}`);
 * });
 * // Value: 3 Index: 2
 * // Value: 2 Index: 1
 * // Value: 1 Index: 0
 *
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * eachRight(obj, (value, key) => {
 *   console.log(`Key: ${key} Value: ${value}`);
 * });
 * // Key: c Value: 3
 * // Key: b Value: 2
 * // Key: a Value: 1
 */
var eachRight = forEachRight;

/**
 * Checks if every element in the collection passes the predicate check
 *
 * @template T
 *
 * @param {T[]} collection - The collection to iterate over
 * @param {Function} [iteratee=identity] - The function invoked per iteration
 *
 * @returns {boolean} - Returns true if all elements pass the predicate check, else false
 *
 * @example
 *
 * const arr = [1, 2, 3, 4, 5];
 * const isGreaterThanZero = (num) => num > 0;
 * const isEven = (num) => num % 2 === 0;
 *
 * every(arr, isGreaterThanZero); // true
 * every(arr, isEven); // false
 */
var every = function every(collection, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  return applyArrayFn({
    collection: collection,
    fnName: 'every',
    iteratee: iteratee
  });
};

/**
 * Filters the elements of a collection based on the truth value of a provided function.
 *
 * @template T
 * @param {T} collection - The collection to iterate over.
 * @param {Function} [iteratee=identity] - The function invoked per iteration.
 * @returns {T} - The new filtered collection.
 *
 * @example
 * const nums = [1, 2, 3, 4, 5];
 * const isEven = (num) => num % 2 === 0;
 * const filteredNums = filter(nums, isEven); // [2, 4]
 */
var filter = function filter(collection, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  return applyArrayFn({
    collection: collection,
    fnName: 'filter',
    iteratee: iteratee
  });
};

/**
 * Finds the first element in the given collection that satisfies the provided predicate.
 *
 * @template T
 * @param {T} collection - The collection to iterate over.
 * @param {Function} [iteratee=identity] - The function invoked per iteration.
 * @param {number} [fromIndex=0] - The index to start searching from.
 * @returns {Object} - Returns the found element, else undefined.
 *
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1, 'active': true }
 * ];
 *
 * find(users, o => o.age < 40);
 * // => { 'user': 'barney', 'age': 36, 'active': true }
 *
 * find(users, { 'age': 1, 'active': true });
 * // => { 'user': 'pebbles', 'age': 1, 'active': true }
 *
 * find(users, 'active');
 * // => { 'user': 'barney', 'age': 36, 'active': true }
 */
var find = function find(collection, iteratee, fromIndex) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  if (fromIndex === void 0) {
    fromIndex = 0;
  }
  return applyArrayFn({
    collection: collection,
    fnName: 'find',
    iteratee: iteratee,
    fromIndex: fromIndex
  });
};

/**
 * Returns the last element in the `collection` that satisfies the `iteratee` function.
 *
 * @since 1.0.0
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [iteratee=identity] - The iteratee invoked per element.
 * @param {number} [fromIndex=0] - The index to search from.
 * @returns {*} - Returns the matched element, else `undefined`.
 *
 * @example
 *
 * findLast([1, 2, 3, 4], (n) => n % 2 === 1);
 * // => 3
 *
 * findLast({a: 1, b: 2, c: 3, d: 4}, (n) => n % 2 === 1);
 * // => 3
 *
 * findLast([1, 2, 3, 4], (n) => n === 5);
 * // => undefined
 */
var findLast = function findLast(collection, iteratee, fromIndex) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  if (fromIndex === void 0) {
    fromIndex = Array.isArray(collection) ? collection.length - 1 : 0;
  }
  var lastIndexOfRecord = findLastIndex(collection, iteratee, 0, fromIndex);
  if (lastIndexOfRecord > -1) return collection[lastIndexOfRecord];
  return undefined;
};

/**
 * Applies the provided function to each element of an array and then flattens the result.
 *
 * @since 1.0.0
 *
 * @param {Array|Object} collection - The array to iterate over.
 * @param {Function} iteratee - The function to apply to each element of the array.
 *
 * @returns {Array} - A new flattened array.
 *
 * @example
 * flatMap([1, 2, 3], (n) => [n, n * 2]);
 * // Returns [1, 2, 2, 4, 3, 6]
 *
 * flatMap(['hello', 'world'], (word) => word.split(''));
 * // Returns ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
 */
var flatMap = function flatMap(collection, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  return applyArrayFn({
    collection: collection,
    fnName: 'map',
    iteratee: iteratee
  }).flat();
};

/**
 * Creates a flattened array of values by running each element of a collection through a map function and flattening the mapped results.
 *
 * @since 1.0.0
 *
 * @param collection The collection to iterate over.
 * @param iteratee The function to apply to each element in the collection.
 * @returns Returns the new flattened array.
 *
 * @example
 *
 * flatMapDeep([1, 2, 3], num => [[num * 2]])
 * // => [2, 4, 6]
 */
var flatMapDeep = function flatMapDeep(collection, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  return applyArrayFn({
    collection: collection,
    fnName: 'map',
    iteratee: iteratee
  }).flat(Infinity);
};

/**
 * Applies a function to each element of a collection and then flattens the result up to a certain depth.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} collection - The collection to iterate over.
 * @param {Function} [iteratee=identity] - The function invoked per iteration.
 * @param {number} [depth=1] - The maximum recursion depth.
 * @returns {T} - The new flattened array.
 *
 * @example
 * flatMapDepth([1, 2, 3], (n) => [n, n], 2);
 * // Returns: [1, 1, 2, 2, 3, 3]
 *
 * flatMapDepth([1, [2, [3, [4]], 5]], identity, 2);
 * // Returns: [1, 2, [3, [4]], 5]
 */
var flatMapDepth = function flatMapDepth(collection, iteratee, depth) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  if (depth === void 0) {
    depth = 1;
  }
  return applyArrayFn({
    collection: collection,
    fnName: 'map',
    iteratee: iteratee
  }).flat(depth);
};

/**
 * A frozen object can no longer be changed: new properties cannot be added, existing properties cannot be removed, their enumerability, configurability, writability, or value cannot be changed, and the object's prototype cannot be re-assigned.
 *
 * @since 1.0.0
 *
 * @param collection The collection to freeze.
 * @returns The collection that was passed to the function.
 *
 * @example
 *
 * let obj = { a: 1, b: 2 };
 * freeze(obj);
 *
 * obj.b = 3;
 * console.log(obj);
 * //	=> { a: 1, b: 2 }
 */
var freeze = function freeze(collection) {
  return Object.freeze(collection);
};

/**
 * Groups the elements of an array into an object based on a provided predicate.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} collection - The input collection.
 * @param {Function} [predicate=identity] - The function invoked per iteration.
 * @returns {Object} - Returns the composed aggregate object.
 *
 * @example
 *
 * const users = [
 *   { name: 'Alice', age: 21 },
 *   { name: 'Bob', age: 25 },
 *   { name: 'Charlie', age: 30 },
 *   { name: 'David', age: 25 },
 *   { name: 'Eva', age: 21 }
 * ];
 *
 * groupBy(users, user => user.age);
 * // => {
 * //        '21': [
 * //          { name: 'Alice', age: 21 },
 * //          { name: 'Eva', age: 21 }
 * //        ],
 * //        '25': [
 * //          { name: 'Bob', age: 25 },
 * //          { name: 'David', age: 25 }
 * //        ],
 * //        '30': [{ name: 'Charlie', age: 30 }]
 * //      }
 */
var groupBy = function groupBy(collection, predicate) {
  if (predicate === void 0) {
    predicate = identity;
  }
  var _prepareObject = prepareObject({
      collection: collection,
      predicate: predicate,
      operation: prepareObjectTypes.push
    }),
    result = _prepareObject.result;
  return result;
};

/**
 * Checks if the provided value is in the collection. If the collection is an object, the values of the object will be searched.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} collection - The collection to inspect.
 * @param {Function} [iteratee=identity] - The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {boolean} - Returns `true` if `predicate` is found, else `false`.
 *
 * @example
 *
 * includes([1, 2, 3], 1);
 * // => true
 *
 * includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * includes('hello', 'e');
 * // => true
 */
var includes = function includes(collection, iteratee, fromIndex) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  if (fromIndex === void 0) {
    fromIndex = 0;
  }
  if (typeof collection === 'object') {
    return Object.values(collection).includes(iteratee, fromIndex);
  }
  return applyArrayFn({
    collection: collection,
    fnName: 'includes',
    iteratee: iteratee,
    fromIndex: fromIndex,
    equalyCompare: false
  });
};

/**
 * Invokes the method at `path` of each element in the `collection`.
 * Returns an array of the results of each invoked method.
 *
 * @since 1.0.0
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Array|string|Function} path - The path of the method to invoke or a function that will be invoked for each element.
 * @param {...*} [args] - The arguments to invoke the method with.
 *
 * @returns {Array} - Returns the array of results.
 *
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred', 'age': 40 }
 * ];
 *
 * invokeMap(users, 'user'); // => ['barney', 'fred']
 *
 * invokeMap(users, (o) => o.user + ' is ' + o.age); // => ['barney is 36', 'fred is 40']
 *
 * invokeMap(users, ['user', 'age']); // => [['barney', 36], ['fred', 40]]
 */
var invokeMap = function invokeMap(collection, path) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  if (Array.isArray(collection)) {
    return collection.map(function (data) {
      if (data) {
        if (typeof path === 'function') {
          return path.apply(data, args);
        } else if (typeof path === 'string') {
          return typeof data[path] === 'function' ? data[path].apply(data, args) : get(data, path);
        } else {
          return get(data, path);
        }
      }
      return undefined;
    });
  }
  if (collection && typeof collection === 'object') {
    return Object.entries(collection).map(
    //	@ts-ignore
    function (_ref) {
      var value = _ref[1];
      if (value) {
        if (typeof path === 'function') {
          return path.apply(value, args);
        } else if (typeof path === 'string') {
          return typeof value[path] === 'function' ? value[path].apply(value, args) : get(value, path);
        } else {
          return get(value, path);
        }
      }
      return undefined;
    });
  }
  return [];
};

/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} collection - The collection to iterate over.
 * @param {Function} [predicate=identity] The function invoked per iteration.
 * @returns {Object} - Returns the composed aggregate object.
 *
 * @example
 *
 * const users = [
 *   { 'id': '1', 'name': 'Alice' },
 *   { 'id': '2', 'name': 'Bob' },
 *   { 'id': '3', 'name': 'Alice' }
 * ];
 *
 * keyBy(users, 'id');
 * // => { '1': { 'id': '1', 'name': 'Alice' }, '2': { 'id': '2', 'name': 'Bob' }, '3': { 'id': '3', 'name': 'Alice' } }
 *
 * keyBy(users, (user) => user.name);
 * // => { 'Alice': { 'id': '3', 'name': 'Alice' }, 'Bob': { 'id': '2', 'name': 'Bob'
 */
var keyBy = function keyBy(collection, predicate) {
  if (predicate === void 0) {
    predicate = identity;
  }
  var _prepareObject = prepareObject({
      collection: collection,
      predicate: predicate,
      operation: prepareObjectTypes.replace
    }),
    result = _prepareObject.result;
  return result;
};

/**
 * Creates an array or object of values by running each element in `collection` through `iteratee`.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {Array<T> | Object} collection - The collection to iterate over.
 * @param {Function} [iteratee=identity] - The function invoked per iteration.
 *
 * @returns {T} - Returns the new mapped array or object.
 *
 * @example
 *
 * map([1, 2, 3], n => n * 2);
 * // => [2, 4, 6]
 *
 * map({a: 1, b: 2, c: 3}, n => n * 2);
 * // => {a: 2, b: 4, c: 6}
 */
var map$1 = function map(collection, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  var updatedIteratee = createPredicate(iteratee);
  if (Array.isArray(collection)) {
    return collection.map(function (rest) {
      return updatedIteratee(rest);
    });
  }
  if (collection && typeof collection === 'object') {
    return Object.entries(collection).map(function (_ref, index) {
      var key = _ref[0],
        value = _ref[1];
      return updatedIteratee(value, key, collection, index);
    });
  }
  return collection.map(iteratee);
};

//	@ts-nocheck
var sort = function sort(data, orderBy) {
  return data.sort(function (a, b) {
    for (var i = 0, size = orderBy.length; i < size; i++) {
      var key = Object.keys(orderBy[i])[0],
        o = orderBy[i][key],
        valueA = a[key],
        valueB = b[key];
      if (!(valueA || valueB)) {
        throw Error("the objects from the data passed does not have the key '" + key + "' passed on sort!");
      }
      if (+valueA === +valueA) {
        return o.toLowerCase() === 'desc' ? valueB - valueA : valueA - valueB;
      } else {
        if (valueA.localeCompare(valueB) > 0) {
          return o.toLowerCase() === 'desc' ? -1 : 1;
        } else if (valueA.localeCompare(valueB) < 0) {
          return o.toLowerCase() === 'desc' ? 1 : -1;
        }
      }
    }
  });
};
/**
 * Creates an array of elements, sorted in ascending or descending order by one or more properties.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} collection - The collection to iterate over.
 * @param {string | string[]} iteratee - The iteratee to sort by.
 * @param {string | string[]} [orders='asc'] - The sort orders for `iteratee`.
 * @returns {T} - Returns the new sorted array.
 *
 * @example
 *
 * const users = [
 *   { 'user': 'fred', 'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred', 'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * orderBy(users, 'user', 'asc');
 * // => [{ 'user': 'barney', 'age': 34 }, { 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 48 }, { 'user': 'fred', 'age': 40 }]
 *
 * orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => [{ 'user': 'barney', 'age': 36 }, { 'user': 'barney', 'age': 34 }, { 'user': 'fred', 'age': 48 }, { 'user': 'fred', 'age': 40 }]
 */
var orderBy = function orderBy(collection, iteratee, orders) {
  var _ref2;
  if (orders === void 0) {
    orders = 'asc';
  }
  var prepareSortConfig = Array.isArray(iteratee) ? iteratee.map(function (m, index) {
    var _ref;
    return _ref = {}, _ref[m] = orders[index], _ref;
  }) : [(_ref2 = {}, _ref2[iteratee] = Array.isArray(orders) ? orders[0] : orders, _ref2)];
  //	@ts-ignore
  return sort(collection, prepareSortConfig);
};

/**
 * Splits collection into two arrays: one for values that pass a predicate, and one for values that do not pass.
 *
 * @since 1.0.0
 *
 * @template T - The type of the elements in the collection.
 *
 * @param {T[]} collection - The collection to partition.
 * @param {Function} [predicate=identity] - The function invoked per iteration to determine if an element passes the predicate.
 *
 * @returns {Array} - Returns the new array of two arrays, where the first array contains the elements that passed the predicate, and the second contains the elements that failed the predicate.
 *
 * @example
 *
 * const users = [
 *   { user: 'barney', age: 36, active: false },
 *   { user: 'fred', age: 40, active: true },
 *   { user: 'pebbles', age: 1, active: false }
 * ];
 *
 * const [activeUsers, inactiveUsers] = partition(users, ({ active }) => active);
 *
 * console.log(activeUsers); // [{ user: 'fred', age: 40, active: true }]
 *
 * console.log(inactiveUsers);
 * // [
 * //   { user: 'barney', age: 36, active: false },
 * //   { user: 'pebbles', age: 1, active: false }
 * // ]
 */
var partition = function partition(collection, predicate) {
  if (predicate === void 0) {
    predicate = identity;
  }
  var _prepareObject = prepareObject({
      collection: collection,
      predicate: predicate,
      operation: prepareObjectTypes.push,
      includeConditionFailRecord: true
    }),
    result = _prepareObject.result,
    conditionFailedRecords = _prepareObject.conditionFailedRecords;
  var dataToReturn = Object.values(result).reduce(function (accumulator, currentValue) {
    return [].concat(accumulator, [currentValue]);
  }, []);
  return Object.values(conditionFailedRecords).reduce(function (accumulator, currentValue) {
    return [].concat(accumulator, [currentValue]);
  }, dataToReturn);
};

/**
 * This method prevents new properties from ever being added to an object/array
 *
 * @param collection The collection which should be made non-extensible.
 *
 * @returns The collection being made non-extensible.
 *
 * @example
 *
 * let obj = { a: 1, b: 2 };
 * preventExtensions(obj);
 *
 * obj.b = 3;
 * console.log(obj);
 * //	=> { a: 1, b: 3 }
 *
 * obj.c = 100;
 * //	=> { a: 1, b: 3 }
 */
var preventExtensions = function preventExtensions(collection) {
  return Object.preventExtensions(collection);
};

/**
 * Reduces a collection to a single value by iterating over the elements of the collection.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {Array<T> | Object} collection - The collection to iterate over.
 * @param {Function} [iteratee=identity] - The function invoked per iteration.
 * @param {*} [initialValue] - The initial value.
 * @returns {*} - Returns the accumulated value.
 *
 * @example
 * reduce([1, 2, 3], (acc, n) => acc + n); // Returns: 6
 *
 * @example
 * reduce(
 *  { a: 1, b: 2, c: 1 },
 *  (result, value, key) => {
 *    (result[value] || (result[value] = [])).push(key);
 *    return result;
 *  },
 *  {}
 * );
 * // Returns: { '1': ['a', 'c'], '2': ['b'] }
 */
var reduce = function reduce(collection, iteratee, initialValue) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  return applyArrayFn({
    collection: collection,
    fnName: 'reduce',
    iteratee: iteratee,
    initialValue: initialValue
  });
};

/**
 * This method is like `reduce`, except that it iterates over elements of a collection from right to left.
 *
 * @since 1.0.0
 *
 * @param {Array} collection - The collection to iterate over.
 * @param {Function} iteratee - The function invoked per iteration.
 * @param {*} initialValue - The initial value.
 * @returns {*} - Returns the accumulated value.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 *
 * const sum = reduceRight(numbers, (accumulator, value) => accumulator + value, 0);
 * // => 15
 *
 * const product = reduceRight(numbers, (accumulator, value) => accumulator * value, 1);
 * // => 120
 */
var reduceRight = function reduceRight(collection, iteratee, initialValue) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  return applyArrayFn({
    collection: collection,
    fnName: 'reduceRight',
    iteratee: iteratee,
    initialValue: initialValue
  });
};

/**
 * The opposite of `filter`, this method returns an array of all elements for which
 * the `predicate` function returns a falsy value.
 *
 * @since 1.0.0
 *
 * @template T - The type of the input array elements
 * @param {T[]} collection - The input collection
 * @param {Function} [predicate=identity] - The function invoked per iteration
 * @returns {any[]} - Returns the new filtered array
 *
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ];
 *
 * reject(users, ({ active }) => active);
 * // => [{ 'user': 'fred', 'active': false }]
 */
var reject = function reject(collection, predicate) {
  if (predicate === void 0) {
    predicate = identity;
  }
  var _prepareObject = prepareObject({
      collection: collection,
      predicate: predicate,
      operation: prepareObjectTypes.push,
      includeConditionFailRecord: true
    }),
    conditionFailedRecords = _prepareObject.conditionFailedRecords;
  return Object.values(conditionFailedRecords).reduce(function (accumulator, currentValue) {
    return [].concat(accumulator, currentValue);
  }, []);
};

/**
 * Returns the random elemen from passed Array or Object
 * @param collection Array | Object
 * @returns { element, restElements } -
 */
var getRandomElementFromCollection = function getRandomElementFromCollection(collection) {
  if (Array.isArray(collection)) {
    var randomIndex = Math.floor(Math.random() * collection.length);
    return {
      element: collection[randomIndex],
      restElements: [].concat(collection.filter(function (_, index) {
        return randomIndex !== index;
      }))
    };
  } else if (collection instanceof Object) {
    var keys = Object.keys(collection);
    var _randomIndex = Math.floor(Math.random() * keys.length);
    var property = keys[_randomIndex];
    var rest = _objectWithoutPropertiesLoose(collection, [property].map(_toPropertyKey));
    return {
      element: collection[_randomIndex],
      restElements: rest
    };
  }
  return {
    elemenet: null,
    restElements: []
  };
};

/**
 * Returns a random element from a collection
 *
 * @since 1.0.0
 *
 * @param {Array|Object} collection - The collection to sample from
 * @returns {*} - Returns the random element
 *
 * @example
 *
 * sample([1, 2, 3, 4, 5]) // returns a random number from the array
 *
 * sample({ a: 1, b: 2, c: 3 }) // returns a random value from the object
 *
 */
var sample = function sample(collection) {
  if (typeof collection === 'object') return Object.values(getRandomElementFromCollection(collection).element)[0];
  return getRandomElementFromCollection(collection).element;
};

/**
 * Returns an array of elements selected randomly from `collection`.
 * The array has `length` elements unless the `collection` doesn't have enough unique elements,
 * then it returns an array of unique elements of `collection`.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} collection - The collection to sample from.
 * @param {number} [length=1] The number of elements to randomly select from the `collection`.
 * @returns {T} - Returns the array of random elements.
 *
 * @example
 * const result = sampleSize([1, 2, 3, 4], 2);
 * console.log(result); // => [2, 4]
 *
 * const result = sampleSize({ a: 1, b: 2, c: 3, d: 4 }, 3);
 * console.log(result); // => [2, 4, 1]
 */
var sampleSize = function sampleSize(collection, length) {
  if (length === void 0) {
    length = 1;
  }
  var count = 0;
  var copiedCollection;
  var collectionToReturn = [];
  if (Array.isArray(collection)) {
    copiedCollection = [].concat(collection);
    do {
      var _getRandomElementFrom = getRandomElementFromCollection(copiedCollection),
        element = _getRandomElementFrom.element,
        restElements = _getRandomElementFrom.restElements;
      collectionToReturn.push(element);
      if (restElements.length === 0) count = length;else {
        copiedCollection = [].concat(restElements);
        ++count;
      }
    } while (count !== length);
    return collectionToReturn;
  } else if (typeof collection === 'object') {
    copiedCollection = _extends({}, collection);
    do {
      var _getRandomElementFrom2 = getRandomElementFromCollection(copiedCollection),
        _element = _getRandomElementFrom2.element,
        _restElements = _getRandomElementFrom2.restElements;
      collectionToReturn.push(Object.values(_element)[0]);
      copiedCollection = _extends({}, _restElements);
      ++count;
    } while (count !== length);
    return collectionToReturn;
  }
  return collection;
};

/**
 * Seals an object or array, preventing new properties from being added to it and marking all existing properties as non-configurable.
 *
 * @since 1.0.0
 *
 * @param {Object|any[]} collection - The collection to be sealed.
 *
 * @returns {Object|any[]} - The sealed collection.
 *
 * @example
 *
 * const obj = { a: 1, b: 2 };
 * const sealedObj = seal(obj);
 * sealedObj.a = 3; // Cannot modify property 'a' of a sealed object.
 * sealedObj.c = 4; // Cannot add new property 'c' to a sealed object.
 * console.log(sealedObj); // { a: 1, b: 2 }
 *
 * const arr = [1, 2, 3];
 * const sealedArr = seal(arr);
 * sealedArr.push(4); // Cannot add new elements to a sealed array.
 * console.log(sealedArr); // [1, 2, 3]
 */
var seal = function seal(collection) {
  return Object.seal(collection);
};

/**
 * Shuffles the given collection by returning a new array or object with the same elements in a randomized order.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} collection - The collection to shuffle.
 * @returns {T} - The shuffled collection.
 *
 * @example
 * const result = shuffle([1, 2, 3, 4, 5]); // [4, 5, 1, 3, 2]
 * const result2 = shuffle({a: 1, b: 2, c: 3, d: 4, e: 5}); // {e: 5, a: 1, d: 4, b: 2, c: 3}
 */
var shuffle = function shuffle(collection) {
  if (Array.isArray(collection)) return sampleSize(collection, collection.length);else if (typeof collection === 'object') return sampleSize(collection, Object.keys(collection).length);
  return collection;
};

/**
 * Returns the size of the given collection.
 *
 * @since 1.0.0
 *
 * @param {Array|Object|string} collection - The collection to determine the size of.
 * @returns {number} - The size of the collection.
 *
 * @example
 * size([1, 2, 3]); // returns 3
 * size({a: 1, b: 2, c: 3}); // returns 3
 * size('hello'); // returns 5
 */
var size = function size(collection) {
  if (Array.isArray(collection)) return collection.length;else if (typeof collection === 'object') return Object.keys(collection).length;
  return collection.length;
};

/**
 * Checks if `predicate` returns truthy for any element of `collection`.
 *
 * @since 1.0.0
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [iteratee=identity] - The function invoked per iteration.
 * @returns {boolean} - Returns `true` if any element passes the predicate check, else `false`.
 *
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ]
 *
 * some(users, ({ active }) => active) // => true
 *
 * some(users, { 'user': 'barney', 'active': false }) // => false
 *
 * some(users, 'active') // => true
 */
var some = function some(collection, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  return applyArrayFn({
    collection: collection,
    fnName: 'some',
    iteratee: iteratee
  });
};

function sortByAsc(key, cb) {
  if (!cb) cb = function cb() {
    return 0;
  };
  if (typeof key === 'function') {
    return function (a, b) {
      return key(a) > key(b) ? 1 : key(b) > key(a) ? -1 : cb(a, b);
    };
  }
  return function (a, b) {
    return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : cb(a, b);
  };
}
// function sortByDesc(key, cb) {
// 	if (!cb) cb = () => 0;
// 	return (b, a) => (a[key] > b[key]) ? 1 :
// 		((b[key] > a[key]) ? -1 : cb(b, a));
// }
var baseSortBy = function baseSortBy(keys) {
  var cb = function cb() {
    return 0;
  };
  keys.reverse();
  // orders.reverse();
  //	@ts-ignore
  for (var _iterator = _createForOfIteratorHelperLoose(keys.entries()), _step; !(_step = _iterator()).done;) {
    var _step$value = _step.value,
      key = _step$value[1];
    // const order = orders[i];
    // if (order == 'asc')
    cb = sortByAsc(key, cb);
    // else if (order == 'desc')
    // 	cb = sortByDesc(key, cb);
    // else
    // 	throw new Error(`Unsupported order "${order}"`);
  }

  return cb;
};
/**
 * Sorts the elements of an array based on the iteratees passed as arguments.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T[]} collection - The array to iterate over.
 * @param {(string | Function | (string | Function)[])} [iteratees=[identity]] - The iteratees to sort the array.
 * @returns {T[]} - Returns the new sorted array.
 *
 * @example
 *
 * const users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 },
 * ];
 *
 * sortBy(users, [user => user.user, user => user.age]);
 * // => [{user: "barney", age: 34}, {user: "barney", age: 36}, {user: "fred", age: 40}, {user: "fred", age: 48}]
 *
 * sortBy(users, 'user');
 * // => [{user: "barney", age: 36}, {user: "barney", age: 34}, {user: "fred", age: 48}, {user: "fred", age: 40}]
 *
 * sortBy(users, user => user.age);
 * // => [{user: "barney", age: 34}, {user: "barney", age: 36}, {user: "fred", age: 40}, {user: "fred", age: 48}]
 */
var sortBy = function sortBy(collection, iteratees) {
  if (iteratees === void 0) {
    iteratees = [identity];
  }
  if (!Array.isArray(iteratees)) iteratees = [iteratees];
  return [].concat(collection).sort(baseSortBy(iteratees));
};

var collection = {
  __proto__: null,
  countBy: countBy,
  each: each,
  eachRight: eachRight,
  every: every,
  filter: filter,
  find: find,
  findLast: findLast,
  flatMap: flatMap,
  flatMapDeep: flatMapDeep,
  flatMapDepth: flatMapDepth,
  forEach: forEach,
  forEachRight: forEachRight,
  freeze: freeze,
  groupBy: groupBy,
  includes: includes,
  invokeMap: invokeMap,
  keyBy: keyBy,
  map: map$1,
  orderBy: orderBy,
  partition: partition,
  preventExtensions: preventExtensions,
  reduce: reduce,
  reduceRight: reduceRight,
  reject: reject,
  sample: sample,
  sampleSize: sampleSize,
  seal: seal,
  shuffle: shuffle,
  size: size,
  some: some,
  sortBy: sortBy
};

/**
 * Returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
 *
 * @returns {number} - The number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
 *
 * @example
 *
 * console.log(now()); // 1645442799491
 */
var now = function now() {
  return Date.now();
};

var date = {
  __proto__: null,
  now: now
};

/**
 * Creates a function that invokes `fn` once it's called `times` times or more.
 * The last arguments provided to the debounced function will be used the next time the function is called.
 *
 * @since 1.0.0
 *
 * @param {number} times - The number of times `fn` must be called before it is executed.
 * @param {Function} fn - The function to be executed.
 * @returns {any} - Returns the new debounced function.
 *
 * @example
 *
 * function greet(name) {
 *   console.log('Hello, ' + name + '!');
 * }
 *
 * const greetAfterThree = after(3, greet);
 *
 * greetAfterThree('Alice'); // nothing happens
 * greetAfterThree('Bob');   // nothing happens
 * greetAfterThree('Cathy'); // logs 'Hello, Cathy!'
 */
var after = function after(times, fn) {
  var counter = 0;
  times = times || 0;
  return function () {
    counter++;
    if (counter >= times) {
      return fn.apply(void 0, arguments);
    }
  };
};

/**
 * Creates a function that accepts up to a certain number of arguments,
 * ignoring any additional arguments passed beyond that point.
 *
 * @since 1.0.0
 *
 * @param {Function} fn - The function to wrap.
 * @param {number} [arity=fn.length] - The maximum number of arguments to accept.
 *
 * @returns {Function} - Returns the new function.
 *
 * @example
 *
 * const add = (a, b, c) => a + b + c;
 * const addTwo = ary(add, 2);
 *
 * addTwo(1, 2, 3); // returns 3
 * addTwo(1, 2); // returns 3
 */
var ary = function ary(fn, arity) {
  if (arity === void 0) {
    arity = fn.length;
  }
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return fn.apply(void 0, args.slice(0, arity));
  };
};

/**
 * Creates a function that invokes `fn` with its arguments transformed.
 *
 * @since 1.0.0
 *
 * @param {Function} fn - The function to wrap.
 * @param {number} [arity=fn.length] - The arity of `fn`.
 * @returns {Function} - Returns the new wrapped function.
 *
 * @example
 *
 * const parseIntAry = ary(parseInt, 1);
 *
 * ['6', '8', '10'].map(parseIntAry);
 * // => [6, 8, 10]
 */
var before = function before(times, fn) {
  var counter = 0;
  var res;
  return function () {
    counter++;
    if (counter < times) {
      res = fn.apply(void 0, arguments);
      return res;
    } else {
      return res;
    }
  };
};

/**
 * Creates a new function that, when called, has its `this` keyword set to the provided context, with a given sequence of arguments preceding any provided when the new function was called.
 *
 * @since 1.0.0
 *
 * @param {Function} fn - The function to bind `this` to the provided context.
 * @param {Object} ctx - The context to bind `this` to.
 * @param {...any} boundArgs - The sequence of arguments to be bound to the new function.
 * @returns {Function} - The new function with the bound `this` keyword and arguments.
 *
 * @example
 *
 * const user = {
 *   name: 'Alice',
 *   sayHi(greeting) {
 *     console.log(`${greeting}, my name is ${this.name}.`);
 *   }
 * };
 *
 * const sayHiToAlice = bind(user.sayHi, user, 'Hello');
 *
 * sayHiToAlice(); // logs "Hello, my name is Alice."
 *
 * const add = (x, y) => x + y;
 * const addTen = bind(add, null, 10);
 *
 * console.log(addTen(5)); // logs 15
 */
var bind = function bind(fn, ctx) {
  for (var _len = arguments.length, boundArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    boundArgs[_key - 2] = arguments[_key];
  }
  return fn.bind.apply(fn, [ctx].concat(boundArgs));
};

/**
 * Creates a function that invokes the method at `object[method]` with `args` and the `this` binding of `object`.
 *
 * @since 1.0.0
 *
 * @param {Object} object - The object to bind the `method` to.
 * @param {string} method - The name of the method to bind.
 * @param {...*} [args] - The arguments to be partially applied.
 * @returns {Function} - Returns the new bound function.
 *
 * @example
 *
 * const john = {
 *   name: 'John Doe',
 *   greet(greeting: string, punctuation: string) {
 *     return `${greeting} ${this.name}${punctuation}`;
 *   }
 * };
 *
 * const sayHelloToJohn = bindKey(john, 'greet', 'Hello');
 *
 * sayHelloToJohn('!'); // => 'Hello John Doe!'
 */
var bindKey = function bindKey(object, method) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return function () {
    for (var _len2 = arguments.length, bound = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      bound[_key2] = arguments[_key2];
    }
    return object[method].apply(object, args.concat(bound));
  };
};

/**
 * Creates a curried function from the original function.
 *
 * @since 1.0.0
 *
 * @param {Function} func - The function to curry.
 *
 * @returns {Function} - Returns the curried function.
 *
 * @example
 *
 * const sum = (a, b, c) => a + b + c;
 *
 * const curriedSum = curry(sum);
 *
 * curriedSum(1)(2)(3); // 6
 *
 * const curriedSum1 = curriedSum(1);
 * const curriedSum12 = curriedSum1(2);
 *
 * curriedSum12(3); // 6
 */
var curry = function curry(func) {
  // define the number of expected arguments
  var expectedArgs = func.length;
  var curried = function curried() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // if enough arugments has been passed return the
    // result of the function execution, otherwise
    // continue adding arguments to the list
    return args.length >= expectedArgs ? func.apply(void 0, args) : function () {
      for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args2[_key2] = arguments[_key2];
      }
      return curried.apply(void 0, args.concat(args2));
    };
  };
  return curried;
};

/**
 * Creates a function that can be partially applied from the right.
 *
 * @since 1.0.0
 *
 * @param {Function} func - The function to curry.
 *
 * @returns {Function} - Returns the new curried function.
 *
 * @example
 *
 * const greet = (greeting, name) => `${greeting} ${name}`;
 *
 * const greetGoodbye = curryRight(greet)('Goodbye');
 *
 * greetGoodbye('John');
 * // => 'Goodbye John'
 *
 * greetGoodbye('Sarah');
 * // => 'Goodbye Sarah'
 *
 * const greetGoodbyeJohn = curryRight(greet)('Goodbye', 'John');
 *
 * greetGoodbyeJohn();
 * // => 'Goodbye John'
 */
var curryRight = function curryRight(func) {
  var expectedArgs = func.length;
  var curried = function curried() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return args.length >= expectedArgs ? func.apply(void 0, args) : function () {
      for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args2[_key2] = arguments[_key2];
      }
      return curried.apply(void 0, args2.concat(args));
    };
  };
  return curried;
};

/**
 *
 * @param func
 * @param delay
 * @param param2
 * @returns
 */
var debounce$1 = function debounce(func, delay, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    leading = _ref.leading;
  console.info('alt-lodash - debounce is still under work, it might not give 100% result as you expected');
  var timerId;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (!timerId && leading) {
      func.apply(void 0, args);
    }
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      return func.apply(void 0, args);
    }, delay);
  };
};

/**
 * Invokes a function only after a certain amount of time has passed since the last time it was called.
 *
 * @since 1.0.0
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} timer - The number of milliseconds to wait before invoking the function.
 * @param {...any} args - Additional arguments to pass to the function.
 * @returns {number} - A timer ID that can be used to cancel the debounce with `clearTimeout`.
 *
 * @example
 * const searchInput = document.getElementById('search-input');
 * const searchResults = document.getElementById('search-results');
 *
 * const fetchResults = async (query) => {
 *   const results = await searchAPI(query);
 *   searchResults.innerHTML = results;
 * };
 *
 * const debounceFetchResults = debounce(fetchResults, 500);
 * searchInput.addEventListener('input', (event) => {
 *   debounceFetchResults(event.target.value);
 * });
 */
var debounce = function debounce(fn, timer) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return setTimeout(function () {
    return fn.apply(void 0, args);
  }, timer);
};

/**
 * Creates a new function that takes the same arguments as the original function,
 * but with the first and second arguments reversed.
 *
 * @since 1.0.0
 *
 * @param {Function} func - The function to flip argument order for.
 * @returns {Function} - A new function with flipped argument order.
 *
 * @example
 *
 * function foo(a, b, c) {
 *   console.log(a, b, c);
 * }
 *
 * const flippedFoo = flip(foo);
 *
 * foo(1, 2, 3); // Output: 1, 2, 3
 * flippedFoo(1, 2, 3); // Output: 2, 1, 3
 */
var flip = function flip(func) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return func.apply(void 0, args.reverse());
  };
};

/**
 * Returns a function that negates the result of the given function.
 *
 * @since 1.0.0
 *
 * @param {Function} func - The function to negate.
 * @returns {Function} - A new function that returns the opposite boolean value of `func`.
 *
 * @example
 *
 * function isEven(num) {
 *   return num % 2 === 0;
 * }
 *
 * const isOdd = negate(isEven);
 *
 * isEven(2); // => true
 * isOdd(2);  // => false
 * isEven(3); // => false
 * isOdd(3);  // => true
 */
var negate = function negate(func) {
  return function () {
    return !func.apply(void 0, arguments);
  };
};

/**
 * Creates a new function that can only be called once. Subsequent calls to the
 * returned function will always return the same result as the first call.
 *
 * @since 1.0.0
 *
 * @param {Function} fn - The function to be called once
 * @returns {Function} - A function that can only be called once
 *
 * @example
 *
 * const add = (a, b) => a + b;
 * const addOnce = once(add);
 *
 * console.log(addOnce(2, 3)); // Output: 5
 * console.log(addOnce(4, 5)); // Output: 5
 */
var once = function once(fn) {
  var called = false;
  var result;
  return function () {
    if (!called) {
      result = fn.apply(void 0, arguments);
      called = true;
    }
    return result;
  };
};

/**
 * Creates a function that applies the provided functions to the arguments of the created function.
 * The created function transforms the arguments by the corresponding transform function.
 *
 * @since 1.0.0
 *
 * @param {Function} fn - The function to apply the transforms to.
 * @param {Function[]} transforms - The transform functions to apply to the arguments of the function.
 *
 * @returns {Function} - Returns the new function.
 *
 * @example
 *
 * const double = (n) => n * 2;
 * const square = (n) => n * n;
 * const add = (a, b) => a + b;
 *
 * const addDoubleSquare = overArgs(add, [double, square]);
 *
 * console.log(addDoubleSquare(2, 3)); // Output: 13 ((2 * 2) + (3 * 3 * 2))
 */
var overArgs = function overArgs(fn, transforms) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var mappedArgs = args.map(function (arg, i) {
      return transforms[i] ? transforms[i](arg) : arg;
    });
    return fn.apply(void 0, mappedArgs);
  };
};

/**
 * Creates a partial function that is bound to the specified arguments.
 *
 * @since 1.0.0
 *
 * @param {Function} func - The function to partially apply arguments to.
 * @param {...any} args - The arguments to partially apply to the function.
 * @returns {Function} - Returns the new partially applied function.
 *
 * @example
 * const add = (x, y, z) => x + y + z;
 * const add5 = partial(add, 2, 3);
 * add5(4); // returns 9
 */
var partial = function partial(func) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return function () {
    for (var _len2 = arguments.length, furtherArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      furtherArgs[_key2] = arguments[_key2];
    }
    return func.apply(void 0, args.concat(furtherArgs));
  };
};

/**
 * Creates a new function that invokes the given function with the `cachedArgs`
 * and the additional arguments provided when the new function is called.
 *
 * @since 1.0.0
 *
 * @param {Function} func - The function to partially apply arguments to.
 * @param {...any} cachedArgs - The arguments to be partially applied to `func`.
 * @returns {Function} - Returns the new partially applied function.
 *
 * @example
 *
 * function greet(greeting, name) {
 *   return `${greeting}, ${name}!`;
 * }
 *
 * const sayHelloTo = partialRight(greet, 'Hello');
 *
 * console.log(sayHelloTo('John')); // logs: 'Hello, John!'
 */
var partialRight = function partialRight(func) {
  for (var _len = arguments.length, cachedArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cachedArgs[_key - 1] = arguments[_key];
  }
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return func.apply(void 0, args.concat(cachedArgs));
  };
};

/**
 * Creates a function that invokes `func` with arguments rearranged according to
 * the specified `order`.
 *
 * @since 1.0.0
 *
 * @param {Function} func - The function to rearrange arguments for.
 * @param {Array} order - The specified order of argument positions.
 *
 * @returns {Function} - The new function with rearranged arguments.
 *
 * @example
 * const originalFn = (a, b, c) => [a, b, c];
 * const reargFn = rearg(originalFn, [2, 0, 1]);
 *
 * originalFn(1, 2, 3); // [1, 2, 3]
 * reargFn(1, 2, 3); // [3, 1, 2]
 */
var rearg = function rearg(func, order) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var reargs = order.map(function (idx) {
      return args[idx];
    });
    return func.apply(void 0, reargs);
  };
};

/**
 * Creates a function that invokes the provided function with all but the first argument of the passed arguments.
 *
 * @since 1.0.0
 *
 * @param {Function} func - The function to partially apply arguments to.
 * @returns {Function} - Returns the new partially applied function.
 *
 * @example
 *
 * const logRest = rest(console.log);
 * logRest(1, 2, 3); // Output: 1, 2, 3
 * logRest(1); // Output: 1
 */
var rest = function rest(func) {
  return function (first) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return func(first, args);
  };
};

/**
 * Returns a function that takes an array of arguments and applies it to the given function as separate arguments.
 *
 * @since 1.0.0
 *
 * @param {Function} func - The function to be called with the spread arguments.
 *
 * @return {Function} The new function that takes an array of arguments and applies it to the given function as separate arguments.
 *
 * @example
 *
 * const sum = (x, y, z) => x + y + z;
 * const spreadSum = spread(sum);
 *
 * spreadSum([1, 2, 3]); // Returns: 6
 *
 */
var spread = function spread(func) {
  return function (args) {
    return func.apply(void 0, args);
  };
};

/**
 * Returns a function that accepts only one argument and passes it to the original function.
 *
 * @since 1.0.0
 *
 * @param {Function} fn - The function to wrap.
 * @returns {Function} - A new function that accepts only one argument.
 *
 * @example
 *
 * const double = (x, y) => x * y;
 * const doubleUnary = unary(double);
 *
 * console.log(doubleUnary(2, 3)); // Output: 2
 * console.log(doubleUnary(5, 5)); // Output: 5
 */
var unary = function unary(fn) {
  return function (arg) {
    return fn(arg);
  };
};

/**
 * Creates a new function that calls `func` with `value` as the first argument
 * and passes any additional arguments to `func` after that.
 *
 * @since 1.0.0
 *
 * @param {any} value - The value to pass as the first argument to `func`.
 * @param {Function} func - The function to wrap.
 * @returns {Function} - A new function that wraps `func`.
 *
 * @example
 * const greet = name => `Hello, ${name}!`;
 * const greetBob = wrap('Bob', greet);
 *
 * console.log(greetBob()); // logs "Hello, Bob!"
 * console.log(greetBob('Alice')); // logs "Hello, Bob!"
 */
var wrap = function wrap(value, func) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return func.apply(void 0, [value].concat(args));
  };
};

var func = {
  __proto__: null,
  after: after,
  ary: ary,
  before: before,
  bind: bind,
  bindKey: bindKey,
  curry: curry,
  curryRight: curryRight,
  debounce: debounce$1,
  delay: debounce,
  flip: flip,
  negate: negate,
  once: once,
  overArgs: overArgs,
  partial: partial,
  partialRight: partialRight,
  rearg: rearg,
  rest: rest,
  spread: spread,
  unary: unary,
  wrap: wrap
};

/**
 * Casts the given value as an array if it's not already an array.
 *
 * @since 1.0.0
 *
 * @param {any} input - The value to cast as an array.
 * @returns {Array} - The input value as an array, or an array with the input value as the only element.
 *
 * @example
 *
 * castArray('hello')
 * // => ['hello']
 *
 * castArray([1, 2, 3])
 * // => [1, 2, 3]
 *
 * castArray({ a: 1 })
 * // => [{ a: 1 }]
 */
var castArray = function castArray(input) {
  if (Array.isArray(input)) return input;
  return [input];
};

/**
 * Creates a shallow clone of the input value. If the value is an array, a new
 * array is returned, otherwise a new object is returned.
 *
 * @since 1.0.0
 *
 * @template T - The type of the input value.
 * @param {T} value - The value to clone.
 * @returns {T} - The cloned value.
 *
 * @example
 *
 * clone([1, 2, 3]); // Returns [1, 2, 3]
 * clone({ x: 1, y: 2 }); // Returns { x: 1, y: 2 }
 * clone(new Map([['x', 1], ['y', 2]])); // Returns a new map containing [['x', 1], ['y', 2]]
 * clone(new Set([1, 2, 3])); // Returns a new set containing [1, 2, 3]
 * clone(new RegExp('ab+c', 'i')); // Returns a new RegExp with the same pattern and flags.
 * clone(new Date()); // Returns a new date with the same value.
 */
var clone = function clone(value) {
  if (Array.isArray(value)) return value.slice();
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  if (value instanceof Map) return new Map(value);
  if (value instanceof Set) return new Set(value);
  if (value instanceof Date) return new Date(value);
  if (typeof value === 'object' && value !== null) return _extends({}, value);
  return value;
};

/**
 * Creates a deep clone of the input value.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} value - The input value to clone.
 * @returns {T} - The cloned value.
 *
 * @example
 *
 * const obj = { a: 1, b: { c: 2 } };
 * const clone = cloneDeep(obj);
 * obj.b.c = 3;
 * console.log(clone.b.c); // Output: 2
 */
var cloneDeep = function cloneDeep(value) {
  if (Array.isArray(value)) {
    return value.slice().map(cloneDeep);
  } else if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  } else if (value instanceof Set) {
    var out = new Set();
    value.forEach(function (v) {
      return out.add(cloneDeep(v));
    });
    return out;
  } else if (value instanceof Map) {
    var _out = new Map();
    value.forEach(function (v, k) {
      return _out.set(k, cloneDeep(v));
    });
    return _out;
  } else if (value instanceof Date) {
    return new Date(value);
  } else if (typeof value === 'object' && value !== null) {
    var _out2 = {};
    for (var k in value) {
      _out2[k] = cloneDeep(value[k]);
    }
    return _out2;
  }
  return value;
};

/**
 * Creates a deep copy of the input value and applies a customizer function to each property.
 * If the input value is an HTML DOM element, it is cloned using the `cloneNode` method and
 * passed to the customizer function.
 *
 * @param value - The input value to clone.
 * @param customizer - A function that takes a value and returns a new value, or `undefined` to use
 * the default cloning behavior.
 * @returns A deep copy of the input value with the customizer function applied to each property.
 */
function cloneWith(value, customizer) {
  if (typeof customizer !== 'function') {
    return value;
  }
  if (value instanceof HTMLElement) {
    return customizer(value.cloneNode(true)) || value.cloneNode(true);
  }
  var clonedValue = Array.isArray(value) ? [] : _extends({}, value);
  for (var key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      //	@ts-ignore
      clonedValue[key] = customizer(value[key]);
      //	@ts-ignore
      if (clonedValue[key] === undefined) {
        //	@ts-ignore
        clonedValue[key] = cloneWith(value[key], customizer);
      }
    }
  }
  return clonedValue;
}

/**
 * Checks if the provided object conforms to the source object's properties and values.
 *
 * @since 1.1.0
 *
 * @param {Object} object - The object to check.
 * @param {Object} source - The object of property predicates to conform to.
 * @returns {boolean} - Returns `true` if object conforms, else `false`.
 *
 * @example
 *
 * const object = { 'a': 1, 'b': 2 };
 * conformsTo(object, { 'b': (n) => n > 1 }); // => true
 * conformsTo(object, { 'a': (n) => n > 1 }); // => false
 */
var conformsTo = function conformsTo(object, source) {
  var entries = Object.entries(source);
  for (var i = 0; i < entries.length; i++) {
    var valueInMainObject = object[entries[i][0]];
    //	@ts-ignore
    if (entries[i][1](valueInMainObject) !== true) return false;
  }
  return true;
};

/**
 * Checks if two values are equivalent, based on the `Object.is` method.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to compare.
 * @param {*} other - The other value to compare.
 * @returns {boolean} - Returns `true` if the values are equivalent, else `false`.
 *
 * @example
 *
 * eq(NaN, NaN); // => true
 *
 * eq(1, 1); // => true
 * eq(1, '1'); // => false
 * eq({}, {}); // => false
 * eq([], []); // => false
 */
var eq = function eq(value, other) {
  return value === other || value !== value && other !== other;
};

/**
 * Checks if `value` is greater than `other`.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to compare.
 * @param {*} other - The other value to compare.
 * @returns {boolean} - Returns `true` if `value` is greater than `other`, else `false`.
 *
 * @example
 *
 * gt(3, 1); // => true
 * gt(1, 3); // => false
 */
var gt = function gt(value, other) {
  return value > other;
};

/**
 * Checks if `value` is greater than or equal to `other`.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to compare.
 * @param {*} other - The other value to compare.
 * @returns {boolean} - Returns `true` if `value` is greater than or equal to `other`, else `false`.
 *
 * @example
 *
 * gte(3, 1);
 * // => true
 *
 * gte(1, 3);
 * // => false
 *
 * gte(2, 2);
 * // => true
 */
var gte = function gte(value, other) {
  return value >= other;
};

/**
 * Determines whether the given item is an `arguments` object.
 *
 * @since 1.0.0
 *
 * @param {*} item - The item to check.
 * @returns {boolean} - `true` if the item is an `arguments` object, `false` otherwise.
 *
 * @example
 * const args = (function() { return arguments; })();
 * isArguments(args); // returns true
 *
 * const arr = [1, 2, 3];
 * isArguments(arr); // returns false
 */
var isArguments = function isArguments(item) {
  return Object.prototype.toString.call(item) === '[object Arguments]';
};

/**
 * Determines whether the given value is an array.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - `true` if the value is an array, `false` otherwise.
 *
 * @example
 * isArray([]); // returns true
 * isArray([1, 2, 3]); // returns true
 * isArray({}); // returns false
 * isArray(null); // returns false
 */
var isArray = function isArray(value) {
  return Array.isArray(value);
};

/**
 * Determines whether the given value is an `ArrayBuffer` object.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - `true` if the value is an `ArrayBuffer` object, `false` otherwise.
 *
 * @example
 * const buffer = new ArrayBuffer(16);
 * isArrayBuffer(buffer); // returns true
 *
 * const arr = [1, 2, 3];
 * isArrayBuffer(arr); // returns false
 */
var isArrayBuffer = function isArrayBuffer(value) {
  return value instanceof ArrayBuffer;
};

/**
 * Determines whether the given value is an array-like object.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - `true` if the value is an array-like object, `false` otherwise.
 *
 * @example
 * isArrayLike('hello'); // returns true
 * isArrayLike([1, 2, 3]); // returns true
 * isArrayLike(document.querySelectorAll('.example')); // returns true
 * isArrayLike({}); // returns false
 * isArrayLike(null); // returns false
 */
var isArrayLike = function isArrayLike(value) {
  try {
    return value.length >= 0;
  } catch (_unused) {
    return false;
  }
};

/**
 * Determines whether the given value is an object that has a length property and is not a function.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - `true` if the value is an array-like object, `false` otherwise.
 *
 * @example
 * isArrayLikeObject({ length: 0 }); // returns true
 * isArrayLikeObject([1, 2, 3]); // returns true
 * isArrayLikeObject('hello'); // returns true
 * isArrayLikeObject(document.querySelectorAll('.example')); // returns true
 * isArrayLikeObject(() => {}); // returns false
 * isArrayLikeObject(null); // returns false
 */
var isArrayLikeObject = function isArrayLikeObject(value) {
  return typeof value === 'object';
};

/**
 * Determines whether the given value is a boolean.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - `true` if the value is a boolean, `false` otherwise.
 *
 * @example
 * isBoolean(true); // returns true
 * isBoolean(false); // returns true
 * isBoolean(0); // returns false
 * isBoolean('true'); // returns false
 * isBoolean(null); // returns false
 */
var isBoolean = function isBoolean(value) {
  return value === true || value === false;
};

/**
 * Determines whether the given value is a Node.js Buffer object.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - `true` if the value is a Node.js Buffer object, `false` otherwise.
 *
 * @example
 * const buf = Buffer.from('hello', 'utf8');
 * isBuffer(buf); // returns true
 *
 * const arr = [1, 2, 3];
 * isBuffer(arr); // returns false
 */
var isBuffer = function isBuffer(value) {
  return Buffer.isBuffer(value);
};

/**
 * Determines whether the given value is a valid Date object.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - `true` if the value is a valid Date object, `false` otherwise.
 *
 * @example
 * isDate(new Date()); // returns true
 * isDate('2021-09-01T00:00:00.000Z'); // returns true
 * isDate(1630454400000); // returns true
 * isDate(null); // returns false
 * isDate(undefined); // returns false
 * isDate('hello'); // returns false
 */
var isDate = function isDate(value) {
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return !isNaN(value.getTime());
  }
  return false;
};

/**
 * Determines whether the given value is a DOM element.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - `true` if the value is a DOM element, `false` otherwise.
 *
 * @example
 * isElement(document.createElement('div')); // returns true
 * isElement(document.createTextNode('hello')); // returns false
 */
var isElement = function isElement(value) {
  return typeof HTMLElement === 'object' ? value instanceof HTMLElement //DOM2
  : value && typeof value === 'object' && value !== null && value.nodeType === 1 && typeof value.nodeName === 'string';
};

/**
 * Determines whether the given value is empty or not.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - `true` if the value is empty, `false` otherwise.
 *
 * @example
 * isEmpty(null); // returns true
 * isEmpty(undefined); // returns true
 * isEmpty(0); // returns true
 * isEmpty(''); // returns true
 * isEmpty([]); // returns true
 * isEmpty({}); // returns true
 * isEmpty(new Set()); // returns true
 * isEmpty(new Map()); // returns true
 * isEmpty({ a: 1 }); // returns false
 * isEmpty('hello'); // returns false
 * isEmpty([1, 2, 3]); // returns false
 * isEmpty(new Set([1, 2, 3])); // returns false
 * isEmpty(new Map([['a', 1]])); // returns false
 */
var isEmpty = function isEmpty(value) {
  if (value === null || value === undefined || typeof value === 'number' || typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  if (value instanceof Set || value instanceof Map) return value.length > 0;
  return false;
};

/**
 * Determines whether the two given values are equal or not.
 *
 * @since 1.0.0
 *
 * @param {*} value - The first value to compare.
 * @param {*} other - The second value to compare.
 * @returns {boolean} - `true` if the values are equal, `false` otherwise.
 *
 * @example
 * isEqual(1, 1); // returns true
 * isEqual('hello', 'hello'); // returns true
 * isEqual({ a: 1 }, { a: 1 }); // returns true
 * isEqual([1, 2, 3], [1, 2, 3]); // returns true
 * isEqual(new Set([1, 2, 3]), new Set([1, 2, 3])); // returns true
 * isEqual(new Map([['a', 1]]), new Map([['a', 1]])); // returns true
 * isEqual(null, undefined); // returns false
 * isEqual({ a: 1 }, { a: 2 }); // returns false
 * isEqual([1, 2, 3], [1, 2]); // returns false
 * isEqual(new Set([1, 2, 3]), new Set([1, 2])); // returns false
 * isEqual(new Map([['a', 1]]), new Map([['b', 1]])); // returns false
 */
var isEqual = function isEqual(value, other) {
  /* Checking if any arguments are null */
  if (value === null || other === null) return false;
  /* Checking if the types and values of the two arguments are the same. */
  if (value === other) return true;
  /* Checking if any argument is none object */
  if (typeof value !== 'object' || typeof other !== 'object') return false;
  /* Using Object.getOwnPropertyNames() method to return the list of the objects' properties */
  var value_keys = Object.getOwnPropertyNames(value);
  var other_keys = Object.getOwnPropertyNames(other);
  /* Checking if the objects' length are same*/
  if (value_keys.length !== other_keys.length) return false;
  /* Iterating through all the properties of the value object with the for of method*/
  for (var _iterator = _createForOfIteratorHelperLoose(value_keys), _step; !(_step = _iterator()).done;) {
    var key = _step.value;
    /* Making sure that every property in the value object also exists in other object. */
    if (!other.hasOwnProperty(key)) return false;
    /* Using the compareAnything function recursively (calling itself) and passing the values of each property into it to check if they are equal. */
    if (isEqual(value[key], other[key]) === false) return false;
  }
  /* if no case matches, returning true */
  return true;
};

/**
 * Performs a deep comparison between two values to determine if they are equivalent,
 * using a custom function to compare values.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to compare.
 * @param {*} other - The other value to compare.
 * @param {Function} customizer - The function to customize value comparisons.
 * @returns {boolean} - Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * function compareFunc(objValue, othValue) {
 *   if (Array.isArray(objValue) && Array.isArray(othValue)) {
 *     return objValue.length === othValue.length;
 *   }
 * }
 *
 * const object = { 'a': [{ 'b': 2 }, { 'd': 4 }] };
 * const other = { 'a': [{ 'b': 2 }, { 'd': 4 }] };
 *
 * isEqualWith(object, other, compareFunc);
 * // => true
 *
 * isEqualWith(object, other, (objValue, othValue) => {
 *   if (Array.isArray(objValue) && Array.isArray(othValue)) {
 *     return objValue.length === othValue.length;
 *   }
 * });
 * // => true
 *
 */
var isEqualWith = function isEqualWith(value, other, customizer) {
  /* Checking if any arguments are null */
  if (value === null || other === null) return false;
  /* Checking if the types and values of the two arguments are the same. */
  if (customizer(value, other)) return true;
  /* Checking if any argument is none object */
  if (typeof value !== 'object' || typeof other !== 'object') return false;
  /* Using Object.getOwnPropertyNames() method to return the list of the objects' properties */
  var value_keys = Object.getOwnPropertyNames(value);
  var other_keys = Object.getOwnPropertyNames(other);
  /* Checking if the objects' length are same*/
  if (value_keys.length !== other_keys.length) return false;
  /* Iterating through all the properties of the value object with the for of method*/
  for (var _iterator = _createForOfIteratorHelperLoose(value_keys), _step; !(_step = _iterator()).done;) {
    var key = _step.value;
    /* Making sure that every property in the value object also exists in other object. */
    if (!other.hasOwnProperty(key)) return false;
    /* Using the compareAnything function recursively (calling itself) and passing the values of each property into it to check if they are equal. */
    if (isEqualWith(value[key], other[key], customizer) === false) return false;
  }
  /* if no case matches, returning true */
  return true;
};

/**
 * Checks if a value is an error object.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is an error object, else `false`.
 *
 * @example
 *
 * isError(new Error('Something went wrong')) // => true
 *
 * isError('Error') // => false
 */
var isError = function isError(value) {
  return value instanceof Error;
};

/**
 * Checks if an object is extensible (whether it can have new properties added to it or not).
 *
 * @since 1.0.0
 *
 * @param {Object|Array} collection - The collection to check for extensibility.
 *
 * @returns {boolean} - Returns `true` if the collection is extensible, else `false`.
 *
 * @example
 *
 * const obj = { a: 1 };
 * const arr = [1, 2, 3];
 *
 * Object.preventExtensions(obj);
 *
 * isExtensible(obj); // returns false
 * isExtensible(arr); // returns true
 */
var isExtensible = function isExtensible(collection) {
  return Object.isExtensible(collection);
};

/**
 * Checks if a value is a finite number.
 *
 * @since 1.0.0
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Returns `true` if `value` is a finite number, else `false`.
 *
 * @example
 *
 * isFinite(3); // true
 * isFinite(Number.POSITIVE_INFINITY); // false
 * isFinite('123'); // false
 */
var isFinite = function isFinite(value) {
  return Number.isFinite(value);
};

/**
 * Checks if an object or array is frozen using the built-in `Object.isFrozen()` method.
 *
 * @since 1.0.0
 *
 * @param {Object|Array} collection - The object or array to check if it's frozen.
 * @returns {boolean} - Returns `true` if the object or array is frozen, else `false`.
 *
 * @example
 *
 * const obj = {a: 1, b: 2};
 * Object.freeze(obj);
 *
 * console.log(isFrozen(obj)); // true
 *
 * const arr = [1, 2, 3];
 * Object.freeze(arr);
 *
 * console.log(isFrozen(arr)); // true
 *
 * const obj2 = {a: {b: 1}};
 *
 * console.log(isFrozen(obj2)); // false
 */
var isFrozen = function isFrozen(collection) {
  return Object.isFrozen(collection);
};

/**
 * Checks if a value is a function.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is a function, else `false`.
 *
 * @example
 *
 * isFunction(function() {}) // true
 * isFunction(() => {}) // true
 * isFunction(1) // false
 */
var isFunction = function isFunction(value) {
  return value instanceof Function && typeof value === 'function';
};

/**
 * Checks if a value is an integer.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Whether or not the value is an integer.
 *
 * @example
 *
 * isInteger(5); // true
 * isInteger('5'); // false
 * isInteger(5.1); // false
 */
var isInteger = function isInteger(value) {
  return Number.isInteger(value);
};

/**
 * Checks if a value is a valid array-like length.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is a valid length, else `false`.
 *
 * @example
 *
 * isLength(3); // => true
 *
 * isLength(Number.MIN_VALUE); // => false
 *
 * isLength(Infinity); // => false
 *
 * isLength('3'); // => false
 */
var isLength = function isLength(value) {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER;
};

/**
 * Checks if a value is a Map object.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if value is a Map object, else false.
 *
 * @example
 *
 * isMap(new Map()); // true
 * isMap(new Set()); // false
 * isMap({}); // false
 */
var isMap = function isMap(value) {
  return value instanceof Map && value.toString() === '[object Map]';
};

/**
 * Checks if an object matches a source object, using a customizer function.
 *
 * @since 1.0.0
 *
 * @param {Object} object - The object to check for a match.
 * @param {Object} source - The object to match against.
 *
 * @returns {boolean} - Returns true if the object matches the source object, else false.
 *
 * @example
 *
 * const object = { 'a': 1, 'b': 2, 'c': 3 };
 *
 * isMatch(object, { 'b': 2 }); // true
 * isMatch(object, { 'b': 1 }); // false
 */
var isMatch = function isMatch(object, source) {
  var fn = createPredicate(source);
  return [object].some(function (s) {
    return fn(s);
  });
};

/**
 * Checks if an object has a value matching the key-value pairs of another object using a customizer function.
 *
 * @since 1.0.0
 *
 * @param {Object} object - The object to inspect.
 * @param {Object} source - The object of property values to match.
 * @param {Function} customizer - The function to customize value comparisons.
 *
 * @returns {boolean} - Returns `true` if `object` has matching key-value pairs from `source`, else `false`.
 *
 * @example
 *
 * const object = { 'a': 1, 'b': 2, 'c': 3 };
 * const source = { 'a': 1, 'b': 2 };
 *
 * function customizer(objValue, srcValue, key, object, source) {
 *     return objValue === srcValue;
 * }
 *
 * isMatchWith(object, source, customizer); // returns true
 */
var isMatchWith = function isMatchWith(object, source, customizer) {
  var keys = Object.keys(object);
  for (var i = 0; i < keys.length; i++) {
    if (!customizer(object[keys[i]], object[keys[i]], keys[i], object, source)) {
      return false;
    }
  }
  return true;
};

/**
 * Determines whether a value is NaN (Not-A-Number).
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is NaN, else `false`.
 *
 * @example
 *
 * isNaN(NaN); // true
 * isNaN('string'); // true
 * isNaN(1); // false
 */
var isNaN$1 = function isNaN(value) {
  return value instanceof Number || Number.isNaN(value);
};

/**
 * Checks if a value is a native function.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if `value` is a native function, else `false`.
 *
 * @example
 *
 * isNative(alert);
 * // => true
 *
 * isNative(Math.max);
 * // => true
 *
 * isNative(debounce);
 * // => false
 */
var isNative = function isNative(value) {
  return !!value && (typeof value).toLowerCase() === 'function' && (value === Function.prototype || /^\s*function\s*(\b[a-z$_][a-z0-9$_]*\b)*\s*\((|([a-z$_][a-z0-9$_]*)(\s*,[a-z$_][a-z0-9$_]*)*)\)\s*{\s*\[native code\]\s*}\s*$/i.test(String(value)));
};

/**
 * Checks if a value is null or undefined.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is null or undefined, else `false`.
 *
 * @example
 *
 * isNil(null); // true
 * isNil(undefined); // true
 * isNil(0); // false
 * isNil(''); // false
 */
var isNil = function isNil(value) {
  return value === null || value === undefined;
};

/**
 * Checks if a value is `null`.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - `true` if the value is `null`, else `false`.
 *
 * @example
 *
 * isNull(null); // true
 * isNull(undefined); // false
 * isNull(''); // false
 */
var isNull = function isNull(value) {
  return value === null;
};

/**
 * Checks if a value is a number.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is a number, false otherwise.
 *
 * @example
 *
 * isNumber(42); // true
 * isNumber(NaN); // true
 * isNumber('42'); // false
 * isNumber(null); // false
 */
var isNumber = function isNumber(value) {
  return typeof value === 'number' || value instanceof Number;
};

/**
 * Checks if a given value is an object.
 *
 * @since 1.0.0
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is an object, else `false`.
 *
 * @example
 *
 * isObject({}); // => true
 * isObject(null); // => false
 * isObject(42); // => false
 */
var isObject = function isObject(value) {
  return !isNil(value) && value instanceof Object;
};

/**
 * Checks if `value` is object-like.
 *
 * @since 0.1.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if `value` is object-like, else `false`.
 *
 * @example
 *
 * isObjectLike({}); // => true
 *
 * isObjectLike([1, 2, 3]); // => true
 *
 * isObjectLike(Function); // => false
 *
 * isObjectLike(null); // => false
 */
var isObjectLike = function isObjectLike(value) {
  return value !== null && typeof value === 'object';
};

/**
 * Checks if a value is a plain object, i.e., an object created by the Object constructor
 * or one with a [[Prototype]] of `null`.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if `value` is a plain object, else `false`.
 *
 * @example
 *
 * isPlainObject({}) // true
 * isPlainObject({ foo: 'bar' }) // true
 * isPlainObject(Object.create(null)) // true
 * isPlainObject(new Object()) // true
 * isPlainObject(new Date()) // false
 * isPlainObject(Math) // false
 * isPlainObject(/regexp/) // false
 * isPlainObject(null) // false
 * isPlainObject(123) // false
 * isPlainObject('abc') // false
 * isPlainObject(['a', 'b', 'c']) // false
 * isPlainObject(function() {}) // false
 *
 */
var isPlainObject = function isPlainObject(value) {
  return (
    //  value?.constructor === Object;
    !!value && typeof value === 'object' && (value.__proto__ === null || value.__proto__ === Object.prototype)
  );
};

/**
 * Checks if a given value is a regular expression.
 *
 * @since 1.0.0
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Returns `true` if `value` is a regular expression, else `false`.
 *
 * @example
 * isRegExp(/ab+c/i); // => true
 */
var isRegExp = function isRegExp(value) {
  return value instanceof RegExp;
};

/**
 * Checks if a value is a safe integer, which is a number between -(2^53 - 1) and 2^53 - 1.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is a safe integer, else `false`.
 *
 * @example
 *
 * isSafeInteger(42);
 * // => true
 *
 * isSafeInteger(Number.MAX_SAFE_INTEGER);
 * // => true
 *
 * isSafeInteger(Number.MIN_SAFE_INTEGER);
 * // => true
 *
 * isSafeInteger('42');
 * // => false
 *
 * isSafeInteger(3.14);
 * // => false
 *
 * isSafeInteger(Number.POSITIVE_INFINITY);
 * // => false
 */
var isSafeInteger = function isSafeInteger(value) {
  return Number.isSafeInteger(value);
};

/**
 * Checks if an object is sealed.
 *
 * @since 1.0.0
 *
 * @param {Object|Array<any>} collection - The object or array to check.
 * @returns {boolean} - Returns `true` if the object is sealed, else `false`.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * console.log(Object.isSealed(obj)); // false
 *
 * Object.seal(obj);
 * console.log(Object.isSealed(obj)); // true
 *
 * const arr = [1, 2, 3];
 * console.log(Object.isSealed(arr)); // false
 *
 * Object.seal(arr);
 * console.log(Object.isSealed(arr)); // true
 *
 * console.log(isSealed(obj)); // true
 * console.log(isSealed(arr)); // true
 */
var isSealed = function isSealed(collection) {
  return Object.isSealed(collection);
};

/**
 * Checks if a value is a Set.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is a Set, else `false`.
 *
 * @example
 *
 * isSet(new Set()); // => true
 *
 * isSet(new WeakSet()); // => false
 *
 * isSet({ key: 'value' }); // => false
 */
var isSet = function isSet(value) {
  return value instanceof Set || value.toString() === '[object Set]';
};

/**
 * Checks if a value is a string.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if `value` is a string, else `false`.
 *
 * @example
 *
 * isString('hello'); // => true
 * isString(123); // => false
 */
var isString = function isString(value) {
  return typeof value === 'string';
};

/**
 * Checks if a given value is a symbol.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 *
 * @returns {boolean} - Returns `true` if the value is a symbol, else `false`.
 *
 * @example
 *
 * isSymbol(Symbol.iterator); // => true
 * isSymbol('abc'); // => false
 */
var isSymbol = function isSymbol(value) {
  return typeof value === 'symbol';
};

/**
 * Checks if a given value is a typed array.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is a typed array, else `false`.
 *
 * @example
 * isTypedArray(new Int32Array([1, 2, 3])); // => true
 * isTypedArray([]); // => false
 */
var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
var isTypedArray = function isTypedArray(value) {
  return typedArrayPattern.test(Object.prototype.toString.call(value));
};

/**
 * Checks if a value is undefined.
 *
 * @since 1.0.0
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Returns `true` if `value` is undefined, else `false`.
 *
 * @example
 *
 * isUndefined(undefined); // true
 * isUndefined(null); // false
 * isUndefined(0); // false
 * isUndefined(''); // false
 * isUndefined(false); // false
 */
var isUndefined = function isUndefined(value) {
  return value === undefined;
};

/**
 * Checks if a value is a WeakMap object.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is a WeakMap, else `false`.
 *
 * @example
 *
 * isWeakMap(new WeakMap()); // true
 * isWeakMap(new Map()); // false
 */
var isWeakMap = function isWeakMap(value) {
  return value instanceof WeakMap;
};

/**
 * Checks if a value is a WeakSet.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is a WeakSet, else `false`.
 *
 * @example
 *
 * isWeakSet(new WeakSet()); // => true
 * isWeakSet(new Set()); // => false
 * isWeakSet({}); // => false
 */
var isWeakSet = function isWeakSet(value) {
  return value instanceof WeakSet;
};

/**
 * Checks if `value` is less than `other`.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to compare.
 * @param {*} other - The other value to compare.
 * @returns {boolean} - Returns `true` if `value` is less than `other`, else `false`.
 *
 * @example
 * lt(1, 3); // => true
 * lt(3, 1); // => false
 * lt('a', 'z'); // => true
 */
var lt = function lt(value, other) {
  return value < other;
};

/**
 * Checks if `value` is less than or equal to `other`.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to compare.
 * @param {*} other - The other value to compare.
 * @returns {boolean} - Returns `true` if `value` is less than or equal to `other`, else `false`.
 *
 * @example
 *
 * lte(1, 2)
 * // => true
 *
 * lte(2, 1)
 * // => false
 *
 * lte(2, 2)
 * // => true
 */
var lte = function lte(value, other) {
  return value <= other;
};

/**
 * Converts a value to a number.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to convert to a number.
 * @returns {number} - The converted number.
 *
 * @example
 *
 * toNumber('123') // 123
 * toNumber('abc') // NaN
 * toNumber(null) // 0
 * toNumber(undefined) // NaN
 * toNumber({}) // NaN
 */
var toNumber = function toNumber(value) {
  return Number(value);
};

/**
 * Converts `value` to a plain object with its own enumerable properties.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to convert.
 * @returns {Object} - The converted plain object.
 *
 * @example
 *
 * toPlainObject({ a: 1, b: 2 }) // { a: 1, b: 2 }
 * toPlainObject(new Map([['a', 1], ['b', 2]])) // { a: 1, b: 2 }
 * toPlainObject([1, 2, 3]) // { '0': 1, '1': 2, '2': 3 }
 */
var toPlainObject = function toPlainObject(value) {
  value = Object(value);
  var result = {};
  for (var property in value) {
    result[property] = value[property];
  }
  return result;
};

/**
 * Converts a value to a safe integer. Returns a safe integer that is at least -9007199254740991 and at most 9007199254740991.
 *
 * @since 1.0.0
 *
 * @param {any} value - The value to convert.
 * @returns {number} - Returns the converted safe integer.
 *
 * @example
 *
 * toSafeInteger(3.2) // => 3
 * toSafeInteger(Infinity) // => 9007199254740991
 * toSafeInteger('3.2') // => 3
 * toSafeInteger(Number.MIN_VALUE) // => 0
 */
var toSafeInteger = function toSafeInteger(value) {
  var minimum = Math.min(value, Number.MAX_SAFE_INTEGER);
  var maximum = Math.max(minimum, Number.MIN_SAFE_INTEGER);
  return Math.round(maximum);
};

/**
 * Converts a value to a string.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to convert to a string.
 * @returns {string} - The string representation of the given value.
 *
 * @example
 * toString('Hello') // returns 'Hello'
 * toString(123) // returns '123'
 * toString(null) // returns ''
 * toString(undefined) // returns ''
 * toString(-0) // returns '-0'
 * toString(0) // returns '0'
 */
var toString = function toString(value) {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  if (value === -0) return "-0";
  if (value === 0) return '0';
  return new String(value).toString();
};

var lang = {
  __proto__: null,
  castArray: castArray,
  clone: clone,
  cloneDeep: cloneDeep,
  cloneWith: cloneWith,
  conformsTo: conformsTo,
  eq: eq,
  gt: gt,
  gte: gte,
  isArguments: isArguments,
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isArrayLike: isArrayLike,
  isArrayLikeObject: isArrayLikeObject,
  isBoolean: isBoolean,
  isBuffer: isBuffer,
  isDate: isDate,
  isElement: isElement,
  isEmpty: isEmpty,
  isEqual: isEqual,
  isEqualWith: isEqualWith,
  isError: isError,
  isExtensible: isExtensible,
  isFinite: isFinite,
  isFrozen: isFrozen,
  isFunction: isFunction,
  isInteger: isInteger,
  isLength: isLength,
  isMap: isMap,
  isMatch: isMatch,
  isMatchWith: isMatchWith,
  isNaN: isNaN$1,
  isNative: isNative,
  isNil: isNil,
  isNull: isNull,
  isNumber: isNumber,
  isObject: isObject,
  isObjectLike: isObjectLike,
  isPlainObject: isPlainObject,
  isRegExp: isRegExp,
  isSafeInteger: isSafeInteger,
  isSealed: isSealed,
  isSet: isSet,
  isString: isString,
  isSymbol: isSymbol,
  isTypedArray: isTypedArray,
  isUndefined: isUndefined,
  isWeakMap: isWeakMap,
  isWeakSet: isWeakSet,
  lt: lt,
  lte: lte,
  toNumber: toNumber,
  toPlainObject: toPlainObject,
  toSafeInteger: toSafeInteger,
  toString: toString
};

/**
 * Adds two or more numbers or strings.
 *
 * @since 1.0.0
 *
 * @param {number|string} augend - The first number or string to be added.
 * @param {number|string} addend - The second number or string to be added.
 * @param {...(number|string)} restNumbers - The rest of the numbers or strings to be added.
 * @returns {number} - The sum of all numbers or concatenated string.
 *
 * @example
 * add(2, 3); // returns 5
 * add('Hello', 'World'); // returns 'HelloWorld'
 * add(1, 2, 3, 4); // returns 10
 */
var add = function add(augend, addend) {
  var defaultValue = typeof augend === 'string' || typeof addend === 'string' ? '' : 0;
  for (var _len = arguments.length, restNumbers = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    restNumbers[_key - 2] = arguments[_key];
  }
  var numbers = [augend, addend].concat(restNumbers);
  return numbers.reduce(function (oldValue, nextValue) {
    return oldValue + nextValue;
  }, defaultValue);
};

//  @ts-nocheck
var baseMathPrecesion = function baseMathPrecesion(number, precision, mathFunctionName) {
  var coefficient = Math.pow(10, precision);
  return Math[mathFunctionName](number * coefficient) / coefficient;
};

/**
 * Calculates the ceiling value of a given number to the nearest precision value.
 *
 * @since 1.0.0
 *
 * @param {number} value - The number to be rounded.
 * @param {number} [precision=0] - The precision value to round the number to. Default is 0.
 * @returns {number} - The rounded ceiling value.
 *
 * @example
 *
 * ceil(4.006);
 * // => 5
 *
 * ceil(6.004, 2);
 * // => 6.01
 *
 * ceil(6040, -2);
 * // => 6100
 */
var ceil = function ceil(value, precision) {
  if (precision === void 0) {
    precision = 0;
  }
  return baseMathPrecesion(value, precision, 'ceil');
};

/**
 * Returns the result of dividing the `dividend` by the `divisor`.
 *
 * @since 1.0.0
 *
 * @param {number|string} dividend - The value to be divided.
 * @param {number|string} divisor - The value to divide the `dividend` by.
 *
 * @returns {number|NaN} - The quotient of the division. Returns `NaN` if the `dividend` or `divisor` is not a number.
 *
 * @example
 *
 * divide(8, 2);
 * // => 4
 *
 * divide('8', '2');
 * // => 4
 *
 * divide(1, 0);
 * // => NaN
 *
 * divide('foo', 2);
 * // => NaN
 */
var divide = function divide(dividend, divisor) {
  return Number(dividend) / Number(divisor);
};

/**
 * Calculates the floor value of a given number up to a specified precision.
 *
 * @since 1.0.0
 *
 * @param {number} value - The number to calculate the floor value of.
 * @param {number} [precision=0] - The number of decimal places to round down to. Defaults to 0.
 * @returns {number} - The floor value of the given number.
 *
 * @example
 *
 * floor(4.7); // returns 4
 * floor(-4.7); // returns -5
 * floor(4060, -2); // returns 4000
 * floor(0.046, 2); // returns 0.04
 */
var floor = function floor(value, precision) {
  if (precision === void 0) {
    precision = 0;
  }
  return baseMathPrecesion(value, precision, 'floor');
};

/**
 * Returns the maximum number in the given collection.
 *
 * @since 1.0.0
 *
 * @param collection - The collection of numbers to find the maximum from.
 * @returns The maximum number in the collection or undefined if the collection is empty.
 *
 * @example
 * max([1, 3, 2]); // returns 3
 */
var max = function max(collection) {
  return collection.length === 0 ? undefined : Math.max.apply(Math, collection);
};

/**
 * Returns the maximum value of a collection based on an iteratee function. If multiple
 * objects in the collection have the same maximum iteratee value, the first one found
 * will be returned.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {Array<T>} collection - The collection to iterate over.
 * @param {Function} iteratee - The iteratee to determine the max value.
 * @returns {T|undefined} - Returns the maximum value or undefined if the collection is empty.
 * @example
 *
 * const users = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 30 },
 *   { name: 'Charlie', age: 20 }
 * ];
 *
 * const oldestUser = maxBy(users, (user) => user.age);
 * console.log(oldestUser); // { name: 'Bob', age: 30 }
 */
var maxBy = function maxBy(collection, iteratee) {
  var fn = createPredicate(iteratee);
  return collection.reduce(function (a, b) {
    return fn(a) >= fn(b) ? a : b;
  }, {});
};

/**
 * Calculates the mean of an array of numbers.
 *
 * @since 1.0.0
 *
 * @param {number[]} collection - The array of numbers to calculate the mean for.
 * @returns {number} - The mean value of the array.
 *
 * @example
 *
 * // returns 2
 * mean([1, 2, 3]);
 *
 * // returns 5
 * mean([5, 5, 5, 5]);
 */
var mean = function mean(collection) {
  return collection.reduce(function (acc, num) {
    return acc + num;
  }, 0) / collection.length;
};

/**
 * Returns the sum of all the values obtained by applying the iteratee function to each element in the array.
 *
 * @since 1.0.0
 *
 * @param {T[]} numbers - The array of numbers to sum.
 * @param {Function} iteratee - The function to apply to each element to get its value for summing.
 *
 * @returns {number} - The sum of all the values obtained by applying the iteratee function to each element in the array.
 *
 * @example
 *
 * // returns 15
 * sumBy([1, 2, 3, 4, 5], (num) => num);
 *
 * // returns 3
 * sumBy([{ val: 1 }, { val: 2 }, { val: 0 }], (obj) => obj.val);
 */
var sumBy = function sumBy(numbers, iteratee) {
  var fn = createPredicate(iteratee);
  return numbers.reduce(function (oldValue, nextValue) {
    return oldValue + fn(nextValue);
  }, 0);
};

/**
 * Calculates the mean value of an array of objects using the given iteratee.
 *
 * @since 1.0.0
 *
 * @template T
 *
 * @param {T[]} collection - The array of objects to calculate the mean for.
 * @param {Function} iteratee - The iteratee to use for extracting the values to calculate the mean.
 *
 * @returns {number} - The mean value of the array.
 *
 * @example
 *
 * // returns 2
 * meanBy([{ value: 1 }, { value: 2 }, { value: 3 }], (obj) => obj.value);
 *
 * // returns 5
 * meanBy([{ value: 5 }, { value: 5 }, { value: 5 }, { value: 5 }], (obj) => obj.value);
 */
var meanBy = function meanBy(collection, iteratee) {
  return sumBy(collection, iteratee) / collection.length;
};

/**
 * Returns the minimum value in an array of numbers.
 *
 * @since 1.0.0
 *
 * @param {number[]} collection - The array of numbers to search for the minimum value.
 * @returns {number|undefined} - The minimum value in the array, or undefined if the array is empty.
 *
 * @example
 *
 * // returns 1
 * min([1, 2, 3]);
 *
 * // returns undefined
 * min([]);
 */
var min = function min(collection) {
  return collection.length === 0 ? undefined : Math.min.apply(Math, collection);
};

/**
 * Returns the object in an array of objects with the minimum value calculated using the given iteratee.
 *
 * @since 1.0.0
 *
 * @template T
 *
 * @param {T[]} collection - The array of objects to search for the minimum value.
 * @param {Function} iteratee - The iteratee to use for extracting the values to compare for the minimum.
 *
 * @returns {T} - The object with the minimum value calculated using the iteratee.
 *
 * @example
 *
 * // returns { name: 'alice', age: 25 }
 * minBy([{ name: 'alice', age: 25 }, { name: 'bob', age: 30 }, { name: 'charlie', age: 20 }], (obj) => obj.age);
 *
 * // returns { name: 'brenda', age: 25 }
 * minBy([{ name: 'alice', age: 30 }, { name: 'brenda', age: 25 }, { name: 'charlie', age: 30 }], (obj) => obj.name.length);
 */
var minBy = function minBy(collection, iteratee) {
  var fn = createPredicate(iteratee);
  return collection.reduce(function (a, b) {
    return fn(a) <= fn(b) ? a : b;
  }, {});
};

/**
 * Returns the product of all the numbers passed in as arguments.
 *
 * @since 1.0.0
 *
 * @param {...number} numbers - The numbers to multiply.
 * @returns {number} - The product of all the numbers.
 *
 * @example
 *
 * // returns 120
 * multiply(1, 2, 3, 4, 5);
 *
 * // returns -15
 * multiply(3, -5);
 */
var multiply = function multiply() {
  for (var _len = arguments.length, numbers = new Array(_len), _key = 0; _key < _len; _key++) {
    numbers[_key] = arguments[_key];
  }
  return numbers.reduce(function (oldValue, newValue) {
    return oldValue * newValue;
  }, 1);
};

/**
 * Returns the number rounded to the specified number of decimal places.
 *
 * @since 1.0.0
 *
 * @param {number} value - The number to round.
 * @param {number} [precision=0] - The number of decimal places to round to.
 *
 * @returns {number} - The number rounded to the specified number of decimal places.
 *
 * @example
 *
 * // returns 3.14
 * round(3.14159265359, 2);
 *
 * // returns 3
 * round(3.14159265359);
 */
var round = function round(value, precision) {
  if (precision === void 0) {
    precision = 0;
  }
  return baseMathPrecesion(value, precision, 'round');
};

/**
 * Subtracts all the numbers passed in as arguments from the first number passed in.
 *
 * @since 1.0.0
 *
 * @param {...number} numbers - The numbers to subtract from the first number.
 *
 * @returns {number} - The result of subtracting all the numbers from the first number.
 *
 * @example
 *
 * // returns 10
 * subtract(20, 5, 3, 2);
 *
 * // returns 0
 * subtract(10, 5, 2, 3);
 */
var subtract = function subtract() {
  for (var _len = arguments.length, numbers = new Array(_len), _key = 0; _key < _len; _key++) {
    numbers[_key] = arguments[_key];
  }
  return numbers.reduce(function (oldValue, newValue, index) {
    return index === 0 ? newValue : oldValue - newValue;
  }, 0);
};

/**
 * Returns the sum of all the numbers in the array.
 *
 * @since 1.0.0
 *
 * @param {number[]} numbers - The array of numbers to sum.
 *
 * @returns {number} - The sum of all the numbers in the array.
 *
 * @example
 *
 * // returns 15
 * sum([1, 2, 3, 4, 5]);
 *
 * // returns -2
 * sum([-1, -2, 0, 1]);
 */
var sum = function sum(numbers) {
  return numbers.reduce(function (acc, num) {
    acc += num;
    return acc;
  }, 0);
};

var math = {
  __proto__: null,
  add: add,
  ceil: ceil,
  divide: divide,
  floor: floor,
  max: max,
  maxBy: maxBy,
  mean: mean,
  meanBy: meanBy,
  min: min,
  minBy: minBy,
  multiply: multiply,
  round: round,
  subtract: subtract,
  sum: sum,
  sumBy: sumBy
};

/**
 * Clamps the given number between the given lower and upper bounds.
 *
 * @since 1.0.0
 *
 * @param {number} number - The number to clamp.
 * @param {number} lower - The lower bound for the clamped value.
 * @param {number} upper - The upper bound for the clamped value.
 *
 * @returns {number} - The clamped value.
 *
 * @example
 *
 * // returns 5
 * clamp(10, 0, 5);
 *
 * // returns 0
 * clamp(-10, 0, 5);
 *
 * // returns 3
 * clamp(3, 0, 5);
 *
 * // returns -5
 * clamp(-10, -5, undefined);
 */
var clamp = function clamp(number, lower, upper) {
  return upper ? Math.min(Math.max(number, lower), upper) : Math.min(number, lower);
};

/**
 * Checks if the given number is within the specified range.
 *
 * @since 1.0.0
 *
 * @param {number} number - The number to check.
 * @param {number} [start=0] - The start of the range (inclusive if `end` is defined).
 * @param {number} [end] - The end of the range (exclusive if defined).
 *
 * @returns {boolean} - `true` if the number is in range, `false` otherwise.
 *
 * @example
 *
 * // returns true
 * inRange(2, 0, 5);
 *
 * // returns true
 * inRange(2, 5, 0);
 *
 * // returns true
 * inRange(2, 2, 5);
 *
 * // returns false
 * inRange(5, 0, 5);
 */
var inRange = function inRange(number, start, end) {
  if (start === void 0) {
    start = 0;
  }
  if (end === void 0) {
    end = undefined;
  }
  if (end === undefined) {
    end = start;
    start = 0;
  }
  return Math.min(start, end) <= number && number < Math.max(start, end);
};

var randomFloat = function randomFloat(a, b) {
  if (a === void 0) {
    a = 1;
  }
  if (b === void 0) {
    b = 0;
  }
  var lower = Math.min(a, b);
  var upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};
var randomInt = function randomInt(a, b) {
  if (a === void 0) {
    a = 1;
  }
  if (b === void 0) {
    b = 0;
  }
  var lower = Math.ceil(Math.min(a, b));
  var upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
/**
 * Returns a random number within the specified range. If only one argument is provided, the number will be between 0 and the given number.
 *
 * @since 1.0.0
 *
 * @param {number} [lower=0] - The lower bound of the range (inclusive if `upper` is defined).
 * @param {number|boolean} [upper=1] - The upper bound of the range (exclusive if defined), or a boolean flag indicating whether to return a floating-point number.
 *
 * @returns {number} - A random number within the specified range.
 *
 * @example
 *
 * // returns a random integer between 0 and 9
 * random(10);
 *
 * // returns a random integer between 1 and 10
 * random(1, 11);
 *
 * // returns a random floating-point number between 0 and 1
 * random(true);
 *
 * // returns a random floating-point number between 2 and 3
 * random(3, 2);
 */
var random = function random(lower, upper) {
  if (lower === void 0) {
    lower = 0;
  }
  if (upper === void 0) {
    upper = 1;
  }
  if (upper === undefined) {
    upper = lower;
    lower = 0;
  }
  if (upper === true || parseInt(upper.toString()) !== upper) {
    return randomFloat(upper, lower);
  }
  return randomInt(upper, lower);
};

var num = {
  __proto__: null,
  clamp: clamp,
  inRange: inRange,
  random: random
};

/**
 * Creates a new object that combines the properties of the specified objects.
 *
 * @since 1.0.0
 *
 * @param {object} object - The object to which the properties of the other objects will be assigned.
 * @param {...object} sources - The objects whose properties will be assigned to the `object`.
 *
 * @returns {object} - A new object that combines the properties of the specified objects.
 *
 * @example
 *
 * // returns { a: 1, b: 2, c: 3 }
 * assign({ a: 1 }, { b: 2 }, { c: 3 });
 *
 * // returns { a: 1, b: 2, c: 3, d: 4 }
 * assign({ a: 1, b: 2 }, { c: 3, d: 4 });
 */
var assign = function assign(object) {
  var data = _extends({}, object);
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }
  sources.map(function (m) {
    return Object.assign(data, _extends({}, m));
  });
  return data;
};

/**
 * Assigns own enumerable string keyed properties of source objects to the destination object.
 * Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} object - The destination object.
 * @param {...any[]} sources - The source objects.
 * @returns {T} - The modified object.
 *
 * @example
 *
 * const object = { a: 1 };
 * const other = { b: 2 };
 *
 * assignIn(object, other);
 * // => { 'a': 1, 'b': 2 }
 */
var assignIn = function assignIn(object) {
  var length = arguments.length <= 1 ? 0 : arguments.length - 1;
  if (length < 1 || object == null) return object;
  for (var i = 0; i < length; i++) {
    var source = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
    for (var key in source) {
      //  @ts-ignore
      object[key] = source[key];
    }
  }
  return object;
};

/**
 * This method is like `assignIn` except that it accepts customizer which is
 * invoked to produce the assigned values. If customizer returns undefined,
 * assignment is handled by the method instead. The customizer is invoked with
 * five arguments: (objValue, srcValue, key, object, source).
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} object - The destination object.
 * @param {...any} args - The source objects.
 * @param {Function} customizer - The function to customize assigned values.
 * @returns {T} - Returns `object`.
 *
 * @example
 *
 * const object = { 'a': [{ 'b': 2 }, { 'd': 4 }] };
 * const other = { 'a': [{ 'c': 3 }, { 'e': 5 }] };
 *
 * function customizer(objValue, srcValue) {
 *   if (Array.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * const result = assignInWith(object, other, customizer);
 * console.log(result);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var assignInWith = function assignInWith(object) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var lastElement = args[args.length - 1];
  if (lastElement instanceof Function && typeof lastElement === 'function') {
    var customizer = args.pop();
    var length = args.length;
    if (length < 1 || object == null) return object;
    for (var i = 0; i < length; i++) {
      var source = args[i];
      for (var key in source) {
        object[key] = customizer(object[key], source[key], key, object, source);
      }
    }
  }
  return object;
};

/**
 * Assigns the enumerable own and inherited properties of one or more source objects to a target object.
 * If a customizer function is provided, it will be invoked to produce the assigned values.
 * The customizer is invoked with five arguments: (value, sourceValue, key, object, source).
 * The purpose of the customizer function is to modify the values before they are assigned to the target object.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} object - The target object to assign the properties to.
 * @param {...any} args - The source objects containing the properties to assign.
 * @returns {T} - The modified target object.
 *
 * @example
 *
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 *
 * const result = assignWith(target, source1, source2, (objValue, srcValue) => objValue === undefined ? srcValue : objValue);
 *
 * console.log(result); // { a: 1, b: 2, c: 3 }
 */
var assignWith = function assignWith(object) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var lastElement = args[args.length - 1];
  if (lastElement instanceof Function && typeof lastElement === 'function') {
    var customizer = args.pop();
    var data = _extends({}, object);
    args.map(function (source) {
      Object.keys(source).forEach(function (key) {
        object[key] = customizer(data[key], source[key], key, data, source);
      });
    });
    // Object.assign(data as object, { ...m }));
    // return data;
    // const length = args.length;
    // if (length < 1 || object == null) return object;
    // for (let i = 0; i < length; i++) {
    // 	const source = args[i];
    // 	for (const key in source) {
    // 		(object as any)[key] = (customizer as any)(
    // 			(object as any)[key],
    // 			source[key],
    // 			key,
    // 			object,
    // 			source
    // 		);
    // 	}
    // }
  }

  return object;
};

/**
 * Creates an array of values corresponding to the specified paths of an object.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} object - The object to retrieve the values from.
 * @param {any[]} paths - The property paths to retrieve the values from.
 * @returns {any[]} - An array of values corresponding to the specified paths of the object.
 *
 * @example
 * const object = { a: [{ b: { c: 3 } }, 4] };
 * const result = at(object, ['a[0].b.c', 'a[1]']);
 *
 * console.log(result); // [3, 4]
 */
var at = function at(object, paths) {
  var data = [];
  paths.forEach(function (f) {
    var value = get(object, f);
    if (value) data.push(value);
  });
  return data;
};

/**
 * Creates a new object with the specified prototype and properties.
 * If the properties argument is not provided, an empty object with the given prototype is created.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} prototype - The prototype of the newly created object.
 * @param {T | null} [properties=null] - The properties of the newly created object.
 * @returns {T} - A new object with the specified prototype and properties.
 *
 * @example
 * const prototype = { a: 1 };
 *
 * const obj1 = create(prototype);
 * console.log(obj1); // {}

 * const obj2 = create(prototype, { b: 2 });
 * console.log(obj2); // { b: 2 }
 *
 * const obj3 = create(prototype, { a: 3, b: 4 });
 * console.log(obj3); // { a: 3, b: 4 }
 */
var create = function create(prototype, properties) {
  if (properties === void 0) {
    properties = null;
  }
  if (properties === null) return Object.assign(Object.create(prototype));
  return Object.assign(Object.create(prototype), _extends({}, properties));
};

/**
 * Creates a new object with properties of multiple source objects merged together from left to right.
 * If multiple source objects have the same property, the value from the last source object will be used.
 *
 * @since 1.0.0
 *
 * @param {...Object} args - The source objects to merge.
 * @returns {Object} - A new object with properties of multiple source objects merged together.
 *
 * @example
 * const obj1 = { a: 1 };
 * const obj2 = { b: 2 };
 * const obj3 = { c: 3 };
 *
 * const result1 = defaults(obj1, obj2, obj3);
 * console.log(result1); // { a: 1, b: 2, c: 3 }
 *
 * const obj4 = { a: 10, d: 4 };
 * const obj5 = { b: 20, a: 5 };
 *
 * const result2 = defaults(obj4, obj5);
 * console.log(result2); // { a: 5, d: 4, b: 20 }
 */
var defaults = function defaults() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args.reverse().reduce(function (acc, object) {
    return _extends({}, acc, object);
  }, {});
};

/**
 * Creates an array of key-value pairs for the given object.
 *
 * @since 1.0.0
 *
 * @param {object} object - The object to convert to pairs.
 * @returns {Array<[string, any]>} - An array of key-value pairs for the given object.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * const result = toPairs(obj);
 * console.log(result); // [['a', 1], ['b', 2], ['c', 3]]
 */
var toPairs = function toPairs(object) {
  return Object.entries(object);
};

/**
 * Creates an array of key-value pairs for the given object.
 *
 * @since 1.0.0
 *
 * @param {object} object - The object to convert to pairs.
 * @returns {Array<[string, any]>} - An array of key-value pairs for the given object.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * const result = entries(obj);
 * console.log(result); // [['a', 1], ['b', 2], ['c', 3]]
 */
var entries = toPairs;

/**
 * Assigns own enumerable string keyed properties of source objects to the destination object.
 * Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} object - The destination object.
 * @param {...any[]} sources - The source objects.
 * @returns {T} - The modified object.
 *
 * @example
 *
 * const object = { a: 1 };
 * const other = { b: 2 };
 *
 * extend(object, other);
 * // => { 'a': 1, 'b': 2 }
 */
var extend = assignIn;

/**
 * This method is like `assignIn` except that it accepts customizer which is
 * invoked to produce the assigned values. If customizer returns undefined,
 * assignment is handled by the method instead. The customizer is invoked with
 * five arguments: (objValue, srcValue, key, object, source).
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} object - The destination object.
 * @param {...any} args - The source objects.
 * @param {Function} customizer - The function to customize assigned values.
 * @returns {T} - Returns `object`.
 *
 * @example
 *
 * const object = { 'a': [{ 'b': 2 }, { 'd': 4 }] };
 * const other = { 'a': [{ 'c': 3 }, { 'e': 5 }] };
 *
 * function customizer(objValue, srcValue) {
 *   if (Array.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * const result = extendWith(object, other, customizer);
 * console.log(result);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var extendWith = assignInWith;

/**
 * Iterates over an object's own and inherited enumerable properties, returning the first key that the predicate function returns truthy for.
 *
 * @since 1.0.0
 *
 * @param {object} object - The object to iterate over.
 * @param {predicateType} predicate - The function invoked per iteration.
 * @returns {any} - The key of the first element that satisfies the predicate function, otherwise undefined.
 *
 * @example
 * const users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * };
 *
 * const isActive = (value) => value.active;
 * const result = findKey(users, isActive);
 * console.log(result); // 'barney'
 */
var findKey = function findKey(object, predicate) {
  var dataInArray = Object.entries(object).map(function (m) {
    return _extends({
      __key__: m[0]
    }, m[1]);
  });
  var record = find(dataInArray, predicate);
  if (record) return record.__key__;
  return undefined;
};

/**
 * This method is like `findKey` except that it iterates over elements of a collection from right to left.
 *
 * @since 1.0.0
 *
 * @param {object} object - The object to iterate over.
 * @param {predicateType} predicate - The function invoked per iteration.
 * @returns {any} - The key of the last element that satisfies the predicate function, otherwise undefined.
 *
 * @example
 * const users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * };
 *
 * const isActive = (value) => value.active;
 * const result = findLastKey(users, isActive);
 * console.log(result); // 'pebbles'
 */
var findLastKey = function findLastKey(object, predicate) {
  var dataInArray = Object.entries(object).map(function (m) {
    return _extends({
      __key__: m[0]
    }, m[1]);
  });
  var indexOfRecord = findLastIndex(dataInArray, predicate);
  if (indexOfRecord > -1) return dataInArray[indexOfRecord].__key__;
  return undefined;
};

/**
 * Iterates over own and inherited enumerable string keyed properties of an object and invokes iteratee for each property.
 *
 * @since 1.0.0
 *
 * @param {Object} object - The object to iterate over.
 * @param {Function} iteratee - The function to invoke per iteration.
 * @returns {Object} - Returns object.
 *
 * @example
 * const object = { 'a': 1, 'b': 2 };
 *
 * forIn(object, function(value, key) {
 *   console.log(key);
 * });
 * // Output: 'a' (iteration order is not guaranteed)
 * // Output: 'b' (iteration order is not guaranteed)
 *
 * forIn(object, function(value, key) {
 *   object[key] = value * 2;
 * });
 * console.log(object);
 * // Output: { 'a': 2, 'b': 4 }
 */
var forIn = function forIn(object, iteratee) {
  var collection = assignIn({}, object);
  return applyArrayFn({
    collection: collection,
    fnName: 'forEach',
    iteratee: iteratee
  });
};

/**
 * Iterates over an object's own and inherited enumerable string keyed properties in reverse order,
 * calling `iteratee` for each property. The `iteratee` is invoked with three arguments:
 * (value, key, object). Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} object - The object to iterate over.
 * @param {Function} iteratee - The function invoked per iteration.
 * @returns {T} - Returns the object.
 *
 * @example
 *
 * const object = { 'a': 1, 'b': 2 };
 *
 * forInRight(object, (value, key) => {
 *   console.log(key);
 * });
 * // => Logs 'b' then 'a'.
 */
var forInRight = function forInRight(object, iteratee) {
  var collection = assignIn({}, object);
  var reverseData = reverseCollection(collection);
  return reverseData.forEach(function (value, key, index) {
    iteratee(value, key, reverseData, index);
  });
};

/**
 * Iterates over an object's own enumerable string keyed properties, calling `iteratee` for each property.
 * The `iteratee` is invoked with three arguments: (value, key, object). Iteratee functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @since 1.0.0
 *
 * @param {Object} object - The object to iterate over.
 * @param {Function} iteratee - The function invoked per iteration.
 * @returns {Object} - Returns the object.
 *
 * @example
 *
 * const object = { 'a': 1, 'b': 2 };
 *
 * forOwn(object, (value, key) => {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b'.
 */
var forOwn = function forOwn(object, iteratee) {
  return applyArrayFn({
    collection: object,
    fnName: 'forEach',
    iteratee: iteratee
  });
};

/**
 * Iterates over own enumerable string keyed properties of an object in reverse order
 * invoking `iteratee` for each property. The iteratee is invoked with three arguments:
 * (value, key, object).
 *
 * @since 1.0.0
 *
 * @param {Object} object - The object to iterate over.
 * @param {Function} iteratee - The function invoked per iteration.
 * @returns {Object} - Returns `object`.
 *
 * @example
 *
 * const object = { 'a': 1, 'b': 2 };
 *
 * forOwnRight(object, (value, key) => {
 *   console.log(key, value);
 * });
 * // => Logs 'b 2' then 'a 1'.
 */
var forOwnRight = function forOwnRight(object, iteratee) {
  var reverseData = reverseCollection(object);
  return reverseData.forEach(function (value, key, index) {
    iteratee(value, key, reverseData, index);
  });
};

/**
 * Returns an array of all the function names in the given object.
 *
 * @param {Object} object - The object to search for functions.
 * @returns {Array} - An array of all the function names in the object.
 * @since 1.0.0
 *
 * @example
 *
 * const obj = {
 *   add: function(a, b) {
 *     return a + b;
 *   },
 *   subtract: function(a, b) {
 *     return a - b;
 *   },
 *   name: 'John Doe'
 * };
 *
 * const functionNames = functions(obj);
 * // functionNames = ['add', 'subtract']
 */
var functions = function functions(object) {
  var _Object$keys$filter;
  return (_Object$keys$filter = Object.keys(object).filter(function (key) {
    return typeof object[key] === 'function';
  })) != null ? _Object$keys$filter : [];
};

/**
 * Returns an array of all the function names in the given object, including inherited ones.
 *
 * @param {Object} object - The object to search for functions.
 * @returns {Array} - An array of all the function names in the object, including inherited ones.
 * @since 1.0.0
 *
 * @example
 *
 * class Animal {
 *   constructor(name) {
 *     this.name = name;
 *   }
 *
 *   speak() {
 *     console.log(`${this.name} makes a noise.`);
 *   }
 * }
 *
 * class Dog extends Animal {
 *   speak() {
 *     console.log(`${this.name} barks.`);
 *   }
 * }
 *
 * const d = new Dog('Mitzie');
 *
 * const functionNames = functionsIn(d);
 * // functionNames = ['speak']
 */
var functionsIn = function functionsIn(object) {
  var _Object$keys$filter;
  var collection = assignIn({}, object);
  return (_Object$keys$filter = Object.keys(collection).filter(function (key) {
    return typeof collection[key] === 'function';
  })) != null ? _Object$keys$filter : [];
};

/**
 * Checks if the given object has the specified property path. Property path may be specified as a string
 * or an array of keys.
 *
 * @param {Object} object - The object to query.
 * @param {(string|Array|*)} path - The property path to check.
 * @returns {boolean} - Returns `true` if the property exists, else `false`.
 * @since 1.0.0
 *
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * has(object, 'a[0].b.c');
 * // => true
 *
 * has(object, ['a', '0', 'b', 'c']);
 * // => true
 *
 * has(object, 'a.b.c');
 * // => false
 */
var has = function has(object, path) {
  if (Object.keys(object).length === 0) return false;
  // it might not work for some edge cases. Test your code!
  var pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  return !!pathArray.reduce(function (prevObj, key) {
    return prevObj && prevObj[key];
  }, object);
};

/**
 * Checks if the given object has the specified property path. Property path may be specified as a string
 * or an array of keys. Unlike `has`, this method accepts a second argument `object` to specify the object to
 * query instead of using `Object(object)` to coerce the `object` to an object.
 *
 * @param {*} object - The value to query.
 * @param {(string|Array|*)} path - The property path to check.
 * @returns {boolean} - Returns `true` if the property exists, else `false`.
 * @since 1.0.0
 *
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * hasIn(object, 'a[0].b.c');
 * // => true
 *
 * hasIn(object, ['a', '0', 'b', 'c']);
 * // => true
 *
 * hasIn(object, 'a.b.c');
 * // => false
 */
var hasIn = function hasIn(object, path) {
  var plainObject = toPlainObject(object);
  if (Object.keys(plainObject).length === 0) return false;
  // it might not work for some edge cases. Test your code!
  var pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  return !!pathArray.reduce(function (prevObj, key) {
    return prevObj && prevObj[key];
  }, plainObject);
};

/**
 * Inverts the keys and values of an object. If multiple keys have the same value,
 * only the last key will be kept in the result.
 *
 * @param {Object} object - The object to invert.
 * @returns {Object} - The new object with inverted keys and values.
 *
 * @example
 *
 * const object = { a: 1, b: 2, c: 1 };
 * const inverted = invert(object);
 *
 * console.log(inverted);
 * // Output: { '1': 'c', '2': 'b' }
 *
 * @example
 *
 * const object = { a: 'x', b: 'y', c: 'z' };
 * const inverted = invert(object);
 *
 * console.log(inverted);
 * // Output: { 'x': 'a', 'y': 'b', 'z': 'c' }
 */
var invert = function invert(object) {
  return Object.entries(object).reduce(function (acc, _ref) {
    var _extends2;
    var key = _ref[0],
      value = _ref[1];
    return _extends({}, acc, (_extends2 = {}, _extends2[value] = key, _extends2));
  }, {});
};

/**
 * Creates an object composed of keys generated from the results of running each element of object thru `iteratee`.
 * The corresponding value of each key is an array of original keys responsible for generating the key.
 *
 * @since 1.0.0
 *
 * @param object - The object to invert.
 * @param iteratee - The function invoked per iteration.
 * @returns The new inverted object.
 *
 * @example
 * const object = { 'a': 1, 'b': 2, 'c': 1 };
 *
 * invertBy(object);
 * // => { '1': ['a', 'c'], '2': ['b'] }
 *
 * invertBy(object, (value) => `group_${value}`);
 * // => { 'group_1': ['a', 'c'], 'group_2': ['b'] }
 */
var invertBy = function invertBy(object, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  var fn = createPredicate(iteratee);
  return Object.entries(object).reduce(function (acc, _ref) {
    var _extends2;
    var key = _ref[0],
      value = _ref[1];
    var newKey = fn(value);
    var valueOfNewKey = acc[newKey];
    return _extends({}, acc, (_extends2 = {}, _extends2[newKey] = valueOfNewKey === undefined ? [key] : [].concat(valueOfNewKey, [key]), _extends2));
  }, {});
};

/**
 * Returns an array of the own enumerable property names of the given object.
 *
 * @since 1.0.0
 *
 * @param {object} object - The object to retrieve the keys from.
 * @returns {Array} - An array of the object's keys.
 *
 * @example
 *
 * const object = { a: 1, b: 2, c: 3 };
 *
 * keys(object);
 * // => ['a', 'b', 'c']
 */
var keys = function keys(object) {
  return Object.keys(object);
};

/**
 * This method returns all the own and inherited enumerable property names of an object.
 *
 * @since 1.0.0
 *
 * @param {object} object - The object to query.
 * @returns {Array} - Returns the array of property names.
 *
 * @example
 *
 * keysIn({a: 1, b: 2})  // => ['a', 'b']
 */
var keysIn = function keysIn(object) {
  var collection = assignIn({}, object);
  return Object.keys(collection);
};

/**
 * Creates an object with the same values as the original, but with new keys generated
 * by applying an iteratee function to each key in the original object.
 *
 * @since 1.0.0
 *
 * @param {Object} object - The object to map.
 * @param {Function} iteratee - The mapping function.
 * @returns {Object} - The new object with mapped keys.
 *
 * @example
 *
 * const users = {
 *   john: { age: 23 },
 *   jane: { age: 31 },
 *   jack: { age: 27 }
 * };
 *
 * const uppercaseKeys = mapKeys(users, (value, key) => key.toUpperCase());
 *
 * console.log(uppercaseKeys);
 * // Output: { JOHN: { age: 23 }, JANE: { age: 31 }, JACK: { age: 27 } }
 */
var mapKeys = function mapKeys(object, iteratee) {
  var fn = createPredicate(iteratee);
  return Object.entries(object).reduce(function (acc, _ref) {
    var _extends2;
    var key = _ref[0],
      value = _ref[1];
    return _extends({}, acc, (_extends2 = {}, _extends2[fn(value, key)] = value, _extends2));
  }, {});
};

/**
 * Creates an object with the same keys as the original object and values generated by running each
 * own enumerable string keyed property of the object through the iteratee function.
 *
 * @since 1.0.0
 * @param {Object} object - The object to iterate over.
 * @param {Function} [iteratee=identity] - The function invoked per iteration.
 * @returns {Object} - Returns the new mapped object.
 *
 * @example
 *
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * const mapped = mapValues(obj, (value, key) => value * 2);
 * console.log(mapped);
 * // => { a: 2, b: 4, c: 6 }
 */
var mapValues = function mapValues(object, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  var fn = createPredicate(iteratee);
  return Object.entries(object).reduce(function (acc, _ref) {
    var _extends2;
    var key = _ref[0],
      value = _ref[1];
    return _extends({}, acc, (_extends2 = {}, _extends2[key] = fn(value), _extends2));
  }, {});
};

function innerMerge(object, source) {
  for (var _i = 0, _Object$entries = Object.entries(source); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _Object$entries[_i],
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    object[key] = mergeValue(object[key], value);
  }
}
function mergeValue(objectValue, value) {
  if (Array.isArray(value)) {
    if (!Array.isArray(objectValue)) {
      return [].concat(value);
    } else {
      for (var i = 0, l = value.length; i < l; i++) {
        objectValue[i] = mergeValue(objectValue[i], value[i]);
      }
      return objectValue;
    }
  } else if (typeof value === 'object') {
    if (objectValue && typeof objectValue === 'object') {
      innerMerge(objectValue, value);
      return objectValue;
    } else {
      return value ? _extends({}, value) : value;
    }
  } else {
    var _ref;
    return (_ref = value != null ? value : objectValue) != null ? _ref : undefined;
  }
}
/**
 * Merges multiple objects into a single object. The resulting object will have the same properties as
 * the input objects, with values from later objects overwriting earlier ones if there are conflicts.
 *
 * @since 1.0.0
 * @template T - The type of the object to merge.
 * @param {T} object - The object to merge other objects into.
 * @param {...any} sources - Additional objects to merge into the first object.
 * @returns {T} - The merged object.
 * @example
 *
 * const object1 = { a: [{ b: 2 }, { d: 4 }] };
 * const object2 = { a: [{ c: 3 }, { e: 5 }] };
 * const result = merge(object1, object2);
 * console.log(result); // { a: [{ b: 2, c: 3 }, { d: 4, e: 5 }] }
 *
 * const object3 = { a: 1, b: 2 };
 * const object4 = { b: 3, c: 4 };
 * const result2 = merge(object3, object4);
 * console.log(result2); // { a: 1, b: 3, c: 4 }
 */
var merge = function merge(object) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }
  for (var _i2 = 0, _sources = sources; _i2 < _sources.length; _i2++) {
    var source = _sources[_i2];
    mergeValue(object, source);
  }
  return object;
};

/**
 * Creates an object composed of the object properties that are not included in the given `paths`.
 *
 * @since 1.0.0
 *
 * @param {Object} object - The source object.
 * @param {Array} paths - The property paths to omit.
 * @returns {Object} - Returns the new object.
 *
 * @example
 *
 * omit({a: 1, b: 2, c: 3}, ['a', 'c']);
 * // => {b: 2}
 */
var omit = function omit(object, paths) {
  return Object.fromEntries(Object.entries(object).filter(function (_ref) {
    var key = _ref[0];
    return !paths.includes(key);
  }));
};

/**
 * Creates an object composed of the object properties predicate does not return truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @since 1.0.0
 *
 * @template T
 * @param {Object} object - The source object.
 * @param {Function} predicate - The function invoked per iteration.
 * @returns {Object} - Returns the new object.
 *
 * @example
 *
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * omitBy(object, (value) => typeof value === 'number');
 * // => { 'b': '2' }
 */
var omitBy = function omitBy(object, predicate) {
  var fn = createPredicate(predicate);
  Object.entries(object).forEach(function (_ref) {
    var key = _ref[0],
      value = _ref[1];
    return fn(value) && delete object[key];
  });
  return object;
};

/**
 * Creates an object composed of the picked object properties.
 *
 * @since 1.0.0
 *
 * @param {Object} object - The source object.
 * @param {string|string[]} paths - The property path(s) to pick.
 * @returns {Object} - Returns the new object.
 *
 * @example
 *
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 *
 * pick(object, 'a', 'c');
 * // => { 'a': 1, 'c': 3 }
 */
var pick = function pick(object, paths) {
  return (typeof paths === 'string' ? [paths] : paths).reduce(function (obj, key) {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

/**
 * Creates an object composed of the object properties predicate returns truthy for.
 *
 * @since 1.0.0
 *
 * @param {Object} object - The source object.
 * @param {Function} predicate - The function invoked per iteration.
 * @returns {Object} - The new object.
 *
 * @example
 *
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * pickBy(object, (value) => typeof value === 'number');
 * // => { 'a': 1, 'c': 3 }
 */
var pickBy = function pickBy(object, predicate) {
  var fn = createPredicate(predicate);
  var newObject = {};
  Object.entries(object).forEach(function (_ref) {
    var key = _ref[0],
      value = _ref[1];
    if (fn(value)) {
      newObject[key] = value;
    }
  });
  return newObject;
};

/**
 * Sets the value at path of object. If a portion of path doesn't exist, it's created.
 *
 * @param {Object} object - The object to modify.
 * @param {Array<string>|string} path - The path of the property to set.
 * @param {*} value - The value to set.
 * @returns {Object} - The modified object.
 *
 * @example
 *
 * const object = { a: { b: { c: 3 } } };
 *
 * set(object, 'a.b.c', 4);
 * // => { a: { b: { c: 4 } } }
 *
 * set(object, ['x', '0', 'y', 'z'], 5);
 * // => { a: { b: { c: 3 } }, x: [{ y: { z: 5 } }] }
 */
var set = function set(object, path, value) {
  var _ref;
  var pathArray = (_ref = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)) != null ? _ref : [];
  pathArray.reduce(function (acc, key, i) {
    if (acc[key] === undefined) acc[key] = {};
    if (i === pathArray.length - 1) acc[key] = value;
    return acc[key];
  }, object);
  return object;
};

/**
 * This method is like `set` except that it accepts `customizer` which is invoked to produce the
 * value to be set. If `customizer` returns `undefined` the value is not set.
 *
 * @since 1.3.0
 *
 * @template T The type of the object.
 * @param {T} object - The object to modify.
 * @param {(any[] | string)} path - The path of the property to set.
 * @param {*} value - The value to set.
 * @param {Function} customizer - The function to customize assigned values.
 * @returns {T} - Returns the modified object.
 *
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * setWith(object, '[0].a.b.c', 4, (value) => value === 3 ? 1 : value);
 * // => { 'a': [{ 'b': { 'c': 1 } }] }
 */
var setWith = function setWith(object, path, value, customizer) {
  var _ref;
  var pathArray = (_ref = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)) != null ? _ref : [];
  pathArray.reduce(function (acc, key, i) {
    if (acc[key] === undefined) acc[key] = {};
    if (i === pathArray.length - 1) acc[key] = customizer(value);
    return acc[key];
  }, object);
  return object;
};

/**
 * Creates an array of key-value pairs for the given object, including inherited properties.
 *
 * @since 1.0.0
 *
 * @param {object} object - The object to convert to pairs.
 * @returns {Array<[string, any]>} - An array of key-value pairs for the given object.
 *
 * @example
 * const proto = { a: 1 };
 * const obj = Object.create(proto, {
 *   b: { value: 2 }
 * });
 *
 * const result = toPairsIn(obj);
 * console.log(result); // [['b', 2], ['a', 1]]
 */
var toPairsIn = function toPairsIn(object) {
  var newObject = assignIn({}, object);
  return Object.entries(newObject);
};

/**
 * Transforms a collection by iterating over its elements and applying a transformation function.
 *
 * @since 1.0.0
 *
 * @param {Array | Object} collection - The collection to be transformed. Can be an array or an object with string keys.
 * @param {function} [iteratee=identity] - The transformation function to be applied to each element in the collection. Takes four parameters: the current `result`, the current `value`, the current `key`, and the entire `collection`.
 * @param {*} [accumulator] - The initial value for the result. Defaults to `undefined`.
 *
 * @returns {*} - The transformed collection of the same type as the `accumulator` parameter.
 *
 * @example
 *
 * transform([2, 3, 4], function(result, n) {
 * result.push(n *= n);
 * return n % 2 == 0
 * }, [])
 * // => [4, 9]
 *
 * transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key)
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] }
 */
var transform = function transform(collection, iteratee, accumulator) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  var keys = Array.isArray(collection) ? undefined : Object.keys(collection);
  var length = (keys || collection).length;
  var index = -1;
  var result = accumulator === undefined ? Array.isArray(collection) ? [] : {} : accumulator;
  while (++index < length) {
    var key = keys ? keys[index] : index;
    var value = collection[key];
    var transformedValue = iteratee(result, value, key, collection);
    if (transformedValue === false) {
      break;
    }
  }
  return result;
};

/**
 * Removes the specified property at the given path from the provided object.
 *
 * @since 1.0.0
 *
 * @template T - Type of the input object.
 *
 * @param {T} object - The input object from which the property needs to be removed.
 * @param {any} path - The path to the property that needs to be removed. Can be an array or a string.
 *
 * @returns {boolean} - Returns true if the property was successfully removed, false otherwise.
 *
 * @example
 * const obj = { a: { b: { c: 1 } } };
 * unset(obj, 'a.b.c'); // true
 * // obj is now { a: { b: {} } }
 *
 * const obj2 = { a: { b: { c: 1 } } };
 * unset(obj2, 'a.b.d'); // false
 * // obj2 remains { a: { b: { c: 1 } } }
 */
var unset = function unset(object, path) {
  var isKeyRemoved = false;
  var pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  pathArray.reduce(function (acc, key, i) {
    if (i === pathArray.length - 1) {
      delete acc[key];
      isKeyRemoved = true;
    }
    return acc[key];
  }, object);
  return isKeyRemoved;
};

/**
 * Updates the value of a property at the specified path in the provided object using the given updater function.
 *
 * @since 1.0.0
 *
 * @template T - Type of the input object.
 *
 * @param {T} object - The input object to update.
 * @param {string|any} path - The path to the property to update. Can be an array or a string.
 * @param {Function} updater - The function that will be used to update the property value.
 *
 * @returns {Object} - The updated object.
 *
 * @example
 * const obj = { a: { b: { c: 1 } } };
 * update(obj, 'a.b.c', (val) => val + 1); // { a: { b: { c: 2 } } }
 *
 * const obj2 = { a: { b: { c: 1 } } };
 * update(obj2, 'a.b.d', (val) => 2); // { a: { b: { c: 1, d: 2 } } }
 */
var update = function update(object, path, updater) {
  var pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  pathArray.reduce(function (acc, key, i) {
    if (acc[key] === undefined) acc[key] = {};
    if (i === pathArray.length - 1) acc[key] = updater(acc[key]);
    return acc[key];
  }, object);
  return object;
};

/**
 * Updates the value of a property at the specified path in the provided object using the given updater function
 * and a customizer function if provided.
 *
 * @since 1.0.0
 *
 * @template T - Type of the input object.
 *
 * @param {T} object - The input object to update.
 * @param {string|any} path - The path to the property to update. Can be an array or a string.
 * @param {Function} updater - The function that will be used to update the property value.
 * @param {any} customizer - The function that will be used to customize the updated value. Optional.
 *
 * @returns {Object} - The updated object.
 *
 * @example
 * const obj = { a: { b: { c: 1 } } };
 * updateWith(obj, 'a.b.c', (val) => val + 1); // { a: { b: { c: 2 } } }
 *
 * const obj2 = { a: { b: { c: 1 } } };
 * updateWith(obj2, 'a.b.d', (val) => 2); // { a: { b: { c: 1, d: 2 } } }
 */
var updateWith = function updateWith(object, path, updater, customizer) {
  var pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  pathArray.reduce(function (acc, key, i) {
    if (acc[key] === undefined) acc[key] = {};
    if (i === pathArray.length - 1) acc[key] = customizer ? updater(customizer(acc[key])) : updater(acc[key]);
    return acc[key];
  }, object);
  return object;
};

/**
 * Returns an array of the values of the own enumerable string-keyed properties of an object.
 *
 * @since 1.0.0
 *
 * @param {Object} object - The object to extract the values from.
 *
 * @returns {any[]} - An array of the object's values.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * values(obj); // [1, 2, 3]
 */
var values = function values(object) {
  return Object.values(object);
};

/**
 * Returns an array of the values of all enumerable properties, including inherited properties, of an object.
 *
 * @since 1.0.0
 *
 * @param {Object} object - The object to extract the values from.
 *
 * @returns {any[]} - An array of the object's values, including inherited properties.
 *
 * @example
 * const obj = { a: 1 };
 * const child = Object.create(obj);
 * child.b = 2;
 * valuesIn(child); // [1, 2]
 */
var valuesIn = function valuesIn(object) {
  var newObject = assignIn({}, object);
  return Object.values(newObject);
};

var obj = {
  __proto__: null,
  assign: assign,
  assignIn: assignIn,
  assignInWith: assignInWith,
  assignWith: assignWith,
  at: at,
  create: create,
  defaults: defaults,
  entries: entries,
  extend: extend,
  extendWith: extendWith,
  findKey: findKey,
  findLastKey: findLastKey,
  forIn: forIn,
  forInRight: forInRight,
  forOwn: forOwn,
  forOwnRight: forOwnRight,
  functions: functions,
  functionsIn: functionsIn,
  get: get,
  has: has,
  hasIn: hasIn,
  invert: invert,
  invertBy: invertBy,
  keys: keys,
  keysIn: keysIn,
  mapKeys: mapKeys,
  mapValues: mapValues,
  merge: merge,
  omit: omit,
  omitBy: omitBy,
  pick: pick,
  pickBy: pickBy,
  set: set,
  setWith: setWith,
  toPairs: toPairs,
  toPairsIn: toPairsIn,
  transform: transform,
  unset: unset,
  update: update,
  updateWith: updateWith,
  values: values,
  valuesIn: valuesIn
};

/**
 * Converts a string to camelCase.
 *
 * @since 1.0.0
 *
 * @param {string} [str=''] - The string to convert to camelCase.
 *
 * @returns {string} - The camelCased string.
 *
 * @example
 * const str1 = 'foo_bar';
 * const str2 = 'hello-world';
 * const str3 = 'Foo Bar';
 * const str4 = 'FOO-BAR';
 *
 * const result1 = camelCase(str1); // 'fooBar'
 * const result2 = camelCase(str2); // 'helloWorld'
 * const result3 = camelCase(str3); // 'fooBar'
 * const result4 = camelCase(str4); // 'fooBar'
 */
var camelCase = function camelCase(str) {
  if (str === void 0) {
    str = '';
  }
  return str.replace(new RegExp(/[-_]+/, 'g'), ' ').replace(new RegExp(/[^\w\s]/, 'g'), '').replace(new RegExp(/\s+(.)(\w+)/, 'g'), function (_, $2, $3) {
    return "" + ($2.toUpperCase() + $3.toLowerCase());
  }).replace(new RegExp(/\s/, 'g'), '').replace(new RegExp(/\w/), function (s) {
    return s.toLowerCase();
  });
};

/**
 * Capitalizes the first letter of a string.
 *
 * @since 1.0.0
 *
 * @param {string} str - The string to capitalize.
 *
 * @returns {string} - The capitalized string.
 *
 * @example
 * const str1 = 'foo';
 * const str2 = 'BAR';
 * const str3 = 'hElLo WoRlD';
 *
 * const result1 = capitalize(str1); // 'Foo'
 * const result2 = capitalize(str2); // 'Bar'
 * const result3 = capitalize(str3); // 'Hello world'
 */
var capitalize$1 = function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Checks if a string ends with a specified target string.
 *
 * @since 1.0.0
 *
 * @param {string} str - The string to check.
 * @param {string} target - The target string to search for at the end of the original string.
 * @param {number} [position=str.length] - The position within the original string to end the search at.
 *
 * @returns {boolean} - `true` if the original string ends with the target string, `false` otherwise.
 *
 * @example
 * const str1 = 'Hello, world!';
 * const str2 = 'Hello, world';
 * const str3 = 'hello, world!';
 *
 * const result1 = endsWith(str1, '!'); // true
 * const result2 = endsWith(str2, '!'); // false
 * const result3 = endsWith(str3, 'world', 7); // true
 */
var endsWith = function endsWith(str, target, position) {
  if (position === void 0) {
    position = str.length;
  }
  return str.endsWith(target, position);
};

var map = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
/**
 * Escapes special characters in a string to prevent cross-site scripting (XSS) attacks.
 *
 * @since 1.0.0
 *
 * @param {string} str - The string to escape.
 *
 * @returns {string} - The escaped string.
 *
 * @example
 * const str = 'This is a <script>alert("XSS");</script> attack.';
 *
 * const escapedStr = escape(str); // 'This is a &lt;script&gt;alert(&quot;XSS&quot;);&lt;/script&gt; attack.'
 */
var escape = function escape(str) {
  return str.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
};

/**
 * Escapes any special characters in a string to be used as a regular expression.
 *
 * @since 1.0.0
 *
 * @param {string} str - The string to escape.
 *
 * @returns {string} - The escaped string.
 *
 * @example
 * const str = 'Hello, world. (can you escape me?)';
 *
 * const escapedStr = escapeRegExp(str); // 'Hello, world\\. \\(can you escape me\\?\\)'
 */
var escapeRegExp = function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Converts a string to kebab case.
 *
 * @since 1.0.0
 *
 * @param {string} [str=''] - The string to convert.
 *
 * @returns {string} - The kebab case string.
 *
 * @example
 * const str = 'This is a Test String';
 *
 * const kebabStr = kebabCase(str); // 'this-is-a-test-string'
 */
var kebabCase = function kebabCase(str) {
  if (str === void 0) {
    str = '';
  }
  var out = str.replace(/[-._\s]+/g, '-').replace(/[A-Z0-9]/, '-$&').replace(/[-]{2,}/, '');
  if (out[0] === '-') {
    out = out.slice(1);
  }
  if (out[out.length - 1] === '-') {
    out = out.slice(0, -1);
  }
  return out.toLowerCase();
};

/**
 * Converts a string to lowercase with spaces between words.
 * Replaces hyphens, dots, and underscores with spaces.
 *
 * @since 1.0.0
 *
 * @param {string} [str=''] - The string to convert.
 * @returns {string} - The converted string.
 *
 * @example
 * lowerCase('fooBar123') // 'foo bar 123'
 * lowerCase('FOO-BAR.BAZ') // 'foo bar baz'
 */
var lowerCase = function lowerCase(str) {
  if (str === void 0) {
    str = '';
  }
  return str.replace(/[-._\s]+/g, ' ').replace(/[A-Z0-9]/, ' $&').replace(/[-]{2,}/, '').toLowerCase().trim();
};

/**
 * Returns a new object where the keys and values are swapped.
 *
 * @since 1.0.0
 *
 * @param obj - The object to invert
 *
 * @example
 *
 * invert({ 'a': 1, 'b': 2, 'c': 1 });
 * // => { '1': 'c', '2': 'b' }
 */
var lowerFirst = function lowerFirst(str) {
  if (str === void 0) {
    str = '';
  }
  return str.charAt(0).toLowerCase() + str.slice(1);
};

/**
 * Pads a string with a specified character to a specified length.
 *
 * @since 1.0.0
 *
 * @param {string} str - The string to pad.
 * @param {number} length - The length to pad the string to.
 * @param {string} [characters=' '] - The character to use for padding (default is space).
 *
 * @returns {string} - The padded string.
 *
 * @example
 *
 * pad('hello', 10); // '  hello   '
 * pad('hello', 10, '-'); // '--hello---'
 */
var pad = function pad(str, length, characters) {
  if (characters === void 0) {
    characters = ' ';
  }
  var prePad = Math.floor((length - str.length) / 2) + str.length;
  return str.padStart(prePad, characters).padEnd(length, characters);
};

/**
 * Pads a string with additional characters at the end to reach a specified length.
 *
 * @since 1.0.0
 *
 * @param {string} str - The string to pad.
 * @param {number} length - The target length of the string.
 * @param {string} chars - The characters to use for padding. Defaults to a space.
 *
 * @returns {string} - The padded string.
 *
 * @example
 *
 * padEnd('hello', 8); // 'hello   '
 * padEnd('hello', 8, '-'); // 'hello---'
 */
var padEnd = function padEnd(str, length, chars) {
  if (str === void 0) {
    str = '';
  }
  if (length === void 0) {
    length = 0;
  }
  if (chars === void 0) {
    chars = ' ';
  }
  return str.padEnd(length, chars);
};

/**
 * Pads the start of a string with the given characters until it reaches the specified length.
 *
 * @since 1.0.0
 *
 * @param {string} [str=''] - The input string to pad.
 * @param {number} [length=0] - The length to pad the string to.
 * @param {string} [chars=' '] - The characters to use for padding.
 *
 * @returns {string} - The padded string.
 *
 * @example
 *
 * padStart('hello', 10); // returns '     hello'
 * padStart('world', 10, '*'); // returns '*****world'
 */
var padStart = function padStart(str, length, chars) {
  if (str === void 0) {
    str = '';
  }
  if (length === void 0) {
    length = 0;
  }
  if (chars === void 0) {
    chars = ' ';
  }
  return str.padStart(length, chars);
};

/**
 * Parses a string and returns an integer of the specified radix.
 *
 * @since 1.0.0
 *
 * @param {string} str - The string to parse.
 * @param {number} [radix=10] - The radix used to parse the string. Must be between 2 and 36.
 *
 * @returns {number} - An integer parsed from the input string.
 *
 * @example
 *
 * parseInt('42'); // 42
 * parseInt('101010', 2); // 42
 */
var parseInt$1 = function parseInt(str, radix) {
  if (str === void 0) {
    str = '';
  }
  if (radix === void 0) {
    radix = 10;
  }
  return Number.parseInt(str, radix);
};

/**
 * Repeats a string `n` times.
 *
 * @since 1.0.0
 *
 * @param {string} str - The string to repeat.
 * @param {number} [n=1] - The number of times to repeat the string.
 * @returns {string} - The repeated string.
 *
 * @example
 *
 * repeat('hello', 3); // returns 'hellohellohello'
 * repeat('hey'); // returns 'hey'
 */
var repeat = function repeat(str, n) {
  if (str === void 0) {
    str = '';
  }
  if (n === void 0) {
    n = 1;
  }
  return str.repeat(n);
};

/**
 * Replaces matches in a string with a replacement string or RegExp.
 *
 * @since 1.0.0
 *
 * @param {string} str - The string to modify.
 * @param {string|RegExp} pattern - The pattern to search for in the string.
 * @param {string|RegExp} replacement - The replacement string or RegExp.
 * @returns {string} - The modified string.
 *
 * @example
 *
 * replace('Hello, world!', 'world', 'John'); // 'Hello, John!'
 */
var replace = function replace(str, pattern, replacement) {
  if (str === void 0) {
    str = '';
  }
  return str.replace(pattern, replacement);
};

/**
 * Converts a string to snake case.
 *
 * @since 1.0.0
 *
 * @param {string} [str=''] - The string to convert.
 *
 * @returns {string} - The snake case version of the input string.
 *
 * @example
 * snakeCase('some text'); // 'some_text'
 * snakeCase('some-mixed_string With spaces_underscores-and-hyphens'); // 'some_mixed_string_with_spaces_underscores_and_hyphens'
 * snakeCase('AllThe-small Things'); // 'all_the_small_things'
 *
 */
var snakeCase = function snakeCase(str) {
  if (str === void 0) {
    str = '';
  }
  return (
    //	@ts-ignore
    str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (s) {
      return s.toLowerCase();
    }).join('_')
  );
};

/**
 * Splits a string into an array of substrings based on a specified separator.
 *
 * @since 1.0.0
 *
 * @param {string} [str=''] - The string to be split.
 * @param {string | RegExp} separator - Specifies the character(s) to use for separating the string.
 * @param {number} limit - A non-negative integer specifying the number of splits.
 *
 * @returns {string[]} - An array of substrings.
 *
 * @example
 * split('a,b,c,d', ',', 2); // returns ['a', 'b']
 */
var split = function split(str, separator, limit) {
  if (str === void 0) {
    str = '';
  }
  return str.split(separator, limit);
};

/**
 * Converts a string to start case (i.e., each word capitalized, with spaces between words).
 *
 * @since 1.0.0
 *
 * @param {string} str - The string to convert.
 *
 * @returns {string} - The string in start case.
 *
 * @example
 * startCase('foo_bar_baz'); // 'Foo Bar Baz'
 */
var startCase = function startCase(str) {
  if (str === void 0) {
    str = '';
  }
  var out = str.replace(/[-._\s]+/g, ' ').replace(/[A-Z0-9]/, ' $&').replace(/[-]{2,}/, '').trim();
  if (out[0] === '-') out = out.slice(1);
  if (out[out.length - 1] === '-') out = out.slice(0, -1);
  return out.split(' ').map(capitalize).join(' ');
};
var capitalize = function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Checks if a string starts with a given target string.
 *
 * @param {string} [str=''] - The string to search in.
 * @param {string} [target=''] - The target string to search for.
 * @param {number} [position=0] - The position in the string at which to begin searching.
 *
 * @returns {boolean} - `true` if the string starts with the target string, `false` otherwise.
 *
 * @example
 *
 * startsWith('hello world', 'hello'); // true
 * startsWith('hello world', 'world'); // false
 * startsWith('hello world', 'world', 6); // true
 */
var startsWith = function startsWith(str, target, position) {
  if (str === void 0) {
    str = '';
  }
  if (target === void 0) {
    target = '';
  }
  if (position === void 0) {
    position = 0;
  }
  return str.startsWith(target, position);
};

/**
 * Converts a string to lowercase.
 *
 * @since 1.0.0
 *
 * @param {string} str - The string to convert to lowercase.
 * @returns {string} - The lowercase string.
 *
 * @example
 * toLower('Hello World'); // 'hello world'
 */
var toLower = function toLower(str) {
  if (str === void 0) {
    str = '';
  }
  return str.toLowerCase();
};

/**
 * Converts a string to uppercase.
 *
 * @since 1.0.0
 *
 * @param {string} str - The string to convert.
 *
 * @returns {string} - The converted string in uppercase.
 *
 * @example
 *
 * toUpper('hello world') // 'HELLO WORLD'
 */
var toUpper = function toUpper(str) {
  if (str === void 0) {
    str = '';
  }
  return str.toUpperCase();
};

/**
 * Removes specified characters from the end of a string.
 *
 * @since 1.0.0
 *
 * @param {string} [str=''] - The string to trim.
 * @param {string} [characters=''] - The characters to remove from the end of the string.
 *
 * @return {string} The trimmed string.
 *
 * @example
 *
 * // returns 'Hello, World'
 * trimEnd('Hello, World   ');
 *
 * // returns 'Hello, World'
 * trimEnd('Hello, World!!!', '!');
 */
var trimEnd = function trimEnd(str, characters) {
  if (str === void 0) {
    str = '';
  }
  if (characters === void 0) {
    characters = '';
  }
  if (characters.trim() === '') return str.trimEnd();
  return str.replace(new RegExp('[' + characters + ']+$'), '');
};

/**
 * Removes specified characters from the beginning of a string.
 *
 * @since 1.0.0
 *
 * @param {string} [str=''] - The string to trim.
 * @param {string} [characters=''] - The characters to remove from the beginning of the string.
 *
 * @return {string} The trimmed string.
 *
 * @example
 *
 * // returns 'Hello, World   '
 * trimStart('   Hello, World   ');
 *
 * // returns 'Hello, World'
 * trimStart('!!!Hello, World', '!');
 */
var trimStart = function trimStart(str, characters) {
  if (str === void 0) {
    str = '';
  }
  if (characters === void 0) {
    characters = '';
  }
  if (characters.trim() === '') return str.trimStart();
  return str.replace(new RegExp('^[' + characters + ']+'), '');
};

/**
 * Removes specified characters from the beginning and end of a string.
 *
 * @since 1.0.0
 *
 * @param {string} [str=''] - The string to trim.
 * @param {string} [characters=''] - The characters to remove from the string.
 *
 * @return {string} The trimmed string.
 *
 * @example
 *
 * // returns 'Hello, World!'
 * trim('  Hello, World!   ');
 *
 * // returns 'JavaScript is awesome'
 * trim('JavaScript is awesome', 'weojsacm');
 */
var trim = function trim(str, characters) {
  if (str === void 0) {
    str = '';
  }
  if (characters === void 0) {
    characters = '';
  }
  var startedTrimmed = trimStart(str, characters);
  return trimEnd(startedTrimmed, characters);
};

/**
 * Converts HTML entities to their corresponding characters.
 *
 * @since 1.0.0
 *
 * @param {string} str - The string containing HTML entities.
 *
 * @return {string} The string with HTML entities replaced by their corresponding characters.
 *
 * @example
 *
 * // returns '<h1>Hello, World!</h1>'
 * unescape('&lt;h1&gt;Hello, World!&lt;/h1&gt;');
 *
 * // returns "It's a wonderful life."
 * unescape("It&#39;s a wonderful life.");
 */
var unescape = function unescape(str) {
  var entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#96;': '`',
    '&#x2F;': '/'
  };
  return str.replace(/&(amp|lt|gt|quot|#(39|96|x2F));/g, function (match) {
    return entities[match];
  });
};

/**
 * Converts a string to title case and removes special characters.
 *
 * @since 1.0.0
 *
 * @param {string} [str=''] - The string to convert to title case.
 *
 * @return {string} The string converted to title case.
 *
 * @example
 *
 * // returns 'HELLO WORLD'
 * upperCase('Hello_world');
 *
 * // returns 'LIFE IS BEAUTIFUL'
 * upperCase('life-is_beautiful');
 */
var upperCase = function upperCase(str) {
  if (str === void 0) {
    str = '';
  }
  return str.replace(/[-._\s]+/g, ' ').replace(/[A-Z0-9]/, ' $&').replace(/[-]{2,}/, '').toUpperCase().trim();
};

/**
 * Converts the first character of a string to uppercase.
 *
 * @since 1.0.0
 *
 * @param {string} [str=''] - The string to convert.
 *
 * @return {string} The string with the first character converted to uppercase.
 *
 * @example
 *
 * // returns 'Hello, World!'
 * upperFirst('hello, World!');
 *
 * // returns 'The quick brown fox jumps over the lazy dog.'
 * upperFirst('the quick brown fox jumps over the lazy dog.');
 */
var upperFirst = function upperFirst(str) {
  if (str === void 0) {
    str = '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Splits a string into an array of words based on a given pattern.
 *
 * @since 1.0.0
 *
 * @param {string} [str=''] - The string to split into words.
 * @param {RegExp|string} [pattern=/\w+/g] - The pattern to match words.
 *
 * @return {Array<string>} An array of words.
 *
 * @example
 *
 * // returns ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog']
 * words('The quick brown fox jumps over the lazy dog');
 *
 * // returns ['apple', 'banana', 'cherry']
 * words('apple, banana, cherry', /[^, ]+/g);
 */
var words = function words(str, pattern) {
  if (str === void 0) {
    str = '';
  }
  if (pattern === void 0) {
    pattern = /\w+/g;
  }
  return str.match(pattern);
};

var str = {
  __proto__: null,
  camelCase: camelCase,
  capitalize: capitalize$1,
  endsWith: endsWith,
  escape: escape,
  escapeRegExp: escapeRegExp,
  kebabCase: kebabCase,
  lowerCase: lowerCase,
  lowerFirst: lowerFirst,
  pad: pad,
  padEnd: padEnd,
  padStart: padStart,
  parseInt: parseInt$1,
  repeat: repeat,
  replace: replace,
  snakeCase: snakeCase,
  split: split,
  startCase: startCase,
  startsWith: startsWith,
  toLower: toLower,
  toUpper: toUpper,
  trim: trim,
  trimEnd: trimEnd,
  trimStart: trimStart,
  unescape: unescape,
  upperCase: upperCase,
  upperFirst: upperFirst,
  words: words
};

/**
 * Creates a chainable object that wraps the given value.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to wrap.
 *
 * @returns {Object} - An object with a `fn` method to chain function calls and a `value` method to retrieve the wrapped value.
 *
 * @example
 *
 * const users = [
 * { 'user': 'barney', 'age': 36 },
 * { 'user': 'fred', 'age': 40 },
 * { 'user': 'pebbles', 'age': 1 }
 * ];
 *
 * const youngest = chain2(users)
 *  .fn(sortBy, 'age')
 *  .fn(map, (function (o: any) {
 *      return o.user + ' is ' + o.age;
 *  }))
 *  .fn(head)
 *  .value();
 *
 * => 'pebbles is 1'
 */
var chain2 = function chain2(_value) {
  return {
    /**
     * Chains a function call onto the wrapped value and returns a new chainable object with the result.
     *
     * @param {Function|string} func - The function or method to call on the wrapped value.
     * @param {...*} args - Any additional arguments to pass to the function or method.
     *
     * @returns {Object} - A new chainable object that wraps the result of the function or method call.
     */
    fn: function fn(func) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (typeof func === 'function') {
        return chain2(func.apply(void 0, [_value].concat(args)));
      }
      return chain2(_value[func].apply(_value, args));
    },
    value: function value() {
      return _value;
    }
  };
};

/**
 * Invokes a function with the given value, then returns the value.
 *
 * @since 1.0.0
 *
 * @param value (*): The value to provide to interceptor.
 * @param interceptor (Function): The function to invoke.
 *
 * @returns (*): Returns value.
 *
 * @example
 *
 * const data = [1, 2, 3];
 *
 * const tappedData = tap2(data, (array: number[]) => {
 * 	// Mutate input array.
 * 	array.push(100);
 * })
 * .fn(concat, [4])
 * .fn(concat, [5])
 * .value();
 *
 * => [1, 2, 3, 100, 4, 5]
 */
var tap2 = function tap2(value, interceptor) {
  interceptor(value);
  return chain2(value);
};

/**
 * Passes the given value to a function and returns the result.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to pass to the function.
 * @param {Function} fn - The function to apply to the value.
 *
 * @returns {*} - The result of applying the function to the value.
 *
 * @example
 * const result = thru([1, 2, 3], (arr) => arr.map((x) => x * 2)).filter((x) => x > 3);
 * console.log(result); // [4, 6]
 */
var thru = function thru(value, fn) {
  return fn(value);
};

var seq = {
  __proto__: null,
  chain2: chain2,
  tap2: tap2,
  thru: thru
};

/**
 * Attempts to invoke a function with the given arguments and returns either the result or the error object.
 *
 * @since 1.0.0
 *
 * @param {Function} func - The function to invoke.
 * @param {...*} args - The arguments to pass to the function.
 *
 * @return {*} The result of the function or the error object.
 *
 * @example
 *
 * // returns 6
 * attempt((a, b) => a + b, 2, 4);
 *
 * // returns TypeError: Cannot read property 'length' of null
 * attempt(str => str.length, null);
 */
var attempt = function attempt(func) {
  try {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return func.apply(void 0, args);
  } catch (e) {
    return e;
  }
};

/**
 * Creates a function that iterates over pairs of predicates and functions, returning the result of the first function that returns truthy for the corresponding predicate.
 *
 * @since 1.0.0
 *
 * @param {Array<Array>} pairs - The predicate-function pairs.
 *
 * @return {Function} The new function.
 *
 * @example
 *
 * const func = cond([
 *   [x => x > 5, x => 'greater than 5'],
 *   [x => x === 5, x => 'equals 5'],
 *   [x => x < 5, x => 'less than 5']
 * ]);
 *
 * // returns 'greater than 5'
 * func(10);
 *
 * // returns 'equals 5'
 * func(5);
 *
 * // returns 'less than 5'
 * func(2);
 */
var cond = function cond(pairs) {
  return function () {
    for (var _iterator = _createForOfIteratorHelperLoose(pairs), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
        predicate = _step$value[0],
        fn = _step$value[1];
      if (predicate.apply(void 0, arguments)) {
        return fn.apply(void 0, arguments);
      }
    }
  };
};

/**
 * Creates a function that checks if an object conforms to the specified object properties and values.
 *
 * @since 1.0.0
 *
 * @param {Object} object - The object of property predicates.
 *
 * @return {Function} The new function.
 *
 * @example
 *
 * const func = conforms({x: x => x > 5, y: y => y < 10});
 *
 * // returns true
 * func({x: 10, y: 5});
 *
 * // returns false
 * func({x: 2, y: 15});
 */
var conforms = function conforms(object) {
  return function (obj) {
    return conformsTo(obj, object);
  };
};

/**
 * Creates a function that always returns the same value.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {T} arg - The value to return.
 *
 * @return {Function} The new function.
 *
 * @example
 *
 * const func = constant('Hello');
 *
 * // returns 'Hello'
 * func();
 *
 * // returns 'Hello'
 * func();
 */
var constant = function constant(arg) {
  return function () {
    return arg;
  };
};

/**
 * Checks if a value is null, undefined or NaN and returns the default value if it is.
 *
 * @since 1.0.0
 *
 * @param {*} value - The value to check.
 * @param {*} defaultValue - The default value to return if `value` is null, undefined or NaN.
 *
 * @return {*} Returns the `value` or the `defaultValue` if `value` is null, undefined or NaN.
 *
 * @example
 *
 * // returns 'default'
 * defaultTo(null, 'default');
 *
 * // returns 'default'
 * defaultTo(undefined, 'default');
 *
 * // returns 'default'
 * defaultTo(NaN, 'default');
 *
 * // returns 'hello'
 * defaultTo('hello', 'default');
 */
var defaultTo = function defaultTo(value, defaultValue) {
  return value == null || Object.is(value, NaN) ? defaultValue : value;
};

/**
 * Creates a function that returns the result of calling the given functions in sequence, where each function consumes the return value of the function that precedes it.
 *
 * @since 1.0.0
 *
 * @param {Function | Function[]} funcs - The functions to compose.
 *
 * @return {Function} Returns the new composite function.
 *
 * @example
 *
 * const square = x => x * x;
 * const double = x => x * 2;
 *
 * const func = flow(square, double);
 *
 * // returns 18
 * func(3);
 *
 * // returns 32
 * flow(square, double, square)(2);
 */
var flow = function flow(funcs) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return funcs.reduce(function (prev, fnc) {
      return [fnc.apply(void 0, prev)];
    }, args)[0];
  };
};

/**
 * Creates a function that returns the result of calling the given functions in sequence, where each function consumes the return value of the function that follows it.
 *
 * @since 1.0.0
 *
 * @param {Function | Function[]} funcs - The functions to compose.
 *
 * @return {Function} Returns the new composite function.
 *
 * @example
 *
 * const square = x => x * x;
 * const double = x => x * 2;
 *
 * const func = flowRight(square, double);
 *
 * // returns 18
 * func(3);
 *
 * // returns 16
 * flowRight(square, double, square)(2);
 */
var flowRight = function flowRight(funcs) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return funcs.reverse().reduce(function (prev, fnc) {
      return [fnc.apply(void 0, prev)];
    }, args)[0];
  };
};

/**
 * Creates a function that can be used to iterate over a collection.
 *
 * @since 1.0.0
 *
 * @template T
 * @param {Function} [predicate=identity] - The predicate function to convert into an iteratee.
 *
 * @returns {Function} - Returns the new iteratee function.
 *
 * @example
 *
 * const users = [{ name: 'Alice', age: 32 }, { name: 'Bob', age: 42 }];
 * const sortByAge = users.sort(iteratee(user => user.age));
 * // returns [{ name: 'Alice', age: 32 }, { name: 'Bob', age: 42 }]
 */
var iteratee = function iteratee(predicate) {
  if (predicate === void 0) {
    predicate = identity;
  }
  return createPredicate(predicate);
};

/**
 * Creates a function that invokes the method at `path` of a given object.
 *
 * @since 1.0.0
 *
 * @param {string|Array} path - The path of the method to invoke.
 * @param {...*} args - The arguments to invoke the method with.
 *
 * @returns {Function} - Returns the new method function.
 *
 * @example
 *
 * const users = [{ name: 'Alice', age: 32 }, { name: 'Bob', age: 42 }];
 * const getNames = method('name');
 * const names = users.map(getNames);
 * // returns ['Alice', 'Bob']
 */
var method = function method(path) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return function (object) {
    return get(object, path)(args);
  };
};

/**
 * Creates a function that invokes the method at `path` of a given object.
 *
 * @since 1.0.0
 *
 * @param {Object} object - The object to query.
 * @returns {Function} - Returns the new invoker function.
 *
 * @example
 *
 * const obj = {
 *   foo: {
 *     bar: (a, b) => a + b
 *   }
 * };
 * const barMethod = methodOf(obj)(['foo', 'bar']);
 *
 * console.log(barMethod(1, 2)); // Output: 3
 */
var methodOf = function methodOf(object) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return function (path) {
    return get(object, path)(args);
  };
};

/**
 * A no-operation function that does nothing.
 *
 * @returns {void} -
 *
 * @since 1.0.0
 *
 * @example
 *
 * noop(); // does nothing
 */
var noop = function noop() {};

/**
 * Returns a function which will return the nth argument passed to it
 *
 * @since 1.0.0
 *
 * @param {number} idx - The index of the argument to be returned
 *
 * @returns {Function} - A function which will return the nth argument passed to it
 *
 * @example
 * const getSecondArg = nthArg(1);
 * getSecondArg(1, 2, 3); // Returns 2
 *
 * const getThirdArg = nthArg(2);
 * getThirdArg('a', 'b', 'c', 'd'); // Returns 'c'
 */
var nthArg = function nthArg(idx) {
  if (idx === void 0) {
    idx = 0;
  }
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return args.slice(idx, idx + 1)[0];
  };
};

/**
 * Creates a function that invokes each function in `array` with the
 * arguments it receives and returns an array of the results.
 *
 * @since 1.0.0
 *
 * @param {Array} array - The array of functions to iterate over.
 * @returns {Function} - Returns the new function.
 *
 * @example
 *
 * const func1 = x => x * 2;
 * const func2 = x => x + 2;
 * const func3 = x => x - 2;
 *
 * const funcs = [func1, func2, func3];
 * const overFunc = over(funcs);
 *
 * console.log(overFunc(5)); // [10, 7, 3]
 */
var over = function over(array) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return array.map(function (func) {
      return func.apply(void 0, args);
    });
  };
};

/**
 * Checks if all of the given predicates return truthy values when invoked with the arguments provided.
 *
 * @since 1.0.0
 *
 * @param {Function[]} [predicates=[identity]] The predicates to check.
 * @return {Function} Returns the new composite function.
 *
 * @example
 *
 * const isEven = n => n % 2 === 0;
 * const isPositive = n => n > 0;
 * const isEvenAndPositive = overEvery([isEven, isPositive]);
 *
 * isEvenAndPositive(4); // true
 * isEvenAndPositive(5); // false
 */
var overEvery = function overEvery(predicates) {
  if (predicates === void 0) {
    predicates = [identity];
  }
  return function (item) {
    return predicates.every(function (check) {
      return check(item);
    });
  };
};

/**
 * Checks if the given item satisfies at least one predicate function from the given array
 *
 * @since 1.0.0
 *
 * @param {Function[]} predicates - An array of predicate functions to check the item against
 * @returns {Function} - A function that returns true if the item satisfies at least one predicate, false otherwise
 *
 * @example
 *
 * const isString = val => typeof val === 'string';
 * const isNumber = val => typeof val === 'number';
 * const isTruthy = val => !!val;
 *
 * const check = overSome([isString, isNumber, isTruthy]);
 *
 * check('hello'); // true
 * check(42); // true
 * check(false); // true
 * check(undefined); // false
 */
var overSome = function overSome(predicates) {
  if (predicates === void 0) {
    predicates = [identity];
  }
  return function (item) {
    return predicates.some(function (check) {
      return check(item);
    });
  };
};

/**
 * Creates a function that returns the value at the specified path of an object.
 *
 * @since 1.0.0
 *
 * @param {string|any[]} path - The path of the property to get.
 * @returns {Function} - Returns the new function.
 *
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 * const getValue = property('a[0].b.c');
 *
 * getValue(object);
 * // => 3
 */
var property = function property(path) {
  return function (obj) {
    return get(obj, path);
  };
};

/**
 * The opposite of `property` function. This method creates a function that returns the value at a given path of an object.
 * @since 1.0.0
 *
 * @param {Object} obj - The object to query.
 * @param {Array|string} path - The path of the property to get.
 * @returns {Function} - Returns the new function.
 *
 * @example
 *
 * const user = { name: 'John', address: { street: '123 Main St.' } };
 * const street = propertyOf(user)(['address', 'street']);
 * console.log(street); // output: '123 Main St.'
 */
var propertyOf = function propertyOf(obj) {
  return function (path) {
    return get(obj, path);
  };
};

/**
 * Creates an array of numbers (positive or negative) progressing from
 * `start` up to, but not including, `end`.
 *
 * @since 1.0.0
 *
 * @param {number} [start=0] The start of the range.
 * @param {number} [end] The end of the range.
 * @param {number} [step] The value to increment or decrement by.
 * @param {boolean} [checkRangeFromRight=false] Determines if the range
 * should be generated from right to left.
 *
 * @example
 *
 * range(4); // [0, 1, 2, 3]
 * range(-4); // [0, -1, -2, -3]
 * range(1, 5); // [1, 2, 3, 4]
 * range(0, 20, 5); // [0, 5, 10, 15]
 * range(0, -4, -1); // [0, -1, -2, -3]
 *
 * @returns {number[]} - Returns the new array of numbers.
 */
var range = function range(start, end, step, checkRangeFromRight) {
  if (start === void 0) {
    start = 0;
  }
  if (checkRangeFromRight === void 0) {
    checkRangeFromRight = false;
  }
  // if the end is not defined...
  var isEndDef = typeof end !== 'undefined';
  // ...the first argument should be the end of the range...
  end = isEndDef ? end : start;
  // ...and 0 should be the start
  start = isEndDef ? start : 0;
  // if the increment is not defined, we could need a +1 or -1
  // depending on whether we are going up or down
  if (typeof step === 'undefined') {
    step = Math.sign(end - start);
  }
  // calculating the lenght of the array, which has always to be positive
  var length = Math.abs((end - start) / (step || 1));
  // In order to return the right result, we need to create a new array
  // with the calculated length and fill it with the items starting from
  // the start value + the value of increment.
  var _Array$from$reduce = Array.from({
      length: length
    }).reduce(function (_ref) {
      var result = _ref.result,
        current = _ref.current;
      return {
        // checkRangeFromRight === false, then append the current value to the result array
        // checkRangeFromRight === true, then prepend the current value to the result array
        result: checkRangeFromRight ? [current].concat(result) : [].concat(result, [current]),
        // adding the increment to the current item
        // to be used in the next iteration
        current: current + step
      };
    }, {
      current: start,
      result: []
    }),
    result = _Array$from$reduce.result;
  return result;
};

/**
 * Creates an array of numbers (positive or negative) progressing from `start` up to or down to `end` (depending on whether `end` is greater than `start` or not), separated by increments of `step`.
 *
 * @since 1.0.0
 *
 * @param {number} [start=0] The start value. If `end` is not specified, this value will be the end value and `start` will be set to 0.
 * @param {number} [end=start] The end value.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} - Returns the new array of numbers.
 *
 * @example
 *
 * range(4);
 * // => [0, 1, 2, 3]
 *
 * range(-4);
 * // => [0, -1, -2, -3]
 *
 * range(1, 5);
 * // => [1, 2, 3, 4]
 *
 * range(0, 20, 5);
 * // => [0, 5, 10, 15, 20]
 *
 * range(0, -4, -1);
 * // => [0, -1, -2, -3, -4]
 *
 * range(1, 4, 0);
 * // => [1, 1, 1]
 *
 * range(0);
 * // => []
 */
var rangeRight = function rangeRight(start, end, step) {
  if (start === void 0) {
    start = 0;
  }
  return range(start, end, step, true);
};

/**
 * Pauses the execution for a specified number of milliseconds.
 *
 * @since 1.0.0
 *
 * @param {number} [milliseconds=1000] - The number of milliseconds to wait before resolving the Promise.
 *
 * @returns {Promise} - A Promise that resolves after the specified number of milliseconds have passed.
 *
 * @example
 * await sleep(); // waits for 1000 milliseconds before continuing execution
 * await sleep(5000); // waits for 5000 milliseconds before continuing execution
 *
 */
var sleep = function sleep(miliseconds) {
  if (miliseconds === void 0) {
    miliseconds = 1000;
  }
  return new Promise(function (resolve) {
    return setTimeout(resolve, miliseconds);
  });
};

/**
 * Creates an empty array.
 *
 * @since 1.0.0
 *
 * @returns {Array} - An empty array.
 *
 * @example
 *
 * const result = stubArray(); // []
 *
 */
var stubArray = function stubArray() {
  return [];
};

/**
 * Returns false.
 *
 * @since 1.0.0
 *
 * @returns {boolean} - The boolean value false.
 *
 * @example
 *
 * const result = stubFalse(); // false
 *
 */
var stubFalse = function stubFalse() {
  return false;
};

/**
 * Creates an empty object.
 *
 * @since 1.0.0
 *
 * @returns {Object} - An empty object.
 *
 * @example
 * const result = stubObject(); // {}
 */
var stubObject = function stubObject() {
  return {};
};

/**
 * Returns an empty string.
 *
 * @since 1.0.0
 *
 * @returns {string} - An empty string.
 *
 * @example
 * const result = stubString(); // ''
 */
var stubString = function stubString() {
  return '';
};

/**
 * Returns true.
 *
 * @since 1.0.0
 *
 * @returns {boolean} - The boolean value true.
 *
 * @example
 * const result = stubTrue(); // true
 */
var stubTrue = function stubTrue() {
  return true;
};

/**
 * Calls a function n times and returns an array of the results.
 *
 * @since 1.0.0
 *
 * @param {number} n - The number of times to call the function.
 * @param {Function} [func=identity] - The function to call. If not provided, returns an array of indices.
 *
 * @returns {Array} - An array of the results of calling the function.
 *
 * @example
 * const result = times(3, i => i + 1); // [1, 2, 3]
 *
 */
var times = function times(n, func) {
  if (func === void 0) {
    func = function func(i) {
      if (i === void 0) {
        i = identity;
      }
      return i;
    };
  }
  return Array.from({
    length: n
  }).map(function (_, i) {
    return func(i);
  });
};

/**
 * Converts a string path to an array of path segments.
 *
 * @since 1.0.0
 *
 * @param {any} path - The string path to convert.
 *
 * @returns {Array} - An array of path segments.
 *
 * @example
 * const result = toPath('a.b[0].c'); // ['a', 'b', '0', 'c']
 */
var toPath = function toPath(path) {
  return path.match(/([^[.\]])+/g);
};

/**
 * Generates a unique ID.
 *
 * @since 1.0.0
 *
 * @param {number} counter - A counter used to generate the ID.
 *
 * @param {string} [str=''] - A string to prepend to the generated ID.
 *
 * @returns {string} - A unique ID string.
 *
 * @example
 * const id1 = uniqueId(); // '1'
 * const id2 = uniqueId(); // '2'
 * const id3 = uniqueId(100, 'id_'); // 'id_101'
 *
 */var uniqueId = /*#__PURE__*/function (counter) {
  return function (str) {
    if (str === void 0) {
      str = '';
    }
    return "" + str + ++counter;
  };
}(0);

/**
 * Generates a cryptographically secure unique ID.
 *
 * @since 1.0.0
 *
 * @returns {string} - A unique ID string.
 *
 * @example
 * const id1 = uniqueId2(); // id1 is a unique ID string
 * const id2 = uniqueId2(); // id2 is a different unique ID string
 */
var uniqueId2 = function uniqueId2() {
  return (
    //  @ts-ignore
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
      return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    })
  );
};

var util = {
  __proto__: null,
  attempt: attempt,
  cond: cond,
  conforms: conforms,
  constant: constant,
  defaultTo: defaultTo,
  flow: flow,
  flowRight: flowRight,
  identity: identity,
  iteratee: iteratee,
  method: method,
  methodOf: methodOf,
  noop: noop,
  nthArg: nthArg,
  over: over,
  overEvery: overEvery,
  overSome: overSome,
  property: property,
  propertyOf: propertyOf,
  range: range,
  rangeRight: rangeRight,
  sleep: sleep,
  stubArray: stubArray,
  stubFalse: stubFalse,
  stubObject: stubObject,
  stubString: stubString,
  stubTrue: stubTrue,
  times: times,
  toPath: toPath,
  uniqueId: uniqueId,
  uniqueId2: uniqueId2
};

var _ = /*#__PURE__*/_extends({}, array, collection, date, func, math, num, obj, seq, str, lang, util);

export { add, after, ary, assign, assignIn, assignInWith, assignWith, at, attempt, before, bind, bindKey, camelCase, capitalize$1 as capitalize, castArray, ceil, chain2, chunk, clamp, clone, cloneDeep, cloneWith, compact, concat, cond, conforms, conformsTo, constant, countBy, create, curry, curryRight, debounce$1 as debounce, _ as default, defaultTo, defaults, debounce as delay, difference, differenceBy, differenceWith, divide, drop, dropRight, dropRightWhile, dropWhile, each, eachRight, endsWith, entries, eq, escape, escapeRegExp, every, extend, extendWith, fill, filter, find, findIndex, findKey, findLast, findLastIndex, findLastKey, first, flatMap, flatMapDeep, flatMapDepth, flatten, flattenDeep, flattenDepth, flip, floor, flow, flowRight, forEach, forEachRight, forIn, forInRight, forOwn, forOwnRight, freeze, fromPairs, functions, functionsIn, get, groupBy, gt, gte, has, hasIn, head, identity, inRange, includes, indexOf, initial, intersection, intersectionBy, intersectionWith, invert, invertBy, invokeMap, isArguments, isArray, isArrayBuffer, isArrayLike, isArrayLikeObject, isBoolean, isBuffer, isDate, isElement, isEmpty, isEqual, isEqualWith, isError, isExtensible, isFinite, isFrozen, isFunction, isInteger, isLength, isMap, isMatch, isMatchWith, isNaN$1 as isNaN, isNative, isNil, isNull, isNumber, isObject, isObjectLike, isPlainObject, isRegExp, isSafeInteger, isSealed, isSet, isString, isSymbol, isTypedArray, isUndefined, isWeakMap, isWeakSet, iteratee, join, kebabCase, keyBy, keys, keysIn, last, lastIndexOf, lowerCase, lowerFirst, lt, lte, map$1 as map, mapKeys, mapValues, max, maxBy, mean, meanBy, merge, method, methodOf, min, minBy, multiply, negate, noop, now, nth, nthArg, omit, omitBy, once, orderBy, over, overArgs, overEvery, overSome, pad, padEnd, padStart, parseInt$1 as parseInt, partial, partialRight, partition, pick, pickBy, preventExtensions, property, propertyOf, pull, pullAll, pullAllBy, pullAllWith, pullAt, random, range, rangeRight, rearg, reduce, reduceRight, reject, remove, repeat, replace, rest, reverse, round, sample, sampleSize, seal, set, setWith, shuffle, size, sleep, slice, snakeCase, some, sortBy, sortedIndex, sortedIndexBy, sortedIndexOf, sortedLastIndex, sortedLastIndexBy, sortedLastIndexOf, sortedUniq, sortedUniqBy, split, spread, startCase, startsWith, stubArray, stubFalse, stubObject, stubString, stubTrue, subtract, sum, sumBy, tail, take, takeRight, takeRightWhile, takeWhile, tap2, thru, times, toLower, toNumber, toPairs, toPairsIn, toPath, toPlainObject, toSafeInteger, toString, toUpper, transform, trim, trimEnd, trimStart, unary, unescape, union, unionBy, unionWith, uniq, uniqBy, uniqWith, uniqueId, uniqueId2, unset, unshift, unzip, unzipWith, update, updateWith, upperCase, upperFirst, values, valuesIn, without, words, wrap, xor, xorBy, xorWith, zip, zipObject, zipWith };
//# sourceMappingURL=alt-lodash.esm.js.map
