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
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"].code=["YUI.add('axis-numeric-base', function (Y, NAME) {","","/**"," * Provides functionality for the handling of numeric axis data for a chart."," *"," * @module charts"," * @submodule axis-numeric-base"," */","","/**"," * NumericImpl contains logic for numeric data. NumericImpl is used by the following classes:"," * <ul>"," *      <li>{{#crossLink \"NumericAxisBase\"}}{{/crossLink}}</li>"," *      <li>{{#crossLink \"NumericAxis\"}}{{/crossLink}}</li>"," *  </ul>"," *"," * @class NumericImpl"," * @constructor"," * @submodule axis-numeric-base"," */","function NumericImpl()","{","}","","NumericImpl.NAME = \"numericImpl\";","","NumericImpl.ATTRS = {","    /**","     * Indicates whether 0 should always be displayed.","     *","     * @attribute alwaysShowZero","     * @type Boolean","     */","    alwaysShowZero: {","        value: true","    },","","    /**","     * Method used for formatting a label. This attribute allows for the default label formatting method to overridden.","     * The method use would need to implement the arguments below and return a `String` or an `HTMLElement`. The default","     * implementation of the method returns a `String`. The output of this method will be rendered to the DOM using","     * `appendChild`. If you override the `labelFunction` method and return an html string, you will also need to override","     * the Data' `appendLabelFunction` to accept html as a `String`.","     * <dl>","     *      <dt>val</dt><dd>Label to be formatted. (`String`)</dd>","     *      <dt>format</dt><dd>Object containing properties used to format the label. (optional)</dd>","     * </dl>","     *","     * @attribute labelFunction","     * @type Function","     */","","    /**","     * Object containing properties used by the `labelFunction` to format a","     * label.","     *","     * @attribute labelFormat","     * @type Object","     */","    labelFormat: {","        value: {","            prefix: \"\",","            thousandsSeparator: \"\",","            decimalSeparator: \"\",","            decimalPlaces: \"0\",","            suffix: \"\"","        }","    },","","    /**","     *Indicates how to round unit values.","     *  <dl>","     *      <dt>niceNumber</dt><dd>Units will be smoothed based on the number of ticks and data range.</dd>","     *      <dt>auto</dt><dd>If the range is greater than 1, the units will be rounded.</dd>","     *      <dt>numeric value</dt><dd>Units will be equal to the numeric value.</dd>","     *      <dt>null</dt><dd>No rounding will occur.</dd>","     *  </dl>","     *","     * @attribute roundingMethod","     * @type String","     * @default niceNumber","     */","    roundingMethod: {","        value: \"niceNumber\"","    }","};","","NumericImpl.prototype = {","    /**","     * @method initializer","     * @private","     */","    initializer: function() {","        this.after(\"alwaysShowZeroChange\", this._keyChangeHandler);","        this.after(\"roundingMethodChange\", this._keyChangeHandler);","    },","","    /**","     * Formats a label based on the axis type and optionally specified format.","     *","     * @method","     * @param {Object} value","     * @param {Object} format Pattern used to format the value.","     * @return String","     */","    formatLabel: function(val, format)","    {","        if(format)","        {","            return Y.DataType.Number.format(val, format);","        }","        return val;","    },","","    /**","     * Returns the sum of all values per key.","     *","     * @method getTotalByKey","     * @param {String} key The identifier for the array whose values will be calculated.","     * @return Number","     */","    getTotalByKey: function(key)","    {","        var total = 0,","            values = this.getDataByKey(key),","            i = 0,","            val,","            len = values ? values.length : 0;","        for(; i < len; ++i)","        {","           val = parseFloat(values[i]);","           if(!isNaN(val))","           {","                total += val;","           }","        }","        return total;","    },","","    /**","     * Type of data used in `Data`.","     *","     * @property _type","     * @readOnly","     * @private","     */","    _type: \"numeric\",","","    /**","     * Helper method for getting a `roundingUnit` when calculating the minimum and maximum values.","     *","     * @method _getMinimumUnit","     * @param {Number} max Maximum number","     * @param {Number} min Minimum number","     * @param {Number} units Number of units on the axis","     * @return Number","     * @private","     */","    _getMinimumUnit:function(max, min, units)","    {","        return this._getNiceNumber(Math.ceil((max - min)/units));","    },","","    /**","     * Calculates a nice rounding unit based on the range.","     *","     * @method _getNiceNumber","     * @param {Number} roundingUnit The calculated rounding unit.","     * @return Number","     * @private","     */","    _getNiceNumber: function(roundingUnit)","    {","        var tempMajorUnit = roundingUnit,","            order = Math.ceil(Math.log(tempMajorUnit) * 0.4342944819032518),","            roundedMajorUnit = Math.pow(10, order),","            roundedDiff;","","        if (roundedMajorUnit / 2 >= tempMajorUnit)","        {","            roundedDiff = Math.floor((roundedMajorUnit / 2 - tempMajorUnit) / (Math.pow(10,order-1)/2));","            tempMajorUnit = roundedMajorUnit/2 - roundedDiff*Math.pow(10,order-1)/2;","        }","        else","        {","            tempMajorUnit = roundedMajorUnit;","        }","        if(!isNaN(tempMajorUnit))","        {","            return tempMajorUnit;","        }","        return roundingUnit;","","    },","","    /**","     * Calculates the maximum and minimum values for the `Data`.","     *","     * @method _updateMinAndMax","     * @private","     */","    _updateMinAndMax: function()","    {","        var data = this.get(\"data\"),","            max,","            min,","            len,","            num,","            i = 0,","            setMax = this.get(\"setMax\"),","            setMin = this.get(\"setMin\");","        if(!setMax || !setMin)","        {","            if(data && data.length && data.length > 0)","            {","                len = data.length;","                for(; i < len; i++)","                {","                    num = data[i];","                    if(isNaN(num))","                    {","                        max = setMax ? this._setMaximum : max;","                        min = setMin ? this._setMinimum : min;","                        continue;","                    }","","                    if(setMin)","                    {","                        min = this._setMinimum;","                    }","                    else if(min === undefined)","                    {","                        min = num;","                    }","                    else","                    {","                        min = Math.min(num, min);","                    }","                    if(setMax)","                    {","                        max = this._setMaximum;","                    }","                    else if(max === undefined)","                    {","                        max = num;","                    }","                    else","                    {","                        max = Math.max(num, max);","                    }","","                    this._actualMaximum = max;","                    this._actualMinimum = min;","                }","            }","            this._roundMinAndMax(min, max, setMin, setMax);","        }","    },","","    /**","     * Rounds the mimimum and maximum values based on the `roundingUnit` attribute.","     *","     * @method _roundMinAndMax","     * @param {Number} min Minimum value","     * @param {Number} max Maximum value","     * @private","     */","    _roundMinAndMax: function(min, max, setMin, setMax)","    {","        var roundingUnit,","            minimumRange,","            minGreaterThanZero = min >= 0,","            maxGreaterThanZero = max > 0,","            dataRangeGreater,","            maxRound,","            minRound,","            topTicks,","            botTicks,","            tempMax,","            tempMin,","            units = this.getTotalMajorUnits() - 1,","            alwaysShowZero = this.get(\"alwaysShowZero\"),","            roundingMethod = this.get(\"roundingMethod\"),","            useIntegers = (max - min)/units >= 1;","        if(roundingMethod)","        {","            if(roundingMethod === \"niceNumber\")","            {","                roundingUnit = this._getMinimumUnit(max, min, units);","                if(minGreaterThanZero && maxGreaterThanZero)","                {","                    if((alwaysShowZero || min < roundingUnit) && !setMin)","                    {","                        min = 0;","                        roundingUnit = this._getMinimumUnit(max, min, units);","                    }","                    else","                    {","                       min = this._roundDownToNearest(min, roundingUnit);","                    }","                    if(setMax)","                    {","                        if(!alwaysShowZero)","                        {","                            min = max - (roundingUnit * units);","                        }","                    }","                    else if(setMin)","                    {","                        max = min + (roundingUnit * units);","                    }","                    else","                    {","                        max = this._roundUpToNearest(max, roundingUnit);","                    }","                }","                else if(maxGreaterThanZero && !minGreaterThanZero)","                {","                    if(alwaysShowZero)","                    {","                        topTicks = Math.round(units/((-1 * min)/max + 1));","                        topTicks = Math.max(Math.min(topTicks, units - 1), 1);","                        botTicks = units - topTicks;","                        tempMax = Math.ceil( max/topTicks );","                        tempMin = Math.floor( min/botTicks ) * -1;","","                        if(setMin)","                        {","                            while(tempMin < tempMax && botTicks >= 0)","                            {","                                botTicks--;","                                topTicks++;","                                tempMax = Math.ceil( max/topTicks );","                                tempMin = Math.floor( min/botTicks ) * -1;","                            }","                            //if there are any bottom ticks left calcualate the maximum by multiplying by the tempMin value","                            //if not, it's impossible to ensure that a zero is shown. skip it","                            if(botTicks > 0)","                            {","                                max = tempMin * topTicks;","                            }","                            else","                            {","                                max = min + (roundingUnit * units);","                            }","                        }","                        else if(setMax)","                        {","                            while(tempMax < tempMin && topTicks >= 0)","                            {","                                botTicks++;","                                topTicks--;","                                tempMin = Math.floor( min/botTicks ) * -1;","                                tempMax = Math.ceil( max/topTicks );","                            }","                            //if there are any top ticks left calcualate the minimum by multiplying by the tempMax value","                            //if not, it's impossible to ensure that a zero is shown. skip it","                            if(topTicks > 0)","                            {","                                min = tempMax * botTicks * -1;","                            }","                            else","                            {","                                min = max - (roundingUnit * units);","                            }","                        }","                        else","                        {","                            roundingUnit = Math.max(tempMax, tempMin);","                            roundingUnit = this._getNiceNumber(roundingUnit);","                            max = roundingUnit * topTicks;","                            min = roundingUnit * botTicks * -1;","                        }","                    }","                    else","                    {","                        if(setMax)","                        {","                            min = max - (roundingUnit * units);","                        }","                        else if(setMin)","                        {","                            max = min + (roundingUnit * units);","                        }","                        else","                        {","                            min = this._roundDownToNearest(min, roundingUnit);","                            max = this._roundUpToNearest(max, roundingUnit);","                        }","                    }","                }","                else","                {","                    if(setMin)","                    {","                        if(alwaysShowZero)","                        {","                            max = 0;","                        }","                        else","                        {","                            max = min + (roundingUnit * units);","                        }","                    }","                    else if(!setMax)","                    {","                        if(alwaysShowZero || max === 0 || max + roundingUnit > 0)","                        {","                            max = 0;","                            roundingUnit = this._getMinimumUnit(max, min, units);","                            min = max - (roundingUnit * units);","                        }","                        else","                        {","                            min = this._roundDownToNearest(min, roundingUnit);","                            max = this._roundUpToNearest(max, roundingUnit);","                        }","                    }","                    else","                    {","                        min = max - (roundingUnit * units);","                    }","                }","            }","            else if(roundingMethod === \"auto\")","            {","                if(minGreaterThanZero && maxGreaterThanZero)","                {","                    if((alwaysShowZero || min < (max-min)/units) && !setMin)","                    {","                        min = 0;","                    }","","                    roundingUnit = (max - min)/units;","                    if(useIntegers)","                    {","                        roundingUnit = Math.ceil(roundingUnit);","                        max = min + (roundingUnit * units);","                    }","                    else","                    {","                        max = min + Math.ceil(roundingUnit * units * 100000)/100000;","","                    }","                }","                else if(maxGreaterThanZero && !minGreaterThanZero)","                {","                    if(alwaysShowZero)","                    {","                        topTicks = Math.round( units / ( (-1 * min) /max + 1) );","                        topTicks = Math.max(Math.min(topTicks, units - 1), 1);","                        botTicks = units - topTicks;","","                        if(useIntegers)","                        {","                            tempMax = Math.ceil( max/topTicks );","                            tempMin = Math.floor( min/botTicks ) * -1;","                            roundingUnit = Math.max(tempMax, tempMin);","                            max = roundingUnit * topTicks;","                            min = roundingUnit * botTicks * -1;","                        }","                        else","                        {","                            tempMax = max/topTicks;","                            tempMin = min/botTicks * -1;","                            roundingUnit = Math.max(tempMax, tempMin);","                            max = Math.ceil(roundingUnit * topTicks * 100000)/100000;","                            min = Math.ceil(roundingUnit * botTicks * 100000)/100000 * -1;","                        }","                    }","                    else","                    {","                        roundingUnit = (max - min)/units;","                        if(useIntegers)","                        {","                            roundingUnit = Math.ceil(roundingUnit);","                        }","                        min = Math.round(this._roundDownToNearest(min, roundingUnit) * 100000)/100000;","                        max = Math.round(this._roundUpToNearest(max, roundingUnit) * 100000)/100000;","                    }","                }","                else","                {","                    roundingUnit = (max - min)/units;","                    if(useIntegers)","                    {","                        roundingUnit = Math.ceil(roundingUnit);","                    }","                    if(alwaysShowZero || max === 0 || max + roundingUnit > 0)","                    {","                        max = 0;","                        roundingUnit = (max - min)/units;","                        if(useIntegers)","                        {","                            Math.ceil(roundingUnit);","                            min = max - (roundingUnit * units);","                        }","                        else","                        {","                            min = max - Math.ceil(roundingUnit * units * 100000)/100000;","                        }","                    }","                    else","                    {","                        min = this._roundDownToNearest(min, roundingUnit);","                        max = this._roundUpToNearest(max, roundingUnit);","                    }","","                }","            }","            else if(!isNaN(roundingMethod) && isFinite(roundingMethod))","            {","                roundingUnit = roundingMethod;","                minimumRange = roundingUnit * units;","                dataRangeGreater = (max - min) > minimumRange;","                minRound = this._roundDownToNearest(min, roundingUnit);","                maxRound = this._roundUpToNearest(max, roundingUnit);","                if(setMax)","                {","                    min = max - minimumRange;","                }","                else if(setMin)","                {","                    max = min + minimumRange;","                }","                else if(minGreaterThanZero && maxGreaterThanZero)","                {","                    if(alwaysShowZero || minRound <= 0)","                    {","                        min = 0;","                    }","                    else","                    {","                        min = minRound;","                    }","                    max = min + minimumRange;","                }","                else if(maxGreaterThanZero && !minGreaterThanZero)","                {","                    min = minRound;","                    max = maxRound;","                }","                else","                {","                    if(alwaysShowZero || maxRound >= 0)","                    {","                        max = 0;","                    }","                    else","                    {","                        max = maxRound;","                    }","                    min = max - minimumRange;","                }","            }","        }","        this._dataMaximum = max;","        this._dataMinimum = min;","    },","","    /**","     * Rounds a Number to the nearest multiple of an input. For example, by rounding","     * 16 to the nearest 10, you will receive 20. Similar to the built-in function Math.round().","     *","     * @method _roundToNearest","     * @param {Number} number Number to round","     * @param {Number} nearest Multiple to round towards.","     * @return Number","     * @private","     */","    _roundToNearest: function(number, nearest)","    {","        nearest = nearest || 1;","        var roundedNumber = Math.round(this._roundToPrecision(number / nearest, 10)) * nearest;","        return this._roundToPrecision(roundedNumber, 10);","    },","","    /**","     * Rounds a Number up to the nearest multiple of an input. For example, by rounding","     * 16 up to the nearest 10, you will receive 20. Similar to the built-in function Math.ceil().","     *","     * @method _roundUpToNearest","     * @param {Number} number Number to round","     * @param {Number} nearest Multiple to round towards.","     * @return Number","     * @private","     */","    _roundUpToNearest: function(number, nearest)","    {","        nearest = nearest || 1;","        return Math.ceil(this._roundToPrecision(number / nearest, 10)) * nearest;","    },","","    /**","     * Rounds a Number down to the nearest multiple of an input. For example, by rounding","     * 16 down to the nearest 10, you will receive 10. Similar to the built-in function Math.floor().","     *","     * @method _roundDownToNearest","     * @param {Number} number Number to round","     * @param {Number} nearest Multiple to round towards.","     * @return Number","     * @private","     */","    _roundDownToNearest: function(number, nearest)","    {","        nearest = nearest || 1;","        return Math.floor(this._roundToPrecision(number / nearest, 10)) * nearest;","    },","","    /**","     * Rounds a number to a certain level of precision. Useful for limiting the number of","     * decimal places on a fractional number.","     *","     * @method _roundToPrecision","     * @param {Number} number Number to round","     * @param {Number} precision Multiple to round towards.","     * @return Number","     * @private","     */","    _roundToPrecision: function(number, precision)","    {","        precision = precision || 0;","        var decimalPlaces = Math.pow(10, precision);","        return Math.round(decimalPlaces * number) / decimalPlaces;","    }","};","","Y.NumericImpl = NumericImpl;","","/**"," * NumericAxisBase manages numeric data for an axis."," *"," * @class NumericAxisBase"," * @constructor"," * @extends AxisBase"," * @uses NumericImpl"," * @param {Object} config (optional) Configuration parameters."," * @submodule axis-numeric-base"," */","Y.NumericAxisBase = Y.Base.create(\"numericAxisBase\", Y.AxisBase, [Y.NumericImpl]);","","","}, '@VERSION@', {\"requires\": [\"axis-base\"]});"];
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"].lines = {"1":0,"21":0,"25":0,"27":0,"88":0,"94":0,"95":0,"108":0,"110":0,"112":0,"124":0,"129":0,"131":0,"132":0,"134":0,"137":0,"161":0,"174":0,"179":0,"181":0,"182":0,"186":0,"188":0,"190":0,"192":0,"204":0,"212":0,"214":0,"216":0,"217":0,"219":0,"220":0,"222":0,"223":0,"224":0,"227":0,"229":0,"231":0,"233":0,"237":0,"239":0,"241":0,"243":0,"245":0,"249":0,"252":0,"253":0,"256":0,"270":0,"285":0,"287":0,"289":0,"290":0,"292":0,"294":0,"295":0,"299":0,"301":0,"303":0,"305":0,"308":0,"310":0,"314":0,"317":0,"319":0,"321":0,"322":0,"323":0,"324":0,"325":0,"327":0,"329":0,"331":0,"332":0,"333":0,"334":0,"338":0,"340":0,"344":0,"347":0,"349":0,"351":0,"352":0,"353":0,"354":0,"358":0,"360":0,"364":0,"369":0,"370":0,"371":0,"372":0,"377":0,"379":0,"381":0,"383":0,"387":0,"388":0,"394":0,"396":0,"398":0,"402":0,"405":0,"407":0,"409":0,"410":0,"411":0,"415":0,"416":0,"421":0,"425":0,"427":0,"429":0,"431":0,"434":0,"435":0,"437":0,"438":0,"442":0,"446":0,"448":0,"450":0,"451":0,"452":0,"454":0,"456":0,"457":0,"458":0,"459":0,"460":0,"464":0,"465":0,"466":0,"467":0,"468":0,"473":0,"474":0,"476":0,"478":0,"479":0,"484":0,"485":0,"487":0,"489":0,"491":0,"492":0,"493":0,"495":0,"496":0,"500":0,"505":0,"506":0,"511":0,"513":0,"514":0,"515":0,"516":0,"517":0,"518":0,"520":0,"522":0,"524":0,"526":0,"528":0,"530":0,"534":0,"536":0,"538":0,"540":0,"541":0,"545":0,"547":0,"551":0,"553":0,"557":0,"558":0,"573":0,"574":0,"575":0,"590":0,"591":0,"606":0,"607":0,"622":0,"623":0,"624":0,"628":0,"640":0};
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"].functions = {"NumericImpl:21":0,"initializer:93":0,"formatLabel:106":0,"getTotalByKey:122":0,"_getMinimumUnit:159":0,"_getNiceNumber:172":0,"_updateMinAndMax:202":0,"_roundMinAndMax:268":0,"_roundToNearest:571":0,"_roundUpToNearest:588":0,"_roundDownToNearest:604":0,"_roundToPrecision:620":0,"(anonymous 1):1":0};
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"].coveredLines = 188;
_yuitest_coverage["build/axis-numeric-base/axis-numeric-base.js"].coveredFunctions = 13;
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 1);
YUI.add('axis-numeric-base', function (Y, NAME) {

/**
 * Provides functionality for the handling of numeric axis data for a chart.
 *
 * @module charts
 * @submodule axis-numeric-base
 */

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
_yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 21);
function NumericImpl()
{
}

_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 25);
NumericImpl.NAME = "numericImpl";

