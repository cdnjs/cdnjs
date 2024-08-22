export default MapBrowserEventHandler;
declare class MapBrowserEventHandler extends Target {
    /**
     * @param {import("./Map.js").default} map The map with the viewport to listen to events on.
     * @param {number} [moveTolerance] The minimal distance the pointer must travel to trigger a move.
     */
    constructor(map: import("./Map.js").default, moveTolerance?: number | undefined);
    /**
     * This is the element that we will listen to the real events on.
     * @type {import("./Map.js").default}
     * @private
     */
    private map_;
    /**
     * @type {ReturnType<typeof setTimeout>}
     * @private
     */
    private clickTimeoutId_;
    /**
     * Emulate dblclick and singleclick. Will be true when only one pointer is active.
     * @type {boolean}
     */
    emulateClicks_: boolean;
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
     * @type {PointerEvent|null}
     * @private
     */
    private down_;
    /**
     * @type {Array<PointerEvent>}
     * @private
     */
    private activePointers_;
    /**
     * @type {!Object<number, Event>}
     * @private
     */
    private trackedTouches_;
    /**
     * @private
     */
    private element_;
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
     * Wrap and relay a pointermove event.
     * @param {PointerEvent} pointerEvent Pointer
     * event.
     * @private
     */
    private relayMoveEvent_;
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
import Target from './events/Target.js';
//# sourceMappingURL=MapBrowserEventHandler.d.ts.map