/*!
 * PixiJS - v8.6.6
 * Compiled Wed, 18 Dec 2024 12:46:36 UTC
 *
 * PixiJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
var math_extras_js = (function (exports) {
    'use strict';

    "use strict";

    const pointExtraMixins = {
      /**
       * Adds `other` to `this` point and outputs into `outPoint` or a new Point.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method add
       * @memberof maths.Point#
       * @param {maths.PointData} other - The point to add to `this`.
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The `outPoint` reference or a new Point, with the result of the addition.
       */
      /**
       * Adds `other` to `this` point and outputs into `outPoint` or a new Point.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method add
       * @memberof maths.ObservablePoint#
       * @param {maths.PointData} other - The point to add to `this`.
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The `outPoint` reference or a new Point, with the result of the addition.
       */
      add(other, outPoint) {
        if (!outPoint) {
          outPoint = new PIXI.Point();
        }
        outPoint.x = this.x + other.x;
        outPoint.y = this.y + other.y;
        return outPoint;
      },
      /**
       * Subtracts `other` from `this` point and outputs into `outPoint` or a new Point.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method subtract
       * @memberof maths.Point#
       * @param {maths.PointData} other - The point to subtract to `this`.
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The `outPoint` reference or a new Point, with the result of the subtraction.
       */
      /**
       * Subtracts `other` from `this` point and outputs into `outPoint` or a new Point.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method subtract
       * @memberof maths.ObservablePoint#
       * @param {maths.PointData} other - The point to subtract to `this`.
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The `outPoint` reference or a new Point, with the result of the subtraction.
       */
      subtract(other, outPoint) {
        if (!outPoint) {
          outPoint = new PIXI.Point();
        }
        outPoint.x = this.x - other.x;
        outPoint.y = this.y - other.y;
        return outPoint;
      },
      /**
       * Multiplies component-wise `other` and `this` points and outputs into `outPoint` or a new Point.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method multiply
       * @memberof maths.Point#
       * @param {maths.PointData} other - The point to multiply with `this`.
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The `outPoint` reference or a new Point, with the component-wise multiplication.
       */
      /**
       * Multiplies component-wise `other` and `this` points and outputs into `outPoint` or a new Point.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method multiply
       * @memberof maths.ObservablePoint#
       * @param {maths.PointData} other - The point to multiply with `this`.
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The `outPoint` reference or a new Point, with the component-wise multiplication.
       */
      multiply(other, outPoint) {
        if (!outPoint) {
          outPoint = new PIXI.Point();
        }
        outPoint.x = this.x * other.x;
        outPoint.y = this.y * other.y;
        return outPoint;
      },
      /**
       * Multiplies each component of `this` point with the number `scalar` and outputs into `outPoint` or a new Point.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method multiplyScalar
       * @memberof maths.Point#
       * @param {number} scalar - The number to multiply both components of `this`.
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The `outPoint` reference or a new Point, with the multiplication.
       */
      /**
       * Multiplies each component of `this` point with the number `scalar` and outputs into `outPoint` or a new Point.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method multiplyScalar
       * @memberof maths.ObservablePoint#
       * @param {number} scalar - The number to multiply both components of `this`.
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The `outPoint` reference or a new Point, with the multiplication.
       */
      multiplyScalar(scalar, outPoint) {
        if (!outPoint) {
          outPoint = new PIXI.Point();
        }
        outPoint.x = this.x * scalar;
        outPoint.y = this.y * scalar;
        return outPoint;
      },
      /**
       * Computes the dot product of `other` with `this` point.
       * The dot product is the sum of the products of the corresponding components of two vectors.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method dot
       * @memberof maths.Point#
       * @param {maths.PointData} other - The other point to calculate the dot product with `this`.
       * @returns {number} The result of the dot product. This is an scalar value.
       */
      /**
       * Computes the dot product of `other` with `this` point.
       * The dot product is the sum of the products of the corresponding components of two vectors.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method dot
       * @memberof maths.ObservablePoint#
       * @param {maths.PointData} other - The other point to calculate the dot product with `this`.
       * @returns {number} The result of the dot product. This is an scalar value.
       */
      dot(other) {
        return this.x * other.x + this.y * other.y;
      },
      /**
       * Computes the cross product of `other` with `this` point.
       * Given two linearly independent R3 vectors a and b, the cross product, a × b (read "a cross b"),
       * is a vector that is perpendicular to both a and b, and thus normal to the plane containing them.
       * While cross product only exists on 3D space, we can assume the z component of 2D to be zero and
       * the result becomes a vector that will only have magnitude on the z axis.
       *
       * This function returns the z component of the cross product of the two points.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method cross
       * @memberof maths.Point#
       * @param {maths.PointData} other - The other point to calculate the cross product with `this`.
       * @returns {number} The z component of the result of the cross product.
       */
      /**
       * Computes the cross product of `other` with `this` point.
       * Given two linearly independent R3 vectors a and b, the cross product, a × b (read "a cross b"),
       * is a vector that is perpendicular to both a and b, and thus normal to the plane containing them.
       * While cross product only exists on 3D space, we can assume the z component of 2D to be zero and
       * the result becomes a vector that will only have magnitude on the z axis.
       *
       * This function returns the z component of the cross product of the two points.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method cross
       * @memberof maths.ObservablePoint#
       * @param {maths.PointData} other - The other point to calculate the cross product with `this`.
       * @returns {number} The z component of the result of the cross product.
       */
      cross(other) {
        return this.x * other.y - this.y * other.x;
      },
      /**
       * Computes a normalized version of `this` point.
       *
       * A normalized vector is a vector of magnitude (length) 1
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method normalize
       * @memberof maths.Point#
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The normalized point.
       */
      /**
       * Computes a normalized version of `this` point.
       *
       * A normalized vector is a vector of magnitude (length) 1
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method normalize
       * @memberof maths.ObservablePoint#
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The normalized point.
       */
      normalize(outPoint) {
        if (!outPoint) {
          outPoint = new PIXI.Point();
        }
        const magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
        outPoint.x = this.x / magnitude;
        outPoint.y = this.y / magnitude;
        return outPoint;
      },
      /**
       * Computes the magnitude of this point (Euclidean distance from 0, 0).
       *
       * Defined as the square root of the sum of the squares of each component.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method magnitude
       * @memberof maths.Point#
       * @returns {number} The magnitude (length) of the vector.
       */
      /**
       * Computes the magnitude of this point (Euclidean distance from 0, 0).
       *
       * Defined as the square root of the sum of the squares of each component.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method magnitude
       * @memberof maths.ObservablePoint#
       * @returns {number} The magnitude (length) of the vector.
       */
      magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      /**
       * Computes the square magnitude of this point.
       * If you are comparing the lengths of vectors, you should compare the length squared instead
       * as it is slightly more efficient to calculate.
       *
       * Defined as the sum of the squares of each component.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method magnitudeSquared
       * @memberof maths.Point#
       * @returns {number} The magnitude squared (length squared) of the vector.
       */
      /**
       * Computes the square magnitude of this point.
       * If you are comparing the lengths of vectors, you should compare the length squared instead
       * as it is slightly more efficient to calculate.
       *
       * Defined as the sum of the squares of each component.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method magnitudeSquared
       * @memberof maths.ObservablePoint#
       * @returns {number} The magnitude squared (length squared) of the vector.
       */
      magnitudeSquared() {
        return this.x * this.x + this.y * this.y;
      },
      /**
       * Computes vector projection of `this` on `onto`.
       *
       * Imagine a light source, parallel to `onto`, above `this`.
       * The light would cast rays perpendicular to `onto`.
       * `this.project(onto)` is the shadow cast by `this` on the line defined by `onto` .
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method project
       * @memberof maths.Point#
       * @param {maths.PointData} onto - A non zero vector describing a line on which to project `this`.
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The `this` on `onto` projection.
       */
      /**
       * Computes vector projection of `this` on `onto`.
       *
       * Imagine a light source, parallel to `onto`, above `this`.
       * The light would cast rays perpendicular to `onto`.
       * `this.project(onto)` is the shadow cast by `this` on the line defined by `onto` .
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method project
       * @memberof maths.ObservablePoint#
       * @param {maths.PointData} onto - A non zero vector describing a line on which to project `this`.
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The `this` on `onto` projection.
       */
      project(onto, outPoint) {
        if (!outPoint) {
          outPoint = new PIXI.Point();
        }
        const normalizedScalarProjection = (this.x * onto.x + this.y * onto.y) / (onto.x * onto.x + onto.y * onto.y);
        outPoint.x = onto.x * normalizedScalarProjection;
        outPoint.y = onto.y * normalizedScalarProjection;
        return outPoint;
      },
      /**
       * Reflects `this` vector off of a plane orthogonal to `normal`.
       * `normal` is not normalized during this process. Consider normalizing your `normal` before use.
       *
       * Imagine a light source bouncing onto a mirror.
       * `this` vector is the light and `normal` is a vector perpendicular to the mirror.
       * `this.reflect(normal)` is the reflection of `this` on that mirror.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method reflect
       * @memberof maths.Point#
       * @param {maths.PointData} normal - The normal vector of your reflecting plane.
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The reflection of `this` on your reflecting plane.
       */
      /**
       * Reflects `this` vector off of a plane orthogonal to `normal`.
       * `normal` is not normalized during this process. Consider normalizing your `normal` before use.
       *
       * Imagine a light source bouncing onto a mirror.
       * `this` vector is the light and `normal` is a vector perpendicular to the mirror.
       * `this.reflect(normal)` is the reflection of `this` on that mirror.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method reflect
       * @memberof maths.ObservablePoint#
       * @param {maths.PointData} normal - The normal vector of your reflecting plane.
       * @param {maths.PointData} [outPoint] - A Point-like object in which to store the value,
       * optional (otherwise will create a new Point).
       * @returns {PointData} The reflection of `this` on your reflecting plane.
       */
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
      /**
       * Determines whether the `other` Rectangle is contained within `this` Rectangle object.
       * Rectangles that occupy the same space are considered to be containing each other.
       * Rectangles without area (width or height equal to zero) can't contain anything,
       * not even other arealess rectangles.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method containsRect
       * @memberof maths.Rectangle#
       * @param {Rectangle} other - The Rectangle to fit inside `this`.
       * @returns {boolean} A value of `true` if `this` Rectangle contains `other`; otherwise `false`.
       */
      containsRect(other) {
        if (other.width <= 0 || other.height <= 0) {
          return other.x > this.x && other.y > this.y && other.right < this.right && other.bottom < this.bottom;
        }
        return other.x >= this.x && other.y >= this.y && other.right <= this.right && other.bottom <= this.bottom;
      },
      /**
       * Accepts `other` Rectangle and returns true if the given Rectangle is equal to `this` Rectangle.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method equals
       * @memberof maths.Rectangle#
       * @param {Rectangle} other - The Rectangle to compare with `this`
       * @returns {boolean} Returns true if all `x`, `y`, `width`, and `height` are equal.
       */
      equals(other) {
        if (other === this) {
          return true;
        }
        return other && this.x === other.x && this.y === other.y && this.width === other.width && this.height === other.height;
      },
      /**
       * If the area of the intersection between the Rectangles `other` and `this` is not zero,
       * returns the area of intersection as a Rectangle object. Otherwise, return an empty Rectangle
       * with its properties set to zero.
       * Rectangles without area (width or height equal to zero) can't intersect or be intersected
       * and will always return an empty rectangle with its properties set to zero.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method intersection
       * @memberof maths.Rectangle#
       * @param {Rectangle} other - The Rectangle to intersect with `this`.
       * @param {Rectangle} [outRect] - A Rectangle object in which to store the value,
       * optional (otherwise will create a new Rectangle).
       * @returns {Rectangle} The intersection of `this` and `other`.
       */
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
      /**
       * Adds `this` and `other` Rectangles together to create a new Rectangle object filling
       * the horizontal and vertical space between the two rectangles.
       *
       * _Note: Only available with **pixi.js/math-extras**._
       * @method union
       * @memberof maths.Rectangle#
       * @param {Rectangle} other - The Rectangle to unite with `this`.
       * @param {Rectangle} [outRect] - A Rectangle object in which to store the value,
       * optional (otherwise will create a new Rectangle).
       * @returns {Rectangle} The union of `this` and `other`.
       */
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
