/**
 * Demonstrates usage of a table layout.
 */
Ext.define('KitchenSink.view.layout.Table', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Table'
    ],
    //<example>
    exampleTitle: 'Table Layout',
    //</example>

    xtype: 'layout-table',
    width: 500,
    height: 400,

    layout: {
        type: 'table',
        columns: 3,
        tableAttrs: {
            style: {
                width: '100%'
            }
        }
    },

    autoScroll: true,
    
    defaults: {
        bodyPadding: '15 20',
        border: true
    },
    
    items: [
        {
            html: 'Cell A content',
            rowspan: 2
        },
        {
            html: 'Cell B content',
            colspan: 2
        },
        {
            html: 'Cell C content',
            cellCls: 'highlight'
        },
        {
            html: 'Cell D content'
        }
    ]

});