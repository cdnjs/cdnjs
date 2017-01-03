Ext.define('Portal.view.stocks.Stocks', {
    extend: 'Ext.grid.Panel',
    xtype: 'stocks',

    requires: [
        'widget.sparklineline'
    ],

    controller: 'stocks',

    height: 300,

    store: {
        type: 'stocks',
        autoLoad: true
    },

    stripeRows: true,
    columnLines: true,

    // Rapid updates are coalesced and flushed on a timer.
    throttledUpdate: true,

    columns: [{
        text: 'Company',
        flex: 1,
        sortable: true,
        dataIndex: 'name'
    }, {
        text: 'Price',
        width: 75,
        formatter: 'usMoney',
        dataIndex: 'price',
        align: 'right'
    }, {
        text: 'Trend',
        width: 100,
        dataIndex: 'trend',
        xtype: 'widgetcolumn',
        widget: {
            xtype: 'sparklineline',
            tipTpl: 'Price: {y:number("0.00")}'
        }
    }, {
        text: 'Change',
        width: 80,
        producesHTML: true,
        renderer: 'renderChange',
        dataIndex: 'change',
        align: 'right'
    }, {
        text: '%',
        width: 70,
        renderer: 'renderChangePercent',
        updater: 'updateChangePercent',
        dataIndex: 'pctChange',
        align: 'right'
    }, {
        text: 'Last Updated',
        hidden: true,
        width: 175,
        sortable: true,
        formatter: 'date("m/d/Y H:i:s")',
        dataIndex: 'lastChange'
    }]
});
