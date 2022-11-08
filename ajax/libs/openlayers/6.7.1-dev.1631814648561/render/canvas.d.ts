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
 * @param {string} font Font to use for measuring.
 * @param {Array<string>} lines Lines to measure.
 * @param {Array<number>} widths Array will be populated with the widths of
 * each line.
 * @return {number} Width of the whole text.
 */
export function measureTextWidths(font: string, lines: string[], widths: number[]): number;
/**
 * @param {CanvasRenderingContext2D} context Context.
 * @param {number} rotation Rotation.
 * @param {number} offsetX X offset.
 * @param {number} offsetY Y offset.
 */
export function rotateAtOffset(context: CanvasRenderingContext2D, rotation: number, offsetX: number, offsetY: number): void;
/**
 * @param {CanvasRenderingContext2D} context Context.
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
export function drawImageOrLabel(context: CanvasRenderingContext2D, transform: number[] | null, opacity: number, labelOrImage: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | Label, originX: number, originY: number, w: number, h: number, x: number, y: number, scale: number[]): void;
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
 * @property {string} [textAlign] TextAlign.
 * @property {string} textBaseline TextBaseline.
 * @property {string} [placement] Placement.
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
 * @type {import("../colorlike.js").ColorLike}
 */
export const defaultFillStyle: import("../colorlike.js").ColorLike;
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
 * @type {string}
 */
export const defaultTextAlign: string;
/**
 * @const
 * @type {string}
 */
export const defaultTextBaseline: string;
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
 * The label cache for text rendering. To change the default cache size of 2048
 * entries, use {@link module:ol/structs/LRUCache~LRUCache#setSize cache.setSize()}.
 * Deprecated - there is no label cache any more.
 * @type {?}
 * @api
 * @deprecated
 */
export const labelCache: unknown;
/**
 * @type {!Object<string, number>}
 */
export const textHeights: {
    [x: string]: number;
};
export function registerFont(fontSpec: any): void;
export function measureTextHeight(fontSpec: any): number;
export type FillState = {
    /**
     * FillStyle.
     */
    fillStyle: string | CanvasGradient | CanvasPattern;
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
    contextInstructions: (string | number)[];
};
export type FillStrokeState = {
    /**
     * Current FillStyle.
     */
    currentFillStyle?: string | CanvasGradient | CanvasPattern;
    /**
     * Current StrokeStyle.
     */
    currentStrokeStyle?: string | CanvasGradient | CanvasPattern;
    /**
     * Current LineCap.
     */
    currentLineCap?: CanvasLineCap;
    /**
     * Current LineDash.
     */
    currentLineDash: number[];
    /**
     * Current LineDashOffset.
     */
    currentLineDashOffset?: number;
    /**
     * Current LineJoin.
     */
    currentLineJoin?: CanvasLineJoin;
    /**
     * Current LineWidth.
     */
    currentLineWidth?: number;
    /**
     * Current MiterLimit.
     */
    currentMiterLimit?: number;
    /**
     * Last stroke.
     */
    lastStroke?: number;
    /**
     * FillStyle.
     */
    fillStyle?: string | CanvasGradient | CanvasPattern;
    /**
     * StrokeStyle.
     */
    strokeStyle?: string | CanvasGradient | CanvasPattern;
    /**
     * LineCap.
     */
    lineCap?: CanvasLineCap;
    /**
     * LineDash.
     */
    lineDash: number[];
    /**
     * LineDashOffset.
     */
    lineDashOffset?: number;
    /**
     * LineJoin.
     */
    lineJoin?: CanvasLineJoin;
    /**
     * LineWidth.
     */
    lineWidth?: number;
    /**
     * MiterLimit.
     */
    miterLimit?: number;
};
export type StrokeState = {
    /**
     * LineCap.
     */
    lineCap: CanvasLineCap;
    /**
     * LineDash.
     */
    lineDash: number[];
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
    strokeStyle: string | CanvasGradient | CanvasPattern;
};
export type TextState = {
    /**
     * Font.
     */
    font: string;
    /**
     * TextAlign.
     */
    textAlign?: string;
    /**
     * TextBaseline.
     */
    textBaseline: string;
    /**
     * Placement.
     */
    placement?: string;
    /**
     * MaxAngle.
     */
    maxAngle?: number;
    /**
     * Overflow.
     */
    overflow?: boolean;
    /**
     * BackgroundFill.
     */
    backgroundFill?: import("../style/Fill.js").default;
    /**
     * BackgroundStroke.
     */
    backgroundStroke?: import("../style/Stroke.js").default;
    /**
     * Scale.
     */
    scale?: number[];
    /**
     * Padding.
     */
    padding?: number[];
};
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
        [x: string]: TextState;
    };
    /**
     * The fill states (decluttering).
     */
    fillStates?: {
        [x: string]: FillState;
    };
    /**
     * The stroke states (decluttering).
     */
    strokeStates?: {
        [x: string]: StrokeState;
    };
};
export type DeclutterImageWithText = {
    [x: number]: {
        0: CanvasRenderingContext2D;
        1: number;
        2: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | Label;
        3: import("./canvas/Executor.js").ImageOrLabelDimensions;
        4: number;
        5: any[];
        6: any[];
    };
};
import BaseObject from "../Object.js";
//# sourceMappingURL=canvas.d.ts.map