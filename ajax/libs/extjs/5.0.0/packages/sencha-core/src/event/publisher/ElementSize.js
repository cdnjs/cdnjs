/**
 * @private
 */
Ext.define('Ext.event.publisher.ElementSize', {

    extend: 'Ext.event.publisher.Publisher',

    requires: [
        'Ext.util.SizeMonitor'
    ],

    targetType: 'element',

    handledEvents: ['resize'],

    constructor: function() {
        this.monitors = {};

        this.callSuper(arguments);
    },

    subscribe: function(target) {
        var match = target.match(this.idSelectorRegex),
            subscribers = this.subscribers,
            id, element, sizeMonitor;

        if (!match || target === '#ext-window') {
            return false;
        }

        id = match[1];

        if (subscribers.hasOwnProperty(id)) {
            subscribers[id]++;
            return true;
        }

        subscribers[id] = 1;

        element = Ext.get(id);

        this.monitors[id] = sizeMonitor = new Ext.util.SizeMonitor({
            element: element,
            callback: this.onElementResize,
            scope: this,
            args: [target, element]
        });

        this.dispatcher.addListener('element', target, 'painted', 'forceRefresh', sizeMonitor);

        return true;
    },

    unsubscribe: function(target, eventName, all) {
        var match = target.match(this.idSelectorRegex),
            subscribers = this.subscribers,
            monitors = this.monitors,
            id, sizeMonitor;

        if (!match) {
            return false;
        }

        id = match[1];

        if (!subscribers.hasOwnProperty(id) || (!all && --subscribers[id] > 0)) {
            return true;
        }

        delete subscribers[id];

        sizeMonitor = monitors[id];

        this.dispatcher.removeListener('element', target, 'painted', 'forceRefresh', sizeMonitor);

        sizeMonitor.destroy();
        delete monitors[id];

        return true;
    },

    onElementResize: function(target, element, info) {
        Ext.TaskQueue.requestRead('dispatch', this, [target, 'resize', [element, info]]);
    }
});
