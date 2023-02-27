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
 * Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
 * @param array The array to process.
 * @param chunkSize The length of each chunk
 * @param cache
 * @returns Returns the new array of chunks.
 */
var chunk = function chunk(array, chunkSize, cache) {
  if (chunkSize === void 0) {
    chunkSize = 1;
  }
  if (cache === void 0) {
    cache = [];
  }
  var tmp = [].concat(array);
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
  // return Array(Math.ceil(collection.length / chunkSize))
  // 	.fill(null)
  // 	.map((_, index) => index * chunkSize)
  // 	.map(begin => collection.slice(begin, begin + chunkSize));
};

/**
 * Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.
 * @param array The array to compact.
 * @returns Returns the new array of filtered values.
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
 *
 * @param array
 * @param restArray
 * @returns
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
 *
 * @param array
 * @param restCollections
 * @returns
 */
var difference = function difference(array) {
  if (array === null || array === undefined) return [];
  for (var _len = arguments.length, restCollections = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restCollections[_key - 1] = arguments[_key];
  }
  var concatedArray = restCollections.flat(Infinity);
  return array.filter(function (x) {
    return !concatedArray.includes(x);
  });
};

/**
 *
 * @param value
 * @returns
 */
var identity = function identity(value) {
  return value;
};

/**
 *
 * @param array
 * @param args
 * @returns
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
 *
 * @param array
 * @param args
 * @returns
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
 *
 * @param array
 * @param length
 * @returns
 */
var drop = function drop(array, length) {
  if (length === void 0) {
    length = 1;
  }
  return array.slice(length);
};

/**
 *
 * @param array
 * @param n
 * @returns
 */
var dropRight = function dropRight(array, n) {
  if (n === void 0) {
    n = 1;
  }
  return array.slice(0, -n || array.length);
};

/**
 *
 * @param object
 * @param path
 * @param defaultValue
 * @returns
 */
