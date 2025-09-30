/**
 * Key to use with {@link module:ol/Observable.unByKey}.
 * @typedef {Object} EventsKey
 * @property {ListenerFunction} listener Listener.
 * @property {import("./events/Target.js").EventTargetLike} target Target.
 * @property {string} type Type.
 * @api
 */
/**
 * Listener function. This function is called with an event object as argument.
 * When the function returns `false`, event propagation will stop.
 *
 * @typedef {function((Event|import("./events/Event.js").default)): (void|boolean)} ListenerFunction
 * @api
 */
/**
 * @typedef {Object} ListenerObject
 * @property {ListenerFunction} handleEvent HandleEvent listener function.
 */
/**
 * @typedef {ListenerFunction|ListenerObject} Listener
 */
/**
 * Registers an event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` to a `this` object, and returns
 * a key for use with {@link module:ol/events.unlistenByKey}.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object} [thisArg] Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @param {boolean} [once] If true, add the listener as one-off listener.
 * @return {EventsKey} Unique key for the listener.
 */
export function listen(target: import("./events/Target.js").EventTargetLike, type: string, listener: ListenerFunction, thisArg?: any, once?: boolean): EventsKey;
/**
 * Registers a one-off event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` as self-unregistering listener
 * to a `this` object, and returns a key for use with
 * {@link module:ol/events.unlistenByKey} in case the listener needs to be
 * unregistered before it is called.
 *
 * When {@link module:ol/events.listen} is called with the same arguments after this
 * function, the self-unregistering listener will be turned into a permanent
 * listener.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object} [thisArg] Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @return {EventsKey} Key for unlistenByKey.
 */
export function listenOnce(target: import("./events/Target.js").EventTargetLike, type: string, listener: ListenerFunction, thisArg?: any): EventsKey;
/**
 * Unregisters event listeners on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * The argument passed to this function is the key returned from
 * {@link module:ol/events.listen} or {@link module:ol/events.listenOnce}.
 *
 * @param {EventsKey} key The key.
 */
export function unlistenByKey(key: EventsKey): void;
/**
 * Key to use with {@link module :ol/Observable.unByKey}.
 */
export type EventsKey = {
    /**
     * Listener.
     */
    listener: ListenerFunction;
    /**
     * Target.
     */
    target: import("./events/Target.js").EventTargetLike;
    /**
     * Type.
     */
    type: string;
};
/**
 * Listener function. This function is called with an event object as argument.
 * When the function returns `false`, event propagation will stop.
 */
export type ListenerFunction = (arg0: (Event | import("./events/Event.js").default)) => (void | boolean);
export type ListenerObject = {
    /**
     * HandleEvent listener function.
     */
    handleEvent: ListenerFunction;
};
export type Listener = ListenerFunction | ListenerObject;
//# sourceMappingURL=events.d.ts.map