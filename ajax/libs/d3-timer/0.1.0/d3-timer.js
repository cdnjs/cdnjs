(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3-timer', ['exports'], factory) :
  factory((global.d3_timer = {}));
}(this, function (exports) { 'use strict';

  var frame = 0;
  var timeout = 0;
  var taskHead;
  var taskTail;
  var taskId = 0;
  var taskById = {};
  var setFrame = typeof window !== "undefined"
      && (window.requestAnimationFrame
        || window.msRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.oRequestAnimationFrame)
        || function(callback) { return setTimeout(callback, 17); };

  function Timer(callback, delay, time) {
    this.id = ++taskId;
    this.restart(callback, delay, time);
  }

  Timer.prototype = timer.prototype = {
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? Date.now() : +time) + (delay == null ? 0 : +delay);
      var i = this.id, t = taskById[i];
      if (t) {
        t.callback = callback, t.time = time;
      } else {
        t = {next: null, callback: callback, time: time};
        if (taskTail) taskTail.next = t; else taskHead = t;
        taskById[i] = taskTail = t;
      }
      sleep();
    },
    stop: function() {
      var i = this.id, t = taskById[i];
      if (t) {
        t.callback = null, t.time = Infinity;
        delete taskById[i];
        sleep();
      }
    }
  };

  function timer(callback, delay, time) {
    return new Timer(callback, delay, time);
  };

  function timerFlush(time) {
    time = time == null ? Date.now() : +time;
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    try {
      var t = taskHead, c;
      while (t) {
        if (time >= t.time) c = t.callback, c(time - t.time, time);
        t = t.next;
      }
    } finally {
      --frame;
    }
  };

  function wake() {
    frame = timeout = 0;
    try {
      timerFlush();
    } finally {
      var t0, t1 = taskHead, time = Infinity;
      while (t1) {
        if (t1.callback) {
          if (time > t1.time) time = t1.time;
          t1 = (t0 = t1).next;
        } else {
          t1 = t0 ? t0.next = t1.next : taskHead = t1.next;
        }
      }
      taskTail = t0;
      sleep(time);
    }
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout) timeout = clearTimeout(timeout);
    var delay = time - Date.now();
    if (delay > 24) { if (time < Infinity) timeout = setTimeout(wake, delay); }
    else frame = 1, setFrame(wake);
  }

  var version = "0.1.0";

  exports.version = version;
  exports.timer = timer;
  exports.timerFlush = timerFlush;

}));