Ext.define('FV.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'FV.view.Viewer',
        'FV.view.feed.List',
        'Ext.layout.container.Border'
    ],

    layout: 'border',

    items: [{
        region: 'center',
        xtype: 'viewer'
    }, {
        region: 'west',
        width: Ext.themeName === 'neptune-touch' || Ext.themeName === 'crisp' ? 275 : 225,
        split:true,
        xtype: 'feedlist'
    }]
});