var get = function get(object, path, defaultValue) {
  //	One Way
  // return path
  // 	.split(/[\.\[\]\'\"]/)
  // 	.filter(p => p)
  // 	.reduce((o, p) => o ? o[p] : defaultValue, object);
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
  //	Faster Way
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
 *
 * @param array
 * @param predicate
 * @returns
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
 *
 * @param array
 * @param predicate
 * @returns
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
 *
 * @param array
 * @param value
 * @param start
 * @param end
 * @returns
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

/**
 *
 * @param array
 * @returns
 */
var head = function head(array) {
  return array[0];
};

var first = head;

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
 *
 * @param array
 * @param predicate
 * @param fromIndex
 * @returns
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
 *
 * @param array
 * @returns
 */
var flatten = function flatten(array) {
  return array.flat();
};

/**
 *
 * @param array
 * @returns
 */
var flattenDeep = function flattenDeep(array) {
  return array.flat(Infinity);
};

/**
 *
 * @param array
 * @param depth
 * @returns
 */
var flattenDepth = function flattenDepth(array, depth) {
  if (depth === void 0) {
    depth = 1;
  }
  return array.flat(depth);
};

/**
 *
 * @param array
 * @returns
 */
var fromPairs = function fromPairs(array) {
  return Object.fromEntries(array);
};

/**
 *
 * @param array
 * @param value
 * @param startIndex
 * @returns
 */
var indexOf = function indexOf(array, value, startIndex) {
  if (startIndex === void 0) {
    startIndex = 0;
  }
  return array.indexOf(value, startIndex);
};

/**
 *
 * @param array
 * @returns
 */
var initial = function initial(array) {
  return array.slice(0, -1);
};

/**
 *
 * @param array
 * @returns
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
 *
 * @param array
 * @param args
 * @returns
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
 *
 * @param arrays
 * @param args
 * @returns
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
 *
 * @param array
 * @param joiner
 * @returns
 */
var join = function join(array, joiner) {
  if (joiner === void 0) {
    joiner = ',';
  }
  return array.join(joiner);
};

/**
 *
 * @param array
 * @returns
 */
var last = function last(array) {
  return array[array.length - 1];
};

/**
 *
 * @param array
 * @param element
 * @param fromIndex
 * @returns
 */
var lastIndexOf = function lastIndexOf(array, element, fromIndex) {
  if (fromIndex === void 0) {
    fromIndex = array.length - 1;
  }
  return array.lastIndexOf(element, fromIndex);
};

/**
 *
 * @param array
 * @param index
 * @returns
 */
var nth = function nth(array, index) {
  if (index === void 0) {
    index = 0;
  }
  return index >= 0 ? array[index] : array[array.length + index];
};

/**
 *
 * @param array
 * @param indexes
 * @returns
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
 *
 * @param array
 * @param elementsToRemove
 * @returns
 *
 * @example
 *
 * let array = ['a', 'b', 'c', 'a', 'b', 'c'];
 * pullAll(array, ['a', 'c'])
 * console.log(array);
 * // => ['b', 'b']
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
 *
 * @param array
 * @param elementsToRemove
 * @returns
 */
var pull = function pull(array) {
  for (var _len = arguments.length, elementsToRemove = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    elementsToRemove[_key - 1] = arguments[_key];
  }
  return pullAll(array, elementsToRemove);
};

/**
 *
 * @param array
 * @param elementsToRemove
 * @param iteratee
 * @returns
 *
 * @example
 *
 * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
 *
 * pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
 * console.log(array);
 * // => [{ 'x': 2 }]
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
 *
 * @param array
 * @param elementsToRemove
 * @param comparator
 * @returns
 *
 * @example
 *
 * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
 *
 * pullAllWith(array, [{ 'x': 3, 'y': 4 }], isEqual);
 * console.log(array);
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
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
 *
 * @param array
 * @param predicate
 * @returns
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
 *
 * @param array
 * @returns
 */
var reverse = function reverse(array) {
  return array.reverse();
};

/**
 *
 * @param array
 * @param start
 * @param end
 * @returns
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
var baseSortedIndex = function baseSortedIndex(collection, element) {
  var start = 0;
  var end = collection.length - 1;
  while (start <= end) {
    var mid = Math.floor((start + end) / 2);
    if (collection[mid] === element) return mid;else if (collection[mid] < element) start = mid + 1;else end = mid - 1;
  }
  return end + 1;
};

/**
 *
 * @param array
 * @param value
 * @returns
 */
var sortedIndex = function sortedIndex(array, value) {
  return baseSortedIndex(array, value);
};

/**
 *
 * @param array
 * @param value
 * @returns
 */
var sortedIndexOf = function sortedIndexOf(array, value) {
  return [].concat(array).sort().indexOf(value);
};

/**
 *
 * @param array
 * @param value
 * @returns
 */
var sortedLastIndexOf = function sortedLastIndexOf(array, value) {
  return [].concat(array).sort().lastIndexOf(value);
};

/**
 *
 * @param array
 * @returns
 */
var sortedUniq = function sortedUniq(array) {
  return Array.from(new Set([].concat(array)));
};

/**
 *
 * @param array
 * @param iteratee
 * @returns
 */
var sortedUniqBy = function sortedUniqBy(array, iteratee) {
  var mappedValues = new Map();
  array.forEach(function (element) {
    var updatedElement = iteratee(element);
    if (updatedElement && !mappedValues.has(updatedElement)) {
      mappedValues.set(updatedElement, element);
    }
  });
  array = Array.from(new Set([].concat(mappedValues.values())));
  return array;
};

/**
 *
 * @param array
 * @returns
 */
var tail = function tail(array) {
  var rest = array.slice(1);
  return rest;
};

/**
 *
 * @param array
 * @param length
 * @returns
 */
var take = function take(array, length) {
  if (length === void 0) {
    length = 1;
  }
  return [].concat(array).splice(0, length);
};

/**
 *
 * @param array
 * @param length
 * @returns
 */
var takeRight = function takeRight(array, length) {
  if (length === void 0) {
    length = 1;
  }
  return [].concat(array).splice(-length, length);
};

/**
 *
 * @param array
 * @param predicate
 * @returns
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
 *
 * @param array
 * @param predicate
 * @returns
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
 *
 * @param array
 * @param restCollection
 * @returns
 */
var union = function union(array) {
  for (var _len = arguments.length, restCollection = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restCollection[_key - 1] = arguments[_key];
  }
  return [].concat(new Set(array.concat.apply(array, restCollection)));
};

/**
 *
 * @param array One of the array to perform union operation on
 * @param predicate
 * @returns
 */
var unionBy = function unionBy(array) {
  var _predicate$pop;
  for (var _len = arguments.length, predicate = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    predicate[_key - 1] = arguments[_key];
  }
  var iteratee = (_predicate$pop = predicate.pop()) != null ? _predicate$pop : identity;
  if (typeof iteratee === 'string') {
    var prop = iteratee;
    iteratee = function iteratee(item) {
      return item[prop];
    };
  }
  return array.concat.apply(array, predicate).filter(function (x, i, self) {
    return i === self.findIndex(function (y) {
      return iteratee(x) === iteratee(y);
    });
  });
};

/**
 *
 * @param array
 * @returns
 */
var uniq = function uniq(array) {
  return Array.from(new Set(array));
};

/**
 *
 * @param array
 * @param iteratee
 * @returns
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
 *
 * @param array
 * @param otherArrays
 * @returns
 */
var zip = function zip(array) {
  for (var _len = arguments.length, otherArrays = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    otherArrays[_key - 1] = arguments[_key];
  }
  return array.map(function (value, idx) {
    return [value].concat(otherArrays.map(function (arr) {
      return arr[idx];
    }));
  });
};

/**
 *
 * @param param0
 * @returns
 */
//	@ts-ignore
var unzip = function unzip(_ref) {
  var array = _ref.slice(0);
  return zip.apply(void 0, array);
};

/**
 *
 * @param array
 * @param predicate
 * @returns
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
 *
 * @param array
 * @param exception
 * @returns
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
 *
 * @param array
 * @param restArray
 * @returns
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
 *
 * @param props
 * @param values
 * @returns
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
  first: first,
  fill: fill,
  findIndex: findIndex,
  findLastIndex: findLastIndex,
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
  sortedIndexOf: sortedIndexOf,
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
  uniq: uniq,
  uniqBy: uniqBy,
  unzip: unzip,
  unzipWith: unzipWith,
  without: without,
  xor: xor,
  zip: zip,
  zipObject: zipObject
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

var countBy = function countBy(collection, predicate) {
  var _prepareObject = prepareObject({
      collection: collection,
      predicate: predicate,
      operation: prepareObjectTypes.count
    }),
    result = _prepareObject.result;
  return result;
};

var forEach = function forEach(collection, iteratee) {
  applyArrayFn({
    collection: collection,
    fnName: 'forEach',
    iteratee: iteratee
  });
  return collection;
};

var each = forEach;

var forEachRight = function forEachRight(collection, iteratee) {
  applyArrayFn({
    collection: collection,
    fnName: 'forEach',
    iteratee: iteratee,
    checkFromEnd: true
  });
  return collection;
};

var eachRight = forEachRight;

var every = function every(collection, iteratee) {
  return applyArrayFn({
    collection: collection,
    fnName: 'every',
    iteratee: iteratee
  });
};

var filter = function filter(collection, iteratee) {
  return applyArrayFn({
    collection: collection,
    fnName: 'filter',
    iteratee: iteratee
  });
};

var find = function find(collection, iteratee, fromIndex) {
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

var findLast = function findLast(collection, iteratee, fromIndex) {
  if (fromIndex === void 0) {
    fromIndex = Array.isArray(collection) ? collection.length - 1 : 0;
  }
  var lastIndexOfRecord = findLastIndex(collection, iteratee, 0, fromIndex);
  if (lastIndexOfRecord > -1) return collection[lastIndexOfRecord];
  return undefined;
};

var flatMap = function flatMap(collection, iteratee) {
  return applyArrayFn({
    collection: collection,
    fnName: 'map',
    iteratee: iteratee
  }).flat();
};

var flatMapDeep = function flatMapDeep(collection, iteratee) {
  return applyArrayFn({
    collection: collection,
    fnName: 'map',
    iteratee: iteratee
  }).flat(Infinity);
};

var flatMapDepth = function flatMapDepth(collection, iteratee, depth) {
  if (depth === void 0) {
    depth = 1;
  }
  return applyArrayFn({
    collection: collection,
    fnName: 'map',
    iteratee: iteratee
  }).flat(depth);
};

var groupBy = function groupBy(collection, predicate) {
  var _prepareObject = prepareObject({
      collection: collection,
      predicate: predicate,
      operation: prepareObjectTypes.push
    }),
    result = _prepareObject.result;
  return result;
};

var includes = function includes(collection, iteratee, fromIndex) {
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

var keyBy = function keyBy(collection, predicate) {
  var _prepareObject = prepareObject({
      collection: collection,
      predicate: predicate,
      operation: prepareObjectTypes.replace
    }),
    result = _prepareObject.result;
  return result;
};

/**
 * Creates an array of values by running each element in collection thru iteratee. The iteratee is invoked with three arguments
(value, index|key, collection).
 * @param collection Array | Object
 * @param iteratee
 * @returns An array
 */
var map$1 = function map(collection, iteratee) {
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
  // orderBy = Array.isArray(orderBy) ? orderBy : [orderBy];
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
var orderBy = function orderBy(collection, iteratee, orders) {
  var _ref2;
  if (orders === void 0) {
    orders = 'asc';
  }
  var prepareSortConfig = Array.isArray(iteratee) ? iteratee.map(function (m, index) {
    var _ref;
    return _ref = {}, _ref[m] = orders[index], _ref;
  }) : [(_ref2 = {}, _ref2[iteratee] = Array.isArray(orders) ? orders[0] : orders, _ref2)];
  return sort(collection, prepareSortConfig);
};

var partition = function partition(collection, predicate) {
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

var reduce = function reduce(collection, iteratee, initialValue) {
  return applyArrayFn({
    collection: collection,
    fnName: 'reduce',
    iteratee: iteratee,
    initialValue: initialValue
  });
};

var reduceRight = function reduceRight(collection, iteratee, initialValue) {
  return applyArrayFn({
    collection: collection,
    fnName: 'reduceRight',
    iteratee: iteratee,
    initialValue: initialValue
  });
};

var reject = function reject(collection, predicate) {
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
 * @returns { element, restElements }
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

var sample = function sample(collection) {
  if (typeof collection === 'object') return Object.values(getRandomElementFromCollection(collection).element)[0];
  return getRandomElementFromCollection(collection).element;
};

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

var shuffle = function shuffle(collection) {
  if (Array.isArray(collection)) return sampleSize(collection, collection.length);else if (typeof collection === 'object') return sampleSize(collection, Object.keys(collection).length);
  return collection;
};

var size = function size(collection) {
  if (Array.isArray(collection)) return collection.length;else if (typeof collection === 'object') return Object.keys(collection).length;
  return collection.length;
};

var some = function some(collection, iteratee) {
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
  groupBy: groupBy,
  includes: includes,
  keyBy: keyBy,
  map: map$1,
  orderBy: orderBy,
  partition: partition,
  reduce: reduce,
  reduceRight: reduceRight,
  reject: reject,
  sample: sample,
  sampleSize: sampleSize,
  shuffle: shuffle,
  size: size,
  some: some,
  sortBy: sortBy
};

var now = function now() {
  return Date.now();
};

var date = {
  __proto__: null,
  now: now
};

/**
 *
 * @param times
 * @param fn
 * @returns
 */
var after = function after(times, fn) {
  var counter = 0;
  //  @ts-ignore
  return function () {
    counter++;
    if (counter >= times) {
      return fn.apply(void 0, arguments);
    }
  };
};

// @ts-nocheck
/**
 *
 * @param fn
 * @param arity
 * @returns
 */
var ary = function ary(fn, arity) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return fn.apply(void 0, args.slice(0, arity));
  };
};

// @ts-nocheck
/**
 *
 * @param times
 * @param fn
 * @returns
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

// @ts-nocheck
/**
 *
 * @param fn
 * @param ctx
 * @param boundArgs
 * @returns
 */
var bind = function bind(fn, ctx) {
  for (var _len = arguments.length, boundArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    boundArgs[_key - 2] = arguments[_key];
  }
  return fn.bind.apply(fn, [ctx].concat(boundArgs));
};

//	@ts-nocheck
/**
 *
 * @param obj
 * @param method
 * @param args
 * @returns
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

//	@ts-nocheck
/**
 *
 * @param func
 * @returns
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

//	@ts-nocheck
/**
 *
 * @param func
 * @returns
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

//	@ts-nocheck
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
 *
 * @param fn
 * @param timer
 * @param args
 * @returns
 */
var debounce = function debounce(fn, timer) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return setTimeout(function () {
    return fn.apply(void 0, args);
  }, timer);
};

//  @ts-nocheck
/**
 *
 * @param func
 * @returns
 */
var flip = function flip(func) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return func.apply(void 0, args.reverse());
  };
};

