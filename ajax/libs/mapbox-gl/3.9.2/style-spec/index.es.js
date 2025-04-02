var $version = 8;
var $root = {
	version: {
		required: true,
		type: "enum",
		values: [
			8
		],
		doc: "Style specification version number. Must be 8.",
		example: 8
	},
	fragment: {
		type: "boolean",
		doc: "Indicates that a style is a fragment style.",
		example: true
	},
	name: {
		type: "string",
		doc: "A human-readable name for the style.",
		example: "Bright"
	},
	metadata: {
		type: "*",
		doc: "Arbitrary properties useful to track with the stylesheet, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
	},
	center: {
		type: "array",
		value: "number",
		doc: "Default map center in longitude and latitude. The style center will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
		example: [
			-73.9749,
			40.7736
		]
	},
	zoom: {
		type: "number",
		doc: "Default zoom level. The style zoom will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
		example: 12.5
	},
	bearing: {
		type: "number",
		"default": 0,
		period: 360,
		units: "degrees",
		doc: "Default bearing, in degrees. The bearing is the compass direction that is \"up\"; for example, a bearing of 90° orients the map so that east is up. This value will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
		example: 29
	},
	pitch: {
		type: "number",
		"default": 0,
		units: "degrees",
		doc: "Default pitch, in degrees. Zero is perpendicular to the surface, for a look straight down at the map, while a greater value like 60 looks ahead towards the horizon. The style pitch will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
		example: 50
	},
	light: {
		type: "light",
		doc: "The global light source. Note: This API is deprecated. Prefer using `flat` light type instead in the `lights` API.",
		example: {
			anchor: "viewport",
			color: "white",
			intensity: 0.4
		}
	},
	lights: {
		required: false,
		type: "array",
		value: "light-3d",
		doc: "Array of light sources affecting the whole map and the default for 3D style, mutually exclusive with the light property",
		example: [
			{
				id: "environment",
				type: "ambient",
				properties: {
					color: "rgba(255.0, 0.0, 0.0, 1.0)",
					intensity: 0.4
				}
			},
			{
				id: "sun_light",
				type: "directional",
				properties: {
					color: "rgba(255.0, 0.0, 0.0, 1.0)",
					intensity: 0.4,
					direction: [
						200,
						40
					],
					"cast-shadows": true,
					"shadow-intensity": 0.2
				}
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	terrain: {
		type: "terrain",
		optional: true,
		doc: "A global modifier that elevates layers and markers based on a DEM data source."
	},
	fog: {
		type: "fog",
		doc: "A global effect that fades layers and markers based on their distance to the camera. The fog can be used to approximate the effect of atmosphere on distant objects and enhance the depth perception of the map when used with terrain or 3D features. Note: fog is renamed to atmosphere in the Android and iOS SDKs and planned to be changed in GL-JS v.3.0.0."
	},
	snow: {
		type: "snow",
		doc: "Global precipitation particle-based snow. Having snow present in the style forces constant map repaint mode",
		experimental: true
	},
	rain: {
		type: "rain",
		doc: "Global precipitation particle-based rain effect. Having rain present in the style forces constant map repaint mode.",
		experimental: true
	},
	camera: {
		type: "camera",
		doc: "Global setting to control additional camera intrinsics parameters, e.g. projection type (perspective / orthographic)."
	},
	"color-theme": {
		type: "colorTheme",
		doc: "A global modifier for the colors of the style."
	},
	indoor: {
		type: "indoor",
		experimental: true,
		doc: "Controls the behaviour of indoor features."
	},
	imports: {
		type: "array",
		value: "import",
		doc: "Imports other styles into this style.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	schema: {
		type: "schema",
		doc: "Definition of the schema for configuration options.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	sources: {
		required: true,
		type: "sources",
		doc: "Data source specifications.",
		example: {
			"mapbox-streets": {
				type: "vector",
				url: "mapbox://mapbox.mapbox-streets-v6"
			}
		}
	},
	sprite: {
		type: "string",
		doc: "A base URL for retrieving the sprite image and metadata. The extensions `.png`, `.json` and scale factor `@2x.png` will be automatically appended. This property is required if any layer uses the `background-pattern`, `fill-pattern`, `line-pattern`, `fill-extrusion-pattern`, or `icon-image` properties. The URL must be absolute, containing the [scheme, authority and path components](https://en.wikipedia.org/wiki/URL#Syntax).",
		example: "mapbox://sprites/mapbox/bright-v8"
	},
	glyphs: {
		type: "string",
		doc: "A URL template for loading signed-distance-field glyph sets in PBF format. The URL must include `{fontstack}` and `{range}` tokens. This property is required if any layer uses the `text-field` layout property. The URL must be absolute, containing the [scheme, authority and path components](https://en.wikipedia.org/wiki/URL#Syntax).",
		"default": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
		example: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf"
	},
	transition: {
		type: "transition",
		doc: "A global transition definition to use as a default across properties, to be used for timing transitions between one value and the next when no property-specific transition is set. Collision-based symbol fading is controlled independently of the style's `transition` property.",
		example: {
			duration: 300,
			delay: 0
		}
	},
	projection: {
		type: "projection",
		doc: "The projection the map should be rendered in. Supported projections are Mercator, Globe, Albers, Equal Earth, Equirectangular (WGS84), Lambert conformal conic, Natural Earth, and Winkel Tripel. Terrain, sky and fog are supported by only Mercator and globe. CustomLayerInterface is not supported outside of Mercator.",
		example: {
			name: "albers",
			center: [
				-154,
				50
			],
			parallels: [
				55,
				65
			]
		}
	},
	layers: {
		required: true,
		type: "array",
		value: "layer",
		doc: "Layers will be drawn in the order of this array.",
		example: [
			{
				id: "water",
				source: "mapbox-streets",
				"source-layer": "water",
				type: "fill",
				paint: {
					"fill-color": "#00ffff"
				}
			}
		]
	},
	models: {
		type: "models",
		doc: "Specification of models used in the style.",
		example: {
			"spruce1-lod0": "asset://spruce1-lod0.glb",
			"spruce1-lod1": "asset://spruce1-lod1.glb",
			"spruce1-lod2": "asset://spruce1-lod2.glb"
		}
	},
	featuresets: {
		experimental: true,
		type: "featuresets",
		doc: "Defines sets of features for querying, interaction, and state management on the map, referencing individual layers or subsets of layers within the map's style.",
		example: {
			poi: {
				selectors: [
					{
						layer: "poi",
						properties: {
							type: [
								"get",
								"type"
							],
							name: [
								"get",
								"name"
							],
							brand: "ABC"
						}
					}
				]
			}
		}
	}
};
var featuresets = {
	experimental: true,
	"*": {
		type: "featureset",
		doc: "Defines a combined set of features from one or more underlying layers within the current style. Features in a style featureset can be queried, interacted with, and their states can be queried and updated."
	}
};
var featureset = {
	experimental: true,
	metadata: {
		type: "*",
		doc: "Arbitrary properties useful to track with the stylesheet, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
	},
	selectors: {
		type: "array",
		value: "selector",
		doc: "A collection of categorized selectors."
	}
};
var selector = {
	experimental: true,
	layer: {
		type: "string",
		doc: "The ID of a layer that exists in the current style.",
		required: true
	},
	properties: {
		type: "selectorProperty",
		required: false,
		doc: "Properties accessible to the end user through queried feautures. If properties are empty, no feature properties are exposed. If undefined, all original feature properties will be accessible."
	},
	featureNamespace: {
		type: "string",
		required: false,
		doc: "An optional field that represents the feature namespace defined by the selector within a featureset to which this feature belongs. If the underlying source is the same for multiple selectors within a featureset, the same featureNamespace should be used across those selectors."
	}
};
var selectorProperty = {
	experimental: true,
	"*": {
		type: "*",
		doc: "The value of the property. It can be an expression that generates the returned value from the feature, or a constant value specifying the returned value."
	}
};
var model = {
	type: "string",
	doc: "A URL to a model resource. Supported protocols are `http:`, `https:`, and `mapbox://<Model ID>`.",
	required: true
};
var config = {
	"*": {
		type: "*",
		doc: "Value of the imported style's configuration option."
	}
};
var schema = {
	"*": {
		type: "option",
		doc: "Specification of a configuration option."
	}
};
var option = {
	"default": {
		type: "*",
		doc: "Default configuration value for this option.",
		"property-type": "data-constant",
		expression: {
			interpolated: false
		},
		required: true
	},
	type: {
		type: "enum",
		doc: "The type this value is coerced to after evaluating the expression. If unspecified, the result is returned as is and is not validated.",
		values: {
			string: {
				doc: "The result will be coerced to a string."
			},
			number: {
				doc: "The result will be coerced to a number."
			},
			boolean: {
				doc: "The result will be coerced to a boolean."
			},
			color: {
				doc: "The result will be coerced to a color."
			}
		}
	},
	array: {
		type: "boolean",
		doc: "If true, this option is returned as an array"
	},
	minValue: {
		type: "number",
		doc: "If this option is a number, this specifies the minimum allowed value. Values lower than this will be clamped to the minimum value."
	},
	maxValue: {
		type: "number",
		doc: "If this option is a number, this specifies the maximum allowed value. Values higher than this will be clamped to the maximum value."
	},
	stepValue: {
		type: "number",
		doc: "If this option is a number, this specifies the increment between allowed values. Values will be rounded towards the nearest allowed value."
	},
	values: {
		type: "array",
		value: "*",
		doc: "If this option is specified, the result must be one of the given values. Otherwise, the default value is used instead."
	},
	metadata: {
		type: "*",
		doc: "Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
	}
};
var models = {
	"*": {
		type: "model",
		doc: "A URL to a model resource. Supported protocols are `http:`, `https:`, and `mapbox://<Model ID>`."
	}
};
var properties = [
	"properties_light_directional",
	"properties_light_ambient",
	"properties_light_flat"
];
var properties_light_directional = {
	direction: {
		type: "array",
		"default": [
			210,
			30
		],
		minimum: [
			0,
			0
		],
		maximum: [
			360,
			90
		],
		length: 2,
		value: "number",
		"property-type": "data-constant",
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		doc: "Direction of the light source specified as [a azimuthal angle, p polar angle] where a indicates the azimuthal angle of the light relative to north (in degrees and proceeding clockwise), and p indicates polar angle of the light (from 0°, directly above, to 180°, directly below).",
		example: [
			90,
			40
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	color: {
		type: "color",
		"property-type": "data-constant",
		"default": "#ffffff",
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		doc: "Color of the directional light.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	intensity: {
		type: "number",
		"property-type": "data-constant",
		"default": 0.5,
		minimum: 0,
		maximum: 1,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		doc: "A multiplier for the color of the directional light.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	"cast-shadows": {
		type: "boolean",
		"default": false,
		doc: "Enable/Disable shadow casting for this light",
		transition: false,
		"property-type": "data-constant",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	"shadow-quality": {
		type: "number",
		"property-type": "data-constant",
		"default": 1,
		minimum: 0,
		maximum: 1,
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		transition: false,
		doc: "Determines the quality of the shadows on the map. A value of 1 ensures the highest quality and is the default value.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		},
		experimental: true
	},
	"shadow-intensity": {
		type: "number",
		"property-type": "data-constant",
		"default": 1,
		minimum: 0,
		maximum: 1,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		doc: "Determines the shadow strength, affecting the shadow receiver surfaces final color. Values near 0.0 reduce the shadow contribution to the final color. Values near to 1.0 make occluded surfaces receive almost no directional light. Designed to be used mostly for transitioning between values 0 and 1.",
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	}
};
var properties_light_ambient = {
	color: {
		type: "color",
		"property-type": "data-constant",
		"default": "#ffffff",
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		doc: "Color of the ambient light.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	intensity: {
		type: "number",
		"property-type": "data-constant",
		"default": 0.5,
		minimum: 0,
		maximum: 1,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		doc: "A multiplier for the color of the ambient light.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	}
};
var properties_light_flat = {
	anchor: {
		type: "enum",
		"default": "viewport",
		values: {
			map: {
				doc: "The position of the light source is aligned to the rotation of the map."
			},
			viewport: {
				doc: "The position of the light source is aligned to the rotation of the viewport. If terrain is enabled, performance regressions may occur in certain scenarios, particularly on lower-end hardware. Ensure that you test your target scenarios on the appropriate hardware to verify performance."
			}
		},
		"property-type": "data-constant",
		transition: false,
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		doc: "Whether extruded geometries are lit relative to the map or viewport.",
		example: "map",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	position: {
		type: "array",
		"default": [
			1.15,
			210,
			30
		],
		length: 3,
		value: "number",
		"property-type": "data-constant",
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		doc: "Position of the light source relative to lit (extruded) geometries, in [r radial coordinate, a azimuthal angle, p polar angle] where r indicates the distance from the center of the base of an object to its light, a indicates the position of the light relative to 0° (0° when `light.anchor` is set to `viewport` corresponds to the top of the viewport, or 0° when `light.anchor` is set to `map` corresponds to due north, and degrees proceed clockwise), and p indicates the height of the light (from 0°, directly above, to 180°, directly below).",
		example: [
			1.5,
			90,
			80
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	color: {
		type: "color",
		"property-type": "data-constant",
		"default": "#ffffff",
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		doc: "Color tint for lighting extruded geometries.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	intensity: {
		type: "number",
		"property-type": "data-constant",
		"default": 0.5,
		minimum: 0,
		maximum: 1,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		doc: "Intensity of lighting (on a scale from 0 to 1). Higher numbers will present as more extreme contrast.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	}
};
var sources = {
	"*": {
		type: "source",
		doc: "Specification of a data source. For vector and raster sources, either TileJSON or a URL to a TileJSON must be provided. For image and video sources, a URL must be provided. For GeoJSON sources, a URL or inline GeoJSON must be provided."
	}
};
var source = [
	"source_vector",
	"source_raster",
	"source_raster_dem",
	"source_raster_array",
	"source_geojson",
	"source_video",
	"source_image",
	"source_model"
];
var source_vector = {
	type: {
		required: true,
		type: "enum",
		values: {
			vector: {
				doc: "A vector tile source."
			}
		},
		doc: "The type of the source."
	},
	url: {
		type: "string",
		doc: "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<Tileset ID>`. Required if `tiles` is not provided."
	},
	tiles: {
		type: "array",
		value: "string",
		doc: "An array of one or more tile source URLs, as in the TileJSON spec. Required if `url` is not provided."
	},
	bounds: {
		type: "array",
		value: "number",
		length: 4,
		"default": [
			-180,
			-85.051129,
			180,
			85.051129
		],
		doc: "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
	},
	scheme: {
		type: "enum",
		values: {
			xyz: {
				doc: "Slippy map tilenames scheme."
			},
			tms: {
				doc: "OSGeo spec scheme."
			}
		},
		"default": "xyz",
		doc: "Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed."
	},
	minzoom: {
		type: "number",
		"default": 0,
		doc: "Minimum zoom level for which tiles are available, as in the TileJSON spec."
	},
	maxzoom: {
		type: "number",
		"default": 22,
		doc: "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
	},
	attribution: {
		type: "string",
		doc: "Contains an attribution to be displayed when the map is shown to a user."
	},
	promoteId: {
		type: "promoteId",
		doc: "A property to use as a feature id (for feature state). Either a property name, or an object of the form `{<sourceLayer>: <propertyName>}`. If specified as a string for a vector tile source, the same property is used across all its source layers. If specified as an object only specified source layers will have id overriden, others will fallback to original feature id"
	},
	volatile: {
		type: "boolean",
		"default": false,
		doc: "A setting to determine whether a source's tiles are cached locally.",
		"sdk-support": {
			"basic functionality": {
				android: "9.3.0",
				ios: "5.10.0"
			}
		}
	},
	"*": {
		type: "*",
		doc: "Other keys to configure the data source."
	}
};
var source_raster = {
	type: {
		required: true,
		type: "enum",
		values: {
			raster: {
				doc: "A raster tile source."
			}
		},
		doc: "The type of the source."
	},
	url: {
		type: "string",
		doc: "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<Tileset ID>`. Required if `tiles` is not provided."
	},
	tiles: {
		type: "array",
		value: "string",
		doc: "An array of one or more tile source URLs, as in the TileJSON spec. Required if `url` is not provided."
	},
	bounds: {
		type: "array",
		value: "number",
		length: 4,
		"default": [
			-180,
			-85.051129,
			180,
			85.051129
		],
		doc: "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
	},
	minzoom: {
		type: "number",
		"default": 0,
		doc: "Minimum zoom level for which tiles are available, as in the TileJSON spec."
	},
	maxzoom: {
		type: "number",
		"default": 22,
		doc: "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
	},
	tileSize: {
		type: "number",
		"default": 512,
		units: "pixels",
		doc: "The minimum visual size to display tiles for this layer. Only configurable for raster layers."
	},
	scheme: {
		type: "enum",
		values: {
			xyz: {
				doc: "Slippy map tilenames scheme."
			},
			tms: {
				doc: "OSGeo spec scheme."
			}
		},
		"default": "xyz",
		doc: "Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed."
	},
	attribution: {
		type: "string",
		doc: "Contains an attribution to be displayed when the map is shown to a user."
	},
	volatile: {
		type: "boolean",
		"default": false,
		doc: "A setting to determine whether a source's tiles are cached locally.",
		"sdk-support": {
			"basic functionality": {
				android: "9.3.0",
				ios: "5.10.0"
			}
		}
	},
	"*": {
		type: "*",
		doc: "Other keys to configure the data source."
	}
};
var source_raster_dem = {
	type: {
		required: true,
		type: "enum",
		values: {
			"raster-dem": {
				doc: "A RGB-encoded raster DEM source"
			}
		},
		doc: "The type of the source."
	},
	url: {
		type: "string",
		doc: "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<Tileset ID>`. Required if `tiles` is not provided."
	},
	tiles: {
		type: "array",
		value: "string",
		doc: "An array of one or more tile source URLs, as in the TileJSON spec. Required if `url` is not provided."
	},
	bounds: {
		type: "array",
		value: "number",
		length: 4,
		"default": [
			-180,
			-85.051129,
			180,
			85.051129
		],
		doc: "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
	},
	minzoom: {
		type: "number",
		"default": 0,
		doc: "Minimum zoom level for which tiles are available, as in the TileJSON spec."
	},
	maxzoom: {
		type: "number",
		"default": 22,
		doc: "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
	},
	tileSize: {
		type: "number",
		"default": 512,
		units: "pixels",
		doc: "The minimum visual size to display tiles for this layer. Only configurable for raster layers."
	},
	attribution: {
		type: "string",
		doc: "Contains an attribution to be displayed when the map is shown to a user."
	},
	encoding: {
		type: "enum",
		values: {
			terrarium: {
				doc: "Terrarium format PNG tiles. See https://aws.amazon.com/es/public-datasets/terrain/ for more info."
			},
			mapbox: {
				doc: "Mapbox Terrain RGB tiles. See https://www.mapbox.com/help/access-elevation-data/#mapbox-terrain-rgb for more info."
			}
		},
		"default": "mapbox",
		doc: "The encoding used by this source. Mapbox Terrain RGB is used by default"
	},
	volatile: {
		type: "boolean",
		"default": false,
		doc: "A setting to determine whether a source's tiles are cached locally.",
		"sdk-support": {
			"basic functionality": {
				android: "9.3.0",
				ios: "5.10.0"
			}
		}
	},
	"*": {
		type: "*",
		doc: "Other keys to configure the data source."
	}
};
var source_raster_array = {
	experimental: true,
	type: {
		required: true,
		type: "enum",
		values: {
			"raster-array": {
				doc: "A raster array source"
			}
		},
		doc: "The type of the source."
	},
	url: {
		type: "string",
		doc: "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<Tileset ID>`. Required if `tiles` is not provided."
	},
	tiles: {
		type: "array",
		value: "string",
		doc: "An array of one or more tile source URLs, as in the TileJSON spec. Required if `url` is not provided."
	},
	bounds: {
		type: "array",
		value: "number",
		length: 4,
		"default": [
			-180,
			-85.051129,
			180,
			85.051129
		],
		doc: "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
	},
	minzoom: {
		type: "number",
		"default": 0,
		doc: "Minimum zoom level for which tiles are available, as in the TileJSON spec."
	},
	maxzoom: {
		type: "number",
		"default": 22,
		doc: "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
	},
	tileSize: {
		type: "number",
		"default": 512,
		units: "pixels",
		doc: "The minimum visual size to display tiles for this layer. Only configurable for raster layers."
	},
	attribution: {
		type: "string",
		doc: "Contains an attribution to be displayed when the map is shown to a user."
	},
	rasterLayers: {
		type: "*",
		doc: "Contains the description of the raster data layers and the bands contained within the tiles."
	},
	volatile: {
		type: "boolean",
		"default": false,
		doc: "A setting to determine whether a source's tiles are cached locally.",
		"sdk-support": {
			"basic functionality": {
				android: "9.3.0",
				ios: "5.10.0"
			}
		}
	},
	"*": {
		type: "*",
		doc: "Other keys to configure the data source."
	}
};
var source_geojson = {
	type: {
		required: true,
		type: "enum",
		values: {
			geojson: {
				doc: "A GeoJSON data source."
			}
		},
		doc: "The data type of the GeoJSON source."
	},
	data: {
		type: "*",
		doc: "A URL to a GeoJSON file, or inline GeoJSON."
	},
	maxzoom: {
		type: "number",
		"default": 18,
		doc: "Maximum zoom level at which to create vector tiles (higher means greater detail at high zoom levels)."
	},
	minzoom: {
		type: "number",
		"default": 0,
		doc: "Minimum zoom level at which to create vector tiles"
	},
	attribution: {
		type: "string",
		doc: "Contains an attribution to be displayed when the map is shown to a user."
	},
	buffer: {
		type: "number",
		"default": 128,
		maximum: 512,
		minimum: 0,
		doc: "Size of the tile buffer on each side. A value of 0 produces no buffer. A value of 512 produces a buffer as wide as the tile itself. Larger values produce fewer rendering artifacts near tile edges and slower performance."
	},
	filter: {
		type: "*",
		doc: "An expression for filtering features prior to processing them for rendering."
	},
	tolerance: {
		type: "number",
		"default": 0.375,
		doc: "Douglas-Peucker simplification tolerance (higher means simpler geometries and faster performance)."
	},
	cluster: {
		type: "boolean",
		"default": false,
		doc: "If the data is a collection of point features, setting this to true clusters the points by radius into groups. Cluster groups become new `Point` features in the source with additional properties:\n * `cluster` Is `true` if the point is a cluster \n * `cluster_id` A unqiue id for the cluster to be used in conjunction with the [cluster inspection methods](https://www.mapbox.com/mapbox-gl-js/api/#geojsonsource#getclusterexpansionzoom)\n * `point_count` Number of original points grouped into this cluster\n * `point_count_abbreviated` An abbreviated point count"
	},
	clusterRadius: {
		type: "number",
		"default": 50,
		minimum: 0,
		doc: "Radius of each cluster if clustering is enabled. A value of 512 indicates a radius equal to the width of a tile."
	},
	clusterMaxZoom: {
		type: "number",
		doc: "Max zoom on which to cluster points if clustering is enabled. Defaults to one zoom less than maxzoom (so that last zoom features are not clustered). Clusters are re-evaluated at integer zoom levels so setting clusterMaxZoom to 14 means the clusters will be displayed until z15."
	},
	clusterMinPoints: {
		type: "number",
		doc: "Minimum number of points necessary to form a cluster if clustering is enabled. Defaults to `2`."
	},
	clusterProperties: {
		type: "*",
		doc: "An object defining custom properties on the generated clusters if clustering is enabled, aggregating values from clustered points. Has the form `{\"property_name\": [operator, map_expression]}`. `operator` is any expression function that accepts at least 2 operands (e.g. `\"+\"` or `\"max\"`) — it accumulates the property value from clusters/points the cluster contains; `map_expression` produces the value of a single point.\n\nExample: `{\"sum\": [\"+\", [\"get\", \"scalerank\"]]}`.\n\nFor more advanced use cases, in place of `operator`, you can use a custom reduce expression that references a special `[\"accumulated\"]` value, e.g.:\n`{\"sum\": [[\"+\", [\"accumulated\"], [\"get\", \"sum\"]], [\"get\", \"scalerank\"]]}`"
	},
	lineMetrics: {
		type: "boolean",
		"default": false,
		doc: "Whether to calculate line distance metrics. This is required for line layers that specify `line-gradient` values."
	},
	generateId: {
		type: "boolean",
		"default": false,
		doc: "Whether to generate ids for the GeoJSON features. When enabled, the `feature.id` property will be auto assigned based on its index in the `features` array, over-writing any previous values."
	},
	promoteId: {
		type: "promoteId",
		doc: "A property to use as a feature id (for feature state). Either a property name, or an object of the form `{<sourceLayer>: <propertyName>}`."
	},
	dynamic: {
		type: "boolean",
		"default": false,
		doc: "Whether to optimize this source for frequent data updates (e.g. animating features).",
		"sdk-support": {
			"basic functionality": {
				js: "3.4.0"
			}
		}
	}
};
var source_video = {
	type: {
		required: true,
		type: "enum",
		values: {
			video: {
				doc: "A video data source."
			}
		},
		doc: "The data type of the video source."
	},
	urls: {
		required: true,
		type: "array",
		value: "string",
		doc: "URLs to video content in order of preferred format."
	},
	coordinates: {
		required: true,
		doc: "Corners of video specified in longitude, latitude pairs.",
		type: "array",
		length: 4,
		value: {
			type: "array",
			length: 2,
			value: "number",
			doc: "A single longitude, latitude pair."
		}
	}
};
var source_image = {
	type: {
		required: true,
		type: "enum",
		values: {
			image: {
				doc: "An image data source."
			}
		},
		doc: "The data type of the image source."
	},
	url: {
		required: false,
		type: "string",
		doc: "URL that points to an image. If the URL is not specified, the image is expected to be loaded directly during runtime."
	},
	coordinates: {
		required: true,
		doc: "Corners of image specified in longitude, latitude pairs. Note: When using globe projection, the image will be centered at the North or South Pole in the respective hemisphere if the average latitude value exceeds 85 degrees or falls below -85 degrees.",
		type: "array",
		length: 4,
		value: {
			type: "array",
			length: 2,
			value: "number",
			doc: "A single longitude, latitude pair."
		}
	}
};
var source_model = {
	type: {
		required: true,
		type: "enum",
		values: {
			model: {
				doc: "A collection of 3D models"
			},
			"batched-model": {
				doc: "A collection of 3D models with anchor data"
			}
		},
		doc: "Type of model source to be added. From single models to represent 2D layers to 3D tiled models covering a wide area."
	},
	maxzoom: {
		type: "number",
		"default": 18,
		doc: "Maximum zoom level at which to create batched model tiles. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
	},
	minzoom: {
		type: "number",
		"default": 0,
		doc: "Minimum zoom level for which batched-model tiles are available"
	},
	tiles: {
		type: "array",
		value: "string",
		doc: "An array of one or more tile source URLs, as in the TileJSON spec."
	}
};
var layer = {
	id: {
		type: "string",
		doc: "Unique layer name.",
		required: true
	},
	type: {
		type: "enum",
		values: {
			fill: {
				doc: "A filled polygon with an optional stroked border.",
				"sdk-support": {
					"basic functionality": {
						js: "0.10.0",
						android: "2.0.1",
						ios: "2.0.0"
					}
				}
			},
			line: {
				doc: "A stroked line.",
				"sdk-support": {
					"basic functionality": {
						js: "0.10.0",
						android: "2.0.1",
						ios: "2.0.0"
					}
				}
			},
			symbol: {
				doc: "An icon or a text label.",
				"sdk-support": {
					"basic functionality": {
						js: "0.10.0",
						android: "2.0.1",
						ios: "2.0.0"
					}
				}
			},
			circle: {
				doc: "A filled circle.",
				"sdk-support": {
					"basic functionality": {
						js: "0.10.0",
						android: "2.0.1",
						ios: "2.0.0"
					}
				}
			},
			heatmap: {
				doc: "A heatmap.",
				"sdk-support": {
					"basic functionality": {
						js: "0.41.0",
						android: "6.0.0",
						ios: "4.0.0"
					}
				}
			},
			"fill-extrusion": {
				doc: "An extruded (3D) polygon.",
				"sdk-support": {
					"basic functionality": {
						js: "0.27.0",
						android: "5.1.0",
						ios: "3.6.0"
					}
				}
			},
			raster: {
				doc: "Raster map textures such as satellite imagery.",
				"sdk-support": {
					"basic functionality": {
						js: "0.10.0",
						android: "2.0.1",
						ios: "2.0.0"
					}
				}
			},
			"raster-particle": {
				experimental: true,
				doc: "Particle animation driven by textures such as wind maps.",
				"sdk-support": {
					"basic functionality": {
						js: "3.3.0",
						android: "11.4.0",
						ios: "11.4.0"
					}
				}
			},
			hillshade: {
				doc: "Client-side hillshading visualization based on DEM data. Currently, the implementation only supports Mapbox Terrain RGB and Mapzen Terrarium tiles.",
				"sdk-support": {
					"basic functionality": {
						js: "0.43.0",
						android: "6.0.0",
						ios: "4.0.0"
					}
				}
			},
			model: {
				doc: "A 3D model",
				experimental: true,
				"sdk-support": {
					"basic functionality": {
						js: "3.0.0",
						android: "11.0.0",
						ios: "11.0.0"
					}
				}
			},
			background: {
				doc: "The background color or pattern of the map.",
				"sdk-support": {
					"basic functionality": {
						js: "0.10.0",
						android: "2.0.1",
						ios: "2.0.0"
					}
				}
			},
			sky: {
				doc: "A spherical dome around the map that is always rendered behind all other layers.",
				"sdk-support": {
					"basic functionality": {
						js: "2.0.0",
						ios: "10.0.0",
						android: "10.0.0"
					}
				}
			},
			slot: {
				doc: "Marks the position of a slot.",
				"sdk-support": {
					"basic functionality": {
						js: "3.0.0",
						android: "11.0.0",
						ios: "11.0.0"
					}
				}
			},
			clip: {
				doc: "Layer that removes 3D content from map.",
				"sdk-support": {
					"basic functionality": {
						js: "3.5.0",
						android: "11.6.0",
						ios: "11.6.0"
					}
				}
			}
		},
		doc: "Rendering type of this layer.",
		required: true
	},
	metadata: {
		type: "*",
		doc: "Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
	},
	source: {
		type: "string",
		doc: "Name of a source description to be used for this layer. Required for all layer types except `background` and `slot`."
	},
	"source-layer": {
		type: "string",
		doc: "Layer to use from a vector tile source. Required for vector and raster-array sources; prohibited for all other source types, including GeoJSON sources."
	},
	slot: {
		type: "string",
		doc: "The slot this layer is assigned to. If specified, and a slot with that name exists, it will be placed at that position in the layer order.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	minzoom: {
		type: "number",
		minimum: 0,
		maximum: 24,
		doc: "The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden."
	},
	maxzoom: {
		type: "number",
		minimum: 0,
		maximum: 24,
		doc: "The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden."
	},
	filter: {
		type: "filter",
		doc: "An expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `[\"feature-state\", ...]` expression is not supported in filter expressions. The `[\"pitch\"]` and `[\"distance-from-center\"]` expressions are supported only for filter expressions on the symbol layer."
	},
	layout: {
		type: "layout",
		doc: "Layout properties for the layer."
	},
	paint: {
		type: "paint",
		doc: "Default paint properties for this layer."
	}
};
var layout = [
	"layout_clip",
	"layout_fill",
	"layout_line",
	"layout_circle",
	"layout_heatmap",
	"layout_fill-extrusion",
	"layout_symbol",
	"layout_raster",
	"layout_raster-particle",
	"layout_hillshade",
	"layout_background",
	"layout_sky",
	"layout_model"
];
var layout_background = {
	visibility: {
		type: "enum",
		values: {
			visible: {
				doc: "The layer is shown."
			},
			none: {
				doc: "The layer is not shown."
			}
		},
		"default": "visible",
		doc: "Whether this layer is displayed.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"expressions support": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	}
};
var layout_sky = {
	visibility: {
		type: "enum",
		values: {
			visible: {
				doc: "The layer is shown."
			},
			none: {
				doc: "The layer is not shown."
			}
		},
		"default": "visible",
		doc: "Whether this layer is displayed.",
		"sdk-support": {
			"basic functionality": {
				js: "2.0.0",
				ios: "10.0.0",
				android: "10.0.0"
			},
			"expressions support": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	}
};
var layout_model = {
	visibility: {
		type: "enum",
		values: {
			visible: {
				doc: "The layer is shown."
			},
			none: {
				doc: "The layer is not shown."
			}
		},
		"default": "visible",
		doc: "Whether this layer is displayed.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	},
	"model-id": {
		type: "string",
		"default": "",
		doc: "Model to render. It can be either a string referencing an element to the models root property or an internal or external URL",
		"property-type": "data-driven",
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		transition: false,
		requires: [
			{
				source: [
					"geojson",
					"vector"
				]
			}
		]
	}
};
var layout_clip = {
	"clip-layer-types": {
		type: "array",
		value: "enum",
		values: {
			model: {
				doc: "If present the clip layer would remove all 3d model layers below it. Currently only instanced models (e.g. trees) are removed."
			},
			symbol: {
				doc: "If present the clip layer would remove all symbol layers below it."
			}
		},
		"default": [
		],
		doc: "Layer types that will also be removed if fallen below this clip layer.",
		"sdk-support": {
			"basic functionality": {
				js: "3.5.0",
				android: "11.6.0",
				ios: "11.6.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "data-constant"
	},
	"clip-layer-scope": {
		type: "array",
		value: "string",
		"default": [
		],
		doc: "Removes content from layers with the specified scope. By default all layers are affected. For example specifying `basemap` will only remove content from the Mapbox Standard style layers which have the same scope",
		"sdk-support": {
			"basic functionality": {
				js: "3.6.0",
				android: "11.7.0",
				ios: "11.7.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "data-constant"
	}
};
var layout_fill = {
	"fill-sort-key": {
		type: "number",
		doc: "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.",
		"sdk-support": {
			"basic functionality": {
				js: "1.2.0",
				android: "9.1.0",
				ios: "5.8.0"
			},
			"data-driven styling": {
				js: "1.2.0",
				android: "9.1.0",
				ios: "5.8.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	visibility: {
		type: "enum",
		values: {
			visible: {
				doc: "The layer is shown."
			},
			none: {
				doc: "The layer is not shown."
			}
		},
		"default": "visible",
		doc: "Whether this layer is displayed.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"expressions support": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	},
	"fill-elevation-reference": {
		type: "enum",
		doc: "Selects the base of fill-elevation. Some modes might require precomputed elevation data in the tileset.",
		values: {
			none: {
				doc: "Elevated rendering is disabled."
			},
			"hd-road-base": {
				doc: "Elevate geometry relative to HD roads. Use this mode to describe base polygons of the road networks."
			},
			"hd-road-markup": {
				doc: "Elevated rendering is enabled. Use this mode to describe additive and stackable features such as 'hatched areas' that should exist only on top of road polygons."
			}
		},
		"default": "none",
		experimental: true,
		"private": true,
		transition: false,
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "data-constant"
	}
};
var layout_circle = {
	"circle-sort-key": {
		type: "number",
		doc: "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.",
		"sdk-support": {
			"basic functionality": {
				js: "1.2.0",
				android: "9.2.0",
				ios: "5.9.0"
			},
			"data-driven styling": {
				js: "1.2.0",
				android: "9.2.0",
				ios: "5.9.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	visibility: {
		type: "enum",
		values: {
			visible: {
				doc: "The layer is shown."
			},
			none: {
				doc: "The layer is not shown."
			}
		},
		"default": "visible",
		doc: "Whether this layer is displayed.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"expressions support": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	}
};
var layout_heatmap = {
	visibility: {
		type: "enum",
		values: {
			visible: {
				doc: "The layer is shown."
			},
			none: {
				doc: "The layer is not shown."
			}
		},
		"default": "visible",
		doc: "Whether this layer is displayed.",
		"sdk-support": {
			"basic functionality": {
				js: "0.41.0",
				android: "6.0.0",
				ios: "4.0.0"
			},
			"expressions support": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	}
};
var layout_line = {
	"line-cap": {
		type: "enum",
		values: {
			butt: {
				doc: "A cap with a squared-off end which is drawn to the exact endpoint of the line."
			},
			round: {
				doc: "A cap with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line."
			},
			square: {
				doc: "A cap with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width."
			}
		},
		"default": "butt",
		doc: "The display of line endings.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "2.3.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"line-join": {
		type: "enum",
		values: {
			bevel: {
				doc: "A join with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width."
			},
			round: {
				doc: "A join with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line."
			},
			miter: {
				doc: "A join with a sharp, angled corner which is drawn with the outer sides beyond the endpoint of the path until they meet."
			},
			none: {
				doc: "Line segments are not joined together, each one creates a separate line. Useful in combination with line-pattern. Line-cap property is not respected. Can't be used with data-driven styling."
			}
		},
		"default": "miter",
		doc: "The display of lines when joining.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.40.0",
				android: "5.2.0",
				ios: "3.7.0"
			},
			"`none` value": {
				js: "3.4.0",
				android: "11.5.0",
				ios: "11.5.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"line-miter-limit": {
		type: "number",
		"default": 2,
		doc: "Used to automatically convert miter joins to bevel joins for sharp angles.",
		requires: [
			{
				"line-join": "miter"
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"line-round-limit": {
		type: "number",
		"default": 1.05,
		doc: "Used to automatically convert round joins to miter joins for shallow angles.",
		requires: [
			{
				"line-join": "round"
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"line-sort-key": {
		type: "number",
		doc: "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.",
		"sdk-support": {
			"basic functionality": {
				js: "1.2.0",
				android: "9.1.0",
				ios: "5.8.0"
			},
			"data-driven styling": {
				js: "1.2.0",
				android: "9.1.0",
				ios: "5.8.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"line-z-offset": {
		type: "number",
		experimental: true,
		doc: "Vertical offset from ground, in meters. Defaults to 0. This is an experimental property with some known issues:\n * Not supported for globe projection at the moment \n * Elevated line discontinuity is possible on tile borders with terrain enabled \n * Rendering artifacts can happen near line joins and line caps depending on the line styling \n * Rendering artifacts relating to `line-opacity` and `line-blur` \n * Elevated line visibility is determined by layer order \n * Z-fighting issues can happen with intersecting elevated lines \n * Elevated lines don't cast shadows",
		"default": 0,
		requires: [
			"line-elevation-reference"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.5.0",
				android: "11.5.0",
				ios: "11.5.0"
			},
			"data-driven styling": {
				js: "3.5.0",
				android: "11.5.0",
				ios: "11.5.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature",
				"line-progress"
			]
		},
		"property-type": "data-driven"
	},
	"line-elevation-reference": {
		type: "enum",
		doc: "Selects the base of line-elevation. Some modes might require precomputed elevation data in the tileset.",
		values: {
			none: {
				doc: "Elevated rendering is disabled."
			},
			sea: {
				doc: "Elevated rendering is enabled. Use this mode to elevate lines relative to the sea level."
			},
			ground: {
				doc: "Elevated rendering is enabled. Use this mode to elevate lines relative to the ground's height below them."
			},
			"hd-road-markup": {
				doc: "Elevated rendering is enabled. Use this mode to describe additive and stackable features that should exist only on top of road polygons."
			}
		},
		"default": "none",
		experimental: true,
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "3.8.0",
				android: "11.9.0",
				ios: "11.9.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "data-constant"
	},
	"line-cross-slope": {
		type: "number",
		experimental: true,
		doc: "Defines the slope of an elevated line. A value of 0 creates a horizontal line. A value of 1 creates a vertical line. Other values are currently not supported. If undefined, the line follows the terrain slope. This is an experimental property with some known issues:\n * Vertical lines don't support line caps \n * `line-join: round` is not supported with this property",
		requires: [
			"line-z-offset"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.8.0",
				android: "11.9.0",
				ios: "11.9.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	},
	visibility: {
		type: "enum",
		values: {
			visible: {
				doc: "The layer is shown."
			},
			none: {
				doc: "The layer is not shown."
			}
		},
		"default": "visible",
		doc: "Whether this layer is displayed.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"expressions support": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	},
	"line-width-unit": {
		type: "enum",
		doc: "Selects the unit of line-width. The same unit is automatically used for line-blur and line-offset. Note: This is an experimental property and might be removed in a future release.",
		values: {
			pixels: {
				doc: "Width is rendered in pixels."
			},
			meters: {
				doc: "Width is rendered in meters."
			}
		},
		"default": "pixels",
		experimental: true,
		"private": true,
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "3.9.0",
				android: "11.9.0",
				ios: "11.9.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	}
};
var layout_symbol = {
	"symbol-placement": {
		type: "enum",
		values: {
			point: {
				doc: "The label is placed at the point where the geometry is located."
			},
			line: {
				doc: "The label is placed along the line of the geometry. Can only be used on `LineString` and `Polygon` geometries."
			},
			"line-center": {
				doc: "The label is placed at the center of the line of the geometry. Can only be used on `LineString` and `Polygon` geometries. Note that a single feature in a vector tile may contain multiple line geometries."
			}
		},
		"default": "point",
		doc: "Label placement relative to its geometry.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"`line-center` value": {
				js: "0.47.0",
				android: "6.4.0",
				ios: "4.3.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"symbol-spacing": {
		type: "number",
		"default": 250,
		minimum: 1,
		units: "pixels",
		doc: "Distance between two symbol anchors.",
		requires: [
			{
				"symbol-placement": "line"
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"symbol-avoid-edges": {
		type: "boolean",
		"default": false,
		doc: "If true, the symbols will not cross tile edges to avoid mutual collisions. Recommended in layers that don't have enough padding in the vector tile to prevent collisions, or if it is a point symbol layer placed after a line symbol layer. When using a client that supports global collision detection, like Mapbox GL JS version 0.42.0 or greater, enabling this property is not needed to prevent clipped labels at tile boundaries.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"symbol-sort-key": {
		type: "number",
		doc: "Sorts features in ascending order based on this value. Features with lower sort keys are drawn and placed first. When `icon-allow-overlap` or `text-allow-overlap` is `false`, features with a lower sort key will have priority during placement. When `icon-allow-overlap` or `text-allow-overlap` is set to `true`, features with a higher sort key will overlap over features with a lower sort key.",
		"sdk-support": {
			"basic functionality": {
				js: "0.53.0",
				android: "7.4.0",
				ios: "4.11.0"
			},
			"data-driven styling": {
				js: "0.53.0",
				android: "7.4.0",
				ios: "4.11.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"symbol-z-order": {
		type: "enum",
		values: {
			auto: {
				doc: "Sorts symbols by `symbol-sort-key` if set. Otherwise, sorts symbols by their y-position relative to the viewport if `icon-allow-overlap` or `text-allow-overlap` is set to `true` or `icon-ignore-placement` or `text-ignore-placement` is `false`."
			},
			"viewport-y": {
				doc: "Sorts symbols by their y-position relative to the viewport if any of the following is set to `true`: `icon-allow-overlap`, `text-allow-overlap`, `icon-ignore-placement`, `text-ignore-placement`."
			},
			source: {
				doc: "Sorts symbols by `symbol-sort-key` if set. Otherwise, no sorting is applied; symbols are rendered in the same order as the source data."
			}
		},
		"default": "auto",
		doc: "Determines whether overlapping symbols in the same layer are rendered in the order that they appear in the data source or by their y-position relative to the viewport. To control the order and prioritization of symbols otherwise, use `symbol-sort-key`.",
		"sdk-support": {
			"basic functionality": {
				js: "0.49.0",
				android: "6.6.0",
				ios: "4.5.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"symbol-z-elevate": {
		type: "boolean",
		"default": false,
		doc: "Position symbol on buildings (both fill extrusions and models) rooftops. In order to have minimal impact on performance, this is supported only when `fill-extrusion-height` is not zoom-dependent and remains unchanged. For fading in buildings when zooming in, fill-extrusion-vertical-scale should be used and symbols would raise with building rooftops. Symbols are sorted by elevation, except in cases when `viewport-y` sorting or `symbol-sort-key` are applied.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		requires: [
			{
				"symbol-placement": [
					"point"
				]
			},
			{
				"symbol-z-order": [
					"auto"
				]
			}
		],
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"symbol-elevation-reference": {
		type: "enum",
		doc: "Selects the base of symbol-elevation.",
		values: {
			sea: {
				doc: "Elevate symbols relative to the sea level."
			},
			ground: {
				doc: "Elevate symbols relative to the ground's height below them."
			},
			"hd-road-markup": {
				doc: "Use this mode to enable elevated behavior for features that are rendered on top of 3D road polygons. The feature is currently being developed."
			}
		},
		"default": "ground",
		experimental: true,
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"icon-allow-overlap": {
		type: "boolean",
		"default": false,
		doc: "If true, the icon will be visible even if it collides with other previously drawn symbols.",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"icon-ignore-placement": {
		type: "boolean",
		"default": false,
		doc: "If true, other symbols can be visible even if they collide with the icon.",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"icon-optional": {
		type: "boolean",
		"default": false,
		doc: "If true, text will display without their corresponding icons when the icon collides with other symbols and the text does not.",
		requires: [
			"icon-image",
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"icon-rotation-alignment": {
		type: "enum",
		values: {
			map: {
				doc: "When `symbol-placement` is set to `point`, aligns icons east-west. When `symbol-placement` is set to `line` or `line-center`, aligns icon x-axes with the line."
			},
			viewport: {
				doc: "Produces icons whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`."
			},
			auto: {
				doc: "When `symbol-placement` is set to `point`, this is equivalent to `viewport`. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`."
			}
		},
		"default": "auto",
		doc: "In combination with `symbol-placement`, determines the rotation behavior of icons.",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"`auto` value": {
				js: "0.25.0",
				android: "4.2.0",
				ios: "3.4.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"icon-size": {
		type: "number",
		"default": 1,
		minimum: 0,
		units: "factor of the original icon size",
		doc: "Scales the original size of the icon by the provided factor. The new pixel size of the image will be the original pixel size multiplied by `icon-size`. 1 is the original size; 3 triples the size of the image.",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.35.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"icon-size-scale-range": {
		type: "array",
		value: "number",
		length: 2,
		"default": [
			0.8,
			2
		],
		doc: "Defines the minimum and maximum scaling factors for icon related properties like `icon-size`, `icon-halo-width`, `icon-halo-blur`",
		minimum: 0.1,
		maximum: 10,
		experimental: true,
		"private": true,
		expression: {
			interpolated: false
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.8.0"
			}
		},
		"property-type": "data-constant"
	},
	"icon-text-fit": {
		type: "enum",
		values: {
			none: {
				doc: "The icon is displayed at its intrinsic aspect ratio."
			},
			width: {
				doc: "The icon is scaled in the x-dimension to fit the width of the text."
			},
			height: {
				doc: "The icon is scaled in the y-dimension to fit the height of the text."
			},
			both: {
				doc: "The icon is scaled in both x- and y-dimensions."
			}
		},
		"default": "none",
		doc: "Scales the icon to fit around the associated text.",
		requires: [
			"icon-image",
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.21.0",
				android: "4.2.0",
				ios: "3.4.0"
			},
			"stretchable icons": {
				js: "1.6.0",
				android: "9.2.0",
				ios: "5.8.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"icon-text-fit-padding": {
		type: "array",
		value: "number",
		length: 4,
		"default": [
			0,
			0,
			0,
			0
		],
		units: "pixels",
		doc: "Size of the additional area added to dimensions determined by `icon-text-fit`, in clockwise order: top, right, bottom, left.",
		requires: [
			"icon-image",
			"text-field",
			{
				"icon-text-fit": [
					"both",
					"width",
					"height"
				]
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.21.0",
				android: "4.2.0",
				ios: "3.4.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"icon-image": {
		type: "resolvedImage",
		doc: "Name of image in sprite to use for drawing an image background.",
		tokens: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.35.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"icon-rotate": {
		type: "number",
		"default": 0,
		period: 360,
		units: "degrees",
		doc: "Rotates the icon clockwise.",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.21.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"icon-padding": {
		type: "number",
		"default": 2,
		minimum: 0,
		units: "pixels",
		doc: "Size of the additional area around the icon bounding box used for detecting symbol collisions.",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"icon-keep-upright": {
		type: "boolean",
		"default": false,
		doc: "If true, the icon may be flipped to prevent it from being rendered upside-down.",
		requires: [
			"icon-image",
			{
				"icon-rotation-alignment": "map"
			},
			{
				"symbol-placement": [
					"line",
					"line-center"
				]
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"icon-offset": {
		type: "array",
		value: "number",
		length: 2,
		"default": [
			0,
			0
		],
		doc: "Offset distance of icon from its anchor. Positive values indicate right and down, while negative values indicate left and up. Each component is multiplied by the value of `icon-size` to obtain the final offset in pixels. When combined with `icon-rotate` the offset will be as if the rotated direction was up.",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.29.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"icon-anchor": {
		type: "enum",
		values: {
			center: {
				doc: "The center of the icon is placed closest to the anchor."
			},
			left: {
				doc: "The left side of the icon is placed closest to the anchor."
			},
			right: {
				doc: "The right side of the icon is placed closest to the anchor."
			},
			top: {
				doc: "The top of the icon is placed closest to the anchor."
			},
			bottom: {
				doc: "The bottom of the icon is placed closest to the anchor."
			},
			"top-left": {
				doc: "The top left corner of the icon is placed closest to the anchor."
			},
			"top-right": {
				doc: "The top right corner of the icon is placed closest to the anchor."
			},
			"bottom-left": {
				doc: "The bottom left corner of the icon is placed closest to the anchor."
			},
			"bottom-right": {
				doc: "The bottom right corner of the icon is placed closest to the anchor."
			}
		},
		"default": "center",
		doc: "Part of the icon placed closest to the anchor.",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.40.0",
				android: "5.2.0",
				ios: "3.7.0"
			},
			"data-driven styling": {
				js: "0.40.0",
				android: "5.2.0",
				ios: "3.7.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"icon-pitch-alignment": {
		type: "enum",
		values: {
			map: {
				doc: "The icon is aligned to the plane of the map."
			},
			viewport: {
				doc: "The icon is aligned to the plane of the viewport."
			},
			auto: {
				doc: "Automatically matches the value of `icon-rotation-alignment`."
			}
		},
		"default": "auto",
		doc: "Orientation of icon when map is pitched.",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.39.0",
				android: "5.2.0",
				ios: "3.7.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"text-pitch-alignment": {
		type: "enum",
		values: {
			map: {
				doc: "The text is aligned to the plane of the map."
			},
			viewport: {
				doc: "The text is aligned to the plane of the viewport."
			},
			auto: {
				doc: "Automatically matches the value of `text-rotation-alignment`."
			}
		},
		"default": "auto",
		doc: "Orientation of text when map is pitched.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.21.0",
				android: "4.2.0",
				ios: "3.4.0"
			},
			"`auto` value": {
				js: "0.25.0",
				android: "4.2.0",
				ios: "3.4.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"text-rotation-alignment": {
		type: "enum",
		values: {
			map: {
				doc: "When `symbol-placement` is set to `point`, aligns text east-west. When `symbol-placement` is set to `line` or `line-center`, aligns text x-axes with the line."
			},
			viewport: {
				doc: "Produces glyphs whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`."
			},
			auto: {
				doc: "When `symbol-placement` is set to `point`, this is equivalent to `viewport`. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`."
			}
		},
		"default": "auto",
		doc: "In combination with `symbol-placement`, determines the rotation behavior of the individual glyphs forming the text.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"`auto` value": {
				js: "0.25.0",
				android: "4.2.0",
				ios: "3.4.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"text-field": {
		type: "formatted",
		"default": "",
		tokens: true,
		doc: "Value to use for a text label. If a plain `string` is provided, it will be treated as a `formatted` with default/inherited formatting options. SDF images are not supported in formatted text and will be ignored.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.33.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"text-font": {
		type: "array",
		value: "string",
		"default": [
			"Open Sans Regular",
			"Arial Unicode MS Regular"
		],
		doc: "Font stack to use for displaying text.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.43.0",
				android: "6.0.0",
				ios: "4.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"text-size": {
		type: "number",
		"default": 16,
		minimum: 0,
		units: "pixels",
		doc: "Font size.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.35.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"text-size-scale-range": {
		type: "array",
		value: "number",
		length: 2,
		"default": [
			0.8,
			2
		],
		doc: "Defines the minimum and maximum scaling factors for text related properties like `text-size`, `text-max-width`, `text-halo-width`, `font-size`",
		minimum: 0.1,
		maximum: 10,
		experimental: true,
		"private": true,
		expression: {
			interpolated: false
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.8.0"
			}
		},
		"property-type": "data-constant"
	},
	"text-max-width": {
		type: "number",
		"default": 10,
		minimum: 0,
		units: "ems",
		doc: "The maximum line width for text wrapping.",
		requires: [
			"text-field",
			{
				"symbol-placement": [
					"point"
				]
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.40.0",
				android: "5.2.0",
				ios: "3.7.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"text-line-height": {
		type: "number",
		"default": 1.2,
		units: "ems",
		doc: "Text leading value for multi-line text.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "2.3.0",
				android: "10.0.0",
				ios: "10.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"text-letter-spacing": {
		type: "number",
		"default": 0,
		units: "ems",
		doc: "Text tracking amount.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.40.0",
				android: "5.2.0",
				ios: "3.7.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"text-justify": {
		type: "enum",
		values: {
			auto: {
				doc: "The text is aligned towards the anchor position."
			},
			left: {
				doc: "The text is aligned to the left."
			},
			center: {
				doc: "The text is centered."
			},
			right: {
				doc: "The text is aligned to the right."
			}
		},
		"default": "center",
		doc: "Text justification options.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.39.0",
				android: "5.2.0",
				ios: "3.7.0"
			},
			auto: {
				js: "0.54.0",
				android: "7.4.0",
				ios: "4.10.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"text-radial-offset": {
		type: "number",
		units: "ems",
		"default": 0,
		doc: "Radial offset of text, in the direction of the symbol's anchor. Useful in combination with `text-variable-anchor`, which defaults to using the two-dimensional `text-offset` if present.",
		"sdk-support": {
			"basic functionality": {
				js: "0.54.0",
				android: "7.4.0",
				ios: "4.10.0"
			},
			"data-driven styling": {
				js: "0.54.0",
				android: "7.4.0",
				ios: "4.10.0"
			}
		},
		requires: [
			"text-field"
		],
		"property-type": "data-driven",
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature"
			]
		}
	},
	"text-variable-anchor": {
		type: "array",
		value: "enum",
		values: {
			center: {
				doc: "The center of the text is placed closest to the anchor."
			},
			left: {
				doc: "The left side of the text is placed closest to the anchor."
			},
			right: {
				doc: "The right side of the text is placed closest to the anchor."
			},
			top: {
				doc: "The top of the text is placed closest to the anchor."
			},
			bottom: {
				doc: "The bottom of the text is placed closest to the anchor."
			},
			"top-left": {
				doc: "The top left corner of the text is placed closest to the anchor."
			},
			"top-right": {
				doc: "The top right corner of the text is placed closest to the anchor."
			},
			"bottom-left": {
				doc: "The bottom left corner of the text is placed closest to the anchor."
			},
			"bottom-right": {
				doc: "The bottom right corner of the text is placed closest to the anchor."
			}
		},
		requires: [
			"text-field",
			{
				"symbol-placement": [
					"point"
				]
			}
		],
		doc: "To increase the chance of placing high-priority labels on the map, you can provide an array of `text-anchor` locations: the renderer will attempt to place the label at each location, in order, before moving onto the next label. Use `text-justify: auto` to choose justification based on anchor position. To apply an offset, use the `text-radial-offset` or the two-dimensional `text-offset`.",
		"sdk-support": {
			"basic functionality": {
				js: "0.54.0",
				android: "7.4.0",
				ios: "4.10.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"text-anchor": {
		type: "enum",
		values: {
			center: {
				doc: "The center of the text is placed closest to the anchor."
			},
			left: {
				doc: "The left side of the text is placed closest to the anchor."
			},
			right: {
				doc: "The right side of the text is placed closest to the anchor."
			},
			top: {
				doc: "The top of the text is placed closest to the anchor."
			},
			bottom: {
				doc: "The bottom of the text is placed closest to the anchor."
			},
			"top-left": {
				doc: "The top left corner of the text is placed closest to the anchor."
			},
			"top-right": {
				doc: "The top right corner of the text is placed closest to the anchor."
			},
			"bottom-left": {
				doc: "The bottom left corner of the text is placed closest to the anchor."
			},
			"bottom-right": {
				doc: "The bottom right corner of the text is placed closest to the anchor."
			}
		},
		"default": "center",
		doc: "Part of the text placed closest to the anchor.",
		requires: [
			"text-field",
			{
				"!": "text-variable-anchor"
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.39.0",
				android: "5.2.0",
				ios: "3.7.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"text-max-angle": {
		type: "number",
		"default": 45,
		units: "degrees",
		doc: "Maximum angle change between adjacent characters.",
		requires: [
			"text-field",
			{
				"symbol-placement": [
					"line",
					"line-center"
				]
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"text-writing-mode": {
		type: "array",
		value: "enum",
		values: {
			horizontal: {
				doc: "If a text's language supports horizontal writing mode, symbols would be laid out horizontally."
			},
			vertical: {
				doc: "If a text's language supports vertical writing mode, symbols would be laid out vertically."
			}
		},
		doc: "The property allows control over a symbol's orientation. Note that the property values act as a hint, so that a symbol whose language doesn’t support the provided orientation will be laid out in its natural orientation. Example: English point symbol will be rendered horizontally even if array value contains single 'vertical' enum value. For symbol with point placement, the order of elements in an array define priority order for the placement of an orientation variant. For symbol with line placement, the default text writing mode is either ['horizontal', 'vertical'] or ['vertical', 'horizontal'], the order doesn't affect the placement.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "1.3.0",
				android: "8.3.0",
				ios: "5.3.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"text-rotate": {
		type: "number",
		"default": 0,
		period: 360,
		units: "degrees",
		doc: "Rotates the text clockwise.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.35.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"text-padding": {
		type: "number",
		"default": 2,
		minimum: 0,
		units: "pixels",
		doc: "Size of the additional area around the text bounding box used for detecting symbol collisions.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"text-keep-upright": {
		type: "boolean",
		"default": true,
		doc: "If true, the text may be flipped vertically to prevent it from being rendered upside-down.",
		requires: [
			"text-field",
			{
				"text-rotation-alignment": "map"
			},
			{
				"symbol-placement": [
					"line",
					"line-center"
				]
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"text-transform": {
		type: "enum",
		values: {
			none: {
				doc: "The text is not altered."
			},
			uppercase: {
				doc: "Forces all letters to be displayed in uppercase."
			},
			lowercase: {
				doc: "Forces all letters to be displayed in lowercase."
			}
		},
		"default": "none",
		doc: "Specifies how to capitalize text, similar to the CSS `text-transform` property.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.33.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"text-offset": {
		type: "array",
		doc: "Offset distance of text from its anchor. Positive values indicate right and down, while negative values indicate left and up. If used with text-variable-anchor, input values will be taken as absolute values. Offsets along the x- and y-axis will be applied automatically based on the anchor position.",
		value: "number",
		units: "ems",
		length: 2,
		"default": [
			0,
			0
		],
		requires: [
			"text-field",
			{
				"!": "text-radial-offset"
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.35.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"text-allow-overlap": {
		type: "boolean",
		"default": false,
		doc: "If true, the text will be visible even if it collides with other previously drawn symbols.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"text-ignore-placement": {
		type: "boolean",
		"default": false,
		doc: "If true, other symbols can be visible even if they collide with the text.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"text-optional": {
		type: "boolean",
		"default": false,
		doc: "If true, icons will display without their corresponding text when the text collides with other symbols and the icon does not.",
		requires: [
			"text-field",
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	visibility: {
		type: "enum",
		values: {
			visible: {
				doc: "The layer is shown."
			},
			none: {
				doc: "The layer is not shown."
			}
		},
		"default": "visible",
		doc: "Whether this layer is displayed.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"expressions support": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	}
};
var layout_raster = {
	visibility: {
		type: "enum",
		values: {
			visible: {
				doc: "The layer is shown."
			},
			none: {
				doc: "The layer is not shown."
			}
		},
		"default": "visible",
		doc: "Whether this layer is displayed.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"expressions support": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	}
};
var layout_hillshade = {
	visibility: {
		type: "enum",
		values: {
			visible: {
				doc: "The layer is shown."
			},
			none: {
				doc: "The layer is not shown."
			}
		},
		"default": "visible",
		doc: "Whether this layer is displayed.",
		"sdk-support": {
			"basic functionality": {
				js: "0.43.0",
				android: "6.0.0",
				ios: "4.0.0"
			},
			"expressions support": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	}
};
var filter = {
	type: "array",
	value: "*",
	doc: "A filter selects specific features from a layer."
};
var filter_symbol = {
	type: "boolean",
	doc: "Expression which determines whether or not to display a symbol. Symbols support dynamic filtering, meaning this expression can use the `[\"pitch\"]` and `[\"distance-from-center\"]` expressions to reference the current state of the view.",
	"default": false,
	transition: false,
	"property-type": "data-driven",
	expression: {
		interpolated: false,
		parameters: [
			"zoom",
			"feature",
			"pitch",
			"distance-from-center"
		]
	}
};
var filter_fill = {
	type: "boolean",
	doc: "Expression which determines whether or not to display a polygon. Fill layer does NOT support dynamic filtering, meaning this expression can NOT use the `[\"pitch\"]` and `[\"distance-from-center\"]` expressions to reference the current state of the view.",
	"default": false,
	transition: false,
	"property-type": "data-driven",
	expression: {
		interpolated: false,
		parameters: [
			"zoom",
			"feature"
		]
	}
};
var filter_hillshade = {
	type: "boolean",
	doc: "Expression which determines whether or not to enable the hillshade layer. Hillshade layer does NOT support dynamic filtering, meaning this expression can NOT use the `[\"pitch\"]` and `[\"distance-from-center\"]` expressions to reference the current state of the view.",
	"default": false,
	transition: false,
	"property-type": "data-driven",
	expression: {
		interpolated: false,
		parameters: [
			"zoom",
			"feature"
		]
	}
};
var filter_raster = {
	type: "boolean",
	doc: "Expression which determines whether or not to enable the raster layer. Raster layer does NOT support dynamic filtering, meaning this expression can NOT use the `[\"pitch\"]` and `[\"distance-from-center\"]` expressions to reference the current state of the view.",
	"default": false,
	transition: false,
	"property-type": "data-driven",
	expression: {
		interpolated: false,
		parameters: [
			"zoom",
			"feature"
		]
	}
};
var filter_clip = {
	type: "boolean",
	doc: "Expression which determines whether or not to enable the clip layer. Clip layer does NOT support dynamic filtering, meaning this expression can NOT use the `[\"pitch\"]` and `[\"distance-from-center\"]` expressions to reference the current state of the view.",
	"default": false,
	transition: false,
	"property-type": "data-driven",
	expression: {
		interpolated: false,
		parameters: [
			"zoom",
			"feature"
		]
	}
};
var filter_model = {
	type: "boolean",
	doc: "Expression which determines whether or not to display a model. Model layer does NOT support dynamic filtering, meaning this expression can NOT use the `[\"pitch\"]` and `[\"distance-from-center\"]` expressions to reference the current state of the view.",
	"default": false,
	transition: false,
	"property-type": "data-driven",
	expression: {
		interpolated: false,
		parameters: [
			"zoom",
			"feature"
		]
	}
};
var filter_line = {
	type: "boolean",
	doc: "Expression which determines whether or not to display a Polygon or LineString. Line layer does NOT support dynamic filtering, meaning this expression can NOT use the `[\"pitch\"]` and `[\"distance-from-center\"]` expressions to reference the current state of the view.",
	"default": false,
	transition: false,
	"property-type": "data-driven",
	expression: {
		interpolated: false,
		parameters: [
			"zoom",
			"feature"
		]
	}
};
var filter_circle = {
	type: "boolean",
	doc: "Expression which determines whether or not to display a circle. Circle layer does NOT support dynamic filtering, meaning this expression can NOT use the `[\"pitch\"]` and `[\"distance-from-center\"]` expressions to reference the current state of the view.",
	"default": false,
	transition: false,
	"property-type": "data-driven",
	expression: {
		interpolated: false,
		parameters: [
			"zoom",
			"feature"
		]
	}
};
var filter_heatmap = {
	type: "boolean",
	doc: "Expression used to determine whether a point is being displayed or not. Heatmap layer does NOT support dynamic filtering, meaning this expression can NOT use the `[\"pitch\"]` and `[\"distance-from-center\"]` expressions to reference the current state of the view.",
	"default": false,
	transition: false,
	"property-type": "data-driven",
	expression: {
		interpolated: false,
		parameters: [
			"zoom",
			"feature"
		]
	}
};
var filter_operator = {
	type: "enum",
	values: {
		"==": {
			doc: "`[\"==\", key, value]` equality: `feature[key] = value`"
		},
		"!=": {
			doc: "`[\"!=\", key, value]` inequality: `feature[key] ≠ value`"
		},
		">": {
			doc: "`[\">\", key, value]` greater than: `feature[key] > value`"
		},
		">=": {
			doc: "`[\">=\", key, value]` greater than or equal: `feature[key] ≥ value`"
		},
		"<": {
			doc: "`[\"<\", key, value]` less than: `feature[key] < value`"
		},
		"<=": {
			doc: "`[\"<=\", key, value]` less than or equal: `feature[key] ≤ value`"
		},
		"in": {
			doc: "`[\"in\", key, v0, ..., vn]` set inclusion: `feature[key] ∈ {v0, ..., vn}`"
		},
		"!in": {
			doc: "`[\"!in\", key, v0, ..., vn]` set exclusion: `feature[key] ∉ {v0, ..., vn}`"
		},
		all: {
			doc: "`[\"all\", f0, ..., fn]` logical `AND`: `f0 ∧ ... ∧ fn`"
		},
		any: {
			doc: "`[\"any\", f0, ..., fn]` logical `OR`: `f0 ∨ ... ∨ fn`"
		},
		none: {
			doc: "`[\"none\", f0, ..., fn]` logical `NOR`: `¬f0 ∧ ... ∧ ¬fn`"
		},
		has: {
			doc: "`[\"has\", key]` `feature[key]` exists"
		},
		"!has": {
			doc: "`[\"!has\", key]` `feature[key]` does not exist"
		}
	},
	doc: "The filter operator."
};
var geometry_type = {
	type: "enum",
	values: {
		Point: {
			doc: "Filter to point geometries."
		},
		LineString: {
			doc: "Filter to line geometries."
		},
		Polygon: {
			doc: "Filter to polygon geometries."
		}
	},
	doc: "The geometry type for the filter to select."
};
var function_stop = {
	type: "array",
	minimum: 0,
	maximum: 24,
	value: [
		"number",
		"color"
	],
	length: 2,
	doc: "Zoom level and value pair."
};
var expression$1 = {
	type: "array",
	value: "*",
	minimum: 1,
	doc: "An expression defines a function that can be used for data-driven style properties or feature filters."
};
var expression_name = {
	doc: "",
	type: "enum",
	values: {
		"let": {
			doc: "Binds expressions to named variables, which can then be referenced in the result expression using [\"var\", \"variable_name\"].",
			group: "Variable binding",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"var": {
			doc: "References variable bound using \"let\".",
			group: "Variable binding",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		config: {
			doc: "Retrieves the configuration value for the given option.",
			group: "Lookup",
			"sdk-support": {
				"basic functionality": {
					js: "3.0.0",
					android: "11.0.0",
					ios: "11.0.0"
				}
			}
		},
		literal: {
			doc: "Provides a literal array or object value.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		array: {
			doc: "Asserts that the input is an array (optionally with a specific item type and length). If, when the input expression is evaluated, it is not of the asserted type, then this assertion will cause the whole expression to be aborted.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		at: {
			doc: "Retrieves an item from an array.",
			group: "Lookup",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"in": {
			doc: "Determines whether an item exists in an array or a substring exists in a string. In the specific case when the second and third arguments are string literals, you must wrap at least one of them in a [`literal`](#types-literal) expression to hint correct interpretation to the [type system](#type-system).",
			group: "Lookup",
			"sdk-support": {
				"basic functionality": {
					js: "1.6.0",
					android: "9.1.0",
					ios: "5.8.0"
				}
			}
		},
		"index-of": {
			doc: "Returns the first position at which an item can be found in an array or a substring can be found in a string, or `-1` if the input cannot be found. Accepts an optional index from where to begin the search.",
			group: "Lookup",
			"sdk-support": {
				"basic functionality": {
					js: "1.10.0",
					android: "10.0.0",
					ios: "10.0.0"
				}
			}
		},
		slice: {
			doc: "Returns an item from an array or a substring from a string from a specified start index, or between a start index and an end index if set. The return value is inclusive of the start index but not of the end index.",
			group: "Lookup",
			"sdk-support": {
				"basic functionality": {
					js: "1.10.0",
					android: "10.0.0",
					ios: "10.0.0"
				}
			}
		},
		"case": {
			doc: "Selects the first output whose corresponding test condition evaluates to true, or the fallback value otherwise.",
			group: "Decision",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		match: {
			doc: "Selects the output for which the label value matches the input value, or the fallback value if no match is found. The input can be any expression (for example, `[\"get\", \"building_type\"]`). Each label must be unique, and must be either:\n - a single literal value; or\n - an array of literal values, the values of which must be all strings or all numbers (for example `[100, 101]` or `[\"c\", \"b\"]`).\n\nThe input matches if any of the values in the array matches using strict equality, similar to the `\"in\"` operator.\nIf the input type does not match the type of the labels, the result will be the fallback value.",
			group: "Decision",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		coalesce: {
			doc: "Evaluates each expression in turn until the first valid value is obtained. Invalid values are `null` and [`'image'`](#types-image) expressions that are unavailable in the style. If all values are invalid, `coalesce` returns the first value listed.",
			group: "Decision",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		step: {
			doc: "Produces discrete, stepped results by evaluating a piecewise-constant function defined by pairs of input and output values (\"stops\"). The `input` may be any numeric expression (e.g., `[\"get\", \"population\"]`). Stop inputs must be numeric literals in strictly ascending order. Returns the output value of the stop just less than the input, or the first output if the input is less than the first stop.",
			group: "Ramps, scales, curves",
			"sdk-support": {
				"basic functionality": {
					js: "0.42.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		interpolate: {
			doc: "Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). The `input` may be any numeric expression (e.g., `[\"get\", \"population\"]`). Stop inputs must be numeric literals in strictly ascending order. The output type must be `number`, `array<number>`, or `color`.\n\nInterpolation types:\n- `[\"linear\"]`: Interpolates linearly between the pair of stops just less than and just greater than the input.\n- `[\"exponential\", base]`: Interpolates exponentially between the stops just less than and just greater than the input. `base` controls the rate at which the output increases: higher values make the output increase more towards the high end of the range. With values close to 1 the output increases linearly.\n- `[\"cubic-bezier\", x1, y1, x2, y2]`: Interpolates using the cubic bezier curve defined by the given control points.",
			group: "Ramps, scales, curves",
			"sdk-support": {
				"basic functionality": {
					js: "0.42.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"interpolate-hcl": {
			doc: "Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). Works like `interpolate`, but the output type must be `color`, and the interpolation is performed in the Hue-Chroma-Luminance color space.",
			group: "Ramps, scales, curves",
			"sdk-support": {
				"basic functionality": {
					js: "0.49.0"
				}
			}
		},
		"interpolate-lab": {
			doc: "Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). Works like `interpolate`, but the output type must be `color`, and the interpolation is performed in the CIELAB color space.",
			group: "Ramps, scales, curves",
			"sdk-support": {
				"basic functionality": {
					js: "0.49.0"
				}
			}
		},
		ln2: {
			doc: "Returns mathematical constant ln(2).",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		pi: {
			doc: "Returns the mathematical constant pi.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		e: {
			doc: "Returns the mathematical constant e.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"typeof": {
			doc: "Returns a string describing the type of the given value.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		string: {
			doc: "Asserts that the input value is a string. If multiple values are provided, each one is evaluated in order until a string is obtained. If none of the inputs are strings, the expression is an error.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		number: {
			doc: "Asserts that the input value is a number. If multiple values are provided, each one is evaluated in order until a number is obtained. If none of the inputs are numbers, the expression is an error.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		boolean: {
			doc: "Asserts that the input value is a boolean. If multiple values are provided, each one is evaluated in order until a boolean is obtained. If none of the inputs are booleans, the expression is an error.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		object: {
			doc: "Asserts that the input value is an object. If multiple values are provided, each one is evaluated in order until an object is obtained. If none of the inputs are objects, the expression is an error.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		collator: {
			doc: "Returns a `collator` for use in locale-dependent comparison operations. The `case-sensitive` and `diacritic-sensitive` options default to `false`. The `locale` argument specifies the IETF language tag of the locale to use. If none is provided, the default locale is used. If the requested locale is not available, the `collator` will use a system-defined fallback locale. Use `resolved-locale` to test the results of locale fallback behavior.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.45.0",
					android: "6.5.0",
					ios: "4.2.0"
				}
			}
		},
		format: {
			doc: "Returns a `formatted` string for displaying mixed-format text in the `text-field` property. The input may contain a string literal or expression, including an [`'image'`](#types-image) expression. Strings may be followed by a style override object that supports the following properties:\n- `\"text-font\"`: Overrides the font stack specified by the root layout property.\n- `\"text-color\"`: Overrides the color specified by the root paint property.\n- `\"font-scale\"`: Applies a scaling factor on `text-size` as specified by the root layout property.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.48.0",
					android: "6.7.0",
					ios: "4.6.0"
				},
				"text-font": {
					js: "0.48.0",
					android: "6.7.0",
					ios: "4.6.0"
				},
				"font-scale": {
					js: "0.48.0",
					android: "6.7.0",
					ios: "4.6.0"
				},
				"text-color": {
					js: "1.3.0",
					android: "7.3.0",
					ios: "4.10.0"
				},
				image: {
					js: "1.6.0",
					android: "8.6.0",
					ios: "5.7.0"
				}
			}
		},
		image: {
			doc: "Returns a [`ResolvedImage`](/style-spec/reference/types/#resolvedimage) for use in [`icon-image`](/style-spec/reference/layers/#layout-symbol-icon-image), `*-pattern` entries, and as a section in the [`'format'`](#types-format) expression.\n\nA [`'coalesce'`](#coalesce) expression containing `image` expressions will evaluate to the first listed image that is currently in the style. This validation process is synchronous and requires the image to have been added to the style before requesting it in the `'image'` argument.\n\nEvery image name can be followed by an optional [`ImageOptions`](/style-spec/reference/types/#imageoptions) object, which will be used for vector images only.\n\nTo implement crossfading between two images within a symbol layer using the [`icon-image-cross-fade`](/style-spec/reference/layers/#paint-symbol-icon-image-cross-fade) attribute, include a second image as the second argument in the `'image'` expression.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "1.4.0",
					android: "8.6.0",
					ios: "5.7.0"
				}
			}
		},
		"number-format": {
			doc: "Converts the input number into a string representation using the providing formatting rules. If set, the `locale` argument specifies the locale to use, as a BCP 47 language tag. If set, the `currency` argument specifies an ISO 4217 code to use for currency-style formatting. If set, the `unit` argument specifies a [simple ECMAScript unit](https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier) to use for unit-style formatting. If set, the `min-fraction-digits` and `max-fraction-digits` arguments specify the minimum and maximum number of fractional digits to include.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.54.0",
					android: "8.4.0",
					ios: "5.4.0"
				}
			}
		},
		"to-string": {
			doc: "Converts the input value to a string. If the input is `null`, the result is `\"\"`. If the input is a [`boolean`](#types-boolean), the result is `\"true\"` or `\"false\"`. If the input is a number, it is converted to a string as specified by the [\"NumberToString\" algorithm](https://tc39.github.io/ecma262/#sec-tostring-applied-to-the-number-type) of the ECMAScript Language Specification. If the input is a [`color`](#color), it is converted to a string of the form `\"rgba(r,g,b,a)\"`, where `r`, `g`, and `b` are numerals ranging from 0 to 255, and `a` ranges from 0 to 1. If the input is an [`'image'`](#types-image) expression, `'to-string'` returns the image name. Otherwise, the input is converted to a string in the format specified by the [`JSON.stringify`](https://tc39.github.io/ecma262/#sec-json.stringify) function of the ECMAScript Language Specification.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"to-number": {
			doc: "Converts the input value to a number, if possible. If the input is `null` or `false`, the result is 0. If the input is `true`, the result is 1. If the input is a string, it is converted to a number as specified by the [\"ToNumber Applied to the String Type\" algorithm](https://tc39.github.io/ecma262/#sec-tonumber-applied-to-the-string-type) of the ECMAScript Language Specification. If multiple values are provided, each one is evaluated in order until the first successful conversion is obtained. If none of the inputs can be converted, the expression is an error.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"to-boolean": {
			doc: "Converts the input value to a boolean. The result is `false` when then input is an empty string, 0, `false`, `null`, or `NaN`; otherwise it is `true`.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"to-rgba": {
			doc: "Returns a four-element array containing the input color's red, green, blue, and alpha components, in that order.",
			group: "Color",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"to-hsla": {
			doc: "Returns a four-element array containing the input color's Hue, Saturation, Luminance and alpha components, in that order.",
			group: "Color",
			"sdk-support": {
				"basic functionality": {
					js: "3.9.0",
					android: "11.9.0",
					ios: "11.9.0"
				}
			}
		},
		"to-color": {
			doc: "Converts the input value to a color. If multiple values are provided, each one is evaluated in order until the first successful conversion is obtained. If none of the inputs can be converted, the expression is an error.",
			group: "Types",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		rgb: {
			doc: "Creates a color value from red, green, and blue components, which must range between 0 and 255, and an alpha component of 1. If any component is out of range, the expression is an error.",
			group: "Color",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		rgba: {
			doc: "Creates a color value from red, green, blue components, which must range between 0 and 255, and an alpha component which must range between 0 and 1. If any component is out of range, the expression is an error.",
			group: "Color",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		hsl: {
			doc: "Creates a color value from hue (range 0-360), saturation and lightness components (range 0-100), and an alpha component of 1. If any component is out of range, the expression is an error.",
			group: "Color",
			"sdk-support": {
				"basic functionality": {
					js: "2.12.1",
					android: "10.11.0",
					ios: "10.11.0"
				}
			}
		},
		hsla: {
			doc: "Creates a color value from hue (range 0-360), saturation and lightness components (range 0-100), and an alpha component (range 0-1). If any component is out of range, the expression is an error.",
			group: "Color",
			"sdk-support": {
				"basic functionality": {
					js: "2.12.1",
					android: "10.11.0",
					ios: "10.11.0"
				}
			}
		},
		get: {
			doc: "Retrieves a property value from the current feature's properties, or from another object if a second argument is provided. Returns `null` if the requested property is missing.",
			group: "Lookup",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		has: {
			doc: "Tests for the presence of an property value in the current feature's properties, or from another object if a second argument is provided.",
			group: "Lookup",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		length: {
			doc: "Returns the length of an array or string.",
			group: "Lookup",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		properties: {
			doc: "Returns the feature properties object. Note that in some cases, it may be more efficient to use `[\"get\", \"property_name\"]` directly.",
			group: "Feature data",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"feature-state": {
			doc: "Retrieves a property value from the current feature's state. Returns `null` if the requested property is not present on the feature's state. A feature's state is not part of the GeoJSON or vector tile data, and must be set programmatically on each feature. Features are identified by their `id` attribute, which must be an integer or a string that can be cast to an integer. Note that [\"feature-state\"] can only be used with paint properties that support data-driven styling.",
			group: "Feature data",
			"sdk-support": {
				"basic functionality": {
					js: "0.46.0",
					android: "10.0.0",
					ios: "10.0.0"
				}
			}
		},
		"geometry-type": {
			doc: "Returns the feature's geometry type: `Point`, `LineString` or `Polygon`. `Multi*` feature types return the singular forms.",
			group: "Feature data",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		id: {
			doc: "Returns the feature's id, if it has one.",
			group: "Feature data",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		zoom: {
			doc: "Returns the current zoom level. Note that in style layout and paint properties, [\"zoom\"] may only appear as the input to a top-level \"step\" or \"interpolate\" expression.",
			group: "Camera",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		pitch: {
			doc: "Returns the current pitch in degrees. `[\"pitch\"]` may only be used in the `filter` expression for a `symbol` layer.",
			group: "Camera",
			"sdk-support": {
				"basic functionality": {
					js: "2.6.0",
					android: "10.9.0",
					ios: "10.9.0"
				}
			}
		},
		"distance-from-center": {
			doc: "Returns the distance of a `symbol` instance from the center of the map. The distance is measured in pixels divided by the height of the map container. It measures 0 at the center, decreases towards the camera and increase away from the camera. For example, if the height of the map is 1000px, a value of -1 means 1000px away from the center towards the camera, and a value of 1 means a distance of 1000px away from the camera from the center. `[\"distance-from-center\"]` may only be used in the `filter` expression for a `symbol` layer.",
			group: "Camera",
			"sdk-support": {
				"basic functionality": {
					js: "2.6.0",
					android: "10.9.0",
					ios: "10.9.0"
				}
			}
		},
		"measure-light": {
			doc: "Returns a requested property of the light configuration based on the supplied options. Currently the only supported option is `brightness` which returns the global brightness value of the lights on a scale of 0 to 1, where 0 means total darkness and 1 means full brightness. This expression works only with 3D light, i.e. when `lights` root property is defined.",
			group: "Lookup",
			"sdk-support": {
				"basic functionality": {
					js: "3.0.0",
					android: "11.0.0",
					ios: "11.0.0"
				}
			}
		},
		"heatmap-density": {
			doc: "Returns the kernel density estimation of a pixel in a heatmap layer, which is a relative measure of how many data points are crowded around a particular pixel. Can only be used in the `heatmap-color` property.",
			group: "Heatmap",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"line-progress": {
			doc: "Returns the progress along a gradient line. Can only be used in the `line-gradient` and `line-z-offset` properties.",
			group: "Feature data",
			"sdk-support": {
				"basic functionality": {
					js: "0.45.0",
					android: "6.5.0",
					ios: "4.6.0"
				}
			}
		},
		"sky-radial-progress": {
			doc: "Returns the distance of a point on the sky from the sun position. Returns 0 at sun position and 1 when the distance reaches `sky-gradient-radius`. Can only be used in the `sky-gradient` property.",
			group: "sky",
			"sdk-support": {
				"basic functionality": {
					js: "2.0.0",
					ios: "10.0.0",
					android: "10.0.0"
				}
			}
		},
		accumulated: {
			doc: "Returns the value of a cluster property accumulated so far. Can only be used in the `clusterProperties` option of a clustered GeoJSON source.",
			group: "Feature data",
			"sdk-support": {
				"basic functionality": {
					js: "0.53.0",
					android: "8.4.0",
					ios: "5.5.0"
				}
			}
		},
		"+": {
			doc: "Returns the sum of the inputs.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"*": {
			doc: "Returns the product of the inputs.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"-": {
			doc: "For two inputs, returns the result of subtracting the second input from the first. For a single input, returns the result of subtracting it from 0.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"/": {
			doc: "Returns the result of floating point division of the first input by the second.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"%": {
			doc: "Returns the remainder after integer division of the first input by the second.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"^": {
			doc: "Returns the result of raising the first input to the power specified by the second.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		sqrt: {
			doc: "Returns the square root of the input.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.42.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		log10: {
			doc: "Returns the base-ten logarithm of the input.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		ln: {
			doc: "Returns the natural logarithm of the input.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		log2: {
			doc: "Returns the base-two logarithm of the input.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		sin: {
			doc: "Returns the sine of the input.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		cos: {
			doc: "Returns the cosine of the input.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		tan: {
			doc: "Returns the tangent of the input.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		asin: {
			doc: "Returns the arcsine of the input.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		acos: {
			doc: "Returns the arccosine of the input.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		atan: {
			doc: "Returns the arctangent of the input.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		min: {
			doc: "Returns the minimum value of the inputs.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		max: {
			doc: "Returns the maximum value of the inputs.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		round: {
			doc: "Rounds the input to the nearest integer. Halfway values are rounded away from zero. For example, `[\"round\", -1.5]` evaluates to -2.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.45.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		abs: {
			doc: "Returns the absolute value of the input.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.45.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		ceil: {
			doc: "Returns the smallest integer that is greater than or equal to the input.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.45.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		floor: {
			doc: "Returns the largest integer that is less than or equal to the input.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "0.45.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		distance: {
			doc: "Returns the shortest distance in meters between the evaluated feature and the input geometry. The input value can be a valid GeoJSON of type `Point`, `MultiPoint`, `LineString`, `MultiLineString`, `Polygon`, `MultiPolygon`, `Feature`, or `FeatureCollection`. Distance values returned may vary in precision due to loss in precision from encoding geometries, particularly below zoom level 13.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "3.0.0",
					android: "9.2.0",
					ios: "5.9.0"
				}
			}
		},
		"==": {
			doc: "Returns `true` if the input values are equal, `false` otherwise. The comparison is strictly typed: values of different runtime types are always considered unequal. Cases where the types are known to be different at parse time are considered invalid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
			group: "Decision",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				},
				collator: {
					js: "0.45.0",
					android: "6.5.0",
					ios: "4.2.0"
				}
			}
		},
		"!=": {
			doc: "Returns `true` if the input values are not equal, `false` otherwise. The comparison is strictly typed: values of different runtime types are always considered unequal. Cases where the types are known to be different at parse time are considered invalid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
			group: "Decision",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				},
				collator: {
					js: "0.45.0",
					android: "6.5.0",
					ios: "4.2.0"
				}
			}
		},
		">": {
			doc: "Returns `true` if the first input is strictly greater than the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
			group: "Decision",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				},
				collator: {
					js: "0.45.0",
					android: "6.5.0",
					ios: "4.2.0"
				}
			}
		},
		"<": {
			doc: "Returns `true` if the first input is strictly less than the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
			group: "Decision",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				},
				collator: {
					js: "0.45.0",
					android: "6.5.0",
					ios: "4.2.0"
				}
			}
		},
		">=": {
			doc: "Returns `true` if the first input is greater than or equal to the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
			group: "Decision",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				},
				collator: {
					js: "0.45.0",
					android: "6.5.0",
					ios: "4.2.0"
				}
			}
		},
		"<=": {
			doc: "Returns `true` if the first input is less than or equal to the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
			group: "Decision",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				},
				collator: {
					js: "0.45.0",
					android: "6.5.0",
					ios: "4.2.0"
				}
			}
		},
		all: {
			doc: "Returns `true` if all the inputs are `true`, `false` otherwise. The inputs are evaluated in order, and evaluation is short-circuiting: once an input expression evaluates to `false`, the result is `false` and no further input expressions are evaluated.",
			group: "Decision",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		any: {
			doc: "Returns `true` if any of the inputs are `true`, `false` otherwise. The inputs are evaluated in order, and evaluation is short-circuiting: once an input expression evaluates to `true`, the result is `true` and no further input expressions are evaluated.",
			group: "Decision",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"!": {
			doc: "Logical negation. Returns `true` if the input is `false`, and `false` if the input is `true`.",
			group: "Decision",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		within: {
			doc: "Returns `true` if the evaluated feature is fully contained inside a boundary of the input geometry, `false` otherwise. The input value can be a valid GeoJSON of type `Polygon`, `MultiPolygon`, `Feature`, or `FeatureCollection`. Supported features for evaluation:\n- `Point`: Returns `false` if a point is on the boundary or falls outside the boundary.\n- `LineString`: Returns `false` if any part of a line falls outside the boundary, the line intersects the boundary, or a line's endpoint is on the boundary.",
			group: "Decision",
			"sdk-support": {
				"basic functionality": {
					js: "1.9.0",
					android: "9.1.0",
					ios: "5.8.0"
				}
			}
		},
		"is-supported-script": {
			doc: "Returns `true` if the input string is expected to render legibly. Returns `false` if the input string contains sections that cannot be rendered without potential loss of meaning (e.g. Indic scripts that require complex text shaping, or right-to-left scripts if the the `mapbox-gl-rtl-text` plugin is not in use in Mapbox GL JS).",
			group: "String",
			"sdk-support": {
				"basic functionality": {
					js: "0.45.0",
					android: "6.6.0",
					ios: "4.1.0"
				}
			}
		},
		upcase: {
			doc: "Returns the input string converted to uppercase. Follows the Unicode Default Case Conversion algorithm and the locale-insensitive case mappings in the Unicode Character Database.",
			group: "String",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		downcase: {
			doc: "Returns the input string converted to lowercase. Follows the Unicode Default Case Conversion algorithm and the locale-insensitive case mappings in the Unicode Character Database.",
			group: "String",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		concat: {
			doc: "Returns a `string` consisting of the concatenation of the inputs. Each input is converted to a string as if by `to-string`.",
			group: "String",
			"sdk-support": {
				"basic functionality": {
					js: "0.41.0",
					android: "6.0.0",
					ios: "4.0.0"
				}
			}
		},
		"resolved-locale": {
			doc: "Returns the IETF language tag of the locale being used by the provided `collator`. This can be used to determine the default system locale, or to determine if a requested locale was successfully loaded.",
			group: "String",
			"sdk-support": {
				"basic functionality": {
					js: "0.45.0",
					android: "6.5.0",
					ios: "4.2.0"
				}
			}
		},
		"raster-value": {
			doc: "Returns the raster value of a pixel computed via `raster-color-mix`. Can only be used in the `raster-color` property.",
			group: "Raster Colorization",
			"sdk-support": {
				"basic functionality": {
					js: "3.0.0",
					android: "11.0.0",
					ios: "11.0.0"
				}
			}
		},
		"raster-particle-speed": {
			doc: "Returns the length of the particle velocity vector. Can only be used in the `raster-particle-color` property.",
			group: "Raster Particle Animation",
			"sdk-support": {
				"basic functionality": {
					js: "3.3.0",
					android: "11.4.0",
					ios: "11.4.0"
				}
			}
		},
		random: {
			doc: "Returns a random value in the specified range (first two input numbers) based on a supplied seed (third input). The seed can be an expression or a constant number or string value.",
			group: "Math",
			"sdk-support": {
				"basic functionality": {
					js: "3.0.0",
					android: "11.0.0",
					ios: "11.0.0"
				}
			}
		}
	}
};
var fog = {
	range: {
		type: "array",
		"default": [
			0.5,
			10
		],
		minimum: -20,
		maximum: 20,
		length: 2,
		value: "number",
		"property-type": "data-constant",
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		doc: "The start and end distance range in which fog fades from fully transparent to fully opaque. The distance to the point at the center of the map is defined as zero, so that negative range values are closer to the camera, and positive values are farther away.",
		example: [
			0.5,
			10
		],
		"sdk-support": {
			"basic functionality": {
				js: "2.3.0",
				android: "10.6.0",
				ios: "10.6.0"
			}
		}
	},
	color: {
		type: "color",
		"property-type": "data-constant",
		"default": "#ffffff",
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "The color of the atmosphere region immediately below the horizon and within the `range` and above the horizon and within `horizon-blend`. Using opacity is recommended only for smoothly transitioning fog on/off as anything less than 100% opacity results in more tiles loaded and drawn.",
		"sdk-support": {
			"basic functionality": {
				js: "2.3.0",
				android: "10.6.0",
				ios: "10.6.0"
			}
		}
	},
	"high-color": {
		type: "color",
		"property-type": "data-constant",
		"default": "#245cdf",
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "The color of the atmosphere region above the horizon, `high-color` extends further above the horizon than the `color` property and its spread can be controlled with `horizon-blend`. The opacity can be set to `0` to remove the high atmosphere color contribution.",
		"sdk-support": {
			"basic functionality": {
				js: "2.9.0",
				android: "10.6.0",
				ios: "10.6.0"
			}
		}
	},
	"space-color": {
		type: "color",
		"property-type": "data-constant",
		"default": [
			"interpolate",
			[
				"linear"
			],
			[
				"zoom"
			],
			4,
			"#010b19",
			7,
			"#367ab9"
		],
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "The color of the region above the horizon and after the end of the `horizon-blend` contribution. The opacity can be set to `0` to have a transparent background.",
		"sdk-support": {
			"basic functionality": {
				js: "2.9.0",
				android: "10.6.0",
				ios: "10.6.0"
			}
		}
	},
	"horizon-blend": {
		type: "number",
		"property-type": "data-constant",
		"default": [
			"interpolate",
			[
				"linear"
			],
			[
				"zoom"
			],
			4,
			0.2,
			7,
			0.1
		],
		minimum: 0,
		maximum: 1,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Horizon blend applies a smooth fade from the color of the atmosphere to the color of space. A value of zero leaves a sharp transition from atmosphere to space. Increasing the value blends the color of atmosphere into increasingly high angles of the sky.",
		"sdk-support": {
			"basic functionality": {
				js: "2.3.0",
				android: "10.6.0",
				ios: "10.6.0"
			}
		}
	},
	"star-intensity": {
		type: "number",
		"property-type": "data-constant",
		"default": [
			"interpolate",
			[
				"linear"
			],
			[
				"zoom"
			],
			5,
			0.35,
			6,
			0
		],
		minimum: 0,
		maximum: 1,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "A value controlling the star intensity where `0` will show no stars and `1` will show stars at their maximum intensity.",
		"sdk-support": {
			"basic functionality": {
				js: "2.9.0",
				android: "10.6.0",
				ios: "10.6.0"
			}
		}
	},
	"vertical-range": {
		type: "array",
		"default": [
			0,
			0
		],
		minimum: 0,
		length: 2,
		value: "number",
		"property-type": "data-constant",
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		doc: "An array of two number values, specifying the vertical range, measured in meters, over which the fog should gradually fade out. When both parameters are set to zero, the fog will be rendered without any vertical constraints.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	}
};
var snow = {
	density: {
		type: "number",
		"property-type": "data-constant",
		"default": [
			"interpolate",
			[
				"linear"
			],
			[
				"zoom"
			],
			11,
			0,
			13,
			0.85
		],
		minimum: 0,
		maximum: 1,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Snow particles density. Controls the overall particles number.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	intensity: {
		type: "number",
		"property-type": "data-constant",
		"default": 1,
		minimum: 0,
		maximum: 1,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Snow particles movement factor. Controls the overall particles movement speed.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	color: {
		type: "color",
		"property-type": "data-constant",
		"default": "#ffffff",
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Snow particles color.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	opacity: {
		type: "number",
		"property-type": "data-constant",
		"default": 1,
		minimum: 0,
		maximum: 1,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Snow particles opacity.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	vignette: {
		type: "number",
		"property-type": "data-constant",
		"default": [
			"interpolate",
			[
				"linear"
			],
			[
				"zoom"
			],
			11,
			0,
			13,
			0.3
		],
		minimum: 0,
		maximum: 1,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Snow vignette screen-space effect. Adds snow tint to screen corners",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	"vignette-color": {
		type: "color",
		"property-type": "data-constant",
		"default": "#ffffff",
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Snow vignette screen-space corners tint color.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	"center-thinning": {
		type: "number",
		"property-type": "data-constant",
		"default": 0.4,
		minimum: 0,
		maximum: 1,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Thinning factor of snow particles from center. 0 - no thinning. 1 - maximal central area thinning.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	direction: {
		type: "array",
		"default": [
			0,
			50
		],
		minimum: 0,
		maximum: 360,
		length: 2,
		value: "number",
		"property-type": "data-constant",
		transition: true,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		doc: "Main snow particles direction. Azimuth and polar angles",
		example: [
			0,
			45
		],
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	"flake-size": {
		type: "number",
		"property-type": "data-constant",
		"default": 0.71,
		minimum: 0,
		maximum: 5,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Snow flake particle size. Correlates with individual particle screen size",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	}
};
var rain = {
	density: {
		type: "number",
		"property-type": "data-constant",
		"default": [
			"interpolate",
			[
				"linear"
			],
			[
				"zoom"
			],
			11,
			0,
			13,
			0.5
		],
		minimum: 0,
		maximum: 1,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Rain particles density. Controls the overall screen density of the rain.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	intensity: {
		type: "number",
		"property-type": "data-constant",
		"default": 1,
		minimum: 0,
		maximum: 1,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Rain particles movement factor. Controls the overall rain particles speed",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	color: {
		type: "color",
		"property-type": "data-constant",
		"default": [
			"interpolate",
			[
				"linear"
			],
			[
				"measure-light",
				"brightness"
			],
			0,
			"#03113d",
			0.3,
			"#a8adbc"
		],
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Individual rain particle dorplets color.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	opacity: {
		type: "number",
		"property-type": "data-constant",
		"default": [
			"interpolate",
			[
				"linear"
			],
			[
				"measure-light",
				"brightness"
			],
			0,
			0.88,
			1,
			0.7
		],
		minimum: 0,
		maximum: 1,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Rain particles opacity.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	vignette: {
		type: "number",
		"property-type": "data-constant",
		"default": [
			"interpolate",
			[
				"linear"
			],
			[
				"zoom"
			],
			11,
			0,
			13,
			1
		],
		minimum: 0,
		maximum: 1,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Screen-space vignette rain tinting effect intensity.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	"vignette-color": {
		type: "color",
		"property-type": "data-constant",
		"default": [
			"interpolate",
			[
				"linear"
			],
			[
				"measure-light",
				"brightness"
			],
			0,
			"#001736",
			0.3,
			"#464646"
		],
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Rain vignette screen-space corners tint color.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	"center-thinning": {
		type: "number",
		"property-type": "data-constant",
		"default": 0.57,
		minimum: 0,
		maximum: 1,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Thinning factor of rain particles from center. 0 - no thinning. 1 - maximal central area thinning.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	direction: {
		type: "array",
		"default": [
			0,
			80
		],
		minimum: 0,
		maximum: 360,
		length: 2,
		value: "number",
		"property-type": "data-constant",
		transition: true,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		doc: "Main rain particles direction. Azimuth and polar angles.",
		example: [
			0,
			45
		],
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	"droplet-size": {
		type: "array",
		"default": [
			2.6,
			18.2
		],
		minimum: 0,
		maximum: 50,
		length: 2,
		value: "number",
		"property-type": "data-constant",
		transition: true,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		doc: "Rain droplet size. x - normal to direction, y - along direction",
		example: [
			0,
			45
		],
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	},
	"distortion-strength": {
		type: "number",
		"property-type": "data-constant",
		"default": 0.7,
		minimum: 0,
		maximum: 1,
		experimental: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			],
			relaxZoomRestriction: true
		},
		transition: true,
		doc: "Rain particles screen-space distortion strength.",
		"sdk-support": {
			"basic functionality": {
				android: "11.9.0",
				ios: "11.9.0"
			}
		}
	}
};
var camera = {
	"camera-projection": {
		doc: "Camera projection describes how 3D world geometry get projected into 2D screen",
		type: "enum",
		values: {
			perspective: {
				doc: "linear projection where distant objects appear smaller than closer objects. Lines that are parallel seem to converge towards a vanishing point"
			},
			orthographic: {
				doc: "Projection where objects are of the same scale regardless of whether they are far away or near to the camera. Parallel lines remains parallel and there is no vanishing point."
			}
		},
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		"default": "perspective",
		"property-type": "data-constant"
	}
};
var colorTheme = {
	data: {
		type: "string",
		doc: "Expects a base64 encoded PNG image which represents a cube strip LUT. The height of the image cannot exceed 32 pixels and the width must be equal to the height squared.",
		transition: false,
		"property-type": "data-constant",
		expression: {
			interpolated: false
		}
	}
};
var indoor = {
	floorplanFeaturesetId: {
		type: "string",
		doc: "An ID of a featureset to be used to query indoor floorplans.",
		experimental: true,
		transition: false,
		"property-type": "data-constant",
		expression: {
			interpolated: false
		}
	},
	buildingFeaturesetId: {
		type: "string",
		doc: "An ID of a featureset to be used to add interactivity for building selection.",
		experimental: true,
		transition: false,
		"property-type": "data-constant",
		expression: {
			interpolated: false
		}
	}
};
var light = {
	anchor: {
		type: "enum",
		"default": "viewport",
		values: {
			map: {
				doc: "The position of the light source is aligned to the rotation of the map."
			},
			viewport: {
				doc: "The position of the light source is aligned to the rotation of the viewport."
			}
		},
		"property-type": "data-constant",
		transition: false,
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		doc: "Whether extruded geometries are lit relative to the map or viewport.",
		example: "map",
		"sdk-support": {
			"basic functionality": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		}
	},
	position: {
		type: "array",
		"default": [
			1.15,
			210,
			30
		],
		length: 3,
		value: "number",
		"property-type": "data-constant",
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		doc: "Position of the light source relative to lit (extruded) geometries, in [r radial coordinate, a azimuthal angle, p polar angle] where r indicates the distance from the center of the base of an object to its light, a indicates the position of the light relative to 0° (0° when `light.anchor` is set to `viewport` corresponds to the top of the viewport, or 0° when `light.anchor` is set to `map` corresponds to due north, and degrees proceed clockwise), and p indicates the height of the light (from 0°, directly above, to 180°, directly below).",
		example: [
			1.5,
			90,
			80
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		}
	},
	color: {
		type: "color",
		"property-type": "data-constant",
		"default": "#ffffff",
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		doc: "Color tint for lighting extruded geometries.",
		"sdk-support": {
			"basic functionality": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		}
	},
	intensity: {
		type: "number",
		"property-type": "data-constant",
		"default": 0.5,
		minimum: 0,
		maximum: 1,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		doc: "Intensity of lighting (on a scale from 0 to 1). Higher numbers will present as more extreme contrast.",
		"sdk-support": {
			"basic functionality": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		}
	}
};
var projection = {
	name: {
		type: "enum",
		values: {
			albers: {
				doc: "An Albers equal-area projection centered on the continental United States. You can configure the projection for a different region by setting `center` and `parallels` properties. You may want to set max bounds to constrain the map to the relevant region."
			},
			equalEarth: {
				doc: "An Equal Earth projection."
			},
			equirectangular: {
				doc: "An Equirectangular projection. This projection is very similar to the Plate Carrée projection."
			},
			lambertConformalConic: {
				doc: "A Lambert conformal conic projection. You can configure the projection for a region by setting `center` and `parallels` properties. You may want to set max bounds to constrain the map to the relevant region."
			},
			mercator: {
				doc: "The Mercator projection is the default projection."
			},
			naturalEarth: {
				doc: "A Natural Earth projection."
			},
			winkelTripel: {
				doc: "A Winkel Tripel projection."
			},
			globe: {
				doc: "A globe projection."
			}
		},
		"default": "mercator",
		doc: "The name of the projection to be used for rendering the map.",
		required: true,
		"sdk-support": {
			"basic functionality": {
				js: "2.6.0",
				ios: "10.5.0",
				android: "10.5.0"
			}
		}
	},
	center: {
		type: "array",
		length: 2,
		value: "number",
		"property-type": "data-constant",
		minimum: [
			-180,
			-90
		],
		maximum: [
			180,
			90
		],
		transition: false,
		doc: "The reference longitude and latitude of the projection. `center` takes the form of [lng, lat]. This property is only configurable for conic projections (Albers and Lambert Conformal Conic). All other projections are centered on [0, 0].",
		example: [
			-96,
			37.5
		],
		requires: [
			{
				name: [
					"albers",
					"lambertConformalConic"
				]
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "2.6.0"
			}
		}
	},
	parallels: {
		type: "array",
		length: 2,
		value: "number",
		"property-type": "data-constant",
		minimum: [
			-90,
			-90
		],
		maximum: [
			90,
			90
		],
		transition: false,
		doc: "The standard parallels of the projection, denoting the desired latitude range with minimal distortion. `parallels` takes the form of [lat0, lat1]. This property is only configurable for conic projections (Albers and Lambert Conformal Conic).",
		example: [
			29.5,
			45.5
		],
		requires: [
			{
				name: [
					"albers",
					"lambertConformalConic"
				]
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "2.6.0"
			}
		}
	}
};
var terrain = {
	source: {
		type: "string",
		doc: "Name of a source of `raster_dem` type to be used for terrain elevation.",
		required: true,
		"sdk-support": {
			"basic functionality": {
				js: "2.0.0",
				ios: "10.0.0",
				android: "10.0.0"
			}
		}
	},
	exaggeration: {
		type: "number",
		"property-type": "data-constant",
		"default": 1,
		minimum: 0,
		maximum: 1000,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		doc: "Exaggerates the elevation of the terrain by multiplying the data from the DEM with this value.",
		requires: [
			"source"
		],
		"sdk-support": {
			"basic functionality": {
				js: "2.0.0",
				ios: "10.0.0",
				android: "10.0.0"
			}
		}
	}
};
var paint = [
	"paint_fill",
	"paint_line",
	"paint_circle",
	"paint_heatmap",
	"paint_fill-extrusion",
	"paint_symbol",
	"paint_raster",
	"paint_raster-particle",
	"paint_hillshade",
	"paint_background",
	"paint_sky",
	"paint_model"
];
var paint_fill = {
	"fill-antialias": {
		type: "boolean",
		"default": true,
		doc: "Whether or not the fill should be antialiased.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"fill-opacity": {
		type: "number",
		"default": 1,
		minimum: 0,
		maximum: 1,
		doc: "The opacity of the entire fill layer. In contrast to the `fill-color`, this value will also affect the 1px stroke around the fill, if the stroke is used.",
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.21.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"fill-color": {
		type: "color",
		"default": "#000000",
		doc: "The color of the filled part of this layer. This color can be specified as `rgba` with an alpha component and the color's opacity will not affect the opacity of the 1px stroke, if it is used.",
		transition: true,
		requires: [
			{
				"!": "fill-pattern"
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.19.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"fill-outline-color": {
		type: "color",
		doc: "The outline color of the fill. Matches the value of `fill-color` if unspecified.",
		transition: true,
		requires: [
			{
				"!": "fill-pattern"
			},
			{
				"fill-antialias": true
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.19.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"fill-translate": {
		type: "array",
		value: "number",
		length: 2,
		"default": [
			0,
			0
		],
		transition: true,
		units: "pixels",
		doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"fill-translate-anchor": {
		type: "enum",
		values: {
			map: {
				doc: "The fill is translated relative to the map."
			},
			viewport: {
				doc: "The fill is translated relative to the viewport."
			}
		},
		doc: "Controls the frame of reference for `fill-translate`.",
		"default": "map",
		requires: [
			"fill-translate"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"fill-pattern": {
		type: "resolvedImage",
		transition: false,
		doc: "Name of image in sprite to use for drawing image fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.49.0",
				android: "6.5.0",
				ios: "4.4.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"fill-emissive-strength": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		units: "intensity",
		doc: "Controls the intensity of light emitted on the source features.",
		requires: [
			"lights"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			]
		},
		"property-type": "data-constant"
	},
	"fill-z-offset": {
		type: "number",
		doc: "Specifies an uniform elevation in meters. Note: If the value is zero, the layer will be rendered on the ground. Non-zero values will elevate the layer from the sea level, which can cause it to be rendered below the terrain.",
		"default": 0,
		minimum: 0,
		transition: true,
		experimental: true,
		"sdk-support": {
			"basic functionality": {
				js: "3.7.0"
			},
			"data-driven styling": {
				js: "3.7.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	}
};
var paint_line = {
	"line-opacity": {
		type: "number",
		doc: "The opacity at which the line will be drawn.",
		"default": 1,
		minimum: 0,
		maximum: 1,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.29.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"line-color": {
		type: "color",
		doc: "The color with which the line will be drawn.",
		"default": "#000000",
		transition: true,
		requires: [
			{
				"!": "line-pattern"
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.23.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"line-translate": {
		type: "array",
		value: "number",
		length: 2,
		"default": [
			0,
			0
		],
		transition: true,
		units: "pixels",
		doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"line-translate-anchor": {
		type: "enum",
		values: {
			map: {
				doc: "The line is translated relative to the map."
			},
			viewport: {
				doc: "The line is translated relative to the viewport."
			}
		},
		doc: "Controls the frame of reference for `line-translate`.",
		"default": "map",
		requires: [
			"line-translate"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"line-width": {
		type: "number",
		"default": 1,
		minimum: 0,
		transition: true,
		units: "pixels",
		doc: "Stroke thickness.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.39.0",
				android: "5.2.0",
				ios: "3.7.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light",
				"line-progress"
			]
		},
		"property-type": "data-driven"
	},
	"line-gap-width": {
		type: "number",
		"default": 0,
		minimum: 0,
		doc: "Draws a line casing outside of a line's actual path. Value indicates the width of the inner gap.",
		transition: true,
		units: "pixels",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.29.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"line-offset": {
		type: "number",
		"default": 0,
		doc: "The line's offset. For linear features, a positive value offsets the line to the right, relative to the direction of the line, and a negative value to the left. For polygon features, a positive value results in an inset, and a negative value results in an outset.",
		transition: true,
		units: "pixels",
		"sdk-support": {
			"basic functionality": {
				js: "0.12.1",
				android: "3.0.0",
				ios: "3.1.0"
			},
			"data-driven styling": {
				js: "0.29.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"line-blur": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		units: "pixels",
		doc: "Blur applied to the line, in pixels.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.29.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"line-dasharray": {
		type: "array",
		value: "number",
		doc: "Specifies the lengths of the alternating dashes and gaps that form the dash pattern. The lengths are later scaled by the line width. To convert a dash length to pixels, multiply the length by the current line width. Note that GeoJSON sources with `lineMetrics: true` specified won't render dashed lines to the expected scale. Also note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
		minimum: 0,
		transition: false,
		units: "line widths",
		requires: [
			{
				"!": "line-pattern"
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "2.3.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"line-pattern": {
		type: "resolvedImage",
		transition: false,
		doc: "Name of image in sprite to use for drawing image lines. For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.49.0",
				android: "6.5.0",
				ios: "4.4.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"line-gradient": {
		type: "color",
		doc: "A gradient used to color a line feature at various distances along its length. Defined using a `step` or `interpolate` expression which outputs a color for each corresponding `line-progress` input value. `line-progress` is a percentage of the line feature's total length as measured on the webmercator projected coordinate plane (a `number` between `0` and `1`). Can only be used with GeoJSON sources that specify `\"lineMetrics\": true`.",
		example: [
			"interpolate",
			[
				"linear"
			],
			[
				"line-progress"
			],
			0,
			"blue",
			0.1,
			"royalblue",
			0.3,
			"cyan",
			0.5,
			"lime",
			0.7,
			"yellow",
			1,
			"red"
		],
		transition: false,
		requires: [
			{
				"!": "line-pattern"
			},
			{
				source: "geojson",
				has: {
					lineMetrics: true
				}
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.45.0",
				android: "6.5.0",
				ios: "4.4.0"
			},
			"data-driven styling": {
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"line-progress"
			]
		},
		"property-type": "color-ramp"
	},
	"line-trim-offset": {
		type: "array",
		value: "number",
		doc: "The line part between [trim-start, trim-end] will be painted using `line-trim-color,` which is transparent by default to produce a route vanishing effect. The line trim-off offset is based on the whole line range [0.0, 1.0].",
		length: 2,
		"default": [
			0,
			0
		],
		minimum: [
			0,
			0
		],
		maximum: [
			1,
			1
		],
		transition: false,
		requires: [
			{
				source: "geojson",
				has: {
					lineMetrics: true
				}
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "2.9.0",
				android: "10.5.0",
				ios: "10.5.0"
			}
		},
		"property-type": "constant"
	},
	"line-trim-fade-range": {
		type: "array",
		value: "number",
		doc: "The fade range for the trim-start and trim-end points is defined by the `line-trim-offset` property. The first element of the array represents the fade range from the trim-start point toward the end of the line, while the second element defines the fade range from the trim-end point toward the beginning of the line. The fade result is achieved by interpolating between `line-trim-color` and the color specified by the `line-color` or the `line-gradient` property.",
		experimental: true,
		length: 2,
		"default": [
			0,
			0
		],
		minimum: [
			0,
			0
		],
		maximum: [
			1,
			1
		],
		transition: false,
		requires: [
			"line-trim-offset",
			{
				source: "geojson",
				has: {
					lineMetrics: true
				}
			}
		],
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.6.0",
				android: "11.6.0",
				ios: "11.6.0"
			}
		},
		"property-type": "data-constant"
	},
	"line-trim-color": {
		type: "color",
		doc: "The color to be used for rendering the trimmed line section that is defined by the `line-trim-offset` property.",
		experimental: true,
		"default": "transparent",
		transition: true,
		requires: [
			"line-trim-offset",
			{
				source: "geojson",
				has: {
					lineMetrics: true
				}
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.6.0",
				android: "11.6.0",
				ios: "11.6.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			]
		},
		"property-type": "data-constant"
	},
	"line-emissive-strength": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		units: "intensity",
		doc: "Controls the intensity of light emitted on the source features.",
		requires: [
			"lights"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			]
		},
		"property-type": "data-constant"
	},
	"line-border-width": {
		type: "number",
		"private": true,
		doc: "The width of the line border. A value of zero means no border.",
		"default": 0,
		minimum: 0,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "10.9.0",
				ios: "10.9.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "10.9.0",
				ios: "10.9.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state"
			]
		},
		"property-type": "data-driven"
	},
	"line-border-color": {
		type: "color",
		"private": true,
		doc: "The color of the line border. If line-border-width is greater than zero and the alpha value of this color is 0 (default), the color for the border will be selected automatically based on the line color.",
		"default": "rgba(0, 0, 0, 0)",
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "10.9.0",
				ios: "10.9.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "10.9.0",
				ios: "10.9.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state"
			]
		},
		"property-type": "data-driven"
	},
	"line-occlusion-opacity": {
		type: "number",
		"default": 0,
		minimum: 0,
		maximum: 1,
		doc: "Opacity multiplier (multiplies line-opacity value) of the line part that is occluded by 3D objects. Value 0 hides occluded part, value 1 means the same opacity as non-occluded part. The property is not supported when `line-opacity` has data-driven styling.",
		"sdk-support": {
			"basic functionality": {
				js: "3.5.0",
				android: "11.5.0",
				ios: "11.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		"property-type": "data-constant"
	}
};
var paint_circle = {
	"circle-radius": {
		type: "number",
		"default": 5,
		minimum: 0,
		transition: true,
		units: "pixels",
		doc: "Circle radius.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.18.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"circle-color": {
		type: "color",
		"default": "#000000",
		doc: "The fill color of the circle.",
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.18.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"circle-blur": {
		type: "number",
		"default": 0,
		doc: "Amount to blur the circle. 1 blurs the circle such that only the centerpoint is full opacity. Setting a negative value renders the blur as an inner glow effect.",
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.20.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"circle-opacity": {
		type: "number",
		doc: "The opacity at which the circle will be drawn.",
		"default": 1,
		minimum: 0,
		maximum: 1,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.20.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"circle-translate": {
		type: "array",
		value: "number",
		length: 2,
		"default": [
			0,
			0
		],
		transition: true,
		units: "pixels",
		doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"circle-translate-anchor": {
		type: "enum",
		values: {
			map: {
				doc: "The circle is translated relative to the map."
			},
			viewport: {
				doc: "The circle is translated relative to the viewport."
			}
		},
		doc: "Controls the frame of reference for `circle-translate`.",
		"default": "map",
		requires: [
			"circle-translate"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"circle-pitch-scale": {
		type: "enum",
		values: {
			map: {
				doc: "Circles are scaled according to their apparent distance to the camera."
			},
			viewport: {
				doc: "Circles are not scaled."
			}
		},
		"default": "map",
		doc: "Controls the scaling behavior of the circle when the map is pitched.",
		"sdk-support": {
			"basic functionality": {
				js: "0.21.0",
				android: "4.2.0",
				ios: "3.4.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"circle-pitch-alignment": {
		type: "enum",
		values: {
			map: {
				doc: "The circle is aligned to the plane of the map."
			},
			viewport: {
				doc: "The circle is aligned to the plane of the viewport."
			}
		},
		"default": "viewport",
		doc: "Orientation of circle when map is pitched.",
		"sdk-support": {
			"basic functionality": {
				js: "0.39.0",
				android: "5.2.0",
				ios: "3.7.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"circle-stroke-width": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		units: "pixels",
		doc: "The width of the circle's stroke. Strokes are placed outside of the `circle-radius`.",
		"sdk-support": {
			"basic functionality": {
				js: "0.29.0",
				android: "5.0.0",
				ios: "3.5.0"
			},
			"data-driven styling": {
				js: "0.29.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"circle-stroke-color": {
		type: "color",
		"default": "#000000",
		doc: "The stroke color of the circle.",
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.29.0",
				android: "5.0.0",
				ios: "3.5.0"
			},
			"data-driven styling": {
				js: "0.29.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"circle-stroke-opacity": {
		type: "number",
		doc: "The opacity of the circle's stroke.",
		"default": 1,
		minimum: 0,
		maximum: 1,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.29.0",
				android: "5.0.0",
				ios: "3.5.0"
			},
			"data-driven styling": {
				js: "0.29.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"circle-emissive-strength": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		units: "intensity",
		doc: "Controls the intensity of light emitted on the source features.",
		requires: [
			"lights"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			]
		},
		"property-type": "data-constant"
	}
};
var paint_heatmap = {
	"heatmap-radius": {
		type: "number",
		"default": 30,
		minimum: 1,
		transition: true,
		units: "pixels",
		doc: "Radius of influence of one heatmap point in pixels. Increasing the value makes the heatmap smoother, but less detailed. `queryRenderedFeatures` on heatmap layers will return points within this radius.",
		"sdk-support": {
			"basic functionality": {
				js: "0.41.0",
				android: "6.0.0",
				ios: "4.0.0"
			},
			"data-driven styling": {
				js: "0.43.0",
				android: "6.0.0",
				ios: "4.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"heatmap-weight": {
		type: "number",
		"default": 1,
		minimum: 0,
		transition: false,
		doc: "A measure of how much an individual point contributes to the heatmap. A value of 10 would be equivalent to having 10 points of weight 1 in the same spot. Especially useful when combined with clustering.",
		"sdk-support": {
			"basic functionality": {
				js: "0.41.0",
				android: "6.0.0",
				ios: "4.0.0"
			},
			"data-driven styling": {
				js: "0.41.0",
				android: "6.0.0",
				ios: "4.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"heatmap-intensity": {
		type: "number",
		"default": 1,
		minimum: 0,
		transition: true,
		doc: "Similar to `heatmap-weight` but controls the intensity of the heatmap globally. Primarily used for adjusting the heatmap based on zoom level.",
		"sdk-support": {
			"basic functionality": {
				js: "0.41.0",
				android: "6.0.0",
				ios: "4.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"heatmap-color": {
		type: "color",
		"default": [
			"interpolate",
			[
				"linear"
			],
			[
				"heatmap-density"
			],
			0,
			"rgba(0, 0, 255, 0)",
			0.1,
			"royalblue",
			0.3,
			"cyan",
			0.5,
			"lime",
			0.7,
			"yellow",
			1,
			"red"
		],
		doc: "Defines the color of each pixel based on its density value in a heatmap. Should be an expression that uses `[\"heatmap-density\"]` as input.",
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "0.41.0",
				android: "6.0.0",
				ios: "4.0.0"
			},
			"data-driven styling": {
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"heatmap-density"
			]
		},
		"property-type": "color-ramp"
	},
	"heatmap-opacity": {
		type: "number",
		doc: "The global opacity at which the heatmap layer will be drawn.",
		"default": 1,
		minimum: 0,
		maximum: 1,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.41.0",
				android: "6.0.0",
				ios: "4.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	}
};
var paint_symbol = {
	"icon-opacity": {
		doc: "The opacity at which the icon will be drawn.",
		type: "number",
		"default": 1,
		minimum: 0,
		maximum: 1,
		transition: true,
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.33.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"icon-occlusion-opacity": {
		doc: "The opacity at which the icon will be drawn in case of being depth occluded. Absent value means full occlusion against terrain only.",
		type: "number",
		minimum: 0,
		maximum: 1,
		"default": 0,
		transition: true,
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.5.0",
				android: "11.5.0",
				ios: "11.6.0"
			},
			"data-driven styling": {
				js: "3.5.0",
				android: "11.5.0",
				ios: "11.6.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"icon-emissive-strength": {
		type: "number",
		"default": 1,
		minimum: 0,
		transition: true,
		units: "intensity",
		doc: "Controls the intensity of light emitted on the source features.",
		requires: [
			"lights"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light",
				"feature-state"
			]
		},
		"property-type": "data-driven"
	},
	"text-emissive-strength": {
		type: "number",
		"default": 1,
		minimum: 0,
		transition: true,
		units: "intensity",
		doc: "Controls the intensity of light emitted on the source features.",
		requires: [
			"lights"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light",
				"feature-state"
			]
		},
		"property-type": "data-driven"
	},
	"icon-color": {
		type: "color",
		"default": "#000000",
		transition: true,
		doc: "The color of the icon. This can only be used with [SDF icons](/help/troubleshooting/using-recolorable-images-in-mapbox-maps/).",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.33.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"icon-halo-color": {
		type: "color",
		"default": "rgba(0, 0, 0, 0)",
		transition: true,
		doc: "The color of the icon's halo. Icon halos can only be used with [SDF icons](/help/troubleshooting/using-recolorable-images-in-mapbox-maps/).",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.33.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"icon-halo-width": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		units: "pixels",
		doc: "Distance of halo to the icon outline.",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.33.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"icon-halo-blur": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		units: "pixels",
		doc: "Fade out the halo towards the outside.",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.33.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"icon-translate": {
		type: "array",
		value: "number",
		length: 2,
		"default": [
			0,
			0
		],
		transition: true,
		units: "pixels",
		doc: "Distance that the icon's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.",
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"icon-translate-anchor": {
		type: "enum",
		values: {
			map: {
				doc: "Icons are translated relative to the map."
			},
			viewport: {
				doc: "Icons are translated relative to the viewport."
			}
		},
		doc: "Controls the frame of reference for `icon-translate`.",
		"default": "map",
		requires: [
			"icon-image",
			"icon-translate"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"icon-image-cross-fade": {
		type: "number",
		"property-type": "data-driven",
		"default": 0,
		minimum: 0,
		maximum: 1,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		requires: [
			"icon-image"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		doc: "Controls the transition progress between the image variants of icon-image. Zero means the first variant is used, one is the second, and in between they are blended together.",
		transition: true
	},
	"text-opacity": {
		type: "number",
		doc: "The opacity at which the text will be drawn.",
		"default": 1,
		minimum: 0,
		maximum: 1,
		transition: true,
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.33.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"text-occlusion-opacity": {
		type: "number",
		doc: "The opacity at which the text will be drawn in case of being depth occluded. Absent value means full occlusion against terrain only.",
		minimum: 0,
		maximum: 1,
		"default": 0,
		transition: true,
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.5.0",
				android: "11.5.0",
				ios: "11.6.0"
			},
			"data-driven styling": {
				js: "3.5.0",
				android: "11.5.0",
				ios: "11.6.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"text-color": {
		type: "color",
		doc: "The color with which the text will be drawn.",
		"default": "#000000",
		transition: true,
		overridable: true,
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.33.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"text-halo-color": {
		type: "color",
		"default": "rgba(0, 0, 0, 0)",
		transition: true,
		doc: "The color of the text's halo, which helps it stand out from backgrounds.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.33.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"text-halo-width": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		units: "pixels",
		doc: "Distance of halo to the font outline. Max text halo width is 1/4 of the font-size.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.33.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"text-halo-blur": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		units: "pixels",
		doc: "The halo's fadeout distance towards the outside.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			},
			"data-driven styling": {
				js: "0.33.0",
				android: "5.0.0",
				ios: "3.5.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"text-translate": {
		type: "array",
		value: "number",
		length: 2,
		"default": [
			0,
			0
		],
		transition: true,
		units: "pixels",
		doc: "Distance that the text's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.",
		requires: [
			"text-field"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"text-translate-anchor": {
		type: "enum",
		values: {
			map: {
				doc: "The text is translated relative to the map."
			},
			viewport: {
				doc: "The text is translated relative to the viewport."
			}
		},
		doc: "Controls the frame of reference for `text-translate`.",
		"default": "map",
		requires: [
			"text-field",
			"text-translate"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"icon-color-saturation": {
		type: "number",
		"default": 0,
		minimum: -1,
		maximum: 1,
		transition: false,
		doc: "Increase or reduce the saturation of the symbol icon.",
		"sdk-support": {
			"basic functionality": {
				js: "3.1.0",
				android: "11.1.0",
				ios: "11.1.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "data-constant"
	},
	"icon-color-contrast": {
		type: "number",
		"default": 0,
		minimum: -1,
		maximum: 1,
		transition: false,
		doc: "Increase or reduce the contrast of the symbol icon.",
		"sdk-support": {
			"basic functionality": {
				js: "3.5.0",
				android: "11.5.0",
				ios: "11.5.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "data-constant"
	},
	"icon-color-brightness-min": {
		type: "number",
		doc: "Increase or reduce the brightness of the symbols. The value is the minimum brightness.",
		"default": 0,
		minimum: 0,
		maximum: 1,
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "3.5.0",
				android: "11.5.0",
				ios: "11.5.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "data-constant"
	},
	"icon-color-brightness-max": {
		type: "number",
		doc: "Increase or reduce the brightness of the symbols. The value is the maximum brightness.",
		"default": 1,
		minimum: 0,
		maximum: 1,
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "3.5.0",
				android: "11.5.0",
				ios: "11.5.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "data-constant"
	},
	"symbol-z-offset": {
		type: "number",
		doc: "Specifies an uniform elevation from the ground, in meters.",
		"default": 0,
		minimum: 0,
		transition: true,
		experimental: true,
		"sdk-support": {
			"basic functionality": {
				js: "3.7.0",
				android: "11.7.0",
				ios: "11.7.0"
			},
			"data-driven styling": {
				js: "3.7.0",
				android: "11.7.0",
				ios: "11.7.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	}
};
var paint_raster = {
	"raster-opacity": {
		type: "number",
		doc: "The opacity at which the image will be drawn.",
		"default": 1,
		minimum: 0,
		maximum: 1,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"raster-color": {
		type: "color",
		doc: "Defines a color map by which to colorize a raster layer, parameterized by the `[\"raster-value\"]` expression and evaluated at 256 uniformly spaced steps over the range specified by `raster-color-range`.",
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"raster-value"
			]
		},
		"property-type": "color-ramp"
	},
	"raster-color-mix": {
		type: "array",
		"default": [
			0.2126,
			0.7152,
			0.0722,
			0
		],
		length: 4,
		value: "number",
		"property-type": "data-constant",
		transition: true,
		requires: [
			"raster-color"
		],
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		doc: "When `raster-color` is active, specifies the combination of source RGB channels used to compute the raster value. Computed using the equation `mix.r * src.r + mix.g * src.g + mix.b * src.b + mix.a`. The first three components specify the mix of source red, green, and blue channels, respectively. The fourth component serves as a constant offset and is *not* multipled by source alpha. Source alpha is instead carried through and applied as opacity to the colorized result. Default value corresponds to RGB luminosity.",
		example: [
			0.2126,
			0.7152,
			0.0722,
			0
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	"raster-color-range": {
		type: "array",
		length: 2,
		value: "number",
		"property-type": "data-constant",
		transition: true,
		requires: [
			"raster-color"
		],
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		doc: "When `raster-color` is active, specifies the range over which `raster-color` is tabulated. Units correspond to the computed raster value via `raster-color-mix`. For `rasterarray` sources, if `raster-color-range` is unspecified, the source's stated data range is used.",
		example: [
			0.5,
			10
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	"raster-hue-rotate": {
		type: "number",
		"default": 0,
		period: 360,
		transition: true,
		units: "degrees",
		doc: "Rotates hues around the color wheel.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"raster-brightness-min": {
		type: "number",
		doc: "Increase or reduce the brightness of the image. The value is the minimum brightness.",
		"default": 0,
		minimum: 0,
		maximum: 1,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"raster-brightness-max": {
		type: "number",
		doc: "Increase or reduce the brightness of the image. The value is the maximum brightness.",
		"default": 1,
		minimum: 0,
		maximum: 1,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"raster-saturation": {
		type: "number",
		doc: "Increase or reduce the saturation of the image.",
		"default": 0,
		minimum: -1,
		maximum: 1,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"raster-contrast": {
		type: "number",
		doc: "Increase or reduce the contrast of the image.",
		"default": 0,
		minimum: -1,
		maximum: 1,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"raster-resampling": {
		type: "enum",
		doc: "The resampling/interpolation method to use for overscaling, also known as texture magnification filter",
		values: {
			linear: {
				doc: "(Bi)linear filtering interpolates pixel values using the weighted average of the four closest original source pixels creating a smooth but blurry look when overscaled"
			},
			nearest: {
				doc: "Nearest neighbor filtering interpolates pixel values using the nearest original source pixel creating a sharp but pixelated look when overscaled"
			}
		},
		"default": "linear",
		"sdk-support": {
			"basic functionality": {
				js: "0.47.0",
				android: "6.3.0",
				ios: "4.2.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"raster-fade-duration": {
		type: "number",
		"default": 300,
		minimum: 0,
		transition: false,
		units: "milliseconds",
		doc: "Fade duration when a new tile is added.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"raster-emissive-strength": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		units: "intensity",
		doc: "Controls the intensity of light emitted on the source features.",
		requires: [
			"lights"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.1.0",
				android: "11.1.0",
				ios: "11.1.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			]
		},
		"property-type": "data-constant"
	},
	"raster-array-band": {
		type: "string",
		required: false,
		experimental: true,
		"property-type": "data-constant",
		transition: false,
		requires: [
			{
				source: "raster-array"
			}
		],
		doc: "Displayed band of raster array source layer. Defaults to the first band if not set.",
		example: "band-name",
		"sdk-support": {
			"basic functionality": {
				js: "3.1.0",
				android: "11.1.0",
				ios: "11.1.0"
			}
		}
	},
	"raster-elevation": {
		type: "number",
		doc: "Specifies an uniform elevation from the ground, in meters.",
		"default": 0,
		minimum: 0,
		transition: true,
		experimental: true,
		"sdk-support": {
			"basic functionality": {
				js: "3.1.0",
				android: "11.2.0",
				ios: "11.2.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	}
};
var paint_hillshade = {
	"hillshade-illumination-direction": {
		type: "number",
		"default": 335,
		minimum: 0,
		maximum: 359,
		doc: "The direction of the light source used to generate the hillshading with 0 as the top of the viewport if `hillshade-illumination-anchor` is set to `viewport` and due north if `hillshade-illumination-anchor` is set to `map` and no 3d lights enabled. If `hillshade-illumination-anchor` is set to `map` and 3d lights enabled, the direction from 3d lights is used instead.",
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "0.43.0",
				android: "6.0.0",
				ios: "4.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"hillshade-illumination-anchor": {
		type: "enum",
		values: {
			map: {
				doc: "The hillshade illumination is relative to the north direction."
			},
			viewport: {
				doc: "The hillshade illumination is relative to the top of the viewport."
			}
		},
		"default": "viewport",
		doc: "Direction of light source when map is rotated.",
		"sdk-support": {
			"basic functionality": {
				js: "0.43.0",
				android: "6.0.0",
				ios: "4.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"hillshade-exaggeration": {
		type: "number",
		doc: "Intensity of the hillshade",
		"default": 0.5,
		minimum: 0,
		maximum: 1,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.43.0",
				android: "6.0.0",
				ios: "4.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"hillshade-shadow-color": {
		type: "color",
		"default": "#000000",
		doc: "The shading color of areas that face away from the light source.",
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.43.0",
				android: "6.0.0",
				ios: "4.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			]
		},
		"property-type": "data-constant"
	},
	"hillshade-highlight-color": {
		type: "color",
		"default": "#FFFFFF",
		doc: "The shading color of areas that faces towards the light source.",
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.43.0",
				android: "6.0.0",
				ios: "4.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			]
		},
		"property-type": "data-constant"
	},
	"hillshade-accent-color": {
		type: "color",
		"default": "#000000",
		doc: "The shading color used to accentuate rugged terrain like sharp cliffs and gorges.",
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.43.0",
				android: "6.0.0",
				ios: "4.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			]
		},
		"property-type": "data-constant"
	},
	"hillshade-emissive-strength": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		units: "intensity",
		doc: "Controls the intensity of light emitted on the source features.",
		requires: [
			"lights"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			]
		},
		"property-type": "data-constant"
	}
};
var paint_background = {
	"background-pitch-alignment": {
		type: "enum",
		values: {
			map: {
				doc: "The background is aligned to the plane of the map."
			},
			viewport: {
				doc: "The background is aligned to the plane of the viewport, covering the whole screen. Note: This mode disables the automatic reordering of the layer when terrain or globe projection is used."
			}
		},
		"default": "map",
		doc: "Orientation of background layer.",
		"sdk-support": {
			"basic functionality": {
				js: "3.8.0",
				android: "11.8.0",
				ios: "11.8.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
			]
		},
		experimental: true,
		"property-type": "data-constant"
	},
	"background-color": {
		type: "color",
		"default": "#000000",
		doc: "The color with which the background will be drawn.",
		transition: true,
		requires: [
			{
				"!": "background-pattern"
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"background-pattern": {
		type: "resolvedImage",
		transition: false,
		doc: "Name of image in sprite to use for drawing an image background. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"background-opacity": {
		type: "number",
		"default": 1,
		minimum: 0,
		maximum: 1,
		doc: "The opacity at which the background will be drawn.",
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.10.0",
				android: "2.0.1",
				ios: "2.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"background-emissive-strength": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		units: "intensity",
		doc: "Controls the intensity of light emitted on the source features.",
		requires: [
			"lights"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			]
		},
		"property-type": "data-constant"
	}
};
var paint_sky = {
	"sky-type": {
		type: "enum",
		values: {
			gradient: {
				doc: "Renders the sky with a gradient that can be configured with `sky-gradient-radius` and `sky-gradient`."
			},
			atmosphere: {
				doc: "Renders the sky with a simulated atmospheric scattering algorithm, the sun direction can be attached to the light position or explicitly set through `sky-atmosphere-sun`."
			}
		},
		"default": "atmosphere",
		doc: "The type of the sky",
		"sdk-support": {
			"basic functionality": {
				js: "2.0.0",
				ios: "10.0.0",
				android: "10.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"sky-atmosphere-sun": {
		type: "array",
		value: "number",
		length: 2,
		units: "degrees",
		minimum: [
			0,
			0
		],
		maximum: [
			360,
			180
		],
		transition: false,
		doc: "Position of the sun center [a azimuthal angle, p polar angle]. The azimuthal angle indicates the position of the sun relative to 0° north, where degrees proceed clockwise. The polar angle indicates the height of the sun, where 0° is directly above, at zenith, and 90° at the horizon. When this property is ommitted, the sun center is directly inherited from the light position.",
		"sdk-support": {
			"basic functionality": {
				js: "2.0.0",
				ios: "10.0.0",
				android: "10.0.0"
			}
		},
		requires: [
			{
				"sky-type": "atmosphere"
			}
		],
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"sky-atmosphere-sun-intensity": {
		type: "number",
		requires: [
			{
				"sky-type": "atmosphere"
			}
		],
		"default": 10,
		minimum: 0,
		maximum: 100,
		transition: false,
		doc: "Intensity of the sun as a light source in the atmosphere (on a scale from 0 to a 100). Setting higher values will brighten up the sky.",
		"sdk-support": {
			"basic functionality": {
				js: "2.0.0",
				ios: "10.0.0",
				android: "10.0.0"
			}
		},
		"property-type": "data-constant"
	},
	"sky-gradient-center": {
		type: "array",
		requires: [
			{
				"sky-type": "gradient"
			}
		],
		value: "number",
		"default": [
			0,
			0
		],
		length: 2,
		units: "degrees",
		minimum: [
			0,
			0
		],
		maximum: [
			360,
			180
		],
		transition: false,
		doc: "Position of the gradient center [a azimuthal angle, p polar angle]. The azimuthal angle indicates the position of the gradient center relative to 0° north, where degrees proceed clockwise. The polar angle indicates the height of the gradient center, where 0° is directly above, at zenith, and 90° at the horizon.",
		"sdk-support": {
			"basic functionality": {
				js: "2.0.0",
				ios: "10.0.0",
				android: "10.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"sky-gradient-radius": {
		type: "number",
		requires: [
			{
				"sky-type": "gradient"
			}
		],
		"default": 90,
		minimum: 0,
		maximum: 180,
		transition: false,
		doc: "The angular distance (measured in degrees) from `sky-gradient-center` up to which the gradient extends. A value of 180 causes the gradient to wrap around to the opposite direction from `sky-gradient-center`.",
		"sdk-support": {
			"basic functionality": {
				js: "2.0.0",
				ios: "10.0.0",
				android: "10.0.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"sky-gradient": {
		type: "color",
		"default": [
			"interpolate",
			[
				"linear"
			],
			[
				"sky-radial-progress"
			],
			0.8,
			"#87ceeb",
			1,
			"white"
		],
		doc: "Defines a radial color gradient with which to color the sky. The color values can be interpolated with an expression using `sky-radial-progress`. The range [0, 1] for the interpolant covers a radial distance (in degrees) of [0, `sky-gradient-radius`] centered at the position specified by `sky-gradient-center`.",
		transition: false,
		requires: [
			{
				"sky-type": "gradient"
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "2.0.0",
				ios: "10.0.0",
				android: "10.0.0"
			},
			"data-driven styling": {
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"sky-radial-progress"
			]
		},
		"property-type": "color-ramp"
	},
	"sky-atmosphere-halo-color": {
		type: "color",
		"default": "white",
		doc: "A color applied to the atmosphere sun halo. The alpha channel describes how strongly the sun halo is represented in an atmosphere sky layer.",
		transition: false,
		requires: [
			{
				"sky-type": "atmosphere"
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "2.0.0",
				ios: "10.0.0",
				android: "10.0.0"
			}
		},
		"property-type": "data-constant"
	},
	"sky-atmosphere-color": {
		type: "color",
		"default": "white",
		doc: "A color used to tweak the main atmospheric scattering coefficients. Using white applies the default coefficients giving the natural blue color to the atmosphere. This color affects how heavily the corresponding wavelength is represented during scattering. The alpha channel describes the density of the atmosphere, with 1 maximum density and 0 no density.",
		transition: false,
		requires: [
			{
				"sky-type": "atmosphere"
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "2.0.0",
				ios: "10.0.0",
				android: "10.0.0"
			}
		},
		"property-type": "data-constant"
	},
	"sky-opacity": {
		type: "number",
		"default": 1,
		minimum: 0,
		maximum: 1,
		doc: "The opacity of the entire sky layer.",
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "2.0.0",
				ios: "10.0.0",
				android: "10.0.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	}
};
var paint_model = {
	"model-opacity": {
		type: "number",
		"default": 1,
		minimum: 0,
		maximum: 1,
		doc: "The opacity of the model layer. Except for zoom, expressions that are data-driven are not supported if using GeoJSON or vector tile as the model layer source.",
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"feature",
				"feature-state",
				"zoom"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.9.0",
				android: "11.9.0",
				ios: "11.9.0"
			}
		},
		"property-type": "data-driven"
	},
	"model-rotation": {
		type: "array",
		value: "number",
		length: 3,
		"default": [
			0,
			0,
			0
		],
		period: 360,
		units: "degrees",
		"property-type": "data-driven",
		expression: {
			interpolated: true,
			parameters: [
				"feature",
				"feature-state",
				"zoom"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		transition: true,
		doc: "The rotation of the model in euler angles [lon, lat, z]."
	},
	"model-scale": {
		type: "array",
		value: "number",
		length: 3,
		"default": [
			1,
			1,
			1
		],
		doc: "The scale of the model. Expressions that are zoom-dependent are not supported if using GeoJSON or vector tile as the model layer source.",
		"property-type": "data-driven",
		expression: {
			interpolated: true,
			parameters: [
				"feature",
				"feature-state",
				"zoom"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		transition: true
	},
	"model-translation": {
		type: "array",
		value: "number",
		length: 3,
		"default": [
			0,
			0,
			0
		],
		"property-type": "data-driven",
		expression: {
			interpolated: true,
			parameters: [
				"feature",
				"feature-state",
				"zoom"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		transition: true,
		doc: "The translation of the model in meters in form of [longitudal, latitudal, altitude] offsets."
	},
	"model-color": {
		type: "color",
		"default": "#ffffff",
		doc: "The tint color of the model layer. model-color-mix-intensity (defaults to 0) defines tint(mix) intensity - this means that, this color is not used unless model-color-mix-intensity gets value greater than 0. Expressions that depend on measure-light are not supported when using GeoJSON or vector tile as the model layer source.",
		"property-type": "data-driven",
		expression: {
			interpolated: true,
			parameters: [
				"feature",
				"feature-state",
				"measure-light",
				"zoom"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		transition: true
	},
	"model-color-mix-intensity": {
		type: "number",
		"property-type": "data-driven",
		"default": 0,
		minimum: 0,
		maximum: 1,
		doc: "Intensity of model-color (on a scale from 0 to 1) in color mix with original 3D model's colors. Higher number will present a higher model-color contribution in mix. Expressions that depend on measure-light are not supported when using GeoJSON or vector tile as the model layer source.",
		expression: {
			interpolated: true,
			parameters: [
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		transition: true
	},
	"model-type": {
		type: "enum",
		values: {
			"common-3d": {
				doc: "Integrated to 3D scene, using depth testing, along with terrain, fill-extrusions and custom layer."
			},
			"location-indicator": {
				doc: "Displayed over other 3D content, occluded by terrain."
			}
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		"default": "common-3d",
		doc: "Defines rendering behavior of model in respect to other 3D scene objects.",
		"property-type": "data-constant"
	},
	"model-cast-shadows": {
		type: "boolean",
		"default": true,
		doc: "Enable/Disable shadow casting for this layer",
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		"property-type": "data-constant"
	},
	"model-receive-shadows": {
		type: "boolean",
		"default": true,
		doc: "Enable/Disable shadow receiving for this layer",
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		"property-type": "data-constant"
	},
	"model-ambient-occlusion-intensity": {
		type: "number",
		"default": 1,
		minimum: 0,
		maximum: 1,
		doc: "Intensity of the ambient occlusion if present in the 3D model.",
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		"property-type": "data-constant",
		transition: true
	},
	"model-emissive-strength": {
		type: "number",
		"property-type": "data-driven",
		"default": 0,
		minimum: 0,
		maximum: 5,
		units: "intensity",
		doc: "Strength of the emission. There is no emission for value 0. For value 1.0, only emissive component (no shading) is displayed and values above 1.0 produce light contribution to surrounding area, for some of the parts (e.g. doors). Expressions that depend on measure-light are only supported as a global layer value (and not for each feature) when using GeoJSON or vector tile as the model layer source.",
		expression: {
			interpolated: true,
			parameters: [
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		transition: true
	},
	"model-roughness": {
		type: "number",
		"default": 1,
		minimum: 0,
		maximum: 1,
		doc: "Material roughness. Material is fully smooth for value 0, and fully rough for value 1. Affects only layers using batched-model source.",
		"property-type": "data-driven",
		expression: {
			interpolated: true,
			parameters: [
				"feature",
				"feature-state"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		transition: true
	},
	"model-height-based-emissive-strength-multiplier": {
		type: "array",
		"default": [
			1,
			1,
			1,
			1,
			0
		],
		length: 5,
		value: "number",
		doc: "Emissive strength multiplier along model height (gradient begin, gradient end, value at begin, value at end, gradient curve power (logarithmic scale, curve power = pow(10, val)).",
		"property-type": "data-driven",
		expression: {
			interpolated: true,
			parameters: [
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		transition: true
	},
	"model-cutoff-fade-range": {
		type: "number",
		"default": 0,
		minimum: 0,
		maximum: 1,
		doc: "This parameter defines the range for the fade-out effect before an automatic content cutoff on pitched map views. The automatic cutoff range is calculated according to the minimum required zoom level of the source and layer. The fade range is expressed in relation to the height of the map view. A value of 1.0 indicates that the content is faded to the same extent as the map's height in pixels, while a value close to zero represents a sharp cutoff. When the value is set to 0.0, the cutoff is completely disabled. Note: The property has no effect on the map if terrain is enabled.",
		transition: false,
		expression: {
			interpolated: false
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		"property-type": "data-constant"
	},
	"model-front-cutoff": {
		type: "array",
		"private": true,
		value: "number",
		"property-type": "data-constant",
		transition: false,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		length: 3,
		"default": [
			0,
			0,
			1
		],
		minimum: [
			0,
			0,
			0
		],
		maximum: [
			1,
			1,
			1
		],
		doc: "An array for configuring the fade-out effect for the front cutoff of content on pitched map views. It contains three values: start, range and final opacity. The start parameter defines the point at which the fade-out effect begins, with smaller values causing the effect to start earlier. The range parameter specifies how long the fade-out effect will last. A value of 0.0 for range makes content disappear immediately without a fade-out effect. The final opacity determines content opacity at the end of the fade-out effect. A value of 1.0 for final opacity means that the cutoff is completely disabled.",
		"sdk-support": {
			"basic functionality": {
				js: "3.5.0"
			}
		}
	}
};
var transition = {
	duration: {
		type: "number",
		"default": 300,
		minimum: 0,
		units: "milliseconds",
		doc: "Time allotted for transitions to complete."
	},
	delay: {
		type: "number",
		"default": 0,
		minimum: 0,
		units: "milliseconds",
		doc: "Length of time before a transition begins."
	}
};
var promoteId = {
	"*": {
		type: "string",
		doc: "A name of a feature property to use as ID for feature state."
	}
};
var v8 = {
	$version: $version,
	$root: $root,
	featuresets: featuresets,
	featureset: featureset,
	selector: selector,
	selectorProperty: selectorProperty,
	model: model,
	"import": {
	id: {
		type: "string",
		doc: "Unique import name.",
		required: true
	},
	url: {
		type: "string",
		doc: "The URL of the style.",
		required: true
	},
	config: {
		type: "config",
		doc: "Configuration values for the imported style's options."
	},
	data: {
		type: "$root",
		doc: "The inlined style that must correspond to the contents of the specified URL."
	},
	"color-theme": {
		type: "colorTheme",
		optional: true,
		doc: "If specified, it overrides the color-theme of the imported style."
	}
},
	config: config,
	schema: schema,
	option: option,
	models: models,
	"light-3d": {
	id: {
		type: "string",
		doc: "Unique light name.",
		required: true
	},
	properties: {
		type: "properties",
		doc: "Properties of the light."
	},
	type: {
		type: "enum",
		doc: "Type of the light to be added",
		values: {
			ambient: {
				doc: "An indirect light affecting all objects in the map adding a constant amount of light on them. It has no explicit direction and cannot cast shadows.",
				"sdk-support": {
					"basic functionality": {
						js: "3.0.0",
						android: "11.0.0",
						ios: "11.0.0"
					}
				}
			},
			directional: {
				doc: "A light that has a direction and is located at infinite distance, so its rays are parallel. It simulates the sun light and can cast shadows.",
				"sdk-support": {
					"basic functionality": {
						js: "3.0.0",
						android: "11.0.0",
						ios: "11.0.0"
					}
				}
			},
			flat: {
				doc: "A global directional light source which is only applied on 3D and hillshade layers. Using this type disables other light sources.",
				"sdk-support": {
					"basic functionality": {
						js: "3.0.0",
						android: "11.0.0",
						ios: "11.0.0"
					}
				}
			}
		}
	}
},
	properties: properties,
	properties_light_directional: properties_light_directional,
	properties_light_ambient: properties_light_ambient,
	properties_light_flat: properties_light_flat,
	sources: sources,
	source: source,
	source_vector: source_vector,
	source_raster: source_raster,
	source_raster_dem: source_raster_dem,
	source_raster_array: source_raster_array,
	source_geojson: source_geojson,
	source_video: source_video,
	source_image: source_image,
	source_model: source_model,
	layer: layer,
	layout: layout,
	layout_background: layout_background,
	layout_sky: layout_sky,
	layout_model: layout_model,
	layout_clip: layout_clip,
	layout_fill: layout_fill,
	layout_circle: layout_circle,
	layout_heatmap: layout_heatmap,
	"layout_fill-extrusion": {
	visibility: {
		type: "enum",
		values: {
			visible: {
				doc: "The layer is shown."
			},
			none: {
				doc: "The layer is not shown."
			}
		},
		"default": "visible",
		doc: "Whether this layer is displayed.",
		"sdk-support": {
			"basic functionality": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			},
			"expressions support": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	},
	"fill-extrusion-edge-radius": {
		type: "number",
		experimental: true,
		"default": 0,
		minimum: 0,
		maximum: 1,
		doc: "Radius of a fill extrusion edge in meters. If not zero, rounds extrusion edges for a smoother appearance.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "10.7.0",
				ios: "10.7.0"
			},
			"expressions support": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	}
},
	layout_line: layout_line,
	layout_symbol: layout_symbol,
	layout_raster: layout_raster,
	"layout_raster-particle": {
	visibility: {
		type: "enum",
		values: {
			visible: {
				doc: "The layer is shown."
			},
			none: {
				doc: "The layer is not shown."
			}
		},
		"default": "visible",
		doc: "Whether this layer is displayed.",
		"sdk-support": {
			"basic functionality": {
				js: "3.3.0",
				android: "11.4.0",
				ios: "11.4.0"
			},
			"expressions support": {
				js: "3.3.0",
				android: "11.4.0",
				ios: "11.4.0"
			}
		},
		expression: {
			interpolated: false
		},
		"property-type": "constant"
	}
},
	layout_hillshade: layout_hillshade,
	filter: filter,
	filter_symbol: filter_symbol,
	filter_fill: filter_fill,
	filter_hillshade: filter_hillshade,
	filter_raster: filter_raster,
	"filter_raster-particle": {
	type: "boolean",
	doc: "Expression which determines whether or not to enable the raster particle layer. Raster particle layer does NOT support dynamic filtering, meaning this expression can NOT use the `[\"pitch\"]` and `[\"distance-from-center\"]` expressions to reference the current state of the view.",
	"default": false,
	transition: false,
	"property-type": "data-driven",
	expression: {
		interpolated: false,
		parameters: [
			"zoom",
			"feature"
		]
	}
},
	filter_clip: filter_clip,
	filter_model: filter_model,
	filter_line: filter_line,
	filter_circle: filter_circle,
	"filter_fill-extrusion": {
	type: "boolean",
	doc: "Expression which determines whether or not to display a Polygon. Fill-extrusion layer does NOT support dynamic filtering, meaning this expression can NOT use the `[\"pitch\"]` and `[\"distance-from-center\"]` expressions to reference the current state of the view.",
	"default": false,
	transition: false,
	"property-type": "data-driven",
	expression: {
		interpolated: false,
		parameters: [
			"zoom",
			"feature"
		]
	}
},
	filter_heatmap: filter_heatmap,
	filter_operator: filter_operator,
	geometry_type: geometry_type,
	"function": {
	expression: {
		type: "expression",
		doc: "An expression."
	},
	stops: {
		type: "array",
		doc: "An array of stops.",
		value: "function_stop"
	},
	base: {
		type: "number",
		"default": 1,
		minimum: 0,
		doc: "The exponential base of the interpolation curve. It controls the rate at which the result increases. Higher values make the result increase more towards the high end of the range. With `1` the stops are interpolated linearly."
	},
	property: {
		type: "string",
		doc: "The name of a feature property to use as the function input.",
		"default": "$zoom"
	},
	type: {
		type: "enum",
		values: {
			identity: {
				doc: "Return the input value as the output value."
			},
			exponential: {
				doc: "Generate an output by interpolating between stops just less than and just greater than the function input."
			},
			interval: {
				doc: "Return the output value of the stop just less than the function input."
			},
			categorical: {
				doc: "Return the output value of the stop equal to the function input."
			}
		},
		doc: "The interpolation strategy to use in function evaluation.",
		"default": "exponential"
	},
	colorSpace: {
		type: "enum",
		values: {
			rgb: {
				doc: "Use the RGB color space to interpolate color values"
			},
			lab: {
				doc: "Use the LAB color space to interpolate color values."
			},
			hcl: {
				doc: "Use the HCL color space to interpolate color values, interpolating the Hue, Chroma, and Luminance channels individually."
			}
		},
		doc: "The color space in which colors interpolated. Interpolating colors in perceptual color spaces like LAB and HCL tend to produce color ramps that look more consistent and produce colors that can be differentiated more easily than those interpolated in RGB space.",
		"default": "rgb"
	},
	"default": {
		type: "*",
		required: false,
		doc: "A value to serve as a fallback function result when a value isn't otherwise available. It is used in the following circumstances:\n* In categorical functions, when the feature value does not match any of the stop domain values.\n* In property and zoom-and-property functions, when a feature does not contain a value for the specified property.\n* In identity functions, when the feature value is not valid for the style property (for example, if the function is being used for a `circle-color` property but the feature property value is not a string or not a valid color).\n* In interval or exponential property and zoom-and-property functions, when the feature value is not numeric.\nIf no default is provided, the style property's default is used in these circumstances."
	}
},
	function_stop: function_stop,
	expression: expression$1,
	expression_name: expression_name,
	fog: fog,
	snow: snow,
	rain: rain,
	camera: camera,
	colorTheme: colorTheme,
	indoor: indoor,
	light: light,
	projection: projection,
	terrain: terrain,
	paint: paint,
	paint_fill: paint_fill,
	"paint_fill-extrusion": {
	"fill-extrusion-opacity": {
		type: "number",
		"default": 1,
		minimum: 0,
		maximum: 1,
		doc: "The opacity of the entire fill extrusion layer. This is rendered on a per-layer, not per-feature, basis, and data-driven styling is not available.",
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"fill-extrusion-color": {
		type: "color",
		"default": "#000000",
		doc: "The base color of the extruded fill. The extrusion's surfaces will be shaded differently based on this color in combination with the root `light` settings. If this color is specified as `rgba` with an alpha component, the alpha component will be ignored; use `fill-extrusion-opacity` to set layer opacity.",
		transition: true,
		requires: [
			{
				"!": "fill-extrusion-pattern"
			}
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			},
			"data-driven styling": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"fill-extrusion-translate": {
		type: "array",
		value: "number",
		length: 2,
		"default": [
			0,
			0
		],
		transition: true,
		units: "pixels",
		doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up (on the flat plane), respectively.",
		"sdk-support": {
			"basic functionality": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"fill-extrusion-translate-anchor": {
		type: "enum",
		values: {
			map: {
				doc: "The fill extrusion is translated relative to the map."
			},
			viewport: {
				doc: "The fill extrusion is translated relative to the viewport."
			}
		},
		doc: "Controls the frame of reference for `fill-extrusion-translate`.",
		"default": "map",
		requires: [
			"fill-extrusion-translate"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"fill-extrusion-pattern": {
		type: "resolvedImage",
		transition: false,
		doc: "Name of image in sprite to use for drawing images on extruded fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
		"sdk-support": {
			"basic functionality": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			},
			"data-driven styling": {
				js: "0.49.0",
				android: "6.5.0",
				ios: "4.4.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom",
				"feature"
			]
		},
		"property-type": "data-driven"
	},
	"fill-extrusion-height": {
		type: "number",
		"default": 0,
		minimum: 0,
		units: "meters",
		doc: "The height with which to extrude this layer.",
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			},
			"data-driven styling": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state"
			]
		},
		"property-type": "data-driven"
	},
	"fill-extrusion-base": {
		type: "number",
		"default": 0,
		minimum: 0,
		units: "meters",
		doc: "The height with which to extrude the base of this layer. Must be less than or equal to `fill-extrusion-height`.",
		transition: true,
		requires: [
			"fill-extrusion-height"
		],
		"sdk-support": {
			"basic functionality": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			},
			"data-driven styling": {
				js: "0.27.0",
				android: "5.1.0",
				ios: "3.6.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state"
			]
		},
		"property-type": "data-driven"
	},
	"fill-extrusion-height-alignment": {
		type: "enum",
		experimental: true,
		values: {
			terrain: {
				doc: "The fill extrusion height follows terrain slope."
			},
			flat: {
				doc: "The fill extrusion height is flat over terrain."
			}
		},
		doc: "Controls the behavior of fill extrusion height over terrain",
		"default": "flat",
		requires: [
			"fill-extrusion-height"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.8.0",
				android: "11.8.0",
				ios: "11.8.0"
			}
		},
		"property-type": "data-constant"
	},
	"fill-extrusion-base-alignment": {
		type: "enum",
		experimental: true,
		values: {
			terrain: {
				doc: "The fill extrusion base follows terrain slope."
			},
			flat: {
				doc: "The fill extrusion base is flat over terrain."
			}
		},
		doc: "Controls the behavior of fill extrusion base over terrain",
		"default": "terrain",
		requires: [
			"fill-extrusion-base"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.8.0",
				android: "11.8.0",
				ios: "11.8.0"
			}
		},
		"property-type": "data-constant"
	},
	"fill-extrusion-vertical-gradient": {
		type: "boolean",
		"default": true,
		doc: "Whether to apply a vertical gradient to the sides of a fill-extrusion layer. If true, sides will be shaded slightly darker farther down.",
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "0.50.0",
				android: "7.0.0",
				ios: "4.7.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"fill-extrusion-ambient-occlusion-intensity": {
		"property-type": "data-constant",
		type: "number",
		"default": 0,
		minimum: 0,
		maximum: 1,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		doc: "Controls the intensity of shading near ground and concave angles between walls. Default value 0.0 disables ambient occlusion and values around 0.3 provide the most plausible results for buildings.",
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "10.7.0",
				ios: "10.7.0"
			}
		}
	},
	"fill-extrusion-ambient-occlusion-radius": {
		"property-type": "data-constant",
		type: "number",
		"default": 3,
		minimum: 0,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		doc: "Shades area near ground and concave angles between walls where the radius defines only vertical impact. Default value 3.0 corresponds to height of one floor and brings the most plausible results for buildings. This property works only with legacy light. When 3D lights are enabled `fill-extrusion-ambient-occlusion-wall-radius` and `fill-extrusion-ambient-occlusion-ground-radius` are used instead.",
		requires: [
			"fill-extrusion-edge-radius"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "10.7.0",
				ios: "10.7.0"
			}
		}
	},
	"fill-extrusion-ambient-occlusion-wall-radius": {
		"property-type": "data-constant",
		type: "number",
		experimental: true,
		"default": 3,
		minimum: 0,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		doc: "Shades area near ground and concave angles between walls where the radius defines only vertical impact. Default value 3.0 corresponds to height of one floor and brings the most plausible results for buildings.",
		requires: [
			"lights",
			"fill-extrusion-edge-radius"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	"fill-extrusion-ambient-occlusion-ground-radius": {
		"property-type": "data-constant",
		type: "number",
		experimental: true,
		"default": 3,
		minimum: 0,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		transition: true,
		doc: "The extent of the ambient occlusion effect on the ground beneath the extruded buildings in meters.",
		requires: [
			"lights"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	"fill-extrusion-ambient-occlusion-ground-attenuation": {
		"property-type": "data-constant",
		type: "number",
		experimental: true,
		"default": 0.69,
		minimum: 0,
		maximum: 1,
		doc: "Provides a control to futher fine-tune the look of the ambient occlusion on the ground beneath the extruded buildings. Lower values give the effect a more solid look while higher values make it smoother.",
		requires: [
			"lights"
		],
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	"fill-extrusion-flood-light-color": {
		"property-type": "data-constant",
		type: "color",
		experimental: true,
		"default": "#ffffff",
		doc: "The color of the flood light effect on the walls of the extruded buildings.",
		requires: [
			"lights"
		],
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	"fill-extrusion-flood-light-intensity": {
		"property-type": "data-constant",
		type: "number",
		experimental: true,
		"default": 0,
		minimum: 0,
		maximum: 1,
		doc: "The intensity of the flood light color.",
		requires: [
			"lights"
		],
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	"fill-extrusion-flood-light-wall-radius": {
		"property-type": "data-driven",
		type: "number",
		experimental: true,
		units: "meters",
		"default": 0,
		minimum: 0,
		doc: "The extent of the flood light effect on the walls of the extruded buildings in meters.",
		requires: [
			"lights"
		],
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"feature",
				"feature-state"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	"fill-extrusion-flood-light-ground-radius": {
		"property-type": "data-driven",
		type: "number",
		experimental: true,
		units: "meters",
		"default": 0,
		doc: "The extent of the flood light effect on the ground beneath the extruded buildings in meters. Note: this experimental property is evaluated once per tile, during tile initialization. Changing the property value could trigger tile reload. The `feature-state` styling is deprecated and will get removed soon.",
		requires: [
			"lights"
		],
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"feature",
				"feature-state"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	"fill-extrusion-flood-light-ground-attenuation": {
		"property-type": "data-constant",
		type: "number",
		experimental: true,
		"default": 0.69,
		minimum: 0,
		maximum: 1,
		doc: "Provides a control to futher fine-tune the look of the flood light on the ground beneath the extruded buildings. Lower values give the effect a more solid look while higher values make it smoother.",
		requires: [
			"lights"
		],
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	"fill-extrusion-vertical-scale": {
		"property-type": "data-constant",
		type: "number",
		experimental: true,
		"default": 1,
		minimum: 0,
		doc: "A global multiplier that can be used to scale base, height, AO, and flood light of the fill extrusions.",
		transition: true,
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		}
	},
	"fill-extrusion-rounded-roof": {
		"property-type": "data-constant",
		type: "boolean",
		"default": true,
		experimental: true,
		doc: "Indicates whether top edges should be rounded when fill-extrusion-edge-radius has a value greater than 0. If false, rounded edges are only applied to the sides. Default is true.",
		requires: [
			"fill-extrusion-edge-radius"
		],
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "10.10.0",
				ios: "10.10.0"
			}
		},
		expression: {
			interpolated: false,
			parameters: [
				"zoom"
			]
		}
	},
	"fill-extrusion-cutoff-fade-range": {
		type: "number",
		"default": 0,
		minimum: 0,
		maximum: 1,
		doc: "This parameter defines the range for the fade-out effect before an automatic content cutoff on pitched map views. Fade out is implemented by scaling down and removing buildings in the fade range in a staggered fashion. Opacity is not changed. The fade range is expressed in relation to the height of the map view. A value of 1.0 indicates that the content is faded to the same extent as the map's height in pixels, while a value close to zero represents a sharp cutoff. When the value is set to 0.0, the cutoff is completely disabled. Note: The property has no effect on the map if terrain is enabled.",
		transition: false,
		expression: {
			interpolated: false
		},
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			}
		},
		"property-type": "data-constant"
	},
	"fill-extrusion-emissive-strength": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		units: "intensity",
		doc: "Controls the intensity of light emitted on the source features.",
		requires: [
			"lights"
		],
		"sdk-support": {
			"basic functionality": {
				js: "3.0.0",
				android: "11.0.0",
				ios: "11.0.0"
			},
			"data-driven styling": {
				js: "3.8.0",
				android: "11.8.0",
				ios: "11.8.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"measure-light",
				"feature-state"
			]
		},
		"property-type": "data-driven"
	},
	"fill-extrusion-line-width": {
		type: "number",
		"default": 0,
		minimum: 0,
		transition: true,
		experimental: true,
		units: "meters",
		doc: "If a non-zero value is provided, it sets the fill-extrusion layer into wall rendering mode. The value is used to render the feature with the given width over the outlines of the geometry. Note: This property is experimental and some other fill-extrusion properties might not be supported with non-zero line width.",
		"sdk-support": {
			"basic functionality": {
				js: "3.7.0",
				android: "11.7.0",
				ios: "11.7.0"
			},
			"data-driven styling": {
				js: "3.7.0",
				android: "11.7.0",
				ios: "11.7.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom",
				"feature",
				"feature-state",
				"measure-light"
			]
		},
		"property-type": "data-driven"
	},
	"fill-extrusion-cast-shadows": {
		type: "boolean",
		"default": true,
		doc: "Enable/Disable shadow casting for this layer",
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "3.7.0",
				android: "11.8.0",
				ios: "11.8.0"
			}
		},
		"property-type": "data-constant"
	}
},
	paint_line: paint_line,
	paint_circle: paint_circle,
	paint_heatmap: paint_heatmap,
	paint_symbol: paint_symbol,
	paint_raster: paint_raster,
	"paint_raster-particle": {
	"raster-particle-array-band": {
		type: "string",
		required: false,
		"property-type": "data-constant",
		transition: false,
		doc: "Displayed band of raster array source layer",
		example: "\"1713348000\"",
		"sdk-support": {
			"basic functionality": {
				js: "3.3.0",
				android: "11.4.0",
				ios: "11.4.0"
			}
		}
	},
	"raster-particle-count": {
		type: "number",
		doc: "Defines the amount of particles per tile.",
		"default": 512,
		minimum: 1,
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "3.3.0",
				android: "11.4.0",
				ios: "11.4.0"
			}
		},
		"property-type": "data-constant"
	},
	"raster-particle-color": {
		type: "color",
		doc: "Defines a color map by which to colorize a raster particle layer, parameterized by the `[\"raster-particle-speed\"]` expression and evaluated at 256 uniformly spaced steps over the range specified by `raster-particle-max-speed`.",
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "3.3.0",
				android: "11.4.0",
				ios: "11.4.0"
			},
			"data-driven styling": {
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"raster-particle-speed"
			]
		},
		"property-type": "color-ramp"
	},
	"raster-particle-max-speed": {
		type: "number",
		doc: "Defines the maximum speed for particles. Velocities with magnitudes equal to or exceeding this value are clamped to the max value.",
		"default": 1,
		minimum: 1,
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "3.3.0",
				android: "11.4.0",
				ios: "11.4.0"
			}
		},
		"property-type": "data-constant"
	},
	"raster-particle-speed-factor": {
		type: "number",
		doc: "Defines a coefficient for the speed of particles’ motion.",
		"default": 0.2,
		minimum: 0,
		maximum: 1,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "3.3.0",
				android: "11.4.0",
				ios: "11.4.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"raster-particle-fade-opacity-factor": {
		type: "number",
		doc: "Defines defines the opacity coefficient applied to the faded particles in each frame. In practice, this property controls the length of the particle tail.",
		"default": 0.98,
		minimum: 0,
		maximum: 1,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "3.3.0",
				android: "11.4.0",
				ios: "11.4.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	},
	"raster-particle-reset-rate-factor": {
		type: "number",
		doc: "Defines a coefficient for a time period at which particles will restart at a random position, to avoid degeneration (empty areas without particles).",
		"default": 0.8,
		minimum: 0,
		maximum: 1,
		transition: false,
		"sdk-support": {
			"basic functionality": {
				js: "3.3.0",
				android: "11.4.0",
				ios: "11.4.0"
			}
		},
		"property-type": "data-constant"
	},
	"raster-particle-elevation": {
		type: "number",
		doc: "Specifies an uniform elevation from the ground, in meters.",
		"default": 0,
		minimum: 0,
		transition: true,
		"sdk-support": {
			"basic functionality": {
				js: "3.7.0",
				android: "11.7.0",
				ios: "11.7.0"
			}
		},
		expression: {
			interpolated: true,
			parameters: [
				"zoom"
			]
		},
		"property-type": "data-constant"
	}
},
	paint_hillshade: paint_hillshade,
	paint_background: paint_background,
	paint_sky: paint_sky,
	paint_model: paint_model,
	transition: transition,
	"property-type": {
	"data-driven": {
		type: "property-type",
		doc: "Property is interpolable and can be represented using a property expression."
	},
	"color-ramp": {
		type: "property-type",
		doc: "Property should be specified using a color ramp from which the output color can be sampled based on a property calculation."
	},
	"data-constant": {
		type: "property-type",
		doc: "Property is interpolable but cannot be represented using a property expression."
	},
	constant: {
		type: "property-type",
		doc: "Property is constant across all zoom levels and property values."
	}
},
	promoteId: promoteId
};

// Note: This regex matches even invalid JSON strings, but since we’re
// working on the output of `JSON.stringify` we know that only valid strings
// are present (unless the user supplied a weird `options.indent` but in
// that case we don’t care since the output would be invalid anyway).
const stringOrChar = /("(?:[^\\"]|\\.)*")|[:,]/g;
function stringify(passedObj, options = {}) {
    const indent = JSON.stringify([1], undefined, options.indent === undefined ? 2 : options.indent).slice(2, -3);
    const maxLength = indent === '' ? Infinity : options.maxLength === undefined ? 80 : options.maxLength;
    let {replacer} = options;
    return function _stringify(obj, currentIndent, reserved) {
        if (obj && typeof obj.toJSON === 'function') {
            obj = obj.toJSON();
        }
        const string = JSON.stringify(obj, replacer);
        if (string === undefined) {
            return string;
        }
        const length = maxLength - currentIndent.length - reserved;
        if (string.length <= length) {
            const prettified = string.replace(stringOrChar, (match, stringLiteral) => {
                return stringLiteral || `${ match } `;
            });
            if (prettified.length <= length) {
                return prettified;
            }
        }
        if (replacer != null) {
            obj = JSON.parse(string);
            replacer = undefined;
        }
        if (typeof obj === 'object' && obj !== null) {
            const nextIndent = currentIndent + indent;
            const items = [];
            let index = 0;
            let start;
            let end;
            if (Array.isArray(obj)) {
                start = '[';
                end = ']';
                const {length} = obj;
                for (; index < length; index++) {
                    items.push(_stringify(obj[index], nextIndent, index === length - 1 ? 0 : 1) || 'null');
                }
            } else {
                start = '{';
                end = '}';
                const keys = Object.keys(obj);
                const {length} = keys;
                for (; index < length; index++) {
                    const key = keys[index];
                    const keyPart = `${ JSON.stringify(key) }: `;
                    const value = _stringify(obj[key], nextIndent, keyPart.length + (index === length - 1 ? 0 : 1));
                    if (value !== undefined) {
                        items.push(keyPart + value);
                    }
                }
            }
            if (items.length > 0) {
                return [
                    start,
                    indent + items.join(`,\n${ nextIndent }`),
                    end
                ].join(`\n${ currentIndent }`);
            }
        }
        return string;
    }(passedObj, '', 0);
}

function sortKeysBy(obj, reference2) {
    const result = {};
    for (const key in reference2) {
        if (obj[key] !== void 0) {
            result[key] = obj[key];
        }
    }
    for (const key in obj) {
        if (result[key] === void 0) {
            result[key] = obj[key];
        }
    }
    return result;
}
function format(style, space = 2) {
    style = sortKeysBy(style, v8.$root);
    if (style.layers) {
        style.layers = style.layers.map(layer => sortKeysBy(layer, v8.layer));
    }
    return stringify(style, { indent: space });
}

function getPropertyReference(propertyName) {
    for (let i = 0; i < v8.layout.length; i++) {
        for (const key in v8[v8.layout[i]]) {
            if (key === propertyName)
                return v8[v8.layout[i]][key];
        }
    }
    for (let i = 0; i < v8.paint.length; i++) {
        for (const key in v8[v8.paint[i]]) {
            if (key === propertyName)
                return v8[v8.paint[i]][key];
        }
    }
    return null;
}
function eachSource(style, callback) {
    for (const k in style.sources) {
        callback(style.sources[k]);
    }
}
function eachLayer(style, callback) {
    for (const layer of style.layers) {
        callback(layer);
    }
}
function eachProperty(style, options, callback) {
    function inner(layer, propertyType) {
        if (layer.type === 'slot' || layer.type === 'clip')
            return;
        const properties = layer[propertyType];
        if (!properties)
            return;
        Object.keys(properties).forEach(key => {
            callback({
                path: [
                    layer.id,
                    propertyType,
                    key
                ],
                key,
                value: properties[key],
                reference: getPropertyReference(key),
                set(x) {
                    properties[key] = x;
                }
            });
        });
    }
    eachLayer(style, layer => {
        if (options.paint) {
            inner(layer, 'paint');
        }
        if (options.layout) {
            inner(layer, 'layout');
        }
    });
}

function eachLayout(layer, callback) {
    for (const k in layer) {
        if (k.indexOf('layout') === 0) {
            callback(layer[k], k);
        }
    }
}
function eachPaint(layer, callback) {
    for (const k in layer) {
        if (k.indexOf('paint') === 0) {
            callback(layer[k], k);
        }
    }
}
function resolveConstant(style, value) {
    if (typeof value === 'string' && value[0] === '@') {
        return resolveConstant(style, style.constants[value]);
    } else {
        return value;
    }
}
function isFunction$1(value) {
    return Array.isArray(value.stops);
}
function renameProperty(obj, from, to) {
    obj[to] = obj[from];
    delete obj[from];
}
function migrateToV8 (style) {
    style.version = 8;
    eachSource(style, source => {
        if (source.type === 'video' && source.url !== void 0) {
            renameProperty(source, 'url', 'urls');
        }
        if (source.type === 'video') {
            source.coordinates.forEach(coord => {
                return coord.reverse();
            });
        }
    });
    eachLayer(style, layer => {
        eachLayout(layer, layout => {
            if (layout['symbol-min-distance'] !== void 0) {
                renameProperty(layout, 'symbol-min-distance', 'symbol-spacing');
            }
        });
        eachPaint(layer, paint => {
            if (paint['background-image'] !== void 0) {
                renameProperty(paint, 'background-image', 'background-pattern');
            }
            if (paint['line-image'] !== void 0) {
                renameProperty(paint, 'line-image', 'line-pattern');
            }
            if (paint['fill-image'] !== void 0) {
                renameProperty(paint, 'fill-image', 'fill-pattern');
            }
        });
    });
    eachProperty(style, {
        paint: true,
        layout: true
    }, property => {
        const value = resolveConstant(style, property.value);
        if (isFunction$1(value)) {
            value.stops.forEach(stop => {
                stop[1] = resolveConstant(style, stop[1]);
            });
        }
        property.set(value);
    });
    delete style.constants;
    eachLayer(style, layer => {
        eachLayout(layer, layout => {
            delete layout['text-max-size'];
            delete layout['icon-max-size'];
        });
        eachPaint(layer, paint => {
            if (paint['text-size']) {
                if (!layer.layout)
                    layer.layout = {};
                layer.layout['text-size'] = paint['text-size'];
                delete paint['text-size'];
            }
            if (paint['icon-size']) {
                if (!layer.layout)
                    layer.layout = {};
                layer.layout['icon-size'] = paint['icon-size'];
                delete paint['icon-size'];
            }
        });
    });
    function migrateFontstackURL(input) {
        const inputParsed = new URL(input);
        const inputPathnameParts = inputParsed.pathname.split('/');
        if (inputParsed.protocol !== 'mapbox:') {
            return input;
        } else if (inputParsed.hostname === 'fontstack') {
            assert(decodeURI(inputParsed.pathname) === '/{fontstack}/{range}.pbf');
            return 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf';
        } else if (inputParsed.hostname === 'fonts') {
            assert(inputPathnameParts[1] === 'v1');
            assert(decodeURI(inputPathnameParts[3]) === '{fontstack}');
            assert(decodeURI(inputPathnameParts[4]) === '{range}.pbf');
            return `mapbox://fonts/${ inputPathnameParts[2] }/{fontstack}/{range}.pbf`;
        } else {
            assert(false);
        }
        function assert(predicate) {
            if (!predicate) {
                throw new Error(`Invalid font url: "${ input }"`);
            }
        }
    }
    if (style.glyphs) {
        style.glyphs = migrateFontstackURL(style.glyphs);
    }
    function migrateFontStack(font) {
        function splitAndTrim(string) {
            return string.split(',').map(s => {
                return s.trim();
            });
        }
        if (Array.isArray(font)) {
            return font;
        } else if (typeof font === 'string') {
            return splitAndTrim(font);
        } else if (typeof font === 'object') {
            font.stops.forEach(stop => {
                stop[1] = splitAndTrim(stop[1]);
            });
            return font;
        } else {
            throw new Error('unexpected font value');
        }
    }
    eachLayer(style, layer => {
        eachLayout(layer, layout => {
            if (layout['text-font']) {
                layout['text-font'] = migrateFontStack(layout['text-font']);
            }
        });
    });
    let firstSymbolLayer = 0;
    for (let i = style.layers.length - 1; i >= 0; i--) {
        const layer = style.layers[i];
        if (layer.type !== 'symbol') {
            firstSymbolLayer = i + 1;
            break;
        }
    }
    const symbolLayers = style.layers.splice(firstSymbolLayer);
    symbolLayers.reverse();
    style.layers = style.layers.concat(symbolLayers);
    return style;
}

function extend (output, ...inputs) {
    for (const input of inputs) {
        for (const k in input) {
            output[k] = input[k];
        }
    }
    return output;
}

let ParsingError$1 = class ParsingError extends Error {
    constructor(key, message) {
        super(message);
        this.message = message;
        this.key = key;
    }
};

class Scope {
    constructor(parent, bindings = []) {
        this.parent = parent;
        this.bindings = {};
        for (const [name, expression] of bindings) {
            this.bindings[name] = expression;
        }
    }
    concat(bindings) {
        return new Scope(this, bindings);
    }
    get(name) {
        if (this.bindings[name]) {
            return this.bindings[name];
        }
        if (this.parent) {
            return this.parent.get(name);
        }
        throw new Error(`${ name } not found in scope.`);
    }
    has(name) {
        if (this.bindings[name])
            return true;
        return this.parent ? this.parent.has(name) : false;
    }
}

const NullType = { kind: 'null' };
const NumberType = { kind: 'number' };
const StringType = { kind: 'string' };
const BooleanType = { kind: 'boolean' };
const ColorType = { kind: 'color' };
const ObjectType = { kind: 'object' };
const ValueType = { kind: 'value' };
const ErrorType = { kind: 'error' };
const CollatorType = { kind: 'collator' };
const FormattedType = { kind: 'formatted' };
const ResolvedImageType = { kind: 'resolvedImage' };
function array$1(itemType, N) {
    return {
        kind: 'array',
        itemType,
        N
    };
}
function toString$1(type) {
    if (type.kind === 'array') {
        const itemType = toString$1(type.itemType);
        return typeof type.N === 'number' ? `array<${ itemType }, ${ type.N }>` : type.itemType.kind === 'value' ? 'array' : `array<${ itemType }>`;
    } else {
        return type.kind;
    }
}
const valueMemberTypes = [
    NullType,
    NumberType,
    StringType,
    BooleanType,
    ColorType,
    FormattedType,
    ObjectType,
    array$1(ValueType),
    ResolvedImageType
];
function checkSubtype(expected, t) {
    if (t.kind === 'error') {
        return null;
    } else if (expected.kind === 'array') {
        if (t.kind === 'array' && (t.N === 0 && t.itemType.kind === 'value' || !checkSubtype(expected.itemType, t.itemType)) && (typeof expected.N !== 'number' || expected.N === t.N)) {
            return null;
        }
    } else if (expected.kind === t.kind) {
        return null;
    } else if (expected.kind === 'value') {
        for (const memberType of valueMemberTypes) {
            if (!checkSubtype(memberType, t)) {
                return null;
            }
        }
    }
    return `Expected ${ toString$1(expected) } but found ${ toString$1(t) } instead.`;
}
function isValidType(provided, allowedTypes) {
    return allowedTypes.some(t => t.kind === provided.kind);
}
function isValidNativeType(provided, allowedTypes) {
    return allowedTypes.some(t => {
        if (t === 'null') {
            return provided === null;
        } else if (t === 'array') {
            return Array.isArray(provided);
        } else if (t === 'object') {
            return provided && !Array.isArray(provided) && typeof provided === 'object';
        } else {
            return t === typeof provided;
        }
    });
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var csscolorparser = {};

var hasRequiredCsscolorparser;

function requireCsscolorparser () {
	if (hasRequiredCsscolorparser) return csscolorparser;
	hasRequiredCsscolorparser = 1;
	// (c) Dean McNamee <dean@gmail.com>, 2012.
	//
	// https://github.com/deanm/css-color-parser-js
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
	// IN THE SOFTWARE.
	// http://www.w3.org/TR/css3-color/
	var kCSSColorTable = {
	    'transparent': [
	        0,
	        0,
	        0,
	        0
	    ],
	    'aliceblue': [
	        240,
	        248,
	        255,
	        1
	    ],
	    'antiquewhite': [
	        250,
	        235,
	        215,
	        1
	    ],
	    'aqua': [
	        0,
	        255,
	        255,
	        1
	    ],
	    'aquamarine': [
	        127,
	        255,
	        212,
	        1
	    ],
	    'azure': [
	        240,
	        255,
	        255,
	        1
	    ],
	    'beige': [
	        245,
	        245,
	        220,
	        1
	    ],
	    'bisque': [
	        255,
	        228,
	        196,
	        1
	    ],
	    'black': [
	        0,
	        0,
	        0,
	        1
	    ],
	    'blanchedalmond': [
	        255,
	        235,
	        205,
	        1
	    ],
	    'blue': [
	        0,
	        0,
	        255,
	        1
	    ],
	    'blueviolet': [
	        138,
	        43,
	        226,
	        1
	    ],
	    'brown': [
	        165,
	        42,
	        42,
	        1
	    ],
	    'burlywood': [
	        222,
	        184,
	        135,
	        1
	    ],
	    'cadetblue': [
	        95,
	        158,
	        160,
	        1
	    ],
	    'chartreuse': [
	        127,
	        255,
	        0,
	        1
	    ],
	    'chocolate': [
	        210,
	        105,
	        30,
	        1
	    ],
	    'coral': [
	        255,
	        127,
	        80,
	        1
	    ],
	    'cornflowerblue': [
	        100,
	        149,
	        237,
	        1
	    ],
	    'cornsilk': [
	        255,
	        248,
	        220,
	        1
	    ],
	    'crimson': [
	        220,
	        20,
	        60,
	        1
	    ],
	    'cyan': [
	        0,
	        255,
	        255,
	        1
	    ],
	    'darkblue': [
	        0,
	        0,
	        139,
	        1
	    ],
	    'darkcyan': [
	        0,
	        139,
	        139,
	        1
	    ],
	    'darkgoldenrod': [
	        184,
	        134,
	        11,
	        1
	    ],
	    'darkgray': [
	        169,
	        169,
	        169,
	        1
	    ],
	    'darkgreen': [
	        0,
	        100,
	        0,
	        1
	    ],
	    'darkgrey': [
	        169,
	        169,
	        169,
	        1
	    ],
	    'darkkhaki': [
	        189,
	        183,
	        107,
	        1
	    ],
	    'darkmagenta': [
	        139,
	        0,
	        139,
	        1
	    ],
	    'darkolivegreen': [
	        85,
	        107,
	        47,
	        1
	    ],
	    'darkorange': [
	        255,
	        140,
	        0,
	        1
	    ],
	    'darkorchid': [
	        153,
	        50,
	        204,
	        1
	    ],
	    'darkred': [
	        139,
	        0,
	        0,
	        1
	    ],
	    'darksalmon': [
	        233,
	        150,
	        122,
	        1
	    ],
	    'darkseagreen': [
	        143,
	        188,
	        143,
	        1
	    ],
	    'darkslateblue': [
	        72,
	        61,
	        139,
	        1
	    ],
	    'darkslategray': [
	        47,
	        79,
	        79,
	        1
	    ],
	    'darkslategrey': [
	        47,
	        79,
	        79,
	        1
	    ],
	    'darkturquoise': [
	        0,
	        206,
	        209,
	        1
	    ],
	    'darkviolet': [
	        148,
	        0,
	        211,
	        1
	    ],
	    'deeppink': [
	        255,
	        20,
	        147,
	        1
	    ],
	    'deepskyblue': [
	        0,
	        191,
	        255,
	        1
	    ],
	    'dimgray': [
	        105,
	        105,
	        105,
	        1
	    ],
	    'dimgrey': [
	        105,
	        105,
	        105,
	        1
	    ],
	    'dodgerblue': [
	        30,
	        144,
	        255,
	        1
	    ],
	    'firebrick': [
	        178,
	        34,
	        34,
	        1
	    ],
	    'floralwhite': [
	        255,
	        250,
	        240,
	        1
	    ],
	    'forestgreen': [
	        34,
	        139,
	        34,
	        1
	    ],
	    'fuchsia': [
	        255,
	        0,
	        255,
	        1
	    ],
	    'gainsboro': [
	        220,
	        220,
	        220,
	        1
	    ],
	    'ghostwhite': [
	        248,
	        248,
	        255,
	        1
	    ],
	    'gold': [
	        255,
	        215,
	        0,
	        1
	    ],
	    'goldenrod': [
	        218,
	        165,
	        32,
	        1
	    ],
	    'gray': [
	        128,
	        128,
	        128,
	        1
	    ],
	    'green': [
	        0,
	        128,
	        0,
	        1
	    ],
	    'greenyellow': [
	        173,
	        255,
	        47,
	        1
	    ],
	    'grey': [
	        128,
	        128,
	        128,
	        1
	    ],
	    'honeydew': [
	        240,
	        255,
	        240,
	        1
	    ],
	    'hotpink': [
	        255,
	        105,
	        180,
	        1
	    ],
	    'indianred': [
	        205,
	        92,
	        92,
	        1
	    ],
	    'indigo': [
	        75,
	        0,
	        130,
	        1
	    ],
	    'ivory': [
	        255,
	        255,
	        240,
	        1
	    ],
	    'khaki': [
	        240,
	        230,
	        140,
	        1
	    ],
	    'lavender': [
	        230,
	        230,
	        250,
	        1
	    ],
	    'lavenderblush': [
	        255,
	        240,
	        245,
	        1
	    ],
	    'lawngreen': [
	        124,
	        252,
	        0,
	        1
	    ],
	    'lemonchiffon': [
	        255,
	        250,
	        205,
	        1
	    ],
	    'lightblue': [
	        173,
	        216,
	        230,
	        1
	    ],
	    'lightcoral': [
	        240,
	        128,
	        128,
	        1
	    ],
	    'lightcyan': [
	        224,
	        255,
	        255,
	        1
	    ],
	    'lightgoldenrodyellow': [
	        250,
	        250,
	        210,
	        1
	    ],
	    'lightgray': [
	        211,
	        211,
	        211,
	        1
	    ],
	    'lightgreen': [
	        144,
	        238,
	        144,
	        1
	    ],
	    'lightgrey': [
	        211,
	        211,
	        211,
	        1
	    ],
	    'lightpink': [
	        255,
	        182,
	        193,
	        1
	    ],
	    'lightsalmon': [
	        255,
	        160,
	        122,
	        1
	    ],
	    'lightseagreen': [
	        32,
	        178,
	        170,
	        1
	    ],
	    'lightskyblue': [
	        135,
	        206,
	        250,
	        1
	    ],
	    'lightslategray': [
	        119,
	        136,
	        153,
	        1
	    ],
	    'lightslategrey': [
	        119,
	        136,
	        153,
	        1
	    ],
	    'lightsteelblue': [
	        176,
	        196,
	        222,
	        1
	    ],
	    'lightyellow': [
	        255,
	        255,
	        224,
	        1
	    ],
	    'lime': [
	        0,
	        255,
	        0,
	        1
	    ],
	    'limegreen': [
	        50,
	        205,
	        50,
	        1
	    ],
	    'linen': [
	        250,
	        240,
	        230,
	        1
	    ],
	    'magenta': [
	        255,
	        0,
	        255,
	        1
	    ],
	    'maroon': [
	        128,
	        0,
	        0,
	        1
	    ],
	    'mediumaquamarine': [
	        102,
	        205,
	        170,
	        1
	    ],
	    'mediumblue': [
	        0,
	        0,
	        205,
	        1
	    ],
	    'mediumorchid': [
	        186,
	        85,
	        211,
	        1
	    ],
	    'mediumpurple': [
	        147,
	        112,
	        219,
	        1
	    ],
	    'mediumseagreen': [
	        60,
	        179,
	        113,
	        1
	    ],
	    'mediumslateblue': [
	        123,
	        104,
	        238,
	        1
	    ],
	    'mediumspringgreen': [
	        0,
	        250,
	        154,
	        1
	    ],
	    'mediumturquoise': [
	        72,
	        209,
	        204,
	        1
	    ],
	    'mediumvioletred': [
	        199,
	        21,
	        133,
	        1
	    ],
	    'midnightblue': [
	        25,
	        25,
	        112,
	        1
	    ],
	    'mintcream': [
	        245,
	        255,
	        250,
	        1
	    ],
	    'mistyrose': [
	        255,
	        228,
	        225,
	        1
	    ],
	    'moccasin': [
	        255,
	        228,
	        181,
	        1
	    ],
	    'navajowhite': [
	        255,
	        222,
	        173,
	        1
	    ],
	    'navy': [
	        0,
	        0,
	        128,
	        1
	    ],
	    'oldlace': [
	        253,
	        245,
	        230,
	        1
	    ],
	    'olive': [
	        128,
	        128,
	        0,
	        1
	    ],
	    'olivedrab': [
	        107,
	        142,
	        35,
	        1
	    ],
	    'orange': [
	        255,
	        165,
	        0,
	        1
	    ],
	    'orangered': [
	        255,
	        69,
	        0,
	        1
	    ],
	    'orchid': [
	        218,
	        112,
	        214,
	        1
	    ],
	    'palegoldenrod': [
	        238,
	        232,
	        170,
	        1
	    ],
	    'palegreen': [
	        152,
	        251,
	        152,
	        1
	    ],
	    'paleturquoise': [
	        175,
	        238,
	        238,
	        1
	    ],
	    'palevioletred': [
	        219,
	        112,
	        147,
	        1
	    ],
	    'papayawhip': [
	        255,
	        239,
	        213,
	        1
	    ],
	    'peachpuff': [
	        255,
	        218,
	        185,
	        1
	    ],
	    'peru': [
	        205,
	        133,
	        63,
	        1
	    ],
	    'pink': [
	        255,
	        192,
	        203,
	        1
	    ],
	    'plum': [
	        221,
	        160,
	        221,
	        1
	    ],
	    'powderblue': [
	        176,
	        224,
	        230,
	        1
	    ],
	    'purple': [
	        128,
	        0,
	        128,
	        1
	    ],
	    'rebeccapurple': [
	        102,
	        51,
	        153,
	        1
	    ],
	    'red': [
	        255,
	        0,
	        0,
	        1
	    ],
	    'rosybrown': [
	        188,
	        143,
	        143,
	        1
	    ],
	    'royalblue': [
	        65,
	        105,
	        225,
	        1
	    ],
	    'saddlebrown': [
	        139,
	        69,
	        19,
	        1
	    ],
	    'salmon': [
	        250,
	        128,
	        114,
	        1
	    ],
	    'sandybrown': [
	        244,
	        164,
	        96,
	        1
	    ],
	    'seagreen': [
	        46,
	        139,
	        87,
	        1
	    ],
	    'seashell': [
	        255,
	        245,
	        238,
	        1
	    ],
	    'sienna': [
	        160,
	        82,
	        45,
	        1
	    ],
	    'silver': [
	        192,
	        192,
	        192,
	        1
	    ],
	    'skyblue': [
	        135,
	        206,
	        235,
	        1
	    ],
	    'slateblue': [
	        106,
	        90,
	        205,
	        1
	    ],
	    'slategray': [
	        112,
	        128,
	        144,
	        1
	    ],
	    'slategrey': [
	        112,
	        128,
	        144,
	        1
	    ],
	    'snow': [
	        255,
	        250,
	        250,
	        1
	    ],
	    'springgreen': [
	        0,
	        255,
	        127,
	        1
	    ],
	    'steelblue': [
	        70,
	        130,
	        180,
	        1
	    ],
	    'tan': [
	        210,
	        180,
	        140,
	        1
	    ],
	    'teal': [
	        0,
	        128,
	        128,
	        1
	    ],
	    'thistle': [
	        216,
	        191,
	        216,
	        1
	    ],
	    'tomato': [
	        255,
	        99,
	        71,
	        1
	    ],
	    'turquoise': [
	        64,
	        224,
	        208,
	        1
	    ],
	    'violet': [
	        238,
	        130,
	        238,
	        1
	    ],
	    'wheat': [
	        245,
	        222,
	        179,
	        1
	    ],
	    'white': [
	        255,
	        255,
	        255,
	        1
	    ],
	    'whitesmoke': [
	        245,
	        245,
	        245,
	        1
	    ],
	    'yellow': [
	        255,
	        255,
	        0,
	        1
	    ],
	    'yellowgreen': [
	        154,
	        205,
	        50,
	        1
	    ]
	};
	function clamp_css_byte(i) {
	    // Clamp to integer 0 .. 255.
	    i = Math.round(i);
	    // Seems to be what Chrome does (vs truncation).
	    return i < 0 ? 0 : i > 255 ? 255 : i;
	}
	function clamp_css_float(f) {
	    // Clamp to float 0.0 .. 1.0.
	    return f < 0 ? 0 : f > 1 ? 1 : f;
	}
	function parse_css_int(str) {
	    // int or percentage.
	    if (str[str.length - 1] === '%')
	        return clamp_css_byte(parseFloat(str) / 100 * 255);
	    return clamp_css_byte(parseInt(str));
	}
	function parse_css_float(str) {
	    // float or percentage.
	    if (str[str.length - 1] === '%')
	        return clamp_css_float(parseFloat(str) / 100);
	    return clamp_css_float(parseFloat(str));
	}
	function css_hue_to_rgb(m1, m2, h) {
	    if (h < 0)
	        h += 1;
	    else if (h > 1)
	        h -= 1;
	    if (h * 6 < 1)
	        return m1 + (m2 - m1) * h * 6;
	    if (h * 2 < 1)
	        return m2;
	    if (h * 3 < 2)
	        return m1 + (m2 - m1) * (2 / 3 - h) * 6;
	    return m1;
	}
	function parseCSSColor(css_str) {
	    // Remove all whitespace, not compliant, but should just be more accepting.
	    var str = css_str.replace(/ /g, '').toLowerCase();
	    // Color keywords (and transparent) lookup.
	    if (str in kCSSColorTable)
	        return kCSSColorTable[str].slice();
	    // dup.
	    // #abc and #abc123 syntax.
	    if (str[0] === '#') {
	        if (str.length === 4) {
	            var iv = parseInt(str.substr(1), 16);
	            // TODO(deanm): Stricter parsing.
	            if (!(iv >= 0 && iv <= 4095))
	                return null;
	            // Covers NaN.
	            return [
	                (iv & 3840) >> 4 | (iv & 3840) >> 8,
	                iv & 240 | (iv & 240) >> 4,
	                iv & 15 | (iv & 15) << 4,
	                1
	            ];
	        } else if (str.length === 7) {
	            var iv = parseInt(str.substr(1), 16);
	            // TODO(deanm): Stricter parsing.
	            if (!(iv >= 0 && iv <= 16777215))
	                return null;
	            // Covers NaN.
	            return [
	                (iv & 16711680) >> 16,
	                (iv & 65280) >> 8,
	                iv & 255,
	                1
	            ];
	        }
	        return null;
	    }
	    var op = str.indexOf('('), ep = str.indexOf(')');
	    if (op !== -1 && ep + 1 === str.length) {
	        var fname = str.substr(0, op);
	        var params = str.substr(op + 1, ep - (op + 1)).split(',');
	        var alpha = 1;
	        // To allow case fallthrough.
	        switch (fname) {
	        case 'rgba':
	            if (params.length !== 4)
	                return null;
	            alpha = parse_css_float(params.pop());
	        // Fall through.
	        case 'rgb':
	            if (params.length !== 3)
	                return null;
	            return [
	                parse_css_int(params[0]),
	                parse_css_int(params[1]),
	                parse_css_int(params[2]),
	                alpha
	            ];
	        case 'hsla':
	            if (params.length !== 4)
	                return null;
	            alpha = parse_css_float(params.pop());
	        // Fall through.
	        case 'hsl':
	            if (params.length !== 3)
	                return null;
	            var h = (parseFloat(params[0]) % 360 + 360) % 360 / 360;
	            // 0 .. 1
	            // NOTE(deanm): According to the CSS spec s/l should only be
	            // percentages, but we don't bother and let float or percentage.
	            var s = parse_css_float(params[1]);
	            var l = parse_css_float(params[2]);
	            var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
	            var m1 = l * 2 - m2;
	            return [
	                clamp_css_byte(css_hue_to_rgb(m1, m2, h + 1 / 3) * 255),
	                clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255),
	                clamp_css_byte(css_hue_to_rgb(m1, m2, h - 1 / 3) * 255),
	                alpha
	            ];
	        default:
	            return null;
	        }
	    }
	    return null;
	}
	try {
	    csscolorparser.parseCSSColor = parseCSSColor;
	} catch (e) {
	}
	return csscolorparser;
}

var csscolorparserExports = requireCsscolorparser();

function number(a, b, t) {
    return a * (1 - t) + b * t;
}
function color(from, to, t) {
    return new Color(number(from.r, to.r, t), number(from.g, to.g, t), number(from.b, to.b, t), number(from.a, to.a, t));
}
function array(from, to, t) {
    return from.map((d, i) => {
        return number(d, to[i], t);
    });
}

var interpolate$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  array: array,
  color: color,
  number: number
});

class Color {
    constructor(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /**
   * Parses valid CSS color strings and returns a `Color` instance.
   * @returns A `Color` instance, or `undefined` if the input is not a valid color string.
   */
    static parse(input) {
        if (!input) {
            return void 0;
        }
        if (input instanceof Color) {
            return input;
        }
        if (typeof input !== 'string') {
            return void 0;
        }
        const rgba = csscolorparserExports.parseCSSColor(input);
        if (!rgba) {
            return void 0;
        }
        return new Color(rgba[0] / 255 * rgba[3], rgba[1] / 255 * rgba[3], rgba[2] / 255 * rgba[3], rgba[3]);
    }
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
    toStringPremultipliedAlpha() {
        const [r, g, b, a] = this.a === 0 ? [
            0,
            0,
            0,
            0
        ] : [
            this.r * 255 / this.a,
            this.g * 255 / this.a,
            this.b * 255 / this.a,
            this.a
        ];
        return `rgba(${ Math.round(r) },${ Math.round(g) },${ Math.round(b) },${ a })`;
    }
    toString() {
        const [r, g, b, a] = [
            this.r,
            this.g,
            this.b,
            this.a
        ];
        return `rgba(${ Math.round(r * 255) },${ Math.round(g * 255) },${ Math.round(b * 255) },${ a })`;
    }
    toRenderColor(lut) {
        const {r, g, b, a} = this;
        return new RenderColor(lut, r, g, b, a);
    }
    clone() {
        return new Color(this.r, this.g, this.b, this.a);
    }
}
class RenderColor {
    constructor(lut, r, g, b, a) {
        if (!lut) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        } else {
            const N = lut.image.height;
            const N2 = N * N;
            r = a === 0 ? 0 : r / a * (N - 1);
            g = a === 0 ? 0 : g / a * (N - 1);
            b = a === 0 ? 0 : b / a * (N - 1);
            const r0 = Math.floor(r);
            const g0 = Math.floor(g);
            const b0 = Math.floor(b);
            const r1 = Math.ceil(r);
            const g1 = Math.ceil(g);
            const b1 = Math.ceil(b);
            const rw = r - r0;
            const gw = g - g0;
            const bw = b - b0;
            const data = lut.image.data;
            const i0 = (r0 + g0 * N2 + b0 * N) * 4;
            const i1 = (r0 + g0 * N2 + b1 * N) * 4;
            const i2 = (r0 + g1 * N2 + b0 * N) * 4;
            const i3 = (r0 + g1 * N2 + b1 * N) * 4;
            const i4 = (r1 + g0 * N2 + b0 * N) * 4;
            const i5 = (r1 + g0 * N2 + b1 * N) * 4;
            const i6 = (r1 + g1 * N2 + b0 * N) * 4;
            const i7 = (r1 + g1 * N2 + b1 * N) * 4;
            if (i0 < 0 || i7 >= data.length) {
                throw new Error('out of range');
            }
            this.r = number(number(number(data[i0], data[i1], bw), number(data[i2], data[i3], bw), gw), number(number(data[i4], data[i5], bw), number(data[i6], data[i7], bw), gw), rw) / 255 * a;
            this.g = number(number(number(data[i0 + 1], data[i1 + 1], bw), number(data[i2 + 1], data[i3 + 1], bw), gw), number(number(data[i4 + 1], data[i5 + 1], bw), number(data[i6 + 1], data[i7 + 1], bw), gw), rw) / 255 * a;
            this.b = number(number(number(data[i0 + 2], data[i1 + 2], bw), number(data[i2 + 2], data[i3 + 2], bw), gw), number(number(data[i4 + 2], data[i5 + 2], bw), number(data[i6 + 2], data[i7 + 2], bw), gw), rw) / 255 * a;
            this.a = a;
        }
    }
    /**
   * Returns an RGBA array of values representing the color, unpremultiplied by A.
   *
   * @returns An array of RGBA color values in the range [0, 255].
   */
    toArray() {
        const {r, g, b, a} = this;
        return a === 0 ? [
            0,
            0,
            0,
            0
        ] : [
            r * 255 / a,
            g * 255 / a,
            b * 255 / a,
            a
        ];
    }
    /**
   * Returns an HSLA array of values representing the color, unpremultiplied by A.
   *
   * @returns An array of HSLA color values.
   */
    toHslaArray() {
        if (this.a === 0) {
            return [
                0,
                0,
                0,
                0
            ];
        }
        const {r, g, b, a} = this;
        const red = Math.min(Math.max(r / a, 0), 1);
        const green = Math.min(Math.max(g / a, 0), 1);
        const blue = Math.min(Math.max(b / a, 0), 1);
        const min = Math.min(red, green, blue);
        const max = Math.max(red, green, blue);
        const l = (min + max) / 2;
        if (min === max) {
            return [
                0,
                0,
                l * 100,
                a
            ];
        }
        const delta = max - min;
        const s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        let h = 0;
        if (max === red) {
            h = (green - blue) / delta + (green < blue ? 6 : 0);
        } else if (max === green) {
            h = (blue - red) / delta + 2;
        } else if (max === blue) {
            h = (red - green) / delta + 4;
        }
        h *= 60;
        return [
            Math.min(Math.max(h, 0), 360),
            Math.min(Math.max(s * 100, 0), 100),
            Math.min(Math.max(l * 100, 0), 100),
            a
        ];
    }
    /**
   * Returns a RGBA array of float values representing the color, unpremultiplied by A.
   *
   * @returns An array of RGBA color values in the range [0, 1].
   */
    toArray01() {
        const {r, g, b, a} = this;
        return a === 0 ? [
            0,
            0,
            0,
            0
        ] : [
            r / a,
            g / a,
            b / a,
            a
        ];
    }
    /**
   * Returns an RGB array of values representing the color, unpremultiplied by A and multiplied by a scalar.
   *
   * @param {number} scale A scale to apply to the unpremultiplied-alpha values.
   * @returns An array of RGB color values in the range [0, 1].
   */
    toArray01Scaled(scale) {
        const {r, g, b, a} = this;
        return a === 0 ? [
            0,
            0,
            0
        ] : [
            r / a * scale,
            g / a * scale,
            b / a * scale
        ];
    }
    /**
   * Returns an RGBA array of values representing the color, premultiplied by A.
   *
   * @returns An array of RGBA color values in the range [0, 1].
   */
    toArray01PremultipliedAlpha() {
        const {r, g, b, a} = this;
        return [
            r,
            g,
            b,
            a
        ];
    }
    /**
   * Returns an RGBA array of values representing the color, unpremultiplied by A, and converted to linear color space.
   * The color is defined by sRGB primaries, but the sRGB transfer function is reversed to obtain linear energy.
   *
   * @returns An array of RGBA color values in the range [0, 1].
   */
    toArray01Linear() {
        const {r, g, b, a} = this;
        return a === 0 ? [
            0,
            0,
            0,
            0
        ] : [
            Math.pow(r / a, 2.2),
            Math.pow(g / a, 2.2),
            Math.pow(b / a, 2.2),
            a
        ];
    }
}
Color.black = new Color(0, 0, 0, 1);
Color.white = new Color(1, 1, 1, 1);
Color.transparent = new Color(0, 0, 0, 0);
Color.red = new Color(1, 0, 0, 1);
Color.blue = new Color(0, 0, 1, 1);

class Collator {
    constructor(caseSensitive, diacriticSensitive, locale) {
        if (caseSensitive)
            this.sensitivity = diacriticSensitive ? 'variant' : 'case';
        else
            this.sensitivity = diacriticSensitive ? 'accent' : 'base';
        this.locale = locale;
        this.collator = new Intl.Collator(this.locale ? this.locale : [], {
            sensitivity: this.sensitivity,
            usage: 'search'
        });
    }
    compare(lhs, rhs) {
        return this.collator.compare(lhs, rhs);
    }
    resolvedLocale() {
        return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale;
    }
}

class FormattedSection {
    constructor(text, image, scale, fontStack, textColor) {
        this.text = text.normalize ? text.normalize() : text;
        this.image = image;
        this.scale = scale;
        this.fontStack = fontStack;
        this.textColor = textColor;
    }
}
class Formatted {
    constructor(sections) {
        this.sections = sections;
    }
    static fromString(unformatted) {
        return new Formatted([new FormattedSection(unformatted, null, null, null, null)]);
    }
    isEmpty() {
        if (this.sections.length === 0)
            return true;
        return !this.sections.some(section => section.text.length !== 0 || section.image && section.image.namePrimary);
    }
    static factory(text) {
        if (text instanceof Formatted) {
            return text;
        } else {
            return Formatted.fromString(text);
        }
    }
    toString() {
        if (this.sections.length === 0)
            return '';
        return this.sections.map(section => section.text).join('');
    }
    serialize() {
        const serialized = ['format'];
        for (const section of this.sections) {
            if (section.image) {
                serialized.push([
                    'image',
                    section.image.namePrimary
                ]);
                continue;
            }
            serialized.push(section.text);
            const options = {};
            if (section.fontStack) {
                options['text-font'] = [
                    'literal',
                    section.fontStack.split(',')
                ];
            }
            if (section.scale) {
                options['font-scale'] = section.scale;
            }
            if (section.textColor) {
                options['text-color'] = ['rgba'].concat(section.textColor.toRenderColor(null).toArray());
            }
            serialized.push(options);
        }
        return serialized;
    }
}

class ImageIdWithOptions {
    constructor(id, options) {
        this.id = id;
        this.options = options || { params: {} };
        if (!this.options.transform) {
            this.options.transform = new DOMMatrix([
                1,
                0,
                0,
                1,
                0,
                0
            ]);
        } else {
            const {a, b, c, d, e, f} = this.options.transform;
            this.options.transform = new DOMMatrix([
                a,
                b,
                c,
                d,
                e,
                f
            ]);
        }
    }
    static deserializeId(serialized) {
        return JSON.parse(serialized).id;
    }
    static deserializeFromString(serialized) {
        const deserializedObject = JSON.parse(serialized);
        ({ params: deserializedObject.options.params });
        const {a, b, c, d, e, f} = deserializedObject.options.transform;
        new DOMMatrix([
            a,
            b,
            c,
            d,
            e,
            f
        ]);
        return new ImageIdWithOptions(deserializedObject.id, deserializedObject.options);
    }
    scaleSelf(factor) {
        this.options.transform = this.options.transform.scale(factor);
        return this;
    }
    serialize() {
        const serialisedObject = { id: this.id };
        if (this.options) {
            serialisedObject.options = this.options;
        }
        const {a, b, c, d, e, f} = this.options.transform;
        serialisedObject.options.transform = {
            a,
            b,
            c,
            d,
            e,
            f
        };
        return JSON.stringify(serialisedObject);
    }
}

class ResolvedImage {
    constructor(options) {
        this.namePrimary = options.namePrimary;
        if (options.nameSecondary) {
            this.nameSecondary = options.nameSecondary;
        }
        if (options.optionsPrimary) {
            this.optionsPrimary = options.optionsPrimary;
        }
        if (options.optionsSecondary) {
            this.optionsSecondary = options.optionsSecondary;
        }
        this.available = options.available;
    }
    toString() {
        if (this.namePrimary && this.nameSecondary) {
            return `[${ this.namePrimary },${ this.nameSecondary }]`;
        }
        return this.namePrimary;
    }
    getPrimary() {
        return new ImageIdWithOptions(this.namePrimary, { params: this.optionsPrimary ? this.optionsPrimary.params || {} : {} });
    }
    getSerializedPrimary() {
        return this.getPrimary().serialize();
    }
    getSecondary() {
        if (this.nameSecondary) {
            return new ImageIdWithOptions(this.nameSecondary, { params: this.optionsSecondary ? this.optionsSecondary.params || {} : {} });
        }
        return null;
    }
    static from(image) {
        return typeof image === 'string' ? ResolvedImage.build(image) : image;
    }
    static build(namePrimary, nameSecondary, optionsPrimary, optionsSecondary) {
        if (!namePrimary)
            return null;
        return new ResolvedImage({
            namePrimary,
            nameSecondary,
            optionsPrimary,
            optionsSecondary,
            available: false
        });
    }
}

function validateRGBA(r, g, b, a) {
    if (!(typeof r === 'number' && r >= 0 && r <= 255 && typeof g === 'number' && g >= 0 && g <= 255 && typeof b === 'number' && b >= 0 && b <= 255)) {
        const value = typeof a === 'number' ? [
            r,
            g,
            b,
            a
        ] : [
            r,
            g,
            b
        ];
        return `Invalid rgba value [${ value.join(', ') }]: 'r', 'g', and 'b' must be between 0 and 255.`;
    }
    if (!(typeof a === 'undefined' || typeof a === 'number' && a >= 0 && a <= 1)) {
        return `Invalid rgba value [${ [
            r,
            g,
            b,
            a
        ].join(', ') }]: 'a' must be between 0 and 1.`;
    }
    return null;
}
function validateHSLA(h, s, l, a) {
    if (!(typeof h === 'number' && h >= 0 && h <= 360)) {
        const value = typeof a === 'number' ? [
            h,
            s,
            l,
            a
        ] : [
            h,
            s,
            l
        ];
        return `Invalid hsla value [${ value.join(', ') }]: 'h' must be between 0 and 360.`;
    }
    if (!(typeof s === 'number' && s >= 0 && s <= 100 && typeof l === 'number' && l >= 0 && l <= 100)) {
        const value = typeof a === 'number' ? [
            h,
            s,
            l,
            a
        ] : [
            h,
            s,
            l
        ];
        return `Invalid hsla value [${ value.join(', ') }]: 's', and 'l' must be between 0 and 100.`;
    }
    if (!(typeof a === 'undefined' || typeof a === 'number' && a >= 0 && a <= 1)) {
        return `Invalid hsla value [${ [
            h,
            s,
            l,
            a
        ].join(', ') }]: 'a' must be between 0 and 1.`;
    }
    return null;
}
function isValue(mixed) {
    if (mixed === null) {
        return true;
    } else if (typeof mixed === 'string') {
        return true;
    } else if (typeof mixed === 'boolean') {
        return true;
    } else if (typeof mixed === 'number') {
        return true;
    } else if (mixed instanceof Color) {
        return true;
    } else if (mixed instanceof Collator) {
        return true;
    } else if (mixed instanceof Formatted) {
        return true;
    } else if (mixed instanceof ResolvedImage) {
        return true;
    } else if (Array.isArray(mixed)) {
        for (const item of mixed) {
            if (!isValue(item)) {
                return false;
            }
        }
        return true;
    } else if (typeof mixed === 'object') {
        for (const key in mixed) {
            if (!isValue(mixed[key])) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}
function typeOf(value) {
    if (value === null) {
        return NullType;
    } else if (typeof value === 'string') {
        return StringType;
    } else if (typeof value === 'boolean') {
        return BooleanType;
    } else if (typeof value === 'number') {
        return NumberType;
    } else if (value instanceof Color) {
        return ColorType;
    } else if (value instanceof Collator) {
        return CollatorType;
    } else if (value instanceof Formatted) {
        return FormattedType;
    } else if (value instanceof ResolvedImage) {
        return ResolvedImageType;
    } else if (Array.isArray(value)) {
        const length = value.length;
        let itemType;
        for (const item of value) {
            const t = typeOf(item);
            if (!itemType) {
                itemType = t;
            } else if (itemType === t) {
                continue;
            } else {
                itemType = ValueType;
                break;
            }
        }
        return array$1(itemType || ValueType, length);
    } else {
        return ObjectType;
    }
}
function toString(value) {
    const type = typeof value;
    if (value === null) {
        return '';
    } else if (type === 'string' || type === 'number' || type === 'boolean') {
        return String(value);
    } else if (value instanceof Color) {
        return value.toStringPremultipliedAlpha();
    } else if (value instanceof Formatted || value instanceof ResolvedImage) {
        return value.toString();
    } else {
        return JSON.stringify(value);
    }
}

class Literal {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    static parse(args, context) {
        if (args.length !== 2)
            return context.error(`'literal' expression requires exactly one argument, but found ${ args.length - 1 } instead.`);
        if (!isValue(args[1]))
            return context.error(`invalid value`);
        const value = args[1];
        let type = typeOf(value);
        const expected = context.expectedType;
        if (type.kind === 'array' && type.N === 0 && expected && expected.kind === 'array' && (typeof expected.N !== 'number' || expected.N === 0)) {
            type = expected;
        }
        return new Literal(type, value);
    }
    evaluate() {
        return this.value;
    }
    eachChild() {
    }
    outputDefined() {
        return true;
    }
    serialize() {
        if (this.type.kind === 'array' || this.type.kind === 'object') {
            return [
                'literal',
                this.value
            ];
        } else if (this.value instanceof Color) {
            return ['rgba'].concat(this.value.toRenderColor(null).toArray());
        } else if (this.value instanceof Formatted) {
            return this.value.serialize();
        } else {
            return this.value;
        }
    }
}

class RuntimeError {
    constructor(message) {
        this.name = 'ExpressionEvaluationError';
        this.message = message;
    }
    toJSON() {
        return this.message;
    }
}

const types$1 = {
    string: StringType,
    number: NumberType,
    boolean: BooleanType,
    object: ObjectType
};
class Assertion {
    constructor(type, args) {
        this.type = type;
        this.args = args;
    }
    static parse(args, context) {
        if (args.length < 2)
            return context.error(`Expected at least one argument.`);
        let i = 1;
        let type;
        const name = args[0];
        if (name === 'array') {
            let itemType;
            if (args.length > 2) {
                const type2 = args[1];
                if (typeof type2 !== 'string' || !(type2 in types$1) || type2 === 'object')
                    return context.error('The item type argument of "array" must be one of string, number, boolean', 1);
                itemType = types$1[type2];
                i++;
            } else {
                itemType = ValueType;
            }
            let N;
            if (args.length > 3) {
                if (args[2] !== null && (typeof args[2] !== 'number' || args[2] < 0 || args[2] !== Math.floor(args[2]))) {
                    return context.error('The length argument to "array" must be a positive integer literal', 2);
                }
                N = args[2];
                i++;
            }
            type = array$1(itemType, N);
        } else {
            type = types$1[name];
        }
        const parsed = [];
        for (; i < args.length; i++) {
            const input = context.parse(args[i], i, ValueType);
            if (!input)
                return null;
            parsed.push(input);
        }
        return new Assertion(type, parsed);
    }
    evaluate(ctx) {
        for (let i = 0; i < this.args.length; i++) {
            const value = this.args[i].evaluate(ctx);
            const error = checkSubtype(this.type, typeOf(value));
            if (!error) {
                return value;
            } else if (i === this.args.length - 1) {
                throw new RuntimeError(`The expression ${ JSON.stringify(this.args[i].serialize()) } evaluated to ${ toString$1(typeOf(value)) } but was expected to be of type ${ toString$1(this.type) }.`);
            }
        }
        return null;
    }
    eachChild(fn) {
        this.args.forEach(fn);
    }
    outputDefined() {
        return this.args.every(arg => arg.outputDefined());
    }
    serialize() {
        const type = this.type;
        const serialized = [type.kind];
        if (type.kind === 'array') {
            const itemType = type.itemType;
            if (itemType.kind === 'string' || itemType.kind === 'number' || itemType.kind === 'boolean') {
                serialized.push(itemType.kind);
                const N = type.N;
                if (typeof N === 'number' || this.args.length > 1) {
                    serialized.push(N);
                }
            }
        }
        return serialized.concat(this.args.map(arg => arg.serialize()));
    }
}

class FormatExpression {
    constructor(sections) {
        this.type = FormattedType;
        this.sections = sections;
    }
    static parse(args, context) {
        if (args.length < 2) {
            return context.error(`Expected at least one argument.`);
        }
        const firstArg = args[1];
        if (!Array.isArray(firstArg) && typeof firstArg === 'object') {
            return context.error(`First argument must be an image or text section.`);
        }
        const sections = [];
        let nextTokenMayBeObject = false;
        for (let i = 1; i <= args.length - 1; ++i) {
            const arg = args[i];
            if (nextTokenMayBeObject && typeof arg === 'object' && !Array.isArray(arg)) {
                nextTokenMayBeObject = false;
                let scale = null;
                if (arg['font-scale']) {
                    scale = context.parseObjectValue(arg['font-scale'], i, 'font-scale', NumberType);
                    if (!scale)
                        return null;
                }
                let font = null;
                if (arg['text-font']) {
                    font = context.parseObjectValue(arg['text-font'], i, 'text-font', array$1(StringType));
                    if (!font)
                        return null;
                }
                let textColor = null;
                if (arg['text-color']) {
                    textColor = context.parseObjectValue(arg['text-color'], i, 'text-color', ColorType);
                    if (!textColor)
                        return null;
                }
                const lastExpression = sections[sections.length - 1];
                lastExpression.scale = scale;
                lastExpression.font = font;
                lastExpression.textColor = textColor;
            } else {
                const content = context.parse(args[i], i, ValueType);
                if (!content)
                    return null;
                const kind = content.type.kind;
                if (kind !== 'string' && kind !== 'value' && kind !== 'null' && kind !== 'resolvedImage')
                    return context.error(`Formatted text type must be 'string', 'value', 'image' or 'null'.`);
                nextTokenMayBeObject = true;
                sections.push({
                    content,
                    scale: null,
                    font: null,
                    textColor: null
                });
            }
        }
        return new FormatExpression(sections);
    }
    evaluate(ctx) {
        const evaluateSection = section => {
            const evaluatedContent = section.content.evaluate(ctx);
            if (typeOf(evaluatedContent) === ResolvedImageType) {
                return new FormattedSection('', evaluatedContent, null, null, null);
            }
            return new FormattedSection(toString(evaluatedContent), null, section.scale ? section.scale.evaluate(ctx) : null, section.font ? section.font.evaluate(ctx).join(',') : null, section.textColor ? section.textColor.evaluate(ctx) : null);
        };
        return new Formatted(this.sections.map(evaluateSection));
    }
    eachChild(fn) {
        for (const section of this.sections) {
            fn(section.content);
            if (section.scale) {
                fn(section.scale);
            }
            if (section.font) {
                fn(section.font);
            }
            if (section.textColor) {
                fn(section.textColor);
            }
        }
    }
    outputDefined() {
        return false;
    }
    serialize() {
        const serialized = ['format'];
        for (const section of this.sections) {
            serialized.push(section.content.serialize());
            const options = {};
            if (section.scale) {
                options['font-scale'] = section.scale.serialize();
            }
            if (section.font) {
                options['text-font'] = section.font.serialize();
            }
            if (section.textColor) {
                options['text-color'] = section.textColor.serialize();
            }
            serialized.push(options);
        }
        return serialized;
    }
}

function isImageOptions(value) {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        return true;
    }
    return false;
}
class ImageExpression {
    constructor(inputPrimary, inputSecondary, inputPrimaryParams, inputSecondaryParams) {
        this._imageWarnHistory = {};
        this.type = ResolvedImageType;
        this.inputPrimary = inputPrimary;
        this.inputSecondary = inputSecondary;
        this.inputPrimaryParams = inputPrimaryParams;
        this.inputSecondaryParams = inputSecondaryParams;
    }
    static parse(args, context) {
        if (args.length < 2) {
            return context.error(`Expected two or more arguments.`);
        }
        let nextArgId = 1;
        const imageExpression = [];
        function tryParseImage() {
            if (nextArgId < args.length) {
                const imageName = context.parse(args[nextArgId], nextArgId++, StringType);
                if (!imageName) {
                    context.error(imageExpression.length ? `Secondary image variant is not a string.` : `No image name provided.`);
                    return false;
                }
                imageExpression.push({
                    image: imageName,
                    options: void 0
                });
                return true;
            }
            return true;
        }
        function tryParseOptions() {
            if (nextArgId < args.length) {
                if (!isImageOptions(args[nextArgId])) {
                    return true;
                }
                const params = args[nextArgId].params;
                const optionsContext = context.concat(nextArgId);
                if (!params) {
                    nextArgId++;
                    return true;
                }
                if (typeof params !== 'object' || params.constructor !== Object) {
                    optionsContext.error(`Image options "params" should be an object`);
                    return false;
                }
                const parsed = {};
                const childContext = optionsContext.concat(void 0, 'params');
                for (const key in params) {
                    if (!key) {
                        childContext.error(`Image parameter name should be non-empty`);
                        return false;
                    }
                    const value = childContext.concat(void 0, key).parse(params[key], void 0, ColorType, void 0, { typeAnnotation: 'coerce' });
                    if (!value) {
                        return false;
                    }
                    parsed[key] = value;
                }
                imageExpression[imageExpression.length - 1].options = parsed;
                nextArgId++;
                return true;
            }
            return true;
        }
        for (let i = 0; i < 2; i++) {
            if (!tryParseImage() || !tryParseOptions()) {
                return;
            }
        }
        return new ImageExpression(imageExpression[0].image, imageExpression[1] ? imageExpression[1].image : void 0, imageExpression[0].options, imageExpression[1] ? imageExpression[1].options : void 0);
    }
    evaluateParams(ctx, params) {
        const result = {};
        if (params) {
            for (const key in params) {
                if (params[key]) {
                    try {
                        const color = params[key].evaluate(ctx);
                        const msg = `Ignoring image parameter "${ key }" with semi-transparent color ${ color.toString() }`;
                        if (color.a !== 1) {
                            if (!this._imageWarnHistory[msg]) {
                                console.warn(msg);
                                this._imageWarnHistory[msg] = true;
                            }
                            continue;
                        }
                        result[key] = color;
                    } catch (err) {
                        continue;
                    }
                }
            }
        } else {
            return void 0;
        }
        if (Object.keys(result).length === 0) {
            return void 0;
        }
        return { params: result };
    }
    evaluate(ctx) {
        const value = ResolvedImage.build(this.inputPrimary.evaluate(ctx), this.inputSecondary ? this.inputSecondary.evaluate(ctx) : void 0, this.inputPrimaryParams ? this.evaluateParams(ctx, this.inputPrimaryParams) : void 0, this.inputSecondaryParams ? this.evaluateParams(ctx, this.inputSecondaryParams) : void 0);
        if (value && ctx.availableImages) {
            value.available = ctx.availableImages.indexOf(value.namePrimary) > -1;
            if (value.nameSecondary && value.available && ctx.availableImages) {
                value.available = ctx.availableImages.indexOf(value.nameSecondary) > -1;
            }
        }
        return value;
    }
    eachChild(fn) {
        fn(this.inputPrimary);
        if (this.inputPrimaryParams) {
            for (const key in this.inputPrimaryParams) {
                if (this.inputPrimaryParams[key]) {
                    fn(this.inputPrimaryParams[key]);
                }
            }
        }
        if (this.inputSecondary) {
            fn(this.inputSecondary);
            if (this.inputSecondaryParams) {
                for (const key in this.inputSecondaryParams) {
                    if (this.inputSecondaryParams[key]) {
                        fn(this.inputSecondaryParams[key]);
                    }
                }
            }
        }
    }
    outputDefined() {
        return false;
    }
    serializeParams(params) {
        const result = {};
        if (params) {
            for (const key in params) {
                if (params[key]) {
                    result[key] = params[key].serialize();
                }
            }
        } else {
            return void 0;
        }
        return { params: result };
    }
    serialize() {
        const serialized = [
            'image',
            this.inputPrimary.serialize()
        ];
        if (this.inputPrimaryParams) {
            serialized.push(this.serializeParams(this.inputPrimaryParams));
        }
        if (this.inputSecondary) {
            serialized.push(this.inputSecondary.serialize());
            if (this.inputSecondaryParams) {
                serialized.push(this.serializeParams(this.inputSecondaryParams));
            }
        }
        return serialized;
    }
}

function getType(val) {
    if (val instanceof Number) {
        return 'number';
    } else if (val instanceof String) {
        return 'string';
    } else if (val instanceof Boolean) {
        return 'boolean';
    } else if (Array.isArray(val)) {
        return 'array';
    } else if (val === null) {
        return 'null';
    } else {
        return typeof val;
    }
}

const types = {
    'to-boolean': BooleanType,
    'to-color': ColorType,
    'to-number': NumberType,
    'to-string': StringType
};
class Coercion {
    constructor(type, args) {
        this.type = type;
        this.args = args;
    }
    static parse(args, context) {
        if (args.length < 2)
            return context.error(`Expected at least one argument.`);
        const name = args[0];
        const parsed = [];
        let type = NullType;
        if (name === 'to-array') {
            if (!Array.isArray(args[1])) {
                return null;
            }
            const arrayLength = args[1].length;
            if (context.expectedType) {
                if (context.expectedType.kind === 'array') {
                    type = array$1(context.expectedType.itemType, arrayLength);
                } else {
                    return context.error(`Expected ${ context.expectedType.kind } but found array.`);
                }
            } else if (arrayLength > 0 && isValue(args[1][0])) {
                const value = args[1][0];
                type = array$1(typeOf(value), arrayLength);
            } else {
                return null;
            }
            for (let i = 0; i < arrayLength; i++) {
                const member = args[1][i];
                let parsedMember;
                if (getType(member) === 'array') {
                    parsedMember = context.parse(member, void 0, type.itemType);
                } else {
                    const memberType = getType(member);
                    if (memberType !== type.itemType.kind) {
                        return context.error(`Expected ${ type.itemType.kind } but found ${ memberType }.`);
                    }
                    parsedMember = context.registry['literal'].parse([
                        'literal',
                        member === void 0 ? null : member
                    ], context);
                }
                if (!parsedMember)
                    return null;
                parsed.push(parsedMember);
            }
        } else {
            if ((name === 'to-boolean' || name === 'to-string') && args.length !== 2)
                return context.error(`Expected one argument.`);
            type = types[name];
            for (let i = 1; i < args.length; i++) {
                const input = context.parse(args[i], i, ValueType);
                if (!input)
                    return null;
                parsed.push(input);
            }
        }
        return new Coercion(type, parsed);
    }
    evaluate(ctx) {
        if (this.type.kind === 'boolean') {
            return Boolean(this.args[0].evaluate(ctx));
        } else if (this.type.kind === 'color') {
            let input;
            let error;
            for (const arg of this.args) {
                input = arg.evaluate(ctx);
                error = null;
                if (input instanceof Color) {
                    return input;
                } else if (typeof input === 'string') {
                    const c = ctx.parseColor(input);
                    if (c)
                        return c;
                } else if (Array.isArray(input)) {
                    if (input.length < 3 || input.length > 4) {
                        error = `Invalid rbga value ${ JSON.stringify(input) }: expected an array containing either three or four numeric values.`;
                    } else {
                        error = validateRGBA(input[0], input[1], input[2], input[3]);
                    }
                    if (!error) {
                        return new Color(input[0] / 255, input[1] / 255, input[2] / 255, input[3]);
                    }
                }
            }
            throw new RuntimeError(error || `Could not parse color from value '${ typeof input === 'string' ? input : String(JSON.stringify(input)) }'`);
        } else if (this.type.kind === 'number') {
            let value = null;
            for (const arg of this.args) {
                value = arg.evaluate(ctx);
                if (value === null)
                    return 0;
                const num = Number(value);
                if (isNaN(num))
                    continue;
                return num;
            }
            throw new RuntimeError(`Could not convert ${ JSON.stringify(value) } to number.`);
        } else if (this.type.kind === 'formatted') {
            return Formatted.fromString(toString(this.args[0].evaluate(ctx)));
        } else if (this.type.kind === 'resolvedImage') {
            return ResolvedImage.build(toString(this.args[0].evaluate(ctx)));
        } else if (this.type.kind === 'array') {
            return this.args.map(arg => {
                return arg.evaluate(ctx);
            });
        } else {
            return toString(this.args[0].evaluate(ctx));
        }
    }
    eachChild(fn) {
        this.args.forEach(fn);
    }
    outputDefined() {
        return this.args.every(arg => arg.outputDefined());
    }
    serialize() {
        if (this.type.kind === 'formatted') {
            return new FormatExpression([{
                    content: this.args[0],
                    scale: null,
                    font: null,
                    textColor: null
                }]).serialize();
        }
        if (this.type.kind === 'resolvedImage') {
            return new ImageExpression(this.args[0]).serialize();
        }
        const serialized = this.type.kind === 'array' ? [] : [`to-${ this.type.kind }`];
        this.eachChild(child => {
            serialized.push(child.serialize());
        });
        return serialized;
    }
}

const geometryTypes = [
    'Unknown',
    'Point',
    'LineString',
    'Polygon'
];
class EvaluationContext {
    constructor(scope, options) {
        this.globals = null;
        this.feature = null;
        this.featureState = null;
        this.formattedSection = null;
        this._parseColorCache = {};
        this.availableImages = null;
        this.canonical = null;
        this.featureTileCoord = null;
        this.featureDistanceData = null;
        this.scope = scope;
        this.options = options;
    }
    id() {
        return this.feature && this.feature.id !== void 0 ? this.feature.id : null;
    }
    geometryType() {
        return this.feature ? typeof this.feature.type === 'number' ? geometryTypes[this.feature.type] : this.feature.type : null;
    }
    geometry() {
        return this.feature && 'geometry' in this.feature ? this.feature.geometry : null;
    }
    canonicalID() {
        return this.canonical;
    }
    properties() {
        return this.feature && this.feature.properties || {};
    }
    measureLight(_) {
        return this.globals.brightness || 0;
    }
    distanceFromCenter() {
        if (this.featureTileCoord && this.featureDistanceData) {
            const c = this.featureDistanceData.center;
            const scale = this.featureDistanceData.scale;
            const {x, y} = this.featureTileCoord;
            const dX = x * scale - c[0];
            const dY = y * scale - c[1];
            const bX = this.featureDistanceData.bearing[0];
            const bY = this.featureDistanceData.bearing[1];
            const dist = bX * dX + bY * dY;
            return dist;
        }
        return 0;
    }
    parseColor(input) {
        let cached = this._parseColorCache[input];
        if (!cached) {
            cached = this._parseColorCache[input] = Color.parse(input);
        }
        return cached;
    }
    getConfig(id) {
        return this.options ? this.options.get(id) : null;
    }
}

class CompoundExpression {
    constructor(name, type, evaluate, args, overloadIndex) {
        this.name = name;
        this.type = type;
        this._evaluate = evaluate;
        this.args = args;
        this._overloadIndex = overloadIndex;
    }
    evaluate(ctx) {
        if (!this._evaluate) {
            const definition = CompoundExpression.definitions[this.name];
            this._evaluate = Array.isArray(definition) ? definition[2] : definition.overloads[this._overloadIndex][1];
        }
        return this._evaluate(ctx, this.args);
    }
    eachChild(fn) {
        this.args.forEach(fn);
    }
    outputDefined() {
        return false;
    }
    serialize() {
        return [this.name].concat(this.args.map(arg => arg.serialize()));
    }
    static parse(args, context) {
        const op = args[0];
        const definition = CompoundExpression.definitions[op];
        if (!definition) {
            return context.error(`Unknown expression "${ op }". If you wanted a literal array, use ["literal", [...]].`, 0);
        }
        const type = Array.isArray(definition) ? definition[0] : definition.type;
        const availableOverloads = Array.isArray(definition) ? [[
                definition[1],
                definition[2]
            ]] : definition.overloads;
        const overloadParams = [];
        let signatureContext = null;
        let overloadIndex = -1;
        for (const [params, evaluate] of availableOverloads) {
            if (Array.isArray(params) && params.length !== args.length - 1)
                continue;
            overloadParams.push(params);
            overloadIndex++;
            signatureContext = new ParsingContext$1(context.registry, context.path, null, context.scope, void 0, context._scope, context.options);
            const parsedArgs = [];
            let argParseFailed = false;
            for (let i = 1; i < args.length; i++) {
                const arg = args[i];
                const expectedType = Array.isArray(params) ? params[i - 1] : // @ts-expect-error - TS2339 - Property 'type' does not exist on type 'Varargs | Evaluate'.
                params.type;
                const parsed = signatureContext.parse(arg, 1 + parsedArgs.length, expectedType);
                if (!parsed) {
                    argParseFailed = true;
                    break;
                }
                parsedArgs.push(parsed);
            }
            if (argParseFailed) {
                continue;
            }
            if (Array.isArray(params)) {
                if (params.length !== parsedArgs.length) {
                    signatureContext.error(`Expected ${ params.length } arguments, but found ${ parsedArgs.length } instead.`);
                    continue;
                }
            }
            for (let i = 0; i < parsedArgs.length; i++) {
                const expected = Array.isArray(params) ? params[i] : params.type;
                const arg = parsedArgs[i];
                signatureContext.concat(i + 1).checkSubtype(expected, arg.type);
            }
            if (signatureContext.errors.length === 0) {
                return new CompoundExpression(op, type, evaluate, parsedArgs, overloadIndex);
            }
        }
        if (overloadParams.length === 1) {
            context.errors.push(...signatureContext.errors);
        } else {
            const expected = overloadParams.length ? overloadParams : availableOverloads.map(([params]) => params);
            const signatures = expected.map(stringifySignature).join(' | ');
            const actualTypes = [];
            for (let i = 1; i < args.length; i++) {
                const parsed = context.parse(args[i], 1 + actualTypes.length);
                if (!parsed)
                    return null;
                actualTypes.push(toString$1(parsed.type));
            }
            context.error(`Expected arguments of type ${ signatures }, but found (${ actualTypes.join(', ') }) instead.`);
        }
        return null;
    }
    static register(registry, definitions) {
        CompoundExpression.definitions = definitions;
        for (const name in definitions) {
            registry[name] = CompoundExpression;
        }
    }
}
function stringifySignature(signature) {
    if (Array.isArray(signature)) {
        return `(${ signature.map(toString$1).join(', ') })`;
    } else {
        return `(${ toString$1(signature.type) }...)`;
    }
}

class CollatorExpression {
    constructor(caseSensitive, diacriticSensitive, locale) {
        this.type = CollatorType;
        this.locale = locale;
        this.caseSensitive = caseSensitive;
        this.diacriticSensitive = diacriticSensitive;
    }
    static parse(args, context) {
        if (args.length !== 2)
            return context.error(`Expected one argument.`);
        const options = args[1];
        if (typeof options !== 'object' || Array.isArray(options))
            return context.error(`Collator options argument must be an object.`);
        const caseSensitive = options['case-sensitive'] === void 0 ? context.parse(false, 1, BooleanType) : context.parseObjectValue(options['case-sensitive'], 1, 'case-sensitive', BooleanType);
        if (!caseSensitive)
            return null;
        const diacriticSensitive = options['diacritic-sensitive'] === void 0 ? context.parse(false, 1, BooleanType) : context.parseObjectValue(options['diacritic-sensitive'], 1, 'diacritic-sensitive', BooleanType);
        if (!diacriticSensitive)
            return null;
        let locale = null;
        if (options['locale']) {
            locale = context.parseObjectValue(options['locale'], 1, 'locale', StringType);
            if (!locale)
                return null;
        }
        return new CollatorExpression(caseSensitive, diacriticSensitive, locale);
    }
    evaluate(ctx) {
        return new Collator(this.caseSensitive.evaluate(ctx), this.diacriticSensitive.evaluate(ctx), this.locale ? this.locale.evaluate(ctx) : null);
    }
    eachChild(fn) {
        fn(this.caseSensitive);
        fn(this.diacriticSensitive);
        if (this.locale) {
            fn(this.locale);
        }
    }
    outputDefined() {
        return false;
    }
    serialize() {
        const options = {};
        options['case-sensitive'] = this.caseSensitive.serialize();
        options['diacritic-sensitive'] = this.diacriticSensitive.serialize();
        if (this.locale) {
            options['locale'] = this.locale.serialize();
        }
        return [
            'collator',
            options
        ];
    }
}

function calculateSignedArea(ring) {
    let sum = 0;
    for (let i = 0, len = ring.length, j = len - 1, p1, p2; i < len; j = i++) {
        p1 = ring[i];
        p2 = ring[j];
        sum += (p2.x - p1.x) * (p1.y + p2.y);
    }
    return sum;
}
function classifyRings(rings, maxRings) {
    const len = rings.length;
    if (len <= 1)
        return [rings];
    const polygons = [];
    let polygon, ccw;
    for (let i = 0; i < len; i++) {
        const area = calculateSignedArea(rings[i]);
        if (area === 0)
            continue;
        rings[i].area = Math.abs(area);
        if (ccw === void 0)
            ccw = area < 0;
        if (ccw === area < 0) {
            if (polygon)
                polygons.push(polygon);
            polygon = [rings[i]];
        } else {
            polygon.push(rings[i]);
        }
    }
    if (polygon)
        polygons.push(polygon);
    return polygons;
}
function updateBBox(bbox, coord) {
    bbox[0] = Math.min(bbox[0], coord[0]);
    bbox[1] = Math.min(bbox[1], coord[1]);
    bbox[2] = Math.max(bbox[2], coord[0]);
    bbox[3] = Math.max(bbox[3], coord[1]);
}
function boxWithinBox(bbox1, bbox2) {
    if (bbox1[0] <= bbox2[0])
        return false;
    if (bbox1[2] >= bbox2[2])
        return false;
    if (bbox1[1] <= bbox2[1])
        return false;
    if (bbox1[3] >= bbox2[3])
        return false;
    return true;
}
function onBoundary(p, p1, p2) {
    const x1 = p[0] - p1[0];
    const y1 = p[1] - p1[1];
    const x2 = p[0] - p2[0];
    const y2 = p[1] - p2[1];
    return x1 * y2 - x2 * y1 === 0 && x1 * x2 <= 0 && y1 * y2 <= 0;
}
function rayIntersect(p, p1, p2) {
    return p1[1] > p[1] !== p2[1] > p[1] && p[0] < (p2[0] - p1[0]) * (p[1] - p1[1]) / (p2[1] - p1[1]) + p1[0];
}
function pointWithinPolygon(point, rings, trueOnBoundary = false) {
    let inside = false;
    for (let i = 0, len = rings.length; i < len; i++) {
        const ring = rings[i];
        for (let j = 0, len2 = ring.length, k = len2 - 1; j < len2; k = j++) {
            const q1 = ring[k];
            const q2 = ring[j];
            if (onBoundary(point, q1, q2))
                return trueOnBoundary;
            if (rayIntersect(point, q1, q2))
                inside = !inside;
        }
    }
    return inside;
}
function perp(v1, v2) {
    return v1[0] * v2[1] - v1[1] * v2[0];
}
function twoSided(p1, p2, q1, q2) {
    const x1 = p1[0] - q1[0];
    const y1 = p1[1] - q1[1];
    const x2 = p2[0] - q1[0];
    const y2 = p2[1] - q1[1];
    const x3 = q2[0] - q1[0];
    const y3 = q2[1] - q1[1];
    const det1 = x1 * y3 - x3 * y1;
    const det2 = x2 * y3 - x3 * y2;
    if (det1 > 0 && det2 < 0 || det1 < 0 && det2 > 0)
        return true;
    return false;
}
function segmentIntersectSegment(a, b, c, d) {
    const vectorP = [
        b[0] - a[0],
        b[1] - a[1]
    ];
    const vectorQ = [
        d[0] - c[0],
        d[1] - c[1]
    ];
    if (perp(vectorQ, vectorP) === 0)
        return false;
    if (twoSided(a, b, c, d) && twoSided(c, d, a, b))
        return true;
    return false;
}

const EXTENT$1 = 8192;
function mercatorXfromLng(lng) {
    return (180 + lng) / 360;
}
function mercatorYfromLat(lat) {
    return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))) / 360;
}
function getTileCoordinates(p, canonical) {
    const x = mercatorXfromLng(p[0]);
    const y = mercatorYfromLat(p[1]);
    const tilesAtZoom = Math.pow(2, canonical.z);
    return [
        Math.round(x * tilesAtZoom * EXTENT$1),
        Math.round(y * tilesAtZoom * EXTENT$1)
    ];
}
function pointWithinPolygons(point, polygons) {
    for (let i = 0; i < polygons.length; i++) {
        if (pointWithinPolygon(point, polygons[i]))
            return true;
    }
    return false;
}
function lineIntersectPolygon(p1, p2, polygon) {
    for (const ring of polygon) {
        for (let j = 0, len = ring.length, k = len - 1; j < len; k = j++) {
            const q1 = ring[k];
            const q2 = ring[j];
            if (segmentIntersectSegment(p1, p2, q1, q2)) {
                return true;
            }
        }
    }
    return false;
}
function lineStringWithinPolygon(line, polygon) {
    for (let i = 0; i < line.length; ++i) {
        if (!pointWithinPolygon(line[i], polygon)) {
            return false;
        }
    }
    for (let i = 0; i < line.length - 1; ++i) {
        if (lineIntersectPolygon(line[i], line[i + 1], polygon)) {
            return false;
        }
    }
    return true;
}
function lineStringWithinPolygons(line, polygons) {
    for (let i = 0; i < polygons.length; i++) {
        if (lineStringWithinPolygon(line, polygons[i]))
            return true;
    }
    return false;
}
function getTilePolygon(coordinates, bbox, canonical) {
    const polygon = [];
    for (let i = 0; i < coordinates.length; i++) {
        const ring = [];
        for (let j = 0; j < coordinates[i].length; j++) {
            const coord = getTileCoordinates(coordinates[i][j], canonical);
            updateBBox(bbox, coord);
            ring.push(coord);
        }
        polygon.push(ring);
    }
    return polygon;
}
function getTilePolygons(coordinates, bbox, canonical) {
    const polygons = [];
    for (let i = 0; i < coordinates.length; i++) {
        const polygon = getTilePolygon(coordinates[i], bbox, canonical);
        polygons.push(polygon);
    }
    return polygons;
}
function updatePoint(p, bbox, polyBBox, worldSize) {
    if (p[0] < polyBBox[0] || p[0] > polyBBox[2]) {
        const halfWorldSize = worldSize * 0.5;
        let shift = p[0] - polyBBox[0] > halfWorldSize ? -worldSize : polyBBox[0] - p[0] > halfWorldSize ? worldSize : 0;
        if (shift === 0) {
            shift = p[0] - polyBBox[2] > halfWorldSize ? -worldSize : polyBBox[2] - p[0] > halfWorldSize ? worldSize : 0;
        }
        p[0] += shift;
    }
    updateBBox(bbox, p);
}
function resetBBox(bbox) {
    bbox[0] = bbox[1] = Infinity;
    bbox[2] = bbox[3] = -Infinity;
}
function getTilePoints(geometry, pointBBox, polyBBox, canonical) {
    const worldSize = Math.pow(2, canonical.z) * EXTENT$1;
    const shifts = [
        canonical.x * EXTENT$1,
        canonical.y * EXTENT$1
    ];
    const tilePoints = [];
    if (!geometry)
        return tilePoints;
    for (const points of geometry) {
        for (const point of points) {
            const p = [
                point.x + shifts[0],
                point.y + shifts[1]
            ];
            updatePoint(p, pointBBox, polyBBox, worldSize);
            tilePoints.push(p);
        }
    }
    return tilePoints;
}
function getTileLines(geometry, lineBBox, polyBBox, canonical) {
    const worldSize = Math.pow(2, canonical.z) * EXTENT$1;
    const shifts = [
        canonical.x * EXTENT$1,
        canonical.y * EXTENT$1
    ];
    const tileLines = [];
    if (!geometry)
        return tileLines;
    for (const line of geometry) {
        const tileLine = [];
        for (const point of line) {
            const p = [
                point.x + shifts[0],
                point.y + shifts[1]
            ];
            updateBBox(lineBBox, p);
            tileLine.push(p);
        }
        tileLines.push(tileLine);
    }
    if (lineBBox[2] - lineBBox[0] <= worldSize / 2) {
        resetBBox(lineBBox);
        for (const line of tileLines) {
            for (const p of line) {
                updatePoint(p, lineBBox, polyBBox, worldSize);
            }
        }
    }
    return tileLines;
}
function pointsWithinPolygons(ctx, polygonGeometry) {
    const pointBBox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    const polyBBox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    const canonical = ctx.canonicalID();
    if (!canonical) {
        return false;
    }
    if (polygonGeometry.type === 'Polygon') {
        const tilePolygon = getTilePolygon(polygonGeometry.coordinates, polyBBox, canonical);
        const tilePoints = getTilePoints(ctx.geometry(), pointBBox, polyBBox, canonical);
        if (!boxWithinBox(pointBBox, polyBBox))
            return false;
        for (const point of tilePoints) {
            if (!pointWithinPolygon(point, tilePolygon))
                return false;
        }
    }
    if (polygonGeometry.type === 'MultiPolygon') {
        const tilePolygons = getTilePolygons(polygonGeometry.coordinates, polyBBox, canonical);
        const tilePoints = getTilePoints(ctx.geometry(), pointBBox, polyBBox, canonical);
        if (!boxWithinBox(pointBBox, polyBBox))
            return false;
        for (const point of tilePoints) {
            if (!pointWithinPolygons(point, tilePolygons))
                return false;
        }
    }
    return true;
}
function linesWithinPolygons(ctx, polygonGeometry) {
    const lineBBox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    const polyBBox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    const canonical = ctx.canonicalID();
    if (!canonical) {
        return false;
    }
    if (polygonGeometry.type === 'Polygon') {
        const tilePolygon = getTilePolygon(polygonGeometry.coordinates, polyBBox, canonical);
        const tileLines = getTileLines(ctx.geometry(), lineBBox, polyBBox, canonical);
        if (!boxWithinBox(lineBBox, polyBBox))
            return false;
        for (const line of tileLines) {
            if (!lineStringWithinPolygon(line, tilePolygon))
                return false;
        }
    }
    if (polygonGeometry.type === 'MultiPolygon') {
        const tilePolygons = getTilePolygons(polygonGeometry.coordinates, polyBBox, canonical);
        const tileLines = getTileLines(ctx.geometry(), lineBBox, polyBBox, canonical);
        if (!boxWithinBox(lineBBox, polyBBox))
            return false;
        for (const line of tileLines) {
            if (!lineStringWithinPolygons(line, tilePolygons))
                return false;
        }
    }
    return true;
}
class Within {
    constructor(geojson, geometries) {
        this.type = BooleanType;
        this.geojson = geojson;
        this.geometries = geometries;
    }
    static parse(args, context) {
        if (args.length !== 2)
            return context.error(`'within' expression requires exactly one argument, but found ${ args.length - 1 } instead.`);
        if (isValue(args[1])) {
            const geojson = args[1];
            if (geojson.type === 'FeatureCollection') {
                for (let i = 0; i < geojson.features.length; ++i) {
                    const type = geojson.features[i].geometry.type;
                    if (type === 'Polygon' || type === 'MultiPolygon') {
                        return new Within(geojson, geojson.features[i].geometry);
                    }
                }
            } else if (geojson.type === 'Feature') {
                const type = geojson.geometry.type;
                if (type === 'Polygon' || type === 'MultiPolygon') {
                    return new Within(geojson, geojson.geometry);
                }
            } else if (geojson.type === 'Polygon' || geojson.type === 'MultiPolygon') {
                return new Within(geojson, geojson);
            }
        }
        return context.error(`'within' expression requires valid geojson object that contains polygon geometry type.`);
    }
    evaluate(ctx) {
        if (ctx.geometry() != null && ctx.canonicalID() != null) {
            if (ctx.geometryType() === 'Point') {
                return pointsWithinPolygons(ctx, this.geometries);
            } else if (ctx.geometryType() === 'LineString') {
                return linesWithinPolygons(ctx, this.geometries);
            }
        }
        return false;
    }
    eachChild() {
    }
    outputDefined() {
        return true;
    }
    serialize() {
        return [
            'within',
            this.geojson
        ];
    }
}

const factors = {
    kilometers: 1,
    miles: 1000 / 1609.344,
    nauticalmiles: 1000 / 1852,
    meters: 1000,
    metres: 1000,
    yards: 1000 / 0.9144,
    feet: 1000 / 0.3048,
    inches: 1000 / 0.0254
};
// Values that define WGS84 ellipsoid model of the Earth
const RE = 6378.137;
// equatorial radius
const FE = 1 / 298.257223563;
// flattening
const E2 = FE * (2 - FE);
const RAD = Math.PI / 180;
/**
 * A collection of very fast approximations to common geodesic measurements. Useful for performance-sensitive code that measures things on a city scale.
 */
class CheapRuler {
    /**
     * Creates a ruler object from tile coordinates (y and z).
     *
     * @param {number} y
     * @param {number} z
     * @param {keyof typeof factors} [units='kilometers']
     * @returns {CheapRuler}
     * @example
     * const ruler = cheapRuler.fromTile(1567, 12);
     * //=ruler
     */
    static fromTile(y, z, units) {
        const n = Math.PI * (1 - 2 * (y + 0.5) / Math.pow(2, z));
        const lat = Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))) / RAD;
        return new CheapRuler(lat, units);
    }
    /**
     * Multipliers for converting between units.
     *
     * @example
     * // convert 50 meters to yards
     * 50 * CheapRuler.units.yards / CheapRuler.units.meters;
     */
    static get units() {
        return factors;
    }
    /**
     * Creates a ruler instance for very fast approximations to common geodesic measurements around a certain latitude.
     *
     * @param {number} lat latitude
     * @param {keyof typeof factors} [units='kilometers']
     * @example
     * const ruler = cheapRuler(35.05, 'miles');
     * //=ruler
     */
    constructor(lat, units) {
        if (lat === undefined)
            throw new Error('No latitude given.');
        if (units && !factors[units])
            throw new Error(`Unknown unit ${ units }. Use one of: ${ Object.keys(factors).join(', ') }`);
        // Curvature formulas from https://en.wikipedia.org/wiki/Earth_radius#Meridional
        const m = RAD * RE * (units ? factors[units] : 1);
        const coslat = Math.cos(lat * RAD);
        const w2 = 1 / (1 - E2 * (1 - coslat * coslat));
        const w = Math.sqrt(w2);
        // multipliers for converting longitude and latitude degrees into distance
        this.kx = m * w * coslat;
        // based on normal radius of curvature
        this.ky = m * w * w2 * (1 - E2);    // based on meridonal radius of curvature
    }
    /**
     * Given two points of the form [longitude, latitude], returns the distance.
     *
     * @param {[number, number]} a point [longitude, latitude]
     * @param {[number, number]} b point [longitude, latitude]
     * @returns {number} distance
     * @example
     * const distance = ruler.distance([30.5, 50.5], [30.51, 50.49]);
     * //=distance
     */
    distance(a, b) {
        const dx = wrap(a[0] - b[0]) * this.kx;
        const dy = (a[1] - b[1]) * this.ky;
        return Math.sqrt(dx * dx + dy * dy);
    }
    /**
     * Returns the bearing between two points in angles.
     *
     * @param {[number, number]} a point [longitude, latitude]
     * @param {[number, number]} b point [longitude, latitude]
     * @returns {number} bearing
     * @example
     * const bearing = ruler.bearing([30.5, 50.5], [30.51, 50.49]);
     * //=bearing
     */
    bearing(a, b) {
        const dx = wrap(b[0] - a[0]) * this.kx;
        const dy = (b[1] - a[1]) * this.ky;
        return Math.atan2(dx, dy) / RAD;
    }
    /**
     * Returns a new point given distance and bearing from the starting point.
     *
     * @param {[number, number]} p point [longitude, latitude]
     * @param {number} dist distance
     * @param {number} bearing
     * @returns {[number, number]} point [longitude, latitude]
     * @example
     * const point = ruler.destination([30.5, 50.5], 0.1, 90);
     * //=point
     */
    destination(p, dist, bearing) {
        const a = bearing * RAD;
        return this.offset(p, Math.sin(a) * dist, Math.cos(a) * dist);
    }
    /**
     * Returns a new point given easting and northing offsets (in ruler units) from the starting point.
     *
     * @param {[number, number]} p point [longitude, latitude]
     * @param {number} dx easting
     * @param {number} dy northing
     * @returns {[number, number]} point [longitude, latitude]
     * @example
     * const point = ruler.offset([30.5, 50.5], 10, 10);
     * //=point
     */
    offset(p, dx, dy) {
        return [
            p[0] + dx / this.kx,
            p[1] + dy / this.ky
        ];
    }
    /**
     * Given a line (an array of points), returns the total line distance.
     *
     * @param {[number, number][]} points [longitude, latitude]
     * @returns {number} total line distance
     * @example
     * const length = ruler.lineDistance([
     *     [-67.031, 50.458], [-67.031, 50.534],
     *     [-66.929, 50.534], [-66.929, 50.458]
     * ]);
     * //=length
     */
    lineDistance(points) {
        let total = 0;
        for (let i = 0; i < points.length - 1; i++) {
            total += this.distance(points[i], points[i + 1]);
        }
        return total;
    }
    /**
     * Given a polygon (an array of rings, where each ring is an array of points), returns the area.
     *
     * @param {[number, number][][]} polygon
     * @returns {number} area value in the specified units (square kilometers by default)
     * @example
     * const area = ruler.area([[
     *     [-67.031, 50.458], [-67.031, 50.534], [-66.929, 50.534],
     *     [-66.929, 50.458], [-67.031, 50.458]
     * ]]);
     * //=area
     */
    area(polygon) {
        let sum = 0;
        for (let i = 0; i < polygon.length; i++) {
            const ring = polygon[i];
            for (let j = 0, len = ring.length, k = len - 1; j < len; k = j++) {
                sum += wrap(ring[j][0] - ring[k][0]) * (ring[j][1] + ring[k][1]) * (i ? -1 : 1);
            }
        }
        return Math.abs(sum) / 2 * this.kx * this.ky;
    }
    /**
     * Returns the point at a specified distance along the line.
     *
     * @param {[number, number][]} line
     * @param {number} dist distance
     * @returns {[number, number]} point [longitude, latitude]
     * @example
     * const point = ruler.along(line, 2.5);
     * //=point
     */
    along(line, dist) {
        let sum = 0;
        if (dist <= 0)
            return line[0];
        for (let i = 0; i < line.length - 1; i++) {
            const p0 = line[i];
            const p1 = line[i + 1];
            const d = this.distance(p0, p1);
            sum += d;
            if (sum > dist)
                return interpolate(p0, p1, (dist - (sum - d)) / d);
        }
        return line[line.length - 1];
    }
    /**
     * Returns the distance from a point `p` to a line segment `a` to `b`.
     *
     * @pointToSegmentDistance
     * @param {[number, number]} p point [longitude, latitude]
     * @param {[number, number]} a segment point 1 [longitude, latitude]
     * @param {[number, number]} b segment point 2 [longitude, latitude]
     * @returns {number} distance
     * @example
     * const distance = ruler.pointToSegmentDistance([-67.04, 50.5], [-67.05, 50.57], [-67.03, 50.54]);
     * //=distance
     */
    pointToSegmentDistance(p, a, b) {
        let [x, y] = a;
        let dx = wrap(b[0] - x) * this.kx;
        let dy = (b[1] - y) * this.ky;
        if (dx !== 0 || dy !== 0) {
            const t = (wrap(p[0] - x) * this.kx * dx + (p[1] - y) * this.ky * dy) / (dx * dx + dy * dy);
            if (t > 1) {
                x = b[0];
                y = b[1];
            } else if (t > 0) {
                x += dx / this.kx * t;
                y += dy / this.ky * t;
            }
        }
        dx = wrap(p[0] - x) * this.kx;
        dy = (p[1] - y) * this.ky;
        return Math.sqrt(dx * dx + dy * dy);
    }
    /**
     * Returns an object of the form {point, index, t}, where point is closest point on the line
     * from the given point, index is the start index of the segment with the closest point,
     * and t is a parameter from 0 to 1 that indicates where the closest point is on that segment.
     *
     * @param {[number, number][]} line
     * @param {[number, number]} p point [longitude, latitude]
     * @returns {{point: [number, number], index: number, t: number}} {point, index, t}
     * @example
     * const point = ruler.pointOnLine(line, [-67.04, 50.5]).point;
     * //=point
     */
    pointOnLine(line, p) {
        let minDist = Infinity;
        let minX = line[0][0];
        let minY = line[0][1];
        let minI = 0;
        let minT = 0;
        for (let i = 0; i < line.length - 1; i++) {
            let x = line[i][0];
            let y = line[i][1];
            let dx = wrap(line[i + 1][0] - x) * this.kx;
            let dy = (line[i + 1][1] - y) * this.ky;
            let t = 0;
            if (dx !== 0 || dy !== 0) {
                t = (wrap(p[0] - x) * this.kx * dx + (p[1] - y) * this.ky * dy) / (dx * dx + dy * dy);
                if (t > 1) {
                    x = line[i + 1][0];
                    y = line[i + 1][1];
                } else if (t > 0) {
                    x += dx / this.kx * t;
                    y += dy / this.ky * t;
                }
            }
            dx = wrap(p[0] - x) * this.kx;
            dy = (p[1] - y) * this.ky;
            const sqDist = dx * dx + dy * dy;
            if (sqDist < minDist) {
                minDist = sqDist;
                minX = x;
                minY = y;
                minI = i;
                minT = t;
            }
        }
        return {
            point: [
                minX,
                minY
            ],
            index: minI,
            t: Math.max(0, Math.min(1, minT))
        };
    }
    /**
     * Returns a part of the given line between the start and the stop points (or their closest points on the line).
     *
     * @param {[number, number]} start point [longitude, latitude]
     * @param {[number, number]} stop point [longitude, latitude]
     * @param {[number, number][]} line
     * @returns {[number, number][]} line part of a line
     * @example
     * const line2 = ruler.lineSlice([-67.04, 50.5], [-67.05, 50.56], line1);
     * //=line2
     */
    lineSlice(start, stop, line) {
        let p1 = this.pointOnLine(line, start);
        let p2 = this.pointOnLine(line, stop);
        if (p1.index > p2.index || p1.index === p2.index && p1.t > p2.t) {
            const tmp = p1;
            p1 = p2;
            p2 = tmp;
        }
        const slice = [p1.point];
        const l = p1.index + 1;
        const r = p2.index;
        if (!equals(line[l], slice[0]) && l <= r)
            slice.push(line[l]);
        for (let i = l + 1; i <= r; i++) {
            slice.push(line[i]);
        }
        if (!equals(line[r], p2.point))
            slice.push(p2.point);
        return slice;
    }
    /**
     * Returns a part of the given line between the start and the stop points indicated by distance along the line.
     *
     * @param {number} start start distance
     * @param {number} stop stop distance
     * @param {[number, number][]} line
     * @returns {[number, number][]} part of a line
     * @example
     * const line2 = ruler.lineSliceAlong(10, 20, line1);
     * //=line2
     */
    lineSliceAlong(start, stop, line) {
        let sum = 0;
        const slice = [];
        for (let i = 0; i < line.length - 1; i++) {
            const p0 = line[i];
            const p1 = line[i + 1];
            const d = this.distance(p0, p1);
            sum += d;
            if (sum > start && slice.length === 0) {
                slice.push(interpolate(p0, p1, (start - (sum - d)) / d));
            }
            if (sum >= stop) {
                slice.push(interpolate(p0, p1, (stop - (sum - d)) / d));
                return slice;
            }
            if (sum > start)
                slice.push(p1);
        }
        return slice;
    }
    /**
     * Given a point, returns a bounding box object ([w, s, e, n]) created from the given point buffered by a given distance.
     *
     * @param {[number, number]} p point [longitude, latitude]
     * @param {number} buffer
     * @returns {[number, number, number, number]} bbox ([w, s, e, n])
     * @example
     * const bbox = ruler.bufferPoint([30.5, 50.5], 0.01);
     * //=bbox
     */
    bufferPoint(p, buffer) {
        const v = buffer / this.ky;
        const h = buffer / this.kx;
        return [
            p[0] - h,
            p[1] - v,
            p[0] + h,
            p[1] + v
        ];
    }
    /**
     * Given a bounding box, returns the box buffered by a given distance.
     *
     * @param {[number, number, number, number]} bbox ([w, s, e, n])
     * @param {number} buffer
     * @returns {[number, number, number, number]} bbox ([w, s, e, n])
     * @example
     * const bbox = ruler.bufferBBox([30.5, 50.5, 31, 51], 0.2);
     * //=bbox
     */
    bufferBBox(bbox, buffer) {
        const v = buffer / this.ky;
        const h = buffer / this.kx;
        return [
            bbox[0] - h,
            bbox[1] - v,
            bbox[2] + h,
            bbox[3] + v
        ];
    }
    /**
     * Returns true if the given point is inside in the given bounding box, otherwise false.
     *
     * @param {[number, number]} p point [longitude, latitude]
     * @param {[number, number, number, number]} bbox ([w, s, e, n])
     * @returns {boolean}
     * @example
     * const inside = ruler.insideBBox([30.5, 50.5], [30, 50, 31, 51]);
     * //=inside
     */
    insideBBox(p, bbox) {
        // eslint-disable-line
        return wrap(p[0] - bbox[0]) >= 0 && wrap(p[0] - bbox[2]) <= 0 && p[1] >= bbox[1] && p[1] <= bbox[3];
    }
}
/**
 * @param {[number, number]} a
 * @param {[number, number]} b
 */
function equals(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}
/**
 * @param {[number, number]} a
 * @param {[number, number]} b
 * @param {number} t
 * @returns {[number, number]}
 */
function interpolate(a, b, t) {
    const dx = wrap(b[0] - a[0]);
    const dy = b[1] - a[1];
    return [
        a[0] + dx * t,
        a[1] + dy * t
    ];
}
/**
 * normalize a degree value into [-180..180] range
 * @param {number} deg
 */
function wrap(deg) {
    while (deg < -180)
        deg += 360;
    while (deg > 180)
        deg -= 360;
    return deg;
}

class TinyQueue {
    constructor(data = [], compare = (a, b) => a < b ? -1 : a > b ? 1 : 0) {
        this.data = data;
        this.length = this.data.length;
        this.compare = compare;
        if (this.length > 0) {
            for (let i = (this.length >> 1) - 1; i >= 0; i--)
                this._down(i);
        }
    }
    push(item) {
        this.data.push(item);
        this._up(this.length++);
    }
    pop() {
        if (this.length === 0)
            return undefined;
        const top = this.data[0];
        const bottom = this.data.pop();
        if (--this.length > 0) {
            this.data[0] = bottom;
            this._down(0);
        }
        return top;
    }
    peek() {
        return this.data[0];
    }
    _up(pos) {
        const {data, compare} = this;
        const item = data[pos];
        while (pos > 0) {
            const parent = pos - 1 >> 1;
            const current = data[parent];
            if (compare(item, current) >= 0)
                break;
            data[pos] = current;
            pos = parent;
        }
        data[pos] = item;
    }
    _down(pos) {
        const {data, compare} = this;
        const halfLength = this.length >> 1;
        const item = data[pos];
        while (pos < halfLength) {
            let bestChild = (pos << 1) + 1;
            // initially it is the left child
            const right = bestChild + 1;
            if (right < this.length && compare(data[right], data[bestChild]) < 0) {
                bestChild = right;
            }
            if (compare(data[bestChild], item) >= 0)
                break;
            data[pos] = data[bestChild];
            pos = bestChild;
        }
        data[pos] = item;
    }
}

var EXTENT = 8192;

function compareMax(a, b) {
    return b.dist - a.dist;
}
const MIN_POINT_SIZE = 100;
const MIN_LINE_POINT_SIZE = 50;
function isDefaultBBOX(bbox) {
    const defualtBBox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    if (defualtBBox.length !== bbox.length) {
        return false;
    }
    for (let i = 0; i < defualtBBox.length; i++) {
        if (defualtBBox[i] !== bbox[i]) {
            return false;
        }
    }
    return true;
}
function getRangeSize(range) {
    return range[1] - range[0] + 1;
}
function isRangeSafe(range, threshold) {
    const ret = range[1] >= range[0] && range[1] < threshold;
    if (!ret) {
        console.warn('Distance Expression: Index is out of range');
    }
    return ret;
}
function splitRange(range, isLine) {
    if (range[0] > range[1])
        return [
            null,
            null
        ];
    const size = getRangeSize(range);
    if (isLine) {
        if (size === 2) {
            return [
                range,
                null
            ];
        }
        const size1 = Math.floor(size / 2);
        const range1 = [
            range[0],
            range[0] + size1
        ];
        const range2 = [
            range[0] + size1,
            range[1]
        ];
        return [
            range1,
            range2
        ];
    } else {
        if (size === 1) {
            return [
                range,
                null
            ];
        }
        const size1 = Math.floor(size / 2) - 1;
        const range1 = [
            range[0],
            range[0] + size1
        ];
        const range2 = [
            range[0] + size1 + 1,
            range[1]
        ];
        return [
            range1,
            range2
        ];
    }
}
function getBBox(pointSets, range) {
    const bbox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    if (!isRangeSafe(range, pointSets.length))
        return bbox;
    for (let i = range[0]; i <= range[1]; ++i) {
        updateBBox(bbox, pointSets[i]);
    }
    return bbox;
}
function getPolygonBBox(polygon) {
    const bbox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    for (let i = 0; i < polygon.length; ++i) {
        for (let j = 0; j < polygon[i].length; ++j) {
            updateBBox(bbox, polygon[i][j]);
        }
    }
    return bbox;
}
function bboxToBBoxDistance(bbox1, bbox2, ruler) {
    if (isDefaultBBOX(bbox1) || isDefaultBBOX(bbox2)) {
        return NaN;
    }
    let dx = 0;
    let dy = 0;
    if (bbox1[2] < bbox2[0]) {
        dx = bbox2[0] - bbox1[2];
    }
    if (bbox1[0] > bbox2[2]) {
        dx = bbox1[0] - bbox2[2];
    }
    if (bbox1[1] > bbox2[3]) {
        dy = bbox1[1] - bbox2[3];
    }
    if (bbox1[3] < bbox2[1]) {
        dy = bbox2[1] - bbox1[3];
    }
    return ruler.distance([
        0,
        0
    ], [
        dx,
        dy
    ]);
}
function lngFromMercatorX(x) {
    return x * 360 - 180;
}
function latFromMercatorY(y) {
    const y2 = 180 - y * 360;
    return 360 / Math.PI * Math.atan(Math.exp(y2 * Math.PI / 180)) - 90;
}
function getLngLatPoint(coord, canonical) {
    const tilesAtZoom = Math.pow(2, canonical.z);
    const x = (coord.x / EXTENT + canonical.x) / tilesAtZoom;
    const y = (coord.y / EXTENT + canonical.y) / tilesAtZoom;
    return [
        lngFromMercatorX(x),
        latFromMercatorY(y)
    ];
}
function getLngLatPoints(coordinates, canonical) {
    const coords = [];
    for (let i = 0; i < coordinates.length; ++i) {
        coords.push(getLngLatPoint(coordinates[i], canonical));
    }
    return coords;
}
function pointToLineDistance(point, line, ruler) {
    const nearestPoint = ruler.pointOnLine(line, point).point;
    return ruler.distance(point, nearestPoint);
}
function pointsToLineDistance(points, rangeA, line, rangeB, ruler) {
    const subLine = line.slice(rangeB[0], rangeB[1] + 1);
    let dist = Infinity;
    for (let i = rangeA[0]; i <= rangeA[1]; ++i) {
        if ((dist = Math.min(dist, pointToLineDistance(points[i], subLine, ruler))) === 0)
            return 0;
    }
    return dist;
}
function segmentToSegmentDistance(p1, p2, q1, q2, ruler) {
    const dist1 = Math.min(// @ts-expect-error - TS2345 - Argument of type 'Position' is not assignable to parameter of type 'Point'.
    ruler.pointToSegmentDistance(p1, q1, q2), // @ts-expect-error - TS2345 - Argument of type 'Position' is not assignable to parameter of type 'Point'.
    ruler.pointToSegmentDistance(p2, q1, q2));
    const dist2 = Math.min(// @ts-expect-error - TS2345 - Argument of type 'Position' is not assignable to parameter of type 'Point'.
    ruler.pointToSegmentDistance(q1, p1, p2), // @ts-expect-error - TS2345 - Argument of type 'Position' is not assignable to parameter of type 'Point'.
    ruler.pointToSegmentDistance(q2, p1, p2));
    return Math.min(dist1, dist2);
}
function lineToLineDistance(line1, range1, line2, range2, ruler) {
    if (!isRangeSafe(range1, line1.length) || !isRangeSafe(range2, line2.length)) {
        return NaN;
    }
    let dist = Infinity;
    for (let i = range1[0]; i < range1[1]; ++i) {
        for (let j = range2[0]; j < range2[1]; ++j) {
            if (segmentIntersectSegment(line1[i], line1[i + 1], line2[j], line2[j + 1]))
                return 0;
            dist = Math.min(dist, segmentToSegmentDistance(line1[i], line1[i + 1], line2[j], line2[j + 1], ruler));
        }
    }
    return dist;
}
function pointsToPointsDistance(pointSet1, range1, pointSet2, range2, ruler) {
    if (!isRangeSafe(range1, pointSet1.length) || !isRangeSafe(range2, pointSet2.length)) {
        return NaN;
    }
    let dist = Infinity;
    for (let i = range1[0]; i <= range1[1]; ++i) {
        for (let j = range2[0]; j <= range2[1]; ++j) {
            if ((dist = Math.min(dist, ruler.distance(pointSet1[i], pointSet2[j]))) === 0)
                return dist;
        }
    }
    return dist;
}
function pointToPolygonDistance(point, polygon, ruler) {
    if (pointWithinPolygon(point, polygon, true    /*trueOnBoundary*/))
        return 0;
    let dist = Infinity;
    for (const ring of polygon) {
        const ringLen = ring.length;
        if (ringLen < 2) {
            console.warn('Distance Expression: Invalid polygon!');
            return NaN;
        }
        if (ring[0] !== ring[ringLen - 1]) {
            if ((dist = Math.min(dist, ruler.pointToSegmentDistance(point, ring[ringLen - 1], ring[0]))) === 0)
                return dist;
        }
        if ((dist = Math.min(dist, pointToLineDistance(point, ring, ruler))) === 0)
            return dist;
    }
    return dist;
}
function lineToPolygonDistance(line, range, polygon, ruler) {
    if (!isRangeSafe(range, line.length)) {
        return NaN;
    }
    for (let i = range[0]; i <= range[1]; ++i) {
        if (pointWithinPolygon(line[i], polygon, true    /*trueOnBoundary*/))
            return 0;
    }
    let dist = Infinity;
    for (let i = range[0]; i < range[1]; ++i) {
        for (const ring of polygon) {
            for (let j = 0, len = ring.length, k = len - 1; j < len; k = j++) {
                if (segmentIntersectSegment(line[i], line[i + 1], ring[k], ring[j]))
                    return 0;
                dist = Math.min(dist, segmentToSegmentDistance(line[i], line[i + 1], ring[k], ring[j], ruler));
            }
        }
    }
    return dist;
}
function polygonIntersect(polygon1, polygon2) {
    for (const ring of polygon1) {
        for (let i = 0; i <= ring.length - 1; ++i) {
            if (pointWithinPolygon(ring[i], polygon2, true    /*trueOnBoundary*/))
                return true;
        }
    }
    return false;
}
function polygonToPolygonDistance(polygon1, polygon2, ruler, currentMiniDist = Infinity) {
    const bbox1 = getPolygonBBox(polygon1);
    const bbox2 = getPolygonBBox(polygon2);
    if (currentMiniDist !== Infinity && bboxToBBoxDistance(bbox1, bbox2, ruler) >= currentMiniDist) {
        return currentMiniDist;
    }
    if (boxWithinBox(bbox1, bbox2)) {
        if (polygonIntersect(polygon1, polygon2))
            return 0;
    } else if (polygonIntersect(polygon2, polygon1)) {
        return 0;
    }
    let dist = currentMiniDist;
    for (const ring1 of polygon1) {
        for (let i = 0, len1 = ring1.length, l = len1 - 1; i < len1; l = i++) {
            for (const ring2 of polygon2) {
                for (let j = 0, len2 = ring2.length, k = len2 - 1; j < len2; k = j++) {
                    if (segmentIntersectSegment(ring1[l], ring1[i], ring2[k], ring2[j]))
                        return 0;
                    dist = Math.min(dist, segmentToSegmentDistance(ring1[l], ring1[i], ring2[k], ring2[j], ruler));
                }
            }
        }
    }
    return dist;
}
function updateQueue(distQueue, miniDist, ruler, pointSet1, pointSet2, r1, r2) {
    if (r1 === null || r2 === null)
        return;
    const tempDist = bboxToBBoxDistance(getBBox(pointSet1, r1), getBBox(pointSet2, r2), ruler);
    if (tempDist < miniDist)
        distQueue.push({
            dist: tempDist,
            range1: r1,
            range2: r2
        });
}
function pointSetToPolygonDistance(pointSets, isLine, polygon, ruler, currentMiniDist = Infinity) {
    let miniDist = Math.min(ruler.distance(pointSets[0], polygon[0][0]), currentMiniDist);
    if (miniDist === 0)
        return miniDist;
    const initialDistPair = {
        dist: 0,
        range1: [
            0,
            pointSets.length - 1
        ],
        range2: [
            0,
            0
        ]
    };
    const distQueue = new TinyQueue([initialDistPair], compareMax);
    const setThreshold = isLine ? MIN_LINE_POINT_SIZE : MIN_POINT_SIZE;
    const polyBBox = getPolygonBBox(polygon);
    while (distQueue.length) {
        const distPair = distQueue.pop();
        if (distPair.dist >= miniDist)
            continue;
        const range = distPair.range1;
        if (getRangeSize(range) <= setThreshold) {
            if (!isRangeSafe(range, pointSets.length))
                return NaN;
            if (isLine) {
                const tempDist = lineToPolygonDistance(pointSets, range, polygon, ruler);
                if ((miniDist = Math.min(miniDist, tempDist)) === 0)
                    return miniDist;
            } else {
                for (let i = range[0]; i <= range[1]; ++i) {
                    const tempDist = pointToPolygonDistance(pointSets[i], polygon, ruler);
                    if ((miniDist = Math.min(miniDist, tempDist)) === 0)
                        return miniDist;
                }
            }
        } else {
            const newRanges = splitRange(range, isLine);
            if (newRanges[0] !== null) {
                const tempDist = bboxToBBoxDistance(getBBox(pointSets, newRanges[0]), polyBBox, ruler);
                if (tempDist < miniDist)
                    distQueue.push({
                        dist: tempDist,
                        range1: newRanges[0],
                        range2: [
                            0,
                            0
                        ]
                    });
            }
            if (newRanges[1] !== null) {
                const tempDist = bboxToBBoxDistance(getBBox(pointSets, newRanges[1]), polyBBox, ruler);
                if (tempDist < miniDist)
                    distQueue.push({
                        dist: tempDist,
                        range1: newRanges[1],
                        range2: [
                            0,
                            0
                        ]
                    });
            }
        }
    }
    return miniDist;
}
function pointSetsDistance(pointSet1, isLine1, pointSet2, isLine2, ruler, currentMiniDist = Infinity) {
    let miniDist = Math.min(currentMiniDist, ruler.distance(pointSet1[0], pointSet2[0]));
    if (miniDist === 0)
        return miniDist;
    const initialDistPair = {
        dist: 0,
        range1: [
            0,
            pointSet1.length - 1
        ],
        range2: [
            0,
            pointSet2.length - 1
        ]
    };
    const distQueue = new TinyQueue([initialDistPair], compareMax);
    const set1Threshold = isLine1 ? MIN_LINE_POINT_SIZE : MIN_POINT_SIZE;
    const set2Threshold = isLine2 ? MIN_LINE_POINT_SIZE : MIN_POINT_SIZE;
    while (distQueue.length) {
        const distPair = distQueue.pop();
        if (distPair.dist >= miniDist)
            continue;
        const rangeA = distPair.range1;
        const rangeB = distPair.range2;
        if (getRangeSize(rangeA) <= set1Threshold && getRangeSize(rangeB) <= set2Threshold) {
            if (!isRangeSafe(rangeA, pointSet1.length) || !isRangeSafe(rangeB, pointSet2.length)) {
                return NaN;
            }
            if (isLine1 && isLine2) {
                miniDist = Math.min(miniDist, lineToLineDistance(pointSet1, rangeA, pointSet2, rangeB, ruler));
            } else if (!isLine1 && !isLine2) {
                miniDist = Math.min(miniDist, pointsToPointsDistance(pointSet1, rangeA, pointSet2, rangeB, ruler));
            } else if (isLine1 && !isLine2) {
                miniDist = Math.min(miniDist, pointsToLineDistance(pointSet2, rangeB, pointSet1, rangeA, ruler));
            } else if (!isLine1 && isLine2) {
                miniDist = Math.min(miniDist, pointsToLineDistance(pointSet1, rangeA, pointSet2, rangeB, ruler));
            }
            if (miniDist === 0)
                return miniDist;
        } else {
            const newRangesA = splitRange(rangeA, isLine1);
            const newRangesB = splitRange(rangeB, isLine2);
            updateQueue(distQueue, miniDist, ruler, pointSet1, pointSet2, newRangesA[0], newRangesB[0]);
            updateQueue(distQueue, miniDist, ruler, pointSet1, pointSet2, newRangesA[0], newRangesB[1]);
            updateQueue(distQueue, miniDist, ruler, pointSet1, pointSet2, newRangesA[1], newRangesB[0]);
            updateQueue(distQueue, miniDist, ruler, pointSet1, pointSet2, newRangesA[1], newRangesB[1]);
        }
    }
    return miniDist;
}
function pointSetToLinesDistance(pointSet, isLine, lines, ruler, currentMiniDist = Infinity) {
    let dist = currentMiniDist;
    const bbox1 = getBBox(pointSet, [
        0,
        pointSet.length - 1
    ]);
    for (const line of lines) {
        if (dist !== Infinity && bboxToBBoxDistance(bbox1, getBBox(line, [
                0,
                line.length - 1
            ]), ruler) >= dist)
            continue;
        dist = Math.min(dist, pointSetsDistance(pointSet, isLine, line, true, ruler, dist));
        if (dist === 0)
            return dist;
    }
    return dist;
}
function pointSetToPolygonsDistance(points, isLine, polygons, ruler, currentMiniDist = Infinity) {
    let dist = currentMiniDist;
    const bbox1 = getBBox(points, [
        0,
        points.length - 1
    ]);
    for (const polygon of polygons) {
        if (dist !== Infinity && bboxToBBoxDistance(bbox1, getPolygonBBox(polygon), ruler) >= dist)
            continue;
        const tempDist = pointSetToPolygonDistance(points, isLine, polygon, ruler, dist);
        if (isNaN(tempDist))
            return tempDist;
        if ((dist = Math.min(dist, tempDist)) === 0)
            return dist;
    }
    return dist;
}
function polygonsToPolygonsDistance(polygons1, polygons2, ruler) {
    let dist = Infinity;
    for (const polygon1 of polygons1) {
        for (const polygon2 of polygons2) {
            const tempDist = polygonToPolygonDistance(polygon1, polygon2, ruler, dist);
            if (isNaN(tempDist))
                return tempDist;
            if ((dist = Math.min(dist, tempDist)) === 0)
                return dist;
        }
    }
    return dist;
}
function pointsToGeometryDistance(originGeometry, canonical, geometry) {
    const lngLatPoints = [];
    for (const points of originGeometry) {
        for (const point of points) {
            lngLatPoints.push(getLngLatPoint(point, canonical));
        }
    }
    const ruler = new CheapRuler(lngLatPoints[0][1], 'meters');
    if (geometry.type === 'Point' || geometry.type === 'MultiPoint' || geometry.type === 'LineString') {
        return pointSetsDistance(lngLatPoints, false, geometry.type === 'Point' ? [geometry.coordinates] : geometry.coordinates, geometry.type === 'LineString', ruler);
    }
    if (geometry.type === 'MultiLineString') {
        return pointSetToLinesDistance(lngLatPoints, false, geometry.coordinates, ruler);
    }
    if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
        return pointSetToPolygonsDistance(lngLatPoints, false, geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates, ruler);
    }
    return null;
}
function linesToGeometryDistance(originGeometry, canonical, geometry) {
    const lngLatLines = [];
    for (const line of originGeometry) {
        const lngLatLine = [];
        for (const point of line) {
            lngLatLine.push(getLngLatPoint(point, canonical));
        }
        lngLatLines.push(lngLatLine);
    }
    const ruler = new CheapRuler(lngLatLines[0][0][1], 'meters');
    if (geometry.type === 'Point' || geometry.type === 'MultiPoint' || geometry.type === 'LineString') {
        return pointSetToLinesDistance(geometry.type === 'Point' ? [geometry.coordinates] : geometry.coordinates, geometry.type === 'LineString', lngLatLines, ruler);
    }
    if (geometry.type === 'MultiLineString') {
        let dist = Infinity;
        for (let i = 0; i < geometry.coordinates.length; i++) {
            const tempDist = pointSetToLinesDistance(geometry.coordinates[i], true, lngLatLines, ruler, dist);
            if (isNaN(tempDist))
                return tempDist;
            if ((dist = Math.min(dist, tempDist)) === 0)
                return dist;
        }
        return dist;
    }
    if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
        let dist = Infinity;
        for (let i = 0; i < lngLatLines.length; i++) {
            const tempDist = pointSetToPolygonsDistance(lngLatLines[i], true, geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates, ruler, dist);
            if (isNaN(tempDist))
                return tempDist;
            if ((dist = Math.min(dist, tempDist)) === 0)
                return dist;
        }
        return dist;
    }
    return null;
}
function polygonsToGeometryDistance(originGeometry, canonical, geometry) {
    const lngLatPolygons = [];
    for (const polygon of classifyRings(originGeometry)) {
        const lngLatPolygon = [];
        for (let i = 0; i < polygon.length; ++i) {
            lngLatPolygon.push(getLngLatPoints(polygon[i], canonical));
        }
        lngLatPolygons.push(lngLatPolygon);
    }
    const ruler = new CheapRuler(lngLatPolygons[0][0][0][1], 'meters');
    if (geometry.type === 'Point' || geometry.type === 'MultiPoint' || geometry.type === 'LineString') {
        return pointSetToPolygonsDistance(geometry.type === 'Point' ? [geometry.coordinates] : geometry.coordinates, geometry.type === 'LineString', lngLatPolygons, ruler);
    }
    if (geometry.type === 'MultiLineString') {
        let dist = Infinity;
        for (let i = 0; i < geometry.coordinates.length; i++) {
            const tempDist = pointSetToPolygonsDistance(geometry.coordinates[i], true, lngLatPolygons, ruler, dist);
            if (isNaN(tempDist))
                return tempDist;
            if ((dist = Math.min(dist, tempDist)) === 0)
                return dist;
        }
        return dist;
    }
    if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
        return polygonsToPolygonsDistance(geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates, lngLatPolygons, ruler);
    }
    return null;
}
function isTypeValid(type) {
    return type === 'Point' || type === 'MultiPoint' || type === 'LineString' || type === 'MultiLineString' || type === 'Polygon' || type === 'MultiPolygon';
}
class Distance {
    constructor(geojson, geometries) {
        this.type = NumberType;
        this.geojson = geojson;
        this.geometries = geometries;
    }
    static parse(args, context) {
        if (args.length !== 2) {
            return context.error(`'distance' expression requires either one argument, but found ' ${ args.length - 1 } instead.`);
        }
        if (isValue(args[1])) {
            const geojson = args[1];
            if (geojson.type === 'FeatureCollection') {
                for (let i = 0; i < geojson.features.length; ++i) {
                    if (isTypeValid(geojson.features[i].geometry.type)) {
                        return new Distance(geojson, geojson.features[i].geometry);
                    }
                }
            } else if (geojson.type === 'Feature') {
                if (isTypeValid(geojson.geometry.type)) {
                    return new Distance(geojson, geojson.geometry);
                }
            } else if (isTypeValid(geojson.type)) {
                return new Distance(geojson, geojson);
            }
        }
        return context.error('\'distance\' expression needs to be an array with format [\'Distance\', GeoJSONObj].');
    }
    evaluate(ctx) {
        const geometry = ctx.geometry();
        const canonical = ctx.canonicalID();
        if (geometry != null && canonical != null) {
            if (ctx.geometryType() === 'Point') {
                return pointsToGeometryDistance(geometry, canonical, this.geometries);
            }
            if (ctx.geometryType() === 'LineString') {
                return linesToGeometryDistance(geometry, canonical, this.geometries);
            }
            if (ctx.geometryType() === 'Polygon') {
                return polygonsToGeometryDistance(geometry, canonical, this.geometries);
            }
            console.warn('Distance Expression: currently only evaluates valid Point/LineString/Polygon geometries.');
        } else {
            console.warn('Distance Expression: requirs valid feature and canonical information.');
        }
        return null;
    }
    eachChild() {
    }
    outputDefined() {
        return true;
    }
    serialize() {
        return [
            'distance',
            this.geojson
        ];
    }
}

function coerceValue(type, value) {
    switch (type) {
    case 'string':
        return toString(value);
    case 'number':
        return +value;
    case 'boolean':
        return !!value;
    case 'color':
        return Color.parse(value);
    case 'formatted': {
            return Formatted.fromString(toString(value));
        }
    case 'resolvedImage': {
            return ResolvedImage.build(toString(value));
        }
    }
    return value;
}
function clampToAllowedNumber(value, min, max, step) {
    if (step !== void 0) {
        value = step * Math.round(value / step);
    }
    if (min !== void 0 && value < min) {
        value = min;
    }
    if (max !== void 0 && value > max) {
        value = max;
    }
    return value;
}
class Config {
    constructor(type, key, scope) {
        this.type = type;
        this.key = key;
        this.scope = scope;
    }
    static parse(args, context) {
        let type = context.expectedType;
        if (type === null || type === void 0) {
            type = ValueType;
        }
        if (args.length < 2 || args.length > 3) {
            return context.error(`Invalid number of arguments for 'config' expression.`);
        }
        const configKey = context.parse(args[1], 1);
        if (!(configKey instanceof Literal)) {
            return context.error(`Key name of 'config' expression must be a string literal.`);
        }
        if (args.length >= 3) {
            const configScope = context.parse(args[2], 2);
            if (!(configScope instanceof Literal)) {
                return context.error(`Scope of 'config' expression must be a string literal.`);
            }
            return new Config(type, toString(configKey.value), toString(configScope.value));
        }
        return new Config(type, toString(configKey.value));
    }
    evaluate(ctx) {
        const FQIDSeparator = '\x1F';
        const configKey = [
            this.key,
            this.scope,
            ctx.scope
        ].filter(Boolean).join(FQIDSeparator);
        const config = ctx.getConfig(configKey);
        if (!config)
            return null;
        const {type, value, values, minValue, maxValue, stepValue} = config;
        const defaultValue = config.default.evaluate(ctx);
        let result = defaultValue;
        if (value) {
            const originalScope = ctx.scope;
            ctx.scope = (originalScope || '').split(FQIDSeparator).slice(1).join(FQIDSeparator);
            result = value.evaluate(ctx);
            ctx.scope = originalScope;
        }
        if (type) {
            result = coerceValue(type, result);
        }
        if (result !== void 0 && (minValue !== void 0 || maxValue !== void 0 || stepValue !== void 0)) {
            if (typeof result === 'number') {
                result = clampToAllowedNumber(result, minValue, maxValue, stepValue);
            } else if (Array.isArray(result)) {
                result = result.map(item => typeof item === 'number' ? clampToAllowedNumber(item, minValue, maxValue, stepValue) : item);
            }
        }
        if (value !== void 0 && result !== void 0 && values && !values.includes(result)) {
            result = defaultValue;
            if (type) {
                result = coerceValue(type, result);
            }
        }
        if (type && type !== this.type || result !== void 0 && typeOf(result) !== this.type) {
            result = coerceValue(this.type.kind, result);
        }
        return result;
    }
    eachChild() {
    }
    outputDefined() {
        return false;
    }
    serialize() {
        const res = [
            'config',
            this.key
        ];
        if (this.scope) {
            res.concat(this.key);
        }
        return res;
    }
}

function isFeatureConstant(e) {
    if (e instanceof CompoundExpression) {
        if (e.name === 'get' && e.args.length === 1) {
            return false;
        } else if (e.name === 'feature-state') {
            return false;
        } else if (e.name === 'has' && e.args.length === 1) {
            return false;
        } else if (e.name === 'properties' || e.name === 'geometry-type' || e.name === 'id') {
            return false;
        } else if (/^filter-/.test(e.name)) {
            return false;
        }
    }
    if (e instanceof Within) {
        return false;
    }
    if (e instanceof Distance) {
        return false;
    }
    let result = true;
    e.eachChild(arg => {
        if (result && !isFeatureConstant(arg)) {
            result = false;
        }
    });
    return result;
}
function isStateConstant(e) {
    if (e instanceof CompoundExpression) {
        if (e.name === 'feature-state') {
            return false;
        }
    }
    let result = true;
    e.eachChild(arg => {
        if (result && !isStateConstant(arg)) {
            result = false;
        }
    });
    return result;
}
function getConfigDependencies(e) {
    if (e instanceof Config) {
        const singleConfig = /* @__PURE__ */
        new Set([e.key]);
        return singleConfig;
    }
    let result = /* @__PURE__ */
    new Set();
    e.eachChild(arg => {
        result = /* @__PURE__ */
        new Set([
            ...result,
            ...getConfigDependencies(arg)
        ]);
    });
    return result;
}
function isGlobalPropertyConstant(e, properties) {
    if (e instanceof CompoundExpression && properties.indexOf(e.name) >= 0) {
        return false;
    }
    let result = true;
    e.eachChild(arg => {
        if (result && !isGlobalPropertyConstant(arg, properties)) {
            result = false;
        }
    });
    return result;
}

class Var {
    constructor(name, boundExpression) {
        this.type = boundExpression.type;
        this.name = name;
        this.boundExpression = boundExpression;
    }
    static parse(args, context) {
        if (args.length !== 2 || typeof args[1] !== 'string')
            return context.error(`'var' expression requires exactly one string literal argument.`);
        const name = args[1];
        if (!context.scope.has(name)) {
            return context.error(`Unknown variable "${ name }". Make sure "${ name }" has been bound in an enclosing "let" expression before using it.`, 1);
        }
        return new Var(name, context.scope.get(name));
    }
    evaluate(ctx) {
        return this.boundExpression.evaluate(ctx);
    }
    eachChild() {
    }
    outputDefined() {
        return false;
    }
    serialize() {
        return [
            'var',
            this.name
        ];
    }
}

class ParsingContext {
    constructor(registry, path = [], expectedType, scope = new Scope(), errors = [], _scope, options) {
        this.registry = registry;
        this.path = path;
        this.key = path.map(part => {
            if (typeof part === 'string') {
                return `['${ part }']`;
            }
            return `[${ part }]`;
        }).join('');
        this.scope = scope;
        this.errors = errors;
        this.expectedType = expectedType;
        this._scope = _scope;
        this.options = options;
    }
    /**
   * @param expr the JSON expression to parse
   * @param index the optional argument index if this expression is an argument of a parent expression that's being parsed
   * @param options
   * @param options.omitTypeAnnotations set true to omit inferred type annotations.  Caller beware: with this option set, the parsed expression's type will NOT satisfy `expectedType` if it would normally be wrapped in an inferred annotation.
   * @private
   */
    parse(expr, index, expectedType, bindings, options = {}) {
        if (index || expectedType) {
            return this.concat(index, null, expectedType, bindings)._parse(expr, options);
        }
        return this._parse(expr, options);
    }
    /**
   * @param expr the JSON expression to parse
   * @param index the optional argument index if parent object being is an argument of another expression
   * @param key key of parent object being parsed
   * @param options
   * @param options.omitTypeAnnotations set true to omit inferred type annotations.  Caller beware: with this option set, the parsed expression's type will NOT satisfy `expectedType` if it would normally be wrapped in an inferred annotation.
   * @private
   */
    parseObjectValue(expr, index, key, expectedType, bindings, options = {}) {
        return this.concat(index, key, expectedType, bindings)._parse(expr, options);
    }
    _parse(expr, options) {
        if (expr === null || typeof expr === 'string' || typeof expr === 'boolean' || typeof expr === 'number') {
            expr = [
                'literal',
                expr
            ];
        }
        function annotate(parsed, type, typeAnnotation) {
            if (typeAnnotation === 'assert') {
                return new Assertion(type, [parsed]);
            } else if (typeAnnotation === 'coerce') {
                return new Coercion(type, [parsed]);
            } else {
                return parsed;
            }
        }
        if (Array.isArray(expr)) {
            if (expr.length === 0) {
                return this.error(`Expected an array with at least one element. If you wanted a literal array, use ["literal", []].`);
            }
            const Expr = typeof expr[0] === 'string' ? this.registry[expr[0]] : void 0;
            if (Expr) {
                let parsed = Expr.parse(expr, this);
                if (!parsed)
                    return null;
                if (this.expectedType) {
                    const expected = this.expectedType;
                    const actual = parsed.type;
                    if ((expected.kind === 'string' || expected.kind === 'number' || expected.kind === 'boolean' || expected.kind === 'object' || expected.kind === 'array') && actual.kind === 'value') {
                        parsed = annotate(parsed, expected, options.typeAnnotation || 'assert');
                    } else if ((expected.kind === 'color' || expected.kind === 'formatted' || expected.kind === 'resolvedImage') && (actual.kind === 'value' || actual.kind === 'string')) {
                        parsed = annotate(parsed, expected, options.typeAnnotation || 'coerce');
                    } else if (this.checkSubtype(expected, actual)) {
                        return null;
                    }
                }
                if (!(parsed instanceof Literal) && parsed.type.kind !== 'resolvedImage' && isConstant(parsed)) {
                    const ec = new EvaluationContext(this._scope, this.options);
                    try {
                        parsed = new Literal(parsed.type, parsed.evaluate(ec));
                    } catch (e) {
                        this.error(e.message);
                        return null;
                    }
                }
                return parsed;
            }
            return Coercion.parse([
                'to-array',
                expr
            ], this);
        } else if (typeof expr === 'undefined') {
            return this.error(`'undefined' value invalid. Use null instead.`);
        } else if (typeof expr === 'object') {
            return this.error(`Bare objects invalid. Use ["literal", {...}] instead.`);
        } else {
            return this.error(`Expected an array, but found ${ typeof expr } instead.`);
        }
    }
    /**
   * Returns a copy of this context suitable for parsing the subexpression at
   * index `index`, optionally appending to 'let' binding map.
   *
   * Note that `errors` property, intended for collecting errors while
   * parsing, is copied by reference rather than cloned.
   * @private
   */
    concat(index, key, expectedType, bindings) {
        let path = typeof index === 'number' ? this.path.concat(index) : this.path;
        path = typeof key === 'string' ? path.concat(key) : path;
        const scope = bindings ? this.scope.concat(bindings) : this.scope;
        return new ParsingContext(this.registry, path, expectedType || null, scope, this.errors, this._scope, this.options);
    }
    /**
   * Push a parsing (or type checking) error into the `this.errors`
   * @param error The message
   * @param keys Optionally specify the source of the error at a child
   * of the current expression at `this.key`.
   * @private
   */
    error(error, ...keys) {
        const key = `${ this.key }${ keys.map(k => `[${ k }]`).join('') }`;
        this.errors.push(new ParsingError$1(key, error));
    }
    /**
   * Returns null if `t` is a subtype of `expected`; otherwise returns an
   * error message and also pushes it to `this.errors`.
   */
    checkSubtype(expected, t) {
        const error = checkSubtype(expected, t);
        if (error)
            this.error(error);
        return error;
    }
}
var ParsingContext$1 = ParsingContext;
function isConstant(expression) {
    if (expression instanceof Var) {
        return isConstant(expression.boundExpression);
    } else if (expression instanceof CompoundExpression && expression.name === 'error') {
        return false;
    } else if (expression instanceof CollatorExpression) {
        return false;
    } else if (expression instanceof Within) {
        return false;
    } else if (expression instanceof Distance) {
        return false;
    } else if (expression instanceof Config) {
        return false;
    }
    const isTypeAnnotation = expression instanceof Coercion || expression instanceof Assertion;
    let childrenConstant = true;
    expression.eachChild(child => {
        if (isTypeAnnotation) {
            childrenConstant = childrenConstant && isConstant(child);
        } else {
            childrenConstant = childrenConstant && child instanceof Literal;
        }
    });
    if (!childrenConstant) {
        return false;
    }
    return isFeatureConstant(expression) && isGlobalPropertyConstant(expression, [
        'zoom',
        'heatmap-density',
        'line-progress',
        'raster-value',
        'sky-radial-progress',
        'accumulated',
        'is-supported-script',
        'pitch',
        'distance-from-center',
        'measure-light',
        'raster-particle-speed'
    ]);
}

function findStopLessThanOrEqualTo(stops, input) {
    const lastIndex = stops.length - 1;
    let lowerIndex = 0;
    let upperIndex = lastIndex;
    let currentIndex = 0;
    let currentValue, nextValue;
    while (lowerIndex <= upperIndex) {
        currentIndex = Math.floor((lowerIndex + upperIndex) / 2);
        currentValue = stops[currentIndex];
        nextValue = stops[currentIndex + 1];
        if (currentValue <= input) {
            if (currentIndex === lastIndex || input < nextValue) {
                return currentIndex;
            }
            lowerIndex = currentIndex + 1;
        } else if (currentValue > input) {
            upperIndex = currentIndex - 1;
        } else {
            throw new RuntimeError('Input is not a number.');
        }
    }
    return 0;
}

class Step {
    constructor(type, input, stops) {
        this.type = type;
        this.input = input;
        this.labels = [];
        this.outputs = [];
        for (const [label, expression] of stops) {
            this.labels.push(label);
            this.outputs.push(expression);
        }
    }
    static parse(args, context) {
        if (args.length - 1 < 4) {
            return context.error(`Expected at least 4 arguments, but found only ${ args.length - 1 }.`);
        }
        if ((args.length - 1) % 2 !== 0) {
            return context.error(`Expected an even number of arguments.`);
        }
        const input = context.parse(args[1], 1, NumberType);
        if (!input)
            return null;
        const stops = [];
        let outputType = null;
        if (context.expectedType && context.expectedType.kind !== 'value') {
            outputType = context.expectedType;
        }
        for (let i = 1; i < args.length; i += 2) {
            const label = i === 1 ? -Infinity : args[i];
            const value = args[i + 1];
            const labelKey = i;
            const valueKey = i + 1;
            if (typeof label !== 'number') {
                return context.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
            }
            if (stops.length && stops[stops.length - 1][0] >= label) {
                return context.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', labelKey);
            }
            const parsed = context.parse(value, valueKey, outputType);
            if (!parsed)
                return null;
            outputType = outputType || parsed.type;
            stops.push([
                label,
                parsed
            ]);
        }
        return new Step(outputType, input, stops);
    }
    evaluate(ctx) {
        const labels = this.labels;
        const outputs = this.outputs;
        if (labels.length === 1) {
            return outputs[0].evaluate(ctx);
        }
        const value = this.input.evaluate(ctx);
        if (value <= labels[0]) {
            return outputs[0].evaluate(ctx);
        }
        const stopCount = labels.length;
        if (value >= labels[stopCount - 1]) {
            return outputs[stopCount - 1].evaluate(ctx);
        }
        const index = findStopLessThanOrEqualTo(labels, value);
        return outputs[index].evaluate(ctx);
    }
    eachChild(fn) {
        fn(this.input);
        for (const expression of this.outputs) {
            fn(expression);
        }
    }
    outputDefined() {
        return this.outputs.every(out => out.outputDefined());
    }
    serialize() {
        const serialized = [
            'step',
            this.input.serialize()
        ];
        for (let i = 0; i < this.labels.length; i++) {
            if (i > 0) {
                serialized.push(this.labels[i]);
            }
            serialized.push(this.outputs[i].serialize());
        }
        return serialized;
    }
}

var unitbezier;
var hasRequiredUnitbezier;

function requireUnitbezier () {
	if (hasRequiredUnitbezier) return unitbezier;
	hasRequiredUnitbezier = 1;
	unitbezier = UnitBezier;
	function UnitBezier(p1x, p1y, p2x, p2y) {
	    // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).
	    this.cx = 3 * p1x;
	    this.bx = 3 * (p2x - p1x) - this.cx;
	    this.ax = 1 - this.cx - this.bx;
	    this.cy = 3 * p1y;
	    this.by = 3 * (p2y - p1y) - this.cy;
	    this.ay = 1 - this.cy - this.by;
	    this.p1x = p1x;
	    this.p1y = p1y;
	    this.p2x = p2x;
	    this.p2y = p2y;
	}
	UnitBezier.prototype = {
	    sampleCurveX: function (t) {
	        // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
	        return ((this.ax * t + this.bx) * t + this.cx) * t;
	    },
	    sampleCurveY: function (t) {
	        return ((this.ay * t + this.by) * t + this.cy) * t;
	    },
	    sampleCurveDerivativeX: function (t) {
	        return (3 * this.ax * t + 2 * this.bx) * t + this.cx;
	    },
	    solveCurveX: function (x, epsilon) {
	        if (epsilon === undefined)
	            epsilon = 0.000001;
	        if (x < 0)
	            return 0;
	        if (x > 1)
	            return 1;
	        var t = x;
	        // First try a few iterations of Newton's method - normally very fast.
	        for (var i = 0; i < 8; i++) {
	            var x2 = this.sampleCurveX(t) - x;
	            if (Math.abs(x2) < epsilon)
	                return t;
	            var d2 = this.sampleCurveDerivativeX(t);
	            if (Math.abs(d2) < 0.000001)
	                break;
	            t = t - x2 / d2;
	        }
	        // Fall back to the bisection method for reliability.
	        var t0 = 0;
	        var t1 = 1;
	        t = x;
	        for (i = 0; i < 20; i++) {
	            x2 = this.sampleCurveX(t);
	            if (Math.abs(x2 - x) < epsilon)
	                break;
	            if (x > x2) {
	                t0 = t;
	            } else {
	                t1 = t;
	            }
	            t = (t1 - t0) * 0.5 + t0;
	        }
	        return t;
	    },
	    solve: function (x, epsilon) {
	        return this.sampleCurveY(this.solveCurveX(x, epsilon));
	    }
	};
	return unitbezier;
}

var unitbezierExports = requireUnitbezier();
var UnitBezier = /*@__PURE__*/getDefaultExportFromCjs(unitbezierExports);

const Xn = 0.95047, Yn = 1, Zn = 1.08883, t0 = 4 / 29, t1 = 6 / 29, t2 = 3 * t1 * t1, t3 = t1 * t1 * t1, deg2rad = Math.PI / 180, rad2deg = 180 / Math.PI;
function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
}
function xyz2rgb(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
function rgb2xyz(x) {
    x /= 255;
    return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function rgbToLab(rgbColor) {
    const b = rgb2xyz(rgbColor.r), a = rgb2xyz(rgbColor.g), l = rgb2xyz(rgbColor.b), x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn), y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.072175 * l) / Yn), z = xyz2lab((0.0193339 * b + 0.119192 * a + 0.9503041 * l) / Zn);
    return {
        l: 116 * y - 16,
        a: 500 * (x - y),
        b: 200 * (y - z),
        alpha: rgbColor.a
    };
}
function labToRgb(labColor) {
    let y = (labColor.l + 16) / 116, x = isNaN(labColor.a) ? y : y + labColor.a / 500, z = isNaN(labColor.b) ? y : y - labColor.b / 200;
    y = Yn * lab2xyz(y);
    x = Xn * lab2xyz(x);
    z = Zn * lab2xyz(z);
    return new Color(xyz2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
    xyz2rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z), xyz2rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z), labColor.alpha);
}
function interpolateLab(from, to, t) {
    return {
        l: number(from.l, to.l, t),
        a: number(from.a, to.a, t),
        b: number(from.b, to.b, t),
        alpha: number(from.alpha, to.alpha, t)
    };
}
function rgbToHcl(rgbColor) {
    const {l, a, b} = rgbToLab(rgbColor);
    const h = Math.atan2(b, a) * rad2deg;
    return {
        h: h < 0 ? h + 360 : h,
        c: Math.sqrt(a * a + b * b),
        l,
        alpha: rgbColor.a
    };
}
function hclToRgb(hclColor) {
    const h = hclColor.h * deg2rad, c = hclColor.c, l = hclColor.l;
    return labToRgb({
        l,
        a: Math.cos(h) * c,
        b: Math.sin(h) * c,
        alpha: hclColor.alpha
    });
}
function interpolateHue(a, b, t) {
    const d = b - a;
    return a + t * (d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d);
}
function interpolateHcl(from, to, t) {
    return {
        h: interpolateHue(from.h, to.h, t),
        c: number(from.c, to.c, t),
        l: number(from.l, to.l, t),
        alpha: number(from.alpha, to.alpha, t)
    };
}
const lab = {
    forward: rgbToLab,
    reverse: labToRgb,
    interpolate: interpolateLab
};
const hcl = {
    forward: rgbToHcl,
    reverse: hclToRgb,
    interpolate: interpolateHcl
};

var colorSpaces = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hcl: hcl,
  lab: lab
});

class Interpolate {
    constructor(type, operator, interpolation, input, dynamicStops, stops) {
        this.type = type;
        this.operator = operator;
        this.interpolation = interpolation;
        this.input = input;
        this.dynamicStops = dynamicStops;
        this.labels = [];
        this.outputs = [];
        for (const [label, expression] of stops) {
            this.labels.push(label);
            this.outputs.push(expression);
        }
    }
    static interpolationFactor(interpolation, input, lower, upper) {
        let t = 0;
        if (interpolation.name === 'exponential') {
            t = exponentialInterpolation(input, interpolation.base, lower, upper);
        } else if (interpolation.name === 'linear') {
            t = exponentialInterpolation(input, 1, lower, upper);
        } else if (interpolation.name === 'cubic-bezier') {
            const c = interpolation.controlPoints;
            const ub = new UnitBezier(c[0], c[1], c[2], c[3]);
            t = ub.solve(exponentialInterpolation(input, 1, lower, upper));
        }
        return t;
    }
    static parse(args, context) {
        let [operator, interpolation, input, ...rest] = args;
        if (!Array.isArray(interpolation) || interpolation.length === 0) {
            return context.error(`Expected an interpolation type expression.`, 1);
        }
        if (interpolation[0] === 'linear') {
            interpolation = { name: 'linear' };
        } else if (interpolation[0] === 'exponential') {
            const base = interpolation[1];
            if (typeof base !== 'number')
                return context.error(`Exponential interpolation requires a numeric base.`, 1, 1);
            interpolation = {
                name: 'exponential',
                base
            };
        } else if (interpolation[0] === 'cubic-bezier') {
            const controlPoints = interpolation.slice(1);
            if (controlPoints.length !== 4 || controlPoints.some(t => typeof t !== 'number' || t < 0 || t > 1)) {
                return context.error('Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.', 1);
            }
            interpolation = {
                name: 'cubic-bezier',
                controlPoints
            };
        } else {
            return context.error(`Unknown interpolation type ${ String(interpolation[0]) }`, 1, 0);
        }
        if (args.length - 1 < 3) {
            return context.error(`Expected at least 3 arguments, but found only ${ args.length - 1 }.`);
        }
        if (args.length - 1 > 3 && (args.length - 1) % 2 !== 0) {
            return context.error(`Expected an even number of arguments.`);
        }
        input = context.parse(input, 2, NumberType);
        if (!input)
            return null;
        const stops = [];
        let outputType = null;
        if (operator === 'interpolate-hcl' || operator === 'interpolate-lab') {
            outputType = ColorType;
        } else if (context.expectedType && context.expectedType.kind !== 'value') {
            outputType = context.expectedType;
        }
        if (args.length - 1 === 3) {
            const dynamicStops = context.parse(rest[0], 3, ValueType);
            if (!dynamicStops)
                return null;
            return new Interpolate(outputType, operator, interpolation, input, dynamicStops, stops);
        }
        for (let i = 0; i < rest.length; i += 2) {
            const label = rest[i];
            const value = rest[i + 1];
            const labelKey = i + 3;
            const valueKey = i + 4;
            if (typeof label !== 'number') {
                return context.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
            }
            if (stops.length && stops[stops.length - 1][0] >= label) {
                return context.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', labelKey);
            }
            const parsed = context.parse(value, valueKey, outputType);
            if (!parsed)
                return null;
            outputType = outputType || parsed.type;
            stops.push([
                label,
                parsed
            ]);
        }
        if (outputType.kind !== 'number' && outputType.kind !== 'color' && !(outputType.kind === 'array' && outputType.itemType.kind === 'number' && typeof outputType.N === 'number')) {
            return context.error(`Type ${ toString$1(outputType) } is not interpolatable.`);
        }
        return new Interpolate(outputType, operator, interpolation, input, null, stops);
    }
    evaluate(ctx) {
        let labels = this.labels;
        let outputs = this.outputs;
        if (this.dynamicStops) {
            const dynamicStopsValue = this.dynamicStops.evaluate(ctx);
            if (dynamicStopsValue.length % 2 !== 0) {
                throw new RuntimeError('Expected an even number of arguments.');
            }
            labels = [];
            outputs = [];
            for (let i = 0; i < dynamicStopsValue.length; i += 2) {
                const label = dynamicStopsValue[i];
                const output = new Literal(NumberType, dynamicStopsValue[i + 1]);
                if (typeof label !== 'number') {
                    throw new RuntimeError('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.');
                }
                if (labels.length && labels[labels.length - 1] >= label) {
                    throw new RuntimeError('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.');
                }
                labels.push(label);
                outputs.push(output);
            }
            if (labels.length === 0) {
                throw new RuntimeError('Expected at least one input/output pair.');
            }
        }
        if (labels.length === 1) {
            return outputs[0].evaluate(ctx);
        }
        const value = this.input.evaluate(ctx);
        if (value <= labels[0]) {
            return outputs[0].evaluate(ctx);
        }
        const stopCount = labels.length;
        if (value >= labels[stopCount - 1]) {
            return outputs[stopCount - 1].evaluate(ctx);
        }
        const index = findStopLessThanOrEqualTo(labels, value);
        const lower = labels[index];
        const upper = labels[index + 1];
        const t = Interpolate.interpolationFactor(this.interpolation, value, lower, upper);
        const outputLower = outputs[index].evaluate(ctx);
        const outputUpper = outputs[index + 1].evaluate(ctx);
        if (this.operator === 'interpolate') {
            return interpolate$1[this.type.kind.toLowerCase()](outputLower, outputUpper, t);
        } else if (this.operator === 'interpolate-hcl') {
            return hcl.reverse(hcl.interpolate(hcl.forward(outputLower), hcl.forward(outputUpper), t));
        } else {
            return lab.reverse(lab.interpolate(lab.forward(outputLower), lab.forward(outputUpper), t));
        }
    }
    eachChild(fn) {
        fn(this.input);
        for (const expression of this.outputs) {
            fn(expression);
        }
    }
    outputDefined() {
        return this.outputs.every(out => out.outputDefined());
    }
    serialize() {
        let interpolation;
        if (this.interpolation.name === 'linear') {
            interpolation = ['linear'];
        } else if (this.interpolation.name === 'exponential') {
            if (this.interpolation.base === 1) {
                interpolation = ['linear'];
            } else {
                interpolation = [
                    'exponential',
                    this.interpolation.base
                ];
            }
        } else {
            interpolation = ['cubic-bezier'].concat(this.interpolation.controlPoints);
        }
        const serialized = [
            this.operator,
            interpolation,
            this.input.serialize()
        ];
        if (this.dynamicStops) {
            serialized.push(this.dynamicStops.serialize());
        } else {
            for (let i = 0; i < this.labels.length; i++) {
                serialized.push(this.labels[i], this.outputs[i].serialize());
            }
        }
        return serialized;
    }
}
function exponentialInterpolation(input, base, lowerValue, upperValue) {
    const difference = upperValue - lowerValue;
    const progress = input - lowerValue;
    if (difference === 0) {
        return 0;
    } else if (base === 1) {
        return progress / difference;
    } else {
        return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
    }
}

class Coalesce {
    constructor(type, args) {
        this.type = type;
        this.args = args;
    }
    static parse(args, context) {
        if (args.length < 2) {
            return context.error('Expectected at least one argument.');
        }
        let outputType = null;
        const expectedType = context.expectedType;
        if (expectedType && expectedType.kind !== 'value') {
            outputType = expectedType;
        }
        const parsedArgs = [];
        for (const arg of args.slice(1)) {
            const parsed = context.parse(arg, 1 + parsedArgs.length, outputType, void 0, { typeAnnotation: 'omit' });
            if (!parsed)
                return null;
            outputType = outputType || parsed.type;
            parsedArgs.push(parsed);
        }
        const needsAnnotation = expectedType && parsedArgs.some(arg => checkSubtype(expectedType, arg.type));
        return needsAnnotation ? new Coalesce(ValueType, parsedArgs) : new Coalesce(outputType, parsedArgs);
    }
    evaluate(ctx) {
        let result = null;
        let argCount = 0;
        let firstImage;
        for (const arg of this.args) {
            argCount++;
            result = arg.evaluate(ctx);
            if (result && result instanceof ResolvedImage && !result.available) {
                if (!firstImage) {
                    firstImage = result;
                }
                result = null;
                if (argCount === this.args.length) {
                    return firstImage;
                }
            }
            if (result !== null)
                break;
        }
        return result;
    }
    eachChild(fn) {
        this.args.forEach(fn);
    }
    outputDefined() {
        return this.args.every(arg => arg.outputDefined());
    }
    serialize() {
        const serialized = ['coalesce'];
        this.eachChild(child => {
            serialized.push(child.serialize());
        });
        return serialized;
    }
}

class Let {
    constructor(bindings, result) {
        this.type = result.type;
        this.bindings = [].concat(bindings);
        this.result = result;
    }
    evaluate(ctx) {
        return this.result.evaluate(ctx);
    }
    eachChild(fn) {
        for (const binding of this.bindings) {
            fn(binding[1]);
        }
        fn(this.result);
    }
    static parse(args, context) {
        if (args.length < 4)
            return context.error(`Expected at least 3 arguments, but found ${ args.length - 1 } instead.`);
        const bindings = [];
        for (let i = 1; i < args.length - 1; i += 2) {
            const name = args[i];
            if (typeof name !== 'string') {
                return context.error(`Expected string, but found ${ typeof name } instead.`, i);
            }
            if (/[^a-zA-Z0-9_]/.test(name)) {
                return context.error(`Variable names must contain only alphanumeric characters or '_'.`, i);
            }
            const value = context.parse(args[i + 1], i + 1);
            if (!value)
                return null;
            bindings.push([
                name,
                value
            ]);
        }
        const result = context.parse(args[args.length - 1], args.length - 1, context.expectedType, bindings);
        if (!result)
            return null;
        return new Let(bindings, result);
    }
    outputDefined() {
        return this.result.outputDefined();
    }
    serialize() {
        const serialized = ['let'];
        for (const [name, expr] of this.bindings) {
            serialized.push(name, expr.serialize());
        }
        serialized.push(this.result.serialize());
        return serialized;
    }
}

class At {
    constructor(type, index, input) {
        this.type = type;
        this.index = index;
        this.input = input;
    }
    static parse(args, context) {
        if (args.length !== 3)
            return context.error(`Expected 2 arguments, but found ${ args.length - 1 } instead.`);
        const index = context.parse(args[1], 1, NumberType);
        const input = context.parse(args[2], 2, array$1(context.expectedType || ValueType));
        if (!index || !input)
            return null;
        const t = input.type;
        return new At(t.itemType, index, input);
    }
    evaluate(ctx) {
        const index = this.index.evaluate(ctx);
        const array2 = this.input.evaluate(ctx);
        if (index < 0) {
            throw new RuntimeError(`Array index out of bounds: ${ index } < 0.`);
        }
        if (index > array2.length - 1) {
            throw new RuntimeError(`Array index out of bounds: ${ index } > ${ array2.length - 1 }.`);
        }
        if (index === Math.floor(index)) {
            return array2[index];
        }
        const lowerIndex = Math.floor(index);
        const upperIndex = Math.ceil(index);
        const lowerValue = array2[lowerIndex];
        const upperValue = array2[upperIndex];
        if (typeof lowerValue !== 'number' || typeof upperValue !== 'number') {
            throw new RuntimeError(`Cannot interpolate between non-number values at index ${ index }.`);
        }
        const fraction = index - lowerIndex;
        return lowerValue * (1 - fraction) + upperValue * fraction;
    }
    eachChild(fn) {
        fn(this.index);
        fn(this.input);
    }
    outputDefined() {
        return false;
    }
    serialize() {
        return [
            'at',
            this.index.serialize(),
            this.input.serialize()
        ];
    }
}

class In {
    constructor(needle, haystack) {
        this.type = BooleanType;
        this.needle = needle;
        this.haystack = haystack;
    }
    static parse(args, context) {
        if (args.length !== 3) {
            return context.error(`Expected 2 arguments, but found ${ args.length - 1 } instead.`);
        }
        const needle = context.parse(args[1], 1, ValueType);
        const haystack = context.parse(args[2], 2, ValueType);
        if (!needle || !haystack)
            return null;
        if (!isValidType(needle.type, [
                BooleanType,
                StringType,
                NumberType,
                NullType,
                ValueType
            ])) {
            return context.error(`Expected first argument to be of type boolean, string, number or null, but found ${ toString$1(needle.type) } instead`);
        }
        return new In(needle, haystack);
    }
    evaluate(ctx) {
        const needle = this.needle.evaluate(ctx);
        const haystack = this.haystack.evaluate(ctx);
        if (haystack == null)
            return false;
        if (!isValidNativeType(needle, [
                'boolean',
                'string',
                'number',
                'null'
            ])) {
            throw new RuntimeError(`Expected first argument to be of type boolean, string, number or null, but found ${ toString$1(typeOf(needle)) } instead.`);
        }
        if (!isValidNativeType(haystack, [
                'string',
                'array'
            ])) {
            throw new RuntimeError(`Expected second argument to be of type array or string, but found ${ toString$1(typeOf(haystack)) } instead.`);
        }
        return haystack.indexOf(needle) >= 0;
    }
    eachChild(fn) {
        fn(this.needle);
        fn(this.haystack);
    }
    outputDefined() {
        return true;
    }
    serialize() {
        return [
            'in',
            this.needle.serialize(),
            this.haystack.serialize()
        ];
    }
}

class IndexOf {
    constructor(needle, haystack, fromIndex) {
        this.type = NumberType;
        this.needle = needle;
        this.haystack = haystack;
        this.fromIndex = fromIndex;
    }
    static parse(args, context) {
        if (args.length <= 2 || args.length >= 5) {
            return context.error(`Expected 3 or 4 arguments, but found ${ args.length - 1 } instead.`);
        }
        const needle = context.parse(args[1], 1, ValueType);
        const haystack = context.parse(args[2], 2, ValueType);
        if (!needle || !haystack)
            return null;
        if (!isValidType(needle.type, [
                BooleanType,
                StringType,
                NumberType,
                NullType,
                ValueType
            ])) {
            return context.error(`Expected first argument to be of type boolean, string, number or null, but found ${ toString$1(needle.type) } instead`);
        }
        if (args.length === 4) {
            const fromIndex = context.parse(args[3], 3, NumberType);
            if (!fromIndex)
                return null;
            return new IndexOf(needle, haystack, fromIndex);
        } else {
            return new IndexOf(needle, haystack);
        }
    }
    evaluate(ctx) {
        const needle = this.needle.evaluate(ctx);
        const haystack = this.haystack.evaluate(ctx);
        if (!isValidNativeType(needle, [
                'boolean',
                'string',
                'number',
                'null'
            ])) {
            throw new RuntimeError(`Expected first argument to be of type boolean, string, number or null, but found ${ toString$1(typeOf(needle)) } instead.`);
        }
        if (!isValidNativeType(haystack, [
                'string',
                'array'
            ])) {
            throw new RuntimeError(`Expected second argument to be of type array or string, but found ${ toString$1(typeOf(haystack)) } instead.`);
        }
        if (this.fromIndex) {
            const fromIndex = this.fromIndex.evaluate(ctx);
            return haystack.indexOf(needle, fromIndex);
        }
        return haystack.indexOf(needle);
    }
    eachChild(fn) {
        fn(this.needle);
        fn(this.haystack);
        if (this.fromIndex) {
            fn(this.fromIndex);
        }
    }
    outputDefined() {
        return false;
    }
    serialize() {
        if (this.fromIndex != null && this.fromIndex !== void 0) {
            const fromIndex = this.fromIndex.serialize();
            return [
                'index-of',
                this.needle.serialize(),
                this.haystack.serialize(),
                fromIndex
            ];
        }
        return [
            'index-of',
            this.needle.serialize(),
            this.haystack.serialize()
        ];
    }
}

class Match {
    constructor(inputType, outputType, input, cases, outputs, otherwise) {
        this.inputType = inputType;
        this.type = outputType;
        this.input = input;
        this.cases = cases;
        this.outputs = outputs;
        this.otherwise = otherwise;
    }
    static parse(args, context) {
        if (args.length < 5)
            return context.error(`Expected at least 4 arguments, but found only ${ args.length - 1 }.`);
        if (args.length % 2 !== 1)
            return context.error(`Expected an even number of arguments.`);
        let inputType;
        let outputType;
        if (context.expectedType && context.expectedType.kind !== 'value') {
            outputType = context.expectedType;
        }
        const cases = {};
        const outputs = [];
        for (let i = 2; i < args.length - 1; i += 2) {
            let labels = args[i];
            const value = args[i + 1];
            if (!Array.isArray(labels)) {
                labels = [labels];
            }
            const labelContext = context.concat(i);
            if (labels.length === 0) {
                return labelContext.error('Expected at least one branch label.');
            }
            for (const label of labels) {
                if (typeof label !== 'number' && typeof label !== 'string') {
                    return labelContext.error(`Branch labels must be numbers or strings.`);
                } else if (typeof label === 'number' && Math.abs(label) > Number.MAX_SAFE_INTEGER) {
                    return labelContext.error(`Branch labels must be integers no larger than ${ Number.MAX_SAFE_INTEGER }.`);
                } else if (typeof label === 'number' && Math.floor(label) !== label) {
                    return labelContext.error(`Numeric branch labels must be integer values.`);
                } else if (!inputType) {
                    inputType = typeOf(label);
                } else if (labelContext.checkSubtype(inputType, typeOf(label))) {
                    return null;
                }
                if (typeof cases[String(label)] !== 'undefined') {
                    return labelContext.error('Branch labels must be unique.');
                }
                cases[String(label)] = outputs.length;
            }
            const result = context.parse(value, i, outputType);
            if (!result)
                return null;
            outputType = outputType || result.type;
            outputs.push(result);
        }
        const input = context.parse(args[1], 1, ValueType);
        if (!input)
            return null;
        const otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
        if (!otherwise)
            return null;
        if (input.type.kind !== 'value' && context.concat(1).checkSubtype(inputType, input.type)) {
            return null;
        }
        return new Match(inputType, outputType, input, cases, outputs, otherwise);
    }
    evaluate(ctx) {
        const input = this.input.evaluate(ctx);
        const output = typeOf(input) === this.inputType && this.outputs[this.cases[input]] || this.otherwise;
        return output.evaluate(ctx);
    }
    eachChild(fn) {
        fn(this.input);
        this.outputs.forEach(fn);
        fn(this.otherwise);
    }
    outputDefined() {
        return this.outputs.every(out => out.outputDefined()) && this.otherwise.outputDefined();
    }
    serialize() {
        const serialized = [
            'match',
            this.input.serialize()
        ];
        const sortedLabels = Object.keys(this.cases).sort();
        const groupedByOutput = [];
        const outputLookup = {};
        for (const label of sortedLabels) {
            const outputIndex = outputLookup[this.cases[label]];
            if (outputIndex === void 0) {
                outputLookup[this.cases[label]] = groupedByOutput.length;
                groupedByOutput.push([
                    this.cases[label],
                    [label]
                ]);
            } else {
                groupedByOutput[outputIndex][1].push(label);
            }
        }
        const coerceLabel = label => this.inputType.kind === 'number' ? Number(label) : label;
        for (const [outputIndex, labels] of groupedByOutput) {
            if (labels.length === 1) {
                serialized.push(coerceLabel(labels[0]));
            } else {
                serialized.push(labels.map(coerceLabel));
            }
            serialized.push(this.outputs[outputIndex].serialize());
        }
        serialized.push(this.otherwise.serialize());
        return serialized;
    }
}

class Case {
    constructor(type, branches, otherwise) {
        this.type = type;
        this.branches = branches;
        this.otherwise = otherwise;
    }
    static parse(args, context) {
        if (args.length < 4)
            return context.error(`Expected at least 3 arguments, but found only ${ args.length - 1 }.`);
        if (args.length % 2 !== 0)
            return context.error(`Expected an odd number of arguments.`);
        let outputType;
        if (context.expectedType && context.expectedType.kind !== 'value') {
            outputType = context.expectedType;
        }
        const branches = [];
        for (let i = 1; i < args.length - 1; i += 2) {
            const test = context.parse(args[i], i, BooleanType);
            if (!test)
                return null;
            const result = context.parse(args[i + 1], i + 1, outputType);
            if (!result)
                return null;
            branches.push([
                test,
                result
            ]);
            outputType = outputType || result.type;
        }
        const otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
        if (!otherwise)
            return null;
        return new Case(outputType, branches, otherwise);
    }
    evaluate(ctx) {
        for (const [test, expression] of this.branches) {
            if (test.evaluate(ctx)) {
                return expression.evaluate(ctx);
            }
        }
        return this.otherwise.evaluate(ctx);
    }
    eachChild(fn) {
        for (const [test, expression] of this.branches) {
            fn(test);
            fn(expression);
        }
        fn(this.otherwise);
    }
    outputDefined() {
        return this.branches.every(([_, out]) => out.outputDefined()) && this.otherwise.outputDefined();
    }
    serialize() {
        const serialized = ['case'];
        this.eachChild(child => {
            serialized.push(child.serialize());
        });
        return serialized;
    }
}

class Slice {
    constructor(type, input, beginIndex, endIndex) {
        this.type = type;
        this.input = input;
        this.beginIndex = beginIndex;
        this.endIndex = endIndex;
    }
    static parse(args, context) {
        if (args.length <= 2 || args.length >= 5) {
            return context.error(`Expected 3 or 4 arguments, but found ${ args.length - 1 } instead.`);
        }
        const input = context.parse(args[1], 1, ValueType);
        const beginIndex = context.parse(args[2], 2, NumberType);
        if (!input || !beginIndex)
            return null;
        if (!isValidType(input.type, [
                array$1(ValueType),
                StringType,
                ValueType
            ])) {
            return context.error(`Expected first argument to be of type array or string, but found ${ toString$1(input.type) } instead`);
        }
        if (args.length === 4) {
            const endIndex = context.parse(args[3], 3, NumberType);
            if (!endIndex)
                return null;
            return new Slice(input.type, input, beginIndex, endIndex);
        } else {
            return new Slice(input.type, input, beginIndex);
        }
    }
    evaluate(ctx) {
        const input = this.input.evaluate(ctx);
        const beginIndex = this.beginIndex.evaluate(ctx);
        if (!isValidNativeType(input, [
                'string',
                'array'
            ])) {
            throw new RuntimeError(`Expected first argument to be of type array or string, but found ${ toString$1(typeOf(input)) } instead.`);
        }
        if (this.endIndex) {
            const endIndex = this.endIndex.evaluate(ctx);
            return input.slice(beginIndex, endIndex);
        }
        return input.slice(beginIndex);
    }
    eachChild(fn) {
        fn(this.input);
        fn(this.beginIndex);
        if (this.endIndex) {
            fn(this.endIndex);
        }
    }
    outputDefined() {
        return false;
    }
    serialize() {
        if (this.endIndex != null && this.endIndex !== void 0) {
            const endIndex = this.endIndex.serialize();
            return [
                'slice',
                this.input.serialize(),
                this.beginIndex.serialize(),
                endIndex
            ];
        }
        return [
            'slice',
            this.input.serialize(),
            this.beginIndex.serialize()
        ];
    }
}

function isComparableType(op, type) {
    if (op === '==' || op === '!=') {
        return type.kind === 'boolean' || type.kind === 'string' || type.kind === 'number' || type.kind === 'null' || type.kind === 'value';
    } else {
        return type.kind === 'string' || type.kind === 'number' || type.kind === 'value';
    }
}
function eq(ctx, a, b) {
    return a === b;
}
function neq(ctx, a, b) {
    return a !== b;
}
function lt(ctx, a, b) {
    return a < b;
}
function gt(ctx, a, b) {
    return a > b;
}
function lteq(ctx, a, b) {
    return a <= b;
}
function gteq(ctx, a, b) {
    return a >= b;
}
function eqCollate(ctx, a, b, c) {
    return c.compare(a, b) === 0;
}
function neqCollate(ctx, a, b, c) {
    return !eqCollate(ctx, a, b, c);
}
function ltCollate(ctx, a, b, c) {
    return c.compare(a, b) < 0;
}
function gtCollate(ctx, a, b, c) {
    return c.compare(a, b) > 0;
}
function lteqCollate(ctx, a, b, c) {
    return c.compare(a, b) <= 0;
}
function gteqCollate(ctx, a, b, c) {
    return c.compare(a, b) >= 0;
}
function makeComparison(op, compareBasic, compareWithCollator) {
    const isOrderComparison = op !== '==' && op !== '!=';
    return class Comparison {
        constructor(lhs, rhs, collator) {
            this.type = BooleanType;
            this.lhs = lhs;
            this.rhs = rhs;
            this.collator = collator;
            this.hasUntypedArgument = lhs.type.kind === 'value' || rhs.type.kind === 'value';
        }
        static parse(args, context) {
            if (args.length !== 3 && args.length !== 4)
                return context.error(`Expected two or three arguments.`);
            const op2 = args[0];
            let lhs = context.parse(args[1], 1, ValueType);
            if (!lhs)
                return null;
            if (!isComparableType(op2, lhs.type)) {
                return context.concat(1).error(`"${ op2 }" comparisons are not supported for type '${ toString$1(lhs.type) }'.`);
            }
            let rhs = context.parse(args[2], 2, ValueType);
            if (!rhs)
                return null;
            if (!isComparableType(op2, rhs.type)) {
                return context.concat(2).error(`"${ op2 }" comparisons are not supported for type '${ toString$1(rhs.type) }'.`);
            }
            if (lhs.type.kind !== rhs.type.kind && lhs.type.kind !== 'value' && rhs.type.kind !== 'value') {
                return context.error(`Cannot compare types '${ toString$1(lhs.type) }' and '${ toString$1(rhs.type) }'.`);
            }
            if (isOrderComparison) {
                if (lhs.type.kind === 'value' && rhs.type.kind !== 'value') {
                    lhs = new Assertion(rhs.type, [lhs]);
                } else if (lhs.type.kind !== 'value' && rhs.type.kind === 'value') {
                    rhs = new Assertion(lhs.type, [rhs]);
                }
            }
            let collator = null;
            if (args.length === 4) {
                if (lhs.type.kind !== 'string' && rhs.type.kind !== 'string' && lhs.type.kind !== 'value' && rhs.type.kind !== 'value') {
                    return context.error(`Cannot use collator to compare non-string types.`);
                }
                collator = context.parse(args[3], 3, CollatorType);
                if (!collator)
                    return null;
            }
            return new Comparison(lhs, rhs, collator);
        }
        evaluate(ctx) {
            const lhs = this.lhs.evaluate(ctx);
            const rhs = this.rhs.evaluate(ctx);
            if (isOrderComparison && this.hasUntypedArgument) {
                const lt2 = typeOf(lhs);
                const rt = typeOf(rhs);
                if (lt2.kind !== rt.kind || !(lt2.kind === 'string' || lt2.kind === 'number')) {
                    throw new RuntimeError(`Expected arguments for "${ op }" to be (string, string) or (number, number), but found (${ lt2.kind }, ${ rt.kind }) instead.`);
                }
            }
            if (this.collator && !isOrderComparison && this.hasUntypedArgument) {
                const lt2 = typeOf(lhs);
                const rt = typeOf(rhs);
                if (lt2.kind !== 'string' || rt.kind !== 'string') {
                    return compareBasic(ctx, lhs, rhs);
                }
            }
            return this.collator ? compareWithCollator(ctx, lhs, rhs, this.collator.evaluate(ctx)) : compareBasic(ctx, lhs, rhs);
        }
        eachChild(fn) {
            fn(this.lhs);
            fn(this.rhs);
            if (this.collator) {
                fn(this.collator);
            }
        }
        outputDefined() {
            return true;
        }
        serialize() {
            const serialized = [op];
            this.eachChild(child => {
                serialized.push(child.serialize());
            });
            return serialized;
        }
    };
}
const Equals = makeComparison('==', eq, eqCollate);
const NotEquals = makeComparison('!=', neq, neqCollate);
const LessThan = makeComparison('<', lt, ltCollate);
const GreaterThan = makeComparison('>', gt, gtCollate);
const LessThanOrEqual = makeComparison('<=', lteq, lteqCollate);
const GreaterThanOrEqual = makeComparison('>=', gteq, gteqCollate);

class NumberFormat {
    // Default 3
    constructor(number, locale, currency, unit, minFractionDigits, maxFractionDigits) {
        this.type = StringType;
        this.number = number;
        this.locale = locale;
        this.currency = currency;
        this.unit = unit;
        this.minFractionDigits = minFractionDigits;
        this.maxFractionDigits = maxFractionDigits;
    }
    static parse(args, context) {
        if (args.length !== 3)
            return context.error(`Expected two arguments.`);
        const number = context.parse(args[1], 1, NumberType);
        if (!number)
            return null;
        const options = args[2];
        if (typeof options !== 'object' || Array.isArray(options))
            return context.error(`NumberFormat options argument must be an object.`);
        let locale = null;
        if (options['locale']) {
            locale = context.parseObjectValue(options['locale'], 2, 'locale', StringType);
            if (!locale)
                return null;
        }
        let currency = null;
        if (options['currency']) {
            currency = context.parseObjectValue(options['currency'], 2, 'currency', StringType);
            if (!currency)
                return null;
        }
        let unit = null;
        if (options['unit']) {
            unit = context.parseObjectValue(options['unit'], 2, 'unit', StringType);
            if (!unit)
                return null;
        }
        let minFractionDigits = null;
        if (options['min-fraction-digits']) {
            minFractionDigits = context.parseObjectValue(options['min-fraction-digits'], 2, 'min-fraction-digits', NumberType);
            if (!minFractionDigits)
                return null;
        }
        let maxFractionDigits = null;
        if (options['max-fraction-digits']) {
            maxFractionDigits = context.parseObjectValue(options['max-fraction-digits'], 2, 'max-fraction-digits', NumberType);
            if (!maxFractionDigits)
                return null;
        }
        return new NumberFormat(number, locale, currency, unit, minFractionDigits, maxFractionDigits);
    }
    evaluate(ctx) {
        return new Intl.NumberFormat(this.locale ? this.locale.evaluate(ctx) : [], {
            style: this.currency && 'currency' || this.unit && 'unit' || 'decimal',
            currency: this.currency ? this.currency.evaluate(ctx) : void 0,
            unit: this.unit ? this.unit.evaluate(ctx) : void 0,
            minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(ctx) : void 0,
            maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(ctx) : void 0
        }).format(this.number.evaluate(ctx));
    }
    eachChild(fn) {
        fn(this.number);
        if (this.locale) {
            fn(this.locale);
        }
        if (this.currency) {
            fn(this.currency);
        }
        if (this.unit) {
            fn(this.unit);
        }
        if (this.minFractionDigits) {
            fn(this.minFractionDigits);
        }
        if (this.maxFractionDigits) {
            fn(this.maxFractionDigits);
        }
    }
    outputDefined() {
        return false;
    }
    serialize() {
        const options = {};
        if (this.locale) {
            options['locale'] = this.locale.serialize();
        }
        if (this.currency) {
            options['currency'] = this.currency.serialize();
        }
        if (this.unit) {
            options['unit'] = this.unit.serialize();
        }
        if (this.minFractionDigits) {
            options['min-fraction-digits'] = this.minFractionDigits.serialize();
        }
        if (this.maxFractionDigits) {
            options['max-fraction-digits'] = this.maxFractionDigits.serialize();
        }
        return [
            'number-format',
            this.number.serialize(),
            options
        ];
    }
}

class Length {
    constructor(input) {
        this.type = NumberType;
        this.input = input;
    }
    static parse(args, context) {
        if (args.length !== 2)
            return context.error(`Expected 1 argument, but found ${ args.length - 1 } instead.`);
        const input = context.parse(args[1], 1);
        if (!input)
            return null;
        if (input.type.kind !== 'array' && input.type.kind !== 'string' && input.type.kind !== 'value')
            return context.error(`Expected argument of type string or array, but found ${ toString$1(input.type) } instead.`);
        return new Length(input);
    }
    evaluate(ctx) {
        const input = this.input.evaluate(ctx);
        if (typeof input === 'string') {
            return input.length;
        } else if (Array.isArray(input)) {
            return input.length;
        } else {
            throw new RuntimeError(`Expected value to be of type string or array, but found ${ toString$1(typeOf(input)) } instead.`);
        }
    }
    eachChild(fn) {
        fn(this.input);
    }
    outputDefined() {
        return false;
    }
    serialize() {
        const serialized = ['length'];
        this.eachChild(child => {
            serialized.push(child.serialize());
        });
        return serialized;
    }
}

function mulberry32(a) {
    return function () {
        a |= 0;
        a = a + 1831565813 | 0;
        let t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

const expressions = {
    // special forms
    '==': Equals,
    '!=': NotEquals,
    '>': GreaterThan,
    '<': LessThan,
    '>=': GreaterThanOrEqual,
    '<=': LessThanOrEqual,
    'array': Assertion,
    'at': At,
    'boolean': Assertion,
    'case': Case,
    'coalesce': Coalesce,
    'collator': CollatorExpression,
    'format': FormatExpression,
    'image': ImageExpression,
    'in': In,
    'index-of': IndexOf,
    'interpolate': Interpolate,
    'interpolate-hcl': Interpolate,
    'interpolate-lab': Interpolate,
    'length': Length,
    'let': Let,
    'literal': Literal,
    'match': Match,
    'number': Assertion,
    'number-format': NumberFormat,
    'object': Assertion,
    'slice': Slice,
    'step': Step,
    'string': Assertion,
    'to-boolean': Coercion,
    'to-color': Coercion,
    'to-number': Coercion,
    'to-string': Coercion,
    'var': Var,
    'within': Within,
    'distance': Distance,
    'config': Config
};
function rgba(ctx, [r, g, b, a]) {
    r = r.evaluate(ctx);
    g = g.evaluate(ctx);
    b = b.evaluate(ctx);
    const alpha = a ? a.evaluate(ctx) : 1;
    const error = validateRGBA(r, g, b, alpha);
    if (error)
        throw new RuntimeError(error);
    return new Color(r / 255 * alpha, g / 255 * alpha, b / 255 * alpha, alpha);
}
function hsla(ctx, [h, s, l, a]) {
    h = h.evaluate(ctx);
    s = s.evaluate(ctx);
    l = l.evaluate(ctx);
    const alpha = a ? a.evaluate(ctx) : 1;
    const error = validateHSLA(h, s, l, alpha);
    if (error)
        throw new RuntimeError(error);
    const colorFunction = `hsla(${ h }, ${ s }%, ${ l }%, ${ alpha })`;
    const color = Color.parse(colorFunction);
    if (!color)
        throw new RuntimeError(`Failed to parse HSLA color: ${ colorFunction }`);
    return color;
}
function has(key, obj) {
    return key in obj;
}
function get(key, obj) {
    const v = obj[key];
    return typeof v === 'undefined' ? null : v;
}
function binarySearch(v, a, i, j) {
    while (i <= j) {
        const m = i + j >> 1;
        if (a[m] === v)
            return true;
        if (a[m] > v)
            j = m - 1;
        else
            i = m + 1;
    }
    return false;
}
function varargs(type) {
    return { type };
}
function hashString(str) {
    let hash = 0;
    if (str.length === 0) {
        return hash;
    }
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash;
}
CompoundExpression.register(expressions, {
    'error': [
        ErrorType,
        [StringType],
        (ctx, [v]) => {
            throw new RuntimeError(v.evaluate(ctx));
        }
    ],
    'typeof': [
        StringType,
        [ValueType],
        (ctx, [v]) => toString$1(typeOf(v.evaluate(ctx)))
    ],
    'to-rgba': [
        array$1(NumberType, 4),
        [ColorType],
        (ctx, [v]) => {
            return v.evaluate(ctx).toRenderColor(null).toArray();
        }
    ],
    'to-hsla': [
        array$1(NumberType, 4),
        [ColorType],
        (ctx, [v]) => {
            return v.evaluate(ctx).toRenderColor(null).toHslaArray();
        }
    ],
    'rgb': [
        ColorType,
        [
            NumberType,
            NumberType,
            NumberType
        ],
        rgba
    ],
    'rgba': [
        ColorType,
        [
            NumberType,
            NumberType,
            NumberType,
            NumberType
        ],
        rgba
    ],
    'hsl': [
        ColorType,
        [
            NumberType,
            NumberType,
            NumberType
        ],
        hsla
    ],
    'hsla': [
        ColorType,
        [
            NumberType,
            NumberType,
            NumberType,
            NumberType
        ],
        hsla
    ],
    'has': {
        type: BooleanType,
        overloads: [
            [
                [StringType],
                (ctx, [key]) => has(key.evaluate(ctx), ctx.properties())
            ],
            [
                [
                    StringType,
                    ObjectType
                ],
                (ctx, [key, obj]) => has(key.evaluate(ctx), obj.evaluate(ctx))
            ]
        ]
    },
    'get': {
        type: ValueType,
        overloads: [
            [
                [StringType],
                (ctx, [key]) => get(key.evaluate(ctx), ctx.properties())
            ],
            [
                [
                    StringType,
                    ObjectType
                ],
                (ctx, [key, obj]) => get(key.evaluate(ctx), obj.evaluate(ctx))
            ]
        ]
    },
    'feature-state': [
        ValueType,
        [StringType],
        (ctx, [key]) => get(key.evaluate(ctx), ctx.featureState || {})
    ],
    'properties': [
        ObjectType,
        [],
        ctx => ctx.properties()
    ],
    'geometry-type': [
        StringType,
        [],
        ctx => ctx.geometryType()
    ],
    'id': [
        ValueType,
        [],
        ctx => ctx.id()
    ],
    'zoom': [
        NumberType,
        [],
        ctx => ctx.globals.zoom
    ],
    'pitch': [
        NumberType,
        [],
        ctx => ctx.globals.pitch || 0
    ],
    'distance-from-center': [
        NumberType,
        [],
        ctx => ctx.distanceFromCenter()
    ],
    'measure-light': [
        NumberType,
        [StringType],
        (ctx, [s]) => ctx.measureLight(s.evaluate(ctx))
    ],
    'heatmap-density': [
        NumberType,
        [],
        ctx => ctx.globals.heatmapDensity || 0
    ],
    'line-progress': [
        NumberType,
        [],
        ctx => ctx.globals.lineProgress || 0
    ],
    'raster-value': [
        NumberType,
        [],
        ctx => ctx.globals.rasterValue || 0
    ],
    'raster-particle-speed': [
        NumberType,
        [],
        ctx => ctx.globals.rasterParticleSpeed || 0
    ],
    'sky-radial-progress': [
        NumberType,
        [],
        ctx => ctx.globals.skyRadialProgress || 0
    ],
    'accumulated': [
        ValueType,
        [],
        ctx => ctx.globals.accumulated === void 0 ? null : ctx.globals.accumulated
    ],
    '+': [
        NumberType,
        varargs(NumberType),
        (ctx, args) => {
            let result = 0;
            for (const arg of args) {
                result += arg.evaluate(ctx);
            }
            return result;
        }
    ],
    '*': [
        NumberType,
        varargs(NumberType),
        (ctx, args) => {
            let result = 1;
            for (const arg of args) {
                result *= arg.evaluate(ctx);
            }
            return result;
        }
    ],
    '-': {
        type: NumberType,
        overloads: [
            [
                [
                    NumberType,
                    NumberType
                ],
                (ctx, [a, b]) => a.evaluate(ctx) - b.evaluate(ctx)
            ],
            [
                [NumberType],
                (ctx, [a]) => -a.evaluate(ctx)
            ]
        ]
    },
    '/': [
        NumberType,
        [
            NumberType,
            NumberType
        ],
        (ctx, [a, b]) => a.evaluate(ctx) / b.evaluate(ctx)
    ],
    '%': [
        NumberType,
        [
            NumberType,
            NumberType
        ],
        (ctx, [a, b]) => a.evaluate(ctx) % b.evaluate(ctx)
    ],
    'ln2': [
        NumberType,
        [],
        () => Math.LN2
    ],
    'pi': [
        NumberType,
        [],
        () => Math.PI
    ],
    'e': [
        NumberType,
        [],
        () => Math.E
    ],
    '^': [
        NumberType,
        [
            NumberType,
            NumberType
        ],
        (ctx, [b, e]) => Math.pow(b.evaluate(ctx), e.evaluate(ctx))
    ],
    'sqrt': [
        NumberType,
        [NumberType],
        (ctx, [x]) => Math.sqrt(x.evaluate(ctx))
    ],
    'log10': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.log(n.evaluate(ctx)) / Math.LN10
    ],
    'ln': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.log(n.evaluate(ctx))
    ],
    'log2': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.log(n.evaluate(ctx)) / Math.LN2
    ],
    'sin': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.sin(n.evaluate(ctx))
    ],
    'cos': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.cos(n.evaluate(ctx))
    ],
    'tan': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.tan(n.evaluate(ctx))
    ],
    'asin': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.asin(n.evaluate(ctx))
    ],
    'acos': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.acos(n.evaluate(ctx))
    ],
    'atan': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.atan(n.evaluate(ctx))
    ],
    'min': [
        NumberType,
        varargs(NumberType),
        (ctx, args) => Math.min(...args.map(arg => arg.evaluate(ctx)))
    ],
    'max': [
        NumberType,
        varargs(NumberType),
        (ctx, args) => Math.max(...args.map(arg => arg.evaluate(ctx)))
    ],
    'abs': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.abs(n.evaluate(ctx))
    ],
    'round': [
        NumberType,
        [NumberType],
        (ctx, [n]) => {
            const v = n.evaluate(ctx);
            return v < 0 ? -Math.round(-v) : Math.round(v);
        }
    ],
    'floor': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.floor(n.evaluate(ctx))
    ],
    'ceil': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.ceil(n.evaluate(ctx))
    ],
    'filter-==': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        (ctx, [k, v]) => ctx.properties()[k.value] === v.value
    ],
    'filter-id-==': [
        BooleanType,
        [ValueType],
        (ctx, [v]) => ctx.id() === v.value
    ],
    'filter-type-==': [
        BooleanType,
        [StringType],
        (ctx, [v]) => ctx.geometryType() === v.value
    ],
    'filter-<': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        (ctx, [k, v]) => {
            const a = ctx.properties()[k.value];
            const b = v.value;
            return typeof a === typeof b && a < b;
        }
    ],
    'filter-id-<': [
        BooleanType,
        [ValueType],
        (ctx, [v]) => {
            const a = ctx.id();
            const b = v.value;
            return typeof a === typeof b && a < b;
        }
    ],
    'filter->': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        (ctx, [k, v]) => {
            const a = ctx.properties()[k.value];
            const b = v.value;
            return typeof a === typeof b && a > b;
        }
    ],
    'filter-id->': [
        BooleanType,
        [ValueType],
        (ctx, [v]) => {
            const a = ctx.id();
            const b = v.value;
            return typeof a === typeof b && a > b;
        }
    ],
    'filter-<=': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        (ctx, [k, v]) => {
            const a = ctx.properties()[k.value];
            const b = v.value;
            return typeof a === typeof b && a <= b;
        }
    ],
    'filter-id-<=': [
        BooleanType,
        [ValueType],
        (ctx, [v]) => {
            const a = ctx.id();
            const b = v.value;
            return typeof a === typeof b && a <= b;
        }
    ],
    'filter->=': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        (ctx, [k, v]) => {
            const a = ctx.properties()[k.value];
            const b = v.value;
            return typeof a === typeof b && a >= b;
        }
    ],
    'filter-id->=': [
        BooleanType,
        [ValueType],
        (ctx, [v]) => {
            const a = ctx.id();
            const b = v.value;
            return typeof a === typeof b && a >= b;
        }
    ],
    'filter-has': [
        BooleanType,
        [ValueType],
        (ctx, [k]) => k.value in ctx.properties()
    ],
    'filter-has-id': [
        BooleanType,
        [],
        ctx => ctx.id() !== null && ctx.id() !== void 0
    ],
    'filter-type-in': [
        BooleanType,
        [array$1(StringType)],
        (ctx, [v]) => v.value.indexOf(ctx.geometryType()) >= 0
    ],
    'filter-id-in': [
        BooleanType,
        [array$1(ValueType)],
        (ctx, [v]) => v.value.indexOf(ctx.id()) >= 0
    ],
    'filter-in-small': [
        BooleanType,
        [
            StringType,
            array$1(ValueType)
        ],
        // assumes v is an array literal
        (ctx, [k, v]) => v.value.indexOf(ctx.properties()[k.value]) >= 0
    ],
    'filter-in-large': [
        BooleanType,
        [
            StringType,
            array$1(ValueType)
        ],
        // assumes v is a array literal with values sorted in ascending order and of a single type
        (ctx, [k, v]) => binarySearch(ctx.properties()[k.value], v.value, 0, v.value.length - 1)
    ],
    'all': {
        type: BooleanType,
        overloads: [
            [
                [
                    BooleanType,
                    BooleanType
                ],
                (ctx, [a, b]) => a.evaluate(ctx) && b.evaluate(ctx)
            ],
            [
                varargs(BooleanType),
                (ctx, args) => {
                    for (const arg of args) {
                        if (!arg.evaluate(ctx))
                            return false;
                    }
                    return true;
                }
            ]
        ]
    },
    'any': {
        type: BooleanType,
        overloads: [
            [
                [
                    BooleanType,
                    BooleanType
                ],
                (ctx, [a, b]) => a.evaluate(ctx) || b.evaluate(ctx)
            ],
            [
                varargs(BooleanType),
                (ctx, args) => {
                    for (const arg of args) {
                        if (arg.evaluate(ctx))
                            return true;
                    }
                    return false;
                }
            ]
        ]
    },
    '!': [
        BooleanType,
        [BooleanType],
        (ctx, [b]) => !b.evaluate(ctx)
    ],
    'is-supported-script': [
        BooleanType,
        [StringType],
        // At parse time this will always return true, so we need to exclude this expression with isGlobalPropertyConstant
        (ctx, [s]) => {
            const isSupportedScript = ctx.globals && ctx.globals.isSupportedScript;
            if (isSupportedScript) {
                return isSupportedScript(s.evaluate(ctx));
            }
            return true;
        }
    ],
    'upcase': [
        StringType,
        [StringType],
        (ctx, [s]) => s.evaluate(ctx).toUpperCase()
    ],
    'downcase': [
        StringType,
        [StringType],
        (ctx, [s]) => s.evaluate(ctx).toLowerCase()
    ],
    'concat': [
        StringType,
        varargs(ValueType),
        (ctx, args) => args.map(arg => toString(arg.evaluate(ctx))).join('')
    ],
    'resolved-locale': [
        StringType,
        [CollatorType],
        (ctx, [collator]) => collator.evaluate(ctx).resolvedLocale()
    ],
    'random': [
        NumberType,
        [
            NumberType,
            NumberType,
            ValueType
        ],
        (ctx, args) => {
            const [min, max, seed] = args.map(arg => arg.evaluate(ctx));
            if (min > max) {
                return min;
            }
            if (min === max) {
                return min;
            }
            let seedVal;
            if (typeof seed === 'string') {
                seedVal = hashString(seed);
            } else if (typeof seed === 'number') {
                seedVal = seed;
            } else {
                throw new RuntimeError(`Invalid seed input: ${ seed }`);
            }
            const random = mulberry32(seedVal)();
            return min + random * (max - min);
        }
    ]
});

function success(value) {
    return {
        result: 'success',
        value
    };
}
function error(value) {
    return {
        result: 'error',
        value
    };
}

function expressionHasParameter(expression, parameter) {
    return !!expression && !!expression.parameters && expression.parameters.indexOf(parameter) > -1;
}
function supportsPropertyExpression(spec) {
    return spec['property-type'] === 'data-driven';
}
function supportsLightExpression(spec) {
    return expressionHasParameter(spec.expression, 'measure-light');
}
function supportsZoomExpression(spec) {
    return expressionHasParameter(spec.expression, 'zoom');
}
function supportsLineProgressExpression(spec) {
    return expressionHasParameter(spec.expression, 'line-progress');
}
function supportsInterpolation(spec) {
    return !!spec.expression && spec.expression.interpolated;
}

function isFunction(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function identityFunction(x) {
    return x;
}
function createFunction(parameters, propertySpec) {
    const isColor = propertySpec.type === 'color';
    const zoomAndFeatureDependent = parameters.stops && typeof parameters.stops[0][0] === 'object';
    const featureDependent = zoomAndFeatureDependent || parameters.property !== void 0;
    const zoomDependent = zoomAndFeatureDependent || !featureDependent;
    const type = parameters.type || (supportsInterpolation(propertySpec) ? 'exponential' : 'interval');
    if (isColor) {
        parameters = extend({}, parameters);
        if (parameters.stops) {
            parameters.stops = parameters.stops.map(stop => {
                return [
                    stop[0],
                    Color.parse(stop[1])
                ];
            });
        }
        if (parameters.default) {
            parameters.default = Color.parse(parameters.default);
        } else {
            parameters.default = Color.parse(propertySpec.default);
        }
    }
    if (parameters.colorSpace && parameters.colorSpace !== 'rgb' && !colorSpaces[parameters.colorSpace]) {
        throw new Error(`Unknown color space: ${ parameters.colorSpace }`);
    }
    let innerFun;
    let hashedStops;
    let categoricalKeyType;
    if (type === 'exponential') {
        innerFun = evaluateExponentialFunction;
    } else if (type === 'interval') {
        innerFun = evaluateIntervalFunction;
    } else if (type === 'categorical') {
        innerFun = evaluateCategoricalFunction;
        hashedStops = /* @__PURE__ */
        Object.create(null);
        for (const stop of parameters.stops) {
            hashedStops[stop[0]] = stop[1];
        }
        categoricalKeyType = typeof parameters.stops[0][0];
    } else if (type === 'identity') {
        innerFun = evaluateIdentityFunction;
    } else {
        throw new Error(`Unknown function type "${ type }"`);
    }
    if (zoomAndFeatureDependent) {
        const featureFunctions = {};
        const zoomStops = [];
        for (let s = 0; s < parameters.stops.length; s++) {
            const stop = parameters.stops[s];
            const zoom = stop[0].zoom;
            if (featureFunctions[zoom] === void 0) {
                featureFunctions[zoom] = {
                    zoom,
                    type: parameters.type,
                    property: parameters.property,
                    default: parameters.default,
                    stops: []
                };
                zoomStops.push(zoom);
            }
            featureFunctions[zoom].stops.push([
                stop[0].value,
                stop[1]
            ]);
        }
        const featureFunctionStops = [];
        for (const z of zoomStops) {
            featureFunctionStops.push([
                featureFunctions[z].zoom,
                createFunction(featureFunctions[z], propertySpec)
            ]);
        }
        const interpolationType = { name: 'linear' };
        return {
            kind: 'composite',
            interpolationType,
            interpolationFactor: Interpolate.interpolationFactor.bind(void 0, interpolationType),
            zoomStops: featureFunctionStops.map(s => s[0]),
            evaluate({zoom}, properties) {
                return evaluateExponentialFunction({
                    stops: featureFunctionStops,
                    base: parameters.base
                }, propertySpec, zoom).evaluate(zoom, properties);
            }
        };
    } else if (zoomDependent) {
        const interpolationType = type === 'exponential' ? {
            name: 'exponential',
            base: parameters.base !== void 0 ? parameters.base : 1
        } : null;
        return {
            kind: 'camera',
            interpolationType,
            interpolationFactor: Interpolate.interpolationFactor.bind(void 0, interpolationType),
            zoomStops: parameters.stops.map(s => s[0]),
            evaluate: ({zoom}) => innerFun(parameters, propertySpec, zoom, hashedStops, categoricalKeyType)
        };
    } else {
        return {
            kind: 'source',
            evaluate(_, feature) {
                const value = feature && feature.properties ? feature.properties[parameters.property] : void 0;
                if (value === void 0) {
                    return coalesce$1(parameters.default, propertySpec.default);
                }
                return innerFun(parameters, propertySpec, value, hashedStops, categoricalKeyType);
            }
        };
    }
}
function coalesce$1(a, b, c) {
    if (a !== void 0)
        return a;
    if (b !== void 0)
        return b;
    if (c !== void 0)
        return c;
}
function evaluateCategoricalFunction(parameters, propertySpec, input, hashedStops, keyType) {
    const evaluated = typeof input === keyType ? hashedStops[input] : void 0;
    return coalesce$1(evaluated, parameters.default, propertySpec.default);
}
function evaluateIntervalFunction(parameters, propertySpec, input) {
    if (getType(input) !== 'number')
        return coalesce$1(parameters.default, propertySpec.default);
    const n = parameters.stops.length;
    if (n === 1)
        return parameters.stops[0][1];
    if (input <= parameters.stops[0][0])
        return parameters.stops[0][1];
    if (input >= parameters.stops[n - 1][0])
        return parameters.stops[n - 1][1];
    const index = findStopLessThanOrEqualTo(parameters.stops.map(stop => stop[0]), input);
    return parameters.stops[index][1];
}
function evaluateExponentialFunction(parameters, propertySpec, input) {
    const base = parameters.base !== void 0 ? parameters.base : 1;
    if (getType(input) !== 'number')
        return coalesce$1(parameters.default, propertySpec.default);
    const n = parameters.stops.length;
    if (n === 1)
        return parameters.stops[0][1];
    if (input <= parameters.stops[0][0])
        return parameters.stops[0][1];
    if (input >= parameters.stops[n - 1][0])
        return parameters.stops[n - 1][1];
    const index = findStopLessThanOrEqualTo(parameters.stops.map(stop => stop[0]), input);
    const t = interpolationFactor(input, base, parameters.stops[index][0], parameters.stops[index + 1][0]);
    const outputLower = parameters.stops[index][1];
    const outputUpper = parameters.stops[index + 1][1];
    let interp = interpolate$1[propertySpec.type] || identityFunction;
    if (parameters.colorSpace && parameters.colorSpace !== 'rgb') {
        const colorspace = colorSpaces[parameters.colorSpace];
        interp = (a, b) => colorspace.reverse(colorspace.interpolate(colorspace.forward(a), colorspace.forward(b), t));
    }
    if (typeof outputLower.evaluate === 'function') {
        return {
            evaluate(...args) {
                const evaluatedLower = outputLower.evaluate.apply(void 0, args);
                const evaluatedUpper = outputUpper.evaluate.apply(void 0, args);
                if (evaluatedLower === void 0 || evaluatedUpper === void 0) {
                    return void 0;
                }
                return interp(evaluatedLower, evaluatedUpper, t);
            }
        };
    }
    return interp(outputLower, outputUpper, t);
}
function evaluateIdentityFunction(parameters, propertySpec, input) {
    if (propertySpec.type === 'color') {
        input = Color.parse(input);
    } else if (propertySpec.type === 'formatted') {
        input = Formatted.fromString(input.toString());
    } else if (propertySpec.type === 'resolvedImage') {
        input = ResolvedImage.build(input.toString());
    } else if (getType(input) !== propertySpec.type && (propertySpec.type !== 'enum' || !propertySpec.values[input])) {
        input = void 0;
    }
    return coalesce$1(input, parameters.default, propertySpec.default);
}
function interpolationFactor(input, base, lowerValue, upperValue) {
    const difference = upperValue - lowerValue;
    const progress = input - lowerValue;
    if (difference === 0) {
        return 0;
    } else if (base === 1) {
        return progress / difference;
    } else {
        return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
    }
}

class StyleExpression {
    constructor(expression, propertySpec, scope, options) {
        this.expression = expression;
        this._warningHistory = {};
        this._evaluator = new EvaluationContext(scope, options);
        this._defaultValue = propertySpec ? getDefaultValue(propertySpec) : null;
        this._enumValues = propertySpec && propertySpec.type === 'enum' ? propertySpec.values : null;
        this.configDependencies = getConfigDependencies(expression);
    }
    evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection, featureTileCoord, featureDistanceData) {
        this._evaluator.globals = globals;
        this._evaluator.feature = feature;
        this._evaluator.featureState = featureState;
        this._evaluator.canonical = canonical || null;
        this._evaluator.availableImages = availableImages || null;
        this._evaluator.formattedSection = formattedSection;
        this._evaluator.featureTileCoord = featureTileCoord || null;
        this._evaluator.featureDistanceData = featureDistanceData || null;
        return this.expression.evaluate(this._evaluator);
    }
    evaluate(globals, feature, featureState, canonical, availableImages, formattedSection, featureTileCoord, featureDistanceData) {
        this._evaluator.globals = globals;
        this._evaluator.feature = feature || null;
        this._evaluator.featureState = featureState || null;
        this._evaluator.canonical = canonical || null;
        this._evaluator.availableImages = availableImages || null;
        this._evaluator.formattedSection = formattedSection || null;
        this._evaluator.featureTileCoord = featureTileCoord || null;
        this._evaluator.featureDistanceData = featureDistanceData || null;
        try {
            const val = this.expression.evaluate(this._evaluator);
            if (val === null || val === void 0 || typeof val === 'number' && val !== val) {
                return this._defaultValue;
            }
            if (this._enumValues && !(val in this._enumValues)) {
                throw new RuntimeError(`Expected value to be one of ${ Object.keys(this._enumValues).map(v => JSON.stringify(v)).join(', ') }, but found ${ JSON.stringify(val) } instead.`);
            }
            return val;
        } catch (e) {
            if (!this._warningHistory[e.message]) {
                this._warningHistory[e.message] = true;
                if (typeof console !== 'undefined') {
                    console.warn(`Failed to evaluate expression "${ JSON.stringify(this.expression.serialize()) }". ${ e.message }`);
                }
            }
            return this._defaultValue;
        }
    }
}
function isExpression(expression) {
    return Array.isArray(expression) && expression.length > 0 && typeof expression[0] === 'string' && expression[0] in expressions;
}
function createExpression(expression, propertySpec, scope, options) {
    const parser = new ParsingContext$1(expressions, [], propertySpec ? getExpectedType(propertySpec) : void 0, void 0, void 0, scope, options);
    const parsed = parser.parse(expression, void 0, void 0, void 0, propertySpec && propertySpec.type === 'string' ? { typeAnnotation: 'coerce' } : void 0);
    if (!parsed) {
        return error(parser.errors);
    }
    return success(new StyleExpression(parsed, propertySpec, scope, options));
}
class ZoomConstantExpression {
    constructor(kind, expression, isLightConstant, isLineProgressConstant) {
        this.kind = kind;
        this._styleExpression = expression;
        this.isLightConstant = isLightConstant;
        this.isLineProgressConstant = isLineProgressConstant;
        this.isStateDependent = kind !== 'constant' && !isStateConstant(expression.expression);
        this.configDependencies = getConfigDependencies(expression.expression);
    }
    evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection) {
        return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection);
    }
    evaluate(globals, feature, featureState, canonical, availableImages, formattedSection) {
        return this._styleExpression.evaluate(globals, feature, featureState, canonical, availableImages, formattedSection);
    }
}
class ZoomDependentExpression {
    constructor(kind, expression, zoomStops, interpolationType, isLightConstant, isLineProgressConstant) {
        this.kind = kind;
        this.zoomStops = zoomStops;
        this._styleExpression = expression;
        this.isStateDependent = kind !== 'camera' && !isStateConstant(expression.expression);
        this.isLightConstant = isLightConstant;
        this.isLineProgressConstant = isLineProgressConstant;
        this.configDependencies = getConfigDependencies(expression.expression);
        this.interpolationType = interpolationType;
    }
    evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection) {
        return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection);
    }
    evaluate(globals, feature, featureState, canonical, availableImages, formattedSection) {
        return this._styleExpression.evaluate(globals, feature, featureState, canonical, availableImages, formattedSection);
    }
    interpolationFactor(input, lower, upper) {
        if (this.interpolationType) {
            return Interpolate.interpolationFactor(this.interpolationType, input, lower, upper);
        } else {
            return 0;
        }
    }
}
function createPropertyExpression(expression, propertySpec, scope, options) {
    expression = createExpression(expression, propertySpec, scope, options);
    if (expression.result === 'error') {
        return expression;
    }
    const parsed = expression.value.expression;
    const isFeatureConstant$1 = isFeatureConstant(parsed);
    if (!isFeatureConstant$1 && !supportsPropertyExpression(propertySpec)) {
        return error([new ParsingError$1('', 'data expressions not supported')]);
    }
    const isZoomConstant = isGlobalPropertyConstant(parsed, [
        'zoom',
        'pitch',
        'distance-from-center'
    ]);
    if (!isZoomConstant && !supportsZoomExpression(propertySpec)) {
        return error([new ParsingError$1('', 'zoom expressions not supported')]);
    }
    const isLightConstant = isGlobalPropertyConstant(parsed, ['measure-light']);
    if (!isLightConstant && !supportsLightExpression(propertySpec)) {
        return error([new ParsingError$1('', 'measure-light expression not supported')]);
    }
    const isLineProgressConstant = isGlobalPropertyConstant(parsed, ['line-progress']);
    if (!isLineProgressConstant && !supportsLineProgressExpression(propertySpec)) {
        return error([new ParsingError$1('', 'line-progress expression not supported')]);
    }
    const canRelaxZoomRestriction = propertySpec.expression && propertySpec.expression.relaxZoomRestriction;
    const zoomCurve = findZoomCurve(parsed);
    if (!zoomCurve && !isZoomConstant && !canRelaxZoomRestriction) {
        return error([new ParsingError$1('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression, or in the properties of atmosphere.')]);
    } else if (zoomCurve instanceof ParsingError$1) {
        return error([zoomCurve]);
    } else if (zoomCurve instanceof Interpolate && !supportsInterpolation(propertySpec)) {
        return error([new ParsingError$1('', '"interpolate" expressions cannot be used with this property')]);
    }
    if (!zoomCurve) {
        return success(isFeatureConstant$1 && isLineProgressConstant ? // @ts-expect-error - TS2339 - Property 'value' does not exist on type 'unknown'.
        new ZoomConstantExpression('constant', expression.value, isLightConstant, isLineProgressConstant) : // @ts-expect-error - TS2339 - Property 'value' does not exist on type 'unknown'.
        new ZoomConstantExpression('source', expression.value, isLightConstant, isLineProgressConstant));
    }
    const interpolationType = zoomCurve instanceof Interpolate ? zoomCurve.interpolation : void 0;
    return success(isFeatureConstant$1 && isLineProgressConstant ? // @ts-expect-error - TS2339 - Property 'value' does not exist on type 'unknown'.
    new ZoomDependentExpression('camera', expression.value, zoomCurve.labels, interpolationType, isLightConstant, isLineProgressConstant) : // @ts-expect-error - TS2339 - Property 'value' does not exist on type 'unknown'.
    new ZoomDependentExpression('composite', expression.value, zoomCurve.labels, interpolationType, isLightConstant, isLineProgressConstant));
}
class StylePropertyFunction {
    constructor(parameters, specification) {
        this._parameters = parameters;
        this._specification = specification;
        extend(this, createFunction(this._parameters, this._specification));
    }
    static deserialize(serialized) {
        return new StylePropertyFunction(serialized._parameters, serialized._specification);
    }
    static serialize(input) {
        return {
            _parameters: input._parameters,
            _specification: input._specification
        };
    }
}
function normalizePropertyExpression(value, specification, scope, options) {
    if (isFunction(value)) {
        return new StylePropertyFunction(value, specification);
    } else if (isExpression(value) || Array.isArray(value) && value.length > 0) {
        const expression = createPropertyExpression(value, specification, scope, options);
        if (expression.result === 'error') {
            throw new Error(expression.value.map(err => `${ err.key }: ${ err.message }`).join(', '));
        }
        return expression.value;
    } else {
        let constant = value;
        if (typeof value === 'string' && specification.type === 'color') {
            constant = Color.parse(value);
        }
        return {
            kind: 'constant',
            configDependencies: /* @__PURE__ */
            new Set(),
            evaluate: () => constant
        };
    }
}
function findZoomCurve(expression) {
    let result = null;
    if (expression instanceof Let) {
        result = findZoomCurve(expression.result);
    } else if (expression instanceof Coalesce) {
        for (const arg of expression.args) {
            result = findZoomCurve(arg);
            if (result) {
                break;
            }
        }
    } else if ((expression instanceof Step || expression instanceof Interpolate) && expression.input instanceof CompoundExpression && expression.input.name === 'zoom') {
        result = expression;
    }
    if (result instanceof ParsingError$1) {
        return result;
    }
    expression.eachChild(child => {
        const childResult = findZoomCurve(child);
        if (childResult instanceof ParsingError$1) {
            result = childResult;
        } else if (result && childResult && result !== childResult) {
            result = new ParsingError$1('', 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.');
        }
    });
    return result;
}
function getExpectedType(spec) {
    const types = {
        color: ColorType,
        string: StringType,
        number: NumberType,
        enum: StringType,
        boolean: BooleanType,
        formatted: FormattedType,
        resolvedImage: ResolvedImageType
    };
    if (spec.type === 'array') {
        return array$1(types[spec.value] || ValueType, spec.length);
    }
    return types[spec.type];
}
function getDefaultValue(spec) {
    if (spec.type === 'color' && (isFunction(spec.default) || Array.isArray(spec.default))) {
        return new Color(0, 0, 0, 0);
    } else if (spec.type === 'color') {
        return Color.parse(spec.default) || null;
    } else if (spec.default === void 0) {
        return null;
    } else {
        return spec.default;
    }
}

function convertLiteral(value) {
    return typeof value === 'object' ? [
        'literal',
        value
    ] : value;
}
function convertFunction(parameters, propertySpec) {
    let stops = parameters.stops;
    if (!stops) {
        return convertIdentityFunction(parameters, propertySpec);
    }
    const zoomAndFeatureDependent = stops && typeof stops[0][0] === 'object';
    const featureDependent = zoomAndFeatureDependent || parameters.property !== void 0;
    const zoomDependent = zoomAndFeatureDependent || !featureDependent;
    stops = stops.map(stop => {
        if (!featureDependent && propertySpec.tokens && typeof stop[1] === 'string') {
            return [
                stop[0],
                convertTokenString(stop[1])
            ];
        }
        return [
            stop[0],
            convertLiteral(stop[1])
        ];
    });
    if (zoomAndFeatureDependent) {
        return convertZoomAndPropertyFunction(parameters, propertySpec, stops);
    } else if (zoomDependent) {
        return convertZoomFunction(parameters, propertySpec, stops);
    } else {
        return convertPropertyFunction(parameters, propertySpec, stops);
    }
}
function convertIdentityFunction(parameters, propertySpec) {
    const get = [
        'get',
        parameters.property
    ];
    if (parameters.default === void 0) {
        return propertySpec.type === 'string' ? [
            'string',
            get
        ] : get;
    } else if (propertySpec.type === 'enum') {
        return [
            'match',
            get,
            Object.keys(propertySpec.values),
            get,
            parameters.default
        ];
    } else {
        const expression = [
            propertySpec.type === 'color' ? 'to-color' : propertySpec.type,
            get,
            convertLiteral(parameters.default)
        ];
        if (propertySpec.type === 'array') {
            expression.splice(1, 0, propertySpec.value, propertySpec.length || null);
        }
        return expression;
    }
}
function getInterpolateOperator(parameters) {
    switch (parameters.colorSpace) {
    case 'hcl':
        return 'interpolate-hcl';
    case 'lab':
        return 'interpolate-lab';
    default:
        return 'interpolate';
    }
}
function convertZoomAndPropertyFunction(parameters, propertySpec, stops) {
    const featureFunctionParameters = {};
    const featureFunctionStops = {};
    const zoomStops = [];
    for (let s = 0; s < stops.length; s++) {
        const stop = stops[s];
        const zoom = stop[0].zoom;
        if (featureFunctionParameters[zoom] === void 0) {
            featureFunctionParameters[zoom] = {
                zoom,
                type: parameters.type,
                property: parameters.property,
                default: parameters.default
            };
            featureFunctionStops[zoom] = [];
            zoomStops.push(zoom);
        }
        featureFunctionStops[zoom].push([
            stop[0].value,
            stop[1]
        ]);
    }
    const functionType = getFunctionType({}, propertySpec);
    if (functionType === 'exponential') {
        const expression = [
            getInterpolateOperator(parameters),
            ['linear'],
            ['zoom']
        ];
        for (const z of zoomStops) {
            const output = convertPropertyFunction(featureFunctionParameters[z], propertySpec, featureFunctionStops[z]);
            appendStopPair(expression, z, output, false);
        }
        return expression;
    } else {
        const expression = [
            'step',
            ['zoom']
        ];
        for (const z of zoomStops) {
            const output = convertPropertyFunction(featureFunctionParameters[z], propertySpec, featureFunctionStops[z]);
            appendStopPair(expression, z, output, true);
        }
        fixupDegenerateStepCurve(expression);
        return expression;
    }
}
function coalesce(a, b) {
    if (a !== void 0)
        return a;
    if (b !== void 0)
        return b;
}
function getFallback(parameters, propertySpec) {
    const defaultValue = convertLiteral(coalesce(parameters.default, propertySpec.default));
    if (defaultValue === void 0 && propertySpec.type === 'resolvedImage') {
        return '';
    }
    return defaultValue;
}
function convertPropertyFunction(parameters, propertySpec, stops) {
    const type = getFunctionType(parameters, propertySpec);
    const get = [
        'get',
        parameters.property
    ];
    if (type === 'categorical' && typeof stops[0][0] === 'boolean') {
        const expression = ['case'];
        for (const stop of stops) {
            expression.push([
                '==',
                get,
                stop[0]
            ], stop[1]);
        }
        expression.push(getFallback(parameters, propertySpec));
        return expression;
    } else if (type === 'categorical') {
        const expression = [
            'match',
            get
        ];
        for (const stop of stops) {
            appendStopPair(expression, stop[0], stop[1], false);
        }
        expression.push(getFallback(parameters, propertySpec));
        return expression;
    } else if (type === 'interval') {
        const expression = [
            'step',
            [
                'number',
                get
            ]
        ];
        for (const stop of stops) {
            appendStopPair(expression, stop[0], stop[1], true);
        }
        fixupDegenerateStepCurve(expression);
        return parameters.default === void 0 ? expression : [
            'case',
            [
                '==',
                [
                    'typeof',
                    get
                ],
                'number'
            ],
            expression,
            convertLiteral(parameters.default)
        ];
    } else if (type === 'exponential') {
        const base = parameters.base !== void 0 ? parameters.base : 1;
        const expression = [
            getInterpolateOperator(parameters),
            base === 1 ? ['linear'] : [
                'exponential',
                base
            ],
            [
                'number',
                get
            ]
        ];
        for (const stop of stops) {
            appendStopPair(expression, stop[0], stop[1], false);
        }
        return parameters.default === void 0 ? expression : [
            'case',
            [
                '==',
                [
                    'typeof',
                    get
                ],
                'number'
            ],
            expression,
            convertLiteral(parameters.default)
        ];
    } else {
        throw new Error(`Unknown property function type ${ type }`);
    }
}
function convertZoomFunction(parameters, propertySpec, stops, input = ['zoom']) {
    const type = getFunctionType(parameters, propertySpec);
    let expression;
    let isStep = false;
    if (type === 'interval') {
        expression = [
            'step',
            input
        ];
        isStep = true;
    } else if (type === 'exponential') {
        const base = parameters.base !== void 0 ? parameters.base : 1;
        expression = [
            getInterpolateOperator(parameters),
            base === 1 ? ['linear'] : [
                'exponential',
                base
            ],
            input
        ];
    } else {
        throw new Error(`Unknown zoom function type "${ type }"`);
    }
    for (const stop of stops) {
        appendStopPair(expression, stop[0], stop[1], isStep);
    }
    fixupDegenerateStepCurve(expression);
    return expression;
}
function fixupDegenerateStepCurve(expression) {
    if (expression[0] === 'step' && expression.length === 3) {
        expression.push(0);
        expression.push(expression[3]);
    }
}
function appendStopPair(curve, input, output, isStep) {
    if (curve.length > 3 && input === curve[curve.length - 2]) {
        return;
    }
    if (!(isStep && curve.length === 2)) {
        curve.push(input);
    }
    curve.push(output);
}
function getFunctionType(parameters, propertySpec) {
    if (parameters.type) {
        return parameters.type;
    } else {
        return propertySpec.expression.interpolated ? 'exponential' : 'interval';
    }
}
function convertTokenString(s) {
    const result = ['concat'];
    const re = /{([^{}]+)}/g;
    let pos = 0;
    for (let match = re.exec(s); match !== null; match = re.exec(s)) {
        const literal = s.slice(pos, re.lastIndex - match[0].length);
        pos = re.lastIndex;
        if (literal.length > 0)
            result.push(literal);
        result.push([
            'get',
            match[1]
        ]);
    }
    if (result.length === 1) {
        return s;
    }
    if (pos < s.length) {
        result.push(s.slice(pos));
    } else if (result.length === 2) {
        return [
            'to-string',
            result[1]
        ];
    }
    return result;
}

function unbundle(value) {
    if (value instanceof Number || value instanceof String || value instanceof Boolean) {
        return value.valueOf();
    } else {
        return value;
    }
}
function deepUnbundle(value) {
    if (Array.isArray(value)) {
        return value.map(deepUnbundle);
    } else if (value instanceof Object && !(value instanceof Number || value instanceof String || value instanceof Boolean)) {
        const unbundledValue = {};
        for (const key in value) {
            unbundledValue[key] = deepUnbundle(value[key]);
        }
        return unbundledValue;
    }
    return unbundle(value);
}

function isExpressionFilter(filter) {
    if (filter === true || filter === false) {
        return true;
    }
    if (!Array.isArray(filter) || filter.length === 0) {
        return false;
    }
    switch (filter[0]) {
    case 'has':
        return filter.length >= 2 && filter[1] !== '$id' && filter[1] !== '$type';
    case 'in':
        return filter.length >= 3 && (typeof filter[1] !== 'string' || Array.isArray(filter[2]));
    case '!in':
    case '!has':
    case 'none':
        return false;
    case '==':
    case '!=':
    case '>':
    case '>=':
    case '<':
    case '<=':
        return filter.length !== 3 || (Array.isArray(filter[1]) || Array.isArray(filter[2]));
    case 'any':
    case 'all':
        for (const f of filter.slice(1)) {
            if (!isExpressionFilter(f) && typeof f !== 'boolean') {
                return false;
            }
        }
        return true;
    default:
        return true;
    }
}
function createFilter(filter, scope = '', options = null, layerType = 'fill') {
    if (filter === null || filter === void 0) {
        return {
            filter: () => true,
            needGeometry: false,
            needFeature: false
        };
    }
    if (!isExpressionFilter(filter)) {
        filter = convertFilter$1(filter);
    }
    const filterExp = filter;
    let staticFilter = true;
    try {
        staticFilter = extractStaticFilter(filterExp);
    } catch (e) {
        console.warn(`Failed to extract static filter. Filter will continue working, but at higher memory usage and slower framerate.
This is most likely a bug, please report this via https://github.com/mapbox/mapbox-gl-js/issues/new?assignees=&labels=&template=Bug_report.md
and paste the contents of this message in the report.
Thank you!
Filter Expression:
${ JSON.stringify(filterExp, null, 2) }
        `);
    }
    let filterFunc = null;
    let filterSpec = null;
    if (layerType !== 'background' && layerType !== 'sky' && layerType !== 'slot') {
        filterSpec = v8[`filter_${ layerType }`];
        const compiledStaticFilter = createExpression(staticFilter, filterSpec, scope, options);
        if (compiledStaticFilter.result === 'error') {
            throw new Error(compiledStaticFilter.value.map(err => `${ err.key }: ${ err.message }`).join(', '));
        } else {
            filterFunc = (globalProperties, feature, canonical) => compiledStaticFilter.value.evaluate(globalProperties, feature, {}, canonical);
        }
    }
    let dynamicFilterFunc = null;
    let needFeature = null;
    if (staticFilter !== filterExp) {
        const compiledDynamicFilter = createExpression(filterExp, filterSpec, scope, options);
        if (compiledDynamicFilter.result === 'error') {
            throw new Error(compiledDynamicFilter.value.map(err => `${ err.key }: ${ err.message }`).join(', '));
        } else {
            dynamicFilterFunc = (globalProperties, feature, canonical, featureTileCoord, featureDistanceData) => compiledDynamicFilter.value.evaluate(globalProperties, feature, {}, canonical, void 0, void 0, featureTileCoord, featureDistanceData);
            needFeature = !isFeatureConstant(compiledDynamicFilter.value.expression);
        }
    }
    filterFunc = filterFunc;
    const needGeometry = geometryNeeded(staticFilter);
    return {
        filter: filterFunc,
        dynamicFilter: dynamicFilterFunc ? dynamicFilterFunc : void 0,
        needGeometry,
        needFeature: !!needFeature
    };
}
function extractStaticFilter(filter) {
    if (!isDynamicFilter(filter)) {
        return filter;
    }
    let result = deepUnbundle(filter);
    unionDynamicBranches(result);
    result = collapseDynamicBooleanExpressions(result);
    return result;
}
function collapseDynamicBooleanExpressions(expression) {
    if (!Array.isArray(expression)) {
        return expression;
    }
    const collapsed = collapsedExpression(expression);
    if (collapsed === true) {
        return collapsed;
    } else {
        return collapsed.map(subExpression => collapseDynamicBooleanExpressions(subExpression));
    }
}
function unionDynamicBranches(filter) {
    let isBranchingDynamically = false;
    const branches = [];
    if (filter[0] === 'case') {
        for (let i = 1; i < filter.length - 1; i += 2) {
            isBranchingDynamically = isBranchingDynamically || isDynamicFilter(filter[i]);
            branches.push(filter[i + 1]);
        }
        branches.push(filter[filter.length - 1]);
    } else if (filter[0] === 'match') {
        isBranchingDynamically = isBranchingDynamically || isDynamicFilter(filter[1]);
        for (let i = 2; i < filter.length - 1; i += 2) {
            branches.push(filter[i + 1]);
        }
        branches.push(filter[filter.length - 1]);
    } else if (filter[0] === 'step') {
        isBranchingDynamically = isBranchingDynamically || isDynamicFilter(filter[1]);
        for (let i = 1; i < filter.length - 1; i += 2) {
            branches.push(filter[i + 1]);
        }
    }
    if (isBranchingDynamically) {
        filter.length = 0;
        filter.push('any', ...branches);
    }
    for (let i = 1; i < filter.length; i++) {
        unionDynamicBranches(filter[i]);
    }
}
function isDynamicFilter(filter) {
    if (!Array.isArray(filter)) {
        return false;
    }
    if (isRootExpressionDynamic(filter[0])) {
        return true;
    }
    for (let i = 1; i < filter.length; i++) {
        const child = filter[i];
        if (isDynamicFilter(child)) {
            return true;
        }
    }
    return false;
}
function isRootExpressionDynamic(expression) {
    return expression === 'pitch' || expression === 'distance-from-center';
}
const dynamicConditionExpressions = /* @__PURE__ */
new Set([
    'in',
    '==',
    '!=',
    '>',
    '>=',
    '<',
    '<=',
    'to-boolean'
]);
function collapsedExpression(expression) {
    if (dynamicConditionExpressions.has(expression[0])) {
        for (let i = 1; i < expression.length; i++) {
            const param = expression[i];
            if (isDynamicFilter(param)) {
                return true;
            }
        }
    }
    return expression;
}
function compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
function geometryNeeded(filter) {
    if (!Array.isArray(filter))
        return false;
    if (filter[0] === 'within' || filter[0] === 'distance')
        return true;
    for (let index = 1; index < filter.length; index++) {
        if (geometryNeeded(filter[index]))
            return true;
    }
    return false;
}
function convertFilter$1(filter) {
    if (!filter)
        return true;
    const op = filter[0];
    if (filter.length <= 1)
        return op !== 'any';
    const converted = op === '==' ? convertComparisonOp$1(filter[1], filter[2], '==') : op === '!=' ? convertNegation(convertComparisonOp$1(filter[1], filter[2], '==')) : op === '<' || op === '>' || op === '<=' || op === '>=' ? convertComparisonOp$1(filter[1], filter[2], op) : op === 'any' ? convertDisjunctionOp(filter.slice(1)) : // @ts-expect-error - TS2769 - No overload matches this call.
    op === 'all' ? ['all'].concat(filter.slice(1).map(convertFilter$1)) : // @ts-expect-error - TS2769 - No overload matches this call.
    op === 'none' ? ['all'].concat(filter.slice(1).map(convertFilter$1).map(convertNegation)) : op === 'in' ? convertInOp$1(filter[1], filter.slice(2)) : op === '!in' ? convertNegation(convertInOp$1(filter[1], filter.slice(2))) : op === 'has' ? convertHasOp$1(filter[1]) : op === '!has' ? convertNegation(convertHasOp$1(filter[1])) : true;
    return converted;
}
function convertComparisonOp$1(property, value, op) {
    switch (property) {
    case '$type':
        return [
            `filter-type-${ op }`,
            value
        ];
    case '$id':
        return [
            `filter-id-${ op }`,
            value
        ];
    default:
        return [
            `filter-${ op }`,
            property,
            value
        ];
    }
}
function convertDisjunctionOp(filters) {
    return ['any'].concat(filters.map(convertFilter$1));
}
function convertInOp$1(property, values) {
    if (values.length === 0) {
        return false;
    }
    switch (property) {
    case '$type':
        return [
            `filter-type-in`,
            [
                'literal',
                values
            ]
        ];
    case '$id':
        return [
            `filter-id-in`,
            [
                'literal',
                values
            ]
        ];
    default:
        if (values.length > 200 && !values.some(v => typeof v !== typeof values[0])) {
            return [
                'filter-in-large',
                property,
                [
                    'literal',
                    values.sort(compare)
                ]
            ];
        } else {
            return [
                'filter-in-small',
                property,
                [
                    'literal',
                    values
                ]
            ];
        }
    }
}
function convertHasOp$1(property) {
    switch (property) {
    case '$type':
        return true;
    case '$id':
        return [`filter-has-id`];
    default:
        return [
            `filter-has`,
            property
        ];
    }
}
function convertNegation(filter) {
    return [
        '!',
        filter
    ];
}

function convertFilter(filter) {
    return _convertFilter(filter, {});
}
function _convertFilter(filter, expectedTypes) {
    if (isExpressionFilter(filter)) {
        return filter;
    }
    if (!filter)
        return true;
    const op = filter[0];
    if (filter.length <= 1)
        return op !== 'any';
    let converted;
    if (op === '==' || op === '!=' || op === '<' || op === '>' || op === '<=' || op === '>=') {
        const [, property, value] = filter;
        converted = convertComparisonOp(property, value, op, expectedTypes);
    } else if (op === 'any') {
        const children = filter.slice(1).map(f => {
            const types = {};
            const child = _convertFilter(f, types);
            const typechecks = runtimeTypeChecks(types);
            return typechecks === true ? child : [
                'case',
                typechecks,
                child,
                false
            ];
        });
        return ['any'].concat(children);
    } else if (op === 'all') {
        const children = filter.slice(1).map(f => _convertFilter(f, expectedTypes));
        return children.length > 1 ? ['all'].concat(children) : [].concat(...children);
    } else if (op === 'none') {
        return [
            '!',
            _convertFilter(['any'].concat(filter.slice(1)), {})
        ];
    } else if (op === 'in') {
        converted = convertInOp(filter[1], filter.slice(2));
    } else if (op === '!in') {
        converted = convertInOp(filter[1], filter.slice(2), true);
    } else if (op === 'has') {
        converted = convertHasOp(filter[1]);
    } else if (op === '!has') {
        converted = [
            '!',
            convertHasOp(filter[1])
        ];
    } else {
        converted = true;
    }
    return converted;
}
function runtimeTypeChecks(expectedTypes) {
    const conditions = [];
    for (const property in expectedTypes) {
        const get = property === '$id' ? ['id'] : [
            'get',
            property
        ];
        conditions.push([
            '==',
            [
                'typeof',
                get
            ],
            expectedTypes[property]
        ]);
    }
    if (conditions.length === 0)
        return true;
    if (conditions.length === 1)
        return conditions[0];
    return ['all'].concat(conditions);
}
function convertComparisonOp(property, value, op, expectedTypes) {
    let get;
    if (property === '$type') {
        return [
            op,
            ['geometry-type'],
            value
        ];
    } else if (property === '$id') {
        get = ['id'];
    } else {
        get = [
            'get',
            property
        ];
    }
    if (expectedTypes && value !== null) {
        const type = typeof value;
        expectedTypes[property] = type;
    }
    if (op === '==' && property !== '$id' && value === null) {
        return [
            'all',
            [
                'has',
                property
            ],
            // missing property != null for legacy filters
            [
                '==',
                get,
                null
            ]
        ];
    } else if (op === '!=' && property !== '$id' && value === null) {
        return [
            'any',
            [
                '!',
                [
                    'has',
                    property
                ]
            ],
            // missing property != null for legacy filters
            [
                '!=',
                get,
                null
            ]
        ];
    }
    return [
        op,
        get,
        value
    ];
}
function convertInOp(property, values, negate = false) {
    if (values.length === 0)
        return negate;
    let get;
    if (property === '$type') {
        get = ['geometry-type'];
    } else if (property === '$id') {
        get = ['id'];
    } else {
        get = [
            'get',
            property
        ];
    }
    let uniformTypes = true;
    const type = typeof values[0];
    for (const value of values) {
        if (typeof value !== type) {
            uniformTypes = false;
            break;
        }
    }
    if (uniformTypes && (type === 'string' || type === 'number')) {
        const uniqueValues = values.sort().filter((v, i) => i === 0 || values[i - 1] !== v);
        return [
            'match',
            get,
            uniqueValues,
            !negate,
            negate
        ];
    }
    return [negate ? 'all' : 'any'].concat(values.map(v => [
        negate ? '!=' : '==',
        get,
        v
    ]));
}
function convertHasOp(property) {
    if (property === '$type') {
        return true;
    } else if (property === '$id') {
        return [
            '!=',
            ['id'],
            null
        ];
    } else {
        return [
            'has',
            property
        ];
    }
}

function migrateToExpressions (style) {
    const converted = [];
    eachLayer(style, layer => {
        if (layer.filter) {
            layer.filter = convertFilter(layer.filter);
        }
    });
    eachProperty(style, {
        paint: true,
        layout: true
    }, ({path, value, reference, set}) => {
        if (isExpression(value))
            return;
        if (typeof value === 'object' && !Array.isArray(value)) {
            set(convertFunction(value, reference));
            converted.push(path.join('.'));
        } else if (reference.tokens && typeof value === 'string') {
            set(convertTokenString(value));
        }
    });
    return style;
}

function migrate (style) {
    let migrated = false;
    if (style.version === 7) {
        style = migrateToV8(style);
        migrated = true;
    }
    if (style.version === 8) {
        migrated = migrateToExpressions(style);
        migrated = true;
    }
    if (!migrated) {
        throw new Error('cannot migrate from', style.version);
    }
    return style;
}

function composite (style) {
    const styleIDs = [];
    const sourceIDs = [];
    const compositedSourceLayers = [];
    for (const id in style.sources) {
        const source = style.sources[id];
        if (source.type !== 'vector')
            continue;
        const match = /^mapbox:\/\/(.*)/.exec(source.url);
        if (!match)
            continue;
        styleIDs.push(id);
        sourceIDs.push(match[1]);
    }
    if (styleIDs.length < 2)
        return style;
    styleIDs.forEach(id => {
        delete style.sources[id];
    });
    const compositeID = sourceIDs.join(',');
    style.sources[compositeID] = {
        'type': 'vector',
        'url': `mapbox://${ compositeID }`
    };
    style.layers.forEach(layer => {
        if (styleIDs.indexOf(layer.source) >= 0) {
            layer.source = compositeID;
            if ('source-layer' in layer) {
                if (compositedSourceLayers.indexOf(layer['source-layer']) >= 0) {
                    throw new Error('Conflicting source layer names');
                } else {
                    compositedSourceLayers.push(layer['source-layer']);
                }
            }
        }
    });
    return style;
}

var refProperties = [
    'type',
    'source',
    'source-layer',
    'minzoom',
    'maxzoom',
    'filter',
    'layout'
];

function deref(layer, parent) {
    const result = {};
    for (const k in layer) {
        if (k !== 'ref') {
            result[k] = layer[k];
        }
    }
    refProperties.forEach(k => {
        if (k in parent) {
            result[k] = parent[k];
        }
    });
    return result;
}
function derefLayers(layers) {
    layers = layers.slice();
    const map = /* @__PURE__ */
    Object.create(null);
    for (let i = 0; i < layers.length; i++) {
        map[layers[i].id] = layers[i];
    }
    for (let i = 0; i < layers.length; i++) {
        if ('ref' in layers[i]) {
            layers[i] = deref(layers[i], map[layers[i].ref]);
        }
    }
    return layers;
}

function deepEqual(a, b) {
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i]))
                return false;
        }
        return true;
    }
    if (typeof a === 'object' && a !== null && b !== null) {
        if (!(typeof b === 'object'))
            return false;
        const keys = Object.keys(a);
        if (keys.length !== Object.keys(b).length)
            return false;
        for (const key in a) {
            if (!deepEqual(a[key], b[key]))
                return false;
        }
        return true;
    }
    return a === b;
}

const operations = {
    /*
   * { command: 'setStyle', args: [stylesheet] }
   */
    setStyle: 'setStyle',
    /*
   * { command: 'addLayer', args: [layer, 'beforeLayerId'] }
   */
    addLayer: 'addLayer',
    /*
   * { command: 'removeLayer', args: ['layerId'] }
   */
    removeLayer: 'removeLayer',
    /*
   * { command: 'setPaintProperty', args: ['layerId', 'prop', value] }
   */
    setPaintProperty: 'setPaintProperty',
    /*
   * { command: 'setLayoutProperty', args: ['layerId', 'prop', value] }
   */
    setLayoutProperty: 'setLayoutProperty',
    /*
   * { command: 'setSlot', args: ['layerId', slot] }
   */
    setSlot: 'setSlot',
    /*
   * { command: 'setFilter', args: ['layerId', filter] }
   */
    setFilter: 'setFilter',
    /*
   * { command: 'addSource', args: ['sourceId', source] }
   */
    addSource: 'addSource',
    /*
   * { command: 'removeSource', args: ['sourceId'] }
   */
    removeSource: 'removeSource',
    /*
   * { command: 'setGeoJSONSourceData', args: ['sourceId', data] }
   */
    setGeoJSONSourceData: 'setGeoJSONSourceData',
    /*
   * { command: 'setLayerZoomRange', args: ['layerId', 0, 22] }
   */
    setLayerZoomRange: 'setLayerZoomRange',
    /*
   * { command: 'setLayerProperty', args: ['layerId', 'prop', value] }
   */
    setLayerProperty: 'setLayerProperty',
    /*
   * { command: 'setCenter', args: [[lon, lat]] }
   */
    setCenter: 'setCenter',
    /*
   * { command: 'setZoom', args: [zoom] }
   */
    setZoom: 'setZoom',
    /*
   * { command: 'setBearing', args: [bearing] }
   */
    setBearing: 'setBearing',
    /*
   * { command: 'setPitch', args: [pitch] }
   */
    setPitch: 'setPitch',
    /*
   * { command: 'setSprite', args: ['spriteUrl'] }
   */
    setSprite: 'setSprite',
    /*
   * { command: 'setGlyphs', args: ['glyphsUrl'] }
   */
    setGlyphs: 'setGlyphs',
    /*
   * { command: 'setTransition', args: [transition] }
   */
    setTransition: 'setTransition',
    /*
   * { command: 'setLighting', args: [lightProperties] }
   */
    setLight: 'setLight',
    /*
   * { command: 'setTerrain', args: [terrainProperties] }
   */
    setTerrain: 'setTerrain',
    /*
   *  { command: 'setFog', args: [fogProperties] }
   */
    setFog: 'setFog',
    /*
   *  { command: 'setSnow', args: [snowProperties] }
   */
    setSnow: 'setSnow',
    /*
   *  { command: 'setRain', args: [rainProperties] }
   */
    setRain: 'setRain',
    /*
   *  { command: 'setCamera', args: [cameraProperties] }
   */
    setCamera: 'setCamera',
    /*
   *  { command: 'setLights', args: [{light-3d},...] }
   */
    setLights: 'setLights',
    /*
   *  { command: 'setProjection', args: [projectionProperties] }
   */
    setProjection: 'setProjection',
    /*
   *  { command: 'addImport', args: [import] }
   */
    addImport: 'addImport',
    /*
   *  { command: 'removeImport', args: [importId] }
   */
    removeImport: 'removeImport',
    /**
   * { command: 'updateImport', args: [importId, importSpecification | styleUrl] }
   */
    updateImport: 'updateImport'
};
function addSource(sourceId, after, commands) {
    commands.push({
        command: operations.addSource,
        args: [
            sourceId,
            after[sourceId]
        ]
    });
}
function removeSource(sourceId, commands, sourcesRemoved) {
    commands.push({
        command: operations.removeSource,
        args: [sourceId]
    });
    sourcesRemoved[sourceId] = true;
}
function updateSource(sourceId, after, commands, sourcesRemoved) {
    removeSource(sourceId, commands, sourcesRemoved);
    addSource(sourceId, after, commands);
}
function canUpdateGeoJSON(before, after, sourceId) {
    let prop;
    for (prop in before[sourceId]) {
        if (!before[sourceId].hasOwnProperty(prop))
            continue;
        if (prop !== 'data' && !deepEqual(before[sourceId][prop], after[sourceId][prop])) {
            return false;
        }
    }
    for (prop in after[sourceId]) {
        if (!after[sourceId].hasOwnProperty(prop))
            continue;
        if (prop !== 'data' && !deepEqual(before[sourceId][prop], after[sourceId][prop])) {
            return false;
        }
    }
    return true;
}
function diffSources(before, after, commands, sourcesRemoved) {
    before = before || {};
    after = after || {};
    let sourceId;
    for (sourceId in before) {
        if (!before.hasOwnProperty(sourceId))
            continue;
        if (!after.hasOwnProperty(sourceId)) {
            removeSource(sourceId, commands, sourcesRemoved);
        }
    }
    for (sourceId in after) {
        if (!after.hasOwnProperty(sourceId))
            continue;
        const source = after[sourceId];
        if (!before.hasOwnProperty(sourceId)) {
            addSource(sourceId, after, commands);
        } else if (!deepEqual(before[sourceId], source)) {
            if (before[sourceId].type === 'geojson' && source.type === 'geojson' && canUpdateGeoJSON(before, after, sourceId)) {
                commands.push({
                    command: operations.setGeoJSONSourceData,
                    args: [
                        sourceId,
                        source.data
                    ]
                });
            } else {
                updateSource(sourceId, after, commands, sourcesRemoved);
            }
        }
    }
}
function diffLayerPropertyChanges(before, after, commands, layerId, klass, command) {
    before = before || {};
    after = after || {};
    let prop;
    for (prop in before) {
        if (!before.hasOwnProperty(prop))
            continue;
        if (!deepEqual(before[prop], after[prop])) {
            commands.push({
                command,
                args: [
                    layerId,
                    prop,
                    after[prop],
                    klass
                ]
            });
        }
    }
    for (prop in after) {
        if (!after.hasOwnProperty(prop) || before.hasOwnProperty(prop))
            continue;
        if (!deepEqual(before[prop], after[prop])) {
            commands.push({
                command,
                args: [
                    layerId,
                    prop,
                    after[prop],
                    klass
                ]
            });
        }
    }
}
function pluckId(item) {
    return item.id;
}
function indexById(group, item) {
    group[item.id] = item;
    return group;
}
function diffLayers(before, after, commands) {
    before = before || [];
    after = after || [];
    const beforeOrder = before.map(pluckId);
    const afterOrder = after.map(pluckId);
    const beforeIndex = before.reduce(indexById, {});
    const afterIndex = after.reduce(indexById, {});
    const tracker = beforeOrder.slice();
    const clean = /* @__PURE__ */
    Object.create(null);
    let i, d, layerId, beforeLayer, afterLayer, insertBeforeLayerId, prop;
    for (i = 0, d = 0; i < beforeOrder.length; i++) {
        layerId = beforeOrder[i];
        if (!afterIndex.hasOwnProperty(layerId)) {
            commands.push({
                command: operations.removeLayer,
                args: [layerId]
            });
            tracker.splice(tracker.indexOf(layerId, d), 1);
        } else {
            d++;
        }
    }
    for (i = 0, d = 0; i < afterOrder.length; i++) {
        layerId = afterOrder[afterOrder.length - 1 - i];
        if (tracker[tracker.length - 1 - i] === layerId)
            continue;
        if (beforeIndex.hasOwnProperty(layerId)) {
            commands.push({
                command: operations.removeLayer,
                args: [layerId]
            });
            tracker.splice(tracker.lastIndexOf(layerId, tracker.length - d), 1);
        } else {
            d++;
        }
        insertBeforeLayerId = tracker[tracker.length - i];
        commands.push({
            command: operations.addLayer,
            args: [
                afterIndex[layerId],
                insertBeforeLayerId
            ]
        });
        tracker.splice(tracker.length - i, 0, layerId);
        clean[layerId] = true;
    }
    for (i = 0; i < afterOrder.length; i++) {
        layerId = afterOrder[i];
        beforeLayer = beforeIndex[layerId];
        afterLayer = afterIndex[layerId];
        if (clean[layerId] || deepEqual(beforeLayer, afterLayer))
            continue;
        if (!deepEqual(beforeLayer.source, afterLayer.source) || !deepEqual(beforeLayer['source-layer'], afterLayer['source-layer']) || !deepEqual(beforeLayer.type, afterLayer.type)) {
            commands.push({
                command: operations.removeLayer,
                args: [layerId]
            });
            insertBeforeLayerId = tracker[tracker.lastIndexOf(layerId) + 1];
            commands.push({
                command: operations.addLayer,
                args: [
                    afterLayer,
                    insertBeforeLayerId
                ]
            });
            continue;
        }
        diffLayerPropertyChanges(beforeLayer.layout, afterLayer.layout, commands, layerId, null, operations.setLayoutProperty);
        diffLayerPropertyChanges(beforeLayer.paint, afterLayer.paint, commands, layerId, null, operations.setPaintProperty);
        if (!deepEqual(beforeLayer.slot, afterLayer.slot)) {
            commands.push({
                command: operations.setSlot,
                args: [
                    layerId,
                    afterLayer.slot
                ]
            });
        }
        if (!deepEqual(beforeLayer.filter, afterLayer.filter)) {
            commands.push({
                command: operations.setFilter,
                args: [
                    layerId,
                    afterLayer.filter
                ]
            });
        }
        if (!deepEqual(beforeLayer.minzoom, afterLayer.minzoom) || !deepEqual(beforeLayer.maxzoom, afterLayer.maxzoom)) {
            commands.push({
                command: operations.setLayerZoomRange,
                args: [
                    layerId,
                    afterLayer.minzoom,
                    afterLayer.maxzoom
                ]
            });
        }
        for (prop in beforeLayer) {
            if (!beforeLayer.hasOwnProperty(prop))
                continue;
            if (prop === 'layout' || prop === 'paint' || prop === 'filter' || prop === 'metadata' || prop === 'minzoom' || prop === 'maxzoom' || prop === 'slot')
                continue;
            if (prop.indexOf('paint.') === 0) {
                diffLayerPropertyChanges(beforeLayer[prop], afterLayer[prop], commands, layerId, prop.slice(6), operations.setPaintProperty);
            } else if (!deepEqual(beforeLayer[prop], afterLayer[prop])) {
                commands.push({
                    command: operations.setLayerProperty,
                    args: [
                        layerId,
                        prop,
                        afterLayer[prop]
                    ]
                });
            }
        }
        for (prop in afterLayer) {
            if (!afterLayer.hasOwnProperty(prop) || beforeLayer.hasOwnProperty(prop))
                continue;
            if (prop === 'layout' || prop === 'paint' || prop === 'filter' || prop === 'metadata' || prop === 'minzoom' || prop === 'maxzoom' || prop === 'slot')
                continue;
            if (prop.indexOf('paint.') === 0) {
                diffLayerPropertyChanges(beforeLayer[prop], afterLayer[prop], commands, layerId, prop.slice(6), operations.setPaintProperty);
            } else if (!deepEqual(beforeLayer[prop], afterLayer[prop])) {
                commands.push({
                    command: operations.setLayerProperty,
                    args: [
                        layerId,
                        prop,
                        afterLayer[prop]
                    ]
                });
            }
        }
    }
}
function diffImports(before = [], after = [], commands) {
    before = before || [];
    after = after || [];
    const beforeOrder = before.map(pluckId);
    const afterOrder = after.map(pluckId);
    const beforeIndex = before.reduce(indexById, {});
    const afterIndex = after.reduce(indexById, {});
    const tracker = beforeOrder.slice();
    let i, d, importId, insertBefore;
    for (i = 0, d = 0; i < beforeOrder.length; i++) {
        importId = beforeOrder[i];
        if (!afterIndex.hasOwnProperty(importId)) {
            commands.push({
                command: operations.removeImport,
                args: [importId]
            });
            tracker.splice(tracker.indexOf(importId, d), 1);
        } else {
            d++;
        }
    }
    for (i = 0, d = 0; i < afterOrder.length; i++) {
        importId = afterOrder[afterOrder.length - 1 - i];
        if (tracker[tracker.length - 1 - i] === importId)
            continue;
        if (beforeIndex.hasOwnProperty(importId)) {
            commands.push({
                command: operations.removeImport,
                args: [importId]
            });
            tracker.splice(tracker.lastIndexOf(importId, tracker.length - d), 1);
        } else {
            d++;
        }
        insertBefore = tracker[tracker.length - i];
        commands.push({
            command: operations.addImport,
            args: [
                afterIndex[importId],
                insertBefore
            ]
        });
        tracker.splice(tracker.length - i, 0, importId);
    }
    for (const afterImport of after) {
        const beforeImport = beforeIndex[afterImport.id];
        if (!beforeImport || deepEqual(beforeImport, afterImport))
            continue;
        commands.push({
            command: operations.updateImport,
            args: [
                afterImport.id,
                afterImport
            ]
        });
    }
}
function diffStyles(before, after) {
    if (!before)
        return [{
                command: operations.setStyle,
                args: [after]
            }];
    let commands = [];
    try {
        if (!deepEqual(before.version, after.version)) {
            return [{
                    command: operations.setStyle,
                    args: [after]
                }];
        }
        if (!deepEqual(before.center, after.center)) {
            commands.push({
                command: operations.setCenter,
                args: [after.center]
            });
        }
        if (!deepEqual(before.zoom, after.zoom)) {
            commands.push({
                command: operations.setZoom,
                args: [after.zoom]
            });
        }
        if (!deepEqual(before.bearing, after.bearing)) {
            commands.push({
                command: operations.setBearing,
                args: [after.bearing]
            });
        }
        if (!deepEqual(before.pitch, after.pitch)) {
            commands.push({
                command: operations.setPitch,
                args: [after.pitch]
            });
        }
        if (!deepEqual(before.sprite, after.sprite)) {
            commands.push({
                command: operations.setSprite,
                args: [after.sprite]
            });
        }
        if (!deepEqual(before.glyphs, after.glyphs)) {
            commands.push({
                command: operations.setGlyphs,
                args: [after.glyphs]
            });
        }
        if (!deepEqual(before.imports, after.imports)) {
            diffImports(before.imports, after.imports, commands);
        }
        if (!deepEqual(before.transition, after.transition)) {
            commands.push({
                command: operations.setTransition,
                args: [after.transition]
            });
        }
        if (!deepEqual(before.light, after.light)) {
            commands.push({
                command: operations.setLight,
                args: [after.light]
            });
        }
        if (!deepEqual(before.fog, after.fog)) {
            commands.push({
                command: operations.setFog,
                args: [after.fog]
            });
        }
        if (!deepEqual(before.snow, after.snow)) {
            commands.push({
                command: operations.setSnow,
                args: [after.snow]
            });
        }
        if (!deepEqual(before.rain, after.rain)) {
            commands.push({
                command: operations.setRain,
                args: [after.rain]
            });
        }
        if (!deepEqual(before.projection, after.projection)) {
            commands.push({
                command: operations.setProjection,
                args: [after.projection]
            });
        }
        if (!deepEqual(before.lights, after.lights)) {
            commands.push({
                command: operations.setLights,
                args: [after.lights]
            });
        }
        if (!deepEqual(before.camera, after.camera)) {
            commands.push({
                command: operations.setCamera,
                args: [after.camera]
            });
        }
        if (!deepEqual(before['color-theme'], after['color-theme'])) {
            return [{
                    command: operations.setStyle,
                    args: [after]
                }];
        }
        const sourcesRemoved = {};
        const removeOrAddSourceCommands = [];
        diffSources(before.sources, after.sources, removeOrAddSourceCommands, sourcesRemoved);
        const beforeLayers = [];
        if (before.layers) {
            before.layers.forEach(layer => {
                if (layer.source && sourcesRemoved[layer.source]) {
                    commands.push({
                        command: operations.removeLayer,
                        args: [layer.id]
                    });
                } else {
                    beforeLayers.push(layer);
                }
            });
        }
        let beforeTerrain = before.terrain;
        if (beforeTerrain) {
            if (sourcesRemoved[beforeTerrain.source]) {
                commands.push({
                    command: operations.setTerrain,
                    args: [void 0]
                });
                beforeTerrain = void 0;
            }
        }
        commands = commands.concat(removeOrAddSourceCommands);
        if (!deepEqual(beforeTerrain, after.terrain)) {
            commands.push({
                command: operations.setTerrain,
                args: [after.terrain]
            });
        }
        diffLayers(beforeLayers, after.layers, commands);
    } catch (e) {
        console.warn('Unable to compute style diff:', e);
        commands = [{
                command: operations.setStyle,
                args: [after]
            }];
    }
    return commands;
}

class ValidationError {
    constructor(key, value, message, identifier) {
        this.message = (key ? `${ key }: ` : '') + message;
        if (identifier)
            this.identifier = identifier;
        if (value !== null && value !== void 0 && value.__line__) {
            this.line = value.__line__;
        }
    }
}
class ValidationWarning extends ValidationError {
}

class ParsingError {
    constructor(error) {
        this.error = error;
        this.message = error.message;
        const match = error.message.match(/line (\d+)/);
        this.line = match ? parseInt(match[1], 10) : 0;
    }
}

function validateObject(options) {
    const key = options.key;
    const object = options.value;
    const elementSpecs = options.valueSpec || {};
    const elementValidators = options.objectElementValidators || {};
    const style = options.style;
    const styleSpec = options.styleSpec;
    let errors = [];
    const type = getType(object);
    if (type !== 'object') {
        return [new ValidationError(key, object, `object expected, ${ type } found`)];
    }
    for (const objectKey in object) {
        const elementSpecKey = objectKey.split('.')[0];
        const elementSpec = elementSpecs[elementSpecKey] || elementSpecs['*'];
        let validateElement;
        if (elementValidators[elementSpecKey]) {
            validateElement = elementValidators[elementSpecKey];
        } else if (elementSpecs[elementSpecKey]) {
            validateElement = validate;
        } else if (elementValidators['*']) {
            validateElement = elementValidators['*'];
        } else if (elementSpecs['*']) {
            validateElement = validate;
        }
        if (!validateElement) {
            errors.push(new ValidationWarning(key, object[objectKey], `unknown property "${ objectKey }"`));
            continue;
        }
        errors = errors.concat(validateElement({
            key: (key ? `${ key }.` : key) + objectKey,
            value: object[objectKey],
            valueSpec: elementSpec,
            style,
            styleSpec,
            object,
            objectKey
        }, object));
    }
    for (const elementSpecKey in elementSpecs) {
        if (elementValidators[elementSpecKey]) {
            continue;
        }
        if (elementSpecs[elementSpecKey].required && elementSpecs[elementSpecKey]['default'] === void 0 && object[elementSpecKey] === void 0) {
            errors.push(new ValidationError(key, object, `missing required property "${ elementSpecKey }"`));
        }
    }
    return errors;
}

function validateImport(options) {
    const {value, styleSpec} = options;
    const {data, ...importSpec} = value;
    Object.defineProperty(importSpec, '__line__', {
        value: value.__line__,
        enumerable: false
    });
    let errors = validateObject(extend({}, options, {
        value: importSpec,
        valueSpec: styleSpec.import
    }));
    if (unbundle(importSpec.id) === '') {
        const key = `${ options.key }.id`;
        errors.push(new ValidationError(key, importSpec, `import id can't be an empty string`));
    }
    if (data) {
        const key = `${ options.key }.data`;
        errors = errors.concat(validateStyle$2(data, styleSpec, { key }));
    }
    return errors;
}

function validateArray(options) {
    const array = options.value;
    const arraySpec = options.valueSpec;
    const style = options.style;
    const styleSpec = options.styleSpec;
    const key = options.key;
    const validateArrayElement = options.arrayElementValidator || validate;
    if (getType(array) !== 'array') {
        return [new ValidationError(key, array, `array expected, ${ getType(array) } found`)];
    }
    if (arraySpec.length && array.length !== arraySpec.length) {
        return [new ValidationError(key, array, `array length ${ arraySpec.length } expected, length ${ array.length } found`)];
    }
    if (arraySpec['min-length'] && array.length < arraySpec['min-length']) {
        return [new ValidationError(key, array, `array length at least ${ arraySpec['min-length'] } expected, length ${ array.length } found`)];
    }
    let arrayElementSpec = {
        'type': arraySpec.value,
        'values': arraySpec.values,
        'minimum': arraySpec.minimum,
        'maximum': arraySpec.maximum,
        function: void 0
    };
    if (styleSpec.$version < 7) {
        arrayElementSpec.function = arraySpec.function;
    }
    if (getType(arraySpec.value) === 'object') {
        arrayElementSpec = arraySpec.value;
    }
    let errors = [];
    for (let i = 0; i < array.length; i++) {
        errors = errors.concat(validateArrayElement({
            array,
            arrayIndex: i,
            value: array[i],
            valueSpec: arrayElementSpec,
            style,
            styleSpec,
            key: `${ key }[${ i }]`
        }, true));
    }
    return errors;
}

function validateNumber(options) {
    const key = options.key;
    const value = options.value;
    const valueSpec = options.valueSpec;
    let type = getType(value);
    if (type === 'number' && value !== value) {
        type = 'NaN';
    }
    if (type !== 'number') {
        return [new ValidationError(key, value, `number expected, ${ type } found`)];
    }
    if ('minimum' in valueSpec) {
        let specMin = valueSpec.minimum;
        if (getType(valueSpec.minimum) === 'array') {
            const i = options.arrayIndex;
            specMin = valueSpec.minimum[i];
        }
        if (value < specMin) {
            return [new ValidationError(key, value, `${ value } is less than the minimum value ${ specMin }`)];
        }
    }
    if ('maximum' in valueSpec) {
        let specMax = valueSpec.maximum;
        if (getType(valueSpec.maximum) === 'array') {
            const i = options.arrayIndex;
            specMax = valueSpec.maximum[i];
        }
        if (value > specMax) {
            return [new ValidationError(key, value, `${ value } is greater than the maximum value ${ specMax }`)];
        }
    }
    return [];
}

function validateFunction(options) {
    const functionValueSpec = options.valueSpec;
    const functionType = unbundle(options.value.type);
    let stopKeyType;
    let stopDomainValues = {};
    let previousStopDomainValue;
    let previousStopDomainZoom;
    const isZoomFunction = functionType !== 'categorical' && options.value.property === void 0;
    const isPropertyFunction = !isZoomFunction;
    const isZoomAndPropertyFunction = getType(options.value.stops) === 'array' && getType(options.value.stops[0]) === 'array' && getType(options.value.stops[0][0]) === 'object';
    const errors = validateObject({
        key: options.key,
        value: options.value,
        valueSpec: options.styleSpec.function,
        style: options.style,
        styleSpec: options.styleSpec,
        objectElementValidators: {
            stops: validateFunctionStops,
            default: validateFunctionDefault
        }
    });
    if (functionType === 'identity' && isZoomFunction) {
        errors.push(new ValidationError(options.key, options.value, 'missing required property "property"'));
    }
    if (functionType !== 'identity' && !options.value.stops) {
        errors.push(new ValidationError(options.key, options.value, 'missing required property "stops"'));
    }
    if (functionType === 'exponential' && options.valueSpec.expression && !supportsInterpolation(options.valueSpec)) {
        errors.push(new ValidationError(options.key, options.value, 'exponential functions not supported'));
    }
    if (options.styleSpec.$version >= 8) {
        if (isPropertyFunction && !supportsPropertyExpression(options.valueSpec)) {
            errors.push(new ValidationError(options.key, options.value, 'property functions not supported'));
        } else if (isZoomFunction && !supportsZoomExpression(options.valueSpec)) {
            errors.push(new ValidationError(options.key, options.value, 'zoom functions not supported'));
        }
    }
    if ((functionType === 'categorical' || isZoomAndPropertyFunction) && options.value.property === void 0) {
        errors.push(new ValidationError(options.key, options.value, '"property" property is required'));
    }
    return errors;
    function validateFunctionStops(options2) {
        if (functionType === 'identity') {
            return [new ValidationError(options2.key, options2.value, 'identity function may not have a "stops" property')];
        }
        let errors2 = [];
        const value = options2.value;
        errors2 = errors2.concat(validateArray({
            key: options2.key,
            value,
            valueSpec: options2.valueSpec,
            style: options2.style,
            styleSpec: options2.styleSpec,
            arrayElementValidator: validateFunctionStop
        }));
        if (getType(value) === 'array' && value.length === 0) {
            errors2.push(new ValidationError(options2.key, value, 'array must have at least one stop'));
        }
        return errors2;
    }
    function validateFunctionStop(options2) {
        let errors2 = [];
        const value = options2.value;
        const key = options2.key;
        if (getType(value) !== 'array') {
            return [new ValidationError(key, value, `array expected, ${ getType(value) } found`)];
        }
        if (value.length !== 2) {
            return [new ValidationError(key, value, `array length 2 expected, length ${ value.length } found`)];
        }
        if (isZoomAndPropertyFunction) {
            if (getType(value[0]) !== 'object') {
                return [new ValidationError(key, value, `object expected, ${ getType(value[0]) } found`)];
            }
            if (value[0].zoom === void 0) {
                return [new ValidationError(key, value, 'object stop key must have zoom')];
            }
            if (value[0].value === void 0) {
                return [new ValidationError(key, value, 'object stop key must have value')];
            }
            const nextStopDomainZoom = unbundle(value[0].zoom);
            if (typeof nextStopDomainZoom !== 'number') {
                return [new ValidationError(key, value[0].zoom, 'stop zoom values must be numbers')];
            }
            if (previousStopDomainZoom && previousStopDomainZoom > nextStopDomainZoom) {
                return [new ValidationError(key, value[0].zoom, 'stop zoom values must appear in ascending order')];
            }
            if (nextStopDomainZoom !== previousStopDomainZoom) {
                previousStopDomainZoom = nextStopDomainZoom;
                previousStopDomainValue = void 0;
                stopDomainValues = {};
            }
            errors2 = errors2.concat(validateObject({
                key: `${ key }[0]`,
                value: value[0],
                valueSpec: { zoom: {} },
                style: options2.style,
                styleSpec: options2.styleSpec,
                objectElementValidators: {
                    zoom: validateNumber,
                    value: validateStopDomainValue
                }
            }));
        } else {
            errors2 = errors2.concat(validateStopDomainValue({
                key: `${ key }[0]`,
                value: value[0],
                valueSpec: {},
                style: options2.style,
                styleSpec: options2.styleSpec
            }, value));
        }
        if (isExpression(deepUnbundle(value[1]))) {
            return errors2.concat([new ValidationError(`${ key }[1]`, value[1], 'expressions are not allowed in function stops.')]);
        }
        return errors2.concat(validate({
            key: `${ key }[1]`,
            value: value[1],
            valueSpec: functionValueSpec,
            style: options2.style,
            styleSpec: options2.styleSpec
        }));
    }
    function validateStopDomainValue(options2, stop) {
        const type = getType(options2.value);
        const value = unbundle(options2.value);
        const reportValue = options2.value !== null ? options2.value : stop;
        if (!stopKeyType) {
            stopKeyType = type;
        } else if (type !== stopKeyType) {
            return [new ValidationError(options2.key, reportValue, `${ type } stop domain type must match previous stop domain type ${ stopKeyType }`)];
        }
        if (type !== 'number' && type !== 'string' && type !== 'boolean' && typeof value !== 'number' && typeof value !== 'string' && typeof value !== 'boolean') {
            return [new ValidationError(options2.key, reportValue, 'stop domain value must be a number, string, or boolean')];
        }
        if (type !== 'number' && functionType !== 'categorical') {
            let message = `number expected, ${ type } found`;
            if (supportsPropertyExpression(functionValueSpec) && functionType === void 0) {
                message += '\nIf you intended to use a categorical function, specify `"type": "categorical"`.';
            }
            return [new ValidationError(options2.key, reportValue, message)];
        }
        if (functionType === 'categorical' && type === 'number' && (typeof value !== 'number' || !isFinite(value) || Math.floor(value) !== value)) {
            return [new ValidationError(options2.key, reportValue, `integer expected, found ${ String(value) }`)];
        }
        if (functionType !== 'categorical' && type === 'number' && typeof value === 'number' && typeof previousStopDomainValue === 'number' && previousStopDomainValue !== void 0 && value < previousStopDomainValue) {
            return [new ValidationError(options2.key, reportValue, 'stop domain values must appear in ascending order')];
        } else {
            previousStopDomainValue = value;
        }
        if (functionType === 'categorical' && value in stopDomainValues) {
            return [new ValidationError(options2.key, reportValue, 'stop domain values must be unique')];
        } else {
            stopDomainValues[value] = true;
        }
        return [];
    }
    function validateFunctionDefault(options2) {
        return validate({
            key: options2.key,
            value: options2.value,
            valueSpec: functionValueSpec,
            style: options2.style,
            styleSpec: options2.styleSpec
        });
    }
}

function validateExpression(options) {
    const expression = (options.expressionContext === 'property' ? createPropertyExpression : createExpression)(deepUnbundle(options.value), options.valueSpec);
    if (expression.result === 'error') {
        return expression.value.map(error => {
            return new ValidationError(`${ options.key }${ error.key }`, options.value, error.message);
        });
    }
    const expressionObj = expression.value.expression || expression.value._styleExpression.expression;
    if (options.expressionContext === 'property' && options.propertyKey === 'text-font' && !expressionObj.outputDefined()) {
        return [new ValidationError(options.key, options.value, `Invalid data expression for "${ options.propertyKey }". Output values must be contained as literals within the expression.`)];
    }
    if (options.expressionContext === 'property' && options.propertyType === 'layout' && !isStateConstant(expressionObj)) {
        return [new ValidationError(options.key, options.value, '"feature-state" data expressions are not supported with layout properties.')];
    }
    if (options.expressionContext === 'filter') {
        return disallowedFilterParameters(expressionObj, options);
    }
    if (options.expressionContext && options.expressionContext.indexOf('cluster') === 0) {
        if (!isGlobalPropertyConstant(expressionObj, [
                'zoom',
                'feature-state'
            ])) {
            return [new ValidationError(options.key, options.value, '"zoom" and "feature-state" expressions are not supported with cluster properties.')];
        }
        if (options.expressionContext === 'cluster-initial' && !isFeatureConstant(expressionObj)) {
            return [new ValidationError(options.key, options.value, 'Feature data expressions are not supported with initial expression part of cluster properties.')];
        }
    }
    return [];
}
function disallowedFilterParameters(e, options) {
    const disallowedParameters = /* @__PURE__ */
    new Set([
        'zoom',
        'feature-state',
        'pitch',
        'distance-from-center'
    ]);
    if (options.valueSpec && options.valueSpec.expression) {
        for (const param of options.valueSpec.expression.parameters) {
            disallowedParameters.delete(param);
        }
    }
    if (disallowedParameters.size === 0) {
        return [];
    }
    const errors = [];
    if (e instanceof CompoundExpression) {
        if (disallowedParameters.has(e.name)) {
            return [new ValidationError(options.key, options.value, `["${ e.name }"] expression is not supported in a filter for a ${ options.object.type } layer with id: ${ options.object.id }`)];
        }
    }
    e.eachChild(arg => {
        errors.push(...disallowedFilterParameters(arg, options));
    });
    return errors;
}

function validateBoolean(options) {
    const value = options.value;
    const key = options.key;
    const type = getType(value);
    if (type !== 'boolean') {
        return [new ValidationError(key, value, `boolean expected, ${ type } found`)];
    }
    return [];
}

function validateColor(options) {
    const key = options.key;
    const value = options.value;
    const type = getType(value);
    if (type !== 'string') {
        return [new ValidationError(key, value, `color expected, ${ type } found`)];
    }
    if (csscolorparserExports.parseCSSColor(value) === null) {
        return [new ValidationError(key, value, `color expected, "${ value }" found`)];
    }
    return [];
}

function validateEnum(options) {
    const key = options.key;
    const value = options.value;
    const valueSpec = options.valueSpec;
    const errors = [];
    if (Array.isArray(valueSpec.values)) {
        if (valueSpec.values.indexOf(unbundle(value)) === -1) {
            errors.push(new ValidationError(key, value, `expected one of [${ valueSpec.values.join(', ') }], ${ JSON.stringify(value) } found`));
        }
    } else {
        if (Object.keys(valueSpec.values).indexOf(unbundle(value)) === -1) {
            errors.push(new ValidationError(key, value, `expected one of [${ Object.keys(valueSpec.values).join(', ') }], ${ JSON.stringify(value) } found`));
        }
    }
    return errors;
}

function validateFilter(options) {
    if (isExpressionFilter(deepUnbundle(options.value))) {
        const layerType = options.layerType || 'fill';
        return validateExpression(extend({}, options, {
            expressionContext: 'filter',
            valueSpec: options.styleSpec[`filter_${ layerType }`]
        }));
    } else {
        return validateNonExpressionFilter(options);
    }
}
function validateNonExpressionFilter(options) {
    const value = options.value;
    const key = options.key;
    if (getType(value) !== 'array') {
        return [new ValidationError(key, value, `array expected, ${ getType(value) } found`)];
    }
    const styleSpec = options.styleSpec;
    let type;
    let errors = [];
    if (value.length < 1) {
        return [new ValidationError(key, value, 'filter array must have at least 1 element')];
    }
    errors = errors.concat(validateEnum({
        key: `${ key }[0]`,
        value: value[0],
        valueSpec: styleSpec.filter_operator,
        style: options.style,
        styleSpec: options.styleSpec
    }));
    switch (unbundle(value[0])) {
    case '<':
    case '<=':
    case '>':
    // @ts-expect-error - falls through
    case '>=':
        if (value.length >= 2 && unbundle(value[1]) === '$type') {
            errors.push(new ValidationError(key, value, `"$type" cannot be use with operator "${ value[0] }"`));
        }
    /* falls through */
    case '==':
    // @ts-expect-error - falls through
    case '!=':
        if (value.length !== 3) {
            errors.push(new ValidationError(key, value, `filter array for operator "${ value[0] }" must have 3 elements`));
        }
    /* falls through */
    case 'in':
    case '!in':
        if (value.length >= 2) {
            type = getType(value[1]);
            if (type !== 'string') {
                errors.push(new ValidationError(`${ key }[1]`, value[1], `string expected, ${ type } found`));
            }
        }
        for (let i = 2; i < value.length; i++) {
            type = getType(value[i]);
            if (unbundle(value[1]) === '$type') {
                errors = errors.concat(validateEnum({
                    key: `${ key }[${ i }]`,
                    value: value[i],
                    valueSpec: styleSpec.geometry_type,
                    style: options.style,
                    styleSpec: options.styleSpec
                }));
            } else if (type !== 'string' && type !== 'number' && type !== 'boolean') {
                errors.push(new ValidationError(`${ key }[${ i }]`, value[i], `string, number, or boolean expected, ${ type } found`));
            }
        }
        break;
    case 'any':
    case 'all':
    case 'none':
        for (let i = 1; i < value.length; i++) {
            errors = errors.concat(validateNonExpressionFilter({
                key: `${ key }[${ i }]`,
                value: value[i],
                style: options.style,
                styleSpec: options.styleSpec
            }));
        }
        break;
    case 'has':
    case '!has':
        type = getType(value[1]);
        if (value.length !== 2) {
            errors.push(new ValidationError(key, value, `filter array for "${ value[0] }" operator must have 2 elements`));
        } else if (type !== 'string') {
            errors.push(new ValidationError(`${ key }[1]`, value[1], `string expected, ${ type } found`));
        }
        break;
    }
    return errors;
}

function validateProperty(options, propertyType) {
    const key = options.key;
    const style = options.style;
    const layer = options.layer;
    const styleSpec = options.styleSpec;
    const value = options.value;
    const propertyKey = options.objectKey;
    const layerSpec = styleSpec[`${ propertyType }_${ options.layerType }`];
    if (!layerSpec)
        return [];
    const useThemeMatch = propertyKey.match(/^(.*)-use-theme$/);
    if (propertyType === 'paint' && useThemeMatch && layerSpec[useThemeMatch[1]]) {
        return validate({
            key,
            value,
            valueSpec: { type: 'string' },
            style,
            styleSpec
        });
    }
    const transitionMatch = propertyKey.match(/^(.*)-transition$/);
    if (propertyType === 'paint' && transitionMatch && layerSpec[transitionMatch[1]] && layerSpec[transitionMatch[1]].transition) {
        return validate({
            key,
            value,
            valueSpec: styleSpec.transition,
            style,
            styleSpec
        });
    }
    const valueSpec = options.valueSpec || layerSpec[propertyKey];
    if (!valueSpec) {
        return [new ValidationWarning(key, value, `unknown property "${ propertyKey }"`)];
    }
    let tokenMatch;
    if (getType(value) === 'string' && supportsPropertyExpression(valueSpec) && !valueSpec.tokens && (tokenMatch = /^{([^}]+)}$/.exec(value))) {
        const example = `\`{ "type": "identity", "property": ${ tokenMatch ? JSON.stringify(tokenMatch[1]) : '"_"' } }\``;
        return [new ValidationError(key, value, `"${ propertyKey }" does not support interpolation syntax
Use an identity property function instead: ${ example }.`)];
    }
    const errors = [];
    if (options.layerType === 'symbol') {
        if (propertyKey === 'text-field' && style && !style.glyphs && !style.imports) {
            errors.push(new ValidationError(key, value, 'use of "text-field" requires a style "glyphs" property'));
        }
        if (propertyKey === 'text-font' && isFunction(deepUnbundle(value)) && unbundle(value.type) === 'identity') {
            errors.push(new ValidationError(key, value, '"text-font" does not support identity functions'));
        }
    } else if (options.layerType === 'model' && propertyType === 'paint' && layer && layer.layout && layer.layout.hasOwnProperty('model-id')) {
        if (supportsPropertyExpression(valueSpec) && (supportsLightExpression(valueSpec) || supportsZoomExpression(valueSpec))) {
            const expression = createPropertyExpression(deepUnbundle(value), valueSpec);
            const expressionObj = expression.value.expression || expression.value._styleExpression.expression;
            if (expressionObj && !isGlobalPropertyConstant(expressionObj, ['measure-light'])) {
                if (propertyKey !== 'model-emissive-strength' || (!isFeatureConstant(expressionObj) || !isStateConstant(expressionObj))) {
                    errors.push(new ValidationError(key, value, `${ propertyKey } does not support measure-light expressions when the model layer source is vector tile or GeoJSON.`));
                }
            }
        }
    }
    return errors.concat(validate({
        key: options.key,
        value,
        valueSpec,
        style,
        styleSpec,
        // @ts-expect-error - TS2353 - Object literal may only specify known properties, and 'expressionContext' does not exist in type 'ValidationOptions'.
        expressionContext: 'property',
        propertyType,
        propertyKey
    }));
}

function validatePaintProperty(options) {
    return validateProperty(options, 'paint');
}

function validateLayoutProperty(options) {
    return validateProperty(options, 'layout');
}

function validateLayer(options) {
    let errors = [];
    const layer = options.value;
    const key = options.key;
    const style = options.style;
    const styleSpec = options.styleSpec;
    if (!layer.type && !layer.ref) {
        errors.push(new ValidationError(key, layer, 'either "type" or "ref" is required'));
    }
    let type = unbundle(layer.type);
    const ref = unbundle(layer.ref);
    if (layer.id) {
        const layerId = unbundle(layer.id);
        for (let i = 0; i < options.arrayIndex; i++) {
            const otherLayer = style.layers[i];
            if (unbundle(otherLayer.id) === layerId) {
                errors.push(new ValidationError(key, layer.id, `duplicate layer id "${ layer.id }", previously used at line ${ otherLayer.id.__line__ }`));
            }
        }
    }
    if ('ref' in layer) {
        [
            'type',
            'source',
            'source-layer',
            'filter',
            'layout'
        ].forEach(p => {
            if (p in layer) {
                errors.push(new ValidationError(key, layer[p], `"${ p }" is prohibited for ref layers`));
            }
        });
        let parent;
        style.layers.forEach(layer2 => {
            if (unbundle(layer2.id) === ref)
                parent = layer2;
        });
        if (!parent) {
            if (typeof ref === 'string')
                errors.push(new ValidationError(key, layer.ref, `ref layer "${ ref }" not found`));
        } else if (parent.ref) {
            errors.push(new ValidationError(key, layer.ref, 'ref cannot reference another ref layer'));
        } else {
            type = unbundle(parent.type);
        }
    } else if (!(type === 'background' || type === 'sky' || type === 'slot')) {
        if (!layer.source) {
            errors.push(new ValidationError(key, layer, 'missing required property "source"'));
        } else {
            const source = style.sources && style.sources[layer.source];
            const sourceType = source && unbundle(source.type);
            if (!source) {
                errors.push(new ValidationError(key, layer.source, `source "${ layer.source }" not found`));
            } else if (sourceType === 'vector' && type === 'raster') {
                errors.push(new ValidationError(key, layer.source, `layer "${ layer.id }" requires a raster source`));
            } else if (sourceType === 'raster' && type !== 'raster') {
                errors.push(new ValidationError(key, layer.source, `layer "${ layer.id }" requires a vector source`));
            } else if (sourceType === 'vector' && !layer['source-layer']) {
                errors.push(new ValidationError(key, layer, `layer "${ layer.id }" must specify a "source-layer"`));
            } else if (sourceType === 'raster-dem' && type !== 'hillshade') {
                errors.push(new ValidationError(key, layer.source, 'raster-dem source can only be used with layer type \'hillshade\'.'));
            } else if (sourceType === 'raster-array' && ![
                    'raster',
                    'raster-particle'
                ].includes(type)) {
                errors.push(new ValidationError(key, layer.source, `raster-array source can only be used with layer type 'raster'.`));
            } else if (type === 'line' && layer.paint && (layer.paint['line-gradient'] || layer.paint['line-trim-offset']) && (sourceType !== 'geojson' || !source.lineMetrics)) {
                errors.push(new ValidationError(key, layer, `layer "${ layer.id }" specifies a line-gradient, which requires a GeoJSON source with \`lineMetrics\` enabled.`));
            } else if (type === 'raster-particle' && sourceType !== 'raster-array') {
                errors.push(new ValidationError(key, layer.source, `layer "${ layer.id }" requires a 'raster-array' source.`));
            }
        }
    }
    errors = errors.concat(validateObject({
        key,
        value: layer,
        valueSpec: styleSpec.layer,
        style: options.style,
        styleSpec: options.styleSpec,
        objectElementValidators: {
            '*'() {
                return [];
            },
            // We don't want to enforce the spec's `"requires": true` for backward compatibility with refs;
            // the actual requirement is validated above. See https://github.com/mapbox/mapbox-gl-js/issues/5772.
            type() {
                return validate({
                    key: `${ key }.type`,
                    value: layer.type,
                    valueSpec: styleSpec.layer.type,
                    style: options.style,
                    styleSpec: options.styleSpec,
                    // @ts-expect-error - TS2353 - Object literal may only specify known properties, and 'object' does not exist in type 'ValidationOptions'.
                    object: layer,
                    objectKey: 'type'
                });
            },
            filter(options2) {
                return validateFilter(extend({ layerType: type }, options2));
            },
            layout(options2) {
                return validateObject({
                    // @ts-expect-error - TS2353 - Object literal may only specify known properties, and 'layer' does not exist in type 'Options'.
                    layer,
                    key: options2.key,
                    value: options2.value,
                    valueSpec: {},
                    style: options2.style,
                    styleSpec: options2.styleSpec,
                    objectElementValidators: {
                        '*'(options3) {
                            return validateLayoutProperty(extend({ layerType: type }, options3));
                        }
                    }
                });
            },
            paint(options2) {
                return validateObject({
                    // @ts-expect-error - TS2353 - Object literal may only specify known properties, and 'layer' does not exist in type 'Options'.
                    layer,
                    key: options2.key,
                    value: options2.value,
                    valueSpec: {},
                    style: options2.style,
                    styleSpec: options2.styleSpec,
                    objectElementValidators: {
                        '*'(options3) {
                            return validatePaintProperty(extend({
                                layerType: type,
                                layer
                            }, options3));
                        }
                    }
                });
            }
        }
    }));
    return errors;
}

function validateString(options) {
    const value = options.value;
    const key = options.key;
    const type = getType(value);
    if (type !== 'string') {
        return [new ValidationError(key, value, `string expected, ${ type } found`)];
    }
    return [];
}

const objectElementValidators = { promoteId: validatePromoteId };
function validateSource(options) {
    const value = options.value;
    const key = options.key;
    const styleSpec = options.styleSpec;
    const style = options.style;
    if (!value.type) {
        return [new ValidationError(key, value, '"type" is required')];
    }
    const type = unbundle(value.type);
    let errors = [];
    if ([
            'vector',
            'raster',
            'raster-dem',
            'raster-array'
        ].includes(type)) {
        if (!value.url && !value.tiles) {
            errors.push(new ValidationWarning(key, value, 'Either "url" or "tiles" is required.'));
        }
    }
    switch (type) {
    case 'vector':
    case 'raster':
    case 'raster-dem':
    case 'raster-array':
        errors = errors.concat(validateObject({
            key,
            value,
            valueSpec: styleSpec[`source_${ type.replace('-', '_') }`],
            style: options.style,
            styleSpec,
            objectElementValidators
        }));
        return errors;
    case 'geojson':
        errors = validateObject({
            key,
            value,
            valueSpec: styleSpec.source_geojson,
            style,
            styleSpec,
            objectElementValidators
        });
        if (value.cluster) {
            for (const prop in value.clusterProperties) {
                const [operator, mapExpr] = value.clusterProperties[prop];
                const reduceExpr = typeof operator === 'string' ? [
                    operator,
                    ['accumulated'],
                    [
                        'get',
                        prop
                    ]
                ] : operator;
                errors.push(...validateExpression({
                    key: `${ key }.${ prop }.map`,
                    value: mapExpr,
                    expressionContext: 'cluster-map'
                }));
                errors.push(...validateExpression({
                    key: `${ key }.${ prop }.reduce`,
                    value: reduceExpr,
                    expressionContext: 'cluster-reduce'
                }));
            }
        }
        return errors;
    case 'video':
        return validateObject({
            key,
            value,
            valueSpec: styleSpec.source_video,
            style,
            styleSpec
        });
    case 'image':
        return validateObject({
            key,
            value,
            valueSpec: styleSpec.source_image,
            style,
            styleSpec
        });
    case 'canvas':
        return [new ValidationError(key, null, `Please use runtime APIs to add canvas sources, rather than including them in stylesheets.`, 'source.canvas')];
    default:
        return validateEnum({
            key: `${ key }.type`,
            value: value.type,
            valueSpec: { values: getSourceTypeValues(styleSpec) },
            style,
            styleSpec
        });
    }
}
function getSourceTypeValues(styleSpec) {
    return styleSpec.source.reduce((memo, source) => {
        const sourceType = styleSpec[source];
        if (sourceType.type.type === 'enum') {
            memo = memo.concat(Object.keys(sourceType.type.values));
        }
        return memo;
    }, []);
}
function validatePromoteId({key, value}) {
    if (getType(value) === 'string') {
        return validateString({
            key,
            value
        });
    } else {
        const errors = [];
        for (const prop in value) {
            errors.push(...validateString({
                key: `${ key }.${ prop }`,
                value: value[prop]
            }));
        }
        return errors;
    }
}

function isValidUrl(str, allowRelativeUrls) {
    const isRelative = str.indexOf('://') === -1;
    try {
        new URL(str, isRelative && allowRelativeUrls ? 'http://example.com' : void 0);
        return true;
    } catch (_) {
        return false;
    }
}
function validateModel(options) {
    const url = options.value;
    let errors = [];
    if (!url) {
        return errors;
    }
    const type = getType(url);
    if (type !== 'string') {
        errors = errors.concat([new ValidationError(options.key, url, `string expected, "${ type }" found`)]);
        return errors;
    }
    if (!isValidUrl(url, true)) {
        errors = errors.concat([new ValidationError(options.key, url, `invalid url "${ url }"`)]);
    }
    return errors;
}

function validateLight(options) {
    const light = options.value;
    const styleSpec = options.styleSpec;
    const lightSpec = styleSpec.light;
    const style = options.style;
    let errors = [];
    const rootType = getType(light);
    if (light === void 0) {
        return errors;
    } else if (rootType !== 'object') {
        errors = errors.concat([new ValidationError('light', light, `object expected, ${ rootType } found`)]);
        return errors;
    }
    for (const key in light) {
        const transitionMatch = key.match(/^(.*)-transition$/);
        const useThemeMatch = key.match(/^(.*)-use-theme$/);
        if (useThemeMatch && lightSpec[useThemeMatch[1]]) {
            errors = errors.concat(validate({
                key,
                value: light[key],
                valueSpec: { type: 'string' },
                style,
                styleSpec
            }));
        } else if (transitionMatch && lightSpec[transitionMatch[1]] && lightSpec[transitionMatch[1]].transition) {
            errors = errors.concat(validate({
                key,
                value: light[key],
                valueSpec: styleSpec.transition,
                style,
                styleSpec
            }));
        } else if (lightSpec[key]) {
            errors = errors.concat(validate({
                key,
                value: light[key],
                valueSpec: lightSpec[key],
                style,
                styleSpec
            }));
        } else {
            errors = errors.concat([new ValidationError(key, light[key], `unknown property "${ key }"`)]);
        }
    }
    return errors;
}

function validateLights(options) {
    const light = options.value;
    let errors = [];
    if (!light) {
        return errors;
    }
    const type = getType(light);
    if (type !== 'object') {
        errors = errors.concat([new ValidationError('light-3d', light, `object expected, ${ type } found`)]);
        return errors;
    }
    const styleSpec = options.styleSpec;
    const lightSpec = styleSpec['light-3d'];
    const key = options.key;
    const style = options.style;
    const lights = options.style.lights;
    for (const key2 of [
            'type',
            'id'
        ]) {
        if (!(key2 in light)) {
            errors = errors.concat([new ValidationError('light-3d', light, `missing property ${ key2 } on light`)]);
            return errors;
        }
    }
    if (light.type && lights) {
        for (let i = 0; i < options.arrayIndex; i++) {
            const lightType2 = unbundle(light.type);
            const otherLight = lights[i];
            if (unbundle(otherLight.type) === lightType2) {
                errors.push(new ValidationError(key, light.id, `duplicate light type "${ light.type }", previously defined at line ${ otherLight.id.__line__ }`));
            }
        }
    }
    const lightType = `properties_light_${ light['type'] }`;
    if (!(lightType in styleSpec)) {
        errors = errors.concat([new ValidationError('light-3d', light, `Invalid light type ${ light['type'] }`)]);
        return errors;
    }
    const lightPropertySpec = styleSpec[lightType];
    for (const key2 in light) {
        if (key2 === 'properties') {
            const properties = light[key2];
            const propertiesType = getType(properties);
            if (propertiesType !== 'object') {
                errors = errors.concat([new ValidationError('properties', properties, `object expected, ${ propertiesType } found`)]);
                return errors;
            }
            for (const propertyKey in properties) {
                if (!lightPropertySpec[propertyKey]) {
                    errors = errors.concat([new ValidationWarning(options.key, properties[propertyKey], `unknown property "${ propertyKey }"`)]);
                } else {
                    errors = errors.concat(validate({
                        key: propertyKey,
                        value: properties[propertyKey],
                        valueSpec: lightPropertySpec[propertyKey],
                        style,
                        styleSpec
                    }));
                }
            }
        } else {
            const transitionMatch = key2.match(/^(.*)-transition$/);
            const useThemeMatch = key2.match(/^(.*)-use-theme$/);
            if (useThemeMatch && lightSpec[useThemeMatch[1]]) {
                errors = errors.concat(validate({
                    key: key2,
                    value: light[key2],
                    valueSpec: { type: 'string' },
                    style,
                    styleSpec
                }));
            } else if (transitionMatch && lightSpec[transitionMatch[1]] && lightSpec[transitionMatch[1]].transition) {
                errors = errors.concat(validate({
                    key: key2,
                    value: light[key2],
                    valueSpec: styleSpec.transition,
                    style,
                    styleSpec
                }));
            } else if (lightSpec[key2]) {
                errors = errors.concat(validate({
                    key: key2,
                    value: light[key2],
                    valueSpec: lightSpec[key2],
                    style,
                    styleSpec
                }));
            } else {
                errors = errors.concat([new ValidationWarning(key2, light[key2], `unknown property "${ key2 }"`)]);
            }
        }
    }
    return errors;
}

function validateTerrain(options) {
    const terrain = options.value;
    const key = options.key;
    const style = options.style;
    const styleSpec = options.styleSpec;
    const terrainSpec = styleSpec.terrain;
    let errors = [];
    const rootType = getType(terrain);
    if (terrain === void 0) {
        return errors;
    } else if (rootType === 'null') {
        return errors;
    } else if (rootType !== 'object') {
        errors = errors.concat([new ValidationError('terrain', terrain, `object expected, ${ rootType } found`)]);
        return errors;
    }
    for (const key2 in terrain) {
        const transitionMatch = key2.match(/^(.*)-transition$/);
        const useThemeMatch = key2.match(/^(.*)-use-theme$/);
        if (useThemeMatch && terrainSpec[useThemeMatch[1]]) {
            errors = errors.concat(validate({
                key: key2,
                value: terrain[key2],
                valueSpec: { type: 'string' },
                style,
                styleSpec
            }));
        } else if (transitionMatch && terrainSpec[transitionMatch[1]] && terrainSpec[transitionMatch[1]].transition) {
            errors = errors.concat(validate({
                key: key2,
                value: terrain[key2],
                valueSpec: styleSpec.transition,
                style,
                styleSpec
            }));
        } else if (terrainSpec[key2]) {
            errors = errors.concat(validate({
                key: key2,
                value: terrain[key2],
                valueSpec: terrainSpec[key2],
                style,
                styleSpec
            }));
        } else {
            errors = errors.concat([new ValidationWarning(key2, terrain[key2], `unknown property "${ key2 }"`)]);
        }
    }
    if (!terrain.source) {
        errors.push(new ValidationError(key, terrain, `terrain is missing required property "source"`));
    } else {
        const source = style.sources && style.sources[terrain.source];
        const sourceType = source && unbundle(source.type);
        if (!source) {
            errors.push(new ValidationError(key, terrain.source, `source "${ terrain.source }" not found`));
        } else if (sourceType !== 'raster-dem') {
            errors.push(new ValidationError(key, terrain.source, `terrain cannot be used with a source of type ${ String(sourceType) }, it only be used with a "raster-dem" source type`));
        }
    }
    return errors;
}

function validateFog(options) {
    const fog = options.value;
    const style = options.style;
    const styleSpec = options.styleSpec;
    const fogSpec = styleSpec.fog;
    let errors = [];
    const rootType = getType(fog);
    if (fog === void 0) {
        return errors;
    } else if (rootType !== 'object') {
        errors = errors.concat([new ValidationError('fog', fog, `object expected, ${ rootType } found`)]);
        return errors;
    }
    for (const key in fog) {
        const transitionMatch = key.match(/^(.*)-transition$/);
        const useThemeMatch = key.match(/^(.*)-use-theme$/);
        if (useThemeMatch && fogSpec[useThemeMatch[1]]) {
            errors = errors.concat(validate({
                key,
                value: fog[key],
                valueSpec: { type: 'string' },
                style,
                styleSpec
            }));
        } else if (transitionMatch && fogSpec[transitionMatch[1]] && fogSpec[transitionMatch[1]].transition) {
            errors = errors.concat(validate({
                key,
                value: fog[key],
                valueSpec: styleSpec.transition,
                style,
                styleSpec
            }));
        } else if (fogSpec[key]) {
            errors = errors.concat(validate({
                key,
                value: fog[key],
                valueSpec: fogSpec[key],
                style,
                styleSpec
            }));
        } else {
            errors = errors.concat([new ValidationWarning(key, fog[key], `unknown property "${ key }"`)]);
        }
    }
    return errors;
}

function validateFormatted(options) {
    if (validateString(options).length === 0) {
        return [];
    }
    return validateExpression(options);
}

function validateImage(options) {
    if (validateString(options).length === 0) {
        return [];
    }
    return validateExpression(options);
}

function validateProjection(options) {
    const projection = options.value;
    const styleSpec = options.styleSpec;
    const projectionSpec = styleSpec.projection;
    const style = options.style;
    let errors = [];
    const rootType = getType(projection);
    if (rootType === 'object') {
        for (const key in projection) {
            errors = errors.concat(validate({
                key,
                value: projection[key],
                valueSpec: projectionSpec[key],
                style,
                styleSpec
            }));
        }
    } else if (rootType !== 'string') {
        errors = errors.concat([new ValidationError('projection', projection, `object or string expected, ${ rootType } found`)]);
    }
    return errors;
}

const VALIDATORS = {
    '*'() {
        return [];
    },
    'array': validateArray,
    'boolean': validateBoolean,
    'number': validateNumber,
    'color': validateColor,
    'enum': validateEnum,
    'filter': validateFilter,
    'function': validateFunction,
    'layer': validateLayer,
    'object': validateObject,
    'source': validateSource,
    'model': validateModel,
    'light': validateLight,
    'light-3d': validateLights,
    'terrain': validateTerrain,
    'fog': validateFog,
    'string': validateString,
    'formatted': validateFormatted,
    'resolvedImage': validateImage,
    'projection': validateProjection,
    'import': validateImport
};
function validate(options, arrayAsExpression = false) {
    const value = options.value;
    const valueSpec = options.valueSpec;
    const styleSpec = options.styleSpec;
    if (valueSpec.expression && isFunction(unbundle(value))) {
        return validateFunction(options);
    } else if (valueSpec.expression && isExpression(deepUnbundle(value))) {
        return validateExpression(options);
    } else if (valueSpec.type && VALIDATORS[valueSpec.type]) {
        const valid = VALIDATORS[valueSpec.type](options);
        if (arrayAsExpression === true && valid.length > 0 && getType(options.value) === 'array') {
            return validateExpression(options);
        } else {
            return valid;
        }
    } else {
        const valid = validateObject(extend({}, options, { valueSpec: valueSpec.type ? styleSpec[valueSpec.type] : valueSpec }));
        return valid;
    }
}

function validateGlyphsURL (options) {
    const value = options.value;
    const key = options.key;
    const errors = validateString(options);
    if (errors.length)
        return errors;
    if (value.indexOf('{fontstack}') === -1) {
        errors.push(new ValidationError(key, value, '"glyphs" url must include a "{fontstack}" token'));
    }
    if (value.indexOf('{range}') === -1) {
        errors.push(new ValidationError(key, value, '"glyphs" url must include a "{range}" token'));
    }
    return errors;
}

function validateStyle$2(style, styleSpec = v8, options = {}) {
    const errors = validate({
        key: options.key || '',
        value: style,
        valueSpec: styleSpec.$root,
        styleSpec,
        style,
        // @ts-expect-error - TS2353 - Object literal may only specify known properties, and 'objectElementValidators' does not exist in type 'ValidationOptions'.
        objectElementValidators: {
            glyphs: validateGlyphsURL,
            '*': () => []
        }
    });
    return errors;
}

function validateStyle$1(style, styleSpec = v8) {
    const errors = validateStyle$2(style, styleSpec);
    return sortErrors(errors);
}
function sortErrors(errors) {
    return errors.slice().sort((a, b) => a.line && b.line ? a.line - b.line : 0);
}

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var jsonlint$1 = {};

/* parser generated by jison 0.4.15 */

var hasRequiredJsonlint;

function requireJsonlint () {
	if (hasRequiredJsonlint) return jsonlint$1;
	hasRequiredJsonlint = 1;
	(function (exports) {
		/*
		  Returns a Parser object of the following structure:

		  Parser: {
		    yy: {}
		  }

		  Parser.prototype: {
		    yy: {},
		    trace: function(),
		    symbols_: {associative list: name ==> number},
		    terminals_: {associative list: number ==> name},
		    productions_: [...],
		    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
		    table: [...],
		    defaultActions: {...},
		    parseError: function(str, hash),
		    parse: function(input),

		    lexer: {
		        EOF: 1,
		        parseError: function(str, hash),
		        setInput: function(input),
		        input: function(),
		        unput: function(str),
		        more: function(),
		        less: function(n),
		        pastInput: function(),
		        upcomingInput: function(),
		        showPosition: function(),
		        test_match: function(regex_match_array, rule_index),
		        next: function(),
		        lex: function(),
		        begin: function(condition),
		        popState: function(),
		        _currentRules: function(),
		        topState: function(),
		        pushState: function(condition),

		        options: {
		            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
		            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
		            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
		        },

		        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
		        rules: [...],
		        conditions: {associative list: name ==> set},
		    }
		  }


		  token location info (@$, _$, etc.): {
		    first_line: n,
		    last_line: n,
		    first_column: n,
		    last_column: n,
		    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
		  }


		  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
		    text:        (matched text)
		    token:       (the produced terminal token, if any)
		    line:        (yylineno)
		  }
		  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
		    loc:         (yylloc)
		    expected:    (string describing the set of expected tokens)
		    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
		  }
		*/
		var parser = (function () {
		    var o = function (k, v, o, l) {
		            for (o = o || {}, l = k.length; l--; o[k[l]] = v);
		            return o;
		        }, $V0 = [
		            1,
		            12
		        ], $V1 = [
		            1,
		            13
		        ], $V2 = [
		            1,
		            9
		        ], $V3 = [
		            1,
		            10
		        ], $V4 = [
		            1,
		            11
		        ], $V5 = [
		            1,
		            14
		        ], $V6 = [
		            1,
		            15
		        ], $V7 = [
		            14,
		            18,
		            22,
		            24
		        ], $V8 = [
		            18,
		            22
		        ], $V9 = [
		            22,
		            24
		        ];
		    var parser = {
		        trace: function trace() {
		        },
		        yy: {},
		        symbols_: {
		            'error': 2,
		            'JSONString': 3,
		            'STRING': 4,
		            'JSONNumber': 5,
		            'NUMBER': 6,
		            'JSONNullLiteral': 7,
		            'NULL': 8,
		            'JSONBooleanLiteral': 9,
		            'TRUE': 10,
		            'FALSE': 11,
		            'JSONText': 12,
		            'JSONValue': 13,
		            'EOF': 14,
		            'JSONObject': 15,
		            'JSONArray': 16,
		            '{': 17,
		            '}': 18,
		            'JSONMemberList': 19,
		            'JSONMember': 20,
		            ':': 21,
		            ',': 22,
		            '[': 23,
		            ']': 24,
		            'JSONElementList': 25,
		            '$accept': 0,
		            '$end': 1
		        },
		        terminals_: {
		            2: 'error',
		            4: 'STRING',
		            6: 'NUMBER',
		            8: 'NULL',
		            10: 'TRUE',
		            11: 'FALSE',
		            14: 'EOF',
		            17: '{',
		            18: '}',
		            21: ':',
		            22: ',',
		            23: '[',
		            24: ']'
		        },
		        productions_: [
		            0,
		            [
		                3,
		                1
		            ],
		            [
		                5,
		                1
		            ],
		            [
		                7,
		                1
		            ],
		            [
		                9,
		                1
		            ],
		            [
		                9,
		                1
		            ],
		            [
		                12,
		                2
		            ],
		            [
		                13,
		                1
		            ],
		            [
		                13,
		                1
		            ],
		            [
		                13,
		                1
		            ],
		            [
		                13,
		                1
		            ],
		            [
		                13,
		                1
		            ],
		            [
		                13,
		                1
		            ],
		            [
		                15,
		                2
		            ],
		            [
		                15,
		                3
		            ],
		            [
		                20,
		                3
		            ],
		            [
		                19,
		                1
		            ],
		            [
		                19,
		                3
		            ],
		            [
		                16,
		                2
		            ],
		            [
		                16,
		                3
		            ],
		            [
		                25,
		                1
		            ],
		            [
		                25,
		                3
		            ]
		        ],
		        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
		            /* this == yyval */
		            var $0 = $$.length - 1;
		            switch (yystate) {
		            case 1:
		                // replace escaped characters with actual character
		                this.$ = new String(yytext.replace(/\\(\\|")/g, '$' + '1').replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t').replace(/\\v/g, '\x0B').replace(/\\f/g, '\f').replace(/\\b/g, '\b'));
		                this.$.__line__ = this._$.first_line;
		                break;
		            case 2:
		                this.$ = new Number(yytext);
		                this.$.__line__ = this._$.first_line;
		                break;
		            case 3:
		                this.$ = null;
		                break;
		            case 4:
		                this.$ = new Boolean(true);
		                this.$.__line__ = this._$.first_line;
		                break;
		            case 5:
		                this.$ = new Boolean(false);
		                this.$.__line__ = this._$.first_line;
		                break;
		            case 6:
		                return this.$ = $$[$0 - 1];
		            case 13:
		                this.$ = {};
		                Object.defineProperty(this.$, '__line__', {
		                    value: this._$.first_line,
		                    enumerable: false
		                });
		                break;
		            case 14:
		            case 19:
		                this.$ = $$[$0 - 1];
		                Object.defineProperty(this.$, '__line__', {
		                    value: this._$.first_line,
		                    enumerable: false
		                });
		                break;
		            case 15:
		                this.$ = [
		                    $$[$0 - 2],
		                    $$[$0]
		                ];
		                break;
		            case 16:
		                this.$ = {};
		                this.$[$$[$0][0]] = $$[$0][1];
		                break;
		            case 17:
		                this.$ = $$[$0 - 2];
		                $$[$0 - 2][$$[$0][0]] = $$[$0][1];
		                break;
		            case 18:
		                this.$ = [];
		                Object.defineProperty(this.$, '__line__', {
		                    value: this._$.first_line,
		                    enumerable: false
		                });
		                break;
		            case 20:
		                this.$ = [$$[$0]];
		                break;
		            case 21:
		                this.$ = $$[$0 - 2];
		                $$[$0 - 2].push($$[$0]);
		                break;
		            }
		        },
		        table: [
		            {
		                3: 5,
		                4: $V0,
		                5: 6,
		                6: $V1,
		                7: 3,
		                8: $V2,
		                9: 4,
		                10: $V3,
		                11: $V4,
		                12: 1,
		                13: 2,
		                15: 7,
		                16: 8,
		                17: $V5,
		                23: $V6
		            },
		            { 1: [3] },
		            {
		                14: [
		                    1,
		                    16
		                ]
		            },
		            o($V7, [
		                2,
		                7
		            ]),
		            o($V7, [
		                2,
		                8
		            ]),
		            o($V7, [
		                2,
		                9
		            ]),
		            o($V7, [
		                2,
		                10
		            ]),
		            o($V7, [
		                2,
		                11
		            ]),
		            o($V7, [
		                2,
		                12
		            ]),
		            o($V7, [
		                2,
		                3
		            ]),
		            o($V7, [
		                2,
		                4
		            ]),
		            o($V7, [
		                2,
		                5
		            ]),
		            o([
		                14,
		                18,
		                21,
		                22,
		                24
		            ], [
		                2,
		                1
		            ]),
		            o($V7, [
		                2,
		                2
		            ]),
		            {
		                3: 20,
		                4: $V0,
		                18: [
		                    1,
		                    17
		                ],
		                19: 18,
		                20: 19
		            },
		            {
		                3: 5,
		                4: $V0,
		                5: 6,
		                6: $V1,
		                7: 3,
		                8: $V2,
		                9: 4,
		                10: $V3,
		                11: $V4,
		                13: 23,
		                15: 7,
		                16: 8,
		                17: $V5,
		                23: $V6,
		                24: [
		                    1,
		                    21
		                ],
		                25: 22
		            },
		            {
		                1: [
		                    2,
		                    6
		                ]
		            },
		            o($V7, [
		                2,
		                13
		            ]),
		            {
		                18: [
		                    1,
		                    24
		                ],
		                22: [
		                    1,
		                    25
		                ]
		            },
		            o($V8, [
		                2,
		                16
		            ]),
		            {
		                21: [
		                    1,
		                    26
		                ]
		            },
		            o($V7, [
		                2,
		                18
		            ]),
		            {
		                22: [
		                    1,
		                    28
		                ],
		                24: [
		                    1,
		                    27
		                ]
		            },
		            o($V9, [
		                2,
		                20
		            ]),
		            o($V7, [
		                2,
		                14
		            ]),
		            {
		                3: 20,
		                4: $V0,
		                20: 29
		            },
		            {
		                3: 5,
		                4: $V0,
		                5: 6,
		                6: $V1,
		                7: 3,
		                8: $V2,
		                9: 4,
		                10: $V3,
		                11: $V4,
		                13: 30,
		                15: 7,
		                16: 8,
		                17: $V5,
		                23: $V6
		            },
		            o($V7, [
		                2,
		                19
		            ]),
		            {
		                3: 5,
		                4: $V0,
		                5: 6,
		                6: $V1,
		                7: 3,
		                8: $V2,
		                9: 4,
		                10: $V3,
		                11: $V4,
		                13: 31,
		                15: 7,
		                16: 8,
		                17: $V5,
		                23: $V6
		            },
		            o($V8, [
		                2,
		                17
		            ]),
		            o($V8, [
		                2,
		                15
		            ]),
		            o($V9, [
		                2,
		                21
		            ])
		        ],
		        defaultActions: {
		            16: [
		                2,
		                6
		            ]
		        },
		        parseError: function parseError(str, hash) {
		            if (hash.recoverable) {
		                this.trace(str);
		            } else {
		                throw new Error(str);
		            }
		        },
		        parse: function parse(input) {
		            var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, TERROR = 2, EOF = 1;
		            var args = lstack.slice.call(arguments, 1);
		            var lexer = Object.create(this.lexer);
		            var sharedState = { yy: {} };
		            for (var k in this.yy) {
		                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
		                    sharedState.yy[k] = this.yy[k];
		                }
		            }
		            lexer.setInput(input, sharedState.yy);
		            sharedState.yy.lexer = lexer;
		            sharedState.yy.parser = this;
		            if (typeof lexer.yylloc == 'undefined') {
		                lexer.yylloc = {};
		            }
		            var yyloc = lexer.yylloc;
		            lstack.push(yyloc);
		            var ranges = lexer.options && lexer.options.ranges;
		            if (typeof sharedState.yy.parseError === 'function') {
		                this.parseError = sharedState.yy.parseError;
		            } else {
		                this.parseError = Object.getPrototypeOf(this).parseError;
		            }
		            function lex() {
		                var token;
		                token = lexer.lex() || EOF;
		                if (typeof token !== 'number') {
		                    token = self.symbols_[token] || token;
		                }
		                return token;
		            }
		            var symbol, state, action, r, yyval = {}, p, len, newState, expected;
		            while (true) {
		                state = stack[stack.length - 1];
		                if (this.defaultActions[state]) {
		                    action = this.defaultActions[state];
		                } else {
		                    if (symbol === null || typeof symbol == 'undefined') {
		                        symbol = lex();
		                    }
		                    action = table[state] && table[state][symbol];
		                }
		                if (typeof action === 'undefined' || !action.length || !action[0]) {
		                    var errStr = '';
		                    expected = [];
		                    for (p in table[state]) {
		                        if (this.terminals_[p] && p > TERROR) {
		                            expected.push('\'' + this.terminals_[p] + '\'');
		                        }
		                    }
		                    if (lexer.showPosition) {
		                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
		                    } else {
		                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
		                    }
		                    this.parseError(errStr, {
		                        text: lexer.match,
		                        token: this.terminals_[symbol] || symbol,
		                        line: lexer.yylineno,
		                        loc: yyloc,
		                        expected: expected
		                    });
		                }
		                if (action[0] instanceof Array && action.length > 1) {
		                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
		                }
		                switch (action[0]) {
		                case 1:
		                    stack.push(symbol);
		                    vstack.push(lexer.yytext);
		                    lstack.push(lexer.yylloc);
		                    stack.push(action[1]);
		                    symbol = null;
		                    {
		                        yyleng = lexer.yyleng;
		                        yytext = lexer.yytext;
		                        yylineno = lexer.yylineno;
		                        yyloc = lexer.yylloc;
		                    }
		                    break;
		                case 2:
		                    len = this.productions_[action[1]][1];
		                    yyval.$ = vstack[vstack.length - len];
		                    yyval._$ = {
		                        first_line: lstack[lstack.length - (len || 1)].first_line,
		                        last_line: lstack[lstack.length - 1].last_line,
		                        first_column: lstack[lstack.length - (len || 1)].first_column,
		                        last_column: lstack[lstack.length - 1].last_column
		                    };
		                    if (ranges) {
		                        yyval._$.range = [
		                            lstack[lstack.length - (len || 1)].range[0],
		                            lstack[lstack.length - 1].range[1]
		                        ];
		                    }
		                    r = this.performAction.apply(yyval, [
		                        yytext,
		                        yyleng,
		                        yylineno,
		                        sharedState.yy,
		                        action[1],
		                        vstack,
		                        lstack
		                    ].concat(args));
		                    if (typeof r !== 'undefined') {
		                        return r;
		                    }
		                    if (len) {
		                        stack = stack.slice(0, -1 * len * 2);
		                        vstack = vstack.slice(0, -1 * len);
		                        lstack = lstack.slice(0, -1 * len);
		                    }
		                    stack.push(this.productions_[action[1]][0]);
		                    vstack.push(yyval.$);
		                    lstack.push(yyval._$);
		                    newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
		                    stack.push(newState);
		                    break;
		                case 3:
		                    return true;
		                }
		            }
		            return true;
		        }
		    };
		    /* generated by jison-lex 0.3.4 */
		    var lexer = (function () {
		        var lexer = {
		            EOF: 1,
		            parseError: function parseError(str, hash) {
		                if (this.yy.parser) {
		                    this.yy.parser.parseError(str, hash);
		                } else {
		                    throw new Error(str);
		                }
		            },
		            // resets the lexer, sets new input
		            setInput: function (input, yy) {
		                this.yy = yy || this.yy || {};
		                this._input = input;
		                this._more = this._backtrack = this.done = false;
		                this.yylineno = this.yyleng = 0;
		                this.yytext = this.matched = this.match = '';
		                this.conditionStack = ['INITIAL'];
		                this.yylloc = {
		                    first_line: 1,
		                    first_column: 0,
		                    last_line: 1,
		                    last_column: 0
		                };
		                if (this.options.ranges) {
		                    this.yylloc.range = [
		                        0,
		                        0
		                    ];
		                }
		                this.offset = 0;
		                return this;
		            },
		            // consumes and returns one char from the input
		            input: function () {
		                var ch = this._input[0];
		                this.yytext += ch;
		                this.yyleng++;
		                this.offset++;
		                this.match += ch;
		                this.matched += ch;
		                var lines = ch.match(/(?:\r\n?|\n).*/g);
		                if (lines) {
		                    this.yylineno++;
		                    this.yylloc.last_line++;
		                } else {
		                    this.yylloc.last_column++;
		                }
		                if (this.options.ranges) {
		                    this.yylloc.range[1]++;
		                }
		                this._input = this._input.slice(1);
		                return ch;
		            },
		            // unshifts one char (or a string) into the input
		            unput: function (ch) {
		                var len = ch.length;
		                var lines = ch.split(/(?:\r\n?|\n)/g);
		                this._input = ch + this._input;
		                this.yytext = this.yytext.substr(0, this.yytext.length - len);
		                //this.yyleng -= len;
		                this.offset -= len;
		                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
		                this.match = this.match.substr(0, this.match.length - 1);
		                this.matched = this.matched.substr(0, this.matched.length - 1);
		                if (lines.length - 1) {
		                    this.yylineno -= lines.length - 1;
		                }
		                var r = this.yylloc.range;
		                this.yylloc = {
		                    first_line: this.yylloc.first_line,
		                    last_line: this.yylineno + 1,
		                    first_column: this.yylloc.first_column,
		                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
		                };
		                if (this.options.ranges) {
		                    this.yylloc.range = [
		                        r[0],
		                        r[0] + this.yyleng - len
		                    ];
		                }
		                this.yyleng = this.yytext.length;
		                return this;
		            },
		            // When called from action, caches matched text and appends it on next action
		            more: function () {
		                this._more = true;
		                return this;
		            },
		            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
		            reject: function () {
		                if (this.options.backtrack_lexer) {
		                    this._backtrack = true;
		                } else {
		                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
		                        text: '',
		                        token: null,
		                        line: this.yylineno
		                    });
		                }
		                return this;
		            },
		            // retain first n characters of the match
		            less: function (n) {
		                this.unput(this.match.slice(n));
		            },
		            // displays already matched input, i.e. for error messages
		            pastInput: function () {
		                var past = this.matched.substr(0, this.matched.length - this.match.length);
		                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, '');
		            },
		            // displays upcoming input, i.e. for error messages
		            upcomingInput: function () {
		                var next = this.match;
		                if (next.length < 20) {
		                    next += this._input.substr(0, 20 - next.length);
		                }
		                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, '');
		            },
		            // displays the character position where the lexing error occurred, i.e. for error messages
		            showPosition: function () {
		                var pre = this.pastInput();
		                var c = new Array(pre.length + 1).join('-');
		                return pre + this.upcomingInput() + '\n' + c + '^';
		            },
		            // test the lexed token: return FALSE when not a match, otherwise return token
		            test_match: function (match, indexed_rule) {
		                var token, lines, backup;
		                if (this.options.backtrack_lexer) {
		                    // save context
		                    backup = {
		                        yylineno: this.yylineno,
		                        yylloc: {
		                            first_line: this.yylloc.first_line,
		                            last_line: this.last_line,
		                            first_column: this.yylloc.first_column,
		                            last_column: this.yylloc.last_column
		                        },
		                        yytext: this.yytext,
		                        match: this.match,
		                        matches: this.matches,
		                        matched: this.matched,
		                        yyleng: this.yyleng,
		                        offset: this.offset,
		                        _more: this._more,
		                        _input: this._input,
		                        yy: this.yy,
		                        conditionStack: this.conditionStack.slice(0),
		                        done: this.done
		                    };
		                    if (this.options.ranges) {
		                        backup.yylloc.range = this.yylloc.range.slice(0);
		                    }
		                }
		                lines = match[0].match(/(?:\r\n?|\n).*/g);
		                if (lines) {
		                    this.yylineno += lines.length;
		                }
		                this.yylloc = {
		                    first_line: this.yylloc.last_line,
		                    last_line: this.yylineno + 1,
		                    first_column: this.yylloc.last_column,
		                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
		                };
		                this.yytext += match[0];
		                this.match += match[0];
		                this.matches = match;
		                this.yyleng = this.yytext.length;
		                if (this.options.ranges) {
		                    this.yylloc.range = [
		                        this.offset,
		                        this.offset += this.yyleng
		                    ];
		                }
		                this._more = false;
		                this._backtrack = false;
		                this._input = this._input.slice(match[0].length);
		                this.matched += match[0];
		                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
		                if (this.done && this._input) {
		                    this.done = false;
		                }
		                if (token) {
		                    return token;
		                } else if (this._backtrack) {
		                    // recover context
		                    for (var k in backup) {
		                        this[k] = backup[k];
		                    }
		                    return false;    // rule action called reject() implying the next rule should be tested instead.
		                }
		                return false;
		            },
		            // return next match in input
		            next: function () {
		                if (this.done) {
		                    return this.EOF;
		                }
		                if (!this._input) {
		                    this.done = true;
		                }
		                var token, match, tempMatch, index;
		                if (!this._more) {
		                    this.yytext = '';
		                    this.match = '';
		                }
		                var rules = this._currentRules();
		                for (var i = 0; i < rules.length; i++) {
		                    tempMatch = this._input.match(this.rules[rules[i]]);
		                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
		                        match = tempMatch;
		                        index = i;
		                        if (this.options.backtrack_lexer) {
		                            token = this.test_match(tempMatch, rules[i]);
		                            if (token !== false) {
		                                return token;
		                            } else if (this._backtrack) {
		                                match = false;
		                                continue;    // rule action called reject() implying a rule MISmatch.
		                            } else {
		                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
		                                return false;
		                            }
		                        } else if (!this.options.flex) {
		                            break;
		                        }
		                    }
		                }
		                if (match) {
		                    token = this.test_match(match, rules[index]);
		                    if (token !== false) {
		                        return token;
		                    }
		                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
		                    return false;
		                }
		                if (this._input === '') {
		                    return this.EOF;
		                } else {
		                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
		                        text: '',
		                        token: null,
		                        line: this.yylineno
		                    });
		                }
		            },
		            // return next match that has a token
		            lex: function lex() {
		                var r = this.next();
		                if (r) {
		                    return r;
		                } else {
		                    return this.lex();
		                }
		            },
		            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
		            begin: function begin(condition) {
		                this.conditionStack.push(condition);
		            },
		            // pop the previously active lexer condition state off the condition stack
		            popState: function popState() {
		                var n = this.conditionStack.length - 1;
		                if (n > 0) {
		                    return this.conditionStack.pop();
		                } else {
		                    return this.conditionStack[0];
		                }
		            },
		            // produce the lexer rule set which is active for the currently active lexer condition state
		            _currentRules: function _currentRules() {
		                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
		                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
		                } else {
		                    return this.conditions['INITIAL'].rules;
		                }
		            },
		            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
		            topState: function topState(n) {
		                n = this.conditionStack.length - 1 - Math.abs(n || 0);
		                if (n >= 0) {
		                    return this.conditionStack[n];
		                } else {
		                    return 'INITIAL';
		                }
		            },
		            // alias for begin(condition)
		            pushState: function pushState(condition) {
		                this.begin(condition);
		            },
		            // return the number of states currently on the stack
		            stateStackSize: function stateStackSize() {
		                return this.conditionStack.length;
		            },
		            options: {},
		            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
		                switch ($avoiding_name_collisions) {
		                case 0:
		                    /* skip whitespace */
		                    break;
		                case 1:
		                    return 6;
		                case 2:
		                    yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
		                    return 4;
		                case 3:
		                    return 17;
		                case 4:
		                    return 18;
		                case 5:
		                    return 23;
		                case 6:
		                    return 24;
		                case 7:
		                    return 22;
		                case 8:
		                    return 21;
		                case 9:
		                    return 10;
		                case 10:
		                    return 11;
		                case 11:
		                    return 8;
		                case 12:
		                    return 14;
		                case 13:
		                    return 'INVALID';
		                }
		            },
		            rules: [
		                /^(?:\s+)/,
		                /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/,
		                /^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/,
		                /^(?:\{)/,
		                /^(?:\})/,
		                /^(?:\[)/,
		                /^(?:\])/,
		                /^(?:,)/,
		                /^(?::)/,
		                /^(?:true\b)/,
		                /^(?:false\b)/,
		                /^(?:null\b)/,
		                /^(?:$)/,
		                /^(?:.)/
		            ],
		            conditions: {
		                'INITIAL': {
		                    'rules': [
		                        0,
		                        1,
		                        2,
		                        3,
		                        4,
		                        5,
		                        6,
		                        7,
		                        8,
		                        9,
		                        10,
		                        11,
		                        12,
		                        13
		                    ],
		                    'inclusive': true
		                }
		            }
		        };
		        return lexer;
		    }());
		    parser.lexer = lexer;
		    function Parser() {
		        this.yy = {};
		    }
		    Parser.prototype = parser;
		    parser.Parser = Parser;
		    return new Parser();
		}());
		if (typeof commonjsRequire !== 'undefined' && 'object' !== 'undefined') {
		    exports.parser = parser;
		    exports.Parser = parser.Parser;
		    exports.parse = function () {
		        return parser.parse.apply(parser, arguments);
		    };
		} 
	} (jsonlint$1));
	return jsonlint$1;
}

var jsonlintExports = requireJsonlint();
var jsonlint = /*@__PURE__*/getDefaultExportFromCjs(jsonlintExports);

function readStyle(style) {
    if (style instanceof String || typeof style === 'string' || ArrayBuffer.isView(style)) {
        try {
            return jsonlint.parse(style.toString());
        } catch (e) {
            throw new ParsingError(e);
        }
    }
    return style;
}

function validateStyle(style, styleSpec = v8) {
    let s = style;
    try {
        s = readStyle(s);
    } catch (e) {
        return [e];
    }
    return validateStyle$1(s, styleSpec);
}

const SUPPORTED_SPEC_VERSION = 8;
const MAX_SOURCES_IN_STYLE = 15;
function isValid(value, regex) {
    if (!value || getType(value) !== 'string')
        return true;
    return !!value.match(regex);
}
function getSourceCount(source) {
    if (source.url) {
        return source.url.split(',').length;
    } else {
        return 0;
    }
}
function getAllowedKeyErrors(obj, keys, path) {
    const allowed = new Set(keys);
    const errors = [];
    Object.keys(obj).forEach(k => {
        if (!allowed.has(k)) {
            const prop = path ? `${ path }.${ k }` : null;
            errors.push(new ValidationError(prop, obj[k], `Unsupported property "${ k }"`));
        }
    });
    return errors;
}
const acceptedSourceTypes = /* @__PURE__ */
new Set([
    'vector',
    'raster',
    'raster-dem',
    'raster-array',
    'model',
    'batched-model'
]);
function getSourceErrors(source, i) {
    const errors = [];
    const sourceKeys = [
        'type',
        'url',
        'tileSize'
    ];
    errors.push(...getAllowedKeyErrors(source, sourceKeys, 'source'));
    if (!acceptedSourceTypes.has(String(source.type))) {
        errors.push(new ValidationError(`sources[${ i }].type`, source.type, `Expected one of [${ Array.from(acceptedSourceTypes).join(', ') }]`));
    }
    const sourceUrlPattern = /^mapbox:\/\/([^/]*)$/;
    if (!source.url || !isValid(source.url, sourceUrlPattern)) {
        errors.push(new ValidationError(`sources[${ i }].url`, source.url, 'Expected a valid Mapbox tileset url'));
    }
    return errors;
}
function getMaxSourcesErrors(sourcesCount) {
    const errors = [];
    if (sourcesCount > MAX_SOURCES_IN_STYLE) {
        errors.push(new ValidationError('sources', null, `Styles must contain ${ MAX_SOURCES_IN_STYLE } or fewer sources`));
    }
    return errors;
}
function getSourcesErrors(sources) {
    const errors = [];
    let sourcesCount = 0;
    Object.keys(sources).forEach((s, i) => {
        const sourceErrors = getSourceErrors(sources[s], i);
        if (!sourceErrors.length) {
            sourcesCount = sourcesCount + getSourceCount(sources[s]);
        }
        errors.push(...sourceErrors);
    });
    return {
        errors,
        sourcesCount
    };
}
function getImportErrors(imports = []) {
    let errors = [];
    let sourcesCount = 0;
    const validateImports = (imports2 = []) => {
        for (const importSpec of imports2) {
            const style = importSpec.data;
            if (!style)
                continue;
            if (style.imports) {
                validateImports(style.imports);
            }
            errors = errors.concat(getRootErrors(style, Object.keys(v8.$root)));
            if (style.sources) {
                const sourcesErrors = getSourcesErrors(style.sources);
                sourcesCount += sourcesErrors.sourcesCount;
                errors = errors.concat(sourcesErrors.errors);
            }
        }
    };
    validateImports(imports);
    if (imports.length !== new Set(imports.map(i => i.id)).size) {
        errors.push(new ValidationError(null, null, 'Duplicate ids of imports'));
    }
    return {
        errors,
        sourcesCount
    };
}
function getRootErrors(style, specKeys) {
    const errors = [];
    const optionalRootProperties = [
        'owner',
        'id',
        'cacheControl',
        'draft',
        'created',
        'modified',
        'visibility',
        'protected',
        'models',
        'lights'
    ];
    const allowedKeyErrors = getAllowedKeyErrors(style, [
        ...specKeys,
        ...optionalRootProperties
    ]);
    errors.push(...allowedKeyErrors);
    if (style.version > SUPPORTED_SPEC_VERSION || style.version < SUPPORTED_SPEC_VERSION) {
        errors.push(new ValidationError('version', style.version, `Style version must be ${ SUPPORTED_SPEC_VERSION }`));
    }
    const glyphUrlPattern = /^mapbox:\/\/fonts\/([^/]*)\/{fontstack}\/{range}.pbf$/;
    if (!isValid(style.glyphs, glyphUrlPattern)) {
        errors.push(new ValidationError('glyphs', style.glyphs, 'Styles must reference glyphs hosted by Mapbox'));
    }
    const spriteUrlPattern = /^mapbox:\/\/sprites\/([^/]*)\/([^/]*)\/?([^/]*)?$/;
    if (!isValid(style.sprite, spriteUrlPattern)) {
        errors.push(new ValidationError('sprite', style.sprite, 'Styles must reference sprites hosted by Mapbox'));
    }
    const visibilityPattern = /^(public|private)$/;
    if (!isValid(style.visibility, visibilityPattern)) {
        errors.push(new ValidationError('visibility', style.visibility, 'Style visibility must be public or private'));
    }
    if (style.protected !== void 0 && getType(style.protected) !== 'boolean') {
        errors.push(new ValidationError('protected', style.protected, 'Style protection must be true or false'));
    }
    return errors;
}
function validateMapboxApiSupported(style, styleSpec = v8) {
    let s = style;
    try {
        s = readStyle(s);
    } catch (e) {
        return [e];
    }
    let errors = validateStyle$1(s, styleSpec).concat(getRootErrors(s, Object.keys(v8.$root)));
    let sourcesCount = 0;
    if (s.sources) {
        const sourcesErrors = getSourcesErrors(s.sources);
        sourcesCount += sourcesErrors.sourcesCount;
        errors = errors.concat(sourcesErrors.errors);
    }
    if (s.imports) {
        const importsErrors = getImportErrors(s.imports);
        sourcesCount += importsErrors.sourcesCount;
        errors = errors.concat(importsErrors.errors);
    }
    errors = errors.concat(getMaxSourcesErrors(sourcesCount));
    return errors;
}

const expression = {
    StyleExpression,
    isExpression,
    isExpressionFilter,
    createExpression,
    createPropertyExpression,
    normalizePropertyExpression,
    ZoomConstantExpression,
    ZoomDependentExpression,
    StylePropertyFunction
};
const styleFunction = {
    convertFunction,
    createFunction,
    isFunction
};
const visit = {
    eachSource,
    eachLayer,
    eachProperty
};

export { Color, ParsingError, ValidationError, composite, convertFilter, derefLayers, diffStyles as diff, expression, createFilter as featureFilter, format, styleFunction as function, v8 as latest, migrate, v8, validateStyle as validate, validateMapboxApiSupported, visit };
//# sourceMappingURL=index.es.js.map
