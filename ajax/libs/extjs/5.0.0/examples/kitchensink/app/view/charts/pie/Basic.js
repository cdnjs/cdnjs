/**
 *  A basic pie chart is a circular chart divided into multiple sectors in proportion to
 *  the data they represent. They are widely used and are helpful in quickly identifying
 *  smallest and largest segments of the data.
 *
 *  The example makes use of two interactions: 'itemhighlight' and 'rotate'. To use the
 *  first one, hover over or tap on a pie sector. To use the second one, click or tap and
 *  then drag anywhere on the chart.
 */
Ext.define('KitchenSink.view.charts.pie.Basic', {
    extend: 'Ext.Panel',
    xtype: 'pie-basic',

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

        this.myDataStore = Ext.create('Ext.data.JsonStore', {
            fields: ['os', 'data1' ],
            data: [
                { os: 'Android', data1: 68.3 },
                { os: 'BlackBerry', data1: 1.7 },
                { os: 'iOS', data1: 17.9 },
                { os: 'Windows Phone', data1: 10.2 },
                { os: 'Others', data1: 1.9 }
            ]
        });

        //<example>
        me.tbar = [
            '->',
            {
                text: 'Preview',
                handler: function() {
                    me.down('polar').preview();
                }
            }
        ];
        //</example>

        me.items = [{
            xtype: 'polar',
            width: '100%',
            height: 500,
            store: this.myDataStore,
            insetPadding: 50,
            innerPadding: 20,
            legend: {
                docked: 'bottom'
            },
            interactions: ['rotate', 'itemhighlight'],
            sprites: [{
                type: 'text',
                text: 'Pie Charts - Basic',
                font: '22px Helvetica',
                width: 100,
                height: 30,
                x: 40, // the sprite x position
                y: 20  // the sprite y position
            }, {
                type: 'text',
                text: 'Data: IDC Predictions - 2017',
                font: '10px Helvetica',
                x: 12,
                y: 425
            }, {
                type: 'text',
                text: 'Source: Internet',
                font: '10px Helvetica',
                x: 12,
                y: 435
            }],
            series: [{
                type: 'pie',
                angleField: 'data1',
                label: {
                    field: 'os',
                    display: 'outside',
                    calloutLine: {
                        length: 60,
                        width: 3
                        // specifying 'color' is also possible here
                    }
                },
                highlight: true,
                tooltip: {
                    trackMouse: true,
                    renderer: function(storeItem, item) {
                        this.setHtml(storeItem.get('os') + ': ' + storeItem.get('data1') + '%');
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
