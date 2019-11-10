(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Cycle = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var Rx = (typeof window !== "undefined" ? window['Rx'] : typeof global !== "undefined" ? global['Rx'] : null);

function makeSinkProxies(drivers) {
  var sinkProxies = {};
  var keys = Object.keys(drivers);
  for (var i = 0; i < keys.length; i++) {
    sinkProxies[keys[i]] = new Rx.ReplaySubject(1);
  }
  return sinkProxies;
}

function callDrivers(drivers, sinkProxies) {
  var sources = {};
  var keys = Object.keys(drivers);
  for (var i = 0; i < keys.length; i++) {
    var _name = keys[i];
    sources[_name] = drivers[_name](sinkProxies[_name], _name);
  }
  return sources;
}

function attachDisposeToSinks(sinks, replicationSubscription) {
  return Object.defineProperty(sinks, "dispose", {
    value: function value() {
      replicationSubscription.dispose();
    }
  });
}

function makeDisposeSources(sources) {
  return function dispose() {
    var keys = Object.keys(sources);
    for (var i = 0; i < keys.length; i++) {
      var source = sources[keys[i]];
      if (typeof source.dispose === "function") {
        source.dispose();
      }
    }
  };
}

function attachDisposeToSources(sources) {
  return Object.defineProperty(sources, "dispose", {
    value: makeDisposeSources(sources)
  });
}

var logToConsoleError = typeof console !== "undefined" && console.error ? function (error) {
  console.error(error.stack || error);
} : Function.prototype;

function replicateMany(observables, subjects) {
  return Rx.Observable.create(function (observer) {
    var subscription = new Rx.CompositeDisposable();
    setTimeout(function () {
      var keys = Object.keys(observables);
      for (var i = 0; i < keys.length; i++) {
        var _name2 = keys[i];
        if (subjects.hasOwnProperty(_name2) && !subjects[_name2].isDisposed) {
          subscription.add(observables[_name2].doOnError(logToConsoleError).subscribe(subjects[_name2].asObserver()));
        }
      }
      observer.onNext(subscription);
    });

    return function dispose() {
      subscription.dispose();
      var keys = Object.keys(subjects);
      for (var i = 0; i < keys.length; i++) {
        subjects[keys[i]].dispose();
      }
    };
  });
}

function run(main, drivers) {
  if (typeof main !== "function") {
    throw new Error("First argument given to Cycle.run() must be the 'main' " + "function.");
  }
  if (typeof drivers !== "object" || drivers === null) {
    throw new Error("Second argument given to Cycle.run() must be an object " + "with driver functions as properties.");
  }
  if (Object.keys(drivers).length === 0) {
    throw new Error("Second argument given to Cycle.run() must be an object " + "with at least one driver function declared as a property.");
  }

  var sinkProxies = makeSinkProxies(drivers);
  var sources = callDrivers(drivers, sinkProxies);
  var sinks = main(sources);
  var subscription = replicateMany(sinks, sinkProxies).subscribe();
  var sinksWithDispose = attachDisposeToSinks(sinks, subscription);
  var sourcesWithDispose = attachDisposeToSources(sources);
  return { sources: sourcesWithDispose, sinks: sinksWithDispose };
}

var Cycle = {
  /**
   * Takes a `main` function and circularly connects it to the given collection
   * of driver functions.
   *
   * The `main` function expects a collection of "driver source" Observables
   * as input, and should return a collection of "driver sink" Observables.
   * A "collection of Observables" is a JavaScript object where
   * keys match the driver names registered by the `drivers` object, and values
   * are Observables or a collection of Observables.
   *
   * @param {Function} main a function that takes `sources` as input
   * and outputs a collection of `sinks` Observables.
   * @param {Object} drivers an object where keys are driver names and values
   * are driver functions.
   * @return {Object} an object with two properties: `sources` and `sinks`.
   * `sinks` is the collection of driver sinks, and `sources` is the collection
   * of driver sources, that can be used for debugging or testing.
   * @function run
   */
  run: run
};

module.exports = Cycle;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});