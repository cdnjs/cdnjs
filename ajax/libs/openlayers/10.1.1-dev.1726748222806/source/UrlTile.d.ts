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
     * Deprecated.  Use the cacheSize option on the layer instead.
     */
    cacheSize?: number | undefined;
    /**
     * Projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * State.
     */
    state?: import("./Source.js").State | undefined;
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
     * Deprecated.  Use an ImageTile source and provide a function
     * for the url option instead.
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
 * @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {import("./Source.js").State} [state] State.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
 * @property {import("../Tile.js").LoadFunction} tileLoadFunction TileLoadFunction.
 * @property {number} [tilePixelRatio] TilePixelRatio.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Deprecated.  Use an ImageTile source and provide a function
 * for the url option instead.
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
 * @deprecated Use the ol/source/ImageTile.js instead.
 *
 * @fires import("./Tile.js").TileSourceEvent
 */
declare class UrlTile extends TileSource<import("../Tile.js").default> {
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
     * Deprecated.  Use an ImageTile source instead.
     * Return the tile load function of the source.
     * @return {import("../Tile.js").LoadFunction} TileLoadFunction
     * @api
     */
    getTileLoadFunction(): import("../Tile.js").LoadFunction;
    /**
     * Deprecated.  Use an ImageTile source instead.
     * Return the tile URL function of the source.
     * @return {import("../Tile.js").UrlFunction} TileUrlFunction
     * @api
     */
    getTileUrlFunction(): import("../Tile.js").UrlFunction;
    /**
     * Deprecated.  Use an ImageTile source instead.
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
     * Deprecated.  Use an ImageTile source instead.
     * Set the tile load function of the source.
     * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
     * @api
     */
    setTileLoadFunction(tileLoadFunction: import("../Tile.js").LoadFunction): void;
    /**
     * Deprecated.  Use an ImageTile source instead.
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
     * Deprecated.  Use an ImageTile source instead.
     * Set the URLs to use for requests.
     * @param {Array<string>} urls URLs.
     * @api
     */
    setUrls(urls: Array<string>): void;
}
import TileSource from './Tile.js';
//# sourceMappingURL=UrlTile.d.ts.map