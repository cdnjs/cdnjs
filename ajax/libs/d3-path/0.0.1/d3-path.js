(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3-path', ['exports'], factory) :
  factory((global.d3_path = {}));
}(this, function (exports) { 'use strict';

  var pi = Math.PI;
  var tau = 2 * pi;
  var epsilon = 1e-6;
  function Path() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = 0; // end of current subpath
    this._ = [];
  }

  Path.prototype = {
    moveTo: function(x, y) {
      this._.push("M", this._x0 = this._x1 = +x, ",", this._y0 = this._y1 = +y);
    },
    closePath: function() {
      this._x1 = this._x0, this._y1 = this._y0;
      this._.push("Z");
    },
    lineTo: function(x, y) {
      this._.push("L", this._x1 = +x, ",", this._y1 = +y);
    },
    quadraticCurveTo: function(x1, y1, x, y) {
      this._.push("Q", +x1, ",", +y1, ",", this._x1 = +x, ",", this._y1 = +y);
    },
    bezierCurveTo: function(x1, y1, x2, y2, x, y) {
      this._.push("C", +x1, ",", +y1, ",", +x2, ",", +y2, ",", this._x1 = +x, ",", this._y1 = +y);
    },
    arcTo: function(x1, y1, x2, y2, r) {
      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
      var x0 = this._x1,
          y0 = this._y1,
          x21 = x2 - x1,
          y21 = y2 - y1,
          x01 = x0 - x1,
          y01 = y0 - y1,
          x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l01_2 = x01 * x01 + y01 * y01,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((Math.PI - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2);
      this._.push(
        "L", x1 + l / l01 * x01, ",", y1 + l / l01 * y01,
        "A", r, ",", r, ",0,0,", +(y01 * x20 > x01 * y20), ",", x1 + l / l21 * x21, ",", y1 + l / l21 * y21,
        "L", this._x1 = +x2, ",", this._y1 = +y2
      );
    },
    arc: function(x, y, r, a0, a1) {
      x = +x, y = +y, r = +r;
      var dx = r * Math.cos(a0),
          dy = r * Math.sin(a0),
          x0 = x + dx,
          y0 = y + dy,
          da = Math.abs(a1 - a0);
      this._.push(this._.length ? "L" : "M", x0, ",", y0);
      if (da >= tau - epsilon) {
        this._.push(
          "A", r, ",", r, ",0,1,1,", x - dx, ",", y - dy,
          "A", r, ",", r, ",0,1,1,", this._x1 = x0, ",", this._y1 = y0
        );
      } else {
        this._.push("A", r, ",", r, ",0,", +(da >= pi), ",1,", this._x1 = x + r * Math.cos(a1), ",", this._y1 = y + r * Math.sin(a1));
      }
    },
    rect: function(x, y, w, h) {
      this._.push("M", this._x0 = this._x1 = +x, ",", this._y0 = this._y1 = +y, "h", +w, "v", +h, "h", -w, "Z");
    },
    toString: function() {
      return this._.join("");
    }
  };

  function path() {
    return new Path;
  };

  var version = "0.0.1";

  exports.version = version;
  exports.path = path;

}));