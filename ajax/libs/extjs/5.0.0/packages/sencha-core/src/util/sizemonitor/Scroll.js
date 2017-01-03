/**
 * @private
 */
Ext.define('Ext.util.sizemonitor.Scroll', {

    extend: 'Ext.util.sizemonitor.Abstract',

    getElementConfig: function() {
        return {
            reference: 'detectorsContainer',
            classList: ['x-size-monitors', 'scroll'],
            children: [
                {
                    reference: 'expandMonitor',
                    className: 'expand'
                },
                {
                    reference: 'shrinkMonitor',
                    className: 'shrink'
                }
            ]
        }
    },

    constructor: function(config) {
        this.onScroll = Ext.Function.bind(this.onScroll, this);

        this.callSuper(arguments);
    },

    bindListeners: function(bind) {
        var method = bind ? 'addEventListener' : 'removeEventListener';

        this.expandMonitor[method]('scroll', this.onScroll, true);
        this.shrinkMonitor[method]('scroll', this.onScroll, true);
    },

    forceRefresh: function() {
        Ext.TaskQueue.requestRead('refresh', this, [true]);
    },

    onScroll: function() {
        Ext.TaskQueue.requestRead('refresh', this);
    },

    refreshMonitors: function() {
        var expandMonitor = this.expandMonitor,
            shrinkMonitor = this.shrinkMonitor,
            end = 1000000;

        if (expandMonitor && !expandMonitor.isDestroyed) {
            expandMonitor.scrollLeft = end;
            expandMonitor.scrollTop = end;
        }

        if (shrinkMonitor && !shrinkMonitor.isDestroyed) {
            shrinkMonitor.scrollLeft = end;
            shrinkMonitor.scrollTop = end;
        }
    }
});
