/**
 * This is an example of using the grid with a RowExpander plugin that adds the ability
 * to have a column in a grid which enables a second row body which expands/contracts.
 *
 * The expand/contract behavior is configurable to react on clicking of the column, double
 * click of the row, and/or hitting enter while a row is selected.
 */
Ext.define('KitchenSink.view.grid.RowExpander', {
    extend: 'Ext.grid.Panel',

    xtype: 'row-expander-grid',
    store: 'Companies',

    columns: [
        { text: "Company", flex: 1, dataIndex: 'name'},
        { text: "Price", formatter: 'usMoney', dataIndex: 'price'},
        { text: "Change", dataIndex: 'change'},
        { text: "% Change", dataIndex: 'pctChange'},
        { text: "Last Updated", formatter: 'date("m/d/Y")', dataIndex: 'lastChange'}
    ],
    width: 600,
    height: 300,

    //<example>
    otherContent: [{
        type: 'Store',
        path: 'app/store/Companies.js'
    },{
        type: 'Model',
        path: 'app/model/Company.js'
    }],
    //</example>

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : new Ext.XTemplate(
            '<p><b>Company:</b> {name}</p>',
            '<p><b>Change:</b> {change:this.formatChange}</p>',
        {
            formatChange: function(v){
                var color = v >= 0 ? 'green' : 'red';
                return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
            }
        })
    }],
    title: 'Expander Rows to show extra data',
    iconCls: 'icon-grid'
});
