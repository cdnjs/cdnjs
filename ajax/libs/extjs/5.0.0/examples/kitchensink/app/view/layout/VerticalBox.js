/**
 * Demonstrates usage of an vbox layout.
 */
Ext.define('KitchenSink.view.layout.VerticalBox', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.VBox'
    ],
    xtype: 'layout-vertical-box',
    //<example>
    exampleTitle: 'Vertical Box Layout',
    //</example>
    width: 500,
    height: 400,
    
    layout: {
        type: 'vbox',
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
            margin: '0 0 10 0',
            html: 'flex : 1'
        },
        {
            title: 'Panel 2',
            height: 100,
            margin: '0 0 10 0',
            html: 'height: 100'
        },
        {
            title: 'Panel 3',
            flex: 2,
            html: 'flex : 2'
        }
    ]

});