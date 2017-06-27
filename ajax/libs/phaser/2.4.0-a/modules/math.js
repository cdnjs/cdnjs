/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A collection of useful mathematical functions.
*
* These are normally accessed through `game.math`.
*
* @class Phaser.Math
* @static
* @see {@link Phaser.Utils}
* @see {@link Phaser.ArrayUtils}
*/
Phaser.Math = {

    /**
    * Twice PI.
    * @property {number} Phaser.Math#PI2
    * @default ~6.283
    */
    PI2: Math.PI * 2,

    /**
    * Two number are fuzzyEqual if their difference is less than epsilon.
    *
    * @method Phaser.Math#fuzzyEqual
    * @param {number} a
    * @param {number} b
    * @param {number} [epsilon=(small value)]
    * @return {boolean} True if |a-b|<epsilon
    */
    fuzzyEqual: function (a, b, epsilon) {
        if (epsilon === undefined) { epsilon = 0.0001; }
        return Math.abs(a - b) < epsilon;
    },

    /**
    * `a` is fuzzyLessThan `b` if it is less than b + epsilon.
    *
    * @method Phaser.Math#fuzzyLessThan
    * @param {number} a
    * @param {number} b
    * @param {number} [epsilon=(small value)]
    * @return {boolean} True if a<b+epsilon
    */
    fuzzyLessThan: function (a, b, epsilon) {
        if (epsilon === undefined) { epsilon = 0.0001; }
        return a < b + epsilon;
    },

    /**
    * `a` is fuzzyGreaterThan `b` if it is more than b - epsilon.
    *
    * @method Phaser.Math#fuzzyGreaterThan
    * @param {number} a
    * @param {number} b
    * @param {number} [epsilon=(small value)]
    * @return {boolean} True if a>b+epsilon
    */
    fuzzyGreaterThan: function (a, b, epsilon) {
        if (epsilon === undefined) { epsilon = 0.0001; }
        return a > b - epsilon;
    },

    /**
    * @method Phaser.Math#fuzzyCeil
    *
    * @param {number} val
    * @param {number} [epsilon=(small value)]
    * @return {boolean} ceiling(val-epsilon)
    */
    fuzzyCeil: function (val, epsilon) {
        if (epsilon === undefined) { epsilon = 0.0001; }
        return Math.ceil(val - epsilon);
    },

    /**
    * @method Phaser.Math#fuzzyFloor
    *
    * @param {number} val
    * @param {number} [epsilon=(small value)]
    * @return {boolean} floor(val-epsilon)
    */
    fuzzyFloor: function (val, epsilon) {
        if (epsilon === undefined) { epsilon = 0.0001; }
        return Math.floor(val + epsilon);
    },

    /**
    * Averages all values passed to the function and returns the result.
    *
    * @method Phaser.Math#average
    * @params {...number} The numbers to average
    * @return {number} The average of all given values.
    */
    average: function () {

        var sum = 0;

        for (var i = 0; i < arguments.length; i++) {
            sum += (+arguments[i]);
        }

        return sum / arguments.length;

    },

    /**
    * @method Phaser.Math#shear
    * @param {number} n
    * @return {number} n mod 1
    */
    shear: function (n) {
        return n % 1;
    },

    /**
    * Snap a value to nearest grid slice, using rounding.
    *
    * Example: if you have an interval gap of 5 and a position of 12... you will snap to 10 whereas 14 will snap to 15.
    *
    * @method Phaser.Math#snapTo
    * @param {number} input - The value to snap.
    * @param {number} gap - The interval gap of the grid.
    * @param {number} [start] - Optional starting offset for gap.
    * @return {number}
    */
    snapTo: function (input, gap, start) {

        if (start === undefined) { start = 0; }

        if (gap === 0) {
            return input;
        }

        input -= start;
        input = gap * Math.round(input / gap);

        return start + input;

    },

    /**
    * Snap a value to nearest grid slice, using floor.
    *
    * Example: if you have an interval gap of 5 and a position of 12... you will snap to 10. 
    * As will 14 snap to 10... but 16 will snap to 15.
    *
    * @method Phaser.Math#snapToFloor
    * @param {number} input - The value to snap.
    * @param {number} gap - The interval gap of the grid.
    * @param {number} [start] - Optional starting offset for gap.
    * @return {number}
    */
    snapToFloor: function (input, gap, start) {

        if (start === undefined) { start = 0; }

        if (gap === 0) {
            return input;
        }

        input -= start;
        input = gap * Math.floor(input / gap);

        return start + input;

    },

    /**
    * Snap a value to nearest grid slice, using ceil.
    *
    * Example: if you have an interval gap of 5 and a position of 12... you will snap to 15.
    * As will 14 will snap to 15... but 16 will snap to 20.
    *
    * @method Phaser.Math#snapToCeil
    * @param {number} input - The value to snap.
    * @param {number} gap - The interval gap of the grid.
    * @param {number} [start] - Optional starting offset for gap.
    * @return {number}
    */
    snapToCeil: function (input, gap, start) {

        if (start === undefined) { start = 0; }

        if (gap === 0) {
            return input;
        }

        input -= start;
        input = gap * Math.ceil(input / gap);

        return start + input;

    },

    /**
    * Round to some place comparative to a `base`, default is 10 for decimal place.
    * The `place` is represented by the power applied to `base` to get that place.
    *
    *     e.g. 2000/7 ~= 285.714285714285714285714 ~= (bin)100011101.1011011011011011
    *
    *     roundTo(2000/7,3) === 0
    *     roundTo(2000/7,2) == 300
    *     roundTo(2000/7,1) == 290
    *     roundTo(2000/7,0) == 286
    *     roundTo(2000/7,-1) == 285.7
    *     roundTo(2000/7,-2) == 285.71
    *     roundTo(2000/7,-3) == 285.714
    *     roundTo(2000/7,-4) == 285.7143
    *     roundTo(2000/7,-5) == 285.71429
    *
    *     roundTo(2000/7,3,2)  == 288       -- 100100000
    *     roundTo(2000/7,2,2)  == 284       -- 100011100
    *     roundTo(2000/7,1,2)  == 286       -- 100011110
    *     roundTo(2000/7,0,2)  == 286       -- 100011110
    *     roundTo(2000/7,-1,2) == 285.5     -- 100011101.1
    *     roundTo(2000/7,-2,2) == 285.75    -- 100011101.11
    *     roundTo(2000/7,-3,2) == 285.75    -- 100011101.11
    *     roundTo(2000/7,-4,2) == 285.6875  -- 100011101.1011
    *     roundTo(2000/7,-5,2) == 285.71875 -- 100011101.10111
    *
    * Note what occurs when we round to the 3rd space (8ths place), 100100000, this is to be assumed
    * because we are rounding 100011.1011011011011011 which rounds up.
    *
    * @method Phaser.Math#roundTo
    * @param {number} value - The value to round.
    * @param {number} place - The place to round to.
    * @param {number} base - The base to round in... default is 10 for decimal.
    * @return {number}
    */
    roundTo: function (value, place, base) {

        if (place === undefined) { place = 0; }
        if (base === undefined) { base = 10; }

        var p = Math.pow(base, -place);

        return Math.round(value * p) / p;

    },

    /**
    * @method Phaser.Math#floorTo
    * @param {number} value - The value to round.
    * @param {number} place - The place to round to.
    * @param {number} base - The base to round in... default is 10 for decimal.
    * @return {number}
    */
    floorTo: function (value, place, base) {

        if (place === undefined) { place = 0; }
        if (base === undefined) { base = 10; }

        var p = Math.pow(base, -place);

        return Math.floor(value * p) / p;

    },

    /**
    * @method Phaser.Math#ceilTo
    * @param {number} value - The value to round.
    * @param {number} place - The place to round to.
    * @param {number} base - The base to round in... default is 10 for decimal.
    * @return {number}
    */
    ceilTo: function (value, place, base) {

        if (place === undefined) { place = 0; }
        if (base === undefined) { base = 10; }

        var p = Math.pow(base, -place);

        return Math.ceil(value * p) / p;

    },

    /**
    * Find the angle of a segment from (x1, y1) -> (x2, y2).
    * @method Phaser.Math#angleBetween
    * @param {number} x1
    * @param {number} y1
    * @param {number} x2
    * @param {number} y2
    * @return {number} The angle, in radians.
    */
    angleBetween: function (x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    },

    /**
    * Find the angle of a segment from (x1, y1) -> (x2, y2).
    * Note that the difference between this method and Math.angleBetween is that this assumes the y coordinate travels
    * down the screen.
    *
    * @method Phaser.Math#angleBetweenY
    * @param {number} x1
    * @param {number} y1
    * @param {number} x2
    * @param {number} y2
    * @return {number} The angle, in radians.
    */
    angleBetweenY: function (x1, y1, x2, y2) {
        return Math.atan2(x2 - x1, y2 - y1);
    },

    /**
    * Find the angle of a segment from (point1.x, point1.y) -> (point2.x, point2.y).
    * @method Phaser.Math#angleBetweenPoints
    * @param {Phaser.Point} point1
    * @param {Phaser.Point} point2
    * @return {number} The angle, in radians.
    */
    angleBetweenPoints: function (point1, point2) {
        return Math.atan2(point2.y - point1.y, point2.x - point1.x);
    },

    /**
    * Find the angle of a segment from (point1.x, point1.y) -> (point2.x, point2.y).
    * @method Phaser.Math#angleBetweenPointsY
    * @param {Phaser.Point} point1
    * @param {Phaser.Point} point2
    * @return {number} The angle, in radians.
    */
    angleBetweenPointsY: function (point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    },

    /**
    * Reverses an angle.
    * @method Phaser.Math#reverseAngle
    * @param {number} angleRad - The angle to reverse, in radians.
    * @return {number} Returns the reverse angle, in radians.
    */
    reverseAngle: function (angleRad) {
        return this.normalizeAngle(angleRad + Math.PI, true);
    },

    /**
    * Normalizes an angle to the [0,2pi) range.
    * @method Phaser.Math#normalizeAngle
    * @param {number} angleRad - The angle to normalize, in radians.
    * @return {number} Returns the angle, fit within the [0,2pi] range, in radians.
    */
    normalizeAngle: function (angleRad) {

        angleRad = angleRad % (2 * Math.PI);
        return angleRad >= 0 ? angleRad : angleRad + 2 * Math.PI;

    },

    /**
    * Adds the given amount to the value, but never lets the value go over the specified maximum.
    *
    * @method Phaser.Math#maxAdd
    * @param {number} value - The value to add the amount to.
    * @param {number} amount - The amount to add to the value.
    * @param {number} max - The maximum the value is allowed to be.
    * @return {number}
    */
    maxAdd: function (value, amount, max) {
        return Math.min(value + amount, max);
    },

    /**
    * Subtracts the given amount from the value, but never lets the value go below the specified minimum.
    *
    * @method Phaser.Math#minSub
    * @param {number} value - The base value.
    * @param {number} amount - The amount to subtract from the base value.
    * @param {number} min - The minimum the value is allowed to be.
    * @return {number} The new value.
    */
    minSub: function (value, amount, min) {
        return Math.max(value - amount, min);
    },

    /**
    * Ensures that the value always stays between min and max, by wrapping the value around.
    *
    * If `max` is not larger than `min` the result is 0.
    *
    * @method Phaser.Math#wrap
    * @param {number} value - The value to wrap.
    * @param {number} min - The minimum the value is allowed to be.
    * @param {number} max - The maximum the value is allowed to be, should be larger than `min`.
    * @return {number} The wrapped value.
    */
    wrap: function (value, min, max) {

        var range = max - min;

        if (range <= 0)
        {
            return 0;
        }

        var result = (value - min) % range;

        if (result < 0)
        {
            result += range;
        }

        return result + min;

    },

    /**
    * Adds value to amount and ensures that the result always stays between 0 and max, by wrapping the value around.
    *
    * Values _must_ be positive integers, and are passed through Math.abs. See {@link Phaser.Math#wrap} for an alternative.
    *
    * @method Phaser.Math#wrapValue
    * @param {number} value - The value to add the amount to.
    * @param {number} amount - The amount to add to the value.
    * @param {number} max - The maximum the value is allowed to be.
    * @return {number} The wrapped value.
    */
    wrapValue: function (value, amount, max) {

        var diff;
        value = Math.abs(value);
        amount = Math.abs(amount);
        max = Math.abs(max);
        diff = (value + amount) % max;

        return diff;

    },

    /**
    * Returns true if the number given is odd.
    *
    * @method Phaser.Math#isOdd
    * @param {integer} n - The number to check.
    * @return {boolean} True if the given number is odd. False if the given number is even.
    */
    isOdd: function (n) {
        // Does not work with extremely large values
        return !!(n & 1);
    },

    /**
    * Returns true if the number given is even.
    *
    * @method Phaser.Math#isEven
    * @param {integer} n - The number to check.
    * @return {boolean} True if the given number is even. False if the given number is odd.
    */
    isEven: function (n) {
        // Does not work with extremely large values
        return !(n & 1);
    },

    /**
    * Variation of Math.min that can be passed either an array of numbers or the numbers as parameters.
    *
    * Prefer the standard `Math.min` function when appropriate.
    *
    * @method Phaser.Math#min
    * @return {number} The lowest value from those given.
    * @see {@link http://jsperf.com/math-s-min-max-vs-homemade}
    */
    min: function () {

        if (arguments.length === 1 && typeof arguments[0] === 'object')
        {
            var data = arguments[0];
        }
        else
        {
            var data = arguments;
        }

        for (var i = 1, min = 0, len = data.length; i < len; i++)
        {
            if (data[i] < data[min])
            {
                min = i;
            }
        }

        return data[min];

    },

    /**
    * Variation of Math.max that can be passed either an array of numbers or the numbers as parameters.
    *
    * Prefer the standard `Math.max` function when appropriate.
    *
    * @method Phaser.Math#max
    * @return {number} The largest value from those given.
    * @see {@link http://jsperf.com/math-s-min-max-vs-homemade}
    */
    max: function () {

        if (arguments.length === 1 && typeof arguments[0] === 'object')
        {
            var data = arguments[0];
        }
        else
        {
            var data = arguments;
        }

        for (var i = 1, max = 0, len = data.length; i < len; i++)
        {
            if (data[i] > data[max])
            {
                max = i;
            }
        }

        return data[max];

    },

    /**
    * Variation of Math.min that can be passed a property and either an array of objects or the objects as parameters.
    * It will find the lowest matching property value from the given objects.
    *
    * @method Phaser.Math#minProperty
    * @return {number} The lowest value from those given.
    */
    minProperty: function (property) {

        if (arguments.length === 2 && typeof arguments[1] === 'object')
        {
            var data = arguments[1];
        }
        else
        {
            var data = arguments.slice(1);
        }

        for (var i = 1, min = 0, len = data.length; i < len; i++)
        {
            if (data[i][property] < data[min][property])
            {
                min = i;
            }
        }

        return data[min][property];

    },

    /**
    * Variation of Math.max that can be passed a property and either an array of objects or the objects as parameters.
    * It will find the largest matching property value from the given objects.
    *
    * @method Phaser.Math#maxProperty
    * @return {number} The largest value from those given.
    */
    maxProperty: function (property) {

        if (arguments.length === 2 && typeof arguments[1] === 'object')
        {
            var data = arguments[1];
        }
        else
        {
            var data = arguments.slice(1);
        }

        for (var i = 1, max = 0, len = data.length; i < len; i++)
        {
            if (data[i][property] > data[max][property])
            {
                max = i;
            }
        }

        return data[max][property];

    },

    /**
    * Keeps an angle value between -180 and +180; or -PI and PI if radians.
    *
    * @method Phaser.Math#wrapAngle
    * @param {number} angle - The angle value to wrap
    * @param {boolean} [radians=false] - Set to `true` if the angle is given in radians, otherwise degrees is expected.
    * @return {number} The new angle value; will be the same as the input angle if it was within bounds.
    */
    wrapAngle: function (angle, radians) {

        return radians ? this.wrap(angle, -Math.PI, Math.PI) : this.wrap(angle, -180, 180);

    },

    /**
    * A Linear Interpolation Method, mostly used by Phaser.Tween.
    *
    * @method Phaser.Math#linearInterpolation
    * @param {Array} v - The input array of values to interpolate between.
    * @param {number} k - The percentage of interpolation, between 0 and 1.
    * @return {number} The interpolated value
    */
    linearInterpolation: function (v, k) {

        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);

        if (k < 0)
        {
            return this.linear(v[0], v[1], f);
        }

        if (k > 1)
        {
            return this.linear(v[m], v[m - 1], m - f);
        }

        return this.linear(v[i], v[i + 1 > m ? m : i + 1], f - i);

    },

    /**
    * A Bezier Interpolation Method, mostly used by Phaser.Tween.
    *
    * @method Phaser.Math#bezierInterpolation
    * @param {Array} v - The input array of values to interpolate between.
    * @param {number} k - The percentage of interpolation, between 0 and 1.
    * @return {number} The interpolated value
    */
    bezierInterpolation: function (v, k) {

        var b = 0;
        var n = v.length - 1;

        for (var i = 0; i <= n; i++)
        {
            b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * this.bernstein(n, i);
        }

        return b;

    },

    /**
    * A Catmull Rom Interpolation Method, mostly used by Phaser.Tween.
    *
    * @method Phaser.Math#catmullRomInterpolation
    * @param {Array} v - The input array of values to interpolate between.
    * @param {number} k - The percentage of interpolation, between 0 and 1.
    * @return {number} The interpolated value
    */
    catmullRomInterpolation: function (v, k) {

        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);

        if (v[0] === v[m])
        {
            if (k < 0)
            {
                i = Math.floor(f = m * (1 + k));
            }

            return this.catmullRom(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        }
        else
        {
            if (k < 0)
            {
                return v[0] - (this.catmullRom(v[0], v[0], v[1], v[1], -f) - v[0]);
            }

            if (k > 1)
            {
                return v[m] - (this.catmullRom(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
            }

            return this.catmullRom(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        }

    },

    /**
    * Calculates a linear (interpolation) value over t.
    *
    * @method Phaser.Math#linear
    * @param {number} p0
    * @param {number} p1
    * @param {number} t
    * @return {number}
    */
    linear: function (p0, p1, t) {
        return (p1 - p0) * t + p0;
    },

    /**
    * @method Phaser.Math#bernstein
    * @protected
    * @param {number} n
    * @param {number} i
    * @return {number}
    */
    bernstein: function (n, i) {
        return this.factorial(n) / this.factorial(i) / this.factorial(n - i);
    },

    /**
    * @method Phaser.Math#factorial
    * @param {number} value - the number you want to evaluate
    * @return {number}
    */
    factorial : function( value ){

        if (value === 0)
        {
            return 1;
        }

        var res = value;

        while(--value)
        {
            res *= value;
        }

        return res;

    },

    /**
    * Calculates a catmum rom value.
    *
    * @method Phaser.Math#catmullRom
    * @protected
    * @param {number} p0
    * @param {number} p1
    * @param {number} p2
    * @param {number} p3
    * @param {number} t
    * @return {number}
    */
    catmullRom: function (p0, p1, p2, p3, t) {

        var v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;

        return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

    },

    /**
    * The (absolute) difference between two values.
    *
    * @method Phaser.Math#difference
    * @param {number} a
    * @param {number} b
    * @return {number}
    */
    difference: function (a, b) {
        return Math.abs(a - b);
    },

    /**
    * Round to the next whole number _away_ from zero.
    *
    * @method Phaser.Math#roundAwayFromZero
    * @param {number} value - Any number.
    * @return {integer} The rounded value of that number.
    */
    roundAwayFromZero: function (value) {

        // "Opposite" of truncate.
        return (value > 0) ? Math.ceil(value) : Math.floor(value);

    },

    /**
    * Generate a sine and cosine table simultaneously and extremely quickly.
    * The parameters allow you to specify the length, amplitude and frequency of the wave.
    * This generator is fast enough to be used in real-time.
    * Code based on research by Franky of scene.at
    *
    * @method Phaser.Math#sinCosGenerator
    * @param {number} length - The length of the wave
    * @param {number} sinAmplitude - The amplitude to apply to the sine table (default 1.0) if you need values between say -+ 125 then give 125 as the value
    * @param {number} cosAmplitude - The amplitude to apply to the cosine table (default 1.0) if you need values between say -+ 125 then give 125 as the value
    * @param {number} frequency  - The frequency of the sine and cosine table data
    * @return {{sin:number[], cos:number[]}} Returns the table data.
    */
    sinCosGenerator: function (length, sinAmplitude, cosAmplitude, frequency) {

        if (sinAmplitude === undefined) { sinAmplitude = 1.0; }
        if (cosAmplitude === undefined) { cosAmplitude = 1.0; }
        if (frequency === undefined) { frequency = 1.0; }

        var sin = sinAmplitude;
        var cos = cosAmplitude;
        var frq = frequency * Math.PI / length;

        var cosTable = [];
        var sinTable = [];

        for (var c = 0; c < length; c++) {

            cos -= sin * frq;
            sin += cos * frq;

            cosTable[c] = cos;
            sinTable[c] = sin;

        }

        return { sin: sinTable, cos: cosTable, length: length };

    },

    /**
    * Returns the euclidian distance between the two given set of coordinates.
    *
    * @method Phaser.Math#distance
    * @param {number} x1
    * @param {number} y1
    * @param {number} x2
    * @param {number} y2
    * @return {number} The distance between the two sets of coordinates.
    */
    distance: function (x1, y1, x2, y2) {

        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);

    },

    /**
    * Returns the euclidean distance squared between the two given set of
    * coordinates (cuts out a square root operation before returning).
    *
    * @method Phaser.Math#distanceSq
    * @param {number} x1
    * @param {number} y1
    * @param {number} x2
    * @param {number} y2
    * @return {number} The distance squared between the two sets of coordinates.
    */
    distanceSq: function (x1, y1, x2, y2) {

        var dx = x1 - x2;
        var dy = y1 - y2;

        return dx * dx + dy * dy;

    },

    /**
    * Returns the distance between the two given set of coordinates at the power given.
    *
    * @method Phaser.Math#distancePow
    * @param {number} x1
    * @param {number} y1
    * @param {number} x2
    * @param {number} y2
    * @param {number} [pow=2]
    * @return {number} The distance between the two sets of coordinates.
    */
    distancePow: function (x1, y1, x2, y2, pow) {

        if (pow === undefined) { pow = 2; }

        return Math.sqrt(Math.pow(x2 - x1, pow) + Math.pow(y2 - y1, pow));

    },

    /**
    * Force a value within the boundaries by clamping `x` to the range `[a, b]`.
    *
    * @method Phaser.Math#clamp
    * @param {number} x
    * @param {number} a
    * @param {number} b
    * @return {number}
    */
    clamp: function (x, a, b) {
        return ( x < a ) ? a : ( ( x > b ) ? b : x );
    },

    /**
    * Clamp `x` to the range `[a, Infinity)`.
    * Roughly the same as `Math.max(x, a)`, except for NaN handling.
    *
    * @method Phaser.Math#clampBottom
    * @param {number} x
    * @param {number} a
    * @return {number}
    */
    clampBottom: function (x, a) {
        return x < a ? a : x;
    },

    /**
    * Checks if two values are within the given tolerance of each other.
    *
    * @method Phaser.Math#within
    * @param {number} a - The first number to check
    * @param {number} b - The second number to check
    * @param {number} tolerance - The tolerance. Anything equal to or less than this is considered within the range.
    * @return {boolean} True if a is <= tolerance of b.
    * @see {@link Phaser.Math.fuzzyEqual}
    */
    within: function (a, b, tolerance) {
        return (Math.abs(a - b) <= tolerance);
    },

    /**
    * Linear mapping from range <a1, a2> to range <b1, b2>
    *
    * @method Phaser.Math#mapLinear
    * @param {number} x the value to map
    * @param {number} a1 first endpoint of the range <a1, a2>
    * @param {number} a2 final endpoint of the range <a1, a2>
    * @param {number} b1 first endpoint of the range <b1, b2>
    * @param {number} b2 final endpoint of the range  <b1, b2>
    * @return {number}
    */
    mapLinear: function (x, a1, a2, b1, b2) {
        return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );
    },

    /**
    * Smoothstep function as detailed at http://en.wikipedia.org/wiki/Smoothstep
    *
    * @method Phaser.Math#smoothstep
    * @param {number} x
    * @param {number} min
    * @param {number} max
    * @return {number}
    */
    smoothstep: function (x, min, max) {
        x = Math.max(0, Math.min(1, (x - min) / (max - min)));
        return x * x * (3 - 2 * x);
    },

    /**
    * Smootherstep function as detailed at http://en.wikipedia.org/wiki/Smoothstep
    *
    * @method Phaser.Math#smootherstep
    * @param {number} x
    * @param {number} min
    * @param {number} max
    * @return {number}
    */
    smootherstep: function (x, min, max) {
        x = Math.max(0, Math.min(1, (x - min) / (max - min)));
        return x * x * x * (x * (x * 6 - 15) + 10);
    },

    /**
    * A value representing the sign of the value: -1 for negative, +1 for positive, 0 if value is 0.
    *
    * This works differently from `Math.sign` for values of NaN and -0, etc.
    *
    * @method Phaser.Math#sign
    * @param {number} x
    * @return {integer} An integer in {-1, 0, 1}
    */
    sign: function (x) {
        return ( x < 0 ) ? -1 : ( ( x > 0 ) ? 1 : 0 );
    },

    /**
    * Work out what percentage value `a` is of value `b` using the given base.
    *
    * @method Phaser.Math#percent
    * @param {number} a - The value to work out the percentage for.
    * @param {number} b - The value you wish to get the percentage of.
    * @param {number} [base=0] - The base value.
    * @return {number} The percentage a is of b, between 0 and 1.
    */
    percent: function (a, b, base) {

        if (base === undefined) { base = 0; }

        if (a > b || base > b)
        {
            return 1;
        }
        else if (a < base || base > a)
        {
            return 0;
        }
        else
        {
            return (a - base) / b;
        }

    }

};

