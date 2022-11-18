export default LayerGroup;
/**
 * *
 */
export type GroupOnSignature<Return> = ((type: "error" | "change", listener: (event: import("../events/Event.js").default) => any) => Return) & ((type: "propertychange" | "change:extent" | "change:maxResolution" | "change:maxZoom" | "change:minResolution" | "change:minZoom" | "change:opacity" | "change:visible" | "change:zIndex" | "change:layers", listener: (event: import("../Object.js").ObjectEvent) => any) => Return) & ((type: ("error" | "change" | "propertychange" | "change:extent" | "change:maxResolution" | "change:maxZoom" | "change:minResolution" | "change:minZoom" | "change:opacity" | "change:visible" | "change:zIndex" | "change:layers")[], listener: (event: Event | import("../events/Event.js").default) => any) => Return extends void | null ? void : Return[]);
export type Options = {
    /**
     * Opacity (0, 1).
     */
    opacity?: number;
    /**
     * Visibility.
     */
    visible?: boolean;
    /**
     * The bounding extent for layer rendering.  The layer will not be
     * rendered outside of this extent.
     */
    extent?: number[];
    /**
     * The z-index for layer rendering.  At rendering time, the layers
     * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
     * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
     * method was used.
     */
    zIndex?: number;
    /**
     * The minimum resolution (inclusive) at which this layer will be
     * visible.
     */
    minResolution?: number;
    /**
     * The maximum resolution (exclusive) below which this layer will
     * be visible.
     */
    maxResolution?: number;
    /**
     * The minimum view zoom level (exclusive) above which this layer will be
     * visible.
     */
    minZoom?: number;
    /**
     * The maximum view zoom level (inclusive) at which this layer will
     * be visible.
     */
    maxZoom?: number;
    /**
     * Child layers.
     */
    layers?: BaseLayer[] | Collection<BaseLayer>;
    /**
     * Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
     */
    properties?: {
        [x: string]: any;
    };
};
export type Property = string;
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
     * Returns the {@link module:ol/Collection collection} of {@link module:ol/layer/Layer~Layer layers}
     * in this group.
     * @return {!import("../Collection.js").default<import("./Base.js").default>} Collection of
     *   {@link module:ol/layer/Base layers} that are part of this group.
     * @observable
     * @api
     */
    getLayers(): Collection<BaseLayer>;
    /**
     * Set the {@link module:ol/Collection collection} of {@link module:ol/layer/Layer~Layer layers}
     * in this group.
     * @param {!import("../Collection.js").default<import("./Base.js").default>} layers Collection of
     *   {@link module:ol/layer/Base layers} that are part of this group.
     * @observable
     * @api
     */
    setLayers(layers: Collection<BaseLayer>): void;
}
import BaseLayer from "./Base.js";
import Collection from "../Collection.js";
//# sourceMappingURL=Group.d.ts.map