/**
 * @param {string} baseUrl Base URL for the ArcGIS Rest service.
 * @param {import("../extent.js").Extent} extent Extent.
 * @param {number} resolution Resolution.
 * @param {number} pixelRatio Pixel ratio.
 * @param {import("../proj/Projection.js").default} projection Projection.
 * @param {Object} params Params.
 * @return {string} Request URL.
 */
export function getRequestUrl(baseUrl: string, extent: import("../extent.js").Extent, resolution: number, pixelRatio: number, projection: import("../proj/Projection.js").default, params: any): string;
/**
 * @typedef {Object} LoaderOptions
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [hidpi=true] Use the `ol/Map#pixelRatio` value when requesting the image from
 * the remote server.
 * @property {Object<string,*>} [params] ArcGIS Rest parameters. This field is optional. Service
 * defaults will be used for any fields not specified. `FORMAT` is `PNG32` by default. `F` is
 * `IMAGE` by default. `TRANSPARENT` is `true` by default.  `BBOX`, `SIZE`, `BBOXSR`, and `IMAGESR`
 * will be set dynamically. Set `LAYERS` to override the default service layer visibility. See
 * https://developers.arcgis.com/rest/services-reference/export-map.htm
 * for further reference.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is 'EPSG:3857'.
 * The projection code must contain a numeric end portion separated by :
 * or the entire code must form a valid ArcGIS SpatialReference definition.
 * @property {number} [ratio=1.5] Ratio. `1` means image requests are the size of the map viewport,
 * `2` means twice the size of the map viewport, and so on.
 * @property {string} url ArcGIS Rest service URL for a Map Service or Image Service. The url
 * should include /MapServer or /ImageServer.
 * @property {function(HTMLImageElement, string): Promise<import('../DataTile.js').ImageLike>} [load] Function
 * to perform loading of the image. Receives the created `HTMLImageElement` and the desired `src` as argument and
 * returns a promise resolving to the loaded or decoded image. Default is {@link module:ol/Image.decode}.
 */
/**
 * Creates a loader for ArcGIS Rest images.
 * @param {LoaderOptions} options Image ArcGIS Rest Options.
 * @return {import('../Image.js').ImageObjectPromiseLoader} ArcGIS Rest image.
 * @api
 */
export function createLoader(options: LoaderOptions): import("../Image.js").ImageObjectPromiseLoader;
export type LoaderOptions = {
    /**
     * The `crossOrigin` attribute for loaded images.  Note that
     * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null | undefined;
    /**
     * Use the `ol/Map#pixelRatio` value when requesting the image from
     * the remote server.
     */
    hidpi?: boolean | undefined;
    /**
     * ArcGIS Rest parameters. This field is optional. Service
     * defaults will be used for any fields not specified. `FORMAT` is `PNG32` by default. `F` is
     * `IMAGE` by default. `TRANSPARENT` is `true` by default.  `BBOX`, `SIZE`, `BBOXSR`, and `IMAGESR`
     * will be set dynamically. Set `LAYERS` to override the default service layer visibility. See
     * https://developers.arcgis.com/rest/services-reference/export-map.htm
     * for further reference.
     */
    params?: {
        [x: string]: any;
    } | undefined;
    /**
     * Projection. Default is 'EPSG:3857'.
     * The projection code must contain a numeric end portion separated by :
     * or the entire code must form a valid ArcGIS SpatialReference definition.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Ratio. `1` means image requests are the size of the map viewport,
     * `2` means twice the size of the map viewport, and so on.
     */
    ratio?: number | undefined;
    /**
     * ArcGIS Rest service URL for a Map Service or Image Service. The url
     * should include /MapServer or /ImageServer.
     */
    url: string;
    /**
     * Function
     * to perform loading of the image. Receives the created `HTMLImageElement` and the desired `src` as argument and
     * returns a promise resolving to the loaded or decoded image. Default is {@link module :ol/Image.decode}.
     */
    load?: ((arg0: HTMLImageElement, arg1: string) => Promise<import("../DataTile.js").ImageLike>) | undefined;
};
//# sourceMappingURL=arcgisRest.d.ts.map