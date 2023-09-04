/**
 * {@link module:ol/source/Vector~VectorSource} sources use a function of this type to
 * load features.
 *
 * This function takes up to 5 arguments. These are an {@link module:ol/extent~Extent} representing
 * the area to be loaded, a `{number}` representing the resolution (map units per pixel), an
 * {@link module:ol/proj/Projection~Projection} for the projection, an optional success callback that should get
 * the loaded features passed as an argument and an optional failure callback with no arguments. If
 * the callbacks are not used, the corresponding vector source will not fire `'featuresloadend'` and
 * `'featuresloaderror'` events. `this` within the function is bound to the
 * {@link module:ol/source/Vector~VectorSource} it's called from.
 *
 * The function is responsible for loading the features and adding them to the
 * source.
 * @typedef {function(this:(import("./source/Vector").default|import("./VectorTile.js").default),
 *           import("./extent.js").Extent,
 *           number,
 *           import("./proj/Projection.js").default,
 *           function(Array<import("./Feature.js").default>): void=,
 *           function(): void=): void} FeatureLoader
 * @api
 */
/**
 * {@link module:ol/source/Vector~VectorSource} sources use a function of this type to
 * get the url to load features from.
 *
 * This function takes an {@link module:ol/extent~Extent} representing the area
 * to be loaded, a `{number}` representing the resolution (map units per pixel)
 * and an {@link module:ol/proj/Projection~Projection} for the projection  as
 * arguments and returns a `{string}` representing the URL.
 * @typedef {function(import("./extent.js").Extent, number, import("./proj/Projection.js").default): string} FeatureUrlFunction
 * @api
 */
/**
 * @param {string|FeatureUrlFunction} url Feature URL service.
 * @param {import("./format/Feature.js").default} format Feature format.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} resolution Resolution.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @param {function(Array<import("./Feature.js").default>, import("./proj/Projection.js").default): void} success Success
 *      Function called with the loaded features and optionally with the data projection.
 * @param {function(): void} failure Failure
 *      Function called when loading failed.
 */
export function loadFeaturesXhr(url: string | FeatureUrlFunction, format: import("./format/Feature.js").default, extent: import("./extent.js").Extent, resolution: number, projection: import("./proj/Projection.js").default, success: (arg0: Array<import("./Feature.js").default>, arg1: import("./proj/Projection.js").default) => void, failure: () => void): void;
/**
 * Create an XHR feature loader for a `url` and `format`. The feature loader
 * loads features (with XHR), parses the features, and adds them to the
 * vector source.
 * @param {string|FeatureUrlFunction} url Feature URL service.
 * @param {import("./format/Feature.js").default} format Feature format.
 * @return {FeatureLoader} The feature loader.
 * @api
 */
export function xhr(url: string | FeatureUrlFunction, format: import("./format/Feature.js").default): FeatureLoader;
/**
 * Setter for the withCredentials configuration for the XHR.
 *
 * @param {boolean} xhrWithCredentials The value of withCredentials to set.
 * Compare https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/
 * @api
 */
export function setWithCredentials(xhrWithCredentials: boolean): void;
/**
 * {@link module :ol/source/Vector~VectorSource} sources use a function of this type to
 * load features.
 *
 * This function takes up to 5 arguments. These are an {@link module :ol/extent~Extent} representing
 * the area to be loaded, a `{number}` representing the resolution (map units per pixel), an
 * {@link module :ol/proj/Projection~Projection} for the projection, an optional success callback that should get
 * the loaded features passed as an argument and an optional failure callback with no arguments. If
 * the callbacks are not used, the corresponding vector source will not fire `'featuresloadend'` and
 * `'featuresloaderror'` events. `this` within the function is bound to the
 * {@link module :ol/source/Vector~VectorSource} it's called from.
 *
 * The function is responsible for loading the features and adding them to the
 * source.
 */
export type FeatureLoader = (this: (import("./source/Vector").default | import("./VectorTile.js").default), arg1: import("./extent.js").Extent, arg2: number, arg3: import("./proj/Projection.js").default, arg4: ((arg0: Array<import("./Feature.js").default>) => void) | undefined, arg5: (() => void) | undefined) => void;
/**
 * {@link module :ol/source/Vector~VectorSource} sources use a function of this type to
 * get the url to load features from.
 *
 * This function takes an {@link module :ol/extent~Extent} representing the area
 * to be loaded, a `{number}` representing the resolution (map units per pixel)
 * and an {@link module :ol/proj/Projection~Projection} for the projection  as
 * arguments and returns a `{string}` representing the URL.
 */
export type FeatureUrlFunction = (arg0: import("./extent.js").Extent, arg1: number, arg2: import("./proj/Projection.js").default) => string;
//# sourceMappingURL=featureloader.d.ts.map