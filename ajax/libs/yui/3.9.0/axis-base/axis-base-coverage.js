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
_yuitest_coverage["build/axis-base/axis-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/axis-base/axis-base.js",
    code: []
};
_yuitest_coverage["build/axis-base/axis-base.js"].code=["YUI.add('axis-base', function (Y, NAME) {","","/**"," * The Charts widget provides an api for displaying data"," * graphically."," *"," * @module charts"," * @main charts"," */","","/**"," * Provides functionality for the handling of axis data in a chart."," *"," * @module charts"," * @submodule axis-base"," */","","var CONFIG = Y.config,","    WINDOW = CONFIG.win,","    DOCUMENT = CONFIG.doc,","    Y_Lang = Y.Lang,","    IS_STRING = Y_Lang.isString,","    Y_DOM = Y.DOM,","    LeftAxisLayout,","    RightAxisLayout,","    BottomAxisLayout,","    TopAxisLayout,","    _getClassName = Y.ClassNameManager.getClassName,","    SERIES_MARKER = _getClassName(\"seriesmarker\");","","","/**"," * The Renderer class is a base class for chart components that use the `styles`"," * attribute."," *"," * @module charts"," * @class Renderer"," * @constructor"," */","function Renderer(){}","","Renderer.ATTRS = {","        /**","         * Style properties for class","         *","         * @attribute styles","         * @type Object","         */","        styles:","        {","            getter: function()","            {","                this._styles = this._styles || this._getDefaultStyles();","                return this._styles;","            },","","            setter: function(val)","            {","                this._styles = this._setStyles(val);","            }","        },","","        /**","         * The graphic in which drawings will be rendered.","         *","         * @attribute graphic","         * @type Graphic","         */","        graphic: {}","};","Renderer.NAME = \"renderer\";","","Renderer.prototype = {","    /**","     * Storage for `styles` attribute.","     *","     * @property _styles","     * @type Object","     * @private","     */","	_styles: null,","","    /**","     * Method used by `styles` setter.","     *","     * @method _setStyles","     * @param {Object} newStyles Hash of properties to update.","     * @return Object","     * @protected","     */","	_setStyles: function(newstyles)","	{","		var styles = this.get(\"styles\");","        return this._mergeStyles(newstyles, styles);","	},","","    /**","     * Merges to object literals so that only specified properties are","     * overwritten.","     *","     * @method _mergeStyles","     * @param {Object} a Hash of new styles","     * @param {Object} b Hash of original styles","     * @return Object","     * @protected","     */","    _mergeStyles: function(a, b)","    {","        if(!b)","        {","            b = {};","        }","        var newstyles = Y.merge(b, {});","        Y.Object.each(a, function(value, key, a)","        {","            if(b.hasOwnProperty(key) && Y_Lang.isObject(value) && !Y_Lang.isFunction(value) && !Y_Lang.isArray(value))","            {","                newstyles[key] = this._mergeStyles(value, b[key]);","            }","            else","            {","                newstyles[key] = value;","            }","        }, this);","        return newstyles;","    },","","    /**","     * Gets the default value for the `styles` attribute.","     *","     * @method _getDefaultStyles","     * @return Object","     * @protected","     */","    _getDefaultStyles: function()","    {","        return {padding:{","            top:0,","            right: 0,","            bottom: 0,","            left: 0","        }};","    }","};","","Y.augment(Renderer, Y.Attribute);","Y.Renderer = Renderer;","","/**"," * The axis-base submodule contains functionality for the handling of axis data in a chart."," *"," * @module charts"," * @submodule axis-base"," */","/**"," * An abstract class that provides the core functionality used by the following classes:"," * <ul>"," *      <li>{{#crossLink \"CategoryAxisBase\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"NumericAxisBase\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"StackedAxisBase\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"TimeAxisBase\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"CategoryAxis\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"NumericAxis\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"StackedAxis\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"TimeAxis\"}}{{/crossLink}}</li>"," *  </ul>"," *"," * @class AxisBase"," * @constructor"," * @extends Base"," * @uses Renderer"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis-base"," */","Y.AxisBase = Y.Base.create(\"axisBase\", Y.Base, [Y.Renderer], {","    /**","     * @method initializer","     * @private","     */","    initializer: function()","    {","        this.after(\"minimumChange\", Y.bind(this._keyChangeHandler, this));","        this.after(\"maximumChange\", Y.bind(this._keyChangeHandler, this));","        this.after(\"keysChange\", this._keyChangeHandler);","        this.after(\"dataProviderChange\", this._dataProviderChangeHandler);","    },","","    /**","     * Handles changes to `dataProvider`.","     *","     * @method _dataProviderChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _dataProviderChangeHandler: function(e)","    {","        var keyCollection = this.get(\"keyCollection\").concat(),","            keys = this.get(\"keys\"),","            i;","        if(keys)","        {","            for(i in keys)","            {","                if(keys.hasOwnProperty(i))","                {","                    delete keys[i];","                }","            }","        }","        if(keyCollection && keyCollection.length)","        {","            this.set(\"keys\", keyCollection);","        }","    },","","    /**","     * Calculates the maximum and minimum values for the `Data`.","     *","     * @method _updateMinAndMax","     * @private","     */","    _updateMinAndMax: function() {","    },","","    /**","     * Constant used to generate unique id.","     *","     * @property GUID","     * @type String","     * @private","     */","    GUID: \"yuibaseaxis\",","","    /**","     * Type of data used in `Axis`.","     *","     * @property _type","     * @type String","     * @readOnly","     * @private","     */","    _type: null,","","    /**","     * Storage for `setMaximum` attribute.","     *","     * @property _setMaximum","     * @type Object","     * @private","     */","    _setMaximum: null,","","    /**","     * Storage for `setMinimum` attribute.","     *","     * @property _setMinimum","     * @type Object","     * @private","     */","    _setMinimum: null,","","    /**","     * Reference to data array.","     *","     * @property _data","     * @type Array","     * @private","     */","    _data: null,","","    /**","     * Indicates whether the all data is up to date.","     *","     * @property _updateTotalDataFlag","     * @type Boolean","     * @private","     */","    _updateTotalDataFlag: true,","","    /**","     * Storage for `dataReady` attribute.","     *","     * @property _dataReady","     * @type Boolean","     * @readOnly","     * @private","     */","    _dataReady: false,","","    /**","     * Adds an array to the key hash.","     *","     * @method addKey","     * @param value Indicates what key to use in retrieving","     * the array.","     */","    addKey: function (value)","	{","        this.set(\"keys\", value);","	},","","    /**","     * Gets an array of values based on a key.","     *","     * @method _getKeyArray","     * @param {String} key Value key associated with the data array.","     * @param {Array} data Array in which the data resides.","     * @return Array","     * @private","     */","    _getKeyArray: function(key, data)","    {","        var i = 0,","            obj,","            keyArray = [],","            len = data.length;","        for(; i < len; ++i)","        {","            obj = data[i];","            keyArray[i] = obj[key];","        }","        return keyArray;","    },","","    /**","     * Updates the total data array.","     *","     * @method _updateTotalData","     * @private","     */","    _updateTotalData: function()","    {","		var keys = this.get(\"keys\"),","            i;","        this._data = [];","        for(i in keys)","        {","            if(keys.hasOwnProperty(i))","            {","                this._data = this._data.concat(keys[i]);","            }","        }","        this._updateTotalDataFlag = false;","    },","","    /**","     * Removes an array from the key hash.","     *","     * @method removeKey","     * @param {String} value Indicates what key to use in removing from","     * the hash.","     */","    removeKey: function(value)","    {","        var keys = this.get(\"keys\");","        if(keys.hasOwnProperty(value))","        {","            delete keys[value];","            this._keyChangeHandler();","        }","    },","","    /**","     * Returns a value based of a key value and an index.","     *","     * @method getKeyValueAt","     * @param {String} key value used to look up the correct array","     * @param {Number} index within the array","     * @return Number","     */","    getKeyValueAt: function(key, index)","    {","        var value = NaN,","            keys = this.get(\"keys\");","        if(keys[key] && Y_Lang.isNumber(parseFloat(keys[key][index])))","        {","            value = keys[key][index];","        }","        return parseFloat(value);","    },","","    /**","     * Returns values based on key identifiers. When a string is passed as an argument, an array of values is returned.","     * When an array of keys is passed as an argument, an object literal with an array of values mapped to each key is ","     * returned.","     *","     * @method getDataByKey","     * @param {String|Array} value value used to identify the array","     * @return Array|Object","     */","    getDataByKey: function (value)","    {","        var obj,","            i,","            len,","            key,","            keys = this.get(\"keys\");","        if(Y_Lang.isArray(value)) ","        {","            obj = {};","            len = value.length;","            for(i = 0; i < len; i = i + 1) ","            {","                key = value[i];","                if(keys[key]) ","                {","                    obj[key] = this.getDataByKey(key);","                }","            }","        }","        else if(keys[value])","        {","            obj = keys[value];","        }","        else","        {","            obj = null;","        }","        return obj;","    },","","    /**","     * Returns the total number of majorUnits that will appear on an axis.","     *","     * @method getTotalMajorUnits","     * @return Number","     */","    getTotalMajorUnits: function()","    {","        var units,","            majorUnit = this.get(\"styles\").majorUnit;","        units = majorUnit.count;","        return units;","    },","","    /**","     * Gets the distance that the first and last ticks are offset from there respective","     * edges.","     *","     * @method getEdgeOffset","     * @param {Number} ct Number of ticks on the axis.","     * @param {Number} l Length (in pixels) of the axis.","     * @return Number","     */","    getEdgeOffset: function(ct, l)","    {","        var edgeOffset;","        if(this.get(\"calculateEdgeOffset\")) {","            edgeOffset = l/ct;","        } else {","            edgeOffset = 0;","        }","        return edgeOffset;","    },","","    /**","     * Updates the `Axis` after a change in keys.","     *","     * @method _keyChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _keyChangeHandler: function(e)","    {","        this._updateMinAndMax();","        this._updateTotalDataFlag = true;","        this.fire(\"dataUpdate\");","    },","","    /**","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     * @protected","     */","    _getDefaultStyles: function()","    {","        var axisstyles = {","            majorUnit: {","                determinant:\"count\",","                count:11,","                distance:75","            }","        };","        return axisstyles;","    },","          ","    /**","     * Getter method for maximum attribute.","     *","     * @method _maximumGetter","     * @return Number","     * @private","     */","    _maximumGetter: function ()","    {","        var max = this.get(\"dataMaximum\"),","            min = this.get(\"minimum\");","        //If all values are zero, force a range so that the Axis and related series","        //will still render.","        if(min === 0 && max === 0)","        {","            max = 10;","        }","        if(Y_Lang.isNumber(this._setMaximum))","        {","            max = this._setMaximum;","        }","        return parseFloat(max);","    },","  ","    /**","     * Setter method for maximum attribute.","     *","     * @method _maximumSetter","     * @param {Object} value","     * @private","     */","    _maximumSetter: function (value)","    {","        this._setMaximum = parseFloat(value);","        return value;","    },","","    /**","     * Getter method for minimum attribute.","     *","     * @method _minimumGetter","     * @return Number","     * @private","     */","    _minimumGetter: function ()","    {","        var min = this.get(\"dataMinimum\");","        if(Y_Lang.isNumber(this._setMinimum))","        {","            min = this._setMinimum;","        }","        return parseFloat(min);","    },","  ","    /**","     * Setter method for minimum attribute.","     *","     * @method _minimumSetter","     * @param {Object} value","     * @private","     */","    _minimumSetter: function(val)","    {","        this._setMinimum = parseFloat(val);","        return val;","    },","","    /**","     * Indicates whether or not the maximum attribute has been explicitly set.","     *","     * @method _getSetMax","     * @return Boolean","     * @private","     */","    _getSetMax: function()","    {","        return Y_Lang.isNumber(this._setMaximum);","    },","  ","    /**","     * Indicates whether or not the minimum attribute has been explicitly set.","     *","     * @method _getSetMin","     * @return Boolean","     * @private","     */","    _getSetMin: function()","    {","        return Y_Lang.isNumber(this._setMinimum);","    }","}, {","    ATTRS: {","        /**","         * Determines whether and offset is automatically calculated for the edges of the axis.","         *","         * @attribute calculateEdgeOffset","         * @type Boolean","         */","        calculateEdgeOffset: {","            value: false","        },","        ","        labelFunction: {","            valueFn: function() {","                return this.formatLabel;","            }","        },","  ","        /**","         * Hash of array identifed by a string value.","         *","         * @attribute keys","         * @type Object","         */","        keys: {","            value: {},","","            setter: function(val)","            {","                var keys = {},","                    i,","                    len,","                    data = this.get(\"dataProvider\");","                if(Y_Lang.isArray(val))","                {","                    len = val.length;","                    for(i = 0; i < len; ++i)","                    {","                        keys[val[i]] = this._getKeyArray(val[i], data);","                    }","","                }","                else if(Y_Lang.isString(val))","                {","                    keys = this.get(\"keys\");","                    keys[val] = this._getKeyArray(val, data);","                }","                else","                {","                    for(i in val)","                    {","                        if(val.hasOwnProperty(i))","                        {","                            keys[i] = this._getKeyArray(i, data);","                        }","                    }","                }","                this._updateTotalDataFlag = true;","                return keys;","            }","        },","","        /**","         *Returns the type of axis data","         *  <dl>","         *      <dt>time</dt><dd>Manages time data</dd>","         *      <dt>stacked</dt><dd>Manages stacked numeric data</dd>","         *      <dt>numeric</dt><dd>Manages numeric data</dd>","         *      <dt>category</dt><dd>Manages categorical data</dd>","         *  </dl>","         *","         * @attribute type","         * @type String","         */","        type:","        {","            readOnly: true,","","            getter: function ()","            {","                return this._type;","            }","        },","","        /**","         * Instance of `ChartDataProvider` that the class uses","         * to build its own data.","         *","         * @attribute dataProvider","         * @type Array","         */","        dataProvider:{","            setter: function (value)","            {","                return value;","            }","        },","","        /**","         * The maximum value contained in the `data` array. Used for","         * `maximum` when `autoMax` is true.","         *","         * @attribute dataMaximum","         * @type Number","         */","        dataMaximum: {","            getter: function ()","            {","                if(!Y_Lang.isNumber(this._dataMaximum))","                {","                    this._updateMinAndMax();","                }","                return this._dataMaximum;","            }","        },","","        /**","         * The maximum value that will appear on an axis.","         *","         * @attribute maximum","         * @type Number","         */","        maximum: {","            lazyAdd: false,","","            getter: \"_maximumGetter\",","          ","            setter: \"_maximumSetter\"","        },","","        /**","         * The minimum value contained in the `data` array. Used for","         * `minimum` when `autoMin` is true.","         *","         * @attribute dataMinimum","         * @type Number","         */","        dataMinimum: {","            getter: function ()","            {","                if(!Y_Lang.isNumber(this._dataMinimum))","                {","                    this._updateMinAndMax();","                }","                return this._dataMinimum;","            }","        },","","        /**","         * The minimum value that will appear on an axis.","         *","         * @attribute minimum","         * @type Number","         */","        minimum: {","            lazyAdd: false,","","            getter: \"_minimumGetter\",","          ","            setter: \"_minimumSetter\"","        },","","        /**","         * Determines whether the maximum is calculated or explicitly","         * set by the user.","         *","         * @attribute setMax","         * @type Boolean","         */","        setMax: {","            readOnly: true,","","            getter: \"_getSetMax\"","        },","","        /**","         * Determines whether the minimum is calculated or explicitly","         * set by the user.","         *","         * @attribute setMin","         * @type Boolean","         */","        setMin: {","            readOnly: true,","","            getter: \"_getSetMin\"","        },","","        /**","         * Array of axis data","         *","         * @attribute data","         * @type Array","         */","        data: {","            getter: function ()","            {","                if(!this._data || this._updateTotalDataFlag)","                {","                    this._updateTotalData();","                }","                return this._data;","            }","        },","","        /**","         * Array containing all the keys in the axis.","","         * @attribute keyCollection","         * @type Array","         */","        keyCollection: {","            getter: function()","            {","                var keys = this.get(\"keys\"),","                    i,","                    col = [];","                for(i in keys)","                {","                    if(keys.hasOwnProperty(i))","                    {","                        col.push(i);","                    }","                }","                return col;","            },","            readOnly: true","        },","","        /**","         * Object which should have by the labelFunction","         *","         * @attribute labelFunctionScope","         * @type Object","         */","        labelFunctionScope: {}","    }","});","","","}, '@VERSION@', {\"requires\": [\"classnamemanager\", \"datatype-number\", \"datatype-date\", \"base\", \"event-custom\"]});"];
_yuitest_coverage["build/axis-base/axis-base.js"].lines = {"1":0,"18":0,"40":0,"42":0,"53":0,"54":0,"59":0,"71":0,"73":0,"93":0,"94":0,"109":0,"111":0,"113":0,"114":0,"116":0,"118":0,"122":0,"125":0,"137":0,"146":0,"147":0,"175":0,"182":0,"183":0,"184":0,"185":0,"197":0,"200":0,"202":0,"204":0,"206":0,"210":0,"212":0,"299":0,"313":0,"317":0,"319":0,"320":0,"322":0,"333":0,"335":0,"336":0,"338":0,"340":0,"343":0,"355":0,"356":0,"358":0,"359":0,"373":0,"375":0,"377":0,"379":0,"393":0,"398":0,"400":0,"401":0,"402":0,"404":0,"405":0,"407":0,"411":0,"413":0,"417":0,"419":0,"430":0,"432":0,"433":0,"447":0,"448":0,"449":0,"451":0,"453":0,"465":0,"466":0,"467":0,"480":0,"487":0,"499":0,"503":0,"505":0,"507":0,"509":0,"511":0,"523":0,"524":0,"536":0,"537":0,"539":0,"541":0,"553":0,"554":0,"566":0,"578":0,"594":0,"609":0,"613":0,"615":0,"616":0,"618":0,"622":0,"624":0,"625":0,"629":0,"631":0,"633":0,"637":0,"638":0,"660":0,"674":0,"688":0,"690":0,"692":0,"720":0,"722":0,"724":0,"777":0,"779":0,"781":0,"794":0,"797":0,"799":0,"801":0,"804":0};
_yuitest_coverage["build/axis-base/axis-base.js"].functions = {"Renderer:40":0,"getter:51":0,"setter:57":0,"_setStyles:91":0,"(anonymous 2):114":0,"_mergeStyles:107":0,"_getDefaultStyles:135":0,"initializer:180":0,"_dataProviderChangeHandler:195":0,"addKey:297":0,"_getKeyArray:311":0,"_updateTotalData:331":0,"removeKey:353":0,"getKeyValueAt:371":0,"getDataByKey:391":0,"getTotalMajorUnits:428":0,"getEdgeOffset:445":0,"_keyChangeHandler:463":0,"_getDefaultStyles:478":0,"_maximumGetter:497":0,"_maximumSetter:521":0,"_minimumGetter:534":0,"_minimumSetter:551":0,"_getSetMax:564":0,"_getSetMin:576":0,"valueFn:593":0,"setter:607":0,"getter:658":0,"setter:672":0,"getter:686":0,"getter:718":0,"getter:775":0,"getter:792":0,"(anonymous 1):1":0};
_yuitest_coverage["build/axis-base/axis-base.js"].coveredLines = 125;
_yuitest_coverage["build/axis-base/axis-base.js"].coveredFunctions = 34;
_yuitest_coverline("build/axis-base/axis-base.js", 1);
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

_yuitest_coverfunc("build/axis-base/axis-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/axis-base/axis-base.js", 18);
var CONFIG = Y.config,
    WINDOW = CONFIG.win,
    DOCUMENT = CONFIG.doc,
    Y_Lang = Y.Lang,
    IS_STRING = Y_Lang.isString,
    Y_DOM = Y.DOM,
    LeftAxisLayout,
    RightAxisLayout,
    BottomAxisLayout,
    TopAxisLayout,
    _getClassName = Y.ClassNameManager.getClassName,
    SERIES_MARKER = _getClassName("seriesmarker");


/**
 * The Renderer class is a base class for chart components that use the `styles`
 * attribute.
 *
 * @module charts
 * @class Renderer
 * @constructor
 */
_yuitest_coverline("build/axis-base/axis-base.js", 40);
function Renderer(){}

_yuitest_coverline("build/axis-base/axis-base.js", 42);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "getter", 51);
_yuitest_coverline("build/axis-base/axis-base.js", 53);
this._styles = this._styles || this._getDefaultStyles();
                _yuitest_coverline("build/axis-base/axis-base.js", 54);
