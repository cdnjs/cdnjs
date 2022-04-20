/**
 * @module ol/geom/MultiPoint
 */
import {extend} from '../array.js';
import {closestSquaredDistanceXY, containsXY} from '../extent.js';
import GeometryType from '../geom/GeometryType.js';
import Point from '../geom/Point.js';
import SimpleGeometry from '../geom/SimpleGeometry.js';
import {deflateCoordinates} from '../geom/flat/deflate.js';
import {inflateCoordinates} from '../geom/flat/inflate.js';
import {squaredDistance as squaredDx} from '../math.js';

/**
 * @classdesc
 * Multi-point geometry.
 *
 * @api
 */
var MultiPoint = (function (SimpleGeometry) {
  function MultiPoint(coordinates, opt_layout) {
    SimpleGeometry.call(this);
    if (opt_layout && !Array.isArray(coordinates[0])) {
      this.setFlatCoordinates(opt_layout, coordinates);
    } else {
      this.setCoordinates(coordinates, opt_layout);
    }
  }

  if ( SimpleGeometry ) MultiPoint.__proto__ = SimpleGeometry;
  MultiPoint.prototype = Object.create( SimpleGeometry && SimpleGeometry.prototype );
  MultiPoint.prototype.constructor = MultiPoint;

  /**
   * Append the passed point to this multipoint.
   * @param {module:ol/geom/Point} point Point.
   * @api
   */
  MultiPoint.prototype.appendPoint = function appendPoint (point) {
    if (!this.flatCoordinates) {
      this.flatCoordinates = point.getFlatCoordinates().slice();
    } else {
      extend(this.flatCoordinates, point.getFlatCoordinates());
    }
    this.changed();
  };

  /**
   * Make a complete copy of the geometry.
   * @return {!module:ol/geom/MultiPoint} Clone.
   * @override
   * @api
   */
  MultiPoint.prototype.clone = function clone () {
    var multiPoint = new MultiPoint(this.flatCoordinates.slice(), this.layout);
    return multiPoint;
  };

  /**
   * @inheritDoc
   */
  MultiPoint.prototype.closestPointXY = function closestPointXY (x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    var flatCoordinates = this.flatCoordinates;
    var stride = this.stride;
    for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      var squaredDistance = squaredDx(
        x, y, flatCoordinates[i], flatCoordinates[i + 1]);
      if (squaredDistance < minSquaredDistance) {
        minSquaredDistance = squaredDistance;
        for (var j = 0; j < stride; ++j) {
          closestPoint[j] = flatCoordinates[i + j];
        }
        closestPoint.length = stride;
      }
    }
    return minSquaredDistance;
  };

  /**
   * Return the coordinates of the multipoint.
   * @return {Array<module:ol/coordinate~Coordinate>} Coordinates.
   * @override
   * @api
   */
  MultiPoint.prototype.getCoordinates = function getCoordinates () {
    return inflateCoordinates(
      this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };

  /**
   * Return the point at the specified index.
   * @param {number} index Index.
   * @return {module:ol/geom/Point} Point.
   * @api
   */
  MultiPoint.prototype.getPoint = function getPoint (index) {
    var n = !this.flatCoordinates ? 0 : this.flatCoordinates.length / this.stride;
    if (index < 0 || n <= index) {
      return null;
    }
    return new Point(this.flatCoordinates.slice(
      index * this.stride, (index + 1) * this.stride), this.layout);
  };

  /**
   * Return the points of this multipoint.
   * @return {Array<module:ol/geom/Point>} Points.
   * @api
   */
  MultiPoint.prototype.getPoints = function getPoints () {
    var flatCoordinates = this.flatCoordinates;
    var layout = this.layout;
    var stride = this.stride;
    /** @type {Array<module:ol/geom/Point>} */
    var points = [];
    for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      var point = new Point(flatCoordinates.slice(i, i + stride), layout);
      points.push(point);
    }
    return points;
  };

  /**
   * @inheritDoc
   * @api
   */
  MultiPoint.prototype.getType = function getType () {
    return GeometryType.MULTI_POINT;
  };

  /**
   * @inheritDoc
   * @api
   */
  MultiPoint.prototype.intersectsExtent = function intersectsExtent (extent) {
    var flatCoordinates = this.flatCoordinates;
    var stride = this.stride;
    for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      var x = flatCoordinates[i];
      var y = flatCoordinates[i + 1];
      if (containsXY(extent, x, y)) {
        return true;
      }
    }
    return false;
  };

  /**
   * Set the coordinates of the multipoint.
   * @param {!Array<module:ol/coordinate~Coordinate>} coordinates Coordinates.
   * @param {module:ol/geom/GeometryLayout=} opt_layout Layout.
   * @override
   * @api
   */
  MultiPoint.prototype.setCoordinates = function setCoordinates (coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 1);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = deflateCoordinates(
      this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  };

  return MultiPoint;
}(SimpleGeometry));


export default MultiPoint;

//# sourceMappingURL=MultiPoint.js.map