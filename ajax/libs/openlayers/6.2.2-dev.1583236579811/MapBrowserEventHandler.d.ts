export default MapBrowserEventHandler;
declare class MapBrowserEventHandler extends EventTarget {
    /**
     * @param {import("./PluggableMap.js").default} map The map with the viewport to listen to events on.
     * @param {number=} moveTolerance The minimal distance the pointer must travel to trigger a move.
     */
    constructor(map: import("./PluggableMap.js").default, moveTolerance?: number);
    /**
     * This is the element that we will listen to the real events on.
     * @type {import("./PluggableMap.js").default}
     * @private
     */
    private map_;
    /**
     * @type {any}
     * @private
     */
    private clickTimeoutId_;
    /**
     * @type {boolean}
     * @private
     */
    private dragging_;
    /**
     * @type {!Array<import("./events.js").EventsKey>}
     * @private
     */
    private dragListenerKeys_;
    /**
     * @type {number}
     * @private
     */
    private moveTolerance_;
    /**
     * The most recent "down" type event (or null if none have occurred).
     * Set on pointerdown.
     * @type {PointerEvent}
     * @private
     */
    private down_;
    /**
     * @type {number}
     * @private
     */
    private activePointers_;
    /**
     * @type {!Object<number, boolean>}
     * @private
     */
    private trackedTouches_;
    element_: HTMLElement;
    /**
     * @type {?import("./events.js").EventsKey}
     * @private
     */
    private pointerdownListenerKey_;
    /**
     * @type {PointerEvent}
     * @private
     */
    private originalPointerMoveEvent_;
    /**
     * @type {?import("./events.js").EventsKey}
     * @private
     */
    private relayedListenerKey_;
    /**
     * @private
     */
    private boundHandleTouchMove_;
    /**
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @private
     */
    private emulateClick_;
    /**
     * Keeps track on how many pointers are currently active.
     *
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @private
     */
    private updateActivePointers_;
    /**
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @private
     */
    private handlePointerUp_;
    /**
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @return {boolean} If the left mouse button was pressed.
     * @private
     */
    private isMouseActionButton_;
    /**
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @private
     */
    private handlePointerDown_;
    /**
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @private
     */
    private handlePointerMove_;
    /**
     * Wrap and relay a pointer event.  Note that this requires that the type
     * string for the MapBrowserPointerEvent matches the PointerEvent type.
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @private
     */
    private relayEvent_;
    /**
     * Flexible handling of a `touch-action: none` css equivalent: because calling
     * `preventDefault()` on a `pointermove` event does not stop native page scrolling
     * and zooming, we also listen for `touchmove` and call `preventDefault()` on it
     * when an interaction (currently `DragPan` handles the event.
     * @param {TouchEvent} event Event.
     * @private
     */
    private handleTouchMove_;
    /**
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @return {boolean} Is moving.
     * @private
     */
    private isMoving_;
}
import EventTarget from "./events/Target.js";
//# sourceMappingURL=MapBrowserEventHandler.d.ts.map