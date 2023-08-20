export default MVT;
export type Options = {
    /**
     * Class for features returned by
     * {@link module :ol/format/MVT~MVT#readFeatures}. Set to {@link module :ol/Feature~Feature} to get full editing and geometry
     * support at the cost of decreased rendering performance. The default is
     * {@link module :ol/render/Feature~RenderFeature}, which is optimized for rendering and hit detection.
     */
    featureClass?: import("../Feature.js").FeatureClass | undefined;
    /**
     * Geometry name to use when creating features.
     */
    geometryName?: string | undefined;
    /**
     * Name of the feature attribute that holds the layer name.
     */
    layerName?: string | undefined;
    /**
     * Layers to read features from. If not provided, features will be read from all
     */
    layers?: string[] | undefined;
    /**
     * Optional property that will be assigned as the feature id and removed from the properties.
     * layers.
     */
    idProperty?: string | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("../Feature.js").FeatureClass} [featureClass] Class for features returned by
 * {@link module:ol/format/MVT~MVT#readFeatures}. Set to {@link module:ol/Feature~Feature} to get full editing and geometry
 * support at the cost of decreased rendering performance. The default is
 * {@link module:ol/render/Feature~RenderFeature}, which is optimized for rendering and hit detection.
 * @property {string} [geometryName='geometry'] Geometry name to use when creating features.
 * @property {string} [layerName='layer'] Name of the feature attribute that holds the layer name.
 * @property {Array<string>} [layers] Layers to read features from. If not provided, features will be read from all
 * @property {string} [idProperty] Optional property that will be assigned as the feature id and removed from the properties.
 * layers.
 */
/**
 * @classdesc
 * Feature format for reading data in the Mapbox MVT format.
 *
 * @param {Options} [options] Options.
 * @api
 */
declare class MVT extends FeatureFormat {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
    /**
     * @private
     * @type {import("../Feature.js").FeatureClass}
     */
    private featureClass_;
    /**
     * @private
     * @type {string|undefined}
     */
    private geometryName_;
    /**
     * @private
     * @type {string}
     */
    private layerName_;
    /**
     * @private
     * @type {Array<string>|null}
     */
    private layers_;
    /**
     * @private
     * @type {string}
     */
    private idProperty_;
    /**
     * Read the raw geometry from the pbf offset stored in a raw feature's geometry
     * property.
     * @param {PBF} pbf PBF.
     * @param {Object} feature Raw feature.
     * @param {Array<number>} flatCoordinates Array to store flat coordinates in.
     * @param {Array<number>} ends Array to store ends in.
     * @private
     */
    private readRawGeometry_;
    /**
     * @private
     * @param {PBF} pbf PBF
     * @param {Object} rawFeature Raw Mapbox feature.
     * @param {import("./Feature.js").ReadOptions} options Read options.
     * @return {import("../Feature.js").FeatureLike|null} Feature.
     */
    private createFeature_;
    /**
     * Read all features.
     *
     * @param {ArrayBuffer} source Source.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @return {Array<import("../Feature.js").FeatureLike>} Features.
     * @api
     */
    readFeatures(source: ArrayBuffer, options?: import("./Feature.js").ReadOptions | undefined): Array<import("../Feature.js").FeatureLike>;
    /**
     * Read the projection from the source.
     *
     * @param {Document|Element|Object|string} source Source.
     * @return {import("../proj/Projection.js").default} Projection.
     * @api
     */
    readProjection(source: Document | Element | any | string): import("../proj/Projection.js").default;
    /**
     * Sets the layers that features will be read from.
     * @param {Array<string>} layers Layers.
     * @api
     */
    setLayers(layers: Array<string>): void;
}
import FeatureFormat from './Feature.js';
//# sourceMappingURL=MVT.d.ts.map