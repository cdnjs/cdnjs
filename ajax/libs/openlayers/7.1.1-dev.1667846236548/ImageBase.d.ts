export default ImageBase;
/**
 * @abstract
 */
declare class ImageBase extends EventTarget {
    /**
     * @param {import("./extent.js").Extent} extent Extent.
     * @param {number|undefined} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./ImageState.js").default} state State.
     */
    constructor(extent: import("./extent.js").Extent, resolution: number | undefined, pixelRatio: number, state: any);
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
     * @type {number|undefined}
     */
    protected resolution: number | undefined;
    /**
     * @protected
     * @type {import("./ImageState.js").default}
     */
    protected state: any;
    /**
     * @protected
     */
    protected changed(): void;
    /**
     * @return {import("./extent.js").Extent} Extent.
     */
    getExtent(): import("./extent.js").Extent;
    /**
     * @abstract
     * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
     */
    getImage(): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
    /**
     * @return {number} PixelRatio.
     */
    getPixelRatio(): number;
    /**
     * @return {number} Resolution.
     */
    getResolution(): number;
    /**
     * @return {import("./ImageState.js").default} State.
     */
    getState(): any;
    /**
     * Load not yet loaded URI.
     * @abstract
     */
    load(): void;
}
import EventTarget from "./events/Target.js";
//# sourceMappingURL=ImageBase.d.ts.map