/**
 * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image element.
 * @param {function():any} loadHandler Load callback function.
 * @param {function():any} errorHandler Error callback function.
 * @return {function():void} Callback to stop listening.
 */
export function listenImage(image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement, loadHandler: () => any, errorHandler: () => any): () => void;
export default ImageWrapper;
/**
 * A function that takes an {@link module :ol/Image~ImageWrapper} for the image and a
 * `{string}` for the src as arguments. It is supposed to make it so the
 * underlying image {@link module :ol/Image~ImageWrapper#getImage} is assigned the
 * content specified by the src. If not specified, the default is
 *
 *     function(image, src) {
 *       image.getImage().src = src;
 *     }
 *
 * Providing a custom `imageLoadFunction` can be useful to load images with
 * post requests or - in general - through XHR requests, where the src of the
 * image element would be set to a data URI when the content is loaded.
 */
export type LoadFunction = (arg0: ImageWrapper, arg1: string) => void;
/**
 * A function that takes an {@link module:ol/Image~ImageWrapper} for the image and a
 * `{string}` for the src as arguments. It is supposed to make it so the
 * underlying image {@link module:ol/Image~ImageWrapper#getImage} is assigned the
 * content specified by the src. If not specified, the default is
 *
 *     function(image, src) {
 *       image.getImage().src = src;
 *     }
 *
 * Providing a custom `imageLoadFunction` can be useful to load images with
 * post requests or - in general - through XHR requests, where the src of the
 * image element would be set to a data URI when the content is loaded.
 *
 * @typedef {function(ImageWrapper, string): void} LoadFunction
 * @api
 */
declare class ImageWrapper extends ImageBase {
    /**
     * @param {import("./extent.js").Extent} extent Extent.
     * @param {number|undefined} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {string} src Image source URI.
     * @param {?string} crossOrigin Cross origin.
     * @param {LoadFunction} imageLoadFunction Image load function.
     * @param {CanvasRenderingContext2D} [context] Canvas context. When provided, the image will be
     *    drawn into the context's canvas, and `getImage()` will return the canvas once the image
     *    has finished loading.
     */
    constructor(extent: import("./extent.js").Extent, resolution: number | undefined, pixelRatio: number, src: string, crossOrigin: string | null, imageLoadFunction: LoadFunction, context?: CanvasRenderingContext2D | undefined);
    /**
     * @private
     * @type {string}
     */
    private src_;
    /**
     * @private
     * @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement}
     */
    private image_;
    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */
    private context_;
    /**
     * @private
     * @type {?function():void}
     */
    private unlisten_;
    /**
     * @private
     * @type {LoadFunction}
     */
    private imageLoadFunction_;
    /**
     * Tracks loading or read errors.
     *
     * @private
     */
    private handleImageError_;
    /**
     * Tracks successful image load.
     *
     * @private
     */
    private handleImageLoad_;
    /**
     * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image.
     */
    setImage(image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): void;
    /**
     * Discards event handlers which listen for load completion or errors.
     *
     * @private
     */
    private unlistenImage_;
}
import ImageBase from "./ImageBase.js";
//# sourceMappingURL=Image.d.ts.map