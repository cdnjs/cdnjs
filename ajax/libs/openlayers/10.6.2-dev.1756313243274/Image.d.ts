/**
 * @param {import('./DataTile.js').ImageLike} image Image element.
 * @param {function():any} loadHandler Load callback function.
 * @param {function():any} errorHandler Error callback function.
 * @return {function():void} Callback to stop listening.
 */
export function listenImage(image: import("./DataTile.js").ImageLike, loadHandler: () => any, errorHandler: () => any): () => void;
/**
 * Loads an image.
 * @param {HTMLImageElement} image Image, not yet loaded.
 * @param {string} [src] `src` attribute of the image. Optional, not required if already present.
 * @return {Promise<HTMLImageElement>} Promise resolving to an `HTMLImageElement`.
 * @api
 */
export function load(image: HTMLImageElement, src?: string): Promise<HTMLImageElement>;
/**
 * @param {HTMLImageElement} image Image, not yet loaded.
 * @param {string} [src] `src` attribute of the image. Optional, not required if already present.
 * @return {Promise<HTMLImageElement>} Promise resolving to an `HTMLImageElement`.
 */
export function decodeFallback(image: HTMLImageElement, src?: string): Promise<HTMLImageElement>;
/**
 * Loads an image and decodes it to an `ImageBitmap` if `createImageBitmap()` is supported. Returns
 * the loaded image otherwise.
 * @param {HTMLImageElement} image Image, not yet loaded.
 * @param {string} [src] `src` attribute of the image. Optional, not required if already present.
 * @return {Promise<ImageBitmap|HTMLImageElement>} Promise resolving to an `ImageBitmap` or an
 * `HTMLImageElement` if `createImageBitmap()` is not supported.
 * @api
 */
export function decode(image: HTMLImageElement, src?: string): Promise<ImageBitmap | HTMLImageElement>;
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
export type LoadFunction = (arg0: import("./Image.js").default, arg1: string) => void;
export type ImageObject = {
    /**
     * Extent, if different from the requested one.
     */
    extent?: import("./extent.js").Extent | undefined;
    /**
     * Resolution, if different from the requested one.
     * When x and y resolution are different, use the array type (`[xResolution, yResolution]`).
     */
    resolution?: import("./resolution.js").ResolutionLike | undefined;
    /**
     * Pixel ratio, if different from the requested one.
     */
    pixelRatio?: number | undefined;
    /**
     * Image.
     */
    image: import("./DataTile.js").ImageLike;
};
/**
 * Loader function used for image sources. Receives extent, resolution and pixel ratio as arguments.
 * For images that cover any extent and resolution (static images), the loader function should not accept
 * any arguments. The function returns an {@link import ("./DataTile.js").ImageLike image}, an
 * {@link import ("./Image.js").ImageObject image object}, or a promise for the same.
 * For loaders that generate images, the promise should not resolve until the image is loaded.
 * If the returned image does not match the extent, resolution or pixel ratio passed to the loader,
 * it has to return an {@link import ("./Image.js").ImageObject image object} with the `image` and the
 * correct `extent`, `resolution` and `pixelRatio`.
 */
export type Loader = (arg0: import("./extent.js").Extent, arg1: number, arg2: number, arg3: ((arg0: HTMLImageElement, arg1: string) => void) | undefined) => import("./DataTile.js").ImageLike | ImageObject | Promise<import("./DataTile.js").ImageLike | ImageObject>;
/**
 * Loader function used for image sources. Receives extent, resolution and pixel ratio as arguments.
 * The function returns a promise for an  {@link import ("./Image.js").ImageObject image object}.
 */
export type ImageObjectPromiseLoader = (arg0: import("./extent.js").Extent, arg1: number, arg2: number, arg3: ((arg0: HTMLImageElement, arg1: string) => void) | undefined) => Promise<import("./DataTile.js").ImageLike | ImageObject>;
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
 * @typedef {function(import("./Image.js").default, string): void} LoadFunction
 * @api
 */
