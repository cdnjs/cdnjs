/**
 * @license Highstock JS v11.4.8 (2024-08-29)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Kacper Madej
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/zigzag', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                Highcharts.win.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Stock/Indicators/Zigzag/ZigzagIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Kacper Madej
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { merge, extend } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Zig Zag series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.zigzag
         *
         * @augments Highcharts.Series
         */
        class ZigzagIndicator extends SMAIndicator {
            /* *
             *
             *  Functions
             *
             * */
            getValues(series, params) {
                const lowIndex = params.lowIndex, highIndex = params.highIndex, deviation = params.deviation / 100, deviations = {
                    'low': 1 + deviation,
                    'high': 1 - deviation
                }, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, zigzag = [], xData = [], yData = [];
                let i, j, zigzagPoint, directionUp, exitLoop = false, yIndex = false;
                // Exit if not enough points or no low or high values
                if (!xVal || xVal.length <= 1 ||
                    (yValLen &&
                        (typeof yVal[0][lowIndex] === 'undefined' ||
                            typeof yVal[0][highIndex] === 'undefined'))) {
                    return;
                }
                // Set first zigzag point candidate
                const firstZigzagLow = yVal[0][lowIndex], firstZigzagHigh = yVal[0][highIndex];
                // Search for a second zigzag point candidate,
                // this will also set first zigzag point
                for (i = 1; i < yValLen; i++) {
                    // Required change to go down
                    if (yVal[i][lowIndex] <= firstZigzagHigh * deviations.high) {
                        zigzag.push([xVal[0], firstZigzagHigh]);
                        // Second zigzag point candidate
                        zigzagPoint = [xVal[i], yVal[i][lowIndex]];
                        // Next line will be going up
                        directionUp = true;
                        exitLoop = true;
                        // Required change to go up
                    }
                    else if (yVal[i][highIndex] >= firstZigzagLow * deviations.low) {
                        zigzag.push([xVal[0], firstZigzagLow]);
                        // Second zigzag point candidate
                        zigzagPoint = [xVal[i], yVal[i][highIndex]];
                        // Next line will be going down
                        directionUp = false;
                        exitLoop = true;
                    }
                    if (exitLoop) {
                        xData.push(zigzag[0][0]);
                        yData.push(zigzag[0][1]);
                        j = i++;
                        i = yValLen;
                    }
                }
                // Search for next zigzags
                for (i = j; i < yValLen; i++) {
                    if (directionUp) { // Next line up
                        // lower when going down -> change zigzag candidate
                        if (yVal[i][lowIndex] <= zigzagPoint[1]) {
                            zigzagPoint = [xVal[i], yVal[i][lowIndex]];
                        }
                        // Required change to go down -> new zigzagpoint and
                        // direction change
                        if (yVal[i][highIndex] >=
                            zigzagPoint[1] * deviations.low) {
                            yIndex = highIndex;
                        }
                    }
                    else { // Next line down
                        // higher when going up -> change zigzag candidate
                        if (yVal[i][highIndex] >= zigzagPoint[1]) {
                            zigzagPoint = [xVal[i], yVal[i][highIndex]];
                        }
                        // Required change to go down -> new zigzagpoint and
                        // direction change
                        if (yVal[i][lowIndex] <=
                            zigzagPoint[1] * deviations.high) {
                            yIndex = lowIndex;
                        }
                    }
                    if (yIndex !== false) { // New zigzag point and direction change
                        zigzag.push(zigzagPoint);
                        xData.push(zigzagPoint[0]);
                        yData.push(zigzagPoint[1]);
                        zigzagPoint = [xVal[i], yVal[i][yIndex]];
                        directionUp = !directionUp;
                        yIndex = false;
                    }
                }
                const zigzagLen = zigzag.length;
                // No zigzag for last point
                if (zigzagLen !== 0 &&
                    zigzag[zigzagLen - 1][0] < xVal[yValLen - 1]) {
                    // Set last point from zigzag candidate
                    zigzag.push(zigzagPoint);
                    xData.push(zigzagPoint[0]);
                    yData.push(zigzagPoint[1]);
                }
                return {
                    values: zigzag,
                    xData: xData,
                    yData: yData
                };
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Zig Zag indicator.
         *
         * This series requires `linkedTo` option to be set.
         *
         * @sample stock/indicators/zigzag
         *         Zig Zag indicator
         *
         * @extends      plotOptions.sma
         * @since        6.0.0
         * @product      highstock
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/zigzag
         * @optionparent plotOptions.zigzag
         */
        ZigzagIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
            /**
             * @excluding index, period
             */
            params: {
                // Index and period are unchangeable, do not inherit (#15362)
                index: void 0,
                period: void 0,
                /**
                 * The point index which indicator calculations will base - low
                 * value.
                 *
                 * For example using OHLC data, index=2 means the indicator will be
                 * calculated using Low values.
                 */
                lowIndex: 2,
                /**
                 * The point index which indicator calculations will base - high
                 * value.
                 *
                 * For example using OHLC data, index=1 means the indicator will be
                 * calculated using High values.
                 */
                highIndex: 1,
                /**
                 * The threshold for the value change.
                 *
                 * For example deviation=1 means the indicator will ignore all price
                 * movements less than 1%.
                 */
                deviation: 1
            }
        });
        extend(ZigzagIndicator.prototype, {
            nameComponents: ['deviation'],
            nameSuffixes: ['%'],
            nameBase: 'Zig Zag'
        });
        SeriesRegistry.registerSeriesType('zigzag', ZigzagIndicator);
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * A `Zig Zag` series. If the [type](#series.zigzag.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.zigzag
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/zigzag
         * @apioption series.zigzag
         */
        ''; // Adds doclets above to transpiled file

        return ZigzagIndicator;
    });
    _registerModule(_modules, 'masters/indicators/zigzag.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));