return this._styles;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/axis-base/axis-base.js", "setter", 57);
_yuitest_coverline("build/axis-base/axis-base.js", 59);
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
_yuitest_coverline("build/axis-base/axis-base.js", 71);
Renderer.NAME = "renderer";

_yuitest_coverline("build/axis-base/axis-base.js", 73);
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
		_yuitest_coverfunc("build/axis-base/axis-base.js", "_setStyles", 91);
_yuitest_coverline("build/axis-base/axis-base.js", 93);
var styles = this.get("styles");
        _yuitest_coverline("build/axis-base/axis-base.js", 94);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_mergeStyles", 107);
_yuitest_coverline("build/axis-base/axis-base.js", 109);
if(!b)
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 111);
b = {};
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 113);
var newstyles = Y.merge(b, {});
        _yuitest_coverline("build/axis-base/axis-base.js", 114);
Y.Object.each(a, function(value, key, a)
        {
            _yuitest_coverfunc("build/axis-base/axis-base.js", "(anonymous 2)", 114);
_yuitest_coverline("build/axis-base/axis-base.js", 116);
if(b.hasOwnProperty(key) && Y_Lang.isObject(value) && !Y_Lang.isFunction(value) && !Y_Lang.isArray(value))
            {
                _yuitest_coverline("build/axis-base/axis-base.js", 118);
newstyles[key] = this._mergeStyles(value, b[key]);
            }
            else
            {
                _yuitest_coverline("build/axis-base/axis-base.js", 122);
newstyles[key] = value;
            }
        }, this);
        _yuitest_coverline("build/axis-base/axis-base.js", 125);
