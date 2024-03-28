export default StadiaMaps;
export type Options = {
    /**
     * Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
     */
    cacheSize?: number | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
     */
    interpolate?: boolean | undefined;
    /**
     * Layer name. Valid values: `alidade_smooth`, `alidade_smooth_dark`, `outdoors`, `stamen_terrain`, `stamen_terrain_background`, `stamen_terrain_labels`, `stamen_terrain_lines`, `stamen_toner_background`, `stamen_toner`, `stamen_toner_labels`, `stamen_toner_lines`, `stamen_toner_lite`, `stamen_watercolor`, and `osm_bright`.
     */
    layer: string;
    /**
     * Minimum zoom.
     */
    minZoom?: number | undefined;
    /**
     * Maximum zoom.
     */
    maxZoom?: number | undefined;
    /**
     * Maximum allowed reprojection error (in pixels).
     * Higher values can increase reprojection performance, but decrease precision.
     */
    reprojectionErrorThreshold?: number | undefined;
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
     * Duration of the opacity transition for rendering.
     * To disable the opacity transition, pass `transition: 0`.
     */
    transition?: number | undefined;
    /**
     * URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
     */
    url?: string | undefined;
    /**
     * Whether to wrap the world horizontally.
     */
    wrapX?: boolean | undefined;
    /**
     * Choose whether to use tiles with a higher or lower zoom level when between integer
     * zoom levels. See {@link module :ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
     */
    zDirection?: number | import("../array.js").NearestDirectionFunction | undefined;
    /**
     * Stadia Maps API key. Not required for localhost or most public web deployments. See https://docs.stadiamaps.com/authentication/ for details.
     */
    apiKey?: string | undefined;
    /**
     * Use retina tiles (if available; not available for Stamen Watercolor).
     */
    retina?: boolean | undefined;
};
/**
 * @typedef {Object} Options
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {string} layer Layer name. Valid values: `alidade_smooth`, `alidade_smooth_dark`, `outdoors`, `stamen_terrain`, `stamen_terrain_background`, `stamen_terrain_labels`, `stamen_terrain_lines`, `stamen_toner_background`, `stamen_toner`, `stamen_toner_labels`, `stamen_toner_lines`, `stamen_toner_lite`, `stamen_watercolor`, and `osm_bright`.
 * @property {number} [minZoom] Minimum zoom.
 * @property {number} [maxZoom] Maximum zoom.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction]
 * Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 * @property {string} [apiKey] Stadia Maps API key. Not required for localhost or most public web deployments. See https://docs.stadiamaps.com/authentication/ for details.
 * @property {boolean} [retina] Use retina tiles (if available; not available for Stamen Watercolor).
 */
/**
 * @classdesc
 * Layer source for the Stadia Maps tile server.
 * @api
 */
declare class StadiaMaps extends XYZ {
    /**
     * @param {Options} options StadiaMaps options.
     */
    constructor(options: Options);
}
import XYZ from './XYZ.js';
//# sourceMappingURL=StadiaMaps.d.ts.map