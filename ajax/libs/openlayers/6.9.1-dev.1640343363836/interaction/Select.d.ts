/**
 * A function that takes an {@link module:ol/Feature} or
 * {@link module:ol/render/Feature} and an
 * {@link module:ol/layer/Layer} and returns `true` if the feature may be
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
 * that takes an {@link module:ol/Feature} and an
 * {@link module:ol/layer/Layer} and returns `true` if the feature may be
 * selected or `false` otherwise.
 * @property {number} [hitTolerance=0] Hit-detection tolerance. Pixels inside
 * the radius around the given position will be checked for features.
 */
/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Select~Select} instances are instances of
 * this type.
 */
export class SelectEvent extends Event {
    /**
     * @param {SelectEventType} type The event type.
     * @param {Array<import("../Feature.js").default>} selected Selected features.
     * @param {Array<import("../Feature.js").default>} deselected Deselected features.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Associated
     *     {@link module:ol/MapBrowserEvent}.
     */
    constructor(type: string, selected: import("../Feature.js").default<any>[], deselected: import("../Feature.js").default<any>[], mapBrowserEvent: import("../MapBrowserEvent.js").default<any>);
    /**
     * Selected features array.
     * @type {Array<import("../Feature.js").default>}
     * @api
     */
    selected: Array<import("../Feature.js").default>;
    /**
     * Deselected features array.
     * @type {Array<import("../Feature.js").default>}
     * @api
     */
    deselected: Array<import("../Feature.js").default>;
    /**
     * Associated {@link module:ol/MapBrowserEvent}.
     * @type {import("../MapBrowserEvent.js").default}
     * @api
     */
    mapBrowserEvent: import("../MapBrowserEvent.js").default;
}
export default Select;
export type SelectEventType = string;
/**
 * A function that takes an {@link module:ol/Feature} or
 * {@link module:ol/render/Feature} and an
 * {@link module:ol/layer/Layer} and returns `true` if the feature may be
 * selected or `false` otherwise.
 */
export type FilterFunction = (arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: import("../layer/Layer.js").default<import("../source/Source.js").default, any>) => boolean;
export type Options = {
    /**
     * A function
     * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled.
     * By default, this is {@link module:ol/events/condition.never}. Use this if you
     * want to use different events for add and remove instead of `toggle`.
     */
    addCondition?: (this: any, arg1: import("../MapBrowserEvent.js").default<any>) => boolean;
    /**
     * A function that
     * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled. This is the event
     * for the selected features as a whole. By default, this is
     * {@link module:ol/events/condition.singleClick}. Clicking on a feature selects that
     * feature and removes any that were in the selection. Clicking outside any
     * feature removes all from the selection.
     * See `toggle`, `add`, `remove` options for adding/removing extra features to/
     * from the selection.
     */
    condition?: (this: any, arg1: import("../MapBrowserEvent.js").default<any>) => boolean;
    /**
     * A list of layers from which features should be selected. Alternatively, a
     * filter function can be provided. The function will be called for each layer
     * in the map and should return `true` for layers that you want to be
     * selectable. If the option is absent, all visible layers will be considered
     * selectable.
     */
    layers?: import("../layer/Layer.js").default<any, any>[] | ((arg0: import("../layer/Layer.js").default<import("../source/Source.js").default, any>) => boolean);
    /**
     * Style for the selected features. By default the default edit style is used
     * (see {@link module:ol/style/Style~Style}). Set to `null` if this interaction should not apply
     * any style changes for selected features.
     * If set to a falsey value, the selected feature's style will not change.
     */
    style?: import("../style/Style.js").default | import("../style/Style.js").default[] | ((arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: number) => void | import("../style/Style.js").default | import("../style/Style.js").default[]) | null;
    /**
     * A function
     * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled.
     * By default, this is {@link module:ol/events/condition.never}. Use this if you
     * want to use different events for add and remove instead of `toggle`.
     */
    removeCondition?: (this: any, arg1: import("../MapBrowserEvent.js").default<any>) => boolean;
    /**
     * A function
     * that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled. This is in addition
     * to the `condition` event. By default,
     * {@link module:ol/events/condition.shiftKeyOnly}, i.e. pressing `shift` as
     * well as the `condition` event, adds that feature to the current selection if
     * it is not currently selected, and removes it if it is. See `add` and `remove`
     * if you want to use different events instead of a toggle.
     */
    toggleCondition?: (this: any, arg1: import("../MapBrowserEvent.js").default<any>) => boolean;
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
    filter?: (arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: import("../layer/Layer.js").default<import("../source/Source.js").default, any>) => boolean;
    /**
     * Hit-detection tolerance. Pixels inside
     * the radius around the given position will be checked for features.
     */
    hitTolerance?: number;
};
/**
 * *
 */
export type SelectOnSignature<Return> = ((type: "change" | "error", listener: (event: Event) => any) => Return) & ((type: "propertychange" | "change:active", listener: (event: import("../Object.js").ObjectEvent) => any) => Return) & ((type: "select", listener: (event: SelectEvent) => any) => Return) & ((type: ("propertychange" | "change" | "error" | "select" | "change:active")[], listener: (event: Event | globalThis.Event) => any) => Return extends void | null ? void : Return[]);
import Event from "../events/Event.js";
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
declare class Select extends Interaction {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /***
     * @type {SelectOnSignature<import("../events").EventsKey>}
     */
    on: SelectOnSignature<import("../events").EventsKey>;
    /***
     * @type {SelectOnSignature<import("../events").EventsKey>}
     */
    once: SelectOnSignature<import("../events").EventsKey>;
    /***
     * @type {SelectOnSignature<void>}
     */
    un: SelectOnSignature<void>;
    /**
     * @private
     */
    private boundAddFeature_;
    /**
     * @private
     */
    private boundRemoveFeature_;
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
     * @type {import("../style/Style.js").default|Array<import("../style/Style.js").default>|import("../style/Style.js").StyleFunction|null}
     */
    private style_;
    /**
     * @private
     * @type {import("../Collection.js").default}
     */
    private features_;
    /**
     * @private
     * @type {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean}
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
     * @return {number} Hit tolerance in pixels.
     * @api
     */
    getHitTolerance(): number;
    /**
     * Returns the associated {@link module:ol/layer/Vector~Vector vector layer} of
     * a selected feature.
     * @param {import("../Feature.js").FeatureLike} feature Feature
     * @return {import('../layer/Vector.js').default} Layer.
     * @api
     */
    getLayer(feature: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default): VectorLayer<any>;
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
     * @return {import("../style/Style.js").StyleLike|null} Select style.
     */
    getStyle(): import("../style/Style.js").default | import("../style/Style.js").default[] | ((arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: number) => void | import("../style/Style.js").default | import("../style/Style.js").default[]) | null;
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
import VectorLayer from "../layer/Vector.js";
//# sourceMappingURL=Select.d.ts.map