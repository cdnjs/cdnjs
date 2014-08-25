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
_yuitest_coverage["build/axis-base/axis-base.js"].code=["YUI.add('axis-base', function (Y, NAME) {","","/**"," * The Charts widget provides an api for displaying data"," * graphically."," *"," * @module charts"," * @main charts"," */","","/**"," * Provides functionality for the handling of axis data in a chart."," *"," * @module charts"," * @submodule axis-base"," */","var Y_Lang = Y.Lang;","","/**"," * The Renderer class is a base class for chart components that use the `styles`"," * attribute."," *"," * @module charts"," * @class Renderer"," * @constructor"," */","function Renderer(){}","","Renderer.ATTRS = {","        /**","         * Style properties for class","         *","         * @attribute styles","         * @type Object","         */","        styles:","        {","            getter: function()","            {","                this._styles = this._styles || this._getDefaultStyles();","                return this._styles;","            },","","            setter: function(val)","            {","                this._styles = this._setStyles(val);","            }","        },","","        /**","         * The graphic in which drawings will be rendered.","         *","         * @attribute graphic","         * @type Graphic","         */","        graphic: {}","};","Renderer.NAME = \"renderer\";","","Renderer.prototype = {","    /**","     * Storage for `styles` attribute.","     *","     * @property _styles","     * @type Object","     * @private","     */","	_styles: null,","","    /**","     * Method used by `styles` setter.","     *","     * @method _setStyles","     * @param {Object} newStyles Hash of properties to update.","     * @return Object","     * @protected","     */","	_setStyles: function(newstyles)","	{","		var styles = this.get(\"styles\");","        return this._mergeStyles(newstyles, styles);","	},","","    /**","     * Merges to object literals so that only specified properties are","     * overwritten.","     *","     * @method _mergeStyles","     * @param {Object} a Hash of new styles","     * @param {Object} b Hash of original styles","     * @return Object","     * @protected","     */","    _mergeStyles: function(a, b)","    {","        if(!b)","        {","            b = {};","        }","        var newstyles = Y.merge(b, {});","        Y.Object.each(a, function(value, key)","        {","            if(b.hasOwnProperty(key) && Y_Lang.isObject(value) && !Y_Lang.isFunction(value) && !Y_Lang.isArray(value))","            {","                newstyles[key] = this._mergeStyles(value, b[key]);","            }","            else","            {","                newstyles[key] = value;","            }","        }, this);","        return newstyles;","    },","","    /**","     * Gets the default value for the `styles` attribute.","     *","     * @method _getDefaultStyles","     * @return Object","     * @protected","     */","    _getDefaultStyles: function()","    {","        return {padding:{","            top:0,","            right: 0,","            bottom: 0,","            left: 0","        }};","    }","};","","Y.augment(Renderer, Y.Attribute);","Y.Renderer = Renderer;","","/**"," * The axis-base submodule contains functionality for the handling of axis data in a chart."," *"," * @module charts"," * @submodule axis-base"," */","/**"," * An abstract class that provides the core functionality used by the following classes:"," * <ul>"," *      <li>{{#crossLink \"CategoryAxisBase\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"NumericAxisBase\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"StackedAxisBase\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"TimeAxisBase\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"CategoryAxis\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"NumericAxis\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"StackedAxis\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"TimeAxis\"}}{{/crossLink}}</li>"," *  </ul>"," *"," * @class AxisBase"," * @constructor"," * @extends Base"," * @uses Renderer"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis-base"," */","Y.AxisBase = Y.Base.create(\"axisBase\", Y.Base, [Y.Renderer], {","    /**","     * @method initializer","     * @private","     */","    initializer: function()","    {","        this.after(\"minimumChange\", Y.bind(this._keyChangeHandler, this));","        this.after(\"maximumChange\", Y.bind(this._keyChangeHandler, this));","        this.after(\"keysChange\", this._keyChangeHandler);","        this.after(\"dataProviderChange\", this._dataProviderChangeHandler);","    },","","    /**","     * Handles changes to `dataProvider`.","     *","     * @method _dataProviderChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _dataProviderChangeHandler: function()","    {","        var keyCollection = this.get(\"keyCollection\").concat(),","            keys = this.get(\"keys\"),","            i;","        if(keys)","        {","            for(i in keys)","            {","                if(keys.hasOwnProperty(i))","                {","                    delete keys[i];","                }","            }","        }","        if(keyCollection && keyCollection.length)","        {","            this.set(\"keys\", keyCollection);","        }","    },","","    /**","     * Calculates the maximum and minimum values for the `Data`.","     *","     * @method _updateMinAndMax","     * @private","     */","    _updateMinAndMax: function() {","    },","","    /**","     * Constant used to generate unique id.","     *","     * @property GUID","     * @type String","     * @private","     */","    GUID: \"yuibaseaxis\",","","    /**","     * Type of data used in `Axis`.","     *","     * @property _type","     * @type String","     * @readOnly","     * @private","     */","    _type: null,","","    /**","     * Storage for `setMaximum` attribute.","     *","     * @property _setMaximum","     * @type Object","     * @private","     */","    _setMaximum: null,","","    /**","     * Storage for `setMinimum` attribute.","     *","     * @property _setMinimum","     * @type Object","     * @private","     */","    _setMinimum: null,","","    /**","     * Reference to data array.","     *","     * @property _data","     * @type Array","     * @private","     */","    _data: null,","","    /**","     * Indicates whether the all data is up to date.","     *","     * @property _updateTotalDataFlag","     * @type Boolean","     * @private","     */","    _updateTotalDataFlag: true,","","    /**","     * Storage for `dataReady` attribute.","     *","     * @property _dataReady","     * @type Boolean","     * @readOnly","     * @private","     */","    _dataReady: false,","","    /**","     * Adds an array to the key hash.","     *","     * @method addKey","     * @param value Indicates what key to use in retrieving","     * the array.","     */","    addKey: function (value)","	{","        this.set(\"keys\", value);","	},","","    /**","     * Gets an array of values based on a key.","     *","     * @method _getKeyArray","     * @param {String} key Value key associated with the data array.","     * @param {Array} data Array in which the data resides.","     * @return Array","     * @private","     */","    _getKeyArray: function(key, data)","    {","        var i = 0,","            obj,","            keyArray = [],","            len = data.length;","        for(; i < len; ++i)","        {","            obj = data[i];","            keyArray[i] = obj[key];","        }","        return keyArray;","    },","","    /**","     * Updates the total data array.","     *","     * @method _updateTotalData","     * @private","     */","    _updateTotalData: function()","    {","		var keys = this.get(\"keys\"),","            i;","        this._data = [];","        for(i in keys)","        {","            if(keys.hasOwnProperty(i))","            {","                this._data = this._data.concat(keys[i]);","            }","        }","        this._updateTotalDataFlag = false;","    },","","    /**","     * Removes an array from the key hash.","     *","     * @method removeKey","     * @param {String} value Indicates what key to use in removing from","     * the hash.","     */","    removeKey: function(value)","    {","        var keys = this.get(\"keys\");","        if(keys.hasOwnProperty(value))","        {","            delete keys[value];","            this._keyChangeHandler();","        }","    },","","    /**","     * Returns a value based of a key value and an index.","     *","     * @method getKeyValueAt","     * @param {String} key value used to look up the correct array","     * @param {Number} index within the array","     * @return Number","     */","    getKeyValueAt: function(key, index)","    {","        var value = NaN,","            keys = this.get(\"keys\");","        if(keys[key] && Y_Lang.isNumber(parseFloat(keys[key][index])))","        {","            value = keys[key][index];","        }","        return parseFloat(value);","    },","","    /**","     * Returns values based on key identifiers. When a string is passed as an argument, an array of values is returned.","     * When an array of keys is passed as an argument, an object literal with an array of values mapped to each key is","     * returned.","     *","     * @method getDataByKey","     * @param {String|Array} value value used to identify the array","     * @return Array|Object","     */","    getDataByKey: function (value)","    {","        var obj,","            i,","            len,","            key,","            keys = this.get(\"keys\");","        if(Y_Lang.isArray(value))","        {","            obj = {};","            len = value.length;","            for(i = 0; i < len; i = i + 1)","            {","                key = value[i];","                if(keys[key])","                {","                    obj[key] = this.getDataByKey(key);","                }","            }","        }","        else if(keys[value])","        {","            obj = keys[value];","        }","        else","        {","            obj = null;","        }","        return obj;","    },","","    /**","     * Returns the total number of majorUnits that will appear on an axis.","     *","     * @method getTotalMajorUnits","     * @return Number","     */","    getTotalMajorUnits: function()","    {","        var units,","            majorUnit = this.get(\"styles\").majorUnit;","        units = majorUnit.count;","        return units;","    },","","    /**","     * Gets the distance that the first and last ticks are offset from there respective","     * edges.","     *","     * @method getEdgeOffset","     * @param {Number} ct Number of ticks on the axis.","     * @param {Number} l Length (in pixels) of the axis.","     * @return Number","     */","    getEdgeOffset: function(ct, l)","    {","        var edgeOffset;","        if(this.get(\"calculateEdgeOffset\")) {","            edgeOffset = l/ct;","        } else {","            edgeOffset = 0;","        }","        return edgeOffset;","    },","","    /**","     * Updates the `Axis` after a change in keys.","     *","     * @method _keyChangeHandler","     * @param {Object} e Event object.","     * @private","     */","    _keyChangeHandler: function()","    {","        this._updateMinAndMax();","        this._updateTotalDataFlag = true;","        this.fire(\"dataUpdate\");","    },","","    /**","     * Gets the default value for the `styles` attribute. Overrides","     * base implementation.","     *","     * @method _getDefaultStyles","     * @return Object","     * @protected","     */","    _getDefaultStyles: function()","    {","        var axisstyles = {","            majorUnit: {","                determinant:\"count\",","                count:11,","                distance:75","            }","        };","        return axisstyles;","    },","","    /**","     * Getter method for maximum attribute.","     *","     * @method _maximumGetter","     * @return Number","     * @private","     */","    _maximumGetter: function ()","    {","        var max = this.get(\"dataMaximum\"),","            min = this.get(\"minimum\");","        //If all values are zero, force a range so that the Axis and related series","        //will still render.","        if(min === 0 && max === 0)","        {","            max = 10;","        }","        if(Y_Lang.isNumber(this._setMaximum))","        {","            max = this._setMaximum;","        }","        return parseFloat(max);","    },","","    /**","     * Setter method for maximum attribute.","     *","     * @method _maximumSetter","     * @param {Object} value","     * @private","     */","    _maximumSetter: function (value)","    {","        this._setMaximum = parseFloat(value);","        return value;","    },","","    /**","     * Getter method for minimum attribute.","     *","     * @method _minimumGetter","     * @return Number","     * @private","     */","    _minimumGetter: function ()","    {","        var min = this.get(\"dataMinimum\");","        if(Y_Lang.isNumber(this._setMinimum))","        {","            min = this._setMinimum;","        }","        return parseFloat(min);","    },","","    /**","     * Setter method for minimum attribute.","     *","     * @method _minimumSetter","     * @param {Object} value","     * @private","     */","    _minimumSetter: function(val)","    {","        this._setMinimum = parseFloat(val);","        return val;","    },","","    /**","     * Indicates whether or not the maximum attribute has been explicitly set.","     *","     * @method _getSetMax","     * @return Boolean","     * @private","     */","    _getSetMax: function()","    {","        return Y_Lang.isNumber(this._setMaximum);","    },","","    /**","     * Indicates whether or not the minimum attribute has been explicitly set.","     *","     * @method _getSetMin","     * @return Boolean","     * @private","     */","    _getSetMin: function()","    {","        return Y_Lang.isNumber(this._setMinimum);","    }","}, {","    ATTRS: {","        /**","         * Determines whether and offset is automatically calculated for the edges of the axis.","         *","         * @attribute calculateEdgeOffset","         * @type Boolean","         */","        calculateEdgeOffset: {","            value: false","        },","","        labelFunction: {","            valueFn: function() {","                return this.formatLabel;","            }","        },","","        /**","         * Hash of array identifed by a string value.","         *","         * @attribute keys","         * @type Object","         */","        keys: {","            value: {},","","            setter: function(val)","            {","                var keys = {},","                    i,","                    len,","                    data = this.get(\"dataProvider\");","                if(Y_Lang.isArray(val))","                {","                    len = val.length;","                    for(i = 0; i < len; ++i)","                    {","                        keys[val[i]] = this._getKeyArray(val[i], data);","                    }","","                }","                else if(Y_Lang.isString(val))","                {","                    keys = this.get(\"keys\");","                    keys[val] = this._getKeyArray(val, data);","                }","                else","                {","                    for(i in val)","                    {","                        if(val.hasOwnProperty(i))","                        {","                            keys[i] = this._getKeyArray(i, data);","                        }","                    }","                }","                this._updateTotalDataFlag = true;","                return keys;","            }","        },","","        /**","         *Returns the type of axis data","         *  <dl>","         *      <dt>time</dt><dd>Manages time data</dd>","         *      <dt>stacked</dt><dd>Manages stacked numeric data</dd>","         *      <dt>numeric</dt><dd>Manages numeric data</dd>","         *      <dt>category</dt><dd>Manages categorical data</dd>","         *  </dl>","         *","         * @attribute type","         * @type String","         */","        type:","        {","            readOnly: true,","","            getter: function ()","            {","                return this._type;","            }","        },","","        /**","         * Instance of `ChartDataProvider` that the class uses","         * to build its own data.","         *","         * @attribute dataProvider","         * @type Array","         */","        dataProvider:{","            setter: function (value)","            {","                return value;","            }","        },","","        /**","         * The maximum value contained in the `data` array. Used for","         * `maximum` when `autoMax` is true.","         *","         * @attribute dataMaximum","         * @type Number","         */","        dataMaximum: {","            getter: function ()","            {","                if(!Y_Lang.isNumber(this._dataMaximum))","                {","                    this._updateMinAndMax();","                }","                return this._dataMaximum;","            }","        },","","        /**","         * The maximum value that will appear on an axis.","         *","         * @attribute maximum","         * @type Number","         */","        maximum: {","            lazyAdd: false,","","            getter: \"_maximumGetter\",","","            setter: \"_maximumSetter\"","        },","","        /**","         * The minimum value contained in the `data` array. Used for","         * `minimum` when `autoMin` is true.","         *","         * @attribute dataMinimum","         * @type Number","         */","        dataMinimum: {","            getter: function ()","            {","                if(!Y_Lang.isNumber(this._dataMinimum))","                {","                    this._updateMinAndMax();","                }","                return this._dataMinimum;","            }","        },","","        /**","         * The minimum value that will appear on an axis.","         *","         * @attribute minimum","         * @type Number","         */","        minimum: {","            lazyAdd: false,","","            getter: \"_minimumGetter\",","","            setter: \"_minimumSetter\"","        },","","        /**","         * Determines whether the maximum is calculated or explicitly","         * set by the user.","         *","         * @attribute setMax","         * @type Boolean","         */","        setMax: {","            readOnly: true,","","            getter: \"_getSetMax\"","        },","","        /**","         * Determines whether the minimum is calculated or explicitly","         * set by the user.","         *","         * @attribute setMin","         * @type Boolean","         */","        setMin: {","            readOnly: true,","","            getter: \"_getSetMin\"","        },","","        /**","         * Array of axis data","         *","         * @attribute data","         * @type Array","         */","        data: {","            getter: function ()","            {","                if(!this._data || this._updateTotalDataFlag)","                {","                    this._updateTotalData();","                }","                return this._data;","            }","        },","","        /**","         * Array containing all the keys in the axis.","","         * @attribute keyCollection","         * @type Array","         */","        keyCollection: {","            getter: function()","            {","                var keys = this.get(\"keys\"),","                    i,","                    col = [];","                for(i in keys)","                {","                    if(keys.hasOwnProperty(i))","                    {","                        col.push(i);","                    }","                }","                return col;","            },","            readOnly: true","        },","","        /**","         * Object which should have by the labelFunction","         *","         * @attribute labelFunctionScope","         * @type Object","         */","        labelFunctionScope: {}","    }","});","","","}, '@VERSION@', {\"requires\": [\"classnamemanager\", \"datatype-number\", \"datatype-date\", \"base\", \"event-custom\"]});"];
_yuitest_coverage["build/axis-base/axis-base.js"].lines = {"1":0,"17":0,"27":0,"29":0,"40":0,"41":0,"46":0,"58":0,"60":0,"80":0,"81":0,"96":0,"98":0,"100":0,"101":0,"103":0,"105":0,"109":0,"112":0,"124":0,"133":0,"134":0,"162":0,"169":0,"170":0,"171":0,"172":0,"184":0,"187":0,"189":0,"191":0,"193":0,"197":0,"199":0,"286":0,"300":0,"304":0,"306":0,"307":0,"309":0,"320":0,"322":0,"323":0,"325":0,"327":0,"330":0,"342":0,"343":0,"345":0,"346":0,"360":0,"362":0,"364":0,"366":0,"380":0,"385":0,"387":0,"388":0,"389":0,"391":0,"392":0,"394":0,"398":0,"400":0,"404":0,"406":0,"417":0,"419":0,"420":0,"434":0,"435":0,"436":0,"438":0,"440":0,"452":0,"453":0,"454":0,"467":0,"474":0,"486":0,"490":0,"492":0,"494":0,"496":0,"498":0,"510":0,"511":0,"523":0,"524":0,"526":0,"528":0,"540":0,"541":0,"553":0,"565":0,"581":0,"596":0,"600":0,"602":0,"603":0,"605":0,"609":0,"611":0,"612":0,"616":0,"618":0,"620":0,"624":0,"625":0,"647":0,"661":0,"675":0,"677":0,"679":0,"707":0,"709":0,"711":0,"764":0,"766":0,"768":0,"781":0,"784":0,"786":0,"788":0,"791":0};
_yuitest_coverage["build/axis-base/axis-base.js"].functions = {"Renderer:27":0,"getter:38":0,"setter:44":0,"_setStyles:78":0,"(anonymous 2):101":0,"_mergeStyles:94":0,"_getDefaultStyles:122":0,"initializer:167":0,"_dataProviderChangeHandler:182":0,"addKey:284":0,"_getKeyArray:298":0,"_updateTotalData:318":0,"removeKey:340":0,"getKeyValueAt:358":0,"getDataByKey:378":0,"getTotalMajorUnits:415":0,"getEdgeOffset:432":0,"_keyChangeHandler:450":0,"_getDefaultStyles:465":0,"_maximumGetter:484":0,"_maximumSetter:508":0,"_minimumGetter:521":0,"_minimumSetter:538":0,"_getSetMax:551":0,"_getSetMin:563":0,"valueFn:580":0,"setter:594":0,"getter:645":0,"setter:659":0,"getter:673":0,"getter:705":0,"getter:762":0,"getter:779":0,"(anonymous 1):1":0};
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
_yuitest_coverline("build/axis-base/axis-base.js", 17);
var Y_Lang = Y.Lang;

/**
 * The Renderer class is a base class for chart components that use the `styles`
 * attribute.
 *
 * @module charts
 * @class Renderer
 * @constructor
 */
_yuitest_coverline("build/axis-base/axis-base.js", 27);
function Renderer(){}

_yuitest_coverline("build/axis-base/axis-base.js", 29);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "getter", 38);
_yuitest_coverline("build/axis-base/axis-base.js", 40);
this._styles = this._styles || this._getDefaultStyles();
                _yuitest_coverline("build/axis-base/axis-base.js", 41);
