/**
 * Strategy function for loading all features with a single request.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} resolution Resolution.
 * @return {Array<import("./extent.js").Extent>} Extents.
 * @api
 */
export function all(extent: number[], resolution: number): number[][];
/**
 * Strategy function for loading features based on the view's extent and
 * resolution.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} resolution Resolution.
 * @return {Array<import("./extent.js").Extent>} Extents.
 * @api
 */
export function bbox(extent: number[], resolution: number): number[][];
/**
 * Creates a strategy function for loading features based on a tile grid.
 * @param {import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {function(import("./extent.js").Extent, number, import("./proj.js").Projection): Array<import("./extent.js").Extent>} Loading strategy.
 * @api
 */
export function tile(tileGrid: import("./tilegrid/TileGrid.js").default): (arg0: number[], arg1: number, arg2: import("./proj/Projection.js").default) => number[][];
//# sourceMappingURL=loadingstrategy.d.ts.map