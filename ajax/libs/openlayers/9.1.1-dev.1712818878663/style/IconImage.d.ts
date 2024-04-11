/**
 * @param {HTMLImageElement|HTMLCanvasElement|ImageBitmap|null} image Image.
 * @param {string|undefined} cacheKey Src.
 * @param {?string} crossOrigin Cross origin.
 * @param {import("../ImageState.js").default|undefined} imageState Image state.
 * @param {import("../color.js").Color|string|null} color Color.
 * @param {boolean} [pattern] Also cache a `repeat` pattern with the icon image.
 * @return {IconImage} Icon image.
 */
export function get(image: HTMLImageElement | HTMLCanvasElement | ImageBitmap | null, cacheKey: string | undefined, crossOrigin: string | null, imageState: any | undefined, color: import("../color.js").Color | string | null, pattern?: boolean | undefined): IconImage;
export default IconImage;
declare class IconImage extends EventTarget {
    /**
     * @param {HTMLImageElement|HTMLCanvasElement|ImageBitmap|null} image Image.
     * @param {string|undefined} src Src.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../ImageState.js").default|undefined} imageState Image state.
     * @param {import("../color.js").Color|string|null} color Color.
     */
    constructor(image: HTMLImageElement | HTMLCanvasElement | ImageBitmap | null, src: string | undefined, crossOrigin: string | null, imageState: any | undefined, color: import("../color.js").Color | string | null);
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement|ImageBitmap}
     */
    private hitDetectionImage_;
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement|ImageBitmap|null}
     */
    private image_;
    /**
     * @private
     * @type {string|null}
     */
    private crossOrigin_;
    /**
     * @private
     * @type {Object<number, HTMLCanvasElement>}
     */
    private canvas_;
    /**
     * @private
     * @type {import("../color.js").Color|string|null}
     */
    private color_;
    /**
     * @private
     * @type {import("../ImageState.js").default}
     */
    private imageState_;
    /**
     * @private
     * @type {import("../size.js").Size|null}
     */
    private size_;
    /**
     * @private
     * @type {string|undefined}
     */
    private src_;
    /**
     * @private
     * @type {Promise<void>|null}
     */
    private ready_;
    /**
     * @private
     */
    private initializeImage_;
    /**
     * @private
     * @return {boolean} The image canvas is tainted.
     */
    private isTainted_;
    tainted_: boolean | undefined;
    /**
     * @private
     */
    private dispatchChangeEvent_;
    /**
     * @private
     */
    private handleImageError_;
    /**
     * @private
     */
    private handleImageLoad_;
    /**
     * @param {number} pixelRatio Pixel ratio.
     * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image or Canvas element or image bitmap.
     */
    getImage(pixelRatio: number): HTMLImageElement | HTMLCanvasElement | ImageBitmap;
    /**
     * @param {number} pixelRatio Pixel ratio.
     * @return {number} Image or Canvas element.
     */
    getPixelRatio(pixelRatio: number): number;
    /**
     * @return {import("../ImageState.js").default} Image state.
     */
    getImageState(): any;
    /**
     * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image element.
     */
    getHitDetectionImage(): HTMLImageElement | HTMLCanvasElement | ImageBitmap;
    /**
     * Get the size of the icon (in pixels).
     * @return {import("../size.js").Size} Image size.
     */
    getSize(): import("../size.js").Size;
    /**
     * @return {string|undefined} Image src.
     */
    getSrc(): string | undefined;
    /**
     * Load not yet loaded URI.
     */
    load(): void;
    /**
     * @param {number} pixelRatio Pixel ratio.
     * @private
     */
    private replaceColor_;
    /**
     * @return {Promise<void>} Promise that resolves when the image is loaded.
     */
    ready(): Promise<void>;
}
import EventTarget from '../events/Target.js';
//# sourceMappingURL=IconImage.d.ts.map