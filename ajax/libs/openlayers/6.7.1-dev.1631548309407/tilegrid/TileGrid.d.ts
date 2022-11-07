export default TileGrid;
export type Options = {
    /**
     * Extent for the tile grid. No tiles outside this
     * extent will be requested by {@link module:ol/source/Tile} sources. When no `origin` or
     * `origins` are configured, the `origin` will be set to the top-left corner of the extent.
     */
    extent?: number[];
    /**
     * Minimum zoom.
     */
    minZoom?: number;
    /**
     * The tile grid origin, i.e. where the `x`
     * and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left to right and downwards. If not
     * specified, `extent` or `origins` must be provided.
     */
    origin?: number[];
    /**
     * Tile grid origins, i.e. where
     * the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If given, the array length
     * should match the length of the `resolutions` array, i.e. each resolution can have a different
     * origin. Tile coordinates increase left to right and downwards. If not specified, `extent` or
     * `origin` must be provided.
     */
    origins?: number[][];
    /**
     * Resolutions. The array index of each resolution needs
     * to match the zoom level. This means that even if a `minZoom` is configured, the resolutions
     * array will have a length of `maxZoom + 1`.
     */
    resolutions: number[];
    /**
     * Number of tile rows and columns
     * of the grid for each zoom level. If specified the values
     * define each zoom level's extent together with the `origin` or `origins`.
     * A grid `extent` can be configured in addition, and will further limit the extent
     * for which tile requests are made by sources. If the bottom-left corner of
     * an extent is used as `origin` or `origins`, then the `y` value must be
     * negative because OpenLayers tile coordinates use the top left as the origin.
     */
    sizes?: number[][];
    /**
     * Tile size.
     * Default is `[256, 256]`.
     */
    tileSize?: number | number[];
    /**
     * Tile sizes. If given, the array length
     * should match the length of the `resolutions` array, i.e. each resolution can have a different
     * tile size.
     */
    tileSizes?: number[][];
};
/**
 * @typedef {Object} Options
 * @property {import("../extent.js").Extent} [extent] Extent for the tile grid. No tiles outside this
 * extent will be requested by {@link module:ol/source/Tile} sources. When no `origin` or
 * `origins` are configured, the `origin` will be set to the top-left corner of the extent.
 * @property {number} [minZoom=0] Minimum zoom.
 * @property {import("../coordinate.js").Coordinate} [origin] The tile grid origin, i.e. where the `x`
 * and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left to right and downwards. If not
 * specified, `extent` or `origins` must be provided.
 * @property {Array<import("../coordinate.js").Coordinate>} [origins] Tile grid origins, i.e. where
 * the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * origin. Tile coordinates increase left to right and downwards. If not specified, `extent` or
 * `origin` must be provided.
 * @property {!Array<number>} resolutions Resolutions. The array index of each resolution needs
 * to match the zoom level. This means that even if a `minZoom` is configured, the resolutions
 * array will have a length of `maxZoom + 1`.
 * @property {Array<import("../size.js").Size>} [sizes] Number of tile rows and columns
 * of the grid for each zoom level. If specified the values
 * define each zoom level's extent together with the `origin` or `origins`.
 * A grid `extent` can be configured in addition, and will further limit the extent
 * for which tile requests are made by sources. If the bottom-left corner of
 * an extent is used as `origin` or `origins`, then the `y` value must be
 * negative because OpenLayers tile coordinates use the top left as the origin.
 * @property {number|import("../size.js").Size} [tileSize] Tile size.
 * Default is `[256, 256]`.
 * @property {Array<import("../size.js").Size>} [tileSizes] Tile sizes. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * tile size.
 */
/**
 * @classdesc
 * Base class for setting the grid pattern for sources accessing tiled-image
 * servers.
 * @api
 */
