/*!
 * chillout v4.0.4 - Reduce CPU usage by non-blocking async loop and psychologically speed up in JavaScript
 * Copyright (c) 2017-2019 polygon planet <polygon.planet.aqua@gmail.com>
 * https://github.com/polygonplanet/chillout
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.chillout = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = forEach;
exports.repeat = repeat;
exports.until = until;
exports.waitUntil = waitUntil;
exports.forOf = forOf;
Object.defineProperty(exports, "iterate", {
  enumerable: true,
  get: function get() {
    return _iterate["default"];
  }
});
Object.defineProperty(exports, "isThenable", {
  enumerable: true,
  get: function get() {
    return _util.isThenable;
  }
});
Object.defineProperty(exports, "isArrayLike", {
  enumerable: true,
  get: function get() {
    return _util.isArrayLike;
  }
});
Object.defineProperty(exports, "nextTick", {
  enumerable: true,
  get: function get() {
    return _nextTick["default"];
  }
});
Object.defineProperty(exports, "StopIteration", {
  enumerable: true,
  get: function get() {
    return _stopIteration["default"];
  }
});
exports.iterator = void 0;

var iterator = _interopRequireWildcard(require("./iterator"));

exports.iterator = iterator;

var _iterate = _interopRequireDefault(require("./iterate"));

var _util = require("./util");

var _nextTick = _interopRequireDefault(require("./next-tick"));

var _stopIteration = _interopRequireDefault(require("./stop-iteration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Executes a provided function once per array or object element.
 * The iteration will break if the callback function returns `chillout.StopIteration`,
 *  or an error occurs.
 * This method can be called like JavaScript `Array forEach`.
 *
 * @param {Array|Object} obj Target array or object
 * @param {Function} callback Function to execute for each element, taking three arguments:
 * - value: The current element being processed in the array/object
 * - key: The key of the current element being processed in the array/object
 * - obj: The array/object that `forEach` is being applied to
 * @param {Object} [context] Value to use as `this` when executing callback
 * @return {Promise} Return new Promise
 */
function forEach(obj, callback, context) {
  return (0, _iterate["default"])(iterator.forEach(obj, callback, context));
}
/**
 * Executes a provided function the specified number times.
 * The iteration will break if the callback function returns `chillout.StopIteration`,
 *  or an error occurs.
 * This method can be called like JavaScript `for` statement.
 *
 * @param {number|Object} count The number of times or object for execute the
 *   function. Following parameters are available if specify object:
 * - start: The number of start
 * - step: The number of step
 * - end: The number of end
 * @param {Function} callback Function to execute for each times, taking one argument:
 * - i: The current number
 * @param {Object} [context] Value to use as `this` when executing callback
 * @return {Promise} Return new Promise
 */


function repeat(count, callback, context) {
  return (0, _iterate["default"])(iterator.repeat(count, callback, context));
}
/**
 * Executes a provided function until the `callback` returns `chillout.StopIteration`,
 *  or an error occurs.
 * This method can be called like JavaScript `while (true) { ... }` statement.
 *
 * @param {Function} callback The function that is executed for each iteration
 * @param {Object} [context] Value to use as `this` when executing callback
 * @return {Promise} Return new Promise
 */


function until(callback, context) {
  return (0, _iterate["default"])(iterator.until(callback, context));
} // Minimum setTimeout interval for waitUntil


var WAIT_UNTIL_INTERVAL = 13;
/**
 * Executes a provided function until the `callback` returns `chillout.StopIteration`,
 *  or an error occurs.
 * This method can be called like JavaScript `while (true) { ... }` statement,
 *  and it works same as `until`, but it executes tasks with more slowly interval
 *  than `until` to reduce CPU load.
 * This method is useful when you want to wait until some processing done.
 *
 * @param {Function} callback The function that is executed for each iteration
 * @param {Object} [context] Value to use as `this` when executing callback
 * @return {Promise} Return new Promise
 */

function waitUntil(callback, context) {
  return (0, _iterate["default"])(iterator.until(callback, context), WAIT_UNTIL_INTERVAL);
}
/**
 * Iterates the iterable objects, similar to the `for-of` statement.
 * Executes a provided function once per element.
 * The iteration will break if the callback function returns `chillout.StopIteration`,
 *   or an error occurs.
 *
 * @param {Array|string|Object} iterable Target iterable objects
 * @param {Function} callback Function to execute for each element, taking one argument:
 * - value: A value of a property on each iteration
 * @param {Object} [context] Value to use as `this` when executing callback
 * @return {Promise} Return new Promise
 */


