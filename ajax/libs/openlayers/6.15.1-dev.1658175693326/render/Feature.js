/**
 * @module ol/render/Feature
 */
import Feature from '../Feature.js';
import GeometryLayout from '../geom/GeometryLayout.js';
import { LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon, } from '../geom.js';
import { compose as composeTransform, create as createTransform, } from '../transform.js';
import { createOrUpdateFromCoordinate, createOrUpdateFromFlatCoordinates, getCenter, getHeight, } from '../extent.js';
import { extend } from '../array.js';
import { getInteriorPointOfArray, getInteriorPointsOfMultiArray, } from '../geom/flat/interiorpoint.js';
import { get as getProjection } from '../proj.js';
import { inflateEnds } from '../geom/flat/orient.js';
import { interpolatePoint } from '../geom/flat/interpolate.js';
import { linearRingss as linearRingssCenter } from '../geom/flat/center.js';
import { transform2D } from '../geom/flat/transform.js';
/**
 * @type {import("../transform.js").Transform}
 */
var tmpTransform = createTransform();
/**
 * Lightweight, read-only, {@link module:ol/Feature~Feature} and {@link module:ol/geom/Geometry~Geometry} like
 * structure, optimized for vector tile rendering and styling. Geometry access
 * through the API is limited to getting the type and extent of the geometry.
 */
var RenderFeature = /** @class */ (function () {
    /**
     * @param {import("../geom/Geometry.js").Type} type Geometry type.
     * @param {Array<number>} flatCoordinates Flat coordinates. These always need
     *     to be right-handed for polygons.
     * @param {Array<number>|Array<Array<number>>} ends Ends or Endss.
     * @param {Object<string, *>} properties Properties.
     * @param {number|string|undefined} id Feature id.
     */
    function RenderFeature(type, flatCoordinates, ends, properties, id) {
        /**
         * @type {import("../style/Style.js").StyleFunction|undefined}
         */
        this.styleFunction;
        /**
         * @private
         * @type {import("../extent.js").Extent|undefined}
         */
        this.extent_;
        /**
         * @private
         * @type {number|string|undefined}
         */
        this.id_ = id;
        /**
         * @private
         * @type {import("../geom/Geometry.js").Type}
         */
        this.type_ = type;
        /**
         * @private
         * @type {Array<number>}
         */
        this.flatCoordinates_ = flatCoordinates;
        /**
         * @private
         * @type {Array<number>}
         */
        this.flatInteriorPoints_ = null;
        /**
         * @private
         * @type {Array<number>}
         */
        this.flatMidpoints_ = null;
        /**
         * @private
         * @type {Array<number>|Array<Array<number>>}
         */
        this.ends_ = ends;
        /**
         * @private
         * @type {Object<string, *>}
         */
        this.properties_ = properties;
    }
    /**
     * Get a feature property by its key.
     * @param {string} key Key
     * @return {*} Value for the requested key.
     * @api
     */
    RenderFeature.prototype.get = function (key) {
        return this.properties_[key];
    };
    /**
     * Get the extent of this feature's geometry.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    RenderFeature.prototype.getExtent = function () {
        if (!this.extent_) {
            this.extent_ =
                this.type_ === 'Point'
                    ? createOrUpdateFromCoordinate(this.flatCoordinates_)
                    : createOrUpdateFromFlatCoordinates(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2);
        }
        return this.extent_;
    };
    /**
     * @return {Array<number>} Flat interior points.
     */
    RenderFeature.prototype.getFlatInteriorPoint = function () {
        if (!this.flatInteriorPoints_) {
            var flatCenter = getCenter(this.getExtent());
            this.flatInteriorPoints_ = getInteriorPointOfArray(this.flatCoordinates_, 0, 
            /** @type {Array<number>} */ (this.ends_), 2, flatCenter, 0);
        }
        return this.flatInteriorPoints_;
    };
    /**
     * @return {Array<number>} Flat interior points.
     */
    RenderFeature.prototype.getFlatInteriorPoints = function () {
        if (!this.flatInteriorPoints_) {
            var flatCenters = linearRingssCenter(this.flatCoordinates_, 0, 
            /** @type {Array<Array<number>>} */ (this.ends_), 2);
            this.flatInteriorPoints_ = getInteriorPointsOfMultiArray(this.flatCoordinates_, 0, 
            /** @type {Array<Array<number>>} */ (this.ends_), 2, flatCenters);
        }
        return this.flatInteriorPoints_;
    };
    /**
     * @return {Array<number>} Flat midpoint.
     */
    RenderFeature.prototype.getFlatMidpoint = function () {
        if (!this.flatMidpoints_) {
            this.flatMidpoints_ = interpolatePoint(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2, 0.5);
        }
        return this.flatMidpoints_;
    };
    /**
     * @return {Array<number>} Flat midpoints.
     */
    RenderFeature.prototype.getFlatMidpoints = function () {
        if (!this.flatMidpoints_) {
            this.flatMidpoints_ = [];
            var flatCoordinates = this.flatCoordinates_;
            var offset = 0;
            var ends = /** @type {Array<number>} */ (this.ends_);
            for (var i = 0, ii = ends.length; i < ii; ++i) {
                var end = ends[i];
                var midpoint = interpolatePoint(flatCoordinates, offset, end, 2, 0.5);
                extend(this.flatMidpoints_, midpoint);
                offset = end;
            }
        }
        return this.flatMidpoints_;
    };
    /**
     * Get the feature identifier.  This is a stable identifier for the feature and
     * is set when reading data from a remote source.
     * @return {number|string|undefined} Id.
     * @api
     */
    RenderFeature.prototype.getId = function () {
        return this.id_;
    };
    /**
     * @return {Array<number>} Flat coordinates.
     */
    RenderFeature.prototype.getOrientedFlatCoordinates = function () {
        return this.flatCoordinates_;
    };
    /**
     * For API compatibility with {@link module:ol/Feature~Feature}, this method is useful when
     * determining the geometry type in style function (see {@link #getType}).
     * @return {RenderFeature} Feature.
     * @api
     */
    RenderFeature.prototype.getGeometry = function () {
        return this;
    };
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {RenderFeature} Simplified geometry.
     */
    RenderFeature.prototype.getSimplifiedGeometry = function (squaredTolerance) {
        return this;
    };
    /**
     * Get a transformed and simplified version of the geometry.
     * @abstract
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../proj.js").TransformFunction} [opt_transform] Optional transform function.
     * @return {RenderFeature} Simplified geometry.
     */
    RenderFeature.prototype.simplifyTransformed = function (squaredTolerance, opt_transform) {
        return this;
    };
    /**
     * Get the feature properties.
     * @return {Object<string, *>} Feature properties.
     * @api
     */
    RenderFeature.prototype.getProperties = function () {
        return this.properties_;
    };
    /**
     * @return {number} Stride.
     */
    RenderFeature.prototype.getStride = function () {
        return 2;
    };
    /**
     * @return {import('../style/Style.js').StyleFunction|undefined} Style
     */
    RenderFeature.prototype.getStyleFunction = function () {
        return this.styleFunction;
    };
    /**
     * Get the type of this feature's geometry.
     * @return {import("../geom/Geometry.js").Type} Geometry type.
     * @api
     */
    RenderFeature.prototype.getType = function () {
        return this.type_;
    };
    /**
     * Transform geometry coordinates from tile pixel space to projected.
     *
     * @param {import("../proj.js").ProjectionLike} projection The data projection
     */
    RenderFeature.prototype.transform = function (projection) {
        projection = getProjection(projection);
        var pixelExtent = projection.getExtent();
        var projectedExtent = projection.getWorldExtent();
        if (pixelExtent && projectedExtent) {
            var scale = getHeight(projectedExtent) / getHeight(pixelExtent);
            composeTransform(tmpTransform, projectedExtent[0], projectedExtent[3], scale, -scale, 0, 0, 0);
            transform2D(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2, tmpTransform, this.flatCoordinates_);
        }
    };
    /**
     * @return {Array<number>|Array<Array<number>>} Ends or endss.
     */
    RenderFeature.prototype.getEnds = function () {
        return this.ends_;
    };
    return RenderFeature;
}());
RenderFeature.prototype.getEndss = RenderFeature.prototype.getEnds;
/**
 * @return {Array<number>} Flat coordinates.
 */
