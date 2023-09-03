/**
 * @param {HTMLImageElement|HTMLCanvasElement|ImageBitmap} image Image.
 * @param {string} cacheKey Src.
 * @param {?string} crossOrigin Cross origin.
 * @param {import("../ImageState.js").default} imageState Image state.
 * @param {import("../color.js").Color} color Color.
 * @return {IconImage} Icon image.
 */
export function get(image: HTMLImageElement | HTMLCanvasElement | ImageBitmap, cacheKey: string, crossOrigin: string | null, imageState: any, color: import("../color.js").Color): IconImage;
export default IconImage;
declare class IconImage extends EventTarget {
    /**
     * @param {HTMLImageElement|HTMLCanvasElement|ImageBitmap} image Image.
     * @param {string|undefined} src Src.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../ImageState.js").default} imageState Image state.
     * @param {import("../color.js").Color} color Color.
     */
    constructor(image: HTMLImageElement | HTMLCanvasElement | ImageBitmap, src: string | undefined, crossOrigin: string | null, imageState: any, color: import("../color.js").Color);
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement|ImageBitmap}
     */
    private hitDetectionImage_;
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement|ImageBitmap}
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
     * @type {import("../color.js").Color}
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
}
import EventTarget from '../events/Target.js';
//# sourceMappingURL=IconImage.d.ts.map