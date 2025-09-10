/*!
 * PixiJS - v8.13.2
 * Compiled Wed, 10 Sep 2025 07:43:26 UTC
 *
 * PixiJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
var math_extras_js = (function (exports) {
    'use strict';

    "use strict";

    const pointExtraMixins = {
      add(other, outPoint) {
        if (!outPoint) {
          outPoint = new PIXI.Point();
        }
        outPoint.x = this.x + other.x;
        outPoint.y = this.y + other.y;
        return outPoint;
      },
      subtract(other, outPoint) {
        if (!outPoint) {
          outPoint = new PIXI.Point();
        }
        outPoint.x = this.x - other.x;
        outPoint.y = this.y - other.y;
        return outPoint;
      },
      multiply(other, outPoint) {
        if (!outPoint) {
          outPoint = new PIXI.Point();
        }
        outPoint.x = this.x * other.x;
        outPoint.y = this.y * other.y;
        return outPoint;
      },
      multiplyScalar(scalar, outPoint) {
        if (!outPoint) {
          outPoint = new PIXI.Point();
        }
        outPoint.x = this.x * scalar;
        outPoint.y = this.y * scalar;
        return outPoint;
      },
      dot(other) {
        return this.x * other.x + this.y * other.y;
      },
      cross(other) {
        return this.x * other.y - this.y * other.x;
      },
      normalize(outPoint) {
        if (!outPoint) {
          outPoint = new PIXI.Point();
        }
        const magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
        outPoint.x = this.x / magnitude;
        outPoint.y = this.y / magnitude;
        return outPoint;
      },
      magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      magnitudeSquared() {
        return this.x * this.x + this.y * this.y;
      },
      project(onto, outPoint) {
        if (!outPoint) {
          outPoint = new PIXI.Point();
        }
        const normalizedScalarProjection = (this.x * onto.x + this.y * onto.y) / (onto.x * onto.x + onto.y * onto.y);
        outPoint.x = onto.x * normalizedScalarProjection;
        outPoint.y = onto.y * normalizedScalarProjection;
        return outPoint;
      },
      reflect(normal, outPoint) {
        if (!outPoint) {
          outPoint = new PIXI.Point();
        }
        const dotProduct = this.x * normal.x + this.y * normal.y;
        outPoint.x = this.x - 2 * dotProduct * normal.x;
        outPoint.y = this.y - 2 * dotProduct * normal.y;
        return outPoint;
      }
    };

    "use strict";

    const rectangleExtraMixins = {
      containsRect(other) {
        if (other.width <= 0 || other.height <= 0) {
          return other.x > this.x && other.y > this.y && other.right < this.right && other.bottom < this.bottom;
        }
        return other.x >= this.x && other.y >= this.y && other.right <= this.right && other.bottom <= this.bottom;
      },
      equals(other) {
        if (other === this) {
          return true;
        }
        return other && this.x === other.x && this.y === other.y && this.width === other.width && this.height === other.height;
      },
      intersection(other, outRect) {
        if (!outRect) {
          outRect = new PIXI.Rectangle();
        }
        const x0 = this.x < other.x ? other.x : this.x;
        const x1 = this.right > other.right ? other.right : this.right;
        if (x1 <= x0) {
          outRect.x = outRect.y = outRect.width = outRect.height = 0;
          return outRect;
        }
        const y0 = this.y < other.y ? other.y : this.y;
        const y1 = this.bottom > other.bottom ? other.bottom : this.bottom;
        if (y1 <= y0) {
          outRect.x = outRect.y = outRect.width = outRect.height = 0;
          return outRect;
        }
        outRect.x = x0;
        outRect.y = y0;
        outRect.width = x1 - x0;
        outRect.height = y1 - y0;
        return outRect;
      },
      union(other, outRect) {
        if (!outRect) {
          outRect = new PIXI.Rectangle();
        }
        const x1 = Math.min(this.x, other.x);
        const x2 = Math.max(this.x + this.width, other.x + other.width);
        const y1 = Math.min(this.y, other.y);
        const y2 = Math.max(this.y + this.height, other.y + other.height);
        outRect.x = x1;
        outRect.y = y1;
        outRect.width = x2 - x1;
        outRect.height = y2 - y1;
        return outRect;
      }
    };

    "use strict";
    Object.assign(PIXI.Point.prototype, pointExtraMixins);
    Object.assign(PIXI.ObservablePoint.prototype, pointExtraMixins);
    Object.assign(PIXI.Rectangle.prototype, rectangleExtraMixins);

    "use strict";
    function floatEqual(a, b, epsilon = Number.EPSILON) {
      if (a === b) {
        return true;
      }
      const diff = Math.abs(a - b);
      return diff < epsilon;
    }
    function genericLineIntersection(aStart, aEnd, bStart, bEnd, isLine, outPoint) {
      if (!outPoint) {
        outPoint = new PIXI.Point();
      }
      const dxa = aEnd.x - aStart.x;
      const dya = aEnd.y - aStart.y;
      const dxb = bEnd.x - bStart.x;
      const dyb = bEnd.y - bStart.y;
      const denominator = dyb * dxa - dxb * dya;
      if (floatEqual(denominator, 0)) {
        outPoint.x = NaN;
        outPoint.y = NaN;
        return outPoint;
      }
      const ua = (dxb * (aStart.y - bStart.y) - dyb * (aStart.x - bStart.x)) / denominator;
      const ub = (dxa * (aStart.y - bStart.y) - dya * (aStart.x - bStart.x)) / denominator;
      if (!isLine && (ua < 0 || ua > 1 || ub < 0 || ub > 1)) {
        outPoint.x = NaN;
        outPoint.y = NaN;
        return outPoint;
      }
      outPoint.x = aStart.x + ua * dxa;
      outPoint.y = bStart.y + ub * dyb;
      return outPoint;
    }
    function lineIntersection(aStart, aEnd, bStart, bEnd, outPoint) {
      return genericLineIntersection(aStart, aEnd, bStart, bEnd, true, outPoint);
    }
    function segmentIntersection(aStart, aEnd, bStart, bEnd, outPoint) {
      return genericLineIntersection(aStart, aEnd, bStart, bEnd, false, outPoint);
    }

    "use strict";

    "use strict";

    exports.floatEqual = floatEqual;
    exports.lineIntersection = lineIntersection;
    exports.pointExtraMixins = pointExtraMixins;
    exports.rectangleExtraMixins = rectangleExtraMixins;
    exports.segmentIntersection = segmentIntersection;

    return exports;

})({});
Object.assign(this.PIXI, math_extras_js);
//# sourceMappingURL=math-extras.js.map
