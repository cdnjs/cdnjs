class EventEmitter {
    constructor() {
        this.eventTarget = new EventTarget();
    }
    emit(eventType, detail) {
        const e = new CustomEvent(String(eventType), { detail });
        this.eventTarget.dispatchEvent(e);
    }
    /** Subscribe to an event and return a function to unsubscribe */
    on(eventType, callback) {
        const handler = (e) => {
            if (e instanceof CustomEvent) {
                callback(e.detail);
            }
        };
        const eventName = String(eventType);
        this.eventTarget.addEventListener(eventName, handler);
        return () => this.eventTarget.removeEventListener(eventName, handler);
    }
    /** Subscribe to an event once and return a function to unsubscribe */
    once(eventType, callback) {
        const unsubscribe = this.on(eventType, (...args) => {
            unsubscribe();
            callback(...args);
        });
        return unsubscribe;
    }
}
export default EventEmitter;
