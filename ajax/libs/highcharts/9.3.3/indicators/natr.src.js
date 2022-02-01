/**
 * @license Highstock JS v9.3.3 (2022-02-01)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Paweł Dalek
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/natr', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Stock/Indicators/NATR/NATRIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
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
        var ATRIndicator = SeriesRegistry.seriesTypes.atr;
        var merge = U.merge,
            extend = U.extend;
        /**
         * The NATR series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.natr
         *
         * @augments Highcharts.Series
         */
        var NATRIndicator = /** @class */ (function (_super) {
                __extends(NATRIndicator, _super);
            function NATRIndicator() {
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /**
                 * @lends Highcharts.Series#
                 */
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
            NATRIndicator.prototype.getValues = function (series, params) {
                var atrData = (ATRIndicator.prototype.getValues.apply(this,
                    arguments)),
                    atrLength = atrData.values.length,
                    period = params.period - 1,
                    yVal = series.yData,
                    i = 0;
                if (!atrData) {
                    return;
                }
                for (; i < atrLength; i++) {
                    atrData.yData[i] = (atrData.values[i][1] / yVal[period][3] * 100);
                    atrData.values[i][1] = atrData.yData[i];
                    period++;
                }
                return atrData;
            };
            /**
             * Normalized average true range indicator (NATR). This series requires
             * `linkedTo` option to be set and should be loaded after the
             * `stock/indicators/indicators.js` and `stock/indicators/atr.js`.
             *
             * @sample {highstock} stock/indicators/natr
             *         NATR indicator
             *
             * @extends      plotOptions.atr
             * @since        7.0.0
             * @product      highstock
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/natr
             * @optionparent plotOptions.natr
             */
            NATRIndicator.defaultOptions = merge(ATRIndicator.defaultOptions, {
                tooltip: {
                    valueSuffix: '%'
                }
            });
            return NATRIndicator;
        }(ATRIndicator));
        SeriesRegistry.registerSeriesType('natr', NATRIndicator);
        /* *
         *
         *  Default Export
         *
         * */
        /**
         * A `NATR` series. If the [type](#series.natr.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.natr
         * @since     7.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/atr
         * @requires  stock/indicators/natr
         * @apioption series.natr
         */
        ''; // to include the above in the js output'

        return NATRIndicator;
    });
    _registerModule(_modules, 'masters/indicators/natr.src.js', [], function () {


    });
}));