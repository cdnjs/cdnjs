Ext.define('ChartsKitchenSink.view.charts.line.Spline', {
    extend: 'Ext.Panel',
    xtype: 'spline-line',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',

    layout: {
        type: 'vbox',
        pack: 'center'
    },

    exampleDescription: [
        'A spline chart is a specialized form of conventional line and area charts. Unlike conventional charts which connect data points with straight lines, a spline draws a fitted curve through the data points. They are used specifically for plotting data that requires the use of curve fittings e.g. impulse-response, product life cycle etc.'
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
            fields: ['theta', 'sin' ],
            data: [
                { theta: 0, sin: 0.00 },
                { theta: 10, sin: 0.17 },
                { theta: 20, sin: 0.34 },
                { theta: 30, sin: 0.50 },
                { theta: 40, sin: 0.64 },
                { theta: 50, sin: 0.77 },
                { theta: 60, sin: 0.87 },
                { theta: 70, sin: 0.94 },
                { theta: 80, sin: 0.98 },
                { theta: 90, sin: 1.00 },
                { theta: 100, sin: 0.98 },
                { theta: 110, sin: 0.94 },
                { theta: 120, sin: 0.87 },
                { theta: 130, sin: 0.77 },
                { theta: 140, sin: 0.64 },
                { theta: 150, sin: 0.50 },
                { theta: 160, sin: 0.34 },
                { theta: 170, sin: 0.17 },
                { theta: 180, sin: 0.00 },
                { theta: 190, sin: -0.17 },
                { theta: 200, sin: -0.34 },
                { theta: 210, sin: -0.50 },
                { theta: 220, sin: -0.64 },
                { theta: 230, sin: -0.77 },
                { theta: 240, sin: -0.87 },
                { theta: 250, sin: -0.94 },
                { theta: 260, sin: -0.98 },
                { theta: 270, sin: -1.00 },
                { theta: 280, sin: -0.98 },
                { theta: 290, sin: -0.94 },
                { theta: 300, sin: -0.87 },
                { theta: 310, sin: -0.77 },
                { theta: 320, sin: -0.64 },
                { theta: 330, sin: -0.50 },
                { theta: 340, sin: -0.34 },
                { theta: 350, sin: -0.17 },
                { theta: 360, sin: 0.00 }
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
            animate: true,
            shadow: false,
            style: 'background: #fff;',
            store: this.myDataStore,
            insetPadding: 40,
            items: [{
                type  : 'text',
                text  : 'Line Charts - Spline',
                font  : '22px Helvetica',
                width : 100,
                height: 30,
                x : 40, //the sprite x position
                y : 12  //the sprite y position
            }],
            axes: [{
                type: 'Numeric',
                position: 'left',
                title: 'Sin (Theta)',
                grid: true,
                fields: 'sin',
                label: {
                    renderer: function(v) {
                        return Ext.util.Format.number(v, '0.00');
                    }
                }
            }, {
                type: 'Numeric',
                position: 'bottom',
                title: 'Theta',
                grid: true,
                fields: 'theta',
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
            series: [{
                type: 'line',
                axis: 'left',
                xField: 'theta',
                yField: 'sin',
                smooth: true,
                highlight: true,
                showMarkers: false
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
                    { text: 'Theta', dataIndex: 'theta' },
                    { text: 'Sin', dataIndex: 'sin' }
                ]
            },
            store: this.myDataStore,
            width: '100%'
        //</example>
        }];

        this.callParent();
    }
});
