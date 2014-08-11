/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

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
            offset = edgeOffset;
        dataValues = dataValues || this._getDataValuesByCount(count, min, max);
        for(i = 0; i < count; i = i + 1)
        {
            dataValue = this._getNumber(dataValues[i]);
            if(dataValue <= max && dataValue >= min)
            {
                point = {};
                point[staticCoord] = constantVal;
                point[dynamicCoord] = this._getCoordFromValue(
                    min,
                    max,
                    layoutLength,
                    dataValue,
                    offset
                );
                points.push(point);
                values.push(dataValue);
            }
        }
        return {
            points: points,
            values: values
        };
    }
});



}, '3.15.0', {"requires": ["axis", "axis-time-base"]});
