/**
 * @typedef {'addlayer'|'removelayer'} EventType
 */
/**
 * @classdesc
 * A layer group triggers 'addlayer' and 'removelayer' events when layers are added to or removed from
 * the group or one of its child groups.  When a layer group is added to or removed from another layer group,
 * a single event will be triggered (instead of one per layer in the group added or removed).
 */
export class GroupEvent extends Event {
    /**
     * @param {EventType} type The event type.
     * @param {BaseLayer} layer The layer.
     */
    constructor(type: EventType, layer: BaseLayer);
    /**
     * The added or removed layer.
     * @type {BaseLayer}
     * @api
     */
    layer: BaseLayer;
}
export default LayerGroup;
export type EventType = 'addlayer' | 'removelayer';
/**
 * *
 */
export type GroupOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes | 'change:layers', import("../Object").ObjectEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("./Base").BaseLayerObjectEventTypes | 'change:layers', Return>;
export type Options = {
    /**
     * Opacity (0, 1).
     */
    opacity?: number | undefined;
    /**
     * Visibility.
     */
    visible?: boolean | undefined;
    /**
     * The bounding extent for layer rendering.  The layer will not be
     * rendered outside of this extent.
     */
    extent?: import("../extent.js").Extent | undefined;
    /**
     * The z-index for layer rendering.  At rendering time, the layers
     * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
     * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
     * method was used.
     */
    zIndex?: number | undefined;
    /**
     * The minimum resolution (inclusive) at which this layer will be
     * visible.
     */
    minResolution?: number | undefined;
    /**
     * The maximum resolution (exclusive) below which this layer will
     * be visible.
     */
    maxResolution?: number | undefined;
    /**
     * The minimum view zoom level (exclusive) above which this layer will be
     * visible.
     */
    minZoom?: number | undefined;
    /**
     * The maximum view zoom level (inclusive) at which this layer will
     * be visible.
     */
    maxZoom?: number | undefined;
    /**
     * Child layers.
     */
    layers?: BaseLayer[] | Collection<BaseLayer> | undefined;
    /**
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    } | undefined;
};
import Event from "../events/Event.js";
import BaseLayer from "./Base.js";
import EventType from "../events/EventType.js";
/**
 * @classdesc
 * A {@link module:ol/Collection~Collection} of layers that are handled together.
 *
 * A generic `change` event is triggered when the group/Collection changes.
 *
 * @api
 */
declare class LayerGroup extends BaseLayer {
    /**
     * @param {Options} [opt_options] Layer options.
     */
    constructor(opt_options?: Options | undefined);
    /***
     * @type {GroupOnSignature<import("../events").EventsKey>}
     */
    on: GroupOnSignature<import("../events").EventsKey>;
    /***
     * @type {GroupOnSignature<import("../events").EventsKey>}
     */
    once: GroupOnSignature<import("../events").EventsKey>;
    /***
     * @type {GroupOnSignature<void>}
     */
    un: GroupOnSignature<void>;
    /**
     * @private
     * @type {Array<import("../events.js").EventsKey>}
     */
    private layersListenerKeys_;
    /**
     * @private
     * @type {Object<string, Array<import("../events.js").EventsKey>>}
     */
    private listenerKeys_;
    /**
     * @private
     */
    private handleLayerChange_;
    /**
     * @private
     */
    private handleLayersChanged_;
    /**
     * @param {BaseLayer} layer The layer.
     */
    registerLayerListeners_(layer: BaseLayer): void;
    /**
     * @param {GroupEvent} event The layer group event.
     */
    handleLayerGroupAdd_(event: GroupEvent): void;
    /**
     * @param {GroupEvent} event The layer group event.
     */
    handleLayerGroupRemove_(event: GroupEvent): void;
    /**
     * @param {import("../Collection.js").CollectionEvent} collectionEvent CollectionEvent.
     * @private
     */
    private handleLayersAdd_;
    /**
     * @param {import("../Collection.js").CollectionEvent} collectionEvent CollectionEvent.
     * @private
     */
    private handleLayersRemove_;
    /**
     * Returns the {@link module:ol/Collection~Collection collection} of {@link module:ol/layer/Layer~Layer layers}
     * in this group.
     * @return {!import("../Collection.js").default<import("./Base.js").default>} Collection of
     *   {@link module:ol/layer/Base~BaseLayer layers} that are part of this group.
     * @observable
     * @api
     */
    getLayers(): import("../Collection.js").default<import("./Base.js").default>;
    /**
     * Set the {@link module:ol/Collection~Collection collection} of {@link module:ol/layer/Layer~Layer layers}
     * in this group.
     * @param {!import("../Collection.js").default<import("./Base.js").default>} layers Collection of
     *   {@link module:ol/layer/Base~BaseLayer layers} that are part of this group.
     * @observable
     * @api
     */
    setLayers(layers: import("../Collection.js").default<import("./Base.js").default>): void;
}
import Collection from "../Collection.js";
//# sourceMappingURL=Group.d.ts.map