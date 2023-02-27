export default TileJSON;
export type Config = {
    /**
     * The name.
     */
    name?: string | undefined;
    /**
     * The description.
     */
    description?: string | undefined;
    /**
     * The version.
     */
    version?: string | undefined;
    /**
     * The attribution.
     */
    attribution?: string | undefined;
    /**
     * The template.
     */
    template?: string | undefined;
    /**
     * The legend.
     */
    legend?: string | undefined;
    /**
     * The scheme.
     */
    scheme?: string | undefined;
    /**
     * The tile URL templates.
     */
    tiles: Array<string>;
    /**
     * Optional grids.
     */
    grids?: string[] | undefined;
    /**
     * Minimum zoom level.
     */
    minzoom?: number | undefined;
    /**
     * Maximum zoom level.
     */
    maxzoom?: number | undefined;
    /**
     * Optional bounds.
     */
    bounds?: number[] | undefined;
    /**
     * Optional center.
     */
    center?: number[] | undefined;
};
export type Options = {
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike | undefined;
    /**
     * Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
     */
    cacheSize?: number | undefined;
    /**
     * The `crossOrigin` attribute for loaded images.  Note that
     * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
     */
    interpolate?: boolean | undefined;
    /**
     * Use JSONP with callback to load the TileJSON.
     * Useful when the server does not support CORS..
     */
    jsonp?: boolean | undefined;
    /**
     * Maximum allowed reprojection error (in pixels).
     * Higher values can increase reprojection performance, but decrease precision.
     */
    reprojectionErrorThreshold?: number | undefined;
    /**
     * TileJSON configuration for this source.
     * If not provided, `url` must be configured.
     */
    tileJSON?: Config | undefined;
    /**
     * Optional function to load a tile given a URL. The default is
     * ```js
     * function(imageTile, src) {
     * imageTile.getImage().src = src;
     * };
     * ```
     */
    tileLoadFunction?: import("../Tile.js").LoadFunction | undefined;
    /**
     * The tile size used by the tile service.
     * Note: `tileSize` and other non-standard TileJSON properties are currently ignored.
     */
    tileSize?: number | import("../size.js").Size | undefined;
    /**
     * URL to the TileJSON file. If not provided, `tileJSON` must be configured.
     */
    url?: string | undefined;
    /**
     * Whether to wrap the world horizontally.
     */
    wrapX?: boolean | undefined;
    /**
     * Duration of the opacity transition for rendering.
     * To disable the opacity transition, pass `transition: 0`.
     */
    transition?: number | undefined;
    /**
     * Choose whether to use tiles with a higher or lower zoom level when between integer
     * zoom levels. See {@link module :ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
     */
    zDirection?: number | import("../array.js").NearestDirectionFunction | undefined;
};
/**
 * @typedef {Object} Config
 * @property {string} [name] The name.
 * @property {string} [description] The description.
 * @property {string} [version] The version.
 * @property {string} [attribution] The attribution.
 * @property {string} [template] The template.
 * @property {string} [legend] The legend.
 * @property {string} [scheme] The scheme.
 * @property {Array<string>} tiles The tile URL templates.
 * @property {Array<string>} [grids] Optional grids.
 * @property {number} [minzoom] Minimum zoom level.
 * @property {number} [maxzoom] Maximum zoom level.
 * @property {Array<number>} [bounds] Optional bounds.
 * @property {Array<number>} [center] Optional center.
 */
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {boolean} [jsonp=false] Use JSONP with callback to load the TileJSON.
 * Useful when the server does not support CORS..
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {Config} [tileJSON] TileJSON configuration for this source.
 * If not provided, `url` must be configured.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number|import("../size.js").Size} [tileSize=[256, 256]] The tile size used by the tile service.
 * Note: `tileSize` and other non-standard TileJSON properties are currently ignored.
 * @property {string} [url] URL to the TileJSON file. If not provided, `tileJSON` must be configured.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */
/**
 * @classdesc
 * Layer source for tile data in TileJSON format.
 * @api
 */
declare class TileJSON extends TileImage {
    /**
     * @param {Options} options TileJSON options.
     */
    constructor(options: Options);
    /**
     * @type {Config}
     * @private
     */
    private tileJSON_;
    /**
     * @type {number|import("../size.js").Size}
     * @private
     */
    private tileSize_;
    /**
     * @private
     * @param {Event} event The load event.
     */
    private onXHRLoad_;
    /**
     * @private
     * @param {Event} event The error event.
     */
    private onXHRError_;
    /**
     * @return {Config} The tilejson object.
     * @api
     */
    getTileJSON(): Config;
    /**
     * @protected
     * @param {Config} tileJSON Tile JSON.
     */
    protected handleTileJSONResponse(tileJSON: Config): void;
    /**
     * @protected
     */
    protected handleTileJSONError(): void;
}
import TileImage from "./TileImage.js";
//# sourceMappingURL=TileJSON.d.ts.map