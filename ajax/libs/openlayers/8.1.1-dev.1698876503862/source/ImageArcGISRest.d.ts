export default ImageArcGISRest;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: import("./Source.js").AttributionLike | undefined;
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
     * Optional function to load an image given
     * a URL.
     */
    imageLoadFunction?: import("../Image.js").LoadFunction | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
     */
    interpolate?: boolean | undefined;
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
     * Projection. Default is the view projection.
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
     * Resolutions. If specified, requests will be made for
     * these resolutions only.
     */
    resolutions?: number[] | undefined;
    /**
     * ArcGIS Rest service URL for a Map Service or Image Service. The url
     * should include /MapServer or /ImageServer.
     */
    url?: string | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [hidpi=true] Use the `ol/Map#pixelRatio` value when requesting the image from
 * the remote server.
 * @property {import("../Image.js").LoadFunction} [imageLoadFunction] Optional function to load an image given
 * a URL.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {Object<string,*>} [params] ArcGIS Rest parameters. This field is optional. Service
 * defaults will be used for any fields not specified. `FORMAT` is `PNG32` by default. `F` is
 * `IMAGE` by default. `TRANSPARENT` is `true` by default.  `BBOX`, `SIZE`, `BBOXSR`, and `IMAGESR`
 * will be set dynamically. Set `LAYERS` to override the default service layer visibility. See
 * https://developers.arcgis.com/rest/services-reference/export-map.htm
 * for further reference.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * The projection code must contain a numeric end portion separated by :
 * or the entire code must form a valid ArcGIS SpatialReference definition.
 * @property {number} [ratio=1.5] Ratio. `1` means image requests are the size of the map viewport,
 * `2` means twice the size of the map viewport, and so on.
 * @property {Array<number>} [resolutions] Resolutions. If specified, requests will be made for
 * these resolutions only.
 * @property {string} [url] ArcGIS Rest service URL for a Map Service or Image Service. The url
 * should include /MapServer or /ImageServer.
 */
/**
 * @classdesc
 * Source for data from ArcGIS Rest services providing single, untiled images.
 * Useful when underlying map service has labels.
 *
 * If underlying map service is not using labels,
 * take advantage of ol image caching and use
 * {@link module:ol/source/TileArcGISRest~TileArcGISRest} data source.
 *
 * @fires module:ol/source/Image.ImageSourceEvent
 * @api
 */
declare class ImageArcGISRest extends ImageSource {
    /**
     * @param {Options} [options] Image ArcGIS Rest Options.
     */
    constructor(options?: Options | undefined);
    /**
     * @private
     * @type {?string}
     */
    private crossOrigin_;
    /**
     * @private
     * @type {boolean}
     */
    private hidpi_;
    /**
     * @private
     * @type {string|undefined}
     */
    private url_;
    /**
     * @private
     * @type {import("../Image.js").LoadFunction}
     */
    private imageLoadFunction_;
    /**
     * @private
     * @type {!Object}
     */
    private params_;
    /**
     * @private
     * @type {import("../Image.js").default}
     */
    private image_;
    /**
     * @private
     * @type {import("../size.js").Size}
     */
    private imageSize_;
    /**
     * @private
     * @type {number}
     */
    private renderedRevision_;
    /**
     * @private
     * @type {number}
     */
    private ratio_;
    /**
     * @private
     * @type {import("../proj/Projection.js").default}
     */
    private loaderProjection_;
    /**
     * Get the user-provided params, i.e. those passed to the constructor through
     * the "params" option, and possibly updated using the updateParams method.
     * @return {Object} Params.
     * @api
     */
    getParams(): any;
    /**
     * Return the image load function of the source.
     * @return {import("../Image.js").LoadFunction} The image load function.
     * @api
     */
    getImageLoadFunction(): import("../Image.js").LoadFunction;
    /**
     * Return the URL used for this ArcGIS source.
     * @return {string|undefined} URL.
     * @api
     */
    getUrl(): string | undefined;
    /**
     * Set the image load function of the source.
     * @param {import("../Image.js").LoadFunction} imageLoadFunction Image load function.
     * @api
     */
    setImageLoadFunction(imageLoadFunction: import("../Image.js").LoadFunction): void;
    /**
     * Set the URL to use for requests.
     * @param {string|undefined} url URL.
     * @api
     */
    setUrl(url: string | undefined): void;
    /**
     * Update the user-provided params.
     * @param {Object} params Params.
     * @api
     */
    updateParams(params: any): void;
}
import ImageSource from './Image.js';
//# sourceMappingURL=ImageArcGISRest.d.ts.map