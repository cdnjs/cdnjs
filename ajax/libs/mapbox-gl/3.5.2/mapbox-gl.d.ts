import Point from '@mapbox/point-geometry';
import TinySDF from '@mapbox/tiny-sdf';
import { VectorTile, VectorTileFeature, VectorTileLayer } from '@mapbox/vector-tile';
import { mat4, quat, vec2, vec3, vec4 } from 'gl-matrix';
import KDBush from 'kdbush';
import { PotpackBox } from 'potpack';

type Callback<T> = (error?: Error | null | undefined, result?: T | null | undefined) => void;
type Cancelable = {
	cancel: () => void;
};
declare const ResourceType: {
	Unknown: string;
	Style: string;
	Source: string;
	Tile: string;
	Glyphs: string;
	SpriteImage: string;
	SpriteJSON: string;
	Image: string;
	Model: string;
};
type RequestParameters = {
	url: string;
	headers?: any;
	method?: "GET" | "POST" | "PUT";
	body?: string;
	type?: "string" | "json" | "arrayBuffer";
	credentials?: "same-origin" | "include";
	collectResourceTiming?: boolean;
	referrerPolicy?: ReferrerPolicy;
};
type ResponseCallback<T> = (error?: Error | null | undefined, data?: T | null | undefined, cacheControl?: string | null | undefined, expires?: string | null | undefined) => void;
type TileJSON = {
	tilejson: "3.0.0" | "2.2.0" | "2.1.0" | "2.0.1" | "2.0.0" | "1.0.0";
	name?: string;
	description?: string;
	version?: string;
	attribution?: string;
	template?: string;
	tiles: Array<string>;
	grids?: Array<string>;
	data?: Array<string>;
	minzoom?: number;
	maxzoom?: number;
	bounds?: [
		number,
		number,
		number,
		number
	];
	center?: [
		number,
		number,
		number
	];
	vector_layers?: Array<any>;
	raster_layers?: Array<any>;
	variants?: Array<any>;
};
type ResourceTypeEnum = keyof typeof ResourceType;
type RequestTransformFunction = (url: string, resourceType?: ResourceTypeEnum) => RequestParameters;
type UrlObject = {
	protocol: string;
	authority: string;
	path: string;
	params: Array<string>;
};
declare class RequestManager {
	_skuToken: string;
	_skuTokenExpiresAt: number;
	_transformRequestFn: RequestTransformFunction | null | undefined;
	_customAccessToken: string | null | undefined;
	_silenceAuthErrors: boolean;
	constructor(transformRequestFn?: RequestTransformFunction | null, customAccessToken?: string | null, silenceAuthErrors?: boolean | null);
	_createSkuToken(): void;
	_isSkuTokenExpired(): boolean;
	transformRequest(url: string, type: ResourceTypeEnum): RequestParameters;
	normalizeStyleURL(url: string, accessToken?: string): string;
	normalizeGlyphsURL(url: string, accessToken?: string): string;
	normalizeModelURL(url: string, accessToken?: string): string;
	normalizeSourceURL(url: string, accessToken?: string | null, language?: string | null, worldview?: string | null): string;
	normalizeSpriteURL(url: string, format: string, extension: string, accessToken?: string): string;
	normalizeTileURL(tileURL: string, use2x?: boolean, rasterTileSize?: number): string;
	canonicalizeTileURL(url: string, removeAccessToken: boolean): string;
	canonicalizeTileset(tileJSON: TileJSON, sourceURL?: string): Array<string>;
	_makeAPIURL(urlObject: UrlObject, accessToken?: string | null): string;
}
type EventData = object;
declare class Event$1<R extends EventRegistry = EventRegistry, T extends keyof R = keyof R> {
	target: unknown;
	readonly type: T;
	constructor(type: T, ...eventData: R[T] extends void ? [
	] : [
		R[T]
	]);
}
interface ErrorLike {
	message: string;
}
declare class ErrorEvent$1 extends Event$1<EventRegistry, "error"> {
	error: ErrorLike;
	constructor(error: ErrorLike, data?: EventData);
}
type EventRegistry = Record<string, EventData | void>;
type EventOf<R extends EventRegistry, T extends keyof R, Target = unknown> = R[T] extends Event$1 ? R[T] : keyof R[T] extends never ? {
	type: T;
	target: Target;
} : {
	type: T;
	target: Target;
} & R[T];
type Listener<R extends EventRegistry, T extends keyof R, Target = unknown> = (event: EventOf<R, T, Target>) => void;
type Listeners<R extends EventRegistry, Target = unknown> = {
	[T in keyof R]?: Array<Listener<R, T, Target>>;
};
declare class Evented<R extends EventRegistry = EventRegistry> {
	_listeners: Listeners<R>;
	_oneTimeListeners: Listeners<R>;
	_eventedParent?: Evented;
	_eventedParentData?: EventData | (() => EventData);
	/**
	 * Adds a listener to a specified event type.
	 *
	 * @param {string} type The event type to add a listen for.
	 * @param {Function} listener The function to be called when the event is fired.
	 *   The listener function is called with the data object passed to `fire`,
	 *   extended with `target` and `type` properties.
	 * @returns {Object} Returns itself to allow for method chaining.
	 */
	on<T extends keyof R & string>(type: T, listener: Listener<R, T, this>): this;
	/**
	 * Removes a previously registered event listener.
	 *
	 * @param {string} type The event type to remove listeners for.
	 * @param {Function} listener The listener function to remove.
	 * @returns {Object} Returns itself to allow for method chaining.
	 */
	off<T extends keyof R & string>(type: T, listener: Listener<R, T, this>): this;
	/**
	 * Adds a listener that will be called only once to a specified event type.
	 *
	 * The listener will be called first time the event fires after the listener is registered.
	 *
	 * @param {string} type The event type to listen for.
	 * @param {Function} listener (Optional) The function to be called when the event is fired once.
	 *   If not provided, returns a Promise that will be resolved when the event is fired once.
	 * @returns {Object} Returns `this` | Promise.
	 */
	once<T extends keyof R & string>(type: T): Promise<EventOf<R, T, this>>;
	once<T extends keyof R & string>(type: T, listener: Listener<R, T, this>): this;
	fire<T extends keyof R & string, E>(event: Event$1<R, T>): this;
	fire<T extends keyof R & string>(event: ErrorEvent$1): this;
	fire<T extends keyof R & string>(type: T, eventData?: R[T]): this;
	/**
	 * Returns true if this instance of Evented or any forwarded instances of Evented have a listener for the specified type.
	 *
	 * @param {string} type The event type.
	 * @returns {boolean} Returns `true` if there is at least one registered listener for specified event type, `false` otherwise.
	 * @private
	 */
	listens<T extends keyof R & string>(type: T): boolean;
	/**
	 * Bubble all events fired by this instance of Evented to this parent instance of Evented.
	 *
	 * @returns {Object} `this`
	 * @private
	 */
	setEventedParent(parent?: Evented, data?: EventData | (() => EventData)): this;
}
type Position = {
	x: number;
	y: number;
	z: number;
	azimuthal: number;
	polar: number;
};
type Direction = {
	x: number;
	y: number;
	z: number;
};
type LUT = {
	image: {
		width: number;
		height: number;
		data: Uint8Array;
	};
};
declare class Color {
	r: number;
	g: number;
	b: number;
	a: number;
	constructor(r: number, g: number, b: number, a?: number);
	static black: Color;
	static white: Color;
	static transparent: Color;
	static red: Color;
	static blue: Color;
	/**
	 * Parses valid CSS color strings and returns a `Color` instance.
	 * @returns A `Color` instance, or `undefined` if the input is not a valid color string.
	 */
	static parse(input?: string | Color | null): Color | void;
	/**
	 * Returns an RGBA string representing the color value.
	 *
	 * @returns An RGBA string.
	 * @example
	 * var purple = new Color.parse('purple');
	 * purple.toString; // = "rgba(128,0,128,1)"
	 * var translucentGreen = new Color.parse('rgba(26, 207, 26, .73)');
	 * translucentGreen.toString(); // = "rgba(26,207,26,0.73)"
	 */
	toString(): string;
	toRenderColor(lut: LUT | null): RenderColor;
}
declare class RenderColor {
	r: number;
	g: number;
	b: number;
	a: number;
	constructor(lut: LUT | null, r: number, g: number, b: number, a: number);
	/**
	 * Returns an RGBA array of values representing the color, unpremultiplied by A.
	 *
	 * @returns An array of RGBA color values in the range [0, 255].
	 */
	toArray(): [
		number,
		number,
		number,
		number
	];
	/**
	 * Returns a RGBA array of float values representing the color, unpremultiplied by A.
	 *
	 * @returns An array of RGBA color values in the range [0, 1].
	 */
	toArray01(): [
		number,
		number,
		number,
		number
	];
	/**
	 * Returns an RGB array of values representing the color, unpremultiplied by A and multiplied by a scalar.
	 *
	 * @param {number} scale A scale to apply to the unpremultiplied-alpha values.
	 * @returns An array of RGB color values in the range [0, 1].
	 */
	toArray01Scaled(scale: number): [
		number,
		number,
		number
	];
	/**
	 * Returns an RGBA array of values representing the color, premultiplied by A.
	 *
	 * @returns An array of RGBA color values in the range [0, 1].
	 */
	toArray01PremultipliedAlpha(): [
		number,
		number,
		number,
		number
	];
	/**
	 * Returns an RGBA array of values representing the color, unpremultiplied by A, and converted to linear color space.
	 * The color is defined by sRGB primaries, but the sRGB transfer function is reversed to obtain linear energy.
	 *
	 * @returns An array of RGBA color values in the range [0, 1].
	 */
	toArray01Linear(): [
		number,
		number,
		number,
		number
	];
}
export type ColorSpecification = string;
export type FormattedSpecification = string;
export type ResolvedImageSpecification = string;
export type PromoteIdSpecification = {
	[_: string]: string;
} | string;
export type FilterSpecification = [
	"has",
	string
] | [
	"!has",
	string
] | [
	"==",
	string,
	string | number | boolean
] | [
	"!=",
	string,
	string | number | boolean
] | [
	">",
	string,
	string | number | boolean
] | [
	">=",
	string,
	string | number | boolean
] | [
	"<",
	string,
	string | number | boolean
] | [
	"<=",
	string,
	string | number | boolean
] | Array<string | FilterSpecification>;
export type TransitionSpecification = {
	duration?: number;
	delay?: number;
};
export type PropertyFunctionStop<T> = [
	number,
	T
];
export type ZoomAndPropertyFunctionStop<T> = [
	{
		zoom: number;
		value: string | number | boolean;
	},
	T
];
/**
 * @deprecated Use [Expressions](https://docs.mapbox.com/style-spec/reference/expressions/) syntax instead.
*/
export type FunctionSpecification<T> = {
	stops: Array<PropertyFunctionStop<T> | ZoomAndPropertyFunctionStop<T>>;
	base?: number;
	property?: string;
	type?: "identity" | "exponential" | "interval" | "categorical";
	colorSpace?: "rgb" | "lab" | "hcl";
	default?: T;
};
export type CameraFunctionSpecification<T> = {
	type: "exponential";
	stops: Array<[
		number,
		T
	]>;
} | {
	type: "interval";
	stops: Array<[
		number,
		T
	]>;
};
export type SourceFunctionSpecification<T> = {
	type: "exponential";
	stops: Array<[
		number,
		T
	]>;
	property: string;
	default?: T;
} | {
	type: "interval";
	stops: Array<[
		number,
		T
	]>;
	property: string;
	default?: T;
} | {
	type: "categorical";
	stops: Array<[
		string | number | boolean,
		T
	]>;
	property: string;
	default?: T;
} | {
	type: "identity";
	property: string;
	default?: T;
};
export type CompositeFunctionSpecification<T> = {
	type: "exponential";
	stops: Array<[
		{
			zoom: number;
			value: number;
		},
		T
	]>;
	property: string;
	default?: T;
} | {
	type: "interval";
	stops: Array<[
		{
			zoom: number;
			value: number;
		},
		T
	]>;
	property: string;
	default?: T;
} | {
	type: "categorical";
	stops: Array<[
		{
			zoom: number;
			value: string | number | boolean;
		},
		T
	]>;
	property: string;
	default?: T;
};
export type ExpressionSpecification = [
	string,
	...any[]
];
export type PropertyValueSpecification<T> = T | CameraFunctionSpecification<T> | ExpressionSpecification;
export type DataDrivenPropertyValueSpecification<T> = T | FunctionSpecification<T> | CameraFunctionSpecification<T> | SourceFunctionSpecification<T> | CompositeFunctionSpecification<T> | ExpressionSpecification;
export type StyleSpecification = {
	"version": 8;
	"fragment"?: boolean;
	"name"?: string;
	"metadata"?: unknown;
	"center"?: Array<number>;
	"zoom"?: number;
	"bearing"?: number;
	"pitch"?: number;
	"light"?: LightSpecification;
	"lights"?: Array<LightsSpecification>;
	"terrain"?: TerrainSpecification | null | undefined;
	"fog"?: FogSpecification;
	"camera"?: CameraSpecification;
	"color-theme"?: ColorThemeSpecification;
	"imports"?: Array<ImportSpecification>;
	"schema"?: SchemaSpecification;
	"sources": SourcesSpecification;
	"sprite"?: string;
	"glyphs"?: string;
	"transition"?: TransitionSpecification;
	"projection"?: ProjectionSpecification;
	"layers": Array<LayerSpecification>;
	"models"?: ModelsSpecification;
};
export type SourcesSpecification = {
	[_: string]: SourceSpecification;
};
export type ModelsSpecification = {
	[_: string]: ModelSpecification;
};
export type LightSpecification = {
	"anchor"?: PropertyValueSpecification<"map" | "viewport">;
	"position"?: PropertyValueSpecification<[
		number,
		number,
		number
	]>;
	"position-transition"?: TransitionSpecification;
	"color"?: PropertyValueSpecification<ColorSpecification>;
	"color-transition"?: TransitionSpecification;
	"intensity"?: PropertyValueSpecification<number>;
	"intensity-transition"?: TransitionSpecification;
};
export type TerrainSpecification = {
	"source": string;
	"exaggeration"?: PropertyValueSpecification<number>;
	"exaggeration-transition"?: TransitionSpecification;
};
export type FogSpecification = {
	"range"?: PropertyValueSpecification<[
		number,
		number
	]>;
	"range-transition"?: TransitionSpecification;
	"color"?: PropertyValueSpecification<ColorSpecification>;
	"color-transition"?: TransitionSpecification;
	"high-color"?: PropertyValueSpecification<ColorSpecification>;
	"high-color-transition"?: TransitionSpecification;
	"space-color"?: PropertyValueSpecification<ColorSpecification>;
	"space-color-transition"?: TransitionSpecification;
	"horizon-blend"?: PropertyValueSpecification<number>;
	"horizon-blend-transition"?: TransitionSpecification;
	"star-intensity"?: PropertyValueSpecification<number>;
	"star-intensity-transition"?: TransitionSpecification;
	"vertical-range"?: PropertyValueSpecification<[
		number,
		number
	]>;
	"vertical-range-transition"?: TransitionSpecification;
};
export type CameraSpecification = {
	"camera-projection"?: PropertyValueSpecification<"perspective" | "orthographic">;
	"camera-projection-transition"?: TransitionSpecification;
};
export type ColorThemeSpecification = {
	"data"?: ExpressionSpecification;
};
export type ProjectionSpecification = {
	"name": "albers" | "equalEarth" | "equirectangular" | "lambertConformalConic" | "mercator" | "naturalEarth" | "winkelTripel" | "globe";
	"center"?: [
		number,
		number
	];
	"parallels"?: [
		number,
		number
	];
};
export type ImportSpecification = {
	"id": string;
	"url": string;
	"config"?: ConfigSpecification;
	"data"?: StyleSpecification;
};
export type ConfigSpecification = {
	[_: string]: unknown;
};
export type SchemaSpecification = {
	[_: string]: OptionSpecification;
};
export type OptionSpecification = {
	"default": ExpressionSpecification;
	"type"?: "string" | "number" | "boolean" | "color";
	"array"?: boolean;
	"minValue"?: number;
	"maxValue"?: number;
	"stepValue"?: number;
	"values"?: Array<unknown>;
	"metadata"?: unknown;
};
export type VectorSourceSpecification = {
	"type": "vector";
	"url"?: string;
	"tiles"?: Array<string>;
	"bounds"?: [
		number,
		number,
		number,
		number
	];
	"scheme"?: "xyz" | "tms";
	"minzoom"?: number;
	"maxzoom"?: number;
	"attribution"?: string;
	"promoteId"?: PromoteIdSpecification;
	"volatile"?: boolean;
	[_: string]: unknown;
};
export type RasterSourceSpecification = {
	"type": "raster";
	"url"?: string;
	"tiles"?: Array<string>;
	"bounds"?: [
		number,
		number,
		number,
		number
	];
	"minzoom"?: number;
	"maxzoom"?: number;
	"tileSize"?: number;
	"scheme"?: "xyz" | "tms";
	"attribution"?: string;
	"volatile"?: boolean;
	[_: string]: unknown;
};
export type RasterDEMSourceSpecification = {
	"type": "raster-dem";
	"url"?: string;
	"tiles"?: Array<string>;
	"bounds"?: [
		number,
		number,
		number,
		number
	];
	"minzoom"?: number;
	"maxzoom"?: number;
	"tileSize"?: number;
	"attribution"?: string;
	"encoding"?: "terrarium" | "mapbox";
	"volatile"?: boolean;
	[_: string]: unknown;
};
/**
 * @experimental This is experimental and subject to change in future versions.
 */
export type RasterArraySourceSpecification = {
	"type": "raster-array";
	"url"?: string;
	"tiles"?: Array<string>;
	"bounds"?: [
		number,
		number,
		number,
		number
	];
	"minzoom"?: number;
	"maxzoom"?: number;
	"tileSize"?: number;
	"attribution"?: string;
	"rasterLayers"?: unknown;
	"volatile"?: boolean;
	[_: string]: unknown;
};
export type GeoJSONSourceSpecification = {
	"type": "geojson";
	"data"?: GeoJSON.GeoJSON | string;
	"maxzoom"?: number;
	"minzoom"?: number;
	"attribution"?: string;
	"buffer"?: number;
	"filter"?: unknown;
	"tolerance"?: number;
	"cluster"?: boolean;
	"clusterRadius"?: number;
	"clusterMaxZoom"?: number;
	"clusterMinPoints"?: number;
	"clusterProperties"?: unknown;
	"lineMetrics"?: boolean;
	"generateId"?: boolean;
	"promoteId"?: PromoteIdSpecification;
	"dynamic"?: boolean;
};
export type VideoSourceSpecification = {
	"type": "video";
	"urls": Array<string>;
	"coordinates": [
		[
			number,
			number
		],
		[
			number,
			number
		],
		[
			number,
			number
		],
		[
			number,
			number
		]
	];
};
export type ImageSourceSpecification = {
	"type": "image";
	"url"?: string;
	"coordinates": [
		[
			number,
			number
		],
		[
			number,
			number
		],
		[
			number,
			number
		],
		[
			number,
			number
		]
	];
};
export type ModelSourceSpecification = {
	"type": "model" | "batched-model";
	"maxzoom"?: number;
	"minzoom"?: number;
	"tiles"?: Array<string>;
};
export type SourceSpecification = VectorSourceSpecification | RasterSourceSpecification | RasterDEMSourceSpecification | RasterArraySourceSpecification | GeoJSONSourceSpecification | VideoSourceSpecification | ImageSourceSpecification | ModelSourceSpecification;
export type ModelSpecification = string;
export type AmbientLightSpecification = {
	"id": string;
	"properties"?: {
		"color"?: PropertyValueSpecification<ColorSpecification>;
		"color-transition"?: TransitionSpecification;
		"intensity"?: PropertyValueSpecification<number>;
		"intensity-transition"?: TransitionSpecification;
	};
	"type": "ambient";
};
export type DirectionalLightSpecification = {
	"id": string;
	"properties"?: {
		"direction"?: PropertyValueSpecification<[
			number,
			number
		]>;
		"direction-transition"?: TransitionSpecification;
		"color"?: PropertyValueSpecification<ColorSpecification>;
		"color-transition"?: TransitionSpecification;
		"intensity"?: PropertyValueSpecification<number>;
		"intensity-transition"?: TransitionSpecification;
		"cast-shadows"?: ExpressionSpecification;
		"shadow-intensity"?: PropertyValueSpecification<number>;
		"shadow-intensity-transition"?: TransitionSpecification;
	};
	"type": "directional";
};
export type FlatLightSpecification = {
	"id": string;
	"properties"?: {
		"anchor"?: PropertyValueSpecification<"map" | "viewport">;
		"position"?: PropertyValueSpecification<[
			number,
			number,
			number
		]>;
		"position-transition"?: TransitionSpecification;
		"color"?: PropertyValueSpecification<ColorSpecification>;
		"color-transition"?: TransitionSpecification;
		"intensity"?: PropertyValueSpecification<number>;
		"intensity-transition"?: TransitionSpecification;
	};
	"type": "flat";
};
export type LightsSpecification = AmbientLightSpecification | DirectionalLightSpecification | FlatLightSpecification;
export type FillLayerSpecification = {
	"id": string;
	"type": "fill";
	"metadata"?: unknown;
	"source": string;
	"source-layer"?: string;
	"slot"?: string;
	"minzoom"?: number;
	"maxzoom"?: number;
	"filter"?: FilterSpecification;
	"layout"?: {
		"fill-sort-key"?: DataDrivenPropertyValueSpecification<number>;
		"visibility"?: "visible" | "none" | ExpressionSpecification;
	};
	"paint"?: {
		"fill-antialias"?: PropertyValueSpecification<boolean>;
		"fill-opacity"?: DataDrivenPropertyValueSpecification<number>;
		"fill-opacity-transition"?: TransitionSpecification;
		"fill-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"fill-color-transition"?: TransitionSpecification;
		"fill-outline-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"fill-outline-color-transition"?: TransitionSpecification;
		"fill-translate"?: PropertyValueSpecification<[
			number,
			number
		]>;
		"fill-translate-transition"?: TransitionSpecification;
		"fill-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
		"fill-pattern"?: DataDrivenPropertyValueSpecification<ResolvedImageSpecification>;
		"fill-emissive-strength"?: PropertyValueSpecification<number>;
		"fill-emissive-strength-transition"?: TransitionSpecification;
	};
};
/**
 * @deprecated Use `FillLayerSpecification['layout']` instead.
 */
export type FillLayout = FillLayerSpecification["layout"];
/**
 * @deprecated Use `FillLayerSpecification['paint']` instead.
 */
export type FillPaint = FillLayerSpecification["paint"];
export type LineLayerSpecification = {
	"id": string;
	"type": "line";
	"metadata"?: unknown;
	"source": string;
	"source-layer"?: string;
	"slot"?: string;
	"minzoom"?: number;
	"maxzoom"?: number;
	"filter"?: FilterSpecification;
	"layout"?: {
		"line-cap"?: DataDrivenPropertyValueSpecification<"butt" | "round" | "square">;
		"line-join"?: DataDrivenPropertyValueSpecification<"bevel" | "round" | "miter" | "none">;
		"line-miter-limit"?: PropertyValueSpecification<number>;
		"line-round-limit"?: PropertyValueSpecification<number>;
		"line-sort-key"?: DataDrivenPropertyValueSpecification<number>;
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"line-z-offset"?: DataDrivenPropertyValueSpecification<number>;
		"visibility"?: "visible" | "none" | ExpressionSpecification;
	};
	"paint"?: {
		"line-opacity"?: DataDrivenPropertyValueSpecification<number>;
		"line-opacity-transition"?: TransitionSpecification;
		"line-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"line-color-transition"?: TransitionSpecification;
		"line-translate"?: PropertyValueSpecification<[
			number,
			number
		]>;
		"line-translate-transition"?: TransitionSpecification;
		"line-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
		"line-width"?: DataDrivenPropertyValueSpecification<number>;
		"line-width-transition"?: TransitionSpecification;
		"line-gap-width"?: DataDrivenPropertyValueSpecification<number>;
		"line-gap-width-transition"?: TransitionSpecification;
		"line-offset"?: DataDrivenPropertyValueSpecification<number>;
		"line-offset-transition"?: TransitionSpecification;
		"line-blur"?: DataDrivenPropertyValueSpecification<number>;
		"line-blur-transition"?: TransitionSpecification;
		"line-dasharray"?: DataDrivenPropertyValueSpecification<Array<number>>;
		"line-pattern"?: DataDrivenPropertyValueSpecification<ResolvedImageSpecification>;
		"line-gradient"?: ExpressionSpecification;
		"line-trim-offset"?: [
			number,
			number
		];
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"line-trim-fade-range"?: PropertyValueSpecification<[
			number,
			number
		]>;
		"line-trim-color"?: PropertyValueSpecification<ColorSpecification>;
		"line-trim-color-transition"?: TransitionSpecification;
		"line-emissive-strength"?: PropertyValueSpecification<number>;
		"line-emissive-strength-transition"?: TransitionSpecification;
		"line-border-width"?: DataDrivenPropertyValueSpecification<number>;
		"line-border-width-transition"?: TransitionSpecification;
		"line-border-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"line-border-color-transition"?: TransitionSpecification;
		"line-occlusion-opacity"?: PropertyValueSpecification<number>;
		"line-occlusion-opacity-transition"?: TransitionSpecification;
	};
};
/**
 * @deprecated Use `LineLayerSpecification['layout']` instead.
 */
export type LineLayout = LineLayerSpecification["layout"];
/**
 * @deprecated Use `LineLayerSpecification['paint']` instead.
 */
export type LinePaint = LineLayerSpecification["paint"];
export type SymbolLayerSpecification = {
	"id": string;
	"type": "symbol";
	"metadata"?: unknown;
	"source": string;
	"source-layer"?: string;
	"slot"?: string;
	"minzoom"?: number;
	"maxzoom"?: number;
	"filter"?: FilterSpecification;
	"layout"?: {
		"symbol-placement"?: PropertyValueSpecification<"point" | "line" | "line-center">;
		"symbol-spacing"?: PropertyValueSpecification<number>;
		"symbol-avoid-edges"?: PropertyValueSpecification<boolean>;
		"symbol-sort-key"?: DataDrivenPropertyValueSpecification<number>;
		"symbol-z-order"?: PropertyValueSpecification<"auto" | "viewport-y" | "source">;
		"symbol-z-elevate"?: PropertyValueSpecification<boolean>;
		"icon-allow-overlap"?: PropertyValueSpecification<boolean>;
		"icon-ignore-placement"?: PropertyValueSpecification<boolean>;
		"icon-optional"?: PropertyValueSpecification<boolean>;
		"icon-rotation-alignment"?: PropertyValueSpecification<"map" | "viewport" | "auto">;
		"icon-size"?: DataDrivenPropertyValueSpecification<number>;
		"icon-text-fit"?: DataDrivenPropertyValueSpecification<"none" | "width" | "height" | "both">;
		"icon-text-fit-padding"?: DataDrivenPropertyValueSpecification<[
			number,
			number,
			number,
			number
		]>;
		"icon-image"?: DataDrivenPropertyValueSpecification<ResolvedImageSpecification>;
		"icon-rotate"?: DataDrivenPropertyValueSpecification<number>;
		"icon-padding"?: PropertyValueSpecification<number>;
		"icon-keep-upright"?: PropertyValueSpecification<boolean>;
		"icon-offset"?: DataDrivenPropertyValueSpecification<[
			number,
			number
		]>;
		"icon-anchor"?: DataDrivenPropertyValueSpecification<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
		"icon-pitch-alignment"?: PropertyValueSpecification<"map" | "viewport" | "auto">;
		"text-pitch-alignment"?: PropertyValueSpecification<"map" | "viewport" | "auto">;
		"text-rotation-alignment"?: PropertyValueSpecification<"map" | "viewport" | "auto">;
		"text-field"?: DataDrivenPropertyValueSpecification<FormattedSpecification>;
		"text-font"?: DataDrivenPropertyValueSpecification<Array<string>>;
		"text-size"?: DataDrivenPropertyValueSpecification<number>;
		"text-max-width"?: DataDrivenPropertyValueSpecification<number>;
		"text-line-height"?: DataDrivenPropertyValueSpecification<number>;
		"text-letter-spacing"?: DataDrivenPropertyValueSpecification<number>;
		"text-justify"?: DataDrivenPropertyValueSpecification<"auto" | "left" | "center" | "right">;
		"text-radial-offset"?: DataDrivenPropertyValueSpecification<number>;
		"text-variable-anchor"?: PropertyValueSpecification<Array<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">>;
		"text-anchor"?: DataDrivenPropertyValueSpecification<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
		"text-max-angle"?: PropertyValueSpecification<number>;
		"text-writing-mode"?: PropertyValueSpecification<Array<"horizontal" | "vertical">>;
		"text-rotate"?: DataDrivenPropertyValueSpecification<number>;
		"text-padding"?: PropertyValueSpecification<number>;
		"text-keep-upright"?: PropertyValueSpecification<boolean>;
		"text-transform"?: DataDrivenPropertyValueSpecification<"none" | "uppercase" | "lowercase">;
		"text-offset"?: DataDrivenPropertyValueSpecification<[
			number,
			number
		]>;
		"text-allow-overlap"?: PropertyValueSpecification<boolean>;
		"text-ignore-placement"?: PropertyValueSpecification<boolean>;
		"text-optional"?: PropertyValueSpecification<boolean>;
		"visibility"?: "visible" | "none" | ExpressionSpecification;
	};
	"paint"?: {
		"icon-opacity"?: DataDrivenPropertyValueSpecification<number>;
		"icon-opacity-transition"?: TransitionSpecification;
		"icon-occlusion-opacity"?: DataDrivenPropertyValueSpecification<number>;
		"icon-occlusion-opacity-transition"?: TransitionSpecification;
		"icon-emissive-strength"?: DataDrivenPropertyValueSpecification<number>;
		"icon-emissive-strength-transition"?: TransitionSpecification;
		"text-emissive-strength"?: DataDrivenPropertyValueSpecification<number>;
		"text-emissive-strength-transition"?: TransitionSpecification;
		"icon-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"icon-color-transition"?: TransitionSpecification;
		"icon-halo-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"icon-halo-color-transition"?: TransitionSpecification;
		"icon-halo-width"?: DataDrivenPropertyValueSpecification<number>;
		"icon-halo-width-transition"?: TransitionSpecification;
		"icon-halo-blur"?: DataDrivenPropertyValueSpecification<number>;
		"icon-halo-blur-transition"?: TransitionSpecification;
		"icon-translate"?: PropertyValueSpecification<[
			number,
			number
		]>;
		"icon-translate-transition"?: TransitionSpecification;
		"icon-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
		"icon-image-cross-fade"?: DataDrivenPropertyValueSpecification<number>;
		"icon-image-cross-fade-transition"?: TransitionSpecification;
		"text-opacity"?: DataDrivenPropertyValueSpecification<number>;
		"text-opacity-transition"?: TransitionSpecification;
		"text-occlusion-opacity"?: DataDrivenPropertyValueSpecification<number>;
		"text-occlusion-opacity-transition"?: TransitionSpecification;
		"text-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"text-color-transition"?: TransitionSpecification;
		"text-halo-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"text-halo-color-transition"?: TransitionSpecification;
		"text-halo-width"?: DataDrivenPropertyValueSpecification<number>;
		"text-halo-width-transition"?: TransitionSpecification;
		"text-halo-blur"?: DataDrivenPropertyValueSpecification<number>;
		"text-halo-blur-transition"?: TransitionSpecification;
		"text-translate"?: PropertyValueSpecification<[
			number,
			number
		]>;
		"text-translate-transition"?: TransitionSpecification;
		"text-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
		"icon-color-saturation"?: ExpressionSpecification;
		"icon-color-contrast"?: ExpressionSpecification;
		"icon-color-brightness-min"?: ExpressionSpecification;
		"icon-color-brightness-max"?: ExpressionSpecification;
	};
};
/**
 * @deprecated Use `SymbolLayerSpecification['layout']` instead.
 */
export type SymbolLayout = SymbolLayerSpecification["layout"];
/**
 * @deprecated Use `SymbolLayerSpecification['paint']` instead.
 */
export type SymbolPaint = SymbolLayerSpecification["paint"];
export type CircleLayerSpecification = {
	"id": string;
	"type": "circle";
	"metadata"?: unknown;
	"source": string;
	"source-layer"?: string;
	"slot"?: string;
	"minzoom"?: number;
	"maxzoom"?: number;
	"filter"?: FilterSpecification;
	"layout"?: {
		"circle-sort-key"?: DataDrivenPropertyValueSpecification<number>;
		"visibility"?: "visible" | "none" | ExpressionSpecification;
	};
	"paint"?: {
		"circle-radius"?: DataDrivenPropertyValueSpecification<number>;
		"circle-radius-transition"?: TransitionSpecification;
		"circle-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"circle-color-transition"?: TransitionSpecification;
		"circle-blur"?: DataDrivenPropertyValueSpecification<number>;
		"circle-blur-transition"?: TransitionSpecification;
		"circle-opacity"?: DataDrivenPropertyValueSpecification<number>;
		"circle-opacity-transition"?: TransitionSpecification;
		"circle-translate"?: PropertyValueSpecification<[
			number,
			number
		]>;
		"circle-translate-transition"?: TransitionSpecification;
		"circle-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
		"circle-pitch-scale"?: PropertyValueSpecification<"map" | "viewport">;
		"circle-pitch-alignment"?: PropertyValueSpecification<"map" | "viewport">;
		"circle-stroke-width"?: DataDrivenPropertyValueSpecification<number>;
		"circle-stroke-width-transition"?: TransitionSpecification;
		"circle-stroke-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"circle-stroke-color-transition"?: TransitionSpecification;
		"circle-stroke-opacity"?: DataDrivenPropertyValueSpecification<number>;
		"circle-stroke-opacity-transition"?: TransitionSpecification;
		"circle-emissive-strength"?: PropertyValueSpecification<number>;
		"circle-emissive-strength-transition"?: TransitionSpecification;
	};
};
/**
 * @deprecated Use `CircleLayerSpecification['layout']` instead.
 */
export type CircleLayout = CircleLayerSpecification["layout"];
/**
 * @deprecated Use `CircleLayerSpecification['paint']` instead.
 */
export type CirclePaint = CircleLayerSpecification["paint"];
export type HeatmapLayerSpecification = {
	"id": string;
	"type": "heatmap";
	"metadata"?: unknown;
	"source": string;
	"source-layer"?: string;
	"slot"?: string;
	"minzoom"?: number;
	"maxzoom"?: number;
	"filter"?: FilterSpecification;
	"layout"?: {
		"visibility"?: "visible" | "none" | ExpressionSpecification;
	};
	"paint"?: {
		"heatmap-radius"?: DataDrivenPropertyValueSpecification<number>;
		"heatmap-radius-transition"?: TransitionSpecification;
		"heatmap-weight"?: DataDrivenPropertyValueSpecification<number>;
		"heatmap-intensity"?: PropertyValueSpecification<number>;
		"heatmap-intensity-transition"?: TransitionSpecification;
		"heatmap-color"?: ExpressionSpecification;
		"heatmap-opacity"?: PropertyValueSpecification<number>;
		"heatmap-opacity-transition"?: TransitionSpecification;
	};
};
/**
 * @deprecated Use `HeatmapLayerSpecification['layout']` instead.
 */
export type HeatmapLayout = HeatmapLayerSpecification["layout"];
/**
 * @deprecated Use `HeatmapLayerSpecification['paint']` instead.
 */
export type HeatmapPaint = HeatmapLayerSpecification["paint"];
export type FillExtrusionLayerSpecification = {
	"id": string;
	"type": "fill-extrusion";
	"metadata"?: unknown;
	"source": string;
	"source-layer"?: string;
	"slot"?: string;
	"minzoom"?: number;
	"maxzoom"?: number;
	"filter"?: FilterSpecification;
	"layout"?: {
		"visibility"?: "visible" | "none" | ExpressionSpecification;
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"fill-extrusion-edge-radius"?: ExpressionSpecification;
	};
	"paint"?: {
		"fill-extrusion-opacity"?: PropertyValueSpecification<number>;
		"fill-extrusion-opacity-transition"?: TransitionSpecification;
		"fill-extrusion-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"fill-extrusion-color-transition"?: TransitionSpecification;
		"fill-extrusion-translate"?: PropertyValueSpecification<[
			number,
			number
		]>;
		"fill-extrusion-translate-transition"?: TransitionSpecification;
		"fill-extrusion-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
		"fill-extrusion-pattern"?: DataDrivenPropertyValueSpecification<ResolvedImageSpecification>;
		"fill-extrusion-height"?: DataDrivenPropertyValueSpecification<number>;
		"fill-extrusion-height-transition"?: TransitionSpecification;
		"fill-extrusion-base"?: DataDrivenPropertyValueSpecification<number>;
		"fill-extrusion-base-transition"?: TransitionSpecification;
		"fill-extrusion-vertical-gradient"?: PropertyValueSpecification<boolean>;
		"fill-extrusion-ambient-occlusion-intensity"?: PropertyValueSpecification<number>;
		"fill-extrusion-ambient-occlusion-intensity-transition"?: TransitionSpecification;
		"fill-extrusion-ambient-occlusion-radius"?: PropertyValueSpecification<number>;
		"fill-extrusion-ambient-occlusion-radius-transition"?: TransitionSpecification;
		"fill-extrusion-ambient-occlusion-wall-radius"?: PropertyValueSpecification<number>;
		"fill-extrusion-ambient-occlusion-wall-radius-transition"?: TransitionSpecification;
		"fill-extrusion-ambient-occlusion-ground-radius"?: PropertyValueSpecification<number>;
		"fill-extrusion-ambient-occlusion-ground-radius-transition"?: TransitionSpecification;
		"fill-extrusion-ambient-occlusion-ground-attenuation"?: PropertyValueSpecification<number>;
		"fill-extrusion-ambient-occlusion-ground-attenuation-transition"?: TransitionSpecification;
		"fill-extrusion-flood-light-color"?: PropertyValueSpecification<ColorSpecification>;
		"fill-extrusion-flood-light-color-transition"?: TransitionSpecification;
		"fill-extrusion-flood-light-intensity"?: PropertyValueSpecification<number>;
		"fill-extrusion-flood-light-intensity-transition"?: TransitionSpecification;
		"fill-extrusion-flood-light-wall-radius"?: DataDrivenPropertyValueSpecification<number>;
		"fill-extrusion-flood-light-wall-radius-transition"?: TransitionSpecification;
		"fill-extrusion-flood-light-ground-radius"?: DataDrivenPropertyValueSpecification<number>;
		"fill-extrusion-flood-light-ground-radius-transition"?: TransitionSpecification;
		"fill-extrusion-flood-light-ground-attenuation"?: PropertyValueSpecification<number>;
		"fill-extrusion-flood-light-ground-attenuation-transition"?: TransitionSpecification;
		"fill-extrusion-vertical-scale"?: PropertyValueSpecification<number>;
		"fill-extrusion-vertical-scale-transition"?: TransitionSpecification;
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"fill-extrusion-rounded-roof"?: PropertyValueSpecification<boolean>;
		"fill-extrusion-cutoff-fade-range"?: ExpressionSpecification;
		"fill-extrusion-emissive-strength"?: PropertyValueSpecification<number>;
		"fill-extrusion-emissive-strength-transition"?: TransitionSpecification;
	};
};
/**
 * @deprecated Use `FillExtrusionLayerSpecification['layout']` instead.
 */
export type FillExtrusionLayout = FillExtrusionLayerSpecification["layout"];
/**
 * @deprecated Use `FillExtrusionLayerSpecification['paint']` instead.
 */
export type FillExtrusionPaint = FillExtrusionLayerSpecification["paint"];
export type RasterLayerSpecification = {
	"id": string;
	"type": "raster";
	"metadata"?: unknown;
	"source": string;
	"source-layer"?: string;
	"slot"?: string;
	"minzoom"?: number;
	"maxzoom"?: number;
	"filter"?: FilterSpecification;
	"layout"?: {
		"visibility"?: "visible" | "none" | ExpressionSpecification;
	};
	"paint"?: {
		"raster-opacity"?: PropertyValueSpecification<number>;
		"raster-opacity-transition"?: TransitionSpecification;
		"raster-color"?: ExpressionSpecification;
		"raster-color-mix"?: PropertyValueSpecification<[
			number,
			number,
			number,
			number
		]>;
		"raster-color-mix-transition"?: TransitionSpecification;
		"raster-color-range"?: PropertyValueSpecification<[
			number,
			number
		]>;
		"raster-color-range-transition"?: TransitionSpecification;
		"raster-hue-rotate"?: PropertyValueSpecification<number>;
		"raster-hue-rotate-transition"?: TransitionSpecification;
		"raster-brightness-min"?: PropertyValueSpecification<number>;
		"raster-brightness-min-transition"?: TransitionSpecification;
		"raster-brightness-max"?: PropertyValueSpecification<number>;
		"raster-brightness-max-transition"?: TransitionSpecification;
		"raster-saturation"?: PropertyValueSpecification<number>;
		"raster-saturation-transition"?: TransitionSpecification;
		"raster-contrast"?: PropertyValueSpecification<number>;
		"raster-contrast-transition"?: TransitionSpecification;
		"raster-resampling"?: PropertyValueSpecification<"linear" | "nearest">;
		"raster-fade-duration"?: PropertyValueSpecification<number>;
		"raster-emissive-strength"?: PropertyValueSpecification<number>;
		"raster-emissive-strength-transition"?: TransitionSpecification;
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"raster-array-band"?: string;
		"raster-elevation"?: PropertyValueSpecification<number>;
		"raster-elevation-transition"?: TransitionSpecification;
	};
};
/**
 * @deprecated Use `RasterLayerSpecification['layout']` instead.
 */
export type RasterLayout = RasterLayerSpecification["layout"];
/**
 * @deprecated Use `RasterLayerSpecification['paint']` instead.
 */
export type RasterPaint = RasterLayerSpecification["paint"];
export type RasterParticleLayerSpecification = {
	"id": string;
	"type": "raster-particle";
	"metadata"?: unknown;
	"source": string;
	"source-layer"?: string;
	"slot"?: string;
	"minzoom"?: number;
	"maxzoom"?: number;
	"filter"?: FilterSpecification;
	"layout"?: {
		"visibility"?: "visible" | "none" | ExpressionSpecification;
	};
	"paint"?: {
		"raster-particle-array-band"?: string;
		"raster-particle-count"?: number;
		"raster-particle-color"?: ExpressionSpecification;
		"raster-particle-max-speed"?: number;
		"raster-particle-speed-factor"?: PropertyValueSpecification<number>;
		"raster-particle-speed-factor-transition"?: TransitionSpecification;
		"raster-particle-fade-opacity-factor"?: PropertyValueSpecification<number>;
		"raster-particle-fade-opacity-factor-transition"?: TransitionSpecification;
		"raster-particle-reset-rate-factor"?: number;
	};
};
/**
 * @deprecated Use `RasterParticleLayerSpecification['layout']` instead.
 */
export type RasterParticleLayout = RasterParticleLayerSpecification["layout"];
/**
 * @deprecated Use `RasterParticleLayerSpecification['paint']` instead.
 */
export type RasterParticlePaint = RasterParticleLayerSpecification["paint"];
export type HillshadeLayerSpecification = {
	"id": string;
	"type": "hillshade";
	"metadata"?: unknown;
	"source": string;
	"source-layer"?: string;
	"slot"?: string;
	"minzoom"?: number;
	"maxzoom"?: number;
	"filter"?: FilterSpecification;
	"layout"?: {
		"visibility"?: "visible" | "none" | ExpressionSpecification;
	};
	"paint"?: {
		"hillshade-illumination-direction"?: PropertyValueSpecification<number>;
		"hillshade-illumination-anchor"?: PropertyValueSpecification<"map" | "viewport">;
		"hillshade-exaggeration"?: PropertyValueSpecification<number>;
		"hillshade-exaggeration-transition"?: TransitionSpecification;
		"hillshade-shadow-color"?: PropertyValueSpecification<ColorSpecification>;
		"hillshade-shadow-color-transition"?: TransitionSpecification;
		"hillshade-highlight-color"?: PropertyValueSpecification<ColorSpecification>;
		"hillshade-highlight-color-transition"?: TransitionSpecification;
		"hillshade-accent-color"?: PropertyValueSpecification<ColorSpecification>;
		"hillshade-accent-color-transition"?: TransitionSpecification;
		"hillshade-emissive-strength"?: PropertyValueSpecification<number>;
		"hillshade-emissive-strength-transition"?: TransitionSpecification;
	};
};
/**
 * @deprecated Use `HillshadeLayerSpecification['layout']` instead.
 */
export type HillshadeLayout = HillshadeLayerSpecification["layout"];
/**
 * @deprecated Use `HillshadeLayerSpecification['paint']` instead.
 */
export type HillshadePaint = HillshadeLayerSpecification["paint"];
export type ModelLayerSpecification = {
	"id": string;
	"type": "model";
	"metadata"?: unknown;
	"source": string;
	"source-layer"?: string;
	"slot"?: string;
	"minzoom"?: number;
	"maxzoom"?: number;
	"filter"?: FilterSpecification;
	"layout"?: {
		"visibility"?: "visible" | "none" | ExpressionSpecification;
		"model-id"?: DataDrivenPropertyValueSpecification<string>;
	};
	"paint"?: {
		"model-opacity"?: PropertyValueSpecification<number>;
		"model-opacity-transition"?: TransitionSpecification;
		"model-rotation"?: DataDrivenPropertyValueSpecification<[
			number,
			number,
			number
		]>;
		"model-rotation-transition"?: TransitionSpecification;
		"model-scale"?: DataDrivenPropertyValueSpecification<[
			number,
			number,
			number
		]>;
		"model-scale-transition"?: TransitionSpecification;
		"model-translation"?: DataDrivenPropertyValueSpecification<[
			number,
			number,
			number
		]>;
		"model-translation-transition"?: TransitionSpecification;
		"model-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"model-color-transition"?: TransitionSpecification;
		"model-color-mix-intensity"?: DataDrivenPropertyValueSpecification<number>;
		"model-color-mix-intensity-transition"?: TransitionSpecification;
		"model-type"?: "common-3d" | "location-indicator";
		"model-cast-shadows"?: ExpressionSpecification;
		"model-receive-shadows"?: ExpressionSpecification;
		"model-ambient-occlusion-intensity"?: PropertyValueSpecification<number>;
		"model-ambient-occlusion-intensity-transition"?: TransitionSpecification;
		"model-emissive-strength"?: DataDrivenPropertyValueSpecification<number>;
		"model-emissive-strength-transition"?: TransitionSpecification;
		"model-roughness"?: DataDrivenPropertyValueSpecification<number>;
		"model-roughness-transition"?: TransitionSpecification;
		"model-height-based-emissive-strength-multiplier"?: DataDrivenPropertyValueSpecification<[
			number,
			number,
			number,
			number,
			number
		]>;
		"model-height-based-emissive-strength-multiplier-transition"?: TransitionSpecification;
		"model-cutoff-fade-range"?: ExpressionSpecification;
		"model-front-cutoff"?: PropertyValueSpecification<[
			number,
			number,
			number
		]>;
	};
};
/**
 * @deprecated Use `ModelLayerSpecification['layout']` instead.
 */
export type ModelLayout = ModelLayerSpecification["layout"];
/**
 * @deprecated Use `ModelLayerSpecification['paint']` instead.
 */
export type ModelPaint = ModelLayerSpecification["paint"];
export type BackgroundLayerSpecification = {
	"id": string;
	"type": "background";
	"metadata"?: unknown;
	"source"?: never;
	"source-layer"?: never;
	"slot"?: string;
	"minzoom"?: number;
	"maxzoom"?: number;
	"filter"?: never;
	"layout"?: {
		"visibility"?: "visible" | "none" | ExpressionSpecification;
	};
	"paint"?: {
		"background-color"?: PropertyValueSpecification<ColorSpecification>;
		"background-color-transition"?: TransitionSpecification;
		"background-pattern"?: PropertyValueSpecification<ResolvedImageSpecification>;
		"background-opacity"?: PropertyValueSpecification<number>;
		"background-opacity-transition"?: TransitionSpecification;
		"background-emissive-strength"?: PropertyValueSpecification<number>;
		"background-emissive-strength-transition"?: TransitionSpecification;
	};
};
/**
 * @deprecated Use `BackgroundLayerSpecification['layout']` instead.
 */
export type BackgroundLayout = BackgroundLayerSpecification["layout"];
/**
 * @deprecated Use `BackgroundLayerSpecification['paint']` instead.
 */
export type BackgroundPaint = BackgroundLayerSpecification["paint"];
export type SkyLayerSpecification = {
	"id": string;
	"type": "sky";
	"metadata"?: unknown;
	"source"?: never;
	"source-layer"?: never;
	"slot"?: string;
	"minzoom"?: number;
	"maxzoom"?: number;
	"filter"?: never;
	"layout"?: {
		"visibility"?: "visible" | "none" | ExpressionSpecification;
	};
	"paint"?: {
		"sky-type"?: PropertyValueSpecification<"gradient" | "atmosphere">;
		"sky-atmosphere-sun"?: PropertyValueSpecification<[
			number,
			number
		]>;
		"sky-atmosphere-sun-intensity"?: number;
		"sky-gradient-center"?: PropertyValueSpecification<[
			number,
			number
		]>;
		"sky-gradient-radius"?: PropertyValueSpecification<number>;
		"sky-gradient"?: ExpressionSpecification;
		"sky-atmosphere-halo-color"?: ColorSpecification;
		"sky-atmosphere-color"?: ColorSpecification;
		"sky-opacity"?: PropertyValueSpecification<number>;
		"sky-opacity-transition"?: TransitionSpecification;
	};
};
/**
 * @deprecated Use `SkyLayerSpecification['layout']` instead.
 */
export type SkyLayout = SkyLayerSpecification["layout"];
/**
 * @deprecated Use `SkyLayerSpecification['paint']` instead.
 */
export type SkyPaint = SkyLayerSpecification["paint"];
export type SlotLayerSpecification = {
	"id": string;
	"type": "slot";
	"metadata"?: unknown;
	"source"?: never;
	"source-layer"?: never;
	"slot"?: string;
	"minzoom"?: never;
	"maxzoom"?: never;
	"filter"?: never;
	"layout"?: never;
	"paint"?: never;
};
export type ClipLayerSpecification = {
	"id": string;
	"type": "clip";
	"metadata"?: unknown;
	"source": string;
	"source-layer"?: string;
	"slot"?: string;
	"minzoom"?: number;
	"maxzoom"?: number;
	"filter"?: FilterSpecification;
	"layout"?: {
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"clip-layer-types"?: ExpressionSpecification;
	};
	"paint"?: never;
};
/**
 * @deprecated Use `ClipLayerSpecification['layout']` instead.
 */
export type ClipLayout = ClipLayerSpecification["layout"];
export type LayerSpecification = FillLayerSpecification | LineLayerSpecification | SymbolLayerSpecification | CircleLayerSpecification | HeatmapLayerSpecification | FillExtrusionLayerSpecification | RasterLayerSpecification | RasterParticleLayerSpecification | HillshadeLayerSpecification | ModelLayerSpecification | BackgroundLayerSpecification | SkyLayerSpecification | SlotLayerSpecification | ClipLayerSpecification;
export type Layer = Pick<LayerSpecification, "id" | "type" | "source" | "source-layer" | "slot" | "filter" | "layout" | "paint" | "minzoom" | "maxzoom" | "metadata">;
/**
 * @deprecated Use `StyleSpecification` instead.
 */
export type Style = StyleSpecification;
/**
 * @deprecated Use `LayerSpecification` instead.
 */
export type AnyLayer = LayerSpecification;
/**
 * @deprecated Use `FillLayerSpecification` instead.
 */
export type FillLayer = FillLayerSpecification;
/**
 * @deprecated Use `LineLayerSpecification` instead.
 */
export type LineLayer = LineLayerSpecification;
/**
 * @deprecated Use `SymbolLayerSpecification` instead.
 */
export type SymbolLayer = SymbolLayerSpecification;
/**
 * @deprecated Use `CircleLayerSpecification` instead.
 */
export type CircleLayer = CircleLayerSpecification;
/**
 * @deprecated Use `HeatmapLayerSpecification` instead.
 */
export type HeatmapLayer = HeatmapLayerSpecification;
/**
 * @deprecated Use `FillExtrusionLayerSpecification` instead.
 */
export type FillExtrusionLayer = FillExtrusionLayerSpecification;
/**
 * @deprecated Use `RasterLayerSpecification` instead.
 */
export type RasterLayer = RasterLayerSpecification;
/**
 * @deprecated Use `RasterParticleLayerSpecification` instead.
 */
export type RasterParticleLayer = RasterParticleLayerSpecification;
/**
 * @deprecated Use `HillshadeLayerSpecification` instead.
 */
export type HillshadeLayer = HillshadeLayerSpecification;
/**
 * @deprecated Use `ModelLayerSpecification` instead.
 */
export type ModelLayer = ModelLayerSpecification;
/**
 * @deprecated Use `BackgroundLayerSpecification` instead.
 */
export type BackgroundLayer = BackgroundLayerSpecification;
/**
 * @deprecated Use `SkyLayerSpecification` instead.
 */
export type SkyLayer = SkyLayerSpecification;
/**
 * @deprecated Use `SlotLayerSpecification` instead.
 */
export type SlotLayer = SlotLayerSpecification;
/**
 * @deprecated Use `ClipLayerSpecification` instead.
 */
export type ClipLayer = ClipLayerSpecification;
/**
 * @deprecated
 */
export type AnyLayout = FillLayout | LineLayout | SymbolLayout | CircleLayout | HeatmapLayout | FillExtrusionLayout | RasterLayout | RasterParticleLayout | HillshadeLayout | ModelLayout | BackgroundLayout | SkyLayout | ClipLayout;
/**
 * @deprecated
 */
export type AnyPaint = FillPaint | LinePaint | SymbolPaint | CirclePaint | HeatmapPaint | FillExtrusionPaint | RasterPaint | RasterParticlePaint | HillshadePaint | ModelPaint | BackgroundPaint | SkyPaint;
/**
 * @deprecated Use `ExpressionSpecification` instead.
 */
export type Expression = ExpressionSpecification;
/**
 * @deprecated Use `TransitionSpecification` instead.
 */
export type Transition = TransitionSpecification;
/**
 * @deprecated Use `SourceSpecification` instead.
 */
export type AnySourceData = SourceSpecification;
/**
 * @deprecated Use `SourcesSpecification` instead.
 */
export type Sources = SourcesSpecification;
/**
 * @deprecated Use `ProjectionSpecification` instead.
 */
export type Projection = ProjectionSpecification;
declare class EvaluationParameters {
	zoom: number;
	pitch: number | undefined;
	now: number;
	fadeDuration: number;
	transition: TransitionSpecification;
	brightness: number | undefined;
	constructor(zoom: number, options?: any);
	isSupportedScript(str: string): boolean;
}
declare class CanonicalTileID {
	z: number;
	x: number;
	y: number;
	key: number;
	constructor(z: number, x: number, y: number);
	equals(id: CanonicalTileID): boolean;
	url(urls: Array<string>, scheme?: string | null): string;
	toString(): string;
}
declare class UnwrappedTileID {
	wrap: number;
	canonical: CanonicalTileID;
	key: number;
	constructor(wrap: number, canonical: CanonicalTileID);
}
declare class OverscaledTileID {
	overscaledZ: number;
	wrap: number;
	canonical: CanonicalTileID;
	key: number;
	projMatrix: Float32Array;
	expandedProjMatrix: Float32Array;
	constructor(overscaledZ: number, wrap: number, z: number, x: number, y: number);
	equals(id: OverscaledTileID): boolean;
	scaledTo(targetZ: number): OverscaledTileID;
	calculateScaledKey(targetZ: number, withWrap?: boolean): number;
	isChildOf(parent: OverscaledTileID): boolean;
	children(sourceMaxZoom: number): Array<OverscaledTileID>;
	isLessThan(rhs: OverscaledTileID): boolean;
	wrapped(): OverscaledTileID;
	unwrapTo(wrap: number): OverscaledTileID;
	overscaleFactor(): number;
	toUnwrapped(): UnwrappedTileID;
	toString(): string;
}
declare class Collator {
	locale: string | null;
	sensitivity: "base" | "accent" | "case" | "variant";
	collator: Intl.Collator;
	constructor(caseSensitive: boolean, diacriticSensitive: boolean, locale: string | null);
	compare(lhs: string, rhs: string): number;
	resolvedLocale(): string;
}
type ResolvedImageOptions = {
	namePrimary: string;
	nameSecondary: string | null | undefined;
	available: boolean;
};
declare class ResolvedImage {
	namePrimary: string;
	nameSecondary: string | null | undefined;
	available: boolean;
	constructor(options: ResolvedImageOptions);
	toString(): string;
	static fromString(namePrimary: string, nameSecondary?: string | null): ResolvedImage | null;
	serialize(): Array<string>;
}
declare class FormattedSection {
	text: string;
	image: ResolvedImage | null;
	scale: number | null;
	fontStack: string | null;
	textColor: Color | null;
	constructor(text: string, image: ResolvedImage | null, scale: number | null, fontStack: string | null, textColor: Color | null);
}
declare class Formatted {
	sections: Array<FormattedSection>;
	constructor(sections: Array<FormattedSection>);
	static fromString(unformatted: string): Formatted;
	isEmpty(): boolean;
	static factory(text: Formatted | string): Formatted;
	toString(): string;
	serialize(): Array<unknown>;
}
type NullTypeT = {
	kind: "null";
};
type NumberTypeT = {
	kind: "number";
};
type StringTypeT = {
	kind: "string";
};
type BooleanTypeT = {
	kind: "boolean";
};
type ColorTypeT = {
	kind: "color";
};
type ObjectTypeT = {
	kind: "object";
};
type ValueTypeT = {
	kind: "value";
};
type ErrorTypeT = {
	kind: "error";
};
type CollatorTypeT = {
	kind: "collator";
};
type FormattedTypeT = {
	kind: "formatted";
};
type ResolvedImageTypeT = {
	kind: "resolvedImage";
};
type Type = NullTypeT | NumberTypeT | StringTypeT | BooleanTypeT | ColorTypeT | ObjectTypeT | ValueTypeT | // eslint-disable-line no-use-before-define
ArrayType | ErrorTypeT | CollatorTypeT | FormattedTypeT | ResolvedImageTypeT;
type ArrayType = {
	kind: "array";
	itemType: Type;
	N: number | null | undefined;
};
type Value = null | string | boolean | number | Color | Collator | Formatted | ResolvedImage | ReadonlyArray<Value> | {
	readonly [key: string]: Value;
};
type CanonicalTileID$1 = {
	z: number;
	x: number;
	y: number;
};
type FeatureDistanceData = {
	bearing: [
		number,
		number
	];
	center: [
		number,
		number
	];
	scale: number;
};
type FilterExpression = (globalProperties: GlobalProperties, feature: Feature, canonical?: CanonicalTileID$1, featureTileCoord?: Point, featureDistanceData?: FeatureDistanceData) => boolean;
type FeatureFilter = {
	filter: FilterExpression;
	dynamicFilter?: FilterExpression;
	needGeometry: boolean;
	needFeature: boolean;
};
type SerializedExpression = Array<unknown> | Array<string> | string | number | boolean | null;
interface Expression$1 {
	readonly type: Type;
	value?: any;
	evaluate(ctx: EvaluationContext): any;
	eachChild(fn: (arg1: Expression$1) => void): void;
	/**
	  * Statically analyze the expression, attempting to enumerate possible outputs. Returns
	  * false if the complete set of outputs is statically undecidable, otherwise true.
	  */
	outputDefined(): boolean;
	serialize(): SerializedExpression;
}
type ConfigOptionValue = {
	default: Expression$1;
	value?: Expression$1;
	values?: Array<unknown>;
	minValue?: number;
	maxValue?: number;
	stepValue?: number;
	type?: "string" | "number" | "boolean" | "color";
};
type ConfigOptions = Map<string, ConfigOptionValue>;
declare class EvaluationContext {
	globals: GlobalProperties;
	feature: Feature | null | undefined;
	featureState: FeatureState | null | undefined;
	formattedSection: FormattedSection | null | undefined;
	availableImages: Array<string> | null | undefined;
	canonical: null | CanonicalTileID$1;
	featureTileCoord: Point | null | undefined;
	featureDistanceData: FeatureDistanceData | null | undefined;
	scope: string | null | undefined;
	options: ConfigOptions | null | undefined;
	_parseColorCache: {
		[_: string]: Color | null | undefined;
	};
	constructor(scope?: string | null, options?: ConfigOptions | null);
	id(): number | null;
	geometryType(): null | string;
	geometry(): Array<Array<Point>> | null | undefined;
	canonicalID(): null | CanonicalTileID$1;
	properties(): {
		[key: string]: any;
	};
	measureLight(_: string): number;
	distanceFromCenter(): number;
	parseColor(input: string): Color | null | undefined;
	getConfig(id: string): ConfigOptionValue | null | undefined;
}
type InterpolationType = {
	name: "linear";
} | {
	name: "exponential";
	base: number;
} | {
	name: "cubic-bezier";
	controlPoints: [
		number,
		number,
		number,
		number
	];
};
interface Feature {
	readonly type: 1 | 2 | 3 | "Unknown" | "Point" | "LineString" | "Polygon";
	readonly id?: number | null;
	readonly properties: {
		[_: string]: any;
	};
	readonly patterns?: {
		[_: string]: string;
	};
	readonly geometry?: Array<Array<Point>>;
}
type FeatureState = {
	[_: string]: unknown;
};
interface GlobalProperties {
	zoom: number;
	pitch?: number;
	heatmapDensity?: number;
	lineProgress?: number;
	rasterValue?: number;
	rasterParticleSpeed?: number;
	skyRadialProgress?: number;
	readonly isSupportedScript?: (_: string) => boolean;
	accumulated?: Value;
	brightness?: number;
}
type ConstantExpression = {
	kind: "constant";
	isConfigDependent: boolean;
	readonly evaluate: (globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID$1, availableImages?: Array<string>) => any;
};
type SourceExpression = {
	kind: "source";
	isStateDependent: boolean;
	isLightConstant: boolean | null | undefined;
	isConfigDependent: boolean;
	readonly evaluate: (globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID$1, availableImages?: Array<string>, formattedSection?: FormattedSection) => any;
};
type CameraExpression = {
	kind: "camera";
	isStateDependent: boolean;
	isConfigDependent: boolean;
	readonly evaluate: (globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID$1, availableImages?: Array<string>) => any;
	readonly interpolationFactor: (input: number, lower: number, upper: number) => number;
	zoomStops: Array<number>;
	interpolationType: InterpolationType | null | undefined;
};
interface CompositeExpression {
	kind: "composite";
	isStateDependent: boolean;
	isLightConstant: boolean | null | undefined;
	isConfigDependent: boolean;
	readonly evaluate: (globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID$1, availableImages?: Array<string>, formattedSection?: FormattedSection) => any;
	readonly interpolationFactor: (input: number, lower: number, upper: number) => number;
	zoomStops: Array<number>;
	interpolationType: InterpolationType | null | undefined;
}
type StylePropertyExpression = ConstantExpression | SourceExpression | CameraExpression | CompositeExpression;
type ValidationError = {
	message: string;
	identifier?: string | null | undefined;
	line?: number | null | undefined;
};
type ValidationErrors = ReadonlyArray<ValidationError>;
type Validator = (arg1: any) => ValidationErrors;
type ExpressionType = "data-driven" | "color-ramp" | "data-constant" | "constant";
type ExpressionParameters = Array<"zoom" | "feature" | "feature-state" | "heatmap-density" | "line-progress" | "raster-value" | "sky-radial-progress" | "pitch" | "distance-from-center" | "measure-light" | "raster-particle-speed">;
type ExpressionSpecification$1 = {
	interpolated: boolean;
	parameters?: ExpressionParameters;
	relaxZoomRestriction?: boolean;
};
type StylePropertySpecification = {
	type: "number";
	"property-type": ExpressionType;
	expression?: ExpressionSpecification$1;
	transition?: boolean;
	default?: number;
	tokens: never;
} | {
	type: "string";
	"property-type": ExpressionType;
	expression?: ExpressionSpecification$1;
	transition?: boolean;
	default?: string;
	tokens?: boolean;
} | {
	type: "boolean";
	"property-type": ExpressionType;
	expression?: ExpressionSpecification$1;
	transition?: boolean;
	default?: boolean;
	tokens: never;
} | {
	type: "enum";
	"property-type": ExpressionType;
	expression?: ExpressionSpecification$1;
	values: {
		[_: string]: unknown;
	};
	transition?: boolean;
	default?: string;
	tokens: never;
} | {
	type: "color";
	"property-type": ExpressionType;
	expression?: ExpressionSpecification$1;
	transition?: boolean;
	default?: string;
	tokens: never;
	overridable: boolean;
} | {
	type: "array";
	value: "number";
	"property-type": ExpressionType;
	expression?: ExpressionSpecification$1;
	length?: number;
	transition?: boolean;
	default?: Array<number>;
	tokens: never;
} | {
	type: "array";
	value: "string";
	"property-type": ExpressionType;
	expression?: ExpressionSpecification$1;
	length?: number;
	transition?: boolean;
	default?: Array<string>;
	tokens: never;
} | {
	type: "resolvedImage";
	"property-type": ExpressionType;
	expression?: ExpressionSpecification$1;
	transition?: boolean;
	default?: string;
	tokens: never;
};
type TimePoint = number;
interface Property<T, R> {
	specification: StylePropertySpecification;
	possiblyEvaluate(value: PropertyValue<T, R>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): R;
	interpolate(a: R, b: R, t: number): R;
}
declare class PropertyValue<T, R> {
	property: Property<T, R>;
	value: PropertyValueSpecification<T> | undefined;
	expression: StylePropertyExpression;
	constructor(property: Property<T, R>, value?: PropertyValueSpecification<T>, scope?: string | null, options?: ConfigOptions | null);
	isDataDriven(): boolean;
	possiblyEvaluate(parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): R;
}
type TransitionParameters = {
	now: TimePoint;
	transition: TransitionSpecification;
};
declare class TransitionablePropertyValue<T, R> {
	property: Property<T, R>;
	value: PropertyValue<T, R>;
	transition: TransitionSpecification | undefined;
	constructor(property: Property<T, R>, scope?: string | null, options?: ConfigOptions | null);
	transitioned(parameters: TransitionParameters, prior: TransitioningPropertyValue<T, R>): TransitioningPropertyValue<T, R>;
	untransitioned(): TransitioningPropertyValue<T, R>;
}
type TransitionablePropertyValues<Properties> = {
	[Key in keyof Properties]: Properties[Key] extends Property<infer T, infer R> ? TransitionablePropertyValue<T, R> : never;
};
declare class Transitionable<Props extends {
	[Key in keyof Props]: Props[Key];
}> {
	_properties: Properties<Props>;
	_values: TransitionablePropertyValues<Props>;
	_scope: string | null | undefined;
	_options: ConfigOptions | null | undefined;
	isConfigDependent: boolean;
	constructor(properties: Properties<Props>, scope?: string | null, options?: ConfigOptions | null);
	getValue<S extends keyof Props, T>(name: S): PropertyValueSpecification<T> | void;
	setValue<S extends keyof Props, T>(name: S, value?: PropertyValueSpecification<T>): void;
	setTransitionOrValue<P extends PropertyValueSpecifications<Props>>(properties?: P, options?: ConfigOptions): void;
	getTransition<S extends keyof Props>(name: S): TransitionSpecification | void;
	setTransition<S extends keyof Props>(name: S, value?: TransitionSpecification): void;
	serialize(): PropertyValueSpecifications<Props>;
	transitioned(parameters: TransitionParameters, prior: Transitioning<Props>): Transitioning<Props>;
	untransitioned(): Transitioning<Props>;
}
declare class TransitioningPropertyValue<T, R> {
	property: Property<T, R>;
	value: PropertyValue<T, R>;
	prior: TransitioningPropertyValue<T, R> | null | undefined;
	begin: TimePoint;
	end: TimePoint;
	constructor(property: Property<T, R>, value: PropertyValue<T, R>, prior: TransitioningPropertyValue<T, R> | null | undefined, transition: TransitionSpecification, now: TimePoint);
	possiblyEvaluate(parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): R;
}
type TransitioningPropertyValues<Properties> = {
	[Key in keyof Properties]: Properties[Key] extends Property<infer T, infer R> ? TransitioningPropertyValue<T, R> : never;
};
declare class Transitioning<Props extends {
	[Prop in keyof Props]: Props[Prop];
}> {
	_properties: Properties<Props>;
	_values: TransitioningPropertyValues<Props>;
	constructor(properties: Properties<Props>);
	possiblyEvaluate(parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): PossiblyEvaluated<Props>;
	hasTransition(): boolean;
}
type PropertyValues<Props> = {
	[Key in keyof Props]: Props[Key] extends Property<infer T, infer R> ? PropertyValue<T, R> : never;
};
type PropertyValueSpecifications<Props> = {
	[Key in keyof Props]: Props[Key] extends Property<infer T, infer R> ? PropertyValueSpecification<T> : never;
};
declare class Layout<Props extends {
	[Prop in keyof Props]: Props[Prop];
}> {
	_properties: Properties<Props>;
	_values: PropertyValues<Props>;
	_scope: string;
	_options: ConfigOptions | null | undefined;
	isConfigDependent: boolean;
	constructor(properties: Properties<Props>, scope: string, options?: ConfigOptions | null);
	getValue<S extends keyof Props, T>(name: S): PropertyValueSpecification<T> | void;
	setValue<S extends keyof Props>(name: S, value: any): void;
	serialize(): PropertyValueSpecifications<Props>;
	possiblyEvaluate(parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): PossiblyEvaluated<Props>;
}
type PossiblyEvaluatedValue<T> = {
	kind: "constant";
	value: T;
} | SourceExpression | CompositeExpression;
declare class PossiblyEvaluatedPropertyValue<T> {
	property: DataDrivenProperty<T>;
	value: PossiblyEvaluatedValue<T>;
	parameters: EvaluationParameters;
	constructor(property: DataDrivenProperty<T>, value: PossiblyEvaluatedValue<T>, parameters: EvaluationParameters);
	isConstant(): boolean;
	constantOr(value: T): T;
	evaluate(feature: Feature, featureState: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>): T;
}
type PossiblyEvaluatedPropertyValues<Properties> = {
	[Key in keyof Properties]: Properties[Key] extends Property<infer T, infer R> ? R : never;
};
declare class PossiblyEvaluated<Props extends {
	[Prop in keyof Props]: Props[Prop];
}> {
	_properties: Properties<Props>;
	_values: PossiblyEvaluatedPropertyValues<Props>;
	constructor(properties: Properties<Props>);
	get<S extends keyof Props>(name: S): PossiblyEvaluatedPropertyValues<Props>[S];
}
declare class DataConstantProperty<T> implements Property<T, T> {
	specification: StylePropertySpecification;
	constructor(specification: StylePropertySpecification);
	possiblyEvaluate(value: PropertyValue<T, T>, parameters: EvaluationParameters): T;
	interpolate(a: T, b: T, t: number): T;
}
declare class DataDrivenProperty<T> implements Property<T, PossiblyEvaluatedPropertyValue<T>> {
	specification: StylePropertySpecification;
	overrides: {
		[key: string]: any;
	} | null | undefined;
	useIntegerZoom: boolean | null | undefined;
	constructor(specification: StylePropertySpecification, overrides?: {
		[key: string]: any;
	});
	possiblyEvaluate(value: PropertyValue<T, PossiblyEvaluatedPropertyValue<T>>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): PossiblyEvaluatedPropertyValue<T>;
	interpolate(a: PossiblyEvaluatedPropertyValue<T>, b: PossiblyEvaluatedPropertyValue<T>, t: number): PossiblyEvaluatedPropertyValue<T>;
	evaluate(value: PossiblyEvaluatedValue<T>, parameters: EvaluationParameters, feature: Feature, featureState: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>): T;
}
declare class ColorRampProperty implements Property<Color, boolean> {
	specification: StylePropertySpecification;
	constructor(specification: StylePropertySpecification);
	possiblyEvaluate(value: PropertyValue<Color, boolean>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): boolean;
	interpolate(): boolean;
}
declare class DirectionProperty implements Property<[
	number,
	number
], Direction> {
	specification: StylePropertySpecification;
	constructor(specification: StylePropertySpecification);
	possiblyEvaluate(value: PropertyValue<[
		number,
		number
	], Direction>, parameters: EvaluationParameters): Direction;
	interpolate(a: Direction, b: Direction, t: number): Direction;
}
declare class PositionProperty implements Property<[
	number,
	number,
	number
], Position> {
	specification: StylePropertySpecification;
	constructor(specification: StylePropertySpecification);
	possiblyEvaluate(value: PropertyValue<[
		number,
		number,
		number
	], Position>, parameters: EvaluationParameters): Position;
	interpolate(a: Position, b: Position, t: number): Position;
}
declare class Properties<Props extends {
	[Key in keyof Props]: Props[Key];
}> {
	properties: Props;
	defaultPropertyValues: PropertyValues<Props>;
	defaultTransitionablePropertyValues: TransitionablePropertyValues<Props>;
	defaultTransitioningPropertyValues: TransitioningPropertyValues<Props>;
	defaultPossiblyEvaluatedValues: PossiblyEvaluatedPropertyValues<Props>;
	overridableProperties: Array<string>;
	constructor(properties: Props);
}
declare class DictionaryCoder {
	_stringToNumber: {
		[_: string]: number;
	};
	_numberToString: Array<string>;
	constructor(strings: Array<string>);
	encode(string: string): number;
	decode(n: number): string;
}
type Transferable$1 = ArrayBuffer | MessagePort | ImageBitmap;
declare const viewTypes: {
	Int8: Int8ArrayConstructor;
	Uint8: Uint8ArrayConstructor;
	Int16: Int16ArrayConstructor;
	Uint16: Uint16ArrayConstructor;
	Int32: Int32ArrayConstructor;
	Uint32: Uint32ArrayConstructor;
	Float32: Float32ArrayConstructor;
};
type ViewType = keyof typeof viewTypes;
declare class Struct {
	_pos1: number;
	_pos2: number;
	_pos4: number;
	_pos8: number;
	readonly _structArray: StructArray;
	size: number;
	/**
	 * @param {StructArray} structArray The StructArray the struct is stored in
	 * @param {number} index The index of the struct in the StructArray.
	 * @private
	 */
	constructor(structArray: StructArray, index: number);
}
type StructArrayMember = {
	name: string;
	type: ViewType;
	components: number;
	offset: number;
};
interface IStructArrayLayout {
	_refreshViews(): void;
	emplace(...args: number[]): number;
	emplaceBack(...args: number[]): number;
}
type SerializedStructArray = {
	length: number;
	arrayBuffer: ArrayBuffer;
};
declare class StructArray implements IStructArrayLayout {
	capacity: number;
	length: number;
	isTransferred: boolean;
	arrayBuffer: ArrayBuffer;
	int8: Int8Array;
	uint8: Uint8Array;
	int16: Int16Array;
	uint16: Uint16Array;
	int32: Int32Array;
	uint32: Uint32Array;
	float32: Float32Array;
	members: Array<StructArrayMember>;
	bytesPerElement: number;
	constructor();
	/**
	 * Serialize a StructArray instance.  Serializes both the raw data and the
	 * metadata needed to reconstruct the StructArray base class during
	 * deserialization.
	 * @private
	 */
	static serialize(array: StructArray, transferables?: Set<Transferable$1>): SerializedStructArray;
	static deserialize(input: SerializedStructArray): StructArray;
	/**
	 * Resize the array to discard unused capacity.
	 */
	_trim(): void;
	/**
	 * Resets the the length of the array to 0 without de-allocating capacity.
	 */
	clear(): void;
	/**
	 * Resize the array.
	 * If `n` is greater than the current length then additional elements with undefined values are added.
	 * If `n` is less than the current length then the array will be reduced to the first `n` elements.
	 * @param {number} n The new size of the array.
	 */
	resize(n: number): void;
	/**
	 * Indicate a planned increase in size, so that any necessary allocation may
	 * be done once, ahead of time.
	 * @param {number} n The expected size of the array.
	 */
	reserve(n: number): void;
	/**
	 * Create TypedArray views for the current ArrayBuffer.
	 */
	_refreshViews(): void;
	emplace(..._: number[]): number;
	emplaceBack(..._: number[]): number;
	destroy(): void;
}
declare class StructArrayLayout2i4 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	int16: Int16Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number): number;
	emplace(i: number, v0: number, v1: number): number;
}
declare class StructArrayLayout4i8 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	int16: Int16Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number): number;
}
declare class StructArrayLayout5i10 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	int16: Int16Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number): number;
}
declare class StructArrayLayout2i4ub1f12 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	int16: Int16Array;
	float32: Float32Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number): number;
}
declare class StructArrayLayout4f16 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	float32: Float32Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number): number;
}
declare class StructArrayLayout3f12 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	float32: Float32Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number): number;
	emplace(i: number, v0: number, v1: number, v2: number): number;
}
declare class StructArrayLayout6i12 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	int16: Int16Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
}
declare class StructArrayLayout4i4ui4i24 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	int16: Int16Array;
	uint16: Uint16Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number): number;
}
declare class StructArrayLayout3i3f20 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	int16: Int16Array;
	float32: Float32Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
}
declare class StructArrayLayout1ul4 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	uint32: Uint32Array;
	_refreshViews(): void;
	emplaceBack(v0: number): number;
	emplace(i: number, v0: number): number;
}
declare class StructArrayLayout1f4 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	float32: Float32Array;
	_refreshViews(): void;
	emplaceBack(v0: number): number;
	emplace(i: number, v0: number): number;
}
declare class StructArrayLayout2ui4 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	uint16: Uint16Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number): number;
	emplace(i: number, v0: number, v1: number): number;
}
declare class StructArrayLayout5i4f1i1ul2ui40 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	int16: Int16Array;
	float32: Float32Array;
	uint32: Uint32Array;
	uint16: Uint16Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number): number;
}
declare class StructArrayLayout2ub2f12 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	float32: Float32Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number): number;
}
declare class StructArrayLayout3ui6 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	uint16: Uint16Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number): number;
	emplace(i: number, v0: number, v1: number, v2: number): number;
}
declare class StructArrayLayout3i2f2ui3ul3ui2f3ub1ul1i1ub60 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	int16: Int16Array;
	float32: Float32Array;
	uint16: Uint16Array;
	uint32: Uint32Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number, v17: number, v18: number, v19: number, v20: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number, v17: number, v18: number, v19: number, v20: number): number;
}
declare class StructArrayLayout2f9i15ui1ul6f1ub88 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	float32: Float32Array;
	int16: Int16Array;
	uint16: Uint16Array;
	uint32: Uint32Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number, v17: number, v18: number, v19: number, v20: number, v21: number, v22: number, v23: number, v24: number, v25: number, v26: number, v27: number, v28: number, v29: number, v30: number, v31: number, v32: number, v33: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number, v17: number, v18: number, v19: number, v20: number, v21: number, v22: number, v23: number, v24: number, v25: number, v26: number, v27: number, v28: number, v29: number, v30: number, v31: number, v32: number, v33: number): number;
}
declare class StructArrayLayout2f8 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	float32: Float32Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number): number;
	emplace(i: number, v0: number, v1: number): number;
}
declare class StructArrayLayout1ul3ui12 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	uint32: Uint32Array;
	uint16: Uint16Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number): number;
}
declare class StructArrayLayout1ui2 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	uint16: Uint16Array;
	_refreshViews(): void;
	emplaceBack(v0: number): number;
	emplace(i: number, v0: number): number;
}
declare class StructArrayLayout16f64 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	float32: Float32Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number): number;
}
declare class StructArrayLayout4ui3f20 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	uint16: Uint16Array;
	float32: Float32Array;
	_refreshViews(): void;
	emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number): number;
	emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number): number;
}
declare class StructArrayLayout1ub1 extends StructArray implements IStructArrayLayout {
	uint8: Uint8Array;
	_refreshViews(): void;
	emplaceBack(v0: number): number;
	emplace(i: number, v0: number): number;
}
declare class CollisionBoxStruct extends Struct {
	_structArray: CollisionBoxArray;
	get projectedAnchorX(): number;
	get projectedAnchorY(): number;
	get projectedAnchorZ(): number;
	get tileAnchorX(): number;
	get tileAnchorY(): number;
	get x1(): number;
	get y1(): number;
	get x2(): number;
	get y2(): number;
	get padding(): number;
	get featureIndex(): number;
	get sourceLayerIndex(): number;
	get bucketIndex(): number;
}
type CollisionBox = CollisionBoxStruct;
declare class CollisionBoxArray extends StructArrayLayout5i4f1i1ul2ui40 {
	/**
	 * Return the CollisionBoxStruct at the given location in the array.
	 * @param {number} index The index of the element.
	 * @private
	 */
	get(index: number): CollisionBoxStruct;
}
declare class PlacedSymbolStruct extends Struct {
	_structArray: PlacedSymbolArray;
	get projectedAnchorX(): number;
	get projectedAnchorY(): number;
	get projectedAnchorZ(): number;
	get tileAnchorX(): number;
	get tileAnchorY(): number;
	get glyphStartIndex(): number;
	get numGlyphs(): number;
	get vertexStartIndex(): number;
	get lineStartIndex(): number;
	get lineLength(): number;
	get segment(): number;
	get lowerSize(): number;
	get upperSize(): number;
	get lineOffsetX(): number;
	get lineOffsetY(): number;
	get writingMode(): number;
	get placedOrientation(): number;
	set placedOrientation(x: number);
	get hidden(): number;
	set hidden(x: number);
	get crossTileID(): number;
	set crossTileID(x: number);
	get associatedIconIndex(): number;
	get flipState(): number;
	set flipState(x: number);
}
type PlacedSymbol = PlacedSymbolStruct;
declare class PlacedSymbolArray extends StructArrayLayout3i2f2ui3ul3ui2f3ub1ul1i1ub60 {
	/**
	 * Return the PlacedSymbolStruct at the given location in the array.
	 * @param {number} index The index of the element.
	 * @private
	 */
	get(index: number): PlacedSymbolStruct;
}
declare class SymbolInstanceStruct extends Struct {
	_structArray: SymbolInstanceArray;
	get tileAnchorX(): number;
	get tileAnchorY(): number;
	get projectedAnchorX(): number;
	get projectedAnchorY(): number;
	get projectedAnchorZ(): number;
	get rightJustifiedTextSymbolIndex(): number;
	get centerJustifiedTextSymbolIndex(): number;
	get leftJustifiedTextSymbolIndex(): number;
	get verticalPlacedTextSymbolIndex(): number;
	get placedIconSymbolIndex(): number;
	get verticalPlacedIconSymbolIndex(): number;
	get key(): number;
	get textBoxStartIndex(): number;
	get textBoxEndIndex(): number;
	get verticalTextBoxStartIndex(): number;
	get verticalTextBoxEndIndex(): number;
	get iconBoxStartIndex(): number;
	get iconBoxEndIndex(): number;
	get verticalIconBoxStartIndex(): number;
	get verticalIconBoxEndIndex(): number;
	get featureIndex(): number;
	get numHorizontalGlyphVertices(): number;
	get numVerticalGlyphVertices(): number;
	get numIconVertices(): number;
	get numVerticalIconVertices(): number;
	get useRuntimeCollisionCircles(): number;
	get crossTileID(): number;
	set crossTileID(x: number);
	get textOffset0(): number;
	get textOffset1(): number;
	get collisionCircleDiameter(): number;
	get zOffset(): number;
	set zOffset(x: number);
	get occlusionState(): number;
	set occlusionState(x: number);
	get occlusionOpacity(): number;
	set occlusionOpacity(x: number);
	get hasIconTextFit(): number;
}
type SymbolInstance = SymbolInstanceStruct;
declare class SymbolInstanceArray extends StructArrayLayout2f9i15ui1ul6f1ub88 {
	/**
	 * Return the SymbolInstanceStruct at the given location in the array.
	 * @param {number} index The index of the element.
	 * @private
	 */
	get(index: number): SymbolInstanceStruct;
}
declare class GlyphOffsetArray extends StructArrayLayout1f4 {
	getoffsetX(index: number): number;
}
declare class SymbolLineVertexArray extends StructArrayLayout2i4 {
	getx(index: number): number;
	gety(index: number): number;
}
declare class FeatureIndexStruct extends Struct {
	_structArray: FeatureIndexArray;
	get featureIndex(): number;
	get sourceLayerIndex(): number;
	get bucketIndex(): number;
	get layoutVertexArrayOffset(): number;
}
type FeatureIndex = FeatureIndexStruct;
declare class FeatureIndexArray extends StructArrayLayout1ul3ui12 {
	/**
	 * Return the FeatureIndexStruct at the given location in the array.
	 * @param {number} index The index of the element.
	 * @private
	 */
	get(index: number): FeatureIndexStruct;
}
declare class FillExtrusionCentroidArray extends StructArrayLayout2ui4 {
	geta_centroid_pos0(index: number): number;
	geta_centroid_pos1(index: number): number;
}
declare class IndexBuffer {
	context: Context;
	buffer: WebGLBuffer | null | undefined;
	dynamicDraw: boolean;
	id: number;
	static uniqueIdxCounter: number;
	constructor(context: Context, array: StructArrayLayout3ui6 | StructArrayLayout2ui4 | StructArrayLayout1ui2, dynamicDraw?: boolean, noDestroy?: boolean);
	bind(): void;
	updateData(array: StructArray): void;
	destroy(): void;
}
type SerializedFeaturePositionMap = {
	ids: Float64Array;
	positions: Uint32Array;
};
declare class FeaturePositionMap {
	ids: Array<number>;
	uniqueIds: Array<number>;
	positions: Array<number>;
	indexed: boolean;
	constructor();
	add(id: unknown, index: number, start: number, end: number): void;
	eachPosition(id: unknown, fn: (index: number, start: number, end: number) => void): void;
	static serialize(map: FeaturePositionMap, transferables: Set<ArrayBuffer>): SerializedFeaturePositionMap;
	static deserialize(obj: SerializedFeaturePositionMap): FeaturePositionMap;
}
declare class VertexArrayObject {
	context: Context;
	boundProgram: Program$1<any> | null | undefined;
	boundLayoutVertexBuffer: VertexBuffer | null | undefined;
	boundPaintVertexBuffers: Array<VertexBuffer>;
	boundIndexBuffer: IndexBuffer | null | undefined;
	boundVertexOffset: number | null | undefined;
	boundDynamicVertexBuffers: Array<VertexBuffer | null | undefined>;
	vao: any;
	constructor();
	bind(context: Context, program: Program$1<any>, layoutVertexBuffer: VertexBuffer, paintVertexBuffers: Array<VertexBuffer>, indexBuffer: IndexBuffer | null | undefined, vertexOffset: number | null | undefined, dynamicVertexBuffers: Array<VertexBuffer | null | undefined>, vertexAttribDivisorValue?: number | null): void;
	freshBind(program: Program$1<any>, layoutVertexBuffer: VertexBuffer, paintVertexBuffers: Array<VertexBuffer>, indexBuffer: IndexBuffer | null | undefined, vertexOffset: number | null | undefined, dynamicVertexBuffers: Array<VertexBuffer | null | undefined>, vertexAttribDivisorValue?: number | null): void;
	destroy(): void;
}
type Segment = {
	sortKey: number | undefined;
	vertexOffset: number;
	primitiveOffset: number;
	vertexLength: number;
	primitiveLength: number;
	vaos: {
		[_: string]: VertexArrayObject;
	};
};
declare class SegmentVector {
	static MAX_VERTEX_ARRAY_LENGTH: number;
	segments: Array<Segment>;
	constructor(segments?: Array<Segment>);
	_prepareSegment(numVertices: number, vertexArrayLength: number, indexArrayLength: number, sortKey?: number): Segment;
	prepareSegment(numVertices: number, layoutVertexArray: StructArray, indexArray: StructArray, sortKey?: number): Segment;
	get(): Array<Segment>;
	destroy(): void;
	static simpleSegment(vertexOffset: number, primitiveOffset: number, vertexLength: number, primitiveLength: number): SegmentVector;
}
declare class HeatmapBucket extends CircleBucket<HeatmapStyleLayer> {
	layers: Array<HeatmapStyleLayer>;
}
type LUT$1 = {
	image: RGBAImage;
	data: string;
	texture?: Texture3D;
};
type Size = {
	width: number;
	height: number;
};
interface SpritePosition {
	readonly tl: [
		number,
		number
	];
	readonly br: [
		number,
		number
	];
	readonly pixelRatio?: number;
}
type SpritePositions = {
	[_: string]: SpritePosition;
};
type Point$1 = {
	x: number;
	y: number;
};
declare class AlphaImage {
	width: number;
	height: number;
	data: Uint8Array;
	constructor(size: Size, data?: Uint8Array | Uint8ClampedArray);
	resize(size: Size): void;
	clone(): AlphaImage;
	static copy(srcImg: AlphaImage, dstImg: AlphaImage, srcPt: Point$1, dstPt: Point$1, size: Size): void;
}
declare class RGBAImage {
	width: number;
	height: number;
	data: Uint8Array;
	constructor(size: Size, data?: Uint8Array | Uint8ClampedArray);
	resize(size: Size): void;
	replace(data: Uint8Array | Uint8ClampedArray, copy?: boolean): void;
	clone(): RGBAImage;
	static copy(srcImg: RGBAImage | ImageData, dstImg: RGBAImage, srcPt: Point$1, dstPt: Point$1, size: Size, lut: LUT$1 | null, overrideRGBWithWhite?: boolean | null): void;
}
declare class Float32Image {
	width: number;
	height: number;
	data: Float32Array;
	constructor(size: Size, data: Uint8Array | Float32Array);
}
type BlendFuncConstant = WebGL2RenderingContext["ZERO"] | WebGL2RenderingContext["ONE"] | WebGL2RenderingContext["SRC_COLOR"] | WebGL2RenderingContext["ONE_MINUS_SRC_COLOR"] | WebGL2RenderingContext["DST_COLOR"] | WebGL2RenderingContext["ONE_MINUS_DST_COLOR"] | WebGL2RenderingContext["SRC_ALPHA"] | WebGL2RenderingContext["ONE_MINUS_SRC_ALPHA"] | WebGL2RenderingContext["DST_ALPHA"] | WebGL2RenderingContext["ONE_MINUS_DST_ALPHA"] | WebGL2RenderingContext["CONSTANT_COLOR"] | WebGL2RenderingContext["ONE_MINUS_CONSTANT_COLOR"] | WebGL2RenderingContext["CONSTANT_ALPHA"] | WebGL2RenderingContext["ONE_MINUS_CONSTANT_ALPHA"] | WebGL2RenderingContext["BLEND_COLOR"];
type BlendFuncType = [
	BlendFuncConstant,
	BlendFuncConstant,
	BlendFuncConstant,
	BlendFuncConstant
];
type BlendEquationType = WebGL2RenderingContext["FUNC_ADD"] | WebGL2RenderingContext["FUNC_SUBTRACT"] | WebGL2RenderingContext["FUNC_REVERSE_SUBTRACT"] | WebGL2RenderingContext["MIN"] | WebGL2RenderingContext["MAX"];
type ColorMaskType = [
	boolean,
	boolean,
	boolean,
	boolean
];
type CompareFuncType = WebGL2RenderingContext["NEVER"] | WebGL2RenderingContext["LESS"] | WebGL2RenderingContext["EQUAL"] | WebGL2RenderingContext["LEQUAL"] | WebGL2RenderingContext["GREATER"] | WebGL2RenderingContext["NOTEQUAL"] | WebGL2RenderingContext["GEQUAL"] | WebGL2RenderingContext["ALWAYS"];
type DepthMaskType = boolean;
type DepthRangeType = [
	number,
	number
];
type DepthFuncType = CompareFuncType;
type StencilFuncType = {
	func: CompareFuncType;
	ref: number;
	mask: number;
};
type StencilOpConstant = WebGL2RenderingContext["KEEP"] | WebGL2RenderingContext["ZERO"] | WebGL2RenderingContext["REPLACE"] | WebGL2RenderingContext["INCR"] | WebGL2RenderingContext["INCR_WRAP"] | WebGL2RenderingContext["DECR"] | WebGL2RenderingContext["DECR_WRAP"] | WebGL2RenderingContext["INVERT"];
type StencilOpType = [
	StencilOpConstant,
	StencilOpConstant,
	StencilOpConstant
];
type TextureUnitType = number;
type ViewportType = [
	number,
	number,
	number,
	number
];
type StencilTest = {
	func: WebGL2RenderingContext["NEVER"];
	mask: 0;
} | {
	func: WebGL2RenderingContext["LESS"];
	mask: number;
} | {
	func: WebGL2RenderingContext["EQUAL"];
	mask: number;
} | {
	func: WebGL2RenderingContext["LEQUAL"];
	mask: number;
} | {
	func: WebGL2RenderingContext["GREATER"];
	mask: number;
} | {
	func: WebGL2RenderingContext["NOTEQUAL"];
	mask: number;
} | {
	func: WebGL2RenderingContext["GEQUAL"];
	mask: number;
} | {
	func: WebGL2RenderingContext["ALWAYS"];
	mask: 0;
};
type CullFaceModeType = WebGL2RenderingContext["FRONT"] | WebGL2RenderingContext["BACK"] | WebGL2RenderingContext["FRONT_AND_BACK"];
type FrontFaceType = WebGL2RenderingContext["CW"] | WebGL2RenderingContext["CCW"];
type DepthBufferType = "renderbuffer" | "texture";
interface Value$1<T> {
	current: T;
	default: T;
	dirty: boolean;
	get(): T;
	setDefault(): void;
	set(value: T): void;
}
declare class BaseValue<T> implements Value$1<T> {
	gl: WebGL2RenderingContext;
	current: T;
	default: T;
	dirty: boolean;
	constructor(context: Context);
	get(): T;
	set(value: T): void;
	getDefault(): T;
	setDefault(): void;
}
declare class ClearColor extends BaseValue<Color> {
	getDefault(): Color;
	set(v: Color): void;
}
declare class ClearDepth extends BaseValue<number> {
	getDefault(): number;
	set(v: number): void;
}
declare class ClearStencil extends BaseValue<number> {
	getDefault(): number;
	set(v: number): void;
}
declare class ColorMask extends BaseValue<ColorMaskType> {
	getDefault(): ColorMaskType;
	set(v: ColorMaskType): void;
}
declare class DepthMask extends BaseValue<DepthMaskType> {
	getDefault(): DepthMaskType;
	set(v: DepthMaskType): void;
}
declare class StencilMask extends BaseValue<number> {
	getDefault(): number;
	set(v: number): void;
}
declare class StencilFunc extends BaseValue<StencilFuncType> {
	getDefault(): StencilFuncType;
	set(v: StencilFuncType): void;
}
declare class StencilOp extends BaseValue<StencilOpType> {
	getDefault(): StencilOpType;
	set(v: StencilOpType): void;
}
declare class StencilTest$1 extends BaseValue<boolean> {
	getDefault(): boolean;
	set(v: boolean): void;
}
declare class DepthRange extends BaseValue<DepthRangeType> {
	getDefault(): DepthRangeType;
	set(v: DepthRangeType): void;
}
declare class DepthTest extends BaseValue<boolean> {
	getDefault(): boolean;
	set(v: boolean): void;
}
declare class DepthFunc extends BaseValue<DepthFuncType> {
	getDefault(): DepthFuncType;
	set(v: DepthFuncType): void;
}
declare class Blend extends BaseValue<boolean> {
	getDefault(): boolean;
	set(v: boolean): void;
}
declare class BlendFunc extends BaseValue<BlendFuncType> {
	getDefault(): BlendFuncType;
	set(v: BlendFuncType): void;
}
declare class BlendColor extends BaseValue<Color> {
	getDefault(): Color;
	set(v: Color): void;
}
declare class BlendEquation extends BaseValue<BlendEquationType> {
	getDefault(): BlendEquationType;
	set(v: BlendEquationType): void;
}
declare class CullFace extends BaseValue<boolean> {
	getDefault(): boolean;
	set(v: boolean): void;
}
declare class CullFaceSide extends BaseValue<CullFaceModeType> {
	getDefault(): CullFaceModeType;
	set(v: CullFaceModeType): void;
}
declare class FrontFace extends BaseValue<FrontFaceType> {
	getDefault(): FrontFaceType;
	set(v: FrontFaceType): void;
}
declare class Program extends BaseValue<WebGLProgram | null | undefined> {
	getDefault(): WebGLProgram | null;
	set(v?: WebGLProgram | null): void;
}
declare class ActiveTextureUnit extends BaseValue<TextureUnitType> {
	getDefault(): TextureUnitType;
	set(v: TextureUnitType): void;
}
declare class Viewport extends BaseValue<ViewportType> {
	getDefault(): ViewportType;
	set(v: ViewportType): void;
}
declare class BindFramebuffer extends BaseValue<WebGLFramebuffer | null | undefined> {
	getDefault(): WebGLFramebuffer | null;
	set(v?: WebGLFramebuffer | null): void;
}
declare class BindRenderbuffer extends BaseValue<WebGLRenderbuffer | null | undefined> {
	getDefault(): WebGLRenderbuffer | null;
	set(v?: WebGLRenderbuffer | null): void;
}
declare class BindTexture extends BaseValue<WebGLTexture | null | undefined> {
	getDefault(): WebGLTexture | null;
	set(v?: WebGLTexture | null): void;
}
declare class BindVertexBuffer extends BaseValue<WebGLBuffer | null | undefined> {
	getDefault(): WebGLBuffer | null;
	set(v?: WebGLBuffer | null): void;
}
declare class BindElementBuffer extends BaseValue<WebGLBuffer | null | undefined> {
	getDefault(): WebGLBuffer | null;
	set(v?: WebGLBuffer | null): void;
}
declare class BindVertexArrayOES extends BaseValue<any> {
	getDefault(): any;
	set(v: any): void;
}
declare class PixelStoreUnpack extends BaseValue<number> {
	getDefault(): number;
	set(v: number): void;
}
declare class PixelStoreUnpackPremultiplyAlpha extends BaseValue<boolean> {
	getDefault(): boolean;
	set(v: boolean): void;
}
declare class PixelStoreUnpackFlipY extends BaseValue<boolean> {
	getDefault(): boolean;
	set(v: boolean): void;
}
declare class FramebufferAttachment<T> extends BaseValue<T | null | undefined> {
	parent: WebGLFramebuffer;
	context: Context;
	constructor(context: Context, parent: WebGLFramebuffer);
	getDefault(): null;
}
declare class ColorAttachment extends FramebufferAttachment<WebGLTexture> {
	setDirty(): void;
	set(v?: WebGLTexture | null): void;
}
declare class DepthRenderbufferAttachment extends FramebufferAttachment<WebGLRenderbuffer> {
	attachment(): number;
	set(v: WebGLRenderbuffer | null | undefined | WebGLTexture): void;
}
declare class DepthTextureAttachment extends FramebufferAttachment<WebGLTexture> {
	attachment(): number;
	set(v?: WebGLTexture | null): void;
}
declare class Framebuffer {
	context: Context;
	width: number;
	height: number;
	framebuffer: WebGLFramebuffer;
	colorAttachment: ColorAttachment;
	depthAttachment: DepthRenderbufferAttachment | DepthTextureAttachment;
	depthAttachmentType: DepthBufferType | null | undefined;
	constructor(context: Context, width: number, height: number, hasColor: boolean, depthType?: DepthBufferType | null);
	destroy(): void;
}
type PaintProps = {
	"heatmap-radius": DataDrivenProperty<number>;
	"heatmap-weight": DataDrivenProperty<number>;
	"heatmap-intensity": DataConstantProperty<number>;
	"heatmap-color": ColorRampProperty;
	"heatmap-opacity": DataConstantProperty<number>;
};
declare class Ray {
	pos: vec3;
	dir: vec3;
	constructor(pos_: vec3, dir_: vec3);
	intersectsPlane(pt: vec3, normal: vec3, out: vec3): boolean;
	closestPointOnSphere(center: vec3, r: number, out: vec3): boolean;
}
declare class FrustumCorners {
	TL: [
		number,
		number,
		number
	];
	TR: [
		number,
		number,
		number
	];
	BR: [
		number,
		number,
		number
	];
	BL: [
		number,
		number,
		number
	];
	horizon: number;
	constructor(TL_: [
		number,
		number,
		number
	], TR_: [
		number,
		number,
		number
	], BR_: [
		number,
		number,
		number
	], BL_: [
		number,
		number,
		number
	], horizon_: number);
	static fromInvProjectionMatrix(invProj: Array<number>, horizonFromTop: number, viewportHeight: number): FrustumCorners;
}
type Projection$1 = {
	axis: vec3;
	projection: [
		number,
		number
	];
};
type FrustumPoints = [
	vec3,
	vec3,
	vec3,
	vec3,
	vec3,
	vec3,
	vec3,
	vec3
];
type FrustumPlanes = [
	vec4,
	vec4,
	vec4,
	vec4,
	vec4,
	vec4
];
declare class Frustum {
	points: FrustumPoints;
	planes: FrustumPlanes;
	bounds: Aabb;
	projections: Array<Projection$1>;
	frustumEdges: Array<vec3>;
	constructor(points_?: FrustumPoints | null, planes_?: FrustumPlanes | null);
	static fromInvProjectionMatrix(invProj: Float64Array, worldSize: number, zoom: number, zInMeters: boolean): Frustum;
	intersectsPrecise(vertices: Array<vec3>, faces: Array<vec4>, edges: Array<vec3>): number;
}
declare class Aabb {
	min: vec3;
	max: vec3;
	center: vec3;
	static fromPoints(points: Array<vec3>): Aabb;
	static fromTileIdAndHeight(id: UnwrappedTileID, minHeight: number, maxHeight: number): Aabb;
	static applyTransform(aabb: Aabb, transform: mat4): Aabb;
	static applyTransformFast(aabb: Aabb, transform: mat4): Aabb;
	static projectAabbCorners(aabb: Aabb, transform: mat4): Array<vec3>;
	constructor(min_: vec3, max_: vec3);
	quadrant(index: number): Aabb;
	distanceX(point: Array<number>): number;
	distanceY(point: Array<number>): number;
	distanceZ(point: Array<number>): number;
	getCorners(): Array<vec3>;
	intersects(frustum: Frustum): number;
	intersectsFlat(frustum: Frustum): number;
	intersectsPrecise(frustum: Frustum, edgeCasesOnly?: boolean | null): number;
	intersectsPreciseFlat(frustum: Frustum, edgeCasesOnly?: boolean | null): number;
	intersectsAabb(aabb: Aabb): boolean;
	intersectsAabbXY(aabb: Aabb): boolean;
	encapsulate(aabb: Aabb): void;
	encapsulatePoint(point: vec3): void;
	closestPoint(point: vec3): vec3;
}
/**
 * A `LngLat` object represents a given longitude and latitude coordinate, measured in degrees.
 * These coordinates use longitude, latitude coordinate order (as opposed to latitude, longitude)
 * to match the [GeoJSON specification](https://datatracker.ietf.org/doc/html/rfc7946#section-4),
 * which is equivalent to the OGC:CRS84 coordinate reference system.
 *
 * Note that any Mapbox GL method that accepts a `LngLat` object as an argument or option
 * can also accept an `Array` of two numbers and will perform an implicit conversion.
 * This flexible type is documented as {@link LngLatLike}.
 *
 * @param {number} lng Longitude, measured in degrees.
 * @param {number} lat Latitude, measured in degrees.
 * @example
 * const ll = new mapboxgl.LngLat(-123.9749, 40.7736);
 * console.log(ll.lng); // = -123.9749
 * @see [Example: Get coordinates of the mouse pointer](https://www.mapbox.com/mapbox-gl-js/example/mouse-position/)
 * @see [Example: Display a popup](https://www.mapbox.com/mapbox-gl-js/example/popup/)
 * @see [Example: Highlight features within a bounding box](https://www.mapbox.com/mapbox-gl-js/example/using-box-queryrenderedfeatures/)
 * @see [Example: Create a timeline animation](https://www.mapbox.com/mapbox-gl-js/example/timeline-animation/)
 */
export declare class LngLat {
	lng: number;
	lat: number;
	constructor(lng: number, lat: number);
	/**
	 * Returns a new `LngLat` object whose longitude is wrapped to the range (-180, 180).
	 *
	 * @returns {LngLat} The wrapped `LngLat` object.
	 * @example
	 * const ll = new mapboxgl.LngLat(286.0251, 40.7736);
	 * const wrapped = ll.wrap();
	 * console.log(wrapped.lng); // = -73.9749
	 */
	wrap(): LngLat;
	/**
	 * Returns the coordinates represented as an array of two numbers.
	 *
	 * @returns {Array<number>} The coordinates represeted as an array of longitude and latitude.
	 * @example
	 * const ll = new mapboxgl.LngLat(-73.9749, 40.7736);
	 * ll.toArray(); // = [-73.9749, 40.7736]
	 */
	toArray(): [
		number,
		number
	];
	/**
	 * Returns the coordinates represent as a string.
	 *
	 * @returns {string} The coordinates represented as a string of the format `'LngLat(lng, lat)'`.
	 * @example
	 * const ll = new mapboxgl.LngLat(-73.9749, 40.7736);
	 * ll.toString(); // = "LngLat(-73.9749, 40.7736)"
	 */
	toString(): string;
	/**
	 * Returns the approximate distance between a pair of coordinates in meters.
	 * Uses the Haversine Formula (from R.W. Sinnott, "Virtues of the Haversine", Sky and Telescope, vol. 68, no. 2, 1984, p. 159).
	 *
	 * @param {LngLat} lngLat Coordinates to compute the distance to.
	 * @returns {number} Distance in meters between the two coordinates.
	 * @example
	 * const newYork = new mapboxgl.LngLat(-74.0060, 40.7128);
	 * const losAngeles = new mapboxgl.LngLat(-118.2437, 34.0522);
	 * newYork.distanceTo(losAngeles); // = 3935751.690893987, "true distance" using a non-spherical approximation is ~3966km
	 */
	distanceTo(lngLat: LngLat): number;
	/**
	 * Returns a `LngLatBounds` from the coordinates extended by a given `radius`. The returned `LngLatBounds` completely contains the `radius`.
	 *
	 * @param {number} [radius=0] Distance in meters from the coordinates to extend the bounds.
	 * @returns {LngLatBounds} A new `LngLatBounds` object representing the coordinates extended by the `radius`.
	 * @example
	 * const ll = new mapboxgl.LngLat(-73.9749, 40.7736);
	 * ll.toBounds(100).toArray(); // = [[-73.97501862141328, 40.77351016847229], [-73.97478137858673, 40.77368983152771]]
	 */
	toBounds(radius?: number): LngLatBounds;
	toEcef(altitude: number): [
		number,
		number,
		number
	];
	/**
	 * Converts an array of two numbers or an object with `lng` and `lat` or `lon` and `lat` properties
	 * to a `LngLat` object.
	 *
	 * If a `LngLat` object is passed in, the function returns it unchanged.
	 *
	 * @param {LngLatLike} input An array of two numbers or object to convert, or a `LngLat` object to return.
	 * @returns {LngLat} A new `LngLat` object, if a conversion occurred, or the original `LngLat` object.
	 * @example
	 * const arr = [-73.9749, 40.7736];
	 * const ll = mapboxgl.LngLat.convert(arr);
	 * console.log(ll);   // = LngLat {lng: -73.9749, lat: 40.7736}
	 */
	static convert(input: LngLatLike): LngLat;
}
/**
 * A {@link LngLat} object, an array of two numbers representing longitude and latitude,
 * or an object with `lng` and `lat` or `lon` and `lat` properties.
 *
 * @typedef {LngLat | {lng: number, lat: number} | {lon: number, lat: number} | [number, number]} LngLatLike
 * @example
 * const v1 = new mapboxgl.LngLat(-122.420679, 37.772537);
 * const v2 = [-122.420679, 37.772537];
 * const v3 = {lon: -122.420679, lat: 37.772537};
 */
export type LngLatLike = LngLat | {
	lng: number;
	lat: number;
} | {
	lon: number;
	lat: number;
} | [
	number,
	number
];
/**
 * A `LngLatBounds` object represents a geographical bounding box,
 * defined by its southwest and northeast points in [`longitude`](https://docs.mapbox.com/help/glossary/lat-lon/) and [`latitude`](https://docs.mapbox.com/help/glossary/lat-lon/).
 * `Longitude` values are typically set between `-180` to `180`, but can exceed this range if `renderWorldCopies` is set to `true`. `Latitude` values must be within `-85.051129` to `85.051129`.
 *
 * If no arguments are provided to the constructor, a `null` bounding box is created.
 *
 * Note that any Mapbox GL method that accepts a `LngLatBounds` object as an argument or option
 * can also accept an `Array` of two {@link LngLatLike} constructs and will perform an implicit conversion.
 * This flexible type is documented as {@link LngLatBoundsLike}.
 *
 * @param {LngLatLike} [sw] The southwest corner of the bounding box.
 * @param {LngLatLike} [ne] The northeast corner of the bounding box.
 * @example
 * const sw = new mapboxgl.LngLat(-73.9876, 40.7661);
 * const ne = new mapboxgl.LngLat(-73.9397, 40.8002);
 * const llb = new mapboxgl.LngLatBounds(sw, ne);
 */
export declare class LngLatBounds {
	_ne: LngLat;
	_sw: LngLat;
	constructor(sw?: [
		number,
		number,
		number,
		number
	] | [
		LngLatLike,
		LngLatLike
	] | LngLatLike, ne?: LngLatLike);
	/**
	 * Set the northeast corner of the bounding box.
	 *
	 * @param {LngLatLike} ne A {@link LngLatLike} object describing the northeast corner of the bounding box.
	 * @returns {LngLatBounds} Returns itself to allow for method chaining.
	 * @example
	 * const sw = new mapboxgl.LngLat(-73.9876, 40.7661);
	 * const ne = new mapboxgl.LngLat(-73.9397, 40.8002);
	 * const llb = new mapboxgl.LngLatBounds(sw, ne);
	 * llb.setNorthEast([-73.9397, 42.8002]);
	 */
	setNorthEast(ne: LngLatLike): this;
	/**
	 * Set the southwest corner of the bounding box.
	 *
	 * @param {LngLatLike} sw A {@link LngLatLike} object describing the southwest corner of the bounding box.
	 * @returns {LngLatBounds} Returns itself to allow for method chaining.
	 * @example
	 * const sw = new mapboxgl.LngLat(-73.9876, 40.7661);
	 * const ne = new mapboxgl.LngLat(-73.9397, 40.8002);
	 * const llb = new mapboxgl.LngLatBounds(sw, ne);
	 * llb.setSouthWest([-73.9876, 40.2661]);
	 */
	setSouthWest(sw: LngLatLike): this;
	/**
	 * Extend the bounds to include a given LngLatLike or LngLatBoundsLike.
	 *
	 * @param {LngLatLike|LngLatBoundsLike} obj Object to extend to.
	 * @returns {LngLatBounds} Returns itself to allow for method chaining.
	 * @example
	 * const sw = new mapboxgl.LngLat(-73.9876, 40.7661);
	 * const ne = new mapboxgl.LngLat(-73.9397, 40.8002);
	 * const llb = new mapboxgl.LngLatBounds(sw, ne);
	 * llb.extend([-72.9876, 42.2661]);
	 */
	extend(obj: LngLatLike | LngLatBoundsLike): this;
	/**
	 * Returns the geographical coordinate equidistant from the bounding box's corners.
	 *
	 * @returns {LngLat} The bounding box's center.
	 * @example
	 * const llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	 * llb.getCenter(); // = LngLat {lng: -73.96365, lat: 40.78315}
	 */
	getCenter(): LngLat;
	/**
	 * Returns the southwest corner of the bounding box.
	 *
	 * @returns {LngLat} The southwest corner of the bounding box.
	 * @example
	 * const llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	 * llb.getSouthWest(); // LngLat {lng: -73.9876, lat: 40.7661}
	 */
	getSouthWest(): LngLat;
	/**
	 * Returns the northeast corner of the bounding box.
	 *
	 * @returns {LngLat} The northeast corner of the bounding box.
	 * @example
	 * const llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	 * llb.getNorthEast(); // LngLat {lng: -73.9397, lat: 40.8002}
	 */
	getNorthEast(): LngLat;
	/**
	 * Returns the northwest corner of the bounding box.
	 *
	 * @returns {LngLat} The northwest corner of the bounding box.
	 * @example
	 * const llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	 * llb.getNorthWest(); // LngLat {lng: -73.9876, lat: 40.8002}
	 */
	getNorthWest(): LngLat;
	/**
	 * Returns the southeast corner of the bounding box.
	 *
	 * @returns {LngLat} The southeast corner of the bounding box.
	 * @example
	 * const llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	 * llb.getSouthEast(); // LngLat {lng: -73.9397, lat: 40.7661}
	 */
	getSouthEast(): LngLat;
	/**
	 * Returns the west edge of the bounding box.
	 *
	 * @returns {number} The west edge of the bounding box.
	 * @example
	 * const llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	 * llb.getWest(); // -73.9876
	 */
	getWest(): number;
	/**
	 * Returns the south edge of the bounding box.
	 *
	 * @returns {number} The south edge of the bounding box.
	 * @example
	 * const llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	 * llb.getSouth(); // 40.7661
	 */
	getSouth(): number;
	/**
	 * Returns the east edge of the bounding box.
	 *
	 * @returns {number} The east edge of the bounding box.
	 * @example
	 * const llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	 * llb.getEast(); // -73.9397
	 */
	getEast(): number;
	/**
	 * Returns the north edge of the bounding box.
	 *
	 * @returns {number} The north edge of the bounding box.
	 * @example
	 * const llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	 * llb.getNorth(); // 40.8002
	 */
	getNorth(): number;
	/**
	 * Returns the bounding box represented as an array.
	 *
	 * @returns {Array<Array<number>>} The bounding box represented as an array, consisting of the
	 * southwest and northeast coordinates of the bounding represented as arrays of numbers.
	 * @example
	 * const llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	 * llb.toArray(); // = [[-73.9876, 40.7661], [-73.9397, 40.8002]]
	 */
	toArray(): [
		[
			number,
			number
		],
		[
			number,
			number
		]
	];
	/**
	 * Return the bounding box represented as a string.
	 *
	 * @returns {string} The bounding box represents as a string of the format
	 * `'LngLatBounds(LngLat(lng, lat), LngLat(lng, lat))'`.
	 * @example
	 * const llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
	 * llb.toString(); // = "LngLatBounds(LngLat(-73.9876, 40.7661), LngLat(-73.9397, 40.8002))"
	 */
	toString(): string;
	/**
	 * Check if the bounding box is an empty/`null`-type box.
	 *
	 * @returns {boolean} True if bounds have been defined, otherwise false.
	 * @example
	 * const llb = new mapboxgl.LngLatBounds();
	 * llb.isEmpty(); // true
	 * llb.setNorthEast([-73.9876, 40.7661]);
	 * llb.setSouthWest([-73.9397, 40.8002]);
	 * llb.isEmpty(); // false
	 */
	isEmpty(): boolean;
	/**
	* Check if the point is within the bounding box.
	*
	* @param {LngLatLike} lnglat Geographic point to check against.
	* @returns {boolean} True if the point is within the bounding box.
	* @example
	* const llb = new mapboxgl.LngLatBounds(
	*   new mapboxgl.LngLat(-73.9876, 40.7661),
	*   new mapboxgl.LngLat(-73.9397, 40.8002)
	* );
	*
	* const ll = new mapboxgl.LngLat(-73.9567, 40.7789);
	*
	* console.log(llb.contains(ll)); // = true
	*/
	contains(lnglat: LngLatLike): boolean;
	/**
	 * Converts an array to a `LngLatBounds` object.
	 *
	 * If a `LngLatBounds` object is passed in, the function returns it unchanged.
	 *
	 * Internally, the function calls `LngLat#convert` to convert arrays to `LngLat` values.
	 *
	 * @param {LngLatBoundsLike} input An array of two coordinates to convert, or a `LngLatBounds` object to return.
	 * @returns {LngLatBounds} A new `LngLatBounds` object, if a conversion occurred, or the original `LngLatBounds` object.
	 * @example
	 * const arr = [[-73.9876, 40.7661], [-73.9397, 40.8002]];
	 * const llb = mapboxgl.LngLatBounds.convert(arr);
	 * console.log(llb);   // = LngLatBounds {_sw: LngLat {lng: -73.9876, lat: 40.7661}, _ne: LngLat {lng: -73.9397, lat: 40.8002}}
	 */
	static convert(input: LngLatBoundsLike): LngLatBounds;
}
/**
 * A {@link LngLatBounds} object, an array of {@link LngLatLike} objects in [sw, ne] order,
 * or an array of numbers in [west, south, east, north] order.
 *
 * @typedef {LngLatBounds | [LngLatLike, LngLatLike] | [number, number, number, number]} LngLatBoundsLike
 * @example
 * const v1 = new mapboxgl.LngLatBounds(
 *   new mapboxgl.LngLat(-73.9876, 40.7661),
 *   new mapboxgl.LngLat(-73.9397, 40.8002)
 * );
 * const v2 = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
 * const v3 = [[-73.9876, 40.7661], [-73.9397, 40.8002]];
 */
export type LngLatBoundsLike = LngLatBounds | [
	LngLatLike,
	LngLatLike
] | [
	number,
	number,
	number,
	number
];
/**
 * A `MercatorCoordinate` object represents a projected three dimensional position.
 *
 * `MercatorCoordinate` uses the web mercator projection ([EPSG:3857](https://epsg.io/3857)) with slightly different units:
 * - the size of 1 unit is the width of the projected world instead of the "mercator meter"
 * - the origin of the coordinate space is at the north-west corner instead of the middle.
 *
 * For example, `MercatorCoordinate(0, 0, 0)` is the north-west corner of the mercator world and
 * `MercatorCoordinate(1, 1, 0)` is the south-east corner. If you are familiar with
 * [vector tiles](https://github.com/mapbox/vector-tile-spec) it may be helpful to think
 * of the coordinate space as the `0/0/0` tile with an extent of `1`.
 *
 * The `z` dimension of `MercatorCoordinate` is conformal. A cube in the mercator coordinate space would be rendered as a cube.
 *
 * @param {number} x The x component of the position.
 * @param {number} y The y component of the position.
 * @param {number} z The z component of the position.
 * @example
 * const nullIsland = new mapboxgl.MercatorCoordinate(0.5, 0.5, 0);
 *
 * @see [Example: Add a custom style layer](https://www.mapbox.com/mapbox-gl-js/example/custom-style-layer/)
 */
export declare class MercatorCoordinate {
	x: number;
	y: number;
	z: number;
	constructor(x: number, y: number, z?: number);
	/**
	 * Project a `LngLat` to a `MercatorCoordinate`.
	 *
	 * @param {LngLatLike} lngLatLike The location to project.
	 * @param {number} altitude The altitude in meters of the position.
	 * @returns {MercatorCoordinate} The projected mercator coordinate.
	 * @example
	 * const coord = mapboxgl.MercatorCoordinate.fromLngLat({lng: 0, lat: 0}, 0);
	 * console.log(coord); // MercatorCoordinate(0.5, 0.5, 0)
	 */
	static fromLngLat(lngLatLike: LngLatLike, altitude?: number): MercatorCoordinate;
	/**
	 * Returns the `LngLat` for the coordinate.
	 *
	 * @returns {LngLat} The `LngLat` object.
	 * @example
	 * const coord = new mapboxgl.MercatorCoordinate(0.5, 0.5, 0);
	 * const lngLat = coord.toLngLat(); // LngLat(0, 0)
	 */
	toLngLat(): LngLat;
	/**
	 * Returns the altitude in meters of the coordinate.
	 *
	 * @returns {number} The altitude in meters.
	 * @example
	 * const coord = new mapboxgl.MercatorCoordinate(0, 0, 0.02);
	 * coord.toAltitude(); // 6914.281956295339
	 */
	toAltitude(): number;
	/**
	 * Returns the distance of 1 meter in `MercatorCoordinate` units at this latitude.
	 *
	 * For coordinates in real world units using meters, this naturally provides the scale
	 * to transform into `MercatorCoordinate`s.
	 *
	 * @returns {number} Distance of 1 meter in `MercatorCoordinate` units.
	 * @example
	 * // Calculate a new MercatorCoordinate that is 150 meters west of the other coord.
	 * const coord = new mapboxgl.MercatorCoordinate(0.5, 0.25, 0);
	 * const offsetInMeters = 150;
	 * const offsetInMercatorCoordinateUnits = offsetInMeters * coord.meterInMercatorCoordinateUnits();
	 * const westCoord = new mapboxgl.MercatorCoordinate(coord.x - offsetInMercatorCoordinateUnits, coord.y, coord.z);
	 */
	meterInMercatorCoordinateUnits(): number;
}
declare class EdgeInsets {
	top: number;
	bottom: number;
	left: number;
	right: number;
	constructor(top?: number, bottom?: number, left?: number, right?: number);
	/**
	 * Interpolates the inset in-place.
	 * This maintains the current inset value for any inset not present in `target`.
	 *
	 * @private
	 * @param {PaddingOptions | EdgeInsets} start The initial padding options.
	 * @param {PaddingOptions} target The target padding options.
	 * @param {number} t The interpolation variable.
	 * @returns {EdgeInsets} The interpolated edge insets.
	 * @memberof EdgeInsets
	 */
	interpolate(start: PaddingOptions | EdgeInsets, target: PaddingOptions, t: number): EdgeInsets;
	/**
	 * Utility method that computes the new apprent center or vanishing point after applying insets.
	 * This is in pixels and with the top left being (0.0) and +y being downwards.
	 *
	 * @private
	 * @param {number} width The width of the map in pixels.
	 * @param {number} height The height of the map in pixels.
	 * @returns {Point} The apparent center or vanishing point of the map.
	 * @memberof EdgeInsets
	 */
	getCenter(width: number, height: number): Point;
	equals(other: PaddingOptions): boolean;
	clone(): EdgeInsets;
	/**
	 * Returns the current state as json, useful when you want to have a
	 * read-only representation of the inset.
	 *
	 * @private
	 * @returns {PaddingOptions} The current padding options.
	 * @memberof EdgeInsets
	 */
	toJSON(): PaddingOptions;
}
export type PaddingOptions = {
	readonly top?: number;
	readonly bottom?: number;
	readonly right?: number;
	readonly left?: number;
};
declare class MipLevel {
	size: number;
	minimums: Array<number>;
	maximums: Array<number>;
	leaves: Array<number>;
	constructor(size_: number);
	getElevation(x: number, y: number): {
		min: number;
		max: number;
	};
	isLeaf(x: number, y: number): number;
	toIdx(x: number, y: number): number;
}
declare class DemMinMaxQuadTree {
	maximums: Array<number>;
	minimums: Array<number>;
	leaves: Array<number>;
	childOffsets: Array<number>;
	nodeCount: number;
	dem: DEMData;
	_siblingOffset: Array<Array<number>>;
	constructor(dem_: DEMData);
	raycastRoot(minx: number, miny: number, maxx: number, maxy: number, p: vec3, d: vec3, exaggeration?: number): number | null | undefined;
	raycast(rootMinx: number, rootMiny: number, rootMaxx: number, rootMaxy: number, p: vec3, d: vec3, exaggeration?: number): number | null | undefined;
	_addNode(min: number, max: number, leaf: number): number;
	_construct(mips: Array<MipLevel>, x: number, y: number, lvl: number, parentIdx: number): void;
}
type GlyphMetrics = {
	width: number;
	height: number;
	left: number;
	top: number;
	advance: number;
	localGlyph?: boolean;
};
type StyleGlyph = {
	id: number;
	bitmap: AlphaImage;
	metrics: GlyphMetrics;
};
type GlyphRect = {
	x: number;
	y: number;
	w: number;
	h: number;
};
type GlyphPositionMap = {
	[_: number]: GlyphRect;
};
type GlyphPositions = {
	[_: string]: GlyphPositionMap;
};
type StyleImageData = {
	data: RGBAImage;
	version: number;
	hasRenderCallback?: boolean;
	userImage?: StyleImageInterface;
};
type StyleImageMetadata = {
	pixelRatio: number;
	sdf: boolean;
	stretchX?: Array<[
		number,
		number
	]>;
	stretchY?: Array<[
		number,
		number
	]>;
	content?: [
		number,
		number,
		number,
		number
	];
};
type StyleImage = StyleImageData & StyleImageMetadata;
export type StyleImageInterface = {
	width: number;
	height: number;
	data: Uint8Array | Uint8ClampedArray;
	render?: () => boolean;
	onAdd?: (map: Map$1, id: string) => void;
	onRemove?: () => void;
};
type Pattern = {
	bin: PotpackBox;
	position: ImagePosition;
};
declare class ImageManager extends Evented {
	images: {
		[scope: string]: {
			[id: string]: StyleImage;
		};
	};
	updatedImages: {
		[scope: string]: {
			[id: string]: boolean;
		};
	};
	callbackDispatchedThisFrame: {
		[scope: string]: {
			[id: string]: boolean;
		};
	};
	loaded: {
		[scope: string]: boolean;
	};
	requestors: Array<{
		ids: Array<string>;
		scope: string;
		callback: Callback<{
			[id: string]: StyleImage;
		}>;
	}>;
	patterns: {
		[scope: string]: {
			[id: string]: Pattern;
		};
	};
	atlasImage: {
		[scope: string]: RGBAImage;
	};
	atlasTexture: {
		[scope: string]: Texture | null | undefined;
	};
	dirty: boolean;
	constructor();
	createScope(scope: string): void;
	isLoaded(): boolean;
	setLoaded(loaded: boolean, scope: string): void;
	hasImage(id: string, scope: string): boolean;
	getImage(id: string, scope: string): StyleImage | null | undefined;
	addImage(id: string, scope: string, image: StyleImage): void;
	_validate(id: string, image: StyleImage): boolean;
	_validateStretch(stretch: Array<[
		number,
		number
	]> | null | undefined, size: number): boolean;
	_validateContent(content: [
		number,
		number,
		number,
		number
	] | null | undefined, image: StyleImage): boolean;
	updateImage(id: string, scope: string, image: StyleImage): void;
	removeImage(id: string, scope: string): void;
	listImages(scope: string): Array<string>;
	getImages(ids: Array<string>, scope: string, callback: Callback<{
		[_: string]: StyleImage;
	}>): void;
	getUpdatedImages(scope: string): {
		[_: string]: boolean;
	};
	_notify(ids: Array<string>, scope: string, callback: Callback<{
		[_: string]: StyleImage;
	}>): void;
	getPixelSize(scope: string): Size;
	getPattern(id: string, scope: string, lut: LUT$1 | null): ImagePosition | null | undefined;
	bind(context: Context, scope: string): void;
	_updatePatternAtlas(scope: string, lut: LUT$1 | null): void;
	beginFrame(): void;
	dispatchRenderCallbacks(ids: Array<string>, scope: string): void;
}
type Rect = {
	x: number;
	y: number;
	w: number;
	h: number;
};
declare class ImagePosition implements SpritePosition {
	paddedRect: Rect;
	pixelRatio: number;
	version: number;
	stretchY: Array<[
		number,
		number
	]> | null | undefined;
	stretchX: Array<[
		number,
		number
	]> | null | undefined;
	content: [
		number,
		number,
		number,
		number
	] | null | undefined;
	constructor(paddedRect: Rect, { pixelRatio, version, stretchX, stretchY, content, }: StyleImage);
	get tl(): [
		number,
		number
	];
	get br(): [
		number,
		number
	];
	get displaySize(): [
		number,
		number
	];
}
declare class ImageAtlas {
	image: RGBAImage;
	iconPositions: {
		[_: string]: ImagePosition;
	};
	patternPositions: {
		[_: string]: ImagePosition;
	};
	haveRenderCallbacks: Array<string>;
	uploaded: boolean | null | undefined;
	constructor(icons: {
		[_: string]: StyleImage;
	}, patterns: {
		[_: string]: StyleImage;
	}, lut: LUT$1 | null);
	addImages(images: {
		[_: string]: StyleImage;
	}, positions: {
		[_: string]: ImagePosition;
	}, bins: Array<Rect>): void;
	patchUpdatedImages(imageManager: ImageManager, texture: Texture, scope: string): void;
	patchUpdatedImage(position: ImagePosition | null | undefined, image: StyleImage | null | undefined, texture: Texture): void;
}
type DashRange = {
	isDash: boolean;
	left: number;
	right: number;
	zeroLength: boolean;
};
declare class LineAtlas {
	width: number;
	height: number;
	nextRow: number;
	image: AlphaImage;
	positions: SpritePositions;
	uploaded: boolean;
	constructor(width: number, height: number);
	/**
	 * Get a dash line pattern.
	 *
	 * @param {Array<number>} dasharray
	 * @param {string} lineCap the type of line caps to be added to dashes
	 * @returns {Object} position of dash texture in { y, height, width }
	 * @private
	 */
	getDash(dasharray: Array<number>, lineCap: string): SpritePosition;
	trim(): void;
	getKey(dasharray: Array<number>, lineCap: string): string;
	getDashRanges(dasharray: Array<number>, lineAtlasWidth: number, stretch: number): Array<DashRange>;
	addRoundDash(ranges: Array<DashRange>, stretch: number, n: number): void;
	addRegularDash(ranges: Array<DashRange>, capLength: number): void;
	addDash(dasharray: Array<number>, lineCap: string): null | SpritePosition;
}
type ProjectedPoint = {
	x: number;
	y: number;
	z: number;
};
type ElevationScale = {
	metersToTile: number;
};
declare class Projection$2 {
	name: string;
	wrap: boolean;
	conic: boolean;
	requiresDraping: boolean;
	supportsWorldCopies: boolean;
	supportsTerrain: boolean;
	supportsFog: boolean;
	supportsFreeCamera: boolean;
	zAxisUnit: "meters" | "pixels";
	isReprojectedInTileSpace: boolean;
	center: [
		number,
		number
	];
	range: [
		number,
		number
	] | null | undefined;
	parallels: [
		number,
		number
	] | null | undefined;
	unsupportedLayers: Array<string>;
	spec: ProjectionSpecification;
	constructor(options: ProjectionSpecification);
	project(lng: number, lat: number): ProjectedPoint;
	unproject(x: number, y: number): LngLat;
	projectTilePoint(x: number, y: number, _: CanonicalTileID): ProjectedPoint;
	locationPoint(tr: Transform, lngLat: LngLat, terrain?: boolean): Point;
	pixelsPerMeter(lat: number, worldSize: number): number;
	pixelSpaceConversion(lat: number, worldSize: number, interpolationT: number): number;
	farthestPixelDistance(tr: Transform): number;
	pointCoordinate(tr: Transform, x: number, y: number, z: number): MercatorCoordinate;
	pointCoordinate3D(tr: Transform, x: number, y: number): vec3 | null | undefined;
	isPointAboveHorizon(tr: Transform, p: Point): boolean;
	createInversionMatrix(tr: Transform, id: CanonicalTileID): Float32Array;
	createTileMatrix(tr: Transform, worldSize: number, id: UnwrappedTileID): Float64Array;
	upVector(id: CanonicalTileID, x: number, y: number): [
		number,
		number,
		number
	];
	upVectorScale(id: CanonicalTileID, latitude: number, worldSize: number): ElevationScale;
}
type DEMSourceEncoding = "mapbox" | "terrarium";
type WorkerTileResult = {
	buckets: Array<Bucket>;
	imageAtlas: ImageAtlas;
	glyphAtlasImage: AlphaImage;
	lineAtlas: LineAtlas;
	featureIndex: FeatureIndex$1;
	collisionBoxArray: CollisionBoxArray;
	rawTileData?: ArrayBuffer;
	resourceTiming?: Array<PerformanceResourceTiming>;
	brightness: number;
	glyphMap?: {
		[_: string]: {
			glyphs: {
				[_: number]: StyleGlyph | null | undefined;
			};
			ascender?: number;
			descender?: number;
		};
	} | null;
	iconMap?: {
		[_: string]: StyleImage;
	} | null;
	glyphPositions?: GlyphPositions | null;
};
declare class DEMData {
	uid: number;
	stride: number;
	dim: number;
	borderReady: boolean;
	_tree: DemMinMaxQuadTree;
	_modifiedForSources: {
		[key: string]: Array<CanonicalTileID>;
	};
	_timestamp: number;
	pixels: Uint8Array;
	floatView: Float32Array;
	get tree(): DemMinMaxQuadTree;
	constructor(uid: number, data: ImageData, sourceEncoding: DEMSourceEncoding, borderReady?: boolean);
	_buildQuadTree(): void;
	get(x: number, y: number, clampToEdge?: boolean): number;
	set(x: number, y: number, v: number): number;
	static getUnpackVector(encoding: DEMSourceEncoding): [
		number,
		number,
		number,
		number
	];
	_idx(x: number, y: number): number;
	static pack(altitude: number, encoding: DEMSourceEncoding): [
		number,
		number,
		number,
		number
	];
	getPixels(): RGBAImage | Float32Image;
	backfillBorder(borderTile: DEMData, dx: number, dy: number): void;
	onDeserialize(): void;
}
declare class TileCache {
	max: number;
	data: Partial<Record<string | number, Array<{
		value: Tile;
		timeout: number | null | undefined;
	}>>>;
	order: Array<number>;
	onRemove: (element: Tile) => void;
	/**
	 * @param {number} max The max number of permitted values.
	 * @private
	 * @param {Function} onRemove The callback called with items when they expire.
	 */
	constructor(max: number, onRemove: (element: Tile) => void);
	/**
	 * Clear the cache.
	 *
	 * @returns {TileCache} Returns itself to allow for method chaining.
	 * @private
	 */
	reset(): this;
	/**
	 * Add a key, value combination to the cache, trimming its size if this pushes
	 * it over max length.
	 *
	 * @param {OverscaledTileID} tileID lookup key for the item
	 * @param {*} data any value
	 *
	 * @returns {TileCache} Returns itself to allow for method chaining.
	 * @private
	 */
	add(tileID: OverscaledTileID, data: Tile, expiryTimeout?: number): this;
	/**
	 * Determine whether the value attached to `key` is present
	 *
	 * @param {OverscaledTileID} tileID the key to be looked-up
	 * @returns {boolean} whether the cache has this value
	 * @private
	 */
	has(tileID: OverscaledTileID): boolean;
	/**
	 * Get the value attached to a specific key and remove data from cache.
	 * If the key is not found, returns `null`
	 *
	 * @param {OverscaledTileID} tileID the key to look up
	 * @returns {*} the data, or null if it isn't found
	 * @private
	 */
	getAndRemove(tileID: OverscaledTileID): Tile | null | undefined;
	_getAndRemoveByKey(key: number): Tile | null | undefined;
	getByKey(key: number): Tile | null | undefined;
	/**
	 * Get the value attached to a specific key without removing data
	 * from the cache. If the key is not found, returns `null`
	 *
	 * @param {OverscaledTileID} tileID the key to look up
	 * @returns {*} the data, or null if it isn't found
	 * @private
	 */
	get(tileID: OverscaledTileID): Tile | null | undefined;
	/**
	 * Remove a key/value combination from the cache.
	 *
	 * @param {OverscaledTileID} tileID the key for the pair to delete
	 * @param {Tile} value If a value is provided, remove that exact version of the value.
	 * @returns {TileCache} this cache
	 * @private
	 */
	remove(tileID: OverscaledTileID, value?: {
		value: Tile;
		timeout: number | null | undefined;
	} | null): this;
	/**
	 * Change the max size of the cache.
	 *
	 * @param {number} max the max size of the cache
	 * @returns {TileCache} this cache
	 * @private
	 */
	setMaxSize(max: number): TileCache;
	/**
	 * Remove entries that do not pass a filter function. Used for removing
	 * stale tiles from the cache.
	 *
	 * @private
	 * @param {function} filterFn Determines whether the tile is filtered. If the supplied function returns false, the tile will be filtered out.
	 */
	filter(filterFn: (tile: Tile) => boolean): void;
}
declare class ThrottledInvoker {
	_channel: MessageChannel | null | undefined;
	_triggered: boolean;
	_callback: any;
	constructor(callback: any);
	trigger(): void;
	remove(): void;
}
type TaskMetadata = {
	type: "message" | "maybePrepare" | "parseTile";
	isSymbolTile: boolean | null | undefined;
	zoom?: number;
};
type TaskFunction = () => void;
type Task = {
	fn: TaskFunction;
	metadata: TaskMetadata;
	priority: number;
	id: number;
};
declare class Scheduler {
	tasks: {
		[key: number]: Task;
	};
	taskQueue: Array<number>;
	invoker: ThrottledInvoker;
	nextId: number;
	constructor();
	add(fn: TaskFunction, metadata: TaskMetadata): Cancelable | null;
	process(): void;
	pick(): null | number;
	remove(): void;
}
declare class Actor {
	target: any;
	parent: any;
	mapId: number | null | undefined;
	callbacks: {
		number: any;
	};
	name: string;
	cancelCallbacks: {
		number: Cancelable;
	};
	scheduler: Scheduler;
	constructor(target: any, parent: any, mapId?: number | null);
	/**
	 * Sends a message from a main-thread map to a Worker or from a Worker back to
	 * a main-thread map instance.
	 *
	 * @param type The name of the target method to invoke or '[source-type].[source-name].name' for a method on a WorkerSource.
	 * @param targetMapId A particular mapId to which to send this message.
	 * @private
	 */
	send(type: string, data: unknown, callback?: any | null, targetMapId?: string | null, mustQueue?: boolean, callbackMetadata?: any): Cancelable | null | undefined;
	receive(message: any): void;
	processTask(id: number, task: any): void;
	remove(): void;
}
type Class<T> = new (...args: any[]) => T;
type MessageListener = (arg1: {
	data: any;
}) => unknown;
interface WorkerInterface {
	addEventListener(type: "message", listener: MessageListener): void;
	removeEventListener(type: "message", listener: MessageListener): void;
	postMessage(message?: any): void;
	terminate(): void;
}
declare class WorkerPool {
	static workerCount: number;
	active: Partial<Record<number | string, boolean>>;
	workers: Array<WorkerInterface>;
	constructor();
	acquire(mapId: number | string): Array<WorkerInterface>;
	release(mapId: number | string): void;
	isPreloaded(): boolean;
	numActive(): number;
}
declare class Dispatcher {
	workerPool: WorkerPool;
	actors: Array<Actor>;
	currentActor: number;
	id: number;
	ready: boolean;
	static Actor: Class<Actor>;
	constructor(workerPool: WorkerPool, parent: any);
	/**
	 * Broadcast a message to all Workers.
	 * @private
	 */
	broadcast(type: string, data: unknown, cb?: any): void;
	/**
	 * Acquires an actor to dispatch messages to. The actors are distributed in round-robin fashion.
	 * @returns {Actor} An actor object backed by a web worker for processing messages.
	 */
	getActor(): Actor;
	remove(): void;
}
declare class TileBounds {
	bounds: LngLatBounds;
	minzoom: number;
	maxzoom: number;
	constructor(bounds: [
		number,
		number,
		number,
		number
	], minzoom?: number | null, maxzoom?: number | null);
	validateBounds(bounds: [
		number,
		number,
		number,
		number
	]): [
		number,
		number,
		number,
		number
	];
	contains(tileID: CanonicalTileID): boolean;
}
type LoadVectorTileResult = {
	rawData: ArrayBuffer;
	vectorTile?: VectorTile;
	expires?: any;
	cacheControl?: any;
	resourceTiming?: Array<PerformanceResourceTiming>;
};
type LoadVectorDataCallback = Callback<LoadVectorTileResult | null | undefined>;
declare class DedupedRequest {
	entries: {
		[key: string]: any;
	};
	scheduler: Scheduler | null | undefined;
	constructor(scheduler?: Scheduler);
	request(key: string, metadata: any, request: any, callback: LoadVectorDataCallback): () => void;
}
/**
 * A source containing vector tiles in [Mapbox Vector Tile format](https://docs.mapbox.com/vector-tiles/reference/).
 * See the [Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#vector) for detailed documentation of options.
 *
 * @example
 * map.addSource('some id', {
 *     type: 'vector',
 *     url: 'mapbox://mapbox.mapbox-streets-v8'
 * });
 *
 * @example
 * map.addSource('some id', {
 *     type: 'vector',
 *     tiles: ['https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt'],
 *     minzoom: 6,
 *     maxzoom: 14
 * });
 *
 * @example
 * map.getSource('some id').setUrl("mapbox://mapbox.mapbox-streets-v8");
 *
 * @example
 * map.getSource('some id').setTiles(['https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt']);
 * @see [Example: Add a vector tile source](https://docs.mapbox.com/mapbox-gl-js/example/vector-source/)
 * @see [Example: Add a third party vector tile source](https://docs.mapbox.com/mapbox-gl-js/example/third-party/)
 */
export declare class VectorTileSource extends Evented<SourceEvents> implements ISource {
	type: "vector";
	id: string;
	scope: string;
	minzoom: number;
	maxzoom: number;
	url: string;
	scheme: string;
	tileSize: number;
	minTileCacheSize: number | null | undefined;
	maxTileCacheSize: number | null | undefined;
	roundZoom: boolean | undefined;
	attribution: string | undefined;
	mapbox_logo: boolean | undefined;
	promoteId: PromoteIdSpecification | null | undefined;
	_options: VectorSourceSpecification;
	_collectResourceTiming: boolean;
	dispatcher: Dispatcher;
	map: Map$1;
	bounds: [
		number,
		number,
		number,
		number
	] | null | undefined;
	tiles: Array<string>;
	tileBounds: TileBounds;
	reparseOverscaled: boolean | undefined;
	isTileClipped: boolean | undefined;
	_tileJSONRequest: Cancelable | null | undefined;
	_loaded: boolean;
	_tileWorkers: {
		[key: string]: Actor;
	};
	_deduped: DedupedRequest;
	vectorLayerIds: Array<string> | undefined;
	prepare: undefined;
	_clear: undefined;
	constructor(id: string, options: VectorSourceSpecification & {
		collectResourceTiming: boolean;
	}, dispatcher: Dispatcher, eventedParent: Evented);
	load(callback?: Callback<undefined>): void;
	loaded(): boolean;
	hasTile(tileID: OverscaledTileID): boolean;
	onAdd(map: Map$1): void;
	/**
	 * Reloads the source data and re-renders the map.
	 *
	 * @example
	 * map.getSource('source-id').reload();
	 */
	reload(): void;
	/**
	 * Sets the source `tiles` property and re-renders the map.
	 *
	 * @param {string[]} tiles An array of one or more tile source URLs, as in the TileJSON spec.
	 * @returns {VectorTileSource} Returns itself to allow for method chaining.
	 * @example
	 * map.addSource('source-id', {
	 *     type: 'vector',
	 *     tiles: ['https://some_end_point.net/{z}/{x}/{y}.mvt'],
	 *     minzoom: 6,
	 *     maxzoom: 14
	 * });
	 *
	 * // Set the endpoint associated with a vector tile source.
	 * map.getSource('source-id').setTiles(['https://another_end_point.net/{z}/{x}/{y}.mvt']);
	 */
	setTiles(tiles: Array<string>): this;
	/**
	 * Sets the source `url` property and re-renders the map.
	 *
	 * @param {string} url A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<Tileset ID>`.
	 * @returns {VectorTileSource} Returns itself to allow for method chaining.
	 * @example
	 * map.addSource('source-id', {
	 *     type: 'vector',
	 *     url: 'mapbox://mapbox.mapbox-streets-v7'
	 * });
	 *
	 * // Update vector tile source to a new URL endpoint
	 * map.getSource('source-id').setUrl("mapbox://mapbox.mapbox-streets-v8");
	 */
	setUrl(url: string): this;
	onRemove(_: Map$1): void;
	serialize(): VectorSourceSpecification;
	loadTile(tile: Tile, callback: Callback<undefined>): void;
	abortTile(tile: Tile): void;
	unloadTile(tile: Tile, _?: Callback<undefined> | null): void;
	hasTransition(): boolean;
	afterUpdate(): void;
	cancelTileJSONRequest(): void;
}
/**
 * A source containing raster tiles.
 * See the [Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#raster) for detailed documentation of options.
 *
 * @example
 * map.addSource('some id', {
 *     type: 'raster',
 *     url: 'mapbox://mapbox.satellite',
 *     tileSize: 256
 * });
 *
 * @example
 * map.addSource('some id', {
 *     type: 'raster',
 *     tiles: ['https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'],
 *     tileSize: 256
 * });
 *
 * @see [Example: Add a raster tile source](https://docs.mapbox.com/mapbox-gl-js/example/map-tiles/)
 * @see [Example: Add a WMS source](https://docs.mapbox.com/mapbox-gl-js/example/wms/)
 */
export declare class RasterTileSource<T extends "raster" | "raster-dem" | "raster-array" = "raster"> extends Evented<SourceEvents> implements ISource {
	type: T;
	id: string;
	scope: string;
	minzoom: number;
	maxzoom: number;
	url: string;
	scheme: string;
	attribution: string | undefined;
	mapbox_logo: boolean | undefined;
	tileSize: number;
	minTileCacheSize: number | null | undefined;
	maxTileCacheSize: number | null | undefined;
	bounds: [
		number,
		number,
		number,
		number
	] | null | undefined;
	tileBounds: TileBounds;
	roundZoom: boolean | undefined;
	reparseOverscaled: boolean | undefined;
	dispatcher: Dispatcher;
	map: Map$1;
	tiles: Array<string>;
	_loaded: boolean;
	_options: RasterSourceSpecification | RasterDEMSourceSpecification | RasterArraySourceSpecification;
	_tileJSONRequest: Cancelable | null | undefined;
	prepare: undefined;
	afterUpdate: undefined;
	_clear: undefined;
	constructor(id: string, options: RasterSourceSpecification | RasterDEMSourceSpecification | RasterArraySourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
	load(callback?: Callback<undefined>): void;
	loaded(): boolean;
	onAdd(map: Map$1): void;
	/**
	 * Reloads the source data and re-renders the map.
	 *
	 * @example
	 * map.getSource('source-id').reload();
	 */
	reload(): void;
	/**
	 * Sets the source `tiles` property and re-renders the map.
	 *
	 * @param {string[]} tiles An array of one or more tile source URLs, as in the TileJSON spec.
	 * @returns {RasterTileSource} Returns itself to allow for method chaining.
	 * @example
	 * map.addSource('source-id', {
	 *     type: 'raster',
	 *     tiles: ['https://some_end_point.net/{z}/{x}/{y}.png'],
	 *     tileSize: 256
	 * });
	 *
	 * // Set the endpoint associated with a raster tile source.
	 * map.getSource('source-id').setTiles(['https://another_end_point.net/{z}/{x}/{y}.png']);
	 */
	setTiles(tiles: Array<string>): this;
	/**
	 * Sets the source `url` property and re-renders the map.
	 *
	 * @param {string} url A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<Tileset ID>`.
	 * @returns {RasterTileSource} Returns itself to allow for method chaining.
	 * @example
	 * map.addSource('source-id', {
	 *     type: 'raster',
	 *     url: 'mapbox://mapbox.satellite'
	 * });
	 *
	 * // Update raster tile source to a new URL endpoint
	 * map.getSource('source-id').setUrl('mapbox://mapbox.satellite');
	 */
	setUrl(url: string): this;
	onRemove(_: Map$1): void;
	serialize(): RasterSourceSpecification | RasterDEMSourceSpecification;
	hasTile(tileID: OverscaledTileID): boolean;
	loadTile(tile: Tile, callback: Callback<undefined>): void;
	abortTile(tile: Tile, callback?: Callback<undefined>): void;
	unloadTile(tile: Tile, callback?: Callback<undefined>): void;
	hasTransition(): boolean;
	cancelTileJSONRequest(): void;
}
declare class RasterDEMTileSource extends RasterTileSource<"raster-dem"> implements ISource {
	type: "raster-dem";
	encoding: "mapbox" | "terrarium";
	constructor(id: string, options: RasterDEMSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
	loadTile(tile: Tile, callback: Callback<undefined>): void;
	_getNeighboringTiles(tileID: OverscaledTileID): {
		[key: number]: {
			backfilled: boolean;
		};
	};
}
type PaintProps$1 = {
	"raster-opacity": DataConstantProperty<number>;
	"raster-color": ColorRampProperty;
	"raster-color-mix": DataConstantProperty<[
		number,
		number,
		number,
		number
	]>;
	"raster-color-range": DataConstantProperty<[
		number,
		number
	]>;
	"raster-hue-rotate": DataConstantProperty<number>;
	"raster-brightness-min": DataConstantProperty<number>;
	"raster-brightness-max": DataConstantProperty<number>;
	"raster-saturation": DataConstantProperty<number>;
	"raster-contrast": DataConstantProperty<number>;
	"raster-resampling": DataConstantProperty<"linear" | "nearest">;
	"raster-fade-duration": DataConstantProperty<number>;
	"raster-emissive-strength": DataConstantProperty<number>;
	"raster-array-band": DataConstantProperty<string>;
	"raster-elevation": DataConstantProperty<number>;
};
declare class RasterStyleLayer extends StyleLayer {
	_transitionablePaint: Transitionable<PaintProps$1>;
	_transitioningPaint: Transitioning<PaintProps$1>;
	paint: PossiblyEvaluated<PaintProps$1>;
	colorRamp: RGBAImage;
	colorRampTexture: Texture | null | undefined;
	_curRampRange: [
		number,
		number
	];
	constructor(layer: LayerSpecification, scope: string, lut: LUT$1 | null, options?: ConfigOptions | null);
	getProgramIds(): Array<string>;
	hasColorMap(): boolean;
	tileCoverLift(): number;
	isDraped(sourceCache?: SourceCache | null): boolean;
	_handleSpecialPaintPropertyUpdate(name: string): void;
	updateColorRamp(overrideRange?: [
		number,
		number
	] | null): void;
}
type PaintProps$2 = {
	"raster-particle-array-band": DataConstantProperty<string>;
	"raster-particle-count": DataConstantProperty<number>;
	"raster-particle-color": ColorRampProperty;
	"raster-particle-max-speed": DataConstantProperty<number>;
	"raster-particle-speed-factor": DataConstantProperty<number>;
	"raster-particle-fade-opacity-factor": DataConstantProperty<number>;
	"raster-particle-reset-rate-factor": DataConstantProperty<number>;
};
declare class RasterParticleStyleLayer extends StyleLayer {
	paint: PossiblyEvaluated<PaintProps$2>;
	colorRamp: RGBAImage;
	colorRampTexture: Texture | null | undefined;
	tileFramebuffer: Framebuffer;
	particleFramebuffer: Framebuffer;
	particlePositionRGBAImage: RGBAImage;
	previousDrawTimestamp: number | null | undefined;
	lastInvalidatedAt: number;
	constructor(layer: LayerSpecification, scope: string, lut: LUT$1 | null, options?: ConfigOptions | null);
	onRemove(_: Map$1): void;
	hasColorMap(): boolean;
	getProgramIds(): Array<string>;
	hasOffscreenPass(): boolean;
	isDraped(_?: SourceCache | null): boolean;
	_handleSpecialPaintPropertyUpdate(name: string): void;
	_updateColorRamp(): void;
	_invalidateAnimationState(): void;
}
declare class DepthMode {
	func: DepthFuncType;
	mask: DepthMaskType;
	range: DepthRangeType;
	static ReadOnly: boolean;
	static ReadWrite: boolean;
	constructor(depthFunc: DepthFuncType, depthMask: DepthMaskType, depthRange: DepthRangeType);
	static disabled: Readonly<DepthMode>;
}
declare class StencilMode {
	test: StencilTest;
	ref: number;
	mask: number;
	fail: StencilOpConstant;
	depthFail: StencilOpConstant;
	pass: StencilOpConstant;
	constructor(test: StencilTest, ref: number, mask: number, fail: StencilOpConstant, depthFail: StencilOpConstant, pass: StencilOpConstant);
	static disabled: Readonly<StencilMode>;
}
declare class ColorMode {
	blendFunction: BlendFuncType;
	blendColor: Color;
	mask: ColorMaskType;
	blendEquation: BlendEquationType | null | undefined;
	constructor(blendFunction: BlendFuncType, blendColor: Color, mask: ColorMaskType, blendEquation?: BlendEquationType | null);
	static Replace: BlendFuncType;
	static disabled: Readonly<ColorMode>;
	static unblended: Readonly<ColorMode>;
	static alphaBlended: Readonly<ColorMode>;
	static alphaBlendedNonPremultiplied: Readonly<ColorMode>;
	static multiply: Readonly<ColorMode>;
}
type Description = any;
interface ITrackedParameters {
	registerParameter(containerObject: any, scope: Array<string>, name: string, description?: Description | null, changeValueCallback?: any | null): void;
	registerButton(scope: Array<string>, buttonTitle: string, onClick: any): void;
	registerBinding(containerObject: any, scope: Array<string>, name: string, description?: object): void;
	refreshUI(): void;
}
type VisualizeOcclusionMode = "none" | "zPass" | "zTest";
declare class SymbolParams {
	useOcclusionQueries: boolean;
	visualizeOcclusions: VisualizeOcclusionMode;
	occlusionQueryFrameWindow: number;
	occluderSize: number;
	fadeSpeed: number;
	depthOffset: number;
	constructor(tp: ITrackedParameters);
}
declare class AtmosphereBuffer {
	vertexBuffer: VertexBuffer;
	indexBuffer: IndexBuffer;
	segments: SegmentVector;
	constructor(context: Context);
	destroy(): void;
}
type FogState = {
	range: [
		number,
		number
	];
	horizonBlend: number;
	alpha: number;
};
type Props = {
	["range"]: DataConstantProperty<[
		number,
		number
	]>;
	["color"]: DataConstantProperty<Color>;
	["high-color"]: DataConstantProperty<Color>;
	["space-color"]: DataConstantProperty<Color>;
	["horizon-blend"]: DataConstantProperty<number>;
	["star-intensity"]: DataConstantProperty<number>;
	["vertical-range"]: DataConstantProperty<[
		number,
		number
	]>;
};
declare class Fog extends Evented {
	_transitionable: Transitionable<Props>;
	_transitioning: Transitioning<Props>;
	properties: PossiblyEvaluated<Props>;
	_options: FogSpecification;
	scope: string;
	_transform: Transform;
	constructor(fogOptions: FogSpecification | null | undefined, transform: Transform, scope: string, configOptions?: ConfigOptions | null);
	get state(): FogState;
	get(): FogSpecification;
	set(fog?: FogSpecification, configOptions?: ConfigOptions | null, options?: StyleSetterOptions): void;
	getOpacity(pitch: number): number;
	getOpacityAtLatLng(lngLat: LngLat, transform: Transform): number;
	getOpacityForTile(id: OverscaledTileID): [
		number,
		number
	];
	getOpacityForBounds(matrix: mat4, x0: number, y0: number, x1: number, y1: number): [
		number,
		number
	];
	getFovAdjustedRange(fov: number): [
		number,
		number
	];
	isVisibleOnFrustum(frustum: Frustum): boolean;
	updateConfig(configOptions?: ConfigOptions | null): void;
	updateTransitions(parameters: TransitionParameters): void;
	hasTransition(): boolean;
	recalculate(parameters: EvaluationParameters): void;
	_validate(validate: any, value: unknown, options?: {
		validate?: boolean;
	}): boolean;
}
declare class StarsParams {
	starsCount: number;
	sizeMultiplier: number;
	sizeRange: number;
	intensityRange: number;
	constructor();
}
declare class Atmosphere {
	atmosphereBuffer: AtmosphereBuffer | null | undefined;
	starsVx: VertexBuffer | null | undefined;
	starsIdx: IndexBuffer | null | undefined;
	starsSegments: SegmentVector;
	colorModeAlphaBlendedWriteRGB: ColorMode;
	colorModeWriteAlpha: ColorMode;
	updateNeeded: boolean;
	params: StarsParams;
	constructor(painter: Painter);
	update(painter: Painter): void;
	destroy(): void;
	drawAtmosphereGlow(painter: Painter, fog: Fog): void;
	drawStars(painter: Painter, fog: Fog): void;
}
type GridLodSegments = {
	withoutSkirts: SegmentVector;
	withSkirts: SegmentVector;
};
type GridWithLods = {
	vertices: StructArrayLayout2i4;
	indices: StructArrayLayout3ui6;
	segments: Array<GridLodSegments>;
};
declare class GlobeSharedBuffers {
	_poleNorthVertexBuffer: VertexBuffer;
	_poleSouthVertexBuffer: VertexBuffer;
	_texturedPoleNorthVertexBuffer: VertexBuffer;
	_texturedPoleSouthVertexBuffer: VertexBuffer;
	_poleIndexBuffer: IndexBuffer;
	_poleSegments: Array<SegmentVector>;
	_gridBuffer: VertexBuffer;
	_gridIndexBuffer: IndexBuffer;
	_gridSegments: Array<GridLodSegments>;
	constructor(context: Context);
	destroy(): void;
	_fillGridMeshWithLods(longitudinalCellsCount: number, latitudinalLods: number[]): GridWithLods;
	_createGrid(context: Context): void;
	_createPoles(context: Context): void;
	getGridBuffers(latitudinalLod: number, withSkirts: boolean): [
		VertexBuffer,
		IndexBuffer,
		SegmentVector
	];
	getPoleBuffers(z: number, textured: boolean): [
		VertexBuffer,
		VertexBuffer,
		IndexBuffer,
		SegmentVector
	];
}
type UniformValues<Us> = {
	[Key in keyof Us]: Us[Key] extends IUniform<infer V> ? V : never;
};
interface IUniform<T> {
	gl: WebGL2RenderingContext;
	location: WebGLUniformLocation | null | undefined;
	current: T;
	initialized: boolean;
	fetchUniformLocation(program: WebGLProgram, name: string): boolean;
	set(program: WebGLProgram, name: string, v: T): void;
}
declare class Uniform<T> implements IUniform<T> {
	gl: WebGL2RenderingContext;
	location: WebGLUniformLocation | null | undefined;
	current: T;
	initialized: boolean;
	constructor(context: Context);
	fetchUniformLocation(program: WebGLProgram, name: string): boolean;
	set(_program: WebGLProgram, _name: string, _v: T): void;
}
declare class Uniform1i extends Uniform<number> implements IUniform<number> {
	constructor(context: Context);
	set(program: WebGLProgram, name: string, v: number): void;
}
declare class Uniform1f extends Uniform<number> implements IUniform<number> {
	constructor(context: Context);
	set(program: WebGLProgram, name: string, v: number): void;
}
declare class Uniform2f extends Uniform<[
	number,
	number
]> implements IUniform<[
	number,
	number
]> {
	constructor(context: Context);
	set(program: WebGLProgram, name: string, v: [
		number,
		number
	]): void;
}
declare class Uniform3f extends Uniform<[
	number,
	number,
	number
]> implements IUniform<[
	number,
	number,
	number
]> {
	constructor(context: Context);
	set(program: WebGLProgram, name: string, v: [
		number,
		number,
		number
	]): void;
}
declare class Uniform4f extends Uniform<[
	number,
	number,
	number,
	number
]> implements IUniform<[
	number,
	number,
	number,
	number
]> {
	constructor(context: Context);
	set(program: WebGLProgram, name: string, v: [
		number,
		number,
		number,
		number
	]): void;
}
declare class UniformMatrix4f extends Uniform<Float32Array> implements IUniform<Float32Array> {
	constructor(context: Context);
	set(program: WebGLProgram, name: string, v: Float32Array): void;
}
type UniformBindings = {
	[_: string]: IUniform<any>;
};
type RenderBatch = {
	start: number;
	end: number;
};
declare class MockSourceCache extends SourceCache {
	constructor(map: Map$1);
	_loadTile(tile: Tile, callback: Callback<undefined>): void;
}
declare class ProxySourceCache extends SourceCache {
	renderCache: Array<FBO>;
	renderCachePool: Array<number>;
	proxyCachedFBO: Partial<Record<string | number, Partial<Record<string | number, number>>>>;
	constructor(map: Map$1);
	update(transform: Transform, tileSize?: number, updateForTerrain?: boolean): void;
	freeFBO(id: string): void;
	deallocRenderCache(): void;
}
declare class ProxiedTileID extends OverscaledTileID {
	proxyTileKey: number;
	constructor(tileID: OverscaledTileID, proxyTileKey: number, projMatrix: Float32Array);
}
type OverlapStencilType = false | "Clip" | "Mask";
type FBO = {
	fb: Framebuffer;
	tex: Texture;
	dirty: boolean;
};
declare class Terrain extends Elevation {
	terrainTileForTile: Partial<Record<number | string, Tile>>;
	prevTerrainTileForTile: Partial<Record<number | string, Tile>>;
	painter: Painter;
	sourceCache: SourceCache;
	gridBuffer: VertexBuffer;
	gridIndexBuffer: IndexBuffer;
	gridSegments: SegmentVector;
	gridNoSkirtSegments: SegmentVector;
	proxiedCoords: {
		[fqid: string]: Array<ProxiedTileID>;
	};
	proxyCoords: Array<OverscaledTileID>;
	proxyToSource: {
		[key: number]: {
			[key: string]: Array<ProxiedTileID>;
		};
	};
	proxySourceCache: ProxySourceCache;
	renderingToTexture: boolean;
	_style: Style$1;
	_mockSourceCache: MockSourceCache;
	orthoMatrix: Float32Array;
	enabled: boolean;
	renderMode: number;
	_visibleDemTiles: Array<Tile>;
	_sourceTilesOverlap: {
		[key: string]: boolean;
	};
	_overlapStencilMode: StencilMode;
	_overlapStencilType: OverlapStencilType;
	_stencilRef: number;
	_exaggeration: number;
	_evaluationZoom: number | null | undefined;
	_previousCameraAltitude: number | null | undefined;
	_previousUpdateTimestamp: number | null | undefined;
	_depthFBO: Framebuffer | null | undefined;
	_depthTexture: Texture | null | undefined;
	_previousZoom: number;
	_updateTimestamp: number;
	_useVertexMorphing: boolean;
	pool: Array<FBO>;
	renderedToTile: boolean;
	_drapedRenderBatches: Array<RenderBatch>;
	_sharedDepthStencil: WebGLRenderbuffer | null | undefined;
	_findCoveringTileCache: {
		[key: string]: {
			[key: number]: number | null | undefined;
		};
	};
	_tilesDirty: {
		[key: string]: {
			[key: number]: boolean;
		};
	};
	invalidateRenderCache: boolean;
	_emptyDepthBufferTexture: Texture | null | undefined;
	_emptyDEMTexture: Texture | null | undefined;
	_initializing: boolean | null | undefined;
	_emptyDEMTextureDirty: boolean | null | undefined;
	_pendingGroundEffectLayers: Array<number>;
	framebufferCopyTexture: Texture | null | undefined;
	_debugParams: {
		sortTilesHiZFirst: boolean;
		disableRenderCache: boolean;
	};
	constructor(painter: Painter, style: Style$1);
	set style(style: Style$1);
	update(style: Style$1, transform: Transform, adaptCameraAltitude: boolean): void;
	calculateExaggeration(transform: Transform): number;
	resetTileLookupCache(sourceCacheID: string): void;
	getScaledDemTileSize(): number;
	_onStyleDataEvent(event: any): void;
	_disable(): void;
	destroy(): void;
	_source(): SourceCache | null | undefined;
	isUsingMockSource(): boolean;
	exaggeration(): number;
	get visibleDemTiles(): Array<Tile>;
	get drapeBufferSize(): [
		number,
		number
	];
	set useVertexMorphing(enable: boolean);
	updateTileBinding(sourcesCoords: {
		[key: string]: Array<OverscaledTileID>;
	}): void;
	_assignTerrainTiles(coords: Array<OverscaledTileID>): void;
	_prepareDEMTextures(): void;
	_prepareDemTileUniforms(proxyTile: Tile, demTile: Tile | null | undefined, uniforms: UniformValues<TerrainUniformsType>, uniformSuffix?: string | null): boolean;
	get emptyDEMTexture(): Texture;
	get emptyDepthBufferTexture(): Texture;
	_getLoadedAreaMinimum(): number;
	_updateEmptyDEMTexture(): Texture;
	setupElevationDraw(tile: Tile, program: Program$1<any>, options?: {
		useDepthForOcclusion?: boolean;
		useMeterToDem?: boolean;
		labelPlaneMatrixInv?: Float32Array | null | undefined;
		morphing?: {
			srcDemTile: Tile;
			dstDemTile: Tile;
			phase: number;
		};
		useDenormalizedUpVectorScale?: boolean;
	}): void;
	globeUniformValues(tr: Transform, id: CanonicalTileID, useDenormalizedUpVectorScale?: boolean | null): UniformValues<GlobeUniformsType>;
	renderToBackBuffer(accumulatedDrapes: Array<OverscaledTileID>): void;
	renderBatch(startLayerIndex: number): number;
	postRender(): void;
	isLayerOrderingCorrect(style: Style$1): boolean;
	getMinElevationBelowMSL(): number;
	raycast(pos: vec3, dir: vec3, exaggeration: number): number | null | undefined;
	_createFBO(): FBO;
	_initFBOPool(): void;
	_shouldDisableRenderCache(): boolean;
	_clearLineLayersFromRenderCache(): void;
	_clearRasterLayersFromRenderCache(): void;
	_setupDrapedRenderBatches(): void;
	_setupRenderCache(previousProxyToSource: {
		[key: number]: {
			[key: string]: Array<ProxiedTileID>;
		};
	}): void;
	_setupStencil(fbo: FBO, proxiedCoords: Array<ProxiedTileID>, layer: StyleLayer, sourceCache?: SourceCache): void;
	clipOrMaskOverlapStencilType(): boolean;
	stencilModeForRTTOverlap(id: OverscaledTileID): Readonly<StencilMode>;
	_renderTileClippingMasks(proxiedCoords: Array<ProxiedTileID>, ref: number): void;
	pointCoordinate(screenPoint: Point): vec4 | null | undefined;
	_setupProxiedCoordsForOrtho(sourceCache: SourceCache, sourceCoords: Array<OverscaledTileID>, previousProxyToSource: {
		[key: number]: {
			[key: string]: Array<ProxiedTileID>;
		};
	}): void;
	_setupProxiedCoordsForImageSource(sourceCache: SourceCache, sourceCoords: Array<OverscaledTileID>, previousProxyToSource: {
		[key: number]: {
			[key: string]: Array<ProxiedTileID>;
		};
	}): void;
	_createProxiedId(proxyTileID: OverscaledTileID, tile: Tile, recycle: Array<ProxiedTileID>): ProxiedTileID;
	_findTileCoveringTileID(tileID: OverscaledTileID, sourceCache: SourceCache): Tile | null | undefined;
	findDEMTileFor(tileID: OverscaledTileID): Tile | null | undefined;
	prepareDrawTile(): void;
	_clearRenderCacheForTile(sourceCacheFQID: string, coord: OverscaledTileID): void;
}
type TerrainUniformsType = {
	["u_dem"]: Uniform1i;
	["u_dem_prev"]: Uniform1i;
	["u_dem_tl"]: Uniform2f;
	["u_dem_scale"]: Uniform1f;
	["u_dem_tl_prev"]: Uniform2f;
	["u_dem_scale_prev"]: Uniform1f;
	["u_dem_size"]: Uniform1f;
	["u_dem_lerp"]: Uniform1f;
	["u_exaggeration"]: Uniform1f;
	["u_depth"]: Uniform1i;
	["u_depth_size_inv"]: Uniform2f;
	["u_depth_range_unpack"]: Uniform2f;
	["u_meter_to_dem"]?: Uniform1f;
	["u_label_plane_matrix_inv"]?: UniformMatrix4f;
};
type GlobeUniformsType = {
	["u_tile_tl_up"]: Uniform3f;
	["u_tile_tr_up"]: Uniform3f;
	["u_tile_br_up"]: Uniform3f;
	["u_tile_bl_up"]: Uniform3f;
	["u_tile_up_scale"]: Uniform1f;
};
type Cell = {
	start: number;
	len: number;
};
declare class TriangleGridIndex {
	triangleCount: number;
	min: Point;
	max: Point;
	xScale: number;
	yScale: number;
	cellsX: number;
	cellsY: number;
	cells: Array<Cell | null | undefined>;
	payload: Array<number>;
	lookup: Uint8Array | null | undefined;
	constructor(vertices: Array<Point>, indices: Array<number>, cellCount: number, maxCellSize?: number | null);
	_lazyInitLookup(): void;
	queryPoint(p: Point, out: Array<number>): void;
	query(bbMin: Point, bbMax: Point, out: Array<number>): void;
}
type Footprint = {
	vertices: Array<Point>;
	indices: Array<number>;
	grid: TriangleGridIndex;
	min: Point;
	max: Point;
};
type TileFootprint = {
	footprint: Footprint;
	id: UnwrappedTileID;
};
interface FootprintSource {
	getSourceId(): string;
	getFootprints(): Array<TileFootprint>;
	getOrder(): number;
	getClipMask(): number;
}
type Region = {
	min: Point;
	max: Point;
	sourceId: string;
	footprint: Footprint;
	footprintTileId: UnwrappedTileID;
	order: number;
	clipMask: number;
};
type RegionData = {
	min: Point;
	max: Point;
	hiddenByOverlap: boolean;
	priority: number;
	tileId: UnwrappedTileID;
	footprint: Footprint;
	order: number;
	clipMask: number;
};
declare class ReplacementSource {
	_updateTime: number;
	_sourceIds: Array<string>;
	_activeRegions: Array<RegionData>;
	_prevRegions: Array<RegionData>;
	_globalClipBounds: {
		min: Point;
		max: Point;
	};
	constructor();
	clear(): void;
	get updateTime(): number;
	getReplacementRegionsForTile(id: UnwrappedTileID, checkAgainstGlobalClipBounds?: boolean): Array<Region>;
	setSources(sources: Array<{
		layer: string;
		cache: SourceCache;
		order: number;
		clipMask: number;
	}>): void;
	_addSource(source: FootprintSource): void;
	_computeReplacement(): void;
	_setSources(sources: Array<FootprintSource>): void;
}
type CutoffUniformsType = {
	["u_cutoff_params"]: Uniform4f;
};
type CutoffParams = {
	shouldRenderCutoff: boolean;
	uniformValues: UniformValues<CutoffUniformsType>;
};
type LightProps = {
	"anchor": DataConstantProperty<"map" | "viewport">;
	"position": DataConstantProperty<[
		number,
		number,
		number
	]>;
	"color": DataConstantProperty<Color>;
	"intensity": DataConstantProperty<number>;
};
type LightProps$1 = {
	"color": DataConstantProperty<Color>;
	"intensity": DataConstantProperty<number>;
};
type LightProps$2 = {
	"direction": DirectionProperty;
	"color": DataConstantProperty<Color>;
	"intensity": DataConstantProperty<number>;
	"cast-shadows": DataConstantProperty<boolean>;
	"shadow-intensity": DataConstantProperty<number>;
};
type LightProps$3 = LightProps | LightProps$1 | LightProps$2;
declare class Lights<P extends LightProps$3> extends Evented {
	scope: string;
	properties: PossiblyEvaluated<P>;
	_transitionable: Transitionable<P>;
	_transitioning: Transitioning<P>;
	_options: LightsSpecification;
	constructor(options: LightsSpecification, properties: Properties<P>, scope: string, configOptions?: ConfigOptions | null);
	updateConfig(configOptions?: ConfigOptions | null): void;
	updateTransitions(parameters: TransitionParameters): void;
	hasTransition(): boolean;
	recalculate(parameters: EvaluationParameters): void;
	get(): LightsSpecification;
	set(options: LightsSpecification, configOptions?: ConfigOptions | null): void;
	shadowsEnabled(): boolean;
}
type ShadowUniformsType = {
	["u_light_matrix_0"]: UniformMatrix4f;
	["u_light_matrix_1"]: UniformMatrix4f;
	["u_shadow_intensity"]: Uniform1f;
	["u_fade_range"]: Uniform2f;
	["u_shadow_normal_offset"]: Uniform3f;
	["u_shadow_texel_size"]: Uniform1f;
	["u_shadow_map_resolution"]: Uniform1f;
	["u_shadow_direction"]: Uniform3f;
	["u_shadow_bias"]: Uniform3f;
	["u_shadowmap_0"]: Uniform1i;
	["u_shadowmap_1"]: Uniform1i;
};
type ShadowCascade = {
	framebuffer: Framebuffer;
	texture: Texture;
	matrix: mat4;
	far: number;
	boundingSphereRadius: number;
	frustum: Frustum;
	scale: number;
};
type TileShadowVolume = {
	vertices: Array<vec3>;
	planes: Array<vec4>;
};
type ShadowNormalOffsetMode = "vector-tile" | "model-tile";
declare class ShadowReceiver {
	constructor(aabb: Aabb, lastCascade?: number | null);
	aabb: Aabb;
	lastCascade: number | null | undefined;
}
declare class ShadowReceivers {
	add(tileId: UnwrappedTileID, aabb: Aabb): void;
	clear(): void;
	get(tileId: UnwrappedTileID): ShadowReceiver | null | undefined;
	computeRequiredCascades(frustum: Frustum, worldSize: number, cascades: Array<ShadowCascade>): number;
	receivers: {
		number: ShadowReceiver;
	};
}
declare class ShadowRenderer {
	painter: Painter;
	_enabled: boolean;
	_shadowLayerCount: number;
	_numCascadesToRender: number;
	_cascades: Array<ShadowCascade>;
	_groundShadowTiles: Array<OverscaledTileID>;
	_receivers: ShadowReceivers;
	_depthMode: DepthMode;
	_uniformValues: UniformValues<ShadowUniformsType>;
	shadowDirection: vec3;
	useNormalOffset: boolean;
	_forceDisable: boolean;
	constructor(painter: Painter);
	destroy(): void;
	updateShadowParameters(transform: Transform, directionalLight?: Lights<LightProps$2> | null): void;
	get enabled(): boolean;
	set enabled(enabled: boolean);
	drawShadowPass(style: Style$1, sourceCoords: {
		[_: string]: Array<OverscaledTileID>;
	}): void;
	drawGroundShadows(): void;
	getShadowPassColorMode(): Readonly<ColorMode>;
	getShadowPassDepthMode(): Readonly<DepthMode>;
	getShadowCastingLayerCount(): number;
	calculateShadowPassMatrixFromTile(unwrappedId: UnwrappedTileID): Float32Array;
	calculateShadowPassMatrixFromMatrix(matrix: mat4): Float32Array;
	setupShadows(unwrappedTileID: UnwrappedTileID, program: Program$1<any>, normalOffsetMode?: ShadowNormalOffsetMode | null, tileOverscaledZ?: number): void;
	setupShadowsFromMatrix(worldMatrix: mat4, program: Program$1<any>, normalOffset?: boolean): void;
	getShadowUniformValues(): UniformValues<ShadowUniformsType>;
	getCurrentCascadeFrustum(): Frustum;
	computeSimplifiedTileShadowVolume(id: UnwrappedTileID, height: number, worldSize: number, lightDir: vec3): TileShadowVolume;
	addShadowReceiver(tileId: UnwrappedTileID, minHeight: number, maxHeight: number): void;
	getMaxCascadeForTile(tileId: UnwrappedTileID): number;
}
declare class CacheEntry {
	buf: IndexBuffer;
	lastUsedFrameIdx: number;
}
declare class WireframeDebugCache {
	_storage: Map<number, CacheEntry>;
	constructor();
	getLinesFromTrianglesBuffer(frameIdx: number, indexBuffer: IndexBuffer, context: Context): IndexBuffer | null | undefined;
	update(frameIdx: number): void;
	destroy(): void;
}
declare function _default(fontstack: string, range: number, urlTemplate: string, requestManager: RequestManager, callback: Callback<{
	glyphs: {
		[key: number]: StyleGlyph | null;
	};
	ascender?: number;
	descender?: number;
}>): void;
type Entry = {
	glyphs: {
		[id: number]: StyleGlyph | null;
	};
	requests: {
		[range: number]: Array<Callback<{
			glyphs: {
				[key: number]: StyleGlyph | null;
			};
			ascender?: number;
			descender?: number;
		}>>;
	};
	ranges: {
		[range: number]: boolean | null;
	};
	tinySDF?: TinySDF;
	ascender?: number;
	descender?: number;
};
declare class GlyphManager {
	requestManager: RequestManager;
	localFontFamily: string | null | undefined;
	localGlyphMode: number;
	entries: {
		[_: string]: Entry;
	};
	localGlyphs: {
		[_: string]: {
			glyphs: {
				[id: number]: StyleGlyph | null;
			};
			ascender: number | null | undefined;
			descender: number | null | undefined;
		};
	};
	urls: {
		[scope: string]: string | null | undefined;
	};
	static loadGlyphRange: typeof _default;
	static TinySDF: Class<TinySDF>;
	constructor(requestManager: RequestManager, localGlyphMode: number, localFontFamily?: string | null);
	setURL(url: string | null | undefined, scope: string): void;
	getGlyphs(glyphs: {
		[stack: string]: Array<number>;
	}, scope: string, callback: Callback<{
		[stack: string]: {
			glyphs: {
				[_: number]: StyleGlyph | null | undefined;
			};
			ascender?: number;
			descender?: number;
		};
	}>): void;
	_doesCharSupportLocalGlyph(id: number): boolean;
	_tinySDF(entry: Entry, stack: string, id: number): StyleGlyph | null | undefined;
}
type Sampler = {
	minFilter: TextureFilter;
	magFilter: TextureFilter;
	wrapS: TextureWrap;
	wrapT: TextureWrap;
};
type ModelTexture = {
	image: TextureImage;
	sampler: Sampler;
	gfxTexture?: Texture;
	uploaded: boolean;
	offsetScale?: [
		number,
		number,
		number,
		number
	];
};
type PbrMetallicRoughness = {
	baseColorFactor: Color;
	metallicFactor: number;
	roughnessFactor: number;
	baseColorTexture: ModelTexture | null | undefined;
	metallicRoughnessTexture: ModelTexture | null | undefined;
};
type Material = {
	normalTexture: ModelTexture | null | undefined;
	occlusionTexture: ModelTexture | null | undefined;
	emissionTexture: ModelTexture | null | undefined;
	pbrMetallicRoughness: PbrMetallicRoughness;
	emissiveFactor: [
		number,
		number,
		number
	];
	alphaMode: string;
	alphaCutoff: number;
	doubleSided: boolean;
	defined: boolean;
};
type Mesh = {
	indexArray: StructArrayLayout3ui6;
	indexBuffer: IndexBuffer;
	vertexArray: StructArrayLayout3f12;
	vertexBuffer: VertexBuffer;
	normalArray: StructArrayLayout3f12;
	normalBuffer: VertexBuffer;
	texcoordArray: StructArrayLayout2f8;
	texcoordBuffer: VertexBuffer;
	colorArray: StructArray;
	colorBuffer: VertexBuffer;
	featureData: ArrayBufferView;
	featureArray: StructArrayLayout4ui3f20;
	pbrBuffer: VertexBuffer;
	material: Material;
	aabb: Aabb;
	transformedAabb: Aabb;
	segments: SegmentVector;
	centroid: vec3;
	heightmap: Float32Array;
};
type AreaLight = {
	pos: vec3;
	normal: vec3;
	width: number;
	height: number;
	depth: number;
	points: vec4;
};
type Node$1 = {
	id: string;
	matrix: mat4;
	meshes: Array<Mesh>;
	children: Array<Node$1>;
	footprint: Footprint | null | undefined;
	lights: Array<AreaLight>;
	lightMeshIndex: number;
	elevation: number | null | undefined;
	anchor: vec2;
	hidden: boolean;
};
declare class Model {
	id: string;
	position: LngLat;
	orientation: [
		number,
		number,
		number
	];
	nodes: Array<Node$1>;
	matrix: mat4;
	uploaded: boolean;
	aabb: Aabb;
	constructor(id: string, position: [
		number,
		number
	] | null | undefined, orientation: [
		number,
		number,
		number
	] | null | undefined, nodes: Array<Node$1>);
	_applyTransformations(node: Node$1, parentMatrix: mat4): void;
	computeBoundsAndApplyParent(): void;
	computeModelMatrix(painter: Painter, rotation: vec3, scale: vec3, translation: vec3, applyElevation: boolean, followTerrainSlope: boolean, viewportScale?: boolean): void;
	upload(context: Context): void;
	destroy(): void;
}
type ReferencedModel = {
	model: Model;
	numReferences: number;
};
declare class ModelManager extends Evented {
	models: {
		[scope: string]: {
			[id: string]: ReferencedModel;
		};
	};
	numModelsLoading: {
		[scope: string]: number;
	};
	requestManager: RequestManager;
	constructor(requestManager: RequestManager);
	loadModel(id: string, url: string): Promise<Model | null | undefined>;
	load(modelUris: {
		[key: string]: string;
	}, scope: string): void;
	isLoaded(): boolean;
	hasModel(id: string, scope: string): boolean;
	getModel(id: string, scope: string): Model | null | undefined;
	addModel(id: string, url: string, scope: string): void;
	addModels(models: ModelsSpecification, scope: string): void;
	addModelsFromBucket(modelUris: Array<string>, scope: string): void;
	removeModel(id: string, scope: string): void;
	listModels(scope: string): Array<string>;
	upload(painter: Painter, scope: string): void;
}
type CircleDefinesType = "PITCH_WITH_MAP" | "SCALE_WITH_MAP";
type RasterDefinesType = "RASTER_COLOR" | "RENDER_CUTOFF" | "RASTER_ARRAY" | "RASTER_ARRAY_LINEAR";
type RasterParticleDefinesType = "RASTER_ARRAY" | "RENDER_CUTOFF" | "DATA_FORMAT_UINT32" | "DATA_FORMAT_UINT16" | "DATA_FORMAT_UINT8";
type SizeData = {
	kind: "constant";
	layoutSize: number;
} | {
	kind: "source";
} | {
	kind: "camera";
	minZoom: number;
	maxZoom: number;
	minSize: number;
	maxSize: number;
	interpolationType: InterpolationType | null | undefined;
} | {
	kind: "composite";
	minZoom: number;
	maxZoom: number;
	interpolationType: InterpolationType | null | undefined;
};
type SymbolDefinesType = "PITCH_WITH_MAP_TERRAIN";
type TileTransform = {
	scale: number;
	x: number;
	y: number;
	x2: number;
	y2: number;
	projection: Projection$2;
};
declare class Point3D extends Point {
	z: number;
	constructor(x: number, y: number, z: number);
}
declare class Point4D extends Point3D {
	w: number;
	constructor(x: number, y: number, z: number, w: number);
}
type LineClips = {
	start: number;
	end: number;
};
type GradientTexture = {
	texture: Texture;
	gradient: RGBAImage | null | undefined;
	version: number;
};
declare class LineBucket implements Bucket {
	distance: number;
	totalDistance: number;
	maxLineLength: number;
	scaledDistance: number;
	lineSoFar: number;
	lineClips: LineClips | null | undefined;
	e1: number;
	e2: number;
	patternJoinNone: boolean;
	segmentStart: number;
	segmentStartf32: number;
	segmentPoints: Array<number>;
	index: number;
	zoom: number;
	overscaling: number;
	layers: Array<LineStyleLayer>;
	layerIds: Array<string>;
	gradients: {
		[key: string]: GradientTexture;
	};
	stateDependentLayers: Array<any>;
	stateDependentLayerIds: Array<string>;
	patternFeatures: Array<BucketFeature>;
	lineClipsArray: Array<LineClips>;
	layoutVertexArray: StructArrayLayout2i4ub1f12;
	layoutVertexBuffer: VertexBuffer;
	layoutVertexArray2: StructArrayLayout4f16;
	layoutVertexBuffer2: VertexBuffer;
	patternVertexArray: StructArrayLayout3f12;
	patternVertexBuffer: VertexBuffer;
	zOffsetVertexArray: StructArrayLayout1f4;
	zOffsetVertexBuffer: VertexBuffer;
	indexArray: StructArrayLayout3ui6;
	indexBuffer: IndexBuffer;
	hasPattern: boolean;
	hasZOffset: boolean;
	programConfigurations: ProgramConfigurationSet<LineStyleLayer>;
	segments: SegmentVector;
	uploaded: boolean;
	projection: ProjectionSpecification;
	currentVertex: Point4D | null | undefined;
	currentVertexIsOutside: boolean;
	tessellationStep: number;
	constructor(options: BucketParameters<LineStyleLayer>);
	updateFootprints(_id: UnwrappedTileID, _footprints: Array<TileFootprint>): void;
	populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID, tileTransform: TileTransform): void;
	addConstantDashes(lineAtlas: LineAtlas): boolean;
	addFeatureDashes(feature: BucketFeature, lineAtlas: LineAtlas): void;
	update(states: FeatureStates, vtLayer: VectorTileLayer, availableImages: Array<string>, imagePositions: SpritePositions, brightness?: number | null): void;
	addFeatures(options: PopulateParameters, canonical: CanonicalTileID, imagePositions: SpritePositions, availableImages: Array<string>, _: TileTransform, brightness?: number | null): void;
	isEmpty(): boolean;
	uploadPending(): boolean;
	upload(context: Context): void;
	destroy(): void;
	lineFeatureClips(feature: BucketFeature): LineClips | null | undefined;
	addFeature(feature: BucketFeature, geometry: Array<Array<Point>>, index: number, canonical: CanonicalTileID, imagePositions: SpritePositions, availableImages: Array<string>, brightness?: number | null): void;
	addLine(vertices: Array<Point>, feature: BucketFeature, canonical: CanonicalTileID, join: string, cap: string, miterLimit: number, roundLimit: number): void;
	addVerticesTo(from: Point4D, to: Point4D, leftX: number, leftY: number, rightX: number, rightY: number, endLeft: number, endRight: number, segment: Segment, round: boolean): void;
	/**
	 * Add two vertices to the buffers.
	 *
	 * @param p the line vertex to add buffer vertices for
	 * @param normal vertex normal
	 * @param endLeft extrude to shift the left vertex along the line
	 * @param endRight extrude to shift the left vertex along the line
	 * @param segment the segment object to add the vertex to
	 * @param round whether this is a round cap
	 * @private
	 */
	addCurrentVertex(p: Point, normal: Point, endLeft: number, endRight: number, segment: Segment, fixedElevation?: number | null, round?: boolean): void;
	addHalfVertex({ x, y, }: Point, extrudeX: number, extrudeY: number, round: boolean, up: boolean, dir: number, segment: Segment, fixedElevation?: number | null): void;
	updateScaledDistance(): void;
	updateDistance(prev: Point, next: Point): void;
}
type LayoutProps = {
	"line-cap": DataDrivenProperty<"butt" | "round" | "square">;
	"line-join": DataDrivenProperty<"bevel" | "round" | "miter" | "none">;
	"line-miter-limit": DataConstantProperty<number>;
	"line-round-limit": DataConstantProperty<number>;
	"line-sort-key": DataDrivenProperty<number>;
	"line-z-offset": DataDrivenProperty<number>;
	"visibility": DataConstantProperty<"visible" | "none">;
};
type PaintProps$3 = {
	"line-opacity": DataDrivenProperty<number>;
	"line-color": DataDrivenProperty<Color>;
	"line-translate": DataConstantProperty<[
		number,
		number
	]>;
	"line-translate-anchor": DataConstantProperty<"map" | "viewport">;
	"line-width": DataDrivenProperty<number>;
	"line-gap-width": DataDrivenProperty<number>;
	"line-offset": DataDrivenProperty<number>;
	"line-blur": DataDrivenProperty<number>;
	"line-dasharray": DataDrivenProperty<Array<number | null | undefined>>;
	"line-pattern": DataDrivenProperty<ResolvedImage | null | undefined>;
	"line-gradient": ColorRampProperty;
	"line-trim-offset": DataConstantProperty<[
		number,
		number
	]>;
	"line-trim-fade-range": DataConstantProperty<[
		number,
		number
	]>;
	"line-trim-color": DataConstantProperty<Color>;
	"line-emissive-strength": DataConstantProperty<number>;
	"line-border-width": DataDrivenProperty<number>;
	"line-border-color": DataDrivenProperty<Color>;
	"line-occlusion-opacity": DataConstantProperty<number>;
};
declare class LineStyleLayer extends StyleLayer {
	_unevaluatedLayout: Layout<LayoutProps>;
	layout: PossiblyEvaluated<LayoutProps>;
	gradientVersion: number;
	stepInterpolant: boolean;
	_transitionablePaint: Transitionable<PaintProps$3>;
	_transitioningPaint: Transitioning<PaintProps$3>;
	paint: PossiblyEvaluated<PaintProps$3>;
	constructor(layer: LayerSpecification, scope: string, lut: LUT$1 | null, options?: ConfigOptions | null);
	_handleSpecialPaintPropertyUpdate(name: string): void;
	gradientExpression(): StylePropertyExpression;
	widthExpression(): StylePropertyExpression;
	recalculate(parameters: EvaluationParameters, availableImages: Array<string>): void;
	createBucket(parameters: BucketParameters<LineStyleLayer>): LineBucket;
	getProgramIds(): string[];
	getDefaultProgramParams(name: string, zoom: number, lut: LUT$1 | null): CreateProgramParams | null;
	queryRadius(bucket: Bucket): number;
	queryIntersectsFeature(queryGeometry: TilespaceQueryGeometry, feature: VectorTileFeature, featureState: FeatureState, geometry: Array<Array<Point>>, zoom: number, transform: Transform): boolean;
	isTileClipped(): boolean;
	isDraped(_?: SourceCache | null): boolean;
}
type LineDefinesType = "RENDER_LINE_GRADIENT" | "RENDER_LINE_DASH" | "RENDER_LINE_TRIM_OFFSET" | "RENDER_LINE_BORDER" | "LINE_JOIN_NONE" | "ELEVATED";
type HillshadeDefinesType = "TERRAIN_DEM_FLOAT_FORMAT";
type HeatmapDefinesType = "PROJECTION_GLOBE_VIEW";
type GlobeDefinesType = "PROJECTION_GLOBE_VIEW" | "GLOBE_POLES" | "CUSTOM_ANTIALIASING" | "ALPHA_PASS";
type EvaluationFeature = {
	readonly type: 1 | 2 | 3 | "Unknown" | "Point" | "LineString" | "Polygon";
	readonly id?: any;
	readonly properties: {
		[_: string]: any;
	};
	readonly patterns?: {
		[_: string]: string;
	};
	geometry: Array<Array<Point>>;
};
declare class ModelFeature {
	feature: EvaluationFeature;
	instancedDataOffset: number;
	instancedDataCount: number;
	rotation: Array<number>;
	scale: Array<number>;
	translation: Array<number>;
	constructor(feature: EvaluationFeature, offset: number);
}
declare class PerModelAttributes {
	instancedDataArray: StructArrayLayout16f64;
	instancedDataBuffer: VertexBuffer;
	instancesEvaluatedElevation: Array<number>;
	features: Array<ModelFeature>;
	idToFeaturesIndex: Partial<Record<string | number, number>>;
	constructor();
}
declare class ModelBucket implements Bucket {
	zoom: number;
	index: number;
	canonical: CanonicalTileID;
	layers: Array<ModelStyleLayer>;
	layerIds: Array<string>;
	stateDependentLayers: Array<ModelStyleLayer>;
	stateDependentLayerIds: Array<string>;
	hasPattern: boolean;
	instancesPerModel: {
		string: PerModelAttributes;
	};
	uploaded: boolean;
	tileToMeter: number;
	projection: ProjectionSpecification;
	validForExaggeration: number;
	validForDEMTile: {
		id: OverscaledTileID | null | undefined;
		timestamp: number;
	};
	maxVerticalOffset: number;
	maxScale: number;
	maxHeight: number;
	isInsideFirstShadowMapFrustum: boolean;
	lookup: Uint8Array | null | undefined;
	lookupDim: number;
	instanceCount: number;
	terrainElevationMin: number;
	terrainElevationMax: number;
	hasZoomDependentProperties: boolean;
	modelUris: Array<string>;
	modelsRequested: boolean;
	activeReplacements: Array<any>;
	replacementUpdateTime: number;
	constructor(options: BucketParameters<ModelStyleLayer>);
	updateFootprints(_id: UnwrappedTileID, _footprints: Array<TileFootprint>): void;
	populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID, tileTransform: TileTransform): void;
	update(states: FeatureStates, vtLayer: VectorTileLayer, availableImages: Array<string>, imagePositions: SpritePositions): void;
	updateZoomBasedPaintProperties(): boolean;
	updateReplacement(coord: OverscaledTileID, source: ReplacementSource, layerIndex: number): boolean;
	isEmpty(): boolean;
	uploadPending(): boolean;
	upload(context: Context): void;
	destroy(): void;
	addFeature(feature: BucketFeature, geometry: Array<Array<Point>>, evaluationFeature: EvaluationFeature): string;
	getModelUris(): Array<string>;
	evaluate(feature: ModelFeature, featureState: FeatureState, perModelVertexArray: PerModelAttributes, update: boolean): void;
}
type LayoutProps$1 = {
	"visibility": DataConstantProperty<"visible" | "none">;
	"model-id": DataDrivenProperty<string>;
};
type PaintProps$4 = {
	"model-opacity": DataConstantProperty<number>;
	"model-rotation": DataDrivenProperty<[
		number,
		number,
		number
	]>;
	"model-scale": DataDrivenProperty<[
		number,
		number,
		number
	]>;
	"model-translation": DataDrivenProperty<[
		number,
		number,
		number
	]>;
	"model-color": DataDrivenProperty<Color>;
	"model-color-mix-intensity": DataDrivenProperty<number>;
	"model-type": DataConstantProperty<"common-3d" | "location-indicator">;
	"model-cast-shadows": DataConstantProperty<boolean>;
	"model-receive-shadows": DataConstantProperty<boolean>;
	"model-ambient-occlusion-intensity": DataConstantProperty<number>;
	"model-emissive-strength": DataDrivenProperty<number>;
	"model-roughness": DataDrivenProperty<number>;
	"model-height-based-emissive-strength-multiplier": DataDrivenProperty<[
		number,
		number,
		number,
		number,
		number
	]>;
	"model-cutoff-fade-range": DataConstantProperty<number>;
	"model-front-cutoff": DataConstantProperty<[
		number,
		number,
		number
	]>;
};
export interface GeoJSONFeature extends GeoJSON.Feature {
	layer?: LayerSpecification;
	source: string;
	sourceLayer?: string;
	state?: FeatureState;
}
declare class ModelStyleLayer extends StyleLayer {
	_transitionablePaint: Transitionable<PaintProps$4>;
	_transitioningPaint: Transitioning<PaintProps$4>;
	paint: PossiblyEvaluated<PaintProps$4>;
	layout: PossiblyEvaluated<LayoutProps$1>;
	modelManager: ModelManager;
	constructor(layer: LayerSpecification, scope: string, lut: LUT$1 | null, options?: ConfigOptions | null);
	createBucket(parameters: BucketParameters<ModelStyleLayer>): ModelBucket;
	getProgramIds(): Array<string>;
	is3D(): boolean;
	hasShadowPass(): boolean;
	canCastShadows(): boolean;
	hasLightBeamPass(): boolean;
	cutoffRange(): number;
	queryRadius(bucket: Bucket): number;
	queryIntersectsFeature(queryGeometry: TilespaceQueryGeometry, feature: VectorTileFeature, featureState: FeatureState, geometry: Array<Array<Point>>, zoom: number, transform: Transform): number | boolean;
	_handleOverridablePaintPropertyUpdate<T, R>(name: string, oldValue: PropertyValue<T, R>, newValue: PropertyValue<T, R>): boolean;
	_isPropertyZoomDependent(name: string): boolean;
	isZoomDependent(): boolean;
	queryIntersectsMatchingFeature(queryGeometry: TilespaceQueryGeometry, featureIndex: number, filter: FeatureFilter, transform: Transform): {
		queryFeature: GeoJSONFeature | null | undefined;
		intersectionZ: number;
	};
}
type FogDefinesType = [
	"FOG",
	"FOG_DITHERING"
];
type TerrainDepthAccessDefinesType = "TERRAIN_DEPTH_D24";
type DynamicDefinesType = CircleDefinesType | SymbolDefinesType | LineDefinesType | HeatmapDefinesType | GlobeDefinesType | RasterDefinesType | RasterParticleDefinesType | FogDefinesType | HillshadeDefinesType | TerrainDepthAccessDefinesType;
declare class OcclusionBuffers {
	vx: VertexBuffer;
	idx: IndexBuffer;
	segments: SegmentVector;
	constructor(context: Context);
	destroy(): void;
}
type RenderPass = "offscreen" | "opaque" | "translucent" | "sky" | "shadow" | "light-beam";
type CanvasCopyInstances = {
	canvasCopies: WebGLTexture[];
	timeStamps: number[];
};
type CreateProgramParams = {
	config?: ProgramConfiguration;
	defines?: DynamicDefinesType[];
	overrideFog?: boolean;
	overrideRtt?: boolean;
};
type WireframeOptions = {
	terrain: boolean;
	layers2D: boolean;
	layers3D: boolean;
};
type PainterOptions = {
	showOverdrawInspector: boolean;
	showTileBoundaries: boolean;
	showParseStatus: boolean;
	showQueryGeometry: boolean;
	showTileAABBs: boolean;
	showPadding: boolean;
	rotating: boolean;
	zooming: boolean;
	moving: boolean;
	gpuTiming: boolean;
	gpuTimingDeferredRender: boolean;
	fadeDuration: number;
	isInitialLoad: boolean;
	speedIndexTiming: boolean;
	wireframe: WireframeOptions;
};
type TileBoundsBuffers = {
	tileBoundsBuffer: VertexBuffer;
	tileBoundsIndexBuffer: IndexBuffer;
	tileBoundsSegments: SegmentVector;
};
type GPUTimers = {
	[layerId: string]: any;
};
declare class Painter {
	context: Context;
	transform: Transform;
	_tileTextures: {
		[_: number]: Array<Texture>;
	};
	numSublayers: number;
	depthEpsilon: number;
	emptyProgramConfiguration: ProgramConfiguration;
	width: number;
	height: number;
	tileExtentBuffer: VertexBuffer;
	tileExtentSegments: SegmentVector;
	debugBuffer: VertexBuffer;
	debugIndexBuffer: IndexBuffer;
	debugSegments: SegmentVector;
	viewportBuffer: VertexBuffer;
	viewportSegments: SegmentVector;
	quadTriangleIndexBuffer: IndexBuffer;
	mercatorBoundsBuffer: VertexBuffer;
	mercatorBoundsSegments: SegmentVector;
	_tileClippingMaskIDs: {
		[_: number]: number;
	};
	stencilClearMode: StencilMode;
	style: Style$1;
	options: PainterOptions;
	imageManager: ImageManager;
	glyphManager: GlyphManager;
	modelManager: ModelManager;
	depthRangeFor3D: DepthRangeType;
	depthOcclusion: boolean;
	opaquePassCutoff: number;
	frameCounter: number;
	renderPass: RenderPass;
	currentLayer: number;
	currentStencilSource: string | null | undefined;
	currentShadowCascade: number;
	nextStencilID: number;
	id: string;
	_showOverdrawInspector: boolean;
	_shadowMapDebug: boolean;
	cache: {
		[_: string]: Program$1<any>;
	};
	symbolFadeChange: number;
	gpuTimers: GPUTimers;
	deferredRenderGpuTimeQueries: Array<any>;
	emptyTexture: Texture;
	identityMat: Float32Array;
	debugOverlayTexture: Texture;
	debugOverlayCanvas: HTMLCanvasElement;
	_terrain: Terrain | null | undefined;
	_forceTerrainMode: boolean;
	globeSharedBuffers: GlobeSharedBuffers | null | undefined;
	tileLoaded: boolean;
	frameCopies: Array<WebGLTexture>;
	loadTimeStamps: Array<number>;
	_backgroundTiles: {
		[key: number]: Tile;
	};
	_atmosphere: Atmosphere | null | undefined;
	replacementSource: ReplacementSource;
	conflationActive: boolean;
	firstLightBeamLayer: number;
	_lastOcclusionLayer: number;
	layersWithOcclusionOpacity: Array<number>;
	longestCutoffRange: number;
	minCutoffZoom: number;
	renderDefaultNorthPole: boolean;
	renderDefaultSouthPole: boolean;
	renderElevatedRasterBackface: boolean;
	_fogVisible: boolean;
	_cachedTileFogOpacities: {
		[key: number]: [
			number,
			number
		];
	};
	_shadowRenderer: ShadowRenderer | null | undefined;
	_wireframeDebugCache: WireframeDebugCache;
	tp: ITrackedParameters;
	_debugParams: {
		showTerrainProxyTiles: boolean;
		fpsWindow: number;
		continousRedraw: boolean;
		enabledLayers: any;
	};
	_timeStamp: number;
	_dt: number;
	_averageFPS: number;
	_fpsHistory: Array<number>;
	occlusionBuffers: OcclusionBuffers;
	symbolParams: SymbolParams;
	terrainDepthFBO: Framebuffer;
	terrainDepthTexture: Texture;
	constructor(gl: WebGL2RenderingContext, contextCreateOptions: ContextOptions, transform: Transform, tp: ITrackedParameters);
	updateTerrain(style: Style$1, adaptCameraAltitude: boolean): void;
	_updateFog(style: Style$1): void;
	get terrain(): Terrain | null | undefined;
	get forceTerrainMode(): boolean;
	set forceTerrainMode(value: boolean);
	get shadowRenderer(): ShadowRenderer | null | undefined;
	get wireframeDebugCache(): WireframeDebugCache;
	resize(width: number, height: number): void;
	setup(): void;
	getMercatorTileBoundsBuffers(): TileBoundsBuffers;
	getTileBoundsBuffers(tile: Tile): TileBoundsBuffers;
	clearStencil(): void;
	resetStencilClippingMasks(): void;
	_renderTileClippingMasks(layer: StyleLayer, sourceCache?: SourceCache, tileIDs?: Array<OverscaledTileID>): void;
	stencilModeFor3D(): StencilMode;
	stencilModeForClipping(tileID: OverscaledTileID): Readonly<StencilMode>;
	stencilConfigForOverlap(tileIDs: Array<OverscaledTileID>): [
		{
			[_: number]: Readonly<StencilMode>;
		},
		Array<OverscaledTileID>
	];
	colorModeForRenderPass(): Readonly<ColorMode>;
	colorModeForDrapableLayerRenderPass(emissiveStrengthForDrapedLayers?: number): Readonly<ColorMode>;
	depthModeForSublayer(n: number, mask: DepthMaskType, func?: DepthFuncType | null, skipOpaquePassCutoff?: boolean): Readonly<DepthMode>;
	opaquePassEnabledForLayer(): boolean;
	blitDepth(): void;
	updateAverageFPS(): void;
	render(style: Style$1, options: PainterOptions): void;
	prepareLayer(layer: StyleLayer): void;
	renderLayer(painter: Painter, sourceCache: SourceCache | null | undefined, layer: StyleLayer, coords?: Array<OverscaledTileID>): void;
	gpuTimingStart(layer: StyleLayer): void;
	gpuTimingDeferredRenderStart(): void;
	gpuTimingDeferredRenderEnd(): void;
	gpuTimingEnd(): void;
	collectGpuTimers(): GPUTimers;
	collectDeferredRenderGpuQueries(): Array<any>;
	queryGpuTimers(gpuTimers: GPUTimers): {
		[layerId: string]: number;
	};
	queryGpuTimeDeferredRender(gpuQueries: Array<any>): number;
	/**
	 * Transform a matrix to incorporate the *-translate and *-translate-anchor properties into it.
	 * @param inViewportPixelUnitsUnits True when the units accepted by the matrix are in viewport pixels instead of tile units.
	 * @returns {Float32Array} matrix
	 * @private
	 */
	translatePosMatrix(matrix: Float32Array, tile: Tile, translate: [
		number,
		number
	], translateAnchor: "map" | "viewport", inViewportPixelUnitsUnits?: boolean): Float32Array;
	/**
	 * Saves the tile texture for re-use when another tile is loaded.
	 *
	 * @returns true if the tile was cached, false if the tile was not cached and should be destroyed.
	 * @private
	 */
	saveTileTexture(texture: Texture): void;
	getTileTexture(size: number): null | Texture;
	terrainRenderModeElevated(): boolean;
	linearFloatFilteringSupported(): boolean;
	/**
	 * Returns #defines that would need to be injected into every Program
	 * based on the current state of Painter.
	 *
	 * @returns {string[]}
	 * @private
	 */
	currentGlobalDefines(name: string, overrideFog?: boolean | null, overrideRtt?: boolean | null): string[];
	getOrCreateProgram(name: string, options?: CreateProgramParams): Program$1<any>;
	setCustomLayerDefaults(): void;
	setBaseState(): void;
	initDebugOverlayCanvas(): void;
	destroy(): void;
	prepareDrawTile(): void;
	uploadCommonLightUniforms(context: Context, program: Program$1<any>): void;
	uploadCommonUniforms(context: Context, program: Program$1<any>, tileID?: UnwrappedTileID | null, fogMatrix?: Float32Array | null, cutoffParams?: CutoffParams | null): void;
	setTileLoadedFlag(flag: boolean): void;
	saveCanvasCopy(): void;
	canvasCopy(): WebGLTexture | null | undefined;
	getCanvasCopiesAndTimestamps(): CanvasCopyInstances;
	averageElevationNeedsEasing(): boolean;
	getBackgroundTiles(): {
		[key: number]: Tile;
	};
	clearBackgroundTiles(): void;
	isSourceForClippingOrConflation(layer: StyleLayer, source?: Source | null): boolean;
	isTileAffectedByFog(id: OverscaledTileID): boolean;
}
type TextureDescriptor = {
	img: TextureImage;
	layer: string;
	band: string | number;
	tileSize: number;
	buffer: number;
	mix: [
		number,
		number,
		number,
		number
	];
	offset: number;
	format?: "uint8" | "uint16" | "uint32";
};
type MRTLayer = {
	version: number;
	name: string;
	units: string;
	tilesize: number;
	buffer: number;
	pixelFormat: "uint8" | "uint16" | "uint32";
	dataIndex: Partial<Record<string | number, any>>;
	hasBand: (arg1: string | number) => boolean;
	hasDataForBand: (arg1: string | number) => boolean;
	getDataRange: (arg1: Array<string | number>) => MRTDataRange;
	getBandView: (arg1: string | number) => MRTBandView;
};
type MRTBandView = {
	data: any;
	bytes: any;
	tileSize: number;
	buffer: number;
	offset: number;
	scale: number;
};
type MRTDataRange = {
	layerName: string;
	firstByte: number;
	lastByte: number;
	firstBlock: number;
	lastBlock: number;
};
type MRTDecodingBatch = {
	tasks: Array<MRTDecodingTask>;
	cancel: () => void;
	complete: (arg1?: Error | null | undefined, arg2?: ArrayBuffer | null | undefined) => void;
};
type MRTDecodingTask = {
	layerName: string;
	firstByte: number;
	lastByte: number;
	pixelFormat: "uint8" | "uint16" | "uint32";
	blockIndex: number;
	blockShape: Array<number>;
	buffer: number;
	codec: string;
	filters: Array<string>;
};
type MRT = {
	x: number;
	y: number;
	z: number;
	_cacheSize: number;
	layers: {
		[_: string]: MRTLayer;
	};
	getLayer(arg1: string): MRTLayer | null | undefined;
	parseHeader(arg1: ArrayBuffer): MRT;
	getHeaderLength(arg1: ArrayBuffer): number;
	createDecodingTask(arg1: MRTDataRange): MRTDecodingBatch;
};
declare class RasterArrayTile extends Tile {
	texture: Texture | null | undefined;
	entireBuffer: ArrayBuffer | null | undefined;
	requestParams: RequestParameters | null | undefined;
	_workQueue: Array<() => void>;
	_fetchQueue: Array<() => void>;
	fbo: Framebuffer | null | undefined;
	textureDescriptor: TextureDescriptor | null | undefined;
	_mrt: MRT | null | undefined;
	_isHeaderLoaded: boolean;
	constructor(tileID: OverscaledTileID, size: number, tileZoom: number, painter?: Painter | null, isRaster?: boolean);
	setTexture(img: TextureImage, painter: Painter): void;
	/**
	 * Stops existing fetches
	 * @private
	 */
	flushQueues(): void;
	fetchHeader(fetchLength: number | null | undefined, callback: ResponseCallback<ArrayBuffer | null | undefined>): Cancelable;
	fetchBand(sourceLayer: string, band: string | number, callback: Callback<TextureImage | null | undefined>): void;
	updateNeeded(sourceLayer: string, band: string | number): boolean;
	updateTextureDescriptor(sourceLayer: string, band: string | number): void;
}
export declare class RasterArrayTileSource extends RasterTileSource<"raster-array"> implements ISource {
	type: "raster-array";
	map: Map$1;
	rasterLayers: Array<SourceRasterLayer> | undefined;
	rasterLayerIds: Array<string> | undefined;
	constructor(id: string, options: RasterArraySourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
	triggerRepaint(tile: RasterArrayTile): void;
	loadTile(tile: Tile, callback: Callback<undefined>): void;
	unloadTile(tile: Tile, _?: Callback<undefined> | null): void;
	/**
	 * Prepare RasterArrayTile for the rendering. If tile doesn't have data
	 * for the requested band, fetch and repaint once it's acquired.
	 * @private
	 */
	prepareTile(tile: RasterArrayTile, sourceLayer: string, band: string | number): void;
	/**
	 * Get the initial band for a source layer.
	 * @private
	 */
	getInitialBand(sourceLayer: string): string | number | void;
	/**
	 * Get a texture descriptor for a source layer and a band.
	 * @private
	 * @param {RasterArrayTile} tile
	 * @param {RasterStyleLayer} layer
	 * @param {boolean} fallbackToPrevious If true, return previous texture even if update is needed
	 * @returns {TextureDescriptor} Texture descriptor with texture if available
	 */
	getTextureDescriptor(tile: RasterArrayTile, layer: RasterStyleLayer | RasterParticleStyleLayer, fallbackToPrevious: boolean): TextureDescriptor & {
		texture: Texture | null | undefined;
	} | void;
}
type GeoJSONWorkerOptions = {
	source: string;
	cluster: boolean;
	superclusterOptions?: any;
	geojsonVtOptions?: any;
	clusterProperties?: any;
	filter?: Array<unknown>;
	dynamic?: boolean;
};
/**
 * A source containing GeoJSON.
 * See the [Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/#sources-geojson) for detailed documentation of options.
 *
 * @example
 * map.addSource('some id', {
 *     type: 'geojson',
 *     data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson'
 * });
 *
 * @example
 * map.addSource('some id', {
 *     type: 'geojson',
 *     data: {
 *         "type": "FeatureCollection",
 *         "features": [{
 *             "type": "Feature",
 *             "properties": {},
 *             "geometry": {
 *                 "type": "Point",
 *                 "coordinates": [
 *                     -76.53063297271729,
 *                     39.18174077994108
 *                 ]
 *             }
 *         }]
 *     }
 * });
 *
 * @example
 * map.getSource('some id').setData({
 *     "type": "FeatureCollection",
 *     "features": [{
 *         "type": "Feature",
 *         "properties": {"name": "Null Island"},
 *         "geometry": {
 *             "type": "Point",
 *             "coordinates": [ 0, 0 ]
 *         }
 *     }]
 * });
 * @see [Example: Draw GeoJSON points](https://www.mapbox.com/mapbox-gl-js/example/geojson-markers/)
 * @see [Example: Add a GeoJSON line](https://www.mapbox.com/mapbox-gl-js/example/geojson-line/)
 * @see [Example: Create a heatmap from points](https://www.mapbox.com/mapbox-gl-js/example/heatmap/)
 * @see [Example: Create and style clusters](https://www.mapbox.com/mapbox-gl-js/example/cluster/)
 */
export declare class GeoJSONSource extends Evented<SourceEvents> implements ISource {
	type: "geojson";
	id: string;
	scope: string;
	minzoom: number;
	maxzoom: number;
	tileSize: number;
	minTileCacheSize: number | null | undefined;
	maxTileCacheSize: number | null | undefined;
	attribution: string | undefined;
	promoteId: PromoteIdSpecification | null | undefined;
	mapbox_logo: boolean | undefined;
	roundZoom: boolean | undefined;
	isTileClipped: boolean | undefined;
	reparseOverscaled: boolean | undefined;
	_data: GeoJSON.GeoJSON | string;
	_options: GeoJSONSourceSpecification;
	workerOptions: GeoJSONWorkerOptions;
	map: Map$1;
	actor: Actor;
	_loaded: boolean;
	_coalesce: boolean | null | undefined;
	_metadataFired: boolean | null | undefined;
	_collectResourceTiming: boolean;
	_pendingLoad: Cancelable | null | undefined;
	_partialReload: boolean;
	reload: undefined;
	hasTile: undefined;
	prepare: undefined;
	afterUpdate: undefined;
	_clear: undefined;
	/**
	 * @private
	 */
	constructor(id: string, options: GeoJSONSourceSpecification & {
		workerOptions?: GeoJSONWorkerOptions;
		collectResourceTiming: boolean;
	}, dispatcher: Dispatcher, eventedParent: Evented);
	onAdd(map: Map$1): void;
	/**
	 * Sets the GeoJSON data and re-renders the map.
	 *
	 * @param {Object | string} data A GeoJSON data object or a URL to one. The latter is preferable in the case of large GeoJSON files.
	 * @returns {GeoJSONSource} Returns itself to allow for method chaining.
	 * @example
	 * map.addSource('source_id', {
	 *     type: 'geojson',
	 *     data: {
	 *         type: 'FeatureCollection',
	 *         features: []
	 *     }
	 * });
	 * const geojsonSource = map.getSource('source_id');
	 * // Update the data after the GeoJSON source was created
	 * geojsonSource.setData({
	 *     "type": "FeatureCollection",
	 *     "features": [{
	 *         "type": "Feature",
	 *         "properties": {"name": "Null Island"},
	 *         "geometry": {
	 *             "type": "Point",
	 *             "coordinates": [ 0, 0 ]
	 *         }
	 *     }]
	 * });
	 */
	setData(data: GeoJSON.GeoJSON | string): this;
	/**
	 * Updates the existing GeoJSON data with new features and re-renders the map.
	 * Can only be used on sources with `dynamic: true` in options.
	 * Updates features by their IDs:
	 *
	 * - If there's a feature with the same ID, overwrite it.
	 * - If there's a feature with the same ID but the new one's geometry is `null`, remove it
	 * - If there's no such ID in existing data, add it as a new feature.
	 *
	 * @param {Object | string} data A GeoJSON data object or a URL to one.
	 * @returns {GeoJSONSource} Returns itself to allow for method chaining.
	 * @example
	 * // Update the feature with ID=123 in the existing GeoJSON source
	 * map.getSource('source_id').updateData({
	 *     "type": "FeatureCollection",
	 *     "features": [{
	 *         "id": 123,
	 *         "type": "Feature",
	 *         "properties": {"name": "Null Island"},
	 *         "geometry": {
	 *             "type": "Point",
	 *             "coordinates": [ 0, 0 ]
	 *         }
	 *     }]
	 * });
	 */
	updateData(data: GeoJSON.GeoJSON | string): this;
	/**
	 * For clustered sources, fetches the zoom at which the given cluster expands.
	 *
	 * @param {number} clusterId The value of the cluster's `cluster_id` property.
	 * @param {Function} callback A callback to be called when the zoom value is retrieved (`(error, zoom) => { ... }`).
	 * @returns {GeoJSONSource} Returns itself to allow for method chaining.
	 * @example
	 * // Assuming the map has a layer named 'clusters' and a source 'earthquakes'
	 * // The following creates a camera animation on cluster feature click
	 * // the clicked layer should be filtered to only include clusters, e.g. `filter: ['has', 'point_count']`
	 * map.on('click', 'clusters', (e) => {
	 *     const features = map.queryRenderedFeatures(e.point, {
	 *         layers: ['clusters']
	 *     });
	 *
	 *     const clusterId = features[0].properties.cluster_id;
	 *
	 *     // Ease the camera to the next cluster expansion
	 *     map.getSource('earthquakes').getClusterExpansionZoom(
	 *         clusterId,
	 *         (err, zoom) => {
	 *             if (!err) {
	 *                 map.easeTo({
	 *                     center: features[0].geometry.coordinates,
	 *                     zoom
	 *                 });
	 *             }
	 *         }
	 *     );
	 * });
	 */
	getClusterExpansionZoom(clusterId: number, callback: Callback<number>): this;
	/**
	 * For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
	 *
	 * @param {number} clusterId The value of the cluster's `cluster_id` property.
	 * @param {Function} callback A callback to be called when the features are retrieved (`(error, features) => { ... }`).
	 * @returns {GeoJSONSource} Returns itself to allow for method chaining.
	 * @example
	 * // Retrieve cluster children on click
	 * // the clicked layer should be filtered to only include clusters, e.g. `filter: ['has', 'point_count']`
	 * map.on('click', 'clusters', (e) => {
	 *     const features = map.queryRenderedFeatures(e.point, {
	 *         layers: ['clusters']
	 *     });
	 *
	 *     const clusterId = features[0].properties.cluster_id;
	 *
	 *     clusterSource.getClusterChildren(clusterId, (error, features) => {
	 *         if (!error) {
	 *             console.log('Cluster children:', features);
	 *         }
	 *     });
	 * });
	 */
	getClusterChildren(clusterId: number, callback: Callback<Array<GeoJSON.Feature>>): this;
	/**
	 * For clustered sources, fetches the original points that belong to the cluster (as an array of GeoJSON features).
	 *
	 * @param {number} clusterId The value of the cluster's `cluster_id` property.
	 * @param {number} limit The maximum number of features to return. Defaults to `10` if a falsy value is given.
	 * @param {number} offset The number of features to skip (for example, for pagination). Defaults to `0` if a falsy value is given.
	 * @param {Function} callback A callback to be called when the features are retrieved (`(error, features) => { ... }`).
	 * @returns {GeoJSONSource} Returns itself to allow for method chaining.
	 * @example
	 * // Retrieve cluster leaves on click
	 * // the clicked layer should be filtered to only include clusters, e.g. `filter: ['has', 'point_count']`
	 * map.on('click', 'clusters', (e) => {
	 *     const features = map.queryRenderedFeatures(e.point, {
	 *         layers: ['clusters']
	 *     });
	 *
	 *     const clusterId = features[0].properties.cluster_id;
	 *     const pointCount = features[0].properties.point_count;
	 *     const clusterSource = map.getSource('clusters');
	 *
	 *     clusterSource.getClusterLeaves(clusterId, pointCount, 0, (error, features) => {
	 *     // Print cluster leaves in the console
	 *         console.log('Cluster leaves:', error, features);
	 *     });
	 * });
	 */
	getClusterLeaves(clusterId: number, limit: number, offset: number, callback: Callback<Array<GeoJSON.Feature>>): this;
	_updateWorkerData(append?: boolean): void;
	loaded(): boolean;
	loadTile(tile: Tile, callback: Callback<undefined>): void;
	abortTile(tile: Tile): void;
	unloadTile(tile: Tile, _?: Callback<undefined> | null): void;
	onRemove(_: Map$1): void;
	serialize(): GeoJSONSourceSpecification;
	hasTransition(): boolean;
}
type CanvasSourceSpecification = {
	["type"]: "canvas";
	["coordinates"]: [
		[
			number,
			number
		],
		[
			number,
			number
		],
		[
			number,
			number
		],
		[
			number,
			number
		]
	];
	["animate"]?: boolean;
	["canvas"]: string | HTMLCanvasElement;
};
/**
 * Options to add a canvas source type to the map.
 *
 * @typedef {Object} CanvasSourceOptions
 * @property {string} type Source type. Must be `"canvas"`.
 * @property {string|HTMLCanvasElement} canvas Canvas source from which to read pixels. Can be a string representing the ID of the canvas element, or the `HTMLCanvasElement` itself.
 * @property {Array<Array<number>>} coordinates Four geographical coordinates denoting where to place the corners of the canvas, specified in `[longitude, latitude]` pairs.
 * @property {boolean} [animate=true] Whether the canvas source is animated. If the canvas is static (pixels do not need to be re-read on every frame), `animate` should be set to `false` to improve performance.
 */
/**
 * A data source containing the contents of an HTML canvas. See {@link CanvasSourceOptions} for detailed documentation of options.
 *
 * @example
 * // add to map
 * map.addSource('some id', {
 *     type: 'canvas',
 *     canvas: 'idOfMyHTMLCanvas',
 *     animate: true,
 *     coordinates: [
 *         [-76.54, 39.18],
 *         [-76.52, 39.18],
 *         [-76.52, 39.17],
 *         [-76.54, 39.17]
 *     ]
 * });
 *
 * // update
 * const mySource = map.getSource('some id');
 * mySource.setCoordinates([
 *     [-76.54335737228394, 39.18579907229748],
 *     [-76.52803659439087, 39.1838364847587],
 *     [-76.5295386314392, 39.17683392507606],
 *     [-76.54520273208618, 39.17876344106642]
 * ]);
 *
 * map.removeSource('some id');  // remove
 * @see [Example: Add a canvas source](https://docs.mapbox.com/mapbox-gl-js/example/canvas-source/)
 */
export declare class CanvasSource extends ImageSource<"canvas"> {
	type: "canvas";
	options: CanvasSourceSpecification;
	animate: boolean;
	canvas: HTMLCanvasElement;
	play: () => void;
	pause: () => void;
	_playing: boolean;
	/**
	 * @private
	 */
	constructor(id: string, options: CanvasSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
	/**
	 * Enables animation. The image will be copied from the canvas to the map on each frame.
	 *
	 * @method play
	 * @instance
	 * @memberof CanvasSource
	 */
	/**
	 * Disables animation. The map will display a static copy of the canvas image.
	 *
	 * @method pause
	 * @instance
	 * @memberof CanvasSource
	 */
	load(): void;
	/**
	 * Returns the HTML `canvas` element.
	 *
	 * @returns {HTMLCanvasElement} The HTML `canvas` element.
	 * @example
	 * // Assuming the following canvas is added to your page
	 * // <canvas id="canvasID" width="400" height="400"></canvas>
	 * map.addSource('canvas-source', {
	 *     type: 'canvas',
	 *     canvas: 'canvasID',
	 *     coordinates: [
	 *         [91.4461, 21.5006],
	 *         [100.3541, 21.5006],
	 *         [100.3541, 13.9706],
	 *         [91.4461, 13.9706]
	 *     ]
	 * });
	 * map.getSource('canvas-source').getCanvas(); // <canvas id="canvasID" width="400" height="400"></canvas>
	 */
	getCanvas(): HTMLCanvasElement;
	onAdd(map: Map$1): void;
	onRemove(_: Map$1): void;
	/**
	 * Sets the canvas's coordinates and re-renders the map.
	 *
	 * @method setCoordinates
	 * @instance
	 * @memberof CanvasSource
	 * @param {Array<Array<number>>} coordinates Four geographical coordinates,
	 * represented as arrays of longitude and latitude numbers, which define the corners of the canvas.
	 * The coordinates start at the top left corner of the canvas and proceed in clockwise order.
	 * They do not have to represent a rectangle.
	 * @returns {CanvasSource} Returns itself to allow for method chaining.
	 */
	prepare(): void;
	serialize(): any;
	hasTransition(): boolean;
	_hasInvalidDimensions(): boolean;
}
type Coordinates = [
	[
		number,
		number
	],
	[
		number,
		number
	],
	[
		number,
		number
	],
	[
		number,
		number
	]
];
type ImageSourceTexture = {
	dimensions: [
		number,
		number
	];
	handle: WebGLTexture;
};
/**
 * A data source containing an image.
 * See the [Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/#sources-image) for detailed documentation of options.
 *
 * @example
 * // add to map
 * map.addSource('some id', {
 *     type: 'image',
 *     url: 'https://www.mapbox.com/images/foo.png',
 *     coordinates: [
 *         [-76.54, 39.18],
 *         [-76.52, 39.18],
 *         [-76.52, 39.17],
 *         [-76.54, 39.17]
 *     ]
 * });
 *
 * // update coordinates
 * const mySource = map.getSource('some id');
 * mySource.setCoordinates([
 *     [-76.54335737228394, 39.18579907229748],
 *     [-76.52803659439087, 39.1838364847587],
 *     [-76.5295386314392, 39.17683392507606],
 *     [-76.54520273208618, 39.17876344106642]
 * ]);
 *
 * // update url and coordinates simultaneously
 * mySource.updateImage({
 *     url: 'https://www.mapbox.com/images/bar.png',
 *     coordinates: [
 *         [-76.54335737228394, 39.18579907229748],
 *         [-76.52803659439087, 39.1838364847587],
 *         [-76.5295386314392, 39.17683392507606],
 *         [-76.54520273208618, 39.17876344106642]
 *     ]
 * });
 *
 * map.removeSource('some id');  // remove
 * @see [Example: Add an image](https://www.mapbox.com/mapbox-gl-js/example/image-on-a-map/)
 * @see [Example: Animate a series of images](https://www.mapbox.com/mapbox-gl-js/example/animate-images/)
 */
export declare class ImageSource<T extends "image" | "canvas" | "video" = "image"> extends Evented<SourceEvents> implements ISource {
	type: T;
	id: string;
	scope: string;
	minzoom: number;
	maxzoom: number;
	tileSize: number;
	url: string | null | undefined;
	width: number;
	height: number;
	minTileCacheSize: number | null | undefined;
	maxTileCacheSize: number | null | undefined;
	roundZoom: boolean | undefined;
	reparseOverscaled: boolean | undefined;
	attribution: string | undefined;
	mapbox_logo: boolean | undefined;
	coordinates: Coordinates;
	tiles: {
		[_: string]: Tile;
	};
	options: any;
	dispatcher: Dispatcher;
	map: Map$1;
	texture: Texture | UserManagedTexture | null;
	image: HTMLImageElement | ImageBitmap | ImageData;
	tileID?: CanonicalTileID;
	onNorthPole: boolean;
	onSouthPole: boolean;
	_unsupportedCoords: boolean;
	_boundsArray: StructArrayLayout4i8 | null | undefined;
	boundsBuffer: VertexBuffer | null | undefined;
	boundsSegments: SegmentVector | null | undefined;
	elevatedGlobeVertexBuffer: VertexBuffer | null | undefined;
	elevatedGlobeIndexBuffer: IndexBuffer | null | undefined;
	elevatedGlobeSegments: SegmentVector | null | undefined;
	elevatedGlobeTrianglesCenterLongitudes: number[] | null | undefined;
	maxLongitudeTriangleSize: number;
	elevatedGlobeGridMatrix: Float32Array | null | undefined;
	_loaded: boolean;
	_dirty: boolean;
	_imageRequest: Cancelable | null | undefined;
	perspectiveTransform: [
		number,
		number
	];
	elevatedGlobePerspectiveTransform: [
		number,
		number
	];
	reload: undefined;
	abortTile: undefined;
	unloadTile: undefined;
	hasTile: undefined;
	afterUpdate: undefined;
	/**
	 * @private
	 */
	constructor(id: string, options: ImageSourceSpecification | VideoSourceSpecification | CanvasSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
	load(newCoordinates?: Coordinates, loaded?: boolean): void;
	loaded(): boolean;
	/**
	 * Updates the image URL and, optionally, the coordinates. To avoid having the image flash after changing,
	 * set the `raster-fade-duration` paint property on the raster layer to 0.
	 *
	 * @param {Object} options Options object.
	 * @param {string} [options.url] Required image URL.
	 * @param {Array<Array<number>>} [options.coordinates] Four geographical coordinates,
	 * represented as arrays of longitude and latitude numbers, which define the corners of the image.
	 * The coordinates start at the top left corner of the image and proceed in clockwise order.
	 * They do not have to represent a rectangle.
	 * @returns {ImageSource} Returns itself to allow for method chaining.
	 * @example
	 * // Add to an image source to the map with some initial URL and coordinates
	 * map.addSource('image_source_id', {
	 *     type: 'image',
	 *     url: 'https://www.mapbox.com/images/foo.png',
	 *     coordinates: [
	 *         [-76.54, 39.18],
	 *         [-76.52, 39.18],
	 *         [-76.52, 39.17],
	 *         [-76.54, 39.17]
	 *     ]
	 * });
	 * // Then update the image URL and coordinates
	 * imageSource.updateImage({
	 *     url: 'https://www.mapbox.com/images/bar.png',
	 *     coordinates: [
	 *         [-76.5433, 39.1857],
	 *         [-76.5280, 39.1838],
	 *         [-76.5295, 39.1768],
	 *         [-76.5452, 39.1787]
	 *     ]
	 * });
	 */
	updateImage(options: {
		url: string;
		coordinates?: Coordinates;
	}): this;
	setTexture(texture: ImageSourceTexture): this;
	_finishLoading(): void;
	onAdd(map: Map$1): void;
	onRemove(_: Map$1): void;
	/**
	 * Sets the image's coordinates and re-renders the map.
	 *
	 * @param {Array<Array<number>>} coordinates Four geographical coordinates,
	 * represented as arrays of longitude and latitude numbers, which define the corners of the image.
	 * The coordinates start at the top left corner of the image and proceed in clockwise order.
	 * They do not have to represent a rectangle.
	 * @returns {ImageSource} Returns itself to allow for method chaining.
	 * @example
	 * // Add an image source to the map with some initial coordinates
	 * map.addSource('image_source_id', {
	 *     type: 'image',
	 *     url: 'https://www.mapbox.com/images/foo.png',
	 *     coordinates: [
	 *         [-76.54, 39.18],
	 *         [-76.52, 39.18],
	 *         [-76.52, 39.17],
	 *         [-76.54, 39.17]
	 *     ]
	 * });
	 * // Then update the image coordinates
	 * imageSource.setCoordinates([
	 *     [-76.5433, 39.1857],
	 *     [-76.5280, 39.1838],
	 *     [-76.5295, 39.1768],
	 *     [-76.5452, 39.1787]
	 * ]);
	 */
	setCoordinates(coordinates: Coordinates): this;
	_clear(): void;
	_prepareData(context: Context): void;
	prepare(): void;
	loadTile(tile: Tile, callback: Callback<undefined>): void;
	serialize(): any;
	hasTransition(): boolean;
	getSegmentsForLongitude(longitude: number): SegmentVector | null | undefined;
}
/**
 * A data source containing video.
 * See the [Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/#sources-video) for detailed documentation of options.
 *
 * @example
 * // add to map
 * map.addSource('some id', {
 *     type: 'video',
 *     url: [
 *         'https://www.mapbox.com/blog/assets/baltimore-smoke.mp4',
 *         'https://www.mapbox.com/blog/assets/baltimore-smoke.webm'
 *     ],
 *     coordinates: [
 *         [-76.54, 39.18],
 *         [-76.52, 39.18],
 *         [-76.52, 39.17],
 *         [-76.54, 39.17]
 *     ]
 * });
 *
 * // update
 * const mySource = map.getSource('some id');
 * mySource.setCoordinates([
 *     [-76.54335737228394, 39.18579907229748],
 *     [-76.52803659439087, 39.1838364847587],
 *     [-76.5295386314392, 39.17683392507606],
 *     [-76.54520273208618, 39.17876344106642]
 * ]);
 *
 * map.removeSource('some id');  // remove
 * @see [Example: Add a video](https://www.mapbox.com/mapbox-gl-js/example/video-on-a-map/)
 */
export declare class VideoSource extends ImageSource<"video"> {
	type: "video";
	options: VideoSourceSpecification;
	urls: Array<string>;
	video: HTMLVideoElement;
	/**
	 * @private
	 */
	constructor(id: string, options: VideoSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
	load(): void;
	/**
	 * Pauses the video.
	 *
	 * @example
	 * // Assuming a video source identified by video_source_id was added to the map
	 * const videoSource = map.getSource('video_source_id');
	 *
	 * // Pauses the video
	 * videoSource.pause();
	 */
	pause(): void;
	/**
	 * Plays the video.
	 *
	 * @example
	 * // Assuming a video source identified by video_source_id was added to the map
	 * const videoSource = map.getSource('video_source_id');
	 *
	 * // Starts the video
	 * videoSource.play();
	 */
	play(): void;
	/**
	 * Sets playback to a timestamp, in seconds.
	 * @private
	 */
	seek(seconds: number): void;
	/**
	 * Returns the HTML `video` element.
	 *
	 * @returns {HTMLVideoElement} The HTML `video` element.
	 * @example
	 * // Assuming a video source identified by video_source_id was added to the map
	 * const videoSource = map.getSource('video_source_id');
	 *
	 * videoSource.getVideo(); // <video crossorigin="Anonymous" loop="">...</video>
	 */
	getVideo(): HTMLVideoElement;
	onAdd(map: Map$1): void;
	/**
	 * Sets the video's coordinates and re-renders the map.
	 *
	 * @method setCoordinates
	 * @instance
	 * @memberof VideoSource
	 * @returns {VideoSource} Returns itself to allow for method chaining.
	 * @example
	 * // Add a video source to the map to map
	 * map.addSource('video_source_id', {
	 *     type: 'video',
	 *     urls: [
	 *         'https://www.mapbox.com/blog/assets/baltimore-smoke.mp4',
	 *         'https://www.mapbox.com/blog/assets/baltimore-smoke.webm'
	 *     ],
	 *     coordinates: [
	 *         [-76.54, 39.18],
	 *         [-76.52, 39.18],
	 *         [-76.52, 39.17],
	 *         [-76.54, 39.17]
	 *     ]
	 * });
	 *
	 * // Then update the video source coordinates by new coordinates
	 * const videoSource = map.getSource('video_source_id');
	 * videoSource.setCoordinates([
	 *     [-76.5433, 39.1857],
	 *     [-76.5280, 39.1838],
	 *     [-76.5295, 39.1768],
	 *     [-76.5452, 39.1787]
	 * ]);
	 */
	prepare(): void;
	serialize(): VideoSourceSpecification;
	hasTransition(): boolean;
}
/**
 * A source containing single models.
 */
export declare class ModelSource extends Evented<SourceEvents> implements ISource {
	type: "model";
	id: string;
	scope: string;
	minzoom: number;
	maxzoom: number;
	tileSize: number;
	minTileCacheSize: number | null | undefined;
	maxTileCacheSize: number | null | undefined;
	roundZoom: boolean | undefined;
	reparseOverscaled: boolean | undefined;
	attribution: string | undefined;
	mapbox_logo: boolean | undefined;
	map: Map$1;
	uri: string;
	models: Array<Model>;
	_options: ModelSourceSpecification;
	_loaded: boolean;
	onRemove: undefined;
	reload: undefined;
	abortTile: undefined;
	unloadTile: undefined;
	hasTile: undefined;
	prepare: undefined;
	afterUpdate: undefined;
	_clear: undefined;
	/**
	 * @private
	 */
	constructor(id: string, options: ModelSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
	load(): Promise<void>;
	onAdd(map: Map$1): void;
	hasTransition(): boolean;
	loaded(): boolean;
	getModels(): Array<Model>;
	loadTile(tile: Tile, callback: Callback<undefined>): void;
	serialize(): any;
}
export declare class Tiled3DModelSource extends Evented<SourceEvents> implements ISource {
	type: "batched-model";
	id: string;
	scope: string;
	minzoom: number;
	maxzoom: number;
	tileBounds: TileBounds;
	roundZoom: boolean | undefined;
	reparseOverscaled: boolean | undefined;
	usedInConflation: boolean;
	tileSize: number;
	minTileCacheSize: number | null | undefined;
	maxTileCacheSize: number | null | undefined;
	attribution: string | undefined;
	mapbox_logo: boolean | undefined;
	tiles: Array<string>;
	dispatcher: Dispatcher;
	scheme: string;
	_loaded: boolean;
	_options: ModelSourceSpecification;
	_tileJSONRequest: Cancelable | null | undefined;
	map: Map$1;
	onRemove: undefined;
	reload: undefined;
	abortTile: undefined;
	unloadTile: undefined;
	prepare: undefined;
	afterUpdate: undefined;
	_clear: undefined;
	/**
	 * @private
	 */
	constructor(id: string, options: ModelSourceSpecification, dispatcher: Dispatcher, eventedParent: Evented);
	onAdd(map: Map$1): void;
	load(callback?: Callback<undefined>): void;
	hasTransition(): boolean;
	hasTile(tileID: OverscaledTileID): boolean;
	loaded(): boolean;
	loadTile(tile: Tile, callback: Callback<undefined>): void;
	serialize(): ModelSourceSpecification;
}
type DataType = "raster";
interface CustomSourceInterface<T> extends Evented {
	id: string;
	type: "custom";
	dataType: DataType | null | undefined;
	minzoom: number | null | undefined;
	maxzoom: number | null | undefined;
	scheme: string | null | undefined;
	tileSize: number | null | undefined;
	minTileCacheSize: number | null | undefined;
	maxTileCacheSize: number | null | undefined;
	attribution: string | null | undefined;
	mapbox_logo: boolean | undefined;
	bounds: [
		number,
		number,
		number,
		number
	] | null | undefined;
	hasTile: (tileID: {
		z: number;
		x: number;
		y: number;
	}) => boolean | null | undefined;
	loadTile: (tileID: {
		z: number;
		x: number;
		y: number;
	}, options: {
		signal: AbortSignal;
	}) => Promise<T | null | undefined>;
	unloadTile: (tileID: {
		z: number;
		x: number;
		y: number;
	}) => void | null | undefined;
	onAdd: (map: Map$1) => void | null | undefined;
	onRemove: (map: Map$1) => void | null | undefined;
}
export declare class CustomSource<T> extends Evented<SourceEvents> implements ISource {
	id: string;
	scope: string;
	type: "custom";
	scheme: string;
	minzoom: number;
	maxzoom: number;
	tileSize: number;
	attribution: string | undefined;
	mapbox_logo: boolean | undefined;
	roundZoom: boolean | undefined;
	tileBounds: TileBounds | null | undefined;
	minTileCacheSize: number | null | undefined;
	maxTileCacheSize: number | null | undefined;
	reparseOverscaled: boolean | undefined;
	map: Map$1;
	_loaded: boolean;
	_dispatcher: Dispatcher;
	_dataType: DataType | null | undefined;
	_implementation: CustomSourceInterface<T>;
	reload: undefined;
	prepare: undefined;
	afterUpdate: undefined;
	_clear: undefined;
	constructor(id: string, implementation: CustomSourceInterface<T>, dispatcher: Dispatcher, eventedParent: Evented);
	serialize(): Pick<this, "type" | "scheme" | "minzoom" | "maxzoom" | "attribution" | "tileSize">;
	load(): void;
	loaded(): boolean;
	onAdd(map: Map$1): void;
	onRemove(map: Map$1): void;
	hasTile(tileID: OverscaledTileID): boolean;
	loadTile(tile: Tile, callback: Callback<undefined>): void;
	loadTileData(tile: Tile, data: T): void;
	unloadTile(tile: Tile, callback?: Callback<undefined>): void;
	abortTile(tile: Tile, callback?: Callback<undefined>): void;
	hasTransition(): boolean;
	_coveringTiles(): {
		z: number;
		x: number;
		y: number;
	}[];
	_clearTiles(): void;
	_update(): void;
}
export type Source = VectorTileSource | RasterTileSource | RasterDEMTileSource | RasterArrayTileSource | GeoJSONSource | VideoSource | ImageSource | CanvasSource | CustomSource<ImageData | ImageBitmap | HTMLCanvasElement | HTMLImageElement> | ModelSource | Tiled3DModelSource;
type MapMouseEventType = "mousedown" | "mouseup" | "preclick" | "click" | "dblclick" | "mousemove" | "mouseover" | "mouseenter" | "mouseleave" | "mouseout" | "contextmenu";
export declare class MapMouseEvent extends Event$1<MapEvents, MapMouseEventType> {
	/**
	 * The type of originating event. For a full list of available events, see [`Map` events](/mapbox-gl-js/api/map/#map-events).
	 */
	type: MapMouseEventType;
	/**
	 * The `Map` object that fired the event.
	 */
	target: Map$1;
	/**
	 * The DOM event which caused the map event.
	 */
	originalEvent: MouseEvent;
	/**
	 * The pixel coordinates of the mouse cursor, relative to the map and measured from the top left corner.
	 */
	point: Point;
	/**
	 * The geographic location on the map of the mouse cursor.
	 */
	lngLat: LngLat;
	/**
	 * If a single `layerId`(as a single string) or multiple `layerIds` (as an array of strings) were specified when adding the event listener with {@link Map#on},
	 * `features` will be an array of [GeoJSON](http://geojson.org/) [Feature objects](https://tools.ietf.org/html/rfc7946#section-3.2).
	 * The array will contain all features from that layer that are rendered at the event's point,
	 * in the order that they are rendered with the topmost feature being at the start of the array.
	 * The `features` are identical to those returned by {@link Map#queryRenderedFeatures}.
	 *
	 * If no `layerId` was specified when adding the event listener, `features` will be `undefined`.
	 * You can get the features at the point with `map.queryRenderedFeatures(e.point)`.
	 *
	 * @example
	 * // logging features for a specific layer (with `e.features`)
	 * map.on('click', 'myLayerId', (e) => {
	 *     console.log(`There are ${e.features.length} features at point ${e.point}`);
	 * });
	 *
	 * @example
	 * // logging features for two layers (with `e.features`)
	 * map.on('click', ['layer1', 'layer2'], (e) => {
	 *     console.log(`There are ${e.features.length} features at point ${e.point}`);
	 * });
	 *
	 * @example
	 * // logging all features for all layers (without `e.features`)
	 * map.on('click', (e) => {
	 *     const features = map.queryRenderedFeatures(e.point);
	 *     console.log(`There are ${features.length} features at point ${e.point}`);
	 * });
	 */
	features?: Array<GeoJSONFeature>;
	/**
	 * Prevents subsequent default processing of the event by the map.
	 *
	 * Calling this method will prevent the following default map behaviors:
	 *
	 *   * On `mousedown` events, the behavior of {@link DragPanHandler}.
	 *   * On `mousedown` events, the behavior of {@link DragRotateHandler}.
	 *   * On `mousedown` events, the behavior of {@link BoxZoomHandler}.
	 *   * On `dblclick` events, the behavior of {@link DoubleClickZoomHandler}.
	 *
	 * @example
	 * map.on('click', (e) => {
	 *     e.preventDefault();
	 * });
	 */
	preventDefault(): void;
	/**
	 * `true` if `preventDefault` has been called.
	 * @private
	 */
	get defaultPrevented(): boolean;
	/**
	 * @private
	 */
	_defaultPrevented: boolean;
	/**
	 * @private
	 */
	constructor(type: MapMouseEventType, map: Map$1, originalEvent: MouseEvent, data?: EventData);
}
type MapTouchEventType = "touchstart" | "touchend" | "touchcancel";
export declare class MapTouchEvent extends Event$1<MapEvents, MapTouchEventType> {
	/**
	 * The type of originating event. For a full list of available events, see [`Map` events](/mapbox-gl-js/api/map/#map-events).
	 */
	type: MapTouchEventType;
	/**
	 * The `Map` object that fired the event.
	 */
	target: Map$1;
	/**
	 * The DOM event which caused the map event.
	 */
	originalEvent: TouchEvent;
	/**
	 * The geographic location on the map of the center of the touch event points.
	 */
	lngLat: LngLat;
	/**
	 * The pixel coordinates of the center of the touch event points, relative to the map and measured from the top left
	 * corner.
	 */
	point: Point;
	/**
	 * The array of pixel coordinates corresponding to a
	 * [touch event's `touches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches) property.
	 */
	points: Array<Point>;
	/**
	 * The geographical locations on the map corresponding to a
	 * [touch event's `touches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches) property.
	 */
	lngLats: Array<LngLat>;
	/**
	 * If a `layerId` was specified when adding the event listener with {@link Map#on}, `features` will be an array of
	 * [GeoJSON](http://geojson.org/) [Feature objects](https://tools.ietf.org/html/rfc7946#section-3.2).
	 * The array will contain all features from that layer that are rendered at the event's point.
	 * The `features` are identical to those returned by {@link Map#queryRenderedFeatures}.
	 *
	 * If no `layerId` was specified when adding the event listener, `features` will be `undefined`.
	 * You can get the features at the point with `map.queryRenderedFeatures(e.point)`.
	 *
	 * @example
	 * // logging features for a specific layer (with `e.features`)
	 * map.on('touchstart', 'myLayerId', (e) => {
	 *     console.log(`There are ${e.features.length} features at point ${e.point}`);
	 * });
	 *
	 * @example
	 * // logging all features for all layers (without `e.features`)
	 * map.on('touchstart', (e) => {
	 *     const features = map.queryRenderedFeatures(e.point);
	 *     console.log(`There are ${features.length} features at point ${e.point}`);
	 * });
	 */
	features: Array<GeoJSONFeature> | undefined;
	/**
	 * Prevents subsequent default processing of the event by the map.
	 *
	 * Calling this method will prevent the following default map behaviors:
	 *
	 *   * On `touchstart` events, the behavior of {@link DragPanHandler}.
	 *   * On `touchstart` events, the behavior of {@link TouchZoomRotateHandler}.
	 *
	 * @example
	 * map.on('touchstart', (e) => {
	 *     e.preventDefault();
	 * });
	 */
	preventDefault(): void;
	/**
	 * Returns `true` if `preventDefault` has been called.
	 * @private
	 */
	get defaultPrevented(): boolean;
	_defaultPrevented: boolean;
	/**
	 * @private
	 */
	constructor(type: MapTouchEventType, map: Map$1, originalEvent: TouchEvent);
}
/**
 * `MapWheelEvent` is a class used by other classes to generate
 * mouse events of specific types such as 'wheel'.
 * For a full list of available events, see [`Map` events](/mapbox-gl-js/api/map/#map-events).
 *
 * @extends {Object}
 * @example
 * // Example event trigger for a MapWheelEvent of type "wheel"
 * map.on('wheel', (e) => {
 *     console.log('event type:', e.type);
 *     // event type: wheel
 * });
 * @example
 * // Example of a MapWheelEvent of type "wheel"
 * // {
 * //   originalEvent: WheelEvent {...},
 * // 	 target: Map {...},
 * // 	 type: "wheel"
 * // }
 * @see [Reference: `Map` events API documentation](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-events)
 */
export declare class MapWheelEvent extends Event$1<MapEvents, "wheel"> {
	/**
	 * The type of originating event. For a full list of available events, see [`Map` events](/mapbox-gl-js/api/map/#map-events).
	 */
	type: "wheel";
	/**
	 * The `Map` object that fired the event.
	 */
	target: Map$1;
	/**
	 * The DOM event which caused the map event.
	 */
	originalEvent: WheelEvent;
	/**
	 * Prevents subsequent default processing of the event by the map.
	 * Calling this method will prevent the the behavior of {@link ScrollZoomHandler}.
	 *
	 * @example
	 * map.on('wheel', (e) => {
	 *     // Prevent the default map scroll zoom behavior.
	 *     e.preventDefault();
	 * });
	 */
	preventDefault(): void;
	/**
	 * `true` if `preventDefault` has been called.
	 * @private
	 */
	get defaultPrevented(): boolean;
	_defaultPrevented: boolean;
	/**
	 * @private
	 */
	constructor(map: Map$1, originalEvent: WheelEvent);
}
export type MapStyleDataEvent = {
	dataType: "style";
};
export type MapSourceDataEvent = {
	dataType: "source";
	isSourceLoaded?: boolean;
	source?: SourceSpecification;
	sourceId?: string;
	sourceCacheId?: string;
	sourceDataType?: "metadata" | "content" | "visibility" | "error";
	tile?: Tile;
	coord?: Tile["tileID"];
};
/**
 * `MapDataEvent` is a type of events related to loading data, styles, and sources.
 * For a full list of available events, see [`Map` events](/mapbox-gl-js/api/map/#map-events).
 *
 * @typedef {Object} MapDataEvent
 * @property {('data' | 'dataloading' | 'styledata' | 'styledataloading' | 'sourcedata'| 'sourcedataloading')} type The type of originating event. For a full list of available events, see [`Map` events](/mapbox-gl-js/api/map/#map-events).
 * @property {('source' | 'style')} dataType The type of data that has changed. One of `'source'` or `'style'`, where `'source'` refers to the data associated with any source, and `'style'` refers to the entire [style](https://docs.mapbox.com/help/glossary/style/) used by the map.
 * @property {boolean} [isSourceLoaded] True if the event has a `dataType` of `source` and the source has no outstanding network requests.
 * @property {Object} [source] The [style spec representation of the source](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/) if the event has a `dataType` of `source`.
 * @property {string} [sourceId] The `id` of the [`source`](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/) that triggered the event, if the event has a `dataType` of `source`. Same as the `id` of the object in the `source` property.
 * @property {string} [sourceDataType] Included if the event has a `dataType` of `source` and the event signals
 * that internal data has been received or changed. Possible values are `metadata`, `content` and `visibility`, and `error`.
 * @property {Object} [tile] The tile being loaded or changed, if the event has a `dataType` of `source` and
 * the event is related to loading of a tile.
 * @property {Coordinate} [coord] The coordinate of the tile if the event has a `dataType` of `source` and
 * the event is related to loading of a tile.
 * @example
 * // Example of a MapDataEvent of type "sourcedata"
 * map.on('sourcedata', (e) => {
 *     console.log(e);
 *     // {
 *     //   dataType: "source",
 *     //   isSourceLoaded: false,
 *     //   source: {
 *     //     type: "vector",
 *     //     url: "mapbox://mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2"
 *     //   },
 *     //   sourceDataType: "visibility",
 *     //   sourceId: "composite",
 *     //   style: {...},
 *     //   target: {...},
 *     //   type: "sourcedata"
 *     // }
 * });
 * @see [Reference: `Map` events API documentation](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-events)
 * @see [Example: Change a map's style](https://docs.mapbox.com/mapbox-gl-js/example/setstyle/)
 * @see [Example: Add a GeoJSON line](https://docs.mapbox.com/mapbox-gl-js/example/geojson-line/)
 */
export type MapDataEvent = MapStyleDataEvent | MapSourceDataEvent;
export type MapContextEvent = MapEventOf<"webglcontextlost" | "webglcontextrestored">;
export type MapEvents = {
	/** @section {Interaction}
	 * @event
	 * @instance
	 * @memberof Map
	 */
	/**
	 * Fired when a pointing device (usually a mouse) is pressed within the map.
	 *
	 * **Note:** This event is compatible with the optional `layerId` parameter.
	 * If `layerId` is included as the second argument in {@link Map#on}, the event listener will fire only when the
	 * the cursor is pressed while inside a visible portion of the specifed layer.
	 *
	 * @event mousedown
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener
	 * map.on('mousedown', () => {
	 *     console.log('A mousedown event has occurred.');
	 * });
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener for a specific layer
	 * map.on('mousedown', 'poi-label', () => {
	 *     console.log('A mousedown event has occurred on a visible portion of the poi-label layer.');
	 * });
	 * @see [Example: Highlight features within a bounding box](https://docs.mapbox.com/mapbox-gl-js/example/using-box-queryrenderedfeatures/)
	 * @see [Example: Create a draggable point](https://docs.mapbox.com/mapbox-gl-js/example/drag-a-point/)
	 */
	"mousedown": MapMouseEvent;
	/**
	 * Fired when a pointing device (usually a mouse) is released within the map.
	 *
	 * **Note:** This event is compatible with the optional `layerId` parameter.
	 * If `layerId` is included as the second argument in {@link Map#on}, the event listener will fire only when the
	 * the cursor is released while inside a visible portion of the specifed layer.
	 *
	 * @event mouseup
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener
	 * map.on('mouseup', () => {
	 *     console.log('A mouseup event has occurred.');
	 * });
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener for a specific layer
	 * map.on('mouseup', 'poi-label', () => {
	 *     console.log('A mouseup event has occurred on a visible portion of the poi-label layer.');
	 * });
	 * @see [Example: Highlight features within a bounding box](https://docs.mapbox.com/mapbox-gl-js/example/using-box-queryrenderedfeatures/)
	 * @see [Example: Create a draggable point](https://docs.mapbox.com/mapbox-gl-js/example/drag-a-point/)
	 */
	"mouseup": MapMouseEvent;
	/**
	 * Fired when a pointing device (usually a mouse) is moved within the map.
	 * As you move the cursor across a web page containing a map,
	 * the event will fire each time it enters the map or any child elements.
	 *
	 * **Note:** This event is compatible with the optional `layerId` parameter.
	 * If `layerId` is included as the second argument in {@link Map#on}, the event listener will fire only when the
	 * the cursor is moved inside a visible portion of the specifed layer.
	 *
	 * @event mouseover
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener
	 * map.on('mouseover', () => {
	 *     console.log('A mouseover event has occurred.');
	 * });
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener for a specific layer
	 * map.on('mouseover', 'poi-label', () => {
	 *     console.log('A mouseover event has occurred on a visible portion of the poi-label layer.');
	 * });
	 * @see [Example: Get coordinates of the mouse pointer](https://www.mapbox.com/mapbox-gl-js/example/mouse-position/)
	 * @see [Example: Highlight features under the mouse pointer](https://www.mapbox.com/mapbox-gl-js/example/hover-styles/)
	 * @see [Example: Display a popup on hover](https://www.mapbox.com/mapbox-gl-js/example/popup-on-hover/)
	 */
	"mouseover": MapMouseEvent;
	/**
	 * Fired when a pointing device (usually a mouse) is moved while the cursor is inside the map.
	 * As you move the cursor across the map, the event will fire every time the cursor changes position within the map.
	 *
	 * **Note:** This event is compatible with the optional `layerId` parameter.
	 * If `layerId` is included as the second argument in {@link Map#on}, the event listener will fire only when the
	 * the cursor is inside a visible portion of the specified layer.
	 *
	 * @event mousemove
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener
	 * map.on('mousemove', () => {
	 *     console.log('A mousemove event has occurred.');
	 * });
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener for a specific layer
	 * map.on('mousemove', 'poi-label', () => {
	 *     console.log('A mousemove event has occurred on a visible portion of the poi-label layer.');
	 * });
	 * @see [Example: Get coordinates of the mouse pointer](https://www.mapbox.com/mapbox-gl-js/example/mouse-position/)
	 * @see [Example: Highlight features under the mouse pointer](https://www.mapbox.com/mapbox-gl-js/example/hover-styles/)
	 * @see [Example: Display a popup on over](https://www.mapbox.com/mapbox-gl-js/example/popup-on-hover/)
	 */
	"mousemove": MapMouseEvent;
	/**
	 * Triggered when a click event occurs and is fired before the click event.
	 * Primarily implemented to ensure closeOnClick for pop-ups is fired before any other listeners.
	 *
	 * @event preclick
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent}
	 */
	"preclick": MapMouseEvent;
	/**
	 * Fired when a pointing device (usually a mouse) is pressed and released at the same point on the map.
	 *
	 * **Note:** This event is compatible with the optional `layerId` parameter.
	 * If `layerId` is included as the second argument in {@link Map#on}, the event listener will fire only when the
	 * point that is pressed and released contains a visible portion of the specifed layer.
	 *
	 * @event click
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener
	 * map.on('click', (e) => {
	 *     console.log(`A click event has occurred at ${e.lngLat}`);
	 * });
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener for a specific layer
	 * map.on('click', 'poi-label', (e) => {
	 *     console.log(`A click event has occurred on a visible portion of the poi-label layer at ${e.lngLat}`);
	 * });
	 * @see [Example: Measure distances](https://www.mapbox.com/mapbox-gl-js/example/measure/)
	 * @see [Example: Center the map on a clicked symbol](https://www.mapbox.com/mapbox-gl-js/example/center-on-symbol/)
	 */
	"click": MapMouseEvent;
	/**
	 * Fired when a pointing device (usually a mouse) is pressed and released twice at the same point on
	 * the map in rapid succession.
	 *
	 * **Note:** This event is compatible with the optional `layerId` parameter.
	 * If `layerId` is included as the second argument in {@link Map#on}, the event listener will fire only
	 * when the point that is clicked twice contains a visible portion of the specifed layer.
	 *
	 * @event dblclick
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener
	 * map.on('dblclick', (e) => {
	 *     console.log(`A dblclick event has occurred at ${e.lngLat}`);
	 * });
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener for a specific layer
	 * map.on('dblclick', 'poi-label', (e) => {
	 *     console.log(`A dblclick event has occurred on a visible portion of the poi-label layer at ${e.lngLat}`);
	 * });
	 */
	"dblclick": MapMouseEvent;
	/**
	 * Fired when a pointing device (usually a mouse) enters a visible portion of a specified layer from
	 * outside that layer or outside the map canvas.
	 *
	 * **Important:** This event can only be listened for when {@link Map#on} includes three arguments,
	 * where the second argument specifies the desired layer.
	 *
	 * @event mouseenter
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener
	 * map.on('mouseenter', 'water', () => {
	 *     console.log('A mouseenter event occurred on a visible portion of the water layer.');
	 * });
	 * @see [Example: Center the map on a clicked symbol](https://docs.mapbox.com/mapbox-gl-js/example/center-on-symbol/)
	 * @see [Example: Display a popup on click](https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/)
	 */
	"mouseenter": MapMouseEvent;
	/**
	 * Fired when a pointing device (usually a mouse) leaves a visible portion of a specified layer or moves
	 * from the specified layer to outside the map canvas.
	 *
	 * **Note:** To detect when the mouse leaves the canvas, independent of layer, use {@link Map.event:mouseout} instead.
	 *
	 * **Important:** This event can only be listened for when {@link Map#on} includes three arguments,
	 * where the second argument specifies the desired layer.
	 *
	 * @event mouseleave
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when the pointing device leaves
	 * // a visible portion of the specified layer.
	 * map.on('mouseleave', 'water', () => {
	 *     console.log('A mouseleave event occurred.');
	 * });
	 * @see [Example: Highlight features under the mouse pointer](https://www.mapbox.com/mapbox-gl-js/example/hover-styles/)
	 * @see [Example: Display a popup on click](https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/)
	 */
	"mouseleave": MapMouseEvent;
	/**
	 * Fired when a point device (usually a mouse) leaves the map's canvas.
	 *
	 * @event mouseout
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when the pointing device leaves
	 * // the map's canvas.
	 * map.on('mouseout', () => {
	 *     console.log('A mouseout event occurred.');
	 * });
	 */
	"mouseout": MapMouseEvent;
	/**
	 * Fired when the right button of the mouse is clicked or the context menu key is pressed within the map.
	 *
	 * @event contextmenu
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when the right mouse button is
	 * // pressed within the map.
	 * map.on('contextmenu', () => {
	 *     console.log('A contextmenu event occurred.');
	 * });
	 */
	"contextmenu": MapMouseEvent;
	/**
	 * Fired when a [`wheel`](https://developer.mozilla.org/en-US/docs/Web/Events/wheel) event occurs within the map.
	 *
	 * @event wheel
	 * @memberof Map
	 * @instance
	 * @type {MapWheelEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when a wheel event occurs within the map.
	 * map.on('wheel', () => {
	 *     console.log('A wheel event occurred.');
	 * });
	 */
	"wheel": MapWheelEvent;
	/**
	 * Fired when a [`touchstart`](https://developer.mozilla.org/en-US/docs/Web/Events/touchstart) event occurs within the map.
	 *
	 * @event touchstart
	 * @memberof Map
	 * @instance
	 * @type {MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when a `touchstart` event occurs within the map.
	 * map.on('touchstart', () => {
	 *     console.log('A touchstart event occurred.');
	 * });
	 * @see [Example: Create a draggable point](https://docs.mapbox.com/mapbox-gl-js/example/drag-a-point/)
	 */
	"touchstart": MapTouchEvent;
	/**
	 * Fired when a [`touchend`](https://developer.mozilla.org/en-US/docs/Web/Events/touchend) event occurs within the map.
	 *
	 * @event touchend
	 * @memberof Map
	 * @instance
	 * @type {MapTouchEvent}
	 * @example
	 * // Initialize the map.
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires when a `touchstart` event occurs within the map.
	 * map.on('touchstart', () => {
	 *     console.log('A touchstart event occurred.');
	 * });
	 * @see [Example: Create a draggable point](https://docs.mapbox.com/mapbox-gl-js/example/drag-a-point/)
	 */
	"touchend": MapTouchEvent;
	/**
	 * Fired when a [`touchmove`](https://developer.mozilla.org/en-US/docs/Web/Events/touchmove) event occurs within the map.
	 *
	 * @event touchmove
	 * @memberof Map
	 * @instance
	 * @type {MapTouchEvent}
	 * @example
	 * // Initialize the map.
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires when a touchmove event occurs within the map.
	 * map.on('touchmove', () => {
	 *     console.log('A touchmove event occurred.');
	 * });
	 * @see [Example: Create a draggable point](https://docs.mapbox.com/mapbox-gl-js/example/drag-a-point/)
	 */
	"touchmove": MapTouchEvent;
	/**
	 * Fired when a [`touchcancel`](https://developer.mozilla.org/en-US/docs/Web/Events/touchcancel) event occurs within the map.
	 *
	 * @event touchcancel
	 * @memberof Map
	 * @instance
	 * @type {MapTouchEvent}
	 * @example
	 * // Initialize the map.
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires when a `touchcancel` event occurs within the map.
	 * map.on('touchcancel', () => {
	 *     console.log('A touchcancel event occurred.');
	 * });
	 */
	"touchcancel": MapTouchEvent;
	/** @section {Movement}
	 * @event
	 * @instance
	 * @memberof Map */
	/**
	 * Fired just before the map begins a transition from one view to another, as the result of either user interaction or methods such as {@link Map#jumpTo}.
	 *
	 * @event movestart
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map.
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires just before the map begins a transition from one view to another.
	 * map.on('movestart', () => {
	 *     console.log('A movestart` event occurred.');
	 * });
	 */
	"movestart": {
		originalEvent?: MouseEvent | WheelEvent | TouchEvent;
	};
	/**
	 * Fired repeatedly during an animated transition from one view to another, as the result of either user interaction or methods such as {@link Map#flyTo}.
	 *
	 * @event move
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map.
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires repeatedly during an animated transition.
	 * map.on('move', () => {
	 *     console.log('A move event occurred.');
	 * });
	 * @see [Example: Display HTML clusters with custom properties](https://docs.mapbox.com/mapbox-gl-js/example/cluster-html/)
	 * @see [Example: Filter features within map view](https://docs.mapbox.com/mapbox-gl-js/example/filter-features-within-map-view/)
	 */
	"move": {
		originalEvent?: MouseEvent | WheelEvent | TouchEvent;
	};
	/**
	 * Fired just after the map completes a transition from one
	 * view to another, as the result of either user interaction or methods such as {@link Map#jumpTo}.
	 *
	 * @event moveend
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // just after the map completes a transition.
	 * map.on('moveend', () => {
	 *     console.log('A moveend event occurred.');
	 * });
	 * @see [Example: Play map locations as a slideshow](https://www.mapbox.com/mapbox-gl-js/example/playback-locations/)
	 * @see [Example: Filter features within map view](https://www.mapbox.com/mapbox-gl-js/example/filter-features-within-map-view/)
	 * @see [Example: Display HTML clusters with custom properties](https://docs.mapbox.com/mapbox-gl-js/example/cluster-html/)
	 */
	"moveend": {
		originalEvent?: MouseEvent | WheelEvent | TouchEvent;
	};
	/**
	 * Fired when a "drag to pan" interaction starts. See {@link DragPanHandler}.
	 *
	 * @event dragstart
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when a "drag to pan" interaction starts.
	 * map.on('dragstart', () => {
	 *     console.log('A dragstart event occurred.');
	 * });
	 */
	"dragstart": {
		originalEvent?: MouseEvent | TouchEvent;
	};
	/**
	 * Fired repeatedly during a "drag to pan" interaction. See {@link DragPanHandler}.
	 *
	 * @event drag
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // repeatedly during a "drag to pan" interaction.
	 * map.on('drag', () => {
	 *     console.log('A drag event occurred.');
	 * });
	 */
	"drag": {
		originalEvent?: MouseEvent | TouchEvent;
	};
	/**
	 * Fired when a "drag to pan" interaction ends. See {@link DragPanHandler}.
	 *
	 * @event dragend
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when a "drag to pan" interaction ends.
	 * map.on('dragend', () => {
	 *     console.log('A dragend event occurred.');
	 * });
	 * @see [Example: Create a draggable marker](https://docs.mapbox.com/mapbox-gl-js/example/drag-a-marker/)
	 */
	"dragend": {
		originalEvent?: MouseEvent | TouchEvent;
	};
	/**
	 * Fired just before the map begins a transition from one zoom level to another,
	 * as the result of either user interaction or methods such as {@link Map#flyTo}.
	 *
	 * @event zoomstart
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // just before a zoom transition starts.
	 * map.on('zoomstart', () => {
	 *     console.log('A zoomstart event occurred.');
	 * });
	 */
	"zoomstart": {
		originalEvent?: WheelEvent | TouchEvent;
	} | void;
	/**
	 * Fired repeatedly during an animated transition from one zoom level to another,
	 * as the result of either user interaction or methods such as {@link Map#flyTo}.
	 *
	 * @event zoom
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // repeatedly during a zoom transition.
	 * map.on('zoom', () => {
	 *     console.log('A zoom event occurred.');
	 * });
	 * @see [Example: Update a choropleth layer by zoom level](https://www.mapbox.com/mapbox-gl-js/example/updating-choropleth/)
	 */
	"zoom": {
		originalEvent?: WheelEvent | TouchEvent;
	} | void;
	/**
	 * Fired just after the map completes a transition from one zoom level to another
	 * as the result of either user interaction or methods such as {@link Map#flyTo}.
	 * The zoom transition will usually end before rendering is finished, so if you
	 * need to wait for rendering to finish, use the {@link Map.event:idle} event instead.
	 *
	 * @event zoomend
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // just after a zoom transition finishes.
	 * map.on('zoomend', () => {
	 *     console.log('A zoomend event occurred.');
	 * });
	 */
	"zoomend": {
		originalEvent?: WheelEvent | TouchEvent;
	} | void;
	/**
	 * Fired when a "drag to rotate" interaction starts. See {@link DragRotateHandler}.
	 *
	 * @event rotatestart
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // just before a "drag to rotate" interaction starts.
	 * map.on('rotatestart', () => {
	 *     console.log('A rotatestart event occurred.');
	 * });
	 */
	"rotatestart": {
		originalEvent?: MouseEvent | TouchEvent;
	};
	/**
	 * Fired repeatedly during a "drag to rotate" interaction. See {@link DragRotateHandler}.
	 *
	 * @event rotate
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // repeatedly during "drag to rotate" interaction.
	 * map.on('rotate', () => {
	 *     console.log('A rotate event occurred.');
	 * });
	 */
	"rotate": {
		originalEvent?: MouseEvent | TouchEvent;
	};
	/**
	 * Fired when a "drag to rotate" interaction ends. See {@link DragRotateHandler}.
	 *
	 * @event rotateend
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // just after a "drag to rotate" interaction ends.
	 * map.on('rotateend', () => {
	 *     console.log('A rotateend event occurred.');
	 * });
	 */
	"rotateend": {
		originalEvent?: MouseEvent | TouchEvent;
	};
	/**
	 * Fired whenever the map's pitch (tilt) begins a change as
	 * the result of either user interaction or methods such as {@link Map#flyTo} .
	 *
	 * @event pitchstart
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // just before a pitch (tilt) transition starts.
	 * map.on('pitchstart', () => {
	 *     console.log('A pitchstart event occurred.');
	 * });
	 */
	"pitchstart": {
		originalEvent?: MouseEvent | TouchEvent;
	} | void;
	/**
	 * Fired repeatedly during the map's pitch (tilt) animation between
	 * one state and another as the result of either user interaction
	 * or methods such as {@link Map#flyTo}.
	 *
	 * @event pitch
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // repeatedly during a pitch (tilt) transition.
	 * map.on('pitch', () => {
	 *     console.log('A pitch event occurred.');
	 * });
	 */
	"pitch": {
		originalEvent?: MouseEvent | TouchEvent;
	} | void;
	/**
	 * Fired immediately after the map's pitch (tilt) finishes changing as
	 * the result of either user interaction or methods such as {@link Map#flyTo}.
	 *
	 * @event pitchend
	 * @memberof Map
	 * @instance
	 * @type {MapMouseEvent | MapTouchEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // just after a pitch (tilt) transition ends.
	 * map.on('pitchend', () => {
	 *     console.log('A pitchend event occurred.');
	 * });
	 */
	"pitchend": {
		originalEvent?: MouseEvent | TouchEvent;
	} | void;
	/**
	 * Fired when a "box zoom" interaction starts. See {@link BoxZoomHandler}.
	 *
	 * @event boxzoomstart
	 * @memberof Map
	 * @instance
	 * @type {MapBoxZoomEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // just before a "box zoom" interaction starts.
	 * map.on('boxzoomstart', () => {
	 *     console.log('A boxzoomstart event occurred.');
	 * });
	 */
	"boxzoomstart": {
		originalEvent?: MouseEvent | KeyboardEvent;
	};
	/**
	 * Fired when a "box zoom" interaction ends.  See {@link BoxZoomHandler}.
	 *
	 * @event boxzoomend
	 * @memberof Map
	 * @instance
	 * @type {MapBoxZoomEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // just after a "box zoom" interaction ends.
	 * map.on('boxzoomend', () => {
	 *     console.log('A boxzoomend event occurred.');
	 * });
	 */
	"boxzoomend": {
		originalEvent?: MouseEvent;
	};
	/**
	 * Fired when the user cancels a "box zoom" interaction, or when the bounding box does not meet the minimum size threshold.
	 * See {@link BoxZoomHandler}.
	 *
	 * @event boxzoomcancel
	 * @memberof Map
	 * @instance
	 * @type {MapBoxZoomEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // the user cancels a "box zoom" interaction.
	 * map.on('boxzoomcancel', () => {
	 *     console.log('A boxzoomcancel event occurred.');
	 * });
	 */
	"boxzoomcancel": {
		originalEvent?: MouseEvent | KeyboardEvent;
	};
	/**
	 * Fired immediately after the map has been resized.
	 *
	 * @event resize
	 * @memberof Map
	 * @instance
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // immediately after the map has been resized.
	 * map.on('resize', () => {
	 *     console.log('A resize event occurred.');
	 * });
	 */
	"resize": object | void;
	/** @section {Lifecycle}
	 * @event
	 * @instance
	 * @memberof Map */
	/**
	 * Fired immediately after all necessary resources have been downloaded
	 * and the first visually complete rendering of the map has occurred.
	 *
	 * @event load
	 * @memberof Map
	 * @instance
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when the map has finished loading.
	 * map.on('load', () => {
	 *     console.log('A load event occurred.');
	 * });
	 * @see [Example: Draw GeoJSON points](https://www.mapbox.com/mapbox-gl-js/example/geojson-markers/)
	 * @see [Example: Add live realtime data](https://www.mapbox.com/mapbox-gl-js/example/live-geojson/)
	 * @see [Example: Animate a point](https://www.mapbox.com/mapbox-gl-js/example/animate-point-along-line/)
	 */
	"load": void;
	/**
	 * Fired whenever the rendering process of the map is started.
	 * This event can be used in pair with the "render" event,
	 * to measure the time spent on the CPU during the rendering
	 * of a single frame.
	 *
	 * @event renderstart
	 * @memberof Map
	 * @instance
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when the map begins rendering.
	 * map.on('renderstart', () => {
	 *     console.log('A renderstart event occurred.');
	 * });
	 */
	"renderstart": void;
	/**
	 * Fired whenever the map is drawn to the screen, as the result of:
	 *
	 * - a change to the map's position, zoom, pitch, or bearing
	 * - a change to the map's style
	 * - a change to a GeoJSON source
	 * - the loading of a vector tile, GeoJSON file, glyph, or sprite.
	 *
	 * @event render
	 * @memberof Map
	 * @instance
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // whenever the map is drawn to the screen.
	 * map.on('render', () => {
	 *     console.log('A render event occurred.');
	 * });
	 */
	"render": void;
	/**
	 * Fired after the last frame rendered before the map enters an
	 * "idle" state:
	 *
	 * - No camera transitions are in progress
	 * - All currently requested tiles have loaded
	 * - All fade/transition animations have completed.
	 *
	 * @event idle
	 * @memberof Map
	 * @instance
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // just before the map enters an "idle" state.
	 * map.on('idle', () => {
	 *     console.log('A idle event occurred.');
	 * });
	 */
	"idle": void;
	/**
	 * Fired immediately after the map has been removed with {@link Map.event:remove}.
	 *
	 * @event remove
	 * @memberof Map
	 * @instance
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // just after the map is removed.
	 * map.on('remove', () => {
	 *     console.log('A remove event occurred.');
	 * });
	 */
	"remove": void;
	/**
	 * Fired when an error occurs. This is Mapbox GL JS's primary error reporting
	 * mechanism. We use an event instead of `throw` to better accommodate
	 * asyncronous operations. If no listeners are bound to the `error` event, the
	 * error will be printed to the console.
	 *
	 * @event error
	 * @memberof Map
	 * @instance
	 * @property {string} message Error message.
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when an error occurs.
	 * map.on('error', () => {
	 *     console.log('A error event occurred.');
	 * });
	 */
	"error": {
		error: Error;
	};
	/**
	 * Fired when the WebGL context is lost.
	 *
	 * @event webglcontextlost
	 * @memberof Map
	 * @instance
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when the WebGL context is lost.
	 * map.on('webglcontextlost', () => {
	 *     console.log('A webglcontextlost event occurred.');
	 * });
	 */
	"webglcontextlost": {
		originalEvent?: WebGLContextEvent;
	};
	/**
	 * Fired when the WebGL context is restored.
	 *
	 * @event webglcontextrestored
	 * @memberof Map
	 * @instance
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when the WebGL context is restored.
	 * map.on('webglcontextrestored', () => {
	 *     console.log('A webglcontextrestored event occurred.');
	 * });
	 */
	"webglcontextrestored": {
		originalEvent?: WebGLContextEvent;
	};
	/** @section {Data loading}
	 * @event
	 * @instance
	 * @memberof Map */
	/**
	 * Fired when any map data loads or changes. See {@link MapDataEvent}
	 * for more information.
	 *
	 * @event data
	 * @memberof Map
	 * @instance
	 * @type {MapDataEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when map data loads or changes.
	 * map.on('data', () => {
	 *     console.log('A data event occurred.');
	 * });
	 * @see [Example: Display HTML clusters with custom properties](https://docs.mapbox.com/mapbox-gl-js/example/cluster-html/)
	 */
	"data": MapDataEvent;
	/**
	 * Fired when the map's style loads or changes. See
	 * {@link MapDataEvent} for more information.
	 *
	 * @event styledata
	 * @memberof Map
	 * @instance
	 * @type {MapDataEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when the map's style loads or changes.
	 * map.on('styledata', () => {
	 *     console.log('A styledata event occurred.');
	 * });
	 */
	"styledata": MapStyleDataEvent;
	/**
	 * Fired when one of the map's sources loads or changes, including if a tile belonging
	 * to a source loads or changes. See {@link MapDataEvent} for more information.
	 *
	 * @event sourcedata
	 * @memberof Map
	 * @instance
	 * @type {MapDataEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when one of the map's sources loads or changes.
	 * map.on('sourcedata', () => {
	 *     console.log('A sourcedata event occurred.');
	 * });
	 */
	"sourcedata": MapSourceDataEvent;
	/**
	 * Fired when any map data (style, source, tile, etc) begins loading or
	 * changing asynchronously. All `dataloading` events are followed by a `data`
	 * or `error` event. See {@link MapDataEvent} for more information.
	 *
	 * @event dataloading
	 * @memberof Map
	 * @instance
	 * @type {MapDataEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when any map data begins loading
	 * // or changing asynchronously.
	 * map.on('dataloading', () => {
	 *     console.log('A dataloading event occurred.');
	 * });
	 */
	"dataloading": MapDataEvent;
	/**
	 * Fired when the map's style begins loading or changing asynchronously.
	 * All `styledataloading` events are followed by a `styledata`
	 * or `error` event. See {@link MapDataEvent} for more information.
	 *
	 * @event styledataloading
	 * @memberof Map
	 * @instance
	 * @type {MapDataEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when the map's style begins loading or
	 * // changing asynchronously.
	 * map.on('styledataloading', () => {
	 *     console.log('A styledataloading event occurred.');
	 * });
	 */
	"styledataloading": MapStyleDataEvent;
	/**
	 * Fired when one of the map's sources begins loading or changing asynchronously.
	 * All `sourcedataloading` events are followed by a `sourcedata` or `error` event.
	 * See {@link MapDataEvent} for more information.
	 *
	 * @event sourcedataloading
	 * @memberof Map
	 * @instance
	 * @type {MapDataEvent}
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when the map's sources begin loading or
	 * // changing asynchronously.
	 * map.on('sourcedataloading', () => {
	 *     console.log('A sourcedataloading event occurred.');
	 * });
	 */
	"sourcedataloading": MapSourceDataEvent;
	/**
	 * Fired when an icon or pattern needed by the style is missing. The missing image can
	 * be added with {@link Map#addImage} within this event listener callback to prevent the image from
	 * being skipped. This event can be used to dynamically generate icons and patterns.
	 *
	 * @event styleimagemissing
	 * @memberof Map
	 * @instance
	 * @property {string} id The id of the missing image.
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when an icon or pattern is missing.
	 * map.on('styleimagemissing', () => {
	 *     console.log('A styleimagemissing event occurred.');
	 * });
	 * @see [Example: Generate and add a missing icon to the map](https://mapbox.com/mapbox-gl-js/example/add-image-missing-generated/)
	 */
	"styleimagemissing": void;
	/**
	 * Fired immediately after all style resources have been downloaded
	 * and the first visually complete rendering of the base style has occurred.
	 *
	 * @event style.load
	 * @memberof Map
	 * @instance
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when the map has finished loading.
	 * map.on('style.load', () => {
	 *     console.log('A style load event occurred.');
	 * });
	 * @see [Example: Persist layers when switching base style](https://www.mapbox.com/mapbox-gl-js/example/style-switch)
	 */
	"style.load": void;
	/**
	 * Fired immediately after imported style resources have been downloaded
	 * and the first visually complete rendering of the base style extended with the imported style has occurred.
	 *
	 * @event style.import.load
	 * @memberof Map
	 * @instance
	 * @example
	 * // Initialize the map
	 * const map = new mapboxgl.Map({});
	 * // Set an event listener that fires
	 * // when the style import has finished loading.
	 * map.on('style.import.load', () => {
	 *     console.log('A style import load event occurred.');
	 * });
	 */
	"style.import.load": void;
	/**
	 * Fired after speed index calculation is completed if `speedIndexTiming` option has been set to `true`.
	 *
	 * @private
	 * @event speedindexcompleted
	 * @memberof Map
	 * @instance
	 * @example
	 * // Initialize the map
	 * var map = new mapboxgl.Map({});
	 * map.speedIndexTiming = true;
	 * // Set an event listener that fires
	 * // after speed index calculation is completed.
	 * map.on('speedindexcompleted', function() {
	 *   console.log(`speed index is ${map.speedIndexNumber}`);
	 * });
	 */
	"speedindexcompleted": {
		speedIndex: number;
	};
	/**
	 * Fired after RTL text plugin state changes.
	 *
	 * @event pluginStateChange
	 * @instance
	 * @private
	 */
	"pluginStateChange": {
		pluginStatus: string;
		pluginURL: string;
	};
	/**
	 * Fired in worker.js after sprite loaded.
	 *
	 * @event pluginStateChange
	 * @instance
	 * @private
	 */
	"isSpriteLoaded": void;
	/**
	 * Fired in style.js after layer order changed.
	 *
	 * @event neworder
	 * @instance
	 * @private
	 */
	"neworder": void;
	/**
	 * @event colorthemeset
	 * @instance
	 * @private
	 */
	"colorthemeset": void;
	/**
	 * @private
	 */
	"gpu-timing-frame": {
		cpuTime: number;
		gpuTime: number;
	};
	/**
	 * @private
	 */
	"gpu-timing-layer": {
		layerTimes: {
			[layerId: string]: number;
		};
	};
	/**
	 * @private
	 */
	"gpu-timing-deferred-render": {
		gpuTime: number;
	};
};
/**
 * Utility type that represents all possible Map event types.
 */
export type MapEventType = keyof MapEvents & string;
/**
 * Utility type that maps event types to their corresponding event object type.
 *
 * @example
 * type LoadEvent = MapEvent<'load'>; // equivalent to { type: 'load', target: Map }
 *
 * type MoveEvent = MapEvent<'move'>; // equivalent to { type: 'move', target: Map, originalEvent?: MouseEvent | WheelEvent | TouchEvent }
 */
export type MapEventOf<Type extends MapEventType> = EventOf<MapEvents, Type, Map$1>;
export type MapEvent = MapEventOf<MapEventType>;
type SourceEvents = Pick<MapEvents, "data" | "dataloading" | "error">;
type SourceRasterLayer = {
	id: string;
	maxzoom?: number;
	minzoom?: number;
	fields?: {
		bands?: Array<string | number>;
		range?: [
			number,
			number
		];
	};
};
type SourceVectorLayer = {
	id: string;
	maxzoom?: number;
	minzoom?: number;
};
interface ISource extends Evented<SourceEvents> {
	readonly type: string;
	id: string;
	scope: string;
	minzoom: number;
	maxzoom: number;
	tileSize: number;
	attribution?: string;
	roundZoom?: boolean;
	isTileClipped?: boolean;
	mapbox_logo?: boolean;
	tileID?: CanonicalTileID;
	reparseOverscaled?: boolean;
	minTileCacheSize?: number | null | undefined;
	maxTileCacheSize?: number | null | undefined;
	language?: string | null | undefined;
	worldview?: string | null | undefined;
	readonly usedInConflation?: boolean;
	vectorLayers?: Array<SourceVectorLayer>;
	vectorLayerIds?: Array<string>;
	rasterLayers?: Array<SourceRasterLayer>;
	rasterLayerIds?: Array<string>;
	hasTransition(): boolean;
	loaded(): boolean;
	readonly onAdd?: (map: Map$1) => void;
	readonly onRemove?: (map: Map$1) => void;
	loadTile(tile: Tile, callback: Callback<undefined>, tileWorkers?: {
		[key: string]: Actor$1;
	}): void;
	readonly hasTile?: (tileID: OverscaledTileID) => boolean;
	readonly abortTile?: (tile: Tile, callback?: Callback<undefined>) => void;
	readonly unloadTile?: (tile: Tile, callback?: Callback<undefined>) => void;
	readonly reload?: () => void;
	/**
	 * @returns A plain (stringifiable) JS object representing the current state of the source.
	 * Creating a source using the returned object as the `options` should result in a Source that is
	 * equivalent to this one.
	 * @private
	 */
	serialize(): SourceSpecification | {
		type: "custom";
		[key: string]: unknown;
	};
	readonly prepare?: () => void;
	readonly afterUpdate?: () => void;
	readonly _clear?: () => void;
}
type SourceStatics = {
	workerSourceURL?: URL;
};
type SourceClass = Class<ISource> & SourceStatics;
declare const getType: (name: string) => Class<ISource>;
declare const setType: (name: string, type: Class<ISource>) => void;
interface Actor$1 {
	send(type: string, data: unknown, callback: Callback<unknown>): void;
}
declare class SourceCache extends Evented {
	id: string;
	map: Map$1;
	_source: ISource;
	_sourceLoaded: boolean;
	_sourceErrored: boolean;
	_tiles: Partial<Record<string | number, Tile>>;
	_prevLng: number | undefined;
	_cache: TileCache;
	_timers: Partial<Record<any, number>>;
	_cacheTimers: Partial<Record<any, number>>;
	_minTileCacheSize: number | null | undefined;
	_maxTileCacheSize: number | null | undefined;
	_paused: boolean;
	_isRaster: boolean;
	_shouldReloadOnResume: boolean;
	_coveredTiles: Partial<Record<number | string, boolean>>;
	transform: Transform;
	used: boolean;
	usedForTerrain: boolean;
	castsShadows: boolean;
	tileCoverLift: number;
	_state: SourceFeatureState;
	_loadedParentTiles: Partial<Record<number | string, Tile | null | undefined>>;
	_onlySymbols: boolean | null | undefined;
	_shadowCasterTiles: {
		[_: number]: boolean;
	};
	static maxUnderzooming: number;
	static maxOverzooming: number;
	constructor(id: string, source: Source, onlySymbols?: boolean);
	onAdd(map: Map$1): void;
	/**
	 * Return true if no tile data is pending, tiles will not change unless
	 * an additional API call is received.
	 * @private
	 */
	loaded(): boolean;
	getSource<T extends Source>(): T;
	pause(): void;
	resume(): void;
	_loadTile(tile: Tile, callback: Callback<undefined>): void;
	_unloadTile(tile: Tile): void;
	_abortTile(tile: Tile): void;
	serialize(): SourceSpecification | {
		type: "custom";
		[key: string]: unknown;
	};
	prepare(context: Context): void;
	/**
	 * Return all tile ids ordered with z-order, and cast to numbers
	 * @private
	 */
	getIds(): Array<number>;
	getRenderableIds(symbolLayer?: boolean, includeShadowCasters?: boolean): Array<number>;
	hasRenderableParent(tileID: OverscaledTileID): boolean;
	_isIdRenderable(id: number, symbolLayer?: boolean, includeShadowCasters?: boolean): boolean;
	reload(): void;
	_reloadTile(id: number, state: TileState): void;
	_tileLoaded(tile: Tile, id: number, previousState: TileState, err?: Error | null): void;
	/**
	* For raster terrain source, backfill DEM to eliminate visible tile boundaries
	* @private
	*/
	_backfillDEM(tile: Tile): void;
	/**
	 * Get a specific tile by TileID
	 * @private
	 */
	getTile(tileID: OverscaledTileID): Tile;
	/**
	 * Get a specific tile by id
	 * @private
	 */
	getTileByID(id: number): Tile;
	/**
	 * For a given set of tiles, retain children that are loaded and have a zoom
	 * between `zoom` (exclusive) and `maxCoveringZoom` (inclusive)
	 * @private
	 */
	_retainLoadedChildren(idealTiles: Partial<Record<number | string, OverscaledTileID>>, zoom: number, maxCoveringZoom: number, retain: Partial<Record<number | string, OverscaledTileID>>): void;
	/**
	 * Find a loaded parent of the given tile (up to minCoveringZoom)
	 * @private
	 */
	findLoadedParent(tileID: OverscaledTileID, minCoveringZoom: number): Tile | null | undefined;
	_getLoadedTile(tileID: OverscaledTileID): Tile | null | undefined;
	/**
	 * Resizes the tile cache based on the current viewport's size
	 * or the minTileCacheSize and maxTileCacheSize options passed during map creation
	 *
	 * Larger viewports use more tiles and need larger caches. Larger viewports
	 * are more likely to be found on devices with more memory and on pages where
	 * the map is more important.
	 * @private
	 */
	updateCacheSize(transform: Transform, tileSize?: number): void;
	handleWrapJump(lng: number): void;
	/**
	 * Removes tiles that are outside the viewport and adds new tiles that
	 * are inside the viewport.
	 * @private
	 * @param {boolean} updateForTerrain Signals to update tiles even if the
	 * source is not used (this.used) by layers: it is used for terrain.
	 * @param {tileSize} tileSize If needed to get lower resolution ideal cover,
	 * override source.tileSize used in tile cover calculation.
	 */
	update(transform: Transform, tileSize?: number, updateForTerrain?: boolean, directionalLight?: vec3): void;
	releaseSymbolFadeTiles(): void;
	_updateRetainedTiles(idealTileIDs: Array<OverscaledTileID>): Partial<Record<number | string, OverscaledTileID>>;
	_updateLoadedParentTileCache(): void;
	/**
	 * Add a tile, given its coordinate, to the pyramid.
	 * @private
	 */
	_addTile(tileID: OverscaledTileID): Tile;
	_setTileReloadTimer(id: number, tile: Tile): void;
	/**
	 * Remove a tile, given its id, from the pyramid
	 * @private
	 */
	_removeTile(id: number): void;
	/**
	 * Remove all tiles from this pyramid.
	 * @private
	 */
	clearTiles(): void;
	/**
	 * Search through our current tiles and attempt to find the tiles that cover the given `queryGeometry`.
	 *
	 * @param {QueryGeometry} queryGeometry
	 * @param {boolean} [visualizeQueryGeometry=false]
	 * @param {boolean} use3DQuery
	 * @returns
	 * @private
	 */
	tilesIn(queryGeometry: QueryGeometry, use3DQuery: boolean, visualizeQueryGeometry: boolean): TilespaceQueryGeometry[];
	getShadowCasterCoordinates(): Array<OverscaledTileID>;
	getVisibleCoordinates(symbolLayer?: boolean): Array<OverscaledTileID>;
	_getRenderableCoordinates(symbolLayer?: boolean, includeShadowCasters?: boolean): Array<OverscaledTileID>;
	sortCoordinatesByDistance(coords: Array<OverscaledTileID>): Array<OverscaledTileID>;
	hasTransition(): boolean;
	/**
	 * Set the value of a particular state for a feature
	 * @private
	 */
	setFeatureState(sourceLayer: string | null | undefined, featureId: number | string, state: FeatureState): void;
	/**
	 * Resets the value of a particular state key for a feature
	 * @private
	 */
	removeFeatureState(sourceLayer?: string, featureId?: number | string, key?: string): void;
	/**
	 * Get the entire state object for a feature
	 * @private
	 */
	getFeatureState(sourceLayer: string | null | undefined, featureId: number | string): FeatureState;
	/**
	 * Sets the set of keys that the tile depends on. This allows tiles to
	 * be reloaded when their dependencies change.
	 * @private
	 */
	setDependencies(tileKey: number, namespace: string, dependencies: Array<string>): void;
	/**
	 * Reloads all tiles that depend on the given keys.
	 * @private
	 */
	reloadTilesForDependencies(namespaces: Array<string>, keys: Array<string>): void;
	/**
	 * Preloads all tiles that will be requested for one or a series of transformations
	 *
	 * @private
	 * @returns {Object} Returns `this` | Promise.
	 */
	_preloadTiles(transform: Transform | Array<Transform>, callback: Callback<any>): void;
}
type ElevationQueryOptions = {
	exaggerated: boolean;
};
declare class Elevation {
	/**
	 * Helper that checks whether DEM data is available at a given mercator coordinate.
	 * @param {MercatorCoordinate} point Mercator coordinate of the point to check against.
	 * @returns {boolean} `true` indicating whether the data is available at `point`, and `false` otherwise.
	 */
	isDataAvailableAtPoint(point: MercatorCoordinate): boolean;
	/**
	 * Helper around `getAtPoint` that guarantees that a numeric value is returned.
	 * @param {MercatorCoordinate} point Mercator coordinate of the point.
	 * @param {number} defaultIfNotLoaded Value that is returned if the dem tile of the provided point is not loaded.
	 * @returns {number} Altitude in meters.
	 */
	getAtPointOrZero(point: MercatorCoordinate, defaultIfNotLoaded?: number): number;
	/**
	 * Altitude above sea level in meters at specified point.
	 * @param {MercatorCoordinate} point Mercator coordinate of the point.
	 * @param {number} defaultIfNotLoaded Value that is returned if the DEM tile of the provided point is not loaded.
	 * @param {boolean} exaggerated `true` if styling exaggeration should be applied to the resulting elevation.
	 * @returns {number} Altitude in meters.
	 * If there is no loaded tile that carries information for the requested
	 * point elevation, returns `defaultIfNotLoaded`.
	 * Doesn't invoke network request to fetch the data.
	 */
	getAtPoint(point: MercatorCoordinate, defaultIfNotLoaded?: number | null, exaggerated?: boolean): number | null | undefined;
	getAtTileOffset(tileID: OverscaledTileID, x: number, y: number): number;
	getAtTileOffsetFunc(tileID: OverscaledTileID, lat: number, worldSize: number, projection: Projection$2): (arg1: Point) => [
		number,
		number,
		number
	];
	getForTilePoints(tileID: OverscaledTileID, points: Array<vec3>, interpolated?: boolean | null, useDemTile?: Tile | null): boolean;
	/**
	 * Get elevation minimum and maximum for tile identified by `tileID`.
	 * @param {OverscaledTileID} tileID The `tileId` is a sub tile (or covers the same space) of the DEM tile we read the information from.
	 * @returns {?{min: number, max: number}} The min and max elevation.
	 */
	getMinMaxForTile(tileID: OverscaledTileID): {
		min: number;
		max: number;
	} | null | undefined;
	/**
	 * Get elevation minimum below MSL for the visible tiles. This function accounts
	 * for terrain exaggeration and is conservative based on the maximum DEM error,
	 * do not expect accurate values from this function.
	 * If no negative elevation is visible, this function returns 0.
	 * @returns {number} The min elevation below sea level of all visible tiles.
	 */
	getMinElevationBelowMSL(): number;
	/**
	 * Performs raycast against visible DEM tiles on the screen and returns the distance travelled along the ray.
	 * `x` & `y` components of the position are expected to be in normalized mercator coordinates [0, 1] and z in meters.
	 * @param {vec3} position The ray origin.
	 * @param {vec3} dir The ray direction.
	 * @param {number} exaggeration The terrain exaggeration.
	*/
	raycast(_position: vec3, _dir: vec3, _exaggeration: number): number | null | undefined;
	/**
	 * Given a point on screen, returns 3D MercatorCoordinate on terrain.
	 * Helper function that wraps `raycast`.
	 *
	 * @param {Point} screenPoint Screen point in pixels in top-left origin coordinate system.
	 * @returns {vec4} If there is intersection with terrain, returns vec4(x, y, z, e), a
	 * 3D MercatorCoordinate's of intersection in its first 3 components, and elevation in meter in its 4th coordinate.
	 * Otherwise returns null.
	 */
	pointCoordinate(_screenPoint: Point): vec4 | null | undefined;
	_source(): SourceCache | null | undefined;
	isUsingMockSource(): boolean;
	exaggeration(): number;
	/**
	 * Lookup DEM tile that corresponds to (covers) tileID.
	 * @private
	 */
	findDEMTileFor(_: OverscaledTileID): Tile | null | undefined;
	/**
	 * Get list of DEM tiles used to render current frame.
	 * @private
	 */
	get visibleDemTiles(): Array<Tile>;
	/**
	 * Get elevation minimum and maximum for tiles which are visible on the current frame.
	 */
	getMinMaxForVisibleTiles(): {
		min: number;
		max: number;
	} | null | undefined;
}
declare class DEMSampler {
	_demTile: Tile;
	_dem: DEMData;
	_scale: number;
	_offset: [
		number,
		number
	];
	constructor(demTile: Tile, scale: number, offset: [
		number,
		number
	]);
	static create(elevation: Elevation, tileID: OverscaledTileID, useDemTile?: Tile | null): DEMSampler | null | undefined;
	tileCoordToPixel(x: number, y: number): Point;
	getElevationAt(x: number, y: number, interpolated?: boolean | null, clampToEdge?: boolean | null): number;
	getElevationAtPixel(x: number, y: number, clampToEdge?: boolean | null): number;
	getMeterToDEM(lat: number): number;
}
declare class FreeCameraOptions {
	orientation: quat | null | undefined;
	_position: MercatorCoordinate | null | undefined;
	_elevation: Elevation | null | undefined;
	_renderWorldCopies: boolean;
	constructor(position?: MercatorCoordinate | null, orientation?: quat | null);
	get position(): MercatorCoordinate | null | undefined;
	set position(position: MercatorCoordinate | null | undefined | vec3);
	/**
	 * Helper function for setting orientation of the camera by defining a focus point
	 * on the map.
	 *
	 * @param {LngLatLike} location Location of the focus point on the map.
	 * @param {vec3?} up Up vector of the camera is necessary in certain scenarios where bearing can't be deduced
	 *      from the viewing direction.
	 * @example
	 * const camera = map.getFreeCameraOptions();
	 *
	 * const position = [138.72649, 35.33974];
	 * const altitude = 3000;
	 *
	 * camera.position = mapboxgl.MercatorCoordinate.fromLngLat(position, altitude);
	 * camera.lookAtPoint([138.73036, 35.36197]);
	 * // Apply camera changes
	 * map.setFreeCameraOptions(camera);
	 */
	lookAtPoint(location: LngLatLike, up?: vec3): void;
	/**
	 * Helper function for setting the orientation of the camera as a pitch and a bearing.
	 *
	 * @param {number} pitch Pitch angle in degrees.
	 * @param {number} bearing Bearing angle in degrees.
	 * @example
	 * const camera = map.getFreeCameraOptions();
	 *
	 * // Update camera pitch and bearing
	 * camera.setPitchBearing(80, 90);
	 * // Apply changes
	 * map.setFreeCameraOptions(camera);
	 */
	setPitchBearing(pitch: number, bearing: number): void;
}
declare class FreeCamera {
	_transform: mat4;
	_orientation: quat;
	constructor(position?: vec3 | null, orientation?: quat | null);
	get mercatorPosition(): MercatorCoordinate;
	get position(): vec3;
	set position(value: vec3 | null | undefined);
	get orientation(): quat;
	set orientation(value: quat | null | undefined);
	getPitchBearing(): {
		pitch: number;
		bearing: number;
	};
	setPitchBearing(pitch: number, bearing: number): void;
	forward(): vec3;
	up(): vec3;
	right(): vec3;
	getCameraToWorld(worldSize: number, pixelsPerMeter: number): Float64Array;
	getCameraToWorldMercator(): mat4;
	getWorldToCameraPosition(worldSize: number, pixelsPerMeter: number, uniformScale: number): Float64Array;
	getWorldToCamera(worldSize: number, pixelsPerMeter: number): Float64Array;
	getCameraToClipPerspective(fovy: number, aspectRatio: number, nearZ: number, farZ: number): Float64Array;
	getCameraToClipOrthographic(left: number, right: number, bottom: number, top: number, nearZ: number, farZ: number): Float64Array;
	getDistanceToElevation(elevationMeters: number, convert?: boolean): number;
	clone(): FreeCamera;
}
type RayIntersectionResult = {
	p0: vec4;
	p1: vec4;
	t: number;
};
type ElevationReference = "sea" | "ground";
declare class Transform {
	tileSize: number;
	tileZoom: number;
	maxBounds: LngLatBounds | null | undefined;
	scale: number;
	width: number;
	height: number;
	angle: number;
	rotationMatrix: [
		number,
		number,
		number,
		number
	];
	zoomFraction: number;
	pixelsToGLUnits: [
		number,
		number
	];
	cameraToCenterDistance: number;
	mercatorMatrix: Array<number>;
	mercatorFogMatrix: Float32Array;
	projMatrix: Array<number> | Float32Array | Float64Array;
	invProjMatrix: Float64Array;
	expandedFarZProjMatrix: Array<number> | Float32Array | Float64Array;
	alignedProjMatrix: Float64Array;
	pixelMatrix: Float64Array;
	pixelMatrixInverse: Float64Array;
	worldToFogMatrix: Float64Array;
	skyboxMatrix: Float32Array;
	starsProjMatrix: Float32Array;
	glCoordMatrix: Float32Array;
	labelPlaneMatrix: Float32Array;
	globeMatrix: Float64Array;
	globeCenterInViewSpace: [
		number,
		number,
		number
	];
	globeRadius: number;
	inverseAdjustmentMatrix: Array<number>;
	mercatorFromTransition: boolean;
	minLng: number;
	maxLng: number;
	minLat: number;
	maxLat: number;
	worldMinX: number;
	worldMaxX: number;
	worldMinY: number;
	worldMaxY: number;
	cameraFrustum: Frustum;
	frustumCorners: FrustumCorners;
	_tileCoverLift: number;
	freezeTileCoverage: boolean;
	cameraElevationReference: ElevationReference;
	fogCullDistSq: number | null | undefined;
	_averageElevation: number;
	projectionOptions: ProjectionSpecification;
	projection: Projection$2;
	_elevation: Elevation | null | undefined;
	_fov: number;
	_pitch: number;
	_zoom: number;
	_seaLevelZoom: number | null | undefined;
	_unmodified: boolean;
	_renderWorldCopies: boolean;
	_minZoom: number;
	_maxZoom: number;
	_minPitch: number;
	_maxPitch: number;
	_center: LngLat;
	_edgeInsets: EdgeInsets;
	_constraining: boolean;
	_projMatrixCache: {
		[_: number]: Float32Array;
	};
	_alignedProjMatrixCache: {
		[_: number]: Float32Array;
	};
	_pixelsToTileUnitsCache: {
		[_: number]: Float32Array;
	};
	_expandedProjMatrixCache: {
		[_: number]: Float32Array;
	};
	_fogTileMatrixCache: {
		[_: number]: Float32Array;
	};
	_distanceTileDataCache: {
		[_: number]: FeatureDistanceData;
	};
	_camera: FreeCamera;
	_centerAltitude: number;
	_centerAltitudeValidForExaggeration: number | null | undefined;
	_horizonShift: number;
	_pixelsPerMercatorPixel: number;
	_nearZ: number;
	_farZ: number;
	_mercatorScaleRatio: number;
	_isCameraConstrained: boolean;
	_orthographicProjectionAtLowPitch: boolean;
	constructor(minZoom?: number | null, maxZoom?: number | null, minPitch?: number | null, maxPitch?: number | null, renderWorldCopies?: boolean, projection?: ProjectionSpecification | null, bounds?: LngLatBounds | null);
	clone(): Transform;
	get isOrthographic(): boolean;
	get elevation(): Elevation | null | undefined;
	set elevation(elevation: Elevation | null | undefined);
	get depthOcclusionForSymbolsAndCircles(): boolean;
	updateElevation(constrainCameraOverTerrain: boolean, adaptCameraAltitude?: boolean): void;
	getProjection(): ProjectionSpecification;
	setProjection(projection?: ProjectionSpecification | null): boolean;
	setOrthographicProjectionAtLowPitch(enabled: boolean): boolean;
	setMercatorFromTransition(): boolean;
	get minZoom(): number;
	set minZoom(zoom: number);
	get maxZoom(): number;
	set maxZoom(zoom: number);
	get minPitch(): number;
	set minPitch(pitch: number);
	get maxPitch(): number;
	set maxPitch(pitch: number);
	get renderWorldCopies(): boolean;
	set renderWorldCopies(renderWorldCopies: boolean | null | undefined);
	get worldSize(): number;
	get cameraWorldSizeForFog(): number;
	get cameraWorldSize(): number;
	get pixelsPerMeter(): number;
	get cameraPixelsPerMeter(): number;
	get centerOffset(): Point;
	get size(): Point;
	get bearing(): number;
	set bearing(bearing: number);
	get rotation(): number;
	set rotation(rotation: number);
	get pitch(): number;
	set pitch(pitch: number);
	get aspect(): number;
	get fov(): number;
	get fovX(): number;
	get fovY(): number;
	set fov(fov: number);
	get averageElevation(): number;
	set averageElevation(averageElevation: number);
	get zoom(): number;
	set zoom(zoom: number);
	_setZoom(z: number): void;
	get tileCoverLift(): number;
	set tileCoverLift(lift: number);
	_updateCameraOnTerrain(): void;
	_updateSeaLevelZoom(): void;
	sampleAverageElevation(): number;
	get center(): LngLat;
	set center(center: LngLat);
	_updateZoomFromElevation(): void;
	get padding(): PaddingOptions;
	set padding(padding: PaddingOptions);
	/**
	 * Computes a zoom value relative to a map plane that goes through the provided mercator position.
	 *
	 * @param {MercatorCoordinate} position A position defining the altitude of the the map plane.
	 * @returns {number} The zoom value.
	 */
	computeZoomRelativeTo(position: MercatorCoordinate): number;
	setFreeCameraOptions(options: FreeCameraOptions): void;
	getFreeCameraOptions(): FreeCameraOptions;
	_setCameraOrientation(orientation: quat): boolean;
	_setCameraPosition(position: vec3): void;
	/**
	 * The center of the screen in pixels with the top-left corner being (0,0)
	 * and +y axis pointing downwards. This accounts for padding.
	 *
	 * @readonly
	 * @type {Point}
	 * @memberof Transform
	 */
	get centerPoint(): Point;
	/**
	 * Returns the vertical half-fov, accounting for padding, in radians.
	 *
	 * @readonly
	 * @type {number}
	 * @private
	 */
	get fovAboveCenter(): number;
	/**
	 * Returns true if the padding options are equal.
	 *
	 * @param {PaddingOptions} padding The padding options to compare.
	 * @returns {boolean} True if the padding options are equal.
	 * @memberof Transform
	 */
	isPaddingEqual(padding: PaddingOptions): boolean;
	/**
	 * Helper method to update edge-insets inplace.
	 *
	 * @param {PaddingOptions} start The initial padding options.
	 * @param {PaddingOptions} target The target padding options.
	 * @param {number} t The interpolation variable.
	 * @memberof Transform
	 */
	interpolatePadding(start: PaddingOptions, target: PaddingOptions, t: number): void;
	/**
	 * Return the highest zoom level that fully includes all tiles within the transform's boundaries.
	 * @param {Object} options Options.
	 * @param {number} options.tileSize Tile size, expressed in screen pixels.
	 * @param {boolean} options.roundZoom Target zoom level. If true, the value will be rounded to the closest integer. Otherwise the value will be floored.
	 * @returns {number} An integer zoom level at which all tiles will be visible.
	 */
	coveringZoomLevel(options: {
		roundZoom?: boolean;
		tileSize: number;
	}): number;
	/**
	 * Return any "wrapped" copies of a given tile coordinate that are visible
	 * in the current view.
	 *
	 * @private
	 */
	getVisibleUnwrappedCoordinates(tileID: CanonicalTileID): Array<UnwrappedTileID>;
	isLODDisabled(checkPitch: boolean): boolean;
	/**
	 * Extends tile coverage to include potential shadow caster tiles.
	 * @param {Array<OverscaledTileID>} coveringTiles tiles that are potential shadow receivers
	 * @param {Vec3} lightDir direction of the light (unit vector)
	 * @param {number} maxZoom maximum zoom level of shadow caster tiles
	 * @returns {Array<OverscaledTileID>} a set of potential shadow casters
	 */
	extendTileCoverForShadows(coveringTiles: Array<OverscaledTileID>, lightDir: vec3, maxZoom: number): Array<OverscaledTileID>;
	/**
	 * Return all coordinates that could cover this transform for a covering
	 * zoom level.
	 * @param {Object} options
	 * @param {number} options.tileSize
	 * @param {number} options.minzoom
	 * @param {number} options.maxzoom
	 * @param {boolean} options.roundZoom
	 * @param {boolean} options.reparseOverscaled
	 * @returns {Array<OverscaledTileID>} OverscaledTileIDs
	 * @private
	 */
	coveringTiles(options: {
		tileSize: number;
		minzoom?: number;
		maxzoom?: number;
		roundZoom?: boolean;
		reparseOverscaled?: boolean;
		renderWorldCopies?: boolean;
		isTerrainDEM?: boolean;
	}): Array<OverscaledTileID>;
	resize(width: number, height: number): void;
	get unmodified(): boolean;
	zoomScale(zoom: number): number;
	scaleZoom(scale: number): number;
	project(lnglat: LngLat): Point;
	unproject(point: Point): LngLat;
	get point(): Point;
	get pointMerc(): Point;
	get pixelsPerMeterRatio(): number;
	setLocationAtPoint(lnglat: LngLat, point: Point): void;
	setLocation(location: MercatorCoordinate): void;
	/**
	 * Given a location, return the screen point that corresponds to it. In 3D mode
	 * (with terrain) this behaves the same as in 2D mode.
	 * This method is coupled with {@see pointLocation} in 3D mode to model map manipulation
	 * using flat plane approach to keep constant elevation above ground.
	 * @param {LngLat} lnglat location
	 * @returns {Point} screen point
	 * @private
	 */
	locationPoint(lnglat: LngLat): Point;
	/**
	 * Given a location, return the screen point that corresponds to it
	 * In 3D mode (when terrain is enabled) elevation is sampled for the point before
	 * projecting it. In 2D mode, behaves the same locationPoint.
	 * @param {LngLat} lnglat location
	 * @returns {Point} screen point
	 * @private
	 */
	locationPoint3D(lnglat: LngLat): Point;
	/**
	 * Given a point on screen, return its lnglat
	 * @param {Point} p screen point
	 * @returns {LngLat} lnglat location
	 * @private
	 */
	pointLocation(p: Point): LngLat;
	/**
	 * Given a point on screen, return its lnglat
	 * In 3D mode (map with terrain) returns location of terrain raycast point.
	 * In 2D mode, behaves the same as {@see pointLocation}.
	 * @param {Point} p screen point
	 * @returns {LngLat} lnglat location
	 * @private
	 */
	pointLocation3D(p: Point): LngLat;
	/**
	 * Given a geographical lngLat, return an unrounded
	 * coordinate that represents it at this transform's zoom level.
	 * @param {LngLat} lngLat
	 * @returns {Coordinate}
	 * @private
	 */
	locationCoordinate(lngLat: LngLat, altitude?: number): MercatorCoordinate;
	/**
	 * Given a Coordinate, return its geographical position.
	 * @param {Coordinate} coord
	 * @returns {LngLat} lngLat
	 * @private
	 */
	coordinateLocation(coord: MercatorCoordinate): LngLat;
	/**
	 * Casts a ray from a point on screen and returns the Ray,
	 * and the extent along it, at which it intersects the map plane.
	 *
	 * @param {Point} p Viewport pixel co-ordinates.
	 * @param {number} z Optional altitude of the map plane, defaulting to elevation at center.
	 * @returns {{ p0: Vec4, p1: Vec4, t: number }} p0,p1 are two points on the ray.
	 * t is the fractional extent along the ray at which the ray intersects the map plane.
	 * @private
	 */
	pointRayIntersection(p: Point, z?: number | null): RayIntersectionResult;
	screenPointToMercatorRay(p: Point): Ray;
	/**
	 *  Helper method to convert the ray intersection with the map plane to MercatorCoordinate.
	 *
	 * @param {RayIntersectionResult} rayIntersection
	 * @returns {MercatorCoordinate}
	 * @private
	 */
	rayIntersectionCoordinate(rayIntersection: RayIntersectionResult): MercatorCoordinate;
	/**
	 * Given a point on screen, returns MercatorCoordinate.
	 * @param {Point} p Top left origin screen point, in pixels.
	 * @param {number} z Optional altitude of the map plane, defaulting to elevation at center.
	 * @private
	 */
	pointCoordinate(p: Point, z?: number): MercatorCoordinate;
	/**
	 * Given a point on screen, returns MercatorCoordinate.
	 * In 3D mode, raycast to terrain. In 2D mode, behaves the same as {@see pointCoordinate}.
	 * For p above terrain, don't return point behind camera but clamp p.y at the top of terrain.
	 * @param {Point} p top left origin screen point, in pixels.
	 * @private
	 */
	pointCoordinate3D(p: Point): MercatorCoordinate;
	/**
	 * Returns true if a screenspace Point p, is above the horizon.
	 * In non-globe projections, this approximates the map as an infinite plane and does not account for z0-z3
	 * wherein the map is small quad with whitespace above the north pole and below the south pole.
	 *
	 * @param {Point} p
	 * @returns {boolean}
	 * @private
	 */
	isPointAboveHorizon(p: Point): boolean;
	/**
	 * Determines if the given point is located on a visible map surface.
	 *
	 * @param {Point} p
	 * @returns {boolean}
	 * @private
	 */
	isPointOnSurface(p: Point): boolean;
	/**
	 * Given a coordinate, return the screen point that corresponds to it
	 * @param {Coordinate} coord
	 * @param {boolean} sampleTerrainIn3D in 3D mode (terrain enabled), sample elevation for the point.
	 * If false, do the same as in 2D mode, assume flat camera elevation plane for all points.
	 * @returns {Point} screen point
	 * @private
	 */
	_coordinatePoint(coord: MercatorCoordinate, sampleTerrainIn3D: boolean): Point;
	_getBoundsNonRectangular(): LngLatBounds;
	_getBoundsRectangular(min: number, max: number): LngLatBounds;
	_getBoundsRectangularTerrain(): LngLatBounds;
	/**
	 * Returns the map's geographical bounds. When the bearing or pitch is non-zero, the visible region is not
	 * an axis-aligned rectangle, and the result is the smallest bounds that encompasses the visible region.
	 *
	 * @returns {LngLatBounds} Returns a {@link LngLatBounds} object describing the map's geographical bounds.
	 */
	getBounds(): LngLatBounds;
	/**
	 * Returns position of horizon line from the top of the map in pixels.
	 * If horizon is not visible, returns 0 by default or a negative value if called with clampToTop = false.
	 * @private
	 */
	horizonLineFromTop(clampToTop?: boolean): number;
	/**
	 * Returns the maximum geographical bounds the map is constrained to, or `null` if none set.
	 * @returns {LngLatBounds} {@link LngLatBounds}.
	 */
	getMaxBounds(): LngLatBounds | null | undefined;
	/**
	 * Sets or clears the map's geographical constraints.
	 *
	 * @param {LngLatBounds} bounds A {@link LngLatBounds} object describing the new geographic boundaries of the map.
	 */
	setMaxBounds(bounds?: LngLatBounds | null): void;
	calculatePosMatrix(unwrappedTileID: UnwrappedTileID, worldSize: number): Float64Array;
	calculateDistanceTileData(unwrappedTileID: UnwrappedTileID): FeatureDistanceData;
	/**
	 * Calculate the fogTileMatrix that, given a tile coordinate, can be used to
	 * calculate its position relative to the camera in units of pixels divided
	 * by the map height. Used with fog for consistent computation of distance
	 * from camera.
	 *
	 * @param {UnwrappedTileID} unwrappedTileID;
	 * @private
	 */
	calculateFogTileMatrix(unwrappedTileID: UnwrappedTileID): Float32Array;
	/**
	 * Calculate the projMatrix that, given a tile coordinate, would be used to display the tile on the screen.
	 * @param {UnwrappedTileID} unwrappedTileID;
	 * @private
	 */
	calculateProjMatrix(unwrappedTileID: UnwrappedTileID, aligned?: boolean, expanded?: boolean): Float32Array;
	calculatePixelsToTileUnitsMatrix(tile: Tile): Float32Array;
	customLayerMatrix(): Array<number>;
	globeToMercatorMatrix(): Array<number> | null | undefined;
	recenterOnTerrain(): void;
	_constrainCamera(adaptCameraAltitude?: boolean): void;
	_constrain(): void;
	/**
	 * Returns the minimum zoom at which `this.width` can fit max longitude range
	 * and `this.height` can fit max latitude range.
	 *
	 * @returns {number} The zoom value.
	 */
	_minZoomForBounds(): number;
	/**
	 * Returns the maximum distance of the camera from the center of the bounds, such that
	 * `this.width` can fit max longitude range and `this.height` can fit max latitude range.
	 * In mercator units.
	 *
	 * @returns {number} The mercator z coordinate.
	 */
	_maxCameraBoundsDistance(): number;
	_calcMatrices(): void;
	_calcFogMatrices(): void;
	_computeCameraPosition(targetPixelsPerMeter?: number | null): [
		number,
		number,
		number
	];
	_updateCameraState(): void;
	/**
	 * Apply a 3d translation to the camera position, but clamping it so that
	 * it respects the maximum longitude and latitude range set.
	 *
	 * @param {vec3} translation The translation vector.
	 */
	_translateCameraConstrained(translation: vec3): void;
	_updateStateFromCamera(): void;
	_worldSizeFromZoom(zoom: number): number;
	_mercatorZfromZoom(zoom: number): number;
	_minimumHeightOverTerrain(): number;
	_zoomFromMercatorZ(z: number): number;
	zoomFromMercatorZAdjusted(mercatorZ: number): number;
	_terrainEnabled(): boolean;
	anyCornerOffEdge(p0: Point, p1: Point): boolean;
	isHorizonVisible(): boolean;
	/**
	 * Converts a zoom delta value into a physical distance travelled in web mercator coordinates.
	 *
	 * @param {vec3} center Destination mercator point of the movement.
	 * @param {number} zoomDelta Change in the zoom value.
	 * @returns {number} The distance in mercator coordinates.
	 */
	zoomDeltaToMovement(center: vec3, zoomDelta: number): number;
	getCameraPoint(): Point;
	getCameraToCenterDistance(projection: Projection$2, zoom?: number, worldSize?: number): number;
	getWorldToCameraMatrix(): mat4;
	getFrustum(zoom: number): Frustum;
}
export type PointLike = Point | [
	number,
	number
];
type CachedPolygon = {
	polygon: MercatorCoordinate[];
	unwrapped: boolean;
};
declare class QueryGeometry {
	screenBounds: Point[];
	cameraPoint: Point;
	screenGeometry: Point[];
	screenGeometryMercator: CachedPolygon;
	_screenRaycastCache: {
		[_: number]: CachedPolygon;
	};
	_cameraRaycastCache: {
		[_: number]: CachedPolygon;
	};
	isAboveHorizon: boolean;
	constructor(screenBounds: Point[], cameraPoint: Point, aboveHorizon: boolean, transform: Transform);
	/**
	 * Factory method to help contruct an instance  while accounting for current map state.
	 *
	 * @static
	 * @param {(PointLike | [PointLike, PointLike])} geometry The query geometry.
	 * @param {Transform} transform The current map transform.
	 * @returns {QueryGeometry} An instance of the QueryGeometry class.
	 */
	static createFromScreenPoints(geometry: PointLike | [
		PointLike,
		PointLike
	], transform: Transform): QueryGeometry;
	/**
	 * Returns true if the initial query by the user was a single point.
	 *
	 * @returns {boolean} Returns `true` if the initial query geometry was a single point.
	 */
	isPointQuery(): boolean;
	/**
	 * Due to data-driven styling features do not uniform size(eg `circle-radius`) and can be offset differntly
	 * from their original location(for example with `*-translate`). This means we have to expand our query region for
	 * each tile to account for variation in these properties.
	 * Each tile calculates a tile level max padding value (in screenspace pixels) when its parsed, this function
	 * lets us calculate a buffered version of the screenspace query geometry for each tile.
	 *
	 * @param {number} buffer The tile padding in screenspace pixels.
	 * @returns {Point[]} The buffered query geometry.
	 */
	bufferedScreenGeometry(buffer: number): Point[];
	/**
	 * When the map is pitched, some of the 3D features that intersect a query will not intersect
	 * the query at the surface of the earth. Instead the feature may be closer and only intersect
	 * the query because it extrudes into the air.
	 *
	 * This returns a geometry that is a convex polygon that encompasses the query frustum and the point underneath the camera.
	 * Similar to `bufferedScreenGeometry`, buffering is added to account for variation in paint properties.
	 *
	 * Case 1: point underneath camera is exactly behind query volume
	 *              +----------+
	 *              |          |
	 *              |          |
	 *              |          |
	 *              +          +
	 *               X        X
	 *                X      X
	 *                 X    X
	 *                  X  X
	 *                   XX.
	 *
	 * Case 2: point is behind and to the right
	 *              +----------+
	 *              |          X
	 *              |           X
	 *              |           XX
	 *              +            X
	 *              XXX          XX
	 *                 XXXX       X
	 *                    XXX     XX
	 *                        XX   X
	 *                           XXX.
	 *
	 * Case 3: point is behind and to the left
	 *              +----------+
	 *             X           |
	 *             X           |
	 *            XX           |
	 *            X            +
	 *           X          XXXX
	 *          XX       XXX
	 *          X    XXXX
	 *         X XXXX
	 *         XXX.
	 *
	 * @param {number} buffer The tile padding in screenspace pixels.
	 * @returns {Point[]} The buffered query geometry.
	 */
	bufferedCameraGeometry(buffer: number): Point[];
	bufferedCameraGeometryGlobe(buffer: number): Point[];
	/**
	 * Checks if a tile is contained within this query geometry.
	 *
	 * @param {Tile} tile The tile to check.
	 * @param {Transform} transform The current map transform.
	 * @param {boolean} use3D A boolean indicating whether to query 3D features.
	 * @param {number} cameraWrap A wrap value for offsetting the camera position.
	 * @returns {?TilespaceQueryGeometry} Returns `undefined` if the tile does not intersect.
	 */
	containsTile(tile: Tile, transform: Transform, use3D: boolean, cameraWrap?: number): TilespaceQueryGeometry | null | undefined;
	/**
	 * These methods add caching on top of the terrain raycasting provided by `Transform#pointCoordinate3d`.
	 * Tiles come with different values of padding, however its very likely that multiple tiles share the same value of padding
	 * based on the style. In that case we want to reuse the result from a previously computed terrain raycast.
	 */
	_bufferedScreenMercator(padding: number, transform: Transform): CachedPolygon;
	_bufferedCameraMercator(padding: number, transform: Transform): CachedPolygon;
	_projectAndResample(polygon: Point[], transform: Transform): CachedPolygon;
}
type TilespaceQueryGeometry = {
	queryGeometry: QueryGeometry;
	tilespaceGeometry: Point[];
	tilespaceRays: Ray[];
	bufferedTilespaceGeometry: Point[];
	bufferedTilespaceBounds: {
		min: Point;
		max: Point;
	};
	tile: Tile;
	tileID: OverscaledTileID;
	pixelToTileUnitsFactor: number;
};
declare class HeatmapStyleLayer extends StyleLayer {
	heatmapFbo: Framebuffer | null | undefined;
	colorRamp: RGBAImage;
	colorRampTexture: Texture | null | undefined;
	_transitionablePaint: Transitionable<PaintProps>;
	_transitioningPaint: Transitioning<PaintProps>;
	paint: PossiblyEvaluated<PaintProps>;
	createBucket(parameters: BucketParameters<HeatmapStyleLayer>): HeatmapBucket;
	constructor(layer: LayerSpecification, scope: string, lut: LUT$1 | null, options?: ConfigOptions | null);
	_handleSpecialPaintPropertyUpdate(name: string): void;
	_updateColorRamp(): void;
	resize(): void;
	queryRadius(bucket: Bucket): number;
	queryIntersectsFeature(queryGeometry: TilespaceQueryGeometry, feature: VectorTileFeature, featureState: FeatureState, geometry: Array<Array<Point>>, zoom: number, transform: Transform, pixelPosMatrix: Float32Array, elevationHelper?: DEMSampler | null): boolean;
	hasOffscreenPass(): boolean;
	getProgramIds(): Array<string>;
	getDefaultProgramParams(name: string, zoom: number, lut: LUT$1 | null): CreateProgramParams | null;
}
declare class CircleBucket<Layer extends CircleStyleLayer | HeatmapStyleLayer> implements Bucket {
	index: number;
	zoom: number;
	overscaling: number;
	layerIds: Array<string>;
	layers: Array<Layer>;
	stateDependentLayers: Array<Layer>;
	stateDependentLayerIds: Array<string>;
	layoutVertexArray: StructArrayLayout2i4;
	layoutVertexBuffer: VertexBuffer;
	globeExtVertexArray: StructArrayLayout6i12 | null | undefined;
	globeExtVertexBuffer: VertexBuffer | null | undefined;
	indexArray: StructArrayLayout3ui6;
	indexBuffer: IndexBuffer;
	hasPattern: boolean;
	programConfigurations: ProgramConfigurationSet<Layer>;
	segments: SegmentVector;
	uploaded: boolean;
	projection: ProjectionSpecification;
	constructor(options: BucketParameters<Layer>);
	updateFootprints(_id: UnwrappedTileID, _footprints: Array<TileFootprint>): void;
	populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID, tileTransform: TileTransform): void;
	update(states: FeatureStates, vtLayer: VectorTileLayer, availableImages: Array<string>, imagePositions: SpritePositions, brightness?: number | null): void;
	isEmpty(): boolean;
	uploadPending(): boolean;
	upload(context: Context): void;
	destroy(): void;
	addFeature(feature: BucketFeature, geometry: Array<Array<Point>>, index: number, availableImages: Array<string>, canonical: CanonicalTileID, projection?: Projection$2 | null, brightness?: number | null): void;
}
type LayoutProps$2 = {
	"circle-sort-key": DataDrivenProperty<number>;
	"visibility": DataConstantProperty<"visible" | "none">;
};
type PaintProps$5 = {
	"circle-radius": DataDrivenProperty<number>;
	"circle-color": DataDrivenProperty<Color>;
	"circle-blur": DataDrivenProperty<number>;
	"circle-opacity": DataDrivenProperty<number>;
	"circle-translate": DataConstantProperty<[
		number,
		number
	]>;
	"circle-translate-anchor": DataConstantProperty<"map" | "viewport">;
	"circle-pitch-scale": DataConstantProperty<"map" | "viewport">;
	"circle-pitch-alignment": DataConstantProperty<"map" | "viewport">;
	"circle-stroke-width": DataDrivenProperty<number>;
	"circle-stroke-color": DataDrivenProperty<Color>;
	"circle-stroke-opacity": DataDrivenProperty<number>;
	"circle-emissive-strength": DataConstantProperty<number>;
};
declare class CircleStyleLayer extends StyleLayer {
	_unevaluatedLayout: Layout<LayoutProps$2>;
	layout: PossiblyEvaluated<LayoutProps$2>;
	_transitionablePaint: Transitionable<PaintProps$5>;
	_transitioningPaint: Transitioning<PaintProps$5>;
	paint: PossiblyEvaluated<PaintProps$5>;
	constructor(layer: LayerSpecification, scope: string, lut: LUT$1 | null, options?: ConfigOptions | null);
	createBucket(parameters: BucketParameters<CircleStyleLayer>): CircleBucket<CircleStyleLayer>;
	queryRadius(bucket: Bucket): number;
	queryIntersectsFeature(queryGeometry: TilespaceQueryGeometry, feature: VectorTileFeature, featureState: FeatureState, geometry: Array<Array<Point>>, zoom: number, transform: Transform, pixelPosMatrix: Float32Array, elevationHelper?: DEMSampler | null): boolean;
	getProgramIds(): Array<string>;
	getDefaultProgramParams(_: string, zoom: number, lut: LUT$1 | null): CreateProgramParams | null;
}
declare class FillBucket implements Bucket {
	index: number;
	zoom: number;
	overscaling: number;
	layers: Array<FillStyleLayer>;
	layerIds: Array<string>;
	stateDependentLayers: Array<FillStyleLayer>;
	stateDependentLayerIds: Array<string>;
	patternFeatures: Array<BucketFeature>;
	layoutVertexArray: StructArrayLayout2i4;
	layoutVertexBuffer: VertexBuffer;
	indexArray: StructArrayLayout3ui6;
	indexBuffer: IndexBuffer;
	indexArray2: StructArrayLayout2ui4;
	indexBuffer2: IndexBuffer;
	hasPattern: boolean;
	programConfigurations: ProgramConfigurationSet<FillStyleLayer>;
	segments: SegmentVector;
	segments2: SegmentVector;
	uploaded: boolean;
	projection: ProjectionSpecification;
	constructor(options: BucketParameters<FillStyleLayer>);
	updateFootprints(_id: UnwrappedTileID, _footprints: Array<TileFootprint>): void;
	populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID, tileTransform: TileTransform): void;
	update(states: FeatureStates, vtLayer: VectorTileLayer, availableImages: Array<string>, imagePositions: SpritePositions, brightness?: number | null): void;
	addFeatures(options: PopulateParameters, canonical: CanonicalTileID, imagePositions: SpritePositions, availableImages: Array<string>, _: TileTransform, brightness?: number | null): void;
	isEmpty(): boolean;
	uploadPending(): boolean;
	upload(context: Context): void;
	destroy(): void;
	addFeature(feature: BucketFeature, geometry: Array<Array<Point>>, index: number, canonical: CanonicalTileID, imagePositions: SpritePositions, availableImages?: Array<string>, brightness?: number | null): void;
}
type LayoutProps$3 = {
	"fill-sort-key": DataDrivenProperty<number>;
	"visibility": DataConstantProperty<"visible" | "none">;
};
type PaintProps$6 = {
	"fill-antialias": DataConstantProperty<boolean>;
	"fill-opacity": DataDrivenProperty<number>;
	"fill-color": DataDrivenProperty<Color>;
	"fill-outline-color": DataDrivenProperty<Color>;
	"fill-translate": DataConstantProperty<[
		number,
		number
	]>;
	"fill-translate-anchor": DataConstantProperty<"map" | "viewport">;
	"fill-pattern": DataDrivenProperty<ResolvedImage | null | undefined>;
	"fill-emissive-strength": DataConstantProperty<number>;
};
declare class FillStyleLayer extends StyleLayer {
	_unevaluatedLayout: Layout<LayoutProps$3>;
	layout: PossiblyEvaluated<LayoutProps$3>;
	_transitionablePaint: Transitionable<PaintProps$6>;
	_transitioningPaint: Transitioning<PaintProps$6>;
	paint: PossiblyEvaluated<PaintProps$6>;
	constructor(layer: LayerSpecification, scope: string, lut: LUT$1 | null, options?: ConfigOptions | null);
	getProgramIds(): string[];
	getDefaultProgramParams(name: string, zoom: number, lut: LUT$1 | null): CreateProgramParams | null;
	recalculate(parameters: EvaluationParameters, availableImages: Array<string>): void;
	createBucket(parameters: BucketParameters<FillStyleLayer>): FillBucket;
	queryRadius(): number;
	queryIntersectsFeature(queryGeometry: TilespaceQueryGeometry, feature: VectorTileFeature, featureState: FeatureState, geometry: Array<Array<Point>>, zoom: number, transform: Transform): boolean;
	isTileClipped(): boolean;
}
declare class FootprintSegment {
	vertexOffset: number;
	vertexCount: number;
	indexOffset: number;
	indexCount: number;
	ringIndices: Array<number>;
	constructor();
}
declare class PartData {
	centroidXY: Point;
	vertexArrayOffset: number;
	vertexCount: number;
	groundVertexArrayOffset: number;
	groundVertexCount: number;
	flags: number;
	footprintSegIdx: number;
	footprintSegLen: number;
	polygonSegIdx: number;
	polygonSegLen: number;
	min: Point;
	max: Point;
	height: number;
	constructor();
	span(): Point;
}
declare class BorderCentroidData {
	acc: Point;
	accCount: number;
	borders: Array<[
		number,
		number
	]> | null | undefined;
	centroidDataIndex: number;
	constructor();
	startRing(data: PartData, p: Point): void;
	appendEdge(data: PartData, p: Point, prev: Point): void;
	checkBorderIntersection(p: Point, prev: Point): void;
	addBorderIntersection(index: 0 | 1 | 2 | 3, i: number): void;
	processBorderOverlap(p: Point, prev: Point): void;
	centroid(): Point;
	intersectsCount(): number;
}
type GroundQuad = {
	id: number;
	region: number;
};
declare class GroundEffect {
	vertexArray: StructArrayLayout5i10;
	vertexBuffer: VertexBuffer;
	hiddenByLandmarkVertexArray: StructArrayLayout1ub1;
	hiddenByLandmarkVertexBuffer: VertexBuffer;
	_needsHiddenByLandmarkUpdate: boolean;
	indexArray: StructArrayLayout3ui6;
	indexBuffer: IndexBuffer;
	_segments: SegmentVector;
	_segmentToGroundQuads: {
		[key: number]: Array<GroundQuad>;
	};
	_segmentToRegionTriCounts: {
		[key: number]: Array<number>;
	};
	regionSegments: {
		[key: number]: SegmentVector | null | undefined;
	};
	programConfigurations: ProgramConfigurationSet<FillExtrusionStyleLayer>;
	constructor(options: BucketParameters<FillExtrusionStyleLayer>);
	getDefaultSegment(): any;
	hasData(): boolean;
	addData(polyline: Array<Point>, bounds: [
		Point,
		Point
	], maxRadius: number, roundedEdges?: boolean): void;
	prepareBorderSegments(): void;
	addPaintPropertiesData(feature: Feature, index: number, imagePositions: SpritePositions, availableImages: Array<string>, canonical: CanonicalTileID, brightness?: number | null): void;
	upload(context: Context): void;
	uploadPaintProperties(context: Context): void;
	update(states: FeatureStates, vtLayer: VectorTileLayer, layers: any, availableImages: Array<string>, imagePositions: SpritePositions, brightness?: number | null): void;
	updateHiddenByLandmark(data: PartData): void;
	uploadHiddenByLandmark(context: Context): void;
	destroy(): void;
}
type PolygonSegment = {
	triangleArrayOffset: number;
	triangleCount: number;
	triangleSegIdx: number;
};
type TriangleSubSegment = {
	segment: Segment;
	min: Point;
	max: Point;
};
declare class FillExtrusionBucket implements Bucket {
	index: number;
	zoom: number;
	canonical: CanonicalTileID;
	overscaling: number;
	layers: Array<FillExtrusionStyleLayer>;
	layerIds: Array<string>;
	stateDependentLayers: Array<FillExtrusionStyleLayer>;
	stateDependentLayerIds: Array<string>;
	layoutVertexArray: StructArrayLayout4i8;
	layoutVertexBuffer: VertexBuffer;
	centroidVertexArray: FillExtrusionCentroidArray;
	centroidVertexBuffer: VertexBuffer;
	layoutVertexExtArray: StructArrayLayout6i12 | null | undefined;
	layoutVertexExtBuffer: VertexBuffer | null | undefined;
	indexArray: StructArrayLayout3ui6;
	indexBuffer: IndexBuffer;
	footprintSegments: Array<FootprintSegment>;
	footprintVertices: StructArrayLayout2i4;
	footprintIndices: StructArrayLayout3ui6;
	hasPattern: boolean;
	edgeRadius: number;
	programConfigurations: ProgramConfigurationSet<FillExtrusionStyleLayer>;
	segments: SegmentVector;
	uploaded: boolean;
	features: Array<BucketFeature>;
	featuresOnBorder: Array<BorderCentroidData>;
	borderFeatureIndices: Array<Array<number>>;
	centroidData: Array<PartData>;
	borderDoneWithNeighborZ: Array<number>;
	needsCentroidUpdate: boolean;
	tileToMeter: number;
	projection: ProjectionSpecification;
	activeReplacements: Array<any>;
	replacementUpdateTime: number;
	groundEffect: GroundEffect;
	partLookup: {
		[_: number]: PartData | null | undefined;
	};
	maxHeight: number;
	triangleSubSegments: Array<TriangleSubSegment>;
	polygonSegments: Array<PolygonSegment>;
	constructor(options: BucketParameters<FillExtrusionStyleLayer>);
	updateFootprints(_id: UnwrappedTileID, _footprints: Array<TileFootprint>): void;
	populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID, tileTransform: TileTransform): void;
	addFeatures(options: PopulateParameters, canonical: CanonicalTileID, imagePositions: SpritePositions, availableImages: Array<string>, tileTransform: TileTransform, brightness?: number | null): void;
	update(states: FeatureStates, vtLayer: VectorTileLayer, availableImages: Array<string>, imagePositions: SpritePositions, brightness?: number | null): void;
	isEmpty(): boolean;
	uploadPending(): boolean;
	upload(context: Context): void;
	uploadCentroid(context: Context): void;
	destroy(): void;
	addFeature(feature: BucketFeature, geometry: Array<Array<Point>>, index: number, canonical: CanonicalTileID, imagePositions: SpritePositions, availableImages: Array<string>, tileTransform: TileTransform, brightness?: number | null): void;
	sortBorders(): void;
	splitToSubtiles(): void;
	getVisibleSegments(renderId: OverscaledTileID, elevation: Elevation | null | undefined, frustum: Frustum): SegmentVector;
	encodeCentroid(borderCentroidData: BorderCentroidData, data: PartData): Point;
	encodeBorderCentroid(borderCentroidData: BorderCentroidData): Point;
	showCentroid(borderCentroidData: BorderCentroidData): void;
	writeCentroidToBuffer(data: PartData): void;
	createCentroidsBuffer(): void;
	updateReplacement(coord: OverscaledTileID, source: ReplacementSource, layerIndex: number): void;
	footprintContainsPoint(x: number, y: number, centroid: PartData): boolean;
	getHeightAtTileCoord(x: number, y: number): {
		height: number;
		hidden: boolean;
	} | null | undefined;
}
type LayoutProps$4 = {
	"visibility": DataConstantProperty<"visible" | "none">;
	"fill-extrusion-edge-radius": DataConstantProperty<number>;
};
type PaintProps$7 = {
	"fill-extrusion-opacity": DataConstantProperty<number>;
	"fill-extrusion-color": DataDrivenProperty<Color>;
	"fill-extrusion-translate": DataConstantProperty<[
		number,
		number
	]>;
	"fill-extrusion-translate-anchor": DataConstantProperty<"map" | "viewport">;
	"fill-extrusion-pattern": DataDrivenProperty<ResolvedImage | null | undefined>;
	"fill-extrusion-height": DataDrivenProperty<number>;
	"fill-extrusion-base": DataDrivenProperty<number>;
	"fill-extrusion-vertical-gradient": DataConstantProperty<boolean>;
	"fill-extrusion-ambient-occlusion-intensity": DataConstantProperty<number>;
	"fill-extrusion-ambient-occlusion-radius": DataConstantProperty<number>;
	"fill-extrusion-ambient-occlusion-wall-radius": DataConstantProperty<number>;
	"fill-extrusion-ambient-occlusion-ground-radius": DataConstantProperty<number>;
	"fill-extrusion-ambient-occlusion-ground-attenuation": DataConstantProperty<number>;
	"fill-extrusion-flood-light-color": DataConstantProperty<Color>;
	"fill-extrusion-flood-light-intensity": DataConstantProperty<number>;
	"fill-extrusion-flood-light-wall-radius": DataDrivenProperty<number>;
	"fill-extrusion-flood-light-ground-radius": DataDrivenProperty<number>;
	"fill-extrusion-flood-light-ground-attenuation": DataConstantProperty<number>;
	"fill-extrusion-vertical-scale": DataConstantProperty<number>;
	"fill-extrusion-rounded-roof": DataConstantProperty<boolean>;
	"fill-extrusion-cutoff-fade-range": DataConstantProperty<number>;
	"fill-extrusion-emissive-strength": DataConstantProperty<number>;
};
declare class FillExtrusionStyleLayer extends StyleLayer {
	_transitionablePaint: Transitionable<PaintProps$7>;
	_transitioningPaint: Transitioning<PaintProps$7>;
	paint: PossiblyEvaluated<PaintProps$7>;
	layout: PossiblyEvaluated<LayoutProps$4>;
	constructor(layer: LayerSpecification, scope: string, lut: LUT$1 | null, options?: ConfigOptions | null);
	createBucket(parameters: BucketParameters<FillExtrusionStyleLayer>): FillExtrusionBucket;
	queryRadius(): number;
	is3D(): boolean;
	hasShadowPass(): boolean;
	cutoffRange(): number;
	canCastShadows(): boolean;
	getProgramIds(): string[];
	queryIntersectsFeature(queryGeometry: TilespaceQueryGeometry, feature: VectorTileFeature, featureState: FeatureState, geometry: Array<Array<Point>>, zoom: number, transform: Transform, pixelPosMatrix: Float32Array, elevationHelper: DEMSampler | null | undefined, layoutVertexArrayOffset: number): boolean | number;
}
declare class Anchor extends Point {
	angle: any;
	z: number;
	segment: number | undefined;
	constructor(x: number, y: number, z: number, angle: number, segment?: number);
	clone(): Anchor;
}
declare class OcclusionQuery {
	_query: WebGLQuery;
	_gl: WebGL2RenderingContext;
	_isFree: boolean;
	constructor(context: Context);
	begin(): void;
	end(): void;
	isResultAvailable(): boolean;
	consumeResult(): number;
	isFree(): boolean;
	destroy(): void;
}
type TextureCoordinate = {
	x: number;
	y: number;
	w: number;
	h: number;
};
type SymbolQuad = {
	tl: Point;
	tr: Point;
	bl: Point;
	br: Point;
	texPrimary: TextureCoordinate;
	texSecondary: TextureCoordinate | null | undefined;
	pixelOffsetTL: Point;
	pixelOffsetBR: Point;
	writingMode: any | undefined;
	glyphOffset: [
		number,
		number
	];
	sectionIndex: number;
	isSDF: boolean;
	minFontScaleX: number;
	minFontScaleY: number;
};
type SingleCollisionBox = {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	padding: number;
	projectedAnchorX: number;
	projectedAnchorY: number;
	projectedAnchorZ: number;
	tileAnchorX: number;
	tileAnchorY: number;
	elevation?: number;
	tileID?: OverscaledTileID;
};
type CollisionArrays = {
	textBox?: SingleCollisionBox;
	verticalTextBox?: SingleCollisionBox;
	iconBox?: SingleCollisionBox;
	verticalIconBox?: SingleCollisionBox;
	textFeatureIndex?: number;
	verticalTextFeatureIndex?: number;
	iconFeatureIndex?: number;
	verticalIconFeatureIndex?: number;
};
type SymbolFeature = {
	sortKey: number | undefined;
	text: Formatted | undefined;
	icon: ResolvedImage | null | undefined;
	index: number;
	sourceLayerIndex: number;
	geometry: Array<Array<Point>>;
	properties: any;
	type: "Point" | "LineString" | "Polygon";
	id?: any;
};
type SortKeyRange = {
	sortKey: number;
	symbolInstanceStart: number;
	symbolInstanceEnd: number;
};
type LineVertexRange = {
	lineLength: number;
	lineStartIndex: number;
};
declare function addDynamicAttributes(dynamicLayoutVertexArray: StructArray, x: number, y: number, z: number, angle: number): void;
declare class SymbolBuffers {
	layoutVertexArray: StructArrayLayout4i4ui4i24;
	layoutVertexBuffer: VertexBuffer;
	indexArray: StructArrayLayout3ui6;
	indexBuffer: IndexBuffer;
	programConfigurations: ProgramConfigurationSet<SymbolStyleLayer>;
	segments: SegmentVector;
	dynamicLayoutVertexArray: StructArrayLayout4f16;
	dynamicLayoutVertexBuffer: VertexBuffer;
	opacityVertexArray: StructArrayLayout1ul4;
	opacityVertexBuffer: VertexBuffer;
	occlusionQueryOpacityVertexArray: StructArrayLayout1f4;
	occlusionQueryOpacityVertexBuffer: VertexBuffer;
	zOffsetVertexArray: StructArrayLayout1f4;
	zOffsetVertexBuffer: VertexBuffer;
	iconTransitioningVertexArray: StructArrayLayout2ui4;
	iconTransitioningVertexBuffer: VertexBuffer | null | undefined;
	globeExtVertexArray: StructArrayLayout3i3f20;
	globeExtVertexBuffer: VertexBuffer | null | undefined;
	placedSymbolArray: PlacedSymbolArray;
	constructor(programConfigurations: ProgramConfigurationSet<SymbolStyleLayer>);
	isEmpty(): boolean;
	upload(context: Context, dynamicIndexBuffer: boolean, upload?: boolean, update?: boolean, createZOffsetBuffer?: boolean): void;
	destroy(): void;
}
declare class CollisionBuffers {
	layoutVertexArray: StructArray;
	layoutAttributes: Array<StructArrayMember>;
	layoutVertexBuffer: VertexBuffer;
	indexArray: StructArrayLayout3ui6 | StructArrayLayout2ui4;
	indexBuffer: IndexBuffer;
	segments: SegmentVector;
	collisionVertexArray: StructArrayLayout2ub2f12;
	collisionVertexBuffer: VertexBuffer;
	collisionVertexArrayExt: StructArrayLayout4f16;
	collisionVertexBufferExt: VertexBuffer;
	constructor(LayoutArray: Class<StructArray>, layoutAttributes: Array<StructArrayMember>, IndexArray: Class<StructArrayLayout3ui6 | StructArrayLayout2ui4>);
	upload(context: Context): void;
	destroy(): void;
}
declare class SymbolBucket implements Bucket {
	static addDynamicAttributes: typeof addDynamicAttributes;
	collisionBoxArray: CollisionBoxArray;
	zoom: number;
	lut: LUT$1 | null;
	overscaling: number;
	layers: Array<SymbolStyleLayer>;
	layerIds: Array<string>;
	stateDependentLayers: Array<SymbolStyleLayer>;
	stateDependentLayerIds: Array<string>;
	index: number;
	sdfIcons: boolean;
	iconsInText: boolean;
	iconsNeedLinear: boolean;
	bucketInstanceId: number;
	justReloaded: boolean;
	hasPattern: boolean;
	fullyClipped: boolean;
	textSizeData: SizeData;
	iconSizeData: SizeData;
	glyphOffsetArray: GlyphOffsetArray;
	lineVertexArray: SymbolLineVertexArray;
	features: Array<SymbolFeature>;
	symbolInstances: SymbolInstanceArray;
	collisionArrays: Array<CollisionArrays>;
	sortKeyRanges: Array<SortKeyRange>;
	pixelRatio: number;
	tilePixelRatio: number;
	compareText: {
		[_: string]: Array<Point>;
	};
	fadeStartTime: number;
	sortFeaturesByKey: boolean;
	sortFeaturesByY: boolean;
	canOverlap: boolean;
	sortedAngle: number;
	featureSortOrder: Array<number>;
	collisionCircleArray: Array<number>;
	placementInvProjMatrix: mat4;
	placementViewportMatrix: mat4;
	text: SymbolBuffers;
	icon: SymbolBuffers;
	textCollisionBox: CollisionBuffers;
	iconCollisionBox: CollisionBuffers;
	uploaded: boolean;
	sourceLayerIndex: number;
	sourceID: string;
	symbolInstanceIndexes: Array<number>;
	writingModes: Array<number>;
	allowVerticalPlacement: boolean;
	hasRTLText: boolean;
	projection: ProjectionSpecification;
	projectionInstance: Projection$2 | null | undefined;
	hasAnyIconTextFit: boolean;
	hasAnyZOffset: boolean;
	symbolInstanceIndexesSortedZOffset: Array<number>;
	zOffsetSortDirty: boolean;
	zOffsetBuffersNeedUpload: boolean;
	queries: Map<number, OcclusionQuery>;
	activeReplacements: Array<any>;
	replacementUpdateTime: number;
	constructor(options: BucketParameters<SymbolStyleLayer>);
	createArrays(): void;
	calculateGlyphDependencies(text: string, stack: {
		[_: number]: boolean;
	}, textAlongLine: boolean, allowVerticalPlacement: boolean, doesAllowVerticalWritingMode: boolean): void;
	updateFootprints(_id: UnwrappedTileID, _footprints: Array<TileFootprint>): void;
	updateReplacement(coord: OverscaledTileID, source: ReplacementSource): boolean;
	populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID, tileTransform: TileTransform): void;
	update(states: FeatureStates, vtLayer: VectorTileLayer, availableImages: Array<string>, imagePositions: SpritePositions, brightness?: number | null): void;
	updateOcclusionOpacities(context: Context, symbolParams: SymbolParams, dt: number): boolean;
	updateZOffset(): void;
	isEmpty(): boolean;
	uploadPending(): boolean;
	upload(context: Context): void;
	destroyDebugData(): void;
	getProjection(): Projection$2;
	destroy(): void;
	addToLineVertexArray(anchor: Anchor, line: Array<Point>): LineVertexRange;
	addSymbols(arrays: SymbolBuffers, quads: Array<SymbolQuad>, sizeVertex: any, lineOffset: [
		number,
		number
	], alongLine: boolean, feature: SymbolFeature, writingMode: any, globe: {
		anchor: Anchor;
		up: vec3;
	} | null | undefined, tileAnchor: Anchor, lineStartIndex: number, lineLength: number, associatedIconIndex: number, availableImages: Array<string>, canonical: CanonicalTileID, brightness: number | null | undefined, hasAnySecondaryIcon: boolean): void;
	_commitLayoutVertex(array: StructArray, boxTileAnchorX: number, boxTileAnchorY: number, boxTileAnchorZ: number, tileAnchorX: number, tileAnchorY: number, extrude: Point): void;
	_addCollisionDebugVertices(box: CollisionBox, scale: number, arrays: CollisionBuffers, boxTileAnchorX: number, boxTileAnchorY: number, boxTileAnchorZ: number, symbolInstance: SymbolInstance): void;
	_addTextDebugCollisionBoxes(size: any, zoom: number, collisionBoxArray: CollisionBoxArray, startIndex: number, endIndex: number, instance: SymbolInstance): void;
	_addIconDebugCollisionBoxes(size: any, zoom: number, collisionBoxArray: CollisionBoxArray, startIndex: number, endIndex: number, instance: SymbolInstance): void;
	generateCollisionDebugBuffers(zoom: number, collisionBoxArray: CollisionBoxArray): void;
	getSymbolInstanceTextSize(textSize: any, instance: SymbolInstance, zoom: number, boxIndex: number): number;
	getSymbolInstanceIconSize(iconSize: any, zoom: number, iconIndex: number): number;
	_commitDebugCollisionVertexUpdate(array: StructArray, scale: number, padding: number, zOffset: number): void;
	_updateTextDebugCollisionBoxes(size: any, zoom: number, collisionBoxArray: CollisionBoxArray, startIndex: number, endIndex: number, instance: SymbolInstance): void;
	_updateIconDebugCollisionBoxes(size: any, zoom: number, collisionBoxArray: CollisionBoxArray, startIndex: number, endIndex: number, instance: SymbolInstance): void;
	updateCollisionDebugBuffers(zoom: number, collisionBoxArray: CollisionBoxArray): void;
	_deserializeCollisionBoxesForSymbol(collisionBoxArray: CollisionBoxArray, textStartIndex: number, textEndIndex: number, verticalTextStartIndex: number, verticalTextEndIndex: number, iconStartIndex: number, iconEndIndex: number, verticalIconStartIndex: number, verticalIconEndIndex: number): CollisionArrays;
	deserializeCollisionBoxes(collisionBoxArray: CollisionBoxArray): void;
	hasTextData(): boolean;
	hasIconData(): boolean;
	hasDebugData(): CollisionBuffers;
	hasTextCollisionBoxData(): boolean;
	hasIconCollisionBoxData(): boolean;
	hasIconTextFit(): boolean;
	addIndicesForPlacedSymbol(iconOrText: SymbolBuffers, placedSymbolIndex: number): void;
	getSortedSymbolIndexes(angle: number): Array<number>;
	getSortedIndexesByZOffset(): Array<number>;
	addToSortKeyRanges(symbolInstanceIndex: number, sortKey: number): void;
	sortFeatures(angle: number): void;
}
type LayoutProps$5 = {
	"symbol-placement": DataConstantProperty<"point" | "line" | "line-center">;
	"symbol-spacing": DataConstantProperty<number>;
	"symbol-avoid-edges": DataConstantProperty<boolean>;
	"symbol-sort-key": DataDrivenProperty<number>;
	"symbol-z-order": DataConstantProperty<"auto" | "viewport-y" | "source">;
	"symbol-z-elevate": DataConstantProperty<boolean>;
	"icon-allow-overlap": DataConstantProperty<boolean>;
	"icon-ignore-placement": DataConstantProperty<boolean>;
	"icon-optional": DataConstantProperty<boolean>;
	"icon-rotation-alignment": DataConstantProperty<"map" | "viewport" | "auto">;
	"icon-size": DataDrivenProperty<number>;
	"icon-text-fit": DataDrivenProperty<"none" | "width" | "height" | "both">;
	"icon-text-fit-padding": DataDrivenProperty<[
		number,
		number,
		number,
		number
	]>;
	"icon-image": DataDrivenProperty<ResolvedImage>;
	"icon-rotate": DataDrivenProperty<number>;
	"icon-padding": DataConstantProperty<number>;
	"icon-keep-upright": DataConstantProperty<boolean>;
	"icon-offset": DataDrivenProperty<[
		number,
		number
	]>;
	"icon-anchor": DataDrivenProperty<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
	"icon-pitch-alignment": DataConstantProperty<"map" | "viewport" | "auto">;
	"text-pitch-alignment": DataConstantProperty<"map" | "viewport" | "auto">;
	"text-rotation-alignment": DataConstantProperty<"map" | "viewport" | "auto">;
	"text-field": DataDrivenProperty<Formatted>;
	"text-font": DataDrivenProperty<Array<string>>;
	"text-size": DataDrivenProperty<number>;
	"text-max-width": DataDrivenProperty<number>;
	"text-line-height": DataDrivenProperty<number>;
	"text-letter-spacing": DataDrivenProperty<number>;
	"text-justify": DataDrivenProperty<"auto" | "left" | "center" | "right">;
	"text-radial-offset": DataDrivenProperty<number>;
	"text-variable-anchor": DataConstantProperty<Array<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">>;
	"text-anchor": DataDrivenProperty<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
	"text-max-angle": DataConstantProperty<number>;
	"text-writing-mode": DataConstantProperty<Array<"horizontal" | "vertical">>;
	"text-rotate": DataDrivenProperty<number>;
	"text-padding": DataConstantProperty<number>;
	"text-keep-upright": DataConstantProperty<boolean>;
	"text-transform": DataDrivenProperty<"none" | "uppercase" | "lowercase">;
	"text-offset": DataDrivenProperty<[
		number,
		number
	]>;
	"text-allow-overlap": DataConstantProperty<boolean>;
	"text-ignore-placement": DataConstantProperty<boolean>;
	"text-optional": DataConstantProperty<boolean>;
	"visibility": DataConstantProperty<"visible" | "none">;
};
type PaintProps$8 = {
	"icon-opacity": DataDrivenProperty<number>;
	"icon-occlusion-opacity": DataDrivenProperty<number>;
	"icon-emissive-strength": DataDrivenProperty<number>;
	"text-emissive-strength": DataDrivenProperty<number>;
	"icon-color": DataDrivenProperty<Color>;
	"icon-halo-color": DataDrivenProperty<Color>;
	"icon-halo-width": DataDrivenProperty<number>;
	"icon-halo-blur": DataDrivenProperty<number>;
	"icon-translate": DataConstantProperty<[
		number,
		number
	]>;
	"icon-translate-anchor": DataConstantProperty<"map" | "viewport">;
	"icon-image-cross-fade": DataDrivenProperty<number>;
	"text-opacity": DataDrivenProperty<number>;
	"text-occlusion-opacity": DataDrivenProperty<number>;
	"text-color": DataDrivenProperty<Color>;
	"text-halo-color": DataDrivenProperty<Color>;
	"text-halo-width": DataDrivenProperty<number>;
	"text-halo-blur": DataDrivenProperty<number>;
	"text-translate": DataConstantProperty<[
		number,
		number
	]>;
	"text-translate-anchor": DataConstantProperty<"map" | "viewport">;
	"icon-color-saturation": DataConstantProperty<number>;
	"icon-color-contrast": DataConstantProperty<number>;
	"icon-color-brightness-min": DataConstantProperty<number>;
	"icon-color-brightness-max": DataConstantProperty<number>;
};
declare class SymbolStyleLayer extends StyleLayer {
	_unevaluatedLayout: Layout<LayoutProps$5>;
	layout: PossiblyEvaluated<LayoutProps$5>;
	_transitionablePaint: Transitionable<PaintProps$8>;
	_transitioningPaint: Transitioning<PaintProps$8>;
	paint: PossiblyEvaluated<PaintProps$8>;
	_colorAdjustmentMatrix: Float32Array;
	_saturation: number;
	_contrast: number;
	_brightnessMin: number;
	_brightnessMax: number;
	hasInitialOcclusionOpacityProperties: boolean;
	constructor(layer: LayerSpecification, scope: string, lut: LUT$1 | null, options?: ConfigOptions | null);
	recalculate(parameters: EvaluationParameters, availableImages: Array<string>): void;
	getColorAdjustmentMatrix(saturation: number, contrast: number, brightnessMin: number, brightnessMax: number): Float32Array;
	getValueAndResolveTokens(name: any, feature: Feature, canonical: CanonicalTileID, availableImages: Array<string>): string;
	createBucket(parameters: BucketParameters<SymbolStyleLayer>): SymbolBucket;
	queryRadius(): number;
	queryIntersectsFeature(): boolean;
	_setPaintOverrides(): void;
	_handleOverridablePaintPropertyUpdate<T, R>(name: string, oldValue: PropertyValue<T, R>, newValue: PropertyValue<T, R>): boolean;
	static hasPaintOverride(layout: PossiblyEvaluated<LayoutProps$5>, propertyName: string): boolean;
	getProgramIds(): string[];
	getDefaultProgramParams(name: string, zoom: number, lut: LUT$1 | null): CreateProgramParams | null;
}
declare class ClipBucket implements Bucket {
	index: number;
	zoom: number;
	layers: Array<ClipStyleLayer>;
	layerIds: Array<string>;
	stateDependentLayers: Array<ClipStyleLayer>;
	stateDependentLayerIds: Array<string>;
	hasPattern: boolean;
	footprints: Array<Footprint>;
	constructor(options: BucketParameters<ClipStyleLayer>);
	updateFootprints(id: UnwrappedTileID, footprints: Array<TileFootprint>): void;
	populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID, tileTransform: TileTransform): void;
	isEmpty(): boolean;
	uploadPending(): boolean;
	upload(_context: Context): void;
	update(_states: FeatureStates, _vtLayer: VectorTileLayer, _availableImages: Array<string>, _imagePositions: SpritePositions, _brightness?: number | null): void;
	destroy(): void;
	addFeature(feature: BucketFeature, geometry: Array<Array<Point>>, index: number, canonical: CanonicalTileID, imagePositions: SpritePositions, _availableImages?: Array<string>, _brightness?: number | null): void;
}
type LayoutProps$6 = {
	"clip-layer-types": DataConstantProperty<Array<"model" | "symbol">>;
};
type PaintProps$9 = {};
declare class ClipStyleLayer extends StyleLayer {
	_unevaluatedLayout: Layout<LayoutProps$6>;
	layout: PossiblyEvaluated<LayoutProps$6>;
	paint: PossiblyEvaluated<PaintProps$9>;
	constructor(layer: LayerSpecification, scope: string, lut: LUT$1 | null, options?: ConfigOptions | null);
	recalculate(parameters: EvaluationParameters, availableImages: Array<string>): void;
	createBucket(parameters: BucketParameters<ClipStyleLayer>): ClipBucket;
	isTileClipped(): boolean;
	is3D(): boolean;
}
type TypedStyleLayer = CircleStyleLayer | FillStyleLayer | FillExtrusionStyleLayer | HeatmapStyleLayer | LineStyleLayer | SymbolStyleLayer | ModelStyleLayer | ClipStyleLayer;
type BinderUniform = {
	name: string;
	property: string;
	binding: IUniform<any>;
};
type ProgramConfigurationContext = {
	zoom: number;
	lut: LUT$1 | null;
};
interface AttributeBinder {
	context: ProgramConfigurationContext;
	populatePaintArray(length: number, feature: Feature, imagePositions: SpritePositions, availableImages: Array<string>, canonical?: CanonicalTileID, brightness?: number | null | undefined, formattedSection?: FormattedSection): void;
	updatePaintArray(start: number, length: number, feature: Feature, featureState: FeatureState, availableImages: Array<string>, imagePositions: SpritePositions, brightness: number): void;
	upload(arg1: Context): void;
	destroy(): void;
}
interface UniformBinder {
	uniformNames: Array<string>;
	context: ProgramConfigurationContext;
	setUniform(program: WebGLProgram, uniform: IUniform<any>, globals: GlobalProperties, currentValue: PossiblyEvaluatedPropertyValue<any>, uniformName: string): void;
	getBinding(context: Context, name: string): Partial<IUniform<any>>;
}
declare class ProgramConfiguration {
	binders: {
		[_: string]: AttributeBinder | UniformBinder;
	};
	cacheKey: string;
	context: ProgramConfigurationContext;
	_buffers: Array<VertexBuffer>;
	constructor(layer: TypedStyleLayer, context: ProgramConfigurationContext, filterProperties?: (_: string) => boolean);
	getMaxValue(property: string): number;
	populatePaintArrays(newLength: number, feature: Feature, imagePositions: SpritePositions, availableImages: Array<string>, canonical?: CanonicalTileID, brightness?: number | null, formattedSection?: FormattedSection): void;
	setConstantPatternPositions(posTo: SpritePosition): void;
	updatePaintArrays(featureStates: FeatureStates, featureMap: FeaturePositionMap, featureMapWithoutIds: FeaturePositionMap, vtLayer: VectorTileLayer, layer: TypedStyleLayer, availableImages: Array<string>, imagePositions: SpritePositions, brightness: number): boolean;
	defines(): Array<string>;
	getBinderAttributes(): Array<string>;
	getBinderUniforms(): Array<string>;
	getPaintVertexBuffers(): Array<VertexBuffer>;
	getUniforms(context: Context): Array<BinderUniform>;
	setUniforms<Properties extends any>(program: WebGLProgram, context: Context, binderUniforms: Array<BinderUniform>, properties: PossiblyEvaluated<Properties>, globals: GlobalProperties): void;
	updatePaintBuffers(): void;
	upload(context: Context): void;
	destroy(): void;
}
declare class ProgramConfigurationSet<Layer extends TypedStyleLayer> {
	programConfigurations: {
		[_: string]: ProgramConfiguration;
	};
	needsUpload: boolean;
	_featureMap: FeaturePositionMap;
	_featureMapWithoutIds: FeaturePositionMap;
	_bufferOffset: number;
	_idlessCounter: number;
	constructor(layers: ReadonlyArray<Layer>, context: ProgramConfigurationContext, filterProperties?: (_: string) => boolean);
	populatePaintArrays(length: number, feature: Feature, index: number, imagePositions: SpritePositions, availableImages: Array<string>, canonical: CanonicalTileID, brightness?: number | null, formattedSection?: FormattedSection): void;
	updatePaintArrays(featureStates: FeatureStates, vtLayer: VectorTileLayer, layers: ReadonlyArray<TypedStyleLayer>, availableImages: Array<string>, imagePositions: SpritePositions, brightness?: number | null): void;
	get(layerId: string): ProgramConfiguration;
	upload(context: Context): void;
	destroy(): void;
}
type FogUniformsType = {
	["u_fog_matrix"]: UniformMatrix4f;
	["u_fog_range"]: Uniform2f;
	["u_fog_color"]: Uniform4f;
	["u_fog_horizon_blend"]: Uniform1f;
	["u_fog_vertical_limit"]: Uniform2f;
	["u_fog_temporal_offset"]: Uniform1f;
	["u_frustum_tl"]: Uniform3f;
	["u_frustum_tr"]: Uniform3f;
	["u_frustum_br"]: Uniform3f;
	["u_frustum_bl"]: Uniform3f;
	["u_globe_pos"]: Uniform3f;
	["u_globe_radius"]: Uniform1f;
	["u_globe_transition"]: Uniform1f;
	["u_is_globe"]: Uniform1i;
	["u_viewport"]: Uniform2f;
};
type LightsUniformsType = {
	["u_lighting_ambient_color"]: Uniform3f;
	["u_lighting_directional_dir"]: Uniform3f;
	["u_lighting_directional_color"]: Uniform3f;
	["u_ground_radiance"]: Uniform3f;
};
declare class CullFaceMode {
	enable: boolean;
	mode: CullFaceModeType;
	frontFace: FrontFaceType;
	constructor(enable: boolean, mode: CullFaceModeType, frontFace: FrontFaceType);
	static disabled: Readonly<CullFaceMode>;
	static backCCW: Readonly<CullFaceMode>;
	static backCW: Readonly<CullFaceMode>;
	static frontCW: Readonly<CullFaceMode>;
	static frontCCW: Readonly<CullFaceMode>;
}
type DrawMode = WebGL2RenderingContext["POINTS"] | WebGL2RenderingContext["LINES"] | WebGL2RenderingContext["TRIANGLES"] | WebGL2RenderingContext["LINE_STRIP"];
type ShaderSource = {
	fragmentSource: string;
	vertexSource: string;
	staticAttributes: Array<string>;
	usedDefines: Array<string>;
	vertexIncludes: Array<string>;
	fragmentIncludes: Array<string>;
};
declare class Program$1<Us extends UniformBindings> {
	program: WebGLProgram;
	attributes: {
		[_: string]: number;
	};
	numAttributes: number;
	fixedUniforms: Us;
	binderUniforms: Array<BinderUniform>;
	failedToCreate: boolean;
	terrainUniforms: TerrainUniformsType | null | undefined;
	fogUniforms: FogUniformsType | null | undefined;
	cutoffUniforms: CutoffUniformsType | null | undefined;
	lightsUniforms: LightsUniformsType | null | undefined;
	globeUniforms: GlobeUniformsType | null | undefined;
	shadowUniforms: ShadowUniformsType | null | undefined;
	name: string;
	configuration: ProgramConfiguration | null | undefined;
	fixedDefines: string[];
	static cacheKey<Us extends UniformBindings>(source: ShaderSource, name: string, defines: string[], programConfiguration?: ProgramConfiguration | null): string;
	constructor(context: Context, name: string, source: ShaderSource, configuration: ProgramConfiguration | null | undefined, fixedUniforms: (arg1: Context) => Us, fixedDefines: string[]);
	setTerrainUniformValues(context: Context, terrainUniformValues: UniformValues<TerrainUniformsType>): void;
	setGlobeUniformValues(context: Context, globeUniformValues: UniformValues<GlobeUniformsType>): void;
	setFogUniformValues(context: Context, fogUniformValues: UniformValues<FogUniformsType>): void;
	setCutoffUniformValues(context: Context, cutoffUniformValues: UniformValues<CutoffUniformsType>): void;
	setLightsUniformValues(context: Context, lightsUniformValues: UniformValues<LightsUniformsType>): void;
	setShadowUniformValues(context: Context, shadowUniformValues: UniformValues<ShadowUniformsType>): void;
	_drawDebugWireframe(painter: Painter, depthMode: Readonly<DepthMode>, stencilMode: Readonly<StencilMode>, colorMode: Readonly<ColorMode>, indexBuffer: IndexBuffer, segment: Segment, currentProperties: any, zoom?: number | null, configuration?: ProgramConfiguration | null, instanceCount?: number | null): void;
	draw(painter: Painter, drawMode: DrawMode, depthMode: Readonly<DepthMode>, stencilMode: Readonly<StencilMode>, colorMode: Readonly<ColorMode>, cullFaceMode: Readonly<CullFaceMode>, uniformValues: UniformValues<Us>, layerID: string, layoutVertexBuffer: VertexBuffer, indexBuffer: IndexBuffer | undefined, segments: SegmentVector, currentProperties: any, zoom?: number | null, configuration?: ProgramConfiguration | null, dynamicLayoutBuffers?: Array<VertexBuffer | null | undefined> | null, instanceCount?: number | null): void;
}
declare class VertexBuffer {
	length: number;
	attributes: ReadonlyArray<StructArrayMember>;
	itemSize: number;
	dynamicDraw: boolean | null | undefined;
	context: Context;
	buffer: WebGLBuffer | null | undefined;
	instanceCount: number | null | undefined;
	/**
	 * @param dynamicDraw Whether this buffer will be repeatedly updated.
	 * @private
	 */
	constructor(context: Context, array: StructArray, attributes: ReadonlyArray<StructArrayMember>, dynamicDraw?: boolean, noDestroy?: boolean, instanceCount?: number);
	bind(): void;
	updateData(array: StructArray): void;
	enableAttributes(gl: WebGL2RenderingContext, program: Program$1<any>): void;
	/**
	 * Set the attribute pointers in a WebGL context.
	 * @param gl The WebGL context.
	 * @param program The active WebGL program.
	 * @param vertexOffset Index of the starting vertex of the segment.
	 */
	setVertexAttribPointers(gl: WebGL2RenderingContext, program: Program$1<any>, vertexOffset?: number | null): void;
	setVertexAttribDivisor(gl: WebGL2RenderingContext, program: Program$1<any>, value: number): void;
	/**
	 * Destroy the GL buffer bound to the given WebGL context.
	 */
	destroy(): void;
}
type ClearArgs = {
	color?: Color;
	depth?: number;
	stencil?: number;
	colorMask?: ColorMaskType;
};
type ContextOptions = {
	extTextureFilterAnisotropicForceOff?: boolean;
	extTextureFloatLinearForceOff?: boolean;
	extStandardDerivativesForceOff?: boolean;
};
declare class Context {
	gl: WebGL2RenderingContext;
	currentNumAttributes: number | null | undefined;
	maxTextureSize: number;
	clearColor: ClearColor;
	clearDepth: ClearDepth;
	clearStencil: ClearStencil;
	colorMask: ColorMask;
	depthMask: DepthMask;
	stencilMask: StencilMask;
	stencilFunc: StencilFunc;
	stencilOp: StencilOp;
	stencilTest: StencilTest$1;
	depthRange: DepthRange;
	depthTest: DepthTest;
	depthFunc: DepthFunc;
	blend: Blend;
	blendFunc: BlendFunc;
	blendColor: BlendColor;
	blendEquation: BlendEquation;
	cullFace: CullFace;
	cullFaceSide: CullFaceSide;
	frontFace: FrontFace;
	program: Program;
	activeTexture: ActiveTextureUnit;
	viewport: Viewport;
	bindFramebuffer: BindFramebuffer;
	bindRenderbuffer: BindRenderbuffer;
	bindTexture: BindTexture;
	bindVertexBuffer: BindVertexBuffer;
	bindElementBuffer: BindElementBuffer;
	bindVertexArrayOES: BindVertexArrayOES;
	pixelStoreUnpack: PixelStoreUnpack;
	pixelStoreUnpackPremultiplyAlpha: PixelStoreUnpackPremultiplyAlpha;
	pixelStoreUnpackFlipY: PixelStoreUnpackFlipY;
	renderer: string | null | undefined;
	vendor: string | null | undefined;
	extTextureFilterAnisotropic: any;
	extTextureFilterAnisotropicMax: any;
	extTextureHalfFloat: any;
	extRenderToTextureHalfFloat: any;
	extDebugRendererInfo: any;
	extTimerQuery: any;
	extTextureFloatLinear: any;
	options: ContextOptions;
	maxPointSize: number;
	constructor(gl: WebGL2RenderingContext, options?: ContextOptions);
	setDefault(): void;
	setDirty(): void;
	createIndexBuffer(array: StructArrayLayout3ui6 | StructArrayLayout2ui4 | StructArrayLayout1ui2, dynamicDraw?: boolean, noDestroy?: boolean): IndexBuffer;
	createVertexBuffer(array: StructArray, attributes: ReadonlyArray<StructArrayMember>, dynamicDraw?: boolean, noDestroy?: boolean, instanceCount?: number): VertexBuffer;
	createRenderbuffer(storageFormat: number, width: number, height: number): WebGLRenderbuffer | null | undefined;
	createFramebuffer(width: number, height: number, hasColor: boolean, depthType?: DepthBufferType | null): Framebuffer;
	clear({ color, depth, stencil, colorMask, }: ClearArgs): void;
	setCullFace(cullFaceMode: Readonly<CullFaceMode>): void;
	setDepthMode(depthMode: Readonly<DepthMode>): void;
	setStencilMode(stencilMode: Readonly<StencilMode>): void;
	setColorMode(colorMode: Readonly<ColorMode>): void;
	unbindVAO(): void;
}
type TextureFormat = WebGL2RenderingContext["RGBA"] | WebGL2RenderingContext["DEPTH_COMPONENT"] | WebGL2RenderingContext["DEPTH_STENCIL"] | WebGL2RenderingContext["R8"] | WebGL2RenderingContext["R32F"] | WebGL2RenderingContext["RED"];
type TextureFilter = WebGL2RenderingContext["LINEAR"] | WebGL2RenderingContext["NEAREST_MIPMAP_NEAREST"] | WebGL2RenderingContext["LINEAR_MIPMAP_NEAREST"] | WebGL2RenderingContext["NEAREST_MIPMAP_LINEAR"] | WebGL2RenderingContext["LINEAR_MIPMAP_LINEAR"] | WebGL2RenderingContext["NEAREST"];
type TextureWrap = WebGL2RenderingContext["REPEAT"] | WebGL2RenderingContext["CLAMP_TO_EDGE"] | WebGL2RenderingContext["MIRRORED_REPEAT"];
type EmptyImage = {
	width: number;
	height: number;
	data: null;
};
type TextureImage = RGBAImage | AlphaImage | Float32Image | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageData | EmptyImage | ImageBitmap;
declare class Texture {
	context: Context;
	size: [
		number,
		number
	];
	texture: WebGLTexture;
	format: TextureFormat;
	minFilter: TextureFilter | null | undefined;
	magFilter: TextureFilter | null | undefined;
	wrapS: TextureWrap | null | undefined;
	wrapT: TextureWrap | null | undefined;
	useMipmap: boolean;
	constructor(context: Context, image: TextureImage, format: TextureFormat, options?: {
		premultiply?: boolean;
		useMipmap?: boolean;
	} | null);
	update(image: TextureImage, options?: {
		premultiply?: boolean;
		useMipmap?: boolean;
	} | null, position?: {
		x: number;
		y: number;
	}): void;
	bind(filter: TextureFilter, wrap: TextureWrap, ignoreMipMap?: boolean): void;
	bindExtraParam(minFilter: TextureFilter, magFilter: TextureFilter, wrapS: TextureWrap, wrapT: TextureWrap): void;
	destroy(): void;
}
declare class Texture3D {
	context: Context;
	size: [
		number,
		number,
		number
	];
	texture: WebGLTexture;
	format: TextureFormat;
	minFilter: TextureFilter | null | undefined;
	magFilter: TextureFilter | null | undefined;
	wrapS: TextureWrap | null | undefined;
	wrapT: TextureWrap | null | undefined;
	constructor(context: Context, image: TextureImage, size: [
		number,
		number,
		number
	], format: TextureFormat);
	bind(filter: TextureFilter, wrap: TextureWrap): void;
	destroy(): void;
}
declare class UserManagedTexture {
	context: Context;
	texture: WebGLTexture;
	minFilter: TextureFilter | null | undefined;
	wrapS: TextureWrap | null | undefined;
	constructor(context: Context, texture: WebGLTexture);
	bind(filter: TextureFilter, wrap: TextureWrap): void;
}
declare class TileSpaceDebugBuffer {
	vertices: StructArrayLayout2i4;
	indices: StructArrayLayout1ui2;
	tileSize: number;
	needsUpload: boolean;
	color: Color;
	vertexBuffer: VertexBuffer | null | undefined;
	indexBuffer: IndexBuffer | null | undefined;
	segments: SegmentVector | null | undefined;
	constructor(tileSize: number, color?: Color);
	addPoints(points: Point[]): void;
	addPoint(p: Point): void;
	clearPoints(): void;
	lazyUpload(context: Context): void;
	hasVertices(): boolean;
	unload(): void;
}
declare class RasterParticleState {
	context: Context;
	particleTexture0: Texture;
	particleTexture1: Texture;
	particleIndexBuffer: VertexBuffer;
	particleSegment: SegmentVector;
	targetColorTexture: Texture;
	backgroundColorTexture: Texture;
	particleTextureDimension: number;
	lastInvalidatedAt: number;
	constructor(context: Context, id: OverscaledTileID, textureSize: [
		number,
		number
	], RGBAPositions: RGBAImage);
	updateParticleTexture(id: OverscaledTileID, RGBAPositions: RGBAImage): void;
	update(layerLastInvalidatedAt: number): boolean;
	destroy(): void;
}
type GridItem = {
	key: any;
	x1: number;
	y1: number;
	x2: number;
	y2: number;
};
declare class GridIndex {
	circleKeys: Array<any>;
	boxKeys: Array<any>;
	boxCells: Array<Array<number>>;
	circleCells: Array<Array<number>>;
	bboxes: Array<number>;
	circles: Array<number>;
	xCellCount: number;
	yCellCount: number;
	width: number;
	height: number;
	xScale: number;
	yScale: number;
	boxUid: number;
	circleUid: number;
	constructor(width: number, height: number, cellSize: number);
	keysLength(): number;
	insert(key: any, x1: number, y1: number, x2: number, y2: number): void;
	insertCircle(key: any, x: number, y: number, radius: number): void;
	_insertBoxCell(x1: number, y1: number, x2: number, y2: number, cellIndex: number, uid: number): void;
	_insertCircleCell(x1: number, y1: number, x2: number, y2: number, cellIndex: number, uid: number): void;
	_query(x1: number, y1: number, x2: number, y2: number, hitTest: boolean, predicate?: any): boolean | Array<GridItem>;
	_queryCircle(x: number, y: number, radius: number, hitTest: boolean, predicate?: any): boolean | Array<GridItem>;
	query(x1: number, y1: number, x2: number, y2: number, predicate?: any): Array<GridItem>;
	hitTest(x1: number, y1: number, x2: number, y2: number, predicate?: any): boolean;
	hitTestCircle(x: number, y: number, radius: number, predicate?: any): boolean;
	_queryCell(x1: number, y1: number, x2: number, y2: number, cellIndex: number, result: any, queryArgs: any, predicate?: any): void | boolean;
	_queryCellCircle(x1: number, y1: number, x2: number, y2: number, cellIndex: number, result: any, queryArgs: any, predicate?: any): void | boolean;
	_forEachCell(x1: number, y1: number, x2: number, y2: number, fn: any, arg1: any, arg2?: any, predicate?: any): void;
	_convertToXCellCoord(x: number): number;
	_convertToYCellCoord(y: number): number;
	_circlesCollide(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): boolean;
	_circleAndRectCollide(circleX: number, circleY: number, radius: number, x1: number, y1: number, x2: number, y2: number): boolean;
}
type PlacedCollisionBox = {
	box: Array<number>;
	offscreen: boolean;
	occluded: boolean;
};
type PlacedCollisionCircles = {
	circles: Array<number>;
	offscreen: boolean;
	collisionDetected: boolean;
	occluded: boolean;
};
type ScreenAnchorPoint = {
	occluded: boolean;
	perspectiveRatio: number;
	point: Point;
	signedDistanceFromCamera: number;
};
declare class CollisionIndex {
	grid: GridIndex;
	ignoredGrid: GridIndex;
	transform: Transform;
	pitchfactor: number;
	screenRightBoundary: number;
	screenBottomBoundary: number;
	gridRightBoundary: number;
	gridBottomBoundary: number;
	fogState: FogState | null | undefined;
	constructor(transform: Transform, fogState?: FogState | null, grid?: GridIndex, ignoredGrid?: GridIndex);
	placeCollisionBox(bucket: SymbolBucket, scale: number, collisionBox: SingleCollisionBox, shift: Point, allowOverlap: boolean, textPixelRatio: number, posMatrix: mat4, collisionGroupPredicate?: any): PlacedCollisionBox;
	placeCollisionCircles(bucket: SymbolBucket, allowOverlap: boolean, symbol: PlacedSymbol, lineVertexArray: SymbolLineVertexArray, glyphOffsetArray: GlyphOffsetArray, fontSize: number, posMatrix: Float32Array, labelPlaneMatrix: Float32Array, labelToScreenMatrix: mat4 | null | undefined, showCollisionCircles: boolean, pitchWithMap: boolean, collisionGroupPredicate: any | null | undefined, circlePixelDiameter: number, textPixelPadding: number, tileID: OverscaledTileID): PlacedCollisionCircles;
	/**
	 * Because the geometries in the CollisionIndex are an approximation of the shape of
	 * symbols on the map, we use the CollisionIndex to look up the symbol part of
	 * `queryRenderedFeatures`.
	 *
	 * @private
	 */
	queryRenderedSymbols(viewportQueryGeometry: Array<Point>): {
		[id: number]: Array<number>;
	};
	insertCollisionBox(collisionBox: Array<number>, ignorePlacement: boolean, bucketInstanceId: number, featureIndex: number, collisionGroupID: number): void;
	insertCollisionCircles(collisionCircles: Array<number>, ignorePlacement: boolean, bucketInstanceId: number, featureIndex: number, collisionGroupID: number): void;
	projectAndGetPerspectiveRatio(posMatrix: mat4, x: number, y: number, z: number, tileID: OverscaledTileID | null | undefined, checkOcclusion: boolean, bucketProjection: Projection$2): ScreenAnchorPoint;
	isOffscreen(x1: number, y1: number, x2: number, y2: number): boolean;
	isInsideGrid(x1: number, y1: number, x2: number, y2: number): boolean;
	getViewportMatrix(): mat4;
}
declare class BuildingIndex {
	style: Style$1;
	layers: Array<{
		layer: StyleLayer;
		visible: boolean;
	}>;
	currentBuildingBuckets: Array<{
		bucket: Bucket | null | undefined;
		tileID: OverscaledTileID;
		verticalScale: number;
	}>;
	layersGotHidden: boolean;
	constructor(style: Style$1);
	processLayersChanged(): void;
	onNewFrame(zoom: number): void;
	updateZOffset(symbolBucket: SymbolBucket, tileID: OverscaledTileID): void;
	_mapCoordToOverlappingTile(tid: OverscaledTileID, x: number, y: number, targetTileID: OverscaledTileID): {
		tileX: number;
		tileY: number;
	};
	_getHeightAtTileOffset(tid: OverscaledTileID, x: number, y: number): number;
}
type TextAnchor = "center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
declare class OpacityState {
	opacity: number;
	placed: boolean;
	constructor(prevState: OpacityState | null | undefined, increment: number, placed: boolean, skipFade?: boolean | null);
	isHidden(): boolean;
}
declare class JointOpacityState {
	text: OpacityState;
	icon: OpacityState;
	clipped: boolean;
	constructor(prevState: JointOpacityState | null | undefined, increment: number, placedText: boolean, placedIcon: boolean, skipFade?: boolean | null, clipped?: boolean);
	isHidden(): boolean;
}
declare class JointPlacement {
	text: boolean;
	icon: boolean;
	skipFade: boolean;
	clipped: boolean;
	constructor(text: boolean, icon: boolean, skipFade: boolean, clipped?: boolean);
}
declare class CollisionCircleArray {
	invProjMatrix: mat4;
	viewportMatrix: mat4;
	circles: Array<number>;
	constructor();
}
declare class RetainedQueryData {
	bucketInstanceId: number;
	featureIndex: FeatureIndex$1;
	sourceLayerIndex: number;
	bucketIndex: number;
	tileID: OverscaledTileID;
	featureSortOrder: Array<number> | null | undefined;
	constructor(bucketInstanceId: number, featureIndex: FeatureIndex$1, sourceLayerIndex: number, bucketIndex: number, tileID: OverscaledTileID);
}
type CollisionGroup = {
	ID: number;
	predicate?: any;
};
declare class CollisionGroups {
	collisionGroups: {
		[groupName: string]: CollisionGroup;
	};
	maxGroupID: number;
	crossSourceCollisions: boolean;
	constructor(crossSourceCollisions: boolean);
	get(sourceID: string): CollisionGroup;
}
type VariableOffset = {
	textOffset: [
		number,
		number
	];
	width: number;
	height: number;
	anchor: TextAnchor;
	textScale: number;
	prevAnchor?: TextAnchor;
};
type TileLayerParameters = {
	bucket: SymbolBucket;
	layout: any;
	posMatrix: mat4;
	textLabelPlaneMatrix: mat4;
	labelToScreenMatrix: mat4 | null | undefined;
	scale: number;
	textPixelRatio: number;
	holdingForFade: boolean;
	collisionBoxArray: CollisionBoxArray | null | undefined;
	partiallyEvaluatedTextSize: any;
	collisionGroup: any;
};
type BucketPart = {
	sortKey?: number | undefined;
	symbolInstanceStart: number;
	symbolInstanceEnd: number;
	parameters: TileLayerParameters;
};
type CrossTileID = string | number;
declare class Placement {
	projection: string;
	transform: Transform;
	collisionIndex: CollisionIndex;
	placements: Partial<Record<CrossTileID, JointPlacement>>;
	opacities: Partial<Record<CrossTileID, JointOpacityState>>;
	variableOffsets: Partial<Record<CrossTileID, VariableOffset>>;
	placedOrientations: Partial<Record<CrossTileID, number>>;
	commitTime: number;
	prevZoomAdjustment: number;
	lastPlacementChangeTime: number;
	stale: boolean;
	fadeDuration: number;
	retainedQueryData: {
		[_: number]: RetainedQueryData;
	};
	collisionGroups: CollisionGroups;
	prevPlacement: Placement | null | undefined;
	zoomAtLastRecencyCheck: number;
	collisionCircleArrays: Partial<Record<any, CollisionCircleArray>>;
	buildingIndex: BuildingIndex | null | undefined;
	constructor(transform: Transform, fadeDuration: number, crossSourceCollisions: boolean, prevPlacement?: Placement, fogState?: FogState | null, buildingIndex?: BuildingIndex | null);
	getBucketParts(results: Array<BucketPart>, styleLayer: StyleLayer, tile: Tile, sortAcrossTiles: boolean): void;
	attemptAnchorPlacement(anchor: TextAnchor, textBox: SingleCollisionBox, width: number, height: number, textScale: number, rotateWithMap: boolean, pitchWithMap: boolean, textPixelRatio: number, posMatrix: mat4, collisionGroup: CollisionGroup, textAllowOverlap: boolean, symbolInstance: SymbolInstance, boxIndex: number, bucket: SymbolBucket, orientation: number, iconBox: SingleCollisionBox | null | undefined, textSize: any, iconSize: any): {
		shift: Point;
		placedGlyphBoxes: PlacedCollisionBox;
	} | null | undefined;
	placeLayerBucketPart(bucketPart: any, seenCrossTileIDs: Set<number>, showCollisionBoxes: boolean, updateCollisionBoxIfNecessary: boolean): void;
	markUsedJustification(bucket: SymbolBucket, placedAnchor: TextAnchor, symbolInstance: SymbolInstance, orientation: number): void;
	markUsedOrientation(bucket: SymbolBucket, orientation: number, symbolInstance: SymbolInstance): void;
	commit(now: number): void;
	updateLayerOpacities(styleLayer: StyleLayer, tiles: Array<Tile>, layerIndex: number, replacementSource?: ReplacementSource | null): void;
	updateBucketOpacities(bucket: SymbolBucket, seenCrossTileIDs: Set<number>, collisionBoxArray: CollisionBoxArray | null | undefined, layerIndex: number, replacementSource: ReplacementSource | null | undefined, coord: OverscaledTileID): void;
	symbolFadeChange(now: number): number;
	zoomAdjustment(zoom: number): number;
	hasTransitions(now: number): boolean;
	stillRecent(now: number, zoom: number): boolean;
	setStale(): void;
}
type QueryResult = {
	[_: string]: Array<{
		featureIndex: number;
		feature: GeoJSONFeature;
		intersectionZ: boolean | number;
	}>;
};
type QueryRenderedFeaturesParams = {
	scope?: string;
	layers?: string[];
	filter?: FilterSpecification;
	validate?: boolean;
	availableImages?: string[];
	serializedLayers?: {
		[key: string]: StyleLayer;
	};
};
type TileState = // Tile data is in the process of loading.
"loading" | // Tile data has been loaded. Tile can be rendered.
"loaded" | // Tile data has been loaded but has no content for rendering.
"empty" | // Tile data has been loaded and is being updated. Tile can be rendered.
"reloading" | // Tile data has been deleted.
"unloaded" | // Tile data was not loaded because of an error.
"errored" | "expired";
declare class Tile {
	tileID: OverscaledTileID;
	uid: number;
	uses: number;
	tileSize: number;
	tileZoom: number;
	buckets: {
		[_: string]: Bucket;
	};
	latestFeatureIndex: FeatureIndex$1 | null | undefined;
	latestRawTileData: ArrayBuffer | null | undefined;
	imageAtlas: ImageAtlas | null | undefined;
	imageAtlasTexture: Texture | null | undefined;
	lineAtlas: LineAtlas | null | undefined;
	lineAtlasTexture: Texture | null | undefined;
	glyphAtlasImage: AlphaImage | null | undefined;
	glyphAtlasTexture: Texture | null | undefined;
	expirationTime: any;
	expiredRequestCount: number;
	state: TileState;
	timeAdded: any;
	fadeEndTime: any;
	collisionBoxArray: CollisionBoxArray | null | undefined;
	redoWhenDone: boolean;
	showCollisionBoxes: boolean;
	placementSource: any;
	actor: Actor | null | undefined;
	vtLayers: {
		[_: string]: VectorTileLayer;
	};
	isSymbolTile: boolean | null | undefined;
	isExtraShadowCaster: boolean | null | undefined;
	isRaster: boolean | null | undefined;
	_tileTransform: TileTransform;
	neighboringTiles: any | null | undefined;
	dem: DEMData | null | undefined;
	aborted: boolean | null | undefined;
	needsHillshadePrepare: boolean | null | undefined;
	needsDEMTextureUpload: boolean | null | undefined;
	request: Cancelable | null | undefined;
	texture: Texture | null | undefined | UserManagedTexture;
	hillshadeFBO: Framebuffer | null | undefined;
	demTexture: Texture | null | undefined;
	refreshedUponExpiration: boolean;
	reloadCallback: any;
	resourceTiming: Array<PerformanceResourceTiming> | null | undefined;
	queryPadding: number;
	rasterParticleState: RasterParticleState | null | undefined;
	symbolFadeHoldUntil: number | null | undefined;
	hasSymbolBuckets: boolean;
	hasRTLText: boolean;
	dependencies: any;
	projection: Projection$2;
	queryGeometryDebugViz: TileSpaceDebugBuffer | null | undefined;
	queryBoundsDebugViz: TileSpaceDebugBuffer | null | undefined;
	_tileDebugBuffer: VertexBuffer | null | undefined;
	_tileBoundsBuffer: VertexBuffer | null | undefined;
	_tileDebugIndexBuffer: IndexBuffer | null | undefined;
	_tileBoundsIndexBuffer: IndexBuffer;
	_tileDebugSegments: SegmentVector;
	_tileBoundsSegments: SegmentVector;
	_globeTileDebugBorderBuffer: VertexBuffer | null | undefined;
	_tileDebugTextBuffer: VertexBuffer | null | undefined;
	_tileDebugTextSegments: SegmentVector;
	_tileDebugTextIndexBuffer: IndexBuffer;
	_globeTileDebugTextBuffer: VertexBuffer | null | undefined;
	_lastUpdatedBrightness: number | null | undefined;
	/**
	 * @param {OverscaledTileID} tileID
	 * @param size
	 * @private
	 */
	constructor(tileID: OverscaledTileID, size: number, tileZoom: number, painter?: Painter | null, isRaster?: boolean);
	registerFadeDuration(duration: number): void;
	wasRequested(): boolean;
	get tileTransform(): TileTransform;
	/**
	 * Given a data object with a 'buffers' property, load it into
	 * this tile's elementGroups and buffers properties and set loaded
	 * to true. If the data is null, like in the case of an empty
	 * GeoJSON tile, no-op but still set loaded to true.
	 * @param {Object} data
	 * @param painter
	 * @returns {undefined}
	 * @private
	 */
	loadVectorData(data: WorkerTileResult | null | undefined, painter: Painter, justReloaded?: boolean | null): void;
	/**
	 * Release any data or WebGL resources referenced by this tile.
	 * @returns {undefined}
	 * @private
	 */
	unloadVectorData(): void;
	getBucket(layer: StyleLayer): Bucket;
	upload(context: Context): void;
	prepare(imageManager: ImageManager, painter: Painter | null | undefined, scope: string): void;
	queryRenderedFeatures(layers: {
		[_: string]: StyleLayer;
	}, serializedLayers: {
		[key: string]: any;
	}, sourceFeatureState: SourceFeatureState, tileResult: TilespaceQueryGeometry, params: {
		filter: FilterSpecification;
		layers: Array<string>;
		availableImages: Array<string>;
	}, transform: Transform, pixelPosMatrix: Float32Array, visualizeQueryGeometry: boolean): QueryResult;
	querySourceFeatures(result: Array<GeoJSONFeature>, params?: {
		sourceLayer?: string;
		filter?: FilterSpecification | ExpressionSpecification;
		validate?: boolean;
	}): void;
	hasData(): boolean;
	bucketsLoaded(): boolean;
	patternsLoaded(): boolean;
	setExpiryData(data: any): void;
	getExpiryTimeout(): void | number;
	setFeatureState(states: LayerFeatureStates, painter?: Painter | null): void;
	updateBuckets(states: LayerFeatureStates | null | undefined, painter: Painter): void;
	holdingForFade(): boolean;
	symbolFadeFinished(): boolean;
	clearFadeHold(): void;
	setHoldDuration(duration: number): void;
	setTexture(img: TextureImage, painter: Painter): void;
	setDependencies(namespace: string, dependencies: Array<string>): void;
	hasDependency(namespaces: Array<string>, keys: Array<string>): boolean;
	clearQueryDebugViz(): void;
	_makeDebugTileBoundsBuffers(context: Context, projection: Projection$2): void;
	_makeTileBoundsBuffers(context: Context, projection: Projection$2): void;
	_makeGlobeTileDebugBuffers(context: Context, transform: Transform): void;
	_globePoint(x: number, y: number, id: CanonicalTileID, tr: Transform, normalizationMatrix: Float64Array, worldToECEFMatrix: Float64Array | null | undefined, phase: number): vec3;
	_makeGlobeTileDebugBorderBuffer(context: Context, id: CanonicalTileID, tr: Transform, normalizationMatrix: Float64Array, worldToECEFMatrix: Float64Array | null | undefined, phase: number): void;
	_makeGlobeTileDebugTextBuffer(context: Context, id: CanonicalTileID, tr: Transform, normalizationMatrix: Float64Array, worldToECEFMatrix: Float64Array | null | undefined, phase: number): void;
	/**
	 * Release data and WebGL resources referenced by this tile.
	 * @returns {undefined}
	 * @private
	 */
	destroy(preserveTexture?: boolean): void;
}
type FeatureStates = {
	[feature_id: string]: FeatureState;
};
type LayerFeatureStates = {
	[layer: string]: FeatureStates;
};
declare class SourceFeatureState {
	state: LayerFeatureStates;
	stateChanges: LayerFeatureStates;
	deletedStates: LayerFeatureStates;
	constructor();
	updateState(sourceLayer: string, featureId: number | string, newState: FeatureState): void;
	removeFeatureState(sourceLayer: string, featureId?: number | string, key?: string): void;
	getState(sourceLayer: string, featureId: number | string): FeatureState;
	initializeTileState(tile: Tile, painter?: Painter | null): void;
	coalesceChanges(tiles: Record<string | number, Tile>, painter: Painter): void;
}
interface GridIndex$1 {
	new (extent: number, n: number, padding: number): this;
	new (data: ArrayBuffer): this;
	insert(key: number, x1: number, y1: number, x2: number, y2: number): void;
	query(x1: number, y1: number, x2: number, y2: number, intersectionText?: (arg1: number, arg2: number, arg3: number, arg4: number) => boolean): Array<number>;
	toArrayBuffer(): ArrayBuffer;
}
type QueryParameters = {
	pixelPosMatrix: Float32Array;
	transform: Transform;
	tileResult: TilespaceQueryGeometry;
	tileTransform: TileTransform;
	params: {
		filter: FilterSpecification;
		layers: Array<string>;
		availableImages: Array<string>;
	};
};
type FeatureIndices = {
	bucketIndex: number;
	sourceLayerIndex: number;
	featureIndex: number;
	layoutVertexArrayOffset: number;
} | FeatureIndex;
declare class FeatureIndex$1 {
	tileID: OverscaledTileID;
	x: number;
	y: number;
	z: number;
	grid: GridIndex$1;
	featureIndexArray: FeatureIndexArray;
	promoteId: PromoteIdSpecification | null | undefined;
	rawTileData: ArrayBuffer;
	bucketLayerIDs: Array<Array<string>>;
	vtLayers: {
		[_: string]: VectorTileLayer;
	};
	vtFeatures: {
		[_: string]: VectorTileFeature[];
	};
	sourceLayerCoder: DictionaryCoder;
	is3DTile: boolean;
	constructor(tileID: OverscaledTileID, promoteId?: PromoteIdSpecification | null);
	insert(feature: VectorTileFeature, geometry: Array<Array<Point>>, featureIndex: number, sourceLayerIndex: number, bucketIndex: number, layoutVertexArrayOffset?: number, envelopePadding?: number): void;
	loadVTLayers(): {
		[_: string]: VectorTileLayer;
	};
	query(args: QueryParameters, styleLayers: {
		[_: string]: StyleLayer;
	}, serializedLayers: {
		[_: string]: any;
	}, sourceFeatureState: SourceFeatureState): QueryResult;
	loadMatchingFeature(result: QueryResult, featureIndexData: FeatureIndices, filter: FeatureFilter, filterLayerIDs: Array<string>, availableImages: Array<string>, styleLayers: {
		[_: string]: StyleLayer;
	}, serializedLayers: {
		[_: string]: any;
	}, sourceFeatureState?: SourceFeatureState, intersectionTest?: (feature: VectorTileFeature, styleLayer: StyleLayer, featureState: any, layoutVertexArrayOffset: number) => boolean | number): void;
	appendToResult(result: QueryResult, layerID: string, featureIndex: number, geojsonFeature: GeoJSONFeature, intersectionZ: boolean | number): void;
	lookupSymbolFeatures(symbolFeatureIndexes: Array<number>, serializedLayers: {
		[key: string]: StyleLayer;
	}, bucketIndex: number, sourceLayerIndex: number, filterSpec: FilterSpecification, filterLayerIDs: Array<string>, availableImages: Array<string>, styleLayers: {
		[_: string]: StyleLayer;
	}): QueryResult;
	loadFeature(featureIndexData: FeatureIndices): VectorTileFeature;
	hasLayer(id: string): boolean;
	getId(feature: VectorTileFeature, sourceLayerId: string): string | number;
}
type BucketParameters<Layer extends TypedStyleLayer> = {
	index: number;
	layers: Array<Layer>;
	zoom: number;
	lut: LUT$1 | null;
	canonical: CanonicalTileID;
	pixelRatio: number;
	overscaling: number;
	collisionBoxArray: CollisionBoxArray;
	sourceLayerIndex: number;
	sourceID: string;
	projection: ProjectionSpecification;
	tessellationStep: number | null | undefined;
};
type PopulateParameters = {
	featureIndex: FeatureIndex$1;
	iconDependencies: Record<any, any>;
	patternDependencies: Record<any, any>;
	glyphDependencies: Record<any, any>;
	availableImages: Array<string>;
	lineAtlas: LineAtlas;
	brightness: number | null | undefined;
};
type IndexedFeature = {
	feature: VectorTileFeature;
	id: number | string | undefined;
	index: number;
	sourceLayerIndex: number;
};
type BucketFeature = {
	index: number;
	sourceLayerIndex: number;
	geometry: Array<Array<Point>>;
	properties: any;
	type: 1 | 2 | 3;
	id?: any;
	readonly patterns: {
		[_: string]: string;
	};
	sortKey?: number;
};
interface Bucket {
	layerIds: Array<string>;
	hasPattern: boolean;
	readonly layers: Array<any>;
	readonly stateDependentLayers: Array<any>;
	readonly stateDependentLayerIds: Array<string>;
	populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID, tileTransform: TileTransform): void;
	update(states: FeatureStates, vtLayer: VectorTileLayer, availableImages: Array<string>, imagePositions: SpritePositions, brightness?: number | null | undefined): void;
	isEmpty(): boolean;
	upload(context: Context): void;
	uploadPending(): boolean;
	/**
	 * Release the WebGL resources associated with the buffers. Note that because
	 * buckets are shared between layers having the same layout properties, they
	 * must be destroyed in groups (all buckets for a tile, or all symbol buckets).
	 *
	 * @private
	 */
	destroy(): void;
	updateFootprints(id: UnwrappedTileID, footprints: Array<TileFootprint>): void;
}
type CustomLayerRenderMethod = (gl: WebGL2RenderingContext, matrix: Array<number>, projection?: ProjectionSpecification, projectionToMercatorMatrix?: Array<number>, projectionToMercatorTransition?: number, centerInMercator?: Array<number>, pixelsPerMeterRatio?: number) => void;
/**
 * Interface for custom style layers. This is a specification for
 * implementers to model: it is not an exported method or class.
 *
 * Custom layers allow a user to render directly into the map's GL context using the map's camera.
 * These layers can be added between any regular layers using {@link Map#addLayer}.
 *
 * Custom layers must have a unique `id` and must have the `type` of `"custom"`.
 * They must implement `render` and may implement `prerender`, `onAdd` and `onRemove`.
 * They can trigger rendering using {@link Map#triggerRepaint}
 * and they should appropriately handle {@link Map.event:webglcontextlost} and
 * {@link Map.event:webglcontextrestored}.
 *
 * The `renderingMode` property controls whether the layer is treated as a `"2d"` or `"3d"` map layer. Use:
 * - `"renderingMode": "3d"` to use the depth buffer and share it with other layers
 * - `"renderingMode": "2d"` to add a layer with no depth. If you need to use the depth buffer for a `"2d"` layer you must use an offscreen
 *   framebuffer and {@link CustomLayerInterface#prerender}.
 *
 * @interface CustomLayerInterface
 * @property {string} id A unique layer id.
 * @property {string} type The layer's type. Must be `"custom"`.
 * @property {string} renderingMode Either `"2d"` or `"3d"`. Defaults to `"2d"`.
 * @example
 * // Custom layer implemented as ES6 class
 * class NullIslandLayer {
 *     constructor() {
 *         this.id = 'null-island';
 *         this.type = 'custom';
 *         this.renderingMode = '2d';
 *     }
 *
 *     onAdd(map, gl) {
 *         const vertexSource = `
 *         uniform mat4 u_matrix;
 *         void main() {
 *             gl_Position = u_matrix * vec4(0.5, 0.5, 0.0, 1.0);
 *             gl_PointSize = 20.0;
 *         }`;
 *
 *         const fragmentSource = `
 *         void main() {
 *             gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
 *         }`;
 *
 *         const vertexShader = gl.createShader(gl.VERTEX_SHADER);
 *         gl.shaderSource(vertexShader, vertexSource);
 *         gl.compileShader(vertexShader);
 *         const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
 *         gl.shaderSource(fragmentShader, fragmentSource);
 *         gl.compileShader(fragmentShader);
 *
 *         this.program = gl.createProgram();
 *         gl.attachShader(this.program, vertexShader);
 *         gl.attachShader(this.program, fragmentShader);
 *         gl.linkProgram(this.program);
 *     }
 *
 *     render(gl, matrix) {
 *         gl.useProgram(this.program);
 *         gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "u_matrix"), false, matrix);
 *         gl.drawArrays(gl.POINTS, 0, 1);
 *     }
 * }
 *
 * map.on('load', () => {
 *     map.addLayer(new NullIslandLayer());
 * });
 * @see [Example: Add a custom style layer](https://docs.mapbox.com/mapbox-gl-js/example/custom-style-layer/)
 * @see [Example: Add a 3D model](https://docs.mapbox.com/mapbox-gl-js/example/add-3d-model/)
 */
/**
 * Optional method called when the layer has been added to the Map with {@link Map#addLayer}. This
 * gives the layer a chance to initialize gl resources and register event listeners.
 *
 * @function
 * @memberof CustomLayerInterface
 * @instance
 * @name onAdd
 * @param {Map} map The Map this custom layer was just added to.
 * @param {WebGL2RenderingContext} gl The gl context for the map.
 */
/**
 * Optional method called when the layer has been removed from the Map with {@link Map#removeLayer}. This
 * gives the layer a chance to clean up gl resources and event listeners.
 *
 * @function
 * @memberof CustomLayerInterface
 * @instance
 * @name onRemove
 * @param {Map} map The Map this custom layer was just added to.
 * @param {WebGL2RenderingContext} gl The gl context for the map.
 */
/**
 * Optional method called during a render frame to allow a layer to prepare resources or render into a texture.
 *
 * The layer cannot make any assumptions about the current GL state and must bind a framebuffer before rendering.
 *
 * @function
 * @memberof CustomLayerInterface
 * @instance
 * @name prerender
 * @param {WebGL2RenderingContext} gl The map's gl context.
 * @param {Array<number>} matrix The map's camera matrix. It projects spherical mercator
 * coordinates to gl coordinates. The mercator coordinate `[0, 0]` represents the
 * top left corner of the mercator world and `[1, 1]` represents the bottom right corner. When
 * the `renderingMode` is `"3d"`, the z coordinate is conformal. A box with identical x, y, and z
 * lengths in mercator units would be rendered as a cube. {@link MercatorCoordinate}.fromLngLat
 * can be used to project a `LngLat` to a mercator coordinate.
 */
/**
 * Called during a render frame allowing the layer to draw into the GL context.
 *
 * The layer can assume blending and depth state is set to allow the layer to properly
 * blend and clip other layers. The layer cannot make any other assumptions about the
 * current GL state.
 *
 * If the layer needs to render to a texture, it should implement the `prerender` method
 * to do this and only use the `render` method for drawing directly into the main framebuffer.
 *
 * The blend function is set to `gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)`. This expects
 * colors to be provided in premultiplied alpha form where the `r`, `g` and `b` values are already
 * multiplied by the `a` value. If you are unable to provide colors in premultiplied form you
 * may want to change the blend function to
 * `gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)`.
 *
 * @function
 * @memberof CustomLayerInterface
 * @instance
 * @name render
 * @param {WebGL2RenderingContext} gl The map's gl context.
 * @param {Array<number>} matrix The map's camera matrix. It projects spherical mercator
 * coordinates to gl coordinates. The spherical mercator coordinate `[0, 0]` represents the
 * top left corner of the mercator world and `[1, 1]` represents the bottom right corner. When
 * the `renderingMode` is `"3d"`, the z coordinate is conformal. A box with identical x, y, and z
 * lengths in mercator units would be rendered as a cube. {@link MercatorCoordinate}.fromLngLat
 * can be used to project a `LngLat` to a mercator coordinate.
 */
export interface CustomLayerInterface {
	id: string;
	type: "custom";
	slot?: string;
	renderingMode?: "2d" | "3d";
	render: CustomLayerRenderMethod;
	prerender?: CustomLayerRenderMethod;
	renderToTile?: (gl: WebGL2RenderingContext, tileId: MercatorCoordinate) => void;
	shouldRerenderTiles?: () => boolean;
	onAdd?: (map: Map$1, gl: WebGL2RenderingContext) => void;
	onRemove?: (map: Map$1, gl: WebGL2RenderingContext) => void;
}
type LayerRenderingStats = {
	numRenderedVerticesInTransparentPass: number;
	numRenderedVerticesInShadowPass: number;
};
declare class StyleLayer extends Evented {
	id: string;
	fqid: string;
	scope: string;
	lut: LUT$1 | null;
	metadata: unknown;
	type: string;
	source: string;
	sourceLayer: string | null | undefined;
	slot: string | null | undefined;
	minzoom: number | null | undefined;
	maxzoom: number | null | undefined;
	filter: FilterSpecification | undefined;
	visibility: "visible" | "none" | undefined;
	isConfigDependent: boolean;
	_unevaluatedLayout: Layout<any>;
	readonly layout: unknown;
	_transitionablePaint: Transitionable<any>;
	_transitioningPaint: Transitioning<any>;
	readonly paint: unknown;
	_featureFilter: FeatureFilter;
	_filterCompiled: boolean;
	options: ConfigOptions | null | undefined;
	_stats: LayerRenderingStats | null | undefined;
	constructor(layer: LayerSpecification | CustomLayerInterface, properties: Readonly<{
		layout?: Properties<any>;
		paint?: Properties<any>;
	}>, scope: string, lut: LUT$1 | null, options?: ConfigOptions | null);
	onAdd(_map: Map$1): void;
	onRemove(_map: Map$1): void;
	isDraped(_sourceCache?: SourceCache): boolean;
	getLayoutProperty(name: string): PropertyValueSpecification<unknown>;
	setLayoutProperty(name: string, value: any): void;
	possiblyEvaluateVisibility(): void;
	getPaintProperty(name: string): void | TransitionSpecification | PropertyValueSpecification<unknown>;
	setPaintProperty(name: string, value: unknown): boolean;
	_handleSpecialPaintPropertyUpdate(_: string): void;
	getProgramIds(): string[] | null;
	getDefaultProgramParams(name: string, zoom: number, lut: LUT$1 | null): CreateProgramParams | null;
	_handleOverridablePaintPropertyUpdate<T, R>(name: string, oldValue: PropertyValue<T, R>, newValue: PropertyValue<T, R>): boolean;
	isHidden(zoom: number): boolean;
	updateTransitions(parameters: TransitionParameters): void;
	hasTransition(): boolean;
	recalculate(parameters: EvaluationParameters, availableImages: Array<string>): void;
	serialize(): LayerSpecification;
	is3D(): boolean;
	isSky(): boolean;
	isTileClipped(): boolean;
	hasOffscreenPass(): boolean;
	hasShadowPass(): boolean;
	canCastShadows(): boolean;
	hasLightBeamPass(): boolean;
	cutoffRange(): number;
	tileCoverLift(): number;
	resize(): void;
	isStateDependent(): boolean;
	compileFilter(): void;
	invalidateCompiledFilter(): void;
	dynamicFilter(): FilterExpression | null | undefined;
	dynamicFilterNeedsFeature(): boolean;
	getLayerRenderingStats(): LayerRenderingStats | null | undefined;
	resetLayerRenderingStats(painter: Painter): void;
	queryRadius(_bucket: Bucket): number;
	queryIntersectsFeature(_queryGeometry: TilespaceQueryGeometry, _feature: VectorTileFeature, _featureState: FeatureState, _geometry: Array<Array<Point>>, _zoom: number, _transform: Transform, _pixelPosMatrix: Float32Array, _elevationHelper: DEMSampler | null | undefined, _layoutVertexArrayOffset: number): boolean | number;
	queryIntersectsMatchingFeature(_queryGeometry: TilespaceQueryGeometry, _featureIndex: number, _filter: FeatureFilter, _transform: Transform): {
		queryFeature: GeoJSONFeature | null | undefined;
		intersectionZ: number;
	};
}
declare class StyleChanges {
	_changed: boolean;
	_updatedLayers: {
		[_: string]: Set<string>;
	};
	_removedLayers: {
		[_: string]: {
			[_: string]: StyleLayer;
		};
	};
	_updatedPaintProps: Set<string>;
	_updatedImages: Set<string>;
	_updatedSourceCaches: {
		[_: string]: "clear" | "reload";
	};
	constructor();
	isDirty(): boolean;
	/**
	 * Mark changes as dirty.
	 */
	setDirty(): void;
	getUpdatedSourceCaches(): {
		[_: string]: "clear" | "reload";
	};
	/**
	 * Mark that a source cache needs to be cleared or reloaded.
	 * @param {string} id
	 * @param {'clear' | 'reload'} action
	 */
	updateSourceCache(id: string, action: "clear" | "reload"): void;
	/**
	 * Discards updates to the source cache with the given id.
	 * @param {string} id
	 */
	discardSourceCacheUpdate(id: string): void;
	/**
	 * Mark a layer as having changes and needs to be rerendered.
	 * @param {StyleLayer} layer
	 */
	updateLayer(layer: StyleLayer): void;
	/**
	 * Mark a layer as having been removed and needing to be cleaned up.
	 * @param {StyleLayer} layer
	 */
	removeLayer(layer: StyleLayer): void;
	/**
	 * Returns StyleLayer if layer needs to be removed.
	 * @param {StyleLayer} layer
	 */
	getRemovedLayer(layer: StyleLayer): StyleLayer | null | undefined;
	/**
	 * Eliminate layer from the list of layers that need to be removed.
	 * @param {StyleLayer} layer
	 */
	discardLayerRemoval(layer: StyleLayer): void;
	/**
	 * Returns a list of layer ids that have been updated or removed grouped by the scope.
	 * @returns {{[scope: string]: {updatedIds: Array<string>, removedIds: Array<string>}}}}
	 */
	getLayerUpdatesByScope(): {
		[_: string]: {
			updatedIds?: Array<string>;
			removedIds?: Array<string>;
		};
	};
	getUpdatedPaintProperties(): Set<string>;
	/**
	 * Mark a layer as having a changed paint properties.
	 * @param {StyleLayer} layer
	 */
	updatePaintProperties(layer: StyleLayer): void;
	getUpdatedImages(): Array<string>;
	/**
	 * Mark an image as having changed.
	 * @param {string} id
	 */
	updateImage(id: string): void;
	resetUpdatedImages(): void;
	/**
	 * Reset all style changes.
	 */
	reset(): void;
}
type Props$1 = {
	["anchor"]: DataConstantProperty<"map" | "viewport">;
	["position"]: PositionProperty;
	["color"]: DataConstantProperty<Color>;
	["intensity"]: DataConstantProperty<number>;
};
declare class Light extends Evented {
	_transitionable: Transitionable<Props$1>;
	_transitioning: Transitioning<Props$1>;
	properties: PossiblyEvaluated<Props$1>;
	id: string;
	constructor(lightOptions?: LightSpecification, id?: string);
	getLight(): LightSpecification;
	setLight(light: LightSpecification | null | undefined, id: string, options?: StyleSetterOptions): void;
	updateTransitions(parameters: TransitionParameters): void;
	hasTransition(): boolean;
	recalculate(parameters: EvaluationParameters): void;
	_validate(validate: any, value: unknown, options?: {
		validate?: boolean;
	}): boolean;
}
type Props$2 = {
	["source"]: DataConstantProperty<string>;
	["exaggeration"]: DataConstantProperty<number>;
};
declare class Terrain$1 extends Evented {
	scope: string;
	_transitionable: Transitionable<Props$2>;
	_transitioning: Transitioning<Props$2>;
	properties: PossiblyEvaluated<Props$2>;
	drapeRenderMode: number;
	constructor(terrainOptions: TerrainSpecification, drapeRenderMode: number, scope: string, configOptions?: ConfigOptions | null);
	get(): TerrainSpecification;
	set(terrain: TerrainSpecification, configOptions?: ConfigOptions | null): void;
	updateTransitions(parameters: TransitionParameters): void;
	hasTransition(): boolean;
	recalculate(parameters: EvaluationParameters): void;
	getExaggeration(atZoom: number): number;
	isZoomDependent(): boolean;
}
declare const status$1: {
	unavailable: string;
	deferred: string;
	loading: string;
	loaded: string;
	error: string;
};
export type PluginStatus = typeof status$1[keyof typeof status$1];
type PluginState = {
	pluginStatus: PluginStatus;
	pluginURL: string | null | undefined;
};
type PluginStateSyncCallback = (state: PluginState) => void;
declare const registerForPluginStateChange: (callback: PluginStateSyncCallback) => PluginStateSyncCallback;
declare class LayerPlacement {
	_sortAcrossTiles: boolean;
	_currentTileIndex: number;
	_currentPartIndex: number;
	_seenCrossTileIDs: Set<number>;
	_bucketParts: Array<BucketPart>;
	constructor(styleLayer: SymbolStyleLayer);
	continuePlacement(tiles: Array<Tile>, placement: Placement, showCollisionBoxes: boolean, styleLayer: StyleLayer, shouldPausePlacement: () => boolean): boolean;
}
declare class PauseablePlacement {
	placement: Placement;
	_done: boolean;
	_currentPlacementIndex: number;
	_forceFullPlacement: boolean;
	_showCollisionBoxes: boolean;
	_inProgressLayer: LayerPlacement | null | undefined;
	constructor(transform: Transform, order: Array<string>, forceFullPlacement: boolean, showCollisionBoxes: boolean, fadeDuration: number, crossSourceCollisions: boolean, prevPlacement?: Placement, fogState?: FogState | null, buildingIndex?: BuildingIndex | null);
	isDone(): boolean;
	continuePlacement(order: Array<string>, layers: {
		[_: string]: StyleLayer;
	}, layerTiles: {
		[_: string]: Array<Tile>;
	}, layerTilesInYOrder: {
		[_: string]: Array<Tile>;
	}): void;
	commit(now: number): Placement;
}
declare class TileLayerIndex {
	tileID: OverscaledTileID;
	bucketInstanceId: number;
	index: KDBush;
	keys: Array<number>;
	crossTileIDs: Array<number>;
	constructor(tileID: OverscaledTileID, symbolInstances: SymbolInstanceArray, bucketInstanceId: number);
	findMatches(symbolInstances: SymbolInstanceArray, newTileID: OverscaledTileID, zoomCrossTileIDs: Set<number>): void;
}
declare class CrossTileIDs {
	maxCrossTileID: number;
	constructor();
	generate(): number;
}
declare class CrossTileSymbolLayerIndex {
	indexes: Partial<Record<string | number, Partial<Record<string | number, TileLayerIndex>>>>;
	usedCrossTileIDs: Partial<Record<string | number, Set<number>>>;
	lng: number;
	constructor();
	handleWrapJump(lng: number): void;
	addBucket(tileID: OverscaledTileID, bucket: SymbolBucket, crossTileIDs: CrossTileIDs): boolean;
	removeBucketCrossTileIDs(zoom: string | number, removedBucket: TileLayerIndex): void;
	removeStaleBuckets(currentIDs: Partial<Record<string | number, boolean>>): boolean;
}
declare class CrossTileSymbolIndex {
	layerIndexes: {
		[fqid: string]: CrossTileSymbolLayerIndex;
	};
	crossTileIDs: CrossTileIDs;
	maxBucketInstanceId: number;
	bucketsInCurrentPlacement: {
		[_: number]: boolean;
	};
	constructor();
	addLayer(styleLayer: StyleLayer, tiles: Array<Tile>, lng: number, projection: Projection$2): boolean;
	pruneUnusedLayers(usedLayers: Array<string>): void;
}
type AnyLayerSource = {
	source?: LayerSpecification["source"] | SourceSpecification;
};
type AnyLayer$1 = Omit<LayerSpecification, "source"> & AnyLayerSource | CustomLayerInterface;
export type FeatureSelector = {
	id: string | number;
	source: string;
	sourceLayer?: string;
};
type StyleOptions = {
	validate?: boolean;
	localFontFamily?: string | null | undefined;
	localIdeographFontFamily?: string;
	dispatcher?: Dispatcher;
	imageManager?: ImageManager;
	glyphManager?: GlyphManager;
	modelManager?: ModelManager;
	styleChanges?: StyleChanges;
	configOptions?: ConfigOptions;
	scope?: string;
	importDepth?: number;
	importsCache?: Map<string, StyleSpecification>;
	resolvedImports?: Set<string>;
	config?: ConfigSpecification | null | undefined;
	initialConfig?: {
		[key: string]: ConfigSpecification;
	};
	configDependentLayers?: Set<string>;
};
type StyleSetterOptions = {
	validate?: boolean;
	isInitialLoad?: boolean;
};
type Fragment = {
	id: string;
	style: Style$1;
	config?: ConfigSpecification | null | undefined;
};
type StyleColorTheme = {
	lut: LUT$1 | null;
	lutLoading: boolean;
	lutLoadingCorrelationID: number;
	colorTheme: ColorThemeSpecification | null;
};
declare class Style$1 extends Evented<MapEvents> {
	map: Map$1;
	stylesheet: StyleSpecification;
	dispatcher: Dispatcher;
	imageManager: ImageManager;
	glyphManager: GlyphManager;
	modelManager: ModelManager;
	ambientLight: Lights<LightProps$1> | null | undefined;
	directionalLight: Lights<LightProps$2> | null | undefined;
	light: Light;
	terrain: Terrain$1 | null | undefined;
	disableElevatedTerrain: boolean | null | undefined;
	fog: Fog | null | undefined;
	camera: CameraSpecification;
	_styleColorTheme: StyleColorTheme;
	_styleColorThemeForScope: {
		[_: string]: StyleColorTheme;
	};
	transition: TransitionSpecification;
	projection: ProjectionSpecification;
	globalId: string | null;
	scope: string;
	fragments: Array<Fragment>;
	importDepth: number;
	importsCache: Map<string, StyleSpecification>;
	resolvedImports: Set<string>;
	options: ConfigOptions;
	_mergedOrder: Array<string>;
	_mergedLayers: Record<string, StyleLayer>;
	_mergedSlots: Array<string>;
	_mergedSourceCaches: Record<string, SourceCache>;
	_mergedOtherSourceCaches: Record<string, SourceCache>;
	_mergedSymbolSourceCaches: Record<string, SourceCache>;
	_clipLayerIndices: Array<number>;
	_request: Cancelable | null | undefined;
	_spriteRequest: Cancelable | null | undefined;
	_layers: {
		[_: string]: StyleLayer;
	};
	_serializedLayers: {
		[_: string]: any;
	};
	_order: Array<string>;
	_drapedFirstOrder: Array<string>;
	_sourceCaches: {
		[_: string]: SourceCache;
	};
	_otherSourceCaches: {
		[_: string]: SourceCache;
	};
	_symbolSourceCaches: {
		[_: string]: SourceCache;
	};
	_loaded: boolean;
	_shouldPrecompile: boolean;
	_precompileDone: boolean;
	_rtlTextPluginCallback: any;
	_changes: StyleChanges;
	_optionsChanged: boolean;
	_layerOrderChanged: boolean;
	_availableImages: Array<string>;
	_markersNeedUpdate: boolean;
	_brightness: number | null | undefined;
	_configDependentLayers: Set<string>;
	_config: ConfigSpecification | null | undefined;
	_initialConfig: {
		[key: string]: ConfigSpecification;
	} | null | undefined;
	_buildingIndex: BuildingIndex;
	_transition: TransitionSpecification;
	crossTileSymbolIndex: CrossTileSymbolIndex;
	pauseablePlacement: PauseablePlacement;
	placement: Placement;
	z: number;
	_has3DLayers: boolean;
	_hasCircleLayers: boolean;
	_hasSymbolLayers: boolean;
	static getSourceType: typeof getType;
	static setSourceType: typeof setType;
	static registerForPluginStateChange: typeof registerForPluginStateChange;
	constructor(map: Map$1, options?: StyleOptions);
	load(style: StyleSpecification | string | null): Style$1;
	_getGlobalId(loadedStyle?: StyleSpecification | string | null): string | null;
	_diffStyle(style: StyleSpecification | string, onStarted: (err: Error | null, isUpdateNeeded: boolean) => void, onFinished?: () => void): void;
	loadURL(url: string, options?: {
		validate?: boolean;
		accessToken?: string;
	}): void;
	loadJSON(json: StyleSpecification, options?: StyleSetterOptions): void;
	loadEmpty(): void;
	_loadImports(imports: Array<ImportSpecification>, validate: boolean, beforeId?: string | null): Promise<any>;
	getImportGlobalIds(style?: Style$1, ids?: Set<string>): string[];
	_createFragmentStyle(importSpec: ImportSpecification): Style$1;
	_reloadImports(): void;
	_isInternalStyle(json: StyleSpecification): boolean;
	_load(json: StyleSpecification, validate: boolean): void;
	isRootStyle(): boolean;
	mergeAll(): void;
	forEachFragmentStyle(fn: (style: Style$1) => void): void;
	_prioritizeTerrain(prevTerrain?: Terrain$1 | null, nextTerrain?: Terrain$1 | null, nextTerrainSpec?: TerrainSpecification | null): Terrain$1 | null | undefined;
	mergeTerrain(): void;
	mergeProjection(): void;
	mergeSources(): void;
	mergeLayers(): void;
	terrainSetForDrapingOnly(): boolean;
	getCamera(): CameraSpecification | null | undefined;
	setCamera(camera: CameraSpecification): Style$1;
	_evaluateColorThemeData(theme: ColorThemeSpecification): string | null;
	_loadColorTheme(inputData: string | null): Promise<void>;
	getLut(scope: string): LUT$1 | null;
	setProjection(projection?: ProjectionSpecification | null): void;
	applyProjectionUpdate(): void;
	_updateMapProjection(): void;
	_loadSprite(url: string): void;
	_validateLayer(layer: StyleLayer): void;
	loaded(): boolean;
	_serializeImports(): Array<ImportSpecification> | void;
	_serializeSources(): {
		[sourceId: string]: SourceSpecification;
	};
	_serializeLayers(ids: Array<string>): Array<LayerSpecification>;
	hasLightTransitions(): boolean;
	hasFogTransition(): boolean;
	hasTransitions(): boolean;
	get order(): Array<string>;
	isLayerDraped(layer: StyleLayer): boolean;
	_checkLoaded(): void;
	_checkLayer(layerId: string): StyleLayer | null | undefined;
	_checkSource(sourceId: string): Source | null | undefined;
	/**
	 * Apply queued style updates in a batch and recalculate zoom-dependent paint properties.
	 * @private
	 */
	update(parameters: EvaluationParameters): void;
	_updateTilesForChangedImages(): void;
	_updateWorkerLayers(scope: string, updatedIds?: Array<string>, removedIds?: Array<string>): void;
	/**
	 * Update this style's state to match the given style JSON, performing only
	 * the necessary mutations.
	 *
	 * May throw an Error ('Unimplemented: METHOD') if the mapbox-gl-style-spec
	 * diff algorithm produces an operation that is not supported.
	 *
	 * @returns {boolean} true if any changes were made; false otherwise
	 * @private
	 */
	setState(nextState: StyleSpecification, onFinish?: () => void): boolean;
	addImage(id: string, image: StyleImage): this;
	updateImage(id: string, image: StyleImage): void;
	getImage(id: string): StyleImage | null | undefined;
	removeImage(id: string): this;
	_afterImageUpdated(id: string): void;
	listImages(): Array<string>;
	addModel(id: string, url: string, options?: StyleSetterOptions): this;
	hasModel(id: string): boolean;
	removeModel(id: string): this;
	listModels(): Array<string>;
	addSource(id: string, source: SourceSpecification, options?: StyleSetterOptions): void;
	/**
	 * Remove a source from this stylesheet, given its ID.
	 * @param {string} id ID of the source to remove.
	 * @throws {Error} If no source is found with the given ID.
	 * @returns {Map} The {@link Map} object.
	 */
	removeSource(id: string): this;
	/**
	 * Set the data of a GeoJSON source, given its ID.
	 * @param {string} id ID of the source.
	 * @param {GeoJSON|string} data GeoJSON source.
	 */
	setGeoJSONSourceData(id: string, data: GeoJSON.GeoJSON | string): void;
	/**
	 * Get a source by ID.
	 * @param {string} id ID of the desired source.
	 * @returns {?Source} The source object.
	 */
	getOwnSource<T extends Source>(id: string): T | undefined;
	getOwnSources(): Source[];
	areTilesLoaded(): boolean;
	setLights(lights?: Array<LightsSpecification> | null): void;
	calculateLightsBrightness(): number | null | undefined;
	getBrightness(): number | null | undefined;
	getLights(): Array<LightsSpecification> | null | undefined;
	enable3dLights(): boolean;
	getFragmentStyle(fragmentId?: string): Style$1 | null | undefined;
	getConfigProperty(fragmentId: string, key: string): unknown;
	setConfigProperty(fragmentId: string, key: string, value: unknown): void;
	getConfig(fragmentId: string): ConfigSpecification | null | undefined;
	setConfig(fragmentId: string, config?: ConfigSpecification | null): void;
	getSchema(fragmentId: string): SchemaSpecification | null | undefined;
	setSchema(fragmentId: string, schema: SchemaSpecification): void;
	updateConfig(config?: ConfigSpecification | null, schema?: SchemaSpecification | null): void;
	updateConfigDependencies(): void;
	/**
	 * Add a layer to the map style. The layer will be inserted before the layer with
	 * ID `before`, or appended if `before` is omitted.
	 * @param {Object | CustomLayerInterface} layerObject The style layer to add.
	 * @param {string} [before] ID of an existing layer to insert before.
	 * @param {Object} options Style setter options.
	 * @returns {Map} The {@link Map} object.
	 */
	addLayer(layerObject: AnyLayer$1, before?: string, options?: StyleSetterOptions): void;
	/**
	 * Moves a layer to a different z-position. The layer will be inserted before the layer with
	 * ID `before`, or appended if `before` is omitted.
	 * @param {string} id  ID of the layer to move.
	 * @param {string} [before] ID of an existing layer to insert before.
	 */
	moveLayer(id: string, before?: string): void;
	/**
	 * Remove the layer with the given id from the style.
	 *
	 * If no such layer exists, an `error` event is fired.
	 *
	 * @param {string} id ID of the layer to remove.
	 * @fires Map.event:error
	 */
	removeLayer(id: string): void;
	/**
	 * Return the style layer object with the given `id`.
	 *
	 * @param {string} id ID of the desired layer.
	 * @returns {?StyleLayer} A layer, if one with the given `id` exists.
	 */
	getOwnLayer<T extends StyleLayer>(id: string): T | undefined;
	/**
	 * Checks if a specific layer is present within the style.
	 *
	 * @param {string} id ID of the desired layer.
	 * @returns {boolean} A boolean specifying if the given layer is present.
	 */
	hasLayer(id: string): boolean;
	/**
	 * Checks if a specific layer type is present within the style.
	 *
	 * @param {string} type Type of the desired layer.
	 * @returns {boolean} A boolean specifying if the given layer type is present.
	 */
	hasLayerType(type: string): boolean;
	setLayerZoomRange(layerId: string, minzoom?: number | null, maxzoom?: number | null): void;
	getSlots(): string[];
	setSlot(layerId: string, slot?: string | null): void;
	setFilter(layerId: string, filter?: FilterSpecification | null, options?: StyleSetterOptions): void;
	/**
	 * Get a layer's filter object.
	 * @param {string} layerId The layer to inspect.
	 * @returns {*} The layer's filter, if any.
	 */
	getFilter(layerId: string): FilterSpecification | null | undefined;
	setLayoutProperty(layerId: string, name: string, value: any, options?: StyleSetterOptions): void;
	/**
	 * Get a layout property's value from a given layer.
	 * @param {string} layerId The layer to inspect.
	 * @param {string} name The name of the layout property.
	 * @returns {*} The property value.
	 */
	getLayoutProperty(layerId: string, name: string): PropertyValueSpecification<unknown> | null | undefined;
	setPaintProperty(layerId: string, name: string, value: any, options?: StyleSetterOptions): void;
	getPaintProperty(layerId: string, name: string): void | TransitionSpecification | PropertyValueSpecification<unknown>;
	setFeatureState(target: FeatureSelector | GeoJSONFeature, state: FeatureState): void;
	removeFeatureState(target: Omit<FeatureSelector, "id"> & {
		id?: FeatureSelector["id"];
	} | GeoJSONFeature, key?: string): void;
	getFeatureState(target: FeatureSelector | GeoJSONFeature): FeatureState | null | undefined;
	setTransition(transition?: TransitionSpecification | null): Style$1;
	getTransition(): TransitionSpecification;
	serialize(): StyleSpecification;
	_updateLayer(layer: StyleLayer): void;
	_flattenAndSortRenderedFeatures(sourceResults: Array<QueryResult>): Array<GeoJSONFeature>;
	queryRenderedFeatures(queryGeometry: PointLike | [
		PointLike,
		PointLike
	], params: QueryRenderedFeaturesParams, transform: Transform): Array<GeoJSONFeature>;
	querySourceFeatures(sourceID: string, params?: {
		sourceLayer?: string;
		filter?: FilterSpecification | ExpressionSpecification;
		validate?: boolean;
	}): Array<GeoJSONFeature>;
	addSourceType(name: string, SourceType: SourceClass, callback: Callback<undefined>): void;
	getFlatLight(): LightSpecification;
	setFlatLight(lightOptions: LightSpecification, id: string, options?: StyleSetterOptions): void;
	getTerrain(): TerrainSpecification | null | undefined;
	setTerrainForDraping(): void;
	checkCanvasFingerprintNoise(): void;
	setTerrain(terrainOptions?: TerrainSpecification | null, drapeRenderMode?: number): void;
	_createFog(fogOptions: FogSpecification): void;
	_updateMarkersOpacity(): void;
	getFog(): FogSpecification | null | undefined;
	setFog(fogOptions?: FogSpecification): void;
	setColorTheme(colorTheme?: ColorThemeSpecification): void;
	_getTransitionParameters(transition?: TransitionSpecification | null): TransitionParameters;
	updateDrapeFirstLayers(): void;
	_createTerrain(terrainOptions: TerrainSpecification, drapeRenderMode: number): void;
	_force3DLayerUpdate(): void;
	_forceSymbolLayerUpdate(): void;
	_validate(validate: Validator, key: string, value: any, props: any, options?: {
		validate?: boolean;
	}): boolean;
	_remove(): void;
	clearSource(id: string): void;
	clearSources(): void;
	reloadSource(id: string): void;
	reloadSources(): void;
	updateSources(transform: Transform): void;
	_generateCollisionBoxes(): void;
	_updatePlacement(painter: Painter, transform: Transform, showCollisionBoxes: boolean, fadeDuration: number, crossSourceCollisions: boolean, replacementSource: ReplacementSource, forceFullPlacement?: boolean): {
		needsRerender: boolean;
		occlusionQueryBasedOpacityChanged: boolean;
	};
	_releaseSymbolFadeTiles(): void;
	addImport(importSpec: ImportSpecification, beforeId?: string | null): Promise<any> | void;
	updateImport(importId: string, importSpecification: ImportSpecification | string): Style$1;
	moveImport(importId: string, beforeId: string): Style$1;
	setImportUrl(importId: string, url: string): Style$1;
	setImportData(importId: string, stylesheet?: StyleSpecification | null): Style$1;
	setImportConfig(importId: string, config?: ConfigSpecification | null): Style$1;
	removeImport(importId: string): void;
	getImportIndex(importId: string): number;
	/**
	 * Return the style layer object with the given `id`.
	 *
	 * @param {string} id ID of the desired layer.
	 * @returns {?StyleLayer} A layer, if one with the given `id` exists.
	 */
	getLayer(id: string): StyleLayer | null | undefined;
	getSources(): Source[];
	/**
	 * Get a source by ID.
	 * @param {string} id ID of the desired source.
	 * @returns {?Source} The source object.
	 */
	getSource(id: string, scope: string): Source | null | undefined;
	getLayerSource(layer: StyleLayer): Source | null | undefined;
	getSourceCache(id: string, scope?: string | null): SourceCache | void;
	getLayerSourceCache(layer: StyleLayer): SourceCache | void;
	/**
	 * Returns all source caches for a given style FQID.
	 * If no FQID is provided, returns all source caches,
	 * including source caches in imported styles.
	 * @param {string} fqid Style FQID.
	 * @returns {Array<SourceCache>} List of source caches.
	 */
	getSourceCaches(fqid?: string | null): Array<SourceCache>;
	updateSourceCaches(): void;
	updateLayers(parameters: EvaluationParameters): void;
	getImages(mapId: string, params: {
		icons: Array<string>;
		source: string;
		scope: string;
		tileID: OverscaledTileID;
		type: string;
	}, callback: Callback<{
		[_: string]: StyleImage;
	}>): void;
	getGlyphs(mapId: string, params: {
		stacks: {
			[_: string]: Array<number>;
		};
		scope: string;
	}, callback: Callback<{
		[_: string]: {
			glyphs: {
				[_: number]: StyleGlyph | null | undefined;
			};
			ascender?: number;
			descender?: number;
		};
	}>): void;
	getResource(mapId: string, params: RequestParameters, callback: ResponseCallback<any>): Cancelable;
	getOwnSourceCache(source: string): SourceCache | void;
	getOwnLayerSourceCache(layer: StyleLayer): SourceCache | void;
	getOwnSourceCaches(source: string): Array<SourceCache>;
	_isSourceCacheLoaded(source: string): boolean;
	has3DLayers(): boolean;
	hasSymbolLayers(): boolean;
	hasCircleLayers(): boolean;
	isLayerClipped(layer: StyleLayer, source?: Source | null): boolean;
	_clearWorkerCaches(): void;
	destroy(): void;
}
declare class Hash {
	_map: Map$1 | null | undefined;
	_updateHash: () => number | null | undefined;
	_hashName: string | null | undefined;
	constructor(hashName?: string | null);
	addTo(map: Map$1): this;
	remove(): this;
	getHashString(): string;
	_getCurrentHash(): Array<string>;
	_onHashChange(): boolean;
	_updateHashUnthrottled(): void;
}
interface Handler {
	enable(): void;
	disable(): void;
	isEnabled(): boolean;
	isActive(): boolean;
	reset(): void;
	readonly touchstart?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | null | undefined | void;
	readonly touchmove?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | null | undefined | void;
	readonly touchend?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | null | undefined | void;
	readonly touchcancel?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | null | undefined | void;
	readonly mousedown?: (e: MouseEvent, point: Point) => HandlerResult | null | undefined | void;
	readonly mousemove?: (e: MouseEvent, point: Point) => HandlerResult | null | undefined | void;
	readonly mouseup?: (e: MouseEvent, point: Point) => HandlerResult | null | undefined | void;
	readonly dblclick?: (e: MouseEvent, point: Point) => HandlerResult | null | undefined | void;
	readonly wheel?: (e: WheelEvent, point: Point) => HandlerResult | null | undefined | void;
	readonly keydown?: (e: KeyboardEvent) => HandlerResult | null | undefined | void;
	readonly keyup?: (e: KeyboardEvent) => HandlerResult | null | undefined | void;
	readonly renderFrame?: () => HandlerResult | null | undefined | void;
}
type HandlerResult = {
	panDelta?: Point;
	zoomDelta?: number;
	bearingDelta?: number;
	pitchDelta?: number;
	around?: Point | null;
	pinchAround?: Point | null;
	aroundCoord?: MercatorCoordinate | null;
	cameraAnimation?: (map: Map$1) => any;
	originalEvent?: any;
	needsRenderFrame?: boolean;
	noInertia?: boolean;
};
declare class MouseHandler implements Handler {
	_enabled: boolean;
	_active: boolean;
	_lastPoint: Point | null | undefined;
	_eventButton: number | null | undefined;
	_moved: boolean;
	_clickTolerance: number;
	constructor(options: {
		clickTolerance: number;
	});
	blur(): void;
	reset(): void;
	_correctButton(e: MouseEvent, button: number): boolean;
	_move(lastPoint: Point, point: Point): HandlerResult | null | undefined;
	mousedown(e: MouseEvent, point: Point): void;
	mousemoveWindow(e: MouseEvent, point: Point): HandlerResult | null | undefined;
	mouseupWindow(e: MouseEvent): void;
	enable(): void;
	disable(): void;
	isEnabled(): boolean;
	isActive(): boolean;
}
declare class MousePanHandler extends MouseHandler {
	mousedown(e: MouseEvent, point: Point): void;
	_correctButton(e: MouseEvent, button: number): boolean;
	_move(lastPoint: Point, point: Point): HandlerResult | null | undefined;
}
declare class MouseRotateHandler extends MouseHandler {
	_correctButton(e: MouseEvent, button: number): boolean;
	_move(lastPoint: Point, point: Point): HandlerResult | null | undefined;
	contextmenu(e: MouseEvent): void;
}
declare class MousePitchHandler extends MouseHandler {
	_correctButton(e: MouseEvent, button: number): boolean;
	_move(lastPoint: Point, point: Point): HandlerResult | null | undefined;
	contextmenu(e: MouseEvent): void;
}
declare class TouchPanHandler implements Handler {
	_map: Map$1;
	_el: HTMLElement;
	_enabled: boolean;
	_active: boolean;
	_touches: Partial<Record<string | number, Point>>;
	_minTouches: number;
	_clickTolerance: number;
	_sum: Point;
	_alertContainer: HTMLElement;
	_alertTimer: number;
	constructor(map: Map$1, options: {
		clickTolerance: number;
	});
	reset(): void;
	touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): HandlerResult | null | undefined;
	touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): HandlerResult | null | undefined;
	touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
	touchcancel(): void;
	_calculateTransform(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): HandlerResult | null | undefined;
	enable(): void;
	disable(): void;
	isEnabled(): boolean;
	isActive(): boolean;
	_addTouchPanBlocker(): void;
	_showTouchPanBlockerAlert(): void;
}
type DragPanOptions = {
	linearity?: number;
	easing?: (t: number) => number;
	deceleration?: number;
	maxSpeed?: number;
};
declare class DragPanHandler {
	_el: HTMLElement;
	_mousePan: MousePanHandler;
	_touchPan: TouchPanHandler;
	_inertiaOptions: DragPanOptions;
	/**
	 * @private
	*/
	constructor(el: HTMLElement, mousePan: MousePanHandler, touchPan: TouchPanHandler);
	/**
	 * Enables the "drag to pan" interaction and accepts options to control the behavior of the panning inertia.
	 *
	 * @param {Object} [options] Options object.
	 * @param {number} [options.linearity=0] Factor used to scale the drag velocity.
	 * @param {Function} [options.easing] Optional easing function applied to {@link Map#panTo} when applying the drag. Defaults to bezier function using [@mapbox/unitbezier](https://github.com/mapbox/unitbezier).
	 * @param {number} [options.maxSpeed=1400] The maximum value of the drag velocity.
	 * @param {number} [options.deceleration=2500] The rate at which the speed reduces after the pan ends.
	 *
	 * @example
	 * map.dragPan.enable();
	 * @example
	 * map.dragPan.enable({
	 *     linearity: 0.3,
	 *     easing: t => t,
	 *     maxSpeed: 1400,
	 *     deceleration: 2500
	 * });
	 * @see [Example: Highlight features within a bounding box](https://docs.mapbox.com/mapbox-gl-js/example/using-box-queryrenderedfeatures/)
	 */
	enable(options?: DragPanOptions): void;
	/**
	 * Disables the "drag to pan" interaction.
	 *
	 * @example
	 * map.dragPan.disable();
	 */
	disable(): void;
	/**
	 * Returns a Boolean indicating whether the "drag to pan" interaction is enabled.
	 *
	 * @returns {boolean} Returns `true` if the "drag to pan" interaction is enabled.
	 * @example
	 * const isDragPanEnabled = map.dragPan.isEnabled();
	 */
	isEnabled(): boolean;
	/**
	 * Returns a Boolean indicating whether the "drag to pan" interaction is active (currently being used).
	 *
	 * @returns {boolean} Returns `true` if the "drag to pan" interaction is active.
	 * @example
	 * const isDragPanActive = map.dragPan.isActive();
	 */
	isActive(): boolean;
}
type TaskID = number;
type Task$1 = {
	callback: (timeStamp: number) => void;
	id: TaskID;
	cancelled: boolean;
};
declare class TaskQueue {
	_queue: Array<Task$1>;
	_id: TaskID;
	_cleared: boolean;
	_currentlyRunning: Array<Task$1> | false;
	constructor();
	add(callback: (timeStamp: number) => void): TaskID;
	remove(id: TaskID): void;
	run(timeStamp?: number): void;
	clear(): void;
}
/**
 * Options common to {@link Map#jumpTo}, {@link Map#easeTo}, and {@link Map#flyTo}, controlling the desired location,
 * zoom, bearing, and pitch of the camera. All properties are optional, and when a property is omitted, the current
 * camera value for that property will remain unchanged.
 *
 * @typedef {Object} CameraOptions
 * @property {LngLatLike} center The location to place at the screen center.
 * @property {number} zoom The desired zoom level.
 * @property {number} bearing The desired bearing in degrees. The bearing is the compass direction that
 * is "up". For example, `bearing: 90` orients the map so that east is up.
 * @property {number} pitch The desired pitch in degrees. The pitch is the angle towards the horizon
 * measured in degrees with a range between 0 and 85 degrees. For example, pitch: 0 provides the appearance
 * of looking straight down at the map, while pitch: 60 tilts the user's perspective towards the horizon.
 * Increasing the pitch value is often used to display 3D objects.
 * @property {LngLatLike} around The location serving as the origin for a change in `zoom`, `pitch` and/or `bearing`.
 * This location will remain at the same screen position following the transform.
 * This is useful for drawing attention to a location that is not in the screen center.
 * `center` is ignored if `around` is included.
 * @property {PaddingOptions} padding Dimensions in pixels applied on each side of the viewport for shifting the vanishing point.
 * Note that when `padding` is used with `jumpTo`, `easeTo`, and `flyTo`, it also sets the global map padding as a side effect,
 * affecting all subsequent camera movements until the padding is reset.
 * @example
 * // set the map's initial perspective with CameraOptions
 * const map = new mapboxgl.Map({
 *     container: 'map',
 *     style: 'mapbox://styles/mapbox/streets-v11',
 *     center: [-73.5804, 45.53483],
 *     pitch: 60,
 *     bearing: -60,
 *     zoom: 10
 * });
 * @see [Example: Set pitch and bearing](https://docs.mapbox.com/mapbox-gl-js/example/set-perspective/)
 * @see [Example: Jump to a series of locations](https://docs.mapbox.com/mapbox-gl-js/example/jump-to/)
 * @see [Example: Fly to a location](https://docs.mapbox.com/mapbox-gl-js/example/flyto/)
 * @see [Example: Display buildings in 3D](https://docs.mapbox.com/mapbox-gl-js/example/3d-buildings/)
 */
export type CameraOptions = {
	center?: LngLatLike;
	zoom?: number;
	bearing?: number;
	pitch?: number;
	around?: LngLatLike;
	padding?: number | PaddingOptions;
	maxZoom?: number;
};
type FullCameraOptions = {
	maxZoom: number;
	offset: PointLike;
	padding: Required<PaddingOptions>;
} & CameraOptions;
/**
 * Options common to map movement methods that involve animation, such as {@link Map#panBy} and
 * {@link Map#easeTo}, controlling the duration and easing function of the animation. All properties
 * are optional.
 *
 * @typedef {Object} AnimationOptions
 * @property {number} duration The animation's duration, measured in milliseconds.
 * @property {Function} easing A function taking a time in the range 0..1 and returning a number where 0 is
 * the initial state and 1 is the final state.
 * @property {PointLike} offset The target center's offset relative to real map container center at the end of animation.
 * @property {boolean} animate If `false`, no animation will occur.
 * @property {boolean} essential If `true`, then the animation is considered essential and will not be affected by
 * [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
 * @property {boolean} preloadOnly If `true`, it will trigger tiles loading across the animation path, but no animation will occur.
 * @property {number} curve The zooming "curve" that will occur along the
 * flight path. A high value maximizes zooming for an exaggerated animation, while a low
 * value minimizes zooming for an effect closer to {@link Map#easeTo}. 1.42 is the average
 * value selected by participants in the user study discussed in
 * [van Wijk (2003)](https://www.win.tue.nl/~vanwijk/zoompan.pdf). A value of
 * `Math.pow(6, 0.25)` would be equivalent to the root mean squared average velocity. A
 * value of 1 would produce a circular motion. If `minZoom` is specified, this option will be ignored.
 * @property {number} minZoom The zero-based zoom level at the peak of the flight path. If
 * this option is specified, `curve` will be ignored.
 * @property {number} speed The average speed of the animation defined in relation to
 * `curve`. A speed of 1.2 means that the map appears to move along the flight path
 * by 1.2 times `curve` screenfuls every second. A _screenful_ is the map's visible span.
 * It does not correspond to a fixed physical distance, but varies by zoom level.
 * @property {number} screenSpeed The average speed of the animation measured in screenfuls
 * per second, assuming a linear timing curve. If `speed` is specified, this option is ignored.
 * @property {number} maxDuration The animation's maximum duration, measured in milliseconds.
 * If duration exceeds maximum duration, it resets to 0.
 * @see [Example: Slowly fly to a location](https://docs.mapbox.com/mapbox-gl-js/example/flyto-options/)
 * @see [Example: Customize camera animations](https://docs.mapbox.com/mapbox-gl-js/example/camera-animation/)
 * @see [Example: Navigate the map with game-like controls](https://docs.mapbox.com/mapbox-gl-js/example/game-controls/)
*/
export type AnimationOptions = {
	animate?: boolean;
	curve?: number;
	duration?: number;
	easing?: (_: number) => number;
	essential?: boolean;
	linear?: boolean;
	maxDuration?: number;
	offset?: PointLike;
	preloadOnly?: boolean;
	screenSpeed?: number;
	speed?: number;
};
export type EasingOptions = CameraOptions & AnimationOptions;
declare class Camera extends Evented<MapEvents> {
	transform: Transform;
	_moving: boolean;
	_zooming: boolean;
	_rotating: boolean;
	_pitching: boolean;
	_padding: boolean;
	_bearingSnap: number;
	_easeStart: number;
	_easeOptions: {
		duration: number;
		easing: (_: number) => number;
	};
	_easeId: string | undefined;
	_respectPrefersReducedMotion: boolean;
	_onEaseFrame: (_: number) => Transform | void | null | undefined;
	_onEaseEnd: (easeId?: string) => void | null | undefined;
	_easeFrameId: TaskID | null | undefined;
	constructor(transform: Transform, options: {
		bearingSnap: number;
		respectPrefersReducedMotion?: boolean;
	});
	/** @section {Camera}
	 * @method
	 * @instance
	 * @memberof Map */
	/**
	 * Returns the map's geographical centerpoint.
	 *
	 * @memberof Map#
	 * @returns {LngLat} The map's geographical centerpoint.
	 * @example
	 * // Return a LngLat object such as {lng: 0, lat: 0}.
	 * const center = map.getCenter();
	 * // Access longitude and latitude values directly.
	 * const {lng, lat} = map.getCenter();
	 * @see [Tutorial: Use Mapbox GL JS in a React app](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/#store-the-new-coordinates)
	 */
	getCenter(): LngLat;
	/**
	 * Sets the map's geographical centerpoint. Equivalent to `jumpTo({center: center})`.
	 *
	 * @memberof Map#
	 * @param {LngLatLike} center The centerpoint to set.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:moveend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setCenter([-74, 38]);
	 */
	setCenter(center: LngLatLike, eventData?: EventData): this;
	/**
	 * Pans the map by the specified offset.
	 *
	 * @memberof Map#
	 * @param {PointLike} offset The `x` and `y` coordinates by which to pan the map.
	 * @param {AnimationOptions | null} options An options object describing the destination and animation of the transition. We do not recommend using `options.offset` since this value will override the value of the `offset` parameter.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:moveend
	 * @returns {Map} `this` Returns itself to allow for method chaining.
	 * @example
	 * map.panBy([-74, 38]);
	 * @example
	 * // panBy with an animation of 5 seconds.
	 * map.panBy([-74, 38], {duration: 5000});
	 * @see [Example: Navigate the map with game-like controls](https://www.mapbox.com/mapbox-gl-js/example/game-controls/)
	 */
	panBy(offset: PointLike, options?: AnimationOptions, eventData?: EventData): this;
	/**
	 * Pans the map to the specified location with an animated transition.
	 *
	 * @memberof Map#
	 * @param {LngLatLike} lnglat The location to pan the map to.
	 * @param {AnimationOptions | null} options Options describing the destination and animation of the transition.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:moveend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.panTo([-74, 38]);
	 * @example
	 * // Specify that the panTo animation should last 5000 milliseconds.
	 * map.panTo([-74, 38], {duration: 5000});
	 * @see [Example: Update a feature in realtime](https://docs.mapbox.com/mapbox-gl-js/example/live-update-feature/)
	 */
	panTo(lnglat: LngLatLike, options?: AnimationOptions, eventData?: EventData): this;
	/**
	 * Returns the map's current zoom level.
	 *
	 * @memberof Map#
	 * @returns {number} The map's current zoom level.
	 * @example
	 * map.getZoom();
	 */
	getZoom(): number;
	/**
	 * Sets the map's zoom level. Equivalent to `jumpTo({zoom: zoom})`.
	 *
	 * @memberof Map#
	 * @param {number} zoom The zoom level to set (0-20).
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:zoomstart
	 * @fires Map.event:move
	 * @fires Map.event:zoom
	 * @fires Map.event:moveend
	 * @fires Map.event:zoomend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // Zoom to the zoom level 5 without an animated transition
	 * map.setZoom(5);
	 */
	setZoom(zoom: number, eventData?: EventData): this;
	/**
	 * Zooms the map to the specified zoom level, with an animated transition.
	 *
	 * @memberof Map#
	 * @param {number} zoom The zoom level to transition to.
	 * @param {AnimationOptions | null} options Options object.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:zoomstart
	 * @fires Map.event:move
	 * @fires Map.event:zoom
	 * @fires Map.event:moveend
	 * @fires Map.event:zoomend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // Zoom to the zoom level 5 without an animated transition
	 * map.zoomTo(5);
	 * // Zoom to the zoom level 8 with an animated transition
	 * map.zoomTo(8, {
	 *     duration: 2000,
	 *     offset: [100, 50]
	 * });
	 */
	zoomTo(zoom: number, options?: AnimationOptions | null, eventData?: EventData): this;
	/**
	 * Increases the map's zoom level by 1.
	 *
	 * @memberof Map#
	 * @param {AnimationOptions | null} options Options object.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:zoomstart
	 * @fires Map.event:move
	 * @fires Map.event:zoom
	 * @fires Map.event:moveend
	 * @fires Map.event:zoomend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // zoom the map in one level with a custom animation duration
	 * map.zoomIn({duration: 1000});
	 */
	zoomIn(options?: AnimationOptions, eventData?: EventData): this;
	/**
	 * Decreases the map's zoom level by 1.
	 *
	 * @memberof Map#
	 * @param {AnimationOptions | null} options Options object.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:zoomstart
	 * @fires Map.event:move
	 * @fires Map.event:zoom
	 * @fires Map.event:moveend
	 * @fires Map.event:zoomend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // zoom the map out one level with a custom animation offset
	 * map.zoomOut({offset: [80, 60]});
	 */
	zoomOut(options?: AnimationOptions, eventData?: EventData): this;
	/**
	 * Returns the map's current bearing. The bearing is the compass direction that is "up"; for example, a bearing
	 * of 90° orients the map so that east is up.
	 *
	 * @memberof Map#
	 * @returns {number} The map's current bearing.
	 * @example
	 * const bearing = map.getBearing();
	 * @see [Example: Navigate the map with game-like controls](https://www.mapbox.com/mapbox-gl-js/example/game-controls/)
	 */
	getBearing(): number;
	/**
	 * Sets the map's bearing (rotation). The bearing is the compass direction that is "up"; for example, a bearing
	 * of 90° orients the map so that east is up.
	 *
	 * Equivalent to `jumpTo({bearing: bearing})`.
	 *
	 * @memberof Map#
	 * @param {number} bearing The desired bearing.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:moveend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // Rotate the map to 90 degrees.
	 * map.setBearing(90);
	 */
	setBearing(bearing: number, eventData?: EventData): this;
	/**
	 * Returns the current padding applied around the map viewport.
	 *
	 * @memberof Map#
	 * @returns {PaddingOptions} The current padding around the map viewport.
	 * @example
	 * const padding = map.getPadding();
	 */
	getPadding(): PaddingOptions;
	/**
	 * Sets the padding in pixels around the viewport.
	 *
	 * Equivalent to `jumpTo({padding: padding})`.
	 *
	 * @memberof Map#
	 * @param {PaddingOptions} padding The desired padding. Format: {left: number, right: number, top: number, bottom: number}.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:moveend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // Sets a left padding of 300px, and a top padding of 50px
	 * map.setPadding({left: 300, top: 50});
	 */
	setPadding(padding: PaddingOptions, eventData?: EventData): this;
	/**
	 * Rotates the map to the specified bearing, with an animated transition. The bearing is the compass direction
	 * that is \"up\"; for example, a bearing of 90° orients the map so that east is up.
	 *
	 * @memberof Map#
	 * @param {number} bearing The desired bearing.
	 * @param {EasingOptions | null} options Options describing the destination and animation of the transition.
	 * Accepts {@link CameraOptions} and {@link AnimationOptions}.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:moveend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.rotateTo(30);
	 * @example
	 * // rotateTo with an animation of 2 seconds.
	 * map.rotateTo(30, {duration: 2000});
	 */
	rotateTo(bearing: number, options?: EasingOptions, eventData?: EventData): this;
	/**
	 * Rotates the map so that north is up (0° bearing), with an animated transition.
	 *
	 * @memberof Map#
	 * @param {EasingOptions | null} options Options describing the destination and animation of the transition.
	 * Accepts {@link CameraOptions} and {@link AnimationOptions}.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:moveend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // resetNorth with an animation of 2 seconds.
	 * map.resetNorth({duration: 2000});
	 */
	resetNorth(options?: EasingOptions, eventData?: EventData): this;
	/**
	 * Rotates and pitches the map so that north is up (0° bearing) and pitch is 0°, with an animated transition.
	 *
	 * @memberof Map#
	 * @param {EasingOptions | null} options Options describing the destination and animation of the transition.
	 * Accepts {@link CameraOptions} and {@link AnimationOptions}.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:moveend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // resetNorthPitch with an animation of 2 seconds.
	 * map.resetNorthPitch({duration: 2000});
	 */
	resetNorthPitch(options?: EasingOptions, eventData?: EventData): this;
	/**
	 * Snaps the map so that north is up (0° bearing), if the current bearing is
	 * close enough to it (within the `bearingSnap` threshold).
	 *
	 * @memberof Map#
	 * @param {EasingOptions | null} options Options describing the destination and animation of the transition.
	 * Accepts {@link CameraOptions} and {@link AnimationOptions}.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:moveend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // snapToNorth with an animation of 2 seconds.
	 * map.snapToNorth({duration: 2000});
	 */
	snapToNorth(options?: EasingOptions, eventData?: EventData): this;
	/**
	 * Returns the map's current [pitch](https://docs.mapbox.com/help/glossary/camera/) (tilt).
	 *
	 * @memberof Map#
	 * @returns {number} The map's current pitch, measured in degrees away from the plane of the screen.
	 * @example
	 * const pitch = map.getPitch();
	 */
	getPitch(): number;
	/**
	 * Sets the map's [pitch](https://docs.mapbox.com/help/glossary/camera/) (tilt). Equivalent to `jumpTo({pitch: pitch})`.
	 *
	 * @memberof Map#
	 * @param {number} pitch The pitch to set, measured in degrees away from the plane of the screen (0-60).
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:pitchstart
	 * @fires Map.event:movestart
	 * @fires Map.event:moveend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // setPitch with an animation of 2 seconds.
	 * map.setPitch(80, {duration: 2000});
	 */
	setPitch(pitch: number, eventData?: EventData): this;
	/**
	 * Returns a {@link CameraOptions} object for the highest zoom level
	 * up to and including `Map#getMaxZoom()` that fits the bounds
	 * in the viewport at the specified bearing.
	 *
	 * @memberof Map#
	 * @param {LngLatBoundsLike} bounds Calculate the center for these bounds in the viewport and use
	 * the highest zoom level up to and including `Map#getMaxZoom()` that fits
	 * in the viewport. LngLatBounds represent a box that is always axis-aligned with bearing 0.
	 * @param {CameraOptions | null} options Options object.
	 * @param {number | PaddingOptions} [options.padding] The amount of padding in pixels to add to the given bounds.
	 * @param {number} [options.bearing=0] Desired map bearing at end of animation, in degrees.
	 * @param {number} [options.pitch=0] Desired map pitch at end of animation, in degrees.
	 * @param {PointLike} [options.offset=[0, 0]] The center of the given bounds relative to the map's center, measured in pixels.
	 * @param {number} [options.maxZoom] The maximum zoom level to allow when the camera would transition to the specified bounds.
	 * @returns {CameraOptions | void} If map is able to fit to provided bounds, returns `CameraOptions` with
	 * `center`, `zoom`, and `bearing`. If map is unable to fit, method will warn and return undefined.
	 * @example
	 * const bbox = [[-79, 43], [-73, 45]];
	 * const newCameraTransform = map.cameraForBounds(bbox, {
	 *     padding: {top: 10, bottom:25, left: 15, right: 5}
	 * });
	 */
	cameraForBounds(bounds: LngLatBoundsLike, options?: CameraOptions): EasingOptions | null | undefined;
	_extendPadding(padding: PaddingOptions | null | undefined | number): Required<PaddingOptions>;
	_extendCameraOptions(options?: CameraOptions): FullCameraOptions;
	_minimumAABBFrustumDistance(tr: Transform, aabb: Aabb): number;
	_cameraForBoundsOnGlobe(transform: Transform, p0: LngLatLike, p1: LngLatLike, bearing: number, pitch: number, options?: CameraOptions): EasingOptions | null | undefined;
	/**
	 * Extends the AABB with padding, offset, and bearing.
	 *
	 * @param {Aabb} aabb The AABB.
	 * @param {Transform} tr The transform.
	 * @param {FullCameraOptions} options Camera options.
	 * @param {number} bearing The bearing.
	 * @returns {Aabb | null} The extended AABB or null if couldn't scale.
	 * @private
	 */
	_extendAABB(aabb: Aabb, tr: Transform, options: FullCameraOptions, bearing: number): Aabb | null;
	/** @section {Querying features} */
	/**
	 * Queries the currently loaded data for elevation at a geographical location. The elevation is returned in `meters` relative to mean sea-level.
	 * Returns `null` if `terrain` is disabled or if terrain data for the location hasn't been loaded yet.
	 *
	 * In order to guarantee that the terrain data is loaded ensure that the geographical location is visible and wait for the `idle` event to occur.
	 *
	 * @memberof Map#
	 * @param {LngLatLike} lnglat The geographical location at which to query.
	 * @param {ElevationQueryOptions} [options] Options object.
	 * @param {boolean} [options.exaggerated=true] When `true` returns the terrain elevation with the value of `exaggeration` from the style already applied.
	 * When `false`, returns the raw value of the underlying data without styling applied.
	 * @returns {number | null} The elevation in meters.
	 * @example
	 * const coordinate = [-122.420679, 37.772537];
	 * const elevation = map.queryTerrainElevation(coordinate);
	 * @see [Example: Query terrain elevation](https://docs.mapbox.com/mapbox-gl-js/example/query-terrain-elevation/)
	 */
	queryTerrainElevation(lnglat: LngLatLike, options?: ElevationQueryOptions | null): number | null | undefined;
	/**
	 * Calculate the center of these two points in the viewport and use
	 * the highest zoom level up to and including `Map#getMaxZoom()` that fits
	 * the points in the viewport at the specified bearing.
	 * @memberof Map#
	 * @param transform The current transform
	 * @param {LngLatLike} p0 First point
	 * @param {LngLatLike} p1 Second point
	 * @param {number} bearing Desired map bearing at end of animation, in degrees
	 * @param {number} pitch Desired map pitch at end of animation, in degrees
	 * @param {CameraOptions | null} options
	 * @param {number | PaddingOptions} [options.padding] The amount of padding in pixels to add to the given bounds.
	 * @param {PointLike} [options.offset=[0, 0]] The center of the given bounds relative to the map's center, measured in pixels.
	 * @param {number} [options.maxZoom] The maximum zoom level to allow when the camera would transition to the specified bounds.
	 * @returns {CameraOptions | void} If map is able to fit to provided bounds, returns `CameraOptions` with
	 * `center`, `zoom`, and `bearing`. If map is unable to fit, method will warn and return undefined.
	 * @private
	 * @example
	 * var p0 = [-79, 43];
	 * var p1 = [-73, 45];
	 * var bearing = 90;
	 * var newCameraTransform = map._cameraForBounds(p0, p1, bearing, pitch, {
	 *   padding: {top: 10, bottom:25, left: 15, right: 5}
	 * });
	 */
	_cameraForBounds(transform: Transform, p0: LngLatLike, p1: LngLatLike, bearing: number, pitch: number, options?: CameraOptions): EasingOptions | null | undefined;
	/**
	 * Pans and zooms the map to contain its visible area within the specified geographical bounds.
	 * If a padding is set on the map, the bounds are fit to the inset.
	 *
	 * @memberof Map#
	 * @param {LngLatBoundsLike} bounds Center these bounds in the viewport and use the highest
	 * zoom level up to and including `Map#getMaxZoom()` that fits them in the viewport.
	 * @param {Object} [options] Options supports all properties from {@link AnimationOptions} and {@link CameraOptions} in addition to the fields below.
	 * @param {number | PaddingOptions} [options.padding] The amount of padding in pixels to add to the given bounds.
	 * @param {number} [options.pitch=0] Desired map pitch at end of animation, in degrees.
	 * @param {number} [options.bearing=0] Desired map bearing at end of animation, in degrees.
	 * @param {boolean} [options.linear=false] If `true`, the map transitions using
	 * {@link Map#easeTo}. If `false`, the map transitions using {@link Map#flyTo}. See
	 * those functions and {@link AnimationOptions} for information about options available.
	 * @param {Function} [options.easing] An easing function for the animated transition. See {@link AnimationOptions}.
	 * @param {PointLike} [options.offset=[0, 0]] The center of the given bounds relative to the map's center, measured in pixels.
	 * @param {number} [options.maxZoom] The maximum zoom level to allow when the map view transitions to the specified bounds.
	 * @param {Object} [eventData] Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:moveend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * const bbox = [[-79, 43], [-73, 45]];
	 * map.fitBounds(bbox, {
	 *     padding: {top: 10, bottom:25, left: 15, right: 5}
	 * });
	 * @see [Example: Fit a map to a bounding box](https://www.mapbox.com/mapbox-gl-js/example/fitbounds/)
	 */
	fitBounds(bounds: LngLatBoundsLike, options?: EasingOptions, eventData?: EventData): this;
	/**
	 * Pans, rotates and zooms the map to to fit the box made by points p0 and p1
	 * once the map is rotated to the specified bearing. To zoom without rotating,
	 * pass in the current map bearing.
	 *
	 * @memberof Map#
	 * @param {PointLike} p0 First point on screen, in pixel coordinates.
	 * @param {PointLike} p1 Second point on screen, in pixel coordinates.
	 * @param {number} bearing Desired map bearing at end of animation, in degrees.
	 * @param {EasingOptions | null} options Options object.
	 * Accepts {@link CameraOptions} and {@link AnimationOptions}.
	 * @param {number | PaddingOptions} [options.padding] The amount of padding in pixels to add to the given bounds.
	 * @param {boolean} [options.linear=false] If `true`, the map transitions using
	 * {@link Map#easeTo}. If `false`, the map transitions using {@link Map#flyTo}. See
	 * those functions and {@link AnimationOptions} for information about options available.
	 * @param {number} [options.pitch=0] Desired map pitch at end of animation, in degrees.
	 * @param {Function} [options.easing] An easing function for the animated transition. See {@link AnimationOptions}.
	 * @param {PointLike} [options.offset=[0, 0]] The center of the given bounds relative to the map's center, measured in pixels.
	 * @param {number} [options.maxZoom] The maximum zoom level to allow when the map view transitions to the specified bounds.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:moveend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * const p0 = [220, 400];
	 * const p1 = [500, 900];
	 * map.fitScreenCoordinates(p0, p1, map.getBearing(), {
	 *     padding: {top: 10, bottom:25, left: 15, right: 5}
	 * });
	 * @see Used by {@link BoxZoomHandler}
	 */
	fitScreenCoordinates(p0: PointLike, p1: PointLike, bearing: number, options?: EasingOptions, eventData?: EventData): this;
	_fitInternal(calculatedOptions?: EasingOptions | null, options?: EasingOptions, eventData?: EventData): this;
	/**
	 * Changes any combination of center, zoom, bearing, and pitch, without
	 * an animated transition. The map will retain its current values for any
	 * details not specified in `options`.
	 *
	 * @memberof Map#
	 * @param {CameraOptions} options Options object.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:zoomstart
	 * @fires Map.event:pitchstart
	 * @fires Map.event:rotate
	 * @fires Map.event:move
	 * @fires Map.event:zoom
	 * @fires Map.event:pitch
	 * @fires Map.event:moveend
	 * @fires Map.event:zoomend
	 * @fires Map.event:pitchend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // jump to coordinates at current zoom
	 * map.jumpTo({center: [0, 0]});
	 * // jump with zoom, pitch, and bearing options
	 * map.jumpTo({
	 *     center: [0, 0],
	 *     zoom: 8,
	 *     pitch: 45,
	 *     bearing: 90
	 * });
	 * @see [Example: Jump to a series of locations](https://docs.mapbox.com/mapbox-gl-js/example/jump-to/)
	 * @see [Example: Update a feature in realtime](https://docs.mapbox.com/mapbox-gl-js/example/live-update-feature/)
	 */
	jumpTo(options: CameraOptions & {
		preloadOnly?: AnimationOptions["preloadOnly"];
	}, eventData?: EventData): this;
	/**
	 * Returns position and orientation of the camera entity.
	 *
	 * This method is not supported for projections other than mercator.
	 *
	 * @memberof Map#
	 * @returns {FreeCameraOptions} The camera state.
	 * @example
	 * const camera = map.getFreeCameraOptions();
	 *
	 * const position = [138.72649, 35.33974];
	 * const altitude = 3000;
	 *
	 * camera.position = mapboxgl.MercatorCoordinate.fromLngLat(position, altitude);
	 * camera.lookAtPoint([138.73036, 35.36197]);
	 *
	 * map.setFreeCameraOptions(camera);
	 */
	getFreeCameraOptions(): FreeCameraOptions;
	/**
	 * `FreeCameraOptions` provides more direct access to the underlying camera entity.
	 * For backwards compatibility the state set using this API must be representable with
	 * `CameraOptions` as well. Parameters are clamped into a valid range or discarded as invalid
	 * if the conversion to the pitch and bearing presentation is ambiguous. For example orientation
	 * can be invalid if it leads to the camera being upside down, the quaternion has zero length,
	 * or the pitch is over the maximum pitch limit.
	 *
	 * This method is not supported for projections other than mercator.
	 *
	 * @memberof Map#
	 * @param {FreeCameraOptions} options `FreeCameraOptions` object.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:zoomstart
	 * @fires Map.event:pitchstart
	 * @fires Map.event:rotate
	 * @fires Map.event:move
	 * @fires Map.event:zoom
	 * @fires Map.event:pitch
	 * @fires Map.event:moveend
	 * @fires Map.event:zoomend
	 * @fires Map.event:pitchend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * const camera = map.getFreeCameraOptions();
	 *
	 * const position = [138.72649, 35.33974];
	 * const altitude = 3000;
	 *
	 * camera.position = mapboxgl.MercatorCoordinate.fromLngLat(position, altitude);
	 * camera.lookAtPoint([138.73036, 35.36197]);
	 *
	 * map.setFreeCameraOptions(camera);
	 */
	setFreeCameraOptions(options: FreeCameraOptions, eventData?: EventData): this;
	/**
	 * Changes any combination of `center`, `zoom`, `bearing`, `pitch`, and `padding` with an animated transition
	 * between old and new values. The map will retain its current values for any
	 * details not specified in `options`.
	 *
	 * Note: The transition will happen instantly if the user has enabled
	 * the `reduced motion` accessibility feature enabled in their operating system,
	 * unless `options` includes `essential: true`.
	 *
	 * @memberof Map#
	 * @param {EasingOptions} options Options describing the destination and animation of the transition.
	 * Accepts {@link CameraOptions} and {@link AnimationOptions}.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:zoomstart
	 * @fires Map.event:pitchstart
	 * @fires Map.event:rotate
	 * @fires Map.event:move
	 * @fires Map.event:zoom
	 * @fires Map.event:pitch
	 * @fires Map.event:moveend
	 * @fires Map.event:zoomend
	 * @fires Map.event:pitchend
	 * @returns {Map} `this` Returns itself to allow for method chaining.
	 * @example
	 * // Ease with default options to null island for 5 seconds.
	 * map.easeTo({center: [0, 0], zoom: 9, duration: 5000});
	 * @example
	 * // Using easeTo options.
	 * map.easeTo({
	 *     center: [0, 0],
	 *     zoom: 9,
	 *     speed: 0.2,
	 *     curve: 1,
	 *     duration: 5000,
	 *     easing(t) {
	 *         return t;
	 *     }
	 * });
	 * @see [Example: Navigate the map with game-like controls](https://www.mapbox.com/mapbox-gl-js/example/game-controls/)
	 */
	easeTo(options: EasingOptions & {
		easeId?: string;
	}, eventData?: EventData): this;
	_prepareEase(eventData: EventData | null | undefined, noMoveStart: boolean, currently?: any): void;
	_fireMoveEvents(eventData?: EventData): void;
	_afterEase(eventData?: EventData, easeId?: string): void;
	/**
	 * Changes any combination of center, zoom, bearing, and pitch, animating the transition along a curve that
	 * evokes flight. The animation seamlessly incorporates zooming and panning to help
	 * the user maintain their bearings even after traversing a great distance.
	 *
	 * If a user has the `reduced motion` accessibility feature enabled in their
	 * operating system, the animation will be skipped and this will behave
	 * equivalently to `jumpTo`, unless 'options' includes `essential: true`.
	 *
	 * @memberof Map#
	 * @param {Object} options Options describing the destination and animation of the transition.
	 * Accepts {@link CameraOptions}, {@link AnimationOptions},
	 * and the following additional options.
	 * @param {number} [options.curve=1.42] The zooming "curve" that will occur along the
	 * flight path. A high value maximizes zooming for an exaggerated animation, while a low
	 * value minimizes zooming for an effect closer to {@link Map#easeTo}. 1.42 is the average
	 * value selected by participants in the user study discussed in
	 * [van Wijk (2003)](https://www.win.tue.nl/~vanwijk/zoompan.pdf). A value of
	 * `Math.pow(6, 0.25)` would be equivalent to the root mean squared average velocity. A
	 * value of 1 would produce a circular motion. If `options.minZoom` is specified, this option will be ignored.
	 * @param {number} [options.minZoom] The zero-based zoom level at the peak of the flight path. If
	 * this option is specified, `options.curve` will be ignored.
	 * @param {number} [options.speed=1.2] The average speed of the animation defined in relation to
	 * `options.curve`. A speed of 1.2 means that the map appears to move along the flight path
	 * by 1.2 times `options.curve` screenfuls every second. A _screenful_ is the map's visible span.
	 * It does not correspond to a fixed physical distance, but varies by zoom level.
	 * @param {number} [options.screenSpeed] The average speed of the animation measured in screenfuls
	 * per second, assuming a linear timing curve. If `options.speed` is specified, this option is ignored.
	 * @param {number} [options.maxDuration] The animation's maximum duration, measured in milliseconds.
	 * If duration exceeds maximum duration, it resets to 0.
	 * @param {Object | null} eventData Additional properties to be added to event objects of events triggered by this method.
	 * @fires Map.event:movestart
	 * @fires Map.event:zoomstart
	 * @fires Map.event:pitchstart
	 * @fires Map.event:move
	 * @fires Map.event:zoom
	 * @fires Map.event:rotate
	 * @fires Map.event:pitch
	 * @fires Map.event:moveend
	 * @fires Map.event:zoomend
	 * @fires Map.event:pitchend
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // fly with default options to null island
	 * map.flyTo({center: [0, 0], zoom: 9});
	 * // using flyTo options
	 * map.flyTo({
	 *     center: [0, 0],
	 *     zoom: 9,
	 *     speed: 0.2,
	 *     curve: 1,
	 *     easing(t) {
	 *         return t;
	 *     }
	 * });
	 * @see [Example: Fly to a location](https://www.mapbox.com/mapbox-gl-js/example/flyto/)
	 * @see [Example: Slowly fly to a location](https://www.mapbox.com/mapbox-gl-js/example/flyto-options/)
	 * @see [Example: Fly to a location based on scroll position](https://www.mapbox.com/mapbox-gl-js/example/scroll-fly-to/)
	 */
	flyTo(options: EasingOptions, eventData?: EventData): this;
	isEasing(): boolean;
	/**
	 * Stops any animated transition underway.
	 *
	 * @memberof Map#
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.stop();
	 */
	stop(): this;
	_requestRenderFrame(_callback: () => void): TaskID;
	_cancelRenderFrame(_: TaskID): void;
	_stop(allowGestures?: boolean, easeId?: string): this;
	_ease(frame: (_: number) => Transform | void, finish: () => void, options: {
		animate: boolean;
		duration: number;
		easing: (_: number) => number;
	}): void;
	_renderFrameCallback(): void;
	_normalizeBearing(bearing: number, currentBearing: number): number;
	_normalizeCenter(center: LngLat): void;
	_prefersReducedMotion(options?: AnimationOptions | null): boolean;
	_emulate(frame: any, duration: number, initialTransform: Transform): Array<Transform>;
	_preloadTiles(_transform: Transform | Array<Transform>, _callback?: Callback<any>): any;
}
declare class HandlerInertia {
	_map: Map$1;
	_inertiaBuffer: Array<{
		time: number;
		settings: any;
	}>;
	constructor(map: Map$1);
	clear(): void;
	record(settings: any): void;
	_drainInertiaBuffer(): void;
	_onMoveEnd(panInertiaOptions?: DragPanOptions): EasingOptions & {
		easeId?: string;
	} | null | undefined;
}
type InputEvent$1 = MouseEvent | TouchEvent | KeyboardEvent | WheelEvent;
type EventsInProgress = {
	[T in keyof MapEvents]?: MapEvents[T];
};
declare class RenderFrameEvent extends Event$1<{
	renderFrame: {
		timeStamp: number;
	};
}, "renderFrame"> {
	type: "renderFrame";
	timeStamp: number;
}
declare class TrackingEllipsoid {
	constants: Array<number>;
	radius: number;
	constructor();
	setup(center: vec3, pointOnSurface: vec3): void;
	projectRay(dir: vec3): vec3;
}
declare class HandlerManager {
	_map: Map$1;
	_el: HTMLElement;
	_handlers: Array<{
		handlerName: string;
		handler: Handler;
		allowed: any;
	}>;
	_eventsInProgress: EventsInProgress;
	_frameId: number | null | undefined;
	_inertia: HandlerInertia;
	_bearingSnap: number;
	_handlersById: {
		[key: string]: Handler;
	};
	_updatingCamera: boolean;
	_changes: Array<[
		HandlerResult,
		any,
		any
	]>;
	_previousActiveHandlers: {
		[key: string]: Handler;
	};
	_listeners: Array<[
		HTMLElement | Document,
		string,
		undefined | AddEventListenerOptions
	]>;
	_trackingEllipsoid: TrackingEllipsoid;
	_dragOrigin: vec3 | null | undefined;
	_originalZoom: number | null | undefined;
	constructor(map: Map$1, options: {
		interactive: boolean;
		pitchWithRotate: boolean;
		clickTolerance: number;
		bearingSnap: number;
	});
	destroy(): void;
	_addDefaultHandlers(options: {
		interactive: boolean;
		pitchWithRotate: boolean;
		clickTolerance: number;
	}): void;
	_add(handlerName: string, handler: Handler, allowed?: Array<string>): void;
	stop(allowEndAnimation: boolean): void;
	isActive(): boolean;
	isZooming(): boolean;
	isRotating(): boolean;
	isMoving(): boolean;
	_isDragging(): boolean;
	_blockedByActive(activeHandlers: {
		[key: string]: Handler;
	}, allowed: Array<string>, myName: string): boolean;
	handleWindowEvent(e: InputEvent$1): void;
	_getMapTouches(touches: TouchList): TouchList;
	handleEvent(e: InputEvent$1 | RenderFrameEvent, eventName?: string): void;
	mergeHandlerResult(mergedHandlerResult: HandlerResult, eventsInProgress: any, handlerResult: HandlerResult, name: string, e?: InputEvent$1): void;
	_applyChanges(): void;
	_updateMapTransform(combinedResult: any, combinedEventsInProgress: any, deactivatedHandlers: any): void;
	_fireEvents(newEventsInProgress: EventsInProgress, deactivatedHandlers: any, allowEndAnimation: boolean): void;
	_fireEvent(type: keyof MapEvents, event?: {
		originalEvent: unknown;
	}): void;
	_requestFrame(): number;
	_triggerRenderFrame(): void;
}
type Anchor$1 = "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
type Offset = number | PointLike | Partial<Record<Anchor$1, PointLike>>;
export type PopupOptions = {
	closeButton?: boolean;
	closeOnClick?: boolean;
	closeOnMove?: boolean;
	focusAfterOpen?: boolean;
	anchor?: Anchor$1;
	offset?: Offset;
	className?: string;
	maxWidth?: string;
};
type PopupEvents = {
	"open": void;
	"close": void;
};
/**
 * A popup component.
 *
 * @param {Object} [options]
 * @param {boolean} [options.closeButton=true] If `true`, a close button will appear in the
 * top right corner of the popup.
 * @param {boolean} [options.closeOnClick=true] If `true`, the popup will close when the
 * map is clicked.
 * @param {boolean} [options.closeOnMove=false] If `true`, the popup will close when the
 * map moves.
 * @param {boolean} [options.focusAfterOpen=true] If `true`, the popup will try to focus the
 * first focusable element inside the popup.
 * @param {string} [options.anchor] - A string indicating the part of the popup that should
 * be positioned closest to the coordinate, set via {@link Popup#setLngLat}.
 * Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`,
 * `'top-right'`, `'bottom-left'`, and `'bottom-right'`. If unset, the anchor will be
 * dynamically set to ensure the popup falls within the map container with a preference
 * for `'bottom'`.
 * @param {number | PointLike | Object} [options.offset] -
 * A pixel offset applied to the popup's location specified as:
 * - a single number specifying a distance from the popup's location
 * - a {@link PointLike} specifying a constant offset
 * - an object of {@link Point}s specifing an offset for each anchor position.
 *
 * Negative offsets indicate left and up.
 * @param {string} [options.className] Space-separated CSS class names to add to popup container.
 * @param {string} [options.maxWidth='240px'] -
 * A string that sets the CSS property of the popup's maximum width (for example, `'300px'`).
 * To ensure the popup resizes to fit its content, set this property to `'none'`.
 * See the MDN documentation for the list of [available values](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width).
 * @example
 * const markerHeight = 50;
 * const markerRadius = 10;
 * const linearOffset = 25;
 * const popupOffsets = {
 *     'top': [0, 0],
 *     'top-left': [0, 0],
 *     'top-right': [0, 0],
 *     'bottom': [0, -markerHeight],
 *     'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
 *     'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
 *     'left': [markerRadius, (markerHeight - markerRadius) * -1],
 *     'right': [-markerRadius, (markerHeight - markerRadius) * -1]
 * };
 * const popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
 *     .setLngLat(e.lngLat)
 *     .setHTML("<h1>Hello World!</h1>")
 *     .setMaxWidth("300px")
 *     .addTo(map);
 * @see [Example: Display a popup](https://www.mapbox.com/mapbox-gl-js/example/popup/)
 * @see [Example: Display a popup on hover](https://www.mapbox.com/mapbox-gl-js/example/popup-on-hover/)
 * @see [Example: Display a popup on click](https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/)
 * @see [Example: Attach a popup to a marker instance](https://www.mapbox.com/mapbox-gl-js/example/set-popup/)
 */
export declare class Popup extends Evented<PopupEvents> {
	_map: Map$1 | null | undefined;
	options: PopupOptions;
	_content: HTMLElement | null | undefined;
	_container: HTMLElement | null | undefined;
	_closeButton: HTMLElement | null | undefined;
	_tip: HTMLElement | null | undefined;
	_lngLat: LngLat;
	_trackPointer: boolean;
	_pos: Point | null | undefined;
	_anchor: Anchor$1;
	_classList: Set<string>;
	_marker: Marker | null | undefined;
	constructor(options?: PopupOptions);
	/**
	 * Adds the popup to a map.
	 *
	 * @param {Map} map The Mapbox GL JS map to add the popup to.
	 * @returns {Popup} Returns itself to allow for method chaining.
	 * @example
	 * new mapboxgl.Popup()
	 *     .setLngLat([0, 0])
	 *     .setHTML("<h1>Null Island</h1>")
	 *     .addTo(map);
	 * @see [Example: Display a popup](https://docs.mapbox.com/mapbox-gl-js/example/popup/)
	 * @see [Example: Display a popup on hover](https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/)
	 * @see [Example: Display a popup on click](https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/)
	 * @see [Example: Show polygon information on click](https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/)
	 */
	addTo(map: Map$1): this;
	/**
	 * Checks if a popup is open.
	 *
	 * @returns {boolean} `true` if the popup is open, `false` if it is closed.
	 * @example
	 * const isPopupOpen = popup.isOpen();
	 */
	isOpen(): boolean;
	/**
	 * Removes the popup from the map it has been added to.
	 *
	 * @example
	 * const popup = new mapboxgl.Popup().addTo(map);
	 * popup.remove();
	 * @returns {Popup} Returns itself to allow for method chaining.
	 */
	remove(): this;
	/**
	 * Returns the geographical location of the popup's anchor.
	 *
	 * The longitude of the result may differ by a multiple of 360 degrees from the longitude previously
	 * set by `setLngLat` because `Popup` wraps the anchor longitude across copies of the world to keep
	 * the popup on screen.
	 *
	 * @returns {LngLat} The geographical location of the popup's anchor.
	 * @example
	 * const lngLat = popup.getLngLat();
	 */
	getLngLat(): LngLat;
	/**
	 * Sets the geographical location of the popup's anchor, and moves the popup to it. Replaces trackPointer() behavior.
	 *
	 * @param {LngLatLike} lnglat The geographical location to set as the popup's anchor.
	 * @returns {Popup} Returns itself to allow for method chaining.
	 * @example
	 * popup.setLngLat([-122.4194, 37.7749]);
	 */
	setLngLat(lnglat: LngLatLike): this;
	/**
	 * Tracks the popup anchor to the cursor position on screens with a pointer device (it will be hidden on touchscreens). Replaces the `setLngLat` behavior.
	 * For most use cases, set `closeOnClick` and `closeButton` to `false`.
	 *
	 * @example
	 * const popup = new mapboxgl.Popup({closeOnClick: false, closeButton: false})
	 *     .setHTML("<h1>Hello World!</h1>")
	 *     .trackPointer()
	 *     .addTo(map);
	 * @returns {Popup} Returns itself to allow for method chaining.
	 */
	trackPointer(): this;
	/**
	 * Returns the `Popup`'s HTML element.
	 *
	 * @example
	 * // Change the `Popup` element's font size
	 * const popup = new mapboxgl.Popup()
	 *     .setLngLat([-96, 37.8])
	 *     .setHTML("<p>Hello World!</p>")
	 *     .addTo(map);
	 * const popupElem = popup.getElement();
	 * popupElem.style.fontSize = "25px";
	 * @returns {HTMLElement} Returns container element.
	 */
	getElement(): HTMLElement | null | undefined;
	/**
	 * Sets the popup's content to a string of text.
	 *
	 * This function creates a [Text](https://developer.mozilla.org/en-US/docs/Web/API/Text) node in the DOM,
	 * so it cannot insert raw HTML. Use this method for security against XSS
	 * if the popup content is user-provided.
	 *
	 * @param {string} text Textual content for the popup.
	 * @returns {Popup} Returns itself to allow for method chaining.
	 * @example
	 * const popup = new mapboxgl.Popup()
	 *     .setLngLat(e.lngLat)
	 *     .setText('Hello, world!')
	 *     .addTo(map);
	 */
	setText(text: string): this;
	/**
	 * Sets the popup's content to the HTML provided as a string.
	 *
	 * This method does not perform HTML filtering or sanitization, and must be
	 * used only with trusted content. Consider {@link Popup#setText} if
	 * the content is an untrusted text string.
	 *
	 * @param {string} html A string representing HTML content for the popup.
	 * @returns {Popup} Returns itself to allow for method chaining.
	 * @example
	 * const popup = new mapboxgl.Popup()
	 *     .setLngLat(e.lngLat)
	 *     .setHTML("<h1>Hello World!</h1>")
	 *     .addTo(map);
	 * @see [Example: Display a popup](https://docs.mapbox.com/mapbox-gl-js/example/popup/)
	 * @see [Example: Display a popup on hover](https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/)
	 * @see [Example: Display a popup on click](https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/)
	 * @see [Example: Attach a popup to a marker instance](https://docs.mapbox.com/mapbox-gl-js/example/set-popup/)
	 */
	setHTML(html: string): this;
	/**
	 * Returns the popup's maximum width.
	 *
	 * @returns {string} The maximum width of the popup.
	 * @example
	 * const maxWidth = popup.getMaxWidth();
	 */
	getMaxWidth(): string | null | undefined;
	/**
	 * Sets the popup's maximum width. This is setting the CSS property `max-width`.
	 * Available values can be found here: https://developer.mozilla.org/en-US/docs/Web/CSS/max-width.
	 *
	 * @param {string} maxWidth A string representing the value for the maximum width.
	 * @returns {Popup} Returns itself to allow for method chaining.
	 * @example
	 * popup.setMaxWidth('50');
	 */
	setMaxWidth(maxWidth: string): this;
	/**
	 * Sets the popup's content to the element provided as a DOM node.
	 *
	 * @param {Element} htmlNode A DOM node to be used as content for the popup.
	 * @returns {Popup} Returns itself to allow for method chaining.
	 * @example
	 * // create an element with the popup content
	 * const div = window.document.createElement('div');
	 * div.innerHTML = 'Hello, world!';
	 * const popup = new mapboxgl.Popup()
	 *     .setLngLat(e.lngLat)
	 *     .setDOMContent(div)
	 *     .addTo(map);
	 */
	setDOMContent(htmlNode: Node): this;
	/**
	 * Adds a CSS class to the popup container element.
	 *
	 * @param {string} className Non-empty string with CSS class name to add to popup container.
	 * @returns {Popup} Returns itself to allow for method chaining.
	 *
	 * @example
	 * const popup = new mapboxgl.Popup();
	 * popup.addClassName('some-class');
	 */
	addClassName(className: string): this;
	/**
	 * Removes a CSS class from the popup container element.
	 *
	 * @param {string} className Non-empty string with CSS class name to remove from popup container.
	 *
	 * @returns {Popup} Returns itself to allow for method chaining.
	 * @example
	 * const popup = new mapboxgl.Popup({className: 'some classes'});
	 * popup.removeClassName('some');
	 */
	removeClassName(className: string): this;
	/**
	 * Sets the popup's offset.
	 *
	 * @param {number | PointLike | Object} offset Sets the popup's offset. The `Object` is of the following structure
	 *     {
	 *         'center': ?PointLike,
	 *         'top': ?PointLike,
	 *         'bottom': ?PointLike,
	 *         'left': ?PointLike,
	 *         'right': ?PointLike,
	 *         'top-left': ?PointLike,
	 *         'top-right': ?PointLike,
	 *         'bottom-left': ?PointLike,
	 *         'bottom-right': ?PointLike
	 *     }.
	 *
	 * @returns {Popup} `this`.
	 * @example
	 * popup.setOffset(10);
	 */
	setOffset(offset?: Offset): this;
	/**
	 * Add or remove the given CSS class on the popup container, depending on whether the container currently has that class.
	 *
	 * @param {string} className Non-empty string with CSS class name to add/remove.
	 *
	 * @returns {boolean} If the class was removed return `false`. If the class was added, then return `true`.
	 *
	 * @example
	 * const popup = new mapboxgl.Popup();
	 * popup.toggleClassName('highlighted');
	 */
	toggleClassName(className: string): boolean;
	_onMouseEvent(event: MapMouseEvent): void;
	_getAnchor(bottomY: number): Anchor$1;
	_updateClassList(): void;
	_update(cursor?: Point | MapEventOf<"move">): void;
	_focusFirstElement(): void;
	_onClose(): void;
	_setOpacity(opacity: number): void;
}
export type MarkerOptions = {
	element?: HTMLElement;
	offset?: PointLike;
	anchor?: Anchor$1;
	color?: string;
	scale?: number;
	draggable?: boolean;
	clickTolerance?: number;
	rotation?: number;
	rotationAlignment?: string;
	pitchAlignment?: string;
	occludedOpacity?: number;
	className?: string;
};
type MarkerEvents = {
	"dragstart": void;
	"drag": void;
	"dragend": void;
};
/**
 * Creates a marker component.
 *
 * @param {Object} [options]
 * @param {HTMLElement} [options.element] DOM element to use as a marker. The default is a light blue, droplet-shaped SVG marker.
 * @param {string} [options.anchor='center'] A string indicating the part of the Marker that should be positioned closest to the coordinate set via {@link Marker#setLngLat}.
 * Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`.
 * @param {PointLike} [options.offset] The offset in pixels as a {@link PointLike} object to apply relative to the element's center. Negatives indicate left and up.
 * @param {string} [options.color='#3FB1CE'] The color to use for the default marker if `options.element` is not provided. The default is light blue.
 * @param {number} [options.scale=1] The scale to use for the default marker if `options.element` is not provided. The default scale corresponds to a height of `41px` and a width of `27px`.
 * @param {boolean} [options.draggable=false] A boolean indicating whether or not a marker is able to be dragged to a new position on the map.
 * @param {number} [options.clickTolerance=0] The max number of pixels a user can shift the mouse pointer during a click on the marker for it to be considered a valid click (as opposed to a marker drag). The default is to inherit map's `clickTolerance`.
 * @param {number} [options.rotation=0] The rotation angle of the marker in degrees, relative to its respective `rotationAlignment` setting. A positive value will rotate the marker clockwise.
 * @param {string} [options.pitchAlignment='auto'] `'map'` aligns the `Marker` to the plane of the map. `'viewport'` aligns the `Marker` to the plane of the viewport. `'auto'` automatically matches the value of `rotationAlignment`.
 * @param {string} [options.rotationAlignment='auto'] The alignment of the marker's rotation.`'map'` is aligned with the map plane, consistent with the cardinal directions as the map rotates. `'viewport'` is screenspace-aligned. `'horizon'` is aligned according to the nearest horizon, on non-globe projections it is equivalent to `'viewport'`. `'auto'` is equivalent to `'viewport'`.
 * @param {number} [options.occludedOpacity=0.2] The opacity of a marker that's occluded by 3D terrain.
 * @param {string} [options.className] Space-separated CSS class names to add to marker element.
 * @example
 * // Create a new marker.
 * const marker = new mapboxgl.Marker()
 *     .setLngLat([30.5, 50.5])
 *     .addTo(map);
 * @example
 * // Set marker options.
 * const marker = new mapboxgl.Marker({
 *     color: "#FFFFFF",
 *     draggable: true
 * }).setLngLat([30.5, 50.5])
 *     .addTo(map);
 * @see [Example: Add custom icons with Markers](https://www.mapbox.com/mapbox-gl-js/example/custom-marker-icons/)
 * @see [Example: Create a draggable Marker](https://www.mapbox.com/mapbox-gl-js/example/drag-a-marker/)
 */
export declare class Marker extends Evented<MarkerEvents> {
	_map: Map$1 | null | undefined;
	_anchor: Anchor$1;
	_offset: Point;
	_element: HTMLElement;
	_popup: Popup | null | undefined;
	_lngLat: LngLat;
	_pos: Point | null | undefined;
	_color: string;
	_scale: number;
	_defaultMarker: boolean;
	_draggable: boolean;
	_clickTolerance: number;
	_isDragging: boolean;
	_state: "inactive" | "pending" | "active";
	_positionDelta: Point | null | undefined;
	_pointerdownPos: Point | null | undefined;
	_rotation: number;
	_pitchAlignment: string;
	_rotationAlignment: string;
	_originalTabIndex: string | null | undefined;
	_fadeTimer: number | null | undefined;
	_updateFrameId: number;
	_updateMoving: () => void;
	_occludedOpacity: number;
	constructor(options?: MarkerOptions, legacyOptions?: MarkerOptions);
	/**
	 * Attaches the `Marker` to a `Map` object.
	 *
	 * @param {Map} map The Mapbox GL JS map to add the marker to.
	 * @returns {Marker} Returns itself to allow for method chaining.
	 * @example
	 * const marker = new mapboxgl.Marker()
	 *     .setLngLat([30.5, 50.5])
	 *     .addTo(map); // add the marker to the map
	 */
	addTo(map: Map$1): this;
	/**
	 * Removes the marker from a map.
	 *
	 * @example
	 * const marker = new mapboxgl.Marker().addTo(map);
	 * marker.remove();
	 * @returns {Marker} Returns itself to allow for method chaining.
	 */
	remove(): this;
	/**
	 * Get the marker's geographical location.
	 *
	 * The longitude of the result may differ by a multiple of 360 degrees from the longitude previously
	 * set by `setLngLat` because `Marker` wraps the anchor longitude across copies of the world to keep
	 * the marker on screen.
	 *
	 * @returns {LngLat} A {@link LngLat} describing the marker's location.
	* @example
	* // Store the marker's longitude and latitude coordinates in a variable
	* const lngLat = marker.getLngLat();
	* // Print the marker's longitude and latitude values in the console
	* console.log(`Longitude: ${lngLat.lng}, Latitude: ${lngLat.lat}`);
	* @see [Example: Create a draggable Marker](https://docs.mapbox.com/mapbox-gl-js/example/drag-a-marker/)
	*/
	getLngLat(): LngLat;
	/**
	* Set the marker's geographical position and move it.
	 *
	* @param {LngLat} lnglat A {@link LngLat} describing where the marker should be located.
	* @returns {Marker} Returns itself to allow for method chaining.
	* @example
	* // Create a new marker, set the longitude and latitude, and add it to the map.
	* new mapboxgl.Marker()
	*     .setLngLat([-65.017, -16.457])
	*     .addTo(map);
	* @see [Example: Add custom icons with Markers](https://docs.mapbox.com/mapbox-gl-js/example/custom-marker-icons/)
	* @see [Example: Create a draggable Marker](https://docs.mapbox.com/mapbox-gl-js/example/drag-a-marker/)
	* @see [Example: Add a marker using a place name](https://docs.mapbox.com/mapbox-gl-js/example/marker-from-geocode/)
	*/
	setLngLat(lnglat: LngLatLike): this;
	/**
	 * Returns the `Marker`'s HTML element.
	 *
	 * @returns {HTMLElement} Returns the marker element.
	 * @example
	 * const element = marker.getElement();
	 */
	getElement(): HTMLElement;
	/**
	 * Binds a {@link Popup} to the {@link Marker}.
	 *
	 * @param {Popup | null} popup An instance of the {@link Popup} class. If undefined or null, any popup
	 * set on this {@link Marker} instance is unset.
	 * @returns {Marker} Returns itself to allow for method chaining.
	 * @example
	 * const marker = new mapboxgl.Marker()
	 *     .setLngLat([0, 0])
	 *     .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>")) // add popup
	 *     .addTo(map);
	 * @see [Example: Attach a popup to a marker instance](https://docs.mapbox.com/mapbox-gl-js/example/set-popup/)
	 */
	setPopup(popup?: Popup | null): this;
	_onKeyPress(e: KeyboardEvent): void;
	_onMapClick(e: MapMouseEvent): void;
	/**
	 * Returns the {@link Popup} instance that is bound to the {@link Marker}.
	 *
	 * @returns {Popup} Returns the popup.
	 * @example
	 * const marker = new mapboxgl.Marker()
	 *     .setLngLat([0, 0])
	 *     .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
	 *     .addTo(map);
	 *
	 * console.log(marker.getPopup()); // return the popup instance
	 */
	getPopup(): Popup | null | undefined;
	/**
	 * Opens or closes the {@link Popup} instance that is bound to the {@link Marker}, depending on the current state of the {@link Popup}.
	 *
	 * @returns {Marker} Returns itself to allow for method chaining.
	 * @example
	 * const marker = new mapboxgl.Marker()
	 *     .setLngLat([0, 0])
	 *     .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
	 *     .addTo(map);
	 *
	 * marker.togglePopup(); // toggle popup open or closed
	 */
	togglePopup(): this;
	_behindTerrain(): boolean;
	_evaluateOpacity(): void;
	_clearFadeTimer(): void;
	_updateDOM(): void;
	_calculateXYTransform(): string;
	_calculateZTransform(): string;
	_update(delaySnap?: MapEventOf<"moveend"> | boolean): void;
	/**
	 * Get the marker's offset.
	 *
	 * @returns {Point} The marker's screen coordinates in pixels.
	 * @example
	 * const offset = marker.getOffset();
	 */
	getOffset(): Point;
	/**
	 * Sets the offset of the marker.
	 *
	 * @param {PointLike} offset The offset in pixels as a {@link PointLike} object to apply relative to the element's center. Negatives indicate left and up.
	 * @returns {Marker} Returns itself to allow for method chaining.
	 * @example
	 * marker.setOffset([0, 1]);
	 */
	setOffset(offset: PointLike): this;
	/**
	 * Adds a CSS class to the marker element.
	 *
	 * @param {string} className Non-empty string with CSS class name to add to marker element.
	 * @returns {Marker} Returns itself to allow for method chaining.
	 *
	 * @example
	 * const marker = new mapboxgl.Marker();
	 * marker.addClassName('some-class');
	 */
	addClassName(className: string): this;
	/**
	 * Removes a CSS class from the marker element.
	 *
	 * @param {string} className Non-empty string with CSS class name to remove from marker element.
	 *
	 * @returns {Marker} Returns itself to allow for method chaining.
	 *
	 * @example
	 * const marker = new mapboxgl.Marker({className: 'some classes'});
	 * marker.removeClassName('some');
	 */
	removeClassName(className: string): this;
	/**
	 * Add or remove the given CSS class on the marker element, depending on whether the element currently has that class.
	 *
	 * @param {string} className Non-empty string with CSS class name to add/remove.
	 *
	 * @returns {boolean} If the class was removed return `false`. If the class was added, then return `true`.
	 *
	 * @example
	 * const marker = new mapboxgl.Marker();
	 * marker.toggleClassName('highlighted');
	 */
	toggleClassName(className: string): boolean;
	_onMove(e: MapMouseEvent | MapTouchEvent): void;
	_onUp(): void;
	_addDragHandler(e: MapMouseEvent | MapTouchEvent): void;
	/**
	 * Sets the `draggable` property and functionality of the marker.
	 *
	 * @param {boolean} [shouldBeDraggable=false] Turns drag functionality on/off.
	 * @returns {Marker} Returns itself to allow for method chaining.
	 * @example
	 * marker.setDraggable(true);
	 */
	setDraggable(shouldBeDraggable: boolean): this;
	/**
	 * Returns true if the marker can be dragged.
	 *
	 * @returns {boolean} True if the marker is draggable.
	 * @example
	 * const isMarkerDraggable = marker.isDraggable();
	 */
	isDraggable(): boolean;
	/**
	 * Sets the `rotation` property of the marker.
	 *
	 * @param {number} [rotation=0] The rotation angle of the marker (clockwise, in degrees), relative to its respective {@link Marker#setRotationAlignment} setting.
	 * @returns {Marker} Returns itself to allow for method chaining.
	 * @example
	 * marker.setRotation(45);
	 */
	setRotation(rotation: number): this;
	/**
	 * Returns the current rotation angle of the marker (in degrees).
	 *
	 * @returns {number} The current rotation angle of the marker.
	 * @example
	 * const rotation = marker.getRotation();
	 */
	getRotation(): number;
	/**
	 * Sets the `rotationAlignment` property of the marker.
	 *
	 * @param {string} [alignment='auto'] Sets the `rotationAlignment` property of the marker.
	 * @returns {Marker} Returns itself to allow for method chaining.
	 * @example
	 * marker.setRotationAlignment('viewport');
	 */
	setRotationAlignment(alignment: string): this;
	/**
	 * Returns the current `rotationAlignment` property of the marker.
	 *
	 * @returns {string} The current rotational alignment of the marker.
	 * @example
	 * const alignment = marker.getRotationAlignment();
	 */
	getRotationAlignment(): string;
	/**
	 * Sets the `pitchAlignment` property of the marker.
	 *
	 * @param {string} [alignment] Sets the `pitchAlignment` property of the marker. If alignment is 'auto', it will automatically match `rotationAlignment`.
	 * @returns {Marker} Returns itself to allow for method chaining.
	 * @example
	 * marker.setPitchAlignment('map');
	 */
	setPitchAlignment(alignment: string): this;
	/**
	 * Returns the current `pitchAlignment` behavior of the marker.
	 *
	 * @returns {string} The current pitch alignment of the marker.
	 * @example
	 * const alignment = marker.getPitchAlignment();
	 */
	getPitchAlignment(): string;
	/**
	 * Sets the `occludedOpacity` property of the marker.
	 * This opacity is used on the marker when the marker is occluded by terrain.
	 *
	 * @param {number} [opacity=0.2] Sets the `occludedOpacity` property of the marker.
	 * @returns {Marker} Returns itself to allow for method chaining.
	 * @example
	 * marker.setOccludedOpacity(0.3);
	 */
	setOccludedOpacity(opacity: number): this;
	/**
	 * Returns the current `occludedOpacity` of the marker.
	 *
	 * @returns {number} The opacity of a terrain occluded marker.
	 * @example
	 * const opacity = marker.getOccludedOpacity();
	 */
	getOccludedOpacity(): number;
}
declare class EasedVariable {
	_start: number;
	_end: number;
	_startTime: number;
	_endTime: number;
	constructor(initialValue: number);
	/**
	 * Evaluate the current value, given a timestamp.
	 *
	 * @param timeStamp {number} Time at which to evaluate.
	 *
	 * @returns {number} Evaluated value.
	 */
	getValue(timeStamp: number): number;
	/**
	 * Check if an ease is in progress.
	 *
	 * @param timeStamp {number} Current time stamp.
	 *
	 * @returns {boolean} Returns `true` if ease is in progress.
	 */
	isEasing(timeStamp: number): boolean;
	/**
	 * Set the value without easing and cancel any in progress ease.
	 *
	 * @param value {number} New value.
	 */
	jumpTo(value: number): void;
	/**
	 * Cancel any in-progress ease and begin a new ease.
	 *
	 * @param value {number} New value to which to ease.
	 * @param timeStamp {number} Current time stamp.
	 * @param duration {number} Ease duration, in same units as timeStamp.
	 */
	easeTo(value: number, timeStamp: number, duration: number): void;
}
declare class ScrollZoomHandler implements Handler {
	_map: Map$1;
	_el: HTMLElement;
	_enabled: boolean;
	_active: boolean;
	_zooming: boolean;
	_aroundCenter: boolean;
	_aroundPoint: Point;
	_aroundCoord: MercatorCoordinate;
	_type: "wheel" | "trackpad" | null;
	_lastValue: number;
	_timeout: number | null | undefined;
	_finishTimeout: number | null | undefined;
	_lastWheelEvent: any;
	_lastWheelEventTime: number;
	_startZoom: number | null | undefined;
	_targetZoom: number | null | undefined;
	_delta: number;
	_lastDelta: number;
	_easing: (arg1: number) => number | null | undefined;
	_prevEase: {
		start: number;
		duration: number;
		easing: (_: number) => number;
	} | null | undefined;
	_frameId: boolean | null | undefined;
	_handler: HandlerManager;
	_defaultZoomRate: number;
	_wheelZoomRate: number;
	_alertContainer: HTMLElement;
	_alertTimer: number;
	/**
	 * @private
	 */
	constructor(map: Map$1, handler: HandlerManager);
	/**
	 * Sets the zoom rate of a trackpad.
	 *
	 * @param {number} [zoomRate=1/100] The rate used to scale trackpad movement to a zoom value.
	 * @example
	 * // Speed up trackpad zoom
	 * map.scrollZoom.setZoomRate(1 / 25);
	 */
	setZoomRate(zoomRate: number): void;
	/**
	* Sets the zoom rate of a mouse wheel.
	 *
	* @param {number} [wheelZoomRate=1/450] The rate used to scale mouse wheel movement to a zoom value.
	* @example
	* // Slow down zoom of mouse wheel
	* map.scrollZoom.setWheelZoomRate(1 / 600);
	*/
	setWheelZoomRate(wheelZoomRate: number): void;
	/**
	 * Returns a Boolean indicating whether the "scroll to zoom" interaction is enabled.
	 *
	 * @returns {boolean} `true` if the "scroll to zoom" interaction is enabled.
	 * @example
	 * const isScrollZoomEnabled = map.scrollZoom.isEnabled();
	 */
	isEnabled(): boolean;
	isActive(): boolean;
	isZooming(): boolean;
	/**
	 * Enables the "scroll to zoom" interaction.
	 *
	 * @param {Object} [options] Options object.
	 * @param {string} [options.around] If "center" is passed, map will zoom around center of map.
	 *
	 * @example
	 * map.scrollZoom.enable();
	 * @example
	 * map.scrollZoom.enable({around: 'center'});
	 */
	enable(options?: {
		around?: "center";
	} | null): void;
	/**
	 * Disables the "scroll to zoom" interaction.
	 *
	 * @example
	 * map.scrollZoom.disable();
	 */
	disable(): void;
	wheel(e: WheelEvent): void;
	_onTimeout(initialEvent: WheelEvent): void;
	_start(e: WheelEvent): void;
	renderFrame(): HandlerResult | null | undefined;
	_smoothOutEasing(duration: number): (arg1: number) => number;
	blur(): void;
	reset(): void;
	_addScrollZoomBlocker(): void;
	_showBlockerAlert(): void;
}
declare class BoxZoomHandler implements Handler {
	_map: Map$1;
	_el: HTMLElement;
	_container: HTMLElement;
	_enabled: boolean;
	_active: boolean;
	_startPos: Point | null | undefined;
	_lastPos: Point | null | undefined;
	_box: HTMLElement;
	_clickTolerance: number;
	/**
	 * @private
	 */
	constructor(map: Map$1, options: {
		clickTolerance: number;
	});
	/**
	 * Returns a Boolean indicating whether the "box zoom" interaction is enabled.
	 *
	 * @returns {boolean} Returns `true` if the "box zoom" interaction is enabled.
	 * @example
	 * const isBoxZoomEnabled = map.boxZoom.isEnabled();
	 */
	isEnabled(): boolean;
	/**
	 * Returns a Boolean indicating whether the "box zoom" interaction is active (currently being used).
	 *
	 * @returns {boolean} Returns `true` if the "box zoom" interaction is active.
	 * @example
	 * const isBoxZoomActive = map.boxZoom.isActive();
	 */
	isActive(): boolean;
	/**
	 * Enables the "box zoom" interaction.
	 *
	 * @example
	 * map.boxZoom.enable();
	 */
	enable(): void;
	/**
	 * Disables the "box zoom" interaction.
	 *
	 * @example
	 * map.boxZoom.disable();
	 */
	disable(): void;
	mousedown(e: MouseEvent, point: Point): void;
	mousemoveWindow(e: MouseEvent, point: Point): void;
	mouseupWindow(e: MouseEvent, point: Point): HandlerResult | null | undefined;
	keydown(e: KeyboardEvent): void;
	blur(): void;
	reset(): void;
	_fireEvent(type: "boxzoomstart" | "boxzoomcancel", e: MouseEvent | KeyboardEvent): Map$1;
}
declare class TwoTouchHandler implements Handler {
	_enabled: boolean;
	_active: boolean;
	_firstTwoTouches: [
		number,
		number
	] | null | undefined;
	_vector: Point | null | undefined;
	_startVector: Point | null | undefined;
	_aroundCenter: boolean;
	constructor();
	reset(): void;
	_start(points: [
		Point,
		Point
	]): void;
	_move(points: [
		Point,
		Point
	], pinchAround: Point | null | undefined, e: TouchEvent): HandlerResult | null | undefined;
	touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
	touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): HandlerResult | null | undefined;
	touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
	touchcancel(): void;
	enable(options?: {
		around?: "center";
	} | null): void;
	disable(): void;
	isEnabled(): boolean;
	isActive(): boolean;
}
declare class TouchZoomHandler extends TwoTouchHandler {
	_distance: number;
	_startDistance: number;
	reset(): void;
	_start(points: [
		Point,
		Point
	]): void;
	_move(points: [
		Point,
		Point
	], pinchAround?: Point | null): HandlerResult | null | undefined;
}
declare class TouchRotateHandler extends TwoTouchHandler {
	_minDiameter: number;
	reset(): void;
	_start(points: [
		Point,
		Point
	]): void;
	_move(points: [
		Point,
		Point
	], pinchAround?: Point | null): HandlerResult | null | undefined;
	_isBelowThreshold(vector: Point): boolean;
}
declare class TouchPitchHandler extends TwoTouchHandler {
	_valid: boolean | undefined;
	_firstMove: number | null | undefined;
	_lastPoints: [
		Point,
		Point
	] | null | undefined;
	_map: Map$1;
	constructor(map: Map$1);
	reset(): void;
	_start(points: [
		Point,
		Point
	]): void;
	_move(points: [
		Point,
		Point
	], center: Point | null | undefined, e: TouchEvent): HandlerResult | null | undefined;
	gestureBeginsVertically(vectorA: Point, vectorB: Point, timeStamp: number): void | boolean;
}
declare class DragRotateHandler {
	_mouseRotate: MouseRotateHandler;
	_mousePitch: MousePitchHandler;
	_pitchWithRotate: boolean;
	/**
	 * @param {Object} [options]
	 * @param {number} [options.bearingSnap] The threshold, measured in degrees, that determines when the map's
	 *   bearing will snap to north.
	 * @param {bool} [options.pitchWithRotate=true] Control the map pitch in addition to the bearing
	 * @private
	 */
	constructor(options: {
		pitchWithRotate: boolean;
	}, mouseRotate: MouseRotateHandler, mousePitch: MousePitchHandler);
	/**
	 * Enables the "drag to rotate" interaction.
	 *
	 * @example
	 * map.dragRotate.enable();
	 */
	enable(): void;
	/**
	 * Disables the "drag to rotate" interaction.
	 *
	 * @example
	 * map.dragRotate.disable();
	 */
	disable(): void;
	/**
	 * Returns a Boolean indicating whether the "drag to rotate" interaction is enabled.
	 *
	 * @returns {boolean} `true` if the "drag to rotate" interaction is enabled.
	 * @example
	 * const isDragRotateEnabled = map.dragRotate.isEnabled();
	 */
	isEnabled(): boolean;
	/**
	 * Returns a Boolean indicating whether the "drag to rotate" interaction is active (currently being used).
	 *
	 * @returns {boolean} Returns `true` if the "drag to rotate" interaction is active.
	 * @example
	 * const isDragRotateActive = map.dragRotate.isActive();
	 */
	isActive(): boolean;
}
declare class KeyboardHandler implements Handler {
	_enabled: boolean;
	_active: boolean;
	_panStep: number;
	_bearingStep: number;
	_pitchStep: number;
	_rotationDisabled: boolean;
	/**
	* @private
	*/
	constructor();
	blur(): void;
	reset(): void;
	keydown(e: KeyboardEvent): HandlerResult | null | undefined;
	/**
	 * Enables the "keyboard rotate and zoom" interaction.
	 *
	 * @example
	 * map.keyboard.enable();
	 */
	enable(): void;
	/**
	 * Disables the "keyboard rotate and zoom" interaction.
	 *
	 * @example
	 * map.keyboard.disable();
	 */
	disable(): void;
	/**
	 * Returns a Boolean indicating whether the "keyboard rotate and zoom"
	 * interaction is enabled.
	 *
	 * @returns {boolean} `true` if the "keyboard rotate and zoom"
	 * interaction is enabled.
	 * @example
	 * const isKeyboardEnabled = map.keyboard.isEnabled();
	 */
	isEnabled(): boolean;
	/**
	 * Returns true if the handler is enabled and has detected the start of a
	 * zoom/rotate gesture.
	 *
	 * @returns {boolean} `true` if the handler is enabled and has detected the
	 * start of a zoom/rotate gesture.
	 * @example
	 * const isKeyboardActive = map.keyboard.isActive();
	 */
	isActive(): boolean;
	/**
	 * Disables the "keyboard pan/rotate" interaction, leaving the
	 * "keyboard zoom" interaction enabled.
	 *
	 * @example
	 * map.keyboard.disableRotation();
	 */
	disableRotation(): void;
	/**
	 * Enables the "keyboard pan/rotate" interaction.
	 *
	 * @example
	 * map.keyboard.enable();
	 * map.keyboard.enableRotation();
	 */
	enableRotation(): void;
}
declare class ClickZoomHandler implements Handler {
	_enabled: boolean;
	_active: boolean;
	constructor();
	reset(): void;
	blur(): void;
	dblclick(e: MouseEvent, point: Point): HandlerResult;
	enable(): void;
	disable(): void;
	isEnabled(): boolean;
	isActive(): boolean;
}
declare class SingleTapRecognizer {
	numTouches: number;
	centroid: Point | null | undefined;
	startTime: number;
	aborted: boolean;
	touches: Partial<Record<number | string, Point>>;
	constructor(options: {
		numTouches: number;
	});
	reset(): void;
	touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
	touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
	touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): Point | null | undefined;
}
declare class TapRecognizer {
	singleTap: SingleTapRecognizer;
	numTaps: number;
	lastTime: number;
	lastTap: Point | null | undefined;
	count: number;
	constructor(options: {
		numTaps: number;
		numTouches: number;
	});
	reset(): void;
	touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
	touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
	touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): Point | null | undefined;
}
declare class TapZoomHandler implements Handler {
	_enabled: boolean;
	_active: boolean;
	_zoomIn: TapRecognizer;
	_zoomOut: TapRecognizer;
	constructor();
	reset(): void;
	touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
	touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
	touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): HandlerResult | null | undefined;
	touchcancel(): void;
	enable(): void;
	disable(): void;
	isEnabled(): boolean;
	isActive(): boolean;
}
declare class DoubleClickZoomHandler {
	_clickZoom: ClickZoomHandler;
	_tapZoom: TapZoomHandler;
	/**
	 * @private
	*/
	constructor(clickZoom: ClickZoomHandler, TapZoom: TapZoomHandler);
	/**
	 * Enables the "double click to zoom" interaction.
	 *
	 * @example
	 * map.doubleClickZoom.enable();
	 */
	enable(): void;
	/**
	 * Disables the "double click to zoom" interaction.
	 *
	 * @example
	 * map.doubleClickZoom.disable();
	 */
	disable(): void;
	/**
	 * Returns a Boolean indicating whether the "double click to zoom" interaction is enabled.
	 *
	 * @returns {boolean} Returns `true` if the "double click to zoom" interaction is enabled.
	 * @example
	 * const isDoubleClickZoomEnabled = map.doubleClickZoom.isEnabled();
	 */
	isEnabled(): boolean;
	/**
	 * Returns a Boolean indicating whether the "double click to zoom" interaction is active (currently being used).
	 *
	 * @returns {boolean} Returns `true` if the "double click to zoom" interaction is active.
	 * @example
	 * const isDoubleClickZoomActive = map.doubleClickZoom.isActive();
	 */
	isActive(): boolean;
}
declare class TapDragZoomHandler implements Handler {
	_enabled: boolean;
	_active: boolean;
	_swipePoint: Point | null | undefined;
	_swipeTouch: number;
	_tapTime: number;
	_tap: TapRecognizer;
	constructor();
	reset(): void;
	touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
	touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): HandlerResult | null | undefined;
	touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
	touchcancel(): void;
	enable(): void;
	disable(): void;
	isEnabled(): boolean;
	isActive(): boolean;
}
declare class TouchZoomRotateHandler {
	_el: HTMLElement;
	_touchZoom: TouchZoomHandler;
	_touchRotate: TouchRotateHandler;
	_tapDragZoom: TapDragZoomHandler;
	_rotationDisabled: boolean;
	_enabled: boolean;
	/**
	 * @private
	*/
	constructor(el: HTMLElement, touchZoom: TouchZoomHandler, touchRotate: TouchRotateHandler, tapDragZoom: TapDragZoomHandler);
	/**
	 * Enables the "pinch to rotate and zoom" interaction.
	 *
	 * @param {Object} [options] Options object.
	 * @param {string} [options.around] If "center" is passed, map will zoom around the center.
	 *
	 * @example
	 * map.touchZoomRotate.enable();
	 * @example
	 * map.touchZoomRotate.enable({around: 'center'});
	 */
	enable(options?: {
		around?: "center";
	} | null): void;
	/**
	 * Disables the "pinch to rotate and zoom" interaction.
	 *
	 * @example
	 * map.touchZoomRotate.disable();
	 */
	disable(): void;
	/**
	 * Returns a Boolean indicating whether the "pinch to rotate and zoom" interaction is enabled.
	 *
	 * @returns {boolean} `true` if the "pinch to rotate and zoom" interaction is enabled.
	 * @example
	 * const isTouchZoomRotateEnabled = map.touchZoomRotate.isEnabled();
	 */
	isEnabled(): boolean;
	/**
	 * Returns true if the handler is enabled and has detected the start of a zoom/rotate gesture.
	 *
	 * @returns {boolean} `true` if enabled and a zoom/rotate gesture was detected.
	 * @example
	 * const isTouchZoomRotateActive = map.touchZoomRotate.isActive();
	 */
	isActive(): boolean;
	/**
	 * Disables the "pinch to rotate" interaction, leaving the "pinch to zoom"
	 * interaction enabled.
	 *
	 * @example
	 * map.touchZoomRotate.disableRotation();
	 */
	disableRotation(): void;
	/**
	 * Enables the "pinch to rotate" interaction.
	 *
	 * @example
	 * map.touchZoomRotate.enable();
	 * map.touchZoomRotate.enableRotation();
	 */
	enableRotation(): void;
}
declare const defaultLocale: {
	"AttributionControl.ToggleAttribution": string;
	"AttributionControl.MapFeedback": string;
	"FullscreenControl.Enter": string;
	"FullscreenControl.Exit": string;
	"GeolocateControl.FindMyLocation": string;
	"GeolocateControl.LocationNotAvailable": string;
	"LogoControl.Title": string;
	"Map.Title": string;
	"NavigationControl.ResetBearing": string;
	"NavigationControl.ZoomIn": string;
	"NavigationControl.ZoomOut": string;
	"ScrollZoomBlocker.CtrlMessage": string;
	"ScrollZoomBlocker.CmdMessage": string;
	"TouchPanBlocker.Message": string;
};
export type ControlPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export interface IControl {
	readonly onAdd: (map: Map$1) => HTMLElement;
	readonly onRemove: (map: Map$1) => void;
	readonly getDefaultPosition?: () => ControlPosition;
	readonly _setLanguage?: (language?: string | string[]) => void;
}
type SetStyleOptions = {
	diff?: boolean;
	config?: {
		[key: string]: ConfigSpecification;
	};
	localFontFamily: StyleOptions["localFontFamily"];
	localIdeographFontFamily: StyleOptions["localIdeographFontFamily"];
};
type Listener$1<T extends MapEventType> = (event: MapEventOf<T>) => void;
type DelegatedListener = {
	layers: Set<string>;
	listener: Listener$1<MapEventType>;
	delegates: {
		[T in MapEventType]?: Listener$1<T>;
	};
};
export type MapOptions = {
	style?: StyleSpecification | string;
	config?: {
		[key: string]: ConfigSpecification;
	};
	hash?: boolean | string;
	interactive?: boolean;
	container: HTMLElement | string;
	bearingSnap?: number;
	clickTolerance?: number;
	pitchWithRotate?: boolean;
	attributionControl?: boolean;
	customAttribution?: string | Array<string>;
	logoPosition?: ControlPosition;
	failIfMajorPerformanceCaveat?: boolean;
	preserveDrawingBuffer?: boolean;
	antialias?: boolean;
	refreshExpiredTiles?: boolean;
	bounds?: LngLatBoundsLike;
	maxBounds?: LngLatBoundsLike;
	fitBoundsOptions?: EasingOptions;
	scrollZoom?: boolean;
	minZoom?: number;
	maxZoom?: number;
	minPitch?: number;
	maxPitch?: number;
	boxZoom?: boolean;
	dragRotate?: boolean;
	dragPan?: boolean | DragPanOptions;
	keyboard?: boolean;
	doubleClickZoom?: boolean;
	touchZoomRotate?: boolean;
	touchPitch?: boolean;
	cooperativeGestures?: boolean;
	trackResize?: boolean;
	center?: LngLatLike;
	zoom?: number;
	bearing?: number;
	pitch?: number;
	projection?: ProjectionSpecification | string;
	renderWorldCopies?: boolean;
	minTileCacheSize?: number;
	maxTileCacheSize?: number;
	transformRequest?: RequestTransformFunction;
	accessToken?: string;
	testMode?: boolean;
	locale?: Partial<typeof defaultLocale>;
	language?: string;
	worldview?: string;
	crossSourceCollisions?: boolean;
	collectResourceTiming?: boolean;
	respectPrefersReducedMotion?: boolean;
	contextCreateOptions?: ContextOptions;
	devtools?: boolean;
	repaint?: boolean;
	fadeDuration?: number;
	localFontFamily?: string;
	localIdeographFontFamily?: string;
	performanceMetricsCollection?: boolean;
	tessellationStep?: number;
};
/**
 * The `Map` object represents the map on your page. It exposes methods
 * and properties that enable you to programmatically change the map,
 * and fires events as users interact with it.
 *
 * You create a `Map` by specifying a `container` and other options.
 * Then Mapbox GL JS initializes the map on the page and returns your `Map`
 * object.
 *
 * @extends Evented
 * @param {Object} options
 * @param {HTMLElement|string} options.container The HTML element in which Mapbox GL JS will render the map, or the element's string `id`. The specified element must have no children.
 * @param {number} [options.minZoom=0] The minimum zoom level of the map (0-24).
 * @param {number} [options.maxZoom=22] The maximum zoom level of the map (0-24).
 * @param {number} [options.minPitch=0] The minimum pitch of the map (0-85).
 * @param {number} [options.maxPitch=85] The maximum pitch of the map (0-85).
 * @param {Object | string} [options.style='mapbox://styles/mapbox/standard'] The map's Mapbox style. This must be an a JSON object conforming to
 * the schema described in the [Mapbox Style Specification](https://mapbox.com/mapbox-gl-style-spec/), or a URL
 * to such JSON. Can accept a null value to allow adding a style manually.
 *
 * To load a style from the Mapbox API, you can use a URL of the form `mapbox://styles/:owner/:style`,
 * where `:owner` is your Mapbox account name and `:style` is the style ID. You can also use a
 * [Mapbox-owned style](https://docs.mapbox.com/api/maps/styles/#mapbox-styles):
 *
 * * `mapbox://styles/mapbox/standard`
 * * `mapbox://styles/mapbox/streets-v12`
 * * `mapbox://styles/mapbox/outdoors-v12`
 * * `mapbox://styles/mapbox/light-v11`
 * * `mapbox://styles/mapbox/dark-v11`
 * * `mapbox://styles/mapbox/satellite-v9`
 * * `mapbox://styles/mapbox/satellite-streets-v12`
 * * `mapbox://styles/mapbox/navigation-day-v1`
 * * `mapbox://styles/mapbox/navigation-night-v1`.
 *
 * Tilesets hosted with Mapbox can be style-optimized if you append `?optimize=true` to the end of your style URL, like `mapbox://styles/mapbox/streets-v11?optimize=true`.
 * Learn more about style-optimized vector tiles in our [API documentation](https://www.mapbox.com/api-documentation/maps/#retrieve-tiles).
 *
 * @param {Object} [options.config=null] The initial configuration options for the style fragments. Each key in the object is a fragment ID (e.g., `basemap`) and each value is a configuration object.
 * @example
 * const map = new mapboxgl.Map({
 *     container: 'map',
 *     center: [-122.420679, 37.772537],
 *     zoom: 13,
 *     style: 'mapbox://styles/mapbox/standard',
 *     config: {
 *         // Initial configuration for the Mapbox Standard style set above. By default, its ID is `basemap`.
 *         basemap: {
 *             // Here, we're setting the light preset to `night`.
 *             lightPreset: 'night'
 *         }
 *     }
 * });
 * @param {(boolean|string)} [options.hash=false] If `true`, the map's [position](https://docs.mapbox.com/help/glossary/camera) (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.
 * For example, `http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60`.
 * An additional string may optionally be provided to indicate a parameter-styled hash,
 * for example http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar, where `foo`
 * is a custom parameter and `bar` is an arbitrary hash distinct from the map hash.
 * @param {boolean} [options.interactive=true] If `false`, no mouse, touch, or keyboard listeners will be attached to the map, so it will not respond to interaction.
 * @param {number} [options.bearingSnap=7] The threshold, measured in degrees, that determines when the map's
 * bearing will snap to north. For example, with a `bearingSnap` of 7, if the user rotates
 * the map within 7 degrees of north, the map will automatically snap to exact north.
 * @param {boolean} [options.pitchWithRotate=true] If `false`, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled.
 * @param {number} [options.clickTolerance=3] The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag).
 * @param {boolean} [options.attributionControl=true] If `true`, an {@link AttributionControl} will be added to the map.
 * @param {string | Array<string>} [options.customAttribution=null] String or strings to show in an {@link AttributionControl}. Only applicable if `options.attributionControl` is `true`.
 * @param {string} [options.logoPosition='bottom-left'] A string representing the position of the Mapbox wordmark on the map. Valid options are `top-left`,`top-right`, `bottom-left`, `bottom-right`.
 * @param {boolean} [options.failIfMajorPerformanceCaveat=false] If `true`, map creation will fail if the performance of Mapbox GL JS would be dramatically worse than expected (a software renderer would be used).
 * @param {boolean} [options.preserveDrawingBuffer=false] If `true`, the map's canvas can be exported to a PNG using `map.getCanvas().toDataURL()`. This is `false` by default as a performance optimization.
 * @param {boolean} [options.antialias=false] If `true`, the gl context will be created with [MSAA antialiasing](https://en.wikipedia.org/wiki/Multisample_anti-aliasing), which can be useful for antialiasing custom layers. This is `false` by default as a performance optimization.
 * @param {boolean} [options.refreshExpiredTiles=true] If `false`, the map won't attempt to re-request tiles once they expire per their HTTP `cacheControl`/`expires` headers.
 * @param {LngLatBoundsLike} [options.maxBounds=null] If set, the map will be constrained to the given bounds.
 * @param {boolean|Object} [options.scrollZoom=true] If `true`, the "scroll to zoom" interaction is enabled. An `Object` value is passed as options to {@link ScrollZoomHandler#enable}.
 * @param {boolean} [options.boxZoom=true] If `true`, the "box zoom" interaction is enabled (see {@link BoxZoomHandler}).
 * @param {boolean} [options.dragRotate=true] If `true`, the "drag to rotate" interaction is enabled (see {@link DragRotateHandler}).
 * @param {boolean | Object} [options.dragPan=true] If `true`, the "drag to pan" interaction is enabled. An `Object` value is passed as options to {@link DragPanHandler#enable}.
 * @param {boolean} [options.keyboard=true] If `true`, keyboard shortcuts are enabled (see {@link KeyboardHandler}).
 * @param {boolean} [options.doubleClickZoom=true] If `true`, the "double click to zoom" interaction is enabled (see {@link DoubleClickZoomHandler}).
 * @param {boolean | Object} [options.touchZoomRotate=true] If `true`, the "pinch to rotate and zoom" interaction is enabled. An `Object` value is passed as options to {@link TouchZoomRotateHandler#enable}.
 * @param {boolean | Object} [options.touchPitch=true] If `true`, the "drag to pitch" interaction is enabled. An `Object` value is passed as options to {@link TouchPitchHandler}.
 * @param {boolean} [options.cooperativeGestures] If `true`, scroll zoom will require pressing the ctrl or ⌘ key while scrolling to zoom map, and touch pan will require using two fingers while panning to move the map. Touch pitch will require three fingers to activate if enabled.
 * @param {boolean} [options.trackResize=true] If `true`, the map will automatically resize when the browser window resizes.
 * @param {boolean} [options.performanceMetricsCollection=true] If `true`, mapbox-gl will collect and send performance metrics.
 * @param {LngLatLike} [options.center=[0, 0]] The initial geographical [centerpoint](https://docs.mapbox.com/help/glossary/camera#center) of the map. If `center` is not specified in the constructor options, Mapbox GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `[0, 0]` Note: Mapbox GL uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON.
 * @param {number} [options.zoom=0] The initial [zoom](https://docs.mapbox.com/help/glossary/camera#zoom) level of the map. If `zoom` is not specified in the constructor options, Mapbox GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.
 * @param {number} [options.bearing=0] The initial [bearing](https://docs.mapbox.com/help/glossary/camera#bearing) (rotation) of the map, measured in degrees counter-clockwise from north. If `bearing` is not specified in the constructor options, Mapbox GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.
 * @param {number} [options.pitch=0] The initial [pitch](https://docs.mapbox.com/help/glossary/camera#pitch) (tilt) of the map, measured in degrees away from the plane of the screen (0-85). If `pitch` is not specified in the constructor options, Mapbox GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.
 * @param {LngLatBoundsLike} [options.bounds=null] The initial bounds of the map. If `bounds` is specified, it overrides `center` and `zoom` constructor options.
 * @param {Object} [options.fitBoundsOptions=null] A {@link Map#fitBounds} options object to use _only_ when fitting the initial `bounds` provided above.
 * @param {'auto' | string | string[]} [options.language=null] A string with a BCP 47 language tag, or an array of such strings representing the desired languages used for the map's labels and UI components. Languages can only be set on Mapbox vector tile sources.
 * By default, GL JS will not set a language so that the language of Mapbox tiles will be determined by the vector tile source's TileJSON.
 * Valid language strings must be a [BCP-47 language code](https://en.wikipedia.org/wiki/IETF_language_tag#List_of_subtags). Unsupported BCP-47 codes will not include any translations. Invalid codes will result in an recoverable error.
 * If a label has no translation for the selected language, it will display in the label's local language.
 * If option is set to `auto`, GL JS will select a user's preferred language as determined by the browser's [`window.navigator.language`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language) property.
 * If the `locale` property is not set separately, this language will also be used to localize the UI for supported languages.
 * @param {string} [options.worldview=null] Sets the map's worldview. A worldview determines the way that certain disputed boundaries
 * are rendered. By default, GL JS will not set a worldview so that the worldview of Mapbox tiles will be determined by the vector tile source's TileJSON.
 * Valid worldview strings must be an [ISO alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes). Unsupported
 * ISO alpha-2 codes will fall back to the TileJSON's default worldview. Invalid codes will result in a recoverable error.
 * @param {boolean} [options.renderWorldCopies=true] If `true`, multiple copies of the world will be rendered side by side beyond -180 and 180 degrees longitude. If set to `false`:
 * - When the map is zoomed out far enough that a single representation of the world does not fill the map's entire
 * container, there will be blank space beyond 180 and -180 degrees longitude.
 * - Features that cross 180 and -180 degrees longitude will be cut in two (with one portion on the right edge of the
 * map and the other on the left edge of the map) at every zoom level.
 * @param {number} [options.minTileCacheSize=null] The minimum number of tiles stored in the tile cache for a given source. Larger viewports use more tiles and need larger caches. Larger viewports are more likely to be found on devices with more memory and on pages where the map is more important. If omitted, the cache will be dynamically sized based on the current viewport.
 * @param {number} [options.maxTileCacheSize=null] The maximum number of tiles stored in the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport.
 * @param {string} [options.localIdeographFontFamily='sans-serif'] Defines a CSS font-family for locally overriding generation of glyphs in the 'CJK Unified Ideographs', 'Hiragana', 'Katakana', 'Hangul Syllables' and 'CJK Symbols and Punctuation' ranges.
 * In these ranges, font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
 * Set to `false`, to enable font settings from the map's style for these glyph ranges. Note that [Mapbox Studio](https://studio.mapbox.com/) sets this value to `false` by default.
 * The purpose of this option is to avoid bandwidth-intensive glyph server requests. For an example of this option in use, see [Use locally generated ideographs](https://www.mapbox.com/mapbox-gl-js/example/local-ideographs).
 * @param {string} [options.localFontFamily=null] Defines a CSS
 * font-family for locally overriding generation of all glyphs. Font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
 * If set, this option overrides the setting in localIdeographFontFamily.
 * @param {RequestTransformFunction} [options.transformRequest=null] A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.
 * Expected to return a {@link RequestParameters} object with a `url` property and optionally `headers` and `credentials` properties.
 * @param {boolean} [options.collectResourceTiming=false] If `true`, Resource Timing API information will be collected for requests made by GeoJSON and Vector Tile web workers (this information is normally inaccessible from the main Javascript thread). Information will be returned in a `resourceTiming` property of relevant `data` events.
 * @param {number} [options.fadeDuration=300] Controls the duration of the fade-in/fade-out animation for label collisions, in milliseconds. This setting affects all symbol layers. This setting does not affect the duration of runtime styling transitions or raster tile cross-fading.
 * @param {boolean} [options.respectPrefersReducedMotion=true] If set to `true`, the map will respect the user's `prefers-reduced-motion` browser setting and apply a reduced motion mode, minimizing animations and transitions. When set to `false`, the map will always ignore the `prefers-reduced-motion` settings, regardless of the user's preference, making all animations essential.
 * @param {boolean} [options.crossSourceCollisions=true] If `true`, symbols from multiple sources can collide with each other during collision detection. If `false`, collision detection is run separately for the symbols in each source.
 * @param {string} [options.accessToken=null] If specified, map will use this [token](https://docs.mapbox.com/help/glossary/access-token/) instead of the one defined in `mapboxgl.accessToken`.
 * @param {Object} [options.locale=null] A patch to apply to the default localization table for UI strings such as control tooltips. The `locale` object maps namespaced UI string IDs to translated strings in the target language;
 * see [`src/ui/default_locale.js`](https://github.com/mapbox/mapbox-gl-js/blob/main/src/ui/default_locale.js) for an example with all supported string IDs. The object may specify all UI strings (thereby adding support for a new translation) or only a subset of strings (thereby patching the default translation table).
 * @param {boolean} [options.testMode=false] Silences errors and warnings generated due to an invalid accessToken, useful when using the library to write unit tests.
 * @param {ProjectionSpecification} [options.projection='mercator'] The [projection](https://docs.mapbox.com/mapbox-gl-js/style-spec/projection/) the map should be rendered in.
 * Supported projections are:
 * * [Albers](https://en.wikipedia.org/wiki/Albers_projection) equal-area conic projection as `albers`
 * * [Equal Earth](https://en.wikipedia.org/wiki/Equal_Earth_projection) equal-area pseudocylindrical projection as `equalEarth`
 * * [Equirectangular](https://en.wikipedia.org/wiki/Equirectangular_projection) (Plate Carrée/WGS84) as `equirectangular`
 * * 3d Globe as `globe`
 * * [Lambert Conformal Conic](https://en.wikipedia.org/wiki/Lambert_conformal_conic_projection) as `lambertConformalConic`
 * * [Mercator](https://en.wikipedia.org/wiki/Mercator_projection) cylindrical map projection as `mercator`
 * * [Natural Earth](https://en.wikipedia.org/wiki/Natural_Earth_projection) pseudocylindrical map projection as `naturalEarth`
 * * [Winkel Tripel](https://en.wikipedia.org/wiki/Winkel_tripel_projection) azimuthal map projection as `winkelTripel`
 * Conic projections such as Albers and Lambert have configurable `center` and `parallels` properties that allow developers to define the region in which the projection has minimal distortion; see the example for how to configure these properties.
 * @example
 * const map = new mapboxgl.Map({
 *     container: 'map', // container ID
 *     center: [-122.420679, 37.772537], // starting position [lng, lat]
 *     zoom: 13, // starting zoom
 *     style: 'mapbox://styles/mapbox/streets-v11', // style URL or style object
 *     hash: true, // sync `center`, `zoom`, `pitch`, and `bearing` with URL
 *     // Use `transformRequest` to modify requests that begin with `http://myHost`.
 *     transformRequest: (url, resourceType) => {
 *         if (resourceType === 'Source' && url.startsWith('http://myHost')) {
 *             return {
 *                 url: url.replace('http', 'https'),
 *                 headers: {'my-custom-header': true},
 *                 credentials: 'include'  // Include cookies for cross-origin requests
 *             };
 *         }
 *     }
 * });
 * @see [Example: Display a map on a webpage](https://docs.mapbox.com/mapbox-gl-js/example/simple-map/)
 * @see [Example: Display a map with a custom style](https://docs.mapbox.com/mapbox-gl-js/example/custom-style-id/)
 * @see [Example: Check if Mapbox GL JS is supported](https://docs.mapbox.com/mapbox-gl-js/example/check-for-support/)
 */
declare class Map$1 extends Camera {
	style: Style$1;
	painter: Painter;
	handlers: HandlerManager | null | undefined;
	_container: HTMLElement;
	_missingCSSCanary: HTMLElement;
	_canvasContainer: HTMLElement;
	_controlContainer: HTMLElement;
	_controlPositions: {
		[_: string]: HTMLElement;
	};
	_interactive: boolean | null | undefined;
	_showTileBoundaries: boolean | null | undefined;
	_showParseStatus: boolean | null | undefined;
	_showTerrainWireframe: boolean | null | undefined;
	_showLayers2DWireframe: boolean | null | undefined;
	_showLayers3DWireframe: boolean | null | undefined;
	_showQueryGeometry: boolean | null | undefined;
	_showCollisionBoxes: boolean | null | undefined;
	_showPadding: boolean | null | undefined;
	_showTileAABBs: boolean | null | undefined;
	_showOverdrawInspector: boolean;
	_repaint: boolean | null | undefined;
	_vertices: boolean | null | undefined;
	_canvas: HTMLCanvasElement;
	_minTileCacheSize: number | null | undefined;
	_maxTileCacheSize: number | null | undefined;
	_frame: Cancelable | null | undefined;
	_renderNextFrame: boolean | null | undefined;
	_styleDirty: boolean | null | undefined;
	_sourcesDirty: boolean | null | undefined;
	_placementDirty: boolean | null | undefined;
	_occlusionOpacityChanged: boolean | null | undefined;
	_loaded: boolean;
	_fullyLoaded: boolean;
	_trackResize: boolean;
	_preserveDrawingBuffer: boolean;
	_failIfMajorPerformanceCaveat: boolean;
	_antialias: boolean;
	_refreshExpiredTiles: boolean;
	_hash: Hash;
	_delegatedListeners: {
		[type: string]: DelegatedListener[];
	};
	_fullscreenchangeEvent: "fullscreenchange" | "webkitfullscreenchange";
	_isInitialLoad: boolean;
	_shouldCheckAccess: boolean;
	_fadeDuration: number;
	_crossSourceCollisions: boolean;
	_collectResourceTiming: boolean;
	_renderTaskQueue: TaskQueue;
	_domRenderTaskQueue: TaskQueue;
	_controls: Array<IControl>;
	_markers: Array<Marker>;
	_popups: Array<Popup>;
	_logoControl: IControl;
	_mapId: number;
	_localIdeographFontFamily: string;
	_localFontFamily: string | null | undefined;
	_requestManager: RequestManager;
	_locale: Partial<typeof defaultLocale>;
	_removed: boolean;
	_speedIndexTiming: boolean;
	_clickTolerance: number;
	_cooperativeGestures: boolean;
	_silenceAuthErrors: boolean;
	_averageElevationLastSampledAt: number;
	_averageElevationExaggeration: number;
	_averageElevation: EasedVariable;
	_containerWidth: number;
	_containerHeight: number;
	_language: string | null | undefined | string[];
	_worldview: string | null | undefined;
	_interactionRange: [
		number,
		number
	];
	_visibilityHidden: number;
	_performanceMetricsCollection: boolean;
	_tessellationStep: number | null | undefined;
	_useExplicitProjection: boolean;
	/** @section {Interaction handlers} */
	/**
	 * The map's {@link ScrollZoomHandler}, which implements zooming in and out with a scroll wheel or trackpad.
	 * Find more details and examples using `scrollZoom` in the {@link ScrollZoomHandler} section.
	 */
	scrollZoom: ScrollZoomHandler;
	/**
	 * The map's {@link BoxZoomHandler}, which implements zooming using a drag gesture with the Shift key pressed.
	 * Find more details and examples using `boxZoom` in the {@link BoxZoomHandler} section.
	 */
	boxZoom: BoxZoomHandler;
	/**
	 * The map's {@link DragRotateHandler}, which implements rotating the map while dragging with the right
	 * mouse button or with the Control key pressed. Find more details and examples using `dragRotate`
	 * in the {@link DragRotateHandler} section.
	 */
	dragRotate: DragRotateHandler;
	/**
	 * The map's {@link DragPanHandler}, which implements dragging the map with a mouse or touch gesture.
	 * Find more details and examples using `dragPan` in the {@link DragPanHandler} section.
	 */
	dragPan: DragPanHandler;
	/**
	 * The map's {@link KeyboardHandler}, which allows the user to zoom, rotate, and pan the map using keyboard
	 * shortcuts. Find more details and examples using `keyboard` in the {@link KeyboardHandler} section.
	 */
	keyboard: KeyboardHandler;
	/**
	 * The map's {@link DoubleClickZoomHandler}, which allows the user to zoom by double clicking.
	 * Find more details and examples using `doubleClickZoom` in the {@link DoubleClickZoomHandler} section.
	 */
	doubleClickZoom: DoubleClickZoomHandler;
	/**
	 * The map's {@link TouchZoomRotateHandler}, which allows the user to zoom or rotate the map with touch gestures.
	 * Find more details and examples using `touchZoomRotate` in the {@link TouchZoomRotateHandler} section.
	 */
	touchZoomRotate: TouchZoomRotateHandler;
	/**
	 * The map's {@link TouchPitchHandler}, which allows the user to pitch the map with touch gestures.
	 * Find more details and examples using `touchPitch` in the {@link TouchPitchHandler} section.
	 */
	touchPitch: TouchPitchHandler;
	_contextCreateOptions: ContextOptions;
	_tp: ITrackedParameters;
	_frameId: number;
	_lastDirtyFrameId: number;
	constructor(options: MapOptions);
	_getMapId(): number;
	/** @section {Controls} */
	/**
	 * Adds an {@link IControl} to the map, calling `control.onAdd(this)`.
	 *
	 * @param {IControl} control The {@link IControl} to add.
	 * @param {string} [position] Position on the map to which the control will be added.
	 * Valid values are `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`. Defaults to `'top-right'`.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // Add zoom and rotation controls to the map.
	 * map.addControl(new mapboxgl.NavigationControl());
	 * @see [Example: Display map navigation controls](https://www.mapbox.com/mapbox-gl-js/example/navigation/)
	 */
	addControl(control: IControl, position?: ControlPosition): this;
	/**
	 * Removes the control from the map.
	 *
	 * @param {IControl} control The {@link IControl} to remove.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // Define a new navigation control.
	 * const navigation = new mapboxgl.NavigationControl();
	 * // Add zoom and rotation controls to the map.
	 * map.addControl(navigation);
	 * // Remove zoom and rotation controls from the map.
	 * map.removeControl(navigation);
	 */
	removeControl(control: IControl): this;
	/**
	 * Checks if a control is on the map.
	 *
	 * @param {IControl} control The {@link IControl} to check.
	 * @returns {boolean} True if map contains control.
	 * @example
	 * // Define a new navigation control.
	 * const navigation = new mapboxgl.NavigationControl();
	 * // Add zoom and rotation controls to the map.
	 * map.addControl(navigation);
	 * // Check that the navigation control exists on the map.
	 * const added = map.hasControl(navigation);
	 * // added === true
	 */
	hasControl(control: IControl): boolean;
	/**
	 * Returns the map's containing HTML element.
	 *
	 * @returns {HTMLElement} The map's container.
	 * @example
	 * const container = map.getContainer();
	 */
	getContainer(): HTMLElement;
	/**
	 * Returns the HTML element containing the map's `<canvas>` element.
	 *
	 * If you want to add non-GL overlays to the map, you should append them to this element.
	 *
	 * This is the element to which event bindings for map interactivity (such as panning and zooming) are
	 * attached. It will receive bubbled events from child elements such as the `<canvas>`, but not from
	 * map controls.
	 *
	 * @returns {HTMLElement} The container of the map's `<canvas>`.
	 * @example
	 * const canvasContainer = map.getCanvasContainer();
	 * @see [Example: Create a draggable point](https://www.mapbox.com/mapbox-gl-js/example/drag-a-point/)
	 * @see [Example: Highlight features within a bounding box](https://www.mapbox.com/mapbox-gl-js/example/using-box-queryrenderedfeatures/)
	 */
	getCanvasContainer(): HTMLElement;
	/**
	 * Returns the map's `<canvas>` element.
	 *
	 * @returns {HTMLCanvasElement} The map's `<canvas>` element.
	 * @example
	 * const canvas = map.getCanvas();
	 * @see [Example: Measure distances](https://www.mapbox.com/mapbox-gl-js/example/measure/)
	 * @see [Example: Display a popup on hover](https://www.mapbox.com/mapbox-gl-js/example/popup-on-hover/)
	 * @see [Example: Center the map on a clicked symbol](https://www.mapbox.com/mapbox-gl-js/example/center-on-symbol/)
	 */
	getCanvas(): HTMLCanvasElement;
	/** @section {Map constraints} */
	/**
	 * Resizes the map according to the dimensions of its
	 * `container` element.
	 *
	 * Checks if the map container size changed and updates the map if it has changed.
	 * This method must be called after the map's `container` is resized programmatically
	 * or when the map is shown after being initially hidden with CSS.
	 *
	 * @param {Object | null} eventData Additional properties to be passed to `movestart`, `move`, `resize`, and `moveend`
	 * events that get triggered as a result of resize. This can be useful for differentiating the
	 * source of an event (for example, user-initiated or programmatically-triggered events).
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // Resize the map when the map container is shown
	 * // after being initially hidden with CSS.
	 * const mapDiv = document.getElementById('map');
	 * if (mapDiv.style.visibility === true) map.resize();
	 */
	resize(eventData?: object): this;
	/**
	 * Returns the map's geographical bounds. When the bearing or pitch is non-zero, the visible region is not
	 * an axis-aligned rectangle, and the result is the smallest bounds that encompasses the visible region.
	 * If a padding is set on the map, the bounds returned are for the inset.
	 * With globe projection, the smallest bounds encompassing the visible region
	 * may not precisely represent the visible region due to the earth's curvature.
	 *
	 * @returns {LngLatBounds} The geographical bounds of the map as {@link LngLatBounds}.
	 * @example
	 * const bounds = map.getBounds();
	 */
	getBounds(): LngLatBounds | null;
	/**
	 * Returns the maximum geographical bounds the map is constrained to, or `null` if none set.
	 *
	 * @returns {Map} The map object.
	 *
	 * @example
	 * const maxBounds = map.getMaxBounds();
	 */
	getMaxBounds(): LngLatBounds | null;
	/**
	 * Sets or clears the map's geographical bounds.
	 *
	 * Pan and zoom operations are constrained within these bounds.
	 * If a pan or zoom is performed that would
	 * display regions outside these bounds, the map will
	 * instead display a position and zoom level
	 * as close as possible to the operation's request while still
	 * remaining within the bounds.
	 *
	 * For `mercator` projection, the viewport will be constrained to the bounds.
	 * For other projections such as `globe`, only the map center will be constrained.
	 *
	 * @param {LngLatBoundsLike | null | undefined} bounds The maximum bounds to set. If `null` or `undefined` is provided, the function removes the map's maximum bounds.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // Define bounds that conform to the `LngLatBoundsLike` object.
	 * const bounds = [
	 *     [-74.04728, 40.68392], // [west, south]
	 *     [-73.91058, 40.87764]  // [east, north]
	 * ];
	 * // Set the map's max bounds.
	 * map.setMaxBounds(bounds);
	 */
	setMaxBounds(bounds: LngLatBoundsLike): this;
	/**
	 * Sets or clears the map's minimum zoom level.
	 * If the map's current zoom level is lower than the new minimum,
	 * the map will zoom to the new minimum.
	 *
	 * It is not always possible to zoom out and reach the set `minZoom`.
	 * Other factors such as map height may restrict zooming. For example,
	 * if the map is 512px tall it will not be possible to zoom below zoom 0
	 * no matter what the `minZoom` is set to.
	 *
	 * @param {number | null | undefined} minZoom The minimum zoom level to set (-2 - 24).
	 * If `null` or `undefined` is provided, the function removes the current minimum zoom and it will be reset to -2.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setMinZoom(12.25);
	 */
	setMinZoom(minZoom?: number | null): this;
	/**
	 * Returns the map's minimum allowable zoom level.
	 *
	 * @returns {number} Returns `minZoom`.
	 * @example
	 * const minZoom = map.getMinZoom();
	 */
	getMinZoom(): number;
	/**
	 * Sets or clears the map's maximum zoom level.
	 * If the map's current zoom level is higher than the new maximum,
	 * the map will zoom to the new maximum.
	 *
	 * @param {number | null | undefined} maxZoom The maximum zoom level to set.
	 * If `null` or `undefined` is provided, the function removes the current maximum zoom (sets it to 22).
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setMaxZoom(18.75);
	 */
	setMaxZoom(maxZoom?: number | null): this;
	/**
	 * Returns the map's maximum allowable zoom level.
	 *
	 * @returns {number} Returns `maxZoom`.
	 * @example
	 * const maxZoom = map.getMaxZoom();
	 */
	getMaxZoom(): number;
	/**
	 * Sets or clears the map's minimum pitch.
	 * If the map's current pitch is lower than the new minimum,
	 * the map will pitch to the new minimum.
	 *
	 * @param {number | null | undefined} minPitch The minimum pitch to set (0-85). If `null` or `undefined` is provided, the function removes the current minimum pitch and resets it to 0.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setMinPitch(5);
	 */
	setMinPitch(minPitch?: number | null): this;
	/**
	 * Returns the map's minimum allowable pitch.
	 *
	 * @returns {number} Returns `minPitch`.
	 * @example
	 * const minPitch = map.getMinPitch();
	 */
	getMinPitch(): number;
	/**
	 * Sets or clears the map's maximum pitch.
	 * If the map's current pitch is higher than the new maximum,
	 * the map will pitch to the new maximum.
	 *
	 * @param {number | null | undefined} maxPitch The maximum pitch to set.
	 * If `null` or `undefined` is provided, the function removes the current maximum pitch (sets it to 85).
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setMaxPitch(70);
	 */
	setMaxPitch(maxPitch?: number | null): this;
	/**
	 * Returns the map's maximum allowable pitch.
	 *
	 * @returns {number} Returns `maxPitch`.
	 * @example
	 * const maxPitch = map.getMaxPitch();
	 */
	getMaxPitch(): number;
	/**
	 * Returns the state of `renderWorldCopies`. If `true`, multiple copies of the world will be rendered side by side beyond -180 and 180 degrees longitude. If set to `false`:
	 * - When the map is zoomed out far enough that a single representation of the world does not fill the map's entire
	 * container, there will be blank space beyond 180 and -180 degrees longitude.
	 * - Features that cross 180 and -180 degrees longitude will be cut in two (with one portion on the right edge of the
	 * map and the other on the left edge of the map) at every zoom level.
	 *
	 * @returns {boolean} Returns `renderWorldCopies` boolean.
	 * @example
	 * const worldCopiesRendered = map.getRenderWorldCopies();
	 * @see [Example: Render world copies](https://docs.mapbox.com/mapbox-gl-js/example/render-world-copies/)
	 */
	getRenderWorldCopies(): boolean;
	/**
	 * Sets the state of `renderWorldCopies`.
	 *
	 * @param {boolean} renderWorldCopies If `true`, multiple copies of the world will be rendered side by side beyond -180 and 180 degrees longitude. If set to `false`:
	 * - When the map is zoomed out far enough that a single representation of the world does not fill the map's entire
	 * container, there will be blank space beyond 180 and -180 degrees longitude.
	 * - Features that cross 180 and -180 degrees longitude will be cut in two (with one portion on the right edge of the
	 * map and the other on the left edge of the map) at every zoom level.
	 *
	 * `undefined` is treated as `true`, `null` is treated as `false`.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setRenderWorldCopies(true);
	 * @see [Example: Render world copies](https://docs.mapbox.com/mapbox-gl-js/example/render-world-copies/)
	 */
	setRenderWorldCopies(renderWorldCopies?: boolean | null): this;
	/**
	 * Returns the map's language, which is used for translating map labels and UI components.
	 *
	 * @private
	 * @returns {undefined | string | string[]} Returns the map's language code.
	 * @example
	 * const language = map.getLanguage();
	 */
	getLanguage(): string | null | undefined | string[];
	_parseLanguage(language?: "auto" | string | null | undefined | string[]): string | null | undefined | string[];
	/**
	 * Sets the map's language, which is used for translating map labels and UI components.
	 *
	 * @private
	 * @param {'auto' | string | string[]} [language] A string representing the desired language used for the map's labels and UI components. Languages can only be set on Mapbox vector tile sources.
	 *  Valid language strings must be a [BCP-47 language code](https://en.wikipedia.org/wiki/IETF_language_tag#List_of_subtags). Unsupported BCP-47 codes will not include any translations. Invalid codes will result in an recoverable error.
	 *  If a label has no translation for the selected language, it will display in the label's local language.
	 *  If param is set to `auto`, GL JS will select a user's preferred language as determined by the browser's [`window.navigator.language`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language) property.
	 *  If the `locale` property is not set separately, this language will also be used to localize the UI for supported languages.
	 *  If param is set to `undefined` or `null`, it will remove the current map language and reset the language used for translating map labels and UI components.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setLanguage('es');
	 *
	 * @example
	 * map.setLanguage(['en-GB', 'en-US']);
	 *
	 * @example
	 * map.setLanguage('auto');
	 *
	 * @example
	 * map.setLanguage();
	 */
	setLanguage(language?: "auto" | string | null | undefined | string[]): this;
	/**
	 * Returns the code for the map's worldview.
	 *
	 * @private
	 * @returns {string} Returns the map's worldview code.
	 * @example
	 * const worldview = map.getWorldview();
	 */
	getWorldview(): string | null | undefined;
	/**
	 * Sets the map's worldview.
	 *
	 * @private
	 * @param {string} [worldview] A string representing the desired worldview.
	 *  A worldview determines the way that certain disputed boundaries are rendered.
	 *  Valid worldview strings must be an [ISO alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes).
	 *  Unsupported ISO alpha-2 codes will fall back to the TileJSON's default worldview. Invalid codes will result in a recoverable error.
	 *  If param is set to `undefined` or `null`, it will cause the map to fall back to the TileJSON's default worldview.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setWorldView('JP');
	 *
	 * @example
	 * map.setWorldView();
	 */
	setWorldview(worldview?: string | null): this;
	/** @section {Point conversion} */
	/**
	 * Returns a [projection](https://docs.mapbox.com/mapbox-gl-js/style-spec/projection/) object that defines the current map projection.
	 *
	 * @returns {ProjectionSpecification} The [projection](https://docs.mapbox.com/mapbox-gl-js/style-spec/projection/) defining the current map projection.
	 * @example
	 * const projection = map.getProjection();
	 */
	getProjection(): ProjectionSpecification;
	/**
	 * Returns true if map [projection](https://docs.mapbox.com/mapbox-gl-js/style-spec/projection/) has been set to globe AND the map is at a low enough zoom level that globe view is enabled.
	 * @private
	 * @returns {boolean} Returns `globe-is-active` boolean.
	 * @example
	 * if (map._showingGlobe()) {
	 *     // do globe things here
	 * }
	 */
	_showingGlobe(): boolean;
	/**
	 * Sets the map's projection. If called with `null` or `undefined`, the map will reset to Mercator.
	 *
	 * @param {ProjectionSpecification | string | null | undefined} projection The projection that the map should be rendered in.
	 * This can be a [projection](https://docs.mapbox.com/mapbox-gl-js/style-spec/projection/) object or a string of the projection's name.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setProjection('albers');
	 * map.setProjection({
	 *     name: 'albers',
	 *     center: [35, 55],
	 *     parallels: [20, 60]
	 * });
	 * @see [Example: Display a web map using an alternate projection](https://docs.mapbox.com/mapbox-gl-js/example/map-projection/)
	 * @see [Example: Use different map projections for web maps](https://docs.mapbox.com/mapbox-gl-js/example/projections/)
	 */
	setProjection(projection?: ProjectionSpecification | null | undefined | string): this;
	_updateProjectionTransition(): void;
	_prioritizeAndUpdateProjection(explicitProjection?: ProjectionSpecification | null, styleProjection?: ProjectionSpecification | null): this;
	_updateProjection(projection: ProjectionSpecification): this;
	/**
	 * Returns a {@link Point} representing pixel coordinates, relative to the map's `container`,
	 * that correspond to the specified geographical location.
	 *
	 * When the map is pitched and `lnglat` is completely behind the camera, there are no pixel
	 * coordinates corresponding to that location. In that case,
	 * the `x` and `y` components of the returned {@link Point} are set to Number.MAX_VALUE.
	 *
	 * @param {LngLatLike} lnglat The geographical location to project.
	 * @returns {Point} The {@link Point} corresponding to `lnglat`, relative to the map's `container`.
	 * @example
	 * const coordinate = [-122.420679, 37.772537];
	 * const point = map.project(coordinate);
	 */
	project(lnglat: LngLatLike): Point;
	/**
	 * Returns a {@link LngLat} representing geographical coordinates that correspond
	 * to the specified pixel coordinates. If horizon is visible, and specified pixel is
	 * above horizon, returns a {@link LngLat} corresponding to point on horizon, nearest
	 * to the point.
	 *
	 * @param {PointLike} point The pixel coordinates to unproject.
	 * @returns {LngLat} The {@link LngLat} corresponding to `point`.
	 * @example
	 * map.on('click', (e) => {
	 *     // When the map is clicked, get the geographic coordinate.
	 *     const coordinate = map.unproject(e.point);
	 * });
	 */
	unproject(point: PointLike): LngLat;
	/** @section {Movement state} */
	/**
	 * Returns true if the map is panning, zooming, rotating, or pitching due to a camera animation or user gesture.
	 *
	 * @returns {boolean} True if the map is moving.
	 * @example
	 * const isMoving = map.isMoving();
	 */
	isMoving(): boolean;
	/**
	 * Returns true if the map is zooming due to a camera animation or user gesture.
	 *
	 * @returns {boolean} True if the map is zooming.
	 * @example
	 * const isZooming = map.isZooming();
	 */
	isZooming(): boolean;
	/**
	 * Returns true if the map is rotating due to a camera animation or user gesture.
	 *
	 * @returns {boolean} True if the map is rotating.
	 * @example
	 * map.isRotating();
	 */
	isRotating(): boolean;
	_isDragging(): boolean;
	_createDelegatedListener<T extends MapEventType>(type: T, layers: Array<string>, listener: Listener$1<T>): DelegatedListener;
	/** @section {Working with events} */
	/**
	 * Adds a listener for events of a specified type,
	 * optionally limited to features in a specified style layer.
	 *
	 * @param {string} type The event type to listen for. Events compatible with the optional `layerId` parameter are triggered
	 * when the cursor enters a visible portion of the specified layer from outside that layer or outside the map canvas.
	 *
	 * | Event                                                     | Compatible with `layerId` |
	 * |-----------------------------------------------------------|---------------------------|
	 * | [`mousedown`](#map.event:mousedown)                       | yes                       |
	 * | [`mouseup`](#map.event:mouseup)                           | yes                       |
	 * | [`mouseover`](#map.event:mouseover)                       | yes                       |
	 * | [`mouseout`](#map.event:mouseout)                         | yes                       |
	 * | [`mousemove`](#map.event:mousemove)                       | yes                       |
	 * | [`mouseenter`](#map.event:mouseenter)                     | yes (required)            |
	 * | [`mouseleave`](#map.event:mouseleave)                     | yes (required)            |
	 * | [`preclick`](#map.event:preclick)                         |                           |
	 * | [`click`](#map.event:click)                               | yes                       |
	 * | [`dblclick`](#map.event:dblclick)                         | yes                       |
	 * | [`contextmenu`](#map.event:contextmenu)                   | yes                       |
	 * | [`touchstart`](#map.event:touchstart)                     | yes                       |
	 * | [`touchend`](#map.event:touchend)                         | yes                       |
	 * | [`touchcancel`](#map.event:touchcancel)                   | yes                       |
	 * | [`wheel`](#map.event:wheel)                               |                           |
	 * | [`resize`](#map.event:resize)                             |                           |
	 * | [`remove`](#map.event:remove)                             |                           |
	 * | [`touchmove`](#map.event:touchmove)                       |                           |
	 * | [`movestart`](#map.event:movestart)                       |                           |
	 * | [`move`](#map.event:move)                                 |                           |
	 * | [`moveend`](#map.event:moveend)                           |                           |
	 * | [`dragstart`](#map.event:dragstart)                       |                           |
	 * | [`drag`](#map.event:drag)                                 |                           |
	 * | [`dragend`](#map.event:dragend)                           |                           |
	 * | [`zoomstart`](#map.event:zoomstart)                       |                           |
	 * | [`zoom`](#map.event:zoom)                                 |                           |
	 * | [`zoomend`](#map.event:zoomend)                           |                           |
	 * | [`rotatestart`](#map.event:rotatestart)                   |                           |
	 * | [`rotate`](#map.event:rotate)                             |                           |
	 * | [`rotateend`](#map.event:rotateend)                       |                           |
	 * | [`pitchstart`](#map.event:pitchstart)                     |                           |
	 * | [`pitch`](#map.event:pitch)                               |                           |
	 * | [`pitchend`](#map.event:pitchend)                         |                           |
	 * | [`boxzoomstart`](#map.event:boxzoomstart)                 |                           |
	 * | [`boxzoomend`](#map.event:boxzoomend)                     |                           |
	 * | [`boxzoomcancel`](#map.event:boxzoomcancel)               |                           |
	 * | [`webglcontextlost`](#map.event:webglcontextlost)         |                           |
	 * | [`webglcontextrestored`](#map.event:webglcontextrestored) |                           |
	 * | [`load`](#map.event:load)                                 |                           |
	 * | [`render`](#map.event:render)                             |                           |
	 * | [`idle`](#map.event:idle)                                 |                           |
	 * | [`error`](#map.event:error)                               |                           |
	 * | [`data`](#map.event:data)                                 |                           |
	 * | [`styledata`](#map.event:styledata)                       |                           |
	 * | [`sourcedata`](#map.event:sourcedata)                     |                           |
	 * | [`dataloading`](#map.event:dataloading)                   |                           |
	 * | [`styledataloading`](#map.event:styledataloading)         |                           |
	 * | [`sourcedataloading`](#map.event:sourcedataloading)       |                           |
	 * | [`styleimagemissing`](#map.event:styleimagemissing)       |                           |
	 * | [`style.load`](#map.event:style.load)                     |                           |
	 *
	 * @param {string | Array<string>} layerIds (optional) The ID(s) of a style layer(s). If you provide a `layerId`,
	 * the listener will be triggered only if its location is within a visible feature in these layers,
	 * and the event will have a `features` property containing an array of the matching features.
	 * If you do not provide `layerIds`, the listener will be triggered by a corresponding event
	 * happening anywhere on the map, and the event will not have a `features` property.
	 * Note that many event types are not compatible with the optional `layerIds` parameter.
	 * @param {Function} listener The function to be called when the event is fired.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // Set an event listener that will fire
	 * // when the map has finished loading.
	 * map.on('load', () => {
	 *     // Add a new layer.
	 *     map.addLayer({
	 *         id: 'points-of-interest',
	 *         source: {
	 *             type: 'vector',
	 *             url: 'mapbox://mapbox.mapbox-streets-v8'
	 *         },
	 *         'source-layer': 'poi_label',
	 *         type: 'circle',
	 *         paint: {
	 *             // Mapbox Style Specification paint properties
	 *         },
	 *         layout: {
	 *             // Mapbox Style Specification layout properties
	 *         }
	 *     });
	 * });
	 * @example
	 * // Set an event listener that will fire
	 * // when a feature on the countries layer of the map is clicked.
	 * map.on('click', 'countries', (e) => {
	 *     new mapboxgl.Popup()
	 *         .setLngLat(e.lngLat)
	 *         .setHTML(`Country name: ${e.features[0].properties.name}`)
	 *         .addTo(map);
	 * });
	 * @example
	 * // Set an event listener that will fire
	 * // when a feature on the countries or background layers of the map is clicked.
	 * map.on('click', ['countries', 'background'], (e) => {
	 *     new mapboxgl.Popup()
	 *         .setLngLat(e.lngLat)
	 *         .setHTML(`Country name: ${e.features[0].properties.name}`)
	 *         .addTo(map);
	 * });
	 * @see [Example: Add 3D terrain to a map](https://docs.mapbox.com/mapbox-gl-js/example/add-terrain/)
	 * @see [Example: Center the map on a clicked symbol](https://docs.mapbox.com/mapbox-gl-js/example/center-on-symbol/)
	 * @see [Example: Create a draggable marker](https://docs.mapbox.com/mapbox-gl-js/example/drag-a-point/)
	 * @see [Example: Create a hover effect](https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/)
	 * @see [Example: Display popup on click](https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/)
	 */
	on<T extends MapEventType>(type: T, listener: Listener$1<T>): this;
	on<T extends MapEventType>(type: T, layerIds: string | string[], listener: Listener$1<T>): this;
	/**
	 * Adds a listener that will be called only once to a specified event type,
	 * optionally limited to events occurring on features in a specified style layer.
	 *
	 * @param {string} type The event type to listen for; one of `'mousedown'`, `'mouseup'`, `'preclick'`, `'click'`, `'dblclick'`,
	 * `'mousemove'`, `'mouseenter'`, `'mouseleave'`, `'mouseover'`, `'mouseout'`, `'contextmenu'`, `'touchstart'`,
	 * `'touchend'`, or `'touchcancel'`. `mouseenter` and `mouseover` events are triggered when the cursor enters
	 * a visible portion of the specified layer from outside that layer or outside the map canvas. `mouseleave`
	 * and `mouseout` events are triggered when the cursor leaves a visible portion of the specified layer, or leaves
	 * the map canvas.
	 * @param {string | Array<string>} layerIds (optional) The ID(s) of a style layer(s). If you provide `layerIds`,
	 * the listener will be triggered only if its location is within a visible feature in these layers,
	 * and the event will have a `features` property containing an array of the matching features.
	 * If you do not provide `layerIds`, the listener will be triggered by a corresponding event
	 * happening anywhere on the map, and the event will not have a `features` property.
	 * Note that many event types are not compatible with the optional `layerIds` parameter.
	 * @param {Function} listener The function to be called when the event is fired.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // Log the coordinates of a user's first map touch.
	 * map.once('touchstart', (e) => {
	 *     console.log(`The first map touch was at: ${e.lnglat}`);
	 * });
	 * @example
	 * // Log the coordinates of a user's first map touch
	 * // on a specific layer.
	 * map.once('touchstart', 'my-point-layer', (e) => {
	 *     console.log(`The first map touch on the point layer was at: ${e.lnglat}`);
	 * });
	 * @example
	 * // Log the coordinates of a user's first map touch
	 * // on specific layers.
	 * map.once('touchstart', ['my-point-layer', 'my-point-layer-2'], (e) => {
	 *     console.log(`The first map touch on the point layer was at: ${e.lnglat}`);
	 * });
	 * @see [Example: Create a draggable point](https://docs.mapbox.com/mapbox-gl-js/example/drag-a-point/)
	 * @see [Example: Animate the camera around a point with 3D terrain](https://docs.mapbox.com/mapbox-gl-js/example/free-camera-point/)
	 * @see [Example: Play map locations as a slideshow](https://docs.mapbox.com/mapbox-gl-js/example/playback-locations/)
	 */
	once<T extends MapEventType>(type: T): Promise<MapEventOf<T>>;
	once<T extends MapEventType>(type: T, listener: Listener$1<T>): this;
	once<T extends MapEventType>(type: T, layerIds: string | string[]): Promise<MapEventOf<T>>;
	once<T extends MapEventType>(type: T, layerIds: string | string[], listener: Listener$1<T>): this;
	/**
	 * Removes an event listener previously added with {@link Map#on},
	 * optionally limited to layer-specific events.
	 *
	 * @param {string} type The event type previously used to install the listener.
	 * @param {string | Array<string>} layerIds (optional) The layer ID(s) previously used to install the listener.
	 * @param {Function} listener The function previously installed as a listener.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * // Create a function to print coordinates while a mouse is moving.
	 * function onMove(e) {
	 *     console.log(`The mouse is moving: ${e.lngLat}`);
	 * }
	 * // Create a function to unbind the `mousemove` event.
	 * function onUp(e) {
	 *     console.log(`The final coordinates are: ${e.lngLat}`);
	 *     map.off('mousemove', onMove);
	 * }
	 * // When a click occurs, bind both functions to mouse events.
	 * map.on('mousedown', (e) => {
	 *     map.on('mousemove', onMove);
	 *     map.once('mouseup', onUp);
	 * });
	 * @see [Example: Create a draggable point](https://docs.mapbox.com/mapbox-gl-js/example/drag-a-point/)
	 */
	off<T extends MapEventType>(type: T, listener: Listener$1<T>): this;
	off<T extends MapEventType>(type: T, layerIds: string | string[], listener: Listener$1<T>): this;
	/** @section {Querying features} */
	/**
	 * Returns an array of [GeoJSON](http://geojson.org/)
	 * [Feature objects](https://tools.ietf.org/html/rfc7946#section-3.2)
	 * representing visible features that satisfy the query parameters.
	 *
	 * @param {PointLike|Array<PointLike>} [geometry] - The geometry of the query region in pixels:
	 * either a single point or bottom left and top right points describing a bounding box, where the origin is at the top left.
	 * Omitting this parameter (by calling {@link Map#queryRenderedFeatures} with zero arguments,
	 * or with only an `options` argument) is equivalent to passing a bounding box encompassing the entire
	 * map viewport.
	 * Only values within the existing viewport are supported.
	 * @param {Object} [options] Options object.
	 * @param {Array<string>} [options.layers] An array of [style layer IDs](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layer-id) for the query to inspect.
	 * Only features within these layers will be returned. If this parameter is undefined, all layers will be checked.
	 * @param {Array} [options.filter] A [filter](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#filter)
	 * to limit query results.
	 * @param {boolean} [options.validate=true] Whether to check if the [options.filter] conforms to the Mapbox GL Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
	 *
	 * @returns {Array<Object>} An array of [GeoJSON](http://geojson.org/)
	 * [feature objects](https://tools.ietf.org/html/rfc7946#section-3.2).
	 *
	 * The `properties` value of each returned feature object contains the properties of its source feature. For GeoJSON sources, only
	 * string and numeric property values are supported. `null`, `Array`, and `Object` values are not supported.
	 *
	 * Each feature includes top-level `layer`, `source`, and `sourceLayer` properties. The `layer` property is an object
	 * representing the style layer to  which the feature belongs. Layout and paint properties in this object contain values
	 * which are fully evaluated for the given zoom level and feature.
	 *
	 * Only features that are currently rendered are included. Some features will **not** be included, like:
	 *
	 * - Features from layers whose `visibility` property is `"none"`.
	 * - Features from layers whose zoom range excludes the current zoom level.
	 * - Symbol features that have been hidden due to text or icon collision.
	 *
	 * Features from all other layers are included, including features that may have no visible
	 * contribution to the rendered result; for example, because the layer's opacity or color alpha component is set to 0.
	 *
	 * The topmost rendered feature appears first in the returned array, and subsequent features are sorted by
	 * descending z-order. Features that are rendered multiple times (due to wrapping across the antimeridian at low
	 * zoom levels) are returned only once (though subject to the following caveat).
	 *
	 * Because features come from tiled vector data or GeoJSON data that is converted to tiles internally, feature
	 * geometries may be split or duplicated across tile boundaries and, as a result, features may appear multiple
	 * times in query results. For example, suppose there is a highway running through the bounding rectangle of a query.
	 * The results of the query will be those parts of the highway that lie within the map tiles covering the bounding
	 * rectangle, even if the highway extends into other tiles, and the portion of the highway within each map tile
	 * will be returned as a separate feature. Similarly, a point feature near a tile boundary may appear in multiple
	 * tiles due to tile buffering.
	 *
	 * @example
	 * // Find all features at a point
	 * const features = map.queryRenderedFeatures(
	 *   [20, 35],
	 *   {layers: ['my-layer-name']}
	 * );
	 *
	 * @example
	 * // Find all features within a static bounding box
	 * const features = map.queryRenderedFeatures(
	 *   [[10, 20], [30, 50]],
	 *   {layers: ['my-layer-name']}
	 * );
	 *
	 * @example
	 * // Find all features within a bounding box around a point
	 * const width = 10;
	 * const height = 20;
	 * const features = map.queryRenderedFeatures([
	 *     [point.x - width / 2, point.y - height / 2],
	 *     [point.x + width / 2, point.y + height / 2]
	 * ], {layers: ['my-layer-name']});
	 *
	 * @example
	 * // Query all rendered features from a single layer
	 * const features = map.queryRenderedFeatures({layers: ['my-layer-name']});
	 * @see [Example: Get features under the mouse pointer](https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/)
	 * @see [Example: Highlight features within a bounding box](https://www.mapbox.com/mapbox-gl-js/example/using-box-queryrenderedfeatures/)
	 * @see [Example: Filter features within map view](https://www.mapbox.com/mapbox-gl-js/example/filter-features-within-map-view/)
	 */
	queryRenderedFeatures(geometry?: PointLike | [
		PointLike,
		PointLike
	], options?: Pick<QueryRenderedFeaturesParams, "layers" | "filter" | "validate">): Array<GeoJSONFeature>;
	/**
	 * Returns an array of [GeoJSON](http://geojson.org/)
	 * [Feature objects](https://tools.ietf.org/html/rfc7946#section-3.2)
	 * representing features within the specified vector tile or GeoJSON source that satisfy the query parameters.
	 *
	 * @param {string} sourceId The ID of the vector tile or GeoJSON source to query.
	 * @param {Object} [parameters] Options object.
	 * @param {string} [parameters.sourceLayer] The name of the [source layer](https://docs.mapbox.com/help/glossary/source-layer/)
	 * to query. *For vector tile sources, this parameter is required.* For GeoJSON sources, it is ignored.
	 * @param {Array} [parameters.filter] A [filter](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#filter)
	 * to limit query results.
	 * @param {boolean} [parameters.validate=true] Whether to check if the [parameters.filter] conforms to the Mapbox GL Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
	 *
	 * @returns {Array<Object>} An array of [GeoJSON](http://geojson.org/)
	 * [Feature objects](https://tools.ietf.org/html/rfc7946#section-3.2).
	 *
	 * In contrast to {@link Map#queryRenderedFeatures}, this function returns all features matching the query parameters,
	 * whether or not they are rendered by the current style (in other words, are visible). The domain of the query includes all currently-loaded
	 * vector tiles and GeoJSON source tiles: this function does not check tiles outside the currently
	 * visible viewport.
	 *
	 * Because features come from tiled vector data or GeoJSON data that is converted to tiles internally, feature
	 * geometries may be split or duplicated across tile boundaries and, as a result, features may appear multiple
	 * times in query results. For example, suppose there is a highway running through the bounding rectangle of a query.
	 * The results of the query will be those parts of the highway that lie within the map tiles covering the bounding
	 * rectangle, even if the highway extends into other tiles, and the portion of the highway within each map tile
	 * will be returned as a separate feature. Similarly, a point feature near a tile boundary may appear in multiple
	 * tiles due to tile buffering.
	 *
	 * @example
	 * // Find all features in one source layer in a vector source
	 * const features = map.querySourceFeatures('your-source-id', {
	 *     sourceLayer: 'your-source-layer'
	 * });
	 *
	 * @see [Example: Highlight features containing similar data](https://www.mapbox.com/mapbox-gl-js/example/query-similar-features/)
	 */
	querySourceFeatures(sourceId: string, parameters?: {
		sourceLayer?: string;
		filter?: FilterSpecification | ExpressionSpecification;
		validate?: boolean;
	}): Array<GeoJSONFeature>;
	/**
	 * Determines if the given point is located on a visible map surface.
	 *
	 * @param {PointLike} point - The point to be checked, specified as an array of two numbers representing the x and y coordinates, or as a {@link https://docs.mapbox.com/mapbox-gl-js/api/geography/#point|Point} object.
	 * @returns {boolean} Returns `true` if the point is on the visible map surface, otherwise returns `false`.
	 * @example
	 * const pointOnSurface = map.isPointOnSurface([100, 200]);
	 */
	isPointOnSurface(point: PointLike): boolean;
	/** @section {Working with styles} */
	/**
	 * Updates the map's Mapbox style object with a new value.
	 *
	 * If a style is already set when this is used and the `diff` option is set to `true`, the map renderer will attempt to compare the given style
	 * against the map's current state and perform only the changes necessary to make the map style match the desired state. Changes in sprites
	 * (images used for icons and patterns) and glyphs (fonts for label text) **cannot** be diffed. If the sprites or fonts used in the current
	 * style and the given style are different in any way, the map renderer will force a full update, removing the current style and building
	 * the given one from scratch.
	 *
	 * @param {Object | string| null} style A JSON object conforming to the schema described in the
	 * [Mapbox Style Specification](https://mapbox.com/mapbox-gl-style-spec/), or a URL to such JSON.
	 * @param {Object} [options] Options object.
	 * @param {boolean} [options.diff=true] If false, force a 'full' update, removing the current style
	 * and building the given one instead of attempting a diff-based update.
	 * @param {string} [options.localIdeographFontFamily='sans-serif'] Defines a CSS
	 * font-family for locally overriding generation of glyphs in the 'CJK Unified Ideographs', 'Hiragana', 'Katakana' and 'Hangul Syllables' ranges.
	 * In these ranges, font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
	 * Set to `false`, to enable font settings from the map's style for these glyph ranges.
	 * Forces a full update.
	 * @param {Object} [options.config=null] The initial configuration options for the style fragments.
	 * Each key in the object is a fragment ID (e.g., `basemap`) and each value is a configuration object.
	 * @returns {Map} Returns itself to allow for method chaining.
	 *
	 * @example
	 * map.setStyle("mapbox://styles/mapbox/streets-v11");
	 *
	 * @see [Example: Change a map's style](https://www.mapbox.com/mapbox-gl-js/example/setstyle/)
	 *
	 * @example
	 * map.setStyle("mapbox://styles/mapbox/standard", {
	 *     "config": {
	 *         "basemap": {
	 *             "lightPreset": "night"
	 *         }
	 *     }
	 * });
	 */
	setStyle(style: StyleSpecification | string | null, options?: SetStyleOptions): this;
	_getUIString(key: string): string;
	_updateStyle(style?: StyleSpecification | string, options?: SetStyleOptions): this;
	_lazyInitEmptyStyle(): void;
	/**
	 * Returns the map's Mapbox [style](https://docs.mapbox.com/help/glossary/style/) object, a JSON object which can be used to recreate the map's style.
	 *
	 * For the Mapbox Standard style or any "fragment" style (which is a style with `fragment: true`
	 * or a `schema` property defined), this method returns an empty style with no layers or sources.
	 * The original style is wrapped into an import with the ID `basemap` as a fragment style and is not intended
	 * to be used directly. This design ensures that user logic is not tied to style internals, allowing Mapbox
	 * to roll out style updates seamlessly and consistently.
	 *
	 * @returns {Object} The map's style JSON object.
	 *
	 * @example
	 * map.on('load', () => {
	 *     const styleJson = map.getStyle();
	 * });
	 */
	getStyle(): StyleSpecification | null | undefined;
	/**
	 * Returns a Boolean indicating whether the map's style is fully loaded.
	 *
	 * @returns {boolean} A Boolean indicating whether the style is fully loaded.
	 *
	 * @example
	 * const styleLoadStatus = map.isStyleLoaded();
	 */
	isStyleLoaded(): boolean;
	_isValidId(id?: string | null): boolean;
	/** @section {Sources} */
	/**
	 * Adds a source to the map's style.
	 *
	 * @param {string} id The ID of the source to add. Must not conflict with existing sources.
	 * @param {Object} source The source object, conforming to the
	 * Mapbox Style Specification's [source definition](https://www.mapbox.com/mapbox-gl-style-spec/#sources) or
	 * {@link CanvasSourceOptions}.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.addSource('my-data', {
	 *     type: 'vector',
	 *     url: 'mapbox://myusername.tilesetid'
	 * });
	 * @example
	 * map.addSource('my-data', {
	 *     "type": "geojson",
	 *     "data": {
	 *         "type": "Feature",
	 *         "geometry": {
	 *             "type": "Point",
	 *             "coordinates": [-77.0323, 38.9131]
	 *         },
	 *         "properties": {
	 *             "title": "Mapbox DC",
	 *             "marker-symbol": "monument"
	 *         }
	 *     }
	 * });
	 * @see Example: Vector source: [Show and hide layers](https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/)
	 * @see Example: GeoJSON source: [Add live realtime data](https://docs.mapbox.com/mapbox-gl-js/example/live-geojson/)
	 * @see Example: Raster DEM source: [Add hillshading](https://docs.mapbox.com/mapbox-gl-js/example/hillshade/)
	 */
	addSource(id: string, source: SourceSpecification): this;
	/**
	 * Returns a Boolean indicating whether the source is loaded. Returns `true` if the source with
	 * the given ID in the map's style has no outstanding network requests, otherwise `false`.
	 *
	 * @param {string} id The ID of the source to be checked.
	 * @returns {boolean} A Boolean indicating whether the source is loaded.
	 * @example
	 * const sourceLoaded = map.isSourceLoaded('bathymetry-data');
	 */
	isSourceLoaded(id: string): boolean;
	/**
	 * Returns a Boolean indicating whether all tiles in the viewport from all sources on
	 * the style are loaded.
	 *
	 * @returns {boolean} A Boolean indicating whether all tiles are loaded.
	 * @example
	 * const tilesLoaded = map.areTilesLoaded();
	 */
	areTilesLoaded(): boolean;
	/**
	 * Adds a [custom source type](#Custom Sources), making it available for use with
	 * {@link Map#addSource}.
	 * @private
	 * @param {string} name The name of the source type; source definition objects use this name in the `{type: ...}` field.
	 * @param {Function} SourceType A {@link Source} constructor.
	 * @param {Function} callback Called when the source type is ready or with an error argument if there is an error.
	 */
	addSourceType(name: string, SourceType: SourceClass, callback: Callback<void>): void;
	/**
	 * Removes a source from the map's style.
	 *
	 * @param {string} id The ID of the source to remove.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.removeSource('bathymetry-data');
	 */
	removeSource(id: string): this;
	/**
	 * Returns the source with the specified ID in the map's style.
	 *
	 * This method is often used to update a source using the instance members for the relevant
	 * source type as defined in [Sources](#sources).
	 * For example, setting the `data` for a GeoJSON source or updating the `url` and `coordinates`
	 * of an image source.
	 *
	 * @param {string} id The ID of the source to get.
	 * @returns {?Object} The style source with the specified ID or `undefined` if the ID
	 * corresponds to no existing sources.
	 * The shape of the object varies by source type.
	 * A list of options for each source type is available on the Mapbox Style Specification's
	 * [Sources](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/) page.
	 * @example
	 * const sourceObject = map.getSource('points');
	 * @see [Example: Create a draggable point](https://docs.mapbox.com/mapbox-gl-js/example/drag-a-point/)
	 * @see [Example: Animate a point](https://docs.mapbox.com/mapbox-gl-js/example/animate-point-along-line/)
	 * @see [Example: Add live realtime data](https://docs.mapbox.com/mapbox-gl-js/example/live-geojson/)
	 */
	getSource<T extends Source>(id: string): T | undefined;
	/** @section {Images} */
	/**
	 * Add an image to the style. This image can be displayed on the map like any other icon in the style's
	 * [sprite](https://docs.mapbox.com/mapbox-gl-js/style-spec/sprite/) using the image's ID with
	 * [`icon-image`](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layout-symbol-icon-image),
	 * [`background-pattern`](https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-background-background-pattern),
	 * [`fill-pattern`](https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-fill-fill-pattern),
	 * or [`line-pattern`](https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-line-line-pattern).
	 * A {@link Map.event:error} event will be fired if there is not enough space in the sprite to add this image.
	 *
	 * @param {string} id The ID of the image.
	 * @param {HTMLImageElement | ImageBitmap | ImageData | {width: number, height: number, data: (Uint8Array | Uint8ClampedArray)} | StyleImageInterface} image The image as an `HTMLImageElement`, `ImageData`, `ImageBitmap` or object with `width`, `height`, and `data`
	 * properties with the same format as `ImageData`.
	 * @param {Object | null} options Options object.
	 * @param {number} options.pixelRatio The ratio of pixels in the image to physical pixels on the screen.
	 * @param {boolean} options.sdf Whether the image should be interpreted as an SDF image.
	 * @param {[number, number, number, number]} options.content `[x1, y1, x2, y2]`  If `icon-text-fit` is used in a layer with this image, this option defines the part of the image that can be covered by the content in `text-field`.
	 * @param {Array<[number, number]>} options.stretchX `[[x1, x2], ...]` If `icon-text-fit` is used in a layer with this image, this option defines the part(s) of the image that can be stretched horizontally.
	 * @param {Array<[number, number]>} options.stretchY `[[y1, y2], ...]` If `icon-text-fit` is used in a layer with this image, this option defines the part(s) of the image that can be stretched vertically.
	 *
	 * @example
	 * // If the style's sprite does not already contain an image with ID 'cat',
	 * // add the image 'cat-icon.png' to the style's sprite with the ID 'cat'.
	 * map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', (error, image) => {
	 *     if (error) throw error;
	 *     if (!map.hasImage('cat')) map.addImage('cat', image);
	 * });
	 *
	 * // Add a stretchable image that can be used with `icon-text-fit`
	 * // In this example, the image is 600px wide by 400px high.
	 * map.loadImage('https://upload.wikimedia.org/wikipedia/commons/8/89/Black_and_White_Boxed_%28bordered%29.png', (error, image) => {
	 *     if (error) throw error;
	 *     if (!map.hasImage('border-image')) {
	 *         map.addImage('border-image', image, {
	 *             content: [16, 16, 300, 384], // place text over left half of image, avoiding the 16px border
	 *             stretchX: [[16, 584]], // stretch everything horizontally except the 16px border
	 *             stretchY: [[16, 384]], // stretch everything vertically except the 16px border
	 *         });
	 *     }
	 * });
	 *
	 *
	 * @see Example: Use `HTMLImageElement`: [Add an icon to the map](https://www.mapbox.com/mapbox-gl-js/example/add-image/)
	 * @see Example: Use `ImageData`: [Add a generated icon to the map](https://www.mapbox.com/mapbox-gl-js/example/add-image-generated/)
	 */
	addImage(id: string, image: HTMLImageElement | ImageBitmap | ImageData | StyleImageInterface | {
		width: number;
		height: number;
		data: Uint8Array | Uint8ClampedArray;
	}, { pixelRatio, sdf, stretchX, stretchY, content, }?: Partial<StyleImageMetadata>): void;
	/**
	 * Update an existing image in a style. This image can be displayed on the map like any other icon in the style's
	 * [sprite](https://docs.mapbox.com/help/glossary/sprite/) using the image's ID with
	 * [`icon-image`](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layout-symbol-icon-image),
	 * [`background-pattern`](https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-background-background-pattern),
	 * [`fill-pattern`](https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-fill-fill-pattern),
	 * or [`line-pattern`](https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-line-line-pattern).
	 *
	 * @param {string} id The ID of the image.
	 * @param {HTMLImageElement | ImageBitmap | ImageData | StyleImageInterface} image The image as an `HTMLImageElement`, [`ImageData`](https://developer.mozilla.org/en-US/docs/Web/API/ImageData), [`ImageBitmap`](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap) or object with `width`, `height`, and `data`
	 * properties with the same format as `ImageData`.
	 *
	 * @example
	* // Load an image from an external URL.
	 * map.loadImage('http://placekitten.com/50/50', (error, image) => {
	 *     if (error) throw error;
	 *     // If an image with the ID 'cat' already exists in the style's sprite,
	 *     // replace that image with a new image, 'other-cat-icon.png'.
	 *     if (map.hasImage('cat')) map.updateImage('cat', image);
	 * });
	 */
	updateImage(id: string, image: HTMLImageElement | ImageBitmap | ImageData | {
		width: number;
		height: number;
		data: Uint8Array | Uint8ClampedArray;
	} | StyleImageInterface): void;
	/**
	 * Check whether or not an image with a specific ID exists in the style. This checks both images
	 * in the style's original [sprite](https://docs.mapbox.com/help/glossary/sprite/) and any images
	 * that have been added at runtime using {@link Map#addImage}.
	 *
	 * @param {string} id The ID of the image.
	 *
	 * @returns {boolean} A Boolean indicating whether the image exists.
	 * @example
	 * // Check if an image with the ID 'cat' exists in
	 * // the style's sprite.
	 * const catIconExists = map.hasImage('cat');
	 */
	hasImage(id: string): boolean;
	/**
	 * Remove an image from a style. This can be an image from the style's original
	 * [sprite](https://docs.mapbox.com/help/glossary/sprite/) or any images
	 * that have been added at runtime using {@link Map#addImage}.
	 *
	 * @param {string} id The ID of the image.
	 *
	 * @example
	 * // If an image with the ID 'cat' exists in
	 * // the style's sprite, remove it.
	 * if (map.hasImage('cat')) map.removeImage('cat');
	 */
	removeImage(id: string): void;
	/**
	 * Load an image from an external URL to be used with {@link Map#addImage}. External
	 * domains must support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).
	 *
	 * @param {string} url The URL of the image file. Image file must be in png, webp, or jpg format.
	 * @param {Function} callback Expecting `callback(error, data)`. Called when the image has loaded or with an error argument if there is an error.
	 *
	 * @example
	 * // Load an image from an external URL.
	 * map.loadImage('http://placekitten.com/50/50', (error, image) => {
	 *     if (error) throw error;
	 *     // Add the loaded image to the style's sprite with the ID 'kitten'.
	 *     map.addImage('kitten', image);
	 * });
	 *
	 * @see [Example: Add an icon to the map](https://www.mapbox.com/mapbox-gl-js/example/add-image/)
	 */
	loadImage(url: string, callback: Callback<ImageBitmap | HTMLImageElement | ImageData>): void;
	/**
	* Returns an Array of strings containing the IDs of all images currently available in the map.
	* This includes both images from the style's original [sprite](https://docs.mapbox.com/help/glossary/sprite/)
	* and any images that have been added at runtime using {@link Map#addImage}.
	*
	* @returns {Array<string>} An Array of strings containing the names of all sprites/images currently available in the map.
	*
	* @example
	* const allImages = map.listImages();
	*/
	listImages(): Array<string>;
	/**
	 * @section {Models}
	 * @private
	 */
	/**
	 * Add a model to the style. This model can be displayed on the map like any other model in the style
	 * using the model ID in conjunction with a 2D vector layer. This API can also be used for updating
	 * a model. If the model for a given `modelId` was already added, it gets replaced by the new model.
	 *
	 * @param {string} id The ID of the model.
	 * @param {string} url Pointing to the model to load.
	 *
	 * @example
	 * // If the style does not already contain a model with ID 'tree',
	 * // load a tree model and then use a geojson to show it.
	 * map.addModel('tree', 'http://path/to/my/tree.glb');
	 * map.addLayer({
	 *     "id": "tree-layer",
	 *     "type": "model",
	 *     "source": "trees",
	 *     "source-layer": "trees",
	 *     "layout": {
	 *         "model-id": "tree"
	 *     }
	 *});
	 *
	 * @private
	 */
	addModel(id: string, url: string): void;
	/**
	 * Check whether or not a model with a specific ID exists in the style. This checks both models
	 * in the style and any models that have been added at runtime using {@link Map#addModel}.
	 *
	 * @param {string} id The ID of the model.
	 *
	 * @returns {boolean} A Boolean indicating whether the model exists.
	 * @example
	 * // Check if a model with the ID 'tree' exists in
	 * // the style.
	 * const treeModelExists = map.hasModel('tree');
	 *
	 * @private
	 */
	hasModel(id: string): boolean;
	/**
	 * Remove an model from a style. This can be a model from the style original
	 *  or any models that have been added at runtime using {@link Map#addModel}.
	 *
	 * @param {string} id The ID of the model.
	 *
	 * @example
	 * // If an model with the ID 'tree' exists in
	 * // the style, remove it.
	 * if (map.hasModel('tree')) map.removeModel('tree');
	 *
	 * @private
	 */
	removeModel(id: string): void;
	/**
	* Returns an Array of strings containing the IDs of all models currently available in the map.
	* This includes both models from the style and any models that have been added at runtime using {@link Map#addModel}.
	*
	* @returns {Array<string>} An Array of strings containing the names of all model IDs currently available in the map.
	*
	* @example
	* const allModels = map.listModels();
	*
	* @private
	*/
	listModels(): Array<string>;
	/** @section {Layers} */
	/**
	 * Adds a [Mapbox style layer](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers)
	 * to the map's style.
	 *
	 * A layer defines how data from a specified source will be styled. Read more about layer types
	 * and available paint and layout properties in the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers).
	 *
	 * @param {Object | CustomLayerInterface} layer The layer to add, conforming to either the Mapbox Style Specification's [layer definition](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers) or, less commonly, the {@link CustomLayerInterface} specification.
	 * The Mapbox Style Specification's layer definition is appropriate for most layers.
	 *
	 * @param {string} layer.id A unique identifier that you define.
	 * @param {string} layer.type The type of layer (for example `fill` or `symbol`).
	 * A list of layer types is available in the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#type).
	 *
	 * This can also be `custom`. For more information, see {@link CustomLayerInterface}.
	 * @param {string | Object} [layer.source] The data source for the layer.
	 * Reference a source that has _already been defined_ using the source's unique id.
	 * Reference a _new source_ using a source object (as defined in the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/)) directly.
	 * This is **required** for all `layer.type` options _except_ for `custom` and `background`.
	 * @param {string} [layer.sourceLayer] (optional) The name of the [source layer](https://docs.mapbox.com/help/glossary/source-layer/) within the specified `layer.source` to use for this style layer.
	 * This is only applicable for vector tile sources and is **required** when `layer.source` is of the type `vector`.
	 * @param {string} [layer.slot] (optional) The identifier of a [`slot`](https://docs.mapbox.com/style-spec/reference/slots/) layer that will be used to position this style layer.
	 * A `slot` layer serves as a predefined position in the layer order for inserting associated layers.
	 * *Note*: During 3D globe and terrain rendering, GL JS aims to batch multiple layers together for optimal performance.
	 * This process might lead to a rearrangement of layers. Layers draped over globe and terrain,
	 * such as `fill`, `line`, `background`, `hillshade`, and `raster`, are rendered first.
	 * These layers are rendered underneath symbols, regardless of whether they are placed
	 * in the middle or top slots or without a designated slot.
	 * @param {Array} [layer.filter] (optional) An expression specifying conditions on source features.
	 * Only features that match the filter are displayed.
	 * The Mapbox Style Specification includes more information on the limitations of the [`filter`](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#filter) parameter
	 * and a complete list of available [expressions](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/).
	 * If no filter is provided, all features in the source (or source layer for vector tilesets) will be displayed.
	 * @param {Object} [layer.paint] (optional) Paint properties for the layer.
	 * Available paint properties vary by `layer.type`.
	 * A full list of paint properties for each layer type is available in the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/).
	 * If no paint properties are specified, default values will be used.
	 * @param {Object} [layer.layout] (optional) Layout properties for the layer.
	 * Available layout properties vary by `layer.type`.
	 * A full list of layout properties for each layer type is available in the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/).
	 * If no layout properties are specified, default values will be used.
	 * @param {number} [layer.maxzoom] (optional) The maximum zoom level for the layer.
	 * At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
	 * The value can be any number between `0` and `24` (inclusive).
	 * If no maxzoom is provided, the layer will be visible at all zoom levels for which there are tiles available.
	 * @param {number} [layer.minzoom] (optional) The minimum zoom level for the layer.
	 * At zoom levels less than the minzoom, the layer will be hidden.
	 * The value can be any number between `0` and `24` (inclusive).
	 * If no minzoom is provided, the layer will be visible at all zoom levels for which there are tiles available.
	 * @param {Object} [layer.metadata] (optional) Arbitrary properties useful to track with the layer, but do not influence rendering.
	 * @param {string} [layer.renderingMode] This is only applicable for layers with the type `custom`.
	 * See {@link CustomLayerInterface} for more information.
	 * @param {string} [beforeId] The ID of an existing layer to insert the new layer before,
	 * resulting in the new layer appearing visually beneath the existing layer.
	 * If this argument is not specified, the layer will be appended to the end of the layers array
	 * and appear visually above all other layers.
	 * *Note*: Layers can only be rearranged within the same `slot`. The new layer must share the
	 * same `slot` as the existing layer to be positioned underneath it. If the
	 * layers are in different slots, the `beforeId` parameter will be ignored and
	 * the new layer will be appended to the end of the layers array.
	 * During 3D globe and terrain rendering, GL JS aims to batch multiple layers together for optimal performance.
	 * This process might lead to a rearrangement of layers. Layers draped over globe and terrain,
	 * such as `fill`, `line`, `background`, `hillshade`, and `raster`, are rendered first.
	 * These layers are rendered underneath symbols, regardless of whether they are placed
	 * in the middle or top slots or without a designated slot.
	 *
	 * @returns {Map} Returns itself to allow for method chaining.
	 *
	 * @example
	 * // Add a circle layer with a vector source
	 * map.addLayer({
	 *     id: 'points-of-interest',
	 *     source: {
	 *         type: 'vector',
	 *         url: 'mapbox://mapbox.mapbox-streets-v8'
	 *     },
	 *     'source-layer': 'poi_label',
	 *     type: 'circle',
	 *     paint: {
	 *     // Mapbox Style Specification paint properties
	 *     },
	 *     layout: {
	 *     // Mapbox Style Specification layout properties
	 *     }
	 * });
	 *
	 * @example
	 * // Define a source before using it to create a new layer
	 * map.addSource('state-data', {
	 *     type: 'geojson',
	 *     data: 'path/to/data.geojson'
	 * });
	 *
	 * map.addLayer({
	 *     id: 'states',
	 *     // References the GeoJSON source defined above
	 *     // and does not require a `source-layer`
	 *     source: 'state-data',
	 *     type: 'symbol',
	 *     layout: {
	 *         // Set the label content to the
	 *         // feature's `name` property
	 *         'text-field': ['get', 'name']
	 *     }
	 * });
	 *
	 * @example
	 * // Add a new symbol layer to a slot
	 * map.addLayer({
	 *     id: 'states',
	 *     // References a source that's already been defined
	 *     source: 'state-data',
	 *     type: 'symbol',
	 *     // Add the layer to the existing `top` slot
	 *     slot: 'top',
	 *     layout: {
	 *         // Set the label content to the
	 *         // feature's `name` property
	 *         'text-field': ['get', 'name']
	 *     }
	 * });
	 *
	 * @example
	 * // Add a new symbol layer before an existing layer
	 * map.addLayer({
	 *     id: 'states',
	 *     // References a source that's already been defined
	 *     source: 'state-data',
	 *     type: 'symbol',
	 *     layout: {
	 *         // Set the label content to the
	 *         // feature's `name` property
	 *         'text-field': ['get', 'name']
	 *     }
	 * // Add the layer before the existing `cities` layer
	 * }, 'cities');
	 *
	 * @see [Example: Select features around a clicked point](https://docs.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures-around-point/) (fill layer)
	 * @see [Example: Add a new layer below labels](https://docs.mapbox.com/mapbox-gl-js/example/geojson-layer-in-stack/)
	 * @see [Example: Create and style clusters](https://docs.mapbox.com/mapbox-gl-js/example/cluster/) (circle layer)
	 * @see [Example: Add a vector tile source](https://docs.mapbox.com/mapbox-gl-js/example/vector-source/) (line layer)
	 * @see [Example: Add a WMS layer](https://docs.mapbox.com/mapbox-gl-js/example/wms/) (raster layer)
	 */
	addLayer(layer: AnyLayer$1, beforeId?: string): this;
	/**
	 * Returns current slot of the layer.
	 *
	 * @param {string} layerId Identifier of the layer to retrieve its current slot.
	 * @returns {string | null} The slot identifier or `null` if layer doesn't have it.
	 *
	 * @example
	 * map.getSlot('roads');
	 */
	getSlot(layerId: string): string | null | undefined;
	/**
	 * Sets or removes [a slot](https://docs.mapbox.com/style-spec/reference/slots/) of style layer.
	 *
	 * @param {string} layerId Identifier of style layer.
	 * @param {string} slot Identifier of slot. If `null` or `undefined` is provided, the method removes slot.
	 * @returns {Map} Returns itself to allow for method chaining.
	 *
	 * @example
	 * // Sets new slot for style layer
	 * map.setSlot("heatmap", "top");
	 */
	setSlot(layerId: string, slot?: string | null): this;
	/**
	 * Adds new [import](https://docs.mapbox.com/style-spec/reference/imports/) to current style.
	 *
	 * @param {ImportSpecification} importSpecification Specification of import.
	 * @param {string} beforeId (optional) Identifier of an existing import to insert the new import before.
	 * @returns {Map} Returns itself to allow for method chaining.
	 *
	 * @example
	 * // Add streets style to empty map
	 * new Map({style: {version: 8, sources: {}, layers: []}})
	 *     .addImport({id: 'basemap', url: 'mapbox://styles/mapbox/streets-v12'});
	 *
	 * @example
	 * // Add new style before already added
	 * const map = new Map({
	 *     imports: [
	 *         {
	 *             id: 'basemap',
	 *             url: 'mapbox://styles/mapbox/standard'
	 *         }
	 *     ],
	 *     style: {
	 *         version: 8,
	 *         sources: {},
	 *         layers: []
	 *     }
	 * });
	 *
	 * map.addImport({
	 *     id: 'lakes',
	 *     url: 'https://styles/mapbox/streets-v12'
	 * }, 'basemap');
	 */
	addImport(importSpecification: ImportSpecification, beforeId?: string | null): this;
	/**
	 * Updates already added to style import.
	 *
	 * @param {string} importId Identifier of import to update.
	 * @param {ImportSpecification | string} importSpecification Import specification or URL of style.
	 * @returns {Map} Returns itself to allow for method chaining.
	 *
	 * @example
	 * // Update import with new data
	 * map.updateImport('basemap', {
	 *     data: {
	 *         version: 8,
	 *         sources: {},
	 *         layers: [
	 *             {
	 *                 id: 'background',
	 *                 type: 'background',
	 *                 paint: {
	 *                     'background-color': '#eee'
	 *                 }
	 *             }
	 *         ]
	 *     }
	 * });
	 *
	 * @example
	 * // Change URL of imported style
	 * map.updateImport('basemap', 'mapbox://styles/mapbox/other-standard');
	 */
	updateImport(importId: string, importSpecification: ImportSpecification | string): this;
	/**
	 * Removes added to style import.
	 *
	 * @param {string} importId Identifier of import to remove.
	 * @returns {Map} Returns itself to allow for method chaining.
	 *
	 * @example
	 * // Removes imported style
	 * map.removeImport('basemap');
	 */
	removeImport(importId: string): this;
	/**
	 * Moves import to position before another import, specified with `beforeId`. Order of imported styles corresponds to order of their layers.
	 *
	 * @param {string} importId Identifier of import to move.
	 * @param {string} beforeId The identifier of an existing import to move the new import before.
	 * @returns {Map} Returns itself to allow for method chaining.
	 *
	 * @example
	 * const map = new Map({
	 *     style: {
	 *         imports: [
	 *             {
	 *                 id: 'basemap',
	 *                 url: 'mapbox://styles/mapbox/standard'
	 *             },
	 *             {
	 *                 id: 'streets-v12',
	 *                 url: 'mapbox://styles/mapbox/streets-v12'
	 *             }
	 *         ]
	 *     }
	 * });
	 * // Place `streets-v12` import before `basemap`
	 * map.moveImport('streets-v12', 'basemap');
	 */
	moveImport(importId: string, beforeId: string): this;
	/**
	 * Moves a layer to a different z-position.
	 *
	 * @param {string} id The ID of the layer to move.
	 * @param {string} [beforeId] The ID of an existing layer to insert the new layer before.
	 * When viewing the map, the `id` layer will appear beneath the `beforeId` layer.
	 * If `beforeId` is omitted, the layer will be appended to the end of the layers array
	 * and appear above all other layers on the map.
	 * *Note*: Layers can only be rearranged within the same `slot`. The new layer must share the
	 * same `slot` as the existing layer to be positioned underneath it. If the
	 * layers are in different slots, the `beforeId` parameter will be ignored and
	 * the new layer will be appended to the end of the layers array.
	 * During 3D globe and terrain rendering, GL JS aims to batch multiple layers together for optimal performance.
	 * This process might lead to a rearrangement of layers. Layers draped over globe and terrain,
	 * such as `fill`, `line`, `background`, `hillshade`, and `raster`, are rendered first.
	 * These layers are rendered underneath symbols, regardless of whether they are placed
	 * in the middle or top slots or without a designated slot.
	 * @returns {Map} Returns itself to allow for method chaining.
	 *
	 * @example
	 * // Move a layer with ID 'polygon' before the layer with ID 'country-label'. The `polygon` layer will appear beneath the `country-label` layer on the map.
	 * map.moveLayer('polygon', 'country-label');
	 */
	moveLayer(id: string, beforeId?: string): this;
	/**
	 * Removes the layer with the given ID from the map's style.
	 *
	 * If no such layer exists, an `error` event is fired.
	 *
	 * @param {string} id ID of the layer to remove.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @fires Map.event:error
	 *
	 * @example
	 * // If a layer with ID 'state-data' exists, remove it.
	 * if (map.getLayer('state-data')) map.removeLayer('state-data');
	 */
	removeLayer(id: string): this;
	/**
	 * Returns the layer with the specified ID in the map's style.
	 *
	 * @param {string} id The ID of the layer to get.
	 * @returns {?Object} The layer with the specified ID, or `undefined`
	 * if the ID corresponds to no existing layers.
	 *
	 * @example
	 * const stateDataLayer = map.getLayer('state-data');
	 *
	 * @see [Example: Filter symbols by toggling a list](https://www.mapbox.com/mapbox-gl-js/example/filter-markers/)
	 * @see [Example: Filter symbols by text input](https://www.mapbox.com/mapbox-gl-js/example/filter-markers-by-input/)
	 */
	getLayer<T extends LayerSpecification>(id: string): T | undefined;
	/**
	 * Returns the IDs of all slots in the map's style.
	 *
	 * @returns {Array<string>} The IDs of all slots in the map's style.
	 *
	 * @example
	 * const slots = map.getSlots();
	 */
	getSlots(): Array<string>;
	/**
	 * Sets the zoom extent for the specified style layer. The zoom extent includes the
	 * [minimum zoom level](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layer-minzoom)
	 * and [maximum zoom level](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layer-maxzoom))
	 * at which the layer will be rendered.
	 *
	 * Note: For style layers using vector sources, style layers cannot be rendered at zoom levels lower than the
	 * minimum zoom level of the _source layer_ because the data does not exist at those zoom levels. If the minimum
	 * zoom level of the source layer is higher than the minimum zoom level defined in the style layer, the style
	 * layer will not be rendered at all zoom levels in the zoom range.
	 *
	 * @param {string} layerId The ID of the layer to which the zoom extent will be applied.
	 * @param {number} minzoom The minimum zoom to set (0-24).
	 * @param {number} maxzoom The maximum zoom to set (0-24).
	 * @returns {Map} Returns itself to allow for method chaining.
	 *
	 * @example
	 * map.setLayerZoomRange('my-layer', 2, 5);
	 */
	setLayerZoomRange(layerId: string, minzoom: number, maxzoom: number): this;
	/**
	 * Sets the filter for the specified style layer.
	 *
	 * Filters control which features a style layer renders from its source.
	 * Any feature for which the filter expression evaluates to `true` will be
	 * rendered on the map. Those that are false will be hidden.
	 *
	 * Use `setFilter` to show a subset of your source data.
	 *
	 * To clear the filter, pass `null` or `undefined` as the second parameter.
	 *
	 * @param {string} layerId The ID of the layer to which the filter will be applied.
	 * @param {Array | null | undefined} filter The filter, conforming to the Mapbox Style Specification's
	 * [filter definition](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#filter).  If `null` or `undefined` is provided, the function removes any existing filter from the layer.
	 * @param {Object} [options] Options object.
	 * @param {boolean} [options.validate=true] Whether to check if the filter conforms to the Mapbox GL Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
	 * @returns {Map} Returns itself to allow for method chaining.
	 *
	 * @example
	 * // display only features with the 'name' property 'USA'
	 * map.setFilter('my-layer', ['==', ['get', 'name'], 'USA']);
	 * @example
	 * // display only features with five or more 'available-spots'
	 * map.setFilter('bike-docks', ['>=', ['get', 'available-spots'], 5]);
	 * @example
	 * // remove the filter for the 'bike-docks' style layer
	 * map.setFilter('bike-docks', null);
	 *
	 * @see [Example: Filter features within map view](https://www.mapbox.com/mapbox-gl-js/example/filter-features-within-map-view/)
	 * @see [Example: Highlight features containing similar data](https://www.mapbox.com/mapbox-gl-js/example/query-similar-features/)
	 * @see [Example: Create a timeline animation](https://www.mapbox.com/mapbox-gl-js/example/timeline-animation/)
	 * @see [Tutorial: Show changes over time](https://docs.mapbox.com/help/tutorials/show-changes-over-time/)
	 */
	setFilter(layerId: string, filter?: FilterSpecification | null, options?: StyleSetterOptions): this;
	/**
	 * Returns the filter applied to the specified style layer.
	 *
	 * @param {string} layerId The ID of the style layer whose filter to get.
	 * @returns {Array} The layer's filter.
	 * @example
	 * const filter = map.getFilter('myLayer');
	 */
	getFilter(layerId: string): FilterSpecification | null | undefined;
	/**
	 * Sets the value of a paint property in the specified style layer.
	 *
	 * @param {string} layerId The ID of the layer to set the paint property in.
	 * @param {string} name The name of the paint property to set.
	 * @param {*} value The value of the paint property to set.
	 * Must be of a type appropriate for the property, as defined in the [Mapbox Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/).
	 * @param {Object} [options] Options object.
	 * @param {boolean} [options.validate=true] Whether to check if `value` conforms to the Mapbox GL Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setPaintProperty('my-layer', 'fill-color', '#faafee');
	 * @see [Example: Change a layer's color with buttons](https://www.mapbox.com/mapbox-gl-js/example/color-switcher/)
	 * @see [Example: Adjust a layer's opacity](https://www.mapbox.com/mapbox-gl-js/example/adjust-layer-opacity/)
	 * @see [Example: Create a draggable point](https://www.mapbox.com/mapbox-gl-js/example/drag-a-point/)
	 */
	setPaintProperty(layerId: string, name: string, value: any, options?: StyleSetterOptions): this;
	/**
	 * Returns the value of a paint property in the specified style layer.
	 *
	 * @param {string} layerId The ID of the layer to get the paint property from.
	 * @param {string} name The name of a paint property to get.
	 * @returns {*} The value of the specified paint property.
	 * @example
	 * const paintProperty = map.getPaintProperty('mySymbolLayer', 'icon-color');
	 */
	getPaintProperty(layerId: string, name: string): void | TransitionSpecification | PropertyValueSpecification<unknown>;
	/**
	 * Sets the value of a layout property in the specified style layer.
	 *
	 * @param {string} layerId The ID of the layer to set the layout property in.
	 * @param {string} name The name of the layout property to set.
	 * @param {*} value The value of the layout property. Must be of a type appropriate for the property, as defined in the [Mapbox Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/).
	 * @param {Object} [options] Options object.
	 * @param {boolean} [options.validate=true] Whether to check if `value` conforms to the Mapbox GL Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setLayoutProperty('my-layer', 'visibility', 'none');
	 * @see [Example: Show and hide layers](https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/)
	 */
	setLayoutProperty(layerId: string, name: string, value: any, options?: StyleSetterOptions): this;
	/**
	 * Returns the value of a layout property in the specified style layer.
	 *
	 * @param {string} layerId The ID of the layer to get the layout property from.
	 * @param {string} name The name of the layout property to get.
	 * @returns {*} The value of the specified layout property.
	 * @example
	 * const layoutProperty = map.getLayoutProperty('mySymbolLayer', 'icon-anchor');
	 */
	getLayoutProperty(layerId: string, name: string): PropertyValueSpecification<unknown> | null | undefined;
	/** @section {Style properties} */
	/**
	 * Returns the imported style schema.
	 *
	 * @param {string} importId The name of the imported style (e.g. `basemap`).
	 * @returns {*} Returns the imported style schema.
	 * @private
	 *
	 * @example
	 * map.getSchema('basemap');
	 */
	getSchema(importId: string): SchemaSpecification | null | undefined;
	/**
	 * Sets the imported style schema value.
	 *
	 * @param {string} importId The name of the imported style (e.g. `basemap`).
	 * @param {SchemaSpecification} schema The imported style schema.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @private
	 *
	 * @example
	 * map.setSchema('basemap', {lightPreset: {type: 'string', default: 'night', values: ['day', 'night']}});
	 */
	setSchema(importId: string, schema: SchemaSpecification): this;
	/**
	 * Returns the imported style configuration.
	 *
	 * @param {string} importId The name of the imported style (e.g. `basemap`).
	 * @returns {*} Returns the imported style configuration.
	 * @example
	 * map.getConfig('basemap');
	 */
	getConfig(importId: string): ConfigSpecification | null | undefined;
	/**
	 * Sets the imported style configuration value.
	 *
	 * @param {string} importId The name of the imported style (e.g. `basemap`).
	 * @param {ConfigSpecification} config The imported style configuration value.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setConfig('basemap', {lightPreset: 'night', showPointOfInterestLabels: false});
	 */
	setConfig(importId: string, config: ConfigSpecification): this;
	/**
	 * Returns the value of a configuration property in the imported style.
	 *
	 * @param {string} importId The name of the imported style (e.g. `basemap`).
	 * @param {string} configName The name of the configuration property from the style.
	 * @returns {*} Returns the value of the configuration property.
	 * @example
	 * map.getConfigProperty('basemap', 'showLabels');
	 */
	getConfigProperty(importId: string, configName: string): any | null | undefined;
	/**
	 * Sets the value of a configuration property in the currently set style.
	 *
	 * @param {string} importId The name of the imported style to set the config for (e.g. `basemap`).
	 * @param {string} configName The name of the configuration property from the style.
	 * @param {*} value The value of the configuration property. Must be of a type appropriate for the property, as defined by the style configuration schema.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setConfigProperty('basemap', 'showLabels', false);
	 */
	setConfigProperty(importId: string, configName: string, value: any): this;
	/**
	 * Adds a set of Mapbox style light to the map's style.
	 *
	 * _Note: This light is not to confuse with our legacy light API used through {@link Map#setLight} and {@link Map#getLight}_.
	 *
	 * @param {Array<LightsSpecification>} lights An array of lights to add, conforming to the Mapbox Style Specification's light definition.
	 * @returns {Map} Returns itself to allow for method chaining.
	 *
	 * @example
	 * // Add a directional light
	 * map.setLights([{
	 *     "id": "sun_light",
	 *     "type": "directional",
	 *     "properties": {
	 *         "color": "rgba(255.0, 0.0, 0.0, 1.0)",
	 *         "intensity": 0.4,
	 *         "direction": [200.0, 40.0],
	 *         "cast-shadows": true,
	 *         "shadow-intensity": 0.2
	 *     }
	 * }]);
	 */
	setLights(lights?: Array<LightsSpecification> | null): this;
	/**
	 * Returns the lights added to the map.
	 *
	 * @returns {Array<LightSpecification>} Lights added to the map.
	 * @example
	 * const lights = map.getLights();
	 */
	getLights(): Array<LightsSpecification> | null | undefined;
	/**
	 * Sets the any combination of light values.
	 *
	 * _Note: that this API is part of the legacy light API, prefer using {@link Map#setLights}.
	 *
	 * @param {LightSpecification} light Light properties to set. Must conform to the [Light Style Specification](https://www.mapbox.com/mapbox-gl-style-spec/#light).
	 * @param {Object} [options] Options object.
	 * @param {boolean} [options.validate=true] Whether to check if the filter conforms to the Mapbox GL Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setLight({
	 *     "anchor": "viewport",
	 *     "color": "blue",
	 *     "intensity": 0.5
	 * });
	 */
	setLight(light: LightSpecification, options?: StyleSetterOptions): this;
	/**
	 * Returns the value of the light object.
	 *
	 * @returns {LightSpecification} Light properties of the style.
	 * @example
	 * const light = map.getLight();
	 */
	getLight(): LightSpecification;
	/**
	 * Sets the terrain property of the style.
	 *
	 * @param {TerrainSpecification} terrain Terrain properties to set. Must conform to the [Terrain Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/terrain/).
	 * If `null` or `undefined` is provided, function removes terrain.
	 * Exaggeration could be updated for the existing terrain without explicitly specifying the `source`.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.addSource('mapbox-dem', {
	 *     'type': 'raster-dem',
	 *     'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
	 *     'tileSize': 512,
	 *     'maxzoom': 14
	 * });
	 * // add the DEM source as a terrain layer with exaggerated height
	 * map.setTerrain({'source': 'mapbox-dem', 'exaggeration': 1.5});
	 * // update the exaggeration for the existing terrain
	 * map.setTerrain({'exaggeration': 2});
	 */
	setTerrain(terrain?: TerrainSpecification): this;
	/**
	 * Returns the terrain specification or `null` if terrain isn't set on the map.
	 *
	 * @returns {TerrainSpecification | null} Terrain specification properties of the style.
	 * @example
	 * const terrain = map.getTerrain();
	 */
	getTerrain(): TerrainSpecification | null | undefined;
	/**
	 * Sets the fog property of the style.
	 *
	 * @param {FogSpecification} fog The fog properties to set. Must conform to the [Fog Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/fog/).
	 * If `null` or `undefined` is provided, this function call removes the fog from the map.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setFog({
	 *     "range": [0.8, 8],
	 *     "color": "#dc9f9f",
	 *     "horizon-blend": 0.5,
	 *     "high-color": "#245bde",
	 *     "space-color": "#000000",
	 *     "star-intensity": 0.15
	 * });
	 * @see [Example: Add fog to a map](https://docs.mapbox.com/mapbox-gl-js/example/add-fog/)
	 */
	setFog(fog?: FogSpecification): this;
	/**
	 * Returns the fog specification or `null` if fog is not set on the map.
	 *
	 * @returns {FogSpecification} Fog specification properties of the style.
	 * @example
	 * const fog = map.getFog();
	 */
	getFog(): FogSpecification | null | undefined;
	/**
	 * Sets the color-theme property of the style.
	 *
	 * @param {ColorThemeSpecification} colorTheme The color-theme properties to set.
	 * If `null` or `undefined` is provided, this function call removes the color-theme from the map.
	 * Note: Calling this function triggers a full reload of tiles.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setColorTheme({
	 *     "data": "iVBORw0KGgoAA..."
	 * });
	 */
	setColorTheme(colorTheme?: ColorThemeSpecification): this;
	/**
	 * Sets the camera property of the style.
	 *
	 * @param {CameraSpecification} camera The camera properties to set. Must conform to the Camera Style Specification.
	 * @returns {Map} Returns itself to allow for method chaining.
	 * @example
	 * map.setCamera({
	 *     "camera-projection": "perspective",
	 * });
	 */
	setCamera(camera: CameraSpecification): this;
	_triggerCameraUpdate(camera: CameraSpecification): this;
	/**
	 * Returns the camera options specification.
	 *
	 * @returns {CameraSpecification} Camera specification properties of the style.
	 * @example
	 * const camera = map.getCamera();
	 */
	getCamera(): CameraSpecification;
	/**
	 * Returns the fog opacity for a given location.
	 *
	 * An opacity of 0 means that there is no fog contribution for the given location
	 * while a fog opacity of 1.0 means the location is fully obscured by the fog effect.
	 *
	 * If there is no fog set on the map, this function will return 0.
	 *
	 * @param {LngLatLike} lnglat The geographical location to evaluate the fog on.
	 * @returns {number} A value between 0 and 1 representing the fog opacity, where 1 means fully within, and 0 means not affected by the fog effect.
	 * @private
	 */
	_queryFogOpacity(lnglat: LngLatLike): number;
	/** @section {Feature state} */
	/**
	 * Sets the `state` of a feature.
	 * A feature's `state` is a set of user-defined key-value pairs that are assigned to a feature at runtime.
	 * When using this method, the `state` object is merged with any existing key-value pairs in the feature's state.
	 * Features are identified by their `id` attribute, which can be any number or string.
	 *
	 * This method can only be used with sources that have a `id` attribute. The `id` attribute can be defined in three ways:
	 * - For vector or GeoJSON sources, including an `id` attribute in the original data file.
	 * - For vector or GeoJSON sources, using the [`promoteId`](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#vector-promoteId) option at the time the source is defined.
	 * - For GeoJSON sources, using the [`generateId`](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson-generateId) option to auto-assign an `id` based on the feature's index in the source data. If you change feature data using `map.getSource('some id').setData(...)`, you may need to re-apply state taking into account updated `id` values.
	 *
	 * _Note: You can use the [`feature-state` expression](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#feature-state) to access the values in a feature's state object for the purposes of styling_.
	 *
	 * @param {Object} feature Feature identifier. Feature objects returned from
	 * {@link Map#queryRenderedFeatures} or event handlers can be used as feature identifiers.
	 * @param {number | string} feature.id Unique id of the feature. Can be an integer or a string, but supports string values only when the [`promoteId`](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#vector-promoteId) option has been applied to the source or the string can be cast to an integer.
	 * @param {string} feature.source The id of the vector or GeoJSON source for the feature.
	 * @param {string} [feature.sourceLayer] (optional) *For vector tile sources, `sourceLayer` is required*.
	 * @param {Object} state A set of key-value pairs. The values should be valid JSON types.
	 * @returns {Map} The map object.
	 * @example
	 * // When the mouse moves over the `my-layer` layer, update
	 * // the feature state for the feature under the mouse
	 * map.on('mousemove', 'my-layer', (e) => {
	 *     if (e.features.length > 0) {
	 *         map.setFeatureState({
	 *             source: 'my-source',
	 *             sourceLayer: 'my-source-layer',
	 *             id: e.features[0].id,
	 *         }, {
	 *             hover: true
	 *         });
	 *     }
	 * });
	 *
	 * @see [Example: Create a hover effect](https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/)
	 * @see [Tutorial: Create interactive hover effects with Mapbox GL JS](https://docs.mapbox.com/help/tutorials/create-interactive-hover-effects-with-mapbox-gl-js/)
	 */
	setFeatureState(feature: FeatureSelector | GeoJSONFeature, state: FeatureState): this;
	/**
	 * Removes the `state` of a feature, setting it back to the default behavior.
	 * If only a `feature.source` is specified, it will remove the state for all features from that source.
	 * If `feature.id` is also specified, it will remove all keys for that feature's state.
	 * If `key` is also specified, it removes only that key from that feature's state.
	 * Features are identified by their `feature.id` attribute, which can be any number or string.
	 *
	 * @param {Object} feature Identifier of where to remove state. It can be a source, a feature, or a specific key of feature.
	 * Feature objects returned from {@link Map#queryRenderedFeatures} or event handlers can be used as feature identifiers.
	 * @param {number | string} [feature.id] (optional) Unique id of the feature. Can be an integer or a string, but supports string values only when the [`promoteId`](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#vector-promoteId) option has been applied to the source or the string can be cast to an integer.
	 * @param {string} feature.source The id of the vector or GeoJSON source for the feature.
	 * @param {string} [feature.sourceLayer] (optional) For vector tile sources, `sourceLayer` is required.
	 * @param {string} [key] (optional) The key in the feature state to reset.
	 *
	 * @example
	 * // Reset the entire state object for all features
	 * // in the `my-source` source
	 * map.removeFeatureState({
	 *     source: 'my-source'
	 * });
	 *
	 * @example
	 * // When the mouse leaves the `my-layer` layer,
	 * // reset the entire state object for the
	 * // feature under the mouse
	 * map.on('mouseleave', 'my-layer', (e) => {
	 *     map.removeFeatureState({
	 *         source: 'my-source',
	 *         sourceLayer: 'my-source-layer',
	 *         id: e.features[0].id
	 *     });
	 * });
	 *
	 * @example
	 * // When the mouse leaves the `my-layer` layer,
	 * // reset only the `hover` key-value pair in the
	 * // state for the feature under the mouse
	 * map.on('mouseleave', 'my-layer', (e) => {
	 *     map.removeFeatureState({
	 *         source: 'my-source',
	 *         sourceLayer: 'my-source-layer',
	 *         id: e.features[0].id
	 *     }, 'hover');
	 * });
	 */
	removeFeatureState(feature: Omit<FeatureSelector, "id"> & {
		id?: FeatureSelector["id"];
	} | GeoJSONFeature, key?: string): this;
	/**
	 * Gets the `state` of a feature.
	 * A feature's `state` is a set of user-defined key-value pairs that are assigned to a feature at runtime.
	 * Features are identified by their `id` attribute, which can be any number or string.
	 *
	 * _Note: To access the values in a feature's state object for the purposes of styling the feature, use the [`feature-state` expression](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#feature-state)_.
	 *
	 * @param {Object} feature Feature identifier. Feature objects returned from
	 * {@link Map#queryRenderedFeatures} or event handlers can be used as feature identifiers.
	 * @param {number | string} feature.id Unique id of the feature. Can be an integer or a string, but supports string values only when the [`promoteId`](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#vector-promoteId) option has been applied to the source or the string can be cast to an integer.
	 * @param {string} feature.source The id of the vector or GeoJSON source for the feature.
	 * @param {string} [feature.sourceLayer] (optional) *For vector tile sources, `sourceLayer` is required*.
	 *
	 * @returns {Object} The state of the feature: a set of key-value pairs that was assigned to the feature at runtime.
	 *
	 * @example
	 * // When the mouse moves over the `my-layer` layer,
	 * // get the feature state for the feature under the mouse
	 * map.on('mousemove', 'my-layer', (e) => {
	 *     if (e.features.length > 0) {
	 *         map.getFeatureState({
	 *             source: 'my-source',
	 *             sourceLayer: 'my-source-layer',
	 *             id: e.features[0].id
	 *         });
	 *     }
	 * });
	 */
	getFeatureState(feature: FeatureSelector | GeoJSONFeature): FeatureState | null | undefined;
	_updateContainerDimensions(): void;
	_detectMissingCSS(): void;
	_setupContainer(): void;
	_resizeCanvas(width: number, height: number): void;
	_addMarker(marker: Marker): void;
	_removeMarker(marker: Marker): void;
	_addPopup(popup: Popup): void;
	_removePopup(popup: Popup): void;
	_setupPainter(): void;
	_contextLost(event: any): void;
	_contextRestored(event: any): void;
	_onMapScroll(event: any): boolean | null | undefined;
	/** @section {Lifecycle} */
	/**
	 * Returns a Boolean indicating whether the map is fully loaded.
	 *
	 * Returns `false` if the style is not yet fully loaded,
	 * or if there has been a change to the sources or style that
	 * has not yet fully loaded.
	 *
	 * @returns {boolean} A Boolean indicating whether the map is fully loaded.
	 * @example
	 * const isLoaded = map.loaded();
	 */
	loaded(): boolean;
	/**
	 * Returns a Boolean indicating whether the map is finished rendering, meaning all animations are finished.
	 *
	 * @returns {boolean} A Boolean indicating whether map finished rendering.
	 * @example
	 * const frameReady = map.frameReady();
	 */
	frameReady(): boolean;
	/**
	 * Update this map's style and sources, and re-render the map.
	 *
	 * @param {boolean} updateStyle mark the map's style for reprocessing as
	 * well as its sources
	 * @returns {Map} this
	 * @private
	 */
	_update(updateStyle?: boolean): this;
	/**
	 * Request that the given callback be executed during the next render
	 * frame.  Schedule a render frame if one is not already scheduled.
	 * @returns An id that can be used to cancel the callback
	 * @private
	 */
	_requestRenderFrame(callback: () => void): TaskID;
	_cancelRenderFrame(id: TaskID): void;
	/**
	 * Request that the given callback be executed during the next render frame if the map is not
	 * idle. Otherwise it is executed immediately, to avoid triggering a new render.
	 * @private
	 */
	_requestDomTask(callback: () => void): void;
	/**
	 * Call when a (re-)render of the map is required:
	 * - The style has changed (`setPaintProperty()`, etc.)
	 * - Source data has changed (for example, tiles have finished loading)
	 * - The map has is moving (or just finished moving)
	 * - A transition is in progress
	 *
	 * @param {number} paintStartTimeStamp  The time when the animation frame began executing.
	 *
	 * @returns {Map} this
	 * @private
	 */
	_render(paintStartTimeStamp: number): void;
	_forceMarkerAndPopupUpdate(shouldWrap?: boolean): void;
	/**
	 * Update the average visible elevation by sampling terrain
	 *
	 * @returns {boolean} true if elevation has changed from the last sampling
	 * @private
	 */
	_updateAverageElevation(timeStamp: number, ignoreTimeout?: boolean): boolean;
	/***** START WARNING - REMOVAL OR MODIFICATION OF THE
	* FOLLOWING CODE VIOLATES THE MAPBOX TERMS OF SERVICE  ******
	* The following code is used to access Mapbox's APIs. Removal or modification
	* of this code can result in higher fees and/or
	* termination of your account with Mapbox.
	*
	* Under the Mapbox Terms of Service, you may not use this code to access Mapbox
	* Mapping APIs other than through Mapbox SDKs.
	*
	* The Mapping APIs documentation is available at https://docs.mapbox.com/api/maps/#maps
	* and the Mapbox Terms of Service are available at https://www.mapbox.com/tos/
	******************************************************************************/
	_authenticate(): void;
	/***** END WARNING - REMOVAL OR MODIFICATION OF THE
	PRECEDING CODE VIOLATES THE MAPBOX TERMS OF SERVICE  ******/
	_postStyleLoadEvent(): void;
	_updateTerrain(): void;
	_calculateSpeedIndex(): number;
	_canvasPixelComparison(finalFrame: Uint8Array, allFrames: Uint8Array[], timeStamps: number[]): number;
	/**
	 * Clean up and release all internal resources associated with this map.
	 *
	 * This includes DOM elements, event bindings, web workers, and WebGL resources.
	 *
	 * Use this method when you are done using the map and wish to ensure that it no
	 * longer consumes browser resources. Afterwards, you must not call any other
	 * methods on the map.
	 *
	 * @example
	 * map.remove();
	 */
	remove(): void;
	/**
	 * Trigger the rendering of a single frame. Use this method with custom layers to
	 * repaint the map when the layer's properties or properties associated with the
	 * layer's source change. Calling this multiple times before the
	 * next frame is rendered will still result in only a single frame being rendered.
	 *
	 * @example
	 * map.triggerRepaint();
	 * @see [Example: Add a 3D model](https://docs.mapbox.com/mapbox-gl-js/example/add-3d-model/)
	 * @see [Example: Add an animated icon to the map](https://docs.mapbox.com/mapbox-gl-js/example/add-image-animated/)
	 */
	triggerRepaint(): void;
	_triggerFrame(render: boolean): void;
	/**
	 * Preloads all tiles that will be requested for one or a series of transformations
	 *
	 * @private
	 * @returns {Object} Returns `this` | Promise.
	 */
	_preloadTiles(transform: Transform | Array<Transform>): this;
	_onWindowOnline(): void;
	_onWindowResize(event: UIEvent): void;
	_onVisibilityChange(): void;
	/** @section {Debug features} */
	/**
	 * Gets and sets a Boolean indicating whether the map will render an outline
	 * around each tile. These tile boundaries are useful for debugging.
	 *
	 * @name showTileBoundaries
	 * @type {boolean}
	 * @instance
	 * @memberof Map
	 * @example
	 * map.showTileBoundaries = true;
	 */
	get showTileBoundaries(): boolean;
	set showTileBoundaries(value: boolean);
	/**
	 * Gets and sets a Boolean indicating whether the map will render the tile ID
	 * and the status of the tile in their corner when `showTileBoundaries` is on.
	 *
	 * The uncompressed file size of the first vector source is drawn in the top left
	 * corner of each tile, next to the tile ID.
	 *
	 * @name showParseStatus
	 * @type {boolean}
	 * @instance
	 * @memberof Map
	 * @example
	 * map.showParseStatus = true;
	 */
	get showParseStatus(): boolean;
	set showParseStatus(value: boolean);
	/**
	 * Gets and sets a Boolean indicating whether the map will render a wireframe
	 * on top of the displayed terrain. Useful for debugging.
	 *
	 * The wireframe is always red and is drawn only when terrain is active.
	 *
	 * @name showTerrainWireframe
	 * @type {boolean}
	 * @instance
	 * @memberof Map
	 * @example
	 * map.showTerrainWireframe = true;
	 */
	get showTerrainWireframe(): boolean;
	set showTerrainWireframe(value: boolean);
	/**
	 * Gets and sets a Boolean indicating whether the map will render a wireframe
	 * on top of 2D layers. Useful for debugging.
	 *
	 * The wireframe is always red and is drawn only for 2D layers.
	 *
	 * @name showLayers2DWireframe
	 * @type {boolean}
	 * @instance
	 * @memberof Map
	 * @example
	 * map.showLayers2DWireframe = true;
	 */
	get showLayers2DWireframe(): boolean;
	set showLayers2DWireframe(value: boolean);
	/**
	 * Gets and sets a Boolean indicating whether the map will render a wireframe
	 * on top of 3D layers. Useful for debugging.
	 *
	 * The wireframe is always red and is drawn only for 3D layers.
	 *
	 * @name showLayers3DWireframe
	 * @type {boolean}
	 * @instance
	 * @memberof Map
	 * @example
	 * map.showLayers3DWireframe = true;
	 */
	get showLayers3DWireframe(): boolean;
	set showLayers3DWireframe(value: boolean);
	/**
	 * Gets and sets a Boolean indicating whether the speedindex metric calculation is on or off
	 *
	 * @private
	 * @name speedIndexTiming
	 * @type {boolean}
	 * @instance
	 * @memberof Map
	 * @example
	 * map.speedIndexTiming = true;
	 */
	get speedIndexTiming(): boolean;
	set speedIndexTiming(value: boolean);
	/**
	 * Gets and sets a Boolean indicating whether the map will visualize
	 * the padding offsets.
	 *
	 * @name showPadding
	 * @type {boolean}
	 * @instance
	 * @memberof Map
	 */
	get showPadding(): boolean;
	set showPadding(value: boolean);
	/**
	 * Gets and sets a Boolean indicating whether the map will render boxes
	 * around all symbols in the data source, revealing which symbols
	 * were rendered or which were hidden due to collisions.
	 * This information is useful for debugging.
	 *
	 * @name showCollisionBoxes
	 * @type {boolean}
	 * @instance
	 * @memberof Map
	 */
	get showCollisionBoxes(): boolean;
	set showCollisionBoxes(value: boolean);
	/**
	 * Gets and sets a Boolean indicating whether the map should color-code
	 * each fragment to show how many times it has been shaded.
	 * White fragments have been shaded 8 or more times.
	 * Black fragments have been shaded 0 times.
	 * This information is useful for debugging.
	 *
	 * @name showOverdraw
	 * @type {boolean}
	 * @instance
	 * @memberof Map
	 */
	get showOverdrawInspector(): boolean;
	set showOverdrawInspector(value: boolean);
	/**
	 * Gets and sets a Boolean indicating whether the map will
	 * continuously repaint. This information is useful for analyzing performance.
	 *
	 * @name repaint
	 * @type {boolean}
	 * @instance
	 * @memberof Map
	 */
	get repaint(): boolean;
	set repaint(value: boolean);
	get vertices(): boolean;
	set vertices(value: boolean);
	/**
	* Display tile AABBs for debugging
	*
	* @private
	* @type {boolean}
	*/
	get showTileAABBs(): boolean;
	set showTileAABBs(value: boolean);
	_setCacheLimits(limit: number, checkThreshold: number): void;
	_occlusionCriteriaSatisfied(): boolean;
	/**
	 * The version of Mapbox GL JS in use as specified in package.json, CHANGELOG.md, and the GitHub release.
	 *
	 * @name version
	 * @instance
	 * @memberof Map
	 * @var {string} version
	 */
	get version(): string;
}
export type NavigationControlOptions = {
	showCompass?: boolean;
	showZoom?: boolean;
	visualizePitch?: boolean;
};
/**
 * A `NavigationControl` control contains zoom buttons and a compass.
 * Add this control to a map using {@link Map#addControl}.
 *
 * @implements {IControl}
 * @param {Object} [options]
 * @param {boolean} [options.showCompass=true] If `true` the compass button is included.
 * @param {boolean} [options.showZoom=true] If `true` the zoom-in and zoom-out buttons are included.
 * @param {boolean} [options.visualizePitch=false] If `true` the pitch is visualized by rotating X-axis of compass.
 * @example
 * const nav = new mapboxgl.NavigationControl();
 * map.addControl(nav, 'top-left');
 * @example
 * const nav = new mapboxgl.NavigationControl({
 *     visualizePitch: true
 * });
 * map.addControl(nav, 'bottom-right');
 * @see [Example: Display map navigation controls](https://www.mapbox.com/mapbox-gl-js/example/navigation/)
 * @see [Example: Add a third party vector tile source](https://www.mapbox.com/mapbox-gl-js/example/third-party/)
 */
export declare class NavigationControl implements IControl {
	_map?: Map$1;
	options: NavigationControlOptions;
	_container: HTMLElement;
	_zoomInButton: HTMLButtonElement;
	_zoomOutButton: HTMLButtonElement;
	_compass: HTMLButtonElement;
	_compassIcon: HTMLElement;
	_handler?: MouseRotateWrapper;
	constructor(options?: NavigationControlOptions);
	_updateZoomButtons(): void;
	_rotateCompassArrow(): void;
	onAdd(map: Map$1): HTMLElement;
	onRemove(): void;
	_createButton(className: string, fn: () => unknown): HTMLButtonElement;
	_setButtonTitle(button: HTMLButtonElement, title: string): void;
}
declare class MouseRotateWrapper {
	map: Map$1;
	_clickTolerance: number;
	element: HTMLElement;
	mouseRotate: MouseRotateHandler;
	mousePitch: MousePitchHandler;
	_startPos: Point | null | undefined;
	_lastPos: Point | null | undefined;
	constructor(map: Map$1, element: HTMLElement, pitch?: boolean);
	down(e: MouseEvent, point: Point): void;
	move(e: MouseEvent, point: Point): void;
	off(): void;
	offTemp(): void;
	mousedown(e: MouseEvent): void;
	mousemove(e: MouseEvent): void;
	mouseup(e: MouseEvent): void;
	touchstart(e: TouchEvent): void;
	touchmove(e: TouchEvent): void;
	touchend(e: TouchEvent): void;
	reset(): void;
}
export type GeolocateControlOptions = {
	positionOptions?: PositionOptions;
	fitBoundsOptions?: AnimationOptions & CameraOptions;
	trackUserLocation?: boolean;
	showAccuracyCircle?: boolean;
	showUserLocation?: boolean;
	showUserHeading?: boolean;
	geolocation?: Geolocation;
};
type DeviceOrientationEvent$1 = {
	absolute: boolean;
	alpha: number;
	beta: number;
	gamma: number;
	requestPermission: Promise<string>;
	webkitCompassHeading?: number;
};
type GeolocateControlEvents = {
	"error": GeolocationPositionError;
	"geolocate": GeolocationPosition;
	"outofmaxbounds": GeolocationPosition;
	"trackuserlocationstart": void;
	"trackuserlocationend": void;
};
/**
 * A `GeolocateControl` control provides a button that uses the browser's geolocation
 * API to locate the user on the map.
 * Add this control to a map using {@link Map#addControl}.
 *
 * Not all browsers support geolocation,
 * and some users may disable the feature. Geolocation support for modern
 * browsers including Chrome requires sites to be served over HTTPS. If
 * geolocation support is not available, the `GeolocateControl` will show
 * as disabled.
 *
 * The [zoom level](https://docs.mapbox.com/help/glossary/zoom-level/) applied depends on the accuracy of the geolocation provided by the device.
 *
 * The GeolocateControl has two modes. If `trackUserLocation` is `false` (default) the control acts as a button, which when pressed will set the map's camera to target the user location. If the user moves, the map won't update. This is most suited for the desktop. If `trackUserLocation` is `true` the control acts as a toggle button that when active the user's location is actively monitored for changes. In this mode the `GeolocateControl` has three interaction states:
 * * active - The map's camera automatically updates as the user's location changes, keeping the location dot in the center. This is the initial state, and the state upon clicking the `GeolocateControl` button.
 * * passive - The user's location dot automatically updates, but the map's camera does not. Occurs upon the user initiating a map movement.
 * * disabled - Occurs if geolocation is not available, disabled, or denied.
 *
 * These interaction states can't be controlled programmatically. Instead, they are set based on user interactions.
 *
 * @implements {IControl}
 * @param {Object} [options]
 * @param {Object} [options.positionOptions={enableHighAccuracy: false, timeout: 6000}] A Geolocation API [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object.
 * @param {Object} [options.fitBoundsOptions={maxZoom: 15}] A {@link Map#fitBounds} options object to use when the map is panned and zoomed to the user's location. The default is to use a `maxZoom` of 15 to limit how far the map will zoom in for very accurate locations.
 * @param {Object} [options.trackUserLocation=false] If `true` the `GeolocateControl` becomes a toggle button and when active the map will receive updates to the user's location as it changes.
 * @param {Object} [options.showAccuracyCircle=true] By default, if `showUserLocation` is `true`, a transparent circle will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location. Set to `false` to disable. Always disabled when `showUserLocation` is `false`.
 * @param {Object} [options.showUserLocation=true] By default a dot will be shown on the map at the user's location. Set to `false` to disable.
 * @param {Object} [options.showUserHeading=false] If `true` an arrow will be drawn next to the user location dot indicating the device's heading. This only has affect when `trackUserLocation` is `true`.
 * @param {Object} [options.geolocation=window.navigator.geolocation] `window.navigator.geolocation` by default; you can provide an object with the same shape to customize geolocation handling.
 *
 * @example
 * map.addControl(new mapboxgl.GeolocateControl({
 *     positionOptions: {
 *         enableHighAccuracy: true
 *     },
 *     trackUserLocation: true,
 *     showUserHeading: true
 * }));
 * @see [Example: Locate the user](https://www.mapbox.com/mapbox-gl-js/example/locate-user/)
 */
export declare class GeolocateControl extends Evented<GeolocateControlEvents> implements IControl {
	_map: Map$1;
	options: GeolocateControlOptions;
	_container: HTMLElement;
	_dotElement: HTMLElement;
	_circleElement: HTMLElement;
	_geolocateButton: HTMLButtonElement;
	_geolocationWatchID: number;
	_timeoutId?: number;
	_watchState: "OFF" | "ACTIVE_LOCK" | "WAITING_ACTIVE" | "ACTIVE_ERROR" | "BACKGROUND" | "BACKGROUND_ERROR";
	_lastKnownPosition?: GeolocationPosition;
	_userLocationDotMarker: Marker;
	_accuracyCircleMarker: Marker;
	_accuracy: number;
	_setup: boolean;
	_heading?: number;
	_updateMarkerRotationThrottled?: () => number;
	_numberOfWatches: number;
	_noTimeout: boolean;
	_supportsGeolocation: boolean;
	constructor(options?: GeolocateControlOptions);
	onAdd(map: Map$1): HTMLElement;
	onRemove(): void;
	_checkGeolocationSupport(callback: (arg1: boolean) => void): void;
	/**
	 * Check if the Geolocation API Position is outside the map's `maxBounds`.
	 *
	 * @param {Position} position the Geolocation API Position
	 * @returns {boolean} Returns `true` if position is outside the map's `maxBounds`, otherwise returns `false`.
	 * @private
	 */
	_isOutOfMapMaxBounds(position: GeolocationPosition): boolean;
	_setErrorState(): void;
	/**
	 * When the Geolocation API returns a new location, update the `GeolocateControl`.
	 *
	 * @param {Position} position the Geolocation API Position
	 * @private
	 */
	_onSuccess(position: GeolocationPosition): void;
	/**
	 * Update the camera location to center on the current position
	 *
	 * @param {Position} position the Geolocation API Position
	 * @private
	 */
	_updateCamera(position: GeolocationPosition): void;
	/**
	 * Update the user location dot Marker to the current position
	 *
	 * @param {Position} [position] the Geolocation API Position
	 * @private
	 */
	_updateMarker(position?: GeolocationPosition | null): void;
	_updateCircleRadius(): void;
	_onZoom(): void;
	/**
	 * Update the user location dot Marker rotation to the current heading
	 *
	 * @private
	 */
	_updateMarkerRotation(): void;
	_onError(error: GeolocationPositionError): void;
	_finish(): void;
	_setupUI(supported: boolean): void;
	/**
	* Programmatically request and move the map to the user's location.
	*
	* @returns {boolean} Returns `false` if called before control was added to a map, otherwise returns `true`.
	* Called on a `deviceorientation` event.
	*
	* @param deviceOrientationEvent {DeviceOrientationEvent}
	* @private
	* @example
	* // Initialize the GeolocateControl.
	* var geolocate = new mapboxgl.GeolocateControl({
	*  positionOptions: {
	*    enableHighAccuracy: true
	*  },
	*  trackUserLocation: true
	* });
	* // Add the control to the map.
	* map.addControl(geolocate);
	* map.on('load', function() {
	*   geolocate.trigger();
	* });
	*/
	_onDeviceOrientation(deviceOrientationEvent: DeviceOrientationEvent$1): void;
	/**
	 * Trigger a geolocation event.
	 *
	 * @example
	 * // Initialize the geolocate control.
	 * const geolocate = new mapboxgl.GeolocateControl({
	 *     positionOptions: {
	 *         enableHighAccuracy: true
	 *     },
	 *     trackUserLocation: true
	 * });
	 * // Add the control to the map.
	 * map.addControl(geolocate);
	 * map.on('load', () => {
	 *     geolocate.trigger();
	 * });
	 * @returns {boolean} Returns `false` if called before control was added to a map, otherwise returns `true`.
	 */
	trigger(): boolean;
	_addDeviceOrientationListener(): void;
	_clearWatch(): void;
}
export type AttributionControlOptions = {
	compact?: boolean;
	customAttribution?: string | null | undefined | Array<string>;
};
/**
 * An `AttributionControl` control presents the map's [attribution information](https://docs.mapbox.com/help/how-mapbox-works/attribution/).
 * Add this control to a map using {@link Map#addControl}.
 *
 * @implements {IControl}
 * @param {Object} [options]
 * @param {boolean} [options.compact] If `true`, force a compact attribution that shows the full attribution on mouse hover. If `false`, force the full attribution control. The default is a responsive attribution that collapses when the map is less than 640 pixels wide. **Attribution should not be collapsed if it can comfortably fit on the map. `compact` should only be used to modify default attribution when map size makes it impossible to fit [default attribution](https://docs.mapbox.com/help/how-mapbox-works/attribution/) and when the automatic compact resizing for default settings are not sufficient**.
 * @param {string | Array<string>} [options.customAttribution] String or strings to show in addition to any other attributions. You can also set a custom attribution when initializing your map with {@link https://docs.mapbox.com/mapbox-gl-js/api/map/#map-parameters the customAttribution option}.
 * @example
 * const map = new mapboxgl.Map({attributionControl: false})
 *     .addControl(new mapboxgl.AttributionControl({
 *         customAttribution: 'Map design by me'
 *     }));
 */
export declare class AttributionControl implements IControl {
	options: AttributionControlOptions;
	_map: Map$1;
	_container: HTMLElement;
	_innerContainer: HTMLElement;
	_compactButton: HTMLButtonElement;
	_editLink?: HTMLAnchorElement;
	_attribHTML: string;
	styleId: string;
	styleOwner: string;
	constructor(options?: AttributionControlOptions);
	getDefaultPosition(): ControlPosition;
	onAdd(map: Map$1): HTMLElement;
	onRemove(): void;
	_setElementTitle(element: HTMLElement, title: string): void;
	_toggleAttribution(): void;
	_updateEditLink(): void;
	_updateData(e: any): void;
	_updateAttributions(): void;
	_updateCompact(): void;
}
type Unit = "imperial" | "metric" | "nautical";
export type ScaleControlOptions = {
	maxWidth?: number;
	unit?: Unit;
};
/**
 * A `ScaleControl` control displays the ratio of a distance on the map to the corresponding distance on the ground.
 * Add this control to a map using {@link Map#addControl}.
 *
 * @implements {IControl}
 * @param {Object} [options]
 * @param {number} [options.maxWidth='100'] The maximum length of the scale control in pixels.
 * @param {string} [options.unit='metric'] Unit of the distance (`'imperial'`, `'metric'` or `'nautical'`).
 * @example
 * const scale = new mapboxgl.ScaleControl({
 *     maxWidth: 80,
 *     unit: 'imperial'
 * });
 * map.addControl(scale);
 *
 * scale.setUnit('metric');
 */
export declare class ScaleControl implements IControl {
	_map: Map$1;
	_container: HTMLElement;
	_language?: string | string[];
	_isNumberFormatSupported: boolean;
	options: ScaleControlOptions;
	constructor(options?: ScaleControlOptions);
	getDefaultPosition(): ControlPosition;
	_update(): void;
	_setScale(maxWidth: number, maxDistance: number, unit: string): void;
	onAdd(map: Map$1): HTMLElement;
	onRemove(): void;
	_setLanguage(language?: string | string[]): void;
	/**
	 * Set the scale's unit of the distance.
	 *
	 * @param {'imperial' | 'metric' | 'nautical'} unit Unit of the distance (`'imperial'`, `'metric'` or `'nautical'`).
	 */
	setUnit(unit: Unit): void;
}
export type FullscreenControlOptions = {
	container?: HTMLElement;
};
/**
 * A `FullscreenControl` control contains a button for toggling the map in and out of fullscreen mode. See the `requestFullScreen` [compatibility table](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen#browser_compatibility) for supported browsers.
 * Add this control to a map using {@link Map#addControl}.
 *
 * @implements {IControl}
 * @param {Object} [options]
 * @param {HTMLElement} [options.container] `container` is the [compatible DOM element](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen#Compatible_elements) which should be made full screen. By default, the map container element will be made full screen.
 *
 * @example
 * map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}));
 * @see [Example: View a fullscreen map](https://www.mapbox.com/mapbox-gl-js/example/fullscreen/)
 */
export declare class FullscreenControl implements IControl {
	_map: Map$1;
	_controlContainer: HTMLElement;
	_fullscreen: boolean;
	_fullscreenchange: string;
	_fullscreenButton: HTMLElement;
	_container: HTMLElement;
	constructor(options?: FullscreenControlOptions);
	onAdd(map: Map$1): HTMLElement;
	onRemove(): void;
	_checkFullscreenSupport(): boolean;
	_setupUI(): void;
	_updateTitle(): void;
	_getTitle(): string;
	_isFullscreen(): boolean;
	_changeIcon(): void;
	_onClickFullscreen(): void;
}
declare function prewarm(): void;
declare function clearPrewarmedResources(): void;
/**
 * List of type aliases for partial backwards compatibility with @types/mapbox-gl.
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/5a4218ff5d0efa72761f5e740e501666e22261e0/types/mapbox-gl/index.d.ts
 */
/**
 * @deprecated Use `MapOptions` instead.
 */
export type MapboxOptions = MapOptions;
/**
 * @deprecated Use `MapEvent` instead.
 */
export type MapboxEvent = MapEvent;
/**
 * @deprecated Use `ErrorEvent` instead.
 */
export type MapboxErrorEvent = ErrorEvent$1;
/**
 * @deprecated Use `MapMouseEvent` instead.
 */
export type MapLayerMouseEvent = MapMouseEvent;
/**
 * @deprecated Use `MapTouchEvent` instead.
 */
export type MapLayerTouchEvent = MapTouchEvent;
/**
 * @deprecated Use `RequestTransformFunction` instead.
*/
export type TransformRequestFunction = RequestTransformFunction;
/**
 * @deprecated Use `GeoJSONFeature` instead.
*/
export type MapboxGeoJSONFeature = GeoJSONFeature;
/**
 * @deprecated Use `GeoJSONFeature` instead.
*/
export type QueryFeature = GeoJSONFeature;
/**
 * @deprecated Use `MapOptions['fitBoundsOptions']` instead.
*/
export type FitBoundsOptions = MapOptions["fitBoundsOptions"];
/**
 * @deprecated Use `FeatureSelector` instead.
*/
export type FeatureIdentifier = FeatureSelector;
/**
 * @deprecated Use `Source` instead.
*/
export type AnySourceImpl = Source;
/**
 * @deprecated Use `VectorTileSource` instead.
*/
export type VectorSourceImpl = VectorTileSource;
/**
 * @deprecated Use `RasterTileSource` instead.
*/
export type RasterSourceImpl = RasterTileSource;
declare const exported: {
	version: string;
	supported: import("@mapbox/mapbox-gl-supported").IsSupported;
	setRTLTextPlugin: (url: string, callback?: Callback<{
		err: Error | null | undefined;
	}> | null, deferred?: boolean) => void;
	getRTLTextPluginStatus: () => PluginStatus;
	Map: typeof Map$1;
	NavigationControl: typeof NavigationControl;
	GeolocateControl: typeof GeolocateControl;
	AttributionControl: typeof AttributionControl;
	ScaleControl: typeof ScaleControl;
	FullscreenControl: typeof FullscreenControl;
	Popup: typeof Popup;
	Marker: typeof Marker;
	Style: typeof Style$1;
	LngLat: typeof LngLat;
	LngLatBounds: typeof LngLatBounds;
	Point: typeof Point;
	MercatorCoordinate: typeof MercatorCoordinate;
	FreeCameraOptions: typeof FreeCameraOptions;
	Evented: typeof Evented;
	config: {
		API_URL: string;
		API_URL_REGEX: RegExp;
		API_TILEJSON_REGEX: RegExp;
		API_FONTS_REGEX: RegExp;
		API_SPRITE_REGEX: RegExp;
		API_STYLE_REGEX: RegExp;
		API_CDN_URL_REGEX: RegExp;
		EVENTS_URL: string | null | undefined;
		SESSION_PATH: string;
		FEEDBACK_URL: string;
		REQUIRE_ACCESS_TOKEN: boolean;
		TILE_URL_VERSION: string;
		RASTER_URL_PREFIX: string;
		RASTERARRAYS_URL_PREFIX: string;
		ACCESS_TOKEN: string | null | undefined;
		MAX_PARALLEL_IMAGE_REQUESTS: number;
		DRACO_URL: string;
		MESHOPT_URL: string;
		MESHOPT_SIMD_URL: string;
		DEFAULT_STYLE: string;
		GLYPHS_URL: string;
		TILES3D_URL_PREFIX: string;
	};
	/**
	 * Initializes resources like WebWorkers that can be shared across maps to lower load
	 * times in some situations. [`mapboxgl.workerUrl`](https://docs.mapbox.com/mapbox-gl-js/api/properties/#workerurl)
	 * and [`mapboxgl.workerCount`](https://docs.mapbox.com/mapbox-gl-js/api/properties/#workercount), if being
	 * used, must be set before `prewarm()` is called to have an effect.
	 *
	 * By default, the lifecycle of these resources is managed automatically, and they are
	 * lazily initialized when a `Map` is first created. Invoking `prewarm()` creates these
	 * resources ahead of time and ensures they are not cleared when the last `Map`
	 * is removed from the page. This allows them to be re-used by new `Map` instances that
	 * are created later. They can be manually cleared by calling
	 * [`mapboxgl.clearPrewarmedResources()`](https://docs.mapbox.com/mapbox-gl-js/api/properties/#clearprewarmedresources).
	 * This is only necessary if your web page remains active but stops using maps altogether.
	 * `prewarm()` is idempotent and has guards against being executed multiple times,
	 * and any resources allocated by `prewarm()` are created synchronously.
	 *
	 * This is primarily useful when using Mapbox GL JS maps in a single page app,
	 * in which a user navigates between various views, resulting in
	 * constant creation and destruction of `Map` instances.
	 *
	 * @function prewarm
	 * @example
	 * mapboxgl.prewarm();
	 */
	prewarm: typeof prewarm;
	/**
	 * Clears up resources that have previously been created by [`mapboxgl.prewarm()](https://docs.mapbox.com/mapbox-gl-js/api/properties/#prewarm)`.
	 * Note that this is typically not necessary. You should only call this function
	 * if you expect the user of your app to not return to a Map view at any point
	 * in your application.
	 *
	 * @function clearPrewarmedResources
	 * @example
	 * mapboxgl.clearPrewarmedResources();
	 */
	clearPrewarmedResources: typeof clearPrewarmedResources;
	/**
	 * Gets and sets the map's [access token](https://www.mapbox.com/help/define-access-token/).
	 *
	 * @var {string} accessToken
	 * @returns {string} The currently set access token.
	 * @example
	 * mapboxgl.accessToken = myAccessToken;
	 * @see [Example: Display a map](https://www.mapbox.com/mapbox-gl-js/example/simple-map/)
	 */
	accessToken: string;
	/**
	 * Gets and sets the map's default API URL for requesting tiles, styles, sprites, and glyphs.
	 *
	 * @var {string} baseApiUrl
	 * @returns {string} The current base API URL.
	 * @example
	 * mapboxgl.baseApiUrl = 'https://api.mapbox.com';
	 */
	baseApiUrl: string;
	/**
	 * Gets and sets the number of web workers instantiated on a page with Mapbox GL JS maps.
	 * By default, it is set to 2.
	 * Make sure to set this property before creating any map instances for it to have effect.
	 *
	 * @var {string} workerCount
	 * @returns {number} Number of workers currently configured.
	 * @example
	 * mapboxgl.workerCount = 4;
	 */
	workerCount: number;
	/**
	 * Gets and sets the maximum number of images (raster tiles, sprites, icons) to load in parallel.
	 * 16 by default. There is no maximum value, but the number of images affects performance in raster-heavy maps.
	 *
	 * @var {string} maxParallelImageRequests
	 * @returns {number} Number of parallel requests currently configured.
	 * @example
	 * mapboxgl.maxParallelImageRequests = 10;
	 */
	maxParallelImageRequests: number;
	/**
	 * Clears browser storage used by this library. Using this method flushes the Mapbox tile
	 * cache that is managed by this library. Tiles may still be cached by the browser
	 * in some cases.
	 *
	 * This API is supported on browsers where the [`Cache` API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
	 * is supported and enabled. This includes all major browsers when pages are served over
	 * `https://`, except Internet Explorer and Edge Mobile.
	 *
	 * When called in unsupported browsers or environments (private or incognito mode), the
	 * callback will be called with an error argument.
	 *
	 * @function clearStorage
	 * @param {Function} callback Called with an error argument if there is an error.
	 * @example
	 * mapboxgl.clearStorage();
	 */
	clearStorage(callback?: (err?: Error | null | undefined) => void): void;
	/**
	 * Provides an interface for loading mapbox-gl's WebWorker bundle from a self-hosted URL.
	 * This needs to be set only once, and before any call to `new mapboxgl.Map(..)` takes place.
	 * This is useful if your site needs to operate in a strict CSP (Content Security Policy) environment
	 * wherein you are not allowed to load JavaScript code from a [`Blob` URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL), which is default behavior.
	 *
	 * See our documentation on [CSP Directives](https://docs.mapbox.com/mapbox-gl-js/api/#csp-directives) for more details.
	 *
	 * @var {string} workerUrl
	 * @returns {string} A URL hosting a JavaScript bundle for mapbox-gl's WebWorker.
	 * @example
	 * <script src='https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl-csp.js'></script>
	 * <script>
	 * mapboxgl.workerUrl = "https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl-csp-worker.js";
	 * ...
	 * </script>
	 */
	workerUrl: string;
	/**
	 * Provides an interface for external module bundlers such as Webpack or Rollup to package
	 * mapbox-gl's WebWorker into a separate class and integrate it with the library.
	 *
	 * Takes precedence over `mapboxgl.workerUrl`.
	 *
	 * @var {Object} workerClass
	 * @returns {Object | null} A class that implements the `Worker` interface.
	 * @example
	 * import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
	 * import MapboxGLWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';
	 *
	 * mapboxgl.workerClass = MapboxGLWorker;
	 */
	workerClass: any;
	workerParams: any;
	/**
	 * Provides an interface for loading Draco decoding library (draco_decoder_gltf.wasm v1.5.6) from a self-hosted URL.
	 * This needs to be set only once, and before any call to `new mapboxgl.Map(..)` takes place.
	 * This is useful if your site needs to operate in a strict CSP (Content Security Policy) environment
	 * wherein you are not allowed to load JavaScript code from a [`Blob` URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL), which is default behavior.
	 *
	 * See our documentation on [CSP Directives](https://docs.mapbox.com/mapbox-gl-js/api/#csp-directives) for more details.
	 *
	 * @var {string} dracoUrl
	 * @returns {string} A URL hosting Google Draco decoding library (`draco_wasm_wrapper_gltf.js` and `draco_decoder_gltf.wasm`).
	 * @example
	 * <script src='https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.js'></script>
	 * <script>
	 * mapboxgl.dracoUrl = "https://www.gstatic.com/draco/versioned/decoders/1.5.6/draco_decoder_gltf.wasm";
	 * ...
	 * </script>
	 */
	dracoUrl: string;
	meshoptUrl: string;
	/**
	 * Sets the time used by Mapbox GL JS internally for all animations. Useful for generating videos from Mapbox GL JS.
	 *
	 * @var {number} time
	 */
	setNow: (time: number) => void;
	/**
	 * Restores the internal animation timing to follow regular computer time (`performance.now()`).
	 */
	restoreNow: () => void;
};

export {
	Anchor$1 as Anchor,
	ErrorEvent$1 as ErrorEvent,
	Event$1 as Event,
	Map$1 as Map,
	Point,
	RasterDEMTileSource as RasterDemTileSource,
	exported as default,
};

export as namespace mapboxgl;

export {};
