/*!
 * Chart.js v3.0.0-rc.2
 * https://www.chartjs.org
 * (c) 2021 Chart.js Contributors
 * Released under the MIT License
 */
import { F as FontSpec, C as ChartArea, P as PointStyle, a as Color, A as AnyObject, E as EasingFunction } from './chunks/index.esm';

interface CanvasFontSpec extends FontSpec {
	string: string;
}
/**
 * Parses font options and returns the font object.
 * @param {object} options - A object that contains font options to be parsed.
 * @return {object} The font object.
 */
declare function toFont(options: Partial<FontSpec>): CanvasFontSpec;

/**
 * Converts the given line height `value` in pixels for a specific font `size`.
 * @param {number|string} value - The lineHeight to parse (eg. 1.6, '14px', '75%', '1.6em').
 * @param {number} size - The font size (in pixels) used to resolve relative `value`.
 * @returns {number} The effective line height in pixels (size * 1.2 if value is invalid).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
 * @since 2.7.0
 */
declare function toLineHeight(value: string, size: number): number;

/**
 * Converts the given value into a padding object with pre-computed width/height.
 * @param {number|object} value - If a number, set the value to all TRBL component;
 *  else, if an object, use defined properties and sets undefined ones to 0.
 * @returns {object} The padding values (top, right, bottom, left, width, height)
 * @since 2.7.0
 */
declare function toPadding(
  value?: number | { top?: number; left?: number; right?: number; bottom?: number; x?:number, y?: number }
): { top: number; left: number; right: number; bottom: number; width: number; height: number };

/**
 * Evaluates the given `inputs` sequentially and returns the first defined value.
 * @param inputs - An array of values, falling back to the last value.
 * @param [context] - If defined and the current value is a function, the value
 * is called with `context` as first argument and the result becomes the new input.
 * @param [index] - If defined and the current value is an array, the value
 * at `index` become the new input.
 * @param [info] - object to return information about resolution in
 * @param [info.cacheable] - Will be set to `false` if option is not cacheable.
 * @since 2.7.0
 */
declare function resolve<T, C>(
	inputs: undefined | T | ((c: C) => T) | readonly T[],
	context?: C,
	index?: number,
	info?: { cacheable?: boolean }
): T | undefined;

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
	color?: Color;

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
	strokeColor?: Color;

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

interface ColorModel {
	rgbString(): string;
	hexString(): string;
	hslString(): string;
	rgb: { r: number; g: number; b: number; a: number };
	valid: boolean;
	mix(color: ColorModel, weight: number): this;
	clone(): ColorModel;
	alpha(a: number): ColorModel;
	clearer(ration: number): ColorModel;
	greyscale(): ColorModel;
	opaquer(ratio: number): ColorModel;
	negate(): ColorModel;
	lighten(ratio: number): ColorModel;
	darken(ratio: number): ColorModel;
	saturate(ratio: number): ColorModel;
	desaturate(ratio: number): ColorModel;
	rotate(deg: number): this;
}
declare function color(value: CanvasGradient): CanvasGradient;
declare function color(value: CanvasPattern): CanvasPattern;
declare function color(
	value:
		| string
		| { r: number; g: number; b: number; a: number }
		| [number, number, number]
		| [number, number, number, number]
): ColorModel;

declare function getHoverColor(value: CanvasGradient): CanvasGradient;
declare function getHoverColor(value: CanvasPattern): CanvasPattern;
declare function getHoverColor(value: string): string;

/**
 * An empty function that can be used, for example, for optional callback.
 */
declare function noop(): void;

/**
 * Returns a unique id, sequentially generated from a global variable.
 * @returns {number}
 * @function
 */
declare function uid(): number;
/**
 * Returns true if `value` is neither null nor undefined, else returns false.
 * @param {*} value - The value to test.
 * @returns {boolean}
 * @since 2.7.0
 */
declare function isNullOrUndef(value: unknown): value is null | undefined;
/**
 * Returns true if `value` is an array (including typed arrays), else returns false.
 * @param {*} value - The value to test.
 * @returns {boolean}
 * @function
 */
declare function isArray<T = unknown>(value: unknown): value is ArrayLike<T>;
/**
 * Returns true if `value` is an object (excluding null), else returns false.
 * @param {*} value - The value to test.
 * @returns {boolean}
 * @since 2.7.0
 */
declare function isObject(value: unknown): value is AnyObject;
/**
 * Returns true if `value` is a finite number, else returns false
 * @param {*} value - The value to test.
 * @returns {boolean}
 */
