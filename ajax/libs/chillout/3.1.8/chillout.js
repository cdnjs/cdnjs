/*!
 * chillout v3.1.7 - Reduce CPU usage in JavaScript
 * Copyright (c) 2017-2018 polygon planet <polygon.planet.aqua@gmail.com>
 * https://github.com/polygonplanet/chillout
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.chillout = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = forEach;
exports.repeat = repeat;
exports.till = till;
exports.forOf = forOf;

var _iterator = require('./iterator');

var iterator = _interopRequireWildcard(_iterator);

var _iterate = require('./iterate');

var _iterate2 = _interopRequireDefault(_iterate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Executes a provided function once per array or object element.
 * The iteration will break if the callback function returns `false`, or an
 * error occurs.
 *
 * @param {Array|Object} obj Target array or object
 * @param {Function} callback Function to execute for each element, taking
 *   three arguments:
 * - value: The current element being processed in the array/object
 * - key: The key of the current element being processed in the array/object
 * - obj: The array/object that `forEach` is being applied to
 * @param {Object} [context] Value to use as `this` when executing callback
 * @return {Promise} Return new Promise
 */
function forEach(obj, callback, context) {
  return (0, _iterate2.default)(iterator.forEach(obj, callback, context));
}

/**
 * Executes a provided function the specified number times.
 * The iteration will break if the callback function returns `false`, or an
 * error occurs.
 *
 * @param {number|Object} count The number of times or object for execute the
 *   function. Following parameters are available if specify object:
 * - start: The number of start
 * - step: The number of step
 * - end: The number of end
 * @param {Function} callback Function to execute for each times, taking one
 *   argument:
 * - i: The current number
 * @param {Object} [context] Value to use as `this` when executing callback
 * @return {Promise} Return new Promise
 */
function repeat(count, callback, context) {
  return (0, _iterate2.default)(iterator.repeat(count, callback, context));
}

/**
 * Executes a provided function until the `callback` returns `false`, or an
 * error occurs.
 *
 * @param {Function} callback The function that is executed for each iteration
 * @param {Object} [context] Value to use as `this` when executing callback
 * @return {Promise} Return new Promise
 */
function till(callback, context) {
  return (0, _iterate2.default)(iterator.till(callback, context));
}

/**
 * Iterates the iterable objects, similar to the `for-of` statement.
 * Executes a provided function once per element.
 * The iteration will break if the callback function returns `false`, or an
 * error occurs.
 *
 * @param {Array|string|Object} iterable Target iterable objects
 * @param {Function} callback Function to execute for each element, taking
 *   one argument:
 * - value: A value of a property on each iteration
 * @param {Object} [context] Value to use as `this` when executing callback
 * @return {Promise} Return new Promise
 */
