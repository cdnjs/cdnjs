/**
 * @module ol/geom/Point
 */
import {createOrUpdateFromCoordinate, containsXY} from '../extent.js';
import GeometryType from './GeometryType.js';
import SimpleGeometry from './SimpleGeometry.js';
import {deflateCoordinate} from './flat/deflate.js';
import {squaredDistance as squaredDx} from '../math.js';

/**
 * @classdesc
 * Point geometry.
 *
 * @api
 */
var Point = /*@__PURE__*/(function (SimpleGeometry) {
  function Point(coordinates, opt_layout) {
    SimpleGeometry.call(this);
    this.setCoordinates(coordinates, opt_layout);
  }

  if ( SimpleGeometry ) Point.__proto__ = SimpleGeometry;
  Point.prototype = Object.create( SimpleGeometry && SimpleGeometry.prototype );
  Point.prototype.constructor = Point;

  /**
   * Make a complete copy of the geometry.
   * @return {!Point} Clone.
   * @override
   * @api
   */
  Point.prototype.clone = function clone () {
    var point = new Point(this.flatCoordinates.slice(), this.layout);
    return point;
  };

  /**
   * @inheritDoc
   */
  Point.prototype.closestPointXY = function closestPointXY (x, y, closestPoint, minSquaredDistance) {
    var flatCoordinates = this.flatCoordinates;
    var squaredDistance = squaredDx(x, y, flatCoordinates[0], flatCoordinates[1]);
    if (squaredDistance < minSquaredDistance) {
      var stride = this.stride;
      for (var i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[i];
      }
      closestPoint.length = stride;
      return squaredDistance;
    } else {
      return minSquaredDistance;
    }
  };

  /**
   * Return the coordinate of the point.
   * @return {import("../coordinate.js").Coordinate} Coordinates.
   * @override
   * @api
   */
  Point.prototype.getCoordinates = function getCoordinates () {
    return !this.flatCoordinates ? [] : this.flatCoordinates.slice();
  };

  /**
   * @inheritDoc
   */
  Point.prototype.computeExtent = function computeExtent (extent) {
    return createOrUpdateFromCoordinate(this.flatCoordinates, extent);
  };

  /**
   * @inheritDoc
   * @api
   */
  Point.prototype.getType = function getType () {
    return GeometryType.POINT;
  };

  /**
   * @inheritDoc
   * @api
   */
  Point.prototype.intersectsExtent = function intersectsExtent (extent) {
    return containsXY(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
  };

  /**
   * @inheritDoc
   * @api
   */
  Point.prototype.setCoordinates = function setCoordinates (coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 0);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = deflateCoordinate(
      this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  };

  return Point;
}(SimpleGeometry));


export default Point;

//# sourceMappingURL=Point.js.map