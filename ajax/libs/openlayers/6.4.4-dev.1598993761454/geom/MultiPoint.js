var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/geom/MultiPoint
 */
import GeometryType from './GeometryType.js';
import Point from './Point.js';
import SimpleGeometry from './SimpleGeometry.js';
import { closestSquaredDistanceXY, containsXY } from '../extent.js';
import { deflateCoordinates } from './flat/deflate.js';
import { extend } from '../array.js';
import { inflateCoordinates } from './flat/inflate.js';
import { squaredDistance as squaredDx } from '../math.js';
/**
 * @classdesc
 * Multi-point geometry.
 *
 * @api
 */
var MultiPoint = /** @class */ (function (_super) {
    __extends(MultiPoint, _super);
    /**
     * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
     *     For internal use, flat coordinates in combination with `opt_layout` are also accepted.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     */
    function MultiPoint(coordinates, opt_layout) {
        var _this = _super.call(this) || this;
        if (opt_layout && !Array.isArray(coordinates[0])) {
            _this.setFlatCoordinates(opt_layout, 
            /** @type {Array<number>} */ (coordinates));
        }
        else {
            _this.setCoordinates(
            /** @type {Array<import("../coordinate.js").Coordinate>} */ (coordinates), opt_layout);
        }
        return _this;
    }
    /**
     * Append the passed point to this multipoint.
     * @param {Point} point Point.
     * @api
     */
    MultiPoint.prototype.appendPoint = function (point) {
        if (!this.flatCoordinates) {
            this.flatCoordinates = point.getFlatCoordinates().slice();
        }
        else {
            extend(this.flatCoordinates, point.getFlatCoordinates());
        }
        this.changed();
    };
    /**
     * Make a complete copy of the geometry.
     * @return {!MultiPoint} Clone.
     * @api
     */
    MultiPoint.prototype.clone = function () {
        var multiPoint = new MultiPoint(this.flatCoordinates.slice(), this.layout);
        multiPoint.applyProperties(this);
        return multiPoint;
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    MultiPoint.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
            return minSquaredDistance;
        }
        var flatCoordinates = this.flatCoordinates;
        var stride = this.stride;
        for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
            var squaredDistance = squaredDx(x, y, flatCoordinates[i], flatCoordinates[i + 1]);
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
     * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
     * @api
     */
    MultiPoint.prototype.getCoordinates = function () {
        return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    /**
     * Return the point at the specified index.
     * @param {number} index Index.
     * @return {Point} Point.
     * @api
     */
    MultiPoint.prototype.getPoint = function (index) {
        var n = !this.flatCoordinates
            ? 0
            : this.flatCoordinates.length / this.stride;
        if (index < 0 || n <= index) {
            return null;
        }
        return new Point(this.flatCoordinates.slice(index * this.stride, (index + 1) * this.stride), this.layout);
    };
    /**
     * Return the points of this multipoint.
     * @return {Array<Point>} Points.
     * @api
     */
    MultiPoint.prototype.getPoints = function () {
        var flatCoordinates = this.flatCoordinates;
        var layout = this.layout;
        var stride = this.stride;
        /** @type {Array<Point>} */
        var points = [];
        for (var i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
            var point = new Point(flatCoordinates.slice(i, i + stride), layout);
            points.push(point);
        }
        return points;
    };
    /**
     * Get the type of this geometry.
     * @return {import("./GeometryType.js").default} Geometry type.
     * @api
     */
    MultiPoint.prototype.getType = function () {
        return GeometryType.MULTI_POINT;
    };
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    MultiPoint.prototype.intersectsExtent = function (extent) {
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
     * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     * @api
     */
    MultiPoint.prototype.setCoordinates = function (coordinates, opt_layout) {
        this.setLayout(opt_layout, coordinates, 1);
        if (!this.flatCoordinates) {
            this.flatCoordinates = [];
        }
        this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates, this.stride);
        this.changed();
    };
    return MultiPoint;
}(SimpleGeometry));
export default MultiPoint;
//# sourceMappingURL=MultiPoint.js.map