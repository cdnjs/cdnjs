/**
 * @param {string} font Font.
 * @param {string} text Text.
 * @return {number} Width.
 */
export function measureTextWidth(font: string, text: string): number;
/**
 * Measure text width using a cache.
 * @param {string} font The font.
 * @param {string} text The text to measure.
 * @param {Object<string, number>} cache A lookup of cached widths by text.
 * @return {number} The text width.
 */
export function measureAndCacheTextWidth(font: string, text: string, cache: {
    [x: string]: number;
}): number;
/**
 * @param {TextState} baseStyle Base style.
 * @param {Array<string>} chunks Text chunks to measure.
 * @return {{width: number, height: number, widths: Array<number>, heights: Array<number>, lineWidths: Array<number>}}} Text metrics.
 */
export function getTextDimensions(baseStyle: TextState, chunks: Array<string>): {
    width: number;
    height: number;
    widths: Array<number>;
    heights: Array<number>;
    lineWidths: Array<number>;
};
/**
 * @param {CanvasRenderingContext2D} context Context.
 * @param {number} rotation Rotation.
 * @param {number} offsetX X offset.
 * @param {number} offsetY Y offset.
 */
export function rotateAtOffset(context: CanvasRenderingContext2D, rotation: number, offsetX: number, offsetY: number): void;
/**
 * @param {CanvasRenderingContext2D|import("../render/canvas/ZIndexContext.js").ZIndexContextProxy} context Context.
 * @param {import("../transform.js").Transform|null} transform Transform.
 * @param {number} opacity Opacity.
 * @param {Label|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} labelOrImage Label.
 * @param {number} originX Origin X.
 * @param {number} originY Origin Y.
 * @param {number} w Width.
 * @param {number} h Height.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {import("../size.js").Size} scale Scale.
 */
export function drawImageOrLabel(context: CanvasRenderingContext2D | import("../render/canvas/ZIndexContext.js").ZIndexContextProxy, transform: import("../transform.js").Transform | null, opacity: number, labelOrImage: Label | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement, originX: number, originY: number, w: number, h: number, x: number, y: number, scale: import("../size.js").Size): void;
/**
 * @typedef {'Circle' | 'Image' | 'LineString' | 'Polygon' | 'Text' | 'Default'} BuilderType
 */
/**
 * @typedef {Object} FillState
 * @property {import("../colorlike.js").ColorLike} fillStyle FillStyle.
 */
/**
 * @typedef Label
 * @property {number} width Width.
 * @property {number} height Height.
 * @property {Array<string|number>} contextInstructions ContextInstructions.
 */
/**
 * @typedef {Object} FillStrokeState
 * @property {import("../colorlike.js").ColorLike} [currentFillStyle] Current FillStyle.
 * @property {import("../colorlike.js").ColorLike} [currentStrokeStyle] Current StrokeStyle.
 * @property {CanvasLineCap} [currentLineCap] Current LineCap.
 * @property {Array<number>} currentLineDash Current LineDash.
 * @property {number} [currentLineDashOffset] Current LineDashOffset.
 * @property {CanvasLineJoin} [currentLineJoin] Current LineJoin.
 * @property {number} [currentLineWidth] Current LineWidth.
 * @property {number} [currentMiterLimit] Current MiterLimit.
 * @property {number} [lastStroke] Last stroke.
 * @property {import("../colorlike.js").ColorLike} [fillStyle] FillStyle.
 * @property {import("../colorlike.js").ColorLike} [strokeStyle] StrokeStyle.
 * @property {CanvasLineCap} [lineCap] LineCap.
 * @property {Array<number>} lineDash LineDash.
 * @property {number} [lineDashOffset] LineDashOffset.
 * @property {CanvasLineJoin} [lineJoin] LineJoin.
 * @property {number} [lineWidth] LineWidth.
 * @property {number} [miterLimit] MiterLimit.
 * @property {number} [fillPatternScale] Fill pattern scale.
 */