declare class TileGrid {
    /**
     * @param {Options} options Tile grid options.
     */
    constructor(options: Options);
    /**
     * @protected
     * @type {number}
     */
    protected minZoom: number;
    /**
     * @private
     * @type {!Array<number>}
     */
    private resolutions_;
    /**
     * @private
     * @type {number|undefined}
     */
    private zoomFactor_;
    /**
     * @protected
     * @type {number}
     */
    protected maxZoom: number;
    /**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */
    private origin_;
    /**
     * @private
     * @type {Array<import("../coordinate.js").Coordinate>}
     */
    private origins_;
    /**
     * @private
     * @type {Array<number|import("../size.js").Size>}
     */
    private tileSizes_;
    /**
     * @private
     * @type {number|import("../size.js").Size}
     */
    private tileSize_;
    /**
     * @private
     * @type {import("../extent.js").Extent}
     */
    private extent_;
    /**
     * @private
     * @type {Array<import("../TileRange.js").default>}
     */
    private fullTileRanges_;
    /**
     * @private
     * @type {import("../size.js").Size}
     */
    private tmpSize_;
    /**
     * @private
     * @type {import("../extent.js").Extent}
     */
    private tmpExtent_;
    /**
     * Call a function with each tile coordinate for a given extent and zoom level.
     *
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} zoom Integer zoom level.
     * @param {function(import("../tilecoord.js").TileCoord): void} callback Function called with each tile coordinate.
     * @api
     */
    forEachTileCoord(extent: number[], zoom: number, callback: (arg0: number[]) => void): void;
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
     * @param {import("../TileRange.js").default} [opt_tileRange] Temporary import("../TileRange.js").default object.
     * @param {import("../extent.js").Extent} [opt_extent] Temporary import("../extent.js").Extent object.
     * @return {boolean} Callback succeeded.
     */
    forEachTileCoordParentTileRange(tileCoord: number[], callback: (arg0: number, arg1: TileRange) => boolean, opt_tileRange?: TileRange | undefined, opt_extent?: number[] | undefined): boolean;
    /**
     * Get the extent for this tile grid, if it was configured.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    getExtent(): number[];
    /**
     * Get the maximum zoom level for the grid.
     * @return {number} Max zoom.
     * @api
     */
    getMaxZoom(): number;
    /**
     * Get the minimum zoom level for the grid.
     * @return {number} Min zoom.
     * @api
     */
    getMinZoom(): number;
    /**
     * Get the origin for the grid at the given zoom level.
     * @param {number} z Integer zoom level.
     * @return {import("../coordinate.js").Coordinate} Origin.
     * @api
     */
    getOrigin(z: number): number[];
    /**
     * Get the resolution for the given zoom level.
     * @param {number} z Integer zoom level.
     * @return {number} Resolution.
     * @api
     */
    getResolution(z: number): number;
    /**
     * Get the list of resolutions for the tile grid.
     * @return {Array<number>} Resolutions.
     * @api
     */
    getResolutions(): number[];
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../TileRange.js").default} [opt_tileRange] Temporary import("../TileRange.js").default object.
     * @param {import("../extent.js").Extent} [opt_extent] Temporary import("../extent.js").Extent object.
     * @return {import("../TileRange.js").default} Tile range.
     */
    getTileCoordChildTileRange(tileCoord: number[], opt_tileRange?: TileRange | undefined, opt_extent?: number[] | undefined): TileRange;
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {number} z Integer zoom level.
     * @param {import("../TileRange.js").default} [opt_tileRange] Temporary import("../TileRange.js").default object.
     * @return {import("../TileRange.js").default} Tile range.
     */
    getTileRangeForTileCoordAndZ(tileCoord: number[], z: number, opt_tileRange?: TileRange | undefined): TileRange;
    /**
     * Get the extent for a tile range.
     * @param {number} z Integer zoom level.
     * @param {import("../TileRange.js").default} tileRange Tile range.
     * @param {import("../extent.js").Extent} [opt_extent] Temporary import("../extent.js").Extent object.
     * @return {import("../extent.js").Extent} Extent.
     */
    getTileRangeExtent(z: number, tileRange: TileRange, opt_extent?: number[] | undefined): number[];
    /**
     * Get a tile range for the given extent and integer zoom level.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} z Integer zoom level.
     * @param {import("../TileRange.js").default} [opt_tileRange] Temporary tile range object.
     * @return {import("../TileRange.js").default} Tile range.
     */
    getTileRangeForExtentAndZ(extent: number[], z: number, opt_tileRange?: TileRange | undefined): TileRange;
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @return {import("../coordinate.js").Coordinate} Tile center.
     */
    getTileCoordCenter(tileCoord: number[]): number[];
    /**
     * Get the extent of a tile coordinate.
     *
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../extent.js").Extent} [opt_extent] Temporary extent object.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    getTileCoordExtent(tileCoord: number[], opt_extent?: number[] | undefined): number[];
    /**
     * Get the tile coordinate for the given map coordinate and resolution.  This
     * method considers that coordinates that intersect tile boundaries should be
     * assigned the higher tile coordinate.
     *
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} resolution Resolution.
     * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
     * @api
     */
    getTileCoordForCoordAndResolution(coordinate: number[], resolution: number, opt_tileCoord?: number[] | undefined): number[];
    /**
     * Note that this method should not be called for resolutions that correspond
     * to an integer zoom level.  Instead call the `getTileCoordForXYAndZ_` method.
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} resolution Resolution (for a non-integer zoom level).
     * @param {boolean} reverseIntersectionPolicy Instead of letting edge
     *     intersections go to the higher tile coordinate, let edge intersections
     *     go to the lower tile coordinate.
     * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
     * @private
     */
    private getTileCoordForXYAndResolution_;
    /**
     * Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
     * they should have separate implementations.  This method is for integer zoom
     * levels.  The other method should only be called for resolutions corresponding
     * to non-integer zoom levels.
     * @param {number} x Map x coordinate.
     * @param {number} y Map y coordinate.
     * @param {number} z Integer zoom level.
     * @param {boolean} reverseIntersectionPolicy Instead of letting edge
     *     intersections go to the higher tile coordinate, let edge intersections
     *     go to the lower tile coordinate.
     * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
     * @private
     */
    private getTileCoordForXYAndZ_;
    /**
     * Get a tile coordinate given a map coordinate and zoom level.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} z Zoom level.
     * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
     * @api
     */
    getTileCoordForCoordAndZ(coordinate: number[], z: number, opt_tileCoord?: number[] | undefined): number[];
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @return {number} Tile resolution.
     */
    getTileCoordResolution(tileCoord: number[]): number;
    /**
     * Get the tile size for a zoom level. The type of the return value matches the
     * `tileSize` or `tileSizes` that the tile grid was configured with. To always
     * get an `import("../size.js").Size`, run the result through `import("../size.js").Size.toSize()`.
     * @param {number} z Z.
     * @return {number|import("../size.js").Size} Tile size.
     * @api
     */
    getTileSize(z: number): number | number[];
    /**
     * @param {number} z Zoom level.
     * @return {import("../TileRange.js").default} Extent tile range for the specified zoom level.
     */
    getFullTileRange(z: number): TileRange;
    /**
     * @param {number} resolution Resolution.
     * @param {number|import("../array.js").NearestDirectionFunction} [opt_direction]
     *     If 0, the nearest resolution will be used.
     *     If 1, the nearest higher resolution (lower Z) will be used. If -1, the
     *     nearest lower resolution (higher Z) will be used. Default is 0.
     *     Use a {@link module:ol/array~NearestDirectionFunction} for more precise control.
     *
     * For example to change tile Z at the midpoint of zoom levels
     * ```js
     * function(value, high, low) {
     *   return value - low * Math.sqrt(high / low);
     * }
     * ```
     * @return {number} Z.
     * @api
     */
    getZForResolution(resolution: number, opt_direction?: number | ((arg0: number, arg1: number, arg2: number) => number) | undefined): number;
    /**
     * @param {!import("../extent.js").Extent} extent Extent for this tile grid.
     * @private
     */
    private calculateTileRanges_;
}
import TileRange from "../TileRange.js";
//# sourceMappingURL=TileGrid.d.ts.map