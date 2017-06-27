YUI.add('series-combospline', function (Y, NAME) {

/**
 * Provides functionality for creating a combospline series.
 *
 * @module charts
 * @submodule series-combospline
 */
/**
 * The ComboSplineSeries class renders a combination of splines, plots and areaspline fills in a single series. Each
 * series type has a corresponding boolean attribute indicating if it is rendered. By default, splines and plots
 * are rendered and areaspline is not.
 *
 * @class ComboSplineSeries
 * @extends ComboSeries
 * @uses CurveUtil
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-combospline
 */
Y.ComboSplineSeries = Y.Base.create("comboSplineSeries", Y.ComboSeries, [Y.CurveUtil], {
    /**
     * @protected
     *
     * Draws the series.
     *
     * @method drawSeries
     */
    drawSeries: function()
    {
        if(this.get("showAreaFill"))
        {
            this.drawAreaSpline();
        }
        if(this.get("showLines"))
        {
            this.drawSpline();
        }
        if(this.get("showMarkers"))
        {
            this.drawPlots();
        }
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default comboSpline
         */
        type: {
            value : "comboSpline"
        }
    }
});


}, '@VERSION@', {"requires": ["series-combo", "series-curve-util"]});
