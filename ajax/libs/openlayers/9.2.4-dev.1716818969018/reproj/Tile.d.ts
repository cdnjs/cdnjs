export default ReprojTile;
export type FunctionType = (arg0: number, arg1: number, arg2: number, arg3: number) => (import("../ImageTile.js").default);
export type TileOffset = {
    /**
     * Tile.
     */
    tile: import("../ImageTile.js").default;
    /**
     * Offset.
     */
    offset: number;
};
/**
 * @typedef {function(number, number, number, number) : (import("../ImageTile.js").default)} FunctionType
 */
/**
 * @typedef {Object} TileOffset
 * @property {import("../ImageTile.js").default} tile Tile.
 * @property {number} offset Offset.
 */
/**
 * @classdesc
 * Class encapsulating single reprojected tile.
 * See {@link module:ol/source/TileImage~TileImage}.
 *
 */
declare class ReprojTile extends Tile {
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
     * @param {number} [errorThreshold] Acceptable reprojection error (in px).
     * @param {boolean} [renderEdges] Render reprojection edges.
     * @param {import("../Tile.js").Options} [options] Tile options.
     */
    constructor(sourceProj: import("../proj/Projection.js").default, sourceTileGrid: import("../tilegrid/TileGrid.js").default, targetProj: import("../proj/Projection.js").default, targetTileGrid: import("../tilegrid/TileGrid.js").default, tileCoord: import("../tilecoord.js").TileCoord, wrappedTileCoord: import("../tilecoord.js").TileCoord, pixelRatio: number, gutter: number, getTileFunction: FunctionType, errorThreshold?: number | undefined, renderEdges?: boolean | undefined, options?: import("../Tile.js").Options | undefined);
    /**
     * @private
     * @type {boolean}
     */
    private renderEdges_;
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
     * @private
     * @type {HTMLCanvasElement}
     */
    private canvas_;
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
     * @type {!Array<TileOffset>}
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
     * @type {import("../extent.js").Extent}
     */
    private clipExtent_;
    /**
     * @private
     * @type {!import("./Triangulation.js").default}
     */
    private triangulation_;
    /**
     * Get the HTML Canvas element for this tile.
     * @return {HTMLCanvasElement} Canvas.
     */
    getImage(): HTMLCanvasElement;
    /**
     * @private
     */
    private reproject_;
    /**
     * @private
     */
    private unlistenSources_;
}
import Tile from '../Tile.js';
//# sourceMappingURL=Tile.d.ts.map