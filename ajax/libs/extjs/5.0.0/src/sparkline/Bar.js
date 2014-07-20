/**
 * @class Ext.sparkline.Bar
 *
 * Plots a bar chart of the values in the passed {@link #values} array.
 */
Ext.define('Ext.sparkline.Bar', {
    extend: 'Ext.sparkline.BarBase',
    requires: [
        'Ext.sparkline.RangeMap'
    ],

    alias: 'widget.sparklinebar',

    config: {

        /**
         * @cfg {String} [barColor=#3366cc] The bar color for positive values.
         */
        barColor: '#3366cc',
        
        /**
         * @cfg {String} [negBarColor=#f44] The bar color for negative values.
         */
        negBarColor: '#f44',
        
        /**
         * @cfg {String[]} [stackedBarColor] An array of colours to use for stacked bar charts.
         * The first series will use the first value in the array, the second series will use the second, etc. 
         */
        stackedBarColor: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#66aa00', '#dd4477', '#0099c6', '#990099'],
        
        /**
         * @cfg {String} [zeroColor] The bar color for zero values.
         */
        zeroColor: null,
        
        /**
         * @cfg {String} [nullColor] The bar color for null values. Usually null values are omitted and not plotted. Setting
         * this config causes a very thin bar to be plotted with the special color in the case thath null is a meaningful value in the series.
         */
        nullColor: null,
        
        /**
         * @cfg {Boolean} [zeroAxis=true] Centers the Y axis at zero by default.
         */
        zeroAxis: true,
        
        /**
         * @cfg {Number} [barWidth=4] The pixel width of bars.
         */
        barWidth: 4,
        
        /**
         * @cfg {Number} [barSpacing=1] The pixel spacing between bars.
         */
        barSpacing: 1,
        
        /**
         * @cfg {Number} [chartRangeMin] The minimum value to use for the range of Y values of the chart - Defaults to the minimum value supplied.
         */
        chartRangeMin: null,
        
        /**
         * @cfg {Number} [chartRangeMax] The maximum value to use for the range of Y values of the chart - Defaults to the minimum value supplied.
         */
        chartRangeMax: null,
        
        /**
         * @cfg {Boolean} chartRangeClip If true then the y values supplied to plot will be clipped to fall
         * between {@link #chartRangeMin} and {@link #chartRangeMax} - By default chartRangeMin/Max just ensure that the chart
         * spans at least that range of values, but does not constrain it.
         */
        chartRangeClip: false,
        
        /**
         * @cfg {} []
         */
        colorMap: null,
        
        tipTpl: new Ext.XTemplate('&#9679; {prefix}{value}{suffix}')
    },

    remove: function (vals, filter) {
        var i, vl, result = [];
        for (i = 0, vl = vals.length; i < vl; i++) {
            if (vals[i] !== filter) {
                result.push(vals[i]);
            }
        }
        return result;
    },

    // determine if all values of an array match a value
    // returns true if the array is empty
    all: function(arr, val, ignoreNull) {
        var i;
        for (i = arr.length; i--; ) {
            if (ignoreNull && arr[i] === null) continue;
            if (arr[i] !== val) {
                return false;
            }
        }
        return true;
    },

    applyColorMap: function(colorMap) {
        var me = this;

        if (Ext.isArray(colorMap)) {
            me.colorMapByIndex = colorMap;
            me.colorMapByValue = null;
        } else {
            me.colorMapByIndex = null;
            me.colorMapByValue = colorMap;
            if (me.colorMapByValue && me.colorMapByValue.get == null) {
                me.colorMapByValue = new Ext.sparkline.RangeMap(colorMap);
            }
        }
        return colorMap;
    },

    onUpdate: function () {
        var me = this,
            values = me.values,
            barWidth = me.getBarWidth(),
            barSpacing = me.getBarSpacing(),
            chartRangeMin = me.getChartRangeMin(),
            chartRangeMax = me.getChartRangeMax(),
            chartRangeClip = me.getChartRangeClip(),
            stackMin = Infinity,
            stackMax = -Infinity,
            isStackString, groupMin, groupMax, stackRanges,
            numValues, i, vlen, range, zeroAxis = me.getZeroAxis(), xAxisOffset, min, max, clipMin, clipMax,
            stacked, vlist, j, slen, svals, val, yoffset, yMaxCalc,
            stackTotals = [],
            stackRangesNeg = [];

        // scan values to determine whether to stack bars
        for (i = 0, vlen = values.length; i < vlen; i++) {
            val = values[i];
            isStackString = typeof(val) === 'string' && val.indexOf(':') > -1;
            if (isStackString || Ext.isArray(val)) {
                stacked = true;
                if (isStackString) {
                    val = values[i] = me.normalizeValues(val.split(':'));
                }
                val = me.remove(val, null); // min/max will treat null as zero
                groupMin = Math.min.apply(Math, val);
                groupMax = Math.max.apply(Math, val);
                if (groupMin < stackMin) {
                    stackMin = groupMin;
                }
                if (groupMax > stackMax) {
                    stackMax = groupMax;
                }
            }
        }

        me.stacked = stacked;
        me.regionShapes = {};
        me.totalBarWidth = barWidth + barSpacing;
        me.width = (values.length * barWidth) + ((values.length - 1) * barSpacing);

        if (chartRangeClip) {
            clipMin = chartRangeMin == null ? -Infinity : chartRangeMin;
            clipMax = chartRangeMax == null ? Infinity : chartRangeMax;
        }

        numValues = [];
        stackRanges = stacked ? [] : numValues;
        for (i = 0, vlen = values.length; i < vlen; i++) {
            if (stacked) {
                vlist = values[i];
                values[i] = svals = [];
                stackTotals[i] = 0;
                stackRanges[i] = stackRangesNeg[i] = 0;
                for (j = 0, slen = vlist.length; j < slen; j++) {
                    val = svals[j] = chartRangeClip ? Ext.Number.constrain(vlist[j], clipMin, clipMax) : vlist[j];
                    if (val !== null) {
                        if (val > 0) {
                            stackTotals[i] += val;
                        }
                        if (stackMin < 0 && stackMax > 0) {
                            if (val < 0) {
                                stackRangesNeg[i] += Math.abs(val);
                            } else {
                                stackRanges[i] += val;
                            }
                        } else {
                            stackRanges[i] += Math.abs(val - (val < 0 ? stackMax : stackMin));
                        }
                        numValues.push(val);
                    }
                }
            } else {
                val = chartRangeClip ? Ext.Number.constrain(values[i], clipMin, clipMax) : values[i];
                val = values[i] = me.normalizeValue(val);
                if (val !== null) {
                    numValues.push(val);
                }
            }
        }
        me.max = max = Math.max.apply(Math, numValues);
        me.min = min = Math.min.apply(Math, numValues);
        me.stackMax = stackMax = stacked ? Math.max.apply(Math, stackTotals) : max;
        me.stackMin = stackMin = stacked ? Math.min.apply(Math, numValues) : min;

        if (chartRangeMin != null && (chartRangeClip || chartRangeMin < min)) {
            min = chartRangeMin;
        }
        if (chartRangeMax != null && (chartRangeClip || chartRangeMax > max)) {
            max = chartRangeMax;
        }

        if (min <= 0 && max >= 0 && zeroAxis) {
            xAxisOffset = 0;
        } else if (zeroAxis == false) {
            xAxisOffset = min;
        } else if (min > 0) {
            xAxisOffset = min;
        } else {
            xAxisOffset = max;
        }
        me.xAxisOffset = xAxisOffset;

        range = stacked ? (Math.max.apply(Math, stackRanges) + Math.max.apply(Math, stackRangesNeg)) : max - min;

        // as we plot zero/min values a single pixel line, we add a pixel to all other
        // values - Reduce the effective canvas size to suit
        me.canvasHeightEf = (zeroAxis && min < 0) ? me.getHeight() - 2 : me.getHeight() - 1;

        if (min < xAxisOffset) {
            yMaxCalc = (stacked && max >= 0) ? stackMax : max;
            yoffset = (yMaxCalc - xAxisOffset) / range * me.getHeight();
            if (yoffset !== Math.ceil(yoffset)) {
                me.canvasHeightEf -= 2;
                yoffset = Math.ceil(yoffset);
            }
        } else {
            yoffset = me.getHeight();
        }
        me.yoffset = yoffset;
        me.range = range;

    },

    getRegion: function (x, y) {
        var result = Math.floor(x / this.totalBarWidth);
        return (result < 0 || result >= this.values.length) ? undefined : result;
    },

    getRegionFields: function (region) {
        var values = Ext.Array.from(this.values[region]),
            result = [],
            value, i;
        for (i = values.length; i--;) {
            value = values[i];
            result.push({
                isNull: value === null,
                value: value,
                color: this.calcColor(i, value, region),
                offset: region
            });
        }
        return result;
    },

    calcColor: function (stacknum, value, valuenum) {
        var me = this,
            colorMapByIndex = me.colorMapByIndex,
            colorMapByValue = me.colorMapByValue,
            color, newColor,
            zeroColor = me.getZeroColor();

        if (this.stacked) {
            color = me.getStackedBarColor();
        } else {
            color = (value < 0) ? me.getNegBarColor() : me.getBarColor();
        }
        if (value === 0 && zeroColor !== undefined) {
            color = zeroColor;
        }
        if (colorMapByValue && (newColor = colorMapByValue.get(value))) {
            color = newColor;
        } else if (colorMapByIndex && colorMapByIndex.length > valuenum) {
            color = colorMapByIndex[valuenum];
        }
        return Ext.isArray(color) ? color[stacknum % color.length] : color;
    },

    /*
     * Render bar(s) for a region
     */
    renderRegion: function(valuenum, highlight) {
        var me = this,
            vals = me.values[valuenum],
            xaxisOffset = me.xAxisOffset,
            range = me.range,
            stacked = me.stacked,
            canvas = me.canvas,
            barWidth = me.getBarWidth(),
            x = valuenum * me.totalBarWidth,
            canvasHeightEf = me.canvasHeightEf,
            yoffset = me.yoffset,
            y, height, color, isNull, yoffsetNeg, i, valcount, val, minPlotted, allMin,
            nullColor = me.getNullColor();

        vals = Ext.isArray(vals) ? vals : [vals];
        valcount = vals.length;
        val = vals[0];
        isNull = me.all(vals, null);
        allMin = me.all(vals, xaxisOffset, true);

        if (isNull) {
            if (nullColor) {
                color = highlight ? nullColor : me.calcHighlightColor(nullColor, me);
                y = (yoffset > 0) ? yoffset - 1 : yoffset;
                canvas.drawRect(x, y, barWidth - 1, 0, color, color).append();
            }
            return;
        }
        yoffsetNeg = yoffset;
        for (i = 0; i < valcount; i++) {
            val = vals[i];

            if (stacked && val === xaxisOffset) {
                if (!allMin || minPlotted) {
                    continue;
                }
                minPlotted = true;
            }

            if (range > 0) {
                height = Math.floor(canvasHeightEf * ((Math.abs(val - xaxisOffset) / range))) + 1;
            } else {
                height = 1;
            }
            if (val < xaxisOffset || (val === xaxisOffset && yoffset === 0)) {
                y = yoffsetNeg;
                yoffsetNeg += height;
            } else {
                y = yoffset - height;
                yoffset -= height;
            }
            color = me.calcColor(i, val, valuenum);
            if (highlight) {
                color = me.calcHighlightColor(color, me);
            }
            canvas.drawRect(x, y, barWidth - 1, height - 1, color, color).append();
        }
    }
}, function(cls) {
    cls.onClassCreated(cls);
});