return this._styles;
            },

            setter: function(val)
            {
                _yuitest_coverfunc("build/axis-base/axis-base.js", "setter", 44);
_yuitest_coverline("build/axis-base/axis-base.js", 46);
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
_yuitest_coverline("build/axis-base/axis-base.js", 58);
Renderer.NAME = "renderer";

_yuitest_coverline("build/axis-base/axis-base.js", 60);
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
		_yuitest_coverfunc("build/axis-base/axis-base.js", "_setStyles", 78);
_yuitest_coverline("build/axis-base/axis-base.js", 80);
var styles = this.get("styles");
        _yuitest_coverline("build/axis-base/axis-base.js", 81);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_mergeStyles", 94);
_yuitest_coverline("build/axis-base/axis-base.js", 96);
if(!b)
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 98);
b = {};
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 100);
var newstyles = Y.merge(b, {});
        _yuitest_coverline("build/axis-base/axis-base.js", 101);
Y.Object.each(a, function(value, key)
        {
            _yuitest_coverfunc("build/axis-base/axis-base.js", "(anonymous 2)", 101);
_yuitest_coverline("build/axis-base/axis-base.js", 103);
if(b.hasOwnProperty(key) && Y_Lang.isObject(value) && !Y_Lang.isFunction(value) && !Y_Lang.isArray(value))
            {
                _yuitest_coverline("build/axis-base/axis-base.js", 105);
newstyles[key] = this._mergeStyles(value, b[key]);
            }
            else
            {
                _yuitest_coverline("build/axis-base/axis-base.js", 109);
newstyles[key] = value;
            }
        }, this);
        _yuitest_coverline("build/axis-base/axis-base.js", 112);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_getDefaultStyles", 122);
