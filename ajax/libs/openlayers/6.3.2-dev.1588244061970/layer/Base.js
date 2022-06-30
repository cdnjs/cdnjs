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
 * @module ol/layer/Base
 */
import BaseObject from '../Object.js';
import LayerProperty from './Property.js';
import { abstract } from '../util.js';
import { assert } from '../asserts.js';
import { assign } from '../obj.js';
import { clamp } from '../math.js';
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Note that with {@link module:ol/layer/Base} and all its subclasses, any property set in
 * the options is set as a {@link module:ol/Object} property on the layer object, so
 * is observable, and has get/set accessors.
 *
 * @api
 */
var BaseLayer = /** @class */ (function (_super) {
    __extends(BaseLayer, _super);
    /**
     * @param {Options} options Layer options.
     */
    function BaseLayer(options) {
        var _this = _super.call(this) || this;
        /**
         * @type {Object<string, *>}
         */
        var properties = assign({}, options);
        properties[LayerProperty.OPACITY] =
            options.opacity !== undefined ? options.opacity : 1;
        assert(typeof properties[LayerProperty.OPACITY] === 'number', 64); // Layer opacity must be a number
        properties[LayerProperty.VISIBLE] =
            options.visible !== undefined ? options.visible : true;
        properties[LayerProperty.Z_INDEX] = options.zIndex;
        properties[LayerProperty.MAX_RESOLUTION] =
            options.maxResolution !== undefined ? options.maxResolution : Infinity;
        properties[LayerProperty.MIN_RESOLUTION] =
            options.minResolution !== undefined ? options.minResolution : 0;
        properties[LayerProperty.MIN_ZOOM] =
            options.minZoom !== undefined ? options.minZoom : -Infinity;
        properties[LayerProperty.MAX_ZOOM] =
            options.maxZoom !== undefined ? options.maxZoom : Infinity;
        /**
         * @type {string}
         * @private
         */
        _this.className_ =
            properties.className !== undefined ? options.className : 'ol-layer';
        delete properties.className;
        _this.setProperties(properties);
        /**
         * @type {import("./Layer.js").State}
         * @private
         */
        _this.state_ = null;
        return _this;
    }
    /**
     * @return {string} CSS class name.
     */
    BaseLayer.prototype.getClassName = function () {
        return this.className_;
    };
    /**
     * This method is not meant to be called by layers or layer renderers because the state
     * is incorrect if the layer is included in a layer group.
     *
     * @param {boolean=} opt_managed Layer is managed.
     * @return {import("./Layer.js").State} Layer state.
     */
    BaseLayer.prototype.getLayerState = function (opt_managed) {
        /** @type {import("./Layer.js").State} */
        var state = this.state_ ||
            /** @type {?} */ ({
                layer: this,
                managed: opt_managed === undefined ? true : opt_managed,
            });
        var zIndex = this.getZIndex();
        state.opacity = clamp(Math.round(this.getOpacity() * 100) / 100, 0, 1);
        state.sourceState = this.getSourceState();
        state.visible = this.getVisible();
        state.extent = this.getExtent();
        state.zIndex =
            zIndex !== undefined ? zIndex : state.managed === false ? Infinity : 0;
        state.maxResolution = this.getMaxResolution();
        state.minResolution = Math.max(this.getMinResolution(), 0);
        state.minZoom = this.getMinZoom();
        state.maxZoom = this.getMaxZoom();
        this.state_ = state;
        return state;
    };
    /**
     * @abstract
     * @param {Array<import("./Layer.js").default>=} opt_array Array of layers (to be
     *     modified in place).
     * @return {Array<import("./Layer.js").default>} Array of layers.
     */
    BaseLayer.prototype.getLayersArray = function (opt_array) {
        return abstract();
    };
    /**
     * @abstract
     * @param {Array<import("./Layer.js").State>=} opt_states Optional list of layer
     *     states (to be modified in place).
     * @return {Array<import("./Layer.js").State>} List of layer states.
     */
    BaseLayer.prototype.getLayerStatesArray = function (opt_states) {
        return abstract();
    };
    /**
     * Return the {@link module:ol/extent~Extent extent} of the layer or `undefined` if it
     * will be visible regardless of extent.
     * @return {import("../extent.js").Extent|undefined} The layer extent.
     * @observable
     * @api
     */
    BaseLayer.prototype.getExtent = function () {
        return /** @type {import("../extent.js").Extent|undefined} */ (this.get(LayerProperty.EXTENT));
    };
    /**
     * Return the maximum resolution of the layer.
     * @return {number} The maximum resolution of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getMaxResolution = function () {
        return /** @type {number} */ (this.get(LayerProperty.MAX_RESOLUTION));
    };
    /**
     * Return the minimum resolution of the layer.
     * @return {number} The minimum resolution of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getMinResolution = function () {
        return /** @type {number} */ (this.get(LayerProperty.MIN_RESOLUTION));
    };
    /**
     * Return the minimum zoom level of the layer.
     * @return {number} The minimum zoom level of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getMinZoom = function () {
        return /** @type {number} */ (this.get(LayerProperty.MIN_ZOOM));
    };
    /**
     * Return the maximum zoom level of the layer.
     * @return {number} The maximum zoom level of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getMaxZoom = function () {
        return /** @type {number} */ (this.get(LayerProperty.MAX_ZOOM));
    };
    /**
     * Return the opacity of the layer (between 0 and 1).
     * @return {number} The opacity of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getOpacity = function () {
        return /** @type {number} */ (this.get(LayerProperty.OPACITY));
    };
    /**
     * @abstract
     * @return {import("../source/State.js").default} Source state.
     */
    BaseLayer.prototype.getSourceState = function () {
        return abstract();
    };
    /**
     * Return the visibility of the layer (`true` or `false`).
     * @return {boolean} The visibility of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getVisible = function () {
        return /** @type {boolean} */ (this.get(LayerProperty.VISIBLE));
    };
    /**
     * Return the Z-index of the layer, which is used to order layers before
     * rendering. The default Z-index is 0.
     * @return {number} The Z-index of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.getZIndex = function () {
        return /** @type {number} */ (this.get(LayerProperty.Z_INDEX));
    };
    /**
     * Set the extent at which the layer is visible.  If `undefined`, the layer
     * will be visible at all extents.
     * @param {import("../extent.js").Extent|undefined} extent The extent of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setExtent = function (extent) {
        this.set(LayerProperty.EXTENT, extent);
    };
    /**
     * Set the maximum resolution at which the layer is visible.
     * @param {number} maxResolution The maximum resolution of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setMaxResolution = function (maxResolution) {
        this.set(LayerProperty.MAX_RESOLUTION, maxResolution);
    };
    /**
     * Set the minimum resolution at which the layer is visible.
     * @param {number} minResolution The minimum resolution of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setMinResolution = function (minResolution) {
        this.set(LayerProperty.MIN_RESOLUTION, minResolution);
    };
    /**
     * Set the maximum zoom (exclusive) at which the layer is visible.
     * Note that the zoom levels for layer visibility are based on the
     * view zoom level, which may be different from a tile source zoom level.
     * @param {number} maxZoom The maximum zoom of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setMaxZoom = function (maxZoom) {
        this.set(LayerProperty.MAX_ZOOM, maxZoom);
    };
    /**
     * Set the minimum zoom (inclusive) at which the layer is visible.
     * Note that the zoom levels for layer visibility are based on the
     * view zoom level, which may be different from a tile source zoom level.
     * @param {number} minZoom The minimum zoom of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setMinZoom = function (minZoom) {
        this.set(LayerProperty.MIN_ZOOM, minZoom);
    };
    /**
     * Set the opacity of the layer, allowed values range from 0 to 1.
     * @param {number} opacity The opacity of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setOpacity = function (opacity) {
        assert(typeof opacity === 'number', 64); // Layer opacity must be a number
        this.set(LayerProperty.OPACITY, opacity);
    };
    /**
     * Set the visibility of the layer (`true` or `false`).
     * @param {boolean} visible The visibility of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setVisible = function (visible) {
        this.set(LayerProperty.VISIBLE, visible);
    };
    /**
     * Set Z-index of the layer, which is used to order layers before rendering.
     * The default Z-index is 0.
     * @param {number} zindex The z-index of the layer.
     * @observable
     * @api
     */
    BaseLayer.prototype.setZIndex = function (zindex) {
        this.set(LayerProperty.Z_INDEX, zindex);
    };
    /**
     * Clean up.
     */
    BaseLayer.prototype.disposeInternal = function () {
        if (this.state_) {
            this.state_.layer = null;
            this.state_ = null;
        }
        _super.prototype.disposeInternal.call(this);
    };
    return BaseLayer;
}(BaseObject));
export default BaseLayer;
//# sourceMappingURL=Base.js.map