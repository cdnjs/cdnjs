/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('axis-category', function (Y, NAME) {

/**
 * Provides functionality for drawing a category axis for use with a chart.
 *
 * @module charts
 * @submodule axis-category
 */
var Y_Lang = Y.Lang;
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
        var labelValue,
            i,
            points = [],
            values = [],
            point,
            labelIndex,
            data = this.get("data"),
            offset = edgeOffset;
        dataValues = dataValues || data;
        for(i = 0; i < count; i = i + 1)
        {
            labelValue = dataValues[i];
            labelIndex = Y.Array.indexOf(data, labelValue);
            if(Y_Lang.isNumber(labelIndex) && labelIndex > -1)
            {
                point = {};
                point[staticCoord] = constantVal;
                point[dynamicCoord] = this._getCoordFromValue(
                    min,
                    max,
                    layoutLength,
                    labelIndex,
                    offset
                );
                points.push(point);
                values.push(labelValue);
            }
        }
        return {
            points: points,
            values: values
        };
    }
});



}, '3.15.0', {"requires": ["axis", "axis-category-base"]});
