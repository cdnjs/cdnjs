/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Color from '../Color/Color.js';
const { parse: color } = Color;
import U from '../Utilities.js';
const { extend, merge } = U;
/**
 * @private
 */
var SolidGaugeAxis;
(function (SolidGaugeAxis) {
    /* *
     *
     *  Interfaces
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    /**
     * These methods are defined in the ColorAxis object, and copied here.
     * @private
     *
     * @todo
     * If we implement an AMD system we should make ColorAxis a dependency.
     */
    const methods = {
        initDataClasses: function (userOptions) {
            let chart = this.chart, dataClasses, colorCounter = 0, options = this.options;
            this.dataClasses = dataClasses = [];
            userOptions.dataClasses.forEach(function (dataClass, i) {
                let colors;
                dataClass = merge(dataClass);
                dataClasses.push(dataClass);
                if (!dataClass.color) {
                    if (options.dataClassColor === 'category') {
                        colors = chart.options.colors;
                        dataClass.color = colors[colorCounter++];
                        // loop back to zero
                        if (colorCounter === colors.length) {
                            colorCounter = 0;
                        }
                    }
                    else {
                        dataClass.color = color(options.minColor).tweenTo(color(options.maxColor), i / (userOptions.dataClasses.length - 1));
                    }
                }
            });
        },
        initStops: function (userOptions) {
            this.stops = userOptions.stops || [
                [0, this.options.minColor],
                [1, this.options.maxColor]
            ];
            this.stops.forEach(function (stop) {
                stop.color = color(stop[1]);
            });
        },
        // Translate from a value to a color
        toColor: function (value, point) {
            let pos, stops = this.stops, from, to, color, dataClasses = this.dataClasses, dataClass, i;
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
                        }
                        break;
                    }
                }
            }
            else {
                if (this.logarithmic) {
                    value = this.val2lin(value);
                }
                pos = 1 - ((this.max - value) / (this.max - this.min));
                i = stops.length;
                while (i--) {
                    if (pos > stops[i][0]) {
                        break;
                    }
                }
                from = stops[i] || stops[i + 1];
                to = stops[i + 1] || from;
                // The position within the gradient
                pos = (1 - (to[0] - pos) / ((to[0] -
                    from[0]) || 1));
                color = from.color.tweenTo(to.color, pos);
            }
            return color;
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    function init(axis) {
        extend(axis, methods);
    }
    SolidGaugeAxis.init = init;
})(SolidGaugeAxis || (SolidGaugeAxis = {}));
/* *
 *
 *  Default export
 *
 * */
export default SolidGaugeAxis;
