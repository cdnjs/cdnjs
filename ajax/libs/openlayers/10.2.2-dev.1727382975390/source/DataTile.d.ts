export default DataTileSource;
export type CrossOriginAttribute = "anonymous" | "use-credentials";
export type LoaderOptions = {
    /**
     * An abort controller signal.
     */
    signal: AbortSignal;
    /**
     * The cross-origin attribute for images.
     */
    crossOrigin?: CrossOriginAttribute | undefined;
    /**
     * The maximum y coordinate at the given z level.  Will be undefined if the
     * underlying tile grid does not have a known extent.
     */
    maxY?: number | undefined;
};
/**
 * Data tile loading function.  The function is called with z, x, and y tile coordinates and
 * returns {@link import ("../DataTile.js").Data data} for a tile or a promise for the same.
 */
export type Loader = (arg0: number, arg1: number, arg2: number, arg3: LoaderOptions) => (import("../DataTile.js").Data | Promise<import("../DataTile.js").Data>);
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
    tileGrid?: import("../tilegrid.js").TileGrid | undefined;
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
    /**
     * The crossOrigin property to pass to loaders for image data.
     */
    crossOrigin?: CrossOriginAttribute | undefined;
    /**
     * Key for use in caching tiles.
     */
    key?: string | undefined;
};
/**
 * @typedef {'anonymous'|'use-credentials'} CrossOriginAttribute
 */
/**
 * @typedef {Object} LoaderOptions
 * @property {AbortSignal} signal An abort controller signal.
 * @property {CrossOriginAttribute} [crossOrigin] The cross-origin attribute for images.
 * @property {number} [maxY] The maximum y coordinate at the given z level.  Will be undefined if the
 * underlying tile grid does not have a known extent.
 */
/**
 * Data tile loading function.  The function is called with z, x, and y tile coordinates and
 * returns {@link import("../DataTile.js").Data data} for a tile or a promise for the same.
 * @typedef {function(number, number, number, LoaderOptions) : (import("../DataTile.js").Data|Promise<import("../DataTile.js").Data>)} Loader
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
 * @property {import("./Source.js").State} [state] The source state.
 * @property {boolean} [wrapX=false] Render tiles beyond the antimeridian.
 * @property {number} [transition] Transition time when fading in new tiles (in milliseconds).
 * @property {number} [bandCount=4] Number of bands represented in the data.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 * @property {CrossOriginAttribute} [crossOrigin='anonymous'] The crossOrigin property to pass to loaders for image data.
 * @property {string} [key] Key for use in caching tiles.
 */
/**
 * @classdesc
 * A source for typed array data tiles.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @template {import("../Tile.js").default} [TileType=DataTile]
 * @extends TileSource<TileType>
 * @api
 */
declare class DataTileSource<TileType extends import("../Tile.js").default = DataTile> extends TileSource<TileType> {
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
     * @type {CrossOriginAttribute}
     */
    private crossOrigin_;
    /**
     * Set the source tile sizes.  The length of the array is expected to match the number of
     * levels in the tile grid.
     * @protected
     * @param {Array<import('../size.js').Size>} tileSizes An array of tile sizes.
     */
    protected setTileSizes(tileSizes: Array<import("../size.js").Size>): void;
    /**
     * Get the source tile size at the given zoom level.  This may be different than the rendered tile
     * size.
     * @protected
     * @param {number} z Tile zoom level.
     * @return {import('../size.js').Size} The source tile size.
     */
    protected getTileSize(z: number): import("../size.js").Size;
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
     * @return {!TileType} Tile.
     */
    getReprojTile_(z: number, x: number, y: number, targetProj: import("../proj/Projection.js").default, sourceProj: import("../proj/Projection.js").default): TileType;
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
import DataTile from '../DataTile.js';
import TileSource from './Tile.js';
//# sourceMappingURL=DataTile.d.ts.map