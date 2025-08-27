export default Heatmap;
export type WeightExpression = import("../style/flat.js").NumberExpression | string | ((arg0: import("../Feature.js").default) => number);
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
     * Radius size in pixels. Note that for LineStrings,
     * the width of the line will be double the radius.
     */
    radius?: import("../style/flat.js").NumberExpression | undefined;
    /**
     * Blur size in pixels. This is added to the `radius`
     * parameter above to create the final size of the blur effect.
     */
    blur?: import("../style/flat.js").NumberExpression | undefined;
    /**
     * The feature
     * attribute to use for the weight. This also supports expressions returning a number or a function that returns a weight from a feature. Weight values
     * should range from 0 to 1 (and values outside will be clamped to that range).
     */
    weight?: WeightExpression | undefined;
    /**
     * Optional filter expression.
     */
    filter?: import("../style/flat.js").BooleanExpression | undefined;
    /**
     * Variables used in expressions (optional)
     */
    variables?: {
        [x: string]: string | number | boolean | number[];
    } | undefined;
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
 * @extends {BaseVector<FeatureType, VectorSourceType, WebGLVectorLayerRenderer>}
 * @api
 */
declare class Heatmap<FeatureType extends import("../Feature.js").FeatureLike = import("../Feature.js").default<import("../geom.js").Geometry>, VectorSourceType extends import("../source/Vector.js").default<FeatureType> = import("../source/Vector.js").default<FeatureType>> extends BaseVector<FeatureType, VectorSourceType, WebGLVectorLayerRenderer> {
    /**
     * @param {Options<FeatureType, VectorSourceType>} [options] Options.
     */
    constructor(options?: Options<FeatureType, VectorSourceType>);
    filter_: import("../style/flat.js").BooleanExpression;
    /**
     * @type {import('../style/flat.js').StyleVariables}
     * @private
     */
    private styleVariables_;
    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    private gradient_;
    /**
     * @private
     */
    private weight_;
    /**
     * Return the blur size in pixels.
     * @return {import("../style/flat.js").NumberExpression} Blur size in pixels.
     * @api
     * @observable
     */
    getBlur(): import("../style/flat.js").NumberExpression;
    /**
     * Return the gradient colors as array of strings.
     * @return {Array<string>} Colors.
     * @api
     * @observable
     */
    getGradient(): Array<string>;
    /**
     * Return the size of the radius in pixels.
     * @return {import("../style/flat.js").NumberExpression} Radius size in pixel.
     * @api
     * @observable
     */
    getRadius(): import("../style/flat.js").NumberExpression;
    /**
     * @private
     */
    private handleGradientChanged_;
    /**
     * Set the blur size in pixels.
     * @param {import("../style/flat.js").NumberExpression} blur Blur size in pixels (supports expressions).
     * @api
     * @observable
     */
    setBlur(blur: import("../style/flat.js").NumberExpression): void;
    /**
     * Set the gradient colors as array of strings.
     * @param {Array<string>} colors Gradient.
     * @api
     * @observable
     */
    setGradient(colors: Array<string>): void;
    /**
     * Set the size of the radius in pixels.
     * @param {import("../style/flat.js").NumberExpression} radius Radius size in pixel (supports expressions).
     * @api
     * @observable
     */
    setRadius(radius: import("../style/flat.js").NumberExpression): void;
    /**
     * Set the filter expression
     * @param {import("../style/flat.js").BooleanExpression} filter Filter expression
     * @api
     */
    setFilter(filter: import("../style/flat.js").BooleanExpression): void;
    /**
     * Set the weight expression
     * @param {WeightExpression} weight Weight expression
     * @api
     */
    setWeight(weight: WeightExpression): void;
    /**
     * Update any variables used by the layer style and trigger a re-render.
     * @param {import('../style/flat.js').StyleVariables} variables Variables to update.
     */
    updateStyleVariables(variables: import("../style/flat.js").StyleVariables): void;
    /**
     * @override
     */
    override renderDeclutter(): void;
}
import WebGLVectorLayerRenderer from '../renderer/webgl/VectorLayer.js';
import BaseVector from './BaseVector.js';
//# sourceMappingURL=Heatmap.d.ts.map