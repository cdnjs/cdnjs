/**
 * This example shows how to create a Plot chart with floating axes linked to each other
 * at the origin. Floating axes can track a value on another axis running in the oppsosite
 * direction. This is handy for visualizing mathematical functions. Try zooming and panning
 * the chart to see the effect.
 *
 * To zoom the chart, use the pinch-in/pinch-out gestures, if you are on a mobile device.
 * Or click and drag, if you are using a desktop browser. Click and drag also acts as a
 * panning gesture on desktops. You can use the Pan/Zoom toggle in the upper-left corner
 * of the chart to switch modes.
 */
Ext.define('KitchenSink.view.charts.line.Plot', {
    extend: 'Ext.panel.Panel',
    xtype: 'line-plot',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.series.Bar',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category'
    ],

    layout: 'fit',

    width: 650,

    initComponent: function () {
        var me = this;

        me.items = [{
            xtype: 'cartesian',
            height: 500,
            store: {type: 'plot'},
            theme: 'Sky',
            padding: 10,
            insetPadding: 0,
            id: 'plot-chart',
            background: 'white',
            interactions: {
                type: 'panzoom'
            },
            // <example>
            // TODO: must be able to control how series are displayed
            // TODO: for undefined data points (apply fillStyle to the series
            // TODO: to see the issue)
            // </example>
            series: [
                {
                    type: 'line',
                    xField: 'x',
                    yField: 'y1',
                    style: {
                        lineWidth: 2,
                        strokeStyle: 'rgb(0, 119, 204)'
                    }
                }
                // <example>
// TODO: The second line series does not render correctly, it should look the same
// TODO: as the blue series will look on next refresh button tap, but doesn't,
// TODO: even though the data looks alright.
// TODO: add 'me.fn[(me.fnIndex + 1) % me.fn.length]' to Plot store's traverseFunctions
// TODO: as a third parameter to test this.
// TODO:               {
// TODO:                   type: 'line',
// TODO:                   xField: 'x',
// TODO:                   yField: 'y2',
// TODO:                   style: {
// TODO:                       lineWidth: 2,
// TODO:                       lineDash: [3, 3],
// TODO:                       strokeStyle: 'rgb(230, 119, 204)'
// TODO:                   }
// TODO:               }
                // </example>
            ],
            axes: [
                {
                    type: 'numeric',
                    position: 'left',
                    fields: ['y1'],
                    titleMargin: 20,
                    title: {
                        text: 'f(x)',
                        fontSize: 16,
                        fillStyle: 'rgb(255, 0, 136)'
                    },
                    minimum: -4,
                    maximum: 4,
                    minorTickSteps: 3,
                    style: {
                        minorTicks: true,
                        minorTickSize: 4,
                        majorTickSize: 7
                    },
                    floating: {
                        value: 0,
                        alongAxis: 1
                    },
                    grid: true
                },
                {
                    type: 'numeric',
                    position: 'bottom',
                    fields: ['x'],
                    titleMargin: 6,
                    minorTickSteps: 3,
                    style: {
                        minorTicks: true,
                        minorTickSize: 4,
                        majorTickSize: 7
                    },
                    title: {
                        text: 'x',
                        fontSize: 16,
                        fillStyle: 'rgb(255, 0, 136)'
                    },
                    floating: {
                        value: 0,
                        alongAxis: 0
                    },
                    grid: true
                }
            ]
        }];

        function resetChart() {
            var axes = chart.getAxes();
            axes[0].setVisibleRange([0, 1]);
            axes[1].setVisibleRange([0, 1]);
            chart.redraw();
        }

        function refreshChart() {
            chart.getStore().refreshData();
        }

        me.tbar = [
            '->',
            {
                text: 'Refresh',
                handler: refreshChart
            },
            {
                text: 'Preview',
                handler: function() {
                    me.down('cartesian').preview();
                }
            },
            {
                text: 'Reset pan/zoom',
                handler: resetChart
            }
        ];

        me.callParent();

        var chart = this.down('cartesian'),
            panzoom = chart.getInteractions()[0];
        this.down('toolbar').add(panzoom.getModeToggleButton());
    }

});
