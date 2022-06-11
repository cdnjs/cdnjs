export default CanvasBuilder;
export type SerializableInstructions = {
    /**
     * The rendering instructions.
     */
    instructions: any[];
    /**
     * The rendering hit detection instructions.
     */
    hitDetectionInstructions: any[];
    /**
     * The array of all coordinates.
     */
    coordinates: number[];
    /**
     * The text states (decluttering).
     */
    textStates?: {
        [x: string]: import("../canvas.js").TextState;
    };
    /**
     * The fill states (decluttering).
     */
    fillStates?: {
        [x: string]: import("../canvas.js").FillState;
    };
    /**
     * The stroke states (decluttering).
     */
    strokeStates?: {
        [x: string]: import("../canvas.js").StrokeState;
    };
};
/**
 * @typedef {Object} SerializableInstructions
 * @property {Array<*>} instructions The rendering instructions.
 * @property {Array<*>} hitDetectionInstructions The rendering hit detection instructions.
 * @property {Array<number>} coordinates The array of all coordinates.
 * @property {!Object<string, import("../canvas.js").TextState>} [textStates] The text states (decluttering).
 * @property {!Object<string, import("../canvas.js").FillState>} [fillStates] The fill states (decluttering).
 * @property {!Object<string, import("../canvas.js").StrokeState>} [strokeStates] The stroke states (decluttering).
 */
declare class CanvasBuilder extends VectorContext {
    /**
     * @param {number} tolerance Tolerance.
     * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     */
    constructor(tolerance: number, maxExtent: number[], resolution: number, pixelRatio: number);
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
    protected applyPixelRatio(dashArray: number[]): number[];
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
    protected appendFlatCoordinates(flatCoordinates: number[], offset: number, end: number, stride: number, closed: boolean, skipFirst: boolean): number;
    /**
     * @param {Array<number>} flatCoordinates Flat coordinates.
     * @param {number} offset Offset.
     * @param {Array<number>} ends Ends.
     * @param {number} stride Stride.
     * @param {Array<number>} builderEnds Builder ends.
     * @return {number} Offset.
     */
    drawCustomCoordinates_(flatCoordinates: number[], offset: number, ends: number[], stride: number, builderEnds: number[]): number;
    /**
     * @inheritDoc.
     */
    drawCustom(geometry: any, feature: any, renderer: any): void;
    /**
     * @protected
     * @param {import("../../geom/Geometry").default|import("../Feature.js").default} geometry The geometry.
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     */
    protected beginGeometry(geometry: import("../../geom/Geometry.js").default | import("../Feature.js").default, feature: import("../Feature.js").default | import("../../Feature.js").default<any>): void;
    /**
     * @return {SerializableInstructions} the serializable instructions.
     */
    finish(): SerializableInstructions;
    /**
     * Reverse the hit detection instructions.
     */
    reverseHitDetectionInstructions(): void;
    /**
     * @inheritDoc
     */
    setFillStrokeStyle(fillStyle: any, strokeStyle: any): void;
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     * @return {Array<*>} Fill instruction.
     */
    createFill(state: import("../canvas.js").FillStrokeState): any[];
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     */
    applyStroke(state: import("../canvas.js").FillStrokeState): void;
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     * @return {Array<*>} Stroke instruction.
     */
    createStroke(state: import("../canvas.js").FillStrokeState): any[];
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState):Array<*>} createFill Create fill.
     */
    updateFillStyle(state: import("../canvas.js").FillStrokeState, createFill: (this: CanvasBuilder, arg1: import("../canvas.js").FillStrokeState) => any[]): void;
    /**
     * @param {import("../canvas.js").FillStrokeState} state State.
     * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState): void} applyStroke Apply stroke.
     */
    updateStrokeStyle(state: import("../canvas.js").FillStrokeState, applyStroke: (this: CanvasBuilder, arg1: import("../canvas.js").FillStrokeState) => void): void;
    /**
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     */
    endGeometry(feature: import("../Feature.js").default | import("../../Feature.js").default<any>): void;
    /**
     * Get the buffered rendering extent.  Rendering will be clipped to the extent
     * provided to the constructor.  To account for symbolizers that may intersect
     * this extent, we calculate a buffered extent (e.g. based on stroke width).
     * @return {import("../../extent.js").Extent} The buffered rendering extent.
     * @protected
     */
    protected getBufferedMaxExtent(): number[];
}
import VectorContext from "../VectorContext.js";
//# sourceMappingURL=Builder.d.ts.map