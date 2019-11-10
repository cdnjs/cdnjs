// https://d3js.org/d3-random/ Version 1.0.0. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

  function uniform(min, max) {
    min = min == null ? 0 : +min;
    max = max == null ? 1 : +max;
    if (arguments.length === 1) max = min, min = 0;
    else max -= min;
    return function() {
      return Math.random() * max + min;
    };
  }

  function normal(mu, sigma) {
    var x, r;
    mu = mu == null ? 0 : +mu;
    sigma = sigma == null ? 1 : +sigma;
    return function() {
      var y;

      // If available, use the second previously-generated uniform random.
      if (x != null) y = x, x = null;

      // Otherwise, generate a new x and y.
      else do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);

      return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
    };
  }

  function logNormal() {
    var randomNormal = normal.apply(this, arguments);
    return function() {
      return Math.exp(randomNormal());
    };
  }

  function irwinHall(n) {
    return function() {
      for (var sum = 0, i = 0; i < n; ++i) sum += Math.random();
      return sum;
    };
  }

  function bates(n) {
    var randomIrwinHall = irwinHall(n);
    return function() {
      return randomIrwinHall() / n;
    };
  }

  function exponential(lambda) {
    return function() {
      return -Math.log(1 - Math.random()) / lambda;
    };
  }

  exports.randomUniform = uniform;
  exports.randomNormal = normal;
  exports.randomLogNormal = logNormal;
  exports.randomBates = bates;
  exports.randomIrwinHall = irwinHall;
  exports.randomExponential = exponential;

  Object.defineProperty(exports, '__esModule', { value: true });

}));