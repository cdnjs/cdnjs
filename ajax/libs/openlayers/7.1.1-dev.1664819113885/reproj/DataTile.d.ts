export default ReprojDataTile;
export type FunctionType = (arg0: number, arg1: number, arg2: number, arg3: number) => import("../DataTile.js").default;
/**
 * @typedef {function(number, number, number, number) : import("../DataTile.js").default} FunctionType
 */
/**
 * @classdesc
 * Class encapsulating single reprojected data tile.
 * See {@link module:ol/source/DataTile~DataTileSource}.
 *
 */
declare class ReprojDataTile extends DataTile {
    /**
     * @param {import("../proj/Projection.js").default} sourceProj Source projection.
     * @param {import("../tilegrid/TileGrid.js").default} sourceTileGrid Source tile grid.
     * @param {import("../proj/Projection.js").default} targetProj Target projection.
     * @param {import("../tilegrid/TileGrid.js").default} targetTileGrid Target tile grid.
     * @param {import("../tilecoord.js").TileCoord} tileCoord Coordinate of the tile.
     * @param {import("../tilecoord.js").TileCoord} wrappedTileCoord Coordinate of the tile wrapped in X.
     * @param {number} pixelRatio Pixel ratio.
     * @param {number} gutter Gutter of the source tiles.
     * @param {FunctionType} getTileFunction
     *     Function returning source tiles (z, x, y, pixelRatio).
     * @param {boolean} interpolate Use linear interpolation when resampling.
     * @param {number} [errorThreshold] Acceptable reprojection error (in px).
     */
    constructor(sourceProj: import("../proj/Projection.js").default, sourceTileGrid: import("../tilegrid/TileGrid.js").default, targetProj: import("../proj/Projection.js").default, targetTileGrid: import("../tilegrid/TileGrid.js").default, tileCoord: import("../tilecoord.js").TileCoord, wrappedTileCoord: import("../tilecoord.js").TileCoord, pixelRatio: number, gutter: number, getTileFunction: FunctionType, interpolate: boolean, errorThreshold?: number | undefined);
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
     * @type {!Array<import("../Tile.js").default>}
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