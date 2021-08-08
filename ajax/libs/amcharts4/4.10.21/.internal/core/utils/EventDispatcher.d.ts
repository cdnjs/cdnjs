/**
 * Event Dispatcher module is used for registering listeners and dispatching
 * events across amCharts system.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IDisposer } from "./Disposer";
/**
 * Defines a universal type for the event object.
 */
export declare type AMEvent<Target, T> = {
    [K in keyof T]: {
        type: K;
        target: Target;
    } & T[K];
};
/**
 * A universal interface for event listeners.
 */
export interface EventListener<T> {
    killed: boolean;
    once: boolean;
    type: any;
    callback: any;
    context: any;
    shouldClone: boolean;
    dispatch: any;
    disposer: IDisposer;
}
/**
 * Universal Event Dispatcher.
 *
 * @important
 */
export declare class EventDispatcher<T> implements IDisposer {
    protected _listeners: Array<EventListener<T>>;
    protected _killed: Array<EventListener<T>>;
    protected _disabled: {
        [key in keyof T]?: number;
    };
    protected _iterating: number;
    protected _enabled: boolean;
    protected _disposed: boolean;
    /**
     * Constructor
     */
    constructor();
    /**
     * Returns if this object has been already disposed.
     *
     * @return Disposed?
     */
    isDisposed(): boolean;
    /**
     * Dispose (destroy) this object.
     */
    dispose(): void;
    /**
     * Checks if this particular event dispatcher has any listeners set.
     *
     * @return Has listeners?
     */
    hasListeners(): boolean;
    /**
     * Checks if this particular event dispatcher has any particular listeners set.
     *
     * @return Has particular event listeners?
     */
    hasListenersByType<Key extends keyof T>(type: Key): boolean;
    /**
     * Enable dispatching of events if they were previously disabled by
     * `disable()`.
     */
    enable(): void;
    /**
     * Disable dispatching of events until re-enabled by `enable()`.
     */
    disable(): void;
    /**
     * Enable dispatching particular event, if it was disabled before by
     * `disableType()`.
     *
     * @param type Event type
     */
    enableType<Key extends keyof T>(type: Key): void;
    /**
     * Disable dispatching of events for a certain event type.
     *
     * Optionally, can set how many dispatches to skip before automatically
     * re-enabling the dispatching.
     *
     * @param type    Event type
     * @param amount  Number of event dispatches to skip
     */
    disableType<Key extends keyof T>(type: Key, amount?: number): void;
    /**
     * Removes listener from dispatcher.
     *
     * Will throw an exception if such listener does not exists.
     *
     * @param listener Listener to remove
     */
    protected _removeListener(listener: EventListener<T>): void;
    /**
     * Removes existing listener by certain parameters.
     *
     * @param once         Listener's once setting
     * @param type         Listener's type
     * @param callback     Callback function
     * @param context      Callback context
     */
    protected _removeExistingListener<A, B, Key extends keyof T>(once: boolean, type: Key | null, callback?: A, context?: B): void;
    /**
     * Checks if dispatching for particular event type is enabled.
     *
     * @param type  Event type
     * @return Enabled?
     */
    isEnabled<Key extends keyof T>(type: Key): boolean;
    /**
     * Checks if there's already a listener with specific parameters.
     *
     * @param type      Listener's type
     * @param callback  Callback function
     * @param context   Callback context
     * @return Has listener?
     */
    has<C, Key extends keyof T>(type: Key, callback?: (this: C, event: T[Key]) => void, context?: C): boolean;
    /**
     * Checks whether event of the particular type should be dispatched.
     *
     * @param type  Event type
     * @return Dispatch?
     */
    protected _shouldDispatch<Key extends keyof T>(type: Key): boolean;
    /**
     * [_eachListener description]
     *
     * All of this extra code is needed when a listener is removed while iterating
     *
     * @todo Description
     * @param fn [description]
     */
    protected _eachListener(fn: (listener: EventListener<T>) => void): void;
    /**
     * Dispatches an event immediately without waiting for next cycle.
     *
     * @param type   Event type
     * @param event  Event object
     * @todo automatically add in type and target properties if they are missing
     */
    dispatchImmediately<Key extends keyof T>(type: Key, event: T[Key]): void;
    /**
     * Shelves the event to be dispatched within next update cycle.
     *
     * @param type   Event type
     * @param event  Event object
     * @todo automatically add in type and target properties if they are missing
     */
    dispatch<Key extends keyof T>(type: Key, event: T[Key]): void;
    /**
     * Creates, catalogs and returns an [[EventListener]].
     *
     * Event listener can be disposed.
     *
     * @param once         Listener's once setting
     * @param type         Listener's type
     * @param callback     Callback function
     * @param context      Callback context
     * @param shouldClone  Whether the listener should be copied when the EventDispatcher is copied
     * @param dispatch
     * @returns An event listener
     */
    protected _on<A, B, Key extends keyof T>(once: boolean, type: Key | null, callback: A, context: B, shouldClone: boolean, dispatch: (type: Key, event: T[Key]) => void): EventListener<T>;
    /**
     * Creates an event listener to be invoked on **any** event.
     *
     * @param callback     Callback function
     * @param context      Callback context
     * @param shouldClone  Whether the listener should be copied when the EventDispatcher is copied
     * @returns A disposable event listener
     * @todo what if `listen` is called on the same function twice ?
     */
    onAll<C, Key extends keyof T>(callback: (this: C, type: Key, event: T[Key]) => void, context?: C, shouldClone?: boolean): IDisposer;
    /**
     * Creates an event listener to be invoked on a specific event type.
     *
     * ```TypeScript
     * series.events.on("hidden", (ev) => {
     *   console.log("Series hidden: " + ev.target.name);
     * }, this);
     * ```
     * ```JavaScript
     * series.events.on("hidden", function(ev) {
     *   console.log("Series hidden: " + ev.target.name);
     * }, this);
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "events": {
     *     	"hidden": function(ev) {
     *     	  console.log("Series hidden: " + ev.target.name);
     *     	}
     *     }
     *   }]
     * }
     * ```
     *
     * The above will invoke our custom event handler whenever series we put
     * event on is hidden.
     *
     * @param type         Listener's type
     * @param callback     Callback function
     * @param context      Callback context
     * @param shouldClone  Whether the listener should be copied when the EventDispatcher is copied
     * @returns A disposable event listener
     * @todo what if `listen` is called on the same function twice ?
     */
    on<C, Key extends keyof T>(type: Key, callback: (this: C, event: T[Key]) => void, context?: C, shouldClone?: boolean): IDisposer;
    /**
     * Creates an event listener to be invoked on a specific event type once.
     *
     * Once the event listener is invoked, it is automatically disposed.
     *
     * ```TypeScript
     * series.events.on("hidden", (ev) => {
     *   console.log("Series hidden: " + ev.target.name);
     * }, this);
     * ```
     * ```JavaScript
     * series.events.on("hidden", function(ev) {
     *   console.log("Series hidden: " + ev.target.name);
     * }, this);
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "events": {
     *     	"hidden": function(ev) {
     *     	  console.log("Series hidden: " + ev.target.name);
     *     	}
     *     }
     *   }]
     * }
     * ```
     *
     * The above will invoke our custom event handler the first time series we
     * put event on is hidden.
     *
     * @param type         Listener's type
     * @param callback     Callback function
     * @param context      Callback context
     * @param shouldClone  Whether the listener should be copied when the EventDispatcher is copied
     * @returns A disposable event listener
     * @todo what if `listen` is called on the same function twice ?
     */
    once<C, Key extends keyof T>(type: Key, callback: (this: C, event: T[Key]) => void, context?: C, shouldClone?: boolean): IDisposer;
    /**
     * Removes the event listener with specific parameters.
     *
     * @param type         Listener's type
     * @param callback     Callback function
     * @param context      Callback context
     */
    off<C, Key extends keyof T>(type: Key, callback?: (this: C, event: T[Key]) => void, context?: C): void;
    /**
     * Copies all dispatcher parameters, including listeners, from another event
     * dispatcher.
     *
     * @param source Source event dispatcher
     */
    copyFrom(source: this): void;
}
/**
 * A version of the [[EventDispatcher]] that dispatches events for a specific
 * target object.
 *
 * @important
 */
export declare class TargetedEventDispatcher<Target, T> extends EventDispatcher<T> {
    /**
     * A target object which is originating events using this dispatcher.
     */
    target: Target;
    /**
     * Constructor
     *
     * @param target Event dispatcher target
     */
    constructor(target: Target);
    /**
     * Copies all dispatcher parameters, including listeners, from another event
     * dispatcher.
     *
     * @param source Source event dispatcher
     */
    copyFrom(source: this): void;
}
