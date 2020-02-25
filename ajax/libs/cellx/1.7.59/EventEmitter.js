"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("@riim/logger");
var map_set_polyfill_1 = require("@riim/map-set-polyfill");
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this._events = new map_set_polyfill_1.Map();
    }
    EventEmitter.prototype.getEvents = function (type) {
        var events;
        if (type) {
            events = this._events.get(type);
            if (!events) {
                return [];
            }
            return Array.isArray(events) ? events : [events];
        }
        events = Object.create(null);
        this._events.forEach(function (typeEvents, type) {
            events[type] = Array.isArray(typeEvents) ? typeEvents : [typeEvents];
        });
        return events;
    };
    EventEmitter.prototype.on = function (type, listener, context) {
        if (typeof type == 'object') {
            context = listener !== undefined ? listener : this;
            var listeners = type;
            for (type in listeners) {
                this._on(type, listeners[type], context);
            }
        }
        else {
            this._on(type, listener, context !== undefined ? context : this);
        }
        return this;
    };
    EventEmitter.prototype.off = function (type, listener, context) {
        if (type) {
            if (typeof type == 'object') {
                context = listener !== undefined ? listener : this;
                var listeners = type;
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
    };
    EventEmitter.prototype._on = function (type, listener, context) {
        var index = type.indexOf(':');
        if (index != -1) {
            var propName = type.slice(index + 1);
            EventEmitter.currentlySubscribing = true;
            (this[propName + 'Cell'] || (this[propName], this[propName + 'Cell']))
                .on(type.slice(0, index), listener, context);
            EventEmitter.currentlySubscribing = false;
        }
        else {
            var events = this._events.get(type);
            var evt = { listener: listener, context: context };
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
    };
    EventEmitter.prototype._off = function (type, listener, context) {
        var index = type.indexOf(':');
        if (index != -1) {
            var propName = type.slice(index + 1);
            (this[propName + 'Cell'] || (this[propName], this[propName + 'Cell']))
                .off(type.slice(0, index), listener, context);
        }
        else {
            var events = this._events.get(type);
            if (!events) {
                return;
            }
            var evt = void 0;
            if (!Array.isArray(events)) {
                evt = events;
            }
            else if (events.length == 1) {
                evt = events[0];
            }
            else {
                for (var i = events.length; i;) {
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
    };
    EventEmitter.prototype.once = function (type, listener, context) {
        if (context === undefined) {
            context = this;
        }
        function wrapper(evt) {
            this._off(type, wrapper, context);
            return listener.call(this, evt);
        }
        this._on(type, wrapper, context);
        return wrapper;
    };
    EventEmitter.prototype.emit = function (evt, data) {
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
        this.handleEvent(evt);
        return evt;
    };
    EventEmitter.prototype.handleEvent = function (evt) {
        var events = this._events.get(evt.type);
        if (!events) {
            return;
        }
        if (Array.isArray(events)) {
            var eventCount = events.length;
            if (eventCount == 1) {
                if (this._tryEventListener(events[0], evt) === false) {
                    evt.isPropagationStopped = true;
                }
            }
            else {
                events = events.slice();
                for (var i = 0; i < eventCount; i++) {
                    if (this._tryEventListener(events[i], evt) === false) {
                        evt.isPropagationStopped = true;
                    }
                }
            }
        }
        else if (this._tryEventListener(events, evt) === false) {
            evt.isPropagationStopped = true;
        }
    };
    EventEmitter.prototype._tryEventListener = function (emEvt, evt) {
        try {
            return emEvt.listener.call(emEvt.context, evt);
        }
        catch (err) {
            logger_1.error(err);
        }
    };
    EventEmitter.currentlySubscribing = false;
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
