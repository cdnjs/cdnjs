/*
YUI 3.17.0 (build ce55cc9)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('axis-numeric', function (Y, NAME) {

/**
 * Provides functionality for drawing a numeric axis for use with a chart.
 *
 * @module charts
 * @submodule axis-numeric
 */
var Y_Lang = Y.Lang;
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
     * Returns an object literal containing and array of label values and an array of points.
     *
     * @method _getLabelData
     * @param {Object} startPoint An object containing x and y values.
     * @param {Number} edgeOffset Distance to offset coordinates.
     * @param {Number} layoutLength Distance that the axis spans.
     * @param {Number} count Number of labels.
     * @param {String} direction Indicates whether the axis is horizontal or vertical.
     * @param {Array} Array containing values for axis labels.
     * @return Array
     * @private
     */
    _getLabelData: function(constantVal, staticCoord, dynamicCoord, min, max, edgeOffset, layoutLength, count, dataValues)
    {
        var dataValue,
            i,
            points = [],
            values = [],
            point,
            isVertical = staticCoord === "x",
            offset = isVertical ? layoutLength + edgeOffset : edgeOffset;
        dataValues = dataValues || this._getDataValuesByCount(count, min, max);
        for(i = 0; i < count; i = i + 1)
        {
            dataValue = parseFloat(dataValues[i]);
            if(dataValue <= max && dataValue >= min)
            {
                point = {};
                point[staticCoord] = constantVal;
                point[dynamicCoord] = this._getCoordFromValue(
                    min,
                    max,
                    layoutLength,
                    dataValue,
                    offset,
                    isVertical
                );
                points.push(point);
                values.push(dataValue);
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



}, '3.17.0', {"requires": ["axis", "axis-numeric-base"]});
