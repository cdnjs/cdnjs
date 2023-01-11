export default DataTile;
/**
 * Data that can be used with a DataTile.  For increased browser compatibility, use
 * Uint8Array instead of Uint8ClampedArray where possible.
 */
export type Data = Uint8Array | Uint8ClampedArray | Float32Array | DataView;
export type Options = {
    /**
     * Tile coordinate.
     */
    tileCoord: import("./tilecoord.js").TileCoord;
    /**
     * Data loader.
     */
    loader: () => Promise<Data>;
    /**
     * A duration for tile opacity
     * transitions in milliseconds. A duration of 0 disables the opacity transition.
     */
    transition?: number | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * the nearest neighbor is used when resampling.
     */
    interpolate?: boolean | undefined;
};
/**
 * Data that can be used with a DataTile.  For increased browser compatibility, use
 * Uint8Array instead of Uint8ClampedArray where possible.
 * @typedef {Uint8Array|Uint8ClampedArray|Float32Array|DataView} Data
 */
/**
 * @typedef {Object} Options
 * @property {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @property {function(): Promise<Data>} loader Data loader.
 * @property {number} [transition=250] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 * @api
 */
declare class DataTile extends Tile {
    /**
     * @param {Options} options Tile options.
     */
    constructor(options: Options);
    /**
     * @type {function(): Promise<Data>}
     * @private
     */
    private loader_;
    /**
     * @type {Data}
     * @private
     */
    private data_;
    /**
     * @type {Error}
     * @private
     */
    private error_;
    /**
     * Get the data for the tile.
     * @return {Data} Tile data.
     * @api
     */
    getData(): Data;
    /**
     * Get any loading error.
     * @return {Error} Loading error.
     * @api
     */
    getError(): Error;
}
import Tile from "./Tile.js";
//# sourceMappingURL=DataTile.d.ts.map