_yuitest_coverline("build/axis-base/axis-base.js", 124);
return {padding:{
            top:0,
            right: 0,
            bottom: 0,
            left: 0
        }};
    }
};

_yuitest_coverline("build/axis-base/axis-base.js", 133);
Y.augment(Renderer, Y.Attribute);
_yuitest_coverline("build/axis-base/axis-base.js", 134);
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
_yuitest_coverline("build/axis-base/axis-base.js", 162);
Y.AxisBase = Y.Base.create("axisBase", Y.Base, [Y.Renderer], {
    /**
     * @method initializer
     * @private
     */
    initializer: function()
    {
        _yuitest_coverfunc("build/axis-base/axis-base.js", "initializer", 167);
_yuitest_coverline("build/axis-base/axis-base.js", 169);
this.after("minimumChange", Y.bind(this._keyChangeHandler, this));
        _yuitest_coverline("build/axis-base/axis-base.js", 170);
this.after("maximumChange", Y.bind(this._keyChangeHandler, this));
        _yuitest_coverline("build/axis-base/axis-base.js", 171);
this.after("keysChange", this._keyChangeHandler);
        _yuitest_coverline("build/axis-base/axis-base.js", 172);
this.after("dataProviderChange", this._dataProviderChangeHandler);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_dataProviderChangeHandler", 182);
_yuitest_coverline("build/axis-base/axis-base.js", 184);
var keyCollection = this.get("keyCollection").concat(),
            keys = this.get("keys"),
            i;
        _yuitest_coverline("build/axis-base/axis-base.js", 187);
if(keys)
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 189);
for(i in keys)
            {
                _yuitest_coverline("build/axis-base/axis-base.js", 191);
if(keys.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 193);
delete keys[i];
                }
            }
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 197);
if(keyCollection && keyCollection.length)
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 199);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "addKey", 284);
_yuitest_coverline("build/axis-base/axis-base.js", 286);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_getKeyArray", 298);
_yuitest_coverline("build/axis-base/axis-base.js", 300);
var i = 0,
            obj,
            keyArray = [],
            len = data.length;
        _yuitest_coverline("build/axis-base/axis-base.js", 304);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 306);
