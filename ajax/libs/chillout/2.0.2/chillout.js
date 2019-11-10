/*!
 * chillout v2.0.2 - Reduce JavaScript CPU usage by asynchronous iteration
 * Copyright (c) 2016 polygon planet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.chillout = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.each = each;
exports.repeat = repeat;
exports.forever = forever;

var _iterator = require('./iterator');

var _iterate = require('./iterate');

/**
 * Executes a provided function once per array or object element.
 * The iteration will break if the callback function returns `false`.
 *
 * @param {Array|Object} obj Target array or object.
 * @param {Function} callback Function to execute for each element, taking
 *   three arguments:
 * - value: The current element being processed in the array/object.
 * - key: The key of the current element being processed in the array/object.
 * - obj: The array/object that `each` is being applied to.
 * @param {Object} [context] Value to use as `this` when executing callback.
 * @return {Promise} Return new Promise.
 */
function each(obj, callback, context) {
  return (0, _iterate.iterate)(_iterator.iterator.each(obj, callback, context));
}

/**
 * Executes a provided function the specified number times.
 * The iteration will break if the callback function returns `false`.
 *
 * @param {number|Object} count The number of times or object for execute the
 *   function. Following parameters are available if specify object:
 * - start: The number of start.
 * - step: The number of step.
 * - end: The number of end.
 * @param {Function} callback Function to execute for each times, taking an
 *   argument:
 * - i: The current number.
 * @param {Object} [context] Value to use as `this` when executing callback.
 * @return {Promise} Return new Promise.
 */
function repeat(count, callback, context) {
  return (0, _iterate.iterate)(_iterator.iterator.repeat(count, callback, context));
}

/**
 * Executes a provided function forever.
 * The iteration will break if the callback function returns `false`.
 *
 * @param {Function} callback The function that is executed for each iteration.
 * @param {Object} [context] Value to use as `this` when executing callback.
 * @return {Promise} Return new Promise.
 */
function forever(callback, context) {
  return (0, _iterate.iterate)(_iterator.iterator.forever(callback, context));
}

},{"./iterate":2,"./iterator":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterate = iterate;

var _nexttick = require('./nexttick');

var _util = require('./util');

function iterate(it) {
  return new Promise(function (resolve, reject) {
    var totalTime = 0;

    function then(value) {
      value.then(function (res) {
        if (res === false) {
          resolve();
        } else {
          _iterate();
        }
      }, function (err) {
        reject(err);
      });
    }

    function _iterate() {
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
            then(res);
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
        setTimeout(_iterate, delay);
      } else {
        (0, _nexttick.nextTick)(_iterate);
      }
    }

    (0, _nexttick.nextTick)(_iterate);
  });
}

},{"./nexttick":4,"./util":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterator = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _util = require('./util');

var iterator = exports.iterator = {
  each: function each(obj, callback, context) {
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
  },
  repeat: function repeat(count, callback, context) {
    var i = void 0,
        step = void 0,
        end = void 0;

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
  },
  forever: function forever(callback, context) {
    return {
      next: function next() {
        return callback.call(context);
      }
    };
  }
};

},{"./util":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var nextTick = exports.nextTick = function () {
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
    var _ret = function () {
      // http://www.nonblocking.io/2011/06/windownexttick.html
      var channel = new MessageChannel();
      var head = {},
          tail = head;

      channel.port1.onmessage = function () {
        head = head.next;
        var task = head.task;
        delete head.task;
        task();
      };

      return {
        v: function v(task) {
          tail = tail.next = { task: task };
          channel.port2.postMessage(0);
        }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  return function (task) {
    setTimeout(task, 0);
  };
}();

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