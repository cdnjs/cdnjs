YUI.add('axis-time', function (Y, NAME) {

/**
 * Provides functionality for drawing a time axis for use with a chart.
 *
 * @module charts
 * @submodule axis-time
 */
/**
 * TimeAxis draws a time-based axis for a chart.
 *
 * @class TimeAxis
 * @constructor
 * @extends Axis
 * @uses TimeImpl
 * @param {Object} config (optional) Configuration parameters.
 * @submodule axis-time
 */
Y.TimeAxis = Y.Base.create("timeAxis", Y.Axis, [Y.TimeImpl], {
    /**
     * Calculates and returns a value based on the number of labels and the index of
     * the current label.
     *
     * @method _getLabelByIndex
     * @param {Number} i Index of the label.
     * @param {Number} l Total number of labels.
     * @param {String} direction The direction of the axis. (vertical or horizontal)
     * @return String
     * @private
     */
    _getLabelByIndex: function(i, l, direction)
    {
        var min = this.get("minimum"),
            max = this.get("maximum"),
            increm,
            label;
            l -= 1;
        increm = ((max - min)/l) * i;
        if(direction && direction == "vertical")
        {
            label = max - increm;
        }
        else
        {
            label = min + increm;
        }
        return label;
    }
});



}, '@VERSION@', {"requires": ["axis", "axis-time-base"]});
