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
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"].code=["YUI.add('axis-numeric-base', function (Y, NAME) {","","/**"," * Provides functionality for the handling of numeric axis data for a chart."," *"," * @module charts"," * @submodule axis-numeric-base"," */","","var Y_Lang = Y.Lang;","/**"," * NumericImpl contains logic for numeric data. NumericImpl is used by the following classes:"," * <ul>"," *      <li>{{#crossLink \"NumericAxisBase\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"NumericAxis\"}}{{/crossLink}}</li>"," *  </ul>"," *"," * @class NumericImpl"," * @constructor"," * @submodule axis-numeric-base"," */","function NumericImpl()","{","}","","NumericImpl.NAME = \"numericImpl\";","","NumericImpl.ATTRS = {","    /**","     * Indicates whether 0 should always be displayed.","     *","     * @attribute alwaysShowZero","     * @type Boolean","     */","	alwaysShowZero: {","	    value: true","	},","","    /**","     * Method used for formatting a label. This attribute allows for the default label formatting method to overridden.","     * The method use would need to implement the arguments below and return a `String` or an `HTMLElement`. The default","     * implementation of the method returns a `String`. The output of this method will be rendered to the DOM using","     * `appendChild`. If you override the `labelFunction` method and return an html string, you will also need to override","     * the Data' `appendLabelFunction` to accept html as a `String`.","     * <dl>","     *      <dt>val</dt><dd>Label to be formatted. (`String`)</dd>","     *      <dt>format</dt><dd>Object containing properties used to format the label. (optional)</dd>","     * </dl>","     *","     * @attribute labelFunction","     * @type Function","     */","","    /**","     * Object containing properties used by the `labelFunction` to format a","     * label.","     *","     * @attribute labelFormat","     * @type Object","     */","    labelFormat: {","        value: {","            prefix: \"\",","            thousandsSeparator: \"\",","            decimalSeparator: \"\",","            decimalPlaces: \"0\",","            suffix: \"\"","        }","    },","","    /**","     *Indicates how to round unit values.","     *  <dl>","     *      <dt>niceNumber</dt><dd>Units will be smoothed based on the number of ticks and data range.</dd>","     *      <dt>auto</dt><dd>If the range is greater than 1, the units will be rounded.</dd>","     *      <dt>numeric value</dt><dd>Units will be equal to the numeric value.</dd>","     *      <dt>null</dt><dd>No rounding will occur.</dd>","     *  </dl>","     *","     * @attribute roundingMethod","     * @type String","     * @default niceNumber","     */","    roundingMethod: {","        value: \"niceNumber\"","    }","};","","NumericImpl.prototype = {","    /**","     * @method initializer","     * @private","     */","    initializer: function() {","        this.after(\"alwaysShowZeroChange\", this._keyChangeHandler);","        this.after(\"roundingMethodChange\", this._keyChangeHandler);","    },","","    /**","     * Formats a label based on the axis type and optionally specified format.","     *","     * @method ","     * @param {Object} value","     * @param {Object} format Pattern used to format the value.","     * @return String","     */","    formatLabel: function(val, format)","    {","        if(format)","        {","            return Y.DataType.Number.format(val, format);","        }","        return val;","    },","","    /**","     * Returns the sum of all values per key.","     *","     * @method getTotalByKey","     * @param {String} key The identifier for the array whose values will be calculated.","     * @return Number","     */","    getTotalByKey: function(key)","    {","        var total = 0,","            values = this.getDataByKey(key),","            i = 0,","            val,","            len = values ? values.length : 0;","        for(; i < len; ++i)","        {","           val = parseFloat(values[i]);","           if(!isNaN(val))","           {","                total += val;","           }","        }","        return total;","    },","","    /**","     * Type of data used in `Data`.","     *","     * @property _type","     * @readOnly","     * @private","     */","    _type: \"numeric\",","","    /**","     * Helper method for getting a `roundingUnit` when calculating the minimum and maximum values.","     *","     * @method _getMinimumUnit","     * @param {Number} max Maximum number","     * @param {Number} min Minimum number","     * @param {Number} units Number of units on the axis","     * @return Number","     * @private","     */","    _getMinimumUnit:function(max, min, units)","    {","        return this._getNiceNumber(Math.ceil((max - min)/units));","    },","","    /**","     * Calculates a nice rounding unit based on the range.","     *","     * @method _getNiceNumber","     * @param {Number} roundingUnit The calculated rounding unit.","     * @return Number","     * @private","     */","    _getNiceNumber: function(roundingUnit)","    {","        var tempMajorUnit = roundingUnit,","            order = Math.ceil(Math.log(tempMajorUnit) * 0.4342944819032518),","            roundedMajorUnit = Math.pow(10, order),","            roundedDiff;","","        if (roundedMajorUnit / 2 >= tempMajorUnit)","        {","            roundedDiff = Math.floor((roundedMajorUnit / 2 - tempMajorUnit) / (Math.pow(10,order-1)/2));","            tempMajorUnit = roundedMajorUnit/2 - roundedDiff*Math.pow(10,order-1)/2;","        }","        else","        {","            tempMajorUnit = roundedMajorUnit;","        }","        if(!isNaN(tempMajorUnit))","        {","            return tempMajorUnit;","        }","        return roundingUnit;","","    },","","    /**","     * Calculates the maximum and minimum values for the `Data`.","     *","     * @method _updateMinAndMax","     * @private","     */","    _updateMinAndMax: function()","    {","        var data = this.get(\"data\"),","            max,","            min,","            len,","            num,","            i = 0,","            key,","            setMax = this.get(\"setMax\"),","            setMin = this.get(\"setMin\");","        if(!setMax || !setMin)","        {","            if(data && data.length && data.length > 0)","            {","                len = data.length;","                for(; i < len; i++)","                {","                    num = data[i];","                    if(isNaN(num))","                    {","                        max = setMax ? this._setMaximum : max;","                        min = setMin ? this._setMinimum : min;","                        continue;","                    }","","                    if(setMin)","                    {","                        min = this._setMinimum;","                    }","                    else if(min === undefined)","                    {","                        min = num;","                    }","                    else","                    {","                        min = Math.min(num, min);","                    }","                    if(setMax)","                    {","                        max = this._setMaximum;","                    }","                    else if(max === undefined)","                    {","                        max = num;","                    }","                    else","                    {","                        max = Math.max(num, max);","                    }","","                    this._actualMaximum = max;","                    this._actualMinimum = min;","                }","            }","            this._roundMinAndMax(min, max, setMin, setMax);","        }","    },","","    /**","     * Rounds the mimimum and maximum values based on the `roundingUnit` attribute.","     *","     * @method _roundMinAndMax","     * @param {Number} min Minimum value","     * @param {Number} max Maximum value","     * @private","     */","    _roundMinAndMax: function(min, max, setMin, setMax)","    {","        var roundingUnit,","            minimumRange,","            minGreaterThanZero = min >= 0,","            maxGreaterThanZero = max > 0,","            dataRangeGreater,","            maxRound,","            minRound,","            topTicks,","            botTicks,","            tempMax,","            tempMin,","            units = this.getTotalMajorUnits() - 1,","            alwaysShowZero = this.get(\"alwaysShowZero\"),","            roundingMethod = this.get(\"roundingMethod\"),","            useIntegers = (max - min)/units >= 1;","        if(roundingMethod)","        {","            if(roundingMethod == \"niceNumber\")","            {","                roundingUnit = this._getMinimumUnit(max, min, units);","                if(minGreaterThanZero && maxGreaterThanZero)","                {","                    if((alwaysShowZero || min < roundingUnit) && !setMin)","                    {","                        min = 0;","                        roundingUnit = this._getMinimumUnit(max, min, units);","                    }","                    else","                    {","                       min = this._roundDownToNearest(min, roundingUnit);","                    }","                    if(setMax)","                    {","                        if(!alwaysShowZero)","                        {","                            min = max - (roundingUnit * units);","                        }","                    }","                    else if(setMin)","                    {","                        max = min + (roundingUnit * units);","                    }","                    else","                    {","                        max = this._roundUpToNearest(max, roundingUnit);","                    }","                }","                else if(maxGreaterThanZero && !minGreaterThanZero)","                {","                    if(alwaysShowZero)","                    {","                        topTicks = Math.round(units/((-1 * min)/max + 1));","                        topTicks = Math.max(Math.min(topTicks, units - 1), 1);","                        botTicks = units - topTicks;","                        tempMax = Math.ceil( max/topTicks );","                        tempMin = Math.floor( min/botTicks ) * -1;","","                        if(setMin)","                        {","                            while(tempMin < tempMax && botTicks >= 0)","                            {","                                botTicks--;","                                topTicks++;","                                tempMax = Math.ceil( max/topTicks );","                                tempMin = Math.floor( min/botTicks ) * -1;","                            }","                            //if there are any bottom ticks left calcualate the maximum by multiplying by the tempMin value","                            //if not, it's impossible to ensure that a zero is shown. skip it","                            if(botTicks > 0)","                            {","                                max = tempMin * topTicks;","                            }","                            else","                            {","                                max = min + (roundingUnit * units);","                            }","                        }","                        else if(setMax)","                        {","                            while(tempMax < tempMin && topTicks >= 0)","                            {","                                botTicks++;","                                topTicks--;","                                tempMin = Math.floor( min/botTicks ) * -1;","                                tempMax = Math.ceil( max/topTicks );","                            }","                            //if there are any top ticks left calcualate the minimum by multiplying by the tempMax value","                            //if not, it's impossible to ensure that a zero is shown. skip it","                            if(topTicks > 0)","                            {","                                min = tempMax * botTicks * -1;","                            }","                            else","                            {","                                min = max - (roundingUnit * units);","                            }","                        }","                        else","                        {","                            roundingUnit = Math.max(tempMax, tempMin);","                            roundingUnit = this._getNiceNumber(roundingUnit);","                            max = roundingUnit * topTicks;","                            min = roundingUnit * botTicks * -1;","                        }","                    }","                    else","                    {","                        if(setMax)","                        {","                            min = max - (roundingUnit * units);","                        }","                        else if(setMin)","                        {","                            max = min + (roundingUnit * units);","                        }","                        else","                        {","                            min = this._roundDownToNearest(min, roundingUnit);","                            max = this._roundUpToNearest(max, roundingUnit);","                        }","                    }","                }","                else","                {","                    if(setMin)","                    {","                        if(alwaysShowZero)","                        {","                            max = 0;","                        }","                        else","                        {","                            max = min + (roundingUnit * units);","                        }","                    }","                    else if(!setMax)","                    {","                        if(alwaysShowZero || max === 0 || max + roundingUnit > 0)","                        {","                            max = 0;","                            roundingUnit = this._getMinimumUnit(max, min, units);","                            min = max - (roundingUnit * units);","                        }","                        else","                        {","                            min = this._roundDownToNearest(min, roundingUnit);","                            max = this._roundUpToNearest(max, roundingUnit);","                        }","                    }","                    else","                    {","                        min = max - (roundingUnit * units);","                    }","                }","            }","            else if(roundingMethod == \"auto\")","            {","                if(minGreaterThanZero && maxGreaterThanZero)","                {","                    if((alwaysShowZero || min < (max-min)/units) && !setMin)","                    {","                        min = 0;","                    }","","                    roundingUnit = (max - min)/units;","                    if(useIntegers)","                    {","                        roundingUnit = Math.ceil(roundingUnit);","                        max = min + (roundingUnit * units);","                    }","                    else","                    {","                        max = min + Math.ceil(roundingUnit * units * 100000)/100000;","","                    }","                }","                else if(maxGreaterThanZero && !minGreaterThanZero)","                {","                    if(alwaysShowZero)","                    {","                        topTicks = Math.round( units / ( (-1 * min) /max + 1) );","                        topTicks = Math.max(Math.min(topTicks, units - 1), 1);","                        botTicks = units - topTicks;","","                        if(useIntegers)","                        {","                            tempMax = Math.ceil( max/topTicks );","                            tempMin = Math.floor( min/botTicks ) * -1;","                            roundingUnit = Math.max(tempMax, tempMin);","                            max = roundingUnit * topTicks;","                            min = roundingUnit * botTicks * -1;","                        }","                        else","                        {","                            tempMax = max/topTicks;","                            tempMin = min/botTicks * -1;","                            roundingUnit = Math.max(tempMax, tempMin);","                            max = Math.ceil(roundingUnit * topTicks * 100000)/100000;","                            min = Math.ceil(roundingUnit * botTicks * 100000)/100000 * -1;","                        }","                    }","                    else","                    {","                        roundingUnit = (max - min)/units;","                        if(useIntegers)","                        {","                            roundingUnit = Math.ceil(roundingUnit);","                        }","                        min = Math.round(this._roundDownToNearest(min, roundingUnit) * 100000)/100000;","                        max = Math.round(this._roundUpToNearest(max, roundingUnit) * 100000)/100000;","                    }","                }","                else","                {","                    roundingUnit = (max - min)/units;","                    if(useIntegers)","                    {","                        roundingUnit = Math.ceil(roundingUnit);","                    }","                    if(alwaysShowZero || max === 0 || max + roundingUnit > 0)","                    {","                        max = 0;","                        roundingUnit = (max - min)/units;","                        if(useIntegers)","                        {","                            Math.ceil(roundingUnit);","                            min = max - (roundingUnit * units);","                        }","                        else","                        {","                            min = max - Math.ceil(roundingUnit * units * 100000)/100000;","                        }","                    }","                    else","                    {","                        min = this._roundDownToNearest(min, roundingUnit);","                        max = this._roundUpToNearest(max, roundingUnit);","                    }","","                }","            }","            else if(!isNaN(roundingMethod) && isFinite(roundingMethod))","            {","                roundingUnit = roundingMethod;","                minimumRange = roundingUnit * units;","                dataRangeGreater = (max - min) > minimumRange;","                minRound = this._roundDownToNearest(min, roundingUnit);","                maxRound = this._roundUpToNearest(max, roundingUnit);","                if(setMax)","                {","                    min = max - minimumRange;","                }","                else if(setMin)","                {","                    max = min + minimumRange;","                }","                else if(minGreaterThanZero && maxGreaterThanZero)","                {","                    if(alwaysShowZero || minRound <= 0)","                    {","                        min = 0;","                    }","                    else","                    {","                        min = minRound;","                    }","                    max = min + minimumRange;","                }","                else if(maxGreaterThanZero && !minGreaterThanZero)","                {","                    min = minRound;","                    max = maxRound;","                }","                else","                {","                    if(alwaysShowZero || maxRound >= 0)","                    {","                        max = 0;","                    }","                    else","                    {","                        max = maxRound;","                    }","                    min = max - minimumRange;","                }","            }","        }","        this._dataMaximum = max;","        this._dataMinimum = min;","    },","","    /**","     * Rounds a Number to the nearest multiple of an input. For example, by rounding","     * 16 to the nearest 10, you will receive 20. Similar to the built-in function Math.round().","     *","     * @method _roundToNearest","     * @param {Number} number Number to round","     * @param {Number} nearest Multiple to round towards.","     * @return Number","     * @private","     */","    _roundToNearest: function(number, nearest)","    {","        nearest = nearest || 1;","        var roundedNumber = Math.round(this._roundToPrecision(number / nearest, 10)) * nearest;","        return this._roundToPrecision(roundedNumber, 10);","    },","","    /**","     * Rounds a Number up to the nearest multiple of an input. For example, by rounding","     * 16 up to the nearest 10, you will receive 20. Similar to the built-in function Math.ceil().","     *","     * @method _roundUpToNearest","     * @param {Number} number Number to round","     * @param {Number} nearest Multiple to round towards.","     * @return Number","     * @private","     */","    _roundUpToNearest: function(number, nearest)","    {","        nearest = nearest || 1;","        return Math.ceil(this._roundToPrecision(number / nearest, 10)) * nearest;","    },","","    /**","     * Rounds a Number down to the nearest multiple of an input. For example, by rounding","     * 16 down to the nearest 10, you will receive 10. Similar to the built-in function Math.floor().","     *","     * @method _roundDownToNearest","     * @param {Number} number Number to round","     * @param {Number} nearest Multiple to round towards.","     * @return Number","     * @private","     */","    _roundDownToNearest: function(number, nearest)","    {","        nearest = nearest || 1;","        return Math.floor(this._roundToPrecision(number / nearest, 10)) * nearest;","    },","","    /**","     * Rounds a number to a certain level of precision. Useful for limiting the number of","     * decimal places on a fractional number.","     *","     * @method _roundToPrecision","     * @param {Number} number Number to round","     * @param {Number} precision Multiple to round towards.","     * @return Number","     * @private","     */","    _roundToPrecision: function(number, precision)","    {","        precision = precision || 0;","        var decimalPlaces = Math.pow(10, precision);","        return Math.round(decimalPlaces * number) / decimalPlaces;","    }","};","","Y.NumericImpl = NumericImpl;","","/**"," * NumericAxisBase manages numeric data for an axis."," *"," * @class NumericAxisBase"," * @constructor"," * @extends AxisBase"," * @uses NumericImpl"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis-numeric-base"," */","Y.NumericAxisBase = Y.Base.create(\"numericAxisBase\", Y.AxisBase, [Y.NumericImpl]);","","","}, '@VERSION@', {\"requires\": [\"axis-base\"]});"];
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"].lines = {"1":0,"10":0,"22":0,"26":0,"28":0,"89":0,"95":0,"96":0,"109":0,"111":0,"113":0,"125":0,"130":0,"132":0,"133":0,"135":0,"138":0,"162":0,"175":0,"180":0,"182":0,"183":0,"187":0,"189":0,"191":0,"193":0,"205":0,"214":0,"216":0,"218":0,"219":0,"221":0,"222":0,"224":0,"225":0,"226":0,"229":0,"231":0,"233":0,"235":0,"239":0,"241":0,"243":0,"245":0,"247":0,"251":0,"254":0,"255":0,"258":0,"272":0,"287":0,"289":0,"291":0,"292":0,"294":0,"296":0,"297":0,"301":0,"303":0,"305":0,"307":0,"310":0,"312":0,"316":0,"319":0,"321":0,"323":0,"324":0,"325":0,"326":0,"327":0,"329":0,"331":0,"333":0,"334":0,"335":0,"336":0,"340":0,"342":0,"346":0,"349":0,"351":0,"353":0,"354":0,"355":0,"356":0,"360":0,"362":0,"366":0,"371":0,"372":0,"373":0,"374":0,"379":0,"381":0,"383":0,"385":0,"389":0,"390":0,"396":0,"398":0,"400":0,"404":0,"407":0,"409":0,"411":0,"412":0,"413":0,"417":0,"418":0,"423":0,"427":0,"429":0,"431":0,"433":0,"436":0,"437":0,"439":0,"440":0,"444":0,"448":0,"450":0,"452":0,"453":0,"454":0,"456":0,"458":0,"459":0,"460":0,"461":0,"462":0,"466":0,"467":0,"468":0,"469":0,"470":0,"475":0,"476":0,"478":0,"480":0,"481":0,"486":0,"487":0,"489":0,"491":0,"493":0,"494":0,"495":0,"497":0,"498":0,"502":0,"507":0,"508":0,"513":0,"515":0,"516":0,"517":0,"518":0,"519":0,"520":0,"522":0,"524":0,"526":0,"528":0,"530":0,"532":0,"536":0,"538":0,"540":0,"542":0,"543":0,"547":0,"549":0,"553":0,"555":0,"559":0,"560":0,"575":0,"576":0,"577":0,"592":0,"593":0,"608":0,"609":0,"624":0,"625":0,"626":0,"630":0,"642":0};
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"].functions = {"NumericImpl:22":0,"initializer:94":0,"formatLabel:107":0,"getTotalByKey:123":0,"_getMinimumUnit:160":0,"_getNiceNumber:173":0,"_updateMinAndMax:203":0,"_roundMinAndMax:270":0,"_roundToNearest:573":0,"_roundUpToNearest:590":0,"_roundDownToNearest:606":0,"_roundToPrecision:622":0,"(anonymous 1):1":0};
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
 * NumericImpl contains logic for numeric data. NumericImpl is used by the following classes:
 * <ul>
 *      <li>{{#crossLink "NumericAxisBase"}}{{/crossLink}}</li>
 *      <li>{{#crossLink "NumericAxis"}}{{/crossLink}}</li>
 *  </ul>
 *
 * @class NumericImpl
 * @constructor
 * @submodule axis-numeric-base
 */
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 22);
function NumericImpl()
{
}

_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 26);
NumericImpl.NAME = "numericImpl";

_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 28);
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

_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 89);
NumericImpl.prototype = {
    /**
     * @method initializer
     * @private
     */
    initializer: function() {
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "initializer", 94);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 95);
this.after("alwaysShowZeroChange", this._keyChangeHandler);
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 96);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "formatLabel", 107);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 109);
if(format)
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 111);
return Y.DataType.Number.format(val, format);
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 113);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "getTotalByKey", 123);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 125);
var total = 0,
            values = this.getDataByKey(key),
            i = 0,
            val,
            len = values ? values.length : 0;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 130);
