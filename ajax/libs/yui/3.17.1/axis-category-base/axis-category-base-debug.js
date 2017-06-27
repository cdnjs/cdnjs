/*
YUI 3.17.1 (build 0eb5a52)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('axis-category-base', function (Y, NAME) {

/**
 * Provides functionality for the handling of category axis data for a chart.
 *
 * @module charts
 * @submodule axis-category-base
 */
var Y_Lang = Y.Lang;

/**
 * CategoryImpl contains logic for managing category data. CategoryImpl is used by the following classes:
 * <ul>
 *      <li>{{#crossLink "CategoryAxisBase"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "CategoryAxis"}}{{/crossLink}}</li>
 *  </ul>
 *
 * @class CategoryImpl
 * @constructor
 * @submodule axis-category-base
 */
function CategoryImpl()
{
}

CategoryImpl.NAME = "categoryImpl";

CategoryImpl.ATTRS = {
    /**
     * Pattern used by the `labelFunction` to format a label. The default `labelFunction` values for
     * `CategoryAxis` and `CategoryAxisBase` do not accept a format object. This value can be used by
     * a custom method.
     *
     * @attribute labelFormat
     * @type Object
     */
    labelFormat: {
        value: null
    },

    /**
     * Determines whether and offset is automatically calculated for the edges of the axis.
     *
     * @attribute calculateEdgeOffset
     * @type Boolean
     */
    calculateEdgeOffset: {
        value: true
    }

    /**
     * Method used for formatting a label. This attribute allows for the default label formatting method to overridden.
     * The method use would need to implement the arguments below and return a `String` or `HTMLElement`.
     * <dl>
     *      <dt>val</dt><dd>Label to be formatted. (`String`)</dd>
     *      <dt>format</dt><dd>Template for formatting label. (optional)</dd>
     * </dl>
     *
     * @attribute labelFunction
     * @type Function
     */
};

CategoryImpl.prototype = {
    /**
     * Formats a label based on the axis type and optionally specified format.
     *
     * @method formatLabel
     * @param {Object} value
     * @return String
     */
    formatLabel: function(val)
    {
        return val;
    },

    /**
     * Object storing key data.
     *
     * @property _indices
     * @private
     */
    _indices: null,

    /**
     * Constant used to generate unique id.
     *
     * @property GUID
     * @type String
     * @private
     */
    GUID: "yuicategoryaxis",

    /**
     * Type of data used in `Data`.
     *
     * @property _dataType
     * @readOnly
     * @private
     */
    _type: "category",

    /**
     * Calculates the maximum and minimum values for the `Data`.
     *
     * @method _updateMinAndMax
     * @private
     */
    _updateMinAndMax: function()
    {
        this._dataMaximum = Math.max(this.get("data").length - 1, 0);
        this._dataMinimum = 0;
    },

    /**
     * Gets an array of values based on a key.
     *
     * @method _getKeyArray
     * @param {String} key Value key associated with the data array.
     * @param {Array} data Array in which the data resides.
     * @return Array
     * @private
     */
    _getKeyArray: function(key, data)
    {
        var i = 0,
            obj,
            keyArr = [],
            labels = [],
            len = data.length;
        if(!this._indices)
        {
            this._indices = {};
        }
        for(; i < len; ++i)
        {
            obj = data[i];
            keyArr[i] = i;
            labels[i] = obj[key];
        }
        this._indices[key] = keyArr;
        return labels;
    },

    /**
     * Returns an array of values based on an identifier key.
     *
     * @method getDataByKey
     * @param {String} value value used to identify the array
     * @return Array
     */
    getDataByKey: function (value)
    {
        if(!this._indices)
        {
            this.get("keys");
        }
        var keys = this._indices;
        if(keys && keys[value])
        {
            return keys[value];
        }
        return null;
    },

    /**
     * Returns the total number of majorUnits that will appear on an axis.
     *
     * @method getTotalMajorUnits
     * @param {Object} majorUnit Object containing properties related to the majorUnit.
     * @param {Number} len Length of the axis.
     * @return Number
     */
    getTotalMajorUnits: function()
    {
        return this.get("data").length;
    },

    /**
     * Returns a coordinate corresponding to a data values.
     *
     * @method _getCoordFromValue
     * @param {Number} min The minimum for the axis.
     * @param {Number} max The maximum for the axis.
     * @param {Number} length The distance that the axis spans.
     * @param {Number} dataValue A value used to ascertain the coordinate.
     * @param {Number} offset Value in which to offset the coordinates.
     * @param {Boolean} reverse Indicates whether the coordinates should start from
     * the end of an axis. Only used in the numeric implementation.
     * @return Number
     * @private
     */
    _getCoordFromValue: function(min, max, length, dataValue, offset)
    {
        var range,
            multiplier,
            valuecoord;
        if(Y_Lang.isNumber(dataValue))
        {
            range = max - min;
            multiplier = length/range;
            valuecoord = (dataValue - min) * multiplier;
            valuecoord = offset + valuecoord;
        }
        else
        {
            valuecoord = NaN;
        }
        return valuecoord;
    },

    /**
     * Returns a value based of a key value and an index.
     *
     * @method getKeyValueAt
     * @param {String} key value used to look up the correct array
     * @param {Number} index within the array
     * @return String
     */
    getKeyValueAt: function(key, index)
    {
        var value = NaN,
            keys = this.get("keys");
        if(keys[key] && keys[key][index])
        {
            value = keys[key][index];
        }
        return value;
    }
};

Y.CategoryImpl = CategoryImpl;

/**
 * CategoryAxisBase manages category data for an axis.
 *
 * @class CategoryAxisBase
 * @constructor
 * @extends AxisBase
 * @uses CategoryImpl
 * @param {Object} config (optional) Configuration parameters.
 * @submodule axis-category-base
 */
Y.CategoryAxisBase = Y.Base.create("categoryAxisBase", Y.AxisBase, [Y.CategoryImpl]);


}, '3.17.1', {"requires": ["axis-base"]});
