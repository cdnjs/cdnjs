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
    imageExtent?: import("../extent.js").Extent | undefined;
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
     * Size of the image in pixels. Usually the image size is auto-detected, so this
     * only needs to be set if auto-detection fails for some reason.
     */
    imageSize?: import("../size.js").Size | undefined;
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
 * @property {import("../extent.js").Extent} [imageExtent] Extent of the image in map coordinates.
 * This is the [left, bottom, right, top] map coordinates of your image.
 * @property {import("../Image.js").LoadFunction} [imageLoadFunction] Optional function to load an image given a URL.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {import("../size.js").Size} [imageSize] Size of the image in pixels. Usually the image size is auto-detected, so this
 * only needs to be set if auto-detection fails for some reason.
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
     * @private
     * @type {import("../Image.js").default}
     */
    private image_;
    /**
     * @private
     * @type {import("../size.js").Size|null}
     */
    private imageSize_;
    /**
     * Returns the image extent
     * @return {import("../extent.js").Extent} image extent.
     * @api
     */
    getImageExtent(): import("../extent.js").Extent;
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../Image.js").default} Single image.
     */
    getImageInternal(extent: import("../extent.js").Extent, resolution: number, pixelRatio: number, projection: import("../proj/Projection.js").default): import("../Image.js").default;
    /**
     * Return the URL used for this image source.
     * @return {string} URL.
     * @api
     */
    getUrl(): string;
}
import ImageSource from "./Image.js";
//# sourceMappingURL=ImageStatic.d.ts.map