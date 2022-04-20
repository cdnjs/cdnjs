/**
 * @module ol/geom/LinearRing
 */
import {closestSquaredDistanceXY} from '../extent.js';
import GeometryLayout from '../geom/GeometryLayout.js';
import GeometryType from '../geom/GeometryType.js';
import SimpleGeometry from '../geom/SimpleGeometry.js';
import {linearRing as linearRingArea} from '../geom/flat/area.js';
import {assignClosestPoint, maxSquaredDelta} from '../geom/flat/closest.js';
import {deflateCoordinates} from '../geom/flat/deflate.js';
import {inflateCoordinates} from '../geom/flat/inflate.js';
import {douglasPeucker} from '../geom/flat/simplify.js';

/**
 * @classdesc
 * Linear ring geometry. Only used as part of polygon; cannot be rendered
 * on its own.
 *
 * @api
 */
var LinearRing = (function (SimpleGeometry) {
  function LinearRing(coordinates, opt_layout) {

    SimpleGeometry.call(this);

    /**
     * @private
     * @type {number}
     */
    this.maxDelta_ = -1;

    /**
     * @private
     * @type {number}
     */
    this.maxDeltaRevision_ = -1;

    if (opt_layout !== undefined && !Array.isArray(coordinates[0])) {
      this.setFlatCoordinates(opt_layout, coordinates);
    } else {
      this.setCoordinates(coordinates, opt_layout);
    }

  }

  if ( SimpleGeometry ) LinearRing.__proto__ = SimpleGeometry;
  LinearRing.prototype = Object.create( SimpleGeometry && SimpleGeometry.prototype );
  LinearRing.prototype.constructor = LinearRing;

  /**
   * Make a complete copy of the geometry.
   * @return {!module:ol/geom/LinearRing} Clone.
   * @override
   * @api
   */
  LinearRing.prototype.clone = function clone () {
    return new LinearRing(this.flatCoordinates.slice(), this.layout);
  };

  /**
   * @inheritDoc
   */
  LinearRing.prototype.closestPointXY = function closestPointXY (x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt(maxSquaredDelta(
        this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }
    return assignClosestPoint(
      this.flatCoordinates, 0, this.flatCoordinates.length, this.stride,
      this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
  };

  /**
   * Return the area of the linear ring on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  LinearRing.prototype.getArea = function getArea () {
    return linearRingArea(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };

  /**
   * Return the coordinates of the linear ring.
   * @return {Array<module:ol/coordinate~Coordinate>} Coordinates.
   * @override
   * @api
   */
  LinearRing.prototype.getCoordinates = function getCoordinates () {
    return inflateCoordinates(
      this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };

  /**
   * @inheritDoc
   */
  LinearRing.prototype.getSimplifiedGeometryInternal = function getSimplifiedGeometryInternal (squaredTolerance) {
    var simplifiedFlatCoordinates = [];
    simplifiedFlatCoordinates.length = douglasPeucker(
      this.flatCoordinates, 0, this.flatCoordinates.length, this.stride,
      squaredTolerance, simplifiedFlatCoordinates, 0);
    return new LinearRing(simplifiedFlatCoordinates, GeometryLayout.XY);
  };

  /**
   * @inheritDoc
   * @api
   */
  LinearRing.prototype.getType = function getType () {
    return GeometryType.LINEAR_RING;
  };

  /**
   * @inheritDoc
   */
  LinearRing.prototype.intersectsExtent = function intersectsExtent (extent) {};

  /**
   * Set the coordinates of the linear ring.
   * @param {!Array<module:ol/coordinate~Coordinate>} coordinates Coordinates.
   * @param {module:ol/geom/GeometryLayout=} opt_layout Layout.
   * @override
   * @api
   */
  LinearRing.prototype.setCoordinates = function setCoordinates (coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 1);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = deflateCoordinates(
      this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  };

  return LinearRing;
}(SimpleGeometry));


export default LinearRing;

//# sourceMappingURL=LinearRing.js.map