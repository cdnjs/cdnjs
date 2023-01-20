/**
 * @license Highstock JS v10.3.3 (2023-01-20)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/trix', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Stock/Indicators/TRIX/TRIXIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
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
        var TEMAIndicator = SeriesRegistry.seriesTypes.tema;
        var correctFloat = U.correctFloat, merge = U.merge;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The TRIX series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.trix
         *
         * @augments Highcharts.Series
         */
        var TRIXIndicator = /** @class */ (function (_super) {
            __extends(TRIXIndicator, _super);
            function TRIXIndicator() {
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
                _this.options = void 0;
                _this.points = void 0;
                return _this;
            }
            /* *
             *
             *  Functions
             *
             * */
            // TRIX is calculated using TEMA so we just extend getTemaPoint method.
            TRIXIndicator.prototype.getTemaPoint = function (xVal, tripledPeriod, EMAlevels, i) {
                if (i > tripledPeriod) {
                    return [
                        xVal[i - 3],
                        EMAlevels.prevLevel3 !== 0 ?
                            correctFloat(EMAlevels.level3 - EMAlevels.prevLevel3) /
                                EMAlevels.prevLevel3 * 100 : null
                    ];
                }
            };
            /**
             * Triple exponential average (TRIX) oscillator. This series requires
             * `linkedTo` option to be set.
             *
             * @sample {highstock} stock/indicators/trix
             * TRIX indicator
             *
             * @extends      plotOptions.tema
             * @since        7.0.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, compare, compareBase, joinBy, keys,
             *               navigatorOptions, pointInterval, pointIntervalUnit,
             *               pointPlacement, pointRange, pointStart, showInNavigator,
             *               stacking
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/tema
             * @requires     stock/indicators/trix
             * @optionparent plotOptions.trix
             */
            TRIXIndicator.defaultOptions = merge(TEMAIndicator.defaultOptions);
            return TRIXIndicator;
        }(TEMAIndicator));
        SeriesRegistry.registerSeriesType('trix', TRIXIndicator);
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
         * A `TRIX` series. If the [type](#series.trix.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.trix
         * @since     7.0.0
         * @product   highstock
         * @excluding allAreas, colorAxis, compare, compareBase, dataParser, dataURL,
         *            joinBy, keys, navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/tema
         * @apioption series.trix
         */
        ''; // to include the above in the js output

        return TRIXIndicator;
    });
    _registerModule(_modules, 'masters/indicators/trix.src.js', [], function () {


    });
}));