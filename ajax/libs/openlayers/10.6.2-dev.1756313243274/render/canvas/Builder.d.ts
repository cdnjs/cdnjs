export default CanvasBuilder;
declare class CanvasBuilder extends VectorContext {
    /**
     * @param {number} tolerance Tolerance.
     * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     */
    constructor(tolerance: number, maxExtent: import("../../extent.js").Extent, resolution: number, pixelRatio: number);
    /**
     * @protected
     * @type {number}
     */
    protected tolerance: number;
    /**
     * @protected
     * @const
     * @type {import("../../extent.js").Extent}
     */
    protected maxExtent: import("../../extent.js").Extent;
    /**
     * @protected
     * @type {number}
     */
    protected pixelRatio: number;
    /**
     * @protected
     * @type {number}
     */
    protected maxLineWidth: number;
    /**
     * @protected
     * @const
     * @type {number}
     */
    protected resolution: number;
    /**
     * @private
     * @type {Array<*>}
     */
    private beginGeometryInstruction1_;
    /**
     * @private
     * @type {Array<*>}
     */
    private beginGeometryInstruction2_;
    /**
     * @private
     * @type {import("../../extent.js").Extent}
     */
    private bufferedMaxExtent_;
    /**
     * @protected
     * @type {Array<*>}
     */
    protected instructions: Array<any>;
    /**
     * @protected
     * @type {Array<number>}
     */
    protected coordinates: Array<number>;
    /**
     * @private
     * @type {import("../../coordinate.js").Coordinate}
     */
    private tmpCoordinate_;
    /**
     * @protected
     * @type {Array<*>}
     */
    protected hitDetectionInstructions: Array<any>;
    /**
     * @protected
     * @type {import("../canvas.js").FillStrokeState}
     */
    protected state: import("../canvas.js").FillStrokeState;
    /**
     * @protected
     * @param {Array<number>} dashArray Dash array.
     * @return {Array<number>} Dash array with pixel ratio applied
     */
    protected applyPixelRatio(dashArray: Array<number>): Array<number>;
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} stride Stride.
     * @protected
     * @return {number} My end
     */
    protected appendFlatPointCoordinates(flatCoordinates: Array<number>, stride: number): number;
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {number} end End.
     * @param {number} stride Stride.
     * @param {boolean} closed Last input coordinate equals first.
     * @param {boolean} skipFirst Skip first coordinate.
     * @protected
     * @return {number} My end.
     */
    protected appendFlatLineCoordinates(flatCoordinates: Array<number>, offset: number, end: number, stride: number, closed: boolean, skipFirst: boolean): number;
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {Array<number>} ends Ends.
     * @param {number} stride Stride.
     * @param {Array<number>} builderEnds Builder ends.
     * @return {number} Offset.
     */
    drawCustomCoordinates_(flatCoordinates: Array<number>, offset: number, ends: Array<number>, stride: number, builderEnds: Array<number>): number;
    /**
     * @protected
     * @param {import("../../geom/Geometry").default|import("../Feature.js").default} geometry The geometry.
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @param {number} index Render order index
     */
    protected beginGeometry(geometry: import("../../geom/Geometry").default | import("../Feature.js").default, feature: import("../../Feature.js").FeatureLike, index: number): void;
    /**
     * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
     */
    finish(): import("../canvas.js").SerializableInstructions;
    /**
     * Reverse the hit detection instructions.
     */
    reverseHitDetectionInstructions(): void;
    /**
     * @param {import("../../style/Fill.js").default} fillStyle Fill style.
     * @param {import('../canvas.js').FillStrokeState} [state] State.
     * @return {import('../canvas.js').FillStrokeState} State.
     */
    fillStyleToState(fillStyle: import("../../style/Fill.js").default, state?: import("../canvas.js").FillStrokeState): import("../canvas.js").FillStrokeState;
    /**
     * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
     * @param {import("../canvas.js").FillStrokeState} state State.
     * @return {import("../canvas.js").FillStrokeState} State.
     */
    strokeStyleToState(strokeStyle: import("../../style/Stroke.js").default, state?: import("../canvas.js").FillStrokeState): import("../canvas.js").FillStrokeState;
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     * @return {Array<*>} Fill instruction.
     */
    createFill(state: import("../canvas.js").FillStrokeState): Array<any>;
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     */
    applyStroke(state: import("../canvas.js").FillStrokeState): void;
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     * @return {Array<*>} Stroke instruction.
     */
    createStroke(state: import("../canvas.js").FillStrokeState): Array<any>;
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState):Array<*>} createFill Create fill.
     */
    updateFillStyle(state: import("../canvas.js").FillStrokeState, createFill: (this: CanvasBuilder, arg1: import("../canvas.js").FillStrokeState) => Array<any>): void;
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState): void} applyStroke Apply stroke.
     */
    updateStrokeStyle(state: import("../canvas.js").FillStrokeState, applyStroke: (this: CanvasBuilder, arg1: import("../canvas.js").FillStrokeState) => void): void;
    /**
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     */
    endGeometry(feature: import("../../Feature.js").FeatureLike): void;
    /**
     * Get the buffered rendering extent.  Rendering will be clipped to the extent
     * provided to the constructor.  To account for symbolizers that may intersect
     * this extent, we calculate a buffered extent (e.g. based on stroke width).
     * @return {import("../../extent.js").Extent} The buffered rendering extent.
     * @protected
     */
    protected getBufferedMaxExtent(): import("../../extent.js").Extent;
}
import VectorContext from '../VectorContext.js';
//# sourceMappingURL=Builder.d.ts.map