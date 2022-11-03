export default Heatmap;
export type Options = {
    /**
     * A CSS class name to set to the layer element.
     */
    className?: string;
    /**
     * Opacity (0, 1).
     */
    opacity?: number;
    /**
     * Visibility.
     */
    visible?: boolean;
    /**
     * The bounding extent for layer rendering.  The layer will not be
     * rendered outside of this extent.
     */
    extent?: number[];
    /**
     * The z-index for layer rendering.  At rendering time, the layers
     * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
     * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
     * method was used.
     */
    zIndex?: number;
    /**
     * The minimum resolution (inclusive) at which this layer will be
     * visible.
     */
    minResolution?: number;
    /**
     * The maximum resolution (exclusive) below which this layer will
     * be visible.
     */
    maxResolution?: number;
    /**
     * The minimum view zoom level (exclusive) above which this layer will be
     * visible.
     */
    minZoom?: number;
    /**
     * The maximum view zoom level (inclusive) at which this layer will
     * be visible.
     */
    maxZoom?: number;
    /**
     * The color gradient
     * of the heatmap, specified as an array of CSS color strings.
     */
    gradient?: string[];
    /**
     * Radius size in pixels.
     */
    radius?: number;
    /**
     * Blur size in pixels.
     */
    blur?: number;
    /**
     * The feature
     * attribute to use for the weight or a function that returns a weight from a feature. Weight values
     * should range from 0 to 1 (and values outside will be clamped to that range).
     */
    weight?: string | ((arg0: import("../Feature.js").default<any>) => number);
    /**
     * Source.
     */
    source?: import("../source/Vector.js").default<any>;
    /**
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    };
};
export type Property = string;
/**
 * @classdesc
 * Layer for rendering vector data as a heatmap.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @fires import("../render/Event.js").RenderEvent
 * @extends {VectorLayer<import("../source/Vector.js").default>}
 * @api
 */
declare class Heatmap extends VectorLayer<import("../source/Vector.js").default<any>> {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    private gradient_;
    weightFunction_: (feature: any) => any;
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
    getGradient(): string[];
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
    setGradient(colors: string[]): void;
    /**
     * Set the size of the radius in pixels.
     * @param {number} radius Radius size in pixel.
     * @api
     * @observable
     */
    setRadius(radius: number): void;
    /**
     * Create a renderer for this layer.
     * @return {WebGLPointsLayerRenderer} A layer renderer.
     */
    createRenderer(): WebGLPointsLayerRenderer;
    renderDeclutter(): void;
}
import VectorLayer from "./Vector.js";
import WebGLPointsLayerRenderer from "../renderer/webgl/PointsLayer.js";
//# sourceMappingURL=Heatmap.d.ts.map