_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 27);
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

_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 88);
NumericImpl.prototype = {
    /**
     * @method initializer
     * @private
     */
    initializer: function() {
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "initializer", 93);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 94);
this.after("alwaysShowZeroChange", this._keyChangeHandler);
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 95);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "formatLabel", 106);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 108);
if(format)
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 110);
return Y.DataType.Number.format(val, format);
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 112);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "getTotalByKey", 122);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 124);
var total = 0,
            values = this.getDataByKey(key),
            i = 0,
            val,
            len = values ? values.length : 0;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 129);
for(; i < len; ++i)
        {
           _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 131);
val = parseFloat(values[i]);
           _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 132);
if(!isNaN(val))
           {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 134);
total += val;
           }
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 137);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_getMinimumUnit", 159);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 161);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_getNiceNumber", 172);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 174);
var tempMajorUnit = roundingUnit,
            order = Math.ceil(Math.log(tempMajorUnit) * 0.4342944819032518),
            roundedMajorUnit = Math.pow(10, order),
            roundedDiff;

        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 179);
if (roundedMajorUnit / 2 >= tempMajorUnit)
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 181);
roundedDiff = Math.floor((roundedMajorUnit / 2 - tempMajorUnit) / (Math.pow(10,order-1)/2));
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 182);
tempMajorUnit = roundedMajorUnit/2 - roundedDiff*Math.pow(10,order-1)/2;
        }
        else
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 186);
tempMajorUnit = roundedMajorUnit;
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 188);
if(!isNaN(tempMajorUnit))
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 190);
return tempMajorUnit;
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 192);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_updateMinAndMax", 202);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 204);
var data = this.get("data"),
            max,
            min,
            len,
            num,
            i = 0,
            setMax = this.get("setMax"),
            setMin = this.get("setMin");
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 212);
if(!setMax || !setMin)
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 214);
if(data && data.length && data.length > 0)
            {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 216);
