/*!
 * chillout v3.1.5 - Reduce CPU usage in JavaScript
 * Copyright (c) 2017 polygon planet <polygon.planet.aqua@gmail.com>
 * https://github.com/polygonplanet/chillout
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.chillout = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
exports.default = iterate;

var _nexttick = require('./nexttick');

var _nexttick2 = _interopRequireDefault(_nexttick);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function iterate(it) {
  return new Promise(function (resolve, reject) {
    var totalTime = 0;

    function doIterate() {
      var cycleStartTime = Date.now();
      var cycleEndTime = void 0;

      try {
        for (;;) {
          var res = it.next();
          if (res === false) {
            resolve();
            return;
          }

          if ((0, _util.isThenable)(res)) {
            res.then(function (value) {
              if (value === false) {
                resolve();
              } else {
                doIterate();
              }
            }, function (err) {
              reject(err);
            });
            return;
          }

          var endTime = Date.now();
          cycleEndTime = endTime - cycleStartTime;
          totalTime += cycleEndTime;

          if (totalTime > 1000) {
            // Break the loop when the process is continued for more than 1s
            break;
          }

          if (cycleEndTime < 10) {
            // Delay is not required for fast iteration
            continue;
          }

          var risk = Math.min(10, Math.floor(cycleEndTime / 10));
          var margin = endTime % (10 - risk);
          if (!margin) {
            // Break the loop if processing has exceeded the allowable
            break;
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
        (0, _nexttick2.default)(doIterate);
      }
    }

    (0, _nexttick2.default)(doIterate);
  });
}

},{"./nexttick":4,"./util":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.forEach = forEach;
exports.repeat = repeat;
exports.till = till;
exports.forOf = forOf;

var _util = require('./util');

function forEach(obj, callback, context) {
  var i = 0;
  var len = void 0;

  if ((0, _util.isArrayLike)(obj)) {
    len = obj.length;

    return {
      next: function next() {
        if (i >= len) {
          return false;
        }
        return callback.call(context, obj[i], i++, obj);
      }
    };
  }

  var keys = Object.keys(obj);
  len = keys.length;

  return {
    next: function next() {
      if (i >= len) {
        return false;
      }

      var key = keys[i++];
      return callback.call(context, obj[key], key, obj);
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
        return false;
      }
      return res;
    }
  };
}

function till(callback, context) {
  return {
    next: function next() {
      return callback.call(context);
    }
  };
}

function forOf(iterable, callback, context) {
  var it = iterable[Symbol.iterator]();

  return {
    next: function next() {
      var res = it.next();

      if (res.done) {
        return false;
      }
      return callback.call(context, res.value, iterable);
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