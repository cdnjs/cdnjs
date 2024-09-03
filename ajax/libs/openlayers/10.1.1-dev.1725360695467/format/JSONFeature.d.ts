export default JSONFeature;
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for JSON feature formats.
 *
 * @template {import('../Feature.js').FeatureLike} [FeatureType=import("../Feature.js").default]
 * @extends {FeatureFormat<FeatureType>}
 * @abstract
 */
declare class JSONFeature<FeatureType extends import("../Feature.js").FeatureLike = import("../Feature.js").default<import("../geom/Geometry.js").default>> extends FeatureFormat<FeatureType> {
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @protected
     * @return {FeatureType|Array<FeatureType>} Feature.
     */
    protected readFeatureFromObject(object: any, options?: import("./Feature.js").ReadOptions | undefined): FeatureType | Array<FeatureType>;
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @protected
     * @return {Array<FeatureType>} Features.
     */
    protected readFeaturesFromObject(object: any, options?: import("./Feature.js").ReadOptions | undefined): Array<FeatureType>;
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromObject(object: any, options?: import("./Feature.js").ReadOptions | undefined): import("../geom/Geometry.js").default;
    /**
     * Read the projection.
     *
     * @param {ArrayBuffer|Document|Element|Object|string} source Source.
     * @return {import("../proj/Projection.js").default} Projection.
     * @api
     * @override
     */
    override readProjection(source: ArrayBuffer | Document | Element | any | string): import("../proj/Projection.js").default;
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
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {string} Encoded feature.
     * @api
     * @override
     */
    override writeFeature(feature: import("../Feature.js").default, options?: import("./Feature.js").WriteOptions | undefined): string;
    /**
     * @abstract
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {Object} Object.
     */
    writeFeatureObject(feature: import("../Feature.js").default, options?: import("./Feature.js").WriteOptions | undefined): any;
    /**
     * Encode an array of features as string.
     *
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {string} Encoded features.
     * @api
     * @override
     */
    override writeFeatures(features: Array<import("../Feature.js").default>, options?: import("./Feature.js").WriteOptions | undefined): string;
    /**
     * @abstract
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {Object} Object.
     */
    writeFeaturesObject(features: Array<import("../Feature.js").default>, options?: import("./Feature.js").WriteOptions | undefined): any;
    /**
     * Encode a geometry as string.
     *
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {string} Encoded geometry.
     * @api
     * @override
     */
    override writeGeometry(geometry: import("../geom/Geometry.js").default, options?: import("./Feature.js").WriteOptions | undefined): string;
    /**
     * @abstract
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {Object} Object.
     */
    writeGeometryObject(geometry: import("../geom/Geometry.js").default, options?: import("./Feature.js").WriteOptions | undefined): any;
}
import FeatureFormat from './Feature.js';
//# sourceMappingURL=JSONFeature.d.ts.map