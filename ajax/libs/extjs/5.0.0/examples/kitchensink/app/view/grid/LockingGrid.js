/**
 * This example shows how to achieve "freeze pane" locking functionality similar to Excel.
 *
 * Columns may be locked or unlocked by dragging them across into the opposite side, or
 * by using the column's header menu.
 *
 * The "Price" column is not lockable, and may not be dragged into the locked side, or
 * locked using the header menu.
 *
 * It is not possible to lock all columns using the user interface. The unlocked side must
 * always contain at least one column.
 *
 * There is also an initially hidden "Tall Header" that shows wrapping header text.'
 */
Ext.define('KitchenSink.view.grid.LockingGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer'
    ],
    xtype: 'locking-grid',
    store: 'Companies',
    columnLines: true,
    height: 350,
    width: 600,
    title: 'Locking Grid',

    //<example>
    otherContent: [{
        type: 'Store',
        path: 'app/store/Companies.js'
    },{
        type: 'Model',
        path: 'app/model/Company.js'
    }],
    themes: {
        classic: {
        },
        neptune: {
        }
    },
    //</example>

    initComponent: function () {
        this.columns = [{
                xtype: 'rownumberer'
            }, {
                text     : 'Company Name',
                locked   : true,
                width    : 230,
                sortable : false,
                dataIndex: 'name'
            }, {
                text     : 'Price',
                lockable: false,
                width    : 80,
                sortable : true,
                formatter: 'usMoney',
                dataIndex: 'price'
            }, {
                text     : 'Tall<br>Header',
                hidden   : true,
                width    : 70,
                sortable : false,
                renderer : function(val) {
                    return Math.round(val * 3.14 * 100) / 10;
                },
                dataIndex: 'change'
            }, {
                text     : 'Change',
                width    : 90,
                sortable : true,
                renderer : function(val) {
                    if (val > 0) {
                        return '<span style="color:green;">' + val + '</span>';
                    } else if (val < 0) {
                        return '<span style="color:red;">' + val + '</span>';
                    }
                    return val;
                },
                dataIndex: 'change'
            }, {
                text     : '% Change',
                width    : 105,
                sortable : true,
                renderer : function(val) {
                    if (val > 0) {
                        return '<span style="color:green;">' + val + '%</span>';
                    } else if (val < 0) {
                        return '<span style="color:red;">' + val + '%</span>';
                    }
                    return val;
                },
                dataIndex: 'pctChange'
            }, {
                text     : 'Last Updated',
                width    : 135,
                sortable : true,
                formatter: 'date("m/d/Y")',
                dataIndex: 'lastChange'
            }];

        this.callParent();
    }
});
