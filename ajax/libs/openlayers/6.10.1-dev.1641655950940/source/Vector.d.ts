/**
 * A function that takes an {@link module:ol/extent~Extent} and a resolution as arguments, and
 * returns an array of {@link module:ol/extent~Extent} with the extents to load. Usually this
 * is one of the standard {@link module:ol/loadingstrategy} strategies.
 *
 * @typedef {function(import("../extent.js").Extent, number, import("../proj/Projection.js").default): Array<import("../extent.js").Extent>} LoadingStrategy
 * @api
 */
/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Vector} instances are instances of this
 * type.
 * @template {import("../geom/Geometry.js").default} Geometry
 */
export class VectorSourceEvent<Geometry extends import("../geom/Geometry.js").default> extends Event {
    /**
     * @param {string} type Type.
     * @param {import("../Feature.js").default<Geometry>} [opt_feature] Feature.
     * @param {Array<import("../Feature.js").default<Geometry>>} [opt_features] Features.
     */
    constructor(type: string, opt_feature?: import("../Feature.js").default<Geometry> | undefined, opt_features?: import("../Feature.js").default<Geometry>[] | undefined);
    /**
     * The added or removed feature for the `ADDFEATURE` and `REMOVEFEATURE` events, `undefined` otherwise.
     * @type {import("../Feature.js").default<Geometry>|undefined}
     * @api
     */
    feature: import("../Feature.js").default<Geometry> | undefined;
    /**
     * The loaded features for the `FEATURESLOADED` event, `undefined` otherwise.
     * @type {Array<import("../Feature.js").default<Geometry>>|undefined}
     * @api
     */
    features: Array<import("../Feature.js").default<Geometry>> | undefined;
}
export default VectorSource;
/**
 * A function that takes an {@link module:ol/extent~Extent} and a resolution as arguments, and
 * returns an array of {@link module:ol/extent~Extent} with the extents to load. Usually this
 * is one of the standard {@link module:ol/loadingstrategy} strategies.
 */
export type LoadingStrategy = (arg0: number[], arg1: number, arg2: import("../proj/Projection.js").default) => number[][];
/**
 * *
 */
