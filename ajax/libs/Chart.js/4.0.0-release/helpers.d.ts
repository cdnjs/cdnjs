import { Color } from '@kurkle/color';
import { P as Point$1, f as ChartArea, e as ChartEvent, C as Chart, au as ChartMeta, b as PointElement, cn as TRBL, co as TRBLCorners, aZ as FontSpec, b9 as PointStyle, ck as Color$1, cp as RoundedRect } from './chunks/helpers.core.js';
export { cg as EasingFunction, cE as MergeOptions, cL as _capitalize, cI as _deprecated, cB as _elementsEqual, cP as _isClickEvent, cD as _merger, cH as _mergerIf, cJ as _splitKey, cz as callback, cC as clone, cM as defined, cA as each, cv as finiteOrDefault, ct as isArray, cq as isFinite, cN as isFunction, cs as isNullOrUndef, cu as isObject, cF as merge, cG as mergeIf, n as noop, cK as resolveObjectKey, cO as setsEqual, cy as toDimension, cx as toPercentage, cr as uid, cw as valueOrDefault } from './chunks/helpers.core.js';

declare function isPatternOrGradient(value: unknown): value is CanvasPattern | CanvasGradient;
declare function color(value: CanvasGradient): CanvasGradient;
declare function color(value: CanvasPattern): CanvasPattern;
declare function color(value: string | {
    r: number;
    g: number;
    b: number;
    a: number;
} | [number, number, number] | [number, number, number, number]): Color;
declare function getHoverColor(value: CanvasGradient): CanvasGradient;
declare function getHoverColor(value: CanvasPattern): CanvasPattern;
declare function getHoverColor(value: string): string;

/**
 * Note: typedefs are auto-exported, so use a made-up `canvas` namespace where
 * necessary to avoid duplicates with `export * from './helpers`; see
 * https://github.com/microsoft/TypeScript/issues/46011
 */
type Point = Point$1;

/**
 * Binary search
 * @param table - the table search. must be sorted!
 * @param value - value to find
 * @param cmp
 * @private
 */
declare function _lookup(table: number[], value: number, cmp?: (value: number) => boolean): {
    lo: number;
    hi: number;
};
declare function _lookup<T>(table: T[], value: number, cmp: (value: number) => boolean): {
    lo: number;
    hi: number;
};
/**
 * Binary search
 * @param table - the table search. must be sorted!
 * @param key - property name for the value in each entry
 * @param value - value to find
 * @param last - lookup last index
 * @private
 */
declare const _lookupByKey: (table: Record<string, number>[], key: string, value: number, last?: boolean) => {
    lo: number;
    hi: number;
};
/**
 * Reverse binary search
 * @param table - the table search. must be sorted!
 * @param key - property name for the value in each entry
 * @param value - value to find
 * @private
 */
declare const _rlookupByKey: (table: Record<string, number>[], key: string, value: number) => {
    lo: number;
    hi: number;
};
/**
 * Return subset of `values` between `min` and `max` inclusive.
 * Values are assumed to be in sorted order.
 * @param values - sorted array of values
 * @param min - min value
 * @param max - max value
 */
declare function _filterBetween(values: number[], min: number, max: number): number[];
interface ArrayListener<T> {
    _onDataPush?(...item: T[]): void;
    _onDataPop?(): void;
    _onDataShift?(): void;
    _onDataSplice?(index: number, deleteCount: number, ...items: T[]): void;
    _onDataUnshift?(...item: T[]): void;
}
/**
 * Hooks the array methods that add or remove values ('push', pop', 'shift', 'splice',
 * 'unshift') and notify the listener AFTER the array has been altered. Listeners are
 * called on the '_onData*' callbacks (e.g. _onDataPush, etc.) with same arguments.
 */
declare function listenArrayEvents<T>(array: T[], listener: ArrayListener<T>): void;
/**
 * Removes the given array event listener and cleanup extra attached properties (such as
 * the _chartjs stub and overridden methods) if array doesn't have any more listeners.
 */
declare function unlistenArrayEvents<T>(array: T[], listener: ArrayListener<T>): void;
/**
 * @param items
 */
