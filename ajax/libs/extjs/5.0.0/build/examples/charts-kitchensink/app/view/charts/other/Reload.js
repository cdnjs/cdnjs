Ext.define('ChartsKitchenSink.view.charts.other.Reload', {
    extend: 'Ext.Panel',
    xtype: 'reload-chart',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },

    exampleDescription: [
        'An example depicting how the data set can be reloaded for any given chart.'
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

        function generateData(n, floor) {
            var data = [],
                p = (Math.random() *  11) + 1,
                i;
            
            floor = (!floor && floor !== 0)? 20 : floor;
        
            for (i = 0; i < (n || 12); i++) {
                data.push({
                    name: Ext.Date.monthNames[i % 12],
                    data1: Math.floor(Math.max((Math.random() * 100), floor)),
                    data2: Math.floor(Math.max((Math.random() * 100), floor)),
                    data3: Math.floor(Math.max((Math.random() * 100), floor)),
                    data4: Math.floor(Math.max((Math.random() * 100), floor)),
                    data5: Math.floor(Math.max((Math.random() * 100), floor)),
                    data6: Math.floor(Math.max((Math.random() * 100), floor)),
                    data7: Math.floor(Math.max((Math.random() * 100), floor)),
                    data8: Math.floor(Math.max((Math.random() * 100), floor)),
                    data9: Math.floor(Math.max((Math.random() * 100), floor))
                });
            }
            return data;
        }

        this.myDataStore = Ext.create('Ext.data.JsonStore', {
            fields: ['name', 'data1' ],
            data: generateData()
        });

        //<example>
        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
            {
                text: 'Reload Data',
                handler: function() {
                    this.up('panel').down('chart').getStore().loadData(generateData());
                }
            },
            {
                text: 'Save Chart',
                handler: function() {
                    Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
                        if(choice == 'yes'){
                            me.down('chart').save({
                                type: 'image/png'
                            });
                        }
                    });

                }
            }]
        }];
        //</example>

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
                text  : 'Column Charts - Random Data w/ Reload',
                font  : '22px Helvetica',
                width : 100,
                height: 30,
                x : 40, //the sprite x position
                y : 12  //the sprite y position
            }],
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: 'data1',
                label: {
                    renderer: function(v) { return v + '%'; }
                },
                grid: true,
                minimum: 0,
                maximum: 100
            }, {
                type: 'Category',
                position: 'bottom',
                fields: 'name',
                grid: true,
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
            series: [{
                type: 'column',
                xField: 'name',
                yField: 'data1',
                axis: 'left',
                style: {
                    opacity: 0.80
                },
                highlight: {
                    fill: '#000',
                    'stroke-width': 2,
                    stroke: '#fff'
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + '%');
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
                    menuDisabled: true
                },
                items: [
                    { text: 'Month', dataIndex: 'name' },
                    { text: 'Value', dataIndex: 'data1', renderer: function(v) { return v + '%'; } }
                ]
            },
            store: this.myDataStore,
            width: '100%'
        //</example>
        }];

        this.callParent();
    }
});
