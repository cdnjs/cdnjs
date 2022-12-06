export default CanvasPolygonBuilder;
declare class CanvasPolygonBuilder extends CanvasBuilder {
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
     * @param {Array<number>} ends Ends.
     * @param {number} stride Stride.
     * @private
     * @return {number} End.
     */
    private drawFlatCoordinatess_;
    /**
     * @private
     */
    private setFillStrokeStyles_;
}
import CanvasBuilder from "./Builder.js";
//# sourceMappingURL=PolygonBuilder.d.ts.map