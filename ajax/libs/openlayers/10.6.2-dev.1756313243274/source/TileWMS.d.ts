export default TileWMS;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike | undefined;
    /**
     * Attributions are collapsible.
     */
    attributionsCollapsible?: boolean | undefined;
    /**
     * Deprecated.  Use the cacheSize option on the layer instead.
     */
    cacheSize?: number | undefined;
    /**
     * The `crossOrigin` attribute for loaded images.  Note that
     * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
     */
    interpolate?: boolean | undefined;
    /**
     * WMS request parameters.
     * At least a `LAYERS` param is required. `STYLES` is
     * `''` by default. `VERSION` is `1.3.0` by default. `WIDTH`, `HEIGHT`, `BBOX`
     * and `CRS` (`SRS` for WMS version < 1.3.0) will be set dynamically.
     */
    params: {
        [x: string]: any;
    };
    /**
     * The size in pixels of the gutter around image tiles to ignore. By setting
     * this property to a non-zero value, images will be requested that are wider
     * and taller than the tile size by a value of `2 x gutter`.
     * Using a non-zero value allows artifacts of rendering at tile edges to be
     * ignored. If you control the WMS service it is recommended to address
     * "artifacts at tile edges" issues by properly configuring the WMS service. For
     * example, MapServer has a `tile_map_edge_buffer` configuration parameter for
     * this. See https://mapserver.org/output/tile_mode.html.
     */
    gutter?: number | undefined;
    /**
     * Use the `ol/Map#pixelRatio` value when requesting
     * the image from the remote server.
     */
    hidpi?: boolean | undefined;
    /**
     * Projection. Default is the view projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Maximum allowed reprojection error (in pixels).
     * Higher values can increase reprojection performance, but decrease precision.
     */
    reprojectionErrorThreshold?: number | undefined;
    /**
     * Class used to instantiate image tiles.
     * Default is {@link module :ol/ImageTile~ImageTile}.
     */
    tileClass?: typeof import("../ImageTile.js").default | undefined;
    /**
     * Tile grid. Base this on the resolutions,
     * tilesize and extent supported by the server.
     * If this is not defined, a default grid will be used: if there is a projection
     * extent, the grid will be based on that; if not, a grid based on a global
     * extent with origin at 0,0 will be used.
     */
    tileGrid?: import("../tilegrid/TileGrid.js").default | undefined;
    /**
     * The type of
     * the remote WMS server: `mapserver`, `geoserver`, `carmentaserver`, or `qgis`.
     * Only needed if `hidpi` is `true`.
     */
    serverType?: import("./wms.js").ServerType | undefined;
    /**
     * Optional function to load a tile given a URL. The default is
     * ```js
     * function(imageTile, src) {
     * imageTile.getImage().src = src;
     * };
     * ```
     */
    tileLoadFunction?: import("../Tile.js").LoadFunction | undefined;
    /**
     * WMS service URL.
     */
    url?: string | undefined;
    /**
     * WMS service urls.
     * Use this instead of `url` when the WMS supports multiple urls for GetMap requests.
     */
    urls?: string[] | undefined;
    /**
     * Whether to wrap the world horizontally.
     * When set to `false`, only one world
     * will be rendered. When `true`, tiles will be requested for one world only,
     * but they will be wrapped horizontally to render multiple worlds.
     */
    wrapX?: boolean | undefined;
    /**
     * Duration of the opacity transition for rendering.
     * To disable the opacity transition, pass `transition: 0`.
     */
    transition?: number | undefined;
    /**
     * Choose whether to use tiles with a higher or lower zoom level when between integer
     * zoom levels. See {@link module :ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
     */
    zDirection?: number | import("../array.js").NearestDirectionFunction | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {Object<string,*>} params WMS request parameters.
 * At least a `LAYERS` param is required. `STYLES` is
 * `''` by default. `VERSION` is `1.3.0` by default. `WIDTH`, `HEIGHT`, `BBOX`
 * and `CRS` (`SRS` for WMS version < 1.3.0) will be set dynamically.
 * @property {number} [gutter=0]
 * The size in pixels of the gutter around image tiles to ignore. By setting
 * this property to a non-zero value, images will be requested that are wider
 * and taller than the tile size by a value of `2 x gutter`.
 * Using a non-zero value allows artifacts of rendering at tile edges to be
 * ignored. If you control the WMS service it is recommended to address
 * "artifacts at tile edges" issues by properly configuring the WMS service. For
 * example, MapServer has a `tile_map_edge_buffer` configuration parameter for
 * this. See https://mapserver.org/output/tile_mode.html.
 * @property {boolean} [hidpi=true] Use the `ol/Map#pixelRatio` value when requesting
 * the image from the remote server.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {typeof import("../ImageTile.js").default} [tileClass] Class used to instantiate image tiles.
 * Default is {@link module:ol/ImageTile~ImageTile}.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid. Base this on the resolutions,
 * tilesize and extent supported by the server.
 * If this is not defined, a default grid will be used: if there is a projection
 * extent, the grid will be based on that; if not, a grid based on a global
 * extent with origin at 0,0 will be used.
 * @property {import("./wms.js").ServerType} [serverType] The type of
 * the remote WMS server: `mapserver`, `geoserver`, `carmentaserver`, or `qgis`.
 * Only needed if `hidpi` is `true`.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {string} [url] WMS service URL.
 * @property {Array<string>} [urls] WMS service urls.
 * Use this instead of `url` when the WMS supports multiple urls for GetMap requests.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * When set to `false`, only one world
 * will be rendered. When `true`, tiles will be requested for one world only,
 * but they will be wrapped horizontally to render multiple worlds.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */
