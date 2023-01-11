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
 * @module ol/geom/SimpleGeometry
 */
import Geometry from './Geometry.js';
import GeometryLayout from './GeometryLayout.js';
import { abstract } from '../util.js';
import { createOrUpdateFromFlatCoordinates, getCenter } from '../extent.js';
import { rotate, scale, transform2D, translate } from './flat/transform.js';
/**
 * @classdesc
 * Abstract base class; only used for creating subclasses; do not instantiate
 * in apps, as cannot be rendered.
 *
 * @abstract
 * @api
 */
var SimpleGeometry = /** @class */ (function (_super) {
    __extends(SimpleGeometry, _super);
    function SimpleGeometry() {
        var _this = _super.call(this) || this;
        /**
         * @protected
         * @type {import("./GeometryLayout.js").default}
         */
        _this.layout = GeometryLayout.XY;
        /**
         * @protected
         * @type {number}
         */
        _this.stride = 2;
        /**
         * @protected
         * @type {Array<number>}
         */
        _this.flatCoordinates = null;
        return _this;
    }
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @protected
     * @return {import("../extent.js").Extent} extent Extent.
     */
    SimpleGeometry.prototype.computeExtent = function (extent) {
        return createOrUpdateFromFlatCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
    };
    /**
     * @abstract
     * @return {Array<*> | null} Coordinates.
     */
    SimpleGeometry.prototype.getCoordinates = function () {
        return abstract();
    };
    /**
     * Return the first coordinate of the geometry.
     * @return {import("../coordinate.js").Coordinate} First coordinate.
     * @api
     */
    SimpleGeometry.prototype.getFirstCoordinate = function () {
        return this.flatCoordinates.slice(0, this.stride);
    };
    /**
     * @return {Array<number>} Flat coordinates.
     */
    SimpleGeometry.prototype.getFlatCoordinates = function () {
        return this.flatCoordinates;
    };
    /**
     * Return the last coordinate of the geometry.
     * @return {import("../coordinate.js").Coordinate} Last point.
     * @api
     */
    SimpleGeometry.prototype.getLastCoordinate = function () {
        return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
    };
    /**
     * Return the {@link module:ol/geom/GeometryLayout layout} of the geometry.
     * @return {import("./GeometryLayout.js").default} Layout.
     * @api
     */
    SimpleGeometry.prototype.getLayout = function () {
        return this.layout;
    };
    /**
     * Create a simplified version of this geometry using the Douglas Peucker algorithm.
     * @param {number} squaredTolerance Squared tolerance.
     * @return {SimpleGeometry} Simplified geometry.
     */
    SimpleGeometry.prototype.getSimplifiedGeometry = function (squaredTolerance) {
        if (this.simplifiedGeometryRevision !== this.getRevision()) {
            this.simplifiedGeometryMaxMinSquaredTolerance = 0;
            this.simplifiedGeometryRevision = this.getRevision();
        }
        // If squaredTolerance is negative or if we know that simplification will not
        // have any effect then just return this.
        if (squaredTolerance < 0 ||
            (this.simplifiedGeometryMaxMinSquaredTolerance !== 0 &&
                squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance)) {
            return this;
        }
        var simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
        var simplifiedFlatCoordinates = simplifiedGeometry.getFlatCoordinates();
        if (simplifiedFlatCoordinates.length < this.flatCoordinates.length) {
            return simplifiedGeometry;
        }
        else {
            // Simplification did not actually remove any coordinates.  We now know
            // that any calls to getSimplifiedGeometry with a squaredTolerance less
            // than or equal to the current squaredTolerance will also not have any
            // effect.  This allows us to short circuit simplification (saving CPU
            // cycles) and prevents the cache of simplified geometries from filling
            // up with useless identical copies of this geometry (saving memory).
            this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
            return this;
        }
    };
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {SimpleGeometry} Simplified geometry.
     * @protected
     */
    SimpleGeometry.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
        return this;
    };
    /**
     * @return {number} Stride.
     */
    SimpleGeometry.prototype.getStride = function () {
        return this.stride;
    };
    /**
     * @param {import("./GeometryLayout.js").default} layout Layout.
     * @param {Array<number>} flatCoordinates Flat coordinates.
     */
    SimpleGeometry.prototype.setFlatCoordinates = function (layout, flatCoordinates) {
        this.stride = getStrideForLayout(layout);
        this.layout = layout;
        this.flatCoordinates = flatCoordinates;
    };
    /**
     * @abstract
     * @param {!Array<*>} coordinates Coordinates.
     * @param {import("./GeometryLayout.js").default} [opt_layout] Layout.
     */
    SimpleGeometry.prototype.setCoordinates = function (coordinates, opt_layout) {
        abstract();
    };
    /**
     * @param {import("./GeometryLayout.js").default|undefined} layout Layout.
     * @param {Array<*>} coordinates Coordinates.
     * @param {number} nesting Nesting.
     * @protected
     */
    SimpleGeometry.prototype.setLayout = function (layout, coordinates, nesting) {
        /** @type {number} */
        var stride;
        if (layout) {
            stride = getStrideForLayout(layout);
        }
        else {
            for (var i = 0; i < nesting; ++i) {
                if (coordinates.length === 0) {
                    this.layout = GeometryLayout.XY;
                    this.stride = 2;
                    return;
                }
                else {
                    coordinates = /** @type {Array} */ (coordinates[0]);
                }
            }
            stride = coordinates.length;
            layout = getLayoutForStride(stride);
        }
        this.layout = layout;
        this.stride = stride;
    };
    /**
     * Apply a transform function to the coordinates of the geometry.
     * The geometry is modified in place.
     * If you do not want the geometry modified in place, first `clone()` it and
     * then use this function on the clone.
     * @param {import("../proj.js").TransformFunction} transformFn Transform function.
     * Called with a flat array of geometry coordinates.
     * @api
     */
    SimpleGeometry.prototype.applyTransform = function (transformFn) {
        if (this.flatCoordinates) {
            transformFn(this.flatCoordinates, this.flatCoordinates, this.stride);
            this.changed();
        }
    };
    /**
     * Rotate the geometry around a given coordinate. This modifies the geometry
     * coordinates in place.
     * @param {number} angle Rotation angle in counter-clockwise radians.
     * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
     * @api
     */
    SimpleGeometry.prototype.rotate = function (angle, anchor) {
        var flatCoordinates = this.getFlatCoordinates();
        if (flatCoordinates) {
            var stride = this.getStride();
            rotate(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
            this.changed();
        }
    };
    /**
     * Scale the geometry (with an optional origin).  This modifies the geometry
     * coordinates in place.
     * @param {number} sx The scaling factor in the x-direction.
     * @param {number} [opt_sy] The scaling factor in the y-direction (defaults to sx).
     * @param {import("../coordinate.js").Coordinate} [opt_anchor] The scale origin (defaults to the center
     *     of the geometry extent).
     * @api
     */
    SimpleGeometry.prototype.scale = function (sx, opt_sy, opt_anchor) {
        var sy = opt_sy;
        if (sy === undefined) {
            sy = sx;
        }
        var anchor = opt_anchor;
        if (!anchor) {
            anchor = getCenter(this.getExtent());
        }
        var flatCoordinates = this.getFlatCoordinates();
        if (flatCoordinates) {
            var stride = this.getStride();
            scale(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
            this.changed();
        }
    };
    /**
     * Translate the geometry.  This modifies the geometry coordinates in place.  If
     * instead you want a new geometry, first `clone()` this geometry.
     * @param {number} deltaX Delta X.
     * @param {number} deltaY Delta Y.
     * @api
     */
    SimpleGeometry.prototype.translate = function (deltaX, deltaY) {
        var flatCoordinates = this.getFlatCoordinates();
        if (flatCoordinates) {
            var stride = this.getStride();
            translate(flatCoordinates, 0, flatCoordinates.length, stride, deltaX, deltaY, flatCoordinates);
            this.changed();
        }
    };
    return SimpleGeometry;
}(Geometry));
/**
 * @param {number} stride Stride.
 * @return {import("./GeometryLayout.js").default} layout Layout.
 */
function getLayoutForStride(stride) {
    var layout;
    if (stride == 2) {
        layout = GeometryLayout.XY;
    }
    else if (stride == 3) {
        layout = GeometryLayout.XYZ;
    }
    else if (stride == 4) {
        layout = GeometryLayout.XYZM;
    }
    return /** @type {import("./GeometryLayout.js").default} */ (layout);
}
/**
 * @param {import("./GeometryLayout.js").default} layout Layout.
 * @return {number} Stride.
 */
export function getStrideForLayout(layout) {
    var stride;
    if (layout == GeometryLayout.XY) {
        stride = 2;
    }
    else if (layout == GeometryLayout.XYZ || layout == GeometryLayout.XYM) {
        stride = 3;
    }
    else if (layout == GeometryLayout.XYZM) {
        stride = 4;
    }
    return /** @type {number} */ (stride);
}
/**
 * @param {SimpleGeometry} simpleGeometry Simple geometry.
 * @param {import("../transform.js").Transform} transform Transform.
 * @param {Array<number>} [opt_dest] Destination.
 * @return {Array<number>} Transformed flat coordinates.
 */
export function transformGeom2D(simpleGeometry, transform, opt_dest) {
    var flatCoordinates = simpleGeometry.getFlatCoordinates();
    if (!flatCoordinates) {
        return null;
    }
    else {
        var stride = simpleGeometry.getStride();
        return transform2D(flatCoordinates, 0, flatCoordinates.length, stride, transform, opt_dest);
    }
}
export default SimpleGeometry;
//# sourceMappingURL=SimpleGeometry.js.map