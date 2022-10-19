export type TEXT_ALIGN = number;
export namespace TEXT_ALIGN {
    export const left: number;
    export const end: number;
    export const center: number;
    export const right: number;
    export const start: number;
    export const top: number;
    export const middle: number;
    export const hanging: number;
    export const alphabetic: number;
    export const ideographic: number;
    export const bottom: number;
}
export default CanvasTextBuilder;
declare class CanvasTextBuilder extends CanvasBuilder {
    /**
     * @param {number} tolerance Tolerance.
     * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
     * @param {number} resolution Resolution.
     * @param {number} pixelRatio Pixel ratio.
     */
    constructor(tolerance: number, maxExtent: number[], resolution: number, pixelRatio: number);
    /**
     * @private
     * @type {Array<HTMLCanvasElement>}
     */
    private labels_;
    /**
     * @private
     * @type {string}
     */
    private text_;
    /**
     * @private
     * @type {number}
     */
    private textOffsetX_;
    /**
     * @private
     * @type {number}
     */
    private textOffsetY_;
    /**
     * @private
     * @type {boolean|undefined}
     */
    private textRotateWithView_;
    /**
     * @private
     * @type {number}
     */
    private textRotation_;
    /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */
    private textFillState_;
    /**
     * @type {!Object<string, import("../canvas.js").FillState>}
     */
    fillStates: {
        [x: string]: import("../canvas.js").FillState;
    };
    /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */
    private textStrokeState_;
    /**
     * @type {!Object<string, import("../canvas.js").StrokeState>}
     */
    strokeStates: {
        [x: string]: import("../canvas.js").StrokeState;
    };
    /**
     * @private
     * @type {import("../canvas.js").TextState}
     */
    private textState_;
    /**
     * @type {!Object<string, import("../canvas.js").TextState>}
     */
    textStates: {
        [x: string]: import("../canvas.js").TextState;
    };
    /**
     * @private
     * @type {string}
     */
    private textKey_;
    /**
     * @private
     * @type {string}
     */
    private fillKey_;
    /**
     * @private
     * @type {string}
     */
    private strokeKey_;
    /**
     * Data shared with an image builder for combined decluttering.
     * @private
     * @type {import("../canvas.js").DeclutterImageWithText}
     */
    private declutterImageWithText_;
    /**
     * @private
     */
    private saveTextStates_;
    /**
     * @private
     * @param {number} begin Begin.
     * @param {number} end End.
     */
    private drawChars_;
    /**
     * @param {import("../../style/Text.js").default} textStyle Text style.
     * @param {Object} [opt_sharedData] Shared data.
     */
    setTextStyle(textStyle: import("../../style/Text.js").default, opt_sharedData?: any): void;
}
import CanvasBuilder from "./Builder.js";
//# sourceMappingURL=TextBuilder.d.ts.map