'use strict';

var R = require('ramda');

// (Promise, Callback, Options?) => Promise | void
//
// Options: { no_spread: bool }
//   no_spread: prevents wrapPromise from applying array-like return arguments
//              to the callback.
var wrapPromise = function(promise, cb, options) {
  if (!options) {
    options = {};
  }

  if (cb) {
    return promise.then(function(args) {
      if (R.isArrayLike(args) && !options.no_spread) {
        // call outside of promise stack
        setImmediate(function() {
          R.apply(R.partial(cb, [null]), args);
        });
      } else {
        setImmediate(function() {
          cb(null, args);
        });
      }
    }).catch(function(err) {
      setImmediate(function() {
        cb(err);
      });
    });
  }
  return promise;
};

module.exports = wrapPromise;
