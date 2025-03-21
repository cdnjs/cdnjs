export default XMLFeature;
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for XML feature formats.
 *
 * @abstract
 */
declare class XMLFeature extends FeatureFormat<import("../Feature.js").default<import("../geom/Geometry.js").default>> {
    constructor();
    /**
     * @type {XMLSerializer}
     * @private
     */
    private xmlSerializer_;
    /**
     * Read a single feature.
     *
     * @param {Document|Element|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @return {import("../Feature.js").default} Feature.
     * @api
     * @override
     */
    override readFeature(source: Document | Element | any | string, options?: import("../format/Feature.js").ReadOptions | undefined): import("../Feature.js").default;
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions} [options] Options.
     * @return {import("../Feature.js").default} Feature.
     */
    readFeatureFromDocument(doc: Document, options?: import("../format/Feature.js").ReadOptions | undefined): import("../Feature.js").default;
    /**
     * @param {Element} node Node.
     * @param {import("./Feature.js").ReadOptions} [options] Options.
     * @return {import("../Feature.js").default} Feature.
     */
    readFeatureFromNode(node: Element, options?: import("../format/Feature.js").ReadOptions | undefined): import("../Feature.js").default;
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions} [options] Options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    protected readFeaturesFromDocument(doc: Document, options?: import("../format/Feature.js").ReadOptions | undefined): Array<import("../Feature.js").default>;
    /**
     * @abstract
     * @param {Element} node Node.
     * @param {import("./Feature.js").ReadOptions} [options] Options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    protected readFeaturesFromNode(node: Element, options?: import("../format/Feature.js").ReadOptions | undefined): Array<import("../Feature.js").default>;
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions} [options] Options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromDocument(doc: Document, options?: import("../format/Feature.js").ReadOptions | undefined): import("../geom/Geometry.js").default;
    /**
     * @param {Element} node Node.
     * @param {import("./Feature.js").ReadOptions} [options] Options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromNode(node: Element, options?: import("../format/Feature.js").ReadOptions | undefined): import("../geom/Geometry.js").default;
    /**
     * Read the projection from the source.
     *
     * @param {Document|Element|Object|string} source Source.
     * @return {import("../proj/Projection.js").default} Projection.
     * @api
     * @override
     */
    override readProjection(source: Document | Element | any | string): import("../proj/Projection.js").default;
    /**
     * @param {Document} doc Document.
     * @protected
     * @return {import("../proj/Projection.js").default} Projection.
     */
    protected readProjectionFromDocument(doc: Document): import("../proj/Projection.js").default;
    /**
     * @param {Element} node Node.
     * @protected
     * @return {import("../proj/Projection.js").default} Projection.
     */
    protected readProjectionFromNode(node: Element): import("../proj/Projection.js").default;
    /**
     * Encode a feature as string.
     *
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {string} Encoded feature.
     * @override
     */
    override writeFeature(feature: import("../Feature.js").default, options?: import("../format/Feature.js").WriteOptions | undefined): string;
    /**
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions} [options] Options.
     * @protected
     * @return {Node} Node.
     */
    protected writeFeatureNode(feature: import("../Feature.js").default, options?: import("../format/Feature.js").WriteOptions | undefined): Node;
    /**
     * Encode an array of features as string.
     *
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {string} Result.
     * @api
     * @override
     */
    override writeFeatures(features: Array<import("../Feature.js").default>, options?: import("../format/Feature.js").WriteOptions | undefined): string;
    /**
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [options] Options.
     * @return {Node} Node.
     */
    writeFeaturesNode(features: Array<import("../Feature.js").default>, options?: import("../format/Feature.js").WriteOptions | undefined): Node;
    /**
     * Encode a geometry as string.
     *
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {string} Encoded geometry.
     * @override
     */
    override writeGeometry(geometry: import("../geom/Geometry.js").default, options?: import("../format/Feature.js").WriteOptions | undefined): string;
    /**
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [options] Options.
     * @return {Node} Node.
     */
    writeGeometryNode(geometry: import("../geom/Geometry.js").default, options?: import("../format/Feature.js").WriteOptions | undefined): Node;
}
import FeatureFormat from '../format/Feature.js';
//# sourceMappingURL=XMLFeature.d.ts.map