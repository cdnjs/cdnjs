export default UrlTile;
export type Options = {
    attributions?: import("./Source.js").AttributionLike;
    /**
     * Attributions are collapsible.
     */
    attributionsCollapsible?: boolean;
    cacheSize?: number;
    opaque?: boolean;
    projection?: import("../proj.js").ProjectionLike;
    state?: any;
    tileGrid?: import("../tilegrid/TileGrid.js").default;
    tileLoadFunction: import("../Tile.js").LoadFunction;
    tilePixelRatio?: number;
    tileUrlFunction?: import("../Tile.js").UrlFunction;
    url?: string;
    urls?: Array<string>;
    wrapX?: boolean;
    transition?: number;
    key?: string;
    zDirection?: number;
};
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions]
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize]
 * @property {boolean} [opaque]
 * @property {import("../proj.js").ProjectionLike} [projection]
 * @property {import("./State.js").default} [state]
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid]
 * @property {import("../Tile.js").LoadFunction} tileLoadFunction
 * @property {number} [tilePixelRatio]
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction]
 * @property {string} [url]
 * @property {Array<string>} [urls]
 * @property {boolean} [wrapX=true]
 * @property {number} [transition]
 * @property {string} [key]
 * @property {number} [zDirection=0]
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
     * @protected
     * @type {import("../Tile.js").UrlFunction}
     */
    protected tileUrlFunction: import("../Tile.js").UrlFunction;
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
     * @param {string=} key Optional new tile key for the source.
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
     * @inheritDoc
     */
    useTile(z: any, x: any, y: any): void;
}
import TileSource from "./Tile.js";
//# sourceMappingURL=UrlTile.d.ts.map