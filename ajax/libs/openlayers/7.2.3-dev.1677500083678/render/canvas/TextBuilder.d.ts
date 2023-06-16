export type TEXT_ALIGN = number;
export namespace TEXT_ALIGN {
    const left: number;
    const end: number;
    const center: number;
    const right: number;
    const start: number;
    const top: number;
    const middle: number;
    const hanging: number;
    const alphabetic: number;
    const ideographic: number;
    const bottom: number;
}
export default CanvasTextBuilder;
declare class CanvasTextBuilder extends CanvasBuilder {
    /**
     * @private
     * @type {Array<HTMLCanvasElement>}
     */
    private labels_;
    /**
     * @private
     * @type {string|Array<string>}
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
     * @param {Object} [sharedData] Shared data.
     */
    setTextStyle(textStyle: import("../../style/Text.js").default, sharedData?: any): void;
}
import CanvasBuilder from "./Builder.js";
//# sourceMappingURL=TextBuilder.d.ts.map