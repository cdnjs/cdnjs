/**
 * Gets the path from a mapbox:// URL.
 * @param {string} url The Mapbox URL.
 * @return {string} The path.
 * @private
 */
export function getMapboxPath(url: string): string;
/**
 * Turns mapbox:// sprite URLs into resolvable URLs.
 * @param {string} url The sprite URL.
 * @param {string} token The access token.
 * @param {string} styleUrl The style URL.
 * @return {string} A resolvable URL.
 * @private
 */
export function normalizeSpriteUrl(url: string, token: string, styleUrl: string): string;
/**
 * Turns mapbox:// glyphs URLs into resolvable URLs.
 * @param {string} url The glyphs URL.
 * @param {string} token The access token.
 * @param {string} styleUrl The style URL.
 * @return {string} A resolvable URL.
 * @private
 */
export function normalizeGlyphsUrl(url: string, token: string, styleUrl: string): string;
/**
 * Turns mapbox:// style URLs into resolvable URLs.
 * @param {string} url The style URL.
 * @param {string} token The access token.
 * @return {string} A resolvable URL.
 * @private
 */
export function normalizeStyleUrl(url: string, token: string): string;
/**
 * Turns mapbox:// source URLs into vector tile URL templates.
 * @param {string} url The source URL.
 * @param {string} token The access token.
 * @param {string} tokenParam The access token key.
 * @param {string} styleUrl The style URL.
 * @return {string} A vector tile template.
 * @private
 */
export function normalizeSourceUrl(url: string, token: string, tokenParam: string, styleUrl: string): string;
export default MapboxVectorLayer;
export type StyleObject = {
    /**
     * The style sources.
     */
    sources: {
        [x: string]: SourceObject;
    };
    /**
     * The sprite URL.
     */
    sprite: string;
    /**
     * The glyphs URL.
     */
    glyphs: string;
    /**
     * The style layers.
     */
    layers: LayerObject[];
};
export type SourceObject = {
    /**
     * The source URL.
     */
    url: string;
    /**
     * The source type.
     */
    type: string;
    /**
     * TileJSON tiles.
     */
    tiles?: string[];
};
/**
 * The Mapbox source type.
 */