//  @ts-nocheck
/**
 *
 * @param func
 * @returns
 */
var negate = function negate(func) {
  return function () {
    return !func.apply(void 0, arguments);
  };
};

//	@ts-nocheck
/**
 *
 * @param fn
 * @returns
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

//	@ts-nocheck
/**
 *
 * @param fn
 * @param transforms
 * @returns
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

//	@ts-nocheck
/**
 *
 * @param func
 * @param args
 * @returns
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

//	@ts-nocheck
/**
 *
 * @param func
 * @param args
 * @returns
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

//	@ts-nocheck
/**
 *
 * @param func
 * @param order
 * @returns
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

//	@ts-nocheck
/**
 *
 * @param func
 * @returns
 */
var rest = function rest(func) {
  return function (first) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return func(first, args);
  };
};

//	@ts-nocheck
/**
 *
 * @param func
 * @returns
 */
var spread = function spread(func) {
  return function (args) {
    return func.apply(void 0, args);
  };
};

//  @ts-nocheck
/**
 *
 * @param fn
 * @returns
 */
var unary = function unary(fn) {
  return function (arg) {
    return fn(arg);
  };
};

//  @ts-nocheck
/**
 *
 * @param value
 * @param func
 * @returns
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
 *
 * @param input
 * @returns
 */
