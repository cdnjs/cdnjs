(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3-ease', ['exports'], factory) :
  factory((global.d3_ease = {}));
}(this, function (exports) { 'use strict';

  function number(x, defaultValue) {
    return x == null || isNaN(x) ? defaultValue : +x;
  };

  var k = 1 / (2 * Math.PI);

  function elasticIn(a, p) {
    a = Math.max(1, number(a, 1)), p = number(p, .3) * k;
    var s = p * Math.asin(1 / a);
    return function(t) {
      return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
    };
  };

  function elasticOut(a, p) {
    a = Math.max(1, number(a, 1)), p = number(p, .3) * k;
    var s = p * Math.asin(1 / a);
    return function(t) {
      return a * Math.pow(2, -10 * t) * Math.sin((t - s) / p) + 1;
    };
  };

  function elasticInOut(a, p) {
    a = Math.max(1, number(a, 1)), p = number(p, .3) * 1.5 * k; // Note: treatment differs from Penner!
    var s = p * Math.asin(1 / a);
    return function(t) {
      return a * ((t = t * 2 - 1) < 0
          ? Math.pow(2, 10 * t) * Math.sin((s - t) / p)
          : Math.pow(2, -10 * t) * Math.sin((t - s) / p) + 2) / 2;
    };
  };

  function backIn(s) {
    return s = number(s, 1.70158), function(t) {
      return t * t * ((s + 1) * t - s);
    };
  };

  function backOut(s) {
    return s = number(s, 1.70158), function(t) {
      return --t * t * ((s + 1) * t + s) + 1;
    };
  };

  function backInOut(s) {
    return s = number(s, 1.70158) * 1.525, function(t) {
      return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
    };
  };

  var b1 = 4 / 11;
  var b2 = 6 / 11;
  var b3 = 8 / 11;
  var b4 = 3 / 4;
  var b5 = 9 / 11;
  var b6 = 10 / 11;
  var b7 = 15 / 16;
  var b8 = 21 / 22;
  var b9 = 63 / 64;
  var b0 = 1 / b1 / b1;
  function bounceIn(t) {
    return 1 - bounceOut(1 - t);
  };

  function bounceOut(t) {
    return t < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
  };

  function bounceInOut(t) {
    return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
  };

  function circleIn(t) {
    return 1 - Math.sqrt(1 - t * t);
  };

  function circleOut(t) {
    return Math.sqrt(1 - --t * t);
  };

  function circleInOut(t) {
    return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
  };

  function expIn(t) {
    return Math.pow(2, 10 * t - 10);
  };

  function expOut(t) {
    return 1 - Math.pow(2, -10 * t);
  };

  function expInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
  };

  var pi = Math.PI;
  var halfPi = pi / 2;
  function sinIn(t) {
    return 1 - Math.cos(t * halfPi);
  };

  function sinOut(t) {
    return Math.sin(t * halfPi);
  };

  function sinInOut(t) {
    return (1 - Math.cos(pi * t)) / 2;
  };

  function cubicIn(t) {
    return t * t * t;
  };

  function cubicOut(t) {
    return --t * t * t + 1;
  };

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  };

  function quadIn(t) {
    return t * t;
  };

  function quadOut(t) {
    return t * (2 - t);
  };

  function quadInOut(t) {
    return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
  };

  function linearIn(t) {
    return +t;
  };

  function polyIn(e) {
    return e = number(e, 3), function(t) {
      return Math.pow(t, e);
    };
  };

  function polyOut(e) {
    return e = number(e, 3), function(t) {
      return 1 - Math.pow(1 - t, e);
    };
  };

  function polyInOut(e) {
    return e = number(e, 3), function(t) {
      return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
    };
  };

  var standardEases = {
    "linear-in": linearIn,
    "linear-out": linearIn,
    "linear-in-out": linearIn,
    "quad-in": quadIn,
    "quad-out": quadOut,
    "quad-in-out": quadInOut,
    "cubic-in": cubicIn,
    "cubic-out": cubicOut,
    "cubic-in-out": cubicInOut,
    "poly-in": cubicIn,
    "poly-out": cubicOut,
    "poly-in-out": cubicInOut,
    "sin-in": sinIn,
    "sin-out": sinOut,
    "sin-in-out": sinInOut,
    "exp-in": expIn,
    "exp-out": expOut,
    "exp-in-out": expInOut,
    "circle-in": circleIn,
    "circle-out": circleOut,
    "circle-in-out": circleInOut,
    "bounce-in": bounceIn,
    "bounce-out": bounceOut,
    "bounce-in-out": bounceInOut,
    "back-in": backIn(),
    "back-out": backOut(),
    "back-in-out": backInOut(),
    "elastic-in": elasticIn(),
    "elastic-out": elasticOut(),
    "elastic-in-out": elasticInOut()
  };

  var customEases = {
    "poly-in": polyIn,
    "poly-out": polyOut,
    "poly-in-out": polyInOut,
    "back-in": backIn,
    "back-out": backOut,
    "back-in-out": backInOut,
    "elastic-in": elasticIn,
    "elastic-out": elasticOut,
    "elastic-in-out": elasticInOut
  };

  function ease(type, a, b) {
    var i = (type += "").indexOf("-");
    if (i < 0) type += "-in";
    return arguments.length > 1 && customEases.hasOwnProperty(type) ? customEases[type](a, b)
        : standardEases.hasOwnProperty(type) ? standardEases[type]
        : linearIn;
  };

  var version = "0.1.5";

  exports.version = version;
  exports.ease = ease;

}));