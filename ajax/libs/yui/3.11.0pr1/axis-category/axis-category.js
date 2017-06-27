YUI.add('axis-category', function (Y, NAME) {

/**
 * Provides functionality for drawing a category axis for use with a chart.
 *
 * @module charts
 * @submodule axis-category
 */
/**
 * CategoryAxis draws a category axis for a chart.
 *
 * @class CategoryAxis
 * @constructor
 * @extends Axis
 * @uses CategoryImpl
 * @param {Object} config (optional) Configuration parameters.
 * @submodule axis-category
 */
Y.CategoryAxis = Y.Base.create("categoryAxis", Y.Axis, [Y.CategoryImpl], {
    /**
     * Returns a string corresponding to the first label on an
     * axis.
     *
     * @method getMinimumValue
     * @return String
     */
    getMinimumValue: function()
    {
        var data = this.get("data"),
            label = data[0];
        return label;
    },

    /**
     * Returns a string corresponding to the last label on an
     * axis.
     *
     * @method getMaximumValue
     * @return String
     */
    getMaximumValue: function()
    {
        var data = this.get("data"),
            len = data.length - 1,
            label = data[len];
        return label;
    },

    /**
     * Calculates and returns a value based on the number of labels and the index of
     * the current label.
     *
     * @method _getLabelByIndex
     * @param {Number} i Index of the label.
     * @return String
     * @private
     */
    _getLabelByIndex: function(i)
    {
        var label,
            data = this.get("data");
        label = data[i];
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
            values = [],
            labelValue,
            multiplier = (layoutLength - (edgeOffset * 2))/(this.getTotalMajorUnits() - 1),
            data = this.get("data"),
            labelIndex,
            i,
            len = labelValues.length,
            staticCoord,
            dynamicCoord,
            constantVal,
            newPoint,
            rawVal;
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
            labelValue = labelValues[i];
            labelIndex = Y.Array.indexOf(data, labelValue);
            if(Y.Lang.isNumber(labelIndex) && labelIndex > -1)
            {
                rawVal = labelIndex ? (labelIndex * multiplier) : 0;
                newPoint = {};
                newPoint[staticCoord] = constantVal;
                newPoint[dynamicCoord] = rawVal + edgeOffset;
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



}, '@VERSION@', {"requires": ["axis", "axis-category-base"]});