var degreeToRadiansFactor = Math.PI / 180;
var radianToDegreesFactor = 180 / Math.PI;

/**
* Convert degrees to radians.
*
* @method Phaser.Math#degToRad
* @param {number} degrees - Angle in degrees.
* @return {number} Angle in radians.
*/
Phaser.Math.degToRad = function degToRad (degrees) {
    return degrees * degreeToRadiansFactor;
};

/**
* Convert degrees to radians.
*
* @method Phaser.Math#radToDeg
* @param {number} radians - Angle in radians.
* @return {number} Angle in degrees
*/
Phaser.Math.radToDeg = function radToDeg (radians) {
    return radians * radianToDegreesFactor;
};

/* jshint noempty: false */

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* An extremely useful repeatable random data generator.
*
* Based on Nonsense by Josh Faul https://github.com/jocafa/Nonsense.
*
* The random number genererator is based on the Alea PRNG, but is modified.
*  - https://github.com/coverslide/node-alea
*  - https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
*  - http://baagoe.org/en/wiki/Better_random_numbers_for_javascript (original, perm. 404)
*
* @class Phaser.RandomDataGenerator
* @constructor
* @param {any[]} [seeds] - An array of values to use as the seed.
*/
Phaser.RandomDataGenerator = function (seeds) {

    if (seeds === undefined) { seeds = []; }

    /**
    * @property {number} c - Internal var.
    * @private
    */
    this.c = 1;

    /**
    * @property {number} s0 - Internal var.
    * @private
    */
    this.s0 = 0;

    /**
    * @property {number} s1 - Internal var.
    * @private
    */
    this.s1 = 0;

    /**
    * @property {number} s2 - Internal var.
    * @private
    */
    this.s2 = 0;

    this.sow(seeds);

};