return newstyles;
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_getDefaultStyles", 135);
_yuitest_coverline("build/axis-base/axis-base.js", 137);
return {padding:{
            top:0,
            right: 0,
            bottom: 0,
            left: 0
        }};
    }
};

_yuitest_coverline("build/axis-base/axis-base.js", 146);
Y.augment(Renderer, Y.Attribute);
_yuitest_coverline("build/axis-base/axis-base.js", 147);
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
_yuitest_coverline("build/axis-base/axis-base.js", 175);
Y.AxisBase = Y.Base.create("axisBase", Y.Base, [Y.Renderer], {
    /**
     * @method initializer
     * @private
     */
    initializer: function()
    {
        _yuitest_coverfunc("build/axis-base/axis-base.js", "initializer", 180);
_yuitest_coverline("build/axis-base/axis-base.js", 182);
this.after("minimumChange", Y.bind(this._keyChangeHandler, this));
        _yuitest_coverline("build/axis-base/axis-base.js", 183);
this.after("maximumChange", Y.bind(this._keyChangeHandler, this));
        _yuitest_coverline("build/axis-base/axis-base.js", 184);
this.after("keysChange", this._keyChangeHandler);
        _yuitest_coverline("build/axis-base/axis-base.js", 185);
this.after("dataProviderChange", this._dataProviderChangeHandler);
    },

    /**
     * Handles changes to `dataProvider`.
     *
     * @method _dataProviderChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _dataProviderChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_dataProviderChangeHandler", 195);
_yuitest_coverline("build/axis-base/axis-base.js", 197);
var keyCollection = this.get("keyCollection").concat(),
            keys = this.get("keys"),
            i;
        _yuitest_coverline("build/axis-base/axis-base.js", 200);
if(keys)
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 202);
for(i in keys)
            {
                _yuitest_coverline("build/axis-base/axis-base.js", 204);
if(keys.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 206);
delete keys[i];
                }
            }
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 210);
if(keyCollection && keyCollection.length)
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 212);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "addKey", 297);
_yuitest_coverline("build/axis-base/axis-base.js", 299);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_getKeyArray", 311);
_yuitest_coverline("build/axis-base/axis-base.js", 313);
var i = 0,
            obj,
            keyArray = [],
            len = data.length;
        _yuitest_coverline("build/axis-base/axis-base.js", 317);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 319);
obj = data[i];
            _yuitest_coverline("build/axis-base/axis-base.js", 320);
keyArray[i] = obj[key];
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 322);
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
		_yuitest_coverfunc("build/axis-base/axis-base.js", "_updateTotalData", 331);
_yuitest_coverline("build/axis-base/axis-base.js", 333);
var keys = this.get("keys"),
            i;
        _yuitest_coverline("build/axis-base/axis-base.js", 335);
this._data = [];
        _yuitest_coverline("build/axis-base/axis-base.js", 336);
for(i in keys)
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 338);
if(keys.hasOwnProperty(i))
            {
                _yuitest_coverline("build/axis-base/axis-base.js", 340);
this._data = this._data.concat(keys[i]);
            }
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 343);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "removeKey", 353);
_yuitest_coverline("build/axis-base/axis-base.js", 355);
var keys = this.get("keys");
        _yuitest_coverline("build/axis-base/axis-base.js", 356);
if(keys.hasOwnProperty(value))
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 358);
delete keys[value];
            _yuitest_coverline("build/axis-base/axis-base.js", 359);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "getKeyValueAt", 371);
_yuitest_coverline("build/axis-base/axis-base.js", 373);
var value = NaN,
            keys = this.get("keys");
        _yuitest_coverline("build/axis-base/axis-base.js", 375);
if(keys[key] && Y_Lang.isNumber(parseFloat(keys[key][index])))
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 377);
value = keys[key][index];
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 379);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "getDataByKey", 391);
_yuitest_coverline("build/axis-base/axis-base.js", 393);
var obj,
            i,
            len,
            key,
            keys = this.get("keys");
        _yuitest_coverline("build/axis-base/axis-base.js", 398);
if(Y_Lang.isArray(value)) 
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 400);
obj = {};
            _yuitest_coverline("build/axis-base/axis-base.js", 401);
len = value.length;
            _yuitest_coverline("build/axis-base/axis-base.js", 402);
for(i = 0; i < len; i = i + 1) 
            {
                _yuitest_coverline("build/axis-base/axis-base.js", 404);
key = value[i];
                _yuitest_coverline("build/axis-base/axis-base.js", 405);
if(keys[key]) 
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 407);
obj[key] = this.getDataByKey(key);
                }
            }
        }
        else {_yuitest_coverline("build/axis-base/axis-base.js", 411);
if(keys[value])
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 413);
obj = keys[value];
        }
        else
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 417);
obj = null;
        }}
        _yuitest_coverline("build/axis-base/axis-base.js", 419);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "getTotalMajorUnits", 428);
_yuitest_coverline("build/axis-base/axis-base.js", 430);
var units,
            majorUnit = this.get("styles").majorUnit;
        _yuitest_coverline("build/axis-base/axis-base.js", 432);
units = majorUnit.count;
        _yuitest_coverline("build/axis-base/axis-base.js", 433);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "getEdgeOffset", 445);
_yuitest_coverline("build/axis-base/axis-base.js", 447);
var edgeOffset;
        _yuitest_coverline("build/axis-base/axis-base.js", 448);
if(this.get("calculateEdgeOffset")) {
            _yuitest_coverline("build/axis-base/axis-base.js", 449);
edgeOffset = l/ct;
        } else {
            _yuitest_coverline("build/axis-base/axis-base.js", 451);
edgeOffset = 0;
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 453);
return edgeOffset;
    },

    /**
     * Updates the `Axis` after a change in keys.
     *
     * @method _keyChangeHandler
     * @param {Object} e Event object.
     * @private
     */
    _keyChangeHandler: function(e)
    {
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_keyChangeHandler", 463);
_yuitest_coverline("build/axis-base/axis-base.js", 465);
this._updateMinAndMax();
        _yuitest_coverline("build/axis-base/axis-base.js", 466);
this._updateTotalDataFlag = true;
        _yuitest_coverline("build/axis-base/axis-base.js", 467);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_getDefaultStyles", 478);
_yuitest_coverline("build/axis-base/axis-base.js", 480);
var axisstyles = {
            majorUnit: {
                determinant:"count",
                count:11,
                distance:75
            }
        };
        _yuitest_coverline("build/axis-base/axis-base.js", 487);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_maximumGetter", 497);
_yuitest_coverline("build/axis-base/axis-base.js", 499);
var max = this.get("dataMaximum"),
            min = this.get("minimum");
        //If all values are zero, force a range so that the Axis and related series
        //will still render.
        _yuitest_coverline("build/axis-base/axis-base.js", 503);
if(min === 0 && max === 0)
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 505);
max = 10;
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 507);
if(Y_Lang.isNumber(this._setMaximum))
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 509);
max = this._setMaximum;
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 511);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_maximumSetter", 521);
_yuitest_coverline("build/axis-base/axis-base.js", 523);
this._setMaximum = parseFloat(value);
        _yuitest_coverline("build/axis-base/axis-base.js", 524);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_minimumGetter", 534);
