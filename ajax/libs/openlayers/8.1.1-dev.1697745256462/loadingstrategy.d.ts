/**
 * Strategy function for loading all features with a single request.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} resolution Resolution.
 * @return {Array<import("./extent.js").Extent>} Extents.
 * @api
 */
export function all(extent: import("./extent.js").Extent, resolution: number): Array<import("./extent.js").Extent>;
/**
 * Strategy function for loading features based on the view's extent and
 * resolution.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} resolution Resolution.
 * @return {Array<import("./extent.js").Extent>} Extents.
 * @api
 */
export function bbox(extent: import("./extent.js").Extent, resolution: number): Array<import("./extent.js").Extent>;
/**
 * Creates a strategy function for loading features based on a tile grid.
 * @param {import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {function(import("./extent.js").Extent, number, import("./proj.js").Projection): Array<import("./extent.js").Extent>} Loading strategy.
 * @api
 */
export function tile(tileGrid: import("./tilegrid/TileGrid.js").default): (arg0: import("./extent.js").Extent, arg1: number, arg2: import("./proj.js").Projection) => Array<import("./extent.js").Extent>;
//# sourceMappingURL=loadingstrategy.d.ts.map