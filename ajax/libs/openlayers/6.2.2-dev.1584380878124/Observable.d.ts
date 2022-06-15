/**
 * Removes an event listener using the key returned by `on()` or `once()`.
 * @param {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} key The key returned by `on()`
 *     or `once()` (or an array of keys).
 * @api
 */
export function unByKey(key: import("./events.js").EventsKey | import("./events.js").EventsKey[]): void;
export default Observable;
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * An event target providing convenient methods for listener registration
 * and unregistration. A generic `change` event is always available through
 * {@link module:ol/Observable~Observable#changed}.
 *
 * @fires import("./events/Event.js").default
 * @api
 */
declare class Observable extends EventTarget {
    /**
     * @private
     * @type {number}
     */
    private revision_;
    /**
     * Increases the revision counter and dispatches a 'change' event.
     * @api
     */
    changed(): void;
    /**
     * Get the version number for this object.  Each time the object is modified,
     * its version number will be incremented.
     * @return {number} Revision.
     * @api
     */
    getRevision(): number;
    /**
     * Listen for a certain type of event.
     * @param {string|Array<string>} type The event type or array of event types.
     * @param {import("./events.js").ListenerFunction} listener The listener function.
     * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
     *     called with an array of event types as the first argument, the return
     *     will be an array of keys.
     * @api
     */
    on(type: string | string[], listener: (arg0: Event | import("./events/Event.js").default) => boolean | void): import("./events.js").EventsKey | import("./events.js").EventsKey[];
    /**
     * Listen once for a certain type of event.
     * @param {string|Array<string>} type The event type or array of event types.
     * @param {function(?): ?} listener The listener function.
     * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
     *     called with an array of event types as the first argument, the return
     *     will be an array of keys.
     * @api
     */
    once(type: string | string[], listener: (arg0: any) => any): import("./events.js").EventsKey | import("./events.js").EventsKey[];
    /**
     * Unlisten for a certain type of event.
     * @param {string|Array<string>} type The event type or array of event types.
     * @param {function(?): ?} listener The listener function.
     * @api
     */
    un(type: string | string[], listener: (arg0: any) => any): void;
}
import EventTarget from "./events/Target.js";
//# sourceMappingURL=Observable.d.ts.map