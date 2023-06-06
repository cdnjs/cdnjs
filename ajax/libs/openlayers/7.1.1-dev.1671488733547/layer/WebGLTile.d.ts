export default WebGLTileLayer;
export type SourceType = import("../source/DataTile.js").default | import("../source/TileImage.js").default;
/**
 * Translates tile data to rendered pixels.
 */
export type Style = {
    /**
     * Style variables.  Each variable must hold a number or string.  These
     * variables can be used in the `color`, `brightness`, `contrast`, `exposure`, `saturation` and `gamma`
     * {@link import ("../style/expressions.js").ExpressionValue expressions}, using the `['var', 'varName']` operator.
     * To update style variables, use the {@link import ("./WebGLTile.js").default#updateStyleVariables} method.
     */
    variables?: {
        [x: string]: string | number;
    } | undefined;
    /**
     * An expression applied to color values.
     */
    color?: import("../style/expressions.js").ExpressionValue | undefined;
    /**
     * Value used to decrease or increase
     * the layer brightness.  Values range from -1 to 1.
     */
    brightness?: import("../style/expressions.js").ExpressionValue | undefined;
    /**
     * Value used to decrease or increase
     * the layer contrast.  Values range from -1 to 1.
     */
    contrast?: import("../style/expressions.js").ExpressionValue | undefined;
    /**
     * Value used to decrease or increase
     * the layer exposure.  Values range from -1 to 1.
     */
    exposure?: import("../style/expressions.js").ExpressionValue | undefined;
    /**
     * Value used to decrease or increase
     * the layer saturation.  Values range from -1 to 1.
     */
    saturation?: import("../style/expressions.js").ExpressionValue | undefined;
    /**
     * Apply a gamma correction to the layer.
     * Values range from 0 to infinity.
     */
    gamma?: import("../style/expressions.js").ExpressionValue | undefined;
};
export type Options = {
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
    source?: SourceType | undefined;
    /**
     * Array
     * of sources for this layer. Takes precedence over `source`. Can either be an array of sources, or a function that
     * expects an extent and a resolution (in view projection units per pixel) and returns an array of sources. See
     * {@link module :ol/source.sourcesFromTileGrid} for a helper function to generate sources that are organized in a
     * pyramid following the same pattern as a tile grid. **Note:** All sources must have the same band count and content.
     */
    sources?: SourceType[] | ((arg0: import("../extent.js").Extent, arg1: number) => Array<SourceType>) | undefined;
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
export type ParsedStyle = {
    /**
     * The vertex shader.
     */
    vertexShader: string;
    /**
     * The fragment shader.
     */
    fragmentShader: string;
    /**
     * Uniform definitions.
     */
    uniforms: {
        [x: string]: import("../webgl/Helper.js").UniformValue;
    };
    /**
     * Palette textures.
     */
    paletteTextures: Array<import("../webgl/PaletteTexture.js").default>;
};
/**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @extends BaseTileLayer<SourceType, WebGLTileLayerRenderer>
 * @fires import("../render/Event.js").RenderEvent
 * @api
 */
declare class WebGLTileLayer extends BaseTileLayer<SourceType, WebGLTileLayerRenderer> {
    /**
     * @param {Options} options Tile layer options.
     */
    constructor(options: Options);
    /**
     * @type {Array<SourceType>|function(import("../extent.js").Extent, number):Array<SourceType>}
     * @private
     */
    private sources_;
    /**
     * @type {SourceType|null}
     * @private
     */
    private renderedSource_;
    /**
     * @type {number}
     * @private
     */
    private renderedResolution_;
    /**
     * @type {Style}
     * @private
     */
    private style_;
    /**
     * @type {number}
     * @private
     */
    private cacheSize_;
    /**
     * @type {Object<string, (string|number)>}
     * @private
     */
    private styleVariables_;
    /**
     * Gets the sources for this layer, for a given extent and resolution.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @return {Array<SourceType>} Sources.
     */
    getSources(extent: import("../extent.js").Extent, resolution: number): Array<SourceType>;
    /**
     * @return {SourceType} The source being rendered.
     */
    getRenderSource(): SourceType;
    /**
     * @private
     */
    private handleSourceUpdate_;
    /**
     * @private
     * @return {number} The number of source bands.
     */
    private getSourceBandCount_;
    /**
     * @param {import("../Map").FrameState} frameState Frame state.
     * @param {Array<SourceType>} sources Sources.
     * @return {HTMLElement} Canvas.
     */
    renderSources(frameState: import("../Map").FrameState, sources: Array<SourceType>): HTMLElement;
    /**
     * Update the layer style.  The `updateStyleVariables` function is a more efficient
     * way to update layer rendering.  In cases where the whole style needs to be updated,
     * this method may be called instead.  Note that calling this method will also replace
     * any previously set variables, so the new style also needs to include new variables,
     * if needed.
     * @param {Style} style The new style.
     */
    setStyle(style: Style): void;
    /**
     * Update any variables used by the layer style and trigger a re-render.
     * @param {Object<string, number>} variables Variables to update.
     * @api
     */
    updateStyleVariables(variables: {
        [x: string]: number;
    }): void;
}
import WebGLTileLayerRenderer from "../renderer/webgl/TileLayer.js";
import BaseTileLayer from "./BaseTile.js";
//# sourceMappingURL=WebGLTile.d.ts.map