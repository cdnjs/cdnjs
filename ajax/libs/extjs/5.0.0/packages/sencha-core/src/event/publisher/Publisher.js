/**
 * @private
 */
Ext.define('Ext.event.publisher.Publisher', {
    targetType: '',

    idSelectorRegex: /^#([\w\-]+)$/i,

    constructor: function() {
        var handledEvents = this.handledEvents || [],
            handledEventsMap,
            i, ln, event;

        handledEventsMap = this.handledEventsMap = {};

        for (i = 0,ln = handledEvents.length; i < ln; i++) {
            event = handledEvents[i];

            handledEventsMap[event] = true;
        }

        this.subscribers = {};

        return this;
    },

    handles: function(eventName) {
        var map = this.handledEventsMap;

        return !!map[eventName] || !!map['*'] || eventName === '*';
    },

    getHandledEvents: function() {
        return this.handledEvents;
    },

    setDispatcher: function(dispatcher) {
        this.dispatcher = dispatcher;
    },

    subscribe: function() {
        return false;
    },

    unsubscribe: function() {
        return false;
    },

    unsubscribeAll: function() {
        delete this.subscribers;
        this.subscribers = {};

        return this;
    },

    notify: function() {
        return false;
    },

    getTargetType: function() {
        return this.targetType;
    },

    dispatch: function(target, eventName, args, capture) {
        this.dispatcher.doDispatchEvent(this.targetType, target, eventName, args, null, null, capture);
    },

    destroy: Ext.emptyFn
});
