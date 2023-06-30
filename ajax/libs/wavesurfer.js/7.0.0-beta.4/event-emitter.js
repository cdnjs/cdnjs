/** A simple event emitter that can be used to listen to and emit events. */
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    /** Subscribe to an event. Returns an unsubscribe function. */
    on(eventName, listener) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = new Set();
        }
        this.listeners[eventName].add(listener);
        return () => this.un(eventName, listener);
    }
    /** Subscribe to an event only once */
    once(eventName, listener) {
        // The actual subscription
        const unsubscribe = this.on(eventName, listener);
        // Another subscription that will unsubscribe the actual subscription and itself after the first event
        const unsubscribeOnce = this.on(eventName, () => {
            unsubscribe();
            unsubscribeOnce();
        });
        return unsubscribe;
    }
    /** Unsubscribe from an event */
    un(eventName, listener) {
        if (this.listeners[eventName]) {
            if (listener) {
                this.listeners[eventName].delete(listener);
            }
            else {
                delete this.listeners[eventName];
            }
        }
    }
    /** Clear all events */
    unAll() {
        this.listeners = {};
    }
    /** Emit an event */
    emit(eventName, ...args) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach((listener) => listener(...args));
        }
    }
}
export default EventEmitter;
