/**
 * dd-base-impl.ts 12.3.2
 * Copyright (c) 2021-2025  Alain Dumesny - see GridStack root license
 */
/**
 * Abstract base class for all drag & drop implementations.
 * Provides common functionality for event handling, enable/disable state,
 * and lifecycle management used by draggable, droppable, and resizable implementations.
 */
export class DDBaseImplement {
    constructor() {
        /** @internal */
        this._eventRegister = {};
    }
    /**
     * Returns the current disabled state.
     * Note: Use enable()/disable() methods to change state as other operations need to happen.
     */
    get disabled() { return this._disabled; }
    /**
     * Register an event callback for the specified event.
     *
     * @param event - Event name to listen for
     * @param callback - Function to call when event occurs
     */
    on(event, callback) {
        this._eventRegister[event] = callback;
    }
    /**
     * Unregister an event callback for the specified event.
     *
     * @param event - Event name to stop listening for
     */
    off(event) {
        delete this._eventRegister[event];
    }
    /**
     * Enable this drag & drop implementation.
     * Subclasses should override to perform additional setup.
     */
    enable() {
        this._disabled = false;
    }
    /**
     * Disable this drag & drop implementation.
     * Subclasses should override to perform additional cleanup.
     */
    disable() {
        this._disabled = true;
    }
    /**
     * Destroy this drag & drop implementation and clean up resources.
     * Removes all event handlers and clears internal state.
     */
    destroy() {
        delete this._eventRegister;
    }
    /**
     * Trigger a registered event callback if one exists and the implementation is enabled.
     *
     * @param eventName - Name of the event to trigger
     * @param event - DOM event object to pass to the callback
     * @returns Result from the callback function, if any
     */
    triggerEvent(eventName, event) {
        if (!this.disabled && this._eventRegister && this._eventRegister[eventName])
            return this._eventRegister[eventName](event);
    }
}
//# sourceMappingURL=dd-base-impl.js.map