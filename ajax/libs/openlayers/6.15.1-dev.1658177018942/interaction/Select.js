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
 * @module ol/interaction/Select
 */
import Collection from '../Collection.js';
import CollectionEventType from '../CollectionEventType.js';
import Event from '../events/Event.js';
import Interaction from './Interaction.js';
import VectorLayer from '../layer/Vector.js';
import { TRUE } from '../functions.js';
import { clear } from '../obj.js';
import { createEditingStyle } from '../style/Style.js';
import { extend, includes } from '../array.js';
import { getUid } from '../util.js';
import { never, shiftKeyOnly, singleClick } from '../events/condition.js';
/**
 * @enum {string}
 */
var SelectEventType = {
    /**
     * Triggered when feature(s) has been (de)selected.
     * @event SelectEvent#select
     * @api
     */
    SELECT: 'select',
};
/**
 * A function that takes an {@link module:ol/Feature~Feature} or
 * {@link module:ol/render/Feature~RenderFeature} and an
 * {@link module:ol/layer/Layer~Layer} and returns `true` if the feature may be
 * selected or `false` otherwise.
 * @typedef {function(import("../Feature.js").FeatureLike, import("../layer/Layer.js").default<import("../source/Source").default>):boolean} FilterFunction
 */
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [addCondition] A function
 * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * By default, this is {@link module:ol/events/condition.never}. Use this if you
 * want to use different events for add and remove instead of `toggle`.
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. This is the event
 * for the selected features as a whole. By default, this is
 * {@link module:ol/events/condition.singleClick}. Clicking on a feature selects that
 * feature and removes any that were in the selection. Clicking outside any
 * feature removes all from the selection.
 * See `toggle`, `add`, `remove` options for adding/removing extra features to/
 * from the selection.
 * @property {Array<import("../layer/Layer.js").default>|function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean} [layers]
 * A list of layers from which features should be selected. Alternatively, a
 * filter function can be provided. The function will be called for each layer
 * in the map and should return `true` for layers that you want to be
 * selectable. If the option is absent, all visible layers will be considered
 * selectable.
 * @property {import("../style/Style.js").StyleLike|null} [style]
 * Style for the selected features. By default the default edit style is used
 * (see {@link module:ol/style/Style~Style}). Set to `null` if this interaction should not apply
 * any style changes for selected features.
 * If set to a falsey value, the selected feature's style will not change.
 * @property {import("../events/condition.js").Condition} [removeCondition] A function
 * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * By default, this is {@link module:ol/events/condition.never}. Use this if you
 * want to use different events for add and remove instead of `toggle`.
 * @property {import("../events/condition.js").Condition} [toggleCondition] A function
 * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. This is in addition
 * to the `condition` event. By default,
 * {@link module:ol/events/condition.shiftKeyOnly}, i.e. pressing `shift` as
 * well as the `condition` event, adds that feature to the current selection if
 * it is not currently selected, and removes it if it is. See `add` and `remove`
 * if you want to use different events instead of a toggle.
 * @property {boolean} [multi=false] A boolean that determines if the default
 * behaviour should select only single features or all (overlapping) features at
 * the clicked map position. The default of `false` means single select.
 * @property {import("../Collection.js").default<import("../Feature.js").default>} [features]
 * Collection where the interaction will place selected features. Optional. If
 * not set the interaction will create a collection. In any case the collection
 * used by the interaction is returned by
 * {@link module:ol/interaction/Select~Select#getFeatures}.
 * @property {FilterFunction} [filter] A function
 * that takes an {@link module:ol/Feature~Feature} and an
 * {@link module:ol/layer/Layer~Layer} and returns `true` if the feature may be
 * selected or `false` otherwise.
 * @property {number} [hitTolerance=0] Hit-detection tolerance. Pixels inside
 * the radius around the given position will be checked for features.
 */
/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Select~Select} instances are instances of
 * this type.
 */
