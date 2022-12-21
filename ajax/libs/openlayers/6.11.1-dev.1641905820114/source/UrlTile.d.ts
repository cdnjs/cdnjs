export default UrlTile;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: string | string[] | ((arg0: import("../PluggableMap.js").FrameState) => string | string[]);
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
    projection?: string | import("../proj/Projection.js").default | undefined;
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
    tileLoadFunction: (arg0: import("../Tile.js").default, arg1: string) => void;
    /**
     * TilePixelRatio.
     */
    tilePixelRatio?: number;
    /**
     * TileUrlFunction.
     */
    tileUrlFunction?: (arg0: number[], arg1: number, arg2: import("../proj/Projection.js").default) => string | undefined;
    /**
     * Url.
     */
    url?: string;
    /**
     * Urls.
     */
    urls?: string[];
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
    zDirection?: number | ((arg0: number, arg1: number, arg2: number) => number);
    /**
     * Use interpolated values when resampling.  By default,
     * the nearest neighbor is used when resampling.
     */
    interpolate?: boolean;
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
    tileUrlFunction(tileCoord: number[], pixelRatio: number, projection: import("../proj/Projection.js").default): string | undefined;
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
    getTileLoadFunction(): (arg0: import("../Tile.js").default, arg1: string) => void;
    /**
     * Return the tile URL function of the source.
     * @return {import("../Tile.js").UrlFunction} TileUrlFunction
     * @api
     */
    getTileUrlFunction(): (arg0: number[], arg1: number, arg2: import("../proj/Projection.js").default) => string | undefined;
    /**
     * Return the URLs used for this source.
     * When a tileUrlFunction is used instead of url or urls,
     * null will be returned.
     * @return {!Array<string>|null} URLs.
     * @api
     */
    getUrls(): string[] | null;
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
    setTileLoadFunction(tileLoadFunction: (arg0: import("../Tile.js").default, arg1: string) => void): void;
    /**
     * Set the tile URL function of the source.
     * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
     * @param {string} [key] Optional new tile key for the source.
     * @api
     */
    setTileUrlFunction(tileUrlFunction: (arg0: number[], arg1: number, arg2: import("../proj/Projection.js").default) => string | undefined, key?: string | undefined): void;
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
    setUrls(urls: string[]): void;
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