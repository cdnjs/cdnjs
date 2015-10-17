(function() {

  'use strict';

  var root = this;
  var previos_async = root && root.async;
  var noop = function() {};

  var objectTypes = {
    'function': true,
    'object': true
  };

  var _nextTick;
  var _safeNextTick;
  var _setImmediate;
  createImmediate();

  /**
   * @version 1.1.2
   * @namespace async
   */
  var async = {
    VERSION: '1.1.2',

    // Collections
    each: each,
    eachSeries: eachSeries,
    eachLimit: eachLimit,
    forEach: each,
    forEachSeries: eachSeries,
    forEachLimit: eachLimit,
    map: map,
    mapSeries: mapSeries,
    mapLimit: mapLimit,
    mapValues: mapValues,
    mapValuesSeries: mapValuesSeries,
    mapValuesLimit: mapValuesLimit,
    filter: filter,
    filterSeries: filterSeries,
    filterLimit: filterLimit,
    select: filter,
    selectSeries: filterSeries,
    selectLimit: filterLimit,
    reject: reject,
    rejectSeries: rejectSeries,
    rejectLimit: rejectLimit,
    detect: detect,
    detectSeries: detectSeries,
    detectLimit: detectLimit,
    pick: pick,
    pickSeries: pickSeries,
    pickLimit: pickLimit,
    reduce: reduce,
    inject: reduce,
    foldl: reduce,
    reduceRight: reduceRight,
    foldr: reduceRight,
    transform: transform,
    transformSeries: transformSeries,
    transformLimit: transformLimit,
    sortBy: createSortBy(),
    sortBySeries: createSortBy('series'),
    sortByLimit: createSortBy('limit'),
    some: some,
    someSeries: someSeries,
    someLimit: someLimit,
    any: some,
    every: every,
    all: every,
    everySeries: everySeries,
    everyLimit: everyLimit,
    concat: concat,
    concatSeries: concatSeries,
    concatLimit: concatLimit,

    // Control Flow
    parallel: parallel,
    series: series,
    parallelLimit: parallelLimit,
    waterfall: waterfall,
    whilst: whilst,
    doWhilst: doWhilst,
    until: until,
    doUntil: doUntil,
    forever: forever,
    compose: compose,
    seq: seq,
    applyEach: createApplyEach(),
    applyEachSeries: createApplyEach('series'),
    queue: queue,
    priorityQueue: priorityQueue,
    cargo: cargo,
    auto: auto,
    retry: retry,
    iterator: iterator,
    apply: apply,
    nextTick: _nextTick,
    safeNextTick: _safeNextTick,
    setImmediate: _setImmediate,
    times: times,
    timesSeries: timesSeries,
    timesLimit: timesLimit,

    // Utils
    memoize: memoize,
    unmemoize: unmemoize,
    log: createLogger('log'),
    dir: createLogger('dir'),
    createLogger: createLogger,
    noConflict: noConflict,
    eventEmitter: eventEmitter,
    EventEmitter: EventEmitter,

    safe: undefined
  };

  async.safe = safe();

  if (objectTypes[typeof define] && define && define.amd) {
    // AMD / RequireJS
    define([], function() {
      return async;
    });
  } else if (objectTypes[typeof module] && module && module.exports) {
    // Node.js
    module.exports = async;
  } else if (root && objectTypes[typeof root.async]) {
    root.neo_async = async;
  } else {
    root.async = async;
  }

  // base on lodash
  /**
   * Converts `arguments` to an array.
   *
   * @private
   * @param {Array} array = The array to slice.
   */
  function _baseSlice(array) {
    var index = -1;
    var length = array.length;
    var result = Array(length);

    while (++index < length) {
      result[index] = array[index];
    }
    return result;
  }

  /**
   * Create an array from `start`
   *
   * @private
   * @param {Array} array - The array to slice.
   * @param {number} start - The start position.
   */
  function _slice(array, start) {
    var end = array.length;
    var index = -1;
    var size = end - start;
    if (size <= 0) {
      return [];
    }
    var result = Array(size);

    while (++index < size) {
      result[index] = array[index + start];
    }
    return result;
  }

  /**
   * Create an array with all falsey values removed.
   *
   * @private
   * @param {Array} array - The array to compact.
   */
  function _compact(array) {
    var index = -1;
    var length = array.length;
    var resIndex = -1;
    var result = [];

    while (++index < length) {
      var value = array[index];
      if (value) {
        result[++resIndex] = value;
      }
    }
    return result;
  }

  /**
   * Create an array of reverse sequence.
   *
   * @private
   * @param {Array} array - The array to reverse.
   */
  function _reverse(array) {
    var index = -1;
    var length = array.length;
    var result = Array(length);
    var resIndex = length;

    while (++index < length) {
      result[--resIndex] = array[index];
    }
    return result;
  }

  /**
   * Checks if key exists in object property.
   *
   * @private
   * @param {Object} object - The object to inspect.
   * @param {string} key - The key to check.
   */
  function _has(object, key) {
    return object.hasOwnProperty(key);
  }

  /**
   * @private
   * @param {Array} array - The array to iterate over.
   * @param {Function} iterator - The function invoked per iteration.
   */
  function _arrayEach(array, iterator) {
    var index = -1;
    var length = array.length;

    while (++index < length) {
      iterator(array[index], index);
    }
    return array;
  }

  /**
   * @private
   * @param {Array} array - The array to iterate over.
   * @param {Function} iterator - The function invoked per iteration.
   */
  function _arrayEachRight(array, iterator) {
    var length = array.length;

    while (length--) {
      iterator(array[length], length);
    }
    return array;
  }

  /**
   * @private
   * @param {Object} object - The object to iterate over.
   * @param {Function} iterator - The function invoked per iteration.
   * @param {Array} keys
   */
  function _objectEach(object, iterator, keys) {
    keys = keys || Object.keys(object);
    var index = -1;
    var length = keys.length;

    while (++index < length) {
      var key = keys[index];
      iterator(object[key], key);
    }
    return object;
  }

  /**
   * @private
   * @param {number} n
   * @param {Function} iterator
   */
  function _times(n, iterator) {
    var index = -1;
    while (++index < n) {
      iterator(index);
    }
  }

  /**
   * @private
   * @param {Array} array
   * @param {Function} iterator
   */
  function _arrayEvery(array, iterator) {
    var length = array.length;
    var index = -1;

    while (++index < length) {
      if (!iterator(array[index])) {
        return false;
      }
    }
    return true;
  }

  /**
   * @private
   * @param {Array} array
   */
  function _arrayClone(array) {
    var length = array.length;
    var index = -1;
    var result = Array(length);

    while (++index < length) {
      result[index] = array[index];
    }
    return result;
  }

  /**
   * @private
   * @param {Object} object
   */
  function _objectClone(object) {
    var keys = Object.keys(object);
    var length = keys.length;
    var index = -1;
    var result = {};

    while (++index < length) {
      var key = keys[index];
      result[key] = object[key];
    }
    return result;
  }

  /**
   * @private
   * @param {Array} array
   * @param {string} key
   */
  function _pluck(array, key) {
    var index = -1;
    var length = array.length;
    var result = Array(length);

    while (++index < length) {
      var item = array[index] || {};
      result[index] = item[key];
    }
    return result;
  }

  /**
   * @private
   * @param {Array} array
   * @param {*} value
   */
  function _indexOf(array, value) {
    var index = -1;
    var length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
  }

  /**
   * @private
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} thisArg
   * @param {boolean} bool
   */
  function _commonFilter(collection, iterator, callback, thisArg, bool) {
    callback = callback || noop;
    var size, result;
    var started = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    var enableError = callback.length === 2;
    var createCallback = enableError ? createFilterCallbackWithError : createFilterCallback;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return enableError ? callback(undefined, []) : callback([]);
      }
      result = Array(size);
      _arrayEach(collection, iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return enableError ? callback(undefined, []) : callback([]);
      }
      result = Array(size);
      _objectEach(collection, iterator.length === 3 ? objectIteratorWithKey : objectIterator, keys);
    } else {
      return enableError ? callback(undefined, []) : callback([]);
    }

    function arrayIterator(value, index) {
      _iterator(value, createCallback(index, value));
    }

    function arrayIteratorWithIndex(value, index) {
      _iterator(value, index, createCallback(index, value));
    }

    function objectIterator(value) {
      _iterator(value, createCallback(started++, value));
    }

    function objectIteratorWithKey(value, key) {
      _iterator(value, key, createCallback(started++, value));
    }

    function createFilterCallback(index, value) {
      var called = false;
      return function done(res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (!!res === bool) {
          result[index] = value;
        }
        if (--size === 0) {
          callback(_compact(result));
        }
      };
    }

    function createFilterCallbackWithError(index, value) {
      var called = false;
      return function done(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (err) {
          callback(err, _compact(result));
          callback = noop;
          return;
        }
        if (!!res === bool) {
          result[index] = value;
        }
        if (--size === 0) {
          callback(undefined, _compact(result));
        }
      };
    }
  }

  /**
   * @private
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} thisArg
   * @param {boolean} bool
   */
  function _commonFilterSeries(collection, iterator, callback, thisArg, bool) {
    callback = callback || noop;
    var size, key, value, keys, iterate, result, called;
    var completed = 0;
    var resultCount = -1;
    var enableError = callback.length === 2;
    var done = enableError ? filterCallbackWithError : filterCallback;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return enableError ? callback(undefined, []) : callback([]);
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return enableError ? callback(undefined, []) : callback([]);
      }
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return enableError ? callback(undefined, []) : callback([]);
    }
    result = Array(size);
    iterate();

    function arrayIterator() {
      called = false;
      value = collection[completed];
      _iterator(value, done);
    }

    function arrayIteratorWithIndex() {
      called = false;
      value = collection[completed];
      _iterator(value, completed, done);
    }

    function objectIterator() {
      called = false;
      key = keys[completed];
      value = collection[key];
      _iterator(value, done);
    }

    function objectIteratorWithKey() {
      called = false;
      key = keys[completed];
      value = collection[key];
      _iterator(value, key, done);
    }

    function filterCallback(res) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;

      if (!!res === bool) {
        result[++resultCount] = value;
      }
      if (++completed === size) {
        return callback(_compact(result));
      }
      iterate();
    }

    function filterCallbackWithError(err, res) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;

      if (err) {
        callback(err, _compact(result));
        callback = noop;
        return;
      }
      if (!!res === bool) {
        result[++resultCount] = value;
      }
      if (++completed === size) {
        return callback(undefined, _compact(result));
      }
      iterate();
    }
  }

  /**
   * @private
   */
  function createImmediate() {
    if (!objectTypes[typeof process] || !process.nextTick) {
      if (objectTypes[typeof setImmediate]) {
        _nextTick = setImmediate;
      } else {
        _nextTick = function(func) {
          setTimeout(func, 0);
        };
      }
      _setImmediate = _nextTick;
      _safeNextTick = _safeNextTick;
    } else {
      _nextTick = process.nextTick;
      if (objectTypes[typeof setImmediate]) {
        _setImmediate = setImmediate;
      } else {
        _setImmediate = _nextTick;
      }
      _safeNextTick = /^v0.10/.test(process.version) ? setImmediate : _nextTick;
    }
  }

  /**
   * @private
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   */
  function _commonFilterLimit(collection, limit, iterator, callback, thisArg, bool) {
    callback = callback || noop;
    var enableError = callback.length === 2;
    if (isNaN(limit) || limit < 1) {
      return enableError ? callback(undefined, []) : callback([]);
    }

    var size, keys, iterate, result;
    var started = 0;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    var createCallback = enableError ? filterCallbackWithError : filterCallback;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return enableError ? callback(undefined, []) : callback([]);
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return enableError ? callback(undefined, []) : callback([]);
      }
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return enableError ? callback(undefined, []) : callback([]);
    }

    result = Array(size);
    _times(limit > size ? size : limit, iterate);

    function arrayIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var value = collection[index];
      _iterator(value, createCallback(value, index));
    }

    function arrayIteratorWithIndex() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var value = collection[index];
      _iterator(value, index, createCallback(value, index));
    }

    function objectIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var value = collection[keys[index]];
      _iterator(value, createCallback(value, index));
    }

    function objectIteratorWithKey() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var key = keys[index];
      var value = collection[key];
      _iterator(value, key, createCallback(value, index));
    }

    function filterCallback(value, index) {
      var called = false;
      return function(res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (!!res === bool) {
          result[index] = value;
        }
        if (++completed === size) {
          callback(_compact(result));
        }
        iterate();
      };
    }

    function filterCallbackWithError(value, index) {
      var called = false;
      return function(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (err) {
          callback(err, _compact(result));
          callback = noop;
          return;
        }
        if (!!res === bool) {
          result[index] = value;
        }
        if (++completed === size) {
          return callback(undefined, _compact(result));
        }
        iterate();
      };
    }
  }

  /**
   * @private
   * @param {Function} func
   */
  function once(func) {
    var called = false;
    return function(err, res) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;
      func(err, res);
    };
  }

  /**
   * @memberof async
   * @namespace safe
   */
  function safe() {
    // ['index', 'bindIndex']
    var safeIteratorMap = {
      each: [1, 3],
      eachSeries: [1, 3],
      eachLimit: [2, 4],
      forEach: [1, 3],
      forEachSeries: [1, 3],
      forEachLimit: [2, 4],
      map: [1, 3],
      mapSeries: [1, 3],
      mapLimit: [2, 4],
      mapValues: [1, 3],
      mapValuesSeries: [1, 3],
      mapValuesLimit: [2, 4],
      filter: [1, 3],
      filterSeries: [1, 3],
      filterLimit: [2, 4],
      select: [1, 3],
      selectSeries: [1, 3],
      selectLimit: [2, 4],
      reject: [1, 3],
      rejectSeries: [1, 3],
      rejectLimit: [2, 4],
      detect: [1, 3],
      detectSeries: [1, 3],
      detectLimit: [2, 4],
      pick: [1, 3],
      pickSeries: [1, 3],
      pickLimit: [2, 4],
      reduce: [2, 4],
      inject: [2, 4],
      foldl: [2, 4],
      reduceRight: [2, 4],
      foldr: [2, 4],
      transform: [1, 4],
      transformSeries: [1, 4],
      transformLimit: [2, 5],
      sortBy: [1, 3],
      sortBySeries: [1, 3],
      sortByLimit: [2, 4],
      some: [1, 3],
      someSeries: [1, 3],
      someLimit: [2, 4],
      any: [1, 3],
      every: [1, 3],
      all: [1, 3],
      everySeries: [1, 3],
      everyLimit: [2, 4],
      concat: [1, 3],
      concatSeries: [1, 3],
      concatLimit: [2, 4],
      whilst: [1, 3],
      doWhilst: [0, 3],
      until: [1, 3],
      doUntil: [0, 3],
      forever: [0, 2],
      times: [1, 3],
      timesSeries: [1, 3],
      timesLimit: [2, 4]
    };
    var safeTaskMap = {
      parallel: [0, 2],
      series: [0, 2],
      parallelLimit: [0, 3],
      waterfall: [0, -1],
      auto: [0, -1]
    };

    var safeAsync = {};
    _objectEach(async, function(func, key) {
      if (typeof func !== 'function') {
        safeAsync[key] = func;
        return;
      }

      // iterator
      if (safeIteratorMap[key]) {
        return createSafeIterator(func, key);
      }

      // tasks
      if (safeTaskMap[key]) {
        return createSafeTasks(func, key);
      }

      // not avaiable safe fucntion
      safeAsync[key] = func;
    });
    safeAsync.safe = safe;
    return safeAsync;

    function createSafeIterator(func, key) {
      var data = safeIteratorMap[key];
      var index = data[0];
      var bindIndex = data[1];
      var funcLength = func.length;
      safeAsync[key] = safeCollection;

      function safeCollection() {
        var items = _baseSlice(arguments);
        var iterator = items[index];
        var thisArg = items[bindIndex];
        switch (iterator.length) {
          case 1:
            items[index] = function(done) {
              async.safeNextTick(function() {
                iterator.call(thisArg, done);
              });
            };
            break;
          case 2:
            items[index] = function(arg1, done) {
              async.safeNextTick(function() {
                iterator.call(thisArg, arg1, done);
              });
            };
            break;
          case 3:
            items[index] = function(arg1, arg2, done) {
              async.safeNextTick(function() {
                iterator.call(thisArg, arg1, arg2, done);
              });
            };
            break;
          case 4:
            items[index] = function(arg1, arg2, arg3, done) {
              async.safeNextTick(function() {
                iterator.call(thisArg, arg1, arg2, arg3, done);
              });
            };
            break;
          default:
            items[index] = function() {
              var args = _baseSlice(arguments);
              async.safeNextTick(function() {
                iterator.apply(thisArg, args);
              });
            };
            break;
        }

        switch (funcLength) {
          case 3:
            func(items[0], items[1], items[2]);
            break;
          case 4:
            func(items[0], items[1], items[2], items[3]);
            break;
          case 5:
            func(items[0], items[1], items[2], items[3], items[4]);
            break;
          case 6:
            func(items[0], items[1], items[2], items[3], items[4], items[5]);
            break;
        }
      }
    }

    function createSafeTasks(func, key) {
      var data = safeTaskMap[key];
      var index = data[0];
      var bindIndex = data[1];
      if (/^waterfall$/.test(key)) {
        safeAsync[key] = safeWaterfall;
        return;
      }
      var funcLength = func.length;
      safeAsync[key] = safeTasks;

      function safeTasks() {
        var items = _baseSlice(arguments);
        var tasks = items[index];
        var thisArg = items[bindIndex];
        if (Array.isArray(tasks)) {
          _arrayEach(tasks, function(task, index) {
            tasks[index] = createSafeFunction(task);
          });
        } else if (tasks && typeof tasks === 'object') {
          _objectEach(tasks, function(task, key) {
            tasks[key] = createSafeFunction(task);
          });
        }
        switch (funcLength) {
          case 2:
            func(items[0], items[1]);
            break;
          case 3:
            func(items[0], items[1], items[2]);
            break;
          case 4:
            func(items[0], items[1], items[2], items[3]);
            break;
        }

        function createSafeFunction(task) {
          if (typeof task !== 'function') {
            return task;
          }
          return function safeFuncion() {
            var args = _baseSlice(arguments);
            async.safeNextTick(function() {
              task.apply(thisArg, args);
            });
          };
        }
      }
    }
  }

  /**
   * @memberof async
   * @namespace each
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done();
   *   }, num * 10);
   * };
   * async.each(array, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done();
   *   }, num * 10);
   * };
   * async.each(array, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [[1, 0], [2, 2], [3, 1]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done();
   *   }, num * 10);
   * };
   * async.each(object, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done();
   *   }, num * 10);
   * };
   * async.each(object, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [[1, 'a'], [2, 'c'], [3, 'b']]
   * });
   *
   */
  function each(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    var size;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback();
      }
      _arrayEach(collection, iterator.length === 3 ? collectionIteratorWithKey : collectionIterator);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback();
      }
      _objectEach(collection, iterator.length === 3 ? collectionIteratorWithKey : collectionIterator);
    } else {
      callback();
    }

    function collectionIterator(value) {
      _iterator(value, once(done));
    }

    function collectionIteratorWithKey(value, key) {
      _iterator(value, key, once(done));
    }

    function done(err, bool) {
      if (err) {
        callback(err);
        callback = noop;
        return;
      }
      if (++completed === size) {
        callback();
        callback = noop;
        return;
      }
      if (bool === false) {
        callback();
        callback = noop;
      }
    }
  }

  /**
   * @memberof async
   * @namespace eachSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done();
   *   }, num * 10);
   * };
   * async.eachSeries(array, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done();
   *   }, num * 10);
   * };
   * async.eachSeries(array, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [[1, 0], [3, 1], [2, 2]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done();
   *   }, num * 10);
   * };
   * async.eachSeries(object, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done();
   *   }, num * 10);
   * };
   * async.eachSeries(object, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'b']]
   * });
   *
   */
  function eachSeries(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    var size, keys, iterate, called;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback();
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback();
      }
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback();
    }

    iterate();

    function arrayIterator() {
      called = false;
      _iterator(collection[completed], done);
    }

    function arrayIteratorWithIndex() {
      called = false;
      _iterator(collection[completed], completed, done);
    }

    function objectIterator() {
      called = false;
      _iterator(collection[keys[completed]], done);
    }

    function objectIteratorWithKey() {
      called = false;
      var key = keys[completed];
      _iterator(collection[key], key, done);
    }

    function done(err, bool) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;
      if (err) {
        return callback(err);
      }
      if (++completed === size) {
        return callback();
      }
      if (bool === false) {
        return callback();
      }
      iterate();
    }
  }

  /**
   * @memberof async
   * @namespace eachLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done();
   *   }, num * 10);
   * };
   * async.eachLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done();
   *   }, num * 10);
   * };
   * async.eachLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4], [4, 3]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done();
   *   }, num * 10);
   * };
   * async.eachLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done();
   *   }, num * 10);
   * };
   * async.eachLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e'], [4, 'd']]
   * });
   *
   */
  function eachLimit(collection, limit, iterator, callback, thisArg) {
    callback = callback || noop;
    if (isNaN(limit) || limit < 1) {
      return callback();
    }
    var size, keys, iterate;
    var started = 0;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback();
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback();
      }
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback();
    }

    _times(limit > size ? size : limit, iterate);

    function arrayIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(collection[index], once(done));
    }

    function arrayIteratorWithIndex() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(collection[index], index, once(done));
    }

    function objectIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(collection[keys[index]], once(done));
    }

    function objectIteratorWithKey() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var key = keys[index];
      _iterator(collection[key], key, once(done));
    }

    function done(err, bool) {
      if (err) {
        callback(err);
        callback = noop;
        return;
      }
      if (++completed === size) {
        callback();
        callback = noop;
        return;
      }
      if (bool === false) {
        callback();
        callback = noop;
        return;
      }
      iterate();
    }
  }

  /**
   * @memberof async
   * @namespace map
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.map(array, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2];
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.map(array, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2]
   *   console.log(order); // [[1, 0], [2, 2], [3, 1]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.map(object, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2]
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.map(object, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2]
   *   console.log(order); // [[1, 'a'], [2, 'c'], [3, 'b']]
   * });
   *
   */
  function map(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    var size, result;
    var started = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback(undefined, []);
      }
      result = Array(size);
      _arrayEach(collection, iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, []);
      }
      result = Array(size);
      _objectEach(collection, iterator.length === 3 ? objectIteratorWithKey : objectIterator, keys);
    } else {
      callback(undefined, []);
    }

    function arrayIterator(value, index) {
      _iterator(value, createCallback(index));
    }

    function arrayIteratorWithIndex(value, index) {
      _iterator(value, index, createCallback(index));
    }

    function objectIterator(value) {
      _iterator(value, createCallback(started++));
    }

    function objectIteratorWithKey(value, key) {
      _iterator(value, key, createCallback(started++));
    }

    function createCallback(index) {
      var called = false;
      return function done(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;
        result[index] = res;

        if (err) {
          callback(err, _arrayClone(result));
          callback = noop;
          return;
        }
        if (--size === 0) {
          callback(undefined, result);
          callback = noop;
          return;
        }
      };
    }
  }

  /**
   * @memberof async
   * @namespace mapSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapSeries(array, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2];
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapSeries(array, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2]
   *   console.log(order); // [[1, 0], [3, 1], [2, 2]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapSeries(object, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2]
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapSeries(object, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2]
   *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'c']]
   * });
   *
   */
  function mapSeries(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    var size, keys, result, iterate, called;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback(undefined, []);
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, []);
      }
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback(undefined, []);
    }

    result = Array(size);
    iterate();

    function arrayIterator() {
      called = false;
      _iterator(collection[completed], done);
    }

    function arrayIteratorWithIndex() {
      called = false;
      _iterator(collection[completed], completed, done);
    }

    function objectIterator() {
      called = false;
      _iterator(collection[keys[completed]], done);
    }

    function objectIteratorWithKey() {
      called = false;
      var key = keys[completed];
      _iterator(collection[key], key, done);
    }

    function done(err, res) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;
      result[completed] = res;

      if (err) {
        callback(err, _arrayClone(result));
        callback = noop;
        return;
      }
      if (++completed === size) {
        callback(undefined, result);
        callback = noop;
        return;
      }
      iterate();
    }
  }

  /**
   * @memberof async
   * @namespace mapLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 5, 3, 4, 2]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 5, 3, 4, 2]
   *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4], [4, 3]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 5, 3, 4, 2]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 5, 3, 4, 2]
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e'], [4, 'd']]
   * });
   *
   */
  function mapLimit(collection, limit, iterator, callback, thisArg) {
    callback = callback || noop;
    if (isNaN(limit) || limit < 1) {
      return callback(undefined, []);
    }
    var size, keys, result, iterate;
    var started = 0;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback(undefined, []);
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, []);
      }
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback(undefined, []);
    }

    result = Array(size);
    _times(limit > size ? size : limit, iterate);

    function arrayIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(collection[index], createCallback(index));
    }

    function arrayIteratorWithIndex() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(collection[index], index, createCallback(index));
    }

    function objectIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(collection[keys[index]], createCallback(index));
    }

    function objectIteratorWithKey() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var key = keys[index];
      _iterator(collection[key], key, createCallback(index));
    }

    function createCallback(index) {
      var called = false;
      return function(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;
        result[index] = res;

        if (err) {
          callback(err, _arrayClone(result));
          callback = noop;
          return;
        }
        if (++completed === size) {
          callback(undefined, result);
          callback = noop;
          return;
        }
        iterate();
      };
    }
  }

  /**
   * @memberof async
   * @namespace mapValues
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapValues(array, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 3, '2': 2 }
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapValues(array, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 3, '2': 2 }
   *   console.log(order); // [[1, 0], [2, 2], [3, 1]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapValues(object, iterator, function(err, res) {
   *   console.log(res); // { a: 1, b: 3, c: 2 }
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapValues(object, iterator, function(err, res) {
   *   console.log(res); // { a: 1, b: 3, c: 2 }
   *   console.log(order); // [[1, 'a'], [2, 'c'], [3, 'b']]
   * });
   *
   */
  function mapValues(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    var size;
    var result = {};
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      _arrayEach(collection, iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      _objectEach(collection, iterator.length === 3 ? objectIteratorWithKey : objectIterator, keys);
    } else {
      callback(undefined, result);
    }

    function arrayIterator(value, index) {
      _iterator(value, createCallback(index));
    }

    function arrayIteratorWithIndex(value, index) {
      _iterator(value, index, createCallback(index));
    }

    function objectIterator(value, key) {
      _iterator(value, createCallback(key));
    }

    function objectIteratorWithKey(value, key) {
      _iterator(value, key, createCallback(key));
    }

    function createCallback(key) {
      var called = false;
      return function(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;
        result[key] = res;

        if (err) {
          callback(err, _objectClone(result));
          callback = noop;
          return;
        }
        if (--size === 0) {
          callback(undefined, result);
          callback = noop;
          return;
        }
      };
    }
  }

  /**
   * @memberof async
   * @namespace mapValuesSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapValuesSeries(array, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 3, '2': 2 }
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapValuesSeries(array, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 3, '2': 2 }
   *   console.log(order); // [[1, 0], [3, 1], [2, 2]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapValuesSeries(object, iterator, function(err, res) {
   *   console.log(res); // { a: 1, b: 3, c: 2 }
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapValuesSeries(object, iterator, function(err, res) {
   *   console.log(res); // { a: 1, b: 3, c: 2 }
   *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'c']]
   * });
   *
   */
  function mapValuesSeries(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    var size, key, keys, iterate, called;
    var result = {};
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback(undefined, {});
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, {});
      }
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback(undefined, {});
    }

    iterate();

    function arrayIterator() {
      called = false;
      key = completed;
      _iterator(collection[completed], done);
    }

    function arrayIteratorWithIndex() {
      called = false;
      key = completed;
      _iterator(collection[completed], completed, done);
    }

    function objectIterator() {
      called = false;
      key = keys[completed];
      _iterator(collection[key], done);
    }

    function objectIteratorWithKey() {
      called = false;
      key = keys[completed];
      _iterator(collection[key], key, done);
    }

    function done(err, res) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;
      result[key] = res;

      if (err) {
        callback(err, _objectClone(result));
        callback = noop;
        return;
      }
      if (++completed === size) {
        callback(undefined, result);
        callback = noop;
        return;
      }
      iterate();
    }
  }

  /**
   * @memberof async
   * @namespace mapValuesLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapValuesLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 5, '2': 3, '3': 4, '4': 2 }
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapValuesLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 5, '2': 3, '3': 4, '4': 2 }
   *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4], [4, 3]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapValuesLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // { a: 1, b: 5, c: 3, d: 4, e: 2 }
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.mapValuesLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // { a: 1, b: 5, c: 3, d: 4, e: 2 }
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e'], [4, 'd']]
   * });
   *
   */
  function mapValuesLimit(collection, limit, iterator, callback, thisArg) {
    callback = callback || noop;
    if (isNaN(limit) || limit < 1) {
      return callback(undefined, []);
    }

    var size, keys, iterate;
    var result = {};
    var started = 0;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback(undefined, result);
    }

    _times(limit > size ? size : limit, iterate);

    function arrayIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(collection[index], createCallback(index));
    }

    function arrayIteratorWithIndex() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(collection[index], index, createCallback(index));
    }

    function objectIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var key = keys[index];
      _iterator(collection[key], createCallback(key));
    }

    function objectIteratorWithKey() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var key = keys[index];
      _iterator(collection[key], key, createCallback(key));
    }

    function createCallback(key) {
      var called = false;
      return function(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;
        result[key] = res;

        if (err) {
          callback(err, _objectClone(result));
          callback = noop;
          return;
        }
        if (++completed === size) {
          callback(undefined, result);
          callback = noop;
          return;
        }
        iterate();
      };
    }
  }

  /**
   * @memberof async
   * @namespace filter
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.filter(array, iterator, function(err, res) {
   *   console.log(res); // [1, 3];
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.filter(array, iterator, function(err, res) {
   *   console.log(res); // [1, 3];
   *   console.log(order); // [[1, 0], [2, 2], [3, 1]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.filter(array, iterator, function(res) {
   *   console.log(res); // [1, 3];
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.filter(array, iterator, function(res) {
   *   console.log(res); // [1, 3];
   *   console.log(order); // [[1, 0], [2, 2], [3, 1]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.filter(object, iterator, function(err, res) {
   *   console.log(res); // [1, 3];
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.filter(object, iterator, function(err, res) {
   *   console.log(res); // [1, 3];
   *   console.log(order); // [[1, 'a'], [2, 'c'], [3, 'b']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.filter(object, iterator, function(res) {
   *   console.log(res); // [1, 3];
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.filter(object, iterator, function(res) {
   *   console.log(res); // [1, 3];
   *   console.log(order); // [[1, 'a'], [2, 'c'], [3, 'b']]
   * });
   *
   */
  function filter(collection, iterator, callback, thisArg) {
    _commonFilter(collection, iterator, callback, thisArg, true);
  }

  /**
   * @memberof async
   * @namespace filterSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.filterSeries(array, iterator, function(err, res) {
   *   console.log(res); // [1, 3];
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.filterSeries(array, iterator, function(err, res) {
   *   console.log(res); // [1, 3]
   *   console.log(order); // [[1, 0], [3, 1], [2, 2]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.filterSeries(array, iterator, function(res) {
   *   console.log(res); // [1, 3];
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.filterSeries(array, iterator, function(res) {
   *   console.log(res); // [1, 3]
   *   console.log(order); // [[1, 0], [3, 1], [2, 2]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.filterSeries(object, iterator, function(err, res) {
   *   console.log(res); // [1, 3]
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.filterSeries(object, iterator, function(err, res) {
   *   console.log(res); // [1, 3]
   *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'c']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.filterSeries(object, iterator, function(res) {
   *   console.log(res); // [1, 3]
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.filterSeries(object, iterator, function(res) {
   *   console.log(res); // [1, 3]
   *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'c']]
   * });
   *
   */
  function filterSeries(collection, iterator, callback, thisArg) {
    _commonFilterSeries(collection, iterator, callback, thisArg, true);
  }

  /**
   * @memberof async
   * @namespace filterLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.filterLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 5, 3]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.filterLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 5, 3]
   *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4], [4, 3]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.filterLimit(array, 2, iterator, function(res) {
   *   console.log(res); // [1, 5, 3]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.filterLimit(array, 2, iterator, function(res) {
   *   console.log(res); // [1, 5, 3]
   *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4], [4, 3]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.filterLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 5, 3]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.filterLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 5, 3]
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e'], [4, 'd']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.filterLimit(object, 2, iterator, function(res) {
   *   console.log(res); // [1, 5, 3]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.filterLimit(object, 2, iterator, function(res) {
   *   console.log(res); // [1, 5, 3]
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e'], [4, 'd']]
   * });
   *
   */
  function filterLimit(collection, limit, iterator, callback, thisArg) {
    _commonFilterLimit(collection, limit, iterator, callback, thisArg, true);
  }

  /**
   * @memberof async
   * @namespace reject
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.reject(array, iterator, function(err, res) {
   *   console.log(res); // [2];
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.reject(array, iterator, function(err, res) {
   *   console.log(res); // [2];
   *   console.log(order); // [[1, 0], [2, 2], [3, 1]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.reject(array, iterator, function(res) {
   *   console.log(res); // [2];
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.reject(array, iterator, function(res) {
   *   console.log(res); // [2];
   *   console.log(order); // [[1, 0], [2, 2], [3, 1]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.reject(object, iterator, function(err, res) {
   *   console.log(res); // [2];
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.reject(object, iterator, function(err, res) {
   *   console.log(res); // [2];
   *   console.log(order); // [[1, 'a'], [2, 'c'], [3, 'b']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.reject(object, iterator, function(res) {
   *   console.log(res); // [2];
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.reject(object, iterator, function(res) {
   *   console.log(res); // [2];
   *   console.log(order); // [[1, 'a'], [2, 'c'], [3, 'b']]
   * });
   *
   */
  function reject(collection, iterator, callback, thisArg) {
    _commonFilter(collection, iterator, callback, thisArg, false);
  }

  /**
   * @memberof async
   * @namespace rejectSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.rejectSeries(array, iterator, function(err, res) {
   *   console.log(res); // [2];
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.rejectSeries(array, iterator, function(res) {
   *   console.log(res); // [2];
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.rejectSeries(array, iterator, function(res) {
   *   console.log(res); // [2];
   *   console.log(order); // [[1, 0], [3, 1], [2, 2]]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.rejectSeries(array, iterator, function(res) {
   *   console.log(res); // [2];
   *   console.log(order); // [[1, 0], [3, 1], [2, 2]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.rejectSeries(object, iterator, function(err, res) {
   *   console.log(res); // [2];
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.rejectSeries(object, iterator, function(err, res) {
   *   console.log(res); // [2];
   *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'c']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.rejectSeries(object, iterator, function(res) {
   *   console.log(res); // [2];
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.rejectSeries(object, iterator, function(res) {
   *   console.log(res); // [2];
   *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'c']]
   * });
   *
   */
  function rejectSeries(collection, iterator, callback, thisArg) {
    _commonFilterSeries(collection, iterator, callback, thisArg, false);
  }

  /**
   * @memberof async
   * @namespace rejectLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.rejectLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // [4, 2]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.rejectLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // [4, 2]
   *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4], [4, 3]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.rejectLimit(array, 2, iterator, function(res) {
   *   console.log(res); // [4, 2]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.rejectLimit(array, 2, iterator, function(res) {
   *   console.log(res); // [4, 2]
   *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4], [4, 3]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.rejectLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // [4, 2]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.rejectLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // [4, 2]
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e'], [4, 'd']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.rejectLimit(object, 2, iterator, function(res) {
   *   console.log(res); // [4, 2]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.rejectLimit(object, 2, iterator, function(res) {
   *   console.log(res); // [4, 2]
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e'], [4, 'd']]
   * });
   *
   */
  function rejectLimit(collection, limit, iterator, callback, thisArg) {
    _commonFilterLimit(collection, limit, iterator, callback, thisArg, false);
  }

  /**
   * @memberof async
   * @namespace detect
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @param {boolean} [opposite] - for `async.every`
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.detect(array, iterator, function(err, res) {
   *   console.log(res); // 1
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.detect(array, iterator, function(err, res) {
   *   console.log(res); // 1
   *   console.log(order); // [[1, 0]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.detect(array, iterator, function(res) {
   *   console.log(res); // 1
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.detect(array, iterator, function(res) {
   *   console.log(res); // 1
   *   console.log(order); // [[1, 0]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.detect(object, iterator, function(err, res) {
   *   console.log(res); // 1
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.detect(object, iterator, function(err, res) {
   *   console.log(res); // 1
   *   console.log(order); // [[1, 'a']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.detect(object, iterator, function(res) {
   *   console.log(res); // 1
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.detect(object, iterator, function(res) {
   *   console.log(res); // 1
   *   console.log(order); // [[1, 'a']]
   * });
   *
   */
  function detect(collection, iterator, callback, thisArg, opposite) {
    callback = callback || noop;
    var size;
    var bool = !opposite;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    var enableError = callback.length === 2;
    var createCallback = enableError ? createCollectionCallbackWithError : createCollectionCallback;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback();
      }
      _arrayEach(collection, iterator.length === 3 ? collectionIteratorWithKey : collectionIterator);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback();
      }
      _objectEach(collection, iterator.length === 3 ? collectionIteratorWithKey : collectionIterator, keys);
    } else {
      callback();
    }

    function collectionIterator(value) {
      _iterator(value, createCallback(value));
    }

    function collectionIteratorWithKey(value, key) {
      _iterator(value, key, createCallback(value));
    }

    function createCollectionCallback(value) {
      var called = false;
      return function done(res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (!!res === bool) {
          callback(value);
          callback = noop;
          return;
        }
        if (--size === 0) {
          callback();
          callback = noop;
        }
      };
    }

    function createCollectionCallbackWithError(value) {
      var called = false;
      return function done(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (err) {
          callback(err);
          callback = noop;
          return;
        }
        if (!!res === bool) {
          callback(undefined, value);
          callback = noop;
          return;
        }
        if (--size === 0) {
          callback();
          callback = noop;
        }
      };
    }
  }

  /**
   * @memberof async
   * @namespace detectSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @param {boolean} [opposite] - for `async.everySeries`
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.detectSeries(array, iterator, function(err, res) {
   *   console.log(res); // 1
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.detectSeries(array, iterator, function(err, res) {
   *   console.log(res); // 1
   *   console.log(order); // [[1, 0]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.detectSeries(array, iterator, function(res) {
   *   console.log(res); // 1
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.detectSeries(array, iterator, function(res) {
   *   console.log(res); // 1
   *   console.log(order); // [[1, 0]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.detectSeries(object, iterator, function(err, res) {
   *   console.log(res); // 1
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.detectSeries(object, iterator, function(err, res) {
   *   console.log(res); // 1
   *   console.log(order); // [[1, 'a']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.detectSeries(object, iterator, function(res) {
   *   console.log(res); // 1
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.detectSeries(object, iterator, function(res) {
   *   console.log(res); // 1
   *   console.log(order); // [[1, 'a']]
   * });
   *
   */
  function detectSeries(collection, iterator, callback, thisArg, opposite) {
    callback = callback || noop;
    var size, value, iterate, called;
    var completed = 0;
    var bool = !opposite;
    var done = callback.length === 2 ? detectCallbackWithError : detectCallback;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback();
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback();
      }
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback();
    }

    iterate();

    function arrayIterator() {
      called = false;
      value = collection[completed];
      _iterator(value, done);
    }

    function arrayIteratorWithIndex() {
      called = false;
      value = collection[completed];
      _iterator(value, completed, done);
    }

    function objectIterator() {
      called = false;
      value = collection[keys[completed]];
      _iterator(value, done);
    }

    function objectIteratorWithKey() {
      called = false;
      var key = keys[completed];
      value = collection[key];
      _iterator(value, key, done);
    }

    function detectCallback(res) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;
      if (!!res === bool) {
        return callback(value);
      }
      if (++completed === size) {
        return callback();
      }
      iterate();
    }

    function detectCallbackWithError(err, res) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;
      if (err) {
        return callback(err);
      }
      if (!!res === bool) {
        return callback(undefined, value);
      }
      if (++completed === size) {
        return callback();
      }
      iterate();
    }
  }

  /**
   * @memberof async
   * @namespace detectLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @param {boolean} [opposite] - for `async.everyLimit`
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.detectLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // 1
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.detectLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // 1
   *   console.log(order); // [[1, 0]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.detectLimit(array, 2, iterator, function(res) {
   *   console.log(res); // 1
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.detectLimit(array, 2, iterator, function(res) {
   *   console.log(res); // 1
   *   console.log(order); // [[1, 0]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.detectLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // 1
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.detectLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // 1
   *   console.log(order); // [[1, 'a']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.detectLimit(object, 2, iterator, function(res) {
   *   console.log(res); // 1
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.detectLimit(object, 2, iterator, function(res) {
   *   console.log(res); // 1
   *   console.log(order); // [[1, 'a']]
   * });
   *
   */
  function detectLimit(collection, limit, iterator, callback, thisArg, opposite) {
    callback = callback || noop;
    if (isNaN(limit) || limit < 1) {
      return callback();
    }

    var size, iterate;
    var started = 0;
    var completed = 0;
    var bool = !opposite;
    var createCallback = callback.length === 2 ? detectCallbackWithError : detectCallback;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback();
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback();
      }
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback();
    }

    _times(limit > size ? size : limit, iterate);

    function arrayIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var value = collection[index];
      _iterator(value, createCallback(value));
    }

    function arrayIteratorWithIndex() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var value = collection[index];
      _iterator(value, index, createCallback(value));
    }

    function objectIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var value = collection[keys[index]];
      _iterator(value, createCallback(value));
    }

    function objectIteratorWithKey() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var key = keys[index];
      var value = collection[key];
      _iterator(value, key, createCallback(value));
    }

    function detectCallback(value) {
      var called = false;
      return function(res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (!!res === bool) {
          callback(value);
          callback = noop;
          return;
        }
        if (++completed === size) {
          callback();
          callback = noop;
          return;
        }
        iterate();
      };
    }

    function detectCallbackWithError(value) {
      var called = false;
      return function(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (err) {
          callback(err);
          callback = noop;
          return;
        }
        if (!!res === bool) {
          callback(undefined, value);
          callback = noop;
          return;
        }
        if (++completed === size) {
          callback();
          callback = noop;
          return;
        }
        iterate();
      };
    }

  }

  /**
   * @memberof async
   * @namespace pick
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2, 4];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.pick(array, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 3 }
   *   console.log(order); // [1, 2, 3, 4]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2, 4];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.pick(array, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 3 }
   *   console.log(order); // [[0, 1], [2, 2], [3, 1], [4, 3]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 3, 2, 4];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.pick(array, iterator, function(res) {
   *   console.log(res); // { '0': 1, '1': 3 }
   *   console.log(order); // [1, 2, 3, 4]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 3, 2, 4];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.pick(array, iterator, function(res) {
   *   console.log(res); // { '0': 1, '1': 3 }
   *   console.log(order); // [[0, 1], [2, 2], [3, 1], [4, 3]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.pick(object, iterator, function(err, res) {
   *   console.log(res); // { a: 1, b: 3 }
   *   console.log(order); // [1, 2, 3, 4]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.pick(object, iterator, function(err, res) {
   *   console.log(res); // { a: 1, b: 3 }
   *   console.log(order); // [[1, 'a'], [2, 'c'], [3, 'b'], [4, 'd']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.pick(object, iterator, function(res) {
   *   console.log(res); // { a: 1, b: 3 }
   *   console.log(order); // [1, 2, 3, 4]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.pick(object, iterator, function(res) {
   *   console.log(res); // { a: 1, b: 3 }
   *   console.log(order); // [[1, 'a'], [2, 'c'], [3, 'b'], [4, 'd']]
   * });
   *
   */
  function pick(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    var size;
    var result = {};
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    var enableError = callback.length === 2;
    var createCallback = enableError ? createPickCallbackWithError : createPickCallback;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return enableError ? callback(undefined, {}) : callback({});
      }
      _arrayEach(collection, iterator.length === 3 ? collectionIteratorWithKey : collectionIterator);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return enableError ? callback(undefined, {}) : callback({});
      }
      _objectEach(collection, iterator.length === 3 ? collectionIteratorWithKey : collectionIterator, keys);
    } else {
      return enableError ? callback(undefined, {}) : callback({});
    }

    function collectionIterator(value, key) {
      _iterator(value, createCallback(key, value));
    }

    function collectionIteratorWithKey(value, key) {
      _iterator(value, key, createCallback(key, value));
    }

    function createPickCallback(key, value) {
      var called = false;
      return function done(res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (res) {
          result[key] = value;
        }
        if (--size === 0) {
          callback(result);
        }
      };
    }

    function createPickCallbackWithError(key, value) {
      var called = false;
      return function done(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (err) {
          callback(err, result);
          callback = noop;
          return;
        }
        if (res) {
          result[key] = value;
        }
        if (--size === 0) {
          callback(undefined, result);
        }
      };
    }
  }

  /**
   * @memberof async
   * @namespace pickSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2, 4];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.pickSeries(array, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 3 }
   *   console.log(order); // [1, 3, 2, 4]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2, 4];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.pickSeries(array, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 3 }
   *   console.log(order); // [[0, 1], [3, 1], [2, 2], [4, 3]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 3, 2, 4];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.pickSeries(array, iterator, function(res) {
   *   console.log(res); // { '0': 1, '1': 3 }
   *   console.log(order); // [1, 3, 2, 4]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 3, 2, 4];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.pickSeries(array, iterator, function(res) {
   *   console.log(res); // { '0': 1, '1': 3 }
   *   console.log(order); // [[0, 1], [3, 1], [2, 2], [4, 3]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.pickSeries(object, iterator, function(err, res) {
   *   console.log(res); // { a: 1, b: 3 }
   *   console.log(order); // [1, 3, 2, 4]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.pickSeries(object, iterator, function(err, res) {
   *   console.log(res); // { a: 1, b: 3 }
   *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'c'], [4, 'd']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.pickSeries(object, iterator, function(res) {
   *   console.log(res); // { a: 1, b: 3 }
   *   console.log(order); // [1, 3, 2, 4]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.pickSeries(object, iterator, function(res) {
   *   console.log(res); // { a: 1, b: 3 }
   *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'c'], [4, 'd']]
   * });
   *
   */
  function pickSeries(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    var size, key, value, keys, iterate, called;
    var result = {};
    var completed = 0;
    var enableError = callback.length === 2;
    var done = enableError ? pickCallbackWithError : pickCallback;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return enableError ? callback(undefined, {}) : callback({});
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return enableError ? callback(undefined, {}) : callback({});
      }
      result = {};
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return enableError ? callback(undefined, {}) : callback({});
    }
    iterate();

    function arrayIterator() {
      called = false;
      key = completed;
      value = collection[completed];
      _iterator(value, done);
    }

    function arrayIteratorWithIndex() {
      called = false;
      key = completed;
      value = collection[completed];
      _iterator(value, completed, done);
    }

    function objectIterator() {
      called = false;
      key = keys[completed];
      value = collection[key];
      _iterator(value, done);
    }

    function objectIteratorWithKey() {
      called = false;
      key = keys[completed];
      value = collection[key];
      _iterator(value, key, done);
    }

    function pickCallback(res) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;

      if (res) {
        result[key] = value;
      }
      if (++completed === size) {
        return callback(result);
      }
      iterate();
    }

    function pickCallbackWithError(err, res) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;

      if (err) {
        callback(err, result);
        callback = noop;
        return;
      }
      if (res) {
        result[key] = value;
      }
      if (++completed === size) {
        return callback(undefined, result);
      }
      iterate();
    }
  }

  /**
   * @memberof async
   * @namespace pickLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.pickLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 5, '2': 3 }
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.pickLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 5, '2': 3 }
   *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4], [4, 3]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.pickLimit(array, 2, iterator, function(res) {
   *   console.log(res); // { '0': 1, '1': 5, '2': 3 }
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.pickLimit(array, 2, iterator, function(res) {
   *   console.log(res); // { '0': 1, '1': 5, '2': 3 }
   *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4], [4, 3]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.pickLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // { a: 1, b: 5, c: 3 }
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.pickLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // { a: 1, b: 5, c: 3 }
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e'], [4, 'd']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.pickLimit(object, 2, iterator, function(res) {
   *   console.log(res); // { a: 1, b: 5, c: 3 }
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.pickLimit(object, 2, iterator, function(res) {
   *   console.log(res); // { a: 1, b: 5, c: 3 }
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e'], [4, 'd']]
   * });
   */
  function pickLimit(collection, limit, iterator, callback, thisArg) {
    callback = callback || noop;
    var enableError = callback.length === 2;
    if (isNaN(limit) || limit < 1) {
      return enableError ? callback(undefined, {}) : callback({});
    }

    var size, keys, iterate;
    var result = {};
    var started = 0;
    var completed = 0;
    var createCallback = enableError ? createPickCallbackWithError : createPickCallback;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return enableError ? callback(undefined, {}) : callback({});
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return enableError ? callback(undefined, {}) : callback({});
      }
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return enableError ? callback(undefined, {}) : callback({});
    }

    _times(limit > size ? size : limit, iterate);

    function arrayIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var value = collection[index];
      _iterator(value, createCallback(value, index));
    }

    function arrayIteratorWithIndex() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var value = collection[index];
      _iterator(value, index, createCallback(value, index));
    }

    function objectIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var key = keys[index];
      var value = collection[key];
      _iterator(value, createCallback(value, key));
    }

    function objectIteratorWithKey() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var key = keys[index];
      var value = collection[key];
      _iterator(value, key, createCallback(value, key));
    }

    function createPickCallback(value, key) {
      var called = false;
      return function(res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (res) {
          result[key] = value;
        }
        if (++completed === size) {
          return callback(result);
        }
        iterate();
      };
    }

    function createPickCallbackWithError(value, key) {
      var called = false;

      return function(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (err) {
          callback(err, _objectClone(result));
          callback = noop;
          return;
        }
        if (res) {
          result[key] = value;
        }
        if (++completed === size) {
          return callback(undefined, result);
        }
        iterate();
      };
    }
  }

  /**
   * @memberof async
   * @namespace reduce
   * @param {Array|Object} collection
   * @param {*} result
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var collection = [1, 3, 2, 4];
   * var iterator = function(result, num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, result + num);
   *   }, num * 10);
   * };
   * async.reduce(collection, 0, iterator, function(err, res) {
   *   console.log(res); // 10
   *   console.log(order); // [1, 3, 2, 4]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var collection = [1, 3, 2, 4];
   * var iterator = function(result, num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, result + num);
   *   }, num * 10);
   * };
   * async.reduce(collection, '', iterator, function(err, res) {
   *   console.log(res); // '1324'
   *   console.log(order); // [[1, 0], [3, 1], [2, 2], [4, 3]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(result, num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, result + num);
   *   }, num * 10);
   * };
   * async.reduce(collection, '', iterator, function(err, res) {
   *   console.log(res); // '1324'
   *   console.log(order); // [1, 3, 2, 4]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(result, num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, result + num);
   *   }, num * 10);
   * };
   * async.reduce(collection, 0, iterator, function(err, res) {
   *   console.log(res); // 10
   *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'b'], [4, 'd']]
   * });
   *
   */
  function reduce(collection, result, iterator, callback, thisArg) {
    callback = callback || noop;
    var size, keys, iterate, called;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 4 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 4 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback(undefined, result);
    }

    iterate(result);

    function arrayIterator(result) {
      called = false;
      var value = collection[completed];
      _iterator(result, value, done);
    }

    function arrayIteratorWithIndex(result) {
      called = false;
      var value = collection[completed];
      _iterator(result, value, completed, done);
    }

    function objectIterator(result) {
      called = false;
      var key = keys[completed];
      var value = collection[key];
      _iterator(result, value, done);
    }

    function objectIteratorWithKey(result) {
      called = false;
      var key = keys[completed];
      var value = collection[key];
      _iterator(result, value, key, done);
    }

    function done(err, result) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;

      if (err) {
        return callback(err, result);
      }
      if (++completed === size) {
        return callback(undefined, result);
      }
      iterate(result);
    }
  }

  /**
   * @memberof async
   * @namespace reduceRight
   * @param {Array|Object} collection
   * @param {*} result
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var collection = [1, 3, 2, 4];
   * var iterator = function(result, num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, result + num);
   *   }, num * 10);
   * };
   * async.reduceRight(collection, 0, iterator, function(err, res) {
   *   console.log(res); // 10
   *   console.log(order); // [4, 2, 3, 1]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var collection = [1, 3, 2, 4];
   * var iterator = function(result, num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, result + num);
   *   }, num * 10);
   * };
   * async.reduceRight(collection, '', iterator, function(err, res) {
   *   console.log(res); // '4231'
   *   console.log(order); // [[4, 3], [2, 2], [3, 1], [1, 0]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(result, num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, result + num);
   *   }, num * 10);
   * };
   * async.reduceRight(collection, '', iterator, function(err, res) {
   *   console.log(res); // '4231'
   *   console.log(order); // [4, 2, 3, 1]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(result, num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, result + num);
   *   }, num * 10);
   * };
   * async.reduceRight(collection, 0, iterator, function(err, res) {
   *   console.log(res); // 10
   *   console.log(order); // [[4, 3], [2, 2], [3, 1], [1, 0]]
   * });
   *
   */
  function reduceRight(collection, result, iterator, callback, thisArg) {
    callback = callback || noop;
    var resIndex, keys, iterate, called;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      resIndex = collection.length;
      if (!resIndex) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 4 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      keys = Object.keys(collection);
      resIndex = keys.length;
      if (!resIndex) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 4 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback(undefined, result);
    }

    iterate(result);

    function arrayIterator(result) {
      called = false;
      var value = collection[--resIndex];
      _iterator(result, value, done);
    }

    function arrayIteratorWithIndex(result) {
      called = false;
      var index = --resIndex;
      var value = collection[index];
      _iterator(result, value, index, done);
    }

    function objectIterator(result) {
      called = false;
      var key = keys[--resIndex];
      var value = collection[key];
      _iterator(result, value, done);
    }

    function objectIteratorWithKey(result) {
      called = false;
      var key = keys[--resIndex];
      var value = collection[key];
      _iterator(result, value, key, done);
    }

    function done(err, result) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;

      if (err) {
        return callback(err, result);
      }
      if (resIndex === 0) {
        return callback(undefined, result);
      }
      iterate(result);
    }
  }

  /**
   * @memberof async
   * @namespace transform
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {Array|Object} [accumulator]
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var collection = [1, 3, 2, 4];
   * var iterator = function(result, num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     result.push(num)
   *     done();
   *   }, num * 10);
   * };
   * async.transform(collection, iterator, function(err, res) {
   *   console.log(res); // [1, 2, 3, 4]
   *   console.log(order); // [1, 2, 3, 4]
   * });
   *
   * @example
   *
   * // array with index and accumulator
   * var order = [];
   * var collection = [1, 3, 2, 4];
   * var iterator = function(result, num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     result[index] = num;
   *     done();
   *   }, num * 10);
   * };
   * async.transform(collection, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 3, '2': 2, '3': 4 }
   *   console.log(order); // [[1, 0], [2, 2], [3, 1], [4, 3]]
   * }, {});
   *
   * @example
   *
   * // object with accumulator
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(result, num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     result.push(num);
   *     done();
   *   }, num * 10);
   * };
   * async.transform(collection, iterator, function(err, res) {
   *   console.log(res); // [1, 2, 3, 4]
   *   console.log(order); // [1, 2, 3, 4]
   * }, []);
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(result, num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     result[key] = num;
   *     done();
   *   }, num * 10);
   * };
   * async.transform(collection, iterator, function(err, res) {
   *   console.log(res); //  { a: 1, b: 3, c: 2, d: 4 }
   *   console.log(order); // [[1, 'a'], [2, 'b'], [3, 'b'], [4, 'd']]
   * });
   *
   */
  function transform(collection, iterator, callback, accumulator, thisArg) {
    callback = callback || noop;
    var size, result;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      result = accumulator !== undefined ? accumulator : [];
      if (size === 0) {
        return callback(undefined, result);
      }
      _arrayEach(collection, iterator.length === 4 ? collectionIteratorWithKey : collectionIterator);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      result = accumulator !== undefined ? accumulator : {};
      if (size === 0) {
        return callback(undefined, result);
      }
      _objectEach(collection, iterator.length === 4 ? collectionIteratorWithKey : collectionIterator);
    } else {
      callback(undefined, {});
    }

    function collectionIterator(value) {
      _iterator(result, value, once(done));
    }

    function collectionIteratorWithKey(value, key) {
      _iterator(result, value, key, once(done));
    }

    function done(err, bool) {
      if (err) {
        callback(err, Array.isArray(result) ? _arrayClone(result) : _objectClone(result));
        callback = noop;
        return;
      }
      if (--size === 0) {
        callback(undefined, result);
        callback = noop;
        return;
      }
      if (bool === false) {
        callback(undefined, Array.isArray(result) ? _arrayClone(result) : _objectClone(result));
        callback = noop;
        return;
      }
    }
  }

  /**
   * @memberof async
   * @namespace transformSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {Array|Object} [accumulator]
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var collection = [1, 3, 2, 4];
   * var iterator = function(result, num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     result.push(num)
   *     done();
   *   }, num * 10);
   * };
   * async.transformSeries(collection, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2, 4]
   *   console.log(order); // [1, 3, 2, 4]
   * });
   *
   * @example
   *
   * // array with index and accumulator
   * var order = [];
   * var collection = [1, 3, 2, 4];
   * var iterator = function(result, num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     result[index] = num;
   *     done();
   *   }, num * 10);
   * };
   * async.transformSeries(collection, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 3, '2': 2, '3': 4 }
   *   console.log(order); // [[1, 0], [3, 1], [2, 2], [4, 3]]
   * }, {});
   *
   * @example
   *
   * // object with accumulator
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(result, num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     result.push(num);
   *     done();
   *   }, num * 10);
   * };
   * async.transformSeries(collection, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2, 4]
   *   console.log(order); // [1, 3, 2, 4]
   * }, []);
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2, d: 4 };
   * var iterator = function(result, num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     result[key] = num;
   *     done();
   *   }, num * 10);
   * };
   * async.transformSeries(collection, iterator, function(err, res) {
   *   console.log(res); //  { a: 1, b: 3, c: 2, d: 4 }
   *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'b'], [4, 'd']]
   * });
   *
   */
  function transformSeries(collection, iterator, callback, accumulator, thisArg) {
    callback = callback || noop;
    var size, iterate, called, result;
    var isArray = Array.isArray(collection);
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (isArray) {
      size = collection.length;
      result = accumulator !== undefined ? accumulator : [];
      if (size === 0) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 4 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      result = accumulator !== undefined ? accumulator : {};
      if (size === 0) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 4 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback(undefined, {});
    }

    iterate();

    function arrayIterator() {
      called = false;
      _iterator(result, collection[completed], done);
    }

    function arrayIteratorWithIndex() {
      called = false;
      _iterator(result, collection[completed], completed, done);
    }

    function objectIterator() {
      called = false;
      _iterator(result, collection[keys[completed]], done);
    }

    function objectIteratorWithKey() {
      called = false;
      var key = keys[completed];
      _iterator(result, collection[key], key, done);
    }

    function done(err, bool) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;

      if (err) {
        return callback(err, result);
      }
      if (++completed === size) {
        return callback(undefined, result);
      }
      if (bool === false) {
        return callback(undefined, result);
      }
      iterate();
    }
  }

  /**
   * @memberof async
   * @namespace transformLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {Array|Object} [accumulator]
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(result, num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     result.push(num);
   *     done();
   *   }, num * 10);
   * };
   * async.transformLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 5, 2, 4]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // array with index and accumulator
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(result, num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     result[index] = key;
   *     done();
   *   }, num * 10);
   * };
   * async.transformLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // { '0': 1, '1': 5, '2': 3, '3': 4, '4': 2 }
   *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4], [4, 3]]
   * }, {});
   *
   * @example
   *
   * // object with accumulator
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(result, num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     result.push(num);
   *     done();
   *   }, num * 10);
   * };
   * async.transformLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 5, 2, 4]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * }, []);
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(result, num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     result[key] = num;
   *     done();
   *   }, num * 10);
   * };
   * async.transformLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // { a: 1, b: 5, c: 3, d: 4, e: 2 };
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e'], [4, 'd']]
   * });
   *
   */
  function transformLimit(collection, limit, iterator, callback, accumulator, thisArg) {
    callback = callback || noop;
    var isArray = Array.isArray(collection);
    var result = accumulator !== undefined ? accumulator : isArray ? [] : {};
    if (isNaN(limit) || limit < 1) {
      return callback(undefined, result);
    }

    var size, iterate;
    var started = 0;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (isArray) {
      size = collection.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 4 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 4 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback(undefined, result);
    }

    _times(limit > size ? size : limit, iterate);

    function arrayIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(result, collection[index], once(done));
    }

    function arrayIteratorWithIndex() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(result, collection[index], index, once(done));
    }

    function objectIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(result, collection[keys[index]], once(done));
    }

    function objectIteratorWithKey() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var key = keys[index];
      _iterator(result, collection[key], key, once(done));
    }

    function done(err, bool) {
      if (err) {
        callback(err, Array.isArray(result) ? _arrayClone(result) : _objectClone(result));
        callback = noop;
        return;
      }
      if (++completed === size) {
        callback(undefined, result);
        callback = noop;
        return;
      }
      if (bool === false) {
        callback(undefined, Array.isArray(result) ? _arrayClone(result) : _objectClone(result));
        callback = noop;
        return;
      }
      iterate();
    }
  }

  /**
   * @private
   * @param {string} type
   */
  function createSortBy(type) {
    switch (type) {
      case 'series':
        return sortBySeries;
      case 'limit':
        return sortByLimit;
      default:
        return sortBy;
    }

    /**
     * @memberof async
     * @namespace sortBy
     * @param {Array|Object} collection
     * @param {Function} iterator
     * @param {Function} callback
     * @param {*} [thisArg]
     * @example
     *
     * // array
     * var order = [];
     * var array = [1, 3, 2];
     * var iterator = function(num, done) {
     *   setTimeout(function() {
     *     order.push(num);
     *     done(null, num);
     *   }, num * 10);
     * };
     * async.sortBy(array, iterator, function(err, res) {
     *   console.log(res); // [1, 2, 3];
     *   console.log(order); // [1, 2, 3]
     * });
     *
     * @example
     *
     * // array with index
     * var order = [];
     * var array = [1, 3, 2];
     * var iterator = function(num, index, done) {
     *   setTimeout(function() {
     *     order.push([num, index]);
     *     done(null, num);
     *   }, num * 10);
     * };
     * async.sortBy(array, iterator, function(err, res) {
     *   console.log(res); // [1, 2, 3]
     *   console.log(order); // [[1, 0], [2, 2], [3, 1]]
     * });
     *
     * @example
     *
     * // object
     * var order = [];
     * var object = { a: 1, b: 3, c: 2 };
     * var iterator = function(num, done) {
     *   setTimeout(function() {
     *     order.push(num);
     *     done(null, num);
     *   }, num * 10);
     * };
     * async.sortBy(object, iterator, function(err, res) {
     *   console.log(res); // [1, 2, 3]
     *   console.log(order); // [1, 2, 3]
     * });
     *
     * @example
     *
     * // object with key
     * var order = [];
     * var object = { a: 1, b: 3, c: 2 };
     * var iterator = function(num, key, done) {
     *   setTimeout(function() {
     *     order.push([num, key]);
     *     done(null, num);
     *   }, num * 10);
     * };
     * async.sortBy(object, iterator, function(err, res) {
     *   console.log(res); // [1, 2, 3]
     *   console.log(order); // [[1, 'a'], [2, 'c'], [3, 'b']]
     * });
     *
     */
    function sortBy(collection, iterator, callback, thisArg) {
      var _iterator = createIterator(iterator, thisArg);
      map(collection, _iterator, createCallback(callback));
    }

    /**
     * @memberof async
     * @namespace sortBySeries
     * @param {Array|Object} collection
     * @param {Function} iterator
     * @param {Function} callback
     * @param {*} [thisArg]
     * @example
     *
     * // array
     * var order = [];
     * var array = [1, 3, 2];
     * var iterator = function(num, done) {
     *   setTimeout(function() {
     *     order.push(num);
     *     done(null, num);
     *   }, num * 10);
     * };
     * async.sortBySeries(array, iterator, function(err, res) {
     *   console.log(res); // [1, 2, 3];
     *   console.log(order); // [1, 3, 2]
     * });
     *
     * @example
     *
     * // array with index
     * var order = [];
     * var array = [1, 3, 2];
     * var iterator = function(num, index, done) {
     *   setTimeout(function() {
     *     order.push([num, index]);
     *     done(null, num);
     *   }, num * 10);
     * };
     * async.sortBySeries(array, iterator, function(err, res) {
     *   console.log(res); // [1, 2, 3]
     *   console.log(order); // [[1, 0], [3, 1], [2, 2]]
     * });
     *
     * @example
     *
     * // object
     * var order = [];
     * var object = { a: 1, b: 3, c: 2 };
     * var iterator = function(num, done) {
     *   setTimeout(function() {
     *     order.push(num);
     *     done(null, num);
     *   }, num * 10);
     * };
     * async.sortBySeries(object, iterator, function(err, res) {
     *   console.log(res); // [1, 2, 3]
     *   console.log(order); // [1, 3, 2]
     * });
     *
     * @example
     *
     * // object with key
     * var order = [];
     * var object = { a: 1, b: 3, c: 2 };
     * var iterator = function(num, key, done) {
     *   setTimeout(function() {
     *     order.push([num, key]);
     *     done(null, num);
     *   }, num * 10);
     * };
     * async.sortBySeries(object, iterator, function(err, res) {
     *   console.log(res); // [1, 2, 3]
     *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'c']]
     * });
     *
     */
    function sortBySeries(collection, iterator, callback, thisArg) {
      var _iterator = createIterator(iterator, thisArg);
      mapSeries(collection, _iterator, createCallback(callback));
    }

    /**
     * @memberof async
     * @namespace sortByLimit
     * @param {Array|Object} collection
     * @param {number} limit - limit >= 1
     * @param {Function} iterator
     * @param {Function} callback
     * @param {*} [thisArg]
     * @example
     *
     * // array
     * var order = [];
     * var array = [1, 5, 3, 4, 2];
     * var iterator = function(num, done) {
     *   setTimeout(function() {
     *     order.push(num);
     *     done(null, num);
     *   }, num * 10);
     * };
     * async.sortByLimit(array, 2, iterator, function(err, res) {
     *   console.log(res); // [1, 2, 3, 4, 5]
     *   console.log(order); // [1, 3, 5, 2, 4]
     * });
     *
     * @example
     *
     * // array with index
     * var order = [];
     * var array = [1, 5, 3, 4, 2];
     * var iterator = function(num, index, done) {
     *   setTimeout(function() {
     *     order.push([num, index]);
     *     done(null, num);
     *   }, num * 10);
     * };
     * async.sortByLimit(array, 2, iterator, function(err, res) {
     *   console.log(res); // [1, 2, 3, 4, 5]
     *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4], [4, 3]]
     * });
     *
     * @example
     *
     * // object
     * var order = [];
     * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
     * var iterator = function(num, done) {
     *   setTimeout(function() {
     *     order.push(num);
     *     done(null, num);
     *   }, num * 10);
     * };
     * async.sortByLimit(object, 2, iterator, function(err, res) {
     *   console.log(res); // [1, 2, 3, 4, 5]
     *   console.log(order); // [1, 3, 5, 2, 4]
     * });
     *
     * @example
     *
     * // object with key
     * var order = [];
     * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
     * var iterator = function(num, key, done) {
     *   setTimeout(function() {
     *     order.push([num, key]);
     *     done(null, num);
     *   }, num * 10);
     * };
     * async.sortByLimit(object, 2, iterator, function(err, res) {
     *   console.log(res); // [1, 2, 3, 4, 5]
     *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e'], [4, 'd']]
     * });
     *
     */
    function sortByLimit(collection, limit, iterator, callback, thisArg) {
      var _iterator = createIterator(iterator, thisArg);
      mapLimit(collection, limit, _iterator, createCallback(callback));
    }

    function createIterator(iterator, thisArg) {
      var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
      return iterator.length === 3 ? collectionIteratorWithKey : collectionIterator;

      function collectionIterator(value, callback) {
        _iterator(value, function(err, criteria) {
          if (err) {
            callback(err);
            callback = noop;
            return;
          }
          callback(undefined, {
            value: value,
            criteria: criteria
          });
        });
      }

      function collectionIteratorWithKey(value, key, callback) {
        _iterator(value, key, function(err, criteria) {
          if (err) {
            callback(err);
            callback = noop;
            return;
          }
          callback(undefined, {
            value: value,
            criteria: criteria
          });
        });
      }
    }

    function createCallback(callback) {
      return function(err, array) {
        if (err) {
          callback(err);
          callback = noop;
          return;
        }
        array.sort(function(a, b) {
          return a.criteria < b.criteria ? -1 : 1;
        });
        callback(undefined, _pluck(array, 'value'));
      };
    }

  }

  /**
   * @memberof async
   * @namespace some
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.some(array, iterator, function(err, res) {
   *   console.log(res); // true
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.some(array, iterator, function(err, res) {
   *   console.log(res); // true
   *   console.log(order); // [[1, 0]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.some(array, iterator, function(res) {
   *   console.log(res); // true
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.some(array, iterator, function(res) {
   *   console.log(res); // true
   *   console.log(order); // [[1, 0]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.some(object, iterator, function(err, res) {
   *   console.log(res); // true
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.some(object, iterator, function(err, res) {
   *   console.log(res); // true
   *   console.log(order); // [[1, 'a']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.some(object, iterator, function(res) {
   *   console.log(res); // true
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.some(object, iterator, function(res) {
   *   console.log(res); // true
   *   console.log(order); // [[1, 'a']]
   * });
   *
   */
  function some(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    detect(collection, iterator, callback.length === 2 ? doneWithError : done, thisArg);

    function done(res) {
      callback(!!res);
    }

    function doneWithError(err, res) {
      callback(err, !!res);
    }
  }

  /**
   * @memberof async
   * @namespace someSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.someSeries(array, iterator, function(err, res) {
   *   console.log(res); // true
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.someSeries(array, iterator, function(err, res) {
   *   console.log(res); // true
   *   console.log(order); // [[1, 0]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.someSeries(array, iterator, function(res) {
   *   console.log(res); // true
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.someSeries(array, iterator, function(res) {
   *   console.log(res); // true
   *   console.log(order); // [[1, 0]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.someSeries(object, iterator, function(err, res) {
   *   console.log(res); // true
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.someSeries(object, iterator, function(err, res) {
   *   console.log(res); // true
   *   console.log(order); // [[1, 'a']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.someSeries(object, iterator, function(res) {
   *   console.log(res); // true
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.someSeries(object, iterator, function(res) {
   *   console.log(res); // true
   *   console.log(order); // [[1, 'a']]
   * });
   *
   */
  function someSeries(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    detectSeries(collection, iterator, callback.length === 2 ? doneWithError : done, thisArg);

    function done(res) {
      callback(!!res);
    }

    function doneWithError(err, res) {
      callback(err, !!res);
    }
  }

  /**
   * @memberof async
   * @namespace someLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.someLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // true
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.someLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // true
   *   console.log(order); // [[1, 0]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.someLimit(array, 2, iterator, function(res) {
   *   console.log(res); // true
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.someLimit(array, 2, iterator, function(res) {
   *   console.log(res); // true
   *   console.log(order); // [[1, 0]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.someLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // true
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.someLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // true
   *   console.log(order); // [[1, 'a']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.someLimit(object, 2, iterator, function(res) {
   *   console.log(res); // true
   *   console.log(order); // [1]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.someLimit(object, 2, iterator, function(res) {
   *   console.log(res); // true
   *   console.log(order); // [[1, 'a']]
   * });
   *
   */
  function someLimit(collection, limit, iterator, callback, thisArg) {
    callback = callback || noop;
    detectLimit(collection, limit, iterator, callback.length === 2 ? doneWithError : done, thisArg);

    function done(res) {
      callback(!!res);
    }

    function doneWithError(err, res) {
      callback(err, !!res);
    }
  }

  /**
   * @memberof async
   * @namespace every
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.every(array, iterator, function(err, res) {
   *   console.log(res); // false
   *   console.log(order); // [1, 2]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.every(array, iterator, function(err, res) {
   *   console.log(res); // false
   *   console.log(order); // [[1, 0], [2, 2]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.every(array, iterator, function(res) {
   *   console.log(res); // false
   *   console.log(order); // [1, 2]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.every(array, iterator, function(res) {
   *   console.log(res); // false
   *   console.log(order); // [[1, 0], [2, 2]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.every(object, iterator, function(err, res) {
   *   console.log(res); // false
   *   console.log(order); // [1, 2]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.every(object, iterator, function(err, res) {
   *   console.log(res); // false
   *   console.log(order); // [[1, 'a'], [2, 'c']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.every(object, iterator, function(res) {
   *   console.log(res); // false
   *   console.log(order); // [1, 2]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.every(object, iterator, function(res) {
   *   console.log(res); // false
   *   console.log(order); // [[1, 'a'], [2, 'c']]
   * });
   *
   */
  function every(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    detect(collection, iterator, callback.length === 2 ? doneWithError : done, thisArg, true);

    function done(res) {
      callback(!res);
    }

    function doneWithError(err, res) {
      callback(err, !res);
    }
  }

  /**
   * @memberof async
   * @namespace everySeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.everySeries(array, iterator, function(err, res) {
   *   console.log(res); // false
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.everySeries(array, iterator, function(err, res) {
   *   console.log(res); // false
   *   console.log(order); // [[1, 0], [3, 1], [2, 2]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.everySeries(array, iterator, function(res) {
   *   console.log(res); // false
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.everySeries(array, iterator, function(res) {
   *   console.log(res); // false
   *   console.log(order); // [[1, 0], [3, 1], [2, 2]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.everySeries(object, iterator, function(err, res) {
   *   console.log(res); // false
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.everySeries(object, iterator, function(err, res) {
   *   console.log(res); // false
   *   console.log(order); // [[1, 'a'], [3, 'b'] [2, 'c']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.every(object, iterator, function(res) {
   *   console.log(res); // false
   *   console.log(order); // [1, 2]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.every(object, iterator, function(res) {
   *   console.log(res); // false
   *   console.log(order); // [[1, 'a'], [2, 'c']]
   * });
   *
   */
  function everySeries(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    detectSeries(collection, iterator, callback.length === 2 ? doneWithError : done, thisArg, true);

    function done(res) {
      callback(!res);
    }

    function doneWithError(err, res) {
      callback(err, !res);
    }
  }

  /**
   * @memberof async
   * @namespace everyLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.everyLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // false
   *   console.log(order); // [1, 3, 5, 2]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.everyLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // false
   *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4]]
   * });
   *
   * @example
   *
   * // array (not use error handling)
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.everyLimit(array, 2, iterator, function(res) {
   *   console.log(res); // false
   *   console.log(order); // [1, 3, 5, 2]
   * });
   *
   * @example
   *
   * // array with index (not use error handling)
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.everyLimit(array, 2, iterator, function(res) {
   *   console.log(res); // false
   *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.everyLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // false
   *   console.log(order); // [1, 3, 5, 2]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num % 2);
   *   }, num * 10);
   * };
   * async.everyLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // false
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e']]
   * });
   *
   * @example
   *
   * // object (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.everyLimit(object, 2, iterator, function(res) {
   *   console.log(res); // false
   *   console.log(order); // [1, 3, 5, 2]
   * });
   *
   * @example
   *
   * // object with key (not use error handling)
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(num % 2);
   *   }, num * 10);
   * };
   * async.everyLimit(object, 2, iterator, function(res) {
   *   console.log(res); // false
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e']]
   * });
   *
   */
  function everyLimit(collection, limit, iterator, callback, thisArg) {
    callback = callback || noop;
    detectLimit(collection, limit, iterator, callback.length === 2 ? doneWithError : done, thisArg, true);

    function done(res) {
      callback(!res);
    }

    function doneWithError(err, res) {
      callback(err, !res);
    }
  }

  /**
   * @memberof async
   * @namespace concat
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, [num]);
   *   }, num * 10);
   * };
   * async.concat(array, iterator, function(err, res) {
   *   console.log(res); // [1, 2, 3];
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, [num]);
   *   }, num * 10);
   * };
   * async.concat(array, iterator, function(err, res) {
   *   console.log(res); // [1, 2, 3]
   *   console.log(order); // [[1, 0], [2, 2], [3, 1]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, [num]);
   *   }, num * 10);
   * };
   * async.concat(object, iterator, function(err, res) {
   *   console.log(res); // [1, 2, 3]
   *   console.log(order); // [1, 2, 3]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, [num]);
   *   }, num * 10);
   * };
   * async.concat(object, iterator, function(err, res) {
   *   console.log(res); // [1, 2, 3]
   *   console.log(order); // [[1, 'a'], [2, 'c'], [3, 'b']]
   * });
   *
   */
  function concat(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    var size;
    var result = [];
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      _arrayEach(collection, iterator.length === 3 ? collectionIteratorWithKey : collectionIterator);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      _objectEach(collection, iterator.length === 3 ? collectionIteratorWithKey : collectionIterator);
    } else {
      callback(undefined, result);
    }

    function collectionIterator(value) {
      _iterator(value, once(done));
    }

    function collectionIteratorWithKey(value, key) {
      _iterator(value, key, once(done));
    }

    function done(err, array) {
      if (array !== undefined) {
        Array.prototype.push.apply(result, Array.isArray(array) ? array : [array]);
      }
      if (err) {
        callback(err, _arrayClone(result));
        callback = noop;
        return;
      }
      if (--size === 0) {
        callback(undefined, result);
        callback = noop;
      }
    }
  }

  /**
   * @memberof async
   * @namespace concatSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, [num]);
   *   }, num * 10);
   * };
   * async.concatSeries(array, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2];
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, [num]);
   *   }, num * 10);
   * };
   * async.concatSeries(array, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2]
   *   console.log(order); // [[1, 0], [3, 1], [2, 2]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, [num]);
   *   }, num * 10);
   * };
   * async.concatSeries(object, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2]
   *   console.log(order); // [1, 3, 2]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 3, c: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, [num]);
   *   }, num * 10);
   * };
   * async.concatSeries(object, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 2]
   *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'c']]
   * });
   *
   */
  function concatSeries(collection, iterator, callback, thisArg) {
    callback = callback || noop;
    var size, keys, iterate, called;
    var result = [];
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback(undefined, result);
    }

    iterate();

    function arrayIterator() {
      called = false;
      _iterator(collection[completed], done);
    }

    function arrayIteratorWithIndex() {
      called = false;
      _iterator(collection[completed], completed, done);
    }

    function objectIterator() {
      called = false;
      _iterator(collection[keys[completed]], done);
    }

    function objectIteratorWithKey() {
      called = false;
      var key = keys[completed];
      _iterator(collection[key], key, done);
    }

    function done(err, array) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;

      if (array) {
        Array.prototype.push.apply(result, Array.isArray(array) ? array : [array]);
      }
      if (err) {
        return callback(err, result);
      }
      if (++completed === size) {
        return callback(undefined, result);
      }
      iterate();
    }
  }

  /**
   * @memberof async
   * @namespace concatLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * // array
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, [num]);
   *   }, num * 10);
   * };
   * async.concatLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 5, 2, 4]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // array with index
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, index, done) {
   *   setTimeout(function() {
   *     order.push([num, index]);
   *     done(null, [num]);
   *   }, num * 10);
   * };
   * async.cocnatLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 5, 2, 4]
   *   console.log(order); // [[1, 0], [3, 2], [5, 1], [2, 4], [4, 3]]
   * });
   *
   * @example
   *
   * // object
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, [num]);
   *   }, num * 10);
   * };
   * async.concatLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 5, 2, 4]
   *   console.log(order); // [1, 3, 5, 2, 4]
   * });
   *
   * @example
   *
   * // object with key
   * var order = [];
   * var object = { a: 1, b: 5, c: 3, d: 4, e: 2 };
   * var iterator = function(num, key, done) {
   *   setTimeout(function() {
   *     order.push([num, key]);
   *     done(null, num);
   *   }, num * 10);
   * };
   * async.cocnatLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // [1, 3, 5, 2, 4]
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e'], [4, 'd']]
   * });
   *
   */
  function concatLimit(collection, limit, iterator, callback, thisArg) {
    callback = callback || noop;
    var result = [];
    if (isNaN(limit) || limit < 1) {
      return callback(undefined, result);
    }

    var size, iterate;
    var started = 0;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, result);
      }
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback(undefined, result);
    }

    _times(limit > size ? size : limit, iterate);

    function arrayIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(collection[index], once(done));
    }

    function arrayIteratorWithIndex() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(collection[index], index, once(done));
    }

    function objectIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      _iterator(collection[keys[index]], once(done));
    }

    function objectIteratorWithKey() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var key = keys[index];
      _iterator(collection[key], key, once(done));
    }

    function done(err, array) {
      if (array) {
        Array.prototype.push.apply(result, Array.isArray(array) ? array : [array]);
      }
      if (err) {
        callback(err, result);
        callback = noop;
        return;
      }
      if (++completed === size) {
        callback(undefined, result);
        callback = noop;
        return;
      }
      iterate();
    }
  }

  /**
   * @memberof async
   * @namespace parallel
   * @param {Array|Object} tasks - functions
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * var order = [];
   * var tasks = [
   *  function(done) {
   *    setTimeout(function() {
   *      order.push(1);
   *      done(null, 1);
   *    }, 10);
   *  },
   *  function(done) {
   *    setTimeout(function() {
   *      order.push(2);
   *      done(null, 2);
   *    }, 30);
   *  },
   *  function(done) {
   *    setTimeout(function() {
   *      order.push(3);
   *      done(null, 3);
   *    }, 40);
   *  },
   *  function(done) {
   *    setTimeout(function() {
   *      order.push(4);
   *      done(null, 4);
   *    }, 20);
   *  }
   * ];
   * async.parallel(tasks, function(err, res) {
   *   console.log(res); // [1, 2, 3, 4];
   *   console.log(order); // [1, 4, 2, 3]
   * });
   *
   * @example
   *
   * var order = [];
   * var tasks = {
   *   'a': function(done) {
   *     setTimeout(function() {
   *       order.push(1);
   *       done(null, 1);
   *     }, 10);
   *   },
   *   'b': function(done) {
   *     setTimeout(function() {
   *       order.push(2);
   *       done(null, 2);
   *     }, 30);
   *   },
   *   'c': function(done) {
   *     setTimeout(function() {
   *       order.push(3);
   *       done(null, 3);
   *     }, 40);
   *   },
   *   'd': function(done) {
   *     setTimeout(function() {
   *       order.push(4);
   *       done(null, 4);
   *     }, 20);
   *   }
   * };
   * async.parallel(tasks, function(err, res) {
   *   console.log(res); // { a: 1, b: 2, c: 3, d:4 }
   *   console.log(order); // [1, 4, 2, 3]
   * });
   *
   */
  function parallel(tasks, callback, thisArg) {
    callback = callback || noop;
    var size, result;

    if (Array.isArray(tasks)) {
      size = tasks.length;
      if (size === 0) {
        return callback(undefined, []);
      }
      result = Array(size);
      _arrayEach(tasks, thisArg ? collectionIteratorWithBind : collectionIterator);
    } else if (tasks && typeof tasks === 'object') {
      var keys = Object.keys(tasks);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, {});
      }
      result = {};
      _objectEach(tasks, thisArg ? collectionIteratorWithBind : collectionIterator, keys);
    } else {
      callback();
    }

    function collectionIterator(task, index) {
      task(createCallback(index));
    }

    function collectionIteratorWithBind(task, index) {
      task.call(thisArg, createCallback(index));
    }

    function createCallback(key) {
      var called = false;
      return function(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (err) {
          callback(err, result);
          callback = noop;
          return;
        }
        result[key] = arguments.length <= 2 ? res : _slice(arguments, 1);
        if (--size === 0) {
          callback(undefined, result);
          callback = noop;
        }
      };
    }
  }

  /**
   * @memberof async
   * @namespace series
   * @param {Array|Object} tasks - functions
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * var order = [];
   * var tasks = [
   *  function(done) {
   *    setTimeout(function() {
   *      order.push(1);
   *      done(null, 1);
   *    }, 10);
   *  },
   *  function(done) {
   *    setTimeout(function() {
   *      order.push(2);
   *      done(null, 2);
   *    }, 30);
   *  },
   *  function(done) {
   *    setTimeout(function() {
   *      order.push(3);
   *      done(null, 3);
   *    }, 40);
   *  },
   *  function(done) {
   *    setTimeout(function() {
   *      order.push(4);
   *      done(null, 4);
   *    }, 20);
   *  }
   * ];
   * async.series(tasks, function(err, res) {
   *   console.log(res); // [1, 2, 3, 4];
   *   console.log(order); // [1, 2, 3, 4]
   * });
   *
   * @example
   *
   * var order = [];
   * var tasks = {
   *   'a': function(done) {
   *     setTimeout(function() {
   *       order.push(1);
   *       done(null, 1);
   *     }, 10);
   *   },
   *   'b': function(done) {
   *     setTimeout(function() {
   *       order.push(2);
   *       done(null, 2);
   *     }, 30);
   *   },
   *   'c': function(done) {
   *     setTimeout(function() {
   *       order.push(3);
   *       done(null, 3);
   *     }, 40);
   *   },
   *   'd': function(done) {
   *     setTimeout(function() {
   *       order.push(4);
   *       done(null, 4);
   *     }, 20);
   *   }
   * };
   * async.series(tasks, function(err, res) {
   *   console.log(res); // { a: 1, b: 2, c: 3, d:4 }
   *   console.log(order); // [1, 4, 2, 3]
   * });
   *
   */
  function series(tasks, callback, thisArg) {
    callback = callback || noop;
    var size, key, keys, result, iterate, called;
    var completed = 0;

    if (Array.isArray(tasks)) {
      size = tasks.length;
      if (size === 0) {
        return callback(undefined, []);
      }
      result = Array(size);
      iterate = thisArg ? arrayIteratorWithBind : arrayIterator;
    } else if (tasks && typeof tasks === 'object') {
      keys = Object.keys(tasks);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, {});
      }
      result = {};
      iterate = thisArg ? objectIteratorWithBind : objectIterator;
    } else {
      return callback();
    }

    iterate();

    function arrayIterator() {
      called = false;
      key = completed;
      tasks[completed](done);
    }

    function arrayIteratorWithBind() {
      called = false;
      key = completed;
      tasks[completed].call(thisArg, done);
    }

    function objectIterator() {
      called = false;
      key = keys[completed];
      tasks[key](done);
    }

    function objectIteratorWithBind() {
      called = false;
      key = keys[completed];
      tasks[key].call(thisArg, done);
    }

    function done(err, res) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;

      if (err) {
        return callback(err, result);
      }
      result[key] = arguments.length <= 2 ? res : _slice(arguments, 1);
      if (++completed === size) {
        return callback(undefined, result);
      }
      iterate();
    }
  }

  /**
   * @memberof async
   * @namespace parallelLimit
   * @param {Array|Object} tasks - functions
   * @param {number} limit - limit >= 1
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * var order = [];
   * var tasks = [
   *  function(done) {
   *    setTimeout(function() {
   *      order.push(1);
   *      done(null, 1);
   *    }, 10);
   *  },
   *  function(done) {
   *    setTimeout(function() {
   *      order.push(2);
   *      done(null, 2);
   *    }, 50);
   *  },
   *  function(done) {
   *    setTimeout(function() {
   *      order.push(3);
   *      done(null, 3);
   *    }, 30);
   *  },
   *  function(done) {
   *    setTimeout(function() {
   *      order.push(4);
   *      done(null, 4);
   *    }, 40);
   *  }
   * ];
   * async.parallelLimit(tasks, 2, function(err, res) {
   *   console.log(res); // [1, 2, 3, 4];
   *   console.log(order); // [1, 3, 2, 4]
   * });
   *
   * @example
   *
   * var order = [];
   * var tasks = {
   *   'a': function(done) {
   *     setTimeout(function() {
   *       order.push(1);
   *       done(null, 1);
   *     }, 10);
   *   },
   *   'b': function(done) {
   *     setTimeout(function() {
   *       order.push(2);
   *       done(null, 2);
   *     }, 50);
   *   },
   *   'c': function(done) {
   *     setTimeout(function() {
   *       order.push(3);
   *       done(null, 3);
   *     }, 20);
   *   },
   *   'd': function(done) {
   *     setTimeout(function() {
   *       order.push(4);
   *       done(null, 4);
   *     }, 40);
   *   }
   * };
   * async.parallelLimit(tasks, 2, function(err, res) {
   *   console.log(res); // { a: 1, b: 2, c: 3, d:4 }
   *   console.log(order); // [1, 3, 2, 4]
   * });
   *
   */
  function parallelLimit(tasks, limit, callback, thisArg) {
    callback = callback || noop;
    var size, result, iterate;
    var started = 0;
    var completed = 0;

    if (Array.isArray(tasks)) {
      size = tasks.length;
      if (size === 0) {
        return callback(undefined, []);
      }
      result = Array(size);
      iterate = thisArg ? arrayIteratorWithBind : arrayIterator;
    } else if (tasks && typeof tasks === 'object') {
      var keys = Object.keys(tasks);
      size = keys.length;
      if (size === 0) {
        return callback(undefined, {});
      }
      result = {};
      iterate = thisArg ? objectIteratorWithBind : objectIterator;
    } else {
      return callback();
    }

    _times(limit > size ? size : limit, iterate);

    function arrayIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      tasks[index](createCallback(index));
    }

    function arrayIteratorWithBind() {
      var index = started++;
      if (index >= size) {
        return;
      }
      tasks[index].call(thisArg, createCallback(index));
    }

    function objectIterator() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var key = keys[index];
      tasks[key](createCallback(key));
    }

    function objectIteratorWithBind() {
      var index = started++;
      if (index >= size) {
        return;
      }
      var key = keys[index];
      tasks[key].call(thisArg, createCallback(key));
    }

    function createCallback(key) {
      var called = false;
      return function(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (err) {
          callback(err, result);
          callback = noop;
          return;
        }
        result[key] = arguments.length <= 2 ? res : _slice(arguments, 1);
        if (++completed === size) {
          return callback(undefined, result);
        }
        iterate();
      };
    }
  }

  /**
   * @memberof async
   * @namespace waterfall
   * @param {Array} tasks - functions
   * @param {Function} callback
   * @example
   *
   * var order = [];
   * var tasks = [
   *   function(next) {
   *     setTimeout(function() {
   *       order.push(1);
   *       next(null, 1);
   *     }, 10);
   *   },
   *   function(arg1, next) {
   *     setTimeout(function() {
   *       order.push(2);
   *       next(null, 1, 2);
   *     }, 30);
   *   },
   *   function(arg1, arg2, next) {
   *     setTimeout(function() {
   *       order.push(3);
   *       next(null, 3);
   *     }, 20);
   *   },
   *   function(arg1, next) {
   *     setTimeout(function() {
   *       order.push(4);
   *       next(null, 1, 2, 3, 4);
   *     }, 40);
   *   }
   * ];
   * async.waterfall(tasks, function(err, arg1, arg2, arg3, arg4) {
   *   console.log(arg1, arg2, arg3, arg4); // 1 2 3 4
   * });
   *
   */
  function waterfall(tasks, callback) {
    callback = callback || noop;
    if (!Array.isArray(tasks)) {
      var err = new Error('First argument to waterfall must be an array of functions');
      return callback(err);
    }

    var size = tasks.length;
    if (size === 0) {
      return callback();
    }
    var called;
    var completed = 0;
    var args = [];
    iterate();

    function iterate() {
      called = false;
      var func = tasks[completed];
      switch (args.length) {
        case 0:
          return func(done);
        case 1:
          return func(args[0], done);
        case 2:
          return func(args[0], args[1], done);
        case 3:
          return func(args[0], args[1], args[2], done);
        case 4:
          return func(args[0], args[1], args[2], args[3], done);
        case 5:
          return func(args[0], args[1], args[2], args[3], args[4], done);
        default:
          args.push(done);
          return func.apply(null, args);
      }
    }

    function done(err) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;

      if (err) {
        return callback(err);
      }
      if (++completed === size) {
        return callback.apply(null, _baseSlice(arguments));
      }
      args = _slice(arguments, 1);
      iterate();
    }
  }

  /**
   * @private
   * @param {Array} tasks - functions
   */
  function safeWaterfall(tasks, callback) {
    callback = callback || noop;
    if (!Array.isArray(tasks)) {
      var err = new Error('First argument to waterfall must be an array of functions');
      return callback(err);
    }

    var size = tasks.length;
    if (size === 0) {
      return callback();
    }
    var called;
    var args = [];
    iterate(0);

    function iterate(completed) {
      called = false;
      var func = tasks[completed];
      switch (args.length) {
        case 0:
          return func(done);
        case 1:
          return func(args[0], done);
        case 2:
          return func(args[0], args[1], done);
        case 3:
          return func(args[0], args[1], args[2], done);
        case 4:
          return func(args[0], args[1], args[2], args[3], done);
        case 5:
          return func(args[0], args[1], args[2], args[3], args[4], done);
        default:
          args.push(done);
          return func.apply(null, args);
      }

      function done(err) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;

        if (err) {
          return callback(err);
        }
        if (++completed === size) {
          return callback.apply(null, _baseSlice(arguments));
        }
        args = _slice(arguments, 1);
        async.safeNextTick(function() {
          iterate(completed);
        });
      }
    }
  }

  /**
   * @memberof async
   * @namespace whilst
   */
  function whilst(test, iterator, callback, thisArg) {
    callback = callback || noop;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    iterate();

    function iterate() {
      if (test()) {
        _iterator(function(err) {
          if (err) {
            return callback(err);
          }
          iterate();
        });
      } else {
        callback();
      }
    }
  }

  /**
   * @memberof async
   * @namespace doWhilst
   */
  function doWhilst(iterator, test, callback, thisArg) {
    callback = callback || noop;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    iterate();

    function iterate() {
      _iterator(function(err) {
        if (err) {
          return callback(err);
        }
        if (test.apply(thisArg, _slice(arguments, 1))) {
          iterate();
        } else {
          callback();
        }
      });
    }
  }

  /**
   * @memberof async
   * @namespace until
   */
  function until(test, iterator, callback, thisArg) {
    callback = callback || noop;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    iterate();

    function iterate() {
      if (!test()) {
        _iterator(function(err) {
          if (err) {
            return callback(err);
          }
          iterate();
        });
      } else {
        callback();
      }
    }
  }

  /**
   * @memberof async
   * @namespace doUntil
   */
  function doUntil(iterator, test, callback, thisArg) {
    callback = callback || noop;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    iterate();

    function iterate() {
      _iterator(function(err) {
        if (err) {
          return callback(err);
        }
        if (!test.apply(thisArg, _slice(arguments, 1))) {
          iterate();
        } else {
          callback();
        }
      });
    }
  }

  /**
   * @memberof async
   * @namespace forever
   */
  function forever(iterator, callback, thisArg) {
    callback = callback || noop;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    iterate();

    function iterate() {
      _iterator(function(err) {
        if (err) {
          return callback(err);
        }
        iterate();
      });
    }
  }

  /**
   * @memberof async
   * @namespace compose
   */
  function compose() {
    return seq.apply(null, _reverse(arguments));
  }

  /**
   * @memberof async
   * @namespace seq
   */
  function seq( /* functions... */ ) {
    var fns = arguments;

    return function() {

      var self = this;
      var args = _baseSlice(arguments);
      var callback = args.pop();

      reduce(fns, args, iterator, done);

      function iterator(newargs, fn, callback) {
        var func = function(err) {
          var nextargs = _slice(arguments, 1);
          callback(err, nextargs);
        };
        newargs.push(func);
        fn.apply(self, newargs);
      }

      function done(err, res) {
        res = Array.isArray(res) ? res : [res];
        res.unshift(err);
        callback.apply(self, res);
      }
    };

  }

  function createApplyEach(type) {

    var func = type === 'series' ? eachSeries : each;

    /**
     * @memberof async
     * @namespace applyEach
     */
    return function applyEach(fns /* arguments */ ) {

      var go = function() {
        var self = this;
        var args = _baseSlice(arguments);
        var callback = args.pop() || noop;
        return func(fns, iterator, callback);

        function iterator(fn, done) {
          fn.apply(self, args.concat(done));
        }
      };
      if (arguments.length > 1) {
        var args = _slice(arguments, 1);
        return go.apply(this, args);
      } else {
        return go;
      }
    };
  }

  /**
   * @memberof async
   * @namespace queue
   */
  function queue(worker, concurrency, thisArg) {
    var q = priorityQueue(worker, concurrency, thisArg);
    q.unshift = unshift;
    q.push = push;
    return q;

    function push(tasks, callback) {
      _insert(tasks, callback);
    }

    function unshift(tasks, callback) {
      _insert(tasks, callback, true);
    }

    function _insert(tasks, callback, unshift) {
      q.started = true;
      var _tasks = Array.isArray(tasks) ? tasks : [tasks];

      if (!tasks || !_tasks.length) {
        if (q.idle()) {
          async.nextTick(function() {
            if (typeof q.drain === 'function') {
              q.drain();
            }
          });
        }
        return;
      }

      callback = typeof callback === 'function' ? callback : null;
      _arrayEach(_tasks, function(task) {
        var item = {
          task: task,
          callback: callback
        };
        if (unshift) {
          q.tasks.unshift(item);
        } else {
          q.tasks.push(item);
        }
        if (typeof q.saturated === 'function' && q.length() === q.concurrency) {
          q.saturated();
        }
        async.nextTick(q.process);
      });
    }
  }

  /**
   * @memberof async
   * @namespace priorityQueue
   */
  function priorityQueue(worker, concurrency, thisArg) {
    concurrency = concurrency || 1;
    var workers = 0;
    var q = {
      tasks: [],
      concurrency: concurrency,
      saturated: noop,
      empty: noop,
      drain: noop,
      started: false,
      paused: false,
      push: push,
      kill: kill,
      process: run,
      length: getLength,
      running: running,
      idle: idle,
      pause: pause,
      resume: resume,
      _worker: worker,
      _thisArg: thisArg
    };
    return q;

    function _insert(tasks, priority, callback) {
      q.started = true;
      var _tasks = Array.isArray(tasks) ? tasks : [tasks];

      if (!tasks || !_tasks.length) {
        if (q.idle()) {
          async.nextTick(function() {
            if (typeof q.drain === 'function') {
              q.drain();
            }
          });
        }
        return;
      }

      callback = typeof callback === 'function' ? callback : noop;
      _arrayEach(_tasks, function(task) {
        var item = {
          task: task,
          priority: priority,
          callback: callback
        };
        q.tasks.push(item);
        q.tasks.sort(function(a, b) {
          return a.priority < b.priority ? -1 : 1;
        });
        if (typeof q.saturated === 'function' && q.length() === q.concurrency) {
          q.saturated();
        }
        async.nextTick(q.process);
      });
    }

    function push(tasks, priority, callback) {
      _insert(tasks, priority, callback);
    }

    function kill() {
      q.drain = noop;
      q.tasks = [];
    }

    function run() {
      if (q.paused || workers >= q.concurrency || !q.length()) {
        return;
      }
      var task = q.tasks.shift();
      if (typeof q.empty === 'function' && !q.length()) {
        q.empty();
      }
      workers++;
      var _worker = q._thisArg ? q._worker.bind(q._thisArg) : q._worker;
      _worker(task.task, once(next));

      function next() {
        workers--;
        if (task.callback) {
          task.callback.apply(task, _baseSlice(arguments));
        }
        if (typeof q.drain === 'function' && q.idle()) {
          q.drain();
        }
        q.process();
      }
    }

    function getLength() {
      return q.tasks.length;
    }

    function running() {
      return workers;
    }

    function idle() {
      return q.length() + workers === 0;
    }

    function pause() {
      q.paused = true;
    }

    function resume() {
      if (q.paused === false) {
        return;
      }
      q.paused = false;
      _times(q.concurrency, function() {
        async.setImmediate(q.process);
      });
    }
  }

  /**
   * @memberof async
   * @namespace cargo
   */
  function cargo(worker, payload) {
    var working = false;
    var c = {
      tasks: [],
      payload: payload,
      saturated: noop,
      empty: noop,
      drain: noop,
      drained: true,
      push: push,
      process: run,
      length: getLength,
      running: running
    };
    return c;

    function push(data, callback) {
      data = Array.isArray(data) ? data : [data];
      callback = typeof callback === 'function' ? callback : noop;
      _arrayEach(data, function(task) {
        c.tasks.push({
          data: task,
          callback: callback
        });
        c.drained = false;
        if (typeof c.saturated === 'function' && c.length() === c.payload) {
          c.saturated();
        }
      });
      async.nextTick(c.process);
    }

    function run() {
      if (working) {
        return;
      }
      if (!c.length()) {
        if (typeof c.drain === 'function' && !c.drained) {
          c.drain();
        }
        c.drained = true;
        return;
      }

      var tasks = typeof c.payload === 'number' ? c.tasks.splice(0, payload) : c.tasks;
      var data = _pluck(tasks, 'data');

      if (!c.length() && typeof c.empty === 'function') {
        c.empty();
      }

      working = true;

      worker(data, function() {
        working = false;
        var args = _baseSlice(arguments);
        _arrayEach(tasks, function(data) {
          if (data.callback) {
            data.callback.apply(null, args);
          }
        });
        c.process();
      });
    }

    function getLength() {
      return c.tasks.length;
    }

    function running() {
      return working;
    }
  }

  /**
   * @memberof async
   * @namespace auto
   */
  function auto(tasks, callback) {
    callback = callback ? once(callback) : noop;
    var keys = Object.keys(tasks);
    var remainingTasks = keys.length;
    if (!remainingTasks) {
      return callback();
    }

    var listeners = [];
    var results = {};
    addListener(function() {
      if (!remainingTasks) {
        callback(undefined, results);
      }
    });

    _objectEach(tasks, function(task, key) {
      task = Array.isArray(task) ? task : [task];
      var size = task.length;
      var requires = task.slice(0, size - 1);
      var _task = task[size - 1];
      if (ready()) {
        return _task(done, results);
      }
      addListener(listener);

      function done(err) {
        var args = _slice(arguments, 1);
        if (args.length <= 1) {
          args = args[0];
        }

        if (err) {
          var safeResults = _objectClone(results);
          safeResults[key] = args;
          callback(err, safeResults);
          callback = noop;
          return;
        }
        results[key] = args;
        async.nextTick(taskComplete);
      }

      function ready() {
        return !_has(results, key) && _arrayEvery(requires, function(_key) {
          return _has(results, _key);
        });
      }

      function listener() {
        if (ready()) {
          removeListener(listener);
          _task(done, results);
        }
      }
    }, keys);

    function addListener(fn) {
      listeners.unshift(fn);
    }

    function removeListener(fn) {
      var index = _indexOf(listeners, fn);
      if (index >= 0) {
        listeners.splice(index, 1);
      }
    }

    function taskComplete() {
      remainingTasks--;
      _arrayEach(listeners.slice(0), function(fn) {
        fn();
      });
    }
  }

  /**
   * @memberof async
   * @namespace retry
   */
  function retry(limit, task, callback) {
    var DEFAULT_TIMES = 5;
    if (typeof limit === 'function') {
      callback = task;
      task = limit;
      limit = DEFAULT_TIMES;
    }
    limit = parseInt(limit, 10) || DEFAULT_TIMES;

    return typeof callback === 'function' ? wrappedTask() : wrappedTask;

    function wrappedTask(wrappedCallback, wrappedResults) {
      callback = wrappedCallback || callback || noop;
      var result = {};
      timesSeries(limit, iterator, done);

      function done() {
        var err = result.err;
        var res = result.res;
        callback(err, res);
      }

      function iterator(n, callback) {
        task(function(err, res) {
          result = {
            err: err,
            res: res
          };
          if (!err) {
            return callback(true);
          }
          callback(err && n === (limit - 1));
        }, wrappedResults);
      }
    }
  }

  /**
   * @memberof async
   * @namespace iterator
   */
  function iterator(tasks) {
    var size = 0;
    var keys = [];
    if (Array.isArray(tasks)) {
      size = tasks.length;
    } else {
      keys = Object.keys(tasks);
      size = keys.length;
    }
    return makeCallback(0);

    function makeCallback(index) {
      var fn = function() {
        if (size) {
          var key = keys[index] || index;
          tasks[key].apply(null, _baseSlice(arguments));
        }
        return fn.next();
      };
      fn.next = function() {
        return (index < size - 1) ? makeCallback(index + 1) : null;
      };
      return fn;
    }
  }

  /**
   * @memberof async
   * @namespace apply
   */
  function apply(func) {
    var args = _slice(arguments, 1);
    return function() {
      return func.apply(this, Array.prototype.concat.apply(args, _baseSlice(arguments)));
    };
  }

  /**
   * @memberof async
   * @namespace times
   * @param {number} n - n >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * var iterator = function(n, done) {
   *   done(null, n);
   * };
   * async.times(4, iterator, function(err, res) {
   *   console.log(res); // [0, 1, 2, 3];
   * });
   *
   */
  function times(n, iterator, callback, thisArg) {
    callback = callback || noop;
    n = +n;
    if (isNaN(n) || n < 1) {
      return callback(undefined, []);
    }
    var result = Array(n);
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    _times(n, iterate);

    function iterate(num) {
      _iterator(num, createCallback(num));
    }

    function createCallback(index) {
      var called = false;
      return function(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;
        result[index] = res;

        if (err) {
          callback(err);
          callback = noop;
          return;
        }
        if (--n === 0) {
          callback(undefined, result);
        }
      };
    }
  }

  /**
   * @memberof async
   * @namespace timesSeries
   * @param {number} n - n >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * var iterator = function(n, done) {
   *   done(null, n);
   * };
   * async.timesSeries(4, iterator, function(err, res) {
   *   console.log(res); // [0, 1, 2, 3];
   * });
   *
   */
  function timesSeries(n, iterator, callback, thisArg) {
    callback = callback || noop;
    n = +n;
    if (isNaN(n) || n < 1) {
      return callback(undefined, []);
    }
    var called;
    var result = Array(n);
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    iterate();

    function iterate() {
      called = false;
      _iterator(completed, done);
    }

    function done(err, res) {
      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;
      result[completed] = res;

      if (err) {
        return callback(err);
      }
      if (++completed === n) {
        return callback(undefined, result);
      }
      iterate();
    }
  }

  /**
   * @memberof async
   * @namespace timesLimit
   * @param {number} n - n >= 1
   * @param {number} limit - n >= 1
   * @param {Function} iterator
   * @param {Function} callback
   * @param {*} [thisArg]
   * @example
   *
   * var iterator = function(n, done) {
   *   done(null, n);
   * };
   * async.timesLimit(4, 2, iterator, function(err, res) {
   *   console.log(res); // [0, 1, 2, 3];
   * });
   *
   */
  function timesLimit(n, limit, iterator, callback, thisArg) {
    callback = callback || noop;
    n = +n;
    if (isNaN(n) || n < 1 || isNaN(limit) || limit < 1) {
      return callback(undefined, []);
    }
    var result = Array(n);
    var started = 0;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    _times(limit > n ? n : limit, iterate);

    function iterate() {
      var index = started++;
      if (index >= n) {
        return;
      }
      _iterator(index, createCallback(index));
    }

    function createCallback(index) {
      var called = false;
      return function(err, res) {
        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;
        result[index] = res;

        if (err) {
          callback(err);
          callback = noop;
          return;
        }
        if (++completed === n) {
          callback(undefined, result);
          callback = noop;
          return;
        }
        iterate();
      };
    }
  }

  /**
   * @memberof async
   * @namespace memoize
   */
  function memoize(fn, hasher, thisArg) {
    hasher = hasher || function(hash) {
      return hash;
    };

    var memo = {};
    var queues = {};
    var memoized = function() {
      var args = _baseSlice(arguments);
      var callback = args.pop();
      var key = hasher.apply(null, args);
      if (_has(memo, key)) {
        async.nextTick(function() {
          callback.apply(thisArg, memo[key]);
        });
        return;
      }
      if (_has(queues, key)) {
        return queues[key].push(callback);
      }

      queues[key] = [callback];
      args.push(done);
      fn.apply(thisArg, args);

      function done() {
        var args = _baseSlice(arguments);
        memo[key] = args;
        var q = queues[key];
        delete queues[key];

        var i = -1;
        var length = q.length;
        while (++i < length) {
          q[i].apply(thisArg, args);
        }
      }
    };
    memoized.memo = memo;
    memoized.unmemoized = fn;
    return memoized;
  }

  /**
   * @memberof async
   * @namespace unmemoize
   */
  function unmemoize(fn) {
    return function() {
      return (fn.unmemoized || fn).apply(null, arguments);
    };
  }

  /**
   * @memberof async
   * @namespace createLogger
   */
  function createLogger(name) {
    return function(fn) {
      var args = _slice(arguments, 1);
      args.push(done);
      fn.apply(null, args);
    };

    function done(err) {
      if (objectTypes[typeof console]) {
        if (err) {
          if (console.error) {
            console.error(err);
          }
          return;
        }
        if (console[name]) {
          var args = _slice(arguments, 1);
          _arrayEach(args, function(arg) {
            console[name](arg);
          });
        }
      }
    }
  }

  /**
   * @memberof async
   * @namespace noConflict
   */
  function noConflict() {
    root.async = previos_async;
    return async;
  }

  // base on EventEmitter

  var ONCE = {
    __ONCE__: true
  };

  /**
   * @memberof async
   * @namespace EventEmitter
   */
  function EventEmitter(emitter, limit) {
    this._emitter = emitter || series;
    this._limit = limit || 4;
    this._events = {};
  }

  /**
   * @private
   */
  function createCallback(func) {
    func = func || noop;
    if (func.ONCE === ONCE) {
      return func;
    }
    var callback = function(done) {
      if (func.length) {
        return func(done);
      }
      func();
      done();
    };
    callback.func = func;
    return callback;
  }

  /**
   * @private
   */
  function createOnce(func) {
    func = func || noop;
    var once = function(done) {
      if (func.length) {
        return func(done);
      }
      func();
      done();
    };
    once.func = func;
    once.ONCE = ONCE;
    return once;
  }

  EventEmitter.prototype.getListeners = function(key) {
    var events = this._events;
    if (key) {
      return getTasks(events[key]);
    }
    var allTasks = {};
    _objectEach(events, function(_events, key) {
      allTasks[key] = getTasks(_events);
    });
    return allTasks;

    function getTasks(events) {
      events = events || [];
      var tasks = Array(events.length);
      _arrayEach(events, function(task, index) {
        tasks[index] = task.func;
      });
      return tasks;
    }
  };

  EventEmitter.prototype.addListener = function addListener(key, functions) {
    var self = this;
    if (typeof key === 'object') {
      _objectEach(key, function(func, key) {
        addListener.call(self, key, func);
      });
      return self;
    }

    self._events[key] = self._events[key] || [];
    if (Array.isArray(functions)) {
      _arrayEach(functions, function(func) {
        self._events[key].push(createCallback(func));
      });
    } else {
      self._events[key].push(createCallback(functions));
    }
    return self;
  };

  EventEmitter.prototype.addOnceListener = function addOnceListener(key, functions) {
    var self = this;
    if (typeof key === 'object') {
      _objectEach(key, function(func, key) {
        addOnceListener.call(self, key, func);
      });
      return self;
    }

    if (Array.isArray(functions)) {
      _arrayEach(functions, function(func, index) {
        functions[index] = createOnce(func);
      });
    } else {
      functions = createOnce(functions);
    }
    return self.addListener(key, functions);
  };

  EventEmitter.prototype.removeListener = function removeListener(key, functions) {
    var self = this;
    if (typeof key === 'object') {
      _objectEach(key, function(func, key) {
        removeListener.call(self, key, func);
      });
      return self;
    }

    var events = self._events[key] || [];
    if (!events.length) {
      return self;
    }
    if (Array.isArray(functions)) {
      _arrayEachRight(functions, function(func) {
        removeListener.call(self, func, key);
      });
      return self;
    }

    _arrayEachRight(events, function(event, index) {
      if (event.func === functions) {
        events.splice(index, 1);
      }
    });
    return self;
  };

  EventEmitter.prototype.removeEvent = function removeEvent(key) {
    var self = this;
    if (key) {
      var events = self._events[key] || [];
      if (events.length) {
        delete self._events[key];
      }
    } else {
      self._events = {};
    }
    return self;
  };

  EventEmitter.prototype.emit = function(key, callback, thisArg) {
    callback = callback || noop;
    var events = this._events[key] || [];
    if (!events.length) {
      callback();
      return this;
    }

    var emitter = this._emitter;
    emitter = thisArg ? emitter.bind(thisArg) : emitter;
    if (emitter === parallelLimit) {
      emitter(events, this._limit, done);
    } else {
      emitter(events, done);
    }
    return this;

    function done(err, res) {
      if (err) {
        return callback(err);
      }
      _arrayEachRight(events, function(func, index) {
        if (func.ONCE === ONCE) {
          events.splice(index, 1);
        }
      });
      callback(undefined, res);
    }
  };

  // alias
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.once = EventEmitter.prototype.addOnceListener;
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.removeAllListener = EventEmitter.prototype.removeEvent;
  EventEmitter.prototype.trigger = EventEmitter.prototype.emit;

  /**
   * @memberof async
   * @namespace eventEmitter
   * @param {Object} option
   * @param {Boolean} option.series - default
   * @param {Boolean} option.parallel
   * @param {Boolean} option.parallelLimit
   * @param {Number} option.limit - default 4
   */
  function eventEmitter(option) {
    option = option || {};
    var limit = option.limit;
    if (option.parallel && !limit) {
      return new EventEmitter(parallel);
    }
    if (option.parallel || option.parallelLimit) {
      return new EventEmitter(parallelLimit, limit);
    }
    return new EventEmitter(option.emitter);
  }

}.call(this));
