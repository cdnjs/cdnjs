/**
 * This example shows how to define multiple axes in a single direction. It also shows
 * how to have slave axes linked to the master axis. Slave axes mirror the data and the
 * layout of the master axis, but can be styled and positioned differently. The example
 * also shows how to use gradients in charts.
 *
 * Click and drag to select a region to zoom into. Double-click to undo the last zoom.
 */
Ext.define('KitchenSink.view.charts.column.MultiAxis', {
    extend: 'Ext.container.Container',
    xtype: 'column-multi-axis',

    // <example>
    // Content between example tags is omitted from code preview.
    layout: 'fit',

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

    width: 650,
    height: 500,

    initComponent: function() {
        var me = this;

        var highSeries = {
            type: 'bar',
            xField: 'month',
            yField: 'highF',
            yAxis: 'fahrenheit-axis',
            style: {
                minGapWidth: 10
            },
            subStyle: {
                fillStyle: 'url(#rainbow)'
            }
        },
        lowSeries = Ext.apply({}, {
            yField: ['lowF'],
            subStyle: {
                fillStyle: 'none'
            }
        }, highSeries);

        me.items = [{
            xtype: 'cartesian',
            store: {type: 'climate'},
            insetPadding: 10,
            innerPadding: {
                left: 20,
                right: 20
            },
            interactions: 'crosszoom',
            axes: [
                {
                    type: 'numeric',
                    id: 'fahrenheit-axis',
                    adjustByMajorUnit: true,
                    position: 'left',
                    titleMargin: 20,
                    minimum: 32,
                    grid: true,
                    title: {
                        text: 'Temperature in °F',
                        fontSize: 14
                    },
                    listeners: {
                        rangechange: function (range) {
                            var cAxis = this.getChart().getAxis('celsius-axis');
                            if (cAxis) {
                                cAxis.setMinimum((range[0] - 32) / 1.8);
                                cAxis.setMaximum((range[1] - 32) / 1.8);
                            }
                        }
                    }
                },
                {
                    id: 'celsius-axis',
                    type: 'numeric',
                    titleMargin: 20,
                    position: 'right',
                    title: {
                        text: 'Temperature in °C',
                        fontSize: 14,
                        fillStyle: 'red'
                    }
                },
                {
                    id: 'months-axis',
                    type: 'category',
                    position: 'bottom'
                },
                {
                    position: 'top',
                    linkedTo: 'months-axis',
                    title: {
                        text: 'Climate data for Redwood City, California',
                        fontSize: 16,
                        fillStyle: 'green'
                    },
                    titleMargin: 20
                }
            ],
            series: [
                highSeries,
                lowSeries
            ],
            gradients: [{
                id: 'rainbow',
                type: 'linear',
                degrees: 270,
                stops: [
                    {
                        offset: 0,
                        color: '#78C5D6'
                    },
                    {
                        offset: 0.14,
                        color: '#449AA7'
                    },
                    {
                        offset: 0.28,
                        color: '#79C267'
                    },
                    {
                        offset: 0.42,
                        color: '#C4D546'
                    },
                    {
                        offset: 0.56,
                        color: '#F5D63D'
                    },
                    {
                        offset: 0.70,
                        color: '#F18B32'
                    },
                    {
                        offset: 0.84,
                        color: '#E767A1'
                    },
                    {
                        offset: 1,
                        color: '#BF62A6'
                    }
                ]
            }]
        }];

        this.callParent();

        var chart = me.down('cartesian');
    }
});
