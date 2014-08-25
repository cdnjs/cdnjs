/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('axis-base', function (Y, NAME) {

/**
 * The Charts widget provides an api for displaying data
 * graphically.
 *
 * @module charts
 * @main charts
 */

/**
 * Provides functionality for the handling of axis data in a chart.
 *
 * @module charts
 * @submodule axis-base
 */
var Y_Lang = Y.Lang;

/**
 * The Renderer class is a base class for chart components that use the `styles`
 * attribute.
 *
 * @module charts
 * @class Renderer
 * @constructor
 */
function Renderer(){}

Renderer.ATTRS = {
        /**
         * Style properties for class
         *
         * @attribute styles
         * @type Object
         */
        styles:
        {
            getter: function()
            {
                this._styles = this._styles || this._getDefaultStyles();
                return this._styles;
            },

            setter: function(val)
            {
                this._styles = this._setStyles(val);
            }
        },

        /**
         * The graphic in which drawings will be rendered.
         *
         * @attribute graphic
         * @type Graphic
         */
        graphic: {}
};
Renderer.NAME = "renderer";

Renderer.prototype = {
    /**
     * Storage for `styles` attribute.
     *
     * @property _styles
     * @type Object
     * @private
     */
	_styles: null,

    /**
     * Method used by `styles` setter.
     *
     * @method _setStyles
     * @param {Object} newStyles Hash of properties to update.
     * @return Object
     * @protected
     */
	_setStyles: function(newstyles)
	{
		var styles = this.get("styles");
        return this._mergeStyles(newstyles, styles);
	},

    /**
     * Merges to object literals so that only specified properties are
     * overwritten.
     *
     * @method _mergeStyles
     * @param {Object} a Hash of new styles
     * @param {Object} b Hash of original styles
     * @return Object
     * @protected
     */
    _mergeStyles: function(a, b)
    {
        if(!b)
        {
            b = {};
        }
        var newstyles = Y.merge(b, {});
        Y.Object.each(a, function(value, key)
        {
            if(b.hasOwnProperty(key) && Y_Lang.isObject(value) && !Y_Lang.isFunction(value) && !Y_Lang.isArray(value))
            {
                newstyles[key] = this._mergeStyles(value, b[key]);
            }
            else
            {
                newstyles[key] = value;
            }
        }, this);
        return newstyles;
    },

    /**
     * Copies an object literal.
     *
     * @method _copyObject
     * @param {Object} obj Object literal to be copied.
     * @return Object
     * @private
     */
    _copyObject: function(obj) {
        var newObj = {},
            key,
            val;
        for(key in obj)
        {
            if(obj.hasOwnProperty(key))
            {
                val = obj[key];
                if(typeof val === "object" && !Y_Lang.isArray(val))
                {
                    newObj[key] = this._copyObject(val);
                }
                else
                {
                    newObj[key] = val;
                }
            }
        }
        return newObj;
    },

    /**
     * Gets the default value for the `styles` attribute.
     *
     * @method _getDefaultStyles
     * @return Object
     * @protected
     */
    _getDefaultStyles: function()
    {
        return {padding:{
            top:0,
            right: 0,
            bottom: 0,
            left: 0
        }};
    }
};

Y.augment(Renderer, Y.Attribute);
Y.Renderer = Renderer;

/**
 * The axis-base submodule contains functionality for the handling of axis data in a chart.
 *
 * @module charts
 * @submodule axis-base
 */
/**
 * An abstract class that provides the core functionality used by the following classes:
 * <ul>
 *      <li>{{#crossLink "CategoryAxisBase"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "NumericAxisBase"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "StackedAxisBase"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "TimeAxisBase"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "CategoryAxis"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "NumericAxis"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "StackedAxis"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "TimeAxis"}}{{/crossLink}}</li>
 *  </ul>
 *
 * @class AxisBase
 * @constructor
 * @extends Base
 * @uses Renderer
 * @param {Object} config (optional) Configuration parameters.
 * @submodule axis-base
 */
Y.AxisBase = Y.Base.create("axisBase", Y.Base, [Y.Renderer], {
    /**
     * @method initializer
     * @private
     */
    initializer: function()
    {
        this.after("minimumChange", Y.bind(this._keyChangeHandler, this));
        this.after("maximumChange", Y.bind(this._keyChangeHandler, this));
        this.after("keysChange", this._keyChangeHandler);
        this.after("dataProviderChange", this._dataProviderChangeHandler);
    },

    /**
     * Returns the value corresponding to the origin on the axis.
     *
     * @method getOrigin
     * @return Number
     */
    getOrigin: function() {
        return this.get("minimum");
    },

    /**
     * Handles changes to `dataProvider`.
     *
     * @method _dataProviderChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _dataProviderChangeHandler: function()
    {
        var keyCollection = this.get("keyCollection").concat(),
            keys = this.get("keys"),
            i;
        if(keys)
        {
            for(i in keys)
            {
                if(keys.hasOwnProperty(i))
                {
                    delete keys[i];
                }
            }
        }
        if(keyCollection && keyCollection.length)
        {
            this.set("keys", keyCollection);
        }
    },

    /**
     * Calculates the maximum and minimum values for the `Data`.
     *
     * @method _updateMinAndMax
     * @private
     */
    _updateMinAndMax: function() {
    },

    /**
     * Constant used to generate unique id.
     *
     * @property GUID
     * @type String
     * @private
     */
    GUID: "yuibaseaxis",

    /**
     * Type of data used in `Axis`.
     *
     * @property _type
     * @type String
     * @readOnly
     * @private
     */
    _type: null,

    /**
     * Storage for `setMaximum` attribute.
     *
     * @property _setMaximum
     * @type Object
     * @private
     */
    _setMaximum: null,

    /**
     * Storage for `setMinimum` attribute.
     *
     * @property _setMinimum
     * @type Object
     * @private
     */
    _setMinimum: null,

    /**
     * Reference to data array.
     *
     * @property _data
     * @type Array
     * @private
     */
    _data: null,

    /**
     * Indicates whether the all data is up to date.
     *
     * @property _updateTotalDataFlag
     * @type Boolean
     * @private
     */
    _updateTotalDataFlag: true,

    /**
     * Storage for `dataReady` attribute.
     *
     * @property _dataReady
     * @type Boolean
     * @readOnly
     * @private
     */
    _dataReady: false,

    /**
     * Adds an array to the key hash.
     *
     * @method addKey
     * @param value Indicates what key to use in retrieving
     * the array.
     */
    addKey: function (value)
	{
        this.set("keys", value);
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
            keyArray = [],
            len = data.length;
        for(; i < len; ++i)
        {
            obj = data[i];
            keyArray[i] = obj[key];
        }
        return keyArray;
    },

    /**
     * Updates the total data array.
     *
     * @method _updateTotalData
     * @private
     */
    _updateTotalData: function()
    {
		var keys = this.get("keys"),
            i;
        this._data = [];
        for(i in keys)
        {
            if(keys.hasOwnProperty(i))
            {
                this._data = this._data.concat(keys[i]);
            }
        }
        this._updateTotalDataFlag = false;
    },

    /**
     * Removes an array from the key hash.
     *
     * @method removeKey
     * @param {String} value Indicates what key to use in removing from
     * the hash.
     */
    removeKey: function(value)
    {
        var keys = this.get("keys");
        if(keys.hasOwnProperty(value))
        {
            delete keys[value];
            this._keyChangeHandler();
        }
    },

    /**
     * Returns a value based of a key value and an index.
     *
     * @method getKeyValueAt
     * @param {String} key value used to look up the correct array
     * @param {Number} index within the array
     * @return Number
     */
    getKeyValueAt: function(key, index)
    {
        var value = NaN,
            keys = this.get("keys");
        if(keys[key] && Y_Lang.isNumber(parseFloat(keys[key][index])))
        {
            value = keys[key][index];
        }
        return parseFloat(value);
    },

    /**
     * Returns values based on key identifiers. When a string is passed as an argument, an array of values is returned.
     * When an array of keys is passed as an argument, an object literal with an array of values mapped to each key is
     * returned.
     *
     * @method getDataByKey
     * @param {String|Array} value value used to identify the array
     * @return Array|Object
     */
    getDataByKey: function (value)
    {
        var obj,
            i,
            len,
            key,
            keys = this.get("keys");
        if(Y_Lang.isArray(value))
        {
            obj = {};
            len = value.length;
            for(i = 0; i < len; i = i + 1)
            {
                key = value[i];
                if(keys[key])
                {
                    obj[key] = this.getDataByKey(key);
                }
            }
        }
        else if(keys[value])
        {
            obj = keys[value];
        }
        else
        {
            obj = null;
        }
        return obj;
    },

    /**
     * Returns the total number of majorUnits that will appear on an axis.
     *
     * @method getTotalMajorUnits
     * @return Number
     */
    getTotalMajorUnits: function()
    {
        var units,
            majorUnit = this.get("styles").majorUnit;
        units = majorUnit.count;
        return units;
    },

    /**
     * Gets the distance that the first and last ticks are offset from there respective
     * edges.
     *
     * @method getEdgeOffset
     * @param {Number} ct Number of ticks on the axis.
     * @param {Number} l Length (in pixels) of the axis.
     * @return Number
     */
    getEdgeOffset: function(ct, l)
    {
        var edgeOffset;
        if(this.get("calculateEdgeOffset")) {
            edgeOffset = (l/ct)/2;
        } else {
            edgeOffset = 0;
        }
        return edgeOffset;
    },

    /**
     * Updates the `Axis` after a change in keys.
     *
     * @method _keyChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _keyChangeHandler: function()
    {
        this._updateMinAndMax();
        this._updateTotalDataFlag = true;
        this.fire("dataUpdate");
    },

    /**
     * Gets the default value for the `styles` attribute. Overrides
     * base implementation.
     *
     * @method _getDefaultStyles
     * @return Object
     * @protected
     */
    _getDefaultStyles: function()
    {
        var axisstyles = {
            majorUnit: {
                determinant:"count",
                count:11,
                distance:75
            }
        };
        return axisstyles;
    },

    /**
     * Getter method for maximum attribute.
     *
     * @method _maximumGetter
     * @return Number
     * @private
     */
    _maximumGetter: function ()
    {
        var max = this.get("dataMaximum"),
            min = this.get("minimum");
        //If all values are zero, force a range so that the Axis and related series
        //will still render.
        if(min === 0 && max === 0)
        {
            max = 10;
        }
        if(Y_Lang.isNumber(this._setMaximum))
        {
            max = this._setMaximum;
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
        this._setMaximum = parseFloat(value);
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
        var min = this.get("dataMinimum");
        if(Y_Lang.isNumber(this._setMinimum))
        {
            min = this._setMinimum;
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
    _minimumSetter: function(val)
    {
        this._setMinimum = parseFloat(val);
        return val;
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
        return Y_Lang.isNumber(this._setMaximum);
    },


    /**
     * Returns and array of coordinates corresponding to an array of data values.
     *
     * @method _getCoordsFromValues
     * @param {Number} min The minimum for the axis.
     * @param {Number} max The maximum for the axis.
     * @param {Number} length The distance that the axis spans.
     * @param {Array} dataValues An array of values.
     * @param {Number} offset Value in which to offset the coordinates.
     * @param {Boolean} reverse Indicates whether the coordinates should start from
     * the end of an axis. Only used in the numeric implementation.
     * @return Array
     * @private
     */
    _getCoordsFromValues: function(min, max, length, dataValues, offset, reverse)
    {
        var i,
            valuecoords = [],
            len = dataValues.length;
        for(i = 0; i < len; i = i + 1)
        {
            valuecoords.push(this._getCoordFromValue.apply(this, [min, max, length, dataValues[i], offset, reverse]));
        }
        return valuecoords;
    },

    /**
     * Returns and array of data values based on the axis' range and number of values.
     *
     * @method _getDataValuesByCount
     * @param {Number} count The number of values to be used.
     * @param {Number} min The minimum value of the axis.
     * @param {Number} max The maximum value of the axis.
     * @return Array
     * @private
     */
    _getDataValuesByCount: function(count, min, max)
    {
        var dataValues = [],
            dataValue = min,
            len = count - 1,
            range = max - min,
            increm = range/len,
            i;
        for(i = 0; i < len; i = i + 1)
        {
            dataValues.push(dataValue);
            dataValue = dataValue + increm;
        }
        dataValues.push(max);
        return dataValues;
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
        return Y_Lang.isNumber(this._setMinimum);
    }
}, {
    ATTRS: {
        /**
         * Determines whether and offset is automatically calculated for the edges of the axis.
         *
         * @attribute calculateEdgeOffset
         * @type Boolean
         */
        calculateEdgeOffset: {
            value: false
        },

        labelFunction: {
            valueFn: function() {
                return this.formatLabel;
            }
        },

        /**
         * Hash of array identifed by a string value.
         *
         * @attribute keys
         * @type Object
         */
        keys: {
            value: {},

            setter: function(val)
            {
                var keys = {},
                    i,
                    len,
                    data = this.get("dataProvider");
                if(Y_Lang.isArray(val))
                {
                    len = val.length;
                    for(i = 0; i < len; ++i)
                    {
                        keys[val[i]] = this._getKeyArray(val[i], data);
                    }

                }
                else if(Y_Lang.isString(val))
                {
                    keys = this.get("keys");
                    keys[val] = this._getKeyArray(val, data);
                }
                else
                {
                    for(i in val)
                    {
                        if(val.hasOwnProperty(i))
                        {
                            keys[i] = this._getKeyArray(i, data);
                        }
                    }
                }
                this._updateTotalDataFlag = true;
                return keys;
            }
        },

        /**
         *Returns the type of axis data
         *  <dl>
         *      <dt>time</dt><dd>Manages time data</dd>
         *      <dt>stacked</dt><dd>Manages stacked numeric data</dd>
         *      <dt>numeric</dt><dd>Manages numeric data</dd>
         *      <dt>category</dt><dd>Manages categorical data</dd>
         *  </dl>
         *
         * @attribute type
         * @type String
         */
        type:
        {
            readOnly: true,

            getter: function ()
            {
                return this._type;
            }
        },

        /**
         * Instance of `ChartDataProvider` that the class uses
         * to build its own data.
         *
         * @attribute dataProvider
         * @type Array
         */
        dataProvider:{
            setter: function (value)
            {
                return value;
            }
        },

        /**
         * The maximum value contained in the `data` array. Used for
         * `maximum` when `autoMax` is true.
         *
         * @attribute dataMaximum
         * @type Number
         */
        dataMaximum: {
            getter: function ()
            {
                if(!Y_Lang.isNumber(this._dataMaximum))
                {
                    this._updateMinAndMax();
                }
                return this._dataMaximum;
            }
        },

        /**
         * The maximum value that will appear on an axis.
         *
         * @attribute maximum
         * @type Number
         */
        maximum: {
            lazyAdd: false,

            getter: "_maximumGetter",

            setter: "_maximumSetter"
        },

        /**
         * The minimum value contained in the `data` array. Used for
         * `minimum` when `autoMin` is true.
         *
         * @attribute dataMinimum
         * @type Number
         */
        dataMinimum: {
            getter: function ()
            {
                if(!Y_Lang.isNumber(this._dataMinimum))
                {
                    this._updateMinAndMax();
                }
                return this._dataMinimum;
            }
        },

        /**
         * The minimum value that will appear on an axis.
         *
         * @attribute minimum
         * @type Number
         */
        minimum: {
            lazyAdd: false,

            getter: "_minimumGetter",

            setter: "_minimumSetter"
        },

        /**
         * Determines whether the maximum is calculated or explicitly
         * set by the user.
         *
         * @attribute setMax
         * @type Boolean
         */
        setMax: {
            readOnly: true,

            getter: "_getSetMax"
        },

        /**
         * Determines whether the minimum is calculated or explicitly
         * set by the user.
         *
         * @attribute setMin
         * @type Boolean
         */
        setMin: {
            readOnly: true,

            getter: "_getSetMin"
        },

        /**
         * Array of axis data
         *
         * @attribute data
         * @type Array
         */
        data: {
            getter: function ()
            {
                if(!this._data || this._updateTotalDataFlag)
                {
                    this._updateTotalData();
                }
                return this._data;
            }
        },

        /**
         * Array containing all the keys in the axis.

         * @attribute keyCollection
         * @type Array
         */
        keyCollection: {
            getter: function()
            {
                var keys = this.get("keys"),
                    i,
                    col = [];
                for(i in keys)
                {
                    if(keys.hasOwnProperty(i))
                    {
                        col.push(i);
                    }
                }
                return col;
            },
            readOnly: true
        },

        /**
         * Object which should have by the labelFunction
         *
         * @attribute labelFunctionScope
         * @type Object
         */
        labelFunctionScope: {}
    }
});


}, '3.17.2', {"requires": ["classnamemanager", "datatype-number", "datatype-date", "base", "event-custom"]});
