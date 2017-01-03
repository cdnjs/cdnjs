/**
 * @class Ext.sparkline.Discrete
 *
 * Plots a series of thin vertical lines based upon the input {@link #values} array.
 */
Ext.define('Ext.sparkline.Discrete', {
    extend: 'Ext.sparkline.BarBase',

    alias: 'widget.sparklinediscrete',

    config: {

        /**
         * @cfg {Number} lineHeight Height of each line in pixels - Defaults to 30% of the graph height.
         */
        lineHeight: 'auto',
        
        /**
         * @cfg {String} thresholdColor Colour to use in combination with {@link #thresholdValue}
         */
        thresholdColor: null,
        
        /**
         * @cfg {Number} thresholdValue Values less than this value will be drawn using {@link #thresholdColor} instead of lineColor
         */
        thresholdValue: 0,
        
        /**
         * @cfg {Number} [chartRangeMax] The maximum value to use for the range of Y values of the chart - Defaults to the maximum value supplied.
         */
        chartRangeMax: null,
        
        /**
         * @cfg {Number} [chartRangeMin] The minimum value to use for the range of Y values of the chart - Defaults to the minimum value supplied.
         */
        chartRangeMin: null,
        
        /**
         * @cfg {Boolean} chartRangeClip If true then the y values supplied to plot will be clipped to fall
         * between {@link #chartRangeMin} and {@link #chartRangeMax} - By default chartRangeMin/Max just ensure that the chart
         * spans at least that range of values, but does not constrain it.
         */
        chartRangeClip: false,
        
        tipTpl: new Ext.XTemplate('{prefix}{value}{suffix}')
    },

    // Ensure values is an array of numbers
    applyValues: function(newValues) {
        newValues = Ext.Array.map(Ext.Array.from(newValues), Number);
        this.disabled = !(newValues && newValues.length);
        return newValues;
    },

    onUpdate: function () {
        var me = this,
            values = me.values,
            chartRangeMin = me.getChartRangeMin(),
            chartRangeMax = me.getChartRangeMax(),
            chartRangeClip = me.getChartRangeClip();

        me.callParent(arguments);

        me.regionShapes = {};
        me.min = Math.min.apply(Math, values);
        me.max = Math.max.apply(Math, values);
        me.range = me.max - me.min;
        me.width = me.getWidth();
        me.interval = Math.floor(me.width / values.length);
        me.itemWidth = me.width / values.length;
        if (chartRangeMin != null && (chartRangeClip || chartRangeMin < me.min)) {
            me.min = chartRangeMin;
        }
        if (chartRangeMax != null && (chartRangeClip || chartRangeMax > me.max)) {
            me.max = chartRangeMax;
        }
        if (me.canvas) {
            if (me.getLineHeight() === 'auto') {
                me.setLineHeight(Math.round(me.getHeight() * 0.3));
            }
        }
    },

    getRegion: function (x, y) {
        return Math.floor(x / this.itemWidth);
    },

    getRegionFields: function (region) {
        return {
            isNull: this.values[region] === undefined,
            value: this.values[region],
            offset: region
        };
    },

    renderRegion: function (valuenum, highlight) {
        var me = this,
            values = me.values,
            min = me.min,
            max = me.max,
            range = me.range,
            interval = me.interval,
            canvas = me.canvas,
            canvasHeight = me.getHeight(),
            lineHeight = me.getLineHeight(),
            pheight = canvasHeight - lineHeight,
            ytop, val, color, x,
            thresholdColor = me.getThresholdColor();

        val = Ext.Number.constrain(values[valuenum], min, max);
        x = valuenum * interval;
        ytop = Math.round(pheight - pheight * ((val - min) / range));
        color = (thresholdColor && val < me.getThresholdValue()) ? thresholdColor : me.getLineColor();
        if (highlight) {
            color = me.calcHighlightColor(color);
        }
        canvas.drawLine(x, ytop, x, ytop + lineHeight, color).append();
    }
});