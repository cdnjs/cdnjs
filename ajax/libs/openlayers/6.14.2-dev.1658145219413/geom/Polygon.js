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
 * @module ol/geom/Polygon
 */
import GeometryLayout from './GeometryLayout.js';
import LinearRing from './LinearRing.js';
import Point from './Point.js';
import SimpleGeometry from './SimpleGeometry.js';
import { arrayMaxSquaredDelta, assignClosestArrayPoint } from './flat/closest.js';
import { closestSquaredDistanceXY, getCenter } from '../extent.js';
import { deflateCoordinatesArray } from './flat/deflate.js';
import { extend } from '../array.js';
import { getInteriorPointOfArray } from './flat/interiorpoint.js';
import { inflateCoordinatesArray } from './flat/inflate.js';
import { intersectsLinearRingArray } from './flat/intersectsextent.js';
import { linearRingsAreOriented, orientLinearRings } from './flat/orient.js';
import { linearRings as linearRingsArea } from './flat/area.js';
import { linearRingsContainsXY } from './flat/contains.js';
import { modulo } from '../math.js';
import { quantizeArray } from './flat/simplify.js';
import { offset as sphereOffset } from '../sphere.js';
/**
 * @classdesc
 * Polygon geometry.
 *
 * @api
 */
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    /**
     * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
     *     Array of linear rings that define the polygon. The first linear ring of the
     *     array defines the outer-boundary or surface of the polygon. Each subsequent
     *     linear ring defines a hole in the surface of the polygon. A linear ring is
     *     an array of vertices' coordinates where the first coordinate and the last are
     *     equivalent. (For internal use, flat coordinates in combination with
     *     `opt_layout` and `opt_ends` are also accepted.)
     * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
     * @param {Array<number>} [opt_ends] Ends (for internal use with flat coordinates).
     */
    function Polygon(coordinates, opt_layout, opt_ends) {
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
        _this.flatInteriorPointRevision_ = -1;
        /**
         * @private
         * @type {import("../coordinate.js").Coordinate}
         */
        _this.flatInteriorPoint_ = null;
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
        /**
         * @private
         * @type {number}
         */
        _this.orientedRevision_ = -1;
        /**
         * @private
         * @type {Array<number>}
         */
        _this.orientedFlatCoordinates_ = null;
        if (opt_layout !== undefined && opt_ends) {
            _this.setFlatCoordinates(opt_layout, 
            /** @type {Array<number>} */ (coordinates));
            _this.ends_ = opt_ends;
        }
        else {
            _this.setCoordinates(
            /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */ (coordinates), opt_layout);
        }
        return _this;
    }
    /**
     * Append the passed linear ring to this polygon.
     * @param {LinearRing} linearRing Linear ring.
     * @api
     */
    Polygon.prototype.appendLinearRing = function (linearRing) {
        if (!this.flatCoordinates) {
            this.flatCoordinates = linearRing.getFlatCoordinates().slice();
        }
        else {
            extend(this.flatCoordinates, linearRing.getFlatCoordinates());
        }
        this.ends_.push(this.flatCoordinates.length);
        this.changed();
    };
    /**
     * Make a complete copy of the geometry.
     * @return {!Polygon} Clone.
     * @api
     */
    Polygon.prototype.clone = function () {
        var polygon = new Polygon(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
        polygon.applyProperties(this);
        return polygon;
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    Polygon.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
            return minSquaredDistance;
        }
        if (this.maxDeltaRevision_ != this.getRevision()) {
            this.maxDelta_ = Math.sqrt(arrayMaxSquaredDelta(this.flatCoordinates, 0, this.ends_, this.stride, 0));
            this.maxDeltaRevision_ = this.getRevision();
        }
        return assignClosestArrayPoint(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @return {boolean} Contains (x, y).
     */
    Polygon.prototype.containsXY = function (x, y) {
        return linearRingsContainsXY(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, x, y);
    };
    /**
     * Return the area of the polygon on projected plane.
     * @return {number} Area (on projected plane).
     * @api
     */
    Polygon.prototype.getArea = function () {
        return linearRingsArea(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
    };
    /**
     * Get the coordinate array for this geometry.  This array has the structure
     * of a GeoJSON coordinate array for polygons.
     *
     * @param {boolean} [opt_right] Orient coordinates according to the right-hand
     *     rule (counter-clockwise for exterior and clockwise for interior rings).
     *     If `false`, coordinates will be oriented according to the left-hand rule
     *     (clockwise for exterior and counter-clockwise for interior rings).
     *     By default, coordinate orientation will depend on how the geometry was
     *     constructed.
     * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
     * @api
     */
    Polygon.prototype.getCoordinates = function (opt_right) {
        var flatCoordinates;
        if (opt_right !== undefined) {
            flatCoordinates = this.getOrientedFlatCoordinates().slice();
            orientLinearRings(flatCoordinates, 0, this.ends_, this.stride, opt_right);
        }
        else {
            flatCoordinates = this.flatCoordinates;
        }
        return inflateCoordinatesArray(flatCoordinates, 0, this.ends_, this.stride);
    };
    /**
     * @return {Array<number>} Ends.
     */
    Polygon.prototype.getEnds = function () {
        return this.ends_;
    };
    /**
     * @return {Array<number>} Interior point.
     */
    Polygon.prototype.getFlatInteriorPoint = function () {
        if (this.flatInteriorPointRevision_ != this.getRevision()) {
            var flatCenter = getCenter(this.getExtent());
            this.flatInteriorPoint_ = getInteriorPointOfArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, flatCenter, 0);
            this.flatInteriorPointRevision_ = this.getRevision();
        }
        return this.flatInteriorPoint_;
    };
    /**
     * Return an interior point of the polygon.
     * @return {Point} Interior point as XYM coordinate, where M is the
     * length of the horizontal intersection that the point belongs to.
     * @api
     */
    Polygon.prototype.getInteriorPoint = function () {
        return new Point(this.getFlatInteriorPoint(), GeometryLayout.XYM);
    };
    /**
     * Return the number of rings of the polygon,  this includes the exterior
     * ring and any interior rings.
     *
     * @return {number} Number of rings.
     * @api
     */
    Polygon.prototype.getLinearRingCount = function () {
        return this.ends_.length;
    };
    /**
     * Return the Nth linear ring of the polygon geometry. Return `null` if the
     * given index is out of range.
     * The exterior linear ring is available at index `0` and the interior rings
     * at index `1` and beyond.
     *
     * @param {number} index Index.
     * @return {LinearRing|null} Linear ring.
     * @api
     */
    Polygon.prototype.getLinearRing = function (index) {
        if (index < 0 || this.ends_.length <= index) {
            return null;
        }
        return new LinearRing(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
    };
    /**
     * Return the linear rings of the polygon.
     * @return {Array<LinearRing>} Linear rings.
     * @api
     */
    Polygon.prototype.getLinearRings = function () {
        var layout = this.layout;
        var flatCoordinates = this.flatCoordinates;
        var ends = this.ends_;
        var linearRings = [];
        var offset = 0;
        for (var i = 0, ii = ends.length; i < ii; ++i) {
            var end = ends[i];
            var linearRing = new LinearRing(flatCoordinates.slice(offset, end), layout);
            linearRings.push(linearRing);
            offset = end;
        }
        return linearRings;
    };
    /**
     * @return {Array<number>} Oriented flat coordinates.
     */
    Polygon.prototype.getOrientedFlatCoordinates = function () {
        if (this.orientedRevision_ != this.getRevision()) {
            var flatCoordinates = this.flatCoordinates;
            if (linearRingsAreOriented(flatCoordinates, 0, this.ends_, this.stride)) {
                this.orientedFlatCoordinates_ = flatCoordinates;
            }
            else {
                this.orientedFlatCoordinates_ = flatCoordinates.slice();
                this.orientedFlatCoordinates_.length = orientLinearRings(this.orientedFlatCoordinates_, 0, this.ends_, this.stride);
            }
            this.orientedRevision_ = this.getRevision();
        }
        return this.orientedFlatCoordinates_;
    };
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {Polygon} Simplified Polygon.
     * @protected
     */
    Polygon.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
        var simplifiedFlatCoordinates = [];
        var simplifiedEnds = [];
        simplifiedFlatCoordinates.length = quantizeArray(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEnds);
        return new Polygon(simplifiedFlatCoordinates, GeometryLayout.XY, simplifiedEnds);
    };
    /**
     * Get the type of this geometry.
     * @return {import("./Geometry.js").Type} Geometry type.
     * @api
     */
    Polygon.prototype.getType = function () {
        return 'Polygon';
    };
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    Polygon.prototype.intersectsExtent = function (extent) {
        return intersectsLinearRingArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, extent);
    };
    /**
     * Set the coordinates of the polygon.
     * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
     * @api
     */
    Polygon.prototype.setCoordinates = function (coordinates, opt_layout) {
        this.setLayout(opt_layout, coordinates, 2);
        if (!this.flatCoordinates) {
            this.flatCoordinates = [];
        }
        var ends = deflateCoordinatesArray(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
        this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
        this.changed();
    };
    return Polygon;
}(SimpleGeometry));
export default Polygon;
/**
 * Create an approximation of a circle on the surface of a sphere.
 * @param {import("../coordinate.js").Coordinate} center Center (`[lon, lat]` in degrees).
 * @param {number} radius The great-circle distance from the center to
 *     the polygon vertices in meters.
 * @param {number} [opt_n] Optional number of vertices for the resulting
 *     polygon. Default is `32`.
 * @param {number} [opt_sphereRadius] Optional radius for the sphere (defaults to
 *     the Earth's mean radius using the WGS84 ellipsoid).
 * @return {Polygon} The "circular" polygon.
 * @api
 */
