/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('axis-time-base', function (Y, NAME) {

/**
 * Provides functionality for the handling of time axis data for a chart.
 *
 * @module charts
 * @submodule axis-time-base
 */
var Y_Lang = Y.Lang;

/**
 * TimeImpl contains logic for time data. TimeImpl is used by the following classes:
 * <ul>
 *      <li>{{#crossLink "TimeAxisBase"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "TimeAxis"}}{{/crossLink}}</li>
 *  </ul>
 *
 * @class TimeImpl
 * @constructor
 * @submodule axis-time-base
 */
function TimeImpl()
{
}

TimeImpl.NAME = "timeImpl";

TimeImpl.ATTRS =
{
    /**
     * Method used for formatting a label. This attribute allows for the default label formatting method to overridden.
     * The method use would need to implement the arguments below and return a `String` or an `HTMLElement`. The default
     * implementation of the method returns a `String`. The output of this method will be rendered to the DOM using
     * `appendChild`. If you override the `labelFunction` method and return an html string, you will also need to override
     * the Axis' `appendLabelFunction` to accept html as a `String`.
     * <dl>
     *      <dt>val</dt><dd>Label to be formatted. (`String`)</dd>
     *      <dt>format</dt><dd>STRFTime string used to format the label. (optional)</dd>
     * </dl>
     *
     * @attribute labelFunction
     * @type Function
     */

    /**
     * Pattern used by the `labelFunction` to format a label.
     *
     * @attribute labelFormat
     * @type String
     */
    labelFormat: {
        value: "%b %d, %y"
    }
};

TimeImpl.prototype = {
    /**
     * Type of data used in `Data`.
     *
     * @property _type
     * @readOnly
     * @private
     */
    _type: "time",

    /**
     * Getter method for maximum attribute.
     *
     * @method _maximumGetter
     * @return Number
     * @private
     */
    _maximumGetter: function ()
    {
        var max = this._getNumber(this._setMaximum);
        if(!Y_Lang.isNumber(max))
        {
            max = this._getNumber(this.get("dataMaximum"));
        }
        return parseFloat(max);
    },

    /**
     * Setter method for maximum attribute.
     *
     * @method _maximumSetter
     * @param {Object} value
     * @private
     */
    _maximumSetter: function (value)
    {
        this._setMaximum = this._getNumber(value);
        return value;
    },

    /**
     * Getter method for minimum attribute.
     *
     * @method _minimumGetter
     * @return Number
     * @private
     */
    _minimumGetter: function ()
    {
        var min = this._getNumber(this._setMinimum);
        if(!Y_Lang.isNumber(min))
        {
            min = this._getNumber(this.get("dataMinimum"));
        }
        return parseFloat(min);
    },

    /**
     * Setter method for minimum attribute.
     *
     * @method _minimumSetter
     * @param {Object} value
     * @private
     */
    _minimumSetter: function (value)
    {
        this._setMinimum = this._getNumber(value);
        return value;
    },

    /**
     * Indicates whether or not the maximum attribute has been explicitly set.
     *
     * @method _getSetMax
     * @return Boolean
     * @private
     */
    _getSetMax: function()
    {
        var max = this._getNumber(this._setMaximum);
        return (Y_Lang.isNumber(max));
    },

    /**
     * Indicates whether or not the minimum attribute has been explicitly set.
     *
     * @method _getSetMin
     * @return Boolean
     * @private
     */
    _getSetMin: function()
    {
        var min = this._getNumber(this._setMinimum);
        return (Y_Lang.isNumber(min));
    },

    /**
     * Formats a label based on the axis type and optionally specified format.
     *
     * @method formatLabel
     * @param {Object} value
     * @param {Object} format Pattern used to format the value.
     * @return String
     */
    formatLabel: function(val, format)
    {
        val = Y.DataType.Date.parse(val);
        if(format)
        {
            return Y.DataType.Date.format(val, {format:format});
        }
        return val;
    },

    /**
     * Constant used to generate unique id.
     *
     * @property GUID
     * @type String
     * @private
     */
    GUID: "yuitimeaxis",

    /**
     * Type of data used in `Axis`.
     *
     * @property _dataType
     * @readOnly
     * @private
     */
    _dataType: "time",

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
        var obj,
            keyArray = [],
            i = 0,
            val,
            len = data.length;
        for(; i < len; ++i)
        {
            obj = data[i][key];
            if(Y_Lang.isDate(obj))
            {
                val = obj.valueOf();
            }
            else
            {
                val = new Date(obj);
                if(Y_Lang.isDate(val))
                {
                    val = val.valueOf();
                }
                else if(!Y_Lang.isNumber(obj))
                {
                    if(Y_Lang.isNumber(parseFloat(obj)))
                    {
                        val = parseFloat(obj);
                    }
                    else
                    {
                        if(typeof obj !== "string")
                        {
                            obj = obj;
                        }
                        val = new Date(obj).valueOf();
                    }
                }
                else
                {
                    val = obj;
                }
            }
            keyArray[i] = val;
        }
        return keyArray;
    },

    /**
     * Calculates the maximum and minimum values for the `Axis`.
     *
     * @method _updateMinAndMax
     * @private
     */
    _updateMinAndMax: function()
    {
        var data = this.get("data"),
            max = 0,
            min = 0,
            len,
            num,
            i;
        if(data && data.length && data.length > 0)
        {
            len = data.length;
            max = min = data[0];
            if(len > 1)
            {
                for(i = 1; i < len; i++)
                {
                    num = data[i];
                    if(isNaN(num))
                    {
                        continue;
                    }
                    max = Math.max(num, max);
                    min = Math.min(num, min);
                }
            }
        }
        this._dataMaximum = max;
        this._dataMinimum = min;
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
            valuecoord,
            isNumber = Y_Lang.isNumber;
            dataValue = this._getNumber(dataValue);
        if(isNumber(dataValue))
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
     * Parses value into a number.
     *
     * @method _getNumber
     * @param val {Object} Value to parse into a number
     * @return Number
     * @private
     */
    _getNumber: function(val)
    {
        if(Y_Lang.isDate(val))
        {
            val = val.valueOf();
        }
        else if(!Y_Lang.isNumber(val) && val)
        {
            val = new Date(val).valueOf();
        }

        return val;
    }
};

Y.TimeImpl = TimeImpl;

/**
 * TimeAxisBase manages time data for an axis.
 *
 * @class TimeAxisBase
 * @extends AxisBase
 * @uses TimeImpl
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule axis-time-base
 */
Y.TimeAxisBase = Y.Base.create("timeAxisBase", Y.AxisBase, [Y.TimeImpl]);


}, '3.15.0', {"requires": ["axis-base"]});
