export default TileDebug;
export type Options = {
    /**
     * Optional projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Tile grid.
     */
    tileGrid?: import("../tilegrid/TileGrid.js").default | undefined;
    /**
     * Whether to wrap the world horizontally.
     */
    wrapX?: boolean | undefined;
    /**
     * Set to `1` when debugging `VectorTile` sources with a default configuration.
     * Choose whether to use tiles with a higher or lower zoom level when between integer
     * zoom levels. See {@link module :ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
     */
    zDirection?: number | import("../array.js").NearestDirectionFunction | undefined;
    /**
     * Tile source.
     * This allows `projection`, `tileGrid`, `wrapX` and `zDirection` to be copied from another source.
     * If both `source` and individual options are specified the individual options will have precedence.
     */
    source?: import("./Tile.js").default<import("../Tile.js").default> | undefined;
    /**
     * Template for labeling the tiles.
     * Should include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
     */
    template?: string | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Optional projection.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Set to `1` when debugging `VectorTile` sources with a default configuration.
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 * @property {import("./Tile.js").default} [source] Tile source.
 * This allows `projection`, `tileGrid`, `wrapX` and `zDirection` to be copied from another source.
 * If both `source` and individual options are specified the individual options will have precedence.
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
declare class TileDebug extends ImageTile {
    /**
     * @param {Options} [options] Debug tile options.
     */
    constructor(options?: Options);
}
import ImageTile from './ImageTile.js';
//# sourceMappingURL=TileDebug.d.ts.map