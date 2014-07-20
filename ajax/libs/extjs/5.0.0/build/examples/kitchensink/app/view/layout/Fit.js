/**
 * Demonstrates usage of a fit layout.
 */
Ext.define('KitchenSink.view.layout.Fit', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Fit'
    ],
    //<example>
    exampleTitle: 'Fit Layout',
    //</example>

    xtype: 'layout-fit',
    
    layout: 'fit',
    width: 500,
    height: 400,
    
    bodyPadding: 25,
    
    items: {
        title: 'Inner Panel',
        html: '<p>This panel is fit within its container.</p>',
        bodyPadding: 15,
        ui: Ext.themeName == 'neptune' ? 'light' : 'default',
        border: true
    }

});