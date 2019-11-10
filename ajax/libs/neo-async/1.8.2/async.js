(function() {

  'use strict';

  var root = this;
  var previos_async = root && root.async;
  var noop = function noop() {};
  var throwError = function throwError() {
    throw new Error('Callback was already called.');
  };

  var objectTypes = {
    'function': true,
    'object': true
  };
  var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;

  var _nextTick;
  var _safeNextTick;
  var _setImmediate;
  createImmediate();

  /**
   * @memberof async
   * @namespace each
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
   * @example
   *
   * // break
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num !== 2);
   *   }, num * 10);
   * };
   * async.each(array, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [1, 2]
   * });
   *
   */
  var each = createEach(arrayEach, baseEach, symbolEach);

  /**
   * @memberof async
   * @namespace map
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var map = createMap(arrayEachIndex, baseEachIndex, symbolEachIndex, true);

  /**
   * @memberof async
   * @namespace mapValues
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var mapValues = createMap(arrayEachIndex, baseEachKey, symbolEachKey, false);

  /**
   * @memberof async
   * @namespace filter
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var filter = createFilter(arrayEachIndexValue, baseEachIndexValue, symbolEachIndexValue, true);

  /**
   * @memberof async
   * @namespace filterSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var filterSeries = createFilterSeries(true);

  /**
   * @memberof async
   * @namespace filterLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
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
  var filterLimit = createFilterLimit(true);

  /**
   * @memberof async
   * @namespace reject
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var reject = createFilter(arrayEachIndexValue, baseEachIndexValue, symbolEachIndexValue, false);

  /**
   * @memberof async
   * @namespace rejectSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var rejectSeries = createFilterSeries(false);

  /**
   * @memberof async
   * @namespace rejectLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
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
  var rejectLimit = createFilterLimit(false);

  /**
   * @memberof async
   * @namespace detect
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var detect = createDetect(arrayEachValue, baseEachValue, symbolEachValue, true);

  /**
   * @memberof async
   * @namespace detectSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var detectSeries = createDetectSeries(true);

  /**
   * @memberof async
   * @namespace detectLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
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
  var detectLimit = createDetectLimit(true);

  /**
   * @memberof async
   * @namespace every
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var every = createEvery(arrayEachValue, baseEachValue, symbolEachValue);

  /**
   * @memberof async
   * @namespace everySeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var everySeries = createEverySeries();

  /**
   * @memberof async
   * @namespace everyLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
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
  var everyLimit = createEveryLimit();

  /**
   * @memberof async
   * @namespace pick
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var pick = createPick(arrayEachIndexValue, baseEachKeyValue, symbolEachKeyValue, true);

  /**
   * @memberof async
   * @namespace pickSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var pickSeries = createPickSeries(true);

  /**
   * @memberof async
   * @namespace pickLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
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
  var pickLimit = createPickLimit(true);

  /**
   * @memberof async
   * @namespace omit
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
   * async.omit(array, iterator, function(err, res) {
   *   console.log(res); // { '2': 2, '3': 4 }
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
   * async.omit(array, iterator, function(err, res) {
   *   console.log(res); // { '2': 2, '3': 4 }
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
   * async.omit(array, iterator, function(res) {
   *   console.log(res); // { '2': 2, '3': 4 }
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
   * async.omit(array, iterator, function(res) {
   *   console.log(res); // { '2': 2, '3': 4 }
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
   * async.omit(object, iterator, function(err, res) {
   *   console.log(res); // { c: 2, d: 4 }
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
   * async.omit(object, iterator, function(err, res) {
   *   console.log(res); // { c: 2, d: 4 }
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
   * async.omit(object, iterator, function(res) {
   *   console.log(res); // { c: 2, d: 4 }
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
   * async.omit(object, iterator, function(res) {
   *   console.log(res); // { c: 2, d: 4 }
   *   console.log(order); // [[1, 'a'], [2, 'c'], [3, 'b'], [4, 'd']]
   * });
   *
   */
  var omit = createPick(arrayEachIndexValue, baseEachKeyValue, symbolEachKeyValue, false);

  /**
   * @memberof async
   * @namespace omitSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
   * async.omitSeries(array, iterator, function(err, res) {
   *   console.log(res); // { '2': 2, '3': 4 }
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
   * async.omitSeries(array, iterator, function(err, res) {
   *   console.log(res); // { '2': 2, '3': 4 }
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
   * async.omitSeries(array, iterator, function(res) {
   *   console.log(res); // { '2': 2, '3': 4 }
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
   * async.omitSeries(array, iterator, function(res) {
   *   console.log(res); // { '2': 2, '3': 4 }
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
   * async.omitSeries(object, iterator, function(err, res) {
   *   console.log(res); // { c: 2, d: 4 }
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
   * async.omitSeries(object, iterator, function(err, res) {
   *   console.log(res); // { c: 2, d: 4 }
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
   * async.omitSeries(object, iterator, function(res) {
   *   console.log(res); // { c: 2, d: 4 }
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
   * async.omitSeries(object, iterator, function(res) {
   *   console.log(res); // { c: 2, d: 4 }
   *   console.log(order); // [[1, 'a'], [3, 'b'], [2, 'c'], [4, 'd']]
   * });
   *
   */
  var omitSeries = createPickSeries(false);

  /**
   * @memberof async
   * @namespace omitLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
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
   * async.omitLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // { '3': 4, '4': 2 }
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
   * async.omitLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // { '3': 4, '4': 2 }
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
   * async.omitLimit(array, 2, iterator, function(res) {
   *   console.log(res); // { '3': 4, '4': 2 }
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
   * async.omitLimit(array, 2, iterator, function(res) {
   *   console.log(res); // { '3': 4, '4': 2 }
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
   * async.omitLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // { d: 4, e: 2 }
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
   * async.omitLimit(object, 2, iterator, function(err, res) {
   *   console.log(res); // { d: 4, e: 2 }
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
   * async.omitLimit(object, 2, iterator, function(res) {
   *   console.log(res); // { d: 4, e: 2 }
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
   * async.omitLimit(object, 2, iterator, function(res) {
   *   console.log(res); // { d: 4, e: 2 }
   *   console.log(order); // [[1, 'a'], [3, 'c'], [5, 'b'], [2, 'e'], [4, 'd']]
   * });
   */
  var omitLimit = createPickLimit(false);

  /**
   * @memberof async
   * @namespace transform
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {Array|Object} [accumulator]
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
   *   console.log(order); // [[1, 'a'], [2, 'c'], [3, 'b'], [4, 'd']]
   * });
   *
   */
  var transform = createTransform(arrayEachResult, baseEachResult, symbolEachResult);

  /**
   * @memberof async
   * @namespace sortBy
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var sortBy = createSortBy(arrayEachValue, baseEachValue, symbolEachValue);

  /**
   * @memberof async
   * @namespace concat
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  var concat = createConcat(arrayEach, baseEach, symbolEach);

  /**
   * @memberof async
   * @namespace parallel
   * @param {Array|Object} tasks - functions
   * @param {Function} callback
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
  var parallel = createParallel(arrayEachFunc, baseEachFunc);

  /**
   * @memberof async
   * @namespace race
   * @param {Array|Object} tasks - functions
   * @param {Function} callback
   * @example
   *
   * // array
   * var called = 0;
   * var tasks = [
   *   function(done) {
   *     setTimeout(function() {
   *       called++;
   *       done(null, '1');
   *     }, 30);
   *   },
   *   function(done) {
   *     setTimeout(function() {
   *       called++;
   *       done(null, '2');
   *     }, 20);
   *   },
   *   function(done) {
   *     setTimeout(function() {
   *       called++;
   *       done(null, '3');
   *     }, 10);
   *   }
   * ];
   * async.race(tasks, function(err, res) {
   *   console.log(res); // '3'
   *   console.log(called); // 1
   *   setTimeout(function() {
   *     console.log(called); // 3
   *   }, 50);
   * });
   *
   * @example
   *
   * // object
   * var called = 0;
   * var tasks = {
   *   'test1': function(done) {
   *     setTimeout(function() {
   *       called++;
   *       done(null, '1');
   *     }, 30);
   *   },
   *   'test2': function(done) {
   *     setTimeout(function() {
   *       called++;
   *       done(null, '2');
   *     }, 20);
   *   },
   *   'test3': function(done) {
   *     setTimeout(function() {
   *       called++;
   *       done(null, '3');
   *     }, 10);
   *   }
   * };
   * async.race(tasks, function(err, res) {
   *   console.log(res); // '3'
   *   console.log(called); // 1
   *   setTimeout(function() {
   *     console.log(called); // 3
   *     done();
   *   }, 50);
   * });
   *
   */
  var race = createRace();

  /**
   * @version 1.8.2
   * @namespace async
   */
  var index = {
    VERSION: '1.8.2',

    // Collections
    each: each,
    eachSeries: eachSeries,
    eachLimit: eachLimit,
    forEach: each,
    forEachSeries: eachSeries,
    forEachLimit: eachLimit,
    eachOf: each,
    eachOfSeries: eachSeries,
    eachOfLimit: eachLimit,
    forEachOf: each,
    forEachOfSeries: eachSeries,
    forEachOfLimit: eachLimit,
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
    omit: omit,
    omitSeries: omitSeries,
    omitLimit: omitLimit,
    reduce: reduce,
    inject: reduce,
    foldl: reduce,
    reduceRight: reduceRight,
    foldr: reduceRight,
    transform: transform,
    transformSeries: transformSeries,
    transformLimit: transformLimit,
    sortBy: sortBy,
    sortBySeries: sortBySeries,
    sortByLimit: sortByLimit,
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
    angelFall: angelFall,
    angelfall: angelFall,
    whilst: whilst,
    doWhilst: doWhilst,
    until: until,
    doUntil: doUntil,
    during: during,
    doDuring: doDuring,
    forever: forever,
    compose: compose,
    seq: seq,
    applyEach: createApplyEach(each),
    applyEachSeries: createApplyEach(eachSeries),
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
    timeout: timeout,
    times: times,
    timesSeries: timesSeries,
    timesLimit: timesLimit,
    race: race,

    // Utils
    memoize: memoize,
    unmemoize: unmemoize,
    ensureAsync: ensureAsync,
    constant: constant,
    asyncify: asyncify,
    wrapSync: asyncify,
    log: createLogger('log'),
    dir: createLogger('dir'),
    createLogger: createLogger,
    noConflict: noConflict,
    eventEmitter: eventEmitter,
    EventEmitter: EventEmitter,

    safe: undefined
  };

  index.safe = safe();

  var async = {
    VERSION: index.VERSION,

    'default': index,

    // Collections
    each: each,
    eachSeries: eachSeries,
    eachLimit: eachLimit,
    forEach: each,
    forEachSeries: eachSeries,
    forEachLimit: eachLimit,
    eachOf: each,
    eachOfSeries: eachSeries,
    eachOfLimit: eachLimit,
    forEachOf: each,
    forEachOfSeries: eachSeries,
    forEachOfLimit: eachLimit,
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
    omit: omit,
    omitSeries: omitSeries,
    omitLimit: omitLimit,
    reduce: reduce,
    inject: reduce,
    foldl: reduce,
    reduceRight: reduceRight,
    foldr: reduceRight,
    transform: transform,
    transformSeries: transformSeries,
    transformLimit: transformLimit,
    sortBy: sortBy,
    sortBySeries: sortBySeries,
    sortByLimit: sortByLimit,
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
    angelFall: angelFall,
    angelfall: angelFall,
    whilst: whilst,
    doWhilst: doWhilst,
    until: until,
    doUntil: doUntil,
    during: during,
    doDuring: doDuring,
    forever: forever,
    compose: compose,
    seq: seq,
    applyEach: createApplyEach(each),
    applyEachSeries: createApplyEach(eachSeries),
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
    timeout: timeout,
    times: times,
    timesSeries: timesSeries,
    timesLimit: timesLimit,
    race: race,

    // Utils
    memoize: memoize,
    unmemoize: unmemoize,
    ensureAsync: ensureAsync,
    constant: constant,
    asyncify: asyncify,
    wrapSync: asyncify,
    log: createLogger('log'),
    dir: createLogger('dir'),
    createLogger: createLogger,
    noConflict: noConflict,
    eventEmitter: eventEmitter,
    EventEmitter: EventEmitter,

    safe: index.safe
  };

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

  /**
   * @private
   */
  function createImmediate() {
    var delay = function delay(fn) {
      setTimeout(fn, 0);
    };
    _setImmediate = typeof setImmediate === 'function' ? setImmediate : delay;
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      _nextTick = _safeNextTick = /^v0.10/.test(process.version) ? _setImmediate : process.nextTick;
    } else {
      _nextTick = _safeNextTick = _setImmediate;
    }
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
    var size = array.length;
    var result = Array(size);

    while (++index < size) {
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
    var size = array.length;
    var result = [];

    while (++index < size) {
      var value = array[index];
      if (value) {
        result[result.length] = value;
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
    var size = array.length;
    var result = Array(size);
    var resIndex = size;

    while (++index < size) {
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
   */
  function arrayEach(array, iterator, callback) {
    var index = -1;
    var size = array.length;

    if (iterator.length === 3) {
      while (++index < size) {
        iterator(array[index], index, once(callback));
      }
    } else {
      while (++index < size) {
        iterator(array[index], once(callback));
      }
    }
  }

  /**
   * @private
   */
  function baseEach(object, iterator, callback, keys) {
    var key;
    var index = -1;
    var size = keys.length;

    if (iterator.length === 3) {
      while (++index < size) {
        key = keys[index];
        iterator(object[key], key, once(callback));
      }
    } else {
      while (++index < size) {
        iterator(object[keys[index]], once(callback));
      }
    }
  }

  /**
   * @private
   */
  function symbolEach(collection, iterator, callback) {
    var iter = collection[iteratorSymbol]();
    var item;
    if (iterator.length === 3) {
      while ((item = iter.next()).done === false) {
        iterator(item.value[1], item.value[0], callback);
      }
    } else {
      while ((item = iter.next()).done === false) {
        iterator(item.value[1], callback);
      }
    }
  }

  /**
   * @private
   */
  function arrayEachResult(array, result, iterator, callback) {
    var index = -1;
    var size = array.length;

    if (iterator.length === 4) {
      while (++index < size) {
        iterator(result, array[index], index, once(callback));
      }
    } else {
      while (++index < size) {
        iterator(result, array[index], once(callback));
      }
    }
  }

  /**
   * @private
   */
  function baseEachResult(object, result, iterator, callback, keys) {
    var key;
    var index = -1;
    var size = keys.length;

    if (iterator.length === 4) {
      while (++index < size) {
        key = keys[index];
        iterator(result, object[key], key, once(callback));
      }
    } else {
      while (++index < size) {
        iterator(result, object[keys[index]], once(callback));
      }
    }
  }

  /**
   * @private
   */
  function symbolEachResult(collection, result, iterator, callback) {
    var item;
    var iter = collection[iteratorSymbol]();

    if (iterator.length === 4) {
      while ((item = iter.next()).done === false) {
        iterator(result, item.value[1], item.value[0], once(callback));
      }
    } else {
      while ((item = iter.next()).done === false) {
        iterator(result, item.value[1], once(callback));
      }
    }
  }

  /**
   * @private
   */
  function arrayEachFunc(array, createCallback) {
    var index = -1;
    var size = array.length;

    while (++index < size) {
      array[index](createCallback(index));
    }
  }

  /**
   * @private
   */
  function baseEachFunc(object, createCallback, keys) {
    var key;
    var index = -1;
    var size = keys.length;

    while (++index < size) {
      key = keys[index];
      object[key](createCallback(key));
    }
  }

  /**
   * @private
   */
  function arrayEachIndex(array, iterator, createCallback) {
    var index = -1;
    var size = array.length;

    if (iterator.length === 3) {
      while (++index < size) {
        iterator(array[index], index, createCallback(index));
      }
    } else {
      while (++index < size) {
        iterator(array[index], createCallback(index));
      }
    }
  }

  /**
   * @private
   */
  function baseEachIndex(object, iterator, createCallback, keys) {
    var key;
    var index = -1;
    var size = keys.length;

    if (iterator.length === 3) {
      while (++index < size) {
        key = keys[index];
        iterator(object[key], key, createCallback(index));
      }
    } else {
      while (++index < size) {
        iterator(object[keys[index]], createCallback(index));
      }
    }
  }

  /**
   * @private
   */
  function symbolEachIndex(collection, iterator, createCallback) {
    var values;
    var index = -1;
    var size = collection.size;
    var iter = collection[iteratorSymbol]();

    if (iterator.length === 3) {
      while (++index < size) {
        values = iter.next().value;
        iterator(values[1], values[0], createCallback(index));
      }
    } else {
      while (++index < size) {
        iterator(iter.next().value[1], createCallback(index));
      }
    }
  }

  /**
   * @private
   */
  function baseEachKey(object, iterator, createCallback, keys) {
    var key;
    var index = -1;
    var size = keys.length;

    if (iterator.length === 3) {
      while (++index < size) {
        key = keys[index];
        iterator(object[key], key, createCallback(key));
      }
    } else {
      while (++index < size) {
        key = keys[index];
        iterator(object[key], createCallback(key));
      }
    }
  }

  /**
   * @private
   */
  function symbolEachKey(collection, iterator, createCallback) {
    var item, key;
    var iter = collection[iteratorSymbol]();

    if (iterator.length === 3) {
      while ((item = iter.next()).done === false) {
        key = item.value[0];
        iterator(item.value[1], key, createCallback(key));
      }
    } else {
      while ((item = iter.next()).done === false) {
        iterator(item.value[1], createCallback(item.value[0]));
      }
    }
  }

  /**
   * @private
   */
  function arrayEachValue(array, iterator, createCallback) {
    var value;
    var index = -1;
    var size = array.length;

    if (iterator.length === 3) {
      while (++index < size) {
        value = array[index];
        iterator(value, index, createCallback(value));
      }
    } else {
      while (++index < size) {
        value = array[index];
        iterator(value, createCallback(value));
      }
    }
  }

  /**
   * @private
   */
  function baseEachValue(object, iterator, createCallback, keys) {
    var key, value;
    var index = -1;
    var size = keys.length;

    if (iterator.length === 3) {
      while (++index < size) {
        key = keys[index];
        value = object[key];
        iterator(value, key, createCallback(value));
      }
    } else {
      while (++index < size) {
        value = object[keys[index]];
        iterator(value, createCallback(value));
      }
    }
  }

  /**
   * @private
   */
  function symbolEachValue(collection, iterator, createCallback) {
    var value, item;
    var iter = collection[iteratorSymbol]();

    if (iterator.length === 3) {
      while ((item = iter.next()).done === false) {
        value = item.value[1];
        iterator(value, item.value[0], createCallback(value));
      }
    } else {
      while ((item = iter.next()).done === false) {
        value = item.value[1];
        iterator(value, createCallback(value));
      }
    }
  }

  /**
   * @private
   */
  function arrayEachIndexValue(array, iterator, createCallback) {
    var value;
    var index = -1;
    var size = array.length;

    if (iterator.length === 3) {
      while (++index < size) {
        value = array[index];
        iterator(value, index, createCallback(index, value));
      }
    } else {
      while (++index < size) {
        value = array[index];
        iterator(value, createCallback(index, value));
      }
    }
  }

  /**
   * @private
   */
  function baseEachIndexValue(object, iterator, createCallback, keys) {
    var key, value;
    var index = -1;
    var size = keys.length;

    if (iterator.length === 3) {
      while (++index < size) {
        key = keys[index];
        value = object[key];
        iterator(value, key, createCallback(index, value));
      }
    } else {
      while (++index < size) {
        value = object[keys[index]];
        iterator(value, createCallback(index, value));
      }
    }
  }

  /**
   * @private
   */
  function symbolEachIndexValue(collection, iterator, createCallback) {
    var key, value, item;
    var index = -1;
    var iter = collection[iteratorSymbol]();

    if (iterator.length === 3) {
      while ((item = iter.next()).done === false) {
        key = item.value[0];
        value = item.value[1];
        iterator(value, key, createCallback(++index, value));
      }
    } else {
      while ((item = iter.next()).done === false) {
        value = item.value[1];
        iterator(value, createCallback(++index, value));
      }
    }
  }

  /**
   * @private
   */
  function baseEachKeyValue(object, iterator, createCallback, keys) {
    var key, value;
    var index = -1;
    var size = keys.length;

    if (iterator.length === 3) {
      while (++index < size) {
        key = keys[index];
        value = object[key];
        iterator(value, key, createCallback(key, value));
      }
    } else {
      while (++index < size) {
        key = keys[index];
        value = object[key];
        iterator(value, createCallback(key, value));
      }
    }
  }

  /**
   * @private
   */
  function symbolEachKeyValue(collection, iterator, createCallback) {
    var key, value, item;
    var iter = collection[iteratorSymbol]();

    if (iterator.length === 3) {
      while ((item = iter.next()).done === false) {
        key = item.value[0];
        value = item.value[1];
        iterator(value, key, createCallback(key, value));
      }
    } else {
      while ((item = iter.next()).done === false) {
        value = item.value[1];
        iterator(value, createCallback(item.value[0], value));
      }
    }
  }

  /**
   * @private
   * @param {Array} array - The array to iterate over.
   * @param {Function} iterator - The function invoked per iteration.
   */
  function _arrayEach(array, iterator) {
    var index = -1;
    var size = array.length;

    while (++index < size) {
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
    var size = array.length;

    while (size--) {
      iterator(array[size], size);
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
    var size = keys.length;

    while (++index < size) {
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
    var size = array.length;
    var index = -1;

    while (++index < size) {
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
    var size = array.length;
    var index = -1;
    var result = Array(size);

    while (++index < size) {
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
    var size = keys.length;
    var index = -1;
    var result = {};

    while (++index < size) {
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
    var size = array.length;
    var result = Array(size);

    while (++index < size) {
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
    var size = array.length;

    while (++index < size) {
      if (array[index] === value) {
        return index;
      }
    }
  }

  /**
   * @private
   * @param {Object} a
   * @param {Object} b
   */
  function sortIterator(a, b) {
    return a.criteria - b.criteria;
  }

  /**
   * @private
   * @param {Function} func
   */
  function once(func) {
    return function(err, res) {
      if (func === null) {
        throwError();
      }
      func(err, res);
      func = null;
    };
  }

  /**
   * for node v0.10.x
   * @memberof async
   * @namespace safe
   */
  function safe() {
    var iteratorRegExp = new RegExp('^(each|foreach|map|filter|select|reject|detect|pick|reduce|inject|fold|transform|sortby|some|any|every|all|concat|times)|(whilst|until|during)$|^forever$');
    var zeroIndexRegExp = new RegExp(/^do|^forever$/);
    var secondIndexRegExp = new RegExp(/^reduce|Limit$/);
    var safeTaskRegExp = new RegExp(/^parallel|^(series|waterfall|auto)$/);

    var safeAsync = {};
    _objectEach(index, function(func, key) {
      if (typeof func !== 'function') {
        safeAsync[key] = func;
        return;
      }

      // tasks
      if (safeTaskRegExp.test(key)) {
        return createSafeTasks(func, key);
      }

      // iterator
      if (iteratorRegExp.test(key.toLowerCase())) {
        return createSafeIterator(func, key);
      }
      // unavaiable safe fucntion
      safeAsync[key] = func;
    });
    safeAsync.safe = safe;
    return safeAsync;

    function createSafeIterator(func, key) {
      var index = zeroIndexRegExp.test(key) ? 0 : secondIndexRegExp.test(key) ? 2 : 1;
      var funcLength = func.length;
      safeAsync[key] = safeCollection;

      function safeCollection() {
        var items = _baseSlice(arguments);
        var iterator = items[index];
        switch (iterator.length) {
          case 1:
            items[index] = function(done) {
              async.safeNextTick(function() {
                iterator(done);
              });
            };
            break;
          case 2:
            items[index] = function(arg1, done) {
              async.safeNextTick(function() {
                iterator(arg1, done);
              });
            };
            break;
          case 3:
            items[index] = function(arg1, arg2, done) {
              async.safeNextTick(function() {
                iterator(arg1, arg2, done);
              });
            };
            break;
          case 4:
            items[index] = function(arg1, arg2, arg3, done) {
              async.safeNextTick(function() {
                iterator(arg1, arg2, arg3, done);
              });
            };
            break;
          default:
            items[index] = function() {
              var args = _baseSlice(arguments);
              async.safeNextTick(function() {
                iterator.apply(null, args);
              });
            };
            break;
        }

        switch (funcLength) {
          case 2:
            return func(items[0], items[1]);
          case 3:
            return func(items[0], items[1], items[2]);
          case 4:
            return func(items[0], items[1], items[2], items[3]);
          case 5:
            return func(items[0], items[1], items[2], items[3], items[4]);
        }
      }
    }

    function createSafeTasks(func, key) {
      var index = 0;
      if (/^waterfall$/.test(key)) {
        safeAsync[key] = safeWaterfall;
        return;
      }
      var funcLength = func.length;
      safeAsync[key] = safeTasks;

      function safeTasks() {
        var items = _baseSlice(arguments);
        var tasks = items[index];
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
        }

        function createSafeFunction(task) {
          if (typeof task !== 'function') {
            return task;
          }
          return function safeFuncion() {
            var args = _baseSlice(arguments);
            async.safeNextTick(function() {
              task.apply(null, args);
            });
          };
        }
      }
    }
  }

  /**
   * @private
   * @param {Function} arrayEach
   * @param {Function} baseEach
   */
  function createEach(arrayEach, baseEach, symbolEach) {

    return function each(collection, iterator, callback) {
      callback = callback || noop;
      var size, keys;
      var completed = 0;
      if (Array.isArray(collection)) {
        size = collection.length;
        arrayEach(collection, iterator, done);
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        symbolEach(collection, iterator, done);
      } else if (typeof collection === 'object') {
        keys = Object.keys(collection);
        size = keys.length;
        baseEach(collection, iterator, done, keys);
      }
      if (!size) {
        callback();
      }

      function done(err, bool) {
        if (err) {
          callback(err);
          callback = noop;
        } else if (++completed === size) {
          callback();
        } else if (bool === false) {
          callback();
          callback = noop;
        }
      }
    };
  }

  /**
   * @private
   * @param {Funciton} arrayEach
   * @param {Funciton} baseEach
   * @param {Funciton} symbolEach
   */
  function createMap(arrayEach, baseEach, symbolEach, isArray) {

    var init, clone;
    if (isArray) {
      init = Array;
      clone = _arrayClone;
    } else {
      init = function() {
        return {};
      };
      clone = _objectClone;
    }

    return function(collection, iterator, callback) {
      callback = callback || noop;
      var size, keys, result;
      var completed = 0;

      if (Array.isArray(collection)) {
        size = collection.length;
        result = init(size);
        arrayEach(collection, iterator, createCallback);
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        result = init(size);
        symbolEach(collection, iterator, createCallback);
      } else if (typeof collection === 'object') {
        keys = Object.keys(collection);
        size = keys.length;
        result = init(size);
        baseEach(collection, iterator, createCallback, keys);
      }
      if (!size) {
        callback(undefined, init());
      }

      function createCallback(index) {
        return function done(err, res) {
          if (index === null) {
            throwError();
          }
          result[index] = res;
          index = null;
          if (err) {
            callback(err, clone(result));
            callback = noop;
          } else if (++completed === size) {
            callback(undefined, result);
          }
        };
      }
    };
  }

  /**
   * @private
   * @param {Function} arrayEach
   * @param {Function} baseEach
   * @param {Function} symbolEach
   * @param {boolean} bool
   */
  function createFilter(arrayEach, baseEach, symbolEach, bool) {

    return function commonFilter(collection, iterator, callback) {
      callback = callback || noop;
      var size, keys, result;
      var completed = 0;
      var enableError = callback.length === 2;
      var createCallback = enableError ? createFilterCallbackWithError : createFilterCallback;

      if (Array.isArray(collection)) {
        size = collection.length;
        result = Array(size);
        arrayEach(collection, iterator, createCallback);
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        result = Array(size);
        symbolEach(collection, iterator, createCallback);
      } else if (typeof collection === 'object') {
        keys = Object.keys(collection);
        size = keys.length;
        result = Array(size);
        baseEach(collection, iterator, createCallback, keys);
      }
      if (!size) {
        return enableError ? callback(undefined, []) : callback([]);
      }

      function createFilterCallback(index, value) {
        return function done(res) {
          if (index === null) {
            throwError();
          }
          if (!!res === bool) {
            result[index] = value;
          }
          index = null;
          if (++completed === size) {
            callback(_compact(result));
          }
        };
      }

      function createFilterCallbackWithError(index, value) {
        return function done(err, res) {
          if (index === null) {
            throwError();
          }
          if (err) {
            callback(err, _compact(result));
            callback = noop;
            index = null;
            return;
          }
          if (!!res === bool) {
            result[index] = value;
          }
          index = null;
          if (++completed === size) {
            callback(undefined, _compact(result));
          }
        };
      }
    };
  }

  /**
   * @private
   * @param {boolean} bool
   */
  function createFilterSeries(bool) {

    return function commonFilterSeries(collection, iterator, callback) {
      callback = callback || noop;
      var size, key, value, keys, iter, values, iterate;
      var sync = true;
      var completed = 0;
      var result = [];
      var enableError = callback.length === 2;
      var done = enableError ? filterCallbackWithError : filterCallback;

      if (Array.isArray(collection)) {
        size = collection.length;
        iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        iter = collection[iteratorSymbol]();
        iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
      } else if (typeof collection === 'object') {
        keys = Object.keys(collection);
        size = keys.length;
        iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
      }
      if (!size) {
        return enableError ? callback(undefined, []) : callback([]);
      }
      iterate();
      sync = false;

      function arrayIterator() {
        value = collection[completed];
        iterator(value, done);
      }

      function arrayIteratorWithIndex() {
        value = collection[completed];
        iterator(value, completed, done);
      }

      function symbolIterator() {
        value = iter.next().value[1];
        iterator(value, done);
      }

      function symbolIteratorWithKey() {
        values = iter.next().value;
        value = values[1];
        iterator(value, values[0], done);
      }

      function objectIterator() {
        key = keys[completed];
        value = collection[key];
        iterator(value, done);
      }

      function objectIteratorWithKey() {
        key = keys[completed];
        value = collection[key];
        iterator(value, key, done);
      }

      function filterCallback(res) {
        if (!!res === bool) {
          result[result.length] = value;
        }
        if (++completed >= size) {
          callback(result);
          callback = throwError;
        } else if (sync) {
          async.nextTick(iterate);
        } else {
          iterate();
        }
      }

      function filterCallbackWithError(err, res) {
        if (err) {
          callback(err, result);
          callback = throwError;
          return;
        }
        if (!!res === bool) {
          result[result.length] = value;
        }
        if (++completed >= size) {
          callback(undefined, result);
          callback = throwError;
        } else if (sync) {
          async.nextTick(iterate);
        } else {
          iterate();
        }
      }
    };
  }

  /**
   * @private
   * @param {boolean} bool
   */
  function createFilterLimit(bool) {

    return function commonFilterLimit(collection, limit, iterator, callback) {
      callback = callback || noop;
      var size, index, key, value, keys, iter, item, iterate, result;
      var sync = true;
      var started = 0;
      var completed = 0;
      var enableError = callback.length === 2;
      var createCallback = enableError ? filterCallbackWithError : filterCallback;

      if (Array.isArray(collection)) {
        size = collection.length;
        iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        iter = collection[iteratorSymbol]();
        iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
      } else if (typeof collection === 'object') {
        keys = Object.keys(collection);
        size = keys.length;
        iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
      }
      if (!size || isNaN(limit) || limit < 1) {
        return enableError ? callback(undefined, []) : callback([]);
      }
      result = Array(size);
      _times(limit > size ? size : limit, iterate);
      sync = false;

      function arrayIterator() {
        index = started++;
        if (index < size) {
          value = collection[index];
          iterator(value, createCallback(value, index));
        }
      }

      function arrayIteratorWithIndex() {
        index = started++;
        if (index < size) {
          value = collection[index];
          iterator(value, index, createCallback(value, index));
        }
      }

      function symbolIterator() {
        if ((item = iter.next()).done === false) {
          value = item.value[1];
          iterator(value, createCallback(value, ++started));
        }
      }

      function symbolIteratorWithKey() {
        if ((item = iter.next()).done === false) {
          value = item.value[1];
          iterator(value, item.value[0], createCallback(value, ++started));
        }
      }

      function objectIterator() {
        index = started++;
        if (index < size) {
          value = collection[keys[index]];
          iterator(value, createCallback(value, index));
        }
      }

      function objectIteratorWithKey() {
        index = started++;
        if (index < size) {
          key = keys[index];
          value = collection[key];
          iterator(value, key, createCallback(value, index));
        }
      }

      function filterCallback(value, index) {
        return function(res) {
          if (index === null) {
            throwError();
          }
          if (!!res === bool) {
            result[index] = value;
          }
          index = null;
          if (++completed >= size) {
            callback(_compact(result));
            callback = throwError;
          } else if (sync) {
            async.nextTick(iterate);
          } else {
            iterate();
          }
        };
      }

      function filterCallbackWithError(value, index) {
        return function(err, res) {
          if (index === null) {
            throwError();
          }
          if (err) {
            callback(err, _compact(result));
            callback = noop;
            iterate = noop;
            index = null;
            return;
          }
          if (!!res === bool) {
            result[index] = value;
          }
          index = null;
          if (++completed === size) {
            callback(undefined, _compact(result));
            callback = throwError;
          } else if (sync) {
            async.nextTick(iterate);
          } else {
            iterate();
          }
        };
      }
    };
  }

  /**
   * @memberof async
   * @namespace eachSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
   * @example
   *
   * // break
   * var order = [];
   * var array = [1, 3, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num !== 3);
   *   }, num * 10);
   * };
   * async.eachSeries(array, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [1, 3]
   * });
   */
  function eachSeries(collection, iterator, callback) {
    callback = callback || noop;
    var size, key, keys, iter, values, iterate;
    var sync = true;
    var completed = 0;

    if (Array.isArray(collection)) {
      size = collection.length;
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      size = collection.size;
      iter = collection[iteratorSymbol]();
      iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
    } else if (typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    }
    if (!size) {
      return callback();
    }
    iterate();
    sync = false;

    function arrayIterator() {
      iterator(collection[completed], done);
    }

    function arrayIteratorWithIndex() {
      iterator(collection[completed], completed, done);
    }

    function symbolIterator() {
      iterator(iter.next().value[1], done);
    }

    function symbolIteratorWithKey() {
      values = iter.next().value;
      iterator(values[1], values[0], done);
    }

    function objectIterator() {
      iterator(collection[keys[completed]], done);
    }

    function objectIteratorWithKey() {
      key = keys[completed];
      iterator(collection[key], key, done);
    }

    function done(err, bool) {
      if (err) {
        callback(err);
      } else if (++completed >= size) {
        callback();
        callback = throwError;
      } else if (bool === false) {
        callback();
      } else if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
    }
  }

  /**
   * @memberof async
   * @namespace eachLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
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
   * @example
   *
   * // break
   * var order = [];
   * var array = [1, 5, 3, 4, 2];
   * var iterator = function(num, done) {
   *   setTimeout(function() {
   *     order.push(num);
   *     done(null, num !== 5);
   *   }, num * 10);
   * };
   * async.eachLimit(array, 2, iterator, function(err, res) {
   *   console.log(res); // undefined
   *   console.log(order); // [1, 3, 5]
   * });
   *
   */
  function eachLimit(collection, limit, iterator, callback) {
    callback = callback || noop;
    var size, index, key, keys, iter, item, iterate;
    var sync = false;
    var started = 0;
    var completed = 0;

    if (Array.isArray(collection)) {
      size = collection.length;
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      size = collection.size;
      iter = collection[iteratorSymbol]();
      iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
    } else if (typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    } else {
      return callback();
    }
    if (!size || isNaN(limit) || limit < 1) {
      return callback();
    }
    _times(limit > size ? size : limit, iterate);
    sync = true;

    function arrayIterator() {
      if (started < size) {
        iterator(collection[started++], done);
      }
    }

    function arrayIteratorWithIndex() {
      index = started++;
      if (index < size) {
        iterator(collection[index], index, done);
      }
    }

    function symbolIterator() {
      if ((item = iter.next()).done === false) {
        iterator(item.value[1], done);
      }
    }

    function symbolIteratorWithKey() {
      if ((item = iter.next()).done === false) {
        iterator(item.value[1], item.value[0], done);
      }
    }

    function objectIterator() {
      if (started < size) {
        iterator(collection[keys[started++]], done);
      }
    }

    function objectIteratorWithKey() {
      index = started++;
      if (index < size) {
        key = keys[index];
        iterator(collection[key], key, done);
      }
    }

    function done(err, bool) {
      if (err) {
        callback(err);
        callback = noop;
        iterate = noop;
      } else if (++completed >= size) {
        callback();
        callback = throwError;
      } else if (bool === false) {
        callback();
        callback = noop;
      } else if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
    }
  }

  /**
   * @memberof async
   * @namespace mapSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  function mapSeries(collection, iterator, callback) {
    callback = callback || noop;
    var size, key, keys, iter, values, result, iterate;
    var sync = true;
    var completed = 0;

    if (Array.isArray(collection)) {
      size = collection.length;
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      size = collection.size;
      iter = collection[iteratorSymbol]();
      iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
    } else if (typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    }
    if (!size) {
      return callback(undefined, []);
    }
    result = Array(size);
    iterate();
    sync = false;

    function arrayIterator() {
      iterator(collection[completed], done);
    }

    function arrayIteratorWithIndex() {
      iterator(collection[completed], completed, done);
    }

    function symbolIterator() {
      iterator(iter.next().value[1], done);
    }

    function symbolIteratorWithKey() {
      values = iter.next().value;
      iterator(values[1], values[0], done);
    }

    function objectIterator() {
      iterator(collection[keys[completed]], done);
    }

    function objectIteratorWithKey() {
      key = keys[completed];
      iterator(collection[key], key, done);
    }

    function done(err, res) {
      result[completed] = res;
      if (err) {
        callback(err, _arrayClone(result));
        callback = throwError;
      } else if (++completed >= size) {
        callback(undefined, result);
        callback = throwError;
      } else if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
    }
  }

  /**
   * @memberof async
   * @namespace mapLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
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
  function mapLimit(collection, limit, iterator, callback) {
    callback = callback || noop;
    var size, index, key, keys, iter, item, result, iterate;
    var sync = true;
    var started = 0;
    var completed = 0;

    if (Array.isArray(collection)) {
      size = collection.length;
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      size = collection.size;
      iter = collection[iteratorSymbol]();
      iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
    } else if (typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    }
    if (!size || isNaN(limit) || limit < 1) {
      return callback(undefined, []);
    }
    result = Array(size);
    _times(limit > size ? size : limit, iterate);
    sync = false;

    function arrayIterator() {
      index = started++;
      if (index < size) {
        iterator(collection[index], createCallback(index));
      }
    }

    function arrayIteratorWithIndex() {
      index = started++;
      if (index < size) {
        iterator(collection[index], index, createCallback(index));
      }
    }

    function symbolIterator() {
      if ((item = iter.next()).done === false) {
        iterator(item.value[1], createCallback(started++));
      }
    }

    function symbolIteratorWithKey() {
      if ((item = iter.next()).done === false) {
        iterator(item.value[1], item.value[0], createCallback(started++));
      }
    }

    function objectIterator() {
      index = started++;
      if (index < size) {
        iterator(collection[keys[index]], createCallback(index));
      }
    }

    function objectIteratorWithKey() {
      index = started++;
      if (index < size) {
        key = keys[index];
        iterator(collection[key], key, createCallback(index));
      }
    }

    function createCallback(index) {
      return function(err, res) {
        if (index === null) {
          throwError();
        }
        result[index] = res;
        index = null;
        if (err) {
          callback(err, _arrayClone(result));
          callback = noop;
          iterate = noop;
        } else if (++completed >= size) {
          callback(undefined, result);
          callback = throwError;
        } else if (sync) {
          async.nextTick(iterate);
        } else {
          sync = true;
          iterate();
        }
        sync = false;
      };
    }
  }

  /**
   * @memberof async
   * @namespace mapValuesSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  function mapValuesSeries(collection, iterator, callback) {
    callback = callback || noop;
    var size, key, keys, iter, values, iterate;
    var sync = true;
    var result = {};
    var completed = 0;

    if (Array.isArray(collection)) {
      size = collection.length;
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      size = collection.size;
      iter = collection[iteratorSymbol]();
      iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
    } else if (typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    }
    if (!size) {
      return callback(undefined, result);
    }
    iterate();
    sync = false;

    function arrayIterator() {
      key = completed;
      iterator(collection[completed], done);
    }

    function arrayIteratorWithIndex() {
      key = completed;
      iterator(collection[completed], completed, done);
    }

    function symbolIterator() {
      values = iter.next().value;
      key = values[0];
      iterator(values[1], done);
    }

    function symbolIteratorWithKey() {
      values = iter.next().value;
      key = values[0];
      iterator(values[1], key, done);
    }

    function objectIterator() {
      key = keys[completed];
      iterator(collection[key], done);
    }

    function objectIteratorWithKey() {
      key = keys[completed];
      iterator(collection[key], key, done);
    }

    function done(err, res) {
      result[key] = res;
      if (err) {
        callback(err, _objectClone(result));
        callback = throwError;
      } else if (++completed >= size) {
        callback(undefined, result);
        callback = throwError;
      } else if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
    }
  }

  /**
   * @memberof async
   * @namespace mapValuesLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
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
  function mapValuesLimit(collection, limit, iterator, callback) {
    callback = callback || noop;
    var size, index, key, keys, iter, item, iterate;
    var sync = true;
    var result = {};
    var started = 0;
    var completed = 0;

    if (Array.isArray(collection)) {
      size = collection.length;
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      size = collection.size;
      iter = collection[iteratorSymbol]();
      iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
    } else if (typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    }
    if (!size || isNaN(limit) || limit < 1) {
      return callback(undefined, result);
    }
    _times(limit > size ? size : limit, iterate);
    sync = false;

    function arrayIterator() {
      index = started++;
      if (index < size) {
        iterator(collection[index], createCallback(index));
      }
    }

    function arrayIteratorWithIndex() {
      index = started++;
      if (index < size) {
        iterator(collection[index], index, createCallback(index));
      }
    }

    function symbolIterator() {
      if ((item = iter.next()).done === false) {
        iterator(item.value[1], createCallback(item.value[0]));
      }
    }

    function symbolIteratorWithKey() {
      if ((item = iter.next()).done === false) {
        key = item.value[0];
        iterator(item.value[1], key, createCallback(key));
      }
    }

    function objectIterator() {
      index = started++;
      if (index < size) {
        key = keys[index];
        iterator(collection[key], createCallback(key));
      }
    }

    function objectIteratorWithKey() {
      index = started++;
      if (index < size) {
        key = keys[index];
        iterator(collection[key], key, createCallback(key));
      }
    }

    function createCallback(key) {
      return function(err, res) {
        if (key === null) {
          throwError();
        }
        result[key] = res;
        key = null;
        if (err) {
          callback(err, _objectClone(result));
          callback = noop;
          iterate = noop;
        } else if (++completed >= size) {
          callback(undefined, result);
          callback = throwError;
        } else if (sync) {
          async.nextTick(iterate);
        } else {
          sync = true;
          iterate();
        }
        sync = false;
      };
    }
  }

  /**
   * @private
   * @param {Function} arrayEach
   * @param {Function} baseEach
   * @param {Function} symbolEach
   * @param {boolean} bool
   */
  function createDetect(arrayEach, baseEach, symbolEach, bool) {

    return function detect(collection, iterator, callback) {
      callback = callback || noop;
      var size, keys;
      var completed = 0;
      var createCallback = callback.length === 2 ? createCollectionCallbackWithError : createCollectionCallback;

      if (Array.isArray(collection)) {
        size = collection.length;
        arrayEach(collection, iterator, createCallback);
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        symbolEach(collection, iterator, createCallback);
      } else if (typeof collection === 'object') {
        keys = Object.keys(collection);
        size = keys.length;
        baseEach(collection, iterator, createCallback, keys);
      }
      if (!size) {
        callback();
      }

      function createCollectionCallback(value) {
        var called = false;
        return function done(res) {
          if (called) {
            throwError();
          }
          called = true;
          if (!!res === bool) {
            callback(value);
            callback = noop;
          } else if (++completed === size) {
            callback();
            callback = throwError;
          }
        };
      }

      function createCollectionCallbackWithError(value) {
        var called = false;
        return function done(err, res) {
          if (called) {
            throwError();
          }
          called = true;
          if (err) {
            callback(err);
            callback = noop;
          } else if (!!res === bool) {
            callback(undefined, value);
            callback = noop;
          } else if (++completed === size) {
            callback();
            callback = throwError;
          }
        };
      }
    };
  }

  /**
   * @private
   * @param {boolean} bool
   */
  function createDetectSeries(bool) {

    return function detectSeries(collection, iterator, callback) {
      callback = callback || noop;
      var size, key, value, keys, iter, values, iterate;
      var sync = true;
      var completed = 0;
      var done = callback.length === 2 ? detectCallbackWithError : detectCallback;

      if (Array.isArray(collection)) {
        size = collection.length;
        iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        iter = collection[iteratorSymbol]();
        iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
      } else if (typeof collection === 'object') {
        keys = Object.keys(collection);
        size = keys.length;
        iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
      }
      if (!size) {
        return callback();
      }
      iterate();
      sync = false;

      function arrayIterator() {
        value = collection[completed];
        iterator(value, done);
      }

      function arrayIteratorWithIndex() {
        value = collection[completed];
        iterator(value, completed, done);
      }

      function symbolIterator() {
        value = iter.next().value[1];
        iterator(value, done);
      }

      function symbolIteratorWithKey() {
        values = iter.next().value;
        value = values[1];
        iterator(value, values[0], done);
      }

      function objectIterator() {
        value = collection[keys[completed]];
        iterator(value, done);
      }

      function objectIteratorWithKey() {
        key = keys[completed];
        value = collection[key];
        iterator(value, key, done);
      }

      function detectCallback(res) {
        if (!!res === bool) {
          callback(value);
          callback = throwError;
        } else if (++completed >= size) {
          callback();
          callback = throwError;
        } else if (sync) {
          async.nextTick(iterate);
        } else {
          sync = true;
          iterate();
        }
        sync = false;
      }

      function detectCallbackWithError(err, res) {
        if (err) {
          callback(err);
          callback = throwError;
        } else if (!!res === bool) {
          callback(undefined, value);
          callback = throwError;
        } else if (++completed >= size) {
          callback();
          callback = throwError;
        } else if (sync) {
          async.nextTick(iterate);
        } else {
          sync = true;
          iterate();
        }
        sync = false;
      }
    };
  }

  /**
   * @private
   * @param {boolean} bool
   */
  function createDetectLimit(bool) {

    return function detectLimit(collection, limit, iterator, callback) {
      callback = callback || noop;
      var size, index, key, value, keys, iter, item, iterate;
      var sync = true;
      var started = 0;
      var completed = 0;
      var createCallback = callback.length === 2 ? detectCallbackWithError : detectCallback;

      if (Array.isArray(collection)) {
        size = collection.length;
        iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        iter = collection[iteratorSymbol]();
        iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
      } else if (typeof collection === 'object') {
        keys = Object.keys(collection);
        size = keys.length;
        iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
      }
      if (!size || isNaN(limit) || limit < 1) {
        return callback();
      }
      _times(limit > size ? size : limit, iterate);
      sync = false;

      function arrayIterator() {
        index = started++;
        if (index < size) {
          value = collection[index];
          iterator(value, createCallback(value));
        }
      }

      function arrayIteratorWithIndex() {
        index = started++;
        if (index < size) {
          value = collection[index];
          iterator(value, index, createCallback(value));
        }
      }

      function symbolIterator() {
        if ((item = iter.next()).done === false) {
          value = item.value[1];
          iterator(value, createCallback(value));
        }
      }

      function symbolIteratorWithKey() {
        if ((item = iter.next()).done === false) {
          value = item.value[1];
          iterator(value, item.value[0], createCallback(value));
        }
      }

      function objectIterator() {
        index = started++;
        if (index < size) {
          value = collection[keys[index]];
          iterator(value, createCallback(value));
        }
      }

      function objectIteratorWithKey() {
        if (started < size) {
          key = keys[started++];
          value = collection[key];
          iterator(value, key, createCallback(value));
        }
      }

      function detectCallback(value) {
        var called = false;
        return function(res) {
          if (called) {
            throwError();
          }
          called = true;
          if (!!res === bool) {
            callback(value);
            callback = noop;
            iterate = noop;
          } else if (++completed >= size) {
            callback();
            callback = throwError;
          } else if (sync) {
            async.nextTick(iterate);
          } else {
            sync = true;
            iterate();
          }
          sync = false;
        };
      }

      function detectCallbackWithError(value) {
        var called = false;
        return function(err, res) {
          if (called) {
            throwError();
          }
          called = true;
          if (err) {
            callback(err);
            callback = noop;
            iterate = noop;
          } else if (!!res === bool) {
            callback(undefined, value);
            callback = noop;
            iterate = noop;
          } else if (++completed >= size) {
            callback();
            callback = throwError;
          } else if (sync) {
            async.nextTick(iterate);
          } else {
            sync = true;
            iterate();
          }
          sync = false;
        };
      }
    };
  }

  /**
   * @private
   * @param {Function} arrayEach
   * @param {Function} baseEach
   * @param {Function} symbolEach
   * @param {boolean} bool
   */
  function createPick(arrayEach, baseEach, symbolEach, bool) {

    return function commonPick(collection, iterator, callback) {
      callback = callback || noop;
      var size, keys;
      var completed = 0;
      var result = {};
      var enableError = callback.length === 2;
      var createCallback = enableError ? createPickCallbackWithError : createPickCallback;

      if (Array.isArray(collection)) {
        size = collection.length;
        arrayEach(collection, iterator, createCallback);
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        symbolEach(collection, iterator, createCallback);
      } else if (typeof collection === 'object') {
        keys = Object.keys(collection);
        size = keys.length;
        baseEach(collection, iterator, createCallback, keys);
      }
      if (!size) {
        return enableError ? callback(undefined, {}) : callback({});
      }

      function createPickCallback(key, value) {
        return function done(res) {
          if (key === null) {
            throwError();
          }
          if (!!res === bool) {
            result[key] = value;
          }
          key = null;
          if (++completed === size) {
            callback(result);
          }
        };
      }

      function createPickCallbackWithError(key, value) {
        return function done(err, res) {
          if (key === null) {
            throwError();
          }
          if (err) {
            callback(err, _objectClone(result));
            callback = noop;
            key = null;
            return;
          }
          if (!!res === bool) {
            result[key] = value;
          }
          key = null;
          if (++completed === size) {
            callback(undefined, result);
            callback = throwError;
          }
        };
      }
    };
  }

  /**
   * @private
   * @param {boolean} bool
   */
  function createPickSeries(bool) {

    return function commonPickSeries(collection, iterator, callback) {
      callback = callback || noop;
      var size, key, value, keys, iter, values, iterate;
      var sync = true;
      var result = {};
      var completed = 0;
      var enableError = callback.length === 2;
      var done = enableError ? pickCallbackWithError : pickCallback;

      if (Array.isArray(collection)) {
        size = collection.length;
        iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        iter = collection[iteratorSymbol]();
        iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
      } else if (typeof collection === 'object') {
        keys = Object.keys(collection);
        size = keys.length;
        iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
      }
      if (!size) {
        return enableError ? callback(undefined, {}) : callback({});
      }
      iterate();
      sync = false;

      function arrayIterator() {
        key = completed;
        value = collection[completed];
        iterator(value, done);
      }

      function arrayIteratorWithIndex() {
        key = completed;
        value = collection[completed];
        iterator(value, completed, done);
      }

      function symbolIterator() {
        values = iter.next().value;
        key = values[0];
        value = values[1];
        iterator(value, done);
      }

      function symbolIteratorWithKey() {
        values = iter.next().value;
        key = values[0];
        value = values[1];
        iterator(value, key, done);
      }

      function objectIterator() {
        key = keys[completed];
        value = collection[key];
        iterator(value, done);
      }

      function objectIteratorWithKey() {
        key = keys[completed];
        value = collection[key];
        iterator(value, key, done);
      }

      function pickCallback(res) {
        if (!!res === bool) {
          result[key] = value;
        }
        if (++completed >= size) {
          callback(result);
          callback = throwError;
        } else if (sync) {
          async.nextTick(iterate);
        } else {
          sync = true;
          iterate();
        }
        sync = false;
      }

      function pickCallbackWithError(err, res) {
        if (err) {
          callback(err, result);
          callback = throwError;
          return;
        }
        if (!!res === bool) {
          result[key] = value;
        }
        if (++completed >= size) {
          callback(undefined, result);
          callback = throwError;
        } else if (sync) {
          async.nextTick(iterate);
        } else {
          sync = true;
          iterate();
        }
        sync = false;
      }
    };
  }

  /**
   * @private
   * @param {boolean} bool
   */
  function createPickLimit(bool) {

    return function commonPickLimit(collection, limit, iterator, callback) {
      callback = callback || noop;
      var size, index, key, value, keys, iter, item, iterate;
      var sync = true;
      var result = {};
      var started = 0;
      var completed = 0;
      var enableError = callback.length === 2;
      var createCallback = enableError ? createPickCallbackWithError : createPickCallback;

      if (Array.isArray(collection)) {
        size = collection.length;
        iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        iter = collection[iteratorSymbol]();
        iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
      } else if (typeof collection === 'object') {
        keys = Object.keys(collection);
        size = keys.length;
        iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
      }
      if (!size || isNaN(limit) || limit < 1) {
        return enableError ? callback(undefined, {}) : callback({});
      }
      _times(limit > size ? size : limit, iterate);
      sync = false;

      function arrayIterator() {
        index = started++;
        if (index < size) {
          value = collection[index];
          iterator(value, createCallback(value, index));
        }
      }

      function arrayIteratorWithIndex() {
        index = started++;
        if (index < size) {
          value = collection[index];
          iterator(value, index, createCallback(value, index));
        }
      }

      function symbolIterator() {
        if ((item = iter.next()).done === false) {
          value = item.value[1];
          iterator(value, createCallback(value, item.value[0]));
        }
      }

      function symbolIteratorWithKey() {
        if ((item = iter.next()).done === false) {
          key = item.value[0];
          value = item.value[1];
          iterator(value, key, createCallback(value, key));
        }
      }

      function objectIterator() {
        if (started < size) {
          key = keys[started++];
          value = collection[key];
          iterator(value, createCallback(value, key));
        }
      }

      function objectIteratorWithKey() {
        if (started < size) {
          key = keys[started++];
          value = collection[key];
          iterator(value, key, createCallback(value, key));
        }
      }

      function createPickCallback(value, key) {
        return function(res) {
          if (key === null) {
            throwError();
          }
          if (!!res === bool) {
            result[key] = value;
          }
          key = null;
          if (++completed >= size) {
            callback(result);
            callback = throwError;
          } else if (sync) {
            async.nextTick(iterate);
          } else {
            sync = true;
            iterate();
          }
          sync = false;
        };
      }

      function createPickCallbackWithError(value, key) {
        return function(err, res) {
          if (key === null) {
            throwError();
          }
          if (err) {
            callback(err, _objectClone(result));
            callback = noop;
            iterate = noop;
            key = null;
            return;
          }
          if (!!res === bool) {
            result[key] = value;
          }
          key = null;
          if (++completed >= size) {
            callback(undefined, result);
            callback = throwError;
          } else if (sync) {
            async.nextTick(iterate);
          } else {
            sync = true;
            iterate();
          }
          sync = false;
        };
      }
    };
  }

  /**
   * @memberof async
   * @namespace reduce
   * @param {Array|Object} collection
   * @param {*} result
   * @param {Function} iterator
   * @param {Function} callback
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
  function reduce(collection, result, iterator, callback) {
    callback = callback || noop;
    var size, key, value, keys, iter, values, iterate;
    var sync = true;
    var completed = 0;

    if (Array.isArray(collection)) {
      size = collection.length;
      iterate = iterator.length === 4 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      size = collection.size;
      iter = collection[iteratorSymbol]();
      iterate = iterator.length === 4 ? symbolIteratorWithKey : symbolIterator;
    } else if (typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      iterate = iterator.length === 4 ? objectIteratorWithKey : objectIterator;
    }
    if (!size) {
      return callback(undefined, result);
    }
    iterate(result);
    sync = false;

    function arrayIterator(result) {
      value = collection[completed];
      iterator(result, value, done);
    }

    function arrayIteratorWithIndex(result) {
      value = collection[completed];
      iterator(result, value, completed, done);
    }

    function symbolIterator() {
      iterator(result, iter.next().value[1], done);
    }

    function symbolIteratorWithKey() {
      values = iter.next().value;
      iterator(result, values[1], values[0], done);
    }

    function objectIterator(result) {
      key = keys[completed];
      value = collection[key];
      iterator(result, value, done);
    }

    function objectIteratorWithKey(result) {
      key = keys[completed];
      value = collection[key];
      iterator(result, value, key, done);
    }

    function done(err, result) {
      if (err) {
        callback(err, result);
        callback = throwError;
      } else if (++completed >= size) {
        callback(undefined, result);
        callback = throwError;
      } else if (sync) {
        async.nextTick(function() {
          iterate(result);
        });
      } else {
        sync = true;
        iterate(result);
      }
      sync = false;
    }
  }

  /**
   * @memberof async
   * @namespace reduceRight
   * @param {Array|Object} collection
   * @param {*} result
   * @param {Function} iterator
   * @param {Function} callback
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
  function reduceRight(collection, result, iterator, callback) {
    callback = callback || noop;
    var resIndex, index, key, value, keys, iter, item, col, iterate;
    var sync = true;

    if (Array.isArray(collection)) {
      resIndex = collection.length;
      iterate = iterator.length === 4 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      resIndex = collection.size;
      keys = Array(resIndex);
      iter = collection[iteratorSymbol]();
      index = -1;
      col = {};
      while ((item = iter.next()).done === false) {
        key = item.value[0];
        col[key] = item.value[1];
        keys[++index] = key;
      }
      collection = col;
      iterate = iterator.length === 4 ? objectIteratorWithKey : objectIterator;
    } else if (typeof collection === 'object') {
      keys = Object.keys(collection);
      resIndex = keys.length;
      iterate = iterator.length === 4 ? objectIteratorWithKey : objectIterator;
    }
    if (!resIndex) {
      return callback(undefined, result);
    }
    iterate(result);
    sync = false;

    function arrayIterator(result) {
      value = collection[--resIndex];
      iterator(result, value, done);
    }

    function arrayIteratorWithIndex(result) {
      index = --resIndex;
      value = collection[index];
      iterator(result, value, index, done);
    }

    function objectIterator(result) {
      key = keys[--resIndex];
      value = collection[key];
      iterator(result, value, done);
    }

    function objectIteratorWithKey(result) {
      key = keys[--resIndex];
      value = collection[key];
      iterator(result, value, key, done);
    }

    function done(err, result) {
      if (err) {
        callback(err, result);
        callback = throwError;
      } else if (resIndex <= 0) {
        callback(undefined, result);
        callback = throwError;
      } else if (sync) {
        async.nextTick(function() {
          iterate(result);
        });
      } else {
        sync = true;
        iterate(result);
      }
      sync = false;
    }
  }

  /**
   * @private
   * @param {Function} arrayEach
   * @param {Function} baseEach
   * @param {Function} symbolEach
   */
  function createTransform(arrayEach, baseEach, symbolEach) {

    return function transform(collection, iterator, callback, accumulator) {
      callback = callback || noop;
      var size, keys, result;
      var completed = 0;

      if (Array.isArray(collection)) {
        size = collection.length;
        result = accumulator !== undefined ? accumulator : [];
        arrayEach(collection, result, iterator, done);
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        result = accumulator !== undefined ? accumulator : {};
        symbolEach(collection, result, iterator, done);
      } else if (typeof collection === 'object') {
        keys = Object.keys(collection);
        size = keys.length;
        result = accumulator !== undefined ? accumulator : {};
        baseEach(collection, result, iterator, done, keys);
      }
      if (!size) {
        callback(undefined, accumulator !== undefined ? accumulator : result || {});
      }

      function done(err, bool) {
        if (err) {
          callback(err, Array.isArray(result) ? _arrayClone(result) : _objectClone(result));
          callback = noop;
        } else if (++completed === size) {
          callback(undefined, result);
        } else if (bool === false) {
          callback(undefined, Array.isArray(result) ? _arrayClone(result) : _objectClone(result));
          callback = noop;
        }
      }
    };
  }

  /**
   * @memberof async
   * @namespace transformSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
   * @param {Array|Object} [accumulator]
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
  function transformSeries(collection, iterator, callback, accumulator) {
    callback = callback || noop;
    var size, key, keys, iter, values, iterate, result;
    var sync = true;
    var completed = 0;

    if (Array.isArray(collection)) {
      size = collection.length;
      result = accumulator !== undefined ? accumulator : [];
      iterate = iterator.length === 4 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      size = collection.size;
      iter = collection[iteratorSymbol]();
      result = accumulator !== undefined ? accumulator : {};
      iterate = iterator.length === 4 ? symbolIteratorWithKey : symbolIterator;
    } else if (typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      result = accumulator !== undefined ? accumulator : {};
      iterate = iterator.length === 4 ? objectIteratorWithKey : objectIterator;
    }
    if (!size) {
      return callback(undefined, accumulator !== undefined ? accumulator : result || {});
    }
    iterate();
    sync = false;

    function arrayIterator() {
      iterator(result, collection[completed], done);
    }

    function arrayIteratorWithIndex() {
      iterator(result, collection[completed], completed, done);
    }

    function symbolIterator() {
      iterator(result, iter.next().value[1], done);
    }

    function symbolIteratorWithKey() {
      values = iter.next().value;
      iterator(result, values[1], values[0], done);
    }

    function objectIterator() {
      iterator(result, collection[keys[completed]], done);
    }

    function objectIteratorWithKey() {
      key = keys[completed];
      iterator(result, collection[key], key, done);
    }

    function done(err, bool) {
      if (err) {
        callback(err, result);
        callback = throwError;
      } else if (++completed >= size) {
        callback(undefined, result);
        callback = throwError;
      } else if (bool === false) {
        callback(undefined, result);
        callback = throwError;
      } else if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
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
  function transformLimit(collection, limit, iterator, callback, accumulator) {
    callback = callback || noop;
    var size, index, key, keys, iter, item, iterate, result;
    var sync = true;
    var started = 0;
    var completed = 0;

    if (Array.isArray(collection)) {
      size = collection.length;
      result = accumulator !== undefined ? accumulator : [];
      iterate = iterator.length === 4 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      size = collection.size;
      iter = collection[iteratorSymbol]();
      result = accumulator !== undefined ? accumulator : {};
      iterate = iterator.length === 4 ? symbolIteratorWithKey : symbolIterator;
    } else if (typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      result = accumulator !== undefined ? accumulator : {};
      iterate = iterator.length === 4 ? objectIteratorWithKey : objectIterator;
    }
    if (!size || isNaN(limit) || limit < 1) {
      return callback(undefined, accumulator !== undefined ? accumulator : result || {});
    }
    _times(limit > size ? size : limit, iterate);
    sync = false;

    function arrayIterator() {
      index = started++;
      if (index < size) {
        iterator(result, collection[index], once(done));
      }
    }

    function arrayIteratorWithIndex() {
      index = started++;
      if (index < size) {
        iterator(result, collection[index], index, once(done));
      }
    }

    function symbolIterator() {
      if ((item = iter.next()).done === false) {
        iterator(result, item.value[1], once(done));
      }
    }

    function symbolIteratorWithKey() {
      if ((item = iter.next()).done === false) {
        iterator(result, item.value[1], item.value[0], once(done));
      }
    }

    function objectIterator() {
      index = started++;
      if (index < size) {
        iterator(result, collection[keys[index]], once(done));
      }
    }

    function objectIteratorWithKey() {
      index = started++;
      if (index < size) {
        key = keys[index];
        iterator(result, collection[key], key, once(done));
      }
    }

    function done(err, bool) {
      if (err) {
        callback(err, Array.isArray(result) ? _arrayClone(result) : _objectClone(result));
        callback = noop;
        iterate = noop;
      } else if (++completed >= size) {
        callback(undefined, result);
        callback = throwError;
      } else if (bool === false) {
        callback(undefined, Array.isArray(result) ? _arrayClone(result) : _objectClone(result));
        callback = noop;
        iterate = noop;
      } else if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
    }
  }

  /**
   * @private
   * @param {function} arrayEach
   * @param {function} baseEach
   * @param {function} symbolEach
   */
  function createSortBy(arrayEach, baseEach, symbolEach) {

    return function sortBy(collection, iterator, callback) {
      callback = callback || noop;
      var size, result;
      var completed = 0;

      if (Array.isArray(collection)) {
        size = collection.length;
        result = Array(size);
        arrayEach(collection, iterator, createCallback);
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        result = Array(size);
        symbolEach(collection, iterator, createCallback);
      } else if (typeof collection === 'object') {
        var keys = Object.keys(collection);
        size = keys.length;
        result = Array(size);
        baseEach(collection, iterator, createCallback, keys);
      }
      if (!size) {
        callback(undefined, []);
      }

      function createCallback(value) {
        var called = false;
        return function done(err, criteria) {
          if (called) {
            throwError();
          }
          called = true;
          result[completed] = {
            value: value,
            criteria: criteria
          };
          if (err) {
            callback(err);
            callback = noop;
          } else if (++completed === size) {
            result.sort(sortIterator);
            callback(undefined, _pluck(result, 'value'));
            callback = throwError;
          }
        };
      }
    };
  }

  /**
   * @memberof async
   * @namespace sortBySeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  function sortBySeries(collection, iterator, callback) {
    callback = callback || noop;
    var size, key, value, keys, iter, values, result, iterate;
    var sync = true;
    var completed = 0;

    if (Array.isArray(collection)) {
      size = collection.length;
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      size = collection.size;
      iter = collection[iteratorSymbol]();
      iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
    } else if (typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    }
    if (!size) {
      return callback(undefined, []);
    }
    result = Array(size);
    iterate();
    sync = false;

    function arrayIterator() {
      value = collection[completed];
      iterator(value, done);
    }

    function arrayIteratorWithIndex() {
      value = collection[completed];
      iterator(value, completed, done);
    }

    function symbolIterator() {
      value = iter.next().value[1];
      iterator(value, done);
    }

    function symbolIteratorWithKey() {
      values = iter.next().value;
      value = values[1];
      iterator(value, values[0], done);
    }

    function objectIterator() {
      value = collection[keys[completed]];
      iterator(value, done);
    }

    function objectIteratorWithKey() {
      key = keys[completed];
      value = collection[key];
      iterator(value, key, done);
    }

    function done(err, criteria) {
      result[completed] = {
        value: value,
        criteria: criteria
      };
      if (err) {
        callback(err);
        callback = throwError;
      } else if (++completed >= size) {
        result.sort(sortIterator);
        callback(undefined, _pluck(result, 'value'));
        callback = throwError;
      } else if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
    }
  }

  /**
   * @memberof async
   * @namespace sortByLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
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
  function sortByLimit(collection, limit, iterator, callback) {
    callback = callback || noop;
    var size, index, key, value, keys, iter, item, result, iterate;
    var sync = false;
    var started = 0;
    var completed = 0;

    if (Array.isArray(collection)) {
      size = collection.length;
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      size = collection.size;
      iter = collection[iteratorSymbol]();
      iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
    } else if (typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    }
    if (!size || isNaN(limit) || limit < 1) {
      return callback(undefined, []);
    }
    result = Array(size);
    _times(limit > size ? size : limit, iterate);

    function arrayIterator() {
      if (started < size) {
        value = collection[started++];
        iterator(value, createCallback(value));
      }
    }

    function arrayIteratorWithIndex() {
      index = started++;
      if (index < size) {
        value = collection[index];
        iterator(value, index, createCallback(value));
      }
    }

    function symbolIterator() {
      if ((item = iter.next()).done === false) {
        value = item.value[1];
        iterator(value, createCallback(value));
      }
    }

    function symbolIteratorWithKey() {
      if ((item = iter.next()).done === false) {
        value = item.value[1];
        iterator(value, item.value[0], createCallback(value));
      }
    }

    function objectIterator() {
      if (started < size) {
        value = collection[keys[started++]];
        iterator(value, createCallback(value));
      }
    }

    function objectIteratorWithKey() {
      if (started < size) {
        key = keys[started++];
        value = collection[key];
        iterator(value, key, createCallback(value));
      }
    }

    function createCallback(value) {
      var called = false;
      return function(err, criteria) {
        if (called) {
          throwError();
        }
        called = true;
        result[completed] = {
          value: value,
          criteria: criteria
        };
        if (err) {
          callback(err);
          callback = noop;
          iterate = noop;
        } else if (++completed >= size) {
          result.sort(sortIterator);
          callback(undefined, _pluck(result, 'value'));
          callback = throwError;
        } else if (sync) {
          async.nextTick(iterate);
        } else {
          sync = true;
          iterate();
        }
        sync = false;
      };
    }
  }

  /**
   * @memberof async
   * @namespace some
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  function some(collection, iterator, callback) {
    callback = callback || noop;
    detect(collection, iterator, callback.length === 2 ? doneWithError : done);

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
  function someSeries(collection, iterator, callback) {
    callback = callback || noop;
    detectSeries(collection, iterator, callback.length === 2 ? doneWithError : done);

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
  function someLimit(collection, limit, iterator, callback) {
    callback = callback || noop;
    detectLimit(collection, limit, iterator, callback.length === 2 ? doneWithError : done);

    function done(res) {
      callback(!!res);
    }

    function doneWithError(err, res) {
      callback(err, !!res);
    }
  }

  /**
   * @private
   * @param {Function} arrayEach
   * @param {Function} baseEach
   * @param {Function} symbolEach
   */
  function createEvery(arrayEach, baseEach, symbolEach) {

    var deny = createDetect(arrayEach, baseEach, symbolEach, false);

    return function every(collection, iterator, callback) {
      callback = callback || noop;
      deny(collection, iterator, callback.length === 2 ? doneWithError : done);

      function done(res) {
        callback(!res);
      }

      function doneWithError(err, res) {
        callback(err, !res);
      }
    };
  }

  /**
   * @private
   */
  function createEverySeries() {

    var denySeries = createDetectSeries(false);

    return function everySeries(collection, iterator, callback) {
      callback = callback || noop;
      denySeries(collection, iterator, callback.length === 2 ? doneWithError : done);

      function done(res) {
        callback(!res);
      }

      function doneWithError(err, res) {
        callback(err, !res);
      }
    };
  }

  /**
   * @private
   */
  function createEveryLimit() {

    var denyLimit = createDetectLimit(false);

    return function everyLimit(collection, limit, iterator, callback) {
      callback = callback || noop;
      denyLimit(collection, limit, iterator, callback.length === 2 ? doneWithError : done);

      function done(res) {
        callback(!res);
      }

      function doneWithError(err, res) {
        callback(err, !res);
      }
    };
  }

  /**
   * @private
   * @param {Funciton} arrayEach
   * @param {Funciton} baseEach
   * @param {Funciton} symbolEach
   */
  function createConcat(arrayEach, baseEach, symbolEach) {

    return function concat(collection, iterator, callback) {
      callback = callback || noop;
      var size;
      var completed = 0;
      var result = [];

      if (Array.isArray(collection)) {
        size = collection.length;
        arrayEach(collection, iterator, done);
      } else if (!collection) {
      } else if (iteratorSymbol && collection[iteratorSymbol]) {
        size = collection.size;
        symbolEach(collection, iterator, done);
      } else if (typeof collection === 'object') {
        var keys = Object.keys(collection);
        size = keys.length;
        baseEach(collection, iterator, done, keys);
      }
      if (!size) {
        callback(undefined, result);
      }

      function done(err, array) {
        if (array) {
          Array.prototype.push.apply(result, Array.isArray(array) ? array : [array]);
        }
        if (err) {
          callback(err, _arrayClone(result));
          callback = noop;
        } else if (++completed === size) {
          callback(undefined, result);
        }
      }
    };
  }

  /**
   * @memberof async
   * @namespace concatSeries
   * @param {Array|Object} collection
   * @param {Function} iterator
   * @param {Function} callback
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
  function concatSeries(collection, iterator, callback) {
    callback = callback || noop;
    var size, key, keys, iter, values, iterate;
    var sync = true;
    var result = [];
    var completed = 0;

    if (Array.isArray(collection)) {
      size = collection.length;
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      size = collection.size;
      iter = collection[iteratorSymbol]();
      iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
    } else if (typeof collection === 'object') {
      keys = Object.keys(collection);
      size = keys.length;
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    }
    if (!size) {
      return callback(undefined, result);
    }
    iterate();
    sync = false;

    function arrayIterator() {
      iterator(collection[completed], done);
    }

    function arrayIteratorWithIndex() {
      iterator(collection[completed], completed, done);
    }

    function symbolIterator() {
      iterator(iter.next().value[1], done);
    }

    function symbolIteratorWithKey() {
      values = iter.next().value;
      iterator(values[1], values[0], done);
    }

    function objectIterator() {
      iterator(collection[keys[completed]], done);
    }

    function objectIteratorWithKey() {
      key = keys[completed];
      iterator(collection[key], key, done);
    }

    function done(err, array) {
      if (array) {
        Array.prototype.push.apply(result, Array.isArray(array) ? array : [array]);
      }
      if (err) {
        callback(err, result);
        callback = throwError;
      } else if (++completed >= size) {
        callback(undefined, result);
        callback = throwError;
      } else if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
    }
  }

  /**
   * @memberof async
   * @namespace concatLimit
   * @param {Array|Object} collection
   * @param {number} limit - limit >= 1
   * @param {Function} iterator
   * @param {Function} callback
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
  function concatLimit(collection, limit, iterator, callback) {
    callback = callback || noop;
    var result = [];
    var size, index, key, iter, item, iterate;
    var sync = true;
    var started = 0;
    var completed = 0;

    if (Array.isArray(collection)) {
      size = collection.length;
      iterate = iterator.length === 3 ? arrayIteratorWithIndex : arrayIterator;
    } else if (!collection) {
    } else if (iteratorSymbol && collection[iteratorSymbol]) {
      size = collection.size;
      iter = collection[iteratorSymbol]();
      iterate = iterator.length === 3 ? symbolIteratorWithKey : symbolIterator;
    } else if (typeof collection === 'object') {
      var keys = Object.keys(collection);
      size = keys.length;
      iterate = iterator.length === 3 ? objectIteratorWithKey : objectIterator;
    }
    if (!size || isNaN(limit) || limit < 1) {
      return callback(undefined, result);
    }
    _times(limit > size ? size : limit, iterate);
    sync = false;

    function arrayIterator() {
      if (started < size) {
        iterator(collection[started++], once(done));
      }
    }

    function arrayIteratorWithIndex() {
      index = started++;
      if (index < size) {
        iterator(collection[index], index, once(done));
      }
    }

    function symbolIterator() {
      if ((item = iter.next()).done === false) {
        iterator(item.value[1], once(done));
      }
    }

    function symbolIteratorWithKey() {
      if ((item = iter.next()).done === false) {
        iterator(item.value[1], item.value[0], once(done));
      }
    }

    function objectIterator() {
      if (started < size) {
        iterator(collection[keys[started++]], once(done));
      }
    }

    function objectIteratorWithKey() {
      if (started < size) {
        key = keys[started++];
        iterator(collection[key], key, once(done));
      }
    }

    function done(err, array) {
      if (array) {
        Array.prototype.push.apply(result, Array.isArray(array) ? array : [array]);
      }
      if (err) {
        callback(err, result);
        callback = noop;
      } else if (++completed >= size) {
        callback(undefined, result);
        callback = throwError;
      } else if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
    }
  }

  /**
   * @private
   * @param {Funciton} arrayEach
   * @param {Funciton} baseEach
   */
  function createParallel(arrayEach, baseEach) {

    return function parallel(tasks, callback) {
      callback = callback || noop;
      var size, keys, result;
      var completed = 0;

      if (Array.isArray(tasks)) {
        size = tasks.length;
        result = Array(size);
        arrayEach(tasks, createCallback);
      } else if (tasks && typeof tasks === 'object') {
        keys = Object.keys(tasks);
        size = keys.length;
        result = {};
        baseEach(tasks, createCallback, keys);
      }
      if (!size) {
        callback(undefined, result);
      }

      function createCallback(key) {
        return function(err, res) {
          if (key === null) {
            throwError();
          }
          if (err) {
            callback(err, result);
            callback = noop;
            key = null;
            return;
          }
          result[key] = arguments.length <= 2 ? res : _slice(arguments, 1);
          key = null;
          if (++completed === size) {
            callback(undefined, result);
            callback = throwError;
          }
        };
      }
    };
  }

  /**
   * @memberof async
   * @namespace series
   * @param {Array|Object} tasks - functions
   * @param {Function} callback
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
  function series(tasks, callback) {
    callback = callback || noop;
    var size, key, keys, result, iterate;
    var sync = true;
    var completed = 0;

    if (Array.isArray(tasks)) {
      size = tasks.length;
      result = Array(size);
      iterate = arrayIterator;
    } else if (tasks && typeof tasks === 'object') {
      keys = Object.keys(tasks);
      size = keys.length;
      result = {};
      iterate = objectIterator;
    } else {
      return callback();
    }
    if (!size) {
      return callback(undefined, result);
    }
    iterate();
    sync = false;

    function arrayIterator() {
      key = completed;
      tasks[completed](done);
    }

    function objectIterator() {
      key = keys[completed];
      tasks[key](done);
    }

    function done(err, res) {
      if (err) {
        callback(err, result);
        callback = throwError;
        iterate = throwError;
        return;
      }
      result[key] = arguments.length <= 2 ? res : _slice(arguments, 1);
      if (++completed >= size) {
        callback(undefined, result);
        callback = throwError;
      } else if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
    }
  }

  /**
   * @memberof async
   * @namespace parallelLimit
   * @param {Array|Object} tasks - functions
   * @param {number} limit - limit >= 1
   * @param {Function} callback
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
  function parallelLimit(tasks, limit, callback) {
    callback = callback || noop;
    var size, index, key, keys, result, iterate;
    var sync = true;
    var started = 0;
    var completed = 0;

    if (Array.isArray(tasks)) {
      size = tasks.length;
      result = Array(size);
      iterate = arrayIterator;
    } else if (tasks && typeof tasks === 'object') {
      keys = Object.keys(tasks);
      size = keys.length;
      result = {};
      iterate = objectIterator;
    }
    if (!size || isNaN(limit) || limit < 1) {
      return callback(undefined, result);
    }
    _times(limit > size ? size : limit, iterate);
    sync = false;

    function arrayIterator() {
      index = started++;
      if (index < size) {
        tasks[index](createCallback(index));
      }
    }

    function objectIterator() {
      if (started < size) {
        key = keys[started++];
        tasks[key](createCallback(key));
      }
    }

    function createCallback(key) {
      return function(err, res) {
        if (key === null) {
          throwError();
        }
        if (err) {
          callback(err, result);
          callback = noop;
          key = null;
          return;
        }
        result[key] = arguments.length <= 2 ? res : _slice(arguments, 1);
        key = null;
        if (++completed >= size) {
          callback(undefined, result);
        } else if (sync) {
          async.nextTick(iterate);
        } else {
          sync = true;
          iterate();
        }
        sync = false;
      };
    }
  }

  /**
   * check for waterfall tasks
   * @private
   * @param {Array} tasks
   * @param {Function} callback
   * @return {boolean}
   */
  function checkWaterfallTasks(tasks, callback) {
    if (!Array.isArray(tasks)) {
      callback(new Error('First argument to waterfall must be an array of functions'));
      return false;
    }
    if (tasks.length === 0) {
      callback();
      return false;
    }
    return true;
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
    if (!checkWaterfallTasks(tasks, callback)) {
      return;
    }
    var completed = 0;
    var called = false;
    var sync = true;
    var size = tasks.length;
    var func = tasks[completed];
    var args = [];
    iterate();
    sync = false;

    function iterate() {
      called = false;
      switch (args.length) {
        case 0:
        case 1:
          return func(done);
        case 2:
          return func(args[1], done);
        case 3:
          return func(args[1], args[2], done);
        case 4:
          return func(args[1], args[2], args[3], done);
        case 5:
          return func(args[1], args[2], args[3], args[4], done);
        case 6:
          return func(args[1], args[2], args[3], args[4], args[5], done);
        default:
          args = _slice(args, 1);
          args.push(done);
          return func.apply(null, args);
      }
    }

    function done(err) {
      if (called) {
        throwError();
      }
      if (err) {
        callback(err);
        callback = throwError;
        return;
      }
      called = true;
      if (++completed >= size) {
        callback.apply(null, _baseSlice(arguments));
        callback = throwError;
        return;
      }
      func = tasks[completed];
      args = arguments;
      if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
    }
  }

  /**
   * @private
   * @param {Array} tasks - functions
   */
  function safeWaterfall(tasks, callback) {
    callback = callback || noop;
    if (!checkWaterfallTasks(tasks, callback)) {
      return;
    }
    var called;
    var size = tasks.length;
    var args = [];
    iterate(0);

    function iterate(completed) {
      called = false;
      var func = tasks[completed];
      switch (args.length) {
        case 0:
        case 1:
          return func(done);
        case 2:
          return func(args[1], done);
        case 3:
          return func(args[1], args[2], done);
        case 4:
          return func(args[1], args[2], args[3], done);
        case 5:
          return func(args[1], args[2], args[3], args[4], done);
        case 6:
          return func(args[1], args[2], args[3], args[4], args[5], done);
        default:
          args = _slice(args, 1);
          args.push(done);
          return func.apply(null, args);
      }

      function done(err) {
        if (called) {
          throwError();
        }
        called = true;
        if (err) {
          callback(err);
        } else if (++completed >= size) {
          callback.apply(null, _baseSlice(arguments));
        } else {
          args = arguments;
          async.safeNextTick(function() {
            iterate(completed);
          });
          return;
        }
        iterate = throwError;
        callback = throwError;
      }
    }
  }

  /**
   * `angelFall` is like `waterfall` and inject callback to last argument of next task.
   *
   * @memberof async
   * @namespace angelFall
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
   *   function(arg1, empty, next) {
   *     setTimeout(function() {
   *       order.push(2);
   *       next(null, 1, 2);
   *     }, 30);
   *   },
   *   function(next) {
   *     setTimeout(function() {
   *       order.push(3);
   *       next(null, 3);
   *     }, 20);
   *   },
   *   function(arg1, empty1, empty2, empty3, next) {
   *     setTimeout(function() {
   *       order.push(4);
   *       next(null, 1, 2, 3, 4);
   *     }, 40);
   *   }
   * ];
   * async.angelFall(tasks, function(err, arg1, arg2, arg3, arg4) {
   *   console.log(arg1, arg2, arg3, arg4); // 1 2 3 4
   * });
   *
   */
  function angelFall(tasks, callback) {
    callback = callback || noop;
    if (!checkWaterfallTasks(tasks, callback)) {
      return;
    }
    var completed = 0;
    var sync = true;
    var size = tasks.length;
    var func = tasks[completed];
    var args = [];
    iterate();
    sync = false;

    function iterate() {
      switch (func.length) {
        case 0:
          try {
            done(null, func());
          } catch (e) {
            done(e);
          }
          return;
        case 1:
          return func(done);
        case 2:
          return func(args[1], done);
        case 3:
          return func(args[1], args[2], done);
        case 4:
          return func(args[1], args[2], args[3], done);
        case 5:
          return func(args[1], args[2], args[3], args[4], done);
        default:
          args = _slice(args, 1);
          args[func.length - 1] = done;
          return func.apply(null, args);
      }
    }

    function done(err) {
      if (err) {
        callback(err);
        callback = throwError;
        return;
      }
      if (++completed >= size) {
        callback.apply(null, _baseSlice(arguments));
        callback = throwError;
        return;
      }
      func = tasks[completed];
      args = arguments;
      if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
    }
  }

  /**
   * @memberof async
   * @namespace whilst
   * @param {Funciton} test
   * @param {Funciton} iterator
   * @param {Funciton} callback
   */
  function whilst(test, iterator, callback) {
    callback = callback || noop;
    var sync = false;
    if (test()) {
      iterate();
    } else {
      callback();
    }

    function iterate() {
      if (sync) {
        async.nextTick(next);
      } else {
        sync = true;
        iterator(done);
      }
      sync = false;
    }

    function next() {
      iterator(done);
    }

    function done(err, arg) {
      if (err) {
        return callback(err);
      }
      if (arguments.length <= 2) {
        if (test(arg)) {
          iterate();
        } else {
          callback(undefined, arg);
        }
        return;
      }
      arg = _slice(arguments, 1);
      if (test.apply(null, arg)) {
        iterate();
      } else {
        callback.apply(null, [undefined].concat(arg));
      }
    }
  }

  /**
   * @memberof async
   * @namespace doWhilst
   * @param {Funciton} iterator
   * @param {Funciton} test
   * @param {Funciton} callback
   */
  function doWhilst(iterator, test, callback) {
    callback = callback || noop;
    var sync = false;
    next();

    function iterate() {
      if (sync) {
        async.nextTick(next);
      } else {
        sync = true;
        iterator(done);
      }
      sync = false;
    }

    function next() {
      iterator(done);
    }

    function done(err, arg) {
      if (err) {
        return callback(err);
      }
      if (arguments.length <= 2) {
        if (test(arg)) {
          iterate();
        } else {
          callback(undefined, arg);
        }
        return;
      }
      arg = _slice(arguments, 1);
      if (test.apply(null, arg)) {
        iterate();
      } else {
        callback.apply(null, [undefined].concat(arg));
      }
    }
  }

  /**
   * @memberof async
   * @namespace until
   * @param {Funciton} test
   * @param {Funciton} iterator
   * @param {Funciton} callback
   */
  function until(test, iterator, callback) {
    callback = callback || noop;
    var sync = false;
    if (!test()) {
      iterate();
    } else {
      callback();
    }

    function iterate() {
      if (sync) {
        async.nextTick(next);
      } else {
        sync = true;
        iterator(done);
      }
      sync = false;
    }

    function next() {
      iterator(done);
    }

    function done(err, arg) {
      if (err) {
        return callback(err);
      }
      if (arguments.length <= 2) {
        if (!test(arg)) {
          iterate();
        } else {
          callback(undefined, arg);
        }
        return;
      }
      arg = _slice(arguments, 1);
      if (!test.apply(null, arg)) {
        iterate();
      } else {
        callback.apply(null, [undefined].concat(arg));
      }
    }
  }

  /**
   * @memberof async
   * @namespace doUntil
   * @param {Funciton} iterator
   * @param {Funciton} test
   * @param {Funciton} callback
   */
  function doUntil(iterator, test, callback) {
    callback = callback || noop;
    var sync = false;
    next();

    function iterate() {
      if (sync) {
        async.nextTick(next);
      } else {
        sync = true;
        iterator(done);
      }
      sync = false;
    }

    function next() {
      iterator(done);
    }

    function done(err, arg) {
      if (err) {
        return callback(err);
      }
      if (arguments.length <= 2) {
        if (!test(arg)) {
          iterate();
        } else {
          callback(undefined, arg);
        }
        return;
      }
      arg = _slice(arguments, 1);
      if (!test.apply(null, arg)) {
        iterate();
      } else {
        callback.apply(null, [undefined].concat(arg));
      }
    }
  }

  /**
   * @memberof async
   * @namespace during
   * @param {Funciton} test
   * @param {Funciton} iterator
   * @param {Funciton} callback
   */
  function during(test, iterator, callback) {
    callback = callback || noop;
    _test();

    function _test() {
      test(iterate);
    }

    function iterate(err, truth) {
      if (err) {
        return callback(err);
      }
      if (truth) {
        iterator(done);
      } else {
        callback();
      }
    }

    function done(err) {
      if (err) {
        return callback(err);
      }
      _test();
    }
  }

  /**
   * @memberof async
   * @namespace doDuring
   * @param {Funciton} test
   * @param {Funciton} iterator
   * @param {Funciton} callback
   */
  function doDuring(iterator, test, callback) {
    callback = callback || noop;
    iterate(null, true);

    function iterate(err, truth) {
      if (err) {
        return callback(err);
      }
      if (truth) {
        iterator(done);
      } else {
        callback();
      }
    }

    function done(err, res) {
      if (err) {
        return callback(err);
      }
      switch (arguments.length) {
        case 0:
        case 1:
          test(iterate);
          break;
        case 2:
          test(res, iterate);
          break;
        default:
          var args = _slice(arguments, 1);
          args.push(iterate);
          test.apply(null, args);
          break;
      }
    }
  }

  /**
   * @memberof async
   * @namespace forever
   */
  function forever(iterator, callback) {
    var sync = true;
    iterate();
    sync = false;

    function iterate() {
      iterator(next);
    }

    function next(err) {
      if (err) {
        if (callback) {
          return callback(err);
        }
        throw err;
      }
      if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
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
    var fns = _baseSlice(arguments);

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

  function createApplyEach(func) {

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
          fn.apply(self, args.concat([done]));
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
  function queue(worker, concurrency) {
    var q = priorityQueue(worker, concurrency);
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

      if (tasks === undefined || !_tasks.length) {
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
          data: task,
          callback: callback
        };
        if (unshift) {
          q.tasks.unshift(item);
        } else {
          q.tasks.push(item);
        }
        if (q.tasks.length === q.concurrency) {
          q.saturated();
        }
        if (q.tasks.length <= (q.concurrency - q.buffer)) {
          q.unsaturated();
        }
        async.nextTick(q.process);
      });
    }
  }

  /**
   * @memberof async
   * @namespace priorityQueue
   */
  function priorityQueue(worker, concurrency) {
    if (concurrency === undefined) {
      concurrency = 1;
    } else if (isNaN(concurrency) || concurrency < 1) {
      throw new Error('concurrency must be more than 1');
    }

    var workers = 0;
    var workersList = [];
    var q = {
      tasks: [],
      workersList: getWorkersList,
      concurrency: concurrency,
      saturated: noop,
      unsaturated: noop,
      buffer: concurrency / 4,
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
      _worker: worker
    };
    return q;

    function _insert(tasks, priority, callback) {
      q.started = true;
      var _tasks = Array.isArray(tasks) ? tasks : [tasks];

      if (tasks === undefined || !_tasks.length) {
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
      var index = getIndex(priority);
      _arrayEach(_tasks, function(task) {
        var item = {
          data: task,
          priority: priority,
          callback: callback
        };
        q.tasks.splice(index++, 0, item);

        if (q.tasks.length === q.concurrency) {
          q.saturated();
        }
        if (q.tasks.length <= (q.concurrency - q.buffer)) {
          q.unsaturated();
        }
        async.nextTick(q.process);
      });

      function getIndex(priority) {
        var tasks = q.tasks;
        var size = tasks.length;
        if (!size) {
          return 0;
        }
        var index = -1;
        while (++index < size) {
          if (priority < tasks[index].priority) {
            return index;
          }
        }
        return index;
      }
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
      var sync = true;
      var workerInfo = {
        task: task,
        active: true
      };
      workersList[workersList.length] = workerInfo;
      q._worker(task.data, once(next));
      sync = false;

      function next() {
        workers--;
        workerInfo.active = false;
        if (task.callback) {
          task.callback.apply(task, _baseSlice(arguments));
        }
        if (typeof q.drain === 'function' && q.idle()) {
          q.drain();
        }
        if (sync) {
          async.nextTick(q.process);
        } else {
          q.process();
        }
      }
    }

    function getLength() {
      return q.tasks.length;
    }

    function running() {
      return workers;
    }

    function getWorkersList() {
      var i = -1;
      var l = -1;
      var size = workersList.length;
      var list = [];
      var result = [];
      while (++i < size) {
        var workerInfo = workersList[i];
        if (workerInfo.active) {
          list[++l] = workerInfo;
          result[l] = workerInfo.task;
        }
      }
      workersList = list;
      return result;
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
      var count = q.concurrency < q.tasks.length ? q.concurrency : q.tasks.length;
      _times(count, function() {
        async.nextTick(q.process);
      });
    }
  }

  /**
   * @memberof async
   * @namespace cargo
   */
  function cargo(worker, payload) {
    var working = 0;
    var workersList = [];
    var c = {
      tasks: [],
      workersList: getWorkersList,
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
      if (!c.length() && typeof c.empty === 'function') {
        c.empty();
      }

      var i = -1;
      var size = tasks.length;
      var data = Array(size);
      var list = Array(size);
      while (++i < size) {
        var task = tasks[i];
        data[i] = task.data;
        var workerInfo = {
          task: task,
          active: true
        };
        list[i] = workerInfo;
        workersList[workersList.length] = workerInfo;
      }
      working++;

      worker(data, function() {
        working--;
        var args = _baseSlice(arguments);
        _arrayEach(list, function(data) {
          data.active = false;
          var callback = data.task.callback;
          if (callback) {
            callback.apply(null, args);
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

    function getWorkersList() {
      var i = -1;
      var l = -1;
      var size = workersList.length;
      var list = [];
      var result = [];
      while (++i < size) {
        var workerInfo = workersList[i];
        if (workerInfo.active) {
          list[++l] = workerInfo;
          result[l] = workerInfo.task;
        }
      }
      workersList = list;
      return result;
    }
  }

  /**
   * @memberof async
   * @namespace auto
   * @param {Object} tasks
   * @param {number} [concurrency]
   * @param {Funciton} [callback]
   */
  function auto(tasks, concurrency, callback) {
    if (typeof concurrency === 'function') {
      callback = concurrency;
      concurrency = null;
    }
    callback = once(callback || noop);
    var keys = Object.keys(tasks);
    var remainingTasks = keys.length;
    if (!remainingTasks) {
      return callback();
    }
    if (!concurrency) {
      concurrency = remainingTasks;
    }

    var runningTasks = 0;
    var listeners = [];
    var results = {};
    addListener(function() {
      if (!remainingTasks) {
        callback(undefined, results);
      }
    });

    _objectEach(tasks, function(task, key) {
      task = Array.isArray(task) ? task : [task];
      var called = false;
      var size = task.length;
      var requires = task.slice(0, size - 1);
      var _task = task[size - 1];
      if (callback !== noop && ready()) {
        runningTasks++;
        return _task(done, results);
      }
      addListener(listener);

      function done(err) {
        if (called) {
          throwError();
        }
        called = true;
        runningTasks--;
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
        return runningTasks < concurrency && !_has(results, key) && _arrayEvery(requires, function(_key) {
          return _has(results, _key);
        });
      }

      function listener() {
        if (ready()) {
          runningTasks++;
          removeListener(listener);
          _task(done, results);
        }
      }
    }, keys);

    function addListener(fn) {
      // TODO
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
    switch (arguments.length) {
      case 0:
      case 1:
        return func;
      case 2:
        return func.bind(null, arguments[1]);
      case 3:
        return func.bind(null, arguments[1], arguments[2]);
      case 4:
        return func.bind(null, arguments[1], arguments[2], arguments[3]);
      case 5:
        return func.bind(null, arguments[1], arguments[2], arguments[3], arguments[4]);
      default:
        var size = arguments.length;
        var index = 0;
        var args = Array(size);
        args[index] = null;
        while (++index < size) {
          args[index] = arguments[index];
        }
        return func.bind.apply(func, args);
    }
  }

  /**
   * @memberof async
   * @namespace timeout
   * @param {Function} func
   * @param {number} millisec
   */
  function timeout(func, millisec) {
    var callback, timer;
    return wrappedFunc;

    function wrappedFunc() {
      timer = setTimeout(timeoutCallback, millisec);
      var args = _baseSlice(arguments);
      var lastIndex = args.length - 1;
      callback = args[lastIndex];
      args[lastIndex] = injectedCallback;
      simpleApply(func, args);
    }

    function timeoutCallback() {
      var err = new Error('Callback function time out.');
      err.code = 'ETIMEDOUT';
      timer = null;
      callback(err);
    }

    function injectedCallback() {
      if (timer !== null) {
        simpleApply(callback, _baseSlice(arguments));
        clearTimeout(timer);
      }
    }

    function simpleApply(func, args) {
      switch(args.length) {
        case 0:
          func();
          break;
        case 1:
          func(args[0]);
          break;
        case 2:
          func(args[0], args[1]);
          break;
        default:
          func.apply(null, args);
          break;
      }
    }
  }

  /**
   * @memberof async
   * @namespace times
   * @param {number} n - n >= 1
   * @param {Function} iterator
   * @param {Function} callback
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
  function times(n, iterator, callback) {
    callback = callback || noop;
    n = +n;
    if (isNaN(n) || n < 1) {
      return callback(undefined, []);
    }
    var result = Array(n);
    _times(n, iterate);

    function iterate(num) {
      iterator(num, createCallback(num));
    }

    function createCallback(index) {
      return function(err, res) {
        if (index === null) {
          throwError();
        }
        result[index] = res;
        index = null;
        if (err) {
          callback(err);
          callback = noop;
        } else if (--n === 0) {
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
  function timesSeries(n, iterator, callback) {
    callback = callback || noop;
    n = +n;
    if (isNaN(n) || n < 1) {
      return callback(undefined, []);
    }
    var result = Array(n);
    var sync = true;
    var completed = 0;
    iterate();
    sync = false;

    function iterate() {
      iterator(completed, done);
    }

    function done(err, res) {
      result[completed] = res;
      if (err) {
        callback(err);
        callback = throwError;
      } else if (++completed >= n) {
        callback(undefined, result);
        callback = throwError;
      } else if (sync) {
        async.nextTick(iterate);
      } else {
        sync = true;
        iterate();
      }
      sync = false;
    }
  }

  /**
   * @memberof async
   * @namespace timesLimit
   * @param {number} n - n >= 1
   * @param {number} limit - n >= 1
   * @param {Function} iterator
   * @param {Function} callback
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
  function timesLimit(n, limit, iterator, callback) {
    callback = callback || noop;
    n = +n;
    if (isNaN(n) || n < 1 || isNaN(limit) || limit < 1) {
      return callback(undefined, []);
    }
    var result = Array(n);
    var sync = true;
    var started = 0;
    var completed = 0;
    _times(limit > n ? n : limit, iterate);
    sync = false;

    function iterate() {
      var index = started++;
      if (index < n) {
        iterator(index, createCallback(index));
      }
    }

    function createCallback(index) {
      return function(err, res) {
        if (index === null) {
          throwError();
        }
        result[index] = res;
        index = null;
        if (err) {
          callback(err);
          callback = noop;
        } else if (++completed >= n) {
          callback(undefined, result);
          callback = throwError;
        } else if (sync) {
          async.nextTick(iterate);
        } else {
          sync = true;
          iterate();
        }
        sync = false;
      };
    }
  }

  /**
   * @private
   */
  function createRace() {

    function once(func) {
      return function(err, res) {
        if (func === null) {
          return;
        }
        func(err, res);
        func = null;
      };
    }

    return function race(tasks, callback) {
      callback = once(callback || noop);
      var size, keys;
      var index = -1;
      if (Array.isArray(tasks)) {
        size = tasks.length;
        while (++index < size) {
          tasks[index](callback);
        }
      } else if (tasks && typeof tasks === 'object') {
        keys = Object.keys(tasks);
        size = keys.length;
        while (++index < size) {
          tasks[keys[index]](callback);
        }
      }
      if (!size) {
        callback();
      }
    };
  }

  /**
   * @memberof async
   * @namespace memoize
   */
  function memoize(fn, hasher) {
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
          callback.apply(null, memo[key]);
        });
        return;
      }
      if (_has(queues, key)) {
        return queues[key].push(callback);
      }

      queues[key] = [callback];
      args.push(done);
      fn.apply(null, args);

      function done() {
        var args = _baseSlice(arguments);
        memo[key] = args;
        var q = queues[key];
        delete queues[key];

        var i = -1;
        var size = q.length;
        while (++i < size) {
          q[i].apply(null, args);
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
   * @namespace ensureAsync
   */
  function ensureAsync(fn) {
    return function( /* ...args, callback */ ) {
      var sync = true;
      var args = _baseSlice(arguments);
      var callback = args.pop();
      args.push(function() {
        var innerArgs = arguments;
        if (sync) {
          async.safeNextTick(function() {
            callback.apply(null, innerArgs);
          });
        } else {
          callback.apply(null, innerArgs);
        }
      });
      fn.apply(this, args);
      sync = false;
    };
  }

  /**
   * @memberof async
   * @namespace constant
   */
  function constant( /* values... */ ) {
    var args = [null].concat(_baseSlice(arguments));
    return function(callback) {
      callback.apply(this, args);
    };
  }

  function asyncify(func) {
    return function( /* args..., callback */ ) {
      var args = _baseSlice(arguments);
      var callback = args.pop();
      var result;
      try {
        result = func.apply(this, args);
      } catch (e) {
        return callback(e);
      }
      if (typeof result === 'object' && typeof result.then === 'function') {
        result.then(function(value) {
          callback(null, value);
        })['catch'](callback);
      } else {
        callback(null, result);
      }
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
    this._runing = {};
    this._queue = {};
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
    if (self.running(key)) {
      return self.queue(key, 'addListener', functions);
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
    if (self.running(key)) {
      return self.queue(key, 'removeListener', functions);
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
    if (!key) {
      _objectEach(self._events, function(events, key) {
        removeEvent.call(self, key);
      });
      return self;
    }
    var events = self._events[key] || [];
    if (events.length) {
      delete self._events[key];
    }
    return self;
  };

  EventEmitter.prototype.running = function(key) {
    return this._runing[key];
  };

  EventEmitter.prototype.queue = function(key, funcKey, func, thisArg) {
    this._queue[key] = this._queue[key] || [];
    this._queue[key].push([funcKey, func, thisArg]);
    return this;
  };

  EventEmitter.prototype.resolve = function(key) {
    if (this._runing[key]) {
      return this;
    }
    var queue = this._queue[key] || [];
    if (!queue.length) {
      return this;
    }
    var items = queue.shift();
    this[items[0]](key, items[1], items[2]);
    return this.resolve(key);
  };

  EventEmitter.prototype.emit = function(key, callback, thisArg) {
    callback = callback || noop;
    var self = this;
    if (self.running(key)) {
      return self.queue(key, 'emit', callback, thisArg);
    }
    var events = self._events[key] || [];
    if (!events.length) {
      callback();
      return self;
    }
    self._runing[key] = true;

    var emitter = self._emitter;
    emitter = thisArg ? emitter.bind(thisArg) : emitter;
    if (emitter === parallelLimit) {
      emitter(events, self._limit, done);
    } else {
      emitter(events, done);
    }
    return self;

    function done(err, res) {
      if (err) {
        callback(err);
      } else {
        _arrayEachRight(events, function(func, index) {
          if (func.ONCE === ONCE) {
            events.splice(index, 1);
          }
        });
        callback(undefined, res);
      }
      self._runing[key] = false;
      self.resolve(key);
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
