/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Color from '../../Color/Color.js';
const { parse: color } = Color;
import U from '../../Utilities.js';
const { merge } = U;
/* *
 *
 *  Namespace
 *
 * */
var ColorAxisLike;
(function (ColorAxisLike) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Initialize defined data classes.
     * @private
     */
    function initDataClasses(userOptions) {
        const axis = this, chart = axis.chart, legendItem = axis.legendItem = axis.legendItem || {}, options = axis.options, userDataClasses = userOptions.dataClasses || [];
        let dataClass, dataClasses, colorCount = chart.options.chart.colorCount, colorCounter = 0, colors;
        axis.dataClasses = dataClasses = [];
        legendItem.labels = [];
        for (let i = 0, iEnd = userDataClasses.length; i < iEnd; ++i) {
            dataClass = userDataClasses[i];
            dataClass = merge(dataClass);
            dataClasses.push(dataClass);
            if (!chart.styledMode && dataClass.color) {
                continue;
            }
            if (options.dataClassColor === 'category') {
                if (!chart.styledMode) {
                    colors = chart.options.colors || [];
                    colorCount = colors.length;
                    dataClass.color = colors[colorCounter];
                }
                dataClass.colorIndex = colorCounter;
                // Loop back to zero
                colorCounter++;
                if (colorCounter === colorCount) {
                    colorCounter = 0;
                }
            }
            else {
                dataClass.color = color(options.minColor).tweenTo(color(options.maxColor), iEnd < 2 ? 0.5 : i / (iEnd - 1) // #3219
                );
            }
        }
    }
    ColorAxisLike.initDataClasses = initDataClasses;
    /**
     * Create initial color stops.
     * @private
     */
    function initStops() {
        const axis = this, options = axis.options, stops = axis.stops = options.stops || [
            [0, options.minColor || ''],
            [1, options.maxColor || '']
        ];
        for (let i = 0, iEnd = stops.length; i < iEnd; ++i) {
            stops[i].color = color(stops[i][1]);
        }
    }
    ColorAxisLike.initStops = initStops;
    /**
     * Normalize logarithmic values.
     * @private
     */
    function normalizedValue(value) {
        const axis = this, max = axis.max || 0, min = axis.min || 0;
        if (axis.logarithmic) {
            value = axis.logarithmic.log2lin(value);
        }
        return 1 - ((max - value) /
            ((max - min) || 1));
    }
    ColorAxisLike.normalizedValue = normalizedValue;
    /**
     * Translate from a value to a color.
     * @private
     */
    function toColor(value, point) {
        const axis = this;
        const dataClasses = axis.dataClasses;
        const stops = axis.stops;
        let pos, from, to, color, dataClass, i;
        if (dataClasses) {
            i = dataClasses.length;
            while (i--) {
                dataClass = dataClasses[i];
                from = dataClass.from;
                to = dataClass.to;
                if ((typeof from === 'undefined' || value >= from) &&
                    (typeof to === 'undefined' || value <= to)) {
                    color = dataClass.color;
                    if (point) {
                        point.dataClass = i;
                        point.colorIndex = dataClass.colorIndex;
                    }
                    break;
                }
            }
        }
        else {
            pos = axis.normalizedValue(value);
            i = stops.length;
            while (i--) {
                if (pos > stops[i][0]) {
                    break;
                }
            }
            from = stops[i] || stops[i + 1];
            to = stops[i + 1] || from;
            // The position within the gradient
            pos = 1 - (to[0] - pos) / ((to[0] - from[0]) || 1);
            color = from.color.tweenTo(to.color, pos);
        }
        return color;
    }
    ColorAxisLike.toColor = toColor;
})(ColorAxisLike || (ColorAxisLike = {}));
/* *
 *
 *  Default Export
 *
 * */
export default ColorAxisLike;
