var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/geom/Point
 */
import SimpleGeometry from './SimpleGeometry.js';
import { containsXY, createOrUpdateFromCoordinate } from '../extent.js';
import { deflateCoordinate } from './flat/deflate.js';
import { squaredDistance as squaredDx } from '../math.js';
/**
 * @classdesc
 * Point geometry.
 *
 * @api
 */
var Point = /** @class */ (function (_super) {
    __extends(Point, _super);
    /**
     * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
     */
    function Point(coordinates, opt_layout) {
        var _this = _super.call(this) || this;
        _this.setCoordinates(coordinates, opt_layout);
        return _this;
    }
    /**
     * Make a complete copy of the geometry.
     * @return {!Point} Clone.
     * @api
     */
    Point.prototype.clone = function () {
        var point = new Point(this.flatCoordinates.slice(), this.layout);
        point.applyProperties(this);
        return point;
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    Point.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
        var flatCoordinates = this.flatCoordinates;
        var squaredDistance = squaredDx(x, y, flatCoordinates[0], flatCoordinates[1]);
        if (squaredDistance < minSquaredDistance) {
            var stride = this.stride;
            for (var i = 0; i < stride; ++i) {
                closestPoint[i] = flatCoordinates[i];
            }
            closestPoint.length = stride;
            return squaredDistance;
        }
        else {
            return minSquaredDistance;
        }
    };
    /**
     * Return the coordinate of the point.
     * @return {import("../coordinate.js").Coordinate} Coordinates.
     * @api
     */
    Point.prototype.getCoordinates = function () {
        return !this.flatCoordinates ? [] : this.flatCoordinates.slice();
    };
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @protected
     * @return {import("../extent.js").Extent} extent Extent.
     */
    Point.prototype.computeExtent = function (extent) {
        return createOrUpdateFromCoordinate(this.flatCoordinates, extent);
    };
    /**
     * Get the type of this geometry.
     * @return {import("./Geometry.js").Type} Geometry type.
     * @api
     */
    Point.prototype.getType = function () {
        return 'Point';
    };
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    Point.prototype.intersectsExtent = function (extent) {
        return containsXY(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
    };
    /**
     * @param {!Array<*>} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
     * @api
     */
    Point.prototype.setCoordinates = function (coordinates, opt_layout) {
        this.setLayout(opt_layout, coordinates, 0);
        if (!this.flatCoordinates) {
            this.flatCoordinates = [];
        }
        this.flatCoordinates.length = deflateCoordinate(this.flatCoordinates, 0, coordinates, this.stride);
        this.changed();
    };
    return Point;
}(SimpleGeometry));
export default Point;
//# sourceMappingURL=Point.js.map