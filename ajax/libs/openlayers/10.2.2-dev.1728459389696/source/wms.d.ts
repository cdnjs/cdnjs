/**
 * @api
 * @typedef {'carmentaserver' | 'geoserver' | 'mapserver' | 'qgis'} ServerType
 * Set the server type to use implementation-specific parameters beyond the WMS specification.
 *  - `'carmentaserver'`: HiDPI support for [Carmenta Server](https://www.carmenta.com/en/products/carmenta-server)
 *  - `'geoserver'`: HiDPI support for [GeoServer](https://geoserver.org/)
 *  - `'mapserver'`: HiDPI support for [MapServer](https://mapserver.org/)
 *  - `'qgis'`: HiDPI support for [QGIS](https://qgis.org/)
 */
/**
 * @param {string} baseUrl Base URL.
 * @param {import("../extent.js").Extent} extent Extent.
 * @param {import("../size.js").Size} size Size.
 * @param {import("../proj/Projection.js").default} projection Projection.
 * @param {Object} params WMS params. Will be modified in place.
 * @return {string} Request URL.
 */
export function getRequestUrl(baseUrl: string, extent: import("../extent.js").Extent, size: import("../size.js").Size, projection: import("../proj/Projection.js").default, params: any): string;
/**
 * @param {import("../extent").Extent} extent Extent.
 * @param {number} resolution Resolution.
 * @param {number} pixelRatio pixel ratio.
 * @param {import("../proj.js").Projection} projection Projection.
 * @param {string} url WMS service url.
 * @param {Object} params WMS params.
 * @param {import("./wms.js").ServerType} serverType The type of the remote WMS server.
 * @return {string} Image src.
 */
export function getImageSrc(extent: import("../extent").Extent, resolution: number, pixelRatio: number, projection: import("../proj.js").Projection, url: string, params: any, serverType: import("./wms.js").ServerType): string;
/**
 * @param {Object} params WMS params.
 * @param {string} request WMS `REQUEST`.
 * @return {Object} WMS params with required properties set.
 */
export function getRequestParams(params: any, request: string): any;
/**
 * @typedef {Object} LoaderOptions
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [hidpi=true] Use the `ol/Map#pixelRatio` value when requesting
 * the image from the remote server.
 * @property {Object<string,*>} [params] WMS request parameters.
 * At least a `LAYERS` param is required. `STYLES` is
 * `''` by default. `VERSION` is `1.3.0` by default. `WIDTH`, `HEIGHT` and `BBOX` will be set
 * dynamically. `CRS` (`SRS` for WMS version < 1.3.0) will is derived from the `proection` config.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is 'EPSG:3857'.
 * @property {number} [ratio=1.5] Ratio. `1` means image requests are the size of the map viewport, `2` means
 * twice the width and height of the map viewport, and so on. Must be `1` or higher.
 * @property {import("./wms.js").ServerType} [serverType] The type of
 * the remote WMS server: `mapserver`, `geoserver`, `carmentaserver`, or `qgis`.
 * Only needed if `hidpi` is `true`.
 * @property {string} url WMS service URL.
 * @property {function(HTMLImageElement, string): Promise<import('../DataTile.js').ImageLike>} [load] Function
 * to perform loading of the image. Receives the created `HTMLImageElement` and the desired `src` as argument and
 * returns a promise resolving to the loaded or decoded image. Default is {@link module:ol/Image.decode}.
 */
/**
 * Creates a loader for WMS images.
 * @param {LoaderOptions} options Loader options.
 * @return {import("../Image.js").ImageObjectPromiseLoader} Loader.
 * @api
 */
export function createLoader(options: LoaderOptions): import("../Image.js").ImageObjectPromiseLoader;
/**
 * Get the GetFeatureInfo URL for the passed coordinate and resolution. Returns `undefined` if the
 * GetFeatureInfo URL cannot be constructed.
 * @param {LoaderOptions} options Options passed the `createWMSLoader()` function. In addition to
 * the params required by the loader, `INFO_FORMAT` should be specified, it defaults to
 * `application/json`. If `QUERY_LAYERS` is not provided, then the layers specified in the `LAYERS`
 * parameter will be used.
 * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
 * @param {number} resolution Resolution.
 * @return {string|undefined} GetFeatureInfo URL.
 * @api
 */
export function getFeatureInfoUrl(options: LoaderOptions, coordinate: import("../coordinate.js").Coordinate, resolution: number): string | undefined;
/**
 * Get the GetLegendGraphic URL, optionally optimized for the passed resolution and possibly
 * including any passed specific parameters. Returns `undefined` if the GetLegendGraphic URL
 * cannot be constructed.
 *
 * @param {LoaderOptions} options Options passed the `createWMSLoader()` function.
 * @param {number} [resolution] Resolution. If not provided, `SCALE` will not be calculated and
 * included in URL.
 * @return {string|undefined} GetLegendGraphic URL.
 * @api
 */
export function getLegendUrl(options: LoaderOptions, resolution?: number | undefined): string | undefined;
/**
 * Default WMS version.
 * @type {string}
 */
export const DEFAULT_VERSION: string;
/**
 * Set the server type to use implementation-specific parameters beyond the WMS specification.
 * - `'carmentaserver'`: HiDPI support for [Carmenta Server](https://www.carmenta.com/en/products/carmenta-server)
 * - `'geoserver'`: HiDPI support for [GeoServer](https://geoserver.org/)
 * - `'mapserver'`: HiDPI support for [MapServer](https://mapserver.org/)
 * - `'qgis'`: HiDPI support for [QGIS](https://qgis.org/)
 */
export type ServerType = "carmentaserver" | "geoserver" | "mapserver" | "qgis";
export type LoaderOptions = {
    /**
     * The `crossOrigin` attribute for loaded images.  Note that
     * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null | undefined;
    /**
     * Use the `ol/Map#pixelRatio` value when requesting
     * the image from the remote server.
     */
    hidpi?: boolean | undefined;
    /**
     * WMS request parameters.
     * At least a `LAYERS` param is required. `STYLES` is
     * `''` by default. `VERSION` is `1.3.0` by default. `WIDTH`, `HEIGHT` and `BBOX` will be set
     * dynamically. `CRS` (`SRS` for WMS version < 1.3.0) will is derived from the `proection` config.
     */
    params?: {
        [x: string]: any;
    } | undefined;
    /**
     * Projection. Default is 'EPSG:3857'.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Ratio. `1` means image requests are the size of the map viewport, `2` means
     * twice the width and height of the map viewport, and so on. Must be `1` or higher.
     */
    ratio?: number | undefined;
    /**
     * The type of
     * the remote WMS server: `mapserver`, `geoserver`, `carmentaserver`, or `qgis`.
     * Only needed if `hidpi` is `true`.
     */
    serverType?: ServerType | undefined;
    /**
     * WMS service URL.
     */
    url: string;
    /**
     * Function
     * to perform loading of the image. Receives the created `HTMLImageElement` and the desired `src` as argument and
     * returns a promise resolving to the loaded or decoded image. Default is {@link module :ol/Image.decode}.
     */
    load?: ((arg0: HTMLImageElement, arg1: string) => Promise<import("../DataTile.js").ImageLike>) | undefined;
};
//# sourceMappingURL=wms.d.ts.map