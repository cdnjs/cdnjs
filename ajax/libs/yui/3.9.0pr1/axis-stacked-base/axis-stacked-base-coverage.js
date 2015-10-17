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
_yuitest_coverage["build/axis-stacked-base/axis-stacked-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/axis-stacked-base/axis-stacked-base.js",
    code: []
};
_yuitest_coverage["build/axis-stacked-base/axis-stacked-base.js"].code=["YUI.add('axis-stacked-base', function (Y, NAME) {","","/**"," * Provides core functionality for the handling of stacked numeric axis data for a chart."," *"," * @module charts"," * @submodule axis-stacked-base"," */","","/**"," * StackedImpl manages stacked numeric axis data."," *"," * @submodule axis-stacked"," * @class StackedImpl"," * @constructor"," */","function StackedImpl()","{","}","","StackedImpl.NAME = \"stackedImpl\";","","StackedImpl.prototype = {","    /**","     * Type of data used in `Data`.","     *","     * @property _type","     * @readOnly","     * @private","     */","    _type: \"stacked\",","","    /**","     * Calculates the maximum and minimum values for the `Data`.","     *","     * @method _updateMinAndMax","     * @private","     */","    _updateMinAndMax: function()","    {","        var max = 0,","            min = 0,","            pos = 0,","            neg = 0,","            len = 0,","            i = 0,","            key,","            num,","            keys = this.get(\"keys\"),","            setMin = this.get(\"setMin\"),","            setMax = this.get(\"setMax\");","","        for(key in keys)","        {","            if(keys.hasOwnProperty(key))","            {","                len = Math.max(len, keys[key].length);","            }","        }","        for(; i < len; ++i)","        {","            pos = 0;","            neg = 0;","            for(key in keys)","            {","                if(keys.hasOwnProperty(key))","                {","                    num = keys[key][i];","                    if(isNaN(num))","                    {","                        continue;","                    }","                    if(num >= 0)","                    {","                        pos += num;","                    }","                    else","                    {","                        neg += num;","                    }","                }","            }","            if(pos > 0)","            {","                max = Math.max(max, pos);","            }","            else","            {","                max = Math.max(max, neg);","            }","            if(neg < 0)","            {","                min = Math.min(min, neg);","            }","            else","            {","                min = Math.min(min, pos);","            }","        }","        this._actualMaximum = max;","        this._actualMinimum = min;","        if(setMax)","        {","            max = this._setMaximum;","        }","        if(setMin)","        {","            min = this._setMinimum;","        }","        this._roundMinAndMax(min, max, setMin, setMax);","    }","};","","Y.StackedImpl = StackedImpl;","","/**"," * StackedAxisBase manages time data for an axis."," *"," * @class StackedAxisBase"," * @constructor"," * @extends AxisBase"," * @uses StackedImpl"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis-stacked-base"," */","Y.StackedAxisBase = Y.Base.create(\"stackedAxisBase\", Y.NumericAxisBase, [Y.StackedImpl]);","","","}, '@VERSION@', {\"requires\": [\"axis-numeric-base\"]});"];
_yuitest_coverage["build/axis-stacked-base/axis-stacked-base.js"].lines = {"1":0,"17":0,"21":0,"23":0,"41":0,"53":0,"55":0,"57":0,"60":0,"62":0,"63":0,"64":0,"66":0,"68":0,"69":0,"71":0,"73":0,"75":0,"79":0,"83":0,"85":0,"89":0,"91":0,"93":0,"97":0,"100":0,"101":0,"102":0,"104":0,"106":0,"108":0,"110":0,"114":0,"126":0};
_yuitest_coverage["build/axis-stacked-base/axis-stacked-base.js"].functions = {"StackedImpl:17":0,"_updateMinAndMax:39":0,"(anonymous 1):1":0};
_yuitest_coverage["build/axis-stacked-base/axis-stacked-base.js"].coveredLines = 34;
_yuitest_coverage["build/axis-stacked-base/axis-stacked-base.js"].coveredFunctions = 3;
_yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 1);
YUI.add('axis-stacked-base', function (Y, NAME) {

/**
 * Provides core functionality for the handling of stacked numeric axis data for a chart.
 *
 * @module charts
 * @submodule axis-stacked-base
 */

/**
 * StackedImpl manages stacked numeric axis data.
 *
 * @submodule axis-stacked
 * @class StackedImpl
 * @constructor
 */
_yuitest_coverfunc("build/axis-stacked-base/axis-stacked-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 17);
function StackedImpl()
{
}

_yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 21);
StackedImpl.NAME = "stackedImpl";

_yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 23);
StackedImpl.prototype = {
    /**
     * Type of data used in `Data`.
     *
     * @property _type
     * @readOnly
     * @private
     */
    _type: "stacked",

    /**
     * Calculates the maximum and minimum values for the `Data`.
     *
     * @method _updateMinAndMax
     * @private
     */
    _updateMinAndMax: function()
    {
        _yuitest_coverfunc("build/axis-stacked-base/axis-stacked-base.js", "_updateMinAndMax", 39);
_yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 41);
var max = 0,
            min = 0,
            pos = 0,
            neg = 0,
            len = 0,
            i = 0,
            key,
            num,
            keys = this.get("keys"),
            setMin = this.get("setMin"),
            setMax = this.get("setMax");

        _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 53);
for(key in keys)
        {
            _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 55);
if(keys.hasOwnProperty(key))
            {
                _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 57);
len = Math.max(len, keys[key].length);
            }
        }
        _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 60);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 62);
pos = 0;
            _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 63);
neg = 0;
            _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 64);
for(key in keys)
            {
                _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 66);
if(keys.hasOwnProperty(key))
                {
                    _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 68);
num = keys[key][i];
                    _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 69);
if(isNaN(num))
                    {
                        _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 71);
continue;
                    }
                    _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 73);
if(num >= 0)
                    {
                        _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 75);
pos += num;
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 79);
neg += num;
                    }
                }
            }
            _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 83);
if(pos > 0)
            {
                _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 85);
max = Math.max(max, pos);
            }
            else
            {
                _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 89);
max = Math.max(max, neg);
            }
            _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 91);
if(neg < 0)
            {
                _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 93);
min = Math.min(min, neg);
            }
            else
            {
                _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 97);
min = Math.min(min, pos);
            }
        }
        _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 100);
this._actualMaximum = max;
        _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 101);
this._actualMinimum = min;
        _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 102);
if(setMax)
        {
            _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 104);
max = this._setMaximum;
        }
        _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 106);
if(setMin)
        {
            _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 108);
min = this._setMinimum;
        }
        _yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 110);
this._roundMinAndMax(min, max, setMin, setMax);
    }
};

_yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 114);
Y.StackedImpl = StackedImpl;

/**
 * StackedAxisBase manages time data for an axis.
 *
 * @class StackedAxisBase
 * @constructor
 * @extends AxisBase
 * @uses StackedImpl
 * @param {Object} config (optional) Configuration parameters.
 * @submodule axis-stacked-base
 */
_yuitest_coverline("build/axis-stacked-base/axis-stacked-base.js", 126);
Y.StackedAxisBase = Y.Base.create("stackedAxisBase", Y.NumericAxisBase, [Y.StackedImpl]);


}, '@VERSION@', {"requires": ["axis-numeric-base"]});
