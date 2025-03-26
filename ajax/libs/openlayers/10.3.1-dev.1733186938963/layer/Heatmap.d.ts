export default Heatmap;
export type Options<FeatureType extends import("../Feature.js").FeatureLike = import("../Feature.js").default<import("../geom.js").Geometry>, VectorSourceType extends import("../source/Vector.js").default<FeatureType> = import("../source/Vector.js").default<FeatureType>> = {
    /**
     * A CSS class name to set to the layer element.
     */
    className?: string | undefined;
    /**
     * Opacity (0, 1).
     */
    opacity?: number | undefined;
    /**
     * Visibility.
     */
    visible?: boolean | undefined;
    /**
     * The bounding extent for layer rendering.  The layer will not be
     * rendered outside of this extent.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * The z-index for layer rendering.  At rendering time, the layers
     * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
     * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
     * method was used.
     */
    zIndex?: number | undefined;
    /**
     * The minimum resolution (inclusive) at which this layer will be
     * visible.
     */
    minResolution?: number | undefined;
    /**
     * The maximum resolution (exclusive) below which this layer will
     * be visible.
     */
    maxResolution?: number | undefined;
    /**
     * The minimum view zoom level (exclusive) above which this layer will be
     * visible.
     */
    minZoom?: number | undefined;
    /**
     * The maximum view zoom level (inclusive) at which this layer will
     * be visible.
     */
    maxZoom?: number | undefined;
    /**
     * The color gradient
     * of the heatmap, specified as an array of CSS color strings.
     */
    gradient?: string[] | undefined;
    /**
     * Radius size in pixels.
     */
    radius?: number | undefined;
    /**
     * Blur size in pixels.
     */
    blur?: number | undefined;
    /**
     * The feature
     * attribute to use for the weight or a function that returns a weight from a feature. Weight values
     * should range from 0 to 1 (and values outside will be clamped to that range).
     */
    weight?: string | ((arg0: import("../Feature.js").default) => number) | undefined;
    /**
     * Point source.
     */
    source?: VectorSourceType | undefined;
    /**
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    } | undefined;
};
/**
 * @classdesc
 * Layer for rendering vector data as a heatmap.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @fires import("../render/Event.js").RenderEvent#prerender
 * @fires import("../render/Event.js").RenderEvent#postrender
 * @template {import("../Feature.js").FeatureLike} [FeatureType=import("../Feature.js").default]
 * @template {import("../source/Vector.js").default<FeatureType>} [VectorSourceType=import("../source/Vector.js").default<FeatureType>]
 * @extends {BaseVector<FeatureType, VectorSourceType, WebGLPointsLayerRenderer>}
 * @api
 */
declare class Heatmap<FeatureType extends import("../Feature.js").FeatureLike = import("../Feature.js").default<import("../geom.js").Geometry>, VectorSourceType extends import("../source/Vector.js").default<FeatureType> = import("../source/Vector.js").default<FeatureType>> extends BaseVector<FeatureType, VectorSourceType, WebGLPointsLayerRenderer> {
    /**
     * @param {Options<FeatureType, VectorSourceType>} [options] Options.
     */
    constructor(options?: Options<FeatureType, VectorSourceType>);
    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    private gradient_;
    /**
     * @private
     */
    private weightFunction_;
    /**
     * Return the blur size in pixels.
     * @return {number} Blur size in pixels.
     * @api
     * @observable
     */
    getBlur(): number;
    /**
     * Return the gradient colors as array of strings.
     * @return {Array<string>} Colors.
     * @api
     * @observable
     */
    getGradient(): Array<string>;
    /**
     * Return the size of the radius in pixels.
     * @return {number} Radius size in pixel.
     * @api
     * @observable
     */
    getRadius(): number;
    /**
     * @private
     */
    private handleGradientChanged_;
    /**
     * Set the blur size in pixels.
     * @param {number} blur Blur size in pixels.
     * @api
     * @observable
     */
    setBlur(blur: number): void;
    /**
     * Set the gradient colors as array of strings.
     * @param {Array<string>} colors Gradient.
     * @api
     * @observable
     */
    setGradient(colors: Array<string>): void;
    /**
     * Set the size of the radius in pixels.
     * @param {number} radius Radius size in pixel.
     * @api
     * @observable
     */
    setRadius(radius: number): void;
    /**
     * @override
     */
    override renderDeclutter(): void;
}
import WebGLPointsLayerRenderer from '../renderer/webgl/PointsLayer.js';
import BaseVector from './BaseVector.js';
//# sourceMappingURL=Heatmap.d.ts.map