RenderFeature.prototype.getFlatCoordinates =
    RenderFeature.prototype.getOrientedFlatCoordinates;
/**
 * Create a geometry from an `ol/render/Feature`
 * @param {RenderFeature} renderFeature
 * Render Feature
 * @return {Point|MultiPoint|LineString|MultiLineString|Polygon|MultiPolygon}
 * New geometry instance.
 * @api
 */
export function toGeometry(renderFeature) {
    var geometryType = renderFeature.getType();
    switch (geometryType) {
        case 'Point':
            return new Point(renderFeature.getFlatCoordinates());
        case 'MultiPoint':
            return new MultiPoint(renderFeature.getFlatCoordinates(), GeometryLayout.XY);
        case 'LineString':
            return new LineString(renderFeature.getFlatCoordinates(), GeometryLayout.XY);
        case 'MultiLineString':
            return new MultiLineString(renderFeature.getFlatCoordinates(), GeometryLayout.XY, 
            /** @type {Array<number>} */ (renderFeature.getEnds()));
        case 'Polygon':
            var flatCoordinates = renderFeature.getFlatCoordinates();
            var ends = /** @type {Array<number>} */ (renderFeature.getEnds());
            var endss = inflateEnds(flatCoordinates, ends);
            return endss.length > 1
                ? new MultiPolygon(flatCoordinates, GeometryLayout.XY, endss)
                : new Polygon(flatCoordinates, GeometryLayout.XY, ends);
        default:
            throw new Error('Invalid geometry type:' + geometryType);
    }
}
/**
 * Create an `ol/Feature` from an `ol/render/Feature`
 * @param {RenderFeature} renderFeature RenderFeature
 * @param {string} [opt_geometryName='geometry'] Geometry name to use
 * when creating the Feature.
 * @return {Feature} Newly constructed `ol/Feature` with properties,
 * geometry, and id copied over.
 * @api
 */
export function toFeature(renderFeature, opt_geometryName) {
    var id = renderFeature.getId();
    var geometry = toGeometry(renderFeature);
    var properties = renderFeature.getProperties();
    var feature = new Feature();
    if (opt_geometryName !== undefined) {
        feature.setGeometryName(opt_geometryName);
    }
    feature.setGeometry(geometry);
    if (id !== undefined) {
        feature.setId(id);
    }
    feature.setProperties(properties, true);
    return feature;
}
export default RenderFeature;
//# sourceMappingURL=Feature.js.map