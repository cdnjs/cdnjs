/**
 * @private
 */
Ext.define('Ext.event.publisher.ElementPaint', {

    extend: 'Ext.event.publisher.Publisher',

    requires: [
        'Ext.util.PaintMonitor',
        'Ext.TaskQueue'
    ],

    targetType: 'element',

    handledEvents: ['painted'],

    constructor: function() {
        this.monitors = {};

        this.callSuper(arguments);
    },

    subscribe: function(target) {
        var match = target.match(this.idSelectorRegex),
            subscribers = this.subscribers,
            id, element;

        if (!match) {
            return false;
        }

        id = match[1];

        if (subscribers.hasOwnProperty(id)) {
            subscribers[id]++;
            return true;
        }

        subscribers[id] = 1;

        element = Ext.get(id);

        this.monitors[id] = new Ext.util.PaintMonitor({
            element: element,
            callback: this.onElementPainted,
            scope: this,
            args: [target, element]
        });

        return true;
    },

    unsubscribe: function(target, eventName, all) {
        var match = target.match(this.idSelectorRegex),
            subscribers = this.subscribers,
            id;

        if (!match) {
            return false;
        }

        id = match[1];

        if (!subscribers.hasOwnProperty(id) || (!all && --subscribers[id] > 0)) {
            return true;
        }

        delete subscribers[id];

        this.monitors[id].destroy();
        delete this.monitors[id];

        return true;
    },

    onElementPainted: function(target, element) {
        Ext.TaskQueue.requestRead('dispatch', this, [target, 'painted', [element]]);
    }
});
