if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/axis-time-base/axis-time-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/axis-time-base/axis-time-base.js",
    code: []
};
_yuitest_coverage["build/axis-time-base/axis-time-base.js"].code=["YUI.add('axis-time-base', function (Y, NAME) {","","/**"," * Provides functionality for the handling of time axis data for a chart."," *"," * @module charts"," * @submodule axis-time-base"," */","","var Y_Lang = Y.Lang;","/**"," * TimeImpl manages time data on an axis."," *"," * @class TimeImpl"," * @constructor"," * @submodule axis-time-base"," */","function TimeImpl()","{","}","","TimeImpl.NAME = \"timeImpl\";","","TimeImpl.ATTRS =","{","    /**","     * Method used for formatting a label. This attribute allows for the default label formatting method to overridden.","     * The method use would need to implement the arguments below and return a `String` or an `HTMLElement`. The default","     * implementation of the method returns a `String`. The output of this method will be rendered to the DOM using","     * `appendChild`. If you override the `labelFunction` method and return an html string, you will also need to override","     * the Axis' `appendLabelFunction` to accept html as a `String`.","     * <dl>","     *      <dt>val</dt><dd>Label to be formatted. (`String`)</dd>","     *      <dt>format</dt><dd>STRFTime string used to format the label. (optional)</dd>","     * </dl>","     *","     * @attribute labelFunction","     * @type Function","     */","","    /**","     * Pattern used by the `labelFunction` to format a label.","     *","     * @attribute labelFormat","     * @type String","     */","    labelFormat: {","        value: \"%b %d, %y\"","    }","};","","TimeImpl.prototype = {","    /**","     * Type of data used in `Data`.","     *","     * @property _type","     * @readOnly","     * @private","     */","    _type: \"time\",","","    /**","     * Getter method for maximum attribute.","     *","     * @method _maximumGetter","     * @return Number","     * @private","     */","    _maximumGetter: function ()","    {","        var max = this._getNumber(this._setMaximum);","        if(!Y_Lang.isNumber(max))","        {","            max = this._getNumber(this.get(\"dataMaximum\"));","        }","        return parseFloat(max);","    },","  ","    /**","     * Setter method for maximum attribute.","     *","     * @method _maximumSetter","     * @param {Object} value","     * @private","     */","    _maximumSetter: function (value)","    {","        this._setMaximum = this._getNumber(value);","        return value;","    },","  ","    /**","     * Getter method for minimum attribute.","     *","     * @method _minimumGetter","     * @return Number","     * @private","     */","    _minimumGetter: function ()","    {","        var min = this._getNumber(this._setMinimum);","        if(!Y_Lang.isNumber(min))","        {","            min = this._getNumber(this.get(\"dataMinimum\"));","        }","        return parseFloat(min);","    },","","    /**","     * Setter method for minimum attribute.","     *","     * @method _minimumSetter","     * @param {Object} value","     * @private","     */","    _minimumSetter: function (value)","    {","        this._setMinimum = this._getNumber(value);","        return value;","    },","","    /**","     * Indicates whether or not the maximum attribute has been explicitly set.","     *","     * @method _getSetMax","     * @return Boolean","     * @private","     */","    _getSetMax: function()","    {","        var max = this._getNumber(this._setMaximum);","        return (Y_Lang.isNumber(max));","    },","","    /**","     * Indicates whether or not the minimum attribute has been explicitly set.","     *","     * @method _getSetMin","     * @return Boolean","     * @private","     */","    _getSetMin: function()","    {","        var min = this._getNumber(this._setMinimum);","        return (Y_Lang.isNumber(min));","    },","","    /**","     * Formats a label based on the axis type and optionally specified format.","     *","     * @method formatLabel","     * @param {Object} value","     * @param {Object} format Pattern used to format the value.","     * @return String","     */","    formatLabel: function(val, format)","    {","        val = Y.DataType.Date.parse(val);","        if(format)","        {","            return Y.DataType.Date.format(val, {format:format});","        }","        return val;","    },","","    /**","     * Constant used to generate unique id.","     *","     * @property GUID","     * @type String","     * @private","     */","    GUID: \"yuitimeaxis\",","","    /**","     * Type of data used in `Axis`.","     *","     * @property _dataType","     * @readOnly","     * @private","     */","    _dataType: \"time\",","","    /**","     * Gets an array of values based on a key.","     *","     * @method _getKeyArray","     * @param {String} key Value key associated with the data array.","     * @param {Array} data Array in which the data resides.","     * @return Array","     * @private","     */","    _getKeyArray: function(key, data)","    {","        var obj,","            keyArray = [],","            i = 0,","            val,","            len = data.length;","        for(; i < len; ++i)","        {","            obj = data[i][key];","            if(Y_Lang.isDate(obj))","            {","                val = obj.valueOf();","            }","            else","            {","                val = new Date(obj);","                if(Y_Lang.isDate(val))","                {","                    val = val.valueOf();","                }","                else if(!Y_Lang.isNumber(obj))","                {","                    if(Y_Lang.isNumber(parseFloat(obj)))","                    {","                        val = parseFloat(obj);","                    }","                    else","                    {","                        if(typeof obj != \"string\")","                        {","                            obj = obj;","                        }","                        val = new Date(obj).valueOf();","                    }","                }","                else","                {","                    val = obj;","                }","            }","            keyArray[i] = val;","        }","        return keyArray;","    },","","    /**","     * Calculates the maximum and minimum values for the `Axis`.","     *","     * @method _updateMinAndMax","     * @private","     */","    _updateMinAndMax: function()","    {","        var data = this.get(\"data\"),","            max = 0,","            min = 0,","            len,","            num,","            i;","        if(data && data.length && data.length > 0)","        {","            len = data.length;","            max = min = data[0];","            if(len > 1)","            {","                for(i = 1; i < len; i++)","                {","                    num = data[i];","                    if(isNaN(num))","                    {","                        continue;","                    }","                    max = Math.max(num, max);","                    min = Math.min(num, min);","                }","            }","        }","        this._dataMaximum = max;","        this._dataMinimum = min;","    },","","    /**","     * Parses value into a number.","     *","     * @method _getNumber","     * @param val {Object} Value to parse into a number","     * @return Number","     * @private","     */","    _getNumber: function(val)","    {","        if(Y_Lang.isDate(val))","        {","            val = val.valueOf();","        }","        else if(!Y_Lang.isNumber(val) && val)","        {","            val = new Date(val).valueOf();","        }","","        return val;","    }","};","","Y.TimeImpl = TimeImpl;","","/**"," * TimeAxisBase manages time data for an axis."," *"," * @class TimeAxisBase"," * @extends AxisBase"," * @uses TimeImpl"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis-time-base"," */","Y.TimeAxisBase = Y.Base.create(\"timeAxisBase\", Y.AxisBase, [Y.TimeImpl]);","","","}, '@VERSION@', {\"requires\": [\"axis-base\"]});"];
_yuitest_coverage["build/axis-time-base/axis-time-base.js"].lines = {"1":0,"10":0,"18":0,"22":0,"24":0,"52":0,"71":0,"72":0,"74":0,"76":0,"88":0,"89":0,"101":0,"102":0,"104":0,"106":0,"118":0,"119":0,"131":0,"132":0,"144":0,"145":0,"158":0,"159":0,"161":0,"163":0,"195":0,"200":0,"202":0,"203":0,"205":0,"209":0,"210":0,"212":0,"214":0,"216":0,"218":0,"222":0,"224":0,"226":0,"231":0,"234":0,"236":0,"247":0,"253":0,"255":0,"256":0,"257":0,"259":0,"261":0,"262":0,"264":0,"266":0,"267":0,"271":0,"272":0,"285":0,"287":0,"289":0,"291":0,"294":0,"298":0,"310":0};
_yuitest_coverage["build/axis-time-base/axis-time-base.js"].functions = {"TimeImpl:18":0,"_maximumGetter:69":0,"_maximumSetter:86":0,"_minimumGetter:99":0,"_minimumSetter:116":0,"_getSetMax:129":0,"_getSetMin:142":0,"formatLabel:156":0,"_getKeyArray:193":0,"_updateMinAndMax:245":0,"_getNumber:283":0,"(anonymous 1):1":0};
_yuitest_coverage["build/axis-time-base/axis-time-base.js"].coveredLines = 63;
_yuitest_coverage["build/axis-time-base/axis-time-base.js"].coveredFunctions = 12;
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 1);
YUI.add('axis-time-base', function (Y, NAME) {

/**
 * Provides functionality for the handling of time axis data for a chart.
 *
 * @module charts
 * @submodule axis-time-base
 */

_yuitest_coverfunc("build/axis-time-base/axis-time-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 10);
var Y_Lang = Y.Lang;
/**
 * TimeImpl manages time data on an axis.
 *
 * @class TimeImpl
 * @constructor
 * @submodule axis-time-base
 */
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 18);
function TimeImpl()
{
}

_yuitest_coverline("build/axis-time-base/axis-time-base.js", 22);
TimeImpl.NAME = "timeImpl";

_yuitest_coverline("build/axis-time-base/axis-time-base.js", 24);
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

_yuitest_coverline("build/axis-time-base/axis-time-base.js", 52);
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
        _yuitest_coverfunc("build/axis-time-base/axis-time-base.js", "_maximumGetter", 69);
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 71);
var max = this._getNumber(this._setMaximum);
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 72);
if(!Y_Lang.isNumber(max))
        {
            _yuitest_coverline("build/axis-time-base/axis-time-base.js", 74);
max = this._getNumber(this.get("dataMaximum"));
        }
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 76);
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
        _yuitest_coverfunc("build/axis-time-base/axis-time-base.js", "_maximumSetter", 86);
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 88);
this._setMaximum = this._getNumber(value);
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 89);
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
        _yuitest_coverfunc("build/axis-time-base/axis-time-base.js", "_minimumGetter", 99);
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 101);
var min = this._getNumber(this._setMinimum);
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 102);
if(!Y_Lang.isNumber(min))
        {
            _yuitest_coverline("build/axis-time-base/axis-time-base.js", 104);
min = this._getNumber(this.get("dataMinimum"));
        }
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 106);
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
        _yuitest_coverfunc("build/axis-time-base/axis-time-base.js", "_minimumSetter", 116);
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 118);
this._setMinimum = this._getNumber(value);
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 119);
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
        _yuitest_coverfunc("build/axis-time-base/axis-time-base.js", "_getSetMax", 129);
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 131);
var max = this._getNumber(this._setMaximum);
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 132);
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
        _yuitest_coverfunc("build/axis-time-base/axis-time-base.js", "_getSetMin", 142);
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 144);
var min = this._getNumber(this._setMinimum);
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 145);
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
        _yuitest_coverfunc("build/axis-time-base/axis-time-base.js", "formatLabel", 156);
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 158);
val = Y.DataType.Date.parse(val);
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 159);
if(format)
        {
            _yuitest_coverline("build/axis-time-base/axis-time-base.js", 161);
return Y.DataType.Date.format(val, {format:format});
        }
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 163);
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
        _yuitest_coverfunc("build/axis-time-base/axis-time-base.js", "_getKeyArray", 193);
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 195);
var obj,
            keyArray = [],
            i = 0,
            val,
            len = data.length;
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 200);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/axis-time-base/axis-time-base.js", 202);
obj = data[i][key];
            _yuitest_coverline("build/axis-time-base/axis-time-base.js", 203);
