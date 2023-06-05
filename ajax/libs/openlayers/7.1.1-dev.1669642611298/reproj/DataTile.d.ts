export default ReprojDataTile;
export type TileGetter = (arg0: number, arg1: number, arg2: number, arg3: number) => import("../DataTile.js").default;
export type Options = {
    /**
     * Source projection.
     */
    sourceProj: import("../proj/Projection.js").default;
    /**
     * Source tile grid.
     */
    sourceTileGrid: import("../tilegrid/TileGrid.js").default;
    /**
     * Target projection.
     */
    targetProj: import("../proj/Projection.js").default;
    /**
     * Target tile grid.
     */
    targetTileGrid: import("../tilegrid/TileGrid.js").default;
    /**
     * Coordinate of the tile.
     */
    tileCoord: import("../tilecoord.js").TileCoord;
    /**
     * Coordinate of the tile wrapped in X.
     */
    wrappedTileCoord?: import("../tilecoord.js").TileCoord | undefined;
    /**
     * Pixel ratio.
     */
    pixelRatio: number;
    /**
     * Gutter of the source tiles.
     */
    gutter: number;
    /**
     * Function returning source tiles (z, x, y, pixelRatio).
     */
    getTileFunction: TileGetter;
    /**
     * Use interpolated values when resampling.  By default,
     * the nearest neighbor is used when resampling.
     */
    interpolate?: boolean | undefined;
    /**
     * Acceptable reprojection error (in px).
     */
    errorThreshold?: number | undefined;
    /**
     * A duration for tile opacity
     * transitions in milliseconds. A duration of 0 disables the opacity transition.
     */
    transition?: number | undefined;
};
/**
 * @typedef {function(number, number, number, number) : import("../DataTile.js").default} TileGetter
 */
/**
 * @typedef {Object} Options
 * @property {import("../proj/Projection.js").default} sourceProj Source projection.
 * @property {import("../tilegrid/TileGrid.js").default} sourceTileGrid Source tile grid.
 * @property {import("../proj/Projection.js").default} targetProj Target projection.
 * @property {import("../tilegrid/TileGrid.js").default} targetTileGrid Target tile grid.
 * @property {import("../tilecoord.js").TileCoord} tileCoord Coordinate of the tile.
 * @property {import("../tilecoord.js").TileCoord} [wrappedTileCoord] Coordinate of the tile wrapped in X.
 * @property {number} pixelRatio Pixel ratio.
 * @property {number} gutter Gutter of the source tiles.
 * @property {TileGetter} getTileFunction Function returning source tiles (z, x, y, pixelRatio).
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 * @property {number} [errorThreshold] Acceptable reprojection error (in px).
 * @property {number} [transition=250] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 */
/**
 * @classdesc
 * Class encapsulating single reprojected data tile.
 * See {@link module:ol/source/DataTile~DataTileSource}.
 *
 */
declare class ReprojDataTile extends DataTile {
    /**
     * @param {Options} options Tile options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {number}
     */
    private pixelRatio_;
    /**
     * @private
     * @type {number}
     */
    private gutter_;
    /**
     * @type {import("../DataTile.js").Data}
     * @private
     */
    private reprojData_;
    /**
     * @type {Error}
     * @private
     */
    private reprojError_;
    /**
     * @type {import('../size.js').Size}
     * @private
     */
    private reprojSize_;
    /**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */
    private sourceTileGrid_;
    /**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */
    private targetTileGrid_;
    /**
     * @private
     * @type {import("../tilecoord.js").TileCoord}
     */
    private wrappedTileCoord_;
    /**
     * @private
     * @type {!Array<DataTile>}
     */
    private sourceTiles_;
    /**
     * @private
     * @type {?Array<import("../events.js").EventsKey>}
     */
    private sourcesListenerKeys_;
    /**
     * @private
     * @type {number}
     */
    private sourceZ_;
    /**
     * @private
     * @type {!import("./Triangulation.js").default}
     */
    private triangulation_;
    /**
     * @private
     */
    private reproject_;
    /**
     * @private
     */
    private unlistenSources_;
}
import DataTile from "../DataTile.js";
//# sourceMappingURL=DataTile.d.ts.map