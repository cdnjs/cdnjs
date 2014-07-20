/**
 * Demonstrates usage of an absolute layout.
 */
Ext.define('KitchenSink.view.layout.Absolute', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Absolute'
    ],
    xtype: 'layout-absolute',
    //<example>
    exampleTitle: 'Absolute Layout',
    //</example>
    layout: 'absolute',
    width: 500,
    height: 400,
    
    defaults: {
        bodyPadding: 15,
        width: 200,
        height: 100,
        frame: true
    },

    items:[
        {
            title: 'Panel 1',
            x: 50,
            y: 50,
            html: 'Positioned at x:50, y:50'
        },
        {
            title: 'Panel 2',
            x: 125,
            y: 125,
            html: 'Positioned at x:125, y:125'
        }
    ]

});