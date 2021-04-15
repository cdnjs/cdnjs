import { EventEmitter } from './event-emitter';
/** @internal */
export class EventHub extends EventEmitter {
    constructor(_layoutManager) {
        super();
        this._layoutManager = _layoutManager;
        this._childEventListener = (childEvent) => this.onEventFromChild(childEvent);
        this._dontPropagateToParent = null;
        this._childEventSource = null;
        this.on(EventEmitter.ALL_EVENT, (name, ...args) => this.onEventFromThis(name, args));
        globalThis.addEventListener(EventHub.ChildEventName, this._childEventListener, { passive: true });
    }
    /**
     * Destroys the EventHub
     */
    destroy() {
        globalThis.removeEventListener(EventHub.ChildEventName, this._childEventListener);
    }
    /**
     * Called by the parent layout.
     */
    onEventFromParent(eventName, ...args) {
        this._dontPropagateToParent = eventName;
        this.emitUnknown(eventName, args);
    }
    /**
     * Called on every event emitted on this eventHub, regardles of origin.
     */
    onEventFromThis(eventName, ...args) {
        if (this._layoutManager.isSubWindow && args[0] !== this._dontPropagateToParent) {
            this.propagateToParent(eventName, args);
        }
        this.propagateToChildren(eventName, args);
        //Reset
        this._dontPropagateToParent = null;
        this._childEventSource = null;
    }
    /**
     * Callback for child events raised on the window
     */
    onEventFromChild(event) {
        const detail = event.detail;
        this._childEventSource = detail.layoutManager;
        this.emitUnknown(detail.eventName, detail.args);
    }
    /**
     * Propagates the event to the parent by emitting
     * it on the parent's DOM window
     */
    propagateToParent(eventName, args) {
        const detail = {
            layoutManager: this._layoutManager,
            eventName,
            args: args,
        };
        const eventInit = {
            bubbles: true,
            cancelable: true,
            detail,
        };
        const event = new CustomEvent(EventHub.ChildEventName, eventInit);
        globalThis.opener.dispatchEvent(event);
    }
    /**
     * Propagate events to children
     */
    propagateToChildren(eventName, args) {
        for (let i = 0; i < this._layoutManager.openPopouts.length; i++) {
            const childGl = this._layoutManager.openPopouts[i].getGlInstance();
            if (childGl && childGl !== this._childEventSource) {
                childGl.eventHub.onEventFromParent(eventName, args);
            }
        }
    }
}
/** @internal */
(function (EventHub) {
    EventHub.ChildEventName = 'gl_child_event';
})(EventHub || (EventHub = {}));
//# sourceMappingURL=event-hub.js.map