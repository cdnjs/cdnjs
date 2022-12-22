export default Static;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: string | string[] | ((arg0: import("../PluggableMap.js").FrameState) => string | string[]);
    /**
     * The `crossOrigin` attribute for loaded images.  Note that
     * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null;
    /**
     * Extent of the image in map coordinates.
     * This is the [left, bottom, right, top] map coordinates of your image.
     */
    imageExtent?: number[];
    /**
     * Optional function to load an image given a URL.
     */
    imageLoadFunction?: (arg0: ImageWrapper, arg1: string) => void;
    /**
     * Deprecated.  Use the `interpolate` option instead.
     */
    imageSmoothing?: boolean;
    /**
     * Use interpolated values when resampling.  By default,
     * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
     */
    interpolate?: boolean;
    /**
     * Projection. Default is the view projection.
     */
    projection?: string | import("../proj/Projection.js").default | undefined;
    /**
     * Size of the image in pixels. Usually the image size is auto-detected, so this
     * only needs to be set if auto-detection fails for some reason.
     */
    imageSize?: number[];
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
 * @property {boolean} [imageSmoothing=true] Deprecated.  Use the `interpolate` option instead.
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
     * @type {import("../size.js").Size}
     */
    private imageSize_;
    /**
     * Returns the image extent
     * @return {import("../extent.js").Extent} image extent.
     * @api
     */
    getImageExtent(): number[];
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../Image.js").default} Single image.
     */
    getImageInternal(extent: number[], resolution: number, pixelRatio: number, projection: import("../proj/Projection.js").default): ImageWrapper;
    /**
     * Return the URL used for this image source.
     * @return {string} URL.
     * @api
     */
    getUrl(): string;
}
import ImageWrapper from "../Image.js";
import ImageSource from "./Image.js";
//# sourceMappingURL=ImageStatic.d.ts.map