len = data.length;
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 217);
for(; i < len; i++)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 219);
num = data[i];
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 220);
if(isNaN(num))
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 222);
max = setMax ? this._setMaximum : max;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 223);
min = setMin ? this._setMinimum : min;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 224);
continue;
                    }

                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 227);
if(setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 229);
min = this._setMinimum;
                    }
                    else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 231);
if(min === undefined)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 233);
min = num;
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 237);
min = Math.min(num, min);
                    }}
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 239);
if(setMax)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 241);
max = this._setMaximum;
                    }
                    else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 243);
if(max === undefined)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 245);
max = num;
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 249);
max = Math.max(num, max);
                    }}

                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 252);
this._actualMaximum = max;
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 253);
this._actualMinimum = min;
                }
            }
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 256);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundMinAndMax", 268);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 270);
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
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 285);
if(roundingMethod)
        {
            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 287);
if(roundingMethod === "niceNumber")
            {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 289);
roundingUnit = this._getMinimumUnit(max, min, units);
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 290);
if(minGreaterThanZero && maxGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 292);
if((alwaysShowZero || min < roundingUnit) && !setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 294);
min = 0;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 295);
roundingUnit = this._getMinimumUnit(max, min, units);
                    }
                    else
                    {
                       _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 299);
min = this._roundDownToNearest(min, roundingUnit);
                    }
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 301);
if(setMax)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 303);
if(!alwaysShowZero)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 305);
min = max - (roundingUnit * units);
                        }
                    }
                    else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 308);
