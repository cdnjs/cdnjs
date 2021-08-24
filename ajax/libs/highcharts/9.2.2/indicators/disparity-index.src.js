/**
 * @license Highstock JS v9.2.2 (2021-08-24)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2021 Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/disparity-index', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Mixins/IndicatorRequired.js', [_modules['Core/Utilities.js']], function (U) {
        /**
         *
         *  (c) 2010-2021 Daniel Studencki
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var error = U.error;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        var requiredIndicatorMixin = {
                /**
                 * Check whether given indicator is loaded,
            else throw error.
                 * @private
                 * @param {Highcharts.Indicator} indicator
                 *        Indicator constructor function.
                 * @param {string} requiredIndicator
                 *        Required indicator type.
                 * @param {string} type
                 *        Type of indicator where function was called (parent).
                 * @param {Highcharts.IndicatorCallbackFunction} callback
                 *        Callback which is triggered if the given indicator is loaded.
                 *        Takes indicator as an argument.
                 * @param {string} errMessage
                 *        Error message that will be logged in console.
                 * @return {boolean}
                 *         Returns false when there is no required indicator loaded.
                 */
                isParentLoaded: function (indicator,
            requiredIndicator,
            type,
            callback,
            errMessage) {
                    if (indicator) {
                        return callback ? callback(indicator) : true;
                }
                error(errMessage || this.generateMessage(type, requiredIndicator));
                return false;
            },
            /**
             * @private
             * @param {string} indicatorType
             *        Indicator type
             * @param {string} required
             *        Required indicator
             * @return {string}
             *         Error message
             */
            generateMessage: function (indicatorType, required) {
                return 'Error: "' + indicatorType +
                    '" indicator type requires "' + required +
                    '" indicator loaded before. Please read docs: ' +
                    'https://api.highcharts.com/highstock/plotOptions.' +
                    indicatorType;
            }
        };

        return requiredIndicatorMixin;
    });
    _registerModule(_modules, 'Stock/Indicators/DisparityIndex/DisparityIndexIndicator.js', [_modules['Mixins/IndicatorRequired.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (RequiredIndicatorMixin, SeriesRegistry, U) {
        /* *
         *  (c) 2010-2021 Rafal Sebestjanski
         *
         *  Disparity Index technical indicator for Highcharts Stock
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
        var correctFloat = U.correctFloat,
            defined = U.defined,
            extend = U.extend,
            isArray = U.isArray,
            merge = U.merge;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Disparity Index series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.disparityindex
         *
         * @augments Highcharts.Series
         */
        var DisparityIndexIndicator = /** @class */ (function (_super) {
                __extends(DisparityIndexIndicator, _super);
            function DisparityIndexIndicator() {
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 *  Properties
                 *
                 * */
                _this.averageIndicator = void 0;
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
            DisparityIndexIndicator.prototype.init = function () {
                var args = arguments,
                    ctx = this, // Disparity Index indicator
                    params = args[1].params, // options.params
                    averageType = params && params.average ? params.average : void 0;
                ctx.averageIndicator =
                    SeriesRegistry.seriesTypes[averageType] || SMAIndicator;
                // Check if the required average indicator modules is loaded
                RequiredIndicatorMixin.isParentLoaded(ctx.averageIndicator, averageType, ctx.type, function (indicator) {
                    indicator.prototype.init.apply(ctx, args);
                    return;
                });
            };
            DisparityIndexIndicator.prototype.calculateDisparityIndex = function (curPrice, periodAverage) {
                return correctFloat(curPrice - periodAverage) / periodAverage * 100;
            };
            DisparityIndexIndicator.prototype.getValues = function (series, params) {
                var index = params.index,
                    xVal = series.xData,
                    yVal = series.yData,
                    yValLen = yVal ? yVal.length : 0,
                    disparityIndexPoint = [],
                    xData = [],
                    yData = [], 
                    // "as any" because getValues doesn't exist on typeof Series
                    averageIndicator = this.averageIndicator,
                    isOHLC = isArray(yVal[0]), 
                    // Get the average indicator's values
                    values = averageIndicator.prototype.getValues(series,
                    params),
                    yValues = values.yData,
                    start = xVal.indexOf(values.xData[0]);
                // Check period, if bigger than points length, skip
                if (!yValues || yValues.length === 0 ||
                    !defined(index) ||
                    yVal.length <= start) {
                    return;
                }
                // Get the Disparity Index indicator's values
                for (var i = start; i < yValLen; i++) {
                    var disparityIndexValue = this.calculateDisparityIndex(isOHLC ? yVal[i][index] : yVal[i],
                        yValues[i - start]);
                    disparityIndexPoint.push([
                        xVal[i],
                        disparityIndexValue
                    ]);
                    xData.push(xVal[i]);
                    yData.push(disparityIndexValue);
                }
                return {
                    values: disparityIndexPoint,
                    xData: xData,
                    yData: yData
                };
            };
            /**
             * Disparity Index.
             * This series requires the `linkedTo` option to be set and should
             * be loaded after the `stock/indicators/indicators.js` file.
             *
             * @sample stock/indicators/disparity-index
             *         Disparity Index indicator
             *
             * @extends      plotOptions.sma
             * @since 9.1.0
             * @product      highstock
             * @excluding    allAreas, colorAxis, joinBy, keys, navigatorOptions,
             *               pointInterval, pointIntervalUnit, pointPlacement,
             *               pointRange, pointStart, showInNavigator, stacking
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/disparity-index
             * @optionparent plotOptions.disparityindex
             */
            DisparityIndexIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
                params: {
                    /**
                     * The average used to calculate the Disparity Index indicator.
                     * By default it uses SMA. To use other averages, e.g. EMA,
                     * the `stock/indicators/ema.js` file needs to be loaded.
                     *
                     * If value is different than ema|dema|tema|wma, then sma is used.
                     */
                    average: 'sma',
                    index: 3
                },
                marker: {
                    enabled: false
                },
                dataGrouping: {
                    approximation: 'averages'
                }
            });
            return DisparityIndexIndicator;
        }(SMAIndicator));
        extend(DisparityIndexIndicator.prototype, {
            nameBase: 'Disparity Index',
            nameComponents: ['period', 'average']
        });
        SeriesRegistry.registerSeriesType('disparityindex', DisparityIndexIndicator);
        /* *
         *
         *  Default Export
         *
         * */
        /**
         * The Disparity Index indicator series.
         * If the [type](#series.disparityindex.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.disparityindex
         * @since 9.1.0
         * @product   highstock
         * @excluding allAreas, colorAxis,  dataParser, dataURL, joinBy, keys,
         *            navigatorOptions, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointRange, pointStart, showInNavigator, stacking
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/disparity-index
         * @apioption series.disparityindex
         */
        ''; // to include the above in the js output

        return DisparityIndexIndicator;
    });
    _registerModule(_modules, 'masters/indicators/disparity-index.src.js', [], function () {


    });
}));