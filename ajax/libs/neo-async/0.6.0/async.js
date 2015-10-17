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
  var _setImmediate;
  createImmediate();

  var async = {
    VERSION: '0.6.0',

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
    EventEmitter: EventEmitter
  };

  // AMD / RequireJS
  if (objectTypes[typeof define] && define && define.amd) {
    define([], function() {
      return async;
    });
  }
  // Node.js
  else if (objectTypes[typeof module] && module && module.exports) {
    module.exports = async;
  } else if (root && objectTypes[typeof root.async]) {
    root.neo_async = async;
  } else {
    root.async = async;
  }

  // base on lodash
  function _toArray(collection) {

    var keys = Object.keys(collection);
    var index = -1;
    var length = keys.length;
    var result = Array(length);

    while(++index < length) {
      result[index] = collection[keys[index]];
    }

    return result;
  }

  function _baseSlice(array) {

    var index = -1;
    var length = array.length;
    var result = Array(length);

    while(++index < length) {
      result[index] = array[index];
    }
    return result;
  }

  function _slice(array, start) {

    var end = array.length;
    var index = -1;
    var size = end - start;
    if (size <= 0) {
      return [];
    }
    var result = Array(size);

    while(++index < size) {
      result[index] = array[index + start];
    }
    return result;
  }

  function _reverse(array) {

    var index = -1;
    var length = array.length;
    var result = Array(length);

    while(++index < length) {
      result[length - index - 1] = array[index];
    }
    return result;
  }


  function _has(object, key) {

    return object.hasOwnProperty(key);
  }

  function _arrayEach(array, iterator) {

    var index = -1;
    var length = array.length;

    while(++index < length) {
      iterator(array[index], index, array);
    }
    return array;
  }

  function _objectEach(object, iterator, keys) {

    keys = keys || Object.keys(object);

    var index = -1;
    var length = keys.length;

    while(++index < length) {
      var key = keys[index];
      iterator(object[key], key, object);
    }
    return object;
  }

  function _times(n, iterator) {

    var index = -1;
    while(++index < n) {
      iterator(index);
    }
  }

  function _arrayEvery(array, iterator) {

    var length = array.length;
    var index = -1;

    while(++index < length) {
      if (!iterator(array[index])) {
        return false;
      }
    }

    return true;
  }

  function _arrayClone(item) {

    var length = item.length;
    var index = -1;
    var result = Array(length);

    while(++index < length) {
      result[index] = item[index];
    }

    return result;
  }

  function _objectClone(item) {

    var keys = Object.keys(item);
    var length = keys.length;
    var index = -1;
    var result = {};

    while(++index < length) {
      var key = keys[index];
      result[key] = item[key];
    }

    return result;
  }

  function _pluck(array, key) {

    var index = -1;
    var length = array.length;
    var result = Array(length);

    while(++index < length) {
      var item = array[index] || {};
      result[index] = item[key];
    }

    return result;
  }

  function _indexOf(array, value) {

    var index = -1;
    var length = array.length;

    while(++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
  }

  function createImmediate() {

    if (!objectTypes[typeof process] || !process.nextTick) {

      if (objectTypes[typeof setImmediate]) {
        _nextTick = function(func) {
          setImmediate(func);
        };
      } else {
        _nextTick = function(func) {
          setTimeout(func, 0);
        };
      }
      _setImmediate = _nextTick;

    } else {

      _nextTick = process.nextTick;
      if (objectTypes[typeof setImmediate]) {
        _setImmediate = function(func) {
          setImmediate(func);
        };
      } else {
        _setImmediate = _nextTick;
      }
    }

  }

  function once(func) {

    var called = false;

    return function(err, res) {

      if (called) {

        if (err) {
          return func(err, res);
        }
        throw new Error('Callback was already called.');
      }

      called = true;
      func(err, res);
    };
  }

  function each(collection, iterator, callback, thisArg) {

    callback = callback || noop;
    var size;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    var iterate = function(item) {
      _iterator(item, once(done));
    };

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback();
      }
      _arrayEach(collection, iterate);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback();
      }
      _objectEach(collection, iterate, keys);
    } else {
      callback();
    }

    function done(err, bool) {
      if (err) {
        callback(err);
        callback = noop;
        return;
      }
      if (bool === false) {
        callback();
        callback = noop;
        return;
      }
      if (++completed === size) {
        callback();
        callback = noop;
      }
    }

  }

  function eachSeries(collection, iterator, callback, thisArg) {

    callback = callback || noop;
    var size, iterate, called;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback();
      }
      iterate = function() {
        called = false;
        _iterator(collection[completed], done);
      };
    } else if(collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback();
      }
      iterate = function() {
        called = false;
        _iterator(collection[keys[completed]], done);
      };
    } else {
      return callback();
    }

    iterate();

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

  function eachLimit(collection, limit, iterator, callback, thisArg) {

    callback = callback || noop;
    if (isNaN(limit) || limit < 1) {
      return callback();
    }

    var size, iterate;
    var started = 0;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback();
      }
      iterate = function() {
        var index = started++;
        if (index >= size) {
          return;
        }
        _iterator(collection[index], once(done));
      };
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback();
      }
      iterate = function() {
        var index = started++;
        if (index >= size) {
          return;
        }
        _iterator(collection[keys[index]], once(done));
      };
    } else {
      return callback();
    }

    limit = Math.min(limit, size);
    _times(limit, iterate);

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

  function map(collection, iterator, callback, thisArg) {

    callback = callback || noop;
    var size, result;
    var count = 0;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    var iterate = function(item) {
      _iterator(item, createCallback(count++));
    };

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback(null, []);
      }
      result = Array(size);
      _arrayEach(collection, iterate);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback(null, []);
      }
      result = Array(size);
      _objectEach(collection, iterate, keys);
    } else {
      callback(null, []);
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
          callback(null, result);
          callback = noop;
          return;
        }
      };
    }
  }

  function mapSeries(collection, iterator, callback, thisArg) {

    callback = callback || noop;
    var size, result, iterate;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback(null, []);
      }
      result = Array(size);
      iterate = function() {
        _iterator(collection[completed], createCallback(completed));
      };
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback(null, []);
      }
      result = Array(size);
      iterate = function() {
        _iterator(collection[keys[completed]], createCallback(completed));
      };
    } else {
      return callback(null, []);
    }

    iterate();

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
          callback(null, result);
          callback = noop;
          return;
        }
        iterate();
      };
    }

  }

  function mapLimit(collection, limit, iterator, callback, thisArg) {

    callback = callback || noop;
    if (isNaN(limit) || limit < 1) {
      return callback(null, []);
    }

    var size, result, iterate;
    var started = 0;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback(null, []);
      }
      result = Array(size);
      iterate = function() {
        var index = started++;
        if (index >= size) {
          return;
        }
        _iterator(collection[index], createCallback(index));
      };
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback(null, []);
      }
      result = Array(size);
      iterate = function() {
        var index = started++;
        if (index >= size) {
          return;
        }
        _iterator(collection[keys[index]], createCallback(index));
      };
    } else {
      return callback(null, []);
    }
    limit = Math.min(limit, size);
    _times(limit, iterate);

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
          callback(null, result);
          callback = noop;
          return;
        }
        iterate();
      };
    }
  }

  function filter(collection, iterator, callback, thisArg) {

    if (collection && typeof collection === 'object') {
      collection = _toArray(collection);
    }
    pick(collection, iterator, callback, thisArg);
  }

  function filterSeries(collection, iterator, callback, thisArg) {

    if (collection && typeof collection === 'object') {
      collection = _toArray(collection);
    }
    pickSeries(collection, iterator, callback, thisArg);
  }

  function filterLimit(collection, limit, iterator, callback, thisArg) {

    if (collection && typeof collection === 'object') {
      collection = _toArray(collection);
    }
    pickLimit(collection, limit, iterator, callback, thisArg);
  }

  function reject(collection, iterator, callback, thisArg) {

    if (collection && typeof collection === 'object') {
      collection = _toArray(collection);
    }
    pick(collection, iterator, callback, thisArg, true);
  }

  function rejectSeries(collection, iterator, callback, thisArg) {

    if (collection && typeof collection === 'object') {
      collection = _toArray(collection);
    }
    pickSeries(collection, iterator, callback, thisArg, true);
  }

  function rejectLimit(collection, limit, iterator, callback, thisArg) {

    if (collection && typeof collection === 'object') {
      collection = _toArray(collection);
    }
    pickLimit(collection, limit, iterator, callback, thisArg, true);
  }

  function detect(collection, iterator, callback, thisArg, opposite) {

    callback = callback || noop;
    var size;
    var completed = 0;
    var createCallback = getCreateCallback();
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    var iterate = function(item) {
      _iterator(item, createCallback(item));
    };

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback();
      }
      _arrayEach(collection, iterate);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback();
      }
      _objectEach(collection, iterate, keys);
    } else {
      callback();
    }

    function getCreateCallback() {

      return opposite ? everyCallback : detectCallback;

      function everyCallback(item) {

        return function(bool) {

          if (!bool) {
            callback(item);
            callback = noop;
            return;
          }
          if (++completed === size) {
            callback();
            callback = noop;
            return;
          }
        };
      }

      function detectCallback(item) {

        return function(bool) {

          if (bool) {
            callback(item);
            callback = noop;
            return;
          }
          if (++completed === size) {
            callback();
            callback = noop;
            return;
          }
        };
      }

    }

  }

  function detectSeries(collection, iterator, callback, thisArg, opposite) {

    callback = callback || noop;
    var size, iterate, called;
    var completed = 0;
    var createCallback = getCreateCallback();
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback();
      }
      iterate = function() {
        called = false;
        var item = collection[completed];
        _iterator(item, createCallback(item));
      };
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback();
      }
      iterate = function() {
        called = false;
        var item = collection[keys[completed]];
        _iterator(item, createCallback(item));
      };
    } else {
      return callback();
    }

    iterate();

    function getCreateCallback() {

      return opposite ? everyCallback : detectCallback;

      function everyCallback(item) {

        return function(bool) {

          if (called) {
            throw new Error('Callback was already called.');
          }
          called = true;
          if (!bool) {
            return callback(item);
          }
          if (++completed === size) {
            return callback();
          }
          iterate();
        };
      }

      function detectCallback(item) {

        return function(bool) {

          if (called) {
            throw new Error('Callback was already called.');
          }
          called = true;
          if (bool) {
            return callback(item);
          }
          if (++completed === size) {
            return callback();
          }
          iterate();
        };
      }
    }

  }

  function detectLimit(collection, limit, iterator, callback, thisArg, opposite) {

    callback = callback || noop;
    if (isNaN(limit) || limit < 1) {
      return callback();
    }

    var size, iterate;
    var started = 0;
    var completed = 0;
    var createCallback = getCreateCallback();
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback();
      }
      iterate = function() {
        var index = started++;
        if (index >= size) {
          return;
        }
        var item = collection[index];
        _iterator(item, once(createCallback(item)));
      };
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback();
      }
      iterate = function() {
        var index = started++;
        if (index >= size) {
          return;
        }
        var item = collection[keys[index]];
        _iterator(item, once(createCallback(item)));
      };
    } else {
      return callback();
    }
    limit = Math.min(limit, size);
    _times(limit, iterate);

    function getCreateCallback() {

      return opposite ? everyCallback : detectCallback;

      function everyCallback(item) {

        return function(bool) {

          if (!bool) {
            callback(item);
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

      function detectCallback(item) {

        return function(bool) {

          if (bool) {
            callback(item);
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

  }

  function pick(collection, iterator, callback, thisArg, opposite) {

    callback = callback || noop;
    var size;
    var isArray = Array.isArray(collection);
    var result = {};
    var completed = 0;
    var createCallback = getCreateCallback();
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    var iterate = function(item, key) {
      _iterator(item, createCallback(key, item));
    };

    if (isArray) {
      size = collection.length;
      if (!size) {
        return callback([]);
      }
      _arrayEach(collection, iterate);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback({});
      }
      _objectEach(collection, iterate, keys);
    } else {
      callback([]);
    }

    function getCreateCallback() {

      return opposite ? rejectCallback : pickCallback;

      function rejectCallback(key, item) {

        var called = false;

        return function(bool) {

          if (called) {
            throw new Error('Callback was already called.');
          }
          called = true;
          if (!bool) {
            result[key + ''] = item;
          }
          if (++completed === size) {
            callback(isArray ? _toArray(result) : result);
          }
        };
      }

      function pickCallback(key, item) {

        var called = false;

        return function(bool) {

          if (called) {
            throw new Error('Callback was already called.');
          }
          called = true;
          if (bool) {
            result[key + ''] = item;
          }
          if (++completed === size) {
            callback(isArray ? _toArray(result) : result);
          }
        };
      }
    }

  }

  function pickSeries(collection, iterator, callback, thisArg, opposite) {

    callback = callback || noop;
    var size, iterate;
    var isArray = Array.isArray(collection);
    var result = {};
    var completed = 0;
    var createCallback = getCreateCallback();
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (isArray) {
      size = collection.length;
      if (!size) {
        return callback([]);
      }
      iterate = function() {
        var item = collection[completed];
        _iterator(item, createCallback(completed, item));
      };
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback({});
      }
      iterate = function() {
        var key = keys[completed];
        var item = collection[key];
        _iterator(item, createCallback(key, item));
      };
    } else {
      return callback([]);
    }

    iterate();

    function getCreateCallback() {

      return opposite ? rejectCallback : pickCallback;

      function rejectCallback(key, item) {

        var called = false;

        return function(bool) {

          if (called) {
            throw new Error('Callback was already called.');
          }
          called = true;
          if (!bool) {
            result[key + ''] = item;
          }
          if (++completed === size) {
            return callback(isArray ? _toArray(result) : result);
          }
          iterate();
        };
      }

      function pickCallback(key, item) {

        var called = false;

        return function(bool) {

          if (called) {
            throw new Error('Callback was already called.');
          }
          called = true;
          if (bool) {
            result[key + ''] = item;
          }
          if (++completed === size) {
            return callback(isArray ? _toArray(result) : result);
          }
          iterate();
        };
      }
    }
  }

  function pickLimit(collection, limit, iterator, callback, thisArg, opposite) {

    callback = callback || noop;
    if (isNaN(limit) || limit < 1) {
      return callback([]);
    }

    var size, iterate;
    var isArray = Array.isArray(collection);
    var result = {};
    var started = 0;
    var completed = 0;
    var createCallback = getCreateCallback();
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (isArray) {
      size = collection.length;
      if (!size) {
        return callback([]);
      }
      iterate = function() {
        var index = started++;
        if (index >= size) {
          return;
        }
        var item = collection[index];
        _iterator(item, createCallback(index, item));
      };
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback({});
      }
      iterate = function() {
        var index = started++;
        if (index >= size) {
          return;
        }
        var key = keys[index];
        var item = collection[key];
        _iterator(item, createCallback(key, item));
      };
    } else {
      return callback([]);
    }
    limit = Math.min(limit, size);
    _times(limit, iterate);

    function getCreateCallback() {

      return opposite ? rejectCallback : pickCallback;

      function rejectCallback(key, item) {

        var called = false;

        return function(bool) {

          if (called) {
            throw new Error('Callback was already called.');
          }
          called = true;
          if (!bool) {
            result[key + ''] = item;
          }
          if (++completed === size) {
            return callback(isArray ? _toArray(result) : result);
          }
          iterate();
        };
      }

      function pickCallback(key, item) {

        var called = false;

        return function(bool) {

          if (called) {
            throw new Error('Callback was already called.');
          }

          called = true;
          if (bool) {
            result[key + ''] = item;
          }
          if (++completed === size) {
            return callback(isArray ? _toArray(result) : result);
          }
          iterate();
        };
      }

    }

  }

  function reduce(collection, result, iterator, callback, thisArg) {

    callback = callback || noop;
    var size, iterate, called;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback(null, result);
      }
      iterate = function(result) {
        called = false;
        var item = collection[completed];
        _iterator(result, item, done);
      };
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback(null, result);
      }
      iterate = function(result) {
        called = false;
        var key = keys[completed];
        var item = collection[key];
        _iterator(result, item, done);
      };
    } else {
      return callback(null, result);
    }

    iterate(result);

    function done(err, result) {

      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;
      if (err) {
        return callback(err);
      }
      if (++completed === size) {
        return callback(null, result);
      }
      iterate(result);
    }

  }

  function reduceRight(collection, result, iterator, callback, thisArg) {

    callback = callback || noop;
    var size, iterate, called;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback(null, result);
      }
      iterate = function(result) {
        called = false;
        var item = collection[size - completed - 1];
        _iterator(result, item, done);
      };
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback(null, result);
      }
      iterate = function(result) {
        called = false;
        var key = keys[size - completed - 1];
        var item = collection[key];
        _iterator(result, item, done);
      };
    } else {
      return callback(null, result);
    }

    iterate(result);

    function done(err, result) {

      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;
      if (err) {
        return callback(err);
      }
      if (++completed === size) {
        return callback(null, result);
      }
      iterate(result);
    }

  }

  function transform(collection, iterator, callback, accumulator, thisArg) {

    callback = callback || noop;
    var size;
    var isArray = Array.isArray(collection);
    var result = accumulator !== undefined ? accumulator : isArray ? [] : {};
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    var iterate = function(item, key) {
      _iterator(result, item, key, once(done));
    };

    if (isArray) {
      size = collection.length;
      if (!size) {
        return callback(null, result);
      }
      _arrayEach(collection, iterate);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback(null, result);
      }
      _objectEach(collection, iterate, keys);
    } else {
      callback(null, result);
    }

    function done(err, bool) {

      if (err) {
        callback(err, isArray ? _arrayClone(result) : _objectClone(result));
        callback = noop;
        return;
      }
      if (bool === false) {
        callback(null, isArray ? _arrayClone(result) : _objectClone(result));
        callback = noop;
        return;
      }
      if (++completed === size) {
        callback(null, result);
        callback = noop;
        return;
      }
    }

  }

  function transformSeries(collection, iterator, callback, accumulator, thisArg) {

    callback = callback || noop;
    var size, iterate, called;
    var isArray = Array.isArray(collection);
    var result = accumulator !== undefined ? accumulator : isArray ? [] : {};
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (isArray) {
      size = collection.length;
      if (!size) {
        return callback(null, result);
      }
      iterate = function() {
        called = false;
        _iterator(result, collection[completed], completed, done);
      };
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback(null, result);
      }
      iterate = function() {
        called = false;
        var key = keys[completed];
        _iterator(result, collection[key], key, done);
      };
    } else {
      return callback(null, result);
    }

    iterate();

    function done(err, bool) {

      if (called) {
        throw new Error('Callback was already called.');
      }
      called = true;
      if (err) {
        return callback(err, result);
      }
      if (bool === false) {
        return callback(null, result);
      }
      if (++completed === size) {
        return callback(null, result);
      }
      iterate();
    }

  }

  function transformLimit(collection, limit, iterator, callback, accumulator, thisArg) {

    callback = callback || noop;
    var isArray = Array.isArray(collection);
    var result = accumulator !== undefined ? accumulator : isArray ? [] : {};
    if (isNaN(limit) || limit < 1) {
      return callback(null, result);
    }

    var size, iterate;
    var started = 0;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (isArray) {
      size = collection.length;
      if (!size) {
        return callback(null, result);
      }
      iterate = function() {
        var index = started++;
        if (index >= size) {
          return;
        }
        _iterator(result, collection[index], index, once(done));
      };
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback(null, result);
      }
      iterate = function() {
        var index = started++;
        if (index >= size) {
          return;
        }
        var key = keys[index];
        _iterator(result, collection[key], key, once(done));
      };
    } else {
      return callback(null, result);
    }
    limit = Math.min(limit, size);
    _times(limit, iterate);

    function done(err, bool) {

      if (err) {
        callback(err, isArray ? _arrayClone(result) : _objectClone(result));
        callback = noop;
        return;
      }
      if (bool === false) {
        callback(null, isArray ? _arrayClone(result) : _objectClone(result));
        callback = noop;
        return;
      }
      if (++completed === size) {
        callback(null, result);
        callback = noop;
        return;
      }
      iterate();
    }
  }

  function createSortBy(type) {

    switch(type) {
    case 'series':
      return sortBySeries;
    case 'limit':
      return sortByLimit;
    default:
      return sortBy;
    }

    function sortBy(collection, iterator, callback, thisArg) {

      var _iterator = createIterator(iterator, thisArg);
      map(collection, _iterator, createCallback(callback));
    }

    function sortBySeries(collection, iterator, callback, thisArg) {

      var _iterator = createIterator(iterator, thisArg);
      mapSeries(collection, _iterator, createCallback(callback));
    }

    function sortByLimit(collection, limit, iterator, callback, thisArg) {

      var _iterator = createIterator(iterator, thisArg);
      mapLimit(collection, limit, _iterator, createCallback(callback));
    }

    function createIterator(iterator, thisArg) {

      var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

      return function(item, callback) {

        _iterator(item, function(err, criteria) {
          if (err) {
            callback(err);
            callback = noop;
            return;
          }

          callback(null, { item: item, criteria: criteria });
        });
      };
    }

    function createCallback(callback) {

      return function(err, res) {
        if (err) {
          callback(err);
          callback = noop;
          return;
        }

        var result = res.sort(function(a, b) {
          return b.criteria < a.criteria;
        });

        callback(null, _pluck(result, 'item'));
      };
    }

  }

  function some(collection, iterator, callback, thisArg) {

    detect(collection, iterator, done, thisArg);

    function done(res) {

      callback = callback || noop;
      callback(!!res);
    }
  }

  function someSeries(collection, iterator, callback, thisArg) {

    detectSeries(collection, iterator, done, thisArg);

    function done(res) {

      callback = callback || noop;
      callback(!!res);
    }
  }

  function someLimit(collection, limit, iterator, callback, thisArg) {

    detectLimit(collection, limit, iterator, done, thisArg);

    function done(res) {

      callback = callback || noop;
      callback(!!res);
    }
  }

  function every(collection, iterator, callback, thisArg) {

    detect(collection, iterator, done, thisArg, true);

    function done(res) {

      callback = callback || noop;
      callback(!res);
    }
  }

  function everySeries(collection, iterator, callback, thisArg) {

    detectSeries(collection, iterator, done, thisArg, true);

    function done(res) {

      callback = callback || noop;
      callback(!res);
    }
  }

  function everyLimit(collection, limit, iterator, callback, thisArg) {

    detectLimit(collection, limit, iterator, done, thisArg, true);

    function done(res) {

      callback = callback || noop;
      callback(!res);
    }
  }

  function concat(collection, iterator, callback, thisArg) {

    callback = callback || noop;
    var size;
    var result = [];
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    var iterate = function(item) {
      _iterator(item, once(done));
    };

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback(null, result);
      }
      _arrayEach(collection, iterate);
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback(null, result);
      }
      _objectEach(collection, iterate, keys);
    } else {
      callback(null, result);
    }

    function done(err, array) {

      if (array) {
        Array.prototype.push.apply(result, Array.isArray(array) ? array : [array]);
      }
      if (err) {
        callback(err, _arrayClone(result));
        callback = noop;
        return;
      }
      if (++completed === size) {
        callback(null, result);
        callback = noop;
        return;
      }
    }

  }

  function concatSeries(collection, iterator, callback, thisArg) {

    callback = callback || noop;
    var size, iterate, called;
    var result = [];
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback(null, result);
      }
      iterate = function() {
        called = false;
        _iterator(collection[completed], done);
      };
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback(null, result);
      }
      iterate = function() {
        called = false;
        _iterator(collection[keys[completed]], done);
      };
    } else {
      return callback(null, result);
    }
    iterate();

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
        return callback(null, result);
      }
      iterate();
    }

  }

  function concatLimit(collection, limit, iterator, callback, thisArg) {

    callback = callback || noop;
    var result = [];
    if (isNaN(limit) || limit < 1) {
      return callback(null, result);
    }

    var size, iterate;
    var started = 0;
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    if (Array.isArray(collection)) {
      size = collection.length;
      if (!size) {
        return callback(null, result);
      }
      iterate = function() {
        var index = started++;
        if (index >= size) {
          return;
        }
        _iterator(collection[index], once(done));
      };
    } else if (collection && typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      if (!size) {
        return callback(null, result);
      }
      iterate = function() {
        var index = started++;
        if (index >= size) {
          return;
        }
        _iterator(collection[keys[index]], once(done));
      };
    } else {
      return callback(null, result);
    }
    limit = Math.min(limit, size);
    _times(limit, iterate);

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
        callback(null, result);
        callback = noop;
        return;
      }
      iterate();
    }

  }

  function parallel(tasks, callback, thisArg) {

    callback = callback || noop;
    var size, result;
    var completed = 0;

    if (Array.isArray(tasks)) {
      size = tasks.length;
      if (!size) {
        return callback(null, []);
      }
      result = Array(size);
      if (thisArg) {
        _arrayEach(tasks, function(task, index) {
          task.call(thisArg, createCallback(index));
        });
      } else {
        _arrayEach(tasks, function(task, index) {
          task(createCallback(index));
        });
      }
    } else if (tasks && typeof tasks === 'object') {
      var keys = Object.keys(tasks);
      size = keys.length;
      if (!size) {
        return callback(null, {});
      }
      result = {};
      if (thisArg) {
        _objectEach(tasks, function(task, key) {
          task.call(thisArg, createCallback(key));
        }, keys);
      } else {
        _objectEach(tasks, function(task, key) {
          task(createCallback(key));
        }, keys);
      }
    } else {
      callback();
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
        var args = _slice(arguments, 1);
        result[key] = args.length <= 1 ? res : args;
        if (++completed === size) {
          callback(null, result);
          callback = noop;
          return;
        }
      };
    }
  }

  function series(tasks, callback, thisArg) {

    callback = callback || noop;
    var size, result, iterate;
    var completed = 0;

    if (Array.isArray(tasks)) {
      size = tasks.length;
      if (!size) {
        return callback(null, []);
      }
      result = Array(size);
      if (thisArg) {
        iterate = function() {
          tasks[completed].call(thisArg, createCallback(completed));
        };
      } else {
        iterate = function() {
          tasks[completed](createCallback(completed));
        };
      }
    } else if (tasks && typeof tasks === 'object') {
      var keys = Object.keys(tasks);
      size = keys.length;
      if (!size) {
        return callback(null, {});
      }
      result = {};
      if (thisArg) {
        iterate = function() {
          var key = keys[completed];
          tasks[key].call(thisArg, createCallback(key));
        };
      } else {
        iterate = function() {
          var key = keys[completed];
          tasks[key](createCallback(key));
        };
      }
    } else {
      return callback();
    }
    iterate();

    function createCallback(key) {

      var called = false;

      return function(err, res) {

        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;
        if (err) {
          return callback(err, result);
        }
        var args = _slice(arguments, 1);
        result[key] = args.length <= 1 ? res : args;
        if (++completed === size) {
          return callback(null, result);
        }
        iterate();
      };
    }
  }

  function parallelLimit(tasks, limit, callback, thisArg) {

    callback = callback || noop;
    var size, result, iterate;
    var started = 0;
    var completed = 0;

    if (Array.isArray(tasks)) {
      size = tasks.length;
      if (!size) {
        return callback(null, []);
      }
      result = Array(size);
      if (thisArg) {
        iterate = function() {
          var index = started++;
          if (index >= size) {
            return;
          }
          tasks[index].call(thisArg, createCallback(index));
        };
      } else {
        iterate = function() {
          var index = started++;
          if (index >= size) {
            return;
          }
          tasks[index](createCallback(index));
        };
      }
    } else if (tasks && typeof tasks === 'object') {
      var keys = Object.keys(tasks);
      size = keys.length;
      if (!size) {
        return callback(null, {});
      }
      result = {};
      limit = Math.min(limit, size);
      if (thisArg) {
        iterate = function() {
          var index = started++;
          if (index >= size) {
            return;
          }
          var key = keys[index];
          tasks[key].call(thisArg, createCallback(key));
        };
      } else {
        iterate = function() {
          var index = started++;
          if (index >= size) {
            return;
          }
          var key = keys[index];
          tasks[key](createCallback(key));
        };
      }
    } else {
      return callback();
    }
    limit = Math.min(limit, size);
    _times(limit, iterate);

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
        var args = _slice(arguments, 1);
        result[key] = args.length <= 1 ? res : args;
        if (++completed === size) {
          return callback(null, result);
        }
        iterate();
      };
    }
  }

  function waterfall(tasks, callback) {

    callback = callback || noop;
    var size;

    if (!Array.isArray(tasks)) {
      var err = new Error('First argument to waterfall must be an array of functions');
      return callback(err);
    }

    size = tasks.length;
    if (!size) {
      return callback();
    }
    var iterate = function(completed, args) {
      var func = tasks[completed++];
      switch(args.length) {
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
        if (err) {
          return callback(err);
        }
        var _args = _slice(arguments, 1);
        if (completed === size) {
          _args.unshift(null);
          return callback.apply(null, _args);
        }
        _nextTick(function() {
          iterate(completed, _args);
        });
      }
    };
    iterate(0, []);
  }

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

  function doWhilst(iterator, test, callback, thisArg) {

    callback = callback || noop;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    iterate();

    function iterate() {

      _iterator(function(err) {
        if (err) {
          return callback(err);
        }
        var args = _slice(arguments, 1);
        if (test.apply(thisArg, args)) {
          iterate();
        } else {
          callback();
        }
      });
    }

  }

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

  function doUntil(iterator, test, callback, thisArg) {

    callback = callback || noop;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    iterate();

    function iterate() {

      _iterator(function(err) {
        if (err) {
          return callback(err);
        }
        var args = _slice(arguments, 1);
        if (!test.apply(thisArg, args)) {
          iterate();
        } else {
          callback();
        }
      });
    }

  }

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

  function compose() {

    return seq.apply(null, _reverse(arguments));
  }

  function seq(/* functions... */) {

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

    return function applyEach(fns /* arguments */) {

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
          _setImmediate(function() {
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
        _setImmediate(q.process);
      });
    }

  }

  function priorityQueue(worker, concurrency, thisArg) {

    concurrency = concurrency || 1;

    var q = {
      tasks: [],
      concurrency: concurrency,
      saturated: null,
      empty: null,
      drain: null,
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

    var workers = 0;

    return q;

    function _insert(tasks, priority, callback) {

      q.started = true;
      var _tasks = Array.isArray(tasks) ? tasks : [tasks];

      if (!tasks || !_tasks.length) {
        if (q.idle()) {
          _setImmediate(function() {
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
          priority: priority,
          callback: callback
        };

        q.tasks.push(item);
        q.tasks = q.tasks.sort(function(a, b) {
          return b.priority < a.priority;
        });

        if (typeof q.saturated === 'function' && q.length() === q.concurrency) {
          q.saturated();
        }
        _setImmediate(q.process);
      });
    }

    function push(tasks, priority, callback) {

      _insert(tasks, priority, callback);
    }

    function kill() {

      q.drain = null;
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
          task.callback.apply(task, arguments);
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

  function cargo(worker, payload) {

    var c = {
      tasks: [],
      payload: payload,
      saturated: null,
      empty: null,
      drain: null,
      drained: true,
      push: push,
      process: run,
      length: getLength,
      running: running
    };

    var working = false;

    return c;

    function push(data, callback) {

      data = Array.isArray(data) ? data : [data];
      callback = typeof callback === 'function' ? callback : null;

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

      _setImmediate(c.process);
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
        var args = arguments;
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
        callback(null, results);
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
        _setImmediate(taskComplete);
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
          tasks[key].apply(null, arguments);
        }
        return fn.next();
      };
      fn.next = function() {
        return (index < size - 1) ? makeCallback(index + 1) : null;
      };

      return fn;
    }

  }

  function apply(func) {

    var args = _slice(arguments, 1);

    return function() {
      return func.apply(this, Array.prototype.concat.apply(args, _baseSlice(arguments)));
    };
  }


  function times(n, iterator, callback, thisArg) {

    callback = callback || noop;
    if (!Number.isFinite(n) || n < 1) {
      return callback(null, []);
    }
    var result = Array(n);
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    _times(n, function(num) {
      _iterator(num, createCallback(num));
    });

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
          callback(null, result);
          callback = noop;
        }
      };
    }

  }

  function timesSeries(n, iterator, callback, thisArg) {

    callback = callback || noop;
    if (!Number.isFinite(n) || n < 1) {
      return callback(null, []);
    }
    var result = Array(n);
    var completed = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;
    var iterate = function() {
      _iterator(completed, createCallback(completed));
    };

    iterate();

    function createCallback(index) {

      var called = false;

      return function(err, res) {

        if (called) {
          throw new Error('Callback was already called.');
        }
        called = true;
        result[index] = res;

        if (err) {
          return callback(err);
        }
        if (++completed === n) {
          return callback(null, result);
        }
        iterate();
      };
    }

  }

  function timesLimit(n, limit, iterator, callback, thisArg) {

    callback = callback || noop;
    if (!Number.isFinite(n) || n < 1) {
      return callback(null, []);
    }
    var result = Array(n);
    var completed = 0;
    var beforeCompleted = 0;
    var _iterator = thisArg ? iterator.bind(thisArg) : iterator;

    limit = Math.min(limit, n);
    var iterate = function() {
      _times(limit, function(num) {
        var index = beforeCompleted + num;
        if (index >= n) {
          return;
        }
        _iterator(index, createCallback(index));
      });
    };
    iterate();

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
          callback(null, result);
          callback = noop;
          return;
        }
        if (completed >= beforeCompleted + limit) {
          beforeCompleted = completed;
          iterate();
        }
      };
    }

  }

  function memoize(fn, hasher, thisArg) {

    hasher = hasher || function (hash) {
      return hash;
    };

    var memo = {};
    var queues = {};
    var memoized = function() {

      var args = _baseSlice(arguments);
      var callback = args.pop();
      var key = hasher.apply(null, args);
      if (_has(memo, key)) {
        _nextTick(function() {
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
        while(++i < length) {
          q[i].apply(thisArg, args);
        }
      }
    };

    memoized.memo = memo;
    memoized.unmemoized = fn;

    return memoized;

  }

  function unmemoize(fn) {

    return function() {

      return (fn.unmemoized || fn).apply(null, arguments);
    };
  }

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

  function noConflict() {

    root.async = previos_async;
    return async;
  }

  function EventEmitter(emitter, limit) {

    this._emitter = emitter || series;
    this._limit = limit || 4;
    this._events = {};
    this._once = [];
  }

  EventEmitter.prototype.on = function on(key, callback) {

    var self = this;
    if (typeof key === 'object') {
      _objectEach(key, function(func, key) {
        on.call(self, key, func);
      });
    } else {
      self._events[key] = self._events[key] || [];
      if (Array.isArray(callback)) {
        Array.prototype.push.apply(self._events[key], callback);
      } else {
        self._events[key].push(callback);
      }
    }
    return self;
  };

  EventEmitter.prototype.once = function once(key, callback) {

    var self = this;
    if (typeof key === 'object') {
      _objectEach(key, function(func, key) {
        once.call(self, key, func);
      });
    } else {
      if (Array.isArray(callback)) {
        Array.prototype.push.apply(self._once, callback);
      } else {
        self._once.push(callback);
      }
      self.on(key, callback);
    }
    return self;
  };

  EventEmitter.prototype.emit = function(key, callback, thisArg) {

    callback = callback || noop;
    var self = this;
    var events = self._events[key] || [];
    if (!events.length) {
      return callback();
    }

    var emitter = self._emitter;
    emitter = thisArg ? emitter.bind(thisArg) : emitter;
    if (emitter === parallelLimit) {
      emitter(events, self._limit, done);
    } else {
      emitter(events, done);
    }
    return self;

    function done(err, res) {

      _arrayEach(self._once, function(func) {
        var index = _indexOf(events, func);
        if (0 <= index) {
          events.splice(index, 1);
        }
      });
      self._once = [];
      callback(err, res);
    }
  };

  /**
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

