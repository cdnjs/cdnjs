/**
 * Encode filter as WFS `Filter` and return the Node.
 *
 * @param {import("./filter/Filter.js").default} filter Filter.
 * @return {Node} Result.
 * @api
 */
export function writeFilter(filter: import("./filter/Filter.js").default): Node;
export default WFS;
export type Options = {
    /**
     * The namespace URI used for features.
     */
    featureNS?: {
        [x: string]: string;
    } | string;
    /**
     * The feature type to parse. Only used for read operations.
     */
    featureType?: Array<string> | string;
    /**
     * The GML format to use to parse the response. Default is `ol/format/GML3`.
     */
    gmlFormat?: GMLBase;
    /**
     * Optional schemaLocation to use for serialization, this will override the default.
     */
    schemaLocation?: string;
};
export type WriteGetFeatureOptions = {
    /**
     * The namespace URI used for features.
     */
    featureNS: string;
    /**
     * The prefix for the feature namespace.
     */
    featurePrefix: string;
    /**
     * The feature type names.
     */
    featureTypes: Array<string>;
    /**
     * SRS name. No srsName attribute will be set on
     * geometries when this is not provided.
     */
    srsName?: string;
    /**
     * Handle.
     */
    handle?: string;
    /**
     * Output format.
     */
    outputFormat?: string;
    /**
     * Maximum number of features to fetch.
     */
    maxFeatures?: number;
    /**
     * Geometry name to use in a BBOX filter.
     */
    geometryName?: string;
    /**
     * Optional list of property names to serialize.
     */
    propertyNames?: Array<string>;
    /**
     * viewParams GeoServer vendor parameter.
     */
    viewParams?: string;
    /**
     * Start index to use for WFS paging. This is a
     * WFS 2.0 feature backported to WFS 1.1.0 by some Web Feature Services.
     */
    startIndex?: number;
    /**
     * Number of features to retrieve when paging. This is a
     * WFS 2.0 feature backported to WFS 1.1.0 by some Web Feature Services. Please note that some
     * Web Feature Services have repurposed `maxfeatures` instead.
     */
    count?: number;
    /**
     * Extent to use for the BBOX filter.
     */
    bbox?: import("../extent.js").Extent;
    /**
     * Filter condition. See
     * {@link module:ol/format/Filter} for more information.
     */
    filter?: import("./filter/Filter.js").default;
    /**
     * Indicates what response should be returned,
     * E.g. `hits` only includes the `numberOfFeatures` attribute in the response and no features.
     */
    resultType?: string;
};
export type WriteTransactionOptions = {
    /**
     * The namespace URI used for features.
     */
    featureNS: string;
    /**
     * The prefix for the feature namespace.
     */
    featurePrefix: string;
    /**
     * The feature type name.
     */
    featureType: string;
    /**
     * SRS name. No srsName attribute will be set on
     * geometries when this is not provided.
     */
    srsName?: string;
    /**
     * Handle.
     */
    handle?: string;
    /**
     * Must be set to true if the transaction is for
     * a 3D layer. This will allow the Z coordinate to be included in the transaction.
     */
    hasZ?: boolean;
    /**
     * Native elements. Currently not supported.
     */
    nativeElements: Array<Object>;
    /**
     * GML options for the WFS transaction writer.
     */
    gmlOptions?: import("./GMLBase.js").Options;
    /**
     * WFS version to use for the transaction. Can be either `1.0.0` or `1.1.0`.
     */
    version?: string;
};
/**
 * Number of features; bounds/extent.
 */
export type FeatureCollectionMetadata = {
    numberOfFeatures: number;
    bounds: import("../extent.js").Extent;
};
/**
 * Total deleted; total inserted; total updated; array of insert ids.
 */
export type TransactionResponse = {
    totalDeleted: number;
    totalInserted: number;
    totalUpdated: number;
    insertIds: Array<string>;
};
/**
 * @classdesc
 * Feature format for reading and writing data in the WFS format.
 * By default, supports WFS version 1.1.0. You can pass a GML format
 * as option if you want to read a WFS that contains GML2 (WFS 1.0.0).
 * Also see {@link module:ol/format/GMLBase~GMLBase} which is used by this format.
 *
 * @api
 */
declare class WFS extends XMLFeature {
    /**
     * @param {Options=} opt_options Optional configuration object.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @private
     * @type {Array<string>|string|undefined}
     */
    private featureType_;
    /**
     * @private
     * @type {Object<string, string>|string|undefined}
     */
    private featureNS_;
    /**
     * @private
     * @type {GMLBase}
     */
    private gmlFormat_;
    /**
     * @private
     * @type {string}
     */
    private schemaLocation_;
    /**
     * @return {Array<string>|string|undefined} featureType
     */
    getFeatureType(): Array<string> | string | undefined;
    /**
     * @param {Array<string>|string|undefined} featureType Feature type(s) to parse.
     */
    setFeatureType(featureType: Array<string> | string | undefined): void;
    /**
     * Read transaction response of the source.
     *
     * @param {Document|Element|Object|string} source Source.
     * @return {TransactionResponse|undefined} Transaction response.
     * @api
     */
    readTransactionResponse(source: Document | Element | Object | string): TransactionResponse | undefined;
    /**
     * Read feature collection metadata of the source.
     *
     * @param {Document|Element|Object|string} source Source.
     * @return {FeatureCollectionMetadata|undefined}
     *     FeatureCollection metadata.
     * @api
     */
    readFeatureCollectionMetadata(source: Document | Element | Object | string): FeatureCollectionMetadata | undefined;
    /**
     * @param {Document} doc Document.
     * @return {FeatureCollectionMetadata|undefined}
     *     FeatureCollection metadata.
     */
    readFeatureCollectionMetadataFromDocument(doc: Document): FeatureCollectionMetadata | undefined;
    /**
     * @param {Element} node Node.
     * @return {FeatureCollectionMetadata|undefined}
     *     FeatureCollection metadata.
     */
    readFeatureCollectionMetadataFromNode(node: Element): FeatureCollectionMetadata | undefined;
    /**
     * @param {Document} doc Document.
     * @return {TransactionResponse|undefined} Transaction response.
     */
    readTransactionResponseFromDocument(doc: Document): TransactionResponse | undefined;
    /**
     * @param {Element} node Node.
     * @return {TransactionResponse|undefined} Transaction response.
     */
    readTransactionResponseFromNode(node: Element): TransactionResponse | undefined;
    /**
     * Encode format as WFS `GetFeature` and return the Node.
     *
     * @param {WriteGetFeatureOptions} options Options.
     * @return {Node} Result.
     * @api
     */
    writeGetFeature(options: WriteGetFeatureOptions): Node;
    /**
     * Encode format as WFS `Transaction` and return the Node.
     *
     * @param {Array<import("../Feature.js").default>} inserts The features to insert.
     * @param {Array<import("../Feature.js").default>} updates The features to update.
     * @param {Array<import("../Feature.js").default>} deletes The features to delete.
     * @param {WriteTransactionOptions} options Write options.
     * @return {Node} Result.
     * @api
     */
    writeTransaction(inserts: Array<import("../Feature.js").default>, updates: Array<import("../Feature.js").default>, deletes: Array<import("../Feature.js").default>, options: WriteTransactionOptions): Node;
}
import GMLBase from "./GMLBase.js";
import XMLFeature from "./XMLFeature.js";
//# sourceMappingURL=WFS.d.ts.map