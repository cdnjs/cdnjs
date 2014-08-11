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
    _getLabelByIndex: function(i, l)
    {
        var min = this.get("minimum"),
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
     * Calculates points based off the majorUnit count or distance of the Axis.
     *
     * @method _getPoints
     * @param {Object} startPoint An object literal containing the x and y coordinates of the first
     * point on the axis.
     * @param {Number} len The number of points on an axis.
     * @param {Number} edgeOffset The distance from the start of the axis and the point.
     * @param {Number} majorUnitDistance The distance between points on an axis.
     * @param {String} direction Indicates whether the axis is horizontal or vertical.
     * @return Array
     * @private
     */
    _getPoints: function(startPoint, len, edgeOffset, majorUnitDistance, direction)
    {
        var points = Y.NumericAxis.superclass._getPoints.apply(this, arguments);
        if(direction === "vertical")
        {
            points.reverse();
        }
        return points;
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
            labelValue = labelValues[i];
            if(Y.Lang.isNumber(labelValue) && labelValue >= min && labelValue <= max)
            {
                newPoint = {};
                newPoint[staticCoord] = constantVal;
                newPoint[dynamicCoord] = (layoutLength - edgeOffset) - (labelValue - min) * scaleFactor;
                points.push(newPoint);
                values.push(labelValue);
            }
        }
        return {
            points: points,
            values: values
        };
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
