/**
 * @module ol/tilecoord
 */
/**
 * An array of three numbers representing the location of a tile in a tile
 * grid. The order is `z` (zoom level), `x` (column), and `y` (row).
 * @typedef {Array<number>} TileCoord
 * @api
 */
/**
 * @param {number} z Z.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {TileCoord} [opt_tileCoord] Tile coordinate.
 * @return {TileCoord} Tile coordinate.
 */
export function createOrUpdate(z: number, x: number, y: number, opt_tileCoord?: number[] | undefined): number[];
/**
 * @param {number} z Z.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {string} Key.
 */
export function getKeyZXY(z: number, x: number, y: number): string;
/**
 * Get the key for a tile coord.
 * @param {TileCoord} tileCoord The tile coord.
 * @return {string} Key.
 */
export function getKey(tileCoord: number[]): string;
/**
 * Get the tile cache key for a tile key obtained through `tile.getKey()`.
 * @param {string} tileKey The tile key.
 * @return {string} The cache key.
 */
export function getCacheKeyForTileKey(tileKey: string): string;
/**
 * Get a tile coord given a key.
 * @param {string} key The tile coord key.
 * @return {TileCoord} The tile coord.
 */
export function fromKey(key: string): number[];
/**
 * @param {TileCoord} tileCoord Tile coord.
 * @return {number} Hash.
 */
export function hash(tileCoord: number[]): number;
/**
 * @param {TileCoord} tileCoord Tile coordinate.
 * @param {!import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {boolean} Tile coordinate is within extent and zoom level range.
 */
export function withinExtentAndZ(tileCoord: number[], tileGrid: import("./tilegrid/TileGrid.js").default): boolean;
/**
 * An array of three numbers representing the location of a tile in a tile
 * grid. The order is `z` (zoom level), `x` (column), and `y` (row).
 */
export type TileCoord = number[];
//# sourceMappingURL=tilecoord.d.ts.map