"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@riim/logger");
const map_set_polyfill_1 = require("@riim/map-set-polyfill");
let currentlySubscribing = false;
let transactionLevel = 0;
let transactionEvents = new map_set_polyfill_1.Map();
class EventEmitter {
    static get currentlySubscribing() {
        return currentlySubscribing;
    }
    static set currentlySubscribing(value) {
        currentlySubscribing = value;
    }
    static transact(callback) {
        transactionLevel++;
        try {
            callback();
        }
        catch (err) {
            logger_1.error(err);
        }
        if (--transactionLevel) {
            return;
        }
        let events = transactionEvents;
        transactionEvents = new map_set_polyfill_1.Map();
        events.forEach((events, target) => {
            for (let type in events) {
                target.handleEvent(events[type]);
            }
        });
    }
    constructor() {
        this._events = new map_set_polyfill_1.Map();
    }
    getEvents(type) {
        let events;
        if (type) {
            events = this._events.get(type);
            if (!events) {
                return [];
            }
            return Array.isArray(events) ? events : [events];
        }
        events = Object.create(null);
        this._events.forEach((typeEvents, type) => {
            events[type] = Array.isArray(typeEvents) ? typeEvents : [typeEvents];
        });
        return events;
    }
    on(type, listener, context) {
        if (typeof type == 'object') {
            context = listener !== undefined ? listener : this;
            let listeners = type;
            for (type in listeners) {
                this._on(type, listeners[type], context);
            }
        }
        else {
            this._on(type, listener, context !== undefined ? context : this);
        }
        return this;
    }
    off(type, listener, context) {
        if (type) {
            if (typeof type == 'object') {
                context = listener !== undefined ? listener : this;
                let listeners = type;
                for (type in listeners) {
                    this._off(type, listeners[type], context);
                }
            }
            else {
                this._off(type, listener, context !== undefined ? context : this);
            }
        }
        else {
            this._events.clear();
        }
        return this;
    }
    _on(type, listener, context) {
        let index = type.indexOf(':');
        if (index != -1) {
            let propName = type.slice(index + 1);
            currentlySubscribing = true;
            (this[propName + 'Cell'] || (this[propName], this[propName + 'Cell'])).on(type.slice(0, index), listener, context);
            currentlySubscribing = false;
        }
        else {
            let events = this._events.get(type);
            let evt = { listener, context };
            if (!events) {
                this._events.set(type, evt);
            }
            else if (Array.isArray(events)) {
                events.push(evt);
            }
            else {
                this._events.set(type, [events, evt]);
            }
        }
    }
    _off(type, listener, context) {
        let index = type.indexOf(':');
        if (index != -1) {
            let propName = type.slice(index + 1);
            (this[propName + 'Cell'] || (this[propName], this[propName + 'Cell'])).off(type.slice(0, index), listener, context);
        }
        else {
            let events = this._events.get(type);
            if (!events) {
                return;
            }
            let evt;
            if (!Array.isArray(events)) {
                evt = events;
            }
            else if (events.length == 1) {
                evt = events[0];
            }
            else {
                for (let i = events.length; i;) {
                    evt = events[--i];
                    if (evt.listener == listener && evt.context === context) {
                        events.splice(i, 1);
                        break;
                    }
                }
                return;
            }
            if (evt.listener == listener && evt.context === context) {
                this._events.delete(type);
            }
        }
    }
    once(type, listener, context) {
        if (context === undefined) {
            context = this;
        }
        function wrapper(evt) {
            this._off(type, wrapper, context);
            return listener.call(this, evt);
        }
        this._on(type, wrapper, context);
        return wrapper;
    }
    emit(evt, data) {
        if (typeof evt == 'string') {
            evt = {
                target: this,
                type: evt
            };
        }
        else if (!evt.target) {
            evt.target = this;
        }
        else if (evt.target != this) {
            throw new TypeError('Event cannot be emitted on this object');
        }
        if (data) {
            evt.data = data;
        }
        if (transactionLevel) {
            let events = transactionEvents.get(this);
            if (!events) {
                events = Object.create(null);
                transactionEvents.set(this, events);
            }
            (evt.data || (evt.data = {})).prev = events[evt.type] || null;
            events[evt.type] = evt;
        }
        else {
            this.handleEvent(evt);
        }
        return evt;
    }
    handleEvent(evt) {
        let events = this._events.get(evt.type);
        if (!events) {
            return;
        }
        if (Array.isArray(events)) {
            let eventCount = events.length;
            if (eventCount == 1) {
                if (this._tryEventListener(events[0], evt) === false) {
                    evt.propagationStopped = true;
                }
            }
            else {
                events = events.slice();
                for (let i = 0; i < eventCount; i++) {
                    if (this._tryEventListener(events[i], evt) === false) {
                        evt.propagationStopped = true;
                    }
                }
            }
        }
        else if (this._tryEventListener(events, evt) === false) {
            evt.propagationStopped = true;
        }
    }
    _tryEventListener(emEvt, evt) {
        try {
            return emEvt.listener.call(emEvt.context, evt);
        }
        catch (err) {
            logger_1.error(err);
        }
    }
}
exports.EventEmitter = EventEmitter;
