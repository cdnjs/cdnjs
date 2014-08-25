YUI.add('axis-numeric-base', function (Y, NAME) {

/**
 * Provides functionality for the handling of numeric axis data for a chart.
 *
 * @module charts
 * @submodule axis-numeric-base
 */

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
function NumericImpl()
{
}

NumericImpl.NAME = "numericImpl";

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

NumericImpl.prototype = {
    /**
     * @method initializer
     * @private
     */
    initializer: function() {
        this.after("alwaysShowZeroChange", this._keyChangeHandler);
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
        if(format)
        {
            return Y.DataType.Number.format(val, format);
        }
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
        var total = 0,
            values = this.getDataByKey(key),
            i = 0,
            val,
            len = values ? values.length : 0;
        for(; i < len; ++i)
        {
           val = parseFloat(values[i]);
           if(!isNaN(val))
           {
                total += val;
           }
        }
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
        var tempMajorUnit = roundingUnit,
            order = Math.ceil(Math.log(tempMajorUnit) * 0.4342944819032518),
            roundedMajorUnit = Math.pow(10, order),
            roundedDiff;

        if (roundedMajorUnit / 2 >= tempMajorUnit)
        {
            roundedDiff = Math.floor((roundedMajorUnit / 2 - tempMajorUnit) / (Math.pow(10,order-1)/2));
            tempMajorUnit = roundedMajorUnit/2 - roundedDiff*Math.pow(10,order-1)/2;
        }
        else
        {
            tempMajorUnit = roundedMajorUnit;
        }
        if(!isNaN(tempMajorUnit))
        {
            return tempMajorUnit;
        }
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
        var data = this.get("data"),
            max,
            min,
            len,
            num,
            i = 0,
            key,
            setMax = this.get("setMax"),
            setMin = this.get("setMin");
        if(!setMax || !setMin)
        {
            if(data && data.length && data.length > 0)
            {
                len = data.length;
                for(; i < len; i++)
                {
                    num = data[i];
                    if(isNaN(num))
                    {
                        max = setMax ? this._setMaximum : max;
                        min = setMin ? this._setMinimum : min;
                        continue;
                    }

                    if(setMin)
                    {
                        min = this._setMinimum;
                    }
                    else if(min === undefined)
                    {
                        min = num;
                    }
                    else
                    {
                        min = Math.min(num, min);
                    }
                    if(setMax)
                    {
                        max = this._setMaximum;
                    }
                    else if(max === undefined)
                    {
                        max = num;
                    }
                    else
                    {
                        max = Math.max(num, max);
                    }

                    this._actualMaximum = max;
                    this._actualMinimum = min;
                }
            }
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
        if(roundingMethod)
        {
            if(roundingMethod == "niceNumber")
            {
                roundingUnit = this._getMinimumUnit(max, min, units);
                if(minGreaterThanZero && maxGreaterThanZero)
                {
                    if((alwaysShowZero || min < roundingUnit) && !setMin)
                    {
                        min = 0;
                        roundingUnit = this._getMinimumUnit(max, min, units);
                    }
                    else
                    {
                       min = this._roundDownToNearest(min, roundingUnit);
                    }
                    if(setMax)
                    {
                        if(!alwaysShowZero)
                        {
                            min = max - (roundingUnit * units);
                        }
                    }
                    else if(setMin)
                    {
                        max = min + (roundingUnit * units);
                    }
                    else
                    {
                        max = this._roundUpToNearest(max, roundingUnit);
                    }
                }
                else if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    if(alwaysShowZero)
                    {
                        topTicks = Math.round(units/((-1 * min)/max + 1));
                        topTicks = Math.max(Math.min(topTicks, units - 1), 1);
                        botTicks = units - topTicks;
                        tempMax = Math.ceil( max/topTicks );
                        tempMin = Math.floor( min/botTicks ) * -1;

                        if(setMin)
                        {
                            while(tempMin < tempMax && botTicks >= 0)
                            {
                                botTicks--;
                                topTicks++;
                                tempMax = Math.ceil( max/topTicks );
                                tempMin = Math.floor( min/botTicks ) * -1;
                            }
                            //if there are any bottom ticks left calcualate the maximum by multiplying by the tempMin value
                            //if not, it's impossible to ensure that a zero is shown. skip it
                            if(botTicks > 0)
                            {
                                max = tempMin * topTicks;
                            }
                            else
                            {
                                max = min + (roundingUnit * units);
                            }
                        }
                        else if(setMax)
                        {
                            while(tempMax < tempMin && topTicks >= 0)
                            {
                                botTicks++;
                                topTicks--;
                                tempMin = Math.floor( min/botTicks ) * -1;
                                tempMax = Math.ceil( max/topTicks );
                            }
                            //if there are any top ticks left calcualate the minimum by multiplying by the tempMax value
                            //if not, it's impossible to ensure that a zero is shown. skip it
                            if(topTicks > 0)
                            {
                                min = tempMax * botTicks * -1;
                            }
                            else
                            {
                                min = max - (roundingUnit * units);
                            }
                        }
                        else
                        {
                            roundingUnit = Math.max(tempMax, tempMin);
                            roundingUnit = this._getNiceNumber(roundingUnit);
                            max = roundingUnit * topTicks;
                            min = roundingUnit * botTicks * -1;
                        }
                    }
                    else
                    {
                        if(setMax)
                        {
                            min = max - (roundingUnit * units);
                        }
                        else if(setMin)
                        {
                            max = min + (roundingUnit * units);
                        }
                        else
                        {
                            min = this._roundDownToNearest(min, roundingUnit);
                            max = this._roundUpToNearest(max, roundingUnit);
                        }
                    }
                }
                else
                {
                    if(setMin)
                    {
                        if(alwaysShowZero)
                        {
                            max = 0;
                        }
                        else
                        {
                            max = min + (roundingUnit * units);
                        }
                    }
                    else if(!setMax)
                    {
                        if(alwaysShowZero || max === 0 || max + roundingUnit > 0)
                        {
                            max = 0;
                            roundingUnit = this._getMinimumUnit(max, min, units);
                            min = max - (roundingUnit * units);
                        }
                        else
                        {
                            min = this._roundDownToNearest(min, roundingUnit);
                            max = this._roundUpToNearest(max, roundingUnit);
                        }
                    }
                    else
                    {
                        min = max - (roundingUnit * units);
                    }
                }
            }
            else if(roundingMethod == "auto")
            {
                if(minGreaterThanZero && maxGreaterThanZero)
                {
                    if((alwaysShowZero || min < (max-min)/units) && !setMin)
                    {
                        min = 0;
                    }

                    roundingUnit = (max - min)/units;
                    if(useIntegers)
                    {
                        roundingUnit = Math.ceil(roundingUnit);
                        max = min + (roundingUnit * units);
                    }
                    else
                    {
                        max = min + Math.ceil(roundingUnit * units * 100000)/100000;

                    }
                }
                else if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    if(alwaysShowZero)
                    {
                        topTicks = Math.round( units / ( (-1 * min) /max + 1) );
                        topTicks = Math.max(Math.min(topTicks, units - 1), 1);
                        botTicks = units - topTicks;

                        if(useIntegers)
                        {
                            tempMax = Math.ceil( max/topTicks );
                            tempMin = Math.floor( min/botTicks ) * -1;
                            roundingUnit = Math.max(tempMax, tempMin);
                            max = roundingUnit * topTicks;
                            min = roundingUnit * botTicks * -1;
                        }
                        else
                        {
                            tempMax = max/topTicks;
                            tempMin = min/botTicks * -1;
                            roundingUnit = Math.max(tempMax, tempMin);
                            max = Math.ceil(roundingUnit * topTicks * 100000)/100000;
                            min = Math.ceil(roundingUnit * botTicks * 100000)/100000 * -1;
                        }
                    }
                    else
                    {
                        roundingUnit = (max - min)/units;
                        if(useIntegers)
                        {
                            roundingUnit = Math.ceil(roundingUnit);
                        }
                        min = Math.round(this._roundDownToNearest(min, roundingUnit) * 100000)/100000;
                        max = Math.round(this._roundUpToNearest(max, roundingUnit) * 100000)/100000;
                    }
                }
                else
                {
                    roundingUnit = (max - min)/units;
                    if(useIntegers)
                    {
                        roundingUnit = Math.ceil(roundingUnit);
                    }
                    if(alwaysShowZero || max === 0 || max + roundingUnit > 0)
                    {
                        max = 0;
                        roundingUnit = (max - min)/units;
                        if(useIntegers)
                        {
                            Math.ceil(roundingUnit);
                            min = max - (roundingUnit * units);
                        }
                        else
                        {
                            min = max - Math.ceil(roundingUnit * units * 100000)/100000;
                        }
                    }
                    else
                    {
                        min = this._roundDownToNearest(min, roundingUnit);
                        max = this._roundUpToNearest(max, roundingUnit);
                    }

                }
            }
            else if(!isNaN(roundingMethod) && isFinite(roundingMethod))
            {
                roundingUnit = roundingMethod;
                minimumRange = roundingUnit * units;
                dataRangeGreater = (max - min) > minimumRange;
                minRound = this._roundDownToNearest(min, roundingUnit);
                maxRound = this._roundUpToNearest(max, roundingUnit);
                if(setMax)
                {
                    min = max - minimumRange;
                }
                else if(setMin)
                {
                    max = min + minimumRange;
                }
                else if(minGreaterThanZero && maxGreaterThanZero)
                {
                    if(alwaysShowZero || minRound <= 0)
                    {
                        min = 0;
                    }
                    else
                    {
                        min = minRound;
                    }
                    max = min + minimumRange;
                }
                else if(maxGreaterThanZero && !minGreaterThanZero)
                {
                    min = minRound;
                    max = maxRound;
                }
                else
                {
                    if(alwaysShowZero || maxRound >= 0)
                    {
                        max = 0;
                    }
                    else
                    {
                        max = maxRound;
                    }
                    min = max - minimumRange;
                }
            }
        }
        this._dataMaximum = max;
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
        nearest = nearest || 1;
        var roundedNumber = Math.round(this._roundToPrecision(number / nearest, 10)) * nearest;
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
        nearest = nearest || 1;
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
        nearest = nearest || 1;
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
        precision = precision || 0;
        var decimalPlaces = Math.pow(10, precision);
        return Math.round(decimalPlaces * number) / decimalPlaces;
    }
};

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
Y.NumericAxisBase = Y.Base.create("numericAxisBase", Y.AxisBase, [Y.NumericImpl]);


}, '@VERSION@', {"requires": ["axis-base"]});