export type VectorSourceOnSignature<Return> = ((type: "change" | "error", listener: (event: Event) => any) => Return) & ((type: "propertychange", listener: (event: import("../Object.js").ObjectEvent) => any) => Return) & ((type: "clear" | "addfeature" | "changefeature" | "removefeature" | "featuresloadstart" | "featuresloadend" | "featuresloaderror", listener: (event: VectorSourceEvent<any>) => any) => Return) & ((type: ("propertychange" | "change" | "error" | "clear" | "addfeature" | "changefeature" | "removefeature" | "featuresloadstart" | "featuresloadend" | "featuresloaderror")[], listener: (event: Event | globalThis.Event) => any) => Return extends void | null ? void : Return[]);
export type Options = {
    /**
     * Attributions.
     */
    attributions?: string | string[] | ((arg0: import("../PluggableMap.js").FrameState) => string | string[]);
    /**
     * Features. If provided as {@link module:ol/Collection}, the features in the source
     * and the collection will stay in sync.
     */
    features?: import("../Feature.js").default<any>[] | Collection<import("../Feature.js").default<any>>;
    /**
     * The feature format used by the XHR
     * feature loader when `url` is set. Required if `url` is set, otherwise ignored.
     */
    format?: import("../format/Feature.js").default;
    /**
     * The loader function used to load features, from a remote source for example.
     * If this is not set and `url` is set, the source will create and use an XHR
     * feature loader. The `'featuresloadend'` and `'featuresloaderror'` events
     * will only fire if the `success` and `failure` callbacks are used.
     *
     * Example:
     *
     * ```js
     * import {Vector} from 'ol/source';
     * import {GeoJSON} from 'ol/format';
     * import {bbox} from 'ol/loadingstrategy';
     *
     * var vectorSource = new Vector({
     * format: new GeoJSON(),
     * loader: function(extent, resolution, projection, success, failure) {
     * var proj = projection.getCode();
     * var url = 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
     * 'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
     * 'outputFormat=application/json&srsname=' + proj + '&' +
     * 'bbox=' + extent.join(',') + ',' + proj;
     * var xhr = new XMLHttpRequest();
     * xhr.open('GET', url);
     * var onError = function() {
     * vectorSource.removeLoadedExtent(extent);
     * failure();
     * }
     * xhr.onerror = onError;
     * xhr.onload = function() {
     * if (xhr.status == 200) {
     * var features = vectorSource.getFormat().readFeatures(xhr.responseText);
     * vectorSource.addFeatures(features);
     * success(features);
     * } else {
     * onError();
     * }
     * }
     * xhr.send();
     * },
     * strategy: bbox
     * });
     * ```
     */
    loader?: (this: import("../VectorTile.js").default | VectorSource<any>, arg1: number[], arg2: number, arg3: import("../proj/Projection.js").default, arg4?: ((arg0: import("../Feature.js").default<any>[]) => void) | undefined, arg5?: (() => void) | undefined) => void;
    /**
     * This source may have overlapping geometries.
     * Setting this to `false` (e.g. for sources with polygons that represent administrative
     * boundaries or TopoJSON sources) allows the renderer to optimise fill and
     * stroke operations.
     */
    overlaps?: boolean;
    /**
     * The loading strategy to use.
     * By default an {@link module:ol/loadingstrategy.all}
     * strategy is used, a one-off strategy which loads all features at once.
     */
    strategy?: (arg0: number[], arg1: number, arg2: import("../proj/Projection.js").default) => number[][];
    /**
     * Setting this option instructs the source to load features using an XHR loader
     * (see {@link module:ol/featureloader.xhr}). Use a `string` and an
     * {@link module:ol/loadingstrategy.all} for a one-off download of all features from
     * the given URL. Use a {@link module:ol/featureloader~FeatureUrlFunction} to generate the url with
     * other loading strategies.
     * Requires `format` to be set as well.
     * When default XHR feature loader is provided, the features will
     * be transformed from the data projection to the view projection
     * during parsing. If your remote data source does not advertise its projection
     * properly, this transformation will be incorrect. For some formats, the
     * default projection (usually EPSG:4326) can be overridden by setting the
     * dataProjection constructor option on the format.
     * Note that if a source contains non-feature data, such as a GeoJSON geometry
     * or a KML NetworkLink, these will be ignored. Use a custom loader to load these.
     */
    url?: string | ((arg0: number[], arg1: number, arg2: import("../proj/Projection.js").default) => string);
    /**
     * By default, an RTree is used as spatial index. When features are removed and
     * added frequently, and the total number of features is low, setting this to
     * `false` may improve performance.
     *
     * Note that
     * {@link module:ol/source/Vector~VectorSource#getFeaturesInExtent},
     * {@link module:ol/source/Vector~VectorSource#getClosestFeatureToCoordinate} and
     * {@link module:ol/source/Vector~VectorSource#getExtent} cannot be used when `useSpatialIndex` is
     * set to `false`, and {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent} will loop
     * through all features.
     *
     * When set to `false`, the features will be maintained in an
     * {@link module:ol/Collection}, which can be retrieved through
     * {@link module:ol/source/Vector~VectorSource#getFeaturesCollection}.
     */
    useSpatialIndex?: boolean;
    /**
     * Wrap the world horizontally. For vector editing across the
     * -180° and 180° meridians to work properly, this should be set to `false`. The
     * resulting geometry coordinates will then exceed the world bounds.
     */
    wrapX?: boolean;
};
import Event from "../events/Event.js";
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("./VectorEventType").VectorSourceEventTypes, VectorSourceEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     import("./VectorEventType").VectorSourceEventTypes, Return>} VectorSourceOnSignature
 */
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {Array<import("../Feature.js").default>|Collection<import("../Feature.js").default>} [features]
 * Features. If provided as {@link module:ol/Collection}, the features in the source
 * and the collection will stay in sync.
 * @property {import("../format/Feature.js").default} [format] The feature format used by the XHR
 * feature loader when `url` is set. Required if `url` is set, otherwise ignored.
 * @property {import("../featureloader.js").FeatureLoader} [loader]
 * The loader function used to load features, from a remote source for example.
 * If this is not set and `url` is set, the source will create and use an XHR
 * feature loader. The `'featuresloadend'` and `'featuresloaderror'` events
 * will only fire if the `success` and `failure` callbacks are used.
 *
 * Example:
 *
 * ```js
 * import {Vector} from 'ol/source';
 * import {GeoJSON} from 'ol/format';
 * import {bbox} from 'ol/loadingstrategy';
 *
 * var vectorSource = new Vector({
 *   format: new GeoJSON(),
 *   loader: function(extent, resolution, projection, success, failure) {
 *      var proj = projection.getCode();
 *      var url = 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
 *          'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
 *          'outputFormat=application/json&srsname=' + proj + '&' +
 *          'bbox=' + extent.join(',') + ',' + proj;
 *      var xhr = new XMLHttpRequest();
 *      xhr.open('GET', url);
 *      var onError = function() {
 *        vectorSource.removeLoadedExtent(extent);
 *        failure();
 *      }
 *      xhr.onerror = onError;
 *      xhr.onload = function() {
 *        if (xhr.status == 200) {
 *          var features = vectorSource.getFormat().readFeatures(xhr.responseText);
 *          vectorSource.addFeatures(features);
 *          success(features);
 *        } else {
 *          onError();
 *        }
 *      }
 *      xhr.send();
 *    },
 *    strategy: bbox
 *  });
 * ```
 * @property {boolean} [overlaps=true] This source may have overlapping geometries.
 * Setting this to `false` (e.g. for sources with polygons that represent administrative
 * boundaries or TopoJSON sources) allows the renderer to optimise fill and
 * stroke operations.
 * @property {LoadingStrategy} [strategy] The loading strategy to use.
 * By default an {@link module:ol/loadingstrategy.all}
 * strategy is used, a one-off strategy which loads all features at once.
 * @property {string|import("../featureloader.js").FeatureUrlFunction} [url]
 * Setting this option instructs the source to load features using an XHR loader
 * (see {@link module:ol/featureloader.xhr}). Use a `string` and an
 * {@link module:ol/loadingstrategy.all} for a one-off download of all features from
 * the given URL. Use a {@link module:ol/featureloader~FeatureUrlFunction} to generate the url with
 * other loading strategies.
 * Requires `format` to be set as well.
 * When default XHR feature loader is provided, the features will
 * be transformed from the data projection to the view projection
 * during parsing. If your remote data source does not advertise its projection
 * properly, this transformation will be incorrect. For some formats, the
 * default projection (usually EPSG:4326) can be overridden by setting the
 * dataProjection constructor option on the format.
 * Note that if a source contains non-feature data, such as a GeoJSON geometry
 * or a KML NetworkLink, these will be ignored. Use a custom loader to load these.
 * @property {boolean} [useSpatialIndex=true]
 * By default, an RTree is used as spatial index. When features are removed and
 * added frequently, and the total number of features is low, setting this to
 * `false` may improve performance.
 *
 * Note that
 * {@link module:ol/source/Vector~VectorSource#getFeaturesInExtent},
 * {@link module:ol/source/Vector~VectorSource#getClosestFeatureToCoordinate} and
 * {@link module:ol/source/Vector~VectorSource#getExtent} cannot be used when `useSpatialIndex` is
 * set to `false`, and {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent} will loop
 * through all features.
 *
 * When set to `false`, the features will be maintained in an
 * {@link module:ol/Collection}, which can be retrieved through
 * {@link module:ol/source/Vector~VectorSource#getFeaturesCollection}.
 * @property {boolean} [wrapX=true] Wrap the world horizontally. For vector editing across the
 * -180° and 180° meridians to work properly, this should be set to `false`. The
 * resulting geometry coordinates will then exceed the world bounds.
 */
/**
 * @classdesc
 * Provides a source of features for vector layers. Vector features provided
 * by this source are suitable for editing. See {@link module:ol/source/VectorTile~VectorTile} for
 * vector data that is optimized for rendering.
 *
 * @fires VectorSourceEvent
 * @api
 * @template {import("../geom/Geometry.js").default} Geometry
 */
declare class VectorSource<Geometry extends import("../geom/Geometry.js").default> extends Source {
    /**
     * @param {Options} [opt_options] Vector source options.
     */
    constructor(opt_options?: Options | undefined);
    /***
     * @type {VectorSourceOnSignature<import("../events").EventsKey>}
     */
    on: VectorSourceOnSignature<import("../events").EventsKey>;
    /***
     * @type {VectorSourceOnSignature<import("../events").EventsKey>}
     */
    once: VectorSourceOnSignature<import("../events").EventsKey>;
    /***
     * @type {VectorSourceOnSignature<void>}
     */
    un: VectorSourceOnSignature<void>;
    /**
     * @private
     * @type {import("../featureloader.js").FeatureLoader}
     */
    private loader_;
    /**
     * @private
     * @type {import("../format/Feature.js").default|undefined}
     */
    private format_;
    /**
     * @private
     * @type {boolean}
     */
    private overlaps_;
    /**
     * @private
     * @type {string|import("../featureloader.js").FeatureUrlFunction|undefined}
     */
    private url_;
    /**
     * @private
     * @type {LoadingStrategy}
     */
    private strategy_;
    /**
     * @private
     * @type {RBush<import("../Feature.js").default<Geometry>>}
     */
    private featuresRtree_;
    /**
     * @private
     * @type {RBush<{extent: import("../extent.js").Extent}>}
     */
    private loadedExtentsRtree_;
    /**
     * @type {number}
     * @private
     */
    private loadingExtentsCount_;
    /**
     * @private
     * @type {!Object<string, import("../Feature.js").default<Geometry>>}
     */
    private nullGeometryFeatures_;
    /**
     * A lookup of features by id (the return from feature.getId()).
     * @private
     * @type {!Object<string, import("../Feature.js").default<Geometry>>}
     */
    private idIndex_;
    /**
     * A lookup of features by uid (using getUid(feature)).
     * @private
     * @type {!Object<string, import("../Feature.js").default<Geometry>>}
     */
    private uidIndex_;
    /**
     * @private
     * @type {Object<string, Array<import("../events.js").EventsKey>>}
     */
    private featureChangeKeys_;
    /**
     * @private
     * @type {Collection<import("../Feature.js").default<Geometry>>}
     */
    private featuresCollection_;
    /**
     * Add a single feature to the source.  If you want to add a batch of features
     * at once, call {@link module:ol/source/Vector~VectorSource#addFeatures #addFeatures()}
     * instead. A feature will not be added to the source if feature with
     * the same id is already there. The reason for this behavior is to avoid
     * feature duplication when using bbox or tile loading strategies.
     * Note: this also applies if an {@link module:ol/Collection} is used for features,
     * meaning that if a feature with a duplicate id is added in the collection, it will
     * be removed from it right away.
     * @param {import("../Feature.js").default<Geometry>} feature Feature to add.
     * @api
     */
    addFeature(feature: import("../Feature.js").default<Geometry>): void;
    /**
     * Add a feature without firing a `change` event.
     * @param {import("../Feature.js").default<Geometry>} feature Feature.
     * @protected
     */
    protected addFeatureInternal(feature: import("../Feature.js").default<Geometry>): void;
    /**
     * @param {string} featureKey Unique identifier for the feature.
     * @param {import("../Feature.js").default<Geometry>} feature The feature.
     * @private
     */
    private setupChangeEvents_;
    /**
     * @param {string} featureKey Unique identifier for the feature.
     * @param {import("../Feature.js").default<Geometry>} feature The feature.
     * @return {boolean} The feature is "valid", in the sense that it is also a
     *     candidate for insertion into the Rtree.
     * @private
     */
    private addToIndex_;
    /**
     * Add a batch of features to the source.
     * @param {Array<import("../Feature.js").default<Geometry>>} features Features to add.
     * @api
     */
    addFeatures(features: import("../Feature.js").default<Geometry>[]): void;
    /**
     * Add features without firing a `change` event.
     * @param {Array<import("../Feature.js").default<Geometry>>} features Features.
     * @protected
     */
    protected addFeaturesInternal(features: import("../Feature.js").default<Geometry>[]): void;
    /**
     * @param {!Collection<import("../Feature.js").default<Geometry>>} collection Collection.
     * @private
     */
    private bindFeaturesCollection_;
    /**
     * Remove all features from the source.
     * @param {boolean} [opt_fast] Skip dispatching of {@link module:ol/source/Vector.VectorSourceEvent#event:removefeature removefeature} events.
     * @api
     */
    clear(opt_fast?: boolean | undefined): void;
    /**
     * Iterate through all features on the source, calling the provided callback
     * with each one.  If the callback returns any "truthy" value, iteration will
     * stop and the function will return the same value.
     * Note: this function only iterate through the feature that have a defined geometry.
     *
     * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
     *     on the source.  Return a truthy value to stop iteration.
     * @return {T|undefined} The return value from the last call to the callback.
     * @template T
     * @api
     */
    forEachFeature<T>(callback: (arg0: import("../Feature.js").default<Geometry>) => T): T | undefined;
    /**
     * Iterate through all features whose geometries contain the provided
     * coordinate, calling the callback with each feature.  If the callback returns
     * a "truthy" value, iteration will stop and the function will return the same
     * value.
     *
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
     *     whose goemetry contains the provided coordinate.
     * @return {T|undefined} The return value from the last call to the callback.
     * @template T
     */
    forEachFeatureAtCoordinateDirect<T_1>(coordinate: number[], callback: (arg0: import("../Feature.js").default<Geometry>) => T_1): T_1 | undefined;
    /**
     * Iterate through all features whose bounding box intersects the provided
     * extent (note that the feature's geometry may not intersect the extent),
     * calling the callback with each feature.  If the callback returns a "truthy"
     * value, iteration will stop and the function will return the same value.
     *
     * If you are interested in features whose geometry intersects an extent, call
     * the {@link module:ol/source/Vector~VectorSource#forEachFeatureIntersectingExtent #forEachFeatureIntersectingExtent()} method instead.
     *
     * When `useSpatialIndex` is set to false, this method will loop through all
     * features, equivalent to {@link module:ol/source/Vector~VectorSource#forEachFeature #forEachFeature()}.
     *
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
     *     whose bounding box intersects the provided extent.
     * @return {T|undefined} The return value from the last call to the callback.
     * @template T
     * @api
     */
    forEachFeatureInExtent<T_2>(extent: number[], callback: (arg0: import("../Feature.js").default<Geometry>) => T_2): T_2 | undefined;
    /**
     * Iterate through all features whose geometry intersects the provided extent,
     * calling the callback with each feature.  If the callback returns a "truthy"
     * value, iteration will stop and the function will return the same value.
     *
     * If you only want to test for bounding box intersection, call the
     * {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent #forEachFeatureInExtent()} method instead.
     *
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
     *     whose geometry intersects the provided extent.
     * @return {T|undefined} The return value from the last call to the callback.
     * @template T
     * @api
     */
    forEachFeatureIntersectingExtent<T_3>(extent: number[], callback: (arg0: import("../Feature.js").default<Geometry>) => T_3): T_3 | undefined;
    /**
     * Get the features collection associated with this source. Will be `null`
     * unless the source was configured with `useSpatialIndex` set to `false`, or
     * with an {@link module:ol/Collection} as `features`.
     * @return {Collection<import("../Feature.js").default<Geometry>>} The collection of features.
     * @api
     */
    getFeaturesCollection(): Collection<import("../Feature.js").default<Geometry>>;
    /**
     * Get a snapshot of the features currently on the source in random order. The returned array
     * is a copy, the features are references to the features in the source.
     * @return {Array<import("../Feature.js").default<Geometry>>} Features.
     * @api
     */
    getFeatures(): import("../Feature.js").default<Geometry>[];
    /**
     * Get all features whose geometry intersects the provided coordinate.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {Array<import("../Feature.js").default<Geometry>>} Features.
     * @api
     */
    getFeaturesAtCoordinate(coordinate: number[]): import("../Feature.js").default<Geometry>[];
    /**
     * Get all features whose bounding box intersects the provided extent.  Note that this returns an array of
     * all features intersecting the given extent in random order (so it may include
     * features whose geometries do not intersect the extent).
     *
     * When `useSpatialIndex` is set to false, this method will return all
     * features.
     *
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {Array<import("../Feature.js").default<Geometry>>} Features.
     * @api
     */
    getFeaturesInExtent(extent: number[]): import("../Feature.js").default<Geometry>[];
    /**
     * Get the closest feature to the provided coordinate.
     *
     * This method is not available when the source is configured with
     * `useSpatialIndex` set to `false`.
     * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {function(import("../Feature.js").default<Geometry>):boolean} [opt_filter] Feature filter function.
     *     The filter function will receive one argument, the {@link module:ol/Feature feature}
     *     and it should return a boolean value. By default, no filtering is made.
     * @return {import("../Feature.js").default<Geometry>} Closest feature.
     * @api
     */
    getClosestFeatureToCoordinate(coordinate: number[], opt_filter?: ((arg0: import("../Feature.js").default<Geometry>) => boolean) | undefined): import("../Feature.js").default<Geometry>;
    /**
     * Get the extent of the features currently in the source.
     *
     * This method is not available when the source is configured with
     * `useSpatialIndex` set to `false`.
     * @param {import("../extent.js").Extent} [opt_extent] Destination extent. If provided, no new extent
     *     will be created. Instead, that extent's coordinates will be overwritten.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    getExtent(opt_extent?: number[] | undefined): number[];
    /**
     * Get a feature by its identifier (the value returned by feature.getId()).
     * Note that the index treats string and numeric identifiers as the same.  So
     * `source.getFeatureById(2)` will return a feature with id `'2'` or `2`.
     *
     * @param {string|number} id Feature identifier.
     * @return {import("../Feature.js").default<Geometry>} The feature (or `null` if not found).
     * @api
     */
    getFeatureById(id: string | number): import("../Feature.js").default<Geometry>;
    /**
     * Get a feature by its internal unique identifier (using `getUid`).
     *
     * @param {string} uid Feature identifier.
     * @return {import("../Feature.js").default<Geometry>} The feature (or `null` if not found).
     */
    getFeatureByUid(uid: string): import("../Feature.js").default<Geometry>;
    /**
     * Get the format associated with this source.
     *
     * @return {import("../format/Feature.js").default|undefined} The feature format.
     * @api
     */
    getFormat(): import("../format/Feature.js").default | undefined;
    /**
     * @return {boolean} The source can have overlapping geometries.
     */
    getOverlaps(): boolean;
    /**
     * Get the url associated with this source.
     *
     * @return {string|import("../featureloader.js").FeatureUrlFunction|undefined} The url.
     * @api
     */
    getUrl(): string | ((arg0: number[], arg1: number, arg2: import("../proj/Projection.js").default) => string) | undefined;
    /**
     * @param {Event} event Event.
     * @private
     */
    private handleFeatureChange_;
    /**
     * Returns true if the feature is contained within the source.
     * @param {import("../Feature.js").default<Geometry>} feature Feature.
     * @return {boolean} Has feature.
     * @api
     */
    hasFeature(feature: import("../Feature.js").default<Geometry>): boolean;
    /**
     * @return {boolean} Is empty.
     */
    isEmpty(): boolean;
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {import("../proj/Projection.js").default} projection Projection.
     */
    loadFeatures(extent: number[], resolution: number, projection: import("../proj/Projection.js").default): void;
    /**
     * Remove an extent from the list of loaded extents.
     * @param {import("../extent.js").Extent} extent Extent.
     * @api
     */
    removeLoadedExtent(extent: number[]): void;
    /**
     * Remove a single feature from the source.  If you want to remove all features
     * at once, use the {@link module:ol/source/Vector~VectorSource#clear #clear()} method
     * instead.
     * @param {import("../Feature.js").default<Geometry>} feature Feature to remove.
     * @api
     */
    removeFeature(feature: import("../Feature.js").default<Geometry>): void;
    /**
     * Remove feature without firing a `change` event.
     * @param {import("../Feature.js").default<Geometry>} feature Feature.
     * @return {import("../Feature.js").default<Geometry>|undefined} The removed feature
     *     (or undefined if the feature was not found).
     * @protected
     */
    protected removeFeatureInternal(feature: import("../Feature.js").default<Geometry>): import("../Feature.js").default<Geometry> | undefined;
    /**
     * Remove a feature from the id index.  Called internally when the feature id
     * may have changed.
     * @param {import("../Feature.js").default<Geometry>} feature The feature.
     * @return {boolean} Removed the feature from the index.
     * @private
     */
    private removeFromIdIndex_;
    /**
     * Set the new loader of the source. The next render cycle will use the
     * new loader.
     * @param {import("../featureloader.js").FeatureLoader} loader The loader to set.
     * @api
     */
    setLoader(loader: (this: import("../VectorTile.js").default | VectorSource<any>, arg1: number[], arg2: number, arg3: import("../proj/Projection.js").default, arg4?: ((arg0: import("../Feature.js").default<any>[]) => void) | undefined, arg5?: (() => void) | undefined) => void): void;
    /**
     * Points the source to a new url. The next render cycle will use the new url.
     * @param {string|import("../featureloader.js").FeatureUrlFunction} url Url.
     * @api
     */
    setUrl(url: string | ((arg0: number[], arg1: number, arg2: import("../proj/Projection.js").default) => string)): void;
}
import Collection from "../Collection.js";
import Source from "./Source.js";
//# sourceMappingURL=Vector.d.ts.map