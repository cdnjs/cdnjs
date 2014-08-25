(function() {
  if (typeof module === "undefined") self.queue = queue;
  else module.exports = queue;
  queue.version = "1.0.2";

  var slice = [].slice;

  function queue(parallelism) {
    var queue = {},
        active = 0, // number of in-flight deferrals
        remaining = 0, // number of deferrals remaining
        head, tail, // singly-linked list of deferrals
        error = null,
        results = [],
        await = noop,
        awaitAll;

    if (!parallelism) parallelism = Infinity;

    queue.defer = function() {
      if (!error) {
        var node = arguments;
        node.i = results.push(undefined) - 1;
        if (tail) tail._ = node, tail = tail._;
        else head = tail = node;
        ++remaining;
        pop();
      }
      return queue;
    };

    queue.await = function(f) {
      await = f;
      awaitAll = false;
      if (!remaining) notify();
      return queue;
    };

    queue.awaitAll = function(f) {
      await = f;
      awaitAll = true;
      if (!remaining) notify();
      return queue;
    };

    function pop() {
      var popping;
      while (popping = head && active < parallelism) {
        var node = head,
            f = node[0],
            a = slice.call(node, 1),
            i = node.i;
        if (head === tail) head = tail = null;
        else head = head._;
        ++active;
        a.push(function(e, r) {
          --active;
          if (error != null) return;
          if (e != null) {
            // clearing remaining cancels subsequent callbacks
            // clearing head stops queued tasks from being executed
            // setting error ignores subsequent calls to defer
            error = e;
            remaining = results = head = tail = null;
            notify();
          } else {
            results[i] = r;
            if (--remaining) popping || pop();
            else notify();
          }
        });
        f.apply(null, a);
      }
    }

    function notify() {
      if (error != null) await(error);
      else if (awaitAll) await(null, results);
      else await.apply(null, [null].concat(results));
    }

    return queue;
  }

  function noop() {}
})();