/**
 * @classdesc
 * Layer source for tile data from WMS servers.
 * @api
 */
declare class TileWMS extends TileImage {
    /**
     * @param {Options} [options] Tile WMS options.
     */
    constructor(options?: Options);
    /**
     * @private
     * @type {number}
     */
    private gutter_;
    /**
     * @private
     * @type {!Object}
     */
    private params_;
    /**
     * @private
     * @type {boolean}
     */
    private v13_;
    /**
     * @private
     * @type {import("./wms.js").ServerType}
     */
    private serverType_;
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
     * Return the GetFeatureInfo URL for the passed coordinate, resolution, and
     * projection. Return `undefined` if the GetFeatureInfo URL cannot be
     * constructed.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {number} resolution Resolution.
     * @param {import("../proj.js").ProjectionLike} projection Projection.
     * @param {!Object} params GetFeatureInfo params. `INFO_FORMAT` at least should
     *     be provided. If `QUERY_LAYERS` is not provided then the layers specified
     *     in the `LAYERS` parameter will be used. `VERSION` should not be
     *     specified here.
     * @return {string|undefined} GetFeatureInfo URL.
     * @api
     */
    getFeatureInfoUrl(coordinate: import("../coordinate.js").Coordinate, resolution: number, projection: import("../proj.js").ProjectionLike, params: any): string | undefined;
    /**
     * Return the GetLegendGraphic URL, optionally optimized for the passed
     * resolution and possibly including any passed specific parameters. Returns
     * `undefined` if the GetLegendGraphic URL cannot be constructed.
     *
     * @param {number} [resolution] Resolution. If set to undefined, `SCALE`
     *     will not be calculated and included in URL.
     * @param {Object} [params] GetLegendGraphic params. If `LAYER` is set, the
     *     request is generated for this wms layer, else it will try to use the
     *     configured wms layer. Default `FORMAT` is `image/png`.
     *     `VERSION` should not be specified here.
     * @return {string|undefined} GetLegendGraphic URL.
     * @api
     */
    getLegendUrl(resolution?: number, params?: any): string | undefined;
    /**
     * Get the user-provided params, i.e. those passed to the constructor through
     * the "params" option, and possibly updated using the updateParams method.
     * @return {Object} Params.
     * @api
     */
    getParams(): any;
    /**
     * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
     * @param {import("../extent.js").Extent} tileExtent Tile extent.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @param {Object} params Params.
     * @return {string|undefined} Request URL.
     * @private
     */
    private getRequestUrl_;
    /**
     * @private
     * @return {string} The key for the current params.
     */
    private getKeyForParams_;
    /**
     * @param {Object} params New URL paremeters.
     * @private
     */
    private setParams_;
    /**
     * Set the URL parameters passed to the WMS source.
     * @param {Object} params New URL paremeters.
     * @api
     */
    setParams(params: any): void;
    /**
     * Update the URL parameters. This method can be used to update a subset of the WMS
     * parameters. Call `setParams` to set all of the parameters.
     * @param {Object} params Updated URL parameters.
     * @api
     */
    updateParams(params: any): void;
    /**
     * @private
     */
    private updateV13_;
}
import TileImage from './TileImage.js';
//# sourceMappingURL=TileWMS.d.ts.map