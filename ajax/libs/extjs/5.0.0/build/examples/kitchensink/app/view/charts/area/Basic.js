/**
 * A basic area chart is similar to the line chart, except the area between axis and line
 * is filled with colors to emphasize quantity.
 */
Ext.define('KitchenSink.view.charts.area.Basic', {
    extend: 'Ext.Panel',
    xtype: 'area-basic',

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
            store: this.myDataStore,
            insetPadding: 40,
            sprites: [{
                type: 'text',
                text: 'Area Charts - Basic Area',
                font: '22px Helvetica',
                width: 100,
                height: 30,
                x: 40, // the sprite x position
                y: 20  // the sprite y position
            }, {
                type: 'text',
                text: 'Data: Browser Stats 2012 - Internet Explorer',
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
                position: 'left',
                grid: true,
                fields: ['data1'],
                renderer: function (v) { return v + '%'; },
                minimum: 0,
                maximum: 24
            }, {
                type: 'category',
                position: 'bottom',
                grid: true,
                fields: ['month'],
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
            series: [{
                type: 'area',
                axis: 'left',
                xField: 'month',
                yField: 'data1',
                style: {
                    opacity: 0.80
                },
                highlight: {
                    fillStyle: '#000',
                    lineWidth: 2,
                    strokeStyle: '#fff'
                },
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                    renderer: function(storeItem, item) {
                        this.setHtml(storeItem.get('month') + ': ' + storeItem.get('data1') + ' %');
                    }
                }
            }]
        //<example>
        }, {
            style: 'margin-top: 10px;',
            xtype: 'gridpanel',
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true
                },
                items: [
                    { text: 'Month', dataIndex: 'month' },
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
