/**
 * @param {string} template Template.
 * @param {import("./tilegrid/TileGrid.js").default|null} tileGrid Tile grid.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */
export function createFromTemplate(template: string, tileGrid: import("./tilegrid/TileGrid.js").default | null): import("./Tile.js").UrlFunction;
/**
 * @param {Array<string>} templates Templates.
 * @param {import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */
export function createFromTemplates(templates: Array<string>, tileGrid: import("./tilegrid/TileGrid.js").default): import("./Tile.js").UrlFunction;
/**
 * @param {Array<import("./Tile.js").UrlFunction>} tileUrlFunctions Tile URL Functions.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */
export function createFromTileUrlFunctions(tileUrlFunctions: Array<import("./Tile.js").UrlFunction>): import("./Tile.js").UrlFunction;
/**
 * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {number} pixelRatio Pixel ratio.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {string|undefined} Tile URL.
 */
export function nullTileUrlFunction(tileCoord: import("./tilecoord.js").TileCoord, pixelRatio: number, projection: import("./proj/Projection.js").default): string | undefined;
export { expandUrl } from "./uri.js";
//# sourceMappingURL=tileurlfunction.d.ts.map