/**
 * @class Ext.Number
 *
 * A collection of useful static methods to deal with numbers
 * @singleton
 */
Ext.Number = new function() {
// @define Ext.lang.Number
// @define Ext.Number
// @require Ext
    var ExtNumber = this,
        isToFixedBroken = (0.9).toFixed() !== '1',
        math = Math,
        ClipDefault = {
            count: false,
            inclusive: false,
            wrap: true
        };

    Ext.apply(ExtNumber, {
        Clip: {
            DEFAULT: ClipDefault,

            COUNT: Ext.applyIf({
                    count: true
                }, ClipDefault),

            INCLUSIVE: Ext.applyIf({
                    inclusive: true
                }, ClipDefault),

            NOWRAP: Ext.applyIf({
                    wrap: false
                }, ClipDefault)
        },

        /**
         * Coerces a given index into a valid index given a `length`.
         *
         * Negative indexes are interpreted starting at the end of the collection. That is,
         * a value of -1 indicates the last item, or equivalent to `length - 1`.
         *
         * When handling methods that take "begin" and "end" arguments like most array or
         * string methods, this method can be used like so:
         *
         *      function foo (array, begin, end) {
         *          var range = Ext.Number.clipIndices(array.length, [begin, end]);
         *
         *          begin = range[0];
         *          end   = range[1];
         *
         *          // 0 <= begin <= end <= array.length
         *
         *          var length = end - begin;
         *      }
         *
         * For example:
         *
         *      +---+---+---+---+---+---+---+---+
         *      |   |   |   |   |   |   |   |   |  length = 8
         *      +---+---+---+---+---+---+---+---+
         *        0   1   2   3   4   5   6   7
         *       -8  -7  -6  -5  -4  -3  -2  -1
         *
         *      console.log(Ext.Number.clipIndices(8, [3, 10]); // logs "[3, 8]"
         *      console.log(Ext.Number.clipIndices(8, [-5]);    // logs "[3, 8]"
         *      console.log(Ext.Number.clipIndices(8, []);
         *      console.log(Ext.Number.clipIndices(8, []);
         *
         * @param {Number} length
         * @param {Number[]} indices
         * @param {Object} [options] An object with different option flags.
         * @param {Boolean} [options.count=false] The second number in `indices` is the
         * count not and an index.
         * @param {Boolean} [options.inclusive=false] The second number in `indices` is
         * "inclusive" meaning that the item should be considered in the range. Normally,
         * the second number is considered the first item outside the range or as an
         * "exclusive" bound.
         * @param {Boolean} [options.wrap=true] Wraps negative numbers backwards from the
         * end of the array. Passing `false` simply clips negative index values at 0.
         * @returns {Number[]} The normalized `[begin, end]` array where `end` is now
         * exclusive such that `length = end - begin`. Both values are between 0 and the
         * given `length` and `end` will not be less-than `begin`.
         */
        clipIndices: function (length, indices, options) {
            options = options || ClipDefault;

            var defaultValue = 0, // default value for "begin"
                wrap = options.wrap,
                begin, end, i;

            indices = indices || [];
            for (i = 0; i < 2; ++i) {
                // names are off on first pass but used this way so things make sense
                // following the loop..
                begin = end;  // pick up and keep the result from the first loop
                end = indices[i];
                if (end == null) {
                    end = defaultValue;
                } else if (i && options.count) {
                    end += begin; // this is the length not "end" so convert to "end"
                    end = (end > length) ? length : end;
                } else {
                    if (wrap) {
                        end = (end < 0) ? (length + end) : end;
                    }
                    if (i && options.inclusive) {
                        ++end;
                    }
                    end = (end < 0) ? 0 : ((end > length) ? length : end);
                }
                defaultValue = length; // default value for "end"
            }

            // after loop:
            // 0 <= begin <= length  (calculated from indices[0])
            // 0 <= end <= length    (calculated from indices[1])

            indices[0] = begin;
            indices[1] = (end < begin) ? begin : end;
            return indices;
        },

        /**
         * Checks whether or not the passed number is within a desired range.  If the number is already within the
         * range it is returned, otherwise the min or max value is returned depending on which side of the range is
         * exceeded. Note that this method returns the constrained value but does not change the current number.
         * @param {Number} number The number to check
         * @param {Number} min The minimum number in the range
         * @param {Number} max The maximum number in the range
         * @return {Number} The constrained value if outside the range, otherwise the current value
         */
        constrain: function(number, min, max) {
            var x = parseFloat(number);

            // Watch out for NaN in Chrome 18
            // V8bug: http://code.google.com/p/v8/issues/detail?id=2056

            // Operators are faster than Math.min/max. See http://jsperf.com/number-constrain
            // ... and (x < Nan) || (x < undefined) == false
            // ... same for (x > NaN) || (x > undefined)
            // so if min or max are undefined or NaN, we never return them... sadly, this
            // is not true of null (but even Math.max(-1,null)==0 and isNaN(null)==false)
            return (x < min) ? min : ((x > max) ? max : x);
        },

        /**
         * Snaps the passed number between stopping points based upon a passed increment value.
         *
         * The difference between this and {@link #snapInRange} is that {@link #snapInRange} uses the minValue
         * when calculating snap points:
         *
         *     r = Ext.Number.snap(56, 2, 55, 65);        // Returns 56 - snap points are zero based
         *
         *     r = Ext.Number.snapInRange(56, 2, 55, 65); // Returns 57 - snap points are based from minValue
         *
         * @param {Number} value The unsnapped value.
         * @param {Number} increment The increment by which the value must move.
         * @param {Number} minValue The minimum value to which the returned value must be constrained. Overrides the increment.
         * @param {Number} maxValue The maximum value to which the returned value must be constrained. Overrides the increment.
         * @return {Number} The value of the nearest snap target.
         */
        snap : function(value, increment, minValue, maxValue) {
            var m;

            // If no value passed, or minValue was passed and value is less than minValue (anything < undefined is false)
            // Then use the minValue (or zero if the value was undefined)
            if (value === undefined || value < minValue) {
                return minValue || 0;
            }

            if (increment) {
                m = value % increment;
                if (m !== 0) {
                    value -= m;
                    if (m * 2 >= increment) {
                        value += increment;
                    } else if (m * 2 < -increment) {
                        value -= increment;
                    }
                }
            }
            return ExtNumber.constrain(value, minValue,  maxValue);
        },

        /**
         * Snaps the passed number between stopping points based upon a passed increment value.
         *
         * The difference between this and {@link #snap} is that {@link #snap} does not use the minValue
         * when calculating snap points:
         *
         *     r = Ext.Number.snap(56, 2, 55, 65);        // Returns 56 - snap points are zero based
         *
         *     r = Ext.Number.snapInRange(56, 2, 55, 65); // Returns 57 - snap points are based from minValue
         *
         * @param {Number} value The unsnapped value.
         * @param {Number} increment The increment by which the value must move.
         * @param {Number} [minValue=0] The minimum value to which the returned value must be constrained.
         * @param {Number} [maxValue=Infinity] The maximum value to which the returned value must be constrained.
         * @return {Number} The value of the nearest snap target.
         */
        snapInRange : function(value, increment, minValue, maxValue) {
            var tween;

            // default minValue to zero
            minValue = (minValue || 0);

            // If value is undefined, or less than minValue, use minValue
            if (value === undefined || value < minValue) {
                return minValue;
            }

            // Calculate how many snap points from the minValue the passed value is.
            if (increment && (tween = ((value - minValue) % increment))) {
                value -= tween;
                tween *= 2;
                if (tween >= increment) {
                    value += increment;
                }
            }

            // If constraining within a maximum, ensure the maximum is on a snap point
            if (maxValue !== undefined) {
                if (value > (maxValue = ExtNumber.snapInRange(maxValue, increment, minValue))) {
                    value = maxValue;
                }
            }

            return value;
        },

        /**
         * Formats a number using fixed-point notation
         * @param {Number} value The number to format
         * @param {Number} precision The number of digits to show after the decimal point
         */
        toFixed: isToFixedBroken ? function(value, precision) {
            precision = precision || 0;
            var pow = math.pow(10, precision);
            return (math.round(value * pow) / pow).toFixed(precision);
        } : function(value, precision) {
            return value.toFixed(precision);
        },

        /**
         * Validate that a value is numeric and convert it to a number if necessary. Returns the specified default value if
         * it is not.

    Ext.Number.from('1.23', 1); // returns 1.23
    Ext.Number.from('abc', 1); // returns 1

         * @param {Object} value
         * @param {Number} defaultValue The value to return if the original value is non-numeric
         * @return {Number} value, if numeric, defaultValue otherwise
         */
        from: function(value, defaultValue) {
            if (isFinite(value)) {
                value = parseFloat(value);
            }

            return !isNaN(value) ? value : defaultValue;
        },

        /**
         * Returns a random integer between the specified range (inclusive)
         * @param {Number} from Lowest value to return.
         * @param {Number} to Highst value to return.
         * @return {Number} A random integer within the specified range.
         */
        randomInt: function (from, to) {
           return math.floor(math.random() * (to - from + 1) + from);
        },
        
        /**
         * Corrects floating point numbers that overflow to a non-precise
         * value because of their floating nature, for example `0.1 + 0.2`
         * @param {Number} The number
         * @return {Number} The correctly rounded number
         */
        correctFloat: function(n) {
            // This is to correct the type of errors where 2 floats end with
            // a long string of decimals, eg 0.1 + 0.2. When they overflow in this
            // manner, they usually go to 15-16 decimals, so we cut it off at 14.
            return parseFloat(n.toPrecision(14));
        }
    });

    /**
     * @deprecated 4.0.0 Please use {@link Ext.Number#from} instead.
     * @member Ext
     * @method num
     * @inheritdoc Ext.Number#from
     */
    Ext.num = function() {
        return ExtNumber.from.apply(this, arguments);
    };
};
