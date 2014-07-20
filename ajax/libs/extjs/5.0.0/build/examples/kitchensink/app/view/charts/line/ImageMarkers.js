/**
 * This example shows how to create a line chart with images as markers. Line charts allow
 * to visualize the evolution of a value over time, or the ratio between any two values.
 */
Ext.define('KitchenSink.view.charts.line.ImageMarkers', {
    extend: 'Ext.Panel',
    xtype: 'line-markers',

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
                var store = this.up('panel').down('cartesian').getStore();
                store.refreshData();
            }
        },
        {
            text: 'Switch Theme',
            handler: function () {
                var panel = this.up('panel'),
                    chart = panel.down('cartesian'),
                    themes = Ext.chart.theme,
                    themeNames = [], name, currentIndex;
                for (name in themes) {
                    if (name !== 'Theme') {
                        themeNames.push(name);
                    }
                }
                currentIndex = Ext.Array.indexOf(themeNames, chart.getTheme());
                chart.setTheme(themeNames[(currentIndex + 1) % themeNames.length]);
                chart.redraw();
            }
        },
        {
            text: 'Reset pan/zoom',
            handler: function () {
                var panel = this.up('panel'),
                    chart = panel.down('cartesian'),
                    axes = chart.getAxes();

                axes[0].setVisibleRange([0, 1]);
                axes[1].setVisibleRange([0, 1]);
                chart.redraw();
            }
        }
    ],

    items: [{
        xtype: 'cartesian',
        height: 500,
        store: {
            type: 'pie'
        },
        theme: 'Sky',
        id: 'line-chart-markers',
        background: 'white',
        interactions: [
            'panzoom',
            'itemhighlight'
        ],
        legend: {
            position: 'bottom'
        },
        series: [
            {
                type: 'line',
                xField: 'name',
                yField: 'g1',
                fill: true,
                style: {
                    smooth: true,
                    miterLimit: 3,
                    lineCap: 'miter',
                    strokeOpacity: 1,
                    fillOpacity: 0.7,
                    lineWidth: 8
                },
                title: 'Square',
                highlight: {
                    scale: 0.9
                },
                marker: {
                    type: 'image',
                    src: 'resources/images/square.png',
                    width: 48,
                    height: 48,
                    x: -24,
                    y: -24,
                    scale: 0.7,
                    fx: {
                        duration: 200
                    }
                }
            },
            {
                type: 'line',
                xField: 'name',
                yField: 'g2',
                style: {
                    opacity: 0.7,
                    lineWidth: 8
                },
                title: 'Circle',
                highlight: {
                    scale: 0.9
                },
                marker: {
                    type: 'image',
                    src: 'resources/images/circle.png',
                    width: 48,
                    height: 48,
                    x: -24,
                    y: -24,
                    scale: 0.7,
                    fx: {
                        duration: 200
                    }
                }
            },
            {
                type: 'line',
                xField: 'name',
                yField: 'g3',
                style: {
                    opacity: 0.7,
                    lineWidth: 8
                },
                title: 'Pentagon',
                highlight: {
                    scale: 0.9
                },
                marker: {
                    type: 'image',
                    src: 'resources/images/pentagon.png',
                    width: 48,
                    height: 48,
                    x: -24,
                    y: -24,
                    scale: 0.7,
                    fx: {
                        duration: 200
                    }
                }
            }
        ],
        axes: [
            {
                type: 'numeric',
                position: 'left',
                fields: ['g1', 'g2', 'g3'],
                minimum: 0,
                listeners: {
                    'rangechange': function (range) {
                        if (!range) {
                            return;
                        }
                        // expand the range slightly to make sure markers aren't clipped
                        var max = range[1];
                        if (max >= 1000) {
                            range[1] = max - max % 100 + 100;
                        } else {
                            range[1] = max - max % 50 + 50;
                        }
                    }
                }
            },
            {
                type: 'category',
                position: 'bottom',
                visibleRange: [0, 0.75],
                fields: 'name'
            }
        ]
    }],

    initComponent: function () {
        this.callParent();
        var panzoom = this.down('cartesian').getInteractions()[0];
        this.down('toolbar').add(panzoom.getModeToggleButton());
    }

});
