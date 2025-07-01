/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/regressions
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Kamil Kulig
 *
 * License: www.highcharts.com/license
 */
import * as __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__ from "../highcharts.src.js";
import * as __WEBPACK_EXTERNAL_MODULE__modules_stock_src_js_b3d80146__ from "../modules/stock.src.js";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/

;// external ["../highcharts.src.js","default"]
const external_highcharts_src_js_default_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"];
var external_highcharts_src_js_default_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_namespaceObject);
;// external "../modules/stock.src.js"
var x = (y) => {
	var x = {}; __webpack_require__.d(x,
    	y); return x
    } 
    var y = (x) => (() => (x))
    const stock_src_js_namespaceObject = x({  });
;// external ["../highcharts.src.js","default","SeriesRegistry"]
const external_highcharts_src_js_default_SeriesRegistry_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"].SeriesRegistry;
var external_highcharts_src_js_default_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_SeriesRegistry_namespaceObject);
;// ./code/es-modules/Stock/Indicators/LinearRegression/LinearRegressionIndicator.js
/**
 *
 *  (c) 2010-2025 Kamil Kulig
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { sma: SMAIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { isArray, extend, merge } = (external_highcharts_src_js_default_default());
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
            xData: [], // By getValues() method
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
            if (isArray(indicatorData.xData)) {
                indicatorData.xData.push(endPointX);
            }
            if (isArray(indicatorData.yData)) {
                indicatorData.yData.push(endPointY);
            }
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
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('linearRegression', LinearRegressionIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const LinearRegression_LinearRegressionIndicator = ((/* unused pure expression or super */ null && (LinearRegressionIndicator)));
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

;// ./code/es-modules/Stock/Indicators/LinearRegressionSlopes/LinearRegressionSlopesIndicator.js
/**
 *
 *  (c) 2010-2025 Kamil Kulig
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { linearRegression: LinearRegressionSlopesIndicator_LinearRegressionIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { extend: LinearRegressionSlopesIndicator_extend, merge: LinearRegressionSlopesIndicator_merge } = (external_highcharts_src_js_default_default());
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
class LinearRegressionSlopesIndicator extends LinearRegressionSlopesIndicator_LinearRegressionIndicator {
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
LinearRegressionSlopesIndicator.defaultOptions = LinearRegressionSlopesIndicator_merge(LinearRegressionSlopesIndicator_LinearRegressionIndicator.defaultOptions);
LinearRegressionSlopesIndicator_extend(LinearRegressionSlopesIndicator.prototype, {
    nameBase: 'Linear Regression Slope Indicator'
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('linearRegressionSlope', LinearRegressionSlopesIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const LinearRegressionSlopes_LinearRegressionSlopesIndicator = ((/* unused pure expression or super */ null && (LinearRegressionSlopesIndicator)));
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

;// ./code/es-modules/Stock/Indicators/LinearRegressionIntercept/LinearRegressionInterceptIndicator.js
/**
 *
 *  (c) 2010-2025 Kamil Kulig
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { linearRegression: LinearRegressionInterceptIndicator_LinearRegressionIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { extend: LinearRegressionInterceptIndicator_extend, merge: LinearRegressionInterceptIndicator_merge } = (external_highcharts_src_js_default_default());
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
class LinearRegressionInterceptIndicator extends LinearRegressionInterceptIndicator_LinearRegressionIndicator {
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
LinearRegressionInterceptIndicator.defaultOptions = LinearRegressionInterceptIndicator_merge(LinearRegressionInterceptIndicator_LinearRegressionIndicator.defaultOptions);
LinearRegressionInterceptIndicator_extend(LinearRegressionInterceptIndicator.prototype, {
    nameBase: 'Linear Regression Intercept Indicator'
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('linearRegressionIntercept', LinearRegressionInterceptIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const LinearRegressionIntercept_LinearRegressionInterceptIndicator = ((/* unused pure expression or super */ null && (LinearRegressionInterceptIndicator)));
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

;// ./code/es-modules/Stock/Indicators/LinearRegressionAngle/LinearRegressionAngleIndicator.js
/**
 *
 *  (c) 2010-2025 Kamil Kulig
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { linearRegression: LinearRegressionAngleIndicator_LinearRegressionIndicator } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { extend: LinearRegressionAngleIndicator_extend, merge: LinearRegressionAngleIndicator_merge } = (external_highcharts_src_js_default_default());
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
class LinearRegressionAngleIndicator extends LinearRegressionAngleIndicator_LinearRegressionIndicator {
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
LinearRegressionAngleIndicator.defaultOptions = LinearRegressionAngleIndicator_merge(LinearRegressionAngleIndicator_LinearRegressionIndicator.defaultOptions, {
    tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
            '{series.name}: <b>{point.y}°</b><br/>'
    }
});
LinearRegressionAngleIndicator_extend(LinearRegressionAngleIndicator.prototype, {
    nameBase: 'Linear Regression Angle Indicator'
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('linearRegressionAngle', LinearRegressionAngleIndicator);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const LinearRegressionAngle_LinearRegressionAngleIndicator = ((/* unused pure expression or super */ null && (LinearRegressionAngleIndicator)));
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

;// ./code/es-modules/masters/indicators/regressions.src.js





// eslint-disable-next-line max-len

// eslint-disable-next-line max-len


/* harmony default export */ const regressions_src = ((external_highcharts_src_js_default_default()));

export { regressions_src as default };
