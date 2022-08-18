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
 * @module ol/geom/LineString
 */
import GeometryLayout from './GeometryLayout.js';
import GeometryType from './GeometryType.js';
import SimpleGeometry from './SimpleGeometry.js';
import { assignClosestPoint, maxSquaredDelta } from './flat/closest.js';
import { closestSquaredDistanceXY } from '../extent.js';
import { deflateCoordinates } from './flat/deflate.js';
import { douglasPeucker } from './flat/simplify.js';
import { extend } from '../array.js';
import { forEach as forEachSegment } from './flat/segments.js';
import { inflateCoordinates } from './flat/inflate.js';
import { interpolatePoint, lineStringCoordinateAtM } from './flat/interpolate.js';
import { intersectsLineString } from './flat/intersectsextent.js';
import { lineStringLength } from './flat/length.js';
/**
 * @classdesc
 * Linestring geometry.
 *
 * @api
 */
var LineString = /** @class */ (function (_super) {
    __extends(LineString, _super);
    /**
     * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
     *     For internal use, flat coordinates in combination with `opt_layout` are also accepted.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     */
    function LineString(coordinates, opt_layout) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {import("../coordinate.js").Coordinate}
         */
        _this.flatMidpoint_ = null;
        /**
         * @private
         * @type {number}
         */
        _this.flatMidpointRevision_ = -1;
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
     * Append the passed coordinate to the coordinates of the linestring.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @api
     */
    LineString.prototype.appendCoordinate = function (coordinate) {
        if (!this.flatCoordinates) {
            this.flatCoordinates = coordinate.slice();
        }
        else {
            extend(this.flatCoordinates, coordinate);
        }
        this.changed();
    };
    /**
     * Make a complete copy of the geometry.
     * @return {!LineString} Clone.
     * @api
     */
    LineString.prototype.clone = function () {
        var lineString = new LineString(this.flatCoordinates.slice(), this.layout);
        lineString.applyProperties(this);
        return lineString;
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    LineString.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
            return minSquaredDistance;
        }
        if (this.maxDeltaRevision_ != this.getRevision()) {
            this.maxDelta_ = Math.sqrt(maxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
            this.maxDeltaRevision_ = this.getRevision();
        }
        return assignClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, false, x, y, closestPoint, minSquaredDistance);
    };
    /**
     * Iterate over each segment, calling the provided callback.
     * If the callback returns a truthy value the function returns that
     * value immediately. Otherwise the function returns `false`.
     *
     * @param {function(this: S, import("../coordinate.js").Coordinate, import("../coordinate.js").Coordinate): T} callback Function
     *     called for each segment. The function will receive two arguments, the start and end coordinates of the segment.
     * @return {T|boolean} Value.
     * @template T,S
     * @api
     */
    LineString.prototype.forEachSegment = function (callback) {
        return forEachSegment(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, callback);
    };
    /**
     * Returns the coordinate at `m` using linear interpolation, or `null` if no
     * such coordinate exists.
     *
     * `opt_extrapolate` controls extrapolation beyond the range of Ms in the
     * MultiLineString. If `opt_extrapolate` is `true` then Ms less than the first
     * M will return the first coordinate and Ms greater than the last M will
     * return the last coordinate.
     *
     * @param {number} m M.
     * @param {boolean=} opt_extrapolate Extrapolate. Default is `false`.
     * @return {import("../coordinate.js").Coordinate} Coordinate.
     * @api
     */
    LineString.prototype.getCoordinateAtM = function (m, opt_extrapolate) {
        if (this.layout != GeometryLayout.XYM &&
            this.layout != GeometryLayout.XYZM) {
            return null;
        }
        var extrapolate = opt_extrapolate !== undefined ? opt_extrapolate : false;
        return lineStringCoordinateAtM(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, m, extrapolate);
    };
    /**
     * Return the coordinates of the linestring.
     * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
     * @api
     */
    LineString.prototype.getCoordinates = function () {
        return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    /**
     * Return the coordinate at the provided fraction along the linestring.
     * The `fraction` is a number between 0 and 1, where 0 is the start of the
     * linestring and 1 is the end.
     * @param {number} fraction Fraction.
     * @param {import("../coordinate.js").Coordinate=} opt_dest Optional coordinate whose values will
     *     be modified. If not provided, a new coordinate will be returned.
     * @return {import("../coordinate.js").Coordinate} Coordinate of the interpolated point.
     * @api
     */
    LineString.prototype.getCoordinateAt = function (fraction, opt_dest) {
        return interpolatePoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, fraction, opt_dest, this.stride);
    };
    /**
     * Return the length of the linestring on projected plane.
     * @return {number} Length (on projected plane).
     * @api
     */
    LineString.prototype.getLength = function () {
        return lineStringLength(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    };
    /**
     * @return {Array<number>} Flat midpoint.
     */
    LineString.prototype.getFlatMidpoint = function () {
        if (this.flatMidpointRevision_ != this.getRevision()) {
            this.flatMidpoint_ = this.getCoordinateAt(0.5, this.flatMidpoint_);
            this.flatMidpointRevision_ = this.getRevision();
        }
        return this.flatMidpoint_;
    };
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {LineString} Simplified LineString.
     * @protected
     */
    LineString.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
        var simplifiedFlatCoordinates = [];
        simplifiedFlatCoordinates.length = douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
        return new LineString(simplifiedFlatCoordinates, GeometryLayout.XY);
    };
    /**
     * Get the type of this geometry.
     * @return {import("./GeometryType.js").default} Geometry type.
     * @api
     */
    LineString.prototype.getType = function () {
        return GeometryType.LINE_STRING;
    };
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    LineString.prototype.intersectsExtent = function (extent) {
        return intersectsLineString(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
    };
    /**
     * Set the coordinates of the linestring.
     * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default=} opt_layout Layout.
     * @api
     */
    LineString.prototype.setCoordinates = function (coordinates, opt_layout) {
        this.setLayout(opt_layout, coordinates, 1);
        if (!this.flatCoordinates) {
            this.flatCoordinates = [];
        }
        this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates, this.stride);
        this.changed();
    };
    return LineString;
}(SimpleGeometry));
export default LineString;
//# sourceMappingURL=LineString.js.map