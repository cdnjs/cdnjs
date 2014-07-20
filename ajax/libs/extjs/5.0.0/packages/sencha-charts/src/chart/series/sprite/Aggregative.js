/**
 *
 */
Ext.define('Ext.chart.series.sprite.Aggregative', {
    extend: 'Ext.chart.series.sprite.Cartesian',
    requires: ['Ext.draw.LimitedCache', 'Ext.draw.SegmentTree'],
    inheritableStatics: {
        def: {
            processors: {
                /**
                 * @cfg {Object} [dataHigh=null] Data items representing the high values of the aggregated data.
                 */
                dataHigh: 'data',

                /**
                 * @cfg {Object} [dataLow=null] Data items representing the low values of the aggregated data.
                 */
                dataLow: 'data',

                /**
                 * @cfg {Object} [dataClose=null] Data items representing the closing values of the aggregated data.
                 */
                dataClose: 'data'
            },
            aliases: {
                /**
                 * @cfg {Object} [dataOpen=null] Data items representing the opening values of the aggregated data.
                 */
                dataOpen: 'dataY'
            },
            defaults: {
                dataHigh: null,
                dataLow: null,
                dataClose: null
            }
        }
    },

    config: {
        aggregator: {}
    },

    applyAggregator: function (aggregator, oldAggr) {
        return Ext.factory(aggregator, Ext.draw.SegmentTree, oldAggr);
    },

    constructor: function () {
        this.callParent(arguments);
    },

    processDataY: function () {
        var me = this,
            attr = me.attr,
            high = attr.dataHigh,
            low = attr.dataLow,
            close = attr.dataClose,
            open = attr.dataY;
        me.callParent(arguments);
        if (attr.dataX && open && open.length > 0) {
            if (high) {
                me.getAggregator().setData(attr.dataX, attr.dataY, high, low, close);
            } else {
                me.getAggregator().setData(attr.dataX, attr.dataY);
            }
        }
    },

    getGapWidth: function () {
        return 1;
    },

    renderClipped: function (surface, ctx, clip, rect) {
        var me = this,
            min = Math.min(clip[0], clip[2]),
            max = Math.max(clip[0], clip[2]),
            aggregates = me.getAggregator() && me.getAggregator().getAggregation(
                min, max, (max - min) / rect[2] * me.getGapWidth()
            );
        if (aggregates) {
            me.dataStart = aggregates.data.startIdx[aggregates.start];
            me.dataEnd = aggregates.data.endIdx[aggregates.end - 1];

            me.renderAggregates(aggregates.data, aggregates.start, aggregates.end, surface, ctx, clip, rect);
        }
    }
});