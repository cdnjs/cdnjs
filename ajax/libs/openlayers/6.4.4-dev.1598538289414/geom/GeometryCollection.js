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
 * @module ol/geom/GeometryCollection
 */
import EventType from '../events/EventType.js';
import Geometry from './Geometry.js';
import GeometryType from './GeometryType.js';
import { closestSquaredDistanceXY, createOrUpdateEmpty, extend, getCenter, } from '../extent.js';
import { listen, unlistenByKey } from '../events.js';
/**
 * @classdesc
 * An array of {@link module:ol/geom/Geometry} objects.
 *
 * @api
 */
var GeometryCollection = /** @class */ (function (_super) {
    __extends(GeometryCollection, _super);
    /**
     * @param {Array<Geometry>=} opt_geometries Geometries.
     */
    function GeometryCollection(opt_geometries) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {Array<Geometry>}
         */
        _this.geometries_ = opt_geometries ? opt_geometries : null;
        /**
         * @type {Array<import("../events.js").EventsKey>}
         */
        _this.changeEventsKeys_ = [];
        _this.listenGeometriesChange_();
        return _this;
    }
    /**
     * @private
     */
    GeometryCollection.prototype.unlistenGeometriesChange_ = function () {
        this.changeEventsKeys_.forEach(unlistenByKey);
        this.changeEventsKeys_.length = 0;
    };
    /**
     * @private
     */
    GeometryCollection.prototype.listenGeometriesChange_ = function () {
        if (!this.geometries_) {
            return;
        }
        for (var i = 0, ii = this.geometries_.length; i < ii; ++i) {
            this.changeEventsKeys_.push(listen(this.geometries_[i], EventType.CHANGE, this.changed, this));
        }
    };
    /**
     * Make a complete copy of the geometry.
     * @return {!GeometryCollection} Clone.
     * @api
     */
    GeometryCollection.prototype.clone = function () {
        var geometryCollection = new GeometryCollection(null);
        geometryCollection.setGeometries(this.geometries_);
        geometryCollection.applyProperties(this);
        return geometryCollection;
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
     * @param {number} minSquaredDistance Minimum squared distance.
     * @return {number} Minimum squared distance.
     */
    GeometryCollection.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
            return minSquaredDistance;
        }
        var geometries = this.geometries_;
        for (var i = 0, ii = geometries.length; i < ii; ++i) {
            minSquaredDistance = geometries[i].closestPointXY(x, y, closestPoint, minSquaredDistance);
        }
        return minSquaredDistance;
    };
    /**
     * @param {number} x X.
     * @param {number} y Y.
     * @return {boolean} Contains (x, y).
     */
    GeometryCollection.prototype.containsXY = function (x, y) {
        var geometries = this.geometries_;
        for (var i = 0, ii = geometries.length; i < ii; ++i) {
            if (geometries[i].containsXY(x, y)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @protected
     * @return {import("../extent.js").Extent} extent Extent.
     */
    GeometryCollection.prototype.computeExtent = function (extent) {
        createOrUpdateEmpty(extent);
        var geometries = this.geometries_;
        for (var i = 0, ii = geometries.length; i < ii; ++i) {
            extend(extent, geometries[i].getExtent());
        }
        return extent;
    };
    /**
     * Return the geometries that make up this geometry collection.
     * @return {Array<Geometry>} Geometries.
     * @api
     */
    GeometryCollection.prototype.getGeometries = function () {
        return cloneGeometries(this.geometries_);
    };
    /**
     * @return {Array<Geometry>} Geometries.
     */
    GeometryCollection.prototype.getGeometriesArray = function () {
        return this.geometries_;
    };
    /**
     * @return {Array<Geometry>} Geometries.
     */
    GeometryCollection.prototype.getGeometriesArrayRecursive = function () {
        /** @type {Array<Geometry>} */
        var geometriesArray = [];
        var geometries = this.geometries_;
        for (var i = 0, ii = geometries.length; i < ii; ++i) {
            if (geometries[i].getType() === this.getType()) {
                geometriesArray = geometriesArray.concat(
                /** @type {GeometryCollection} */ (geometries[i]).getGeometriesArrayRecursive());
            }
            else {
                geometriesArray.push(geometries[i]);
            }
        }
        return geometriesArray;
    };
    /**
     * Create a simplified version of this geometry using the Douglas Peucker algorithm.
     * @param {number} squaredTolerance Squared tolerance.
     * @return {GeometryCollection} Simplified GeometryCollection.
     */
    GeometryCollection.prototype.getSimplifiedGeometry = function (squaredTolerance) {
        if (this.simplifiedGeometryRevision !== this.getRevision()) {
            this.simplifiedGeometryMaxMinSquaredTolerance = 0;
            this.simplifiedGeometryRevision = this.getRevision();
        }
        if (squaredTolerance < 0 ||
            (this.simplifiedGeometryMaxMinSquaredTolerance !== 0 &&
                squaredTolerance < this.simplifiedGeometryMaxMinSquaredTolerance)) {
            return this;
        }
        var simplifiedGeometries = [];
        var geometries = this.geometries_;
        var simplified = false;
        for (var i = 0, ii = geometries.length; i < ii; ++i) {
            var geometry = geometries[i];
            var simplifiedGeometry = geometry.getSimplifiedGeometry(squaredTolerance);
            simplifiedGeometries.push(simplifiedGeometry);
            if (simplifiedGeometry !== geometry) {
                simplified = true;
            }
        }
        if (simplified) {
            var simplifiedGeometryCollection = new GeometryCollection(null);
            simplifiedGeometryCollection.setGeometriesArray(simplifiedGeometries);
            return simplifiedGeometryCollection;
        }
        else {
            this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
            return this;
        }
    };
    /**
     * Get the type of this geometry.
     * @return {import("./GeometryType.js").default} Geometry type.
     * @api
     */
    GeometryCollection.prototype.getType = function () {
        return GeometryType.GEOMETRY_COLLECTION;
    };
    /**
     * Test if the geometry and the passed extent intersect.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {boolean} `true` if the geometry and the extent intersect.
     * @api
     */
    GeometryCollection.prototype.intersectsExtent = function (extent) {
        var geometries = this.geometries_;
        for (var i = 0, ii = geometries.length; i < ii; ++i) {
            if (geometries[i].intersectsExtent(extent)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @return {boolean} Is empty.
     */
    GeometryCollection.prototype.isEmpty = function () {
        return this.geometries_.length === 0;
    };
    /**
     * Rotate the geometry around a given coordinate. This modifies the geometry
     * coordinates in place.
     * @param {number} angle Rotation angle in radians.
     * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
     * @api
     */
    GeometryCollection.prototype.rotate = function (angle, anchor) {
        var geometries = this.geometries_;
        for (var i = 0, ii = geometries.length; i < ii; ++i) {
            geometries[i].rotate(angle, anchor);
        }
        this.changed();
    };
    /**
     * Scale the geometry (with an optional origin).  This modifies the geometry
     * coordinates in place.
     * @abstract
     * @param {number} sx The scaling factor in the x-direction.
     * @param {number=} opt_sy The scaling factor in the y-direction (defaults to sx).
     * @param {import("../coordinate.js").Coordinate=} opt_anchor The scale origin (defaults to the center
     *     of the geometry extent).
     * @api
     */
    GeometryCollection.prototype.scale = function (sx, opt_sy, opt_anchor) {
        var anchor = opt_anchor;
        if (!anchor) {
            anchor = getCenter(this.getExtent());
        }
        var geometries = this.geometries_;
        for (var i = 0, ii = geometries.length; i < ii; ++i) {
            geometries[i].scale(sx, opt_sy, anchor);
        }
        this.changed();
    };
    /**
     * Set the geometries that make up this geometry collection.
     * @param {Array<Geometry>} geometries Geometries.
     * @api
     */
    GeometryCollection.prototype.setGeometries = function (geometries) {
        this.setGeometriesArray(cloneGeometries(geometries));
    };
    /**
     * @param {Array<Geometry>} geometries Geometries.
     */
    GeometryCollection.prototype.setGeometriesArray = function (geometries) {
        this.unlistenGeometriesChange_();
        this.geometries_ = geometries;
        this.listenGeometriesChange_();
        this.changed();
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
    GeometryCollection.prototype.applyTransform = function (transformFn) {
        var geometries = this.geometries_;
        for (var i = 0, ii = geometries.length; i < ii; ++i) {
            geometries[i].applyTransform(transformFn);
        }
        this.changed();
    };
    /**
     * Translate the geometry.  This modifies the geometry coordinates in place.  If
     * instead you want a new geometry, first `clone()` this geometry.
     * @param {number} deltaX Delta X.
     * @param {number} deltaY Delta Y.
     * @api
     */
    GeometryCollection.prototype.translate = function (deltaX, deltaY) {
        var geometries = this.geometries_;
        for (var i = 0, ii = geometries.length; i < ii; ++i) {
            geometries[i].translate(deltaX, deltaY);
        }
        this.changed();
    };
    /**
     * Clean up.
     */
    GeometryCollection.prototype.disposeInternal = function () {
        this.unlistenGeometriesChange_();
        _super.prototype.disposeInternal.call(this);
    };
    return GeometryCollection;
}(Geometry));
/**
 * @param {Array<Geometry>} geometries Geometries.
 * @return {Array<Geometry>} Cloned geometries.
 */
function cloneGeometries(geometries) {
    var clonedGeometries = [];
    for (var i = 0, ii = geometries.length; i < ii; ++i) {
        clonedGeometries.push(geometries[i].clone());
    }
    return clonedGeometries;
}
export default GeometryCollection;
//# sourceMappingURL=GeometryCollection.js.map