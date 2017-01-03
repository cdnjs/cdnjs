/**
 * This example shows how to create a line chart. Line charts allow to visualize the
 * evolution of a value over time, or the ratio between any two values.
 *
 * This example also highlights data aggregation to effortlessly display over 1000 points.
 */
Ext.define('KitchenSink.view.charts.touch.CrossZoom', {
    extend: 'Ext.Panel',
    xtype: 'line-crosszoom',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.CrossZoom'
    ],

    layout: 'fit',

    width: 650,

    tbar: [
        '->',
        {
            text: 'Undo Zoom',
            handler: function() {
                var chart = Ext.getCmp('usd2eur-chart'),
                    interaction = chart && Ext.ComponentQuery.query('interaction', chart)[0],
                    undoButton = interaction && interaction.getUndoButton(),
                    handler = undoButton && undoButton.handler;
                if (handler) {
                    handler();
                }
            }
        }
    ],

    items: {
        xtype: 'cartesian',
        width: '100%',
        height: 500,
        store: 'USD2EUR',
        id: 'usd2eur-chart',
        background: 'white',
        interactions: {
            type: 'crosszoom',
            zoomOnPanGesture: false
        },
        insetPadding: '20 20 10 10',
        series: {
            type: 'line',
            xField: 'time',
            yField: 'value',
            style: {
                lineWidth: 2,
                fill: "#115fa6",
                stroke: "#115fa6",
                fillOpacity: 0.6,
                miterLimit: 3,
                lineCap: 'miter'
            }
        },
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['value'],
            titleMargin: 12,
            title: {
                text: 'USD to Euro',
                fontSize: 16
            }
        }, {
            type: 'time',
            dateFormat: 'Y-m-d',
            visibleRange: [0, 1],
            position: 'bottom',
            fields: ['time'],
            titleMargin: 12,
            title: {
                text: 'Date',
                fontSize: 16
            }
        }]
    }

});
