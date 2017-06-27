(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_timer = {})));
}(this, function (exports) { 'use strict';

  var frame = 0;
  var timeout = 0;
  var taskHead;
  var taskTail;
  var clockNow = 0;
  var clock = typeof performance === "object" ? performance : Date;
  var setFrame = typeof requestAnimationFrame === "function" ? requestAnimationFrame : function(callback) { return setTimeout(callback, 17); };
  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now());
  }

  function clearNow() {
    clockNow = 0;
  }

  function Timer() {
    this._call =
    this._time =
    this._next = null;
  }

  Timer.prototype = timer.prototype = {
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._call) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };

  function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
  }

  function timerOnce(callback, delay, time) {
    var t = new Timer;
    t.restart(function(elapsed) { t.stop(); callback(elapsed); }, delay, time);
    return t;
  }

  function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead;
    while (t) {
      if (clockNow >= t._time) t._call.call(null, clockNow - t._time);
      t = t._next;
    }
    --frame;
  }

  function wake(time) {
    clockNow = time || clock.now();
    frame = timeout = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }

  function nap() {
    var t0, t1 = taskHead, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t1 = (t0 = t1)._next;
      } else {
        t1 = t0 ? t0._next = t1._next : taskHead = t1._next;
      }
    }
    taskTail = t0;
    sleep(time);
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout) timeout = clearTimeout(timeout);
    var delay = time - clockNow;
    if (delay > 24) { if (time < Infinity) timeout = setTimeout(wake, delay); }
    else frame = 1, setFrame(wake);
  }

  var version = "0.3.0";

  exports.version = version;
  exports.now = now;
  exports.timer = timer;
  exports.timerOnce = timerOnce;
  exports.timerFlush = timerFlush;

}));