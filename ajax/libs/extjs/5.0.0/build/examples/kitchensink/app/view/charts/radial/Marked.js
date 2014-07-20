/**
 * Marked radial is a multi-series radial chart displaying trends across multiple
 * categories. Markers are placed at each point to clearly depict their position.
 *
 * The example makes use of the 'rotate' interaction. To use it, click or tap and then
 * drag anywhere on the chart.
 */
Ext.define('KitchenSink.view.charts.radial.Marked', {
    extend: 'Ext.Panel',
    xtype: 'radial-marked',

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

        this.myDataStore = Ext.create('Ext.data.JsonStore', {
            fields: ['month', 'data1', 'data2', 'data3', 'data4' ],
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
                    me.down('polar').preview();
                }
            }
        ];
        //</example>

        me.items = [{
            xtype: 'polar',
            width: '100%',
            height: 500,
            legend: {
                docked: 'right'
            },
            store: this.myDataStore,
            insetPadding: 40,
            interactions: ['rotate', 'itemhighlight'],
            sprites: [{
                type: 'text',
                text: 'Radar Charts - Marked',
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
                position: 'radial',
                minimum: 0,
                maximum: 50,
                majorTickSteps: 9
            }, {
                type: 'category',
                position: 'angular',
                grid: true
            }],
            series: [{
                type: 'radar',
                title: 'IE',
                xField: 'month',
                yField: 'data1',
                style: {
                    lineWidth: 2,
                    fillStyle: 'none'
                },
                marker: {
                    radius: 4
                },
                highlight: {
                    radius: 8,
                    fillStyle: '#000',
                    lineWidth: 1,
                    strokeStyle: '#888'
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    renderer: function(storeItem, item) {
                        this.setHtml(storeItem.get('month') + ': ' + storeItem.get('data1') + '%');
                    }
                }
            }, {
                type: 'radar',
                title: 'Firefox',
                xField: 'month',
                yField: 'data2',
                style: {
                    lineWidth: 2,
                    fillStyle: 'none'
                },
                marker: {
                    radius: 4
                },
                highlight: {
                    radius: 5,
                    fillStyle: '#000',
                    lineWidth: 1,
                    strokeStyle: '#888'
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('month') + ': ' + storeItem.get('data2') + '%');
                    }
                }
            }, {
                type: 'radar',
                title: 'Chrome',
                xField: 'month',
                yField: 'data3',
                style: {
                    lineWidth: 2,
                    fillStyle: 'none'
                },
                marker: {
                    radius: 4
                },
                highlight: {
                    radius: 5,
                    fillStyle: '#000',
                    lineWidth: 1,
                    strokeStyle: '#888'
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    renderer: function(storeItem, item) {
                        this.setHtml(storeItem.get('month') + ': ' + storeItem.get('data3') + '%');
                    }
                }
            }, {
                type: 'radar',
                title: 'Safari',
                xField: 'month',
                yField: 'data4',
                style: {
                    strokeStyle: 2,
                    fillStyle: 'none'
                },
                highlight: {
                    radius: 5,
                    fillStyle: '#000',
                    lineWidth: 1,
                    strokeStyle: '#888'
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    renderer: function(storeItem, item) {
                        this.setHtml(storeItem.get('month') + ': ' + storeItem.get('data4') + '%');
                    }
                }
            }]
        //<example>
        }, {
            style: 'padding-top: 10px;',
            xtype: 'gridpanel',
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true,
                    renderer: function(v) { return v + '%'; }
                },
                items: [
                    { text: '2012', dataIndex: 'month', renderer: function(v) { return v; } },
                    { text: 'IE', dataIndex: 'data1' },
                    { text: 'Firefox', dataIndex: 'data2' },
                    { text: 'Chrome', dataIndex: 'data3' },
                    { text: 'Safari', dataIndex: 'data4' }
                ]
            },
            store: this.myDataStore,
            width: '100%'
        //</example>
        }];

        this.callParent();
    }
});