declare function _arrayUnique<T>(items: T[]): T[];

interface SplinePoint {
    x: number;
    y: number;
    skip?: boolean;
    cp1x?: number;
    cp1y?: number;
    cp2x?: number;
    cp2y?: number;
}
declare function splineCurve(firstPoint: SplinePoint, middlePoint: SplinePoint, afterPoint: SplinePoint, t: number): {
    previous: SplinePoint;
    next: SplinePoint;
};
/**
 * This function calculates Bézier control points in a similar way than |splineCurve|,
 * but preserves monotonicity of the provided data and ensures no local extremums are added
 * between the dataset discrete points due to the interpolation.
 * See : https://en.wikipedia.org/wiki/Monotone_cubic_interpolation
 */
declare function splineCurveMonotone(points: SplinePoint[], indexAxis?: 'x' | 'y'): void;
/**
 * @private
 */
declare function _updateBezierControlPoints(points: SplinePoint[], options: any, area: ChartArea, loop: boolean, indexAxis: 'x' | 'y'): void;

/**
 * Note: typedefs are auto-exported, so use a made-up `dom` namespace where
 * necessary to avoid duplicates with `export * from './helpers`; see
 * https://github.com/microsoft/TypeScript/issues/46011
 * @typedef { import("../core/core.controller").default } dom.Chart
 * @typedef { import('../../types').ChartEvent } ChartEvent
 */
/**
 * @private
 */
declare function _isDomSupported(): boolean;
/**
 * @private
 */
declare function _getParentNode(domNode: HTMLCanvasElement): HTMLCanvasElement;
declare function getStyle(el: HTMLElement, property: string): string;
/**
 * Gets an event's x, y coordinates, relative to the chart area
 * @param event
 * @param chart
 * @returns x and y coordinates of the event
 */
declare function getRelativePosition(event: Event | ChartEvent | TouchEvent | MouseEvent, chart: Chart): {
    x: number;
    y: number;
};
declare function getMaximumSize(canvas: HTMLCanvasElement, bbWidth?: number, bbHeight?: number, aspectRatio?: number): {
    width: number;
    height: number;
};
/**
 * @param chart
 * @param forceRatio
 * @param forceStyle
 * @returns True if the canvas context size or transformation has changed.
 */
declare function retinaScale(chart: Chart, forceRatio: number, forceStyle?: boolean): boolean | void;
/**
 * Detects support for options object argument in addEventListener.
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 * @private
 */
declare const supportsEventListenerOptions: boolean;
/**
 * The "used" size is the final value of a dimension property after all calculations have
 * been performed. This method uses the computed style of `element` but returns undefined
 * if the computed style is not expressed in pixels. That can happen in some cases where
 * `element` has a size relative to its parent and this last one is not yet displayed,
 * for example because of `display: none` on a parent node.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
 * @returns Size in pixels or undefined if unknown.
 */
declare function readUsedSize(element: HTMLElement, property: 'width' | 'height'): number | undefined;

declare function fontString(pixelSize: number, fontStyle: string, fontFamily: string): string;
/**
* Request animation polyfill
*/
declare const requestAnimFrame: (((callback: FrameRequestCallback) => number) & typeof requestAnimationFrame) | ((callback: any) => any);
/**
 * Throttles calling `fn` once per animation frame
 * Latest arguments are used on the actual call
 */
declare function throttled<TArgs extends Array<any>>(fn: (...args: TArgs) => void, thisArg: any): (...args: TArgs) => void;
/**
 * Debounces calling `fn` for `delay` ms
 */
declare function debounce<TArgs extends Array<any>>(fn: (...args: TArgs) => void, delay: number): (...args: TArgs) => number;
/**
 * Converts 'start' to 'left', 'end' to 'right' and others to 'center'
 * @private
 */
declare const _toLeftRightCenter: (align: 'start' | 'end' | 'center') => "center" | "right" | "left";
/**
 * Returns `start`, `end` or `(start + end) / 2` depending on `align`. Defaults to `center`
 * @private
 */
