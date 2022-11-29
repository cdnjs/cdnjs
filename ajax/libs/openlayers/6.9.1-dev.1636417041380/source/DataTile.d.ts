export default DataTileSource;
export type Options = {
    /**
     * Data loader.  Called with z, x, and y tile coordinates.
     * Returns a promise that resolves to a {@link import("../DataTile.js").Data}.
     */
    loader?: (arg0: number, arg1: number, arg2: number) => Promise<DataView | Uint8Array | Uint8ClampedArray | Float32Array>;
    /**
     * Optional max zoom level. Not used if `tileGrid` is provided.
     */
    maxZoom?: number;
    /**
     * Optional min zoom level. Not used if `tileGrid` is provided.
     */
    minZoom?: number;
    /**
     * The pixel width and height of the tiles.
     */
    tileSize?: number | number[];
    /**
     * Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
     */
    maxResolution?: number;
    /**
     * Tile projection.
     */
    projection?: string | import("../proj/Projection.js").default | undefined;
    /**
     * Tile grid.
     */
    tileGrid?: import("../tilegrid/TileGrid.js").default;
    /**
     * Whether the layer is opaque.
     */
    opaque?: boolean;
    /**
     * The source state.
     */
    state?: any;
    /**
     * Tile pixel ratio.
     */
    tilePixelRatio?: number;
    /**
     * Render tiles beyond the antimeridian.
     */
    wrapX?: boolean;
    /**
     * Transition time when fading in new tiles (in miliseconds).
     */
    transition?: number;
    /**
     * Number of bands represented in the data.
     */
    bandCount?: number;
};
/**
 * @typedef {Object} Options
 * @property {function(number, number, number) : Promise<import("../DataTile.js").Data>} [loader] Data loader.  Called with z, x, and y tile coordinates.
 * Returns a promise that resolves to a {@link import("../DataTile.js").Data}.
 * @property {number} [maxZoom=42] Optional max zoom level. Not used if `tileGrid` is provided.
 * @property {number} [minZoom=0] Optional min zoom level. Not used if `tileGrid` is provided.
 * @property {number|import("../size.js").Size} [tileSize=[256, 256]] The pixel width and height of the tiles.
 * @property {number} [maxResolution] Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Tile projection.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("./State.js").default} [state] The source state.
 * @property {number} [tilePixelRatio] Tile pixel ratio.
 * @property {boolean} [wrapX=true] Render tiles beyond the antimeridian.
 * @property {number} [transition] Transition time when fading in new tiles (in miliseconds).
 * @property {number} [bandCount=4] Number of bands represented in the data.
 */
/**
 * @classdesc
 * Base class for sources providing tiles divided into a tile grid.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @api
 */
declare class DataTileSource extends TileSource {
    /**
     * @param {Options} options Image tile options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {!Object<string, boolean>}
     */
    private tileLoadingKeys_;
    /**
     * @private
     */
    private loader_;
    /**
     * Handle tile change events.
     * @param {import("../events/Event.js").default} event Event.
     */
    handleTileChange_(event: import("../events/Event.js").default): void;
    /**
     * @type {number}
     */
    bandCount: number;
    /**
     * @param {function(number, number, number) : Promise<import("../DataTile.js").Data>} loader The data loader.
     * @protected
     */
    protected setLoader(loader: (arg0: number, arg1: number, arg2: number) => Promise<DataView | Uint8Array | Uint8ClampedArray | Float32Array>): void;
    /**
     * @abstract
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!DataTile} Tile.
     */
    getTile(z: number, x: number, y: number, pixelRatio: number, projection: import("../proj/Projection.js").default): DataTile;
}
import TileSource from "./Tile.js";
import DataTile from "../DataTile.js";
//# sourceMappingURL=DataTile.d.ts.map