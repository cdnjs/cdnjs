/**
 * A function that takes an {@link module:ol/Feature~Feature} or
 * {@link module:ol/render/Feature~RenderFeature} and an
 * {@link module:ol/layer/Layer~Layer} and returns `true` if the feature may be
 * translated or `false` otherwise.
 * @typedef {function(Feature, import("../layer/Layer.js").default<import("../source/Source").default>):boolean} FilterFunction
 */
/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition.always}.
 * @property {Collection<Feature>} [features] Features contained in this collection will be able to be translated together.
 * @property {Array<import("../layer/Layer.js").default>|function(import("../layer/Layer.js").default<import("../source/Source").default>): boolean} [layers] A list of layers from which features should be
 * translated. Alternatively, a filter function can be provided. The
 * function will be called for each layer in the map and should return
 * `true` for layers that you want to be translatable. If the option is
 * absent, all visible layers will be considered translatable.
 * Not used if `features` is provided.
 * @property {FilterFunction} [filter] A function
 * that takes an {@link module:ol/Feature~Feature} and an
 * {@link module:ol/layer/Layer~Layer} and returns `true` if the feature may be
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
     * @param {Collection<Feature>} features The features translated.
     * @param {import("../coordinate.js").Coordinate} coordinate The event coordinate.
     * @param {import("../coordinate.js").Coordinate} startCoordinate The original coordinates before.translation started
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
     */
    constructor(type: TranslateEventType, features: Collection<Feature>, coordinate: import("../coordinate.js").Coordinate, startCoordinate: import("../coordinate.js").Coordinate, mapBrowserEvent: import("../MapBrowserEvent.js").default<any>);
    /**
     * The features being translated.
     * @type {Collection<Feature>}
     * @api
     */
    features: Collection<Feature>;
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
     * Associated {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
     * @type {import("../MapBrowserEvent.js").default}
     * @api
     */
    mapBrowserEvent: import("../MapBrowserEvent.js").default<any>;
}
export default Translate;
/**
 * A function that takes an {@link module :ol/Feature~Feature} or
 * {@link module :ol/render/Feature~RenderFeature} and an
 * {@link module :ol/layer/Layer~Layer} and returns `true` if the feature may be
 * translated or `false` otherwise.
 */
export type FilterFunction = (arg0: Feature, arg1: import("../layer/Layer.js").default<import("../source/Source").default>) => boolean;
export type Options = {
    /**
     * A function that
     * takes an {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled.
     * Default is {@link module :ol/events/condition.always}.
     */
    condition?: import("../events/condition.js").Condition | undefined;
    /**
     * Features contained in this collection will be able to be translated together.
     */
    features?: Collection<Feature<import("../geom/Geometry.js").default>> | undefined;
    /**
     * A list of layers from which features should be
     * translated. Alternatively, a filter function can be provided. The
     * function will be called for each layer in the map and should return
     * `true` for layers that you want to be translatable. If the option is
     * absent, all visible layers will be considered translatable.
     * Not used if `features` is provided.
     */
    layers?: import("../layer/Layer.js").default<import("../source/Source").default, import("../renderer/Layer.js").default<any>>[] | ((arg0: import("../layer/Layer.js").default<import("../source/Source").default>) => boolean) | undefined;
    /**
     * A function
     * that takes an {@link module :ol/Feature~Feature} and an
     * {@link module :ol/layer/Layer~Layer} and returns `true` if the feature may be
     * translated or `false` otherwise. Not used if `features` is provided.
     */
    filter?: FilterFunction | undefined;
    /**
     * Hit-detection tolerance. Pixels inside the radius around the given position
     * will be checked for features.
     */
    hitTolerance?: number | undefined;
};
/**
 * *
 */
export type TranslateOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("../ObjectEventType").Types | 'change:active', import("../Object").ObjectEvent, Return> & import("../Observable").OnSignature<'translateend' | 'translatestart' | 'translating', TranslateEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("../ObjectEventType").Types | 'change:active' | 'translateend' | 'translatestart' | 'translating', Return>;
import Event from "../events/Event.js";
import Collection from "../Collection.js";
import Feature from "../Feature.js";
type TranslateEventType = string;
declare namespace TranslateEventType {
    const TRANSLATESTART: string;
    const TRANSLATING: string;
    const TRANSLATEEND: string;
}
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
     * @param {Options} [options] Options.
     */
    constructor(options?: Options | undefined);
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
     * @type {Collection<Feature>|null}
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
     * @type {Feature}
     * @private
     */
    private lastFeature_;
    /**
     * Tests to see if the given coordinates intersects any of our selected
     * features.
     * @param {import("../pixel.js").Pixel} pixel Pixel coordinate to test for intersection.
     * @param {import("../Map.js").default} map Map to test the intersection on.
     * @return {Feature} Returns the feature found at the specified pixel
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
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../Map.js").default} map Map.
     */
    setMap(map: import("../Map.js").default): void;
    /**
     * @private
     */
    private handleActiveChanged_;
    /**
     * @param {import("../Map.js").default} oldMap Old map.
     * @private
     */
    private updateState_;
}
import PointerInteraction from "./Pointer.js";
//# sourceMappingURL=Translate.d.ts.map