var castArray = function castArray(input) {
  if (Array.isArray(input)) return input;
  return [input];
};

/**
 *
 * @param value
 * @returns
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
 *
 * @param value
 * @returns
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
 *
 * @param obj
 * @param source
 * @returns
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
 *
 * @param value
 * @param other
 * @returns
 */
var eq = function eq(value, other) {
  return value === other || value !== value && other !== other;
};

/**
 *
 * @param value The value to check
 * @param other The value to compare
 * @returns
 */
var gt = function gt(value, other) {
  return value > other;
};

/**
 *
 * @param value The value to check
 * @param other The value to compare
 * @returns
 */
var gte = function gte(value, other) {
  return value >= other;
};

/**
 *
 * @param value The value to check
 * @returns true if passed array is like an Array
 */
var isArray = function isArray(value) {
  return Array.isArray(value);
};

/**
 *
 * @param value The value to check
 * @returns true if passed array is like an ArrayBuffer
 */
var isArrayBuffer = function isArrayBuffer(value) {
  return value instanceof ArrayBuffer;
};

/**
 *
 * @param value The value to check
 * @returns true if passed array is like an Array
 */
var isArrayLike = function isArrayLike(value) {
  try {
    return value.length >= 0;
  } catch (_unused) {
    return false;
  }
};

/**
 *
 * @param value The value to check
 * @returns true if passed array is like an object
 */
var isArrayLikeObject = function isArrayLikeObject(value) {
  return typeof value === 'object';
};

/**
 *
 * @param value The value to check
 * @returns true if passed value is a boolean value true or false
 */
var isBoolean = function isBoolean(value) {
  return value === true || value === false;
};

/**
 *
 * @param value The value to check
 * @returns true if passed value is a buffer typed value
 */
var isBuffer = function isBuffer(value) {
  return Buffer.isBuffer(value);
};

/**
 *
 * @param value The value to check
 * @returns true if passed value is a valid date or not
 */
var isDate = function isDate(value) {
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return !isNaN(value.getTime());
  }
  return false;
};

/**
 *
 * @param value The value to check
 * @returns true if passed value is a valid dom element
 */
var isElement = function isElement(value) {
  return typeof HTMLElement === 'object' ? value instanceof HTMLElement //DOM2
  : value && typeof value === 'object' && value !== null && value.nodeType === 1 && typeof value.nodeName === 'string';
};

/**
 *
 * @param value The value to check
 * @returns true if passed value is a empty or not
 */
