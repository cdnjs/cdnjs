if (typeof Map === "undefined") {
  Map = function() {};
  Map.prototype = {
    set: function(k, v) { this["$" + k] = v; return this; },
    get: function(k) { return this["$" + k]; },
    has: function(k) { return "$" + k in this; }
  };
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.ease = {}));
}(this, function (exports) { 'use strict';

  function linearIn(t) {
    return +t;
  }

  var k = 1 / (2 * Math.PI);

  var number = function(x, defaultValue) {
    return x == null || isNaN(x) ? defaultValue : +x;
  }

  function elasticInOut(a, p) {
    a = Math.max(1, number(a, 1)), p = number(p, .3) * 1.5 * k; // Note: treatment differs from Penner!
    var s = p * Math.asin(1 / a);
    return function(t) {
      return a * ((t = t * 2 - 1) < 0
          ? Math.pow(2, 10 * t) * Math.sin((s - t) / p)
          : Math.pow(2, -10 * t) * Math.sin((t - s) / p) + 2) / 2;
    };
  }

  function elasticOut(a, p) {
    a = Math.max(1, number(a, 1)), p = number(p, .3) * k;
    var s = p * Math.asin(1 / a);
    return function(t) {
      return a * Math.pow(2, -10 * t) * Math.sin((t - s) / p) + 1;
    };
  }

  function elasticIn(a, p) {
    a = Math.max(1, number(a, 1)), p = number(p, .3) * k;
    var s = p * Math.asin(1 / a);
    return function(t) {
      return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
    };
  }

  function backInOut(s) {
    return s = number(s, 1.70158) * 1.525, function(t) {
      return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
    };
  }

  function backOut(s) {
    return s = number(s, 1.70158), function(t) {
      return --t * t * ((s + 1) * t + s) + 1;
    };
  }

  function backIn(s) {
    return s = number(s, 1.70158), function(t) {
      return t * t * ((s + 1) * t - s);
    };
  }
  var b1 = 4 / 11,
      b2 = 6 / 11,
      b3 = 8 / 11,
      b4 = 3 / 4,
      b5 = 9 / 11,
      b6 = 10 / 11,
      b7 = 15 / 16,
      b8 = 21 / 22,
      b9 = 63 / 64,
      b0 = 1 / b1 / b1;

  function bounceOut(t) {
    return t < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
  }

  function bounceInOut(t) {
    return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
  }

  function bounceIn(t) {
    return 1 - bounceOut(1 - t);
  }

  function circleInOut(t) {
    return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
  }

  function circleOut(t) {
    return Math.sqrt(1 - --t * t);
  }
  function circleIn(t) {
    return 1 - Math.sqrt(1 - t * t);
  }

  function expInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
  }

  function expOut(t) {
    return 1 - Math.pow(2, -10 * t);
  }
  function expIn(t) {
    return Math.pow(2, 10 * t - 10);
  }
  var pi = Math.PI,
      halfPi = pi / 2;

  function sinInOut(t) {
    return (1 - Math.cos(pi * t)) / 2;
  }

  function sinOut(t) {
    return Math.sin(t * halfPi);
  }

  function sinIn(t) {
    return 1 - Math.cos(t * halfPi);
  }

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  function cubicOut(t) {
    return --t * t * t + 1;
  }
  function cubicIn(t) {
    return t * t * t;
  }

  function quadInOut(t) {
    return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
  }

  function quadOut(t) {
    return t * (2 - t);
  }
  function quadIn(t) {
    return t * t;
  }

  var standardEases = (new Map)
      .set("linear-in", linearIn)
      .set("linear-out", linearIn)
      .set("linear-in-out", linearIn)
      .set("quad-in", quadIn)
      .set("quad-out", quadOut)
      .set("quad-in-out", quadInOut)
      .set("cubic-in", cubicIn)
      .set("cubic-out", cubicOut)
      .set("cubic-in-out", cubicInOut)
      .set("poly-in", cubicIn)
      .set("poly-out", cubicOut)
      .set("poly-in-out", cubicInOut)
      .set("sin-in", sinIn)
      .set("sin-out", sinOut)
      .set("sin-in-out", sinInOut)
      .set("exp-in", expIn)
      .set("exp-out", expOut)
      .set("exp-in-out", expInOut)
      .set("circle-in", circleIn)
      .set("circle-out", circleOut)
      .set("circle-in-out", circleInOut)
      .set("bounce-in", bounceIn)
      .set("bounce-out", bounceOut)
      .set("bounce-in-out", bounceInOut)
      .set("back-in", backIn())
      .set("back-out", backOut())
      .set("back-in-out", backInOut())
      .set("elastic-in", elasticIn())
      .set("elastic-out", elasticOut())
      .set("elastic-in-out", elasticInOut());

  function polyInOut(e) {
    return e = number(e, 3), function(t) {
      return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
    };
  }

  function polyOut(e) {
    return e = number(e, 3), function(t) {
      return 1 - Math.pow(1 - t, e);
    };
  }

  function polyIn(e) {
    return e = number(e, 3), function(t) {
      return Math.pow(t, e);
    };
  }

  var customEases = (new Map)
      .set("poly-in", polyIn)
      .set("poly-out", polyOut)
      .set("poly-in-out", polyInOut)
      .set("back-in", backIn)
      .set("back-out", backOut)
      .set("back-in-out", backInOut)
      .set("elastic-in", elasticIn)
      .set("elastic-out", elasticOut)
      .set("elastic-in-out", elasticInOut);

  var ease = function(type, a, b) {
    var i = (type += "").indexOf("-");
    if (i < 0) type += "-in";
    return arguments.length > 1 && customEases.has(type)
        ? customEases.get(type)(a, b)
        : standardEases.get(type) || linearIn;
  }

  exports.ease = ease;

}));