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
 * @module ol/geom/MultiLineString
 */
import GeometryLayout from './GeometryLayout.js';
import LineString from './LineString.js';
import SimpleGeometry from './SimpleGeometry.js';
import { arrayMaxSquaredDelta, assignClosestArrayPoint } from './flat/closest.js';
import { closestSquaredDistanceXY } from '../extent.js';
import { deflateCoordinatesArray } from './flat/deflate.js';
import { douglasPeuckerArray } from './flat/simplify.js';
import { extend } from '../array.js';
import { inflateCoordinatesArray } from './flat/inflate.js';
import { interpolatePoint, lineStringsCoordinateAtM, } from './flat/interpolate.js';
import { intersectsLineStringArray } from './flat/intersectsextent.js';
/**
 * @classdesc
 * Multi-linestring geometry.
 *
 * @api
 */
var MultiLineString = /** @class */ (function (_super) {
    __extends(MultiLineString, _super);
    /**
     * @param {Array<Array<import("../coordinate.js").Coordinate>|LineString>|Array<number>} coordinates
     *     Coordinates or LineString geometries. (For internal use, flat coordinates in
     *     combination with `opt_layout` and `opt_ends` are also accepted.)
     * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
     * @param {Array<number>} [opt_ends] Flat coordinate ends for internal use.
     */
    function MultiLineString(coordinates, opt_layout, opt_ends) {
        var _this = _super.call(this) || this;
        /**
         * @type {Array<number>}
         * @private
         */
        _this.ends_ = [];
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
        if (Array.isArray(coordinates[0])) {
            _this.setCoordinates(
            /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */ (coordinates), opt_layout);
        }
        else if (opt_layout !== undefined && opt_ends) {
            _this.setFlatCoordinates(opt_layout, 
            /** @type {Array<number>} */ (coordinates));
            _this.ends_ = opt_ends;
        }
        else {
            var layout = _this.getLayout();
            var lineStrings = /** @type {Array<LineString>} */ (coordinates);
            var flatCoordinates = [];
            var ends = [];
            for (var i = 0, ii = lineStrings.length; i < ii; ++i) {
                var lineString = lineStrings[i];
                if (i === 0) {
                    layout = lineString.getLayout();
                }
                extend(flatCoordinates, lineString.getFlatCoordinates());
                ends.push(flatCoordinates.length);
            }
            _this.setFlatCoordinates(layout, flatCoordinates);
            _this.ends_ = ends;
        }
        return _this;
    }
    /**
     * Append the passed linestring to the multilinestring.
     * @param {LineString} lineString LineString.
     * @api
     */
    MultiLineString.prototype.appendLineString = function (lineString) {
        if (!this.flatCoordinates) {
            this.flatCoordinates = lineString.getFlatCoordinates().slice();
        }
        else {
            extend(this.flatCoordinates, lineString.getFlatCoordinates().slice());
        }
        this.ends_.push(this.flatCoordinates.length);
        this.changed();
    };
    /**
     * Make a complete copy of the geometry.
     * @return {!MultiLineString} Clone.
     * @api
     */
    MultiLineString.prototype.clone = function () {
        var multiLineString = new MultiLineString(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
        multiLineString.applyProperties(this);
        return multiLineString;
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    MultiLineString.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
            return minSquaredDistance;
        }
        if (this.maxDeltaRevision_ != this.getRevision()) {
            this.maxDelta_ = Math.sqrt(arrayMaxSquaredDelta(this.flatCoordinates, 0, this.ends_, this.stride, 0));
            this.maxDeltaRevision_ = this.getRevision();
        }
        return assignClosestArrayPoint(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, false, x, y, closestPoint, minSquaredDistance);
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
     * `opt_interpolate` controls interpolation between consecutive LineStrings
     * within the MultiLineString. If `opt_interpolate` is `true` the coordinates
     * will be linearly interpolated between the last coordinate of one LineString
     * and the first coordinate of the next LineString.  If `opt_interpolate` is
     * `false` then the function will return `null` for Ms falling between
     * LineStrings.
     *
     * @param {number} m M.
     * @param {boolean} [opt_extrapolate] Extrapolate. Default is `false`.
     * @param {boolean} [opt_interpolate] Interpolate. Default is `false`.
     * @return {import("../coordinate.js").Coordinate|null} Coordinate.
     * @api
     */
    MultiLineString.prototype.getCoordinateAtM = function (m, opt_extrapolate, opt_interpolate) {
        if ((this.layout != GeometryLayout.XYM &&
            this.layout != GeometryLayout.XYZM) ||
            this.flatCoordinates.length === 0) {
            return null;
        }
        var extrapolate = opt_extrapolate !== undefined ? opt_extrapolate : false;
        var interpolate = opt_interpolate !== undefined ? opt_interpolate : false;
        return lineStringsCoordinateAtM(this.flatCoordinates, 0, this.ends_, this.stride, m, extrapolate, interpolate);
    };
    /**
     * Return the coordinates of the multilinestring.
     * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
     * @api
     */
    MultiLineString.prototype.getCoordinates = function () {
        return inflateCoordinatesArray(this.flatCoordinates, 0, this.ends_, this.stride);
    };
    /**
     * @return {Array<number>} Ends.
     */
    MultiLineString.prototype.getEnds = function () {
        return this.ends_;
    };
    /**
     * Return the linestring at the specified index.
     * @param {number} index Index.
     * @return {LineString} LineString.
     * @api
     */
    MultiLineString.prototype.getLineString = function (index) {
        if (index < 0 || this.ends_.length <= index) {
            return null;
        }
        return new LineString(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
    };
    /**
     * Return the linestrings of this multilinestring.
     * @return {Array<LineString>} LineStrings.
     * @api
     */
    MultiLineString.prototype.getLineStrings = function () {
        var flatCoordinates = this.flatCoordinates;
        var ends = this.ends_;
        var layout = this.layout;
        /** @type {Array<LineString>} */
        var lineStrings = [];
        var offset = 0;
        for (var i = 0, ii = ends.length; i < ii; ++i) {
            var end = ends[i];
            var lineString = new LineString(flatCoordinates.slice(offset, end), layout);
            lineStrings.push(lineString);
            offset = end;
        }
        return lineStrings;
    };
    /**
     * @return {Array<number>} Flat midpoints.
     */
    MultiLineString.prototype.getFlatMidpoints = function () {
        var midpoints = [];
        var flatCoordinates = this.flatCoordinates;
        var offset = 0;
        var ends = this.ends_;
        var stride = this.stride;
        for (var i = 0, ii = ends.length; i < ii; ++i) {
            var end = ends[i];
            var midpoint = interpolatePoint(flatCoordinates, offset, end, stride, 0.5);
            extend(midpoints, midpoint);
            offset = end;
        }
        return midpoints;
    };
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {MultiLineString} Simplified MultiLineString.
     * @protected
     */
    MultiLineString.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
        var simplifiedFlatCoordinates = [];
        var simplifiedEnds = [];
        simplifiedFlatCoordinates.length = douglasPeuckerArray(this.flatCoordinates, 0, this.ends_, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0, simplifiedEnds);
        return new MultiLineString(simplifiedFlatCoordinates, GeometryLayout.XY, simplifiedEnds);
    };
    /**
     * Get the type of this geometry.
     * @return {import("./Geometry.js").Type} Geometry type.
     * @api
     */
    MultiLineString.prototype.getType = function () {
        return 'MultiLineString';
    };
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    MultiLineString.prototype.intersectsExtent = function (extent) {
        return intersectsLineStringArray(this.flatCoordinates, 0, this.ends_, this.stride, extent);
    };
    /**
     * Set the coordinates of the multilinestring.
     * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
     * @param {GeometryLayout} [opt_layout] Layout.
     * @api
     */
    MultiLineString.prototype.setCoordinates = function (coordinates, opt_layout) {
        this.setLayout(opt_layout, coordinates, 2);
        if (!this.flatCoordinates) {
            this.flatCoordinates = [];
        }
        var ends = deflateCoordinatesArray(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
        this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
        this.changed();
    };
    return MultiLineString;
}(SimpleGeometry));
export default MultiLineString;
//# sourceMappingURL=MultiLineString.js.map