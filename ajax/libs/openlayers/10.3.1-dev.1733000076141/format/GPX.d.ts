export default GPX;
export type GPXLink = {
    /**
     * text
     */
    text?: string | undefined;
    /**
     * type
     */
    type?: string | undefined;
};
export type GPXAuthor = {
    /**
     * name
     */
    name?: string | undefined;
    /**
     * email
     */
    email?: string | undefined;
    /**
     * link
     */
    link?: GPXLink | undefined;
};
export type GPXMetadata = {
    /**
     * name
     */
    name?: string | undefined;
    /**
     * desc
     */
    desc?: string | undefined;
    /**
     * author
     */
    author?: GPXAuthor | undefined;
    /**
     * link
     */
    link?: GPXLink | undefined;
    /**
     * time
     */
    time?: number | undefined;
    /**
     * keywords
     */
    keywords?: string | undefined;
    /**
     * bounds
     */
    bounds?: number[] | undefined;
    /**
     * extensions
     */
    extensions?: any;
};
export type GPXCopyright = {
    /**
     * author
     */
    author?: string | undefined;
    /**
     * year
     */
    year?: number | undefined;
    /**
     * license
     */
    license?: string | undefined;
};
export type Options = {
    /**
     * Callback function
     * to process `extensions` nodes. To prevent memory leaks, this callback function must
     * not store any references to the node. Note that the `extensions`
     * node is not allowed in GPX 1.0. Moreover, only `extensions`
     * nodes from `wpt`, `rte` and `trk` can be processed, as those are
     * directly mapped to a feature.
     */
    readExtensions?: ((arg0: Feature, arg1: Node) => void) | undefined;
};
export type LayoutOptions = {
    /**
     * HasZ.
     */
    hasZ?: boolean | undefined;
    /**
     * HasM.
     */
    hasM?: boolean | undefined;
};
/**
 * @typedef {Object} Options
 * @property {function(Feature, Node):void} [readExtensions] Callback function
 * to process `extensions` nodes. To prevent memory leaks, this callback function must
 * not store any references to the node. Note that the `extensions`
 * node is not allowed in GPX 1.0. Moreover, only `extensions`
 * nodes from `wpt`, `rte` and `trk` can be processed, as those are
 * directly mapped to a feature.
 */
/**
 * @typedef {Object} LayoutOptions
 * @property {boolean} [hasZ] HasZ.
 * @property {boolean} [hasM] HasM.
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
     * @param {Options} [options] Options.
     */
    constructor(options?: Options);
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
     * Reads a GPX file's metadata tag, reading among other things:
     *   - the name and description of this GPX
     *   - its author
     *   - the copyright associated with this GPX file
     *
     * Will return null if no metadata tag is present (or no valid source is given).
     *
     * @param {Document|Element|Object|string} source Source.
     * @return {GPXMetadata | null} Metadata
     * @api
     */
    readMetadata(source: Document | Element | any | string): GPXMetadata | null;
    /**
     * @param {Document} doc Document.
     * @return {GPXMetadata | null} Metadata
     */
    readMetadataFromDocument(doc: Document): GPXMetadata | null;
    /**
     * @param {Element} node Node.
     * @return {Object} Metadata
     */
    readMetadataFromNode(node: Element): any;
}
import Feature from '../Feature.js';
import XMLFeature from './XMLFeature.js';
//# sourceMappingURL=GPX.d.ts.map