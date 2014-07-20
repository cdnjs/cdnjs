Ext.define('FV.view.feed.Show', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.feedshow',

    requires: [
        'FV.view.article.Grid',
        'FV.view.article.Preview'
    ],

    closable: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'articlegrid',
                flex: 1
            },{
                xtype: 'articlepreview',
                cls: 'articlepreview',
                height: 300
            }]
        });

        this.callParent(arguments);
    }
});
