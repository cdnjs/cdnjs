/**
 * dd-base-impl.ts 12.3.2
 * Copyright (c) 2021-2025  Alain Dumesny - see GridStack root license
 */
/**
 * Type for event callback functions used in drag & drop operations.
 * Can return boolean to indicate if the event should continue propagation.
 */
export type EventCallback = (event: Event) => boolean | void;
/**
 * Abstract base class for all drag & drop implementations.
 * Provides common functionality for event handling, enable/disable state,
 * and lifecycle management used by draggable, droppable, and resizable implementations.
 */
export declare abstract class DDBaseImplement {
    /**
     * Returns the current disabled state.
     * Note: Use enable()/disable() methods to change state as other operations need to happen.
     */
    get disabled(): boolean;
    /**
     * Register an event callback for the specified event.
     *
     * @param event - Event name to listen for
     * @param callback - Function to call when event occurs
     */
    on(event: string, callback: EventCallback): void;
    /**
     * Unregister an event callback for the specified event.
     *
     * @param event - Event name to stop listening for
     */
    off(event: string): void;
    /**
     * Enable this drag & drop implementation.
     * Subclasses should override to perform additional setup.
     */
    enable(): void;
    /**
     * Disable this drag & drop implementation.
     * Subclasses should override to perform additional cleanup.
     */
    disable(): void;
    /**
     * Destroy this drag & drop implementation and clean up resources.
     * Removes all event handlers and clears internal state.
     */
    destroy(): void;
    /**
     * Trigger a registered event callback if one exists and the implementation is enabled.
     *
     * @param eventName - Name of the event to trigger
     * @param event - DOM event object to pass to the callback
     * @returns Result from the callback function, if any
     */
    triggerEvent(eventName: string, event: Event): boolean | void;
}
/**
 * Interface for HTML elements extended with drag & drop options.
 * Used to associate DD configuration with DOM elements.
 */
export interface HTMLElementExtendOpt<T> {
    /** The HTML element being extended */
    el: HTMLElement;
    /** The drag & drop options/configuration */
    option: T;
    /** Method to update the options and return the DD implementation */
    updateOption(T: any): DDBaseImplement;
}
