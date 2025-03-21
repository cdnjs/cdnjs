/**
 * Encode filter as WFS `Filter` and return the Node.
 *
 * @param {import("./filter/Filter.js").default} filter Filter.
 * @param {string} version WFS version. If not provided defaults to '1.1.0'
 * @return {Node} Result.
 * @api
 */
export function writeFilter(filter: import("./filter/Filter.js").default, version: string): Node;
export default WFS;
export type Options = {
    /**
     * The namespace URI used for features.
     */
    featureNS?: string | {
        [x: string]: string;
    } | undefined;
    /**
     * The feature type to parse. Only used for read operations.
     */
    featureType?: string | string[] | undefined;
    /**
     * The GML format to use to parse the response.
     * Default is `ol/format/GML2` for WFS 1.0.0, `ol/format/GML3` for WFS 1.1.0 and `ol/format/GML32` for WFS 2.0.0.
     */
    gmlFormat?: GMLBase | undefined;
    /**
     * Optional schemaLocation to use for serialization, this will override the default.
     */
    schemaLocation?: string | undefined;
    /**
     * WFS version to use. Can be either `1.0.0`, `1.1.0` or `2.0.0`.
     */
    version?: string | undefined;
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
     * The feature type names or FeatureType objects to
     * define a unique bbox filter per feature type name (in this case, options `bbox` and `geometryName` are
     * ignored.).
     */
    featureTypes: Array<string | FeatureType>;
    /**
     * SRS name. No srsName attribute will be set on
     * geometries when this is not provided.
     */
    srsName?: string | undefined;
    /**
     * Handle.
     */
    handle?: string | undefined;
    /**
     * Output format.
     */
    outputFormat?: string | undefined;
    /**
     * Maximum number of features to fetch.
     */
    maxFeatures?: number | undefined;
    /**
     * Geometry name to use in a BBOX filter.
     */
    geometryName?: string | undefined;
    /**
     * Optional list of property names to serialize.
     */
    propertyNames?: string[] | undefined;
    /**
     * viewParams GeoServer vendor parameter.
     */
    viewParams?: string | undefined;
    /**
     * Start index to use for WFS paging. This is a
     * WFS 2.0 feature backported to WFS 1.1.0 by some Web Feature Services.
     */
    startIndex?: number | undefined;
    /**
     * Number of features to retrieve when paging. This is a
     * WFS 2.0 feature backported to WFS 1.1.0 by some Web Feature Services. Please note that some
     * Web Feature Services have repurposed `maxfeatures` instead.
     */
    count?: number | undefined;
    /**
     * Extent to use for the BBOX filter. The `geometryName`
     * option must be set.
     */
    bbox?: import("../extent.js").Extent | undefined;
    /**
     * Filter condition. See
     * {@link module :ol/format/filter} for more information.
     */
    filter?: import("./filter/Filter.js").default | undefined;
    /**
     * Indicates what response should be returned,
     * e.g. `hits` only includes the `numberOfFeatures` attribute in the response and no features.
     */
    resultType?: string | undefined;
};
export type FeatureType = {
    /**
     * The feature type name.
     */
    name: string;
    /**
     * Extent to use for the BBOX filter.
     */
    bbox: import("../extent.js").Extent;
    /**
     * Geometry name to use in the BBOX filter.
     */
    geometryName: string;
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
    srsName?: string | undefined;
    /**
     * Handle.
     */
    handle?: string | undefined;
    /**
     * Must be set to true if the transaction is for
     * a 3D layer. This will allow the Z coordinate to be included in the transaction.
     */
    hasZ?: boolean | undefined;
    /**
     * Native elements. Currently not supported.
     */
    nativeElements: Array<any>;
    /**
     * GML options for the WFS transaction writer.
     */
    gmlOptions?: import("./GMLBase.js").Options | undefined;
    /**
     * WFS version to use for the transaction. Can be either `1.0.0`, `1.1.0` or `2.0.0`.
     */
    version?: string | undefined;
};
/**
 * Number of features; bounds/extent.
 */
export type FeatureCollectionMetadata = {
    /**
     * NumberOfFeatures.
     */
    numberOfFeatures: number;
    /**
     * Bounds.
     */
    bounds: import("../extent.js").Extent;
};
export type TransactionSummary = {
    /**
     * TotalDeleted.
     */
    totalDeleted: number;
    /**
     * TotalInserted.
     */
    totalInserted: number;
    /**
     * TotalUpdated.
     */
    totalUpdated: number;
};
/**
 * Total deleted; total inserted; total updated; array of insert ids.
 */
export type TransactionResponse = {
    /**
     * Transaction summary.
     */
    transactionSummary: TransactionSummary;
    /**
     * InsertIds.
     */
    insertIds: Array<string>;
};
/**
 * @classdesc
 * Feature format for reading and writing data in the WFS format.
 * By default, supports WFS version 1.1.0. You can pass a GML format
 * as option to override the default.
 * Also see {@link module:ol/format/GMLBase~GMLBase} which is used by this format.
 *
 * @api
 */
declare class WFS extends XMLFeature {
    /**
     * @param {Options} [options] Optional configuration object.
     */
    constructor(options?: Options | undefined);
    /**
     * @private
     * @type {string}
     */
    private version_;
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
    readTransactionResponse(source: Document | Element | any | string): TransactionResponse | undefined;
    /**
     * Read feature collection metadata of the source.
     *
     * @param {Document|Element|Object|string} source Source.
     * @return {FeatureCollectionMetadata|undefined}
     *     FeatureCollection metadata.
     * @api
     */
    readFeatureCollectionMetadata(source: Document | Element | any | string): FeatureCollectionMetadata | undefined;
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
     * Create a bbox filter and combine it with another optional filter.
     *
     * @param {!string} geometryName Geometry name to use.
     * @param {!import("../extent.js").Extent} extent Extent.
     * @param {string} [srsName] SRS name. No srsName attribute will be
     *    set on geometries when this is not provided.
     * @param {import("./filter/Filter.js").default} [filter] Filter condition.
     * @return {import("./filter/Filter.js").default} The filter.
     */
    combineBboxAndFilter(geometryName: string, extent: import("../extent.js").Extent, srsName?: string | undefined, filter?: import("./filter/Filter.js").default | undefined): import("./filter/Filter.js").default;
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
import GMLBase from './GMLBase.js';
import XMLFeature from './XMLFeature.js';
//# sourceMappingURL=WFS.d.ts.map