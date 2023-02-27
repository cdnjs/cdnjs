'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
 * @param collection The array to process.
 * @param chunkSize The length of each chunk
 * @returns Returns the new array of chunks.
 */
var chunk = function chunk(collection, chunkSize) {
  if (chunkSize === void 0) {
    chunkSize = 1;
  }
  return Array(Math.ceil(collection.length / chunkSize)).fill(null).map(function (_, index) {
    return index * chunkSize;
  }).map(function (begin) {
    return collection.slice(begin, begin + chunkSize);
  });
};

/**
 * Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.
 * @param collection The array to compact.
 * @returns Returns the new array of filtered values.
 */
var compact = function compact(collection) {
  return collection.filter(Boolean);
};

var concat = function concat(collection) {
  var newCollection = [];
  newCollection = newCollection.concat(collection);
  for (var _len = arguments.length, restCollection = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restCollection[_key - 1] = arguments[_key];
  }
  restCollection.forEach(function (c) {
    newCollection = newCollection.concat(c);
  });
  return [].concat(newCollection);
};

var difference = function difference(collection) {
  if (collection === null || collection === undefined) return [];
  for (var _len = arguments.length, restCollections = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restCollections[_key - 1] = arguments[_key];
  }
  var concatedArray = concat(restCollections);
  return collection.filter(function (x) {
    return !concatedArray.includes(x);
  });
};

var differenceBy = function differenceBy(collection1, collection2, dependent) {
  switch (typeof dependent) {
    case 'string':
      return [].concat(collection1).filter(
      //	@ts-ignore
      function (x) {
        return !collection2.some(function (y) {
          return x[dependent] === y[dependent];
        });
      });
    case 'function':
      var dependentArray2 = [].concat(collection2).map(function (m) {
        return dependent(m);
      });
      return [].concat(collection1).filter(function (x) {
        var dependentX = dependent(x);
        return !dependentArray2.some(function (y) {
          return dependentX === y;
        });
      });
  }
  return [];
};

var drop = function drop(collection, length) {
  if (length === void 0) {
    length = 1;
  }
  return collection.slice(length);
};

var dropRight = function dropRight(collection, length) {
  return length === undefined ? collection.slice(0, -1) : length === 0 ? collection : collection.slice(0, length * -1);
};

