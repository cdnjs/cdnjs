export default ImageWMS;
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
     * Use the `ol/Map#pixelRatio` value when requesting
     * the image from the remote server.
     */
    hidpi?: boolean | undefined;
    /**
     * The type of
     * the remote WMS server: `mapserver`, `geoserver`, `carmentaserver`, or `qgis`.
     * Only needed if `hidpi` is `true`.
     */
    serverType?: import("./wms.js").ServerType | undefined;
    /**
     * Optional function to load an image given a URL.
     */
    imageLoadFunction?: import("../Image.js").LoadFunction | undefined;
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
    params?: {
        [x: string]: any;
    } | undefined;
    /**
     * Projection. Default is the view projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Ratio. `1` means image requests are the size of the map viewport, `2` means
     * twice the width and height of the map viewport, and so on. Must be `1` or higher.
     */
    ratio?: number | undefined;
    /**
     * Resolutions.
     * If specified, requests will be made for these resolutions only.
     */
    resolutions?: number[] | undefined;
    /**
     * WMS service URL.
     */
    url?: string | undefined;
};
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [hidpi=true] Use the `ol/Map#pixelRatio` value when requesting
 * the image from the remote server.
 * @property {import("./wms.js").ServerType} [serverType] The type of
 * the remote WMS server: `mapserver`, `geoserver`, `carmentaserver`, or `qgis`.
 * Only needed if `hidpi` is `true`.
 * @property {import("../Image.js").LoadFunction} [imageLoadFunction] Optional function to load an image given a URL.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {Object<string,*>} [params] WMS request parameters.
 * At least a `LAYERS` param is required. `STYLES` is
 * `''` by default. `VERSION` is `1.3.0` by default. `WIDTH`, `HEIGHT`, `BBOX`
 * and `CRS` (`SRS` for WMS version < 1.3.0) will be set dynamically.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [ratio=1.5] Ratio. `1` means image requests are the size of the map viewport, `2` means
 * twice the width and height of the map viewport, and so on. Must be `1` or higher.
 * @property {Array<number>} [resolutions] Resolutions.
 * If specified, requests will be made for these resolutions only.
 * @property {string} [url] WMS service URL.
 */
/**
 * @classdesc
 * Source for WMS servers providing single, untiled images.
 *
 * @fires module:ol/source/Image.ImageSourceEvent
 * @api
 */
declare class ImageWMS extends ImageSource {
    /**
     * @param {Options} [options] ImageWMS options.
     */
    constructor(options?: Options);
    /**
     * @private
     * @type {?string}
     */
    private crossOrigin_;
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
     * Return the image load function of the source.
     * @return {import("../Image.js").LoadFunction} The image load function.
     * @api
     */
    getImageLoadFunction(): import("../Image.js").LoadFunction;
    /**
     * Return the URL used for this WMS source.
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
//# sourceMappingURL=ImageWMS.d.ts.map