obj = data[i];
            _yuitest_coverline("build/axis-base/axis-base.js", 307);
keyArray[i] = obj[key];
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 309);
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
		_yuitest_coverfunc("build/axis-base/axis-base.js", "_updateTotalData", 318);
_yuitest_coverline("build/axis-base/axis-base.js", 320);
var keys = this.get("keys"),
            i;
        _yuitest_coverline("build/axis-base/axis-base.js", 322);
this._data = [];
        _yuitest_coverline("build/axis-base/axis-base.js", 323);
for(i in keys)
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 325);
if(keys.hasOwnProperty(i))
            {
                _yuitest_coverline("build/axis-base/axis-base.js", 327);
this._data = this._data.concat(keys[i]);
            }
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 330);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "removeKey", 340);
_yuitest_coverline("build/axis-base/axis-base.js", 342);
var keys = this.get("keys");
        _yuitest_coverline("build/axis-base/axis-base.js", 343);
if(keys.hasOwnProperty(value))
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 345);
delete keys[value];
            _yuitest_coverline("build/axis-base/axis-base.js", 346);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "getKeyValueAt", 358);
_yuitest_coverline("build/axis-base/axis-base.js", 360);
var value = NaN,
            keys = this.get("keys");
        _yuitest_coverline("build/axis-base/axis-base.js", 362);
