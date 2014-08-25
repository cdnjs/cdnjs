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
_yuitest_coverage["build/axis-category-base/axis-category-base.js"].code=["YUI.add('axis-category-base', function (Y, NAME) {","","/**"," * Provides functionality for the handling of category axis data for a chart."," *"," * @module charts"," * @submodule axis-category-base"," */","","/**"," * CategoryImpl contains logic for managing category data. CategoryImpl is used by the following classes:"," * <ul>"," *      <li>{{#crossLink \"CategoryAxisBase\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"CategoryAxis\"}}{{/crossLink}}</li>"," *  </ul>"," *"," * @class CategoryImpl"," * @constructor"," * @submodule axis-category-base"," */","function CategoryImpl()","{","}","","CategoryImpl.NAME = \"categoryImpl\";","","CategoryImpl.ATTRS = {","    /**","     * Determines whether and offset is automatically calculated for the edges of the axis.","     *","     * @attribute calculateEdgeOffset","     * @type Boolean","     */","    calculateEdgeOffset: {","        value: true","    }","","    /**","     * Method used for formatting a label. This attribute allows for the default label formatting method to overridden.","     * The method use would need to implement the arguments below and return a `String` or `HTMLElement`.","     * <dl>","     *      <dt>val</dt><dd>Label to be formatted. (`String`)</dd>","     *      <dt>format</dt><dd>Template for formatting label. (optional)</dd>","     * </dl>","     *","     * @attribute labelFunction","     * @type Function","     */","};","","CategoryImpl.prototype = {","    /**","     * Formats a label based on the axis type and optionally specified format.","     *","     * @method formatLabel","     * @param {Object} value","     * @return String","     */","    formatLabel: function(val)","    {","        return val;","    },","","    /**","     * Object storing key data.","     *","     * @property _indices","     * @private","     */","    _indices: null,","","    /**","     * Constant used to generate unique id.","     *","     * @property GUID","     * @type String","     * @private","     */","    GUID: \"yuicategoryaxis\",","","    /**","     * Type of data used in `Data`.","     *","     * @property _dataType","     * @readOnly","     * @private","     */","    _type: \"category\",","","    /**","     * Calculates the maximum and minimum values for the `Data`.","     *","     * @method _updateMinAndMax","     * @private","     */","    _updateMinAndMax: function()","    {","        this._dataMaximum = Math.max(this.get(\"data\").length - 1, 0);","        this._dataMinimum = 0;","    },","","    /**","     * Gets an array of values based on a key.","     *","     * @method _getKeyArray","     * @param {String} key Value key associated with the data array.","     * @param {Array} data Array in which the data resides.","     * @return Array","     * @private","     */","    _getKeyArray: function(key, data)","    {","        var i = 0,","            obj,","            keyArr = [],","            labels = [],","            len = data.length;","        if(!this._indices)","        {","            this._indices = {};","        }","        for(; i < len; ++i)","        {","            obj = data[i];","            keyArr[i] = i;","            labels[i] = obj[key];","        }","        this._indices[key] = keyArr;","        return labels;","    },","","    /**","     * Returns an array of values based on an identifier key.","     *","     * @method getDataByKey","     * @param {String} value value used to identify the array","     * @return Array","     */","    getDataByKey: function (value)","    {","        if(!this._indices)","        {","            this.get(\"keys\");","        }","        var keys = this._indices;","        if(keys && keys[value])","        {","            return keys[value];","        }","        return null;","    },","","    /**","     * Returns the total number of majorUnits that will appear on an axis.","     *","     * @method getTotalMajorUnits","     * @param {Object} majorUnit Object containing properties related to the majorUnit.","     * @param {Number} len Length of the axis.","     * @return Number","     */","    getTotalMajorUnits: function()","    {","        return this.get(\"data\").length;","    },","","    /**","     * Returns a value based of a key value and an index.","     *","     * @method getKeyValueAt","     * @param {String} key value used to look up the correct array","     * @param {Number} index within the array","     * @return String","     */","    getKeyValueAt: function(key, index)","    {","        var value = NaN,","            keys = this.get(\"keys\");","        if(keys[key] && keys[key][index])","        {","            value = keys[key][index];","        }","        return value;","    }","};","","Y.CategoryImpl = CategoryImpl;","","/**"," * CategoryAxisBase manages category data for an axis."," *"," * @class CategoryAxisBase"," * @constructor"," * @extends AxisBase"," * @uses CategoryImpl"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis-category-base"," */","Y.CategoryAxisBase = Y.Base.create(\"categoryAxisBase\", Y.AxisBase, [Y.CategoryImpl]);","","","}, '@VERSION@', {\"requires\": [\"axis-base\"]});"];
_yuitest_coverage["build/axis-category-base/axis-category-base.js"].lines = {"1":0,"21":0,"25":0,"27":0,"51":0,"61":0,"98":0,"99":0,"113":0,"118":0,"120":0,"122":0,"124":0,"125":0,"126":0,"128":0,"129":0,"141":0,"143":0,"145":0,"146":0,"148":0,"150":0,"163":0,"176":0,"178":0,"180":0,"182":0,"186":0,"198":0};
_yuitest_coverage["build/axis-category-base/axis-category-base.js"].functions = {"CategoryImpl:21":0,"formatLabel:59":0,"_updateMinAndMax:96":0,"_getKeyArray:111":0,"getDataByKey:139":0,"getTotalMajorUnits:161":0,"getKeyValueAt:174":0,"(anonymous 1):1":0};
_yuitest_coverage["build/axis-category-base/axis-category-base.js"].coveredLines = 30;
_yuitest_coverage["build/axis-category-base/axis-category-base.js"].coveredFunctions = 8;
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

_yuitest_coverline("build/axis-category-base/axis-category-base.js", 51);
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
        _yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "formatLabel", 59);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 61);
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
        _yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "_updateMinAndMax", 96);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 98);
this._dataMaximum = Math.max(this.get("data").length - 1, 0);
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 99);
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
        _yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "_getKeyArray", 111);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 113);
var i = 0,
            obj,
            keyArr = [],
            labels = [],
            len = data.length;
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 118);
if(!this._indices)
        {
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 120);
this._indices = {};
        }
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 122);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 124);
obj = data[i];
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 125);
keyArr[i] = i;
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 126);
labels[i] = obj[key];
        }
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 128);
this._indices[key] = keyArr;
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 129);
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
        _yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "getDataByKey", 139);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 141);
if(!this._indices)
        {
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 143);
this.get("keys");
        }
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 145);
var keys = this._indices;
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 146);
if(keys && keys[value])
        {
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 148);
return keys[value];
        }
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 150);
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
        _yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "getTotalMajorUnits", 161);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 163);
return this.get("data").length;
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
        _yuitest_coverfunc("build/axis-category-base/axis-category-base.js", "getKeyValueAt", 174);
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 176);
var value = NaN,
            keys = this.get("keys");
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 178);
if(keys[key] && keys[key][index])
        {
            _yuitest_coverline("build/axis-category-base/axis-category-base.js", 180);
value = keys[key][index];
        }
        _yuitest_coverline("build/axis-category-base/axis-category-base.js", 182);
return value;
    }
};

_yuitest_coverline("build/axis-category-base/axis-category-base.js", 186);
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
_yuitest_coverline("build/axis-category-base/axis-category-base.js", 198);
Y.CategoryAxisBase = Y.Base.create("categoryAxisBase", Y.AxisBase, [Y.CategoryImpl]);


}, '@VERSION@', {"requires": ["axis-base"]});