if(setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 310);
max = min + (roundingUnit * units);
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 314);
max = this._roundUpToNearest(max, roundingUnit);
                    }}
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 317);
if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 319);
if(alwaysShowZero)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 321);
topTicks = Math.round(units/((-1 * min)/max + 1));
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 322);
topTicks = Math.max(Math.min(topTicks, units - 1), 1);
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 323);
botTicks = units - topTicks;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 324);
tempMax = Math.ceil( max/topTicks );
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 325);
tempMin = Math.floor( min/botTicks ) * -1;

                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 327);
if(setMin)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 329);
while(tempMin < tempMax && botTicks >= 0)
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 331);
botTicks--;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 332);
topTicks++;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 333);
tempMax = Math.ceil( max/topTicks );
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 334);
tempMin = Math.floor( min/botTicks ) * -1;
                            }
                            //if there are any bottom ticks left calcualate the maximum by multiplying by the tempMin value
                            //if not, it's impossible to ensure that a zero is shown. skip it
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 338);
if(botTicks > 0)
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 340);
max = tempMin * topTicks;
                            }
                            else
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 344);
max = min + (roundingUnit * units);
                            }
                        }
                        else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 347);
if(setMax)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 349);
while(tempMax < tempMin && topTicks >= 0)
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 351);
botTicks++;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 352);
topTicks--;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 353);
tempMin = Math.floor( min/botTicks ) * -1;
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 354);
tempMax = Math.ceil( max/topTicks );
                            }
                            //if there are any top ticks left calcualate the minimum by multiplying by the tempMax value
                            //if not, it's impossible to ensure that a zero is shown. skip it
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 358);
if(topTicks > 0)
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 360);
min = tempMax * botTicks * -1;
                            }
                            else
                            {
                                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 364);
