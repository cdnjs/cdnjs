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
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/axis-numeric-base/axis-numeric-base.js",
    code: []
};
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"].code=["YUI.add('axis-numeric-base', function (Y, NAME) {","","/**"," * Provides functionality for the handling of numeric axis data for a chart."," *"," * @module charts"," * @submodule axis-numeric-base"," */","","var Y_Lang = Y.Lang;","/**"," * NumericImpl manages numeric data on an axis."," *"," * @class NumericImpl"," * @constructor"," * @submodule axis-numeric-base"," */","function NumericImpl()","{","}","","NumericImpl.NAME = \"numericImpl\";","","NumericImpl.ATTRS = {","    /**","     * Indicates whether 0 should always be displayed.","     *","     * @attribute alwaysShowZero","     * @type Boolean","     */","	alwaysShowZero: {","	    value: true","	},","","    /**","     * Method used for formatting a label. This attribute allows for the default label formatting method to overridden.","     * The method use would need to implement the arguments below and return a `String` or an `HTMLElement`. The default","     * implementation of the method returns a `String`. The output of this method will be rendered to the DOM using","     * `appendChild`. If you override the `labelFunction` method and return an html string, you will also need to override","     * the Data' `appendLabelFunction` to accept html as a `String`.","     * <dl>","     *      <dt>val</dt><dd>Label to be formatted. (`String`)</dd>","     *      <dt>format</dt><dd>Object containing properties used to format the label. (optional)</dd>","     * </dl>","     *","     * @attribute labelFunction","     * @type Function","     */","","    /**","     * Object containing properties used by the `labelFunction` to format a","     * label.","     *","     * @attribute labelFormat","     * @type Object","     */","    labelFormat: {","        value: {","            prefix: \"\",","            thousandsSeparator: \"\",","            decimalSeparator: \"\",","            decimalPlaces: \"0\",","            suffix: \"\"","        }","    },","","    /**","     *Indicates how to round unit values.","     *  <dl>","     *      <dt>niceNumber</dt><dd>Units will be smoothed based on the number of ticks and data range.</dd>","     *      <dt>auto</dt><dd>If the range is greater than 1, the units will be rounded.</dd>","     *      <dt>numeric value</dt><dd>Units will be equal to the numeric value.</dd>","     *      <dt>null</dt><dd>No rounding will occur.</dd>","     *  </dl>","     *","     * @attribute roundingMethod","     * @type String","     * @default niceNumber","     */","    roundingMethod: {","        value: \"niceNumber\"","    }","};","","NumericImpl.prototype = {","    /**","     * @method initializer","     * @private","     */","    initializer: function() {","        this.after(\"alwaysShowZeroChange\", this._keyChangeHandler);","        this.after(\"roundingMethodChange\", this._keyChangeHandler);","    },","","    /**","     * Formats a label based on the axis type and optionally specified format.","     *","     * @method ","     * @param {Object} value","     * @param {Object} format Pattern used to format the value.","     * @return String","     */","    formatLabel: function(val, format)","    {","        if(format)","        {","            return Y.DataType.Number.format(val, format);","        }","        return val;","    },","","    /**","     * Returns the sum of all values per key.","     *","     * @method getTotalByKey","     * @param {String} key The identifier for the array whose values will be calculated.","     * @return Number","     */","    getTotalByKey: function(key)","    {","        var total = 0,","            values = this.getDataByKey(key),","            i = 0,","            val,","            len = values ? values.length : 0;","        for(; i < len; ++i)","        {","           val = parseFloat(values[i]);","           if(!isNaN(val))","           {","                total += val;","           }","        }","        return total;","    },","","    /**","     * Type of data used in `Data`.","     *","     * @property _type","     * @readOnly","     * @private","     */","    _type: \"numeric\",","","    /**","     * Helper method for getting a `roundingUnit` when calculating the minimum and maximum values.","     *","     * @method _getMinimumUnit","     * @param {Number} max Maximum number","     * @param {Number} min Minimum number","     * @param {Number} units Number of units on the axis","     * @return Number","     * @private","     */","    _getMinimumUnit:function(max, min, units)","    {","        return this._getNiceNumber(Math.ceil((max - min)/units));","    },","","    /**","     * Calculates a nice rounding unit based on the range.","     *","     * @method _getNiceNumber","     * @param {Number} roundingUnit The calculated rounding unit.","     * @return Number","     * @private","     */","    _getNiceNumber: function(roundingUnit)","    {","        var tempMajorUnit = roundingUnit,","            order = Math.ceil(Math.log(tempMajorUnit) * 0.4342944819032518),","            roundedMajorUnit = Math.pow(10, order),","            roundedDiff;","","        if (roundedMajorUnit / 2 >= tempMajorUnit)","        {","            roundedDiff = Math.floor((roundedMajorUnit / 2 - tempMajorUnit) / (Math.pow(10,order-1)/2));","            tempMajorUnit = roundedMajorUnit/2 - roundedDiff*Math.pow(10,order-1)/2;","        }","        else","        {","            tempMajorUnit = roundedMajorUnit;","        }","        if(!isNaN(tempMajorUnit))","        {","            return tempMajorUnit;","        }","        return roundingUnit;","","    },","","    /**","     * Calculates the maximum and minimum values for the `Data`.","     *","     * @method _updateMinAndMax","     * @private","     */","    _updateMinAndMax: function()","    {","        var data = this.get(\"data\"),","            max,","            min,","            len,","            num,","            i = 0,","            key,","            setMax = this.get(\"setMax\"),","            setMin = this.get(\"setMin\");","        if(!setMax || !setMin)","        {","            if(data && data.length && data.length > 0)","            {","                len = data.length;","                for(; i < len; i++)","                {","                    num = data[i];","                    if(isNaN(num))","                    {","                        max = setMax ? this._setMaximum : max;","                        min = setMin ? this._setMinimum : min;","                        continue;","                    }","","                    if(setMin)","                    {","                        min = this._setMinimum;","                    }","                    else if(min === undefined)","                    {","                        min = num;","                    }","                    else","                    {","                        min = Math.min(num, min);","                    }","                    if(setMax)","                    {","                        max = this._setMaximum;","                    }","                    else if(max === undefined)","                    {","                        max = num;","                    }","                    else","                    {","                        max = Math.max(num, max);","                    }","","                    this._actualMaximum = max;","                    this._actualMinimum = min;","                }","            }","            this._roundMinAndMax(min, max, setMin, setMax);","        }","    },","","    /**","     * Rounds the mimimum and maximum values based on the `roundingUnit` attribute.","     *","     * @method _roundMinAndMax","     * @param {Number} min Minimum value","     * @param {Number} max Maximum value","     * @private","     */","    _roundMinAndMax: function(min, max, setMin, setMax)","    {","        var roundingUnit,","            minimumRange,","            minGreaterThanZero = min >= 0,","            maxGreaterThanZero = max > 0,","            dataRangeGreater,","            maxRound,","            minRound,","            topTicks,","            botTicks,","            tempMax,","            tempMin,","            units = this.getTotalMajorUnits() - 1,","            alwaysShowZero = this.get(\"alwaysShowZero\"),","            roundingMethod = this.get(\"roundingMethod\"),","            useIntegers = (max - min)/units >= 1;","        if(roundingMethod)","        {","            if(roundingMethod == \"niceNumber\")","            {","                roundingUnit = this._getMinimumUnit(max, min, units);","                if(minGreaterThanZero && maxGreaterThanZero)","                {","                    if((alwaysShowZero || min < roundingUnit) && !setMin)","                    {","                        min = 0;","                        roundingUnit = this._getMinimumUnit(max, min, units);","                    }","                    else","                    {","                       min = this._roundDownToNearest(min, roundingUnit);","                    }","                    if(setMax)","                    {","                        if(!alwaysShowZero)","                        {","                            min = max - (roundingUnit * units);","                        }","                    }","                    else if(setMin)","                    {","                        max = min + (roundingUnit * units);","                    }","                    else","                    {","                        max = this._roundUpToNearest(max, roundingUnit);","                    }","                }","                else if(maxGreaterThanZero && !minGreaterThanZero)","                {","                    if(alwaysShowZero)","                    {","                        topTicks = Math.round(units/((-1 * min)/max + 1));","                        topTicks = Math.max(Math.min(topTicks, units - 1), 1);","                        botTicks = units - topTicks;","                        tempMax = Math.ceil( max/topTicks );","                        tempMin = Math.floor( min/botTicks ) * -1;","","                        if(setMin)","                        {","                            while(tempMin < tempMax && botTicks >= 0)","                            {","                                botTicks--;","                                topTicks++;","                                tempMax = Math.ceil( max/topTicks );","                                tempMin = Math.floor( min/botTicks ) * -1;","                            }","                            //if there are any bottom ticks left calcualate the maximum by multiplying by the tempMin value","                            //if not, it's impossible to ensure that a zero is shown. skip it","                            if(botTicks > 0)","                            {","                                max = tempMin * topTicks;","                            }","                            else","                            {","                                max = min + (roundingUnit * units);","                            }","                        }","                        else if(setMax)","                        {","                            while(tempMax < tempMin && topTicks >= 0)","                            {","                                botTicks++;","                                topTicks--;","                                tempMin = Math.floor( min/botTicks ) * -1;","                                tempMax = Math.ceil( max/topTicks );","                            }","                            //if there are any top ticks left calcualate the minimum by multiplying by the tempMax value","                            //if not, it's impossible to ensure that a zero is shown. skip it","                            if(topTicks > 0)","                            {","                                min = tempMax * botTicks * -1;","                            }","                            else","                            {","                                min = max - (roundingUnit * units);","                            }","                        }","                        else","                        {","                            roundingUnit = Math.max(tempMax, tempMin);","                            roundingUnit = this._getNiceNumber(roundingUnit);","                            max = roundingUnit * topTicks;","                            min = roundingUnit * botTicks * -1;","                        }","                    }","                    else","                    {","                        if(setMax)","                        {","                            min = max - (roundingUnit * units);","                        }","                        else if(setMin)","                        {","                            max = min + (roundingUnit * units);","                        }","                        else","                        {","                            min = this._roundDownToNearest(min, roundingUnit);","                            max = this._roundUpToNearest(max, roundingUnit);","                        }","                    }","                }","                else","                {","                    if(setMin)","                    {","                        if(alwaysShowZero)","                        {","                            max = 0;","                        }","                        else","                        {","                            max = min + (roundingUnit * units);","                        }","                    }","                    else if(!setMax)","                    {","                        if(alwaysShowZero || max === 0 || max + roundingUnit > 0)","                        {","                            max = 0;","                            roundingUnit = this._getMinimumUnit(max, min, units);","                            min = max - (roundingUnit * units);","                        }","                        else","                        {","                            min = this._roundDownToNearest(min, roundingUnit);","                            max = this._roundUpToNearest(max, roundingUnit);","                        }","                    }","                    else","                    {","                        min = max - (roundingUnit * units);","                    }","                }","            }","            else if(roundingMethod == \"auto\")","            {","                if(minGreaterThanZero && maxGreaterThanZero)","                {","                    if((alwaysShowZero || min < (max-min)/units) && !setMin)","                    {","                        min = 0;","                    }","","                    roundingUnit = (max - min)/units;","                    if(useIntegers)","                    {","                        roundingUnit = Math.ceil(roundingUnit);","                        max = min + (roundingUnit * units);","                    }","                    else","                    {","                        max = min + Math.ceil(roundingUnit * units * 100000)/100000;","","                    }","                }","                else if(maxGreaterThanZero && !minGreaterThanZero)","                {","                    if(alwaysShowZero)","                    {","                        topTicks = Math.round( units / ( (-1 * min) /max + 1) );","                        topTicks = Math.max(Math.min(topTicks, units - 1), 1);","                        botTicks = units - topTicks;","","                        if(useIntegers)","                        {","                            tempMax = Math.ceil( max/topTicks );","                            tempMin = Math.floor( min/botTicks ) * -1;","                            roundingUnit = Math.max(tempMax, tempMin);","                            max = roundingUnit * topTicks;","                            min = roundingUnit * botTicks * -1;","                        }","                        else","                        {","                            tempMax = max/topTicks;","                            tempMin = min/botTicks * -1;","                            roundingUnit = Math.max(tempMax, tempMin);","                            max = Math.ceil(roundingUnit * topTicks * 100000)/100000;","                            min = Math.ceil(roundingUnit * botTicks * 100000)/100000 * -1;","                        }","                    }","                    else","                    {","                        roundingUnit = (max - min)/units;","                        if(useIntegers)","                        {","                            roundingUnit = Math.ceil(roundingUnit);","                        }","                        min = Math.round(this._roundDownToNearest(min, roundingUnit) * 100000)/100000;","                        max = Math.round(this._roundUpToNearest(max, roundingUnit) * 100000)/100000;","                    }","                }","                else","                {","                    roundingUnit = (max - min)/units;","                    if(useIntegers)","                    {","                        roundingUnit = Math.ceil(roundingUnit);","                    }","                    if(alwaysShowZero || max === 0 || max + roundingUnit > 0)","                    {","                        max = 0;","                        roundingUnit = (max - min)/units;","                        if(useIntegers)","                        {","                            Math.ceil(roundingUnit);","                            min = max - (roundingUnit * units);","                        }","                        else","                        {","                            min = max - Math.ceil(roundingUnit * units * 100000)/100000;","                        }","                    }","                    else","                    {","                        min = this._roundDownToNearest(min, roundingUnit);","                        max = this._roundUpToNearest(max, roundingUnit);","                    }","","                }","            }","            else if(!isNaN(roundingMethod) && isFinite(roundingMethod))","            {","                roundingUnit = roundingMethod;","                minimumRange = roundingUnit * units;","                dataRangeGreater = (max - min) > minimumRange;","                minRound = this._roundDownToNearest(min, roundingUnit);","                maxRound = this._roundUpToNearest(max, roundingUnit);","                if(setMax)","                {","                    min = max - minimumRange;","                }","                else if(setMin)","                {","                    max = min + minimumRange;","                }","                else if(minGreaterThanZero && maxGreaterThanZero)","                {","                    if(alwaysShowZero || minRound <= 0)","                    {","                        min = 0;","                    }","                    else","                    {","                        min = minRound;","                    }","                    max = min + minimumRange;","                }","                else if(maxGreaterThanZero && !minGreaterThanZero)","                {","                    min = minRound;","                    max = maxRound;","                }","                else","                {","                    if(alwaysShowZero || maxRound >= 0)","                    {","                        max = 0;","                    }","                    else","                    {","                        max = maxRound;","                    }","                    min = max - minimumRange;","                }","            }","        }","        this._dataMaximum = max;","        this._dataMinimum = min;","    },","","    /**","     * Rounds a Number to the nearest multiple of an input. For example, by rounding","     * 16 to the nearest 10, you will receive 20. Similar to the built-in function Math.round().","     *","     * @method _roundToNearest","     * @param {Number} number Number to round","     * @param {Number} nearest Multiple to round towards.","     * @return Number","     * @private","     */","    _roundToNearest: function(number, nearest)","    {","        nearest = nearest || 1;","        var roundedNumber = Math.round(this._roundToPrecision(number / nearest, 10)) * nearest;","        return this._roundToPrecision(roundedNumber, 10);","    },","","    /**","     * Rounds a Number up to the nearest multiple of an input. For example, by rounding","     * 16 up to the nearest 10, you will receive 20. Similar to the built-in function Math.ceil().","     *","     * @method _roundUpToNearest","     * @param {Number} number Number to round","     * @param {Number} nearest Multiple to round towards.","     * @return Number","     * @private","     */","    _roundUpToNearest: function(number, nearest)","    {","        nearest = nearest || 1;","        return Math.ceil(this._roundToPrecision(number / nearest, 10)) * nearest;","    },","","    /**","     * Rounds a Number down to the nearest multiple of an input. For example, by rounding","     * 16 down to the nearest 10, you will receive 10. Similar to the built-in function Math.floor().","     *","     * @method _roundDownToNearest","     * @param {Number} number Number to round","     * @param {Number} nearest Multiple to round towards.","     * @return Number","     * @private","     */","    _roundDownToNearest: function(number, nearest)","    {","        nearest = nearest || 1;","        return Math.floor(this._roundToPrecision(number / nearest, 10)) * nearest;","    },","","    /**","     * Rounds a number to a certain level of precision. Useful for limiting the number of","     * decimal places on a fractional number.","     *","     * @method _roundToPrecision","     * @param {Number} number Number to round","     * @param {Number} precision Multiple to round towards.","     * @return Number","     * @private","     */","    _roundToPrecision: function(number, precision)","    {","        precision = precision || 0;","        var decimalPlaces = Math.pow(10, precision);","        return Math.round(decimalPlaces * number) / decimalPlaces;","    }","};","","Y.NumericImpl = NumericImpl;","","/**"," * NumericAxisBase is an abstract class that manages numeric data for an axis."," *"," * @class NumericAxisBase"," * @constructor"," * @extends AxisBase"," * @uses NumericImpl"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis-numeric-base"," */","Y.NumericAxisBase = Y.Base.create(\"numericAxisBase\", Y.AxisBase, [Y.NumericImpl]);","","","}, '@VERSION@', {\"requires\": [\"axis-base\"]});"];
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"].lines = {"1":0,"10":0,"18":0,"22":0,"24":0,"85":0,"91":0,"92":0,"105":0,"107":0,"109":0,"121":0,"126":0,"128":0,"129":0,"131":0,"134":0,"158":0,"171":0,"176":0,"178":0,"179":0,"183":0,"185":0,"187":0,"189":0,"201":0,"210":0,"212":0,"214":0,"215":0,"217":0,"218":0,"220":0,"221":0,"222":0,"225":0,"227":0,"229":0,"231":0,"235":0,"237":0,"239":0,"241":0,"243":0,"247":0,"250":0,"251":0,"254":0,"268":0,"283":0,"285":0,"287":0,"288":0,"290":0,"292":0,"293":0,"297":0,"299":0,"301":0,"303":0,"306":0,"308":0,"312":0,"315":0,"317":0,"319":0,"320":0,"321":0,"322":0,"323":0,"325":0,"327":0,"329":0,"330":0,"331":0,"332":0,"336":0,"338":0,"342":0,"345":0,"347":0,"349":0,"350":0,"351":0,"352":0,"356":0,"358":0,"362":0,"367":0,"368":0,"369":0,"370":0,"375":0,"377":0,"379":0,"381":0,"385":0,"386":0,"392":0,"394":0,"396":0,"400":0,"403":0,"405":0,"407":0,"408":0,"409":0,"413":0,"414":0,"419":0,"423":0,"425":0,"427":0,"429":0,"432":0,"433":0,"435":0,"436":0,"440":0,"444":0,"446":0,"448":0,"449":0,"450":0,"452":0,"454":0,"455":0,"456":0,"457":0,"458":0,"462":0,"463":0,"464":0,"465":0,"466":0,"471":0,"472":0,"474":0,"476":0,"477":0,"482":0,"483":0,"485":0,"487":0,"489":0,"490":0,"491":0,"493":0,"494":0,"498":0,"503":0,"504":0,"509":0,"511":0,"512":0,"513":0,"514":0,"515":0,"516":0,"518":0,"520":0,"522":0,"524":0,"526":0,"528":0,"532":0,"534":0,"536":0,"538":0,"539":0,"543":0,"545":0,"549":0,"551":0,"555":0,"556":0,"571":0,"572":0,"573":0,"588":0,"589":0,"604":0,"605":0,"620":0,"621":0,"622":0,"626":0,"638":0};
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"].functions = {"NumericImpl:18":0,"initializer:90":0,"formatLabel:103":0,"getTotalByKey:119":0,"_getMinimumUnit:156":0,"_getNiceNumber:169":0,"_updateMinAndMax:199":0,"_roundMinAndMax:266":0,"_roundToNearest:569":0,"_roundUpToNearest:586":0,"_roundDownToNearest:602":0,"_roundToPrecision:618":0,"(anonymous 1):1":0};
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"].coveredLines = 189;
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"].coveredFunctions = 13;
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 1);
YUI.add('axis-numeric-base', function (Y, NAME) {

/**
 * Provides functionality for the handling of numeric axis data for a chart.
 *
 * @module charts
 * @submodule axis-numeric-base
 */

_yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 10);
var Y_Lang = Y.Lang;
/**
 * NumericImpl manages numeric data on an axis.
 *
 * @class NumericImpl
 * @constructor
 * @submodule axis-numeric-base
 */
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 18);
function NumericImpl()
{
}

_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 22);
NumericImpl.NAME = "numericImpl";