/**
 * @typedef {Object} ImageObject
 * @property {import("./extent.js").Extent} [extent] Extent, if different from the requested one.
 * @property {import("./resolution.js").ResolutionLike} [resolution] Resolution, if different from the requested one.
 * When x and y resolution are different, use the array type (`[xResolution, yResolution]`).
 * @property {number} [pixelRatio] Pixel ratio, if different from the requested one.
 * @property {import('./DataTile.js').ImageLike} image Image.
 */
/**
 * Loader function used for image sources. Receives extent, resolution and pixel ratio as arguments.
 * For images that cover any extent and resolution (static images), the loader function should not accept
 * any arguments. The function returns an {@link import("./DataTile.js").ImageLike image}, an
 * {@link import("./Image.js").ImageObject image object}, or a promise for the same.
 * For loaders that generate images, the promise should not resolve until the image is loaded.
 * If the returned image does not match the extent, resolution or pixel ratio passed to the loader,
 * it has to return an {@link import("./Image.js").ImageObject image object} with the `image` and the
 * correct `extent`, `resolution` and `pixelRatio`.
 *
 * @typedef {function(import("./extent.js").Extent, number, number, (function(HTMLImageElement, string): void)=): import("./DataTile.js").ImageLike|ImageObject|Promise<import("./DataTile.js").ImageLike|ImageObject>} Loader
 * @api
 */
/**
 * Loader function used for image sources. Receives extent, resolution and pixel ratio as arguments.
 * The function returns a promise for an  {@link import("./Image.js").ImageObject image object}.
 *
 * @typedef {function(import("./extent.js").Extent, number, number, (function(HTMLImageElement, string): void)=): Promise<import("./DataTile.js").ImageLike|ImageObject>} ImageObjectPromiseLoader
 */
declare class ImageWrapper extends EventTarget {
    /**
     * @param {import("./extent.js").Extent} extent Extent.
     * @param {number|Array<number>|undefined} resolution Resolution. If provided as array, x and y
     * resolution will be assumed.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./ImageState.js").default|Loader} stateOrLoader State.
     */
    constructor(extent: import("./extent.js").Extent, resolution: number | Array<number> | undefined, pixelRatio: number, stateOrLoader: any | Loader);
    /**
     * @protected
     * @type {import("./extent.js").Extent}
     */
    protected extent: import("./extent.js").Extent;
    /**
     * @private
     * @type {number}
     */
    private pixelRatio_;
    /**
     * @protected
     * @type {number|Array<number>|undefined}
     */
    protected resolution: number | Array<number> | undefined;
    /**
     * @protected
     * @type {import("./ImageState.js").default}
     */
    protected state: any;
    /**
     * @private
     * @type {import('./DataTile.js').ImageLike|null}
     */
    private image_;
    /**
     * @protected
     * @type {Loader|null}
     */
    protected loader: Loader | null;
    /**
     * @protected
     */
    protected changed(): void;
    /**
     * @return {import("./extent.js").Extent} Extent.
     */
    getExtent(): import("./extent.js").Extent;
    /**
     * @return {import('./DataTile.js').ImageLike} Image.
     */
    getImage(): import("./DataTile.js").ImageLike;
    /**
     * @return {number} PixelRatio.
     */
    getPixelRatio(): number;
    /**
     * @return {number|Array<number>} Resolution.
     */
    getResolution(): number | Array<number>;
    /**
     * @return {import("./ImageState.js").default} State.
     */
    getState(): any;
    /**
     * Load not yet loaded URI.
     */
    load(): void;
    /**
     * @param {import('./DataTile.js').ImageLike} image The image.
     */
    setImage(image: import("./DataTile.js").ImageLike): void;
    /**
     * @param {number|Array<number>} resolution Resolution.
     */
    setResolution(resolution: number | Array<number>): void;
}
import EventTarget from './events/Target.js';
//# sourceMappingURL=Image.d.ts.map