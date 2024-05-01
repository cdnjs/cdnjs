/**
 * @const
 * @type {{left: 0, center: 0.5, right: 1, top: 0, middle: 0.5, hanging: 0.2, alphabetic: 0.8, ideographic: 0.8, bottom: 1}}
 */
export const TEXT_ALIGN: {
    left: 0;
    center: 0.5;
    right: 1;
    top: 0;
    middle: 0.5;
    hanging: 0.2;
    alphabetic: 0.8;
    ideographic: 0.8;
    bottom: 1;
};
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
     * @type {import('../../style/Style.js').DeclutterMode}
     */
    declutterMode_: import('../../style/Style.js').DeclutterMode;
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
import CanvasBuilder from './Builder.js';
//# sourceMappingURL=TextBuilder.d.ts.map