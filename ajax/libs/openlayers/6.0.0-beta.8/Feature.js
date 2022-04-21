var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/Feature
 */
import { assert } from './asserts.js';
import { listen, unlisten, unlistenByKey } from './events.js';
import EventType from './events/EventType.js';
import BaseObject, { getChangeEventType } from './Object.js';
/**
 * @typedef {typeof Feature|typeof import("./render/Feature.js").default} FeatureClass
 */
/**
 * @typedef {Feature|import("./render/Feature.js").default} FeatureLike
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
 * Note that attribute properties are set as {@link module:ol/Object} properties on
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
 * var feature = new Feature({
 *   geometry: new Polygon(polyCoords),
 *   labelPoint: new Point(labelCoords),
 *   name: 'My Polygon'
 * });
 *
 * // get the polygon geometry
 * var poly = feature.getGeometry();
 *
 * // Render the feature as a point using the coordinates from labelPoint
 * feature.setGeometryName('labelPoint');
 *
 * // get the point geometry
 * var point = feature.getGeometry();
 * ```
 *
 * @api
 */
var Feature = /** @class */ (function (_super) {
    __extends(Feature, _super);
    /**
     * @param {import("./geom/Geometry.js").default|Object<string, *>=} opt_geometryOrProperties
     *     You may pass a Geometry object directly, or an object literal containing
     *     properties. If you pass an object literal, you may include a Geometry
     *     associated with a `geometry` key.
     */
    function Feature(opt_geometryOrProperties) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {number|string|undefined}
         */
        _this.id_ = undefined;
        /**
         * @type {string}
         * @private
         */
        _this.geometryName_ = 'geometry';
        /**
         * User provided style.
         * @private
         * @type {import("./style/Style.js").StyleLike}
         */
        _this.style_ = null;
        /**
         * @private
         * @type {import("./style/Style.js").StyleFunction|undefined}
         */
        _this.styleFunction_ = undefined;
        /**
         * @private
         * @type {?import("./events.js").EventsKey}
         */
        _this.geometryChangeKey_ = null;
        listen(_this, getChangeEventType(_this.geometryName_), _this.handleGeometryChanged_, _this);
        if (opt_geometryOrProperties) {
            if (typeof /** @type {?} */ (opt_geometryOrProperties).getSimplifiedGeometry === 'function') {
                var geometry = /** @type {import("./geom/Geometry.js").default} */ (opt_geometryOrProperties);
                _this.setGeometry(geometry);
            }
            else {
                /** @type {Object<string, *>} */
                var properties = opt_geometryOrProperties;
                _this.setProperties(properties);
            }
        }
        return _this;
    }
    /**
     * Clone this feature. If the original feature has a geometry it
     * is also cloned. The feature id is not set in the clone.
     * @return {Feature} The clone.
     * @api
     */
    Feature.prototype.clone = function () {
        var clone = new Feature(this.getProperties());
        clone.setGeometryName(this.getGeometryName());
        var geometry = this.getGeometry();
        if (geometry) {
            clone.setGeometry(geometry.clone());
        }
        var style = this.getStyle();
        if (style) {
            clone.setStyle(style);
        }
        return clone;
    };
    /**
     * Get the feature's default geometry.  A feature may have any number of named
     * geometries.  The "default" geometry (the one that is rendered by default) is
     * set when calling {@link module:ol/Feature~Feature#setGeometry}.
     * @return {import("./geom/Geometry.js").default|undefined} The default geometry for the feature.
     * @api
     * @observable
     */
    Feature.prototype.getGeometry = function () {
        return (
        /** @type {import("./geom/Geometry.js").default|undefined} */ (this.get(this.geometryName_)));
    };
    /**
     * Get the feature identifier.  This is a stable identifier for the feature and
     * is either set when reading data from a remote source or set explicitly by
     * calling {@link module:ol/Feature~Feature#setId}.
     * @return {number|string|undefined} Id.
     * @api
     */
    Feature.prototype.getId = function () {
        return this.id_;
    };
    /**
     * Get the name of the feature's default geometry.  By default, the default
     * geometry is named `geometry`.
     * @return {string} Get the property name associated with the default geometry
     *     for this feature.
     * @api
     */
    Feature.prototype.getGeometryName = function () {
        return this.geometryName_;
    };
    /**
     * Get the feature's style. Will return what was provided to the
     * {@link module:ol/Feature~Feature#setStyle} method.
     * @return {import("./style/Style.js").StyleLike} The feature style.
     * @api
     */
    Feature.prototype.getStyle = function () {
        return this.style_;
    };
    /**
     * Get the feature's style function.
     * @return {import("./style/Style.js").StyleFunction|undefined} Return a function
     * representing the current style of this feature.
     * @api
     */
    Feature.prototype.getStyleFunction = function () {
        return this.styleFunction_;
    };
    /**
     * @private
     */
    Feature.prototype.handleGeometryChange_ = function () {
        this.changed();
    };
    /**
     * @private
     */
    Feature.prototype.handleGeometryChanged_ = function () {
        if (this.geometryChangeKey_) {
            unlistenByKey(this.geometryChangeKey_);
            this.geometryChangeKey_ = null;
        }
        var geometry = this.getGeometry();
        if (geometry) {
            this.geometryChangeKey_ = listen(geometry, EventType.CHANGE, this.handleGeometryChange_, this);
        }
        this.changed();
    };
    /**
     * Set the default geometry for the feature.  This will update the property
     * with the name returned by {@link module:ol/Feature~Feature#getGeometryName}.
     * @param {import("./geom/Geometry.js").default|undefined} geometry The new geometry.
     * @api
     * @observable
     */
    Feature.prototype.setGeometry = function (geometry) {
        this.set(this.geometryName_, geometry);
    };
    /**
     * Set the style for the feature.  This can be a single style object, an array
     * of styles, or a function that takes a resolution and returns an array of
     * styles. If it is `null` the feature has no style (a `null` style).
     * @param {import("./style/Style.js").StyleLike} style Style for this feature.
     * @api
     * @fires module:ol/events/Event~Event#event:change
     */
    Feature.prototype.setStyle = function (style) {
        this.style_ = style;
        this.styleFunction_ = !style ? undefined : createStyleFunction(style);
        this.changed();
    };
    /**
     * Set the feature id.  The feature id is considered stable and may be used when
     * requesting features or comparing identifiers returned from a remote source.
     * The feature id can be used with the
     * {@link module:ol/source/Vector~VectorSource#getFeatureById} method.
     * @param {number|string|undefined} id The feature id.
     * @api
     * @fires module:ol/events/Event~Event#event:change
     */
    Feature.prototype.setId = function (id) {
        this.id_ = id;
        this.changed();
    };
    /**
     * Set the property name to be used when getting the feature's default geometry.
     * When calling {@link module:ol/Feature~Feature#getGeometry}, the value of the property with
     * this name will be returned.
     * @param {string} name The property name of the default geometry.
     * @api
     */
    Feature.prototype.setGeometryName = function (name) {
        unlisten(this, getChangeEventType(this.geometryName_), this.handleGeometryChanged_, this);
        this.geometryName_ = name;
        listen(this, getChangeEventType(this.geometryName_), this.handleGeometryChanged_, this);
        this.handleGeometryChanged_();
    };
    return Feature;
}(BaseObject));
/**
 * Convert the provided object into a feature style function.  Functions passed
 * through unchanged.  Arrays of Style or single style objects wrapped
 * in a new feature style function.
 * @param {!import("./style/Style.js").StyleFunction|!Array<import("./style/Style.js").default>|!import("./style/Style.js").default} obj
 *     A feature style function, a single style, or an array of styles.
 * @return {import("./style/Style.js").StyleFunction} A style function.
 */
export function createStyleFunction(obj) {
    if (typeof obj === 'function') {
        return obj;
    }
    else {
        /**
         * @type {Array<import("./style/Style.js").default>}
         */
        var styles_1;
        if (Array.isArray(obj)) {
            styles_1 = obj;
        }
        else {
            assert(typeof /** @type {?} */ (obj).getZIndex === 'function', 41); // Expected an `import("./style/Style.js").Style` or an array of `import("./style/Style.js").Style`
            var style = /** @type {import("./style/Style.js").default} */ (obj);
            styles_1 = [style];
        }
        return function () {
            return styles_1;
        };
    }
}
export default Feature;
//# sourceMappingURL=Feature.js.map