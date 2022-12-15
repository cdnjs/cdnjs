export default ImageCanvas;
/**
 * A function that is called to trigger asynchronous canvas drawing.  It is
 * called with a "done" callback that should be called when drawing is done.
 * If any error occurs during drawing, the "done" callback should be called with
 * that error.
 */
export type Loader = (arg0: (arg0?: Error | undefined) => void) => void;
/**
 * A function that is called to trigger asynchronous canvas drawing.  It is
 * called with a "done" callback that should be called when drawing is done.
 * If any error occurs during drawing, the "done" callback should be called with
 * that error.
 *
 * @typedef {function(function(Error=): void): void} Loader
 */
declare class ImageCanvas extends ImageBase {
    /**
     * @param {import("./extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {HTMLCanvasElement} canvas Canvas.
     * @param {Loader} [opt_loader] Optional loader function to
     *     support asynchronous canvas drawing.
     */
    constructor(extent: number[], resolution: number, pixelRatio: number, canvas: HTMLCanvasElement, opt_loader?: ((arg0: (arg0?: Error | undefined) => void) => void) | undefined);
    /**
     * Optional canvas loader function.
     * @type {?Loader}
     * @private
     */
    private loader_;
    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    private canvas_;
    /**
     * @private
     * @type {?Error}
     */
    private error_;
    /**
     * Get any error associated with asynchronous rendering.
     * @return {?Error} Any error that occurred during rendering.
     */
    getError(): Error | null;
    /**
     * Handle async drawing complete.
     * @param {Error} [err] Any error during drawing.
     * @private
     */
    private handleLoad_;
    /**
     * @return {HTMLCanvasElement} Canvas element.
     */
    getImage(): HTMLCanvasElement;
}
import ImageBase from "./ImageBase.js";
//# sourceMappingURL=ImageCanvas.d.ts.map