_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 24);
NumericImpl.ATTRS = {
    /**
     * Indicates whether 0 should always be displayed.
     *
     * @attribute alwaysShowZero
     * @type Boolean
     */
	alwaysShowZero: {
	    value: true
	},

    /**
     * Method used for formatting a label. This attribute allows for the default label formatting method to overridden.
     * The method use would need to implement the arguments below and return a `String` or an `HTMLElement`. The default
     * implementation of the method returns a `String`. The output of this method will be rendered to the DOM using
     * `appendChild`. If you override the `labelFunction` method and return an html string, you will also need to override
     * the Data' `appendLabelFunction` to accept html as a `String`.
     * <dl>
     *      <dt>val</dt><dd>Label to be formatted. (`String`)</dd>
     *      <dt>format</dt><dd>Object containing properties used to format the label. (optional)</dd>
     * </dl>
     *
     * @attribute labelFunction
     * @type Function
     */

    /**
     * Object containing properties used by the `labelFunction` to format a
     * label.
     *
     * @attribute labelFormat
     * @type Object
     */
    labelFormat: {
        value: {
            prefix: "",
            thousandsSeparator: "",
            decimalSeparator: "",
            decimalPlaces: "0",
            suffix: ""
        }
    },

    /**
     *Indicates how to round unit values.
     *  <dl>
     *      <dt>niceNumber</dt><dd>Units will be smoothed based on the number of ticks and data range.</dd>
     *      <dt>auto</dt><dd>If the range is greater than 1, the units will be rounded.</dd>
     *      <dt>numeric value</dt><dd>Units will be equal to the numeric value.</dd>
     *      <dt>null</dt><dd>No rounding will occur.</dd>
     *  </dl>
     *
     * @attribute roundingMethod
     * @type String
     * @default niceNumber
     */
    roundingMethod: {
        value: "niceNumber"
    }
};

