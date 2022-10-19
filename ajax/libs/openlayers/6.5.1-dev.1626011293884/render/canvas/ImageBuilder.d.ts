export default CanvasImageBuilder;
declare class CanvasImageBuilder extends CanvasBuilder {
    /**
     * @param {number} tolerance Tolerance.
     * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     */
    constructor(tolerance: number, maxExtent: number[], resolution: number, pixelRatio: number);
    /**
     * @private
     * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
     */
    private hitDetectionImage_;
    /**
     * @private
     * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
     */
    private image_;
    /**
     * @private
     * @type {number|undefined}
     */
    private imagePixelRatio_;
    /**
     * @private
     * @type {number|undefined}
     */
    private anchorX_;
    /**
     * @private
     * @type {number|undefined}
     */
    private anchorY_;
    /**
     * @private
     * @type {number|undefined}
     */
    private height_;
    /**
     * @private
     * @type {number|undefined}
     */
    private opacity_;
    /**
     * @private
     * @type {number|undefined}
     */
    private originX_;
    /**
     * @private
     * @type {number|undefined}
     */
    private originY_;
    /**
     * @private
     * @type {boolean|undefined}
     */
    private rotateWithView_;
    /**
     * @private
     * @type {number|undefined}
     */
    private rotation_;
    /**
     * @private
     * @type {import("../../size.js").Size|undefined}
     */
    private scale_;
    /**
     * @private
     * @type {number|undefined}
     */
    private width_;
    /**
     * Data shared with a text builder for combined decluttering.
     * @private
     * @type {import("../canvas.js").DeclutterImageWithText}
     */
    private declutterImageWithText_;
    /**
     * @param {import("../../style/Image.js").default} imageStyle Image style.
     * @param {Object} [opt_sharedData] Shared data.
     */
    setImageStyle(imageStyle: import("../../style/Image.js").default, opt_sharedData?: any): void;
}
import CanvasBuilder from "./Builder.js";
//# sourceMappingURL=ImageBuilder.d.ts.map