/**
 * @abstract
 * @class Ext.chart.axis.layout.Layout
 *
 * Interface used by Axis to process its data into a meaningful layout.
 */
Ext.define('Ext.chart.axis.layout.Layout', {
    mixins: {
        observable: 'Ext.mixin.Observable'
    },
    config: {
        /**
         * @cfg {Ext.chart.axis.Axis} axis The axis that the Layout is bound.
         */
        axis: null
    },

    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
    },

    /**
     * Processes the data of the series bound to the axis.
     * @param {Ext.chart.series.Series} series The bound series.
     */
    processData: function (series) {
        var me = this,
            axis = me.getAxis(),
            direction = axis.getDirection(),
            boundSeries = axis.boundSeries,
            i, ln;
        if (series) {
            series['coordinate' + direction]();
        } else {
            for (i = 0, ln = boundSeries.length; i < ln; i++) {
                boundSeries[i]['coordinate' + direction]()
            }
        }
    },

    /**
     * Calculates the position of major ticks for the axis.
     * @param {Object} context
     */
    calculateMajorTicks: function (context) {
        var me = this,
            attr = context.attr,
            range = attr.max - attr.min,
            zoom = range / Math.max(1, attr.length) * (attr.visibleMax - attr.visibleMin),
            viewMin = attr.min + range * attr.visibleMin,
            viewMax = attr.min + range * attr.visibleMax,
            estStepSize = attr.estStepSize * zoom,
            out = me.snapEnds(context, attr.min, attr.max, estStepSize);
        if (out) {
            me.trimByRange(context, out, viewMin, viewMax);
            context.majorTicks = out;
        }
    },

    /**
     * Calculates the position of sub ticks for the axis.
     * @param {Object} context
     */
    calculateMinorTicks: function (context) {
        if (this.snapMinorEnds) {
            context.minorTicks = this.snapMinorEnds(context);
        }
    },

    /**
     * Calculates the position of tick marks for the axis.
     * @param {Object} context
     * @return {*}
     */
    calculateLayout: function (context) {
        var me = this,
            attr = context.attr;

        if (attr.length === 0) {
            return null;
        }

        if (attr.majorTicks) {
            me.calculateMajorTicks(context);
            if (attr.minorTicks) {
                me.calculateMinorTicks(context);
            }
        }
    },

    /**
     * Snaps the data bound to the axis to meaningful tick marks.
     * @param {Object} context
     * @param {Number} min
     * @param {Number} max
     * @param {Number} estStepSize
     */
    snapEnds: Ext.emptyFn,

    /**
     * Trims the layout of the axis by the defined minimum and maximum.
     * @param {Object} context
     * @param {Object} out
     * @param {Number} trimMin
     * @param {Number} trimMax
     */
    trimByRange: function (context, out, trimMin, trimMax) {
        var segmenter = context.segmenter,
            unit = out.unit,
            beginIdx = segmenter.diff(out.from, trimMin, unit),
            endIdx = segmenter.diff(out.from, trimMax, unit),
            begin = Math.max(0, Math.ceil(beginIdx / out.step)),
            end = Math.min(out.steps, Math.floor(endIdx / out.step));

        if (end < out.steps) {
            out.to = segmenter.add(out.from, end * out.step, unit);
        }

        if (out.max > trimMax) {
            out.max = out.to;
        }

        if (out.from < trimMin) {
            out.from = segmenter.add(out.from, begin * out.step, unit);
            while (out.from < trimMin) {
                begin++;
                out.from = segmenter.add(out.from, out.step, unit);
            }
        }

        if (out.min < trimMin) {
            out.min = out.from;
        }

        out.steps = end - begin;
    }
});
