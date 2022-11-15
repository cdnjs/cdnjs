export default Tile;
/**
 * A function that takes an {@link module:ol/Tile} for the tile and a
 * `{string}` for the url as arguments. The default is
 * ```js
 * source.setTileLoadFunction(function(tile, src) {
 *    tile.getImage().src = src;
 * });
 * ```
 * For more fine grained control, the load function can use fetch or XMLHttpRequest and involve
 * error handling:
 *
 * ```js
 * import TileState from 'ol/TileState';
 *
 * source.setTileLoadFunction(function(tile, src) {
 *    var xhr = new XMLHttpRequest();
 *    xhr.responseType = 'blob';
 *    xhr.addEventListener('loadend', function (evt) {
 *      var data = this.response;
 *      if (data !== undefined) {
 *        tile.getImage().src = URL.createObjectURL(data);
 *      } else {
 *        tile.setState(TileState.ERROR);
 *      }
 *    });
 *    xhr.addEventListener('error', function () {
 *      tile.setState(TileState.ERROR);
 *    });
 *    xhr.open('GET', src);
 *    xhr.send();
 * });
 * ```
 */
export type LoadFunction = (arg0: Tile, arg1: string) => void;
/**
 * {@link module:ol/source/Tile~Tile} sources use a function of this type to get
 * the url that provides a tile for a given tile coordinate.
 *
 * This function takes an {@link module:ol/tilecoord~TileCoord} for the tile
 * coordinate, a `{number}` representing the pixel ratio and a
 * {@link module:ol/proj/Projection} for the projection  as arguments
 * and returns a `{string}` representing the tile URL, or undefined if no tile
 * should be requested for the passed tile coordinate.
 */
export type UrlFunction = (arg0: number[], arg1: number, arg2: import("./proj/Projection.js").default) => string | undefined;
export type Options = {
    /**
     * A duration for tile opacity
     * transitions in milliseconds. A duration of 0 disables the opacity transition.
     */
    transition?: number;
};
/**
 * A function that takes an {@link module:ol/Tile} for the tile and a
 * `{string}` for the url as arguments. The default is
 * ```js
 * source.setTileLoadFunction(function(tile, src) {
 *   tile.getImage().src = src;
 * });
 * ```
 * For more fine grained control, the load function can use fetch or XMLHttpRequest and involve
 * error handling:
 *
 * ```js
 * import TileState from 'ol/TileState';
 *
 * source.setTileLoadFunction(function(tile, src) {
 *   var xhr = new XMLHttpRequest();
 *   xhr.responseType = 'blob';
 *   xhr.addEventListener('loadend', function (evt) {
 *     var data = this.response;
 *     if (data !== undefined) {
 *       tile.getImage().src = URL.createObjectURL(data);
 *     } else {
 *       tile.setState(TileState.ERROR);
 *     }
 *   });
 *   xhr.addEventListener('error', function () {
 *     tile.setState(TileState.ERROR);
 *   });
 *   xhr.open('GET', src);
 *   xhr.send();
 * });
 * ```
 *
 * @typedef {function(Tile, string): void} LoadFunction
 * @api
 */
/**
 * {@link module:ol/source/Tile~Tile} sources use a function of this type to get
 * the url that provides a tile for a given tile coordinate.
 *
 * This function takes an {@link module:ol/tilecoord~TileCoord} for the tile
 * coordinate, a `{number}` representing the pixel ratio and a
 * {@link module:ol/proj/Projection} for the projection  as arguments
 * and returns a `{string}` representing the tile URL, or undefined if no tile
 * should be requested for the passed tile coordinate.
 *
 * @typedef {function(import("./tilecoord.js").TileCoord, number,
 *           import("./proj/Projection.js").default): (string|undefined)} UrlFunction
 * @api
 */
/**
 * @typedef {Object} Options
 * @property {number} [transition=250] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 * @api
 */
/**
 * @classdesc
 * Base class for tiles.
 *
 * @abstract
 */
declare class Tile extends EventTarget {
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("./TileState.js").default} state State.
     * @param {Options} [opt_options] Tile options.
     */
    constructor(tileCoord: number[], state: any, opt_options?: Options | undefined);
    /**
     * @type {import("./tilecoord.js").TileCoord}
     */
    tileCoord: import("./tilecoord.js").TileCoord;
    /**
     * @protected
     * @type {import("./TileState.js").default}
     */
    protected state: import("./TileState.js").default;
    /**
     * An "interim" tile for this tile. The interim tile may be used while this
     * one is loading, for "smooth" transitions when changing params/dimensions
     * on the source.
     * @type {Tile}
     */
    interimTile: Tile;
    /**
     * A key assigned to the tile. This is used by the tile source to determine
     * if this tile can effectively be used, or if a new tile should be created
     * and this one be used as an interim tile for this new tile.
     * @type {string}
     */
    key: string;
    /**
     * The duration for the opacity transition.
     * @type {number}
     */
    transition_: number;
    /**
     * Lookup of start times for rendering transitions.  If the start time is
     * equal to -1, the transition is complete.
     * @type {Object<string, number>}
     */
    transitionStarts_: {
        [x: string]: number;
    };
    /**
     * @protected
     */
    protected changed(): void;
    /**
     * Called by the tile cache when the tile is removed from the cache due to expiry
     */
    release(): void;
    /**
     * @return {string} Key.
     */
    getKey(): string;
    /**
     * Get the interim tile most suitable for rendering using the chain of interim
     * tiles. This corresponds to the  most recent tile that has been loaded, if no
     * such tile exists, the original tile is returned.
     * @return {!Tile} Best tile for rendering.
     */
    getInterimTile(): Tile;
    /**
     * Goes through the chain of interim tiles and discards sections of the chain
     * that are no longer relevant.
     */
    refreshInterimChain(): void;
    /**
     * Get the tile coordinate for this tile.
     * @return {import("./tilecoord.js").TileCoord} The tile coordinate.
     * @api
     */
    getTileCoord(): number[];
    /**
     * @return {import("./TileState.js").default} State.
     */
    getState(): any;
    /**
     * Sets the state of this tile. If you write your own {@link module:ol/Tile~LoadFunction tileLoadFunction} ,
     * it is important to set the state correctly to {@link module:ol/TileState~ERROR}
     * when the tile cannot be loaded. Otherwise the tile cannot be removed from
     * the tile queue and will block other requests.
     * @param {import("./TileState.js").default} state State.
     * @api
     */
    setState(state: any): void;
    /**
     * Load the image or retry if loading previously failed.
     * Loading is taken care of by the tile queue, and calling this method is
     * only needed for preloading or for reloading in case of an error.
     * @abstract
     * @api
     */
    load(): void;
    /**
     * Get the alpha value for rendering.
     * @param {string} id An id for the renderer.
     * @param {number} time The render frame time.
     * @return {number} A number between 0 and 1.
     */
    getAlpha(id: string, time: number): number;
    /**
     * Determine if a tile is in an alpha transition.  A tile is considered in
     * transition if tile.getAlpha() has not yet been called or has been called
     * and returned 1.
     * @param {string} id An id for the renderer.
     * @return {boolean} The tile is in transition.
     */
    inTransition(id: string): boolean;
    /**
     * Mark a transition as complete.
     * @param {string} id An id for the renderer.
     */
    endTransition(id: string): void;
}
import EventTarget from "./events/Target.js";
//# sourceMappingURL=Tile.d.ts.map