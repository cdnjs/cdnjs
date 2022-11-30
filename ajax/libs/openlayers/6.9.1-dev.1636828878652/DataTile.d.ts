export default DataTile;
/**
 * Data that can be used with a DataTile.  For increased browser compatibility, use
 * Uint8Array instead of Uint8ClampedArray where possible.
 */
export type Data = DataView | Uint8Array | Uint8ClampedArray | Float32Array;
export type Options = {
    /**
     * Tile coordinate.
     */
    tileCoord: number[];
    /**
     * Data loader.
     */
    loader: () => Promise<DataView | Uint8Array | Uint8ClampedArray | Float32Array>;
    /**
     * A duration for tile opacity
     * transitions in milliseconds. A duration of 0 disables the opacity transition.
     */
    transition?: number;
};
/**
 * Data that can be used with a DataTile.  For increased browser compatibility, use
 * Uint8Array instead of Uint8ClampedArray where possible.
 * @typedef {Uint8Array|Uint8ClampedArray|Float32Array|DataView} Data
 */
/**
 * @typedef {Object} Options
 * @property {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @property {function() : Promise<Data>} loader Data loader.
 * @property {number} [transition=250] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 * @api
 */
declare class DataTile extends Tile {
    /**
     * @param {Options} options Tile options.
     */
    constructor(options: Options);
    loader_: () => Promise<DataView | Uint8Array | Uint8ClampedArray | Float32Array>;
    data_: any;
    error_: any;
    /**
     * Get the data for the tile.
     * @return {Data} Tile data.
     * @api
     */
    getData(): DataView | Uint8Array | Uint8ClampedArray | Float32Array;
    /**
     * Get any loading error.
     * @return {Error} Loading error.
     * @api
     */
    getError(): Error;
}
import Tile from "./Tile.js";
//# sourceMappingURL=DataTile.d.ts.map