/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * @class Ext.chart.axis.Category
 *
 * A type of axis that displays items in categories. This axis is generally used to
 * display categorical information like names of items, month names, quarters, etc.
 * but no quantitative values. For that other type of information `Number`
 * axis are more suitable.
 *
 * As with other axis you can set the position of the axis and its title. For example:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *             {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *             {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *             {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *             {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         store: store,
 *         axes: [{
 *             type: 'Numeric',
 *             position: 'left',
 *             fields: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *             title: 'Sample Values',
 *             grid: {
 *                 odd: {
 *                     opacity: 1,
 *                     fill: '#ddd',
 *                     stroke: '#bbb',
 *                     'stroke-width': 1
 *                 }
 *             },
 *             minimum: 0,
 *             adjustMinimumByMajorUnit: 0
 *         }, {
 *             type: 'Category',
 *             position: 'bottom',
 *             fields: ['name'],
 *             title: 'Sample Metrics',
 *             grid: true,
 *             label: {
 *                 rotate: {
 *                     degrees: 315
 *                 }
 *             }
 *         }],
 *         series: [{
 *             type: 'area',
 *             highlight: false,
 *             axis: 'left',
 *             xField: 'name',
 *             yField: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *             style: {
 *                 opacity: 0.93
 *             }
 *         }]
 *     });
 *
 * In this example with set the category axis to the bottom of the surface, bound the axis to
 * the `name` property and set as title _Month of the Year_.
 */
Ext.define('Ext.chart.axis.Category', {

    /* Begin Definitions */

    extend: 'Ext.chart.axis.Axis',

    alternateClassName: 'Ext.chart.CategoryAxis',

    alias: 'axis.category',

    /* End Definitions */

    /**
     * @cfg {String} categoryNames
     * A list of category names to display along this axis.
     */
    categoryNames: null,

    /**
     * @cfg {Boolean} calculateCategoryCount
     * Indicates whether or not to calculate the number of categories (ticks and
     * labels) when there is not enough room to display all labels on the axis.
     * If set to true, the axis will determine the number of categories to plot.
     * If not, all categories will be plotted.
     */
    calculateCategoryCount: false,

    // @private constrains to datapoints between minimum and maximum only
    doConstrain: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            items = store.data.items,
            series = chart.series.items,
            seriesLength = series.length,
            data = [], i

        for (i = 0; i < seriesLength; i++) {
            if (series[i].type === 'bar' && series[i].stacked) {
                // Do not constrain stacked bar chart.
                return;
            }
        }

        for (i = me.minimum; i < me.maximum; i++) {
            data.push(items[i]);
        }
        
        chart.setSubStore(new Ext.data.Store({
            model: store.model,
            data: data
        }));
    },

    // @private creates an array of labels to be used when rendering.
    setLabels: function() {
        var store = this.chart.getChartStore(),
            data = store.data.items,
            d, dLen, record,
            fields = this.fields,
            ln = fields.length,
            labels,
            name,
            i;

        labels = this.labels = [];
        for (d = 0, dLen = data.length; d < dLen; d++) {
            record = data[d];
            for (i = 0; i < ln; i++) {
                name = record.get(fields[i]);
                //<debug>
                if (Ext.Array.indexOf(labels, name) > -1) {
                    Ext.log.warn('Duplicate category in axis, ' + name);
                }
                //</debug>
                labels.push(name);
            }
        }
    },

    // @private calculates labels positions and marker positions for rendering.
    applyData: function() {
        this.callParent();
        this.setLabels();
        var count = this.chart.getChartStore().getCount();
        return {
            from: 0,
            to: count - 1,
            power: 1,
            step: 1,
            steps: count - 1
        };
    }
});
