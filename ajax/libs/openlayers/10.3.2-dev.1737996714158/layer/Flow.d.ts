export default FlowLayer;
export type ParsedStyle = {
    /**
     * The flow tile vertex shader.
     */
    tileVertexShader: string;
    /**
     * The flow tile fragment shader.
     */
    tileFragmentShader: string;
    /**
     * Generic texture fragment shader.
     */
    textureVertexShader: string;
    /**
     * Generic texture fragment shader.
     */
    textureFragmentShader: string;
    /**
     * The particle position vertex shader.
     */
    particlePositionVertexShader: string;
    /**
     * The particle position fragment shader.
     */
    particlePositionFragmentShader: string;
    /**
     * The particle color vertex shader.
     */
    particleColorVertexShader: string;
    /**
     * The particle color fragment shader.
     */
    particleColorFragmentShader: string;
};
export type SourceType = import("../source/DataTile.js").default;
/**
 * Translates tile data to rendered pixels.
 */
export type Style = {
    /**
     * Style variables.  Each variable must hold a number or string.  These
     * variables can be used in the `color` {@link import ("../expr/expression.js").ExpressionValue expression} using
     * the `['var', 'varName']` operator.  To update style variables, use the {@link import ("./WebGLTile.js").default#updateStyleVariables} method.
     */
    variables?: {
        [x: string]: string | number;
    } | undefined;
    /**
     * An expression applied to color values.
     */
    color?: import("../expr/expression.js").ExpressionValue | undefined;
};
export type Options = {
    /**
     * The maximum particle speed.
     */
    maxSpeed: number;
    /**
     * A larger factor increases the rate at which particles cross the screen.
     */
    speedFactor?: number | undefined;
    /**
     * The number of particles to render.
     */
    particles?: number | undefined;
    /**
     * Style to apply to the layer.
     */
    style?: Style | undefined;
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
     * Preload. Load low-resolution tiles up to `preload` levels. `0`
     * means no preloading.
     */
    preload?: number | undefined;
    /**
     * Source for this layer.
     */
    source?: import("../source/DataTile.js").default<import("../DataTile.js").default> | undefined;
    /**
     * Sets the layer as overlay on a map. The map will not manage
     * this layer in its layers collection, and the layer will be rendered on top. This is useful for
     * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
     * use {@link module :ol/Map~Map#addLayer}.
     */
    map?: import("../Map.js").default | undefined;
    /**
     * Use interim tiles on error.
     */
    useInterimTilesOnError?: boolean | undefined;
    /**
     * The internal texture cache size.  This needs to be large enough to render
     * two zoom levels worth of tiles.
     */
    cacheSize?: number | undefined;
};
/**
 * @classdesc
 * Experimental layer that renders particles moving through a vector field.
 *
 * @extends BaseTileLayer<SourceType, FlowLayerRenderer>
 * @fires import("../render/Event.js").RenderEvent#prerender
 * @fires import("../render/Event.js").RenderEvent#postrender
 */
declare class FlowLayer extends BaseTileLayer<import("../source/DataTile.js").default<import("../DataTile.js").default>, FlowLayerRenderer> {
    /**
     * @param {Options} options Flow layer options.
     */
    constructor(options: Options);
    /**
     * @type {Style}
     * @private
     */
    private style_;
    /**
     * @type {number}
     * @private
     */
    private maxSpeed_;
    /**
     * @type {number}
     * @private
     */
    private speedFactor_;
    /**
     * @type {number}
     * @private
     */
    private particles_;
    /**
     * @type {Object<string, (string|number)>}
     * @private
     */
    private styleVariables_;
    /**
     * @private
     */
    private handleSourceUpdate_;
    /**
     * Update any variables used by the layer style and trigger a re-render.
     * @param {Object<string, number>} variables Variables to update.
     */
    updateStyleVariables(variables: {
        [x: string]: number;
    }): void;
    /**
     * Gets the sources for this layer, for a given extent and resolution.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @return {Array<SourceType>} Sources.
     */
    getSources(extent: import("../extent.js").Extent, resolution: number): Array<SourceType>;
}
import FlowLayerRenderer from '../renderer/webgl/FlowLayer.js';
import BaseTileLayer from './BaseTile.js';
//# sourceMappingURL=Flow.d.ts.map