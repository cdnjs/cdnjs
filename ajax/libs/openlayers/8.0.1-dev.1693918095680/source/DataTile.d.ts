export default DataTileSource;
/**
 * Data tile loading function.  The function is called with z, x, and y tile coordinates and
 * returns {@link import ("../DataTile.js").Data data} for a tile or a promise for the same.
 */
export type Loader = (arg0: number, arg1: number, arg2: number) => (import("../DataTile.js").Data | Promise<import("../DataTile.js").Data>);
export type Options = {
    /**
     * Data loader.  Called with z, x, and y tile coordinates.
     * Returns {@link import ("../DataTile.js").Data data} for a tile or a promise for the same.
     * For loaders that generate images, the promise should not resolve until the image is loaded.
     */
    loader?: Loader | undefined;
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike | undefined;
    /**
     * Attributions are collapsible.
     */
    attributionsCollapsible?: boolean | undefined;
    /**
     * Optional max zoom level. Not used if `tileGrid` is provided.
     */
    maxZoom?: number | undefined;
    /**
     * Optional min zoom level. Not used if `tileGrid` is provided.
     */
    minZoom?: number | undefined;
    /**
     * The pixel width and height of the source tiles.
     * This may be different than the rendered pixel size if a `tileGrid` is provided.
     */
    tileSize?: number | import("../size.js").Size | undefined;
    /**
     * The size in pixels of the gutter around data tiles to ignore.
     * This allows artifacts of rendering at tile edges to be ignored.
     * Supported data should be wider and taller than the tile size by a value of `2 x gutter`.
     */
    gutter?: number | undefined;
    /**
     * Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
     */
    maxResolution?: number | undefined;
    /**
     * Tile projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Tile grid.
     */
    tileGrid?: import("../tilegrid/TileGrid.js").default | undefined;
    /**
     * Whether the layer is opaque.
     */
    opaque?: boolean | undefined;
    /**
     * The source state.
     */
    state?: import("./Source.js").State | undefined;
    /**
     * Render tiles beyond the antimeridian.
     */
    wrapX?: boolean | undefined;
    /**
     * Transition time when fading in new tiles (in milliseconds).
     */
    transition?: number | undefined;
    /**
     * Number of bands represented in the data.
     */
    bandCount?: number | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * the nearest neighbor is used when resampling.
     */
    interpolate?: boolean | undefined;
};
/**
 * Data tile loading function.  The function is called with z, x, and y tile coordinates and
 * returns {@link import("../DataTile.js").Data data} for a tile or a promise for the same.
 * @typedef {function(number, number, number) : (import("../DataTile.js").Data|Promise<import("../DataTile.js").Data>)} Loader
 */
/**
 * @typedef {Object} Options
 * @property {Loader} [loader] Data loader.  Called with z, x, and y tile coordinates.
 * Returns {@link import("../DataTile.js").Data data} for a tile or a promise for the same.
 * For loaders that generate images, the promise should not resolve until the image is loaded.
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [maxZoom=42] Optional max zoom level. Not used if `tileGrid` is provided.
 * @property {number} [minZoom=0] Optional min zoom level. Not used if `tileGrid` is provided.
 * @property {number|import("../size.js").Size} [tileSize=[256, 256]] The pixel width and height of the source tiles.
 * This may be different than the rendered pixel size if a `tileGrid` is provided.
 * @property {number} [gutter=0] The size in pixels of the gutter around data tiles to ignore.
 * This allows artifacts of rendering at tile edges to be ignored.
 * Supported data should be wider and taller than the tile size by a value of `2 x gutter`.
 * @property {number} [maxResolution] Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Tile projection.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("./Source.js").State} [state] The source state.
 * @property {boolean} [wrapX=false] Render tiles beyond the antimeridian.
 * @property {number} [transition] Transition time when fading in new tiles (in milliseconds).
 * @property {number} [bandCount=4] Number of bands represented in the data.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 */
/**
 * @classdesc
 * A source for typed array data tiles.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @api
 */
declare class DataTileSource extends TileSource {
    /**
     * @param {Options} options DataTile source options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {number}
     */
    private gutter_;
    /**
     * @private
     * @type {import('../size.js').Size|null}
     */
    private tileSize_;
    /**
     * @private
     * @type {Array<import('../size.js').Size>|null}
     */
    private tileSizes_;
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
     * @private
     * @type {!Object<string, import("../tilegrid/TileGrid.js").default>}
     */
    private tileGridForProjection_;
    /**
     * @private
     * @type {!Object<string, import("../TileCache.js").default>}
     */
    private tileCacheForProjection_;
    /**
     * Set the source tile sizes.  The length of the array is expected to match the number of
     * levels in the tile grid.
     * @protected
     * @param {Array<import('../size.js').Size>} tileSizes An array of tile sizes.
     */
    protected setTileSizes(tileSizes: Array<import('../size.js').Size>): void;
    /**
     * Get the source tile size at the given zoom level.  This may be different than the rendered tile
     * size.
     * @protected
     * @param {number} z Tile zoom level.
     * @return {import('../size.js').Size} The source tile size.
     */
    protected getTileSize(z: number): import('../size.js').Size;
    /**
     * @param {Loader} loader The data loader.
     * @protected
     */
    protected setLoader(loader: Loader): void;
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {import("../proj/Projection.js").default} targetProj The output projection.
     * @param {import("../proj/Projection.js").default} sourceProj The input projection.
     * @return {!DataTile} Tile.
     */
    getReprojTile_(z: number, x: number, y: number, targetProj: import("../proj/Projection.js").default, sourceProj: import("../proj/Projection.js").default): DataTile;
    /**
     * @param {number} z Tile coordinate z.
     * @param {number} x Tile coordinate x.
     * @param {number} y Tile coordinate y.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {!DataTile} Tile.
     */
    getTile(z: number, x: number, y: number, pixelRatio: number, projection: import("../proj/Projection.js").default): DataTile;
    /**
     * Sets the tile grid to use when reprojecting the tiles to the given
     * projection instead of the default tile grid for the projection.
     *
     * This can be useful when the default tile grid cannot be created
     * (e.g. projection has no extent defined) or
     * for optimization reasons (custom tile size, resolutions, ...).
     *
     * @param {import("../proj.js").ProjectionLike} projection Projection.
     * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
     * @api
     */
    setTileGridForProjection(projection: import("../proj.js").ProjectionLike, tilegrid: import("../tilegrid/TileGrid.js").default): void;
}
import TileSource from './Tile.js';
import DataTile from '../DataTile.js';
//# sourceMappingURL=DataTile.d.ts.map