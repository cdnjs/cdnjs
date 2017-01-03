/**
 * 100% stacked bars are multi-series bar charts where categories are stacked (percentage
 * values) next to each other, with an additional category 'Others' that is used to sum up
 * the various categories for each series to a perfect 100%.
 */
Ext.define('KitchenSink.view.charts.bar.Stacked100', {
    extend: 'Ext.Panel',
    xtype: 'bar-stacked-100',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',

    layout: {
        type: 'vbox',
        pack: 'center'
    },
    // </example>

    width: 650,

    initComponent: function() {
        var me = this;

        me.myDataStore = Ext.create('Ext.data.JsonStore', {
            fields: ['month', 'data1', 'data2', 'data3', 'data4',
                { name: 'other', convert: function (value, record) {
                    var total = 0;
                    Ext.Object.each(record.data, function (key, value) {
                        total += Ext.isNumber(value) ? value : 0;
                    });
                    return Math.max(0, 100 - total);
                } }
            ],
            data: [
                { month: 'Jan', data1: 20, data2: 37, data3: 35, data4: 4 },
                { month: 'Feb', data1: 20, data2: 37, data3: 36, data4: 5 },
                { month: 'Mar', data1: 19, data2: 36, data3: 37, data4: 4 },
                { month: 'Apr', data1: 18, data2: 36, data3: 38, data4: 5 },
                { month: 'May', data1: 18, data2: 35, data3: 39, data4: 4 },
                { month: 'Jun', data1: 17, data2: 34, data3: 42, data4: 4 },
                { month: 'Jul', data1: 16, data2: 34, data3: 43, data4: 4 },
                { month: 'Aug', data1: 16, data2: 33, data3: 44, data4: 4 },
                { month: 'Sep', data1: 16, data2: 32, data3: 44, data4: 4 },
                { month: 'Oct', data1: 16, data2: 32, data3: 45, data4: 4 },
                { month: 'Nov', data1: 15, data2: 31, data3: 46, data4: 4 },
                { month: 'Dec', data1: 15, data2: 31, data3: 47, data4: 4 }
            ]
        });
        //<example>
        me.tbar = [
            '->',
            {
                text: 'Preview',
                handler: function() {
                    me.down('cartesian').preview();
                }
            }
        ];
        //</example>

        me.items = [{
            xtype: 'cartesian',
            width: '100%',
            height: 500,
            legend: {
                docked: 'right'
            },
            interactions: 'itemhighlight',
            store: this.myDataStore,
            insetPadding: 40,
            flipXY: true,
            sprites: [{
                type: 'text',
                text: 'Bar Charts - 100% Stacked Bars',
                font: '22px Helvetica',
                width: 100,
                height: 30,
                x: 40, // the sprite x position
                y: 20  // the sprite y position
            }, {
                type: 'text',
                text: 'Data: Browser Stats 2012',
                font: '10px Helvetica',
                x: 12,
                y: 480
            }, {
                type: 'text',
                text: 'Source: http://www.w3schools.com/',
                font: '10px Helvetica',
                x: 12,
                y: 490
            }],
            axes: [{
                type: 'numeric',
                fields: 'data1',
                position: 'bottom',
                grid: true,
                minimum: 0,
                maximum: 100,
                majorTickSteps: 10,
                renderer: function (v) { return v + '%'; }
            }, {
                type: 'category',
                fields: 'month',
                position: 'left',
                grid: true
            }],
            series: [{
                type: 'bar',
                title: [ 'IE', 'Firefox', 'Chrome', 'Safari', 'Others' ],
                xField: 'month',
                yField: [ 'data1', 'data2', 'data3', 'data4', 'other' ],
                axis: 'bottom',
                stacked: true,
                style: {
                    opacity: 0.80
                },
                highlight: {
                    fillStyle: 'yellow'
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    renderer: function (storeItem, item) {
                        var browser = item.series.getTitle()[Ext.Array.indexOf(item.series.getYField(), item.field)];
                        this.setHtml(browser + ' for ' + storeItem.get('month') + ': ' + storeItem.get(item.field) + '%');
                    }
                }
            }]
        //<example>
        }, {
            style: 'margin-top: 10px;',
            xtype: 'gridpanel',
            columns: {
                defaults: {
                    sortable: false,
                    menuDisabled: true,
                    renderer: function (v) { return v + '%'; }
                },
                items: [
                    { text: 'Month', dataIndex: 'month', renderer: function (v) { return v; } },
                    { text: 'IE', dataIndex: 'data1' },
                    { text: 'Firefox', dataIndex: 'data2' },
                    { text: 'Chrome', dataIndex: 'data3' },
                    { text: 'Safari', dataIndex: 'data4' },
                    { text: 'Other', dataIndex: 'other' }
                ]
            },
            store: this.myDataStore,
            width: '100%'
        //</example>
        }];

        this.callParent();
    }
});
