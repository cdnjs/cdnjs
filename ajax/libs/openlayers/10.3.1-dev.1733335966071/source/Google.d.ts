export default Google;
export type Options = {
    /**
     * Google Map Tiles API key. Get yours at https://developers.google.com/maps/documentation/tile/get-api-key.
     */
    key: string;
    /**
     * The type of [base map](https://developers.google.com/maps/documentation/tile/session_tokens#required_fields).
     */
    mapType?: string | undefined;
    /**
     * An [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) for information displayed on the tiles.
     */
    language?: string | undefined;
    /**
     * A [Common Locale Data Repository](https://cldr.unicode.org/) (CLDR) region identifier that represents the user location.
     */
    region?: string | undefined;
    /**
     * The image format used for the map tiles (e.g. `'jpeg'`, or `'png'`).
     */
    imageFormat?: string | undefined;
    /**
     * Scale for map elements (`'scaleFactor1x'`, `'scaleFactor2x'`, or `'scaleFactor4x'`).
     */
    scale?: string | undefined;
    /**
     * Use high-resolution tiles.
     */
    highDpi?: boolean | undefined;
    /**
     * The layer types added to the map (e.g. `'layerRoadmap'`, `'layerStreetview'`, or `'layerTraffic'`).
     */
    layerTypes?: string[] | undefined;
    /**
     * Display only the `layerTypes` and not the underlying `mapType` (only works if `layerTypes` is provided).
     */
    overlay?: boolean | undefined;
    /**
     * [Custom styles](https://developers.google.com/maps/documentation/tile/style-reference) applied to the map.
     */
    styles?: any[] | undefined;
    /**
     * Allow the attributions to be collapsed.
     */
    attributionsCollapsible?: boolean | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
     */
    interpolate?: boolean | undefined;
    /**
     * Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
     */
    cacheSize?: number | undefined;
    /**
     * Maximum allowed reprojection error (in pixels).
     * Higher values can increase reprojection performance, but decrease precision.
     */
    reprojectionErrorThreshold?: number | undefined;
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
     * An array of values specifying additional options to apply.
     */
    apiOptions?: string[] | undefined;
    /**
     * Wrap the world horizontally.
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
export type SessionTokenRequest = {
    /**
     * The map type.
     */
    mapType: string;
    /**
     * The language.
     */
    language: string;
    /**
     * The region.
     */
    region: string;
    /**
     * The image format.
     */
    imageFormat?: string | undefined;
    /**
     * The scale.
     */
    scale?: string | undefined;
    /**
     * Use high resolution tiles.
     */
    highDpi?: boolean | undefined;
    /**
     * The layer types.
     */
    layerTypes?: string[] | undefined;
    /**
     * The overlay.
     */
    overlay?: boolean | undefined;
    /**
     * The styles.
     */
    styles?: any[] | undefined;
    /**
     * An array of values specifying additional options to apply.
     */
    apiOptions?: string[] | undefined;
};
export type SessionTokenResponse = {
    /**
     * The session token.
     */
    session: string;
    /**
     * The session token expiry (seconds since the epoch as a string).
     */
    expiry: string;
    /**
     * The tile width.
     */
    tileWidth: number;
    /**
     * The tile height.
     */
    tileHeight: number;
    /**
     * The image format.
     */
    imageFormat: string;
};
/**
 * @typedef {Object} Options
 * @property {string} key Google Map Tiles API key. Get yours at https://developers.google.com/maps/documentation/tile/get-api-key.
 * @property {string} [mapType='roadmap'] The type of [base map](https://developers.google.com/maps/documentation/tile/session_tokens#required_fields).
 * @property {string} [language='en-US'] An [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) for information displayed on the tiles.
 * @property {string} [region='US'] A [Common Locale Data Repository](https://cldr.unicode.org/) (CLDR) region identifier that represents the user location.
 * @property {string} [imageFormat] The image format used for the map tiles (e.g. `'jpeg'`, or `'png'`).
 * @property {string} [scale] Scale for map elements (`'scaleFactor1x'`, `'scaleFactor2x'`, or `'scaleFactor4x'`).
 * @property {boolean} [highDpi=false] Use high-resolution tiles.
 * @property {Array<string>} [layerTypes] The layer types added to the map (e.g. `'layerRoadmap'`, `'layerStreetview'`, or `'layerTraffic'`).
 * @property {boolean} [overlay=false] Display only the `layerTypes` and not the underlying `mapType` (only works if `layerTypes` is provided).
 * @property {Array<Object>} [styles] [Custom styles](https://developers.google.com/maps/documentation/tile/style-reference) applied to the map.
 * @property {boolean} [attributionsCollapsible=true] Allow the attributions to be collapsed.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {Array<string>} [apiOptions] An array of values specifying additional options to apply.
 * @property {boolean} [wrapX=true] Wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */
