Ext.Loader.setPath('Ext.ux', '../ux');
Ext.require('Ext.ux.CellDragDrop');
Ext.onReady(function () {
    var myData = [
        ['3m Co', '1/1 12:00am', 71.72, 'Up', 0.02, 0.03, '9/1 12:00am'],
        ['Alcoa Inc', '1/1 12:00am', 29.01, 'Up', 0.42, 1.47, '9/1 12:00am'],
        ['Altria Group Inc', '1/1 12:00am', 83.81, 'Up', 0.28, 0.34, '9/1 12:00am'],
        ['American Express Company', '1/1 12:00am', 52.55, 'Up', 0.01, 0.02, '9/1 12:00am'],
        ['American International Group, Inc.', '1/1 12:00am', 64.13, 'Up', 0.31, 0.49, '9/1 12:00am'],
        ['AT&T Inc.', '1/1 12:00am', 31.61, 'Down', -0.48, -1.54, '9/1 12:00am'],
        ['Boeing Co.', '1/1 12:00am', 75.43, 'Up', 0.53, 0.71, '9/1 12:00am'],
        ['Caterpillar Inc.', '1/1 12:00am', 67.27, 'Up', 0.92, 1.39, '9/1 12:00am'],
        ['Citigroup, Inc.', '1/1 12:00am', 49.37, 'Up', 0.02, 0.04, '9/1 12:00am'],
        ['E.I. du Pont de Nemours and Company', '1/1 12:00am', 40.48, 'Up', 0.51, 1.28, '9/1 12:00am'],
        ['Exxon Mobil Corp', '1/1 12:00am', 68.1, 'Down', -0.43, -0.64, '9/1 12:00am'],
        ['General Electric Company', '1/1 12:00am', 34.14, 'Down', -0.08, -0.23, '9/1 12:00am'],
        ['General Motors Corporation', '1/1 12:00am', 30.27, 'Up', 1.09, 3.74, '9/1 12:00am'],
        ['Hewlett-Packard Co.', '1/1 12:00am', 36.53, 'Down', -0.03, -0.08, '9/1 12:00am'],
        ['Honeywell Intl Inc', '1/1 12:00am', 38.77, 'Up', 0.05, 0.13, '9/1 12:00am'],
        ['Intel Corporation', '1/1 12:00am', 19.88, 'Up', 0.31, 1.58, '9/1 12:00am'],
        ['International Business Machines', '1/1 12:00am', 81.41,'Up', 0.44, 0.54, '9/1 12:00am'],
        ['Johnson & Johnson', '1/1 12:00am', 64.72, 'Up', 0.06, 0.09, '9/1 12:00am'],
        ['JP Morgan & Chase & Co', '1/1 12:00am', 45.73, 'Up', 0.07, 0.15, '9/1 12:00am'],
        ['McDonald\'s Corporation', '1/1 12:00am', 36.76, 'Up', 0.86, 2.40, '9/1 12:00am'],
        ['Merck & Co., Inc.', '1/1 12:00am', 40.96, 'Up', 0.41, 1.01, '9/1 12:00am'],
        ['Microsoft Corporation', '1/1 12:00am', 25.84, 'Up', 0.14, 0.54, '9/1 12:00am'],
        ['Pfizer Inc', '1/1 12:00am', 27.96, 'Up', 0.4, 1.45, '9/1 12:00am'],
        ['The Coca-Cola Company', '1/1 12:00am', 45.07, 'Up', 0.26, 0.58, '9/1 12:00am'],
        ['The Home Depot, Inc.', '1/1 12:00am', 34.64, 'Up', 0.35, 1.02, '9/1 12:00am'],
        ['The Procter & Gamble Company', '1/1 12:00am', 61.91, 'Up', 0.01, 0.02, '9/1 12:00am'],
        ['United Technologies Corporation', '1/1 12:00am', 63.26, 'Up', 0.55, 0.88, '9/1 12:00am'],
        ['Verizon Communications', '1/1 12:00am', 35.57, 'Up', 0.39, 1.11, '9/1 12:00am'],
        ['Wal-Mart Stores, Inc.', '1/1 12:00am', 45.45, 'Up', 0.73, 1.63, '9/1 12:00am']
    ];

    var store = Ext.create('Ext.data.ArrayStore', {
        fields: [{
            name: 'company'
        }, {
            name: 'firstChange',
            type: 'date',
            dateFormat: 'n/j h:ia'
        }, {
            name: 'price',
            type: 'float'
        }, {
            name: 'stock'
        }, {
            name: 'change',
            type: 'float'
        }, {
            name: 'pctChange',
            type: 'float'
        }, {
            name: 'lastChange',
            type: 'date',
            dateFormat: 'n/j h:ia'
        }],
        data: myData
    });

    Ext.create('Ext.grid.Panel', {
        frame: true,
        title: 'Drag cell data test',
        store: store,
        columns: [{
            id: 'company',
            header: "Company",
            flex:1,
            sortable: true,
            dataIndex: 'company'
        }, {
            xtype: 'datecolumn',
            header: "First Updated",
            width: 128,
            sortable: true,
            dataIndex: 'firstChange'
        }, {
            header: "Price",
            width: 75,
            sortable: true,
            dataIndex: 'price'
        }, {
            header: "Stock",
            width: 75,
            sortable: true,
            dataIndex: 'stock'
        }, {
            header: "Change",
            width: 85,
            sortable: true,
            dataIndex: 'change'
        }, {
            header: "% Change",
            width: 106,
            sortable: true,
            dataIndex: 'pctChange'
        }, {
            xtype: 'datecolumn',
            header: "Last Updated",
            width: 130,
            sortable: true,
            dataIndex: 'lastChange'
        }],
        viewConfig: {
            plugins: {
                ptype: 'celldragdrop',
                // remove text from source cell and replace with value of emptyText
                applyEmptyText: true,
                dropBackgroundColor: Ext.themeName === 'neptune' ? '#a4ce6c' : 'green',
                noDropBackgroundColor: Ext.themeName === 'neptune' ? '#d86f5d' : 'red',
                //emptyText: Ext.String.htmlEncode('<<foo>>'),

                // will only allow drops of the same type
                enforceType: true
            }
        },
        height: 400,
        width: 880,
        renderTo: Ext.getBody()
    });
});