for(; i < len; ++i)
        {
           _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 132);
val = parseFloat(values[i]);
           _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 133);
if(!isNaN(val))
           {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 135);
total += val;
           }
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 138);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_getMinimumUnit", 160);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 162);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_getNiceNumber", 173);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 175);
var tempMajorUnit = roundingUnit,
            order = Math.ceil(Math.log(tempMajorUnit) * 0.4342944819032518),
            roundedMajorUnit = Math.pow(10, order),
            roundedDiff;

        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 180);
if (roundedMajorUnit / 2 >= tempMajorUnit)
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 182);
roundedDiff = Math.floor((roundedMajorUnit / 2 - tempMajorUnit) / (Math.pow(10,order-1)/2));
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 183);
tempMajorUnit = roundedMajorUnit/2 - roundedDiff*Math.pow(10,order-1)/2;
        }
        else
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 187);
tempMajorUnit = roundedMajorUnit;
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 189);
if(!isNaN(tempMajorUnit))
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 191);
return tempMajorUnit;
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 193);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_updateMinAndMax", 203);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 205);
var data = this.get("data"),
            max,
            min,
            len,
            num,
            i = 0,
            key,
            setMax = this.get("setMax"),
            setMin = this.get("setMin");
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 214);
if(!setMax || !setMin)
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 216);
if(data && data.length && data.length > 0)
            {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 218);
