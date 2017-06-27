YUI.add('series-areaspline-stacked', function (Y, NAME) {

/**
 * Provides functionality for creating a stacked area spline series.
 *
 * @module charts
 * @submodule series-areaspline-stacked
 */
/**
 * StackedAreaSplineSeries creates a stacked area chart with points data points connected by a curve.
 *
 * @class StackedAreaSplineSeries
 * @extends AreaSeries
 * @uses CurveUtil
 * @uses StackingUtil
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-areaspline-stacked
 */
Y.StackedAreaSplineSeries = Y.Base.create("stackedAreaSplineSeries", Y.AreaSeries, [Y.CurveUtil, Y.StackingUtil], {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        this._stackCoordinates();
        this.drawStackedAreaSpline();
    }
}, {
    ATTRS : {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedAreaSpline
         */
        type: {
            value:"stackedAreaSpline"
        }
    }
});



}, '@VERSION@', {"requires": ["series-stacked", "series-areaspline"]});