declare function isFinite(value: unknown): value is number;
/**
 * Returns `value` if defined, else returns `defaultValue`.
 * @param {*} value - The value to return if defined.
 * @param {*} defaultValue - The value to return if `value` is undefined.
 * @returns {*}
 */
declare function valueOrDefault<T>(value: T | undefined, defaultValue: T): T;
/**
 * Calls `fn` with the given `args` in the scope defined by `thisArg` and returns the
 * value returned by `fn`. If `fn` is not a function, this method returns undefined.
 * @param fn - The function to call.
 * @param args - The arguments with which `fn` should be called.
 * @param [thisArg] - The value of `this` provided for the call to `fn`.
 * @returns {*}
 */
declare function callback<T extends (this: TA, ...args: unknown[]) => R, TA, R>(
	fn: T | undefined,
	args: unknown[],
	thisArg?: TA
): R | undefined;

/**
 * Note(SB) for performance sake, this method should only be used when loopable type
 * is unknown or in none intensive code (not called often and small loopable). Else
 * it's preferable to use a regular for() loop and save extra function calls.
 * @param loopable - The object or array to be iterated.
 * @param fn - The function to call for each item.
 * @param [thisArg] - The value of `this` provided for the call to `fn`.
 * @param [reverse] - If true, iterates backward on the loopable.
 */
declare function each<T, TA>(
	loopable: T[],
	fn: (this: TA, v: T, i: number) => void,
	thisArg?: TA,
	reverse?: boolean
): void;
/**
 * Note(SB) for performance sake, this method should only be used when loopable type
 * is unknown or in none intensive code (not called often and small loopable). Else
 * it's preferable to use a regular for() loop and save extra function calls.
 * @param loopable - The object or array to be iterated.
 * @param fn - The function to call for each item.
 * @param [thisArg] - The value of `this` provided for the call to `fn`.
 * @param [reverse] - If true, iterates backward on the loopable.
 */
declare function each<T, TA>(
	loopable: { [key: string]: T },
	fn: (this: TA, v: T, k: string) => void,
	thisArg?: TA,
	reverse?: boolean
): void;

/**
 * Returns a deep copy of `source` without keeping references on objects and arrays.
 * @param source - The value to clone.
 */
declare function clone<T>(source: T): T;

interface MergeOptions {
	merger?: (key: string, target: AnyObject, source: AnyObject, options: AnyObject) => AnyObject;
}
/**
 * Recursively deep copies `source` properties into `target` with the given `options`.
 * IMPORTANT: `target` is not cloned and will be updated with `source` properties.
 * @param target - The target object in which all sources are merged into.
 * @param source - Object(s) to merge into `target`.
 * @param {object} [options] - Merging options:
 * @param {function} [options.merger] - The merge method (key, target, source, options)
 * @returns {object} The `target` object.
 */
declare function merge<T>(target: T, source: [], options?: MergeOptions): T;
declare function merge<T, S1>(target: T, source: S1, options?: MergeOptions): T & S1;
declare function merge<T, S1>(target: T, source: [S1], options?: MergeOptions): T & S1;
declare function merge<T, S1, S2>(target: T, source: [S1, S2], options?: MergeOptions): T & S1 & S2;
declare function merge<T, S1, S2, S3>(target: T, source: [S1, S2, S3], options?: MergeOptions): T & S1 & S2 & S3;
declare function merge<T, S1, S2, S3, S4>(
	target: T,
	source: [S1, S2, S3, S4],
	options?: MergeOptions
): T & S1 & S2 & S3 & S4;
declare function merge<T>(target: T, source: AnyObject[], options?: MergeOptions): AnyObject;

/**
 * Recursively deep copies `source` properties into `target` *only* if not defined in target.
 * IMPORTANT: `target` is not cloned and will be updated with `source` properties.
 * @param target - The target object in which all sources are merged into.
 * @param source - Object(s) to merge into `target`.
 * @returns The `target` object.
 */
declare function mergeIf<T>(target: T, source: []): T;
declare function mergeIf<T, S1>(target: T, source: S1): T & S1;
declare function mergeIf<T, S1>(target: T, source: [S1]): T & S1;
declare function mergeIf<T, S1, S2>(target: T, source: [S1, S2]): T & S1 & S2;
declare function mergeIf<T, S1, S2, S3>(target: T, source: [S1, S2, S3]): T & S1 & S2 & S3;
declare function mergeIf<T, S1, S2, S3, S4>(target: T, source: [S1, S2, S3, S4]): T & S1 & S2 & S3 & S4;
declare function mergeIf<T>(target: T, source: AnyObject[]): AnyObject;

