/**
 * @param {import('../tilecoord.js').TileCoord} tileCoord Tile coord.
 * @return {string} Quad key.
 */
export function quadKey(tileCoord: import('../tilecoord.js').TileCoord): string;
export default BingMaps;
export type Options = {
    /**
     * Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
     */
    cacheSize?: number | undefined;
    /**
     * If `true` hidpi tiles will be requested.
     */
    hidpi?: boolean | undefined;
    /**
     * Culture code.
     */
    culture?: string | undefined;
    /**
     * Bing Maps API key. Get yours at https://www.bingmapsportal.com/.
     */
    key: string;
    /**
     * Type of imagery.
     */
    imagerySet: string;
    /**
     * Use interpolated values when resampling.  By default,
     * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
     */
    interpolate?: boolean | undefined;
    /**
     * Max zoom. Default is what's advertized by the BingMaps service.
     */
    maxZoom?: number | undefined;
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
export type BingMapsImageryMetadataResponse = {
    /**
     * The response status code
     */
    statusCode: number;
    /**
     * The response status description
     */
    statusDescription: string;
    /**
     * The authentication result code
     */
    authenticationResultCode: string;
    /**
     * The array of resource sets
     */
    resourceSets: Array<ResourceSet>;
};
export type ResourceSet = {
    /**
     * Resources.
     */
    resources: Array<Resource>;
};
export type Resource = {
    /**
     * The image height
     */
    imageHeight: number;
    /**
     * The image width
     */
    imageWidth: number;
    /**
     * The minimum zoom level
     */
    zoomMin: number;
    /**
     * The maximum zoom level
     */
    zoomMax: number;
    /**
     * The image URL
     */
    imageUrl: string;
    /**
     * The image URL subdomains for rotation
     */
    imageUrlSubdomains: Array<string>;
    /**
     * The array of ImageryProviders
     */
    imageryProviders?: ImageryProvider[] | undefined;
};
export type ImageryProvider = {
    /**
     * The coverage areas
     */
    coverageAreas: Array<CoverageArea>;
    /**
     * The attribution
     */
    attribution?: string | undefined;
};
export type CoverageArea = {
    /**
     * The minimum zoom
     */
    zoomMin: number;
    /**
     * The maximum zoom
     */
    zoomMax: number;
    /**
     * The coverage bounding box
     */
    bbox: Array<number>;
};
/**
 * @typedef {Object} Options
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {boolean} [hidpi=false] If `true` hidpi tiles will be requested.
 * @property {string} [culture='en-us'] Culture code.
 * @property {string} key Bing Maps API key. Get yours at https://www.bingmapsportal.com/.
 * @property {string} imagerySet Type of imagery.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {number} [maxZoom=21] Max zoom. Default is what's advertized by the BingMaps service.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */
/**
 * @typedef {Object} BingMapsImageryMetadataResponse
 * @property {number} statusCode The response status code
 * @property {string} statusDescription The response status description
 * @property {string} authenticationResultCode The authentication result code
 * @property {Array<ResourceSet>} resourceSets The array of resource sets
 */
/**
 * @typedef {Object} ResourceSet
 * @property {Array<Resource>} resources Resources.
 */
/**
 * @typedef {Object} Resource
 * @property {number} imageHeight The image height
 * @property {number} imageWidth The image width
 * @property {number} zoomMin The minimum zoom level
 * @property {number} zoomMax The maximum zoom level
 * @property {string} imageUrl The image URL
 * @property {Array<string>} imageUrlSubdomains The image URL subdomains for rotation
 * @property {Array<ImageryProvider>} [imageryProviders] The array of ImageryProviders
 */
/**
 * @typedef {Object} ImageryProvider
 * @property {Array<CoverageArea>} coverageAreas The coverage areas
 * @property {string} [attribution] The attribution
 */
/**
 * @typedef {Object} CoverageArea
 * @property {number} zoomMin The minimum zoom
 * @property {number} zoomMax The maximum zoom
 * @property {Array<number>} bbox The coverage bounding box
 */
/**
 * @classdesc
 * Layer source for Bing Maps tile data.
 * @api
 */
declare class BingMaps extends TileImage {
    /**
     * @param {Options} options Bing Maps options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {boolean}
     */
    private hidpi_;
    /**
     * @private
     * @type {string}
     */
    private culture_;
    /**
     * @private
     * @type {number}
     */
    private maxZoom_;
    /**
     * @private
     * @type {string}
     */
    private apiKey_;
    /**
     * @private
     * @type {string}
     */
    private imagerySet_;
    /**
     * Get the api key used for this source.
     *
     * @return {string} The api key.
     * @api
     */
    getApiKey(): string;
    /**
     * Get the imagery set associated with this source.
     *
     * @return {string} The imagery set.
     * @api
     */
    getImagerySet(): string;
    /**
     * @param {BingMapsImageryMetadataResponse} response Response.
     */
    handleImageryMetadataResponse(response: BingMapsImageryMetadataResponse): void;
}
import TileImage from "./TileImage.js";
//# sourceMappingURL=BingMaps.d.ts.map