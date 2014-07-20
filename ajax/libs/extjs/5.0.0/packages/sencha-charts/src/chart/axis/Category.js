/**
 * @class Ext.chart.axis.Category
 * @extends Ext.chart.axis.Axis
 *
 * A type of axis that displays items in categories. This axis is generally used to
 * display categorical information like names of items, month names, quarters, etc.
 * but no quantitative values. For that other type of information {@link Ext.chart.axis.Numeric Numeric}
 * axis are more suitable.
 *
 * As with other axis you can set the position of the axis and its title. For example:
 *
 *     @example preview
 *     var chart = new Ext.chart.CartesianChart({
 *         animation: true,
 *         innerPadding: {
 *             left: 40,
 *             right: 40
 *         },
 *         store: {
 *             fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *             data: [
 *                 {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *                 {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *                 {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *                 {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *                 {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *             ]
 *         },
 *         axes: [{
 *             type: 'category',
 *             position: 'bottom',
 *             fields: ['name'],
 *             title: {
 *                 text: 'Sample Values',
 *                 fontSize: 15
 *             }
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
 *
 * In this example with set the category axis to the bottom of the surface, bound the axis to
 * the `name` property and set as title "Sample Values".
 */

Ext.define('Ext.chart.axis.Category', {
    requires: [
        'Ext.chart.axis.layout.CombineDuplicate',
        'Ext.chart.axis.segmenter.Names'
    ],
    extend: 'Ext.chart.axis.Axis',
    alias: 'axis.category',
    type: 'category',

    config: {
        layout: 'combineDuplicate',

        segmenter: 'names'
    }
});
