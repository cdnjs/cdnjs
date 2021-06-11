/**
 * @license Highstock JS v9.1.0 (2021-05-04)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/momentum', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'Stock/Indicators/Momentum/MomentumIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
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
        /* eslint-disable require-jsdoc */
        function populateAverage(xVal, yVal, i, period, index) {
            var mmY = yVal[i - 1][index] - yVal[i - period - 1][index],
                mmX = xVal[i - 1];
            return [mmX, mmY];
        }
        /* eslint-enable require-jsdoc */
        /**
         * The Momentum series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.momentum
         *
         * @augments Highcharts.Series
         */
        var MomentumIndicator = /** @class */ (function (_super) {
                __extends(MomentumIndicator, _super);
            function MomentumIndicator() {
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                return _this;
            }
            MomentumIndicator.prototype.getValues = function (series, params) {
                var period = params.period,
                    index = params.index,
                    xVal = series.xData,
                    yVal = series.yData,
                    yValLen = yVal ? yVal.length : 0,
                    yValue = yVal[0],
                    MM = [],
                    xData = [],
                    yData = [],
                    i,
                    MMPoint;
                if (xVal.length <= period) {
                    return;
                }
                // Switch index for OHLC / Candlestick / Arearange
                if (isArray(yVal[0])) {
                    yValue = yVal[0][index];
                }
                else {
                    return;
                }
                // Calculate value one-by-one for each period in visible data
                for (i = (period + 1); i < yValLen; i++) {
                    MMPoint = populateAverage(xVal, yVal, i, period, index);
                    MM.push(MMPoint);
                    xData.push(MMPoint[0]);
                    yData.push(MMPoint[1]);
                }
                MMPoint = populateAverage(xVal, yVal, i, period, index);
                MM.push(MMPoint);
                xData.push(MMPoint[0]);
                yData.push(MMPoint[1]);
                return {
                    values: MM,
                    xData: xData,
                    yData: yData
                };
            };
            /**
             * Momentum. This series requires `linkedTo` option to be set.
             *
             * @sample stock/indicators/momentum
             *         Momentum indicator
             *
             * @extends      plotOptions.sma
             * @since        6.0.0
             * @product      highstock
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/momentum
             * @optionparent plotOptions.momentum
             */
            MomentumIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
                params: {
                    index: 3
                }
            });
            return MomentumIndicator;
        }(SMAIndicator));
        extend(MomentumIndicator.prototype, {
            nameBase: 'Momentum'
        });
        SeriesRegistry.registerSeriesType('momentum', MomentumIndicator);
        /* *
         *
         *  Default Export
         *
         * */
        /**
         * A `Momentum` series. If the [type](#series.momentum.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.momentum
         * @since     6.0.0
         * @excluding dataParser, dataURL
         * @product   highstock
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/momentum
         * @apioption series.momentum
         */
        ''; // to include the above in the js output

        return MomentumIndicator;
    });
    _registerModule(_modules, 'masters/indicators/momentum.src.js', [], function () {


    });
}));