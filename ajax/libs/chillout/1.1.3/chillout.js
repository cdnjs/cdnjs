/**
 * chillout
 *
 * @description Reduce JavaScript CPU usage by asynchronous iteration
 * @version     1.1.3
 * @date        2016-01-29
 * @link        https://github.com/polygonplanet/chillout
 * @copyright   Copyright (c) 2016 polygon planet <polygon.planet.aqua@gmail.com>
 * @license     MIT
 */

/*jshint bitwise:false, eqnull:true */
(function(name, context, factory) {

  // Supports AMD, Node.js, CommonJS and browser context
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = factory();
    } else {
      exports[name] = factory();
    }
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    context[name] = factory();
  }

}('chillout', this, function() {
  'use strict';

  var chillout = {};

  // nextTick implementation
  if (typeof setImmediate === 'function') {
    chillout.nextTick = function(task) {
      setImmediate(task);
    };
  } else if (typeof process === 'object' && typeof process.nextTick === 'function') {
    chillout.nextTick = function(task) {
      process.nextTick(task);
    };
  } else if (typeof MessageChannel === 'function') {
    chillout.nextTick = (function() {
      // http://www.nonblocking.io/2011/06/windownexttick.html
      var channel = new MessageChannel();
      var head = {}, tail = head;

      channel.port1.onmessage = function() {
        head = head.next;
        var task = head.task;
        delete head.task;
        task();
      };

      return function(task) {
        tail = tail.next = {task: task};
        channel.port2.postMessage(0);
      };
    }());
  } else {
    chillout.nextTick = function(task) {
      setTimeout(task, 0);
    };
  }


  var iterator = {
    each: function(obj, callback, context) {
      var i = 0;
      var len;

      if (Array.isArray(obj)) {
        len = obj.length;

        return {
          next: function() {
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
        next: function() {
          if (i >= len) {
            return false;
          }

          var key = keys[i++];
          return callback.call(context, obj[key], key, obj);
        }
      };
    },
    repeat: function(count, callback, context) {
      var i, step, end;

      if (count && typeof count === 'object') {
        i = count.start || 0;
        step = count.step || 1;
        end = count.end;
      } else {
        i = 0;
        step = 1;
        end = count;
      }

      return {
        next: function() {
          var res = callback.call(context, i);

          i += step;
          if (i >= end) {
            return false;
          }
          return res;
        }
      };
    },
    forever: function(callback, context) {
      return {
        next: function() {
          return callback.call(context);
        }
      };
    }
  };


  function iterate(it) {
    return new Promise(function(resolve, reject) {
      var totalTime = 0;

      function then(value) {
        value.then(function(res) {
          if (res === false) {
            resolve();
          } else {
            _iterate();
          }
        }, function(err) {
          reject(err);
        });
      }

      function _iterate() {
        var cycleStartTime = Date.now();
        var res, risk, margin, delay, time, endTime, cycleEndTime;

        for (;;) {
          try {
            res = it.next();
            if (res === false) {
              resolve();
              return;
            }

            if (isThenable(res)) {
              then(res);
              return;
            }
          } catch (e) {
            reject(e);
            return;
          }

          endTime = Date.now();
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

          risk = Math.min(10, Math.floor(cycleEndTime / 10));
          margin = endTime % (10 - risk);
          if (!margin) {
            // Break the loop if processing has exceeded the allowable
            break;
          }
        }

        // Add delay corresponding to the processing speed
        time = Math.sqrt(cycleEndTime) * Math.min(1000, cycleEndTime) / 80;
        delay = Math.min(1000, Math.floor(time));
        totalTime = 0;

        if (delay > 10) {
          setTimeout(_iterate, delay);
        } else {
          chillout.nextTick(_iterate);
        }
      }

      chillout.nextTick(_iterate);
    });
  }


  /**
   * Executes a provided function once per array or object element.
   * The iteration will break if the callback function returns `false`.
   *
   * @param {Array|Object} obj Target array or object.
   * @param {Function} callback Function to execute for each element,
   *   taking three arguments:
   * - value: The current element being processed in the array/object.
   * - key: The key of the current element being processed in the array/object.
   * - obj: The array/object that `each` is being applied to.
   * @param {Object} [context] Value to use as `this` when executing callback.
   * @return {Promise} Return new Promise.
   */
  chillout.each = function(obj, callback, context) {
    return iterate(iterator.each(obj, callback, context));
  };

  /**
   * Executes a provided function the specified number times.
   * The iteration will break if the callback function returns `false`.
   *
   * @param {number|Object} count The number of times or object for execute
   *   the function. Following parameters are available if specify object:
   * - start: The number of start.
   * - step: The number of step.
   * - end: The number of end.
   * @param {Function} callback Function to execute for each times,
   *   taking an argument:
   * - i: The current number.
   * @param {Object} [context] Value to use as `this` when executing callback.
   * @return {Promise} Return new Promise.
   */
  chillout.repeat = function(count, callback, context) {
    return iterate(iterator.repeat(count, callback, context));
  };

  /**
   * Executes a provided function forever.
   * The iteration will break if the callback function returns `false`.
   *
   * @param {Function} callback The function that is executed for each
   *   iteration.
   * @param {Object} [context] Value to use as `this` when executing callback.
   * @return {Promise} Return new Promise.
   */
  chillout.forever = function(callback, context) {
    return iterate(iterator.forever(callback, context));
  };


  function isThenable(x) {
    return x != null && typeof x.then === 'function';
  }

  return chillout;
}));
