export default TileImage;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike | undefined;
    /**
     * Attributions are collapsible.
     */
    attributionsCollapsible?: boolean | undefined;
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
     * Whether the layer is opaque.
     */
    opaque?: boolean | undefined;
    /**
     * Projection. Default is the view projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Maximum allowed reprojection error (in pixels).
     * Higher values can increase reprojection performance, but decrease precision.
     */
    reprojectionErrorThreshold?: number | undefined;
    /**
     * Source state.
     */
    state?: import("./Source.js").State | undefined;
    /**
     * Class used to instantiate image tiles.
     * Default is {@link module :ol/ImageTile~ImageTile}.
     */
    tileClass?: typeof ImageTile | undefined;
    /**
     * Tile grid.
     */
    tileGrid?: import("../tilegrid/TileGrid.js").default | undefined;
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
     * The pixel ratio used by the tile service. For example, if the tile
     * service advertizes 256px by 256px tiles but actually sends 512px
     * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
     * should be set to `2`.
     */
    tilePixelRatio?: number | undefined;
    /**
     * Optional function to get tile URL given a tile coordinate and the projection.
     */
    tileUrlFunction?: import("../Tile.js").UrlFunction | undefined;
    /**
     * URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
     * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
     * used instead of defining each one separately in the `urls` option.
     */
    url?: string | undefined;
    /**
     * An array of URL templates.
     */
    urls?: string[] | undefined;
    /**
     * Whether to wrap the world horizontally. The default, is to
     * request out-of-bounds tiles from the server. When set to `false`, only one
     * world will be rendered. When set to `true`, tiles will be requested for one
     * world only, but they will be wrapped horizontally to render multiple worlds.
     */
    wrapX?: boolean | undefined;
    /**
     * Duration of the opacity transition for rendering.
     * To disable the opacity transition, pass `transition: 0`.
     */
    transition?: number | undefined;
    /**
     * Optional tile key for proper cache fetching
     */
    key?: string | undefined;
    /**
     * Choose whether to use tiles with a higher or lower zoom level when between integer
     * zoom levels. See {@link module :ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
     */
    zDirection?: number | import("../array.js").NearestDirectionFunction | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("./Source.js").State} [state] Source state.
 * @property {typeof import("../ImageTile.js").default} [tileClass] Class used to instantiate image tiles.
 * Default is {@link module:ol/ImageTile~ImageTile}.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service. For example, if the tile
 * service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Optional function to get tile URL given a tile coordinate and the projection.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
 * used instead of defining each one separately in the `urls` option.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX] Whether to wrap the world horizontally. The default, is to
 * request out-of-bounds tiles from the server. When set to `false`, only one
 * world will be rendered. When set to `true`, tiles will be requested for one
 * world only, but they will be wrapped horizontally to render multiple worlds.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {string} [key] Optional tile key for proper cache fetching
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */
/**
 * @classdesc
 * Base class for sources providing images divided into a tile grid.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @api
 */
declare class TileImage extends UrlTile {
    /**
     * @param {!Options} options Image tile options.
     */
    constructor(options: Options);
    /**
     * @protected
     * @type {?string}
     */
    protected crossOrigin: string | null;
    /**
     * @protected
     * @type {typeof ImageTile}
     */
    protected tileClass: typeof ImageTile;
    /**
     * @protected
     * @type {!Object<string, TileCache>}
     */
    protected tileCacheForProjection: {
        [x: string]: TileCache;
    };
    /**
     * @protected
     * @type {!Object<string, import("../tilegrid/TileGrid.js").default>}
     */
    protected tileGridForProjection: {
        [x: string]: import("../tilegrid/TileGrid.js").default;
    };
    /**
     * @private
     * @type {number|undefined}
     */
    private reprojectionErrorThreshold_;
    /**
     * @private
     * @type {boolean}
     */
    private renderReprojectionEdges_;
    /**
     * @return {number} Gutter.
     */
    getGutter(): number;
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @param {string} key The key set on the tile.
     * @return {!ImageTile} Tile.
     * @private
     */
    private createTile_;
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!(ImageTile|ReprojTile)} Tile.
     */
    getTile(z: number, x: number, y: number, pixelRatio: number, projection: import("../proj/Projection.js").default): (ImageTile | ReprojTile);
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {!import("../proj/Projection.js").default} projection Projection.
     * @return {!(ImageTile|ReprojTile)} Tile.
     * @protected
     */
    protected getTileInternal(z: number, x: number, y: number, pixelRatio: number, projection: import("../proj/Projection.js").default): (ImageTile | ReprojTile);
    /**
     * Sets whether to render reprojection edges or not (usually for debugging).
     * @param {boolean} render Render the edges.
     * @api
     */
    setRenderReprojectionEdges(render: boolean): void;
    /**
     * Sets the tile grid to use when reprojecting the tiles to the given
     * projection instead of the default tile grid for the projection.
     *
     * This can be useful when the default tile grid cannot be created
     * (e.g. projection has no extent defined) or
     * for optimization reasons (custom tile size, resolutions, ...).
     *
     * @param {import("../proj.js").ProjectionLike} projection Projection.
     * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
     * @api
     */
    setTileGridForProjection(projection: import("../proj.js").ProjectionLike, tilegrid: import("../tilegrid/TileGrid.js").default): void;
}
import ImageTile from "../ImageTile.js";
import UrlTile from "./UrlTile.js";
import TileCache from "../TileCache.js";
import ReprojTile from "../reproj/Tile.js";
//# sourceMappingURL=TileImage.d.ts.map