(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3-ease', ['exports'], factory) :
  factory((global.d3_ease = {}));
}(this, function (exports) { 'use strict';

  var slice = Array.prototype.slice;

  function bind1(type, a) {
    return function(t) {
      return type(t, a);
    };
  }

  function bind2(type, a, b) {
    return function(t) {
      return type(t, a, b);
    };
  }

  function bindN(type, args) {
    args = slice.call(args);
    args[0] = null;
    return function(t) {
      args[0] = t;
      return type.apply(null, args);
    };
  }

  function bind(type, a, b) {
    switch (arguments.length) {
      case 1: return type;
      case 2: return bind1(type, a);
      case 3: return bind2(type, a, b);
      default: return bindN(type, arguments);
    }
  };

  function linearIn(t) {
    return +t;
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

  function cubicIn(t) {
    return t * t * t;
  };

  function cubicOut(t) {
    return --t * t * t + 1;
  };

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  };

  function polyIn(t, e) {
    if (e == null) e = 3;
    return Math.pow(t, e);
  };

  function polyOut(t, e) {
    if (e == null) e = 3;
    return 1 - Math.pow(1 - t, e);
  };

  function polyInOut(t, e) {
    if (e == null) e = 3;
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
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

  function expIn(t) {
    return Math.pow(2, 10 * t - 10);
  };

  function expOut(t) {
    return 1 - Math.pow(2, -10 * t);
  };

  function expInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
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

  function backIn(t, s) {
    s = s == null ? 1.70158 : +s;
    return t * t * ((s + 1) * t - s);
  };

  function backOut(t, s) {
    s = s == null ? 1.70158 : +s;
    return --t * t * ((s + 1) * t + s) + 1;
  };

  function backInOut(t, s) {
    s = s == null ? 1.70158 : +s;
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  };

  var tau = 2 * Math.PI;

  function elasticIn(t, a, p) {
    a = a == null ? 1 : Math.max(1, a);
    p = (p == null ? 0.3 : p) / tau;
    return a * Math.pow(2, 10 * --t) * Math.sin((p * Math.asin(1 / a) - t) / p);
  };

  function elasticOut(t, a, p) {
    a = a == null ? 1 : Math.max(1, a);
    p = (p == null ? 0.3 : p) / tau;
    return 1 - a * Math.pow(2, -10 * t) * Math.sin((+t + p * Math.asin(1 / a)) / p);
  };

  function elasticInOut(t, a, p) {
    a = a == null ? 1 : Math.max(1, a);
    p = (p == null ? 0.3 : p) / tau;
    var s = p * Math.asin(1 / a);
    return ((t = t * 2 - 1) < 0
        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
  };

  var version = "0.5.1";

  exports.version = version;
  exports.easeBind = bind;
  exports.easeLinearIn = linearIn;
  exports.easeLinearOut = linearIn;
  exports.easeLinearInOut = linearIn;
  exports.easeQuadIn = quadIn;
  exports.easeQuadOut = quadOut;
  exports.easeQuadInOut = quadInOut;
  exports.easeCubicIn = cubicIn;
  exports.easeCubicOut = cubicOut;
  exports.easeCubicInOut = cubicInOut;
  exports.easePolyIn = polyIn;
  exports.easePolyOut = polyOut;
  exports.easePolyInOut = polyInOut;
  exports.easeSinIn = sinIn;
  exports.easeSinOut = sinOut;
  exports.easeSinInOut = sinInOut;
  exports.easeExpIn = expIn;
  exports.easeExpOut = expOut;
  exports.easeExpInOut = expInOut;
  exports.easeCircleIn = circleIn;
  exports.easeCircleOut = circleOut;
  exports.easeCircleInOut = circleInOut;
  exports.easeBounceIn = bounceIn;
  exports.easeBounceOut = bounceOut;
  exports.easeBounceInOut = bounceInOut;
  exports.easeBackIn = backIn;
  exports.easeBackOut = backOut;
  exports.easeBackInOut = backInOut;
  exports.easeElasticIn = elasticIn;
  exports.easeElasticOut = elasticOut;
  exports.easeElasticInOut = elasticInOut;

}));