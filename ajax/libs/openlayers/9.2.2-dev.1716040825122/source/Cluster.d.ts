export default Cluster;
export type Options<FeatureType extends import("../Feature.js").FeatureLike> = {
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike | undefined;
    /**
     * Distance in pixels within which features will
     * be clustered together.
     */
    distance?: number | undefined;
    /**
     * Minimum distance in pixels between clusters.
     * Will be capped at the configured distance.
     * By default no minimum distance is guaranteed. This config can be used to avoid
     * overlapping icons. As a tradoff, the cluster feature's position will no longer be
     * the center of all its features.
     */
    minDistance?: number | undefined;
    /**
     * Function that takes an {@link module :ol/Feature~Feature} as argument and returns an
     * {@link module :ol/geom/Point~Point} as cluster calculation point for the feature. When a
     * feature should not be considered for clustering, the function should return
     * `null`. The default, which works when the underlying source contains point
     * features only, is
     * ```js
     * function(feature) {
     * return feature.getGeometry();
     * }
     * ```
     * See {@link module :ol/geom/Polygon~Polygon#getInteriorPoint} for a way to get a cluster
     * calculation point for polygons.
     */
    geometryFunction?: ((arg0: FeatureType) => (Point)) | undefined;
    /**
     * Function that takes the cluster's center {@link module :ol/geom/Point~Point} and an array
     * of {@link module :ol/Feature~Feature} included in this cluster. Must return a
     * {@link module :ol/Feature~Feature} that will be used to render. Default implementation is:
     * ```js
     * function(point, features) {
     * return new Feature({
     * geometry: point,
     * features: features
     * });
     * }
     * ```
     */
    createCluster?: ((arg0: Point, arg1: Array<FeatureType>) => Feature) | undefined;
    /**
     * Source.
     */
    source?: VectorSource<FeatureType> | undefined;
    /**
     * Whether to wrap the world horizontally.
     */
    wrapX?: boolean | undefined;
};
/**
 * @template {import("../Feature.js").FeatureLike} FeatureType
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [distance=20] Distance in pixels within which features will
 * be clustered together.
 * @property {number} [minDistance=0] Minimum distance in pixels between clusters.
 * Will be capped at the configured distance.
 * By default no minimum distance is guaranteed. This config can be used to avoid
 * overlapping icons. As a tradoff, the cluster feature's position will no longer be
 * the center of all its features.
 * @property {function(FeatureType):(Point)} [geometryFunction]
 * Function that takes an {@link module:ol/Feature~Feature} as argument and returns an
 * {@link module:ol/geom/Point~Point} as cluster calculation point for the feature. When a
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
 * @property {function(Point, Array<FeatureType>):Feature} [createCluster]
 * Function that takes the cluster's center {@link module:ol/geom/Point~Point} and an array
 * of {@link module:ol/Feature~Feature} included in this cluster. Must return a
 * {@link module:ol/Feature~Feature} that will be used to render. Default implementation is:
 * ```js
 * function(point, features) {
 *   return new Feature({
 *     geometry: point,
 *     features: features
 *   });
 * }
 * ```
 * @property {VectorSource<FeatureType>} [source=null] Source.
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
 * @template {import('../Feature.js').FeatureLike} FeatureType
 * @extends {VectorSource<Feature<import("../geom/Geometry.js").default>>}
 */
declare class Cluster<FeatureType extends import("../Feature.js").FeatureLike> extends VectorSource<Feature<import("../geom/Geometry.js").default>> {
    /**
     * @param {Options<FeatureType>} [options] Cluster options.
     */
    constructor(options?: Options<FeatureType> | undefined);
    /**
     * @type {number|undefined}
     * @protected
     */
    protected resolution: number | undefined;
    /**
     * @type {number}
     * @protected
     */
    protected distance: number;
    /**
     * @type {number}
     * @protected
     */
    protected minDistance: number;
    /**
     * @type {number}
     * @protected
     */
    protected interpolationRatio: number;
    /**
     * @type {Array<Feature>}
     * @protected
     */
    protected features: Array<Feature>;
    /**
     * @param {FeatureType} feature Feature.
     * @return {Point} Cluster calculation point.
     * @protected
     */
    protected geometryFunction: (arg0: FeatureType) => (Point);
    /**
     * @type {function(Point, Array<FeatureType>):Feature}
     * @private
     */
    private createCustomCluster_;
    /**
     * @type {VectorSource<FeatureType>|null}
     * @protected
     */
    protected source: VectorSource<FeatureType> | null;
    /**
     * @private
     */
    private boundRefresh_;
    /**
     * Get the distance in pixels between clusters.
     * @return {number} Distance.
     * @api
     */
    getDistance(): number;
    /**
     * Get a reference to the wrapped source.
     * @return {VectorSource<FeatureType>|null} Source.
     * @api
     */
    getSource(): VectorSource<FeatureType> | null;
    /**
     * Set the distance within which features will be clusterd together.
     * @param {number} distance The distance in pixels.
     * @api
     */
    setDistance(distance: number): void;
    /**
     * Set the minimum distance between clusters. Will be capped at the
     * configured distance.
     * @param {number} minDistance The minimum distance in pixels.
     * @api
     */
    setMinDistance(minDistance: number): void;
    /**
     * The configured minimum distance between clusters.
     * @return {number} The minimum distance in pixels.
     * @api
     */
    getMinDistance(): number;
    /**
     * Replace the wrapped source.
     * @param {VectorSource<FeatureType>|null} source The new source for this instance.
     * @api
     */
    setSource(source: VectorSource<FeatureType> | null): void;
    /**
     * Update the distances and refresh the source if necessary.
     * @param {number} distance The new distance.
     * @param {number} minDistance The new minimum distance.
     */
    updateDistance(distance: number, minDistance: number): void;
    /**
     * @protected
     */
    protected cluster(): void;
    /**
     * @param {Array<FeatureType>} features Features
     * @param {import("../extent.js").Extent} extent The searched extent for these features.
     * @return {Feature} The cluster feature.
     * @protected
     */
    protected createCluster(features: Array<FeatureType>, extent: import("../extent.js").Extent): Feature;
}
import Point from '../geom/Point.js';
import Feature from '../Feature.js';
import VectorSource from './Vector.js';
//# sourceMappingURL=Cluster.d.ts.map