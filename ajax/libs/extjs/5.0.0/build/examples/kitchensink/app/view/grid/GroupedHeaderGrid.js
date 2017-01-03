/**
 * This example shows how to create a grid with column headers which are nested within
 * category headers.
 *
 * Category headers do not reference Model fields via a `dataIndex`, rather they contain
 * child header definitions (which may themselves either contain a `dataIndex` or more
 * levels of headers).
 */
Ext.define('KitchenSink.view.grid.GroupedHeaderGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'grouped-header-grid',
    store: 'Companies',
    columnLines: true,
    height: 350,
    title: 'Grouped Header Grid',
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
            width: 600,
            changeColumnWidth: 80,
            lastUpdatedColumnWidth: 85,
            percentChangeColumnWidth: 75
        },
        neptune: {
            width: 675,
            changeColumnWidth: 80,
            lastUpdatedColumnWidth: 115,
            percentChangeColumnWidth: 100
        },
        'neptune-touch': {
            width: 720,
            changeColumnWidth: 90,
            lastUpdatedColumnWidth: 125,
            percentChangeColumnWidth: 115
        }
    },
    //</example>

    initComponent: function () {
        this.width = this.themeInfo.width;
        this.columns = [{
                text     : 'Company',
                flex     : 1,
                sortable : true,
                dataIndex: 'name'
            }, {
                text: 'Stock Price',
                columns: [{
                    text     : 'Price',
                    width    : 75,
                    sortable : true,
                    formatter: 'usMoney',
                    dataIndex: 'price'
                }, {
                    text     : 'Change',
                    width    : this.themeInfo.changeColumnWidth,
                    sortable : true,
                    renderer :  function(val) {
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
                    width    : this.themeInfo.percentChangeColumnWidth,
                    sortable : true,
                    renderer : function(val) {
                        if (val > 0) {
                            return '<span style="color:green;">' + val + '</span>';
                        } else if (val < 0) {
                            return '<span style="color:red;">' + val + '</span>';
                        }
                        return val;
                    },
                    dataIndex: 'pctChange'
                }]
            }, {
                text     : 'Last Updated',
                width    : this.themeInfo.lastUpdatedColumnWidth,
                sortable : true,
                formatter: 'date("m/d/Y")',
                dataIndex: 'lastChange'
            }];

        //Sorting store
        Ext.getStore('Companies').sort({property:'name', direction:'ASC'});

        this.callParent();
    }
});
