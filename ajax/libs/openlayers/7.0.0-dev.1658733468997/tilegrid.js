/**
 * @module ol/tilegrid
 */
import TileGrid from './tilegrid/TileGrid.js';
import Units from './proj/Units.js';
import { DEFAULT_MAX_ZOOM, DEFAULT_TILE_SIZE } from './tilegrid/common.js';
import { METERS_PER_UNIT, get as getProjection } from './proj.js';
import { containsCoordinate, createOrUpdate, getCorner, getHeight, getWidth, } from './extent.js';
import { toSize } from './size.js';
/**
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {!TileGrid} Default tile grid for the
 * passed projection.
 */
export function getForProjection(projection) {
    var tileGrid = projection.getDefaultTileGrid();
    if (!tileGrid) {
        tileGrid = createForProjection(projection);
        projection.setDefaultTileGrid(tileGrid);
    }
    return tileGrid;
}
/**
 * @param {TileGrid} tileGrid Tile grid.
 * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {import("./tilecoord.js").TileCoord} Tile coordinate.
 */
export function wrapX(tileGrid, tileCoord, projection) {
    var z = tileCoord[0];
    var center = tileGrid.getTileCoordCenter(tileCoord);
    var projectionExtent = extentFromProjection(projection);
    if (!containsCoordinate(projectionExtent, center)) {
        var worldWidth = getWidth(projectionExtent);
        var worldsAway = Math.ceil((projectionExtent[0] - center[0]) / worldWidth);
        center[0] += worldWidth * worldsAway;
        return tileGrid.getTileCoordForCoordAndZ(center, z);
    }
    else {
        return tileCoord;
    }
}
/**
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} [opt_maxZoom] Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size} [opt_tileSize] Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {import("./extent.js").Corner} [opt_corner] Extent corner (default is `'top-left'`).
 * @return {!TileGrid} TileGrid instance.
 */
export function createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner) {
    var corner = opt_corner !== undefined ? opt_corner : 'top-left';
    var resolutions = resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize);
    return new TileGrid({
        extent: extent,
        origin: getCorner(extent, corner),
        resolutions: resolutions,
        tileSize: opt_tileSize,
    });
}
/**
 * @typedef {Object} XYZOptions
 * @property {import("./extent.js").Extent} [extent] Extent for the tile grid. The origin for an XYZ tile grid is the
 * top-left corner of the extent. If `maxResolution` is not provided the zero level of the grid is defined by the resolution
 * at which one tile fits in the provided extent. If not provided, the extent of the EPSG:3857 projection is used.
 * @property {number} [maxResolution] Resolution at level zero.
 * @property {number} [maxZoom] Maximum zoom. The default is `42`. This determines the number of levels
 * in the grid set. For example, a `maxZoom` of 21 means there are 22 levels in the grid set.
 * @property {number} [minZoom=0] Minimum zoom.
 * @property {number|import("./size.js").Size} [tileSize=[256, 256]] Tile size in pixels.
 */
/**
 * Creates a tile grid with a standard XYZ tiling scheme.
 * @param {XYZOptions} [opt_options] Tile grid options.
 * @return {!TileGrid} Tile grid instance.
 * @api
 */
export function createXYZ(opt_options) {
    var xyzOptions = opt_options || {};
    var extent = xyzOptions.extent || getProjection('EPSG:3857').getExtent();
    var gridOptions = {
        extent: extent,
        minZoom: xyzOptions.minZoom,
        tileSize: xyzOptions.tileSize,
        resolutions: resolutionsFromExtent(extent, xyzOptions.maxZoom, xyzOptions.tileSize, xyzOptions.maxResolution),
    };
    return new TileGrid(gridOptions);
}
/**
 * Create a resolutions array from an extent.  A zoom factor of 2 is assumed.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} [opt_maxZoom] Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size} [opt_tileSize] Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {number} [opt_maxResolution] Resolution at level zero.
 * @return {!Array<number>} Resolutions array.
 */
function resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize, opt_maxResolution) {
    var maxZoom = opt_maxZoom !== undefined ? opt_maxZoom : DEFAULT_MAX_ZOOM;
    var height = getHeight(extent);
    var width = getWidth(extent);
    var tileSize = toSize(opt_tileSize !== undefined ? opt_tileSize : DEFAULT_TILE_SIZE);
    var maxResolution = opt_maxResolution > 0
        ? opt_maxResolution
        : Math.max(width / tileSize[0], height / tileSize[1]);
    var length = maxZoom + 1;
    var resolutions = new Array(length);
    for (var z = 0; z < length; ++z) {
        resolutions[z] = maxResolution / Math.pow(2, z);
    }
    return resolutions;
}
/**
 * @param {import("./proj.js").ProjectionLike} projection Projection.
 * @param {number} [opt_maxZoom] Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size} [opt_tileSize] Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {import("./extent.js").Corner} [opt_corner] Extent corner (default is `'top-left'`).
 * @return {!TileGrid} TileGrid instance.
 */
export function createForProjection(projection, opt_maxZoom, opt_tileSize, opt_corner) {
    var extent = extentFromProjection(projection);
    return createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner);
}
/**
 * Generate a tile grid extent from a projection.  If the projection has an
 * extent, it is used.  If not, a global extent is assumed.
 * @param {import("./proj.js").ProjectionLike} projection Projection.
 * @return {import("./extent.js").Extent} Extent.
 */
export function extentFromProjection(projection) {
    projection = getProjection(projection);
    var extent = projection.getExtent();
    if (!extent) {
        var half = (180 * METERS_PER_UNIT[Units.DEGREES]) / projection.getMetersPerUnit();
        extent = createOrUpdate(-half, -half, half, half);
    }
    return extent;
}
//# sourceMappingURL=tilegrid.js.map