/**
 * @module ol/source/Cluster
 */
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
import EventType from '../events/EventType.js';
import Feature from '../Feature.js';
import GeometryType from '../geom/GeometryType.js';
import Point from '../geom/Point.js';
import VectorSource from './Vector.js';
import { add as addCoordinate, scale as scaleCoordinate } from '../coordinate.js';
import { assert } from '../asserts.js';
import { buffer, createEmpty, createOrUpdateFromCoordinate, getCenter, } from '../extent.js';
import { getUid } from '../util.js';
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [distance=20] Distance in pixels within which features will
 * be clustered together.
 * @property {number} [minDistance=0] Minimum distance in pixels between clusters.
 * Will be capped at the configured distance.
 * By default no minimum distance is guaranteed. This config can be used to avoid
 * overlapping icons. As a tradoff, the cluster feature's position will no longer be
 * the center of all its features.
 * @property {function(Feature):Point} [geometryFunction]
 * Function that takes an {@link module:ol/Feature} as argument and returns an
 * {@link module:ol/geom/Point} as cluster calculation point for the feature. When a
 * feature should not be considered for clustering, the function should return
 * `null`. The default, which works when the underlying source contains point
 * features only, is
 * ```js
 * function(feature) {
 *   return feature.getGeometry();
 * }
 * ```
 * See {@link module:ol/geom/Polygon~Polygon#getInteriorPoint} for a way to get a cluster
 * calculation point for polygons.
 * @property {function(Point, Array<Feature>):Feature} [createCluster]
 * Function that takes the cluster's center {@link module:ol/geom/Point} and an array
 * of {@link module:ol/Feature} included in this cluster. Must return a
 * {@link module:ol/Feature} that will be used to render. Default implementation is:
 * ```js
 * function(point, features) {
 *   return new Feature({
 *     geometry: point,
 *     features: features
 *   });
 * }
 * ```
 * @property {VectorSource} [source] Source.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 */
/**
 * @classdesc
 * Layer source to cluster vector data. Works out of the box with point
 * geometries. For other geometry types, or if not all geometries should be
 * considered for clustering, a custom `geometryFunction` can be defined.
 *
 * If the instance is disposed without also disposing the underlying
 * source `setSource(null)` has to be called to remove the listener reference
 * from the wrapped source.
 * @api
 */
var Cluster = /** @class */ (function (_super) {
    __extends(Cluster, _super);
    /**
     * @param {Options} options Cluster options.
     */
    function Cluster(options) {
        var _this = _super.call(this, {
            attributions: options.attributions,
            wrapX: options.wrapX,
        }) || this;
        /**
         * @type {number|undefined}
         * @protected
         */
        _this.resolution = undefined;
        /**
         * @type {number}
         * @protected
         */
        _this.distance = options.distance !== undefined ? options.distance : 20;
        /**
         * @type {number}
         * @protected
         */
        _this.minDistance = options.minDistance || 0;
        /**
         * @type {number}
         * @protected
         */
        _this.interpolationRatio = 0;
        /**
         * @type {Array<Feature>}
         * @protected
         */
        _this.features = [];
        /**
         * @param {Feature} feature Feature.
         * @return {Point} Cluster calculation point.
         * @protected
         */
        _this.geometryFunction =
            options.geometryFunction ||
                function (feature) {
                    var geometry = feature.getGeometry();
                    assert(geometry.getType() == GeometryType.POINT, 10); // The default `geometryFunction` can only handle `Point` geometries
                    return geometry;
                };
        /**
         * @type {function(Point, Array<Feature>):Feature}
         * @private
         */
        _this.createCustomCluster_ = options.createCluster;
        /**
         * @type {VectorSource}
         * @protected
         */
        _this.source = null;
        _this.boundRefresh_ = _this.refresh.bind(_this);
        _this.updateDistance(_this.distance, _this.minDistance);
        _this.setSource(options.source || null);
        return _this;
    }
    /**
     * Remove all features from the source.
     * @param {boolean} [opt_fast] Skip dispatching of {@link module:ol/source/Vector.VectorSourceEvent#removefeature} events.
     * @api
     */
    Cluster.prototype.clear = function (opt_fast) {
        this.features.length = 0;
        _super.prototype.clear.call(this, opt_fast);
    };
    /**
     * Get the distance in pixels between clusters.
     * @return {number} Distance.
     * @api
     */
    Cluster.prototype.getDistance = function () {
        return this.distance;
    };
    /**
     * Get a reference to the wrapped source.
     * @return {VectorSource} Source.
     * @api
     */
    Cluster.prototype.getSource = function () {
        return this.source;
    };
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {import("../proj/Projection.js").default} projection Projection.
     */
    Cluster.prototype.loadFeatures = function (extent, resolution, projection) {
        this.source.loadFeatures(extent, resolution, projection);
        if (resolution !== this.resolution) {
            this.resolution = resolution;
            this.refresh();
        }
    };
    /**
     * Set the distance within which features will be clusterd together.
     * @param {number} distance The distance in pixels.
     * @api
     */
    Cluster.prototype.setDistance = function (distance) {
        this.updateDistance(distance, this.minDistance);
    };
    /**
     * Set the minimum distance between clusters. Will be capped at the
     * configured distance.
     * @param {number} minDistance The minimum distance in pixels.
     * @api
     */
    Cluster.prototype.setMinDistance = function (minDistance) {
        this.updateDistance(this.distance, minDistance);
    };
    /**
     * The configured minimum distance between clusters.
     * @return {number} The minimum distance in pixels.
     * @api
     */
    Cluster.prototype.getMinDistance = function () {
        return this.minDistance;
    };
    /**
     * Replace the wrapped source.
     * @param {VectorSource} source The new source for this instance.
     * @api
     */
    Cluster.prototype.setSource = function (source) {
        if (this.source) {
            this.source.removeEventListener(EventType.CHANGE, this.boundRefresh_);
        }
        this.source = source;
        if (source) {
            source.addEventListener(EventType.CHANGE, this.boundRefresh_);
        }
        this.refresh();
    };
    /**
     * Handle the source changing.
     */
    Cluster.prototype.refresh = function () {
        this.clear();
        this.cluster();
        this.addFeatures(this.features);
    };
    /**
     * Update the distances and refresh the source if necessary.
     * @param {number} distance The new distance.
     * @param {number} minDistance The new minimum distance.
     */
    Cluster.prototype.updateDistance = function (distance, minDistance) {
        var ratio = distance === 0 ? 0 : Math.min(minDistance, distance) / distance;
        var changed = distance !== this.distance || this.interpolationRatio !== ratio;
        this.distance = distance;
        this.minDistance = minDistance;
        this.interpolationRatio = ratio;
        if (changed) {
            this.refresh();
        }
    };
    /**
     * @protected
     */
    Cluster.prototype.cluster = function () {
        if (this.resolution === undefined || !this.source) {
            return;
        }
        var extent = createEmpty();
        var mapDistance = this.distance * this.resolution;
        var features = this.source.getFeatures();
        /** @type {Object<string, true>} */
        var clustered = {};
        for (var i = 0, ii = features.length; i < ii; i++) {
            var feature = features[i];
            if (!(getUid(feature) in clustered)) {
                var geometry = this.geometryFunction(feature);
                if (geometry) {
                    var coordinates = geometry.getCoordinates();
                    createOrUpdateFromCoordinate(coordinates, extent);
                    buffer(extent, mapDistance, extent);
                    var neighbors = this.source
                        .getFeaturesInExtent(extent)
                        .filter(function (neighbor) {
                        var uid = getUid(neighbor);
                        if (uid in clustered) {
                            return false;
                        }
                        clustered[uid] = true;
                        return true;
                    });
                    this.features.push(this.createCluster(neighbors, extent));
                }
            }
        }
    };
    /**
     * @param {Array<Feature>} features Features
     * @param {import("../extent.js").Extent} extent The searched extent for these features.
     * @return {Feature} The cluster feature.
     * @protected
     */
    Cluster.prototype.createCluster = function (features, extent) {
        var centroid = [0, 0];
        for (var i = features.length - 1; i >= 0; --i) {
            var geometry_1 = this.geometryFunction(features[i]);
            if (geometry_1) {
                addCoordinate(centroid, geometry_1.getCoordinates());
            }
            else {
                features.splice(i, 1);
            }
        }
        scaleCoordinate(centroid, 1 / features.length);
        var searchCenter = getCenter(extent);
        var ratio = this.interpolationRatio;
        var geometry = new Point([
            centroid[0] * (1 - ratio) + searchCenter[0] * ratio,
            centroid[1] * (1 - ratio) + searchCenter[1] * ratio,
        ]);
        if (this.createCustomCluster_) {
            return this.createCustomCluster_(geometry, features);
        }
        else {
            return new Feature({
                geometry: geometry,
                features: features,
            });
        }
    };
    return Cluster;
}(VectorSource));
export default Cluster;
//# sourceMappingURL=Cluster.js.map