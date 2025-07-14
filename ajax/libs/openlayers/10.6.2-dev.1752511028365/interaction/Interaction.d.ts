/**
 * @param {import("../View.js").default} view View.
 * @param {import("../coordinate.js").Coordinate} delta Delta.
 * @param {number} [duration] Duration.
 */
export function pan(view: import("../View.js").default, delta: import("../coordinate.js").Coordinate, duration?: number): void;
/**
 * @param {import("../View.js").default} view View.
 * @param {number} delta Delta from previous zoom level.
 * @param {import("../coordinate.js").Coordinate} [anchor] Anchor coordinate in the user projection.
 * @param {number} [duration] Duration.
 */
export function zoomByDelta(view: import("../View.js").default, delta: number, anchor?: import("../coordinate.js").Coordinate, duration?: number): void;
export default Interaction;
/**
 * *
 */
export type InteractionOnSignature<Return> = import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> & import("../Observable").OnSignature<import("../ObjectEventType").Types | "change:active", import("../Object").ObjectEvent, Return> & import("../Observable").CombinedOnSignature<import("../Observable").EventTypes | import("../ObjectEventType").Types | "change:active", Return>;
/**
 * Object literal with config options for interactions.
 */
export type InteractionOptions = {
    /**
     * Method called by the map to notify the interaction that a browser event was
     * dispatched to the map. If the function returns a falsy value, propagation of
     * the event to other interactions in the map's interactions chain will be
     * prevented (this includes functions with no explicit return). The interactions
     * are traversed in reverse order of the interactions collection of the map.
     */
    handleEvent?: ((arg0: import("../MapBrowserEvent.js").default) => boolean) | undefined;
};
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active', Return>} InteractionOnSignature
 */
/**
 * Object literal with config options for interactions.
 * @typedef {Object} InteractionOptions
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleEvent]
 * Method called by the map to notify the interaction that a browser event was
 * dispatched to the map. If the function returns a falsy value, propagation of
 * the event to other interactions in the map's interactions chain will be
 * prevented (this includes functions with no explicit return). The interactions
 * are traversed in reverse order of the interactions collection of the map.
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * User actions that change the state of the map. Some are similar to controls,
 * but are not associated with a DOM element.
 * For example, {@link module:ol/interaction/KeyboardZoom~KeyboardZoom} is
 * functionally the same as {@link module:ol/control/Zoom~Zoom}, but triggered
 * by a keyboard event not a button element event.
 * Although interactions do not have a DOM element, some of them do render
 * vectors and so are visible on the screen.
 * @api
 */
declare class Interaction extends BaseObject {
    /**
     * @param {InteractionOptions} [options] Options.
     */
    constructor(options?: InteractionOptions);
    /***
     * @type {InteractionOnSignature<import("../events").EventsKey>}
     */
    on: InteractionOnSignature<import("../events").EventsKey>;
    /***
     * @type {InteractionOnSignature<import("../events").EventsKey>}
     */
    once: InteractionOnSignature<import("../events").EventsKey>;
    /***
     * @type {InteractionOnSignature<void>}
     */
    un: InteractionOnSignature<void>;
    /**
     * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event}.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
     * @return {boolean} `false` to stop event propagation.
     * @api
     */
    handleEvent(mapBrowserEvent: import("../MapBrowserEvent.js").default): boolean;
    /**
     * @private
     * @type {import("../Map.js").default|null}
     */
    private map_;
    /**
     * Return whether the interaction is currently active.
     * @return {boolean} `true` if the interaction is active, `false` otherwise.
     * @observable
     * @api
     */
    getActive(): boolean;
    /**
     * Get the map associated with this interaction.
     * @return {import("../Map.js").default|null} Map.
     * @api
     */
    getMap(): import("../Map.js").default | null;
    /**
     * Activate or deactivate the interaction.
     * @param {boolean} active Active.
     * @observable
     * @api
     */
    setActive(active: boolean): void;
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     * @param {import("../Map.js").default|null} map Map.
     */
    setMap(map: import("../Map.js").default | null): void;
}
import BaseObject from '../Object.js';
//# sourceMappingURL=Interaction.d.ts.map