_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 85);
NumericImpl.prototype = {
    /**
     * @method initializer
     * @private
     */
    initializer: function() {
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "initializer", 90);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 91);
this.after("alwaysShowZeroChange", this._keyChangeHandler);
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 92);
this.after("roundingMethodChange", this._keyChangeHandler);
    },

    /**
     * Formats a label based on the axis type and optionally specified format.
     *
     * @method 
     * @param {Object} value
     * @param {Object} format Pattern used to format the value.
     * @return String
     */
    formatLabel: function(val, format)
    {
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "formatLabel", 103);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 105);
if(format)
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 107);
return Y.DataType.Number.format(val, format);
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 109);
return val;
    },

    /**
     * Returns the sum of all values per key.
     *
     * @method getTotalByKey
     * @param {String} key The identifier for the array whose values will be calculated.
     * @return Number
     */
    getTotalByKey: function(key)
    {
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "getTotalByKey", 119);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 121);
var total = 0,
            values = this.getDataByKey(key),
            i = 0,
            val,
            len = values ? values.length : 0;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 126);
for(; i < len; ++i)
        {
           _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 128);
val = parseFloat(values[i]);
           _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 129);
if(!isNaN(val))
           {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 131);
total += val;
           }
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 134);
return total;
    },

    /**
     * Type of data used in `Data`.
     *
     * @property _type
     * @readOnly
     * @private
     */
    _type: "numeric",

    /**
     * Helper method for getting a `roundingUnit` when calculating the minimum and maximum values.
     *
     * @method _getMinimumUnit
     * @param {Number} max Maximum number
     * @param {Number} min Minimum number
     * @param {Number} units Number of units on the axis
     * @return Number
     * @private
     */
    _getMinimumUnit:function(max, min, units)
    {
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_getMinimumUnit", 156);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 158);
return this._getNiceNumber(Math.ceil((max - min)/units));
    },

    /**
     * Calculates a nice rounding unit based on the range.
     *
     * @method _getNiceNumber
     * @param {Number} roundingUnit The calculated rounding unit.
     * @return Number
     * @private
     */
    _getNiceNumber: function(roundingUnit)
    {
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_getNiceNumber", 169);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 171);
var tempMajorUnit = roundingUnit,
            order = Math.ceil(Math.log(tempMajorUnit) * 0.4342944819032518),
            roundedMajorUnit = Math.pow(10, order),
            roundedDiff;

        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 176);
