/**
 * Demonstrates usage of a border layout.
 */
Ext.define('KitchenSink.view.layout.Border', {
    extend: 'Ext.panel.Panel',
    xtype: 'layout-border',
    requires: [
        'Ext.layout.container.Border'
    ],
    //<example>
    exampleTitle: 'Border Layout',
    //</example>
    layout: 'border',
    width: 500,
    height: 400,

    bodyBorder: false,
    
    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 10
    },

    items: [
        {
            title: 'Footer',
            region: 'south',
            height: 100,
            minHeight: 75,
            maxHeight: 150,
            html: '<p>Footer content</p>'
        },
        {
            title: 'Navigation',
            region:'west',
            floatable: false,
            margin: '5 0 0 0',
            width: 125,
            minWidth: 100,
            maxWidth: 250,
            html: '<p>Secondary content like navigation links could go here</p>'
        },
        {
            title: 'Main Content',
            collapsible: false,
            region: 'center',
            margin: '5 0 0 0',
            html: '<h2>Main Page</h2><p>This is where the main content would go</p>'
        }
    ]

});