declare const _alignStartEnd: (align: 'start' | 'end' | 'center', start: number, end: number) => number;
/**
 * Returns `left`, `right` or `(left + right) / 2` depending on `align`. Defaults to `left`
 * @private
 */
declare const _textX: (align: 'left' | 'right' | 'center', left: number, right: number, rtl: boolean) => number;
/**
 * Return start and count of visible points.
 * @private
 */
declare function _getStartAndCountOfVisiblePoints(meta: ChartMeta<'line' | 'scatter'>, points: PointElement[], animationsDisabled: boolean): {
    start: number;
    count: number;
};
/**
 * Checks if the scale ranges have changed.
 * @param {object} meta - dataset meta.
 * @returns {boolean}
 * @private
 */
declare function _scaleRangesChanged(meta: any): boolean;

/**
 * @private
 */
declare function _pointInLine(p1: Point$1, p2: Point$1, t: number, mode?: any): {
    x: number;
    y: number;
};
/**
 * @private
 */
declare function _steppedInterpolation(p1: Point$1, p2: Point$1, t: number, mode: 'middle' | 'after' | unknown): {
    x: number;
    y: number;
};
/**
 * @private
 */
declare function _bezierInterpolation(p1: SplinePoint, p2: SplinePoint, t: number, mode?: any): {
    x: number;
    y: number;
};

declare function formatNumber(num: number, locale: string, options?: Intl.NumberFormatOptions): string;

/**
 * @alias Chart.helpers.options
 * @namespace
 */
/**
 * Converts the given line height `value` in pixels for a specific font `size`.
 * @param value - The lineHeight to parse (eg. 1.6, '14px', '75%', '1.6em').
 * @param size - The font size (in pixels) used to resolve relative `value`.
 * @returns The effective line height in pixels (size * 1.2 if value is invalid).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
 * @since 2.7.0
 */
declare function toLineHeight(value: number | string, size: number): number;
/**
 * @param value
 * @param props
 */
declare function _readValueToProps<K extends string>(value: number | Record<K, number>, props: K[]): Record<K, number>;
declare function _readValueToProps<K extends string, T extends string>(value: number | Record<K & T, number>, props: Record<T, K>): Record<T, number>;
/**
 * Converts the given value into a TRBL object.
 * @param value - If a number, set the value to all TRBL component,
 *  else, if an object, use defined properties and sets undefined ones to 0.
 *  x / y are shorthands for same value for left/right and top/bottom.
 * @returns The padding values (top, right, bottom, left)
 * @since 3.0.0
 */
declare function toTRBL(value: number | TRBL | Point): Record<"top" | "right" | "bottom" | "left", number>;
/**
 * Converts the given value into a TRBL corners object (similar with css border-radius).
 * @param value - If a number, set the value to all TRBL corner components,
 *  else, if an object, use defined properties and sets undefined ones to 0.
 * @returns The TRBL corner values (topLeft, topRight, bottomLeft, bottomRight)
 * @since 3.0.0
 */
declare function toTRBLCorners(value: number | TRBLCorners): Record<"topLeft" | "topRight" | "bottomLeft" | "bottomRight", number>;
/**
 * Converts the given value into a padding object with pre-computed width/height.
 * @param value - If a number, set the value to all TRBL component,
 *  else, if an object, use defined properties and sets undefined ones to 0.
 *  x / y are shorthands for same value for left/right and top/bottom.
 * @returns The padding values (top, right, bottom, left, width, height)
 * @since 2.7.0
 */
declare function toPadding(value?: number | TRBL): ChartArea;
interface CanvasFontSpec extends FontSpec {
    string: string;
}
/**
 * Parses font options and returns the font object.
 * @param options - A object that contains font options to be parsed.
 * @param fallback - A object that contains fallback font options.
 * @return The font object.
 * @private
 */
