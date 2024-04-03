export default Static;
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
     * Extent of the image in map coordinates.
     * This is the [left, bottom, right, top] map coordinates of your image.
     */
    imageExtent: import("../extent.js").Extent;
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
     * Projection. Default is the view projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * Image URL.
     */
    url: string;
};
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {import("../extent.js").Extent} imageExtent Extent of the image in map coordinates.
 * This is the [left, bottom, right, top] map coordinates of your image.
 * @property {import("../Image.js").LoadFunction} [imageLoadFunction] Optional function to load an image given a URL.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {string} url Image URL.
 */
/**
 * @classdesc
 * A layer source for displaying a single, static image.
 * @api
 */
declare class Static extends ImageSource {
    /**
     * @param {Options} options ImageStatic options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {string}
     */
    private url_;
    /**
     * @private
     * @type {import("../extent.js").Extent}
     */
    private imageExtent_;
    /**
     * Returns the image extent
     * @return {import("../extent.js").Extent} image extent.
     * @api
     */
    getImageExtent(): import("../extent.js").Extent;
    /**
     * Return the URL used for this image source.
     * @return {string} URL.
     * @api
     */
    getUrl(): string;
}
import ImageSource from './Image.js';
//# sourceMappingURL=ImageStatic.d.ts.map