Phaser.RandomDataGenerator.prototype = {

    /**
    * Private random helper.
    *
    * @method Phaser.RandomDataGenerator#rnd
    * @private
    * @return {number}
    */
    rnd: function () {

        var t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32

        this.c = t | 0;
        this.s0 = this.s1;
        this.s1 = this.s2;
        this.s2 = t - this.c;

        return this.s2;
    },

    /**
    * Reset the seed of the random data generator.
    *
    * _Note_: the seed array is only processed up to the first `undefined` (or `null`) value, should such be present.
    *
    * @method Phaser.RandomDataGenerator#sow
    * @param {any[]} seeds - The array of seeds: the `toString()` of each value is used.
    */
    sow: function (seeds) {

        // Always reset to default seed
        this.s0 = this.hash(' ');
        this.s1 = this.hash(this.s0);
        this.s2 = this.hash(this.s1);
        this.c = 1;

        if (!seeds)
        {
            return;
        }

        // Apply any seeds
        for (var i = 0; i < seeds.length && (seeds[i] != null); i++)
        {
            var seed = seeds[i];

            this.s0 -= this.hash(seed);
            this.s0 += ~~(this.s0 < 0);
            this.s1 -= this.hash(seed);
            this.s1 += ~~(this.s1 < 0);
            this.s2 -= this.hash(seed);
            this.s2 += ~~(this.s2 < 0);
        }

    },

    /**
    * Internal method that creates a seed hash.
    *
    * @method Phaser.RandomDataGenerator#hash
    * @private
    * @param {any} data
    * @return {number} hashed value.
    */
    hash: function (data) {

        var h, i, n;
        n = 0xefc8249d;
        data = data.toString();

        for (i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000;// 2^32
        }

        return (n >>> 0) * 2.3283064365386963e-10;// 2^-32

    },

    /**
    * Returns a random integer between 0 and 2^32.
    *
    * @method Phaser.RandomDataGenerator#integer
    * @return {number} A random integer between 0 and 2^32.
    */
    integer: function() {

        return this.rnd.apply(this) * 0x100000000;// 2^32

    },

    /**
    * Returns a random real number between 0 and 1.
    *
    * @method Phaser.RandomDataGenerator#frac
    * @return {number} A random real number between 0 and 1.
    */
    frac: function() {

        return this.rnd.apply(this) + (this.rnd.apply(this) * 0x200000 | 0) * 1.1102230246251565e-16;   // 2^-53

    },

    /**
    * Returns a random real number between 0 and 2^32.
    *
    * @method Phaser.RandomDataGenerator#real
    * @return {number} A random real number between 0 and 2^32.
    */
    real: function() {

        return this.integer() + this.frac();

    },

    /**
    * Returns a random integer between and including min and max.
    *
    * @method Phaser.RandomDataGenerator#integerInRange
    * @param {number} min - The minimum value in the range.
    * @param {number} max - The maximum value in the range.
    * @return {number} A random number between min and max.
    */
    integerInRange: function (min, max) {

        return Math.floor(this.realInRange(0, max - min + 1) + min);

    },

    /**
    * Returns a random integer between and including min and max.
    * This method is an alias for RandomDataGenerator.integerInRange.
    *
    * @method Phaser.RandomDataGenerator#between
    * @param {number} min - The minimum value in the range.
    * @param {number} max - The maximum value in the range.
    * @return {number} A random number between min and max.
    */
    between: function (min, max) {

        return this.integerInRange(min, max);

    },

    /**
    * Returns a random real number between min and max.
    *
    * @method Phaser.RandomDataGenerator#realInRange
    * @param {number} min - The minimum value in the range.
    * @param {number} max - The maximum value in the range.
    * @return {number} A random number between min and max.
    */
    realInRange: function (min, max) {

        return this.frac() * (max - min) + min;

    },

    /**
    * Returns a random real number between -1 and 1.
    *
    * @method Phaser.RandomDataGenerator#normal
    * @return {number} A random real number between -1 and 1.
    */
    normal: function () {

        return 1 - 2 * this.frac();

    },

    /**
    * Returns a valid RFC4122 version4 ID hex string from https://gist.github.com/1308368
    *
    * @method Phaser.RandomDataGenerator#uuid
    * @return {string} A valid RFC4122 version4 ID hex string
    */
    uuid: function () {

        var a = '';
        var b = '';

        for (b = a = ''; a++ < 36; b +=~a % 5 | a * 3&4 ? (a^15 ? 8^this.frac() * (a^20 ? 16 : 4) : 4).toString(16) : '-')
        {
        }

        return b;

    },

    /**
    * Returns a random member of `array`.
    *
    * @method Phaser.RandomDataGenerator#pick
    * @param {Array} ary - An Array to pick a random member of.
    * @return {any} A random member of the array.
    */
    pick: function (ary) {

        return ary[this.integerInRange(0, ary.length - 1)];

    },

    /**
    * Returns a random member of `array`, favoring the earlier entries.
    *
    * @method Phaser.RandomDataGenerator#weightedPick
    * @param {Array} ary - An Array to pick a random member of.
    * @return {any} A random member of the array.
    */
    weightedPick: function (ary) {

        return ary[~~(Math.pow(this.frac(), 2) * (ary.length - 1) + 0.5)];

    },

    /**
    * Returns a random timestamp between min and max, or between the beginning of 2000 and the end of 2020 if min and max aren't specified.
    *
    * @method Phaser.RandomDataGenerator#timestamp
    * @param {number} min - The minimum value in the range.
    * @param {number} max - The maximum value in the range.
    * @return {number} A random timestamp between min and max.
    */
    timestamp: function (min, max) {

        return this.realInRange(min || 946684800000, max || 1577862000000);

    },

    /**
    * Returns a random angle between -180 and 180.
    *
    * @method Phaser.RandomDataGenerator#angle
    * @return {number} A random number between -180 and 180.
    */
    angle: function() {

        return this.integerInRange(-180, 180);

    }

};

