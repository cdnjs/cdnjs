Ext.define('ChartsKitchenSink.view.charts.line.MarkedSpline', {
    extend: 'Ext.Panel',
    xtype: 'marked-spline-line',

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',

    layout: {
        type: 'vbox',
        pack: 'center'
    },

    exampleDescription: [
        'Marked splines are multi-series splines displaying smooth curves across multiple categories. Markers are placed at each connected point to clearly depict their position. '
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
            fields: ['theta', 'sin', 'cos', 'tan' ],
            data: [
                { theta: 0, sin: 0.00, cos: 1.00, tan: 0.00 },
                { theta: 10, sin: 0.17, cos: 0.98, tan: 0.18 },
                { theta: 20, sin: 0.34, cos: 0.94, tan: 0.36 },
                { theta: 30, sin: 0.50, cos: 0.87, tan: 0.58 },
                { theta: 40, sin: 0.64, cos: 0.77, tan: 0.84 },
                { theta: 50, sin: 0.77, cos: 0.64, tan: 1.19 },
                { theta: 60, sin: 0.87, cos: 0.50, tan: 1.73 },
                { theta: 70, sin: 0.94, cos: 0.34, tan: 2.75 },
                { theta: 80, sin: 0.98, cos: 0.17, tan: 5.67 },
                { theta: 90, sin: 1.00, cos: 0.00, tan: false },
                { theta: 100, sin: 0.98, cos: -0.17, tan: -5.67 },
                { theta: 110, sin: 0.94, cos: -0.34, tan: -2.75 },
                { theta: 120, sin: 0.87, cos: -0.50, tan: -1.73 },
                { theta: 130, sin: 0.77, cos: -0.64, tan: -1.19 },
                { theta: 140, sin: 0.64, cos: -0.77, tan: -0.84 },
                { theta: 150, sin: 0.50, cos: -0.87, tan: -0.58 },
                { theta: 160, sin: 0.34, cos: -0.94, tan: -0.36 },
                { theta: 170, sin: 0.17, cos: -0.98, tan: -0.18 },
                { theta: 180, sin: 0.00, cos: -1.00, tan: 0.00 },
                { theta: 190, sin: -0.17, cos: -0.98, tan: 0.18 },
                { theta: 200, sin: -0.34, cos: -0.94, tan: 0.36 },
                { theta: 210, sin: -0.50, cos: -0.87, tan: 0.58 },
                { theta: 220, sin: -0.64, cos: -0.77, tan: 0.84 },
                { theta: 230, sin: -0.77, cos: -0.64, tan: 1.19 },
                { theta: 240, sin: -0.87, cos: -0.50, tan: 1.73 },
                { theta: 250, sin: -0.94, cos: -0.34, tan: 2.75 },
                { theta: 260, sin: -0.98, cos: -0.17, tan: 5.67 },
                { theta: 270, sin: -1.00, cos: 0.00, tan: false },
                { theta: 280, sin: -0.98, cos: 0.17, tan: -5.67 },
                { theta: 290, sin: -0.94, cos: 0.34, tan: -2.75 },
                { theta: 300, sin: -0.87, cos: 0.50, tan: -1.73 },
                { theta: 310, sin: -0.77, cos: 0.64, tan: -1.19 },
                { theta: 320, sin: -0.64, cos: 0.77, tan: -0.84 },
                { theta: 330, sin: -0.50, cos: 0.87, tan: -0.58 },
                { theta: 340, sin: -0.34, cos: 0.94, tan: -0.36 },
                { theta: 350, sin: -0.17, cos: 0.98, tan: -0.18 },
                { theta: 360, sin: 0.00, cos: 1.00, tan: 0.00 }
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
            animate: true,
            shadow: false,
            padding: '10 0 0 0',
            style: 'background: #fff;',
            store: this.myDataStore,
            insetPadding: 40,
            legend: {
                position: 'right',
                boxStrokeWidth: 0,
                labelFont: '12px Helvetica'
            },
            items: [{
                type  : 'text',
                text  : 'Line Charts - Marked Spline',
                font  : '22px Helvetica',
                width : 100,
                height: 30,
                x : 40, //the sprite x position
                y : 12  //the sprite y position
            }],
            axes: [{
                type: 'Numeric',
                fields: ['sin', 'cos', 'tan' ],
                position: 'left',
                grid: true,
                label: {
                    renderer: function(v) {
                        return Ext.util.Format.number(v, '0.00');
                    }
                }
            }, {
                type: 'Category',
                title: 'Theta',
                fields: 'theta',
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
                xField: 'theta',
                yField: 'sin',
                smooth: true,
                style: {
                    'stroke-width': 4
                },
                markerConfig: {
                    radius: 4
                },
                highlight: {
                    shadow: false,
                    fill: '#000',
                    radius: 5,
                    'stroke-width': 2,
                    stroke: '#fff'
                }
            }, {
                type: 'line',
                axis: 'left',
                xField: 'theta',
                yField: 'cos',
                smooth: true,
                style: {
                    'stroke-width': 4
                },
                markerConfig: {
                    radius: 4
                },
                highlight: {
                    shadow: false,
                    fill: '#000',
                    radius: 5,
                    'stroke-width': 2,
                    stroke: '#fff'
                }
            }, {
                type: 'line',
                axis: 'left',
                xField: 'theta',
                yField: 'tan',
                smooth: true,
                style: {
                    'stroke-width': 4
                },
                markerConfig: {
                    radius: 4
                },
                highlight: {
                    shadow: false,
                    fill: '#000',
                    radius: 5,
                    'stroke-width': 2,
                    stroke: '#fff'
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
                    { text: 'Theta', dataIndex: 'theta' },
                    { text: 'Sin', dataIndex: 'sin' },
                    { text: 'Cos', dataIndex: 'cos' },
                    { text: 'Tan', dataIndex: 'tan' }
                ]
            },
            store: this.myDataStore,
            width: '100%'
        //</example>
        }];

        this.callParent();
    }
});
