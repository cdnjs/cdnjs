/**
 * @typedef {Object} UTFGridJSON
 * @property {Array<string>} grid The grid.
 * @property {Array<string>} keys The keys.
 * @property {Object<string, Object>} [data] Optional data.
 */
export class CustomTile extends Tile {
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../TileState.js").default} state State.
     * @param {string} src Image source URI.
     * @param {import("../extent.js").Extent} extent Extent of the tile.
     * @param {boolean} preemptive Load the tile when visible (before it's needed).
     * @param {boolean} jsonp Load the tile as a script.
     */
    constructor(tileCoord: import("../tilecoord.js").TileCoord, state: any, src: string, extent: import("../extent.js").Extent, preemptive: boolean, jsonp: boolean);
    /**
     * @private
     * @type {string}
     */
    private src_;
    /**
     * @private
     * @type {import("../extent.js").Extent}
     */
    private extent_;
    /**
     * @private
     * @type {boolean}
     */
    private preemptive_;
    /**
     * @private
     * @type {Array<string>}
     */
    private grid_;
    /**
     * @private
     * @type {Array<string>}
     */
    private keys_;
    /**
     * @private
     * @type {Object<string, Object>|undefined}
     */
    private data_;
    /**
     * @private
     * @type {boolean}
     */
    private jsonp_;
    /**
     * Get the image element for this tile.
     * @return {HTMLImageElement} Image.
     */
    getImage(): HTMLImageElement;
    /**
     * Synchronously returns data at given coordinate (if available).
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {*} The data.
     */
    getData(coordinate: import("../coordinate.js").Coordinate): any;
    /**
     * Calls the callback (synchronously by default) with the available data
     * for given coordinate (or `null` if not yet loaded).
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {function(*): void} callback Callback.
     * @param {boolean} [request] If `true` the callback is always async.
     *                               The tile data is requested if not yet loaded.
     */
    forDataAtCoordinate(coordinate: import("../coordinate.js").Coordinate, callback: (arg0: any) => void, request?: boolean | undefined): void;
    /**
     * @private
     */
    private handleError_;
    /**
     * @param {!UTFGridJSON} json UTFGrid data.
     * @private
     */
    private handleLoad_;
    /**
     * @private
     */
    private loadInternal_;
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
}
export default UTFGrid;
export type UTFGridJSON = {
    /**
     * The grid.
     */
    grid: Array<string>;
    /**
     * The keys.
     */
    keys: Array<string>;
    /**
     * Optional data.
     */
    data?: {
        [x: string]: any;
    } | undefined;
};
export type Options = {
    /**
     * If `true` the UTFGrid source loads the tiles based on their "visibility".
     * This improves the speed of response, but increases traffic.
     * Note that if set to `false` (lazy loading), you need to pass `true` as
     * `request` to the `forDataAtCoordinateAndResolution` method otherwise no
     * data will ever be loaded.
     */
    preemptive?: boolean | undefined;
    /**
     * Use JSONP with callback to load the TileJSON.
     * Useful when the server does not support CORS..
     */
    jsonp?: boolean | undefined;
    /**
     * TileJSON configuration for this source.
     * If not provided, `url` must be configured.
     */
    tileJSON?: import("./TileJSON.js").Config | undefined;
    /**
     * TileJSON endpoint that provides the configuration for this source.
     * Request will be made through JSONP. If not provided, `tileJSON` must be configured.
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
};
import Tile from '../Tile.js';
/**
 * @typedef {Object} Options
 * @property {boolean} [preemptive=true]
 * If `true` the UTFGrid source loads the tiles based on their "visibility".
 * This improves the speed of response, but increases traffic.
 * Note that if set to `false` (lazy loading), you need to pass `true` as
 * `request` to the `forDataAtCoordinateAndResolution` method otherwise no
 * data will ever be loaded.
 * @property {boolean} [jsonp=false] Use JSONP with callback to load the TileJSON.
 * Useful when the server does not support CORS..
 * @property {import("./TileJSON.js").Config} [tileJSON] TileJSON configuration for this source.
 * If not provided, `url` must be configured.
 * @property {string} [url] TileJSON endpoint that provides the configuration for this source.
 * Request will be made through JSONP. If not provided, `tileJSON` must be configured.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */
/**
 * @classdesc
 * Layer source for UTFGrid interaction data loaded from TileJSON format.
 * @api
 */
declare class UTFGrid extends TileSource {
    /**
     * @param {Options} options Source options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {boolean}
     */
    private preemptive_;
    /**
     * @private
     * @type {!import("../Tile.js").UrlFunction}
     */
    private tileUrlFunction_;
    /**
     * @private
     * @type {string|undefined}
     */
    private template_;
    /**
     * @private
     * @type {boolean}
     */
    private jsonp_;
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
     * Return the template from TileJSON.
     * @return {string|undefined} The template from TileJSON.
     * @api
     */
    getTemplate(): string | undefined;
    /**
     * Calls the callback (synchronously by default) with the available data
     * for given coordinate and resolution (or `null` if not yet loaded or
     * in case of an error).
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} resolution Resolution.
     * @param {function(*): void} callback Callback.
     * @param {boolean} [request] If `true` the callback is always async.
     *                               The tile data is requested if not yet loaded.
     * @api
     */
    forDataAtCoordinateAndResolution(coordinate: import("../coordinate.js").Coordinate, resolution: number, callback: (arg0: any) => void, request?: boolean | undefined): void;
    /**
     * @protected
     */
    protected handleTileJSONError(): void;
    /**
     * TODO: very similar to ol/source/TileJSON#handleTileJSONResponse
     * @protected
     * @param {import("./TileJSON.js").Config} tileJSON Tile JSON.
     */
    protected handleTileJSONResponse(tileJSON: import("./TileJSON.js").Config): void;
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!CustomTile} Tile.
     */
    getTile(z: number, x: number, y: number, pixelRatio: number, projection: import("../proj/Projection.js").default): CustomTile;
    /**
     * Marks a tile coord as being used, without triggering a load.
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     */
    useTile(z: number, x: number, y: number): void;
}
import TileSource from './Tile.js';
//# sourceMappingURL=UTFGrid.d.ts.map