export function circular(center, radius, opt_n, opt_sphereRadius) {
    var n = opt_n ? opt_n : 32;
    /** @type {Array<number>} */
    var flatCoordinates = [];
    for (var i = 0; i < n; ++i) {
        extend(flatCoordinates, sphereOffset(center, radius, (2 * Math.PI * i) / n, opt_sphereRadius));
    }
    flatCoordinates.push(flatCoordinates[0], flatCoordinates[1]);
    return new Polygon(flatCoordinates, GeometryLayout.XY, [
        flatCoordinates.length,
    ]);
}
/**
 * Create a polygon from an extent. The layout used is `XY`.
 * @param {import("../extent.js").Extent} extent The extent.
 * @return {Polygon} The polygon.
 * @api
 */
export function fromExtent(extent) {
    var minX = extent[0];
    var minY = extent[1];
    var maxX = extent[2];
    var maxY = extent[3];
    var flatCoordinates = [
        minX,
        minY,
        minX,
        maxY,
        maxX,
        maxY,
        maxX,
        minY,
        minX,
        minY,
    ];
    return new Polygon(flatCoordinates, GeometryLayout.XY, [
        flatCoordinates.length,
    ]);
}
/**
 * Create a regular polygon from a circle.
 * @param {import("./Circle.js").default} circle Circle geometry.
 * @param {number} [opt_sides] Number of sides of the polygon. Default is 32.
 * @param {number} [opt_angle] Start angle for the first vertex of the polygon in
 *     counter-clockwise radians. 0 means East. Default is 0.
 * @return {Polygon} Polygon geometry.
 * @api
 */