if (roundedMajorUnit / 2 >= tempMajorUnit)
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 178);
roundedDiff = Math.floor((roundedMajorUnit / 2 - tempMajorUnit) / (Math.pow(10,order-1)/2));
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 179);
tempMajorUnit = roundedMajorUnit/2 - roundedDiff*Math.pow(10,order-1)/2;
        }
        else
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 183);
tempMajorUnit = roundedMajorUnit;
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 185);
if(!isNaN(tempMajorUnit))
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 187);
return tempMajorUnit;
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 189);
return roundingUnit;

    },

    /**
     * Calculates the maximum and minimum values for the `Data`.
     *
     * @method _updateMinAndMax
     * @private
     */
    _updateMinAndMax: function()
    {
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_updateMinAndMax", 199);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 201);
var data = this.get("data"),
            max,
            min,
            len,
            num,
            i = 0,
            key,
            setMax = this.get("setMax"),
            setMin = this.get("setMin");
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 210);
if(!setMax || !setMin)
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 212);
if(data && data.length && data.length > 0)
            {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 214);
len = data.length;
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 215);
for(; i < len; i++)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 217);
num = data[i];
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 218);
if(isNaN(num))
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 220);
max = setMax ? this._setMaximum : max;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 221);
min = setMin ? this._setMinimum : min;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 222);
continue;
                    }

                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 225);
