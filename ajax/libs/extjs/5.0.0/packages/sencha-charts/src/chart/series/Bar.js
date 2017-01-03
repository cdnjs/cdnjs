/**
 * @class Ext.chart.series.Bar
 * @extends Ext.chart.series.StackedCartesian
 * 
 * Creates a Bar Chart.
 * 
 *     @example preview
 *     var chart = new Ext.chart.CartesianChart({
 *         store: {
 *           fields: ['name', 'value'],
 *           data: [
 *               {name: 'metric one', value: 10},
 *               {name: 'metric two', value: 7},
 *               {name: 'metric three', value: 5},
 *               {name: 'metric four', value: 2},
 *               {name: 'metric five', value: 27}
 *           ]
 *         },
 *         axes: [{
 *             type: 'numeric',
 *             position: 'left',
 *             title: {
 *                 text: 'Sample Values',
 *                 fontSize: 15
 *             },
 *             fields: 'value'
 *         }, {
 *             type: 'category',
 *             position: 'bottom',
 *             title: {
 *                 text: 'Sample Values',
 *                 fontSize: 15
 *             },
 *             fields: 'name'
 *         }],
 *         series: [{
 *             type: 'bar',
 *             xField: 'name',
 *             yField: 'value',
 *             style: {
 *               fill: 'blue'
 *             }
 *         }]
 *     });
 *     Ext.Viewport.setLayout('fit');
 *     Ext.Viewport.add(chart);
 */
Ext.define('Ext.chart.series.Bar', {

    extend: 'Ext.chart.series.StackedCartesian',

    alias: 'series.bar',
    type: 'bar',
    seriesType: 'barSeries',

    requires: [
        'Ext.chart.series.sprite.Bar',
        'Ext.draw.sprite.Rect'
    ],

    config: {
        /**
         * @private
         * @cfg {Object} itemInstancing Sprite template used for series.
         */
        itemInstancing: {
            type: 'rect',
            fx: {
                customDuration: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    radius: 0
                }
            }
        }
    },

    getItemForPoint: function (x, y) {
        if (this.getSprites()) {
            var me = this,
                chart = me.getChart(),
                padding = chart.getInnerPadding(),
                isRtl = chart.getInherited().rtl;

            // Convert the coordinates because the "items" sprites that draw the bars ignore the chart's InnerPadding.
            // See also Ext.chart.series.sprite.Bar.getIndexNearPoint(x,y) regarding the series's vertical coordinate system.
            arguments[0] = x + (isRtl ? padding.right : -padding.left);
            arguments[1] = y + padding.bottom;
            return me.callParent(arguments);
        }
    },

    updateXAxis: function (axis) {
        axis.setLabelInSpan(true);
        this.callParent(arguments);
    },

    updateHidden: function (hidden) {
        this.callParent(arguments);
        this.updateStacked();
    },

    updateStacked: function (stacked) {
        var sprites = this.getSprites(),
            ln = sprites.length,
            visible = [],
            attrs = {}, i;

        for (i = 0; i < ln; i++) {
            if (!sprites[i].attr.hidden) {
                visible.push(sprites[i]);
            }
        }
        ln = visible.length;

        if (this.getStacked()) {
            attrs.groupCount = 1;
            attrs.groupOffset = 0;
            for (i = 0; i < ln; i++) {
                visible[i].setAttributes(attrs);
            }
        } else {
            attrs.groupCount = visible.length;
            for (i = 0; i < ln; i++) {
                attrs.groupOffset = i;
                visible[i].setAttributes(attrs);
            }
        }
        this.callParent(arguments);
    }
});