_yuitest_coverline("build/axis-base/axis-base.js", 536);
var min = this.get("dataMinimum");
        _yuitest_coverline("build/axis-base/axis-base.js", 537);
if(Y_Lang.isNumber(this._setMinimum))
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 539);
min = this._setMinimum;
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 541);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_minimumSetter", 551);
_yuitest_coverline("build/axis-base/axis-base.js", 553);
this._setMinimum = parseFloat(val);
        _yuitest_coverline("build/axis-base/axis-base.js", 554);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_getSetMax", 564);
_yuitest_coverline("build/axis-base/axis-base.js", 566);
return Y_Lang.isNumber(this._setMaximum);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_getSetMin", 576);
_yuitest_coverline("build/axis-base/axis-base.js", 578);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "valueFn", 593);
_yuitest_coverline("build/axis-base/axis-base.js", 594);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "setter", 607);
_yuitest_coverline("build/axis-base/axis-base.js", 609);
var keys = {},
                    i,
                    len,
                    data = this.get("dataProvider");
                _yuitest_coverline("build/axis-base/axis-base.js", 613);
if(Y_Lang.isArray(val))
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 615);
len = val.length;
                    _yuitest_coverline("build/axis-base/axis-base.js", 616);
for(i = 0; i < len; ++i)
                    {
                        _yuitest_coverline("build/axis-base/axis-base.js", 618);
keys[val[i]] = this._getKeyArray(val[i], data);
                    }

                }
                else {_yuitest_coverline("build/axis-base/axis-base.js", 622);
if(Y_Lang.isString(val))
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 624);
keys = this.get("keys");
                    _yuitest_coverline("build/axis-base/axis-base.js", 625);