if(setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 227);
min = this._setMinimum;
                    }
                    else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 229);
if(min === undefined)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 231);
min = num;
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 235);
min = Math.min(num, min);
                    }}
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 237);
if(setMax)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 239);
max = this._setMaximum;
                    }
                    else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 241);
if(max === undefined)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 243);
max = num;
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 247);
max = Math.max(num, max);
                    }}

                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 250);
this._actualMaximum = max;
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 251);
this._actualMinimum = min;
                }
            }
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 254);
this._roundMinAndMax(min, max, setMin, setMax);
        }
    },

    /**
     * Rounds the mimimum and maximum values based on the `roundingUnit` attribute.
     *
     * @method _roundMinAndMax
     * @param {Number} min Minimum value
     * @param {Number} max Maximum value
     * @private
     */
    _roundMinAndMax: function(min, max, setMin, setMax)
    {
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundMinAndMax", 266);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 268);
var roundingUnit,
            minimumRange,
            minGreaterThanZero = min >= 0,
            maxGreaterThanZero = max > 0,
            dataRangeGreater,
            maxRound,
            minRound,
            topTicks,
            botTicks,
            tempMax,
            tempMin,
            units = this.getTotalMajorUnits() - 1,
            alwaysShowZero = this.get("alwaysShowZero"),
            roundingMethod = this.get("roundingMethod"),
            useIntegers = (max - min)/units >= 1;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 283);
