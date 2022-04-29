/**
 * @license Highstock JS v10.1.0 (2022-04-29)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/williams-r', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Stock/Indicators/ArrayUtilities.js', [], function () {
        /**
         *
         *  (c) 2010-2021 Pawel Fus & Daniel Studencki
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Get extremes of array filled by OHLC data.
         *
         * @private
         *
         * @param {Array<Array<number>>} arr
         * Array of OHLC points (arrays).
         *
         * @param {number} minIndex
         * Index of "low" value in point array.
         *
         * @param {number} maxIndex
         * Index of "high" value in point array.
         *
         * @return {Array<number,number>}
         * Returns array with min and max value.
         */
        function getArrayExtremes(arr, minIndex, maxIndex) {
            return arr.reduce(function (prev, target) { return [
                Math.min(prev[0], target[minIndex]),
                Math.max(prev[1], target[maxIndex])
            ]; }, [Number.MAX_VALUE, -Number.MAX_VALUE]);
        }
        /* *
         *
         *  Default Export
         *
         * */
        var ArrayUtilities = {
                getArrayExtremes: getArrayExtremes
            };

        return ArrayUtilities;
    });
    _registerModule(_modules, 'Stock/Indicators/WilliamsR/WilliamsRIndicator.js', [_modules['Stock/Indicators/ArrayUtilities.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (AU, SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var SMAIndicator = SeriesRegistry.seriesTypes.sma;
        var extend = U.extend,
            isArray = U.isArray,
            merge = U.merge;
        /**
         * The Williams %R series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.williamsr
         *
         * @augments Highcharts.Series
         */
        var WilliamsRIndicator = /** @class */ (function (_super) {
                __extends(WilliamsRIndicator, _super);
            function WilliamsRIndicator() {
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                return _this;
            }
            WilliamsRIndicator.prototype.getValues = function (series, params) {
                var period = params.period,
                    xVal = series.xData,
                    yVal = series.yData,
                    yValLen = yVal ? yVal.length : 0,
                    WR = [], // 0- date, 1- Williams %R
                    xData = [],
                    yData = [],
                    slicedY,
                    close = 3,
                    low = 2,
                    high = 1,
                    extremes,
                    R,
                    HH, // Highest high value in period
                    LL, // Lowest low value in period
                    CC, // Current close value
                    i;
                // Williams %R requires close value
                if (xVal.length < period ||
                    !isArray(yVal[0]) ||
                    yVal[0].length !== 4) {
                    return;
                }
                // For a N-period, we start from N-1 point, to calculate Nth point
                // That is why we later need to comprehend slice() elements list
                // with (+1)
                for (i = period - 1; i < yValLen; i++) {
                    slicedY = yVal.slice(i - period + 1, i + 1);
                    extremes = AU.getArrayExtremes(slicedY, low, high);
                    LL = extremes[0];
                    HH = extremes[1];
                    CC = yVal[i][close];
                    R = ((HH - CC) / (HH - LL)) * -100;
                    if (xVal[i]) {
                        WR.push([xVal[i], R]);
                        xData.push(xVal[i]);
                        yData.push(R);
                    }
                }
                return {
                    values: WR,
                    xData: xData,
                    yData: yData
                };
            };
            /**
             * Williams %R. This series requires the `linkedTo` option to be
             * set and should be loaded after the `stock/indicators/indicators.js`.
             *
             * @sample {highstock} stock/indicators/williams-r
             *         Williams %R
             *
             * @extends      plotOptions.sma
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
             *               pointInterval, pointIntervalUnit, pointPlacement,
             *               pointRange, pointStart, showInNavigator, stacking
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/williams-r
             * @optionparent plotOptions.williamsr
             */
            WilliamsRIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
                /**
                 * Paramters used in calculation of Williams %R series points.
                 * @excluding index
                 */
                params: {
                    index: void 0,
                    /**
                     * Period for Williams %R oscillator
                     */
                    period: 14
                }
            });
            return WilliamsRIndicator;
        }(SMAIndicator));
        extend(WilliamsRIndicator.prototype, {
            nameBase: 'Williams %R'
        });
        SeriesRegistry.registerSeriesType('williamsr', WilliamsRIndicator);
        /* *
         *
         *  Default Export
         *
         * */
        /**
         * A `Williams %R Oscillator` series. If the [type](#series.williamsr.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.williamsr
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/williams-r
         * @apioption series.williamsr
         */
        ''; // adds doclets above to the transpiled file

        return WilliamsRIndicator;
    });
    _registerModule(_modules, 'masters/indicators/williams-r.src.js', [], function () {


    });
}));