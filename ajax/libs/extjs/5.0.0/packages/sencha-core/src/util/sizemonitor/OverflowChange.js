/**
 * @private
 */
Ext.define('Ext.util.sizemonitor.OverflowChange', {

    extend: 'Ext.util.sizemonitor.Abstract',

    constructor: function(config) {
        this.onExpand = Ext.Function.bind(this.onExpand, this);
        this.onShrink = Ext.Function.bind(this.onShrink, this);

        this.callSuper(arguments);
    },

    getElementConfig: function() {
        return {
            reference: 'detectorsContainer',
            classList: ['x-size-monitors', 'overflowchanged'],
            children: [
                {
                    reference: 'expandMonitor',
                    className: 'expand',
                    children: [{
                        reference: 'expandHelper'
                    }]
                },
                {
                    reference: 'shrinkMonitor',
                    className: 'shrink',
                    children: [{
                        reference: 'shrinkHelper'
                    }]
                }
            ]
        };
    },

    bindListeners: function(bind) {
        var method = bind ? 'addEventListener' : 'removeEventListener';

        this.expandMonitor[method](Ext.browser.is.Firefox ? 'underflow' : 'overflowchanged', this.onExpand, true);
        this.shrinkMonitor[method](Ext.browser.is.Firefox ? 'overflow' : 'overflowchanged', this.onShrink, true);
    },

    onExpand: function(e) {
        if (Ext.browser.is.Webkit && e.horizontalOverflow && e.verticalOverflow) {
            return;
        }

        Ext.TaskQueue.requestRead('refresh', this);
    },

    onShrink: function(e) {
        if (Ext.browser.is.Webkit && !e.horizontalOverflow && !e.verticalOverflow) {
            return;
        }

        Ext.TaskQueue.requestRead('refresh', this);
    },

    refreshMonitors: function() {
        if (this.isDestroyed) {
            return;
        }

        var expandHelper = this.expandHelper,
            shrinkHelper = this.shrinkHelper,
            contentBounds = this.getContentBounds(),
            width = contentBounds.width,
            height = contentBounds.height,
            style;

        if (expandHelper && !expandHelper.isDestroyed) {
            style = expandHelper.style;
            style.width = (width + 1) + 'px';
            style.height = (height + 1) + 'px';
        }

        if (shrinkHelper && !shrinkHelper.isDestroyed) {
            style = shrinkHelper.style;
            style.width = width  + 'px';
            style.height = height + 'px';
        }

        Ext.TaskQueue.requestRead('refresh', this);
    }
});
