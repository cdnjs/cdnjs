!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.co=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){

/**
 * Expose `co`.
 */

exports = module.exports = co;

/**
 * Wrap the given generator `fn`.
 *
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

function co(fn) {
  var gen = fn();
  var done;

  function next(err, res) {
    var ret;

    // error
    if (err) {
      try {
        ret = gen.throw(err);
      } catch (e) {
        if (!done) throw e;
        return done(e);
      }
    }

    // ok
    if (!err) {
      try {
        ret = gen.send(res);
      } catch (e) {
        if (!done) throw e;
        return done(e);
      }
    }

    // done
    if (ret.done) {
      if (done) done(null, ret.value);
      return;
    }

    // non-function
    if ('function' != typeof ret.value) {
      return next(new Error('yielded a non-function'));
    }

    // thunk
    try {
      ret.value(next);
    } catch (e) {
      process.nextTick(function(){
        next(e);
      });
    }
  }

  process.nextTick(next);

  return function(fn){
    done = fn;
  }
}

/**
 * Wrap regular callback style `fn` as a thunk.
 *
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

exports.wrap = function(fn, ctx){
  return function(){
    var args = [].slice.call(arguments);
    return function(done){
      args.push(done);
      fn.apply(ctx || this, args);
    }
  }
};

/**
 * Join the given `fns`.
 *
 * @param {Array|Function} ...
 * @return {Function}
 * @api public
 */

exports.join = function(fns) {
  if (!Array.isArray(fns)) fns = [].slice.call(arguments);

  return function(done){
    var pending = fns.length;
    var results = new Array(pending);
    var finished;

    if (!pending) return done();

    for (var i = 0; i < fns.length; i++) {
      run(fns[i], i);
    }

    function run(fn, i) {
      if (finished) return;
      try {
        fn(function(err, res){
          if (finished) return;

          if (err) {
            finished = true;
            return done(err);
          }

          results[i] = res;
          --pending || done(null, results);
        });
      } catch (err) {
        finished = true;
        done(err);
      }
    }
  }
};

}).call(this,require('_process'))
},{"_process":2}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1])(1)
});