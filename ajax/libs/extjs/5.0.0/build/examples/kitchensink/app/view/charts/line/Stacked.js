/**
 * The Basic Column Chart displays a set of random data in a column series. The "Reload Data"
 * button will randomly generate a new set of data in the store.
 */
Ext.define('KitchenSink.view.charts.line.Stacked', {
    extend: 'Ext.Panel',
    xtype: 'stacked-line',
    title: 'TITLE HERE',

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

        var myDataStore = Ext.create('Ext.data.JsonStore', {
            fields: ['month', 'data1' ] 
        });
        //<example>
        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: 'Preview',
                handler: function() {
                    me.down('cartesian').preview();
                }
            }, {
                text: 'Reload Data',
                handler: function() {
                    me.down('cartesian').getStore().loadData(me.generateData());
                }
            }]
        }];
        //</example>

        me.items = [{
            xtype: 'cartesian',
            width: '100%',
            height: 400,
            store: myDataStore,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data1'],
                label: {
                    renderer: function(v) { return v + '%'; } 
                },
                title: 'Number of Hits',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['month'],
                title: 'Month of the Year'
            }],
            series: [{
                type: 'column',
                axis: 'left',
                highlight: true,
                tooltip: {
                    trackMouse: true,
                    renderer: function(storeItem, item) {
                        this.setHtml(storeItem.get('month') + ': ' + storeItem.get('data1') + ' %');
                    }
                },
 //               label: {
 //                   display: 'insideEnd',
 //                   'text-anchor': 'middle',
 //                   field: 'data1',
//                    renderer: function(v) { return v + ' %'; },
 //                   orientation: 'vertical',
//                    color: '#333'
//                },
                xField: 'month',
                yField: 'data1'
            }]
        //<example>
        }, {
            style: 'padding-top: 10px;',
            title: 'Chart Source Data',
            xtype: 'gridpanel',
            columns : [
                { text: 'Month', dataIndex: 'month' },
                { text: 'Percentage', dataIndex: 'data1' }
            ],
            store: myDataStore,
            width: '100%'
        //</example>
        }];

        this.callParent();
        this.down('cartesian').getStore().loadData(this.generateData());
    },

    generateData: function(n, floor) {
        var data = [],
            p = (Math.random() *  11) + 1,
            i;
            
        floor = (!floor && floor !== 0)? 20 : floor;
        
        for (i = 0; i < (n || 12); i++) {
            data.push({
                month: Ext.Date.monthNames[i % 12].substring(0, 3),
                data1: Math.floor(Math.max((Math.random() * 100), floor))
//                data2: Math.floor(Math.max((Math.random() * 100), floor)),
//                data3: Math.floor(Math.max((Math.random() * 100), floor)),
//                data4: Math.floor(Math.max((Math.random() * 100), floor)),
//                data5: Math.floor(Math.max((Math.random() * 100), floor)),
//                data6: Math.floor(Math.max((Math.random() * 100), floor)),
//                data7: Math.floor(Math.max((Math.random() * 100), floor)),
//                data8: Math.floor(Math.max((Math.random() * 100), floor)),
//                data9: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;
    }
});