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
 * @param {TileCoord} [tileCoord] Tile coordinate.
 * @return {TileCoord} Tile coordinate.
 */
export function createOrUpdate(z: number, x: number, y: number, tileCoord?: TileCoord | undefined): TileCoord;
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
export function getKey(tileCoord: TileCoord): string;
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
export function fromKey(key: string): TileCoord;
/**
 * @param {TileCoord} tileCoord Tile coord.
 * @return {number} Hash.
 */
export function hash(tileCoord: TileCoord): number;
/**
 * @param {number} z The tile z coordinate.
 * @param {number} x The tile x coordinate.
 * @param {number} y The tile y coordinate.
 * @return {number} Hash.
 */
export function hashZXY(z: number, x: number, y: number): number;
/**
 * @param {TileCoord} tileCoord Tile coordinate.
 * @param {!import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {boolean} Tile coordinate is within extent and zoom level range.
 */
export function withinExtentAndZ(tileCoord: TileCoord, tileGrid: import("./tilegrid/TileGrid.js").default): boolean;
/**
 * An array of three numbers representing the location of a tile in a tile
 * grid. The order is `z` (zoom level), `x` (column), and `y` (row).
 */
export type TileCoord = Array<number>;
//# sourceMappingURL=tilecoord.d.ts.map