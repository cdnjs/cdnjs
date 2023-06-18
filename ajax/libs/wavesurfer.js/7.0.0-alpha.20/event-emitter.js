class EventEmitter {
    eventTarget;
    constructor() {
        this.eventTarget = new EventTarget();
    }
    emit(eventType, detail) {
        const e = new CustomEvent(String(eventType), { detail });
        this.eventTarget.dispatchEvent(e);
    }
    /** Subscribe to an event and return a function to unsubscribe */
    on(eventType, callback, once) {
        const handler = (e) => {
            if (e instanceof CustomEvent) {
                callback(e.detail);
            }
        };
        const eventName = String(eventType);
        this.eventTarget.addEventListener(eventName, handler, { once });
        return () => this.eventTarget.removeEventListener(eventName, handler);
    }
    /** Subscribe to an event once and return a function to unsubscribe */
    once(eventType, callback) {
        return this.on(eventType, callback, true);
    }
}
export default EventEmitter;
