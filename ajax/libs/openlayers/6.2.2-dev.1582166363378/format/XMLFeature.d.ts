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
     * @inheritDoc
     */
    getType(): string;
    /**
     * Read a single feature.
     *
     * @param {Document|Node|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions=} opt_options Read options.
     * @return {import("../Feature.js").default} Feature.
     * @api
     */
    readFeature(source: any, opt_options?: import("./Feature.js").ReadOptions): import("../Feature.js").default<any>;
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @return {import("../Feature.js").default} Feature.
     */
    readFeatureFromDocument(doc: Document, opt_options?: import("./Feature.js").ReadOptions): import("../Feature.js").default<any>;
    /**
     * @param {Node} node Node.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @return {import("../Feature.js").default} Feature.
     */
    readFeatureFromNode(node: Node, opt_options?: import("./Feature.js").ReadOptions): import("../Feature.js").default<any>;
    /**
     * Read all features from a feature collection.
     *
     * @param {Document|Node|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @return {Array<import("../Feature.js").default>} Features.
     * @api
     */
    readFeatures(source: any, opt_options?: import("./Feature.js").ReadOptions): import("../Feature.js").default<any>[];
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    protected readFeaturesFromDocument(doc: Document, opt_options?: import("./Feature.js").ReadOptions): import("../Feature.js").default<any>[];
    /**
     * @abstract
     * @param {Node} node Node.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    protected readFeaturesFromNode(node: Node, opt_options?: import("./Feature.js").ReadOptions): import("../Feature.js").default<any>[];
    /**
     * @inheritDoc
     */
    readGeometry(source: any, opt_options: any): import("../geom/Geometry.js").default;
    /**
     * @param {Document} doc Document.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromDocument(doc: Document, opt_options?: import("./Feature.js").ReadOptions): import("../geom/Geometry.js").default;
    /**
     * @param {Node} node Node.
     * @param {import("./Feature.js").ReadOptions=} opt_options Options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromNode(node: Node, opt_options?: import("./Feature.js").ReadOptions): import("../geom/Geometry.js").default;
    /**
     * @param {Document} doc Document.
     * @protected
     * @return {import("../proj/Projection.js").default} Projection.
     */
    protected readProjectionFromDocument(doc: Document): import("../proj/Projection.js").default;
    /**
     * @param {Node} node Node.
     * @protected
     * @return {import("../proj/Projection.js").default} Projection.
     */
    protected readProjectionFromNode(node: Node): import("../proj/Projection.js").default;
    /**
     * @inheritDoc
     */
    writeFeature(feature: any, opt_options: any): string;
    /**
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions=} opt_options Options.
     * @protected
     * @return {Node} Node.
     */
    protected writeFeatureNode(feature: import("../Feature.js").default<any>, opt_options?: import("./Feature.js").WriteOptions): Node;
    /**
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions=} opt_options Options.
     * @return {Node} Node.
     */
    writeFeaturesNode(features: import("../Feature.js").default<any>[], opt_options?: import("./Feature.js").WriteOptions): Node;
    /**
     * @inheritDoc
     */
    writeGeometry(geometry: any, opt_options: any): string;
    /**
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions=} opt_options Options.
     * @return {Node} Node.
     */
    writeGeometryNode(geometry: import("../geom/Geometry.js").default, opt_options?: import("./Feature.js").WriteOptions): Node;
}
import FeatureFormat from "./Feature.js";
//# sourceMappingURL=XMLFeature.d.ts.map