/**
 * @typedef {Object} StrokeState
 * @property {CanvasLineCap} lineCap LineCap.
 * @property {Array<number>} lineDash LineDash.
 * @property {number} lineDashOffset LineDashOffset.
 * @property {CanvasLineJoin} lineJoin LineJoin.
 * @property {number} lineWidth LineWidth.
 * @property {number} miterLimit MiterLimit.
 * @property {import("../colorlike.js").ColorLike} strokeStyle StrokeStyle.
 */
/**
 * @typedef {Object} TextState
 * @property {string} font Font.
 * @property {CanvasTextAlign} [textAlign] TextAlign.
 * @property {number} [repeat] Repeat.
 * @property {import("../style/Text.js").TextJustify} [justify] Justify.
 * @property {CanvasTextBaseline} textBaseline TextBaseline.
 * @property {import("../style/Text.js").TextPlacement} [placement] Placement.
 * @property {number} [maxAngle] MaxAngle.
 * @property {boolean} [overflow] Overflow.
 * @property {import("../style/Fill.js").default} [backgroundFill] BackgroundFill.
 * @property {import("../style/Stroke.js").default} [backgroundStroke] BackgroundStroke.
 * @property {import("../size.js").Size} [scale] Scale.
 * @property {Array<number>} [padding] Padding.
 */
/**
 * @typedef {Object} SerializableInstructions
 * @property {Array<*>} instructions The rendering instructions.
 * @property {Array<*>} hitDetectionInstructions The rendering hit detection instructions.
 * @property {Array<number>} coordinates The array of all coordinates.
 * @property {!Object<string, TextState>} [textStates] The text states (decluttering).
 * @property {!Object<string, FillState>} [fillStates] The fill states (decluttering).
 * @property {!Object<string, StrokeState>} [strokeStates] The stroke states (decluttering).
 */
/**
 * @typedef {Object<number, import("./canvas/Executor.js").ReplayImageOrLabelArgs>} DeclutterImageWithText
 */
/**
 * @const
 * @type {string}
 */
export const defaultFont: string;
/**
 * @const
 * @type {string}
 */
export const defaultFillStyle: string;
/**
 * @const
 * @type {CanvasLineCap}
 */
export const defaultLineCap: CanvasLineCap;
/**
 * @const
 * @type {Array<number>}
 */
export const defaultLineDash: Array<number>;
/**
 * @const
 * @type {number}
 */
export const defaultLineDashOffset: number;
/**
 * @const
 * @type {CanvasLineJoin}
 */
export const defaultLineJoin: CanvasLineJoin;
/**
 * @const
 * @type {number}
 */
export const defaultMiterLimit: number;
/**
 * @const
 * @type {import("../colorlike.js").ColorLike}
 */
export const defaultStrokeStyle: import("../colorlike.js").ColorLike;
/**
 * @const
 * @type {CanvasTextAlign}
 */
export const defaultTextAlign: CanvasTextAlign;
/**
 * @const
 * @type {CanvasTextBaseline}
 */
export const defaultTextBaseline: CanvasTextBaseline;
/**
 * @const
 * @type {Array<number>}
 */
export const defaultPadding: Array<number>;
/**
 * @const
 * @type {number}
 */
export const defaultLineWidth: number;
/**
 * @type {BaseObject}
 */
export const checkedFonts: BaseObject;
/**
 * @type {!Object<string, number>}
 */
