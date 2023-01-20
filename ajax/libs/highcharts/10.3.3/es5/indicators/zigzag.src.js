/**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Kacper Madej
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
                window.dispatchEvent(
                    new CustomEvent(
                        'HighchartsModuleLoaded',
                        { detail: { path: path, module: obj[path] }
                    })
                );
            }
        }
    }
    _registerModule(_modules, 'Stock/Indicators/Zigzag/ZigzagIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Kacper Madej
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
            var extendStatics = function (d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                if (typeof b !== "function" && b !== null)
                    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var SMAIndicator = SeriesRegistry.seriesTypes.sma;
        var merge = U.merge, extend = U.extend;
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
        var ZigzagIndicator = /** @class */ (function (_super) {
            __extends(ZigzagIndicator, _super);
            function ZigzagIndicator() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.data = void 0;
                _this.points = void 0;
                _this.options = void 0;
                return _this;
            }
            /* *
             *
             *  Functions
             *
             * */
            ZigzagIndicator.prototype.getValues = function (series, params) {
                var lowIndex = params.lowIndex, highIndex = params.highIndex, deviation = params.deviation / 100, deviations = {
                    'low': 1 + deviation,
                    'high': 1 - deviation
                }, xVal = series.xData, yVal = series.yData, yValLen = yVal ? yVal.length : 0, zigzag = [], xData = [], yData = [], i, j, zigzagPoint, firstZigzagLow, firstZigzagHigh, directionUp, zigzagLen, exitLoop = false, yIndex = false;
                // Exit if not enught points or no low or high values
                if (!xVal || xVal.length <= 1 ||
                    (yValLen &&
                        (typeof yVal[0][lowIndex] === 'undefined' ||
                            typeof yVal[0][highIndex] === 'undefined'))) {
                    return;
                }
                // Set first zigzag point candidate
                firstZigzagLow = yVal[0][lowIndex];
                firstZigzagHigh = yVal[0][highIndex];
                // Search for a second zigzag point candidate,
                // this will also set first zigzag point
                for (i = 1; i < yValLen; i++) {
                    // requried change to go down
                    if (yVal[i][lowIndex] <= firstZigzagHigh * deviations.high) {
                        zigzag.push([xVal[0], firstZigzagHigh]);
                        // second zigzag point candidate
                        zigzagPoint = [xVal[i], yVal[i][lowIndex]];
                        // next line will be going up
                        directionUp = true;
                        exitLoop = true;
                        // requried change to go up
                    }
                    else if (yVal[i][highIndex] >= firstZigzagLow * deviations.low) {
                        zigzag.push([xVal[0], firstZigzagLow]);
                        // second zigzag point candidate
                        zigzagPoint = [xVal[i], yVal[i][highIndex]];
                        // next line will be going down
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
                    if (directionUp) { // next line up
                        // lower when going down -> change zigzag candidate
                        if (yVal[i][lowIndex] <= zigzagPoint[1]) {
                            zigzagPoint = [xVal[i], yVal[i][lowIndex]];
                        }
                        // requried change to go down -> new zigzagpoint and
                        // direction change
                        if (yVal[i][highIndex] >=
                            zigzagPoint[1] * deviations.low) {
                            yIndex = highIndex;
                        }
                    }
                    else { // next line down
                        // higher when going up -> change zigzag candidate
                        if (yVal[i][highIndex] >= zigzagPoint[1]) {
                            zigzagPoint = [xVal[i], yVal[i][highIndex]];
                        }
                        // requried change to go down -> new zigzagpoint and
                        // direction change
                        if (yVal[i][lowIndex] <=
                            zigzagPoint[1] * deviations.high) {
                            yIndex = lowIndex;
                        }
                    }
                    if (yIndex !== false) { // new zigzag point and direction change
                        zigzag.push(zigzagPoint);
                        xData.push(zigzagPoint[0]);
                        yData.push(zigzagPoint[1]);
                        zigzagPoint = [xVal[i], yVal[i][yIndex]];
                        directionUp = !directionUp;
                        yIndex = false;
                    }
                }
                zigzagLen = zigzag.length;
                // no zigzag for last point
                if (zigzagLen !== 0 &&
                    zigzag[zigzagLen - 1][0] < xVal[yValLen - 1]) {
                    // set last point from zigzag candidate
                    zigzag.push(zigzagPoint);
                    xData.push(zigzagPoint[0]);
                    yData.push(zigzagPoint[1]);
                }
                return {
                    values: zigzag,
                    xData: xData,
                    yData: yData
                };
            };
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
            return ZigzagIndicator;
        }(SMAIndicator));
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
        ''; // adds doclets above to transpiled file

        return ZigzagIndicator;
    });
    _registerModule(_modules, 'masters/indicators/zigzag.src.js', [], function () {


    });
}));