export default GPX;
export type Options = {
    /**
     * Callback function
     * to process `extensions` nodes. To prevent memory leaks, this callback function must
     * not store any references to the node. Note that the `extensions`
     * node is not allowed in GPX 1.0. Moreover, only `extensions`
     * nodes from `wpt`, `rte` and `trk` can be processed, as those are
     * directly mapped to a feature.
     */
    readExtensions?: (arg0: Feature<any>, arg1: Node) => any;
};
export type LayoutOptions = {
    hasZ?: boolean;
    hasM?: boolean;
};
/**
 * @typedef {Object} Options
 * @property {function(Feature, Node)} [readExtensions] Callback function
 * to process `extensions` nodes. To prevent memory leaks, this callback function must
 * not store any references to the node. Note that the `extensions`
 * node is not allowed in GPX 1.0. Moreover, only `extensions`
 * nodes from `wpt`, `rte` and `trk` can be processed, as those are
 * directly mapped to a feature.
 */
/**
 * @typedef {Object} LayoutOptions
 * @property {boolean} [hasZ]
 * @property {boolean} [hasM]
 */
/**
 * @classdesc
 * Feature format for reading and writing data in the GPX format.
 *
 * Note that {@link module:ol/format/GPX~GPX#readFeature} only reads the first
 * feature of the source.
 *
 * When reading, routes (`<rte>`) are converted into LineString geometries, and
 * tracks (`<trk>`) into MultiLineString. Any properties on route and track
 * waypoints are ignored.
 *
 * When writing, LineString geometries are output as routes (`<rte>`), and
 * MultiLineString as tracks (`<trk>`).
 *
 * @api
 */
declare class GPX extends XMLFeature {
    /**
     * @param {Options=} opt_options Options.
     */
    constructor(opt_options?: Options);
    /**
     * @type {function(Feature, Node): void|undefined}
     * @private
     */
    private readExtensions_;
    /**
     * @param {Array<Feature>} features List of features.
     * @private
     */
    private handleReadExtensions_;
    /**
     * @inheritDoc
     */
    readFeatureFromNode(node: any, opt_options: any): Feature<any>;
    /**
     * @inheritDoc
     */
    readFeaturesFromNode(node: any, opt_options: any): Feature<any>[];
}
import Feature from "../Feature.js";
import XMLFeature from "./XMLFeature.js";
//# sourceMappingURL=GPX.d.ts.map