function forOf(iterable, callback, context) {
  return (0, _iterate["default"])(iterator.forOf(iterable, callback, context));
}

},{"./iterate":2,"./iterator":3,"./next-tick":4,"./stop-iteration":5,"./util":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = iterate;

var _util = require("./util");

var _stopIteration = _interopRequireDefault(require("./stop-iteration"));

var _nextTick = _interopRequireDefault(require("./next-tick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function iterate(it) {
  var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return new Promise(function (resolve, reject) {
    var totalTime = 0;

    function doIterate() {
      var cycleStartTime = Date.now();
      var cycleEndTime;

      try {
        var _loop2 = function _loop2() {
          var _it$next = it.next(),
              _it$next2 = _slicedToArray(_it$next, 2),
              isStop = _it$next2[0],
              value = _it$next2[1];

          if ((0, _util.isThenable)(value)) {
            value.then(function (awaitedValue) {
              if (isStop) {
                resolve(awaitedValue);
              } else if (awaitedValue === _stopIteration["default"]) {
                resolve();
              } else {
                doIterate();
              }
            }, reject);
            return {
              v: void 0
            };
          }

          if (isStop) {
            resolve(value);
            return {
              v: void 0
            };
          }

          if (value === _stopIteration["default"]) {
            resolve();
            return {
              v: void 0
            };
          }

          if (interval > 0) {
            return "break";
          }

          var endTime = Date.now();
          cycleEndTime = endTime - cycleStartTime;
          totalTime += cycleEndTime;

          if (totalTime > 1000) {
            // Break the loop when the process is continued for more than 1s
            return "break";
          }

          if (cycleEndTime < 10) {
            // Delay is not required for fast iteration
            return "continue";
          }

          var risk = Math.min(10, Math.floor(cycleEndTime / 10));
          var margin = endTime % (10 - risk);

          if (!margin) {
            // Break the loop if processing has exceeded the allowable
            return "break";
          }
        };

        _loop: for (;;) {
          var _ret = _loop2();

          switch (_ret) {
            case "break":
              break _loop;

            case "continue":
              continue;

            default:
              if (_typeof(_ret) === "object") return _ret.v;
          }
        }
      } catch (e) {
        reject(e);
        return;
      }

      if (interval > 0) {
        // Short timeouts will throttled to >=4ms by the browser, so we execute tasks
        // slowly enough to reduce CPU load
        var delay = Math.min(1000, Date.now() - cycleStartTime + interval);
        setTimeout(doIterate, delay);
      } else {
        // Add delay corresponding to the processing speed
        var time = Math.sqrt(cycleEndTime) * Math.min(1000, cycleEndTime) / 80;

        var _delay = Math.min(1000, Math.floor(time));

        totalTime = 0;

        if (_delay > 10) {
          setTimeout(doIterate, _delay);
        } else {
          (0, _nextTick["default"])(doIterate);
        }
      }
    } // The first call doesn't need to wait, so it will execute a task immediately


    (0, _nextTick["default"])(doIterate);
  });
}

},{"./next-tick":4,"./stop-iteration":5,"./util":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = forEach;
exports.repeat = repeat;
exports.until = until;
exports.forOf = forOf;

var _util = require("./util");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function forEach(obj, callback, context) {
  var i = 0;
  var len;

  if ((0, _util.isArrayLike)(obj)) {
    len = obj.length;
    return {
      next: function next() {
        if (i >= len) {
          return [true, null];
        }

        var value = callback.call(context, obj[i], i, obj);
        i++;
        return [false, value];
      }
    };
  }

  var keys = Object.keys(obj);
  len = keys.length;
  return {
    next: function next() {
      if (i >= len) {
        return [true, null];
      }

      var key = keys[i++];
      var value = callback.call(context, obj[key], key, obj);
      return [false, value];
    }
  };
}

function repeat(count, callback, context) {
  var i;
  var step;
  var done;

  if (count && _typeof(count) === 'object') {
    i = count.start || 0;
    step = count.step || 1;
    done = count.done;
  } else {
    i = 0;
    step = 1;
    done = count;
  }

  return {
    next: function next() {
      var value = callback.call(context, i);
      i += step;

      if (i >= done) {
        return [true, value];
      }

      return [false, value];
    }
  };
}

function until(callback, context) {
  return {
    next: function next() {
      var value = callback.call(context);
      return [false, value];
    }
  };
}

function forOf(iterable, callback, context) {
  var it = iterable[Symbol.iterator]();
  return {
    next: function next() {
      var nextIterator = it.next();

      if (nextIterator.done) {
        return [true, null];
      }

      var value = callback.call(context, nextIterator.value, iterable);
      return [false, value];
    }
  };
}

},{"./util":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var nextTick = function () {
  if (typeof setImmediate === 'function') {
    return function (task) {
      setImmediate(task);
    };
  }

  if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && typeof process.nextTick === 'function') {
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
      tail = tail.next = {
        task: task
      };
      channel.port2.postMessage(0);
    };
  }

  return function (task) {
    setTimeout(task, 0);
  };
}();

var _default = nextTick;
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var StopIteration = {};
var _default = StopIteration;
exports["default"] = _default;

},{}],6:[function(require,module,exports){
"use strict";

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
