var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/layer/Group
 */
import BaseLayer from './Base.js';
import Collection from '../Collection.js';
import CollectionEventType from '../CollectionEventType.js';
import Event from '../events/Event.js';
import EventType from '../events/EventType.js';
import ObjectEventType from '../ObjectEventType.js';
import SourceState from '../source/State.js';
import { assert } from '../asserts.js';
import { assign, clear } from '../obj.js';
import { getIntersection } from '../extent.js';
import { getUid } from '../util.js';
import { listen, unlistenByKey } from '../events.js';
/**
 * @typedef {'addlayer'|'removelayer'} EventType
 */
/**
 * @classdesc
 * A layer group triggers 'addlayer' and 'removelayer' events when layers are added to or removed from
 * the group or one of its child groups.  When a layer group is added to or removed from another layer group,
 * a single event will be triggered (instead of one per layer in the group added or removed).
 */
var GroupEvent = /** @class */ (function (_super) {
    __extends(GroupEvent, _super);
    /**
     * @param {EventType} type The event type.
     * @param {BaseLayer} layer The layer.
     */
    function GroupEvent(type, layer) {
        var _this = _super.call(this, type) || this;
        /**
         * The added or removed layer.
         * @type {BaseLayer}
         * @api
         */
        _this.layer = layer;
        return _this;
    }
    return GroupEvent;
}(Event));
export { GroupEvent };
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     'change:layers', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|'change:layers', Return>} GroupOnSignature
 */
/**
 * @typedef {Object} Options
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
 * @property {Array<import("./Base.js").default>|import("../Collection.js").default<import("./Base.js").default>} [layers] Child layers.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */
/**
 * @enum {string}
 * @private
 */
var Property = {
    LAYERS: 'layers',
};
/**
 * @classdesc
 * A {@link module:ol/Collection~Collection} of layers that are handled together.
 *
 * A generic `change` event is triggered when the group/Collection changes.
 *
 * @api
 */
