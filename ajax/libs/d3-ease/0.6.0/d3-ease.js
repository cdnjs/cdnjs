(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_ease = {})));
}(this, function (exports) { 'use strict';

  var linearIn = {
    ease: function(t) {
      return +t;
    }
  };

  var quadIn = {
    ease: function(t) {
      return t * t;
    }
  };

  var quadOut = {
    ease: function(t) {
      return t * (2 - t);
    }
  };

  var quadInOut = {
    ease: function(t) {
      return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
    }
  };

  var cubicIn = {
    ease: function(t) {
      return t * t * t;
    }
  };

  var cubicOut = {
    ease: function(t) {
      return --t * t * t + 1;
    }
  };

  var cubicInOut = {
    ease: function(t) {
      return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
    }
  };

  var exponent = 3;

  var polyIn = (function polyIn(e) {
    return e = +e, {
      exponent: polyIn,
      ease: function(t) {
        return Math.pow(t, e);
      }
    };
  })(exponent);

  var polyOut = (function polyOut(e) {
    return e = +e, {
      exponent: polyOut,
      ease: function(t) {
        return 1 - Math.pow(1 - t, e);
      }
    };
  })(exponent);

  var polyInOut = (function polyInOut(e) {
    return e = +e, {
      exponent: polyInOut,
      ease: function(t) {
        return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
      }
    };
  })(exponent);

  var pi = Math.PI;
  var halfPi = pi / 2;
  var sinIn = {
    ease: function(t) {
      return 1 - Math.cos(t * halfPi);
    }
  };

  var sinOut = {
    ease: function(t) {
      return Math.sin(t * halfPi);
    }
  };

  var sinInOut = {
    ease: function(t) {
      return (1 - Math.cos(pi * t)) / 2;
    }
  };

  var expIn = {
    ease: function(t) {
      return Math.pow(2, 10 * t - 10);
    }
  };

  var expOut = {
    ease: function(t) {
      return 1 - Math.pow(2, -10 * t);
    }
  };

  var expInOut = {
    ease: function(t) {
      return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
    }
  };

  var circleIn = {
    ease: function(t) {
      return 1 - Math.sqrt(1 - t * t);
    }
  };

  var circleOut = {
    ease: function(t) {
      return Math.sqrt(1 - --t * t);
    }
  };

  var circleInOut = {
    ease: function(t) {
      return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
    }
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
  function bounce(t) {
    return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
  }

  var bounceIn = {
    ease: function(t) {
      return 1 - bounce(1 - t);
    }
  };

  var bounceOut = {
    ease: bounce
  };

  var bounceInOut = {
    ease: function(t) {
      return ((t *= 2) <= 1 ? 1 - bounce(1 - t) : bounce(t - 1) + 1) / 2;
    }
  };

  var overshoot = 1.70158;

  var backIn = (function backIn(s) {
    return s = +s, {
      overshoot: backIn,
      ease: function(t) {
        return t * t * ((s + 1) * t - s);
      }
    };
  })(overshoot);

  var backOut = (function backOut(s) {
    return s = +s, {
      overshoot: backOut,
      ease: function(t) {
        return --t * t * ((s + 1) * t + s) + 1;
      }
    };
  })(overshoot);

  var backInOut = (function backInOut(s) {
    return s = +s, {
      overshoot: backInOut,
      ease: function(t) {
        return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
      }
    };
  })(overshoot);

  var tau = 2 * Math.PI;
  var amplitude = 1;
  var period = 0.3;
  var elasticIn = (function elasticIn(a, p) {
    var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
    return {
      amplitude: function(a) { return elasticIn(a, p * tau); },
      period: function(p) { return elasticIn(a, p); },
      ease: function(t) {
        return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
      }
    };
  })(amplitude, period);

  var elasticOut = (function elasticOut(a, p) {
    var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
    return {
      amplitude: function(a) { return elasticOut(a, p * tau); },
      period: function(p) { return elasticOut(a, p); },
      ease: function(t) {
        return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
      }
    };
  })(amplitude, period);

  var elasticInOut = (function elasticInOut(a, p) {
    var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
    return {
      amplitude: function(a) { return elasticInOut(a, p * tau); },
      period: function(p) { return elasticInOut(a, p); },
      ease: function(t) {
        return ((t = t * 2 - 1) < 0
            ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
            : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
      }
    };
  })(amplitude, period);

  var version = "0.6.0";

  exports.version = version;
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