if(keys[key] && Y_Lang.isNumber(parseFloat(keys[key][index])))
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 364);
value = keys[key][index];
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 366);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "getDataByKey", 378);
_yuitest_coverline("build/axis-base/axis-base.js", 380);
var obj,
            i,
            len,
            key,
            keys = this.get("keys");
        _yuitest_coverline("build/axis-base/axis-base.js", 385);
if(Y_Lang.isArray(value))
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 387);
obj = {};
            _yuitest_coverline("build/axis-base/axis-base.js", 388);
len = value.length;
            _yuitest_coverline("build/axis-base/axis-base.js", 389);
for(i = 0; i < len; i = i + 1)
            {
                _yuitest_coverline("build/axis-base/axis-base.js", 391);
key = value[i];
                _yuitest_coverline("build/axis-base/axis-base.js", 392);
if(keys[key])
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 394);
obj[key] = this.getDataByKey(key);
                }
            }
        }
        else {_yuitest_coverline("build/axis-base/axis-base.js", 398);
if(keys[value])
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 400);
obj = keys[value];
        }
        else
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 404);
obj = null;
        }}
        _yuitest_coverline("build/axis-base/axis-base.js", 406);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "getTotalMajorUnits", 415);
_yuitest_coverline("build/axis-base/axis-base.js", 417);
var units,
            majorUnit = this.get("styles").majorUnit;
        _yuitest_coverline("build/axis-base/axis-base.js", 419);
