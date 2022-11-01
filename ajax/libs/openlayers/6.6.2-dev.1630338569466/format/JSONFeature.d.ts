export default JSONFeature;
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for JSON feature formats.
 *
 * @abstract
 */
declare class JSONFeature extends FeatureFormat {
    /**
     * Read a feature.  Only works for a single feature. Use `readFeatures` to
     * read a feature collection.
     *
     * @param {ArrayBuffer|Document|Element|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @return {import("../Feature.js").default} Feature.
     * @api
     */
    readFeature(source: any, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../Feature.js").default<any>;
    /**
     * Read all features.  Works with both a single feature and a feature
     * collection.
     *
     * @param {ArrayBuffer|Document|Element|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @return {Array<import("../Feature.js").default>} Features.
     * @api
     */
    readFeatures(source: any, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../Feature.js").default<any>[];
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @protected
     * @return {import("../Feature.js").default} Feature.
     */
    protected readFeatureFromObject(object: any, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../Feature.js").default<any>;
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    protected readFeaturesFromObject(object: any, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../Feature.js").default<any>[];
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromObject(object: any, opt_options?: import("./Feature.js").ReadOptions | undefined): import("../geom/Geometry.js").default;
    /**
     * @abstract
     * @param {Object} object Object.
     * @protected
     * @return {import("../proj/Projection.js").default} Projection.
     */
    protected readProjectionFromObject(object: any): import("../proj/Projection.js").default;
    /**
     * Encode a feature as string.
     *
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @return {string} Encoded feature.
     * @api
     */
    writeFeature(feature: import("../Feature.js").default<any>, opt_options?: import("./Feature.js").WriteOptions | undefined): string;
    /**
     * @abstract
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @return {Object} Object.
     */
    writeFeatureObject(feature: import("../Feature.js").default<any>, opt_options?: import("./Feature.js").WriteOptions | undefined): any;
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
     * @return {Object} Object.
     */
    writeFeaturesObject(features: import("../Feature.js").default<any>[], opt_options?: import("./Feature.js").WriteOptions | undefined): any;
    /**
     * Encode a geometry as string.
     *
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @return {string} Encoded geometry.
     * @api
     */
    writeGeometry(geometry: import("../geom/Geometry.js").default, opt_options?: import("./Feature.js").WriteOptions | undefined): string;
    /**
     * @abstract
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @return {Object} Object.
     */
    writeGeometryObject(geometry: import("../geom/Geometry.js").default, opt_options?: import("./Feature.js").WriteOptions | undefined): any;
}
import FeatureFormat from "./Feature.js";
//# sourceMappingURL=JSONFeature.d.ts.map