var isEmpty = function isEmpty(value) {
  if (value === null || value === undefined || typeof value === 'number' || typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  if (value instanceof Set || value instanceof Map) return value.length > 0;
  return false;
};

/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 * @param value The value to check
 * @param other The value to compare
 * @returns true if both arguments are true
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
 *
 * @param value The value to check
 * @returns true if passed value is a is error or not
 */
var isNode = function isNode(value) {
  return value instanceof Error;
};

/**
 * Checks if value is a finite primitive number
 * @param value The value to check
 * @returns Returns true if value is a finite number, else false.
 */
var isFinite = function isFinite(value) {
  return Number.isFinite(value);
};

/**
 * Checks if value is classified as a Function object.
 * @param value The value to check
 * @returns Returns true if value is a function, else false.
 */
var isFunction = function isFunction(value) {
  return value instanceof Function && typeof value === 'function';
};

/**
 * Checks if value is classified as a Function object.
 * @param value The value to check
 * @returns Returns true if value is an integer, else false.
 */
var isInteger = function isInteger(value) {
  return Number.isInteger(value);
};

/**
 * Checks if value is a valid array-like length.
 * @param value The value to check
 * @returns Returns true if value is a valid length, else false.
 */
var isLength = function isLength(value) {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER;
};

/**
 * Checks if value is classified as a Map object.
 * @param value The value to check
 * @returns Returns true if value is a map, else false
 */
var isMap = function isMap(value) {
  return value instanceof Map && value.toString() === '[object Map]';
};

/**
 * Checks if value is NaN.
 * @param value The value to check.
 * @returns Returns true if value is NaN, else false.
 */
var isNaN$1 = function isNaN(value) {
  return value instanceof Number || Number.isNaN(value);
};

/**
 * Checks if value is a pristine native function.
 * @param value The value to check.
 * @returns Returns true if value is a native function, else false.
 */
var isNative = function isNative(value) {
  return !!value && (typeof value).toLowerCase() === 'function' && (value === Function.prototype || /^\s*function\s*(\b[a-z$_][a-z0-9$_]*\b)*\s*\((|([a-z$_][a-z0-9$_]*)(\s*,[a-z$_][a-z0-9$_]*)*)\)\s*{\s*\[native code\]\s*}\s*$/i.test(String(value)));
};

/**
 * Checks if value is null or undefined.
 * @param value The value to check.
 * @returns Returns true if value is nullish, else false.
 */
var isNil = function isNil(value) {
  return value === null || value === undefined;
};

/**
 * Checks if value is null
 * @param value The value to check.
 * @returns Returns true if value is null, else false.
 */
var isNull = function isNull(value) {
  return value === null;
};

/**
 * Checks if value is classified as a Number primitive or object.
 * @param value The value to check
 * @returns Returns true if value is a number, else false.
 */
var isNumber = function isNumber(value) {
  return typeof value === 'number' || typeof value === 'number';
};

/**
 * Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
 * @param value The value to check
 * @returns Returns true if value is an object, else false.
 */
var isObject = function isObject(value) {
  return !isNil(value) && value instanceof Object;
};

/**
 * Checks if value is object-like. A value is object-like if it's not null and has a typeof result of "object".
 * @param value The value to check
 * @returns Returns true if value is object-like, else false.
 */
var isObjectLike = function isObjectLike(value) {
  return value !== null && typeof value === 'object';
};

/**
 * Checks if value is a plain object, that is, an object created by the Object constructor or one with a [[Prototype]] of null.
 * @param value The value to check
 * @returns Returns true if value is a plain object, else false.
 */
var isPlainObject = function isPlainObject(value) {
  return (
    //  value?.constructor === Object;
    !!value && typeof value === 'object' && (value.__proto__ === null || value.__proto__ === Object.prototype)
  );
};

/**
 * Checks if value is classified as a RegExp object.
 * @param value The value to check
 * @returns Returns true if value is a regexp, else false.
 */
var isRegExp = function isRegExp(value) {
  return value instanceof RegExp;
};

/**
 * Checks if value is a safe integer. An integer is safe if it's an IEEE-754 double precision number which isn't the result of a rounded unsafe integer.
 * @param value The value to check.
 * @returns Returns true if value is a safe integer, else false.
 */
var isSafeInteger = function isSafeInteger(value) {
  return Number.isSafeInteger(value);
};

/**
 * Checks if value is classified as a set object.
 * @param value The value to check
 * @returns Returns true if value is a set, else false
 */
var isSet = function isSet(value) {
  return value instanceof Set || value.toString() === '[object Set]';
};

/**
 * Checks if value is classified as a String primitive or object.
 * @param value The value to check
 * @returns Returns true if value is a string, else false
 */
var isString = function isString(value) {
  return typeof value === 'string';
};

/**
 * Checks if value is classified as a Symbol primitive or object.
 * @param value The value to check
 * @returns Returns true if value is a symbol, else false
 */
var isSymbol = function isSymbol(value) {
  return typeof value === 'symbol';
};

/**
 * Checks if value is classified as a typed array.
 * @param value The value to check
 * @returns Returns true if value is a typed array, else false.
 */
var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
var isTypedArray = function isTypedArray(value) {
  return typedArrayPattern.test(Object.prototype.toString.call(value));
};

/**
 * Checks if value is undefined.
 * @param value The value to check
 * @returns Returns true if value is undefined, else false.
 */
var isUndefined = function isUndefined(value) {
  return value === undefined;
};

/**
 * Checks if value is classified as a weak map object.
 * @param value The value to check
 * @returns Returns true if value is a weak map, else false
 */
var isWeakMap = function isWeakMap(value) {
  return value instanceof WeakMap;
};

/**
 * Checks if value is classified as a weak set object.
 * @param value The value to check
 * @returns Returns true if value is a weak set, else false
 */
var isWeakSet = function isWeakSet(value) {
  return value instanceof WeakSet;
};

/**
 * Checks if value is less than other.
 * @param value The value to check
 * @param other The value to compare
 * @returns Returns true if value is less than other, else false.
 */
var lt = function lt(value, other) {
  return value < other;
};

/**
 * Checks if value is less than or equals to other.
 * @param value The value to check
 * @param other The value to compare
 * @returns Returns true if value is less than or equals to other, else false.
 */
var lte = function lte(value, other) {
  return value <= other;
};

/**
 * Converts value to a number.
 * @param value The value to process.
 * @returns Returns the number.
 */
var toNumber = function toNumber(value) {
  return Number(value);
};

/**
 * Converts value to a safe integer. A safe integer can be compared and represented correctly.
 * @param value The value to convert.
 * @returns Returns the converted integer.
 */
var toSafeInteger = function toSafeInteger(value) {
  var minimum = Math.min(value, Number.MAX_SAFE_INTEGER);
  var maximum = Math.max(minimum, Number.MIN_SAFE_INTEGER);
  return Math.round(maximum);
};

/**
 * Converts value to a string. An empty string is returned for null and undefined values. The sign of -0 is preserved.
 * @param value The value to convert.
 * @returns Returns the converted string.
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
  conformsTo: conformsTo,
  eq: eq,
  gt: gt,
  gte: gte,
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
  isError: isNode,
  isFinite: isFinite,
  isFunction: isFunction,
  isInteger: isInteger,
  isLength: isLength,
  isMap: isMap,
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
  toSafeInteger: toSafeInteger,
  toString: toString
};

var add = function add(augend, addend) {
  for (var _len = arguments.length, restNumbers = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    restNumbers[_key - 2] = arguments[_key];
  }
  var numbers = [augend, addend].concat(restNumbers);
  return numbers.reduce(function (oldValue, nextValue) {
    return oldValue + nextValue;
  }, 0);
};

//  @ts-nocheck
var baseMathPrecesion = function baseMathPrecesion(number, precision, mathFunctionName) {
  var coefficient = Math.pow(10, precision);
  return Math[mathFunctionName](number * coefficient) / coefficient;
};

var ceil = function ceil(value, precision) {
  if (precision === void 0) {
    precision = 0;
  }
  return baseMathPrecesion(value, precision, 'ceil');
};

var divide = function divide(dividend, divisor) {
  return dividend / divisor;
};

var floor = function floor(value, precision) {
  if (precision === void 0) {
    precision = 0;
  }
  return baseMathPrecesion(value, precision, 'floor');
};

var max = function max(collection) {
  return collection.length === 0 ? undefined : Math.max.apply(Math, collection);
};

var maxBy = function maxBy(collection, iteratee) {
  var fn = createPredicate(iteratee);
  return collection.reduce(function (a, b) {
    return fn(a) >= fn(b) ? a : b;
  }, {});
};

var mean = function mean(collection) {
  return collection.reduce(function (acc, num) {
    return acc + num;
  }, 0) / collection.length;
};

var sumBy = function sumBy(numbers, iteratee) {
  var fn = createPredicate(iteratee);
  return numbers.reduce(function (oldValue, nextValue) {
    return oldValue + fn(nextValue);
  }, 0);
};

var meanBy = function meanBy(collection, iteratee) {
  return sumBy(collection, iteratee) / collection.length;
};

var min = function min(collection) {
  return collection.length === 0 ? undefined : Math.min.apply(Math, collection);
};

var minBy = function minBy(collection, iteratee) {
  var fn = createPredicate(iteratee);
  return collection.reduce(function (a, b) {
    return fn(a) <= fn(b) ? a : b;
  }, {});
};

var multiply = function multiply() {
  for (var _len = arguments.length, numbers = new Array(_len), _key = 0; _key < _len; _key++) {
    numbers[_key] = arguments[_key];
  }
  return numbers.reduce(function (oldValue, newValue) {
    return oldValue * newValue;
  }, 1);
};

var round = function round(value, precision) {
  if (precision === void 0) {
    precision = 0;
  }
  return baseMathPrecesion(value, precision, 'round');
};

var subtract = function subtract() {
  for (var _len = arguments.length, numbers = new Array(_len), _key = 0; _key < _len; _key++) {
    numbers[_key] = arguments[_key];
  }
  return numbers.reduce(function (oldValue, newValue, index) {
    return index === 0 ? newValue : oldValue - newValue;
  }, 0);
};

/**
 *
 * @param numbers
 * @returns
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
 *
 * @param number
 * @param lower
 * @param upper
 * @returns
 */
var clamp = function clamp(number, lower, upper) {
  return upper ? Math.min(Math.max(number, lower), upper) : Math.min(number, lower);
};

/**
 *
 * @param number
 * @param start
 * @param end
 * @returns
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
 *
 * @param lower
 * @param upper
 * @returns
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
 *
 * @param object
 * @param sources
 * @returns
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
 *
 * @param object
 * @param sources
 * @returns
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

var at = function at(object, paths) {
  var data = [];
  paths.forEach(function (f) {
    var value = get(object, f);
    if (value) data.push(value);
  });
  return data;
};

/**
 *
 * @param prototype
 * @param properties
 * @returns
 */
var create = function create(prototype, properties) {
  return Object.assign(Object.create(prototype), _extends({}, properties));
};

/**
 *
 * @param args
 * @returns
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
 *
 * @param obj
 * @returns
 */
var toPairs = function toPairs(object) {
  return Object.entries(object);
};

var entries = toPairs;

var extend = assignIn;

/**
 *
 * @param obj
 * @param predicate
 * @returns
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
 *
 * @param obj
 * @param predicate
 * @returns
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
 *
 * @param object
 * @param iteratee
 * @returns
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
 *
 * @param object
 * @param iteratee
 * @returns
 */
var forInRight = function forInRight(object, iteratee) {
  var collection = assignIn({}, object);
  var reverseData = reverseCollection(collection);
  return reverseData.forEach(function (value, key, index) {
    iteratee(value, key, reverseData, index);
  });
};

/**
 *
 * @param object
 * @param iteratee
 * @returns
 */
var forOwn = function forOwn(object, iteratee) {
  return applyArrayFn({
    collection: object,
    fnName: 'forEach',
    iteratee: iteratee
  });
};

/**
 *
 * @param object
 * @param iteratee
 * @returns
 */
var forOwnRight = function forOwnRight(object, iteratee) {
  var reverseData = reverseCollection(object);
  return reverseData.forEach(function (value, key, index) {
    iteratee(value, key, reverseData, index);
  });
};

/**
 *
 * @param object
 * @returns
 */
var functions = function functions(object) {
  var _Object$keys$filter;
  return (_Object$keys$filter = Object.keys(object).filter(function (key) {
    return typeof object[key] === 'function';
  })) != null ? _Object$keys$filter : [];
};

/**
 *
 * @param object
 * @returns
 */
var functionsIn = function functionsIn(object) {
  var _Object$keys$filter;
  var collection = assignIn({}, object);
  return (_Object$keys$filter = Object.keys(collection).filter(function (key) {
    return typeof collection[key] === 'function';
  })) != null ? _Object$keys$filter : [];
};

/**
 *
 * @param object
 * @param path
 * @returns
 */
var has = function has(object, path) {
  // it might not work for some edge cases. Test your code!
  var pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  return !!pathArray.reduce(function (prevObj, key) {
    return prevObj && prevObj[key];
  }, object);
};

/**
 *
 * @param object
 * @returns
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
 *
 * @param object
 * @returns
 */
var keys = function keys(object) {
  return Object.keys(object);
};

/**
 *
 * @param object
 * @returns
 */
var keysIn = function keysIn(object) {
  var collection = assignIn({}, object);
  return Object.keys(collection);
};

/**
 *
 * @param object
 * @param iteratee
 * @returns
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
 *
 * @param object
 * @param sources
 * @returns
 */
var merge = function merge(object) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }
  for (var _i = 0, _sources = sources; _i < _sources.length; _i++) {
    var source = _sources[_i];
    mergeValue(object, source);
  }
  return object;
  function innerMerge(object, source) {
    for (var _i2 = 0, _Object$entries = Object.entries(source); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _Object$entries[_i2],
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
};

/**
 *
 * @param object
 * @param paths
 * @returns
 */
var omit = function omit(object, paths) {
  return Object.fromEntries(Object.entries(object).filter(function (_ref) {
    var key = _ref[0];
    return !paths.includes(key);
  }));
};

/**
 *
 * @param object
 * @param predicate
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
 *
 * @param object
 * @param predicate
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
 *
 * @param object
 * @param predicate
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
 *
 * @param object
 * @param path
 * @param value
 */
var set = function set(object, path, value) {
  var pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  pathArray.reduce(function (acc, key, i) {
    if (acc[key] === undefined) acc[key] = {};
    if (i === pathArray.length - 1) acc[key] = value;
    return acc[key];
  }, object);
  return object;
};

/**
 *
 * @param object
 * @returns
 */
var toPairsIn = function toPairsIn(object) {
  var newObject = assignIn({}, object);
  return Object.entries(newObject);
};

/**
 *
 * @param object
 * @param path
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
 *
 * @param object
 * @param path
 * @param updater
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
 *
 * @param object
 * @returns
 */
var values = function values(object) {
  return Object.values(object);
};

/**
 *
 * @param object
 * @returns
 */
var valuesIn = function valuesIn(object) {
  var newObject = assignIn({}, object);
  return Object.values(newObject);
};

var obj = {
  __proto__: null,
  assign: assign,
  assignIn: assignIn,
  at: at,
  create: create,
  defaults: defaults,
  entries: entries,
  extend: extend,
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
  invert: invert,
  keys: keys,
  keysIn: keysIn,
  mapKeys: mapKeys,
  merge: merge,
  omit: omit,
  omitBy: omitBy,
  pick: pick,
  pickBy: pickBy,
  set: set,
  toPairs: toPairs,
  toPairsIn: toPairsIn,
  unset: unset,
  update: update,
  values: values,
  valuesIn: valuesIn
};

/**
 *
 * @param str
 * @returns
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
 *
 * @param str
 * @returns
 */
var capitalize$1 = function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 *
 * @param str
 * @param target
 * @param position
 * @returns
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
 *
 * @param str
 * @returns
 */
var escape = function escape(str) {
  return str.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
};

/**
 *
 * @param str
 * @returns
 */
var escapeRegExp = function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 *
 * @param str
 * @returns
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
 *
 * @param str
 * @returns
 */
var lowerCase = function lowerCase(str) {
  if (str === void 0) {
    str = '';
  }
  return str.replace(/[-._\s]+/g, ' ').replace(/[A-Z0-9]/, ' $&').replace(/[-]{2,}/, '').toLowerCase().trim();
};

/**
 *
 * @param str
 * @returns
 */
var lowerFirst = function lowerFirst(str) {
  if (str === void 0) {
    str = '';
  }
  return str.charAt(0).toLowerCase() + str.slice(1);
};

/**
 *
 * @param str
 * @param length
 * @param characters
 * @returns
 */
var pad = function pad(str, length, characters) {
  if (characters === void 0) {
    characters = ' ';
  }
  var prePad = Math.floor((length - str.length) / 2) + str.length;
  return str.padStart(prePad, characters).padEnd(length, characters);
};

/**
 *
 * @param str
 * @param length
 * @param chars
 * @returns
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
 *
 * @param str
 * @param length
 * @param chars
 * @returns
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
 *
 * @param str
 * @param radix
 * @returns
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
 *
 * @param str
 * @param n
 * @returns
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
 *
 * @param str
 * @param pattern
 * @param replacement
 * @returns
 */
var replace = function replace(str, pattern, replacement) {
  if (str === void 0) {
    str = '';
  }
  return str.replace(pattern, replacement);
};

//  @ts-nocheck
/**
 *
 * @param str s
 * @returns
 */
var snakeCase = function snakeCase(str) {
  if (str === void 0) {
    str = '';
  }
  return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (s) {
    return s.toLowerCase();
  }).join('_');
};

