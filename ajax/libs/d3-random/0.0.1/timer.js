if (typeof requestAnimationFrame === "undefined") {
  requestAnimationFrame = typeof window !== "undefined"
      && (window.msRequestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.oRequestAnimationFrame)
      || function(callback) { return setTimeout(callback, 17); };
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.timer = {}));
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
    if (mu == null) mu = 0;
    if (sigma == null) sigma = 1;
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

  var logNormal = function(mu, sigma) {
    var randomNormal = normal(mu, sigma);
    return function() {
      return Math.exp(randomNormal());
    };
  }

  var uniform = function(min, max) {
    var n = arguments.length;
    if (!n) min = 0, max = 1;
    else if (n === 1) min = 0, max = +max;
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