var LayerGroup = /** @class */ (function (_super) {
    __extends(LayerGroup, _super);
    /**
     * @param {Options} [opt_options] Layer options.
     */
    function LayerGroup(opt_options) {
        var _this = this;
        var options = opt_options || {};
        var baseOptions = /** @type {Options} */ (assign({}, options));
        delete baseOptions.layers;
        var layers = options.layers;
        _this = _super.call(this, baseOptions) || this;
        /***
         * @type {GroupOnSignature<import("../events").EventsKey>}
         */
        _this.on;
        /***
         * @type {GroupOnSignature<import("../events").EventsKey>}
         */
        _this.once;
        /***
         * @type {GroupOnSignature<void>}
         */
        _this.un;
        /**
         * @private
         * @type {Array<import("../events.js").EventsKey>}
         */
        _this.layersListenerKeys_ = [];
        /**
         * @private
         * @type {Object<string, Array<import("../events.js").EventsKey>>}
         */
        _this.listenerKeys_ = {};
        _this.addChangeListener(Property.LAYERS, _this.handleLayersChanged_);
        if (layers) {
            if (Array.isArray(layers)) {
                layers = new Collection(layers.slice(), { unique: true });
            }
            else {
                assert(typeof ( /** @type {?} */(layers).getArray) === 'function', 43); // Expected `layers` to be an array or a `Collection`
            }
        }
        else {
            layers = new Collection(undefined, { unique: true });
        }
        _this.setLayers(layers);
        return _this;
    }
    /**
     * @private
     */
    LayerGroup.prototype.handleLayerChange_ = function () {
        this.changed();
    };
    /**
     * @private
     */
    LayerGroup.prototype.handleLayersChanged_ = function () {
        this.layersListenerKeys_.forEach(unlistenByKey);
        this.layersListenerKeys_.length = 0;
        var layers = this.getLayers();
        this.layersListenerKeys_.push(listen(layers, CollectionEventType.ADD, this.handleLayersAdd_, this), listen(layers, CollectionEventType.REMOVE, this.handleLayersRemove_, this));
        for (var id in this.listenerKeys_) {
            this.listenerKeys_[id].forEach(unlistenByKey);
        }
        clear(this.listenerKeys_);
        var layersArray = layers.getArray();
        for (var i = 0, ii = layersArray.length; i < ii; i++) {
            var layer = layersArray[i];
            this.registerLayerListeners_(layer);
            this.dispatchEvent(new GroupEvent('addlayer', layer));
        }
        this.changed();
    };
    /**
     * @param {BaseLayer} layer The layer.
     */
    LayerGroup.prototype.registerLayerListeners_ = function (layer) {
        var listenerKeys = [
            listen(layer, ObjectEventType.PROPERTYCHANGE, this.handleLayerChange_, this),
            listen(layer, EventType.CHANGE, this.handleLayerChange_, this),
        ];
        if (layer instanceof LayerGroup) {
            listenerKeys.push(listen(layer, 'addlayer', this.handleLayerGroupAdd_, this), listen(layer, 'removelayer', this.handleLayerGroupRemove_, this));
        }
        this.listenerKeys_[getUid(layer)] = listenerKeys;
    };
    /**
     * @param {GroupEvent} event The layer group event.
     */
    LayerGroup.prototype.handleLayerGroupAdd_ = function (event) {
        this.dispatchEvent(new GroupEvent('addlayer', event.layer));
    };
    /**
     * @param {GroupEvent} event The layer group event.
     */
    LayerGroup.prototype.handleLayerGroupRemove_ = function (event) {
        this.dispatchEvent(new GroupEvent('removelayer', event.layer));
    };
    /**
     * @param {import("../Collection.js").CollectionEvent} collectionEvent CollectionEvent.
     * @private
     */
    LayerGroup.prototype.handleLayersAdd_ = function (collectionEvent) {
        var layer = /** @type {import("./Base.js").default} */ (collectionEvent.element);
        this.registerLayerListeners_(layer);
        this.dispatchEvent(new GroupEvent('addlayer', layer));
        this.changed();
    };
    /**
     * @param {import("../Collection.js").CollectionEvent} collectionEvent CollectionEvent.
     * @private
     */
    LayerGroup.prototype.handleLayersRemove_ = function (collectionEvent) {
        var layer = /** @type {import("./Base.js").default} */ (collectionEvent.element);
        var key = getUid(layer);
        this.listenerKeys_[key].forEach(unlistenByKey);
        delete this.listenerKeys_[key];
        this.dispatchEvent(new GroupEvent('removelayer', layer));
        this.changed();
    };
    /**
     * Returns the {@link module:ol/Collection collection} of {@link module:ol/layer/Layer~Layer layers}
     * in this group.
     * @return {!import("../Collection.js").default<import("./Base.js").default>} Collection of
     *   {@link module:ol/layer/Base layers} that are part of this group.
     * @observable
     * @api
     */
    LayerGroup.prototype.getLayers = function () {
        return /** @type {!import("../Collection.js").default<import("./Base.js").default>} */ (this.get(Property.LAYERS));
    };
    /**
     * Set the {@link module:ol/Collection collection} of {@link module:ol/layer/Layer~Layer layers}
     * in this group.
     * @param {!import("../Collection.js").default<import("./Base.js").default>} layers Collection of
     *   {@link module:ol/layer/Base layers} that are part of this group.
     * @observable
     * @api
     */
    LayerGroup.prototype.setLayers = function (layers) {
        var collection = this.getLayers();
        if (collection) {
            var currentLayers = collection.getArray();
            for (var i = 0, ii = currentLayers.length; i < ii; ++i) {
                this.dispatchEvent(new GroupEvent('removelayer', currentLayers[i]));
            }
        }
        this.set(Property.LAYERS, layers);
    };
    /**
     * @param {Array<import("./Layer.js").default>} [opt_array] Array of layers (to be modified in place).
     * @return {Array<import("./Layer.js").default>} Array of layers.
     */
    LayerGroup.prototype.getLayersArray = function (opt_array) {
        var array = opt_array !== undefined ? opt_array : [];
        this.getLayers().forEach(function (layer) {
            layer.getLayersArray(array);
        });
        return array;
    };
    /**
     * Get the layer states list and use this groups z-index as the default
     * for all layers in this and nested groups, if it is unset at this point.
     * If opt_states is not provided and this group's z-index is undefined
     * 0 is used a the default z-index.
     * @param {Array<import("./Layer.js").State>} [opt_states] Optional list
     * of layer states (to be modified in place).
     * @return {Array<import("./Layer.js").State>} List of layer states.
     */
    LayerGroup.prototype.getLayerStatesArray = function (opt_states) {
        var states = opt_states !== undefined ? opt_states : [];
        var pos = states.length;
        this.getLayers().forEach(function (layer) {
            layer.getLayerStatesArray(states);
        });
        var ownLayerState = this.getLayerState();
        var defaultZIndex = ownLayerState.zIndex;
        if (!opt_states && ownLayerState.zIndex === undefined) {
            defaultZIndex = 0;
        }
        for (var i = pos, ii = states.length; i < ii; i++) {
            var layerState = states[i];
            layerState.opacity *= ownLayerState.opacity;
            layerState.visible = layerState.visible && ownLayerState.visible;
            layerState.maxResolution = Math.min(layerState.maxResolution, ownLayerState.maxResolution);
            layerState.minResolution = Math.max(layerState.minResolution, ownLayerState.minResolution);
            layerState.minZoom = Math.max(layerState.minZoom, ownLayerState.minZoom);
            layerState.maxZoom = Math.min(layerState.maxZoom, ownLayerState.maxZoom);
            if (ownLayerState.extent !== undefined) {
                if (layerState.extent !== undefined) {
                    layerState.extent = getIntersection(layerState.extent, ownLayerState.extent);
                }
                else {
                    layerState.extent = ownLayerState.extent;
                }
            }
            if (layerState.zIndex === undefined) {
                layerState.zIndex = defaultZIndex;
            }
        }
        return states;
    };
    /**
     * @return {import("../source/State.js").default} Source state.
     */
    LayerGroup.prototype.getSourceState = function () {
        return SourceState.READY;
    };
    return LayerGroup;
}(BaseLayer));
export default LayerGroup;
//# sourceMappingURL=Group.js.map