export default TileGrid;
export type Options = {
    /**
     * Extent for the tile grid. No tiles outside this
     * extent will be requested by {@link module :ol/source/Tile~TileSource} sources. When no `origin` or
     * `origins` are configured, the `origin` will be set to the top-left corner of the extent.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * Minimum zoom.
     */
    minZoom?: number | undefined;
    /**
     * The tile grid origin, i.e. where the `x`
     * and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left to right and downwards. If not
     * specified, `extent` or `origins` must be provided.
     */
    origin?: import("../coordinate.js").Coordinate | undefined;
    /**
     * Tile grid origins, i.e. where
     * the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If given, the array length
     * should match the length of the `resolutions` array, i.e. each resolution can have a different
     * origin. Tile coordinates increase left to right and downwards. If not specified, `extent` or
     * `origin` must be provided.
     */
    origins?: import("../coordinate.js").Coordinate[] | undefined;
    /**
     * Resolutions. The array index of each resolution needs
     * to match the zoom level. This means that even if a `minZoom` is configured, the resolutions
     * array will have a length of `maxZoom + 1`.
     */
    resolutions: Array<number>;
    /**
     * Number of tile rows and columns
     * of the grid for each zoom level. If specified the values
     * define each zoom level's extent together with the `origin` or `origins`.
     * A grid `extent` can be configured in addition, and will further limit the extent
     * for which tile requests are made by sources. If the bottom-left corner of
     * an extent is used as `origin` or `origins`, then the `y` value must be
     * negative because OpenLayers tile coordinates use the top left as the origin.
     */
    sizes?: import("../size.js").Size[] | undefined;
    /**
     * Tile size.
     * Default is `[256, 256]`.
     */
    tileSize?: number | import("../size.js").Size | undefined;
    /**
     * Tile sizes. If given, the array length
     * should match the length of the `resolutions` array, i.e. each resolution can have a different
     * tile size.
     */
    tileSizes?: (number | import("../size.js").Size)[] | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("../extent.js").Extent} [extent] Extent for the tile grid. No tiles outside this
 * extent will be requested by {@link module:ol/source/Tile~TileSource} sources. When no `origin` or
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
 * @property {Array<number|import("../size.js").Size>} [tileSizes] Tile sizes. If given, the array length
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
     * @type {import("../coordinate.js").Coordinate|null}
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
    forEachTileCoord(extent: import("../extent.js").Extent, zoom: number, callback: (arg0: import("../tilecoord.js").TileCoord) => void): void;
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
     * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
     * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
     * @return {boolean} Callback succeeded.
     */
    forEachTileCoordParentTileRange(tileCoord: import("../tilecoord.js").TileCoord, callback: (arg0: number, arg1: import("../TileRange.js").default) => boolean, tempTileRange?: TileRange | undefined, tempExtent?: import("../extent.js").Extent | undefined): boolean;
    /**
     * Get the extent for this tile grid, if it was configured.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    getExtent(): import("../extent.js").Extent;
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
    getOrigin(z: number): import("../coordinate.js").Coordinate;
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
    getResolutions(): Array<number>;
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
     * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
     * @return {import("../TileRange.js").default|null} Tile range.
     */
    getTileCoordChildTileRange(tileCoord: import("../tilecoord.js").TileCoord, tempTileRange?: TileRange | undefined, tempExtent?: import("../extent.js").Extent | undefined): import("../TileRange.js").default | null;
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {number} z Integer zoom level.
     * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
     * @return {import("../TileRange.js").default|null} Tile range.
     */
    getTileRangeForTileCoordAndZ(tileCoord: import("../tilecoord.js").TileCoord, z: number, tempTileRange?: TileRange | undefined): import("../TileRange.js").default | null;
    /**
     * Get a tile range for the given extent and integer zoom level.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} z Integer zoom level.
     * @param {import("../TileRange.js").default} [tempTileRange] Temporary tile range object.
     * @return {import("../TileRange.js").default} Tile range.
     */
    getTileRangeForExtentAndZ(extent: import("../extent.js").Extent, z: number, tempTileRange?: TileRange | undefined): import("../TileRange.js").default;
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @return {import("../coordinate.js").Coordinate} Tile center.
     */
    getTileCoordCenter(tileCoord: import("../tilecoord.js").TileCoord): import("../coordinate.js").Coordinate;
    /**
     * Get the extent of a tile coordinate.
     *
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../extent.js").Extent} [tempExtent] Temporary extent object.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    getTileCoordExtent(tileCoord: import("../tilecoord.js").TileCoord, tempExtent?: import("../extent.js").Extent | undefined): import("../extent.js").Extent;
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
    getTileCoordForCoordAndResolution(coordinate: import("../coordinate.js").Coordinate, resolution: number, opt_tileCoord?: import("../tilecoord.js").TileCoord | undefined): import("../tilecoord.js").TileCoord;
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
     * @param {number} z Integer zoom level, e.g. the result of a `getZForResolution()` method call
     * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
     * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
     * @api
     */
    getTileCoordForCoordAndZ(coordinate: import("../coordinate.js").Coordinate, z: number, opt_tileCoord?: import("../tilecoord.js").TileCoord | undefined): import("../tilecoord.js").TileCoord;
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @return {number} Tile resolution.
     */
    getTileCoordResolution(tileCoord: import("../tilecoord.js").TileCoord): number;
    /**
     * Get the tile size for a zoom level. The type of the return value matches the
     * `tileSize` or `tileSizes` that the tile grid was configured with. To always
     * get an {@link import("../size.js").Size}, run the result through {@link module:ol/size.toSize}.
     * @param {number} z Z.
     * @return {number|import("../size.js").Size} Tile size.
     * @api
     */
    getTileSize(z: number): number | import("../size.js").Size;
    /**
     * @param {number} z Zoom level.
     * @return {import("../TileRange.js").default|null} Extent tile range for the specified zoom level.
     */
    getFullTileRange(z: number): import("../TileRange.js").default | null;
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
    getZForResolution(resolution: number, opt_direction?: number | import("../array.js").NearestDirectionFunction | undefined): number;
    /**
     * The tile with the provided tile coordinate intersects the given viewport.
     * @param {import('../tilecoord.js').TileCoord} tileCoord Tile coordinate.
     * @param {Array<number>} viewport Viewport as returned from {@link module:ol/extent.getRotatedViewport}.
     * @return {boolean} The tile with the provided tile coordinate intersects the given viewport.
     */
    tileCoordIntersectsViewport(tileCoord: import("../tilecoord.js").TileCoord, viewport: Array<number>): boolean;
    /**
     * @param {!import("../extent.js").Extent} extent Extent for this tile grid.
     * @private
     */
    private calculateTileRanges_;
}
import TileRange from '../TileRange.js';
//# sourceMappingURL=TileGrid.d.ts.map