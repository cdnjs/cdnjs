(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('queue', factory) :
  (global.queue = factory());
}(this, function () { 'use strict';

  var slice = [].slice;

  function noop() {}

  var noabort = {};
  var success = [null];
  function newQueue(concurrency) {
    if (!(concurrency >= 1)) throw new Error;

    var q,
        tasks = [],
        results = [],
        waiting = 0,
        active = 0,
        ended = 0,
        starting, // inside a synchronous task callback?
        error,
        callback = noop,
        callbackAll = true;

    function start() {
      if (starting) return; // let the current task complete
      while (starting = waiting && active < concurrency) {
        var i = ended + active,
            t = tasks[i],
            j = t.length - 1,
            c = t[j];
        t[j] = end(i);
        --waiting, ++active, tasks[i] = c.apply(null, t) || noabort;
      }
    }

    function end(i) {
      return function(e, r) {
        if (!tasks[i]) throw new Error; // detect multiple callbacks
        --active, ++ended, tasks[i] = null;
        if (error != null) return; // only report the first error
        if (e != null) {
          abort(e);
        } else {
          results[i] = r;
          if (waiting) start();
          else if (!active) notify();
        }
      };
    }

    function abort(e) {
      error = e; // ignore new tasks and squelch active callbacks
      waiting = NaN; // stop queued tasks from starting
      notify();
    }

    function notify() {
      if (error != null) callback(error);
      else if (callbackAll) callback(null, results);
      else callback.apply(null, success.concat(results));
    }

    return q = {
      defer: function(f) {
        if (callback !== noop) throw new Error;
        var t = slice.call(arguments, 1);
        t.push(f);
        ++waiting, tasks.push(t);
        start();
        return q;
      },
      abort: function() {
        if (error == null) {
          var i = ended + active, t;
          while (--i >= 0) (t = tasks[i]) && t.abort && t.abort();
          abort(new Error("abort"));
        }
        return q;
      },
      await: function(f) {
        if (callback !== noop) throw new Error;
        callback = f, callbackAll = false;
        if (!waiting && !active) notify();
        return q;
      },
      awaitAll: function(f) {
        if (callback !== noop) throw new Error;
        callback = f, callbackAll = true;
        if (!waiting && !active) notify();
        return q;
      }
    };
  }

  function queue(concurrency) {
    return newQueue(arguments.length ? +concurrency : Infinity);
  }

  queue.version = "1.2.1";

  return queue;

}));