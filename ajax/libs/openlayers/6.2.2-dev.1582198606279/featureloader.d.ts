/**
 * {@link module:ol/source/Vector} sources use a function of this type to
 * load features.
 *
 * This function takes an {@link module:ol/extent~Extent} representing the area to be loaded,
 * a `{number}` representing the resolution (map units per pixel) and an
 * {@link module:ol/proj/Projection} for the projection  as
 * arguments. `this` within the function is bound to the
 * {@link module:ol/source/Vector} it's called from.
 *
 * The function is responsible for loading the features and adding them to the
 * source.
 * @typedef {function(this:(import("./source/Vector").default|import("./VectorTile.js").default), import("./extent.js").Extent, number,
 *                    import("./proj/Projection.js").default): void} FeatureLoader
 * @api
 */
/**
 * {@link module:ol/source/Vector} sources use a function of this type to
 * get the url to load features from.
 *
 * This function takes an {@link module:ol/extent~Extent} representing the area
 * to be loaded, a `{number}` representing the resolution (map units per pixel)
 * and an {@link module:ol/proj/Projection} for the projection  as
 * arguments and returns a `{string}` representing the URL.
 * @typedef {function(import("./extent.js").Extent, number, import("./proj/Projection.js").default): string} FeatureUrlFunction
 * @api
 */
/**
 * @param {string|FeatureUrlFunction} url Feature URL service.
 * @param {import("./format/Feature.js").default} format Feature format.
 * @param {function(this:import("./VectorTile.js").default, Array<import("./Feature.js").default>, import("./proj/Projection.js").default, import("./extent.js").Extent): void|function(this:import("./source/Vector").default, Array<import("./Feature.js").default>): void} success
 *     Function called with the loaded features and optionally with the data
 *     projection. Called with the vector tile or source as `this`.
 * @param {function(this:import("./VectorTile.js").default): void|function(this:import("./source/Vector").default): void} failure
 *     Function called when loading failed. Called with the vector tile or
 *     source as `this`.
 * @return {FeatureLoader} The feature loader.
 */
export function loadFeaturesXhr(url: string | ((arg0: number[], arg1: number, arg2: import("./proj/Projection.js").default) => string), format: import("./format/Feature.js").default, success: (this: import("./VectorTile.js").default, arg1: import("./Feature.js").default<any>[], arg2: import("./proj/Projection.js").default, arg3: number[]) => void | ((this: import("./source/Vector.js").default<any>, arg1: import("./Feature.js").default<any>[]) => void), failure: (this: import("./VectorTile.js").default) => void | ((this: import("./source/Vector.js").default<any>) => void)): (this: import("./VectorTile.js").default | import("./source/Vector.js").default<any>, arg1: number[], arg2: number, arg3: import("./proj/Projection.js").default) => void;
/**
 * Create an XHR feature loader for a `url` and `format`. The feature loader
 * loads features (with XHR), parses the features, and adds them to the
 * vector source.
 * @param {string|FeatureUrlFunction} url Feature URL service.
 * @param {import("./format/Feature.js").default} format Feature format.
 * @return {FeatureLoader} The feature loader.
 * @api
 */
export function xhr(url: string | ((arg0: number[], arg1: number, arg2: import("./proj/Projection.js").default) => string), format: import("./format/Feature.js").default): (this: import("./VectorTile.js").default | import("./source/Vector.js").default<any>, arg1: number[], arg2: number, arg3: import("./proj/Projection.js").default) => void;
/**
 * Setter for the withCredentials configuration for the XHR.
 *
 * @param {boolean} xhrWithCredentials The value of withCredentials to set.
 * Compare https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/
 * @api
 */
export function setWithCredentials(xhrWithCredentials: boolean): void;
/**
 * {@link module:ol/source/Vector} sources use a function of this type to
 * load features.
 *
 * This function takes an {@link module:ol/extent~Extent} representing the area to be loaded,
 * a `{number}` representing the resolution (map units per pixel) and an
 * {@link module:ol/proj/Projection} for the projection  as
 * arguments. `this` within the function is bound to the
 * {@link module:ol/source/Vector} it's called from.
 *
 * The function is responsible for loading the features and adding them to the
 * source.
 */
export type FeatureLoader = (this: import("./VectorTile.js").default | import("./source/Vector.js").default<any>, arg1: number[], arg2: number, arg3: import("./proj/Projection.js").default) => void;
/**
 * {@link module:ol/source/Vector} sources use a function of this type to
 * get the url to load features from.
 *
 * This function takes an {@link module:ol/extent~Extent} representing the area
 * to be loaded, a `{number}` representing the resolution (map units per pixel)
 * and an {@link module:ol/proj/Projection} for the projection  as
 * arguments and returns a `{string}` representing the URL.
 */
export type FeatureUrlFunction = (arg0: number[], arg1: number, arg2: import("./proj/Projection.js").default) => string;
//# sourceMappingURL=featureloader.d.ts.map