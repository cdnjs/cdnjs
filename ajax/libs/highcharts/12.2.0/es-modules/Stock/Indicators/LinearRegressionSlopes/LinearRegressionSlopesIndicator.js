/**
 *
 *  (c) 2010-2025 Kamil Kulig
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../../Core/Series/SeriesRegistry.js';
const { linearRegression: LinearRegressionIndicator } = SeriesRegistry.seriesTypes;
import U from '../../../Core/Utilities.js';
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
export default LinearRegressionSlopesIndicator;
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
