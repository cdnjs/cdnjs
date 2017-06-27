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
_yuitest_coverage["build/axis-category-base/axis-category-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/axis-category-base/axis-category-base.js",
    code: []
};
_yuitest_coverage["build/axis-category-base/axis-category-base.js"].code=["YUI.add('axis-category-base', function (Y, NAME) {","","/**"," * Provides functionality for the handling of category axis data for a chart."," *"," * @module charts"," * @submodule axis-category-base"," */","","/**"," * CategoryImpl contains logic for managing category data. CategoryImpl is used by the following classes:"," * <ul>"," *      <li>{{#crossLink \"CategoryAxisBase\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"CategoryAxis\"}}{{/crossLink}}</li>"," *  </ul>"," *"," * @class CategoryImpl"," * @constructor"," * @submodule axis-category-base"," */","function CategoryImpl()","{","}","","CategoryImpl.NAME = \"categoryImpl\";","","CategoryImpl.ATTRS = {","    /**","     * Method used for formatting a label. This attribute allows for the default label formatting method to overridden.","     * The method use would need to implement the arguments below and return a `String` or `HTMLElement`.","     * <dl>","     *      <dt>val</dt><dd>Label to be formatted. (`String`)</dd>","     *      <dt>format</dt><dd>Template for formatting label. (optional)</dd>","     * </dl>","     *","     * @attribute labelFunction","     * @type Function","     */","};","","CategoryImpl.prototype = {","    /**","     * Formats a label based on the axis type and optionally specified format.","     *","     * @method formatLabel","     * @param {Object} value","     * @param {Object} format Pattern used to format the value.","     * @return String","     */","    formatLabel: function(val, format)","    {","        return val;","    },","","    /**","     * Object storing key data.","     *","     * @property _indices","     * @private","     */","    _indices: null,","","    /**","     * Constant used to generate unique id.","     *","     * @property GUID","     * @type String","     * @private","     */","    GUID: \"yuicategoryaxis\",","","    /**","     * Type of data used in `Data`.","     *","     * @property _dataType","     * @readOnly","     * @private","     */","    _type: \"category\",","","    /**","     * Calculates the maximum and minimum values for the `Data`.","     *","     * @method _updateMinAndMax","     * @private","     */","    _updateMinAndMax: function()","    {","        this._dataMaximum = Math.max(this.get(\"data\").length - 1, 0);","        this._dataMinimum = 0;","    },","","    /**","     * Gets an array of values based on a key.","     *","     * @method _getKeyArray","     * @param {String} key Value key associated with the data array.","     * @param {Array} data Array in which the data resides.","     * @return Array","     * @private","     */","    _getKeyArray: function(key, data)","    {","        var i = 0,","            obj,","            keyArr = [],","            labels = [],","            len = data.length;","        if(!this._indices)","        {","            this._indices = {};","        }","        for(; i < len; ++i)","        {","            obj = data[i];","            keyArr[i] = i;","            labels[i] = obj[key];","        }","        this._indices[key] = keyArr;","        return labels;","    },","","    /**","     * Returns an array of values based on an identifier key.","     *","     * @method getDataByKey","     * @param {String} value value used to identify the array","     * @return Array","     */","    getDataByKey: function (value)","    {","        if(!this._indices)","        {","            this.get(\"keys\");","        }","        var keys = this._indices;","        if(keys && keys[value])","        {","            return keys[value];","        }","        return null;","    },","","    /**","     * Returns the total number of majorUnits that will appear on an axis.","     *","     * @method getTotalMajorUnits","     * @param {Object} majorUnit Object containing properties related to the majorUnit.","     * @param {Number} len Length of the axis.","     * @return Number","     */","    getTotalMajorUnits: function(majorUnit, len)","    {","        return this.get(\"data\").length;","    },","","    /**","     * Gets the distance that the first and last ticks are offset from there respective","     * edges.","     *","     * @method getEdgeOffset","     * @param {Number} ct Number of ticks on the axis.","     * @param {Number} l Length (in pixels) of the axis.","     * @return Number","     */","    getEdgeOffset: function(ct, l)","    {","        return l/ct;","    },","","    /**","     * Returns a value based of a key value and an index.","     *","     * @method getKeyValueAt","     * @param {String} key value used to look up the correct array","     * @param {Number} index within the array","     * @return String","     */","    getKeyValueAt: function(key, index)","    {","        var value = NaN,","            keys = this.get(\"keys\");","        if(keys[key] && keys[key][index])","        {","            value = keys[key][index];","        }","        return value;","    }","};","","Y.CategoryImpl = CategoryImpl;","","/**"," * CategoryAxisBase manages category data for an axis."," *"," * @class CategoryAxisBase"," * @constructor"," * @extends AxisBase"," * @uses CategoryImpl"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis-category-base"," */","Y.CategoryAxisBase = Y.Base.create(\"categoryAxisBase\", Y.AxisBase, [Y.CategoryImpl]);","","","}, '@VERSION@', {\"requires\": [\"axis-base\"]});"];
_yuitest_coverage["build/axis-category-base/axis-category-base.js"].lines = {"1":0,"21":0,"25":0,"27":0,"41":0,"52":0,"89":0,"90":0,"104":0,"109":0,"111":0,"113":0,"115":0,"116":0,"117":0,"119":0,"120":0,"132":0,"134":0,"136":0,"137":0,"139":0,"141":0,"154":0,"168":0,"181":0,"183":0,"185":0,"187":0,"191":0,"203":0};
_yuitest_coverage["build/axis-category-base/axis-category-base.js"].functions = {"CategoryImpl:21":0,"formatLabel:50":0,"_updateMinAndMax:87":0,"_getKeyArray:102":0,"getDataByKey:130":0,"getTotalMajorUnits:152":0,"getEdgeOffset:166":0,"getKeyValueAt:179":0,"(anonymous 1):1":0};
_yuitest_coverage["build/axis-category-base/axis-category-base.js"].coveredLines = 31;
_yuitest_coverage["build/axis-category-base/axis-category-base.js"].coveredFunctions = 9;
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 1);
YUI.add('axis-category-base', function (Y, NAME) {

/**
 * Provides functionality for the handling of category axis data for a chart.
 *
 * @module charts
 * @submodule axis-category-base
 */

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
_yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 21);
function CategoryImpl()
{
}

_yuitest_coverline("build/axis-category-base/axis-category-base.js", 25);
CategoryImpl.NAME = "categoryImpl";

_yuitest_coverline("build/axis-category-base/axis-category-base.js", 27);
CategoryImpl.ATTRS = {
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

_yuitest_coverline("build/axis-category-base/axis-category-base.js", 41);
CategoryImpl.prototype = {
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
        _yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "formatLabel", 50);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 52);
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
        _yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "_updateMinAndMax", 87);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 89);
