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
 * @class Ext.chart.axis.Numeric
 *
 * An axis to handle numeric values. This axis is used for quantitative data as
 * opposed to the category axis. You can set mininum and maximum values to the
 * axis so that the values are bound to that. If no values are set, then the
 * scale will auto-adjust to the values.
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *          fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *          data: [
 *              {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *              {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *              {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *              {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *              {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *          ]
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
 * In this example we create an axis of Numeric type. We set a minimum value so that
 * even if all series have values greater than zero, the grid starts at zero. We bind
 * the axis onto the left part of the surface by setting `position` to `left`.
 * We bind three different store fields to this axis by setting `fields` to an array.
 * We set the title of the axis to _Number of Hits_ by using the `title` property.
 * We use a `grid` configuration to set odd background rows to a certain style and even rows
 * to be transparent/ignored.
 */
Ext.define('Ext.chart.axis.Numeric', {

    /* Begin Definitions */

    extend: 'Ext.chart.axis.Axis',

    alternateClassName: 'Ext.chart.NumericAxis',

    /* End Definitions */

    type: 'Numeric',

    // @private
    isNumericAxis: true,

    alias: 'axis.numeric',

    uses: ['Ext.data.Store'],

    constructor: function(config) {
        var me = this,
            hasLabel = !!(config.label && config.label.renderer),
            label;

        me.callParent([config]);
        label = me.label;

        if (config.constrain == null) {
            me.constrain = (config.minimum != null && config.maximum != null);
        }

        if (!hasLabel) {
            label.renderer = function(v) {
                return me.roundToDecimal(v, me.decimals);
            };
        }
    },

    roundToDecimal: function(v, dec) {
        var val = Math.pow(10, dec || 0);
        return Math.round(v * val) / val;
    },

    /**
     * @cfg {Number} minimum
     * The minimum value drawn by the axis. If not set explicitly, the axis
     * minimum will be calculated automatically. It is ignored for stacked charts.
     */
    minimum: NaN,

    /**
     * @cfg {Number} maximum
     * The maximum value drawn by the axis. If not set explicitly, the axis
     * maximum will be calculated automatically. It is ignored for stacked charts.
     */
    maximum: NaN,

    /**
     * @cfg {Boolean} constrain
     * If true, the values of the chart will be rendered only if they belong between minimum and maximum.
     * If false, all values of the chart will be rendered, regardless of whether they belong between minimum and maximum or not.
     * Default's true if maximum and minimum is specified. It is ignored for stacked charts.
     */
    constrain: true,

    /**
     * @cfg {Number} decimals
     * The number of decimals to round the value to.
     */
    decimals: 2,

    /**
     * @cfg {String} scale
     * The scaling algorithm to use on this axis. May be "linear" or
     * "logarithmic".  Currently only linear scale is implemented.
     * @private
     */
    scale: "linear",

    // @private constrains to datapoints between minimum and maximum only
    doConstrain: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            items = store.data.items,
            d, dLen, record,
            series = chart.series.items,
            fields = me.fields,
            ln = fields.length,
            range = me.calcEnds(),
            min = range.from, max = range.to, i, l,
            useAcum = false,
            value, data = [],
            addRecord;

        for (d = 0, dLen = items.length; d < dLen; d++) {
            addRecord = true;
            record = items[d];
            for (i = 0; i < ln; i++) {
                value = record.get(fields[i]);
                if (me.type == 'Time' && typeof value == "string") {
                    value = Date.parse(value);
                }
                if (+value < +min) {
                    addRecord = false;
                    break;
                }
                if (+value > +max) {
                    addRecord = false;
                    break;
                }
            }
            if (addRecord) {
                data.push(record);
            }
        }
        
        chart.setSubStore(new Ext.data.Store({
            model: store.model,
            data: data
        }));
    },
    /**
     * @cfg {String} position
     * Indicates the position of the axis relative to the chart
     */
    position: 'left',

    /**
     * @cfg {Boolean} adjustMaximumByMajorUnit
     * Indicates whether to extend maximum beyond data's maximum to the nearest
     * majorUnit.
     */
    adjustMaximumByMajorUnit: false,

    /**
     * @cfg {Boolean} adjustMinimumByMajorUnit
     * Indicates whether to extend the minimum beyond data's minimum to the
     * nearest majorUnit.
     */
    adjustMinimumByMajorUnit: false,

    // applying constraint
    processView: function() {
        var me = this,
            chart = me.chart,
            series = chart.series.items,
            i, l;

        for (i = 0, l = series.length; i < l; i++) {
            if (series[i].stacked) {
                // Do not constrain stacked charts (bar, column, or area).
                delete me.minimum;
                delete me.maximum;
                me.constrain = false;
                break;
            }
        }

        if (me.constrain) {
            me.doConstrain();
        }
    },

    // @private apply data.
    applyData: function() {
        this.callParent();
        return this.calcEnds();
    }
});
