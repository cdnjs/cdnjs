/**
 * Create a tile grid from a WMTS capabilities matrix set and an
 * optional TileMatrixSetLimits.
 * @param {Object} matrixSet An object representing a matrixSet in the
 *     capabilities document.
 * @param {import("../extent.js").Extent} [extent] An optional extent to restrict the tile
 *     ranges the server provides.
 * @param {Array<Object>} [matrixLimits] An optional object representing
 *     the available matrices for tileGrid.
 * @return {WMTSTileGrid} WMTS tileGrid instance.
 * @api
 */
export function createFromCapabilitiesMatrixSet(matrixSet: any, extent?: import("../extent.js").Extent | undefined, matrixLimits?: any[] | undefined): WMTSTileGrid;
export default WMTSTileGrid;
export type Options = {
    /**
     * Extent for the tile grid. No tiles
     * outside this extent will be requested by {@link module :ol/source/Tile~TileSource} sources.
     * When no `origin` or `origins` are configured, the `origin` will be set to the
     * top-left corner of the extent.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * The tile grid origin, i.e.
     * where the `x` and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left
     * to right and downwards. If not specified, `extent` or `origins` must be provided.
     */
    origin?: import("../coordinate.js").Coordinate | undefined;
    /**
     * Tile grid origins,
     * i.e. where the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If
     * given, the array length should match the length of the `resolutions` array, i.e.
     * each resolution can have a different origin. Tile coordinates increase left to
     * right and downwards. If not specified, `extent` or `origin` must be provided.
     */
    origins?: import("../coordinate.js").Coordinate[] | undefined;
    /**
     * Resolutions. The array index of each
     * resolution needs to match the zoom level. This means that even if a `minZoom`
     * is configured, the resolutions array will have a length of `maxZoom + 1`
     */
    resolutions: Array<number>;
    /**
     * matrix IDs. The length of this array needs
     * to match the length of the `resolutions` array.
     */
    matrixIds: Array<string>;
    /**
     * Number of tile rows and columns
     * of the grid for each zoom level. The values here are the `TileMatrixWidth` and
     * `TileMatrixHeight` advertised in the GetCapabilities response of the WMTS, and
     * define each zoom level's extent together with the `origin` or `origins`.
     * A grid `extent` can be configured in addition, and will further limit the extent for
     * which tile requests are made by sources. If the bottom-left corner of
     * an extent is used as `origin` or `origins`, then the `y` value must be
     * negative because OpenLayers tile coordinates use the top left as the origin.
     */
    sizes?: import("../size.js").Size[] | undefined;
    /**
     * Tile size.
     */
    tileSize?: number | import("../size.js").Size | undefined;
    /**
     * Tile sizes. The length of
     * this array needs to match the length of the `resolutions` array.
     */
    tileSizes?: (number | import("../size.js").Size)[] | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("../extent.js").Extent} [extent] Extent for the tile grid. No tiles
 * outside this extent will be requested by {@link module:ol/source/Tile~TileSource} sources.
 * When no `origin` or `origins` are configured, the `origin` will be set to the
 * top-left corner of the extent.
 * @property {import("../coordinate.js").Coordinate} [origin] The tile grid origin, i.e.
 * where the `x` and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left
 * to right and downwards. If not specified, `extent` or `origins` must be provided.
 * @property {Array<import("../coordinate.js").Coordinate>} [origins] Tile grid origins,
 * i.e. where the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If
 * given, the array length should match the length of the `resolutions` array, i.e.
 * each resolution can have a different origin. Tile coordinates increase left to
 * right and downwards. If not specified, `extent` or `origin` must be provided.
 * @property {!Array<number>} resolutions Resolutions. The array index of each
 * resolution needs to match the zoom level. This means that even if a `minZoom`
 * is configured, the resolutions array will have a length of `maxZoom + 1`
 * @property {!Array<string>} matrixIds matrix IDs. The length of this array needs
 * to match the length of the `resolutions` array.
 * @property {Array<import("../size.js").Size>} [sizes] Number of tile rows and columns
 * of the grid for each zoom level. The values here are the `TileMatrixWidth` and
 * `TileMatrixHeight` advertised in the GetCapabilities response of the WMTS, and
 * define each zoom level's extent together with the `origin` or `origins`.
 * A grid `extent` can be configured in addition, and will further limit the extent for
 * which tile requests are made by sources. If the bottom-left corner of
 * an extent is used as `origin` or `origins`, then the `y` value must be
 * negative because OpenLayers tile coordinates use the top left as the origin.
 * @property {number|import("../size.js").Size} [tileSize] Tile size.
 * @property {Array<number|import("../size.js").Size>} [tileSizes] Tile sizes. The length of
 * this array needs to match the length of the `resolutions` array.
 */
/**
 * @classdesc
 * Set the grid pattern for sources accessing WMTS tiled-image servers.
 * @api
 */
declare class WMTSTileGrid extends TileGrid {
    /**
     * @param {Options} options WMTS options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {!Array<string>}
     */
    private matrixIds_;
    /**
     * @param {number} z Z.
     * @return {string} MatrixId..
     */
    getMatrixId(z: number): string;
    /**
     * Get the list of matrix identifiers.
     * @return {Array<string>} MatrixIds.
     * @api
     */
    getMatrixIds(): Array<string>;
}
import TileGrid from './TileGrid.js';
//# sourceMappingURL=WMTS.d.ts.map