this._dataMaximum = Math.max(this.get("data").length - 1, 0);
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 90);
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
        _yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "_getKeyArray", 102);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 104);
var i = 0,
            obj,
            keyArr = [],
            labels = [],
            len = data.length;
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 109);
if(!this._indices)
        {
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 111);
this._indices = {};
        }
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 113);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 115);
obj = data[i];
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 116);
keyArr[i] = i;
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 117);
labels[i] = obj[key];
        }
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 119);
this._indices[key] = keyArr;
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 120);
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
        _yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "getDataByKey", 130);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 132);
if(!this._indices)
        {
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 134);
this.get("keys");
        }
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 136);
var keys = this._indices;
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 137);
if(keys && keys[value])
        {
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 139);
return keys[value];
        }
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 141);
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
    getTotalMajorUnits: function(majorUnit, len)
    {
        _yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "getTotalMajorUnits", 152);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 154);
return this.get("data").length;
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
        _yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "getEdgeOffset", 166);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 168);
return l/ct;
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
        _yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "getKeyValueAt", 179);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 181);
var value = NaN,
            keys = this.get("keys");
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 183);
if(keys[key] && keys[key][index])
        {
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 185);
value = keys[key][index];
        }
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 187);
return value;
    }
};

_yuitest_coverline("build/axis-category-base/axis-category-base.js", 191);
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
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 203);
Y.CategoryAxisBase = Y.Base.create("categoryAxisBase", Y.AxisBase, [Y.CategoryImpl]);


}, '@VERSION@', {"requires": ["axis-base"]});
