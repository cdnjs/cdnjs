/**
 * global config
 * idle/worker etc
 */
export declare const GlobalConfig: {
	isTest: boolean;
	idleLog: boolean;
	idleForceTimeThreshold: number;
	workerCount: number;
	messagePostRatioPerWorker: number;
	maxFPS: number;
	crsMaxNativeZoom: number;
};
export type ProxyItemType = {
	target: string;
	[propName: string]: any;
};
export type ProxyConfig = {
	[key: string]: ProxyItemType;
};
export type SpriteOptionsType = {
	imgUrl: string;
	jsonUrl: string;
	sourceName?: string;
};
export type SVGOptionsType = {
	url?: string;
	symbols?: Array<SVGSymbolElement>;
	sourceName?: string;
	fill?: string;
	stroke?: string;
};
declare function loadSprite(options?: SpriteOptionsType): Promise<unknown>;
declare function loadSvgs(svgs: string | Array<SVGSymbolElement> | SVGOptionsType): Promise<unknown>;
/**
 * simple Resouce Proxy implementation
 *
 * https://www.webpackjs.com/configuration/dev-server/#devserverproxy
 */
export declare const ResourceProxy: {
	host: string;
	resources: {
		[key: string]: any;
	};
	proxy: ProxyConfig;
	origin: ProxyConfig;
	fromJSON(json: string | object): void;
	toJSON(): {
		host: string;
		proxy: ProxyConfig;
		origin: ProxyConfig;
	};
	getResource(name: string): any;
	/**
	 * remove resource
	 * @param {String} name
	 */
	removeResource(name: string): void;
	/**
	 * add resource
	 * @param {String} name
	 * @param {Object} res
	 */
	addResource(name: string, res: string | ImageBitmap): void;
	/**
	* update  resource (remove and add)
	 * @param {String} name
	 * @param {Object} res
	 */
	updateResource(name: string, res: string | ImageBitmap): void;
	/**
	 * get all resource [key,value]
	 * @returns {Object} source
	 */
	allResource(): {
		[key: string]: any;
	};
	loadSprite: typeof loadSprite;
	loadSvgs: typeof loadSvgs;
};
export declare function formatResourceUrl(path: string): any;
export declare function parseSVG(str: string): any[];
/**
 * INTERNAL_LAYER_PREFIX The id prefix of internal layers
 * @global
 */
export declare const INTERNAL_LAYER_PREFIX = "_maptalks__internal_layer_";
export declare const GEOMETRY_COLLECTION_TYPES: string[];
export declare const GEOJSON_TYPES: string[];
/**
 * Symbol properties containing external resources
 */
export declare const RESOURCE_PROPERTIES: string[];
/**
 * Corresponding size properties for the above resource properties
 */
export declare const RESOURCE_SIZE_PROPERTIES: string[][];
/**
 * numeric symbol properties
 */
export declare const NUMERICAL_PROPERTIES: {
	lineWidth: number;
	lineOpacity: number;
	lineDx: number;
	lineDy: number;
	polygonOpacity: number;
	markerWidth: number;
	markerHeight: number;
	markerDx: number;
	markerDy: number;
	markerOpacity: number;
	markerFillOpacity: number;
	markerLineWidth: number;
	markerLineOpacity: number;
	textSize: number;
	textOpacity: number;
	textHaloRadius: number;
	textWrapWidth: number;
	textLineSpacing: number;
	textDx: number;
	textDy: number;
};
/**
 *  color symbol properties
 */
export declare const COLOR_PROPERTIES: string[];
export declare const DEFAULT_TEXT_SIZE = 14;
export type BrowserType = {
	IS_NODE: boolean;
	isTest: boolean;
	ie: boolean;
	ielt9: boolean;
	edge: boolean;
	webkit: boolean;
	gecko: boolean;
	android: boolean;
	android23: boolean;
	chrome: boolean;
	chromeVersion: string;
	safari: boolean;
	phantomjs: boolean;
	ie3d: boolean;
	webkit3d: boolean;
	opera12: boolean;
	gecko3d: boolean;
	any3d: boolean;
	iosWeixin: boolean;
	mobile: boolean;
	mobileWebkit: boolean;
	mobileWebkit3d: boolean;
	mobileOpera: boolean;
	mobileGecko: boolean;
	touch: boolean;
	msPointer: boolean;
	pointer: boolean;
	retina: boolean;
	devicePixelRatio: number;
	language: string;
	ie9: boolean;
	ie10: boolean;
	webgl: boolean;
	imageBitMap: boolean;
	roundRect: boolean;
	resizeObserver: boolean;
	btoa: boolean;
	decodeImageInWorker: boolean;
	monitorDPRChange: boolean;
	supportsPassive: boolean;
	proxy: boolean;
	requestIdleCallback: boolean;
	checkDevicePixelRatio: () => boolean;
};
export declare let Browser: BrowserType;
declare function now(): number;
declare function extend<T extends {}, U>(dest: T, source: U): T & U;
declare function extend<T extends {}, U, V>(dest: T, source1: U, source2: V): T & U & V;
declare function extend<T extends {}, U, V, W>(dest: T, source1: U, source2: V, source3: W): T & U & V & W;
declare function extend<T extends {}, U, V, W, X>(dest: T, source1: U, source2: V, source3: W, source4: X): T & U & V & W & X;
declare function extend(dest: object, ...args: Array<any>): any;
declare function isNil(obj: Object): obj is null;
declare function isNumber(val: Object): val is number;
declare function isInteger(n: number): boolean;
declare function isObject(obj: Object): obj is object;
declare function isString(obj: Object): obj is string;
declare function isFunction(obj: Object): obj is Function;
declare function hasOwn(obj: Object, key: string): boolean;
declare function join(arr: Object[], seperator: string): string;
declare function isEmpty(object: Object): boolean;
declare function toRadian(d: number): number;
declare function toDegree(r: number): number;
declare const IS_NODE: boolean;
declare function getGlobalThis(): typeof globalThis;
declare function checkMTKVersion(version: any): void;
declare let requestAnimFrame: any, cancelAnimFrame: any;
declare function isSVG(url: string): 0 | 1 | 2;
declare function loadImage(img: any, imgDesc: Object[]): void;
declare function UID(): number;
declare const GUID: typeof UID;
declare function parseJSON(str: string): any;
declare function pushIn<T extends Array<any>>(...args: T[]): number;
declare function mergeArray<T extends Array<any>>(...args: T[]): any[];
declare function removeFromArray<T>(obj: T, array: T[]): void;
declare function forEachCoord(arr: any[], fn: Function, context?: any): any;
declare function getValueOrDefault<T>(v: T, d: T): T;
declare function sign(x: number): number;
declare function log2(x: number): number;
declare function interpolate(a: number, b: number, t: number): number;
declare function wrap(n: number, min: number, max: number): number;
declare function clamp(n: number, min: number, max: number): number;
declare function isArrayHasData(obj: Object): boolean;
declare function isURL(url: string): boolean;
declare function isCssUrl(str: string): 0 | 1 | 2 | 3;
declare function extractCssUrl(str: string): any;
declare function btoa$1(input: string): string;
declare function b64toBlob(b64Data: string, contentType: string): Blob;
declare function computeDegree(x0: number, y0: number, x1: number, y1: number): number;
declare const emptyImageUrl = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
declare function equalMapView(obj1: Object, obj2: Object): boolean;
declare function flash(interval?: number, count?: number, cb?: Function, context?: any): any;
declare function _defaults(obj: any, defaults: any): any;
declare function getPointsResultPts(points?: any[], ptKey?: string): any[];
declare function getImageBitMap<T>(data: {
	data: T;
}, cb: (d: T) => void | any): void;
declare function getAbsoluteURL(url: string): string;
declare function calCanvasSize(size: {
	width: number;
	height: number;
}, devicePixelRatio?: number): {
	cssWidth: string;
	cssHeight: string;
	width: number;
	height: number;
};
declare function isNoContentHttpCode(code: number): boolean;
declare function translateToSVGStyles(s: any): {
	stroke: {
		stroke: any;
		"stroke-width": any;
		"stroke-opacity": any;
		"stroke-dasharray": any;
		"stroke-linecap": string;
		"stroke-linejoin": string;
	};
	fill: {
		fill: any;
		"fill-opacity": any;
	};
};
declare function getMarkerPathBase64(symbol: any, width?: number, height?: number): string;
declare function getExternalResources(symbol: any, toAbsolute?: boolean): string[];
declare function convertResourceUrl(symbol: any): any;
declare function isImageBitMap(img: any): boolean;
declare function isGradient(g: Object): boolean;
declare function getGradientStamp(g: Object): string;
declare function getSymbolStamp(symbol: Object, prefix: string): string | number;
declare function getSymbolHash(symbol: Object | Object[], prefix?: string): string | number;
declare function lowerSymbolOpacity(symbol: Object | Object[], ratio: number): Object | Object[];
declare function extendSymbol(...args: Object[]): Object | Object[];
declare function parseStyleRootPath(style: any): any;
declare function convertStylePath(styles: any[], replacer: any): void;
declare function parseSymbolPath(symbol: any, replacer: string): void;
declare function isDashLine(symbolizers?: any[]): boolean;
export type CoordinateJson = {
	x: number;
	y: number;
	z?: number;
};
export type CoordinateArray = [
	number,
	number
] | [
	number,
	number,
	number
];
export type CoordinateLike = Coordinate | CoordinateJson | CoordinateArray;
/**
 * 坐标 `Coordinate` 的实现，例如一个地理坐标点（经度，纬度）
 *
 * @english
 *
 * Represents a coordinate point <br>
 * e.g. <br>
 * A geographical point (longitude, latitude)
 * @example
 *
 * ```ts
 * const coord = new Coordinate(0, 0);
 * ```
 * @example
 *
 * ```ts
 * const coord = new Coordinate([ 0, 0 ]);
 * ```
 * @example
 *
 * ```ts
 * const coord = new Coordinate({ x : 0, y : 0 });
 * ```
 * @category basic types
 */
export declare class Coordinate extends Position {
	/**
	 * 将一个或多个坐标对象转换为GeoJSON风格的坐标。
	 *
	 * @english
	 *
	 * Convert one or more Coordinate objects to GeoJSON style coordinates
	 * @param coordinates - coordinates to convert
	 * @example
	 *
	 * ```ts
	 * // result is [[100,0], [101,1]]
	 * const numCoords = Coordinate.toNumberArrays([new Coordinate(100,0), new Coordinate(101,1)]);
	 * ```
	 */
	static toNumberArrays(coordinates: Coordinate): any;
	static toNumberArrays(coordinates: Coordinate[]): any;
	static toNumberArrays(coordinates: Coordinate[][]): any;
	static toNumberArrays(coordinates: Coordinate[][][]): any;
	/**
	 * 将一个或多个GeoJSON风格的坐标转换为坐标对象。
	 *
	 * @english
	 *
	 * Convert one or more GeoJSON style coordiantes to Coordinate objects
	 * @param coordinates - coordinates to convert
	 * @example
	 *
	 * ```ts
	 * const coordinates = Coordinate.toCoordinates([[100,0], [101,1]]);
	 * ```
	 */
	static toCoordinates(coordinates: CoordinateArray | CoordinateArray[] | CoordinateArray[][] | Coordinate | Coordinate[] | Coordinate[][]): Coordinate | Coordinate[] | Coordinate[][];
	/**
	 * 使用差值与另一个坐标进行比较，判断是否临近
	 *
	 * @english
	 *
	 * Compare with another Coordinate with a delta
	 * @param p
	 * @param delta
	 */
	closeTo(p: Coordinate, delta?: number): boolean;
	/**
	 * 返回该坐标的经纬度绝对值的坐标对象（不会改变原始数据）
	 *
	 * @english
	 *
	 * Return abs value of the coordinate
	 * @returns abs Coordinate
	 */
	abs(): Coordinate;
	/**
	 * 类似于数学中的四舍五入，对坐标的 x 和 y 进行舍入，返回一个新 Coordinate
	 *
	 * @english
	 *
	 * Like math.round, rounding the coordinate's xy.
	 * @returns rounded coordinate
	 */
	round(): Coordinate;
	/**
	 * 对坐标的 x 和 y 向上取整，返回一个新 Coordinate
	 *
	 * @english
	 *
	 * Like math.ceil, ceil the coordinate's xy.
	 * @returns ceiled coordinate
	 */
	ceil(): Coordinate;
	/**
	 * 对坐标的 x 和 y 向下取整，返回一个新 Coordinate
	 *
	 * @english
	 *
	 * Like math.floor, floor the coordinate's xy.
	 * @returns floored coordinate
	 */
	floor(): Coordinate;
	/**
	 * 返回当前坐标的 copy
	 *
	 * @english
	 *
	 * Returns a copy of the coordinate
	 * @returns copy
	 */
	copy(): Coordinate;
	/**
	 * 坐标数字保留指定位数的小数
	 *
	 * @english
	 *
	 * Formats coordinate number using fixed-coordinate notation.
	 * @param n - The number of digits to appear after the decimal coordinate
	 * @returns fixed coordinate
	 */
	toFixed(n: number): Coordinate;
	/**
	 * 与传入坐标相加，返回一个新 Coordinate
	 *
	 * @english
	 *
	 * Returns the result of addition of another coordinate.
	 * @param x - coordinate to add
	 * @returns result
	 */
	add(x: CoordinateLike): Coordinate;
	/**
	 * 与传入坐标相加，返回一个新 Coordinate
	 *
	 * @english
	 *
	 * Returns the result of addition of another coordinate.
	 * @param x - coordinate to add
	 * @param y - coordinate to add
	 * @returns result
	 */
	add(x: number, y: number, z?: number): Coordinate;
	/**
	 * 与传入坐标相减，返回一个新 Coordinate。
	 *
	 * @english
	 *
	 * Returns the result of subtraction of another coordinate.
	 * @param x - coordinate to add
	 * @returns result
	 */
	sub(x: CoordinateLike): Coordinate;
	/**
	 * 与传入坐标相减，返回一个新 Coordinate。
	 *
	 * @english
	 *
	 * Returns the result of subtraction of another coordinate.
	 * @param x - coordinate to add
	 * @param y - coordinate to add
	 * @param z - altitude to add
	 * @returns result
	 */
	sub(x: number, y: number, z?: number): Coordinate;
	/**
	 * Returns the result of multiplication of the current coordinate by the given number.
	 * @param ratio - ratio to multi
	 * @returns result
	 */
	multi(ratio: number): Coordinate;
	/**
	 * 与另外一个 coordinate 进行比较，以查看它们是否相等
	 *
	 * @english
	 *
	 * Compare with another coordinate to see whether they are equal.
	 * @param c - coordinate to compare
	 */
	equals(c: Coordinate): boolean;
}
export type WithNull<T> = T | null;
export type WithUndef<T> = T | undefined;
export type NumberAble = number | string;
export type PositionJson<T> = {
	x: T;
	y: T;
	z?: T;
};
export type PositionArray<T> = [
	T,
	T
] | [
	T,
	T,
	T
];
export type PositionLike = Point | Coordinate | PositionJson<NumberAble> | PointJson | CoordinateJson;
declare abstract class Position {
	x: number;
	y: number;
	z: WithUndef<number>;
	constructor(x: PositionLike);
	constructor(x: PositionArray<NumberAble>);
	constructor(x: PointArray);
	constructor(x: CoordinateArray);
	constructor(x: NumberAble, y: NumberAble, z?: NumberAble);
	/**
	 * 设置点或坐标的 x、y 值
	 *
	 * @english
	 *
	 * Set point or coordinate's x, y value
	 * @param x - x value
	 * @param y - y value
	 * @param z - z value
	 */
	set(x: number, y: number, z?: number): this;
	abstract abs(): Point | Coordinate;
	/**
	 * 修改原数据的绝对值
	 *
	 * @english
	 * destructive abs
	 */
	_abs(): this;
	/**
	 * 对原数据的 x 和 y 四舍五入
	 *
	 * @english
	 * destructive round
	 */
	_round(): this;
	abstract round(): Point | Coordinate;
	/**
	 * 对原数据的 x 和 y 进行向上取整
	 *
	 * @english
	 * destructive ceil
	 */
	_ceil(): this;
	abstract ceil(): Point | Coordinate;
	/**
	 * 返回当前点与给定点之间的距离
	 *
	 * @english
	 *
	 * Returns the distance between the current and the given point.
	 * @param  point - another point
	 * @returns distance
	 */
	distanceTo(point: Point | Coordinate): number;
	/**
	 * 返回该点的大小：这是从 0,0 坐标到该点的 x 和 y 坐标的欧几里得距离
	 *
	 * @english
	 *
	 * Return the magnitude of this point: this is the Euclidean
	 * distance from the 0, 0 coordinate to this point's x and y
	 * coordinates.
	 * @returns magnitude
	 */
	mag(): number;
	/**
	 * 对原数据的 x 和 y 进行向下取整
	 *
	 * @english
	 * destructive floor
	 */
	_floor(): this;
	abstract floor(): Point | Coordinate;
	abstract copy(): Point | Coordinate;
	_add(x: PositionLike): this;
	_add(x: number, y: number): this;
	abstract add(x: any, y?: number): Point | Coordinate;
	_sub(x: PositionLike | PositionArray<number>): this;
	_sub(x: number, y: number): this;
	/**
	 * `_sub` 方法的别名
	 *
	 * @english
	 *
	 * Alias for _sub
	 *
	 * @param x
	 * @param y
	 */
	_substract(x: PositionLike | number, y?: number): this;
	abstract sub(x: any, y?: number): Point | Coordinate;
	/**
	 * `sub` 方法的别名。
	 *
	 * @english
	 *
	 * Alias for sub
	 * @returns result
	 * @param x
	 * @param y
	 */
	substract(x: PositionLike | number, y?: number): Coordinate | Point;
	abstract multi(ratio: number): Point | Coordinate;
	_multi(ratio: number): this;
	/**
	 * 返回当前坐标除以给定数字
	 *
	 * @english
	 *
	 * Returns the result of division of the current point by the given number.
	 * @param n - number to div
	 * @returns result
	 */
	div(n: number): Coordinate | Point;
	/**
	 * 除以给定的数字
	 *
	 * @english
	 *
	 * div by the given number
	 * @param n
	 */
	_div(n: number): this;
	abstract equals(c: Point | Coordinate): boolean;
	/**
	 * `Coordinate` / `Point`是否是 `NaN`
	 *
	 * @english
	 *
	 * Whether the coordinate is NaN
	 * @returns
	 */
	_isNaN(): boolean;
	/**
	 * `Coordinate` / `Point`是否为零
	 *
	 * @english
	 *
	 * Whether the coordinate/point is zero
	 */
	isZero(): boolean;
	/**
	 * 转换为数组形式
	 *
	 * @english
	 *
	 * Convert to a number array [x, y]
	 * @returns number array
	 */
	toArray(): PositionArray<number>;
	/**
	 * 坐标数字保留指定位数的小数
	 *
	 * @english
	 *
	 * Formats coordinate number using fixed-point notation.
	 * @param n - The number of digits to appear after the decimal point
	 * @returns fixed coordinate
	 */
	abstract toFixed(n: number): Point | Coordinate;
	/**
	 * 转换到 json 对象
	 *
	 * @english
	 * Convert to a json object {x : .., y : ..}
	 * @returns json
	 */
	toJSON(): PositionJson<number>;
}
export type PointJson = {
	x: number;
	y: number;
	z?: number;
};
export type PointArray = [
	number,
	number
] | [
	number,
	number,
	number
];
export type PointLike = Point | PointJson | PointArray;
/**
 * 2D 点实现
 * @english
 * Represents a 2d point.<br>
 * Can be created in serveral ways:
 *
 * @example
 *
 * ```ts
 *
 * var point = new Point(1000, 1000);
 *
 * var point = new Point([1000, 1000]);
 *
 * var point = new Point({ x:1000, y:1000 });
 * ```
 *
 * @category basic types
 */
export declare class Point extends Position {
	arrowPrePoint?: Point;
	arrowNextPoint?: Point;
	distance?: number;
	/**
	 * 使用差值与另一个点进行比较，判断是否临近
	 *
	 * @english
	 *
	 * Compare with another point with a delta
	 * @param p
	 * @param delta
	 */
	closeTo(p: Point, delta?: number): boolean;
	/**
	 * 计算对应的单位向量
	 * 这意味着计算点到[0, 0]坐标的距离将等于1，并且从计算点到[0, 0]坐标的角度与之前相同
	 * @english
	 *
	 * Calculate this point but as a unit vector from 0, 0, meaning
	 * that the distance from the resulting point to the 0, 0
	 * coordinate will be equal to 1 and the angle from the resulting
	 * point to the 0, 0 coordinate will be the same as before.
	 * @returns unit vector point
	 */
	unit(): Point;
	_unit(): this;
	/**
	 * 计算一个垂直点，其中新的y坐标是旧的x坐标，而新的x坐标是旧的y坐标乘以-1。
	 *
	 * @english
	 *
	 * Compute a perpendicular point, where the new y coordinate
	 * is the old x coordinate and the new x coordinate is the old y
	 * coordinate multiplied by -1
	 * @returns perpendicular point
	 */
	perp(): Point;
	_perp(): this;
	/**
	 * 获取这个点与另一个点之间的角度，单位为弧度
	 *
	 * @english
	 *
	 * Get the angle between this point and another point, in radians
	 * from mapbox/point-geometry
	 * @param b - the other point
	 * @returns angle
	 */
	angleWith(b: Point): number;
	/**
	 * 找到两个向量之间的角度
	 *
	 * @english
	 *
	 * Find the angle of the two vectors, solving the formula for
	 * the cross product a x b = |a||b|sin(θ) for θ.
	 * from mapbox/point-geometry
	 *
	 * @param x the x-coordinate
	 * @param y the y-coordinate
	 * @returns the angle in radians
	 */
	angleWithSep(x: number, y: number): number;
	_rotate(angle: number): this;
	/**
	 * 围绕0,0原点旋转这个点，旋转角度a以弧度为单位
	 *
	 * @english
	 *
	 * Rotate this point around the 0, 0 origin by an angle a,
	 * given in radians
	 * from mapbox/point-geometry
	 *
	 * @param a angle to rotate around, in radians
	 * @returns output point
	 */
	rotate(a: number): Point;
	/**
	 * 返回该点绝对值的 `Point` 对象（不会改变原始数据）
	 *
	 * @english
	 *
	 * Return abs value of the point
	 * @returns abs point
	 */
	abs(): Point;
	/**
	 * 类似于数学中的四舍五入，对点的 x 和 y 坐标进行舍入，返回一个新 Point
	 *
	 * @english
	 *
	 * Like math.round, rounding the point's xy.
	 * @returns rounded point
	 */
	round(): Point;
	/**
	 * 对点的 x 和 y 坐标向上取整，返回一个新 Point
	 *
	 * @english
	 *
	 * Like math.ceil, ceil the point's xy.
	 * @returns ceiled point
	 */
	ceil(): Point;
	/**
	 * 对点的 x 和 y 坐标向下取整，返回一个新 Point
	 *
	 * @english
	 *
	 * Like math.floor, floor the point's xy.
	 * @returns floored point
	 */
	floor(): Point;
	/**
	 * 返回当前点的 copy
	 *
	 * @english
	 *
	 * Returns a copy of the point
	 * @returns copy
	 */
	copy(): Point;
	/**
	 * 坐标数字保留指定位数的小数
	 *
	 * @english
	 *
	 * Formats point number using fixed-point notation.
	 * @param n - The number of digits to appear after the decimal point
	 * @returns fixed point
	 */
	toFixed(n: number): Point;
	/**
	 * 与传入坐标相加，返回一个新 Point
	 *
	 * @english
	 *
	 * Returns the result of addition of another coordinate.
	 * @param x - point to add
	 * @returns result
	 */
	add(x: PointLike): Point;
	/**
	 * 与传入坐标相加，返回一个新 Point
	 *
	 * @english
	 *
	 * Returns the result of addition of another coordinate.
	 * @param x - point to add
	 * @param y - point to add
	 * @returns result
	 */
	add(x: number, y: number): Point;
	/**
	 * 与传入坐标相减，返回一个新 Point。
	 *
	 * @english
	 *
	 * Returns the result of subtraction of another point.
	 * @param x - point to add
	 * @returns result
	 */
	sub(x: PointLike): Point;
	/**
	 * 与传入坐标相减，返回一个新 Point。
	 *
	 * @english
	 *
	 * Returns the result of subtraction of another point.
	 * @param x - point to add
	 * @param y - point to add
	 * @returns result
	 */
	sub(x: number, y: number): Point;
	/**
	 * Returns the result of multiplication of the current coordinate by the given number.
	 * @param ratio - ratio to multi
	 * @returns result
	 */
	multi(ratio: number): Point;
	/**
	 * 与另外一个 point 进行比较，以查看它们是否相等
	 *
	 * @english
	 *
	 * Compare with another point to see whether they are equal.
	 * @param c - point to compare
	 */
	equals(c: Point): boolean;
}
export type JsonSize = {
	width: number;
	height: number;
};
export type ArraySize = [
	number,
	number
];
/**
 * A {@link Size} object
 *
 * @category basic types
 *
 * @example
 * ```ts
 * let size1 = new Size(100, 100);
 * let size2 = [100，100];
 * let size3 = { width: 100, height: 100 };
 * ```
 */
export type SizeLike = Size | JsonSize;
/**
 * 表示一个大小的实现类
 *
 * @english
 * Represents a size.
 * @category basic types
 *
 * @example
 *
 * ```ts
 * const a1 = new Size(1, 2);
 * const a2 = new Size([1, 2]);
 * const a3 = new Size({ width: 1, height: 2 });
 * const a4 = new Size(a3);
 * ```
 */
export declare class Size {
	width: number;
	height: number;
	/**
	 * @param width - width value
	 */
	constructor(width: SizeLike);
	/**
	 * @param width - width value
	 */
	constructor(width: ArraySize);
	/**
	 * @param width - width value
	 * @param height - height value
	 */
	constructor(width: number, height: number);
	/**
	 * 返回 `Size` 的拷贝
	 * @english
	 * Returns a copy of the size
	 */
	copy(): Size;
	/**
	 * @overload
	 *
	 * 返回当前`Size` 与另一个 `Size` 相加的结果
	 *
	 * @english
	 * Returns the result of addition of another size.
	 * @param x - Size
	 * @returns result
	 */
	add(x: Size): Size;
	/**
	 * @overload
	 *
	 * 返回当前`Size` 的 xy 与传入的 xy 相加的结果
	 *
	 * @english
	 * Returns the result of addition of another size.
	 * @param x - x
	 * @param y - y
	 * @returns result
	 */
	add(x: number, y: number): Size;
	/**
	 * 与另一个 `Size` 进行比较，以判断它们是否相等。
	 *
	 * @english
	 * Compare with another size to see whether they are equal.
	 * @param size - size to compare
	 */
	equals(size: Size): boolean;
	/**
	 * 返回当前大小与给定数字相乘的结果，返回一个新的 Size 对象
	 * @english
	 * Returns the result of multiplication of the current size by the given number.
	 * @param ratio - ratio to multi
	 * @returns result
	 */
	multi(ratio: number): Size;
	/**
	 * 返回当前大小与给定数字相乘的结果
	 * @english
	 * Returns the result of multiplication of the current size by the given number.
	 * @param ratio - ratio to multi
	 * @returns result
	 */
	_multi(ratio: number): this;
	_round(): this;
	/**
	 * 将当前 `Size` 对象转为一个点对象 {@link Point}
	 * @english
	 * Converts the size object to a {@link Point}
	 * @returns point
	 */
	toPoint(): Point;
	/**
	 * 将 `Size` 对象转换为数组
	 * @english
	 * Converts the size object to an array [width, height]
	 */
	toArray(): ArraySize;
	/**
	 * 将 `Size` 实例对象转换为 包含 `width` 和 `height` 的 json 对象
	 * @english
	 * Convert the size object to a json object {width : ., height : .}
	 * @returns json
	 */
	toJSON(): JsonSize;
}
declare const EMPTY_STRING = "";
declare function trim(str: string): string;
declare function replaceAll(str: string, key: string, value: string): string;
declare function escapeSpecialChars(str: string): string;
declare function splitWords(chr: string): string[];
declare function stringWidth(text: string, font?: string): number;
declare function stringLength(text: string, font: string, size?: number): Size;
declare function splitContent(content: string, font: string, wrapWidth: number, textWidth: number): any[];
declare function replaceVariable(str: string, props: Object): string;
declare function describeText(textContent: any, symbol: any): {
	total: number;
	size: Size;
	rows: any[];
	rawSize: Size;
};
declare function getAlignPoint(size: Size, horizontalAlignment: string, verticalAlignment: string): Point;
declare const DEFAULT_FONT = "sans-serif";
declare const DEFAULT_TEXTSIZE = 14;
declare function getFont(style: any): any;
declare function splitTextToRow(text: string, style: Object): {
	total: number;
	size: Size;
	rows: any[];
	rawSize: Size;
};
declare function hashCode(s: string): number;
export type Matrix4 = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number
];
export type Matrix4InOut = Matrix4 | number[];
export type Vector3 = [
	number,
	number,
	number
];
export type Vector4 = [
	number,
	number,
	number,
	number
];
export type Vector = Vector3 | Vector4;
declare function perspective(out: Matrix4InOut, fovy: number, aspect: number, near: number, far: number): Matrix4InOut;
declare function translate(out: Matrix4InOut, a: Matrix4InOut, v: Vector): Matrix4InOut;
declare function scale(out: Matrix4InOut, a: Matrix4InOut, v: Vector): Matrix4InOut;
declare function rotateX(out: Matrix4InOut, a: Matrix4InOut, rad: number): Matrix4InOut;
declare function rotateZ(out: Matrix4InOut, a: Matrix4InOut, rad: number): Matrix4InOut;
declare function multiply(out: Matrix4InOut, a: Matrix4InOut, b: Matrix4InOut): Matrix4InOut;
declare function invert(out: Matrix4InOut, a: Matrix4InOut): Matrix4InOut;
declare function identity(out: Matrix4InOut): Matrix4InOut;
declare function copy(out: Matrix4InOut, a: Matrix4InOut): Matrix4InOut;
declare const TRANSFORM: string;
declare const TRANSFORMORIGIN: string;
declare const TRANSITION: string;
declare const CSSFILTER: string;
declare function createEl(tagName: string, className?: string): HTMLElement;
declare function createElOn(tagName: string, style: string, container: HTMLElement): HTMLElement;
declare function removeDomNode(node?: HTMLElement): any;
declare function addDomEvent(obj: HTMLElement | Document, typeArr: string, handler: Function, context?: Object): any;
declare function removeDomEvent(obj: HTMLElement | Document, typeArr: string, handler: Function): any;
declare function listensDomEvent(obj: HTMLElement | Document, type: string, handler: Function): number;
declare function preventDefault(event: Event): any;
declare function stopPropagation(e: Event): any;
declare function preventSelection(dom: any): any;
declare function offsetDom(dom: HTMLElement, offset?: Point): Point;
declare function computeDomPosition(dom: HTMLElement): number[];
declare function getEventContainerPoint(ev: MouseEvent | TouchEvent, dom: HTMLElement): Point;
declare function setStyle(dom: HTMLElement, strCss: string): any;
declare function hasClass(el: HTMLElement, name: string): boolean;
declare function addClass(el: HTMLElement, name: string): any;
declare function setClass(el: HTMLElement, name: string): any;
declare function getClass(el: HTMLElement): string;
declare function setOpacity(el: HTMLElement, value: string): any;
declare function setTransform(el: HTMLElement, offset: Point): any;
declare function setTransformMatrix(el: any, m: any): any;
declare function removeTransform(el: any): any;
declare function isHTML(str: string): boolean;
declare function measureDom(parentTag: any, dom: any): Size;
declare function getDomRuler(tag: any): any;
declare const on: typeof addDomEvent;
declare const off: typeof removeDomEvent;
declare function isMoveEvent(type?: string): boolean;
declare const MOUSEMOVE_THROTTLE_TIME = 48;
declare function isMousemoveEventBlocked(target: HTMLElement | any, mousemoveThrottleTime: number): boolean;
declare function loadGeoSymbol(symbol: any, geo: any): any;
export type BBOX = [
	number,
	number,
	number,
	number
];
declare function getDefaultBBOX(): BBOX;
declare const BBOX_TEMP: BBOX;
declare function resetBBOX(bbox: BBOX): void;
declare function pointsBBOX(points: Coordinate, out: BBOX): void;
declare function pointsBBOX(points: Coordinate[], out: BBOX): void;
declare function setBBOX(bbox: BBOX, x1?: number | BBOX, y1?: number, x2?: number, y2?: number): void;
declare function validateBBOX(bbox?: BBOX): boolean;
declare function bufferBBOX(bbox: BBOX, bufferSize?: number): void;
declare function bboxIntersect(bbox1: BBOX, bbox2: BBOX): boolean;
declare function bboxInBBOX(bbox1: BBOX, bbox2: BBOX): boolean;
declare function bboxInMask(bbox: BBOX, maskGeoJSON: Record<string, any>): boolean;
export type ResourceUrl = string | string[];
declare class ResourceCache {
	resources: any;
	constructor();
	addResource(url: [
		string,
		number | string,
		number | string
	], img: any): void;
	isResourceLoaded(url: ResourceUrl, checkSVG?: boolean): boolean;
	login(url: string): void;
	logout(url: string): void;
	getImage(url: ResourceUrl): any;
	markErrorResource(url: ResourceUrl): void;
	merge(res: any): this;
	forEach(fn: (key: string, value: any) => void): this;
	remove(): void;
}
export declare function getResouceCacheInstance(): ResourceCache;
declare class Plane {
	normal: Vector3;
	constant: number;
	constructor(normal: Vector3, constant: number);
	distanceToPoint(point: any): number;
}
declare class Ray {
	origin: [
		number,
		number,
		number
	];
	direction: [
		number,
		number,
		number
	];
	constructor(from: Vector3, to: Vector3);
	setFromTo(from: Vector3, to: Vector3): void;
	distanceToPlane(plane: Plane): number;
	intersectGround(target: Vector3): Vector3;
	distanceToGround(): number;
	intersectPlane(plane: Plane, target: Vector3): Vector3;
	intersectBox(box: any, target: Vector3): Vector3;
	intersectTriangle(a: any, b: any, c: any, backfaceCulling: any, target: any): Vector3;
	at(t: any, target: any): Vector3;
}
export type runFunction = () => any;
export type TaskCreateItem = runFunction | {
	count?: number;
	run: runFunction;
};
declare function runTaskAsync(task: TaskCreateItem): Promise<any>;
declare function startTasks(): void;
declare function pushLoopHook(func: any): void;
export declare class LRUCache {
	max: number;
	onRemove: Function;
	data: any;
	constructor(max: number, onRemove?: Function);
	reset(): this;
	clear(): void;
	add(key: any, data: any): this;
	keys(): any[];
	shrink(): void;
	has(key: any): any;
	getAndRemove(key: any): any;
	get(key: any): any;
	remove(key: any): this;
	setMaxSize(max: any): this;
}
export type Callback = (...params: any[]) => any;
/**
 * @classdesc
 * Ajax Utilities. It is static and should not be initiated.
 * @class
 * @static
 * @category core
 */
export declare const Ajax: {
	/**
	 * Get JSON data by jsonp
	 * from https://gist.github.com/gf3/132080/110d1b68d7328d7bfe7e36617f7df85679a08968
	 * @param url - resource url
	 * @param callback  - callback function when completed
	 */
	jsonp: (url: string, callback: Callback) => any;
	/**
	 * Fetch remote resource by HTTP "GET" method
	 * @param  {String}   url - resource url
	 * @param  {Object}   [options=null] - request options
	 * @param  {Object}   [options.headers=null] - HTTP headers
	 * @param  {String}   [options.responseType=null] - responseType
	 * @param  {String}   [options.credentials=null]  - if with credentials, set it to "include"
	 * @param  {Function} cb  - callback function when completed
	 * @return {Ajax}  Ajax
	 * @example
	 * maptalks.Ajax.get(
	 *     'url/to/resource',
	 *     (err, data) => {
	 *         if (err) {
	 *             throw new Error(err);
	 *         }
	 *         // do things with data
	 *     }
	 * );
	 */
	get: (url: string, options?: any, cb?: any) => any;
	/**
	 * Fetch remote resource by HTTP "POST" method
	 * @param  {String}   url - resource url
	 * @param  {Object}   options - request options
	 * @param  {String|Object}  options.postData - post data
	 * @param  {Object}   [options.headers=null]  - HTTP headers
	 * @param  {Function} cb  - callback function when completed
	 * @return {Ajax}  Ajax
	 * @example
	 * maptalks.Ajax.post(
	 *   'url/to/post',
	 *   {
	 *     postData : {
	 *       'param0' : 'val0',
	 *       'param1' : 1
	 *     }
	 *   },
	 *   (err, data) => {
	 *     if (err) {
	 *       throw new Error(err);
	 *     }
	 *     // do things with data
	 *   }
	 * );
	 */
	post: (url: string, options?: any, cb?: Callback) => any;
	_wrapCallback: (client: any, cb: Callback) => () => void;
	_getClient: (cb: Callback) => any;
	/**
	 * Fetch resource as arraybuffer.
	 * @param {String} url    - url
	 * @param {Object} [options=null] - options, same as Ajax.get
	 * @param {Function} cb   - callback function when completed.
	 * @example
	 * maptalks.Ajax.getArrayBuffer(
	 *     'url/to/resource.bin',
	 *     (err, data) => {
	 *         if (err) {
	 *             throw new Error(err);
	 *         }
	 *         // data is a binary array
	 *     }
	 * );
	 */
	getArrayBuffer(url: string, options: any, cb: Callback): any;
	getImage(img: any, url: string, options: any): any;
	getJSON: (url: string, options?: any, cb?: Callback) => any;
};
/**
 * 表示二维表面上的边界框，即具有最小点和最大点的矩形区域。 <br>
 * 有多种方法可以创建 PointExtent：
 *
 * @english
 * Represent a bounding box on 2d surface , a rectangular area with minimum and maximum points. <br>
 * There are serveral ways to create a PointExtent:
 * @category basic types
 * @example
 *
 * ```ts
 * // with 4 numbers
 * var extent = new PointExtent(100, 10, 120, 20);
 *
 * // with 2 points
 * var extent = new PointExtent(new Point(100, 10), new Point(120, 20));
 *
 * // with a json object containing xmin, ymin, xmax and ymax
 * var extent = new PointExtent({xmin : 100, ymin: 10, xmax: 120, ymax:20});
 *
 * var extent1 = new PointExtent(100, 10, 120, 20);
 * // with another extent
 * var extent2 = new PointExtent(extent1);
 * ```
 */
export declare class PointExtent extends Extent {
	constructor(p1?: WithNull<ExtentLike>, p?: Projection);
	constructor(p1: PositionType, p2: PositionType, p?: Projection);
	constructor(p1: number, p2: number, p3: number, p4: number, p?: Projection);
}
export type Projection = any;
export type PositionType = Point | Coordinate;
export type ArrayExtent = [
	number,
	number,
	number,
	number
];
export type JsonExtent = {
	xmin: number;
	xmax: number;
	ymin: number;
	ymax: number;
};
export type ExtentLike = Extent | JsonExtent | ArrayExtent;
/**
 * 表示地图上的边界框，即具有最小和最大坐标的矩形地理区域。 <br>
 * 有多种方法可以创建范围：
 *
 * @english
 *
 * Represent a bounding box on the map, a rectangular geographical area with minimum and maximum coordinates. <br>
 * There are serveral ways to create a extent:
 * @category basic types
 * @example
 *
 * ```ts
 * //with 4 numbers: xmin, ymin, xmax and ymax
 * var extent = new Extent(100, 10, 120, 20);
 *
 * //with 2 coordinates
 * var extent = new Extent(new Coordinate(100, 10), new Coordinate(120, 20));
 *
 * //with a json object containing xmin, ymin, xmax and ymax
 * var extent = new Extent({xmin : 100, ymin: 10, xmax: 120, ymax:20});
 *
 * var extent1 = new Extent(100, 10, 120, 20);
 * //with another extent
 * var extent2 = new Extent(extent1);
 * ```
 */
export declare class Extent {
	_clazz: typeof Coordinate | typeof Point;
	_dirty: boolean;
	projection: any;
	xmin: WithNull<number>;
	xmax: WithNull<number>;
	ymin: WithNull<number>;
	ymax: WithNull<number>;
	pxmin: number;
	pxmax: number;
	pymin: number;
	pymax: number;
	left?: number;
	right?: number;
	top?: number;
	bottom?: number;
	antiMeridian?: boolean;
	constructor(p1?: WithNull<ExtentLike>, p?: Projection);
	constructor(p1: PositionType, p2: PositionType, p?: Projection);
	constructor(p1: number, p2: number, p3: number, p4: number, p?: Projection);
	_initialize(p1: WithNull<ExtentLike>): void;
	_initialize(p1: PositionType, p2: PositionType): void;
	_initialize(p1: number, p2: number, p3: number, p4: number): void;
	/**
	 * 与坐标或点相加, 会改变原数据
	 *
	 * @english
	 *
	 * Add the extent with a coordinate or a point.
	 * @returns a new extent
	 * @param p
	 */
	_add(p: Extent): this;
	_add(p: PointExtent): this;
	_add(p: PositionType): this;
	_add(p: number[]): this;
	/**
	 * 与坐标或点相加, 返回一个新的 extent
	 *
	 * @english
	 *
	 * Add the extent with a coordinate or a point.
	 * @returns a new extent
	 * @param p
	 */
	add(p: Extent): this;
	add(p: PointExtent): this;
	add(p: PositionType): this;
	add(p: number[]): this;
	/**
	 * 缩放当前 extent
	 *
	 * @english
	 *
	 * scale extent
	 *
	 * @param s
	 */
	_scale(s: number): this;
	/**
	 * 当前范围减去 coordinate、point 或者 extent（改变原数据）
	 *
	 * @english
	 *
	 * Substract the extent with a coordinate or a point.
	 * @param p
	 */
	_sub(p: [
		number,
		number
	]): this;
	_sub(p: PositionType): this;
	_sub(p: Extent | PointExtent): this;
	/**
	 * _sub 的别名
	 *
	 * @english
	 *
	 * Alias for _sub
	 * @param p
	 */
	_substract(p: [
		number,
		number
	]): this;
	_substract(p: PositionType): this;
	_substract(p: Extent | PointExtent): this;
	/**
	 * 当前范围减去 coordinate 或者 point
	 *
	 * @english
	 *
	 * Substract the extent with a coordinate or a point.
	 * @returns a new extent
	 * @param p
	 */
	sub(p: [
		number,
		number
	]): this;
	sub(p: PositionType): this;
	sub(p: Extent | PointExtent): this;
	/**
	 * sub 的别名
	 *
	 * @english
	 *
	 * Alias for sub
	 * @returns a new extent
	 * @param p
	 */
	substract(p: [
		number,
		number
	]): this;
	substract(p: PositionType): this;
	substract(p: Extent | PointExtent): this;
	/**
	 * 对 Extent 边界值进行四舍五入，返回一个新的 Extent
	 *
	 * @english
	 *
	 * Round the extent
	 * @returns rounded extent
	 */
	round(): PointExtent | Extent;
	/**
	 * 对当前 Extent 边界值进行四舍五入
	 *
	 * @english
	 *
	 * Round the extent
	 * @returns rounded extent
	 */
	_round(): this;
	/**
	 * 获取 Extent 的最小点
	 *
	 * @english
	 * Get the minimum point
	 * @params [out=undefined] - optional point to receive result
	 */
	getMin(out?: Point): Point;
	getMin(out?: Coordinate): Coordinate;
	/**
	 * 获取 Extent 的最大点
	 *
	 * @english
	 * Get the maximum point
	 * @params [out=undefined] - optional point to receive result
	 */
	getMax(out?: Point): Point;
	getMax(out?: Coordinate): Coordinate;
	/**
	 * 获取 Extent 的中心点
	 *
	 * @english
	 * Get center of the extent.
	 * @params [out=undefined] - optional point to receive result
	 */
	getCenter(out?: PositionType): PositionType;
	/**
	 * 检查 Extent 是否有效
	 *
	 * @english
	 * Whether the extent is valid
	 * @protected
	 */
	isValid(): boolean;
	/**
	 * 与另一个 extent 进行比较它们是否相等
	 *
	 * @english
	 *
	 * Compare with another extent to see whether they are equal.
	 * @param ext2 - extent to compare
	 */
	equals(ext2: Extent | PointExtent): boolean;
	/**
	 * 是否与另一个范围相交
	 * @english
	 *
	 * Whether it intersects with another extent
	 * @param ext2 - another extent
	 */
	intersects(ext2: Extent | PointExtent): boolean;
	/**
	 * 判断当前 extent 是否在其他 extent 范围内
	 * @english
	 *
	 * Whether the extent is within another extent
	 * @param extent - another extent
	 */
	within(extent: Extent | PointExtent): boolean;
	/**
	 * 该范围是否包含输入点
	 * @english
	 * Whether the extent contains the input point.
	 * @param c - input point
	 */
	contains(c: CoordinateLike): boolean;
	/**
	 * 获取Extent的宽度
	 *
	 * @english
	 * Get the width of the Extent
	 */
	getWidth(): number;
	/**
	 * 获取Extent的高度
	 *
	 * @english
	 * Get the height of the Extent
	 */
	getHeight(): number;
	/**
	 * 获取Extent的大小 - 高度和宽度构造的 Size 对象
	 *
	 * @english
	 * Get size of the Extent
	 */
	getSize(): Size;
	/**
	 * 设置 extent 的边界值
	 *
	 * @english
	 *
	 * set extent value
	 *
	 * @param xmin
	 * @param ymin
	 * @param xmax
	 * @param ymax
	 */
	set(xmin: WithNull<number>, ymin: WithNull<number>, xmax: WithNull<number>, ymax: WithNull<number>): this;
	__combine(extent: PositionType | Extent | PointExtent): number[];
	/**
	 * 与其他 extent 合并
	 * @english
	 * Combine it with another extent to a larger extent.
	 * @param extent - extent/coordinate/point to combine into
	 * @returns extent combined
	 */
	_combine(extent: PositionType | Extent | PointExtent): this;
	/**
	 * 与其他 extent 合并到一个更大的 extent，返回一个新 extent
	 * @english
	 * Combine it with another extent to a larger extent.
	 * @param extent - extent/coordinate/point to combine into
	 * @returns extent combined
	 */
	combine(extent: PositionType | Extent | PointExtent): any;
	/**
	 * 获取当前 extent 与另一个 extent 的交集范围
	 *
	 * @english
	 *
	 * Gets the intersection extent of this and another extent.
	 * @param extent - another extent
	 * @returns intersection extent
	 */
	intersection(extent: Extent | PointExtent): any;
	/**
	 * 扩大 extent，返回一个新 Extent
	 * @english
	 *
	 * Expand the extent by distance
	 * @param distance  - distance to expand
	 * @returns a new extent expanded from
	 */
	expand(distance: number | Size): PointExtent | Extent;
	/**
	 * 扩大 extent
	 * @english
	 * Expand the extent by distance
	 * @param distance  - distance to expand
	 */
	_expand(distance: number | Size): this;
	/**
	 * 获取 extent 的 JSON 对象。
	 *
	 * @english
	 * Get extent's JSON object.
	 * @returns jsonObject
	 * @example
	 *
	 * ```ts
	 * // {xmin : 100, ymin: 10, xmax: 120, ymax:20}
	 * var json = extent.toJSON();
	 * ```
	 */
	toJSON(): JsonExtent;
	/**
	 * 获取extent矩形区域的坐标数组，包含5个坐标，第一个坐标与最后一个坐标相等。
	 * @english
	 * Get a coordinate array of extent's rectangle area, containing 5 coordinates in which the first equals with the last.
	 * @returns coordinates array
	 */
	toArray(out?: PositionType[]): PositionType[];
	/**
	 * 获取 extent 的 xmin、ymin、xmax、ymax 组成的字符串
	 *
	 * @english
	 *
	 * Get the string consisting of xmin, ymin, xmax, and ymax of extent
	 */
	toString(): string;
	/**
	 * 复制 extent
	 *
	 * @english
	 *
	 * Get a copy of the extent.
	 * @returns copy
	 */
	copy(): PointExtent | Extent;
	/**
	 * 转换到新的 extent
	 *
	 * @english
	 *
	 * Convert to a new extent
	 * @param fn convert function on each point
	 * @param out temp out
	 */
	convertTo(fn: (p: Point) => Point, out?: Extent | PointExtent): Extent | PointExtent;
	convertTo(fn: (p: Coordinate) => Coordinate, out?: Extent | PointExtent): Extent | PointExtent;
	/**
	 * 计算给定 Extent 的投影范围
	 *
	 * @english
	 *
	 * Calculate the projected range of the given Extent
	 * @param ext extent
	 */
	_project(ext: Extent | PointExtent): void;
}
/**
 * 碰撞检测的实现思路：
 * 1. 选择 collsionIndex
 *    1.1 如果 collision scope 是 layer，则在layer上创建
 *    1.2 如果 collision scope 是 map, 则直接使用map的collisionIndex
 * 2. painter中查询collisionIndex中是否有命中
 *   2.1 如果有，则从 elements 中删除当前item
 *   2.2 如果没有，如果需要的，insert到collisionIndex中
 */
export declare class CollisionIndex {
	constructor();
	/**
	 * Test if given box is collided with any other
	 * @param {Number[]} box - [minx, miny, maxx, maxy]
	 * @returns {Boolean}
	 */
	collides(box: any): any;
	/**
	 * Insert box in collision index
	 * @param {Number[]} box - [minx, miny, maxx, maxy]
	 * @returns {CollisionIndex} this
	 */
	insertBox(box: any): this;
	/**
	 * Bulk insert boxes in collision index
	 * Powered by rbush, it will perform better in subsquent query
	 * @param {Number[][]} boxes - [[minx, miny, maxx, maxy], ...]
	 * @returns {CollisionIndex} this
	 */
	bulkInsertBox(boxes: any): this;
	/**
	 * Clear the collision index
	 * @returns {CollisionIndex} this
	 */
	clear(): this;
}
export type FunctionTypeExponential = {
	stops: Array<Array<number>>;
	base?: number;
	property?: string;
	default?: number;
	type: "exponential";
};
export type FunctionTypeIdentity = {
	property: string;
	default?: any;
	type: "identity";
};
export type FunctionTypeInterval = {
	stops: Array<[
		number,
		any
	]>;
	property?: string;
	default?: any;
	type: "interval";
};
export type FunctionTypeCategorical = {
	stops: Array<[
		number,
		any
	]>;
	property?: string;
	default?: any;
	type: "categorical";
};
export type FunctionTypeColor_Interpolate = {
	stops: Array<[
		number,
		string
	]>;
	property?: string;
	default?: any;
	type: "color-interpolate";
};
export type SymbolBooleanType = boolean | FunctionTypeIdentity | FunctionTypeInterval | FunctionTypeCategorical;
export type SymbolNumberType = number | FunctionTypeExponential | FunctionTypeIdentity | FunctionTypeInterval | FunctionTypeCategorical;
export type SymbolColorType = string | Array<number> | FunctionTypeColor_Interpolate | FunctionTypeIdentity | FunctionTypeInterval | FunctionTypeCategorical;
export type SymbolCommon = {
	visible?: SymbolBooleanType;
	opacity?: SymbolNumberType;
	shadowBlur?: SymbolNumberType;
	shadowColor?: SymbolColorType;
	shadowOffsetX?: SymbolNumberType;
	shadowOffsetY?: SymbolNumberType;
};
export type MarkerCommonSymbol = {
	markerOpacity?: SymbolNumberType;
	markerWidth?: SymbolNumberType;
	markerHeight?: SymbolNumberType;
	markerDx?: SymbolNumberType;
	markerDy?: SymbolNumberType;
	markerHorizontalAlignment?: "left" | "middle" | "right";
	markerVerticalAlignment?: "top" | "middle" | "bottom";
	markerPlacement?: "center" | "point" | "vertex" | "line" | "vertex-first" | "vertex-last" | "vertex-firstlast";
	markerRotation?: number;
};
export type FileMarkerSymbol = {
	markerFile: string;
} & MarkerCommonSymbol & SymbolCommon;
export type VectorMarkerSymbol = {
	markerType: "ellipse" | "cross" | "x" | "diamond" | "bar" | "square" | "rectangle" | "roundrectangle" | "triangle" | "pin" | "pie";
	markerFill?: SymbolColorType;
	markerFillPatternFile?: string;
	markerFillOpacity?: number;
	markerLineColor?: SymbolColorType;
	markerLineWidth?: number;
	markerLineOpacity?: number;
	markerLineDasharray?: Array<number>;
	markerLinePatternFile?: string;
} & MarkerCommonSymbol & SymbolCommon;
export type SVGPathItem = {
	path: string;
	fill?: string;
};
export type PathMarkerSymbol = {
	markerType: "path";
	markerPath: string | Array<SVGPathItem>;
	markerPathWidth: number;
	markerPathHeight: number;
} & MarkerCommonSymbol & SymbolCommon;
export type TextSymbol = {
	textName?: string;
	textPlacement?: "point" | "vertex" | "line" | "vertex-first" | "vertex-last";
	textSpacing?: number;
	textFaceName?: string;
	textFont?: string;
	textWeight?: string;
	textStyle?: string;
	textSize?: SymbolNumberType;
	textFill?: SymbolColorType;
	textOpacity?: SymbolNumberType;
	textHaloFill?: SymbolColorType;
	textHaloRadius?: SymbolNumberType;
	textHaloOpacity?: SymbolNumberType;
	textWrapWidth?: number;
	textWrapCharacter?: string;
	textLineSpacing?: number;
	textHorizontalAlignment?: "left" | "middle" | "right";
	textVerticalAlignment?: "top" | "middle" | "bottom";
	textAlign?: "left" | "right" | "center";
	textRotation?: number;
	textDx?: SymbolNumberType;
	textDy?: SymbolNumberType;
};
export type LineSymbol = {
	lineColor?: SymbolColorType;
	lineWidth?: SymbolNumberType;
	lineDasharray?: Array<number>;
	lineOpacity?: SymbolNumberType;
	lineJoin?: "round" | "bevel" | "miter";
	lineCap?: "butt" | "round" | "square";
	linePatternFile?: string;
	lineDx?: SymbolNumberType;
	lineDy?: SymbolNumberType;
	lineGradientProperty?: string;
	lineStrokeColor?: SymbolColorType;
	lineStrokeWidth?: SymbolNumberType;
};
export type FillSymbol = {
	polygonFill?: SymbolColorType;
	polygonOpacity?: SymbolNumberType;
	polygonPatternFile?: string;
} & LineSymbol;
export type AnyMarkerSymbol = FileMarkerSymbol | VectorMarkerSymbol | PathMarkerSymbol | TextSymbol;
export type AnySymbol = FillSymbol | LineSymbol | TextSymbol | FileMarkerSymbol | VectorMarkerSymbol | PathMarkerSymbol;
export type Ctx = CanvasRenderingContext2D;
export declare const Canvas: {
	/**
	 * 临时canvas,用于图层的事件使用,主要用于getImageData
	 * @returns
	 */
	getTempCanvas(): HTMLCanvasElement;
	getCanvas2DPerformanceContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D;
	getCanvas2DContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D;
	setHitTesting(testing: boolean): void;
	createCanvas(width: number, height: number, canvasClass?: any): any;
	prepareCanvasFont(ctx: Ctx, style: TextSymbol, font?: string): void;
	/**
	 * Set canvas's fill and stroke style
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Object} style
	 * @param {Object} resources
	 * @param {Boolean} testing  - paint for testing, ignore stroke and fill patterns
	 */
	prepareCanvas(ctx: Ctx, style: any, resources: any, testing?: boolean): void;
	_createGradient(ctx: Ctx, g: any, extent: Extent): any;
	_setStrokePattern(ctx: Ctx, strokePattern: string, strokeWidth: number, linePatternOffset: number, resources: any): void;
	clearRect(ctx: Ctx, x1: number, y1: number, x2: number, y2: number): void;
	fillCanvas(ctx: Ctx, fillOpacity: number, x?: number, y?: number): void;
	getRgba(color: string, op: number): string;
	normalizeColorToRGBA(fill: number[], opacity?: number): string;
	image(ctx: Ctx, img: CanvasImageSource, x: number, y: number, width?: number, height?: number): void;
	text(ctx: Ctx, text: any, pt: any, style: any, textDesc: any): BBOX;
	_textOnMultiRow(ctx: Ctx, texts: any[], style: any, point: any, splitTextSize: Size, textSize: Size): BBOX;
	_textOnLine(ctx: Ctx, text: any, pt: any, textHaloRadius: number, textHaloFill: any, textHaloAlpha: number): void;
	fillText(ctx: any, text: any, pt: any, rgba?: any): void;
	textAlongLine(ctx: Ctx, text: string, paths: Array<Array<Point>>, style: any, textDesc: any, globalCollisonIndex: CollisionIndex): BBOX;
	_stroke(ctx: any, strokeOpacity: any, x?: any, y?: any): void;
	/**
	 * mock gradient path
	 * 利用颜色插值来模拟渐变的Path
	 * @param ctx
	 * @param points
	 * @param lineDashArray
	 * @param lineOpacity
	 * @param isRing
	 * @returns
	 */
	_gradientPath(ctx: CanvasRenderingContext2D, points: any, lineDashArray: any, lineOpacity: any, isRing?: boolean): void;
	_path(ctx: any, points: any, lineDashArray?: any, lineOpacity?: any, ignoreStrokePattern?: any): void;
	path(ctx: CanvasRenderingContext2D, points: any, lineOpacity: any, fillOpacity?: any, lineDashArray?: any): void;
	roundRect(ctx: CanvasRenderingContext2D, points: Array<Point>, lineOpacity?: number, fillOpacity?: number): void;
	_multiClip(ctx: any, points: any): void;
	polygon(ctx: any, points: any, lineOpacity: any, fillOpacity: any, lineDashArray?: any, smoothness?: any): void;
	_ring(ctx: any, ring: any, lineDashArray: any, lineOpacity: any, ignorePattern?: any): void;
	paintSmoothLine_bak(ctx: any, points: any, lineOpacity: any, smoothValue: any, close: any, tailIdx?: any, tailRatio?: any): void;
	paintSmoothLine(ctx: CanvasRenderingContext2D, points: Array<Point>, lineOpacity: number, smoothValue: boolean, close: boolean, tailIdx?: number, tailRatio?: number): void;
	/**
	 * draw an arc from p1 to p2 with degree of (p1, center) and (p2, center)
	 * @param  {Context} ctx    canvas context
	 * @param  {Point} p1      point 1
	 * @param  {Point} p2      point 2
	 * @param  {Number} degree arc degree between p1 and p2
	 */
	_arcBetween(ctx: CanvasRenderingContext2D, p1: Point, p2: Point, degree: number): number[];
	_lineTo(ctx: CanvasRenderingContext2D, p: any): void;
	bezierCurveAndFill(ctx: CanvasRenderingContext2D, points: any, lineOpacity: any, fillOpacity: any): void;
	_bezierCurveTo(ctx: CanvasRenderingContext2D, p1: any, p2: any, p3: any): void;
	ellipse(ctx: CanvasRenderingContext2D, pt: any, width: any, heightTop: any, heightBottom: any, lineOpacity: any, fillOpacity: any): void;
	rectangle(ctx: CanvasRenderingContext2D, pt: any, size: any, lineOpacity: any, fillOpacity: any): void;
	sector(ctx: CanvasRenderingContext2D, pt: any, size: any, angles: any, lineOpacity: any, fillOpacity: any): void;
	_isPattern(style: any): boolean;
	drawCross(ctx: CanvasRenderingContext2D, x: number, y: number, lineWidth: number, color: string | CanvasGradient | CanvasPattern): void;
	copy(canvas: HTMLCanvasElement, c?: HTMLCanvasElement): HTMLCanvasElement;
	pixelRect(ctx: CanvasRenderingContext2D, point: number[], lineOpacity: number, fillOpacity: number): void;
};
export type ClassOptions = Record<string, any>;
/**
 *
 * 基类（Class）
 * 该库中所有的类都继承于该基类。
 * 该类提供了定义新类时常用的工具方法，如管理配置options，添加 init hooks 等。
 *
 * @english
 * This library uses ES2015 class system.
 * Class is the root class of class hierachy.
 * It provides utility methods to make it easier to manage configration options, merge mixins and add init hooks.
 *
 * @example
 * const defaultOptions = {
 *     'foo' : 'bar'
 * };
 * class Foo extends maptalks.Class {
 *     constructor(id, options) {
 *         super(options);
 *         this.setId(id);
 *     }
 *
 *     setId(id) {
 *         this.id = id;
 *     }
 *
 *     whenCreated() {
 *         // .....
 *     }
 * }
 *
 * Foo.mergeOptions(defaultOptions);
 *
 * Foo.addInitHook('whenCreated');
 * @category core
 */
export declare class Class {
	options?: ClassOptions;
	/**
	 *
	 * @english
	 * Create an object, set options if given and call all the init hooks.<br />
	 * Options is where the object manages its configuration. Options passed to the object will be merged with parent's instead of overriding it.
	 *
	 * @param options - options to set
	 */
	constructor(options?: ClassOptions);
	proxyOptions(): this;
	/**
	 * 遍历并执行该类或父类用 addInitHook 添加的 init hooks
	 *
	 * @english
	 * Visit and call all the init hooks defined on Class and its parents.
	 */
	callInitHooks(): this;
	/**
	 * 设置新的配置 options
	 *
	 * @english
	 * Merges options with the default options of the object.
	 * @param options - options to set
	 */
	_setOptions(options: ClassOptions): this;
	setOptions(options: ClassOptions): this;
	/**
	 *
	 * 更新options中指定的配置项。
	 * 1. 如果没有提供参数，则返回options配置对象
	 * 2. 如果配置项有对应的handler，handler会被启用或停用，例如draggable
	 *
	 * @english
	 * 1. Return object's options if no parameter is provided. <br/>
	 * 2. update an option and enable/disable the handler if a handler with the same name existed.
	 *
	 * @example
	 * // Get marker's options;
	 * const options = marker.config();
	 * // Set map's option "draggable" to false and disable map's draggable handler.
	 * map.config('draggable', false);
	 * // You can update more than one options like this:
	 * map.config({
	 *     'scrollWheelZoom' : false,
	 *     'doubleClickZoom' : false
	 * });
	 * @param conf - config to update
	 * @return
	 */
	config(conf?: string | ClassOptions, value?: any): ClassOptions | this;
	/**
	 * options被更新时的回调函数
	 *
	 * @english
	 * Default callback when config is called
	 *
	 * @param conf - updated options
	 */
	onConfig(conf: ClassOptions): void;
	/**
	 * 添加一个初始化钩子（init hook）方法，实例化时会被调用。
	 * 该方法一般用于插件开发，利用初始化钩子，子类无需重载父类的构造函数（constructor），就可以在实例化时执行一些必要的逻辑
	 *
	 * @english
	 * Add an init hook, which will be called when the object is initiated. <br>
	 * It is useful in plugin developing to do things when creating objects without changing class's constructor.
	 * @param fn - a hook function or name of the hook function
	 * @param args - arguments for the init hook function
	 */
	static addInitHook(fn: Function | string, ...args: any[]): typeof Class;
	/**
	 * 将一个或多个，sources中定义的方法或属性，mixin到该类的prototype中
	 *
	 * @english
	 * Mixin the specified objects into the class as prototype properties or methods.
	 * @param sources - objects to mixin
	 */
	static include(...sources: any[]): typeof Class;
	/**
	 * 用参数中的options定义扩展默认的options
	 *
	 * @english
	 * Mixin options with the class's default options.
	 * @param options - options to merge.
	 */
	static mergeOptions(options: ClassOptions): typeof Class;
}
export type MixinConstructor = new (...args: any[]) => {};
export type HandlerContext = {
	handler: HandlerFn;
	context: any;
};
export type EventRecords = Record<string, HandlerFn>;
export type BaseEventParamsType = {
	type?: string;
	target?: any;
	[propName: string]: any;
};
export type HandlerFnResultType = {
	type: string;
	target: any;
	[propName: string]: any;
};
export type HandlerFn = (result?: HandlerFnResultType) => void | boolean;
declare function _default<T extends MixinConstructor>(Base: T): {
	new (...args: any[]): {
		_eventMap?: Record<string, HandlerContext[]>;
		_eventParent?: any;
		_eventTarget?: any;
		/**
		 * 注册事件的监听
		 *
		 * @english
		 * Register a handler function to be called whenever this event is fired.
		 *
		 * @param eventsOn           - event types to register, seperated by space if more than one.
		 * @param handler            - handler function to be called
		 * @param context            - the context of the handler
		 * @example
		 * foo.on('mousedown mousemove mouseup', onMouseEvent, foo);
		 */
		on(eventsOn: string | EventRecords, handler: HandlerFn, context?: any): any;
		/**
		 * on方法的alias
		 *
		 * @english
		 * Alias for [on]{@link Eventable.on}
		 *
		 * @param eventTypes     - event types to register, seperated by space if more than one.
		 * @param handler        - handler function to be called
		 * @param context        - the context of the handler
		 */
		addEventListener(...args: any[]): any;
		/**
		 * 与on方法作用类似，但监听方法只会执行一次
		 *
		 * @english
		 * Same as on, except the listener will only get fired once and then removed.
		 *
		 * @param eventTypes         - event types to register, seperated by space if more than one.
		 * @param handler            - listener handler
		 * @param context            - the context of the handler
		 * @example
		 * foo.once('mousedown mousemove mouseup', onMouseEvent, foo);
		 */
		once(eventTypes: string | EventRecords, handler: HandlerFn, context?: any): any;
		/**
		 *
		 * 取消对事件的监听
		 *
		 * @english
		 * Unregister the event handler for the specified event types.
		 *
		 * @param eventsOff         - event types to unregister, seperated by space if more than one.
		 * @param handler           - listener handler
		 * @param context           - the context of the handler
		 * @example
		 * foo.off('mousedown mousemove mouseup', onMouseEvent, foo);
		 */
		off(eventsOff: string | EventRecords, handler: HandlerFn, context?: any): any;
		/**
		 * off方法的别名 alias
		 *
		 * @english
		 * Alias for [off]{@link Eventable.off}
		 *
		 * @param eventTypes       - event types to unregister, seperated by space if more than one.
		 * @param handler          - listener handler
		 * @param context          - the context of the handler
		 */
		removeEventListener(...args: any[]): any;
		/**
		 * 是否监听了指定的事件
		 *
		 * @english
		 * Returns listener's count registered for the event type.
		 *
		 * @param eventType       - an event type
		 * @param hanlder         - listener function
		 * @param context         - the context of the handler
		 */
		listens(eventType: string, handler?: HandlerFn, context?: any): number;
		/**
		 * 返回所有监听的事件
		 * @english
		 * Get all the listening event types
		 */
		getListeningEvents(): string[];
		/**
		 * 把事件监听拷贝给给定的目标对象
		 * @english
		 * Copy all the event listener to the target object
		 * @param target - target object to copy to.
		 */
		copyEventListeners(target: any): any;
		/**
		 * 触发一个事件，并执行所有监听该事件的handler方法
		 *
		 * @english
		 * Fire an event, causing all handlers for that event name to run.
		 *
		 * @param  eventType - an event type to fire
		 * @param  param     - parameters for the listener function.
		 */
		fire(eventType: string, param?: BaseEventParamsType): any;
		_wrapOnceHandler(evtType: string, handler: HandlerFn, context?: any): (...args: any[]) => void;
		_switch(to: string, eventRecords: EventRecords, context?: any): any;
		_clearListeners(eventType: string): void;
		_clearAllListeners(): void;
		/**
		 * 设置一个事件父级对象，用来代替执行所有的事件监听
		 *
		 * @english
		 * Set a event parent to handle all the events
		 * @param parent - event parent
		 * @private
		 * @internal
		 */
		_setEventParent(parent: any): any;
		_setEventTarget(target: any): any;
		_fire(eventType: string, param: BaseEventParamsType): any;
	};
} & T;
declare class Base {
}
declare const GlobalEventable_base: {
	new (...args: any[]): {
		_eventMap?: Record<string, {
			handler: HandlerFn;
			context: any;
		}[]>;
		_eventParent?: any;
		_eventTarget?: any;
		on(eventsOn: string | EventRecords, handler: HandlerFn, context?: any): any;
		addEventListener(...args: any[]): any;
		once(eventTypes: string | EventRecords, handler: HandlerFn, context?: any): any;
		off(eventsOff: string | EventRecords, handler: HandlerFn, context?: any): any;
		removeEventListener(...args: any[]): any;
		listens(eventType: string, handler?: HandlerFn, context?: any): number;
		getListeningEvents(): string[];
		copyEventListeners(target: any): any;
		fire(eventType: string, param?: BaseEventParamsType): any;
		_wrapOnceHandler(evtType: string, handler: HandlerFn, context?: any): (...args: any[]) => void;
		_switch(to: string, eventRecords: EventRecords, context?: any): any;
		_clearListeners(eventType: string): void;
		_clearAllListeners(): void;
		_setEventParent(parent: any): any;
		_setEventTarget(target: any): any;
		_fire(eventType: string, param: BaseEventParamsType): any;
	};
} & typeof Base;
declare class GlobalEventable extends GlobalEventable_base {
}
export declare const GlobalEvent: GlobalEventable;
/**
 * A helper mixin for JSON serialization.
 * @mixin JSONAble
 */
declare function _default$1<Class extends MixinConstructor>(Base: Class): {
	new (...args: any[]): {
		_jsonType?: string;
		/**
		 * 返回该类的JSON type
		 * @english
		 * Get object's JSON Type
		 */
		getJSONType(): string;
	};
	/**
	 * 静态方法，用于将该类注册用于JSON序列化与反序列化
	 *
	 * @english
	 * It is a static method. <br>
	 * Register class for JSON serialization and assign a JSON type.
	 * @param  type - JSON type
	 */
	registerJSONType(type: string): void;
	/**
	 * 静态方法，返回type对应的注册类
	 * @english
	 * It is a static method. <br>
	 * Get class of input JSON type
	 * @param  type - JSON type
	 */
	getJSONClass(type: string): Class | null;
} & Class;
declare class Base$1 {
}
declare const Handler_base: {
	new (...args: any[]): {
		_eventMap?: Record<string, {
			handler: HandlerFn;
			context: any;
		}[]>;
		_eventParent?: any;
		_eventTarget?: any;
		on(eventsOn: string | EventRecords, handler: HandlerFn, context?: any): any;
		addEventListener(...args: any[]): any;
		once(eventTypes: string | EventRecords, handler: HandlerFn, context?: any): any;
		off(eventsOff: string | EventRecords, handler: HandlerFn, context?: any): any;
		removeEventListener(...args: any[]): any;
		listens(eventType: string, handler?: HandlerFn, context?: any): number;
		getListeningEvents(): string[];
		copyEventListeners(target: any): any;
		fire(eventType: string, param?: BaseEventParamsType): any;
		_wrapOnceHandler(evtType: string, handler: HandlerFn, context?: any): (...args: any[]) => void;
		_switch(to: string, eventRecords: EventRecords, context?: any): any;
		_clearListeners(eventType: string): void;
		_clearAllListeners(): void;
		_setEventParent(parent: any): any;
		_setEventTarget(target: any): any;
		_fire(eventType: string, param: BaseEventParamsType): any;
	};
} & typeof Base$1;
/**
 * 所有交互Handler类的基类
 *
 * @english
 * Base class for all the interaction handlers
 * @category handler
 * @abstract
 * @protected
 */
export declare abstract class Handler extends Handler_base {
	target: any;
	dom?: HTMLElement;
	constructor(target: any);
	abstract addHooks(): void;
	abstract removeHooks(): void;
	/**
	 * 启用Handler
	 *
	 * @english
	 * Enables the handler
	 */
	enable(): this;
	/**
	 * 停用Handler
	 *
	 * @english
	 * Disables the handler
	 */
	disable(): this;
	/**
	 * 检查Handler是否启用
	 *
	 * @english
	 * Returns true if the handler is enabled.
	 */
	enabled(): boolean;
	/**
	 * 从target上移除Handler
	 *
	 * @english
	 * remove handler from target
	 */
	remove(): void;
}
/**
 * A mixin, to enable a class with [interaction handlers]{@link Handler}
 * @protected
 * @category handler
 * @mixin Handlerable
 */
declare function _default$2<T extends MixinConstructor>(Base: T): {
	new (...args: any[]): {
		_handlers?: Handler[];
		/**
		 * Register a handler
		 * @param {String} name       - name of the handler
		 * @param {Handler}           - handler class
		 * @return {*} this
		 * @protected
		 * @function Handerable.addHandler
		 */
		addHandler(name: any, handlerClass: any): any;
		/**
		 * Removes a handler
		 * @param {String} name       - name of the handler
		 * @return {*} this
		 * @protected
		 * @function Handerable.removeHandler
		 */
		removeHandler(name: any): any;
		_clearHandlers(): void;
	};
} & T;
/**
 * Drag handler
 * @category handler
 * @protected
 * @extends Handler
 */
export declare class DragHandler extends Handler {
	options: DragOptionsType;
	moved: boolean;
	startPos: Point;
	interupted: boolean;
	addHooks(): void;
	removeHooks(): void;
	constructor(dom: HTMLElement, options?: DragOptionsType);
	enable(): this;
	disable(): this;
	onMouseDown(event: DragEventType): void;
	onMouseMove(event: DragEventType): void;
	onMouseUp(event: DragEventType): void;
}
export type DragOptionsType = {
	rightclick?: boolean;
	cancelOn?: (e: DragEventType) => boolean;
	ignoreMouseleave?: boolean;
};
export type DragEventType = MouseEvent | TouchEvent;
/**
 * 表示由 [GeoJSON](http://geojson.org/geojson-spec.html#coordinate-reference-system-objects)定义的 CRS
 * @english
 *
 * Represent CRS defined by [GeoJSON]{@link http://geojson.org/geojson-spec.html#coordinate-reference-system-objects}
 *
 * @category geo
 */
export declare class CRS {
	type: string;
	properties: any;
	/**
	 * @param type type of the CRS
	 * @param properties CRS's properties
	 */
	constructor(type: string, properties: Record<string, any>);
	/**
	 * 使用 maptalks 创建 [proj4](https://github.com/OSGeo/proj.4) 形式的 CRS
	 * @english
	 * Create a [proj4](https://github.com/OSGeo/proj.4) style CRS used by maptalks <br>
	 * @example
	 * {
	 *     "type"       : "proj4",
	 *     "properties" : {
	 *         "proj"   : "+proj=longlat +datum=WGS84 +no_defs"
	 *     }
	 * }
	 * var crs_wgs84 = CRS.createProj4("+proj=longlat +datum=WGS84 +no_defs");
	 * @param proj a proj4 projection string.
	 */
	static createProj4(proj: string): CRS;
	/**
	 * 使用 maptalks 创建 [epsg](https://spatialreference.org/ref/epsg/) 形式的 CRS
	 * @english
	 * Create a [epsg](https://spatialreference.org/ref/epsg/) style CRS used by maptalks <br>
	 * @example
	 * var crs_wgs84 = CRS.createProj4("EPSG:4326");
	 * @param code a proj4 projection string.
	 */
	static fromProjectionCode(code: string): WithNull<CRS>;
	/**
	 * 预定义的WGS84坐标参考系统（也称为EPSG:4326）。
	 * @english
	 * Predefined CRS of well-known WGS84 (aka EPSG:4326)
	 */
	static WGS84: CRS;
	/**
	 * CRS.WGS84 的别名
	 * @english
	 * Alias for CRS.WGS84
	 */
	static EPSG4326: CRS;
	/**
	 * 谷歌地图使用的投影坐标系统具有以下别名：'EPSG:3785'、'GOOGLE'、'EPSG:900913'。
	 * @english
	 * Projected Coordinate System used by google maps that has the following alias: 'EPSG:3785', 'GOOGLE', 'EPSG:900913'
	 */
	static EPSG3857: CRS;
	/**
	 * 一个代表简单的笛卡尔坐标系统。<br>
	 * 它直接映射x、y坐标，对于平面地图（例如室内地图、游戏地图）非常有用。
	 *
	 * @english
	 * A CRS represents a simple Cartesian coordinate system. <br>
	 * Maps x, y directly, is useful for maps of flat surfaces (e.g. indoor maps, game maps).
	 */
	static IDENTITY: CRS;
	/**
	 * 中国官方坐标系统（即EPSG:4490），在大多数情况下，可以认为与WGS84相同。
	 *
	 * @english
	 * Official coordinate system in China (aka EPSG:4490), in most cases, it can be considered the same with WGS84.
	 * @see  [7408](http://spatialreference.org/ref/sr-org/7408/)
	 */
	static CGCS2000: CRS;
	/**
	 * CRS.CGCS2000 的别名
	 *
	 * @english
	 * Alias for CRS.CGCS2000
	 */
	static EPSG4490: CRS;
	/**
	 * 百度地图使用的投影坐标系统。
	 *
	 * @english
	 * Projection used by [Baidu Map](http://map.baidu.com), a popular web map service in China.
	 */
	static BD09LL: CRS;
	/**
	 * 中国的大多数在线地图服务中所使用一种加密的坐标参考系统（CRS）。
	 *
	 * @english
	 * A encrypted CRS usded in the most online map services in China.
	 * @see [Restrictions_on_geographic_data_in_China](https://en.wikipedia.org/wiki/Restrictions_on_geographic_data_in_China)
	 */
	static GCJ02: CRS;
}
/**
 * 投影坐标和基础二维点系统之间的转换。
 * 内部使用的核心类，用于将地图（通常是地理）坐标映射到 2d 点
 *
 * @english
 * Transformation between projected coordinates and base 2d point system.
 * A core class used internally for mapping map's (usually geographical) coordinates to 2d points.<br>
 *
 * @category geo
 * @protected
 */
export declare class Transformation {
	matrix: number[];
	/**
	 * The base 2d point system is a fixed system that is consistent with HTML coordinate system: on X-Axis, left is smaller and right is larger; on Y-Axis, top is smaller and bottom is larger. <br>
	 * As map's coordinates may not be in the same order(e.g. on a mercator projected earth, top is larger and bottom is smaller), <br>
	 * transformation provides mapping functions to map arbitrary coordinates system to the fixed 2d point system. <br>
	 * How to transform is decided by the constructor parameters which is a 4 number array [a, b, c, d]:<br>
	 * a : the order scale of X-axis values 1 means right is larger and -1 means the reverse, left is larger;<br>
	 * b : the order scale of Y-axis values 1 means bottom is larger and -1 means the reverse, top is larger;<br>
	 * c : x of the origin point of the projected coordinate system <br>
	 * d : y of the origin point of the projected coordinate system <br>
	 * e.g.: Transformation parameters for Google map: [1, -1, -20037508.34, 20037508.34] <br>
	 * @param  matrix transformation array
	 */
	constructor(matrix: number[]);
	/**
	 * 将投影坐标变换为二维点，
	 * 变换/非变换方法中的参数scale用于在地图的不同缩放级别上缩放结果2d点。
	 *
	 * @english
	 * Transform a projected coordinate to a 2d point. <br>
	 * Parameter scale in transform/untransform method is used to scale the result 2d points on map's different zoom levels.
	 * @param coordinates - projected coordinate to transform
	 * @param scale - transform scale
	 * @param out - tmp point
	 * @returns 2d point.
	 */
	transform(coordinates: Coordinate, scale: number, out?: Point): Point;
	/**
	 * 将 2d 点变换为投影坐标。
	 *
	 * @english
	 *
	 * Transform a 2d point to a projected coordinate.
	 * @param point - 2d point
	 * @param scale - transform scale
	 * @param out tmp coordinates
	 * @returns projected coordinate.
	 */
	untransform(point: Point, scale: number, out?: Coordinate): Coordinate;
}
declare const CommonProjection: {
	code: string;
	is(code: string): boolean;
	/**
	 * 将地理坐标投影到投影坐标（二维坐标）
	 * @english
	 * Project a geographical coordinate to a projected coordinate (2d coordinate)
	 * @param p - coordinate to project
	 * @function projection.Common.project
	 */
	project(p: Coordinate): Coordinate;
	/**
	 * 将投影坐标转到地理坐标（二维坐标）
	 *
	 * @english
	 * Unproject a projected coordinate to a geographical coordinate (2d coordinate)
	 * @param p - coordinate to project
	 * @function projection.Common.unproject
	 */
	unproject(p: Coordinate): Coordinate;
	/**
	 * 批量将地理坐标投影到投影坐标
	 *
	 * @english
	 * Project a group of geographical coordinates to projected coordinates.
	 * @param coordinates - coordinates to project
	 * @function projection.Common.projectCoords
	 */
	projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
	/**
	 * 批量将投影坐标转到地理坐标
	 *
	 * @english
	 * Unproject a group of projected coordinates to geographical coordinates.
	 * @param projCoords - projected coordinates to unproject
	 * @function projection.Common.unprojectCoords
	 */
	unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
	/**
	 * 投影是否为球面
	 *
	 * @english
	 * Whether the projection is spherical
	 */
	isSphere(): boolean;
	/**
	 * 判断传入的投影坐标是否超出椭球体范围
	 *
	 * @english
	 * If the projected coord out of the sphere
	 * @param pcoord projected coord
	 * @return {Boolean}
	 */
	isOutSphere(pcoord: Coordinate): boolean;
	/**
	 * 限制投影坐标在球体中
	 *
	 * @english
	 * Wrap the projected coord in the sphere
	 * @param pcoord projected coord
	 * @returns wrapped projected coord
	 */
	wrapCoord(pcoord: Coordinate): Coordinate;
	getCircum(): Record<string, number>;
	getSphereExtent(): Extent;
};
export type CommonProjectionType = typeof CommonProjection;
declare const extended: {
	/**
	 * the code of the measurer
	 */
	measure: string;
	/**
	 * 计算两个坐标之间的距离
	 *
	 * @english
	 * Measure the length between 2 coordinates.
	 * @param c1
	 * @param c2
	 */
	measureLenBetween: (c1: Coordinate | CoordinateJson, c2: Coordinate | CoordinateJson, ignoreAltitude?: boolean) => number;
	/**
	 * 测量给定闭合坐标的面积
	 *
	 * @english
	 * Measure the area closed by the given coordinates.
	 * @param coordinates
	 */
	measureArea: (coordinates: (Coordinate | CoordinateJson)[]) => number;
	/**
	 * 使用 x 轴距离和 y 轴距离从给定源坐标定位坐标
	 * @english
	 * Locate a coordinate from the given source coordinate with a x-axis distance and a y-axis distance.
	 * @param c
	 * @param xDist
	 * @param yDist
	 * @param out
	 */
	locate: (c: Coordinate | CoordinateJson, xDist: number, yDist: number, out?: Coordinate) => any;
	/**
	 * 使用 x 轴距离和 y 轴距离从给定源坐标定位坐标（这是一个私有方法）
	 * @english
	 * Locate a coordinate from the given source coordinate with a x-axis distance and a y-axis distance.
	 * @param c     - source coordinate
	 * @param xDist     - x-axis distance
	 * @param yDist     - y-axis distance
	 * @private
	 */
	_locate: (c: Coordinate, xDist: number, yDist: number) => WithNull<Coordinate>;
	/**
	 * 绕枢轴旋转给定角度的坐标
	 *
	 * @english
	 * Rotate a coordinate of given angle around pivot
	 * @param c  - source coordinate
	 * @param pivot - pivot
	 * @param angle - angle in degree
	 */
	rotate: (c: Coordinate | CoordinateJson, pivot: Coordinate, angle: number) => any;
	/**
	 * 绕枢轴旋转给定角度的坐标
	 *
	 * @english
	 * Rotate a coordinate of given angle around pivot
	 * @param c  - source coordinate
	 * @param pivot - pivot
	 * @param angle - angle in degree
	 * @private
	 */
	_rotate: (c: Coordinate, pivot: Coordinate, angle: number) => Coordinate;
} & {
	measureLength: (c1: Coordinate, c2: Coordinate) => number;
};
export type IdentityMeasurerType = typeof extended;
export type CoordsLike = Coordinate | CoordinateJson;
declare class Sphere {
	radius: number;
	/**
	 * @param radius Sphere's radius
	 */
	constructor(radius: number);
	/**
	 * 计算两个坐标之间的距离
	 *
	 * @english
	 * Measure the length between 2 coordinates.
	 * @param c1
	 * @param c2
	 */
	measureLenBetween(c1: CoordsLike, c2: CoordsLike, ignoreAltitude?: boolean): number;
	/**
	 * 测量给定闭合坐标的面积
	 *
	 * @english
	 * Measure the area closed by the given coordinates.
	 * @param coordinates
	 */
	measureArea(coordinates: CoordsLike[]): number;
	/**
	 * 使用 x 轴距离和 y 轴距离从给定源坐标定位坐标
	 * @english
	 * Locate a coordinate from the given source coordinate with a x-axis distance and a y-axis distance.
	 * @param c
	 * @param xDist
	 * @param yDist
	 * @param out
	 */
	locate(c: CoordsLike, xDist: number, yDist: number, out?: Coordinate): Coordinate;
	/**
	 * 使用 x 轴距离和 y 轴距离从给定源坐标定位坐标
	 * @english
	 * Locate a coordinate from the given source coordinate with a x-axis distance and a y-axis distance.
	 * @param c     - source coordinate
	 * @param xDist     - x-axis distance
	 * @param yDist     - y-axis distance
	 * @private
	 */
	_locate(c: Coordinate, xDist: number, yDist: number): WithNull<Coordinate>;
	/**
	 * 绕枢轴旋转给定角度的坐标
	 * @english
	 * Rotate a coordinate of given angle around pivot
	 * @param c  - source coordinate
	 * @param pivot - pivot
	 * @param angle - angle in degree
	 */
	rotate(c: CoordsLike, pivot: Coordinate, angle: number): Coordinate;
	/**
	 * 绕枢轴旋转给定角度的坐标
	 * @english
	 * Rotate a coordinate of given angle around pivot
	 * @param c  - source coordinate
	 * @param pivot - pivot
	 * @param angle - angle in degree
	 * @private
	 */
	_rotate(c: Coordinate, pivot: Coordinate, angle: number): Coordinate;
}
declare const WGS84Sphere: {
	measure: string;
	sphere: Sphere;
	/**
	 * 计算两个坐标之间的距离
	 *
	 * @english
	 * Measure the length between 2 coordinates.
	 * @param c1
	 * @param c2
	 */
	measureLenBetween(c1: CoordsLike, c2: CoordsLike): number;
	/**
	 * 计算给定闭合坐标的面积
	 *
	 * @english
	 * Measure the area closed by the given coordinates.
	 * @param coordinates
	 */
	measureArea(coordinates: Coordinate[]): number;
	_locate(c: CoordsLike, xDist: number, yDist: number): any;
	/**
	 * 使用 x 轴距离和 y 轴距离从给定源坐标定位坐标。
	 * @english
	 * Locate a coordinate from the given source coordinate with a x-axis distance and a y-axis distance.
	 * @param c - source coordinate
	 * @param xDist - x-axis distance
	 * @param yDist - y-axis distance
	 * @param out - out
	 */
	locate(c: CoordsLike, xDist: number, yDist: number, out?: Coordinate): any;
	_rotate(c: Coordinate, pivot: Coordinate, angle: number): any;
	/**
	 * 绕枢轴旋转给定角度的坐标
	 * @english
	 * Rotate a coordinate of given angle around pivot
	 * @param c  - source coordinate
	 * @param pivot - pivot
	 * @param angle - angle in degree
	 */
	rotate(c: CoordsLike, pivot: Coordinate, angle: number): any;
} & {
	measureLength: (c1: Coordinate, c2: Coordinate) => number;
};
declare const BaiduSphere: {
	measure: string;
	sphere: Sphere;
	/**
	 * 计算两个坐标之间的距离
	 *
	 * @english
	 * Measure the length between 2 coordinates.
	 * @param c1
	 * @param c2
	 */
	measureLenBetween(c1: CoordsLike, c2: CoordsLike): number;
	/**
	 * 计算给定闭合坐标的面积
	 *
	 * @english
	 * Measure the area closed by the given coordinates.
	 * @param coordinates
	 */
	measureArea(coordinates: CoordsLike[]): number;
	_locate(c: Coordinate, xDist: number, yDist: number): any;
	/**
	 * 使用 x 轴距离和 y 轴距离从给定源坐标定位坐标。
	 * @english
	 * Locate a coordinate from the given source coordinate with a x-axis distance and a y-axis distance.
	 * @param c - source coordinate
	 * @param xDist - x-axis distance
	 * @param yDist - y-axis distance
	 * @param out - out
	 */
	locate(c: CoordsLike, xDist: number, yDist: number, out?: Coordinate): any;
	_rotate(c: Coordinate, pivot: Coordinate, angle: number): any;
	/**
	 * 绕枢轴旋转给定角度的坐标
	 * @english
	 * Rotate a coordinate of given angle around pivot
	 * @param c  - source coordinate
	 * @param pivot - pivot
	 * @param angle - angle in degree
	 */
	rotate(c: CoordsLike, pivot: Coordinate, angle: number): any;
} & {
	measureLength: (c1: Coordinate, c2: Coordinate) => number;
};
export type BaiduSphereType = typeof BaiduSphere;
export type WGS84SphereType = typeof WGS84Sphere;
declare const DEFAULT: {
	measure: string;
	sphere: {
		radius: number;
		measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate, ignoreAltitude?: boolean): number;
		measureArea(coordinates: (CoordinateJson | Coordinate)[]): number;
		locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): Coordinate;
		_locate(c: Coordinate, xDist: number, yDist: number): Coordinate;
		rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): Coordinate;
		_rotate(c: Coordinate, pivot: Coordinate, angle: number): Coordinate;
	};
	measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate): number;
	measureArea(coordinates: Coordinate[]): number;
	_locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number): any;
	locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): any;
	_rotate(c: Coordinate, pivot: Coordinate, angle: number): any;
	rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): any;
} & {
	measureLength: (c1: Coordinate, c2: Coordinate) => number;
};
declare const Measurer: {
	/**
	 * 获取量测计算的实例
	 *
	 * @english
	 * Get a measurer instance.
	 * @param name - code of the measurer: 'EPSG:4326', 'Identity', 'BAIDU'
	 * @returns a measurer object
	 * @function Measurer.getInstance
	 */
	getInstance(name?: string): IdentityMeasurerType | WGS84SphereType | BaiduSphereType;
};
declare const EPSG3857Projection: {
	/**
	 * "EPSG:3857", Code of the projection
	 * @constant
	 */
	code: string;
	rad: number;
	metersPerDegree: number;
	maxLatitude: number;
	project: (lnglat: Coordinate, out?: Coordinate) => Coordinate;
	unproject: (pLnglat: Coordinate, out?: Coordinate) => Coordinate;
};
export type EPSG3857ProjectionType = CommonProjectionType & typeof EPSG3857Projection & WGS84SphereType;
declare const _default$3: {
	code: string;
	is(code: string): boolean;
	project(p: Coordinate): Coordinate;
	unproject(p: Coordinate): Coordinate;
	projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
	unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
	isSphere(): boolean;
	isOutSphere(pcoord: Coordinate): boolean;
	wrapCoord(pcoord: Coordinate): Coordinate;
	getCircum(): Record<string, number>;
	getSphereExtent(): Extent;
} & {
	/**
	 * "EPSG:3857", Code of the projection
	 * @constant
	 */
	code: string;
	rad: number;
	metersPerDegree: number;
	maxLatitude: number;
	project: (lnglat: Coordinate, out?: Coordinate) => Coordinate;
	unproject: (pLnglat: Coordinate, out?: Coordinate) => Coordinate;
} & {
	measure: string;
	sphere: {
		radius: number;
		measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate, ignoreAltitude?: boolean): number;
		measureArea(coordinates: (CoordinateJson | Coordinate)[]): number;
		/**
		 * Google 地图或 OSM 地图使用的常规投影，又名墨卡托投影。<br>
		 * 这是地图的默认投影。
		 *
		 * @english
		 * Well-known projection used by Google maps or Open Street Maps, aka Mercator Projection.<br>
		 * It is map's default projection.
		 *
		 * @category geo
		 * @protected
		 * @group projection
		 * @name EPSG3857
		 * {@inheritDoc projection.Common}
		 * {@inheritDoc measurer.WGS84Sphere}
		 */
		locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): Coordinate;
		_locate(c: Coordinate, xDist: number, yDist: number): Coordinate;
		rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): Coordinate;
		_rotate(c: Coordinate, pivot: Coordinate, angle: number): Coordinate;
	};
	measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate): number;
	measureArea(coordinates: Coordinate[]): number;
	_locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number): any;
	locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): any;
	_rotate(c: Coordinate, pivot: Coordinate, angle: number): any;
	rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): any;
} & {
	measureLength: (c1: Coordinate, c2: Coordinate) => number;
};
declare const EPSG4326Projection: {
	/**
	 * "EPSG:4326", Code of the projection
	 * @constant
	 */
	code: string;
	aliases: string[];
	project: (p: Coordinate, out?: Coordinate) => Coordinate;
	unproject: (p: Coordinate, out?: Coordinate) => Coordinate;
};
export type EPSG4326ProjectionType = CommonProjectionType & typeof EPSG4326Projection & WGS84SphereType;
declare const _default$4: {
	code: string;
	is(code: string): boolean;
	project(p: Coordinate): Coordinate;
	unproject(p: Coordinate): Coordinate;
	projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
	unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
	isSphere(): boolean;
	isOutSphere(pcoord: Coordinate): boolean;
	wrapCoord(pcoord: Coordinate): Coordinate;
	getCircum(): Record<string, number>;
	getSphereExtent(): Extent;
} & {
	/**
	 * "EPSG:4326", Code of the projection
	 * @constant
	 */
	code: string;
	aliases: string[];
	project: (p: Coordinate, out?: Coordinate) => Coordinate;
	unproject: (p: Coordinate, out?: Coordinate) => Coordinate;
} & {
	measure: string;
	sphere: {
		radius: number;
		measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate, ignoreAltitude?: boolean): number;
		measureArea(coordinates: (CoordinateJson | Coordinate)[]): number;
		locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): Coordinate;
		_locate(c: Coordinate, xDist: number, yDist: number): Coordinate;
		rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): Coordinate;
		_rotate(c: Coordinate, pivot: Coordinate, angle: number): Coordinate;
	};
	measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate): number;
	measureArea(coordinates: Coordinate[]): number;
	_locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number): any;
	locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): any;
	_rotate(c: Coordinate, pivot: Coordinate, angle: number): any;
	rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): any;
} & {
	measureLength: (c1: Coordinate, c2: Coordinate) => number;
};
export interface EPSG9807ProjectionParams {
	falseEasting: number;
	falseNorthing: number;
	scaleFactor: number;
	centralMeridian: number;
	latitudeOfOrigin: number;
	startLongtitude: number;
	startLatitude: number;
}
declare const EPSG9807Projection: {
	code: string;
	aliases: string[];
	centralMeridian: number;
	create(params: Partial<EPSG9807ProjectionParams>): {
		code: string;
		is(code: string): boolean;
		project(p: Coordinate): Coordinate;
		unproject(p: Coordinate): Coordinate;
		projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
		unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
		isSphere(): boolean;
		isOutSphere(pcoord: Coordinate): boolean;
		wrapCoord(pcoord: Coordinate): Coordinate;
		getCircum(): Record<string, number>;
		getSphereExtent(): Extent;
	} & {
		/**
		 * "EPSG:9807", Code of the projection
		 * @type {String}
		 * @constant
		 */
		code: string;
		aliases: string[];
		centralMeridian: number;
		project: (p: Coordinate, out?: Coordinate) => Coordinate;
		unproject: (p: Coordinate, out?: Coordinate) => Coordinate;
	} & {
		measure: string;
		sphere: {
			radius: number;
			measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate, ignoreAltitude?: boolean): number;
			measureArea(coordinates: (CoordinateJson | Coordinate)[]): number;
			locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): Coordinate;
			_locate(c: Coordinate, xDist: number, yDist: number): Coordinate;
			rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): Coordinate;
			_rotate(c: Coordinate, pivot: Coordinate, angle: number): Coordinate;
		};
		measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate): number;
		measureArea(coordinates: Coordinate[]): number;
		_locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number): any;
		locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): any;
		_rotate(c: Coordinate, pivot: Coordinate, angle: number): any;
		rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): any;
	} & {
		measureLength: (c1: Coordinate, c2: Coordinate) => number;
	};
};
export type EPSG9807ProjectionType = CommonProjectionType & typeof EPSG9807Projection;
declare const _default$5: {
	code: string;
	is(code: string): boolean;
	project(p: Coordinate): Coordinate;
	unproject(p: Coordinate): Coordinate;
	projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
	unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
	isSphere(): boolean;
	isOutSphere(pcoord: Coordinate): boolean;
	wrapCoord(pcoord: Coordinate): Coordinate;
	getCircum(): Record<string, number>;
	getSphereExtent(): Extent;
} & {
	code: string;
	aliases: string[];
	centralMeridian: number;
	create(params: Partial<EPSG9807ProjectionParams>): {
		code: string;
		is(code: string): boolean;
		project(p: Coordinate): Coordinate;
		unproject(p: Coordinate): Coordinate;
		projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
		unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
		isSphere(): boolean;
		isOutSphere(pcoord: Coordinate): boolean;
		wrapCoord(pcoord: Coordinate): Coordinate;
		getCircum(): Record<string, number>;
		getSphereExtent(): Extent;
	} & {
		/**
		 * "EPSG:9807", Code of the projection
		 * @type {String}
		 * @constant
		 */
		code: string;
		aliases: string[];
		centralMeridian: number;
		project: (p: Coordinate, out?: Coordinate) => Coordinate;
		unproject: (p: Coordinate, out?: Coordinate) => Coordinate;
	} & {
		measure: string;
		sphere: {
			radius: number;
			measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate, ignoreAltitude?: boolean): number;
			measureArea(coordinates: (CoordinateJson | Coordinate)[]): number;
			locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): Coordinate;
			_locate(c: Coordinate, xDist: number, yDist: number): Coordinate;
			rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): Coordinate;
			_rotate(c: Coordinate, pivot: Coordinate, angle: number): Coordinate;
		};
		measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate): number;
		measureArea(coordinates: Coordinate[]): number;
		_locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number): any;
		locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): any;
		_rotate(c: Coordinate, pivot: Coordinate, angle: number): any;
		rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): any;
	} & {
		measureLength: (c1: Coordinate, c2: Coordinate) => number;
	};
};
declare const ProjectionMethods: {
	EARTHRADIUS: number;
	MCBAND: number[];
	LLBAND: number[];
	MC2LL: number[][];
	LL2MC: number[][];
	convertMC2LL: (cB: Coordinate, out?: Coordinate) => Coordinate;
	convertLL2MC: (T: Coordinate, out?: Coordinate) => Coordinate;
	convertor: (cC: Coordinate, cD: number, out?: Coordinate) => Coordinate;
	toRadians: (T: number) => number;
	toDegrees: (T: number) => number;
	getRange: (cC: number, cB: number, T: number) => number;
	getLoop: (cC: number, cB: number, T: number) => number;
};
declare const BAIDUProjection: {
	/**
	 * "BAIDU", Code of the projection
	 * @constant
	 */
	code: string;
	project: (p: Coordinate, out?: Coordinate) => Coordinate;
	unproject: (p: Coordinate, out?: Coordinate) => Coordinate;
};
export type BAIDUProjectionType = CommonProjectionType & typeof BAIDUProjection & BaiduSphereType & typeof ProjectionMethods;
declare const _default$6: {
	code: string;
	is(code: string): boolean;
	project(p: Coordinate): Coordinate;
	unproject(p: Coordinate): Coordinate;
	projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
	unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
	isSphere(): boolean;
	isOutSphere(pcoord: Coordinate): boolean;
	wrapCoord(pcoord: Coordinate): Coordinate;
	getCircum(): Record<string, number>;
	getSphereExtent(): Extent;
} & {
	/**
	 * "BAIDU", Code of the projection
	 * @constant
	 */
	code: string;
	project: (p: Coordinate, out?: Coordinate) => Coordinate;
	unproject: (p: Coordinate, out?: Coordinate) => Coordinate;
} & {
	measure: string;
	sphere: {
		radius: number;
		measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate, ignoreAltitude?: boolean): number;
		measureArea(coordinates: (CoordinateJson | Coordinate)[]): number;
		locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): Coordinate;
		_locate(c: Coordinate, xDist: number, yDist: number): Coordinate;
		rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): Coordinate;
		_rotate(c: Coordinate, pivot: Coordinate, angle: number): Coordinate;
	};
	measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate): number;
	measureArea(coordinates: (CoordinateJson | Coordinate)[]): number;
	_locate(c: Coordinate, xDist: number, yDist: number): any;
	locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): any;
	_rotate(c: Coordinate, pivot: Coordinate, angle: number): any;
	rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): any;
} & {
	measureLength: (c1: Coordinate, c2: Coordinate) => number;
} & {
	EARTHRADIUS: number;
	MCBAND: number[];
	LLBAND: number[];
	MC2LL: number[][];
	LL2MC: number[][];
	convertMC2LL: (cB: Coordinate, out?: Coordinate) => Coordinate;
	convertLL2MC: (T: Coordinate, out?: Coordinate) => Coordinate;
	convertor: (cC: Coordinate, cD: number, out?: Coordinate) => Coordinate;
	toRadians: (T: number) => number;
	toDegrees: (T: number) => number;
	getRange: (cC: number, cB: number, T: number) => number;
	getLoop: (cC: number, cB: number, T: number) => number;
};
export interface UTMProjectionParams {
	zone: string;
	south: boolean;
}
declare const UTMProjection: {
	/**
	 * "EPSG:4490", Code of the projection
	 * @constant
	 */
	code: string;
	aliases: any[];
	create(params: Partial<UTMProjectionParams>): {
		code: string;
		is(code: string): boolean;
		project(p: Coordinate): Coordinate;
		unproject(p: Coordinate): Coordinate;
		projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
		unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
		isSphere(): boolean;
		isOutSphere(pcoord: Coordinate): boolean;
		wrapCoord(pcoord: Coordinate): Coordinate;
		getCircum(): Record<string, number>;
		getSphereExtent(): Extent;
	} & {
		code: string;
		aliases: string[];
		centralMeridian: number;
		project: (p: Coordinate, out?: Coordinate) => Coordinate;
		unproject: (p: Coordinate, out?: Coordinate) => Coordinate;
	} & {
		measure: string;
		sphere: {
			radius: number;
			measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate, ignoreAltitude?: boolean): number;
			measureArea(coordinates: (CoordinateJson | Coordinate)[]): number;
			locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): Coordinate;
			_locate(c: Coordinate, xDist: number, yDist: number): Coordinate;
			rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): Coordinate;
			_rotate(c: Coordinate, pivot: Coordinate, angle: number): Coordinate;
		};
		measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate): number;
		measureArea(coordinates: Coordinate[]): number;
		_locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number): any;
		locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): any;
		_rotate(c: Coordinate, pivot: Coordinate, angle: number): any;
		rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): any;
	} & {
		measureLength: (c1: Coordinate, c2: Coordinate) => number;
	};
};
export type UTMProjectionType = EPSG9807ProjectionType & typeof UTMProjection;
declare const _default$7: {
	code: string;
	is(code: string): boolean;
	project(p: Coordinate): Coordinate;
	unproject(p: Coordinate): Coordinate;
	projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
	unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
	isSphere(): boolean;
	isOutSphere(pcoord: Coordinate): boolean;
	wrapCoord(pcoord: Coordinate): Coordinate;
	getCircum(): Record<string, number>;
	getSphereExtent(): Extent;
} & {
	code: string;
	aliases: string[];
	centralMeridian: number;
	create(params: Partial<EPSG9807ProjectionParams>): {
		code: string;
		is(code: string): boolean;
		project(p: Coordinate): Coordinate;
		unproject(p: Coordinate): Coordinate;
		projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
		unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
		isSphere(): boolean;
		isOutSphere(pcoord: Coordinate): boolean;
		wrapCoord(pcoord: Coordinate): Coordinate;
		getCircum(): Record<string, number>;
		getSphereExtent(): Extent;
	} & {
		code: string;
		aliases: string[];
		centralMeridian: number;
		project: (p: Coordinate, out?: Coordinate) => Coordinate;
		unproject: (p: Coordinate, out?: Coordinate) => Coordinate;
	} & {
		measure: string;
		sphere: {
			radius: number;
			measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate, ignoreAltitude?: boolean): number;
			measureArea(coordinates: (CoordinateJson | Coordinate)[]): number;
			locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): Coordinate;
			_locate(c: Coordinate, xDist: number, yDist: number): Coordinate;
			rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): Coordinate;
			_rotate(c: Coordinate, pivot: Coordinate, angle: number): Coordinate;
		};
		measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate): number;
		measureArea(coordinates: Coordinate[]): number;
		_locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number): any;
		locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): any;
		_rotate(c: Coordinate, pivot: Coordinate, angle: number): any;
		rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): any;
	} & {
		measureLength: (c1: Coordinate, c2: Coordinate) => number;
	};
} & {
	/**
	 * "EPSG:4490", Code of the projection
	 * @constant
	 */
	code: string;
	aliases: any[];
	create(params: Partial<UTMProjectionParams>): {
		code: string;
		is(code: string): boolean;
		project(p: Coordinate): Coordinate;
		unproject(p: Coordinate): Coordinate;
		projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
		unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
		isSphere(): boolean;
		isOutSphere(pcoord: Coordinate): boolean;
		wrapCoord(pcoord: Coordinate): Coordinate;
		getCircum(): Record<string, number>;
		getSphereExtent(): Extent;
	} & {
		code: string;
		aliases: string[];
		centralMeridian: number;
		project: (p: Coordinate, out?: Coordinate) => Coordinate;
		unproject: (p: Coordinate, out?: Coordinate) => Coordinate;
	} & {
		measure: string;
		sphere: {
			radius: number;
			measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate, ignoreAltitude?: boolean): number;
			measureArea(coordinates: (CoordinateJson | Coordinate)[]): number;
			locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): Coordinate;
			_locate(c: Coordinate, xDist: number, yDist: number): Coordinate;
			rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): Coordinate;
			_rotate(c: Coordinate, pivot: Coordinate, angle: number): Coordinate;
		};
		measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate): number;
		measureArea(coordinates: Coordinate[]): number;
		_locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number): any;
		locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): any;
		_rotate(c: Coordinate, pivot: Coordinate, angle: number): any;
		rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): any;
	} & {
		measureLength: (c1: Coordinate, c2: Coordinate) => number;
	};
};
declare const IdentityProjection: {
	/**
	 * "IDENTITY", Code of the projection
	 * @constant
	 */
	code: string;
	project: (p: Coordinate, out?: Coordinate) => Coordinate;
	unproject: (p: Coordinate, out?: Coordinate) => Coordinate;
};
export type IdentityProjectionType = CommonProjectionType & typeof IdentityProjection & IdentityMeasurerType;
declare const _default$8: {
	code: string;
	is(code: string): boolean;
	project(p: Coordinate): Coordinate;
	unproject(p: Coordinate): Coordinate;
	projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
	unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
	isSphere(): boolean;
	isOutSphere(pcoord: Coordinate): boolean;
	wrapCoord(pcoord: Coordinate): Coordinate;
	getCircum(): Record<string, number>;
	getSphereExtent(): Extent;
} & {
	/**
	 * "IDENTITY", Code of the projection
	 * @constant
	 */
	code: string;
	project: (p: Coordinate, out?: Coordinate) => Coordinate;
	unproject: (p: Coordinate, out?: Coordinate) => Coordinate;
} & {
	measure: string;
	measureLenBetween: (c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate, ignoreAltitude?: boolean) => number;
	measureArea: (coordinates: (CoordinateJson | Coordinate)[]) => number;
	locate: (c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate) => any;
	_locate: (c: Coordinate, xDist: number, yDist: number) => Coordinate;
	rotate: (c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number) => any;
	_rotate: (c: Coordinate, pivot: Coordinate, angle: number) => Coordinate;
} & {
	measureLength: (c1: Coordinate, c2: Coordinate) => number;
};
export type ProjectionType = EPSG3857ProjectionType | EPSG4326ProjectionType | EPSG9807ProjectionType | BAIDUProjectionType | UTMProjectionType | IdentityProjectionType;
declare const DEFAULT$1: {
	code: string;
	is(code: string): boolean;
	project(p: Coordinate): Coordinate;
	unproject(p: Coordinate): Coordinate;
	projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
	unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
	isSphere(): boolean;
	isOutSphere(pcoord: Coordinate): boolean;
	wrapCoord(pcoord: Coordinate): Coordinate;
	getCircum(): Record<string, number>;
	getSphereExtent(): Extent;
} & {
	code: string;
	rad: number;
	metersPerDegree: number;
	maxLatitude: number;
	project: (lnglat: Coordinate, out?: Coordinate) => Coordinate;
	unproject: (pLnglat: Coordinate, out?: Coordinate) => Coordinate;
} & {
	measure: string;
	sphere: {
		radius: number;
		measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate, ignoreAltitude?: boolean): number;
		measureArea(coordinates: (CoordinateJson | Coordinate)[]): number;
		locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): Coordinate;
		_locate(c: Coordinate, xDist: number, yDist: number): Coordinate;
		rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): Coordinate;
		_rotate(c: Coordinate, pivot: Coordinate, angle: number): Coordinate;
	};
	measureLenBetween(c1: CoordinateJson | Coordinate, c2: CoordinateJson | Coordinate): number;
	measureArea(coordinates: Coordinate[]): number;
	_locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number): any;
	locate(c: CoordinateJson | Coordinate, xDist: number, yDist: number, out?: Coordinate): any;
	_rotate(c: Coordinate, pivot: Coordinate, angle: number): any;
	rotate(c: CoordinateJson | Coordinate, pivot: Coordinate, angle: number): any;
} & {
	measureLength: (c1: Coordinate, c2: Coordinate) => number;
};
/**
 * layers 的基础类，可用于 geometries 的添加移除
 * 抽象类,不准备实例化
 *
 * @english
 * @classdesc
 * Base class of all the layers that can add/remove geometries. <br>
 * It is abstract and not intended to be instantiated.
 * @category layer
 * @abstract
 * @extends Layer
 */
export declare class OverlayLayer extends Layer {
	options: OverlayLayerOptionsType;
	constructor(id: string, geometries?: OverlayLayerOptionsType | Array<Geometry>, options?: OverlayLayerOptionsType);
	getAltitude(): number;
	/**
	 * 通过 id 获取 geometry
	 *
	 * @english
	 * Get a geometry by its id
	 * @param id   - id of the geometry
	 * @return
	 */
	getGeometryById(id: string | number): Geometry;
	/**
	 * 获取所有geometries，如果提供 filter() 方法,则根据方法返回
	 *
	 * @english
	 * Get all the geometries or the ones filtered if a filter function is provided.
	 * @param filter=undefined   - a function to filter the geometries
	 * @param context=undefined  - context of the filter function, value to use as this when executing filter.
	 * @return
	 */
	getGeometries(filter?: (geo: Geometry) => boolean, context?: any): Array<Geometry>;
	/**
	 * 获取第一个geometry, geometry 位于底部
	 *
	 * @english
	 * Get the first geometry, the geometry at the bottom.
	 * @return first geometry
	 */
	getFirstGeometry(): Geometry;
	/**
	 * 获取最后一个geometry, geometry 位于上部
	 *
	 * @english
	 * Get the last geometry, the geometry on the top
	 * @return last geometry
	 */
	getLastGeometry(): Geometry;
	/**
	 * 获取 geometries 个数
	 *
	 * Get count of the geometries
	 * @return count
	 */
	getCount(): number;
	/**
	 * 获取 geometries 的 extent, 如果 layer 为空,返回 null
	 *
	 * @english
	 * Get extent of all the geometries in the layer, return null if the layer is empty.
	 * @return {Extent} - extent of the layer
	 */
	getExtent(): Extent;
	/**
	 * 按顺序为图层中的每个 geometry 执行一次提供的回调。
	 *
	 * @english
	 * Executes the provided callback once for each geometry present in the layer in order.
	 * @param fn - a callback function
	 * @param context=undefined   - callback's context, value to use as this when executing callback.
	 * @return this
	 */
	forEach(fn: (geo: Geometry, index: number) => void, context?: any): this;
	/**
	 * 创建一个包含所有通过由提供的函数实现的测试的 geometries 的 GeometryCollection。
	 *
	 * @english
	 * Creates a GeometryCollection with all the geometries that pass the test implemented by the provided function.
	 * @param fn      - Function to test each geometry
	 * @param context=undefined  - Function's context, value to use as this when executing function.
	 * @return  A GeometryCollection with all the geometries that pass the test
	 */
	filter(fn: (geo: Geometry) => boolean, context?: any): Array<Geometry>;
	/**
	 * layer 是否为空
	 *
	 * @english
	 * Whether the layer is empty.
	 * @return {Boolean}
	 */
	isEmpty(): boolean;
	/**
	 * 为 layer 添加 geometries
	 *
	 * @english
	 * Adds one or more geometries to the layer
	 * @param geometries - one or more geometries
	 * @param fitView=false                                         - automatically set the map to a fit center and zoom for the geometries
	 * @param fitView.easing=out                                    - default animation type
	 * @param fitView.duration=map.options.zoomAnimationDuration    - default animation time
	 * @param fitView.step=null                                     - step function during animation, animation frame as the parameter
	 * @return this
	 */
	addGeometry(geometries: Geometry | Array<Geometry>, fitView?: boolean | addGeometryFitViewOptions): any;
	/**
	 * 所有 geometries 最小的 zIndex
	 *
	 * @english
	 * Get minimum zindex of geometries
	 */
	getGeoMinZIndex(): number;
	/**
	 * 所有 geometries 最大的 zIndex
	 *
	 * @english
	 * Get maximum zindex of geometries
	 */
	getGeoMaxZIndex(): number;
	/**
	 * 移除一个或多个geometries
	 *
	 * @english
	 * Removes one or more geometries from the layer
	 * @param  geometries - geometry ids or geometries to remove
	 * @returns this
	 */
	removeGeometry(geometries: Geometry | Geometry[]): any;
	/**
	 * 清除 layer
	 *
	 * @english
	 * Clear all geometries in this layer
	 * @returns this
	 */
	clear(): this;
	/**
	 * 移除geometry 回调函数
	 *
	 * @english
	 * Called when geometry is being removed to clear the context concerned.
	 * @param geometry - the geometry instance to remove
	 * @protected
	 */
	onRemoveGeometry(geometry: Geometry): void;
	/**
	 * 获取 layer 的 style
	 *
	 * @english
	 * Gets layer's style.
	 * @return layer's style
	 */
	getStyle(): any | any[];
	/**
	 * layer 设置 style, 用样式符号对满足条件的 geometries进行样式修改
	 * 基于[mapbox-gl-js's style specification]， {https://www.mapbox.com/mapbox-gl-js/style-spec/#types-filter}.
	 *
	 * @english
	 * Sets style to the layer, styling the geometries satisfying the condition with style's symbol. <br>
	 * Based on filter type in [mapbox-gl-js's style specification]{https://www.mapbox.com/mapbox-gl-js/style-spec/#types-filter}.
	 * @param style - layer's style
	 * @returns this
	 * @fires OverlayLayer#setstyle
	 * @example
	 * layer.setStyle([
		{
		  'filter': ['==', 'count', 100],
		  'symbol': {'markerFile' : 'foo1.png'}
		},
		{
		  'filter': ['==', 'count', 200],
		  'symbol': {'markerFile' : 'foo2.png'}
		}
	  ]);
	 */
	setStyle(style: any | any[]): this;
	/**
	 * 移除 style
	 *
	 * @english
	 * Removes layers' style
	 * @returns this
	 * @fires OverlayLayer#removestyle
	 */
	removeStyle(): this;
	onAddGeometry(geo: Geometry): void;
	hide(): this;
	onGeometryEvent(param?: HandlerFnResultType): void;
}
export type OverlayLayerOptionsType = LayerOptionsType & {
	drawImmediate?: boolean;
	geometryEvents?: boolean;
	geometryEventTolerance?: number;
	style?: any;
};
export type addGeometryFitViewOptions = {
	easing?: string;
	duration?: number;
	step?: (frame: any) => void;
};
declare const Geometry_base: {
	new (...args: any[]): {
		_jsonType?: string;
		getJSONType(): string;
	};
	registerJSONType(type: string): void;
	getJSONClass(type: string): {
		new (...args: any[]): {
			_eventMap?: Record<string, {
				handler: HandlerFn;
				context: any;
			}[]>;
			_eventParent?: any;
			_eventTarget?: any;
			on(eventsOn: string | EventRecords, handler: HandlerFn, context?: any): any;
			addEventListener(...args: any[]): any;
			once(eventTypes: string | EventRecords, handler: HandlerFn, context?: any): any;
			off(eventsOff: string | EventRecords, handler: HandlerFn, context?: any): any;
			removeEventListener(...args: any[]): any;
			listens(eventType: string, handler?: HandlerFn, context?: any): number;
			getListeningEvents(): string[];
			copyEventListeners(target: any): any;
			fire(eventType: string, param?: BaseEventParamsType): any;
			_wrapOnceHandler(evtType: string, handler: HandlerFn, context?: any): (...args: any[]) => void;
			_switch(to: string, eventRecords: EventRecords, context?: any): any;
			_clearListeners(eventType: string): void;
			_clearAllListeners(): void;
			_setEventParent(parent: any): any;
			_setEventTarget(target: any): any;
			_fire(eventType: string, param: BaseEventParamsType): any;
		};
	} & {
		new (...args: any[]): {
			_handlers?: Handler[];
			addHandler(name: any, handlerClass: any): any;
			removeHandler(name: any): any;
			_clearHandlers(): void;
		};
	} & typeof Class;
} & {
	new (...args: any[]): {
		_eventMap?: Record<string, {
			handler: HandlerFn;
			context: any;
		}[]>;
		_eventParent?: any;
		_eventTarget?: any;
		on(eventsOn: string | EventRecords, handler: HandlerFn, context?: any): any;
		addEventListener(...args: any[]): any;
		once(eventTypes: string | EventRecords, handler: HandlerFn, context?: any): any;
		off(eventsOff: string | EventRecords, handler: HandlerFn, context?: any): any;
		removeEventListener(...args: any[]): any;
		listens(eventType: string, handler?: HandlerFn, context?: any): number;
		getListeningEvents(): string[];
		copyEventListeners(target: any): any;
		fire(eventType: string, param?: BaseEventParamsType): any;
		_wrapOnceHandler(evtType: string, handler: HandlerFn, context?: any): (...args: any[]) => void;
		_switch(to: string, eventRecords: EventRecords, context?: any): any;
		_clearListeners(eventType: string): void;
		_clearAllListeners(): void;
		_setEventParent(parent: any): any;
		_setEventTarget(target: any): any;
		_fire(eventType: string, param: BaseEventParamsType): any;
	};
} & {
	new (...args: any[]): {
		_handlers?: Handler[];
		addHandler(name: any, handlerClass: any): any;
		removeHandler(name: any): any;
		_clearHandlers(): void;
	};
} & typeof Class;
/**
 * 所有几何图形的基类。
 * 它定义了所有几何图形类共享的通用方法。
 * 它是抽象的，不打算被实例化而是被扩展。
 * @english
 * Base class for all the geometries. <br/>
 * It defines common methods that all the geometry classes share. <br>
 * It is abstract and not intended to be instantiated but extended.
 *
 * @category geometry
 * @abstract
 * @extends Class
 * @mixes Eventable
 * @mixes Handlerable
 * @mixes JSONAble
 * @mixes ui.Menuable
 */
export declare class Geometry extends Geometry_base {
	options: GeometryOptionsType;
	type: string;
	properties: Record<string, any>;
	isPoint?: boolean;
	getHoles?(): Array<Array<Coordinate>>;
	getShell?(): Array<Coordinate>;
	getGeometries?(): Geometry[];
	getCoordinates?(): Coordinate | Array<Coordinate> | Array<Array<Coordinate>> | Array<Array<Array<Coordinate>>>;
	setCoordinates?(coordinate: any): this;
	onRemove?(): void;
	getRotateOffsetAngle?(): number;
	onAdd?(): void;
	constructor(options: GeometryOptionsType);
	static fromJSON(json: {
		[key: string]: any;
	} | Array<{
		[key: string]: any;
	}>): Geometry | Array<Geometry>;
	/**
	 * 获取几何图形第一个坐标点
	 * @english
	 * Returns the first coordinate of the geometry.
	 *
	 * @return {Coordinate} First Coordinate
	 */
	getFirstCoordinate(): Coordinate;
	/**
	 * 获取几何图形最后一个坐标点
	 * @english
	 * Returns the last coordinate of the geometry.
	 *
	 * @return {Coordinate} Last Coordinate
	 */
	getLastCoordinate(): Coordinate;
	/**
	 * 将几何图形添加到指定图层上
	 * @english
	 * Adds the geometry to a layer
	 * @param {Layer} layer    - layer add to
	 * @param {Boolean} [fitview=false] - automatically set the map to a fit center and zoom for the geometry
	 * @return {Geometry} this
	 * @fires Geometry#add
	 */
	addTo(layer: OverlayLayer, fitview?: boolean | addGeometryFitViewOptions): this;
	/**
	 * 获取几何图形所在的图层
	 * @english
	 * Get the layer which this geometry added to.
	 * @returns {Layer} - layer added to
	 */
	getLayer(): OverlayLayer;
	/**
	 * 获取几何图形所在的地图对象
	 * @english
	 * Get the map which this geometry added to
	 * @returns {Map} - map added to
	 */
	getMap(): Map$1 | null;
	/**
	 * 获取几何图形的id
	 * @english
	 * Gets geometry's id. Id is set by setId or constructor options.
	 * @returns {String|Number} geometry的id
	 */
	getId(): string;
	/**
	 * 给几何图形设置id
	 * @english
	 * Set geometry's id.
	 * @param {String} id - new id
	 * @returns {Geometry} this
	 * @fires Geometry#idchange
	 */
	setId(id: string): this;
	/**
	 * 获取几何图形的属性
	 * @english
	 * Get geometry's properties. Defined by GeoJSON as [feature's properties]{@link http://geojson.org/geojson-spec.html#feature-objects}.
	 *
	 * @returns {Object} properties
	 */
	getProperties(): {
		[key: string]: any;
	} | null;
	/**
	 * 给几何图形设置新的属性
	 * Set a new properties to geometry.
	 * @param {Object} properties - new properties
	 * @returns {Geometry} this
	 * @fires Geometry#propertieschange
	 */
	setProperties(properties: {
		[key: string]: any;
	}): this;
	/**
	 * 获取几何图形的类型,例如“点”,"线"
	 * @english
	 * Get type of the geometry, e.g. "Point", "LineString"
	 * @returns {String} type of the geometry
	 */
	getType(): string;
	/**
	 * 获取几何图形的样式
	 * @english
	 * Get symbol of the geometry
	 * @returns {Object} geometry's symbol
	 */
	getSymbol(): any;
	/**
	 * 给几何图形设置样式
	 * @english
	 * Set a new symbol to style the geometry.
	 * @param {Object} symbol - new symbol
	 * @see {@tutorial symbol Style a geometry with symbols}
	 * @return {Geometry} this
	 * @fires Geometry#symbolchange
	 */
	setSymbol(symbol: any): this;
	/**
	 * 获取样式的哈希值
	 * @english
	 * Get symbol's hash code
	 * @return {String}
	 */
	getSymbolHash(): string;
	/**
	 * 更新几何图形当前的样式
	 * @english
	 * Update geometry's current symbol.
	 *
	 * @param  {Object | Array} props - symbol properties to update
	 * @return {Geometry} this
	 * @fires Geometry#symbolchange
	 * @example
	 * var marker = new Marker([0, 0], {
	 *  // if has markerFile , the priority of the picture is greater than the vector and the path of svg
	 *  // svg image type:'path';vector type:'cross','x','diamond','bar','square','rectangle','triangle','ellipse','pin','pie'
	 *    symbol : {
	 *       markerType : 'ellipse',
	 *       markerWidth : 20,
	 *       markerHeight : 30
	 *    }
	 * });
	 * // update symbol's markerWidth to 40
	 * marker.updateSymbol({
	 *     markerWidth : 40
	 * });
	 */
	updateSymbol(props: any): this;
	/**
	 * 如果几何图形有文本内容，就获取它
	 * @english
	 * Get geometry's text content if it has
	 * @returns {String}
	 */
	getTextContent(): any;
	getTextDesc(): any;
	/**
	 * 获取几何图形中心点
	 * @english
	 * Get the geographical center of the geometry.
	 *
	 * @returns {Coordinate}
	 */
	getCenter(): Coordinate;
	/**
	 * 获取几何图形的包围盒范围
	 * @english
	 * Get the geometry's geographical extent
	 *
	 * @returns {Extent} geometry's extent
	 */
	getExtent(): Extent;
	/**
	 * 获取几何图形的屏幕像素范围
	 * @english
	 * Get geometry's screen extent in pixel
	 *
	 * @returns {PointExtent}
	 */
	getContainerExtent(out?: PointExtent): PointExtent;
	get2DExtent(): PointExtent;
	/**
	 * 获取几何体的像素大小，不同缩放级别的像素大小可能会有所不同。
	 * @english
	 * Get pixel size of the geometry, which may vary in different zoom levels.
	 *
	 * @returns {Size}
	 */
	getSize(): SizeLike;
	/**
	 * 几何体是否包含输入容器点
	 * @english
	 * Whehter the geometry contains the input container point.
	 *
	 * @param  {Point|Coordinate} point - input container point or coordinate
	 * @param  {Number} [t=undefined] - tolerance in pixel
	 * @return {Boolean}
	 * @example
	 * var circle = new Circle([0, 0], 1000)
	 *     .addTo(layer);
	 * var contains = circle.containsPoint(new maptalks.Point(400, 300));
	 */
	containsPoint(containerPoint: Point, t?: number): boolean;
	/**
	 * 显示几何图形
	 * @english
	 * Show the geometry.
	 *
	 * @return {Geometry} this
	 * @fires Geometry#show
	 */
	show(): this;
	/**
	 * 隐藏几何图形
	 * @english
	 * Hide the geometry
	 *
	 * @return {Geometry} this
	 * @fires Geometry#hide
	 */
	hide(): this;
	/**
	 * 几何图形是否可见
	 * @english
	 * Whether the geometry is visible
	 *
	 * @returns {Boolean}
	 */
	isVisible(): boolean;
	/**
	 * symbol是否可见
	 * @english
	 * Whether the geometry symbol is visible
	 *
	 * @returns {Boolean}
	 */
	symbolIsVisible(): boolean;
	/**
	 * 获取几何图形所在层级，默认是0
	 * @english
	 * Get zIndex of the geometry, default is 0
	 * @return {Number} zIndex
	 */
	getZIndex(): number;
	/**
	 * 给几何图形设置新的层级并触发zindexchange事件（将导致层对几何体进行排序并进行渲染）
	 * @english
	 * Set a new zIndex to Geometry and fire zindexchange event (will cause layer to sort geometries and render)
	 * @param {Number} zIndex - new zIndex
	 * @return {Geometry} this
	 * @fires Geometry#zindexchange
	 */
	setZIndex(zIndex: number): this;
	/**
	 * 仅将新的zIndex设置为Geometry，而不触发zindexchange事件
	 * 当需要更新许多几何图形的zIndex时，可以用来提高性能
	 * 当更新了N个几何体时，可以将setZIndexSilently与（N-1）个几何体一起使用，并将setZIendex与要排序和渲染的层的最后一个几何体一同使用。
	 * @english
	 * Only set a new zIndex to Geometry without firing zindexchange event. <br>
	 * Can be useful to improve perf when a lot of geometries' zIndex need to be updated. <br>
	 * When updated N geometries, You can use setZIndexSilently with (N-1) geometries and use setZIndex with the last geometry for layer to sort and render.
	 * @param {Number} zIndex - new zIndex
	 * @return {Geometry} this
	 */
	setZIndexSilently(zIndex: number): this;
	/**
	 * 将几何图形至于顶层
	 * @english
	 * Bring the geometry on the top
	 * @return {Geometry} this
	 * @fires Geometry#zindexchange
	 */
	bringToFront(): this;
	/**
	 * 将几何图形置于底层
	 * @english
	 * Bring the geometry to the back
	 * @return {Geometry} this
	 * @fires Geometry#zindexchange
	 */
	bringToBack(): this;
	/**
	 * 按给定偏移平移或移动几何体
	 * @english
	 * Translate or move the geometry by the given offset.
	 *
	 * @param  {Coordinate} offset - translate offset
	 * @return {Geometry} this
	 * @fires Geometry#positionchange
	 * @fires Geometry#shapechange
	 */
	/**
	 * Translate or move the geometry by the given offset.
	 *
	 * @param  {Number} x - x offset
	 * @param  {Number} y - y offset
	 * @param  {Number} z - z offset
	 * @return {Geometry} this
	 * @fires Geometry#positionchange
	 * @fires Geometry#shapechange
	 */
	translate(x: number | Coordinate, y?: number, z?: number): this;
	_translateRotatePivot(newCoordinate: Coordinate): this;
	/**
	 * 闪烁几何图形，按一定的内部显示和隐藏计数次数。
	 * @english
	 * Flash the geometry, show and hide by certain internal for times of count.
	 *
	 * @param {Number} [interval=100]     - interval of flash, in millisecond (ms)
	 * @param {Number} [count=4]          - flash times
	 * @param {Function} [cb=null]        - callback function when flash ended
	 * @param {*} [context=null]          - callback context
	 * @return {Geometry} this
	 */
	flash(interval: number, count: number, cb: () => void, context: any): this;
	/**
	 * 返回不包含事件侦听器的几何体的副本。
	 * @english
	 * Returns a copy of the geometry without the event listeners.
	 * @returns {Geometry} copy
	 */
	copy(): Geometry;
	/**
	 * 将其自身从图层中移除（如果有的话）。
	 * @english
	 * remove itself from the layer if any.
	 * @returns {Geometry} this
	 * @fires Geometry#removestart
	 * @fires Geometry#remove
	 */
	remove(): this;
	/**
	 * 将几何对象导出成geojson对象
	 * @english
	 * Exports [geometry]{@link http://geojson.org/geojson-spec.html#feature-objects} out of a GeoJSON feature.
	 * @return {Object} GeoJSON Geometry
	 */
	toGeoJSONGeometry(): {
		[key: string]: any;
	};
	/**
	 * 导出geojson对象中的一个feature
	 * @english
	 * Exports a GeoJSON feature.
	 * @param {Object} [opts=null]              - export options
	 * @param {Boolean} [opts.geometry=true]    - whether export geometry
	 * @param {Boolean} [opts.properties=true]  - whether export properties
	 * @returns {Object} GeoJSON Feature
	 */
	toGeoJSON(opts?: {
		[key: string]: any;
	}): {
		[key: string]: any;
	};
	/**
	 * 从几何体中导出一个配置文件json。
	 * 除了导出特性对象，概要文件json还包含符号、构造选项和信息窗口信息。
	 * 配置文件json可以存储在其他地方，稍后用于重现几何图形
	 * 由于函数的序列化问题，概要文件json中不包括事件侦听器和上下文菜单
	 * @english
	 * Export a profile json out of the geometry. <br>
	 * Besides exporting the feature object, a profile json also contains symbol, construct options and infowindow info.<br>
	 * The profile json can be stored somewhere else and be used to reproduce the geometry later.<br>
	 * Due to the problem of serialization for functions, event listeners and contextmenu are not included in profile json.
	 * @example
	 *     // an example of a profile json.
	 * var profile = {
			"feature": {
				  "type": "Feature",
				  "id" : "point1",
				  "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
				  "properties": {"prop0": "value0"}
			},
			//construct options.
			"options":{
				"draggable" : true
			},
			//symbol
			"symbol":{
				"markerFile"  : "http://foo.com/icon.png",
				"markerWidth" : 20,
				"markerHeight": 20
			},
			//infowindow info
			"infowindow" : {
				"options" : {
					"style" : "black"
				},
				"title" : "this is a infowindow title",
				"content" : "this is a infowindow content"
			}
		};
	 * @param {Object}  [options=null]          - export options
	 * @param {Boolean} [opts.geometry=true]    - whether export feature's geometry
	 * @param {Boolean} [opts.properties=true]  - whether export feature's properties
	 * @param {Boolean} [opts.options=true]     - whether export construct options
	 * @param {Boolean} [opts.symbol=true]      - whether export symbol
	 * @param {Boolean} [opts.infoWindow=true]  - whether export infowindow
	 * @return {Object} profile json object
	 */
	toJSON(options?: {
		[key: string]: any;
	}): {
		[key: string]: any;
	};
	/**
	 * 获取几何图形的地理长度
	 * @english
	 * Get the geographic length of the geometry.
	 * @returns {Number} geographic length, unit is meter
	 */
	getLength(): number;
	/**
	 * 获取几何图形的面积
	 * @english
	 * Get the geographic area of the geometry.
	 * @returns {Number} geographic area, unit is sq.meter
	 */
	getArea(): number;
	/**
	 * 按给定角度围绕轴心点旋转几何体
	 * @english
	 * Rotate the geometry of given angle around a pivot point
	 * @param {Number} angle - angle to rotate in degree
	 * @param {Coordinate} [pivot=null]  - optional, will be the geometry's center by default
	 * @returns {Geometry} this
	 */
	rotate(angle: number, pivot?: Coordinate): this;
	isRotated(): boolean;
	onHide(): void;
	onShapeChanged(): void;
	onPositionChanged(): void;
	onSymbolChanged(): void;
	onConfig(conf: any): void;
	getAltitude(): number | number[] | number[][];
	hasAltitude(): boolean;
	setAltitude(alt: number): this;
	getMinAltitude(): number;
	getMaxAltitude(): number;
}
export type GeometryOptionsType = {
	id?: string;
	visible?: boolean;
	interactive?: boolean;
	editable?: boolean;
	cursor?: string;
	antiMeridian?: boolean;
	defaultProjection?: string;
	measure?: string;
	draggable?: boolean;
	dragShadow?: boolean;
	dragOnAxis?: string;
	dragOnScreenAxis?: boolean;
	zIndex?: number;
	symbol?: any;
	properties?: {
		[key: string]: any;
	};
	rotateAngle?: number;
	rotatePivot?: Array<number>;
};
declare const Marker_base: {
	new (...args: any[]): {
		_coordinates: Coordinate;
		_pcenter: Coordinate;
		_dirtyCoords: boolean;
		getMap?(): Map$1;
		_getProjection?(): {
			code: string;
			is(code: string): boolean;
			project(p: Coordinate): Coordinate;
			unproject(p: Coordinate): Coordinate;
			projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
			unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
			isSphere(): boolean;
			isOutSphere(pcoord: Coordinate): boolean;
			wrapCoord(pcoord: Coordinate): Coordinate;
			getCircum(): Record<string, number>;
			getSphereExtent(): Extent;
		};
		onPositionChanged?(): void;
		_verifyProjection?(): void;
		_clearCache?(): void;
		_translateRotatePivot?(coordinate: Coordinate): any;
		getCoordinates(): Coordinate;
		setCoordinates(coordinates: Coordinate | number[]): any;
		_getCenter2DPoint(res?: number): Point;
		_getPrjCoordinates(): Coordinate;
		_setPrjCoordinates(pcenter: Coordinate): void;
		_updateCache(): void;
		_clearProjection(): void;
		_computeCenter(): Coordinate;
	};
} & typeof Geometry;
/**
 * @classdesc
 * Represents a Point type Geometry.
 * @category geometry
 * @extends Geometry
 * @mixes CenterMixin
 * @example
 * var marker = new Marker([100, 0], {
 *     'id' : 'marker0',
 *     'symbol' : {
 *         'markerFile'  : 'foo.png',
 *         'markerWidth' : 20,
 *         'markerHeight': 20,
 *     },
 *     'properties' : {
 *         'foo' : 'value'
 *     }
 * });
 */
export declare class Marker extends Marker_base {
	isPoint: boolean;
	/**
	 * @param {Coordinate} coordinates      - coordinates of the marker
	 * @param {Object} [options=null]       - construct options defined in [Marker]{@link Marker#options}
	 */
	constructor(coordinates: MarkerCoordinatesType, options?: MarkerOptionsType);
	getOutline(): Marker;
	setSymbol(symbol: AnyMarkerSymbol | Array<AnyMarkerSymbol>): this;
}
export type MarkerCoordinatesType = Coordinate | Array<number>;
export type MarkerOptionsType = GeometryOptionsType & {
	hitTestForEvent?: boolean;
	collision?: boolean;
	symbol?: AnyMarkerSymbol | Array<AnyMarkerSymbol>;
};
export type AnimationCallback = (...params: any[]) => any;
declare const Easing: {
	outExpo(x: number): number;
	outQuint(x: number): number;
	/**
	 * Start slow and speed up.
	 * @param {number} t Input between 0 and 1.
	 * @return {number} Output between 0 and 1.
	 */
	in(t: number): number;
	/**
	 * Start fast and slow down.
	 * @param {number} t Input between 0 and 1.
	 * @return {number} Output between 0 and 1.
	 */
	out(t: number): number;
	/**
	 * Start slow, speed up, and then slow down again.
	 * @param {number} t Input between 0 and 1.
	 * @return {number} Output between 0 and 1.
	 */
	inAndOut(t: number): number;
	/**
	 * Maintain a constant speed over time.
	 * @param {number} t Input between 0 and 1.
	 * @return {number} Output between 0 and 1.
	 */
	linear(t: number): number;
	/**
	 * Start slow, speed up, and at the very end slow down again.  This has the
	 * same general behavior as {@link inAndOut}, but the final slowdown
	 * is delayed.
	 * @param {number} t Input between 0 and 1.
	 * @return {number} Output between 0 and 1.
	 */
	upAndDown(t: number): number;
};
declare class Frame {
	state: any;
	styles: any;
	/**
	 * Create an animation frame.
	 * @param {Object} state  - animation state
	 * @param {Object} styles - styles to animate
	 */
	constructor(state: any, styles: any);
	get playState(): any;
	get symbol(): any;
}
declare class Player {
	options: AnimationOptionsPrivateType;
	playState: string;
	ready: boolean;
	finished: boolean;
	target?: any;
	duration: number;
	currentTime: number;
	startTime: number;
	/**
	 * Create an animation player
	 * @param {Function} animation - animation [framing]{@link framing} function
	 * @param {Object} options     - animation options
	 * @param {Function} onFrame  - callback function for animation steps
	 */
	constructor(animation: AnimationCallback, options: object, onFrame: AnimationCallback, target?: object);
	/**
	 * Start or resume the animation
	 * @return {Player} this
	 */
	play(): this;
	/**
	 * Pause the animation
	 * @return {Player} this
	 */
	pause(): this;
	/**
	 * Cancel the animation play and ready to play again
	 * @return {Player} this
	 */
	cancel(): this;
	/**
	 * Finish the animation play, and can't be played any more.
	 * @return {Player} this
	 */
	finish(): this;
	reverse(): void;
}
declare const Animation$1: {
	/**
	 * @property {Object} speed         - predefined animation speed
	 * @property {Number} speed.slow    - 2000ms
	 * @property {Number} speed.normal  - 1000ms
	 * @property {Number} speed.fast    - 500ms
	 */
	speed: {
		slow: number;
		normal: number;
		fast: number;
	};
	/**
	 * resolve styles for animation, get a style group of start style, styles to animate and end styles.
	 * @param  {Object} styles - styles to resolve
	 * @return {Object[]}  styles resolved
	 * @private
	 */
	_resolveStyles(styles: any): {}[];
	/**
	 * Generate a framing function
	 * @param  {Object[]} styles        - animation style group
	 * @param  {Object} [options=null]  - options
	 * @param  {Object} [options.easing=null]  - animation easing
	 * @return {Function} framing function helps to generate animation frames.
	 */
	framing(styles: any[], options?: any): (elapsed: number, duration: number) => Frame;
	_requestAnimFrame(fn: AnimationCallback): void;
	_a(): void;
	_run(): void;
	/**
	 * Create an animation player
	 * @param  {Object} styles  - styles to animate
	 * @param  {Object} options - animation options
	 * @param  {Function} step  - callback function for animation steps
	 * @return {Player} player
	 */
	animate(styles: any, options: any, step: AnimationCallback, target?: any): Player;
	_frameFn: () => void;
};
export declare const animate: (styles: any, options: any, step: AnimationCallback, target?: any) => Player;
/**
 * more animation easing functions https://echarts.apache.org/examples/zh/editor.html?c=line-easing
 */
export type EasingType = "outExpo" | "outQuint" | "in" | "out" | "inAndOut" | "linear" | "upAndDown" | ((t: number) => number);
export type AnimationOptionsType = {
	duration?: number;
	easing?: EasingType;
	repeat?: boolean;
};
export type AnimationOptionsPrivateType = {
	speed?: number;
	framer?: () => void;
	startTime?: number;
} & AnimationOptionsType;
export type animateShowCallback = (frame: Frame, currentCoord: Coordinate) => void;
export type PathCoordinates = Array<Coordinate>;
export type PathsCoordinates = Array<PathCoordinates>;
export type MultiPathsCoordinates = Array<PathsCoordinates>;
declare class Path extends Geometry {
	hasHoles?(): boolean;
	/**
	 * 动画展示线条
	 * @english
	 * Show the linestring with animation
	 * @param  {Object} [options=null] animation options
	 * @param  {Number} [options.duration=1000] duration
	 * @param  {String} [options.easing=out] animation easing
	 * @param  {Function} [cb=null] callback function in animation, function parameters: frame, currentCoord
	 * @example
	 *  line.animateShow({
	 *    duration : 2000,
	 *    easing : 'linear'
	 *  }, function (frame, currentCoord) {
	 *    //frame is the animation frame
	 *    //currentCoord is current coordinate of animation
	 *  });
	 * @return {LineString}         this
	 */
	animateShow(options?: (AnimationOptionsType | animateShowCallback), cb?: animateShowCallback): Player | undefined;
}
export type PathOptionsType = GeometryOptionsType & {
	"smoothness"?: boolean;
	"enableClip"?: boolean;
	"enableSimplify"?: boolean;
	"simplifyTolerance"?: number;
	"symbol"?: FillSymbol | LineSymbol;
};
/**
 * 表示LineString类型的Geometry。
 * @english
 * Represents a LineString type Geometry.
 * @category geometry
 * @extends Path
 * @example
 * var line = new LineString(
 *     [
 *         [121.45942, 31.24123],
 *         [121.46371, 31.24226],
 *         [121.46727, 31.23870],
 *         [121.47019, 31.24145]
 *     ]
 * ).addTo(layer);
 */
export declare class LineString extends Path {
	/**
	 * @param {Coordinate[]|Number[][]} coordinates - coordinates of the line string
	 * @param {Object} [options=null] - construct options defined in [LineString]{@link LineString#options}
	 */
	constructor(coordinates: LineStringCoordinatesType, options?: LineStringOptionsType);
	getOutline(): any;
	/**
	 * 给线段设置坐标
	 * @english
	 * Set new coordinates to the line string
	 * @param {Coordinate[]|Number[][]} coordinates - new coordinates
	 * @fires LineString#shapechange
	 * @return {LineString} this
	 */
	setCoordinates(coordinates: Array<Coordinate> | Array<Array<number>>): this;
	/**
	 * 获取线段的坐标
	 * @english
	 * Get coordinates of the line string
	 * @return {Coordinate[]|Number[][]} coordinates
	 */
	getCoordinates(): Coordinate[];
	/**
	 * 获取具有给定范围的线串的交点的中心
	 * @english
	 * Get center of linestring's intersection with give extent
	 * @example
	 *  const extent = map.getExtent();
	 *  const center = line.getCenterInExtent(extent);
	 * @param {Extent} extent
	 * @return {Coordinate} center, null if line doesn't intersect with extent
	 */
	getCenterInExtent(extent: Extent): Coordinate;
}
export type LineStringCoordinatesType = Array<Coordinate> | Array<Array<number>>;
export type LineStringOptionsType = PathOptionsType & {
	arrowStyle?: "classic" | [
		number,
		number
	];
	arrowPlacement?: "vertex-first" | "vertex-last" | "vertex-firstlast" | "point";
	symbol?: LineSymbol | Array<AnySymbol>;
};
/**
 * @classdesc
 * Geometry class for polygon type
 * @category geometry
 * @extends Path
 * @example
 * var polygon = new Polygon(
 *      [
 *          [
 *              [121.48053653961283, 31.24244899384889],
 *              [121.48049362426856, 31.238559229494186],
 *              [121.49032123809872, 31.236210614999653],
 *              [121.49366863494917, 31.242926029397037],
 *              [121.48577221160967, 31.243880093267567],
 *              [121.48053653961283, 31.24244899384889]
 *          ]
 *      ]
 *  ).addTo(layer);
 */
export type PolygonCoordinatesType = Array<Array<Coordinate>> | Array<Array<CoordinateArray>> | Array<Array<number>>;
export type RingCoordinates = PathCoordinates;
export type RingsCoordinates = PathsCoordinates;
export declare class Polygon extends Path {
	/**
	 * @param {Number[][]|Number[][][]|Coordinate[]|Coordinate[][]} coordinates - coordinates, shell coordinates or all the rings.
	 * @param {Object} [options=null] - construct options defined in [Polygon]{@link Polygon#options}
	 */
	constructor(coordinates: PolygonCoordinatesType | LineStringCoordinatesType, options?: PolygonOptionsType);
	getOutline(): null | Polygon;
	/**
	 * 设置多边形坐标
	 * @english
	 * Set coordinates to the polygon
	 *
	 * @param {Number[][]|Number[][][]|Coordinate[]|Coordinate[][]} coordinates - new coordinates
	 * @return {Polygon} this
	 * @fires Polygon#shapechange
	 */
	setCoordinates(coordinates: PolygonCoordinatesType | LineStringCoordinatesType): this;
	/**
	 * 获取多边形坐标
	 * @english
	 * Gets polygons's coordinates
	 *
	 * @returns {Coordinate[][]}
	 */
	getCoordinates(): RingsCoordinates;
	/**
	 * 获取具有给定范围的线串的交点的中心
	 * @english
	 * Get center of linestring's intersection with give extent
	 * @example
	 *  const extent = map.getExtent();
	 *  const center = line.getCenterInExtent(extent);
	 * @param {Extent} extent
	 * @return {Coordinate} center, null if line doesn't intersect with extent
	 */
	getCenterInExtent(extent: Extent): Coordinate;
	/**
	 * 获取多边形的外壳坐标
	 * @english
	 * Gets shell's coordinates of the polygon
	 *
	 * @returns {Coordinate[]}
	 */
	getShell(): RingCoordinates;
	/**
	 * 获取多边形的洞的坐标（如果有）。
	 * @english
	 * Gets holes' coordinates of the polygon if it has.
	 * @returns {Coordinate[][]}
	 */
	getHoles(): RingsCoordinates;
	/**
	 * 判断多边形是否带有洞
	 * @english
	 * Whether the polygon has any holes inside.
	 *
	 * @returns {Boolean}
	 */
	hasHoles(): boolean;
}
export type PolygonOptionsType = PathOptionsType & {
	"symbol"?: FillSymbol | Array<AnySymbol>;
};
export type GeometryEditSymbolType = {
	"markerType": string;
	"markerFill": string;
	"markerLineColor": string;
	"markerLineWidth": number;
	"markerWidth": number;
	"markerHeight": number;
	"opacity": number;
};
export type GeometryEditOptionsType = {
	symbol?: {
		[key: string]: any;
	};
	fixAspectRatio?: boolean;
	centerHandleSymbol?: GeometryEditSymbolType;
	vertexHandleSymbol?: GeometryEditSymbolType;
	newVertexHandleSymbol?: GeometryEditSymbolType;
	removeVertexOn?: string;
	collision?: boolean;
	collisionBufferSize?: number;
	vertexZIndex?: number;
	newVertexZIndex?: number;
	shadowDraggable?: boolean;
};
export interface Geometry {
	startEdit(opts?: GeometryEditOptionsType): this;
	endEdit(): this;
	redoEdit(): this;
	undoEdit(): this;
	cancelEdit(): this;
	isEditing(): boolean;
	undoEditcheck(): boolean;
	redoEditcheck(): boolean;
}
/**
 * @classdesc
 * Represents a GeometryCollection.
 * @category geometry
 * @extends Geometry
 * @example
 * var marker = new Marker([0, 0]),
 *     line = new LineString([[0, 0], [0, 1]]),
 *     polygon = new Polygon([[0, 0], [0, 1], [1, 3]]);
 * var collection = new GeometryCollection([marker, line, polygon])
 *     .addTo(layer);
 */
export declare class GeometryCollection extends Geometry {
	_lastUndoEditIndex: number;
	_lastRedoEditIndex: number;
	/**
	 * @param {Geometry[]} geometries - GeometryCollection's geometries
	 * @param {Object} [options=null] - options defined in [nGeometryCollection]{@link GeometryCollection#options}
	 */
	constructor(geometries?: Geometry[], opts?: GeometryOptionsType);
	getContainerExtent(out?: PointExtent): PointExtent;
	/**
	 * 将多个几何图形设置到几何图形集合
	 * @english
	 * Set new geometries to the geometry collection
	 * @param {Geometry[]} geometries
	 * @return {GeometryCollection} this
	 * @fires GeometryCollection#shapechange
	 */
	setGeometries(_geometries: Geometry[]): this;
	/**
	 * 获取几何集合中的几何图形们
	 * @english
	 * Get geometries of the geometry collection
	 * @return {Geometry[]} geometries
	 */
	getGeometries(): Geometry[];
	/**
	 * 按顺序对集合中存在的每个几何体执行一次提供的回调。
	 * @english
	 * Executes the provided callback once for each geometry present in the collection in order.
	 * @param  {Function} fn             - a callback function
	 * @param  {*} [context=undefined]   - callback's context
	 * @return {GeometryCollection} this
	 */
	forEach(fn: (geo: Geometry, index: number) => void, context?: any): this;
	/**
	 * 创建一个几何集合类，这个集合类的所有元素都通过所提供的函数实现的测试
	 * @english
	 * Creates a GeometryCollection with all elements that pass the test implemented by the provided function.
	 * @param  {Function} fn      - Function to test each geometry
	 * @param  {*} [context=undefined]    - Function's context
	 * @return {GeometryCollection} A GeometryCollection with all elements that pass the test
	 * @example
	 * var filtered = collection.filter(['==', 'foo', 'bar]);
	 * @example
	 * var filtered = collection.filter(geometry => geometry.getProperties().foo === 'bar');
	 */
	filter(fn?: (geo: Geometry) => boolean, context?: any): GeometryCollection;
	/**
	 * 按给定偏移平移或移动几何体集合。
	 * @english
	 * Translate or move the geometry collection by the given offset.
	 * @param  {Coordinate} offset - translate offset
	 * @return {GeometryCollection} this
	 */
	translate(offset: Coordinate): this;
	/**
	 * 几何图形集合是否为空
	 * @english
	 * Whether the geometry collection is empty
	 * @return {Boolean}
	 */
	isEmpty(): boolean;
	/**
	 * 移除本身，如果图层含有的话
	 * @english
	 * remove itself from the layer if any.
	 * @returns {Geometry} this
	 * @fires GeometryCollection#removestart
	 * @fires GeometryCollection#remove
	 * @fires GeometryCollection#removeend
	 */
	remove(): any;
	/**
	 * 显示几何集合
	 * @english
	 * Show the geometry collection.
	 * @return {GeometryCollection} this
	 * @fires GeometryCollection#show
	 */
	show(): this;
	/**
	 * 隐藏几何集合
	 * @english
	 * Hide the geometry collection.
	 * @return {GeometryCollection} this
	 * @fires GeometryCollection#hide
	 */
	hide(): this;
	onConfig(config?: string | Record<string, any>): void;
	getSymbol(): any;
	setSymbol(s?: any): this;
	startEdit(opts?: GeometryEditOptionsType): this;
	endEdit(): this;
	isEditing(): boolean;
	undoEdit(): this;
	redoEdit(): this;
	undoEditcheck(): boolean;
	redoEditcheck(): boolean;
}
/**
 * MultiPoint、MultiLineString和MultiPolygon的父类
 * @english
 * The parent class for MultiPoint, MultiLineString and MultiPolygon
 * @category geometry
 * @abstract
 * @extends {GeometryCollection}
 */
export type MultiGeometryCoordinates = PathCoordinates | PathsCoordinates | MultiPathsCoordinates;
export type SingleGeometryCreateCoordinates = MarkerCoordinatesType | LineStringCoordinatesType | PolygonCoordinatesType;
export type MultiGeometryCreateCoordinates = Array<SingleGeometryCreateCoordinates>;
export type MultiGeometryData = Array<SingleGeometryCreateCoordinates | Geometry>;
export type GeometryClass<T> = (new (coordinates: SingleGeometryCreateCoordinates, options: Record<string, any>) => T);
declare class MultiGeometry extends GeometryCollection {
	GeometryType: GeometryClass<Geometry>;
	/**
	 * @param  {Class} geoType      Type of the geometry
	 * @param  {String} type        type in String, e.g. "MultiPoint", "MultiLineString"
	 * @param  {Geometry[]} data    data
	 * @param  {Object} [options=null] configuration options
	 */
	constructor(geoType: GeometryClass<Geometry>, type: string, data: MultiGeometryData, options?: GeometryOptionsType);
	/**
	 * 获取集合中得坐标
	 * @english
	 * Get coordinates of the collection
	 * @return {Coordinate[]|Coordinate[][]|Coordinate[][][]} coordinates
	 */
	getCoordinates(): MultiGeometryCoordinates;
	/**
	 * 设置集合得坐标
	 * @english
	 * Set new coordinates to the collection
	 * @param {Coordinate[]|Coordinate[][]|Coordinate[][][]} coordinates
	 * @returns {Geometry} this
	 * @fires maptalk.Geometry#shapechange
	 */
	setCoordinates(coordinates: MultiGeometryCreateCoordinates): this;
}
/**
 * @classdesc
 * Represents a Geometry type of MultiPoint.
 * @category geometry
 * @extends MultiGeometry
 * @example
 * var multiPoint = new MultiPoint(
 *     [
 *         [121.5080881906138, 31.241128104458117],
 *         [121.50804527526954, 31.237238340103413],
 *         [121.5103728890997, 31.23888972560888]
 *     ]
 * ).addTo(layer);
 */
export declare class MultiPoint extends MultiGeometry {
	/**
	 * @param {Number[][]|Coordinate[]|Marker[]} data - construct data, coordinates or an array of markers
	 * @param {Object} [options=null] - options defined in [nMultiPoint]{@link MultiPoint#options}
	 */
	constructor(data: Array<MarkerCoordinatesType>, opts?: MarkerOptionsType);
	/**
	 * 找到给定坐标的最近点
	 * @english
	 * Find the closet point to the give coordinate
	 * @param {Coordinate} coordinate coordinate
	 * @returns {Coordinate} coordinate
	 */
	findClosest(coordinate: Coordinate): Coordinate;
}
declare class MultiPath extends MultiGeometry {
	/**
	 * 获取（MultiLineString或MultiPolygon）与给定范围的交点的中心
	 * @english
	 * Get center of (MultiLineString or MultiPolygon)'s intersection with give extent
	 * @example
	 *  const extent = map.getExtent();
	 *  const center = geometry.getCenterInExtent(extent);
	 * @param {Extent} extent
	 * @return {Coordinate} center, null if line doesn't intersect with extent
	 */
	getCenterInExtent(extent: Extent): null | Coordinate;
}
/**
 * @classdesc
 * Represents a Geometry type of MultiLineString
 * @category geometry
 * @extends MultiGeometry
 * @example
 * var multiLineString = new MultiLineString(
 *      [
 *          [
 *              [121.5289450479131, 31.2420083925986],
 *              [121.52860172515919, 31.238926401171824]
 *          ],
 *          [
 *              [121.53091915374796, 31.241898323208233],
 *              [121.53104789978069, 31.23859618183896]
 *          ],
 *          [
 *               [121.5324641061405, 31.241898323208233],
 *               [121.53242119079626, 31.239146546752256]
 *           ]
 *       ],
 *       {
 *           symbol:{
 *               'lineColor' : '#000000',
 *               'lineWidth' : 5,
 *               'lineOpacity' : 1
 *           },
 *          draggable:true
 *      }
 * ).addTo(layer);
 */
export declare class MultiLineString extends MultiPath {
	/**
	 * @param {Number[][][]|Coordinate[][]|LineString[]} data - construct data, coordinates or an array of linestrings
	 * @param {Object} [options=null]           - options defined in [MultiLineString]{@link MultiLineString#options}
	 */
	constructor(data: Array<LineStringCoordinatesType>, options?: LineStringOptionsType);
}
/**
 * @classdesc
 * Represents a Geometry type of MultiPolygon
 * @category geometry
 * @extends MultiGeometry
 * @example
 * var multiPolygon = new MultiPolygon(
 *       [
 *           [
 *               [
 *                   [121.55074604278596, 31.242008515751614],
 *                   [121.55074604278596, 31.23914637638951],
 *                   [121.55349262481711, 31.23914637638951],
 *                   [121.55349262481711, 31.24134802974913],
 *                   [121.5518618417361, 31.241384723537074],
 *                   [121.55074604278596, 31.242008515751614]
 *               ]
 *           ],
 *           [
 *               [
 *                   [121.5543080163576, 31.241054478932387],
 *                   [121.5543938470461, 31.240100432478293],
 *                   [121.55555256134048, 31.240173821009137],
 *                   [121.55542381530773, 31.240981091085693],
 *                   [121.5543080163576, 31.241054478932387]
 *               ]
 *           ]
 *
 *       ],
 *       {
 *           symbol:{
 *               'lineColor' : '#000000',
 *               'lineWidth' : 2,
 *               'lineDasharray' : null,//线形
 *               'lineOpacity' : 1,
 *               'polygonFill' : 'rgb(255, 0, 0)',
 *               'polygonOpacity' : 0.8
 *           },
 *           draggable:true
 * }).addTo(layer);
 */
export declare class MultiPolygon extends MultiPath {
	/**
	 * @param {Number[][][][]|Coordinate[][][]|Polygon[]} data - construct data, coordinates or an array of polygons
	 * @param {Object} [options=null]           - options defined in [MultiPolygon]{@link MultiPolygon#options}
	 */
	constructor(data: Array<PolygonCoordinatesType>, opts?: PolygonOptionsType);
}
/**
 * GeoJSON工具类
 * @english
 * GeoJSON utilities
 * @category geometry
 */
export declare const GeoJSON: {
	/**
	 * 将一个或多个GeoJSON对象转换为几何体
	 * @english
	 * Convert one or more GeoJSON objects to geometry
	 * @param  {String|Object|Object[]} geoJSON - GeoJSON objects or GeoJSON string
	 * @param  {Function} [foreachFn=undefined] - callback function for each geometry
	 * @param  {Function} [filterFn=undefined] - filter function for each geometry
	 * @return {Geometry|Geometry[]} a geometry array when input is a FeatureCollection
	 * @example
	 * var collection = {
	 *      "type": "FeatureCollection",
	 *      "features": [
	 *          { "type": "Feature",
	 *            "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
	 *            "properties": {"prop0": "value0"}
	 *           },
	 *           { "type": "Feature",
	 *             "geometry": {
	 *                 "type": "LineString",
	 *                 "coordinates": [
	 *                     [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
	 *                 ]
	 *             },
	 *             "properties": {
	 *                 "prop0": "value0",
	 *                 "prop1": 0.0
	 *             }
	 *           },
	 *           { "type": "Feature",
	 *             "geometry": {
	 *                 "type": "Polygon",
	 *                 "coordinates": [
	 *                     [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
	 *                       [100.0, 1.0], [100.0, 0.0] ]
	 *                 ]
	 *             },
	 *             "properties": {
	 *                 "prop0": "value0",
	 *                 "prop1": {"this": "that"}
	 *             }
	 *          }
	 *      ]
	 *  }
	 *  // A geometry array.
	 *  const geometries = GeoJSON.toGeometry(collection, geometry => { geometry.config('draggable', true); });
	 */
	toGeometry: (geoJSON: any, foreachFn?: (geo: Geometry) => void, filterFn?: (geo: Geometry) => boolean) => any;
	/**
	 * async将一个或多个GeoJSON对象转换为几何体
	 * @english
	* async Convert one or more GeoJSON objects to geometry
	* @param  {String|Object|Object[]} geoJSON - GeoJSON objects or GeoJSON string
	* @param  {Function} [foreachFn=undefined] - callback function for each geometry
	* @param  {Number} [countPerTime=2000] - Number of graphics converted per time
	* @param  {Function} [filterFn=undefined] - filter function for each geometry
	* @return {Promise}
	* @example
	*  GeoJSON.toGeometryAsync(geoJSON).then(geos=>{
	*    console.log(geos);
	* })
	* */
	toGeometryAsync(geoJSON: any, foreachFn?: (geo: Geometry) => void, countPerTime?: number, filterFn?: (geo: Geometry) => boolean): any;
	/**
	 * 转换单个GeoJSON对象
	 * @english
	 * Convert single GeoJSON object
	 * @param  {Object} geoJSONObj - a GeoJSON object
	 * @return {Geometry}
	 * @private
	 */
	_convert: (json: any, foreachFn?: any) => any;
	_isGeoJSON(json: any): boolean;
	/**
	 * 正在请求一个大容量的geojson文件。解决主线程阻塞问题
	 * @english
	* Requesting a large volume geojson file.Solve the problem of main thread blocking
	* @param  {String} url - GeoJSON file path
	* @param  {Number} [countPerTime=2000] - Number of graphics converted per time
	* @return {Promise}
	* @example
	*  GeoJSON.fetch('https://abc.com/file.geojson',2000).then(geojson=>{
	*    console.log(geojson);
	* })
	* */
	fetch(url: any, countPerTime?: number): any;
};
declare const Circle_base: {
	new (...args: any[]): {
		_coordinates: Coordinate;
		_pcenter: Coordinate;
		_dirtyCoords: boolean;
		getMap?(): Map$1;
		_getProjection?(): {
			code: string;
			is(code: string): boolean;
			project(p: Coordinate): Coordinate;
			unproject(p: Coordinate): Coordinate;
			projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
			unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
			isSphere(): boolean;
			isOutSphere(pcoord: Coordinate): boolean;
			wrapCoord(pcoord: Coordinate): Coordinate;
			getCircum(): Record<string, number>;
			getSphereExtent(): Extent;
		};
		onPositionChanged?(): void;
		_verifyProjection?(): void;
		_clearCache?(): void;
		_translateRotatePivot?(coordinate: Coordinate): any;
		getCoordinates(): Coordinate;
		setCoordinates(coordinates: Coordinate | number[]): any;
		_getCenter2DPoint(res?: number): Point;
		_getPrjCoordinates(): Coordinate;
		_setPrjCoordinates(pcenter: Coordinate): void;
		_updateCache(): void;
		_clearProjection(): void;
		_computeCenter(): Coordinate;
	};
} & typeof Polygon;
/**
 * @classdesc
 * Represents a Circle Geometry. <br>
 * @category geometry
 * @extends Polygon
 * @mixes Geometry.Center
 * @example
 * var circle = new Circle([100, 0], 1000, {
 *     id : 'circle0',
 *     properties : {
 *         foo : 'bar'
 *     }
 * });
 * @mixes CenterMixin
 */
export declare class Circle extends Circle_base {
	static fromJSON(json: Record<string, any>): Circle;
	/**
	 * @param {Coordinate} center - center of the circle
	 * @param {Number} radius           - radius of the circle, in meter
	 * @param {Object} [options=null]   - construct options defined in [Circle]{@link Circle#options}
	 */
	constructor(coordinates: Coordinate | Array<number>, radius: number, options?: CircleOptionsType);
	/**
	 * 获取圆形的半径
	 * @english
	 * Get radius of the circle
	 * @return {Number}
	 */
	getRadius(): number;
	/**
	 * 给圆形设置新的半径
	 * @english
	 * Set a new radius to the circle
	 * @param {Number} radius - new radius
	 * @return {Circle} this
	 * @fires Circle#shapechange
	 */
	setRadius(radius: number): this;
	/**
	 * 获取作为多边形的圆的外壳，外壳点数由[options.numberOfShellPoints决定
	 * @english
	 * Gets the shell of the circle as a polygon, number of the shell points is decided by [options.numberOfShellPoints]{@link Circle#options}
	 * @return {Coordinate[]} - shell coordinates
	 */
	getShell(): RingCoordinates;
	/**
	 * 圆没有任何孔，总是返回null
	 * @english
	 * Circle won't have any holes, always returns null
	 * @return {Object[]} an empty array
	 */
	getHoles(): RingsCoordinates;
	animateShow(): any;
}
export type CircleOptionsType = PolygonOptionsType & {
	numberOfShellPoints?: number;
};
declare const Ellipse_base: {
	new (...args: any[]): {
		_coordinates: Coordinate;
		_pcenter: Coordinate;
		_dirtyCoords: boolean;
		getMap?(): Map$1;
		_getProjection?(): {
			code: string;
			is(code: string): boolean;
			project(p: Coordinate): Coordinate;
			unproject(p: Coordinate): Coordinate;
			projectCoords(coordinates: Coordinate[] | Coordinate[][] | Coordinate[][][], antiMeridian?: boolean): Coordinate[] | Coordinate[][] | Coordinate[][][];
			unprojectCoords(projCoords: Coordinate[] | Coordinate[][] | Coordinate[][][]): Coordinate[] | Coordinate[][] | Coordinate[][][];
			isSphere(): boolean;
			isOutSphere(pcoord: Coordinate): boolean;
			wrapCoord(pcoord: Coordinate): Coordinate;
			getCircum(): Record<string, number>;
			getSphereExtent(): Extent;
		};
		onPositionChanged?(): void;
		_verifyProjection?(): void;
		_clearCache?(): void;
		_translateRotatePivot?(coordinate: Coordinate): any;
		getCoordinates(): Coordinate;
		/**
		 * 表示椭圆几何体
		 * @english
		 * Represents a Ellipse Geometry. <br>
		 * @category geometry
		 * @extends Polygon
		 * @mixes CenterMixin
		 * @example
		 * var ellipse = new Ellipse([100, 0], 1000, 500, {
		 *     id : 'ellipse0'
		 * });
		 */
		setCoordinates(coordinates: Coordinate | number[]): any;
		_getCenter2DPoint(res?: number): Point;
		_getPrjCoordinates(): Coordinate;
		_setPrjCoordinates(pcenter: Coordinate): void;
		_updateCache(): void;
		_clearProjection(): void;
		_computeCenter(): Coordinate;
	};
} & typeof Polygon;
/**
 * 表示椭圆几何体
 * @english
 * Represents a Ellipse Geometry. <br>
 * @category geometry
 * @extends Polygon
 * @mixes CenterMixin
 * @example
 * var ellipse = new Ellipse([100, 0], 1000, 500, {
 *     id : 'ellipse0'
 * });
 */
export declare class Ellipse extends Ellipse_base {
	width: number;
	height: number;
	options: EllipseOptionsType;
	static fromJSON(json: Record<string, any>): Ellipse;
	/**
	 * @param {Coordinate} center  - center of the ellipse
	 * @param {Number} width  - width of the ellipse, in meter
	 * @param {Number} height - height of the ellipse, in meter
	 * @param {Object}  [options=null] - construct options defined in [Ellipse]{@link Ellipse#options}
	 */
	constructor(coordinates: Coordinate | Array<number>, width: number, height: number, options?: EllipseOptionsType);
	/**
	 * 获取椭圆的宽度
	 * @english
	 * Get ellipse's width
	 * @return {Number}
	 */
	getWidth(): number;
	/**
	 * 设置椭圆的宽度
	 * Set new width to ellipse
	 * @param {Number} width - new width
	 * @fires Ellipse#shapechange
	 * @return {Ellipse} this
	 */
	setWidth(width: number): this;
	/**
	 * 获取椭圆高度
	 * @english
	 * Get ellipse's height
	 * @return {Number}
	 */
	getHeight(): number;
	/**
	 * 设置椭圆高度
	 * @english
	 * Set new height to ellipse
	 * @param {Number} height - new height
	 * @fires Ellipse#shapechange
	 * @return {Ellipse} this
	 */
	setHeight(height: number): this;
	/**
	 * 获取作为多边形的椭圆的外壳，外壳点数由决定
	 * @english
	 * Gets the shell of the ellipse as a polygon, number of the shell points is decided by [options.numberOfShellPoints]{@link Circle#options}
	 * @return {Coordinate[]} - shell coordinates
	 */
	getShell(): RingCoordinates;
	/**
	 * 椭圆没有任何孔，总是返回null
	 * @english
	 * Ellipse won't have any holes, always returns null
	 * @return {Object[]} an empty array
	 */
	getHoles(): RingsCoordinates;
	animateShow(): any;
}
export type EllipseOptionsType = PolygonOptionsType & {
	numberOfShellPoints?: number;
	debug?: boolean;
};
/**
 * @classdesc
 * Represents a Rectangle geometry.
 * @category geometry
 * @extends Polygon
 * @example
 * var rectangle = new Rectangle([100, 0], 1000, 500, {
 *     id : 'rectangle0'
 * });
 */
export declare class Rectangle extends Polygon {
	static fromJSON(json: any): Rectangle;
	/**
	 * @param {Coordinate} coordinates  - northwest of the rectangle
	 * @param {Number} width                     - width of the rectangle, in meter
	 * @param {Number} height                    - height of the rectangle, in meter
	 * @param {Object} [options=null]            - options defined in [Rectangle]{@link Rectangle#options}
	 */
	constructor(coordinates: Coordinate | Array<number>, width: number, height: number, opts?: RectangleOptionsType);
	/**
	 * Get coordinates of rectangle's northwest
	 * @return {Coordinate}
	 */
	getCoordinates(): Coordinate;
	/**
	 * Set a new coordinate for northwest of the rectangle
	 * @param {Coordinate} nw - coordinates of new northwest
	 * @return {Rectangle} this
	 * @fires Rectangle#positionchange
	 */
	setCoordinates(nw: Coordinate | Array<number>): this;
	/**
	 * Get rectangle's width
	 * @return {Number}
	 */
	getWidth(): number;
	/**
	 * Set new width to the rectangle
	 * @param {Number} width - new width
	 * @fires Rectangle#shapechange
	 * @return {Rectangle} this
	 */
	setWidth(width: number): this;
	/**
	 * Get rectangle's height
	 * @return {Number}
	 */
	getHeight(): number;
	/**
	 * Set new height to rectangle
	 * @param {Number} height - new height
	 * @fires Rectangle#shapechange
	 * @return {Rectangle} this
	 */
	setHeight(height: number): this;
	/**
	 * Gets the shell of the rectangle as a polygon
	 * @return {Coordinate[]} - shell coordinates
	 */
	getShell(): Coordinate[];
	/**
	 * Rectangle won't have any holes, always returns null
	 * @return {Object[]} an empty array
	 */
	getHoles(): RingsCoordinates;
	animateShow(): this;
}
export type RectangleOptionsType = PolygonOptionsType;
/**
 * @classdesc
 * Represents a sector Geometry.
 * @category geometry
 * @extends Circle
 * @example
 * var sector = new Sector([100, 0], 1000, 30, 120, {
 *     id : 'sector0'
 * });
 */
export declare class Sector extends Circle {
	startAngle: number;
	endAngle: number;
	static fromJSON(json: Record<string, any>): Sector;
	/**
	 * @param {Coordinate} center - center of the sector
	 * @param {Number} radius           - radius of the sector, in meter
	 * @param {Number} startAngle       - start angle of the sector, in degree
	 * @param {Number} endAngle         - end angle of the sector, in degree
	 * @param {Object} [options=null]   - construct options defined in [Sector]{@link Sector#options}
	 */
	constructor(coordinates: Coordinate | Array<number>, radius: number, startAngle: number, endAngle: number, opts?: SectorOptionsType);
	/**
	 * Get the sector's start angle
	 * @return {Number}
	 */
	getStartAngle(): number;
	/**
	 * Set a new start angle to the sector
	 * @param {Number} startAngle
	 * @return {Sector} this
	 * @fires Sector#shapechange
	 */
	setStartAngle(startAngle: number): this;
	/**
	 * Get the sector's end angle
	 * @return {Number}
	 */
	getEndAngle(): number;
	/**
	 * Set a new end angle to the sector
	 * @param {Number} endAngle
	 * @return {Sector} this
	 * @fires Sector#shapechange
	 */
	setEndAngle(endAngle: number): this;
	/**
	 * Gets the shell of the sector as a polygon, number of the shell points is decided by [options.numberOfShellPoints]{@link Sector#options}
	 * @return {Coordinate[]} - shell coordinates
	 */
	getShell(): RingCoordinates;
	getRotateOffsetAngle(): number;
}
export type SectorOptionsType = CircleOptionsType & {
	numberOfShellPoints?: number;
};
/**
 * 曲线样式LineString，所有曲线的抽象父类。
 * @english
 * Curve style LineString, an abstract parent class for all the curves.
 * @category geometry
 * @abstract
 * @extends LineString
 * @param {Coordinate[]|Number[][]} coordinates - coordinates of the line string
 * @param {Object} [options=null] - construct options defined in [LineString]{@link LineString#options}
 * @property {Boolean} [options.enableSimplify=false] - whether to simplify path before rendering
 * @property {Boolean} [options.enableClip=false] - whether to clip curve with map's current extent
 */
export declare class Curve extends LineString {
}
export type CurveOptionsType = LineStringOptionsType & {
	enableSimplify?: boolean;
	enableClip?: boolean;
};
/**
 * @classdesc
 * Circle Arc Curve
 * @category geometry
 * @extends Curve
 * @param {Coordinate[]|Number[][]} coordinates - coordinates of the curve
 * @param {Object} [options=null]   - construct options defined in [ArcCurve]{@link ArcCurve#options}
 * @example
 * var curve = new ArcCurve(
 *     [
 *         [121.47083767181408,31.214448123476995],
 *         [121.4751292062378,31.215475523000404],
 *         [121.47869117980943,31.211916269810335]
 *     ],
 *     {
 *         arcDegree : 120,
 *         symbol : {
 *             'lineWidth' : 5
 *         }
 *     }
 * ).addTo(layer);
 */
export declare class ArcCurve extends Curve {
	static fromJSON(json: any): ArcCurve;
}
export type ArcCurveOptionsType = CurveOptionsType & {
	arcDegree?: number;
};
/**
 * 三次贝塞尔曲线
 * @english
 * Cubic Bezier Curve
 * @category geometry
 * @extends Curve
 * @param {Coordinate[]|Number[][]} coordinates - coordinates of the curve
 * @param {Object} [options=null]   - construct options defined in [CubicBezierCurve]{@link CubicBezierCurve#options}
 * @example
 * var curve = new CubicBezierCurve(
 *     [
 *         [121.47083767181408,31.214448123476995],
 *         [121.4751292062378,31.215475523000404],
 *         [121.47869117980943,31.211916269810335]
 *     ],
 *     {
 *         symbol : {
 *             'lineWidth' : 5
 *         }
 *     }
 * ).addTo(layer);
 */
export declare class CubicBezierCurve extends Curve {
	static fromJSON(json: any): CubicBezierCurve;
}
/**
 * @classdesc
 * Quadratic Bezier Curve
 * @category geometry
 * @extends Curve
 * @param {Coordinate[]|Number[][]} coordinates - coordinates of the curve
 * @example
 * var curve = new QuadBezierCurve(
 *     [
 *         [121.47083767181408,31.214448123476995],
 *         [121.4751292062378,31.215475523000404],
 *         [121.47869117980943,31.211916269810335]
 *     ],
 *     {
 *         symbol : {
 *             'lineWidth' : 5
 *         }
 *     }
 * ).addTo(layer);
 */
export declare class QuadBezierCurve extends Curve {
	static fromJSON(json: any): QuadBezierCurve;
}
/**
 * @classdesc
 * Base class for  the Text marker classes, a marker which has text and background box. <br>
 * It is abstract and not intended to be instantiated.
 * @category geometry
 * @abstract
 * @extends Marker
 */
export declare class TextMarker extends Marker {
	getTextStyle?(): any;
	setTextStyle?(tyle?: any): any;
	setTextSymbol?(style?: any): any;
	setBoxStyle?(style?: any): any;
	getBoxStyle?(): any;
	setBoxSymbol?(style?: any): any;
	/**
	 * 获取标签的文本内容
	 * @english
	 * Get text content of the label
	 * @returns {String}
	 */
	getContent(): string;
	/**
	 * 给标签设置文本内容
	 * @english
	 * Set a new text content to the label
	 * @return {Label} this
	 * @fires Label#contentchange
	 */
	setContent(content: string): this;
	onAdd(): void;
	toJSON(): {
		[key: string]: any;
	};
	setSymbol(symbol: any): this;
}
export type TextMarkerOptionsType = MarkerOptionsType;
/**
 * @classdesc
 * Represents point type geometry for text boxes.<br>
 * A TextBox is used to draw a box with text inside on a particular coordinate.
 * @category geometry
 * @extends TextMarker
 * @mixes TextEditable
 * @example
 * var textbox = new maptalks.TextBox('This is a textbox',
	[0, 0], 200, 90,
	{
	  'draggable' : true,
	  'textStyle' : {
		'wrap' : true,
		'padding' : [12, 8],
		'verticalAlignment' : 'top',
		'horizontalAlignment' : 'right',
		'symbol' : {
		  'textFaceName' : 'monospace',
		  'textFill' : '#34495e',
		  'textHaloFill' : '#fff',
		  'textHaloRadius' : 4,
		  'textSize' : 18,
		  'textWeight' : 'bold'
		}
	  },
	  'boxSymbol': {
		// box's symbol
		'markerType' : 'square',
		'markerFill' : 'rgb(135,196,240)',
		'markerFillOpacity' : 0.9,
		'markerLineColor' : '#34495e',
		'markerLineWidth' : 1
	  }
	});
 */
export declare class TextBox extends TextMarker {
	options: TextBoxOptionsType;
	/**
	 * @param {String} content                 - TextBox's text content
	 * @param {Coordinate} coordinates         - coordinates
	 * @param {Number} width                   - width in pixel
	 * @param {Number} height                  - height in pixel
	 * @param {Object} [options=null]          - construct options defined in [TextBox]{@link TextBox#options}
	 */
	constructor(content: string, coordinates: Coordinate | Array<number>, width: number, height: number, options?: TextBoxOptionsType);
	/**
	 * 获取文本框得宽度
	 * @english
	 * Get textbox's width
	 * @return {Number}
	 */
	getWidth(): number;
	/**
	 * 设置文本框得宽度
	 * @english
	 * Set new width to textbox
	 * @param {Number} width
	 * returns {TextBox} this
	 */
	setWidth(width: number): this;
	/**
	 * 获取文本框高度
	 * @english
	 * Get textbox's height
	 * @return {Number}
	 */
	getHeight(): number;
	/**
	 * 设置文本框高度
	 * @english
	 * Set new height to textbox
	 * @param {Number} height
	 * returns {TextBox} this
	 */
	setHeight(height: number): this;
	/**
	 * 获取文本框边框样式
	 * @english
	 * Get textbox's boxSymbol
	 * @return {Object} boxsymbol
	 */
	getBoxSymbol(): VectorMarkerSymbol;
	/**
	 * 设置文本框边框样式
	 * @english
	 * Set a new box symbol to textbox
	 * @param {Object} symbol
	 * returns {TextBox} this
	 */
	setBoxSymbol(symbol: VectorMarkerSymbol): this;
	/**
	 * 获取文本框文本样式
	 * @english
	 * Get textbox's text style
	 * @return {Object}
	 */
	getTextStyle(): TextStyle | null;
	/**
	 * 设置文本框文本样式
	 * @english
	 * Set a new text style to the textbox
	 * @param {Object} style new text style
	 * returns {TextBox} this
	 */
	setTextStyle(style: TextStyle): this;
	static fromJSON(json: {
		[key: string]: any;
	}): TextBox;
	startEdit(opts: GeometryEditOptionsType): this;
	endEdit(): this;
}
export type TextStyle = {
	wrap?: boolean;
	padding?: [
		number,
		number
	];
	verticalAlignment?: "top" | "middle" | "bottom";
	horizontalAlignment?: "left" | "middle" | "right";
	symbol?: TextSymbol;
};
export type TextBoxOptionsType = TextMarkerOptionsType & {
	boxSymbol?: VectorMarkerSymbol;
	textStyle?: TextStyle;
};
/**
 * @classdesc
 * Represents point type geometry for text labels.<br>
 * A label is used to draw text (with a box background if specified) on a particular coordinate.
 * @category geometry
 * @extends TextMarker
 * @mixes TextEditable
 * @example
 * var label = new maptalks.Label('label with a box',
	[0, 0],
	{
	  'draggable' : true,
	  'boxStyle' : {
		'padding' : [12, 8],
		'verticalAlignment' : 'top',
		'horizontalAlignment' : 'right',
		'minWidth' : 300,
		'minHeight' : 200,
		'symbol' : {
		  'markerType' : 'square',
		  'markerFill' : 'rgb(135,196,240)',
		  'markerFillOpacity' : 0.9,
		  'markerLineColor' : '#34495e',
		  'markerLineWidth' : 1
		}
	  },
	  'textSymbol': {
		'textFaceName' : 'monospace',
		'textFill' : '#34495e',
		'textHaloFill' : '#fff',
		'textHaloRadius' : 4,
		'textSize' : 18,
		'textWeight' : 'bold',
		'textVerticalAlignment' : 'top'
	  }
	});
 */
export declare class Label extends TextMarker {
	options: any;
	/**
	 * @param {String} content                 - Label's text content
	 * @param {Coordinate} coordinates         - coordinates
	 * @param {Object} [options=null]          - construct options defined in [Label]{@link Label#options}
	 */
	constructor(content: string, coordinates: Coordinate | Array<number>, options?: LabelOptionsType);
	/**
	 * 获取标注的边框样式
	 * @english
	 * Get label's box style
	 * @return {Object}
	 */
	getBoxStyle(): BoxStyle;
	/**
	 * 设置标注的边框样式
	 * @english
	 * Set a new box style to the label
	 * @param {Object}
	 * @returns {Label} this
	 */
	setBoxStyle(style: BoxStyle): this;
	/**
	 * 获取标注的文本样式
	 * Get label's text symbol
	 * @return {Object}
	 */
	getTextSymbol(): TextSymbol;
	/**
	 * 给标注设置新的文本样式
	 * @english
	 * Set a new text symbol to the label
	 * @param {Object} symbol
	 * @returns {Label} this
	 */
	setTextSymbol(symbol: TextSymbol): this;
	static fromJSON(json: {
		[key: string]: any;
	}): Label;
}
export type BoxStyle = {
	padding?: [
		number,
		number
	];
	verticalAlignment?: "top" | "middle" | "bottom";
	horizontalAlignment?: "left" | "middle" | "right";
	minWidth?: number;
	minHeight?: number;
	symbol?: VectorMarkerSymbol;
};
export type LabelOptionsType = TextMarkerOptionsType & {
	textSymbol?: TextSymbol;
	boxStyle?: BoxStyle;
};
declare const ConnectorLine_base: {
	new (...args: any[]): {
		options: ConnectableOptionsType;
		_connSource: Geometry;
		_connTarget: Geometry;
		getMap?(): Map$1;
		getCoordinates?(): Coordinate[];
		setCoordinates?(coordinates: Coordinate[]): any;
		hide?(): any;
		show?(): any;
		remove?(): any;
		/**
		 * 获取连接线的源
		 * @english
		 * Gets the source of the connector line.
		 * @return {Geometry|control.Control|UIComponent}
		 * @function Connectable.getConnectSource
		 */
		getConnectSource(): Geometry;
		/**
		 * 设置连接线的源
		 * @english
		 * Sets the source to the connector line.
		 * @param {Geometry|control.Control|UIComponent} src
		 * @return {ConnectorLine} this
		 * @function Connectable.setConnectSource
		 */
		setConnectSource(src: Geometry): any;
		/**
		 * 获取连接线的目标
		 * @english
		 * Gets the target of the connector line.
		 * @return {Geometry|control.Control|UIComponent}
		 * @function Connectable.getConnectTarget
		 */
		getConnectTarget(): Geometry;
		/**
		 * 设置连接线目标
		 * @english
		 * Sets the target to the connector line.
		 * @param {Geometry|control.Control|UIComponent} target
		 * @return {ConnectorLine} this
		 * @function Connectable.setConnectTarget
		 */
		setConnectTarget(target: Geometry): any;
		_updateCoordinates(): void;
		onAdd(): void;
		onRemove(): void;
		_showConnect(): void;
		_registerEvents(): void;
	};
	_hasConnectors(geometry: any): boolean;
	_getConnectors(geometry: any): any;
} & typeof LineString;
/**
 * 直线连接线几何图形可以将几何图形或ui组件相互连接。
 * @english
 * A straight connector line geometry can connect geometries or ui components with each other. <br>
 *
 * @category geometry
 * @extends LineString
 * @example
 * var src = new Marker([0,0]).addTo(layer),
 *     dst = new Marker([1,0]).addTo(layer),
 *     line = new ConnectorLine(src, dst, {
 *         showOn : 'always', //'moving', 'click', 'mouseover', 'always'
 *         arrowStyle : 'classic',
 *         arrowPlacement : 'vertex-last', //vertex-first, vertex-last, vertex-firstlast, point
 *         symbol: {
 *           lineColor: '#34495e',
 *           lineWidth: 2
 *        }
 *     }).addTo(layer);
 * @mixes connectorLineMixin
 */
export declare class ConnectorLine extends ConnectorLine_base {
	/**
	 * @param {Geometry|control.Control|UIComponent} src     - source to connect
	 * @param {Geometry|control.Control|UIComponent} target  - target to connect
	 * @param {Object} [options=null]  - construct options defined in [ConnectorLine]{@link ConnectorLine#options}
	 */
	constructor(src: Geometry, target: Geometry, options?: ConnectorLineOptionsType);
}
declare const ArcConnectorLine_base: {
	new (...args: any[]): {
		options: ConnectableOptionsType;
		_connSource: Geometry;
		_connTarget: Geometry;
		getMap?(): Map$1;
		getCoordinates?(): Coordinate[];
		setCoordinates?(coordinates: Coordinate[]): any;
		hide?(): any;
		show?(): any;
		remove?(): any;
		/**
		 * 获取连接线的源
		 * @english
		 * Gets the source of the connector line.
		 * @return {Geometry|control.Control|UIComponent}
		 * @function Connectable.getConnectSource
		 */
		getConnectSource(): Geometry;
		/**
		 * 设置连接线的源
		 * @english
		 * Sets the source to the connector line.
		 * @param {Geometry|control.Control|UIComponent} src
		 * @return {ConnectorLine} this
		 * @function Connectable.setConnectSource
		 */
		setConnectSource(src: Geometry): any;
		/**
		 * 获取连接线的目标
		 * @english
		 * Gets the target of the connector line.
		 * @return {Geometry|control.Control|UIComponent}
		 * @function Connectable.getConnectTarget
		 */
		getConnectTarget(): Geometry;
		/**
		 * 设置连接线目标
		 * @english
		 * Sets the target to the connector line.
		 * @param {Geometry|control.Control|UIComponent} target
		 * @return {ConnectorLine} this
		 * @function Connectable.setConnectTarget
		 */
		setConnectTarget(target: Geometry): any;
		_updateCoordinates(): void;
		onAdd(): void;
		onRemove(): void;
		_showConnect(): void;
		_registerEvents(): void;
	};
	_hasConnectors(geometry: any): boolean;
	_getConnectors(geometry: any): any;
} & typeof ArcCurve;
/**
 * 弧形曲线连接线几何图形可以将几何图形或ui组件相互连接
 * @english
 * An arc curve connector line geometry can connect geometries or ui components with each other. <br>
 *
 * @category geometry
 * @extends ArcCurve
 * @example
 * var src = new Marker([0,0]).addTo(layer),
 *     dst = new Marker([1,0]).addTo(layer),
 *     line = new ArcConnectorLine(src, dst, {
 *         arcDegree : 120,
 *         showOn : 'always', //'moving', 'click', 'mouseover', 'always'
 *         arrowStyle : 'classic',
 *         arrowPlacement : 'vertex-last', //vertex-first, vertex-last, vertex-firstlast, point
 *         symbol: {
 *           lineColor: '#34495e',
 *           lineWidth: 2
 *        }
 *     }).addTo(layer);
 * @mixes connectorLineMixin
 */
export declare class ArcConnectorLine extends ArcConnectorLine_base {
	/**
	 * @param {Geometry|control.Control|UIComponent} src     - source to connect
	 * @param {Geometry|control.Control|UIComponent} target  - target to connect
	 * @param {Object} [options=null]  - construct options defined in [ConnectorLine]{@link ConnectorLine#options}
	 */
	constructor(src: Geometry, target: Geometry, options?: ArcConnectorLineOptionsType);
}
export type ConnectableOptionsType = {
	showOn?: "always" | "moving" | "click" | "mouseover";
};
export type ConnectorLineOptionsType = LineStringOptionsType & ConnectableOptionsType;
export type ArcConnectorLineOptionsType = ArcCurveOptionsType & ConnectableOptionsType;
export type Geometries = ArcCurve | Circle | ConnectorLine | ArcConnectorLine | CubicBezierCurve | Curve | Ellipse | Geometry | GeometryCollection | Label | LineString | Marker | MultiLineString | MultiPoint | MultiPolygon | Polygon | QuadBezierCurve | Rectangle | Sector | TextBox | TextMarker;
export type PathLikeGeometries = Curve | ArcCurve | CubicBezierCurve | QuadBezierCurve | LineString | MultiLineString | ConnectorLine | Rectangle | Polygon | MultiPolygon | Circle | Sector | Ellipse;
declare const Layer_base: {
	new (...args: any[]): {
		_jsonType?: string;
		getJSONType(): string;
	};
	registerJSONType(type: string): void;
	getJSONClass(type: string): {
		new (...args: any[]): {
			_eventMap?: Record<string, {
				handler: HandlerFn;
				context: any;
			}[]>;
			_eventParent?: any;
			_eventTarget?: any;
			on(eventsOn: string | EventRecords, handler: HandlerFn, context?: any): any;
			addEventListener(...args: any[]): any;
			once(eventTypes: string | EventRecords, handler: HandlerFn, context?: any): any;
			off(eventsOff: string | EventRecords, handler: HandlerFn, context?: any): any;
			removeEventListener(...args: any[]): any;
			listens(eventType: string, handler?: HandlerFn, context?: any): number;
			getListeningEvents(): string[];
			copyEventListeners(target: any): any;
			fire(eventType: string, param?: BaseEventParamsType): any;
			_wrapOnceHandler(evtType: string, handler: HandlerFn, context?: any): (...args: any[]) => void;
			_switch(to: string, eventRecords: EventRecords, context?: any): any;
			_clearListeners(eventType: string): void;
			_clearAllListeners(): void;
			_setEventParent(parent: any): any;
			_setEventTarget(target: any): any; /**
			 * hide事件
			 *
			 * @english
			 * hide event.
			 *
			 * @event Layer#hide
			 * @type {Object}
			 * @property {String} type - hide
			 * @property {Layer} target    - the layer fires the event
			 */
			_fire(eventType: string, param: BaseEventParamsType): any;
		};
	} & {
		new (...args: any[]): {};
		registerRenderer<T extends typeof Class>(name: string, clazz: T): any & typeof Class;
		getRendererClass(name: string): Class;
	} & typeof Class;
} & {
	new (...args: any[]): {
		_eventMap?: Record<string, {
			handler: HandlerFn;
			context: any;
		}[]>;
		_eventParent?: any;
		_eventTarget?: any;
		on(eventsOn: string | EventRecords, handler: HandlerFn, context?: any): any;
		addEventListener(...args: any[]): any;
		once(eventTypes: string | EventRecords, handler: HandlerFn, context?: any): any;
		off(eventsOff: string | EventRecords, handler: HandlerFn, context?: any): any;
		removeEventListener(...args: any[]): any;
		listens(eventType: string, handler?: HandlerFn, context?: any): number;
		getListeningEvents(): string[];
		copyEventListeners(target: any): any;
		fire(eventType: string, param?: BaseEventParamsType): any;
		_wrapOnceHandler(evtType: string, handler: HandlerFn, context?: any): (...args: any[]) => void;
		_switch(to: string, eventRecords: EventRecords, context?: any): any;
		_clearListeners(eventType: string): void;
		_clearAllListeners(): void;
		_setEventParent(parent: any): any;
		_setEventTarget(target: any): any; /**
		 * hide事件
		 *
		 * @english
		 * hide event.
		 *
		 * @event Layer#hide
		 * @type {Object}
		 * @property {String} type - hide
		 * @property {Layer} target    - the layer fires the event
		 */
		_fire(eventType: string, param: BaseEventParamsType): any;
	};
} & {
	new (...args: any[]): {};
	registerRenderer<T extends typeof Class>(name: string, clazz: T): any & typeof Class;
	getRendererClass(name: string): Class;
} & typeof Class;
/**
 * layers的基础类，定义了所有layers公共方法。
 * 抽象类，不做实例化打算
 *
 * @english
 * @classdesc
 * Base class for all the layers, defines common methods that all the layer classes share. <br>
 * It is abstract and not intended to be instantiated.
 *
 * @category layer
 * @abstract
 * @extends Class
 * @mixes Eventable
 * @mixes JSONAble
 * @mixes Renderable
 */
export declare class Layer extends Layer_base {
	map: Map$1;
	parent: any;
	options: LayerOptionsType;
	getLayers?(): Layer[];
	constructor(id: string, options?: LayerOptionsType);
	/**
	 * 加载tile layer,不能被子类重写
	 *
	 * @english
	 * load the tile layer, can't be overrided by sub-classes
	 */
	load(): this;
	/**
	 * 获取layer Id
	 *
	 * @english
	 * Get the layer id
	 * @returns id
	 */
	getId(): string;
	/**
	 * 为layer新设一个 Id
	 *
	 * @english
	 * Set a new id to the layer
	 * @param id - new layer id
	 * @return this
	 * @fires Layer#idchange
	 */
	setId(id: string): this;
	/**
	 * 将图层添加至 map
	 *
	 * @english
	 * Adds itself to a map.
	 * @param map - map added to
	 * @return this
	 */
	addTo(map: Map$1): this;
	/**
	 * 为layer 设置zIndex
	 *
	 * @engilsh
	 * Set a z-index to the layer
	 * @param zIndex - layer's z-index
	 * @return this
	 */
	setZIndex(zIndex: number): this;
	/**
	 * 获取layer 的 zIndex
	 *
	 * @english
	 * Get the layer's z-index
	 * @return
	 */
	getZIndex(): number;
	/**
	 * 获取 layer 的 minZoom
	 *
	 * @english
	 * Get Layer's minZoom to display
	 * @return
	 */
	getMinZoom(): number;
	/**
	 * 获取layer 的 maxZoom
	 *
	 * @english
	 * Get Layer's maxZoom to display
	 * @return
	 */
	getMaxZoom(): number;
	/**
	 * 获取 layer 的 opacity
	 *
	 * @english
	 * Get layer's opacity
	 * @returns {Number}
	 */
	getOpacity(): number;
	/**
	 * 设置 layer 的 opacity
	 *
	 * @english
	 * Set opacity to the layer
	 * @param opacity - layer's opacity
	 * @return this
	 */
	setOpacity(op: number): this;
	/**
	 * layer 是否为 HTML5 Canvas 渲染
	 *
	 * @english
	 * If the layer is rendered by HTML5 Canvas.
	 * @return
	 * @protected
	 */
	isCanvasRender(): boolean;
	/**
	 * 获取图层所在 map
	 *
	 * @english
	 * Get the map that the layer added to
	 * @returns {Map}
	 */
	getMap(): Map$1;
	/**
	 * 获取 layer 所在map 的 projection
	 *
	 * @english
	 * Get projection of layer's map
	 * @returns
	 */
	getProjection(): CommonProjectionType;
	/**
	 * 将图层置顶
	 *
	 * @english
	 * Brings the layer to the top of all the layers
	 * @returns this
	 */
	bringToFront(): this;
	/**
	 * 将图层置底
	 *
	 * @english
	 * Brings the layer under the bottom of all the layers
	 * @returns {Layer} this
	 */
	bringToBack(): this;
	/**
	 * 显示图层
	 *
	 * @english
	 * Show the layer
	 * @returns this
	 */
	show(): this;
	/**
	 * 隐藏图层
	 *
	 * @english
	 * Hide the layer
	 * @returns this
	 */
	hide(): this;
	/**
	 * layer 的当前 visible 状态
	 *
	 * @english
	 * Whether the layer is visible now.
	 * @return
	 */
	isVisible(): boolean;
	/**
	 * 移除图层
	 *
	 * @english
	 * Remove itself from the map added to.
	 * @returns this
	 */
	remove(): this;
	/**
	 * 获取 mask geometry
	 *
	 * @english
	 * Get the mask geometry of the layer
	 * @return {Geometry}
	 */
	getMask(): Marker | MultiPolygon | Polygon;
	/**
	 * 设置mask geometry, 只显示掩码的区域
	 *
	 * @english
	 * Set a mask geometry on the layer, only the area in the mask will be displayed.
	 * @param {Geometry} mask - mask geometry, can only be a Marker with vector symbol, a Polygon or a MultiPolygon
	 * @returns {Layer} this
	 */
	setMask(mask: Polygon | MultiPolygon | Marker): this;
	/**
	 * 移除mask
	 *
	 * @engilsh
	 * Remove the mask
	 * @returns {Layer} this
	 */
	removeMask(): this;
	/**
	 * 准备层的加载，是一个由子类重写的方法。
	 *
	 * @english
	 * Prepare Layer's loading, this is a method intended to be overrided by subclasses.
	 * @return true to continue loading, false to cease.
	 * @protected
	 */
	onLoad(): boolean;
	onLoadEnd(): void;
	/**
	 * 是否加载layer
	 *
	 * @english
	 * Whether the layer is loaded
	 * @return
	 */
	isLoaded(): boolean;
	/**
	 * 获取collision index
	 *
	 * @english
	 * Get layer's collision index
	 * @returns {CollisionIndex}
	 */
	getCollisionIndex(): CollisionIndex;
	/**
	 * 清除 layer 的 collision index。
	 * 如果 collisionScope !== 'layer' 将忽略
	 *
	 * @english
	 * Clear layer's collision index.
	 * Will ignore if collisionScope is not layer
	 */
	clearCollisionIndex(): this;
	getRenderer(): any;
	onConfig(conf: {
		[key: string]: any;
	}): void;
	onAdd(): void;
	onRendererCreate(): void;
	onCanvasCreate(): void;
	onRemove(): void;
	toJSON(options?: any): LayerJSONType;
	/**
	 * Reproduce a Layer from layer's JSON.
	 * @param  {Object} layerJSON - layer's JSON
	 * @return {Layer}
	 */
	static fromJSON(layerJSON: {
		[key: string]: any;
	}): Layer | null;
	identify(_coordinate: Coordinate, _options: LayerIdentifyOptionsType): void;
	identifyAtPoint(_containerPoint: Point, _options: LayerIdentifyOptionsType): void;
}
export type LayerOptionsType = {
	attribution?: string;
	minZoom?: number;
	maxZoom?: number;
	visible?: boolean;
	opacity?: number;
	zIndex?: number;
	globalCompositeOperation?: string;
	renderer?: "canvas" | "gl" | "dom" | null;
	debugOutline?: string;
	cssFilter?: string;
	forceRenderOnMoving?: boolean;
	forceRenderOnZooming?: boolean;
	forceRenderOnRotating?: boolean;
	collision?: boolean;
	collisionScope?: "layer" | "map";
	hitDetect?: boolean;
	canvas?: HTMLCanvasElement;
	mask?: any;
	drawImmediate?: boolean;
	geometryEvents?: boolean;
	geometryEventTolerance?: number;
	maskClip?: boolean;
};
export type LayerJSONType = {
	id: string;
	type: string;
	options: Record<string, any>;
	geometries?: Array<any>;
	layers?: Array<any>;
};
export type LayerIdentifyOptionsType = {
	onlyVisible?: boolean;
	tolerance?: number;
};
export type FullExtent = {
	top: number;
	left: number;
	bottom: number;
	right: number;
};
export type SpatialReferenceType = {
	projection: string | ProjectionType;
	resolutions?: number[];
	fullExtent?: FullExtent | JsonExtent;
};
/**
 * 空间参考类
 *
 * @english
 * SpatialReference Class
 */
export declare class SpatialReference {
	options: SpatialReferenceType;
	isEPSG: boolean;
	json: SpatialReferenceType;
	constructor(options?: SpatialReferenceType);
	static registerPreset(name: string, value: SpatialReferenceType): void;
	static getPreset(preset: string): SpatialReferenceType;
	static getAllPresets(): string[];
	static loadArcgis(url: string, cb: (_: any, spatialRef?: any) => void, options?: any): typeof SpatialReference;
	static loadWMTS(url: string, cb: (_: any, spatialRef?: any) => void, options?: any): typeof SpatialReference;
	/**
	 * 获取投影类实例对象
	 *
	 * @english
	 * get Projection Class instance
	 * @param projection
	 * @returns
	 */
	static getProjectionInstance(projection?: string | ProjectionType): any;
	static equals(sp1: SpatialReferenceType, sp2: SpatialReferenceType): boolean;
	getResolutions(): number[];
	getResolution(zoom: number): number;
	getProjection(): projections.ProjectionType;
	getFullExtent(): Extent;
	getTransformation(): Transformation;
	getMinZoom(): number;
	getMaxZoom(): number;
	getZoomDirection(): number;
	toJSON(): SpatialReferenceType;
	isPyramid(): boolean;
}
export declare function getDefaultSpatialReference(): Record<string, SpatialReferenceType>;
declare const Control_base: {
	new (...args: any[]): {
		_eventMap?: Record<string, {
			handler: HandlerFn;
			context: any;
		}[]>;
		_eventParent?: any;
		_eventTarget?: any;
		on(eventsOn: string | EventRecords, handler: HandlerFn, context?: any): any;
		addEventListener(...args: any[]): any;
		once(eventTypes: string | EventRecords, handler: HandlerFn, context?: any): any;
		off(eventsOff: string | EventRecords, handler: HandlerFn, context?: any): any;
		removeEventListener(...args: any[]): any;
		listens(eventType: string, handler?: HandlerFn, context?: any): number;
		getListeningEvents(): string[];
		copyEventListeners(target: any): any;
		fire(eventType: string, param?: BaseEventParamsType): any;
		_wrapOnceHandler(evtType: string, handler: HandlerFn, context?: any): (...args: any[]) => void;
		_switch(to: string, eventRecords: EventRecords, context?: any): any;
		_clearListeners(eventType: string): void;
		_clearAllListeners(): void;
		_setEventParent(parent: any): any;
		_setEventTarget(target: any): any;
		_fire(eventType: string, param: BaseEventParamsType): any;
	};
} & typeof Class;
declare abstract class Control<T = ControlOptionsType> extends Control_base {
	options: ControlOptionsType & T;
	static positions: {
		[key: string]: DomPositionType;
	};
	/**
	 * Methods needs to implement:  <br>
	 *  <br>
	 * 1. Method to create UI's Dom element  <br>
	 * function buildOn : HTMLElement  <br>
	 *  <br>
	 * 2. Optional, a callback when the control is added.  <br>
	 * function onAdd : void  <br>
	 * 3. Optional, a callback when the control is removed.  <br>
	 * function onRemove : void  <br>
	 *  <br>
	 * @param  {Object} [options=null] configuration options
	 */
	constructor(options: ControlOptionsType & T);
	onAdd(): void;
	onRemove(): void;
	abstract buildOn(map?: Map$1): HTMLElement;
	/**
	 * Adds the control to a map.
	 * @param {Map} map
	 * @returns {control.Control} this
	 * @fires control.Control#add
	 */
	addTo(map: Map$1): this;
	/**
	 * update control container
	 * @return {control.Control} this
	 */
	update(): this;
	/**
	 * Get the map that the control is added to.
	 * @return {Map}
	 */
	getMap(): Map$1;
	/**
	 * Get the position of the control
	 * @return {Object}
	 */
	getPosition(): DomPositionType;
	/**
	 * update the control's position
	 * @param {String|Object} position - can be one of 'top-left', 'top-right', 'bottom-left', 'bottom-right' or a position object like {'top': 40,'left': 60}
	 * @return {control.Control} this
	 * @fires control.Control#positionchange
	 */
	setPosition(position: ControlPositionType): this;
	/**
	 * Get the container point of the control.
	 * @return {Point}
	 */
	getContainerPoint(): Point;
	/**
	 * Get the control's container.
	 * Container is a div element wrapping the control's dom and decides the control's position and display.
	 * @return {HTMLElement}
	 */
	getContainer(): HTMLElement;
	/**
	 * Get html dom element of the control
	 * @return {HTMLElement}
	 */
	getDOM(): HTMLElement;
	/**
	 * Show
	 * @return {control.Control} this
	 */
	show(): this;
	/**
	 * Hide
	 * @return {control.Control} this
	 */
	hide(): this;
	/**
	 * Whether the control is visible
	 * @return {Boolean}
	 */
	isVisible(): boolean;
	/**
	 * Remove itself from the map
	 * @return {control.Control} this
	 * @fires control.Control#remove
	 */
	remove(): this;
	onConfig(conf: ClassOptions): void;
}
export type DomPositionType = {
	top?: number | string;
	bottom?: number | string;
	left?: number | string;
	right?: number | string;
};
export type ControlPositionType = string | DomPositionType;
export type ControlOptionsType = {
	position?: ControlPositionType;
	cssName?: string | Array<string>;
};
interface Map$1 {
	addControl(control: Control): this;
	removeControl(control: Control): this;
}
declare class Attribution extends Control<AttributionOptionsTypeSpec> {
	buildOn(): HTMLDivElement;
	getContent(): string | HTMLElement;
	setContent(content: string | HTMLElement): this;
	onAdd(): void;
	onRemove(): void;
}
export type AttributionOptionsTypeSpec = {
	content?: string | HTMLElement;
	custom?: boolean;
};
export type AttributionOptionsType = AttributionOptionsTypeSpec & ControlOptionsType;
declare class Compass extends Control<CompassOptionsTypeSpec> {
	/**
	 * method to build DOM of the control
	 * @param  {Map} map map to build on
	 * @return {HTMLDOMElement}
	 */
	buildOn(map: Map$1): HTMLDivElement;
	onAdd(): void;
	onRemove(): void;
}
export type CompassOptionsTypeSpec = {
	position: string | DomPositionType;
};
declare class LayerSwitcher extends Control<LayerSwitcherOptionsTypeSpec> {
	container: HTMLDivElement;
	panel: HTMLDivElement;
	button: HTMLButtonElement;
	/**
	 * method to build DOM of the control
	 * @return {HTMLDOMElement}
	 */
	buildOn(): HTMLDivElement;
	onAdd(): void;
	onRemove(): void;
}
export type LayerSwitcherOptionsTypeSpec = {
	baseTitle?: string;
	overlayTitle?: string;
	containerClass?: string;
	excludeLayers?: Array<string>;
};
declare class Overview extends Control<OverviewOptionsTypeSpec> {
	mapContainer: HTMLDivElement;
	button: HTMLDivElement;
	/**
	 * method to build DOM of the control
	 * @param  {Map} map map to build on
	 * @return {HTMLDOMElement}
	 */
	buildOn(): HTMLElement;
	onAdd(): void;
	onRemove(): void;
	/**
	 * Maximize overview control
	 * @returns {control.Overview}
	 */
	maxmize(): this;
	/**
	 * Minimize overview control
	 * @returns {control.Overview}
	 */
	minimize(): this;
	/**
	 * Return overview's map object
	 * @returns {Map}
	 */
	getOverviewMap(): Map$1;
}
export type OverviewOptionsTypeSpec = {
	level?: number;
	size?: Array<number>;
	maximize?: boolean;
	symbol?: {
		"lineWidth": number;
		"lineColor": string;
		"polygonFill": string;
		"polygonOpacity": number;
	};
	containerClass?: string;
	buttonClass?: string;
};
declare class Panel extends Control<PanelOptionsTypeSpec> {
	draggable: DragHandler;
	/**
	 * method to build DOM of the control
	 * @param  {Map} map map to build on
	 * @return {HTMLDOMElement}
	 */
	buildOn(): HTMLDivElement;
	/**
	 * update control container
	 * @return {control.Panel} this
	 */
	update(): any;
	/**
	 * Set the content of the Panel.
	 * @param {String|HTMLElement} content - content of the infowindow.
	 * return {control.Panel} this
	 * @fires Panel#contentchange
	 */
	setContent(content: string | HTMLElement): this;
	/**
	 * Get content of  the infowindow.
	 * @return {String|HTMLElement} - content of the infowindow
	 */
	getContent(): string | HTMLElement;
}
export type PanelOptionsTypeSpec = {
	draggable?: boolean;
	custom?: boolean;
	content?: string | HTMLElement;
	closeButton?: boolean;
};
declare class Reset extends Control<ResetOptionsTypeSpec> {
	/**
	 * method to build DOM of the control
	 * @param  {Map} map map to build on
	 * @return {HTMLDOMElement}
	 */
	buildOn(): HTMLDivElement;
	onAdd(): void;
	setView(view: MapViewType): void;
	onRemove(): void;
}
export type ResetOptionsTypeSpec = {
	view?: MapViewType;
};
declare class Scale extends Control<ScaleOptionsTypeSpec> {
	/**
	 * method to build DOM of the control
	 * @param  {Map} map map to build on
	 * @return {HTMLDOMElement}
	 */
	buildOn(map: Map$1): HTMLDivElement;
	onRemove(): void;
}
export type ScaleOptionsTypeSpec = {
	maxWidth?: number;
	metric?: boolean;
	imperial?: boolean;
	containerClass?: string;
};
declare class Toolbar extends Control<ToolbarOptionsTypeSpec> {
	/**
	 * method to build DOM of the control
	 * @param  {Map} map map to build on
	 * @return {HTMLDOMElement}
	 */
	buildOn(map: Map$1): HTMLElement;
}
export type ToolBarItem = {
	item: string;
	click: () => void;
};
export type ToolbarOptionsTypeSpec = {
	height?: number;
	vertical?: boolean;
	reverseMenu?: boolean;
	items: Array<ToolBarItem>;
};
declare class Zoom extends Control<ZoomOptionsTypeSpec> {
	/**
	 * method to build DOM of the control
	 * @param  {Map} map map to build on
	 * @return {HTMLDOMElement}
	 */
	buildOn(map: Map$1): HTMLElement;
	onRemove(): void;
}
export type ZoomOptionsTypeSpec = {
	zoomLevel?: boolean;
	seamless?: boolean;
};
declare const Map_base: {
	new (...args: any[]): {
		_handlers?: Handler[];
		addHandler(name: any, handlerClass: any): any;
		removeHandler(name: any): any;
		_clearHandlers(): void;
	};
} & {
	new (...args: any[]): {
		_eventMap?: Record<string, {
			handler: HandlerFn;
			context: any;
		}[]>;
		_eventParent?: any;
		_eventTarget?: any;
		on(eventsOn: string | EventRecords, handler: HandlerFn, context?: any): any;
		addEventListener(...args: any[]): any;
		once(eventTypes: string | EventRecords, handler: HandlerFn, context?: any): any;
		off(eventsOff: string | EventRecords, handler: HandlerFn, context?: any): any;
		removeEventListener(...args: any[]): any;
		listens(eventType: string, handler?: HandlerFn, context?: any): number;
		getListeningEvents(): string[];
		copyEventListeners(target: any): any;
		fire(eventType: string, param?: BaseEventParamsType): any;
		_wrapOnceHandler(evtType: string, handler: HandlerFn, context?: any): (...args: any[]) => void;
		_switch(to: string, eventRecords: EventRecords, context?: any): any;
		_clearListeners(eventType: string): void;
		_clearAllListeners(): void;
		_setEventParent(parent: any): any;
		_setEventTarget(target: any): any;
		_fire(eventType: string, param: BaseEventParamsType): any;
	};
} & {
	new (...args: any[]): {};
	registerRenderer<T extends typeof Class>(name: string, clazz: T): any & typeof Class;
	getRendererClass(name: string): Class;
} & typeof Class;
/**
 * The central class of the library, to create a map on a container.
 *
 * @category map
 *
 * @mixes Eventable
 * @mixes Handlerable
 * @mixes ui.Menuable
 * @mixes Renderable
 *
 * @example
 * var map = new maptalks.Map("map",{
 *      center:     [180,0],
 *      zoom:  4,
 *      baseLayer : new maptalks.TileLayer("base",{
 *          urlTemplate:'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
 *          subdomains:['a','b','c']
 *      }),
 *      layers : [
 *          new maptalks.VectorLayer('v', [new maptalks.Marker([180, 0])])
 *      ]
 * });
 */
declare class Map$1 extends Map_base {
	VERSION: string;
	isMap: boolean;
	centerAltitude: number;
	width: number;
	height: number;
	CanvasClass: any;
	cameraCenterDistance: number;
	options: MapOptionsType;
	static VERSION: string;
	JSON_VERSION: "1.0";
	attributionControl?: Attribution;
	/**
	 * @param {(string|HTMLElement|object)} container - The container to create the map on, can be:<br>
	 *                                          1. A HTMLElement container.<br/>
	 *                                          2. ID of a HTMLElement container.<br/>
	 *                                          3. Any canvas compatible container
	 * @param {Object} options - construct options
	 * @param {(Number[]|Coordinate)} options.center - initial center of the map.
	 * @param {Number} options.zoom - initial zoom of the map.
	 * @param {Object} [options.spatialReference=null] - map's spatial reference, default is using projection EPSG:3857 with resolutions used by google map/osm.
	 * @param {Layer} [options.baseLayer=null] - base layer that will be set to map initially.
	 * @param {Layer[]} [options.layers=null] - layers that will be added to map initially.
	 * @param {*} options.* - any other option defined in [Map.options]{@link Map#options}      [description]
	 */
	constructor(container: MapContainerType, options: MapCreateOptionsType);
	/**
	 * Add hooks for additional codes when map's loading complete, useful for plugin developping.
	 * Note that it can only be called before the map is created.
	 * @param {Function | any} fn
	 * @returns {Map}
	 */
	static addOnLoadHook(fn: string | ((...args: any[]) => void), ...args: any[]): typeof Map$1;
	/**
	 * Whether the map is loaded or not.
	 * @return {Boolean}
	 */
	isLoaded(): boolean;
	/**
	 * Get map's container
	 * @returns {HTMLElement}
	 */
	getContainer(): HTMLCanvasElement | HTMLDivElement;
	/**
	 * Get the spatial reference of the Map.
	 * @return {SpatialReference} map's spatial reference
	 */
	getSpatialReference(): SpatialReference;
	/**
	 * Change the spatial reference of the map. <br>
	 * A SpatialReference is a series of settings to decide the map presentation:<br>
	 * 1. the projection.<br>
	 * 2. zoom levels and resolutions. <br>
	 * 3. full extent.<br>
	 * There are some [predefined spatial references]{@link http://www.foo.com}, and surely you can [define a custom one.]{@link http://www.foo.com}.<br>
	 * SpatialReference can also be updated by map.config('spatialReference', spatialReference);
	 * @param {SpatialReference} spatialReference - spatial reference
	 * @returns {Map} this
	 * @fires Map#spatialreferencechange
	 * @example
	 *  map.setSpatialReference({
			projection:'EPSG:4326',
			resolutions: (function() {
				const resolutions = [];
				for (let i=0; i < 19; i++) {
					resolutions[i] = 180/(Math.pow(2, i)*128);
				}
				return resolutions;
			})()
	 *  });
	   @example
	 *  map.config('spatialReference', {
			projection:'EPSG:4326',
			resolutions: (function() {
				const resolutions = [];
				for (let i=0; i < 19; i++) {
					resolutions[i] = 180/(Math.pow(2, i)*128);
				}
				return resolutions;
			})()
		});
	 */
	setSpatialReference(ref: SpatialReferenceType): this;
	/**
	 * Callback when any option is updated
	 * @param  {Object} conf - options to update
	 * @return {Map}   this
	 */
	onConfig(conf: {
		[key: string]: any;
	}): this;
	/**
	 * Get the projection of the map. <br>
	 * Projection is an algorithm for map projection, e.g. well-known [Mercator Projection]{@link https://en.wikipedia.org/wiki/Mercator_projection} <br>
	 * A projection must have 2 methods: <br>
	 * 1. project(coordinate) - project the input coordinate <br>
	 * 2. unproject(coordinate) - unproject the input coordinate <br>
	 * Projection also contains measuring method usually extended from a measurer: <br>
	 * 1. measureLength(coord1, coord2) - compute length between 2 coordinates.  <br>
	 * 2. measureArea(coords[]) - compute area of the input coordinates. <br>
	 * 3. locate(coord, distx, disty) - compute the coordinate from the coord with xdist on axis x and ydist on axis y.
	 * @return {Object}
	 */
	getProjection(): ProjectionType;
	/**
	 * Get map's full extent, which is defined in map's spatial reference. <br>
	 * eg: {'left': -180, 'right' : 180, 'top' : 90, 'bottom' : -90}
	 * @return {Extent}
	 */
	getFullExtent(): Extent;
	/**
	 * Set map's cursor style, cursor style is same with CSS.
	 * @param {String} cursor - cursor style
	 * @returns {Map} this
	 * @example
	 * map.setCursor('url(cursor.png) 4 12, auto');
	 */
	setCursor(cursor: string): this;
	/**
	 * Reset map's cursor style.
	 * @return {Map} this
	 * @example
	 * map.resetCursor();
	 */
	resetCursor(): this;
	/**
	 * Get center of the map.
	 * @return {Coordinate}
	 */
	getCenter(): Coordinate;
	/**
	 * Set a new center to the map.
	 * @param {Coordinate} center
	 * @param  {Object} [padding]
	 * @param  {Number} [padding.paddingLeft] - Sets the amount of padding in the left of a map container
	 * @param  {Number} [padding.paddingTop] - Sets the amount of padding in the top of a map container
	 * @param  {Number} [padding.paddingRight] - Sets the amount of padding in the right of a map container
	 * @param  {Number} [padding.paddingBottom] - Sets the amount of padding in the bottom of a map container
	 * @return {Map} this
	 */
	setCenter(center: Coordinate, padding?: MapPaddingType): this;
	/**
	 * Get map's size (width and height) in pixel.
	 * @return {Size}
	 */
	getSize(): Size;
	/**
	 * Get container extent of the map
	 * @return {PointExtent}
	 */
	getContainerExtent(): PointExtent;
	/**
	 * Get the geographical extent of map's current view extent.
	 *
	 * @return {Extent}
	 */
	getExtent(): Extent;
	/**
	 * Get the projected geographical extent of map's current view extent.
	 *
	 * @return {Extent}
	 */
	getProjExtent(): Extent;
	/**
	 * Alias for getProjExtent
	 *
	 * @return {Extent}
	 */
	getPrjExtent(): Extent;
	/**
	 * Get the max extent that the map is restricted to.
	 * @return {Extent}
	 */
	getMaxExtent(): Extent;
	/**
	 * Sets the max extent that the map is restricted to.
	 * @param {Extent}
	 * @return {Map} this
	 * @example
	 * map.setMaxExtent(map.getExtent());
	 */
	setMaxExtent(extent: Extent): this;
	/**
	 * Get map's current zoom.
	 * @return {Number}
	 */
	getZoom(): number;
	/**
	 * Caculate the target zoom if scaling from "fromZoom" by "scale"
	 * @param  {Number} scale
	 * @param  {Number} fromZoom
	 * @param  {Boolean} isFraction - can return fractional zoom
	 * @return {Number} zoom fit for scale starting from fromZoom
	 */
	getZoomForScale(scale: number, fromZoom?: number, isFraction?: boolean): number;
	getZoomFromRes(res: number): number;
	/**
	 * Sets zoom of the map
	 * @param {Number} zoom
	 * @param {Object} [options=null] options
	 * @param {Boolean} [options.animation=true] whether zoom is animation, true by default
	 * @returns {Map} this
	 */
	setZoom(zoom: number, options?: {
		animation: boolean;
	}): this;
	/**
	 * Get the max zoom that the map can be zoom to.
	 * @return {Number}
	 */
	getMaxZoom(): number;
	/**
	 * Sets the max zoom that the map can be zoom to.
	 * @param {Number} maxZoom
	 * @returns {Map} this
	 */
	setMaxZoom(maxZoom: number): this;
	/**
	 * Get the min zoom that the map can be zoom to.
	 * @return {Number}
	 */
	getMinZoom(): number;
	/**
	 * Sets the min zoom that the map can be zoom to.
	 * @param {Number} minZoom
	 * @return {Map} this
	 */
	setMinZoom(minZoom: number): this;
	/**
	 * Maximum zoom the map has
	 * @return {Number}
	 */
	getMaxNativeZoom(): number;
	/**
	 * Resolution for world point in WebGL context
	 * @returns {Number}
	 */
	getGLRes(): number;
	/**
	 * Caculate scale from gl zoom to given zoom (default by current zoom)
	 * @param {Number} [zoom=undefined] target zoom, current zoom by default
	 * @returns {Number}
	 * @examples
	 * const point = map.coordToPoint(map.getCenter());
	 * // convert to point in gl zoom
	 * const glPoint = point.multi(this.getGLScale());
	 */
	getGLScale(zoom?: number): number;
	/**
	 * zoom in
	 * @return {Map} this
	 */
	zoomIn(): this;
	/**
	 * zoom out
	 * @return {Map} this
	 */
	zoomOut(): this;
	/**
	 * Whether the map is zooming
	 * @return {Boolean}
	 */
	isZooming(): boolean;
	/**
	 * Whether the map is being interacted
	 * @return {Boolean}
	 */
	isInteracting(): boolean;
	/**
	 * Sets the center and zoom at the same time.
	 * @param {Coordinate} center
	 * @param {Number} zoom
	 * @return {Map} this
	 */
	setCenterAndZoom(center: Coordinate, zoom?: number): this;
	/**
	 * Caculate the zoom level that contains the given extent with the maximum zoom level possible.
	 * @param {Extent} extent
	 * @param  {Boolean} [isFraction] - can return fractional zoom
	 * @param  {Object} [padding] [padding] - padding
	 * @param  {Object} [padding.paddingLeft] - Sets the amount of padding in the left of a map container
	 * @param  {Object} [padding.paddingTop] - Sets the amount of padding in the top of a map container
	 * @param  {Object} [padding.paddingRight] - Sets the amount of padding in the right of a map container
	 * @param  {Object} [padding.paddingBottom] - Sets the amount of padding in the bottom of a map container
	 * @return {Number} zoom fit for scale starting from fromZoom
	 */
	getFitZoom(extent: Extent, isFraction?: boolean, padding?: MapPaddingType): number;
	/**
	 * Get map's current view (center/zoom/pitch/bearing)
	 * @return {Object} { center : *, zoom : *, pitch : *, bearing : * }
	 */
	getView(): MapViewType;
	/**
	 * Set map's center/zoom/pitch/bearing at one time
	 * @param {Object} view - a object containing center/zoom/pitch/bearing
	 * return {Map} this
	 */
	setView(view: MapViewType): this;
	/**
	 * Get map's resolution
	 * @param {Number} zoom - zoom or current zoom if not given
	 * @return {Number} resolution
	 */
	getResolution(zoom?: number): number;
	/**
	 * Get scale of resolutions from zoom to max zoom
	 * @param {Number} zoom - zoom or current zoom if not given
	 * @return {Number} scale
	 */
	getScale(zoom?: number): number;
	/**
	 * Set the map to be fit for the given extent with the max zoom level possible.
	 * @param  {ExtentLike} extent - extent
	 * @param  {Number} zoomOffset - zoom offset
	 * @param  {Object} [options={}] - options
	 * @param  {Object} [options.animation]
	 * @param  {Object} [options.duration]
	 * @param  {Object} [options.zoomAnimationDuration]
	 * @param  {Object} [options.easing='out']
	 * @param  {Number} [options.paddingLeft] - Sets the amount of padding in the left of a map container
	 * @param  {Number} [options.paddingTop] - Sets the amount of padding in the top of a map container
	 * @param  {Number} [options.paddingRight] - Sets the amount of padding in the right of a map container
	 * @param  {Number} [options.paddingBottom] - Sets the amount of padding in the bottom of a map container
	 * @param  {Boolean} [options.isFraction=false] - can locate to fractional zoom
	 * @param  {Function} step - step function for animation
	 * @return {Map | player} - this
	 */
	fitExtent(extent: ExtentLike, zoomOffset?: number, options?: MapFitType, step?: (frame: any) => void): this | Player;
	/**
	 * Get the base layer of the map.
	 * @return {Layer}
	 */
	getBaseLayer(): Layer;
	/**
	 * Sets a new base layer to the map.<br>
	 * Some events will be thrown such as baselayerchangestart, baselayerload, baselayerchangeend.
	 * @param  {Layer} baseLayer - new base layer
	 * @return {Map} this
	 * @fires Map#setbaselayer
	 * @fires Map#baselayerchangestart
	 * @fires Map#baselayerchangeend
	 */
	setBaseLayer(baseLayer: Layer): this;
	/**
	 * Remove the base layer from the map
	 * @return {Map} this
	 * @fires Map#baselayerremove
	 */
	removeBaseLayer(): this;
	/**
	 * Get the layers of the map, except base layer (which should be by getBaseLayer). <br>
	 * A filter function can be given to filter layers, e.g. exclude all the VectorLayers.
	 * @param {Function} [filter=undefined] - a filter function of layers, return false to exclude the given layer.
	 * @return {Layer[]}
	 * @example
	 * var vectorLayers = map.getLayers(function (layer) {
	 *     return (layer instanceof VectorLayer);
	 * });
	 */
	getLayers(filter?: (layer: Layer) => boolean): Array<Layer>;
	/**
	 * Get the layer with the given id.
	 * @param  {String} id - layer id
	 * @return {Layer}
	 */
	getLayer(id: string): Layer | null;
	/**
	 * Add a new layer on the top of the map.
	 * @param  {Layer|Layer[]} layer - one or more layers to add
	 * @return {Map} this
	 * @fires Map#addlayer
	 */
	addLayer(layers: Layer | Array<Layer>, ...otherLayers: Array<Layer>): this;
	/**
	 * Remove a layer from the map
	 * @param  {String|String[]|Layer|Layer[]} layer - one or more layers or layer ids
	 * @return {Map} this
	 * @fires Map#removelayer
	 */
	removeLayer(layers: Layer | Array<Layer>): this;
	/**
	 * Sort layers according to the order provided, the last will be on the top.
	 * @param  {string[]|Layer[]} layers - layers or layer ids to sort
	 * @return {Map} this
	 * @example
	 * map.addLayer([layer1, layer2, layer3]);
	 * map.sortLayers([layer2, layer3, layer1]);
	 * map.sortLayers(['3', '2', '1']); // sort by layer ids.
	 */
	sortLayers(layers: Array<Layer>): this;
	/**
	 * Exports image from the map's canvas.
	 * @param {Object} [options=undefined] - options
	 * @param {String} [options.mimeType=image/png] - mime type of the image: image/png, image/jpeg, image/webp
	 * @param {String} [options.quality=0.92] - A Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp.
	 * @param {Boolean} [options.save=false] - whether pop a file save dialog to save the export image.
	 * @param {String} [options.fileName=export] - specify the file name, if options.save is true.
	 * @return {String} image of base64 format.
	 */
	toDataURL(options?: MapDataURLType): string | null;
	/**
	 * shorter alias for coordinateToPoint
	 */
	coordToPoint(coordinate: Coordinate, zoom?: number, out?: Point): Point;
	/**
	 * shorter alias for coordinateToPointAtRes
	 */
	coordToPointAtRes(coordinate: Coordinate, res?: number, out?: Point): Point;
	/**
	 * shorter alias for pointToCoordinate
	 */
	pointToCoord(point: Point, zoom?: number, out?: Coordinate): Coordinate;
	/**
	 * shorter alias for pointAtResToCoordinate
	 */
	pointAtResToCoord(point: Point, res?: number, out?: Coordinate): Coordinate;
	/**
	 * shorter alias for coordinateToViewPoint
	 */
	coordToViewPoint(coordinate: Coordinate, out?: Point, altitude?: number): Point;
	/**
	 * shorter alias for viewPointToCoordinate
	 */
	viewPointToCoord(viewPoint: Point, out?: Coordinate): Coordinate;
	/**
	 * shorter alias for coordinateToContainerPoint
	 */
	coordToContainerPoint(coordinate: Coordinate, zoom?: number, out?: Point): Point;
	/**
	 * shorter alias for containerPointToCoordinate
	 */
	containerPointToCoord(containerPoint: Point, out?: Coordinate): Coordinate;
	/**
	 * Converts a container point to the view point.
	 * Usually used in plugin development.
	 * @param {Point}
	 * @param  {Point} [out=undefined]    - optional point to receive result
	 * @returns {Point}
	 */
	containerPointToViewPoint(containerPoint: Point, out?: Point): Point;
	/**
	 * Converts a view point to the container point.
	 * Usually used in plugin development.
	 * @param {Point}
	 * @param  {Point} [out=undefined]    - optional point to receive result
	 * @returns {Point}
	 */
	viewPointToContainerPoint(viewPoint: Point, out?: Point): Point;
	/**
	 * Checks if the map container size changed and updates the map if so.
	 * @return {Map} this
	 * @fires Map#resize
	 */
	checkSize(force?: boolean): this;
	/**
	 * Computes the coordinate from the given meter distance.
	 * @param  {Coordinate} coordinate - source coordinate
	 * @param  {Number} dx           - meter distance on X axis
	 * @param  {Number} dy           - meter distance on Y axis
	 * @return {Coordinate} Result coordinate
	 */
	locate(coordinate: Coordinate, dx: number, dy: number): Coordinate;
	/**
	 * Return map's main panel
	 * @returns {HTMLElement}
	 */
	getMainPanel(): HTMLDivElement | null;
	/**
	 * Returns map panels.
	 * @return {Object}
	 */
	getPanels(): Record<string, PanelDom>;
	/**
	 * Remove the map
	 * @return {Map} this
	 */
	remove(): this;
	/**
	 * whether the map is removed
	 * @return {Boolean}
	 */
	isRemoved(): boolean;
	/**
	 * Whether the map is moving
	 * @return {Boolean}
	 */
	isMoving(): boolean;
	/**
	 * The callback function when move started
	 * @private
	 * @fires Map#movestart
	 */
	onMoveStart(param?: any): void;
	onMoving(param: any): void;
	onMoveEnd(param: any): void;
	onDragRotateStart(param: any): void;
	onDragRotating(param: any): void;
	onDragRotateEnd(param: any): void;
	isDragRotating(): boolean;
	/**
	 * Test if given box is out of current screen
	 * @param {Number[] | PointExtent} box - [minx, miny, maxx, maxy]
	 * @param {Number} padding - test padding
	 * @returns {Boolean}
	 */
	isOffscreen(box: PointExtent | Array<number>, viewportPadding?: number): boolean;
	getRenderer(): any;
	/**
	 * Get map's devicePixelRatio, you can override it by setting devicePixelRatio in options.
	 * @returns {Number}
	 */
	getDevicePixelRatio(): number;
	/**
	 * Set map's devicePixelRatio
	 * @param {Number} dpr
	 * @returns {Map} this
	 */
	setDevicePixelRatio(dpr: number): this;
	setContainerDomRect(domRect: DOMRect): void;
	/**
	 * offset map panels.
	 *
	 * @param  {Point} offset - offset in pixel to move
	 * @return {Map} this
	 */
	/**
	 * Gets map panel's current view point.
	 * @return {Point}
	 */
	offsetPlatform(offset?: Point): Point;
	/**
	 * Get map's view point, adding in frame offset
	 * @return {Point} map view point
	 */
	getViewPoint(): Point;
	/**
	 * Export the map's json, a snapshot of the map in JSON format.<br>
	 * It can be used to reproduce the instance by [fromJSON]{@link Map#fromJSON} method
	 * @param  {Object} [options=null] - export options
	 * @param  {Boolean|Object} [options.baseLayer=null] - whether to export base layer's JSON, if yes, it will be used as layer's toJSON options.
	 * @param  {Boolean|Extent} [options.clipExtent=null] - if set with an extent instance, only the geometries intersectes with the extent will be exported.
	 *                                                             If set to true, map's current extent will be used.
	 * @param  {Boolean|Object|Object[]} [options.layers=null] - whether to export other layers' JSON, if yes, it will be used as layer's toJSON options.
	 *                                                        It can also be an array of layer export options with a "id" attribute to filter the layers to export.
	 * @return {Object} layer's JSON
	 */
	toJSON(options?: MapOptionsType): {
		[key: string]: any;
	};
	/**
	 * Reproduce a map from map's profile JSON.
	 * @param {(string|HTMLElement|object)} container - The container to create the map on, can be:<br>
	 *                                          1. A HTMLElement container.<br/>
	 *                                          2. ID of a HTMLElement container.<br/>
	 *                                          3. A canvas compatible container in node,
	 *                                          e.g. [node-canvas]{@link https://github.com/Automattic/node-canvas},
	 *                                              [canvas2svg]{@link https://github.com/gliffy/canvas2svg}
	 * @param  {Object} mapJSON - map's profile JSON
	 * @param  {Object} [options=null] - options
	 * @param  {Object} [options.baseLayer=null] - whether to import the baseLayer
	 * @param  {Object} [options.layers=null]    - whether to import the layers
	 * @return {Map}
	 * @static
	 * @function
	 * @example
	 * var map = Map.fromJSON('map', mapProfile);
	 */
	static fromJSON(container: MapContainerType, profile: {
		[key: string]: any;
	}, options?: MapOptionsType): Map$1;
}
export type MapRendererType = "canvas" | "gl" | "gpu";
export type MapOptionsType = {
	pitch?: number;
	bearing?: number;
	baseLayer?: Layer;
	layers?: Array<Layer>;
	draggable?: boolean;
	dragPan?: boolean;
	dragPanEasing?: EasingType;
	dragRotate?: boolean;
	dragPitch?: boolean;
	dragRotatePitch?: boolean;
	touchGesture?: boolean;
	touchZoom?: boolean;
	touchRotate?: boolean;
	touchPitch?: boolean;
	touchZoomRotate?: boolean;
	doubleClickZoom?: boolean;
	scrollWheelZoom?: boolean;
	geometryEvents?: boolean;
	control?: boolean;
	attribution?: boolean | AttributionOptionsType;
	zoomControl?: boolean;
	scaleControl?: boolean;
	overviewControl?: boolean;
	fog?: boolean;
	fogColor?: any;
	devicePixelRatio?: number;
	heightFactor?: number;
	originLatitudeForAltitude?: number;
	viewHistory?: boolean;
	viewHistoryCount?: number;
	seamlessZoom?: boolean;
	maxVisualPitch?: number;
	maxPitch?: number;
	centerCross?: boolean;
	zoomInCenter?: boolean;
	zoomOrigin?: Array<number>;
	zoomAnimation?: boolean;
	zoomAnimationDuration?: number;
	panAnimation?: boolean;
	panAnimationDuration?: number;
	rotateAnimation?: boolean;
	rotateAnimationDuration?: number;
	zoomable?: boolean;
	enableInfoWindow?: boolean;
	hitDetect?: boolean;
	hitDetectLimit?: number;
	fpsOnInteracting?: number;
	layerCanvasLimitOnInteracting?: number;
	maxZoom?: number;
	minZoom?: number;
	maxExtent?: Extent;
	limitExtentOnMaxExtent?: boolean;
	fixCenterOnResize?: boolean;
	checkSize?: boolean;
	checkSizeInterval?: number;
	renderer?: MapRendererType | MapRendererType[];
	cascadePitches?: Array<number>;
	renderable?: boolean;
	clickTimeThreshold?: number;
	stopRenderOnOffscreen?: boolean;
	preventWheelScroll?: boolean;
	preventTouch?: boolean;
	supportPluginEvent?: boolean;
	switchDragButton?: boolean;
	mousemoveThrottleTime?: number;
	mousemoveThrottleEnable?: boolean;
	maxFPS?: number;
	debug?: boolean;
	spatialReference?: SpatialReferenceType;
	autoPanAtEdge?: boolean;
	boxZoom?: boolean;
	boxZoomSymbol?: {
		"markerType": string;
		"markerLineWidth": number;
		"markerLineColor": string;
		"markerLineDasharray": Array<number>;
		"markerFillOpacity": number;
		"markerFill": string;
		"markerWidth": number;
		"markerHeight": number;
	};
	onlyVisibleGeometryEvents?: boolean;
	compassControl?: boolean;
	layerSwitcherControl?: boolean;
	navControl?: boolean;
	resetControl?: boolean;
	cameraFarUndergroundInMeter?: number;
	onlyWebGL1?: boolean;
	preserveDrawingBuffer?: boolean;
	forceRedrawPerFrame?: boolean;
	extensions?: string[];
	optionalExtensions?: string[];
};
export type MapCreateOptionsType = {
	center: Array<number> | Coordinate;
	zoom: number;
} & MapOptionsType;
export type MapPaddingType = {
	paddingLeft: number;
	paddingRight: number;
	paddingTop: number;
	paddingBottom: number;
};
export type MapViewType = {
	center?: Array<number> | Coordinate;
	zoom?: number;
	pitch?: number;
	bearing?: number;
	height?: number;
};
export type MapFitType = {
	isFraction?: boolean;
	animation?: boolean;
	duration?: number;
	easing?: EasingType;
} & MapPaddingType;
export type MapDataURLType = {
	mimeType?: string;
	fileName?: string;
	quality?: number;
	save?: boolean;
};
export type MapAnimationOptionsType = AnimationOptionsType & {
	counterclockwise?: boolean;
};
export type MapIdentifyOptionsType = {
	tolerance?: number;
	eventTypes?: Array<string>;
	layers?: Array<Layer>;
	count?: number;
	includeInvisible?: boolean;
	includeInternals?: boolean;
};
export type MapContainerType = string | HTMLDivElement | HTMLCanvasElement | {
	[key: string]: any;
};
export type PanelDom = (HTMLDivElement | HTMLElement) & {
	layerDOM: HTMLElement;
	uiDOM: HTMLElement;
};
declare const MapTool_base: {
	new (...args: any[]): {
		_eventMap?: Record<string, {
			handler: HandlerFn;
			context: any;
		}[]>;
		_eventParent?: any;
		_eventTarget?: any;
		on(eventsOn: string | EventRecords, handler: HandlerFn, context?: any): any;
		addEventListener(...args: any[]): any;
		once(eventTypes: string | EventRecords, handler: HandlerFn, context?: any): any;
		off(eventsOff: string | EventRecords, handler: HandlerFn, context?: any): any;
		removeEventListener(...args: any[]): any;
		listens(eventType: string, handler?: HandlerFn, context?: any): number;
		getListeningEvents(): string[];
		copyEventListeners(target: any): any;
		fire(eventType: string, param?: BaseEventParamsType): any;
		_wrapOnceHandler(evtType: string, handler: HandlerFn, context?: any): (...args: any[]) => void;
		_switch(to: string, eventRecords: EventRecords, context?: any): any;
		_clearListeners(eventType: string): void;
		_clearAllListeners(): void;
		_setEventParent(parent: any): any;
		_setEventTarget(target: any): any;
		_fire(eventType: string, param: BaseEventParamsType): any;
	};
} & typeof Class;
/**
 * @classdesc
 * <pre>
 * The parent class for all the map tools.
 * It is abstract and not intended to be instantiated.
 * Some interface methods to implement:
 * 1. onAdd: optional, a callback method to do some prepares before enabled when the map tool is added to a map
 * 2. onEnable: optional, called when the map tool is enabled, used to setup the context such as adding more event listeners other than the map, disabling map's default handlers (draggable, scrollWheelZoom, etc) and creating temporary layers.
 * 3. getEvents: required, provide an event map to register event listeners on the map.
 * 4. onDisable: optional, called when the map tool is disabled, used to cleanup such as unregistering event listeners, enable map's original handlers and remove temporary layers.
 * </pre>
 * @abstract
 * @category maptool
 * @extends Class
 * @mixes Eventable
 */
export declare class MapTool extends MapTool_base {
	onEnable?(): void;
	getEvents?(): void;
	onDisable?(): void;
	onAdd?(): void;
	/**
	 * Adds the map tool to a map.
	 * @param {Map} map
	 * @return {MapTool} this
	 * @fires MapTool#add
	 */
	addTo(map: Map$1): this;
	/**
	 * Gets the map it added to.
	 * @return {Map} map
	 */
	getMap(): Map$1;
	/**
	 * Enable the map tool.
	 * @return {MapTool} this
	 * @fires MapTool#enable
	 */
	enable(): this;
	/**
	 * Disable the map tool
	 * @return {MapTool} this
	 * @fires MapTool#disable
	 */
	disable(): this;
	/**
	 * Returns whether the tool is enabled
	 * @return {Boolean} true | false
	 */
	isEnabled(): boolean;
	remove(): this;
}
interface Map$1 {
}
export type MapEventDataType = {
	coordinate?: Coordinate;
	containerPoint?: Point;
	viewPoint?: Point;
	point2d?: Point;
	domEvent?: MouseEvent | DragEvent | TouchEvent;
	terrain?: {
		coordinate: Coordinate;
		altitude: number;
	} | null;
};
export type DrawToolOptions = {
	mode?: string;
	symbol?: any;
	once?: boolean;
	autoPanAtEdge?: boolean;
	blockGeometryEvents?: boolean;
	zIndex?: number;
	doubleClickZoom?: boolean;
	ignoreMouseleave?: boolean;
	enableAltitude?: boolean;
	interactive?: boolean;
	edgeAutoComplete?: boolean;
	transformCoordinate?: (coordinate: Coordinate, e: MapEventDataType) => Coordinate | undefined;
};
export type modeActionType = {
	action?: string | Array<string>;
	create?: any;
	update?: any;
	generate?: any;
	clickLimit?: number | string;
};
/**
 * 图形绘制工具类
 *
 * @english
 * A map tool to help draw geometries.
 * @category maptool
 * @extends MapTool
 * @example
 * var drawTool = new DrawTool({
 *     mode : 'Polygon',
 *     symbol : {
 *         'lineColor' : '#000',
 *         'lineWidth' : 5
 *     },
 *     once : true
 * }).addTo(map);
 */
export declare class DrawTool extends MapTool {
	options: DrawToolOptions;
	/**
	 * 为DrawTool注册一个新mode
	 *
	 * @english
	 * Register a new mode for DrawTool
	 * @param name                  mode name
	 * @param modeAction            modeActions
	 * @param modeAction.action     the action of DrawTool: click, mousedown, clickDblclick
	 * @param modeAction.create     the create method of drawn geometry
	 * @param modeAction.update     the update method of drawn geometry
	 * @param modeAction.generate   the method to generate geometry at the end of drawing.
	 * @example
	 * //Register "CubicBezierCurve" mode to draw Cubic Bezier Curves.
	 * DrawTool.registerMode('CubicBezierCurve', {
		'action': 'clickDblclick',
		'create': path => new CubicBezierCurve(path),
		'update': (path, geometry) => {
			geometry.setCoordinates(path);
		},
		'generate': geometry => geometry
	   }
	 });
	 */
	static registerMode(name: string, modeAction: modeActionType): void;
	/**
	 * 根据name获取mode actions
	 *
	 * @english
	 * Get mode actions by mode name
	 * @param name      DrawTool mode name
	 * @return          mode actions
	 */
	static getRegisterMode(name: string): any;
	/**
	 * 实例化DrawTool工具
	 *
	 * @english
	 * In default, DrawTool supports the following modes: <br>
	 * [Point, LineString, Polygon, Circle, Ellipse, Rectangle, ArcCurve, QuadBezierCurve, CubicBezierCurve] <br>
	 * You can easily add new mode to DrawTool by calling [registerMode]{@link DrawTool.registerMode}
	 * @param options=null                  - construct options
	 * @param options.mode=null             - mode of the draw tool
	 * @param options.symbol=null           - symbol of the geometries drawn
	 * @param options.once=null             - whether disable immediately once drawn a geometry.
	 * @param options.autoPanAtEdge=false   - Whether to make edge judgement or not.
	 */
	constructor(options: DrawToolOptions);
	/**
	 * 获取当前mode
	 *
	 * @english
	 * Get current mode of draw tool
	 * @return mode
	 */
	getMode(): string;
	/**
	 * 设置mode
	 *
	 * @english
	 * Set mode of the draw tool
	 * @param mode - mode of the draw tool
	 * @returns {DrawTool} this
	 * @expose
	 */
	setMode(mode: string): DrawTool;
	/**
	 * 获取DrawTool的symbol属性
	 *
	 * @english
	 * Get symbol of the draw tool
	 * @return symbol
	 */
	getSymbol(): any;
	/**
	 * 设置DrawTool的symbol属性
	 *
	 * @english
	 * Set draw tool's symbol
	 * @param symbol - symbol set
	 * @returns {DrawTool} this
	 */
	setSymbol(symbol: any): DrawTool;
	/**
	 * 获取当前绘制图形
	 *
	 * @english
	 * Get geometry is currently drawing
	 * @return geometry currently drawing
	 */
	getCurrentGeometry(): Geometry;
	onAdd(): void;
	onEnable(): this;
	onDisable(): this;
	/**
	 * 撤消绘图，仅适用于点击/删除模式
	 *
	 * @english
	 * Undo drawing, only applicable for click/dblclick mode
	 * @return this
	 */
	undo(): this;
	/**
	 * 重做绘图，只适用于click/dblclick模式
	 *
	 * @english
	 * Redo drawing, only applicable for click/dblclick mode
	 * @return this
	 */
	redo(): this;
	getEvents(): {};
	/**
	 * 结束当前绘制
	 *
	 * @english
	 * End current draw
	 * @param [param=null] params of drawend event
	 * @returns this
	 */
	endDraw(param: any): DrawTool;
	/**
	* 设置Layer的zIndex
	* @english
	* set draw inner layers zIndex
	* @param  {Number} zIndex -  draw layer zIndex
	* @return this
	*/
	setLayerZIndex(zIndex: number): this;
	/**
	* 添加一个自定义的坐标点
	* @english
	* add a custom Coordinate
	* @param  {Coordinate} coordinate -  coordinate
	* @return this
	*/
	addCoordinate(coordinate: Coordinate): this;
	/**
	 * 获取临时的Geometry
	 * @english
	 * get temp Geometry
	 * @return Geometry
	*/
	getTempGeometry(): any;
}
interface Map$1 {
	isRotating(): boolean;
	animateTo(view: MapViewType, options?: MapAnimationOptionsType, step?: (frame: any) => void): Player;
	flyTo(view: MapViewType, options?: MapAnimationOptionsType, step?: (frame: any) => void): this;
	isAnimating(): boolean;
}
interface Map$1 {
	isFullScreen(): boolean;
	requestFullScreen(dom?: HTMLDivElement): this;
	cancelFullScreen(): this;
}
interface Map$1 {
	panTo(coordinate: Coordinate, options?: MapAnimationOptionsType, step?: (frame: any) => void): this;
	panBy(offset: Point | Array<number>, options?: MapAnimationOptionsType, step?: (frame: any) => void): this;
}
export type identifyOptionsType = MapIdentifyOptionsType & {
	coordinate: Coordinate;
};
export type identifyAtPointOptionsType = MapIdentifyOptionsType & {
	containerPoint: Point;
};
export type MapIdentifyCBType = (geos: Array<Geometry>) => void;
interface Map$1 {
	computeLength(coord1: Coordinate, coord2: Coordinate): number;
	computeGeometryLength(geometry: Geometry): number;
	computeGeometryArea(geometry: Geometry): number;
	identify(opts: identifyOptionsType, cb: MapIdentifyCBType): void;
	identifyAtPoint(opts: identifyAtPointOptionsType, cb: MapIdentifyCBType): void;
}
interface Map$1 {
	onZoomStart(nextZoom: number, origin?: Point): any;
	onZooming(nextZoom: number, origin?: Point, startScale?: number): any;
	onZoomEnd(nextZoom: number, origin?: Point): any;
}
interface Map$1 {
	cameraPosition: [
		number,
		number,
		number
	];
	cameraLookAt: [
		number,
		number,
		number
	];
	projViewMatrix: Matrix4;
	getFov(): number;
	setFov(fov: number): this;
	getBearing(): number;
	setBearing(bearing: number): this;
	getPitch(): number;
	setPitch(pitch: number): this;
	setCameraMovements(frameOptions: Array<MapViewType>, option?: {
		autoRotate: boolean;
	}): any;
	setCameraOrientation(params: MapViewType): this;
	setCameraPosition(coordinate: Coordinate): any;
	getFitZoomForCamera(cameraPosition: [
		number,
		number,
		number
	], pitch: number): any;
	getFitZoomForAltitude(altitude: number): any;
	isTransforming(): boolean;
	getFrustumAltitude(): number;
	updateCenterAltitude(): any;
	getContainerPointRay(from: Vector3, to: Vector3, containerPoint: Point, near?: number, far?: number): any;
}
interface Map$1 {
	zoomToPreviousView(options?: any): MapViewType;
	hasPreviousView(): boolean;
	zoomToNextView(options?: any): MapViewType;
	hasNextView(): boolean;
	getViewHistory(): Array<MapViewType>;
}
interface Map$1 {
	getCollisionIndex(): CollisionIndex;
	createCollisionIndex(): CollisionIndex;
	clearCollisionIndex(): this;
	uiCollides(): this;
}
interface Map$1 {
	/**
	 * Converts a coordinate to the 2D point in current zoom or in the specific zoom. <br>
	 * The 2D point's coordinate system's origin is the same with map's origin.
	 * Usually used in plugin development.
	 * @param  coordinate - coordinate
	 * @param  zoom  - zoom level
	 * @param  out    - optional point to receive result
	 * @return  2D point
	 * @example
	 * var point = map.coordinateToPoint(new Coordinate(121.3, 29.1));
	 */
	coordinateToPoint(coordinate: Coordinate, zoom?: number, out?: Point): Point;
	/**
	 * Converts a coordinate to the 2D point at specified resolution. <br>
	 * The 2D point's coordinate system's origin is the same with map's origin.
	 * Usually used in plugin development.
	 * @param  coordinate - coordinate
	 * @param  res  - target resolution
	 * @param  out    - optional point to receive result
	 * @return  2D point
	 * @example
	 * var point = map.coordinateToPoint(new Coordinate(121.3, 29.1));
	 */
	coordinateToPointAtRes(coordinate: Coordinate, res?: number, out?: Point): Point;
	/**
	 * Converts a 2D point in current zoom or a specific zoom to a coordinate.
	 * Usually used in plugin development.
	 * @param  point - 2D point
	 * @param  zoom  - point's zoom level
	 * @param  out    - optional coordinate to receive result
	 * @return coordinate
	 * @example
	 * var coord = map.pointToCoordinate(new Point(4E6, 3E4));
	 */
	pointToCoordinate(point: Point, zoom?: number, out?: Coordinate): Coordinate;
	/**
	 * Converts a 2D point at specific resolution to a coordinate.
	 * Usually used in plugin development.
	 * @param  point - 2D point
	 * @param  res  - point's resolution
	 * @param  out    - optional coordinate to receive result
	 * @return coordinate
	 * @example
	 * var coord = map.pointAtResToCoordinate(new Point(4E6, 3E4), map.getResolution());
	 */
	pointAtResToCoordinate(point: Point, res?: number, out?: Coordinate): Coordinate;
	/**
	 * Converts a geographical coordinate to view point.<br>
	 * A view point is a point relative to map's mapPlatform panel's position. <br>
	 * Usually used in plugin development.
	 * @param coordinate
	 * @param  out    - optional point to receive result
	 * @return          */
	coordinateToViewPoint(coordinate: Coordinate, out?: Point, altitude?: number): Point;
	/**
	 * Converts a view point to the geographical coordinate.
	 * Usually used in plugin development.
	 * @param viewPoint
	 * @param  out    - optional coordinate to receive result
	 * @return          */
	viewPointToCoordinate(viewPoint: Point, out?: Coordinate): Coordinate;
	/**
	 * Convert a geographical coordinate to the container point. <br>
	 *  A container point is a point relative to map container's top-left corner. <br>
	 * @param                - coordinate
	 * @param  zoom  - zoom level
	 * @param  out    - optional point to receive result
	 * @return          */
	coordinateToContainerPoint(coordinate: Coordinate, zoom?: number, out?: Point): Point;
	coordinateToContainerPointAtRes(coordinate: Coordinate, res?: number, out?: Point): Point;
	/**
	 * Convert a geographical coordinate to the container point. <br>
	 * Batch conversion for better performance <br>
	 *  A container point is a point relative to map container's top-left corner. <br>
	 * @param  coordinates - coordinates
	 * @param  zoom  - zoom level
	 * @return {Point[]}
	 */
	coordinatesToContainerPoints(coordinates: Array<Coordinate>, zoom?: number): Array<Point>;
	/**
	 * Convert a geographical coordinate to the container point. <br>
	 * Batch conversion for better performance <br>
	 *  A container point is a point relative to map container's top-left corner. <br>
	 * @param  coordinates                - coordinates
	 * @param  resolution  - container points' resolution
	 * @return
	 */
	coordinatesToContainerPointsAtRes(coordinates: Array<Coordinate>, res?: number): Array<Point>;
	/**
	 * Converts a container point to geographical coordinate.
	 * @param          * @param  out    - optional coordinate to receive result
	 * @return          */
	containerPointToCoordinate(containerPoint: Point, out?: Coordinate): Coordinate;
	/**
	 * Converts a container point extent to the geographic extent.
	 * @param  containerExtent - containeproints extent
	 * @return  geographic extent
	 */
	containerToExtent(containerExtent: PointExtent): Extent;
	/**
	 * Converts geographical distances to the pixel length.<br>
	 * The value varis with difference zoom level.
	 *
	 * @param  xDist - distance on X axis.
	 * @param  yDist - distance on Y axis.
	 * @return {Size} result.width: pixel length on X axis; result.height: pixel length on Y axis
	 */
	distanceToPixel(xDist: number, yDist: number, zoom?: number): Size;
	/**
	 * Converts geographical distances to the 2d point length.<br>
	 * The value varis with difference zoom level.
	 *
	 * @param  xDist - distance on X axis.
	 * @param  yDist - distance on Y axis.
	 * @param  zoom - point's zoom
	 * @return          */
	distanceToPoint(xDist: number, yDist: number, zoom?: number, paramCenter?: Coordinate): Point;
	/**
	 * Converts geographical distances to the 2d point length at specified resolution.
	 *
	 * @param  xDist - distance on X axis.
	 * @param  yDist - distance on Y axis.
	 * @param  res - target resolution
	 * @return          */
	distanceToPointAtRes(xDist: number, yDist: number, res?: number, paramCenter?: Coordinate, out?: Point): Point;
	/**
	 * Converts height/altitude  to the 2d point
	 *
	 * @param  altitude - the value of altitude,suche as: map.altitudeToPoint(100);
	 * @param  res - target resolution
	 * @param  [originCenter=null] - optional original coordinate for caculation
	 * @return          */
	altitudeToPoint(altitude: number, res?: number, originCenter?: Coordinate): number;
	pointAtResToAltitude(point: Point, res?: number, originCenter?: Coordinate): number;
	/**
	 * Converts pixel size to geographical distance.
	 *
	 * @param  width - pixel width
	 * @param  height - pixel height
	 * @return  distance - Geographical distance
	 */
	pixelToDistance(width: number, height: number): number;
	/**
	 * Converts 2d point distances to geographic length.<br>
	 *
	 * @param  dx - distance on X axis.
	 * @param  dy - distance on Y axis.
	 * @param  zoom - point's zoom
	 * @return distance
	 */
	pointToDistance(dx: number, dy: number, zoom?: number): number;
	/**
	 * Converts 2d point distances to geographic length.<br>
	 *
	 * @param  dx - distance on X axis.
	 * @param  dy - distance on Y axis.
	 * @param  res - point's resolution
	 * @return distance
	 */
	pointAtResToDistance(dx: number, dy: number, res?: number, paramCenter?: Coordinate): number;
	/**
	 * Computes the coordinate from the given pixel distance.
	 * @param  coordinate - source coordinate
	 * @param  px           - pixel distance on X axis
	 * @param  py           - pixel distance on Y axis
	 * @return Result coordinate
	 */
	locateByPoint(coordinate: Coordinate, px: number, py: number): Coordinate;
	/**
	 * Get map's extent in view points.
	 * @param zoom - zoom
	 * @return
	 */
	get2DExtent(zoom?: number, out?: PointExtent): PointExtent;
	get2DExtentAtRes(res?: number, out?: PointExtent): PointExtent;
	/**
	 * Converts a view point extent to the geographic extent.
	 * @param  extent2D - view points extent
	 * @return  geographic extent
	 */
	pointToExtent(extent2D: PointExtent): Extent;
	/**
	 * When moving map, map's center is updated in real time, but platform will be moved in the next frame to keep syncing with other layers
	 * Get the offset in current frame and the next frame
	 * @return view point offset
	 */
	getViewPointFrameOffset(): Point | null;
	/**
 * transform view point to geographical projected coordinate
	* @param  viewPoint
	* @param  out  - optional coordinate to receive result
	* @return         */
	viewPointToPrj(viewPoint: Point, out?: Point): Point;
	/**
	 * transform geographical projected coordinate to container point
	 * @param  pCoordinate
	 * @param  zoom target zoom
	 * @param  out    - optional point to receive result
	 */
	prjToContainerPoint(pCoordinate: Coordinate, zoom?: number, out?: Point, altitude?: number): Point;
	prjToContainerPointAtRes(pCoordinate: Coordinate, res?: number, out?: Point, altitude?: number): Point;
	/**
	 * transform geographical projected coordinate to view point
	 * @param  pCoordinate
	 * @return          */
	prjToViewPoint(pCoordinate: Coordinate, out?: Point, altitude?: number): Point;
	viewPointToPoint(viewPoint: Point, zoom?: number, out?: Point): Point;
	pointToViewPoint(point: Point, zoom?: number, out?: Point): Point;
}
export interface ILanguage {
	distancetool: Distancetool;
	areatool: Areatool;
}
export interface Distancetool {
	start: string;
	units: Units;
}
export interface Areatool {
	units: Units;
}
export interface Units {
	mile: string;
	feet: string;
	kilometer: string;
	meter: string;
}
export type Lang = "zh-CN" | "es-MX" | "en-US";
declare class Translator extends Class {
	languages: {
		[key: string]: ILanguage;
	};
	nodes: ILanguage;
	constructor(lang: Lang);
	/**
	 *  Method to update the language of maptalks
	 *  @param {string} lang - Available Langs (zh-CN, en-US, es-MX)
	 *  @example setLang('zh-CN')
	*/
	setLang(lang: Lang): void;
	/**
	 *  method to return the text of the current language available on lang json's
	 *  @param {string} textNode - Accesible property with the current language text.
	 *  @return {string} Text to show in screen
	 *  @example document.write(translate('areatool.units.kilometer'))
	*/
	translate(textNode?: string | null): string;
}
export type DistanceToolOptions = {
	mode?: string;
	language?: string;
	metric?: boolean;
	imperial?: boolean;
	symbol?: any;
	vertexSymbol?: any;
	labelOptions?: any;
	decimalPlaces?: number;
	formatLabelContent?: any;
	clearButtonSymbol?: any;
	zIndex?: number;
} & DrawToolOptions;
/**
 * 距离测量工具类
 *
 * @english
 * A map tool to help measure distance on the map
 * @category maptool
 * @extends DrawTool
 * @example
 * var distanceTool = new DistanceTool({
 *     'once' : true,
 *     'symbol': {
 *       'lineColor' : '#34495e',
 *       'lineWidth' : 2
 *     },
 *     'vertexSymbol' : {
 *       'markerType'        : 'ellipse',
 *       'markerFill'        : '#1bbc9b',
 *       'markerLineColor'   : '#000',
 *       'markerLineWidth'   : 3,
 *       'markerWidth'       : 10,
 *      'markerHeight'      : 10
 *    },
 *    'language' : 'en-US'
 *  }).addTo(map);
 *
 */
export declare class DistanceTool extends DrawTool {
	options: DistanceToolOptions;
	translator: Translator;
	/**
	 * 配置项
	 *
	 * @param options=null                  - construct options
	 * @param options.language=zh-CN        - language of the distance tool, zh-CN or en-US
	 * @param options.metric=true           - display result in metric system
	 * @param options.imperial=false        - display result in imperial system.
	 * @param options.symbol=null           - symbol of the line
	 * @param options.vertexSymbol=null     - symbol of the vertice
	 * @param options.labelOptions=null     - construct options of the vertice labels.
	 */
	constructor(options: DistanceToolOptions);
	/**
	 * 清空测量
	 *
	 * @english
	 * Clear the measurements
	 * @return {DistanceTool} this
	 */
	clear(): this;
	/**
	 * 获取在绘制图形期间的DrawToolLayers
	 *
	 * @english
	 * Get the DrawToolLayers with the geometries drawn on the map during measuring.
	 * @return {Array<Layer>}
	 */
	getMeasureLayers(): any[];
	/**
	 * 获取最后测量结果
	 *
	 * @english
	 * Get last measuring result
	 * @return {Number}
	 */
	getLastMeasure(): string | number;
	/**
	 * 撤消绘图，仅适用于点击/删除模式
	 *
	 * @english
	 * Undo drawing, only applicable for click/dblclick mode
	 * @return {DistanceTool} this
	 */
	undo(): this;
	/**
	 * 重做绘图，只适用于click/dblclick模式
	 *
	 * @english
	 * Redo drawing, only applicable for click/dblclick mode
	 * @return {DistanceTool} this
	 */
	redo(): this;
}
export type AreaToolOptions = {
	language?: string;
	metric?: boolean;
	imperial?: boolean;
	symbol?: any;
	vertexSymbol?: any;
	labelOptions?: any;
	mode?: string;
} & DistanceToolOptions;
/**
 * 一个继承于DistanceTool类，测量面积的地图工具类。
 *
 * @english
 * A map tool to help measure area on the map .it is extends DistanceTool
 * @category maptool
 * @extends DistanceTool
 * @example
 * var areaTool = new AreaTool({
 *     'once' : true,
 *     'symbol': {
 *       'lineColor' : '#34495e',
 *       'lineWidth' : 2
 *     },
 *     'vertexSymbol' : {
 *       'markerType'        : 'ellipse',
 *       'markerFill'        : '#1bbc9b',
 *       'markerLineColor'   : '#000',
 *       'markerLineWidth'   : 3,
 *       'markerWidth'       : 10,
 *      'markerHeight'      : 10
 *    },
 *    'language' : 'en-US'
 *  }).addTo(map);
 */
export declare class AreaTool extends DistanceTool {
	options: AreaToolOptions;
	/**
	 * 配置项
	 *
	 * @english
	 * @param options option              - construct options
	 * @param options.language=zh-CN      - language of the distance tool, zh-CN or en-US
	 * @param options.metric=true         - display result in metric system
	 * @param options.imperial=false      - display result in imperial system.
	 * @param options.symbol=null         - symbol of the line
	 * @param options.vertexSymbol=null   - symbol of the vertice
	 * @param options.labelOptions=null   - construct options of the vertice labels.
	 */
	constructor(options: AreaToolOptions);
}
declare const UIComponent_base: {
	new (...args: any[]): {
		_eventMap?: Record<string, {
			handler: HandlerFn;
			context: any;
		}[]>;
		_eventParent?: any;
		_eventTarget?: any;
		on(eventsOn: string | EventRecords, handler: HandlerFn, context?: any): any;
		addEventListener(...args: any[]): any;
		once(eventTypes: string | EventRecords, handler: HandlerFn, context?: any): any;
		off(eventsOff: string | EventRecords, handler: HandlerFn, context?: any): any;
		removeEventListener(...args: any[]): any;
		listens(eventType: string, handler?: HandlerFn, context?: any): number;
		getListeningEvents(): string[];
		copyEventListeners(target: any): any;
		fire(eventType: string, param?: BaseEventParamsType): any;
		_wrapOnceHandler(evtType: string, handler: HandlerFn, context?: any): (...args: any[]) => void;
		_switch(to: string, eventRecords: EventRecords, context?: any): any;
		_clearListeners(eventType: string): void;
		_clearAllListeners(): void;
		_setEventParent(parent: any): any;
		_setEventTarget(target: any): any;
		_fire(eventType: string, param: BaseEventParamsType): any;
	};
} & typeof Class;
declare class UIComponent extends UIComponent_base {
	options: UIComponentOptionsType;
	/**
	 *  Some instance methods subclasses needs to implement:  <br>
	 *  <br>
	 * 1. Optional, returns the Dom element's position offset  <br>
	 * function getOffset : Point  <br>
	 *  <br>
	 * 2. Method to create UI's Dom element  <br>
	 * function buildOn : HTMLElement  <br>
	 *  <br>
	 * 3 Optional, to provide an event map to register event listeners.  <br>
	 * function getEvents : void  <br>
	 * 4 Optional, a callback when dom is removed.  <br>
	 * function onDomRemove : void  <br>
	 * 5 Optional, a callback when UI Component is removed.  <br>
	 * function onRemove : void  <br>
	 * @param  {Object} options configuration options
	 */
	constructor(options: UIComponentOptionsType);
	onAdd(): void;
	onRemove(): void;
	onDomRemove(): void;
	getEvents(): {
		[key: string]: () => void;
	};
	getOwnerEvents(): {
		[key: string]: () => void;
	};
	buildOn(): HTMLElement;
	/**
	 * Adds the UI Component to a geometry or a map
	 * @param {Geometry|Map} owner - geometry or map to addto.
	 * @returns {ui.UIComponent} this
	 * @fires ui.UIComponent#add
	 */
	addTo(owner: Geometry | Map$1): this;
	/**
	 * Get the map it added to
	 * @return {Map} map instance
	 * @override
	 */
	getMap(): Map$1;
	/**
	 * Show the UI Component, if it is a global single one, it will close previous one.
	 * @param {Coordinate} [coordinate=null] - coordinate to show, default is owner's center
	 * @return {ui.UIComponent} this
	 * @fires ui.UIComponent#showstart
	 * @fires ui.UIComponent#showend
	 */
	show(coordinate: Coordinate): this;
	/**
	 * Hide the UI Component.
	 * @return {ui.UIComponent} this
	 * @fires ui.UIComponent#hide
	 */
	hide(): this;
	/**
	 * Decide whether the ui component is open
	 * @returns {Boolean} true|false
	 */
	isVisible(): boolean;
	/**
	 * Remove the UI Component
	 * @return {ui.UIComponent} this
	 * @fires ui.UIComponent#hide
	 * @fires ui.UIComponent#remove
	 */
	remove(): this;
	/**
	 * Get pixel size of the UI Component.
	 * @return {Size} size
	 */
	getSize(): Size;
	getOwner(): Map$1 | Geometry;
	/**
	 * get Dom Node
	 * @returns {HTMLDivElement} dom|null
	 */
	getDOM(): HTMLElement;
	/**
	 * set Dom Node zIndex
	 *
	 */
	setZIndex(zIndex: number): this;
	getPosition(): Point;
	onGeometryPositionChange(param: any): void;
	onMoving(): void;
	onEvent(): void;
	onZoomEnd(): void;
	onResize(): void;
	onDomSizeChange(): void;
	isSupportZoomFilter(): boolean;
	onConfig(config: Record<string, any>): this;
	static isSupport(owner: Geometry | Map$1): boolean;
}
export type UIComponentOptionsType = {
	eventsPropagation?: boolean;
	eventsToStop?: string;
	dx?: number;
	dy?: number;
	autoPan?: boolean;
	autoPanDuration?: number;
	single?: boolean;
	animation?: string;
	animationOnHide?: boolean;
	animationDuration?: number;
	pitchWithMap?: boolean;
	rotateWithMap?: boolean;
	visible?: boolean;
	roundPoint?: boolean;
	collision?: boolean;
	collisionBufferSize?: number;
	collisionWeight?: number;
	collisionFadeIn?: boolean;
	zIndex?: number;
	cssName?: string | Array<string>;
};
declare const UIMarker_base: {
	new (...args: any[]): {
		_handlers?: Handler[];
		addHandler(name: any, handlerClass: any): any;
		removeHandler(name: any): any;
		_clearHandlers(): void;
	};
} & typeof UIComponent;
declare class UIMarker extends UIMarker_base {
	options: UIMarkerOptionsType;
	/**
	 * As it's renderered by HTMLElement such as a DIV, it: <br>
	 * 1. always on the top of all the map layers <br>
	 * 2. can't be snapped as it's not drawn on the canvas. <br>
	 * @param  {Coordinate} coordinate - UIMarker's coordinates
	 * @param {Object} options - options defined in [UIMarker]{@link UIMarker#options}
	 */
	constructor(coordinate: Coordinate | Array<number>, options: UIMarkerOptionsType);
	/**
	 * Sets the coordinates
	 * @param {Coordinate} coordinates - UIMarker's coordinate
	 * @returns {UIMarker} this
	 * @fires UIMarker#positionchange
	 */
	setCoordinates(coordinates: Coordinate): this;
	/**
	 * Gets the coordinates
	 * @return {Coordinate} coordinates
	 */
	getCoordinates(): Coordinate;
	getCenter(): Coordinate;
	getAltitude(): number;
	setAltitude(alt: number): this;
	/**
	 * Sets the content of the UIMarker
	 * @param {String|HTMLElement} content - UIMarker's content
	 * @returns {UIMarker} this
	 * @fires UIMarker#contentchange
	 */
	setContent(content: string | HTMLElement): this;
	/**
	 * Gets the content of the UIMarker
	 * @return {String|HTMLElement} content
	 */
	getContent(): string | HTMLElement;
	onAdd(): this;
	/**
	 * Show the UIMarker
	 * @returns {UIMarker} this
	 * @fires UIMarker#showstart
	 * @fires UIMarker#showend
	 */
	show(): this;
	/**
	 * Flash the UIMarker, show and hide by certain internal for times of count.
	 *
	 * @param {Number} [interval=100]     - interval of flash, in millisecond (ms)
	 * @param {Number} [count=4]          - flash times
	 * @param {Function} [cb=null]        - callback function when flash ended
	 * @param {*} [context=null]          - callback context
	 * @return {UIMarker} this
	 */
	flash(interval: number, count: number, cb?: (arg: any) => void, context?: any): any;
	/**
	 * A callback method to build UIMarker's HTMLElement
	 * @protected
	 * @param {Map} map - map to be built on
	 * @return {HTMLElement} UIMarker's HTMLElement
	 */
	buildOn(): HTMLElement;
	/**
	 * Gets UIMarker's HTMLElement's position offset, it's caculated dynamically accordiing to its actual size.
	 * @protected
	 * @return {Point} offset
	 */
	getOffset(): Point;
	/**
	 * Gets UIMarker's transform origin for animation transform
	 * @protected
	 * @return {Point} transform origin
	 */
	getTransformOrigin(): string;
	onDomRemove(): void;
	/**
	 * Whether the uimarker is being dragged.
	 * @returns {Boolean}
	 */
	isDragging(): boolean;
	onZoomFilter(): void;
	isVisible(): boolean;
	isSupportZoomFilter(): boolean;
}
export type UIMarkerOptionsType = {
	containerClass?: string;
	eventsPropagation?: boolean;
	draggable?: boolean;
	single?: boolean;
	content?: string | HTMLElement;
	altitude?: number;
	minZoom?: number;
	maxZoom?: number;
	horizontalAlignment?: "middle" | "left" | "right";
	verticalAlignment?: "middle" | "top" | "bottom";
} & UIComponentOptionsType;
declare class InfoWindow extends UIComponent {
	options: InfoWindowOptionsType;
	/**
	 * Adds the UI Component to a geometry or a map
	 * @param {Geometry|Map} owner - geometry or map to addto.
	 * @returns {UIComponent} this
	 * @fires UIComponent#add
	 */
	addTo(owner: Geometry | Map$1): this;
	/**
	 * Set the content of the infowindow.
	 * @param {String|HTMLElement} content - content of the infowindow.
	 * return {InfoWindow} this
	 * @fires InfoWindow#contentchange
	 */
	setContent(content: string | HTMLElement): this;
	/**
	 * Get content of  the infowindow.
	 * @return {String|HTMLElement} - content of the infowindow
	 */
	getContent(): string | HTMLElement;
	/**
	 * Set the title of the infowindow.
	 * @param {String|HTMLElement} title - title of the infowindow.
	 * return {InfoWindow} this
	 * @fires InfoWindow#titlechange
	 */
	setTitle(title: string): this;
	/**
	 * Get title of  the infowindow.
	 * @return {String|HTMLElement} - content of the infowindow
	 */
	getTitle(): string;
	buildOn(): HTMLElement;
	/**
	 * Gets InfoWindow's transform origin for animation transform
	 * @protected
	 * @return {Point} transform origin
	 */
	getTransformOrigin(): string;
	getOffset(): Point;
	show(coordinate: Coordinate): this;
	getEvents(): {};
	getOwnerEvents(): {};
	onRemove(): void;
	onDomRemove(): void;
}
export type InfoWindowOptionsType = {
	containerClass?: string;
	autoPan?: boolean;
	autoCloseOn?: string;
	autoOpenOn?: string;
	width?: string;
	minHeight?: number;
	custom?: boolean;
	title?: string;
	content?: string | HTMLElement;
	enableTemplate?: boolean;
} & UIComponentOptionsType;
declare class ToolTip extends UIComponent {
	options: ToolTipOptionsType;
	/**
	 * @param {String} content         - content of tooltip
	 * @param {Object} [options=null]  - options defined in [ToolTip]{@link ToolTip#options}
	 */
	constructor(content: string, options?: ToolTipOptionsType);
	/**
	 * Adds the UI Component to a geometry UIMarker Other graphic elements
	 * @param {Geometry} owner - geometry to add.
	 * @returns {UIComponent} this
	 * @fires UIComponent#add
	 */
	addTo(owner: Geometry): this;
	/**
	 * set ToolTip's content's css class name.
	 * @param {String} css class name - set for ToolTip's content.
	 */
	setStyle(cssName: string): this;
	/**
	 * get ToolTip's  content's css class name
	 * @returns {String} css class name - set for ToolTip's content.
	 */
	getStyle(): string;
	/**
	 * get the UI Component's content
	 * @returns {String} tooltip's content
	 */
	getContent(): string;
	buildOn(): HTMLElement;
	onMouseOut(): void;
	onMouseMove(e: any): void;
	/**
	 * remove the tooltip, this method will be called by 'this.remove()'
	 */
	onRemove(): void;
	hideDom(): void;
	onEvent(): this;
}
export type ToolTipOptionsType = {
	width?: number;
	height?: number;
	animation?: string;
	containerClass?: string;
	cssName?: string;
	showTimeout?: number;
} & UIComponentOptionsType;
declare class Menu extends UIComponent {
	options: MenuOptionsType;
	/**
	 * Menu items is set to options.items or by setItems method. <br>
	 * <br>
	 * Normally items is a object array, containing: <br>
	 * 1. item object: {'item': 'This is a menu text', 'click': function() {alert('oops! You clicked!');)}} <br>
	 * 2. minus string "-", which will draw a splitor line on the menu. <br>
	 * <br>
	 * If options.custom is set to true, the menu is considered as a customized one. Then items is the customized html codes or HTMLElement. <br>
	 * @param {Object} options - options defined in [ui.Menu]{@link ui.Menu#options}
	 */
	constructor(options: MenuOptionsType);
	addTo(owner: Geometry | Map$1): any;
	/**
	 * Set the items of the menu.
	 * @param {Object[]|String|HTMLElement} items - items of the menu
	 * return {ui.Menu} this
	 * @example
	 * menu.setItems([
	 *      //return false to prevent event propagation
	 *     {'item': 'Query', 'click': function() {alert('Query Clicked!'); return false;}},
	 *     '-',
	 *     {'item': 'Edit', 'click': function() {alert('Edit Clicked!')}},
	 *     {'item': 'About', 'click': function() {alert('About Clicked!')}}
	 * ]);
	 */
	setItems(items: Array<MenuItem>): this;
	/**
	 * Get items of  the menu.
	 * @return {Object[]|String|HTMLElement} - items of the menu
	 */
	getItems(): MenuItem[];
	/**
	 * Create the menu DOM.
	 * @protected
	 * @return {HTMLElement} menu's DOM
	 */
	buildOn(): HTMLElement;
	/**
	 * Offset of the menu DOM to fit the click position.
	 * @return {Point} offset
	 * @private
	 */
	getOffset(): Point;
	getTransformOrigin(): string;
	getEvents(): {
		"_zoomstart _zoomend _movestart _dblclick _click": () => void;
	};
}
export type MenuItem = {
	name?: string;
	click?: () => void;
};
export type MenuOptionsType = {
	containerClass?: string;
	animationDelay?: number;
	animationOnHide?: boolean;
	autoPan?: boolean;
	width?: number;
	maxHeight?: number;
	custom?: boolean;
	items?: Array<MenuItem>;
} & UIComponentOptionsType;
export interface MenuAbles {
	setMenu(options: MenuOptionsType): this;
	getMenu(): Menu;
	openMenu(coordinate?: Coordinate): this;
	setMenuItems(items: Array<MenuItem>): this;
	getMenuItems(): Array<MenuItem>;
	closeMenu(): this;
	removeMenu(): this;
}
export interface Geometry extends MenuAbles {
}
interface Map$1 extends MenuAbles {
}
declare const Menuable: {
	/**
	 * Set a context menu
	 * @param {Object} options - menu options
	 * @return {*} this
	 * @example
	 * foo.setMenu({
	 *  'width'  : 160,
	 *  'custom' : false,
	 *  'items' : [
	 *      //return false to prevent event propagation
	 *     {'item': 'Query', 'click': function() {alert('Query Clicked!'); return false;}},
	 *     '-',
	 *     {'item': 'Edit', 'click': function() {alert('Edit Clicked!')}},
	 *     {'item': 'About', 'click': function() {alert('About Clicked!')}}
	 *    ]
	 * });
	 * @function ui.Menuable.setMenu
	 */
	setMenu(options: MenuOptionsType): any;
	/**
	* get a context menu
	* @return {*} ui.Menu
	* @function ui.Menuable.getMenu
	*/
	getMenu(): Menu;
	/**
	 * Open the context menu, default on the center of the geometry or map.
	 * @param {Coordinate} [coordinate=null] - coordinate to open the context menu
	 * @return {*} this
	 * @function ui.Menuable.openMenu
	 */
	openMenu(coordinate?: Coordinate): any;
	/**
	 * Set menu items to the context menu
	 * @param {Object[]} items - menu items
	 * @return {*} this
	 * @function ui.Menuable.setMenuItems
	 */
	setMenuItems(items: Array<MenuItem>): any;
	/**
	 * Get the context menu items
	 * @return {Object[]}
	 * @function ui.Menuable.getMenuItems
	 */
	getMenuItems(): Array<MenuItem>;
	/**
	 * Close the contexnt menu
	 * @return {*} this
	 * @function ui.Menuable.closeMenu
	 */
	closeMenu(): any;
	/**
	 * Remove the context menu
	 * @return {*} this
	 * @function ui.Menuable.removeMenu
	 */
	removeMenu(): any;
	_bindMenu(): any;
	_unbindMenu(): any;
	/**
	 * If contextmenu is not listened, open the menu in default.<br>
	 * Otherwise, do nothing here.
	 * @param  {Object} param - event parameter
	 * @return {Boolean} true | false to stop event propagation
	 * @private
	 */
	_defaultOpenMenu(param: any): boolean;
};
export type TileRenderingCanvas = {
	gl?: TileRenderingContext;
	texture?: TileImageTexture;
} & HTMLCanvasElement;
export type TileRenderingContext = {
	program: TileRenderingProgram;
	wrap: () => TileRenderingContext;
} & (WebGLRenderingContext | WebGL2RenderingContext);
export type TileRenderingProgram = {
	fragmentShader: string;
	vertexShader: string;
} & WebGLProgram;
export type ImageType = HTMLImageElement | ImageBitmap | HTMLCanvasElement;
export type TileImageType = {
	glBuffer?: TileImageBuffer;
	texture?: TileImageTexture;
} & ImageType;
export type TileImageBuffer = {
	width?: number;
	height?: number;
	type?: string;
} & WebGLBuffer;
export type TileImageTexture = WebGLTexture;
export type VertexAttrib = [
	name: string,
	stride: number,
	type?: string
];
declare class LayerAbstractRenderer extends Class {
	layer: any;
	resources: ResourceCache;
	context: any;
	canvas: TileRenderingCanvas;
	middleWest: Point;
	canvasExtent2D: Extent;
	mapDPR?: number;
	drawOnInteracting?(...args: any[]): void;
	checkResources?(): any[];
	getImageData?(): ImageData;
	draw?(...args: any[]): void;
	/**
	 * @param  {Layer} layer the layer to render
	 */
	constructor(layer: any);
	/**
	 * Render the layer.
	 * Call checkResources
	 */
	render(framestamp?: number): void;
	getFrameTimestamp(): number;
	checkAndDraw(drawFn: any, ...args: any[]): void;
	/**
	 * Check if has any external resources to load
	 * If yes, load the resources before calling draw method
	 * @abstract
	 * @method checkResources
	 * @instance
	 * @returns {Array[]} an array of resource arrays [ [url1, width, height], [url2, width, height], [url3, width, height] .. ]
	 * @memberOf renderer.LayerAbstractRenderer
	 */
	/**
	 * a required abstract method to implement
	 * draw the layer when map is not interacting
	 * @abstract
	 * @instance
	 * @method draw
	 * @memberOf renderer.LayerAbstractRenderer
	 */
	/**
	 * an optional abstract method to implement
	 * draw the layer when map is interacting (moving/zooming/dragrotating)
	 * @abstract
	 * @instance
	 * @method drawOnInteracting
	 * @param {Object} eventParam event parameters
	 * @memberOf renderer.LayerAbstractRenderer
	 */
	/**
	 * @private
	 */
	testIfNeedRedraw(): boolean;
	/**
	 * Ask whether the layer renderer needs to redraw
	 */
	needToRedraw(): boolean;
	/**
	 * A callback for overriding when drawOnInteracting is skipped due to low fps
	 */
	onSkipDrawOnInteracting(): void;
	isLoadingResource(): boolean;
	isRenderComplete(): boolean;
	/**
	 * Whether must call render instead of drawOnInteracting when map is interacting
	 */
	mustRenderOnInteracting(): boolean;
	/**
	 * Set to redraw, ask map to call draw/drawOnInteracting to redraw the layer
	 */
	setToRedraw(): this;
	/**
	 * Remove the renderer, will be called when layer is removed
	 */
	remove(): void;
	onRemove(): void;
	onAdd(): void;
	/**
	 * Get map
	 */
	getMap(): any;
	/**
	 * Clear canvas
	 */
	clear(): void;
	/**
	 * A method to help improve performance.
	 * If you are sure that layer's canvas is blank, returns true to save unnecessary layer works of maps.
	 */
	isBlank(): boolean;
	/**
	 * Show the layer
	 */
	show(): void;
	/**
	 * Hide the layer
	 */
	hide(): void;
	/**
	 * Set z-index of layer
	 */
	setZIndex(_z?: number): void;
	/**
	 * 渲染结果区域截图,主要用于事件检测处理
	 * @param x
	 * @param y
	 * @param width
	 * @param height
	 * @returns
	 */
	screenshotRenderResult(x: number, y: number, width: number, height: number): CanvasRenderingContext2D | null;
	/**
	 * Detect if there is anything painted on the given point
	 * @param point containerPoint
	 */
	hitDetect(point: Point): boolean;
	/**
	 * loadResource from resourceUrls
	 * @param  {String[]} resourceUrls    - Array of urls to load
	 * @returns {Promise[]}
	 */
	loadResources(resourceUrls: string[][]): Promise<any>;
	/**
	 * Prepare rendering
	 * Set necessary properties, like this._renderZoom/ this.canvasExtent2D, this.middleWest
	 * @private
	 */
	prepareRender(): void;
	/**
	 * @english
	 * Prepare the canvas for rendering. <br>
	 * 1. Clear the canvas to blank. <br>
	 * 2. Clip the canvas by mask if there is any and return the mask's extent
	 * @return {PointExtent} mask's extent of current zoom's 2d point.
	 */
	prepareCanvas(): any;
	initContext(): void;
	prepareContext(): void;
	clearContext(): void;
	createContext(): void;
	/**
	 * Get renderer's current view extent in 2d point
	 * @return {Object} view.extent, view.maskExtent, view.zoom, view.middleWest
	 */
	getViewExtent(): {
		extent: Extent;
		maskExtent: Extent;
		zoom: number;
		middleWest: Point;
	};
	/**
	 * call when rendering completes, this will fire necessary events and call setCanvasUpdated
	 */
	completeRender(): void;
	/**
	 * Get renderer's event map registered on the map
	 * @return {Object} events
	 */
	getEvents(): {
		_zoomstart: (param: any) => void;
		_zooming: (param: any) => void;
		_zoomend: (param: any) => void;
		_resize: (param: any) => void;
		_movestart: (param: any) => void;
		_moving: (param: any) => void;
		_moveend: (param: any) => void;
		_dragrotatestart: (param: any) => void;
		_dragrotating: (param: any) => void;
		_dragrotateend: (param: any) => void;
		_spatialreferencechange: (param: any) => void;
	};
	/**
	 * onZoomStart
	 * @param  {Object} param event parameters
	 */
	onZoomStart(param: any): void;
	/**
	* onZoomEnd
	* @param  {Object} param event parameters
	*/
	onZoomEnd(param: any): void;
	/**
	* onZooming
	* @param  {Object} param event parameters
	*/
	onZooming(param: any): void;
	/**
	* onMoveStart
	* @param  {Object} param event parameters
	*/
	onMoveStart(param: any): void;
	/**
	* onMoving
	* @param  {Object} param event parameters
	*/
	onMoving(param: any): void;
	/**
	* onMoveEnd
	* @param  {Object} param event parameters
	*/
	onMoveEnd(param: any): void;
	/**
	* onResize
	* @param  {Object} param event parameters
	*/
	onResize(param: any): void;
	/**
	* onDragRotateStart
	* @param  {Object} param event parameters
	*/
	onDragRotateStart(param: any): void;
	/**
	* onDragRotating
	* @param  {Object} param event parameters
	*/
	onDragRotating(param: any): void;
	/**
	* onDragRotateEnd
	* @param  {Object} param event parameters
	*/
	onDragRotateEnd(param: any): void;
	/**
	* onSpatialReferenceChange
	* @param  {Object} param event parameters
	*/
	onSpatialReferenceChange(param: any): void;
	/**
	 * Get ellapsed time of previous drawing
	 * @return {Number}
	 */
	getDrawTime(): number;
	/**
	 * Only for MapCanvasRenderer
	 * Mark layer's canvas updated
	 */
	setCanvasUpdated(): this;
	/**
	 * Only for MapCanvasRenderer
	 * Only called by map's renderer to check whether the layer's canvas is updated
	 * @protected
	 * @return {Boolean}
	 */
	isCanvasUpdated(): boolean;
	/**
	 * Only for MapCanvasRenderer
	 * Get renderer's Canvas image object
	 */
	getCanvasImage(): any;
	clearCanvas(): void;
	/**
	 * Only for MapCanvasRenderer
	 * Create renderer's Canvas
	 */
	createCanvas(): void;
	onCanvasCreate(): void;
	/**
	 * Only for MapCanvasRenderer
	 * Resize the canvas
	 * @param canvasSize the size resizing to
	 */
	resizeCanvas(canvasSize?: SizeLike): void;
	/**
	 * Only for MapCanvasRenderer
	 * @param context
	 * @returns
	 */
	clipCanvas(context: CanvasRenderingContext2D): boolean;
}
declare class CanvasRenderer extends LayerAbstractRenderer {
	gl: TileRenderingContext;
	/**
	 * Ask whether the layer renderer needs to redraw
	 */
	needToRedraw(): boolean;
	createContext(): void;
	resetCanvasTransform(): void;
	/**
	 * Clear the canvas to blank
	 */
	clearCanvas(): void;
	/**
	 * @english
	 * Prepare the canvas for rendering. <br>
	 * 1. Clear the canvas to blank. <br>
	 * 2. Clip the canvas by mask if there is any and return the mask's extent
	 * @return {PointExtent} mask's extent of current zoom's 2d point.
	 */
	prepareCanvas(): any;
	/**
	* onResize
	* @param  {Object} param event parameters
	*/
	onResize(_param: any): void;
}
declare const ImageGLRenderable: <T extends MixinConstructor>(Base: T) => {
	new (...args: any[]): {
		gl: TileRenderingContext;
		canvas: TileRenderingCanvas;
		canvas2?: TileRenderingCanvas;
		_debugInfoCanvas?: TileRenderingCanvas;
		program?: TileRenderingProgram;
		_layerAlt: number;
		_layerAltitude: number;
		layer?: any;
		texBuffer?: TileImageBuffer;
		_debugBuffer?: TileImageBuffer;
		posBuffer?: TileImageBuffer;
		_imageBuffers?: TileImageBuffer[];
		_buffers?: TileImageBuffer[];
		_textures?: TileImageTexture[];
		getMap?(): Map$1;
		/**
		 * 绘制图片数据
		 *
		 * @english
		 * Draw an image at x, y at map's gl zoom
		 * @param image
		 * @param x x at map's gl zoom
		 * @param y y at map's gl zoom
		 * @param w width at map's gl zoom
		 * @param h height at map's gl zoom
		 * @param scale scale at map's gl zoom
		 * @param opacity
		 * @param debugInfo
		 * @param baseColor
		 */
		drawGLImage(image: TileImageType, x: number, y: number, w: number, h: number, scale: number, opacity: number, resized: any, debugInfo?: string, baseColor?: number[]): void;
		/**
		 * 绘制 debug 信息，包括边线和行列号
		 * @param uMatrix
		 * @param x
		 * @param y
		 * @param w
		 * @param h
		 * @param debugInfo
		 */
		drawDebug(uMatrix: Matrix4InOut, x: number, y: number, w: number, h: number, debugInfo: string): void;
		/**
		 * 构建瓦片顶点数据
		 * @param x
		 * @param y
		 * @param w
		 * @param h
		 * @param buffer
		 */
		bufferTileData(x: number, y: number, w: number, h: number, buffer?: TileImageBuffer): TileImageBuffer;
		/**
		 * 对于需要两个 canvas 来绘制的图层我们需要重新创建一个 canvas
		 * @english
		 * Create another GL canvas to draw gl images
		 * For layer renderer that needs 2 seperate canvases for 2d and gl
		 */
		createCanvas2(): void;
		/**
		 * 创建 webgl 实例，优先使用 canvas2
		 * @english
		 * Get webgl context(this.gl). It prefers canvas2, and will change to this.canvas if canvas2 is not created
		 */
		createGLContext(): void;
		/**
		 * Resize GL canvas with renderer's 2D canvas
		 */
		resizeGLCanvas(): void;
		/**
		 * Clear gl canvas
		 */
		clearGLCanvas(): void;
		disposeImage(image: TileImageType): void;
		_createTexture(image: TileImageType): TileImageTexture;
		/**
		 * Get a texture from cache or create one if cache is empty
		 */
		getTexture(): WithNull<TileImageTexture>;
		/**
		 * Save a texture to the cache
		 */
		saveTexture(texture: TileImageTexture): void;
		/**
		 * Load image into a text and bind it with WebGLContext
		 * @param image
		 */
		loadTexture(image: TileImageType, resized?: boolean): TileImageTexture;
		/**
		 * Get a texture from cache or create one if cache is empty
		 */
		getImageBuffer(): WithNull<TileImageBuffer>;
		/**
		 * Save a texture to the cache
		 * @param buffer
		 */
		saveImageBuffer(buffer: TileImageBuffer): void;
		/**
		 * Load image into a text and bind it with WebGLContext
		 * @returns
		 */
		loadImageBuffer(data: Float32Array | Int16Array, glBuffer: TileImageBuffer): TileImageBuffer;
		createImageBuffer(): TileImageBuffer;
		/**
		 * remove all the resources and remove gl canvas
		 */
		removeGLCanvas(): void;
		/**
		 * Create a WebGL buffer
		 * @returns {WebGLBuffer}
		 */
		createBuffer(): TileImageBuffer;
		/**
		 * Enable vertex attributes
		 * @params attributes
		 * @example
		 * rendererr.enableVertexAttrib(['a_position', 3, 'FLOAT']);
		 */
		enableVertexAttrib(attributes: VertexAttrib): void;
		/**
		 * Create the linked program object
		 * @param vert a vertex shader program (string)
		 * @param frag a fragment shader program (string)
		 * @return created program object, or null if the creation has failed
		 */
		createProgram(vert: string, frag: string): TileRenderingProgram;
		/**
		 * use the given program
		 * @param {WebGLProgram} program
		 */
		useProgram(program: TileRenderingProgram): any;
		/**
		 * 启用纹理采样器
		 * Enable a sampler, and set texture
		 * @param sampler
		 * @param texIdx id
		 */
		enableSampler(sampler: string, texIdx?: number): WebGLUniformLocation;
		_initUniforms(program: TileRenderingProgram, uniforms: string[]): void;
		_getUniform(program: TileRenderingProgram, uniformName: string): WebGLUniformLocation;
		set8(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number): Float32Array;
		set8Int(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number): Int16Array;
	};
} & T;
declare class WorkerPool {
	active: {
		[key: number]: boolean;
	};
	workerCount: number;
	workers: Worker[];
	constructor();
	acquire(id: number): Worker[];
	release(id: number): void;
	addMessage(workerId: number, data: any, buffers: ArrayBuffer[]): void;
	commit(): void;
	getWorkers(): Worker[];
	broadcastIdleMessage(messageRatio: number): this;
}
export type Message<T = any> = {
	command: "broadcast" | "send";
	data: T;
	buffers: ArrayBuffer[];
	cb: Function;
	workerId?: number;
};
declare class Actor {
	initializing: boolean;
	workerKey: string;
	workerPool: WorkerPool;
	currentActor: number;
	actorId: number;
	workers: Worker[];
	callbacks: {
		[key: string]: Function;
	};
	callbackID: number;
	receiveFn: any;
	constructor(workerKey: string);
	created(): void;
	/**
	 * If the actor is active
	 * @returns
	 */
	isActive(): boolean;
	/**
	 * Broadcast a message to all Workers.
	 * @param {Object} data - data to send to worker thread
	 * @param {ArrayBuffer[]} buffers - arraybuffers in data as transferables
	 * @param {Function} cb - callback function when received message from worker thread
	 */
	broadcast<T = any>(data: T, buffers: ArrayBuffer[], cb: Function): this;
	/**
	 * Sends a message from a main-thread to a Worker and call callback when response received.
	 *
	 * @param {Object} data - data to send to worker thread
	 * @param {ArrayBuffer[]} buffers - arraybuffers in data as transferables
	 * @param {Function} cb - callback function when received message from worker thread
	 * @param {Number} [workerId=undefined] - Optional, a particular worker id to which to send this message.
	 */
	send<T = any>(data: T, buffers: ArrayBuffer[], cb: Function, workerId?: number): this;
	/**
	 * A listener callback for incoming message from worker thread.
	 * SHOULD NOT BE OVERRIDED only if you know what you are doing.
	 * @param {Object} message - response message from worker thread
	 */
	receive(message: Message): void;
	/**
	 * Remove the actor
	 */
	remove(): void;
	/**
	 * Send a message to a Worker.
	 * @param {Object} data - data to send
	 * @param {ArrayBuffer[]} buffers   - arraybuffers in data
	 * @param {Number} targetID The ID of the Worker to which to send this message. Omit to allow the dispatcher to choose.
	 * @returns {Number} The ID of the worker to which the message was sent.
	 */
	post(data: any, buffers: ArrayBuffer[], targetID: number): number;
	/**
	 * Get a dedicated worker in a round-robin fashion
	 */
	getDedicatedWorker(): number;
}
declare class TileWorkerConnection extends Actor {
	constructor();
	checkUrl(url: string): string;
	fetchImage(url: string, workerId: number, cb: Function, fetchOptions: any): void;
}
declare const TileLayerRenderable: <T extends MixinConstructor>(Base: T) => {
	new (...args: any[]): {
		[x: string]: any;
		tilesInView: TilesInViewType;
		tilesLoading: {
			[key: string]: any;
		};
		_parentTiles: any[];
		_childTiles: any[];
		_tileZoom: number;
		_tileQueue: {
			tileInfo: any;
			tileData: any;
		}[];
		_tileQueueIds: Set<LayerId>;
		tileCache: LRUCache;
		_compareTiles: any;
		_tileImageWorkerConn: TileWorkerConnection;
		_renderTimestamp: number;
		_frameTiles: {
			empty: boolean;
			timestamp: number;
		};
		_terrainHelper: TerrainHelper;
		_tilePlaceHolder: any;
		_frameTileGrids: TileGrids;
		drawingCurrentTiles: WithUndef<boolean>;
		drawingChildTiles: WithUndef<boolean>;
		drawingParentTiles: WithUndef<boolean>;
		avgMinAltitude: number;
		avgMaxAltitude: number;
		init(): void;
		getCurrentTileZoom(): number;
		draw(timestamp: number, context: any): number;
		getTileGridsInCurrentFrame(): TileGrids;
		getCurrentTimestamp(): number;
		_getTilesInCurrentFrame(): {
			childTiles: any[];
			missedTiles: any[];
			parentTiles: any[];
			tiles: any[];
			incompleteTiles: unknown[];
			placeholders: any[];
			loading: boolean;
			loadingCount: number;
			tileQueue: {};
		};
		removeTileCache(tileId: TileId): void;
		isTileCachedOrLoading(tileId: TileId): any;
		isTileCached(tileId: TileId): boolean;
		isTileFadingIn(tileImage: Tile["image"]): boolean;
		_drawTiles(tiles: any, parentTiles: any, childTiles: any, placeholders: any, parentContext: any, missedTiles: any, incompleteTiles: any): void;
		_drawChildTiles(childTiles: any, parentContext: any): void;
		_drawParentTiles(parentTiles: any, parentContext: any): void;
		onDrawTileStart(context: RenderContext, parentContext: RenderContext): void;
		onDrawTileEnd(context: RenderContext, parentContext: RenderContext): void;
		_drawTile(info: any, image: any, parentContext: any): void;
		drawTile(tileInfo: Tile["info"], tileImage: Tile["image"], parentContext?: RenderContext): void;
		_drawTileAndCache(tile: Tile, parentContext: any): void;
		drawOnInteracting(event: any, timestamp: number, context: any): void;
		checkIfNeedRedraw(): boolean;
		hitDetect(): boolean;
		/**
		 * @private
		 * limit tile number to load when map is interacting
		 */
		_getLoadLimit(): number;
		_isLoadingTile(tileId: TileId): boolean;
		loadTileQueue(tileQueue: any): void;
		loadTile(tile: Tile["info"]): Tile["image"];
		_fetchImage(image: any, tile: Tile["info"]): void;
		loadTileImage(tileImage: any, url: string, tile: Tile["info"]): void;
		abortTileLoading(tileImage: Tile["image"], tileInfo: Tile["info"]): void;
		onTileLoad(tileImage: Tile["image"], tileInfo: Tile["info"]): void;
		removeTileLoading(tileInfo: Tile["info"]): void;
		_consumeTileQueue(): void;
		_computeAvgTileAltitude(): void;
		checkTileInQueue(tileImage: Tile["image"], tileInfo: Tile["info"]): boolean;
		consumeTile(tileImage: Tile["image"], tileInfo: Tile["info"]): void;
		resetTileLoadTime(tileImage: Tile["image"]): void;
		onTileError(tileImage: Tile["image"], tileInfo: Tile["info"], error?: any): void;
		getDebugInfo(tileId: TileId): string;
		findChildTiles(info: Tile["info"]): any;
		_findChildTiles(info: Tile["info"]): Tile[] | any;
		_findChildTilesAt(children: Tile[], pmin: number, pmax: number, layer: any, childZoom: number): void;
		findParentTile(info: Tile["info"], targetDiff?: number): Tile;
		_findParentTile(info: Tile["info"], targetDiff?: number): Tile;
		isValidCachedTile(tile: Tile): boolean;
		isTileComplete(tile: Tile): boolean;
		_getLayerOfTile(layerId: LayerId): any;
		getCachedTile(tile: Tile, isParent: boolean): any;
		_addTileToCache(tileInfo: Tile["info"], tileImage: Tile["image"]): void;
		getTileOpacity(tileImage: Tile["image"], tileInfo: Tile["info"]): number;
		getTileFadingOpacity(tileImage: Tile["image"]): number;
		clearTileCaches(): void;
		removeTileCaches(): void;
		markCurrent(tile: Tile, isCurrent?: boolean): void;
		markTiles(): number[];
		retireTiles(force?: boolean): void;
		deleteTile(tile: Tile): void;
		_generatePlaceHolder(res: number): HTMLCanvasElement;
		setTerrainHelper(helper: TerrainHelper): void;
		_validateTileImage(image: any): boolean;
	};
} & T;
export type TileId = string;
export type LayerId = string | number;
export type TerrainHelper = any;
export type TileImage = (HTMLImageElement | HTMLCanvasElement | ImageBitmap) & {
	loadTime: number;
	fetchErrorTime: number;
	glBuffer?: TileImageBuffer;
	texture?: TileImageTexture;
};
export interface Tile {
	id: TileId;
	info: {
		x: number;
		y: number;
		z: number;
		idx: number;
		idy: number;
		id: TileId;
		layer: number | string;
		children: [
		];
		error: number;
		offset: [
			number,
			number
		];
		extent2d: Extent;
		res: number;
		url: string;
		parent: any;
		cache?: boolean;
		minAltitude?: number;
		maxAltitude?: number;
	};
	image: TileImage;
	current?: boolean;
}
export type RenderContext = any;
export type TilesInViewType = {
	[key: string]: Tile;
};
export interface TileGrid {
	extent: Extent;
	count: number;
	tiles: Tile[];
	parents: any[];
	offset: number[];
	zoom: number;
}
export interface TileGrids {
	count: number;
	tileGrids: TileGrid[];
}
declare const TileLayerCanvasRenderer_base: {
	new (...args: any[]): {
		[x: string]: any;
		tilesInView: TilesInViewType;
		tilesLoading: {
			[key: string]: any;
		};
		_parentTiles: any[];
		_childTiles: any[];
		_tileZoom: number;
		_tileQueue: {
			tileInfo: any;
			tileData: any;
		}[];
		_tileQueueIds: Set<LayerId>;
		tileCache: LRUCache;
		_compareTiles: any;
		_tileImageWorkerConn: {
			checkUrl(url: string): string;
			fetchImage(url: string, workerId: number, cb: Function, fetchOptions: any): void;
			_delayMessages: Message<any>[];
			initializing: boolean;
			workerKey: string;
			workerPool: WorkerPool;
			currentActor: number;
			actorId: number;
			workers: Worker[];
			callbacks: {
				[key: string]: Function;
			};
			callbackID: number;
			receiveFn: any;
			created(): void;
			isActive(): boolean;
			broadcast<T = any>(data: T, buffers: ArrayBuffer[], cb: Function): any;
			send<T_1 = any>(data: T_1, buffers: ArrayBuffer[], cb: Function, workerId?: number): any;
			receive(message: Message<any>): void;
			remove(): void;
			post(data: any, buffers: ArrayBuffer[], targetID: number): number;
			getDedicatedWorker(): number;
		};
		_renderTimestamp: number;
		_frameTiles: {
			empty: boolean;
			timestamp: number;
		};
		_terrainHelper: any;
		_tilePlaceHolder: any;
		_frameTileGrids: TileGrids;
		drawingCurrentTiles: boolean;
		drawingChildTiles: boolean;
		drawingParentTiles: boolean;
		avgMinAltitude: number;
		avgMaxAltitude: number;
		init(): void;
		getCurrentTileZoom(): number;
		draw(timestamp: number, context: any): number;
		getTileGridsInCurrentFrame(): TileGrids;
		getCurrentTimestamp(): number;
		_getTilesInCurrentFrame(): {
			childTiles: any[];
			missedTiles: any[];
			parentTiles: any[];
			tiles: any[];
			incompleteTiles: unknown[];
			placeholders: any[];
			loading: boolean;
			loadingCount: number;
			tileQueue: {};
		};
		removeTileCache(tileId: string): void;
		isTileCachedOrLoading(tileId: string): any;
		isTileCached(tileId: string): boolean;
		isTileFadingIn(tileImage: TileImage): boolean;
		_drawTiles(tiles: any, parentTiles: any, childTiles: any, placeholders: any, parentContext: any, missedTiles: any, incompleteTiles: any): void;
		_drawChildTiles(childTiles: any, parentContext: any): void;
		_drawParentTiles(parentTiles: any, parentContext: any): void;
		onDrawTileStart(context: any, parentContext: any): void;
		onDrawTileEnd(context: any, parentContext: any): void;
		_drawTile(info: any, image: any, parentContext: any): void;
		drawTile(tileInfo: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}, tileImage: TileImage, parentContext?: any): void;
		_drawTileAndCache(tile: Tile, parentContext: any): void;
		drawOnInteracting(event: any, timestamp: number, context: any): void;
		checkIfNeedRedraw(): boolean;
		hitDetect(): boolean;
		_getLoadLimit(): number;
		_isLoadingTile(tileId: string): boolean;
		loadTileQueue(tileQueue: any): void;
		loadTile(tile: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}): TileImage;
		_fetchImage(image: any, tile: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}): void;
		loadTileImage(tileImage: any, url: string, tile: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}): void;
		abortTileLoading(tileImage: TileImage, tileInfo: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}): void;
		onTileLoad(tileImage: TileImage, tileInfo: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}): void;
		removeTileLoading(tileInfo: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}): void;
		_consumeTileQueue(): void;
		_computeAvgTileAltitude(): void;
		checkTileInQueue(tileImage: TileImage, tileInfo: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}): boolean;
		consumeTile(tileImage: TileImage, tileInfo: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}): void;
		resetTileLoadTime(tileImage: TileImage): void;
		onTileError(tileImage: TileImage, tileInfo: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}, error?: any): void;
		getDebugInfo(tileId: string): string;
		findChildTiles(info: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}): any;
		_findChildTiles(info: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}): any;
		_findChildTilesAt(children: Tile[], pmin: number, pmax: number, layer: any, childZoom: number): void;
		findParentTile(info: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}, targetDiff?: number): Tile;
		_findParentTile(info: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}, targetDiff?: number): Tile;
		isValidCachedTile(tile: Tile): boolean;
		isTileComplete(tile: Tile): boolean;
		_getLayerOfTile(layerId: LayerId): any;
		getCachedTile(tile: Tile, isParent: boolean): any;
		_addTileToCache(tileInfo: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}, tileImage: TileImage): void;
		getTileOpacity(tileImage: TileImage, tileInfo: {
			x: number;
			y: number;
			z: number;
			idx: number;
			idy: number;
			id: string;
			layer: string | number;
			children: [
			];
			error: number;
			offset: [
				number,
				number
			];
			extent2d: Extent;
			res: number;
			url: string;
			parent: any;
			cache?: boolean;
			minAltitude?: number;
			maxAltitude?: number;
			_glScale: number;
		}): number;
		getTileFadingOpacity(tileImage: TileImage): number;
		clearTileCaches(): void;
		removeTileCaches(): void;
		markCurrent(tile: Tile, isCurrent?: boolean): void;
		markTiles(): number[];
		retireTiles(force?: boolean): void;
		deleteTile(tile: Tile): void;
		_generatePlaceHolder(res: number): HTMLCanvasElement;
		setTerrainHelper(helper: any): void;
		_validateTileImage(image: any): boolean;
	};
} & typeof CanvasRenderer;
declare class TileLayerCanvasRenderer extends TileLayerCanvasRenderer_base {
	/**
	 *
	 * @param {TileLayer} layer - TileLayer to render
	 */
	constructor(layer: TileLayer);
	_drawTiles(tiles: any, parentTiles: any, childTiles: any, placeholders: any, parentContext: any, missedTiles: any, incompleteTiles: any): void;
	needToRedraw(): boolean;
	isDrawable(): boolean;
	clipCanvas(context: any): boolean;
	clear(): void;
	onRemove(): void;
}
declare const TileLayerGLRenderer_base: {
	new (...args: any[]): {
		gl: TileRenderingContext;
		canvas: TileRenderingCanvas;
		canvas2?: TileRenderingCanvas;
		_debugInfoCanvas?: TileRenderingCanvas;
		program?: TileRenderingProgram;
		_layerAlt: number;
		_layerAltitude: number;
		layer?: any;
		texBuffer?: TileImageBuffer;
		_debugBuffer?: TileImageBuffer;
		posBuffer?: TileImageBuffer;
		_imageBuffers?: TileImageBuffer[];
		_buffers?: TileImageBuffer[];
		_textures?: WebGLTexture[];
		getMap?(): Map$1;
		drawGLImage(image: TileImageType, x: number, y: number, w: number, h: number, scale: number, opacity: number, resized: any, debugInfo?: string, baseColor?: number[]): void;
		drawDebug(uMatrix: Matrix4InOut, x: number, y: number, w: number, h: number, debugInfo: string): void;
		bufferTileData(x: number, y: number, w: number, h: number, buffer?: TileImageBuffer): TileImageBuffer;
		createCanvas2(): void;
		createGLContext(): void;
		resizeGLCanvas(): void;
		clearGLCanvas(): void;
		disposeImage(image: TileImageType): void;
		_createTexture(image: TileImageType): WebGLTexture;
		getTexture(): WebGLTexture;
		saveTexture(texture: WebGLTexture): void;
		loadTexture(image: TileImageType, resized?: boolean): WebGLTexture;
		getImageBuffer(): TileImageBuffer;
		saveImageBuffer(buffer: TileImageBuffer): void;
		loadImageBuffer(data: Float32Array | Int16Array, glBuffer: TileImageBuffer): TileImageBuffer;
		createImageBuffer(): TileImageBuffer;
		removeGLCanvas(): void;
		createBuffer(): TileImageBuffer;
		enableVertexAttrib(attributes: VertexAttrib): void;
		createProgram(vert: string, frag: string): TileRenderingProgram;
		useProgram(program: TileRenderingProgram): any;
		enableSampler(sampler: string, texIdx?: number): WebGLUniformLocation;
		_initUniforms(program: TileRenderingProgram, uniforms: string[]): void;
		_getUniform(program: TileRenderingProgram, uniformName: string): WebGLUniformLocation;
		set8(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number): Float32Array;
		set8Int(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number): Int16Array;
	};
} & typeof TileLayerCanvasRenderer;
declare class TileLayerGLRenderer extends TileLayerGLRenderer_base {
	isDrawable(): boolean;
	needToRedraw(): boolean;
	onDrawTileStart(context: RenderContext, parentContext: RenderContext): void;
	onDrawTileEnd(context: RenderContext, parentContext: RenderContext): void;
	drawTile(tileInfo: Tile["info"], tileImage: Tile["image"], parentContext: RenderContext): void;
	loadTileImage(tileImage: HTMLImageElement, url: string): void;
	/**
	 * prepare gl, create program, create buffers and fill unchanged data: image samplers, texture coordinates
	 */
	onCanvasCreate(): void;
	createContext(): void;
	resizeCanvas(canvasSize: SizeLike): void;
	clearCanvas(): void;
	getCanvasImage(): any;
	/**
	 * decide whether the layer is renderer with gl.
	 * when map is pitching, or fragmentShader is set in options
	 */
	isGL(): boolean;
	deleteTile(tile: Tile): void;
	onRemove(): void;
}
declare class CanvasRenderer$1 extends TileLayerCanvasRenderer {
	loadTile(...args: any[]): any;
}
declare class GLRenderer extends TileLayerGLRenderer {
	loadTile(...args: any[]): any;
}
declare class QuadStencil {
	gl: TileRenderingContext;
	quadVertices: any;
	attributes: VertexAttrib;
	debug: boolean;
	buffer: any;
	program: TileRenderingProgram;
	colorLoc: WebGLUniformLocation;
	transformLoc: WebGLUniformLocation;
	ref: GLint;
	constructor(gl: TileRenderingContext, vertices: any[] | Int8Array, debug?: boolean);
	start(): void;
	end(): void;
	draw(transform: number[]): void;
	remove(): this;
	stencilMask(mask: number): this;
	stencilFunc(func: number, ref: number, mask: number): this;
	stencilOp(fail: number, zfail: number, zpass: number): this;
	resetFunc(): this;
}
/**
 * images layer,可指定图像地理位置及透明的
 *
 * @english
 * @classdesc
 * A layer used to display images, you can specify each image's geographic extent and opacity
 * @category layer
 * @extends Layer
 * @param id - tile layer's id
 * @param images=null - images
 * @param options=null - options defined in [ImageLayer]{@link ImageLayer#options}
 * @example
 * new ImageLayer("images", [{
		url : 'http://example.com/foo.png',
		extent: [xmin, ymin, xmax, ymax],
		opacity : 1
	}])
 */
export declare class ImageLayer extends Layer {
	constructor(id: string, images?: ImageLayerOptionsType | Array<ImageItem>, options?: ImageLayerOptionsType);
	onAdd(): void;
	/**
	 * 设置图像并重新绘制
	 *
	 * @english
	 * Set images and redraw
	 * @param images - new images
	 * @return this
	 */
	setImages(images: Array<ImageItem>): this;
	/**
	 * 获取图像
	 *
	 * @english
	 * Get images
	 * @return
	 */
	getImages(): Array<ImageItem>;
	getRenderer(): ImageLayerCanvasRenderer;
}
declare const ImageLayerRenderable: <T extends MixinConstructor>(Base: T) => {
	new (...args: any[]): {
		[x: string]: any;
		_imageLoaded: boolean;
		isDrawable(): boolean;
		checkResources(): any;
		retireImage(image: LayerImageType): void;
		refreshImages(): void;
		draw(timestamp?: number, context?: any): void;
		drawImage(image: LayerImageType, extent: PointExtent, opacity: number): void;
		drawImages(timestamp?: number, context?: any): void;
		drawOnInteracting(event?: any, timestamp?: number, context?: any): void;
	};
} & T;
declare const ImageLayerCanvasRenderer_base: {
	new (...args: any[]): {
		[x: string]: any;
		_imageLoaded: boolean;
		isDrawable(): boolean;
		checkResources(): any;
		retireImage(image: LayerImageType): void;
		refreshImages(): void;
		draw(timestamp?: number, context?: any): void;
		drawImage(image: LayerImageType, extent: PointExtent, opacity: number): void;
		drawImages(timestamp?: number, context?: any): void;
		drawOnInteracting(event?: any, timestamp?: number, context?: any): void;
	};
} & typeof CanvasRenderer;
declare class ImageLayerCanvasRenderer extends ImageLayerCanvasRenderer_base {
	isDrawable(): boolean;
	drawImage(image: LayerImageType, extent: PointExtent, opacity: number): void;
}
declare const ImageLayerGLRenderer_base: {
	new (...args: any[]): {
		gl: TileRenderingContext;
		canvas: TileRenderingCanvas;
		canvas2?: TileRenderingCanvas;
		_debugInfoCanvas?: TileRenderingCanvas;
		program?: TileRenderingProgram;
		_layerAlt: number;
		_layerAltitude: number;
		layer?: any;
		texBuffer?: TileImageBuffer;
		_debugBuffer?: TileImageBuffer;
		posBuffer?: TileImageBuffer;
		_imageBuffers?: TileImageBuffer[];
		_buffers?: TileImageBuffer[];
		_textures?: WebGLTexture[];
		getMap?(): Map$1;
		drawGLImage(image: TileImageType, x: number, y: number, w: number, h: number, scale: number, opacity: number, resized: any, debugInfo?: string, baseColor?: number[]): void;
		drawDebug(uMatrix: Matrix4InOut, x: number, y: number, w: number, h: number, debugInfo: string): void;
		bufferTileData(x: number, y: number, w: number, h: number, buffer?: TileImageBuffer): TileImageBuffer;
		createCanvas2(): void;
		createGLContext(): void;
		resizeGLCanvas(): void;
		clearGLCanvas(): void;
		disposeImage(image: TileImageType): void;
		_createTexture(image: TileImageType): WebGLTexture;
		getTexture(): WebGLTexture;
		saveTexture(texture: WebGLTexture): void;
		loadTexture(image: TileImageType, resized?: boolean): WebGLTexture;
		getImageBuffer(): TileImageBuffer;
		saveImageBuffer(buffer: TileImageBuffer): void;
		loadImageBuffer(data: Float32Array | Int16Array, glBuffer: TileImageBuffer): TileImageBuffer;
		createImageBuffer(): TileImageBuffer;
		removeGLCanvas(): void;
		createBuffer(): TileImageBuffer;
		enableVertexAttrib(attributes: VertexAttrib): void;
		createProgram(vert: string, frag: string): TileRenderingProgram;
		useProgram(program: TileRenderingProgram): any;
		enableSampler(sampler: string, texIdx?: number): WebGLUniformLocation;
		_initUniforms(program: TileRenderingProgram, uniforms: string[]): void;
		_getUniform(program: TileRenderingProgram, uniformName: string): WebGLUniformLocation;
		set8(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number): Float32Array;
		set8Int(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number, a6: number, a7: number): Int16Array;
	};
} & typeof ImageLayerCanvasRenderer;
declare class ImageLayerGLRenderer extends ImageLayerGLRenderer_base {
	drawOnInteracting(event: any, timestamp: number, context: any): void;
	drawImages(timestamp?: number, parentContext?: any): void;
	isDrawable(): boolean;
	drawImage(image: LayerImageType, extent: PointExtent, opacity: number): void;
	createContext(): void;
	resizeCanvas(canvasSize: any): void;
	clearCanvas(): void;
	retireImage(image: LayerImageType): void;
	onRemove(): void;
}
export type ImageItem = {
	url: string;
	extent: Extent | [
		number,
		number,
		number,
		number
	];
	opacity?: number;
};
export type LayerImageType = HTMLImageElement | ImageBitmap;
declare enum depthFuncEnum {
	"never" = 0,
	"<" = 1,
	"=" = 2,
	"<=" = 3,
	" >" = 4,
	"!=" = 5,
	">=" = 6,
	"always" = 7
}
export type ImageLayerOptionsType = LayerOptionsType & {
	crossOrigin?: string;
	renderer?: "canvas" | "gl" | "dom";
	alphaTest?: boolean;
	depthMask?: boolean;
	depthFunc?: keyof typeof depthFuncEnum;
};
export interface MapStateCacheType {
	resolution: number;
	pitch: number;
	bearing: number;
	glScale: number;
	glRes: number;
	glExtent: Extent;
	containerExtent: Extent;
	offset: number;
}
declare const OverlayLayerCanvasRenderer_base: {
	new (...args: any[]): {
		_geosToCheck: Geometries[];
		_resourceChecked: boolean;
		clearImageData?(): void;
		_lastGeosToDraw: Geometry[];
		mapStateCache: MapStateCacheType;
		/**
		 * @english
		 * possible memory leaks:
		 * 1. if geometries' symbols with external resources change frequently,
		 * resources of old symbols will still be stored.
		 * 2. removed geometries' resources won't be removed.
		 */
		checkResources(): any[];
		_addGeoToCheckRes(res: Geometries | Geometries[]): void;
		onGeometryAdd(geometries: Geometries | Geometries[]): void;
		onGeometryRemove(params: any): void;
		onGeometrySymbolChange(e: {
			target: Geometries;
		}): void;
		onGeometryShapeChange(params: any): void;
		onGeometryPositionChange(params: any): void;
		onGeometryZIndexChange(params: any): void;
		onGeometryShow(params: any): void;
		onGeometryHide(params: any): void;
		onGeometryPropertiesChange(_: any): void;
	};
} & typeof CanvasRenderer;
declare class OverlayLayerCanvasRenderer extends OverlayLayerCanvasRenderer_base {
	render(...args: any[]): void;
}
declare const OverlayLayerGLRenderer_base: {
	new (...args: any[]): {
		_geosToCheck: Geometries[];
		_resourceChecked: boolean;
		clearImageData?(): void;
		_lastGeosToDraw: Geometry[];
		mapStateCache: MapStateCacheType;
		/**
		 * @english
		 * possible memory leaks:
		 * 1. if geometries' symbols with external resources change frequently,
		 * resources of old symbols will still be stored.
		 * 2. removed geometries' resources won't be removed.
		 */
		checkResources(): any[];
		_addGeoToCheckRes(res: Geometries | Geometries[]): void;
		onGeometryAdd(geometries: Geometries | Geometries[]): void;
		onGeometryRemove(params: any): void;
		onGeometrySymbolChange(e: {
			target: Geometries;
		}): void;
		onGeometryShapeChange(params: any): void;
		onGeometryPositionChange(params: any): void;
		onGeometryZIndexChange(params: any): void;
		onGeometryShow(params: any): void;
		onGeometryHide(params: any): void;
		onGeometryPropertiesChange(_: any): void;
	};
} & typeof LayerAbstractRenderer;
declare class OverlayLayerGLRenderer extends OverlayLayerGLRenderer_base {
	render(...args: any[]): void;
}
declare class Painter extends Class {
	bbox: BBOX;
	geometry: Geometries;
	symbolizers: any[];
	containerOffset: Point;
	minAltitude: number;
	maxAltitude: number;
	/**
	 *  @param geometry - geometry to paint
	 */
	constructor(geometry: Geometries);
	getRenderBBOX(): BBOX;
	getMap(): Map$1;
	getLayer(): OverlayLayer;
	hasPoint(): boolean;
	/**
	 * for point symbolizers
	 * @return points to render
	 */
	getRenderPoints(placement: string): Point[][];
	/**
	 * for strokeAndFillSymbolizer
	 * @return resources to render vector
	 */
	getPaintParams(dx: number, dy: number, ignoreAltitude: boolean, disableClip: boolean, ptkey?: string): any[];
	getSymbol(): any;
	paint(extent?: Extent, context?: any, offset?: Point): void;
	getSprite(resources: any, canvasClass: any): any;
	isSpriting(): boolean;
	hitTest(cp: any, tolerance: any): boolean;
	isHitTesting(): boolean;
	get2DExtent(resources?: ResourceCache, out?: Extent): Extent;
	getFixedExtent(): any;
	setZIndex(change: number): void;
	show(): void;
	hide(): void;
	repaint(): void;
	/**
	 * refresh symbolizers when symbol changed
	 */
	refreshSymbol(): void;
	remove(): void;
	/**
	 * delete painter's caches
	 */
	removeCache(): void;
	getAltitude(): any;
	getMinAltitude(): number;
	getMaxAltitude(): number;
	getPathTempRenderPoints(): any;
}
declare class CollectionPainter extends Class {
	bbox: BBOX;
	geometry: Geometries;
	isMask: boolean;
	/**
	 * @param geometry - geometry to paint
	 * @param isMask
	 */
	constructor(geometry: Geometries, isMask?: boolean);
	getRenderBBOX(): BBOX;
	getLayer(): OverlayLayer;
	paint(extent: Extent): void;
	get2DExtent(resources?: ResourceCache, out?: Extent): Extent;
	remove(): void;
	setZIndex(index: number): void;
	show(): void;
	hide(): void;
	repaint(): void;
	refreshSymbol(): void;
	hasPoint(): boolean;
	getMinAltitude(): number;
	getMaxAltitude(): number;
}
declare const CenterPointRenderer: {
	_getRenderPoints(): [
		Point[],
		WithNull<Point[]>
	];
};
export type CenterPointRendererType = typeof CenterPointRenderer;
export interface Marker extends CenterPointRendererType {
}
export interface LineString {
}
export interface Polygon {
}
declare const geometryInclude: {
	_redrawWhenPitch: () => boolean;
	_redrawWhenRotate: () => boolean;
	_getRenderBBOX(ctx: CanvasRenderingContext2D, points: Point[]): BBOX;
};
export type GeometryIncludeType = typeof geometryInclude;
export interface Geometry extends GeometryIncludeType {
}
declare function _computeRotatedPrjExtent(): Extent;
declare function getRotatedShell(): Coordinate[];
declare const el: {
	_redrawWhenPitch: () => boolean;
	_redrawWhenRotate: () => boolean;
	_computeRotatedPrjExtent: typeof _computeRotatedPrjExtent;
	getRotatedShell: typeof getRotatedShell;
	_paintAsPath: () => boolean;
	_getPaintParams(): any[];
	_paintOn: (...args: any[]) => void;
	_getRenderSize(pt: Coordinate): number[];
};
export type ElType = typeof el;
export interface Ellipse extends Omit<ElType, "_paintOn" | "_getPaintParams"> {
}
export interface Circle extends Omit<ElType, "_paintOn" | "_getPaintParams"> {
}
declare const rectangleInclude: {
	_getPaintParams(): any[];
	_paintOn: (ctx: any, points: any, lineOpacity: any, fillOpacity: any, lineDashArray?: any, smoothness?: any) => void;
	_computeRotatedPrjExtent: typeof _computeRotatedPrjExtent;
	getRotatedShell: typeof getRotatedShell;
};
export type RectangleIncludeType = typeof rectangleInclude;
export interface Rectangle extends Omit<RectangleIncludeType, "_paintOn" | "_getPaintParams"> {
}
declare const sectorInclude: {
	_redrawWhenPitch: () => boolean;
	_getPaintParams(): [
		Point,
		number,
		[
			number,
			number
		]
	];
	_paintOn: (...args: any[]) => void;
};
export type SectorIncludeType = typeof sectorInclude;
export interface Sector extends Omit<SectorIncludeType, "_paintOn" | "_getPaintParams"> {
}
export interface Path {
}
declare const lineStringInclude: {
	arrowStyles: {
		classic: number[];
	};
	_getArrowShape(prePoint?: Point, point?: any, lineWidth?: number, arrowStyle?: any, tolerance?: number): any[];
	_getPaintParams(): [
		Point[]
	];
	_paintOn(ctx: CanvasRenderingContext2D, points: Point[], lineOpacity?: number, fillOpacity?: number, dasharray?: number[], lineColorIn?: any): any;
	_getArrowPlacement(): any;
	_getArrowStyle(): any;
	_getArrows(points: Array<Point> | Array<Array<Point>>, lineWidth: number, tolerance?: number): any[];
	_getArrowPoints(arrows: any[], segments: any[], lineWidth?: number, arrowStyle?: any, tolerance?: number): void;
	_paintArrow(ctx: CanvasRenderingContext2D, points: Point[], lineOpacity?: number): void;
};
export type LineStringIncludeType = typeof lineStringInclude;
export interface LineString extends LineStringIncludeType {
}
export interface Polygon {
}
declare class VectorLayerRenderer extends OverlayLayerCanvasRenderer {
	renderEnd: boolean;
	pageGeos: Geometries[];
	page: number;
	maxTolerance: number;
	geoPainterList: (Painter | CollectionPainter)[];
	snapshotCanvas: HTMLCanvasElement;
	setToRedraw(): this;
	getImageData(): ImageData;
	clearImageData(): void;
	checkResources(...args: any[]): any;
	needToRedraw(): boolean;
	/**
	 * render layer
	 */
	draw(): void;
	isBlank(): boolean;
	drawOnInteracting(): void;
	/**
	 * Show and render
	 * @override
	 */
	show(...args: any[]): void;
	forEachGeo(fn: Function, context?: any): void;
	drawGeos(): void;
	prepareToDraw(): this;
	checkGeo(geo: Geometries): void;
	onZoomEnd(...args: any[]): void;
	onRemove(): void;
	onGeometryPropertiesChange(param: any): void;
	identifyAtPoint(point: Point, options?: {}): any;
	isProgressiveRender(): boolean;
	getGeosForIdentify(): Geometries[];
	getGeoPainterList(): (Painter | CollectionPainter)[];
}
declare class CanvasLayerRenderer extends CanvasRenderer {
	buffer: HTMLCanvasElement;
	getPrepareParams(): any[];
	getDrawParams(): any[];
	onCanvasCreate(): void;
	needToRedraw(): boolean;
	draw(...args: any[]): void;
	drawOnInteracting(...args: any[]): void;
	getCanvasImage(): any;
	remove(): void;
	onZoomStart(param: any): void;
	onZooming(param: any): void;
	onZoomEnd(param: any): void;
	onMoveStart(param: any): void;
	onMoving(param: any): void;
	onMoveEnd(param: any): void;
	onResize(param: any): void;
	prepareDrawContext(): void;
}
export type handlerQueueFn = () => void;
declare abstract class MapRenderer extends Class {
	map: Map$1;
	constructor(map: Map$1);
	setToRedraw(): void;
	callInNextFrame(fn: handlerQueueFn): void;
	executeFrameCallbacks(): void;
	/**
	 * Move map platform with offset
	 * @param offset
	 * @param force
	 */
	offsetPlatform(offset: Point, force?: boolean): this;
	domChanged(): boolean;
	resetContainer(): void;
	onZoomEnd(): void;
}
declare const GeometryEditor_base: {
	new (...args: any[]): {
		_eventMap?: Record<string, {
			handler: HandlerFn;
			context: any;
		}[]>;
		_eventParent?: any;
		_eventTarget?: any;
		on(eventsOn: string | EventRecords, handler: HandlerFn, context?: any): any;
		addEventListener(...args: any[]): any;
		once(eventTypes: string | EventRecords, handler: HandlerFn, context?: any): any;
		off(eventsOff: string | EventRecords, handler: HandlerFn, context?: any): any;
		removeEventListener(...args: any[]): any;
		listens(eventType: string, handler?: HandlerFn, context?: any): number;
		getListeningEvents(): string[];
		copyEventListeners(target: any): any;
		fire(eventType: string, param?: BaseEventParamsType): any;
		_wrapOnceHandler(evtType: string, handler: HandlerFn, context?: any): (...args: any[]) => void;
		_switch(to: string, eventRecords: EventRecords, context?: any): any;
		_clearListeners(eventType: string): void;
		_clearAllListeners(): void;
		_setEventParent(parent: any): any;
		_setEventTarget(target: any): any;
		_fire(eventType: string, param: BaseEventParamsType): any;
	};
} & typeof Class;
declare class GeometryEditor extends GeometryEditor_base {
	editing: boolean;
	options: GeometryEditOptionsType;
	/**
	 * @param {Geometry} geometry geometry to edit
	 * @param {Object} [opts=null] options
	 * @param {Object} [opts.symbol=null] symbol of being edited.
	 */
	constructor(geometry: any, opts: GeometryEditOptionsType);
	/**
	 * 获取地图对象
	 * @english
	 * Get map
	 * @return {Map} map
	 */
	getMap(): any;
	/**
	 * 准备编辑
	 * @english
	 * Prepare to edit
	 */
	prepare(): void;
	/**
	 * 开始编辑
	 * @english
	 * Start to edit
	 */
	start(): void;
	/**
	 * 停止编辑
	 * @english
	 * Stop editing
	 */
	stop(): void;
	/**
	 * 编辑器是否在编辑
	 * @english
	 * Whether the editor is editing
	 * @return {Boolean}
	 */
	isEditing(): boolean;
	_shadowDragEvent(e: any): void;
	createHandle(containerPoint: any, opts: any): EditHandle;
	/**
	 * 创建标记编辑器
	 * @english
	 * Create marker editor
	 * @private
	 */
	createMarkerEditor(): void;
	/**
	 * 创建圆形编辑器
	 * @english
	 * Create circle editor
	 * @private
	 */
	createCircleEditor(): void;
	/**
	 * 创建椭圆或者矩形编辑器
	 * @english
	 * editor of ellipse or rectangle
	 * @private
	 */
	createEllipseOrRectEditor(): void;
	/**
	 * 创建多边形编辑器
	 * @english
	 * Editor for polygon
	 * @private
	 */
	createPolygonEditor(): void;
	cancel(): GeometryEditor;
	/**
	 * 获取视图历史记录中的上一个地图视图
	 * @english
	 * Get previous map view in view history
	 * @return {Object} map view
	 */
	undo(): any;
	/**
	 * 获取视图历史记录中的下一个地图视图
	 * @english
	 * Get next view in view history
	 * @return {Object} map view
	 */
	redo(): any;
	_isRedoEdit(): boolean;
	_isundoEdit(): boolean;
}
export type EventParams = any;
export interface EditHandleOptions {
	symbol: Record<string, any>;
	events: string[];
	cursor: string;
	zIndex?: number;
	ignoreCollision?: boolean;
}
declare const EditHandle_base: any;
declare class EditHandle extends EditHandle_base {
	target: GeometryEditor;
	map: Map$1;
	w: number;
	h: number;
	opacity: number;
	events: string[];
	url: string;
	bbox: BBOX;
	paramOptions: Record<string, any>;
	constructor(target: GeometryEditor, map: Map$1, options: EditHandleOptions);
	getCursor(): any;
	setContainerPoint(cp: Point): void;
	getContainerPoint(): Point;
	offset(p: Point | PointJson): void;
	render(ctx: any): boolean;
	delete(): void;
	hitTest(p: Point | PointJson): boolean;
	addTo(map: Map$1): void;
	onEvent(e: EventParams): void;
	mousedown(e: EventParams): void;
	onDragstart(e: EventParams): void;
	onDragging(e: EventParams): void;
	onDragend(e: EventParams): void;
	needCollision(): boolean;
	getRenderBBOX(dpr?: number): BBOX;
	setZIndex(zIndex: number): void;
}
export interface EditOutlineOptions {
	zIndex?: number;
}
declare class EditOutline {
	points: any;
	xmin: number;
	xmax: number;
	ymin: number;
	ymax: number;
	map: Map$1;
	target: GeometryEditor;
	options: EditOutlineOptions;
	constructor(target: GeometryEditor, map: Map$1, options?: EditOutlineOptions);
	needCollision?(): boolean;
	getRenderBBOX?(dpr?: number): BBOX;
	setPoints(points: Point[]): void;
	hitTest(): boolean;
	render(ctx: CanvasRenderingContext2D): void;
	addTo(map: Map$1): void;
	delete(): void;
}
declare class MapAbstractRenderer extends MapRenderer {
	context: any;
	canvas: HTMLCanvasElement;
	topLayer: HTMLCanvasElement;
	topCtx: CanvasRenderingContext2D;
	ready: boolean;
	/**
	 * @param map - map for the renderer
	 */
	constructor(map: Map$1);
	load(): void;
	/**
	 * render layers in current frame
	 * @returns return false to cease frame loop
	 */
	renderFrame(framestamp: number): boolean;
	getFrameTimestamp(): number;
	updateMapDOM(): void;
	checkIfNeedToRedrawLayers(layers: Layer[]): boolean;
	drawLayers(layers: Layer[], framestamp: number): boolean;
	updateMapSize(size: Size): void;
	getMainPanel(): HTMLCanvasElement | HTMLDivElement | (HTMLElement & {
		layerDOM: HTMLElement;
		uiDOM: HTMLElement;
	});
	toDataURL(mimeType: string, quality?: number): string;
	remove(): void;
	hitDetect(point: Point): void;
	/**
	 * initialize container DOM of panels
	 */
	initContainer(): void;
	/**
	 * Is current map's state changed?
	 */
	isViewChanged(): boolean;
	isSpatialReferenceChanged(): boolean;
	onLoad(): void;
	createCanvas(): void;
	createContext(): Promise<void>;
	clearLayerCanvasContext(_layer: any): void;
	clearCanvas(): void;
	createTopCanvas(): void;
	removeTopCanvas(): void;
	addTopElement(e: EditHandle | EditOutline): void;
	removeTopElement(e: EditHandle | EditOutline): void;
	getTopElements(): (EditHandle | EditOutline)[];
	sortTopElements(): void;
	drawTops(): void;
	drawTopElements(): void;
	isWebGPU(): boolean;
}
declare class MapCanvasRenderer extends MapAbstractRenderer {
	context: CanvasRenderingContext2D;
	/**
	 * render layers in current frame
	 * @returns return false to cease frame loop
	 */
	renderFrame(framestamp: number): boolean;
	drawLayers(layers: Layer[], framestamp: number): boolean;
	isLayerCanvasUpdated(): boolean;
	setLayerCanvasUpdated(): void;
	/**
	 * Renders the layers
	 */
	drawLayerCanvas(layers: Layer[]): boolean;
	setToRedraw(): void;
	remove(): void;
	hitDetect(point: Point): void;
	clearCanvas(): void;
	createCanvas(): void;
	drawTops(): void;
}
declare function _default$9<T extends MixinConstructor>(Base: T): {
	new (...args: any[]): {};
	/**
	 * 用给定的 name 注册一个 `renderer` 类
	 * @english
	 * Register a renderer class with the given name.
	 * @param  name  - renderer's register key
	 * @param  clazz - renderer's class{@link Class}).
	 */
	registerRenderer<T_1 extends typeof Class>(name: string, clazz: T_1): any & T;
	/**
	 * 返回用name注册的 `renderer` 类
	 * @english
	 * Get the registered renderer class by the given name
	 * @param  name  - renderer's register key
	 */
	getRendererClass(name: string): Class | null;
} & T;
/**
 * A layer used to display tiled map services, such as [google maps](http://maps.google.com), [open street maps](http://www.osm.org)
 * @category layer
 * @example
 *  new TileLayer("tile",{
		urlTemplate : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		subdomains:['a','b','c']
	})
 */
export declare class TileLayer extends Layer {
	tileInfoCache: LRUCache;
	options: TileLayerOptionsType;
	/**
	 *
	 * @param id - tile layer's id
	 * @param options - options defined in TileLayerOptionsType
	 */
	constructor(id: string, options?: TileLayerOptionsType);
	/**
	 * Reproduce a TileLayer from layer's profile JSON.
	 * @param layerJSON - layer's profile JSON
	 * @return
	 * @static
	 * @protected
	 * @function
	 */
	static fromJSON(layerJSON: Record<string, any>): TileLayer;
	/**
	 * force Reload tilelayer.
	 * Note that this method will clear all cached tiles and reload them. It shouldn't be called frequently for performance reason.

	 * @return this
	 */
	forceReload(): this;
	/**
	 * Get tile size of the tile layer
	 * @return
	 */
	getTileSize(id?: string): Size;
	getTiles(z: number, parentLayer: Layer): any;
	createTileNode(x: number, y: number, z: number, idx: number, idy: number, res: number, error: number, parentId?: string, extent2d?: PointExtent, tileId?: string): TileNodeType;
	isParentTile(currentTileZoom: number, maxZoom: number, tile: TileNodeType): boolean;
	/**
	 * Get tile's url
	 * @param x
	 * @param y
	 * @param z
	 * @returns url
	 */
	getTileUrl(x: number, y: number, z: number): string;
	/**
	 * Clear the layer
	 * @return this
	 */
	clear(): this;
	/**
	 * Export the tile layer's profile json. <br>
	 * Layer's profile is a snapshot of the layer in JSON format. <br>
	 * It can be used to reproduce the instance by [fromJSON]{@link Layer#fromJSON} method
	 * @return layer's profile JSON
	 */
	toJSON(): LayerJSONType;
	/**
	 * Get tilelayer's spatial reference.
	 * @returns spatial reference
	 */
	getSpatialReference(): SpatialReference;
	getMinZoom(): number;
	getMaxZoom(): number;
	/**
	 * Get tileLayer's max available zoom, either options['maxAvailableZoom'] or spatialReference's maxZoom
	 *
	 * @returns
	 **/
	getMaxAvailableZoom(): number;
	getTileId(x: number, y: number, zoom: number, id: string): string;
	getEvents(): {
		spatialreferencechange: () => void;
	};
	/**
	 * Get layer's polygonOffset count
	 * @return
	 */
	getPolygonOffsetCount(): number;
	/**
	 * Get layer's base polygon offset
	 * @return
	 */
	getPolygonOffset(): number;
	/**
	 * Set layer's base polygon offset, called by GroupGLLayer
	 * @param offset polygon offset
	 * @return
	 */
	setPolygonOffset(offset: number): this;
	getRenderer(): TileLayerCanvasRenderer;
}
export type TileOffsetType = [
	number,
	number
];
export type TileNodeType = {
	x: number;
	y: number;
	z: number;
	url: string;
	res: number;
	parent: string;
	offset: TileOffsetType;
	layer: string;
	idy: number;
	idx: number;
	id: string;
	extent2d: PointExtent;
	error: number;
	children: Array<string>;
	minAltitude?: number;
	maxAltitude?: number;
};
export type TileGridType = {
	count?: number;
	extent: PointExtent;
	offset: TileOffsetType;
	parents?: Array<TileNodeType>;
	tiles: Array<TileNodeType>;
	zoom: number;
};
export type TilesType = {
	tileGrids: Array<TileGridType>;
	count: number;
};
export type TileLayerOptionsType = LayerOptionsType & {
	urlTemplate: string | ((...args: any[]) => string);
	subdomains?: string[];
	spatialReference?: SpatialReferenceType;
	tileSize?: number | [
		number,
		number
	];
	offset?: number[] | ((...args: any[]) => number[]);
	tileSystem?: [
		number,
		number,
		number,
		number
	];
	maxAvailableZoom?: number;
	repeatWorld?: boolean;
	background?: boolean;
	placeholder?: boolean | ((...args: any[]) => boolean);
	fragmentShader?: string;
	crossOrigin?: string;
	fadeAnimation?: boolean;
	fadeDuration?: number;
	debug?: boolean;
	renderer?: "gl" | "canvas";
	maxCacheSize?: number;
	cascadeTiles?: boolean;
	zoomOffset?: number;
	reloadErrorTileFunction?: (layer: TileLayer, renderer: TileLayerCanvasRenderer, tileInfo: Tile["info"], tileImage: Tile["image"]) => void;
	errorUrl?: string;
	customTags?: Record<string, any>;
	decodeImageInWorker?: boolean;
	token?: string;
	fetchOptions?: Record<string, any>;
	awareOfTerrain?: boolean;
	bufferPixel?: number;
	depthMask?: boolean;
	loadingLimitOnInteracting?: number;
	loadingLimit?: number;
	clipByPitch?: boolean;
	pyramidMode?: number;
	tileLimitPerFrame?: number;
	tileStackStartDepth?: number;
	tileStackDepth?: number;
	mipmapTexture?: boolean;
	currentTilesFirst?: boolean;
	tileErrorScale?: number;
};
/**
 * @classdesc
 * A layer used to display a group of tile layers. <br>
 * Its performance is better than add TileLayers seperately and it can help prevent limits of active webgl contexts: <br>
 * "WARNING: Too many active WebGL contexts. Oldest context will be lost"
 * @category layer
 * @extends TileLayer
 * @param {String|Number} id - tile layer's id
 * @param {TileLayer[]} layers  - TileLayers to add
 * @param {Object} [options=null] - options defined in [TileLayer]{@link TileLayer#options}
 * @example
 * new GroupTileLayer("group-tiles",[
	new maptalks.WMSTileLayer('wms', {
	  'urlTemplate' : 'https://demo.boundlessgeo.com/geoserver/ows',
	  'crs' : 'EPSG:3857',
	  'layers' : 'ne:ne',
	  'styles' : '',
	  'version' : '1.3.0',
	  'format': 'image/png',
	  'transparent' : true,
	  'uppercase' : true
	}),
	new maptalks.TileLayer('tile2',{
	  urlTemplate: 'http://korona.geog.uni-heidelberg.de/tiles/adminb/x={x}&y={y}&z={z}'
	})
  ])
 */
export declare class GroupTileLayer extends TileLayer {
	layers: TileLayer[];
	layerMap: Record<string, TileLayer>;
	/**
	 * Reproduce a GroupTileLayer from layer's profile JSON.
	 * @param layerJSON - layer's profile JSON
	 * @return
	 * @static
	 * @private
	 * @function
	 */
	static fromJSON(layerJSON: {
		[x: string]: any;
	}): GroupTileLayer;
	/**
	 * @param id    - layer's id
	 * @param layers  - TileLayers to add
	 * @param [options=null]          - construct options
	 * @param [options.*=null]             - options defined in [TileLayer]{@link TileLayer#options}
	 */
	constructor(id: string, layers: TileLayer[], options?: GroupTileLayerOptionsType);
	/**
	 * Get children TileLayer
	 */
	getLayers(): TileLayer[];
	/**
	 * add tilelayers
	 * @param tileLayers
	 */
	addLayer(tileLayers?: TileLayer[]): this;
	/**
	 * remove tilelayers
	 * @param tileLayers
	 */
	removeLayer(tileLayers?: TileLayer[]): this;
	/**
   * clear tilelayers
   */
	clearLayers(): this;
	/**
	 * Export the GroupTileLayer's profile json. <br>
	 * Layer's profile is a snapshot of the layer in JSON format. <br>
	 * It can be used to reproduce the instance by [fromJSON]{@link Layer#fromJSON} method
	 * @return layer's profile JSON
	 */
	toJSON(): LayerJSONType;
	getTileSize(id: number | string): Size;
	/**
	 * Get tiles at zoom (or current zoom)
	 * @param z
	 * @returns tiles
	 */
	getTiles(z: number, parentLayer: any): TilesType;
	onAdd(): void;
	onRemove(): void;
	getLayer(id: string | number): TileLayer;
	getChildLayer(id: string | number): TileLayer;
	isVisible(): boolean;
}
export type GroupTileLayerOptionsType = TileLayerOptionsType & {
	maxCacheSize?: number;
};
/**
 * @classdesc
 * Used to display [WMS]{https://en.wikipedia.org/wiki/Web_Map_Service} services as tile layers on the map. Extends [TileLayer]{@link TileLayer}.
 * Implemented based on Leaflet's TileLayer.WMS.
 * @category layer
 * @extends TileLayer
 * @param id - tile layer's id
 * @param - options defined in [WMSTileLayer]{@link TileLayer#options}
 * @example
 * var layer = new maptalks.WMSTileLayer('wms', {
 *     'urlTemplate' : 'https://demo.boundlessgeo.com/geoserver/ows',
 *     'crs' : 'EPSG:3857',
 *     'layers' : 'ne:ne',
 *     'styles' : '',
 *     'version' : '1.3.0',
 *     'format': 'image/png',
 *     'transparent' : true,
 *     'uppercase' : true
 * });
 */
export declare class WMSTileLayer extends TileLayer {
	wmsParams: WMSTileLayerOptionsType;
	options: WMSTileLayerOptionsType;
	constructor(id: string, options: WMSTileLayerOptionsType);
	onAdd(): void;
	getTileUrl(x: number, y: number, z: number): string;
	/**
	 * Export the WMSTileLayer's json. <br>
	 * It can be used to reproduce the instance by [fromJSON]{@link Layer#fromJSON} method
	 * @return layer's JSON
	 */
	toJSON(): LayerJSONType;
	/**
	 * Reproduce a WMSTileLayer from layer's JSON.
	 * @param layerJSON - layer's JSON
	 * @return a WMSTileLayer instance
	 * @static
	 * @private
	 * @function
	 */
	static fromJSON(layerJSON: {
		[x: string]: any;
	}): WMSTileLayer;
}
export type WMSTileLayerOptionsType = TileLayerOptionsType & {
	service?: string;
	layers?: string;
	styles?: string;
	format?: string;
	transparent?: boolean;
	version?: string;
	crs?: string;
	uppercase?: boolean;
	detectRetina?: boolean;
	width?: number;
	height?: number;
};
/**
 * @classdesc
 * @ignore
 * @category layer
 * @extends TileLayer
 * @param id - tile layer's id
 * @param - options defined in [CanvasTileLayer]{@link TileLayer#options}
 * @example
 * var layer = new CanvasTileLayer("tile");
 * layer.drawTile = ()
 */
export declare class CanvasTileLayer extends TileLayer {
	constructor(id: string, options: CanvasTileLayerOptionsType);
	/**
	 * The interface method to draw on canvsa tile
	 * @param canvas  canvas to draw on
	 * @param options current options
	 * @param options current options
	 */
	drawTile(): void;
	/**
	 * Export the CanvasTileLayer's json. <br>
	 * It can be used to reproduce the instance by [fromJSON]{@link Layer#fromJSON} method
	 * @return layer's JSON
	 */
	toJSON(): LayerJSONType;
	/**
	 * Reproduce a CanvasTileLayer from layer's JSON.
	 * @param layerJSON - layer's JSON
	 * @static
	 * @private
	 * @function
	 */
	static fromJSON(layerJSON: {
		[x: string]: any;
	}): CanvasTileLayer;
}
export type CanvasTileLayerOptionsType = TileLayerOptionsType;
export declare class DrawToolLayer extends OverlayLayer {
	options: DrawToolLayerOptionsType;
	/**
	 * @param id                    - layer's id
	 * @param geometries=null       - geometries to add
	 * @param options=null          - construct options
	 * @param options.style=null    - drawToolLayer's style
	 */
	constructor(id: string, geometries?: DrawToolLayerOptionsType | Array<Geometry>, options?: DrawToolLayerOptionsType);
	bringToFront(): this;
	addGeometry(geometries: Geometry | Array<Geometry>): void;
	removeGeometry(geometries: Geometry | Geometry[]): void;
	_onRemoveDrawToolGeo(params: any): void;
	onRemove(): void;
	onAdd(): void;
	getRenderer(): any;
	_getRenderer(): any;
}
export type DrawToolLayerOptionsType = OverlayLayerOptionsType & {
	depthFunc?: string;
	sceneConfig?: any;
	enableAltitude?: boolean;
	enableSimplify?: boolean;
};
export type VectorLayerToJSONOptions = {
	geometries: any;
	clipExtent: Extent;
};
/**
 * 用于管理、呈现 geometries 的 layer
 *
 * @english
 * @classdesc
 * A layer for managing and rendering geometries.
 * @category layer
 * @extends OverlayLayer
 */
export declare class VectorLayer extends OverlayLayer {
	options: VectorLayerOptionsType;
	isVectorLayer: boolean;
	/**
	 * @param id                    - layer's id
	 * @param geometries=null       - geometries to add
	 * @param options=null          - construct options
	 * @param options.style=null    - vectorlayer's style
	 * @param options.*=null        - options defined in [VectorLayer]{@link VectorLayer#options}
	 */
	constructor(id: string, geometries?: VectorLayerOptionsType | Array<Geometry>, options?: VectorLayerOptionsType);
	onConfig(conf: Record<string, any>): void;
	/**
	 * 通过给定 coordinate 识别 geometries
	 *
	 * @english
	 * Identify the geometries on the given coordinate
	 * @param  {maptalks.Coordinate} coordinate   - coordinate to identify
	 * @param  {Object} [options=null]  - options
	 * @param  {Object} [options.tolerance=0] - identify tolerance in pixel
	 * @param  {Object} [options.count=null]  - result count
	 * @return {Geometry[]} geometries identified
	 */
	identify(coordinate: Coordinate, options?: LayerIdentifyOptionsType): Geometry[];
	/**
	 * 通过给定 point 识别 geometries
	 *
	 * @english
	 * Identify the geometries on the given container point
	 * @param  {maptalks.Point} point   - container point to identify
	 * @param  {Object} [options=null]  - options
	 * @param  {Object} [options.tolerance=0] - identify tolerance in pixel
	 * @param  {Object} [options.count=null]  - result count
	 * @return {Geometry[]} geometries identified
	 */
	identifyAtPoint(point: Point, options?: LayerIdentifyOptionsType): any;
	getAltitude(): number;
	/**
	 * 输出 VectorLayer 的 json
	 *
	 * @english
	 * Export the VectorLayer's JSON. <br>
	 * @param  {Object} [options=null] - export options
	 * @param  {Object} [options.geometries=null] - If not null and the layer is a [OverlayerLayer]{@link OverlayLayer},
	 *                                            the layer's geometries will be exported with the given "options.geometries" as a parameter of geometry's toJSON.
	 * @param  {Extent} [options.clipExtent=null] - if set, only the geometries intersectes with the extent will be exported.
	 * @return layer's JSON
	 */
	toJSON(options?: VectorLayerToJSONOptions): LayerJSONType;
	getRenderer(): VectorLayerRenderer;
	/**
	 * 通过 json 生成 VectorLayer
	 *
	 * @english
	 * Reproduce a VectorLayer from layer's JSON.
	 * @param  {Object} layerJSON - layer's JSON
	 * @return {VectorLayer}
	 * @static
	 * @private
	 * @function
	 */
	static fromJSON(json: Record<string, any>): VectorLayer;
	static getPainterClass(): typeof Painter;
	static getCollectionPainterClass(): typeof CollectionPainter;
}
export type VectorLayerOptionsType = OverlayLayerOptionsType & {
	debug?: boolean;
	enableSimplify?: boolean;
	cursor?: string;
	geometryEvents?: boolean;
	defaultIconSize?: [
		number,
		number
	];
	cacheVectorOnCanvas?: boolean;
	cacheSvgOnCanvas?: boolean;
	enableAltitude?: boolean;
	altitudeProperty?: string;
	drawAltitude?: boolean;
	sortByDistanceToCamera?: boolean;
	roundPoint?: boolean;
	altitude?: number;
	clipBBoxBufferSize?: number;
	collision?: boolean;
	collisionBufferSize?: number;
	collisionDelay?: number;
	collisionScope?: "layer" | "map";
	progressiveRender?: boolean;
	progressiveRenderCount?: number;
	progressiveRenderDebug?: boolean;
};
/**
 * 一个带有HTML5 2D canvas的layer
 * CanvasLayer为canvas操作提供了一些接口方法
 * 你可以直接使用CanvasLayer,但不能通过JSON序列化/反序列化实现CanvasLayer
 * 更推荐使用子类扩展CanvasLayer，并在子类中实现canvas绘画
 *
 * @english
 * A layer with a HTML5 2D canvas context.<br>
 * CanvasLayer provides some interface methods for canvas context operations. <br>
 * You can use it directly, but can't serialize/deserialize a CanvasLayer with JSON in this way. <br>
 * It is more recommended to extend it with a subclass and implement canvas paintings inside the subclass.
 * @example
 *  var layer = new CanvasLayer('canvas');
 *
 *  layer.prepareToDraw = function (context) {
 *      var size = map.getSize();
 *      return [size.width, size.height]
 *  };
 *
 *  layer.draw = function (context, width, height) {
 *      context.fillStyle = "#f00";
 *      context.fillRect(0, 0, w, h);
 *  };
 *  layer.addTo(map);
 * @category layer
 * @extends Layer
 * @param {String|Number} id - layer's id
 * @param {Object} options - options defined in [options]{@link CanvasLayer#options}
 */
export declare class CanvasLayer extends Layer {
	isCanvasRender(): boolean;
	/**
	 * 准备画布的接口函数
	 *
	 * @engilsh
	 * An optional interface function called only once before the first draw, useful for preparing your canvas operations.
	 * @param  {CanvasRenderingContext2D } context - CanvasRenderingContext2D of the layer canvas.
	 * @return {Object[]} objects that will be passed to function draw(context, ..) as parameters.
	 */
	prepareToDraw(): void;
	/**
	 * 绘制something的接口函数
	 *
	 * @engilsh
	 * The required interface function to draw things on the layer canvas.
	 * @param  {CanvasRenderingContext2D} context - CanvasRenderingContext2D of the layer canvas.
	 * @param  {*} params.. - parameters returned by function prepareToDraw(context).
	 */
	draw(...params: any[]): void;
	/**
	 * map交互绘制接口
	 * 默认情况调用draw()
	 * 如果你知道如何提升绘制性能可以重新此方法
	 *
	 * @english
	 * An optional interface function to draw while map is interacting.
	 * By default, it will call draw method instead.
	 * You can override this method if you are clear with what to draw when interacting to improve performance.
	 * @param  {CanvasRenderingContext2D} context - CanvasRenderingContext2D of the layer canvas.
	 * @param  {*} params.. - parameters returned by function prepareToDraw(context).
	 */
	/**
	 * 重绘
	 *
	 * @english
	 * Redraw the layer
	 * @return this
	 */
	redraw(): this;
	/**
	 * 播放
	 *
	 * @english
	 * Start animation
	 * @return this
	 */
	play(): this;
	/**
	 * 暂停
	 *
	 * @english
	 * Pause the animation
	 * @return this
	 */
	pause(): this;
	/**
	 * 是否正在播放
	 *
	 * @english
	 * If the animation is playing
	 * @return
	 */
	isPlaying(): boolean;
	/**
	 * 清空画布
	 *
	 * @engilsh
	 * Clear layer's canvas
	 * @return this
	 */
	clearCanvas(): this;
	/**
	 * 要求map不触发任何事件下重绘canvas
	 *
	 * @engilsh
	 * Ask the map to redraw the layer canvas without firing any event.
	 * @return this
	 */
	requestMapToRender(): this;
	/**
	 * 要求map触发layerload事件重绘canvas
	 *
	 * @engilsh
	 * Ask the map to redraw the layer canvas and fire layerload event
	 * @return this
	 */
	completeRender(): this;
	/**
	 * canvas创建完成后的回调函数
	 *
	 * @english
	 * Callback function when layer's canvas is created. <br>
	 * Override it to do anything needed.
	 */
	onCanvasCreate(): this;
	/**
	 * map zoomstart事件回调
	 *
	 * @engilsh
	 * The event callback for map's zoomstart event.
	 * @param  {Object} param - event parameter
	 */
	onZoomStart(): void;
	/**
	 * map zooming事件回调
	 *
	 * @engilsh
	 * The event callback for map's zooming event.
	 * @param  {Object} param - event parameter
	 */
	onZooming(): void;
	/**
	 * map zoomend事件回调
	 *
	 * @engilsh
	 * The event callback for map's zoomend event.
	 * @param  {Object} param - event parameter
	 */
	onZoomEnd(): void;
	/**
	 * map movestart事件回调
	 *
	 * @engilsh
	 * The event callback for map's movestart event.
	 * @param  {Object} param - event parameter
	 */
	onMoveStart(): void;
	/**
	 * map moving事件回调
	 *
	 * @engilsh
	 * The event callback for map's moving event.
	 * @param  {Object} param - event parameter
	 */
	onMoving(): void;
	/**
	 * map moveend事件回调
	 *
	 * @engilsh
	 * The event callback for map's moveend event.
	 * @param  {Object} param - event parameter
	 */
	onMoveEnd(): void;
	/**
	 * map resize事件回调
	 *
	 * @engilsh
	 * The event callback for map's resize event.
	 * @param  {Object} param - event parameter
	 */
	onResize(): void;
	/**
	 * double buffer的回调函数
	 * 默认情况下just draws and return，如果你需要在绘制之前处理canvas，可以重写改函数
	 *
	 * @engilsh
	 * The callback function to double buffer. <br>
	 * In default, it just draws and return, and you can override it if you need to process the canvas image before drawn.
	 * @param  {CanvasRenderingContext2D} bufferContext CanvasRenderingContext2D of double buffer of the layer canvas.
	 * @param  {CanvasRenderingContext2D} context CanvasRenderingContext2D of the layer canvas.
	 */
	doubleBuffer(bufferContext: CanvasRenderingContext2D): CanvasLayer;
}
export type CanvasLayerOptionsType = LayerOptionsType & {
	doubleBuffer?: boolean;
	animation?: boolean;
	fps?: number | string;
};
/**
 * 粒子图层
 * 提供了一些渲染粒子的接口方法。
 * 你可以直接使用它，但不能以这种方式用JSON序列化/反序列化一个 particelayer
 * 更建议使用子类来扩展它
 *
 * @english
 * @classdesc
 * A layer to draw particles. <br>
 * ParticleLayer provides some interface methods to render particles. <br>
 * You can use it directly, but can't serialize/deserialize a ParticleLayer with JSON in this way. <br>
 * It is more recommended to extend it with a subclass.
 * @example
 * import { ParticleLayer } from 'maptalks';
 * var layer = new ParticleLayer('particle');
 *
 * layer.getParticles = function (t) {
 *     return particles[t];
 * };
 * layer.addTo(map);
 * @category layer
 * @extends CanvasLayer
 * @param {String} id - layer's id
 * @param {Object} [options=null] - options defined in [options]{@link ParticleLayer#options}
 */
export declare class ParticleLayer extends CanvasLayer {
	options: ParticleLayerOptionsType;
	/**
	 * 获取t时刻的例子位置
	 *
	 * @english
	 * Interface method to get particles's position at time t.
	 * @param t - current time in milliseconds
	 */
	getParticles(t?: number): void;
	draw(context: CanvasRenderingContext2D, view: any): void;
}
export type ParticleLayerOptionsType = CanvasLayerOptionsType & {
	animation?: boolean;
};
/**
 * @classdesc
 * A class internally used by tile layer helps to descibe tile system used by different tile services.<br>
 *
 * @class
 * @category layer
 * @example
 * var ts = new TileSystem([1, -1, -20037508.34, 20037508.34]);
 */
export declare class TileSystem {
	scale: {
		x: number;
		y: number;
	};
	origin: {
		x: number;
		y: number;
	};
	/**
	 * Similar with [transformation]{@link Transformation}, it contains 4 numbers: sx, sy, ox, oy.<br>
	 * @see {@link http://wiki.osgeo.org/wiki/Tile_Map_Service_Specification}
	 * @param sx the order of X-axis tile index, 1 means right is larger and -1 means the reverse, left is larger;
	 * @param sy the order of Y-axis tile index, 1 means bottom is larger and -1 means the reverse, top is larger;
	 * @param ox x of the origin point of the world's projected coordinate system
	 * @param oy y of the origin point of the world's projected coordinate system
	 */
	constructor(sx: number | number[], sy?: number, ox?: number, oy?: number);
	/**
	 * Get the default tile system's code for the projection.
	 * @param projection      - a projection object
	 * @return tile system code
	 */
	static getDefault(projection: any): string | number[];
}
/**
 * Tile config for tile layers, an utilities class for tile layers to render tiles
 * @class
 * @category layer
 * @private
 */
export declare class TileConfig {
	map: Map$1;
	tileSize: Size;
	fullExtent: Extent;
	tileSystem: TileSystem;
	transformation: Transformation;
	/**
	 * @param tileSystem  - tileSystem
	 * @param fullExtent      - fullExtent of the tile layer
	 * @param tileSize          - tile size
	 */
	constructor(map: Map$1, tileSystem: TileSystem, fullExtent: Extent, tileSize: Size);
	prepareTileInfo(tileSystem: TileSystem, fullExtent: Extent): void;
	/**
	 * Get tile index and offset from tile's northwest
	 * @param pCoord   - projected coordinate
	 * @param res - current resolution
	 * @return   tile index and offset
	 */
	getTileIndex(pCoord: Coordinate, res: number, repeatWorld: any): TileIndex;
	/**
	 * Get neibor's tile index
	 * @param tileX
	 * @param tileY
	 * @param offsetX
	 * @param offsetY
	 * @param zoomLevel
	 * @return  tile's neighbor index
	 */
	getNeighorTileIndex(tileX: number, tileY: number, offsetX: number, offsetY: number, res: number, repeatWorld: any): TileIndex;
	/**
	 * Get tile's north west's projected coordinate
	 * @param tileX
	 * @param tileY
	 * @param res
	 * @return
	 */
	getTilePrjNW(tileX: number, tileY: number, res: number, out?: any): Coordinate;
	getTilePointNW(tileX: number, tileY: number, res: number, out?: any): Point;
	/**
	 * Get tile's south east's projected coordinate
	 * @param tileX
	 * @param tileY
	 * @param res
	 * @return
	 */
	getTilePrjSE(tileX: number, tileY: number, res: number, out?: any): Coordinate;
	getTilePointSE(tileX: number, tileY: number, res: number, out?: any): Point;
	/**
	 * Get tile's projected extent
	 * @param tileX
	 * @param tileY
	 * @param res
	 * @return
	 */
	getTilePrjExtent(tileX: number, tileY: number, res: number): Extent;
}
export type TileIndex = {
	x: number;
	y: number;
	idx: number;
	idy: number;
	out: any;
};
export type AnimationStyles = {
	[key: string]: any;
};
export interface Geometry {
	animate(styles: AnimationStyles, options?: AnimationOptionsType | ((frame: Frame) => void), step?: (frame: Frame) => void): Player;
}
export interface Geometry {
	isDragging(): boolean;
}
export interface Geometry {
}
export interface Geometry {
	setInfoWindow(options: InfoWindowOptionsType): this;
	getInfoWindow(): InfoWindow;
	openInfoWindow(coordinate?: Coordinate): this;
	closeInfoWindow(): this;
	removeInfoWindow(): this;
}
declare abstract class Symbolizer {
	bbox: BBOX;
	geometry: Geometry;
	painter: Painter;
	style: any;
	constructor();
	getMap(): Map$1;
	getPainter(): Painter;
	isDynamicSize(): boolean;
	isVisible(): boolean;
	/**
	 * 测试该属性是否是与着色相关的属性
	 *
	 * @english
	 * Test if the property is a property related with coloring
	 * @param  prop - property name to test
	 * @static
	 * @function
	 * @memberof symbolizer.Symbolizer
	 */
	static testColor(prop: string): boolean;
}
declare abstract class CanvasSymbolizer extends Symbolizer {
	symbol: any;
	prepareCanvas(ctx: CanvasRenderingContext2D, style: any, resources?: ResourceCache): void;
	remove(): void;
	setZIndex(): void;
	show(): void;
	hide(): void;
}
declare abstract class PointSymbolizer extends CanvasSymbolizer {
	style: any;
	symbol: any;
	geometry: Geometry;
	painter: Painter;
	rotations: Array<number>;
	constructor(symbol: any, geometry: Geometry, painter: Painter);
	get2DExtent(): PointExtent;
	isDynamicSize(): boolean;
	getPlacement(): any;
	getRotation(): number;
	getDxDy(): Point;
}
declare class DebugSymbolizer extends PointSymbolizer {
	getPlacement(): string;
	getDxDy(): Point;
	symbolize(ctx: CanvasRenderingContext2D): void;
}
declare class ImageMarkerSymbolizer extends PointSymbolizer {
	static test(symbol: any): boolean;
	constructor(symbol: any, geometry: Geometry, painter: Painter);
	symbolize(ctx: CanvasRenderingContext2D, resources: ResourceCache): void;
	getFixedExtent(resources: ResourceCache): PointExtent;
	translate(): any;
}
declare class StrokeAndFillSymbolizer extends CanvasSymbolizer {
	_tempRenderPoints: any;
	static test(symbol: any, geometry: Geometry): boolean;
	constructor(symbol: any, geometry: Geometry, painter: Painter);
	symbolize(ctx: CanvasRenderingContext2D, resources: ResourceCache): void;
	get2DExtent(): PointExtent;
	getFixedExtent(): PointExtent;
	translate(): any;
}
declare class TextMarkerSymbolizer extends PointSymbolizer {
	strokeAndFill: any;
	static test(symbol: any): boolean;
	constructor(symbol: any, geometry: Geometry, painter: Painter);
	isAlongLine(): boolean;
	symbolize(ctx: CanvasRenderingContext2D, resources: ResourceCache): void;
	getPlacement(): any;
	getRotation(): number;
	getDxDy(): Point;
	getFixedExtent(): PointExtent;
	translate(): any;
	translateLineAndFill(s: any): any;
}
declare class VectorMarkerSymbolizer extends PointSymbolizer {
	strokeAndFill: any;
	padding: number;
	static test(symbol: any): boolean;
	constructor(symbol: any, geometry: Geometry, painter: Painter);
	symbolize(ctx: CanvasRenderingContext2D, resources: ResourceCache): void;
	getFixedExtent(): PointExtent;
	translate(): any;
}
declare class VectorPathMarkerSymbolizer extends ImageMarkerSymbolizer {
	static test(symbol: any): boolean;
	constructor(symbol: any, geometry: any, painter: any);
}
declare class DrawAltitudeSymbolizer extends PointSymbolizer {
	dxdy: any;
	static test(symbol: any, geometry: Geometry): boolean;
	constructor(symbol: any, geometry: Geometry, painter: Painter);
	symbolize(ctx: CanvasRenderingContext2D): void;
	getDxDy(): Point;
	get2DExtent(): PointExtent;
	getPlacement(): string;
}
export type AdapterFunction = (exports: {
	initialize: Function;
	onmessage: (message: any, postResponse: Function) => void;
}, global: any) => void;
export type Adapter = string | AdapterFunction;
/**
 * Register a worker adapter
 * @param {String} workerKey  - an unique key name of the worker adapter
 * @param {Function} adapter  - the worker adapter function, it must be a complete packaged function with no dependency of other functions
 * @example
 * maptalks.registerWorkerAdapter('foo', function (exports, global) {
		//will be called only for once when loaded in worker thread
		exports.initialize = function () {
		  console.log('[worker] initialized');
		};
		//to receive message from main thread sent by maptalks.worker.Actor
		exports.onmessage = function (message, postResponse) {
		  const data = message.data;
		  console.log(`[worker] received data : ` + data);
		  //send message back to main thread
		  //the parameters:
		  //error, data, buffers (arraybuffers in data)
		  postResponse(null, 'message from worker thread', null);
		};
	 });
	@global
	@static
 */
export declare function registerWorkerAdapter(workerKey: string, adapter: Adapter): void;
/**
 * @namespace worker
 */
export declare const worker: {
	Actor: typeof Actor;
};

declare namespace measurer {
	export { BaiduSphere, BaiduSphereType, DEFAULT, IdentityMeasurerType, Measurer, WGS84Sphere, WGS84SphereType, extended as Identity };
}
declare namespace projections {
	export { BAIDUProjectionType, CommonProjection as Common, CommonProjectionType, DEFAULT$1 as DEFAULT, EPSG3857ProjectionType, EPSG4326ProjectionType, EPSG9807ProjectionParams, EPSG9807ProjectionType, IdentityProjectionType, ProjectionType, UTMProjectionParams, UTMProjectionType, _default$3 as EPSG3857, _default$4 as EPSG4326, _default$5 as EPSG9807, _default$6 as BAIDU, _default$7 as UTM, _default$8 as IDENTITY };
}
declare namespace animation {
	export { Animation$1 as Animation, AnimationCallback, AnimationOptionsType, Easing, EasingType, Frame, Player, animate };
}
declare namespace math {
	export { Plane, Ray };
}
declare namespace Util {
	export { DEFAULT_FONT, DEFAULT_TEXTSIZE, EMPTY_STRING, GUID, IS_NODE, Matrix4, Matrix4InOut, UID, Vector, Vector3, Vector4, _defaults, b64toBlob, btoa$1 as btoa, calCanvasSize, cancelAnimFrame, checkMTKVersion, clamp, computeDegree, convertResourceUrl, convertStylePath, copy, describeText, emptyImageUrl, equalMapView, escapeSpecialChars, extend, extendSymbol, extractCssUrl, flash, forEachCoord, getAbsoluteURL, getAlignPoint, getExternalResources, getFont, getGlobalThis, getGradientStamp, getImageBitMap, getMarkerPathBase64, getPointsResultPts, getSymbolHash, getSymbolStamp, getValueOrDefault, hasOwn, hashCode, identity, interpolate, invert, isArrayHasData, isCssUrl, isDashLine, isEmpty, isFunction, isGradient, isImageBitMap, isInteger, isNil, isNoContentHttpCode, isNumber, isObject, isSVG, isString, isURL, join, loadImage, log2, lowerSymbolOpacity, mergeArray, multiply, now, parseJSON, parseStyleRootPath, parseSymbolPath, perspective, pushIn, removeFromArray, replaceAll, replaceVariable, requestAnimFrame, rotateX, rotateZ, scale, sign, splitContent, splitTextToRow, splitWords, stringLength, stringWidth, toDegree, toRadian, translate, translateToSVGStyles, trim, wrap };
}
declare namespace DomUtil {
	export { CSSFILTER, MOUSEMOVE_THROTTLE_TIME, TRANSFORM, TRANSFORMORIGIN, TRANSITION, addClass, addDomEvent, computeDomPosition, createEl, createElOn, getClass, getDomRuler, getEventContainerPoint, hasClass, isHTML, isMousemoveEventBlocked, isMoveEvent, listensDomEvent, measureDom, off, offsetDom, on, preventDefault, preventSelection, removeDomEvent, removeDomNode, removeTransform, setClass, setOpacity, setStyle, setTransform, setTransformMatrix, stopPropagation };
}
declare namespace StringUtil {
	export { DEFAULT_FONT, DEFAULT_TEXTSIZE, EMPTY_STRING, describeText, escapeSpecialChars, getAlignPoint, getFont, hashCode, replaceAll, replaceVariable, splitContent, splitTextToRow, splitWords, stringLength, stringWidth, trim };
}
declare namespace MapboxUtil {
	export { loadGeoSymbol };
}
declare namespace MicroTask {
	export { pushLoopHook, runTaskAsync, startTasks };
}
declare namespace BBOXUtil {
	export { BBOX, BBOX_TEMP, bboxInBBOX, bboxInMask, bboxIntersect, bufferBBOX, getDefaultBBOX, pointsBBOX, resetBBOX, setBBOX, validateBBOX };
}
declare namespace ui {
	export { InfoWindow, Menu, Menuable, ToolTip, UIComponent, UIMarker };
}
declare namespace control {
	export { Attribution, Compass, Control, LayerSwitcher, Overview, Panel, Reset, Scale, Toolbar, Zoom };
}
declare namespace renderer {
	export { CanvasLayerRenderer, CanvasRenderer, CanvasRenderer$1 as CanvasTileLayerCanvasRenderer, GLRenderer as CanvasTileLayerGLRenderer, ImageGLRenderable, ImageLayerCanvasRenderer, ImageLayerGLRenderer, ImageLayerRenderable, LayerAbstractRenderer, MapAbstractRenderer, MapCanvasRenderer, MapRenderer, OverlayLayerCanvasRenderer, OverlayLayerGLRenderer, QuadStencil, ResourceCache, TileLayerCanvasRenderer, TileLayerGLRenderer, TileLayerRenderable as TileLayerRendererable, VectorLayerRenderer as VectorLayerCanvasRenderer, _default$9 as Renderable };
}
declare namespace symbolizer {
	export { CanvasSymbolizer, DebugSymbolizer, DrawAltitudeSymbolizer, ImageMarkerSymbolizer, PointSymbolizer, StrokeAndFillSymbolizer, Symbolizer, TextMarkerSymbolizer, VectorMarkerSymbolizer, VectorPathMarkerSymbolizer };
}
declare namespace projection {
	export { BAIDUProjectionType, CommonProjection as Common, CommonProjectionType, DEFAULT$1 as DEFAULT, EPSG3857ProjectionType, EPSG4326ProjectionType, EPSG9807ProjectionParams, EPSG9807ProjectionType, IdentityProjectionType, ProjectionType, UTMProjectionParams, UTMProjectionType, _default$3 as EPSG3857, _default$4 as EPSG4326, _default$5 as EPSG9807, _default$6 as BAIDU, _default$7 as UTM, _default$8 as IDENTITY };
}

export {
	BBOXUtil,
	DomUtil,
	Map$1 as Map,
	MapboxUtil,
	MicroTask,
	StringUtil,
	Util,
	_default as Eventable,
	_default$1 as JSONAble,
	_default$2 as Handlerable,
	animation,
	control,
	math,
	measurer,
	projection,
	renderer,
	symbolizer,
	ui,
};

export {};
