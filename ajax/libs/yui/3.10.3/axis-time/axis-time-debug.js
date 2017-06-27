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
     * @return String
     * @private
     */
    _getLabelByIndex: function(i, l)
    {
        var min = this.get("minimum"),
            max = this.get("maximum"),
            increm,
            label;
            l -= 1;
        increm = ((max - min)/l) * i;
        label = min + increm;
        return label;
    },

    /**
     * Calculates the position of ticks and labels based on an array of specified label values. Returns
     * an object containing an array of values to be used for labels and an array of objects containing
     * x and y coordinates for each label.
     *
     * @method _getDataFromLabelValues
     * @param {Object} startPoint An object containing the x and y coordinates for the start of the axis.
     * @param {Array} labelValues An array containing values to be used for determining the number and
     * position of labels and ticks on the axis.
     * @param {Number} edgeOffset The distance, in pixels, on either edge of the axis.
     * @param {Number} layoutLength The length, in pixels, of the axis. If the axis is vertical, the length
     * is equal to the height. If the axis is horizontal, the length is equal to the width.
     * @return Object
     * @private
     */
    _getDataFromLabelValues: function(startPoint, labelValues, edgeOffset, layoutLength, direction)
    {
        var points = [],
            labelValue,
            i,
            len = labelValues.length,
            staticCoord,
            dynamicCoord,
            constantVal,
            newPoint,
            max = this.get("maximum"),
            min = this.get("minimum"),
            values = [],
            scaleFactor = (layoutLength - (edgeOffset * 2)) / (max - min);
        if(direction === "vertical")
        {
            staticCoord = "x";
            dynamicCoord = "y";
        }
        else
        {
            staticCoord = "y";
            dynamicCoord = "x";
        }
        constantVal = startPoint[staticCoord];
        for(i = 0; i < len; i = i + 1)
        {
            labelValue = this._getNumber(labelValues[i]);
            if(Y.Lang.isNumber(labelValue) && labelValue >= min && labelValue <= max)
            {
                newPoint = {};
                newPoint[staticCoord] = constantVal;
                newPoint[dynamicCoord] = edgeOffset + ((labelValue - min) * scaleFactor);
                points.push(newPoint);
                values.push(labelValue);
            }
        }
        return {
            points: points,
            values: values
        };
    }
});



}, '@VERSION@', {"requires": ["axis", "axis-time-base"]});
