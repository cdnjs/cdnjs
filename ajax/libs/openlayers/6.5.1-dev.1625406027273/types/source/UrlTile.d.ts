export default UrlTile;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike;
    /**
     * Attributions are collapsible.
     */
    attributionsCollapsible?: boolean;
    /**
     * Cache size.
     */
    cacheSize?: number;
    /**
     * Whether the layer is opaque.
     */
    opaque?: boolean;
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
    tileGrid?: import("../tilegrid/TileGrid.js").default;
    /**
     * TileLoadFunction.
     */
    tileLoadFunction: import("../Tile.js").LoadFunction;
    /**
     * TilePixelRatio.
     */
    tilePixelRatio?: number;
    /**
     * TileUrlFunction.
     */
    tileUrlFunction?: import("../Tile.js").UrlFunction;
    /**
     * Url.
     */
    url?: string;
    /**
     * Urls.
     */
    urls?: Array<string>;
    /**
     * WrapX.
     */
    wrapX?: boolean;
    /**
     * Transition.
     */
    transition?: number;
    /**
     * Key.
     */
    key?: string;
    /**
     * ZDirection.
     */
    zDirection?: number;
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
 * @property {number} [zDirection=0] ZDirection.
 */
/**
 * @classdesc
 * Base class for sources providing tiles divided into a tile grid over http.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @extends TileSource<'tileloadend'|'tileloaderror'|'tileloadstart'>
 */
declare class UrlTile extends TileSource<"tileloadstart" | "tileloadend" | "tileloaderror"> {
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
    setTileUrlFunction(tileUrlFunction: import("../Tile.js").UrlFunction, key?: string): void;
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
}
import TileSource from "./Tile.js";
//# sourceMappingURL=UrlTile.d.ts.map