/**
 * This example shows how to create a grid from XML data. The grid is stateful so you can
 * move or hide columns, reload the page, and come back to the grid in the same state you
 * left it in.
 *
 * The cells are selectable due to use of the `enableTextSelection` option.
 */
Ext.define('KitchenSink.view.grid.XmlGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Column',
        'KitchenSink.store.Books'
    ],
    xtype: 'xml-grid',
    store: {
        type: 'books'
    },
    stateful: true,
    collapsible: true,
    multiSelect: true,
    stateId: 'stateXmlGrid',
    height: 350,
    title: 'XML Grid',
    viewConfig: {
        enableTextSelection: true
    },
    //<example>
    otherContent: [{
        type: 'Store',
        path: 'app/store/Books.js'
    },{
        type: 'Model',
        path: 'app/model/grid/Book.js'
    }],
    themes: {
        classic: {
            width: 600,
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85,
            green: 'green',
            red: 'red'
        },
        neptune: {
            width: 650,
            percentChangeColumnWidth: 100,
            lastUpdatedColumnWidth: 115,
            green: '#73b51e',
            red: '#cf4c35'
        }
    },
    //</example>

    initComponent: function () {
        var me = this;

        me.width = this.themeInfo.width;
        me.columns = [
            {text: "Author", flex: 1, dataIndex: 'Author'},
            {text: "Title", width: 180, dataIndex: 'Title'},
            {text: "Manufacturer", width: 115, dataIndex: 'Manufacturer'},
            {text: "Product Group", width: 100, dataIndex: 'ProductGroup'}
        ];

        me.callParent();

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });
    },

    loadStore: function() {
        this.getStore().load();
    }
});