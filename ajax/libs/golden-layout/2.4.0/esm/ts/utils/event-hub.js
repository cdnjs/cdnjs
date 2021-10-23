import { UnexpectedNullError } from '../errors/internal-error';
import { EventEmitter } from './event-emitter';
/**
 * An EventEmitter singleton that propagates events
 * across multiple windows. This is a little bit trickier since
 * windows are allowed to open childWindows in their own right.
 *
 * This means that we deal with a tree of windows. Therefore, we do the event propagation in two phases:
 *
 * - Propagate events from this layout to the parent layout
 *   - Repeat until the event arrived at the root layout
 * - Propagate events to this layout and to all children
 *   - Repeat until all layouts got the event
 *
 * **WARNING**: Only userBroadcast events are propagated between windows.
 * This means the you have to take care of propagating state changes between windows yourself.
 *
 * @public
 */
export class EventHub extends EventEmitter {
    /**
     * Creates a new EventHub instance
     * @param _layoutManager - the layout manager to synchronize between the windows
     * @internal
     */
    constructor(
    /** @internal */
    _layoutManager) {
        super();
        this._layoutManager = _layoutManager;
        /** @internal */
        this._childEventListener = (childEvent) => this.onEventFromChild(childEvent);
        globalThis.addEventListener(EventHub.ChildEventName, this._childEventListener, { passive: true });
    }
    /**
     * Emit an event and notify listeners
     *
     * @param eventName - The name of the event
     * @param args - Additional arguments that will be passed to the listener
     * @public
     */
    emit(eventName, ...args) {
        if (eventName === 'userBroadcast') {
            // Explicitly redirect the user broadcast to our overridden method.
            this.emitUserBroadcast(...args);
        }
        else {
            super.emit(eventName, ...args);
        }
    }
    /**
     * Broadcasts a message to all other currently opened windows.
     * @public
     */
    emitUserBroadcast(...args) {
        // Step 1: Bubble up the event
        this.handleUserBroadcastEvent('userBroadcast', args);
    }
    /**
     * Destroys the EventHub
     * @internal
     */
    destroy() {
        globalThis.removeEventListener(EventHub.ChildEventName, this._childEventListener);
    }
    /**
     * Internal processor to process local events.
     * @internal
     */
    handleUserBroadcastEvent(eventName, args) {
        if (this._layoutManager.isSubWindow) {
            // We are a sub window and received an event from one of our children.
            // So propagate it to the Root.
            this.propagateToParent(eventName, args);
        }
        else {
            // We are the root window, propagate it to the subtree below us.
            this.propagateToThisAndSubtree(eventName, args);
        }
    }
    /**
     * Callback for child events raised on the window
     * @internal
     */
    onEventFromChild(event) {
        const detail = event.detail;
        this.handleUserBroadcastEvent(detail.eventName, detail.args);
    }
    /**
     * Propagates the event to the parent by emitting
     * it on the parent's DOM window
     * @internal
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
        const opener = globalThis.opener;
        if (opener === null) {
            throw new UnexpectedNullError('EHPTP15778');
        }
        opener.dispatchEvent(event);
    }
    /**
     * Propagate events to the whole subtree under this event hub.
     * @internal
     */
    propagateToThisAndSubtree(eventName, args) {
        this.emitUnknown(eventName, ...args);
        for (let i = 0; i < this._layoutManager.openPopouts.length; i++) {
            const childGl = this._layoutManager.openPopouts[i].getGlInstance();
            if (childGl) {
                childGl.eventHub.propagateToThisAndSubtree(eventName, args);
            }
        }
    }
}
/** @public */
(function (EventHub) {
    /** @internal */
    EventHub.ChildEventName = 'gl_child_event';
})(EventHub || (EventHub = {}));
//# sourceMappingURL=event-hub.js.map