min = max - (roundingUnit * units);
                            }
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 369);
roundingUnit = Math.max(tempMax, tempMin);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 370);
roundingUnit = this._getNiceNumber(roundingUnit);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 371);
max = roundingUnit * topTicks;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 372);
min = roundingUnit * botTicks * -1;
                        }}
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 377);
if(setMax)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 379);
min = max - (roundingUnit * units);
                        }
                        else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 381);
if(setMin)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 383);
max = min + (roundingUnit * units);
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 387);
min = this._roundDownToNearest(min, roundingUnit);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 388);
max = this._roundUpToNearest(max, roundingUnit);
                        }}
                    }
                }
                else
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 394);
if(setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 396);
if(alwaysShowZero)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 398);
max = 0;
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 402);
max = min + (roundingUnit * units);
                        }
                    }
                    else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 405);
if(!setMax)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 407);
if(alwaysShowZero || max === 0 || max + roundingUnit > 0)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 409);
max = 0;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 410);
roundingUnit = this._getMinimumUnit(max, min, units);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 411);
min = max - (roundingUnit * units);
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 415);
min = this._roundDownToNearest(min, roundingUnit);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 416);
max = this._roundUpToNearest(max, roundingUnit);
                        }
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 421);
min = max - (roundingUnit * units);
                    }}
                }}
            }
            else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 425);