declare function toFont(options: Partial<FontSpec>, fallback?: Partial<FontSpec>): {
    family: string;
    lineHeight: number;
    size: number;
    style: "normal" | "italic" | "oblique" | "initial" | "inherit";
    weight: string;
    string: string;
};
/**
 * Evaluates the given `inputs` sequentially and returns the first defined value.
 * @param inputs - An array of values, falling back to the last value.
 * @param context - If defined and the current value is a function, the value
 * is called with `context` as first argument and the result becomes the new input.
 * @param index - If defined and the current value is an array, the value
 * at `index` become the new input.
 * @param info - object to return information about resolution in
 * @param info.cacheable - Will be set to `false` if option is not cacheable.
 * @since 2.7.0
 */
declare function resolve(inputs: Array<unknown>, context?: object, index?: number, info?: {
    cacheable: boolean;
}): unknown;
/**
 * @param minmax
 * @param grace
 * @param beginAtZero
 * @private
 */
declare function _addGrace(minmax: {
    min: number;
    max: number;
}, grace: number | string, beginAtZero: boolean): {
    min: number;
    max: number;
};
/**
 * Create a context inheriting parentContext
 * @param parentContext
 * @param context
 * @returns
 */
declare function createContext<P extends T, T extends object>(parentContext: P, context: T): P extends null ? T : P & T;

/**
 * @alias Chart.helpers.math
 * @namespace
 */
declare const PI: number;
declare const TAU: number;
declare const PITAU: number;
declare const INFINITY: number;
declare const RAD_PER_DEG: number;
declare const HALF_PI: number;
declare const QUARTER_PI: number;
declare const TWO_THIRDS_PI: number;
declare const log10: (x: number) => number;
declare const sign: (x: number) => number;
declare function almostEquals(x: number, y: number, epsilon: number): boolean;
/**
 * Implementation of the nice number algorithm used in determining where axis labels will go
 */
declare function niceNum(range: number): number;
/**
 * Returns an array of factors sorted from 1 to sqrt(value)
 * @private
 */
declare function _factorize(value: number): number[];
declare function isNumber(n: unknown): n is number;
declare function almostWhole(x: number, epsilon: number): boolean;
/**
 * @private
 */
declare function _setMinAndMaxByKey(array: Record<string, number>[], target: {
    min: number;
    max: number;
}, property: string): void;
declare function toRadians(degrees: number): number;
declare function toDegrees(radians: number): number;
/**
 * Returns the number of decimal places
 * i.e. the number of digits after the decimal point, of the value of this Number.
 * @param x - A number.
 * @returns The number of decimal places.
 * @private
 */
declare function _decimalPlaces(x: number): number;
declare function getAngleFromPoint(centrePoint: Point$1, anglePoint: Point$1): {
    angle: number;
    distance: number;
};
declare function distanceBetweenPoints(pt1: Point$1, pt2: Point$1): number;
/**
 * Shortest distance between angles, in either direction.
 * @private
 */
declare function _angleDiff(a: number, b: number): number;
/**
 * Normalize angle to be between 0 and 2*PI
 * @private
 */
declare function _normalizeAngle(a: number): number;
/**
 * @private
 */
declare function _angleBetween(angle: number, start: number, end: number, sameAngleIsFullCircle?: boolean): boolean;
/**
 * Limit `value` between `min` and `max`
 * @param value
 * @param min
 * @param max
 * @private
 */
declare function _limitValue(value: number, min: number, max: number): number;
/**
 * @param {number} value
 * @private
 */
declare function _int16Range(value: number): number;
/**
 * @param value
 * @param start
 * @param end
 * @param [epsilon]
 * @private
 */
declare function _isBetween(value: number, start: number, end: number, epsilon?: number): boolean;

interface RTLAdapter {
    x(x: number): number;
    setWidth(w: number): void;
    textAlign(align: 'center' | 'left' | 'right'): 'center' | 'left' | 'right';
    xPlus(x: number, value: number): number;
    leftForLtr(x: number, itemWidth: number): number;
}
declare function getRtlAdapter(rtl: boolean, rectX: number, width: number): RTLAdapter;
declare function overrideTextDirection(ctx: CanvasRenderingContext2D, direction: 'ltr' | 'rtl'): void;
declare function restoreTextDirection(ctx: CanvasRenderingContext2D, original?: [string, string]): void;

declare function clearCanvas(canvas: HTMLCanvasElement, ctx?: CanvasRenderingContext2D): void;

