Ext.define('ChartsKitchenSink.view.charts.donut.Basic', {
    extend: 'Ext.Panel',
    xtype: 'basic-donut',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },

    exampleDescription: [
        'A basic donut chart functions precisely like a pie chart. The only difference is that the center is blank. This is typically done to increase the readability of the data labels that may be around.'
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
            fields: ['os', 'data1' ],
            data: [
                { os: 'Android', data1: 68.3 },
                { os: 'iOS', data1: 17.9 },
                { os: 'Windows Phone', data1: 10.2 },
                { os: 'BlackBerry', data1: 1.7 },
                { os: 'Others', data1: 1.9 }
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
            legend: {
                field: 'os',
                position: 'bottom',
                boxStrokeWidth: 0,
                labelFont: '12px Helvetica'
            },
            items: [{
                type  : 'text',
                text  : 'Donut Charts - Basic',
                font  : '22px Helvetica',
                width : 100,
                height: 30,
                x : 40, //the sprite x position
                y : 12  //the sprite y position
            }, {
                type: 'text',
                text: 'Data: IDC Predictions - 2017',
                font: '10px Helvetica',
                x: 12,
                y: 380
            }, {
                type: 'text',
                text: 'Source: Internet',
                font: '10px Helvetica',
                x: 12,
                y: 390
            }],
            series: [{
                type: 'pie',
                angleField: 'data1',
                donut: 50,
                label: {
                    field: 'os',
                    display: 'outside',
                    calloutLine: true
                },
                showInLegend: true,
                highlight: {
                    fill: '#000',
                    'stroke-width': 1,
                    stroke: '#ccc'
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('os') + ': ' + storeItem.get('data1') + '%');
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
                    { text: 'OS', dataIndex: 'os' },
                    { text: 'Market Share', dataIndex: 'data1', width: 150, renderer: function(v) { return v + '%'; } }
                ]
            },
            store: this.myDataStore,
            width: '100%'
        //</example>
        }];

        this.callParent();
    }
});