if(roundingMethod === "auto")
            {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 427);
if(minGreaterThanZero && maxGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 429);
if((alwaysShowZero || min < (max-min)/units) && !setMin)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 431);
min = 0;
                    }

                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 434);
roundingUnit = (max - min)/units;
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 435);
if(useIntegers)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 437);
roundingUnit = Math.ceil(roundingUnit);
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 438);
max = min + (roundingUnit * units);
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 442);
max = min + Math.ceil(roundingUnit * units * 100000)/100000;

                    }
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 446);
if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 448);
if(alwaysShowZero)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 450);
topTicks = Math.round( units / ( (-1 * min) /max + 1) );
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 451);
topTicks = Math.max(Math.min(topTicks, units - 1), 1);
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 452);
botTicks = units - topTicks;

                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 454);
if(useIntegers)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 456);
tempMax = Math.ceil( max/topTicks );
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 457);
tempMin = Math.floor( min/botTicks ) * -1;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 458);
roundingUnit = Math.max(tempMax, tempMin);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 459);
max = roundingUnit * topTicks;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 460);
min = roundingUnit * botTicks * -1;
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 464);
tempMax = max/topTicks;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 465);
tempMin = min/botTicks * -1;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 466);
roundingUnit = Math.max(tempMax, tempMin);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 467);
max = Math.ceil(roundingUnit * topTicks * 100000)/100000;
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 468);
min = Math.ceil(roundingUnit * botTicks * 100000)/100000 * -1;
                        }
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 473);
roundingUnit = (max - min)/units;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 474);
if(useIntegers)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 476);
roundingUnit = Math.ceil(roundingUnit);
                        }
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 478);
min = Math.round(this._roundDownToNearest(min, roundingUnit) * 100000)/100000;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 479);
max = Math.round(this._roundUpToNearest(max, roundingUnit) * 100000)/100000;
                    }
                }
                else
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 484);
roundingUnit = (max - min)/units;
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 485);
if(useIntegers)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 487);
roundingUnit = Math.ceil(roundingUnit);
                    }
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 489);
if(alwaysShowZero || max === 0 || max + roundingUnit > 0)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 491);
max = 0;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 492);
roundingUnit = (max - min)/units;
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 493);
if(useIntegers)
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 495);
Math.ceil(roundingUnit);
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 496);
min = max - (roundingUnit * units);
                        }
                        else
                        {
                            _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 500);
