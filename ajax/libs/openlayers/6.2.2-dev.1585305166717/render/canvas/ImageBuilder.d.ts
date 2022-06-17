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
     * @type {import("../canvas.js").DeclutterGroups}
     */
    private declutterGroups_;
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
     * @type {number|undefined}
     */
    private scale_;
    /**
     * @private
     * @type {number|undefined}
     */
    private width_;
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {number} end End.
     * @param {number} stride Stride.
     * @private
     * @return {number} My end.
     */
    private drawCoordinates_;
    /**
     * @inheritDoc
     */
    drawPoint(pointGeometry: any, feature: any): void;
    /**
     * @inheritDoc
     */
    drawMultiPoint(multiPointGeometry: any, feature: any): void;
    /**
     * @inheritDoc
     */
    setImageStyle(imageStyle: any, declutterGroups: any): void;
}
import CanvasBuilder from "./Builder.js";
//# sourceMappingURL=ImageBuilder.d.ts.map