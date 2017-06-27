(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.random = {}));
}(this, function (exports) { 'use strict';

  var irwinHall = function(n) {
    return function() {
      for (var sum = 0, i = 0; i < n; ++i) sum += Math.random();
      return sum;
    };
  }

  var bates = function(n) {
    var randomIrwinHall = irwinHall(n);
    return function() {
      return randomIrwinHall() / n;
    };
  }

  var normal = function(mu, sigma) {
    var n = arguments.length;
    if (!n) mu = 0, sigma = 1;
    else if (n === 1) mu = +mu, sigma = 1;
    else mu = +mu, sigma = +sigma;
    return function() {
      var x, y, r;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);
      return mu + sigma * x * Math.sqrt(-2 * Math.log(r) / r);
    };
  }

  var logNormal = function() {
    var randomNormal = normal.apply(this, arguments);
    return function() {
      return Math.exp(randomNormal());
    };
  }

  var uniform = function(min, max) {
    var n = arguments.length;
    if (!n) min = 0, max = 1;
    else if (n === 1) max = +min, min = 0;
    else min = +min, max = +max - min;
    return function() {
      return Math.random() * max + min;
    };
  }

  exports.uniform = uniform;
  exports.normal = normal;
  exports.logNormal = logNormal;
  exports.bates = bates;
  exports.irwinHall = irwinHall;

}));