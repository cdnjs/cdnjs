"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimerRegistry {
    constructor(timerResolution) {
        this.registry = new Map();
        this.timerIdCounter = 0;
        setInterval(this.triggerTimeouts.bind(this), timerResolution);
    }
    triggerTimeouts() {
        const now = Date.now();
        for (const [timerId, timeout] of this.registry) {
            if (now - timeout.created > timeout.duration) {
                timeout.callback.call(timeout.context, timeout.data);
                this.registry.delete(timerId);
            }
        }
    }
    has(timerId) {
        return this.registry.has(timerId);
    }
    add(timeout) {
        this.timerIdCounter++;
        timeout.created = Date.now();
        this.registry.set(this.timerIdCounter, timeout);
        return this.timerIdCounter;
    }
    remove(timerId) {
        return this.registry.delete(timerId);
    }
    requestIdleCallback(callback) {
        setTimeout(callback, 0);
    }
}
exports.TimerRegistry = TimerRegistry;
//# sourceMappingURL=timer-registry.js.map