Ext.define('ChartsKitchenSink.view.charts.pie.Exploded', {
    extend: 'Ext.Panel',
    xtype: 'exploded-pie',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },

    exampleDescription: [
        '<p>The <b>Exploded Pie Chart</b> displays a set of random data in a column series.'
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
            height: 400,
            style: 'background: #fff',
            animate: true,
            store: this.myDataStore,
            insetPadding: 40,
            legend: {
                field: 'os',
                position: 'right',
                boxStrokeWidth: 0,
                labelFont: '12px Helvetica'
            },
            items: [{
                type  : 'text',
                text  : 'Pie Charts - Exploded',
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
                label: {
                    field: 'os',
                    display: 'outside',
                    calloutLine: true
                },
                style: 'padding: 10px;',
                showInLegend: true,
                highlight: true,
                highlightCfg: {
                    fill: '#000',
                    'stroke-width': 20,
                    stroke: '#fff'
                },
                tips: {
                    trackMouse: true,
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