export function fromCircle(circle, opt_sides, opt_angle) {
    var sides = opt_sides ? opt_sides : 32;
    var stride = circle.getStride();
    var layout = circle.getLayout();
    var center = circle.getCenter();
    var arrayLength = stride * (sides + 1);
    var flatCoordinates = new Array(arrayLength);
    for (var i = 0; i < arrayLength; i += stride) {
        flatCoordinates[i] = 0;
        flatCoordinates[i + 1] = 0;
        for (var j = 2; j < stride; j++) {
            flatCoordinates[i + j] = center[j];
        }
    }
    var ends = [flatCoordinates.length];
    var polygon = new Polygon(flatCoordinates, layout, ends);
    makeRegular(polygon, center, circle.getRadius(), opt_angle);
    return polygon;
}
/**
 * Modify the coordinates of a polygon to make it a regular polygon.
 * @param {Polygon} polygon Polygon geometry.
 * @param {import("../coordinate.js").Coordinate} center Center of the regular polygon.
 * @param {number} radius Radius of the regular polygon.
 * @param {number} [opt_angle] Start angle for the first vertex of the polygon in
 *     counter-clockwise radians. 0 means East. Default is 0.
 */
export function makeRegular(polygon, center, radius, opt_angle) {
    var flatCoordinates = polygon.getFlatCoordinates();
    var stride = polygon.getStride();
    var sides = flatCoordinates.length / stride - 1;
    var startAngle = opt_angle ? opt_angle : 0;
    for (var i = 0; i <= sides; ++i) {
        var offset = i * stride;
        var angle = startAngle + (modulo(i, sides) * 2 * Math.PI) / sides;
        flatCoordinates[offset] = center[0] + radius * Math.cos(angle);
        flatCoordinates[offset + 1] = center[1] + radius * Math.sin(angle);
    }
    polygon.changed();
}
//# sourceMappingURL=Polygon.js.map