units = majorUnit.count;
        _yuitest_coverline("build/axis-base/axis-base.js", 420);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "getEdgeOffset", 432);
_yuitest_coverline("build/axis-base/axis-base.js", 434);
var edgeOffset;
        _yuitest_coverline("build/axis-base/axis-base.js", 435);
if(this.get("calculateEdgeOffset")) {
            _yuitest_coverline("build/axis-base/axis-base.js", 436);
edgeOffset = l/ct;
        } else {
            _yuitest_coverline("build/axis-base/axis-base.js", 438);
edgeOffset = 0;
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 440);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_keyChangeHandler", 450);
_yuitest_coverline("build/axis-base/axis-base.js", 452);
this._updateMinAndMax();
        _yuitest_coverline("build/axis-base/axis-base.js", 453);
this._updateTotalDataFlag = true;
        _yuitest_coverline("build/axis-base/axis-base.js", 454);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_getDefaultStyles", 465);
_yuitest_coverline("build/axis-base/axis-base.js", 467);
var axisstyles = {
            majorUnit: {
                determinant:"count",
                count:11,
                distance:75
            }
        };
        _yuitest_coverline("build/axis-base/axis-base.js", 474);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_maximumGetter", 484);
_yuitest_coverline("build/axis-base/axis-base.js", 486);
var max = this.get("dataMaximum"),
            min = this.get("minimum");
        //If all values are zero, force a range so that the Axis and related series
        //will still render.
        _yuitest_coverline("build/axis-base/axis-base.js", 490);