declare function resolveObjectKey(obj: AnyObject, key: string): AnyObject;

interface SplinePoint {
	x: number;
	y: number;
}

/**
 * Props to Rob Spencer at scaled innovation for his post on splining between points
 * http://scaledinnovation.com/analytics/splines/aboutSplines.html
 */
declare function splineCurve(
	firstPoint: SplinePoint & { skip?: boolean },
	middlePoint: SplinePoint,
	afterPoint: SplinePoint,
	t: number
): {
	previous: SplinePoint;
	next: SplinePoint;
};

interface MonotoneSplinePoint extends SplinePoint {
	skip: boolean;
	cp1x?: number;
	cp1y?: number;
	cp2x?: number;
	cp2y?: number;
}

/**
 * This function calculates Bézier control points in a similar way than |splineCurve|,
 * but preserves monotonicity of the provided data and ensures no local extremums are added
 * between the dataset discrete points due to the interpolation.
 * @see https://en.wikipedia.org/wiki/Monotone_cubic_interpolation
 */
declare function splineCurveMonotone(points: readonly MonotoneSplinePoint[]): void;

declare function getMaximumSize(node: HTMLElement, width?: number, height?: number, aspectRatio?: number): { width: number, height: number };
declare function getRelativePosition(
	evt: MouseEvent,
	chart: { readonly canvas: HTMLCanvasElement }
): { x: number; y: number };
declare function getStyle(el: HTMLElement, property: string): string;
declare function retinaScale(
	chart: {
		currentDevicePixelRatio: number;
		readonly canvas: HTMLCanvasElement;
		readonly width: number;
		readonly height: number;
		readonly ctx: CanvasRenderingContext2D;
	},
  forceRatio: number,
  forceStyle?: boolean
): void;

type EasingFunctionSignature = (t: number) => number;

declare const easingEffects: Record<EasingFunction, EasingFunctionSignature>;

declare function fontString(pixelSize: number, fontStyle: string, fontFamily: string): string;

/**
 * Request animation polyfill
 */
declare function requestAnimFrame(cb: () => void): void;

/**
 * Throttles calling `fn` once per animation frame
 * Latest argments are used on the actual call
 * @param {function} fn
 * @param {*} thisArg
 * @param {function} [updateFn]
 */
declare function throttled(fn: (...args: any[]) => void, thisArg: any, updateFn?: (...args: any[]) => any[]): (...args: any[]) => void;

/**
 * Debounces calling `fn` for `delay` ms
 * @param {function} fn - Function to call. No arguments are passed.
 * @param {number} delay - Delay in ms. 0 = immediate invocation.
 * @returns {function}
 */
declare function debounce(fn: () => void, delay: number): () => number;

/**
 * Format a number using a localized number formatter.
 * @param num The number to format
 * @param locale The locale to pass to the Intl.NumberFormat constructor
 * @param options Number format options
 */
declare function formatNumber(num: number, locale: string, options: Intl.NumberFormatOptions): string;

declare function log10(x: number): number;
declare function isNumber(v: any): boolean;
declare function almostEquals(x: number, y: number, epsilon: number): boolean;
declare function almostWhole(x: number, epsilon: number): number;
declare function sign(x: number): number;
declare function toRadians(degrees: number): number;
declare function toDegrees(radians: number): number;
/**
 * Gets the angle from vertical upright to the point about a centre.
 */
declare function getAngleFromPoint(
	centrePoint: { x: number; y: number },
	anglePoint: { x: number; y: number }
): { angle: number; distance: number };

declare function distanceBetweenPoints(pt1: { x: number; y: number }, pt2: { x: number; y: number }): number;

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

export { ArrayListener, CanvasFontSpec, ColorModel, DrawPointOptions, EasingFunctionSignature, MergeOptions, MonotoneSplinePoint, RTLAdapter, RenderTextOpts, SplinePoint, almostEquals, almostWhole, callback, clearCanvas, clipArea, clone, color, debounce, distanceBetweenPoints, drawPoint, each, easingEffects, fontString, formatNumber, getAngleFromPoint, getHoverColor, getMaximumSize, getRelativePosition, getRtlAdapter, getStyle, isArray, isFinite, isNullOrUndef, isNumber, isObject, listenArrayEvents, log10, merge, mergeIf, noop, overrideTextDirection, renderText, requestAnimFrame, resolve, resolveObjectKey, restoreTextDirection, retinaScale, sign, splineCurve, splineCurveMonotone, throttled, toDegrees, toFont, toFontString, toLineHeight, toPadding, toRadians, uid, unclipArea, unlistenArrayEvents, valueOrDefault };
