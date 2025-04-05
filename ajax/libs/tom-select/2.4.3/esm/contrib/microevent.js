/**
 * MicroEvent - to make any js object an event emitter
 *
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * @author Jerome Etienne (https://github.com/jeromeetienne)
 */
/**
 * Execute callback for each event in space separated list of event names
 *
 */
function forEvents(events, callback) {
    events.split(/\s+/).forEach((event) => {
        callback(event);
    });
}
export default class MicroEvent {
    constructor() {
        this._events = {};
    }
    on(events, fct) {
        forEvents(events, (event) => {
            const event_array = this._events[event] || [];
            event_array.push(fct);
            this._events[event] = event_array;
        });
    }
    off(events, fct) {
        var n = arguments.length;
        if (n === 0) {
            this._events = {};
            return;
        }
        forEvents(events, (event) => {
            if (n === 1) {
                delete this._events[event];
                return;
            }
            const event_array = this._events[event];
            if (event_array === undefined)
                return;
            event_array.splice(event_array.indexOf(fct), 1);
            this._events[event] = event_array;
        });
    }
    trigger(events, ...args) {
        var self = this;
        forEvents(events, (event) => {
            const event_array = self._events[event];
            if (event_array === undefined)
                return;
            event_array.forEach(fct => {
                fct.apply(self, args);
            });
        });
    }
}
;
//# sourceMappingURL=microevent.js.map