if(Y_Lang.isDate(obj))
            {
                _yuitest_coverline("build/axis-time-base/axis-time-base.js", 205);
val = obj.valueOf();
            }
            else
            {
                _yuitest_coverline("build/axis-time-base/axis-time-base.js", 209);
val = new Date(obj);
                _yuitest_coverline("build/axis-time-base/axis-time-base.js", 210);
if(Y_Lang.isDate(val))
                {
                    _yuitest_coverline("build/axis-time-base/axis-time-base.js", 212);
val = val.valueOf();
                }
                else {_yuitest_coverline("build/axis-time-base/axis-time-base.js", 214);
if(!Y_Lang.isNumber(obj))
                {
                    _yuitest_coverline("build/axis-time-base/axis-time-base.js", 216);
if(Y_Lang.isNumber(parseFloat(obj)))
                    {
                        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 218);
val = parseFloat(obj);
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 222);
if(typeof obj != "string")
                        {
                            _yuitest_coverline("build/axis-time-base/axis-time-base.js", 224);
obj = obj;
                        }
                        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 226);
val = new Date(obj).valueOf();
                    }
                }
                else
                {
                    _yuitest_coverline("build/axis-time-base/axis-time-base.js", 231);
val = obj;
                }}
            }
            _yuitest_coverline("build/axis-time-base/axis-time-base.js", 234);
