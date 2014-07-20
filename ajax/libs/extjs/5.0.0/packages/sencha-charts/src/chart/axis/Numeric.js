/**
 * @class Ext.chart.axis.Numeric
 * @extends Ext.chart.axis.Axis
 *
 * An axis to handle numeric values. This axis is used for quantitative data as
 * opposed to the category axis. You can set minimum and maximum values to the
 * axis so that the values are bound to that. If no values are set, then the
 * scale will auto-adjust to the values.
 *
 *     @example preview
 *     var chart = new Ext.chart.CartesianChart({
 *         animation: true,
 *         store: {
 *           fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *           data: [
 *               {'name':1, 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *               {'name':2, 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *               {'name':3, 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *               {'name':4, 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *               {'name':5, 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *           ]
 *         },
 *         axes: [{
 *             type: 'numeric',
 *             position: 'left',
 *             fields: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *             title: 'Sample Values',
 *             grid: {
 *                 odd: {
 *                     opacity: 1,
 *                     fill: '#ddd',
 *                     stroke: '#bbb',
 *                     'lineWidth': 1
 *                 }
 *             },
 *             minimum: 0,
 *             adjustMinimumByMajorUnit: true
 *         }],
 *         series: [{
 *             type: 'area',
 *             subStyle: {
 *                 fill: ['blue', 'green', 'red']
 *             },
 *             xField: 'name',
 *             yField: ['data1', 'data2', 'data3']
 *
 *         }]
 *     });
 *     Ext.Viewport.setLayout('fit');
 *     Ext.Viewport.add(chart);
 * In this example we create an axis of Numeric type. We set a minimum value so that
 * even if all series have values greater than zero, the grid starts at zero. We bind
 * the axis onto the left part of the surface by setting _position_ to _left_.
 * We bind three different store fields to this axis by setting _fields_ to an array.
 * We set the title of the axis to _Number of Hits_ by using the _title_ property.
 * We use a _grid_ configuration to set odd background rows to a certain style and even rows
 * to be transparent/ignored.
 *
 */
Ext.define('Ext.chart.axis.Numeric', {
    extend: 'Ext.chart.axis.Axis',
    alias: ['axis.numeric', 'axis.radial'],		// For compatibility with ExtJS: add radial
    type: 'numeric',
    requires: ['Ext.chart.axis.layout.Continuous', 'Ext.chart.axis.segmenter.Numeric'],
    config: {
        layout: 'continuous',

        segmenter: 'numeric',

        aggregator: 'double'
    }
});
