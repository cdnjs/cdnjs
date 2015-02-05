(function() {
  if (typeof module === "undefined") self.queue = queue;
  else module.exports = queue;
  queue.version = "1.0.3";

  var slice = [].slice;

  function queue(parallelism) {
    var queue = {},
        deferrals = [],
        started = 0, // number of deferrals that have been started (and perhaps finished)
        active = 0, // number of deferrals currently being executed (started but not finished)
        remaining = 0, // number of deferrals not yet finished
        popping, // inside a synchronous deferral callback?
        error,
        await = noop,
        all;

    if (!parallelism) parallelism = Infinity;

    queue.defer = function() {
      if (!error) {
        deferrals.push(arguments);
        ++remaining;
        pop();
      }
      return queue;
    };

    queue.await = function(f) {
      await = f;
      all = false;
      if (!remaining) notify();
      return queue;
    };

    queue.awaitAll = function(f) {
      await = f;
      all = true;
      if (!remaining) notify();
      return queue;
    };

    function pop() {
      while (popping = started < deferrals.length && active < parallelism) {
        var i = started++,
            d = deferrals[i],
            a = slice.call(d, 1);
        a.push(callback(i));
        ++active;
        d[0].apply(null, a);
      }
    }

    function callback(i) {
      return function(e, r) {
        --active;
        if (error != null) return;
        if (e != null) {
          error = e; // ignore new deferrals and squelch active callbacks
          started = remaining = NaN; // stop queued deferrals from starting
          notify();
        } else {
          deferrals[i] = r;
          if (--remaining) popping || pop();
          else notify();
        }
      };
    }

    function notify() {
      if (error != null) await(error);
      else if (all) await(null, deferrals);
      else await.apply(null, [null].concat(deferrals));
    }

    return queue;
  }

  function noop() {}
})();
