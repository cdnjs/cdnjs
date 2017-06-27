(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-path')) :
  typeof define === 'function' && define.amd ? define('d3-shape', ['exports', 'd3-path'], factory) :
  factory((global.d3_shape = {}),global.d3_path);
}(this, function (exports,d3Path) { 'use strict';

  function point(basis, x, y) {
    basis._context.bezierCurveTo(
      (2 * basis._x0 + basis._x1) / 3,
      (2 * basis._y0 + basis._y1) / 3,
      (basis._x0 + 2 * basis._x1) / 3,
      (basis._y0 + 2 * basis._y1) / 3,
      (basis._x0 + 4 * basis._x1 + x) / 6,
      (basis._y0 + 4 * basis._y1 + y) / 6
    );
  };

  function basis(context) {
    return new Basis(context);
  }

  function Basis(context) {
    this._context = context;
  }

  Basis.prototype = {
    lineStart: function() {
      this._x0 = this._x1 =
      this._y0 = this._y1 = NaN;
      this._state = 0;
    },
    lineEnd: function() {
      switch (this._state) {
        case 1: this._context.closePath(); break;
        case 3: point(this, this._x1, this._y1); // proceed
        case 2: this._context.lineTo(this._x1, this._y1); break;
      }
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._state) {
        case 0: this._state = 1; this._context.moveTo(x, y); break;
        case 1: this._state = 2; this._context.lineTo((5 * this._x1 + x) / 6, (5 * this._y1 + y) / 6); break;
        case 2: this._state = 3; // proceed
        default: point(this, x, y); break;
      }
      this._x0 = this._x1, this._x1 = x;
      this._y0 = this._y1, this._y1 = y;
    }
  };

  function basisClosed(context) {
    return new BasisClosed(context);
  }

  function BasisClosed(context) {
    this._context = context;
  }

  BasisClosed.prototype = {
    lineStart: function() {
      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
      this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
      this._state = 0;
    },
    lineEnd: function() {
      switch (this._state) {
        case 1: {
          this._context.moveTo(this._x2, this._y2);
          this._context.closePath();
          break;
        }
        case 2: {
          this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
          this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
          this._context.closePath();
          break;
        }
        case 3: {
          this.point(this._x2, this._y2);
          this.point(this._x3, this._y3);
          this.point(this._x4, this._y4);
          break;
        }
      }
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._state) {
        case 0: this._state = 1; this._x2 = x, this._y2 = y; break;
        case 1: this._state = 2; this._x3 = x, this._y3 = y; break;
        case 2: this._state = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
        default: point(this, x, y); break;
      }
      this._x0 = this._x1, this._x1 = x;
      this._y0 = this._y1, this._y1 = y;
    }
  };

  function basisOpen(context) {
    return new BasisOpen(context);
  }

  function BasisOpen(context) {
    this._context = context;
  }

  BasisOpen.prototype = {
    lineStart: function() {
      this._x0 = this._x1 =
      this._y0 = this._y1 = NaN;
      this._state = 0;
    },
    lineEnd: function() {
      if (this._state === 3) this._context.closePath();
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._state) {
        case 0: this._state = 1; break;
        case 1: this._state = 2; break;
        case 2: this._state = 3; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break; // TODO
        case 3: this._state = 4; // proceed
        default: point(this, x, y); break;
      }
      this._x0 = this._x1, this._x1 = x;
      this._y0 = this._y1, this._y1 = y;
    }
  };

  function cardinal(tension) {
    return function(context) {
      return new Cardinal(context, tension);
    };
  }

  function Cardinal(context, tension) {
    this._context = context;
    this._k = (tension == null ? 1 : 1 - tension) / 6;
  }

  Cardinal.prototype = {
    lineStart: function() {
      this._x0 = this._x1 = this._x2 =
      this._y0 = this._y1 = this._y2 = NaN;
      this._state = 0;
    },
    lineEnd: function() {
      switch (this._state) {
        case 1: this._context.closePath(); break;
        case 2: this._context.lineTo(this._x2, this._y2); break;
        case 3: {
          this._context.bezierCurveTo(
            this._x1 + this._k * (this._x2 - this._x0),
            this._y1 + this._k * (this._y2 - this._y0),
            this._x2,
            this._y2,
            this._x2,
            this._y2
          );
          break;
        }
      }
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._state) {
        case 0: this._state = 1; this._context.moveTo(x, y); break;
        case 1: this._state = 2; break;
        case 2: {
          this._state = 3;
          this._context.bezierCurveTo(
            this._x1,
            this._y1,
            this._x2 + this._k * (this._x1 - x),
            this._y2 + this._k * (this._y1 - y),
            this._x2,
            this._y2
          );
          break;
        }
        default: {
          this._context.bezierCurveTo(
            this._x1 + this._k * (this._x2 - this._x0),
            this._y1 + this._k * (this._y2 - this._y0),
            this._x2 + this._k * (this._x1 - x),
            this._y2 + this._k * (this._y1 - y),
            this._x2,
            this._y2
          );
          break;
        }
      }
      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
  };

  function cardinalClosed(tension) {
    return function(context) {
      return new CardinalClosed(context, tension);
    };
  }

  function CardinalClosed(context, tension) {
    this._context = context;
    this._k = (tension == null ? 1 : 1 - tension) / 6;
  }

  CardinalClosed.prototype = {
    lineStart: function() {
      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
      this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
      this._state = 0;
    },
    lineEnd: function() {
      switch (this._state) {
        case 1: {
          this._context.moveTo(this._x3, this._y3);
          this._context.closePath();
          break;
        }
        case 2: {
          this._context.lineTo(this._x3, this._y3);
          this._context.closePath();
          break;
        }
        case 3: {
          this.point(this._x3, this._y3);
          this.point(this._x4, this._y4);
          this.point(this._x5, this._y5);
          break;
        }
      }
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._state) {
        case 0: this._state = 1; this._x3 = x, this._y3 = y; break;
        case 1: this._state = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
        case 2: this._state = 3; this._x5 = x, this._y5 = y; break;
        default: {
          this._context.bezierCurveTo(
            this._x1 + this._k * (this._x2 - this._x0),
            this._y1 + this._k * (this._y2 - this._y0),
            this._x2 + this._k * (this._x1 - x),
            this._y2 + this._k * (this._y1 - y),
            this._x2,
            this._y2
          );
          break;
        }
      }
      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
  };

  function cardinalOpen(tension) {
    return function(context) {
      return new CardinalOpen(context, tension);
    };
  }

  function CardinalOpen(context, tension) {
    this._context = context;
    this._k = (tension == null ? 1 : 1 - tension) / 6;
  }

  CardinalOpen.prototype = {
    lineStart: function() {
      this._x0 = this._x1 = this._x2 =
      this._y0 = this._y1 = this._y2 = NaN;
      this._state = 0;
    },
    lineEnd: function() {
      switch (this._state) {
        case 2:
        case 3: this._context.closePath(); break;
      }
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._state) {
        case 0: this._state = 1; break;
        case 1: this._state = 2; this._context.moveTo(x, y); break;
        case 2: this._state = 3; break;
        case 3: this._state = 4; // proceed
        default: {
          this._context.bezierCurveTo(
            this._x1 + this._k * (this._x2 - this._x0),
            this._y1 + this._k * (this._y2 - this._y0),
            this._x2 + this._k * (this._x1 - x),
            this._y2 + this._k * (this._y1 - y),
            this._x2,
            this._y2
          );
          break;
        }
      }
      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
  };

  // TODO Check if n or m is zero, and avoid NaN.
  // n is zero if (x0,y0) and (x1,y1) are coincident.
  // m is zero if (x2,y2) and (x3,y3) are coincident.

  function catmullRom(alpha) {
    return function(context) {
      return new CatmullRom(context, alpha);
    };
  }

  function CatmullRom(context, alpha) {
    this._context = context;
    this._alpha2 = (this._alpha = alpha == null ? 0 : +alpha) / 2;
  }

  CatmullRom.prototype = {
    lineStart: function() {
      this._x0 = this._x1 = this._x2 =
      this._y0 = this._y1 = this._y2 =
      this._l01_a = this._l12_a = this._l23_a =
      this._l01_2a = this._l12_2a = this._l23_2a = NaN;
      this._state = 0;
    },
    lineEnd: function() {
      switch (this._state) {
        case 1: this._context.closePath(); break;
        case 2: this._context.lineTo(this._x2, this._y2); break;
        case 3: {
          var a = 2 * this._l01_2a + 3 * this._l01_a * this._l12_a + this._l12_2a,
              n = 3 * this._l01_a * (this._l01_a + this._l12_a);
          this._context.bezierCurveTo(
            (this._x1 * a - this._x0 * this._l12_2a + this._x2 * this._l01_2a) / n,
            (this._y1 * a - this._y0 * this._l12_2a + this._y2 * this._l01_2a) / n,
            this._x2,
            this._y2,
            this._x2,
            this._y2
          );
          break;
        }
      }
    },
    point: function(x, y) {
      x = +x, y = +y;

      if (this._state) {
        var x23 = this._x2 - x,
            y23 = this._y2 - y,
            l23_2 = x23 * x23 + y23 * y23;
        this._l23_a = Math.pow(l23_2, this._alpha2);
        this._l23_2a = Math.pow(l23_2, this._alpha);
      }

      switch (this._state) {
        case 0: this._state = 1; this._context.moveTo(x, y); break;
        case 1: this._state = 2; break;
        case 2: {
          var b = 2 * this._l23_2a + 3 * this._l23_a * this._l12_a + this._l12_2a,
              m = 3 * this._l23_a * (this._l23_a + this._l12_a);
          this._state = 3;
          this._context.bezierCurveTo(
            this._x1,
            this._y1,
            (this._x2 * b + this._x1 * this._l23_2a - x * this._l12_2a) / m,
            (this._y2 * b + this._y1 * this._l23_2a - y * this._l12_2a) / m,
            this._x2,
            this._y2
          );
          break;
        }
        default: {
          var a = 2 * this._l01_2a + 3 * this._l01_a * this._l12_a + this._l12_2a,
              b = 2 * this._l23_2a + 3 * this._l23_a * this._l12_a + this._l12_2a,
              n = 3 * this._l01_a * (this._l01_a + this._l12_a),
              m = 3 * this._l23_a * (this._l23_a + this._l12_a);
          this._context.bezierCurveTo(
            (this._x1 * a - this._x0 * this._l12_2a + this._x2 * this._l01_2a) / n,
            (this._y1 * a - this._y0 * this._l12_2a + this._y2 * this._l01_2a) / n,
            (this._x2 * b + this._x1 * this._l23_2a - x * this._l12_2a) / m,
            (this._y2 * b + this._y1 * this._l23_2a - y * this._l12_2a) / m,
            this._x2,
            this._y2
          );
          break;
        }
      }

      this._l01_a = this._l12_a, this._l12_a = this._l23_a;
      this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
  };

  function cubic(context) {
    return new Cubic(context);
  }

  function Cubic(context) {
    this._context = context;
  }

  Cubic.prototype = {
    lineStart: function() {
      this._x = [];
      this._y = [];
    },
    lineEnd: function() {
      var x = this._x,
          y = this._y,
          n = x.length;
      switch (n) {
        case 0: break;
        case 1: this._context.moveTo(x[0], y[0]); this._context.closePath(); break;
        case 2: this._context.moveTo(x[0], y[0]); this._context.lineTo(x[1], y[1]); break;
        default: {
          var px = controlPoints(x),
              py = controlPoints(y);
          this._context.moveTo(x[0], y[0]);
          for (var i = 0, n = x.length; i < n - 1; ++i) {
            this._context.bezierCurveTo(px[0][i], py[0][i], px[1][i], py[1][i], x[i + 1], y[i + 1]);
          }
          break;
        }
      }
      this._x = this._y = null;
    },
    point: function(x, y) {
      this._x.push(+x);
      this._y.push(+y);
    }
  };

  // See https://www.particleincell.com/2012/bezier-splines/ for derivation.
  function controlPoints(x) {
    var i,
        n = x.length - 1,
        m,
        a = new Array(n),
        b = new Array(n),
        r = new Array(n);
    a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
    for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
    a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
    for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
    a[n - 1] = r[n - 1] / b[n - 1];
    for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
    b[n - 1] = (x[n] + a[n - 1]) / 2;
    for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
    return [a, b];
  }

  function linear(context) {
    return new Linear(context);
  }

  function Linear(context) {
    this._context = context;
  }

  Linear.prototype = {
    lineStart: function() {
      this._state = 0;
    },
    lineEnd: function() {
      if (this._state === 1) this._context.closePath();
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._state) {
        case 0: this._state = 1; this._context.moveTo(x, y); break;
        case 1: this._state = 2; // proceed
        default: this._context.lineTo(x, y); break;
      }
    }
  };

  function linearClosed(context) {
    return new LinearClosed(context);
  }

  function LinearClosed(context) {
    this._context = context;
  }

  LinearClosed.prototype = {
    lineStart: function() {
      this._state = 0;
    },
    lineEnd: function() {
      this._context.closePath();
    },
    point: function(x, y) {
      x = +x, y = +y;
      if (this._state) this._context.lineTo(x, y);
      else this._state = 1, this._context.moveTo(x, y);
    }
  };

  function step(context) {
    return new Step(context);
  }

  function Step(context) {
    this._context = context;
  }

  Step.prototype = {
    lineStart: function() {
      this._x = this._y = NaN;
      this._state = 0;
    },
    lineEnd: function() {
      switch (this._state) {
        case 1: this._context.closePath(); break;
        case 2: this._context.lineTo(this._x, this._y); break;
      }
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._state) {
        case 0: this._state = 1; this._context.moveTo(x, y); break;
        case 1: this._state = 2; // proceed
        default: {
          var x1 = (this._x + x) / 2;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
          break;
        }
      }
      this._x = x, this._y = y;
    }
  };

  function stepAfter(context) {
    return new StepAfter(context);
  }

  function StepAfter(context) {
    this._context = context;
  }

  StepAfter.prototype = {
    lineStart: function() {
      this._y = NaN;
      this._state = 0;
    },
    lineEnd: function() {
      if (this._state === 1) this._context.closePath();
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._state) {
        case 0: this._state = 1; this._context.moveTo(x, y); break;
        case 1: this._state = 2; // proceed
        default: {
          this._context.lineTo(x, this._y);
          this._context.lineTo(x, y);
          break;
        }
      }
      this._y = y;
    }
  };

  function stepBefore(context) {
    return new StepBefore(context);
  }

  function StepBefore(context) {
    this._context = context;
  }

  StepBefore.prototype = {
    lineStart: function() {
      this._x = NaN;
      this._state = 0;
    },
    lineEnd: function() {
      if (this._state === 1) this._context.closePath();
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._state) {
        case 0: this._state = 1; this._context.moveTo(x, y); break;
        case 1: this._state = 2; // proceed
        default: {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
          break;
        }
      }
      this._x = x;
    }
  };

  function pointX(p) {
    return p[0];
  }

  function pointY(p) {
    return p[1];
  }

  function constant(x) {
    return function() {
      return x;
    };
  }

  function _true() {
    return true;
  }

  function line() {
    var x = pointX, _x = x,
        y = pointY, _y = y,
        defined = true, _defined = _true,
        interpolate = linear,
        context = null,
        stream = null;

    function line(data) {
      var defined = false,
          buffer;

      if (!context) stream = interpolate(buffer = d3Path.path());

      for (var i = 0, n = data.length, d; i < n; ++i) {
        if (!_defined(d = data[i], i) === defined) {
          if (defined = !defined) stream.lineStart();
          else stream.lineEnd();
        }
        if (defined) stream.point(+_x(d, i), +_y(d, i));
      }

      if (defined) stream.lineEnd();
      if (!context) return stream = null, buffer + "" || null;
    }

    line.x = function(_) {
      if (!arguments.length) return x;
      x = _, _x = typeof _ === "function" ? x : constant(x);
      return line;
    };

    line.y = function(_) {
      if (!arguments.length) return y;
      y = _, _y = typeof _ === "function" ? y : constant(y);
      return line;
    };

    line.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _, _defined = typeof _ === "function" ? defined : constant(defined);
      return line;
    };

    line.interpolate = function(_, a) {
      if (!arguments.length) return interpolate;
      if (typeof _ === "function") interpolate = _;
      else switch (_ + "") {
        case "linear-closed": interpolate = linearClosed; break;
        case "step": interpolate = step; break;
        case "step-before": interpolate = stepBefore; break;
        case "step-after": interpolate = stepAfter; break;
        case "basis": interpolate = basis; break;
        case "basis-open": interpolate = basisOpen; break;
        case "basis-closed": interpolate = basisClosed; break;
        case "cardinal": interpolate = cardinal(a); break;
        case "cardinal-open": interpolate = cardinalOpen(a); break;
        case "cardinal-closed": interpolate = cardinalClosed(a); break;
        case "catmull-rom": interpolate = catmullRom(a); break;
        case "cubic": interpolate = cubic; break;
        default: interpolate = linear; break;
      }
      if (context != null) stream = interpolate(context);
      return line;
    };

    line.context = function(_) {
      if (!arguments.length) return context;
      if (_ == null) context = stream = null;
      else stream = interpolate(context = _);
      return line;
    };

    return line;
  };

  var version = "0.0.2";

  exports.version = version;
  exports.line = line;

}));