/**
 *
 * @param str
 * @param separator
 * @param limit
 * @returns
 */
var split = function split(str, separator, limit) {
  if (str === void 0) {
    str = '';
  }
  return str.split(separator, limit);
};

/**
 *
 * @param str
 * @returns
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
 *
 * @param str
 * @param target
 * @param position
 * @returns
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
 *
 * @param str
 * @returns
 */
var toLower = function toLower(str) {
  if (str === void 0) {
    str = '';
  }
  return str.toLowerCase();
};

/**
 *
 * @param str
 * @returns
 */
var toUpper = function toUpper(str) {
  if (str === void 0) {
    str = '';
  }
  return str.toUpperCase();
};

/**
 *
 * @param str
 * @returns
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
 *
 * @param str
 * @returns
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
 *
 * @param str
 * @returns
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
 *
 * @param str
 * @returns
 */
var upperCase = function upperCase(str) {
  if (str === void 0) {
    str = '';
  }
  return str.replace(/[-._\s]+/g, ' ').replace(/[A-Z0-9]/, ' $&').replace(/[-]{2,}/, '').toUpperCase().trim();
};

/**
 *
 * @param str
 * @returns
 */
var upperFirst = function upperFirst(str) {
  if (str === void 0) {
    str = '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
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
  upperCase: upperCase,
  upperFirst: upperFirst
};

/**
 *
 * @param value
 * @returns
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
 */
var chain2 = function chain2(_value) {
  return {
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

var seq = {
  __proto__: null,
  chain2: chain2
};

/**
 *
 * @param func
 * @param args
 * @returns
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
 *
 * @param pairs
 * @returns
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
 *
 * @param object
 * @returns
 */
var conforms = function conforms(object) {
  return function (obj) {
    return conformsTo(obj, object);
  };
};

/**
 *
 * @param arg
 * @returns
 */
var constant = function constant(arg) {
  return function () {
    return arg;
  };
};

/**
 *
 * @param value
 * @param defaultValue
 * @returns
 */
var defaultTo = function defaultTo(value, defaultValue) {
  return value == null || Object.is(value, NaN) ? defaultValue : value;
};

/**
 *
 * @param funcs
 * @returns
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
 *
 * @param funcs
 * @returns
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
 *
 * @param predicate
 * @returns
 */
var iteratee = function iteratee(predicate) {
  return createPredicate(predicate);
};

var noop = function noop() {};

/**
 *
 * @param idx
 * @returns
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
 *
 * @param array
 * @returns
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
 *
 * @param predicates
 * @returns
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
 *
 * @param predicates
 * @returns
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
 *
 * @param path
 * @returns
 */
var property = function property(path) {
  return function (obj) {
    return get(obj, path);
  };
};

/**
 *
 * @param start
 * @param end
 * @param step
 * @param checkRangeFromRight
 * @returns
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
 *
 * @param start
 * @param end
 * @param step
 * @returns
 */
var rangeRight = function rangeRight(start, end, step) {
  if (start === void 0) {
    start = 0;
  }
  return range(start, end, step, true);
};

var stubArray = function stubArray() {
  return [];
};

var stubFalse = function stubFalse() {
  return false;
};

var stubObject = function stubObject() {
  return {};
};

var stubString = function stubString() {
  return '';
};

var stubTrue = function stubTrue() {
  return true;
};

/**
 *
 * @param n
 * @param iteratee
 * @returns
 */
var times = function times(n, iteratee) {
  if (iteratee === void 0) {
    iteratee = identity;
  }
  return Array.from({
    length: n
  }).map(function (_, i) {
    return iteratee(i);
  });
};

/**
 *
 * @param path
 * @returns
 */
var toPath = function toPath(path) {
  return path.match(/([^[.\]])+/g);
};

var uniqueId = /*#__PURE__*/function (counter) {
  return function (str) {
    if (str === void 0) {
      str = '';
    }
    return "" + str + ++counter;
  };
}(0);

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
  noop: noop,
  nthArg: nthArg,
  over: over,
  overEvery: overEvery,
  overSome: overSome,
  property: property,
  range: range,
  rangeRight: rangeRight,
  stubArray: stubArray,
  stubFalse: stubFalse,
  stubObject: stubObject,
  stubString: stubString,
  stubTrue: stubTrue,
  times: times,
  toPath: toPath,
  uniqueId: uniqueId
};

var _ = /*#__PURE__*/_extends({}, array, collection, date, func, math, num, obj, seq, str, lang, util);

export { add, after, ary, assign, assignIn, at, attempt, before, bind, bindKey, camelCase, capitalize$1 as capitalize, castArray, ceil, chain2, chunk, clamp, clone, cloneDeep, compact, concat, cond, conforms, conformsTo, constant, countBy, create, curry, curryRight, debounce$1 as debounce, _ as default, defaultTo, defaults, debounce as delay, difference, differenceBy, differenceWith, divide, drop, dropRight, dropRightWhile, dropWhile, each, eachRight, endsWith, entries, eq, escape, escapeRegExp, every, extend, fill, filter, find, findIndex, findKey, findLast, findLastIndex, findLastKey, first, flatMap, flatMapDeep, flatMapDepth, flatten, flattenDeep, flattenDepth, flip, floor, flow, flowRight, forEach, forEachRight, forIn, forInRight, forOwn, forOwnRight, fromPairs, functions, functionsIn, get, groupBy, gt, gte, has, head, identity, inRange, includes, indexOf, initial, intersection, intersectionBy, intersectionWith, invert, isArray, isArrayBuffer, isArrayLike, isArrayLikeObject, isBoolean, isBuffer, isDate, isElement, isEmpty, isEqual, isNode as isError, isFinite, isFunction, isInteger, isLength, isMap, isNaN$1 as isNaN, isNative, isNil, isNull, isNumber, isObject, isObjectLike, isPlainObject, isRegExp, isSafeInteger, isSet, isString, isSymbol, isTypedArray, isUndefined, isWeakMap, isWeakSet, iteratee, join, kebabCase, keyBy, keys, keysIn, last, lastIndexOf, lowerCase, lowerFirst, lt, lte, map$1 as map, mapKeys, max, maxBy, mean, meanBy, merge, min, minBy, multiply, negate, noop, now, nth, nthArg, omit, omitBy, once, orderBy, over, overArgs, overEvery, overSome, pad, padEnd, padStart, parseInt$1 as parseInt, partial, partialRight, partition, pick, pickBy, property, pull, pullAll, pullAt, random, range, rangeRight, rearg, reduce, reduceRight, reject, remove, repeat, replace, rest, reverse, round, sample, sampleSize, set, shuffle, size, slice, snakeCase, some, sortBy, sortedIndex, sortedIndexOf, sortedLastIndexOf, sortedUniq, sortedUniqBy, split, spread, startCase, startsWith, stubArray, stubFalse, stubObject, stubString, stubTrue, subtract, sum, sumBy, tail, take, takeRight, takeRightWhile, takeWhile, times, toLower, toNumber, toPairs, toPairsIn, toPath, toSafeInteger, toString, toUpper, trim, trimEnd, trimStart, unary, union, unionBy, uniq, uniqBy, uniqueId, unset, unzip, unzipWith, update, upperCase, upperFirst, values, valuesIn, without, wrap, xor, zip, zipObject };
//# sourceMappingURL=alt-lodash.esm.js.map
