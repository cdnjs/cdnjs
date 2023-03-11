/**
 * Convert the provided object into a feature style function.  Functions passed
 * through unchanged.  Arrays of Style or single style objects wrapped
 * in a new feature style function.
 * @param {!import("./style/Style.js").StyleFunction|!Array<import("./style/Style.js").default>|!import("./style/Style.js").default} obj
 *     A feature style function, a single style, or an array of styles.
 * @return {import("./style/Style.js").StyleFunction} A style function.
 */
export function createStyleFunction(obj: import("./style/Style.js").StyleFunction | Array<import("./style/Style.js").default> | import("./style/Style.js").default): import("./style/Style.js").StyleFunction;
export default Feature;
export type FeatureClass = typeof Feature | typeof import("./render/Feature.js").default;
export type FeatureLike = Feature | import("./render/Feature.js").default;
/**
 * *
 */
export type FeatureOnSignature<Return> = import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> & import("./Observable").OnSignature<import("./ObjectEventType").Types | 'change:geometry', import("./Object").ObjectEvent, Return> & import("./Observable").CombinedOnSignature<import("./Observable").EventTypes | import("./ObjectEventType").Types | 'change:geometry', Return>;
/**
 * *
 */
export type ObjectWithGeometry<Geometry> = {
    [x: string]: any;
} & {
    geometry?: Geometry;
};
/**
 * @typedef {typeof Feature|typeof import("./render/Feature.js").default} FeatureClass
 */
/**
 * @typedef {Feature|import("./render/Feature.js").default} FeatureLike
 */
/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<import("./ObjectEventType").Types|'change:geometry', import("./Object").ObjectEvent, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|import("./ObjectEventType").Types
 *     |'change:geometry', Return>} FeatureOnSignature
 */
/***
 * @template Geometry
 * @typedef {Object<string, *> & { geometry?: Geometry }} ObjectWithGeometry
 */
/**
 * @classdesc
 * A vector object for geographic features with a geometry and other
 * attribute properties, similar to the features in vector file formats like
 * GeoJSON.
 *
 * Features can be styled individually with `setStyle`; otherwise they use the
 * style of their vector layer.
 *
 * Note that attribute properties are set as {@link module:ol/Object~BaseObject} properties on
 * the feature object, so they are observable, and have get/set accessors.
 *
 * Typically, a feature has a single geometry property. You can set the
 * geometry using the `setGeometry` method and get it with `getGeometry`.
 * It is possible to store more than one geometry on a feature using attribute
 * properties. By default, the geometry used for rendering is identified by
 * the property name `geometry`. If you want to use another geometry property
 * for rendering, use the `setGeometryName` method to change the attribute
 * property associated with the geometry for the feature.  For example:
 *
 * ```js
 *
 * import Feature from 'ol/Feature';
 * import Polygon from 'ol/geom/Polygon';
 * import Point from 'ol/geom/Point';
 *
 * const feature = new Feature({
 *   geometry: new Polygon(polyCoords),
 *   labelPoint: new Point(labelCoords),
 *   name: 'My Polygon',
 * });
 *
 * // get the polygon geometry
 * const poly = feature.getGeometry();
 *
 * // Render the feature as a point using the coordinates from labelPoint
 * feature.setGeometryName('labelPoint');
 *
 * // get the point geometry
 * const point = feature.getGeometry();
 * ```
 *
 * @api
 * @template {import("./geom/Geometry.js").default} [Geometry=import("./geom/Geometry.js").default]
 */
