/**
 * Removes an event listener using the key returned by `on()` or `once()`.
 * @param {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} key The key returned by `on()`
 *     or `once()` (or an array of keys).
 * @api
 */
export function unByKey(key: import("./events.js").EventsKey | import("./events.js").EventsKey[]): void;
export default Observable;
/**
 * *
 */
export type OnSignature<Type extends string, EventClass extends Event | import("./events/Event.js").default, Return> = (type: Type, listener: (event: EventClass) => any) => Return;
/**
 * *
 */
export type CombinedOnSignature<Type extends string, Return> = (type: Type[], listener: (event: Event | import("./events/Event.js").default) => any) => Return extends void | null ? void : Return[];
export type EventTypes = "error" | "change";
/**
 * *
 */
export type ObservableOnSignature<Return> = ((type: "error" | "change", listener: (event: import("./events/Event.js").default) => any) => Return) & ((type: ("error" | "change")[], listener: (event: Event | import("./events/Event.js").default) => any) => Return extends void | null ? void : Return[]);
/***
 * @template {string} Type
 * @template {Event|import("./events/Event.js").default} EventClass
 * @template Return
 * @typedef {(type: Type, listener: (event: EventClass) => ?) => Return} OnSignature
 */
/***
 * @template {string} Type
 * @template Return
 * @typedef {(type: Type[], listener: (event: Event|import("./events/Event").default) => ?) => Return extends void ? void : Return[]} CombinedOnSignature
 */
/**
 * @typedef {'change'|'error'} EventTypes
 */
/***
 * @template Return
 * @typedef {OnSignature<EventTypes, import("./events/Event.js").default, Return> & CombinedOnSignature<EventTypes, Return>} ObservableOnSignature
 */
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
    on: ((type: "error" | "change", listener: (event: import("./events/Event.js").default) => any) => import("./events.js").EventsKey) & ((type: ("error" | "change")[], listener: (event: Event | import("./events/Event.js").default) => any) => import("./events.js").EventsKey[]);
    once: ((type: "error" | "change", listener: (event: import("./events/Event.js").default) => any) => import("./events.js").EventsKey) & ((type: ("error" | "change")[], listener: (event: Event | import("./events/Event.js").default) => any) => import("./events.js").EventsKey[]);
    un: ((type: "error" | "change", listener: (event: import("./events/Event.js").default) => any) => void) & ((type: ("error" | "change")[], listener: (event: Event | import("./events/Event.js").default) => any) => void);
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
     * @param {string|Array<string>} type Type.
     * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
     * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
     * @protected
     */
    protected onInternal(type: string | string[], listener: (arg0: Event | import("./events/Event.js").default) => any): import("./events.js").EventsKey | import("./events.js").EventsKey[];
    /**
     * @param {string|Array<string>} type Type.
     * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
     * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
     * @protected
     */
    protected onceInternal(type: string | string[], listener: (arg0: Event | import("./events/Event.js").default) => any): import("./events.js").EventsKey | import("./events.js").EventsKey[];
    /**
     * Unlisten for a certain type of event.
     * @param {string|Array<string>} type Type.
     * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
     * @protected
     */
    protected unInternal(type: string | string[], listener: (arg0: Event | import("./events/Event.js").default) => any): void;
}
import EventTarget from "./events/Target.js";
//# sourceMappingURL=Observable.d.ts.map