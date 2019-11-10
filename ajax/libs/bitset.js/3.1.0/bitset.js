/**
 * @license BitSet.js v3.1.0 14/08/2015
 * http://www.xarg.org/2014/03/javascript-bit-array/
 *
 * Copyright (c) 2014, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

"use strict";

(function(root) {

    /**
     * @const
     * @type number
     */
    var bitsPerInt = 31;

    var P;

    /**
     * Divide a number in base two by B
     *
     * @param {Array} arr
     * @param {number} B
     * @returns {number}
     */
    function divide(arr, B) {

        var r = 0;
        var d, l = arr.length;

        for (var i = 0; i < l; i++) {
            r*= 2;
            d = (arr[i] + r) / B | 0;
            r = (arr[i] + r) % B;
            arr[i] = d;
        }
        return r;
    }

    /**
     * Check if the entire Array is empty
     *
     * @param {Array|Object} arr
     * @returns {boolean}
     */
    function zero(arr) {

        for (var i = arr.length; i--; ) {
            if (arr[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Parses the parameters and set variable P
     *
     * @param {String|BitSet|number=} p
     */
    function parse(p) {

        P = [];

        if (p === undefined) {
            return;
        }

        if (p instanceof BitSet) {
            copy(P, p);
            return;
        }

        switch (typeof p) {

            case 'number':
                P[0] = p;
                break;

            case 'string':

                var log = 1; // 2^log

                if (p.indexOf('0x') === 0) {
                    log = 4;
                    p = p.substr(2);
                } else if (p.indexOf('0b') === 0) {
                    p = p.substr(2);
                }

                for (var i = p.length; i--; ) {

                    var n = parseInt(p.charAt(i), 1 << log);

                    if (isNaN(n)) {
                        break;
                    }

                    for (var j = log; j--; ) {

                        var k = (p.length - i - 1) * log + j;
                        var slot = Math.floor(k / bitsPerInt);

                        if (!P[slot])
                            P[slot] = 0;

                        P[slot] |= (n >> j & 1) << (k % bitsPerInt);
                    }
                }
                break;

            default:
                throw 'Invalid param';
        }
    }

    /**
     * Copy one array to another
     *
     * @param {Array|Object} dst
     * @param {Array|Object} src
     */
    function copy(dst, src) {

        var len = Math.max(dst.length, src.length);

        for (var i = len; i--; ) {
            dst[i] = src[i] || 0;
        }
        dst.length = src.length;
    }

    /**
     * Module entry point
     *
     * @constructor
     * @param {String|BitSet|number=} p
     * @returns {BitSet}
     */
    function BitSet(p) {

        if (!(this instanceof BitSet)) {
            return new BitSet(p);
        }

        parse(p);
        copy(this, P);
    }

    BitSet.prototype['length'] = 0; // Allocated array length

    /**
     * Creates the bitwise AND of two sets. The result is stored in-place.
     *
     * Ex:
     * bs1 = new BitSet(10);
     * bs2 = new BitSet(10);
     *
     * bs1.and(bs2);
     *
     * @param {BitSet} p A bitset object
     * @returns {BitSet} this
     */
    BitSet.prototype['and'] = function(p) {

        var res = new BitSet;

        parse(p);

        res.length = this.length;

        for (var i = res.length; i--; ) {
            res[i] = this[i] & (P[i] || 0);
        }
        return res;
    };


    /**
     * Creates the bitwise OR of two sets. The result is stored in-place.
     *
     * Ex:
     * bs1 = new BitSet(10);
     * bs2 = new BitSet(10);
     *
     * bs1.or(bs2);
     *
     * @param {BitSet} p A bitset object
     * @returns {BitSet} this
     */
    BitSet.prototype['or'] = function(p) {

        var res = new BitSet;

        parse(p);

        res['length'] = Math.max(this['length'], P.length);

        for (var i = res['length']; i--; ) {
            res[i] = (this[i] || 0) | (P[i] || 0);
        }
        return res;
    };


    /**
     * Creates the bitwise NAND of two sets. The result is stored in-place.
     *
     * Ex:
     * bs1 = new BitSet(10);
     * bs2 = new BitSet(10);
     *
     * bs1.nand(bs2);
     *
     * @param {BitSet} p A bitset object
     * @returns {BitSet} this
     */
    BitSet.prototype['nand'] = function(p) {

        var res = new BitSet;

        parse(p);

        res['length'] = Math.max(this['length'], P.length);

        for (var i = res['length']; i--; ) {
            res[i] = ~((this[i] || 0) & (P[i] || 0));
        }
        return res;
    };


    /**
     * Creates the bitwise NOR of two sets. The result is stored in-place.
     *
     * Ex:
     * bs1 = new BitSet(10);
     * bs2 = new BitSet(10);
     *
     * bs1.or(bs2);
     *
     * @param {BitSet} p A bitset object
     * @returns {BitSet} this
     */
    BitSet.prototype['nor'] = function(p) {

        var res = new BitSet;

        parse(p);

        res['length'] = Math.max(this['length'], P.length);

        for (var i = res['length']; i--; ) {
            res[i] = ~((this[i] || 0) | (P[i] || 0));
        }
        return res;
    };


    /**
     * Creates the bitwise NOT of a set. The result is stored in-place.
     *
     * Ex:
     * bs1 = new BitSet(10);
     *
     * bs1.not();
     *
     * @returns {BitSet} this
     */
    BitSet.prototype['not'] = function() {

        var res = new BitSet;

        res['length'] = this['length'];

        for (var i = res['length']; i--; ) {
            res[i] = ~this[i];
        }
        return res;
    };

    /**
     * Creates the bitwise XOR of two sets. The result is stored in-place.
     *
     * Ex:
     * bs1 = new BitSet(10);
     * bs2 = new BitSet(10);
     *
     * bs1.xor(bs2);
     *
     * @param {BitSet} p A bitset object
     * @returns {BitSet} this
     */
    BitSet.prototype['xor'] = function(p) {

        var res = new BitSet;

        parse(p);

        res['length'] = Math.max(this['length'], P.length);

        for (var i = res['length']; i--; ) {

            res[i] = ((this[i] || 0) ^ (P[i] || 0));
        }
        return res;
    };


    /**
     * Compares two BitSet objects
     *
     * Ex:
     * bs1 = new BitSet(10);
     * bs2 = new BitSet(10);
     *
     * bs1.equals(bs2) ? 'yes' : 'no'
     *
     * @param {BitSet} p A bitset object
     * @returns {boolean} Whether the two BitSets are similar
     */
    BitSet.prototype['equals'] = function(p) {

        parse(p);

        var max = P;
        var min = this;

        if (this['length'] > P.length) {
            max = this;
            min = P;
        }

        for (var i = max.length; i--; ) {

            if (i < min.length) {
                if (max[i] !== min[i])
                    return false;
            } else if (max[i] !== 0) {
                return false;
            }
        }
        return true;
    };

    /**
     * Clones the actual object
     *
     * Ex:
     * bs1 = new BitSet(10);
     * bs2 = bs1.clone();
     *
     * @returns {BitSet} A new BitSet object, containing a copy of the actual object
     */
    BitSet.prototype['clone'] = function() {

        return new BitSet(this);
    };

    /**
     * Check if the BitSet is empty, means all bits are unset
     *
     * Ex:
     * bs1 = new BitSet(10);
     *
     * bs1.isEmpty() ? 'yes' : 'no'
     *
     * @returns {boolean} Whether the bitset is empty
     */
    BitSet.prototype['isEmpty'] = function() {

        return zero(this);
    };

    /**
     * Overrides the toString method to get a binary representation of the BitSet
     *
     * @returns string A binary string
     */
    BitSet.prototype['toString'] = function(base) {

        if (!base)
            base = 2;
        else if (2 > base || base > 36)
            throw "Invalid base";

        var ret = [];
        var arr = [];

        // Copy to a new array
        for (var i = this['length']; i--; ) {

            for (var j = bitsPerInt; j--; ) {

                arr.push(this[i] >> j & 1);
            }
        }

        do {
            ret.unshift(divide(arr, base).toString(base));
        } while (!zero(arr));

        return ret.join("");
    };

    /**
     * Calculates the number of bits set
     *
     * Ex:
     * bs1 = new BitSet(10);
     *
     * var num = bs1.cardinality();
     *
     * @returns {number} The number of bits set
     */
    BitSet.prototype['cardinality'] = function() {

        for (var n, num = 0, i = this['length']; i--; ) {

            for (n = this[i]; n; n &= n - 1, num++) {
            }
        }
        return num;
    };


    /**
     * Calculates the Most Significant Bit / log base two
     *
     * Ex:
     * bs1 = new BitSet(10);
     *
     * var logbase2 = bs1.msb();
     *
     * var truncatedTwo = Math.pow(2, logbase2); // May overflow!
     *
     * @returns {number} The index of the highest bit set
     */
    BitSet.prototype['msb'] = function() {

        for (var i = this['length']; i--; ) {

            var v = this[i];
            var c = 0;

            if (v) {

                for (; (v >>>= 1); c++) {

                }
                return bitsPerInt * i + c;
            }
        }
        return 0;
    };


    /**
     * Calculates the Least Significant Bit
     *
     * Ex:
     * bs1 = new BitSet(10);
     *
     * var lsb = bs1.lsb();
     *
     * @returns {number} The index of the lowest bit set
     */
    BitSet.prototype['lsb'] = function() {

        for (var j=0, i = this['length']; j < i; j++) {
            var v = this[j];
            var c = 0;

            if (v) {
                var bit = (v & -v);
                for (; (bit >>>= 1); c++) {

                }
                return bitsPerInt * j + c;
            }
        }
        return 0;
    };


    /**
     * Set a single bit flag
     *
     * Ex:
     * bs1 = new BitSet(10);
     *
     * bs1.set(3, 1);
     *
     * @param {number} ndx The index of the bit to be set
     * @param {number=} value Optional value that should be set on the index (0 or 1)
     * @returns {BitSet} this
     */
    BitSet.prototype['set'] = function(ndx, value) {

        var res = new BitSet;

        if (typeof ndx === "string") {

            parse(ndx);

            copy(res, P);

        } else {

            if (ndx < 0) {
                return null;
            }

            if (value === undefined) {
                value = 1;
            }

            var slot = Math.floor(ndx / bitsPerInt);

            res.length = Math.max(slot + 1, this['length']);

            for (var i = res.length; i--; ) {
                res[i] = this[i] || 0;
            }
            set(res, ndx, value);
        }
        return res;
    };

    /**
     * Set a range of bits
     *
     * Ex:
     * bs1 = new BitSet();
     *
     * bs1.setRange(0, 5, "01011");
     * bs1.setRange(10, 15, 1);
     *
     * @param {number} from The start index of the range to be set
     * @param {number} to The end index of the range to be set
     * @param {number|String=} value Optional value that should be set on the index (0 or 1), or a bit string of the length of the window
     * @returns {BitSet} this
     */
    BitSet.prototype['setRange'] = function(from, to, value) {

        if (0 <= from && from <= to) {

            var res = new BitSet(this);

            if (typeof value === "string") {

                var tmp = new BitSet(value);

                for (var i = from; i <= to; i++) {
                    set(res, i, tmp['get'](i - from));
                }

            } else {

                if (value === undefined) {
                    value = 1;
                }

                for (var i = from; i <= to; i++) {
                    set(res, i, value);
                }
            }
            return res;
        }
        return null;
    };

    function set(dest, ndx, value) {

        var slot = Math.floor(ndx / bitsPerInt);

        if (slot >= dest['length']) {

            // AUTO SCALE

            for (var i = dest['length']; i < slot; i++) {
                dest[i + 1] = 0;
            }
            dest['length'] = slot + 1;
        }
        dest[slot] ^= (1 << ndx % bitsPerInt) & (-(value & 1) ^ dest[slot]);
    }

    /**
     * Get a single bit flag of a certain bit position
     *
     * Ex:
     * bs1 = new BitSet();
     * var isValid = bs1.get(12);
     *
     * @param {number} ndx the index to be fetched
     * @returns {number|null} The binary flag
     */
    BitSet.prototype['get'] = function(ndx) {

        if (0 <= ndx && ndx < bitsPerInt * this['length']) {

            return (this[ndx / bitsPerInt | 0] >> (ndx % bitsPerInt)) & 1;
        }
        return 0;
    };

    /**
     * Gets an entire range as a new bitset object
     *
     * Ex:
     * bs1 = new BitSet();
     * bs1.getRange(4, 8);
     *
     * @param {number} from The start index of the range to be get
     * @param {number} to The end index of the range to be get
     * @returns {BitSet} A new smaller bitset object, containing the extracted range
     */
    BitSet.prototype['getRange'] = function(from, to) {

        if (from <= to && 0 <= from) {

            var res = new BitSet;

            for (var i = from; i <= to; i++) {
                set(res, i - from, this['get'](i));
            }
            return res;
        }
        return null;
    };

    /**
     * Clear a range of bits by setting it to 0
     *
     * Ex:
     * bs1 = new BitSet();
     * bs1.clear(); // Clear entire set
     * bs1.clear(5); // Clear single bit
     * bs1.clar(3,10); // Clear a bit range
     *
     * @param {number=} from The start index of the range to be cleared
     * @param {number=} to The end index of the range to be cleared
     * @returns {BitSet} this
     */
    BitSet.prototype['clear'] = function(from, to) {

        if (from === undefined) {

            return new BitSet;
        }

        if (to === undefined) {

            to = bitsPerInt * this['length'];
        }

        if (from > to) {
            return null;
        }

        var res = new BitSet(this);

        for (var i = from; i <= to; i++) {
            set(res, i, 0);
        }
        return res;
    };

    /**
     * Flip/Invert a range of bits by setting
     *
     * Ex:
     * bs1 = new BitSet();
     * bs1.flip(); // Flip entire set
     * bs1.flip(5); // Flip single bit
     * bs1.flip(3,10); // Flip a bit range
     *
     * @param {number=} from The start index of the range to be flipped
     * @param {number=} to The end index of the range to be flipped
     * @returns {BitSet} this
     */
    BitSet.prototype['flip'] = function(from, to) {

        var res = new BitSet;

        if (from === undefined) {

            res.length = this.length;

            // Flip all
            for (var i = res['length']; i--; ) {
                res[i] = ~this[i];
            }

        } else {

            if (to === undefined) {

                to = bitsPerInt * this['length'];
            }

            if (from < 0 || from > to) {
                return null;
            }
            
            copy(res, this);

            for (var i = from; i <= to; i++) {
                set(res, i, !this['get'](i));
            }
        }
        return res;
    };

    if (typeof define === 'function' && define['amd']) {
        define([], function() {
            return BitSet;
        });
    } else if (typeof exports === 'object') {
        module['exports'] = BitSet;
    } else {
        root['BitSet'] = BitSet;
    }

})(this);
