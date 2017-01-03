/**
 * This example shows how to create a Candlestick chart. Candlestick charts are financial
 * charts that allow to visualize the open/high/low/close values of a stock.
 *
 * The example makes use of two interactions: 'crosshair' (default) and 'panzoom'. The
 * gear icon can be used to switch between the two.
 */
Ext.define('KitchenSink.view.charts.financial.Candlestick', {
    extend: 'Ext.Panel',
    xtype: 'financial-candlestick',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight'
    ],

    layout: 'fit',

    width: 650,

    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: function () {
                var chart = this.up('panel').down('cartesian'),
                    store = chart.getStore();
                store.refreshData();
            }
        },
        {
            xtype: 'segmentedbutton',
            width: 200,
            defaults: { ui: 'default-toolbar' },
            items: [
                {
                    text: 'Crosshair',
                    pressed: true
                },
                {
                    text: 'Pan/Zoom'
                }
            ],
            listeners: {
                toggle: function (segmentedButton, button, pressed) {
                    var chart = this.up('panel').down('cartesian'),
                        interactions = chart.getInteractions(),
                        value = segmentedButton.getValue();
                    interactions[0].setEnabled(value === 1);
                    interactions[1].setEnabled(value === 0);
                }
            }
        },
        {
            text: 'Reset pan/zoom',
            handler: function () {
                var chart = this.up('panel').down('cartesian'),
                    axes = chart.getAxes();
                axes[0].setVisibleRange([0, 1]);
                axes[1].setVisibleRange([0, 0.3]);
                chart.redraw();
            }
        }
    ],

    items: [{
        xtype: 'cartesian',
        width: '100%',
        height: 500,
        store: {type: 'stock-price'},
        id: 'candlestick-chart',
        background: 'white',
        insetPadding: 20,
        interactions: [
             {
                 type: 'panzoom',
                 enabled: false,
                 zoomOnPanGesture: false,
                 axes: {
                     left: {
                         allowPan: false,
                         allowZoom: false
                     },
                     bottom: {
                         allowPan: true,
                         allowZoom: true
                     }
                 }
             },
             {
                 type: 'crosshair'
             }
        ],
        series: [
            {
                type: 'candlestick',
                xField: 'time',
                openField: 'open',
                highField: 'high',
                lowField: 'low',
                closeField: 'close',
                style: {
                    barWidth: 10,
                    opacity: 0.9,
                    dropStyle: {
                        fill: 'rgb(237,123,43)',
                        stroke: 'rgb(237,123,43)'
                    },
                    raiseStyle: {
                        fill: 'rgb(55,153,19)',
                        stroke: 'rgb(55,153,19)'
                    }
                },
                aggregator: {
                    strategy: 'time'
                }
            }
        ],
        axes: [
            {
                type: 'numeric',
                fields: ['open', 'high', 'low', 'close'],
                position: 'left',
                maximum: 1000,
                minimum: 0
            },
            {
                type: 'time',
                fields: ['time'],
                position: 'bottom',
                visibleRange: [0, 0.3]
            }
        ]
    }],

    initComponent: function () {
        this.callParent();

        var chart = this.down('cartesian'),
            panzoom = chart.getInteractions()[0];
        this.down('toolbar').add(panzoom.getModeToggleButton());
    }
});