Phaser.RandomDataGenerator.prototype.constructor = Phaser.RandomDataGenerator;

/**
 * @author       Timo Hausmann
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
* A QuadTree implementation. The original code was a conversion of the Java code posted to GameDevTuts.
* However I've tweaked it massively to add node indexing, removed lots of temp. var creation and significantly increased performance as a result.
* Original version at https://github.com/timohausmann/quadtree-js/
*
* @class Phaser.QuadTree
* @constructor
* @param {number} x - The top left coordinate of the quadtree.
* @param {number} y - The top left coordinate of the quadtree.
* @param {number} width - The width of the quadtree in pixels.
* @param {number} height - The height of the quadtree in pixels.
* @param {number} [maxObjects=10] - The maximum number of objects per node.
* @param {number} [maxLevels=4] - The maximum number of levels to iterate to.
* @param {number} [level=0] - Which level is this?
*/
Phaser.QuadTree = function(x, y, width, height, maxObjects, maxLevels, level) {

    /**
    * @property {number} maxObjects - The maximum number of objects per node.
    * @default
    */
    this.maxObjects = 10;

    /**
    * @property {number} maxLevels - The maximum number of levels to break down to.
    * @default
    */
    this.maxLevels = 4;

    /**
    * @property {number} level - The current level.
    */
    this.level = 0;

    /**
    * @property {object} bounds - Object that contains the quadtree bounds.
    */
    this.bounds = {};

    /**
    * @property {array} objects - Array of quadtree children.
    */
    this.objects = [];

    /**
    * @property {array} nodes - Array of associated child nodes.
    */
    this.nodes = [];

    /**
    * @property {array} _empty - Internal empty array.
    * @private
    */
    this._empty = [];

    this.reset(x, y, width, height, maxObjects, maxLevels, level);

};