export type SourceType = string;
export type LayerObject = {
    /**
     * The layer id.
     */
    id: string;
    /**
     * The layer type.
     */
    type: string;
    /**
     * The source id.
     */
    source: string;
    /**
     * The layout.
     */
    layout: any;
    /**
     * The paint.
     */
    paint: any;
};
export type Options = {
    /**
     * The URL of the Mapbox style object to use for this layer.  For a
     * style created with Mapbox Studio and hosted on Mapbox, this will look like
     * 'mapbox://styles/you/your-style'.
     */
    styleUrl: string;
    /**
     * The access token for your Mapbox style. This has to be provided
     * for `mapbox://` style urls. For `https://` and other urls, any access key must be the last query
     * parameter of the style url.
     */
    accessToken?: string;
    /**
     * If your style uses more than one source, you need to use either the
     * `source` property or the `layers` property to limit rendering to a single vector source.  The
     * `source` property corresponds to the id of a vector source in your Mapbox style.
     */
    source?: string;
    /**
     * Limit rendering to the list of included layers.  All layers
     * must share the same vector source.  If your style uses more than one source, you need to use
     * either the `source` property or the `layers` property to limit rendering to a single vector
     * source.
     */
    layers?: string[];
    /**
     * Declutter images and text. Decluttering is applied to all
     * image and text styles of all Vector and VectorTile layers that have set this to `true`. The priority
     * is defined by the z-index of the layer, the `zIndex` of the style and the render order of features.
     * Higher z-index means higher priority. Within the same z-index, a feature rendered before another has
     * higher priority.
     *
     * As an optimization decluttered features from layers with the same `className` are rendered above
     * the fill and stroke styles of all of those layers regardless of z-index.  To opt out of this
     * behavior and place declutterd features with their own layer configure the layer with a `className`
     * other than `ol-layer`.
     */
    declutter?: boolean;
    /**
     * Background color for the layer.
     * If not specified, the background from the Mapbox style object will be used. Set to `false` to prevent
     * the Mapbox style's background from being used.
     */
    background?: string | false | ((arg0: number) => string);
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
     * be visible. If neither `maxResolution` nor `minZoom` are defined, the layer's `maxResolution` will
     * match the style source's `minzoom`.
     */
    maxResolution?: number;
    /**
     * The minimum view zoom level (exclusive) above which this layer will
     * be visible. If neither `maxResolution` nor `minZoom` are defined, the layer's `minZoom` will match
     * the style source's `minzoom`.
     */
    minZoom?: number;
    /**
     * The maximum view zoom level (inclusive) at which this layer will
     * be visible.
     */
    maxZoom?: number;
    /**
     * Render order. Function to be used when sorting
     * features before rendering. By default features are drawn in the order that they are created. Use
     * `null` to avoid the sort, but get an undefined draw order.
     */
    renderOrder?: (arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default) => number;
    /**
     * The buffer in pixels around the tile extent used by the
     * renderer when getting features from the vector tile for the rendering or hit-detection.
     * Recommended value: Vector tiles are usually generated with a buffer, so this value should match
     * the largest possible buffer of the used tiles. It should be at least the size of the largest
     * point symbol or line width.
     */
    renderBuffer?: number;
    /**
     * Render mode for vector tiles:
     * * `'hybrid'`: Polygon and line elements are rendered as images, so pixels are scaled during zoom
     * animations. Point symbols and texts are accurately rendered as vectors and can stay upright on
     * rotated views.
     * * `'vector'`: Everything is rendered as vectors. Use this mode for improved performance on vector
     * tile layers with only a few rendered features (e.g. for highlighting a subset of features of
     * another layer with the same source).
     */
    renderMode?: any;
    /**
     * Sets the layer as overlay on a map. The map will not manage
     * this layer in its layers collection, and the layer will be rendered on top. This is useful for
     * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
     * use {@link import("../PluggableMap.js").default#addLayer map.addLayer()}.
     */
    map?: import("../PluggableMap.js").default;
    /**
     * When set to `true`, feature batches will be
     * recreated during animations. This means that no vectors will be shown clipped, but the setting
     * will have a performance impact for large amounts of vector data. When set to `false`, batches
     * will be recreated when no animation is active.
     */
    updateWhileAnimating?: boolean;
    /**
     * When set to `true`, feature batches will be
     * recreated during interactions. See also `updateWhileAnimating`.
     */
    updateWhileInteracting?: boolean;
    /**
     * Preload. Load low-resolution tiles up to `preload` levels. `0`
     * means no preloading.
     */
    preload?: number;
    /**
     * Use interim tiles on error.
     */
    useInterimTilesOnError?: boolean;
    /**
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    };
};
/**
 * @typedef {Object} LayerObject
 * @property {string} id The layer id.
 * @property {string} type The layer type.
 * @property {string} source The source id.
 * @property {Object} layout The layout.
 * @property {Object} paint The paint.
 */
/**
 * @typedef {Object} Options
 * @property {string} styleUrl The URL of the Mapbox style object to use for this layer.  For a
 * style created with Mapbox Studio and hosted on Mapbox, this will look like
 * 'mapbox://styles/you/your-style'.
 * @property {string} [accessToken] The access token for your Mapbox style. This has to be provided
 * for `mapbox://` style urls. For `https://` and other urls, any access key must be the last query
 * parameter of the style url.
 * @property {string} [source] If your style uses more than one source, you need to use either the
 * `source` property or the `layers` property to limit rendering to a single vector source.  The
 * `source` property corresponds to the id of a vector source in your Mapbox style.
 * @property {Array<string>} [layers] Limit rendering to the list of included layers.  All layers
 * must share the same vector source.  If your style uses more than one source, you need to use
 * either the `source` property or the `layers` property to limit rendering to a single vector
 * source.
 * @property {boolean} [declutter=true] Declutter images and text. Decluttering is applied to all
 * image and text styles of all Vector and VectorTile layers that have set this to `true`. The priority
 * is defined by the z-index of the layer, the `zIndex` of the style and the render order of features.
 * Higher z-index means higher priority. Within the same z-index, a feature rendered before another has
 * higher priority.
 *
 * As an optimization decluttered features from layers with the same `className` are rendered above
 * the fill and stroke styles of all of those layers regardless of z-index.  To opt out of this
 * behavior and place declutterd features with their own layer configure the layer with a `className`
 * other than `ol-layer`.
 * @property {import("./Base.js").BackgroundColor|false} [background] Background color for the layer.
 * If not specified, the background from the Mapbox style object will be used. Set to `false` to prevent
 * the Mapbox style's background from being used.
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible. If neither `maxResolution` nor `minZoom` are defined, the layer's `maxResolution` will
 * match the style source's `minzoom`.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will
 * be visible. If neither `maxResolution` nor `minZoom` are defined, the layer's `minZoom` will match
 * the style source's `minzoom`.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {import("../render.js").OrderFunction} [renderOrder] Render order. Function to be used when sorting
 * features before rendering. By default features are drawn in the order that they are created. Use
 * `null` to avoid the sort, but get an undefined draw order.
 * @property {number} [renderBuffer=100] The buffer in pixels around the tile extent used by the
 * renderer when getting features from the vector tile for the rendering or hit-detection.
 * Recommended value: Vector tiles are usually generated with a buffer, so this value should match
 * the largest possible buffer of the used tiles. It should be at least the size of the largest
 * point symbol or line width.
 * @property {import("./VectorTileRenderType.js").default|string} [renderMode='hybrid'] Render mode for vector tiles:
 *  * `'hybrid'`: Polygon and line elements are rendered as images, so pixels are scaled during zoom
 *    animations. Point symbols and texts are accurately rendered as vectors and can stay upright on
 *    rotated views.
 *  * `'vector'`: Everything is rendered as vectors. Use this mode for improved performance on vector
 *    tile layers with only a few rendered features (e.g. for highlighting a subset of features of
 *    another layer with the same source).
 * @property {import("../PluggableMap.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link import("../PluggableMap.js").default#addLayer map.addLayer()}.
 * @property {boolean} [updateWhileAnimating=false] When set to `true`, feature batches will be
 * recreated during animations. This means that no vectors will be shown clipped, but the setting
 * will have a performance impact for large amounts of vector data. When set to `false`, batches
 * will be recreated when no animation is active.
 * @property {boolean} [updateWhileInteracting=false] When set to `true`, feature batches will be
 * recreated during interactions. See also `updateWhileAnimating`.
 * @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
 * means no preloading.
 * @property {boolean} [useInterimTilesOnError=true] Use interim tiles on error.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */
/**
 * @classdesc
 * A vector tile layer based on a Mapbox style that uses a single vector source.  Configure
 * the layer with the `styleUrl` and `accessToken` shown in Mapbox Studio's share panel.
 * If the style uses more than one source, use the `source` property to choose a single
 * vector source.  If you want to render a subset of the layers in the style, use the `layers`
 * property (all layers must share the same vector source).  See the constructor options for
 * more detail.
 *
 *     var map = new Map({
 *       view: new View({
 *         center: [0, 0],
 *         zoom: 1
 *       }),
 *       layers: [
 *         new MapboxVectorLayer({
 *           styleUrl: 'mapbox://styles/mapbox/bright-v9',
 *           accessToken: 'your-mapbox-access-token-here'
 *         })
 *       ],
 *       target: 'map'
 *     });
 *
 * On configuration or loading error, the layer will trigger an `'error'` event.  Listeners
 * will receive an object with an `error` property that can be used to diagnose the problem.
 *
 * @param {Options} options Options.
 * @extends {VectorTileLayer}
 * @fires module:ol/events/Event~BaseEvent#event:error
 * @api
 */
declare class MapboxVectorLayer extends VectorTileLayer {
    /**
     * @param {Options} options Layer options.  At a minimum, `styleUrl` and `accessToken`
     * must be provided.
     */
    constructor(options: Options);
    setMaxResolutionFromTileGrid_: boolean;
    sourceId: string;
    layers: string[];
    accessToken: string;
    accessTokenParam_: string;
    /**
     * Fetch the style object.
     * @param {string} styleUrl The URL of the style to load.
     * @protected
     */
    protected fetchStyle(styleUrl: string): void;
    /**
     * Handle the loaded style object.
     * @param {StyleObject} style The loaded style.
     * @param {string} styleUrl The URL of the style.
     * @protected
     */
    protected onStyleLoad(style: StyleObject, styleUrl: string): void;
    /**
     * Applies configuration from the provided source to this layer's source,
     * and reconfigures the loader to add a feature that renders the background,
     * if the style is configured with a background.
     * @param {import("../source/VectorTile.js").default} source The source to configure from.
     * @param {StyleObject} style The style to configure the background from.
     */
    configureSource(source: VectorTileSource, style: StyleObject): void;
    /**
     * Handle configuration or loading error.
     * @param {Error} error The error.
     * @protected
     */
    protected handleError(error: Error): void;
}
import VectorTileLayer from "./VectorTile.js";
import VectorTileSource from "../source/VectorTile.js";
//# sourceMappingURL=MapboxVector.d.ts.map