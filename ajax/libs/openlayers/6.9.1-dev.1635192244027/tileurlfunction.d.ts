/**
 * @param {string} template Template.
 * @param {import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */
export function createFromTemplate(template: string, tileGrid: import("./tilegrid/TileGrid.js").default): (arg0: number[], arg1: number, arg2: import("./proj/Projection.js").default) => string | undefined;
/**
 * @param {Array<string>} templates Templates.
 * @param {import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */
export function createFromTemplates(templates: string[], tileGrid: import("./tilegrid/TileGrid.js").default): (arg0: number[], arg1: number, arg2: import("./proj/Projection.js").default) => string | undefined;
/**
 * @param {Array<import("./Tile.js").UrlFunction>} tileUrlFunctions Tile URL Functions.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */
export function createFromTileUrlFunctions(tileUrlFunctions: ((arg0: number[], arg1: number, arg2: import("./proj/Projection.js").default) => string | undefined)[]): (arg0: number[], arg1: number, arg2: import("./proj/Projection.js").default) => string | undefined;
/**
 * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {number} pixelRatio Pixel ratio.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {string|undefined} Tile URL.
 */
export function nullTileUrlFunction(tileCoord: number[], pixelRatio: number, projection: import("./proj/Projection.js").default): string | undefined;
/**
 * @param {string} url URL.
 * @return {Array<string>} Array of urls.
 */
export function expandUrl(url: string): string[];
//# sourceMappingURL=tileurlfunction.d.ts.map