function forOf(iterable, callback, context) {
  return (0, _iterate2.default)(iterator.forOf(iterable, callback, context));
}

},{"./iterate":2,"./iterator":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = iterate;

var _nextTick = require('./next-tick');

var _nextTick2 = _interopRequireDefault(_nextTick);

var _util = require('./util');

var _iterator = require('./iterator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function iterate(it) {
  return new Promise(function (resolve, reject) {
    var totalTime = 0;

    function doIterate() {
      var cycleStartTime = Date.now();
      var cycleEndTime = void 0;

      try {
        var _loop = function _loop() {
          var _it$next = it.next(),
              _it$next2 = _slicedToArray(_it$next, 2),
              iterationResult = _it$next2[0],
              res = _it$next2[1];

          if ((0, _util.isThenable)(res)) {
            res.then(function (awaitedResult) {
              if (iterationResult === _iterator.STOP_ITERATION || awaitedResult === false) {
                resolve();
              } else {
                doIterate();
              }
            }, function (err) {
              reject(err);
            });
            return {
              v: void 0
            };
          }

          if (iterationResult === _iterator.STOP_ITERATION || res === false) {
            resolve();
            return {
              v: void 0
            };
          }

          var endTime = Date.now();
          cycleEndTime = endTime - cycleStartTime;
          totalTime += cycleEndTime;

          if (totalTime > 1000) {
            // Break the loop when the process is continued for more than 1s
            return 'break';
          }

          if (cycleEndTime < 10) {
            // Delay is not required for fast iteration
            return 'continue';
          }

          var risk = Math.min(10, Math.floor(cycleEndTime / 10));
          var margin = endTime % (10 - risk);
          if (!margin) {
            // Break the loop if processing has exceeded the allowable
            return 'break';
          }
        };

        _loop2: for (;;) {
          var _ret = _loop();

          switch (_ret) {
            case 'break':
              break _loop2;

            case 'continue':
              continue;

            default:
              if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
          }
        }
      } catch (e) {
        reject(e);
        return;
      }

      // Add delay corresponding to the processing speed
      var time = Math.sqrt(cycleEndTime) * Math.min(1000, cycleEndTime) / 80;
      var delay = Math.min(1000, Math.floor(time));
      totalTime = 0;

      if (delay > 10) {
        setTimeout(doIterate, delay);
      } else {
        (0, _nextTick2.default)(doIterate);
      }
    }

    (0, _nextTick2.default)(doIterate);
  });
}

},{"./iterator":3,"./next-tick":4,"./util":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTINUE_ITERATION = exports.STOP_ITERATION = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.forEach = forEach;
exports.repeat = repeat;
exports.till = till;
exports.forOf = forOf;

var _util = require('./util');

var STOP_ITERATION = exports.STOP_ITERATION = {};
var CONTINUE_ITERATION = exports.CONTINUE_ITERATION = {};

function forEach(obj, callback, context) {
  var i = 0;
  var len = void 0;

  if ((0, _util.isArrayLike)(obj)) {
    len = obj.length;

    return {
      next: function next() {
        if (i >= len) {
          return [STOP_ITERATION, null];
        }

        var res = callback.call(context, obj[i], i, obj);
        i++;
        return [CONTINUE_ITERATION, res];
      }
    };
  }

  var keys = Object.keys(obj);
  len = keys.length;

  return {
    next: function next() {
      if (i >= len) {
        return [STOP_ITERATION, null];
      }

      var key = keys[i++];
      var res = callback.call(context, obj[key], key, obj);
      return [CONTINUE_ITERATION, res];
    }
  };
}

function repeat(count, callback, context) {
  var i = void 0;
  var step = void 0;
  var end = void 0;

  if (count && (typeof count === 'undefined' ? 'undefined' : _typeof(count)) === 'object') {
    i = count.start || 0;
    step = count.step || 1;
    end = count.end;
  } else {
    i = 0;
    step = 1;
    end = count;
  }

  return {
    next: function next() {
      var res = callback.call(context, i);

      i += step;
      if (i >= end) {
        return [STOP_ITERATION, res];
      }
      return [CONTINUE_ITERATION, res];
    }
  };
}

function till(callback, context) {
  return {
    next: function next() {
      var res = callback.call(context);
      return [CONTINUE_ITERATION, res];
    }
  };
}

function forOf(iterable, callback, context) {
  var it = iterable[Symbol.iterator]();

  return {
    next: function next() {
      var nextIterator = it.next();

      if (nextIterator.done) {
        return [STOP_ITERATION, null];
      }
      var res = callback.call(context, nextIterator.value, iterable);
      return [CONTINUE_ITERATION, res];
    }
  };
}

},{"./util":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var nextTick = function () {
  if (typeof setImmediate === 'function') {
    return function (task) {
      setImmediate(task);
    };
  }

  if ((typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && typeof process.nextTick === 'function') {
    return function (task) {
      process.nextTick(task);
    };
  }

  if (typeof MessageChannel === 'function') {
    // http://www.nonblocking.io/2011/06/windownexttick.html
    var channel = new MessageChannel();
    var head = {};
    var tail = head;

    channel.port1.onmessage = function () {
      head = head.next;
      var task = head.task;
      delete head.task;
      task();
    };

    return function (task) {
      tail = tail.next = { task: task };
      channel.port2.postMessage(0);
    };
  }

  return function (task) {
    setTimeout(task, 0);
  };
}();

exports.default = nextTick;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isThenable = isThenable;
exports.isArrayLike = isArrayLike;
function isThenable(x) {
  return x != null && typeof x.then === 'function';
}

function isArrayLike(x) {
  return x != null && typeof x.length === 'number' && x.length >= 0;
}

},{}]},{},[1])(1)
});