min = max - Math.ceil(roundingUnit * units * 100000)/100000;
                        }
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 505);
min = this._roundDownToNearest(min, roundingUnit);
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 506);
max = this._roundUpToNearest(max, roundingUnit);
                    }

                }}
            }
            else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 511);
if(!isNaN(roundingMethod) && isFinite(roundingMethod))
            {
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 513);
roundingUnit = roundingMethod;
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 514);
minimumRange = roundingUnit * units;
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 515);
dataRangeGreater = (max - min) > minimumRange;
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 516);
minRound = this._roundDownToNearest(min, roundingUnit);
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 517);
maxRound = this._roundUpToNearest(max, roundingUnit);
                _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 518);
if(setMax)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 520);
min = max - minimumRange;
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 522);
if(setMin)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 524);
max = min + minimumRange;
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 526);
if(minGreaterThanZero && maxGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 528);
if(alwaysShowZero || minRound <= 0)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 530);
min = 0;
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 534);
min = minRound;
                    }
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 536);
max = min + minimumRange;
                }
                else {_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 538);
if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 540);
min = minRound;
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 541);
max = maxRound;
                }
                else
                {
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 545);
if(alwaysShowZero || maxRound >= 0)
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 547);
max = 0;
                    }
                    else
                    {
                        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 551);
max = maxRound;
                    }
                    _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 553);
min = max - minimumRange;
                }}}}
            }}}
        }
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 557);
this._dataMaximum = max;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 558);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundToNearest", 571);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 573);
nearest = nearest || 1;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 574);
var roundedNumber = Math.round(this._roundToPrecision(number / nearest, 10)) * nearest;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 575);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundUpToNearest", 588);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 590);
nearest = nearest || 1;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 591);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundDownToNearest", 604);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 606);
nearest = nearest || 1;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 607);
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
        _yuitest_coverfunc("build/axis-numeric-base/axis-numeric-base.js", "_roundToPrecision", 620);
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 622);
precision = precision || 0;
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 623);
var decimalPlaces = Math.pow(10, precision);
        _yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 624);
return Math.round(decimalPlaces * number) / decimalPlaces;
    }
};

_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 628);
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
_yuitest_coverline("build/axis-numeric-base/axis-numeric-base.js", 640);
Y.NumericAxisBase = Y.Base.create("numericAxisBase", Y.AxisBase, [Y.NumericImpl]);


}, '@VERSION@', {"requires": ["axis-base"]});
