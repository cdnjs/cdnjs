(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-path')) :
  typeof define === 'function' && define.amd ? define('d3-shape', ['exports', 'd3-path'], factory) :
  factory((global.d3_shape = {}),global.d3_path);
}(this, function (exports,d3Path) { 'use strict';

  function Cardinal(context, tension) {
    this._context = context;
    this._k = (1 - (tension == null ? .7 : tension)) / 2; // TODO
  };

  Cardinal.prototype.lineStart = function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = null;
  };

  Cardinal.prototype.lineEnd = function() {
    if (this._x0 != null) {
      this._context.quadraticCurveTo(
        this._x1 + this._k * (this._x2 - this._x0) * 2 / 3,
        this._y1 + this._k * (this._y2 - this._y0) * 2 / 3,
        this._x2,
        this._y2
      );
    } else if (this._x1 != null) {
      this._context.lineTo(this._x2, this._y2);
    }
  };

  Cardinal.prototype.point = function(x, y) {
    x = +x, y = +y;
    if (this._x0 != null) {
      this._context.bezierCurveTo(
        this._x1 + this._k * (this._x2 - this._x0),
        this._y1 + this._k * (this._y2 - this._y0),
        this._x2 - this._k * (x - this._x1),
        this._y2 - this._k * (y - this._y1),
        this._x2,
        this._y2
      );
    } else if (this._x1 != null) {
      this._context.quadraticCurveTo(
        this._x2 - this._k * (x - this._x1) * 2 / 3,
        this._y2 - this._k * (y - this._y1) * 2 / 3,
        this._x2,
        this._y2
      );
    } else if (this._x2 == null) {
      this._context.moveTo(x, y);
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  };

  function CardinalOpen(context, tension) {
    this._context = context;
    this._k = (1 - (tension == null ? .7 : tension)) / 2; // TODO
  };

  CardinalOpen.prototype.lineStart = function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = null;
  };

  CardinalOpen.prototype.lineEnd = function() {};

  CardinalOpen.prototype.point = function(x, y) {
    x = +x, y = +y;
    if (this._x0 != null) {
      this._context.bezierCurveTo(
        this._x1 + this._k * (this._x2 - this._x0),
        this._y1 + this._k * (this._y2 - this._y0),
        this._x2 - this._k * (x - this._x1),
        this._y2 - this._k * (y - this._y1),
        this._x2,
        this._y2
      );
    } else if (this._x1 == null && this._x2 != null) {
      this._context.moveTo(x, y);
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  };

  // function cardinalTangents(points, tension) {
  //   var tangents = [],
  //       a = (1 - tension) / 2,
  //       p0,
  //       p1 = points[0],
  //       p2 = points[1],
  //       i = 1,
  //       n = points.length;

  //   while (++i < n) {
  //     p0 = p1;
  //     p1 = p2;
  //     p2 = points[i];
  //     tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
  //   }

  //   return tangents;
  // }

  // export function interpolateCardinalOpen(points, tension) {
  //   return points.length < 4
  //       ? interpolateLinear(points)
  //       : points[1] + interpolateHermit(points.slice(1, -1), cardinalTangents(points, tension));
  // };

  // export function interpolateCardinalClosed(points, tension) {
  //   return points.length < 3
  //       ? interpolateLinear(points)
  //       : points[0] + interpolateHermit((points.push(points[0]), points), cardinalTangents([points[points.length - 2]].concat(points, [points[1]]), tension));
  // };

  // export function interpolateCardinal(points, tension) {
  //   return points.length < 3
  //       ? interpolateLinear(points)
  //       : points[0] + interpolateHermit(points, cardinalTangents(points, tension));
  // };

  function basisPoint(basis, x, y) {
    basis._context.bezierCurveTo(
      (2 * basis._x0 + basis._x1) / 3,
      (2 * basis._y0 + basis._y1) / 3,
      (basis._x0 + 2 * basis._x1) / 3,
      (basis._y0 + 2 * basis._y1) / 3,
      (basis._x0 + 4 * basis._x1 + x) / 6,
      (basis._y0 + 4 * basis._y1 + y) / 6
    );
  }

  function Basis(context) {
    this._context = context;
  };

  Basis.prototype.lineStart = function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = null;
  };

  Basis.prototype.lineEnd = function() {
    if (this._x0 != null) {
      this.point(this._x1, this._y1);
      this._context.lineTo(this._x1, this._y1);
    }
  };

  Basis.prototype.point = function(x, y) {
    x = +x, y = +y;
    if (this._x0 != null) basisPoint(this, x, y);
    else if (this._x1 != null) this._context.lineTo((5 * this._x1 + x) / 6, (5 * this._y1 + y) / 6);
    else this._context.moveTo(x, y);
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  };

  function BasisOpen(context) {
    this._context = context;
  };

  BasisOpen.prototype.lineStart = function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = null;
    this._moved = false;
  };

  BasisOpen.prototype.lineEnd = function() {};

  BasisOpen.prototype.point = function(x, y) {
    x = +x, y = +y;
    if (this._moved) basisPoint(this, x, y);
    else if (this._x0 != null) this._moved = true, this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  };

  function BasisClosed(context) {
    this._context = context;
  };

  BasisClosed.prototype.lineStart = function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = null;
  };

  BasisClosed.prototype.lineEnd = function() {
    if (this._x4 != null) {
      this.point(this._x2, this._y2);
      this.point(this._x3, this._y3);
      this.point(this._x4, this._y4);
    } else if (this._x3 != null) {
      this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
      this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
      this._context.closePath();
    } else if (this._x2 != null) {
      this._context.moveTo(this._x2, this._y2);
      this._context.closePath();
    }
  };

  BasisClosed.prototype.point = function(x, y) {
    x = +x, y = +y;
    if (this._x4 != null) basisPoint(this, x, y);
    else if (this._x3 != null) this._x4 = x, this._y4 = y, this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
    else if (this._x2 != null) this._x3 = x, this._y3 = y;
    else this._x2 = x, this._y2 = y;
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  };

  function Step(context) {
    this._context = context;
  };

  Step.prototype.lineStart = function() {
    this._x = this._y = null;
  };

  Step.prototype.lineEnd = function() {
    if (this._x != null) {
      this._context.lineTo(this._x, this._y);
      this._x = this._y = null;
    }
  };

  Step.prototype.point = function(x, y) {
    x = +x, y = +y;
    if (this._x == null) {
      this._context.moveTo(x, y);
    } else {
      var x1 = (this._x + x) / 2;
      this._context.lineTo(x1, this._y);
      this._context.lineTo(x1, y);
    }
    this._x = x, this._y = y;
  };

  function StepAfter(context) {
    this._context = context;
  };

  StepAfter.prototype.lineStart = function() {
    this._y = null;
  };

  StepAfter.prototype.lineEnd = function() {};

  StepAfter.prototype.point = function(x, y) {
    x = +x, y = +y;
    if (this._y == null) {
      this._context.moveTo(x, y);
    } else {
      this._context.lineTo(x, this._y);
      this._context.lineTo(x, y);
    }
    this._y = y;
  };

  function StepBefore(context) {
    this._context = context;
  };

  StepBefore.prototype.lineStart = function() {
    this._x = null;
  };

  StepBefore.prototype.lineEnd = function() {};

  StepBefore.prototype.point = function(x, y) {
    x = +x, y = +y;
    if (this._x == null) {
      this._context.moveTo(x, y);
    } else {
      this._context.lineTo(this._x, y);
      this._context.lineTo(x, y);
    }
    this._x = x;
  };

  function Linear(context) {
    this._context = context;
  };

  Linear.prototype.lineStart = function() {
    this._move = true;
  };

  Linear.prototype.lineEnd = function() {};

  Linear.prototype.point = function(x, y) {
    if (this._move) this._move = false, this._context.moveTo(x, y);
    else this._context.lineTo(x, y);
  };

  function LinearClosed(context) {
    Linear.call(this, context); // https://github.com/rollup/rollup/issues/34
  };

  LinearClosed.prototype = Object.create(Linear.prototype);

  LinearClosed.prototype.lineEnd = function() {
    this._context.closePath();
  };

  function pointX(p) {
    return p[0];
  }

  function pointY(p) {
    return p[1];
  }

  function functor(x) {
    return function() {
      return x;
    };
  }

  function _true() {
    return true;
  }

  var interpolates = (new Map)
      .set("linear", Linear)
      .set("linear-closed", LinearClosed)
      .set("step", Step)
      .set("step-before", StepBefore)
      .set("step-after", StepAfter)
      .set("basis", Basis)
      .set("basis-open", BasisOpen)
      .set("basis-closed", BasisClosed)
      // .set("bundle", Bundle)
      .set("cardinal", Cardinal)
      .set("cardinal-open", CardinalOpen)
      // .set("cardinal-closed", CardinalClosed)
      // .set("monotone", Monotone);

  function line() {
    var x = pointX, _x = x,
        y = pointY, _y = y,
        defined = true, _defined = _true,
        interpolate = Linear,
        context = null,
        stream = null;

    function line(data) {
      var defined = false,
          result;

      if (!stream) stream = new interpolate(result = d3Path.path()); // TODO tension?

      for (var i = 0, n = data.length, d; i < n; ++i) {
        if (!_defined.call(this, d = data[i], i) === defined) {
          if (defined = !defined) stream.lineStart();
          else stream.lineEnd();
        }
        if (defined) stream.point(+_x.call(this, d, i), +_y.call(this, d, i));
      }

      if (defined) stream.lineEnd();
      if (result) return stream = null, result += "";
    }

    line.x = function(_) {
      if (!arguments.length) return x;
      x = _, _x = typeof _ === "function" ? x : functor(x);
      return line;
    };

    line.y = function(_) {
      if (!arguments.length) return y;
      y = _, _y = typeof _ === "function" ? y : functor(y);
      return line;
    };

    line.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _, _defined = typeof _ === "function" ? defined : functor(defined);
      return line;
    };

    line.interpolate = function(_, tension) {
      if (!arguments.length) return interpolate;
      if (!(interpolate = interpolates.get(_ + ""))) interpolate = Linear;
      if (context != null) stream = new interpolate(context); // TODO tension?
      return line;
    };

    line.context = function(_) {
      if (!arguments.length) return context;
      if (_ == null) context = stream = null;
      else stream = new interpolate(context = _); // TODO tension?
      return line;
    };

    return line;
  };

  var version = "0.0.1";

  exports.version = version;
  exports.line = line;

}));