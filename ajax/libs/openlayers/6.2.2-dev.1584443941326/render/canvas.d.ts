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
 * @returns {number} The text width.
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
 * @param {number} scale Scale.
 */
export function drawImageOrLabel(context: CanvasRenderingContext2D, transform: number[], opacity: number, labelOrImage: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | Label, originX: number, originY: number, w: number, h: number, x: number, y: number, scale: number): void;
/**
 * @typedef {Object} FillState
 * @property {import("../colorlike.js").ColorLike} fillStyle
 */
/**
 * @typedef Label
 * @property {number} width
 * @property {number} height
 * @property {Array<string|number>} contextInstructions
 */
/**
 * @typedef {Object} FillStrokeState
 * @property {import("../colorlike.js").ColorLike} [currentFillStyle]
 * @property {import("../colorlike.js").ColorLike} [currentStrokeStyle]
 * @property {CanvasLineCap} [currentLineCap]
 * @property {Array<number>} currentLineDash
 * @property {number} [currentLineDashOffset]
 * @property {CanvasLineJoin} [currentLineJoin]
 * @property {number} [currentLineWidth]
 * @property {number} [currentMiterLimit]
 * @property {number} [lastStroke]
 * @property {import("../colorlike.js").ColorLike} [fillStyle]
 * @property {import("../colorlike.js").ColorLike} [strokeStyle]
 * @property {CanvasLineCap} [lineCap]
 * @property {Array<number>} lineDash
 * @property {number} [lineDashOffset]
 * @property {CanvasLineJoin} [lineJoin]
 * @property {number} [lineWidth]
 * @property {number} [miterLimit]
 */
/**
 * @typedef {Object} StrokeState
 * @property {CanvasLineCap} lineCap
 * @property {Array<number>} lineDash
 * @property {number} lineDashOffset
 * @property {CanvasLineJoin} lineJoin
 * @property {number} lineWidth
 * @property {number} miterLimit
 * @property {import("../colorlike.js").ColorLike} strokeStyle
 */
/**
 * @typedef {Object} TextState
 * @property {string} font
 * @property {string} [textAlign]
 * @property {string} textBaseline
 * @property {string} [placement]
 * @property {number} [maxAngle]
 * @property {boolean} [overflow]
 * @property {import("../style/Fill.js").default} [backgroundFill]
 * @property {import("../style/Stroke.js").default} [backgroundStroke]
 * @property {number} [scale]
 * @property {Array<number>} [padding]
 */
/**
 * Container for decluttered replay instructions that need to be rendered or
 * omitted together, i.e. when styles render both an image and text, or for the
 * characters that form text along lines. The basic elements of this array are
 * `[minX, minY, maxX, maxY, count]`, where the first four entries are the
 * rendered extent of the group in pixel space. `count` is the number of styles
 * in the group, i.e. 2 when an image and a text are grouped, or 1 otherwise.
 * In addition to these four elements, declutter instruction arrays (i.e. the
 * arguments to {@link module:ol/render/canvas~drawImage} are appended to the array.
 * @typedef {Array<*>} DeclutterGroup
 */
/**
 * Declutter groups for support of multi geometries.
 * @typedef {Array<DeclutterGroup>} DeclutterGroups
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
 * entries, use {@link module:ol/structs/LRUCache#setSize}.
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
export function measureTextHeight(font: any): number;
export type FillState = {
    fillStyle: string | CanvasGradient | CanvasPattern;
};
export type Label = {
    width: number;
    height: number;
    contextInstructions: (string | number)[];
};
export type FillStrokeState = {
    currentFillStyle?: string | CanvasGradient | CanvasPattern;
    currentStrokeStyle?: string | CanvasGradient | CanvasPattern;
    currentLineCap?: CanvasLineCap;
    currentLineDash: number[];
    currentLineDashOffset?: number;
    currentLineJoin?: CanvasLineJoin;
    currentLineWidth?: number;
    currentMiterLimit?: number;
    lastStroke?: number;
    fillStyle?: string | CanvasGradient | CanvasPattern;
    strokeStyle?: string | CanvasGradient | CanvasPattern;
    lineCap?: CanvasLineCap;
    lineDash: number[];
    lineDashOffset?: number;
    lineJoin?: CanvasLineJoin;
    lineWidth?: number;
    miterLimit?: number;
};
export type StrokeState = {
    lineCap: CanvasLineCap;
    lineDash: number[];
    lineDashOffset: number;
    lineJoin: CanvasLineJoin;
    lineWidth: number;
    miterLimit: number;
    strokeStyle: string | CanvasGradient | CanvasPattern;
};
export type TextState = {
    font: string;
    textAlign?: string;
    textBaseline: string;
    placement?: string;
    maxAngle?: number;
    overflow?: boolean;
    backgroundFill?: import("../style/Fill.js").default;
    backgroundStroke?: import("../style/Stroke.js").default;
    scale?: number;
    padding?: number[];
};
/**
 * Container for decluttered replay instructions that need to be rendered or
 * omitted together, i.e. when styles render both an image and text, or for the
 * characters that form text along lines. The basic elements of this array are
 * `[minX, minY, maxX, maxY, count]`, where the first four entries are the
 * rendered extent of the group in pixel space. `count` is the number of styles
 * in the group, i.e. 2 when an image and a text are grouped, or 1 otherwise.
 * In addition to these four elements, declutter instruction arrays (i.e. the
 * arguments to {@link module:ol/render/canvas~drawImage} are appended to the array.
 */
export type DeclutterGroup = any[];
/**
 * Declutter groups for support of multi geometries.
 */
export type DeclutterGroups = any[][];
import BaseObject from "../Object.js";
//# sourceMappingURL=canvas.d.ts.map