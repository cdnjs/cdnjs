/**
 * A function that takes an {@link module:ol/Feature} or
 * {@link module:ol/render/Feature} and an
 * {@link module:ol/layer/Layer} and returns `true` if the feature may be
 * translated or `false` otherwise.
 * @typedef {function(import("../Feature.js").FeatureLike, import("../layer/Layer.js").default<import("../source/Source").default>):boolean} FilterFunction
 */
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition.always}.
 * @property {Collection<import("../Feature.js").default>} [features] Features contained in this collection will be able to be translated together.
 * @property {Array<import("../layer/Layer.js").default>|function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean} [layers] A list of layers from which features should be
 * translated. Alternatively, a filter function can be provided. The
 * function will be called for each layer in the map and should return
 * `true` for layers that you want to be translatable. If the option is
 * absent, all visible layers will be considered translatable.
 * Not used if `features` is provided.
 * @property {FilterFunction} [filter] A function
 * that takes an {@link module:ol/Feature} and an
 * {@link module:ol/layer/Layer} and returns `true` if the feature may be
 * translated or `false` otherwise. Not used if `features` is provided.
 * @property {number} [hitTolerance=0] Hit-detection tolerance. Pixels inside the radius around the given position
 * will be checked for features.
 */
/**
 * @classdesc
 * Events emitted by {@link module:ol/interaction/Translate~Translate} instances
 * are instances of this type.
 */
export class TranslateEvent extends Event {
    /**
     * @param {TranslateEventType} type Type.
     * @param {Collection<import("../Feature.js").default>} features The features translated.
     * @param {import("../coordinate.js").Coordinate} coordinate The event coordinate.
     * @param {import("../coordinate.js").Coordinate} startCoordinate The original coordinates before.translation started
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
     */
    constructor(type: string, features: Collection<import("../Feature.js").default<any>>, coordinate: number[], startCoordinate: number[], mapBrowserEvent: import("../MapBrowserEvent.js").default<any>);
    /**
     * The features being translated.
     * @type {Collection<import("../Feature.js").default>}
     * @api
     */
    features: Collection<import("../Feature.js").default>;
    /**
     * The coordinate of the drag event.
     * @const
     * @type {import("../coordinate.js").Coordinate}
     * @api
     */
    coordinate: import("../coordinate.js").Coordinate;
    /**
     * The coordinate of the start position before translation started.
     * @const
     * @type {import("../coordinate.js").Coordinate}
     * @api
     */
    startCoordinate: import("../coordinate.js").Coordinate;
    /**
     * Associated {@link module:ol/MapBrowserEvent}.
     * @type {import("../MapBrowserEvent.js").default}
     * @api
     */
    mapBrowserEvent: import("../MapBrowserEvent.js").default;
}
export default Translate;
export type TranslateEventType = string;
/**
 * A function that takes an {@link module:ol/Feature} or
 * {@link module:ol/render/Feature} and an
 * {@link module:ol/layer/Layer} and returns `true` if the feature may be
 * translated or `false` otherwise.
 */
export type FilterFunction = (arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: import("../layer/Layer.js").default<import("../source/Source.js").default, any>) => boolean;
export type Options = {
    /**
     * A function that
     * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled.
     * Default is {@link module:ol/events/condition.always}.
     */
    condition?: (this: any, arg1: import("../MapBrowserEvent.js").default<any>) => boolean;
    /**
     * Features contained in this collection will be able to be translated together.
     */
    features?: Collection<import("../Feature.js").default<any>>;
    /**
     * A list of layers from which features should be
     * translated. Alternatively, a filter function can be provided. The
     * function will be called for each layer in the map and should return
     * `true` for layers that you want to be translatable. If the option is
     * absent, all visible layers will be considered translatable.
     * Not used if `features` is provided.
     */
    layers?: import("../layer/Layer.js").default<any, any>[] | ((arg0: import("../layer/Layer.js").default<import("../source/Source.js").default, any>) => boolean);
    /**
     * A function
     * that takes an {@link module:ol/Feature} and an
     * {@link module:ol/layer/Layer} and returns `true` if the feature may be
     * translated or `false` otherwise. Not used if `features` is provided.
     */
    filter?: (arg0: import("../Feature.js").default<import("../geom/Geometry.js").default> | import("../render/Feature.js").default, arg1: import("../layer/Layer.js").default<import("../source/Source.js").default, any>) => boolean;
    /**
     * Hit-detection tolerance. Pixels inside the radius around the given position
     * will be checked for features.
     */
    hitTolerance?: number;
};
/**
 * *
 */
export type TranslateOnSignature<Return> = ((type: "change" | "error", listener: (event: Event) => any) => Return) & ((type: "propertychange" | "change:active", listener: (event: import("../Object.js").ObjectEvent) => any) => Return) & ((type: "translatestart" | "translating" | "translateend", listener: (event: TranslateEvent) => any) => Return) & ((type: ("propertychange" | "change" | "error" | "change:active" | "translatestart" | "translating" | "translateend")[], listener: (event: Event | globalThis.Event) => any) => Return extends void | null ? void : Return[]);
import Event from "../events/Event.js";
import Collection from "../Collection.js";
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'translateend'|'translatestart'|'translating', TranslateEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'translateend'|'translatestart'|'translating', Return>} TranslateOnSignature
 */
/**
 * @classdesc
 * Interaction for translating (moving) features.
 * If you want to translate multiple features in a single action (for example,
 * the collection used by a select interaction), construct the interaction with
 * the `features` option.
 *
 * @fires TranslateEvent
 * @api
 */
declare class Translate extends PointerInteraction {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /***
     * @type {TranslateOnSignature<import("../events").EventsKey>}
     */
    on: TranslateOnSignature<import("../events").EventsKey>;
    /***
     * @type {TranslateOnSignature<import("../events").EventsKey>}
     */
    once: TranslateOnSignature<import("../events").EventsKey>;
    /***
     * @type {TranslateOnSignature<void>}
     */
    un: TranslateOnSignature<void>;
    /**
     * The last position we translated to.
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    private lastCoordinate_;
    /**
     * The start position before translation started.
     * @type {import("../coordinate.js").Coordinate}
     * @private
     */
    private startCoordinate_;
    /**
     * @type {Collection<import("../Feature.js").default>}
     * @private
     */
    private features_;
    /**
     * @private
     * @type {function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean}
     */
    private layerFilter_;
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
     * @type {import("../events/condition.js").Condition}
     */
    private condition_;
    /**
     * @type {import("../Feature.js").default}
     * @private
     */
    private lastFeature_;
    /**
     * Tests to see if the given coordinates intersects any of our selected
     * features.
     * @param {import("../pixel.js").Pixel} pixel Pixel coordinate to test for intersection.
     * @param {import("../PluggableMap.js").default} map Map to test the intersection on.
     * @return {import("../Feature.js").default} Returns the feature found at the specified pixel
     * coordinates.
     * @private
     */
    private featuresAtPixel_;
    /**
     * Returns the Hit-detection tolerance.
     * @return {number} Hit tolerance in pixels.
     * @api
     */
    getHitTolerance(): number;
    /**
     * Hit-detection tolerance. Pixels inside the radius around the given position
     * will be checked for features.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @api
     */
    setHitTolerance(hitTolerance: number): void;
    /**
     * @private
     */
    private handleActiveChanged_;
    /**
     * @param {import("../PluggableMap.js").default} oldMap Old map.
     * @private
     */
    private updateState_;
}
import PointerInteraction from "./Pointer.js";
//# sourceMappingURL=Translate.d.ts.map