/**
 * @typedef {Object} SessionTokenRequest
 * @property {string} mapType The map type.
 * @property {string} language The language.
 * @property {string} region The region.
 * @property {string} [imageFormat] The image format.
 * @property {string} [scale] The scale.
 * @property {boolean} [highDpi] Use high resolution tiles.
 * @property {Array<string>} [layerTypes] The layer types.
 * @property {boolean} [overlay] The overlay.
 * @property {Array<Object>} [styles] The styles.
 * @property {Array<string>} [apiOptions] An array of values specifying additional options to apply.
 */
/**
 * @typedef {Object} SessionTokenResponse
 * @property {string} session The session token.
 * @property {string} expiry The session token expiry (seconds since the epoch as a string).
 * @property {number} tileWidth The tile width.
 * @property {number} tileHeight The tile height.
 * @property {string} imageFormat The image format.
 */
/**
 * @classdesc
 * A tile layer source that renders tiles from the Google [Map Tiles API](https://developers.google.com/maps/documentation/tile/overview).
 * The constructor takes options that are passed to the request to create a session token.  Refer to the
 * [documentation](https://developers.google.com/maps/documentation/tile/session_tokens#required_fields)
 * for additional details.
 * @api
 */
declare class Google extends TileImage {
    /**
     * @param {Options} options Google Maps options.
     */
    constructor(options: Options);
    /**
     * @type {string}
     * @private
     */
    private apiKey_;
    /**
     * @type {Error|null}
     * @private
     */
    private error_;
    /**
     * @type {SessionTokenRequest}
     * @private
     */
    private sessionTokenRequest_;
    /**
     * @type {string}
     * @private
     */
    private sessionTokenValue_;
    /**
     * @type {ReturnType<typeof setTimeout>}
     * @private
     */
    private sessionRefreshId_;
    /**
     * @type {string}
     * @private
     */
    private previousViewportAttribution_;
    /**
     * @type {string}
     * @private
     */
    private previousViewportExtent_;
    /**
     * @return {Error|null} A source loading error. When the source state is `error`, use this function
     * to get more information about the error. To debug a faulty configuration, you may want to use
     * a listener like
     * ```js
     * source.on('change', () => {
     *   if (source.getState() === 'error') {
     *     console.error(source.getError());
     *   }
     * });
     * ```
     */
    getError(): Error | null;
    /**
     * Exposed here so it can be overridden in the tests.
     * @param {string} url The URL.
     * @param {RequestInit} config The config.
     * @return {Promise<Response>} A promise that resolves with the response.
     */
    fetchSessionToken(url: string, config: RequestInit): Promise<Response>;
    /**
     * Get or renew a session token for use with tile requests.
     * @private
     */
    private createSession_;
    /**
     * @param {import('../Map.js').FrameState} frameState The frame state.
     * @return {Promise<string>} The attributions.
     * @private
     */
    private fetchAttributions_;
}
import TileImage from './TileImage.js';
//# sourceMappingURL=Google.d.ts.map