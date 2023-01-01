/**
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {!TileGrid} Default tile grid for the
 * passed projection.
 */
export function getForProjection(projection: import("./proj/Projection.js").default): TileGrid;
/**
 * @param {TileGrid} tileGrid Tile grid.
 * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {import("./tilecoord.js").TileCoord} Tile coordinate.
 */
export function wrapX(tileGrid: TileGrid, tileCoord: import("./tilecoord.js").TileCoord, projection: import("./proj/Projection.js").default): import("./tilecoord.js").TileCoord;
/**
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} [opt_maxZoom] Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size} [opt_tileSize] Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {import("./extent/Corner.js").default} [opt_corner] Extent corner (default is `'top-left'`).
 * @return {!TileGrid} TileGrid instance.
 */
export function createForExtent(extent: import("./extent.js").Extent, opt_maxZoom?: number | undefined, opt_tileSize?: number | import("./size.js").Size | undefined, opt_corner?: any): TileGrid;
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
export function createXYZ(opt_options?: XYZOptions | undefined): TileGrid;
/**
 * @param {import("./proj.js").ProjectionLike} projection Projection.
 * @param {number} [opt_maxZoom] Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size} [opt_tileSize] Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {import("./extent/Corner.js").default} [opt_corner] Extent corner (default is `'top-left'`).
 * @return {!TileGrid} TileGrid instance.
 */
export function createForProjection(projection: import("./proj.js").ProjectionLike, opt_maxZoom?: number | undefined, opt_tileSize?: number | import("./size.js").Size | undefined, opt_corner?: any): TileGrid;
/**
 * Generate a tile grid extent from a projection.  If the projection has an
 * extent, it is used.  If not, a global extent is assumed.
 * @param {import("./proj.js").ProjectionLike} projection Projection.
 * @return {import("./extent.js").Extent} Extent.
 */
export function extentFromProjection(projection: import("./proj.js").ProjectionLike): import("./extent.js").Extent;
export type XYZOptions = {
    /**
     * Extent for the tile grid. The origin for an XYZ tile grid is the
     * top-left corner of the extent. If `maxResolution` is not provided the zero level of the grid is defined by the resolution
     * at which one tile fits in the provided extent. If not provided, the extent of the EPSG:3857 projection is used.
     */
    extent?: import("./extent.js").Extent | undefined;
    /**
     * Resolution at level zero.
     */
    maxResolution?: number | undefined;
    /**
     * Maximum zoom. The default is `42`. This determines the number of levels
     * in the grid set. For example, a `maxZoom` of 21 means there are 22 levels in the grid set.
     */
    maxZoom?: number | undefined;
    /**
     * Minimum zoom.
     */
    minZoom?: number | undefined;
    /**
     * Tile size in pixels.
     */
    tileSize?: number | import("./size.js").Size | undefined;
};
import TileGrid from "./tilegrid/TileGrid.js";
//# sourceMappingURL=tilegrid.d.ts.map