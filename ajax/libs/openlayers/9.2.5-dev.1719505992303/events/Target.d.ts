export default Target;
export type EventTargetLike = EventTarget | Target;
/**
 * @typedef {EventTarget|Target} EventTargetLike
 */
/**
 * @classdesc
 * A simplified implementation of the W3C DOM Level 2 EventTarget interface.
 * See https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget.
 *
 * There are two important simplifications compared to the specification:
 *
 * 1. The handling of `useCapture` in `addEventListener` and
 *    `removeEventListener`. There is no real capture model.
 * 2. The handling of `stopPropagation` and `preventDefault` on `dispatchEvent`.
 *    There is no event target hierarchy. When a listener calls
 *    `stopPropagation` or `preventDefault` on an event object, it means that no
 *    more listeners after this one will be called. Same as when the listener
 *    returns false.
 */
declare class Target extends Disposable {
    /**
     * @param {*} [target] Default event target for dispatched events.
     */
    constructor(target?: any);
    /**
     * @private
     * @type {*}
     */
    private eventTarget_;
    /**
     * @private
     * @type {Object<string, number>|null}
     */
    private pendingRemovals_;
    /**
     * @private
     * @type {Object<string, number>|null}
     */
    private dispatching_;
    /**
     * @private
     * @type {Object<string, Array<import("../events.js").Listener>>|null}
     */
    private listeners_;
    /**
     * @param {string} type Type.
     * @param {import("../events.js").Listener} listener Listener.
     */
    addEventListener(type: string, listener: import("../events.js").Listener): void;
    /**
     * Dispatches an event and calls all listeners listening for events
     * of this type. The event parameter can either be a string or an
     * Object with a `type` property.
     *
     * @param {import("./Event.js").default|string} event Event object.
     * @return {boolean|undefined} `false` if anyone called preventDefault on the
     *     event object or if any of the listeners returned false.
     * @api
     */
    dispatchEvent(event: import("./Event.js").default | string): boolean | undefined;
    /**
     * Get the listeners for a specified event type. Listeners are returned in the
     * order that they will be called in.
     *
     * @param {string} type Type.
     * @return {Array<import("../events.js").Listener>|undefined} Listeners.
     */
    getListeners(type: string): Array<import("../events.js").Listener> | undefined;
    /**
     * @param {string} [type] Type. If not provided,
     *     `true` will be returned if this event target has any listeners.
     * @return {boolean} Has listeners.
     */
    hasListener(type?: string | undefined): boolean;
    /**
     * @param {string} type Type.
     * @param {import("../events.js").Listener} listener Listener.
     */
    removeEventListener(type: string, listener: import("../events.js").Listener): void;
}
import Disposable from '../Disposable.js';
//# sourceMappingURL=Target.d.ts.map