if(roundingMethod)
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 285);
if(roundingMethod == "niceNumber")
            {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 287);
roundingUnit = this._getMinimumUnit(max, min, units);
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 288);
if(minGreaterThanZero && maxGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 290);
if((alwaysShowZero || min < roundingUnit) && !setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 292);
min = 0;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 293);
roundingUnit = this._getMinimumUnit(max, min, units);
                    }
                    else
                    {
                       _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 297);
min = this._roundDownToNearest(min, roundingUnit);
                    }
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 299);
if(setMax)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 301);
if(!alwaysShowZero)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 303);
min = max - (roundingUnit * units);
                        }
                    }
                    else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 306);
if(setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 308);
max = min + (roundingUnit * units);
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 312);
max = this._roundUpToNearest(max, roundingUnit);
                    }}
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 315);
if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 317);
if(alwaysShowZero)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 319);
topTicks = Math.round(units/((-1 * min)/max + 1));
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 320);
topTicks = Math.max(Math.min(topTicks, units - 1), 1);
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 321);
botTicks = units - topTicks;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 322);
tempMax = Math.ceil( max/topTicks );
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 323);
tempMin = Math.floor( min/botTicks ) * -1;

                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 325);
if(setMin)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 327);
while(tempMin < tempMax && botTicks >= 0)
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 329);
botTicks--;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 330);
topTicks++;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 331);
tempMax = Math.ceil( max/topTicks );
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 332);
tempMin = Math.floor( min/botTicks ) * -1;
                            }
                            //if there are any bottom ticks left calcualate the maximum by multiplying by the tempMin value
                            //if not, it's impossible to ensure that a zero is shown. skip it
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 336);
if(botTicks > 0)
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 338);
max = tempMin * topTicks;
                            }
                            else
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 342);
max = min + (roundingUnit * units);
                            }
                        }
                        else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 345);
