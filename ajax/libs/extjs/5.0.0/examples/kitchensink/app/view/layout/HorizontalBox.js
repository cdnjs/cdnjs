/**
 * Demonstrates usage of an hbox layout.
 */
Ext.define('KitchenSink.view.layout.HorizontalBox', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.HBox'
    ],
    xtype: 'layout-horizontal-box',
    //<example>
    exampleTitle: 'Horizontal Box Layout',
    //</example>
    width: 500,
    height: 400,
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    
    bodyPadding: 10,
    
    defaults: {
        frame: true,
        bodyPadding: 10
    },

    items: [
        {
            title: 'Panel 1',
            flex: 1,
            margin: '0 10 0 0',
            html: 'flex : 1'
        },
        {
            title: 'Panel 2',
            width: 100,
            margin: '0 10 0 0',
            html: 'width : 100'
        },
        {
            title: 'Panel 3',
            flex: 2,
            html: 'flex : 2'
        }
    ]

});