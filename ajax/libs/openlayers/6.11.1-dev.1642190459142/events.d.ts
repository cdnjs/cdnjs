/**
 * Key to use with {@link module:ol/Observable~Observable#unByKey}.
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
 * @param {Object} [opt_this] Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @param {boolean} [opt_once] If true, add the listener as one-off listener.
 * @return {EventsKey} Unique key for the listener.
 */
export function listen(target: EventTarget | import("./events/Target.js").default, type: string, listener: (arg0: import("./events/Event.js").default | Event) => boolean | void, opt_this?: any, opt_once?: boolean | undefined): EventsKey;
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
 * @param {Object} [opt_this] Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @return {EventsKey} Key for unlistenByKey.
 */
export function listenOnce(target: EventTarget | import("./events/Target.js").default, type: string, listener: (arg0: import("./events/Event.js").default | Event) => boolean | void, opt_this?: any): EventsKey;
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
 * Key to use with {@link module:ol/Observable~Observable#unByKey}.
 */
export type EventsKey = {
    /**
     * Listener.
     */
    listener: (arg0: import("./events/Event.js").default | Event) => boolean | void;
    /**
     * Target.
     */
    target: EventTarget | import("./events/Target.js").default;
    /**
     * Type.
     */
    type: string;
};
/**
 * Listener function. This function is called with an event object as argument.
 * When the function returns `false`, event propagation will stop.
 */
export type ListenerFunction = (arg0: import("./events/Event.js").default | Event) => boolean | void;
export type ListenerObject = {
    /**
     * HandleEvent listener function.
     */
    handleEvent: (arg0: import("./events/Event.js").default | Event) => boolean | void;
};
export type Listener = ((arg0: import("./events/Event.js").default | Event) => boolean | void) | ListenerObject;
//# sourceMappingURL=events.d.ts.map