len = data.length;
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 219);
for(; i < len; i++)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 221);
num = data[i];
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 222);
if(isNaN(num))
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 224);
max = setMax ? this._setMaximum : max;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 225);
min = setMin ? this._setMinimum : min;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 226);
continue;
                    }

                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 229);
if(setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 231);
min = this._setMinimum;
                    }
                    else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 233);
if(min === undefined)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 235);
min = num;
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 239);
min = Math.min(num, min);
                    }}
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 241);
if(setMax)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 243);
max = this._setMaximum;
                    }
                    else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 245);
if(max === undefined)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 247);
max = num;
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 251);
max = Math.max(num, max);
                    }}

                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 254);
this._actualMaximum = max;
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 255);
this._actualMinimum = min;
                }
            }
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 258);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundMinAndMax", 270);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 272);
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
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 287);
if(roundingMethod)
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 289);
if(roundingMethod == "niceNumber")
            {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 291);
roundingUnit = this._getMinimumUnit(max, min, units);
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 292);
if(minGreaterThanZero && maxGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 294);
if((alwaysShowZero || min < roundingUnit) && !setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 296);
min = 0;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 297);
roundingUnit = this._getMinimumUnit(max, min, units);
                    }
                    else
                    {
                       _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 301);
min = this._roundDownToNearest(min, roundingUnit);
                    }
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 303);
if(setMax)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 305);
if(!alwaysShowZero)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 307);
min = max - (roundingUnit * units);
                        }
                    }
                    else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 310);
