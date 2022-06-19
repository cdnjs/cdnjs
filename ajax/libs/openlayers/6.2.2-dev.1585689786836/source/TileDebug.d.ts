export default TileDebug;
export type Options = {
    /**
     * Optional projection.
     */
    projection?: string | import("../proj/Projection.js").default;
    /**
     * Tile grid.
     */
    tileGrid?: import("../tilegrid/TileGrid.js").default;
    /**
     * Whether to wrap the world horizontally.
     */
    wrapX?: boolean;
    /**
     * Set to `1` when debugging `VectorTile` sources with
     * a default configuration. Indicates which resolution should be used by a renderer if
     * the view resolution does not match any resolution of the tile source. If 0, the nearest
     * resolution will be used. If 1, the nearest lower resolution will be used. If -1, the
     * nearest higher resolution will be used.
     */
    zDirection?: number;
};
/**
 * @typedef {Object} Options
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Optional projection.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [zDirection=0] Set to `1` when debugging `VectorTile` sources with
 * a default configuration. Indicates which resolution should be used by a renderer if
 * the view resolution does not match any resolution of the tile source. If 0, the nearest
 * resolution will be used. If 1, the nearest lower resolution will be used. If -1, the
 * nearest higher resolution will be used.
 */
/**
 * @classdesc
 * A pseudo tile source, which does not fetch tiles from a server, but renders
 * a grid outline for the tile grid/projection along with the coordinates for
 * each tile. See examples/canvas-tiles for an example.
 *
 * Uses Canvas context2d, so requires Canvas support.
 * @api
 */
declare class TileDebug extends XYZ {
    /**
     * @param {Options=} opt_options Debug tile options.
     */
    constructor(opt_options?: Options);
    /**
    * @inheritDoc
    */
    getTile(z: any, x: any, y: any): LabeledTile;
}
import XYZ from "./XYZ.js";
declare class LabeledTile extends Tile {
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../size.js").Size} tileSize Tile size.
     * @param {string} text Text.
     */
    constructor(tileCoord: number[], tileSize: number[], text: string);
    /**
    * @private
    * @type {import("../size.js").Size}
    */
    private tileSize_;
    /**
    * @private
    * @type {string}
    */
    private text_;
    /**
    * @private
    * @type {HTMLCanvasElement}
    */
    private canvas_;
    /**
    * Get the image element for this tile.
    * @return {HTMLCanvasElement} Image.
    */
    getImage(): HTMLCanvasElement;
}
import Tile from "../Tile.js";
//# sourceMappingURL=TileDebug.d.ts.map