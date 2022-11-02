var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/events/Target
 */
import Disposable from '../Disposable.js';
import Event from './Event.js';
import { VOID } from '../functions.js';
import { clear } from '../obj.js';
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
var Target = /** @class */ (function (_super) {
    __extends(Target, _super);
    /**
     * @param {*} [opt_target] Default event target for dispatched events.
     */
    function Target(opt_target) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {*}
         */
        _this.eventTarget_ = opt_target;
        /**
         * @private
         * @type {Object<string, number>}
         */
        _this.pendingRemovals_ = null;
        /**
         * @private
         * @type {Object<string, number>}
         */
        _this.dispatching_ = null;
        /**
         * @private
         * @type {Object<string, Array<import("../events.js").Listener>>}
         */
        _this.listeners_ = null;
        return _this;
    }
    /**
     * @param {string} type Type.
     * @param {import("../events.js").Listener} listener Listener.
     */
    Target.prototype.addEventListener = function (type, listener) {
        if (!type || !listener) {
            return;
        }
        var listeners = this.listeners_ || (this.listeners_ = {});
        var listenersForType = listeners[type] || (listeners[type] = []);
        if (listenersForType.indexOf(listener) === -1) {
            listenersForType.push(listener);
        }
    };
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
    Target.prototype.dispatchEvent = function (event) {
        /** @type {import("./Event.js").default|Event} */
        var evt = typeof event === 'string' ? new Event(event) : event;
        var type = evt.type;
        if (!evt.target) {
            evt.target = this.eventTarget_ || this;
        }
        var listeners = this.listeners_ && this.listeners_[type];
        var propagate;
        if (listeners) {
            var dispatching = this.dispatching_ || (this.dispatching_ = {});
            var pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});
            if (!(type in dispatching)) {
                dispatching[type] = 0;
                pendingRemovals[type] = 0;
            }
            ++dispatching[type];
            for (var i = 0, ii = listeners.length; i < ii; ++i) {
                if ('handleEvent' in listeners[i]) {
                    propagate = /** @type {import("../events.js").ListenerObject} */ (listeners[i]).handleEvent(evt);
                }
                else {
                    propagate = /** @type {import("../events.js").ListenerFunction} */ (listeners[i]).call(this, evt);
                }
                if (propagate === false || evt.propagationStopped) {
                    propagate = false;
                    break;
                }
            }
            --dispatching[type];
            if (dispatching[type] === 0) {
                var pr = pendingRemovals[type];
                delete pendingRemovals[type];
                while (pr--) {
                    this.removeEventListener(type, VOID);
                }
                delete dispatching[type];
            }
            return propagate;
        }
    };
    /**
     * Clean up.
     */
    Target.prototype.disposeInternal = function () {
        this.listeners_ && clear(this.listeners_);
    };
    /**
     * Get the listeners for a specified event type. Listeners are returned in the
     * order that they will be called in.
     *
     * @param {string} type Type.
     * @return {Array<import("../events.js").Listener>|undefined} Listeners.
     */
    Target.prototype.getListeners = function (type) {
        return (this.listeners_ && this.listeners_[type]) || undefined;
    };
    /**
     * @param {string} [opt_type] Type. If not provided,
     *     `true` will be returned if this event target has any listeners.
     * @return {boolean} Has listeners.
     */
    Target.prototype.hasListener = function (opt_type) {
        if (!this.listeners_) {
            return false;
        }
        return opt_type
            ? opt_type in this.listeners_
            : Object.keys(this.listeners_).length > 0;
    };
    /**
     * @param {string} type Type.
     * @param {import("../events.js").Listener} listener Listener.
     */
    Target.prototype.removeEventListener = function (type, listener) {
        var listeners = this.listeners_ && this.listeners_[type];
        if (listeners) {
            var index = listeners.indexOf(listener);
            if (index !== -1) {
                if (this.pendingRemovals_ && type in this.pendingRemovals_) {
                    // make listener a no-op, and remove later in #dispatchEvent()
                    listeners[index] = VOID;
                    ++this.pendingRemovals_[type];
                }
                else {
                    listeners.splice(index, 1);
                    if (listeners.length === 0) {
                        delete this.listeners_[type];
                    }
                }
            }
        }
    };
    return Target;
}(Disposable));
export default Target;
//# sourceMappingURL=Target.js.map