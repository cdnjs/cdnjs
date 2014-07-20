/**
 * The Basic Bar Chart displays a set of random data in a column series.
 */
Ext.define('KitchenSink.view.charts.other.LiveUpdates', {
    extend: 'Ext.Panel',
    xtype: 'live-update-chart',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },

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
                            me.down('cartesian').save({
                                type: 'image/png'
                            });
                        }
                    });

                }
            }]
        }];
        //</example>

        me.items = [{
            xtype: 'cartesian',
            width: '100%',
            height: 400,
            store: this.myDataStore,
            insetPadding: 40,
            sprites: [{
                type  : 'text',
                text  : 'Bar Charts - Basic Bar',
                font  : '22px Helvetica',
                width : 100,
                height: 30,
                x : 40, //the sprite x position
                y : 20  //the sprite y position
            }, {
                type: 'text',
                text: 'Data: Browser Stats 2012 - Internet Explorer',
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
                position: 'bottom',
                fields: ['data1'],
                label: {
                    renderer: function(v) { return v + '%'; } 
                },
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: ['month'],
                grid: true
            }],
            series: [{
                type: 'bar',
                axis: 'bottom',
                highlight: {
                    fillStyle: '#000',
                    lineWidth: 20,
                    strokeStyle: '#fff'
                },
                tooltip: {
                    trackMouse: true,
                    renderer: function(storeItem, item) {
                        this.setHtml(storeItem.get('month') + ': ' + storeItem.get('data1') + '%');
                    }
                },
                style: {
                    opacity: 0.80
                },
                xField: 'month',
                yField: 'data1'
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
