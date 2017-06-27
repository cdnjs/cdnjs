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
     * Returns the distance between major units on an axis.
     *
     * @method getMajorUnitDistance
     * @param {Number} len Number of ticks
     * @param {Number} uiLen Size of the axis.
     * @param {Object} majorUnit Hash of properties used to determine the majorUnit
     * @return Number
     */
    getMajorUnitDistance: function(len, uiLen, majorUnit)
    {
        var dist;
        if(majorUnit.determinant === "count")
        {
            dist = uiLen/len;
        }
        else if(majorUnit.determinant === "distance")
        {
            dist = majorUnit.distance;
        }
        return dist;
    },

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
     * @param {Number} l Total number of labels.
     * @param {String} direction The direction of the axis. (vertical or horizontal)
     * @return String
     * @private
     */
    _getLabelByIndex: function(i, l, direction)
    {
        var label,
            data = this.get("data");
        if(direction && direction == "vertical")
        {
            label = data[i];
        }
        else
        {
            label = data[l - (i + 1)];
        }
        return label;
    }
});



}, '@VERSION@', {"requires": ["axis", "axis-category-base"]});
