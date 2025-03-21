export default ImageTileSource;
/**
 * Image tile loading function.  The function is called with z, x, and y tile coordinates and
 * returns an {@link import ("../DataTile.js").ImageLike image} or a promise for the same.
 */
export type Loader = (arg0: number, arg1: number, arg2: number, arg3: import("./DataTile.js").LoaderOptions) => (import("../DataTile.js").ImageLike | Promise<import("../DataTile.js").ImageLike>);
export type UrlGetter = (arg0: number, arg1: number, arg2: number, arg3: import("./DataTile.js").LoaderOptions) => string;
export type UrlLike = string | Array<string> | UrlGetter;
export type Options = {
    /**
     * The image URL template.  In addition to a single URL template, an array of URL templates or a function
     * can be provided.  If a function is provided, it will be called with z, x, y tile coordinates and loader options and should
     * return a URL.
     */
    url?: UrlLike | undefined;
    /**
     * Data loader.  Called with z, x, and y tile coordinates.
     * Returns an {@link import ("../DataTile.js").ImageLike image} for a tile or a promise for the same.
     * The promise should not resolve until the image is loaded.  If the `url` option is provided, a loader will be created.
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
     * The source state.
     */
    state?: import("./Source.js").State | undefined;
    /**
     * Render tiles beyond the antimeridian.
     */
    wrapX?: boolean | undefined;
    /**
     * Transition time when fading in new tiles (in miliseconds).
     */
    transition?: number | undefined;
    /**
     * Use interpolated values when resampling.
     */
    interpolate?: boolean | undefined;
    /**
     * The crossOrigin property to pass to loaders for image data.
     */
    crossOrigin?: import("./DataTile.js").CrossOriginAttribute | undefined;
};
/**
 * @classdesc
 * A source for typed array data tiles.
 *
 * @extends DataTileSource<import("../ImageTile.js").default>
 * @fires import("./Tile.js").TileSourceEvent
 * @api
 */
declare class ImageTileSource extends DataTileSource<import("../ImageTile.js").default> {
    /**
     * @param {Options} [options] DataTile source options.
     */
    constructor(options?: Options | undefined);
    /**
     * @param {UrlLike} url The new URL.
     * @api
     */
    setUrl(url: UrlLike): void;
}
import DataTileSource from './DataTile.js';
//# sourceMappingURL=ImageTile.d.ts.map