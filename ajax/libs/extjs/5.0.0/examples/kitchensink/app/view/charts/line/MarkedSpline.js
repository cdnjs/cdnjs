/**
 * Marked splines are multi-series splines displaying smooth curves across multiple
 * categories. Markers are placed at each connected point to clearly depict their position.
 */
Ext.define('KitchenSink.view.charts.line.MarkedSpline', {
    extend: 'Ext.Panel',
    xtype: 'line-marked-spline',

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
            insetPadding: {
                top: 40,
                right: 40,
                bottom: 20,
                left: 20
            },
            legend: {
                docked: 'right'
            },
            sprites: [{
                type: 'text',
                text: 'Line Charts - Marked Spline',
                font: '22px Helvetica',
                width: 100,
                height: 30,
                x: 40, // the sprite x position
                y: 20  // the sprite y position
            }],
            axes: [{
                type: 'numeric',
                fields: ['sin', 'cos', 'tan' ],
                position: 'left',
                grid: true,
                renderer: function(v) {
                    return Ext.util.Format.number(v, '0.0');
                }
            }, {
                type: 'category',
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
                    lineWidth: 4
                },
                marker: {
                    radius: 4
                },
                highlight: {
                    fillStyle: '#000',
                    radius: 5,
                    lineWidth: 2,
                    strokeStyle: '#fff'
                }
            }, {
                type: 'line',
                axis: 'left',
                xField: 'theta',
                yField: 'cos',
                smooth: true,
                style: {
                    lineWidth: 4
                },
                marker: {
                    radius: 4
                },
                highlight: {
                    fillStyle: '#000',
                    radius: 5,
                    lineWidth: 2,
                    strokeStyle: '#fff'
                }
            }, {
                type: 'line',
                axis: 'left',
                xField: 'theta',
                yField: 'tan',
                smooth: true,
                style: {
                    lineWidth: 4
                },
                marker: {
                    radius: 4
                },
                highlight: {
                    fillStyle: '#000',
                    radius: 5,
                    lineWidth: 2,
                    strokeStyle: '#fff'
                }
            }]
        //<example>
        }, {
            style: 'margin-top: 10px;',
            xtype: 'gridpanel',
            height: 240,
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
