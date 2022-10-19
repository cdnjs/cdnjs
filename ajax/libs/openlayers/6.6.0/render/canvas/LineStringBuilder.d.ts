export default CanvasLineStringBuilder;
declare class CanvasLineStringBuilder extends CanvasBuilder {
    /**
     * @param {number} tolerance Tolerance.
     * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     */
    constructor(tolerance: number, maxExtent: number[], resolution: number, pixelRatio: number);
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {number} end End.
     * @param {number} stride Stride.
     * @private
     * @return {number} end.
     */
    private drawFlatCoordinates_;
}
import CanvasBuilder from "./Builder.js";
//# sourceMappingURL=LineStringBuilder.d.ts.map