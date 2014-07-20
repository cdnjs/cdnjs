/**
 * Demonstrates usage of a column layout.
 */
Ext.define('KitchenSink.view.layout.Column', {
    extend: 'Ext.panel.Panel',
    xtype: 'layout-column',
    requires: [
        'Ext.layout.container.Column'
    ],

    //<example>
    exampleTitle: 'Column Layout',
    //</example>

    width: 500,
    height: 400,
    
    layout: 'column',

    bodyPadding: 5,
    
    defaults: {
        bodyPadding: 15
    },

    items: [
        {
            title: 'Width = 0.3',
            columnWidth: 0.3,
            html: '<p>This is some short content.</p>'
        },
        {
            title: 'Width = 0.7',
            columnWidth: 0.7,
            html: '<p>This is some longer content.</p><p>This is some longer content.</p><p>This is some longer content.</p><p>This is some longer content.</p><p>This is some longer content.</p><p>This is some longer content.</p>'
        },
        {
            title: 'Width = 150px',
            width: 150,
            html: 'Not much here!'
        }
    ]

});