export default ImageMapGuide;
export type Options = {
    /**
     * The mapagent url.
     */
    url?: string;
    /**
     * The `crossOrigin` attribute for loaded images.  Note that
     * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null;
    /**
     * The display resolution.
     */
    displayDpi?: number;
    /**
     * The meters-per-unit value.
     */
    metersPerUnit?: number;
    /**
     * Use the `ol/Map#pixelRatio` value when requesting
     * the image from the remote server.
     */
    hidpi?: boolean;
    /**
     * If `true`, will use `GETDYNAMICMAPOVERLAYIMAGE`.
     */
    useOverlay?: boolean;
    /**
     * Projection. Default is the view projection.
     */
    projection?: string | import("../proj/Projection.js").default | undefined;
    /**
     * Ratio. `1` means image requests are the size of the map viewport, `2` means
     * twice the width and height of the map viewport, and so on. Must be `1` or higher.
     */
    ratio?: number;
    /**
     * Resolutions.
     * If specified, requests will be made for these resolutions only.
     */
    resolutions?: number[];
    /**
     * Optional function to load an image given a URL.
     */
    imageLoadFunction?: (arg0: ImageWrapper, arg1: string) => void;
    /**
     * Enable image smoothing.
     */
    imageSmoothing?: boolean;
    /**
     * Additional parameters.
     */
    params?: any;
};
/**
 * @typedef {Object} Options
 * @property {string} [url] The mapagent url.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {number} [displayDpi=96] The display resolution.
 * @property {number} [metersPerUnit=1] The meters-per-unit value.
 * @property {boolean} [hidpi=true] Use the `ol/Map#pixelRatio` value when requesting
 * the image from the remote server.
 * @property {boolean} [useOverlay] If `true`, will use `GETDYNAMICMAPOVERLAYIMAGE`.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [ratio=1] Ratio. `1` means image requests are the size of the map viewport, `2` means
 * twice the width and height of the map viewport, and so on. Must be `1` or higher.
 * @property {Array<number>} [resolutions] Resolutions.
 * If specified, requests will be made for these resolutions only.
 * @property {import("../Image.js").LoadFunction} [imageLoadFunction] Optional function to load an image given a URL.
 * @property {boolean} [imageSmoothing=true] Enable image smoothing.
 * @property {Object} [params] Additional parameters.
 */
/**
 * @classdesc
 * Source for images from Mapguide servers
 *
 * @fires module:ol/source/Image.ImageSourceEvent
 * @api
 */
declare class ImageMapGuide extends ImageSource {
    /**
     * @param {Options} options ImageMapGuide options.
     */
    constructor(options: Options);
    /**
     * @private
     * @type {?string}
     */
    private crossOrigin_;
    /**
     * @private
     * @type {number}
     */
    private displayDpi_;
    /**
     * @private
     * @type {!Object}
     */
    private params_;
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
     * @type {boolean}
     */
    private hidpi_;
    /**
     * @private
     * @type {number}
     */
    private metersPerUnit_;
    /**
     * @private
     * @type {number}
     */
    private ratio_;
    /**
     * @private
     * @type {boolean}
     */
    private useOverlay_;
    /**
     * @private
     * @type {import("../Image.js").default}
     */
    private image_;
    /**
     * @private
     * @type {number}
     */
    private renderedRevision_;
    /**
     * Get the user-provided params, i.e. those passed to the constructor through
     * the "params" option, and possibly updated using the updateParams method.
     * @return {Object} Params.
     * @api
     */
    getParams(): any;
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {import("../Image.js").default} Single image.
     */
    getImageInternal(extent: number[], resolution: number, pixelRatio: number, projection: import("../proj/Projection.js").default): ImageWrapper;
    /**
     * Return the image load function of the source.
     * @return {import("../Image.js").LoadFunction} The image load function.
     * @api
     */
    getImageLoadFunction(): (arg0: ImageWrapper, arg1: string) => void;
    /**
     * Update the user-provided params.
     * @param {Object} params Params.
     * @api
     */
    updateParams(params: any): void;
    /**
     * @param {string} baseUrl The mapagent url.
     * @param {Object<string, string|number>} params Request parameters.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {import("../size.js").Size} size Size.
     * @param {import("../proj/Projection.js").default} projection Projection.
     * @return {string} The mapagent map image request URL.
     */
    getUrl(baseUrl: string, params: {
        [x: string]: string | number;
    }, extent: number[], size: number[], projection: import("../proj/Projection.js").default): string;
    /**
     * Set the image load function of the MapGuide source.
     * @param {import("../Image.js").LoadFunction} imageLoadFunction Image load function.
     * @api
     */
    setImageLoadFunction(imageLoadFunction: (arg0: ImageWrapper, arg1: string) => void): void;
}
import ImageWrapper from "../Image.js";
import ImageSource from "./Image.js";
//# sourceMappingURL=ImageMapGuide.d.ts.map