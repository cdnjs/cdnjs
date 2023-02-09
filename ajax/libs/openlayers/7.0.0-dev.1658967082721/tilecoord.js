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
export function createOrUpdate(z, x, y, opt_tileCoord) {
    if (opt_tileCoord !== undefined) {
        opt_tileCoord[0] = z;
        opt_tileCoord[1] = x;
        opt_tileCoord[2] = y;
        return opt_tileCoord;
    }
    else {
        return [z, x, y];
    }
}
/**
 * @param {number} z Z.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {string} Key.
 */
export function getKeyZXY(z, x, y) {
    return z + '/' + x + '/' + y;
}
/**
 * Get the key for a tile coord.
 * @param {TileCoord} tileCoord The tile coord.
 * @return {string} Key.
 */
export function getKey(tileCoord) {
    return getKeyZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
}
/**
 * Get the tile cache key for a tile key obtained through `tile.getKey()`.
 * @param {string} tileKey The tile key.
 * @return {string} The cache key.
 */
export function getCacheKeyForTileKey(tileKey) {
    var _a = tileKey
        .substring(tileKey.lastIndexOf('/') + 1, tileKey.length)
        .split(',')
        .map(Number), z = _a[0], x = _a[1], y = _a[2];
    return getKeyZXY(z, x, y);
}
/**
 * Get a tile coord given a key.
 * @param {string} key The tile coord key.
 * @return {TileCoord} The tile coord.
 */
export function fromKey(key) {
    return key.split('/').map(Number);
}
/**
 * @param {TileCoord} tileCoord Tile coord.
 * @return {number} Hash.
 */
export function hash(tileCoord) {
    return (tileCoord[1] << tileCoord[0]) + tileCoord[2];
}
/**
 * @param {TileCoord} tileCoord Tile coordinate.
 * @param {!import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {boolean} Tile coordinate is within extent and zoom level range.
 */
export function withinExtentAndZ(tileCoord, tileGrid) {
    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = tileCoord[2];
    if (tileGrid.getMinZoom() > z || z > tileGrid.getMaxZoom()) {
        return false;
    }
    var tileRange = tileGrid.getFullTileRange(z);
    if (!tileRange) {
        return true;
    }
    else {
        return tileRange.containsXY(x, y);
    }
}
//# sourceMappingURL=tilecoord.js.map