if(setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 312);
max = min + (roundingUnit * units);
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 316);
max = this._roundUpToNearest(max, roundingUnit);
                    }}
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 319);
if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 321);
if(alwaysShowZero)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 323);
topTicks = Math.round(units/((-1 * min)/max + 1));
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 324);
topTicks = Math.max(Math.min(topTicks, units - 1), 1);
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 325);
botTicks = units - topTicks;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 326);
tempMax = Math.ceil( max/topTicks );
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 327);
tempMin = Math.floor( min/botTicks ) * -1;

                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 329);
if(setMin)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 331);
while(tempMin < tempMax && botTicks >= 0)
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 333);
botTicks--;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 334);
topTicks++;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 335);
tempMax = Math.ceil( max/topTicks );
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 336);
tempMin = Math.floor( min/botTicks ) * -1;
                            }
                            //if there are any bottom ticks left calcualate the maximum by multiplying by the tempMin value
                            //if not, it's impossible to ensure that a zero is shown. skip it
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 340);
if(botTicks > 0)
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 342);
max = tempMin * topTicks;
                            }
                            else
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 346);
max = min + (roundingUnit * units);
                            }
                        }
                        else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 349);
if(setMax)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 351);
while(tempMax < tempMin && topTicks >= 0)
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 353);
botTicks++;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 354);
topTicks--;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 355);
tempMin = Math.floor( min/botTicks ) * -1;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 356);
tempMax = Math.ceil( max/topTicks );
                            }
                            //if there are any top ticks left calcualate the minimum by multiplying by the tempMax value
                            //if not, it's impossible to ensure that a zero is shown. skip it
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 360);
if(topTicks > 0)
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 362);
min = tempMax * botTicks * -1;
                            }
                            else
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 366);
min = max - (roundingUnit * units);
                            }
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 371);
roundingUnit = Math.max(tempMax, tempMin);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 372);
roundingUnit = this._getNiceNumber(roundingUnit);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 373);
max = roundingUnit * topTicks;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 374);
min = roundingUnit * botTicks * -1;
                        }}
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 379);
if(setMax)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 381);
min = max - (roundingUnit * units);
                        }
                        else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 383);
