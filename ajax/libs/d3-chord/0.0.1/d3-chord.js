(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_chord = global.d3_chord || {})));
}(this, function (exports) { 'use strict';

  var version = "0.0.1";

  function constant(x) {
    return function() {
      return x;
    };
  }

  var pi = Math.PI;
  var halfPi = pi / 2;
  function defaultSource(d) {
    return d.source;
  }

  function defaultTarget(d) {
    return d.target;
  }

  function defaultRadius(d) {
    return d.radius;
  }

  function defaultStartAngle(d) {
    return d.startAngle;
  }

  function defaultEndAngle(d) {
    return d.endAngle;
  }

  function equals(a, b) {
    return a.a0 === b.a0 && a.a1 === b.a1;
  }

  function arc(r, p, a) {
    return "A" + r + "," + r + " 0 " + +(a > pi) + ",1 " + p;
  }

  function curve(r0, p0, r1, p1) {
    return "Q 0,0 " + p1;
  }

  function ribbon() {
    var source = defaultSource,
        target = defaultTarget,
        radius = defaultRadius,
        startAngle = defaultStartAngle,
        endAngle = defaultEndAngle;

    function ribbon(d, i) {
      var s = subgroup(this, source, d, i),
          t = subgroup(this, target, d, i);
      return "M" + s.p0
        + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t)
        ? curve(s.r, s.p1, s.r, s.p0)
        : curve(s.r, s.p1, t.r, t.p0)
        + arc(t.r, t.p1, t.a1 - t.a0)
        + curve(t.r, t.p1, s.r, s.p0))
        + "Z";
    }

    function subgroup(that, object, d, i) {
      var subgroup = object.call(that, d, i),
          r = +radius.call(that, subgroup, i),
          a0 = startAngle.call(that, subgroup, i) - halfPi,
          a1 = endAngle.call(that, subgroup, i) - halfPi;
      return {
        r: r,
        a0: a0,
        a1: a1,
        p0: [r * Math.cos(a0), r * Math.sin(a0)],
        p1: [r * Math.cos(a1), r * Math.sin(a1)]
      };
    }

    ribbon.radius = function(_) {
      return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), ribbon) : radius;
    };

    ribbon.startAngle = function(_) {
      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), ribbon) : startAngle;
    };

    ribbon.endAngle = function(_) {
      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), ribbon) : endAngle;
    };

    ribbon.source = function(_) {
      return arguments.length ? (source = _, ribbon) : source;
    };

    ribbon.target = function(_) {
      return arguments.length ? (target = _, ribbon) : target;
    };

    return ribbon;
  }

  exports.version = version;
  exports.ribbon = ribbon;

}));