if(min === 0 && max === 0)
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 492);
max = 10;
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 494);
if(Y_Lang.isNumber(this._setMaximum))
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 496);
max = this._setMaximum;
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 498);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_maximumSetter", 508);
_yuitest_coverline("build/axis-base/axis-base.js", 510);
this._setMaximum = parseFloat(value);
        _yuitest_coverline("build/axis-base/axis-base.js", 511);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_minimumGetter", 521);
_yuitest_coverline("build/axis-base/axis-base.js", 523);
var min = this.get("dataMinimum");
        _yuitest_coverline("build/axis-base/axis-base.js", 524);
if(Y_Lang.isNumber(this._setMinimum))
        {
            _yuitest_coverline("build/axis-base/axis-base.js", 526);
min = this._setMinimum;
        }
        _yuitest_coverline("build/axis-base/axis-base.js", 528);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_minimumSetter", 538);
_yuitest_coverline("build/axis-base/axis-base.js", 540);
this._setMinimum = parseFloat(val);
        _yuitest_coverline("build/axis-base/axis-base.js", 541);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_getSetMax", 551);
_yuitest_coverline("build/axis-base/axis-base.js", 553);
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
        _yuitest_coverfunc("build/axis-base/axis-base.js", "_getSetMin", 563);
_yuitest_coverline("build/axis-base/axis-base.js", 565);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "valueFn", 580);
_yuitest_coverline("build/axis-base/axis-base.js", 581);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "setter", 594);
_yuitest_coverline("build/axis-base/axis-base.js", 596);
var keys = {},
                    i,
                    len,
                    data = this.get("dataProvider");
                _yuitest_coverline("build/axis-base/axis-base.js", 600);
