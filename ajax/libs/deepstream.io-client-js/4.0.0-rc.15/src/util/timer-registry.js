"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TimerRegistry = /** @class */ (function () {
    function TimerRegistry(timerResolution) {
        this.registry = new Map();
        this.timerIdCounter = 0;
        setInterval(this.triggerTimeouts.bind(this), timerResolution);
    }
    TimerRegistry.prototype.triggerTimeouts = function () {
        var e_1, _a;
        var now = Date.now();
        try {
            for (var _b = __values(this.registry), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), timerId = _d[0], timeout = _d[1];
                if (now - timeout.created > timeout.duration) {
                    timeout.callback.call(timeout.context, timeout.data);
                    this.registry.delete(timerId);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    TimerRegistry.prototype.has = function (timerId) {
        return this.registry.has(timerId);
    };
    TimerRegistry.prototype.add = function (timeout) {
        this.timerIdCounter++;
        timeout.created = Date.now();
        this.registry.set(this.timerIdCounter, timeout);
        return this.timerIdCounter;
    };
    TimerRegistry.prototype.remove = function (timerId) {
        return this.registry.delete(timerId);
    };
    TimerRegistry.prototype.requestIdleCallback = function (callback) {
        setTimeout(callback, 0);
    };
    return TimerRegistry;
}());
exports.TimerRegistry = TimerRegistry;
