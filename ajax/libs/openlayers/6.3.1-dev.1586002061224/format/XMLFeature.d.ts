export default XMLFeature;
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for XML feature formats.
 *
 * @abstract
 */
declare class XMLFeature extends FeatureFormat {
    /**
     * @type {XMLSerializer}
     * @private
     */
    private xmlSerializer_;
    /**
     * Read a single feature.
     *
     * @param {Document|Element|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @return {import("../Feature.js").default} Feature.
     * @api
     */
    readFeature(source: Document | Element | Object | string, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../Feature.js").default;
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @return {import("../Feature.js").default} Feature.
     */
    readFeatureFromDocument(doc: Document, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../Feature.js").default;
    /**
     * @param {Element} node Node.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @return {import("../Feature.js").default} Feature.
     */
    readFeatureFromNode(node: Element, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../Feature.js").default;
    /**
     * Read all features from a feature collection.
     *
     * @param {Document|Element|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @return {Array<import("../Feature.js").default>} Features.
     * @api
     */
    readFeatures(source: Document | Element | Object | string, opt_options?: import("./Feature.js").ReadOptions | undefined): Array<import("../Feature.js").default>;
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    protected readFeaturesFromDocument(doc: Document, opt_options?: import("./Feature.js").ReadOptions | undefined): Array<import("../Feature.js").default>;
    /**
     * @abstract
     * @param {Element} node Node.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    protected readFeaturesFromNode(node: Element, opt_options?: import("./Feature.js").ReadOptions | undefined): Array<import("../Feature.js").default>;
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromDocument(doc: Document, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../geom/Geometry.js").default;
    /**
     * @param {Element} node Node.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromNode(node: Element, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../geom/Geometry.js").default;
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
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions=} opt_options Options.
     * @protected
     * @return {Node} Node.
     */
    protected writeFeatureNode(feature: import("../Feature.js").default, opt_options?: import("./Feature.js").WriteOptions | undefined): Node;
    /**
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions=} opt_options Options.
     * @return {Node} Node.
     */
    writeFeaturesNode(features: Array<import("../Feature.js").default>, opt_options?: import("./Feature.js").WriteOptions | undefined): Node;
    /**
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions=} opt_options Options.
     * @return {Node} Node.
     */
    writeGeometryNode(geometry: import("../geom/Geometry.js").default, opt_options?: import("./Feature.js").WriteOptions | undefined): Node;
}
import FeatureFormat from "./Feature.js";
//# sourceMappingURL=XMLFeature.d.ts.map