Phaser.QuadTree.prototype = {

    /**
    * Resets the QuadTree.
    *
    * @method Phaser.QuadTree#reset
    * @param {number} x - The top left coordinate of the quadtree.
    * @param {number} y - The top left coordinate of the quadtree.
    * @param {number} width - The width of the quadtree in pixels.
    * @param {number} height - The height of the quadtree in pixels.
    * @param {number} [maxObjects=10] - The maximum number of objects per node.
    * @param {number} [maxLevels=4] - The maximum number of levels to iterate to.
    * @param {number} [level=0] - Which level is this?
    */
    reset: function (x, y, width, height, maxObjects, maxLevels, level) {

        this.maxObjects = maxObjects || 10;
        this.maxLevels = maxLevels || 4;
        this.level = level || 0;

        this.bounds = {
            x: Math.round(x),
            y: Math.round(y),
            width: width,
            height: height,
            subWidth: Math.floor(width / 2),
            subHeight: Math.floor(height / 2),
            right: Math.round(x) + Math.floor(width / 2),
            bottom: Math.round(y) + Math.floor(height / 2)
        };

        this.objects.length = 0;
        this.nodes.length = 0;

    },

    /**
    * Populates this quadtree with the children of the given Group. In order to be added the child must exist and have a body property.
    *
    * @method Phaser.QuadTree#populate
    * @param {Phaser.Group} group - The Group to add to the quadtree.
    */
    populate: function (group) {

        group.forEach(this.populateHandler, this, true);

    },

    /**
    * Handler for the populate method.
    *
    * @method Phaser.QuadTree#populateHandler
    * @param {Phaser.Sprite|object} sprite - The Sprite to check.
    */
    populateHandler: function (sprite) {

        if (sprite.body && sprite.exists)
        {
            this.insert(sprite.body);
        }

    },

    /**
    * Split the node into 4 subnodes
    *
    * @method Phaser.QuadTree#split
    */
    split: function () {

        //  top right node
        this.nodes[0] = new Phaser.QuadTree(this.bounds.right, this.bounds.y, this.bounds.subWidth, this.bounds.subHeight, this.maxObjects, this.maxLevels, (this.level + 1));

        //  top left node
        this.nodes[1] = new Phaser.QuadTree(this.bounds.x, this.bounds.y, this.bounds.subWidth, this.bounds.subHeight, this.maxObjects, this.maxLevels, (this.level + 1));

        //  bottom left node
        this.nodes[2] = new Phaser.QuadTree(this.bounds.x, this.bounds.bottom, this.bounds.subWidth, this.bounds.subHeight, this.maxObjects, this.maxLevels, (this.level + 1));

        //  bottom right node
        this.nodes[3] = new Phaser.QuadTree(this.bounds.right, this.bounds.bottom, this.bounds.subWidth, this.bounds.subHeight, this.maxObjects, this.maxLevels, (this.level + 1));

    },

    /**
    * Insert the object into the node. If the node exceeds the capacity, it will split and add all objects to their corresponding subnodes.
    *
    * @method Phaser.QuadTree#insert
    * @param {Phaser.Physics.Arcade.Body|object} body - The Body object to insert into the quadtree. Can be any object so long as it exposes x, y, right and bottom properties.
    */
    insert: function (body) {

        var i = 0;
        var index;

        //  if we have subnodes ...
        if (this.nodes[0] != null)
        {
            index = this.getIndex(body);

            if (index !== -1)
            {
                this.nodes[index].insert(body);
                return;
            }
        }

        this.objects.push(body);

        if (this.objects.length > this.maxObjects && this.level < this.maxLevels)
        {
            //  Split if we don't already have subnodes
            if (this.nodes[0] == null)
            {
                this.split();
            }

            //  Add objects to subnodes
            while (i < this.objects.length)
            {
                index = this.getIndex(this.objects[i]);

                if (index !== -1)
                {
                    //  this is expensive - see what we can do about it
                    this.nodes[index].insert(this.objects.splice(i, 1)[0]);
                }
                else
                {
                    i++;
                }
            }
        }

    },

    /**
    * Determine which node the object belongs to.
    *
    * @method Phaser.QuadTree#getIndex
    * @param {Phaser.Rectangle|object} rect - The bounds in which to check.
    * @return {number} index - Index of the subnode (0-3), or -1 if rect cannot completely fit within a subnode and is part of the parent node.
    */
    getIndex: function (rect) {

        //  default is that rect doesn't fit, i.e. it straddles the internal quadrants
        var index = -1;

        if (rect.x < this.bounds.right && rect.right < this.bounds.right)
        {
            if (rect.y < this.bounds.bottom && rect.bottom < this.bounds.bottom)
            {
                //  rect fits within the top-left quadrant of this quadtree
                index = 1;
            }
            else if (rect.y > this.bounds.bottom)
            {
                //  rect fits within the bottom-left quadrant of this quadtree
                index = 2;
            }
        }
        else if (rect.x > this.bounds.right)
        {
            //  rect can completely fit within the right quadrants
            if (rect.y < this.bounds.bottom && rect.bottom < this.bounds.bottom)
            {
                //  rect fits within the top-right quadrant of this quadtree
                index = 0;
            }
            else if (rect.y > this.bounds.bottom)
            {
                //  rect fits within the bottom-right quadrant of this quadtree
                index = 3;
            }
        }

        return index;

    },

    /**
    * Return all objects that could collide with the given Sprite or Rectangle.
    *
    * @method Phaser.QuadTree#retrieve
    * @param {Phaser.Sprite|Phaser.Rectangle} source - The source object to check the QuadTree against. Either a Sprite or Rectangle.
    * @return {array} - Array with all detected objects.
    */
    retrieve: function (source) {

        if (source instanceof Phaser.Rectangle)
        {
            var returnObjects = this.objects;

            var index = this.getIndex(source);
        }
        else
        {
            if (!source.body)
            {
                return this._empty;
            }

            var returnObjects = this.objects;

            var index = this.getIndex(source.body);
        }

        if (this.nodes[0])
        {
            //  If rect fits into a subnode ..
            if (index !== -1)
            {
                returnObjects = returnObjects.concat(this.nodes[index].retrieve(source));
            }
            else
            {
                //  If rect does not fit into a subnode, check it against all subnodes (unrolled for speed)
                returnObjects = returnObjects.concat(this.nodes[0].retrieve(source));
                returnObjects = returnObjects.concat(this.nodes[1].retrieve(source));
                returnObjects = returnObjects.concat(this.nodes[2].retrieve(source));
                returnObjects = returnObjects.concat(this.nodes[3].retrieve(source));
            }
        }

        return returnObjects;

    },

    /**
    * Clear the quadtree.
    * @method Phaser.QuadTree#clear
    */
    clear: function () {

        this.objects.length = 0;

        var i = this.nodes.length;

        while (i--)
        {
            this.nodes[i].clear();
            this.nodes.splice(i, 1);
        }

        this.nodes.length = 0;
    }

};

Phaser.QuadTree.prototype.constructor = Phaser.QuadTree;

/**
* Javascript QuadTree
* @version 1.0
*
* @version 1.3, March 11th 2014
* @author Richard Davey
* The original code was a conversion of the Java code posted to GameDevTuts. However I've tweaked
* it massively to add node indexing, removed lots of temp. var creation and significantly
* increased performance as a result.
*
* Original version at https://github.com/timohausmann/quadtree-js/
*/

/**
* @copyright © 2012 Timo Hausmann
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
