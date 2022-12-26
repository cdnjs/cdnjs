export default WebGLTileLayer;
export type SourceType = import("../source/TileImage.js").default | import("../source/DataTile.js").default;
/**
 * Translates tile data to rendered pixels.
 */
export type Style = {
    /**
     * Style variables.  Each variable must hold a number or string.  These
     * variables can be used in the `color`, `brightness`, `contrast`, `exposure`, `saturation` and `gamma`
     * {@link import("../style/expressions.js").ExpressionValue expressions}, using the `['var', 'varName']` operator.
     * To update style variables, use the {@link import("./WebGLTile.js").default#updateStyleVariables} method.
     */
    variables?: {
        [x: string]: string | number;
    };
    /**
     * An expression applied to color values.
     */
    color?: string | number | boolean | any[] | number[];
    /**
     * Value used to decrease or increase
     * the layer brightness.  Values range from -1 to 1.
     */
    brightness?: string | number | boolean | any[] | number[];
    /**
     * Value used to decrease or increase
     * the layer contrast.  Values range from -1 to 1.
     */
    contrast?: string | number | boolean | any[] | number[];
    /**
     * Value used to decrease or increase
     * the layer exposure.  Values range from -1 to 1.
     */
    exposure?: string | number | boolean | any[] | number[];
    /**
     * Value used to decrease or increase
     * the layer saturation.  Values range from -1 to 1.
     */
    saturation?: string | number | boolean | any[] | number[];
    /**
     * Apply a gamma correction to the layer.
     * Values range from 0 to infinity.
     */
    gamma?: string | number | boolean | any[] | number[];
};
export type Options = {
    /**
     * Style to apply to the layer.
     */
    style?: Style;
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
     * Preload. Load low-resolution tiles up to `preload` levels. `0`
     * means no preloading.
     */
    preload?: number;
    /**
     * Source for this layer.
     */
    source?: import("../source/TileImage.js").default | import("../source/DataTile.js").default;
    /**
     * Sets the layer as overlay on a map. The map will not manage
     * this layer in its layers collection, and the layer will be rendered on top. This is useful for
     * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
     * use {@link module:ol/Map#addLayer}.
     */
    map?: import("../PluggableMap.js").default;
    /**
     * Use interim tiles on error.
     */
    useInterimTilesOnError?: boolean;
    /**
     * The internal texture cache size.  This needs to be large enough to render
     * two zoom levels worth of tiles.
     */
    cacheSize?: number;
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
        [x: string]: number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData | ((arg0: import("../PluggableMap.js").FrameState) => number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData);
    };
    /**
     * Palette textures.
     */
    paletteTextures: import("../webgl/PaletteTexture.js").default[];
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
 * @api
 */
declare class WebGLTileLayer extends BaseTileLayer<import("../source/TileImage.js").default | import("../source/DataTile.js").default, WebGLTileLayerRenderer> {
    /**
     * @param {Options} opt_options Tile layer options.
     */
    constructor(opt_options: Options);
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
     * @private
     */
    private handleSourceUpdate_;
    /**
     * @private
     * @return {number} The number of source bands.
     */
    private getSourceBandCount_;
    /**
     * Update the layer style.  The `updateStyleVariables` function is a more efficient
     * way to update layer rendering.  In cases where the whole style needs to be updated,
     * this method may be called instead.
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