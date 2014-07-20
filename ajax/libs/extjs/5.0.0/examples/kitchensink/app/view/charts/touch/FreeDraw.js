/**
 * This example shows how to draw doodles of different sizes and colors.
 */
Ext.define('KitchenSink.view.charts.touch.FreeDraw', {
    extend: 'Ext.panel.Panel',
    xtype: 'free-paint',

    requires: [
        'Ext.draw.Component',
        'KitchenSink.view.FreeDrawComponent'
    ],

    layout: 'fit',
    width: 650,

    lastEvent: 0,

    tbar: ['->', {
        text: 'Clear',
        handler: function(event, toolEl, panelHeader) {
            // Remove all the sprites and redraw
            var draw = Ext.getCmp('free-paint');
            draw.getSurface().removeAll(true);
            draw.renderFrame();
        }
    }],

    items: [
        {
            xtype: 'free-paint-component',
            id: 'free-paint',
            width: '100%',
            height: 500
        }
    ],

    constructor: function(config) {
        var contentPanel = Ext.getCmp('content-panel');
        this.callParent(arguments);
        contentPanel.setAutoScroll(false);
        contentPanel.setOverflowXY('hidden','hidden');
    },

    destroy: function() {
        var contentPanel = Ext.getCmp('content-panel');
        contentPanel.setAutoScroll(true);
        contentPanel.setOverflowXY('auto','auto');
        this.callParent(arguments);
    }

});
