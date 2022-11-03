export default Cluster;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: string | string[] | ((arg0: import("../PluggableMap.js").FrameState) => string | string[]);
    /**
     * Distance in pixels within which features will
     * be clustered together.
     */
    distance?: number;
    /**
     * Minimum distance in pixels between clusters.
     * Will be capped at the configured distance.
     * By default no minimum distance is guaranteed. This config can be used to avoid
     * overlapping icons. As a tradoff, the cluster feature's position will no longer be
     * the center of all its features.
     */
    minDistance?: number;
    /**
     * Function that takes an {@link module:ol/Feature} as argument and returns an
     * {@link module:ol/geom/Point} as cluster calculation point for the feature. When a
     * feature should not be considered for clustering, the function should return
     * `null`. The default, which works when the underlying source contains point
     * features only, is
     * ```js
     * function(feature) {
     * return feature.getGeometry();
     * }
     * ```
     * See {@link module:ol/geom/Polygon~Polygon#getInteriorPoint} for a way to get a cluster
     * calculation point for polygons.
     */
    geometryFunction?: (arg0: Feature<any>) => Point;
    /**
     * Function that takes the cluster's center {@link module:ol/geom/Point} and an array
     * of {@link module:ol/Feature} included in this cluster. Must return a
     * {@link module:ol/Feature} that will be used to render. Default implementation is:
     * ```js
     * function(point, features) {
     * return new Feature({
     * geometry: point,
     * features: features
     * });
     * }
     * ```
     */
    createCluster?: (arg0: Point, arg1: Feature<any>[]) => Feature<any>;
    /**
     * Source.
     */
    source?: VectorSource<any>;
    /**
     * Whether to wrap the world horizontally.
     */
    wrapX?: boolean;
};
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
declare class Cluster extends VectorSource<any> {
    /**
     * @param {Options} options Cluster options.
     */
    constructor(options: Options);
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
     * @param {Feature} feature Feature.
     * @return {Point} Cluster calculation point.
     * @protected
     */
    protected geometryFunction: (arg0: Feature<any>) => Point;
    /**
     * @type {function(Point, Array<Feature>):Feature}
     * @private
     */
    private createCustomCluster_;
    /**
     * @type {VectorSource}
     * @protected
     */
    protected source: VectorSource;
    boundRefresh_: any;
    /**
     * Get the distance in pixels between clusters.
     * @return {number} Distance.
     * @api
     */
    getDistance(): number;
    /**
     * Get a reference to the wrapped source.
     * @return {VectorSource} Source.
     * @api
     */
    getSource(): VectorSource<any>;
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
     * @param {VectorSource} source The new source for this instance.
     * @api
     */
    setSource(source: VectorSource<any>): void;
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
     * @param {Array<Feature>} features Features
     * @param {import("../extent.js").Extent} extent The searched extent for these features.
     * @return {Feature} The cluster feature.
     * @protected
     */
    protected createCluster(features: Feature<any>[], extent: number[]): Feature<any>;
}
import Feature from "../Feature.js";
import Point from "../geom/Point.js";
import VectorSource from "./Vector.js";
//# sourceMappingURL=Cluster.d.ts.map