/**
 * Generate source options from a capabilities object.
 * @param {Object} wmtsCap An object representing the capabilities document.
 * @param {!Object} config Configuration properties for the layer.  Defaults for
 *                  the layer will apply if not provided.
 *
 * Required config properties:
 *  - layer - {string} The layer identifier.
 *
 * Optional config properties:
 *  - matrixSet - {string} The matrix set identifier, required if there is
 *       more than one matrix set in the layer capabilities.
 *  - projection - {string} The desired CRS when no matrixSet is specified.
 *       eg: "EPSG:3857". If the desired projection is not available,
 *       an error is thrown.
 *  - requestEncoding - {string} url encoding format for the layer. Default is
 *       the first tile url format found in the GetCapabilities response.
 *  - style - {string} The name of the style
 *  - format - {string} Image format for the layer. Default is the first
 *       format returned in the GetCapabilities response.
 *  - crossOrigin - {string|null|undefined} Cross origin. Default is `undefined`.
 * @return {Options|null} WMTS source options object or `null` if the layer was not found.
 * @api
 */
export function optionsFromCapabilities(wmtsCap: any, config: any): Options | null;
export default WMTS;
/**
 * Request encoding. One of 'KVP', 'REST'.
 */
export type RequestEncoding = "KVP" | "REST";
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
     * Tile grid.
     */
    tileGrid: import("../tilegrid/WMTS.js").default;
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
     * Request encoding.
     */
    requestEncoding?: RequestEncoding | undefined;
    /**
     * Layer name as advertised in the WMTS capabilities.
     */
    layer: string;
    /**
     * Style name as advertised in the WMTS capabilities.
     */
    style: string;
    /**
     * Class used to instantiate image tiles. Default is {@link module :ol/ImageTile~ImageTile}.
     */
    tileClass?: typeof import("../ImageTile.js").default | undefined;
    /**
     * The pixel ratio used by the tile service.
     * For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px
     * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
     * should be set to `2`.
     */
    tilePixelRatio?: number | undefined;
    /**
     * Image format. Only used when `requestEncoding` is `'KVP'`.
     */
    format?: string | undefined;
    /**
     * WMTS version.
     */
    version?: string | undefined;
    /**
     * Matrix set.
     */
    matrixSet: string;
    /**
     * Additional "dimensions" for tile requests.
     * This is an object with properties named like the advertised WMTS dimensions.
     */
    dimensions?: any;
    /**
     * A URL for the service.
     * For the RESTful request encoding, this is a URL
     * template.  For KVP encoding, it is normal URL. A `{?-?}` template pattern,
     * for example `subdomain{a-f}.domain.com`, may be used instead of defining
     * each one separately in the `urls` option.
     */
    url?: string | undefined;
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
     * An array of URLs.
     * Requests will be distributed among the URLs in this array.
     */
    urls?: string[] | undefined;
    /**
     * Whether to wrap the world horizontally.
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
 * Request encoding. One of 'KVP', 'REST'.
 * @typedef {'KVP' | 'REST'} RequestEncoding
 */
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
 * @property {import("../tilegrid/WMTS.js").default} tileGrid Tile grid.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {RequestEncoding} [requestEncoding='KVP'] Request encoding.
 * @property {string} layer Layer name as advertised in the WMTS capabilities.
 * @property {string} style Style name as advertised in the WMTS capabilities.
 * @property {typeof import("../ImageTile.js").default} [tileClass]  Class used to instantiate image tiles. Default is {@link module:ol/ImageTile~ImageTile}.
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service.
 * For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {string} [format='image/jpeg'] Image format. Only used when `requestEncoding` is `'KVP'`.
 * @property {string} [version='1.0.0'] WMTS version.
 * @property {string} matrixSet Matrix set.
 * @property {!Object} [dimensions] Additional "dimensions" for tile requests.
 * This is an object with properties named like the advertised WMTS dimensions.
 * @property {string} [url]  A URL for the service.
 * For the RESTful request encoding, this is a URL
 * template.  For KVP encoding, it is normal URL. A `{?-?}` template pattern,
 * for example `subdomain{a-f}.domain.com`, may be used instead of defining
 * each one separately in the `urls` option.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {Array<string>} [urls] An array of URLs.
 * Requests will be distributed among the URLs in this array.
 * @property {boolean} [wrapX=false] Whether to wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */
/**
 * @classdesc
 * Layer source for tile data from WMTS servers.
 * @api
 */
declare class WMTS extends TileImage {
    /**
     * @param {Options} options WMTS options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {string}
     */
    private version_;
    /**
     * @private
     * @type {string}
     */
    private format_;
    /**
     * @private
     * @type {!Object}
     */
    private dimensions_;
    /**
     * @private
     * @type {string}
     */
    private layer_;
    /**
     * @private
     * @type {string}
     */
    private matrixSet_;
    /**
     * @private
     * @type {string}
     */
    private style_;
    /**
     * @private
     * @type {RequestEncoding}
     */
    private requestEncoding_;
    /**
     * Get the dimensions, i.e. those passed to the constructor through the
     * "dimensions" option, and possibly updated using the updateDimensions
     * method.
     * @return {!Object} Dimensions.
     * @api
     */
    getDimensions(): any;
    /**
     * Return the image format of the WMTS source.
     * @return {string} Format.
     * @api
     */
    getFormat(): string;
    /**
     * Return the layer of the WMTS source.
     * @return {string} Layer.
     * @api
     */
    getLayer(): string;
    /**
     * Return the matrix set of the WMTS source.
     * @return {string} MatrixSet.
     * @api
     */
    getMatrixSet(): string;
    /**
     * Return the request encoding, either "KVP" or "REST".
     * @return {RequestEncoding} Request encoding.
     * @api
     */
    getRequestEncoding(): RequestEncoding;
    /**
     * Return the style of the WMTS source.
     * @return {string} Style.
     * @api
     */
    getStyle(): string;
    /**
     * Return the version of the WMTS source.
     * @return {string} Version.
     * @api
     */
    getVersion(): string;
    /**
     * @private
     * @return {string} The key for the current dimensions.
     */
    private getKeyForDimensions_;
    /**
     * Update the dimensions.
     * @param {Object} dimensions Dimensions.
     * @api
     */
    updateDimensions(dimensions: any): void;
    /**
     * @param {string} template Template.
     * @return {import("../Tile.js").UrlFunction} Tile URL function.
     */
    createFromWMTSTemplate(template: string): import("../Tile.js").UrlFunction;
}
import TileImage from './TileImage.js';
//# sourceMappingURL=WMTS.d.ts.map