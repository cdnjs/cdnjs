/**
 * A function that takes an {@link module:ol/Feature} or
 * {@link module:ol/render/Feature} and an
 * {@link module:ol/layer/Layer} and returns `true` if the feature may be
 * translated or `false` otherwise.
 * @typedef {function(import("../Feature.js").FeatureLike, import("../layer/Layer.js").default):boolean} FilterFunction
 */
/**
 * @typedef {Object} Options
 * @property {Collection<import("../Feature.js").default>} [features] Only features contained in this collection will be able to be translated. If
 * not specified, all features on the map will be able to be translated.
 * @property {Array<import("../layer/Layer.js").default>|function(import("../layer/Layer.js").default): boolean} [layers] A list of layers from which features should be
 * translated. Alternatively, a filter function can be provided. The
 * function will be called for each layer in the map and should return
 * `true` for layers that you want to be translatable. If the option is
 * absent, all visible layers will be considered translatable.
 * @property {FilterFunction} [filter] A function
 * that takes an {@link module:ol/Feature} and an
 * {@link module:ol/layer/Layer} and returns `true` if the feature may be
 * translated or `false` otherwise.
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
    constructor(type: TranslateEventType, features: Collection<import("../Feature.js").default>, coordinate: import("../coordinate.js").Coordinate, startCoordinate: import("../coordinate.js").Coordinate, mapBrowserEvent: import("../MapBrowserEvent.js").default);
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
export type FilterFunction = (arg0: import("../Feature.js").FeatureLike, arg1: import("../layer/Layer.js").default) => boolean;
export type Options = {
    /**
     * Only features contained in this collection will be able to be translated. If
     * not specified, all features on the map will be able to be translated.
     */
    features?: Collection<import("../Feature.js").default>;
    /**
     * A list of layers from which features should be
     * translated. Alternatively, a filter function can be provided. The
     * function will be called for each layer in the map and should return
     * `true` for layers that you want to be translatable. If the option is
     * absent, all visible layers will be considered translatable.
     */
    layers?: Array<import("../layer/Layer.js").default> | ((arg0: import("../layer/Layer.js").default) => boolean);
    /**
     * A function
     * that takes an {@link module:ol/Feature} and an
     * {@link module:ol/layer/Layer} and returns `true` if the feature may be
     * translated or `false` otherwise.
     */
    filter?: FilterFunction;
    /**
     * Hit-detection tolerance. Pixels inside the radius around the given position
     * will be checked for features.
     */
    hitTolerance?: number;
};
import Event from "../events/Event.js";
import Collection from "../Collection.js";
declare namespace TranslateEventType {
    export const TRANSLATESTART: string;
    export const TRANSLATING: string;
    export const TRANSLATEEND: string;
}
/**
 * @classdesc
 * Interaction for translating (moving) features.
 *
 * @fires TranslateEvent
 * @api
 */
declare class Translate extends PointerInteraction {
    /**
     * @param {Options=} opt_options Options.
     */
    constructor(opt_options?: Options | undefined);
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
     * @type {function(import("../layer/Layer.js").default): boolean}
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
     * @returns {number} Hit tolerance in pixels.
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