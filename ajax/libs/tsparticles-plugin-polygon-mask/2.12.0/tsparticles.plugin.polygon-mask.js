/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.12.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-engine"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-engine"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-engine")) : factory(root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__961__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 622:
/***/ (() => {



(function () {
  "use strict";

  try {
    if (typeof window === "undefined") return;
    if (!("SVGPathSeg" in window)) {
      window.SVGPathSeg = function (type, typeAsLetter, owningPathSegList) {
        this.pathSegType = type;
        this.pathSegTypeAsLetter = typeAsLetter;
        this._owningPathSegList = owningPathSegList;
      };
      window.SVGPathSeg.prototype.classname = "SVGPathSeg";
      window.SVGPathSeg.PATHSEG_UNKNOWN = 0;
      window.SVGPathSeg.PATHSEG_CLOSEPATH = 1;
      window.SVGPathSeg.PATHSEG_MOVETO_ABS = 2;
      window.SVGPathSeg.PATHSEG_MOVETO_REL = 3;
      window.SVGPathSeg.PATHSEG_LINETO_ABS = 4;
      window.SVGPathSeg.PATHSEG_LINETO_REL = 5;
      window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6;
      window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7;
      window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8;
      window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9;
      window.SVGPathSeg.PATHSEG_ARC_ABS = 10;
      window.SVGPathSeg.PATHSEG_ARC_REL = 11;
      window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12;
      window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13;
      window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14;
      window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15;
      window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16;
      window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17;
      window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18;
      window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19;
      window.SVGPathSeg.prototype._segmentChanged = function () {
        if (this._owningPathSegList) this._owningPathSegList.segmentChanged(this);
      };
      window.SVGPathSegClosePath = function (owningPathSegList) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CLOSEPATH, "z", owningPathSegList);
      };
      window.SVGPathSegClosePath.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegClosePath.prototype.toString = function () {
        return "[object SVGPathSegClosePath]";
      };
      window.SVGPathSegClosePath.prototype._asPathString = function () {
        return this.pathSegTypeAsLetter;
      };
      window.SVGPathSegClosePath.prototype.clone = function () {
        return new window.SVGPathSegClosePath(undefined);
      };
      window.SVGPathSegMovetoAbs = function (owningPathSegList, x, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_ABS, "M", owningPathSegList);
        this._x = x;
        this._y = y;
      };
      window.SVGPathSegMovetoAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegMovetoAbs.prototype.toString = function () {
        return "[object SVGPathSegMovetoAbs]";
      };
      window.SVGPathSegMovetoAbs.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._x} ${this._y}`;
      };
      window.SVGPathSegMovetoAbs.prototype.clone = function () {
        return new window.SVGPathSegMovetoAbs(undefined, this._x, this._y);
      };
      Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegMovetoRel = function (owningPathSegList, x, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_REL, "m", owningPathSegList);
        this._x = x;
        this._y = y;
      };
      window.SVGPathSegMovetoRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegMovetoRel.prototype.toString = function () {
        return "[object SVGPathSegMovetoRel]";
      };
      window.SVGPathSegMovetoRel.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._x} ${this._y}`;
      };
      window.SVGPathSegMovetoRel.prototype.clone = function () {
        return new window.SVGPathSegMovetoRel(undefined, this._x, this._y);
      };
      Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegLinetoAbs = function (owningPathSegList, x, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_ABS, "L", owningPathSegList);
        this._x = x;
        this._y = y;
      };
      window.SVGPathSegLinetoAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegLinetoAbs.prototype.toString = function () {
        return "[object SVGPathSegLinetoAbs]";
      };
      window.SVGPathSegLinetoAbs.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._x} ${this._y}`;
      };
      window.SVGPathSegLinetoAbs.prototype.clone = function () {
        return new window.SVGPathSegLinetoAbs(undefined, this._x, this._y);
      };
      Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegLinetoRel = function (owningPathSegList, x, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_REL, "l", owningPathSegList);
        this._x = x;
        this._y = y;
      };
      window.SVGPathSegLinetoRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegLinetoRel.prototype.toString = function () {
        return "[object SVGPathSegLinetoRel]";
      };
      window.SVGPathSegLinetoRel.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._x} ${this._y}`;
      };
      window.SVGPathSegLinetoRel.prototype.clone = function () {
        return new window.SVGPathSegLinetoRel(undefined, this._x, this._y);
      };
      Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoCubicAbs = function (owningPathSegList, x, y, x1, y1, x2, y2) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", owningPathSegList);
        this._x = x;
        this._y = y;
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
      };
      window.SVGPathSegCurvetoCubicAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoCubicAbs.prototype.toString = function () {
        return "[object SVGPathSegCurvetoCubicAbs]";
      };
      window.SVGPathSegCurvetoCubicAbs.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter}  ${this._x1} ${this._y1} ${this._x2} ${this._y2} ${this._x} ${this._y}`;
      };
      window.SVGPathSegCurvetoCubicAbs.prototype.clone = function () {
        return new window.SVGPathSegCurvetoCubicAbs(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2);
      };
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x1", {
        get: function () {
          return this._x1;
        },
        set: function (x1) {
          this._x1 = x1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y1", {
        get: function () {
          return this._y1;
        },
        set: function (y1) {
          this._y1 = y1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x2", {
        get: function () {
          return this._x2;
        },
        set: function (x2) {
          this._x2 = x2;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y2", {
        get: function () {
          return this._y2;
        },
        set: function (y2) {
          this._y2 = y2;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoCubicRel = function (owningPathSegList, x, y, x1, y1, x2, y2) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", owningPathSegList);
        this._x = x;
        this._y = y;
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
      };
      window.SVGPathSegCurvetoCubicRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoCubicRel.prototype.toString = function () {
        return "[object SVGPathSegCurvetoCubicRel]";
      };
      window.SVGPathSegCurvetoCubicRel.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._x1} ${this._y1} ${this._x2} ${this._y2} ${this._x} ${this._y}`;
      };
      window.SVGPathSegCurvetoCubicRel.prototype.clone = function () {
        return new window.SVGPathSegCurvetoCubicRel(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2);
      };
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x1", {
        get: function () {
          return this._x1;
        },
        set: function (x1) {
          this._x1 = x1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y1", {
        get: function () {
          return this._y1;
        },
        set: function (y1) {
          this._y1 = y1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x2", {
        get: function () {
          return this._x2;
        },
        set: function (x2) {
          this._x2 = x2;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y2", {
        get: function () {
          return this._y2;
        },
        set: function (y2) {
          this._y2 = y2;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoQuadraticAbs = function (owningPathSegList, x, y, x1, y1) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", owningPathSegList);
        this._x = x;
        this._y = y;
        this._x1 = x1;
        this._y1 = y1;
      };
      window.SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoQuadraticAbs.prototype.toString = function () {
        return "[object SVGPathSegCurvetoQuadraticAbs]";
      };
      window.SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._x1} ${this._y1} ${this._x} ${this._y}`;
      };
      window.SVGPathSegCurvetoQuadraticAbs.prototype.clone = function () {
        return new window.SVGPathSegCurvetoQuadraticAbs(undefined, this._x, this._y, this._x1, this._y1);
      };
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x1", {
        get: function () {
          return this._x1;
        },
        set: function (x1) {
          this._x1 = x1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y1", {
        get: function () {
          return this._y1;
        },
        set: function (y1) {
          this._y1 = y1;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoQuadraticRel = function (owningPathSegList, x, y, x1, y1) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", owningPathSegList);
        this._x = x;
        this._y = y;
        this._x1 = x1;
        this._y1 = y1;
      };
      window.SVGPathSegCurvetoQuadraticRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoQuadraticRel.prototype.toString = function () {
        return "[object SVGPathSegCurvetoQuadraticRel]";
      };
      window.SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._x1} ${this._y1} ${this._x} ${this._y}`;
      };
      window.SVGPathSegCurvetoQuadraticRel.prototype.clone = function () {
        return new window.SVGPathSegCurvetoQuadraticRel(undefined, this._x, this._y, this._x1, this._y1);
      };
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x1", {
        get: function () {
          return this._x1;
        },
        set: function (x1) {
          this._x1 = x1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y1", {
        get: function () {
          return this._y1;
        },
        set: function (y1) {
          this._y1 = y1;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegArcAbs = function (owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_ABS, "A", owningPathSegList);
        this._x = x;
        this._y = y;
        this._r1 = r1;
        this._r2 = r2;
        this._angle = angle;
        this._largeArcFlag = largeArcFlag;
        this._sweepFlag = sweepFlag;
      };
      window.SVGPathSegArcAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegArcAbs.prototype.toString = function () {
        return "[object SVGPathSegArcAbs]";
      };
      window.SVGPathSegArcAbs.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._r1} ${this._r2} ${this._angle} ${this._largeArcFlag ? "1" : "0"} ${this._sweepFlag ? "1" : "0"} ${this._x} ${this._y}`;
      };
      window.SVGPathSegArcAbs.prototype.clone = function () {
        return new window.SVGPathSegArcAbs(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag);
      };
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r1", {
        get: function () {
          return this._r1;
        },
        set: function (r1) {
          this._r1 = r1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r2", {
        get: function () {
          return this._r2;
        },
        set: function (r2) {
          this._r2 = r2;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "angle", {
        get: function () {
          return this._angle;
        },
        set: function (angle) {
          this._angle = angle;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "largeArcFlag", {
        get: function () {
          return this._largeArcFlag;
        },
        set: function (largeArcFlag) {
          this._largeArcFlag = largeArcFlag;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "sweepFlag", {
        get: function () {
          return this._sweepFlag;
        },
        set: function (sweepFlag) {
          this._sweepFlag = sweepFlag;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegArcRel = function (owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_REL, "a", owningPathSegList);
        this._x = x;
        this._y = y;
        this._r1 = r1;
        this._r2 = r2;
        this._angle = angle;
        this._largeArcFlag = largeArcFlag;
        this._sweepFlag = sweepFlag;
      };
      window.SVGPathSegArcRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegArcRel.prototype.toString = function () {
        return "[object SVGPathSegArcRel]";
      };
      window.SVGPathSegArcRel.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._r1} ${this._r2} ${this._angle} ${this._largeArcFlag ? "1" : "0"} ${this._sweepFlag ? "1" : "0"} ${this._x} ${this._y}`;
      };
      window.SVGPathSegArcRel.prototype.clone = function () {
        return new window.SVGPathSegArcRel(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag);
      };
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "r1", {
        get: function () {
          return this._r1;
        },
        set: function (r1) {
          this._r1 = r1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "r2", {
        get: function () {
          return this._r2;
        },
        set: function (r2) {
          this._r2 = r2;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "angle", {
        get: function () {
          return this._angle;
        },
        set: function (angle) {
          this._angle = angle;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "largeArcFlag", {
        get: function () {
          return this._largeArcFlag;
        },
        set: function (largeArcFlag) {
          this._largeArcFlag = largeArcFlag;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "sweepFlag", {
        get: function () {
          return this._sweepFlag;
        },
        set: function (sweepFlag) {
          this._sweepFlag = sweepFlag;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegLinetoHorizontalAbs = function (owningPathSegList, x) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", owningPathSegList);
        this._x = x;
      };
      window.SVGPathSegLinetoHorizontalAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegLinetoHorizontalAbs.prototype.toString = function () {
        return "[object SVGPathSegLinetoHorizontalAbs]";
      };
      window.SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._x}`;
      };
      window.SVGPathSegLinetoHorizontalAbs.prototype.clone = function () {
        return new window.SVGPathSegLinetoHorizontalAbs(undefined, this._x);
      };
      Object.defineProperty(window.SVGPathSegLinetoHorizontalAbs.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegLinetoHorizontalRel = function (owningPathSegList, x) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", owningPathSegList);
        this._x = x;
      };
      window.SVGPathSegLinetoHorizontalRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegLinetoHorizontalRel.prototype.toString = function () {
        return "[object SVGPathSegLinetoHorizontalRel]";
      };
      window.SVGPathSegLinetoHorizontalRel.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._x}`;
      };
      window.SVGPathSegLinetoHorizontalRel.prototype.clone = function () {
        return new window.SVGPathSegLinetoHorizontalRel(undefined, this._x);
      };
      Object.defineProperty(window.SVGPathSegLinetoHorizontalRel.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegLinetoVerticalAbs = function (owningPathSegList, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", owningPathSegList);
        this._y = y;
      };
      window.SVGPathSegLinetoVerticalAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegLinetoVerticalAbs.prototype.toString = function () {
        return "[object SVGPathSegLinetoVerticalAbs]";
      };
      window.SVGPathSegLinetoVerticalAbs.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._y}`;
      };
      window.SVGPathSegLinetoVerticalAbs.prototype.clone = function () {
        return new window.SVGPathSegLinetoVerticalAbs(undefined, this._y);
      };
      Object.defineProperty(window.SVGPathSegLinetoVerticalAbs.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegLinetoVerticalRel = function (owningPathSegList, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", owningPathSegList);
        this._y = y;
      };
      window.SVGPathSegLinetoVerticalRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegLinetoVerticalRel.prototype.toString = function () {
        return "[object SVGPathSegLinetoVerticalRel]";
      };
      window.SVGPathSegLinetoVerticalRel.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._y}`;
      };
      window.SVGPathSegLinetoVerticalRel.prototype.clone = function () {
        return new window.SVGPathSegLinetoVerticalRel(undefined, this._y);
      };
      Object.defineProperty(window.SVGPathSegLinetoVerticalRel.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoCubicSmoothAbs = function (owningPathSegList, x, y, x2, y2) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", owningPathSegList);
        this._x = x;
        this._y = y;
        this._x2 = x2;
        this._y2 = y2;
      };
      window.SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function () {
        return "[object SVGPathSegCurvetoCubicSmoothAbs]";
      };
      window.SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._x2} ${this._y2} ${this._x} ${this._y}`;
      };
      window.SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function () {
        return new window.SVGPathSegCurvetoCubicSmoothAbs(undefined, this._x, this._y, this._x2, this._y2);
      };
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", {
        get: function () {
          return this._x2;
        },
        set: function (x2) {
          this._x2 = x2;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", {
        get: function () {
          return this._y2;
        },
        set: function (y2) {
          this._y2 = y2;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoCubicSmoothRel = function (owningPathSegList, x, y, x2, y2) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", owningPathSegList);
        this._x = x;
        this._y = y;
        this._x2 = x2;
        this._y2 = y2;
      };
      window.SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function () {
        return "[object SVGPathSegCurvetoCubicSmoothRel]";
      };
      window.SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._x2} ${this._y2} ${this._x} ${this._y}`;
      };
      window.SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function () {
        return new window.SVGPathSegCurvetoCubicSmoothRel(undefined, this._x, this._y, this._x2, this._y2);
      };
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", {
        get: function () {
          return this._x2;
        },
        set: function (x2) {
          this._x2 = x2;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", {
        get: function () {
          return this._y2;
        },
        set: function (y2) {
          this._y2 = y2;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoQuadraticSmoothAbs = function (owningPathSegList, x, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", owningPathSegList);
        this._x = x;
        this._y = y;
      };
      window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function () {
        return "[object SVGPathSegCurvetoQuadraticSmoothAbs]";
      };
      window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._x} ${this._y}`;
      };
      window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function () {
        return new window.SVGPathSegCurvetoQuadraticSmoothAbs(undefined, this._x, this._y);
      };
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoQuadraticSmoothRel = function (owningPathSegList, x, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", owningPathSegList);
        this._x = x;
        this._y = y;
      };
      window.SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function () {
        return "[object SVGPathSegCurvetoQuadraticSmoothRel]";
      };
      window.SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function () {
        return `${this.pathSegTypeAsLetter} ${this._x} ${this._y}`;
      };
      window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function () {
        return new window.SVGPathSegCurvetoQuadraticSmoothRel(undefined, this._x, this._y);
      };
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", {
        get: function () {
          return this._x;
        },
        set: function (x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", {
        get: function () {
          return this._y;
        },
        set: function (y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathElement.prototype.createSVGPathSegClosePath = function () {
        return new window.SVGPathSegClosePath(undefined);
      };
      window.SVGPathElement.prototype.createSVGPathSegMovetoAbs = function (x, y) {
        return new window.SVGPathSegMovetoAbs(undefined, x, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegMovetoRel = function (x, y) {
        return new window.SVGPathSegMovetoRel(undefined, x, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegLinetoAbs = function (x, y) {
        return new window.SVGPathSegLinetoAbs(undefined, x, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegLinetoRel = function (x, y) {
        return new window.SVGPathSegLinetoRel(undefined, x, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function (x, y, x1, y1, x2, y2) {
        return new window.SVGPathSegCurvetoCubicAbs(undefined, x, y, x1, y1, x2, y2);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function (x, y, x1, y1, x2, y2) {
        return new window.SVGPathSegCurvetoCubicRel(undefined, x, y, x1, y1, x2, y2);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function (x, y, x1, y1) {
        return new window.SVGPathSegCurvetoQuadraticAbs(undefined, x, y, x1, y1);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function (x, y, x1, y1) {
        return new window.SVGPathSegCurvetoQuadraticRel(undefined, x, y, x1, y1);
      };
      window.SVGPathElement.prototype.createSVGPathSegArcAbs = function (x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
        return new window.SVGPathSegArcAbs(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag);
      };
      window.SVGPathElement.prototype.createSVGPathSegArcRel = function (x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
        return new window.SVGPathSegArcRel(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag);
      };
      window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function (x) {
        return new window.SVGPathSegLinetoHorizontalAbs(undefined, x);
      };
      window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function (x) {
        return new window.SVGPathSegLinetoHorizontalRel(undefined, x);
      };
      window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function (y) {
        return new window.SVGPathSegLinetoVerticalAbs(undefined, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function (y) {
        return new window.SVGPathSegLinetoVerticalRel(undefined, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function (x, y, x2, y2) {
        return new window.SVGPathSegCurvetoCubicSmoothAbs(undefined, x, y, x2, y2);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function (x, y, x2, y2) {
        return new window.SVGPathSegCurvetoCubicSmoothRel(undefined, x, y, x2, y2);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function (x, y) {
        return new window.SVGPathSegCurvetoQuadraticSmoothAbs(undefined, x, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function (x, y) {
        return new window.SVGPathSegCurvetoQuadraticSmoothRel(undefined, x, y);
      };
      if (!("getPathSegAtLength" in window.SVGPathElement.prototype)) {
        window.SVGPathElement.prototype.getPathSegAtLength = function (distance) {
          if (distance === undefined || !isFinite(distance)) throw "Invalid arguments.";
          const measurementElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
          measurementElement.setAttribute("d", this.getAttribute("d"));
          let lastPathSegment = measurementElement.pathSegList.numberOfItems - 1;
          if (lastPathSegment <= 0) return 0;
          do {
            measurementElement.pathSegList.removeItem(lastPathSegment);
            if (distance > measurementElement.getTotalLength()) break;
            lastPathSegment--;
          } while (lastPathSegment > 0);
          return lastPathSegment;
        };
      }
    }
    if (!("SVGPathSegList" in window) || !("appendItem" in window.SVGPathSegList.prototype)) {
      window.SVGPathSegList = function (pathElement) {
        this._pathElement = pathElement;
        this._list = this._parsePath(this._pathElement.getAttribute("d"));
        this._mutationObserverConfig = {
          attributes: true,
          attributeFilter: ["d"]
        };
        this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this));
        this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
      };
      window.SVGPathSegList.prototype.classname = "SVGPathSegList";
      Object.defineProperty(window.SVGPathSegList.prototype, "numberOfItems", {
        get: function () {
          this._checkPathSynchronizedToList();
          return this._list.length;
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegList.prototype, "length", {
        get: function () {
          this._checkPathSynchronizedToList();
          return this._list.length;
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathElement.prototype, "pathSegList", {
        get: function () {
          if (!this._pathSegList) this._pathSegList = new window.SVGPathSegList(this);
          return this._pathSegList;
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathElement.prototype, "normalizedPathSegList", {
        get: function () {
          return this.pathSegList;
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathElement.prototype, "animatedPathSegList", {
        get: function () {
          return this.pathSegList;
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathElement.prototype, "animatedNormalizedPathSegList", {
        get: function () {
          return this.pathSegList;
        },
        enumerable: true
      });
      window.SVGPathSegList.prototype._checkPathSynchronizedToList = function () {
        this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords());
      };
      window.SVGPathSegList.prototype._updateListFromPathMutations = function (mutationRecords) {
        if (!this._pathElement) return;
        let hasPathMutations = false;
        mutationRecords.forEach(function (record) {
          if (record.attributeName == "d") hasPathMutations = true;
        });
        if (hasPathMutations) this._list = this._parsePath(this._pathElement.getAttribute("d"));
      };
      window.SVGPathSegList.prototype._writeListToPath = function () {
        this._pathElementMutationObserver.disconnect();
        this._pathElement.setAttribute("d", window.SVGPathSegList._pathSegArrayAsString(this._list));
        this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
      };
      window.SVGPathSegList.prototype.segmentChanged = function () {
        this._writeListToPath();
      };
      window.SVGPathSegList.prototype.clear = function () {
        this._checkPathSynchronizedToList();
        this._list.forEach(function (pathSeg) {
          pathSeg._owningPathSegList = null;
        });
        this._list = [];
        this._writeListToPath();
      };
      window.SVGPathSegList.prototype.initialize = function (newItem) {
        this._checkPathSynchronizedToList();
        this._list = [newItem];
        newItem._owningPathSegList = this;
        this._writeListToPath();
        return newItem;
      };
      window.SVGPathSegList.prototype._checkValidIndex = function (index) {
        if (isNaN(index) || index < 0 || index >= this.numberOfItems) throw "INDEX_SIZE_ERR";
      };
      window.SVGPathSegList.prototype.getItem = function (index) {
        this._checkPathSynchronizedToList();
        this._checkValidIndex(index);
        return this._list[index];
      };
      window.SVGPathSegList.prototype.insertItemBefore = function (newItem, index) {
        this._checkPathSynchronizedToList();
        if (index > this.numberOfItems) index = this.numberOfItems;
        if (newItem._owningPathSegList) {
          newItem = newItem.clone();
        }
        this._list.splice(index, 0, newItem);
        newItem._owningPathSegList = this;
        this._writeListToPath();
        return newItem;
      };
      window.SVGPathSegList.prototype.replaceItem = function (newItem, index) {
        this._checkPathSynchronizedToList();
        if (newItem._owningPathSegList) {
          newItem = newItem.clone();
        }
        this._checkValidIndex(index);
        this._list[index] = newItem;
        newItem._owningPathSegList = this;
        this._writeListToPath();
        return newItem;
      };
      window.SVGPathSegList.prototype.removeItem = function (index) {
        this._checkPathSynchronizedToList();
        this._checkValidIndex(index);
        const item = this._list[index];
        this._list.splice(index, 1);
        this._writeListToPath();
        return item;
      };
      window.SVGPathSegList.prototype.appendItem = function (newItem) {
        this._checkPathSynchronizedToList();
        if (newItem._owningPathSegList) {
          newItem = newItem.clone();
        }
        this._list.push(newItem);
        newItem._owningPathSegList = this;
        this._writeListToPath();
        return newItem;
      };
      window.SVGPathSegList._pathSegArrayAsString = function (pathSegArray) {
        let string = "";
        let first = true;
        pathSegArray.forEach(function (pathSeg) {
          if (first) {
            first = false;
            string += pathSeg._asPathString();
          } else {
            string += ` ${pathSeg._asPathString()}`;
          }
        });
        return string;
      };
      window.SVGPathSegList.prototype._parsePath = function (string) {
        if (!string || !string.length) return [];
        const owningPathSegList = this;
        const Builder = function () {
          this.pathSegList = [];
        };
        Builder.prototype.appendSegment = function (pathSeg) {
          this.pathSegList.push(pathSeg);
        };
        const Source = function (string) {
          this._string = string;
          this._currentIndex = 0;
          this._endIndex = this._string.length;
          this._previousCommand = window.SVGPathSeg.PATHSEG_UNKNOWN;
          this._skipOptionalSpaces();
        };
        Source.prototype._isCurrentSpace = function () {
          const character = this._string[this._currentIndex];
          return character <= " " && (character == " " || character == "\n" || character == "\t" || character == "\r" || character == "\f");
        };
        Source.prototype._skipOptionalSpaces = function () {
          while (this._currentIndex < this._endIndex && this._isCurrentSpace()) this._currentIndex++;
          return this._currentIndex < this._endIndex;
        };
        Source.prototype._skipOptionalSpacesOrDelimiter = function () {
          if (this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string.charAt(this._currentIndex) != ",") return false;
          if (this._skipOptionalSpaces()) {
            if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ",") {
              this._currentIndex++;
              this._skipOptionalSpaces();
            }
          }
          return this._currentIndex < this._endIndex;
        };
        Source.prototype.hasMoreData = function () {
          return this._currentIndex < this._endIndex;
        };
        Source.prototype.peekSegmentType = function () {
          const lookahead = this._string[this._currentIndex];
          return this._pathSegTypeFromChar(lookahead);
        };
        Source.prototype._pathSegTypeFromChar = function (lookahead) {
          switch (lookahead) {
            case "Z":
            case "z":
              return window.SVGPathSeg.PATHSEG_CLOSEPATH;
            case "M":
              return window.SVGPathSeg.PATHSEG_MOVETO_ABS;
            case "m":
              return window.SVGPathSeg.PATHSEG_MOVETO_REL;
            case "L":
              return window.SVGPathSeg.PATHSEG_LINETO_ABS;
            case "l":
              return window.SVGPathSeg.PATHSEG_LINETO_REL;
            case "C":
              return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
            case "c":
              return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
            case "Q":
              return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
            case "q":
              return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
            case "A":
              return window.SVGPathSeg.PATHSEG_ARC_ABS;
            case "a":
              return window.SVGPathSeg.PATHSEG_ARC_REL;
            case "H":
              return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
            case "h":
              return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
            case "V":
              return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
            case "v":
              return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
            case "S":
              return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
            case "s":
              return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
            case "T":
              return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
            case "t":
              return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
            default:
              return window.SVGPathSeg.PATHSEG_UNKNOWN;
          }
        };
        Source.prototype._nextCommandHelper = function (lookahead, previousCommand) {
          if ((lookahead == "+" || lookahead == "-" || lookahead == "." || lookahead >= "0" && lookahead <= "9") && previousCommand != window.SVGPathSeg.PATHSEG_CLOSEPATH) {
            if (previousCommand == window.SVGPathSeg.PATHSEG_MOVETO_ABS) return window.SVGPathSeg.PATHSEG_LINETO_ABS;
            if (previousCommand == window.SVGPathSeg.PATHSEG_MOVETO_REL) return window.SVGPathSeg.PATHSEG_LINETO_REL;
            return previousCommand;
          }
          return window.SVGPathSeg.PATHSEG_UNKNOWN;
        };
        Source.prototype.initialCommandIsMoveTo = function () {
          if (!this.hasMoreData()) return true;
          const command = this.peekSegmentType();
          return command == window.SVGPathSeg.PATHSEG_MOVETO_ABS || command == window.SVGPathSeg.PATHSEG_MOVETO_REL;
        };
        Source.prototype._parseNumber = function () {
          let exponent = 0;
          let integer = 0;
          let frac = 1;
          let decimal = 0;
          let sign = 1;
          let expsign = 1;
          const startIndex = this._currentIndex;
          this._skipOptionalSpaces();
          if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "+") this._currentIndex++;else if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "-") {
            this._currentIndex++;
            sign = -1;
          }
          if (this._currentIndex == this._endIndex || (this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") && this._string.charAt(this._currentIndex) != ".") return undefined;
          const startIntPartIndex = this._currentIndex;
          while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") this._currentIndex++;
          if (this._currentIndex != startIntPartIndex) {
            let scanIntPartIndex = this._currentIndex - 1;
            let multiplier = 1;
            while (scanIntPartIndex >= startIntPartIndex) {
              integer += multiplier * (this._string.charAt(scanIntPartIndex--) - "0");
              multiplier *= 10;
            }
          }
          if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ".") {
            this._currentIndex++;
            if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") return undefined;
            while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
              frac *= 10;
              decimal += (this._string.charAt(this._currentIndex) - "0") / frac;
              this._currentIndex += 1;
            }
          }
          if (this._currentIndex != startIndex && this._currentIndex + 1 < this._endIndex && (this._string.charAt(this._currentIndex) == "e" || this._string.charAt(this._currentIndex) == "E") && this._string.charAt(this._currentIndex + 1) != "x" && this._string.charAt(this._currentIndex + 1) != "m") {
            this._currentIndex++;
            if (this._string.charAt(this._currentIndex) == "+") {
              this._currentIndex++;
            } else if (this._string.charAt(this._currentIndex) == "-") {
              this._currentIndex++;
              expsign = -1;
            }
            if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") return undefined;
            while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
              exponent *= 10;
              exponent += this._string.charAt(this._currentIndex) - "0";
              this._currentIndex++;
            }
          }
          let number = integer + decimal;
          number *= sign;
          if (exponent) number *= Math.pow(10, expsign * exponent);
          if (startIndex == this._currentIndex) return undefined;
          this._skipOptionalSpacesOrDelimiter();
          return number;
        };
        Source.prototype._parseArcFlag = function () {
          if (this._currentIndex >= this._endIndex) return undefined;
          let flag = false;
          const flagChar = this._string.charAt(this._currentIndex++);
          if (flagChar == "0") flag = false;else if (flagChar == "1") flag = true;else return undefined;
          this._skipOptionalSpacesOrDelimiter();
          return flag;
        };
        Source.prototype.parseSegment = function () {
          const lookahead = this._string[this._currentIndex];
          let command = this._pathSegTypeFromChar(lookahead);
          if (command == window.SVGPathSeg.PATHSEG_UNKNOWN) {
            if (this._previousCommand == window.SVGPathSeg.PATHSEG_UNKNOWN) return null;
            command = this._nextCommandHelper(lookahead, this._previousCommand);
            if (command == window.SVGPathSeg.PATHSEG_UNKNOWN) return null;
          } else {
            this._currentIndex++;
          }
          this._previousCommand = command;
          let points;
          switch (command) {
            case window.SVGPathSeg.PATHSEG_MOVETO_REL:
              return new window.SVGPathSegMovetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
            case window.SVGPathSeg.PATHSEG_MOVETO_ABS:
              return new window.SVGPathSegMovetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
            case window.SVGPathSeg.PATHSEG_LINETO_REL:
              return new window.SVGPathSegLinetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
            case window.SVGPathSeg.PATHSEG_LINETO_ABS:
              return new window.SVGPathSegLinetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
            case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
              return new window.SVGPathSegLinetoHorizontalRel(owningPathSegList, this._parseNumber());
            case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
              return new window.SVGPathSegLinetoHorizontalAbs(owningPathSegList, this._parseNumber());
            case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
              return new window.SVGPathSegLinetoVerticalRel(owningPathSegList, this._parseNumber());
            case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
              return new window.SVGPathSegLinetoVerticalAbs(owningPathSegList, this._parseNumber());
            case window.SVGPathSeg.PATHSEG_CLOSEPATH:
              this._skipOptionalSpaces();
              return new window.SVGPathSegClosePath(owningPathSegList);
            case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
              points = {
                x1: this._parseNumber(),
                y1: this._parseNumber(),
                x2: this._parseNumber(),
                y2: this._parseNumber(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegCurvetoCubicRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
            case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
              points = {
                x1: this._parseNumber(),
                y1: this._parseNumber(),
                x2: this._parseNumber(),
                y2: this._parseNumber(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegCurvetoCubicAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
            case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
              points = {
                x2: this._parseNumber(),
                y2: this._parseNumber(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegCurvetoCubicSmoothRel(owningPathSegList, points.x, points.y, points.x2, points.y2);
            case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
              points = {
                x2: this._parseNumber(),
                y2: this._parseNumber(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegCurvetoCubicSmoothAbs(owningPathSegList, points.x, points.y, points.x2, points.y2);
            case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
              points = {
                x1: this._parseNumber(),
                y1: this._parseNumber(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegCurvetoQuadraticRel(owningPathSegList, points.x, points.y, points.x1, points.y1);
            case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
              points = {
                x1: this._parseNumber(),
                y1: this._parseNumber(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegCurvetoQuadraticAbs(owningPathSegList, points.x, points.y, points.x1, points.y1);
            case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
              return new window.SVGPathSegCurvetoQuadraticSmoothRel(owningPathSegList, this._parseNumber(), this._parseNumber());
            case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
              return new window.SVGPathSegCurvetoQuadraticSmoothAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
            case window.SVGPathSeg.PATHSEG_ARC_REL:
              points = {
                x1: this._parseNumber(),
                y1: this._parseNumber(),
                arcAngle: this._parseNumber(),
                arcLarge: this._parseArcFlag(),
                arcSweep: this._parseArcFlag(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegArcRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
            case window.SVGPathSeg.PATHSEG_ARC_ABS:
              points = {
                x1: this._parseNumber(),
                y1: this._parseNumber(),
                arcAngle: this._parseNumber(),
                arcLarge: this._parseArcFlag(),
                arcSweep: this._parseArcFlag(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegArcAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
            default:
              throw "Unknown path seg type.";
          }
        };
        const builder = new Builder();
        const source = new Source(string);
        if (!source.initialCommandIsMoveTo()) return [];
        while (source.hasMoreData()) {
          const pathSeg = source.parseSegment();
          if (!pathSeg) return [];
          builder.appendSegment(pathSeg);
        }
        return builder.pathSegList;
      };
    }
  } catch (e) {
    console.warn("An error occurred in tsParticles pathseg polyfill. If the Polygon Mask is not working, please open an issue here: https://github.com/matteobruni/tsparticles", e);
  }
})();

/***/ }),

/***/ 961:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__961__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  loadPolygonMaskPlugin: () => (/* binding */ loadPolygonMaskPlugin)
});

// EXTERNAL MODULE: ./dist/browser/pathseg.js
var pathseg = __webpack_require__(622);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/PolygonMaskDrawStroke.js

class PolygonMaskDrawStroke {
  constructor() {
    this.color = new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor();
    this.width = 0.5;
    this.opacity = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.color = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor.create(this.color, data.color);
    if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isString)(this.color.value)) {
      this.opacity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.stringToAlpha)(this.color.value) ?? this.opacity;
    }
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
    if (data.width !== undefined) {
      this.width = data.width;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/PolygonMaskDraw.js


class PolygonMaskDraw {
  constructor() {
    this.enable = false;
    this.stroke = new PolygonMaskDrawStroke();
  }
  get lineColor() {
    return this.stroke.color;
  }
  set lineColor(value) {
    this.stroke.color = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor.create(this.stroke.color, value);
  }
  get lineWidth() {
    return this.stroke.width;
  }
  set lineWidth(value) {
    this.stroke.width = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    const stroke = data.stroke ?? {
      color: data.lineColor,
      width: data.lineWidth
    };
    this.stroke.load(stroke);
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/PolygonMaskInline.js
class PolygonMaskInline {
  constructor() {
    this.arrangement = "one-per-point";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.arrangement !== undefined) {
      this.arrangement = data.arrangement;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/PolygonMaskLocalSvg.js
class PolygonMaskLocalSvg {
  constructor() {
    this.path = [];
    this.size = {
      height: 0,
      width: 0
    };
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.path !== undefined) {
      this.path = data.path;
    }
    if (data.size !== undefined) {
      if (data.size.width !== undefined) {
        this.size.width = data.size.width;
      }
      if (data.size.height !== undefined) {
        this.size.height = data.size.height;
      }
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/PolygonMaskMove.js
class PolygonMaskMove {
  constructor() {
    this.radius = 10;
    this.type = "path";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
    if (data.type !== undefined) {
      this.type = data.type;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/PolygonMask.js





class PolygonMask {
  constructor() {
    this.draw = new PolygonMaskDraw();
    this.enable = false;
    this.inline = new PolygonMaskInline();
    this.move = new PolygonMaskMove();
    this.scale = 1;
    this.type = "none";
  }
  get inlineArrangement() {
    return this.inline.arrangement;
  }
  set inlineArrangement(value) {
    this.inline.arrangement = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.draw.load(data.draw);
    this.inline.load(data.inline);
    this.move.load(data.move);
    if (data.scale !== undefined) {
      this.scale = data.scale;
    }
    if (data.type !== undefined) {
      this.type = data.type;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    } else {
      this.enable = this.type !== "none";
    }
    if (data.url !== undefined) {
      this.url = data.url;
    }
    if (data.data !== undefined) {
      if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isString)(data.data)) {
        this.data = data.data;
      } else {
        this.data = new PolygonMaskLocalSvg();
        this.data.load(data.data);
      }
    }
    if (data.position !== undefined) {
      this.position = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, data.position);
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/utils.js

function drawPolygonMask(context, rawData, stroke) {
  const color = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rangeColorToRgb)(stroke.color);
  if (!color) {
    return;
  }
  context.beginPath();
  context.moveTo(rawData[0].x, rawData[0].y);
  for (const item of rawData) {
    context.lineTo(item.x, item.y);
  }
  context.closePath();
  context.strokeStyle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(color);
  context.lineWidth = stroke.width;
  context.stroke();
}
function drawPolygonMaskPath(context, path, stroke, position) {
  context.setTransform(1, 0, 0, 1, position.x, position.y);
  const color = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rangeColorToRgb)(stroke.color);
  if (!color) {
    return;
  }
  context.strokeStyle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(color, stroke.opacity);
  context.lineWidth = stroke.width;
  context.stroke(path);
  context.setTransform(1, 0, 0, 1, 0, 0);
}
function parsePaths(paths, scale, offset) {
  const res = [];
  for (const path of paths) {
    const segments = path.element.pathSegList,
      len = segments?.numberOfItems ?? 0,
      p = {
        x: 0,
        y: 0
      };
    for (let i = 0; i < len; i++) {
      const segment = segments?.getItem(i),
        svgPathSeg = window.SVGPathSeg;
      switch (segment?.pathSegType) {
        case svgPathSeg.PATHSEG_MOVETO_ABS:
        case svgPathSeg.PATHSEG_LINETO_ABS:
        case svgPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
        case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
        case svgPathSeg.PATHSEG_ARC_ABS:
        case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
        case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
          {
            const absSeg = segment;
            p.x = absSeg.x;
            p.y = absSeg.y;
            break;
          }
        case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
          p.x = segment.x;
          break;
        case svgPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
          p.y = segment.y;
          break;
        case svgPathSeg.PATHSEG_LINETO_REL:
        case svgPathSeg.PATHSEG_MOVETO_REL:
        case svgPathSeg.PATHSEG_CURVETO_CUBIC_REL:
        case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
        case svgPathSeg.PATHSEG_ARC_REL:
        case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
        case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
          {
            const relSeg = segment;
            p.x += relSeg.x;
            p.y += relSeg.y;
            break;
          }
        case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
          p.x += segment.x;
          break;
        case svgPathSeg.PATHSEG_LINETO_VERTICAL_REL:
          p.y += segment.y;
          break;
        case svgPathSeg.PATHSEG_UNKNOWN:
        case svgPathSeg.PATHSEG_CLOSEPATH:
          continue;
      }
      res.push({
        x: p.x * scale + offset.x,
        y: p.y * scale + offset.y
      });
    }
  }
  return res;
}
function calcClosestPtOnSegment(s1, s2, pos) {
  const {
      dx: dx1,
      dy: dy1
    } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(pos, s1),
    {
      dx: dx2,
      dy: dy2
    } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(s2, s1),
    t = (dx1 * dx2 + dy1 * dy2) / (dx2 ** 2 + dy2 ** 2),
    res = {
      x: s1.x + dx2 * t,
      y: s1.y + dy2 * t,
      isOnSegment: t >= 0 && t <= 1
    };
  if (t < 0) {
    res.x = s1.x;
    res.y = s1.y;
  } else if (t > 1) {
    res.x = s2.x;
    res.y = s2.y;
  }
  return res;
}
function segmentBounce(start, stop, velocity) {
  const {
      dx,
      dy
    } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(start, stop),
    wallAngle = Math.atan2(dy, dx),
    wallNormal = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.create(Math.sin(wallAngle), -Math.cos(wallAngle)),
    d = 2 * (velocity.x * wallNormal.x + velocity.y * wallNormal.y);
  wallNormal.multTo(d);
  velocity.subFrom(wallNormal);
}
;// CONCATENATED MODULE: ./dist/browser/PolygonMaskInstance.js


const noPolygonDataLoaded = `${external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.errorPrefix} No polygon data loaded.`,
  noPolygonFound = `${external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.errorPrefix} No polygon found, you need to specify SVG url in config.`;
class PolygonMaskInstance {
  constructor(container, engine) {
    this._checkInsidePolygon = position => {
      const container = this._container,
        options = container.actualOptions.polygon;
      if (!options?.enable || options.type === "none" || options.type === "inline") {
        return true;
      }
      if (!this.raw) {
        throw new Error(noPolygonFound);
      }
      const canvasSize = container.canvas.size,
        x = position?.x ?? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * canvasSize.width,
        y = position?.y ?? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * canvasSize.height;
      let inside = false;
      for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
        const pi = this.raw[i],
          pj = this.raw[j],
          intersect = pi.y > y !== pj.y > y && x < (pj.x - pi.x) * (y - pi.y) / (pj.y - pi.y) + pi.x;
        if (intersect) {
          inside = !inside;
        }
      }
      return options.type === "inside" ? inside : options.type === "outside" ? !inside : false;
    };
    this._createPath2D = () => {
      const container = this._container,
        options = container.actualOptions.polygon;
      if (!options || !this.paths?.length) {
        return;
      }
      for (const path of this.paths) {
        const pathData = path.element?.getAttribute("d");
        if (pathData) {
          const path2d = new Path2D(pathData),
            matrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix(),
            finalPath = new Path2D(),
            transform = matrix.scale(this._scale);
          if (finalPath.addPath) {
            finalPath.addPath(path2d, transform);
            path.path2d = finalPath;
          } else {
            delete path.path2d;
          }
        } else {
          delete path.path2d;
        }
        if (path.path2d || !this.raw) {
          continue;
        }
        path.path2d = new Path2D();
        path.path2d.moveTo(this.raw[0].x, this.raw[0].y);
        this.raw.forEach((pos, i) => {
          if (i > 0) {
            path.path2d?.lineTo(pos.x, pos.y);
          }
        });
        path.path2d.closePath();
      }
    };
    this._downloadSvgPath = async (svgUrl, force) => {
      const options = this._container.actualOptions.polygon;
      if (!options) {
        return;
      }
      const url = svgUrl || options.url,
        forceDownload = force ?? false;
      if (!url || this.paths !== undefined && !forceDownload) {
        return this.raw;
      }
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`${external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.errorPrefix} occurred during polygon mask download`);
      }
      return this._parseSvgPath(await req.text(), force);
    };
    this._drawPoints = () => {
      if (!this.raw) {
        return;
      }
      for (const item of this.raw) {
        this._container.particles.addParticle({
          x: item.x,
          y: item.y
        });
      }
    };
    this._getEquidistantPointByIndex = index => {
      const container = this._container,
        options = container.actualOptions,
        polygonMaskOptions = options.polygon;
      if (!polygonMaskOptions) {
        return;
      }
      if (!this.raw || !this.raw.length || !this.paths?.length) {
        throw new Error(noPolygonDataLoaded);
      }
      let offset = 0,
        point;
      const totalLength = this.paths.reduce((tot, path) => tot + path.length, 0),
        distance = totalLength / options.particles.number.value;
      for (const path of this.paths) {
        const pathDistance = distance * index - offset;
        if (pathDistance <= path.length) {
          point = path.element.getPointAtLength(pathDistance);
          break;
        } else {
          offset += path.length;
        }
      }
      const scale = this._scale;
      return {
        x: (point?.x ?? 0) * scale + (this.offset?.x ?? 0),
        y: (point?.y ?? 0) * scale + (this.offset?.y ?? 0)
      };
    };
    this._getPointByIndex = index => {
      if (!this.raw || !this.raw.length) {
        throw new Error(noPolygonDataLoaded);
      }
      const coords = this.raw[index % this.raw.length];
      return {
        x: coords.x,
        y: coords.y
      };
    };
    this._getRandomPoint = () => {
      if (!this.raw || !this.raw.length) {
        throw new Error(noPolygonDataLoaded);
      }
      const coords = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(this.raw);
      return {
        x: coords.x,
        y: coords.y
      };
    };
    this._getRandomPointByLength = () => {
      const container = this._container,
        options = container.actualOptions.polygon;
      if (!options) {
        return;
      }
      if (!this.raw || !this.raw.length || !this.paths?.length) {
        throw new Error(noPolygonDataLoaded);
      }
      const path = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(this.paths),
        distance = Math.floor((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * path.length) + 1,
        point = path.element.getPointAtLength(distance),
        scale = this._scale;
      return {
        x: point.x * scale + (this.offset?.x || 0),
        y: point.y * scale + (this.offset?.y || 0)
      };
    };
    this._initRawData = async force => {
      const options = this._container.actualOptions.polygon;
      if (!options) {
        return;
      }
      if (options.url) {
        this.raw = await this._downloadSvgPath(options.url, force);
      } else if (options.data) {
        const data = options.data;
        let svg;
        if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isString)(data)) {
          svg = data;
        } else {
          const getPath = p => `<path d="${p}" />`,
            path = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isArray)(data.path) ? data.path.map(getPath).join("") : getPath(data.path);
          const namespaces = 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
          svg = `<svg ${namespaces} width="${data.size.width}" height="${data.size.height}">${path}</svg>`;
        }
        this.raw = this._parseSvgPath(svg, force);
      }
      this._createPath2D();
      this._engine.dispatchEvent("polygonMaskLoaded", {
        container: this._container
      });
    };
    this._parseSvgPath = (xml, force) => {
      const forceDownload = force ?? false;
      if (this.paths !== undefined && !forceDownload) {
        return this.raw;
      }
      const container = this._container,
        options = container.actualOptions.polygon;
      if (!options) {
        return;
      }
      const parser = new DOMParser(),
        doc = parser.parseFromString(xml, "image/svg+xml"),
        svg = doc.getElementsByTagName("svg")[0];
      let svgPaths = svg.getElementsByTagName("path");
      if (!svgPaths.length) {
        svgPaths = doc.getElementsByTagName("path");
      }
      this.paths = [];
      for (let i = 0; i < svgPaths.length; i++) {
        const path = svgPaths.item(i);
        if (path) {
          this.paths.push({
            element: path,
            length: path.getTotalLength()
          });
        }
      }
      const scale = this._scale;
      this.dimension.width = parseFloat(svg.getAttribute("width") ?? "0") * scale;
      this.dimension.height = parseFloat(svg.getAttribute("height") ?? "0") * scale;
      const position = options.position ?? {
          x: 50,
          y: 50
        },
        canvasSize = container.canvas.size;
      this.offset = {
        x: canvasSize.width * position.x / 100 - this.dimension.width / 2,
        y: canvasSize.height * position.y / 100 - this.dimension.height / 2
      };
      return parsePaths(this.paths, scale, this.offset);
    };
    this._polygonBounce = (particle, _delta, direction) => {
      const options = this._container.actualOptions.polygon;
      if (!this.raw || !options?.enable || direction !== "top") {
        return false;
      }
      if (options.type === "inside" || options.type === "outside") {
        let closest, dx, dy;
        const pos = particle.getPosition(),
          radius = particle.getRadius();
        for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
          const pi = this.raw[i],
            pj = this.raw[j];
          closest = calcClosestPtOnSegment(pi, pj, pos);
          const dist = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(pos, closest);
          [dx, dy] = [dist.dx, dist.dy];
          if (dist.distance < radius) {
            segmentBounce(pi, pj, particle.velocity);
            return true;
          }
        }
        if (closest && dx !== undefined && dy !== undefined && !this._checkInsidePolygon(pos)) {
          const factor = {
              x: 1,
              y: 1
            },
            diameter = radius * 2;
          if (pos.x >= closest.x) {
            factor.x = -1;
          }
          if (pos.y >= closest.y) {
            factor.y = -1;
          }
          particle.position.x = closest.x + diameter * factor.x;
          particle.position.y = closest.y + diameter * factor.y;
          particle.velocity.mult(-1);
          return true;
        }
      } else if (options.type === "inline" && particle.initialPosition) {
        const dist = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(particle.initialPosition, particle.getPosition()),
          {
            velocity
          } = particle;
        if (dist > this._moveRadius) {
          velocity.x = velocity.y / 2 - velocity.x;
          velocity.y = velocity.x / 2 - velocity.y;
          return true;
        }
      }
      return false;
    };
    this._randomPoint = () => {
      const container = this._container,
        options = container.actualOptions.polygon;
      if (!options) {
        return;
      }
      let position;
      if (options.type === "inline") {
        switch (options.inline.arrangement) {
          case "random-point":
            position = this._getRandomPoint();
            break;
          case "random-length":
            position = this._getRandomPointByLength();
            break;
          case "equidistant":
            position = this._getEquidistantPointByIndex(container.particles.count);
            break;
          case "one-per-point":
          case "per-point":
          default:
            position = this._getPointByIndex(container.particles.count);
        }
      } else {
        const canvasSize = container.canvas.size;
        position = {
          x: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * canvasSize.width,
          y: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * canvasSize.height
        };
      }
      if (this._checkInsidePolygon(position)) {
        return position;
      } else {
        return this._randomPoint();
      }
    };
    this._container = container;
    this._engine = engine;
    this.dimension = {
      height: 0,
      width: 0
    };
    this._moveRadius = 0;
    this._scale = 1;
  }
  clickPositionValid(position) {
    const options = this._container.actualOptions.polygon;
    return !!options?.enable && options.type !== "none" && options.type !== "inline" && this._checkInsidePolygon(position);
  }
  draw(context) {
    if (!this.paths?.length) {
      return;
    }
    const options = this._container.actualOptions.polygon;
    if (!options?.enable) {
      return;
    }
    const polygonDraw = options.draw;
    if (!polygonDraw.enable) {
      return;
    }
    const rawData = this.raw;
    for (const path of this.paths) {
      const path2d = path.path2d;
      if (!context) {
        continue;
      }
      if (path2d && this.offset) {
        drawPolygonMaskPath(context, path2d, polygonDraw.stroke, this.offset);
      } else if (rawData) {
        drawPolygonMask(context, rawData, polygonDraw.stroke);
      }
    }
  }
  async init() {
    const container = this._container,
      polygonMaskOptions = container.actualOptions.polygon,
      pxRatio = container.retina.pixelRatio;
    if (!polygonMaskOptions) {
      return;
    }
    this._moveRadius = polygonMaskOptions.move.radius * pxRatio;
    this._scale = polygonMaskOptions.scale * pxRatio;
    if (polygonMaskOptions.enable) {
      await this._initRawData();
    }
  }
  particleBounce(particle, delta, direction) {
    return this._polygonBounce(particle, delta, direction);
  }
  particlePosition(position) {
    const options = this._container.actualOptions.polygon;
    if (!(options?.enable && (this.raw?.length ?? 0) > 0)) {
      return;
    }
    return (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, position ? position : this._randomPoint());
  }
  particlesInitialization() {
    const options = this._container.actualOptions.polygon;
    if (options?.enable && options.type === "inline" && (options.inline.arrangement === "one-per-point" || options.inline.arrangement === "per-point")) {
      this._drawPoints();
      return true;
    }
    return false;
  }
  resize() {
    const container = this._container,
      options = container.actualOptions.polygon;
    if (!(options?.enable && options.type !== "none")) {
      return;
    }
    if (this.redrawTimeout) {
      clearTimeout(this.redrawTimeout);
    }
    this.redrawTimeout = window.setTimeout(async () => {
      await this._initRawData(true);
      await container.particles.redraw();
    }, 250);
  }
  stop() {
    delete this.raw;
    delete this.paths;
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js



class PolygonMaskPlugin {
  constructor(engine) {
    this.id = "polygonMask";
    this._engine = engine;
  }
  getPlugin(container) {
    return new PolygonMaskInstance(container, this._engine);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }
    let polygonOptions = options.polygon;
    if (polygonOptions?.load === undefined) {
      options.polygon = polygonOptions = new PolygonMask();
    }
    polygonOptions.load(source?.polygon);
  }
  needsPlugin(options) {
    return options?.polygon?.enable ?? (options?.polygon?.type !== undefined && options.polygon.type !== "none");
  }
}
async function loadPolygonMaskPlugin(engine, refresh = true) {
  await engine.addPlugin(new PolygonMaskPlugin(engine), refresh);
}



})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});