if(Y_Lang.isArray(val))
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 602);
len = val.length;
                    _yuitest_coverline("build/axis-base/axis-base.js", 603);
for(i = 0; i < len; ++i)
                    {
                        _yuitest_coverline("build/axis-base/axis-base.js", 605);
keys[val[i]] = this._getKeyArray(val[i], data);
                    }

                }
                else {_yuitest_coverline("build/axis-base/axis-base.js", 609);
if(Y_Lang.isString(val))
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 611);
keys = this.get("keys");
                    _yuitest_coverline("build/axis-base/axis-base.js", 612);
keys[val] = this._getKeyArray(val, data);
                }
                else
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 616);
for(i in val)
                    {
                        _yuitest_coverline("build/axis-base/axis-base.js", 618);
if(val.hasOwnProperty(i))
                        {
                            _yuitest_coverline("build/axis-base/axis-base.js", 620);
keys[i] = this._getKeyArray(i, data);
                        }
                    }
                }}
                _yuitest_coverline("build/axis-base/axis-base.js", 624);
this._updateTotalDataFlag = true;
                _yuitest_coverline("build/axis-base/axis-base.js", 625);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "getter", 645);
_yuitest_coverline("build/axis-base/axis-base.js", 647);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "setter", 659);
_yuitest_coverline("build/axis-base/axis-base.js", 661);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "getter", 673);
_yuitest_coverline("build/axis-base/axis-base.js", 675);
if(!Y_Lang.isNumber(this._dataMaximum))
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 677);
this._updateMinAndMax();
                }
                _yuitest_coverline("build/axis-base/axis-base.js", 679);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "getter", 705);
_yuitest_coverline("build/axis-base/axis-base.js", 707);
if(!Y_Lang.isNumber(this._dataMinimum))
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 709);
this._updateMinAndMax();
                }
                _yuitest_coverline("build/axis-base/axis-base.js", 711);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "getter", 762);
_yuitest_coverline("build/axis-base/axis-base.js", 764);
if(!this._data || this._updateTotalDataFlag)
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 766);
this._updateTotalData();
                }
                _yuitest_coverline("build/axis-base/axis-base.js", 768);
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
                _yuitest_coverfunc("build/axis-base/axis-base.js", "getter", 779);
_yuitest_coverline("build/axis-base/axis-base.js", 781);
var keys = this.get("keys"),
                    i,
                    col = [];
                _yuitest_coverline("build/axis-base/axis-base.js", 784);
for(i in keys)
                {
                    _yuitest_coverline("build/axis-base/axis-base.js", 786);
if(keys.hasOwnProperty(i))
                    {
                        _yuitest_coverline("build/axis-base/axis-base.js", 788);
col.push(i);
                    }
                }
                _yuitest_coverline("build/axis-base/axis-base.js", 791);
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
