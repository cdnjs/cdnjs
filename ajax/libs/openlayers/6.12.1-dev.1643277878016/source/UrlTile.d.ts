export default UrlTile;
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
     * Cache size.
     */
    cacheSize?: number | undefined;
    /**
     * Whether the layer is opaque.
     */
    opaque?: boolean | undefined;
    /**
     * Projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * State.
     */
    state?: any;
    /**
     * TileGrid.
     */
    tileGrid?: import("../tilegrid/TileGrid.js").default | undefined;
    /**
     * TileLoadFunction.
     */
    tileLoadFunction: import("../Tile.js").LoadFunction;
    /**
     * TilePixelRatio.
     */
    tilePixelRatio?: number | undefined;
    /**
     * TileUrlFunction.
     */
    tileUrlFunction?: import("../Tile.js").UrlFunction | undefined;
    /**
     * Url.
     */
    url?: string | undefined;
    /**
     * Urls.
     */
    urls?: string[] | undefined;
    /**
     * WrapX.
     */
    wrapX?: boolean | undefined;
    /**
     * Transition.
     */
    transition?: number | undefined;
    /**
     * Key.
     */
    key?: string | undefined;
    /**
     * ZDirection.
     */
    zDirection?: number | import("../array.js").NearestDirectionFunction | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * the nearest neighbor is used when resampling.
     */
    interpolate?: boolean | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Cache size.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {import("./State.js").default} [state] State.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
 * @property {import("../Tile.js").LoadFunction} tileLoadFunction TileLoadFunction.
 * @property {number} [tilePixelRatio] TilePixelRatio.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] TileUrlFunction.
 * @property {string} [url] Url.
 * @property {Array<string>} [urls] Urls.
 * @property {boolean} [wrapX=true] WrapX.
 * @property {number} [transition] Transition.
 * @property {string} [key] Key.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 */
/**
 * @classdesc
 * Base class for sources providing tiles divided into a tile grid over http.
 *
 * @fires import("./Tile.js").TileSourceEvent
 */
declare class UrlTile extends TileSource {
    /**
     * @param {Options} options Image tile options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {boolean}
     */
    private generateTileUrlFunction_;
    /**
     * @protected
     * @type {import("../Tile.js").LoadFunction}
     */
    protected tileLoadFunction: import("../Tile.js").LoadFunction;
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    tileUrlFunction(tileCoord: import("../tilecoord.js").TileCoord, pixelRatio: number, projection: import("../proj/Projection.js").default): string | undefined;
    /**
     * @protected
     * @type {!Array<string>|null}
     */
    protected urls: Array<string> | null;
    /**
     * @private
     * @type {!Object<string, boolean>}
     */
    private tileLoadingKeys_;
    /**
     * Return the tile load function of the source.
     * @return {import("../Tile.js").LoadFunction} TileLoadFunction
     * @api
     */
    getTileLoadFunction(): import("../Tile.js").LoadFunction;
    /**
     * Return the tile URL function of the source.
     * @return {import("../Tile.js").UrlFunction} TileUrlFunction
     * @api
     */
    getTileUrlFunction(): import("../Tile.js").UrlFunction;
    /**
     * Return the URLs used for this source.
     * When a tileUrlFunction is used instead of url or urls,
     * null will be returned.
     * @return {!Array<string>|null} URLs.
     * @api
     */
    getUrls(): Array<string> | null;
    /**
     * Handle tile change events.
     * @param {import("../events/Event.js").default} event Event.
     * @protected
     */
    protected handleTileChange(event: import("../events/Event.js").default): void;
    /**
     * Set the tile load function of the source.
     * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
     * @api
     */
    setTileLoadFunction(tileLoadFunction: import("../Tile.js").LoadFunction): void;
    /**
     * Set the tile URL function of the source.
     * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
     * @param {string} [key] Optional new tile key for the source.
     * @api
     */
    setTileUrlFunction(tileUrlFunction: import("../Tile.js").UrlFunction, key?: string | undefined): void;
    /**
     * Set the URL to use for requests.
     * @param {string} url URL.
     * @api
     */
    setUrl(url: string): void;
    /**
     * Set the URLs to use for requests.
     * @param {Array<string>} urls URLs.
     * @api
     */
    setUrls(urls: Array<string>): void;
    /**
     * Marks a tile coord as being used, without triggering a load.
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     */
    useTile(z: number, x: number, y: number): void;
}
import TileSource from "./Tile.js";
//# sourceMappingURL=UrlTile.d.ts.map