if(setMax)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 347);
while(tempMax < tempMin && topTicks >= 0)
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 349);
botTicks++;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 350);
topTicks--;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 351);
tempMin = Math.floor( min/botTicks ) * -1;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 352);
tempMax = Math.ceil( max/topTicks );
                            }
                            //if there are any top ticks left calcualate the minimum by multiplying by the tempMax value
                            //if not, it's impossible to ensure that a zero is shown. skip it
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 356);
if(topTicks > 0)
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 358);
min = tempMax * botTicks * -1;
                            }
                            else
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 362);
min = max - (roundingUnit * units);
                            }
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 367);
roundingUnit = Math.max(tempMax, tempMin);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 368);
roundingUnit = this._getNiceNumber(roundingUnit);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 369);
max = roundingUnit * topTicks;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 370);
min = roundingUnit * botTicks * -1;
                        }}
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 375);
if(setMax)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 377);
min = max - (roundingUnit * units);
                        }
                        else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 379);
if(setMin)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 381);
max = min + (roundingUnit * units);
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 385);
min = this._roundDownToNearest(min, roundingUnit);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 386);
max = this._roundUpToNearest(max, roundingUnit);
                        }}
                    }
                }
                else
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 392);
if(setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 394);
if(alwaysShowZero)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 396);
max = 0;
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 400);
max = min + (roundingUnit * units);
                        }
                    }
                    else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 403);
if(!setMax)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 405);
if(alwaysShowZero || max === 0 || max + roundingUnit > 0)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 407);
max = 0;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 408);
roundingUnit = this._getMinimumUnit(max, min, units);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 409);
min = max - (roundingUnit * units);
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 413);
min = this._roundDownToNearest(min, roundingUnit);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 414);
max = this._roundUpToNearest(max, roundingUnit);
                        }
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 419);
min = max - (roundingUnit * units);
                    }}
                }}
            }
            else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 423);
if(roundingMethod == "auto")
            {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 425);
if(minGreaterThanZero && maxGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 427);
if((alwaysShowZero || min < (max-min)/units) && !setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 429);
min = 0;
                    }

                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 432);
roundingUnit = (max - min)/units;
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 433);
if(useIntegers)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 435);
roundingUnit = Math.ceil(roundingUnit);
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 436);
max = min + (roundingUnit * units);
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 440);
max = min + Math.ceil(roundingUnit * units * 100000)/100000;

                    }
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 444);
if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 446);
if(alwaysShowZero)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 448);
topTicks = Math.round( units / ( (-1 * min) /max + 1) );
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 449);
topTicks = Math.max(Math.min(topTicks, units - 1), 1);
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 450);
botTicks = units - topTicks;

                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 452);
if(useIntegers)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 454);
tempMax = Math.ceil( max/topTicks );
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 455);
tempMin = Math.floor( min/botTicks ) * -1;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 456);
roundingUnit = Math.max(tempMax, tempMin);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 457);
max = roundingUnit * topTicks;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 458);
min = roundingUnit * botTicks * -1;
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 462);
tempMax = max/topTicks;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 463);
tempMin = min/botTicks * -1;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 464);
roundingUnit = Math.max(tempMax, tempMin);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 465);
max = Math.ceil(roundingUnit * topTicks * 100000)/100000;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 466);
min = Math.ceil(roundingUnit * botTicks * 100000)/100000 * -1;
                        }
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 471);
roundingUnit = (max - min)/units;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 472);
if(useIntegers)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 474);
roundingUnit = Math.ceil(roundingUnit);
                        }
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 476);
min = Math.round(this._roundDownToNearest(min, roundingUnit) * 100000)/100000;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 477);
max = Math.round(this._roundUpToNearest(max, roundingUnit) * 100000)/100000;
                    }
                }
                else
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 482);
roundingUnit = (max - min)/units;
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 483);
if(useIntegers)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 485);
roundingUnit = Math.ceil(roundingUnit);
                    }
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 487);
if(alwaysShowZero || max === 0 || max + roundingUnit > 0)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 489);
max = 0;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 490);
roundingUnit = (max - min)/units;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 491);
if(useIntegers)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 493);
Math.ceil(roundingUnit);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 494);
min = max - (roundingUnit * units);
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 498);
min = max - Math.ceil(roundingUnit * units * 100000)/100000;
                        }
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 503);
min = this._roundDownToNearest(min, roundingUnit);
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 504);
max = this._roundUpToNearest(max, roundingUnit);
                    }

                }}
            }
            else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 509);
