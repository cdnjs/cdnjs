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
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 442:
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
  AnimatableColor: () => (/* reexport */ AnimatableColor),
  AnimationOptions: () => (/* reexport */ AnimationOptions),
  AnimationValueWithRandom: () => (/* reexport */ AnimationValueWithRandom),
  Background: () => (/* reexport */ Background),
  BackgroundMask: () => (/* reexport */ BackgroundMask),
  BackgroundMaskCover: () => (/* reexport */ BackgroundMaskCover),
  Circle: () => (/* reexport */ Circle),
  ClickEvent: () => (/* reexport */ ClickEvent),
  Collisions: () => (/* reexport */ Collisions),
  CollisionsAbsorb: () => (/* reexport */ CollisionsAbsorb),
  CollisionsOverlap: () => (/* reexport */ CollisionsOverlap),
  ColorAnimation: () => (/* reexport */ ColorAnimation),
  DivEvent: () => (/* reexport */ DivEvent),
  Events: () => (/* reexport */ Events),
  ExternalInteractorBase: () => (/* reexport */ ExternalInteractorBase),
  FullScreen: () => (/* reexport */ FullScreen),
  HoverEvent: () => (/* reexport */ HoverEvent),
  HslAnimation: () => (/* reexport */ HslAnimation),
  HslColorManager: () => (/* reexport */ HslColorManager),
  Interactivity: () => (/* reexport */ Interactivity),
  ManualParticle: () => (/* reexport */ ManualParticle),
  Modes: () => (/* reexport */ Modes),
  Move: () => (/* reexport */ Move),
  MoveAngle: () => (/* reexport */ MoveAngle),
  MoveAttract: () => (/* reexport */ MoveAttract),
  MoveCenter: () => (/* reexport */ MoveCenter),
  MoveGravity: () => (/* reexport */ MoveGravity),
  MovePath: () => (/* reexport */ MovePath),
  MoveTrail: () => (/* reexport */ MoveTrail),
  Opacity: () => (/* reexport */ Opacity),
  OpacityAnimation: () => (/* reexport */ OpacityAnimation),
  Options: () => (/* reexport */ Options),
  OptionsColor: () => (/* reexport */ OptionsColor),
  OutModes: () => (/* reexport */ OutModes),
  Parallax: () => (/* reexport */ Parallax),
  ParticlesBounce: () => (/* reexport */ ParticlesBounce),
  ParticlesBounceFactor: () => (/* reexport */ ParticlesBounceFactor),
  ParticlesDensity: () => (/* reexport */ ParticlesDensity),
  ParticlesInteractorBase: () => (/* reexport */ ParticlesInteractorBase),
  ParticlesNumber: () => (/* reexport */ ParticlesNumber),
  ParticlesOptions: () => (/* reexport */ ParticlesOptions),
  Point: () => (/* reexport */ Point),
  Range: () => (/* reexport */ Range),
  RangedAnimationOptions: () => (/* reexport */ RangedAnimationOptions),
  RangedAnimationValueWithRandom: () => (/* reexport */ RangedAnimationValueWithRandom),
  Rectangle: () => (/* reexport */ Rectangle),
  ResizeEvent: () => (/* reexport */ ResizeEvent),
  Responsive: () => (/* reexport */ Responsive),
  RgbColorManager: () => (/* reexport */ RgbColorManager),
  Shadow: () => (/* reexport */ Shadow),
  Shape: () => (/* reexport */ Shape),
  Size: () => (/* reexport */ Size),
  SizeAnimation: () => (/* reexport */ SizeAnimation),
  Spin: () => (/* reexport */ Spin),
  Stroke: () => (/* reexport */ Stroke),
  Theme: () => (/* reexport */ Theme),
  ThemeDefault: () => (/* reexport */ ThemeDefault),
  ValueWithRandom: () => (/* reexport */ ValueWithRandom),
  Vector: () => (/* reexport */ Vector),
  Vector3d: () => (/* reexport */ Vector3d),
  ZIndex: () => (/* reexport */ ZIndex),
  addColorManager: () => (/* reexport */ addColorManager),
  addEasing: () => (/* reexport */ addEasing),
  alterHsl: () => (/* reexport */ alterHsl),
  areBoundsInside: () => (/* reexport */ areBoundsInside),
  arrayRandomIndex: () => (/* reexport */ arrayRandomIndex),
  calcExactPositionOrRandomFromSize: () => (/* reexport */ calcExactPositionOrRandomFromSize),
  calcExactPositionOrRandomFromSizeRanged: () => (/* reexport */ calcExactPositionOrRandomFromSizeRanged),
  calcPositionFromSize: () => (/* reexport */ calcPositionFromSize),
  calcPositionOrRandomFromSize: () => (/* reexport */ calcPositionOrRandomFromSize),
  calcPositionOrRandomFromSizeRanged: () => (/* reexport */ calcPositionOrRandomFromSizeRanged),
  calculateBounds: () => (/* reexport */ calculateBounds),
  circleBounce: () => (/* reexport */ circleBounce),
  circleBounceDataFromParticle: () => (/* reexport */ circleBounceDataFromParticle),
  clamp: () => (/* reexport */ clamp),
  clear: () => (/* reexport */ clear),
  collisionVelocity: () => (/* reexport */ collisionVelocity),
  colorMix: () => (/* reexport */ colorMix),
  colorToHsl: () => (/* reexport */ colorToHsl),
  colorToRgb: () => (/* reexport */ colorToRgb),
  deepExtend: () => (/* reexport */ deepExtend),
  divMode: () => (/* reexport */ divMode),
  divModeExecute: () => (/* reexport */ divModeExecute),
  drawLine: () => (/* reexport */ drawLine),
  drawParticle: () => (/* reexport */ drawParticle),
  drawParticlePlugin: () => (/* reexport */ drawParticlePlugin),
  drawPlugin: () => (/* reexport */ drawPlugin),
  drawShape: () => (/* reexport */ drawShape),
  drawShapeAfterEffect: () => (/* reexport */ drawShapeAfterEffect),
  drawTriangle: () => (/* reexport */ drawTriangle),
  errorPrefix: () => (/* reexport */ errorPrefix),
  executeOnSingleOrMultiple: () => (/* reexport */ executeOnSingleOrMultiple),
  findItemFromSingleOrMultiple: () => (/* reexport */ findItemFromSingleOrMultiple),
  generatedAttribute: () => (/* reexport */ generatedAttribute),
  getDistance: () => (/* reexport */ getDistance),
  getDistances: () => (/* reexport */ getDistances),
  getEasing: () => (/* reexport */ getEasing),
  getHslAnimationFromHsl: () => (/* reexport */ getHslAnimationFromHsl),
  getHslFromAnimation: () => (/* reexport */ getHslFromAnimation),
  getLinkColor: () => (/* reexport */ getLinkColor),
  getLinkRandomColor: () => (/* reexport */ getLinkRandomColor),
  getLogger: () => (/* reexport */ getLogger),
  getParticleBaseVelocity: () => (/* reexport */ getParticleBaseVelocity),
  getParticleDirectionAngle: () => (/* reexport */ getParticleDirectionAngle),
  getPosition: () => (/* reexport */ getPosition),
  getRandom: () => (/* reexport */ getRandom),
  getRandomRgbColor: () => (/* reexport */ getRandomRgbColor),
  getRangeMax: () => (/* reexport */ getRangeMax),
  getRangeMin: () => (/* reexport */ getRangeMin),
  getRangeValue: () => (/* reexport */ getRangeValue),
  getSize: () => (/* reexport */ getSize),
  getStyleFromHsl: () => (/* reexport */ ColorUtils_getStyleFromHsl),
  getStyleFromRgb: () => (/* reexport */ getStyleFromRgb),
  getValue: () => (/* reexport */ getValue),
  hasMatchMedia: () => (/* reexport */ hasMatchMedia),
  hslToRgb: () => (/* reexport */ hslToRgb),
  hslaToRgba: () => (/* reexport */ hslaToRgba),
  initParticleNumericAnimationValue: () => (/* reexport */ initParticleNumericAnimationValue),
  isArray: () => (/* reexport */ isArray),
  isBoolean: () => (/* reexport */ isBoolean),
  isDivModeEnabled: () => (/* reexport */ isDivModeEnabled),
  isFunction: () => (/* reexport */ isFunction),
  isInArray: () => (/* reexport */ isInArray),
  isNumber: () => (/* reexport */ isNumber),
  isObject: () => (/* reexport */ isObject),
  isPointInside: () => (/* reexport */ isPointInside),
  isSsr: () => (/* reexport */ isSsr),
  isString: () => (/* reexport */ isString),
  itemFromArray: () => (/* reexport */ itemFromArray),
  itemFromSingleOrMultiple: () => (/* reexport */ itemFromSingleOrMultiple),
  loadAll: () => (/* reexport */ loadAll),
  loadFont: () => (/* reexport */ loadFont),
  loadOptions: () => (/* reexport */ loadOptions),
  loadParticlesOptions: () => (/* reexport */ loadParticlesOptions),
  mix: () => (/* reexport */ mix),
  mouseDownEvent: () => (/* reexport */ mouseDownEvent),
  mouseLeaveEvent: () => (/* reexport */ mouseLeaveEvent),
  mouseMoveEvent: () => (/* reexport */ mouseMoveEvent),
  mouseOutEvent: () => (/* reexport */ mouseOutEvent),
  mouseUpEvent: () => (/* reexport */ mouseUpEvent),
  paintBase: () => (/* reexport */ paintBase),
  paintImage: () => (/* reexport */ paintImage),
  parseAlpha: () => (/* reexport */ parseAlpha),
  randomInRange: () => (/* reexport */ randomInRange),
  rangeColorToHsl: () => (/* reexport */ rangeColorToHsl),
  rangeColorToRgb: () => (/* reexport */ rangeColorToRgb),
  rectBounce: () => (/* reexport */ rectBounce),
  resizeEvent: () => (/* reexport */ resizeEvent),
  rgbToHsl: () => (/* reexport */ rgbToHsl),
  safeMatchMedia: () => (/* reexport */ safeMatchMedia),
  safeMutationObserver: () => (/* reexport */ safeMutationObserver),
  setLogger: () => (/* reexport */ setLogger),
  setRandom: () => (/* reexport */ setRandom),
  setRangeValue: () => (/* reexport */ setRangeValue),
  singleDivModeExecute: () => (/* reexport */ singleDivModeExecute),
  stringToAlpha: () => (/* reexport */ stringToAlpha),
  stringToRgb: () => (/* reexport */ stringToRgb),
  touchCancelEvent: () => (/* reexport */ touchCancelEvent),
  touchEndEvent: () => (/* reexport */ touchEndEvent),
  touchMoveEvent: () => (/* reexport */ touchMoveEvent),
  touchStartEvent: () => (/* reexport */ touchStartEvent),
  tsParticles: () => (/* reexport */ tsParticles),
  visibilityChangeEvent: () => (/* reexport */ visibilityChangeEvent)
});

;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Constants.js
const generatedAttribute = "generated";
const mouseDownEvent = "pointerdown";
const mouseUpEvent = "pointerup";
const mouseLeaveEvent = "pointerleave";
const mouseOutEvent = "pointerout";
const mouseMoveEvent = "pointermove";
const touchStartEvent = "touchstart";
const touchEndEvent = "touchend";
const touchMoveEvent = "touchmove";
const touchCancelEvent = "touchcancel";
const resizeEvent = "resize";
const visibilityChangeEvent = "visibilitychange";
const errorPrefix = "tsParticles - Error";
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Vector3d.js


class Vector3d {
  constructor(xOrCoords, y, z) {
    this._updateFromAngle = (angle, length) => {
      this.x = Math.cos(angle) * length;
      this.y = Math.sin(angle) * length;
    };
    if (!isNumber(xOrCoords) && xOrCoords) {
      this.x = xOrCoords.x;
      this.y = xOrCoords.y;
      const coords3d = xOrCoords;
      this.z = coords3d.z ? coords3d.z : 0;
    } else if (xOrCoords !== undefined && y !== undefined) {
      this.x = xOrCoords;
      this.y = y;
      this.z = z ?? 0;
    } else {
      throw new Error(`${errorPrefix} Vector3d not initialized correctly`);
    }
  }
  static get origin() {
    return Vector3d.create(0, 0, 0);
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }
  set angle(angle) {
    this._updateFromAngle(angle, this.length);
  }
  get length() {
    return Math.sqrt(this.getLengthSq());
  }
  set length(length) {
    this._updateFromAngle(this.angle, length);
  }
  static clone(source) {
    return Vector3d.create(source.x, source.y, source.z);
  }
  static create(x, y, z) {
    return new Vector3d(x, y, z);
  }
  add(v) {
    return Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z);
  }
  addTo(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
  }
  copy() {
    return Vector3d.clone(this);
  }
  distanceTo(v) {
    return this.sub(v).length;
  }
  distanceToSq(v) {
    return this.sub(v).getLengthSq();
  }
  div(n) {
    return Vector3d.create(this.x / n, this.y / n, this.z / n);
  }
  divTo(n) {
    this.x /= n;
    this.y /= n;
    this.z /= n;
  }
  getLengthSq() {
    return this.x ** 2 + this.y ** 2;
  }
  mult(n) {
    return Vector3d.create(this.x * n, this.y * n, this.z * n);
  }
  multTo(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
  }
  normalize() {
    const length = this.length;
    if (length != 0) {
      this.multTo(1.0 / length);
    }
  }
  rotate(angle) {
    return Vector3d.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle), 0);
  }
  setTo(c) {
    this.x = c.x;
    this.y = c.y;
    const v3d = c;
    this.z = v3d.z ? v3d.z : 0;
  }
  sub(v) {
    return Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z);
  }
  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Vector.js

class Vector extends Vector3d {
  constructor(xOrCoords, y) {
    super(xOrCoords, y, 0);
  }
  static get origin() {
    return Vector.create(0, 0);
  }
  static clone(source) {
    return Vector.create(source.x, source.y);
  }
  static create(x, y) {
    return new Vector(x, y);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/Utils.js


const _logger = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  verbose: console.log,
  warning: console.warn
};
function setLogger(logger) {
  _logger.debug = logger.debug || _logger.debug;
  _logger.error = logger.error || _logger.error;
  _logger.info = logger.info || _logger.info;
  _logger.log = logger.log || _logger.log;
  _logger.verbose = logger.verbose || _logger.verbose;
  _logger.warning = logger.warning || _logger.warning;
}
function getLogger() {
  return _logger;
}
function rectSideBounce(data) {
  const res = {
      bounced: false
    },
    {
      pSide,
      pOtherSide,
      rectSide,
      rectOtherSide,
      velocity,
      factor
    } = data;
  if (pOtherSide.min < rectOtherSide.min || pOtherSide.min > rectOtherSide.max || pOtherSide.max < rectOtherSide.min || pOtherSide.max > rectOtherSide.max) {
    return res;
  }
  if (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0 || pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0) {
    res.velocity = velocity * -factor;
    res.bounced = true;
  }
  return res;
}
function checkSelector(element, selectors) {
  const res = executeOnSingleOrMultiple(selectors, selector => {
    return element.matches(selector);
  });
  return isArray(res) ? res.some(t => t) : res;
}
function isSsr() {
  return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}
function hasMatchMedia() {
  return !isSsr() && typeof matchMedia !== "undefined";
}
function safeMatchMedia(query) {
  if (!hasMatchMedia()) {
    return;
  }
  return matchMedia(query);
}
function safeMutationObserver(callback) {
  if (isSsr() || typeof MutationObserver === "undefined") {
    return;
  }
  return new MutationObserver(callback);
}
function isInArray(value, array) {
  return value === array || isArray(array) && array.indexOf(value) > -1;
}
async function loadFont(font, weight) {
  try {
    await document.fonts.load(`${weight ?? "400"} 36px '${font ?? "Verdana"}'`);
  } catch {}
}
function arrayRandomIndex(array) {
  return Math.floor(getRandom() * array.length);
}
function itemFromArray(array, index, useIndex = true) {
  return array[index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array)];
}
function isPointInside(point, size, offset, radius, direction) {
  return areBoundsInside(calculateBounds(point, radius ?? 0), size, offset, direction);
}
function areBoundsInside(bounds, size, offset, direction) {
  let inside = true;
  if (!direction || direction === "bottom") {
    inside = bounds.top < size.height + offset.x;
  }
  if (inside && (!direction || direction === "left")) {
    inside = bounds.right > offset.x;
  }
  if (inside && (!direction || direction === "right")) {
    inside = bounds.left < size.width + offset.y;
  }
  if (inside && (!direction || direction === "top")) {
    inside = bounds.bottom > offset.y;
  }
  return inside;
}
function calculateBounds(point, radius) {
  return {
    bottom: point.y + radius,
    left: point.x - radius,
    right: point.x + radius,
    top: point.y - radius
  };
}
function deepExtend(destination, ...sources) {
  for (const source of sources) {
    if (source === undefined || source === null) {
      continue;
    }
    if (!isObject(source)) {
      destination = source;
      continue;
    }
    const sourceIsArray = Array.isArray(source);
    if (sourceIsArray && (isObject(destination) || !destination || !Array.isArray(destination))) {
      destination = [];
    } else if (!sourceIsArray && (isObject(destination) || !destination || Array.isArray(destination))) {
      destination = {};
    }
    for (const key in source) {
      if (key === "__proto__") {
        continue;
      }
      const sourceDict = source,
        value = sourceDict[key],
        destDict = destination;
      destDict[key] = isObject(value) && Array.isArray(value) ? value.map(v => deepExtend(destDict[key], v)) : deepExtend(destDict[key], value);
    }
  }
  return destination;
}
function isDivModeEnabled(mode, divs) {
  return !!findItemFromSingleOrMultiple(divs, t => t.enable && isInArray(mode, t.mode));
}
function divModeExecute(mode, divs, callback) {
  executeOnSingleOrMultiple(divs, div => {
    const divMode = div.mode,
      divEnabled = div.enable;
    if (divEnabled && isInArray(mode, divMode)) {
      singleDivModeExecute(div, callback);
    }
  });
}
function singleDivModeExecute(div, callback) {
  const selectors = div.selectors;
  executeOnSingleOrMultiple(selectors, selector => {
    callback(selector, div);
  });
}
function divMode(divs, element) {
  if (!element || !divs) {
    return;
  }
  return findItemFromSingleOrMultiple(divs, div => {
    return checkSelector(element, div.selectors);
  });
}
function circleBounceDataFromParticle(p) {
  return {
    position: p.getPosition(),
    radius: p.getRadius(),
    mass: p.getMass(),
    velocity: p.velocity,
    factor: Vector.create(getValue(p.options.bounce.horizontal), getValue(p.options.bounce.vertical))
  };
}
function circleBounce(p1, p2) {
  const {
      x: xVelocityDiff,
      y: yVelocityDiff
    } = p1.velocity.sub(p2.velocity),
    [pos1, pos2] = [p1.position, p2.position],
    {
      dx: xDist,
      dy: yDist
    } = getDistances(pos2, pos1);
  if (xVelocityDiff * xDist + yVelocityDiff * yDist < 0) {
    return;
  }
  const angle = -Math.atan2(yDist, xDist),
    m1 = p1.mass,
    m2 = p2.mass,
    u1 = p1.velocity.rotate(angle),
    u2 = p2.velocity.rotate(angle),
    v1 = collisionVelocity(u1, u2, m1, m2),
    v2 = collisionVelocity(u2, u1, m1, m2),
    vFinal1 = v1.rotate(-angle),
    vFinal2 = v2.rotate(-angle);
  p1.velocity.x = vFinal1.x * p1.factor.x;
  p1.velocity.y = vFinal1.y * p1.factor.y;
  p2.velocity.x = vFinal2.x * p2.factor.x;
  p2.velocity.y = vFinal2.y * p2.factor.y;
}
function rectBounce(particle, divBounds) {
  const pPos = particle.getPosition(),
    size = particle.getRadius(),
    bounds = calculateBounds(pPos, size),
    resH = rectSideBounce({
      pSide: {
        min: bounds.left,
        max: bounds.right
      },
      pOtherSide: {
        min: bounds.top,
        max: bounds.bottom
      },
      rectSide: {
        min: divBounds.left,
        max: divBounds.right
      },
      rectOtherSide: {
        min: divBounds.top,
        max: divBounds.bottom
      },
      velocity: particle.velocity.x,
      factor: getValue(particle.options.bounce.horizontal)
    });
  if (resH.bounced) {
    if (resH.velocity !== undefined) {
      particle.velocity.x = resH.velocity;
    }
    if (resH.position !== undefined) {
      particle.position.x = resH.position;
    }
  }
  const resV = rectSideBounce({
    pSide: {
      min: bounds.top,
      max: bounds.bottom
    },
    pOtherSide: {
      min: bounds.left,
      max: bounds.right
    },
    rectSide: {
      min: divBounds.top,
      max: divBounds.bottom
    },
    rectOtherSide: {
      min: divBounds.left,
      max: divBounds.right
    },
    velocity: particle.velocity.y,
    factor: getValue(particle.options.bounce.vertical)
  });
  if (resV.bounced) {
    if (resV.velocity !== undefined) {
      particle.velocity.y = resV.velocity;
    }
    if (resV.position !== undefined) {
      particle.position.y = resV.position;
    }
  }
}
function executeOnSingleOrMultiple(obj, callback) {
  return isArray(obj) ? obj.map((item, index) => callback(item, index)) : callback(obj, 0);
}
function itemFromSingleOrMultiple(obj, index, useIndex) {
  return isArray(obj) ? itemFromArray(obj, index, useIndex) : obj;
}
function findItemFromSingleOrMultiple(obj, callback) {
  return isArray(obj) ? obj.find((t, index) => callback(t, index)) : callback(obj, 0) ? obj : undefined;
}
function initParticleNumericAnimationValue(options, pxRatio) {
  const valueRange = options.value,
    animationOptions = options.animation,
    res = {
      delayTime: getRangeValue(animationOptions.delay) * 1000,
      enable: animationOptions.enable,
      value: getRangeValue(options.value) * pxRatio,
      max: getRangeMax(valueRange) * pxRatio,
      min: getRangeMin(valueRange) * pxRatio,
      loops: 0,
      maxLoops: getRangeValue(animationOptions.count),
      time: 0
    };
  if (animationOptions.enable) {
    res.decay = 1 - getRangeValue(animationOptions.decay);
    switch (animationOptions.mode) {
      case "increase":
        res.status = "increasing";
        break;
      case "decrease":
        res.status = "decreasing";
        break;
      case "random":
        res.status = getRandom() >= 0.5 ? "increasing" : "decreasing";
        break;
    }
    const autoStatus = animationOptions.mode === "auto";
    switch (animationOptions.startValue) {
      case "min":
        res.value = res.min;
        if (autoStatus) {
          res.status = "increasing";
        }
        break;
      case "max":
        res.value = res.max;
        if (autoStatus) {
          res.status = "decreasing";
        }
        break;
      case "random":
      default:
        res.value = randomInRange(res);
        if (autoStatus) {
          res.status = getRandom() >= 0.5 ? "increasing" : "decreasing";
        }
        break;
    }
  }
  res.initialValue = res.value;
  return res;
}
function getPositionOrSize(positionOrSize, canvasSize) {
  const isPercent = positionOrSize.mode === "percent";
  if (!isPercent) {
    const {
      mode: _,
      ...rest
    } = positionOrSize;
    return rest;
  }
  const isPosition = ("x" in positionOrSize);
  if (isPosition) {
    return {
      x: positionOrSize.x / 100 * canvasSize.width,
      y: positionOrSize.y / 100 * canvasSize.height
    };
  } else {
    return {
      width: positionOrSize.width / 100 * canvasSize.width,
      height: positionOrSize.height / 100 * canvasSize.height
    };
  }
}
function getPosition(position, canvasSize) {
  return getPositionOrSize(position, canvasSize);
}
function getSize(size, canvasSize) {
  return getPositionOrSize(size, canvasSize);
}
function isBoolean(arg) {
  return typeof arg === "boolean";
}
function isString(arg) {
  return typeof arg === "string";
}
function isNumber(arg) {
  return typeof arg === "number";
}
function isFunction(arg) {
  return typeof arg === "function";
}
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
function isArray(arg) {
  return Array.isArray(arg);
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/NumberUtils.js


let _random = Math.random;
const easings = new Map();
function addEasing(name, easing) {
  if (easings.get(name)) {
    return;
  }
  easings.set(name, easing);
}
function getEasing(name) {
  return easings.get(name) || (value => value);
}
function setRandom(rnd = Math.random) {
  _random = rnd;
}
function getRandom() {
  return clamp(_random(), 0, 1 - 1e-16);
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function mix(comp1, comp2, weight1, weight2) {
  return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
function randomInRange(r) {
  const max = getRangeMax(r);
  let min = getRangeMin(r);
  if (max === min) {
    min = 0;
  }
  return getRandom() * (max - min) + min;
}
function getRangeValue(value) {
  return isNumber(value) ? value : randomInRange(value);
}
function getRangeMin(value) {
  return isNumber(value) ? value : value.min;
}
function getRangeMax(value) {
  return isNumber(value) ? value : value.max;
}
function setRangeValue(source, value) {
  if (source === value || value === undefined && isNumber(source)) {
    return source;
  }
  const min = getRangeMin(source),
    max = getRangeMax(source);
  return value !== undefined ? {
    min: Math.min(min, value),
    max: Math.max(max, value)
  } : setRangeValue(min, max);
}
function getValue(options) {
  const random = options.random,
    {
      enable,
      minimumValue
    } = isBoolean(random) ? {
      enable: random,
      minimumValue: 0
    } : random;
  return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
}
function getDistances(pointA, pointB) {
  const dx = pointA.x - pointB.x,
    dy = pointA.y - pointB.y;
  return {
    dx: dx,
    dy: dy,
    distance: Math.sqrt(dx ** 2 + dy ** 2)
  };
}
function getDistance(pointA, pointB) {
  return getDistances(pointA, pointB).distance;
}
function getParticleDirectionAngle(direction, position, center) {
  if (isNumber(direction)) {
    return direction * Math.PI / 180;
  }
  switch (direction) {
    case "top":
      return -Math.PI / 2;
    case "top-right":
      return -Math.PI / 4;
    case "right":
      return 0;
    case "bottom-right":
      return Math.PI / 4;
    case "bottom":
      return Math.PI / 2;
    case "bottom-left":
      return 3 * Math.PI / 4;
    case "left":
      return Math.PI;
    case "top-left":
      return -3 * Math.PI / 4;
    case "inside":
      return Math.atan2(center.y - position.y, center.x - position.x);
    case "outside":
      return Math.atan2(position.y - center.y, position.x - center.x);
    default:
      return getRandom() * Math.PI * 2;
  }
}
function getParticleBaseVelocity(direction) {
  const baseVelocity = Vector.origin;
  baseVelocity.length = 1;
  baseVelocity.angle = direction;
  return baseVelocity;
}
function collisionVelocity(v1, v2, m1, m2) {
  return Vector.create(v1.x * (m1 - m2) / (m1 + m2) + v2.x * 2 * m2 / (m1 + m2), v1.y);
}
function calcPositionFromSize(data) {
  return data.position && data.position.x !== undefined && data.position.y !== undefined ? {
    x: data.position.x * data.size.width / 100,
    y: data.position.y * data.size.height / 100
  } : undefined;
}
function calcPositionOrRandomFromSize(data) {
  return {
    x: (data.position?.x ?? getRandom() * 100) * data.size.width / 100,
    y: (data.position?.y ?? getRandom() * 100) * data.size.height / 100
  };
}
function calcPositionOrRandomFromSizeRanged(data) {
  const position = {
    x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,
    y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined
  };
  return calcPositionOrRandomFromSize({
    size: data.size,
    position
  });
}
function calcExactPositionOrRandomFromSize(data) {
  return {
    x: data.position?.x ?? getRandom() * data.size.width,
    y: data.position?.y ?? getRandom() * data.size.height
  };
}
function calcExactPositionOrRandomFromSizeRanged(data) {
  const position = {
    x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,
    y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined
  };
  return calcExactPositionOrRandomFromSize({
    size: data.size,
    position
  });
}
function parseAlpha(input) {
  return input ? input.endsWith("%") ? parseFloat(input) / 100 : parseFloat(input) : 1;
}
;// CONCATENATED MODULE: ../../shapes/arrow/dist/esm/ArrowDrawer.js

class ArrowDrawer {
  draw(context, particle, radius) {
    const width = radius * 2,
      heightFactor = particle.heightFactor ?? 0.5,
      headWidthFactor = particle.headWidthFactor ?? 0.2,
      bodyHeightFactor = particle.bodyHeightFactor ?? 0.5,
      height = width * heightFactor,
      headWidth = width * headWidthFactor,
      bodyHeight = height * bodyHeightFactor;
    context.moveTo(-width / 2, 0);
    context.lineTo(-width / 2, -bodyHeight / 2);
    context.lineTo(width / 2 - headWidth, -bodyHeight / 2);
    context.lineTo(width / 2 - headWidth, -height / 2);
    context.lineTo(width / 2 + headWidth, 0);
    context.lineTo(width / 2 - headWidth, height / 2);
    context.lineTo(width / 2 - headWidth, bodyHeight / 2);
    context.lineTo(-width / 2, bodyHeight / 2);
    context.lineTo(-width / 2, 0);
  }
  particleInit(container, particle) {
    const shapeData = particle.shapeData;
    particle.heightFactor = getRangeValue(shapeData?.heightFactor ?? 0.5);
    particle.headWidthFactor = getRangeValue(shapeData?.headWidthFactor ?? 0.2);
    particle.bodyHeightFactor = getRangeValue(shapeData?.bodyHeightFactor ?? 0.5);
  }
}
;// CONCATENATED MODULE: ../../shapes/arrow/dist/esm/index.js

async function loadArrowShape(engine, refresh = true) {
  await engine.addShape("arrow", new ArrowDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../shapes/bubble/dist/esm/BubbleDrawer.js
class BubbleDrawer {
  afterEffect(context, particle, radius) {
    context.beginPath();
    context.arc(radius / 3, -radius / 3, radius / 3, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = "#fff9";
    context.fill();
  }
  draw(context, particle, radius) {
    context.arc(0, 0, radius, 0, Math.PI * 2, false);
  }
}
;// CONCATENATED MODULE: ../../shapes/bubble/dist/esm/index.js

async function loadBubbleShape(engine, refresh = true) {
  await engine.addShape("bubble", new BubbleDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../plugins/canvasMask/dist/esm/Options/Classes/CanvasMaskOverride.js
class CanvasMaskOverride {
  constructor() {
    this.color = true;
    this.opacity = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== undefined) {
      this.color = data.color;
    }
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/canvasMask/dist/esm/Options/Classes/CanvasMaskPixels.js

class CanvasMaskPixels {
  constructor() {
    this.filter = pixel => pixel.a > 0;
    this.offset = 4;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.filter !== undefined) {
      if (isString(data.filter)) {
        if (Object.hasOwn(window, data.filter)) {
          const filter = window[data.filter];
          if (isFunction(filter)) {
            this.filter = filter;
          }
        }
      } else {
        this.filter = data.filter;
      }
    }
    if (data.offset !== undefined) {
      this.offset = data.offset;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/canvasMask/dist/esm/Options/Classes/ImageMask.js
class ImageMask {
  constructor() {
    this.src = "";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.src !== undefined) {
      this.src = data.src;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/canvasMask/dist/esm/Options/Classes/FontTextMask.js
class FontTextMask {
  constructor() {
    this.family = "sans-serif";
    this.size = 100;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.family !== undefined) {
      this.family = data.family;
    }
    if (data.size !== undefined) {
      this.size = data.size;
    }
    if (data.style !== undefined) {
      this.style = data.style;
    }
    if (data.variant !== undefined) {
      this.variant = data.variant;
    }
    if (data.weight !== undefined) {
      this.weight = data.weight;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/canvasMask/dist/esm/Options/Classes/TextMaskLine.js
class TextMaskLine {
  constructor() {
    this.separator = "\n";
    this.spacing = 10;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.separator !== undefined) {
      this.separator = data.separator;
    }
    if (data.spacing !== undefined) {
      this.spacing = data.spacing;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/canvasMask/dist/esm/Options/Classes/TextMask.js


class TextMask {
  constructor() {
    this.color = "#000000";
    this.font = new FontTextMask();
    this.lines = new TextMaskLine();
    this.text = "";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== undefined) {
      this.color = data.color;
    }
    this.font.load(data.font);
    this.lines.load(data.lines);
    if (data.text !== undefined) {
      this.text = data.text;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/canvasMask/dist/esm/Options/Classes/CanvasMask.js




class CanvasMask {
  constructor() {
    this.enable = false;
    this.override = new CanvasMaskOverride();
    this.pixels = new CanvasMaskPixels();
    this.position = {
      x: 50,
      y: 50
    };
    this.scale = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.element !== undefined && data.element instanceof HTMLCanvasElement) {
      this.element = data.element;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.image) {
      if (!this.image) {
        this.image = new ImageMask();
      }
      this.image.load(data.image);
    }
    this.pixels.load(data.pixels);
    if (data.position) {
      this.position = {
        x: data.position.x ?? this.position.x,
        y: data.position.y ?? this.position.y
      };
    }
    this.override.load(data.override);
    if (data.scale !== undefined) {
      this.scale = data.scale;
    }
    if (data.selector !== undefined) {
      this.selector = data.selector;
    }
    if (data.text) {
      if (!this.text) {
        this.text = new TextMask();
      }
      this.text.load(data.text);
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/canvasMask/dist/esm/utils.js

function shuffle(array) {
  for (let currentIndex = array.length - 1; currentIndex >= 0; currentIndex--) {
    const randomIndex = Math.floor(getRandom() * currentIndex);
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
function addParticlesFromCanvasPixels(container, data, position, scale, override, filter) {
  const {
      height,
      width
    } = data,
    numPixels = height * width,
    indexArray = shuffle(range(numPixels)),
    maxParticles = Math.min(numPixels, container.actualOptions.particles.number.value),
    canvasSize = container.canvas.size;
  let selectedPixels = 0;
  const positionOffset = {
    x: canvasSize.width * position.x / 100 - width * scale / 2,
    y: canvasSize.height * position.y / 100 - height * scale / 2
  };
  while (selectedPixels < maxParticles && indexArray.length) {
    const nextIndex = indexArray.pop() || 0,
      pixelPos = {
        x: nextIndex % width,
        y: Math.floor(nextIndex / width)
      },
      pixel = data.pixels[pixelPos.y][pixelPos.x],
      shouldCreateParticle = filter(pixel);
    if (shouldCreateParticle) {
      const pos = {
        x: pixelPos.x * scale + positionOffset.x,
        y: pixelPos.y * scale + positionOffset.y
      };
      const pOptions = {};
      if (override.color) {
        pOptions.color = {
          value: pixel
        };
      }
      if (override.opacity) {
        pOptions.opacity = {
          value: pixel.a
        };
      }
      container.particles.addParticle(pos, pOptions);
      selectedPixels++;
    }
  }
}
function getCanvasImageData(ctx, size, offset, clear = true) {
  const imageData = ctx.getImageData(0, 0, size.width, size.height).data;
  if (clear) {
    ctx.clearRect(0, 0, size.width, size.height);
  }
  const pixels = [];
  for (let i = 0; i < imageData.length; i += offset) {
    const idx = i / offset,
      pos = {
        x: idx % size.width,
        y: Math.floor(idx / size.width)
      };
    if (!pixels[pos.y]) {
      pixels[pos.y] = [];
    }
    pixels[pos.y][pos.x] = {
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2],
      a: imageData[i + 3] / 255
    };
  }
  return {
    pixels,
    width: Math.min(...pixels.map(row => row.length)),
    height: pixels.length
  };
}
function getImageData(src, offset) {
  const image = new Image();
  image.crossOrigin = "Anonymous";
  const p = new Promise((resolve, reject) => {
    image.onerror = reject;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      if (!context) {
        return reject(new Error(`${errorPrefix} Could not get canvas context`));
      }
      context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
      resolve(getCanvasImageData(context, canvas, offset));
    };
  });
  image.src = src;
  return p;
}
function getTextData(textOptions, offset) {
  const canvas = document.createElement("canvas"),
    context = canvas.getContext("2d"),
    {
      font,
      text,
      lines: linesOptions,
      color
    } = textOptions;
  if (!text || !context) {
    return;
  }
  const lines = text.split(linesOptions.separator),
    fontSize = isNumber(font.size) ? `${font.size}px` : font.size,
    linesData = [];
  let maxWidth = 0,
    totalHeight = 0;
  for (const line of lines) {
    context.font = `${font.style || ""} ${font.variant || ""} ${font.weight || ""} ${fontSize} ${font.family}`;
    const measure = context.measureText(line),
      lineData = {
        measure,
        text: line,
        height: measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent,
        width: measure.width
      };
    maxWidth = Math.max(maxWidth || 0, lineData.width);
    totalHeight += lineData.height + linesOptions.spacing;
    linesData.push(lineData);
  }
  canvas.width = maxWidth;
  canvas.height = totalHeight;
  let currentHeight = 0;
  for (const line of linesData) {
    context.font = `${font.style || ""} ${font.variant || ""} ${font.weight || ""} ${fontSize} ${font.family}`;
    context.fillStyle = color;
    context.fillText(line.text, 0, currentHeight + line.measure.actualBoundingBoxAscent);
    currentHeight += line.height + linesOptions.spacing;
  }
  return getCanvasImageData(context, canvas, offset);
}
const range = n => [...Array(n).keys()];
;// CONCATENATED MODULE: ../../plugins/canvasMask/dist/esm/CanvasMaskInstance.js

class CanvasMaskInstance {
  constructor(container, engine) {
    this._container = container;
    this._engine = engine;
  }
  async init() {
    const container = this._container,
      options = container.actualOptions.canvasMask;
    if (!options?.enable) {
      return;
    }
    let pixelData = {
      pixels: [],
      height: 0,
      width: 0
    };
    const offset = options.pixels.offset;
    if (options.image) {
      const url = options.image.src;
      if (!url) {
        return;
      }
      pixelData = await getImageData(url, offset);
    } else if (options.text) {
      const textOptions = options.text;
      const data = getTextData(textOptions, offset);
      if (!data) {
        return;
      }
      pixelData = data;
    } else if (options.element || options.selector) {
      const canvas = options.element || options.selector && document.querySelector(options.selector);
      if (!canvas) {
        return;
      }
      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }
      pixelData = getCanvasImageData(context, canvas, offset);
    }
    addParticlesFromCanvasPixels(container, pixelData, options.position, options.scale, options.override, options.pixels.filter);
  }
}
;// CONCATENATED MODULE: ../../plugins/canvasMask/dist/esm/index.js


class CanvasMaskPlugin {
  constructor(engine) {
    this.id = "canvasMask";
    this._engine = engine;
  }
  getPlugin(container) {
    return new CanvasMaskInstance(container, this._engine);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }
    let canvasMaskOptions = options.canvasMask;
    if (canvasMaskOptions?.load === undefined) {
      options.canvasMask = canvasMaskOptions = new CanvasMask();
    }
    canvasMaskOptions.load(source?.canvasMask);
  }
  needsPlugin(options) {
    return options?.canvasMask?.enable ?? false;
  }
}
async function loadCanvasMaskPlugin(engine, refresh = true) {
  await engine.addPlugin(new CanvasMaskPlugin(engine), refresh);
}
;// CONCATENATED MODULE: ../../shapes/cards/dist/esm/Utils.js
function drawPath(ctx, radius, path) {
  if (!path.segments.length || !path.segments[0].values.length) {
    return;
  }
  ctx.moveTo(path.segments[0].values[0].x * radius, path.segments[0].values[0].y * radius);
  for (let i = 0; i < path.segments.length; i++) {
    const segment = path.segments[i];
    ctx.bezierCurveTo(segment.values[1].x * radius, segment.values[1].y * radius, segment.values[2].x * radius, segment.values[2].y * radius, segment.values[3].x * radius, segment.values[3].y * radius);
  }
  for (let i = path.segments.length - 1; i >= 0; i--) {
    const segment = path.segments[i];
    ctx.bezierCurveTo(-segment.values[2].x * radius, segment.values[2].y * radius, -segment.values[1].x * radius, segment.values[1].y * radius, -segment.values[0].x * radius, segment.values[0].y * radius);
  }
}
const n = 1.0 / 2;
const paths = {
  heart: {
    segments: [{
      values: [{
        x: 0,
        y: n
      }, {
        x: 0,
        y: n
      }, {
        x: n,
        y: 0
      }, {
        x: n,
        y: -n / 2
      }]
    }, {
      values: [{
        x: n,
        y: -n / 2
      }, {
        x: n,
        y: -n / 2
      }, {
        x: n,
        y: -n
      }, {
        x: n / 2,
        y: -n
      }]
    }, {
      values: [{
        x: n / 2,
        y: -n
      }, {
        x: n / 2,
        y: -n
      }, {
        x: 0,
        y: -n
      }, {
        x: 0,
        y: -n / 2
      }]
    }]
  },
  diamond: {
    segments: [{
      values: [{
        x: 0,
        y: n
      }, {
        x: 0,
        y: n
      }, {
        x: 3 * n / 4,
        y: 0
      }, {
        x: 3 * n / 4,
        y: 0
      }]
    }, {
      values: [{
        x: 3 * n / 4,
        y: 0
      }, {
        x: 3 * n / 4,
        y: 0
      }, {
        x: 0,
        y: -n
      }, {
        x: 0,
        y: -n
      }]
    }]
  },
  club: {
    segments: [{
      values: [{
        x: 0,
        y: -n
      }, {
        x: 0,
        y: -n
      }, {
        x: n / 2,
        y: -n
      }, {
        x: n / 2,
        y: -n / 2
      }]
    }, {
      values: [{
        x: n / 2,
        y: -n / 2
      }, {
        x: n / 2,
        y: -n / 2
      }, {
        x: n,
        y: -n / 2
      }, {
        x: n,
        y: 0
      }]
    }, {
      values: [{
        x: n,
        y: 0
      }, {
        x: n,
        y: 0
      }, {
        x: n,
        y: n / 2
      }, {
        x: n / 2,
        y: n / 2
      }]
    }, {
      values: [{
        x: n / 2,
        y: n / 2
      }, {
        x: n / 2,
        y: n / 2
      }, {
        x: n / 8,
        y: n / 2
      }, {
        x: n / 8,
        y: n / 8
      }]
    }, {
      values: [{
        x: n / 8,
        y: n / 8
      }, {
        x: n / 8,
        y: n / 2
      }, {
        x: n / 2,
        y: n
      }, {
        x: n / 2,
        y: n
      }]
    }, {
      values: [{
        x: n / 2,
        y: n
      }, {
        x: n / 2,
        y: n
      }, {
        x: 0,
        y: n
      }, {
        x: 0,
        y: n
      }]
    }]
  },
  spade: {
    segments: [{
      values: [{
        x: 0,
        y: -n
      }, {
        x: 0,
        y: -n
      }, {
        x: n,
        y: -n / 2
      }, {
        x: n,
        y: 0
      }]
    }, {
      values: [{
        x: n,
        y: 0
      }, {
        x: n,
        y: 0
      }, {
        x: n,
        y: n / 2
      }, {
        x: n / 2,
        y: n / 2
      }]
    }, {
      values: [{
        x: n / 2,
        y: n / 2
      }, {
        x: n / 2,
        y: n / 2
      }, {
        x: n / 8,
        y: n / 2
      }, {
        x: n / 8,
        y: n / 8
      }]
    }, {
      values: [{
        x: n / 8,
        y: n / 8
      }, {
        x: n / 8,
        y: n / 2
      }, {
        x: n / 2,
        y: n
      }, {
        x: n / 2,
        y: n
      }]
    }, {
      values: [{
        x: n / 2,
        y: n
      }, {
        x: n / 2,
        y: n
      }, {
        x: 0,
        y: n
      }, {
        x: 0,
        y: n
      }]
    }]
  }
};
;// CONCATENATED MODULE: ../../shapes/cards/dist/esm/CardsSuitsDrawers.js

class SpadeDrawer {
  draw(context, _particle, radius) {
    drawPath(context, radius, paths.spade);
  }
}
class HeartDrawer {
  draw(context, _particle, radius) {
    drawPath(context, radius, paths.heart);
  }
}
class DiamondDrawer {
  draw(context, _particle, radius) {
    drawPath(context, radius, paths.diamond);
  }
}
class ClubDrawer {
  draw(context, _particle, radius) {
    drawPath(context, radius, paths.club);
  }
}
;// CONCATENATED MODULE: ../../shapes/cards/dist/esm/index.js

async function loadCardsShape(engine, refresh = true) {
  await engine.addShape(["spade", "spades"], new SpadeDrawer(), refresh);
  await engine.addShape(["heart", "hearts"], new HeartDrawer(), refresh);
  await engine.addShape(["diamond", "diamonds"], new DiamondDrawer(), refresh);
  await engine.addShape(["club", "clubs"], new ClubDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../shapes/cog/dist/esm/CogDrawer.js

class CogDrawer {
  afterEffect(ctx, particle, radius) {
    if (particle.cogHoleRadius === undefined || particle.cogInnerRadius === undefined || particle.cogInnerTaper === undefined || particle.cogNotches === undefined || particle.cogOuterTaper === undefined) {
      return;
    }
    const pi2 = 2 * Math.PI,
      holeRadius = radius * particle.cogHoleRadius / 100;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.moveTo(holeRadius, 0);
    ctx.arc(0, 0, holeRadius, 0, pi2);
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }
  draw(ctx, particle, radius) {
    if (particle.cogHoleRadius === undefined || particle.cogInnerRadius === undefined || particle.cogInnerTaper === undefined || particle.cogNotches === undefined || particle.cogOuterTaper === undefined) {
      return;
    }
    const pi2 = 2 * Math.PI,
      angle = pi2 / (particle.cogNotches * 2),
      taperAI = angle * particle.cogInnerTaper * 0.005,
      taperAO = angle * particle.cogOuterTaper * 0.005,
      innerRadius = radius * particle.cogInnerRadius / 100;
    let a = angle,
      toggle = false;
    ctx.moveTo(radius * Math.cos(taperAO), radius * Math.sin(taperAO));
    for (; a <= pi2; a += angle) {
      if (toggle) {
        ctx.lineTo(innerRadius * Math.cos(a - taperAI), innerRadius * Math.sin(a - taperAI));
        ctx.lineTo(radius * Math.cos(a + taperAO), radius * Math.sin(a + taperAO));
      } else {
        ctx.lineTo(radius * Math.cos(a - taperAO), radius * Math.sin(a - taperAO));
        ctx.lineTo(innerRadius * Math.cos(a + taperAI), innerRadius * Math.sin(a + taperAI));
      }
      toggle = !toggle;
    }
  }
  particleInit(container, particle) {
    const shapeData = particle.shapeData;
    particle.cogHoleRadius = getRangeValue(shapeData?.holeRadius ?? 44);
    particle.cogInnerRadius = getRangeValue(shapeData?.innerRadius ?? 72);
    particle.cogInnerTaper = getRangeValue(shapeData?.innerTaper ?? 35);
    particle.cogNotches = getRangeValue(shapeData?.notches ?? 7);
    particle.cogOuterTaper = getRangeValue(shapeData?.outerTaper ?? 50);
  }
}
;// CONCATENATED MODULE: ../../shapes/cog/dist/esm/index.js

async function loadCogShape(engine, refresh = true) {
  await engine.addShape("cog", new CogDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../paths/curves/dist/esm/Curves.js

function CurvesPathGen(rndFunc, period, nbHarmonics, attenHarmonics, lowValue = 0, highValue = 1) {
  const arP0 = [],
    arP1 = [],
    amplitudes = [],
    increments = [],
    phases = [],
    randomFunc = rndFunc ?? getRandom;
  let globAmplitude = 0;
  if (nbHarmonics < 1) nbHarmonics = 1;
  for (let kh = 1; kh <= nbHarmonics; ++kh) {
    arP0[kh] = randomFunc();
    arP1[kh] = randomFunc();
    amplitudes[kh] = kh === 1 ? 1 : amplitudes[kh - 1] * attenHarmonics;
    globAmplitude += amplitudes[kh];
    increments[kh] = kh / period;
    phases[kh] = randomFunc();
  }
  amplitudes.forEach((value, kh) => amplitudes[kh] = value / globAmplitude * (highValue - lowValue));
  return () => {
    let pf,
      pfl,
      signal = 0;
    for (let kh = nbHarmonics; kh >= 1; --kh) {
      pf = phases[kh] += increments[kh];
      if (phases[kh] >= 1) {
        pf = phases[kh] -= 1;
        arP0[kh] = arP1[kh];
        arP1[kh] = randomFunc();
      }
      pfl = pf ** 2 * (3 - 2 * pf);
      signal += (arP0[kh] * (1 - pfl) + arP1[kh] * pfl) * amplitudes[kh];
    }
    return signal + lowValue;
  };
}
;// CONCATENATED MODULE: ../../paths/curves/dist/esm/CurvesPathGenerator.js


class CurvesPathGenerator {
  constructor() {
    this.options = {
      rndFunc: null,
      period: 100,
      nbHarmonics: 2,
      attenHarmonics: 0.8,
      lowValue: -0.03,
      highValue: 0.03
    };
  }
  generate(p) {
    if (!p.pathGen) {
      const options = this.options;
      p.pathGen = CurvesPathGen(options.rndFunc, options.period, options.nbHarmonics, options.attenHarmonics, options.lowValue, options.highValue);
    }
    if (!p.curveVelocity) {
      p.curveVelocity = Vector.origin;
      p.curveVelocity.length = getRandom() * 0.6 + 0.8;
      p.curveVelocity.angle = getRandom() * Math.PI * 2;
    } else {
      p.curveVelocity.length += 0.01;
      p.curveVelocity.angle = (p.curveVelocity.angle + p.pathGen()) % (Math.PI * 2);
    }
    p.velocity.x = 0;
    p.velocity.y = 0;
    return p.curveVelocity;
  }
  init(container) {
    const sourceOptions = container.actualOptions.particles.move.path.options,
      {
        options
      } = this;
    if (isFunction(sourceOptions.rndFunc)) {
      options.rndFunc = sourceOptions.rndFunc;
    } else if (isString(sourceOptions.rndFunc)) {
      options.rndFunc = window[sourceOptions.rndFunc] || this.options.rndFunc;
    }
    options.period = sourceOptions.period ?? options.period;
    options.nbHarmonics = sourceOptions.nbHarmonics ?? options.nbHarmonics;
    options.attenHarmonics = sourceOptions.attenHarmonics ?? options.attenHarmonics;
    options.lowValue = sourceOptions.lowValue ?? options.lowValue;
    options.highValue = sourceOptions.highValue ?? options.highValue;
  }
  reset(particle) {
    delete particle.pathGen;
    delete particle.curveVelocity;
  }
  update() {}
}
;// CONCATENATED MODULE: ../../paths/curves/dist/esm/index.js

const curvesPathName = "curvesPathGenerator";
async function loadCurvesPath(engine, refresh = true) {
  await engine.addPathGenerator(curvesPathName, new CurvesPathGenerator(), refresh);
}
;// CONCATENATED MODULE: ../../plugins/easings/back/dist/esm/index.js

async function loadEasingBackPlugin() {
  addEasing("ease-in-back", value => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return c3 * value ** 3 - c1 * value ** 2;
  });
  addEasing("ease-out-back", value => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
  });
  addEasing("ease-in-out-back", value => {
    const c1 = 1.70158,
      c2 = c1 * 1.525;
    return value < 0.5 ? (2 * value) ** 2 * ((c2 + 1) * 2 * value - c2) / 2 : ((2 * value - 2) ** 2 * ((c2 + 1) * (value * 2 - 2) + c2) + 2) / 2;
  });
}
;// CONCATENATED MODULE: ../../plugins/easings/circ/dist/esm/index.js

async function loadEasingCircPlugin() {
  addEasing("ease-in-circ", value => 1 - Math.sqrt(1 - value ** 2));
  addEasing("ease-out-circ", value => Math.sqrt(1 - (value - 1) ** 2));
  addEasing("ease-in-out-circ", value => value < 0.5 ? (1 - Math.sqrt(1 - (2 * value) ** 2)) / 2 : (Math.sqrt(1 - (-2 * value + 2) ** 2) + 1) / 2);
}
;// CONCATENATED MODULE: ../../plugins/easings/cubic/dist/esm/index.js

async function loadEasingCubicPlugin() {
  addEasing("ease-in-cubic", value => value ** 3);
  addEasing("ease-out-cubic", value => 1 - (1 - value) ** 3);
  addEasing("ease-in-out-cubic", value => value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2);
}
;// CONCATENATED MODULE: ../../plugins/easings/expo/dist/esm/index.js

async function loadEasingExpoPlugin() {
  addEasing("ease-in-expo", value => !value ? 0 : 2 ** (10 * value - 10));
  addEasing("ease-out-expo", value => value === 1 ? 1 : 1 - Math.pow(2, -10 * value));
  addEasing("ease-in-out-expo", value => !value ? 0 : value === 1 ? 1 : value < 0.5 ? 2 ** (20 * value - 10) / 2 : (2 - 2 ** (-20 * value + 10)) / 2);
}
;// CONCATENATED MODULE: ../../plugins/easings/quart/dist/esm/index.js

async function loadEasingQuartPlugin() {
  addEasing("ease-in-quart", value => value ** 4);
  addEasing("ease-out-quart", value => 1 - (1 - value) ** 4);
  addEasing("ease-in-out-quart", value => value < 0.5 ? 8 * value ** 4 : 1 - (-2 * value + 2) ** 4 / 2);
}
;// CONCATENATED MODULE: ../../plugins/easings/quint/dist/esm/index.js

async function loadEasingQuintPlugin() {
  addEasing("ease-in-quint", value => value ** 5);
  addEasing("ease-out-quint", value => 1 - (1 - value) ** 5);
  addEasing("ease-in-out-quint", value => value < 0.5 ? 16 * value ** 5 : 1 - (-2 * value + 2) ** 5 / 2);
}
;// CONCATENATED MODULE: ../../plugins/easings/sine/dist/esm/index.js

async function loadEasingSinePlugin() {
  addEasing("ease-in-sine", value => 1 - Math.cos(value * Math.PI / 2));
  addEasing("ease-out-sine", value => Math.sin(value * Math.PI / 2));
  addEasing("ease-in-out-sine", value => -(Math.cos(Math.PI * value) - 1) / 2);
}
;// CONCATENATED MODULE: ../../plugins/exports/image/dist/esm/ExportImageInstance.js
class ExportImageInstance {
  constructor(container, engine) {
    this._exportImage = async data => {
      const element = this._container.canvas.element;
      if (!element) {
        return;
      }
      return new Promise(resolve => {
        element.toBlob(blob => {
          if (!blob) {
            resolve(undefined);
            return;
          }
          resolve(blob);
        }, data.type ?? "image/png", data.quality);
      });
    };
    this._container = container;
    this._engine = engine;
  }
  async export(type, data) {
    const res = {
      supported: false
    };
    switch (type) {
      case "image":
        res.supported = true;
        res.blob = await this._exportImage(data);
        break;
    }
    return res;
  }
}
;// CONCATENATED MODULE: ../../plugins/exports/image/dist/esm/index.js

class ExportImagePlugin {
  constructor(engine) {
    this.id = "export-image";
    this._engine = engine;
  }
  getPlugin(container) {
    return new ExportImageInstance(container, this._engine);
  }
  loadOptions() {}
  needsPlugin() {
    return true;
  }
}
async function loadExportImagePlugin(engine, refresh = true) {
  await engine.addPlugin(new ExportImagePlugin(engine), refresh);
}
;// CONCATENATED MODULE: ../../plugins/exports/json/dist/esm/ExportJSONInstance.js
class ExportJSONInstance {
  constructor(container, engine) {
    this._exportJSON = async () => {
      const json = JSON.stringify(this._container.actualOptions, (key, value) => {
        if (key.startsWith("_")) {
          return;
        }
        return value;
      }, 2);
      return new Blob([json], {
        type: "application/json"
      });
    };
    this._container = container;
    this._engine = engine;
  }
  async export(type) {
    const res = {
      supported: false
    };
    switch (type) {
      case "json":
        res.supported = true;
        res.blob = await this._exportJSON();
        break;
    }
    return res;
  }
}
;// CONCATENATED MODULE: ../../plugins/exports/json/dist/esm/index.js

class ExportJSONPlugin {
  constructor(engine) {
    this.id = "export-json";
    this._engine = engine;
  }
  getPlugin(container) {
    return new ExportJSONInstance(container, this._engine);
  }
  loadOptions() {}
  needsPlugin() {
    return true;
  }
}
async function loadExportJSONPlugin(engine, refresh = true) {
  await engine.addPlugin(new ExportJSONPlugin(engine), refresh);
}
;// CONCATENATED MODULE: ../../plugins/exports/video/dist/esm/ExportVideoInstance.js
const videoTypes = ["webm", "ogg", "mp4", "x-matroska"],
  codecs = ["vp9", "vp9.0", "vp8", "vp8.0", "avc1", "av1", "h265", "h.265", "h264", "h.264", "opus", "pcm", "aac", "mpeg", "mp4a"];
function getVideoSupportedMimeTypes() {
  const isSupported = MediaRecorder.isTypeSupported,
    supported = [];
  videoTypes.forEach(type => {
    const mimeType = `video/${type}`;
    codecs.forEach(codec => [`${mimeType};codecs=${codec}`, `${mimeType};codecs=${codec.toUpperCase()}`].forEach(variation => {
      if (isSupported(variation)) {
        supported.push(variation);
      }
    }));
    if (isSupported(mimeType)) {
      supported.push(mimeType);
    }
  });
  return supported;
}
class ExportVideoInstance {
  constructor(container, engine) {
    this._supportedTypes = [];
    this._exportVideo = async data => {
      const element = this._container.canvas.element;
      if (!element) {
        return;
      }
      return new Promise(resolve => {
        const stream = element.captureStream(data.fps ?? this._container.actualOptions.fpsLimit),
          mimeType = data.mimeType ?? this._supportedTypes[0],
          recorder = new MediaRecorder(stream, {
            mimeType
          }),
          chunks = [];
        recorder.addEventListener("dataavailable", event => {
          chunks.push(event.data);
        });
        recorder.addEventListener("stop", () => {
          resolve(new Blob(chunks, {
            type: mimeType
          }));
        });
        recorder.start();
        setTimeout(() => {
          recorder.stop();
        }, data.duration ?? 5000);
      });
    };
    this._container = container;
    this._engine = engine;
    this._supportedTypes = getVideoSupportedMimeTypes();
  }
  async export(type, data) {
    const res = {
      supported: false
    };
    switch (type) {
      case "video":
        res.supported = true;
        res.blob = await this._exportVideo(data);
        break;
    }
    return res;
  }
}
;// CONCATENATED MODULE: ../../plugins/exports/video/dist/esm/index.js

class ExportVideoPlugin {
  constructor(engine) {
    this.id = "export-video";
    this._engine = engine;
  }
  getPlugin(container) {
    return new ExportVideoInstance(container, this._engine);
  }
  loadOptions() {}
  needsPlugin() {
    return true;
  }
}
async function loadExportVideoPlugin(engine, refresh = true) {
  await engine.addPlugin(new ExportVideoPlugin(engine), refresh);
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/OptionsColor.js

class OptionsColor {
  constructor() {
    this.value = "";
  }
  static create(source, data) {
    const color = new OptionsColor();
    color.load(source);
    if (data !== undefined) {
      if (isString(data) || isArray(data)) {
        color.load({
          value: data
        });
      } else {
        color.load(data);
      }
    }
    return color;
  }
  load(data) {
    if (data?.value === undefined) {
      return;
    }
    this.value = data.value;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/AnimationOptions.js

class AnimationOptions {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 1;
    this.decay = 0;
    this.delay = 0;
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== undefined) {
      this.count = setRangeValue(data.count);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.decay !== undefined) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}
class RangedAnimationOptions extends AnimationOptions {
  constructor() {
    super();
    this.mode = "auto";
    this.startValue = "random";
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.minimumValue !== undefined) {
      this.minimumValue = data.minimumValue;
    }
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
    if (data.startValue !== undefined) {
      this.startValue = data.startValue;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Random.js
class Random {
  constructor() {
    this.enable = false;
    this.minimumValue = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.minimumValue !== undefined) {
      this.minimumValue = data.minimumValue;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/ValueWithRandom.js




class ValueWithRandom {
  constructor() {
    this.random = new Random();
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (isBoolean(data.random)) {
      this.random.enable = data.random;
    } else {
      this.random.load(data.random);
    }
    if (data.value !== undefined) {
      this.value = setRangeValue(data.value, this.random.enable ? this.random.minimumValue : undefined);
    }
  }
}
class AnimationValueWithRandom extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new AnimationOptions();
  }
  get anim() {
    return this.animation;
  }
  set anim(value) {
    this.animation = value;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    const animation = data.animation ?? data.anim;
    if (animation !== undefined) {
      this.animation.load(animation);
    }
  }
}
class RangedAnimationValueWithRandom extends AnimationValueWithRandom {
  constructor() {
    super();
    this.animation = new RangedAnimationOptions();
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    const animation = data.animation ?? data.anim;
    if (animation !== undefined) {
      this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/absorbers/dist/esm/Options/Classes/AbsorberSizeLimit.js
class AbsorberSizeLimit {
  constructor() {
    this.radius = 0;
    this.mass = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.mass !== undefined) {
      this.mass = data.mass;
    }
    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/absorbers/dist/esm/Options/Classes/AbsorberSize.js


class AbsorberSize extends ValueWithRandom {
  constructor() {
    super();
    this.density = 5;
    this.value = 50;
    this.limit = new AbsorberSizeLimit();
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.density !== undefined) {
      this.density = data.density;
    }
    if (isNumber(data.limit)) {
      this.limit.radius = data.limit;
    } else {
      this.limit.load(data.limit);
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/absorbers/dist/esm/Options/Classes/Absorber.js


class Absorber {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#000000";
    this.draggable = false;
    this.opacity = 1;
    this.destroy = true;
    this.orbits = false;
    this.size = new AbsorberSize();
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.draggable !== undefined) {
      this.draggable = data.draggable;
    }
    this.name = data.name;
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
    if (data.position !== undefined) {
      this.position = {};
      if (data.position.x !== undefined) {
        this.position.x = setRangeValue(data.position.x);
      }
      if (data.position.y !== undefined) {
        this.position.y = setRangeValue(data.position.y);
      }
    }
    if (data.size !== undefined) {
      this.size.load(data.size);
    }
    if (data.destroy !== undefined) {
      this.destroy = data.destroy;
    }
    if (data.orbits !== undefined) {
      this.orbits = data.orbits;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/ColorUtils.js


const randomColorValue = "random",
  midColorValue = "mid",
  colorManagers = new Map();
function addColorManager(manager) {
  colorManagers.set(manager.key, manager);
}
function hue2rgb(p, q, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}
function stringToRgba(input) {
  for (const [, manager] of colorManagers) {
    if (input.startsWith(manager.stringPrefix)) {
      return manager.parseString(input);
    }
  }
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i,
    hexFixed = input.replace(shorthandRegex, (_, r, g, b, a) => {
      return r + r + g + g + b + b + (a !== undefined ? a + a : "");
    }),
    regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i,
    result = regex.exec(hexFixed);
  return result ? {
    a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
    b: parseInt(result[3], 16),
    g: parseInt(result[2], 16),
    r: parseInt(result[1], 16)
  } : undefined;
}
function rangeColorToRgb(input, index, useIndex = true) {
  if (!input) {
    return;
  }
  const color = isString(input) ? {
    value: input
  } : input;
  if (isString(color.value)) {
    return colorToRgb(color.value, index, useIndex);
  }
  if (isArray(color.value)) {
    return rangeColorToRgb({
      value: itemFromArray(color.value, index, useIndex)
    });
  }
  for (const [, manager] of colorManagers) {
    const res = manager.handleRangeColor(color);
    if (res) {
      return res;
    }
  }
}
function colorToRgb(input, index, useIndex = true) {
  if (!input) {
    return;
  }
  const color = isString(input) ? {
    value: input
  } : input;
  if (isString(color.value)) {
    return color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);
  }
  if (isArray(color.value)) {
    return colorToRgb({
      value: itemFromArray(color.value, index, useIndex)
    });
  }
  for (const [, manager] of colorManagers) {
    const res = manager.handleColor(color);
    if (res) {
      return res;
    }
  }
}
function colorToHsl(color, index, useIndex = true) {
  const rgb = colorToRgb(color, index, useIndex);
  return rgb ? rgbToHsl(rgb) : undefined;
}
function rangeColorToHsl(color, index, useIndex = true) {
  const rgb = rangeColorToRgb(color, index, useIndex);
  return rgb ? rgbToHsl(rgb) : undefined;
}
function rgbToHsl(color) {
  const r1 = color.r / 255,
    g1 = color.g / 255,
    b1 = color.b / 255,
    max = Math.max(r1, g1, b1),
    min = Math.min(r1, g1, b1),
    res = {
      h: 0,
      l: (max + min) / 2,
      s: 0
    };
  if (max !== min) {
    res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
    res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? 2.0 + (b1 - r1) / (max - min) : 4.0 + (r1 - g1) / (max - min);
  }
  res.l *= 100;
  res.s *= 100;
  res.h *= 60;
  if (res.h < 0) {
    res.h += 360;
  }
  if (res.h >= 360) {
    res.h -= 360;
  }
  return res;
}
function stringToAlpha(input) {
  return stringToRgba(input)?.a;
}
function stringToRgb(input) {
  return stringToRgba(input);
}
function hslToRgb(hsl) {
  const result = {
      b: 0,
      g: 0,
      r: 0
    },
    hslPercent = {
      h: hsl.h / 360,
      l: hsl.l / 100,
      s: hsl.s / 100
    };
  if (!hslPercent.s) {
    result.r = result.g = result.b = hslPercent.l;
  } else {
    const q = hslPercent.l < 0.5 ? hslPercent.l * (1 + hslPercent.s) : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s,
      p = 2 * hslPercent.l - q;
    result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
    result.g = hue2rgb(p, q, hslPercent.h);
    result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
  }
  result.r = Math.floor(result.r * 255);
  result.g = Math.floor(result.g * 255);
  result.b = Math.floor(result.b * 255);
  return result;
}
function hslaToRgba(hsla) {
  const rgbResult = hslToRgb(hsla);
  return {
    a: hsla.a,
    b: rgbResult.b,
    g: rgbResult.g,
    r: rgbResult.r
  };
}
function getRandomRgbColor(min) {
  const fixedMin = min ?? 0;
  return {
    b: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
    g: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
    r: Math.floor(randomInRange(setRangeValue(fixedMin, 256)))
  };
}
function getStyleFromRgb(color, opacity) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity ?? 1})`;
}
function ColorUtils_getStyleFromHsl(color, opacity) {
  return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity ?? 1})`;
}
function colorMix(color1, color2, size1, size2) {
  let rgb1 = color1,
    rgb2 = color2;
  if (rgb1.r === undefined) {
    rgb1 = hslToRgb(color1);
  }
  if (rgb2.r === undefined) {
    rgb2 = hslToRgb(color2);
  }
  return {
    b: mix(rgb1.b, rgb2.b, size1, size2),
    g: mix(rgb1.g, rgb2.g, size1, size2),
    r: mix(rgb1.r, rgb2.r, size1, size2)
  };
}
function getLinkColor(p1, p2, linkColor) {
  if (linkColor === randomColorValue) {
    return getRandomRgbColor();
  } else if (linkColor === midColorValue) {
    const sourceColor = p1.getFillColor() ?? p1.getStrokeColor(),
      destColor = p2?.getFillColor() ?? p2?.getStrokeColor();
    if (sourceColor && destColor && p2) {
      return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
    } else {
      const hslColor = sourceColor ?? destColor;
      if (hslColor) {
        return hslToRgb(hslColor);
      }
    }
  } else {
    return linkColor;
  }
}
function getLinkRandomColor(optColor, blink, consent) {
  const color = isString(optColor) ? optColor : optColor.value;
  if (color === randomColorValue) {
    if (consent) {
      return rangeColorToRgb({
        value: color
      });
    }
    if (blink) {
      return randomColorValue;
    }
    return midColorValue;
  } else if (color === midColorValue) {
    return midColorValue;
  } else {
    return rangeColorToRgb({
      value: color
    });
  }
}
function getHslFromAnimation(animation) {
  return animation !== undefined ? {
    h: animation.h.value,
    s: animation.s.value,
    l: animation.l.value
  } : undefined;
}
function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
  const resColor = {
    h: {
      enable: false,
      value: hsl.h
    },
    s: {
      enable: false,
      value: hsl.s
    },
    l: {
      enable: false,
      value: hsl.l
    }
  };
  if (animationOptions) {
    setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
    setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
    setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
  }
  return resColor;
}
function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
  colorValue.enable = colorAnimation.enable;
  if (colorValue.enable) {
    colorValue.velocity = getRangeValue(colorAnimation.speed) / 100 * reduceFactor;
    colorValue.decay = 1 - getRangeValue(colorAnimation.decay);
    colorValue.status = "increasing";
    colorValue.loops = 0;
    colorValue.maxLoops = getRangeValue(colorAnimation.count);
    colorValue.time = 0;
    colorValue.delayTime = getRangeValue(colorAnimation.delay) * 1000;
    if (!colorAnimation.sync) {
      colorValue.velocity *= getRandom();
      colorValue.value *= getRandom();
    }
    colorValue.initialValue = colorValue.value;
  } else {
    colorValue.velocity = 0;
  }
}
;// CONCATENATED MODULE: ../../plugins/absorbers/dist/esm/AbsorberInstance.js


class AbsorberInstance {
  constructor(absorbers, container, options, position) {
    this.absorbers = absorbers;
    this.container = container;
    this._calcPosition = () => {
      const exactPosition = calcPositionOrRandomFromSizeRanged({
        size: this.container.canvas.size,
        position: this.options.position
      });
      return Vector.create(exactPosition.x, exactPosition.y);
    };
    this._updateParticlePosition = (particle, v) => {
      if (particle.destroyed) {
        return;
      }
      const container = this.container,
        canvasSize = container.canvas.size;
      if (particle.needsNewPosition) {
        const newPosition = calcPositionOrRandomFromSize({
          size: canvasSize
        });
        particle.position.setTo(newPosition);
        particle.velocity.setTo(particle.initialVelocity);
        particle.absorberOrbit = undefined;
        particle.needsNewPosition = false;
      }
      if (this.options.orbits) {
        if (particle.absorberOrbit === undefined) {
          particle.absorberOrbit = Vector.create(0, 0);
          particle.absorberOrbit.length = getDistance(particle.getPosition(), this.position);
          particle.absorberOrbit.angle = getRandom() * Math.PI * 2;
        }
        if (particle.absorberOrbit.length <= this.size && !this.options.destroy) {
          const minSize = Math.min(canvasSize.width, canvasSize.height);
          particle.absorberOrbit.length = minSize * (1 + (getRandom() * 0.2 - 0.1));
        }
        if (particle.absorberOrbitDirection === undefined) {
          particle.absorberOrbitDirection = particle.velocity.x >= 0 ? "clockwise" : "counter-clockwise";
        }
        const orbitRadius = particle.absorberOrbit.length,
          orbitAngle = particle.absorberOrbit.angle,
          orbitDirection = particle.absorberOrbitDirection;
        particle.velocity.setTo(Vector.origin);
        const updateFunc = {
          x: orbitDirection === "clockwise" ? Math.cos : Math.sin,
          y: orbitDirection === "clockwise" ? Math.sin : Math.cos
        };
        particle.position.x = this.position.x + orbitRadius * updateFunc.x(orbitAngle);
        particle.position.y = this.position.y + orbitRadius * updateFunc.y(orbitAngle);
        particle.absorberOrbit.length -= v.length;
        particle.absorberOrbit.angle += (particle.retina.moveSpeed ?? 0) * container.retina.pixelRatio / 100 * container.retina.reduceFactor;
      } else {
        const addV = Vector.origin;
        addV.length = v.length;
        addV.angle = v.angle;
        particle.velocity.addTo(addV);
      }
    };
    this.initialPosition = position ? Vector.create(position.x, position.y) : undefined;
    if (options instanceof Absorber) {
      this.options = options;
    } else {
      this.options = new Absorber();
      this.options.load(options);
    }
    this.dragging = false;
    this.name = this.options.name;
    this.opacity = this.options.opacity;
    this.size = getRangeValue(this.options.size.value) * container.retina.pixelRatio;
    this.mass = this.size * this.options.size.density * container.retina.reduceFactor;
    const limit = this.options.size.limit;
    this.limit = {
      radius: limit.radius * container.retina.pixelRatio * container.retina.reduceFactor,
      mass: limit.mass
    };
    this.color = rangeColorToRgb(this.options.color) ?? {
      b: 0,
      g: 0,
      r: 0
    };
    this.position = this.initialPosition?.copy() ?? this._calcPosition();
  }
  attract(particle) {
    const container = this.container,
      options = this.options;
    if (options.draggable) {
      const mouse = container.interactivity.mouse;
      if (mouse.clicking && mouse.downPosition) {
        const mouseDist = getDistance(this.position, mouse.downPosition);
        if (mouseDist <= this.size) {
          this.dragging = true;
        }
      } else {
        this.dragging = false;
      }
      if (this.dragging && mouse.position) {
        this.position.x = mouse.position.x;
        this.position.y = mouse.position.y;
      }
    }
    const pos = particle.getPosition(),
      {
        dx,
        dy,
        distance
      } = getDistances(this.position, pos),
      v = Vector.create(dx, dy);
    v.length = this.mass / Math.pow(distance, 2) * container.retina.reduceFactor;
    if (distance < this.size + particle.getRadius()) {
      const sizeFactor = particle.getRadius() * 0.033 * container.retina.pixelRatio;
      if (this.size > particle.getRadius() && distance < this.size - particle.getRadius() || particle.absorberOrbit !== undefined && particle.absorberOrbit.length < 0) {
        if (options.destroy) {
          particle.destroy();
        } else {
          particle.needsNewPosition = true;
          this._updateParticlePosition(particle, v);
        }
      } else {
        if (options.destroy) {
          particle.size.value -= sizeFactor;
        }
        this._updateParticlePosition(particle, v);
      }
      if (this.limit.radius <= 0 || this.size < this.limit.radius) {
        this.size += sizeFactor;
      }
      if (this.limit.mass <= 0 || this.mass < this.limit.mass) {
        this.mass += sizeFactor * this.options.size.density * container.retina.reduceFactor;
      }
    } else {
      this._updateParticlePosition(particle, v);
    }
  }
  draw(context) {
    context.translate(this.position.x, this.position.y);
    context.beginPath();
    context.arc(0, 0, this.size, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = getStyleFromRgb(this.color, this.opacity);
    context.fill();
  }
  resize() {
    const initialPosition = this.initialPosition;
    this.position = initialPosition && isPointInside(initialPosition, this.container.canvas.size, Vector.origin) ? initialPosition : this._calcPosition();
  }
}
;// CONCATENATED MODULE: ../../plugins/absorbers/dist/esm/Absorbers.js


class Absorbers {
  constructor(container) {
    this.container = container;
    this.array = [];
    this.absorbers = [];
    this.interactivityAbsorbers = [];
    container.getAbsorber = idxOrName => idxOrName === undefined || isNumber(idxOrName) ? this.array[idxOrName || 0] : this.array.find(t => t.name === idxOrName);
    container.addAbsorber = (options, position) => this.addAbsorber(options, position);
  }
  addAbsorber(options, position) {
    const absorber = new AbsorberInstance(this, this.container, options, position);
    this.array.push(absorber);
    return absorber;
  }
  draw(context) {
    for (const absorber of this.array) {
      absorber.draw(context);
    }
  }
  handleClickMode(mode) {
    const absorberOptions = this.absorbers,
      modeAbsorbers = this.interactivityAbsorbers;
    if (mode === "absorber") {
      const absorbersModeOptions = itemFromSingleOrMultiple(modeAbsorbers),
        absorbersOptions = absorbersModeOptions ?? itemFromSingleOrMultiple(absorberOptions),
        aPosition = this.container.interactivity.mouse.clickPosition;
      this.addAbsorber(absorbersOptions, aPosition);
    }
  }
  async init() {
    this.absorbers = this.container.actualOptions.absorbers;
    this.interactivityAbsorbers = this.container.actualOptions.interactivity.modes.absorbers;
    executeOnSingleOrMultiple(this.absorbers, absorber => {
      this.addAbsorber(absorber);
    });
  }
  particleUpdate(particle) {
    for (const absorber of this.array) {
      absorber.attract(particle);
      if (particle.destroyed) {
        break;
      }
    }
  }
  removeAbsorber(absorber) {
    const index = this.array.indexOf(absorber);
    if (index >= 0) {
      this.array.splice(index, 1);
    }
  }
  resize() {
    for (const absorber of this.array) {
      absorber.resize();
    }
  }
  stop() {
    this.array = [];
  }
}
;// CONCATENATED MODULE: ../../plugins/absorbers/dist/esm/index.js



class AbsorbersPlugin {
  constructor() {
    this.id = "absorbers";
  }
  getPlugin(container) {
    return new Absorbers(container);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }
    if (source?.absorbers) {
      options.absorbers = executeOnSingleOrMultiple(source.absorbers, absorber => {
        const tmp = new Absorber();
        tmp.load(absorber);
        return tmp;
      });
    }
    options.interactivity.modes.absorbers = executeOnSingleOrMultiple(source?.interactivity?.modes?.absorbers, absorber => {
      const tmp = new Absorber();
      tmp.load(absorber);
      return tmp;
    });
  }
  needsPlugin(options) {
    if (!options) {
      return false;
    }
    const absorbers = options.absorbers;
    if (isArray(absorbers)) {
      return !!absorbers.length;
    } else if (absorbers) {
      return true;
    } else if (options.interactivity?.events?.onClick?.mode && isInArray("absorber", options.interactivity.events.onClick.mode)) {
      return true;
    }
    return false;
  }
}
async function loadAbsorbersPlugin(engine, refresh = true) {
  await engine.addPlugin(new AbsorbersPlugin(), refresh);
}


;// CONCATENATED MODULE: ../../updaters/destroy/dist/esm/Options/Classes/DestroyBounds.js

class DestroyBounds {
  load(data) {
    if (!data) {
      return;
    }
    if (data.bottom !== undefined) {
      this.bottom = setRangeValue(data.bottom);
    }
    if (data.left !== undefined) {
      this.left = setRangeValue(data.left);
    }
    if (data.right !== undefined) {
      this.right = setRangeValue(data.right);
    }
    if (data.top !== undefined) {
      this.top = setRangeValue(data.top);
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/esm/Options/Classes/SplitFactor.js

class SplitFactor extends ValueWithRandom {
  constructor() {
    super();
    this.value = 3;
  }
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/esm/Options/Classes/SplitRate.js

class SplitRate extends ValueWithRandom {
  constructor() {
    super();
    this.value = {
      min: 4,
      max: 9
    };
  }
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/esm/Options/Classes/Split.js



class Split {
  constructor() {
    this.count = 1;
    this.factor = new SplitFactor();
    this.rate = new SplitRate();
    this.sizeOffset = true;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.count !== undefined) {
      this.count = data.count;
    }
    this.factor.load(data.factor);
    this.rate.load(data.rate);
    this.particles = executeOnSingleOrMultiple(data.particles, particles => {
      return deepExtend({}, particles);
    });
    if (data.sizeOffset !== undefined) {
      this.sizeOffset = data.sizeOffset;
    }
    if (data.colorOffset) {
      this.colorOffset = this.colorOffset ?? {};
      if (data.colorOffset.h !== undefined) {
        this.colorOffset.h = data.colorOffset.h;
      }
      if (data.colorOffset.s !== undefined) {
        this.colorOffset.s = data.colorOffset.s;
      }
      if (data.colorOffset.l !== undefined) {
        this.colorOffset.l = data.colorOffset.l;
      }
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/esm/Options/Classes/Destroy.js


class Destroy {
  constructor() {
    this.bounds = new DestroyBounds();
    this.mode = "none";
    this.split = new Split();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.mode) {
      this.mode = data.mode;
    }
    if (data.bounds) {
      this.bounds.load(data.bounds);
    }
    this.split.load(data.split);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/ColorAnimation.js

class ColorAnimation {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.offset = 0;
    this.speed = 1;
    this.delay = 0;
    this.decay = 0;
    this.sync = true;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== undefined) {
      this.count = setRangeValue(data.count);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.offset !== undefined) {
      this.offset = setRangeValue(data.offset);
    }
    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.decay !== undefined) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/HslAnimation.js

class HslAnimation {
  constructor() {
    this.h = new ColorAnimation();
    this.s = new ColorAnimation();
    this.l = new ColorAnimation();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.h.load(data.h);
    this.s.load(data.s);
    this.l.load(data.l);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/AnimatableColor.js



class AnimatableColor extends OptionsColor {
  constructor() {
    super();
    this.animation = new HslAnimation();
  }
  static create(source, data) {
    const color = new AnimatableColor();
    color.load(source);
    if (data !== undefined) {
      if (isString(data) || isArray(data)) {
        color.load({
          value: data
        });
      } else {
        color.load(data);
      }
    }
    return color;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    const colorAnimation = data.animation;
    if (colorAnimation !== undefined) {
      if (colorAnimation.enable !== undefined) {
        this.animation.h.load(colorAnimation);
      } else {
        this.animation.load(data.animation);
      }
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Collisions/CollisionsAbsorb.js
class CollisionsAbsorb {
  constructor() {
    this.speed = 2;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.speed !== undefined) {
      this.speed = data.speed;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Collisions/CollisionsOverlap.js
class CollisionsOverlap {
  constructor() {
    this.enable = true;
    this.retries = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.retries !== undefined) {
      this.retries = data.retries;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js

class ParticlesBounceFactor extends ValueWithRandom {
  constructor() {
    super();
    this.random.minimumValue = 0.1;
    this.value = 1;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Bounce/ParticlesBounce.js

class ParticlesBounce {
  constructor() {
    this.horizontal = new ParticlesBounceFactor();
    this.vertical = new ParticlesBounceFactor();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.horizontal.load(data.horizontal);
    this.vertical.load(data.vertical);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Collisions/Collisions.js




class Collisions {
  constructor() {
    this.absorb = new CollisionsAbsorb();
    this.bounce = new ParticlesBounce();
    this.enable = false;
    this.maxSpeed = 50;
    this.mode = "bounce";
    this.overlap = new CollisionsOverlap();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.absorb.load(data.absorb);
    this.bounce.load(data.bounce);
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.maxSpeed !== undefined) {
      this.maxSpeed = setRangeValue(data.maxSpeed);
    }
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
    this.overlap.load(data.overlap);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/MoveAngle.js

class MoveAngle {
  constructor() {
    this.offset = 0;
    this.value = 90;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.offset !== undefined) {
      this.offset = setRangeValue(data.offset);
    }
    if (data.value !== undefined) {
      this.value = setRangeValue(data.value);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/MoveAttract.js

class MoveAttract {
  constructor() {
    this.distance = 200;
    this.enable = false;
    this.rotate = {
      x: 3000,
      y: 3000
    };
  }
  get rotateX() {
    return this.rotate.x;
  }
  set rotateX(value) {
    this.rotate.x = value;
  }
  get rotateY() {
    return this.rotate.y;
  }
  set rotateY(value) {
    this.rotate.y = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== undefined) {
      this.distance = setRangeValue(data.distance);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    const rotateX = data.rotate?.x ?? data.rotateX;
    if (rotateX !== undefined) {
      this.rotate.x = rotateX;
    }
    const rotateY = data.rotate?.y ?? data.rotateY;
    if (rotateY !== undefined) {
      this.rotate.y = rotateY;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/MoveCenter.js
class MoveCenter {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.mode = "percent";
    this.radius = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.x !== undefined) {
      this.x = data.x;
    }
    if (data.y !== undefined) {
      this.y = data.y;
    }
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/MoveGravity.js

class MoveGravity {
  constructor() {
    this.acceleration = 9.81;
    this.enable = false;
    this.inverse = false;
    this.maxSpeed = 50;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.acceleration !== undefined) {
      this.acceleration = setRangeValue(data.acceleration);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.inverse !== undefined) {
      this.inverse = data.inverse;
    }
    if (data.maxSpeed !== undefined) {
      this.maxSpeed = setRangeValue(data.maxSpeed);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/Path/MovePath.js


class MovePath {
  constructor() {
    this.clamp = true;
    this.delay = new ValueWithRandom();
    this.enable = false;
    this.options = {};
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.clamp !== undefined) {
      this.clamp = data.clamp;
    }
    this.delay.load(data.delay);
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    this.generator = data.generator;
    if (data.options) {
      this.options = deepExtend(this.options, data.options);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/MoveTrailFill.js

class MoveTrailFill {
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.image !== undefined) {
      this.image = data.image;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/MoveTrail.js

class MoveTrail {
  constructor() {
    this.enable = false;
    this.length = 10;
    this.fill = new MoveTrailFill();
  }
  get fillColor() {
    return this.fill.color;
  }
  set fillColor(value) {
    this.fill.load({
      color: value
    });
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.fill !== undefined || data.fillColor !== undefined) {
      this.fill.load(data.fill || {
        color: data.fillColor
      });
    }
    if (data.length !== undefined) {
      this.length = data.length;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/OutModes.js
class OutModes {
  constructor() {
    this.default = "out";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.default !== undefined) {
      this.default = data.default;
    }
    this.bottom = data.bottom ?? data.default;
    this.left = data.left ?? data.default;
    this.right = data.right ?? data.default;
    this.top = data.top ?? data.default;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/Spin.js


class Spin {
  constructor() {
    this.acceleration = 0;
    this.enable = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.acceleration !== undefined) {
      this.acceleration = setRangeValue(data.acceleration);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.position) {
      this.position = deepExtend({}, data.position);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/Move.js










class Move {
  constructor() {
    this.angle = new MoveAngle();
    this.attract = new MoveAttract();
    this.center = new MoveCenter();
    this.decay = 0;
    this.distance = {};
    this.direction = "none";
    this.drift = 0;
    this.enable = false;
    this.gravity = new MoveGravity();
    this.path = new MovePath();
    this.outModes = new OutModes();
    this.random = false;
    this.size = false;
    this.speed = 2;
    this.spin = new Spin();
    this.straight = false;
    this.trail = new MoveTrail();
    this.vibrate = false;
    this.warp = false;
  }
  get bounce() {
    return this.collisions;
  }
  set bounce(value) {
    this.collisions = value;
  }
  get collisions() {
    return false;
  }
  set collisions(_) {}
  get noise() {
    return this.path;
  }
  set noise(value) {
    this.path = value;
  }
  get outMode() {
    return this.outModes.default;
  }
  set outMode(value) {
    this.outModes.default = value;
  }
  get out_mode() {
    return this.outMode;
  }
  set out_mode(value) {
    this.outMode = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.angle.load(isNumber(data.angle) ? {
      value: data.angle
    } : data.angle);
    this.attract.load(data.attract);
    this.center.load(data.center);
    if (data.decay !== undefined) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.direction !== undefined) {
      this.direction = data.direction;
    }
    if (data.distance !== undefined) {
      this.distance = isNumber(data.distance) ? {
        horizontal: data.distance,
        vertical: data.distance
      } : {
        ...data.distance
      };
    }
    if (data.drift !== undefined) {
      this.drift = setRangeValue(data.drift);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    this.gravity.load(data.gravity);
    const outModes = data.outModes ?? data.outMode ?? data.out_mode;
    if (outModes !== undefined) {
      if (isObject(outModes)) {
        this.outModes.load(outModes);
      } else {
        this.outModes.load({
          default: outModes
        });
      }
    }
    this.path.load(data.path ?? data.noise);
    if (data.random !== undefined) {
      this.random = data.random;
    }
    if (data.size !== undefined) {
      this.size = data.size;
    }
    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }
    this.spin.load(data.spin);
    if (data.straight !== undefined) {
      this.straight = data.straight;
    }
    this.trail.load(data.trail);
    if (data.vibrate !== undefined) {
      this.vibrate = data.vibrate;
    }
    if (data.warp !== undefined) {
      this.warp = data.warp;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Opacity/OpacityAnimation.js

class OpacityAnimation extends RangedAnimationOptions {
  constructor() {
    super();
    this.destroy = "none";
    this.speed = 2;
  }
  get opacity_min() {
    return this.minimumValue;
  }
  set opacity_min(value) {
    this.minimumValue = value;
  }
  load(data) {
    if (data?.opacity_min !== undefined && data.minimumValue === undefined) {
      data.minimumValue = data.opacity_min;
    }
    super.load(data);
    if (!data) {
      return;
    }
    if (data.destroy !== undefined) {
      this.destroy = data.destroy;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Opacity/Opacity.js



class Opacity extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new OpacityAnimation();
    this.random.minimumValue = 0.1;
    this.value = 1;
  }
  get anim() {
    return this.animation;
  }
  set anim(value) {
    this.animation = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    const animation = data.animation ?? data.anim;
    if (animation !== undefined) {
      this.animation.load(animation);
      this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Number/ParticlesDensity.js
class ParticlesDensity {
  constructor() {
    this.enable = false;
    this.width = 1920;
    this.height = 1080;
  }
  get area() {
    return this.width;
  }
  set area(value) {
    this.width = value;
  }
  get factor() {
    return this.height;
  }
  set factor(value) {
    this.height = value;
  }
  get value_area() {
    return this.area;
  }
  set value_area(value) {
    this.area = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    const width = data.width ?? data.area ?? data.value_area;
    if (width !== undefined) {
      this.width = width;
    }
    const height = data.height ?? data.factor;
    if (height !== undefined) {
      this.height = height;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Number/ParticlesNumber.js

class ParticlesNumber {
  constructor() {
    this.density = new ParticlesDensity();
    this.limit = 0;
    this.value = 0;
  }
  get max() {
    return this.limit;
  }
  set max(value) {
    this.limit = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.density.load(data.density);
    const limit = data.limit ?? data.max;
    if (limit !== undefined) {
      this.limit = limit;
    }
    if (data.value !== undefined) {
      this.value = data.value;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Shadow.js

class Shadow {
  constructor() {
    this.blur = 0;
    this.color = new OptionsColor();
    this.enable = false;
    this.offset = {
      x: 0,
      y: 0
    };
    this.color.value = "#000";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.blur !== undefined) {
      this.blur = data.blur;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.offset === undefined) {
      return;
    }
    if (data.offset.x !== undefined) {
      this.offset.x = data.offset.x;
    }
    if (data.offset.y !== undefined) {
      this.offset.y = data.offset.y;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Shape/Shape.js

const charKey = "character",
  charAltKey = "char",
  imageKey = "image",
  imageAltKey = "images",
  polygonKey = "polygon",
  polygonAltKey = "star";
class Shape {
  constructor() {
    this.loadShape = (item, mainKey, altKey, altOverride) => {
      if (!item) {
        return;
      }
      const itemIsArray = isArray(item),
        emptyValue = itemIsArray ? [] : {},
        mainDifferentValues = itemIsArray !== isArray(this.options[mainKey]),
        altDifferentValues = itemIsArray !== isArray(this.options[altKey]);
      if (mainDifferentValues) {
        this.options[mainKey] = emptyValue;
      }
      if (altDifferentValues && altOverride) {
        this.options[altKey] = emptyValue;
      }
      this.options[mainKey] = deepExtend(this.options[mainKey] ?? emptyValue, item);
      if (!this.options[altKey] || altOverride) {
        this.options[altKey] = deepExtend(this.options[altKey] ?? emptyValue, item);
      }
    };
    this.close = true;
    this.fill = true;
    this.options = {};
    this.type = "circle";
  }
  get character() {
    return this.options[charKey] ?? this.options[charAltKey];
  }
  set character(value) {
    this.options[charAltKey] = this.options[charKey] = value;
  }
  get custom() {
    return this.options;
  }
  set custom(value) {
    this.options = value;
  }
  get image() {
    return this.options[imageKey] ?? this.options[imageAltKey];
  }
  set image(value) {
    this.options[imageAltKey] = this.options[imageKey] = value;
  }
  get images() {
    return this.image;
  }
  set images(value) {
    this.image = value;
  }
  get polygon() {
    return this.options[polygonKey] ?? this.options[polygonAltKey];
  }
  set polygon(value) {
    this.options[polygonAltKey] = this.options[polygonKey] = value;
  }
  get stroke() {
    return [];
  }
  set stroke(_value) {}
  load(data) {
    if (!data) {
      return;
    }
    const options = data.options ?? data.custom;
    if (options !== undefined) {
      for (const shape in options) {
        const item = options[shape];
        if (item) {
          this.options[shape] = deepExtend(this.options[shape] ?? {}, item);
        }
      }
    }
    this.loadShape(data.character, charKey, charAltKey, true);
    this.loadShape(data.polygon, polygonKey, polygonAltKey, false);
    this.loadShape(data.image ?? data.images, imageKey, imageAltKey, true);
    if (data.close !== undefined) {
      this.close = data.close;
    }
    if (data.fill !== undefined) {
      this.fill = data.fill;
    }
    if (data.type !== undefined) {
      this.type = data.type;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Size/SizeAnimation.js

class SizeAnimation extends RangedAnimationOptions {
  constructor() {
    super();
    this.destroy = "none";
    this.speed = 5;
  }
  get size_min() {
    return this.minimumValue;
  }
  set size_min(value) {
    this.minimumValue = value;
  }
  load(data) {
    if (data?.size_min !== undefined && data.minimumValue === undefined) {
      data.minimumValue = data.size_min;
    }
    super.load(data);
    if (!data) {
      return;
    }
    if (data.destroy !== undefined) {
      this.destroy = data.destroy;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Size/Size.js



class Size extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new SizeAnimation();
    this.random.minimumValue = 1;
    this.value = 3;
  }
  get anim() {
    return this.animation;
  }
  set anim(value) {
    this.animation = value;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    const animation = data.animation ?? data.anim;
    if (animation !== undefined) {
      this.animation.load(animation);
      this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Stroke.js


class Stroke {
  constructor() {
    this.width = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== undefined) {
      this.color = AnimatableColor.create(this.color, data.color);
    }
    if (data.width !== undefined) {
      this.width = setRangeValue(data.width);
    }
    if (data.opacity !== undefined) {
      this.opacity = setRangeValue(data.opacity);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/ZIndex/ZIndex.js

class ZIndex extends ValueWithRandom {
  constructor() {
    super();
    this.opacityRate = 1;
    this.sizeRate = 1;
    this.velocityRate = 1;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.opacityRate !== undefined) {
      this.opacityRate = data.opacityRate;
    }
    if (data.sizeRate !== undefined) {
      this.sizeRate = data.sizeRate;
    }
    if (data.velocityRate !== undefined) {
      this.velocityRate = data.velocityRate;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/ParticlesOptions.js












class ParticlesOptions {
  constructor(engine, container) {
    this._engine = engine;
    this._container = container;
    this.bounce = new ParticlesBounce();
    this.collisions = new Collisions();
    this.color = new AnimatableColor();
    this.color.value = "#fff";
    this.groups = {};
    this.move = new Move();
    this.number = new ParticlesNumber();
    this.opacity = new Opacity();
    this.reduceDuplicates = false;
    this.shadow = new Shadow();
    this.shape = new Shape();
    this.size = new Size();
    this.stroke = new Stroke();
    this.zIndex = new ZIndex();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.bounce.load(data.bounce);
    this.color.load(AnimatableColor.create(this.color, data.color));
    if (data.groups !== undefined) {
      for (const group in data.groups) {
        const item = data.groups[group];
        if (item !== undefined) {
          this.groups[group] = deepExtend(this.groups[group] ?? {}, item);
        }
      }
    }
    this.move.load(data.move);
    this.number.load(data.number);
    this.opacity.load(data.opacity);
    if (data.reduceDuplicates !== undefined) {
      this.reduceDuplicates = data.reduceDuplicates;
    }
    this.shape.load(data.shape);
    this.size.load(data.size);
    this.shadow.load(data.shadow);
    this.zIndex.load(data.zIndex);
    const collisions = data.move?.collisions ?? data.move?.bounce;
    if (collisions !== undefined) {
      this.collisions.enable = collisions;
    }
    this.collisions.load(data.collisions);
    if (data.interactivity !== undefined) {
      this.interactivity = deepExtend({}, data.interactivity);
    }
    const strokeToLoad = data.stroke ?? data.shape?.stroke;
    if (strokeToLoad) {
      this.stroke = executeOnSingleOrMultiple(strokeToLoad, t => {
        const tmp = new Stroke();
        tmp.load(t);
        return tmp;
      });
    }
    if (this._container) {
      const updaters = this._engine.plugins.updaters.get(this._container);
      if (updaters) {
        for (const updater of updaters) {
          if (updater.loadOptions) {
            updater.loadOptions(this, data);
          }
        }
      }
      const interactors = this._engine.plugins.interactors.get(this._container);
      if (interactors) {
        for (const interactor of interactors) {
          if (interactor.loadParticlesOptions) {
            interactor.loadParticlesOptions(this, data);
          }
        }
      }
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/OptionsUtils.js

function loadOptions(options, ...sourceOptionsArr) {
  for (const sourceOptions of sourceOptionsArr) {
    options.load(sourceOptions);
  }
}
function loadParticlesOptions(engine, container, ...sourceOptionsArr) {
  const options = new ParticlesOptions(engine, container);
  loadOptions(options, ...sourceOptionsArr);
  return options;
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/esm/Utils.js

function addSplitParticle(engine, container, parent, splitParticlesOptions) {
  const destroyOptions = parent.options.destroy;
  if (!destroyOptions) {
    return;
  }
  const splitOptions = destroyOptions.split,
    options = loadParticlesOptions(engine, container, parent.options),
    factor = getValue(splitOptions.factor),
    parentColor = parent.getFillColor();
  if (splitOptions.color) {
    options.color.load(splitOptions.color);
  } else if (splitOptions.colorOffset && parentColor) {
    options.color.load({
      value: {
        hsl: {
          h: parentColor.h + getRangeValue(splitOptions.colorOffset.h ?? 0),
          s: parentColor.s + getRangeValue(splitOptions.colorOffset.s ?? 0),
          l: parentColor.l + getRangeValue(splitOptions.colorOffset.l ?? 0)
        }
      }
    });
  } else {
    options.color.load({
      value: {
        hsl: parent.getFillColor()
      }
    });
  }
  options.move.load({
    center: {
      x: parent.position.x,
      y: parent.position.y,
      mode: "precise"
    }
  });
  if (isNumber(options.size.value)) {
    options.size.value /= factor;
  } else {
    options.size.value.min /= factor;
    options.size.value.max /= factor;
  }
  options.load(splitParticlesOptions);
  const offset = splitOptions.sizeOffset ? setRangeValue(-parent.size.value, parent.size.value) : 0,
    position = {
      x: parent.position.x + randomInRange(offset),
      y: parent.position.y + randomInRange(offset)
    };
  return container.particles.addParticle(position, options, parent.group, particle => {
    if (particle.size.value < 0.5) {
      return false;
    }
    particle.velocity.length = randomInRange(setRangeValue(parent.velocity.length, particle.velocity.length));
    particle.splitCount = (parent.splitCount ?? 0) + 1;
    particle.unbreakable = true;
    setTimeout(() => {
      particle.unbreakable = false;
    }, 500);
    return true;
  });
}
function split(engine, container, particle) {
  const destroyOptions = particle.options.destroy;
  if (!destroyOptions) {
    return;
  }
  const splitOptions = destroyOptions.split;
  if (splitOptions.count >= 0 && (particle.splitCount === undefined || particle.splitCount++ > splitOptions.count)) {
    return;
  }
  const rate = getValue(splitOptions.rate),
    particlesSplitOptions = itemFromSingleOrMultiple(splitOptions.particles);
  for (let i = 0; i < rate; i++) {
    addSplitParticle(engine, container, particle, particlesSplitOptions);
  }
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/esm/DestroyUpdater.js



class DestroyUpdater {
  constructor(engine, container) {
    this.engine = engine;
    this.container = container;
  }
  init(particle) {
    const container = this.container,
      particlesOptions = particle.options,
      destroyOptions = particlesOptions.destroy;
    if (!destroyOptions) {
      return;
    }
    particle.splitCount = 0;
    const destroyBoundsOptions = destroyOptions.bounds;
    if (!particle.destroyBounds) {
      particle.destroyBounds = {};
    }
    const {
        bottom,
        left,
        right,
        top
      } = destroyBoundsOptions,
      {
        destroyBounds
      } = particle,
      canvasSize = container.canvas.size;
    if (bottom) {
      destroyBounds.bottom = getRangeValue(bottom) * canvasSize.height / 100;
    }
    if (left) {
      destroyBounds.left = getRangeValue(left) * canvasSize.width / 100;
    }
    if (right) {
      destroyBounds.right = getRangeValue(right) * canvasSize.width / 100;
    }
    if (top) {
      destroyBounds.top = getRangeValue(top) * canvasSize.height / 100;
    }
  }
  isEnabled(particle) {
    return !particle.destroyed;
  }
  loadOptions(options, ...sources) {
    if (!options.destroy) {
      options.destroy = new Destroy();
    }
    for (const source of sources) {
      options.destroy.load(source?.destroy);
    }
  }
  particleDestroyed(particle, override) {
    if (override) {
      return;
    }
    const destroyOptions = particle.options.destroy;
    if (destroyOptions && destroyOptions.mode === "split") {
      split(this.engine, this.container, particle);
    }
  }
  update(particle) {
    if (!this.isEnabled(particle)) {
      return;
    }
    const position = particle.getPosition(),
      bounds = particle.destroyBounds;
    if (!bounds) {
      return;
    }
    if (bounds.bottom !== undefined && position.y >= bounds.bottom || bounds.left !== undefined && position.x <= bounds.left || bounds.right !== undefined && position.x >= bounds.right || bounds.top !== undefined && position.y <= bounds.top) {
      particle.destroy();
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/esm/index.js

async function loadDestroyUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("destroy", container => new DestroyUpdater(engine, container), refresh);
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/esm/Shapes/Circle/CircleShape.js

class CircleShape {
  randomPosition(position, size, fill) {
    const generateTheta = (x, y) => {
        const u = getRandom() / 4.0,
          theta = Math.atan(y / x * Math.tan(2 * Math.PI * u)),
          v = getRandom();
        if (v < 0.25) {
          return theta;
        } else if (v < 0.5) {
          return Math.PI - theta;
        } else if (v < 0.75) {
          return Math.PI + theta;
        } else {
          return -theta;
        }
      },
      radius = (x, y, theta) => x * y / Math.sqrt((y * Math.cos(theta)) ** 2 + (x * Math.sin(theta)) ** 2),
      [a, b] = [size.width / 2, size.height / 2],
      randomTheta = generateTheta(a, b),
      maxRadius = radius(a, b, randomTheta),
      randomRadius = fill ? maxRadius * Math.sqrt(getRandom()) : maxRadius;
    return {
      x: position.x + randomRadius * Math.cos(randomTheta),
      y: position.y + randomRadius * Math.sin(randomTheta)
    };
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/esm/Options/Classes/EmitterLife.js

class EmitterLife {
  constructor() {
    this.wait = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== undefined) {
      this.count = data.count;
    }
    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
    if (data.duration !== undefined) {
      this.duration = setRangeValue(data.duration);
    }
    if (data.wait !== undefined) {
      this.wait = data.wait;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/esm/Options/Classes/EmitterRate.js

class EmitterRate {
  constructor() {
    this.quantity = 1;
    this.delay = 0.1;
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (data.quantity !== undefined) {
      this.quantity = setRangeValue(data.quantity);
    }
    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/esm/Options/Classes/EmitterSize.js
class EmitterSize {
  constructor() {
    this.mode = "percent";
    this.height = 0;
    this.width = 0;
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
    if (data.height !== undefined) {
      this.height = data.height;
    }
    if (data.width !== undefined) {
      this.width = data.width;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/esm/Options/Classes/Emitter.js




class Emitter {
  constructor() {
    this.autoPlay = true;
    this.fill = true;
    this.life = new EmitterLife();
    this.rate = new EmitterRate();
    this.shape = "square";
    this.startCount = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.autoPlay !== undefined) {
      this.autoPlay = data.autoPlay;
    }
    if (data.size !== undefined) {
      if (!this.size) {
        this.size = new EmitterSize();
      }
      this.size.load(data.size);
    }
    if (data.direction !== undefined) {
      this.direction = data.direction;
    }
    this.domId = data.domId;
    if (data.fill !== undefined) {
      this.fill = data.fill;
    }
    this.life.load(data.life);
    this.name = data.name;
    this.particles = executeOnSingleOrMultiple(data.particles, particles => {
      return deepExtend({}, particles);
    });
    this.rate.load(data.rate);
    if (data.shape !== undefined) {
      this.shape = data.shape;
    }
    if (data.position !== undefined) {
      this.position = {};
      if (data.position.x !== undefined) {
        this.position.x = setRangeValue(data.position.x);
      }
      if (data.position.y !== undefined) {
        this.position.y = setRangeValue(data.position.y);
      }
    }
    if (data.spawnColor !== undefined) {
      if (this.spawnColor === undefined) {
        this.spawnColor = new AnimatableColor();
      }
      this.spawnColor.load(data.spawnColor);
    }
    if (data.startCount !== undefined) {
      this.startCount = data.startCount;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/esm/EmitterInstance.js



class EmitterInstance {
  constructor(engine, emitters, container, options, position) {
    this.emitters = emitters;
    this.container = container;
    this._calcPosition = () => {
      return calcPositionOrRandomFromSizeRanged({
        size: this.container.canvas.size,
        position: this.options.position
      });
    };
    this._destroy = () => {
      this.emitters.removeEmitter(this);
      this._engine.dispatchEvent("emitterDestroyed", {
        container: this.container,
        data: {
          emitter: this
        }
      });
    };
    this._emit = () => {
      if (this._paused) {
        return;
      }
      const quantity = getRangeValue(this.options.rate.quantity);
      this._emitParticles(quantity);
    };
    this._emitParticles = quantity => {
      const position = this.getPosition(),
        size = this.getSize(),
        singleParticlesOptions = itemFromSingleOrMultiple(this._particlesOptions);
      for (let i = 0; i < quantity; i++) {
        const particlesOptions = deepExtend({}, singleParticlesOptions);
        if (this.spawnColor) {
          const hslAnimation = this.options.spawnColor?.animation;
          if (hslAnimation) {
            this.spawnColor.h = this._setColorAnimation(hslAnimation.h, this.spawnColor.h, 360);
            this.spawnColor.s = this._setColorAnimation(hslAnimation.s, this.spawnColor.s, 100);
            this.spawnColor.l = this._setColorAnimation(hslAnimation.l, this.spawnColor.l, 100);
          }
          if (!particlesOptions.color) {
            particlesOptions.color = {
              value: this.spawnColor
            };
          } else {
            particlesOptions.color.value = this.spawnColor;
          }
        }
        if (!position) {
          return;
        }
        const pPosition = this._shape?.randomPosition(position, size, this.fill) ?? position;
        this.container.particles.addParticle(pPosition, particlesOptions);
      }
    };
    this._prepareToDie = () => {
      if (this._paused) {
        return;
      }
      const duration = this.options.life?.duration !== undefined ? getRangeValue(this.options.life.duration) : undefined;
      if (this.container.retina.reduceFactor && (this._lifeCount > 0 || this._immortal) && duration !== undefined && duration > 0) {
        this._duration = duration * 1000;
      }
    };
    this._setColorAnimation = (animation, initValue, maxValue) => {
      const container = this.container;
      if (!animation.enable) {
        return initValue;
      }
      const colorOffset = randomInRange(animation.offset),
        delay = getRangeValue(this.options.rate.delay),
        emitFactor = 1000 * delay / container.retina.reduceFactor,
        colorSpeed = getRangeValue(animation.speed ?? 0);
      return (initValue + colorSpeed * container.fpsLimit / emitFactor + colorOffset * 3.6) % maxValue;
    };
    this._engine = engine;
    this._currentDuration = 0;
    this._currentEmitDelay = 0;
    this._currentSpawnDelay = 0;
    this._initialPosition = position;
    if (options instanceof Emitter) {
      this.options = options;
    } else {
      this.options = new Emitter();
      this.options.load(options);
    }
    this._spawnDelay = getRangeValue(this.options.life.delay ?? 0) * 1000 / this.container.retina.reduceFactor;
    this.position = this._initialPosition ?? this._calcPosition();
    this.name = this.options.name;
    this._shape = this._engine.emitterShapeManager?.getShape(this.options.shape);
    this.fill = this.options.fill;
    this._firstSpawn = !this.options.life.wait;
    this._startParticlesAdded = false;
    let particlesOptions = deepExtend({}, this.options.particles);
    particlesOptions ??= {};
    particlesOptions.move ??= {};
    particlesOptions.move.direction ??= this.options.direction;
    if (this.options.spawnColor) {
      this.spawnColor = rangeColorToHsl(this.options.spawnColor);
    }
    this._paused = !this.options.autoPlay;
    this._particlesOptions = particlesOptions;
    this.size = this.options.size ?? (() => {
      const size = new EmitterSize();
      size.load({
        height: 0,
        mode: "percent",
        width: 0
      });
      return size;
    })();
    this._lifeCount = this.options.life.count ?? -1;
    this._immortal = this._lifeCount <= 0;
    this._engine.dispatchEvent("emitterCreated", {
      container,
      data: {
        emitter: this
      }
    });
    this.play();
  }
  externalPause() {
    this._paused = true;
    this.pause();
  }
  externalPlay() {
    this._paused = false;
    this.play();
  }
  getPosition() {
    if (this.options.domId) {
      const container = this.container,
        element = document.getElementById(this.options.domId);
      if (element) {
        const elRect = element.getBoundingClientRect();
        return {
          x: (elRect.x + elRect.width / 2) * container.retina.pixelRatio,
          y: (elRect.y + elRect.height / 2) * container.retina.pixelRatio
        };
      }
    }
    return this.position;
  }
  getSize() {
    const container = this.container;
    if (this.options.domId) {
      const element = document.getElementById(this.options.domId);
      if (element) {
        const elRect = element.getBoundingClientRect();
        return {
          width: elRect.width * container.retina.pixelRatio,
          height: elRect.height * container.retina.pixelRatio
        };
      }
    }
    return getSize(this.size, container.canvas.size);
  }
  pause() {
    if (this._paused) {
      return;
    }
    delete this._emitDelay;
  }
  play() {
    if (this._paused) {
      return;
    }
    if (!(this.container.retina.reduceFactor && (this._lifeCount > 0 || this._immortal || !this.options.life.count) && (this._firstSpawn || this._currentSpawnDelay >= (this._spawnDelay ?? 0)))) {
      return;
    }
    if (this._emitDelay === undefined) {
      const delay = getRangeValue(this.options.rate.delay);
      this._emitDelay = 1000 * delay / this.container.retina.reduceFactor;
    }
    if (this._lifeCount > 0 || this._immortal) {
      this._prepareToDie();
    }
  }
  resize() {
    const initialPosition = this._initialPosition;
    this.position = initialPosition && isPointInside(initialPosition, this.container.canvas.size, Vector.origin) ? initialPosition : this._calcPosition();
  }
  update(delta) {
    if (this._paused) {
      return;
    }
    if (this._firstSpawn) {
      this._firstSpawn = false;
      this._currentSpawnDelay = this._spawnDelay ?? 0;
      this._currentEmitDelay = this._emitDelay ?? 0;
    }
    if (!this._startParticlesAdded) {
      this._startParticlesAdded = true;
      this._emitParticles(this.options.startCount);
    }
    if (this._duration !== undefined) {
      this._currentDuration += delta.value;
      if (this._currentDuration >= this._duration) {
        this.pause();
        if (this._spawnDelay !== undefined) {
          delete this._spawnDelay;
        }
        if (!this._immortal) {
          this._lifeCount--;
        }
        if (this._lifeCount > 0 || this._immortal) {
          this.position = this._calcPosition();
          this._spawnDelay = getRangeValue(this.options.life.delay ?? 0) * 1000 / this.container.retina.reduceFactor;
        } else {
          this._destroy();
        }
        this._currentDuration -= this._duration;
        delete this._duration;
      }
    }
    if (this._spawnDelay !== undefined) {
      this._currentSpawnDelay += delta.value;
      if (this._currentSpawnDelay >= this._spawnDelay) {
        this._engine.dispatchEvent("emitterPlay", {
          container: this.container
        });
        this.play();
        this._currentSpawnDelay -= this._currentSpawnDelay;
        delete this._spawnDelay;
      }
    }
    if (this._emitDelay !== undefined) {
      this._currentEmitDelay += delta.value;
      if (this._currentEmitDelay >= this._emitDelay) {
        this._emit();
        this._currentEmitDelay -= this._emitDelay;
      }
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/esm/Emitters.js



class Emitters {
  constructor(engine, container) {
    this.container = container;
    this._engine = engine;
    this.array = [];
    this.emitters = [];
    this.interactivityEmitters = {
      random: {
        count: 1,
        enable: false
      },
      value: []
    };
    container.getEmitter = idxOrName => idxOrName === undefined || isNumber(idxOrName) ? this.array[idxOrName || 0] : this.array.find(t => t.name === idxOrName);
    container.addEmitter = (options, position) => this.addEmitter(options, position);
    container.removeEmitter = idxOrName => {
      const emitter = container.getEmitter(idxOrName);
      if (emitter) {
        this.removeEmitter(emitter);
      }
    };
    container.playEmitter = idxOrName => {
      const emitter = container.getEmitter(idxOrName);
      if (emitter) {
        emitter.externalPlay();
      }
    };
    container.pauseEmitter = idxOrName => {
      const emitter = container.getEmitter(idxOrName);
      if (emitter) {
        emitter.externalPause();
      }
    };
  }
  addEmitter(options, position) {
    const emitterOptions = new Emitter();
    emitterOptions.load(options);
    const emitter = new EmitterInstance(this._engine, this, this.container, emitterOptions, position);
    this.array.push(emitter);
    return emitter;
  }
  handleClickMode(mode) {
    const emitterOptions = this.emitters,
      modeEmitters = this.interactivityEmitters;
    if (mode !== "emitter") {
      return;
    }
    let emittersModeOptions;
    if (modeEmitters && isArray(modeEmitters.value)) {
      if (modeEmitters.value.length > 0 && modeEmitters.random.enable) {
        emittersModeOptions = [];
        const usedIndexes = [];
        for (let i = 0; i < modeEmitters.random.count; i++) {
          const idx = arrayRandomIndex(modeEmitters.value);
          if (usedIndexes.includes(idx) && usedIndexes.length < modeEmitters.value.length) {
            i--;
            continue;
          }
          usedIndexes.push(idx);
          emittersModeOptions.push(itemFromArray(modeEmitters.value, idx));
        }
      } else {
        emittersModeOptions = modeEmitters.value;
      }
    } else {
      emittersModeOptions = modeEmitters?.value;
    }
    const emittersOptions = emittersModeOptions ?? emitterOptions,
      ePosition = this.container.interactivity.mouse.clickPosition;
    executeOnSingleOrMultiple(emittersOptions, emitter => {
      this.addEmitter(emitter, ePosition);
    });
  }
  async init() {
    this.emitters = this.container.actualOptions.emitters;
    this.interactivityEmitters = this.container.actualOptions.interactivity.modes.emitters;
    if (!this.emitters) {
      return;
    }
    if (isArray(this.emitters)) {
      for (const emitterOptions of this.emitters) {
        this.addEmitter(emitterOptions);
      }
    } else {
      this.addEmitter(this.emitters);
    }
  }
  pause() {
    for (const emitter of this.array) {
      emitter.pause();
    }
  }
  play() {
    for (const emitter of this.array) {
      emitter.play();
    }
  }
  removeEmitter(emitter) {
    const index = this.array.indexOf(emitter);
    if (index >= 0) {
      this.array.splice(index, 1);
    }
  }
  resize() {
    for (const emitter of this.array) {
      emitter.resize();
    }
  }
  stop() {
    this.array = [];
  }
  update(delta) {
    for (const emitter of this.array) {
      emitter.update(delta);
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/esm/ShapeManager.js
const shapes = new Map();
class ShapeManager {
  constructor(engine) {
    this._engine = engine;
  }
  addShape(name, drawer) {
    if (!this.getShape(name)) {
      shapes.set(name, drawer);
    }
  }
  getShape(name) {
    return shapes.get(name);
  }
  getSupportedShapes() {
    return shapes.keys();
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/esm/Shapes/Square/SquareShape.js

function randomSquareCoordinate(position, offset) {
  return position + offset * (getRandom() - 0.5);
}
class SquareShape {
  randomPosition(position, size, fill) {
    if (fill) {
      return {
        x: randomSquareCoordinate(position.x, size.width),
        y: randomSquareCoordinate(position.y, size.height)
      };
    } else {
      const halfW = size.width / 2,
        halfH = size.height / 2,
        side = Math.floor(getRandom() * 4),
        v = (getRandom() - 0.5) * 2;
      switch (side) {
        case 0:
          return {
            x: position.x + v * halfW,
            y: position.y - halfH
          };
        case 1:
          return {
            x: position.x - halfW,
            y: position.y + v * halfH
          };
        case 2:
          return {
            x: position.x + v * halfW,
            y: position.y + halfH
          };
        case 3:
        default:
          return {
            x: position.x + halfW,
            y: position.y + v * halfH
          };
      }
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/esm/index.js






class EmittersPlugin {
  constructor(engine) {
    this._engine = engine;
    this.id = "emitters";
  }
  getPlugin(container) {
    return new Emitters(this._engine, container);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }
    if (source?.emitters) {
      options.emitters = executeOnSingleOrMultiple(source.emitters, emitter => {
        const tmp = new Emitter();
        tmp.load(emitter);
        return tmp;
      });
    }
    const interactivityEmitters = source?.interactivity?.modes?.emitters;
    if (interactivityEmitters) {
      if (isArray(interactivityEmitters)) {
        options.interactivity.modes.emitters = {
          random: {
            count: 1,
            enable: true
          },
          value: interactivityEmitters.map(s => {
            const tmp = new Emitter();
            tmp.load(s);
            return tmp;
          })
        };
      } else {
        const emitterMode = interactivityEmitters;
        if (emitterMode.value !== undefined) {
          if (isArray(emitterMode.value)) {
            options.interactivity.modes.emitters = {
              random: {
                count: emitterMode.random.count ?? 1,
                enable: emitterMode.random.enable ?? false
              },
              value: emitterMode.value.map(s => {
                const tmp = new Emitter();
                tmp.load(s);
                return tmp;
              })
            };
          } else {
            const tmp = new Emitter();
            tmp.load(emitterMode.value);
            options.interactivity.modes.emitters = {
              random: {
                count: emitterMode.random.count ?? 1,
                enable: emitterMode.random.enable ?? false
              },
              value: tmp
            };
          }
        } else {
          const emitterOptions = options.interactivity.modes.emitters = {
            random: {
              count: 1,
              enable: false
            },
            value: new Emitter()
          };
          emitterOptions.value.load(interactivityEmitters);
        }
      }
    }
  }
  needsPlugin(options) {
    if (!options) {
      return false;
    }
    const emitters = options.emitters;
    return isArray(emitters) && !!emitters.length || emitters !== undefined || !!options.interactivity?.events?.onClick?.mode && isInArray("emitter", options.interactivity.events.onClick.mode);
  }
}
async function loadEmittersPlugin(engine, refresh = true) {
  if (!engine.emitterShapeManager) {
    engine.emitterShapeManager = new ShapeManager(engine);
  }
  if (!engine.addEmitterShape) {
    engine.addEmitterShape = (name, shape) => {
      engine.emitterShapeManager?.addShape(name, shape);
    };
  }
  const plugin = new EmittersPlugin(engine);
  await engine.addPlugin(plugin, refresh);
  engine.addEmitterShape("circle", new CircleShape());
  engine.addEmitterShape("square", new SquareShape());
}




;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/ExternalInteractorBase.js
class ExternalInteractorBase {
  constructor(container) {
    this.container = container;
    this.type = "external";
  }
}
;// CONCATENATED MODULE: ../../interactions/external/trail/dist/esm/Options/Classes/Trail.js

class Trail {
  constructor() {
    this.delay = 1;
    this.pauseOnStop = false;
    this.quantity = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.delay !== undefined) {
      this.delay = data.delay;
    }
    if (data.quantity !== undefined) {
      this.quantity = data.quantity;
    }
    if (data.particles !== undefined) {
      this.particles = deepExtend({}, data.particles);
    }
    if (data.pauseOnStop !== undefined) {
      this.pauseOnStop = data.pauseOnStop;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/trail/dist/esm/TrailMaker.js


class TrailMaker extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this._delay = 0;
  }
  clear() {}
  init() {}
  async interact(delta) {
    const container = this.container,
      {
        interactivity
      } = container;
    if (!container.retina.reduceFactor) {
      return;
    }
    const options = container.actualOptions,
      trailOptions = options.interactivity.modes.trail;
    if (!trailOptions) {
      return;
    }
    const optDelay = trailOptions.delay * 1000 / this.container.retina.reduceFactor;
    if (this._delay < optDelay) {
      this._delay += delta.value;
    }
    if (this._delay < optDelay) {
      return;
    }
    const canEmit = !(trailOptions.pauseOnStop && (interactivity.mouse.position === this._lastPosition || interactivity.mouse.position?.x === this._lastPosition?.x && interactivity.mouse.position?.y === this._lastPosition?.y));
    const mousePos = container.interactivity.mouse.position;
    if (mousePos) {
      this._lastPosition = {
        ...mousePos
      };
    } else {
      delete this._lastPosition;
    }
    if (canEmit) {
      container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
    }
    this._delay -= optDelay;
  }
  isEnabled(particle) {
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? options.interactivity).events;
    return mouse.clicking && mouse.inside && !!mouse.position && isInArray("trail", events.onClick.mode) || mouse.inside && !!mouse.position && isInArray("trail", events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.trail) {
      options.trail = new Trail();
    }
    for (const source of sources) {
      options.trail.load(source?.trail);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/trail/dist/esm/index.js

async function loadExternalTrailInteraction(engine, refresh = true) {
  await engine.addInteractor("externalTrail", container => new TrailMaker(container), refresh);
}


;// CONCATENATED MODULE: ../../updaters/roll/dist/esm/Utils.js

function initParticle(particle) {
  const rollOpt = particle.options.roll;
  if (!rollOpt?.enable) {
    particle.roll = {
      enable: false,
      horizontal: false,
      vertical: false,
      angle: 0,
      speed: 0
    };
    return;
  }
  particle.roll = {
    enable: rollOpt.enable,
    horizontal: rollOpt.mode === "horizontal" || rollOpt.mode === "both",
    vertical: rollOpt.mode === "vertical" || rollOpt.mode === "both",
    angle: getRandom() * Math.PI * 2,
    speed: getRangeValue(rollOpt.speed) / 360
  };
  if (rollOpt.backColor) {
    particle.backColor = rangeColorToHsl(rollOpt.backColor);
  } else if (rollOpt.darken.enable && rollOpt.enlighten.enable) {
    const alterType = getRandom() >= 0.5 ? "darken" : "enlighten";
    particle.roll.alter = {
      type: alterType,
      value: getRangeValue(alterType === "darken" ? rollOpt.darken.value : rollOpt.enlighten.value)
    };
  } else if (rollOpt.darken.enable) {
    particle.roll.alter = {
      type: "darken",
      value: getRangeValue(rollOpt.darken.value)
    };
  } else if (rollOpt.enlighten.enable) {
    particle.roll.alter = {
      type: "enlighten",
      value: getRangeValue(rollOpt.enlighten.value)
    };
  }
}
function updateRoll(particle, delta) {
  const roll = particle.options.roll,
    data = particle.roll;
  if (!data || !roll?.enable) {
    return;
  }
  const speed = data.speed * delta.factor,
    max = 2 * Math.PI;
  data.angle += speed;
  if (data.angle > max) {
    data.angle -= max;
  }
}
;// CONCATENATED MODULE: ../../updaters/roll/dist/esm/Options/Classes/RollLight.js

class RollLight {
  constructor() {
    this.enable = false;
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.value !== undefined) {
      this.value = setRangeValue(data.value);
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/roll/dist/esm/Options/Classes/Roll.js


class Roll {
  constructor() {
    this.darken = new RollLight();
    this.enable = false;
    this.enlighten = new RollLight();
    this.mode = "vertical";
    this.speed = 25;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.backColor !== undefined) {
      this.backColor = OptionsColor.create(this.backColor, data.backColor);
    }
    this.darken.load(data.darken);
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    this.enlighten.load(data.enlighten);
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/roll/dist/esm/RollUpdater.js


class RollUpdater {
  getTransformValues(particle) {
    const roll = particle.roll?.enable && particle.roll,
      rollHorizontal = roll && roll.horizontal,
      rollVertical = roll && roll.vertical;
    return {
      a: rollHorizontal ? Math.cos(roll.angle) : undefined,
      d: rollVertical ? Math.sin(roll.angle) : undefined
    };
  }
  init(particle) {
    initParticle(particle);
  }
  isEnabled(particle) {
    const roll = particle.options.roll;
    return !particle.destroyed && !particle.spawning && !!roll?.enable;
  }
  loadOptions(options, ...sources) {
    if (!options.roll) {
      options.roll = new Roll();
    }
    for (const source of sources) {
      options.roll.load(source?.roll);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateRoll(particle, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/roll/dist/esm/index.js

async function loadRollUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("roll", () => new RollUpdater(), refresh);
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/CanvasUtils.js

function drawLine(context, begin, end) {
  context.beginPath();
  context.moveTo(begin.x, begin.y);
  context.lineTo(end.x, end.y);
  context.closePath();
}
function drawTriangle(context, p1, p2, p3) {
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.lineTo(p3.x, p3.y);
  context.closePath();
}
function paintBase(context, dimension, baseColor) {
  context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
  context.fillRect(0, 0, dimension.width, dimension.height);
}
function paintImage(context, dimension, image, opacity) {
  if (!image) {
    return;
  }
  context.globalAlpha = opacity;
  context.drawImage(image, 0, 0, dimension.width, dimension.height);
  context.globalAlpha = 1;
}
function clear(context, dimension) {
  context.clearRect(0, 0, dimension.width, dimension.height);
}
function drawParticle(data) {
  const {
    container,
    context,
    particle,
    delta,
    colorStyles,
    backgroundMask,
    composite,
    radius,
    opacity,
    shadow,
    transform
  } = data;
  const pos = particle.getPosition(),
    angle = particle.rotation + (particle.pathRotation ? particle.velocity.angle : 0),
    rotateData = {
      sin: Math.sin(angle),
      cos: Math.cos(angle)
    },
    transformData = {
      a: rotateData.cos * (transform.a ?? 1),
      b: rotateData.sin * (transform.b ?? 1),
      c: -rotateData.sin * (transform.c ?? 1),
      d: rotateData.cos * (transform.d ?? 1)
    };
  context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);
  context.beginPath();
  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }
  const shadowColor = particle.shadowColor;
  if (shadow.enable && shadowColor) {
    context.shadowBlur = shadow.blur;
    context.shadowColor = getStyleFromRgb(shadowColor);
    context.shadowOffsetX = shadow.offset.x;
    context.shadowOffsetY = shadow.offset.y;
  }
  if (colorStyles.fill) {
    context.fillStyle = colorStyles.fill;
  }
  const strokeWidth = particle.strokeWidth ?? 0;
  context.lineWidth = strokeWidth;
  if (colorStyles.stroke) {
    context.strokeStyle = colorStyles.stroke;
  }
  drawShape(container, context, particle, radius, opacity, delta);
  if (strokeWidth > 0) {
    context.stroke();
  }
  if (particle.close) {
    context.closePath();
  }
  if (particle.fill) {
    context.fill();
  }
  drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
  context.globalCompositeOperation = "source-over";
  context.setTransform(1, 0, 0, 1, 0, 0);
}
function drawShape(container, context, particle, radius, opacity, delta) {
  if (!particle.shape) {
    return;
  }
  const drawer = container.drawers.get(particle.shape);
  if (!drawer) {
    return;
  }
  drawer.draw(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}
function drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
  if (!particle.shape) {
    return;
  }
  const drawer = container.drawers.get(particle.shape);
  if (!drawer || !drawer.afterEffect) {
    return;
  }
  drawer.afterEffect(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}
function drawPlugin(context, plugin, delta) {
  if (!plugin.draw) {
    return;
  }
  plugin.draw(context, delta);
}
function drawParticlePlugin(context, plugin, particle, delta) {
  if (!plugin.drawParticle) {
    return;
  }
  plugin.drawParticle(context, particle, delta);
}
function alterHsl(color, type, value) {
  return {
    h: color.h,
    s: color.s,
    l: color.l + (type === "darken" ? -1 : 1) * value
  };
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Canvas.js




function setTransformValue(factor, newFactor, key) {
  const newValue = newFactor[key];
  if (newValue !== undefined) {
    factor[key] = (factor[key] ?? 1) * newValue;
  }
}
class Canvas {
  constructor(container) {
    this.container = container;
    this._applyPostDrawUpdaters = particle => {
      for (const updater of this._postDrawUpdaters) {
        updater.afterDraw && updater.afterDraw(particle);
      }
    };
    this._applyPreDrawUpdaters = (ctx, particle, radius, zOpacity, colorStyles, transform) => {
      for (const updater of this._preDrawUpdaters) {
        if (updater.getColorStyles) {
          const {
            fill,
            stroke
          } = updater.getColorStyles(particle, ctx, radius, zOpacity);
          if (fill) {
            colorStyles.fill = fill;
          }
          if (stroke) {
            colorStyles.stroke = stroke;
          }
        }
        if (updater.getTransformValues) {
          const updaterTransform = updater.getTransformValues(particle);
          for (const key in updaterTransform) {
            setTransformValue(transform, updaterTransform, key);
          }
        }
        updater.beforeDraw && updater.beforeDraw(particle);
      }
    };
    this._applyResizePlugins = () => {
      for (const plugin of this._resizePlugins) {
        plugin.resize && plugin.resize();
      }
    };
    this._getPluginParticleColors = particle => {
      let fColor, sColor;
      for (const plugin of this._colorPlugins) {
        if (!fColor && plugin.particleFillColor) {
          fColor = rangeColorToHsl(plugin.particleFillColor(particle));
        }
        if (!sColor && plugin.particleStrokeColor) {
          sColor = rangeColorToHsl(plugin.particleStrokeColor(particle));
        }
        if (fColor && sColor) {
          break;
        }
      }
      return [fColor, sColor];
    };
    this._initCover = () => {
      const options = this.container.actualOptions,
        cover = options.backgroundMask.cover,
        color = cover.color,
        coverRgb = rangeColorToRgb(color);
      if (coverRgb) {
        const coverColor = {
          ...coverRgb,
          a: cover.opacity
        };
        this._coverColorStyle = getStyleFromRgb(coverColor, coverColor.a);
      }
    };
    this._initStyle = () => {
      const element = this.element,
        options = this.container.actualOptions;
      if (!element) {
        return;
      }
      if (this._fullScreen) {
        this._originalStyle = deepExtend({}, element.style);
        this._setFullScreenStyle();
      } else {
        this._resetOriginalStyle();
      }
      for (const key in options.style) {
        if (!key || !options.style) {
          continue;
        }
        const value = options.style[key];
        if (!value) {
          continue;
        }
        element.style.setProperty(key, value, "important");
      }
    };
    this._initTrail = async () => {
      const options = this.container.actualOptions,
        trail = options.particles.move.trail,
        trailFill = trail.fill;
      if (!trail.enable) {
        return;
      }
      if (trailFill.color) {
        const fillColor = rangeColorToRgb(trailFill.color);
        if (!fillColor) {
          return;
        }
        const trail = options.particles.move.trail;
        this._trailFill = {
          color: {
            ...fillColor
          },
          opacity: 1 / trail.length
        };
      } else {
        await new Promise((resolve, reject) => {
          if (!trailFill.image) {
            return;
          }
          const img = document.createElement("img");
          img.addEventListener("load", () => {
            this._trailFill = {
              image: img,
              opacity: 1 / trail.length
            };
            resolve();
          });
          img.addEventListener("error", evt => {
            reject(evt.error);
          });
          img.src = trailFill.image;
        });
      }
    };
    this._paintBase = baseColor => {
      this.draw(ctx => paintBase(ctx, this.size, baseColor));
    };
    this._paintImage = (image, opacity) => {
      this.draw(ctx => paintImage(ctx, this.size, image, opacity));
    };
    this._repairStyle = () => {
      const element = this.element;
      if (!element) {
        return;
      }
      this._safeMutationObserver(observer => observer.disconnect());
      this._initStyle();
      this.initBackground();
      this._safeMutationObserver(observer => observer.observe(element, {
        attributes: true
      }));
    };
    this._resetOriginalStyle = () => {
      const element = this.element,
        originalStyle = this._originalStyle;
      if (!(element && originalStyle)) {
        return;
      }
      const style = element.style;
      style.position = originalStyle.position;
      style.zIndex = originalStyle.zIndex;
      style.top = originalStyle.top;
      style.left = originalStyle.left;
      style.width = originalStyle.width;
      style.height = originalStyle.height;
    };
    this._safeMutationObserver = callback => {
      if (!this._mutationObserver) {
        return;
      }
      callback(this._mutationObserver);
    };
    this._setFullScreenStyle = () => {
      const element = this.element;
      if (!element) {
        return;
      }
      const priority = "important",
        style = element.style;
      style.setProperty("position", "fixed", priority);
      style.setProperty("z-index", this.container.actualOptions.fullScreen.zIndex.toString(10), priority);
      style.setProperty("top", "0", priority);
      style.setProperty("left", "0", priority);
      style.setProperty("width", "100%", priority);
      style.setProperty("height", "100%", priority);
    };
    this.size = {
      height: 0,
      width: 0
    };
    this._context = null;
    this._generated = false;
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    this._resizePlugins = [];
    this._colorPlugins = [];
  }
  get _fullScreen() {
    return this.container.actualOptions.fullScreen.enable;
  }
  clear() {
    const options = this.container.actualOptions,
      trail = options.particles.move.trail,
      trailFill = this._trailFill;
    if (options.backgroundMask.enable) {
      this.paint();
    } else if (trail.enable && trail.length > 0 && trailFill) {
      if (trailFill.color) {
        this._paintBase(getStyleFromRgb(trailFill.color, trailFill.opacity));
      } else if (trailFill.image) {
        this._paintImage(trailFill.image, trailFill.opacity);
      }
    } else {
      this.draw(ctx => {
        clear(ctx, this.size);
      });
    }
  }
  destroy() {
    this.stop();
    if (this._generated) {
      const element = this.element;
      element && element.remove();
    } else {
      this._resetOriginalStyle();
    }
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    this._resizePlugins = [];
    this._colorPlugins = [];
  }
  draw(cb) {
    const ctx = this._context;
    if (!ctx) {
      return;
    }
    return cb(ctx);
  }
  drawParticle(particle, delta) {
    if (particle.spawning || particle.destroyed) {
      return;
    }
    const radius = particle.getRadius();
    if (radius <= 0) {
      return;
    }
    const pfColor = particle.getFillColor(),
      psColor = particle.getStrokeColor() ?? pfColor;
    let [fColor, sColor] = this._getPluginParticleColors(particle);
    if (!fColor) {
      fColor = pfColor;
    }
    if (!sColor) {
      sColor = psColor;
    }
    if (!fColor && !sColor) {
      return;
    }
    this.draw(ctx => {
      const container = this.container,
        options = container.actualOptions,
        zIndexOptions = particle.options.zIndex,
        zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate,
        opacity = particle.bubble.opacity ?? particle.opacity?.value ?? 1,
        strokeOpacity = particle.strokeOpacity ?? opacity,
        zOpacity = opacity * zOpacityFactor,
        zStrokeOpacity = strokeOpacity * zOpacityFactor,
        transform = {},
        colorStyles = {
          fill: fColor ? ColorUtils_getStyleFromHsl(fColor, zOpacity) : undefined
        };
      colorStyles.stroke = sColor ? ColorUtils_getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;
      this._applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform);
      drawParticle({
        container,
        context: ctx,
        particle,
        delta,
        colorStyles,
        backgroundMask: options.backgroundMask.enable,
        composite: options.backgroundMask.composite,
        radius: radius * (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate,
        opacity: zOpacity,
        shadow: particle.options.shadow,
        transform
      });
      this._applyPostDrawUpdaters(particle);
    });
  }
  drawParticlePlugin(plugin, particle, delta) {
    this.draw(ctx => drawParticlePlugin(ctx, plugin, particle, delta));
  }
  drawPlugin(plugin, delta) {
    this.draw(ctx => drawPlugin(ctx, plugin, delta));
  }
  async init() {
    this._safeMutationObserver(obs => obs.disconnect());
    this._mutationObserver = safeMutationObserver(records => {
      for (const record of records) {
        if (record.type === "attributes" && record.attributeName === "style") {
          this._repairStyle();
        }
      }
    });
    this.resize();
    this._initStyle();
    this._initCover();
    try {
      await this._initTrail();
    } catch (e) {
      getLogger().error(e);
    }
    this.initBackground();
    this._safeMutationObserver(obs => {
      if (!this.element) {
        return;
      }
      obs.observe(this.element, {
        attributes: true
      });
    });
    this.initUpdaters();
    this.initPlugins();
    this.paint();
  }
  initBackground() {
    const options = this.container.actualOptions,
      background = options.background,
      element = this.element;
    if (!element) {
      return;
    }
    const elementStyle = element.style;
    if (!elementStyle) {
      return;
    }
    if (background.color) {
      const color = rangeColorToRgb(background.color);
      elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : "";
    } else {
      elementStyle.backgroundColor = "";
    }
    elementStyle.backgroundImage = background.image || "";
    elementStyle.backgroundPosition = background.position || "";
    elementStyle.backgroundRepeat = background.repeat || "";
    elementStyle.backgroundSize = background.size || "";
  }
  initPlugins() {
    this._resizePlugins = [];
    for (const [, plugin] of this.container.plugins) {
      if (plugin.resize) {
        this._resizePlugins.push(plugin);
      }
      if (plugin.particleFillColor || plugin.particleStrokeColor) {
        this._colorPlugins.push(plugin);
      }
    }
  }
  initUpdaters() {
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    for (const updater of this.container.particles.updaters) {
      if (updater.afterDraw) {
        this._postDrawUpdaters.push(updater);
      }
      if (updater.getColorStyles || updater.getTransformValues || updater.beforeDraw) {
        this._preDrawUpdaters.push(updater);
      }
    }
  }
  loadCanvas(canvas) {
    if (this._generated && this.element) {
      this.element.remove();
    }
    this._generated = canvas.dataset && generatedAttribute in canvas.dataset ? canvas.dataset[generatedAttribute] === "true" : this._generated;
    this.element = canvas;
    this.element.ariaHidden = "true";
    this._originalStyle = deepExtend({}, this.element.style);
    this.size.height = canvas.offsetHeight;
    this.size.width = canvas.offsetWidth;
    this._context = this.element.getContext("2d");
    this._safeMutationObserver(obs => {
      if (!this.element) {
        return;
      }
      obs.observe(this.element, {
        attributes: true
      });
    });
    this.container.retina.init();
    this.initBackground();
  }
  paint() {
    const options = this.container.actualOptions;
    this.draw(ctx => {
      if (options.backgroundMask.enable && options.backgroundMask.cover) {
        clear(ctx, this.size);
        this._paintBase(this._coverColorStyle);
      } else {
        this._paintBase();
      }
    });
  }
  resize() {
    if (!this.element) {
      return false;
    }
    const container = this.container,
      pxRatio = container.retina.pixelRatio,
      size = container.canvas.size,
      newSize = {
        width: this.element.offsetWidth * pxRatio,
        height: this.element.offsetHeight * pxRatio
      };
    if (newSize.height === size.height && newSize.width === size.width && newSize.height === this.element.height && newSize.width === this.element.width) {
      return false;
    }
    const oldSize = {
      ...size
    };
    this.element.width = size.width = this.element.offsetWidth * pxRatio;
    this.element.height = size.height = this.element.offsetHeight * pxRatio;
    if (this.container.started) {
      this.resizeFactor = {
        width: size.width / oldSize.width,
        height: size.height / oldSize.height
      };
    }
    return true;
  }
  stop() {
    this._safeMutationObserver(obs => obs.disconnect());
    this._mutationObserver = undefined;
    this.draw(ctx => clear(ctx, this.size));
  }
  async windowResize() {
    if (!this.element || !this.resize()) {
      return;
    }
    const container = this.container,
      needsRefresh = container.updateActualOptions();
    container.particles.setDensity();
    this._applyResizePlugins();
    if (needsRefresh) {
      await container.refresh();
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/EventListeners.js


function manageListener(element, event, handler, add, options) {
  if (add) {
    let addOptions = {
      passive: true
    };
    if (isBoolean(options)) {
      addOptions.capture = options;
    } else if (options !== undefined) {
      addOptions = options;
    }
    element.addEventListener(event, handler, addOptions);
  } else {
    const removeOptions = options;
    element.removeEventListener(event, handler, removeOptions);
  }
}
class EventListeners {
  constructor(container) {
    this.container = container;
    this._doMouseTouchClick = e => {
      const container = this.container,
        options = container.actualOptions;
      if (this._canPush) {
        const mouseInteractivity = container.interactivity.mouse,
          mousePos = mouseInteractivity.position;
        if (!mousePos) {
          return;
        }
        mouseInteractivity.clickPosition = {
          ...mousePos
        };
        mouseInteractivity.clickTime = new Date().getTime();
        const onClick = options.interactivity.events.onClick;
        executeOnSingleOrMultiple(onClick.mode, mode => this.container.handleClickMode(mode));
      }
      if (e.type === "touchend") {
        setTimeout(() => this._mouseTouchFinish(), 500);
      }
    };
    this._handleThemeChange = e => {
      const mediaEvent = e,
        container = this.container,
        options = container.options,
        defaultThemes = options.defaultThemes,
        themeName = mediaEvent.matches ? defaultThemes.dark : defaultThemes.light,
        theme = options.themes.find(theme => theme.name === themeName);
      if (theme && theme.default.auto) {
        container.loadTheme(themeName);
      }
    };
    this._handleVisibilityChange = () => {
      const container = this.container,
        options = container.actualOptions;
      this._mouseTouchFinish();
      if (!options.pauseOnBlur) {
        return;
      }
      if (document && document.hidden) {
        container.pageHidden = true;
        container.pause();
      } else {
        container.pageHidden = false;
        if (container.getAnimationStatus()) {
          container.play(true);
        } else {
          container.draw(true);
        }
      }
    };
    this._handleWindowResize = async () => {
      if (this._resizeTimeout) {
        clearTimeout(this._resizeTimeout);
        delete this._resizeTimeout;
      }
      this._resizeTimeout = setTimeout(async () => {
        const canvas = this.container.canvas;
        canvas && (await canvas.windowResize());
      }, this.container.actualOptions.interactivity.events.resize.delay * 1000);
    };
    this._manageInteractivityListeners = (mouseLeaveTmpEvent, add) => {
      const handlers = this._handlers,
        container = this.container,
        options = container.actualOptions;
      const interactivityEl = container.interactivity.element;
      if (!interactivityEl) {
        return;
      }
      const html = interactivityEl,
        canvasEl = container.canvas.element;
      if (canvasEl) {
        canvasEl.style.pointerEvents = html === canvasEl ? "initial" : "none";
      }
      if (!(options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable)) {
        return;
      }
      manageListener(interactivityEl, mouseMoveEvent, handlers.mouseMove, add);
      manageListener(interactivityEl, touchStartEvent, handlers.touchStart, add);
      manageListener(interactivityEl, touchMoveEvent, handlers.touchMove, add);
      if (!options.interactivity.events.onClick.enable) {
        manageListener(interactivityEl, touchEndEvent, handlers.touchEnd, add);
      } else {
        manageListener(interactivityEl, touchEndEvent, handlers.touchEndClick, add);
        manageListener(interactivityEl, mouseUpEvent, handlers.mouseUp, add);
        manageListener(interactivityEl, mouseDownEvent, handlers.mouseDown, add);
      }
      manageListener(interactivityEl, mouseLeaveTmpEvent, handlers.mouseLeave, add);
      manageListener(interactivityEl, touchCancelEvent, handlers.touchCancel, add);
    };
    this._manageListeners = add => {
      const handlers = this._handlers,
        container = this.container,
        options = container.actualOptions,
        detectType = options.interactivity.detectsOn,
        canvasEl = container.canvas.element;
      let mouseLeaveTmpEvent = mouseLeaveEvent;
      if (detectType === "window") {
        container.interactivity.element = window;
        mouseLeaveTmpEvent = mouseOutEvent;
      } else if (detectType === "parent" && canvasEl) {
        container.interactivity.element = canvasEl.parentElement ?? canvasEl.parentNode;
      } else {
        container.interactivity.element = canvasEl;
      }
      this._manageMediaMatch(add);
      this._manageResize(add);
      this._manageInteractivityListeners(mouseLeaveTmpEvent, add);
      if (document) {
        manageListener(document, visibilityChangeEvent, handlers.visibilityChange, add, false);
      }
    };
    this._manageMediaMatch = add => {
      const handlers = this._handlers,
        mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)");
      if (!mediaMatch) {
        return;
      }
      if (mediaMatch.addEventListener !== undefined) {
        manageListener(mediaMatch, "change", handlers.themeChange, add);
        return;
      }
      if (mediaMatch.addListener === undefined) {
        return;
      }
      if (add) {
        mediaMatch.addListener(handlers.oldThemeChange);
      } else {
        mediaMatch.removeListener(handlers.oldThemeChange);
      }
    };
    this._manageResize = add => {
      const handlers = this._handlers,
        container = this.container,
        options = container.actualOptions;
      if (!options.interactivity.events.resize) {
        return;
      }
      if (typeof ResizeObserver === "undefined") {
        manageListener(window, resizeEvent, handlers.resize, add);
        return;
      }
      const canvasEl = container.canvas.element;
      if (this._resizeObserver && !add) {
        if (canvasEl) {
          this._resizeObserver.unobserve(canvasEl);
        }
        this._resizeObserver.disconnect();
        delete this._resizeObserver;
      } else if (!this._resizeObserver && add && canvasEl) {
        this._resizeObserver = new ResizeObserver(async entries => {
          const entry = entries.find(e => e.target === canvasEl);
          if (!entry) {
            return;
          }
          await this._handleWindowResize();
        });
        this._resizeObserver.observe(canvasEl);
      }
    };
    this._mouseDown = () => {
      const {
        interactivity
      } = this.container;
      if (!interactivity) {
        return;
      }
      const {
        mouse
      } = interactivity;
      mouse.clicking = true;
      mouse.downPosition = mouse.position;
    };
    this._mouseTouchClick = e => {
      const container = this.container,
        options = container.actualOptions,
        {
          mouse
        } = container.interactivity;
      mouse.inside = true;
      let handled = false;
      const mousePosition = mouse.position;
      if (!mousePosition || !options.interactivity.events.onClick.enable) {
        return;
      }
      for (const [, plugin] of container.plugins) {
        if (!plugin.clickPositionValid) {
          continue;
        }
        handled = plugin.clickPositionValid(mousePosition);
        if (handled) {
          break;
        }
      }
      if (!handled) {
        this._doMouseTouchClick(e);
      }
      mouse.clicking = false;
    };
    this._mouseTouchFinish = () => {
      const interactivity = this.container.interactivity;
      if (!interactivity) {
        return;
      }
      const mouse = interactivity.mouse;
      delete mouse.position;
      delete mouse.clickPosition;
      delete mouse.downPosition;
      interactivity.status = mouseLeaveEvent;
      mouse.inside = false;
      mouse.clicking = false;
    };
    this._mouseTouchMove = e => {
      const container = this.container,
        options = container.actualOptions,
        interactivity = container.interactivity,
        canvasEl = container.canvas.element;
      if (!interactivity || !interactivity.element) {
        return;
      }
      interactivity.mouse.inside = true;
      let pos;
      if (e.type.startsWith("pointer")) {
        this._canPush = true;
        const mouseEvent = e;
        if (interactivity.element === window) {
          if (canvasEl) {
            const clientRect = canvasEl.getBoundingClientRect();
            pos = {
              x: mouseEvent.clientX - clientRect.left,
              y: mouseEvent.clientY - clientRect.top
            };
          }
        } else if (options.interactivity.detectsOn === "parent") {
          const source = mouseEvent.target,
            target = mouseEvent.currentTarget;
          if (source && target && canvasEl) {
            const sourceRect = source.getBoundingClientRect(),
              targetRect = target.getBoundingClientRect(),
              canvasRect = canvasEl.getBoundingClientRect();
            pos = {
              x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
              y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top)
            };
          } else {
            pos = {
              x: mouseEvent.offsetX ?? mouseEvent.clientX,
              y: mouseEvent.offsetY ?? mouseEvent.clientY
            };
          }
        } else if (mouseEvent.target === canvasEl) {
          pos = {
            x: mouseEvent.offsetX ?? mouseEvent.clientX,
            y: mouseEvent.offsetY ?? mouseEvent.clientY
          };
        }
      } else {
        this._canPush = e.type !== "touchmove";
        if (canvasEl) {
          const touchEvent = e,
            lastTouch = touchEvent.touches[touchEvent.touches.length - 1],
            canvasRect = canvasEl.getBoundingClientRect();
          pos = {
            x: lastTouch.clientX - (canvasRect.left ?? 0),
            y: lastTouch.clientY - (canvasRect.top ?? 0)
          };
        }
      }
      const pxRatio = container.retina.pixelRatio;
      if (pos) {
        pos.x *= pxRatio;
        pos.y *= pxRatio;
      }
      interactivity.mouse.position = pos;
      interactivity.status = mouseMoveEvent;
    };
    this._touchEnd = e => {
      const evt = e,
        touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.delete(touch.identifier);
      }
      this._mouseTouchFinish();
    };
    this._touchEndClick = e => {
      const evt = e,
        touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.delete(touch.identifier);
      }
      this._mouseTouchClick(e);
    };
    this._touchStart = e => {
      const evt = e,
        touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.set(touch.identifier, performance.now());
      }
      this._mouseTouchMove(e);
    };
    this._canPush = true;
    this._touches = new Map();
    this._handlers = {
      mouseDown: () => this._mouseDown(),
      mouseLeave: () => this._mouseTouchFinish(),
      mouseMove: e => this._mouseTouchMove(e),
      mouseUp: e => this._mouseTouchClick(e),
      touchStart: e => this._touchStart(e),
      touchMove: e => this._mouseTouchMove(e),
      touchEnd: e => this._touchEnd(e),
      touchCancel: e => this._touchEnd(e),
      touchEndClick: e => this._touchEndClick(e),
      visibilityChange: () => this._handleVisibilityChange(),
      themeChange: e => this._handleThemeChange(e),
      oldThemeChange: e => this._handleThemeChange(e),
      resize: () => {
        this._handleWindowResize();
      }
    };
  }
  addListeners() {
    this._manageListeners(true);
  }
  removeListeners() {
    this._manageListeners(false);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Background/Background.js

class Background {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "";
    this.image = "";
    this.position = "";
    this.repeat = "";
    this.size = "";
    this.opacity = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.image !== undefined) {
      this.image = data.image;
    }
    if (data.position !== undefined) {
      this.position = data.position;
    }
    if (data.repeat !== undefined) {
      this.repeat = data.repeat;
    }
    if (data.size !== undefined) {
      this.size = data.size;
    }
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/BackgroundMask/BackgroundMaskCover.js

class BackgroundMaskCover {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#fff";
    this.opacity = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/BackgroundMask/BackgroundMask.js


class BackgroundMask {
  constructor() {
    this.composite = "destination-out";
    this.cover = new BackgroundMaskCover();
    this.enable = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.composite !== undefined) {
      this.composite = data.composite;
    }
    if (data.cover !== undefined) {
      const cover = data.cover;
      const color = isString(data.cover) ? {
        color: data.cover
      } : data.cover;
      this.cover.load(cover.color !== undefined ? cover : {
        color: color
      });
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/FullScreen/FullScreen.js
class FullScreen {
  constructor() {
    this.enable = true;
    this.zIndex = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.zIndex !== undefined) {
      this.zIndex = data.zIndex;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Events/ClickEvent.js
class ClickEvent {
  constructor() {
    this.enable = false;
    this.mode = [];
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Events/DivEvent.js

class DivEvent {
  constructor() {
    this.selectors = [];
    this.enable = false;
    this.mode = [];
    this.type = "circle";
  }
  get el() {
    return this.elementId;
  }
  set el(value) {
    this.elementId = value;
  }
  get elementId() {
    return this.ids;
  }
  set elementId(value) {
    this.ids = value;
  }
  get ids() {
    return executeOnSingleOrMultiple(this.selectors, t => t.replace("#", ""));
  }
  set ids(value) {
    this.selectors = executeOnSingleOrMultiple(value, t => `#${t}`);
  }
  load(data) {
    if (!data) {
      return;
    }
    const ids = data.ids ?? data.elementId ?? data.el;
    if (ids !== undefined) {
      this.ids = ids;
    }
    if (data.selectors !== undefined) {
      this.selectors = data.selectors;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
    if (data.type !== undefined) {
      this.type = data.type;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Events/Parallax.js
class Parallax {
  constructor() {
    this.enable = false;
    this.force = 2;
    this.smooth = 10;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.force !== undefined) {
      this.force = data.force;
    }
    if (data.smooth !== undefined) {
      this.smooth = data.smooth;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Events/HoverEvent.js

class HoverEvent {
  constructor() {
    this.enable = false;
    this.mode = [];
    this.parallax = new Parallax();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
    this.parallax.load(data.parallax);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Events/ResizeEvent.js
class ResizeEvent {
  constructor() {
    this.delay = 0.5;
    this.enable = true;
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (data.delay !== undefined) {
      this.delay = data.delay;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Events/Events.js





class Events {
  constructor() {
    this.onClick = new ClickEvent();
    this.onDiv = new DivEvent();
    this.onHover = new HoverEvent();
    this.resize = new ResizeEvent();
  }
  get onclick() {
    return this.onClick;
  }
  set onclick(value) {
    this.onClick = value;
  }
  get ondiv() {
    return this.onDiv;
  }
  set ondiv(value) {
    this.onDiv = value;
  }
  get onhover() {
    return this.onHover;
  }
  set onhover(value) {
    this.onHover = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.onClick.load(data.onClick ?? data.onclick);
    const onDiv = data.onDiv ?? data.ondiv;
    if (onDiv !== undefined) {
      this.onDiv = executeOnSingleOrMultiple(onDiv, t => {
        const tmp = new DivEvent();
        tmp.load(t);
        return tmp;
      });
    }
    this.onHover.load(data.onHover ?? data.onhover);
    if (isBoolean(data.resize)) {
      this.resize.enable = data.resize;
    } else {
      this.resize.load(data.resize);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Modes.js
class Modes {
  constructor(engine, container) {
    this._engine = engine;
    this._container = container;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (!this._container) {
      return;
    }
    const interactors = this._engine.plugins.interactors.get(this._container);
    if (!interactors) {
      return;
    }
    for (const interactor of interactors) {
      if (!interactor.loadModeOptions) {
        continue;
      }
      interactor.loadModeOptions(this, data);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Interactivity.js


class Interactivity {
  constructor(engine, container) {
    this.detectsOn = "window";
    this.events = new Events();
    this.modes = new Modes(engine, container);
  }
  get detect_on() {
    return this.detectsOn;
  }
  set detect_on(value) {
    this.detectsOn = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    const detectsOn = data.detectsOn ?? data.detect_on;
    if (detectsOn !== undefined) {
      this.detectsOn = detectsOn;
    }
    this.events.load(data.events);
    this.modes.load(data.modes);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/ManualParticle.js

class ManualParticle {
  load(data) {
    if (!data) {
      return;
    }
    if (data.position) {
      this.position = {
        x: data.position.x ?? 50,
        y: data.position.y ?? 50,
        mode: data.position.mode ?? "percent"
      };
    }
    if (data.options) {
      this.options = deepExtend({}, data.options);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Responsive.js

class Responsive {
  constructor() {
    this.maxWidth = Infinity;
    this.options = {};
    this.mode = "canvas";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.maxWidth !== undefined) {
      this.maxWidth = data.maxWidth;
    }
    if (data.mode !== undefined) {
      if (data.mode === "screen") {
        this.mode = "screen";
      } else {
        this.mode = "canvas";
      }
    }
    if (data.options !== undefined) {
      this.options = deepExtend({}, data.options);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Theme/ThemeDefault.js
class ThemeDefault {
  constructor() {
    this.auto = false;
    this.mode = "any";
    this.value = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.auto !== undefined) {
      this.auto = data.auto;
    }
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
    if (data.value !== undefined) {
      this.value = data.value;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Theme/Theme.js


class Theme {
  constructor() {
    this.name = "";
    this.default = new ThemeDefault();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.name !== undefined) {
      this.name = data.name;
    }
    this.default.load(data.default);
    if (data.options !== undefined) {
      this.options = deepExtend({}, data.options);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Options.js










class Options {
  constructor(engine, container) {
    this._findDefaultTheme = mode => {
      return this.themes.find(theme => theme.default.value && theme.default.mode === mode) ?? this.themes.find(theme => theme.default.value && theme.default.mode === "any");
    };
    this._importPreset = preset => {
      this.load(this._engine.plugins.getPreset(preset));
    };
    this._engine = engine;
    this._container = container;
    this.autoPlay = true;
    this.background = new Background();
    this.backgroundMask = new BackgroundMask();
    this.defaultThemes = {};
    this.delay = 0;
    this.fullScreen = new FullScreen();
    this.detectRetina = true;
    this.duration = 0;
    this.fpsLimit = 120;
    this.interactivity = new Interactivity(engine, container);
    this.manualParticles = [];
    this.particles = loadParticlesOptions(this._engine, this._container);
    this.pauseOnBlur = true;
    this.pauseOnOutsideViewport = true;
    this.responsive = [];
    this.smooth = false;
    this.style = {};
    this.themes = [];
    this.zLayers = 100;
  }
  get backgroundMode() {
    return this.fullScreen;
  }
  set backgroundMode(value) {
    this.fullScreen.load(value);
  }
  get fps_limit() {
    return this.fpsLimit;
  }
  set fps_limit(value) {
    this.fpsLimit = value;
  }
  get retina_detect() {
    return this.detectRetina;
  }
  set retina_detect(value) {
    this.detectRetina = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.preset !== undefined) {
      executeOnSingleOrMultiple(data.preset, preset => this._importPreset(preset));
    }
    if (data.autoPlay !== undefined) {
      this.autoPlay = data.autoPlay;
    }
    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
    const detectRetina = data.detectRetina ?? data.retina_detect;
    if (detectRetina !== undefined) {
      this.detectRetina = detectRetina;
    }
    if (data.duration !== undefined) {
      this.duration = setRangeValue(data.duration);
    }
    const fpsLimit = data.fpsLimit ?? data.fps_limit;
    if (fpsLimit !== undefined) {
      this.fpsLimit = fpsLimit;
    }
    if (data.pauseOnBlur !== undefined) {
      this.pauseOnBlur = data.pauseOnBlur;
    }
    if (data.pauseOnOutsideViewport !== undefined) {
      this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
    }
    if (data.zLayers !== undefined) {
      this.zLayers = data.zLayers;
    }
    this.background.load(data.background);
    const fullScreen = data.fullScreen ?? data.backgroundMode;
    if (isBoolean(fullScreen)) {
      this.fullScreen.enable = fullScreen;
    } else {
      this.fullScreen.load(fullScreen);
    }
    this.backgroundMask.load(data.backgroundMask);
    this.interactivity.load(data.interactivity);
    if (data.manualParticles) {
      this.manualParticles = data.manualParticles.map(t => {
        const tmp = new ManualParticle();
        tmp.load(t);
        return tmp;
      });
    }
    this.particles.load(data.particles);
    this.style = deepExtend(this.style, data.style);
    this._engine.plugins.loadOptions(this, data);
    if (data.smooth !== undefined) {
      this.smooth = data.smooth;
    }
    const interactors = this._engine.plugins.interactors.get(this._container);
    if (interactors) {
      for (const interactor of interactors) {
        if (interactor.loadOptions) {
          interactor.loadOptions(this, data);
        }
      }
    }
    if (data.responsive !== undefined) {
      for (const responsive of data.responsive) {
        const optResponsive = new Responsive();
        optResponsive.load(responsive);
        this.responsive.push(optResponsive);
      }
    }
    this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);
    if (data.themes !== undefined) {
      for (const theme of data.themes) {
        const existingTheme = this.themes.find(t => t.name === theme.name);
        if (!existingTheme) {
          const optTheme = new Theme();
          optTheme.load(theme);
          this.themes.push(optTheme);
        } else {
          existingTheme.load(theme);
        }
      }
    }
    this.defaultThemes.dark = this._findDefaultTheme("dark")?.name;
    this.defaultThemes.light = this._findDefaultTheme("light")?.name;
  }
  setResponsive(width, pxRatio, defaultOptions) {
    this.load(defaultOptions);
    const responsiveOptions = this.responsive.find(t => t.mode === "screen" && screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width);
    this.load(responsiveOptions?.options);
    return responsiveOptions?.maxWidth;
  }
  setTheme(name) {
    if (name) {
      const chosenTheme = this.themes.find(theme => theme.name === name);
      if (chosenTheme) {
        this.load(chosenTheme.options);
      }
    } else {
      const mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)"),
        clientDarkMode = mediaMatch && mediaMatch.matches,
        defaultTheme = this._findDefaultTheme(clientDarkMode ? "dark" : "light");
      if (defaultTheme) {
        this.load(defaultTheme.options);
      }
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/InteractionManager.js
class InteractionManager {
  constructor(engine, container) {
    this.container = container;
    this._engine = engine;
    this._interactors = engine.plugins.getInteractors(this.container, true);
    this._externalInteractors = [];
    this._particleInteractors = [];
  }
  async externalInteract(delta) {
    for (const interactor of this._externalInteractors) {
      interactor.isEnabled() && (await interactor.interact(delta));
    }
  }
  handleClickMode(mode) {
    for (const interactor of this._externalInteractors) {
      interactor.handleClickMode && interactor.handleClickMode(mode);
    }
  }
  init() {
    this._externalInteractors = [];
    this._particleInteractors = [];
    for (const interactor of this._interactors) {
      switch (interactor.type) {
        case "external":
          this._externalInteractors.push(interactor);
          break;
        case "particles":
          this._particleInteractors.push(interactor);
          break;
      }
      interactor.init();
    }
  }
  async particlesInteract(particle, delta) {
    for (const interactor of this._externalInteractors) {
      interactor.clear(particle, delta);
    }
    for (const interactor of this._particleInteractors) {
      interactor.isEnabled(particle) && (await interactor.interact(particle, delta));
    }
  }
  async reset(particle) {
    for (const interactor of this._externalInteractors) {
      interactor.isEnabled() && interactor.reset(particle);
    }
    for (const interactor of this._particleInteractors) {
      interactor.isEnabled(particle) && interactor.reset(particle);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Particle.js









const fixOutMode = data => {
  if (!isInArray(data.outMode, data.checkModes)) {
    return;
  }
  const diameter = data.radius * 2;
  if (data.coord > data.maxCoord - diameter) {
    data.setCb(-data.radius);
  } else if (data.coord < diameter) {
    data.setCb(data.radius);
  }
};
class Particle {
  constructor(engine, id, container, position, overrideOptions, group) {
    this.container = container;
    this._calcPosition = (container, position, zIndex, tryCount = 0) => {
      for (const [, plugin] of container.plugins) {
        const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;
        if (pluginPos) {
          return Vector3d.create(pluginPos.x, pluginPos.y, zIndex);
        }
      }
      const canvasSize = container.canvas.size,
        exactPosition = calcExactPositionOrRandomFromSize({
          size: canvasSize,
          position: position
        }),
        pos = Vector3d.create(exactPosition.x, exactPosition.y, zIndex),
        radius = this.getRadius(),
        outModes = this.options.move.outModes,
        fixHorizontal = outMode => {
          fixOutMode({
            outMode,
            checkModes: ["bounce", "bounce-horizontal"],
            coord: pos.x,
            maxCoord: container.canvas.size.width,
            setCb: value => pos.x += value,
            radius
          });
        },
        fixVertical = outMode => {
          fixOutMode({
            outMode,
            checkModes: ["bounce", "bounce-vertical"],
            coord: pos.y,
            maxCoord: container.canvas.size.height,
            setCb: value => pos.y += value,
            radius
          });
        };
      fixHorizontal(outModes.left ?? outModes.default);
      fixHorizontal(outModes.right ?? outModes.default);
      fixVertical(outModes.top ?? outModes.default);
      fixVertical(outModes.bottom ?? outModes.default);
      if (this._checkOverlap(pos, tryCount)) {
        return this._calcPosition(container, undefined, zIndex, tryCount + 1);
      }
      return pos;
    };
    this._calculateVelocity = () => {
      const baseVelocity = getParticleBaseVelocity(this.direction),
        res = baseVelocity.copy(),
        moveOptions = this.options.move;
      if (moveOptions.direction === "inside" || moveOptions.direction === "outside") {
        return res;
      }
      const rad = Math.PI / 180 * getRangeValue(moveOptions.angle.value),
        radOffset = Math.PI / 180 * getRangeValue(moveOptions.angle.offset),
        range = {
          left: radOffset - rad / 2,
          right: radOffset + rad / 2
        };
      if (!moveOptions.straight) {
        res.angle += randomInRange(setRangeValue(range.left, range.right));
      }
      if (moveOptions.random && typeof moveOptions.speed === "number") {
        res.length *= getRandom();
      }
      return res;
    };
    this._checkOverlap = (pos, tryCount = 0) => {
      const collisionsOptions = this.options.collisions,
        radius = this.getRadius();
      if (!collisionsOptions.enable) {
        return false;
      }
      const overlapOptions = collisionsOptions.overlap;
      if (overlapOptions.enable) {
        return false;
      }
      const retries = overlapOptions.retries;
      if (retries >= 0 && tryCount > retries) {
        throw new Error(`${errorPrefix} particle is overlapping and can't be placed`);
      }
      return !!this.container.particles.find(particle => getDistance(pos, particle.position) < radius + particle.getRadius());
    };
    this._getRollColor = color => {
      if (!color || !this.roll || !this.backColor && !this.roll.alter) {
        return color;
      }
      const backFactor = this.roll.horizontal && this.roll.vertical ? 2 : 1,
        backSum = this.roll.horizontal ? Math.PI / 2 : 0,
        rolled = Math.floor(((this.roll.angle ?? 0) + backSum) / (Math.PI / backFactor)) % 2;
      if (!rolled) {
        return color;
      }
      if (this.backColor) {
        return this.backColor;
      }
      if (this.roll.alter) {
        return alterHsl(color, this.roll.alter.type, this.roll.alter.value);
      }
      return color;
    };
    this._initPosition = position => {
      const container = this.container,
        zIndexValue = getRangeValue(this.options.zIndex.value);
      this.position = this._calcPosition(container, position, clamp(zIndexValue, 0, container.zLayers));
      this.initialPosition = this.position.copy();
      const canvasSize = container.canvas.size;
      this.moveCenter = {
        ...getPosition(this.options.move.center, canvasSize),
        radius: this.options.move.center.radius ?? 0,
        mode: this.options.move.center.mode ?? "percent"
      };
      this.direction = getParticleDirectionAngle(this.options.move.direction, this.position, this.moveCenter);
      switch (this.options.move.direction) {
        case "inside":
          this.outType = "inside";
          break;
        case "outside":
          this.outType = "outside";
          break;
      }
      this.offset = Vector.origin;
    };
    this._loadShapeData = (shapeOptions, reduceDuplicates) => {
      const shapeData = shapeOptions.options[this.shape];
      if (!shapeData) {
        return;
      }
      return deepExtend({
        close: shapeOptions.close,
        fill: shapeOptions.fill
      }, itemFromSingleOrMultiple(shapeData, this.id, reduceDuplicates));
    };
    this._engine = engine;
    this.init(id, position, overrideOptions, group);
  }
  destroy(override) {
    if (this.unbreakable || this.destroyed) {
      return;
    }
    this.destroyed = true;
    this.bubble.inRange = false;
    this.slow.inRange = false;
    const container = this.container,
      pathGenerator = this.pathGenerator;
    for (const [, plugin] of container.plugins) {
      if (plugin.particleDestroyed) {
        plugin.particleDestroyed(this, override);
      }
    }
    for (const updater of container.particles.updaters) {
      if (updater.particleDestroyed) {
        updater.particleDestroyed(this, override);
      }
    }
    if (pathGenerator) {
      pathGenerator.reset(this);
    }
  }
  draw(delta) {
    const container = this.container;
    for (const [, plugin] of container.plugins) {
      container.canvas.drawParticlePlugin(plugin, this, delta);
    }
    container.canvas.drawParticle(this, delta);
  }
  getFillColor() {
    return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.color));
  }
  getMass() {
    return this.getRadius() ** 2 * Math.PI / 2;
  }
  getPosition() {
    return {
      x: this.position.x + this.offset.x,
      y: this.position.y + this.offset.y,
      z: this.position.z
    };
  }
  getRadius() {
    return this.bubble.radius ?? this.size.value;
  }
  getStrokeColor() {
    return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.strokeColor));
  }
  init(id, position, overrideOptions, group) {
    const container = this.container,
      engine = this._engine;
    this.id = id;
    this.group = group;
    this.fill = true;
    this.pathRotation = false;
    this.close = true;
    this.lastPathTime = 0;
    this.destroyed = false;
    this.unbreakable = false;
    this.rotation = 0;
    this.misplaced = false;
    this.retina = {
      maxDistance: {}
    };
    this.outType = "normal";
    this.ignoresResizeRatio = true;
    const pxRatio = container.retina.pixelRatio,
      mainOptions = container.actualOptions,
      particlesOptions = loadParticlesOptions(this._engine, container, mainOptions.particles),
      shapeType = particlesOptions.shape.type,
      {
        reduceDuplicates
      } = particlesOptions;
    this.shape = itemFromSingleOrMultiple(shapeType, this.id, reduceDuplicates);
    const shapeOptions = particlesOptions.shape;
    if (overrideOptions && overrideOptions.shape && overrideOptions.shape.type) {
      const overrideShapeType = overrideOptions.shape.type,
        shape = itemFromSingleOrMultiple(overrideShapeType, this.id, reduceDuplicates);
      if (shape) {
        this.shape = shape;
        shapeOptions.load(overrideOptions.shape);
      }
    }
    this.shapeData = this._loadShapeData(shapeOptions, reduceDuplicates);
    particlesOptions.load(overrideOptions);
    const shapeData = this.shapeData;
    if (shapeData) {
      particlesOptions.load(shapeData.particles);
    }
    const interactivity = new Interactivity(engine, container);
    interactivity.load(container.actualOptions.interactivity);
    interactivity.load(particlesOptions.interactivity);
    this.interactivity = interactivity;
    this.fill = shapeData?.fill ?? particlesOptions.shape.fill;
    this.close = shapeData?.close ?? particlesOptions.shape.close;
    this.options = particlesOptions;
    const pathOptions = this.options.move.path;
    this.pathDelay = getValue(pathOptions.delay) * 1000;
    if (pathOptions.generator) {
      this.pathGenerator = this._engine.plugins.getPathGenerator(pathOptions.generator);
      if (this.pathGenerator && container.addPath(pathOptions.generator, this.pathGenerator)) {
        this.pathGenerator.init(container);
      }
    }
    container.retina.initParticle(this);
    this.size = initParticleNumericAnimationValue(this.options.size, pxRatio);
    this.bubble = {
      inRange: false
    };
    this.slow = {
      inRange: false,
      factor: 1
    };
    this._initPosition(position);
    this.initialVelocity = this._calculateVelocity();
    this.velocity = this.initialVelocity.copy();
    this.moveDecay = 1 - getRangeValue(this.options.move.decay);
    const particles = container.particles;
    particles.needsSort = particles.needsSort || particles.lastZIndex < this.position.z;
    particles.lastZIndex = this.position.z;
    this.zIndexFactor = this.position.z / container.zLayers;
    this.sides = 24;
    let drawer = container.drawers.get(this.shape);
    if (!drawer) {
      drawer = this._engine.plugins.getShapeDrawer(this.shape);
      if (drawer) {
        container.drawers.set(this.shape, drawer);
      }
    }
    if (drawer && drawer.loadShape) {
      drawer.loadShape(this);
    }
    const sideCountFunc = drawer?.getSidesCount;
    if (sideCountFunc) {
      this.sides = sideCountFunc(this);
    }
    this.spawning = false;
    this.shadowColor = rangeColorToRgb(this.options.shadow.color);
    for (const updater of container.particles.updaters) {
      updater.init(this);
    }
    for (const mover of container.particles.movers) {
      mover.init && mover.init(this);
    }
    if (drawer && drawer.particleInit) {
      drawer.particleInit(container, this);
    }
    for (const [, plugin] of container.plugins) {
      plugin.particleCreated && plugin.particleCreated(this);
    }
  }
  isInsideCanvas() {
    const radius = this.getRadius(),
      canvasSize = this.container.canvas.size,
      position = this.position;
    return position.x >= -radius && position.y >= -radius && position.y <= canvasSize.height + radius && position.x <= canvasSize.width + radius;
  }
  isVisible() {
    return !this.destroyed && !this.spawning && this.isInsideCanvas();
  }
  reset() {
    for (const updater of this.container.particles.updaters) {
      updater.reset && updater.reset(this);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Point.js
class Point {
  constructor(position, particle) {
    this.position = position;
    this.particle = particle;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Range.js
class Range {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y
    };
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Rectangle.js


class Rectangle extends Range {
  constructor(x, y, width, height) {
    super(x, y);
    this.size = {
      height: height,
      width: width
    };
  }
  contains(point) {
    const w = this.size.width,
      h = this.size.height,
      pos = this.position;
    return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
  }
  intersects(range) {
    if (range instanceof Circle) {
      range.intersects(this);
    }
    const w = this.size.width,
      h = this.size.height,
      pos1 = this.position,
      pos2 = range.position,
      size2 = range instanceof Rectangle ? range.size : {
        width: 0,
        height: 0
      },
      w2 = size2.width,
      h2 = size2.height;
    return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Circle.js



class Circle extends Range {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
  }
  contains(point) {
    return getDistance(point, this.position) <= this.radius;
  }
  intersects(range) {
    const pos1 = this.position,
      pos2 = range.position,
      distPos = {
        x: Math.abs(pos2.x - pos1.x),
        y: Math.abs(pos2.y - pos1.y)
      },
      r = this.radius;
    if (range instanceof Circle) {
      const rSum = r + range.radius,
        dist = Math.sqrt(distPos.x ** 2 + distPos.y ** 2);
      return rSum > dist;
    } else if (range instanceof Rectangle) {
      const {
          width,
          height
        } = range.size,
        edges = Math.pow(distPos.x - width, 2) + Math.pow(distPos.y - height, 2);
      return edges <= r ** 2 || distPos.x <= r + width && distPos.y <= r + height || distPos.x <= width || distPos.y <= height;
    }
    return false;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/QuadTree.js



class QuadTree {
  constructor(rectangle, capacity) {
    this.rectangle = rectangle;
    this.capacity = capacity;
    this._subdivide = () => {
      const {
          x,
          y
        } = this.rectangle.position,
        {
          width,
          height
        } = this.rectangle.size,
        {
          capacity
        } = this;
      for (let i = 0; i < 4; i++) {
        this._subs.push(new QuadTree(new Rectangle(x + width / 2 * (i % 2), y + height / 2 * (Math.round(i / 2) - i % 2), width / 2, height / 2), capacity));
      }
      this._divided = true;
    };
    this._points = [];
    this._divided = false;
    this._subs = [];
  }
  insert(point) {
    if (!this.rectangle.contains(point.position)) {
      return false;
    }
    if (this._points.length < this.capacity) {
      this._points.push(point);
      return true;
    }
    if (!this._divided) {
      this._subdivide();
    }
    return this._subs.some(sub => sub.insert(point));
  }
  query(range, check, found) {
    const res = found || [];
    if (!range.intersects(this.rectangle)) {
      return [];
    }
    for (const p of this._points) {
      if (!range.contains(p.position) && getDistance(range.position, p.position) > p.particle.getRadius() && (!check || check(p.particle))) {
        continue;
      }
      res.push(p.particle);
    }
    if (this._divided) {
      for (const sub of this._subs) {
        sub.query(range, check, res);
      }
    }
    return res;
  }
  queryCircle(position, radius, check) {
    return this.query(new Circle(position.x, position.y, radius), check);
  }
  queryRectangle(position, size, check) {
    return this.query(new Rectangle(position.x, position.y, size.width, size.height), check);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Particles.js







const qTreeCapacity = 4;
const qTreeRectangle = canvasSize => {
  return new Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2);
};
class Particles {
  constructor(engine, container) {
    this._applyDensity = (options, manualCount, group) => {
      if (!options.number.density?.enable) {
        return;
      }
      const numberOptions = options.number,
        densityFactor = this._initDensityFactor(numberOptions.density),
        optParticlesNumber = numberOptions.value,
        optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber,
        particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount,
        particlesCount = Math.min(this.count, this.filter(t => t.group === group).length);
      this.limit = numberOptions.limit * densityFactor;
      if (particlesCount < particlesNumber) {
        this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
      } else if (particlesCount > particlesNumber) {
        this.removeQuantity(particlesCount - particlesNumber, group);
      }
    };
    this._initDensityFactor = densityOptions => {
      const container = this._container;
      if (!container.canvas.element || !densityOptions.enable) {
        return 1;
      }
      const canvas = container.canvas.element,
        pxRatio = container.retina.pixelRatio;
      return canvas.width * canvas.height / (densityOptions.factor * pxRatio ** 2 * densityOptions.area);
    };
    this._pushParticle = (position, overrideOptions, group, initializer) => {
      try {
        let particle = this.pool.pop();
        if (particle) {
          particle.init(this._nextId, position, overrideOptions, group);
        } else {
          particle = new Particle(this._engine, this._nextId, this._container, position, overrideOptions, group);
        }
        let canAdd = true;
        if (initializer) {
          canAdd = initializer(particle);
        }
        if (!canAdd) {
          return;
        }
        this._array.push(particle);
        this._zArray.push(particle);
        this._nextId++;
        this._engine.dispatchEvent("particleAdded", {
          container: this._container,
          data: {
            particle
          }
        });
        return particle;
      } catch (e) {
        getLogger().warning(`${errorPrefix} adding particle: ${e}`);
        return;
      }
    };
    this._removeParticle = (index, group, override) => {
      const particle = this._array[index];
      if (!particle || particle.group !== group) {
        return false;
      }
      particle.destroy(override);
      const zIdx = this._zArray.indexOf(particle);
      this._array.splice(index, 1);
      this._zArray.splice(zIdx, 1);
      this.pool.push(particle);
      this._engine.dispatchEvent("particleRemoved", {
        container: this._container,
        data: {
          particle
        }
      });
      return true;
    };
    this._engine = engine;
    this._container = container;
    this._nextId = 0;
    this._array = [];
    this._zArray = [];
    this.pool = [];
    this.limit = 0;
    this.needsSort = false;
    this.lastZIndex = 0;
    this._interactionManager = new InteractionManager(engine, container);
    const canvasSize = container.canvas.size;
    this.quadTree = new QuadTree(qTreeRectangle(canvasSize), qTreeCapacity);
    this.movers = this._engine.plugins.getMovers(container, true);
    this.updaters = this._engine.plugins.getUpdaters(container, true);
  }
  get count() {
    return this._array.length;
  }
  addManualParticles() {
    const container = this._container,
      options = container.actualOptions;
    for (const particle of options.manualParticles) {
      this.addParticle(particle.position ? getPosition(particle.position, container.canvas.size) : undefined, particle.options);
    }
  }
  addParticle(position, overrideOptions, group, initializer) {
    const container = this._container,
      options = container.actualOptions,
      limit = options.particles.number.limit;
    if (limit > 0) {
      const countToRemove = this.count + 1 - limit;
      if (countToRemove > 0) {
        this.removeQuantity(countToRemove);
      }
    }
    return this._pushParticle(position, overrideOptions, group, initializer);
  }
  clear() {
    this._array = [];
    this._zArray = [];
  }
  destroy() {
    this._array = [];
    this._zArray = [];
    this.movers = [];
    this.updaters = [];
  }
  async draw(delta) {
    const container = this._container;
    container.canvas.clear();
    await this.update(delta);
    for (const [, plugin] of container.plugins) {
      container.canvas.drawPlugin(plugin, delta);
    }
    for (const p of this._zArray) {
      p.draw(delta);
    }
  }
  filter(condition) {
    return this._array.filter(condition);
  }
  find(condition) {
    return this._array.find(condition);
  }
  handleClickMode(mode) {
    this._interactionManager.handleClickMode(mode);
  }
  init() {
    const container = this._container,
      options = container.actualOptions;
    this.lastZIndex = 0;
    this.needsSort = false;
    let handled = false;
    this.updaters = this._engine.plugins.getUpdaters(container, true);
    this._interactionManager.init();
    for (const [, plugin] of container.plugins) {
      if (plugin.particlesInitialization !== undefined) {
        handled = plugin.particlesInitialization();
      }
      if (handled) {
        break;
      }
    }
    this._interactionManager.init();
    for (const [, pathGenerator] of container.pathGenerators) {
      pathGenerator.init(container);
    }
    this.addManualParticles();
    if (!handled) {
      for (const group in options.particles.groups) {
        const groupOptions = options.particles.groups[group];
        for (let i = this.count, j = 0; j < groupOptions.number?.value && i < options.particles.number.value; i++, j++) {
          this.addParticle(undefined, groupOptions, group);
        }
      }
      for (let i = this.count; i < options.particles.number.value; i++) {
        this.addParticle();
      }
    }
  }
  push(nb, mouse, overrideOptions, group) {
    this.pushing = true;
    for (let i = 0; i < nb; i++) {
      this.addParticle(mouse?.position, overrideOptions, group);
    }
    this.pushing = false;
  }
  async redraw() {
    this.clear();
    this.init();
    await this.draw({
      value: 0,
      factor: 0
    });
  }
  remove(particle, group, override) {
    this.removeAt(this._array.indexOf(particle), undefined, group, override);
  }
  removeAt(index, quantity = 1, group, override) {
    if (index < 0 || index > this.count) {
      return;
    }
    let deleted = 0;
    for (let i = index; deleted < quantity && i < this.count; i++) {
      this._removeParticle(i--, group, override) && deleted++;
    }
  }
  removeQuantity(quantity, group) {
    this.removeAt(0, quantity, group);
  }
  setDensity() {
    const options = this._container.actualOptions,
      groups = options.particles.groups;
    for (const group in groups) {
      this._applyDensity(groups[group], 0, group);
    }
    this._applyDensity(options.particles, options.manualParticles.length);
  }
  async update(delta) {
    const container = this._container,
      particlesToDelete = new Set();
    this.quadTree = new QuadTree(qTreeRectangle(container.canvas.size), qTreeCapacity);
    for (const [, pathGenerator] of container.pathGenerators) {
      pathGenerator.update();
    }
    for (const [, plugin] of container.plugins) {
      plugin.update && plugin.update(delta);
    }
    for (const particle of this._array) {
      const resizeFactor = container.canvas.resizeFactor;
      if (resizeFactor && !particle.ignoresResizeRatio) {
        particle.position.x *= resizeFactor.width;
        particle.position.y *= resizeFactor.height;
        particle.initialPosition.x *= resizeFactor.width;
        particle.initialPosition.y *= resizeFactor.height;
      }
      particle.ignoresResizeRatio = false;
      await this._interactionManager.reset(particle);
      for (const [, plugin] of this._container.plugins) {
        if (particle.destroyed) {
          break;
        }
        if (plugin.particleUpdate) {
          plugin.particleUpdate(particle, delta);
        }
      }
      for (const mover of this.movers) {
        mover.isEnabled(particle) && mover.move(particle, delta);
      }
      if (particle.destroyed) {
        particlesToDelete.add(particle);
        continue;
      }
      this.quadTree.insert(new Point(particle.getPosition(), particle));
    }
    if (particlesToDelete.size) {
      const checkDelete = p => !particlesToDelete.has(p);
      this._array = this.filter(checkDelete);
      this._zArray = this._zArray.filter(checkDelete);
      this.pool.push(...particlesToDelete);
    }
    await this._interactionManager.externalInteract(delta);
    for (const particle of this._array) {
      for (const updater of this.updaters) {
        updater.update(particle, delta);
      }
      if (!particle.destroyed && !particle.spawning) {
        await this._interactionManager.particlesInteract(particle, delta);
      }
    }
    delete container.canvas.resizeFactor;
    if (this.needsSort) {
      const zArray = this._zArray;
      zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
      this.lastZIndex = zArray[zArray.length - 1].position.z;
      this.needsSort = false;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Retina.js


class Retina {
  constructor(container) {
    this.container = container;
    this.pixelRatio = 1;
    this.reduceFactor = 1;
  }
  init() {
    const container = this.container,
      options = container.actualOptions;
    this.pixelRatio = !options.detectRetina || isSsr() ? 1 : window.devicePixelRatio;
    this.reduceFactor = 1;
    const ratio = this.pixelRatio;
    if (container.canvas.element) {
      const element = container.canvas.element;
      container.canvas.size.width = element.offsetWidth * ratio;
      container.canvas.size.height = element.offsetHeight * ratio;
    }
    const particles = options.particles,
      moveOptions = particles.move;
    this.attractDistance = getRangeValue(moveOptions.attract.distance) * ratio;
    this.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
    this.sizeAnimationSpeed = getRangeValue(particles.size.animation.speed) * ratio;
  }
  initParticle(particle) {
    const options = particle.options,
      ratio = this.pixelRatio,
      moveOptions = options.move,
      moveDistance = moveOptions.distance,
      props = particle.retina;
    props.attractDistance = getRangeValue(moveOptions.attract.distance) * ratio;
    props.moveDrift = getRangeValue(moveOptions.drift) * ratio;
    props.moveSpeed = getRangeValue(moveOptions.speed) * ratio;
    props.sizeAnimationSpeed = getRangeValue(options.size.animation.speed) * ratio;
    const maxDistance = props.maxDistance;
    maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
    maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;
    props.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Container.js









function guardCheck(container) {
  return container && !container.destroyed;
}
function initDelta(value, fpsLimit = 60, smooth = false) {
  return {
    value,
    factor: smooth ? 60 / fpsLimit : 60 * value / 1000
  };
}
function loadContainerOptions(engine, container, ...sourceOptionsArr) {
  const options = new Options(engine, container);
  loadOptions(options, ...sourceOptionsArr);
  return options;
}
const defaultPathGeneratorKey = "default",
  defaultPathGenerator = {
    generate: p => p.velocity,
    init: () => {},
    update: () => {},
    reset: () => {}
  };
class Container {
  constructor(engine, id, sourceOptions) {
    this.id = id;
    this._intersectionManager = entries => {
      if (!guardCheck(this) || !this.actualOptions.pauseOnOutsideViewport) {
        return;
      }
      for (const entry of entries) {
        if (entry.target !== this.interactivity.element) {
          continue;
        }
        (entry.isIntersecting ? this.play : this.pause)();
      }
    };
    this._nextFrame = async timestamp => {
      try {
        if (!this.smooth && this.lastFrameTime !== undefined && timestamp < this.lastFrameTime + 1000 / this.fpsLimit) {
          this.draw(false);
          return;
        }
        this.lastFrameTime ??= timestamp;
        const delta = initDelta(timestamp - this.lastFrameTime, this.fpsLimit, this.smooth);
        this.addLifeTime(delta.value);
        this.lastFrameTime = timestamp;
        if (delta.value > 1000) {
          this.draw(false);
          return;
        }
        await this.particles.draw(delta);
        if (!this.alive()) {
          this.destroy();
          return;
        }
        if (this.getAnimationStatus()) {
          this.draw(false);
        }
      } catch (e) {
        getLogger().error(`${errorPrefix} in animation loop`, e);
      }
    };
    this._engine = engine;
    this.fpsLimit = 120;
    this.smooth = false;
    this._delay = 0;
    this._duration = 0;
    this._lifeTime = 0;
    this._firstStart = true;
    this.started = false;
    this.destroyed = false;
    this._paused = true;
    this.lastFrameTime = 0;
    this.zLayers = 100;
    this.pageHidden = false;
    this._sourceOptions = sourceOptions;
    this._initialSourceOptions = sourceOptions;
    this.retina = new Retina(this);
    this.canvas = new Canvas(this);
    this.particles = new Particles(this._engine, this);
    this.pathGenerators = new Map();
    this.interactivity = {
      mouse: {
        clicking: false,
        inside: false
      }
    };
    this.plugins = new Map();
    this.drawers = new Map();
    this._options = loadContainerOptions(this._engine, this);
    this.actualOptions = loadContainerOptions(this._engine, this);
    this._eventListeners = new EventListeners(this);
    if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
      this._intersectionObserver = new IntersectionObserver(entries => this._intersectionManager(entries));
    }
    this._engine.dispatchEvent("containerBuilt", {
      container: this
    });
  }
  get options() {
    return this._options;
  }
  get sourceOptions() {
    return this._sourceOptions;
  }
  addClickHandler(callback) {
    if (!guardCheck(this)) {
      return;
    }
    const el = this.interactivity.element;
    if (!el) {
      return;
    }
    const clickOrTouchHandler = (e, pos, radius) => {
      if (!guardCheck(this)) {
        return;
      }
      const pxRatio = this.retina.pixelRatio,
        posRetina = {
          x: pos.x * pxRatio,
          y: pos.y * pxRatio
        },
        particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);
      callback(e, particles);
    };
    const clickHandler = e => {
      if (!guardCheck(this)) {
        return;
      }
      const mouseEvent = e,
        pos = {
          x: mouseEvent.offsetX || mouseEvent.clientX,
          y: mouseEvent.offsetY || mouseEvent.clientY
        };
      clickOrTouchHandler(e, pos, 1);
    };
    const touchStartHandler = () => {
      if (!guardCheck(this)) {
        return;
      }
      touched = true;
      touchMoved = false;
    };
    const touchMoveHandler = () => {
      if (!guardCheck(this)) {
        return;
      }
      touchMoved = true;
    };
    const touchEndHandler = e => {
      if (!guardCheck(this)) {
        return;
      }
      if (touched && !touchMoved) {
        const touchEvent = e;
        let lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
        if (!lastTouch) {
          lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - 1];
          if (!lastTouch) {
            return;
          }
        }
        const element = this.canvas.element,
          canvasRect = element ? element.getBoundingClientRect() : undefined,
          pos = {
            x: lastTouch.clientX - (canvasRect ? canvasRect.left : 0),
            y: lastTouch.clientY - (canvasRect ? canvasRect.top : 0)
          };
        clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
      }
      touched = false;
      touchMoved = false;
    };
    const touchCancelHandler = () => {
      if (!guardCheck(this)) {
        return;
      }
      touched = false;
      touchMoved = false;
    };
    let touched = false,
      touchMoved = false;
    el.addEventListener("click", clickHandler);
    el.addEventListener("touchstart", touchStartHandler);
    el.addEventListener("touchmove", touchMoveHandler);
    el.addEventListener("touchend", touchEndHandler);
    el.addEventListener("touchcancel", touchCancelHandler);
  }
  addLifeTime(value) {
    this._lifeTime += value;
  }
  addPath(key, generator, override = false) {
    if (!guardCheck(this) || !override && this.pathGenerators.has(key)) {
      return false;
    }
    this.pathGenerators.set(key, generator ?? defaultPathGenerator);
    return true;
  }
  alive() {
    return !this._duration || this._lifeTime <= this._duration;
  }
  destroy() {
    if (!guardCheck(this)) {
      return;
    }
    this.stop();
    this.particles.destroy();
    this.canvas.destroy();
    for (const [, drawer] of this.drawers) {
      drawer.destroy && drawer.destroy(this);
    }
    for (const key of this.drawers.keys()) {
      this.drawers.delete(key);
    }
    this._engine.plugins.destroy(this);
    this.destroyed = true;
    const mainArr = this._engine.dom(),
      idx = mainArr.findIndex(t => t === this);
    if (idx >= 0) {
      mainArr.splice(idx, 1);
    }
    this._engine.dispatchEvent("containerDestroyed", {
      container: this
    });
  }
  draw(force) {
    if (!guardCheck(this)) {
      return;
    }
    let refreshTime = force;
    this._drawAnimationFrame = requestAnimationFrame(async timestamp => {
      if (refreshTime) {
        this.lastFrameTime = undefined;
        refreshTime = false;
      }
      await this._nextFrame(timestamp);
    });
  }
  async export(type, options = {}) {
    for (const [, plugin] of this.plugins) {
      if (!plugin.export) {
        continue;
      }
      const res = await plugin.export(type, options);
      if (!res.supported) {
        continue;
      }
      return res.blob;
    }
    getLogger().error(`${errorPrefix} - Export plugin with type ${type} not found`);
  }
  getAnimationStatus() {
    return !this._paused && !this.pageHidden && guardCheck(this);
  }
  handleClickMode(mode) {
    if (!guardCheck(this)) {
      return;
    }
    this.particles.handleClickMode(mode);
    for (const [, plugin] of this.plugins) {
      plugin.handleClickMode && plugin.handleClickMode(mode);
    }
  }
  async init() {
    if (!guardCheck(this)) {
      return;
    }
    const shapes = this._engine.plugins.getSupportedShapes();
    for (const type of shapes) {
      const drawer = this._engine.plugins.getShapeDrawer(type);
      if (drawer) {
        this.drawers.set(type, drawer);
      }
    }
    this._options = loadContainerOptions(this._engine, this, this._initialSourceOptions, this.sourceOptions);
    this.actualOptions = loadContainerOptions(this._engine, this, this._options);
    const availablePlugins = this._engine.plugins.getAvailablePlugins(this);
    for (const [id, plugin] of availablePlugins) {
      this.plugins.set(id, plugin);
    }
    this.retina.init();
    await this.canvas.init();
    this.updateActualOptions();
    this.canvas.initBackground();
    this.canvas.resize();
    this.zLayers = this.actualOptions.zLayers;
    this._duration = getRangeValue(this.actualOptions.duration) * 1000;
    this._delay = getRangeValue(this.actualOptions.delay) * 1000;
    this._lifeTime = 0;
    this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 120;
    this.smooth = this.actualOptions.smooth;
    for (const [, drawer] of this.drawers) {
      drawer.init && (await drawer.init(this));
    }
    for (const [, plugin] of this.plugins) {
      plugin.init && (await plugin.init());
    }
    this._engine.dispatchEvent("containerInit", {
      container: this
    });
    this.particles.init();
    this.particles.setDensity();
    for (const [, plugin] of this.plugins) {
      plugin.particlesSetup && plugin.particlesSetup();
    }
    this._engine.dispatchEvent("particlesSetup", {
      container: this
    });
  }
  async loadTheme(name) {
    if (!guardCheck(this)) {
      return;
    }
    this._currentTheme = name;
    await this.refresh();
  }
  pause() {
    if (!guardCheck(this)) {
      return;
    }
    if (this._drawAnimationFrame !== undefined) {
      cancelAnimationFrame(this._drawAnimationFrame);
      delete this._drawAnimationFrame;
    }
    if (this._paused) {
      return;
    }
    for (const [, plugin] of this.plugins) {
      plugin.pause && plugin.pause();
    }
    if (!this.pageHidden) {
      this._paused = true;
    }
    this._engine.dispatchEvent("containerPaused", {
      container: this
    });
  }
  play(force) {
    if (!guardCheck(this)) {
      return;
    }
    const needsUpdate = this._paused || force;
    if (this._firstStart && !this.actualOptions.autoPlay) {
      this._firstStart = false;
      return;
    }
    if (this._paused) {
      this._paused = false;
    }
    if (needsUpdate) {
      for (const [, plugin] of this.plugins) {
        if (plugin.play) {
          plugin.play();
        }
      }
    }
    this._engine.dispatchEvent("containerPlay", {
      container: this
    });
    this.draw(needsUpdate || false);
  }
  async refresh() {
    if (!guardCheck(this)) {
      return;
    }
    this.stop();
    return this.start();
  }
  async reset() {
    if (!guardCheck(this)) {
      return;
    }
    this._initialSourceOptions = undefined;
    this._options = loadContainerOptions(this._engine, this);
    this.actualOptions = loadContainerOptions(this._engine, this, this._options);
    return this.refresh();
  }
  setNoise(noiseOrGenerator, init, update) {
    if (!guardCheck(this)) {
      return;
    }
    this.setPath(noiseOrGenerator, init, update);
  }
  setPath(pathOrGenerator, init, update) {
    if (!pathOrGenerator || !guardCheck(this)) {
      return;
    }
    const pathGenerator = {
      ...defaultPathGenerator
    };
    if (isFunction(pathOrGenerator)) {
      pathGenerator.generate = pathOrGenerator;
      if (init) {
        pathGenerator.init = init;
      }
      if (update) {
        pathGenerator.update = update;
      }
    } else {
      const oldGenerator = pathGenerator;
      pathGenerator.generate = pathOrGenerator.generate || oldGenerator.generate;
      pathGenerator.init = pathOrGenerator.init || oldGenerator.init;
      pathGenerator.update = pathOrGenerator.update || oldGenerator.update;
    }
    this.addPath(defaultPathGeneratorKey, pathGenerator, true);
  }
  async start() {
    if (!guardCheck(this) || this.started) {
      return;
    }
    await this.init();
    this.started = true;
    await new Promise(resolve => {
      this._delayTimeout = setTimeout(async () => {
        this._eventListeners.addListeners();
        if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
          this._intersectionObserver.observe(this.interactivity.element);
        }
        for (const [, plugin] of this.plugins) {
          plugin.start && (await plugin.start());
        }
        this._engine.dispatchEvent("containerStarted", {
          container: this
        });
        this.play();
        resolve();
      }, this._delay);
    });
  }
  stop() {
    if (!guardCheck(this) || !this.started) {
      return;
    }
    if (this._delayTimeout) {
      clearTimeout(this._delayTimeout);
      delete this._delayTimeout;
    }
    this._firstStart = true;
    this.started = false;
    this._eventListeners.removeListeners();
    this.pause();
    this.particles.clear();
    this.canvas.stop();
    if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
      this._intersectionObserver.unobserve(this.interactivity.element);
    }
    for (const [, plugin] of this.plugins) {
      plugin.stop && plugin.stop();
    }
    for (const key of this.plugins.keys()) {
      this.plugins.delete(key);
    }
    this._sourceOptions = this._options;
    this._engine.dispatchEvent("containerStopped", {
      container: this
    });
  }
  updateActualOptions() {
    this.actualOptions.responsive = [];
    const newMaxWidth = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this._options);
    this.actualOptions.setTheme(this._currentTheme);
    if (this.responsiveMaxWidth === newMaxWidth) {
      return false;
    }
    this.responsiveMaxWidth = newMaxWidth;
    return true;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/EventDispatcher.js
class EventDispatcher {
  constructor() {
    this._listeners = new Map();
  }
  addEventListener(type, listener) {
    this.removeEventListener(type, listener);
    let arr = this._listeners.get(type);
    if (!arr) {
      arr = [];
      this._listeners.set(type, arr);
    }
    arr.push(listener);
  }
  dispatchEvent(type, args) {
    const listeners = this._listeners.get(type);
    listeners && listeners.forEach(handler => handler(args));
  }
  hasEventListener(type) {
    return !!this._listeners.get(type);
  }
  removeAllEventListeners(type) {
    if (!type) {
      this._listeners = new Map();
    } else {
      this._listeners.delete(type);
    }
  }
  removeEventListener(type, listener) {
    const arr = this._listeners.get(type);
    if (!arr) {
      return;
    }
    const length = arr.length,
      idx = arr.indexOf(listener);
    if (idx < 0) {
      return;
    }
    if (length === 1) {
      this._listeners.delete(type);
    } else {
      arr.splice(idx, 1);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Plugins.js

function getItemsFromInitializer(container, map, initializers, force = false) {
  let res = map.get(container);
  if (!res || force) {
    res = [...initializers.values()].map(t => t(container));
    map.set(container, res);
  }
  return res;
}
class Plugins {
  constructor(engine) {
    this._engine = engine;
    this.plugins = [];
    this._initializers = {
      interactors: new Map(),
      movers: new Map(),
      updaters: new Map()
    };
    this.interactors = new Map();
    this.movers = new Map();
    this.updaters = new Map();
    this.presets = new Map();
    this.drawers = new Map();
    this.pathGenerators = new Map();
  }
  addInteractor(name, initInteractor) {
    this._initializers.interactors.set(name, initInteractor);
  }
  addParticleMover(name, initMover) {
    this._initializers.movers.set(name, initMover);
  }
  addParticleUpdater(name, initUpdater) {
    this._initializers.updaters.set(name, initUpdater);
  }
  addPathGenerator(type, pathGenerator) {
    !this.getPathGenerator(type) && this.pathGenerators.set(type, pathGenerator);
  }
  addPlugin(plugin) {
    !this.getPlugin(plugin.id) && this.plugins.push(plugin);
  }
  addPreset(presetKey, options, override = false) {
    (override || !this.getPreset(presetKey)) && this.presets.set(presetKey, options);
  }
  addShapeDrawer(types, drawer) {
    executeOnSingleOrMultiple(types, type => {
      !this.getShapeDrawer(type) && this.drawers.set(type, drawer);
    });
  }
  destroy(container) {
    this.updaters.delete(container);
    this.movers.delete(container);
    this.interactors.delete(container);
  }
  getAvailablePlugins(container) {
    const res = new Map();
    for (const plugin of this.plugins) {
      plugin.needsPlugin(container.actualOptions) && res.set(plugin.id, plugin.getPlugin(container));
    }
    return res;
  }
  getInteractors(container, force = false) {
    return getItemsFromInitializer(container, this.interactors, this._initializers.interactors, force);
  }
  getMovers(container, force = false) {
    return getItemsFromInitializer(container, this.movers, this._initializers.movers, force);
  }
  getPathGenerator(type) {
    return this.pathGenerators.get(type);
  }
  getPlugin(plugin) {
    return this.plugins.find(t => t.id === plugin);
  }
  getPreset(preset) {
    return this.presets.get(preset);
  }
  getShapeDrawer(type) {
    return this.drawers.get(type);
  }
  getSupportedShapes() {
    return this.drawers.keys();
  }
  getUpdaters(container, force = false) {
    return getItemsFromInitializer(container, this.updaters, this._initializers.updaters, force);
  }
  loadOptions(options, sourceOptions) {
    for (const plugin of this.plugins) {
      plugin.loadOptions(options, sourceOptions);
    }
  }
  loadParticlesOptions(container, options, ...sourceOptions) {
    const updaters = this.updaters.get(container);
    if (!updaters) {
      return;
    }
    for (const updater of updaters) {
      updater.loadOptions && updater.loadOptions(options, ...sourceOptions);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Engine.js






async function getDataFromUrl(data) {
  const url = itemFromSingleOrMultiple(data.url, data.index);
  if (!url) {
    return data.fallback;
  }
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  getLogger().error(`${errorPrefix} ${response.status} while retrieving config file`);
  return data.fallback;
}
function isParamsEmpty(params) {
  return !params.id && !params.element && !params.url && !params.options;
}
function isParams(obj) {
  return !isParamsEmpty(obj);
}
class Engine {
  constructor() {
    this._configs = new Map();
    this._domArray = [];
    this._eventDispatcher = new EventDispatcher();
    this._initialized = false;
    this.plugins = new Plugins(this);
  }
  get configs() {
    const res = {};
    for (const [name, config] of this._configs) {
      res[name] = config;
    }
    return res;
  }
  get version() {
    return "2.12.0";
  }
  addConfig(nameOrConfig, config) {
    if (isString(nameOrConfig)) {
      if (config) {
        config.name = nameOrConfig;
        this._configs.set(nameOrConfig, config);
      }
    } else {
      this._configs.set(nameOrConfig.name ?? "default", nameOrConfig);
    }
  }
  addEventListener(type, listener) {
    this._eventDispatcher.addEventListener(type, listener);
  }
  async addInteractor(name, interactorInitializer, refresh = true) {
    this.plugins.addInteractor(name, interactorInitializer);
    await this.refresh(refresh);
  }
  async addMover(name, moverInitializer, refresh = true) {
    this.plugins.addParticleMover(name, moverInitializer);
    await this.refresh(refresh);
  }
  async addParticleUpdater(name, updaterInitializer, refresh = true) {
    this.plugins.addParticleUpdater(name, updaterInitializer);
    await this.refresh(refresh);
  }
  async addPathGenerator(name, generator, refresh = true) {
    this.plugins.addPathGenerator(name, generator);
    await this.refresh(refresh);
  }
  async addPlugin(plugin, refresh = true) {
    this.plugins.addPlugin(plugin);
    await this.refresh(refresh);
  }
  async addPreset(preset, options, override = false, refresh = true) {
    this.plugins.addPreset(preset, options, override);
    await this.refresh(refresh);
  }
  async addShape(shape, drawer, initOrRefresh, afterEffectOrRefresh, destroyOrRefresh, refresh = true) {
    let customDrawer;
    let realRefresh = refresh,
      realInit,
      realAfterEffect,
      realDestroy;
    if (isBoolean(initOrRefresh)) {
      realRefresh = initOrRefresh;
      realInit = undefined;
    } else {
      realInit = initOrRefresh;
    }
    if (isBoolean(afterEffectOrRefresh)) {
      realRefresh = afterEffectOrRefresh;
      realAfterEffect = undefined;
    } else {
      realAfterEffect = afterEffectOrRefresh;
    }
    if (isBoolean(destroyOrRefresh)) {
      realRefresh = destroyOrRefresh;
      realDestroy = undefined;
    } else {
      realDestroy = destroyOrRefresh;
    }
    if (isFunction(drawer)) {
      customDrawer = {
        afterEffect: realAfterEffect,
        destroy: realDestroy,
        draw: drawer,
        init: realInit
      };
    } else {
      customDrawer = drawer;
    }
    this.plugins.addShapeDrawer(shape, customDrawer);
    await this.refresh(realRefresh);
  }
  dispatchEvent(type, args) {
    this._eventDispatcher.dispatchEvent(type, args);
  }
  dom() {
    return this._domArray;
  }
  domItem(index) {
    const dom = this.dom(),
      item = dom[index];
    if (!item || item.destroyed) {
      dom.splice(index, 1);
      return;
    }
    return item;
  }
  init() {
    if (this._initialized) {
      return;
    }
    this._initialized = true;
  }
  async load(tagIdOrOptionsOrParams, options) {
    return this.loadFromArray(tagIdOrOptionsOrParams, options);
  }
  async loadFromArray(tagIdOrOptionsOrParams, optionsOrIndex, index) {
    let params;
    if (!isParams(tagIdOrOptionsOrParams)) {
      params = {};
      if (isString(tagIdOrOptionsOrParams)) {
        params.id = tagIdOrOptionsOrParams;
      } else {
        params.options = tagIdOrOptionsOrParams;
      }
      if (isNumber(optionsOrIndex)) {
        params.index = optionsOrIndex;
      } else {
        params.options = optionsOrIndex ?? params.options;
      }
      params.index = index ?? params.index;
    } else {
      params = tagIdOrOptionsOrParams;
    }
    return this._loadParams(params);
  }
  async loadJSON(tagId, pathConfigJson, index) {
    let url, id;
    if (isNumber(pathConfigJson) || pathConfigJson === undefined) {
      url = tagId;
    } else {
      id = tagId;
      url = pathConfigJson;
    }
    return this._loadParams({
      id: id,
      url,
      index
    });
  }
  async refresh(refresh = true) {
    if (!refresh) {
      return;
    }
    this.dom().forEach(t => t.refresh());
  }
  removeEventListener(type, listener) {
    this._eventDispatcher.removeEventListener(type, listener);
  }
  async set(id, element, options, index) {
    const params = {
      index
    };
    if (isString(id)) {
      params.id = id;
    } else {
      params.element = id;
    }
    if (element instanceof HTMLElement) {
      params.element = element;
    } else {
      params.options = element;
    }
    if (isNumber(options)) {
      params.index = options;
    } else {
      params.options = options ?? params.options;
    }
    return this._loadParams(params);
  }
  async setJSON(id, element, pathConfigJson, index) {
    const params = {};
    if (id instanceof HTMLElement) {
      params.element = id;
      params.url = element;
      params.index = pathConfigJson;
    } else {
      params.id = id;
      params.element = element;
      params.url = pathConfigJson;
      params.index = index;
    }
    return this._loadParams(params);
  }
  setOnClickHandler(callback) {
    const dom = this.dom();
    if (!dom.length) {
      throw new Error(`${errorPrefix} can only set click handlers after calling tsParticles.load()`);
    }
    for (const domItem of dom) {
      domItem.addClickHandler(callback);
    }
  }
  async _loadParams(params) {
    const id = params.id ?? `tsparticles${Math.floor(getRandom() * 10000)}`,
      {
        index,
        url
      } = params,
      options = url ? await getDataFromUrl({
        fallback: params.options,
        url,
        index
      }) : params.options;
    let domContainer = params.element ?? document.getElementById(id);
    if (!domContainer) {
      domContainer = document.createElement("div");
      domContainer.id = id;
      document.body.append(domContainer);
    }
    const currentOptions = itemFromSingleOrMultiple(options, index),
      dom = this.dom(),
      oldIndex = dom.findIndex(v => v.id === id);
    if (oldIndex >= 0) {
      const old = this.domItem(oldIndex);
      if (old && !old.destroyed) {
        old.destroy();
        dom.splice(oldIndex, 1);
      }
    }
    let canvasEl;
    if (domContainer.tagName.toLowerCase() === "canvas") {
      canvasEl = domContainer;
      canvasEl.dataset[generatedAttribute] = "false";
    } else {
      const existingCanvases = domContainer.getElementsByTagName("canvas");
      if (existingCanvases.length) {
        canvasEl = existingCanvases[0];
        canvasEl.dataset[generatedAttribute] = "false";
      } else {
        canvasEl = document.createElement("canvas");
        canvasEl.dataset[generatedAttribute] = "true";
        domContainer.appendChild(canvasEl);
      }
    }
    if (!canvasEl.style.width) {
      canvasEl.style.width = "100%";
    }
    if (!canvasEl.style.height) {
      canvasEl.style.height = "100%";
    }
    const newItem = new Container(this, id, currentOptions);
    if (oldIndex >= 0) {
      dom.splice(oldIndex, 0, newItem);
    } else {
      dom.push(newItem);
    }
    newItem.canvas.loadCanvas(canvasEl);
    await newItem.start();
    return newItem;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/HslColorManager.js


class HslColorManager {
  constructor() {
    this.key = "hsl";
    this.stringPrefix = "hsl";
  }
  handleColor(color) {
    const colorValue = color.value,
      hslColor = colorValue.hsl ?? color.value;
    if (hslColor.h !== undefined && hslColor.s !== undefined && hslColor.l !== undefined) {
      return hslToRgb(hslColor);
    }
  }
  handleRangeColor(color) {
    const colorValue = color.value,
      hslColor = colorValue.hsl ?? color.value;
    if (hslColor.h !== undefined && hslColor.l !== undefined) {
      return hslToRgb({
        h: getRangeValue(hslColor.h),
        l: getRangeValue(hslColor.l),
        s: getRangeValue(hslColor.s)
      });
    }
  }
  parseString(input) {
    if (!input.startsWith("hsl")) {
      return;
    }
    const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.%]+)\s*)?\)/i,
      result = regex.exec(input);
    return result ? hslaToRgba({
      a: result.length > 4 ? parseAlpha(result[5]) : 1,
      h: parseInt(result[1], 10),
      l: parseInt(result[3], 10),
      s: parseInt(result[2], 10)
    }) : undefined;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/RgbColorManager.js

class RgbColorManager {
  constructor() {
    this.key = "rgb";
    this.stringPrefix = "rgb";
  }
  handleColor(color) {
    const colorValue = color.value,
      rgbColor = colorValue.rgb ?? color.value;
    if (rgbColor.r !== undefined) {
      return rgbColor;
    }
  }
  handleRangeColor(color) {
    const colorValue = color.value,
      rgbColor = colorValue.rgb ?? color.value;
    if (rgbColor.r !== undefined) {
      return {
        r: getRangeValue(rgbColor.r),
        g: getRangeValue(rgbColor.g),
        b: getRangeValue(rgbColor.b)
      };
    }
  }
  parseString(input) {
    if (!input.startsWith(this.stringPrefix)) {
      return;
    }
    const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.%]+)\s*)?\)/i,
      result = regex.exec(input);
    return result ? {
      a: result.length > 4 ? parseAlpha(result[5]) : 1,
      b: parseInt(result[3], 10),
      g: parseInt(result[2], 10),
      r: parseInt(result[1], 10)
    } : undefined;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/init.js




function init() {
  const rgbColorManager = new RgbColorManager(),
    hslColorManager = new HslColorManager();
  addColorManager(rgbColorManager);
  addColorManager(hslColorManager);
  const engine = new Engine();
  engine.init();
  return engine;
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/ParticlesInteractorBase.js
class ParticlesInteractorBase {
  constructor(container) {
    this.container = container;
    this.type = "particles";
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/exports.js

























































































;// CONCATENATED MODULE: ../../engine/dist/esm/index.js


const tsParticles = init();
if (!isSsr()) {
  window.tsParticles = tsParticles;
}



;// CONCATENATED MODULE: ../pjs/dist/esm/marcbruederlin/Particles.js

class Particles_Particles {
  static init(options) {
    const particles = new Particles_Particles(),
      selector = options.selector;
    if (!selector) {
      throw new Error("No selector provided");
    }
    const el = document.querySelector(selector);
    if (!el) {
      throw new Error("No element found for selector");
    }
    tsParticles.set(selector.replace(".", "").replace("!", ""), el, {
      fullScreen: {
        enable: false
      },
      particles: {
        color: {
          value: options.color ?? "!000000"
        },
        links: {
          color: "random",
          distance: options.minDistance ?? 120,
          enable: options.connectParticles ?? false
        },
        move: {
          enable: true,
          speed: options.speed ?? 0.5
        },
        number: {
          value: options.maxParticles ?? 100
        },
        size: {
          value: {
            min: 1,
            max: options.sizeVariations ?? 3
          }
        }
      },
      responsive: options.responsive?.map(responsive => ({
        maxWidth: responsive.breakpoint,
        options: {
          particles: {
            color: {
              value: responsive.options?.color
            },
            links: {
              distance: responsive.options?.minDistance,
              enable: responsive.options?.connectParticles
            },
            number: {
              value: options.maxParticles
            },
            move: {
              enable: true,
              speed: responsive.options?.speed
            },
            size: {
              value: responsive.options?.sizeVariations
            }
          }
        }
      }))
    }).then(container => {
      particles._container = container;
    });
    return particles;
  }
  destroy() {
    const container = this._container;
    container && container.destroy();
  }
  pauseAnimation() {
    const container = this._container;
    container && container.pause();
  }
  resumeAnimation() {
    const container = this._container;
    container && container.play();
  }
}
;// CONCATENATED MODULE: ../pjs/dist/esm/VincentGarreau/particles.js
const initParticlesJS = engine => {
  const particlesJS = (tagId, options) => {
    return engine.load(tagId, options);
  };
  particlesJS.load = (tagId, pathConfigJson, callback) => {
    engine.loadJSON(tagId, pathConfigJson).then(container => {
      if (container) {
        callback(container);
      }
    }).catch(() => {
      callback(undefined);
    });
  };
  particlesJS.setOnClickHandler = callback => {
    engine.setOnClickHandler(callback);
  };
  const pJSDom = engine.dom();
  return {
    particlesJS,
    pJSDom
  };
};

;// CONCATENATED MODULE: ../pjs/dist/esm/index.js


const initPjs = engine => {
  const {
    particlesJS,
    pJSDom
  } = initParticlesJS(engine);
  window.particlesJS = particlesJS;
  window.pJSDom = pJSDom;
  window.Particles = Particles_Particles;
  return {
    particlesJS,
    pJSDom,
    Particles: Particles_Particles
  };
};

;// CONCATENATED MODULE: ../../move/base/dist/esm/Utils.js

function applyDistance(particle) {
  const initialPosition = particle.initialPosition,
    {
      dx,
      dy
    } = getDistances(initialPosition, particle.position),
    dxFixed = Math.abs(dx),
    dyFixed = Math.abs(dy),
    {
      maxDistance
    } = particle.retina,
    hDistance = maxDistance.horizontal,
    vDistance = maxDistance.vertical;
  if (!hDistance && !vDistance) {
    return;
  }
  if ((hDistance && dxFixed >= hDistance || vDistance && dyFixed >= vDistance) && !particle.misplaced) {
    particle.misplaced = !!hDistance && dxFixed > hDistance || !!vDistance && dyFixed > vDistance;
    if (hDistance) {
      particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
    }
    if (vDistance) {
      particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
    }
  } else if ((!hDistance || dxFixed < hDistance) && (!vDistance || dyFixed < vDistance) && particle.misplaced) {
    particle.misplaced = false;
  } else if (particle.misplaced) {
    const pos = particle.position,
      vel = particle.velocity;
    if (hDistance && (pos.x < initialPosition.x && vel.x < 0 || pos.x > initialPosition.x && vel.x > 0)) {
      vel.x *= -getRandom();
    }
    if (vDistance && (pos.y < initialPosition.y && vel.y < 0 || pos.y > initialPosition.y && vel.y > 0)) {
      vel.y *= -getRandom();
    }
  }
}
function move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, delta) {
  applyPath(particle, delta);
  const gravityOptions = particle.gravity,
    gravityFactor = gravityOptions?.enable && gravityOptions.inverse ? -1 : 1;
  if (moveDrift && moveSpeed) {
    particle.velocity.x += moveDrift * delta.factor / (60 * moveSpeed);
  }
  if (gravityOptions?.enable && moveSpeed) {
    particle.velocity.y += gravityFactor * (gravityOptions.acceleration * delta.factor) / (60 * moveSpeed);
  }
  const decay = particle.moveDecay;
  particle.velocity.multTo(decay);
  const velocity = particle.velocity.mult(moveSpeed);
  if (gravityOptions?.enable && maxSpeed > 0 && (!gravityOptions.inverse && velocity.y >= 0 && velocity.y >= maxSpeed || gravityOptions.inverse && velocity.y <= 0 && velocity.y <= -maxSpeed)) {
    velocity.y = gravityFactor * maxSpeed;
    if (moveSpeed) {
      particle.velocity.y = velocity.y / moveSpeed;
    }
  }
  const zIndexOptions = particle.options.zIndex,
    zVelocityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.velocityRate;
  velocity.multTo(zVelocityFactor);
  const {
    position
  } = particle;
  position.addTo(velocity);
  if (moveOptions.vibrate) {
    position.x += Math.sin(position.x * Math.cos(position.y));
    position.y += Math.cos(position.y * Math.sin(position.x));
  }
}
function spin(particle, moveSpeed) {
  const container = particle.container;
  if (!particle.spin) {
    return;
  }
  const updateFunc = {
    x: particle.spin.direction === "clockwise" ? Math.cos : Math.sin,
    y: particle.spin.direction === "clockwise" ? Math.sin : Math.cos
  };
  particle.position.x = particle.spin.center.x + particle.spin.radius * updateFunc.x(particle.spin.angle);
  particle.position.y = particle.spin.center.y + particle.spin.radius * updateFunc.y(particle.spin.angle);
  particle.spin.radius += particle.spin.acceleration;
  const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height);
  if (particle.spin.radius > maxCanvasSize / 2) {
    particle.spin.radius = maxCanvasSize / 2;
    particle.spin.acceleration *= -1;
  } else if (particle.spin.radius < 0) {
    particle.spin.radius = 0;
    particle.spin.acceleration *= -1;
  }
  particle.spin.angle += moveSpeed / 100 * (1 - particle.spin.radius / maxCanvasSize);
}
function applyPath(particle, delta) {
  const particlesOptions = particle.options,
    pathOptions = particlesOptions.move.path,
    pathEnabled = pathOptions.enable;
  if (!pathEnabled) {
    return;
  }
  if (particle.lastPathTime <= particle.pathDelay) {
    particle.lastPathTime += delta.value;
    return;
  }
  const path = particle.pathGenerator?.generate(particle, delta);
  if (path) {
    particle.velocity.addTo(path);
  }
  if (pathOptions.clamp) {
    particle.velocity.x = clamp(particle.velocity.x, -1, 1);
    particle.velocity.y = clamp(particle.velocity.y, -1, 1);
  }
  particle.lastPathTime -= particle.pathDelay;
}
function getProximitySpeedFactor(particle) {
  return particle.slow.inRange ? particle.slow.factor : 1;
}
;// CONCATENATED MODULE: ../../move/base/dist/esm/BaseMover.js


const diffFactor = 2;
class BaseMover {
  constructor() {
    this._initSpin = particle => {
      const container = particle.container,
        options = particle.options,
        spinOptions = options.move.spin;
      if (!spinOptions.enable) {
        return;
      }
      const spinPos = spinOptions.position ?? {
          x: 50,
          y: 50
        },
        spinCenter = {
          x: spinPos.x / 100 * container.canvas.size.width,
          y: spinPos.y / 100 * container.canvas.size.height
        },
        pos = particle.getPosition(),
        distance = getDistance(pos, spinCenter),
        spinAcceleration = getRangeValue(spinOptions.acceleration);
      particle.retina.spinAcceleration = spinAcceleration * container.retina.pixelRatio;
      particle.spin = {
        center: spinCenter,
        direction: particle.velocity.x >= 0 ? "clockwise" : "counter-clockwise",
        angle: particle.velocity.angle,
        radius: distance,
        acceleration: particle.retina.spinAcceleration
      };
    };
  }
  init(particle) {
    const options = particle.options,
      gravityOptions = options.move.gravity;
    particle.gravity = {
      enable: gravityOptions.enable,
      acceleration: getRangeValue(gravityOptions.acceleration),
      inverse: gravityOptions.inverse
    };
    this._initSpin(particle);
  }
  isEnabled(particle) {
    return !particle.destroyed && particle.options.move.enable;
  }
  move(particle, delta) {
    const particleOptions = particle.options,
      moveOptions = particleOptions.move;
    if (!moveOptions.enable) {
      return;
    }
    const container = particle.container,
      pxRatio = container.retina.pixelRatio,
      slowFactor = getProximitySpeedFactor(particle),
      baseSpeed = (particle.retina.moveSpeed ??= getRangeValue(moveOptions.speed) * pxRatio) * container.retina.reduceFactor,
      moveDrift = particle.retina.moveDrift ??= getRangeValue(particle.options.move.drift) * pxRatio,
      maxSize = getRangeMax(particleOptions.size.value) * pxRatio,
      sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : 1,
      moveSpeed = baseSpeed * sizeFactor * slowFactor * (delta.factor || 1) / diffFactor,
      maxSpeed = particle.retina.maxSpeed ?? container.retina.maxSpeed;
    if (moveOptions.spin.enable) {
      spin(particle, moveSpeed);
    } else {
      move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, delta);
    }
    applyDistance(particle);
  }
}
;// CONCATENATED MODULE: ../../move/base/dist/esm/index.js

async function loadBaseMover(engine, refresh = true) {
  await engine.addMover("base", () => new BaseMover(), refresh);
}
;// CONCATENATED MODULE: ../../shapes/circle/dist/esm/CircleDrawer.js

class CircleDrawer {
  draw(context, particle, radius) {
    if (!particle.circleRange) {
      particle.circleRange = {
        min: 0,
        max: Math.PI * 2
      };
    }
    const circleRange = particle.circleRange;
    context.arc(0, 0, radius, circleRange.min, circleRange.max, false);
  }
  getSidesCount() {
    return 12;
  }
  particleInit(container, particle) {
    const shapeData = particle.shapeData,
      angle = shapeData?.angle ?? {
        max: 360,
        min: 0
      };
    particle.circleRange = !isObject(angle) ? {
      min: 0,
      max: angle * Math.PI / 180
    } : {
      min: angle.min * Math.PI / 180,
      max: angle.max * Math.PI / 180
    };
  }
}
;// CONCATENATED MODULE: ../../shapes/circle/dist/esm/index.js

async function loadCircleShape(engine, refresh = true) {
  await engine.addShape("circle", new CircleDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../updaters/color/dist/esm/Utils.js

function updateColorValue(delta, colorValue, valueAnimation, max, decrease) {
  if (!colorValue || !valueAnimation.enable || (colorValue.maxLoops ?? 0) > 0 && (colorValue.loops ?? 0) > (colorValue.maxLoops ?? 0)) {
    return;
  }
  if (!colorValue.time) {
    colorValue.time = 0;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    colorValue.time += delta.value;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    return;
  }
  const offset = randomInRange(valueAnimation.offset),
    velocity = (colorValue.velocity ?? 0) * delta.factor + offset * 3.6,
    decay = colorValue.decay ?? 1;
  if (!decrease || colorValue.status === "increasing") {
    colorValue.value += velocity;
    if (colorValue.value > max) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      if (decrease) {
        colorValue.status = "decreasing";
        colorValue.value -= colorValue.value % max;
      }
    }
  } else {
    colorValue.value -= velocity;
    if (colorValue.value < 0) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      colorValue.status = "increasing";
      colorValue.value += colorValue.value;
    }
  }
  if (colorValue.velocity && decay !== 1) {
    colorValue.velocity *= decay;
  }
  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}
function updateColor(particle, delta) {
  const {
      h: hAnimation,
      s: sAnimation,
      l: lAnimation
    } = particle.options.color.animation,
    {
      color
    } = particle;
  if (!color) {
    return;
  }
  const {
    h,
    s,
    l
  } = color;
  if (h) {
    updateColorValue(delta, h, hAnimation, 360, false);
  }
  if (s) {
    updateColorValue(delta, s, sAnimation, 100, true);
  }
  if (l) {
    updateColorValue(delta, l, lAnimation, 100, true);
  }
}
;// CONCATENATED MODULE: ../../updaters/color/dist/esm/ColorUpdater.js


class ColorUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const hslColor = rangeColorToHsl(particle.options.color, particle.id, particle.options.reduceDuplicates);
    if (hslColor) {
      particle.color = getHslAnimationFromHsl(hslColor, particle.options.color.animation, this.container.retina.reduceFactor);
    }
  }
  isEnabled(particle) {
    const {
        h: hAnimation,
        s: sAnimation,
        l: lAnimation
      } = particle.options.color.animation,
      {
        color
      } = particle;
    return !particle.destroyed && !particle.spawning && (color?.h.value !== undefined && hAnimation.enable || color?.s.value !== undefined && sAnimation.enable || color?.l.value !== undefined && lAnimation.enable);
  }
  update(particle, delta) {
    updateColor(particle, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/color/dist/esm/index.js

async function loadColorUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("color", container => new ColorUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../updaters/opacity/dist/esm/Utils.js

function checkDestroy(particle, value, minValue, maxValue) {
  switch (particle.options.opacity.animation.destroy) {
    case "max":
      if (value >= maxValue) {
        particle.destroy();
      }
      break;
    case "min":
      if (value <= minValue) {
        particle.destroy();
      }
      break;
  }
}
function updateOpacity(particle, delta) {
  const data = particle.opacity;
  if (particle.destroyed || !data?.enable || (data.maxLoops ?? 0) > 0 && (data.loops ?? 0) > (data.maxLoops ?? 0)) {
    return;
  }
  const minValue = data.min,
    maxValue = data.max,
    decay = data.decay ?? 1;
  if (!data.time) {
    data.time = 0;
  }
  if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
    data.time += delta.value;
  }
  if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
    return;
  }
  switch (data.status) {
    case "increasing":
      if (data.value >= maxValue) {
        data.status = "decreasing";
        if (!data.loops) {
          data.loops = 0;
        }
        data.loops++;
      } else {
        data.value += (data.velocity ?? 0) * delta.factor;
      }
      break;
    case "decreasing":
      if (data.value <= minValue) {
        data.status = "increasing";
        if (!data.loops) {
          data.loops = 0;
        }
        data.loops++;
      } else {
        data.value -= (data.velocity ?? 0) * delta.factor;
      }
      break;
  }
  if (data.velocity && data.decay !== 1) {
    data.velocity *= decay;
  }
  checkDestroy(particle, data.value, minValue, maxValue);
  if (!particle.destroyed) {
    data.value = clamp(data.value, minValue, maxValue);
  }
}
;// CONCATENATED MODULE: ../../updaters/opacity/dist/esm/OpacityUpdater.js


class OpacityUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const opacityOptions = particle.options.opacity;
    particle.opacity = initParticleNumericAnimationValue(opacityOptions, 1);
    const opacityAnimation = opacityOptions.animation;
    if (opacityAnimation.enable) {
      particle.opacity.velocity = getRangeValue(opacityAnimation.speed) / 100 * this.container.retina.reduceFactor;
      if (!opacityAnimation.sync) {
        particle.opacity.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning && !!particle.opacity && particle.opacity.enable && ((particle.opacity.maxLoops ?? 0) <= 0 || (particle.opacity.maxLoops ?? 0) > 0 && (particle.opacity.loops ?? 0) < (particle.opacity.maxLoops ?? 0));
  }
  reset(particle) {
    if (particle.opacity) {
      particle.opacity.time = 0;
      particle.opacity.loops = 0;
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateOpacity(particle, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/opacity/dist/esm/index.js

async function loadOpacityUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("opacity", container => new OpacityUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/Utils.js

function bounceHorizontal(data) {
  if (data.outMode !== "bounce" && data.outMode !== "bounce-horizontal" && data.outMode !== "bounceHorizontal" && data.outMode !== "split" || data.direction !== "left" && data.direction !== "right") {
    return;
  }
  if (data.bounds.right < 0 && data.direction === "left") {
    data.particle.position.x = data.size + data.offset.x;
  } else if (data.bounds.left > data.canvasSize.width && data.direction === "right") {
    data.particle.position.x = data.canvasSize.width - data.size - data.offset.x;
  }
  const velocity = data.particle.velocity.x;
  let bounced = false;
  if (data.direction === "right" && data.bounds.right >= data.canvasSize.width && velocity > 0 || data.direction === "left" && data.bounds.left <= 0 && velocity < 0) {
    const newVelocity = getValue(data.particle.options.bounce.horizontal);
    data.particle.velocity.x *= -newVelocity;
    bounced = true;
  }
  if (!bounced) {
    return;
  }
  const minPos = data.offset.x + data.size;
  if (data.bounds.right >= data.canvasSize.width && data.direction === "right") {
    data.particle.position.x = data.canvasSize.width - minPos;
  } else if (data.bounds.left <= 0 && data.direction === "left") {
    data.particle.position.x = minPos;
  }
  if (data.outMode === "split") {
    data.particle.destroy();
  }
}
function bounceVertical(data) {
  if (data.outMode !== "bounce" && data.outMode !== "bounce-vertical" && data.outMode !== "bounceVertical" && data.outMode !== "split" || data.direction !== "bottom" && data.direction !== "top") {
    return;
  }
  if (data.bounds.bottom < 0 && data.direction === "top") {
    data.particle.position.y = data.size + data.offset.y;
  } else if (data.bounds.top > data.canvasSize.height && data.direction === "bottom") {
    data.particle.position.y = data.canvasSize.height - data.size - data.offset.y;
  }
  const velocity = data.particle.velocity.y;
  let bounced = false;
  if (data.direction === "bottom" && data.bounds.bottom >= data.canvasSize.height && velocity > 0 || data.direction === "top" && data.bounds.top <= 0 && velocity < 0) {
    const newVelocity = getValue(data.particle.options.bounce.vertical);
    data.particle.velocity.y *= -newVelocity;
    bounced = true;
  }
  if (!bounced) {
    return;
  }
  const minPos = data.offset.y + data.size;
  if (data.bounds.bottom >= data.canvasSize.height && data.direction === "bottom") {
    data.particle.position.y = data.canvasSize.height - minPos;
  } else if (data.bounds.top <= 0 && data.direction === "top") {
    data.particle.position.y = minPos;
  }
  if (data.outMode === "split") {
    data.particle.destroy();
  }
}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/BounceOutMode.js


class BounceOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["bounce", "bounce-vertical", "bounce-horizontal", "bounceVertical", "bounceHorizontal", "split"];
  }
  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    const container = this.container;
    let handled = false;
    for (const [, plugin] of container.plugins) {
      if (plugin.particleBounce !== undefined) {
        handled = plugin.particleBounce(particle, delta, direction);
      }
      if (handled) {
        break;
      }
    }
    if (handled) {
      return;
    }
    const pos = particle.getPosition(),
      offset = particle.offset,
      size = particle.getRadius(),
      bounds = calculateBounds(pos, size),
      canvasSize = container.canvas.size;
    bounceHorizontal({
      particle,
      outMode,
      direction,
      bounds,
      canvasSize,
      offset,
      size
    });
    bounceVertical({
      particle,
      outMode,
      direction,
      bounds,
      canvasSize,
      offset,
      size
    });
  }
}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/DestroyOutMode.js

class DestroyOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["destroy"];
  }
  update(particle, direction, _delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    const container = this.container;
    switch (particle.outType) {
      case "normal":
      case "outside":
        if (isPointInside(particle.position, container.canvas.size, Vector.origin, particle.getRadius(), direction)) {
          return;
        }
        break;
      case "inside":
        {
          const {
            dx,
            dy
          } = getDistances(particle.position, particle.moveCenter);
          const {
            x: vx,
            y: vy
          } = particle.velocity;
          if (vx < 0 && dx > particle.moveCenter.radius || vy < 0 && dy > particle.moveCenter.radius || vx >= 0 && dx < -particle.moveCenter.radius || vy >= 0 && dy < -particle.moveCenter.radius) {
            return;
          }
          break;
        }
    }
    container.particles.remove(particle, undefined, true);
  }
}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/NoneOutMode.js

class NoneOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["none"];
  }
  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    if (particle.options.move.distance.horizontal && (direction === "left" || direction === "right") || particle.options.move.distance.vertical && (direction === "top" || direction === "bottom")) {
      return;
    }
    const gravityOptions = particle.options.move.gravity,
      container = this.container;
    const canvasSize = container.canvas.size;
    const pRadius = particle.getRadius();
    if (!gravityOptions.enable) {
      if (particle.velocity.y > 0 && particle.position.y <= canvasSize.height + pRadius || particle.velocity.y < 0 && particle.position.y >= -pRadius || particle.velocity.x > 0 && particle.position.x <= canvasSize.width + pRadius || particle.velocity.x < 0 && particle.position.x >= -pRadius) {
        return;
      }
      if (!isPointInside(particle.position, container.canvas.size, Vector.origin, pRadius, direction)) {
        container.particles.remove(particle);
      }
    } else {
      const position = particle.position;
      if (!gravityOptions.inverse && position.y > canvasSize.height + pRadius && direction === "bottom" || gravityOptions.inverse && position.y < -pRadius && direction === "top") {
        container.particles.remove(particle);
      }
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/OutOutMode.js

class OutOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["out"];
  }
  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    const container = this.container;
    switch (particle.outType) {
      case "inside":
        {
          const {
            x: vx,
            y: vy
          } = particle.velocity;
          const circVec = Vector.origin;
          circVec.length = particle.moveCenter.radius;
          circVec.angle = particle.velocity.angle + Math.PI;
          circVec.addTo(Vector.create(particle.moveCenter));
          const {
            dx,
            dy
          } = getDistances(particle.position, circVec);
          if (vx <= 0 && dx >= 0 || vy <= 0 && dy >= 0 || vx >= 0 && dx <= 0 || vy >= 0 && dy <= 0) {
            return;
          }
          particle.position.x = Math.floor(randomInRange({
            min: 0,
            max: container.canvas.size.width
          }));
          particle.position.y = Math.floor(randomInRange({
            min: 0,
            max: container.canvas.size.height
          }));
          const {
            dx: newDx,
            dy: newDy
          } = getDistances(particle.position, particle.moveCenter);
          particle.direction = Math.atan2(-newDy, -newDx);
          particle.velocity.angle = particle.direction;
          break;
        }
      default:
        {
          if (isPointInside(particle.position, container.canvas.size, Vector.origin, particle.getRadius(), direction)) {
            return;
          }
          switch (particle.outType) {
            case "outside":
              {
                particle.position.x = Math.floor(randomInRange({
                  min: -particle.moveCenter.radius,
                  max: particle.moveCenter.radius
                })) + particle.moveCenter.x;
                particle.position.y = Math.floor(randomInRange({
                  min: -particle.moveCenter.radius,
                  max: particle.moveCenter.radius
                })) + particle.moveCenter.y;
                const {
                  dx,
                  dy
                } = getDistances(particle.position, particle.moveCenter);
                if (particle.moveCenter.radius) {
                  particle.direction = Math.atan2(dy, dx);
                  particle.velocity.angle = particle.direction;
                }
                break;
              }
            case "normal":
              {
                const wrap = particle.options.move.warp,
                  canvasSize = container.canvas.size,
                  newPos = {
                    bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
                    left: -particle.getRadius() - particle.offset.x,
                    right: canvasSize.width + particle.getRadius() + particle.offset.x,
                    top: -particle.getRadius() - particle.offset.y
                  },
                  sizeValue = particle.getRadius(),
                  nextBounds = calculateBounds(particle.position, sizeValue);
                if (direction === "right" && nextBounds.left > canvasSize.width + particle.offset.x) {
                  particle.position.x = newPos.left;
                  particle.initialPosition.x = particle.position.x;
                  if (!wrap) {
                    particle.position.y = getRandom() * canvasSize.height;
                    particle.initialPosition.y = particle.position.y;
                  }
                } else if (direction === "left" && nextBounds.right < -particle.offset.x) {
                  particle.position.x = newPos.right;
                  particle.initialPosition.x = particle.position.x;
                  if (!wrap) {
                    particle.position.y = getRandom() * canvasSize.height;
                    particle.initialPosition.y = particle.position.y;
                  }
                }
                if (direction === "bottom" && nextBounds.top > canvasSize.height + particle.offset.y) {
                  if (!wrap) {
                    particle.position.x = getRandom() * canvasSize.width;
                    particle.initialPosition.x = particle.position.x;
                  }
                  particle.position.y = newPos.top;
                  particle.initialPosition.y = particle.position.y;
                } else if (direction === "top" && nextBounds.bottom < -particle.offset.y) {
                  if (!wrap) {
                    particle.position.x = getRandom() * canvasSize.width;
                    particle.initialPosition.x = particle.position.x;
                  }
                  particle.position.y = newPos.bottom;
                  particle.initialPosition.y = particle.position.y;
                }
                break;
              }
          }
          break;
        }
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/OutOfCanvasUpdater.js




class OutOfCanvasUpdater {
  constructor(container) {
    this.container = container;
    this._updateOutMode = (particle, delta, outMode, direction) => {
      for (const updater of this.updaters) {
        updater.update(particle, direction, delta, outMode);
      }
    };
    this.updaters = [new BounceOutMode(container), new DestroyOutMode(container), new OutOutMode(container), new NoneOutMode(container)];
  }
  init() {}
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning;
  }
  update(particle, delta) {
    const outModes = particle.options.move.outModes;
    this._updateOutMode(particle, delta, outModes.bottom ?? outModes.default, "bottom");
    this._updateOutMode(particle, delta, outModes.left ?? outModes.default, "left");
    this._updateOutMode(particle, delta, outModes.right ?? outModes.default, "right");
    this._updateOutMode(particle, delta, outModes.top ?? outModes.default, "top");
  }
}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/index.js

async function loadOutModesUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("outModes", container => new OutOfCanvasUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../updaters/size/dist/esm/Utils.js

function Utils_checkDestroy(particle, value, minValue, maxValue) {
  switch (particle.options.size.animation.destroy) {
    case "max":
      if (value >= maxValue) {
        particle.destroy();
      }
      break;
    case "min":
      if (value <= minValue) {
        particle.destroy();
      }
      break;
  }
}
function updateSize(particle, delta) {
  const data = particle.size;
  if (particle.destroyed || !data || !data.enable || (data.maxLoops ?? 0) > 0 && (data.loops ?? 0) > (data.maxLoops ?? 0)) {
    return;
  }
  const sizeVelocity = (data.velocity ?? 0) * delta.factor,
    minValue = data.min,
    maxValue = data.max,
    decay = data.decay ?? 1;
  if (!data.time) {
    data.time = 0;
  }
  if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
    data.time += delta.value;
  }
  if ((data.delayTime ?? 0) > 0 && data.time < (data.delayTime ?? 0)) {
    return;
  }
  switch (data.status) {
    case "increasing":
      if (data.value >= maxValue) {
        data.status = "decreasing";
        if (!data.loops) {
          data.loops = 0;
        }
        data.loops++;
      } else {
        data.value += sizeVelocity;
      }
      break;
    case "decreasing":
      if (data.value <= minValue) {
        data.status = "increasing";
        if (!data.loops) {
          data.loops = 0;
        }
        data.loops++;
      } else {
        data.value -= sizeVelocity;
      }
  }
  if (data.velocity && decay !== 1) {
    data.velocity *= decay;
  }
  Utils_checkDestroy(particle, data.value, minValue, maxValue);
  if (!particle.destroyed) {
    data.value = clamp(data.value, minValue, maxValue);
  }
}
;// CONCATENATED MODULE: ../../updaters/size/dist/esm/SizeUpdater.js


class SizeUpdater {
  init(particle) {
    const container = particle.container,
      sizeOptions = particle.options.size,
      sizeAnimation = sizeOptions.animation;
    if (sizeAnimation.enable) {
      particle.size.velocity = (particle.retina.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / 100 * container.retina.reduceFactor;
      if (!sizeAnimation.sync) {
        particle.size.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning && particle.size.enable && ((particle.size.maxLoops ?? 0) <= 0 || (particle.size.maxLoops ?? 0) > 0 && (particle.size.loops ?? 0) < (particle.size.maxLoops ?? 0));
  }
  reset(particle) {
    particle.size.loops = 0;
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateSize(particle, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/size/dist/esm/index.js

async function loadSizeUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("size", () => new SizeUpdater(), refresh);
}
;// CONCATENATED MODULE: ../basic/dist/esm/index.js






async function loadBasic(engine, refresh = true) {
  await loadBaseMover(engine, false);
  await loadCircleShape(engine, false);
  await loadColorUpdater(engine, false);
  await loadOpacityUpdater(engine, false);
  await loadOutModesUpdater(engine, false);
  await loadSizeUpdater(engine, false);
  await engine.refresh(refresh);
}
;// CONCATENATED MODULE: ../../plugins/easings/quad/dist/esm/index.js

async function loadEasingQuadPlugin() {
  addEasing("ease-in-quad", value => value ** 2);
  addEasing("ease-out-quad", value => 1 - (1 - value) ** 2);
  addEasing("ease-in-out-quad", value => value < 0.5 ? 2 * value ** 2 : 1 - (-2 * value + 2) ** 2 / 2);
}
;// CONCATENATED MODULE: ../../interactions/external/attract/dist/esm/Options/Classes/Attract.js
class Attract {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.easing = "ease-out-quad";
    this.factor = 1;
    this.maxSpeed = 50;
    this.speed = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
    if (data.duration !== undefined) {
      this.duration = data.duration;
    }
    if (data.easing !== undefined) {
      this.easing = data.easing;
    }
    if (data.factor !== undefined) {
      this.factor = data.factor;
    }
    if (data.maxSpeed !== undefined) {
      this.maxSpeed = data.maxSpeed;
    }
    if (data.speed !== undefined) {
      this.speed = data.speed;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/attract/dist/esm/Attractor.js


class Attractor extends ExternalInteractorBase {
  constructor(engine, container) {
    super(container);
    this._clickAttract = () => {
      const container = this.container;
      if (!container.attract) {
        container.attract = {
          particles: []
        };
      }
      const {
        attract
      } = container;
      if (!attract.finish) {
        if (!attract.count) {
          attract.count = 0;
        }
        attract.count++;
        if (attract.count === container.particles.count) {
          attract.finish = true;
        }
      }
      if (attract.clicking) {
        const mousePos = container.interactivity.mouse.clickPosition,
          attractRadius = container.retina.attractModeDistance;
        if (!attractRadius || attractRadius < 0 || !mousePos) {
          return;
        }
        this._processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
      } else if (attract.clicking === false) {
        attract.particles = [];
      }
      return;
    };
    this._hoverAttract = () => {
      const container = this.container,
        mousePos = container.interactivity.mouse.position,
        attractRadius = container.retina.attractModeDistance;
      if (!attractRadius || attractRadius < 0 || !mousePos) {
        return;
      }
      this._processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
    };
    this._processAttract = (position, attractRadius, area) => {
      const container = this.container,
        attractOptions = container.actualOptions.interactivity.modes.attract;
      if (!attractOptions) {
        return;
      }
      const query = container.particles.quadTree.query(area, p => this.isEnabled(p));
      for (const particle of query) {
        const {
          dx,
          dy,
          distance
        } = getDistances(particle.position, position);
        const velocity = attractOptions.speed * attractOptions.factor;
        const attractFactor = clamp(getEasing(attractOptions.easing)(1 - distance / attractRadius) * velocity, 0, attractOptions.maxSpeed);
        const normVec = Vector.create(distance === 0 ? velocity : dx / distance * attractFactor, distance === 0 ? velocity : dy / distance * attractFactor);
        particle.position.subFrom(normVec);
      }
    };
    this._engine = engine;
    if (!container.attract) {
      container.attract = {
        particles: []
      };
    }
    this.handleClickMode = mode => {
      const options = this.container.actualOptions,
        attract = options.interactivity.modes.attract;
      if (!attract || mode !== "attract") {
        return;
      }
      if (!container.attract) {
        container.attract = {
          particles: []
        };
      }
      container.attract.clicking = true;
      container.attract.count = 0;
      for (const particle of container.attract.particles) {
        if (!this.isEnabled(particle)) {
          continue;
        }
        particle.velocity.setTo(particle.initialVelocity);
      }
      container.attract.particles = [];
      container.attract.finish = false;
      setTimeout(() => {
        if (container.destroyed) {
          return;
        }
        if (!container.attract) {
          container.attract = {
            particles: []
          };
        }
        container.attract.clicking = false;
      }, attract.duration * 1000);
    };
  }
  clear() {}
  init() {
    const container = this.container,
      attract = container.actualOptions.interactivity.modes.attract;
    if (!attract) {
      return;
    }
    container.retina.attractModeDistance = attract.distance * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container,
      options = container.actualOptions,
      mouseMoveStatus = container.interactivity.status === mouseMoveEvent,
      events = options.interactivity.events,
      hoverEnabled = events.onHover.enable,
      hoverMode = events.onHover.mode,
      clickEnabled = events.onClick.enable,
      clickMode = events.onClick.mode;
    if (mouseMoveStatus && hoverEnabled && isInArray("attract", hoverMode)) {
      this._hoverAttract();
    } else if (clickEnabled && isInArray("attract", clickMode)) {
      this._clickAttract();
    }
  }
  isEnabled(particle) {
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? options.interactivity).events;
    if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
      return false;
    }
    const hoverMode = events.onHover.mode,
      clickMode = events.onClick.mode;
    return isInArray("attract", hoverMode) || isInArray("attract", clickMode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.attract) {
      options.attract = new Attract();
    }
    for (const source of sources) {
      options.attract.load(source?.attract);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/attract/dist/esm/index.js

async function loadExternalAttractInteraction(engine, refresh = true) {
  await engine.addInteractor("externalAttract", container => new Attractor(engine, container), refresh);
}


;// CONCATENATED MODULE: ../../interactions/external/bounce/dist/esm/Options/Classes/Bounce.js
class Bounce {
  constructor() {
    this.distance = 200;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/bounce/dist/esm/Bouncer.js


class Bouncer extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this._processBounce = (position, radius, area) => {
      const query = this.container.particles.quadTree.query(area, p => this.isEnabled(p));
      for (const particle of query) {
        if (area instanceof Circle) {
          circleBounce(circleBounceDataFromParticle(particle), {
            position,
            radius,
            mass: radius ** 2 * Math.PI / 2,
            velocity: Vector.origin,
            factor: Vector.origin
          });
        } else if (area instanceof Rectangle) {
          rectBounce(particle, calculateBounds(position, radius));
        }
      }
    };
    this._processMouseBounce = () => {
      const container = this.container,
        pxRatio = container.retina.pixelRatio,
        tolerance = 10 * pxRatio,
        mousePos = container.interactivity.mouse.position,
        radius = container.retina.bounceModeDistance;
      if (!radius || radius < 0 || !mousePos) {
        return;
      }
      this._processBounce(mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance));
    };
    this._singleSelectorBounce = (selector, div) => {
      const container = this.container,
        query = document.querySelectorAll(selector);
      if (!query.length) {
        return;
      }
      query.forEach(item => {
        const elem = item,
          pxRatio = container.retina.pixelRatio,
          pos = {
            x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
            y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
          },
          radius = elem.offsetWidth / 2 * pxRatio,
          tolerance = 10 * pxRatio,
          area = div.type === "circle" ? new Circle(pos.x, pos.y, radius + tolerance) : new Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2);
        this._processBounce(pos, radius, area);
      });
    };
  }
  clear() {}
  init() {
    const container = this.container,
      bounce = container.actualOptions.interactivity.modes.bounce;
    if (!bounce) {
      return;
    }
    container.retina.bounceModeDistance = bounce.distance * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container,
      options = container.actualOptions,
      events = options.interactivity.events,
      mouseMoveStatus = container.interactivity.status === mouseMoveEvent,
      hoverEnabled = events.onHover.enable,
      hoverMode = events.onHover.mode,
      divs = events.onDiv;
    if (mouseMoveStatus && hoverEnabled && isInArray("bounce", hoverMode)) {
      this._processMouseBounce();
    } else {
      divModeExecute("bounce", divs, (selector, div) => this._singleSelectorBounce(selector, div));
    }
  }
  isEnabled(particle) {
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? options.interactivity).events,
      divs = events.onDiv;
    return mouse.position && events.onHover.enable && isInArray("bounce", events.onHover.mode) || isDivModeEnabled("bounce", divs);
  }
  loadModeOptions(options, ...sources) {
    if (!options.bounce) {
      options.bounce = new Bounce();
    }
    for (const source of sources) {
      options.bounce.load(source?.bounce);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/bounce/dist/esm/index.js

async function loadExternalBounceInteraction(engine, refresh = true) {
  await engine.addInteractor("externalBounce", container => new Bouncer(container), refresh);
}


;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/esm/Options/Classes/BubbleBase.js

class BubbleBase {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.mix = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
    if (data.duration !== undefined) {
      this.duration = data.duration;
    }
    if (data.mix !== undefined) {
      this.mix = data.mix;
    }
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
    if (data.color !== undefined) {
      const sourceColor = isArray(this.color) ? undefined : this.color;
      this.color = executeOnSingleOrMultiple(data.color, color => {
        return OptionsColor.create(sourceColor, color);
      });
    }
    if (data.size !== undefined) {
      this.size = data.size;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/esm/Options/Classes/BubbleDiv.js


class BubbleDiv extends BubbleBase {
  constructor() {
    super();
    this.selectors = [];
  }
  get ids() {
    return executeOnSingleOrMultiple(this.selectors, t => t.replace("#", ""));
  }
  set ids(value) {
    this.selectors = executeOnSingleOrMultiple(value, t => `#${t}`);
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.ids !== undefined) {
      this.ids = data.ids;
    }
    if (data.selectors !== undefined) {
      this.selectors = data.selectors;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/esm/Options/Classes/Bubble.js



class Bubble extends BubbleBase {
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    this.divs = executeOnSingleOrMultiple(data.divs, div => {
      const tmp = new BubbleDiv();
      tmp.load(div);
      return tmp;
    });
  }
}
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/esm/Utils.js

function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
  if (modeValue >= optionsValue) {
    const value = particleValue + (modeValue - optionsValue) * ratio;
    return clamp(value, particleValue, modeValue);
  } else if (modeValue < optionsValue) {
    const value = particleValue - (optionsValue - modeValue) * ratio;
    return clamp(value, modeValue, particleValue);
  }
}
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/esm/Bubbler.js



class Bubbler extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this._clickBubble = () => {
      const container = this.container,
        options = container.actualOptions,
        mouseClickPos = container.interactivity.mouse.clickPosition,
        bubbleOptions = options.interactivity.modes.bubble;
      if (!bubbleOptions || !mouseClickPos) {
        return;
      }
      if (!container.bubble) {
        container.bubble = {};
      }
      const distance = container.retina.bubbleModeDistance;
      if (!distance || distance < 0) {
        return;
      }
      const query = container.particles.quadTree.queryCircle(mouseClickPos, distance, p => this.isEnabled(p)),
        {
          bubble
        } = container;
      for (const particle of query) {
        if (!bubble.clicking) {
          continue;
        }
        particle.bubble.inRange = !bubble.durationEnd;
        const pos = particle.getPosition(),
          distMouse = getDistance(pos, mouseClickPos),
          timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;
        if (timeSpent > bubbleOptions.duration) {
          bubble.durationEnd = true;
        }
        if (timeSpent > bubbleOptions.duration * 2) {
          bubble.clicking = false;
          bubble.durationEnd = false;
        }
        const sizeData = {
          bubbleObj: {
            optValue: container.retina.bubbleModeSize,
            value: particle.bubble.radius
          },
          particlesObj: {
            optValue: getRangeMax(particle.options.size.value) * container.retina.pixelRatio,
            value: particle.size.value
          },
          type: "size"
        };
        this._process(particle, distMouse, timeSpent, sizeData);
        const opacityData = {
          bubbleObj: {
            optValue: bubbleOptions.opacity,
            value: particle.bubble.opacity
          },
          particlesObj: {
            optValue: getRangeMax(particle.options.opacity.value),
            value: particle.opacity?.value ?? 1
          },
          type: "opacity"
        };
        this._process(particle, distMouse, timeSpent, opacityData);
        if (!bubble.durationEnd && distMouse <= distance) {
          this._hoverBubbleColor(particle, distMouse);
        } else {
          delete particle.bubble.color;
        }
      }
    };
    this._hoverBubble = () => {
      const container = this.container,
        mousePos = container.interactivity.mouse.position,
        distance = container.retina.bubbleModeDistance;
      if (!distance || distance < 0 || mousePos === undefined) {
        return;
      }
      const query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p));
      for (const particle of query) {
        particle.bubble.inRange = true;
        const pos = particle.getPosition(),
          pointDistance = getDistance(pos, mousePos),
          ratio = 1 - pointDistance / distance;
        if (pointDistance <= distance) {
          if (ratio >= 0 && container.interactivity.status === mouseMoveEvent) {
            this._hoverBubbleSize(particle, ratio);
            this._hoverBubbleOpacity(particle, ratio);
            this._hoverBubbleColor(particle, ratio);
          }
        } else {
          this.reset(particle);
        }
        if (container.interactivity.status === mouseLeaveEvent) {
          this.reset(particle);
        }
      }
    };
    this._hoverBubbleColor = (particle, ratio, divBubble) => {
      const options = this.container.actualOptions,
        bubbleOptions = divBubble ?? options.interactivity.modes.bubble;
      if (!bubbleOptions) {
        return;
      }
      if (!particle.bubble.finalColor) {
        const modeColor = bubbleOptions.color;
        if (!modeColor) {
          return;
        }
        const bubbleColor = itemFromSingleOrMultiple(modeColor);
        particle.bubble.finalColor = rangeColorToHsl(bubbleColor);
      }
      if (!particle.bubble.finalColor) {
        return;
      }
      if (bubbleOptions.mix) {
        particle.bubble.color = undefined;
        const pColor = particle.getFillColor();
        particle.bubble.color = pColor ? rgbToHsl(colorMix(pColor, particle.bubble.finalColor, 1 - ratio, ratio)) : particle.bubble.finalColor;
      } else {
        particle.bubble.color = particle.bubble.finalColor;
      }
    };
    this._hoverBubbleOpacity = (particle, ratio, divBubble) => {
      const container = this.container,
        options = container.actualOptions,
        modeOpacity = divBubble?.opacity ?? options.interactivity.modes.bubble?.opacity;
      if (!modeOpacity) {
        return;
      }
      const optOpacity = particle.options.opacity.value,
        pOpacity = particle.opacity?.value ?? 1,
        opacity = calculateBubbleValue(pOpacity, modeOpacity, getRangeMax(optOpacity), ratio);
      if (opacity !== undefined) {
        particle.bubble.opacity = opacity;
      }
    };
    this._hoverBubbleSize = (particle, ratio, divBubble) => {
      const container = this.container,
        modeSize = divBubble?.size ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;
      if (modeSize === undefined) {
        return;
      }
      const optSize = getRangeMax(particle.options.size.value) * container.retina.pixelRatio,
        pSize = particle.size.value,
        size = calculateBubbleValue(pSize, modeSize, optSize, ratio);
      if (size !== undefined) {
        particle.bubble.radius = size;
      }
    };
    this._process = (particle, distMouse, timeSpent, data) => {
      const container = this.container,
        bubbleParam = data.bubbleObj.optValue,
        options = container.actualOptions,
        bubbleOptions = options.interactivity.modes.bubble;
      if (!bubbleOptions || bubbleParam === undefined) {
        return;
      }
      const bubbleDuration = bubbleOptions.duration,
        bubbleDistance = container.retina.bubbleModeDistance,
        particlesParam = data.particlesObj.optValue,
        pObjBubble = data.bubbleObj.value,
        pObj = data.particlesObj.value || 0,
        type = data.type;
      if (!bubbleDistance || bubbleDistance < 0 || bubbleParam === particlesParam) {
        return;
      }
      if (!container.bubble) {
        container.bubble = {};
      }
      if (container.bubble.durationEnd) {
        if (pObjBubble) {
          if (type === "size") {
            delete particle.bubble.radius;
          }
          if (type === "opacity") {
            delete particle.bubble.opacity;
          }
        }
      } else {
        if (distMouse <= bubbleDistance) {
          const obj = pObjBubble ?? pObj;
          if (obj !== bubbleParam) {
            const value = pObj - timeSpent * (pObj - bubbleParam) / bubbleDuration;
            if (type === "size") {
              particle.bubble.radius = value;
            }
            if (type === "opacity") {
              particle.bubble.opacity = value;
            }
          }
        } else {
          if (type === "size") {
            delete particle.bubble.radius;
          }
          if (type === "opacity") {
            delete particle.bubble.opacity;
          }
        }
      }
    };
    this._singleSelectorHover = (delta, selector, div) => {
      const container = this.container,
        selectors = document.querySelectorAll(selector),
        bubble = container.actualOptions.interactivity.modes.bubble;
      if (!bubble || !selectors.length) {
        return;
      }
      selectors.forEach(item => {
        const elem = item,
          pxRatio = container.retina.pixelRatio,
          pos = {
            x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
            y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
          },
          repulseRadius = elem.offsetWidth / 2 * pxRatio,
          area = div.type === "circle" ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio),
          query = container.particles.quadTree.query(area, p => this.isEnabled(p));
        for (const particle of query) {
          if (!area.contains(particle.getPosition())) {
            continue;
          }
          particle.bubble.inRange = true;
          const divs = bubble.divs,
            divBubble = divMode(divs, elem);
          if (!particle.bubble.div || particle.bubble.div !== elem) {
            this.clear(particle, delta, true);
            particle.bubble.div = elem;
          }
          this._hoverBubbleSize(particle, 1, divBubble);
          this._hoverBubbleOpacity(particle, 1, divBubble);
          this._hoverBubbleColor(particle, 1, divBubble);
        }
      });
    };
    if (!container.bubble) {
      container.bubble = {};
    }
    this.handleClickMode = mode => {
      if (mode !== "bubble") {
        return;
      }
      if (!container.bubble) {
        container.bubble = {};
      }
      container.bubble.clicking = true;
    };
  }
  clear(particle, delta, force) {
    if (particle.bubble.inRange && !force) {
      return;
    }
    delete particle.bubble.div;
    delete particle.bubble.opacity;
    delete particle.bubble.radius;
    delete particle.bubble.color;
  }
  init() {
    const container = this.container,
      bubble = container.actualOptions.interactivity.modes.bubble;
    if (!bubble) {
      return;
    }
    container.retina.bubbleModeDistance = bubble.distance * container.retina.pixelRatio;
    if (bubble.size !== undefined) {
      container.retina.bubbleModeSize = bubble.size * container.retina.pixelRatio;
    }
  }
  async interact(delta) {
    const options = this.container.actualOptions,
      events = options.interactivity.events,
      onHover = events.onHover,
      onClick = events.onClick,
      hoverEnabled = onHover.enable,
      hoverMode = onHover.mode,
      clickEnabled = onClick.enable,
      clickMode = onClick.mode,
      divs = events.onDiv;
    if (hoverEnabled && isInArray("bubble", hoverMode)) {
      this._hoverBubble();
    } else if (clickEnabled && isInArray("bubble", clickMode)) {
      this._clickBubble();
    } else {
      divModeExecute("bubble", divs, (selector, div) => this._singleSelectorHover(delta, selector, div));
    }
  }
  isEnabled(particle) {
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? options.interactivity).events,
      {
        onClick,
        onDiv,
        onHover
      } = events,
      divBubble = isDivModeEnabled("bubble", onDiv);
    if (!(divBubble || onHover.enable && mouse.position || onClick.enable && mouse.clickPosition)) {
      return false;
    }
    return isInArray("bubble", onHover.mode) || isInArray("bubble", onClick.mode) || divBubble;
  }
  loadModeOptions(options, ...sources) {
    if (!options.bubble) {
      options.bubble = new Bubble();
    }
    for (const source of sources) {
      options.bubble.load(source?.bubble);
    }
  }
  reset(particle) {
    particle.bubble.inRange = false;
  }
}
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/esm/index.js

async function loadExternalBubbleInteraction(engine, refresh = true) {
  await engine.addInteractor("externalBubble", container => new Bubbler(container), refresh);
}






;// CONCATENATED MODULE: ../../interactions/external/connect/dist/esm/Options/Classes/ConnectLinks.js
class ConnectLinks {
  constructor() {
    this.opacity = 0.5;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/connect/dist/esm/Options/Classes/Connect.js

class Connect {
  constructor() {
    this.distance = 80;
    this.links = new ConnectLinks();
    this.radius = 60;
  }
  get lineLinked() {
    return this.links;
  }
  set lineLinked(value) {
    this.links = value;
  }
  get line_linked() {
    return this.links;
  }
  set line_linked(value) {
    this.links = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
    this.links.load(data.links ?? data.lineLinked ?? data.line_linked);
    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/connect/dist/esm/Utils.js

function gradient(context, p1, p2, opacity) {
  const gradStop = Math.floor(p2.getRadius() / p1.getRadius()),
    color1 = p1.getFillColor(),
    color2 = p2.getFillColor();
  if (!color1 || !color2) {
    return;
  }
  const sourcePos = p1.getPosition(),
    destPos = p2.getPosition(),
    midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius()),
    grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
  grad.addColorStop(0, ColorUtils_getStyleFromHsl(color1, opacity));
  grad.addColorStop(gradStop > 1 ? 1 : gradStop, getStyleFromRgb(midRgb, opacity));
  grad.addColorStop(1, ColorUtils_getStyleFromHsl(color2, opacity));
  return grad;
}
function drawConnectLine(context, width, lineStyle, begin, end) {
  drawLine(context, begin, end);
  context.lineWidth = width;
  context.strokeStyle = lineStyle;
  context.stroke();
}
function lineStyle(container, ctx, p1, p2) {
  const options = container.actualOptions,
    connectOptions = options.interactivity.modes.connect;
  if (!connectOptions) {
    return;
  }
  return gradient(ctx, p1, p2, connectOptions.links.opacity);
}
function drawConnection(container, p1, p2) {
  container.canvas.draw(ctx => {
    const ls = lineStyle(container, ctx, p1, p2);
    if (!ls) {
      return;
    }
    const pos1 = p1.getPosition(),
      pos2 = p2.getPosition();
    drawConnectLine(ctx, p1.retina.linksWidth ?? 0, ls, pos1, pos2);
  });
}
;// CONCATENATED MODULE: ../../interactions/external/connect/dist/esm/Connector.js



class Connector extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {
    const container = this.container,
      connect = container.actualOptions.interactivity.modes.connect;
    if (!connect) {
      return;
    }
    container.retina.connectModeDistance = connect.distance * container.retina.pixelRatio;
    container.retina.connectModeRadius = connect.radius * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container,
      options = container.actualOptions;
    if (options.interactivity.events.onHover.enable && container.interactivity.status === "pointermove") {
      const mousePos = container.interactivity.mouse.position;
      if (!container.retina.connectModeDistance || container.retina.connectModeDistance < 0 || !container.retina.connectModeRadius || container.retina.connectModeRadius < 0 || !mousePos) {
        return;
      }
      const distance = Math.abs(container.retina.connectModeRadius),
        query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p));
      let i = 0;
      for (const p1 of query) {
        const pos1 = p1.getPosition();
        for (const p2 of query.slice(i + 1)) {
          const pos2 = p2.getPosition(),
            distMax = Math.abs(container.retina.connectModeDistance),
            xDiff = Math.abs(pos1.x - pos2.x),
            yDiff = Math.abs(pos1.y - pos2.y);
          if (xDiff < distMax && yDiff < distMax) {
            drawConnection(container, p1, p2);
          }
        }
        ++i;
      }
    }
  }
  isEnabled(particle) {
    const container = this.container,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? container.actualOptions.interactivity).events;
    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }
    return isInArray("connect", events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.connect) {
      options.connect = new Connect();
    }
    for (const source of sources) {
      options.connect.load(source?.connect);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/connect/dist/esm/index.js

async function loadExternalConnectInteraction(engine, refresh = true) {
  await engine.addInteractor("externalConnect", container => new Connector(container), refresh);
}




;// CONCATENATED MODULE: ../../interactions/external/grab/dist/esm/Options/Classes/GrabLinks.js

class GrabLinks {
  constructor() {
    this.blink = false;
    this.consent = false;
    this.opacity = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.blink !== undefined) {
      this.blink = data.blink;
    }
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.consent !== undefined) {
      this.consent = data.consent;
    }
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/grab/dist/esm/Options/Classes/Grab.js

class Grab {
  constructor() {
    this.distance = 100;
    this.links = new GrabLinks();
  }
  get lineLinked() {
    return this.links;
  }
  set lineLinked(value) {
    this.links = value;
  }
  get line_linked() {
    return this.links;
  }
  set line_linked(value) {
    this.links = value;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
    this.links.load(data.links ?? data.lineLinked ?? data.line_linked);
  }
}
;// CONCATENATED MODULE: ../../interactions/external/grab/dist/esm/Utils.js

function drawGrabLine(context, width, begin, end, colorLine, opacity) {
  drawLine(context, begin, end);
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  context.lineWidth = width;
  context.stroke();
}
function drawGrab(container, particle, lineColor, opacity, mousePos) {
  container.canvas.draw(ctx => {
    const beginPos = particle.getPosition();
    drawGrabLine(ctx, particle.retina.linksWidth ?? 0, beginPos, mousePos, lineColor, opacity);
  });
}
;// CONCATENATED MODULE: ../../interactions/external/grab/dist/esm/Grabber.js



class Grabber extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {
    const container = this.container,
      grab = container.actualOptions.interactivity.modes.grab;
    if (!grab) {
      return;
    }
    container.retina.grabModeDistance = grab.distance * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container,
      options = container.actualOptions,
      interactivity = options.interactivity;
    if (!interactivity.modes.grab || !interactivity.events.onHover.enable || container.interactivity.status !== mouseMoveEvent) {
      return;
    }
    const mousePos = container.interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    const distance = container.retina.grabModeDistance;
    if (!distance || distance < 0) {
      return;
    }
    const query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p));
    for (const particle of query) {
      const pos = particle.getPosition(),
        pointDistance = getDistance(pos, mousePos);
      if (pointDistance > distance) {
        continue;
      }
      const grabLineOptions = interactivity.modes.grab.links,
        lineOpacity = grabLineOptions.opacity,
        opacityLine = lineOpacity - pointDistance * lineOpacity / distance;
      if (opacityLine <= 0) {
        continue;
      }
      const optColor = grabLineOptions.color ?? particle.options.links?.color;
      if (!container.particles.grabLineColor && optColor) {
        const linksOptions = interactivity.modes.grab.links;
        container.particles.grabLineColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
      }
      const colorLine = getLinkColor(particle, undefined, container.particles.grabLineColor);
      if (!colorLine) {
        continue;
      }
      drawGrab(container, particle, colorLine, opacityLine, mousePos);
    }
  }
  isEnabled(particle) {
    const container = this.container,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? container.actualOptions.interactivity).events;
    return events.onHover.enable && !!mouse.position && isInArray("grab", events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.grab) {
      options.grab = new Grab();
    }
    for (const source of sources) {
      options.grab.load(source?.grab);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/grab/dist/esm/index.js

async function loadExternalGrabInteraction(engine, refresh = true) {
  await engine.addInteractor("externalGrab", container => new Grabber(container), refresh);
}




;// CONCATENATED MODULE: ../../interactions/external/pause/dist/esm/Pauser.js

class Pauser extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = mode => {
      if (mode !== "pause") {
        return;
      }
      const container = this.container;
      if (container.getAnimationStatus()) {
        container.pause();
      } else {
        container.play();
      }
    };
  }
  clear() {}
  init() {}
  async interact() {}
  isEnabled() {
    return true;
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/pause/dist/esm/index.js

async function loadExternalPauseInteraction(engine, refresh = true) {
  await engine.addInteractor("externalPause", container => new Pauser(container), refresh);
}
;// CONCATENATED MODULE: ../../interactions/external/push/dist/esm/Options/Classes/Push.js

class Push {
  constructor() {
    this.default = true;
    this.groups = [];
    this.quantity = 4;
  }
  get particles_nb() {
    return this.quantity;
  }
  set particles_nb(value) {
    this.quantity = setRangeValue(value);
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.default !== undefined) {
      this.default = data.default;
    }
    if (data.groups !== undefined) {
      this.groups = data.groups.map(t => t);
    }
    if (!this.groups.length) {
      this.default = true;
    }
    const quantity = data.quantity ?? data.particles_nb;
    if (quantity !== undefined) {
      this.quantity = setRangeValue(quantity);
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/push/dist/esm/Pusher.js


class Pusher extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = mode => {
      if (mode !== "push") {
        return;
      }
      const container = this.container,
        options = container.actualOptions,
        pushOptions = options.interactivity.modes.push;
      if (!pushOptions) {
        return;
      }
      const quantity = getRangeValue(pushOptions.quantity);
      if (quantity <= 0) {
        return;
      }
      const group = itemFromArray([undefined, ...pushOptions.groups]),
        groupOptions = group !== undefined ? container.actualOptions.particles.groups[group] : undefined;
      container.particles.push(quantity, container.interactivity.mouse, groupOptions, group);
    };
  }
  clear() {}
  init() {}
  async interact() {}
  isEnabled() {
    return true;
  }
  loadModeOptions(options, ...sources) {
    if (!options.push) {
      options.push = new Push();
    }
    for (const source of sources) {
      options.push.load(source?.push);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/push/dist/esm/index.js

async function loadExternalPushInteraction(engine, refresh = true) {
  await engine.addInteractor("externalPush", container => new Pusher(container), refresh);
}


;// CONCATENATED MODULE: ../../interactions/external/remove/dist/esm/Options/Classes/Remove.js

class Remove {
  constructor() {
    this.quantity = 2;
  }
  get particles_nb() {
    return this.quantity;
  }
  set particles_nb(value) {
    this.quantity = setRangeValue(value);
  }
  load(data) {
    if (!data) {
      return;
    }
    const quantity = data.quantity ?? data.particles_nb;
    if (quantity !== undefined) {
      this.quantity = setRangeValue(quantity);
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/remove/dist/esm/Remover.js


class Remover extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = mode => {
      const container = this.container,
        options = container.actualOptions;
      if (!options.interactivity.modes.remove || mode !== "remove") {
        return;
      }
      const removeNb = getRangeValue(options.interactivity.modes.remove.quantity);
      container.particles.removeQuantity(removeNb);
    };
  }
  clear() {}
  init() {}
  async interact() {}
  isEnabled() {
    return true;
  }
  loadModeOptions(options, ...sources) {
    if (!options.remove) {
      options.remove = new Remove();
    }
    for (const source of sources) {
      options.remove.load(source?.remove);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/remove/dist/esm/index.js

async function loadExternalRemoveInteraction(engine, refresh = true) {
  await engine.addInteractor("externalRemove", container => new Remover(container), refresh);
}


;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/esm/Options/Classes/RepulseBase.js
class RepulseBase {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.factor = 100;
    this.speed = 1;
    this.maxSpeed = 50;
    this.easing = "ease-out-quad";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
    if (data.duration !== undefined) {
      this.duration = data.duration;
    }
    if (data.easing !== undefined) {
      this.easing = data.easing;
    }
    if (data.factor !== undefined) {
      this.factor = data.factor;
    }
    if (data.speed !== undefined) {
      this.speed = data.speed;
    }
    if (data.maxSpeed !== undefined) {
      this.maxSpeed = data.maxSpeed;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/esm/Options/Classes/RepulseDiv.js


class RepulseDiv extends RepulseBase {
  constructor() {
    super();
    this.selectors = [];
  }
  get ids() {
    return executeOnSingleOrMultiple(this.selectors, t => t.replace("#", ""));
  }
  set ids(value) {
    this.selectors = executeOnSingleOrMultiple(value, t => `#${t}`);
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.ids !== undefined) {
      this.ids = data.ids;
    }
    if (data.selectors !== undefined) {
      this.selectors = data.selectors;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/esm/Options/Classes/Repulse.js



class Repulse extends RepulseBase {
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    this.divs = executeOnSingleOrMultiple(data.divs, div => {
      const tmp = new RepulseDiv();
      tmp.load(div);
      return tmp;
    });
  }
}
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/esm/Repulser.js


class Repulser extends ExternalInteractorBase {
  constructor(engine, container) {
    super(container);
    this._clickRepulse = () => {
      const container = this.container,
        repulseOptions = container.actualOptions.interactivity.modes.repulse;
      if (!repulseOptions) {
        return;
      }
      const repulse = container.repulse || {
        particles: []
      };
      if (!repulse.finish) {
        if (!repulse.count) {
          repulse.count = 0;
        }
        repulse.count++;
        if (repulse.count === container.particles.count) {
          repulse.finish = true;
        }
      }
      if (repulse.clicking) {
        const repulseDistance = container.retina.repulseModeDistance;
        if (!repulseDistance || repulseDistance < 0) {
          return;
        }
        const repulseRadius = Math.pow(repulseDistance / 6, 3),
          mouseClickPos = container.interactivity.mouse.clickPosition;
        if (mouseClickPos === undefined) {
          return;
        }
        const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius),
          query = container.particles.quadTree.query(range, p => this.isEnabled(p));
        for (const particle of query) {
          const {
              dx,
              dy,
              distance
            } = getDistances(mouseClickPos, particle.position),
            d = distance ** 2,
            velocity = repulseOptions.speed,
            force = -repulseRadius * velocity / d;
          if (d <= repulseRadius) {
            repulse.particles.push(particle);
            const vect = Vector.create(dx, dy);
            vect.length = force;
            particle.velocity.setTo(vect);
          }
        }
      } else if (repulse.clicking === false) {
        for (const particle of repulse.particles) {
          particle.velocity.setTo(particle.initialVelocity);
        }
        repulse.particles = [];
      }
    };
    this._hoverRepulse = () => {
      const container = this.container,
        mousePos = container.interactivity.mouse.position,
        repulseRadius = container.retina.repulseModeDistance;
      if (!repulseRadius || repulseRadius < 0 || !mousePos) {
        return;
      }
      this._processRepulse(mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
    };
    this._processRepulse = (position, repulseRadius, area, divRepulse) => {
      const container = this.container,
        query = container.particles.quadTree.query(area, p => this.isEnabled(p)),
        repulseOptions = container.actualOptions.interactivity.modes.repulse;
      if (!repulseOptions) {
        return;
      }
      for (const particle of query) {
        const {
            dx,
            dy,
            distance
          } = getDistances(particle.position, position),
          velocity = (divRepulse?.speed ?? repulseOptions.speed) * repulseOptions.factor,
          repulseFactor = clamp(getEasing(repulseOptions.easing)(1 - distance / repulseRadius) * velocity, 0, repulseOptions.maxSpeed),
          normVec = Vector.create(distance === 0 ? velocity : dx / distance * repulseFactor, distance === 0 ? velocity : dy / distance * repulseFactor);
        particle.position.addTo(normVec);
      }
    };
    this._singleSelectorRepulse = (selector, div) => {
      const container = this.container,
        repulse = container.actualOptions.interactivity.modes.repulse;
      if (!repulse) {
        return;
      }
      const query = document.querySelectorAll(selector);
      if (!query.length) {
        return;
      }
      query.forEach(item => {
        const elem = item,
          pxRatio = container.retina.pixelRatio,
          pos = {
            x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
            y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
          },
          repulseRadius = elem.offsetWidth / 2 * pxRatio,
          area = div.type === "circle" ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio),
          divs = repulse.divs,
          divRepulse = divMode(divs, elem);
        this._processRepulse(pos, repulseRadius, area, divRepulse);
      });
    };
    this._engine = engine;
    if (!container.repulse) {
      container.repulse = {
        particles: []
      };
    }
    this.handleClickMode = mode => {
      const options = this.container.actualOptions,
        repulseOpts = options.interactivity.modes.repulse;
      if (!repulseOpts || mode !== "repulse") {
        return;
      }
      if (!container.repulse) {
        container.repulse = {
          particles: []
        };
      }
      const repulse = container.repulse;
      repulse.clicking = true;
      repulse.count = 0;
      for (const particle of container.repulse.particles) {
        if (!this.isEnabled(particle)) {
          continue;
        }
        particle.velocity.setTo(particle.initialVelocity);
      }
      repulse.particles = [];
      repulse.finish = false;
      setTimeout(() => {
        if (container.destroyed) {
          return;
        }
        repulse.clicking = false;
      }, repulseOpts.duration * 1000);
    };
  }
  clear() {}
  init() {
    const container = this.container,
      repulse = container.actualOptions.interactivity.modes.repulse;
    if (!repulse) {
      return;
    }
    container.retina.repulseModeDistance = repulse.distance * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container,
      options = container.actualOptions,
      mouseMoveStatus = container.interactivity.status === mouseMoveEvent,
      events = options.interactivity.events,
      hover = events.onHover,
      hoverEnabled = hover.enable,
      hoverMode = hover.mode,
      click = events.onClick,
      clickEnabled = click.enable,
      clickMode = click.mode,
      divs = events.onDiv;
    if (mouseMoveStatus && hoverEnabled && isInArray("repulse", hoverMode)) {
      this._hoverRepulse();
    } else if (clickEnabled && isInArray("repulse", clickMode)) {
      this._clickRepulse();
    } else {
      divModeExecute("repulse", divs, (selector, div) => this._singleSelectorRepulse(selector, div));
    }
  }
  isEnabled(particle) {
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? options.interactivity).events,
      divs = events.onDiv,
      hover = events.onHover,
      click = events.onClick,
      divRepulse = isDivModeEnabled("repulse", divs);
    if (!(divRepulse || hover.enable && mouse.position || click.enable && mouse.clickPosition)) {
      return false;
    }
    const hoverMode = hover.mode,
      clickMode = click.mode;
    return isInArray("repulse", hoverMode) || isInArray("repulse", clickMode) || divRepulse;
  }
  loadModeOptions(options, ...sources) {
    if (!options.repulse) {
      options.repulse = new Repulse();
    }
    for (const source of sources) {
      options.repulse.load(source?.repulse);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/esm/index.js

async function loadExternalRepulseInteraction(engine, refresh = true) {
  await engine.addInteractor("externalRepulse", container => new Repulser(engine, container), refresh);
}






;// CONCATENATED MODULE: ../../interactions/external/slow/dist/esm/Options/Classes/Slow.js
class Slow {
  constructor() {
    this.factor = 3;
    this.radius = 200;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.factor !== undefined) {
      this.factor = data.factor;
    }
    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/slow/dist/esm/Slower.js


class Slower extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear(particle, delta, force) {
    if (particle.slow.inRange && !force) {
      return;
    }
    particle.slow.factor = 1;
  }
  init() {
    const container = this.container,
      slow = container.actualOptions.interactivity.modes.slow;
    if (!slow) {
      return;
    }
    container.retina.slowModeRadius = slow.radius * container.retina.pixelRatio;
  }
  async interact() {}
  isEnabled(particle) {
    const container = this.container,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? container.actualOptions.interactivity).events;
    return events.onHover.enable && !!mouse.position && isInArray("slow", events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.slow) {
      options.slow = new Slow();
    }
    for (const source of sources) {
      options.slow.load(source?.slow);
    }
  }
  reset(particle) {
    particle.slow.inRange = false;
    const container = this.container,
      options = container.actualOptions,
      mousePos = container.interactivity.mouse.position,
      radius = container.retina.slowModeRadius,
      slowOptions = options.interactivity.modes.slow;
    if (!slowOptions || !radius || radius < 0 || !mousePos) {
      return;
    }
    const particlePos = particle.getPosition(),
      dist = getDistance(mousePos, particlePos),
      proximityFactor = dist / radius,
      slowFactor = slowOptions.factor,
      {
        slow
      } = particle;
    if (dist > radius) {
      return;
    }
    slow.inRange = true;
    slow.factor = proximityFactor / slowFactor;
  }
}
;// CONCATENATED MODULE: ../../interactions/external/slow/dist/esm/index.js

async function loadExternalSlowInteraction(engine, refresh = true) {
  await engine.addInteractor("externalSlow", container => new Slower(container), refresh);
}


;// CONCATENATED MODULE: ../../shapes/image/dist/esm/GifUtils/Constants.js
const InterlaceOffsets = [0, 4, 2, 1];
const InterlaceSteps = [8, 8, 4, 2];
;// CONCATENATED MODULE: ../../shapes/image/dist/esm/GifUtils/ByteStream.js
class ByteStream {
  constructor(bytes) {
    this.pos = 0;
    this.data = new Uint8ClampedArray(bytes);
  }
  getString(count) {
    const slice = this.data.slice(this.pos, this.pos + count);
    this.pos += slice.length;
    return slice.reduce((acc, curr) => acc + String.fromCharCode(curr), "");
  }
  nextByte() {
    return this.data[this.pos++];
  }
  nextTwoBytes() {
    this.pos += 2;
    return this.data[this.pos - 2] + (this.data[this.pos - 1] << 8);
  }
  readSubBlocks() {
    let blockString = "",
      size = 0;
    do {
      size = this.data[this.pos++];
      for (let count = size; --count >= 0; blockString += String.fromCharCode(this.data[this.pos++])) {}
    } while (size !== 0);
    return blockString;
  }
  readSubBlocksBin() {
    let size = 0,
      len = 0;
    for (let offset = 0; (size = this.data[this.pos + offset]) !== 0; offset += size + 1) {
      len += size;
    }
    const blockData = new Uint8Array(len);
    for (let i = 0; (size = this.data[this.pos++]) !== 0;) {
      for (let count = size; --count >= 0; blockData[i++] = this.data[this.pos++]) {}
    }
    return blockData;
  }
  skipSubBlocks() {
    for (; this.data[this.pos] !== 0; this.pos += this.data[this.pos] + 1) {}
    this.pos++;
  }
}
;// CONCATENATED MODULE: ../../shapes/image/dist/esm/GifUtils/Utils.js


function parseColorTable(byteStream, count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push({
      r: byteStream.data[byteStream.pos],
      g: byteStream.data[byteStream.pos + 1],
      b: byteStream.data[byteStream.pos + 2]
    });
    byteStream.pos += 3;
  }
  return colors;
}
async function parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex) {
  switch (byteStream.nextByte()) {
    case 249:
      {
        const frame = gif.frames[getFrameIndex(false)];
        byteStream.pos++;
        const packedByte = byteStream.nextByte();
        frame.GCreserved = (packedByte & 0xe0) >>> 5;
        frame.disposalMethod = (packedByte & 0x1c) >>> 2;
        frame.userInputDelayFlag = (packedByte & 2) === 2;
        const transparencyFlag = (packedByte & 1) === 1;
        frame.delayTime = byteStream.nextTwoBytes() * 0xa;
        const transparencyIndex = byteStream.nextByte();
        if (transparencyFlag) {
          getTransparencyIndex(transparencyIndex);
        }
        byteStream.pos++;
        break;
      }
    case 255:
      {
        byteStream.pos++;
        const applicationExtension = {
          identifier: byteStream.getString(8),
          authenticationCode: byteStream.getString(3),
          data: byteStream.readSubBlocksBin()
        };
        gif.applicationExtensions.push(applicationExtension);
        break;
      }
    case 254:
      {
        gif.comments.push([getFrameIndex(false), byteStream.readSubBlocks()]);
        break;
      }
    case 1:
      {
        if (gif.globalColorTable.length === 0) {
          throw new EvalError("plain text extension without global color table");
        }
        byteStream.pos++;
        gif.frames[getFrameIndex(false)].plainTextData = {
          left: byteStream.nextTwoBytes(),
          top: byteStream.nextTwoBytes(),
          width: byteStream.nextTwoBytes(),
          height: byteStream.nextTwoBytes(),
          charSize: {
            width: byteStream.nextTwoBytes(),
            height: byteStream.nextTwoBytes()
          },
          foregroundColor: byteStream.nextByte(),
          backgroundColor: byteStream.nextByte(),
          text: byteStream.readSubBlocks()
        };
        break;
      }
    default:
      byteStream.skipSubBlocks();
      break;
  }
}
async function parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback) {
  const frame = gif.frames[getFrameIndex(true)];
  frame.left = byteStream.nextTwoBytes();
  frame.top = byteStream.nextTwoBytes();
  frame.width = byteStream.nextTwoBytes();
  frame.height = byteStream.nextTwoBytes();
  const packedByte = byteStream.nextByte(),
    localColorTableFlag = (packedByte & 0x80) === 0x80,
    interlacedFlag = (packedByte & 0x40) === 0x40;
  frame.sortFlag = (packedByte & 0x20) === 0x20;
  frame.reserved = (packedByte & 0x18) >>> 3;
  const localColorCount = 1 << (packedByte & 7) + 1;
  if (localColorTableFlag) {
    frame.localColorTable = parseColorTable(byteStream, localColorCount);
  }
  const getColor = index => {
    const {
      r,
      g,
      b
    } = (localColorTableFlag ? frame.localColorTable : gif.globalColorTable)[index];
    return {
      r,
      g,
      b,
      a: index === getTransparencyIndex(null) ? avgAlpha ? ~~((r + g + b) / 3) : 0 : 255
    };
  };
  const image = (() => {
    try {
      return new ImageData(frame.width, frame.height, {
        colorSpace: "srgb"
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "IndexSizeError") {
        return null;
      }
      throw error;
    }
  })();
  if (image == null) {
    throw new EvalError("GIF frame size is to large");
  }
  const minCodeSize = byteStream.nextByte(),
    imageData = byteStream.readSubBlocksBin(),
    clearCode = 1 << minCodeSize;
  const readBits = (pos, len) => {
    const bytePos = pos >>> 3,
      bitPos = pos & 7;
    return (imageData[bytePos] + (imageData[bytePos + 1] << 8) + (imageData[bytePos + 2] << 16) & (1 << len) - 1 << bitPos) >>> bitPos;
  };
  if (interlacedFlag) {
    for (let code = 0, size = minCodeSize + 1, pos = 0, dic = [[0]], pass = 0; pass < 4; pass++) {
      if (InterlaceOffsets[pass] < frame.height) {
        for (let pixelPos = 0, lineIndex = 0;;) {
          const last = code;
          code = readBits(pos, size);
          pos += size + 1;
          if (code === clearCode) {
            size = minCodeSize + 1;
            dic.length = clearCode + 2;
            for (let i = 0; i < dic.length; i++) {
              dic[i] = i < clearCode ? [i] : [];
            }
          } else {
            if (code >= dic.length) {
              dic.push(dic[last].concat(dic[last][0]));
            } else if (last !== clearCode) {
              dic.push(dic[last].concat(dic[code][0]));
            }
            for (let i = 0; i < dic[code].length; i++) {
              const {
                r,
                g,
                b,
                a
              } = getColor(dic[code][i]);
              image.data.set([r, g, b, a], InterlaceOffsets[pass] * frame.width + InterlaceSteps[pass] * lineIndex + pixelPos % (frame.width * 4));
              pixelPos += 4;
            }
            if (dic.length === 1 << size && size < 0xc) {
              size++;
            }
          }
          if (pixelPos === frame.width * 4 * (lineIndex + 1)) {
            lineIndex++;
            if (InterlaceOffsets[pass] + InterlaceSteps[pass] * lineIndex >= frame.height) {
              break;
            }
          }
        }
      }
      progressCallback?.(byteStream.pos / (byteStream.data.length - 1), getFrameIndex(false) + 1, image, {
        x: frame.left,
        y: frame.top
      }, {
        width: gif.width,
        height: gif.height
      });
    }
    frame.image = image;
    frame.bitmap = await createImageBitmap(image);
  } else {
    for (let code = 0, size = minCodeSize + 1, pos = 0, dic = [[0]], pixelPos = -4;;) {
      const last = code;
      code = readBits(pos, size);
      pos += size;
      if (code === clearCode) {
        size = minCodeSize + 1;
        dic.length = clearCode + 2;
        for (let i = 0; i < dic.length; i++) {
          dic[i] = i < clearCode ? [i] : [];
        }
      } else {
        if (code === clearCode + 1) {
          break;
        }
        if (code >= dic.length) {
          dic.push(dic[last].concat(dic[last][0]));
        } else if (last !== clearCode) {
          dic.push(dic[last].concat(dic[code][0]));
        }
        for (let i = 0; i < dic[code].length; i++) {
          const {
            r,
            g,
            b,
            a
          } = getColor(dic[code][i]);
          image.data.set([r, g, b, a], pixelPos += 4);
        }
        if (dic.length >= 1 << size && size < 0xc) {
          size++;
        }
      }
    }
    frame.image = image;
    frame.bitmap = await createImageBitmap(image);
    progressCallback?.((byteStream.pos + 1) / byteStream.data.length, getFrameIndex(false) + 1, frame.image, {
      x: frame.left,
      y: frame.top
    }, {
      width: gif.width,
      height: gif.height
    });
  }
}
async function parseBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback) {
  switch (byteStream.nextByte()) {
    case 59:
      return true;
    case 44:
      await parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback);
      break;
    case 33:
      await parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex);
      break;
    default:
      throw new EvalError("undefined block found");
  }
  return false;
}
function getGIFLoopAmount(gif) {
  for (const extension of gif.applicationExtensions) {
    if (extension.identifier + extension.authenticationCode !== "NETSCAPE2.0") {
      continue;
    }
    return extension.data[1] + (extension.data[2] << 8);
  }
  return NaN;
}
async function decodeGIF(gifURL, progressCallback, avgAlpha) {
  if (!avgAlpha) avgAlpha = false;
  const res = await fetch(gifURL);
  if (!res.ok && res.status === 404) {
    throw new EvalError("file not found");
  }
  const buffer = await res.arrayBuffer();
  const gif = {
      width: 0,
      height: 0,
      totalTime: 0,
      colorRes: 0,
      pixelAspectRatio: 0,
      frames: [],
      sortFlag: false,
      globalColorTable: [],
      backgroundImage: new ImageData(1, 1, {
        colorSpace: "srgb"
      }),
      comments: [],
      applicationExtensions: []
    },
    byteStream = new ByteStream(new Uint8ClampedArray(buffer));
  if (byteStream.getString(6) !== "GIF89a") {
    throw new Error("not a supported GIF file");
  }
  gif.width = byteStream.nextTwoBytes();
  gif.height = byteStream.nextTwoBytes();
  const packedByte = byteStream.nextByte(),
    globalColorTableFlag = (packedByte & 0x80) === 0x80;
  gif.colorRes = (packedByte & 0x70) >>> 4;
  gif.sortFlag = (packedByte & 8) === 8;
  const globalColorCount = 1 << (packedByte & 7) + 1,
    backgroundColorIndex = byteStream.nextByte();
  gif.pixelAspectRatio = byteStream.nextByte();
  if (gif.pixelAspectRatio !== 0) {
    gif.pixelAspectRatio = (gif.pixelAspectRatio + 0xf) / 0x40;
  }
  if (globalColorTableFlag) {
    gif.globalColorTable = parseColorTable(byteStream, globalColorCount);
  }
  const backgroundImage = (() => {
    try {
      return new ImageData(gif.width, gif.height, {
        colorSpace: "srgb"
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "IndexSizeError") {
        return null;
      }
      throw error;
    }
  })();
  if (backgroundImage == null) {
    throw new Error("GIF frame size is to large");
  }
  const {
    r,
    g,
    b
  } = gif.globalColorTable[backgroundColorIndex];
  backgroundImage.data.set(globalColorTableFlag ? [r, g, b, 255] : [0, 0, 0, 0]);
  for (let i = 4; i < backgroundImage.data.length; i *= 2) {
    backgroundImage.data.copyWithin(i, 0, i);
  }
  gif.backgroundImage = backgroundImage;
  let frameIndex = -1,
    incrementFrameIndex = true,
    transparencyIndex = -1;
  const getframeIndex = increment => {
    if (increment) {
      incrementFrameIndex = true;
    }
    return frameIndex;
  };
  const getTransparencyIndex = newValue => {
    if (newValue != null) {
      transparencyIndex = newValue;
    }
    return transparencyIndex;
  };
  try {
    do {
      if (incrementFrameIndex) {
        gif.frames.push({
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          disposalMethod: 0,
          image: new ImageData(1, 1, {
            colorSpace: "srgb"
          }),
          plainTextData: null,
          userInputDelayFlag: false,
          delayTime: 0,
          sortFlag: false,
          localColorTable: [],
          reserved: 0,
          GCreserved: 0
        });
        frameIndex++;
        transparencyIndex = -1;
        incrementFrameIndex = false;
      }
    } while (!(await parseBlock(byteStream, gif, avgAlpha, getframeIndex, getTransparencyIndex, progressCallback)));
    gif.frames.length--;
    for (const frame of gif.frames) {
      if (frame.userInputDelayFlag && frame.delayTime === 0) {
        gif.totalTime = Infinity;
        break;
      }
      gif.totalTime += frame.delayTime;
    }
    return gif;
  } catch (error) {
    if (error instanceof EvalError) {
      throw new Error(`error while parsing frame ${frameIndex} "${error.message}"`);
    }
    throw error;
  }
}
;// CONCATENATED MODULE: ../../shapes/image/dist/esm/Utils.js


const currentColorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
function replaceColorSvg(imageShape, color, opacity) {
  const {
    svgData
  } = imageShape;
  if (!svgData) {
    return "";
  }
  const colorStyle = ColorUtils_getStyleFromHsl(color, opacity);
  if (svgData.includes("fill")) {
    return svgData.replace(currentColorRegex, () => colorStyle);
  }
  const preFillIndex = svgData.indexOf(">");
  return `${svgData.substring(0, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
}
async function loadImage(image) {
  return new Promise(resolve => {
    image.loading = true;
    const img = new Image();
    image.element = img;
    img.addEventListener("load", () => {
      image.loading = false;
      resolve();
    });
    img.addEventListener("error", () => {
      image.element = undefined;
      image.error = true;
      image.loading = false;
      getLogger().error(`${errorPrefix} loading image: ${image.source}`);
      resolve();
    });
    img.src = image.source;
  });
}
async function loadGifImage(image) {
  if (image.type !== "gif") {
    await loadImage(image);
    return;
  }
  image.loading = true;
  try {
    image.gifData = await decodeGIF(image.source);
    image.gifLoopCount = getGIFLoopAmount(image.gifData) ?? 0;
    if (image.gifLoopCount === 0) {
      image.gifLoopCount = Infinity;
    }
  } catch {
    image.error = true;
  }
  image.loading = false;
}
async function downloadSvgImage(image) {
  if (image.type !== "svg") {
    await loadImage(image);
    return;
  }
  image.loading = true;
  const response = await fetch(image.source);
  if (!response.ok) {
    getLogger().error(`${errorPrefix} Image not found`);
    image.error = true;
  } else {
    image.svgData = await response.text();
  }
  image.loading = false;
}
function replaceImageColor(image, imageData, color, particle) {
  const svgColoredData = replaceColorSvg(image, color, particle.opacity?.value ?? 1),
    imageRes = {
      color,
      gif: imageData.gif,
      data: {
        ...image,
        svgData: svgColoredData
      },
      loaded: false,
      ratio: imageData.width / imageData.height,
      replaceColor: imageData.replaceColor ?? imageData.replace_color,
      source: imageData.src
    };
  return new Promise(resolve => {
    const svg = new Blob([svgColoredData], {
        type: "image/svg+xml"
      }),
      domUrl = URL || window.URL || window.webkitURL || window,
      url = domUrl.createObjectURL(svg),
      img = new Image();
    img.addEventListener("load", () => {
      imageRes.loaded = true;
      imageRes.element = img;
      resolve(imageRes);
      domUrl.revokeObjectURL(url);
    });
    img.addEventListener("error", async () => {
      domUrl.revokeObjectURL(url);
      const img2 = {
        ...image,
        error: false,
        loading: true
      };
      await loadImage(img2);
      imageRes.loaded = true;
      imageRes.element = img2.element;
      resolve(imageRes);
    });
    img.src = url;
  });
}
;// CONCATENATED MODULE: ../../shapes/image/dist/esm/ImageDrawer.js


class ImageDrawer {
  constructor(engine) {
    this.loadImageShape = async imageShape => {
      if (!this._engine.loadImage) {
        throw new Error(`${errorPrefix} image shape not initialized`);
      }
      await this._engine.loadImage({
        gif: imageShape.gif,
        name: imageShape.name,
        replaceColor: imageShape.replaceColor ?? imageShape.replace_color ?? false,
        src: imageShape.src
      });
    };
    this._engine = engine;
  }
  addImage(image) {
    if (!this._engine.images) {
      this._engine.images = [];
    }
    this._engine.images.push(image);
  }
  draw(context, particle, radius, opacity, delta) {
    const image = particle.image,
      element = image?.element;
    if (!image) {
      return;
    }
    context.globalAlpha = opacity;
    if (image.gif && image.gifData) {
      const offscreenCanvas = new OffscreenCanvas(image.gifData.width, image.gifData.height),
        offscreenContext = offscreenCanvas.getContext("2d");
      if (!offscreenContext) {
        throw new Error("could not create offscreen canvas context");
      }
      offscreenContext.imageSmoothingQuality = "low";
      offscreenContext.imageSmoothingEnabled = false;
      offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      if (particle.gifLoopCount === undefined) {
        particle.gifLoopCount = image.gifLoopCount ?? 0;
      }
      let frameIndex = particle.gifFrame ?? 0;
      const pos = {
          x: -image.gifData.width * 0.5,
          y: -image.gifData.height * 0.5
        },
        frame = image.gifData.frames[frameIndex];
      if (particle.gifTime === undefined) {
        particle.gifTime = 0;
      }
      if (!frame.bitmap) {
        return;
      }
      context.scale(radius / image.gifData.width, radius / image.gifData.height);
      switch (frame.disposalMethod) {
        case 4:
        case 5:
        case 6:
        case 7:
        case 0:
          offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
          context.drawImage(offscreenCanvas, pos.x, pos.y);
          offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
          break;
        case 1:
          offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
          context.drawImage(offscreenCanvas, pos.x, pos.y);
          break;
        case 2:
          offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
          context.drawImage(offscreenCanvas, pos.x, pos.y);
          offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
          if (image.gifData.globalColorTable.length === 0) {
            offscreenContext.putImageData(image.gifData.frames[0].image, pos.x + frame.left, pos.y + frame.top);
          } else {
            offscreenContext.putImageData(image.gifData.backgroundImage, pos.x, pos.y);
          }
          break;
        case 3:
          {
            const previousImageData = offscreenContext.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
            offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
            context.drawImage(offscreenCanvas, pos.x, pos.y);
            offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
            offscreenContext.putImageData(previousImageData, 0, 0);
          }
          break;
      }
      particle.gifTime += delta.value;
      if (particle.gifTime > frame.delayTime) {
        particle.gifTime -= frame.delayTime;
        if (++frameIndex >= image.gifData.frames.length) {
          if (--particle.gifLoopCount <= 0) {
            return;
          }
          frameIndex = 0;
          offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        }
        particle.gifFrame = frameIndex;
      }
      context.scale(image.gifData.width / radius, image.gifData.height / radius);
    } else if (element) {
      const ratio = image.ratio,
        pos = {
          x: -radius,
          y: -radius
        };
      context.drawImage(element, pos.x, pos.y, radius * 2, radius * 2 / ratio);
    }
    context.globalAlpha = 1;
  }
  getSidesCount() {
    return 12;
  }
  async init(container) {
    const options = container.actualOptions;
    if (!options.preload || !this._engine.loadImage) {
      return;
    }
    for (const imageData of options.preload) {
      await this._engine.loadImage(imageData);
    }
  }
  loadShape(particle) {
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }
    if (!this._engine.images) {
      this._engine.images = [];
    }
    const imageData = particle.shapeData,
      image = this._engine.images.find(t => t.name === imageData.name || t.source === imageData.src);
    if (!image) {
      this.loadImageShape(imageData).then(() => {
        this.loadShape(particle);
      });
    }
  }
  particleInit(container, particle) {
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }
    if (!this._engine.images) {
      this._engine.images = [];
    }
    const images = this._engine.images,
      imageData = particle.shapeData,
      color = particle.getFillColor(),
      image = images.find(t => t.name === imageData.name || t.source === imageData.src);
    if (!image) {
      return;
    }
    const replaceColor = imageData.replaceColor ?? imageData.replace_color ?? image.replaceColor;
    if (image.loading) {
      setTimeout(() => {
        this.particleInit(container, particle);
      });
      return;
    }
    (async () => {
      let imageRes;
      if (image.svgData && color) {
        imageRes = await replaceImageColor(image, imageData, color, particle);
      } else {
        imageRes = {
          color,
          data: image,
          element: image.element,
          gif: image.gif,
          gifData: image.gifData,
          gifLoopCount: image.gifLoopCount,
          loaded: true,
          ratio: imageData.width && imageData.height ? imageData.width / imageData.height : image.ratio ?? 1,
          replaceColor: replaceColor,
          source: imageData.src
        };
      }
      if (!imageRes.ratio) {
        imageRes.ratio = 1;
      }
      const fill = imageData.fill ?? particle.fill,
        close = imageData.close ?? particle.close,
        imageShape = {
          image: imageRes,
          fill,
          close
        };
      particle.image = imageShape.image;
      particle.fill = imageShape.fill;
      particle.close = imageShape.close;
    })();
  }
}
;// CONCATENATED MODULE: ../../shapes/image/dist/esm/Options/Classes/Preload.js
class Preload {
  constructor() {
    this.src = "";
    this.gif = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.gif !== undefined) {
      this.gif = data.gif;
    }
    if (data.height !== undefined) {
      this.height = data.height;
    }
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.replaceColor !== undefined) {
      this.replaceColor = data.replaceColor;
    }
    if (data.src !== undefined) {
      this.src = data.src;
    }
    if (data.width !== undefined) {
      this.width = data.width;
    }
  }
}
;// CONCATENATED MODULE: ../../shapes/image/dist/esm/ImagePreloader.js

class ImagePreloaderPlugin {
  constructor(engine) {
    this.id = "imagePreloader";
    this._engine = engine;
  }
  getPlugin() {
    return {};
  }
  loadOptions(options, source) {
    if (!source || !source.preload) {
      return;
    }
    if (!options.preload) {
      options.preload = [];
    }
    const preloadOptions = options.preload;
    for (const item of source.preload) {
      const existing = preloadOptions.find(t => t.name === item.name || t.src === item.src);
      if (existing) {
        existing.load(item);
      } else {
        const preload = new Preload();
        preload.load(item);
        preloadOptions.push(preload);
      }
    }
  }
  needsPlugin() {
    return true;
  }
}
;// CONCATENATED MODULE: ../../shapes/image/dist/esm/index.js




function addLoadImageToEngine(engine) {
  if (engine.loadImage) {
    return;
  }
  engine.loadImage = async data => {
    if (!data.name && !data.src) {
      throw new Error(`${errorPrefix} no image source provided`);
    }
    if (!engine.images) {
      engine.images = [];
    }
    if (engine.images.find(t => t.name === data.name || t.source === data.src)) {
      return;
    }
    try {
      const image = {
        gif: data.gif ?? false,
        name: data.name ?? data.src,
        source: data.src,
        type: data.src.substring(data.src.length - 3),
        error: false,
        loading: true,
        replaceColor: data.replaceColor,
        ratio: data.width && data.height ? data.width / data.height : undefined
      };
      engine.images.push(image);
      const imageFunc = data.gif ? loadGifImage : data.replaceColor ? downloadSvgImage : loadImage;
      await imageFunc(image);
    } catch {
      throw new Error(`${errorPrefix} ${data.name ?? data.src} not found`);
    }
  };
}
async function loadImageShape(engine, refresh = true) {
  addLoadImageToEngine(engine);
  const preloader = new ImagePreloaderPlugin(engine);
  await engine.addPlugin(preloader, refresh);
  await engine.addShape(["image", "images"], new ImageDrawer(engine), refresh);
}
;// CONCATENATED MODULE: ../../updaters/life/dist/esm/Options/Classes/LifeDelay.js

class LifeDelay extends ValueWithRandom {
  constructor() {
    super();
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/life/dist/esm/Options/Classes/LifeDuration.js

class LifeDuration extends ValueWithRandom {
  constructor() {
    super();
    this.random.minimumValue = 0.0001;
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/life/dist/esm/Options/Classes/Life.js


class Life {
  constructor() {
    this.count = 0;
    this.delay = new LifeDelay();
    this.duration = new LifeDuration();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== undefined) {
      this.count = data.count;
    }
    this.delay.load(data.delay);
    this.duration.load(data.duration);
  }
}
;// CONCATENATED MODULE: ../../updaters/life/dist/esm/LifeUpdater.js


class LifeUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const container = this.container,
      particlesOptions = particle.options,
      lifeOptions = particlesOptions.life;
    if (!lifeOptions) {
      return;
    }
    particle.life = {
      delay: container.retina.reduceFactor ? getRangeValue(lifeOptions.delay.value) * (lifeOptions.delay.sync ? 1 : getRandom()) / container.retina.reduceFactor * 1000 : 0,
      delayTime: 0,
      duration: container.retina.reduceFactor ? getRangeValue(lifeOptions.duration.value) * (lifeOptions.duration.sync ? 1 : getRandom()) / container.retina.reduceFactor * 1000 : 0,
      time: 0,
      count: lifeOptions.count
    };
    if (particle.life.duration <= 0) {
      particle.life.duration = -1;
    }
    if (particle.life.count <= 0) {
      particle.life.count = -1;
    }
    if (particle.life) {
      particle.spawning = particle.life.delay > 0;
    }
  }
  isEnabled(particle) {
    return !particle.destroyed;
  }
  loadOptions(options, ...sources) {
    if (!options.life) {
      options.life = new Life();
    }
    for (const source of sources) {
      options.life.load(source?.life);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle) || !particle.life) {
      return;
    }
    const life = particle.life;
    let justSpawned = false;
    if (particle.spawning) {
      life.delayTime += delta.value;
      if (life.delayTime >= particle.life.delay) {
        justSpawned = true;
        particle.spawning = false;
        life.delayTime = 0;
        life.time = 0;
      } else {
        return;
      }
    }
    if (life.duration === -1) {
      return;
    }
    if (particle.spawning) {
      return;
    }
    if (justSpawned) {
      life.time = 0;
    } else {
      life.time += delta.value;
    }
    if (life.time < life.duration) {
      return;
    }
    life.time = 0;
    if (particle.life.count > 0) {
      particle.life.count--;
    }
    if (particle.life.count === 0) {
      particle.destroy();
      return;
    }
    const canvasSize = this.container.canvas.size,
      widthRange = setRangeValue(0, canvasSize.width),
      heightRange = setRangeValue(0, canvasSize.width);
    particle.position.x = randomInRange(widthRange);
    particle.position.y = randomInRange(heightRange);
    particle.spawning = true;
    life.delayTime = 0;
    life.time = 0;
    particle.reset();
    const lifeOptions = particle.options.life;
    if (lifeOptions) {
      life.delay = getRangeValue(lifeOptions.delay.value) * 1000;
      life.duration = getRangeValue(lifeOptions.duration.value) * 1000;
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/life/dist/esm/index.js

async function loadLifeUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("life", container => new LifeUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../shapes/line/dist/esm/LineDrawer.js
class LineDrawer {
  draw(context, particle, radius) {
    const shapeData = particle.shapeData;
    context.moveTo(-radius / 2, 0);
    context.lineTo(radius / 2, 0);
    context.lineCap = shapeData?.cap ?? "butt";
  }
  getSidesCount() {
    return 1;
  }
}
;// CONCATENATED MODULE: ../../shapes/line/dist/esm/index.js

async function loadLineShape(engine, refresh = true) {
  await engine.addShape("line", new LineDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../move/parallax/dist/esm/ParallaxMover.js

class ParallaxMover {
  init() {}
  isEnabled(particle) {
    return !isSsr() && !particle.destroyed && particle.container.actualOptions.interactivity.events.onHover.parallax.enable;
  }
  move(particle) {
    const container = particle.container,
      options = container.actualOptions,
      parallaxOptions = options.interactivity.events.onHover.parallax;
    if (isSsr() || !parallaxOptions.enable) {
      return;
    }
    const parallaxForce = parallaxOptions.force,
      mousePos = container.interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    const canvasSize = container.canvas.size,
      canvasCenter = {
        x: canvasSize.width / 2,
        y: canvasSize.height / 2
      },
      parallaxSmooth = parallaxOptions.smooth,
      factor = particle.getRadius() / parallaxForce,
      centerDistance = {
        x: (mousePos.x - canvasCenter.x) * factor,
        y: (mousePos.y - canvasCenter.y) * factor
      },
      {
        offset
      } = particle;
    offset.x += (centerDistance.x - offset.x) / parallaxSmooth;
    offset.y += (centerDistance.y - offset.y) / parallaxSmooth;
  }
}
;// CONCATENATED MODULE: ../../move/parallax/dist/esm/index.js

async function loadParallaxMover(engine, refresh = true) {
  await engine.addMover("parallax", () => new ParallaxMover(), refresh);
}
;// CONCATENATED MODULE: ../../interactions/particles/attract/dist/esm/Attractor.js

class Attractor_Attractor extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {}
  async interact(p1) {
    const container = this.container,
      distance = p1.retina.attractDistance ?? container.retina.attractDistance,
      pos1 = p1.getPosition(),
      query = container.particles.quadTree.queryCircle(pos1, distance);
    for (const p2 of query) {
      if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
        continue;
      }
      const pos2 = p2.getPosition(),
        {
          dx,
          dy
        } = getDistances(pos1, pos2),
        rotate = p1.options.move.attract.rotate,
        ax = dx / (rotate.x * 1000),
        ay = dy / (rotate.y * 1000),
        p1Factor = p2.size.value / p1.size.value,
        p2Factor = 1 / p1Factor;
      p1.velocity.x -= ax * p1Factor;
      p1.velocity.y -= ay * p1Factor;
      p2.velocity.x += ax * p2Factor;
      p2.velocity.y += ay * p2Factor;
    }
  }
  isEnabled(particle) {
    return particle.options.move.attract.enable;
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/particles/attract/dist/esm/index.js

async function loadParticlesAttractInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesAttract", container => new Attractor_Attractor(container), refresh);
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/Absorb.js

function updateAbsorb(p1, r1, p2, r2, delta, pixelRatio) {
  const factor = clamp(p1.options.collisions.absorb.speed * delta.factor / 10, 0, r2);
  p1.size.value += factor / 2;
  p2.size.value -= factor;
  if (r2 <= pixelRatio) {
    p2.size.value = 0;
    p2.destroy();
  }
}
function absorb(p1, p2, delta, pixelRatio) {
  const r1 = p1.getRadius(),
    r2 = p2.getRadius();
  if (r1 === undefined && r2 !== undefined) {
    p1.destroy();
  } else if (r1 !== undefined && r2 === undefined) {
    p2.destroy();
  } else if (r1 !== undefined && r2 !== undefined) {
    if (r1 >= r2) {
      updateAbsorb(p1, r1, p2, r2, delta, pixelRatio);
    } else {
      updateAbsorb(p2, r2, p1, r1, delta, pixelRatio);
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/Bounce.js

const fixBounceSpeed = p => {
  if (p.collisionMaxSpeed === undefined) {
    p.collisionMaxSpeed = getRangeValue(p.options.collisions.maxSpeed);
  }
  if (p.velocity.length > p.collisionMaxSpeed) {
    p.velocity.length = p.collisionMaxSpeed;
  }
};
function bounce(p1, p2) {
  circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));
  fixBounceSpeed(p1);
  fixBounceSpeed(p2);
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/Destroy.js

function destroy(p1, p2) {
  if (!p1.unbreakable && !p2.unbreakable) {
    bounce(p1, p2);
  }
  if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
    p1.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
    p2.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
    const deleteP = p1.getRadius() >= p2.getRadius() ? p2 : p1;
    deleteP.destroy();
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/ResolveCollision.js



function resolveCollision(p1, p2, delta, pixelRatio) {
  switch (p1.options.collisions.mode) {
    case "absorb":
      {
        absorb(p1, p2, delta, pixelRatio);
        break;
      }
    case "bounce":
      {
        bounce(p1, p2);
        break;
      }
    case "destroy":
      {
        destroy(p1, p2);
        break;
      }
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/Collider.js


class Collider extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {}
  async interact(p1, delta) {
    if (p1.destroyed || p1.spawning) {
      return;
    }
    const container = this.container,
      pos1 = p1.getPosition(),
      radius1 = p1.getRadius(),
      query = container.particles.quadTree.queryCircle(pos1, radius1 * 2);
    for (const p2 of query) {
      if (p1 === p2 || !p2.options.collisions.enable || p1.options.collisions.mode !== p2.options.collisions.mode || p2.destroyed || p2.spawning) {
        continue;
      }
      const pos2 = p2.getPosition(),
        radius2 = p2.getRadius();
      if (Math.abs(Math.round(pos1.z) - Math.round(pos2.z)) > radius1 + radius2) {
        continue;
      }
      const dist = getDistance(pos1, pos2),
        distP = radius1 + radius2;
      if (dist > distP) {
        continue;
      }
      resolveCollision(p1, p2, delta, container.retina.pixelRatio);
    }
  }
  isEnabled(particle) {
    return particle.options.collisions.enable;
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/index.js

async function loadParticlesCollisionsInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesCollisions", container => new Collider(container), refresh);
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/CircleWarp.js

class CircleWarp extends Circle {
  constructor(x, y, radius, canvasSize) {
    super(x, y, radius);
    this.canvasSize = canvasSize;
    this.canvasSize = {
      ...canvasSize
    };
  }
  contains(point) {
    const {
      width,
      height
    } = this.canvasSize;
    const {
      x,
      y
    } = point;
    return super.contains(point) || super.contains({
      x: x - width,
      y
    }) || super.contains({
      x: x - width,
      y: y - height
    }) || super.contains({
      x,
      y: y - height
    });
  }
  intersects(range) {
    if (super.intersects(range)) {
      return true;
    }
    const rect = range,
      circle = range,
      newPos = {
        x: range.position.x - this.canvasSize.width,
        y: range.position.y - this.canvasSize.height
      };
    if (circle.radius !== undefined) {
      const biggerCircle = new Circle(newPos.x, newPos.y, circle.radius * 2);
      return super.intersects(biggerCircle);
    } else if (rect.size !== undefined) {
      const rectSW = new Rectangle(newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);
      return super.intersects(rectSW);
    }
    return false;
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/Options/Classes/LinksShadow.js

class LinksShadow {
  constructor() {
    this.blur = 5;
    this.color = new OptionsColor();
    this.color.value = "#000";
    this.enable = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.blur !== undefined) {
      this.blur = data.blur;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/Options/Classes/LinksTriangle.js

class LinksTriangle {
  constructor() {
    this.enable = false;
    this.frequency = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.frequency !== undefined) {
      this.frequency = data.frequency;
    }
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/Options/Classes/Links.js



class Links {
  constructor() {
    this.blink = false;
    this.color = new OptionsColor();
    this.color.value = "#fff";
    this.consent = false;
    this.distance = 100;
    this.enable = false;
    this.frequency = 1;
    this.opacity = 1;
    this.shadow = new LinksShadow();
    this.triangles = new LinksTriangle();
    this.width = 1;
    this.warp = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.id !== undefined) {
      this.id = data.id;
    }
    if (data.blink !== undefined) {
      this.blink = data.blink;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.consent !== undefined) {
      this.consent = data.consent;
    }
    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.frequency !== undefined) {
      this.frequency = data.frequency;
    }
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
    this.shadow.load(data.shadow);
    this.triangles.load(data.triangles);
    if (data.width !== undefined) {
      this.width = data.width;
    }
    if (data.warp !== undefined) {
      this.warp = data.warp;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/Linker.js



function getLinkDistance(pos1, pos2, optDistance, canvasSize, warp) {
  const {
    dx,
    dy,
    distance
  } = getDistances(pos1, pos2);
  if (!warp || distance <= optDistance) {
    return distance;
  }
  const absDiffs = {
      x: Math.abs(dx),
      y: Math.abs(dy)
    },
    warpDistances = {
      x: Math.min(absDiffs.x, canvasSize.width - absDiffs.x),
      y: Math.min(absDiffs.y, canvasSize.height - absDiffs.y)
    };
  return Math.sqrt(warpDistances.x ** 2 + warpDistances.y ** 2);
}
class Linker extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
    this._setColor = p1 => {
      if (!p1.options.links) {
        return;
      }
      const container = this.linkContainer,
        linksOptions = p1.options.links;
      let linkColor = linksOptions.id === undefined ? container.particles.linksColor : container.particles.linksColors.get(linksOptions.id);
      if (linkColor) {
        return;
      }
      const optColor = linksOptions.color;
      linkColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
      if (linksOptions.id === undefined) {
        container.particles.linksColor = linkColor;
      } else {
        container.particles.linksColors.set(linksOptions.id, linkColor);
      }
    };
    this.linkContainer = container;
  }
  clear() {}
  init() {
    this.linkContainer.particles.linksColor = undefined;
    this.linkContainer.particles.linksColors = new Map();
  }
  async interact(p1) {
    if (!p1.options.links) {
      return;
    }
    p1.links = [];
    const pos1 = p1.getPosition(),
      container = this.container,
      canvasSize = container.canvas.size;
    if (pos1.x < 0 || pos1.y < 0 || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
      return;
    }
    const linkOpt1 = p1.options.links,
      optOpacity = linkOpt1.opacity,
      optDistance = p1.retina.linksDistance ?? 0,
      warp = linkOpt1.warp,
      range = warp ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) : new Circle(pos1.x, pos1.y, optDistance),
      query = container.particles.quadTree.query(range);
    for (const p2 of query) {
      const linkOpt2 = p2.options.links;
      if (p1 === p2 || !linkOpt2?.enable || linkOpt1.id !== linkOpt2.id || p2.spawning || p2.destroyed || !p2.links || p1.links.some(t => t.destination === p2) || p2.links.some(t => t.destination === p1)) {
        continue;
      }
      const pos2 = p2.getPosition();
      if (pos2.x < 0 || pos2.y < 0 || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
        continue;
      }
      const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);
      if (distance > optDistance) {
        continue;
      }
      const opacityLine = (1 - distance / optDistance) * optOpacity;
      this._setColor(p1);
      p1.links.push({
        destination: p2,
        opacity: opacityLine
      });
    }
  }
  isEnabled(particle) {
    return !!particle.options.links?.enable;
  }
  loadParticlesOptions(options, ...sources) {
    if (!options.links) {
      options.links = new Links();
    }
    for (const source of sources) {
      options.links.load(source?.links ?? source?.lineLinked ?? source?.line_linked);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/interaction.js

async function loadLinksInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesLinks", container => new Linker(container), refresh);
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/Utils.js

function drawLinkLine(params) {
  let drawn = false;
  const {
    begin,
    end,
    maxDistance,
    context,
    canvasSize,
    width,
    backgroundMask,
    colorLine,
    opacity,
    links
  } = params;
  if (getDistance(begin, end) <= maxDistance) {
    drawLine(context, begin, end);
    drawn = true;
  } else if (links.warp) {
    let pi1;
    let pi2;
    const endNE = {
      x: end.x - canvasSize.width,
      y: end.y
    };
    const d1 = getDistances(begin, endNE);
    if (d1.distance <= maxDistance) {
      const yi = begin.y - d1.dy / d1.dx * begin.x;
      pi1 = {
        x: 0,
        y: yi
      };
      pi2 = {
        x: canvasSize.width,
        y: yi
      };
    } else {
      const endSW = {
        x: end.x,
        y: end.y - canvasSize.height
      };
      const d2 = getDistances(begin, endSW);
      if (d2.distance <= maxDistance) {
        const yi = begin.y - d2.dy / d2.dx * begin.x;
        const xi = -yi / (d2.dy / d2.dx);
        pi1 = {
          x: xi,
          y: 0
        };
        pi2 = {
          x: xi,
          y: canvasSize.height
        };
      } else {
        const endSE = {
          x: end.x - canvasSize.width,
          y: end.y - canvasSize.height
        };
        const d3 = getDistances(begin, endSE);
        if (d3.distance <= maxDistance) {
          const yi = begin.y - d3.dy / d3.dx * begin.x;
          const xi = -yi / (d3.dy / d3.dx);
          pi1 = {
            x: xi,
            y: yi
          };
          pi2 = {
            x: pi1.x + canvasSize.width,
            y: pi1.y + canvasSize.height
          };
        }
      }
    }
    if (pi1 && pi2) {
      drawLine(context, begin, pi1);
      drawLine(context, end, pi2);
      drawn = true;
    }
  }
  if (!drawn) {
    return;
  }
  context.lineWidth = width;
  if (backgroundMask.enable) {
    context.globalCompositeOperation = backgroundMask.composite;
  }
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  const {
    shadow
  } = links;
  if (shadow.enable) {
    const shadowColor = rangeColorToRgb(shadow.color);
    if (shadowColor) {
      context.shadowBlur = shadow.blur;
      context.shadowColor = getStyleFromRgb(shadowColor);
    }
  }
  context.stroke();
}
function drawLinkTriangle(params) {
  const {
    context,
    pos1,
    pos2,
    pos3,
    backgroundMask,
    colorTriangle,
    opacityTriangle
  } = params;
  drawTriangle(context, pos1, pos2, pos3);
  if (backgroundMask.enable) {
    context.globalCompositeOperation = backgroundMask.composite;
  }
  context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);
  context.fill();
}
function getLinkKey(ids) {
  ids.sort((a, b) => a - b);
  return ids.join("_");
}
function setLinkFrequency(particles, dictionary) {
  const key = getLinkKey(particles.map(t => t.id));
  let res = dictionary.get(key);
  if (res === undefined) {
    res = getRandom();
    dictionary.set(key, res);
  }
  return res;
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/LinkInstance.js


class LinkInstance {
  constructor(container) {
    this.container = container;
    this._drawLinkLine = (p1, link) => {
      const p1LinksOptions = p1.options.links;
      if (!p1LinksOptions?.enable) {
        return;
      }
      const container = this.container,
        options = container.actualOptions,
        p2 = link.destination,
        pos1 = p1.getPosition(),
        pos2 = p2.getPosition();
      let opacity = link.opacity;
      container.canvas.draw(ctx => {
        let colorLine;
        const twinkle = p1.options.twinkle?.lines;
        if (twinkle?.enable) {
          const twinkleFreq = twinkle.frequency,
            twinkleRgb = rangeColorToRgb(twinkle.color),
            twinkling = getRandom() < twinkleFreq;
          if (twinkling && twinkleRgb) {
            colorLine = twinkleRgb;
            opacity = getRangeValue(twinkle.opacity);
          }
        }
        if (!colorLine) {
          const linkColor = p1LinksOptions.id !== undefined ? container.particles.linksColors.get(p1LinksOptions.id) : container.particles.linksColor;
          colorLine = getLinkColor(p1, p2, linkColor);
        }
        if (!colorLine) {
          return;
        }
        const width = p1.retina.linksWidth ?? 0,
          maxDistance = p1.retina.linksDistance ?? 0,
          {
            backgroundMask
          } = options;
        drawLinkLine({
          context: ctx,
          width,
          begin: pos1,
          end: pos2,
          maxDistance,
          canvasSize: container.canvas.size,
          links: p1LinksOptions,
          backgroundMask: backgroundMask,
          colorLine,
          opacity
        });
      });
    };
    this._drawLinkTriangle = (p1, link1, link2) => {
      const linksOptions = p1.options.links;
      if (!linksOptions?.enable) {
        return;
      }
      const triangleOptions = linksOptions.triangles;
      if (!triangleOptions.enable) {
        return;
      }
      const container = this.container,
        options = container.actualOptions,
        p2 = link1.destination,
        p3 = link2.destination,
        opacityTriangle = triangleOptions.opacity ?? (link1.opacity + link2.opacity) / 2;
      if (opacityTriangle <= 0) {
        return;
      }
      container.canvas.draw(ctx => {
        const pos1 = p1.getPosition(),
          pos2 = p2.getPosition(),
          pos3 = p3.getPosition(),
          linksDistance = p1.retina.linksDistance ?? 0;
        if (getDistance(pos1, pos2) > linksDistance || getDistance(pos3, pos2) > linksDistance || getDistance(pos3, pos1) > linksDistance) {
          return;
        }
        let colorTriangle = rangeColorToRgb(triangleOptions.color);
        if (!colorTriangle) {
          const linkColor = linksOptions.id !== undefined ? container.particles.linksColors.get(linksOptions.id) : container.particles.linksColor;
          colorTriangle = getLinkColor(p1, p2, linkColor);
        }
        if (!colorTriangle) {
          return;
        }
        drawLinkTriangle({
          context: ctx,
          pos1,
          pos2,
          pos3,
          backgroundMask: options.backgroundMask,
          colorTriangle,
          opacityTriangle
        });
      });
    };
    this._drawTriangles = (options, p1, link, p1Links) => {
      const p2 = link.destination;
      if (!(options.links?.triangles.enable && p2.options.links?.triangles.enable)) {
        return;
      }
      const vertices = p2.links?.filter(t => {
        const linkFreq = this._getLinkFrequency(p2, t.destination);
        return p2.options.links && linkFreq <= p2.options.links.frequency && p1Links.findIndex(l => l.destination === t.destination) >= 0;
      });
      if (!vertices?.length) {
        return;
      }
      for (const vertex of vertices) {
        const p3 = vertex.destination,
          triangleFreq = this._getTriangleFrequency(p1, p2, p3);
        if (triangleFreq > options.links.triangles.frequency) {
          continue;
        }
        this._drawLinkTriangle(p1, link, vertex);
      }
    };
    this._getLinkFrequency = (p1, p2) => {
      return setLinkFrequency([p1, p2], this._freqs.links);
    };
    this._getTriangleFrequency = (p1, p2, p3) => {
      return setLinkFrequency([p1, p2, p3], this._freqs.triangles);
    };
    this._freqs = {
      links: new Map(),
      triangles: new Map()
    };
  }
  drawParticle(context, particle) {
    const {
      links,
      options
    } = particle;
    if (!links || links.length <= 0) {
      return;
    }
    const p1Links = links.filter(l => options.links && this._getLinkFrequency(particle, l.destination) <= options.links.frequency);
    for (const link of p1Links) {
      this._drawTriangles(options, particle, link, p1Links);
      if (link.opacity > 0 && (particle.retina.linksWidth ?? 0) > 0) {
        this._drawLinkLine(particle, link);
      }
    }
  }
  async init() {
    this._freqs.links = new Map();
    this._freqs.triangles = new Map();
  }
  particleCreated(particle) {
    particle.links = [];
    if (!particle.options.links) {
      return;
    }
    const ratio = this.container.retina.pixelRatio,
      {
        retina
      } = particle,
      {
        distance,
        width
      } = particle.options.links;
    retina.linksDistance = distance * ratio;
    retina.linksWidth = width * ratio;
  }
  particleDestroyed(particle) {
    particle.links = [];
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/plugin.js

class LinksPlugin {
  constructor() {
    this.id = "links";
  }
  getPlugin(container) {
    return new LinkInstance(container);
  }
  loadOptions() {}
  needsPlugin() {
    return true;
  }
}
async function loadLinksPlugin(engine, refresh = true) {
  const plugin = new LinksPlugin();
  await engine.addPlugin(plugin, refresh);
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/index.js


async function loadParticlesLinksInteraction(engine, refresh = true) {
  await loadLinksInteraction(engine, refresh);
  await loadLinksPlugin(engine, refresh);
}






;// CONCATENATED MODULE: ../../shapes/polygon/dist/esm/PolygonDrawerBase.js

class PolygonDrawerBase {
  draw(context, particle, radius) {
    const start = this.getCenter(particle, radius),
      side = this.getSidesData(particle, radius),
      sideCount = side.count.numerator * side.count.denominator,
      decimalSides = side.count.numerator / side.count.denominator,
      interiorAngleDegrees = 180 * (decimalSides - 2) / decimalSides,
      interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180;
    if (!context) {
      return;
    }
    context.beginPath();
    context.translate(start.x, start.y);
    context.moveTo(0, 0);
    for (let i = 0; i < sideCount; i++) {
      context.lineTo(side.length, 0);
      context.translate(side.length, 0);
      context.rotate(interiorAngle);
    }
  }
  getSidesCount(particle) {
    const polygon = particle.shapeData;
    return Math.round(getRangeValue(polygon?.sides ?? polygon?.nb_sides ?? 5));
  }
}
;// CONCATENATED MODULE: ../../shapes/polygon/dist/esm/PolygonDrawer.js

class PolygonDrawer extends PolygonDrawerBase {
  getCenter(particle, radius) {
    return {
      x: -radius / (particle.sides / 3.5),
      y: -radius / (2.66 / 3.5)
    };
  }
  getSidesData(particle, radius) {
    const sides = particle.sides;
    return {
      count: {
        denominator: 1,
        numerator: sides
      },
      length: radius * 2.66 / (sides / 3)
    };
  }
}
;// CONCATENATED MODULE: ../../shapes/polygon/dist/esm/TriangleDrawer.js

class TriangleDrawer extends PolygonDrawerBase {
  getCenter(particle, radius) {
    return {
      x: -radius,
      y: radius / 1.66
    };
  }
  getSidesCount() {
    return 3;
  }
  getSidesData(particle, radius) {
    return {
      count: {
        denominator: 2,
        numerator: 3
      },
      length: radius * 2
    };
  }
}
;// CONCATENATED MODULE: ../../shapes/polygon/dist/esm/index.js


async function loadGenericPolygonShape(engine, refresh = true) {
  await engine.addShape("polygon", new PolygonDrawer(), refresh);
}
async function loadTriangleShape(engine, refresh = true) {
  await engine.addShape("triangle", new TriangleDrawer(), refresh);
}
async function loadPolygonShape(engine, refresh = true) {
  await loadGenericPolygonShape(engine, refresh);
  await loadTriangleShape(engine, refresh);
}
;// CONCATENATED MODULE: ../../updaters/rotate/dist/esm/Options/Classes/RotateAnimation.js

class RotateAnimation {
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.decay !== undefined) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/rotate/dist/esm/Options/Classes/Rotate.js


class Rotate extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new RotateAnimation();
    this.direction = "clockwise";
    this.path = false;
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.direction !== undefined) {
      this.direction = data.direction;
    }
    this.animation.load(data.animation);
    if (data.path !== undefined) {
      this.path = data.path;
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/rotate/dist/esm/RotateUpdater.js


function updateRotate(particle, delta) {
  const rotate = particle.rotate,
    rotateOptions = particle.options.rotate;
  if (!rotate || !rotateOptions) {
    return;
  }
  const rotateAnimation = rotateOptions.animation,
    speed = (rotate.velocity ?? 0) * delta.factor,
    max = 2 * Math.PI,
    decay = rotate.decay ?? 1;
  if (!rotateAnimation.enable) {
    return;
  }
  switch (rotate.status) {
    case "increasing":
      rotate.value += speed;
      if (rotate.value > max) {
        rotate.value -= max;
      }
      break;
    case "decreasing":
    default:
      rotate.value -= speed;
      if (rotate.value < 0) {
        rotate.value += max;
      }
      break;
  }
  if (rotate.velocity && decay !== 1) {
    rotate.velocity *= decay;
  }
}
class RotateUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const rotateOptions = particle.options.rotate;
    if (!rotateOptions) {
      return;
    }
    particle.rotate = {
      enable: rotateOptions.animation.enable,
      value: getRangeValue(rotateOptions.value) * Math.PI / 180
    };
    particle.pathRotation = rotateOptions.path;
    let rotateDirection = rotateOptions.direction;
    if (rotateDirection === "random") {
      const index = Math.floor(getRandom() * 2);
      rotateDirection = index > 0 ? "counter-clockwise" : "clockwise";
    }
    switch (rotateDirection) {
      case "counter-clockwise":
      case "counterClockwise":
        particle.rotate.status = "decreasing";
        break;
      case "clockwise":
        particle.rotate.status = "increasing";
        break;
    }
    const rotateAnimation = rotateOptions.animation;
    if (rotateAnimation.enable) {
      particle.rotate.decay = 1 - getRangeValue(rotateAnimation.decay);
      particle.rotate.velocity = getRangeValue(rotateAnimation.speed) / 360 * this.container.retina.reduceFactor;
      if (!rotateAnimation.sync) {
        particle.rotate.velocity *= getRandom();
      }
    }
    particle.rotation = particle.rotate.value;
  }
  isEnabled(particle) {
    const rotate = particle.options.rotate;
    if (!rotate) {
      return false;
    }
    return !particle.destroyed && !particle.spawning && rotate.animation.enable && !rotate.path;
  }
  loadOptions(options, ...sources) {
    if (!options.rotate) {
      options.rotate = new Rotate();
    }
    for (const source of sources) {
      options.rotate.load(source?.rotate);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateRotate(particle, delta);
    particle.rotation = particle.rotate?.value ?? 0;
  }
}
;// CONCATENATED MODULE: ../../updaters/rotate/dist/esm/index.js

async function loadRotateUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("rotate", container => new RotateUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../shapes/square/dist/esm/SquareDrawer.js
const fixFactor = Math.sqrt(2);
class SquareDrawer {
  draw(context, particle, radius) {
    const fixedRadius = radius / fixFactor,
      fixedDiameter = fixedRadius * 2;
    context.rect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter);
  }
  getSidesCount() {
    return 4;
  }
}
;// CONCATENATED MODULE: ../../shapes/square/dist/esm/index.js

async function loadSquareShape(engine, refresh = true) {
  await engine.addShape(["edge", "square"], new SquareDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../shapes/star/dist/esm/StarDrawer.js

class StarDrawer {
  draw(context, particle, radius) {
    const sides = particle.sides,
      inset = particle.starInset ?? 2;
    context.moveTo(0, 0 - radius);
    for (let i = 0; i < sides; i++) {
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius * inset);
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius);
    }
  }
  getSidesCount(particle) {
    const star = particle.shapeData;
    return Math.round(getRangeValue(star?.sides ?? star?.nb_sides ?? 5));
  }
  particleInit(container, particle) {
    const star = particle.shapeData,
      inset = getRangeValue(star?.inset ?? 2);
    particle.starInset = inset;
  }
}
;// CONCATENATED MODULE: ../../shapes/star/dist/esm/index.js

async function loadStarShape(engine, refresh = true) {
  await engine.addShape("star", new StarDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../updaters/strokeColor/dist/esm/Utils.js

function Utils_updateColorValue(delta, colorValue, valueAnimation, max, decrease) {
  if (!colorValue || !valueAnimation.enable || (colorValue.maxLoops ?? 0) > 0 && (colorValue.loops ?? 0) > (colorValue.maxLoops ?? 0)) {
    return;
  }
  if (!colorValue.time) {
    colorValue.time = 0;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    colorValue.time += delta.value;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    return;
  }
  const offset = randomInRange(valueAnimation.offset),
    velocity = (colorValue.velocity ?? 0) * delta.factor + offset * 3.6,
    decay = colorValue.decay ?? 1;
  if (!decrease || colorValue.status === "increasing") {
    colorValue.value += velocity;
    if (colorValue.value > max) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      if (decrease) {
        colorValue.status = "decreasing";
        colorValue.value -= colorValue.value % max;
      }
    }
  } else {
    colorValue.value -= velocity;
    if (colorValue.value < 0) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      colorValue.status = "increasing";
      colorValue.value += colorValue.value;
    }
  }
  if (colorValue.velocity && decay !== 1) {
    colorValue.velocity *= decay;
  }
  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}
function updateStrokeColor(particle, delta) {
  if (!particle.strokeColor || !particle.strokeAnimation) {
    return;
  }
  const {
      h,
      s,
      l
    } = particle.strokeColor,
    {
      h: hAnimation,
      s: sAnimation,
      l: lAnimation
    } = particle.strokeAnimation;
  if (h) {
    Utils_updateColorValue(delta, h, hAnimation, 360, false);
  }
  if (s) {
    Utils_updateColorValue(delta, s, sAnimation, 100, true);
  }
  if (l) {
    Utils_updateColorValue(delta, l, lAnimation, 100, true);
  }
}
;// CONCATENATED MODULE: ../../updaters/strokeColor/dist/esm/StrokeColorUpdater.js


class StrokeColorUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const container = this.container,
      options = particle.options;
    const stroke = itemFromSingleOrMultiple(options.stroke, particle.id, options.reduceDuplicates);
    particle.strokeWidth = getRangeValue(stroke.width) * container.retina.pixelRatio;
    particle.strokeOpacity = getRangeValue(stroke.opacity ?? 1);
    particle.strokeAnimation = stroke.color?.animation;
    const strokeHslColor = rangeColorToHsl(stroke.color) ?? particle.getFillColor();
    if (strokeHslColor) {
      particle.strokeColor = getHslAnimationFromHsl(strokeHslColor, particle.strokeAnimation, container.retina.reduceFactor);
    }
  }
  isEnabled(particle) {
    const color = particle.strokeAnimation,
      {
        strokeColor
      } = particle;
    return !particle.destroyed && !particle.spawning && !!color && (strokeColor?.h.value !== undefined && strokeColor.h.enable || strokeColor?.s.value !== undefined && strokeColor.s.enable || strokeColor?.l.value !== undefined && strokeColor.l.enable);
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateStrokeColor(particle, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/strokeColor/dist/esm/index.js

async function loadStrokeColorUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("strokeColor", container => new StrokeColorUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../shapes/text/dist/esm/TextDrawer.js

const validTypes = ["text", "character", "char"];
class TextDrawer {
  draw(context, particle, radius, opacity) {
    const character = particle.shapeData;
    if (character === undefined) {
      return;
    }
    const textData = character.value;
    if (textData === undefined) {
      return;
    }
    if (particle.text === undefined) {
      particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
    }
    const text = particle.text,
      style = character.style ?? "",
      weight = character.weight ?? "400",
      size = Math.round(radius) * 2,
      font = character.font ?? "Verdana",
      fill = particle.fill,
      offsetX = text.length * radius / 2;
    context.font = `${style} ${weight} ${size}px "${font}"`;
    const pos = {
      x: -offsetX,
      y: radius / 2
    };
    context.globalAlpha = opacity;
    if (fill) {
      context.fillText(text, pos.x, pos.y);
    } else {
      context.strokeText(text, pos.x, pos.y);
    }
    context.globalAlpha = 1;
  }
  getSidesCount() {
    return 12;
  }
  async init(container) {
    const options = container.actualOptions;
    if (validTypes.find(t => isInArray(t, options.particles.shape.type))) {
      const shapeOptions = validTypes.map(t => options.particles.shape.options[t]).find(t => !!t),
        promises = [];
      executeOnSingleOrMultiple(shapeOptions, shape => {
        promises.push(loadFont(shape.font, shape.weight));
      });
      await Promise.all(promises);
    }
  }
  particleInit(container, particle) {
    if (!particle.shape || !validTypes.includes(particle.shape)) {
      return;
    }
    const character = particle.shapeData;
    if (character === undefined) {
      return;
    }
    const textData = character.value;
    if (textData === undefined) {
      return;
    }
    particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
  }
}
;// CONCATENATED MODULE: ../../shapes/text/dist/esm/index.js

async function loadTextShape(engine, refresh = true) {
  await engine.addShape(validTypes, new TextDrawer(), refresh);
}
;// CONCATENATED MODULE: ../slim/dist/esm/index.js


























async function loadSlim(engine, refresh = true) {
  initPjs(engine);
  await loadParallaxMover(engine, false);
  await loadExternalAttractInteraction(engine, false);
  await loadExternalBounceInteraction(engine, false);
  await loadExternalBubbleInteraction(engine, false);
  await loadExternalConnectInteraction(engine, false);
  await loadExternalGrabInteraction(engine, false);
  await loadExternalPauseInteraction(engine, false);
  await loadExternalPushInteraction(engine, false);
  await loadExternalRemoveInteraction(engine, false);
  await loadExternalRepulseInteraction(engine, false);
  await loadExternalSlowInteraction(engine, false);
  await loadParticlesAttractInteraction(engine, false);
  await loadParticlesCollisionsInteraction(engine, false);
  await loadParticlesLinksInteraction(engine, false);
  await loadEasingQuadPlugin();
  await loadImageShape(engine, false);
  await loadLineShape(engine, false);
  await loadPolygonShape(engine, false);
  await loadSquareShape(engine, false);
  await loadStarShape(engine, false);
  await loadTextShape(engine, false);
  await loadLifeUpdater(engine, false);
  await loadRotateUpdater(engine, false);
  await loadStrokeColorUpdater(engine, false);
  await loadBasic(engine, refresh);
}
;// CONCATENATED MODULE: ../../updaters/tilt/dist/esm/Options/Classes/TiltAnimation.js

class TiltAnimation {
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.decay !== undefined) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/tilt/dist/esm/Options/Classes/Tilt.js


class Tilt extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new TiltAnimation();
    this.direction = "clockwise";
    this.enable = false;
    this.value = 0;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    this.animation.load(data.animation);
    if (data.direction !== undefined) {
      this.direction = data.direction;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/tilt/dist/esm/Utils.js
function updateTilt(particle, delta) {
  if (!particle.tilt || !particle.options.tilt) {
    return;
  }
  const tilt = particle.options.tilt,
    tiltAnimation = tilt.animation,
    speed = (particle.tilt.velocity ?? 0) * delta.factor,
    max = 2 * Math.PI,
    decay = particle.tilt.decay ?? 1;
  if (!tiltAnimation.enable) {
    return;
  }
  switch (particle.tilt.status) {
    case "increasing":
      particle.tilt.value += speed;
      if (particle.tilt.value > max) {
        particle.tilt.value -= max;
      }
      break;
    case "decreasing":
    default:
      particle.tilt.value -= speed;
      if (particle.tilt.value < 0) {
        particle.tilt.value += max;
      }
      break;
  }
  if (particle.tilt.velocity && decay !== 1) {
    particle.tilt.velocity *= decay;
  }
}
;// CONCATENATED MODULE: ../../updaters/tilt/dist/esm/TiltUpdater.js



class TiltUpdater {
  constructor(container) {
    this.container = container;
  }
  getTransformValues(particle) {
    const tilt = particle.tilt?.enable && particle.tilt;
    return {
      b: tilt ? Math.cos(tilt.value) * tilt.cosDirection : undefined,
      c: tilt ? Math.sin(tilt.value) * tilt.sinDirection : undefined
    };
  }
  init(particle) {
    const tiltOptions = particle.options.tilt;
    if (!tiltOptions) {
      return;
    }
    particle.tilt = {
      enable: tiltOptions.enable,
      value: getRangeValue(tiltOptions.value) * Math.PI / 180,
      sinDirection: getRandom() >= 0.5 ? 1 : -1,
      cosDirection: getRandom() >= 0.5 ? 1 : -1
    };
    let tiltDirection = tiltOptions.direction;
    if (tiltDirection === "random") {
      const index = Math.floor(getRandom() * 2);
      tiltDirection = index > 0 ? "counter-clockwise" : "clockwise";
    }
    switch (tiltDirection) {
      case "counter-clockwise":
      case "counterClockwise":
        particle.tilt.status = "decreasing";
        break;
      case "clockwise":
        particle.tilt.status = "increasing";
        break;
    }
    const tiltAnimation = particle.options.tilt?.animation;
    if (tiltAnimation?.enable) {
      particle.tilt.decay = 1 - getRangeValue(tiltAnimation.decay);
      particle.tilt.velocity = getRangeValue(tiltAnimation.speed) / 360 * this.container.retina.reduceFactor;
      if (!tiltAnimation.sync) {
        particle.tilt.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    const tiltAnimation = particle.options.tilt?.animation;
    return !particle.destroyed && !particle.spawning && !!tiltAnimation?.enable;
  }
  loadOptions(options, ...sources) {
    if (!options.tilt) {
      options.tilt = new Tilt();
    }
    for (const source of sources) {
      options.tilt.load(source?.tilt);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateTilt(particle, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/tilt/dist/esm/index.js

async function loadTiltUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("tilt", container => new TiltUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../updaters/twinkle/dist/esm/Options/Classes/TwinkleValues.js

class TwinkleValues {
  constructor() {
    this.enable = false;
    this.frequency = 0.05;
    this.opacity = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.frequency !== undefined) {
      this.frequency = data.frequency;
    }
    if (data.opacity !== undefined) {
      this.opacity = setRangeValue(data.opacity);
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/twinkle/dist/esm/Options/Classes/Twinkle.js

class Twinkle {
  constructor() {
    this.lines = new TwinkleValues();
    this.particles = new TwinkleValues();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.lines.load(data.lines);
    this.particles.load(data.particles);
  }
}
;// CONCATENATED MODULE: ../../updaters/twinkle/dist/esm/TwinkleUpdater.js


class TwinkleUpdater {
  getColorStyles(particle, context, radius, opacity) {
    const pOptions = particle.options,
      twinkleOptions = pOptions.twinkle;
    if (!twinkleOptions) {
      return {};
    }
    const twinkle = twinkleOptions.particles,
      twinkling = twinkle.enable && getRandom() < twinkle.frequency,
      zIndexOptions = particle.options.zIndex,
      zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate,
      twinklingOpacity = twinkling ? getRangeValue(twinkle.opacity) * zOpacityFactor : opacity,
      twinkleRgb = rangeColorToHsl(twinkle.color),
      twinkleStyle = twinkleRgb ? ColorUtils_getStyleFromHsl(twinkleRgb, twinklingOpacity) : undefined,
      res = {},
      needsTwinkle = twinkling && twinkleStyle;
    res.fill = needsTwinkle ? twinkleStyle : undefined;
    res.stroke = needsTwinkle ? twinkleStyle : undefined;
    return res;
  }
  init() {}
  isEnabled(particle) {
    const pOptions = particle.options,
      twinkleOptions = pOptions.twinkle;
    if (!twinkleOptions) {
      return false;
    }
    return twinkleOptions.particles.enable;
  }
  loadOptions(options, ...sources) {
    if (!options.twinkle) {
      options.twinkle = new Twinkle();
    }
    for (const source of sources) {
      options.twinkle.load(source?.twinkle);
    }
  }
  update() {}
}
;// CONCATENATED MODULE: ../../updaters/twinkle/dist/esm/index.js

async function loadTwinkleUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("twinkle", () => new TwinkleUpdater(), refresh);
}
;// CONCATENATED MODULE: ../../updaters/wobble/dist/esm/Options/Classes/WobbleSpeed.js

class WobbleSpeed {
  constructor() {
    this.angle = 50;
    this.move = 10;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.angle !== undefined) {
      this.angle = setRangeValue(data.angle);
    }
    if (data.move !== undefined) {
      this.move = setRangeValue(data.move);
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/wobble/dist/esm/Options/Classes/Wobble.js


class Wobble {
  constructor() {
    this.distance = 5;
    this.enable = false;
    this.speed = new WobbleSpeed();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== undefined) {
      this.distance = setRangeValue(data.distance);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.speed !== undefined) {
      if (isNumber(data.speed)) {
        this.speed.load({
          angle: data.speed
        });
      } else {
        const rangeSpeed = data.speed;
        if (rangeSpeed.min !== undefined) {
          this.speed.load({
            angle: rangeSpeed
          });
        } else {
          this.speed.load(data.speed);
        }
      }
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/wobble/dist/esm/Utils.js
function updateWobble(particle, delta) {
  const {
      wobble: wobbleOptions
    } = particle.options,
    {
      wobble
    } = particle;
  if (!wobbleOptions?.enable || !wobble) {
    return;
  }
  const angleSpeed = wobble.angleSpeed * delta.factor,
    moveSpeed = wobble.moveSpeed * delta.factor,
    distance = moveSpeed * ((particle.retina.wobbleDistance ?? 0) * delta.factor) / (1000 / 60),
    max = 2 * Math.PI,
    {
      position
    } = particle;
  wobble.angle += angleSpeed;
  if (wobble.angle > max) {
    wobble.angle -= max;
  }
  position.x += distance * Math.cos(wobble.angle);
  position.y += distance * Math.abs(Math.sin(wobble.angle));
}
;// CONCATENATED MODULE: ../../updaters/wobble/dist/esm/WobbleUpdater.js



class WobbleUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const wobbleOpt = particle.options.wobble;
    if (wobbleOpt?.enable) {
      particle.wobble = {
        angle: getRandom() * Math.PI * 2,
        angleSpeed: getRangeValue(wobbleOpt.speed.angle) / 360,
        moveSpeed: getRangeValue(wobbleOpt.speed.move) / 10
      };
    } else {
      particle.wobble = {
        angle: 0,
        angleSpeed: 0,
        moveSpeed: 0
      };
    }
    particle.retina.wobbleDistance = getRangeValue(wobbleOpt?.distance ?? 0) * this.container.retina.pixelRatio;
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning && !!particle.options.wobble?.enable;
  }
  loadOptions(options, ...sources) {
    if (!options.wobble) {
      options.wobble = new Wobble();
    }
    for (const source of sources) {
      options.wobble.load(source?.wobble);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateWobble(particle, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/wobble/dist/esm/index.js

async function loadWobbleUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("wobble", container => new WobbleUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../full/dist/esm/index.js









async function loadFull(engine, refresh = true) {
  await loadDestroyUpdater(engine, false);
  await loadRollUpdater(engine, false);
  await loadTiltUpdater(engine, false);
  await loadTwinkleUpdater(engine, false);
  await loadWobbleUpdater(engine, false);
  await loadExternalTrailInteraction(engine, false);
  await loadAbsorbersPlugin(engine, false);
  await loadEmittersPlugin(engine, false);
  await loadSlim(engine, refresh);
}
;// CONCATENATED MODULE: ../../updaters/gradient/dist/esm/Options/Classes/GradientColorOpacityAnimation.js

class GradientColorOpacityAnimation {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.delay = 0;
    this.sync = false;
    this.startValue = "random";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== undefined) {
      this.count = setRangeValue(data.count);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
    if (data.startValue !== undefined) {
      this.startValue = data.startValue;
    }
    if (data.decay !== undefined) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/gradient/dist/esm/Options/Classes/GradientColorOpacity.js


class GradientColorOpacity {
  constructor() {
    this.value = 0;
    this.animation = new GradientColorOpacityAnimation();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.animation.load(data.animation);
    if (data.value !== undefined) {
      this.value = setRangeValue(data.value);
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/gradient/dist/esm/Options/Classes/AnimatableGradientColor.js


class AnimatableGradientColor {
  constructor() {
    this.stop = 0;
    this.value = new AnimatableColor();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.stop !== undefined) {
      this.stop = data.stop;
    }
    this.value = AnimatableColor.create(this.value, data.value);
    if (data.opacity !== undefined) {
      this.opacity = new GradientColorOpacity();
      if (isNumber(data.opacity)) {
        this.opacity.value = data.opacity;
      } else {
        this.opacity.load(data.opacity);
      }
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/gradient/dist/esm/Options/Classes/GradientAngleAnimation.js

class GradientAngleAnimation {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.delay = 0;
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== undefined) {
      this.count = setRangeValue(data.count);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.decay !== undefined) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/gradient/dist/esm/Options/Classes/GradientAngle.js


class GradientAngle {
  constructor() {
    this.value = 0;
    this.animation = new GradientAngleAnimation();
    this.direction = "clockwise";
  }
  load(data) {
    if (!data) {
      return;
    }
    this.animation.load(data.animation);
    if (data.value !== undefined) {
      this.value = setRangeValue(data.value);
    }
    if (data.direction !== undefined) {
      this.direction = data.direction;
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/gradient/dist/esm/Options/Classes/AnimatableGradient.js


class AnimatableGradient {
  constructor() {
    this.angle = new GradientAngle();
    this.colors = [];
    this.type = "random";
  }
  load(data) {
    if (!data) {
      return;
    }
    this.angle.load(data.angle);
    if (data.colors !== undefined) {
      this.colors = data.colors.map(s => {
        const tmp = new AnimatableGradientColor();
        tmp.load(s);
        return tmp;
      });
    }
    if (data.type !== undefined) {
      this.type = data.type;
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/gradient/dist/esm/Utils.js
function updateColorOpacity(delta, value) {
  if (!value.enable) {
    return;
  }
  const decay = value.decay ?? 1;
  switch (value.status) {
    case "increasing":
      if (value.value >= value.max) {
        value.status = "decreasing";
      } else {
        value.value += (value.velocity ?? 0) * delta.factor;
      }
      break;
    case "decreasing":
      if (value.value <= value.min) {
        value.status = "increasing";
      } else {
        value.value -= (value.velocity ?? 0) * delta.factor;
      }
      break;
  }
  if (value.velocity && decay !== 1) {
    value.velocity *= decay;
  }
}
function esm_Utils_updateColorValue(delta, colorValue, max, decrease) {
  if (!colorValue || !colorValue.enable) {
    return;
  }
  if (!colorValue.time) {
    colorValue.time = 0;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    colorValue.time += delta.value;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    return;
  }
  const velocity = (colorValue.velocity ?? 0) * delta.factor,
    decay = colorValue.decay ?? 1;
  if (!decrease || colorValue.status === "increasing") {
    colorValue.value += velocity;
    if (decrease && colorValue.value > max) {
      colorValue.status = "decreasing";
      colorValue.value -= colorValue.value % max;
    }
  } else {
    colorValue.value -= velocity;
    if (colorValue.value < 0) {
      colorValue.status = "increasing";
      colorValue.value += colorValue.value;
    }
  }
  if (colorValue.value > max) {
    colorValue.value %= max;
  }
  if (colorValue.velocity && decay !== 1) {
    colorValue.velocity *= decay;
  }
}
function updateAngle(delta, angle) {
  const speed = (angle.velocity ?? 0) * delta.factor,
    max = 2 * Math.PI,
    decay = angle.decay ?? 1;
  if (!angle.enable) {
    return;
  }
  switch (angle.status) {
    case "increasing":
      angle.value += speed;
      if (angle.value > max) {
        angle.value -= max;
      }
      break;
    case "decreasing":
    default:
      angle.value -= speed;
      if (angle.value < 0) {
        angle.value += max;
      }
      break;
  }
  if (angle.velocity && decay !== 1) {
    angle.velocity *= decay;
  }
}
function updateGradient(particle, delta) {
  const {
    gradient
  } = particle;
  if (!gradient) {
    return;
  }
  updateAngle(delta, gradient.angle);
  for (const color of gradient.colors) {
    if (particle.color?.h !== undefined) {
      esm_Utils_updateColorValue(delta, color.value.h, 360, false);
    }
    if (particle.color?.s !== undefined) {
      esm_Utils_updateColorValue(delta, color.value.s, 100, true);
    }
    if (particle.color?.l !== undefined) {
      esm_Utils_updateColorValue(delta, color.value.l, 100, true);
    }
    if (color.opacity) {
      updateColorOpacity(delta, color.opacity);
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/gradient/dist/esm/GradientUpdater.js



class GradientUpdater {
  getColorStyles(particle, context, radius, opacity) {
    const gradient = particle.gradient;
    if (!gradient) {
      return {};
    }
    const gradientAngle = gradient.angle.value,
      fillGradient = gradient.type === "radial" ? context.createRadialGradient(0, 0, 0, 0, 0, radius) : context.createLinearGradient(Math.cos(gradientAngle) * -radius, Math.sin(gradientAngle) * -radius, Math.cos(gradientAngle) * radius, Math.sin(gradientAngle) * radius);
    for (const {
      stop,
      value,
      opacity: cOpacity
    } of gradient.colors) {
      fillGradient.addColorStop(stop, ColorUtils_getStyleFromHsl({
        h: value.h.value,
        s: value.s.value,
        l: value.l.value
      }, cOpacity?.value ?? opacity));
    }
    return {
      fill: fillGradient
    };
  }
  init(particle) {
    const gradient = itemFromSingleOrMultiple(particle.options.gradient);
    if (!gradient) {
      return;
    }
    const {
      angle
    } = gradient;
    particle.gradient = {
      angle: {
        value: getRangeValue(angle.value),
        enable: angle.animation.enable,
        velocity: getRangeValue(angle.animation.speed) / 360 * particle.container.retina.reduceFactor,
        decay: 1 - getRangeValue(angle.animation.decay),
        delayTime: getRangeValue(angle.animation.delay) * 1000,
        time: 0
      },
      type: gradient.type,
      colors: []
    };
    let rotateDirection = gradient.angle.direction;
    if (rotateDirection === "random") {
      rotateDirection = getRandom() > 0.5 ? "counter-clockwise" : "clockwise";
    }
    switch (rotateDirection) {
      case "counter-clockwise":
      case "counterClockwise":
        particle.gradient.angle.status = "decreasing";
        break;
      case "clockwise":
        particle.gradient.angle.status = "increasing";
        break;
    }
    const reduceDuplicates = particle.options.reduceDuplicates;
    for (const grColor of gradient.colors) {
      const grHslColor = rangeColorToHsl(grColor.value, particle.id, reduceDuplicates);
      if (!grHslColor) {
        continue;
      }
      const grHslAnimation = getHslAnimationFromHsl(grHslColor, grColor.value.animation, particle.container.retina.reduceFactor),
        addColor = {
          stop: grColor.stop,
          value: grHslAnimation,
          opacity: grColor.opacity ? {
            enable: grColor.opacity.animation.enable,
            max: getRangeMax(grColor.opacity.value),
            min: getRangeMin(grColor.opacity.value),
            status: "increasing",
            value: getRangeValue(grColor.opacity.value),
            velocity: getRangeValue(grColor.opacity.animation.speed) / 100 * particle.container.retina.reduceFactor,
            decay: 1 - getRangeValue(grColor.opacity.animation.decay),
            delayTime: getRangeValue(grColor.opacity.animation.delay) * 1000,
            time: 0
          } : undefined
        };
      const {
        opacity: addOpacity
      } = addColor;
      if (grColor.opacity && addOpacity) {
        const opacityRange = grColor.opacity.value;
        addOpacity.min = getRangeMin(opacityRange);
        addOpacity.max = getRangeMax(opacityRange);
        const opacityAnimation = grColor.opacity.animation;
        switch (opacityAnimation.startValue) {
          case "min":
            addOpacity.value = addOpacity.min;
            addOpacity.status = "increasing";
            break;
          case "max":
            addOpacity.value = addOpacity.max;
            addOpacity.status = "decreasing";
            break;
          case "random":
          default:
            addOpacity.value = randomInRange(addOpacity);
            addOpacity.status = getRandom() >= 0.5 ? "increasing" : "decreasing";
            break;
        }
      }
      particle.gradient.colors.push(addColor);
    }
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning && (particle.gradient?.angle.enable || (particle.gradient?.colors.some(c => c.value.h.enable || c.value.s.enable || c.value.l.enable) ?? false));
  }
  loadOptions(options, ...sources) {
    for (const source of sources) {
      if (!source?.gradient) {
        continue;
      }
      const gradientToLoad = source.gradient;
      if (!gradientToLoad) {
        continue;
      }
      options.gradient = executeOnSingleOrMultiple(gradientToLoad, gradient => {
        const tmp = new AnimatableGradient();
        tmp.load(gradient);
        return tmp;
      });
    }
  }
  update(particle, delta) {
    updateGradient(particle, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/gradient/dist/esm/index.js

async function loadGradientUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("gradient", () => new GradientUpdater(), refresh);
}
;// CONCATENATED MODULE: ../../shapes/heart/dist/esm/HeartDrawer.js
class HeartDrawer_HeartDrawer {
  draw(context, _particle, radius) {
    const x = -radius,
      y = -radius;
    context.moveTo(x, y + radius / 2);
    context.quadraticCurveTo(x, y, x + radius / 2, y);
    context.quadraticCurveTo(x + radius, y, x + radius, y + radius / 2);
    context.quadraticCurveTo(x + radius, y, x + radius * 3 / 2, y);
    context.quadraticCurveTo(x + radius * 2, y, x + radius * 2, y + radius / 2);
    context.quadraticCurveTo(x + radius * 2, y + radius, x + radius * 3 / 2, y + radius * 3 / 2);
    context.lineTo(x + radius, y + radius * 2);
    context.lineTo(x + radius / 2, y + radius * 3 / 2);
    context.quadraticCurveTo(x, y + radius, x, y + radius / 2);
  }
}
;// CONCATENATED MODULE: ../../shapes/heart/dist/esm/index.js

async function loadHeartShape(engine, refresh = true) {
  await engine.addShape("heart", new HeartDrawer_HeartDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../plugins/hsvColor/dist/esm/HsvColorManager.js

function rgbToHsv(rgb) {
  const rgbPercent = {
      r: rgb.r / 255,
      g: rgb.g / 255,
      b: rgb.b / 255
    },
    xMax = Math.max(rgbPercent.r, rgbPercent.g, rgbPercent.b),
    xMin = Math.min(rgbPercent.r, rgbPercent.g, rgbPercent.b),
    v = xMax,
    c = xMax - xMin;
  let h = 0;
  if (v === rgbPercent.r) {
    h = 60 * ((rgbPercent.g - rgbPercent.b) / c);
  } else if (v === rgbPercent.g) {
    h = 60 * (2 + (rgbPercent.b - rgbPercent.r) / c);
  } else if (v === rgbPercent.b) {
    h = 60 * (4 + (rgbPercent.r - rgbPercent.g) / c);
  }
  const s = !v ? 0 : c / v;
  return {
    h,
    s: s * 100,
    v: v * 100
  };
}
function rgbaToHsva(rgba) {
  return {
    a: rgba.a,
    ...rgbToHsv(rgba)
  };
}
function getStyleFromHsv(color, opacity) {
  return getStyleFromHsl(hsvToHsl(color), opacity);
}
function hslToHsv(hsl) {
  const l = hsl.l / 100,
    sl = hsl.s / 100,
    v = l + sl * Math.min(l, 1 - l),
    sv = !v ? 0 : 2 * (1 - l / v);
  return {
    h: hsl.h,
    s: sv * 100,
    v: v * 100
  };
}
function hslaToHsva(hsla) {
  return {
    a: hsla.a,
    ...hslToHsv(hsla)
  };
}
function hsvToHsl(hsv) {
  const v = hsv.v / 100,
    sv = hsv.s / 100,
    l = v * (1 - sv / 2),
    sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
  return {
    h: hsv.h,
    l: l * 100,
    s: sl * 100
  };
}
function hsvaToHsla(hsva) {
  return {
    a: hsva.a,
    ...hsvToHsl(hsva)
  };
}
function hsvToRgb(hsv) {
  const result = {
      b: 0,
      g: 0,
      r: 0
    },
    hsvPercent = {
      h: hsv.h / 60,
      s: hsv.s / 100,
      v: hsv.v / 100
    },
    c = hsvPercent.v * hsvPercent.s,
    x = c * (1 - Math.abs(hsvPercent.h % 2 - 1));
  let tempRgb;
  if (hsvPercent.h >= 0 && hsvPercent.h <= 1) {
    tempRgb = {
      r: c,
      g: x,
      b: 0
    };
  } else if (hsvPercent.h > 1 && hsvPercent.h <= 2) {
    tempRgb = {
      r: x,
      g: c,
      b: 0
    };
  } else if (hsvPercent.h > 2 && hsvPercent.h <= 3) {
    tempRgb = {
      r: 0,
      g: c,
      b: x
    };
  } else if (hsvPercent.h > 3 && hsvPercent.h <= 4) {
    tempRgb = {
      r: 0,
      g: x,
      b: c
    };
  } else if (hsvPercent.h > 4 && hsvPercent.h <= 5) {
    tempRgb = {
      r: x,
      g: 0,
      b: c
    };
  } else if (hsvPercent.h > 5 && hsvPercent.h <= 6) {
    tempRgb = {
      r: c,
      g: 0,
      b: x
    };
  }
  if (tempRgb) {
    const m = hsvPercent.v - c;
    result.r = Math.floor((tempRgb.r + m) * 255);
    result.g = Math.floor((tempRgb.g + m) * 255);
    result.b = Math.floor((tempRgb.b + m) * 255);
  }
  return result;
}
function hsvaToRgba(hsva) {
  return {
    a: hsva.a,
    ...hsvToRgb(hsva)
  };
}
class HsvColorManager {
  constructor() {
    this.key = "hsv";
    this.stringPrefix = "hsv";
  }
  handleColor(color) {
    const colorValue = color.value,
      hsvColor = colorValue.hsv ?? color.value;
    if (hsvColor.h !== undefined && hsvColor.v !== undefined) {
      return hsvToRgb(hsvColor);
    }
  }
  handleRangeColor(color) {
    const colorValue = color.value,
      hsvColor = colorValue.hsv ?? color.value;
    if (hsvColor.h !== undefined && hsvColor.v !== undefined) {
      return hsvToRgb({
        h: getRangeValue(hsvColor.h),
        s: getRangeValue(hsvColor.s),
        v: getRangeValue(hsvColor.v)
      });
    }
  }
  parseString(input) {
    if (!input.startsWith("hsv")) {
      return;
    }
    const regex = /hsva?\(\s*(\d+)°\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.%]+)\s*)?\)/i,
      result = regex.exec(input);
    return result ? hsvaToRgba({
      a: result.length > 4 ? parseAlpha(result[5]) : 1,
      h: parseInt(result[1], 10),
      s: parseInt(result[2], 10),
      v: parseInt(result[3], 10)
    }) : undefined;
  }
}
;// CONCATENATED MODULE: ../../plugins/hsvColor/dist/esm/index.js


async function loadHsvColorPlugin() {
  addColorManager(new HsvColorManager());
}
;// CONCATENATED MODULE: ../../plugins/infection/dist/esm/Options/Classes/InfectionStage.js

class InfectionStage {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#ff0000";
    this.radius = 0;
    this.rate = 1;
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    this.duration = data.duration;
    this.infectedStage = data.infectedStage;
    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
    if (data.rate !== undefined) {
      this.rate = data.rate;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/infection/dist/esm/Options/Classes/Infection.js

class Infection {
  constructor() {
    this.cure = false;
    this.delay = 0;
    this.enable = false;
    this.infections = 0;
    this.stages = [];
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (data.cure !== undefined) {
      this.cure = data.cure;
    }
    if (data.delay !== undefined) {
      this.delay = data.delay;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.infections !== undefined) {
      this.infections = data.infections;
    }
    if (data.stages === undefined) {
      return;
    }
    this.stages = data.stages.map(t => {
      const s = new InfectionStage();
      s.load(t);
      return s;
    });
  }
}
;// CONCATENATED MODULE: ../../plugins/infection/dist/esm/Infecter.js
class Infecter {
  constructor(container) {
    this._nextInfectionStage = particle => {
      const infectionOptions = this._container.actualOptions.infection,
        {
          infection
        } = particle;
      if (!infectionOptions || !infection) {
        return;
      }
      const stagesCount = infectionOptions.stages.length;
      if (stagesCount <= 0 || infection.stage === undefined) {
        return;
      }
      infection.time = 0;
      if (stagesCount <= ++infection.stage) {
        if (infectionOptions.cure) {
          delete infection.stage;
          delete infection.time;
          return;
        } else {
          infection.stage = 0;
          infection.time = 0;
        }
      }
    };
    this._container = container;
  }
  startInfection(particle, stage) {
    const infectionOptions = this._container.actualOptions.infection,
      {
        infection
      } = particle;
    if (!infectionOptions || !infection) {
      return;
    }
    const stages = infectionOptions.stages,
      stagesCount = stages.length;
    if (stage > stagesCount || stage < 0) {
      return;
    }
    infection.delay = 0;
    infection.delayStage = stage;
  }
  updateInfection(particle, delta) {
    const infectionOptions = this._container.actualOptions.infection,
      {
        infection
      } = particle;
    if (!infectionOptions || !infection) {
      return;
    }
    const stages = infectionOptions.stages,
      stagesCount = stages.length;
    if (infection.delay !== undefined && infection.delayStage !== undefined) {
      const stage = infection.delayStage;
      if (stage > stagesCount || stage < 0) {
        return;
      }
      if (infection.delay >= infectionOptions.delay * 1000) {
        infection.stage = stage;
        infection.time = 0;
        delete infection.delay;
        delete infection.delayStage;
      } else {
        infection.delay += delta;
      }
    } else {
      delete infection.delay;
      delete infection.delayStage;
    }
    if (infection.stage !== undefined && infection.time !== undefined) {
      const infectionStage = stages[infection.stage];
      if (infectionStage.duration !== undefined && infectionStage.duration >= 0) {
        if (infection.time > infectionStage.duration * 1000) {
          this._nextInfectionStage(particle);
        } else {
          infection.time += delta;
        }
      } else {
        infection.time += delta;
      }
    } else {
      delete infection.stage;
      delete infection.time;
    }
  }
  updateInfectionStage(particle, stage) {
    const options = this._container.actualOptions,
      {
        infection
      } = particle;
    if (!options.infection || !infection) {
      return;
    }
    const stagesCount = options.infection.stages.length;
    if (stage > stagesCount || stage < 0 || infection.stage !== undefined && infection.stage > stage) {
      return;
    }
    infection.stage = stage;
    infection.time = 0;
  }
}
;// CONCATENATED MODULE: ../../plugins/infection/dist/esm/InfectionInstance.js


class InfectionInstance {
  constructor(container) {
    this._container = container;
    this._container.infecter = new Infecter(this._container);
  }
  particleFillColor(particle) {
    const options = this._container.actualOptions;
    if (!particle.infection || !options.infection) {
      return;
    }
    const infectionStage = particle.infection.stage,
      infection = options.infection,
      infectionStages = infection.stages;
    return infectionStage !== undefined ? infectionStages[infectionStage].color : undefined;
  }
  particleStrokeColor(particle) {
    return this.particleFillColor(particle);
  }
  particlesSetup() {
    const options = this._container.actualOptions;
    if (!options.infection) {
      return;
    }
    for (let i = 0; i < options.infection.infections; i++) {
      const notInfected = this._container.particles.filter(p => {
        const infP = p;
        if (!infP.infection) {
          infP.infection = {};
        }
        return infP.infection.stage === undefined;
      });
      const infected = itemFromArray(notInfected);
      this._container.infecter?.startInfection(infected, 0);
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/infection/dist/esm/ParticlesInfecter.js

class ParticlesInfecter extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {}
  async interact(p1, delta) {
    const infecter = this.container.infecter;
    if (!infecter) {
      return;
    }
    infecter.updateInfection(p1, delta.value);
    if (p1.infection?.stage === undefined) {
      return;
    }
    const container = this.container,
      options = container.actualOptions,
      infectionOptions = options.infection;
    if (!infectionOptions?.enable || infectionOptions.stages.length < 1) {
      return;
    }
    const infectionStage1 = infectionOptions.stages[p1.infection.stage],
      pxRatio = container.retina.pixelRatio,
      radius = p1.getRadius() * 2 + infectionStage1.radius * pxRatio,
      pos = p1.getPosition(),
      infectedStage1 = infectionStage1.infectedStage ?? p1.infection.stage,
      query = container.particles.quadTree.queryCircle(pos, radius),
      infections = infectionStage1.rate,
      neighbors = query.length;
    for (const p2 of query) {
      const infP2 = p2;
      if (infP2 === p1 || infP2.destroyed || infP2.spawning || !(infP2.infection?.stage === undefined || infP2.infection.stage !== p1.infection.stage) || getRandom() >= infections / neighbors) {
        continue;
      }
      if (infP2.infection?.stage === undefined) {
        infecter.startInfection(infP2, infectedStage1);
      } else if (infP2.infection.stage < p1.infection.stage) {
        infecter.updateInfectionStage(infP2, infectedStage1);
      } else if (infP2.infection.stage > p1.infection.stage) {
        const infectionStage2 = infectionOptions.stages[infP2.infection.stage];
        const infectedStage2 = infectionStage2?.infectedStage ?? infP2.infection.stage;
        infecter.updateInfectionStage(p1, infectedStage2);
      }
    }
  }
  isEnabled() {
    return this.container.actualOptions?.infection?.enable ?? false;
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../plugins/infection/dist/esm/index.js



class InfectionPlugin {
  constructor() {
    this.id = "infection";
  }
  getPlugin(container) {
    return new InfectionInstance(container);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }
    let infectionOptions = options.infection;
    if (infectionOptions?.load === undefined) {
      options.infection = infectionOptions = new Infection();
    }
    infectionOptions.load(source?.infection);
  }
  needsPlugin(options) {
    return options?.infection?.enable ?? false;
  }
}
async function loadInfectionPlugin(engine, refresh = true) {
  const plugin = new InfectionPlugin();
  await engine.addPlugin(plugin, refresh);
  await engine.addInteractor("particlesInfection", container => new ParticlesInfecter(container), refresh);
}


;// CONCATENATED MODULE: ../../interactions/light/dist/esm/Options/Classes/LightGradient.js

class LightGradient {
  constructor() {
    this.start = new OptionsColor();
    this.stop = new OptionsColor();
    this.start.value = "#ffffff";
    this.stop.value = "#000000";
  }
  load(data) {
    if (!data) {
      return;
    }
    this.start = OptionsColor.create(this.start, data.start);
    this.stop = OptionsColor.create(this.stop, data.stop);
  }
}
;// CONCATENATED MODULE: ../../interactions/light/dist/esm/Options/Classes/LightArea.js

class LightArea {
  constructor() {
    this.gradient = new LightGradient();
    this.radius = 1000;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.gradient.load(data.gradient);
    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/light/dist/esm/Options/Classes/LightShadow.js

class LightShadow {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#000000";
    this.length = 2000;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.length !== undefined) {
      this.length = data.length;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/light/dist/esm/Options/Classes/Light.js


class Light {
  constructor() {
    this.area = new LightArea();
    this.shadow = new LightShadow();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.area.load(data.area);
    this.shadow.load(data.shadow);
  }
}
;// CONCATENATED MODULE: ../../interactions/light/dist/esm/Utils.js

function drawLight(container, context, mousePos) {
  const lightOptions = container.actualOptions.interactivity.modes.light?.area;
  if (!lightOptions) {
    return;
  }
  context.beginPath();
  context.arc(mousePos.x, mousePos.y, lightOptions.radius, 0, 2 * Math.PI);
  const gradientAmbientLight = context.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, lightOptions.radius);
  const gradientRgb = container.canvas.mouseLight;
  if (!gradientRgb || !gradientRgb.start || !gradientRgb.stop) {
    return;
  }
  gradientAmbientLight.addColorStop(0, getStyleFromRgb(gradientRgb.start));
  gradientAmbientLight.addColorStop(1, getStyleFromRgb(gradientRgb.stop));
  context.fillStyle = gradientAmbientLight;
  context.fill();
}
function drawParticleShadow(container, context, particle, mousePos) {
  const pos = particle.getPosition(),
    shadowOptions = container.actualOptions.interactivity.modes.light?.shadow;
  if (!shadowOptions) {
    return;
  }
  const shadowRgb = particle.lightShadow;
  if (!shadowRgb) {
    return;
  }
  const radius = particle.getRadius(),
    sides = particle.sides,
    full = Math.PI * 2 / sides,
    angle = -particle.rotation + Math.PI / 4,
    factor = 1,
    dots = [];
  for (let i = 0; i < sides; i++) {
    dots.push({
      x: pos.x + radius * Math.sin(angle + full * i) * factor,
      y: pos.y + radius * Math.cos(angle + full * i) * factor
    });
  }
  const points = [],
    shadowLength = shadowOptions.length;
  for (const dot of dots) {
    const dotAngle = Math.atan2(mousePos.y - dot.y, mousePos.x - dot.x),
      end = {
        x: dot.x + shadowLength * Math.sin(-dotAngle - Math.PI / 2),
        y: dot.y + shadowLength * Math.cos(-dotAngle - Math.PI / 2)
      };
    points.push({
      end: end,
      start: dot
    });
  }
  const shadowColor = getStyleFromRgb(shadowRgb),
    last = points.length - 1;
  for (let i = last, n = 0; i >= 0; n = i--) {
    context.beginPath();
    context.moveTo(points[i].start.x, points[i].start.y);
    context.lineTo(points[n].start.x, points[n].start.y);
    context.lineTo(points[n].end.x, points[n].end.y);
    context.lineTo(points[i].end.x, points[i].end.y);
    context.fillStyle = shadowColor;
    context.fill();
  }
}
;// CONCATENATED MODULE: ../../interactions/light/dist/esm/ExternalLighter.js



class ExternalLighter extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {}
  async interact() {
    const container = this.container,
      options = container.actualOptions,
      interactivity = container.interactivity;
    if (!options.interactivity.events.onHover.enable || interactivity.status !== "pointermove") {
      return;
    }
    const mousePos = interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    container.canvas.draw(ctx => {
      drawLight(container, ctx, mousePos);
    });
  }
  isEnabled(particle) {
    const container = this.container,
      mouse = container.interactivity.mouse,
      interactivity = particle?.interactivity ?? container.actualOptions.interactivity,
      events = interactivity.events;
    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }
    const res = isInArray("light", events.onHover.mode);
    if (res && interactivity.modes.light) {
      const lightGradient = interactivity.modes.light.area.gradient;
      container.canvas.mouseLight = {
        start: rangeColorToRgb(lightGradient.start),
        stop: rangeColorToRgb(lightGradient.stop)
      };
    }
    return res;
  }
  loadModeOptions(options, ...sources) {
    if (!options.light) {
      options.light = new Light();
    }
    for (const source of sources) {
      options.light.load(source?.light);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/light/dist/esm/ParticlesLighter.js


class ParticlesLighter extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {}
  async interact(particle) {
    const container = this.container,
      options = container.actualOptions,
      interactivity = container.interactivity;
    if (!options.interactivity.events.onHover.enable || interactivity.status !== "pointermove") {
      return;
    }
    const mousePos = interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    container.canvas.draw(ctx => {
      drawParticleShadow(container, ctx, particle, mousePos);
    });
  }
  isEnabled(particle) {
    const container = this.container,
      interactivity = particle.interactivity ?? container.actualOptions.interactivity,
      mouse = container.interactivity.mouse,
      events = interactivity.events;
    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }
    const res = isInArray("light", events.onHover.mode);
    if (res && interactivity.modes.light) {
      const shadowOptions = interactivity.modes.light.shadow;
      particle.lightShadow = rangeColorToRgb(shadowOptions.color);
    }
    return res;
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/light/dist/esm/index.js


async function loadLightInteraction(engine, refresh = true) {
  await engine.addInteractor("externalLight", container => new ExternalLighter(container), refresh);
  await engine.addInteractor("particlesLight", container => new ParticlesLighter(container), refresh);
}








;// CONCATENATED MODULE: ../../plugins/motion/dist/esm/Options/Classes/MotionReduce.js
class MotionReduce {
  constructor() {
    this.factor = 4;
    this.value = true;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.factor !== undefined) {
      this.factor = data.factor;
    }
    if (data.value !== undefined) {
      this.value = data.value;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/motion/dist/esm/Options/Classes/Motion.js

class Motion {
  constructor() {
    this.disable = false;
    this.reduce = new MotionReduce();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.disable !== undefined) {
      this.disable = data.disable;
    }
    this.reduce.load(data.reduce);
  }
}
;// CONCATENATED MODULE: ../../plugins/motion/dist/esm/MotionInstance.js

class MotionInstance {
  constructor(container, engine) {
    this._handleMotionChange = mediaQuery => {
      const container = this._container,
        motion = container.actualOptions.motion;
      if (!motion) {
        return;
      }
      container.retina.reduceFactor = mediaQuery.matches ? motion.disable ? 0 : motion.reduce.value ? 1 / motion.reduce.factor : 1 : 1;
    };
    this._container = container;
    this._engine = engine;
  }
  async init() {
    const container = this._container,
      options = container.actualOptions.motion;
    if (!(options && (options.disable || options.reduce.value))) {
      container.retina.reduceFactor = 1;
      return;
    }
    const mediaQuery = safeMatchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery) {
      container.retina.reduceFactor = 1;
      return;
    }
    this._handleMotionChange(mediaQuery);
    const handleChange = async () => {
      this._handleMotionChange(mediaQuery);
      try {
        await container.refresh();
      } catch {}
    };
    if (mediaQuery.addEventListener !== undefined) {
      mediaQuery.addEventListener("change", handleChange);
    } else if (mediaQuery.addListener !== undefined) {
      mediaQuery.addListener(handleChange);
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/motion/dist/esm/index.js


class MotionPlugin {
  constructor(engine) {
    this.id = "motion";
    this._engine = engine;
  }
  getPlugin(container) {
    return new MotionInstance(container, this._engine);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin()) {
      return;
    }
    let motionOptions = options.motion;
    if (!motionOptions?.load) {
      options.motion = motionOptions = new Motion();
    }
    motionOptions.load(source?.motion);
  }
  needsPlugin() {
    return true;
  }
}
async function loadMotionPlugin(engine, refresh = true) {
  await engine.addPlugin(new MotionPlugin(engine), refresh);
}
;// CONCATENATED MODULE: ../../shapes/multiline-text/dist/esm/MultilineTextDrawer.js

class MultilineTextDrawer {
  constructor() {
    this._drawLine = (context, line, radius, opacity, index, fill) => {
      const offsetX = line.length * radius / 2,
        pos = {
          x: -offsetX,
          y: radius / 2
        };
      if (fill) {
        context.fillText(line, pos.x, pos.y + radius * 2 * index);
      } else {
        context.strokeText(line, pos.x, pos.y + radius * 2 * index);
      }
    };
  }
  draw(context, particle, radius, opacity) {
    const character = particle.shapeData;
    if (character === undefined) {
      return;
    }
    const textData = character.value;
    if (textData === undefined) {
      return;
    }
    if (particle.text === undefined) {
      particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
    }
    const text = particle.text,
      style = character.style ?? "",
      weight = character.weight ?? "400",
      size = Math.round(radius) * 2,
      font = character.font ?? "Verdana",
      fill = particle.fill;
    context.font = `${style} ${weight} ${size}px "${font}"`;
    const lines = text?.split("\n");
    if (!lines) {
      return;
    }
    context.globalAlpha = opacity;
    for (let i = 0; i < lines.length; i++) {
      this._drawLine(context, lines[i], radius, opacity, i, fill);
    }
    context.globalAlpha = 1;
  }
  async init(container) {
    const options = container.options,
      shapeType = "multiline-text";
    if (isInArray(shapeType, options.particles.shape.type)) {
      const shapeOptions = options.particles.shape.options[shapeType],
        promises = [];
      executeOnSingleOrMultiple(shapeOptions, shape => {
        promises.push(loadFont(shape.font, shape.weight));
      });
      await Promise.all(promises);
    }
  }
  particleInit(container, particle) {
    if (particle.shape !== "multiline-text") {
      return;
    }
    const character = particle.shapeData;
    if (character === undefined) {
      return;
    }
    const textData = character.value;
    if (textData === undefined) {
      return;
    }
    particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
  }
}
;// CONCATENATED MODULE: ../../shapes/multiline-text/dist/esm/index.js

async function loadMultilineTextShape(engine, refresh = true) {
  await engine.addShape("multiline-text", new MultilineTextDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../updaters/orbit/dist/esm/Options/Classes/OrbitRotation.js

class OrbitRotation extends ValueWithRandom {
  constructor() {
    super();
    this.value = 45;
    this.random.enable = false;
    this.random.minimumValue = 0;
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    super.load(data);
  }
}
;// CONCATENATED MODULE: ../../updaters/orbit/dist/esm/Options/Classes/Orbit.js


class Orbit {
  constructor() {
    this.animation = new AnimationOptions();
    this.enable = false;
    this.opacity = 1;
    this.rotation = new OrbitRotation();
    this.width = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.animation.load(data.animation);
    this.rotation.load(data.rotation);
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.opacity !== undefined) {
      this.opacity = setRangeValue(data.opacity);
    }
    if (data.width !== undefined) {
      this.width = setRangeValue(data.width);
    }
    if (data.radius !== undefined) {
      this.radius = setRangeValue(data.radius);
    }
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/orbit/dist/esm/Utils.js

function drawEllipse(context, particle, fillColorValue, radius, opacity, width, rotation, start, end) {
  if (width <= 0) {
    return;
  }
  const pos = particle.getPosition();
  if (fillColorValue) {
    context.strokeStyle = ColorUtils_getStyleFromHsl(fillColorValue, opacity);
  }
  context.lineWidth = width;
  const rotationRadian = rotation * Math.PI / 180;
  context.beginPath();
  context.ellipse(pos.x, pos.y, radius / 2, radius * 2, rotationRadian, start, end);
  context.stroke();
}
;// CONCATENATED MODULE: ../../updaters/orbit/dist/esm/OrbitUpdater.js



class OrbitUpdater {
  constructor(container) {
    this.container = container;
  }
  afterDraw(particle) {
    const orbitOptions = particle.options.orbit;
    if (orbitOptions?.enable) {
      this.drawOrbit(particle, "front");
    }
  }
  beforeDraw(particle) {
    const orbitOptions = particle.options.orbit;
    if (orbitOptions?.enable) {
      this.drawOrbit(particle, "back");
    }
  }
  drawOrbit(particle, type) {
    const container = this.container;
    let start, end;
    switch (type) {
      case "back":
        start = Math.PI / 2;
        end = Math.PI * 3 / 2;
        break;
      case "front":
        start = Math.PI * 3 / 2;
        end = Math.PI / 2;
        break;
      default:
        start = 0;
        end = 2 * Math.PI;
    }
    container.canvas.draw(ctx => {
      drawEllipse(ctx, particle, particle.orbitColor ?? particle.getFillColor(), particle.retina.orbitRadius ?? container.retina.orbitRadius ?? particle.getRadius(), particle.orbitOpacity ?? 1, particle.orbitWidth ?? 1, (particle.orbitRotation ?? 0) * container.retina.pixelRatio, start, end);
    });
  }
  init(particle) {
    const container = this.container,
      particlesOptions = particle.options,
      orbitOptions = particlesOptions.orbit;
    if (!orbitOptions?.enable) {
      return;
    }
    particle.orbitRotation = getRangeValue(orbitOptions.rotation.value);
    particle.orbitColor = rangeColorToHsl(orbitOptions.color);
    particle.retina.orbitRadius = orbitOptions.radius !== undefined ? getRangeValue(orbitOptions.radius) * container.retina.pixelRatio : undefined;
    container.retina.orbitRadius = particle.retina.orbitRadius;
    particle.orbitAnimationSpeed = orbitOptions.animation.enable ? getRangeValue(orbitOptions.animation.speed) : 0;
    particle.orbitWidth = getRangeValue(orbitOptions.width);
    particle.orbitOpacity = getRangeValue(orbitOptions.opacity);
  }
  isEnabled(particle) {
    const orbitAnimations = particle.options.orbit?.animation;
    return !particle.destroyed && !particle.spawning && !!orbitAnimations?.enable;
  }
  loadOptions(options, ...sources) {
    if (!options.orbit) {
      options.orbit = new Orbit();
    }
    for (const source of sources) {
      options.orbit.load(source?.orbit);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    if (particle.orbitRotation === undefined) {
      particle.orbitRotation = 0;
    }
    particle.orbitRotation += (particle.orbitAnimationSpeed ?? 0 / (Math.PI * 2)) * delta.factor;
  }
}
;// CONCATENATED MODULE: ../../updaters/orbit/dist/esm/index.js

async function loadOrbitUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("orbit", container => new OrbitUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../interactions/particles/repulse/dist/esm/Options/Classes/ParticlesRepulse.js

class ParticlesRepulse extends ValueWithRandom {
  constructor() {
    super();
    this.enabled = false;
    this.distance = 1;
    this.duration = 1;
    this.factor = 1;
    this.speed = 1;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.enabled !== undefined) {
      this.enabled = data.enabled;
    }
    if (data.distance !== undefined) {
      this.distance = setRangeValue(data.distance);
    }
    if (data.duration !== undefined) {
      this.duration = setRangeValue(data.duration);
    }
    if (data.factor !== undefined) {
      this.factor = setRangeValue(data.factor);
    }
    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/repulse/dist/esm/Repulser.js


class Repulser_Repulser extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {}
  async interact(p1) {
    const container = this.container;
    if (!p1.repulse) {
      const repulseOpt1 = p1.options.repulse;
      if (!repulseOpt1) {
        return;
      }
      p1.repulse = {
        distance: getRangeValue(repulseOpt1.distance) * container.retina.pixelRatio,
        speed: getRangeValue(repulseOpt1.speed),
        factor: getRangeValue(repulseOpt1.factor)
      };
    }
    const pos1 = p1.getPosition(),
      query = container.particles.quadTree.queryCircle(pos1, p1.repulse.distance);
    for (const p2 of query) {
      if (p1 === p2 || p2.destroyed) {
        continue;
      }
      const pos2 = p2.getPosition();
      const {
        dx,
        dy,
        distance
      } = getDistances(pos2, pos1);
      const velocity = p1.repulse.speed * p1.repulse.factor;
      if (distance > 0) {
        const repulseFactor = clamp((1 - Math.pow(distance / p1.repulse.distance, 2)) * velocity, 0, velocity);
        const normVec = Vector.create(dx / distance * repulseFactor, dy / distance * repulseFactor);
        p2.position.addTo(normVec);
      } else {
        const velocityVec = Vector.create(velocity, velocity);
        p2.position.addTo(velocityVec);
      }
    }
  }
  isEnabled(particle) {
    return particle.options.repulse?.enabled ?? false;
  }
  loadParticlesOptions(options, ...sources) {
    if (!options.repulse) {
      options.repulse = new ParticlesRepulse();
    }
    for (const source of sources) {
      options.repulse.load(source?.repulse);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/particles/repulse/dist/esm/index.js

async function loadParticlesRepulseInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesRepulse", container => new Repulser_Repulser(container), refresh);
}
;// CONCATENATED MODULE: ../../shapes/path/dist/esm/Utils.js
function Utils_drawPath(ctx, radius, path) {
  ctx.moveTo(path.segments[0].values[0].x * radius, path.segments[0].values[0].y * radius);
  for (let i = 0; i < path.segments.length; i++) {
    const segment = path.segments[i];
    switch (segment.type) {
      case "line":
        ctx.lineTo(segment.values[0].x * radius, segment.values[0].y * radius);
        break;
      case "bezier":
        ctx.bezierCurveTo(segment.values[1].x * radius, segment.values[1].y * radius, segment.values[2].x * radius, segment.values[2].y * radius, segment.values[3].x * radius, segment.values[3].y * radius);
        break;
      case "quadratic":
        ctx.quadraticCurveTo(segment.values[1].x * radius, segment.values[1].y * radius, segment.values[2].x * radius, segment.values[2].y * radius);
        break;
      case "arc":
        ctx.arc(segment.values[0].x * radius, segment.values[0].y * radius, segment.values[1].x * radius, segment.values[2].x, segment.values[2].y);
        break;
      case "ellipse":
        ctx.ellipse(segment.values[0].x * radius, segment.values[0].y * radius, segment.values[1].x * radius, segment.values[1].y * radius, segment.values[2].x, segment.values[3].x, segment.values[3].y);
    }
  }
  if (!path.half) {
    return;
  }
  for (let i = path.segments.length - 1; i >= 0; i--) {
    const segment = path.segments[i];
    switch (segment.type) {
      case "line":
        ctx.lineTo(segment.values[0].x * -radius, segment.values[0].y * radius);
        break;
      case "bezier":
        ctx.bezierCurveTo(-segment.values[2].x * radius, segment.values[2].y * radius, -segment.values[1].x * radius, segment.values[1].y * radius, -segment.values[0].x * radius, segment.values[0].y * radius);
        break;
      case "quadratic":
        ctx.quadraticCurveTo(-segment.values[1].x * radius, segment.values[1].y * radius, -segment.values[2].x * radius, segment.values[2].y * radius);
        break;
    }
  }
}
;// CONCATENATED MODULE: ../../shapes/path/dist/esm/PathDrawer.js


class PathDrawer {
  draw(context, particle, radius) {
    if (!particle.pathData) {
      return;
    }
    Utils_drawPath(context, radius, particle.pathData);
  }
  particleInit(container, particle) {
    const shape = particle.shapeData;
    if (!shape) {
      return;
    }
    particle.pathData = deepExtend({}, shape);
  }
}
;// CONCATENATED MODULE: ../../shapes/path/dist/esm/index.js

async function loadPathShape(engine, refresh = true) {
  await engine.addShape("path", new PathDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../paths/perlinNoise/dist/esm/Grad.js
class Grad {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  dot2(x, y) {
    return this.x * x + this.y * y;
  }
  dot3(x, y, z) {
    return this.dot2(x, y) + this.z * z;
  }
}
;// CONCATENATED MODULE: ../../paths/perlinNoise/dist/esm/PerlinNoise.js

const grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0), new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1), new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)];
const p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
const perm = new Array(512);
const gradP = new Array(512);
function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}
class PerlinNoise {
  noise(x, y, z) {
    let X = Math.floor(x),
      Y = Math.floor(y),
      Z = Math.floor(z);
    x = x - X;
    y = y - Y;
    z = z - Z;
    X = X & 255;
    Y = Y & 255;
    Z = Z & 255;
    const n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z),
      n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1),
      n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z),
      n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1),
      n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z),
      n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1),
      n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z),
      n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1),
      u = fade(x),
      v = fade(y),
      w = fade(z);
    return lerp(lerp(lerp(n000, n100, u), lerp(n001, n101, u), w), lerp(lerp(n010, n110, u), lerp(n011, n111, u), w), v);
  }
  seed(inputSeed) {
    let seed = inputSeed;
    if (seed > 0 && seed < 1) {
      seed *= 65536;
    }
    seed = Math.floor(seed);
    if (seed < 256) {
      seed |= seed << 8;
    }
    for (let i = 0; i < 256; i++) {
      const v = i & 1 ? p[i] ^ seed & 255 : p[i] ^ seed >> 8 & 255;
      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  }
}
;// CONCATENATED MODULE: ../../paths/perlinNoise/dist/esm/PerlinNoiseGenerator.js


class PerlinNoiseGenerator {
  constructor() {
    this._calculateField = () => {
      const {
        field,
        noiseGen,
        options
      } = this;
      for (let x = 0; x < options.columns; x++) {
        const column = field[x];
        for (let y = 0; y < options.rows; y++) {
          const cell = column[y];
          cell.length = noiseGen.noise(x / 100 + 40000, y / 100 + 40000, this.noiseZ);
          cell.angle = noiseGen.noise(x / 50, y / 50, this.noiseZ) * Math.PI * 2;
        }
      }
    };
    this._drawField = ctx => {
      const {
        field,
        options
      } = this;
      for (let x = 0; x < options.columns; x++) {
        const column = field[x];
        for (let y = 0; y < options.rows; y++) {
          const cell = column[y],
            {
              angle,
              length
            } = cell;
          ctx.setTransform(1, 0, 0, 1, x * this.options.size, y * this.options.size);
          ctx.rotate(angle);
          ctx.strokeStyle = "white";
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, this.options.size * length);
          ctx.stroke();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      }
    };
    this._initField = () => {
      const {
        columns,
        rows
      } = this.options;
      this.field = new Array(columns);
      for (let x = 0; x < columns; x++) {
        this.field[x] = new Array(rows);
        for (let y = 0; y < rows; y++) {
          this.field[x][y] = Vector.origin;
        }
      }
    };
    this._resetField = container => {
      const sourceOptions = container.actualOptions.particles.move.path.options,
        {
          options
        } = this;
      options.size = sourceOptions.size > 0 ? sourceOptions.size : 20;
      options.increment = sourceOptions.increment > 0 ? sourceOptions.increment : 0.004;
      options.draw = !!sourceOptions.draw;
      options.width = container.canvas.size.width;
      options.height = container.canvas.size.height;
      this.noiseGen.seed(sourceOptions.seed ?? getRandom());
      options.columns = Math.floor(this.options.width / this.options.size) + 1;
      options.rows = Math.floor(this.options.height / this.options.size) + 1;
      this._initField();
    };
    this._setup = container => {
      this.noiseZ = 0;
      this._resetField(container);
      window.addEventListener("resize", () => this._resetField(container));
    };
    this.noiseGen = new PerlinNoise();
    this.field = [];
    this.noiseZ = 0;
    this.options = {
      draw: false,
      size: 20,
      increment: 0.004,
      columns: 0,
      rows: 0,
      width: 0,
      height: 0
    };
  }
  generate(particle) {
    const pos = particle.getPosition(),
      {
        size
      } = this.options,
      point = {
        x: Math.max(Math.floor(pos.x / size), 0),
        y: Math.max(Math.floor(pos.y / size), 0)
      },
      {
        field
      } = this;
    return !field || !field[point.x] || !field[point.x][point.y] ? Vector.origin : field[point.x][point.y].copy();
  }
  init(container) {
    this.container = container;
    this._setup(container);
  }
  reset() {}
  update() {
    if (!this.container) {
      return;
    }
    this._calculateField();
    this.noiseZ += this.options.increment;
    if (this.options.draw) {
      this.container.canvas.draw(ctx => this._drawField(ctx));
    }
  }
}
;// CONCATENATED MODULE: ../../paths/perlinNoise/dist/esm/index.js

const perlinNoisePathName = "perlinNoise";
async function loadPerlinNoisePath(engine, refresh = true) {
  await engine.addPathGenerator(perlinNoisePathName, new PerlinNoiseGenerator(), refresh);
}
// EXTERNAL MODULE: ../../plugins/polygonMask/dist/esm/pathseg.js
var pathseg = __webpack_require__(442);
;// CONCATENATED MODULE: ../../plugins/polygonMask/dist/esm/Options/Classes/PolygonMaskDrawStroke.js

class PolygonMaskDrawStroke {
  constructor() {
    this.color = new OptionsColor();
    this.width = 0.5;
    this.opacity = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (isString(this.color.value)) {
      this.opacity = stringToAlpha(this.color.value) ?? this.opacity;
    }
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
    if (data.width !== undefined) {
      this.width = data.width;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/polygonMask/dist/esm/Options/Classes/PolygonMaskDraw.js


class PolygonMaskDraw {
  constructor() {
    this.enable = false;
    this.stroke = new PolygonMaskDrawStroke();
  }
  get lineColor() {
    return this.stroke.color;
  }
  set lineColor(value) {
    this.stroke.color = OptionsColor.create(this.stroke.color, value);
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
;// CONCATENATED MODULE: ../../plugins/polygonMask/dist/esm/Options/Classes/PolygonMaskInline.js
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
;// CONCATENATED MODULE: ../../plugins/polygonMask/dist/esm/Options/Classes/PolygonMaskLocalSvg.js
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
;// CONCATENATED MODULE: ../../plugins/polygonMask/dist/esm/Options/Classes/PolygonMaskMove.js
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
;// CONCATENATED MODULE: ../../plugins/polygonMask/dist/esm/Options/Classes/PolygonMask.js





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
      if (isString(data.data)) {
        this.data = data.data;
      } else {
        this.data = new PolygonMaskLocalSvg();
        this.data.load(data.data);
      }
    }
    if (data.position !== undefined) {
      this.position = deepExtend({}, data.position);
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/polygonMask/dist/esm/utils.js

function drawPolygonMask(context, rawData, stroke) {
  const color = rangeColorToRgb(stroke.color);
  if (!color) {
    return;
  }
  context.beginPath();
  context.moveTo(rawData[0].x, rawData[0].y);
  for (const item of rawData) {
    context.lineTo(item.x, item.y);
  }
  context.closePath();
  context.strokeStyle = getStyleFromRgb(color);
  context.lineWidth = stroke.width;
  context.stroke();
}
function drawPolygonMaskPath(context, path, stroke, position) {
  context.setTransform(1, 0, 0, 1, position.x, position.y);
  const color = rangeColorToRgb(stroke.color);
  if (!color) {
    return;
  }
  context.strokeStyle = getStyleFromRgb(color, stroke.opacity);
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
    } = getDistances(pos, s1),
    {
      dx: dx2,
      dy: dy2
    } = getDistances(s2, s1),
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
    } = getDistances(start, stop),
    wallAngle = Math.atan2(dy, dx),
    wallNormal = Vector.create(Math.sin(wallAngle), -Math.cos(wallAngle)),
    d = 2 * (velocity.x * wallNormal.x + velocity.y * wallNormal.y);
  wallNormal.multTo(d);
  velocity.subFrom(wallNormal);
}
;// CONCATENATED MODULE: ../../plugins/polygonMask/dist/esm/PolygonMaskInstance.js


const noPolygonDataLoaded = `${errorPrefix} No polygon data loaded.`,
  noPolygonFound = `${errorPrefix} No polygon found, you need to specify SVG url in config.`;
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
        x = position?.x ?? getRandom() * canvasSize.width,
        y = position?.y ?? getRandom() * canvasSize.height;
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
        throw new Error(`${errorPrefix} occurred during polygon mask download`);
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
      const coords = itemFromArray(this.raw);
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
      const path = itemFromArray(this.paths),
        distance = Math.floor(getRandom() * path.length) + 1,
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
        if (isString(data)) {
          svg = data;
        } else {
          const getPath = p => `<path d="${p}" />`,
            path = isArray(data.path) ? data.path.map(getPath).join("") : getPath(data.path);
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
          const dist = getDistances(pos, closest);
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
        const dist = getDistance(particle.initialPosition, particle.getPosition()),
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
          x: getRandom() * canvasSize.width,
          y: getRandom() * canvasSize.height
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
    return deepExtend({}, position ? position : this._randomPoint());
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
;// CONCATENATED MODULE: ../../plugins/polygonMask/dist/esm/index.js



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



;// CONCATENATED MODULE: ../../paths/polygon/dist/esm/PolygonPathGenerator.js

class PolygonPathGenerator {
  constructor() {
    this._createDirs = () => {
      this.dirsList = [];
      for (let i = 0; i < 360; i += 360 / this.options.sides) {
        const angle = this.options.angle + i;
        this.dirsList.push(Vector.create(Math.cos(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180)));
      }
    };
    this.dirsList = [];
    this.options = {
      sides: 6,
      turnSteps: 20,
      angle: 30
    };
  }
  generate(p) {
    const {
      sides
    } = this.options;
    if (p.hexStep === undefined) {
      p.hexStep = 0;
    }
    if (p.hexDirection === undefined) {
      p.hexDirection = sides === 6 ? (getRandom() * 3 | 0) * 2 : getRandom() * sides | 0;
    }
    if (p.hexSpeed === undefined) {
      p.hexSpeed = p.velocity.length;
    }
    if (p.hexStep % this.options.turnSteps === 0) {
      p.hexDirection = getRandom() > 0.5 ? (p.hexDirection + 1) % sides : (p.hexDirection + sides - 1) % sides;
    }
    p.velocity.x = 0;
    p.velocity.y = 0;
    p.hexStep++;
    const direction = this.dirsList[p.hexDirection];
    return Vector.create(direction.x * p.hexSpeed, direction.y * p.hexSpeed);
  }
  init(container) {
    const options = container.actualOptions.particles.move.path.options;
    this.options.sides = options.sides > 0 ? options.sides : 6;
    this.options.angle = options.angle ?? 30;
    this.options.turnSteps = options.turnSteps >= 0 ? options.turnSteps : 20;
    this._createDirs();
  }
  reset(particle) {
    delete particle.hexStep;
    delete particle.hexDirection;
    delete particle.hexSpeed;
  }
  update() {}
}
;// CONCATENATED MODULE: ../../paths/polygon/dist/esm/index.js

const polygonPathName = "polygonPathGenerator";
async function loadPolygonPath(engine, refresh = true) {
  await engine.addPathGenerator(polygonPathName, new PolygonPathGenerator(), refresh);
}
;// CONCATENATED MODULE: ../../shapes/rounded-polygon/dist/esm/RoundedPolygonDrawer.js

function polygon(sides, radius, rot = 0) {
  const step = Math.PI * 2 / sides,
    path = [];
  for (let i = 0; i < sides; i++) {
    path.push({
      x: Math.cos(i * step + rot) * radius,
      y: Math.sin(i * step + rot) * radius
    });
  }
  return path;
}
function roundedPath(context, path, radius) {
  let p1 = path[0],
    p2 = path[1];
  const len = path.length;
  context.moveTo((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
  for (let i = 1; i <= len; i++) {
    p1 = p2;
    p2 = path[(i + 1) % len];
    context.arcTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2, radius);
  }
}
class RoundedPolygonDrawer {
  draw(context, particle, radius) {
    roundedPath(context, polygon(particle.sides, radius), particle.borderRadius ?? 5);
  }
  getSidesCount(particle) {
    const roundedPolygon = particle.shapeData;
    return Math.round(getRangeValue(roundedPolygon?.sides ?? 5));
  }
  particleInit(container, particle) {
    const shapeData = particle.shapeData;
    particle.borderRadius = Math.round(getRangeValue(shapeData?.radius ?? 5)) * container.retina.pixelRatio;
  }
}
;// CONCATENATED MODULE: ../../shapes/rounded-polygon/dist/esm/index.js

async function loadRoundedPolygonShape(engine, refresh = true) {
  await engine.addShape("rounded-polygon", new RoundedPolygonDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../shapes/rounded-rect/dist/esm/RoundedRectDrawer.js

const RoundedRectDrawer_fixFactor = Math.sqrt(2),
  drawRoundedRect = (ctx, info, radius = {
    topRight: 4,
    bottomRight: 4,
    bottomLeft: 4,
    topLeft: 4
  }) => {
    const {
        x,
        y,
        width,
        height
      } = info,
      r = x + width,
      b = y + height;
    ctx.moveTo(x + radius.topLeft, y);
    ctx.lineTo(r - radius.topRight, y);
    ctx.quadraticCurveTo(r, y, r, y + radius.topRight);
    ctx.lineTo(r, y + height - radius.bottomRight);
    ctx.quadraticCurveTo(r, b, r - radius.bottomRight, b);
    ctx.lineTo(x + radius.bottomLeft, b);
    ctx.quadraticCurveTo(x, b, x, b - radius.bottomLeft);
    ctx.lineTo(x, y + radius.topLeft);
    ctx.quadraticCurveTo(x, y, x + radius.topLeft, y);
  };
class RoundedRectDrawer {
  draw(context, particle, radius) {
    const fixedRadius = radius / RoundedRectDrawer_fixFactor,
      fixedDiameter = fixedRadius * 2,
      borderRadius = particle.borderRadius ?? 5;
    if ("roundRect" in context) {
      context.roundRect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter, borderRadius);
    } else {
      drawRoundedRect(context, {
        x: -fixedRadius,
        y: -fixedRadius,
        height: fixedDiameter,
        width: fixedDiameter
      }, {
        topLeft: borderRadius,
        topRight: borderRadius,
        bottomLeft: borderRadius,
        bottomRight: borderRadius
      });
    }
  }
  particleInit(container, particle) {
    const shapeData = particle.shapeData;
    particle.borderRadius = getRangeValue(shapeData?.radius ?? 5) * container.retina.pixelRatio;
  }
}
;// CONCATENATED MODULE: ../../shapes/rounded-rect/dist/esm/index.js

async function loadRoundedRectShape(engine, refresh = true) {
  await engine.addShape("rounded-rect", new RoundedRectDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../paths/svg/dist/esm/SVGPathGenerator.js

class SVGPathGenerator {
  constructor() {
    this._paths = [];
    this._reverse = false;
    this._size = {
      width: 0,
      height: 0
    };
    this._scale = 1;
    this._offset = {
      x: 0,
      y: 0,
      mode: "percent"
    };
    this._width = 0;
  }
  generate(particle, delta) {
    const container = particle.container,
      pxRatio = container.retina.pixelRatio;
    if (particle.svgDirection === undefined) {
      particle.svgDirection = getRandom() > 0.5 ? 0 : 1;
    }
    if (particle.svgPathIndex === undefined) {
      particle.svgPathIndex = Math.floor(Math.random() * this._paths.length);
    }
    if (particle.svgSpeed === undefined) {
      particle.svgSpeed = particle.velocity.mult((particle.retina.moveSpeed ?? 1) / 2).length;
    }
    if (particle.svgStep === undefined) {
      particle.svgStep = randomInRange({
        min: 0,
        max: this._paths[particle.svgPathIndex].length
      }) * pxRatio;
    }
    if (particle.svgOffset === undefined) {
      particle.svgOffset = {
        width: randomInRange({
          min: -this._width / 2,
          max: this._width / 2
        }) * pxRatio,
        height: randomInRange({
          min: -this._width / 2,
          max: this._width / 2
        }) * pxRatio
      };
    }
    if (particle.svgInitialPosition === undefined) {
      particle.svgInitialPosition = {
        ...particle.position
      };
    }
    particle.velocity.x = 0;
    particle.velocity.y = 0;
    if (particle.svgDirection === 0) {
      particle.svgStep += particle.svgSpeed * delta.factor;
    } else {
      particle.svgStep -= particle.svgSpeed * delta.factor;
    }
    let path = this._paths[particle.svgPathIndex];
    if (path) {
      const pathLength = path.length;
      if (particle.svgStep >= pathLength) {
        particle.svgPathIndex = particle.svgPathIndex + 1;
        if (particle.svgPathIndex >= this._paths.length) {
          if (this._reverse) {
            particle.svgPathIndex = this._paths.length - 1;
            particle.svgDirection = 1;
          } else {
            particle.svgPathIndex = 0;
            particle.svgStep = 0;
          }
        }
      } else if (particle.svgStep <= 0) {
        particle.svgPathIndex = particle.svgPathIndex - 1;
        if (particle.svgPathIndex < 0) {
          if (this._reverse) {
            particle.svgPathIndex = 0;
            particle.svgDirection = 0;
          } else {
            particle.svgPathIndex = this._paths.length - 1;
            path = this._paths[particle.svgPathIndex];
            particle.svgStep = path.length;
          }
        }
      }
      path = this._paths[particle.svgPathIndex];
    }
    if (path) {
      const pathElement = path.element,
        pos = pathElement.getPointAtLength(particle.svgStep),
        canvasSize = particle.container.canvas.size,
        offset = getPosition(this._offset, canvasSize),
        scale = this._scale * pxRatio;
      particle.position.x = (pos.x - this._size.width / 2) * scale + particle.svgInitialPosition.x + offset.x + particle.svgOffset.width;
      particle.position.y = (pos.y - this._size.height / 2) * scale + particle.svgInitialPosition.y + offset.y + particle.svgOffset.height;
    }
    return Vector.origin;
  }
  init(container) {
    const options = container.actualOptions.particles.move.path.options,
      position = options.position ?? this._offset;
    this._reverse = options.reverse ?? this._reverse;
    this._scale = options.scale ?? 1;
    this._offset.x = position.x;
    this._offset.y = position.y;
    this._offset.mode = position.mode;
    this._width = options.width ?? 0;
    if (options.url && !options.path) {
      const url = options.url;
      (async () => {
        const response = await fetch(url),
          data = await response.text();
        const parser = new DOMParser(),
          doc = parser.parseFromString(data, "image/svg+xml"),
          svg = doc.getElementsByTagName("svg")[0];
        let svgPaths = svg.getElementsByTagName("path");
        if (!svgPaths.length) {
          svgPaths = doc.getElementsByTagName("path");
        }
        this._paths = [];
        for (let i = 0; i < svgPaths.length; i++) {
          const path = svgPaths.item(i);
          if (path) {
            this._paths.push({
              element: path,
              length: path.getTotalLength()
            });
          }
        }
        this._size.height = parseFloat(svg.getAttribute("height") ?? "0");
        this._size.width = parseFloat(svg.getAttribute("width") ?? "0");
      })();
    } else if (options.path) {
      const path = options.path;
      this._paths = [];
      for (const item of path.data) {
        const element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        element.setAttribute("d", item);
        this._paths.push({
          element,
          length: element.getTotalLength()
        });
      }
      this._size.height = path.size.height;
      this._size.width = path.size.width;
    }
  }
  reset() {}
  update() {}
}
;// CONCATENATED MODULE: ../../paths/svg/dist/esm/index.js

const svgPathName = "svgPathGenerator";
async function loadSVGPath(engine, refresh = true) {
  await engine.addPathGenerator(svgPathName, new SVGPathGenerator(), refresh);
}
;// CONCATENATED MODULE: ../../paths/simplexNoise/dist/esm/simplex.js
function shuffleSeed(seed) {
  const newSeed = new Uint32Array(1);
  newSeed[0] = seed[0] * 1664525 + 1013904223;
  return newSeed;
}
const NORM_4D = 1.0 / 30.0;
const SQUISH_4D = (Math.sqrt(4 + 1) - 1) / 4;
const STRETCH_4D = (1 / Math.sqrt(4 + 1) - 1) / 4;
function contribution4D(multiplier, xsb, ysb, zsb, wsb) {
  return {
    dx: -xsb - multiplier * SQUISH_4D,
    dy: -ysb - multiplier * SQUISH_4D,
    dz: -zsb - multiplier * SQUISH_4D,
    dw: -wsb - multiplier * SQUISH_4D,
    xsb,
    ysb,
    zsb,
    wsb
  };
}
function makeNoise4D(clientSeed) {
  const contributions = [];
  for (let i = 0; i < p4D.length; i += 16) {
    const baseSet = base4D[p4D[i]];
    let previous = null,
      current = null;
    for (let k = 0; k < baseSet.length; k += 5) {
      current = contribution4D(baseSet[k], baseSet[k + 1], baseSet[k + 2], baseSet[k + 3], baseSet[k + 4]);
      if (previous === null) {
        contributions[i / 16] = current;
      } else {
        previous.next = current;
      }
      previous = current;
    }
    if (current) {
      current.next = contribution4D(p4D[i + 1], p4D[i + 2], p4D[i + 3], p4D[i + 4], p4D[i + 5]);
      current.next.next = contribution4D(p4D[i + 6], p4D[i + 7], p4D[i + 8], p4D[i + 9], p4D[i + 10]);
      current.next.next.next = contribution4D(p4D[i + 11], p4D[i + 12], p4D[i + 13], p4D[i + 14], p4D[i + 15]);
    }
  }
  const lookup = [];
  for (let i = 0; i < lookupPairs4D.length; i += 2) {
    lookup[lookupPairs4D[i]] = contributions[lookupPairs4D[i + 1]];
  }
  const perm = new Uint8Array(256),
    perm4D = new Uint8Array(256),
    source = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    source[i] = i;
  }
  let seed = new Uint32Array(1);
  seed[0] = clientSeed;
  seed = shuffleSeed(shuffleSeed(shuffleSeed(seed)));
  for (let i = 255; i >= 0; i--) {
    seed = shuffleSeed(seed);
    const r = new Uint32Array(1);
    r[0] = (seed[0] + 31) % (i + 1);
    if (r[0] < 0) {
      r[0] += i + 1;
    }
    perm[i] = source[r[0]];
    perm4D[i] = perm[i] & 0xfc;
    source[r[0]] = source[i];
  }
  return (x, y, z, w) => {
    const stretchOffset = (x + y + z + w) * STRETCH_4D,
      xs = x + stretchOffset,
      ys = y + stretchOffset,
      zs = z + stretchOffset,
      ws = w + stretchOffset,
      xsb = Math.floor(xs),
      ysb = Math.floor(ys),
      zsb = Math.floor(zs),
      wsb = Math.floor(ws),
      squishOffset = (xsb + ysb + zsb + wsb) * SQUISH_4D,
      dx0 = x - (xsb + squishOffset),
      dy0 = y - (ysb + squishOffset),
      dz0 = z - (zsb + squishOffset),
      dw0 = w - (wsb + squishOffset),
      xins = xs - xsb,
      yins = ys - ysb,
      zins = zs - zsb,
      wins = ws - wsb,
      inSum = xins + yins + zins + wins,
      hash = zins - wins + 1 | yins - zins + 1 << 1 | yins - wins + 1 << 2 | xins - yins + 1 << 3 | xins - zins + 1 << 4 | xins - wins + 1 << 5 | inSum << 6 | inSum + wins << 8 | inSum + zins << 11 | inSum + yins << 14 | inSum + xins << 17;
    let value = 0;
    for (let c = lookup[hash]; c !== undefined; c = c.next) {
      const dx = dx0 + c.dx,
        dy = dy0 + c.dy,
        dz = dz0 + c.dz,
        dw = dw0 + c.dw,
        attn = 2 - dx * dx - dy * dy - dz * dz - dw * dw;
      if (attn > 0) {
        const px = xsb + c.xsb,
          py = ysb + c.ysb,
          pz = zsb + c.zsb,
          pw = wsb + c.wsb,
          indexPartA = perm[px & 0xff],
          indexPartB = perm[indexPartA + py & 0xff],
          indexPartC = perm[indexPartB + pz & 0xff],
          index = perm4D[indexPartC + pw & 0xff],
          valuePart = gradients4D[index] * dx + gradients4D[index + 1] * dy + gradients4D[index + 2] * dz + gradients4D[index + 3] * dw;
        value += attn * attn * attn * attn * valuePart;
      }
    }
    return value * NORM_4D;
  };
}
const base4D = [[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1], [3, 1, 1, 1, 0, 3, 1, 1, 0, 1, 3, 1, 0, 1, 1, 3, 0, 1, 1, 1, 4, 1, 1, 1, 1], [1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 2, 1, 1, 0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 0, 1, 2, 0, 1, 1, 0, 2, 0, 1, 0, 1, 2, 0, 0, 1, 1], [3, 1, 1, 1, 0, 3, 1, 1, 0, 1, 3, 1, 0, 1, 1, 3, 0, 1, 1, 1, 2, 1, 1, 0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 0, 1, 2, 0, 1, 1, 0, 2, 0, 1, 0, 1, 2, 0, 0, 1, 1]],
  gradients4D = [3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, -3, 1, 1, 1, -1, 3, 1, 1, -1, 1, 3, 1, -1, 1, 1, 3, 3, -1, 1, 1, 1, -3, 1, 1, 1, -1, 3, 1, 1, -1, 1, 3, -3, -1, 1, 1, -1, -3, 1, 1, -1, -1, 3, 1, -1, -1, 1, 3, 3, 1, -1, 1, 1, 3, -1, 1, 1, 1, -3, 1, 1, 1, -1, 3, -3, 1, -1, 1, -1, 3, -1, 1, -1, 1, -3, 1, -1, 1, -1, 3, 3, -1, -1, 1, 1, -3, -1, 1, 1, -1, -3, 1, 1, -1, -1, 3, -3, -1, -1, 1, -1, -3, -1, 1, -1, -1, -3, 1, -1, -1, -1, 3, 3, 1, 1, -1, 1, 3, 1, -1, 1, 1, 3, -1, 1, 1, 1, -3, -3, 1, 1, -1, -1, 3, 1, -1, -1, 1, 3, -1, -1, 1, 1, -3, 3, -1, 1, -1, 1, -3, 1, -1, 1, -1, 3, -1, 1, -1, 1, -3, -3, -1, 1, -1, -1, -3, 1, -1, -1, -1, 3, -1, -1, -1, 1, -3, 3, 1, -1, -1, 1, 3, -1, -1, 1, 1, -3, -1, 1, 1, -1, -3, -3, 1, -1, -1, -1, 3, -1, -1, -1, 1, -3, -1, -1, 1, -1, -3, 3, -1, -1, -1, 1, -3, -1, -1, 1, -1, -3, -1, 1, -1, -1, -3, -3, -1, -1, -1, -1, -3, -1, -1, -1, -1, -3, -1, -1, -1, -1, -3],
  lookupPairs4D = [0, 3, 1, 2, 2, 3, 5, 2, 6, 1, 7, 1, 8, 3, 9, 2, 10, 3, 13, 2, 16, 3, 18, 3, 22, 1, 23, 1, 24, 3, 26, 3, 33, 2, 37, 2, 38, 1, 39, 1, 41, 2, 45, 2, 54, 1, 55, 1, 56, 0, 57, 0, 58, 0, 59, 0, 60, 0, 61, 0, 62, 0, 63, 0, 256, 3, 258, 3, 264, 3, 266, 3, 272, 3, 274, 3, 280, 3, 282, 3, 2049, 2, 2053, 2, 2057, 2, 2061, 2, 2081, 2, 2085, 2, 2089, 2, 2093, 2, 2304, 9, 2305, 9, 2312, 9, 2313, 9, 16390, 1, 16391, 1, 16406, 1, 16407, 1, 16422, 1, 16423, 1, 16438, 1, 16439, 1, 16642, 8, 16646, 8, 16658, 8, 16662, 8, 18437, 6, 18439, 6, 18469, 6, 18471, 6, 18688, 9, 18689, 9, 18690, 8, 18693, 6, 18694, 8, 18695, 6, 18696, 9, 18697, 9, 18706, 8, 18710, 8, 18725, 6, 18727, 6, 131128, 0, 131129, 0, 131130, 0, 131131, 0, 131132, 0, 131133, 0, 131134, 0, 131135, 0, 131352, 7, 131354, 7, 131384, 7, 131386, 7, 133161, 5, 133165, 5, 133177, 5, 133181, 5, 133376, 9, 133377, 9, 133384, 9, 133385, 9, 133400, 7, 133402, 7, 133417, 5, 133421, 5, 133432, 7, 133433, 5, 133434, 7, 133437, 5, 147510, 4, 147511, 4, 147518, 4, 147519, 4, 147714, 8, 147718, 8, 147730, 8, 147734, 8, 147736, 7, 147738, 7, 147766, 4, 147767, 4, 147768, 7, 147770, 7, 147774, 4, 147775, 4, 149509, 6, 149511, 6, 149541, 6, 149543, 6, 149545, 5, 149549, 5, 149558, 4, 149559, 4, 149561, 5, 149565, 5, 149566, 4, 149567, 4, 149760, 9, 149761, 9, 149762, 8, 149765, 6, 149766, 8, 149767, 6, 149768, 9, 149769, 9, 149778, 8, 149782, 8, 149784, 7, 149786, 7, 149797, 6, 149799, 6, 149801, 5, 149805, 5, 149814, 4, 149815, 4, 149816, 7, 149817, 5, 149818, 7, 149821, 5, 149822, 4, 149823, 4, 149824, 37, 149825, 37, 149826, 36, 149829, 34, 149830, 36, 149831, 34, 149832, 37, 149833, 37, 149842, 36, 149846, 36, 149848, 35, 149850, 35, 149861, 34, 149863, 34, 149865, 33, 149869, 33, 149878, 32, 149879, 32, 149880, 35, 149881, 33, 149882, 35, 149885, 33, 149886, 32, 149887, 32, 150080, 49, 150082, 48, 150088, 49, 150098, 48, 150104, 47, 150106, 47, 151873, 46, 151877, 45, 151881, 46, 151909, 45, 151913, 44, 151917, 44, 152128, 49, 152129, 46, 152136, 49, 152137, 46, 166214, 43, 166215, 42, 166230, 43, 166247, 42, 166262, 41, 166263, 41, 166466, 48, 166470, 43, 166482, 48, 166486, 43, 168261, 45, 168263, 42, 168293, 45, 168295, 42, 168512, 31, 168513, 28, 168514, 31, 168517, 28, 168518, 25, 168519, 25, 280952, 40, 280953, 39, 280954, 40, 280957, 39, 280958, 38, 280959, 38, 281176, 47, 281178, 47, 281208, 40, 281210, 40, 282985, 44, 282989, 44, 283001, 39, 283005, 39, 283208, 30, 283209, 27, 283224, 30, 283241, 27, 283256, 22, 283257, 22, 297334, 41, 297335, 41, 297342, 38, 297343, 38, 297554, 29, 297558, 24, 297562, 29, 297590, 24, 297594, 21, 297598, 21, 299365, 26, 299367, 23, 299373, 26, 299383, 23, 299389, 20, 299391, 20, 299584, 31, 299585, 28, 299586, 31, 299589, 28, 299590, 25, 299591, 25, 299592, 30, 299593, 27, 299602, 29, 299606, 24, 299608, 30, 299610, 29, 299621, 26, 299623, 23, 299625, 27, 299629, 26, 299638, 24, 299639, 23, 299640, 22, 299641, 22, 299642, 21, 299645, 20, 299646, 21, 299647, 20, 299648, 61, 299649, 60, 299650, 61, 299653, 60, 299654, 59, 299655, 59, 299656, 58, 299657, 57, 299666, 55, 299670, 54, 299672, 58, 299674, 55, 299685, 52, 299687, 51, 299689, 57, 299693, 52, 299702, 54, 299703, 51, 299704, 56, 299705, 56, 299706, 53, 299709, 50, 299710, 53, 299711, 50, 299904, 61, 299906, 61, 299912, 58, 299922, 55, 299928, 58, 299930, 55, 301697, 60, 301701, 60, 301705, 57, 301733, 52, 301737, 57, 301741, 52, 301952, 79, 301953, 79, 301960, 76, 301961, 76, 316038, 59, 316039, 59, 316054, 54, 316071, 51, 316086, 54, 316087, 51, 316290, 78, 316294, 78, 316306, 73, 316310, 73, 318085, 77, 318087, 77, 318117, 70, 318119, 70, 318336, 79, 318337, 79, 318338, 78, 318341, 77, 318342, 78, 318343, 77, 430776, 56, 430777, 56, 430778, 53, 430781, 50, 430782, 53, 430783, 50, 431000, 75, 431002, 72, 431032, 75, 431034, 72, 432809, 74, 432813, 69, 432825, 74, 432829, 69, 433032, 76, 433033, 76, 433048, 75, 433065, 74, 433080, 75, 433081, 74, 447158, 71, 447159, 68, 447166, 71, 447167, 68, 447378, 73, 447382, 73, 447386, 72, 447414, 71, 447418, 72, 447422, 71, 449189, 70, 449191, 70, 449197, 69, 449207, 68, 449213, 69, 449215, 68, 449408, 67, 449409, 67, 449410, 66, 449413, 64, 449414, 66, 449415, 64, 449416, 67, 449417, 67, 449426, 66, 449430, 66, 449432, 65, 449434, 65, 449445, 64, 449447, 64, 449449, 63, 449453, 63, 449462, 62, 449463, 62, 449464, 65, 449465, 63, 449466, 65, 449469, 63, 449470, 62, 449471, 62, 449472, 19, 449473, 19, 449474, 18, 449477, 16, 449478, 18, 449479, 16, 449480, 19, 449481, 19, 449490, 18, 449494, 18, 449496, 17, 449498, 17, 449509, 16, 449511, 16, 449513, 15, 449517, 15, 449526, 14, 449527, 14, 449528, 17, 449529, 15, 449530, 17, 449533, 15, 449534, 14, 449535, 14, 449728, 19, 449729, 19, 449730, 18, 449734, 18, 449736, 19, 449737, 19, 449746, 18, 449750, 18, 449752, 17, 449754, 17, 449784, 17, 449786, 17, 451520, 19, 451521, 19, 451525, 16, 451527, 16, 451528, 19, 451529, 19, 451557, 16, 451559, 16, 451561, 15, 451565, 15, 451577, 15, 451581, 15, 451776, 19, 451777, 19, 451784, 19, 451785, 19, 465858, 18, 465861, 16, 465862, 18, 465863, 16, 465874, 18, 465878, 18, 465893, 16, 465895, 16, 465910, 14, 465911, 14, 465918, 14, 465919, 14, 466114, 18, 466118, 18, 466130, 18, 466134, 18, 467909, 16, 467911, 16, 467941, 16, 467943, 16, 468160, 13, 468161, 13, 468162, 13, 468163, 13, 468164, 13, 468165, 13, 468166, 13, 468167, 13, 580568, 17, 580570, 17, 580585, 15, 580589, 15, 580598, 14, 580599, 14, 580600, 17, 580601, 15, 580602, 17, 580605, 15, 580606, 14, 580607, 14, 580824, 17, 580826, 17, 580856, 17, 580858, 17, 582633, 15, 582637, 15, 582649, 15, 582653, 15, 582856, 12, 582857, 12, 582872, 12, 582873, 12, 582888, 12, 582889, 12, 582904, 12, 582905, 12, 596982, 14, 596983, 14, 596990, 14, 596991, 14, 597202, 11, 597206, 11, 597210, 11, 597214, 11, 597234, 11, 597238, 11, 597242, 11, 597246, 11, 599013, 10, 599015, 10, 599021, 10, 599023, 10, 599029, 10, 599031, 10, 599037, 10, 599039, 10, 599232, 13, 599233, 13, 599234, 13, 599235, 13, 599236, 13, 599237, 13, 599238, 13, 599239, 13, 599240, 12, 599241, 12, 599250, 11, 599254, 11, 599256, 12, 599257, 12, 599258, 11, 599262, 11, 599269, 10, 599271, 10, 599272, 12, 599273, 12, 599277, 10, 599279, 10, 599282, 11, 599285, 10, 599286, 11, 599287, 10, 599288, 12, 599289, 12, 599290, 11, 599293, 10, 599294, 11, 599295, 10],
  p4D = [0, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, -1, 0, 0, -1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 2, 1, 1, 0, 0, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 0, 2, 1, 0, 1, 0, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 0, 2, 0, 1, 1, 0, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1, 0, 2, 1, 0, 0, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 0, 2, 0, 1, 0, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 0, 2, 0, 0, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 1, 4, 2, 1, 1, 0, 4, 1, 2, 1, 0, 4, 1, 1, 2, 0, 1, 4, 2, 1, 0, 1, 4, 1, 2, 0, 1, 4, 1, 1, 0, 2, 1, 4, 2, 0, 1, 1, 4, 1, 0, 2, 1, 4, 1, 0, 1, 2, 1, 4, 0, 2, 1, 1, 4, 0, 1, 2, 1, 4, 0, 1, 1, 2, 1, 2, 1, 1, 0, 0, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 1, 2, 1, 0, 1, 0, 3, 2, 0, 1, 0, 3, 1, 0, 2, 0, 1, 2, 0, 1, 1, 0, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0, 1, 2, 1, 0, 0, 1, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 1, 2, 0, 1, 0, 1, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 1, 2, 0, 0, 1, 1, 3, 0, 0, 2, 1, 3, 0, 0, 1, 2, 2, 3, 1, 1, 1, 0, 2, 1, 1, 1, -1, 2, 2, 0, 0, 0, 2, 3, 1, 1, 0, 1, 2, 1, 1, -1, 1, 2, 2, 0, 0, 0, 2, 3, 1, 0, 1, 1, 2, 1, -1, 1, 1, 2, 2, 0, 0, 0, 2, 3, 1, 1, 1, 0, 2, 1, 1, 1, -1, 2, 0, 2, 0, 0, 2, 3, 1, 1, 0, 1, 2, 1, 1, -1, 1, 2, 0, 2, 0, 0, 2, 3, 0, 1, 1, 1, 2, -1, 1, 1, 1, 2, 0, 2, 0, 0, 2, 3, 1, 1, 1, 0, 2, 1, 1, 1, -1, 2, 0, 0, 2, 0, 2, 3, 1, 0, 1, 1, 2, 1, -1, 1, 1, 2, 0, 0, 2, 0, 2, 3, 0, 1, 1, 1, 2, -1, 1, 1, 1, 2, 0, 0, 2, 0, 2, 3, 1, 1, 0, 1, 2, 1, 1, -1, 1, 2, 0, 0, 0, 2, 2, 3, 1, 0, 1, 1, 2, 1, -1, 1, 1, 2, 0, 0, 0, 2, 2, 3, 0, 1, 1, 1, 2, -1, 1, 1, 1, 2, 0, 0, 0, 2, 2, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 0, 0, 0, 0, 0, 2, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 0, 0, 0, 0, 0, 2, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1, 0, 0, 0, 0, 0, 2, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 0, 0, 0, 0, 0, 2, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 0, 0, 0, 0, 0, 2, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 0, 0, 0, 0, 0, 2, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 2, 2, 0, 0, 0, 2, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 2, 2, 0, 0, 0, 2, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 2, 2, 0, 0, 0, 2, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 2, 0, 2, 0, 0, 2, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1, 2, 0, 2, 0, 0, 2, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 2, 0, 2, 0, 0, 2, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 2, 0, 0, 2, 0, 2, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1, 2, 0, 0, 2, 0, 2, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 2, 0, 0, 2, 0, 2, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 2, 0, 0, 0, 2, 2, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 2, 0, 0, 0, 2, 2, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 2, 0, 0, 0, 2, 3, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 1, 1, 1, -1, 3, 1, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, 1, 1, 1, -1, 3, 1, 0, 0, 1, 0, 2, 0, 0, 2, 0, 2, 1, 1, 1, -1, 3, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 1, 1, -1, 1, 3, 1, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, 1, 1, -1, 1, 3, 1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 2, 1, 1, -1, 1, 3, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 1, -1, 1, 1, 3, 1, 0, 0, 1, 0, 2, 0, 0, 2, 0, 2, 1, -1, 1, 1, 3, 1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 2, 1, -1, 1, 1, 3, 1, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, -1, 1, 1, 1, 3, 1, 0, 0, 1, 0, 2, 0, 0, 2, 0, 2, -1, 1, 1, 1, 3, 1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 2, -1, 1, 1, 1, 3, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 4, 1, 1, 1, 1, 3, 3, 2, 0, 1, 0, 3, 1, 0, 2, 0, 4, 1, 1, 1, 1, 3, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0, 4, 1, 1, 1, 1, 3, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 4, 1, 1, 1, 1, 3, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 4, 1, 1, 1, 1, 3, 3, 0, 0, 2, 1, 3, 0, 0, 1, 2, 4, 1, 1, 1, 1, 3, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 2, 1, 1, 1, -1, 3, 3, 2, 0, 1, 0, 3, 1, 0, 2, 0, 2, 1, 1, 1, -1, 3, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0, 2, 1, 1, 1, -1, 3, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 2, 1, 1, -1, 1, 3, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 2, 1, 1, -1, 1, 3, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 2, 1, 1, -1, 1, 3, 3, 2, 0, 1, 0, 3, 1, 0, 2, 0, 2, 1, -1, 1, 1, 3, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 2, 1, -1, 1, 1, 3, 3, 0, 0, 2, 1, 3, 0, 0, 1, 2, 2, 1, -1, 1, 1, 3, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0, 2, -1, 1, 1, 1, 3, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 2, -1, 1, 1, 1, 3, 3, 0, 0, 2, 1, 3, 0, 0, 1, 2, 2, -1, 1, 1, 1];
;// CONCATENATED MODULE: ../../paths/simplexNoise/dist/esm/SimplexNoiseGenerator.js


class SimplexNoiseGenerator {
  constructor() {
    this._calculateField = () => {
      for (let x = 0; x < this.options.columns; x++) {
        for (let y = 0; y < this.options.rows; y++) {
          for (let z = 0; z < this.options.layers; z++) {
            this.field[x][y][z][0] = this.noiseFunc(x / 50, y / 50, z / 50, this.noiseW) * Math.PI * 2;
            this.field[x][y][z][1] = this.noiseFunc(x / 100 + 40000, y / 100 + 40000, z / 100 + 40000, this.noiseW);
          }
        }
      }
    };
    this._initField = () => {
      this.field = new Array(this.options.columns);
      for (let x = 0; x < this.options.columns; x++) {
        this.field[x] = new Array(this.options.rows);
        for (let y = 0; y < this.options.rows; y++) {
          this.field[x][y] = new Array(this.options.layers);
          for (let z = 0; z < this.options.layers; z++) {
            this.field[x][y][z] = [0, 0];
          }
        }
      }
    };
    this._resetField = container => {
      const sourceOptions = container.actualOptions.particles.move.path.options;
      this.options.size = sourceOptions.size > 0 ? sourceOptions.size : 20;
      this.options.increment = sourceOptions.increment > 0 ? sourceOptions.increment : 0.004;
      this.options.width = container.canvas.size.width;
      this.options.height = container.canvas.size.height;
      this.noiseFunc = makeNoise4D(sourceOptions.seed ?? getRandom());
      this.options.columns = Math.floor(this.options.width / this.options.size) + 1;
      this.options.rows = Math.floor(this.options.height / this.options.size) + 1;
      this.options.layers = Math.floor(container.zLayers / this.options.size) + 1;
      this._initField();
    };
    this._setup = container => {
      this.noiseW = 0;
      this._resetField(container);
      addEventListener("resize", () => this._resetField(container));
    };
    this.field = [];
    this.noiseFunc = makeNoise4D(getRandom());
    this.noiseW = 0;
    this.options = {
      size: 20,
      increment: 0.004,
      columns: 0,
      rows: 0,
      layers: 0,
      width: 0,
      height: 0
    };
  }
  generate(particle) {
    const pos = particle.getPosition(),
      point = {
        x: Math.max(Math.floor(pos.x / this.options.size), 0),
        y: Math.max(Math.floor(pos.y / this.options.size), 0),
        z: Math.max(Math.floor(pos.z / this.options.size), 0)
      },
      v = Vector.origin;
    if (!this.field || !this.field[point.x] || !this.field[point.x][point.y] || !this.field[point.x][point.y][point.z]) {
      return v;
    }
    v.length = this.field[point.x][point.y][point.z][1];
    v.angle = this.field[point.x][point.y][point.z][0];
    return v;
  }
  init(container) {
    this.container = container;
    this._setup(this.container);
  }
  reset() {}
  update() {
    if (!this.container) {
      return;
    }
    this._calculateField();
    this.noiseW += this.options.increment;
  }
}
;// CONCATENATED MODULE: ../../paths/simplexNoise/dist/esm/index.js

const simplexNoisePathName = "simplexNoise";
async function loadSimplexNoisePath(engine, refresh = true) {
  await engine.addPathGenerator(simplexNoisePathName, new SimplexNoiseGenerator(), refresh);
}
;// CONCATENATED MODULE: ../../plugins/sounds/dist/esm/Options/Classes/SoundsAudio.js

class SoundsAudio {
  constructor() {
    this.loop = false;
    this.source = "";
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (isObject(data)) {
      if (data.loop !== undefined) {
        this.loop = data.loop;
      }
      if (data.source !== undefined) {
        this.source = data.source;
      }
    } else {
      this.source = data;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/sounds/dist/esm/Options/Classes/SoundsNote.js
class SoundsNote {
  constructor() {
    this.duration = 500;
    this.value = [];
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.duration !== undefined) {
      this.duration = data.duration;
    }
    if (data.value !== undefined) {
      this.value = data.value;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/sounds/dist/esm/Options/Classes/SoundsMelody.js

class SoundsMelody {
  constructor() {
    this.loop = false;
    this.melodies = [];
    this.notes = [];
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (data.loop !== undefined) {
      this.loop = data.loop;
    }
    if (data.melodies !== undefined) {
      this.melodies = data.melodies.map(s => {
        const tmp = new SoundsMelody();
        tmp.load(s);
        return tmp;
      });
    }
    if (data.notes !== undefined) {
      this.notes = data.notes.map(s => {
        const tmp = new SoundsNote();
        tmp.load(s);
        return tmp;
      });
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/sounds/dist/esm/Options/Classes/SoundsEvent.js




class SoundsEvent {
  constructor() {
    this.event = [];
    this.notes = [];
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.event !== undefined) {
      this.event = data.event;
    }
    if (data.audio !== undefined) {
      if (isArray(data.audio)) {
        this.audio = data.audio.map(s => {
          const tmp = new SoundsAudio();
          tmp.load(s);
          return tmp;
        });
      } else {
        this.audio = new SoundsAudio();
        this.audio.load(data.audio);
      }
    }
    if (data.notes !== undefined) {
      this.notes = data.notes.map(t => {
        const tmp = new SoundsNote();
        tmp.load(t);
        return tmp;
      });
    }
    if (data.melodies !== undefined) {
      this.melodies = data.melodies.map(t => {
        const tmp = new SoundsMelody();
        tmp.load(t);
        return tmp;
      });
    }
    if (data.filter !== undefined) {
      if (isString(data.filter)) {
        if (isFunction(window[data.filter])) {
          this.filter = window[data.filter];
        }
      } else {
        this.filter = data.filter;
      }
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/sounds/dist/esm/Options/Classes/SoundsIcon.js
class SoundsIcon {
  constructor() {
    this.width = 24;
    this.height = 24;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.path !== undefined) {
      this.path = data.path;
    }
    if (data.svg !== undefined) {
      this.svg = data.svg;
    }
    if (data.width !== undefined) {
      this.width = data.width;
    }
    if (data.height !== undefined) {
      this.height = data.height;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/sounds/dist/esm/Options/Classes/SoundsIcons.js

class SoundsIcons {
  constructor() {
    this.mute = new SoundsIcon();
    this.unmute = new SoundsIcon();
    this.volumeDown = new SoundsIcon();
    this.volumeUp = new SoundsIcon();
    this.mute.svg = `<?xml version="1.0"?>
<svg baseProfile="tiny" height="24px" version="1.2" viewBox="0 0 24 24" width="24px"
    xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Layer_1">
        <path fill="#fff" d="M19.707,5.293c-0.391-0.391-1.023-0.391-1.414,0l-1.551,1.551c-0.345-0.688-0.987-1.02-1.604-1.02c-0.449,0-0.905,0.152-1.356,0.453l-2.672,1.781C10.357,8.561,8.904,9,8,9c-1.654,0-3,1.346-3,3v2c0,1.237,0.754,2.302,1.826,2.76l-1.533,1.533c-0.391,0.391-0.391,1.023,0,1.414C5.488,19.902,5.744,20,6,20s0.512-0.098,0.707-0.293l2.527-2.527c0.697,0.174,1.416,0.455,1.875,0.762l2.672,1.781c0.451,0.301,0.907,0.453,1.356,0.453C16.035,20.176,17,19.495,17,18V9.414l2.707-2.707C20.098,6.316,20.098,5.684,19.707,5.293z M14.891,7.941c0.038-0.025,0.073-0.046,0.104-0.062C14.998,7.914,15,7.954,15,8v1.293l-2,2V9.202L14.891,7.941z M7,12c0-0.552,0.448-1,1-1c1.211,0,2.907-0.495,4-1.146v2.439l-2.83,2.83C8.757,15.046,8.356,15,8,15c-0.552,0-1-0.448-1-1V12z M10.301,15.406L12,13.707v2.439C11.519,15.859,10.925,15.604,10.301,15.406z M14.994,18.12c-0.03-0.016-0.065-0.036-0.104-0.062L13,16.798v-4.091l2-2V18C15,18.046,14.998,18.086,14.994,18.12z"/>
    </g>
</svg>`;
    this.unmute.svg = `<?xml version="1.0"?>
<svg baseProfile="tiny" height="24px" version="1.2" viewBox="0 0 24 24" width="24px"
    xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Layer_1">
        <path fill="#fff" d="M17.138,5.824c-0.449,0-0.905,0.152-1.356,0.453l-2.672,1.781C12.357,8.561,10.904,9,10,9c-1.654,0-3,1.346-3,3v2c0,1.654,1.346,3,3,3c0.904,0,2.357,0.439,3.109,0.941l2.672,1.781c0.451,0.301,0.907,0.453,1.356,0.453C18.035,20.176,19,19.495,19,18V8C19,6.505,18.035,5.824,17.138,5.824z M14,16.146C12.907,15.495,11.211,15,10,15c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1c1.211,0,2.907-0.495,4-1.146V16.146z M17,18c0,0.046-0.002,0.086-0.006,0.12c-0.03-0.016-0.065-0.036-0.104-0.062L15,16.798V9.202l1.891-1.261c0.038-0.025,0.073-0.046,0.104-0.062C16.998,7.914,17,7.954,17,8V18z"/>
    </g>
</svg>`;
    this.volumeDown.svg = `<?xml version="1.0"?>
<svg baseProfile="tiny" height="24px" version="1.2" viewBox="0 0 24 24" width="24px"
    xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Layer_1">
        <path fill="#fff" d="M15.138,5.824c-0.449,0-0.905,0.152-1.356,0.453l-2.672,1.781C10.357,8.561,8.904,9,8,9c-1.654,0-3,1.346-3,3v2c0,1.654,1.346,3,3,3c0.904,0,2.357,0.439,3.109,0.941l2.672,1.781c0.451,0.301,0.907,0.453,1.356,0.453C16.035,20.176,17,19.495,17,18V8C17,6.505,16.035,5.824,15.138,5.824z M8,15c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1c1.211,0,2.907-0.495,4-1.146v6.293C10.907,15.495,9.211,15,8,15z M15,18c0,0.046-0.002,0.086-0.006,0.12c-0.03-0.016-0.065-0.036-0.104-0.062L13,16.798V9.202l1.891-1.261c0.038-0.025,0.073-0.046,0.104-0.062C14.998,7.914,15,7.954,15,8V18z"/>
        <path fill="#fff" d="M18.292,10.294c-0.39,0.391-0.39,1.023,0.002,1.414c0.345,0.345,0.535,0.803,0.535,1.291c0,0.489-0.19,0.948-0.536,1.294c-0.391,0.39-0.391,1.023,0,1.414C18.488,15.902,18.744,16,19,16s0.512-0.098,0.707-0.293c0.724-0.723,1.122-1.685,1.122-2.708s-0.398-1.984-1.123-2.707C19.317,9.903,18.683,9.901,18.292,10.294z"/>
    </g>
</svg>`;
    this.volumeUp.svg = `<?xml version="1.0"?>
<svg baseProfile="tiny" height="24px" version="1.2" viewBox="0 0 24 24" width="24px"
    xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Layer_1">
        <path fill="#fff" d="M16.706,10.292c-0.389-0.389-1.023-0.391-1.414,0.002c-0.39,0.391-0.39,1.023,0.002,1.414c0.345,0.345,0.535,0.803,0.535,1.291c0,0.489-0.19,0.948-0.536,1.294c-0.391,0.39-0.391,1.023,0,1.414C15.488,15.902,15.744,16,16,16s0.512-0.098,0.707-0.293c0.724-0.723,1.122-1.685,1.122-2.708S17.431,11.015,16.706,10.292z"/>
        <path fill="#fff" d="M18.706,8.292c-0.391-0.389-1.023-0.39-1.414,0.002c-0.39,0.391-0.39,1.024,0.002,1.414c0.879,0.877,1.363,2.044,1.364,3.287c0.001,1.246-0.484,2.417-1.365,3.298c-0.391,0.391-0.391,1.023,0,1.414C17.488,17.902,17.744,18,18,18s0.512-0.098,0.707-0.293c1.259-1.259,1.952-2.933,1.951-4.713C20.657,11.217,19.964,9.547,18.706,8.292z"/>
        <path fill="#fff" d="M20.706,6.292c-0.391-0.389-1.023-0.39-1.414,0.002c-0.39,0.391-0.39,1.024,0.002,1.414c1.412,1.409,2.191,3.285,2.192,5.284c0.002,2.002-0.777,3.885-2.193,5.301c-0.391,0.391-0.391,1.023,0,1.414C19.488,19.902,19.744,20,20,20s0.512-0.098,0.707-0.293c1.794-1.794,2.781-4.18,2.779-6.717C23.485,10.457,22.497,8.078,20.706,6.292z"/>
        <path fill="#fff" d="M12.138,5.824c-0.449,0-0.905,0.152-1.356,0.453L8.109,8.059C7.357,8.561,5.904,9,5,9c-1.654,0-3,1.346-3,3v2c0,1.654,1.346,3,3,3c0.904,0,2.357,0.439,3.109,0.941l2.672,1.781c0.451,0.301,0.907,0.453,1.356,0.453C13.035,20.176,14,19.495,14,18V8C14,6.505,13.035,5.824,12.138,5.824z M5,15c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1c1.211,0,2.907-0.495,4-1.146v6.293C7.907,15.495,6.211,15,5,15z M12,18c0,0.046-0.002,0.086-0.006,0.12c-0.03-0.016-0.065-0.036-0.104-0.062L10,16.798V9.202l1.891-1.261c0.038-0.025,0.073-0.046,0.104-0.062C11.998,7.914,12,7.954,12,8V18z"/>
    </g>
</svg>`;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.mute.load(data.mute);
    this.unmute.load(data.unmute);
    this.volumeDown.load(data.volumeDown);
    this.volumeUp.load(data.volumeUp);
  }
}
;// CONCATENATED MODULE: ../../plugins/sounds/dist/esm/Options/Classes/SoundsVolume.js

class SoundsVolume {
  constructor() {
    this.value = 100;
    this.max = 100;
    this.min = 0;
    this.step = 10;
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (isObject(data)) {
      if (data.max !== undefined) {
        this.max = data.max;
      }
      if (data.min !== undefined) {
        this.min = data.min;
      }
      if (data.step !== undefined) {
        this.step = data.step;
      }
      if (data.value !== undefined) {
        this.value = data.value;
      }
    } else {
      this.value = data;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/sounds/dist/esm/Options/Classes/Sounds.js



class Sounds {
  constructor() {
    this.enable = false;
    this.events = [];
    this.icons = new SoundsIcons();
    this.volume = new SoundsVolume();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.events !== undefined) {
      this.events = data.events.map(t => {
        const event = new SoundsEvent();
        event.load(t);
        return event;
      });
    }
    this.icons.load(data.icons);
    if (data.volume !== undefined) {
      this.volume.load(data.volume);
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/sounds/dist/esm/utils.js
const notes = new Map();
notes.set("C", [16.35, 32.7, 65.41, 130.81, 261.63, 523.25, 1046.5, 2093.0, 4186.01]);
notes.set("Db", [17.32, 34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92]);
notes.set("D", [18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.63]);
notes.set("Eb", [19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03]);
notes.set("E", [20.6, 41.2, 82.41, 164.81, 329.63, 659.25, 1318.51, 2637.02, 5274.04]);
notes.set("F", [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83, 5587.65]);
notes.set("Gb", [23.12, 46.25, 92.5, 185.0, 369.99, 739.99, 1479.98, 2959.96, 5919.91]);
notes.set("G", [24.5, 49.0, 98.0, 196.0, 392.0, 783.99, 1567.98, 3135.96, 6271.93]);
notes.set("Ab", [25.96, 51.91, 103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44, 6644.88]);
notes.set("A", [27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3520.0, 7040.0]);
notes.set("Bb", [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31, 7458.62]);
notes.set("B", [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07, 7902.13]);
notes.set("pause", [0]);
function getNoteFrequency(note) {
  const regex = /(([A-G]b?)(\d))|pause/i,
    result = regex.exec(note);
  if (!result || !result.length) {
    return;
  }
  const noteKey = result[2] || result[0],
    noteItem = notes.get(noteKey);
  if (!noteItem) {
    return;
  }
  return noteItem[parseInt(result[3] || "0")];
}
;// CONCATENATED MODULE: ../../plugins/sounds/dist/esm/SoundsInstance.js


function initImage(data) {
  const img = document.createElement("img"),
    {
      clickCb,
      container,
      display,
      iconOptions,
      margin,
      options,
      pos,
      rightOffsets
    } = data,
    {
      width,
      path,
      svg
    } = iconOptions;
  setIconStyle(img, pos.top + margin, pos.right - (margin * (rightOffsets.length + 1) + width + rightOffsets.reduce((a, b) => a + b, 0)), display, options.fullScreen.zIndex + 1, width, margin);
  img.src = path ?? (svg ? `data:image/svg+xml;base64,${btoa(svg)}` : "");
  const parent = container.canvas.element?.parentNode || document.body;
  parent.append(img);
  img.addEventListener("click", clickCb);
  return img;
}
function removeImage(image) {
  if (!image) {
    return;
  }
  image.remove();
}
function setIconStyle(icon, top, left, display, zIndex, width, margin) {
  icon.style.userSelect = "none";
  icon.style.webkitUserSelect = "none";
  icon.style.position = "absolute";
  icon.style.top = `${top + margin}px`;
  icon.style.left = `${left - margin - width}px`;
  icon.style.display = display;
  icon.style.zIndex = `${zIndex + 1}`;
}
class SoundsInstance {
  constructor(container, engine) {
    this._addBuffer = audioCtx => {
      const buffer = audioCtx.createBufferSource();
      this._audioSources.push(buffer);
      return buffer;
    };
    this._addOscillator = audioCtx => {
      const oscillator = audioCtx.createOscillator();
      this._audioSources.push(oscillator);
      return oscillator;
    };
    this._initEvents = () => {
      const container = this._container,
        soundsOptions = container.actualOptions.sounds;
      if (!soundsOptions?.enable || !container.canvas.element) {
        return;
      }
      for (const event of soundsOptions.events) {
        const cb = async args => {
          if (this._container !== args.container) {
            return;
          }
          if (!this._container || this._container.muted || this._container.destroyed) {
            executeOnSingleOrMultiple(event.event, item => {
              this._engine.removeEventListener(item, cb);
            });
            return;
          }
          if (event.filter && !event.filter(args)) {
            return;
          }
          if (event.audio) {
            this._playBuffer(itemFromSingleOrMultiple(event.audio));
          } else if (event.melodies) {
            const melody = itemFromArray(event.melodies);
            if (melody.melodies.length) {
              await Promise.allSettled(melody.melodies.map(m => this._playNote(m.notes, 0, melody.loop)));
            } else {
              await this._playNote(melody.notes, 0, melody.loop);
            }
          } else if (event.notes) {
            const note = itemFromArray(event.notes);
            await this._playNote([note], 0, false);
          }
        };
        executeOnSingleOrMultiple(event.event, item => {
          this._engine.addEventListener(item, cb);
        });
      }
    };
    this._mute = () => {
      const container = this._container;
      if (!container.audioContext) {
        return;
      }
      for (const source of this._audioSources) {
        this._removeAudioSource(source);
      }
      if (this._gain) {
        this._gain.disconnect();
      }
      container.audioContext.close();
      container.audioContext = undefined;
      this._engine.dispatchEvent("soundsMuted", {
        container: this._container
      });
    };
    this._playBuffer = audio => {
      const audioBuffer = this._audioMap.get(audio.source);
      if (!audioBuffer) {
        return;
      }
      const audioCtx = this._container.audioContext;
      if (!audioCtx) {
        return;
      }
      const source = this._addBuffer(audioCtx);
      source.loop = audio.loop;
      source.buffer = audioBuffer;
      source.connect(this._gain ?? audioCtx.destination);
      source.start();
    };
    this._playFrequency = async (frequency, duration) => {
      if (!this._container.audioContext || !this._gain) {
        return;
      }
      const oscillator = this._addOscillator(this._container.audioContext);
      oscillator.connect(this._gain);
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.start();
      return new Promise(resolve => {
        setTimeout(() => {
          this._removeAudioSource(oscillator);
          resolve();
        }, duration);
      });
    };
    this._playMuteSound = () => {
      const container = this._container;
      if (!container.audioContext) {
        return;
      }
      const gain = container.audioContext.createGain();
      gain.connect(container.audioContext.destination);
      gain.gain.value = 0;
      const oscillator = container.audioContext.createOscillator();
      oscillator.connect(gain);
      oscillator.type = "sine";
      oscillator.frequency.value = 1;
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        oscillator.disconnect();
        gain.disconnect();
      });
    };
    this._playNote = async (notes, noteIdx, loop) => {
      if (this._container.muted) {
        return;
      }
      const note = notes[noteIdx];
      if (!note) {
        return;
      }
      const value = note.value;
      const promises = executeOnSingleOrMultiple(value, async (_, idx) => {
        return this._playNoteValue(notes, noteIdx, idx);
      });
      await (isArray(promises) ? Promise.allSettled(promises) : promises);
      let nextNoteIdx = noteIdx + 1;
      if (loop && nextNoteIdx >= notes.length) {
        nextNoteIdx = nextNoteIdx % notes.length;
      }
      if (this._container.muted) {
        return;
      }
      await this._playNote(notes, nextNoteIdx, loop);
    };
    this._playNoteValue = async (notes, noteIdx, valueIdx) => {
      const note = notes[noteIdx];
      if (!note) {
        return;
      }
      const value = itemFromSingleOrMultiple(note.value, valueIdx, true);
      try {
        const freq = getNoteFrequency(value);
        if (!isNumber(freq)) {
          return;
        }
        await this._playFrequency(freq, note.duration);
      } catch (e) {
        getLogger().error(e);
      }
    };
    this._removeAudioSource = source => {
      source.stop();
      source.disconnect();
      this._audioSources.splice(this._audioSources.indexOf(source), 1);
    };
    this._unmute = () => {
      const container = this._container,
        options = container.actualOptions,
        soundsOptions = options.sounds;
      if (!soundsOptions) {
        return;
      }
      if (!container.audioContext) {
        container.audioContext = new AudioContext();
      }
      const {
        audioContext
      } = container;
      if (!this._audioSources) {
        this._audioSources = [];
      }
      const gain = audioContext.createGain();
      gain.connect(audioContext.destination);
      gain.gain.value = soundsOptions.volume.value / 100;
      this._gain = gain;
      this._initEvents();
      this._engine.dispatchEvent("soundsUnmuted", {
        container: this._container
      });
    };
    this._updateMuteIcons = () => {
      const container = this._container,
        muteImg = this._muteImg,
        unmuteImg = this._unmuteImg;
      if (muteImg) {
        muteImg.style.display = container.muted ? "block" : "none";
      }
      if (unmuteImg) {
        unmuteImg.style.display = container.muted ? "none" : "block";
      }
    };
    this._updateMuteStatus = () => {
      const container = this._container;
      if (container.muted) {
        this._mute();
      } else {
        this._unmute();
        this._playMuteSound();
      }
    };
    this._updateVolume = () => {
      const container = this._container,
        soundsOptions = container.actualOptions.sounds;
      if (!soundsOptions?.enable) {
        return;
      }
      clamp(this._volume, soundsOptions.volume.min, soundsOptions.volume.max);
      let stateChanged = false;
      if (this._volume <= 0 && !container.muted) {
        this._volume = 0;
        container.muted = true;
        stateChanged = true;
      } else if (this._volume > 0 && container.muted) {
        container.muted = false;
        stateChanged = true;
      }
      if (stateChanged) {
        this._updateMuteIcons();
        this._updateMuteStatus();
      }
      if (this._gain?.gain) {
        this._gain.gain.value = this._volume / 100;
      }
    };
    this._container = container;
    this._engine = engine;
    this._volume = 0;
    this._audioSources = [];
    this._audioMap = new Map();
  }
  async init() {
    const container = this._container,
      options = container.actualOptions,
      soundsOptions = options.sounds;
    if (!soundsOptions?.enable) {
      return;
    }
    this._volume = soundsOptions.volume.value;
    const events = soundsOptions.events;
    this._audioMap = new Map();
    for (const event of events) {
      if (!event.audio) {
        continue;
      }
      executeOnSingleOrMultiple(event.audio, async audio => {
        const response = await fetch(audio.source);
        if (!response.ok) {
          return;
        }
        const arrayBuffer = await response.arrayBuffer();
        container.audioContext = new AudioContext();
        const audioBuffer = await container.audioContext.decodeAudioData(arrayBuffer);
        this._audioMap.set(audio.source, audioBuffer);
      });
    }
  }
  async start() {
    const container = this._container,
      options = container.actualOptions,
      soundsOptions = options.sounds;
    if (!soundsOptions?.enable || !container.canvas.element) {
      return;
    }
    container.muted = true;
    const canvas = container.canvas.element,
      pos = {
        top: canvas.offsetTop,
        right: canvas.offsetLeft + canvas.offsetWidth
      },
      {
        mute,
        unmute,
        volumeDown,
        volumeUp
      } = soundsOptions.icons,
      margin = 10;
    const toggleMute = () => {
      container.muted = !container.muted;
      this._updateMuteIcons();
      this._updateMuteStatus();
    };
    this._muteImg = initImage({
      container,
      options,
      pos,
      display: "block",
      iconOptions: mute,
      margin,
      rightOffsets: [volumeDown.width, volumeUp.width],
      clickCb: toggleMute
    });
    this._unmuteImg = initImage({
      container,
      options,
      pos,
      display: "none",
      iconOptions: unmute,
      margin,
      rightOffsets: [volumeDown.width, volumeUp.width],
      clickCb: toggleMute
    });
    this._volumeDownImg = initImage({
      container,
      options,
      pos,
      display: "block",
      iconOptions: volumeDown,
      margin,
      rightOffsets: [volumeUp.width],
      clickCb: () => {
        if (container.muted) {
          this._volume = 0;
        }
        this._volume -= soundsOptions.volume.step;
        this._updateVolume();
      }
    });
    this._volumeUpImg = initImage({
      container,
      options,
      pos,
      display: "block",
      iconOptions: volumeUp,
      margin,
      rightOffsets: [],
      clickCb: () => {
        if (container.muted) {
          this._volume = 0;
        }
        this._volume += soundsOptions.volume.step;
        this._updateVolume();
      }
    });
  }
  stop() {
    this._container.muted = true;
    this._mute();
    removeImage(this._muteImg);
    removeImage(this._unmuteImg);
    removeImage(this._volumeDownImg);
    removeImage(this._volumeUpImg);
  }
}
;// CONCATENATED MODULE: ../../plugins/sounds/dist/esm/index.js


class SoundsPlugin {
  constructor(engine) {
    this.id = "sounds";
    this._engine = engine;
  }
  getPlugin(container) {
    return new SoundsInstance(container, this._engine);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }
    let soundsOptions = options.sounds;
    if (soundsOptions?.load === undefined) {
      options.sounds = soundsOptions = new Sounds();
    }
    soundsOptions.load(source?.sounds);
  }
  needsPlugin(options) {
    return options?.sounds?.enable ?? false;
  }
}
async function loadSoundsPlugin(engine, refresh = true) {
  await engine.addPlugin(new SoundsPlugin(engine), refresh);
}
;// CONCATENATED MODULE: ../../shapes/spiral/dist/esm/SpiralDrawer.js

class SpiralDrawer {
  draw(context, particle, radius) {
    if (particle.spiralInnerRadius === undefined || particle.spiralLineSpacing === undefined || particle.spiralWidthFactor === undefined) {
      return;
    }
    const realWidth = (radius - particle.spiralInnerRadius) / particle.spiralLineSpacing,
      widthFactor = 10;
    for (let i = 0; i < realWidth * widthFactor; i++) {
      const angle = i / widthFactor,
        factor = particle.spiralInnerRadius + particle.spiralLineSpacing * angle,
        pos = {
          x: factor * Math.cos(angle),
          y: factor * Math.sin(angle)
        };
      context.lineTo(pos.x, pos.y);
    }
  }
  particleInit(container, particle) {
    const pixelRatio = container.retina.pixelRatio,
      shapeData = particle.shapeData;
    particle.spiralInnerRadius = getRangeValue(shapeData.innerRadius ?? 1) * pixelRatio;
    particle.spiralLineSpacing = getRangeValue(shapeData.lineSpacing ?? 1) * pixelRatio;
    particle.spiralWidthFactor = getRangeValue(shapeData.widthFactor ?? 10);
  }
}
;// CONCATENATED MODULE: ../../shapes/spiral/dist/esm/index.js

async function loadSpiralShape(engine, refresh = true) {
  await engine.addShape("spiral", new SpiralDrawer(), refresh);
}
;// CONCATENATED MODULE: ./dist/browser/index.js




































async function loadAll(engine, refresh = true) {
  await loadFull(engine, false);
  await loadHsvColorPlugin();
  await loadEasingBackPlugin();
  await loadEasingCircPlugin();
  await loadEasingCubicPlugin();
  await loadEasingExpoPlugin();
  await loadEasingQuartPlugin();
  await loadEasingQuintPlugin();
  await loadEasingSinePlugin();
  await loadHsvColorPlugin();
  await loadCanvasMaskPlugin(engine, false);
  await loadInfectionPlugin(engine, false);
  await loadMotionPlugin(engine, false);
  await loadPolygonMaskPlugin(engine, false);
  await loadSoundsPlugin(engine, false);
  await loadExportImagePlugin(engine, false);
  await loadExportJSONPlugin(engine, false);
  await loadExportVideoPlugin(engine, false);
  await loadLightInteraction(engine, false);
  await loadParticlesRepulseInteraction(engine, false);
  await loadGradientUpdater(engine, false);
  await loadOrbitUpdater(engine, false);
  await loadCurvesPath(engine, false);
  await loadPerlinNoisePath(engine, false);
  await loadPolygonPath(engine, false);
  await loadSVGPath(engine, false);
  await loadSimplexNoisePath(engine, false);
  await loadArrowShape(engine, false);
  await loadBubbleShape(engine, false);
  await loadCardsShape(engine, false);
  await loadCogShape(engine, false);
  await loadHeartShape(engine, false);
  await loadMultilineTextShape(engine, false);
  await loadPathShape(engine, false);
  await loadRoundedPolygonShape(engine, false);
  await loadRoundedRectShape(engine, false);
  await loadSpiralShape(engine, false);
  await engine.refresh(refresh);
}
;// CONCATENATED MODULE: ./dist/browser/bundle.js


loadAll(tsParticles);


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});