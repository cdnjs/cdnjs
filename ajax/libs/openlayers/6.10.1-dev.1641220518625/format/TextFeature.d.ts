export default TextFeature;
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for text feature formats.
 *
 * @abstract
 */
declare class TextFeature extends FeatureFormat {
    /**
     * Read the feature from the source.
     *
     * @param {Document|Element|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @return {import("../Feature.js").default} Feature.
     * @api
     */
    readFeature(source: any, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../Feature.js").default<any>;
    /**
     * @abstract
     * @param {string} text Text.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @protected
     * @return {import("../Feature.js").default} Feature.
     */
    protected readFeatureFromText(text: string, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../Feature.js").default<any>;
    /**
     * Read the features from the source.
     *
     * @param {Document|Element|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @return {Array<import("../Feature.js").default>} Features.
     * @api
     */
    readFeatures(source: any, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../Feature.js").default<any>[];
    /**
     * @abstract
     * @param {string} text Text.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    protected readFeaturesFromText(text: string, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../Feature.js").default<any>[];
    /**
     * @abstract
     * @param {string} text Text.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromText(text: string, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../geom/Geometry.js").default;
    /**
     * @param {string} text Text.
     * @protected
     * @return {import("../proj/Projection.js").default|undefined} Projection.
     */
    protected readProjectionFromText(text: string): import("../proj/Projection.js").default | undefined;
    /**
     * Encode a feature as a string.
     *
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @return {string} Encoded feature.
     * @api
     */
    writeFeature(feature: import("../Feature.js").default<any>, opt_options?: import("./Feature.js").WriteOptions | undefined): string;
    /**
     * @abstract
     * @param {import("../Feature.js").default} feature Features.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @protected
     * @return {string} Text.
     */
    protected writeFeatureText(feature: import("../Feature.js").default<any>, opt_options?: import("./Feature.js").WriteOptions | undefined): string;
    /**
     * Encode an array of features as string.
     *
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @return {string} Encoded features.
     * @api
     */
    writeFeatures(features: import("../Feature.js").default<any>[], opt_options?: import("./Feature.js").WriteOptions | undefined): string;
    /**
     * @abstract
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @protected
     * @return {string} Text.
     */
    protected writeFeaturesText(features: import("../Feature.js").default<any>[], opt_options?: import("./Feature.js").WriteOptions | undefined): string;
    /**
     * Write a single geometry.
     *
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @return {string} Geometry.
     * @api
     */
    writeGeometry(geometry: import("../geom/Geometry.js").default, opt_options?: import("./Feature.js").WriteOptions | undefined): string;
    /**
     * @abstract
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @protected
     * @return {string} Text.
     */
    protected writeGeometryText(geometry: import("../geom/Geometry.js").default, opt_options?: import("./Feature.js").WriteOptions | undefined): string;
}
import FeatureFormat from "./Feature.js";
//# sourceMappingURL=TextFeature.d.ts.map