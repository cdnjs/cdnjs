/**
 * @param {Array<PointerEvent>} pointerEvents List of events.
 * @return {import("../pixel.js").Pixel} Centroid pixel.
 */
export function centroid(pointerEvents: Array<PointerEvent>): import("../pixel.js").Pixel;
export default PointerInteraction;
export type Options = {
    /**
     * Function handling "down" events. If the function returns `true` then a drag
     * sequence is started.
     */
    handleDownEvent?: ((arg0: import("../MapBrowserEvent.js").default<any>) => boolean) | undefined;
    /**
     * Function handling "drag" events. This function is called on "move" events
     * during a drag sequence.
     */
    handleDragEvent?: ((arg0: import("../MapBrowserEvent.js").default<any>) => void) | undefined;
    /**
     * Method called by the map to notify the interaction that a browser event was
     * dispatched to the map. The function may return `false` to prevent the
     * propagation of the event to other interactions in the map's interactions
     * chain.
     */
    handleEvent?: ((arg0: import("../MapBrowserEvent.js").default<any>) => boolean) | undefined;
    /**
     * Function handling "move" events. This function is called on "move" events.
     * This functions is also called during a drag sequence, so during a drag
     * sequence both the `handleDragEvent` function and this function are called.
     * If `handleDownEvent` is defined and it returns true this function will not
     * be called during a drag sequence.
     */
    handleMoveEvent?: ((arg0: import("../MapBrowserEvent.js").default<any>) => void) | undefined;
    /**
     * Function handling "up" events. If the function returns `false` then the
     * current drag sequence is stopped.
     */
    handleUpEvent?: ((arg0: import("../MapBrowserEvent.js").default<any>) => boolean) | undefined;
    /**
     * Should the down event be propagated to other interactions, or should be
     * stopped?
     */
    stopDown?: ((arg0: boolean) => boolean) | undefined;
};
/**
 * @typedef {Object} Options
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleDownEvent]
 * Function handling "down" events. If the function returns `true` then a drag
 * sequence is started.
 * @property {function(import("../MapBrowserEvent.js").default):void} [handleDragEvent]
 * Function handling "drag" events. This function is called on "move" events
 * during a drag sequence.
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleEvent]
 * Method called by the map to notify the interaction that a browser event was
 * dispatched to the map. The function may return `false` to prevent the
 * propagation of the event to other interactions in the map's interactions
 * chain.
 * @property {function(import("../MapBrowserEvent.js").default):void} [handleMoveEvent]
 * Function handling "move" events. This function is called on "move" events.
 * This functions is also called during a drag sequence, so during a drag
 * sequence both the `handleDragEvent` function and this function are called.
 * If `handleDownEvent` is defined and it returns true this function will not
 * be called during a drag sequence.
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleUpEvent]
 *  Function handling "up" events. If the function returns `false` then the
 * current drag sequence is stopped.
 * @property {function(boolean):boolean} [stopDown]
 * Should the down event be propagated to other interactions, or should be
 * stopped?
 */
/**
 * @classdesc
 * Base class that calls user-defined functions on `down`, `move` and `up`
 * events. This class also manages "drag sequences".
 *
 * When the `handleDownEvent` user function returns `true` a drag sequence is
 * started. During a drag sequence the `handleDragEvent` user function is
 * called on `move` events. The drag sequence ends when the `handleUpEvent`
 * user function is called and returns `false`.
 * @api
 */
declare class PointerInteraction extends Interaction {
    /**
     * @param {Options} [opt_options] Options.
     */
    constructor(opt_options?: Options | undefined);
    /**
     * Handle pointer down events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     * @protected
     */
    protected handleDownEvent(mapBrowserEvent: import("../MapBrowserEvent.js").default<any>): boolean;
    /**
     * Handle pointer drag events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @protected
     */
    protected handleDragEvent(mapBrowserEvent: import("../MapBrowserEvent.js").default<any>): void;
    /**
     * Handle pointer move events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @protected
     */
    protected handleMoveEvent(mapBrowserEvent: import("../MapBrowserEvent.js").default<any>): void;
    /**
     * Handle pointer up events.
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @return {boolean} If the event was consumed.
     * @protected
     */
    protected handleUpEvent(mapBrowserEvent: import("../MapBrowserEvent.js").default<any>): boolean;
    /**
     * This function is used to determine if "down" events should be propagated
     * to other interactions or should be stopped.
     * @param {boolean} handled Was the event handled by the interaction?
     * @return {boolean} Should the `down` event be stopped?
     */
    stopDown(handled: boolean): boolean;
    /**
     * @type {boolean}
     * @protected
     */
    protected handlingDownUpSequence: boolean;
    /**
     * @type {Array<PointerEvent>}
     * @protected
     */
    protected targetPointers: Array<PointerEvent>;
    /**
     * Returns the current number of pointers involved in the interaction,
     * e.g. `2` when two fingers are used.
     * @return {number} The number of pointers.
     * @api
     */
    getPointerCount(): number;
    /**
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
     * @private
     */
    private updateTrackedPointers_;
}
import Interaction from "./Interaction.js";
//# sourceMappingURL=Pointer.d.ts.map