declare class Feature<Geometry extends import("./geom/Geometry.js").default = import("./geom/Geometry.js").default> extends BaseObject {
    /**
     * @param {Geometry|ObjectWithGeometry<Geometry>} [geometryOrProperties]
     *     You may pass a Geometry object directly, or an object literal containing
     *     properties. If you pass an object literal, you may include a Geometry
     *     associated with a `geometry` key.
     */
    constructor(geometryOrProperties?: Geometry | ObjectWithGeometry<Geometry> | undefined);
    /***
     * @type {FeatureOnSignature<import("./events").EventsKey>}
     */
    on: FeatureOnSignature<import("./events").EventsKey>;
    /***
     * @type {FeatureOnSignature<import("./events").EventsKey>}
     */
    once: FeatureOnSignature<import("./events").EventsKey>;
    /***
     * @type {FeatureOnSignature<void>}
     */
    un: FeatureOnSignature<void>;
    /**
     * @private
     * @type {number|string|undefined}
     */
    private id_;
    /**
     * @type {string}
     * @private
     */
    private geometryName_;
    /**
     * User provided style.
     * @private
     * @type {import("./style/Style.js").StyleLike}
     */
    private style_;
    /**
     * @private
     * @type {import("./style/Style.js").StyleFunction|undefined}
     */
    private styleFunction_;
    /**
     * @private
     * @type {?import("./events.js").EventsKey}
     */
    private geometryChangeKey_;
    /**
     * Clone this feature. If the original feature has a geometry it
     * is also cloned. The feature id is not set in the clone.
     * @return {Feature<Geometry>} The clone.
     * @api
     */
    clone(): Feature<Geometry>;
    /**
     * Get the feature's default geometry.  A feature may have any number of named
     * geometries.  The "default" geometry (the one that is rendered by default) is
     * set when calling {@link module:ol/Feature~Feature#setGeometry}.
     * @return {Geometry|undefined} The default geometry for the feature.
     * @api
     * @observable
     */
    getGeometry(): Geometry | undefined;
    /**
     * Get the feature identifier.  This is a stable identifier for the feature and
     * is either set when reading data from a remote source or set explicitly by
     * calling {@link module:ol/Feature~Feature#setId}.
     * @return {number|string|undefined} Id.
     * @api
     */
    getId(): number | string | undefined;
    /**
     * Get the name of the feature's default geometry.  By default, the default
     * geometry is named `geometry`.
     * @return {string} Get the property name associated with the default geometry
     *     for this feature.
     * @api
     */
    getGeometryName(): string;
    /**
     * Get the feature's style. Will return what was provided to the
     * {@link module:ol/Feature~Feature#setStyle} method.
     * @return {import("./style/Style.js").StyleLike|undefined} The feature style.
     * @api
     */
    getStyle(): import("./style/Style.js").StyleLike | undefined;
    /**
     * Get the feature's style function.
     * @return {import("./style/Style.js").StyleFunction|undefined} Return a function
     * representing the current style of this feature.
     * @api
     */
    getStyleFunction(): import("./style/Style.js").StyleFunction | undefined;
    /**
     * @private
     */
    private handleGeometryChange_;
    /**
     * @private
     */
    private handleGeometryChanged_;
    /**
     * Set the default geometry for the feature.  This will update the property
     * with the name returned by {@link module:ol/Feature~Feature#getGeometryName}.
     * @param {Geometry|undefined} geometry The new geometry.
     * @api
     * @observable
     */
    setGeometry(geometry: Geometry | undefined): void;
    /**
     * Set the style for the feature to override the layer style.  This can be a
     * single style object, an array of styles, or a function that takes a
     * resolution and returns an array of styles. To unset the feature style, call
     * `setStyle()` without arguments or a falsey value.
     * @param {import("./style/Style.js").StyleLike} [style] Style for this feature.
     * @api
     * @fires module:ol/events/Event~BaseEvent#event:change
     */
    setStyle(style?: import("./style/Style.js").StyleLike | undefined): void;
    /**
     * Set the feature id.  The feature id is considered stable and may be used when
     * requesting features or comparing identifiers returned from a remote source.
     * The feature id can be used with the
     * {@link module:ol/source/Vector~VectorSource#getFeatureById} method.
     * @param {number|string|undefined} id The feature id.
     * @api
     * @fires module:ol/events/Event~BaseEvent#event:change
     */
    setId(id: number | string | undefined): void;
    /**
     * Set the property name to be used when getting the feature's default geometry.
     * When calling {@link module:ol/Feature~Feature#getGeometry}, the value of the property with
     * this name will be returned.
     * @param {string} name The property name of the default geometry.
     * @api
     */
    setGeometryName(name: string): void;
}
import BaseObject from "./Object.js";
//# sourceMappingURL=Feature.d.ts.map