if(setMin)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 385);
max = min + (roundingUnit * units);
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 389);
min = this._roundDownToNearest(min, roundingUnit);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 390);
max = this._roundUpToNearest(max, roundingUnit);
                        }}
                    }
                }
                else
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 396);
if(setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 398);
if(alwaysShowZero)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 400);
max = 0;
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 404);
max = min + (roundingUnit * units);
                        }
                    }
                    else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 407);
if(!setMax)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 409);
if(alwaysShowZero || max === 0 || max + roundingUnit > 0)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 411);
max = 0;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 412);
roundingUnit = this._getMinimumUnit(max, min, units);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 413);
min = max - (roundingUnit * units);
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 417);
min = this._roundDownToNearest(min, roundingUnit);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 418);
max = this._roundUpToNearest(max, roundingUnit);
                        }
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 423);
min = max - (roundingUnit * units);
                    }}
                }}
            }
            else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 427);
if(roundingMethod == "auto")
            {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 429);
if(minGreaterThanZero && maxGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 431);
if((alwaysShowZero || min < (max-min)/units) && !setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 433);
min = 0;
                    }

                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 436);
roundingUnit = (max - min)/units;
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 437);
if(useIntegers)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 439);
roundingUnit = Math.ceil(roundingUnit);
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 440);
max = min + (roundingUnit * units);
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 444);
max = min + Math.ceil(roundingUnit * units * 100000)/100000;

                    }
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 448);
if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 450);
if(alwaysShowZero)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 452);
topTicks = Math.round( units / ( (-1 * min) /max + 1) );
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 453);
topTicks = Math.max(Math.min(topTicks, units - 1), 1);
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 454);
botTicks = units - topTicks;

                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 456);
