export default TileArcGISRest;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike | undefined;
    /**
     * Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
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
     * ArcGIS Rest parameters. This field is optional. Service defaults will be
     * used for any fields not specified. `FORMAT` is `PNG32` by default. `F` is `IMAGE` by
     * default. `TRANSPARENT` is `true` by default.  `BBOX`, `SIZE`, `BBOXSR`,
     * and `IMAGESR` will be set dynamically. Set `LAYERS` to
     * override the default service layer visibility. See
     * https://developers.arcgis.com/rest/services-reference/export-map.htm
     * for further reference.
     */
    params?: {
        [x: string]: any;
    } | undefined;
    /**
     * Use the `ol/Map#pixelRatio` value when requesting
     * the image from the remote server.
     */
    hidpi?: boolean | undefined;
    /**
     * Tile grid. Base this on the resolutions,
     * tilesize and extent supported by the server.
     * If this is not defined, a default grid will be used: if there is a projection
     * extent, the grid will be based on that; if not, a grid based on a global
     * extent with origin at 0,0 will be used.
     */
    tileGrid?: import("../tilegrid/TileGrid.js").default | undefined;
    /**
     * Projection. Default is the view projection.
     * The projection code must contain a numeric end portion separated by :
     * or the entire code must form a valid ArcGIS SpatialReference definition.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Maximum allowed reprojection error (in pixels).
     * Higher values can increase reprojection performance, but decrease precision.
     */
    reprojectionErrorThreshold?: number | undefined;
    /**
     * Optional function to load a tile given a URL.
     * The default is
     * ```js
     * function(imageTile, src) {
     * imageTile.getImage().src = src;
     * };
     * ```
     */
    tileLoadFunction?: import("../Tile.js").LoadFunction | undefined;
    /**
     * ArcGIS Rest service URL for a Map Service or Image Service. The
     * url should include /MapServer or /ImageServer.
     */
    url?: string | undefined;
    /**
     * Whether to wrap the world horizontally.
     */
    wrapX?: boolean | undefined;
    /**
     * Duration of the opacity transition for rendering.  To disable the opacity
     * transition, pass `transition: 0`.
     */
    transition?: number | undefined;
    /**
     * ArcGIS Rest service urls. Use this instead of `url` when the ArcGIS
     * Service supports multiple urls for export requests.
     */
    urls?: string[] | undefined;
    /**
     * Choose whether to use tiles with a higher or lower zoom level when between integer
     * zoom levels. See {@link module :ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
     */
    zDirection?: number | import("../array.js").NearestDirectionFunction | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [imageSmoothing=true] Deprecated.  Use the `interpolate` option instead.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {Object<string,*>} [params] ArcGIS Rest parameters. This field is optional. Service defaults will be
 * used for any fields not specified. `FORMAT` is `PNG32` by default. `F` is `IMAGE` by
 * default. `TRANSPARENT` is `true` by default.  `BBOX`, `SIZE`, `BBOXSR`,
 * and `IMAGESR` will be set dynamically. Set `LAYERS` to
 * override the default service layer visibility. See
 * https://developers.arcgis.com/rest/services-reference/export-map.htm
 * for further reference.
 * @property {boolean} [hidpi=true] Use the `ol/Map#pixelRatio` value when requesting
 * the image from the remote server.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid. Base this on the resolutions,
 * tilesize and extent supported by the server.
 * If this is not defined, a default grid will be used: if there is a projection
 * extent, the grid will be based on that; if not, a grid based on a global
 * extent with origin at 0,0 will be used.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * The projection code must contain a numeric end portion separated by :
 * or the entire code must form a valid ArcGIS SpatialReference definition.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL.
 * The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {string} [url] ArcGIS Rest service URL for a Map Service or Image Service. The
 * url should include /MapServer or /ImageServer.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.  To disable the opacity
 * transition, pass `transition: 0`.
 * @property {Array<string>} [urls] ArcGIS Rest service urls. Use this instead of `url` when the ArcGIS
 * Service supports multiple urls for export requests.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */
/**
 * @classdesc
 * Layer source for tile data from ArcGIS Rest services. Map and Image
 * Services are supported.
 *
 * For cached ArcGIS services, better performance is available using the
 * {@link module:ol/source/XYZ~XYZ} data source.
 * @api
 */
declare class TileArcGISRest extends TileImage {
    /**
     * @param {Options} [opt_options] Tile ArcGIS Rest options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * @private
     * @type {!Object}
     */
    private params_;
    /**
     * @private
     * @type {boolean}
     */
    private hidpi_;
    /**
     * @private
     * @type {import("../extent.js").Extent}
     */
    private tmpExtent_;
    /**
     * @private
     * @return {string} The key for the current params.
     */
    private getKeyForParams_;
    /**
     * Get the user-provided params, i.e. those passed to the constructor through
     * the "params" option, and possibly updated using the updateParams method.
     * @return {Object} Params.
     * @api
     */
    getParams(): any;
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../size.js").Size} tileSize Tile size.
     * @param {import("../extent.js").Extent} tileExtent Tile extent.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @param {Object} params Params.
     * @return {string|undefined} Request URL.
     * @private
     */
    private getRequestUrl_;
    /**
     * Update the user-provided params.
     * @param {Object} params Params.
     * @api
     */
    updateParams(params: any): void;
}
import TileImage from "./TileImage.js";
//# sourceMappingURL=TileArcGISRest.d.ts.map