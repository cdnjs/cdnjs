export default Cluster;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: string | string[] | ((arg0: import("../PluggableMap.js").FrameState) => string | string[]);
    /**
     * Minimum distance in pixels between clusters.
     */
    distance?: number;
    /**
     * Function that takes an {@link module:ol/Feature} as argument and returns an
     * {@link module:ol/geom/Point} as cluster calculation point for the feature. When a
     * feature should not be considered for clustering, the function should return
     * `null`. The default, which works when the underyling source contains point
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
 * @property {number} [distance=20] Minimum distance in pixels between clusters.
 * @property {function(Feature):Point} [geometryFunction]
 * Function that takes an {@link module:ol/Feature} as argument and returns an
 * {@link module:ol/geom/Point} as cluster calculation point for the feature. When a
 * feature should not be considered for clustering, the function should return
 * `null`. The default, which works when the underyling source contains point
 * features only, is
 * ```js
 * function(feature) {
 *   return feature.getGeometry();
 * }
 * ```
 * See {@link module:ol/geom/Polygon~Polygon#getInteriorPoint} for a way to get a cluster
 * calculation point for polygons.
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
    boundRefresh_: any;
    /**
     * @override
     */
    clear(opt_fast: any): void;
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
     * @inheritDoc
     */
    loadFeatures(extent: any, resolution: any, projection: any): void;
    /**
     * Set the distance in pixels between clusters.
     * @param {number} distance The distance in pixels.
     * @api
     */
    setDistance(distance: number): void;
    /**
     * Replace the wrapped source.
     * @param {VectorSource} source The new source for this instance.
     * @api
     */
    setSource(source: VectorSource<any>): void;
    source: VectorSource<any>;
    /**
     * @protected
     */
    protected cluster(): void;
    /**
     * @param {Array<Feature>} features Features
     * @return {Feature} The cluster feature.
     * @protected
     */
    protected createCluster(features: Feature<any>[]): Feature<any>;
}
import Feature from "../Feature.js";
import Point from "../geom/Point.js";
import VectorSource from "./Vector.js";
//# sourceMappingURL=Cluster.d.ts.map