var SelectEvent = /** @class */ (function (_super) {
    __extends(SelectEvent, _super);
    /**
     * @param {SelectEventType} type The event type.
     * @param {Array<import("../Feature.js").default>} selected Selected features.
     * @param {Array<import("../Feature.js").default>} deselected Deselected features.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Associated
     *     {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
     */
    function SelectEvent(type, selected, deselected, mapBrowserEvent) {
        var _this = _super.call(this, type) || this;
        /**
         * Selected features array.
         * @type {Array<import("../Feature.js").default>}
         * @api
         */
        _this.selected = selected;
        /**
         * Deselected features array.
         * @type {Array<import("../Feature.js").default>}
         * @api
         */
        _this.deselected = deselected;
        /**
         * Associated {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
         * @type {import("../MapBrowserEvent.js").default}
         * @api
         */
        _this.mapBrowserEvent = mapBrowserEvent;
        return _this;
    }
    return SelectEvent;
}(Event));
export { SelectEvent };
/**
 * Original feature styles to reset to when features are no longer selected.
 * @type {Object<number, import("../style/Style.js").default|Array<import("../style/Style.js").default>|import("../style/Style.js").StyleFunction>}
 */
var originalFeatureStyles = {};
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'select', SelectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'select', Return>} SelectOnSignature
 */
