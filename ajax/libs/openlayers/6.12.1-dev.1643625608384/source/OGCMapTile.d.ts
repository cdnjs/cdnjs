export default OGCMapTile;
export type Options = {
    /**
     * URL to the OGC Map Tileset endpoint.
     */
    url: string;
    /**
     * A lookup of values to use in the tile URL template.  The `{tileMatrix}`
     * (zoom level), `{tileRow}`, and `{tileCol}` variables in the URL will always be provided by the source.
     */
    context?: any;
    /**
     * The content type for the tiles (e.g. "image/png").  If not provided,
     * the source will try to find a link with rel="item" that uses a supported image type.
     */
    mediaType?: string | undefined;
    /**
     * Projection. By default, the projection
     * will be derived from the `crs` of the `tileMatrixSet`.  You can override this by supplying
     * a projection to the constructor.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike | undefined;
    /**
     * Tile cache size. The default depends on the screen size. Will be ignored if too small.
     */
    cacheSize?: number | undefined;
    /**
     * The `crossOrigin` attribute for loaded images.  Note that
     * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null | undefined;
    /**
     * Deprecated.  Use the `interpolate` option instead.
     */
    imageSmoothing?: boolean | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
     */
    interpolate?: boolean | undefined;
    /**
     * Maximum allowed reprojection error (in pixels).
     * Higher values can increase reprojection performance, but decrease precision.
     */
    reprojectionErrorThreshold?: number | undefined;
    /**
     * Optional function to load a tile given a URL. The default is
     * ```js
     * function(tile, src) {
     * tile.getImage().src = src;
     * };
     * ```
     */
    tileLoadFunction?: import("../Tile.js").LoadFunction | undefined;
    /**
     * Whether to wrap the world horizontally.
     */
    wrapX?: boolean | undefined;
    /**
     * Duration of the opacity transition for rendering.
     * To disable the opacity transition, pass `transition: 0`.
     */
    transition?: number | undefined;
};
/**
 * @typedef {Object} Options
 * @property {string} url URL to the OGC Map Tileset endpoint.
 * @property {Object} [context] A lookup of values to use in the tile URL template.  The `{tileMatrix}`
 * (zoom level), `{tileRow}`, and `{tileCol}` variables in the URL will always be provided by the source.
 * @property {string} [mediaType] The content type for the tiles (e.g. "image/png").  If not provided,
 * the source will try to find a link with rel="item" that uses a supported image type.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. By default, the projection
 * will be derived from the `crs` of the `tileMatrixSet`.  You can override this by supplying
 * a projection to the constructor.
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize] Tile cache size. The default depends on the screen size. Will be ignored if too small.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [imageSmoothing=true] Deprecated.  Use the `interpolate` option instead.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(tile, src) {
 *   tile.getImage().src = src;
 * };
 * ```
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 */
/**
 * @classdesc
 * Layer source for map tiles from an [OGC API - Tiles](https://ogcapi.ogc.org/tiles/) service that provides "map" type tiles.
 * The service must conform to at least the core (http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/core)
 * and tileset (http://www.opengis.net/spec/ogcapi-tiles-1/1.0/conf/tileset) conformance classes.
 */
declare class OGCMapTile extends TileImage {
    /**
     * @param {Options} options OGC map tile options.
     */
    constructor(options: Options);
    /**
     * @param {import("./ogcTileUtil.js").TileSetInfo} tileSetInfo Tile set info.
     * @private
     */
    private handleTileSetInfo_;
    /**
     * @private
     * @param {Error} error The error.
     */
    private handleError_;
}
import TileImage from "./TileImage.js";
//# sourceMappingURL=OGCMapTile.d.ts.map