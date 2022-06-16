var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/geom/LinearRing
 */
import { closestSquaredDistanceXY } from '../extent.js';
import GeometryLayout from './GeometryLayout.js';
import GeometryType from './GeometryType.js';
import SimpleGeometry from './SimpleGeometry.js';
import { linearRing as linearRingArea } from './flat/area.js';
import { assignClosestPoint, maxSquaredDelta } from './flat/closest.js';
import { deflateCoordinates } from './flat/deflate.js';
import { inflateCoordinates } from './flat/inflate.js';
import { douglasPeucker } from './flat/simplify.js';
/**
 * @classdesc
 * Linear ring geometry. Only used as part of polygon; cannot be rendered
 * on its own.
 *
 * @api
 */
var LinearRing = /** @class */ (function (_super) {
    __extends(LinearRing, _super);
    /**
     * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
     *     For internal use, flat coordinates in combination with `opt_layout` are also accepted.
     * @param {GeometryLayout=} opt_layout Layout.
     */
    function LinearRing(coordinates, opt_layout) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {number}
         */
        _this.maxDelta_ = -1;
        /**
         * @private
         * @type {number}
         */
        _this.maxDeltaRevision_ = -1;
        if (opt_layout !== undefined && !Array.isArray(coordinates[0])) {
            _this.setFlatCoordinates(opt_layout, /** @type {Array<number>} */ (coordinates));
        }
        else {
            _this.setCoordinates(/** @type {Array<import("../coordinate.js").Coordinate>} */ (coordinates), opt_layout);
        }
        return _this;
    }
    /**
     * Make a complete copy of the geometry.
     * @return {!LinearRing} Clone.
     * @override
     * @api
     */
    LinearRing.prototype.clone = function () {
        return new LinearRing(this.flatCoordinates.slice(), this.layout);
    };
    /**
     * @inheritDoc
     */
    LinearRing.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
            return minSquaredDistance;
        }
        if (this.maxDeltaRevision_ != this.getRevision()) {
            this.maxDelta_ = Math.sqrt(maxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
            this.maxDeltaRevision_ = this.getRevision();
        }
        return assignClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
    };
    /**
     * Return the area of the linear ring on projected plane.
     * @return {number} Area (on projected plane).
     * @api
     */
    LinearRing.prototype.getArea = function () {
        return linearRingArea(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    /**
     * Return the coordinates of the linear ring.
     * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
     * @override
     * @api
     */
    LinearRing.prototype.getCoordinates = function () {
        return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    /**
     * @inheritDoc
     */
    LinearRing.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
        var simplifiedFlatCoordinates = [];
        simplifiedFlatCoordinates.length = douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
        return new LinearRing(simplifiedFlatCoordinates, GeometryLayout.XY);
    };
    /**
     * @inheritDoc
     * @api
     */
    LinearRing.prototype.getType = function () {
        return GeometryType.LINEAR_RING;
    };
    /**
     * @inheritDoc
     */
    LinearRing.prototype.intersectsExtent = function (extent) {
        return false;
    };
    /**
     * Set the coordinates of the linear ring.
     * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
     * @param {GeometryLayout=} opt_layout Layout.
     * @override
     * @api
     */
    LinearRing.prototype.setCoordinates = function (coordinates, opt_layout) {
        this.setLayout(opt_layout, coordinates, 1);
        if (!this.flatCoordinates) {
            this.flatCoordinates = [];
        }
        this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates, this.stride);
        this.changed();
    };
    return LinearRing;
}(SimpleGeometry));
export default LinearRing;
//# sourceMappingURL=LinearRing.js.map