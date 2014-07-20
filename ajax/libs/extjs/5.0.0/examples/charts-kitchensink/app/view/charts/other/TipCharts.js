Ext.define('ChartsKitchenSink.view.charts.other.TipCharts', {
    extend: 'Ext.Panel',
    xtype: 'tip-chart',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },

    exampleDescription: [
        'An example showing a Pie Chart and a Grid as elements inside a tooltip.'
    ],

    themes: {
        classic: {
            percentChangeColumn: {
                width: 75
            }
        },
        neptune: {
            percentChangeColumn: {
                width: 100
            }
        }
    },
    // </example>


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
        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
            {
                text: 'Save Chart',
                handler: function() {
                    Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
                        if(choice === 'yes'){
                            me.down('chart').save({
                                type: 'image/png'
                            });
                        }
                    });

                }
            }]
        }];
        //</example>

        me.tipStore = Ext.create('Ext.data.JsonStore', {
            fields: ['browser', 'data' ],
            data: [
                { browser: 'IE', data: 0 },
                { browser: 'Firefox', data: 0 },
                { browser: 'Chrome', data: 0 }, 
                { browser: 'Safari', data: 0 }
            ]
        });

        me.smartTip = Ext.create('Ext.tip.ToolTip', {
            trackMouse: true,
            width: 400,

            dismissDelay: 0,
            hideDelay: 10000,
            layout: 'fit',
            items: [{
                xtype: 'panel',
                layout: 'hbox',                
                title: 'Detailed Tip',
                items: [{
                    flex: 1,
                    xtype: 'chart',
                    width: 130,
                    height: 130,
                    animate: false,
                    store: me.tipStore,
                    insetPadding: 10,
                    shadow: false,
                    series: [{
                        type: 'pie',
                        highlightCfg: {
                            fill: '#000',
                            'stroke-width': 20,
                            stroke: '#fff'
                        },
                        angleField:  'data',
                        showInLegend: false,
                        label: {
                            field: 'browser',
                            display: 'rotate',
                            contrast: true,
                            font: '9px Arial'
                        }
                    }]
                }, {
                    xtype: 'grid',
                    store: me.tipStore,
                    scroll: false,
                    flex: 1,
                    columns: [
                        { text: 'Browser', dataIndex: 'browser' },
                        { text: 'Data', dataIndex: 'data' }
                    ]
                }]
            }],
            renderer: function(storeItem, item) {
                var pieChart = this.down('chart');

                this.down('panel').setTitle('Detailed View for ' + storeItem.get('month'));
                me.tipStore.removeAll();
                me.tipStore.loadData([
                    { browser: 'IE', data: storeItem.get('data1') },
                    { browser: 'Firefox', data: storeItem.get('data2') },
                    { browser: 'Chrome', data: storeItem.get('data3') },
                    { browser: 'Safari', data: storeItem.get('data4') }
                ]);
            }
        });

        me.items = [{
            xtype: 'chart',
            width: '100%',
            height: 410,
            padding: '10 0 0 0',
            style: 'background: #fff',
            animate: true,
            shadow: false,
            store: this.myDataStore,
            insetPadding: 40,
            items: [{
                type  : 'text',
                text  : 'Chart with Chart and grid in Tips',
                font  : '22px Helvetica',
                width : 100,
                height: 30,
                x : 40, //the sprite x position
                y : 12  //the sprite y position
            }],
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: [ 'data1', 'data2', 'data3', 'data4' ],
                grid: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: 'month',
                grid: true
            }],
//<example>
            seriesDefaults: {
                style:  {
                    'stroke-width': 2
                },
                markerConfig: {
                    radius: 3
                },
                smooth: true
            },
//</example>
            series: [{
                type: 'line',
                xField: 'month',
                yField:  'data1',
                axis: 'left',
                smooth: true,
                style: {
                    'stroke-width': 2
                },
                markerConfig: {
                    radius: 3
                },
                highlight: {
                    fill: '#000',
                    'stroke-width': 2,
                    stroke: '#fff'
                },
                tips: me.smartTip
            }, {
                type: 'line',
                axis: 'left',
                xField: 'month',
                yField:  'data2',
                smooth: true,
                style: {
                    'stroke-width': 2
                },
                markerConfig: {
                    radius: 3
                },
                highlight: {
                    fill: '#000',
                    'stroke-width': 2,
                    stroke: '#fff'
                },
                tips: me.smartTip
            }, {
                type: 'line',
                xField: 'month',
                yField:  'data3',
                axis: 'left',
                smooth: true,
                style: {
                    'stroke-width': 2
                },
                markerConfig: {
                    radius: 3
                },
                highlight: {
                    fill: '#000',
                    'stroke-width': 2,
                    stroke: '#fff'
                },
                tips: me.smartTip
            }, {
                type: 'line',
                axis: 'left',
                smooth: true,
                xField: 'month',
                yField:  'data4',
                style: {
                    'stroke-width': 2
                },
                markerConfig: {
                    radius: 3
                },
                highlight: {
                    fill: '#000',
                    'stroke-width': 2,
                    stroke: '#fff'
                },
                tips: me.smartTip
            }]
        //<example>
        }, {
            style: 'padding-top: 10px;',
            xtype: 'gridpanel',
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true
                },
                items: [
                    { text: '2012', dataIndex: 'month' },
                    { text: 'IE', dataIndex: 'data1', renderer: function(v) { return v + '%'; } },
                    { text: 'Chrome', dataIndex: 'data2', renderer: function(v) { return v + '%'; } },
                    { text: 'Firefox', dataIndex: 'data3', renderer: function(v) { return v + '%'; } },
                    { text: 'Safari', dataIndex: 'data4', renderer: function(v) { return v + '%'; } }                   
                ]
            },
            store: this.myDataStore,
            width: '100%'
        //</example>
        }];

        this.callParent();
    }
});