if(useIntegers)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 458);
tempMax = Math.ceil( max/topTicks );
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 459);
tempMin = Math.floor( min/botTicks ) * -1;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 460);
roundingUnit = Math.max(tempMax, tempMin);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 461);
max = roundingUnit * topTicks;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 462);
min = roundingUnit * botTicks * -1;
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 466);
tempMax = max/topTicks;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 467);
tempMin = min/botTicks * -1;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 468);
roundingUnit = Math.max(tempMax, tempMin);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 469);
max = Math.ceil(roundingUnit * topTicks * 100000)/100000;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 470);
min = Math.ceil(roundingUnit * botTicks * 100000)/100000 * -1;
                        }
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 475);
roundingUnit = (max - min)/units;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 476);
if(useIntegers)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 478);
roundingUnit = Math.ceil(roundingUnit);
                        }
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 480);
min = Math.round(this._roundDownToNearest(min, roundingUnit) * 100000)/100000;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 481);
max = Math.round(this._roundUpToNearest(max, roundingUnit) * 100000)/100000;
                    }
                }
                else
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 486);
roundingUnit = (max - min)/units;
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 487);
if(useIntegers)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 489);
roundingUnit = Math.ceil(roundingUnit);
                    }
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 491);
if(alwaysShowZero || max === 0 || max + roundingUnit > 0)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 493);
max = 0;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 494);
roundingUnit = (max - min)/units;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 495);
if(useIntegers)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 497);
Math.ceil(roundingUnit);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 498);
min = max - (roundingUnit * units);
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 502);
min = max - Math.ceil(roundingUnit * units * 100000)/100000;
                        }
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 507);
min = this._roundDownToNearest(min, roundingUnit);
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 508);
max = this._roundUpToNearest(max, roundingUnit);
                    }

                }}
            }
            else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 513);
