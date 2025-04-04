import Point from '@mapbox/point-geometry';

type StyleReference = Record<any, any>;
declare const _default: StyleReference;
/**
 * Format a Mapbox GL Style.  Returns a stringified style with its keys
 * sorted in the same order as the reference style.
 *
 * The optional `space` argument is passed to
 * [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
 * to generate formatted output.
 *
 * If `space` is unspecified, a default of `2` spaces will be used.
 *
 * @private
 * @param {Object} style a Mapbox GL Style
 * @param {number} [space] space argument to pass to `JSON.stringify`
 * @returns {string} stringified formatted JSON
 * @example
 * var fs = require('fs');
 * var format = require('mapbox-gl-style-spec').format;
 * var style = fs.readFileSync('./source.json', 'utf8');
 * fs.writeFileSync('./dest.json', format(style));
 * fs.writeFileSync('./dest.min.json', format(style, 0));
 */
export declare function format(style: any, space?: number): string;
/**
 * Migrate a Mapbox GL Style to the latest version.
 *
 * @private
 * @alias migrate
 * @param {object} style a Mapbox GL Style
 * @returns {Object} a migrated style
 * @example
 * var fs = require('fs');
 * var migrate = require('mapbox-gl-style-spec').migrate;
 * var style = fs.readFileSync('./style.json', 'utf8');
 * fs.writeFileSync('./style.json', JSON.stringify(migrate(style)));
 */
