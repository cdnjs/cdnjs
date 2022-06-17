export default Select;
export type SelectEventType = string;
/**
 * A function that takes an {@link module:ol/Feature} or
 * {@link module:ol/render/Feature} and an
 * {@link module:ol/layer/Layer} and returns `true` if the feature may be
 * selected or `false` otherwise.
 */
export type FilterFunction = (arg0: import("../render/Feature.js").default | import("../Feature.js").default<any>, arg1: import("../layer/Layer.js").default<any>) => boolean;
export type Options = {
    /**
     * A function
     * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled.
     * By default, this is {@link module:ol/events/condition~never}. Use this if you
     * want to use different events for add and remove instead of `toggle`.
     */
    addCondition?: (this: any, arg1: import("../MapBrowserEvent.js").default) => boolean;
    /**
     * A function that
     * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled. This is the event
     * for the selected features as a whole. By default, this is
     * {@link module:ol/events/condition~singleClick}. Clicking on a feature selects that
     * feature and removes any that were in the selection. Clicking outside any
     * feature removes all from the selection.
     * See `toggle`, `add`, `remove` options for adding/removing extra features to/
     * from the selection.
     */
    condition?: (this: any, arg1: import("../MapBrowserEvent.js").default) => boolean;
    /**
     * A list of layers from which features should be selected. Alternatively, a
     * filter function can be provided. The function will be called for each layer
     * in the map and should return `true` for layers that you want to be
     * selectable. If the option is absent, all visible layers will be considered
     * selectable.
     */
    layers?: import("../layer/Layer.js").default<any>[] | ((arg0: import("../layer/Layer.js").default<any>) => boolean);
    /**
     * Style for the selected features. By default the default edit style is used
     * (see {@link module:ol/style}).
     * If set to a falsey value, the selected feature's style will not change.
     */
    style?: import("../style/Style.js").default | import("../style/Style.js").default[] | ((arg0: import("../render/Feature.js").default | import("../Feature.js").default<any>, arg1: number) => void | import("../style/Style.js").default | import("../style/Style.js").default[]);
    /**
     * A function
     * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled.
     * By default, this is {@link module:ol/events/condition~never}. Use this if you
     * want to use different events for add and remove instead of `toggle`.
     */
    removeCondition?: (this: any, arg1: import("../MapBrowserEvent.js").default) => boolean;
    /**
     * A function
     * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled. This is in addition
     * to the `condition` event. By default,
     * {@link module:ol/events/condition~shiftKeyOnly}, i.e. pressing `shift` as
     * well as the `condition` event, adds that feature to the current selection if
     * it is not currently selected, and removes it if it is. See `add` and `remove`
     * if you want to use different events instead of a toggle.
     */
    toggleCondition?: (this: any, arg1: import("../MapBrowserEvent.js").default) => boolean;
    /**
     * A boolean that determines if the default
     * behaviour should select only single features or all (overlapping) features at
     * the clicked map position. The default of `false` means single select.
     */
    multi?: boolean;
    /**
     * Collection where the interaction will place selected features. Optional. If
     * not set the interaction will create a collection. In any case the collection
     * used by the interaction is returned by
     * {@link module:ol/interaction/Select~Select#getFeatures}.
     */
    features?: Collection<import("../Feature.js").default<any>>;
    /**
     * A function
     * that takes an {@link module:ol/Feature} and an
     * {@link module:ol/layer/Layer} and returns `true` if the feature may be
     * selected or `false` otherwise.
     */
    filter?: (arg0: import("../render/Feature.js").default | import("../Feature.js").default<any>, arg1: import("../layer/Layer.js").default<any>) => boolean;
    /**
     * Hit-detection tolerance. Pixels inside
     * the radius around the given position will be checked for features.
     */
    hitTolerance?: number;
};
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
 * Selected features are added to an internal unmanaged layer.
 *
 * @fires SelectEvent
 * @api
 */
declare class Select extends Interaction {
    /**
     * @param {Options=} opt_options Options.
     */
    constructor(opt_options?: Options);
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private condition_;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private addCondition_;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private removeCondition_;
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private toggleCondition_;
    /**
     * @private
     * @type {boolean}
     */
    private multi_;
    /**
     * @private
     * @type {FilterFunction}
     */
    private filter_;
    /**
     * @private
     * @type {number}
     */
    private hitTolerance_;
    /**
     * @private
     * @type {import("../style/Style.js").default|Array.<import("../style/Style.js").default>|import("../style/Style.js").StyleFunction|null}
     */
    private style_;
    /**
     * @private
     * @type {import("../Collection.js").default}
     */
    private features_;
    /**
     * @private
     * @type {function(import("../layer/Layer.js").default): boolean}
     */
    private layerFilter_;
    /**
     * An association between selected feature (key)
     * and layer (value)
     * @private
     * @type {Object<string, import("../layer/Layer.js").default>}
     */
    private featureLayerAssociation_;
    /**
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     * @param {import("../layer/Layer.js").default} layer Layer.
     * @private
     */
    private addFeatureLayerAssociation_;
    /**
     * Get the selected features.
     * @return {import("../Collection.js").default<import("../Feature.js").default>} Features collection.
     * @api
     */
    getFeatures(): Collection<import("../Feature.js").default<any>>;
    /**
     * Returns the Hit-detection tolerance.
     * @returns {number} Hit tolerance in pixels.
     * @api
     */
    getHitTolerance(): number;
    /**
     * Returns the associated {@link module:ol/layer/Vector~Vector vectorlayer} of
     * the (last) selected feature. Note that this will not work with any
     * programmatic method like pushing features to
     * {@link module:ol/interaction/Select~Select#getFeatures collection}.
     * @param {import("../Feature.js").FeatureLike} feature Feature
     * @return {import('../layer/Vector.js').default} Layer.
     * @api
     */
    getLayer(feature: import("../render/Feature.js").default | import("../Feature.js").default<any>): import("../layer/Vector.js").default;
    /**
     * Hit-detection tolerance. Pixels inside the radius around the given position
     * will be checked for features.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @api
     */
    setHitTolerance(hitTolerance: number): void;
    /**
     * @param {import("../Collection.js").CollectionEvent} evt Event.
     * @private
     */
    private addFeature_;
    /**
     * @param {import("../Collection.js").CollectionEvent} evt Event.
     * @private
     */
    private removeFeature_;
    /**
     * @return {import("../style/Style.js").default|Array.<import("../style/Style.js").default>|import("../style/Style.js").StyleFunction|null} Select style.
     */
    getStyle(): import("../style/Style.js").default | import("../style/Style.js").default[] | ((arg0: import("../render/Feature.js").default | import("../Feature.js").default<any>, arg1: number) => void | import("../style/Style.js").default | import("../style/Style.js").default[]);
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @private
     */
    private applySelectedStyle_;
    /**
     * @param {import("../Feature.js").default} feature Feature
     * @private
     */
    private restorePreviousStyle_;
    /**
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     * @private
     */
    private removeFeatureLayerAssociation_;
}
import Collection from "../Collection.js";
import Interaction from "./Interaction.js";
//# sourceMappingURL=Select.d.ts.map