/**
 * @classdesc
 * Interaction for selecting vector features. By default, selected features are
 * styled differently, so this interaction can be used for visual highlighting,
 * as well as selecting features for other actions, such as modification or
 * output. There are three ways of controlling which features are selected:
 * using the browser event as defined by the `condition` and optionally the
 * `toggle`, `add`/`remove`, and `multi` options; a `layers` filter; and a
 * further feature filter using the `filter` option.
 *
 * @fires SelectEvent
 * @api
 */
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    /**
     * @param {Options} [opt_options] Options.
     */
    function Select(opt_options) {
        var _this = _super.call(this) || this;
        /***
         * @type {SelectOnSignature<import("../events").EventsKey>}
         */
        _this.on;
        /***
         * @type {SelectOnSignature<import("../events").EventsKey>}
         */
        _this.once;
        /***
         * @type {SelectOnSignature<void>}
         */
        _this.un;
        var options = opt_options ? opt_options : {};
        /**
         * @private
         */
        _this.boundAddFeature_ = _this.addFeature_.bind(_this);
        /**
         * @private
         */
        _this.boundRemoveFeature_ = _this.removeFeature_.bind(_this);
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.condition_ = options.condition ? options.condition : singleClick;
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.addCondition_ = options.addCondition ? options.addCondition : never;
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.removeCondition_ = options.removeCondition
            ? options.removeCondition
            : never;
        /**
         * @private
         * @type {import("../events/condition.js").Condition}
         */
        _this.toggleCondition_ = options.toggleCondition
            ? options.toggleCondition
            : shiftKeyOnly;
        /**
         * @private
         * @type {boolean}
         */
        _this.multi_ = options.multi ? options.multi : false;
        /**
         * @private
         * @type {FilterFunction}
         */
        _this.filter_ = options.filter ? options.filter : TRUE;
        /**
         * @private
         * @type {number}
         */
        _this.hitTolerance_ = options.hitTolerance ? options.hitTolerance : 0;
        /**
         * @private
         * @type {import("../style/Style.js").default|Array<import("../style/Style.js").default>|import("../style/Style.js").StyleFunction|null}
         */
        _this.style_ =
            options.style !== undefined ? options.style : getDefaultStyleFunction();
        /**
         * @private
         * @type {import("../Collection.js").default}
         */
        _this.features_ = options.features || new Collection();
        /** @type {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean} */
        var layerFilter;
        if (options.layers) {
            if (typeof options.layers === 'function') {
                layerFilter = options.layers;
            }
            else {
                var layers_1 = options.layers;
                layerFilter = function (layer) {
                    return includes(layers_1, layer);
                };
            }
        }
        else {
            layerFilter = TRUE;
        }
        /**
         * @private
         * @type {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean}
         */
        _this.layerFilter_ = layerFilter;
        /**
         * An association between selected feature (key)
         * and layer (value)
         * @private
         * @type {Object<string, import("../layer/Layer.js").default>}
         */
        _this.featureLayerAssociation_ = {};
        return _this;
    }
    /**
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     * @param {import("../layer/Layer.js").default} layer Layer.
     * @private
     */
    Select.prototype.addFeatureLayerAssociation_ = function (feature, layer) {
        this.featureLayerAssociation_[getUid(feature)] = layer;
    };
    /**
     * Get the selected features.
     * @return {import("../Collection.js").default<import("../Feature.js").default>} Features collection.
     * @api
     */
    Select.prototype.getFeatures = function () {
        return this.features_;
    };
    /**
     * Returns the Hit-detection tolerance.
     * @return {number} Hit tolerance in pixels.
     * @api
     */
    Select.prototype.getHitTolerance = function () {
        return this.hitTolerance_;
    };
    /**
     * Returns the associated {@link module:ol/layer/Vector~VectorLayer vector layer} of
     * a selected feature.
     * @param {import("../Feature.js").FeatureLike} feature Feature
     * @return {import('../layer/Vector.js').default} Layer.
     * @api
     */
    Select.prototype.getLayer = function (feature) {
        return /** @type {import('../layer/Vector.js').default} */ (this.featureLayerAssociation_[getUid(feature)]);
    };
    /**
     * Hit-detection tolerance. Pixels inside the radius around the given position
     * will be checked for features.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @api
     */
    Select.prototype.setHitTolerance = function (hitTolerance) {
        this.hitTolerance_ = hitTolerance;
    };
    /**
     * Remove the interaction from its current map, if any,  and attach it to a new
     * map, if any. Pass `null` to just remove the interaction from the current map.
     * @param {import("../PluggableMap.js").default|null} map Map.
     * @api
     */
    Select.prototype.setMap = function (map) {
        var currentMap = this.getMap();
        if (currentMap && this.style_) {
            this.features_.forEach(this.restorePreviousStyle_.bind(this));
        }
        _super.prototype.setMap.call(this, map);
        if (map) {
            this.features_.addEventListener(CollectionEventType.ADD, this.boundAddFeature_);
            this.features_.addEventListener(CollectionEventType.REMOVE, this.boundRemoveFeature_);
            if (this.style_) {
                this.features_.forEach(this.applySelectedStyle_.bind(this));
            }
        }
        else {
            this.features_.removeEventListener(CollectionEventType.ADD, this.boundAddFeature_);
            this.features_.removeEventListener(CollectionEventType.REMOVE, this.boundRemoveFeature_);
        }
    };
    /**
     * @param {import("../Collection.js").CollectionEvent} evt Event.
     * @private
     */
    Select.prototype.addFeature_ = function (evt) {
        var feature = evt.element;
        if (this.style_) {
            this.applySelectedStyle_(feature);
        }
        if (!this.getLayer(feature)) {
            var layer = /** @type {VectorLayer} */ (this.getMap()
                .getAllLayers()
                .find(function (layer) {
                if (layer instanceof VectorLayer &&
                    layer.getSource() &&
                    layer.getSource().hasFeature(feature)) {
                    return layer;
                }
            }));
            if (layer) {
                this.addFeatureLayerAssociation_(feature, layer);
            }
        }
    };
    /**
     * @param {import("../Collection.js").CollectionEvent} evt Event.
     * @private
     */
    Select.prototype.removeFeature_ = function (evt) {
        var feature = evt.element;
        if (this.style_) {
            this.restorePreviousStyle_(feature);
        }
    };
    /**
     * @return {import("../style/Style.js").StyleLike|null} Select style.
     */
    Select.prototype.getStyle = function () {
        return this.style_;
    };
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @private
     */
    Select.prototype.applySelectedStyle_ = function (feature) {
        var key = getUid(feature);
        if (!(key in originalFeatureStyles)) {
            originalFeatureStyles[key] = feature.getStyle();
        }
        feature.setStyle(this.style_);
    };
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @private
     */
    Select.prototype.restorePreviousStyle_ = function (feature) {
        var interactions = this.getMap().getInteractions().getArray();
        for (var i = interactions.length - 1; i >= 0; --i) {
            var interaction = interactions[i];
            if (interaction !== this &&
                interaction instanceof Select &&
                interaction.getStyle() &&
                interaction.getFeatures().getArray().lastIndexOf(feature) !== -1) {
                feature.setStyle(interaction.getStyle());
                return;
            }
        }
        var key = getUid(feature);
        feature.setStyle(originalFeatureStyles[key]);
        delete originalFeatureStyles[key];
    };
    /**
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     * @private
     */
    Select.prototype.removeFeatureLayerAssociation_ = function (feature) {
        delete this.featureLayerAssociation_[getUid(feature)];
    };
    /**
     * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} and may change the
     * selected state of features.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
     * @return {boolean} `false` to stop event propagation.
     * @this {Select}
     */
    Select.prototype.handleEvent = function (mapBrowserEvent) {
        if (!this.condition_(mapBrowserEvent)) {
            return true;
        }
        var add = this.addCondition_(mapBrowserEvent);
        var remove = this.removeCondition_(mapBrowserEvent);
        var toggle = this.toggleCondition_(mapBrowserEvent);
        var set = !add && !remove && !toggle;
        var map = mapBrowserEvent.map;
        var features = this.getFeatures();
        var deselected = [];
        var selected = [];
        if (set) {
            // Replace the currently selected feature(s) with the feature(s) at the
            // pixel, or clear the selected feature(s) if there is no feature at
            // the pixel.
            clear(this.featureLayerAssociation_);
            map.forEachFeatureAtPixel(mapBrowserEvent.pixel, 
            /**
             * @param {import("../Feature.js").FeatureLike} feature Feature.
             * @param {import("../layer/Layer.js").default} layer Layer.
             * @return {boolean|undefined} Continue to iterate over the features.
             */
            function (feature, layer) {
                if (this.filter_(feature, layer)) {
                    this.addFeatureLayerAssociation_(feature, layer);
                    selected.push(feature);
                    return !this.multi_;
                }
            }.bind(this), {
                layerFilter: this.layerFilter_,
                hitTolerance: this.hitTolerance_,
            });
            for (var i = features.getLength() - 1; i >= 0; --i) {
                var feature = features.item(i);
                var index = selected.indexOf(feature);
                if (index > -1) {
                    // feature is already selected
                    selected.splice(index, 1);
                }
                else {
                    features.remove(feature);
                    deselected.push(feature);
                }
            }
            if (selected.length !== 0) {
                features.extend(selected);
            }
        }
        else {
            // Modify the currently selected feature(s).
            map.forEachFeatureAtPixel(mapBrowserEvent.pixel, 
            /**
             * @param {import("../Feature.js").FeatureLike} feature Feature.
             * @param {import("../layer/Layer.js").default} layer Layer.
             * @return {boolean|undefined} Continue to iterate over the features.
             */
            function (feature, layer) {
                if (this.filter_(feature, layer)) {
                    if ((add || toggle) && !includes(features.getArray(), feature)) {
                        this.addFeatureLayerAssociation_(feature, layer);
                        selected.push(feature);
                    }
                    else if ((remove || toggle) &&
                        includes(features.getArray(), feature)) {
                        deselected.push(feature);
                        this.removeFeatureLayerAssociation_(feature);
                    }
                    return !this.multi_;
                }
            }.bind(this), {
                layerFilter: this.layerFilter_,
                hitTolerance: this.hitTolerance_,
            });
            for (var j = deselected.length - 1; j >= 0; --j) {
                features.remove(deselected[j]);
            }
            features.extend(selected);
        }
        if (selected.length > 0 || deselected.length > 0) {
            this.dispatchEvent(new SelectEvent(SelectEventType.SELECT, selected, deselected, mapBrowserEvent));
        }
        return true;
    };
    return Select;
}(Interaction));
/**
 * @return {import("../style/Style.js").StyleFunction} Styles.
 */
function getDefaultStyleFunction() {
    var styles = createEditingStyle();
    extend(styles['Polygon'], styles['LineString']);
    extend(styles['GeometryCollection'], styles['LineString']);
    return function (feature) {
        if (!feature.getGeometry()) {
            return null;
        }
        return styles[feature.getGeometry().getType()];
    };
}
export default Select;
//# sourceMappingURL=Select.js.map