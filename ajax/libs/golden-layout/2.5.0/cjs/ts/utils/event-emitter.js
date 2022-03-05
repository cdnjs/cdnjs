"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
/**
 * A generic and very fast EventEmitter implementation. On top of emitting the actual event it emits an
 * {@link (EventEmitter:namespace).ALL_EVENT} event for every event triggered. This allows to hook into it and proxy events forwards
 * @public
 */
class EventEmitter {
    constructor() {
        /** @internal */
        this._allEventSubscriptions = [];
        /** @internal */
        this._subscriptionsMap = new Map();
        /**
         * Alias for off
         */
        this.unbind = this.removeEventListener;
        /**
         * Alias for emit
         */
        this.trigger = this.emit;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tryBubbleEvent(name, args) {
        // overridden by ContentItem
    }
    /**
     * Emit an event and notify listeners
     *
     * @param eventName - The name of the event
     * @param args - Additional arguments that will be passed to the listener
     */
    emit(eventName, ...args) {
        let subcriptions = this._subscriptionsMap.get(eventName);
        if (subcriptions !== undefined) {
            subcriptions = subcriptions.slice();
            for (let i = 0; i < subcriptions.length; i++) {
                const subscription = subcriptions[i];
                subscription(...args);
            }
        }
        this.emitAllEvent(eventName, args);
        this.tryBubbleEvent(eventName, args);
    }
    /** @internal */
    emitUnknown(eventName, ...args) {
        let subs = this._subscriptionsMap.get(eventName);
        if (subs !== undefined) {
            subs = subs.slice();
            for (let i = 0; i < subs.length; i++) {
                subs[i](...args);
            }
        }
        this.emitAllEvent(eventName, args);
        this.tryBubbleEvent(eventName, args);
    }
    /* @internal **/
    emitBaseBubblingEvent(eventName) {
        const event = new EventEmitter.BubblingEvent(eventName, this);
        this.emitUnknown(eventName, event);
    }
    /** @internal */
    emitUnknownBubblingEvent(eventName) {
        const event = new EventEmitter.BubblingEvent(eventName, this);
        this.emitUnknown(eventName, event);
    }
    /**
     * Removes a listener for an event.
     * @param eventName - The name of the event
     * @param callback - The previously registered callback method (optional)
     */
    removeEventListener(eventName, callback) {
        const unknownCallback = callback;
        this.removeUnknownEventListener(eventName, unknownCallback);
    }
    off(eventName, callback) {
        this.removeEventListener(eventName, callback);
    }
    /**
     * Listen for events
     *
     * @param eventName - The name of the event to listen to
     * @param callback - The callback to execute when the event occurs
     */
    addEventListener(eventName, callback) {
        const unknownCallback = callback;
        this.addUnknownEventListener(eventName, unknownCallback);
    }
    on(eventName, callback) {
        this.addEventListener(eventName, callback);
    }
    /** @internal */
    addUnknownEventListener(eventName, callback) {
        if (eventName === EventEmitter.ALL_EVENT) {
            this._allEventSubscriptions.push(callback);
        }
        else {
            let subscriptions = this._subscriptionsMap.get(eventName);
            if (subscriptions !== undefined) {
                subscriptions.push(callback);
            }
            else {
                subscriptions = [callback];
                this._subscriptionsMap.set(eventName, subscriptions);
            }
        }
    }
    /** @internal */
    removeUnknownEventListener(eventName, callback) {
        if (eventName === EventEmitter.ALL_EVENT) {
            this.removeSubscription(eventName, this._allEventSubscriptions, callback);
        }
        else {
            const subscriptions = this._subscriptionsMap.get(eventName);
            if (subscriptions === undefined) {
                throw new Error('No subscribtions to unsubscribe for event ' + eventName);
            }
            else {
                this.removeSubscription(eventName, subscriptions, callback);
            }
        }
    }
    /** @internal */
    removeSubscription(eventName, subscriptions, callback) {
        const idx = subscriptions.indexOf(callback);
        if (idx < 0) {
            throw new Error('Nothing to unbind for ' + eventName);
        }
        else {
            subscriptions.splice(idx, 1);
        }
    }
    /** @internal */
    emitAllEvent(eventName, args) {
        const allEventSubscriptionsCount = this._allEventSubscriptions.length;
        if (allEventSubscriptionsCount > 0) {
            const unknownArgs = args.slice();
            unknownArgs.unshift(eventName);
            const allEventSubcriptions = this._allEventSubscriptions.slice();
            for (let i = 0; i < allEventSubscriptionsCount; i++) {
                allEventSubcriptions[i](...unknownArgs);
            }
        }
    }
}
exports.EventEmitter = EventEmitter;
/** @public */
(function (EventEmitter) {
    /**
     * The name of the event that's triggered for every event
     */
    EventEmitter.ALL_EVENT = '__all';
    EventEmitter.headerClickEventName = 'stackHeaderClick';
    EventEmitter.headerTouchStartEventName = 'stackHeaderTouchStart';
    class BubblingEvent {
        /** @internal */
        constructor(
        /** @internal */
        _name, 
        /** @internal */
        _target) {
            this._name = _name;
            this._target = _target;
            /** @internal */
            this._isPropagationStopped = false;
        }
        get name() { return this._name; }
        get target() { return this._target; }
        /** @deprecated Use {@link (EventEmitter:namespace).(BubblingEvent:class).target} instead */
        get origin() { return this._target; }
        get isPropagationStopped() { return this._isPropagationStopped; }
        stopPropagation() {
            this._isPropagationStopped = true;
        }
    }
    EventEmitter.BubblingEvent = BubblingEvent;
    class ClickBubblingEvent extends BubblingEvent {
        /** @internal */
        constructor(name, target, 
        /** @internal */
        _mouseEvent) {
            super(name, target);
            this._mouseEvent = _mouseEvent;
        }
        get mouseEvent() { return this._mouseEvent; }
    }
    EventEmitter.ClickBubblingEvent = ClickBubblingEvent;
    class TouchStartBubblingEvent extends BubblingEvent {
        /** @internal */
        constructor(name, target, 
        /** @internal */
        _touchEvent) {
            super(name, target);
            this._touchEvent = _touchEvent;
        }
        get touchEvent() { return this._touchEvent; }
    }
    EventEmitter.TouchStartBubblingEvent = TouchStartBubblingEvent;
})(EventEmitter = exports.EventEmitter || (exports.EventEmitter = {}));
//# sourceMappingURL=event-emitter.js.map