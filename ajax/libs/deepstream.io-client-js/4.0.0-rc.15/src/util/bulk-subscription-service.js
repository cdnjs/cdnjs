"use strict";
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BulkSubscriptionService = /** @class */ (function () {
    function BulkSubscriptionService(services, subscriptionInterval, topic, subscribeBulkAction, subscribeOriginalAction, unsubscribeBulkAction, unsubscribeOriginalAction, onSubscriptionSent) {
        if (onSubscriptionSent === void 0) { onSubscriptionSent = (function () { }); }
        this.services = services;
        this.subscriptionInterval = subscriptionInterval;
        this.topic = topic;
        this.subscribeBulkAction = subscribeBulkAction;
        this.subscribeOriginalAction = subscribeOriginalAction;
        this.unsubscribeBulkAction = unsubscribeBulkAction;
        this.unsubscribeOriginalAction = unsubscribeOriginalAction;
        this.onSubscriptionSent = onSubscriptionSent;
        this.subscribeNames = new Set();
        this.unsubscribeNames = new Set();
        this.timerRef = -1;
        this.correlationId = 0;
        this.services.connection.onLost(this.onLost.bind(this));
    }
    BulkSubscriptionService.prototype.subscribe = function (name) {
        if (this.subscriptionInterval > 0 || !this.subscribeOriginalAction) {
            if (this.unsubscribeNames.has(name)) {
                this.unsubscribeNames.delete(name);
            }
            else {
                this.subscribeNames.add(name);
                this.registerFlush();
            }
            return;
        }
        var message = {
            topic: this.topic,
            action: this.subscribeOriginalAction,
            name: name
        };
        this.services.connection.sendMessage(message);
        this.onSubscriptionSent(message);
    };
    BulkSubscriptionService.prototype.subscribeList = function (users) {
        users.forEach(this.subscribe.bind(this));
    };
    BulkSubscriptionService.prototype.unsubscribe = function (name) {
        if (this.subscriptionInterval > 0 || !this.unsubscribeOriginalAction) {
            if (this.subscribeNames.has(name)) {
                this.subscribeNames.delete(name);
            }
            else {
                this.unsubscribeNames.add(name);
                this.registerFlush();
            }
            return;
        }
        var message = {
            topic: this.topic,
            action: this.unsubscribeOriginalAction,
            name: name
        };
        this.services.connection.sendMessage(message);
        this.onSubscriptionSent(message);
    };
    BulkSubscriptionService.prototype.unsubscribeList = function (users) {
        users.forEach(this.unsubscribe.bind(this));
    };
    BulkSubscriptionService.prototype.registerFlush = function () {
        if (!this.services.timerRegistry.has(this.timerRef)) {
            this.timerRef = this.services.timerRegistry.add({
                callback: this.sendMessages,
                context: this,
                duration: this.subscriptionInterval
            });
        }
    };
    BulkSubscriptionService.prototype.sendMessages = function () {
        if (!this.services.connection.isConnected) {
            this.onLost();
            return;
        }
        if (this.subscribeNames.size > 0) {
            var message = {
                topic: this.topic,
                action: this.subscribeBulkAction,
                names: __spread(this.subscribeNames),
                correlationId: (this.correlationId++).toString()
            };
            this.services.connection.sendMessage(message);
            this.onSubscriptionSent(message);
            this.subscribeNames.clear();
        }
        if (this.unsubscribeNames.size > 0) {
            var message = {
                topic: this.topic,
                action: this.unsubscribeBulkAction,
                names: __spread(this.unsubscribeNames),
                correlationId: (this.correlationId++).toString()
            };
            this.services.connection.sendMessage(message);
            this.onSubscriptionSent(message);
            this.unsubscribeNames.clear();
        }
    };
    BulkSubscriptionService.prototype.onLost = function () {
        this.services.timerRegistry.remove(this.timerRef);
        this.subscribeNames.clear();
        this.unsubscribeNames.clear();
    };
    return BulkSubscriptionService;
}());
exports.BulkSubscriptionService = BulkSubscriptionService;