var get = function get(object, path, defaultValue) {
  var _object;
  var parts = path.split('.');
  for (var _iterator = _createForOfIteratorHelperLoose(parts), _step; !(_step = _iterator()).done;) {
    var part = _step.value;
    if (!object) return defaultValue;
    object = object[part];
  }
  return (_object = object) != null ? _object : defaultValue;
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
 * @param collection
 * @param predicate
 * @returns
 */
var dropRightWhile = function dropRightWhile(collection, predicate) {
  var fn = createPredicate(predicate);
  for (var i = collection.length - 1; i >= 0; i--) {
    if (!fn(collection[i])) {
      return collection.slice(0, i + 1);
    }
  }
  return collection;
};

/**
 *
 * @param collection
 * @param predicate
 * @returns
 */
var dropWhile = function dropWhile(collection, predicate) {
  var fn = createPredicate(predicate);
  for (var i = 0; i < collection.length; i++) {
    if (!fn(collection[i])) {
      return collection.slice(i);
    }
  }
  return collection;
};

var fill = function fill(collection, value, start, end) {
  if (start === void 0) {
    start = 0;
  }
  if (end === void 0) {
    end = collection.length;
  }
  collection.fill(value, start, end);
  return collection;
};

var head = function head(collection) {
  return collection[0];
};

var first = head;

var reverseCollection = function reverseCollection(collection) {
  if (Array.isArray(collection)) {
    return collection.reverse();
  } else if (collection && typeof collection === 'object' || !(collection instanceof Map)) {
    var mappedEntries = new Map(Object.entries(collection));
    var reverseMappedEntries = [].concat(mappedEntries.entries()).reverse();
    return new Map([].concat(reverseMappedEntries.entries()).reverse());
  }
  return collection;
};

var applyArrayFn = function applyArrayFn(_ref) {
  var collection = _ref.collection,
    fnName = _ref.fnName,
    iteratee = _ref.iteratee,
    _ref$makeItReverse = _ref.makeItReverse,
    makeItReverse = _ref$makeItReverse === void 0 ? false : _ref$makeItReverse,
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
    var collectionInReverse = makeItReverse ? reverseCollection([].concat(collectionToTest)) : [].concat(collectionToTest);
    if (fnName === 'reduce') return collectionInReverse[fnName](iteratee, initialValue);
    return collectionInReverse[fnName](iteratee);
  }
  if (collection && typeof collection === 'object') {
    var _collectionInReverse = makeItReverse ? reverseCollection(_extends({}, collection)) : _extends({}, collection);
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

var findIndex = function findIndex(collection, predicate, fromIndex) {
  if (fromIndex === void 0) {
    fromIndex = 0;
  }
  return applyArrayFn({
    collection: collection,
    fnName: 'findIndex',
    iteratee: predicate,
    fromIndex: fromIndex
  });
};

var findLastIndex = function findLastIndex(collection, predicate, fromIndex) {
  if (fromIndex === void 0) {
    fromIndex = 0;
  }
  var fn = createPredicate(predicate);
  if (fn === undefined) return collection.lastIndexOf(predicate);
  for (var i = collection.length - 1; i >= fromIndex; i--) {
    if (fn(collection[i])) {
      return i;
    }
  }
  return -1;
};

var flatten = function flatten(collection) {
  return collection.flat();
};

var flattenDeep = function flattenDeep(collection) {
  return collection.flat(Infinity);
};

var flattenDepth = function flattenDepth(collection, depth) {
  return collection.flat(depth);
};

var fromPairs = function fromPairs(collection) {
  return Object.fromEntries(collection);
};

var indexOf = function indexOf(collection, value, startIndex) {
  if (startIndex === void 0) {
    startIndex = 0;
  }
  return collection.indexOf(value, startIndex);
};

var initial = function initial(collection) {
  var lastIndex = collection.length - 1;
  return collection.filter(function (_, index) {
    return index !== lastIndex;
  });
};

var intersection = function intersection() {
  for (var _len = arguments.length, collections = new Array(_len), _key = 0; _key < _len; _key++) {
    collections[_key] = arguments[_key];
  }
  return [].concat(collections).reduce(function (a, b) {
    return a.filter(function (c) {
      return b.includes(c);
    });
  });
};

/**
 *
 * @param collection
 * @param args
 * @returns
 */
var intersectionBy = function intersectionBy(collection) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var iteratee = args.pop();
  if (typeof iteratee === 'string') {
    var prop = iteratee;
    iteratee = function iteratee(item) {
      return item[prop];
    };
  }
  return collection.filter(function (item1) {
    return args.every(function (arr2) {
      return arr2.find(function (item2) {
        return iteratee(item1) === iteratee(item2);
      });
    });
  });
};

var join = function join(collection, joiner) {
  return collection.join(joiner);
};

var last = function last(collection) {
  /* TODO: Convert below code to .at method of an array */
  return collection[collection.length - 1];
};

var lastIndexOf = function lastIndexOf(collection, element, fromIndex) {
  if (fromIndex === void 0) {
    fromIndex = collection.length - 1;
  }
  return collection.lastIndexOf(element, fromIndex);
};

/* TODO: Covert below code to array's .at method */
var nth = function nth(collection, index) {
  return index >= 0 ? collection[index] : collection[collection.length + index];
};

var pullAll = function pullAll(collection, elementsToRemove) {
  collection = collection.filter(function (f) {
    return !elementsToRemove.includes(f);
  });
  return collection;
};

var pull = function pull(collection) {
  for (var _len = arguments.length, elementsToRemove = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    elementsToRemove[_key - 1] = arguments[_key];
  }
  return pullAll(collection, elementsToRemove);
  // collection = collection.filter(f => !elementsToRemove.includes(f));
  // return collection;
};

var pullAt = function pullAt(collection, indexes) {
  if (Array.isArray(indexes)) {
    return indexes.reverse().map(function (indexes) {
      return collection.splice(indexes, 1)[0];
    }).reverse();
  }
  var element = [nth(collection, indexes)];
  collection.splice(indexes, 1);
  return element;
};

var remove = function remove(collection, predicate) {
  if (predicate === void 0) {
    predicate = function predicate(x) {
      return !!x;
    };
  }
  var fn = createPredicate(predicate);
  var removedArray = [];
  var updatedCollection = [];
  collection.forEach(function (element, index) {
    if (fn(collection[index])) {
      removedArray.push(element);
    } else {
      updatedCollection.push(element);
    }
  });
  collection = [].concat(updatedCollection);
  return removedArray;
};

var reverse = function reverse(collection) {
  return collection.reverse();
};

var slice = function slice(collection, start, end) {
  if (start === void 0) {
    start = 0;
  }
  if (end === void 0) {
    end = collection.length;
  }
  return collection.slice(start, end);
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

var sortedIndex = function sortedIndex(collection, value) {
  return baseSortedIndex(collection, value);
};

/**
 *
 * @param collection
 * @param value
 * @returns
 */
var sortedIndexOf = function sortedIndexOf(collection, value) {
  return [].concat(collection).sort().indexOf(value);
};

/**
 *
 * @param collection
 * @param value
 * @returns
 */
var sortedLastIndexOf = function sortedLastIndexOf(collection, value) {
  return [].concat(collection).sort().lastIndexOf(value);
};

var sortedUniq = function sortedUniq(collection) {
  return Array.from(new Set([].concat(collection)));
};

var sortedUniqBy = function sortedUniqBy(collection, predicate) {
  if (predicate === void 0) {
    predicate = function predicate(x) {
      return !!x;
    };
  }
  var fn = createPredicate(predicate);
  var mappedValues = new Map();
  collection.forEach(function (element) {
    var updatedElement = fn(element);
    if (updatedElement && !mappedValues.has(updatedElement)) {
      mappedValues.set(updatedElement, element);
    }
  });
  collection = Array.from(new Set([].concat(mappedValues.values())));
  return collection;
};

var tail = function tail(collection) {
  var rest = collection.slice(1);
  return rest;
};

var take = function take(collection, length) {
  if (length === void 0) {
    length = 1;
  }
  return collection.slice(0, length);
};

var takeRight = function takeRight(collection, length) {
  if (length === void 0) {
    length = 1;
  }
  return [].concat(collection).splice(-length, length);
};

var takeRightWhile = function takeRightWhile(collection, predicate) {
  if (collection.length === 0) return collection;
  var fn = createPredicate(predicate);
  var collectionToReturn = [];
  for (var i = collection.length - 1; i >= 0; i--) {
    if (fn(collection[i])) {
      collectionToReturn.push(collection[i]);
    } else {
      return collectionToReturn.reverse();
    }
  }
  return [];
};

var takeWhile = function takeWhile(collection, predicate) {
  if (collection.length === 0) return collection;
  var fn = createPredicate(predicate);
  var collectionToReturn = [];
  for (var i = 0; i < collection.length; i++) {
    if (fn(collection[i])) {
      collectionToReturn.push(collection[i]);
    } else {
      return collectionToReturn;
    }
  }
  return [];
};

/**
 *
 * @param collection
 * @param restCollection
 * @returns
 */
var union = function union(collection) {
  for (var _len = arguments.length, restCollection = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restCollection[_key - 1] = arguments[_key];
  }
  return [].concat(new Set(collection.concat.apply(collection, restCollection)));
};

/**
 *
 * @param collection One of the collection to perform union operation on
 * @param predicate
 * @returns
 */
var unionBy = function unionBy(collection) {
  for (var _len = arguments.length, predicate = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    predicate[_key - 1] = arguments[_key];
  }
  var iteratee = predicate.pop();
  if (typeof iteratee === 'string') {
    var prop = iteratee;
    iteratee = function iteratee(item) {
      return item[prop];
    };
  }
  return collection.concat.apply(collection, predicate).filter(function (x, i, self) {
    return i === self.findIndex(function (y) {
      return iteratee(x) === iteratee(y);
    });
  });
};

var uniq = function uniq(collection) {
  return Array.from(new Set(collection));
};

var uniqBy = function uniqBy(collection, iteratee) {
  if (typeof iteratee === 'string') {
    var prop = iteratee;
    iteratee = function iteratee(item) {
      return item[prop];
    };
  }
  return collection.filter(function (x, i, self) {
    return i === self.findIndex(function (y) {
      return iteratee(x) === iteratee(y);
    });
  });
};

var zip = function zip(collection) {
  for (var _len = arguments.length, otherCollections = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    otherCollections[_key - 1] = arguments[_key];
  }
  return collection.map(function (value, idx) {
    return [value].concat(otherCollections.map(function (arr) {
      return arr[idx];
    }));
  });
};

//	@ts-ignore
var unzip = function unzip(_ref) {
  var collection = _ref.slice(0);
  return zip.apply(void 0, collection);
};

var unzipWith = function unzipWith(collection, predicate) {
  var fn = createPredicate(predicate);
  var unzipped = unzip(collection);
  return unzipped.map(function (m) {
    return fn.apply(void 0, m);
  });
};

var without = function without(collection) {
  for (var _len = arguments.length, exception = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    exception[_key - 1] = arguments[_key];
  }
  return collection.filter(function (f) {
    return !exception.includes(f);
  });
};

/**
 *
 * @param collection
 * @param restCollection
 * @returns
 */
var xor = function xor(collection) {
  for (var _len = arguments.length, restCollection = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restCollection[_key - 1] = arguments[_key];
  }
  var flatArray = concat.apply(void 0, [collection].concat(restCollection));
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

var zipObject = function zipObject(keys, values) {
  return keys.reduce(function (acc, key, idx) {
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
  join: join,
  last: last,
  lastIndexOf: lastIndexOf,
  nth: nth,
  pull: pull,
  pullAll: pullAll,
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
    makeItReverse: true
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
  return applyArrayFn({
    collection: collection,
    fnName: 'findLast',
    iteratee: iteratee,
    fromIndex: 0,
    toIndex: fromIndex
  });
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
var map = function map(collection, iteratee) {
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
  map: map,
  orderBy: orderBy,
  partition: partition,
  reduce: reduce,
  reduceRight: reduceRight,
  reject: reject,
  sample: sample,
  sampleSize: sampleSize,
  shuffle: shuffle,
  size: size,
  some: some
};

var now = function now() {
  return Date.now();
};

var date = {
  __proto__: null,
  now: now
};

var add = function add() {
  for (var _len = arguments.length, numbers = new Array(_len), _key = 0; _key < _len; _key++) {
    numbers[_key] = arguments[_key];
  }
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
  return add.apply(void 0, collection) / collection.length;
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

var sum = function sum(numbers) {
  return add.apply(void 0, numbers);
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

var clamp = function clamp(number, lower, upper) {
  return Math.max(lower, Math.min(number, upper));
};

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

var numberMethods = {
  __proto__: null,
  clamp: clamp,
  inRange: inRange,
  random: random
};

/**
 *
 */
var toPairs = function toPairs(obj) {
  return Object.entries(obj);
};

var objectMethods = {
  __proto__: null,
  toPairs: toPairs
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
  if (value instanceof Set) return new Set(value);
  if (value instanceof Map) return new Map(value);
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

//  @ts-nocheck
/**
 *
 * @param obj
 * @param source
 * @returns
 */
var conformsTo = function conformsTo(obj, source) {
  var entries = Object.entries(source);
  for (var i = 0; i < entries.length; i++) {
    var valueInMainObject = obj[entries[i][0]];
    if (entries[i][1](valueInMainObject) !== true) return false;
  }
  return true;
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
  return value instanceof Function;
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
  return value instanceof Map;
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
  return typeof value === 'number';
};

/**
 * Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
 * @param value The value to check
 * @returns Returns true if value is an object, else false.
 */
var isObject = function isObject(value) {
  return !isNil(value) && typeof value === 'object';
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
  return value instanceof Set;
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
var isTypedArray = function isTypedArray(value) {
  return [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array].indexOf(value.constructor) > -1;
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

var stringMethods = {
  __proto__: null,
  camelCase: camelCase,
  capitalize: capitalize$1,
  endsWith: endsWith,
  kebabCase: kebabCase,
  lowerCase: lowerCase,
  lowerFirst: lowerFirst,
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

var _ = /*#__PURE__*/_extends({}, array, collection, date, math, numberMethods, objectMethods, stringMethods, lang);

exports.add = add;
exports.camelCase = camelCase;
exports.capitalize = capitalize$1;
exports.castArray = castArray;
exports.ceil = ceil;
exports.chunk = chunk;
exports.clamp = clamp;
exports.clone = clone;
exports.cloneDeep = cloneDeep;
exports.compact = compact;
exports.concat = concat;
exports.conformsTo = conformsTo;
exports.countBy = countBy;
exports["default"] = _;
exports.difference = difference;
exports.differenceBy = differenceBy;
exports.divide = divide;
exports.drop = drop;
exports.dropRight = dropRight;
exports.each = each;
exports.eachRight = eachRight;
exports.endsWith = endsWith;
exports.every = every;
exports.fill = fill;
exports.filter = filter;
exports.find = find;
exports.findIndex = findIndex;
exports.findLast = findLast;
exports.findLastIndex = findLastIndex;
exports.first = first;
exports.flatMap = flatMap;
exports.flatMapDeep = flatMapDeep;
exports.flatMapDepth = flatMapDepth;
exports.flatten = flatten;
exports.flattenDeep = flattenDeep;
exports.flattenDepth = flattenDepth;
exports.floor = floor;
exports.forEach = forEach;
exports.forEachRight = forEachRight;
exports.fromPairs = fromPairs;
exports.groupBy = groupBy;
exports.gt = gt;
exports.gte = gte;
exports.head = head;
exports.inRange = inRange;
exports.includes = includes;
exports.indexOf = indexOf;
exports.initial = initial;
exports.intersection = intersection;
exports.isArray = isArray;
exports.isArrayBuffer = isArrayBuffer;
exports.isArrayLike = isArrayLike;
exports.isArrayLikeObject = isArrayLikeObject;
exports.isBoolean = isBoolean;
exports.isBuffer = isBuffer;
exports.isDate = isDate;
exports.isElement = isElement;
exports.isEmpty = isEmpty;
exports.isEqual = isEqual;
exports.isError = isNode;
exports.isFinite = isFinite;
exports.isFunction = isFunction;
exports.isInteger = isInteger;
exports.isLength = isLength;
exports.isMap = isMap;
exports.isNaN = isNaN$1;
exports.isNative = isNative;
exports.isNil = isNil;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isObjectLike = isObjectLike;
exports.isPlainObject = isPlainObject;
exports.isRegExp = isRegExp;
exports.isSafeInteger = isSafeInteger;
exports.isSet = isSet;
exports.isString = isString;
exports.isSymbol = isSymbol;
exports.isTypedArray = isTypedArray;
exports.isUndefined = isUndefined;
exports.isWeakMap = isWeakMap;
exports.isWeakSet = isWeakSet;
exports.join = join;
exports.kebabCase = kebabCase;
exports.keyBy = keyBy;
exports.last = last;
exports.lastIndexOf = lastIndexOf;
exports.lowerCase = lowerCase;
exports.lowerFirst = lowerFirst;
exports.lt = lt;
exports.lte = lte;
exports.map = map;
exports.max = max;
exports.maxBy = maxBy;
exports.mean = mean;
exports.meanBy = meanBy;
exports.min = min;
exports.minBy = minBy;
exports.multiply = multiply;
exports.now = now;
exports.nth = nth;
exports.orderBy = orderBy;
exports.padEnd = padEnd;
exports.padStart = padStart;
exports.parseInt = parseInt$1;
exports.partition = partition;
exports.pull = pull;
exports.pullAll = pullAll;
exports.pullAt = pullAt;
exports.random = random;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.reject = reject;
exports.remove = remove;
exports.repeat = repeat;
exports.replace = replace;
exports.reverse = reverse;
exports.round = round;
exports.sample = sample;
exports.sampleSize = sampleSize;
exports.shuffle = shuffle;
exports.size = size;
exports.slice = slice;
exports.snakeCase = snakeCase;
exports.some = some;
exports.sortedIndex = sortedIndex;
exports.sortedUniq = sortedUniq;
exports.sortedUniqBy = sortedUniqBy;
exports.split = split;
exports.startCase = startCase;
exports.startsWith = startsWith;
exports.subtract = subtract;
exports.sum = sum;
exports.sumBy = sumBy;
exports.tail = tail;
exports.take = take;
exports.takeRight = takeRight;
exports.takeRightWhile = takeRightWhile;
exports.takeWhile = takeWhile;
exports.toLower = toLower;
exports.toPairs = toPairs;
exports.toUpper = toUpper;
exports.trim = trim;
exports.trimEnd = trimEnd;
exports.trimStart = trimStart;
exports.union = union;
exports.uniq = uniq;
exports.unzip = unzip;
exports.unzipWith = unzipWith;
exports.upperCase = upperCase;
exports.upperFirst = upperFirst;
exports.without = without;
exports.zip = zip;
exports.zipObject = zipObject;
//# sourceMappingURL=alt-lodash.cjs.development.js.map
