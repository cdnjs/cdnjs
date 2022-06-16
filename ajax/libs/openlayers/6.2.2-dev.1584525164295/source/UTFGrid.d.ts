/**
 * @typedef {Object} UTFGridJSON
 * @property {Array<string>} grid The grid.
 * @property {Array<string>} keys The keys.
 * @property {Object<string, Object>} [data] Optional data.
 */
export class CustomTile extends Tile {
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {TileState} state State.
     * @param {string} src Image source URI.
     * @param {import("../extent.js").Extent} extent Extent of the tile.
     * @param {boolean} preemptive Load the tile when visible (before it's needed).
     * @param {boolean} jsonp Load the tile as a script.
     */
    constructor(tileCoord: number[], state: {
        IDLE: number;
        LOADING: number;
        LOADED: number;
        ERROR: number;
        EMPTY: number;
    }, src: string, extent: number[], preemptive: boolean, jsonp: boolean);
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
    getData(coordinate: number[]): any;
    /**
     * Calls the callback (synchronously by default) with the available data
     * for given coordinate (or `null` if not yet loaded).
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {function(*): void} callback Callback.
     * @param {boolean=} opt_request If `true` the callback is always async.
     *                               The tile data is requested if not yet loaded.
     */
    forDataAtCoordinate(coordinate: number[], callback: (arg0: any) => void, opt_request?: boolean): void;
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
    grid: string[];
    /**
     * The keys.
     */
    keys: string[];
    /**
     * Optional data.
     */
    data?: {
        [x: string]: any;
    };
};
export type Options = {
    /**
     * If `true` the UTFGrid source loads the tiles based on their "visibility".
     * This improves the speed of response, but increases traffic.
     * Note that if set to `false` (lazy loading), you need to pass `true` as
     * `opt_request` to the `forDataAtCoordinateAndResolution` method otherwise no
     * data will ever be loaded.
     */
    preemptive?: boolean;
    /**
     * Use JSONP with callback to load the TileJSON.
     * Useful when the server does not support CORS..
     */
    jsonp?: boolean;
    /**
     * TileJSON configuration for this source.
     * If not provided, `url` must be configured.
     */
    tileJSON?: import("./TileJSON.js").Config;
    /**
     * TileJSON endpoint that provides the configuration for this source.
     * Request will be made through JSONP. If not provided, `tileJSON` must be configured.
     */
    url?: string;
};
import Tile from "../Tile.js";
/**
 * @typedef {Object} Options
 * @property {boolean} [preemptive=true]
 * If `true` the UTFGrid source loads the tiles based on their "visibility".
 * This improves the speed of response, but increases traffic.
 * Note that if set to `false` (lazy loading), you need to pass `true` as
 * `opt_request` to the `forDataAtCoordinateAndResolution` method otherwise no
 * data will ever be loaded.
 * @property {boolean} [jsonp=false] Use JSONP with callback to load the TileJSON.
 * Useful when the server does not support CORS..
 * @property {import("./TileJSON.js").Config} [tileJSON] TileJSON configuration for this source.
 * If not provided, `url` must be configured.
 * @property {string} [url] TileJSON endpoint that provides the configuration for this source.
 * Request will be made through JSONP. If not provided, `tileJSON` must be configured.
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
    getTemplate(): string;
    /**
     * Calls the callback (synchronously by default) with the available data
     * for given coordinate and resolution (or `null` if not yet loaded or
     * in case of an error).
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} resolution Resolution.
     * @param {function(*): void} callback Callback.
     * @param {boolean=} opt_request If `true` the callback is always async.
     *                               The tile data is requested if not yet loaded.
     * @api
     */
    forDataAtCoordinateAndResolution(coordinate: number[], resolution: number, callback: (arg0: any) => void, opt_request?: boolean): void;
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
     * @inheritDoc
     */
    getTile(z: any, x: any, y: any, pixelRatio: any, projection: any): any;
    /**
     * @inheritDoc
     */
    useTile(z: any, x: any, y: any): void;
}
import TileSource from "./Tile.js";
//# sourceMappingURL=UTFGrid.d.ts.map