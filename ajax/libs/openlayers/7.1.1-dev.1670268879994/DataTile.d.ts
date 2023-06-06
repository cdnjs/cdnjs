/**
 * @typedef {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} ImageLike
 */
/**
 * @typedef {Uint8Array|Uint8ClampedArray|Float32Array|DataView} ArrayLike
 */
/**
 * Data that can be used with a DataTile.
 * @typedef {ArrayLike|ImageLike} Data
 */
/**
 * @param {Data} data Tile data.
 * @return {ImageLike|null} The image-like data.
 */
export function asImageLike(data: Data): ImageLike | null;
/**
 * @param {Data} data Tile data.
 * @return {ArrayLike|null} The array-like data.
 */
export function asArrayLike(data: Data): ArrayLike | null;
/**
 * @param {ImageLike} image The image.
 * @return {Uint8ClampedArray} The data.
 */
export function toArray(image: ImageLike): Uint8ClampedArray;
export default DataTile;
export type ImageLike = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
export type ArrayLike = Uint8Array | Uint8ClampedArray | Float32Array | DataView;
/**
 * Data that can be used with a DataTile.
 */
export type Data = ArrayLike | ImageLike;
export type Options = {
    /**
     * Tile coordinate.
     */
    tileCoord: import("./tilecoord.js").TileCoord;
    /**
     * Data loader.  For loaders that generate images,
     * the promise should not resolve until the image is loaded.
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
    /**
     * Tile size.
     */
    size?: import("./size.js").Size | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @property {function(): Promise<Data>} loader Data loader.  For loaders that generate images,
 * the promise should not resolve until the image is loaded.
 * @property {number} [transition=250] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 * @property {import('./size.js').Size} [size=[256, 256]] Tile size.
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
     * @type {import('./size.js').Size|null}
     * @private
     */
    private size_;
    /**
     * Get the tile size.
     * @return {import('./size.js').Size} Tile size.
     */
    getSize(): import('./size.js').Size;
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