keyArray[i] = val;
        }
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 236);
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
        _yuitest_coverfunc("build/axis-time-base/axis-time-base.js", "_updateMinAndMax", 245);
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 247);
var data = this.get("data"),
            max = 0,
            min = 0,
            len,
            num,
            i;
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 253);
if(data && data.length && data.length > 0)
        {
            _yuitest_coverline("build/axis-time-base/axis-time-base.js", 255);
len = data.length;
            _yuitest_coverline("build/axis-time-base/axis-time-base.js", 256);
max = min = data[0];
            _yuitest_coverline("build/axis-time-base/axis-time-base.js", 257);
if(len > 1)
            {
                _yuitest_coverline("build/axis-time-base/axis-time-base.js", 259);
for(i = 1; i < len; i++)
                {
                    _yuitest_coverline("build/axis-time-base/axis-time-base.js", 261);
num = data[i];
                    _yuitest_coverline("build/axis-time-base/axis-time-base.js", 262);
if(isNaN(num))
                    {
                        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 264);
continue;
                    }
                    _yuitest_coverline("build/axis-time-base/axis-time-base.js", 266);
max = Math.max(num, max);
                    _yuitest_coverline("build/axis-time-base/axis-time-base.js", 267);
min = Math.min(num, min);
                }
            }
        }
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 271);
this._dataMaximum = max;
        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 272);
this._dataMinimum = min;
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
        _yuitest_coverfunc("build/axis-time-base/axis-time-base.js", "_getNumber", 283);
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 285);
if(Y_Lang.isDate(val))
        {
            _yuitest_coverline("build/axis-time-base/axis-time-base.js", 287);
val = val.valueOf();
        }
        else {_yuitest_coverline("build/axis-time-base/axis-time-base.js", 289);
if(!Y_Lang.isNumber(val) && val)
        {
            _yuitest_coverline("build/axis-time-base/axis-time-base.js", 291);
val = new Date(val).valueOf();
        }}

        _yuitest_coverline("build/axis-time-base/axis-time-base.js", 294);
return val;
    }
};

_yuitest_coverline("build/axis-time-base/axis-time-base.js", 298);
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
_yuitest_coverline("build/axis-time-base/axis-time-base.js", 310);
Y.TimeAxisBase = Y.Base.create("timeAxisBase", Y.AxisBase, [Y.TimeImpl]);


}, '@VERSION@', {"requires": ["axis-base"]});
