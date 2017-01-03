Ext.define('ChartsKitchenSink.view.charts.pie.Custom', {
    extend: 'Ext.Panel',
    xtype: 'custom-pie',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },

    exampleDescription: [
        'A basic pie chart is a circular chart divided into multiple sectors in proportion to the data they represent. They are widely used and are helpful in quickly identifying smallest and largest segments of the data.'
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
            fields: ['os', 'data1', 'data2' ],
            data: [
                { os: 'Android', data1: 68.3, data2: 300 },
                { os: 'BlackBerry', data1: 1.7, data2: 90 },
                { os: 'iOS', data1: 17.9, data2: 200 },
                { os: 'Others', data1: 1.9, data2: 100 },
                { os: 'Windows Phone', data1: 10.2, data2: 150 }
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
            shadow: true,
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
                text  : 'Pie Charts - Custom Slice Sizing',
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
            series  : [{
                type: 'pie',
                animate: true,
                angleField: 'data1', //bind angle span to visits
                lengthField: 'data2', //bind pie slice length to views
                showInLegend: true,
                highlight: {
                    segment: {
                        margin: 40
                    }
                },
                label: {
                    field: 'os',   //bind label text to name
                    display: 'outside', //rotate labels (also middle, out).
                    calloutLine: true,
                    font: '14px Arial',
                    contrast: true
                },
                style: {
                    'stroke-width': 1,
                    'stroke': '#fff'
                },
                // add renderer
//                renderer: function(sprite, record, attr) {
//                    var value = (record.get('data1') >> 0) % 9,
//                        color = [ "#94ae0a", "#115fa6", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"][value];
//                    return Ext.apply(attr, {
//                        fill : color
//                    });
//                },
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