export const textHeights: {
    [x: string]: number;
};
export function registerFont(fontSpec: any): void;
export function measureTextHeight(fontSpec: any): number;
export type BuilderType = "Circle" | "Image" | "LineString" | "Polygon" | "Text" | "Default";
export type FillState = {
    /**
     * FillStyle.
     */
    fillStyle: import("../colorlike.js").ColorLike;
};
export type Label = {
    /**
     * Width.
     */
    width: number;
    /**
     * Height.
     */
    height: number;
    /**
     * ContextInstructions.
     */
    contextInstructions: Array<string | number>;
};
export type FillStrokeState = {
    /**
     * Current FillStyle.
     */
    currentFillStyle?: import("../colorlike.js").ColorLike | undefined;
    /**
     * Current StrokeStyle.
     */
    currentStrokeStyle?: import("../colorlike.js").ColorLike | undefined;
    /**
     * Current LineCap.
     */
    currentLineCap?: CanvasLineCap | undefined;
    /**
     * Current LineDash.
     */
    currentLineDash: Array<number>;
    /**
     * Current LineDashOffset.
     */
    currentLineDashOffset?: number | undefined;
    /**
     * Current LineJoin.
     */
    currentLineJoin?: CanvasLineJoin | undefined;
    /**
     * Current LineWidth.
     */
    currentLineWidth?: number | undefined;
    /**
     * Current MiterLimit.
     */
    currentMiterLimit?: number | undefined;
    /**
     * Last stroke.
     */
    lastStroke?: number | undefined;
    /**
     * FillStyle.
     */
    fillStyle?: import("../colorlike.js").ColorLike | undefined;
    /**
     * StrokeStyle.
     */
    strokeStyle?: import("../colorlike.js").ColorLike | undefined;
    /**
     * LineCap.
     */
    lineCap?: CanvasLineCap | undefined;
    /**
     * LineDash.
     */
    lineDash: Array<number>;
    /**
     * LineDashOffset.
     */
    lineDashOffset?: number | undefined;
    /**
     * LineJoin.
     */
    lineJoin?: CanvasLineJoin | undefined;
    /**
     * LineWidth.
     */
    lineWidth?: number | undefined;
    /**
     * MiterLimit.
     */
    miterLimit?: number | undefined;
    /**
     * Fill pattern scale.
     */
    fillPatternScale?: number | undefined;
};
export type StrokeState = {
    /**
     * LineCap.
     */
    lineCap: CanvasLineCap;
    /**
     * LineDash.
     */
    lineDash: Array<number>;
    /**
     * LineDashOffset.
     */
    lineDashOffset: number;
    /**
     * LineJoin.
     */
    lineJoin: CanvasLineJoin;
    /**
     * LineWidth.
     */
    lineWidth: number;
    /**
     * MiterLimit.
     */
    miterLimit: number;
    /**
     * StrokeStyle.
     */
    strokeStyle: import("../colorlike.js").ColorLike;
};
export type TextState = {
    /**
     * Font.
     */
    font: string;
    /**
     * TextAlign.
     */
    textAlign?: CanvasTextAlign | undefined;
    /**
     * Repeat.
     */
    repeat?: number | undefined;
    /**
     * Justify.
     */
    justify?: import("../style/Text.js").TextJustify | undefined;
    /**
     * TextBaseline.
     */
    textBaseline: CanvasTextBaseline;
    /**
     * Placement.
     */
    placement?: import("../style/Text.js").TextPlacement | undefined;
    /**
     * MaxAngle.
     */
    maxAngle?: number | undefined;
    /**
     * Overflow.
     */
    overflow?: boolean | undefined;
    /**
     * BackgroundFill.
     */
    backgroundFill?: import("../style/Fill.js").default | undefined;
    /**
     * BackgroundStroke.
     */
    backgroundStroke?: import("../style/Stroke.js").default | undefined;
    /**
     * Scale.
     */
    scale?: import("../size.js").Size | undefined;
    /**
     * Padding.
     */
    padding?: number[] | undefined;
};
export type SerializableInstructions = {
    /**
     * The rendering instructions.
     */
    instructions: Array<any>;
    /**
     * The rendering hit detection instructions.
     */
    hitDetectionInstructions: Array<any>;
    /**
     * The array of all coordinates.
     */
    coordinates: Array<number>;
    /**
     * The text states (decluttering).
     */
    textStates?: {
        [x: string]: TextState;
    } | undefined;
    /**
     * The fill states (decluttering).
     */
    fillStates?: {
        [x: string]: FillState;
    } | undefined;
    /**
     * The stroke states (decluttering).
     */
    strokeStates?: {
        [x: string]: StrokeState;
    } | undefined;
};
export type DeclutterImageWithText = {
    [x: number]: import("./canvas/Executor.js").ReplayImageOrLabelArgs;
};
import BaseObject from '../Object.js';
//# sourceMappingURL=canvas.d.ts.map