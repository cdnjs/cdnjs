"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var constants_1 = require("../constants");
var utils_1 = require("../../binary-protocol/src/utils");
var EventEmitter = require("component-emitter2");
/**
 * Subscriptions to events are in a pending state until deepstream acknowledges
 * them. This is a pattern that's used by numerour classes. This registry aims
 * to centralise the functionality necessary to keep track of subscriptions and
 * their respective timeouts.
 */
var TimeoutRegistry = /** @class */ (function (_super) {
    __extends(TimeoutRegistry, _super);
    function TimeoutRegistry(services, options) {
        var _this = _super.call(this) || this;
        _this.services = services;
        _this.options = options;
        _this.register = new Map();
        return _this;
    }
    /**
     * Add an entry
     */
    TimeoutRegistry.prototype.add = function (timeout) {
        if (timeout.duration === undefined) {
            timeout.duration = this.options.subscriptionTimeout;
        }
        if (timeout.event === undefined) {
            timeout.event = constants_1.EVENT.ACK_TIMEOUT;
        }
        /*
        if (timeout.duration < 1) {
          should we throw an error?
          return -1
        }
        */
        if (!this.services.connection.isConnected) {
            return null;
        }
        this.remove(timeout.message);
        var internalTimeout = {
            timerId: -1,
            uniqueName: this.getUniqueName(timeout.message),
            // event: timeout.event,
            timeout: timeout
        };
        internalTimeout.timerId = this.services.timerRegistry.add({
            context: this,
            callback: this.onTimeout,
            duration: timeout.duration,
            data: internalTimeout
        });
        this.register.set(internalTimeout.uniqueName, internalTimeout);
        return internalTimeout.uniqueName;
    };
    /**
     * Remove an entry
     */
    TimeoutRegistry.prototype.remove = function (message) {
        var requestMsg;
        var action = utils_1.RESPONSE_TO_REQUEST[message.topic][message.action];
        if (!action) {
            requestMsg = message;
        }
        else {
            requestMsg = __assign({}, message, { action: action });
        }
        var uniqueName = this.getUniqueName(requestMsg);
        this.clear(uniqueName);
    };
    /**
     * Processes an incoming ACK-message and removes the corresponding subscription
     */
    TimeoutRegistry.prototype.clear = function (uniqueName) {
        var timeout = this.register.get(uniqueName);
        if (timeout) {
            this.register.delete(uniqueName);
            this.services.timerRegistry.remove(timeout.timerId);
        }
    };
    /**
     * Will be invoked if the timeout has occured before the ack message was received
     */
    TimeoutRegistry.prototype.onTimeout = function (internalTimeout) {
        this.register.delete(internalTimeout.uniqueName);
        var timeout = internalTimeout.timeout;
        if (timeout.callback) {
            timeout.callback(timeout.event, timeout.message);
        }
        else {
            this.services.logger.warn(timeout.message, timeout.event);
        }
    };
    /**
     * Returns a unique name from the timeout
     */
    TimeoutRegistry.prototype.getUniqueName = function (message) {
        var action = message.originalAction || message.action;
        var name = "" + message.topic + action + "_";
        if (message.correlationId) {
            name += message.correlationId;
        }
        else if (message.name) {
            name += message.name;
        }
        return name;
    };
    /**
     * Remote all timeouts when connection disconnects
     */
    TimeoutRegistry.prototype.onConnectionLost = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.register), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), uniqueName = _d[0], timeout = _d[1];
                this.services.timerRegistry.remove(timeout.timerId);
                this.register.delete(uniqueName);
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
    return TimeoutRegistry;
}(EventEmitter));
exports.TimeoutRegistry = TimeoutRegistry;
