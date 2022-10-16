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
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @protected
     * @return {import("../Feature.js").default} Feature.
     */
    protected readFeatureFromObject(object: any, opt_options?: import("./Feature.js").ReadOptions): import("../Feature.js").default<any>;
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    protected readFeaturesFromObject(object: any, opt_options?: import("./Feature.js").ReadOptions): Array<import("../Feature.js").default<any>>;
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions} [opt_options] Read options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromObject(object: any, opt_options?: import("./Feature.js").ReadOptions): import("../geom/Geometry.js").default;
    /**
     * @abstract
     * @param {Object} object Object.
     * @protected
     * @return {import("../proj/Projection.js").default} Projection.
     */
    protected readProjectionFromObject(object: any): import("../proj/Projection.js").default;
    /**
     * @abstract
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @return {Object} Object.
     */
    writeFeatureObject(feature: import("../Feature.js").default<any>, opt_options?: import("./Feature.js").WriteOptions): any;
    /**
     * @abstract
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @return {Object} Object.
     */
    writeFeaturesObject(features: Array<import("../Feature.js").default<any>>, opt_options?: import("./Feature.js").WriteOptions): any;
    /**
     * @abstract
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
     * @return {Object} Object.
     */
    writeGeometryObject(geometry: import("../geom/Geometry.js").default, opt_options?: import("./Feature.js").WriteOptions): any;
}
import FeatureFormat from "./Feature.js";
//# sourceMappingURL=JSONFeature.d.ts.map