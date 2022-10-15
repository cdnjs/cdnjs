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
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Options.
     * @return {import("../Feature.js").default} Feature.
     */
    readFeatureFromDocument(doc: Document, opt_options?: import("./Feature.js").ReadOptions): import("../Feature.js").default<any>;
    /**
     * @param {Element} node Node.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Options.
     * @return {import("../Feature.js").default} Feature.
     */
    readFeatureFromNode(node: Element, opt_options?: import("./Feature.js").ReadOptions): import("../Feature.js").default<any>;
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    protected readFeaturesFromDocument(doc: Document, opt_options?: import("./Feature.js").ReadOptions): Array<import("../Feature.js").default<any>>;
    /**
     * @abstract
     * @param {Element} node Node.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    protected readFeaturesFromNode(node: Element, opt_options?: import("./Feature.js").ReadOptions): Array<import("../Feature.js").default<any>>;
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromDocument(doc: Document, opt_options?: import("./Feature.js").ReadOptions): import("../geom/Geometry.js").default;
    /**
     * @param {Element} node Node.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromNode(node: Element, opt_options?: import("./Feature.js").ReadOptions): import("../geom/Geometry.js").default;
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
     * @param {import("./Feature.js").WriteOptions} [opt_options] Options.
     * @protected
     * @return {Node} Node.
     */
    protected writeFeatureNode(feature: import("../Feature.js").default<any>, opt_options?: import("./Feature.js").WriteOptions): Node;
    /**
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Options.
     * @return {Node} Node.
     */
    writeFeaturesNode(features: Array<import("../Feature.js").default<any>>, opt_options?: import("./Feature.js").WriteOptions): Node;
    /**
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Options.
     * @return {Node} Node.
     */
    writeGeometryNode(geometry: import("../geom/Geometry.js").default, opt_options?: import("./Feature.js").WriteOptions): Node;
}
import FeatureFormat from "../format/Feature.js";
//# sourceMappingURL=XMLFeature.d.ts.map