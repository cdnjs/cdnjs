Ext.define('ChartsKitchenSink.view.charts.line.Basic', {
    extend: 'Ext.Panel',
    xtype: 'basic-line',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },

    exampleDescription: [
        'A basic line chart displays information as a series of data points connected through straight lines. It is similar to scatter plot, except that the points are connected. Line charts are often used to visualize trends in data over a period.'
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
            fields: ['month', 'data1' ],
            data: [
                { month: 'Jan', data1: 20 },
                { month: 'Feb', data1: 20 },
                { month: 'Mar', data1: 19 },
                { month: 'Apr', data1: 18 },
                { month: 'May', data1: 18 },
                { month: 'Jun', data1: 17 },
                { month: 'Jul', data1: 16 },
                { month: 'Aug', data1: 16 },
                { month: 'Sep', data1: 16 },
                { month: 'Oct', data1: 16 },
                { month: 'Nov', data1: 15 },
                { month: 'Dec', data1: 15 }
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
            style: {
                //<example>
//                'background': '#fceabb',
//                'background': '-moz-linear-gradient(top, #fceabb 0%, #fccd4d 50%, #f8b500 51%, #fbdf93 100%)',
//                'background': '-webkit-gradient(linear, left top, left bottom, color-stop(0%,#fceabb), color-stop(50%,#fccd4d), color-stop(51%,#f8b500), color-stop(100%,#fbdf93))',
//                'background': '-webkit-linear-gradient(top, #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%)',
//                'background': '-o-linear-gradient(top, #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%)',
//                'background': '-ms-linear-gradient(top, #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%)',
//                'background': 'linear-gradient(to bottom, #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%)',
//                'filter': "progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#fbdf93',GradientType=0 )"
                //</example>
                'background' : '#fff'
            },
            animate: true,
            shadow: false,
            store: this.myDataStore,
            insetPadding: 40,
            items: [{
                type  : 'text',
                text  : 'Line Charts - Basic Line',
                font  : '22px Helvetica',
                width : 100,
                height: 30,
                x : 40, //the sprite x position
                y : 12  //the sprite y position
            }, {
                type: 'text',
                text: 'Data: Browser Stats 2012',
                font: '10px Helvetica',
                x: 12,
                y: 380
            }, {
                type: 'text',
                text: 'Source: http://www.w3schools.com/',
                font: '10px Helvetica',
                x: 12,
                y: 390
            }],
            axes: [{
                type: 'Numeric',
                fields: 'data1',
                position: 'left',
                grid: true,
                minimum: 0,
                label: {
                    renderer: function(v) { return v + '%'; }
                }
            }, {
                type: 'Category',
                fields: 'month',
                position: 'bottom',
                grid: true,
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
            series: [{
                type: 'line',
                axis: 'left',
                xField: 'month',
                yField: 'data1',
                style: {
                    'stroke-width': 4
                },
                markerConfig: {
                    radius: 4
                },
                highlight: {
                    fill: '#000',
                    radius: 5,
                    'stroke-width': 2,
                    stroke: '#fff'
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    showDelay: 0,
                    dismissDelay: 0,
                    hideDelay: 0,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('month') + ': ' + storeItem.get('data1') + '%');
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
                    { text: '2012', dataIndex: 'month' },
                    { text: 'IE', dataIndex: 'data1', renderer: function(v) { return v + '%'; } }
                ]
            },
            store: this.myDataStore,
            width: '100%'
        //</example>
        }];

        this.callParent();
    }
});
