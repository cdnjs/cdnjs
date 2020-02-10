"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BulkSubscriptionService {
    constructor(services, subscriptionInterval, topic, subscribeBulkAction, subscribeOriginalAction, unsubscribeBulkAction, unsubscribeOriginalAction, onSubscriptionSent = (() => { })) {
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
    subscribe(name) {
        if (this.subscriptionInterval > 0 || !this.subscribeOriginalAction) {
            this.unsubscribeNames.delete(name);
            this.subscribeNames.add(name);
            this.registerFlush();
            return;
        }
        const message = {
            topic: this.topic,
            action: this.subscribeOriginalAction,
            name
        };
        this.services.connection.sendMessage(message);
        this.onSubscriptionSent(message);
    }
    subscribeList(users) {
        users.forEach(this.subscribe.bind(this));
    }
    unsubscribe(name) {
        if (this.subscriptionInterval > 0 || !this.unsubscribeOriginalAction) {
            this.unsubscribeNames.add(name);
            this.subscribeNames.delete(name);
            this.registerFlush();
            return;
        }
        const message = {
            topic: this.topic,
            action: this.unsubscribeOriginalAction,
            name
        };
        this.services.connection.sendMessage(message);
        this.onSubscriptionSent(message);
    }
    unsubscribeList(users) {
        users.forEach(this.unsubscribe.bind(this));
    }
    registerFlush() {
        if (!this.services.timerRegistry.has(this.timerRef)) {
            this.timerRef = this.services.timerRegistry.add({
                callback: this.sendMessages,
                context: this,
                duration: this.subscriptionInterval
            });
        }
    }
    sendMessages() {
        if (!this.services.connection.isConnected) {
            this.onLost();
            return;
        }
        if (this.subscribeNames.size > 0) {
            const message = {
                topic: this.topic,
                action: this.subscribeBulkAction,
                names: [...this.subscribeNames],
                correlationId: (this.correlationId++).toString()
            };
            this.services.connection.sendMessage(message);
            this.onSubscriptionSent(message);
            this.subscribeNames.clear();
        }
        if (this.unsubscribeNames.size > 0) {
            const message = {
                topic: this.topic,
                action: this.unsubscribeBulkAction,
                names: [...this.unsubscribeNames],
                correlationId: (this.correlationId++).toString()
            };
            this.services.connection.sendMessage(message);
            this.onSubscriptionSent(message);
            this.unsubscribeNames.clear();
        }
    }
    onLost() {
        this.services.timerRegistry.remove(this.timerRef);
        this.subscribeNames.clear();
        this.unsubscribeNames.clear();
    }
}
exports.BulkSubscriptionService = BulkSubscriptionService;
//# sourceMappingURL=bulk-subscription-service.js.map