keys[val] = this._getKeyArray(val, data);
                }
                else
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 629);
for(i in val)
                    {
                        _yuitest_coverline("build/axis-base/axis-base.js", 631);
if(val.hasOwnProperty(i))
                        {
                            _yuitest_coverline("build/axis-base/axis-base.js", 633);
keys[i] = this._getKeyArray(i, data);
                        }
                    }
                }}
                _yuitest_coverline("build/axis-base/axis-base.js", 637);
this._updateTotalDataFlag = true;
                _yuitest_coverline("build/axis-base/axis-base.js", 638);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "getter", 658);
_yuitest_coverline("build/axis-base/axis-base.js", 660);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "setter", 672);
_yuitest_coverline("build/axis-base/axis-base.js", 674);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "getter", 686);
_yuitest_coverline("build/axis-base/axis-base.js", 688);
if(!Y_Lang.isNumber(this._dataMaximum))
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 690);
this._updateMinAndMax();
                }
                _yuitest_coverline("build/axis-base/axis-base.js", 692);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "getter", 718);
_yuitest_coverline("build/axis-base/axis-base.js", 720);
if(!Y_Lang.isNumber(this._dataMinimum))
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 722);
this._updateMinAndMax();
                }
                _yuitest_coverline("build/axis-base/axis-base.js", 724);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "getter", 775);
_yuitest_coverline("build/axis-base/axis-base.js", 777);
if(!this._data || this._updateTotalDataFlag)
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 779);
this._updateTotalData();
                }
                _yuitest_coverline("build/axis-base/axis-base.js", 781);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "getter", 792);
_yuitest_coverline("build/axis-base/axis-base.js", 794);
var keys = this.get("keys"),
                    i,
                    col = [];
                _yuitest_coverline("build/axis-base/axis-base.js", 797);
for(i in keys)
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 799);
if(keys.hasOwnProperty(i))
                    {
                        _yuitest_coverline("build/axis-base/axis-base.js", 801);
col.push(i);
                    }
                }
                _yuitest_coverline("build/axis-base/axis-base.js", 804);
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


}, '@VERSION@', {"requires": ["classnamemanager", "datatype-number", "datatype-date", "base", "event-custom"]});
