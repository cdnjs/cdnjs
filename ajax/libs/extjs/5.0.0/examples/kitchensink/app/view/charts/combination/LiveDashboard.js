/**
 * The Drilldown Combination Chart displays a set of random data.
 */
Ext.define('KitchenSink.view.charts.combination.LiveDashboard', {
    extend: 'Ext.Panel',
    xtype: 'live-dashboard-chart',

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
            fields: ['x', 'y' ],
            data: [
                { x: 5, y: 20 },
                { x: 480, y: 90 },
                { x: 250, y: 50 },
                { x: 100, y: 33 },
                { x: 330, y: 95 },
                { x: 410, y: 12 },
                { x: 475, y: 44 },
                { x: 25, y: 67 },
                { x: 85, y: 21 },
                { x: 220, y: 88 },
                { x: 320, y: 79 },
                { x: 270, y: 32 }
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
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: [ 'x' ],
                grid: true
            }, {
                type: 'Numeric',
                position: 'left',
                fields: [ 'y' ],
                grid: true
            }],
            sprites: [{
                type: 'text',
                text: 'Combination Charts - Drilldown',
                font: '22px Helvetica',
                width: 100,
                height: 30,
                x: 40, // the sprite x position
                y: 12  // the sprite y position
            }],
            series: [{
                type: 'scatter',
                xField: 'x',
                yField: 'y',
                highlight: {
                    fillStyle: '#000',
                    lineWidth: 20,
                    strokeStyle: '#fff'
                },
                label: {
                    display: 'over',
                    font: '18px',
                    renderer: function(value, label, storeItem, item, i, display, animation, index) {
                        return storeItem.get('x') + ',' + storeItem.get('y');
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
                    { text: 'X-Axis', dataIndex: 'x' },
                    { text: 'Y-Axis', dataIndex: 'y' }
                ]
            },
            store: this.myDataStore,
            width: '100%'
        //</example>
        }];

        this.callParent();
    }
});
