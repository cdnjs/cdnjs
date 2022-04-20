/**
 * @module ol/geom/Circle
 */
import {createOrUpdate, forEachCorner, intersects} from '../extent.js';
import GeometryType from './GeometryType.js';
import SimpleGeometry from './SimpleGeometry.js';
import {deflateCoordinate} from './flat/deflate.js';

/**
 * @classdesc
 * Circle geometry.
 *
 * @api
 */
var Circle = /*@__PURE__*/(function (SimpleGeometry) {
  function Circle(center, opt_radius, opt_layout) {
    SimpleGeometry.call(this);
    if (opt_layout !== undefined && opt_radius === undefined) {
      this.setFlatCoordinates(opt_layout, center);
    } else {
      var radius = opt_radius ? opt_radius : 0;
      this.setCenterAndRadius(center, radius, opt_layout);
    }
  }

  if ( SimpleGeometry ) Circle.__proto__ = SimpleGeometry;
  Circle.prototype = Object.create( SimpleGeometry && SimpleGeometry.prototype );
  Circle.prototype.constructor = Circle;

  /**
   * Make a complete copy of the geometry.
   * @return {!Circle} Clone.
   * @override
   * @api
   */
  Circle.prototype.clone = function clone () {
    return new Circle(this.flatCoordinates.slice(), undefined, this.layout);
  };

  /**
   * @inheritDoc
   */
  Circle.prototype.closestPointXY = function closestPointXY (x, y, closestPoint, minSquaredDistance) {
    var flatCoordinates = this.flatCoordinates;
    var dx = x - flatCoordinates[0];
    var dy = y - flatCoordinates[1];
    var squaredDistance = dx * dx + dy * dy;
    if (squaredDistance < minSquaredDistance) {
      if (squaredDistance === 0) {
        for (var i = 0; i < this.stride; ++i) {
          closestPoint[i] = flatCoordinates[i];
        }
      } else {
        var delta = this.getRadius() / Math.sqrt(squaredDistance);
        closestPoint[0] = flatCoordinates[0] + delta * dx;
        closestPoint[1] = flatCoordinates[1] + delta * dy;
        for (var i$1 = 2; i$1 < this.stride; ++i$1) {
          closestPoint[i$1] = flatCoordinates[i$1];
        }
      }
      closestPoint.length = this.stride;
      return squaredDistance;
    } else {
      return minSquaredDistance;
    }
  };

  /**
   * @inheritDoc
   */
  Circle.prototype.containsXY = function containsXY (x, y) {
    var flatCoordinates = this.flatCoordinates;
    var dx = x - flatCoordinates[0];
    var dy = y - flatCoordinates[1];
    return dx * dx + dy * dy <= this.getRadiusSquared_();
  };

  /**
   * Return the center of the circle as {@link module:ol/coordinate~Coordinate coordinate}.
   * @return {import("../coordinate.js").Coordinate} Center.
   * @api
   */
  Circle.prototype.getCenter = function getCenter () {
    return this.flatCoordinates.slice(0, this.stride);
  };

  /**
   * @inheritDoc
   */
  Circle.prototype.computeExtent = function computeExtent (extent) {
    var flatCoordinates = this.flatCoordinates;
    var radius = flatCoordinates[this.stride] - flatCoordinates[0];
    return createOrUpdate(
      flatCoordinates[0] - radius, flatCoordinates[1] - radius,
      flatCoordinates[0] + radius, flatCoordinates[1] + radius,
      extent);
  };

  /**
   * Return the radius of the circle.
   * @return {number} Radius.
   * @api
   */
  Circle.prototype.getRadius = function getRadius () {
    return Math.sqrt(this.getRadiusSquared_());
  };

  /**
   * @private
   * @return {number} Radius squared.
   */
  Circle.prototype.getRadiusSquared_ = function getRadiusSquared_ () {
    var dx = this.flatCoordinates[this.stride] - this.flatCoordinates[0];
    var dy = this.flatCoordinates[this.stride + 1] - this.flatCoordinates[1];
    return dx * dx + dy * dy;
  };

  /**
   * @inheritDoc
   * @api
   */
  Circle.prototype.getType = function getType () {
    return GeometryType.CIRCLE;
  };

  /**
   * @inheritDoc
   * @api
   */
  Circle.prototype.intersectsExtent = function intersectsExtent (extent) {
    var circleExtent = this.getExtent();
    if (intersects(extent, circleExtent)) {
      var center = this.getCenter();

      if (extent[0] <= center[0] && extent[2] >= center[0]) {
        return true;
      }
      if (extent[1] <= center[1] && extent[3] >= center[1]) {
        return true;
      }

      return forEachCorner(extent, this.intersectsCoordinate, this);
    }
    return false;

  };

  /**
   * Set the center of the circle as {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} center Center.
   * @api
   */
  Circle.prototype.setCenter = function setCenter (center) {
    var stride = this.stride;
    var radius = this.flatCoordinates[stride] - this.flatCoordinates[0];
    var flatCoordinates = center.slice();
    flatCoordinates[stride] = flatCoordinates[0] + radius;
    for (var i = 1; i < stride; ++i) {
      flatCoordinates[stride + i] = center[i];
    }
    this.setFlatCoordinates(this.layout, flatCoordinates);
    this.changed();
  };

  /**
   * Set the center (as {@link module:ol/coordinate~Coordinate coordinate}) and the radius (as
   * number) of the circle.
   * @param {!import("../coordinate.js").Coordinate} center Center.
   * @param {number} radius Radius.
   * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
   * @api
   */
  Circle.prototype.setCenterAndRadius = function setCenterAndRadius (center, radius, opt_layout) {
    this.setLayout(opt_layout, center, 0);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    /** @type {Array<number>} */
    var flatCoordinates = this.flatCoordinates;
    var offset = deflateCoordinate(
      flatCoordinates, 0, center, this.stride);
    flatCoordinates[offset++] = flatCoordinates[0] + radius;
    for (var i = 1, ii = this.stride; i < ii; ++i) {
      flatCoordinates[offset++] = flatCoordinates[i];
    }
    flatCoordinates.length = offset;
    this.changed();
  };

  /**
   * @inheritDoc
   */
  Circle.prototype.getCoordinates = function getCoordinates () {
    return null;
  };

  /**
   * @inheritDoc
   */
  Circle.prototype.setCoordinates = function setCoordinates (coordinates, opt_layout) {};

  /**
   * Set the radius of the circle. The radius is in the units of the projection.
   * @param {number} radius Radius.
   * @api
   */
  Circle.prototype.setRadius = function setRadius (radius) {
    this.flatCoordinates[this.stride] = this.flatCoordinates[0] + radius;
    this.changed();
  };

  return Circle;
}(SimpleGeometry));


/**
 * Transform each coordinate of the circle from one coordinate reference system
 * to another. The geometry is modified in place.
 * If you do not want the geometry modified in place, first clone() it and
 * then use this function on the clone.
 *
 * Internally a circle is currently represented by two points: the center of
 * the circle `[cx, cy]`, and the point to the right of the circle
 * `[cx + r, cy]`. This `transform` function just transforms these two points.
 * So the resulting geometry is also a circle, and that circle does not
 * correspond to the shape that would be obtained by transforming every point
 * of the original circle.
 *
 * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
 *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
 * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
 *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
 * @return {Circle} This geometry.  Note that original geometry is
 *     modified in place.
 * @function
 * @api
 */
Circle.prototype.transform;
export default Circle;

//# sourceMappingURL=Circle.js.map