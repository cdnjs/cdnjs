/**
 * @param {HTMLImageElement|HTMLCanvasElement} image Image.
 * @param {string} src Src.
 * @param {import("../size.js").Size} size Size.
 * @param {?string} crossOrigin Cross origin.
 * @param {import("../ImageState.js").default} imageState Image state.
 * @param {import("../color.js").Color} color Color.
 * @return {IconImage} Icon image.
 */
export function get(image: HTMLCanvasElement | HTMLImageElement, src: string, size: number[], crossOrigin: string, imageState: any, color: number[]): IconImage;
export default IconImage;
declare class IconImage extends EventTarget {
    /**
     * @param {HTMLImageElement|HTMLCanvasElement} image Image.
     * @param {string|undefined} src Src.
     * @param {import("../size.js").Size} size Size.
     * @param {?string} crossOrigin Cross origin.
     * @param {import("../ImageState.js").default} imageState Image state.
     * @param {import("../color.js").Color} color Color.
     */
    constructor(image: HTMLCanvasElement | HTMLImageElement, src: string, size: number[], crossOrigin: string, imageState: any, color: number[]);
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */
    private hitDetectionImage_;
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */
    private image_;
    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    private canvas_;
    /**
     * @private
     * @type {import("../color.js").Color}
     */
    private color_;
    /**
     * @private
     * @type {?function():void}
     */
    private unlisten_;
    /**
     * @private
     * @type {import("../ImageState.js").default}
     */
    private imageState_;
    /**
     * @private
     * @type {import("../size.js").Size}
     */
    private size_;
    /**
     * @private
     * @type {string|undefined}
     */
    private src_;
    /**
     * @private
     * @type {boolean|undefined}
     */
    private tainted_;
    /**
     * @private
     * @return {boolean} The image canvas is tainted.
     */
    private isTainted_;
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
     * @return {HTMLImageElement|HTMLCanvasElement} Image or Canvas element.
     */
    getImage(pixelRatio: number): HTMLCanvasElement | HTMLImageElement;
    /**
     * @return {import("../ImageState.js").default} Image state.
     */
    getImageState(): any;
    /**
     * @param {number} pixelRatio Pixel ratio.
     * @return {HTMLImageElement|HTMLCanvasElement} Image element.
     */
    getHitDetectionImage(pixelRatio: number): HTMLCanvasElement | HTMLImageElement;
    /**
     * @return {import("../size.js").Size} Image size.
     */
    getSize(): number[];
    /**
     * @return {string|undefined} Image src.
     */
    getSrc(): string;
    /**
     * Load not yet loaded URI.
     */
    load(): void;
    /**
     * @private
     */
    private replaceColor_;
    /**
     * Discards event handlers which listen for load completion or errors.
     *
     * @private
     */
    private unlistenImage_;
}
import EventTarget from "../events/Target.js";
//# sourceMappingURL=IconImage.d.ts.map