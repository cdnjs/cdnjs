"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventHook = eventHook;
exports.eventMixin = eventMixin;
const events_1 = require("events");
const service_1 = require("./service");
function eventHook(context, next) {
    const { events } = (0, service_1.getServiceOptions)(context.self);
    const defaultEvent = service_1.defaultEventMap[context.method] || null;
    context.event = defaultEvent;
    return next().then(() => {
        // Send the event only if the service does not do so already (indicated in the `events` option)
        // This is used for custom events and for client services receiving event from the server
        if (typeof context.event === 'string' && !events.includes(context.event)) {
            const results = Array.isArray(context.result) ? context.result : [context.result];
            results.forEach((element) => context.self.emit(context.event, element, context));
        }
    });
}
function eventMixin(service) {
    const isEmitter = typeof service.on === 'function' && typeof service.emit === 'function';
    if (!isEmitter) {
        Object.assign(service, events_1.EventEmitter.prototype);
    }
    return service;
}
//# sourceMappingURL=events.js.map