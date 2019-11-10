(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.timer = {}));
}(this, function (exports) { 'use strict';

  var queueHead;
  var queueTail;
  var active;
  var frame;
  var timeout;
  var timeoutTime = Infinity;
  // the time the timeout will fire

  var setFrame = typeof window !== "undefined"
      && (window.requestAnimationFrame
        || window.msRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.oRequestAnimationFrame)
        || function(callback) { return setTimeout(callback, 17); };

  // The timer will continue to fire until callback returns true.
  function timer(callback, delay, time) {
    time = time == null ? Date.now() : +time;
    if (delay != null) time += +delay;

    // Add the callback to the tail of the queue.
    var timer = {callback: callback, time: time, flush: false, next: null};
    if (queueTail) queueTail.next = timer;
    else queueHead = timer;
    queueTail = timer;

    // Set an alarm to wake up for the timer’s first tick, if necessary.
    if (!frame && !active) wakeAt(time);
  };

  // Replace the current timer. Only allowed within a timer callback.
  function timerReplace(callback, delay, time) {
    time = time == null ? Date.now() : +time;
    if (delay != null) time += +delay;
    active.callback = callback;
    active.time = time;
  };

  // Execute all eligible timers,
  // then flush completed timers to avoid concurrent queue modification.
  // Returns the time of the earliest active timer.
  function timerFlush(time) {
    time = time == null ? Date.now() : +time;
    var active0 = active;

    // Note: timerFlush can be re-entrant, so we must preserve the old active.
    active = queueHead;
    while (active) {
      if (time >= active.time) active.flush = active.callback(time - active.time, time);
      active = active.next;
    }
    active = active0;
    time = Infinity;

    // Note: invoking a timer callback can change the timer queue (due to a re-
    // entrant timerFlush or scheduling a new timer). Thus we must defer capturing
    // queueHead until after we’ve invoked all callbacks.
    var t0,
        t1 = queueHead;
    while (t1) {
      if (t1.flush) {
        t1 = t0 ? t0.next = t1.next : queueHead = t1.next;
      } else {
        if (t1.time < time) time = t1.time;
        t1 = (t0 = t1).next;
      }
    }
    queueTail = t0;
    return time;
  };

  function wake() {
    frame = timeout = 0, timeoutTime = Infinity;
    wakeAt(timerFlush());
  }

  function wakeAt(time) {
    var delay = time - Date.now();
    if (delay > 24) {
      if (timeoutTime > time) { // Note: false if time is infinite.
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(wake, delay);
        timeoutTime = time;
      }
    } else {
      if (timeout) timeout = clearTimeout(timeout), timeoutTime = Infinity;
      frame = setFrame(wake);
    }
  }

  exports.timer = timer;
  exports.timerReplace = timerReplace;
  exports.timerFlush = timerFlush;

}));