declare function _default$1(style: any): any;
declare function _default$2(style: any): any;
type ColorSpecification = string;
type FormattedSpecification = string;
type ResolvedImageSpecification = string;
type PromoteIdSpecification = {
	[_: string]: string;
} | string;
type FilterSpecification = ExpressionSpecification | [
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
type TransitionSpecification = {
	duration?: number;
	delay?: number;
};
type PropertyFunctionStop<T> = [
	number,
	T
];
type ZoomAndPropertyFunctionStop<T> = [
	{
		zoom: number;
		value: string | number | boolean;
	},
	T
];
type FunctionSpecification<T> = {
	stops: Array<PropertyFunctionStop<T> | ZoomAndPropertyFunctionStop<T>>;
	base?: number;
	property?: string;
	type?: "identity" | "exponential" | "interval" | "categorical";
	colorSpace?: "rgb" | "lab" | "hcl";
	default?: T;
};
type CameraFunctionSpecification<T> = {
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
type SourceFunctionSpecification<T> = {
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
type CompositeFunctionSpecification<T> = {
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
type ExpressionSpecification = [
	string,
	...any[]
];
type PropertyValueSpecification<T> = T | CameraFunctionSpecification<T> | ExpressionSpecification;
type DataDrivenPropertyValueSpecification<T> = T | FunctionSpecification<T> | CameraFunctionSpecification<T> | SourceFunctionSpecification<T> | CompositeFunctionSpecification<T> | ExpressionSpecification | (T extends Array<infer U> ? Array<U | ExpressionSpecification> : never);
type StyleSpecification = {
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
	/**
	 * @experimental This property is experimental and subject to change in future versions.
	 */
	"snow"?: SnowSpecification;
	/**
	 * @experimental This property is experimental and subject to change in future versions.
	 */
	"rain"?: RainSpecification;
	"camera"?: CameraSpecification;
	"color-theme"?: ColorThemeSpecification;
	/**
	 * @experimental This property is experimental and subject to change in future versions.
	 */
	"indoor"?: IndoorSpecification;
	"imports"?: Array<ImportSpecification>;
	"schema"?: SchemaSpecification;
	"sources": SourcesSpecification;
	"sprite"?: string;
	"glyphs"?: string;
	"transition"?: TransitionSpecification;
	"projection"?: ProjectionSpecification;
	"layers": Array<LayerSpecification>;
	"models"?: ModelsSpecification;
	/**
	 * @experimental This property is experimental and subject to change in future versions.
	 */
	"featuresets"?: FeaturesetsSpecification;
};
type SourcesSpecification = {
	[_: string]: SourceSpecification;
};
type ModelsSpecification = {
	[_: string]: ModelSpecification;
};
type LightSpecification = {
	"anchor"?: PropertyValueSpecification<"map" | "viewport">;
	"position"?: PropertyValueSpecification<[
		number,
		number,
		number
	]>;
	"position-transition"?: TransitionSpecification;
	"color"?: PropertyValueSpecification<ColorSpecification>;
	"color-transition"?: TransitionSpecification;
	"color-use-theme"?: PropertyValueSpecification<string>;
	"intensity"?: PropertyValueSpecification<number>;
	"intensity-transition"?: TransitionSpecification;
};
type TerrainSpecification = {
	"source": string;
	"exaggeration"?: PropertyValueSpecification<number>;
	"exaggeration-transition"?: TransitionSpecification;
};
type FogSpecification = {
	"range"?: PropertyValueSpecification<[
		number,
		number
	]>;
	"range-transition"?: TransitionSpecification;
	"color"?: PropertyValueSpecification<ColorSpecification>;
	"color-transition"?: TransitionSpecification;
	"color-use-theme"?: PropertyValueSpecification<string>;
	"high-color"?: PropertyValueSpecification<ColorSpecification>;
	"high-color-transition"?: TransitionSpecification;
	"high-color-use-theme"?: PropertyValueSpecification<string>;
	"space-color"?: PropertyValueSpecification<ColorSpecification>;
	"space-color-transition"?: TransitionSpecification;
	"space-color-use-theme"?: PropertyValueSpecification<string>;
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
type SnowSpecification = {
	"density"?: PropertyValueSpecification<number>;
	"density-transition"?: TransitionSpecification;
	"intensity"?: PropertyValueSpecification<number>;
	"intensity-transition"?: TransitionSpecification;
	"color"?: PropertyValueSpecification<ColorSpecification>;
	"color-transition"?: TransitionSpecification;
	"color-use-theme"?: PropertyValueSpecification<string>;
	"opacity"?: PropertyValueSpecification<number>;
	"opacity-transition"?: TransitionSpecification;
	"vignette"?: PropertyValueSpecification<number>;
	"vignette-transition"?: TransitionSpecification;
	"vignette-color"?: PropertyValueSpecification<ColorSpecification>;
	"vignette-color-transition"?: TransitionSpecification;
	"vignette-color-use-theme"?: PropertyValueSpecification<string>;
	"center-thinning"?: PropertyValueSpecification<number>;
	"center-thinning-transition"?: TransitionSpecification;
	"direction"?: PropertyValueSpecification<[
		number,
		number
	]>;
	"direction-transition"?: TransitionSpecification;
	"flake-size"?: PropertyValueSpecification<number>;
	"flake-size-transition"?: TransitionSpecification;
};
type RainSpecification = {
	"density"?: PropertyValueSpecification<number>;
	"density-transition"?: TransitionSpecification;
	"intensity"?: PropertyValueSpecification<number>;
	"intensity-transition"?: TransitionSpecification;
	"color"?: PropertyValueSpecification<ColorSpecification>;
	"color-transition"?: TransitionSpecification;
	"color-use-theme"?: PropertyValueSpecification<string>;
	"opacity"?: PropertyValueSpecification<number>;
	"opacity-transition"?: TransitionSpecification;
	"vignette"?: PropertyValueSpecification<number>;
	"vignette-transition"?: TransitionSpecification;
	"vignette-color"?: PropertyValueSpecification<ColorSpecification>;
	"vignette-color-transition"?: TransitionSpecification;
	"vignette-color-use-theme"?: PropertyValueSpecification<string>;
	"center-thinning"?: PropertyValueSpecification<number>;
	"center-thinning-transition"?: TransitionSpecification;
	"direction"?: PropertyValueSpecification<[
		number,
		number
	]>;
	"direction-transition"?: TransitionSpecification;
	"droplet-size"?: PropertyValueSpecification<[
		number,
		number
	]>;
	"droplet-size-transition"?: TransitionSpecification;
	"distortion-strength"?: PropertyValueSpecification<number>;
	"distortion-strength-transition"?: TransitionSpecification;
};
type CameraSpecification = {
	"camera-projection"?: PropertyValueSpecification<"perspective" | "orthographic">;
	"camera-projection-transition"?: TransitionSpecification;
};
type ColorThemeSpecification = {
	"data"?: ExpressionSpecification;
};
type ProjectionSpecification = {
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
type ImportSpecification = {
	"id": string;
	"url": string;
	"config"?: ConfigSpecification;
	"data"?: StyleSpecification;
	"color-theme"?: ColorThemeSpecification | null | undefined;
};
type IndoorSpecification = {
	/**
	 * @experimental This property is experimental and subject to change in future versions.
	 */
	"floorplanFeaturesetId"?: ExpressionSpecification;
	/**
	 * @experimental This property is experimental and subject to change in future versions.
	 */
	"buildingFeaturesetId"?: ExpressionSpecification;
};
type ConfigSpecification = {
	[_: string]: unknown;
};
type SchemaSpecification = {
	[_: string]: OptionSpecification;
};
type OptionSpecification = {
	"default": ExpressionSpecification;
	"type"?: "string" | "number" | "boolean" | "color";
	"array"?: boolean;
	"minValue"?: number;
	"maxValue"?: number;
	"stepValue"?: number;
	"values"?: Array<unknown>;
	"metadata"?: unknown;
};
type FeaturesetsSpecification = {
	[_: string]: FeaturesetSpecification;
};
type FeaturesetSpecification = {
	"metadata"?: unknown;
	"selectors"?: Array<SelectorSpecification>;
};
type SelectorSpecification = {
	"layer": string;
	"properties"?: SelectorPropertySpecification;
	"featureNamespace"?: string;
};
type SelectorPropertySpecification = {
	[_: string]: unknown;
};
type VectorSourceSpecification = {
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
type RasterSourceSpecification = {
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
type RasterDEMSourceSpecification = {
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
type RasterArraySourceSpecification = {
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
type GeoJSONSourceSpecification = {
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
type VideoSourceSpecification = {
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
type ImageSourceSpecification = {
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
type ModelSourceSpecification = {
	"type": "model" | "batched-model";
	"maxzoom"?: number;
	"minzoom"?: number;
	"tiles"?: Array<string>;
};
type SourceSpecification = VectorSourceSpecification | RasterSourceSpecification | RasterDEMSourceSpecification | RasterArraySourceSpecification | GeoJSONSourceSpecification | VideoSourceSpecification | ImageSourceSpecification | ModelSourceSpecification;
type ModelSpecification = string;
type AmbientLightSpecification = {
	"id": string;
	"properties"?: {
		"color"?: PropertyValueSpecification<ColorSpecification>;
		"color-transition"?: TransitionSpecification;
		"color-use-theme"?: PropertyValueSpecification<string>;
		"intensity"?: PropertyValueSpecification<number>;
		"intensity-transition"?: TransitionSpecification;
	};
	"type": "ambient";
};
type DirectionalLightSpecification = {
	"id": string;
	"properties"?: {
		"direction"?: PropertyValueSpecification<[
			number,
			number
		]>;
		"direction-transition"?: TransitionSpecification;
		"color"?: PropertyValueSpecification<ColorSpecification>;
		"color-transition"?: TransitionSpecification;
		"color-use-theme"?: PropertyValueSpecification<string>;
		"intensity"?: PropertyValueSpecification<number>;
		"intensity-transition"?: TransitionSpecification;
		"cast-shadows"?: boolean;
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"shadow-quality"?: PropertyValueSpecification<number>;
		"shadow-intensity"?: PropertyValueSpecification<number>;
		"shadow-intensity-transition"?: TransitionSpecification;
	};
	"type": "directional";
};
type FlatLightSpecification = {
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
		"color-use-theme"?: PropertyValueSpecification<string>;
		"intensity"?: PropertyValueSpecification<number>;
		"intensity-transition"?: TransitionSpecification;
	};
	"type": "flat";
};
type LightsSpecification = AmbientLightSpecification | DirectionalLightSpecification | FlatLightSpecification;
type FillLayerSpecification = {
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
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"fill-elevation-reference"?: "none" | "hd-road-base" | "hd-road-markup" | ExpressionSpecification;
	};
	"paint"?: {
		"fill-antialias"?: PropertyValueSpecification<boolean>;
		"fill-opacity"?: DataDrivenPropertyValueSpecification<number>;
		"fill-opacity-transition"?: TransitionSpecification;
		"fill-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"fill-color-transition"?: TransitionSpecification;
		"fill-color-use-theme"?: PropertyValueSpecification<string>;
		"fill-outline-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"fill-outline-color-transition"?: TransitionSpecification;
		"fill-outline-color-use-theme"?: PropertyValueSpecification<string>;
		"fill-translate"?: PropertyValueSpecification<[
			number,
			number
		]>;
		"fill-translate-transition"?: TransitionSpecification;
		"fill-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
		"fill-pattern"?: DataDrivenPropertyValueSpecification<ResolvedImageSpecification>;
		"fill-emissive-strength"?: PropertyValueSpecification<number>;
		"fill-emissive-strength-transition"?: TransitionSpecification;
		"fill-z-offset"?: DataDrivenPropertyValueSpecification<number>;
		"fill-z-offset-transition"?: TransitionSpecification;
	};
};
type LineLayerSpecification = {
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
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"line-elevation-reference"?: "none" | "sea" | "ground" | "hd-road-markup" | ExpressionSpecification;
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"line-cross-slope"?: ExpressionSpecification;
		"visibility"?: "visible" | "none" | ExpressionSpecification;
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"line-width-unit"?: PropertyValueSpecification<"pixels" | "meters">;
	};
	"paint"?: {
		"line-opacity"?: DataDrivenPropertyValueSpecification<number>;
		"line-opacity-transition"?: TransitionSpecification;
		"line-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"line-color-transition"?: TransitionSpecification;
		"line-color-use-theme"?: PropertyValueSpecification<string>;
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
		"line-gradient-use-theme"?: PropertyValueSpecification<string>;
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
		"line-trim-color-use-theme"?: PropertyValueSpecification<string>;
		"line-emissive-strength"?: PropertyValueSpecification<number>;
		"line-emissive-strength-transition"?: TransitionSpecification;
		"line-border-width"?: DataDrivenPropertyValueSpecification<number>;
		"line-border-width-transition"?: TransitionSpecification;
		"line-border-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"line-border-color-transition"?: TransitionSpecification;
		"line-border-color-use-theme"?: PropertyValueSpecification<string>;
		"line-occlusion-opacity"?: PropertyValueSpecification<number>;
		"line-occlusion-opacity-transition"?: TransitionSpecification;
	};
};
type SymbolLayerSpecification = {
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
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"symbol-elevation-reference"?: PropertyValueSpecification<"sea" | "ground" | "hd-road-markup">;
		"icon-allow-overlap"?: PropertyValueSpecification<boolean>;
		"icon-ignore-placement"?: PropertyValueSpecification<boolean>;
		"icon-optional"?: PropertyValueSpecification<boolean>;
		"icon-rotation-alignment"?: PropertyValueSpecification<"map" | "viewport" | "auto">;
		"icon-size"?: DataDrivenPropertyValueSpecification<number>;
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"icon-size-scale-range"?: ExpressionSpecification;
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
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"text-size-scale-range"?: ExpressionSpecification;
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
		"icon-color-use-theme"?: PropertyValueSpecification<string>;
		"icon-halo-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"icon-halo-color-transition"?: TransitionSpecification;
		"icon-halo-color-use-theme"?: PropertyValueSpecification<string>;
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
		"text-color-use-theme"?: PropertyValueSpecification<string>;
		"text-halo-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
		"text-halo-color-transition"?: TransitionSpecification;
		"text-halo-color-use-theme"?: PropertyValueSpecification<string>;
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
		"symbol-z-offset"?: DataDrivenPropertyValueSpecification<number>;
		"symbol-z-offset-transition"?: TransitionSpecification;
	};
};
type CircleLayerSpecification = {
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
		"circle-color-use-theme"?: PropertyValueSpecification<string>;
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
		"circle-stroke-color-use-theme"?: PropertyValueSpecification<string>;
		"circle-stroke-opacity"?: DataDrivenPropertyValueSpecification<number>;
		"circle-stroke-opacity-transition"?: TransitionSpecification;
		"circle-emissive-strength"?: PropertyValueSpecification<number>;
		"circle-emissive-strength-transition"?: TransitionSpecification;
	};
};
type HeatmapLayerSpecification = {
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
		"heatmap-color-use-theme"?: PropertyValueSpecification<string>;
		"heatmap-opacity"?: PropertyValueSpecification<number>;
		"heatmap-opacity-transition"?: TransitionSpecification;
	};
};
type FillExtrusionLayerSpecification = {
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
		"fill-extrusion-color-use-theme"?: PropertyValueSpecification<string>;
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
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"fill-extrusion-height-alignment"?: "terrain" | "flat";
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"fill-extrusion-base-alignment"?: "terrain" | "flat";
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
		"fill-extrusion-flood-light-color-use-theme"?: PropertyValueSpecification<string>;
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
		"fill-extrusion-emissive-strength"?: DataDrivenPropertyValueSpecification<number>;
		"fill-extrusion-emissive-strength-transition"?: TransitionSpecification;
		"fill-extrusion-line-width"?: DataDrivenPropertyValueSpecification<number>;
		"fill-extrusion-line-width-transition"?: TransitionSpecification;
		"fill-extrusion-cast-shadows"?: boolean;
	};
};
type RasterLayerSpecification = {
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
		"raster-color-use-theme"?: PropertyValueSpecification<string>;
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
type RasterParticleLayerSpecification = {
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
		"raster-particle-color-use-theme"?: PropertyValueSpecification<string>;
		"raster-particle-max-speed"?: number;
		"raster-particle-speed-factor"?: PropertyValueSpecification<number>;
		"raster-particle-speed-factor-transition"?: TransitionSpecification;
		"raster-particle-fade-opacity-factor"?: PropertyValueSpecification<number>;
		"raster-particle-fade-opacity-factor-transition"?: TransitionSpecification;
		"raster-particle-reset-rate-factor"?: number;
		"raster-particle-elevation"?: PropertyValueSpecification<number>;
		"raster-particle-elevation-transition"?: TransitionSpecification;
	};
};
type HillshadeLayerSpecification = {
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
		"hillshade-shadow-color-use-theme"?: PropertyValueSpecification<string>;
		"hillshade-highlight-color"?: PropertyValueSpecification<ColorSpecification>;
		"hillshade-highlight-color-transition"?: TransitionSpecification;
		"hillshade-highlight-color-use-theme"?: PropertyValueSpecification<string>;
		"hillshade-accent-color"?: PropertyValueSpecification<ColorSpecification>;
		"hillshade-accent-color-transition"?: TransitionSpecification;
		"hillshade-accent-color-use-theme"?: PropertyValueSpecification<string>;
		"hillshade-emissive-strength"?: PropertyValueSpecification<number>;
		"hillshade-emissive-strength-transition"?: TransitionSpecification;
	};
};
type ModelLayerSpecification = {
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
		"model-opacity"?: DataDrivenPropertyValueSpecification<number>;
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
		"model-color-use-theme"?: PropertyValueSpecification<string>;
		"model-color-mix-intensity"?: DataDrivenPropertyValueSpecification<number>;
		"model-color-mix-intensity-transition"?: TransitionSpecification;
		"model-type"?: "common-3d" | "location-indicator";
		"model-cast-shadows"?: boolean;
		"model-receive-shadows"?: boolean;
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
type BackgroundLayerSpecification = {
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
		/**
		 * @experimental This property is experimental and subject to change in future versions.
		 */
		"background-pitch-alignment"?: "map" | "viewport" | ExpressionSpecification;
		"background-color"?: PropertyValueSpecification<ColorSpecification>;
		"background-color-transition"?: TransitionSpecification;
		"background-color-use-theme"?: PropertyValueSpecification<string>;
		"background-pattern"?: PropertyValueSpecification<ResolvedImageSpecification>;
		"background-opacity"?: PropertyValueSpecification<number>;
		"background-opacity-transition"?: TransitionSpecification;
		"background-emissive-strength"?: PropertyValueSpecification<number>;
		"background-emissive-strength-transition"?: TransitionSpecification;
	};
};
type SkyLayerSpecification = {
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
		"sky-gradient-use-theme"?: PropertyValueSpecification<string>;
		"sky-atmosphere-halo-color"?: ColorSpecification;
		"sky-atmosphere-halo-color-use-theme"?: PropertyValueSpecification<string>;
		"sky-atmosphere-color"?: ColorSpecification;
		"sky-atmosphere-color-use-theme"?: PropertyValueSpecification<string>;
		"sky-opacity"?: PropertyValueSpecification<number>;
		"sky-opacity-transition"?: TransitionSpecification;
	};
};
type SlotLayerSpecification = {
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
type ClipLayerSpecification = {
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
		"clip-layer-types"?: ExpressionSpecification;
		"clip-layer-scope"?: ExpressionSpecification;
	};
	"paint"?: never;
};
type LayerSpecification = FillLayerSpecification | LineLayerSpecification | SymbolLayerSpecification | CircleLayerSpecification | HeatmapLayerSpecification | FillExtrusionLayerSpecification | RasterLayerSpecification | RasterParticleLayerSpecification | HillshadeLayerSpecification | ModelLayerSpecification | BackgroundLayerSpecification | SkyLayerSpecification | SlotLayerSpecification | ClipLayerSpecification;
/**
 * Given an array of layers, some of which may contain `ref` properties
 * whose value is the `id` of another property, return a new array where
 * such layers have been augmented with the 'type', 'source', etc. properties
 * from the parent layer, and the `ref` property has been removed.
 *
 * The input is not modified. The output may contain references to portions
 * of the input.
 *
 * @private
 * @param {Array<Layer>} layers
 * @returns {Array<Layer>}
 */
export function derefLayers(layers: Array<LayerSpecification>): Array<LayerSpecification>;
type Command = {
	command: string;
	args: Array<any>;
};
/**
 * Diff two stylesheet
 *
 * Creates semanticly aware diffs that can easily be applied at runtime.
 * Operations produced by the diff closely resemble the mapbox-gl-js API. Any
 * error creating the diff will fall back to the 'setStyle' operation.
 *
 * Example diff:
 * [
 *     { command: 'setConstant', args: ['@water', '#0000FF'] },
 *     { command: 'setPaintProperty', args: ['background', 'background-color', 'black'] }
 * ]
 *
 * @private
 * @param {*} [before] stylesheet to compare from
 * @param {*} after stylesheet to compare to
 * @returns Array list of changes
 */
declare function diffStyles(before: StyleSpecification, after: StyleSpecification): Array<Command>;
export declare class ValidationError {
	message: string;
	identifier: string | null | undefined;
	line: number | null | undefined;
	constructor(key: string | null | undefined, value: {
		__line__: number;
	} | null | undefined, message: string, identifier?: string | null);
}
export declare class ParsingError {
	message: string;
	error: Error;
	line: number;
	constructor(error: Error);
}
declare class ParsingError$1 extends Error {
	key: string;
	message: string;
	constructor(key: string, message: string);
}
type LUT = {
	image: {
		width: number;
		height: number;
		data: Uint8Array;
	};
};
/**
 * An RGBA color value. Create instances from color strings using the static
 * method `Color.parse`. The constructor accepts RGB channel values in the range
 * `[0, 1]`, premultiplied by A.
 *
 * @param {number} r The red channel.
 * @param {number} g The green channel.
 * @param {number} b The blue channel.
 * @param {number} a The alpha channel.
 * @private
 */
export declare class Color {
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
	toStringPremultipliedAlpha(): string;
	toString(): string;
	toRenderColor(lut: LUT | null): RenderColor;
	clone(): Color;
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
	 * Returns an HSLA array of values representing the color, unpremultiplied by A.
	 *
	 * @returns An array of HSLA color values.
	 */
	toHslaArray(): [
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
declare class Collator {
	locale: string | null;
	sensitivity: "base" | "accent" | "case" | "variant";
	collator: Intl.Collator;
	constructor(caseSensitive: boolean, diacriticSensitive: boolean, locale: string | null);
	compare(lhs: string, rhs: string): number;
	resolvedLocale(): string;
}
declare class ImageIdWithOptions {
	id: string;
	options: RasterizationOptions;
	constructor(id: string, options?: RasterizationOptions);
	static deserializeId(serialized: string): string;
	static deserializeFromString(serialized: string): ImageIdWithOptions;
	scaleSelf(factor: number): this;
	serialize(): string;
}
type RasterizationOptions = {
	params: Record<string, Color>;
	transform?: DOMMatrix;
};
type ResolvedImageOptions = {
	namePrimary: string;
	optionsPrimary: RasterizationOptions | null | undefined;
	nameSecondary: string | null | undefined;
	optionsSecondary: RasterizationOptions | null | undefined;
	available: boolean;
};
declare class ResolvedImage {
	namePrimary: string;
	optionsPrimary: RasterizationOptions | null | undefined;
	nameSecondary: string | null | undefined;
	optionsSecondary: RasterizationOptions | null | undefined;
	available: boolean;
	constructor(options: ResolvedImageOptions);
	toString(): string;
	getPrimary(): ImageIdWithOptions;
	getSerializedPrimary(): string;
	getSecondary(): ImageIdWithOptions | null;
	static from(image: string | ResolvedImage): ResolvedImage;
	static build(namePrimary: string, nameSecondary?: string | null, optionsPrimary?: RasterizationOptions | null, optionsSecondary?: RasterizationOptions | null): ResolvedImage | null;
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
type EvaluationKind = "constant" | "source" | "camera" | "composite";
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
type CanonicalTileID = {
	z: number;
	x: number;
	y: number;
};
type SerializedExpression = Array<unknown> | Array<string> | string | number | boolean | null;
interface Expression {
	readonly type: Type;
	value?: any;
	evaluate: (ctx: EvaluationContext) => any;
	eachChild: (fn: (arg1: Expression) => void) => void;
	/**
	  * Statically analyze the expression, attempting to enumerate possible outputs. Returns
	  * false if the complete set of outputs is statically undecidable, otherwise true.
	  */
	outputDefined: () => boolean;
	serialize: () => SerializedExpression;
}
type ConfigOptionValue = {
	default: Expression;
	value?: Expression;
	values?: Array<unknown>;
	minValue?: number;
	maxValue?: number;
	stepValue?: number;
	type?: "string" | "number" | "boolean" | "color";
};
type ConfigOptions = Map<string, ConfigOptionValue>;
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
type FilterExpression = (globalProperties: GlobalProperties, feature: Feature, canonical?: CanonicalTileID, featureTileCoord?: Point, featureDistanceData?: FeatureDistanceData) => boolean;
type FeatureFilter = {
	filter: FilterExpression;
	dynamicFilter?: FilterExpression;
	needGeometry: boolean;
	needFeature: boolean;
};
declare function isExpressionFilter(filter: unknown): boolean;
/**
 * Given a filter expressed as nested arrays, return a new function
 * that evaluates whether a given feature (with a .properties or .tags property)
 * passes its test.
 *
 * @private
 * @param {Array} filter mapbox gl filter
 * @param {string} layerType the type of the layer this filter will be applied to.
 * @returns {Function} filter-evaluating function
 */
declare function createFilter(filter?: FilterSpecification, scope?: string, options?: ConfigOptions | null, layerType?: string): FeatureFilter;
declare class EvaluationContext {
	globals: GlobalProperties;
	feature: Feature | null | undefined;
	featureState: FeatureState | null | undefined;
	formattedSection: FormattedSection | null | undefined;
	availableImages: Array<string> | null | undefined;
	canonical: null | CanonicalTileID;
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
	canonicalID(): null | CanonicalTileID;
	properties(): {
		[key: string]: any;
	};
	measureLight(_: string): number;
	distanceFromCenter(): number;
	parseColor(input: string): Color | null | undefined;
	getConfig(id: string): ConfigOptionValue | null | undefined;
}
type Result<T, E> = {
	result: "success";
	value: T;
} | {
	result: "error";
	value: E;
};
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
	readonly type: 0 | 1 | 2 | 3 | "Unknown" | "Point" | "LineString" | "Polygon";
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
declare class StyleExpression {
	expression: Expression;
	_evaluator: EvaluationContext;
	_defaultValue: Value;
	_warningHistory: {
		[key: string]: boolean;
	};
	_enumValues?: {
		[_: string]: unknown;
	};
	configDependencies: Set<string>;
	constructor(expression: Expression, propertySpec?: StylePropertySpecification, scope?: string, options?: ConfigOptions);
	evaluateWithoutErrorHandling(globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>, formattedSection?: FormattedSection, featureTileCoord?: Point, featureDistanceData?: FeatureDistanceData): any;
	evaluate(globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>, formattedSection?: FormattedSection, featureTileCoord?: Point, featureDistanceData?: FeatureDistanceData): any;
}
declare function isExpression(expression: unknown): boolean;
declare function createExpression(expression: unknown, propertySpec?: StylePropertySpecification | null, scope?: string | null, options?: ConfigOptions | null): Result<StyleExpression, Array<ParsingError$1>>;
declare class ZoomConstantExpression<Kind extends EvaluationKind> {
	kind: Kind;
	isStateDependent: boolean;
	configDependencies: Set<string>;
	_styleExpression: StyleExpression;
	isLightConstant: boolean | null | undefined;
	isLineProgressConstant: boolean | null | undefined;
	constructor(kind: Kind, expression: StyleExpression, isLightConstant?: boolean | null, isLineProgressConstant?: boolean | null);
	evaluateWithoutErrorHandling(globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>, formattedSection?: FormattedSection): any;
	evaluate(globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>, formattedSection?: FormattedSection): any;
}
declare class ZoomDependentExpression<Kind extends EvaluationKind> {
	kind: Kind;
	zoomStops: Array<number>;
	isStateDependent: boolean;
	isLightConstant: boolean | null | undefined;
	isLineProgressConstant: boolean | null | undefined;
	configDependencies: Set<string>;
	_styleExpression: StyleExpression;
	interpolationType: InterpolationType | null | undefined;
	constructor(kind: Kind, expression: StyleExpression, zoomStops: Array<number>, interpolationType?: InterpolationType, isLightConstant?: boolean | null, isLineProgressConstant?: boolean | null);
	evaluateWithoutErrorHandling(globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>, formattedSection?: FormattedSection): any;
	evaluate(globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>, formattedSection?: FormattedSection): any;
	interpolationFactor(input: number, lower: number, upper: number): number;
}
type ConstantExpression = {
	kind: "constant";
	configDependencies: Set<string>;
	readonly evaluate: (globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>) => any;
};
type SourceExpression = {
	kind: "source";
	isStateDependent: boolean;
	isLightConstant: boolean | null | undefined;
	isLineProgressConstant: boolean | null | undefined;
	configDependencies: Set<string>;
	readonly evaluate: (globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>, formattedSection?: FormattedSection) => any;
};
type CameraExpression = {
	kind: "camera";
	isStateDependent: boolean;
	configDependencies: Set<string>;
	readonly evaluate: (globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>) => any;
	readonly interpolationFactor: (input: number, lower: number, upper: number) => number;
	zoomStops: Array<number>;
	interpolationType: InterpolationType | null | undefined;
};
interface CompositeExpression {
	kind: "composite";
	isStateDependent: boolean;
	isLightConstant: boolean | null | undefined;
	isLineProgressConstant: boolean | null | undefined;
	configDependencies: Set<string>;
	readonly evaluate: (globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>, formattedSection?: FormattedSection) => any;
	readonly interpolationFactor: (input: number, lower: number, upper: number) => number;
	zoomStops: Array<number>;
	interpolationType: InterpolationType | null | undefined;
}
type StylePropertyExpression = ConstantExpression | SourceExpression | CameraExpression | CompositeExpression;
declare function createPropertyExpression(expression: unknown, propertySpec: StylePropertySpecification, scope?: string | null, options?: ConfigOptions | null): Result<StylePropertyExpression, Array<ParsingError$1>>;
declare class StylePropertyFunction<T> {
	_parameters: PropertyValueSpecification<T>;
	_specification: StylePropertySpecification;
	kind: EvaluationKind;
	evaluate: (globals: GlobalProperties, feature?: Feature) => any;
	interpolationFactor: (input: number, lower: number, upper: number) => number | null | undefined;
	zoomStops: Array<number> | null | undefined;
	constructor(parameters: PropertyValueSpecification<T>, specification: StylePropertySpecification);
	static deserialize<T>(serialized: {
		_parameters: PropertyValueSpecification<T>;
		_specification: StylePropertySpecification;
	}): StylePropertyFunction<T>;
	static serialize<T>(input: StylePropertyFunction<T>): {
		_parameters: PropertyValueSpecification<T>;
		_specification: StylePropertySpecification;
	};
}
declare function normalizePropertyExpression<T>(value: PropertyValueSpecification<T>, specification: StylePropertySpecification, scope?: string | null, options?: ConfigOptions | null): StylePropertyExpression;
/**
 * Convert the given legacy filter to (the JSON representation of) an
 * equivalent expression
 * @private
 */
export function convertFilter(filter: FilterSpecification): unknown;
declare function isFunction(value: any): boolean;
declare function createFunction(parameters: any, propertySpec: any): {
	kind: string;
	interpolationType: {
		name: string;
	};
	interpolationFactor: any;
	zoomStops: any[];
	evaluate({ zoom }: {
		zoom: any;
	}, properties: any): any;
} | {
	kind: string;
	interpolationType: {
		name: string;
		base: any;
	};
	interpolationFactor: any;
	zoomStops: any;
	evaluate: ({ zoom }: {
		zoom: any;
	}) => any;
} | {
	kind: string;
	evaluate(_: any, feature: any): any;
	interpolationType?: undefined;
	interpolationFactor?: undefined;
	zoomStops?: undefined;
};
declare function convertFunction<T>(parameters: FunctionSpecification<T>, propertySpec: StylePropertySpecification): ExpressionSpecification;
declare function eachSource(style: StyleSpecification, callback: (_: SourceSpecification) => void): void;
declare function eachLayer(style: StyleSpecification, callback: (_: LayerSpecification) => void): void;
type PropertyCallback = (arg1: {
	path: [
		string,
		"paint" | "layout",
		string
	];
	key: string;
	value: PropertyValueSpecification<unknown>;
	reference: StylePropertySpecification;
	set: (arg1: PropertyValueSpecification<unknown>) => void;
}) => void;
declare function eachProperty(style: StyleSpecification, options: {
	paint?: boolean;
	layout?: boolean;
}, callback: PropertyCallback): void;
type ValidationError$1 = {
	message: string;
	identifier?: string | null | undefined;
	line?: number | null | undefined;
};
type ValidationErrors = ReadonlyArray<ValidationError$1>;
/**
 * Validate a Mapbox GL style against the style specification.
 *
 * @private
 * @alias validate
 * @param {Object|String|Buffer} style The style to be validated. If a `String`
 *     or `Buffer` is provided, the returned errors will contain line numbers.
 * @param {Object} [styleSpec] The style specification to validate against.
 *     If omitted, the spec version is inferred from the stylesheet.
 * @returns {Array<ValidationError|ParsingError>}
 * @example
 *   var validate = require('mapbox-gl-style-spec').validate;
 *   var style = fs.readFileSync('./style.json', 'utf8');
 *   var errors = validate(style);
 */
declare function validateStyle(style: StyleSpecification | string | Buffer, styleSpec?: any): ValidationErrors;
/**
 * Validate a Mapbox GL style against the style specification and check for
 * compatibility with the Mapbox Styles API.
 *
 * @param {Object} style The style to be validated.
 * @returns {Array<ValidationError>}
 * @example
 *   var validateMapboxApiSupported = require('mapbox-gl-style-spec/lib/validate_style_mapbox_api_supported.js');
 *   var errors = validateMapboxApiSupported(style);
 */
export function validateMapboxApiSupported(style: any, styleSpec?: any): ValidationErrors;
type ExpressionType = "data-driven" | "color-ramp" | "data-constant" | "constant";
type ExpressionParameters = Array<"zoom" | "feature" | "feature-state" | "heatmap-density" | "line-progress" | "raster-value" | "sky-radial-progress" | "pitch" | "distance-from-center" | "measure-light" | "raster-particle-speed">;
type ExpressionSpecification$1 = {
	interpolated: boolean;
	parameters?: ExpressionParameters;
	relaxZoomRestriction?: boolean;
};
export type StylePropertySpecification = {
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
	overridable?: boolean;
	default?: boolean;
	tokens?: never;
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
export declare const expression: {
	StyleExpression: typeof StyleExpression;
	isExpression: typeof isExpression;
	isExpressionFilter: typeof isExpressionFilter;
	createExpression: typeof createExpression;
	createPropertyExpression: typeof createPropertyExpression;
	normalizePropertyExpression: typeof normalizePropertyExpression;
	ZoomConstantExpression: typeof ZoomConstantExpression;
	ZoomDependentExpression: typeof ZoomDependentExpression;
	StylePropertyFunction: typeof StylePropertyFunction;
};
declare const styleFunction: {
	convertFunction: typeof convertFunction;
	createFunction: typeof createFunction;
	isFunction: typeof isFunction;
};
export declare const visit: {
	eachSource: typeof eachSource;
	eachLayer: typeof eachLayer;
	eachProperty: typeof eachProperty;
};

export {
	ExpressionSpecification$1 as ExpressionSpecification,
	_default as latest,
	_default$1 as migrate,
	_default$2 as composite,
	createFilter as featureFilter,
	diffStyles as diff,
	styleFunction as function,
	validateStyle as validate,
};

export {};
