if (typeof requestAnimationFrame === "undefined") {
  requestAnimationFrame = typeof window !== "undefined"
      && (window.msRequestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.oRequestAnimationFrame)
      || function(callback) { return setTimeout(callback, 17); };
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.timer = {}));
}(this, function (exports) { 'use strict';

  var queueHead,
      queueTail,
      active, // the currently-executing timer
      frame, // is an animation frame pending?
      timeout; // is a timeout pending?

  function step() {
    frame = 0;
    var delay = timerFlush();
    if (frame) return; // Return if timer(…) was called during flush.
    if (delay > 24) {
      if (isFinite(delay)) {
        clearTimeout(timeout);
        timeout = setTimeout(step, delay);
      }
    } else {
      frame = requestAnimationFrame(step);
    }
  }

  function Timer(callback, time) {
    this.callback = callback;
    this.time = time;
    this.flush = false;
    this.next = null;
  }


  // The timer will continue to fire until callback returns true.
  function timer(callback, delay, then) {
    if (delay == null) delay = 0;
    if (then == null) then = Date.now();

    // Add the callback to the tail of the queue.
    var timer = new Timer(callback, then + delay);
    if (queueTail) queueTail.next = timer;
    else queueHead = timer;
    queueTail = timer;

    // Start animatin’!
    if (!frame) {
      timeout = clearTimeout(timeout);
      frame = requestAnimationFrame(step);
    }
  }


  // Replace the current timer. Only allowed within a timer callback.
  function timerReplace(callback, delay, then) {
    if (delay == null) delay = 0;
    if (then == null) then = Date.now();
    active.callback = callback;
    active.time = then + delay;
  }


  // Execute all eligible timers,
  // then flush completed timers to avoid concurrent queue modification.
  // Returns the delay until the nextmost active timer.
  function timerFlush() {
    var now = Date.now(),
        active0 = active;

    // Note: timerFlush can be re-entrant, so we must preserve the old active.
    active = queueHead;
    while (active) {
      if (now >= active.time) active.flush = active.callback(now - active.time, now);
      active = active.next;
    }
    active = active0;

    // Note: invoking a timer callback can change the timer queue (due to a re-
    // entrant timerFlush or scheduling a new timer). Thus we must defer capturing
    // queueHead until after we’ve invoked all callbacks.
    var t0,
        t1 = queueHead,
        time = Infinity;
    while (t1) {
      if (t1.flush) {
        t1 = t0 ? t0.next = t1.next : queueHead = t1.next;
      } else {
        if (t1.time < time) time = t1.time;
        t1 = (t0 = t1).next;
      }
    }
    queueTail = t0;
    return time - now;
  }

  exports.timer = timer;
  exports.timerReplace = timerReplace;
  exports.timerFlush = timerFlush;

}));