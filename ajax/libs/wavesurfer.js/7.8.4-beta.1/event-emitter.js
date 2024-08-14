/** A simple event emitter that can be used to listen to and emit events. */
class EventEmitter {
    listeners = {};
    /** Subscribe to an event. Returns an unsubscribe function. */
    on(event, listener, options) {
        if (!this.listeners[event]) {
            this.listeners[event] = new Set();
        }
        this.listeners[event].add(listener);
        if (options?.once) {
            const unsubscribeOnce = () => {
                this.un(event, unsubscribeOnce);
                this.un(event, listener);
            };
            this.on(event, unsubscribeOnce);
            return unsubscribeOnce;
        }
        return () => this.un(event, listener);
    }
    /** Unsubscribe from an event */
    un(event, listener) {
        this.listeners[event]?.delete(listener);
    }
    /** Subscribe to an event only once */
    once(event, listener) {
        return this.on(event, listener, { once: true });
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
