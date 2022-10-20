/**
 * @param {Event|import("./Event.js").default} evt Event
 */
export function stopPropagation(evt: Event | BaseEvent): void;
/**
 * @param {Event|import("./Event.js").default} evt Event
 */
export function preventDefault(evt: Event | BaseEvent): void;
export default BaseEvent;
/**
 * @module ol/events/Event
 */
/**
 * @classdesc
 * Stripped down implementation of the W3C DOM Level 2 Event interface.
 * See https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface.
 *
 * This implementation only provides `type` and `target` properties, and
 * `stopPropagation` and `preventDefault` methods. It is meant as base class
 * for higher level events defined in the library, and works with
 * {@link module:ol/events/Target~Target}.
 */
declare class BaseEvent {
    /**
     * @param {string} type Type.
     */
    constructor(type: string);
    /**
     * @type {boolean}
     */
    propagationStopped: boolean;
    /**
     * @type {boolean}
     */
    defaultPrevented: boolean;
    /**
     * The event type.
     * @type {string}
     * @api
     */
    type: string;
    /**
     * The event target.
     * @type {Object}
     * @api
     */
    target: Object;
    /**
     * Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
     * will be fired.
     * @api
     */
    preventDefault(): void;
    /**
     * Stop event propagation.
     * @api
     */
    stopPropagation(): void;
}
//# sourceMappingURL=Event.d.ts.map