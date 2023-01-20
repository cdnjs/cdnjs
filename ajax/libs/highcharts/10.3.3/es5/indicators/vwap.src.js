/**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Paweł Dalek
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/vwap', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Stock/Indicators/VWAP/VWAPIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Paweł Dalek
         *
         *  Volume Weighted Average Price (VWAP) indicator for Highcharts Stock
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
        var error = U.error, isArray = U.isArray, merge = U.merge;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Volume Weighted Average Price (VWAP) series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.vwap
         *
         * @augments Highcharts.Series
         */
        var VWAPIndicator = /** @class */ (function (_super) {
            __extends(VWAPIndicator, _super);
            function VWAPIndicator() {
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
            VWAPIndicator.prototype.getValues = function (series, params) {
                var indicator = this, chart = series.chart, xValues = series.xData, yValues = series.yData, period = params.period, isOHLC = true, volumeSeries;
                // Checks if volume series exists
                if (!(volumeSeries = (chart.get(params.volumeSeriesID)))) {
                    error('Series ' +
                        params.volumeSeriesID +
                        ' not found! Check `volumeSeriesID`.', true, chart);
                    return;
                }
                // Checks if series data fits the OHLC format
                if (!(isArray(yValues[0]))) {
                    isOHLC = false;
                }
                return indicator.calculateVWAPValues(isOHLC, xValues, yValues, volumeSeries, period);
            };
            /**
             * Main algorithm used to calculate Volume Weighted Average Price (VWAP)
             * values
             *
             * @private
             *
             * @param {boolean} isOHLC
             * Says if data has OHLC format
             *
             * @param {Array<number>} xValues
             * Array of timestamps
             *
             * @param {Array<number|Array<number,number,number,number>>} yValues
             * Array of yValues, can be an array of a four arrays (OHLC) or array of
             * values (line)
             *
             * @param {Array<*>} volumeSeries
             * Volume series
             *
             * @param {number} period
             * Number of points to be calculated
             *
             * @return {Object}
             * Object contains computed VWAP
             **/
            VWAPIndicator.prototype.calculateVWAPValues = function (isOHLC, xValues, yValues, volumeSeries, period) {
                var volumeValues = volumeSeries.yData, volumeLength = volumeSeries.xData.length, pointsLength = xValues.length, cumulativePrice = [], cumulativeVolume = [], xData = [], yData = [], VWAP = [], commonLength, typicalPrice, cPrice, cVolume, i, j;
                if (pointsLength <= volumeLength) {
                    commonLength = pointsLength;
                }
                else {
                    commonLength = volumeLength;
                }
                for (i = 0, j = 0; i < commonLength; i++) {
                    // Depending on whether series is OHLC or line type, price is
                    // average of the high, low and close or a simple value
                    typicalPrice = isOHLC ?
                        ((yValues[i][1] + yValues[i][2] +
                            yValues[i][3]) / 3) :
                        yValues[i];
                    typicalPrice *= volumeValues[i];
                    cPrice = j ?
                        (cumulativePrice[i - 1] + typicalPrice) :
                        typicalPrice;
                    cVolume = j ?
                        (cumulativeVolume[i - 1] + volumeValues[i]) :
                        volumeValues[i];
                    cumulativePrice.push(cPrice);
                    cumulativeVolume.push(cVolume);
                    VWAP.push([xValues[i], (cPrice / cVolume)]);
                    xData.push(VWAP[i][0]);
                    yData.push(VWAP[i][1]);
                    j++;
                    if (j === period) {
                        j = 0;
                    }
                }
                return {
                    values: VWAP,
                    xData: xData,
                    yData: yData
                };
            };
            /**
             * Volume Weighted Average Price indicator.
             *
             * This series requires `linkedTo` option to be set.
             *
             * @sample stock/indicators/vwap
             *         Volume Weighted Average Price indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/vwap
             * @optionparent plotOptions.vwap
             */
            VWAPIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
                /**
                 * @excluding index
                 */
                params: {
                    index: void 0,
                    period: 30,
                    /**
                     * The id of volume series which is mandatory. For example using
                     * OHLC data, volumeSeriesID='volume' means the indicator will be
                     * calculated using OHLC and volume values.
                     */
                    volumeSeriesID: 'volume'
                }
            });
            return VWAPIndicator;
        }(SMAIndicator));
        SeriesRegistry.registerSeriesType('vwap', VWAPIndicator);
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
         * A `Volume Weighted Average Price (VWAP)` series. If the
         * [type](#series.vwap.type) option is not specified, it is inherited from
         * [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.vwap
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/vwap
         * @apioption series.vwap
         */
        ''; // to include the above in the js output

        return VWAPIndicator;
    });
    _registerModule(_modules, 'masters/indicators/vwap.src.js', [], function () {


    });
}));