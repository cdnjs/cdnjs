/**
 * @license Highstock JS v10.1.0 (2022-04-29)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Kamil Kulig
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/regressions', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'Stock/Indicators/LinearRegression/LinearRegression.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /**
         *
         *  (c) 2010-2021 Kamil Kulig
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
        var isArray = U.isArray,
            extend = U.extend,
            merge = U.merge;
        /* *
         *
         * Class
         *
         * */
        /**
         * Linear regression series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.linearregression
         *
         * @augments Highcharts.Series
         */
        var LinearRegressionIndicator = /** @class */ (function (_super) {
                __extends(LinearRegressionIndicator, _super);
            function LinearRegressionIndicator() {
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
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
            /**
             * Return the slope and intercept of a straight line function.
             *
             * @private
             *
             * @param {Array<number>} xData
             * List of all x coordinates in a period.
             *
             * @param {Array<number>} yData
             * List of all y coordinates in a period.
             *
             * @return {Highcharts.RegressionLineParametersObject}
             * Object that contains the slope and the intercept of a straight line
             * function.
             */
            LinearRegressionIndicator.prototype.getRegressionLineParameters = function (xData, yData) {
                // least squares method
                var yIndex = this.options.params.index,
                    getSingleYValue = function (yValue,
                    yIndex) {
                        return isArray(yValue) ? yValue[yIndex] : yValue;
                }, xSum = xData.reduce(function (accX, val) {
                    return val + accX;
                }, 0), ySum = yData.reduce(function (accY, val) {
                    return getSingleYValue(val, yIndex) + accY;
                }, 0), xMean = xSum / xData.length, yMean = ySum / yData.length, xError, yError, formulaNumerator = 0, formulaDenominator = 0, i, slope;
                for (i = 0; i < xData.length; i++) {
                    xError = xData[i] - xMean;
                    yError = getSingleYValue(yData[i], yIndex) - yMean;
                    formulaNumerator += xError * yError;
                    formulaDenominator += Math.pow(xError, 2);
                }
                slope = formulaDenominator ?
                    formulaNumerator / formulaDenominator : 0; // don't divide by 0
                return {
                    slope: slope,
                    intercept: yMean - slope * xMean
                };
            };
            /**
             * Return the y value on a straight line.
             *
             * @private
             *
             * @param {Highcharts.RegressionLineParametersObject} lineParameters
             * Object that contains the slope and the intercept of a straight line
             * function.
             *
             * @param {number} endPointX
             * X coordinate of the point.
             *
             * @return {number}
             * Y value of the point that lies on the line.
             */
            LinearRegressionIndicator.prototype.getEndPointY = function (lineParameters, endPointX) {
                return lineParameters.slope * endPointX + lineParameters.intercept;
            };
            /**
             * Transform the coordinate system so that x values start at 0 and
             * apply xAxisUnit.
             *
             * @private
             *
             * @param {Array<number>} xData
             * List of all x coordinates in a period
             *
             * @param {number} xAxisUnit
             * Option (see the API)
             *
             * @return {Array<number>}
             * Array of transformed x data
             */
            LinearRegressionIndicator.prototype.transformXData = function (xData, xAxisUnit) {
                var xOffset = xData[0];
                return xData.map(function (xValue) {
                    return (xValue - xOffset) / xAxisUnit;
                });
            };
            /**
             * Find the closest distance between points in the base series.
             * @private
             * @param {Array<number>} xData list of all x coordinates in the base series
             * @return {number} - closest distance between points in the base series
             */
            LinearRegressionIndicator.prototype.findClosestDistance = function (xData) {
                var distance,
                    closestDistance,
                    i;
                for (i = 1; i < xData.length - 1; i++) {
                    distance = xData[i] - xData[i - 1];
                    if (distance > 0 &&
                        (typeof closestDistance === 'undefined' ||
                            distance < closestDistance)) {
                        closestDistance = distance;
                    }
                }
                return closestDistance;
            };
            // Required to be implemented - starting point for indicator's logic
            LinearRegressionIndicator.prototype.getValues = function (baseSeries, regressionSeriesParams) {
                var xData = baseSeries.xData,
                    yData = baseSeries.yData,
                    period = regressionSeriesParams.period,
                    lineParameters,
                    i,
                    periodStart,
                    periodEnd, 
                    // format required to be returned
                    indicatorData = {
                        xData: [],
                        yData: [],
                        values: []
                    },
                    endPointX,
                    endPointY,
                    periodXData,
                    periodYData,
                    periodTransformedXData,
                    xAxisUnit = this.options.params.xAxisUnit ||
                        this.findClosestDistance(xData);
                // Iteration logic: x value of the last point within the period
                // (end point) is used to represent the y value (regression)
                // of the entire period.
                for (i = period - 1; i <= xData.length - 1; i++) {
                    periodStart = i - period + 1; // adjusted for slice() function
                    periodEnd = i + 1; // (as above)
                    endPointX = xData[i];
                    periodXData = xData.slice(periodStart, periodEnd);
                    periodYData = yData.slice(periodStart, periodEnd);
                    periodTransformedXData = this.transformXData(periodXData, xAxisUnit);
                    lineParameters = this.getRegressionLineParameters(periodTransformedXData, periodYData);
                    endPointY = this.getEndPointY(lineParameters, periodTransformedXData[periodTransformedXData.length - 1]);
                    // @todo this is probably not used anywhere
                    indicatorData.values.push({
                        regressionLineParameters: lineParameters,
                        x: endPointX,
                        y: endPointY
                    });
                    indicatorData.xData.push(endPointX);
                    indicatorData.yData.push(endPointY);
                }
                return indicatorData;
            };
            /**
             * Linear regression indicator. This series requires `linkedTo` option to be
             * set.
             *
             * @sample {highstock} stock/indicators/linear-regression
             *         Linear regression indicator
             *
             * @extends      plotOptions.sma
             * @since        7.0.0
             * @product      highstock
             * @requires     stock/indicators/indicators
             * @requires     stock/indicators/regressions
             * @optionparent plotOptions.linearregression
             */
            LinearRegressionIndicator.defaultOptions = merge(SMAIndicator.defaultOptions, {
                params: {
                    /**
                     * Unit (in milliseconds) for the x axis distances used to
                     * compute the regression line paramters (slope & intercept) for
                     * every range. In Highcharts Stock the x axis values are always
                     * represented in milliseconds which may cause that distances
                     * between points are "big" integer numbers.
                     *
                     * Highcharts Stock's linear regression algorithm (least squares
                     * method) will utilize these "big" integers for finding the
                     * slope and the intercept of the regression line for each
                     * period. In consequence, this value may be a very "small"
                     * decimal number that's hard to interpret by a human.
                     *
                     * For instance: `xAxisUnit` equealed to `86400000` ms (1 day)
                     * forces the algorithm to treat `86400000` as `1` while
                     * computing the slope and the intercept. This may enchance the
                     * legiblitity of the indicator's values.
                     *
                     * Default value is the closest distance between two data
                     * points.
                     *
                     * In `v9.0.2`, the default value has been changed
                     * from `undefined` to `null`.
                     *
                     * @sample {highstock} stock/plotoptions/linear-regression-xaxisunit
                     *         xAxisUnit set to 1 minute
                     *
                     * @example
                     * // In Liniear Regression Slope Indicator series `xAxisUnit`is
                     * // `86400000` (1 day) and period is `3`. There're 3 points in
                     * // the base series:
                     *
                     * data: [
                     *   [Date.UTC(2020, 0, 1), 1],
                     *   [Date.UTC(2020, 0, 2), 3],
                     *   [Date.UTC(2020, 0, 3), 5]
                     * ]
                     *
                     * // This will produce one point in the indicator series that
                     * // has a `y` value of `2` (slope of the regression line). If
                     * // we change the `xAxisUnit` to `1` (ms) the value of the
                     * // indicator's point will be `2.3148148148148148e-8` which is
                     * // harder to interpert for a human.
                     *
                     * @type    {null|number}
                     * @product highstock
                     */
                    xAxisUnit: null
                },
                tooltip: {
                    valueDecimals: 4
                }
            });
            return LinearRegressionIndicator;
        }(SMAIndicator));
        extend(LinearRegressionIndicator.prototype, {
            nameBase: 'Linear Regression Indicator'
        });
        SeriesRegistry.registerSeriesType('linearRegression', LinearRegressionIndicator);
        /* *
         *
         *  Default Export
         *
         * */
        /**
         * A linear regression series. If the
         * [type](#series.linearregression.type) option is not specified, it is
         * inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.linearregression
         * @since     7.0.0
         * @product   highstock
         * @excluding dataParser,dataURL
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/regressions
         * @apioption series.linearregression
         */
        ''; // to include the above in the js output

        return LinearRegressionIndicator;
    });
    _registerModule(_modules, 'Stock/Indicators/LinearRegressionSlopes/LinearRegressionSlopes.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /**
         *
         *  (c) 2010-2021 Kamil Kulig
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
        var LinearRegressionIndicator = SeriesRegistry.seriesTypes.linearRegression;
        var extend = U.extend,
            merge = U.merge;
        /* *
         *
         * Class
         *
         * */
        /**
         * The Linear Regression Slope series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.linearRegressionSlope
         *
         * @augments Highcharts.Series
         */
        var LinearRegressionSlopesIndicator = /** @class */ (function (_super) {
                __extends(LinearRegressionSlopesIndicator, _super);
            function LinearRegressionSlopesIndicator() {
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
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
            LinearRegressionSlopesIndicator.prototype.getEndPointY = function (lineParameters) {
                return lineParameters.slope;
            };
            /**
             * Linear regression slope indicator. This series requires `linkedTo`
             * option to be set.
             *
             * @sample {highstock} stock/indicators/linear-regression-slope
             *         Linear regression slope indicator
             *
             * @extends      plotOptions.linearregression
             * @since        7.0.0
             * @product      highstock
             * @requires     stock/indicators/indicators
             * @requires  stock/indicators/regressions
             * @optionparent plotOptions.linearregressionslope
             */
            LinearRegressionSlopesIndicator.defaultOptions = merge(LinearRegressionIndicator.defaultOptions);
            return LinearRegressionSlopesIndicator;
        }(LinearRegressionIndicator));
        extend(LinearRegressionSlopesIndicator.prototype, {
            nameBase: 'Linear Regression Slope Indicator'
        });
        SeriesRegistry.registerSeriesType('linearRegressionSlope', LinearRegressionSlopesIndicator);
        /* *
         *
         *  Default Export
         *
         * */
        /**
         * A linear regression intercept series. If the
         * [type](#series.linearregressionslope.type) option is not specified, it is
         * inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.linearregressionslope
         * @since     7.0.0
         * @product   highstock
         * @excluding dataParser,dataURL
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/regressions
         * @apioption series.linearregressionslope
         */
        ''; // to include the above in the js output

        return LinearRegressionSlopesIndicator;
    });
    _registerModule(_modules, 'Stock/Indicators/LinearRegressionIntercept/LinearRegressionIntercept.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /**
         *
         *  (c) 2010-2021 Kamil Kulig
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
        var LinearRegressionIndicator = SeriesRegistry.seriesTypes.linearRegression;
        var extend = U.extend,
            merge = U.merge;
        /* *
         *
         * Class
         *
         * */
        /**
         * The Linear Regression Intercept series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.linearRegressionIntercept
         *
         * @augments Highcharts.Series
         */
        var LinearRegressionInterceptIndicator = /** @class */ (function (_super) {
                __extends(LinearRegressionInterceptIndicator, _super);
            function LinearRegressionInterceptIndicator() {
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
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
            LinearRegressionInterceptIndicator.prototype.getEndPointY = function (lineParameters) {
                return lineParameters.intercept;
            };
            /**
             * Linear regression intercept indicator. This series requires `linkedTo`
             * option to be set.
             *
             * @sample {highstock} stock/indicators/linear-regression-intercept
             *         Linear intercept slope indicator
             *
             * @extends      plotOptions.linearregression
             * @since        7.0.0
             * @product      highstock
             * @requires     stock/indicators/indicators
             * @requires  stock/indicators/regressions
             * @optionparent plotOptions.linearregressionintercept
             */
            LinearRegressionInterceptIndicator.defaultOptions = merge(LinearRegressionIndicator.defaultOptions);
            return LinearRegressionInterceptIndicator;
        }(LinearRegressionIndicator));
        extend(LinearRegressionInterceptIndicator.prototype, {
            nameBase: 'Linear Regression Intercept Indicator'
        });
        SeriesRegistry.registerSeriesType('linearRegressionIntercept', LinearRegressionInterceptIndicator);
        /* *
         *
         *  Default Export
         *
         * */
        /**
         * A linear regression intercept series. If the
         * [type](#series.linearregressionintercept.type) option is not specified, it is
         * inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.linearregressionintercept
         * @since     7.0.0
         * @product   highstock
         * @excluding dataParser,dataURL
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/regressions
         * @apioption series.linearregressionintercept
         */
        ''; // to include the above in the js output

        return LinearRegressionInterceptIndicator;
    });
    _registerModule(_modules, 'Stock/Indicators/LinearRegressionAngle/LinearRegressionAngle.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /**
         *
         *  (c) 2010-2021 Kamil Kulig
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
        var LinearRegressionIndicator = SeriesRegistry.seriesTypes.linearRegression;
        var extend = U.extend,
            merge = U.merge;
        /* *
         *
         * Class
         *
         * */
        /**
         * The Linear Regression Angle series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.linearRegressionAngle
         *
         * @augments Highcharts.Series
         */
        var LinearRegressionAngleIndicator = /** @class */ (function (_super) {
                __extends(LinearRegressionAngleIndicator, _super);
            function LinearRegressionAngleIndicator() {
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
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
            /**
            * Convert a slope of a line to angle (in degrees) between
            * the line and x axis
            * @private
            * @param {number} slope of the straight line function
            * @return {number} angle in degrees
            */
            LinearRegressionAngleIndicator.prototype.slopeToAngle = function (slope) {
                return Math.atan(slope) * (180 / Math.PI); // rad to deg
            };
            LinearRegressionAngleIndicator.prototype.getEndPointY = function (lineParameters) {
                return this.slopeToAngle(lineParameters.slope);
            };
            /**
             * Linear regression angle indicator. This series requires `linkedTo`
             * option to be set.
             *
             * @sample {highstock} stock/indicators/linear-regression-angle
             *         Linear intercept angle indicator
             *
             * @extends      plotOptions.linearregression
             * @since        7.0.0
             * @product      highstock
             * @requires     stock/indicators/indicators
             * @requires  stock/indicators/regressions
             * @optionparent plotOptions.linearregressionangle
             */
            LinearRegressionAngleIndicator.defaultOptions = merge(LinearRegressionIndicator.defaultOptions, {
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
                        '{series.name}: <b>{point.y}°</b><br/>'
                }
            });
            return LinearRegressionAngleIndicator;
        }(LinearRegressionIndicator));
        extend(LinearRegressionAngleIndicator.prototype, {
            nameBase: 'Linear Regression Angle Indicator'
        });
        SeriesRegistry.registerSeriesType('linearRegressionAngle', LinearRegressionAngleIndicator);
        /* *
         *
         *  Default Export
         *
         * */
        /**
         * A linear regression intercept series. If the
         * [type](#series.linearregressionangle.type) option is not specified, it is
         * inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.linearregressionangle
         * @since     7.0.0
         * @product   highstock
         * @excluding dataParser,dataURL
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/regressions
         * @apioption series.linearregressionangle
         */
        ''; // to include the above in the js output

        return LinearRegressionAngleIndicator;
    });
    _registerModule(_modules, 'masters/indicators/regressions.src.js', [], function () {

        // eslint-disable-next-line max-len
        // eslint-disable-next-line max-len

    });
}));