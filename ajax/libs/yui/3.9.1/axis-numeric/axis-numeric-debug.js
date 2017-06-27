YUI.add('axis-numeric', function (Y, NAME) {

/**
 * Provides functionality for drawing a numeric axis for use with a chart.
 *
 * @module charts
 * @submodule axis-numeric
 */
Y_Lang = Y.Lang;
/**
 * NumericAxis draws a numeric axis.
 *
 * @class NumericAxis
 * @constructor
 * @extends Axis
 * @uses NumericImpl
 * @param {Object} config (optional) Configuration parameters.
 * @submodule axis-numeric
 */
Y.NumericAxis = Y.Base.create("numericAxis", Y.Axis, [Y.NumericImpl], {
    /**
     * Calculates and returns a value based on the number of labels and the index of
     * the current label.
     *
     * @method getLabelByIndex
     * @param {Number} i Index of the label.
     * @param {Number} l Total number of labels.
     * @return String
     * @private
     */
    _getLabelByIndex: function()
    {
        var i = arguments[0],
            l = arguments[1],
            min = this.get("minimum"),
            max = this.get("maximum"),
            increm = (max - min)/(l-1),
            label,
            roundingMethod = this.get("roundingMethod");
            l -= 1;
        //respect the min and max. calculate all other labels.
        if(i === 0)
        {
            label = min;
        }
        else if(i === l)
        {
            label = max;
        }
        else
        {
            label = (i * increm);
            if(roundingMethod === "niceNumber")
            {
                label = this._roundToNearest(label, increm);
            }
            label += min;
        }
        return parseFloat(label);
    },

    /**
     * Checks to see if data extends beyond the range of the axis. If so,
     * that data will need to be hidden. This method is internal, temporary and subject
     * to removal in the future.
     *
     * @method _hasDataOverflow
     * @protected
     * @return Boolean
     */
    _hasDataOverflow: function()
    {
        var roundingMethod,
            min,
            max;
        if(this.get("setMin") || this.get("setMax"))
        {
            return true;
        }
        roundingMethod = this.get("roundingMethod");
        min = this._actualMinimum;
        max = this._actualMaximum;
        if(Y_Lang.isNumber(roundingMethod) &&
            ((Y_Lang.isNumber(max) && max > this._dataMaximum) || (Y_Lang.isNumber(min) && min < this._dataMinimum)))
        {
            return true;
        }
        return false;
    }
});



}, '@VERSION@', {"requires": ["axis", "axis-numeric-base"]});