if(!isNaN(roundingMethod) && isFinite(roundingMethod))
            {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 515);
roundingUnit = roundingMethod;
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 516);
minimumRange = roundingUnit * units;
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 517);
dataRangeGreater = (max - min) > minimumRange;
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 518);
minRound = this._roundDownToNearest(min, roundingUnit);
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 519);
maxRound = this._roundUpToNearest(max, roundingUnit);
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 520);
if(setMax)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 522);
min = max - minimumRange;
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 524);
if(setMin)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 526);
max = min + minimumRange;
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 528);
if(minGreaterThanZero && maxGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 530);
if(alwaysShowZero || minRound <= 0)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 532);
min = 0;
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 536);
min = minRound;
                    }
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 538);
max = min + minimumRange;
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 540);
if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 542);
min = minRound;
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 543);
max = maxRound;
                }
                else
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 547);
if(alwaysShowZero || maxRound >= 0)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 549);
max = 0;
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 553);
max = maxRound;
                    }
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 555);
min = max - minimumRange;
                }}}}
            }}}
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 559);
this._dataMaximum = max;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 560);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundToNearest", 573);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 575);
nearest = nearest || 1;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 576);
var roundedNumber = Math.round(this._roundToPrecision(number / nearest, 10)) * nearest;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 577);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundUpToNearest", 590);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 592);
nearest = nearest || 1;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 593);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundDownToNearest", 606);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 608);
nearest = nearest || 1;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 609);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundToPrecision", 622);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 624);
precision = precision || 0;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 625);
var decimalPlaces = Math.pow(10, precision);
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 626);
return Math.round(decimalPlaces * number) / decimalPlaces;
    }
};

_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 630);
Y.NumericImpl = NumericImpl;

/**
 * NumericAxisBase manages numeric data for an axis.
 *
 * @class NumericAxisBase
 * @constructor
 * @extends AxisBase
 * @uses NumericImpl
 * @param {Object} config (optional) Configuration parameters.
 * @submodule axis-numeric-base
 */
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 642);
Y.NumericAxisBase = Y.Base.create("numericAxisBase", Y.AxisBase, [Y.NumericImpl]);


}, '@VERSION@', {"requires": ["axis-base"]});
