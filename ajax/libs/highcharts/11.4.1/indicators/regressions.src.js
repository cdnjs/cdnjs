/**
 * @license Highstock JS v11.4.1 (2024-04-04)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Kamil Kulig
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
                window.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Stock/Indicators/LinearRegression/LinearRegressionIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /**
         *
         *  (c) 2010-2024 Kamil Kulig
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { sma: SMAIndicator } = SeriesRegistry.seriesTypes;
        const { isArray, extend, merge } = U;
        /* *
         *
         *  Class
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
        class LinearRegressionIndicator extends SMAIndicator {
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
            getRegressionLineParameters(xData, yData) {
                // Least squares method
                const yIndex = this.options.params.index, getSingleYValue = function (yValue, yIndex) {
                    return isArray(yValue) ? yValue[yIndex] : yValue;
                }, xSum = xData.reduce(function (accX, val) {
                    return val + accX;
                }, 0), ySum = yData.reduce(function (accY, val) {
                    return getSingleYValue(val, yIndex) + accY;
                }, 0), xMean = xSum / xData.length, yMean = ySum / yData.length;
                let xError, yError, i, formulaNumerator = 0, formulaDenominator = 0;
                for (i = 0; i < xData.length; i++) {
                    xError = xData[i] - xMean;
                    yError = getSingleYValue(yData[i], yIndex) - yMean;
                    formulaNumerator += xError * yError;
                    formulaDenominator += Math.pow(xError, 2);
                }
                const slope = formulaDenominator ?
                    formulaNumerator / formulaDenominator : 0; // Don't divide by 0
                return {
                    slope: slope,
                    intercept: yMean - slope * xMean
                };
            }
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
            getEndPointY(lineParameters, endPointX) {
                return lineParameters.slope * endPointX + lineParameters.intercept;
            }
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
            transformXData(xData, xAxisUnit) {
                const xOffset = xData[0];
                return xData.map(function (xValue) {
                    return (xValue - xOffset) / xAxisUnit;
                });
            }
            /**
             * Find the closest distance between points in the base series.
             * @private
             * @param {Array<number>} xData list of all x coordinates in the base series
             * @return {number} - closest distance between points in the base series
             */
            findClosestDistance(xData) {
                let distance, closestDistance, i;
                for (i = 1; i < xData.length - 1; i++) {
                    distance = xData[i] - xData[i - 1];
                    if (distance > 0 &&
                        (typeof closestDistance === 'undefined' ||
                            distance < closestDistance)) {
                        closestDistance = distance;
                    }
                }
                return closestDistance;
            }
            // Required to be implemented - starting point for indicator's logic
            getValues(baseSeries, regressionSeriesParams) {
                const xData = baseSeries.xData, yData = baseSeries.yData, period = regressionSeriesParams.period, 
                // Format required to be returned
                indicatorData = {
                    xData: [],
                    yData: [],
                    values: []
                }, xAxisUnit = this.options.params.xAxisUnit ||
                    this.findClosestDistance(xData);
                let lineParameters, i, periodStart, periodEnd, endPointX, endPointY, periodXData, periodYData, periodTransformedXData;
                // Iteration logic: x value of the last point within the period
                // (end point) is used to represent the y value (regression)
                // of the entire period.
                for (i = period - 1; i <= xData.length - 1; i++) {
                    periodStart = i - period + 1; // Adjusted for slice() function
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
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
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
                 * compute the regression line parameters (slope & intercept)
                 * for every range. In Highcharts Stock the x axis values are
                 * always represented in milliseconds which may cause that
                 * distances between points are "big" integer numbers.
                 *
                 * Highcharts Stock's linear regression algorithm (least squares
                 * method) will utilize these "big" integers for finding the
                 * slope and the intercept of the regression line for each
                 * period. In consequence, this value may be a very "small"
                 * decimal number that's hard to interpret by a human.
                 *
                 * For instance: `xAxisUnit` equaled to `86400000` ms (1 day)
                 * forces the algorithm to treat `86400000` as `1` while
                 * computing the slope and the intercept. This may enhance the
                 * legibility of the indicator's values.
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
        extend(LinearRegressionIndicator.prototype, {
            nameBase: 'Linear Regression Indicator'
        });
        SeriesRegistry.registerSeriesType('linearRegression', LinearRegressionIndicator);
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
        ''; // To include the above in the js output

        return LinearRegressionIndicator;
    });
    _registerModule(_modules, 'Stock/Indicators/LinearRegressionSlopes/LinearRegressionSlopesIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /**
         *
         *  (c) 2010-2024 Kamil Kulig
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { linearRegression: LinearRegressionIndicator } = SeriesRegistry.seriesTypes;
        const { extend, merge } = U;
        /* *
         *
         *  Class
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
        class LinearRegressionSlopesIndicator extends LinearRegressionIndicator {
            /* *
             *
             *  Functions
             *
             * */
            getEndPointY(lineParameters) {
                return lineParameters.slope;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
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
        extend(LinearRegressionSlopesIndicator.prototype, {
            nameBase: 'Linear Regression Slope Indicator'
        });
        SeriesRegistry.registerSeriesType('linearRegressionSlope', LinearRegressionSlopesIndicator);
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
        ''; // To include the above in the js output

        return LinearRegressionSlopesIndicator;
    });
    _registerModule(_modules, 'Stock/Indicators/LinearRegressionIntercept/LinearRegressionInterceptIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /**
         *
         *  (c) 2010-2024 Kamil Kulig
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { linearRegression: LinearRegressionIndicator } = SeriesRegistry.seriesTypes;
        const { extend, merge } = U;
        /* *
         *
         *  Class
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
        class LinearRegressionInterceptIndicator extends LinearRegressionIndicator {
            /* *
             *
             *  Functions
             *
             * */
            getEndPointY(lineParameters) {
                return lineParameters.intercept;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
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
        extend(LinearRegressionInterceptIndicator.prototype, {
            nameBase: 'Linear Regression Intercept Indicator'
        });
        SeriesRegistry.registerSeriesType('linearRegressionIntercept', LinearRegressionInterceptIndicator);
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
        ''; // To include the above in the js output

        return LinearRegressionInterceptIndicator;
    });
    _registerModule(_modules, 'Stock/Indicators/LinearRegressionAngle/LinearRegressionAngleIndicator.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /**
         *
         *  (c) 2010-2024 Kamil Kulig
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { linearRegression: LinearRegressionIndicator } = SeriesRegistry.seriesTypes;
        const { extend, merge } = U;
        /* *
         *
         *  Class
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
        class LinearRegressionAngleIndicator extends LinearRegressionIndicator {
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
            slopeToAngle(slope) {
                return Math.atan(slope) * (180 / Math.PI); // Rad to deg
            }
            getEndPointY(lineParameters) {
                return this.slopeToAngle(lineParameters.slope);
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
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
        ''; // To include the above in the js output

        return LinearRegressionAngleIndicator;
    });
    _registerModule(_modules, 'masters/indicators/regressions.src.js', [_modules['Core/Globals.js']], function (Highcharts) {

        // eslint-disable-next-line max-len
        // eslint-disable-next-line max-len

        return Highcharts;
    });
}));