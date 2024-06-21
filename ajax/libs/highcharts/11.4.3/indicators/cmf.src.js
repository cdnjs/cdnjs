/**
 * @license Highstock JS v11.4.3 (2024-05-22)
 *
 * (c) 2010-2024 Highsoft AS
 * Author: Sebastian Domas
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/cmf', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
                window.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Stock/Indicators/CMF/CMFIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2024 Highsoft AS
         *
         *  Author: Sebastian Domas
         *
         *  Chaikin Money Flow indicator for Highcharts Stock
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The CMF series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.cmf
         *
         * @augments Highcharts.Series
         */
        class CMFIndicator extends SMAIndicator {
            constructor() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                super(...arguments);
                this.nameBase = 'Chaikin Money Flow';
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Checks if the series and volumeSeries are accessible, number of
             * points.x is longer than period, is series has OHLC data
             * @private
             * @param {Highcharts.CMFIndicator} this indicator to use.
             * @return {boolean} True if series is valid and can be computed,
             * otherwise false.
             */
            isValid() {
                const chart = this.chart, options = this.options, series = this.linkedParent, volumeSeries = (this.volumeSeries ||
                    (this.volumeSeries =
                        chart.get(options.params.volumeSeriesID))), isSeriesOHLC = (series &&
                    series.yData &&
                    series.yData[0].length === 4);
                /**
                 * @private
                 * @param {Highcharts.Series} serie to check length validity on.
                 * @return {boolean|undefined} true if length is valid.
                 */
                function isLengthValid(serie) {
                    return serie.xData &&
                        serie.xData.length >= options.params.period;
                }
                return !!(series &&
                    volumeSeries &&
                    isLengthValid(series) &&
                    isLengthValid(volumeSeries) && isSeriesOHLC);
            }
            /**
             * Returns indicator's data.
             * @private
             * @param {Highcharts.CMFIndicator} this indicator to use.
             * @param {Highcharts.Series} series to calculate values from
             * @param {Highcharts.CMFIndicatorParamsOptions} params to pass
             * @return {boolean|Highcharts.IndicatorNullableValuesObject} Returns false if the
             * indicator is not valid, otherwise returns Values object.
             */
            getValues(series, params) {
                if (!this.isValid()) {
                    return;
                }
                return this.getMoneyFlow(series.xData, series.yData, this.volumeSeries.yData, params.period);
            }
            /**
             * @private
             *
             * @param {Array<number>} xData
             * x timestamp values
             *
             * @param {Array<number>} seriesYData
             * yData of basic series
             *
             * @param {Array<number>} volumeSeriesYData
             * yData of volume series
             *
             * @param {number} period
             * indicator's param
             *
             * @return {Highcharts.IndicatorNullableValuesObject}
             * object containing computed money flow data
             */
            getMoneyFlow(xData, seriesYData, volumeSeriesYData, period) {
                const len = seriesYData.length, moneyFlowVolume = [], moneyFlowXData = [], moneyFlowYData = [], values = [];
                let i, point, nullIndex = -1, sumVolume = 0, sumMoneyFlowVolume = 0;
                /**
                 * Calculates money flow volume, changes i, nullIndex vars from
                 * upper scope!
                 *
                 * @private
                 *
                 * @param {Array<number>} ohlc
                 * OHLC point
                 *
                 * @param {number} volume
                 * Volume point's y value
                 *
                 * @return {number|null}
                 * Volume * moneyFlowMultiplier
                 */
                function getMoneyFlowVolume(ohlc, volume) {
                    const high = ohlc[1], low = ohlc[2], close = ohlc[3], isValid = volume !== null &&
                        high !== null &&
                        low !== null &&
                        close !== null &&
                        high !== low;
                    /**
                     * @private
                     * @param {number} h
                     * High value
                     * @param {number} l
                     * Low value
                     * @param {number} c
                     * Close value
                     * @return {number}
                     * Calculated multiplier for the point
                     */
                    function getMoneyFlowMultiplier(h, l, c) {
                        return ((c - l) - (h - c)) / (h - l);
                    }
                    return isValid ?
                        getMoneyFlowMultiplier(high, low, close) * volume :
                        ((nullIndex = i), null);
                }
                if (period > 0 && period <= len) {
                    for (i = 0; i < period; i++) {
                        moneyFlowVolume[i] = getMoneyFlowVolume(seriesYData[i], volumeSeriesYData[i]);
                        sumVolume += volumeSeriesYData[i];
                        sumMoneyFlowVolume += moneyFlowVolume[i];
                    }
                    moneyFlowXData.push(xData[i - 1]);
                    moneyFlowYData.push(i - nullIndex >= period && sumVolume !== 0 ?
                        sumMoneyFlowVolume / sumVolume :
                        null);
                    values.push([moneyFlowXData[0], moneyFlowYData[0]]);
                    for (; i < len; i++) {
                        moneyFlowVolume[i] = getMoneyFlowVolume(seriesYData[i], volumeSeriesYData[i]);
                        sumVolume -= volumeSeriesYData[i - period];
                        sumVolume += volumeSeriesYData[i];
                        sumMoneyFlowVolume -= moneyFlowVolume[i - period];
                        sumMoneyFlowVolume += moneyFlowVolume[i];
                        point = [
                            xData[i],
                            i - nullIndex >= period ?
                                sumMoneyFlowVolume / sumVolume :
                                null
                        ];
                        moneyFlowXData.push(point[0]);
                        moneyFlowYData.push(point[1]);
                        values.push([point[0], point[1]]);
                    }
                }
                return {
                    values: values,
                    xData: moneyFlowXData,
                    yData: moneyFlowYData
                };
            }
        }
        /**
         * Chaikin Money Flow indicator (cmf).
         *
         * @sample stock/indicators/cmf/
         *         Chaikin Money Flow indicator
         *
         * @extends      plotOptions.sma
         * @since        6.0.0
         * @excluding    animationLimit
         * @product      highstock
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/cmf
         * @optionparent plotOptions.cmf
         */
        CMFIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
            /**
             * @excluding index
             */
            params: {
                index: void 0,
                /**
                 * The id of another series to use its data as volume data for the
                 * indicator calculation.
                 */
                volumeSeriesID: 'volume'
            }
        });
        SeriesRegistry.registerSeriesType('cmf', CMFIndicator);
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
         * A `CMF` series. If the [type](#series.cmf.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.cmf
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/cmf
         * @apioption series.cmf
         */
        ''; // Adds doclet above to the transpiled file

        return CMFIndicator;
    });
    _registerModule(_modules, 'masters/indicators/cmf.src.js', [_modules['Core/Globals.js']], function (Highcharts) {


        return Highcharts;
    });
}));