declare function clipArea(ctx: CanvasRenderingContext2D, area: ChartArea): void;

declare function unclipArea(ctx: CanvasRenderingContext2D): void;

interface DrawPointOptions {
  pointStyle: PointStyle;
  rotation?: number;
  radius: number;
  borderWidth: number;
}

declare function drawPoint(ctx: CanvasRenderingContext2D, options: DrawPointOptions, x: number, y: number): void;

declare function drawPointLegend(ctx: CanvasRenderingContext2D, options: DrawPointOptions, x: number, y: number, w: number): void;

/**
 * Converts the given font object into a CSS font string.
 * @param font a font object
 * @return The CSS font string. See https://developer.mozilla.org/en-US/docs/Web/CSS/font
 */
declare function toFontString(font: { size: number; family: string; style?: string; weight?: string }): string | null;

interface RenderTextOpts {
  /**
   * The fill color of the text. If unset, the existing
   * fillStyle property of the canvas is unchanged.
   */
  color?: Color$1;

  /**
   * The width of the strikethrough / underline
   * @default 2
   */
  decorationWidth?: number;

  /**
   * The max width of the text in pixels
   */
  maxWidth?: number;

  /**
   * A rotation to be applied to the canvas
   * This is applied after the translation is applied
   */
  rotation?: number;

  /**
   * Apply a strikethrough effect to the text
   */
  strikethrough?: boolean;

  /**
   * The color of the text stroke. If unset, the existing
   * strokeStyle property of the context is unchanged
   */
  strokeColor?: Color$1;

  /**
   * The text stroke width. If unset, the existing
   * lineWidth property of the context is unchanged
   */
  strokeWidth?: number;

  /**
   * The text alignment to use. If unset, the existing
   * textAlign property of the context is unchanged
   */
  textAlign: CanvasTextAlign;

  /**
   * The text baseline to use. If unset, the existing
   * textBaseline property of the context is unchanged
   */
  textBaseline: CanvasTextBaseline;

  /**
   * If specified, a translation to apply to the context
   */
  translation?: [number, number];

  /**
   * Underline the text
   */
  underline?: boolean;
}

declare function renderText(
  ctx: CanvasRenderingContext2D,
  text: string | string[],
  x: number,
  y: number,
  font: CanvasFontSpec,
  opts?: RenderTextOpts
): void;

declare function addRoundedRectPath(ctx: CanvasRenderingContext2D, rect: RoundedRect): void;

export { ArrayListener, CanvasFontSpec, DrawPointOptions, HALF_PI, INFINITY, PI, PITAU, QUARTER_PI, RAD_PER_DEG, RTLAdapter, RenderTextOpts, SplinePoint, TAU, TWO_THIRDS_PI, _addGrace, _alignStartEnd, _angleBetween, _angleDiff, _arrayUnique, _bezierInterpolation, _decimalPlaces, _factorize, _filterBetween, _getParentNode, _getStartAndCountOfVisiblePoints, _int16Range, _isBetween, _isDomSupported, _limitValue, _lookup, _lookupByKey, _normalizeAngle, _pointInLine, _readValueToProps, _rlookupByKey, _scaleRangesChanged, _setMinAndMaxByKey, _steppedInterpolation, _textX, _toLeftRightCenter, _updateBezierControlPoints, addRoundedRectPath, almostEquals, almostWhole, clearCanvas, clipArea, color, createContext, debounce, distanceBetweenPoints, drawPoint, drawPointLegend, fontString, formatNumber, getAngleFromPoint, getHoverColor, getMaximumSize, getRelativePosition, getRtlAdapter, getStyle, isNumber, isPatternOrGradient, listenArrayEvents, log10, niceNum, overrideTextDirection, readUsedSize, renderText, requestAnimFrame, resolve, restoreTextDirection, retinaScale, sign, splineCurve, splineCurveMonotone, supportsEventListenerOptions, throttled, toDegrees, toFont, toFontString, toLineHeight, toPadding, toRadians, toTRBL, toTRBLCorners, unclipArea, unlistenArrayEvents };