if(!isNaN(roundingMethod) && isFinite(roundingMethod))
            {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 511);
roundingUnit = roundingMethod;
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 512);
minimumRange = roundingUnit * units;
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 513);
dataRangeGreater = (max - min) > minimumRange;
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 514);
minRound = this._roundDownToNearest(min, roundingUnit);
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 515);
maxRound = this._roundUpToNearest(max, roundingUnit);
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 516);
if(setMax)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 518);
min = max - minimumRange;
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 520);
if(setMin)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 522);
max = min + minimumRange;
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 524);
if(minGreaterThanZero && maxGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 526);
if(alwaysShowZero || minRound <= 0)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 528);
min = 0;
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 532);
min = minRound;
                    }
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 534);
max = min + minimumRange;
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 536);
if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 538);
min = minRound;
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 539);
max = maxRound;
                }
                else
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 543);
if(alwaysShowZero || maxRound >= 0)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 545);
max = 0;
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 549);
max = maxRound;
                    }
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 551);
min = max - minimumRange;
                }}}}
            }}}
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 555);
this._dataMaximum = max;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 556);
this._dataMinimum = min;
    },

    /**
     * Rounds a Number to the nearest multiple of an input. For example, by rounding
     * 16 to the nearest 10, you will receive 20. Similar to the built-in function Math.round().
     *
     * @method _roundToNearest
     * @param {Number} number Number to round
     * @param {Number} nearest Multiple to round towards.
     * @return Number
     * @private
     */
    _roundToNearest: function(number, nearest)
    {
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundToNearest", 569);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 571);
nearest = nearest || 1;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 572);
var roundedNumber = Math.round(this._roundToPrecision(number / nearest, 10)) * nearest;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 573);
return this._roundToPrecision(roundedNumber, 10);
    },

    /**
     * Rounds a Number up to the nearest multiple of an input. For example, by rounding
     * 16 up to the nearest 10, you will receive 20. Similar to the built-in function Math.ceil().
     *
     * @method _roundUpToNearest
     * @param {Number} number Number to round
     * @param {Number} nearest Multiple to round towards.
     * @return Number
     * @private
     */
    _roundUpToNearest: function(number, nearest)
    {
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundUpToNearest", 586);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 588);
nearest = nearest || 1;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 589);
return Math.ceil(this._roundToPrecision(number / nearest, 10)) * nearest;
    },

    /**
     * Rounds a Number down to the nearest multiple of an input. For example, by rounding
     * 16 down to the nearest 10, you will receive 10. Similar to the built-in function Math.floor().
     *
     * @method _roundDownToNearest
     * @param {Number} number Number to round
     * @param {Number} nearest Multiple to round towards.
     * @return Number
     * @private
     */
    _roundDownToNearest: function(number, nearest)
    {
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundDownToNearest", 602);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 604);
nearest = nearest || 1;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 605);
return Math.floor(this._roundToPrecision(number / nearest, 10)) * nearest;
    },

    /**
     * Rounds a number to a certain level of precision. Useful for limiting the number of
     * decimal places on a fractional number.
     *
     * @method _roundToPrecision
     * @param {Number} number Number to round
     * @param {Number} precision Multiple to round towards.
     * @return Number
     * @private
     */
    _roundToPrecision: function(number, precision)
    {
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundToPrecision", 618);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 620);
precision = precision || 0;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 621);
var decimalPlaces = Math.pow(10, precision);
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 622);
return Math.round(decimalPlaces * number) / decimalPlaces;
    }
};

_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 626);
Y.NumericImpl = NumericImpl;

/**
 * NumericAxisBase is an abstract class that manages numeric data for an axis.
 *
 * @class NumericAxisBase
 * @constructor
 * @extends AxisBase
 * @uses NumericImpl
 * @param {Object} config (optional) Configuration parameters.
 * @submodule axis-numeric-base
 */
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 638);
Y.NumericAxisBase = Y.Base.create("numericAxisBase", Y.AxisBase, [Y.NumericImpl]);


}, '@VERSION@', {"requires": ["axis-base"]});
