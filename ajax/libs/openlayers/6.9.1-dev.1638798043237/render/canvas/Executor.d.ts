export default Executor;
export type BBox = {
    /**
     * Minimal x.
     */
    minX: number;
    /**
     * Minimal y.
     */
    minY: number;
    /**
     * Maximal x.
     */
    maxX: number;
    /**
     * Maximal y
     */
    maxY: number;
    /**
     * Value.
     */
    value: any;
};
export type ImageOrLabelDimensions = {
    /**
     * DrawImageX.
     */
    drawImageX: number;
    /**
     * DrawImageY.
     */
    drawImageY: number;
    /**
     * DrawImageW.
     */
    drawImageW: number;
    /**
     * DrawImageH.
     */
    drawImageH: number;
    /**
     * OriginX.
     */
    originX: number;
    /**
     * OriginY.
     */
    originY: number;
    /**
     * Scale.
     */
    scale: number[];
    /**
     * DeclutterBox.
     */
    declutterBox: BBox;
    /**
     * CanvasTransform.
     */
    canvasTransform: number[];
};
export type ReplayImageOrLabelArgs = {
    0: CanvasRenderingContext2D;
    1: number;
    2: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | import("../canvas.js").Label;
    3: ImageOrLabelDimensions;
    4: number;
    5: any[];
    6: any[];
};
export type FeatureCallback<T> = (arg0: import("../../Feature.js").default<import("../../geom/Geometry.js").default> | import("../Feature.js").default, arg1: import("../../geom/SimpleGeometry.js").default) => T;
declare class Executor {
    /**
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     * @param {boolean} overlaps The replay can have overlapping geometries.
     * @param {import("../canvas.js").SerializableInstructions} instructions The serializable instructions
     */
    constructor(resolution: number, pixelRatio: number, overlaps: boolean, instructions: import("../canvas.js").SerializableInstructions);
    /**
     * @protected
     * @type {boolean}
     */
    protected overlaps: boolean;
    /**
     * @protected
     * @type {number}
     */
    protected pixelRatio: number;
    /**
     * @protected
     * @const
     * @type {number}
     */
    protected resolution: number;
    /**
     * @private
     * @type {boolean}
     */
    private alignFill_;
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
     * @type {!Object<number,import("../../coordinate.js").Coordinate|Array<import("../../coordinate.js").Coordinate>|Array<Array<import("../../coordinate.js").Coordinate>>>}
     */
    private coordinateCache_;
    /**
     * @private
     * @type {!import("../../transform.js").Transform}
     */
    private renderedTransform_;
    /**
     * @protected
     * @type {Array<*>}
     */
    protected hitDetectionInstructions: Array<any>;
    /**
     * @private
     * @type {Array<number>}
     */
    private pixelCoordinates_;
    /**
     * @private
     * @type {number}
     */
    private viewRotation_;
    /**
     * @type {!Object<string, import("../canvas.js").FillState>}
     */
    fillStates: {
        [x: string]: import("../canvas.js").FillState;
    };
    /**
     * @type {!Object<string, import("../canvas.js").StrokeState>}
     */
    strokeStates: {
        [x: string]: import("../canvas.js").StrokeState;
    };
    /**
     * @type {!Object<string, import("../canvas.js").TextState>}
     */
    textStates: {
        [x: string]: import("../canvas.js").TextState;
    };
    /**
     * @private
     * @type {Object<string, Object<string, number>>}
     */
    private widths_;
    /**
     * @private
     * @type {Object<string, import("../canvas.js").Label>}
     */
    private labels_;
    /**
     * @param {string} text Text.
     * @param {string} textKey Text style key.
     * @param {string} fillKey Fill style key.
     * @param {string} strokeKey Stroke style key.
     * @return {import("../canvas.js").Label} Label.
     */
    createLabel(text: string, textKey: string, fillKey: string, strokeKey: string): import("../canvas.js").Label;
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../coordinate.js").Coordinate} p1 1st point of the background box.
     * @param {import("../../coordinate.js").Coordinate} p2 2nd point of the background box.
     * @param {import("../../coordinate.js").Coordinate} p3 3rd point of the background box.
     * @param {import("../../coordinate.js").Coordinate} p4 4th point of the background box.
     * @param {Array<*>} fillInstruction Fill instruction.
     * @param {Array<*>} strokeInstruction Stroke instruction.
     */
    replayTextBackground_(context: CanvasRenderingContext2D, p1: number[], p2: number[], p3: number[], p4: number[], fillInstruction: any[], strokeInstruction: any[]): void;
    /**
     * @private
     * @param {number} sheetWidth Width of the sprite sheet.
     * @param {number} sheetHeight Height of the sprite sheet.
     * @param {number} centerX X.
     * @param {number} centerY Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * @param {number} anchorX Anchor X.
     * @param {number} anchorY Anchor Y.
     * @param {number} originX Origin X.
     * @param {number} originY Origin Y.
     * @param {number} rotation Rotation.
     * @param {import("../../size.js").Size} scale Scale.
     * @param {boolean} snapToPixel Snap to pixel.
     * @param {Array<number>} padding Padding.
     * @param {boolean} fillStroke Background fill or stroke.
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @return {ImageOrLabelDimensions} Dimensions for positioning and decluttering the image or label.
     */
    private calculateImageOrLabelDimensions_;
    /**
     * @private
     * @param {CanvasRenderingContext2D} context Context.
     * @param {number} contextScale Scale of the context.
     * @param {import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} imageOrLabel Image.
     * @param {ImageOrLabelDimensions} dimensions Dimensions.
     * @param {number} opacity Opacity.
     * @param {Array<*>} fillInstruction Fill instruction.
     * @param {Array<*>} strokeInstruction Stroke instruction.
     * @return {boolean} The image or label was rendered.
     */
    private replayImageOrLabel_;
    /**
     * @private
     * @param {CanvasRenderingContext2D} context Context.
     */
    private fill_;
    /**
     * @private
     * @param {CanvasRenderingContext2D} context Context.
     * @param {Array<*>} instruction Instruction.
     */
    private setStrokeStyle_;
    /**
     * @private
     * @param {string} text The text to draw.
     * @param {string} textKey The key of the text state.
     * @param {string} strokeKey The key for the stroke state.
     * @param {string} fillKey The key for the fill state.
     * @return {{label: import("../canvas.js").Label, anchorX: number, anchorY: number}} The text image and its anchor.
     */
    private drawLabelWithPointPlacement_;
    /**
     * @private
     * @param {CanvasRenderingContext2D} context Context.
     * @param {number} contextScale Scale of the context.
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {Array<*>} instructions Instructions array.
     * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
     * @param {FeatureCallback<T>} [opt_featureCallback] Feature callback.
     * @param {import("../../extent.js").Extent} [opt_hitExtent] Only check
     *     features that intersect this extent.
     * @param {import("rbush").default} [opt_declutterTree] Declutter tree.
     * @return {T|undefined} Callback result.
     * @template T
     */
    private execute_;
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {number} contextScale Scale of the context.
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {number} viewRotation View rotation.
     * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
     * @param {import("rbush").default} [opt_declutterTree] Declutter tree.
     */
    execute(context: CanvasRenderingContext2D, contextScale: number, transform: number[], viewRotation: number, snapToPixel: boolean, opt_declutterTree?: any): void;
    /**
     * @param {CanvasRenderingContext2D} context Context.
     * @param {import("../../transform.js").Transform} transform Transform.
     * @param {number} viewRotation View rotation.
     * @param {FeatureCallback<T>} [opt_featureCallback] Feature callback.
     * @param {import("../../extent.js").Extent} [opt_hitExtent] Only check
     *     features that intersect this extent.
     * @return {T|undefined} Callback result.
     * @template T
     */
    executeHitDetection<T>(context: CanvasRenderingContext2D, transform: number[], viewRotation: number, opt_featureCallback?: ((arg0: import("../../Feature.js").default<import("../../geom/Geometry.js").default> | import("../Feature.js").default, arg1: import("../../geom/SimpleGeometry.js").default) => T) | undefined, opt_hitExtent?: number[] | undefined): T | undefined;
}
//# sourceMappingURL=Executor.d.ts.map