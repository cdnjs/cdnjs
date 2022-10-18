export default TileDebug;
export type Options = {
    /**
     * Optional projection.
     */
    projection?: import("../proj.js").ProjectionLike;
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
    /**
     * Template for labeling the tiles.
     * Should include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
     */
    template?: string;
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
 * @property {string} [template='z:{z} x:{x} y:{y}'] Template for labeling the tiles.
 * Should include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 */
/**
 * @classdesc
 * A pseudo tile source, which does not fetch tiles from a server, but renders
 * a grid outline for the tile grid/projection along with the coordinates for
 * each tile. See examples/canvas-tiles for an example.
 * @api
 */
declare class TileDebug extends XYZ {
    /**
     * @param {Options} [opt_options] Debug tile options.
     */
    constructor(opt_options?: Options);
}
import XYZ from "./XYZ.js";
//# sourceMappingURL=TileDebug.d.ts.map