/**
 * Planck.js v1.0.0-beta.16
 * @license The MIT license
 * @copyright Copyright (c) 2021 Erin Catto, Ali Shakiba
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.planck = {}));
})(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /** @internal */
    var options = function (input, defaults) {
        if (input === null || typeof input === 'undefined') {
            // tslint:disable-next-line:no-object-literal-type-assertion
            input = {};
        }
        var output = __assign({}, input);
        // tslint:disable-next-line:no-for-in
        for (var key in defaults) {
            if (defaults.hasOwnProperty(key) && typeof input[key] === 'undefined') {
                output[key] = defaults[key];
            }
        }
        if (typeof Object.getOwnPropertySymbols === 'function') {
            var symbols = Object.getOwnPropertySymbols(defaults);
            for (var i = 0; i < symbols.length; i++) {
                var symbol = symbols[i];
                if (defaults.propertyIsEnumerable(symbol) && typeof input[symbol] === 'undefined') {
                    output[symbol] = defaults[symbol];
                }
            }
        }
        return output;
    };

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_random = Math.random;
    var EPSILON = 1e-9;
    /** @internal @deprecated */
    var isFinite = Number.isFinite;
    /**
     * @deprecated
     * Next Largest Power of 2 Given a binary integer value x, the next largest
     * power of 2 can be computed by a SWAR algorithm that recursively "folds" the
     * upper bits into the lower bits. This process yields a bit vector with the
     * same most significant 1 as x, but all 1's below it. Adding 1 to that value
     * yields the next largest power of 2. For a 32-bit value:
     */
    function nextPowerOfTwo(x) {
        x |= (x >> 1);
        x |= (x >> 2);
        x |= (x >> 4);
        x |= (x >> 8);
        x |= (x >> 16);
        return x + 1;
    }
    /** @deprecated */
    function isPowerOfTwo(x) {
        return x > 0 && (x & (x - 1)) === 0;
    }
    /** @deprecated */
    function mod(num, min, max) {
        if (typeof min === 'undefined') {
            max = 1;
            min = 0;
        }
        else if (typeof max === 'undefined') {
            max = min;
            min = 0;
        }
        if (max > min) {
            num = (num - min) % (max - min);
            return num + (num < 0 ? max : min);
        }
        else {
            num = (num - max) % (min - max);
            return num + (num <= 0 ? min : max);
        }
    }
    /**
     * @deprecated
     * Returns a min if num is less than min, and max if more than max, otherwise returns num.
     */
    function clamp(num, min, max) {
        if (num < min) {
            return min;
        }
        else if (num > max) {
            return max;
        }
        else {
            return num;
        }
    }
    /**
     * @deprecated
     * Returns a random number between min and max when two arguments are provided.
     * If one arg is provided between 0 to max.
     * If one arg is passed between 0 to 1.
     */
    function random(min, max) {
        if (typeof min === 'undefined') {
            max = 1;
            min = 0;
        }
        else if (typeof max === 'undefined') {
            max = min;
            min = 0;
        }
        return min === max ? min : math_random() * (max - min) + min;
    }
    /** @ignore */
    var math = Object.create(Math);
    math.EPSILON = EPSILON;
    math.isFinite = isFinite;
    math.nextPowerOfTwo = nextPowerOfTwo;
    math.isPowerOfTwo = isPowerOfTwo;
    math.mod = mod;
    math.clamp = clamp;
    math.random = random;

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_abs$9 = Math.abs;
    /** @internal */ var math_sqrt$5 = Math.sqrt;
    /** @internal */ var math_max$8 = Math.max;
    /** @internal */ var math_min$8 = Math.min;
    var Vec2 = /** @class */ (function () {
        // tslint:disable-next-line:typedef
        function Vec2(x, y) {
            if (!(this instanceof Vec2)) {
                return new Vec2(x, y);
            }
            if (typeof x === 'undefined') {
                this.x = 0;
                this.y = 0;
            }
            else if (typeof x === 'object') {
                this.x = x.x;
                this.y = x.y;
            }
            else {
                this.x = x;
                this.y = y;
            }
        }
        /** @internal */
        Vec2.prototype._serialize = function () {
            return {
                x: this.x,
                y: this.y
            };
        };
        /** @internal */
        Vec2._deserialize = function (data) {
            var obj = Object.create(Vec2.prototype);
            obj.x = data.x;
            obj.y = data.y;
            return obj;
        };
        Vec2.zero = function () {
            var obj = Object.create(Vec2.prototype);
            obj.x = 0;
            obj.y = 0;
            return obj;
        };
        /** @internal */
        Vec2.neo = function (x, y) {
            var obj = Object.create(Vec2.prototype);
            obj.x = x;
            obj.y = y;
            return obj;
        };
        Vec2.clone = function (v) {
            return Vec2.neo(v.x, v.y);
        };
        /** @internal */
        Vec2.prototype.toString = function () {
            return JSON.stringify(this);
        };
        /**
         * Does this vector contain finite coordinates?
         */
        Vec2.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return Number.isFinite(obj.x) && Number.isFinite(obj.y);
        };
        Vec2.assert = function (o) {
        };
        Vec2.prototype.clone = function () {
            return Vec2.clone(this);
        };
        /**
         * Set this vector to all zeros.
         *
         * @returns this
         */
        Vec2.prototype.setZero = function () {
            this.x = 0.0;
            this.y = 0.0;
            return this;
        };
        /**
         * Set this vector to some specified coordinates.
         *
         * @returns this
         */
        // tslint:disable-next-line:typedef
        Vec2.prototype.set = function (x, y) {
            if (typeof x === 'object') {
                this.x = x.x;
                this.y = x.y;
            }
            else {
                this.x = x;
                this.y = y;
            }
            return this;
        };
        /**
         * Set this vector to some specified coordinates.
         *
         * @returns this
         */
        Vec2.prototype.setNum = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        /**
         * Set this vector to some specified coordinates.
         *
         * @returns this
         */
        Vec2.prototype.setVec2 = function (value) {
            this.x = value.x;
            this.y = value.y;
            return this;
        };
        /** @internal @deprecated Use setCombine or setMul */
        Vec2.prototype.wSet = function (a, v, b, w) {
            if (typeof b !== 'undefined' || typeof w !== 'undefined') {
                return this.setCombine(a, v, b, w);
            }
            else {
                return this.setMul(a, v);
            }
        };
        /**
         * Set linear combination of v and w: `a * v + b * w`
         */
        Vec2.prototype.setCombine = function (a, v, b, w) {
            var x = a * v.x + b * w.x;
            var y = a * v.y + b * w.y;
            // `this` may be `w`
            this.x = x;
            this.y = y;
            return this;
        };
        Vec2.prototype.setMul = function (a, v) {
            var x = a * v.x;
            var y = a * v.y;
            this.x = x;
            this.y = y;
            return this;
        };
        /**
         * Add a vector to this vector.
         *
         * @returns this
         */
        Vec2.prototype.add = function (w) {
            this.x += w.x;
            this.y += w.y;
            return this;
        };
        /** @internal @deprecated Use addCombine or addMul */
        Vec2.prototype.wAdd = function (a, v, b, w) {
            if (typeof b !== 'undefined' || typeof w !== 'undefined') {
                return this.addCombine(a, v, b, w);
            }
            else {
                return this.addMul(a, v);
            }
        };
        /**
         * Add linear combination of v and w: `a * v + b * w`
         */
        Vec2.prototype.addCombine = function (a, v, b, w) {
            var x = a * v.x + b * w.x;
            var y = a * v.y + b * w.y;
            // `this` may be `w`
            this.x += x;
            this.y += y;
            return this;
        };
        Vec2.prototype.addMul = function (a, v) {
            var x = a * v.x;
            var y = a * v.y;
            this.x += x;
            this.y += y;
            return this;
        };
        /**
         * @deprecated Use subCombine or subMul
         */
        Vec2.prototype.wSub = function (a, v, b, w) {
            if (typeof b !== 'undefined' || typeof w !== 'undefined') {
                return this.subCombine(a, v, b, w);
            }
            else {
                return this.subMul(a, v);
            }
        };
        /**
         * Subtract linear combination of v and w: `a * v + b * w`
         */
        Vec2.prototype.subCombine = function (a, v, b, w) {
            var x = a * v.x + b * w.x;
            var y = a * v.y + b * w.y;
            // `this` may be `w`
            this.x -= x;
            this.y -= y;
            return this;
        };
        Vec2.prototype.subMul = function (a, v) {
            var x = a * v.x;
            var y = a * v.y;
            this.x -= x;
            this.y -= y;
            return this;
        };
        /**
         * Subtract a vector from this vector
         *
         * @returns this
         */
        Vec2.prototype.sub = function (w) {
            this.x -= w.x;
            this.y -= w.y;
            return this;
        };
        /**
         * Multiply this vector by a scalar.
         *
         * @returns this
         */
        Vec2.prototype.mul = function (m) {
            this.x *= m;
            this.y *= m;
            return this;
        };
        /**
         * Get the length of this vector (the norm).
         *
         * For performance, use this instead of lengthSquared (if possible).
         */
        Vec2.prototype.length = function () {
            return Vec2.lengthOf(this);
        };
        /**
         * Get the length squared.
         */
        Vec2.prototype.lengthSquared = function () {
            return Vec2.lengthSquared(this);
        };
        /**
         * Convert this vector into a unit vector.
         *
         * @returns old length
         */
        Vec2.prototype.normalize = function () {
            var length = this.length();
            if (length < EPSILON) {
                return 0.0;
            }
            var invLength = 1.0 / length;
            this.x *= invLength;
            this.y *= invLength;
            return length;
        };
        /**
         * Get the length of this vector (the norm).
         *
         * For performance, use this instead of lengthSquared (if possible).
         */
        Vec2.lengthOf = function (v) {
            return math_sqrt$5(v.x * v.x + v.y * v.y);
        };
        /**
         * Get the length squared.
         */
        Vec2.lengthSquared = function (v) {
            return v.x * v.x + v.y * v.y;
        };
        Vec2.distance = function (v, w) {
            var dx = v.x - w.x;
            var dy = v.y - w.y;
            return math_sqrt$5(dx * dx + dy * dy);
        };
        Vec2.distanceSquared = function (v, w) {
            var dx = v.x - w.x;
            var dy = v.y - w.y;
            return dx * dx + dy * dy;
        };
        Vec2.areEqual = function (v, w) {
            return v === w || typeof w === 'object' && w !== null && v.x === w.x && v.y === w.y;
        };
        /**
         * Get the skew vector such that dot(skew_vec, other) == cross(vec, other)
         */
        Vec2.skew = function (v) {
            return Vec2.neo(-v.y, v.x);
        };
        /** Dot product on two vectors */
        Vec2.dot = function (v, w) {
            return v.x * w.x + v.y * w.y;
        };
        Vec2.cross = function (v, w) {
            if (typeof w === 'number') {
                return Vec2.neo(w * v.y, -w * v.x);
            }
            else if (typeof v === 'number') {
                return Vec2.neo(-v * w.y, v * w.x);
            }
            else {
                return v.x * w.y - v.y * w.x;
            }
        };
        /** Cross product on two vectors */
        Vec2.crossVec2Vec2 = function (v, w) {
            return v.x * w.y - v.y * w.x;
        };
        /** Cross product on a vector and a scalar */
        Vec2.crossVec2Num = function (v, w) {
            return Vec2.neo(w * v.y, -w * v.x);
        };
        /** Cross product on a vector and a scalar */
        Vec2.crossNumVec2 = function (v, w) {
            return Vec2.neo(-v * w.y, v * w.x);
        };
        Vec2.addCross = function (a, v, w) {
            if (typeof w === 'number') {
                return Vec2.neo(w * v.y + a.x, -w * v.x + a.y);
            }
            else if (typeof v === 'number') {
                return Vec2.neo(-v * w.y + a.x, v * w.x + a.y);
            }
        };
        /**
         * Returns `a + (v x w)`
         */
        Vec2.addCrossVec2Num = function (a, v, w) {
            return Vec2.neo(w * v.y + a.x, -w * v.x + a.y);
        };
        /**
         * Returns `a + (v x w)`
         */
        Vec2.addCrossNumVec2 = function (a, v, w) {
            return Vec2.neo(-v * w.y + a.x, v * w.x + a.y);
        };
        Vec2.add = function (v, w) {
            return Vec2.neo(v.x + w.x, v.y + w.y);
        };
        /** @internal @deprecated */
        Vec2.wAdd = function (a, v, b, w) {
            if (typeof b !== 'undefined' || typeof w !== 'undefined') {
                return Vec2.combine(a, v, b, w);
            }
            else {
                return Vec2.mulNumVec2(a, v);
            }
        };
        Vec2.combine = function (a, v, b, w) {
            return Vec2.zero().setCombine(a, v, b, w);
        };
        Vec2.sub = function (v, w) {
            return Vec2.neo(v.x - w.x, v.y - w.y);
        };
        Vec2.mul = function (a, b) {
            if (typeof a === 'object') {
                return Vec2.neo(a.x * b, a.y * b);
            }
            else if (typeof b === 'object') {
                return Vec2.neo(a * b.x, a * b.y);
            }
        };
        Vec2.mulVec2Num = function (a, b) {
            return Vec2.neo(a.x * b, a.y * b);
        };
        Vec2.mulNumVec2 = function (a, b) {
            return Vec2.neo(a * b.x, a * b.y);
        };
        Vec2.prototype.neg = function () {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        };
        Vec2.neg = function (v) {
            return Vec2.neo(-v.x, -v.y);
        };
        Vec2.abs = function (v) {
            return Vec2.neo(math_abs$9(v.x), math_abs$9(v.y));
        };
        Vec2.mid = function (v, w) {
            return Vec2.neo((v.x + w.x) * 0.5, (v.y + w.y) * 0.5);
        };
        Vec2.upper = function (v, w) {
            return Vec2.neo(math_max$8(v.x, w.x), math_max$8(v.y, w.y));
        };
        Vec2.lower = function (v, w) {
            return Vec2.neo(math_min$8(v.x, w.x), math_min$8(v.y, w.y));
        };
        Vec2.prototype.clamp = function (max) {
            var lengthSqr = this.x * this.x + this.y * this.y;
            if (lengthSqr > max * max) {
                var scale = max / math_sqrt$5(lengthSqr);
                this.x *= scale;
                this.y *= scale;
            }
            return this;
        };
        Vec2.clamp = function (v, max) {
            var r = Vec2.neo(v.x, v.y);
            r.clamp(max);
            return r;
        };
        /**  @internal @deprecated */
        Vec2.scaleFn = function (x, y) {
            // todo: this was used in examples, remove in the future
            return function (v) {
                return Vec2.neo(v.x * x, v.y * y);
            };
        };
        /**  @internal @deprecated */
        Vec2.translateFn = function (x, y) {
            // todo: this was used in examples, remove in the future
            return function (v) {
                return Vec2.neo(v.x + x, v.y + y);
            };
        };
        return Vec2;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_max$7 = Math.max;
    /** @internal */ var math_min$7 = Math.min;
    var AABB = /** @class */ (function () {
        function AABB(lower, upper) {
            if (!(this instanceof AABB)) {
                return new AABB(lower, upper);
            }
            this.lowerBound = Vec2.zero();
            this.upperBound = Vec2.zero();
            if (typeof lower === 'object') {
                this.lowerBound.setVec2(lower);
            }
            if (typeof upper === 'object') {
                this.upperBound.setVec2(upper);
            }
            else if (typeof lower === 'object') {
                this.upperBound.setVec2(lower);
            }
        }
        /**
         * Verify that the bounds are sorted.
         */
        AABB.prototype.isValid = function () {
            return AABB.isValid(this);
        };
        AABB.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return Vec2.isValid(obj.lowerBound) && Vec2.isValid(obj.upperBound) && Vec2.sub(obj.upperBound, obj.lowerBound).lengthSquared() >= 0;
        };
        AABB.assert = function (o) {
        };
        /**
         * Get the center of the AABB.
         */
        AABB.prototype.getCenter = function () {
            return Vec2.neo((this.lowerBound.x + this.upperBound.x) * 0.5, (this.lowerBound.y + this.upperBound.y) * 0.5);
        };
        /**
         * Get the extents of the AABB (half-widths).
         */
        AABB.prototype.getExtents = function () {
            return Vec2.neo((this.upperBound.x - this.lowerBound.x) * 0.5, (this.upperBound.y - this.lowerBound.y) * 0.5);
        };
        /**
         * Get the perimeter length.
         */
        AABB.prototype.getPerimeter = function () {
            return 2.0 * (this.upperBound.x - this.lowerBound.x + this.upperBound.y - this.lowerBound.y);
        };
        /**
         * Combine one or two AABB into this one.
         */
        AABB.prototype.combine = function (a, b) {
            b = b || this;
            var lowerA = a.lowerBound;
            var upperA = a.upperBound;
            var lowerB = b.lowerBound;
            var upperB = b.upperBound;
            var lowerX = math_min$7(lowerA.x, lowerB.x);
            var lowerY = math_min$7(lowerA.y, lowerB.y);
            var upperX = math_max$7(upperB.x, upperA.x);
            var upperY = math_max$7(upperB.y, upperA.y);
            this.lowerBound.setNum(lowerX, lowerY);
            this.upperBound.setNum(upperX, upperY);
        };
        AABB.prototype.combinePoints = function (a, b) {
            this.lowerBound.setNum(math_min$7(a.x, b.x), math_min$7(a.y, b.y));
            this.upperBound.setNum(math_max$7(a.x, b.x), math_max$7(a.y, b.y));
        };
        AABB.prototype.set = function (aabb) {
            this.lowerBound.setNum(aabb.lowerBound.x, aabb.lowerBound.y);
            this.upperBound.setNum(aabb.upperBound.x, aabb.upperBound.y);
        };
        AABB.prototype.contains = function (aabb) {
            var result = true;
            result = result && this.lowerBound.x <= aabb.lowerBound.x;
            result = result && this.lowerBound.y <= aabb.lowerBound.y;
            result = result && aabb.upperBound.x <= this.upperBound.x;
            result = result && aabb.upperBound.y <= this.upperBound.y;
            return result;
        };
        AABB.prototype.extend = function (value) {
            AABB.extend(this, value);
            return this;
        };
        AABB.extend = function (out, value) {
            out.lowerBound.x -= value;
            out.lowerBound.y -= value;
            out.upperBound.x += value;
            out.upperBound.y += value;
            return out;
        };
        AABB.testOverlap = function (a, b) {
            var d1x = b.lowerBound.x - a.upperBound.x;
            var d2x = a.lowerBound.x - b.upperBound.x;
            var d1y = b.lowerBound.y - a.upperBound.y;
            var d2y = a.lowerBound.y - b.upperBound.y;
            if (d1x > 0 || d1y > 0 || d2x > 0 || d2y > 0) {
                return false;
            }
            return true;
        };
        AABB.areEqual = function (a, b) {
            return Vec2.areEqual(a.lowerBound, b.lowerBound) && Vec2.areEqual(a.upperBound, b.upperBound);
        };
        AABB.diff = function (a, b) {
            var wD = math_max$7(0, math_min$7(a.upperBound.x, b.upperBound.x) - math_max$7(b.lowerBound.x, a.lowerBound.x));
            var hD = math_max$7(0, math_min$7(a.upperBound.y, b.upperBound.y) - math_max$7(b.lowerBound.y, a.lowerBound.y));
            var wA = a.upperBound.x - a.lowerBound.x;
            var hA = a.upperBound.y - a.lowerBound.y;
            var wB = b.upperBound.x - b.lowerBound.x;
            var hB = b.upperBound.y - b.lowerBound.y;
            return wA * hA + wB * hB - wD * hD;
        };
        AABB.prototype.rayCast = function (output, input) {
            // From Real-time Collision Detection, p179.
            var tmin = -Infinity;
            var tmax = Infinity;
            var p = input.p1;
            var d = Vec2.sub(input.p2, input.p1);
            var absD = Vec2.abs(d);
            var normal = Vec2.zero();
            for (var f = 'x'; f !== null; f = (f === 'x' ? 'y' : null)) {
                if (absD.x < EPSILON) {
                    // Parallel.
                    if (p[f] < this.lowerBound[f] || this.upperBound[f] < p[f]) {
                        return false;
                    }
                }
                else {
                    var inv_d = 1.0 / d[f];
                    var t1 = (this.lowerBound[f] - p[f]) * inv_d;
                    var t2 = (this.upperBound[f] - p[f]) * inv_d;
                    // Sign of the normal vector.
                    var s = -1.0;
                    if (t1 > t2) {
                        var temp = t1;
                        t1 = t2;
                        t2 = temp;
                        s = 1.0;
                    }
                    // Push the min up
                    if (t1 > tmin) {
                        normal.setZero();
                        normal[f] = s;
                        tmin = t1;
                    }
                    // Pull the max down
                    tmax = math_min$7(tmax, t2);
                    if (tmin > tmax) {
                        return false;
                    }
                }
            }
            // Does the ray start inside the box?
            // Does the ray intersect beyond the max fraction?
            if (tmin < 0.0 || input.maxFraction < tmin) {
                return false;
            }
            // Intersection.
            output.fraction = tmin;
            output.normal = normal;
            return true;
        };
        /** @internal */ AABB.prototype.toString = function () {
            return JSON.stringify(this);
        };
        AABB.combinePoints = function (out, a, b) {
            out.lowerBound.x = math_min$7(a.x, b.x);
            out.lowerBound.y = math_min$7(a.y, b.y);
            out.upperBound.x = math_max$7(a.x, b.x);
            out.upperBound.y = math_max$7(a.y, b.y);
            return out;
        };
        AABB.combinedPerimeter = function (a, b) {
            var lx = math_min$7(a.lowerBound.x, b.lowerBound.x);
            var ly = math_min$7(a.lowerBound.y, b.lowerBound.y);
            var ux = math_max$7(a.upperBound.x, b.upperBound.x);
            var uy = math_max$7(a.upperBound.y, b.upperBound.y);
            return 2.0 * (ux - lx + uy - ly);
        };
        return AABB;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_PI$6 = Math.PI;
    /**
     * Tuning constants based on meters-kilograms-seconds (MKS) units.
     *
     * Some tolerances are absolute and some are relative. Absolute tolerances use MKS units.
     */
    var Settings = /** @class */ (function () {
        function Settings() {
        }
        Object.defineProperty(Settings, "polygonRadius", {
            /**
             * The radius of the polygon/edge shape skin. This should not be modified.
             * Making this smaller means polygons will have an insufficient buffer for
             * continuous collision. Making it larger may create artifacts for vertex
             * collision.
             */
            get: function () { return 2.0 * Settings.linearSlop; },
            enumerable: false,
            configurable: true
        });
        /**
         * You can use this to change the length scale used by your game.
         *
         * For example for inches you could use 39.4.
         */
        Settings.lengthUnitsPerMeter = 1.0;
        // Collision
        /**
         * The maximum number of contact points between two convex shapes. Do not change
         * this value.
         */
        Settings.maxManifoldPoints = 2;
        /**
         * The maximum number of vertices on a convex polygon. You cannot increase this
         * too much because BlockAllocator has a maximum object size.
         */
        Settings.maxPolygonVertices = 12;
        /**
         * This is used to fatten AABBs in the dynamic tree. This allows proxies to move
         * by a small amount without triggering a tree adjustment. This is in meters.
         */
        Settings.aabbExtension = 0.1;
        /**
         * This is used to fatten AABBs in the dynamic tree. This is used to predict the
         * future position based on the current displacement. This is a dimensionless
         * multiplier.
         */
        Settings.aabbMultiplier = 2.0;
        /**
         * A small length used as a collision and constraint tolerance. Usually it is
         * chosen to be numerically significant, but visually insignificant.
         */
        Settings.linearSlop = 0.005;
        /**
         * A small angle used as a collision and constraint tolerance. Usually it is
         * chosen to be numerically significant, but visually insignificant.
         */
        Settings.angularSlop = (2.0 / 180.0 * math_PI$6);
        /**
         * Maximum number of sub-steps per contact in continuous physics simulation.
         */
        Settings.maxSubSteps = 8;
        // Dynamics
        /**
         * Maximum number of contacts to be handled to solve a TOI impact.
         */
        Settings.maxTOIContacts = 32;
        /**
         * Maximum iterations to solve a TOI.
         */
        Settings.maxTOIIterations = 20;
        /**
         * Maximum iterations to find Distance.
         */
        Settings.maxDistanceIterations = 20;
        /**
         * A velocity threshold for elastic collisions. Any collision with a relative
         * linear velocity below this threshold will be treated as inelastic.
         */
        Settings.velocityThreshold = 1.0;
        /**
         * The maximum linear position correction used when solving constraints. This
         * helps to prevent overshoot.
         */
        Settings.maxLinearCorrection = 0.2;
        /**
         * The maximum angular position correction used when solving constraints. This
         * helps to prevent overshoot.
         */
        Settings.maxAngularCorrection = (8.0 / 180.0 * math_PI$6);
        /**
         * The maximum linear velocity of a body. This limit is very large and is used
         * to prevent numerical problems. You shouldn't need to adjust Settings.
         */
        Settings.maxTranslation = 2.0;
        /**
         * The maximum angular velocity of a body. This limit is very large and is used
         * to prevent numerical problems. You shouldn't need to adjust Settings.
         */
        Settings.maxRotation = (0.5 * math_PI$6);
        /**
         * This scale factor controls how fast overlap is resolved. Ideally this would
         * be 1 so that overlap is removed in one time step. However using values close
         * to 1 often lead to overshoot.
         */
        Settings.baumgarte = 0.2;
        Settings.toiBaugarte = 0.75;
        // Sleep
        /**
         * The time that a body must be still before it will go to sleep.
         */
        Settings.timeToSleep = 0.5;
        /**
         * A body cannot sleep if its linear velocity is above this tolerance.
         */
        Settings.linearSleepTolerance = 0.01;
        /**
         * A body cannot sleep if its angular velocity is above this tolerance.
         */
        Settings.angularSleepTolerance = (2.0 / 180.0 * math_PI$6);
        return Settings;
    }());
    /** @internal */
    var SettingsInternal = /** @class */ (function () {
        function SettingsInternal() {
        }
        Object.defineProperty(SettingsInternal, "maxManifoldPoints", {
            get: function () {
                return Settings.maxManifoldPoints;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "maxPolygonVertices", {
            get: function () {
                return Settings.maxPolygonVertices;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "aabbExtension", {
            get: function () {
                return Settings.aabbExtension * Settings.lengthUnitsPerMeter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "aabbMultiplier", {
            get: function () {
                return Settings.aabbMultiplier;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "linearSlop", {
            get: function () {
                return Settings.linearSlop * Settings.lengthUnitsPerMeter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "linearSlopSquared", {
            get: function () {
                return Settings.linearSlop * Settings.lengthUnitsPerMeter * Settings.linearSlop * Settings.lengthUnitsPerMeter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "angularSlop", {
            get: function () {
                return Settings.angularSlop;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "polygonRadius", {
            get: function () {
                return 2.0 * Settings.linearSlop;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "maxSubSteps", {
            get: function () {
                return Settings.maxSubSteps;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "maxTOIContacts", {
            get: function () {
                return Settings.maxTOIContacts;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "maxTOIIterations", {
            get: function () {
                return Settings.maxTOIIterations;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "maxDistanceIterations", {
            get: function () {
                return Settings.maxDistanceIterations;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "velocityThreshold", {
            get: function () {
                return Settings.velocityThreshold * Settings.lengthUnitsPerMeter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "maxLinearCorrection", {
            get: function () {
                return Settings.maxLinearCorrection * Settings.lengthUnitsPerMeter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "maxAngularCorrection", {
            get: function () {
                return Settings.maxAngularCorrection;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "maxTranslation", {
            get: function () {
                return Settings.maxTranslation * Settings.lengthUnitsPerMeter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "maxTranslationSquared", {
            get: function () {
                return Settings.maxTranslation * Settings.lengthUnitsPerMeter * Settings.maxTranslation * Settings.lengthUnitsPerMeter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "maxRotation", {
            get: function () {
                return Settings.maxRotation;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "maxRotationSquared", {
            get: function () {
                return Settings.maxRotation * Settings.maxRotation;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "baumgarte", {
            get: function () {
                return Settings.baumgarte;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "toiBaugarte", {
            get: function () {
                return Settings.toiBaugarte;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "timeToSleep", {
            get: function () {
                return Settings.timeToSleep;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "linearSleepTolerance", {
            get: function () {
                return Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "linearSleepToleranceSqr", {
            get: function () {
                return Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter * Settings.linearSleepTolerance * Settings.lengthUnitsPerMeter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "angularSleepTolerance", {
            get: function () {
                return Settings.angularSleepTolerance;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SettingsInternal, "angularSleepToleranceSqr", {
            get: function () {
                return Settings.angularSleepTolerance * Settings.angularSleepTolerance;
            },
            enumerable: false,
            configurable: true
        });
        return SettingsInternal;
    }());

    /*
     * Copyright (c) 2016-2018 Ali Shakiba http://shakiba.me/planck.js
     *
     * This software is provided 'as-is', without any express or implied
     * warranty.  In no event will the authors be held liable for any damages
     * arising from the use of this software.
     * Permission is granted to anyone to use this software for any purpose,
     * including commercial applications, and to alter it and redistribute it
     * freely, subject to the following restrictions:
     * 1. The origin of this software must not be misrepresented; you must not
     * claim that you wrote the original software. If you use this software
     * in a product, an acknowledgment in the product documentation would be
     * appreciated but is not required.
     * 2. Altered source versions must be plainly marked as such, and must not be
     * misrepresented as being the original software.
     * 3. This notice may not be removed or altered from any source distribution.
     */
    /** @internal */
    var Pool = /** @class */ (function () {
        function Pool(opts) {
            this._list = [];
            this._max = Infinity;
            this._hasCreateFn = false;
            this._createCount = 0;
            this._hasAllocateFn = false;
            this._allocateCount = 0;
            this._hasReleaseFn = false;
            this._releaseCount = 0;
            this._hasDisposeFn = false;
            this._disposeCount = 0;
            this._list = [];
            this._max = opts.max || this._max;
            this._createFn = opts.create;
            this._hasCreateFn = typeof this._createFn === 'function';
            this._allocateFn = opts.allocate;
            this._hasAllocateFn = typeof this._allocateFn === 'function';
            this._releaseFn = opts.release;
            this._hasReleaseFn = typeof this._releaseFn === 'function';
            this._disposeFn = opts.dispose;
            this._hasDisposeFn = typeof this._disposeFn === 'function';
        }
        Pool.prototype.max = function (n) {
            if (typeof n === 'number') {
                this._max = n;
                return this;
            }
            return this._max;
        };
        Pool.prototype.size = function () {
            return this._list.length;
        };
        Pool.prototype.allocate = function () {
            var item;
            if (this._list.length > 0) {
                item = this._list.shift();
            }
            else {
                this._createCount++;
                if (this._hasCreateFn) {
                    item = this._createFn();
                }
                else {
                    // tslint:disable-next-line:no-object-literal-type-assertion
                    item = {};
                }
            }
            this._allocateCount++;
            if (this._hasAllocateFn) {
                this._allocateFn(item);
            }
            return item;
        };
        Pool.prototype.release = function (item) {
            if (this._list.length < this._max) {
                this._releaseCount++;
                if (this._hasReleaseFn) {
                    this._releaseFn(item);
                }
                this._list.push(item);
            }
            else {
                this._disposeCount++;
                if (this._hasDisposeFn) {
                    item = this._disposeFn(item);
                }
            }
        };
        Pool.prototype.toString = function () {
            return " +" + this._createCount + " >" + this._allocateCount + " <" + this._releaseCount + " -"
                + this._disposeCount + " =" + this._list.length + "/" + this._max;
        };
        return Pool;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_abs$8 = Math.abs;
    /** @internal */ var math_max$6 = Math.max;
    /**
     * A node in the dynamic tree. The client does not interact with this directly.
     */
    var TreeNode = /** @class */ (function () {
        function TreeNode(id) {
            /** Enlarged AABB */
            this.aabb = new AABB();
            this.userData = null;
            this.parent = null;
            this.child1 = null;
            this.child2 = null;
            /** 0: leaf, -1: free node */
            this.height = -1;
            this.id = id;
        }
        /** @internal */
        TreeNode.prototype.toString = function () {
            return this.id + ": " + this.userData;
        };
        TreeNode.prototype.isLeaf = function () {
            return this.child1 == null;
        };
        return TreeNode;
    }());
    /** @internal */ var poolTreeNode = new Pool({
        create: function () {
            return new TreeNode();
        },
        release: function (node) {
            node.userData = null;
            node.parent = null;
            node.child1 = null;
            node.child2 = null;
            node.height = -1;
            node.id = undefined;
        }
    });
    /**
     * A dynamic AABB tree broad-phase, inspired by Nathanael Presson's btDbvt. A
     * dynamic tree arranges data in a binary tree to accelerate queries such as
     * volume queries and ray casts. Leafs are proxies with an AABB. In the tree we
     * expand the proxy AABB by `aabbExtension` so that the proxy AABB is bigger
     * than the client object. This allows the client object to move by small
     * amounts without triggering a tree update.
     *
     * Nodes are pooled and relocatable, so we use node indices rather than
     * pointers.
     */
    var DynamicTree = /** @class */ (function () {
        function DynamicTree() {
            this.inputPool = new Pool({
                create: function () {
                    // tslint:disable-next-line:no-object-literal-type-assertion
                    return {};
                },
                release: function (stack) {
                }
            });
            this.stackPool = new Pool({
                create: function () {
                    return [];
                },
                release: function (stack) {
                    stack.length = 0;
                }
            });
            this.iteratorPool = new Pool({
                create: function () {
                    return new Iterator();
                },
                release: function (iterator) {
                    iterator.close();
                }
            });
            this.m_root = null;
            this.m_nodes = {};
            this.m_lastProxyId = 0;
        }
        /**
         * Get proxy user data.
         *
         * @return the proxy user data or 0 if the id is invalid.
         */
        DynamicTree.prototype.getUserData = function (id) {
            var node = this.m_nodes[id];
            return node.userData;
        };
        /**
         * Get the fat AABB for a node id.
         *
         * @return the proxy user data or 0 if the id is invalid.
         */
        DynamicTree.prototype.getFatAABB = function (id) {
            var node = this.m_nodes[id];
            return node.aabb;
        };
        DynamicTree.prototype.allocateNode = function () {
            var node = poolTreeNode.allocate();
            node.id = ++this.m_lastProxyId;
            this.m_nodes[node.id] = node;
            return node;
        };
        DynamicTree.prototype.freeNode = function (node) {
            // tslint:disable-next-line:no-dynamic-delete
            delete this.m_nodes[node.id];
            poolTreeNode.release(node);
        };
        /**
         * Create a proxy in the tree as a leaf node. We return the index of the node
         * instead of a pointer so that we can grow the node pool.
         *
         * Create a proxy. Provide a tight fitting AABB and a userData pointer.
         */
        DynamicTree.prototype.createProxy = function (aabb, userData) {
            var node = this.allocateNode();
            node.aabb.set(aabb);
            // Fatten the aabb.
            AABB.extend(node.aabb, SettingsInternal.aabbExtension);
            node.userData = userData;
            node.height = 0;
            this.insertLeaf(node);
            return node.id;
        };
        /**
         * Destroy a proxy. This asserts if the id is invalid.
         */
        DynamicTree.prototype.destroyProxy = function (id) {
            var node = this.m_nodes[id];
            this.removeLeaf(node);
            this.freeNode(node);
        };
        /**
         * Move a proxy with a swepted AABB. If the proxy has moved outside of its
         * fattened AABB, then the proxy is removed from the tree and re-inserted.
         * Otherwise the function returns immediately.
         *
         * @param d Displacement
         *
         * @return true if the proxy was re-inserted.
         */
        DynamicTree.prototype.moveProxy = function (id, aabb, d) {
            var node = this.m_nodes[id];
            if (node.aabb.contains(aabb)) {
                return false;
            }
            this.removeLeaf(node);
            node.aabb.set(aabb);
            // Extend AABB.
            aabb = node.aabb;
            AABB.extend(aabb, SettingsInternal.aabbExtension);
            // Predict AABB displacement.
            // const d = Vec2.mul(Settings.aabbMultiplier, displacement);
            if (d.x < 0.0) {
                aabb.lowerBound.x += d.x * SettingsInternal.aabbMultiplier;
            }
            else {
                aabb.upperBound.x += d.x * SettingsInternal.aabbMultiplier;
            }
            if (d.y < 0.0) {
                aabb.lowerBound.y += d.y * SettingsInternal.aabbMultiplier;
            }
            else {
                aabb.upperBound.y += d.y * SettingsInternal.aabbMultiplier;
            }
            this.insertLeaf(node);
            return true;
        };
        DynamicTree.prototype.insertLeaf = function (leaf) {
            if (this.m_root == null) {
                this.m_root = leaf;
                this.m_root.parent = null;
                return;
            }
            // Find the best sibling for this node
            var leafAABB = leaf.aabb;
            var index = this.m_root;
            while (!index.isLeaf()) {
                var child1 = index.child1;
                var child2 = index.child2;
                var area = index.aabb.getPerimeter();
                var combinedArea = AABB.combinedPerimeter(index.aabb, leafAABB);
                // Cost of creating a new parent for this node and the new leaf
                var cost = 2.0 * combinedArea;
                // Minimum cost of pushing the leaf further down the tree
                var inheritanceCost = 2.0 * (combinedArea - area);
                // Cost of descending into child1
                var newArea1 = AABB.combinedPerimeter(leafAABB, child1.aabb);
                var cost1 = newArea1 + inheritanceCost;
                if (!child1.isLeaf()) {
                    var oldArea = child1.aabb.getPerimeter();
                    cost1 -= oldArea;
                }
                // Cost of descending into child2
                var newArea2 = AABB.combinedPerimeter(leafAABB, child2.aabb);
                var cost2 = newArea2 + inheritanceCost;
                if (!child2.isLeaf()) {
                    var oldArea = child2.aabb.getPerimeter();
                    cost2 -= oldArea;
                }
                // Descend according to the minimum cost.
                if (cost < cost1 && cost < cost2) {
                    break;
                }
                // Descend
                if (cost1 < cost2) {
                    index = child1;
                }
                else {
                    index = child2;
                }
            }
            var sibling = index;
            // Create a new parent.
            var oldParent = sibling.parent;
            var newParent = this.allocateNode();
            newParent.parent = oldParent;
            newParent.userData = null;
            newParent.aabb.combine(leafAABB, sibling.aabb);
            newParent.height = sibling.height + 1;
            if (oldParent != null) {
                // The sibling was not the root.
                if (oldParent.child1 === sibling) {
                    oldParent.child1 = newParent;
                }
                else {
                    oldParent.child2 = newParent;
                }
                newParent.child1 = sibling;
                newParent.child2 = leaf;
                sibling.parent = newParent;
                leaf.parent = newParent;
            }
            else {
                // The sibling was the root.
                newParent.child1 = sibling;
                newParent.child2 = leaf;
                sibling.parent = newParent;
                leaf.parent = newParent;
                this.m_root = newParent;
            }
            // Walk back up the tree fixing heights and AABBs
            index = leaf.parent;
            while (index != null) {
                index = this.balance(index);
                var child1 = index.child1;
                var child2 = index.child2;
                index.height = 1 + math_max$6(child1.height, child2.height);
                index.aabb.combine(child1.aabb, child2.aabb);
                index = index.parent;
            }
            // validate();
        };
        DynamicTree.prototype.removeLeaf = function (leaf) {
            if (leaf === this.m_root) {
                this.m_root = null;
                return;
            }
            var parent = leaf.parent;
            var grandParent = parent.parent;
            var sibling;
            if (parent.child1 === leaf) {
                sibling = parent.child2;
            }
            else {
                sibling = parent.child1;
            }
            if (grandParent != null) {
                // Destroy parent and connect sibling to grandParent.
                if (grandParent.child1 === parent) {
                    grandParent.child1 = sibling;
                }
                else {
                    grandParent.child2 = sibling;
                }
                sibling.parent = grandParent;
                this.freeNode(parent);
                // Adjust ancestor bounds.
                var index = grandParent;
                while (index != null) {
                    index = this.balance(index);
                    var child1 = index.child1;
                    var child2 = index.child2;
                    index.aabb.combine(child1.aabb, child2.aabb);
                    index.height = 1 + math_max$6(child1.height, child2.height);
                    index = index.parent;
                }
            }
            else {
                this.m_root = sibling;
                sibling.parent = null;
                this.freeNode(parent);
            }
            // validate();
        };
        /**
         * Perform a left or right rotation if node A is imbalanced. Returns the new
         * root index.
         */
        DynamicTree.prototype.balance = function (iA) {
            var A = iA;
            if (A.isLeaf() || A.height < 2) {
                return iA;
            }
            var B = A.child1;
            var C = A.child2;
            var balance = C.height - B.height;
            // Rotate C up
            if (balance > 1) {
                var F = C.child1;
                var G = C.child2;
                // Swap A and C
                C.child1 = A;
                C.parent = A.parent;
                A.parent = C;
                // A's old parent should point to C
                if (C.parent != null) {
                    if (C.parent.child1 === iA) {
                        C.parent.child1 = C;
                    }
                    else {
                        C.parent.child2 = C;
                    }
                }
                else {
                    this.m_root = C;
                }
                // Rotate
                if (F.height > G.height) {
                    C.child2 = F;
                    A.child2 = G;
                    G.parent = A;
                    A.aabb.combine(B.aabb, G.aabb);
                    C.aabb.combine(A.aabb, F.aabb);
                    A.height = 1 + math_max$6(B.height, G.height);
                    C.height = 1 + math_max$6(A.height, F.height);
                }
                else {
                    C.child2 = G;
                    A.child2 = F;
                    F.parent = A;
                    A.aabb.combine(B.aabb, F.aabb);
                    C.aabb.combine(A.aabb, G.aabb);
                    A.height = 1 + math_max$6(B.height, F.height);
                    C.height = 1 + math_max$6(A.height, G.height);
                }
                return C;
            }
            // Rotate B up
            if (balance < -1) {
                var D = B.child1;
                var E = B.child2;
                // Swap A and B
                B.child1 = A;
                B.parent = A.parent;
                A.parent = B;
                // A's old parent should point to B
                if (B.parent != null) {
                    if (B.parent.child1 === A) {
                        B.parent.child1 = B;
                    }
                    else {
                        B.parent.child2 = B;
                    }
                }
                else {
                    this.m_root = B;
                }
                // Rotate
                if (D.height > E.height) {
                    B.child2 = D;
                    A.child1 = E;
                    E.parent = A;
                    A.aabb.combine(C.aabb, E.aabb);
                    B.aabb.combine(A.aabb, D.aabb);
                    A.height = 1 + math_max$6(C.height, E.height);
                    B.height = 1 + math_max$6(A.height, D.height);
                }
                else {
                    B.child2 = E;
                    A.child1 = D;
                    D.parent = A;
                    A.aabb.combine(C.aabb, D.aabb);
                    B.aabb.combine(A.aabb, E.aabb);
                    A.height = 1 + math_max$6(C.height, D.height);
                    B.height = 1 + math_max$6(A.height, E.height);
                }
                return B;
            }
            return A;
        };
        /**
         * Compute the height of the binary tree in O(N) time. Should not be called
         * often.
         */
        DynamicTree.prototype.getHeight = function () {
            if (this.m_root == null) {
                return 0;
            }
            return this.m_root.height;
        };
        /**
         * Get the ratio of the sum of the node areas to the root area.
         */
        DynamicTree.prototype.getAreaRatio = function () {
            if (this.m_root == null) {
                return 0.0;
            }
            var root = this.m_root;
            var rootArea = root.aabb.getPerimeter();
            var totalArea = 0.0;
            var node;
            var it = this.iteratorPool.allocate().preorder(this.m_root);
            while (node = it.next()) {
                if (node.height < 0) {
                    // Free node in pool
                    continue;
                }
                totalArea += node.aabb.getPerimeter();
            }
            this.iteratorPool.release(it);
            return totalArea / rootArea;
        };
        /**
         * Compute the height of a sub-tree.
         */
        DynamicTree.prototype.computeHeight = function (id) {
            var node;
            if (typeof id !== 'undefined') {
                node = this.m_nodes[id];
            }
            else {
                node = this.m_root;
            }
            // false && console.assert(0 <= id && id < this.m_nodeCapacity);
            if (node.isLeaf()) {
                return 0;
            }
            var height1 = this.computeHeight(node.child1.id);
            var height2 = this.computeHeight(node.child2.id);
            return 1 + math_max$6(height1, height2);
        };
        DynamicTree.prototype.validateStructure = function (node) {
            if (node == null) {
                return;
            }
            if (node === this.m_root) ;
            var child1 = node.child1;
            var child2 = node.child2;
            if (node.isLeaf()) {
                return;
            }
            this.validateStructure(child1);
            this.validateStructure(child2);
        };
        DynamicTree.prototype.validateMetrics = function (node) {
            if (node == null) {
                return;
            }
            var child1 = node.child1;
            var child2 = node.child2;
            if (node.isLeaf()) {
                return;
            }
            // false && console.assert(0 <= child1 && child1 < this.m_nodeCapacity);
            // false && console.assert(0 <= child2 && child2 < this.m_nodeCapacity);
            child1.height;
            child2.height;
            var aabb = new AABB();
            aabb.combine(child1.aabb, child2.aabb);
            this.validateMetrics(child1);
            this.validateMetrics(child2);
        };
        /**
         * Validate this tree. For testing.
         */
        DynamicTree.prototype.validate = function () {
            return;
        };
        /**
         * Get the maximum balance of an node in the tree. The balance is the difference
         * in height of the two children of a node.
         */
        DynamicTree.prototype.getMaxBalance = function () {
            var maxBalance = 0;
            var node;
            var it = this.iteratorPool.allocate().preorder(this.m_root);
            while (node = it.next()) {
                if (node.height <= 1) {
                    continue;
                }
                var balance = math_abs$8(node.child2.height - node.child1.height);
                maxBalance = math_max$6(maxBalance, balance);
            }
            this.iteratorPool.release(it);
            return maxBalance;
        };
        /**
         * Build an optimal tree. Very expensive. For testing.
         */
        DynamicTree.prototype.rebuildBottomUp = function () {
            var nodes = [];
            var count = 0;
            // Build array of leaves. Free the rest.
            var node;
            var it = this.iteratorPool.allocate().preorder(this.m_root);
            while (node = it.next()) {
                if (node.height < 0) {
                    // free node in pool
                    continue;
                }
                if (node.isLeaf()) {
                    node.parent = null;
                    nodes[count] = node;
                    ++count;
                }
                else {
                    this.freeNode(node);
                }
            }
            this.iteratorPool.release(it);
            while (count > 1) {
                var minCost = Infinity;
                var iMin = -1;
                var jMin = -1;
                for (var i = 0; i < count; ++i) {
                    var aabbi = nodes[i].aabb;
                    for (var j = i + 1; j < count; ++j) {
                        var aabbj = nodes[j].aabb;
                        var cost = AABB.combinedPerimeter(aabbi, aabbj);
                        if (cost < minCost) {
                            iMin = i;
                            jMin = j;
                            minCost = cost;
                        }
                    }
                }
                var child1 = nodes[iMin];
                var child2 = nodes[jMin];
                var parent_1 = this.allocateNode();
                parent_1.child1 = child1;
                parent_1.child2 = child2;
                parent_1.height = 1 + math_max$6(child1.height, child2.height);
                parent_1.aabb.combine(child1.aabb, child2.aabb);
                parent_1.parent = null;
                child1.parent = parent_1;
                child2.parent = parent_1;
                nodes[jMin] = nodes[count - 1];
                nodes[iMin] = parent_1;
                --count;
            }
            this.m_root = nodes[0];
        };
        /**
         * Shift the world origin. Useful for large worlds. The shift formula is:
         * position -= newOrigin
         *
         * @param newOrigin The new origin with respect to the old origin
         */
        DynamicTree.prototype.shiftOrigin = function (newOrigin) {
            // Build array of leaves. Free the rest.
            var node;
            var it = this.iteratorPool.allocate().preorder(this.m_root);
            while (node = it.next()) {
                var aabb = node.aabb;
                aabb.lowerBound.x -= newOrigin.x;
                aabb.lowerBound.y -= newOrigin.y;
                aabb.upperBound.x -= newOrigin.x;
                aabb.upperBound.y -= newOrigin.y;
            }
            this.iteratorPool.release(it);
        };
        /**
         * Query an AABB for overlapping proxies. The callback class is called for each
         * proxy that overlaps the supplied AABB.
         */
        DynamicTree.prototype.query = function (aabb, queryCallback) {
            var stack = this.stackPool.allocate();
            stack.push(this.m_root);
            while (stack.length > 0) {
                var node = stack.pop();
                if (node == null) {
                    continue;
                }
                if (AABB.testOverlap(node.aabb, aabb)) {
                    if (node.isLeaf()) {
                        var proceed = queryCallback(node.id);
                        if (proceed === false) {
                            return;
                        }
                    }
                    else {
                        stack.push(node.child1);
                        stack.push(node.child2);
                    }
                }
            }
            this.stackPool.release(stack);
        };
        /**
         * Ray-cast against the proxies in the tree. This relies on the callback to
         * perform a exact ray-cast in the case were the proxy contains a shape. The
         * callback also performs the any collision filtering. This has performance
         * roughly equal to k * log(n), where k is the number of collisions and n is the
         * number of proxies in the tree.
         *
         * @param input The ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`.
         * @param rayCastCallback A function that is called for each proxy that is hit by the ray.
         */
        DynamicTree.prototype.rayCast = function (input, rayCastCallback) {
            var p1 = input.p1;
            var p2 = input.p2;
            var r = Vec2.sub(p2, p1);
            r.normalize();
            // v is perpendicular to the segment.
            var v = Vec2.crossNumVec2(1.0, r);
            var abs_v = Vec2.abs(v);
            // Separating axis for segment (Gino, p80).
            // |dot(v, p1 - c)| > dot(|v|, h)
            var maxFraction = input.maxFraction;
            // Build a bounding box for the segment.
            var segmentAABB = new AABB();
            var t = Vec2.combine((1 - maxFraction), p1, maxFraction, p2);
            segmentAABB.combinePoints(p1, t);
            var stack = this.stackPool.allocate();
            var subInput = this.inputPool.allocate();
            stack.push(this.m_root);
            while (stack.length > 0) {
                var node = stack.pop();
                if (node == null) {
                    continue;
                }
                if (AABB.testOverlap(node.aabb, segmentAABB) === false) {
                    continue;
                }
                // Separating axis for segment (Gino, p80).
                // |dot(v, p1 - c)| > dot(|v|, h)
                var c = node.aabb.getCenter();
                var h = node.aabb.getExtents();
                var separation = math_abs$8(Vec2.dot(v, Vec2.sub(p1, c))) - Vec2.dot(abs_v, h);
                if (separation > 0.0) {
                    continue;
                }
                if (node.isLeaf()) {
                    subInput.p1 = Vec2.clone(input.p1);
                    subInput.p2 = Vec2.clone(input.p2);
                    subInput.maxFraction = maxFraction;
                    var value = rayCastCallback(subInput, node.id);
                    if (value === 0.0) {
                        // The client has terminated the ray cast.
                        return;
                    }
                    if (value > 0.0) {
                        // update segment bounding box.
                        maxFraction = value;
                        t = Vec2.combine((1 - maxFraction), p1, maxFraction, p2);
                        segmentAABB.combinePoints(p1, t);
                    }
                }
                else {
                    stack.push(node.child1);
                    stack.push(node.child2);
                }
            }
            this.stackPool.release(stack);
            this.inputPool.release(subInput);
        };
        return DynamicTree;
    }());
    /** @internal */
    var Iterator = /** @class */ (function () {
        function Iterator() {
            this.parents = [];
            this.states = [];
        }
        Iterator.prototype.preorder = function (root) {
            this.parents.length = 0;
            this.parents.push(root);
            this.states.length = 0;
            this.states.push(0);
            return this;
        };
        Iterator.prototype.next = function () {
            while (this.parents.length > 0) {
                var i = this.parents.length - 1;
                var node = this.parents[i];
                if (this.states[i] === 0) {
                    this.states[i] = 1;
                    return node;
                }
                if (this.states[i] === 1) {
                    this.states[i] = 2;
                    if (node.child1) {
                        this.parents.push(node.child1);
                        this.states.push(1);
                        return node.child1;
                    }
                }
                if (this.states[i] === 2) {
                    this.states[i] = 3;
                    if (node.child2) {
                        this.parents.push(node.child2);
                        this.states.push(1);
                        return node.child2;
                    }
                }
                this.parents.pop();
                this.states.pop();
            }
        };
        Iterator.prototype.close = function () {
            this.parents.length = 0;
        };
        return Iterator;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_max$5 = Math.max;
    /** @internal */ var math_min$6 = Math.min;
    /**
     * The broad-phase wraps and extends a dynamic-tree to keep track of moved
     * objects and query them on update.
     */
    var BroadPhase = /** @class */ (function () {
        function BroadPhase() {
            var _this = this;
            this.m_tree = new DynamicTree();
            this.m_moveBuffer = [];
            /**
             * Query an AABB for overlapping proxies. The callback class is called for each
             * proxy that overlaps the supplied AABB.
             */
            this.query = function (aabb, queryCallback) {
                _this.m_tree.query(aabb, queryCallback);
            };
            this.queryCallback = function (proxyId) {
                // A proxy cannot form a pair with itself.
                if (proxyId === _this.m_queryProxyId) {
                    return true;
                }
                var proxyIdA = math_min$6(proxyId, _this.m_queryProxyId);
                var proxyIdB = math_max$5(proxyId, _this.m_queryProxyId);
                // TODO: Skip any duplicate pairs.
                var userDataA = _this.m_tree.getUserData(proxyIdA);
                var userDataB = _this.m_tree.getUserData(proxyIdB);
                // Send the pairs back to the client.
                _this.m_callback(userDataA, userDataB);
                return true;
            };
        }
        /**
         * Get user data from a proxy. Returns null if the id is invalid.
         */
        BroadPhase.prototype.getUserData = function (proxyId) {
            return this.m_tree.getUserData(proxyId);
        };
        /**
         * Test overlap of fat AABBs.
         */
        BroadPhase.prototype.testOverlap = function (proxyIdA, proxyIdB) {
            var aabbA = this.m_tree.getFatAABB(proxyIdA);
            var aabbB = this.m_tree.getFatAABB(proxyIdB);
            return AABB.testOverlap(aabbA, aabbB);
        };
        /**
         * Get the fat AABB for a proxy.
         */
        BroadPhase.prototype.getFatAABB = function (proxyId) {
            return this.m_tree.getFatAABB(proxyId);
        };
        /**
         * Get the number of proxies.
         */
        BroadPhase.prototype.getProxyCount = function () {
            return this.m_moveBuffer.length;
        };
        /**
         * Get the height of the embedded tree.
         */
        BroadPhase.prototype.getTreeHeight = function () {
            return this.m_tree.getHeight();
        };
        /**
         * Get the balance (integer) of the embedded tree.
         */
        BroadPhase.prototype.getTreeBalance = function () {
            return this.m_tree.getMaxBalance();
        };
        /**
         * Get the quality metric of the embedded tree.
         */
        BroadPhase.prototype.getTreeQuality = function () {
            return this.m_tree.getAreaRatio();
        };
        /**
         * Ray-cast against the proxies in the tree. This relies on the callback to
         * perform a exact ray-cast in the case were the proxy contains a shape. The
         * callback also performs the any collision filtering. This has performance
         * roughly equal to k * log(n), where k is the number of collisions and n is the
         * number of proxies in the tree.
         *
         * @param input The ray-cast input data. The ray extends from `p1` to `p1 + maxFraction * (p2 - p1)`.
         * @param rayCastCallback A function that is called for each proxy that is hit by the ray.
         */
        BroadPhase.prototype.rayCast = function (input, rayCastCallback) {
            this.m_tree.rayCast(input, rayCastCallback);
        };
        /**
         * Shift the world origin. Useful for large worlds. The shift formula is:
         * position -= newOrigin
         *
         * @param newOrigin The new origin with respect to the old origin
         */
        BroadPhase.prototype.shiftOrigin = function (newOrigin) {
            this.m_tree.shiftOrigin(newOrigin);
        };
        /**
         * Create a proxy with an initial AABB. Pairs are not reported until UpdatePairs
         * is called.
         */
        BroadPhase.prototype.createProxy = function (aabb, userData) {
            var proxyId = this.m_tree.createProxy(aabb, userData);
            this.bufferMove(proxyId);
            return proxyId;
        };
        /**
         * Destroy a proxy. It is up to the client to remove any pairs.
         */
        BroadPhase.prototype.destroyProxy = function (proxyId) {
            this.unbufferMove(proxyId);
            this.m_tree.destroyProxy(proxyId);
        };
        /**
         * Call moveProxy as many times as you like, then when you are done call
         * UpdatePairs to finalized the proxy pairs (for your time step).
         */
        BroadPhase.prototype.moveProxy = function (proxyId, aabb, displacement) {
            var changed = this.m_tree.moveProxy(proxyId, aabb, displacement);
            if (changed) {
                this.bufferMove(proxyId);
            }
        };
        /**
         * Call to trigger a re-processing of it's pairs on the next call to
         * UpdatePairs.
         */
        BroadPhase.prototype.touchProxy = function (proxyId) {
            this.bufferMove(proxyId);
        };
        BroadPhase.prototype.bufferMove = function (proxyId) {
            this.m_moveBuffer.push(proxyId);
        };
        BroadPhase.prototype.unbufferMove = function (proxyId) {
            for (var i = 0; i < this.m_moveBuffer.length; ++i) {
                if (this.m_moveBuffer[i] === proxyId) {
                    this.m_moveBuffer[i] = null;
                }
            }
        };
        /**
         * Update the pairs. This results in pair callbacks. This can only add pairs.
         */
        BroadPhase.prototype.updatePairs = function (addPairCallback) {
            this.m_callback = addPairCallback;
            // Perform tree queries for all moving proxies.
            while (this.m_moveBuffer.length > 0) {
                this.m_queryProxyId = this.m_moveBuffer.pop();
                if (this.m_queryProxyId === null) {
                    continue;
                }
                // We have to query the tree with the fat AABB so that
                // we don't fail to create a pair that may touch later.
                var fatAABB = this.m_tree.getFatAABB(this.m_queryProxyId);
                // Query tree, create pairs and add them pair buffer.
                this.m_tree.query(fatAABB, this.queryCallback);
            }
            // Try to keep the tree balanced.
            // this.m_tree.rebalance(4);
        };
        return BroadPhase;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2023 Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_sin$2 = Math.sin;
    /** @internal */ var math_cos$2 = Math.cos;
    /** @internal */ var math_sqrt$4 = Math.sqrt;
    function vec2(x, y) {
        return { x: x, y: y };
    }
    function rotation(angle) {
        return { s: math_sin$2(angle), c: math_cos$2(angle) };
    }
    function setVec2(out, x, y) {
        out.x = x;
        out.y = y;
        return out;
    }
    function copyVec2(out, w) {
        out.x = w.x;
        out.y = w.y;
        return out;
    }
    function zeroVec2(out) {
        out.x = 0;
        out.y = 0;
        return out;
    }
    function negVec2(out) {
        out.x = -out.x;
        out.y = -out.y;
        return out;
    }
    function addVec2(out, w) {
        out.x += w.x;
        out.y += w.y;
        return out;
    }
    function sumVec2(out, v, w) {
        out.x = v.x + w.x;
        out.y = v.x + w.y;
        return out;
    }
    function subVec2(out, w) {
        out.x -= w.x;
        out.y -= w.y;
        return out;
    }
    function diffVec2(out, v, w) {
        out.x = v.x - w.x;
        out.y = v.y - w.y;
        return out;
    }
    function scaleVec2(out, m) {
        out.x *= m;
        out.y *= m;
        return out;
    }
    function setMulVec2(out, m, w) {
        out.x = m * w.x;
        out.y = m * w.y;
        return out;
    }
    function addMulVec2(out, m, w) {
        out.x += m * w.x;
        out.y += m * w.y;
        return out;
    }
    function subMulVec2(out, m, w) {
        out.x -= m * w.x;
        out.y -= m * w.y;
        return out;
    }
    function combineVec2(out, am, a, bm, b) {
        out.x = am * a.x + bm * b.x;
        out.y = am * a.y + bm * b.y;
        return out;
    }
    function normalizeVec2Length(out) {
        var length = math_sqrt$4(out.x * out.x + out.y * out.y);
        if (length !== 0) {
            var invLength = 1 / length;
            out.x *= invLength;
            out.y *= invLength;
        }
        return length;
    }
    function normalizeVec2(out) {
        var length = math_sqrt$4(out.x * out.x + out.y * out.y);
        if (length > 0) {
            var invLength = 1 / length;
            out.x *= invLength;
            out.y *= invLength;
        }
        return out;
    }
    function crossVec2Num(out, v, w) {
        var x = w * v.y;
        var y = -w * v.x;
        out.x = x;
        out.y = y;
        return out;
    }
    function crossNumVec2(out, w, v) {
        var x = -w * v.y;
        var y = w * v.x;
        out.x = x;
        out.y = y;
        return out;
    }
    function crossVec2Vec2(a, b) {
        return a.x * b.y - a.y * b.x;
    }
    function dotVec2(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    function lengthSqrVec2(a) {
        return a.x * a.x + a.y * a.y;
    }
    function distVec2(a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return math_sqrt$4(dx * dx + dy * dy);
    }
    function distSqrVec2(a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return dx * dx + dy * dy;
    }
    function setRotAngle(out, a) {
        out.c = math_cos$2(a);
        out.s = math_sin$2(a);
        return out;
    }
    function rotVec2(out, q, v) {
        out.x = q.c * v.x - q.s * v.y;
        out.y = q.s * v.x + q.c * v.y;
        return out;
    }
    function invRotVec2(out, q, v) {
        var x = q.c * v.x + q.s * v.y;
        var y = -q.s * v.x + q.c * v.y;
        out.x = x;
        out.y = y;
        return out;
    }
    function rerotVec2(out, before, after, v) {
        var x0 = before.c * v.x + before.s * v.y;
        var y0 = -before.s * v.x + before.c * v.y;
        var x = after.c * x0 - after.s * y0;
        var y = after.s * x0 + after.c * y0;
        out.x = x;
        out.y = y;
        return out;
    }
    function transform(x, y, a) {
        return { p: vec2(x, y), q: rotation(a) };
    }
    function copyTransform(out, transform) {
        out.p.x = transform.p.x;
        out.p.y = transform.p.y;
        out.q.s = transform.q.s;
        out.q.c = transform.q.c;
        return out;
    }
    function transformVec2(out, xf, v) {
        var x = xf.q.c * v.x - xf.q.s * v.y + xf.p.x;
        var y = xf.q.s * v.x + xf.q.c * v.y + xf.p.y;
        out.x = x;
        out.y = y;
        return out;
    }
    function invTransformVec2(out, xf, v) {
        var px = v.x - xf.p.x;
        var py = v.y - xf.p.y;
        var x = (xf.q.c * px + xf.q.s * py);
        var y = (-xf.q.s * px + xf.q.c * py);
        out.x = x;
        out.y = y;
        return out;
    }
    function retransformVec2(out, from, to, v) {
        var x0 = from.q.c * v.x - from.q.s * v.y + from.p.x;
        var y0 = from.q.s * v.x + from.q.c * v.y + from.p.y;
        var px = x0 - to.p.x;
        var py = y0 - to.p.y;
        var x = to.q.c * px + to.q.s * py;
        var y = -to.q.s * px + to.q.c * py;
        out.x = x;
        out.y = y;
        return out;
    }
    function invTransformTransform(out, a, b) {
        var c = a.q.c * b.q.c + a.q.s * b.q.s;
        var s = a.q.c * b.q.s - a.q.s * b.q.c;
        var x = a.q.c * (b.p.x - a.p.x) + a.q.s * (b.p.y - a.p.y);
        var y = -a.q.s * (b.p.x - a.p.x) + a.q.c * (b.p.y - a.p.y);
        out.q.c = c;
        out.q.s = s;
        out.p.x = x;
        out.p.y = y;
        return out;
    }

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_sin$1 = Math.sin;
    /** @internal */ var math_cos$1 = Math.cos;
    /** @internal */ var math_atan2$1 = Math.atan2;
    var Rot = /** @class */ (function () {
        /** Initialize from an angle in radians. */
        function Rot(angle) {
            if (!(this instanceof Rot)) {
                return new Rot(angle);
            }
            if (typeof angle === 'number') {
                this.setAngle(angle);
            }
            else if (typeof angle === 'object') {
                this.setRot(angle);
            }
            else {
                this.setIdentity();
            }
        }
        /** @internal */
        Rot.neo = function (angle) {
            var obj = Object.create(Rot.prototype);
            obj.setAngle(angle);
            return obj;
        };
        Rot.clone = function (rot) {
            var obj = Object.create(Rot.prototype);
            obj.s = rot.s;
            obj.c = rot.c;
            return obj;
        };
        Rot.identity = function () {
            var obj = Object.create(Rot.prototype);
            obj.s = 0.0;
            obj.c = 1.0;
            return obj;
        };
        Rot.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return Number.isFinite(obj.s) && Number.isFinite(obj.c);
        };
        Rot.assert = function (o) {
        };
        /** Set to the identity rotation. */
        Rot.prototype.setIdentity = function () {
            this.s = 0.0;
            this.c = 1.0;
        };
        Rot.prototype.set = function (angle) {
            if (typeof angle === 'object') {
                this.s = angle.s;
                this.c = angle.c;
            }
            else {
                // TODO_ERIN optimize
                this.s = math_sin$1(angle);
                this.c = math_cos$1(angle);
            }
        };
        Rot.prototype.setRot = function (angle) {
            this.s = angle.s;
            this.c = angle.c;
        };
        /** Set using an angle in radians. */
        Rot.prototype.setAngle = function (angle) {
            // TODO_ERIN optimize
            this.s = math_sin$1(angle);
            this.c = math_cos$1(angle);
        };
        /** Get the angle in radians. */
        Rot.prototype.getAngle = function () {
            return math_atan2$1(this.s, this.c);
        };
        /** Get the x-axis. */
        Rot.prototype.getXAxis = function () {
            return Vec2.neo(this.c, this.s);
        };
        /** Get the y-axis. */
        Rot.prototype.getYAxis = function () {
            return Vec2.neo(-this.s, this.c);
        };
        Rot.mul = function (rot, m) {
            if ('c' in m && 's' in m) {
                // [qc -qs] * [rc -rs] = [qc*rc-qs*rs -qc*rs-qs*rc]
                // [qs qc] [rs rc] [qs*rc+qc*rs -qs*rs+qc*rc]
                // s = qs * rc + qc * rs
                // c = qc * rc - qs * rs
                var qr = Rot.identity();
                qr.s = rot.s * m.c + rot.c * m.s;
                qr.c = rot.c * m.c - rot.s * m.s;
                return qr;
            }
            else if ('x' in m && 'y' in m) {
                return Vec2.neo(rot.c * m.x - rot.s * m.y, rot.s * m.x + rot.c * m.y);
            }
        };
        /** Multiply two rotations: q * r */
        Rot.mulRot = function (rot, m) {
            // [qc -qs] * [rc -rs] = [qc*rc-qs*rs -qc*rs-qs*rc]
            // [qs qc] [rs rc] [qs*rc+qc*rs -qs*rs+qc*rc]
            // s = qs * rc + qc * rs
            // c = qc * rc - qs * rs
            var qr = Rot.identity();
            qr.s = rot.s * m.c + rot.c * m.s;
            qr.c = rot.c * m.c - rot.s * m.s;
            return qr;
        };
        /** Rotate a vector */
        Rot.mulVec2 = function (rot, m) {
            return Vec2.neo(rot.c * m.x - rot.s * m.y, rot.s * m.x + rot.c * m.y);
        };
        Rot.mulSub = function (rot, v, w) {
            var x = rot.c * (v.x - w.x) - rot.s * (v.y - w.y);
            var y = rot.s * (v.x - w.x) + rot.c * (v.y - w.y);
            return Vec2.neo(x, y);
        };
        Rot.mulT = function (rot, m) {
            if ('c' in m && 's' in m) {
                // [ qc qs] * [rc -rs] = [qc*rc+qs*rs -qc*rs+qs*rc]
                // [-qs qc] [rs rc] [-qs*rc+qc*rs qs*rs+qc*rc]
                // s = qc * rs - qs * rc
                // c = qc * rc + qs * rs
                var qr = Rot.identity();
                qr.s = rot.c * m.s - rot.s * m.c;
                qr.c = rot.c * m.c + rot.s * m.s;
                return qr;
            }
            else if ('x' in m && 'y' in m) {
                return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
            }
        };
        /** Transpose multiply two rotations: qT * r */
        Rot.mulTRot = function (rot, m) {
            // [ qc qs] * [rc -rs] = [qc*rc+qs*rs -qc*rs+qs*rc]
            // [-qs qc] [rs rc] [-qs*rc+qc*rs qs*rs+qc*rc]
            // s = qc * rs - qs * rc
            // c = qc * rc + qs * rs
            var qr = Rot.identity();
            qr.s = rot.c * m.s - rot.s * m.c;
            qr.c = rot.c * m.c + rot.s * m.s;
            return qr;
        };
        /** Inverse rotate a vector */
        Rot.mulTVec2 = function (rot, m) {
            return Vec2.neo(rot.c * m.x + rot.s * m.y, -rot.s * m.x + rot.c * m.y);
        };
        return Rot;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_atan2 = Math.atan2;
    /** @internal */ var math_PI$5 = Math.PI;
    /** @internal */ var temp$7 = vec2(0, 0);
    /**
     * This describes the motion of a body/shape for TOI computation. Shapes are
     * defined with respect to the body origin, which may not coincide with the
     * center of mass. However, to support dynamics we must interpolate the center
     * of mass position.
     */
    var Sweep = /** @class */ (function () {
        function Sweep() {
            /** Local center of mass position */
            this.localCenter = Vec2.zero();
            /** World center position */
            this.c = Vec2.zero();
            /** World angle */
            this.a = 0;
            /** Fraction of the current time step in the range [0,1], c0 and a0 are c and a at alpha0. */
            this.alpha0 = 0;
            this.c0 = Vec2.zero();
            this.a0 = 0;
        }
        /** @internal */
        Sweep.prototype.recycle = function () {
            zeroVec2(this.localCenter);
            zeroVec2(this.c);
            this.a = 0;
            this.alpha0 = 0;
            zeroVec2(this.c0);
            this.a0 = 0;
        };
        Sweep.prototype.setTransform = function (xf) {
            transformVec2(temp$7, xf, this.localCenter);
            copyVec2(this.c, temp$7);
            copyVec2(this.c0, temp$7);
            this.a = this.a0 = math_atan2(xf.q.s, xf.q.c);
        };
        Sweep.prototype.setLocalCenter = function (localCenter, xf) {
            copyVec2(this.localCenter, localCenter);
            transformVec2(temp$7, xf, this.localCenter);
            copyVec2(this.c, temp$7);
            copyVec2(this.c0, temp$7);
        };
        /**
         * Get the interpolated transform at a specific time.
         *
         * @param xf
         * @param beta A factor in [0,1], where 0 indicates alpha0
         */
        Sweep.prototype.getTransform = function (xf, beta) {
            if (beta === void 0) { beta = 0; }
            setRotAngle(xf.q, (1.0 - beta) * this.a0 + beta * this.a);
            combineVec2(xf.p, (1.0 - beta), this.c0, beta, this.c);
            // shift to origin
            subVec2(xf.p, rotVec2(temp$7, xf.q, this.localCenter));
        };
        /**
         * Advance the sweep forward, yielding a new initial state.
         *
         * @param alpha The new initial time
         */
        Sweep.prototype.advance = function (alpha) {
            var beta = (alpha - this.alpha0) / (1.0 - this.alpha0);
            combineVec2(this.c0, beta, this.c, 1 - beta, this.c0);
            this.a0 = beta * this.a + (1 - beta) * this.a0;
            this.alpha0 = alpha;
        };
        Sweep.prototype.forward = function () {
            this.a0 = this.a;
            copyVec2(this.c0, this.c);
        };
        /**
         * normalize the angles in radians to be between -pi and pi.
         */
        Sweep.prototype.normalize = function () {
            var a0 = mod(this.a0, -math_PI$5, +math_PI$5);
            this.a -= this.a0 - a0;
            this.a0 = a0;
        };
        Sweep.prototype.set = function (that) {
            copyVec2(this.localCenter, that.localCenter);
            copyVec2(this.c, that.c);
            this.a = that.a;
            this.alpha0 = that.alpha0;
            copyVec2(this.c0, that.c0);
            this.a0 = that.a0;
        };
        return Sweep;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /**
     * A transform contains translation and rotation. It is used to represent the
     * position and orientation of rigid frames. Initialize using a position vector
     * and a rotation.
     */
    var Transform = /** @class */ (function () {
        function Transform(position, rotation) {
            if (!(this instanceof Transform)) {
                return new Transform(position, rotation);
            }
            this.p = Vec2.zero();
            this.q = Rot.identity();
            if (typeof position !== 'undefined') {
                this.p.setVec2(position);
            }
            if (typeof rotation !== 'undefined') {
                this.q.setAngle(rotation);
            }
        }
        Transform.clone = function (xf) {
            var obj = Object.create(Transform.prototype);
            obj.p = Vec2.clone(xf.p);
            obj.q = Rot.clone(xf.q);
            return obj;
        };
        /** @internal */
        Transform.neo = function (position, rotation) {
            var obj = Object.create(Transform.prototype);
            obj.p = Vec2.clone(position);
            obj.q = Rot.clone(rotation);
            return obj;
        };
        Transform.identity = function () {
            var obj = Object.create(Transform.prototype);
            obj.p = Vec2.zero();
            obj.q = Rot.identity();
            return obj;
        };
        /** Set this to the identity transform */
        Transform.prototype.setIdentity = function () {
            this.p.setZero();
            this.q.setIdentity();
        };
        Transform.prototype.set = function (a, b) {
            if (typeof b === 'undefined') {
                this.p.set(a.p);
                this.q.set(a.q);
            }
            else {
                this.p.set(a);
                this.q.set(b);
            }
        };
        /** Set position and angle */
        Transform.prototype.setNum = function (position, rotation) {
            this.p.setVec2(position);
            this.q.setAngle(rotation);
        };
        Transform.prototype.setTransform = function (xf) {
            this.p.setVec2(xf.p);
            this.q.setRot(xf.q);
        };
        Transform.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return Vec2.isValid(obj.p) && Rot.isValid(obj.q);
        };
        Transform.assert = function (o) {
        };
        // static mul(a: Transform, b: Vec2Value[]): Vec2[];
        // static mul(a: Transform, b: Transform[]): Transform[];
        Transform.mul = function (a, b) {
            if (Array.isArray(b)) {
                var arr = [];
                for (var i = 0; i < b.length; i++) {
                    arr[i] = Transform.mul(a, b[i]);
                }
                return arr;
            }
            else if ('x' in b && 'y' in b) {
                return Transform.mulVec2(a, b);
            }
            else if ('p' in b && 'q' in b) {
                return Transform.mulXf(a, b);
            }
        };
        Transform.mulAll = function (a, b) {
            var arr = [];
            for (var i = 0; i < b.length; i++) {
                arr[i] = Transform.mul(a, b[i]);
            }
            return arr;
        };
        /** @internal @deprecated */
        Transform.mulFn = function (a) {
            return function (b) {
                return Transform.mul(a, b);
            };
        };
        Transform.mulVec2 = function (a, b) {
            var x = (a.q.c * b.x - a.q.s * b.y) + a.p.x;
            var y = (a.q.s * b.x + a.q.c * b.y) + a.p.y;
            return Vec2.neo(x, y);
        };
        Transform.mulXf = function (a, b) {
            // v2 = A.q.Rot(B.q.Rot(v1) + B.p) + A.p
            // = (A.q * B.q).Rot(v1) + A.q.Rot(B.p) + A.p
            var xf = Transform.identity();
            xf.q = Rot.mulRot(a.q, b.q);
            xf.p = Vec2.add(Rot.mulVec2(a.q, b.p), a.p);
            return xf;
        };
        Transform.mulT = function (a, b) {
            if ('x' in b && 'y' in b) {
                return Transform.mulTVec2(a, b);
            }
            else if ('p' in b && 'q' in b) {
                return Transform.mulTXf(a, b);
            }
        };
        Transform.mulTVec2 = function (a, b) {
            var px = b.x - a.p.x;
            var py = b.y - a.p.y;
            var x = (a.q.c * px + a.q.s * py);
            var y = (-a.q.s * px + a.q.c * py);
            return Vec2.neo(x, y);
        };
        Transform.mulTXf = function (a, b) {
            // v2 = A.q' * (B.q * v1 + B.p - A.p)
            // = A.q' * B.q * v1 + A.q' * (B.p - A.p)
            var xf = Transform.identity();
            xf.q.setRot(Rot.mulTRot(a.q, b.q));
            xf.p.setVec2(Rot.mulTVec2(a.q, Vec2.sub(b.p, a.p)));
            return xf;
        };
        return Transform;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    var Velocity = /** @class */ (function () {
        function Velocity() {
            /** linear */
            this.v = Vec2.zero();
            /** angular */
            this.w = 0;
        }
        return Velocity;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_sin = Math.sin;
    /** @internal */ var math_cos = Math.cos;
    var Position = /** @class */ (function () {
        function Position() {
            /** location */
            this.c = Vec2.zero();
            /** angle */
            this.a = 0;
        }
        // todo: cache sin/cos
        Position.prototype.getTransform = function (xf, p) {
            // xf.q = rotation(this.a);
            // xf.p = this.c - xf.q * p
            xf.q.c = math_cos(this.a);
            xf.q.s = math_sin(this.a);
            xf.p.x = this.c.x - (xf.q.c * p.x - xf.q.s * p.y);
            xf.p.y = this.c.y - (xf.q.s * p.x + xf.q.c * p.y);
            return xf;
        };
        return Position;
    }());
    function getTransform(xf, p, c, a) {
        // xf.q = rotation(a);
        // xf.p = this.c - xf.q * p
        xf.q.c = math_cos(a);
        xf.q.s = math_sin(a);
        xf.p.x = c.x - (xf.q.c * p.x - xf.q.s * p.y);
        xf.p.y = c.y - (xf.q.s * p.x + xf.q.c * p.y);
        return xf;
    }

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    // todo make shape an interface
    /**
     * A shape is used for collision detection. You can create a shape however you
     * like. Shapes used for simulation in World are created automatically when a
     * Fixture is created. Shapes may encapsulate one or more child shapes.
     */
    var Shape = /** @class */ (function () {
        function Shape() {
        }
        Shape.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return typeof obj.m_type === 'string' && typeof obj.m_radius === 'number';
        };
        return Shape;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var synchronize_aabb1 = new AABB();
    /** @internal */ var synchronize_aabb2 = new AABB();
    /** @internal */ var displacement = vec2(0, 0);
    /** @internal */ var FixtureDefDefault = {
        userData: null,
        friction: 0.2,
        restitution: 0.0,
        density: 0.0,
        isSensor: false,
        filterGroupIndex: 0,
        filterCategoryBits: 0x0001,
        filterMaskBits: 0xFFFF
    };
    /**
     * This proxy is used internally to connect shape children to the broad-phase.
     */
    var FixtureProxy = /** @class */ (function () {
        function FixtureProxy(fixture, childIndex) {
            this.aabb = new AABB();
            this.fixture = fixture;
            this.childIndex = childIndex;
            this.proxyId;
        }
        return FixtureProxy;
    }());
    /**
     * A fixture is used to attach a shape to a body for collision detection. A
     * fixture inherits its transform from its parent. Fixtures hold additional
     * non-geometric data such as friction, collision filters, etc.
     *
     * To create a new Fixture use {@link Body.createFixture}.
     */
    var Fixture = /** @class */ (function () {
        /** @internal */
        function Fixture(body, shape, def) {
            if (shape.shape) {
                def = shape;
                shape = shape.shape;
            }
            else if (typeof def === 'number') {
                def = { density: def };
            }
            def = options(def, FixtureDefDefault);
            this.m_body = body;
            this.m_friction = def.friction;
            this.m_restitution = def.restitution;
            this.m_density = def.density;
            this.m_isSensor = def.isSensor;
            this.m_filterGroupIndex = def.filterGroupIndex;
            this.m_filterCategoryBits = def.filterCategoryBits;
            this.m_filterMaskBits = def.filterMaskBits;
            // TODO validate shape
            this.m_shape = shape; // .clone();
            this.m_next = null;
            this.m_proxies = [];
            this.m_proxyCount = 0;
            // fixture proxies are created here,
            // but they are activate in when a fixture is added to body
            var childCount = this.m_shape.getChildCount();
            for (var i = 0; i < childCount; ++i) {
                this.m_proxies[i] = new FixtureProxy(this, i);
            }
            this.m_userData = def.userData;
        }
        /** @internal Re-setup fixture. */
        Fixture.prototype._reset = function () {
            var body = this.getBody();
            var broadPhase = body.m_world.m_broadPhase;
            this.destroyProxies(broadPhase);
            if (this.m_shape._reset) {
                this.m_shape._reset();
            }
            var childCount = this.m_shape.getChildCount();
            for (var i = 0; i < childCount; ++i) {
                this.m_proxies[i] = new FixtureProxy(this, i);
            }
            this.createProxies(broadPhase, body.m_xf);
            body.resetMassData();
        };
        /** @internal */
        Fixture.prototype._serialize = function () {
            return {
                friction: this.m_friction,
                restitution: this.m_restitution,
                density: this.m_density,
                isSensor: this.m_isSensor,
                filterGroupIndex: this.m_filterGroupIndex,
                filterCategoryBits: this.m_filterCategoryBits,
                filterMaskBits: this.m_filterMaskBits,
                shape: this.m_shape,
            };
        };
        /** @internal */
        Fixture._deserialize = function (data, body, restore) {
            var shape = restore(Shape, data.shape);
            var fixture = shape && new Fixture(body, shape, data);
            return fixture;
        };
        /**
         * Get the type of the child shape. You can use this to down cast to the
         * concrete shape.
         */
        Fixture.prototype.getType = function () {
            return this.m_shape.m_type;
        };
        /**
         * Get the child shape. You can modify the child shape, however you should not
         * change the number of vertices because this will crash some collision caching
         * mechanisms. Manipulating the shape may lead to non-physical behavior.
         */
        Fixture.prototype.getShape = function () {
            return this.m_shape;
        };
        /**
         * A sensor shape collects contact information but never generates a collision
         * response.
         */
        Fixture.prototype.isSensor = function () {
            return this.m_isSensor;
        };
        /**
         * Set if this fixture is a sensor.
         */
        Fixture.prototype.setSensor = function (sensor) {
            if (sensor != this.m_isSensor) {
                this.m_body.setAwake(true);
                this.m_isSensor = sensor;
            }
        };
        // /**
        //  * Get the contact filtering data.
        //  */
        // getFilterData() {
        //   return this.m_filter;
        // }
        /**
         * Get the user data that was assigned in the fixture definition. Use this to
         * store your application specific data.
         */
        Fixture.prototype.getUserData = function () {
            return this.m_userData;
        };
        /**
         * Set the user data. Use this to store your application specific data.
         */
        Fixture.prototype.setUserData = function (data) {
            this.m_userData = data;
        };
        /**
         * Get the parent body of this fixture. This is null if the fixture is not
         * attached.
         */
        Fixture.prototype.getBody = function () {
            return this.m_body;
        };
        /**
         * Get the next fixture in the parent body's fixture list.
         */
        Fixture.prototype.getNext = function () {
            return this.m_next;
        };
        /**
         * Get the density of this fixture.
         */
        Fixture.prototype.getDensity = function () {
            return this.m_density;
        };
        /**
         * Set the density of this fixture. This will _not_ automatically adjust the
         * mass of the body. You must call Body.resetMassData to update the body's mass.
         */
        Fixture.prototype.setDensity = function (density) {
            this.m_density = density;
        };
        /**
         * Get the coefficient of friction, usually in the range [0,1].
         */
        Fixture.prototype.getFriction = function () {
            return this.m_friction;
        };
        /**
         * Set the coefficient of friction. This will not change the friction of
         * existing contacts.
         */
        Fixture.prototype.setFriction = function (friction) {
            this.m_friction = friction;
        };
        /**
         * Get the coefficient of restitution.
         */
        Fixture.prototype.getRestitution = function () {
            return this.m_restitution;
        };
        /**
         * Set the coefficient of restitution. This will not change the restitution of
         * existing contacts.
         */
        Fixture.prototype.setRestitution = function (restitution) {
            this.m_restitution = restitution;
        };
        /**
         * Test a point in world coordinates for containment in this fixture.
         */
        Fixture.prototype.testPoint = function (p) {
            return this.m_shape.testPoint(this.m_body.getTransform(), p);
        };
        /**
         * Cast a ray against this shape.
         */
        Fixture.prototype.rayCast = function (output, input, childIndex) {
            return this.m_shape.rayCast(output, input, this.m_body.getTransform(), childIndex);
        };
        /**
         * Get the mass data for this fixture. The mass data is based on the density and
         * the shape. The rotational inertia is about the shape's origin. This operation
         * may be expensive.
         */
        Fixture.prototype.getMassData = function (massData) {
            this.m_shape.computeMass(massData, this.m_density);
        };
        /**
         * Get the fixture's AABB. This AABB may be enlarge and/or stale. If you need a
         * more accurate AABB, compute it using the shape and the body transform.
         */
        Fixture.prototype.getAABB = function (childIndex) {
            return this.m_proxies[childIndex].aabb;
        };
        /**
         * These support body activation/deactivation.
         */
        Fixture.prototype.createProxies = function (broadPhase, xf) {
            // Create proxies in the broad-phase.
            this.m_proxyCount = this.m_shape.getChildCount();
            for (var i = 0; i < this.m_proxyCount; ++i) {
                var proxy = this.m_proxies[i];
                this.m_shape.computeAABB(proxy.aabb, xf, i);
                proxy.proxyId = broadPhase.createProxy(proxy.aabb, proxy);
            }
        };
        Fixture.prototype.destroyProxies = function (broadPhase) {
            // Destroy proxies in the broad-phase.
            for (var i = 0; i < this.m_proxyCount; ++i) {
                var proxy = this.m_proxies[i];
                broadPhase.destroyProxy(proxy.proxyId);
                proxy.proxyId = null;
            }
            this.m_proxyCount = 0;
        };
        /**
         * Updates this fixture proxy in broad-phase (with combined AABB of current and
         * next transformation).
         */
        Fixture.prototype.synchronize = function (broadPhase, xf1, xf2) {
            for (var i = 0; i < this.m_proxyCount; ++i) {
                var proxy = this.m_proxies[i];
                // Compute an AABB that covers the swept shape (may miss some rotation
                // effect).
                this.m_shape.computeAABB(synchronize_aabb1, xf1, proxy.childIndex);
                this.m_shape.computeAABB(synchronize_aabb2, xf2, proxy.childIndex);
                proxy.aabb.combine(synchronize_aabb1, synchronize_aabb2);
                diffVec2(displacement, xf2.p, xf1.p);
                broadPhase.moveProxy(proxy.proxyId, proxy.aabb, displacement);
            }
        };
        /**
         * Set the contact filtering data. This will not update contacts until the next
         * time step when either parent body is active and awake. This automatically
         * calls refilter.
         */
        Fixture.prototype.setFilterData = function (filter) {
            this.m_filterGroupIndex = filter.groupIndex;
            this.m_filterCategoryBits = filter.categoryBits;
            this.m_filterMaskBits = filter.maskBits;
            this.refilter();
        };
        Fixture.prototype.getFilterGroupIndex = function () {
            return this.m_filterGroupIndex;
        };
        Fixture.prototype.setFilterGroupIndex = function (groupIndex) {
            this.m_filterGroupIndex = groupIndex;
            this.refilter();
        };
        Fixture.prototype.getFilterCategoryBits = function () {
            return this.m_filterCategoryBits;
        };
        Fixture.prototype.setFilterCategoryBits = function (categoryBits) {
            this.m_filterCategoryBits = categoryBits;
            this.refilter();
        };
        Fixture.prototype.getFilterMaskBits = function () {
            return this.m_filterMaskBits;
        };
        Fixture.prototype.setFilterMaskBits = function (maskBits) {
            this.m_filterMaskBits = maskBits;
            this.refilter();
        };
        /**
         * Call this if you want to establish collision that was previously disabled by
         * ContactFilter.
         */
        Fixture.prototype.refilter = function () {
            if (this.m_body == null) {
                return;
            }
            // Flag associated contacts for filtering.
            var edge = this.m_body.getContactList();
            while (edge) {
                var contact = edge.contact;
                var fixtureA = contact.getFixtureA();
                var fixtureB = contact.getFixtureB();
                if (fixtureA == this || fixtureB == this) {
                    contact.flagForFiltering();
                }
                edge = edge.next;
            }
            var world = this.m_body.getWorld();
            if (world == null) {
                return;
            }
            // Touch each proxy so that new pairs may be created
            var broadPhase = world.m_broadPhase;
            for (var i = 0; i < this.m_proxyCount; ++i) {
                broadPhase.touchProxy(this.m_proxies[i].proxyId);
            }
        };
        /**
         * Implement this method to provide collision filtering, if you want finer
         * control over contact creation.
         *
         * Return true if contact calculations should be performed between these two
         * fixtures.
         *
         * Warning: for performance reasons this is only called when the AABBs begin to
         * overlap.
         */
        Fixture.prototype.shouldCollide = function (that) {
            if (that.m_filterGroupIndex === this.m_filterGroupIndex && that.m_filterGroupIndex !== 0) {
                return that.m_filterGroupIndex > 0;
            }
            var collideA = (that.m_filterMaskBits & this.m_filterCategoryBits) !== 0;
            var collideB = (that.m_filterCategoryBits & this.m_filterMaskBits) !== 0;
            var collide = collideA && collideB;
            return collide;
        };
        return Fixture;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var STATIC = 'static';
    /** @internal */ var KINEMATIC = 'kinematic';
    /** @internal */ var DYNAMIC = 'dynamic';
    /** @internal */ var oldCenter = vec2(0, 0);
    /** @internal */ var localCenter = vec2(0, 0);
    /** @internal */ var shift = vec2(0, 0);
    /** @internal */ var temp$6 = vec2(0, 0);
    /** @internal */ var xf$2 = transform(0, 0, 0);
    /** @internal */ var BodyDefDefault = {
        type: STATIC,
        position: Vec2.zero(),
        angle: 0.0,
        linearVelocity: Vec2.zero(),
        angularVelocity: 0.0,
        linearDamping: 0.0,
        angularDamping: 0.0,
        fixedRotation: false,
        bullet: false,
        gravityScale: 1.0,
        allowSleep: true,
        awake: true,
        active: true,
        userData: null
    };
    /**
     * A rigid body composed of one or more fixtures.
     *
     * To create a new Body use {@link World.createBody}.
     */
    var Body = /** @class */ (function () {
        /** @internal */
        function Body(world, def) {
            def = options(def, BodyDefDefault);
            this.m_world = world;
            this.m_awakeFlag = def.awake;
            this.m_autoSleepFlag = def.allowSleep;
            this.m_bulletFlag = def.bullet;
            this.m_fixedRotationFlag = def.fixedRotation;
            this.m_activeFlag = def.active;
            this.m_islandFlag = false;
            this.m_toiFlag = false;
            this.m_userData = def.userData;
            this.m_type = def.type;
            if (this.m_type == DYNAMIC) {
                this.m_mass = 1.0;
                this.m_invMass = 1.0;
            }
            else {
                this.m_mass = 0.0;
                this.m_invMass = 0.0;
            }
            // Rotational inertia about the center of mass.
            this.m_I = 0.0;
            this.m_invI = 0.0;
            // the body origin transform
            this.m_xf = Transform.identity();
            this.m_xf.p.setVec2(def.position);
            this.m_xf.q.setAngle(def.angle);
            // the swept motion for CCD
            this.m_sweep = new Sweep();
            this.m_sweep.setTransform(this.m_xf);
            // position and velocity correction
            this.c_velocity = new Velocity();
            this.c_position = new Position();
            this.m_force = Vec2.zero();
            this.m_torque = 0.0;
            this.m_linearVelocity = Vec2.clone(def.linearVelocity);
            this.m_angularVelocity = def.angularVelocity;
            this.m_linearDamping = def.linearDamping;
            this.m_angularDamping = def.angularDamping;
            this.m_gravityScale = def.gravityScale;
            this.m_sleepTime = 0.0;
            this.m_jointList = null;
            this.m_contactList = null;
            this.m_fixtureList = null;
            this.m_prev = null;
            this.m_next = null;
            this.m_destroyed = false;
        }
        /** @internal */
        Body.prototype._serialize = function () {
            var fixtures = [];
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                fixtures.push(f);
            }
            return {
                type: this.m_type,
                bullet: this.m_bulletFlag,
                position: this.m_xf.p,
                angle: this.m_xf.q.getAngle(),
                linearVelocity: this.m_linearVelocity,
                angularVelocity: this.m_angularVelocity,
                fixtures: fixtures,
            };
        };
        /** @internal */
        Body._deserialize = function (data, world, restore) {
            var body = new Body(world, data);
            if (data.fixtures) {
                for (var i = data.fixtures.length - 1; i >= 0; i--) {
                    var fixture = restore(Fixture, data.fixtures[i], body);
                    body._addFixture(fixture);
                }
            }
            return body;
        };
        Body.prototype.isWorldLocked = function () {
            return this.m_world && this.m_world.isLocked() ? true : false;
        };
        Body.prototype.getWorld = function () {
            return this.m_world;
        };
        Body.prototype.getNext = function () {
            return this.m_next;
        };
        Body.prototype.setUserData = function (data) {
            this.m_userData = data;
        };
        Body.prototype.getUserData = function () {
            return this.m_userData;
        };
        Body.prototype.getFixtureList = function () {
            return this.m_fixtureList;
        };
        Body.prototype.getJointList = function () {
            return this.m_jointList;
        };
        /**
         * Warning: this list changes during the time step and you may miss some
         * collisions if you don't use ContactListener.
         */
        Body.prototype.getContactList = function () {
            return this.m_contactList;
        };
        Body.prototype.isStatic = function () {
            return this.m_type == STATIC;
        };
        Body.prototype.isDynamic = function () {
            return this.m_type == DYNAMIC;
        };
        Body.prototype.isKinematic = function () {
            return this.m_type == KINEMATIC;
        };
        /**
         * This will alter the mass and velocity.
         */
        Body.prototype.setStatic = function () {
            this.setType(STATIC);
            return this;
        };
        Body.prototype.setDynamic = function () {
            this.setType(DYNAMIC);
            return this;
        };
        Body.prototype.setKinematic = function () {
            this.setType(KINEMATIC);
            return this;
        };
        /**
         * Get the type of the body.
         */
        Body.prototype.getType = function () {
            return this.m_type;
        };
        /**
         * Set the type of the body to "static", "kinematic" or "dynamic".
         * @param type The type of the body.
         */
        Body.prototype.setType = function (type) {
            if (this.isWorldLocked() == true) {
                return;
            }
            if (this.m_type == type) {
                return;
            }
            this.m_type = type;
            this.resetMassData();
            if (this.m_type == STATIC) {
                this.m_linearVelocity.setZero();
                this.m_angularVelocity = 0.0;
                this.m_sweep.forward();
                this.synchronizeFixtures();
            }
            this.setAwake(true);
            this.m_force.setZero();
            this.m_torque = 0.0;
            // Delete the attached contacts.
            var ce = this.m_contactList;
            while (ce) {
                var ce0 = ce;
                ce = ce.next;
                this.m_world.destroyContact(ce0.contact);
            }
            this.m_contactList = null;
            // Touch the proxies so that new contacts will be created (when appropriate)
            var broadPhase = this.m_world.m_broadPhase;
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                for (var i = 0; i < f.m_proxyCount; ++i) {
                    broadPhase.touchProxy(f.m_proxies[i].proxyId);
                }
            }
        };
        Body.prototype.isBullet = function () {
            return this.m_bulletFlag;
        };
        /**
         * Should this body be treated like a bullet for continuous collision detection?
         */
        Body.prototype.setBullet = function (flag) {
            this.m_bulletFlag = !!flag;
        };
        Body.prototype.isSleepingAllowed = function () {
            return this.m_autoSleepFlag;
        };
        Body.prototype.setSleepingAllowed = function (flag) {
            this.m_autoSleepFlag = !!flag;
            if (this.m_autoSleepFlag == false) {
                this.setAwake(true);
            }
        };
        Body.prototype.isAwake = function () {
            return this.m_awakeFlag;
        };
        /**
         * Set the sleep state of the body. A sleeping body has very low CPU cost.
         *
         * @param flag Set to true to wake the body, false to put it to sleep.
         */
        Body.prototype.setAwake = function (flag) {
            if (flag) {
                this.m_awakeFlag = true;
                this.m_sleepTime = 0.0;
            }
            else {
                this.m_awakeFlag = false;
                this.m_sleepTime = 0.0;
                this.m_linearVelocity.setZero();
                this.m_angularVelocity = 0.0;
                this.m_force.setZero();
                this.m_torque = 0.0;
            }
        };
        Body.prototype.isActive = function () {
            return this.m_activeFlag;
        };
        /**
         * Set the active state of the body. An inactive body is not simulated and
         * cannot be collided with or woken up. If you pass a flag of true, all fixtures
         * will be added to the broad-phase. If you pass a flag of false, all fixtures
         * will be removed from the broad-phase and all contacts will be destroyed.
         * Fixtures and joints are otherwise unaffected.
         *
         * You may continue to create/destroy fixtures and joints on inactive bodies.
         * Fixtures on an inactive body are implicitly inactive and will not participate
         * in collisions, ray-casts, or queries. Joints connected to an inactive body
         * are implicitly inactive. An inactive body is still owned by a World object
         * and remains
         */
        Body.prototype.setActive = function (flag) {
            if (flag == this.m_activeFlag) {
                return;
            }
            this.m_activeFlag = !!flag;
            if (this.m_activeFlag) {
                // Create all proxies.
                var broadPhase = this.m_world.m_broadPhase;
                for (var f = this.m_fixtureList; f; f = f.m_next) {
                    f.createProxies(broadPhase, this.m_xf);
                }
                // Contacts are created at the beginning of the next
                this.m_world.m_newFixture = true;
            }
            else {
                // Destroy all proxies.
                var broadPhase = this.m_world.m_broadPhase;
                for (var f = this.m_fixtureList; f; f = f.m_next) {
                    f.destroyProxies(broadPhase);
                }
                // Destroy the attached contacts.
                var ce = this.m_contactList;
                while (ce) {
                    var ce0 = ce;
                    ce = ce.next;
                    this.m_world.destroyContact(ce0.contact);
                }
                this.m_contactList = null;
            }
        };
        Body.prototype.isFixedRotation = function () {
            return this.m_fixedRotationFlag;
        };
        /**
         * Set this body to have fixed rotation. This causes the mass to be reset.
         */
        Body.prototype.setFixedRotation = function (flag) {
            if (this.m_fixedRotationFlag == flag) {
                return;
            }
            this.m_fixedRotationFlag = !!flag;
            this.m_angularVelocity = 0.0;
            this.resetMassData();
        };
        /**
         * Get the world transform for the body's origin.
         */
        Body.prototype.getTransform = function () {
            return this.m_xf;
        };
        /**
         * Set the position of the body's origin and rotation. Manipulating a body's
         * transform may cause non-physical behavior. Note: contacts are updated on the
         * next call to World.step.
         *
         * @param position The world position of the body's local origin.
         * @param angle The world rotation in radians.
         */
        Body.prototype.setTransform = function (position, angle) {
            if (this.isWorldLocked() == true) {
                return;
            }
            this.m_xf.setNum(position, angle);
            this.m_sweep.setTransform(this.m_xf);
            var broadPhase = this.m_world.m_broadPhase;
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                f.synchronize(broadPhase, this.m_xf, this.m_xf);
            }
            this.setAwake(true);
        };
        Body.prototype.synchronizeTransform = function () {
            this.m_sweep.getTransform(this.m_xf, 1);
        };
        /**
         * Update fixtures in broad-phase.
         */
        Body.prototype.synchronizeFixtures = function () {
            this.m_sweep.getTransform(xf$2, 0);
            var broadPhase = this.m_world.m_broadPhase;
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                f.synchronize(broadPhase, xf$2, this.m_xf);
            }
        };
        /**
         * Used in TOI.
         */
        Body.prototype.advance = function (alpha) {
            // Advance to the new safe time. This doesn't sync the broad-phase.
            this.m_sweep.advance(alpha);
            copyVec2(this.m_sweep.c, this.m_sweep.c0);
            this.m_sweep.a = this.m_sweep.a0;
            this.m_sweep.getTransform(this.m_xf, 1);
        };
        /**
         * Get the world position for the body's origin.
         */
        Body.prototype.getPosition = function () {
            return this.m_xf.p;
        };
        Body.prototype.setPosition = function (p) {
            this.setTransform(p, this.m_sweep.a);
        };
        /**
         * Get the current world rotation angle in radians.
         */
        Body.prototype.getAngle = function () {
            return this.m_sweep.a;
        };
        Body.prototype.setAngle = function (angle) {
            this.setTransform(this.m_xf.p, angle);
        };
        /**
         * Get the world position of the center of mass.
         */
        Body.prototype.getWorldCenter = function () {
            return this.m_sweep.c;
        };
        /**
         * Get the local position of the center of mass.
         */
        Body.prototype.getLocalCenter = function () {
            return this.m_sweep.localCenter;
        };
        /**
         * Get the linear velocity of the center of mass.
         *
         * @return the linear velocity of the center of mass.
         */
        Body.prototype.getLinearVelocity = function () {
            return this.m_linearVelocity;
        };
        /**
         * Get the world linear velocity of a world point attached to this body.
         *
         * @param worldPoint A point in world coordinates.
         */
        Body.prototype.getLinearVelocityFromWorldPoint = function (worldPoint) {
            var localCenter = Vec2.sub(worldPoint, this.m_sweep.c);
            return Vec2.add(this.m_linearVelocity, Vec2.crossNumVec2(this.m_angularVelocity, localCenter));
        };
        /**
         * Get the world velocity of a local point.
         *
         * @param localPoint A point in local coordinates.
         */
        Body.prototype.getLinearVelocityFromLocalPoint = function (localPoint) {
            return this.getLinearVelocityFromWorldPoint(this.getWorldPoint(localPoint));
        };
        /**
         * Set the linear velocity of the center of mass.
         *
         * @param v The new linear velocity of the center of mass.
         */
        Body.prototype.setLinearVelocity = function (v) {
            if (this.m_type == STATIC) {
                return;
            }
            if (Vec2.dot(v, v) > 0.0) {
                this.setAwake(true);
            }
            this.m_linearVelocity.setVec2(v);
        };
        /**
         * Get the angular velocity.
         *
         * @returns the angular velocity in radians/second.
         */
        Body.prototype.getAngularVelocity = function () {
            return this.m_angularVelocity;
        };
        /**
         * Set the angular velocity.
         *
         * @param omega The new angular velocity in radians/second.
         */
        Body.prototype.setAngularVelocity = function (w) {
            if (this.m_type == STATIC) {
                return;
            }
            if (w * w > 0.0) {
                this.setAwake(true);
            }
            this.m_angularVelocity = w;
        };
        Body.prototype.getLinearDamping = function () {
            return this.m_linearDamping;
        };
        Body.prototype.setLinearDamping = function (linearDamping) {
            this.m_linearDamping = linearDamping;
        };
        Body.prototype.getAngularDamping = function () {
            return this.m_angularDamping;
        };
        Body.prototype.setAngularDamping = function (angularDamping) {
            this.m_angularDamping = angularDamping;
        };
        Body.prototype.getGravityScale = function () {
            return this.m_gravityScale;
        };
        /**
         * Scale the gravity applied to this body.
         */
        Body.prototype.setGravityScale = function (scale) {
            this.m_gravityScale = scale;
        };
        /**
         * Get the total mass of the body.
         *
         * @returns The mass, usually in kilograms (kg).
         */
        Body.prototype.getMass = function () {
            return this.m_mass;
        };
        /**
         * Get the rotational inertia of the body about the local origin.
         *
         * @return the rotational inertia, usually in kg-m^2.
         */
        Body.prototype.getInertia = function () {
            return this.m_I + this.m_mass
                * Vec2.dot(this.m_sweep.localCenter, this.m_sweep.localCenter);
        };
        /**
         * Copy the mass data of the body to data.
         */
        Body.prototype.getMassData = function (data) {
            data.mass = this.m_mass;
            data.I = this.getInertia();
            copyVec2(data.center, this.m_sweep.localCenter);
        };
        /**
         * This resets the mass properties to the sum of the mass properties of the
         * fixtures. This normally does not need to be called unless you called
         * SetMassData to override the mass and you later want to reset the mass.
         */
        Body.prototype.resetMassData = function () {
            // Compute mass data from shapes. Each shape has its own density.
            this.m_mass = 0.0;
            this.m_invMass = 0.0;
            this.m_I = 0.0;
            this.m_invI = 0.0;
            zeroVec2(this.m_sweep.localCenter);
            // Static and kinematic bodies have zero mass.
            if (this.isStatic() || this.isKinematic()) {
                copyVec2(this.m_sweep.c0, this.m_xf.p);
                copyVec2(this.m_sweep.c, this.m_xf.p);
                this.m_sweep.a0 = this.m_sweep.a;
                return;
            }
            // Accumulate mass over all fixtures.
            zeroVec2(localCenter);
            for (var f = this.m_fixtureList; f; f = f.m_next) {
                if (f.m_density == 0.0) {
                    continue;
                }
                var massData = {
                    mass: 0,
                    center: vec2(0, 0),
                    I: 0
                };
                f.getMassData(massData);
                this.m_mass += massData.mass;
                addMulVec2(localCenter, massData.mass, massData.center);
                this.m_I += massData.I;
            }
            // Compute center of mass.
            if (this.m_mass > 0.0) {
                this.m_invMass = 1.0 / this.m_mass;
                setMulVec2(localCenter, this.m_invMass, localCenter);
            }
            else {
                // Force all dynamic bodies to have a positive mass.
                this.m_mass = 1.0;
                this.m_invMass = 1.0;
            }
            if (this.m_I > 0.0 && this.m_fixedRotationFlag == false) {
                // Center the inertia about the center of mass.
                this.m_I -= this.m_mass * dotVec2(localCenter, localCenter);
                this.m_invI = 1.0 / this.m_I;
            }
            else {
                this.m_I = 0.0;
                this.m_invI = 0.0;
            }
            // Move center of mass.
            copyVec2(oldCenter, this.m_sweep.c);
            this.m_sweep.setLocalCenter(localCenter, this.m_xf);
            // Update center of mass velocity.
            diffVec2(shift, this.m_sweep.c, oldCenter);
            crossNumVec2(temp$6, this.m_angularVelocity, shift);
            addVec2(this.m_linearVelocity, temp$6);
        };
        /**
         * Set the mass properties to override the mass properties of the fixtures. Note
         * that this changes the center of mass position. Note that creating or
         * destroying fixtures can also alter the mass. This function has no effect if
         * the body isn't dynamic.
         *
         * @param massData The mass properties.
         */
        Body.prototype.setMassData = function (massData) {
            if (this.isWorldLocked() == true) {
                return;
            }
            if (this.m_type != DYNAMIC) {
                return;
            }
            this.m_invMass = 0.0;
            this.m_I = 0.0;
            this.m_invI = 0.0;
            this.m_mass = massData.mass;
            if (this.m_mass <= 0.0) {
                this.m_mass = 1.0;
            }
            this.m_invMass = 1.0 / this.m_mass;
            if (massData.I > 0.0 && this.m_fixedRotationFlag == false) {
                this.m_I = massData.I - this.m_mass * dotVec2(massData.center, massData.center);
                this.m_invI = 1.0 / this.m_I;
            }
            // Move center of mass.
            copyVec2(oldCenter, this.m_sweep.c);
            this.m_sweep.setLocalCenter(massData.center, this.m_xf);
            // Update center of mass velocity.
            diffVec2(shift, this.m_sweep.c, oldCenter);
            crossNumVec2(temp$6, this.m_angularVelocity, shift);
            addVec2(this.m_linearVelocity, temp$6);
        };
        /**
         * Apply a force at a world point. If the force is not applied at the center of
         * mass, it will generate a torque and affect the angular velocity. This wakes
         * up the body.
         *
         * @param force The world force vector, usually in Newtons (N).
         * @param point The world position of the point of application.
         * @param wake Also wake up the body
         */
        Body.prototype.applyForce = function (force, point, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type != DYNAMIC) {
                return;
            }
            if (wake && this.m_awakeFlag == false) {
                this.setAwake(true);
            }
            // Don't accumulate a force if the body is sleeping.
            if (this.m_awakeFlag) {
                this.m_force.add(force);
                this.m_torque += Vec2.crossVec2Vec2(Vec2.sub(point, this.m_sweep.c), force);
            }
        };
        /**
         * Apply a force to the center of mass. This wakes up the body.
         *
         * @param force The world force vector, usually in Newtons (N).
         * @param wake Also wake up the body
         */
        Body.prototype.applyForceToCenter = function (force, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type != DYNAMIC) {
                return;
            }
            if (wake && this.m_awakeFlag == false) {
                this.setAwake(true);
            }
            // Don't accumulate a force if the body is sleeping
            if (this.m_awakeFlag) {
                this.m_force.add(force);
            }
        };
        /**
         * Apply a torque. This affects the angular velocity without affecting the
         * linear velocity of the center of mass. This wakes up the body.
         *
         * @param torque About the z-axis (out of the screen), usually in N-m.
         * @param wake Also wake up the body
         */
        Body.prototype.applyTorque = function (torque, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type != DYNAMIC) {
                return;
            }
            if (wake && this.m_awakeFlag == false) {
                this.setAwake(true);
            }
            // Don't accumulate a force if the body is sleeping
            if (this.m_awakeFlag) {
                this.m_torque += torque;
            }
        };
        /**
         * Apply an impulse at a point. This immediately modifies the velocity. It also
         * modifies the angular velocity if the point of application is not at the
         * center of mass. This wakes up the body.
         *
         * @param impulse The world impulse vector, usually in N-seconds or kg-m/s.
         * @param point The world position of the point of application.
         * @param wake Also wake up the body
         */
        Body.prototype.applyLinearImpulse = function (impulse, point, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type != DYNAMIC) {
                return;
            }
            if (wake && this.m_awakeFlag == false) {
                this.setAwake(true);
            }
            // Don't accumulate velocity if the body is sleeping
            if (this.m_awakeFlag) {
                this.m_linearVelocity.addMul(this.m_invMass, impulse);
                this.m_angularVelocity += this.m_invI * Vec2.crossVec2Vec2(Vec2.sub(point, this.m_sweep.c), impulse);
            }
        };
        /**
         * Apply an angular impulse.
         *
         * @param impulse The angular impulse in units of kg*m*m/s
         * @param wake Also wake up the body
         */
        Body.prototype.applyAngularImpulse = function (impulse, wake) {
            if (wake === void 0) { wake = true; }
            if (this.m_type != DYNAMIC) {
                return;
            }
            if (wake && this.m_awakeFlag == false) {
                this.setAwake(true);
            }
            // Don't accumulate velocity if the body is sleeping
            if (this.m_awakeFlag) {
                this.m_angularVelocity += this.m_invI * impulse;
            }
        };
        /**
         * This is used to test if two bodies should collide.
         *
         * Bodies do not collide when:
         * - Neither of them is dynamic
         * - They are connected by a joint with collideConnected == false
         */
        Body.prototype.shouldCollide = function (that) {
            // At least one body should be dynamic.
            if (this.m_type != DYNAMIC && that.m_type != DYNAMIC) {
                return false;
            }
            // Does a joint prevent collision?
            for (var jn = this.m_jointList; jn; jn = jn.next) {
                if (jn.other == that) {
                    if (jn.joint.m_collideConnected == false) {
                        return false;
                    }
                }
            }
            return true;
        };
        /** @internal Used for deserialize. */
        Body.prototype._addFixture = function (fixture) {
            if (this.isWorldLocked() == true) {
                return null;
            }
            if (this.m_activeFlag) {
                var broadPhase = this.m_world.m_broadPhase;
                fixture.createProxies(broadPhase, this.m_xf);
            }
            fixture.m_next = this.m_fixtureList;
            this.m_fixtureList = fixture;
            // Adjust mass properties if needed.
            if (fixture.m_density > 0.0) {
                this.resetMassData();
            }
            // Let the world know we have a new fixture. This will cause new contacts
            // to be created at the beginning of the next time step.
            this.m_world.m_newFixture = true;
            return fixture;
        };
        // tslint:disable-next-line:typedef
        Body.prototype.createFixture = function (shape, fixdef) {
            if (this.isWorldLocked() == true) {
                return null;
            }
            var fixture = new Fixture(this, shape, fixdef);
            this._addFixture(fixture);
            return fixture;
        };
        /**
         * Destroy a fixture. This removes the fixture from the broad-phase and destroys
         * all contacts associated with this fixture. This will automatically adjust the
         * mass of the body if the body is dynamic and the fixture has positive density.
         * All fixtures attached to a body are implicitly destroyed when the body is
         * destroyed.
         *
         * Warning: This function is locked during callbacks.
         *
         * @param fixture The fixture to be removed.
         */
        Body.prototype.destroyFixture = function (fixture) {
            if (this.isWorldLocked() == true) {
                return;
            }
            if (this.m_fixtureList === fixture) {
                this.m_fixtureList = fixture.m_next;
            }
            else {
                var node = this.m_fixtureList;
                while (node != null) {
                    if (node.m_next === fixture) {
                        node.m_next = fixture.m_next;
                        break;
                    }
                    node = node.m_next;
                }
            }
            // Destroy any contacts associated with the fixture.
            var edge = this.m_contactList;
            while (edge) {
                var c = edge.contact;
                edge = edge.next;
                var fixtureA = c.getFixtureA();
                var fixtureB = c.getFixtureB();
                if (fixture == fixtureA || fixture == fixtureB) {
                    // This destroys the contact and removes it from
                    // this body's contact list.
                    this.m_world.destroyContact(c);
                }
            }
            if (this.m_activeFlag) {
                var broadPhase = this.m_world.m_broadPhase;
                fixture.destroyProxies(broadPhase);
            }
            fixture.m_body = null;
            fixture.m_next = null;
            this.m_world.publish('remove-fixture', fixture);
            // Reset the mass data.
            this.resetMassData();
        };
        /**
         * Get the corresponding world point of a local point.
         */
        Body.prototype.getWorldPoint = function (localPoint) {
            return Transform.mulVec2(this.m_xf, localPoint);
        };
        /**
         * Get the corresponding world vector of a local vector.
         */
        Body.prototype.getWorldVector = function (localVector) {
            return Rot.mulVec2(this.m_xf.q, localVector);
        };
        /**
         * Gets the corresponding local point of a world point.
         */
        Body.prototype.getLocalPoint = function (worldPoint) {
            return Transform.mulTVec2(this.m_xf, worldPoint);
        };
        /**
         * Gets the corresponding local vector of a world vector.
         */
        Body.prototype.getLocalVector = function (worldVector) {
            return Rot.mulTVec2(this.m_xf.q, worldVector);
        };
        /**
         * A static body does not move under simulation and behaves as if it has infinite mass.
         * Internally, zero is stored for the mass and the inverse mass.
         * Static bodies can be moved manually by the user.
         * A static body has zero velocity.
         * Static bodies do not collide with other static or kinematic bodies.
         */
        Body.STATIC = 'static';
        /**
         * A kinematic body moves under simulation according to its velocity.
         * Kinematic bodies do not respond to forces.
         * They can be moved manually by the user, but normally a kinematic body is moved by setting its velocity.
         * A kinematic body behaves as if it has infinite mass, however, zero is stored for the mass and the inverse mass.
         * Kinematic bodies do not collide with other kinematic or static bodies.
         */
        Body.KINEMATIC = 'kinematic';
        /**
         * A dynamic body is fully simulated.
         * They can be moved manually by the user, but normally they move according to forces.
         * A dynamic body can collide with all body types.
         * A dynamic body always has finite, non-zero mass.
         * If you try to set the mass of a dynamic body to zero, it will automatically acquire a mass of one kilogram and it won't rotate.
         */
        Body.DYNAMIC = 'dynamic';
        return Body;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /**
     * A joint edge is used to connect bodies and joints together in a joint graph
     * where each body is a node and each joint is an edge. A joint edge belongs to
     * a doubly linked list maintained in each attached body. Each joint has two
     * joint nodes, one for each attached body.
     */
    var JointEdge = /** @class */ (function () {
        function JointEdge() {
            /**
             * provides quick access to the other body attached.
             */
            this.other = null;
            /**
             * the joint
             */
            this.joint = null;
            /**
             * prev the previous joint edge in the body's joint list
             */
            this.prev = null;
            /**
             * the next joint edge in the body's joint list
             */
            this.next = null;
        }
        return JointEdge;
    }());
    /**
     * The base joint class. Joints are used to constraint two bodies together in
     * various fashions. Some joints also feature limits and motors.
     */
    var Joint = /** @class */ (function () {
        function Joint(def, bodyA, bodyB) {
            /** @internal */ this.m_type = 'unknown-joint';
            /** @internal */ this.m_prev = null;
            /** @internal */ this.m_next = null;
            /** @internal */ this.m_edgeA = new JointEdge();
            /** @internal */ this.m_edgeB = new JointEdge();
            /** @internal */ this.m_islandFlag = false;
            bodyA = 'bodyA' in def ? def.bodyA : bodyA;
            bodyB = 'bodyB' in def ? def.bodyB : bodyB;
            this.m_bodyA = bodyA;
            this.m_bodyB = bodyB;
            this.m_collideConnected = !!def.collideConnected;
            this.m_userData = def.userData;
        }
        /**
         * Short-cut function to determine if either body is inactive.
         */
        Joint.prototype.isActive = function () {
            return this.m_bodyA.isActive() && this.m_bodyB.isActive();
        };
        /**
         * Get the type of the concrete joint.
         */
        Joint.prototype.getType = function () {
            return this.m_type;
        };
        /**
         * Get the first body attached to this joint.
         */
        Joint.prototype.getBodyA = function () {
            return this.m_bodyA;
        };
        /**
         * Get the second body attached to this joint.
         */
        Joint.prototype.getBodyB = function () {
            return this.m_bodyB;
        };
        /**
         * Get the next joint the world joint list.
         */
        Joint.prototype.getNext = function () {
            return this.m_next;
        };
        Joint.prototype.getUserData = function () {
            return this.m_userData;
        };
        Joint.prototype.setUserData = function (data) {
            this.m_userData = data;
        };
        /**
         * Get collide connected. Note: modifying the collide connect flag won't work
         * correctly because the flag is only checked when fixture AABBs begin to
         * overlap.
         */
        Joint.prototype.getCollideConnected = function () {
            return this.m_collideConnected;
        };
        /**
         * Shift the origin for any points stored in world coordinates.
         */
        Joint.prototype.shiftOrigin = function (newOrigin) { };
        return Joint;
    }());

    var stats = {
        gjkCalls: 0,
        gjkIters: 0,
        gjkMaxIters: 0,
        toiTime: 0,
        toiMaxTime: 0,
        toiCalls: 0,
        toiIters: 0,
        toiMaxIters: 0,
        toiRootIters: 0,
        toiMaxRootIters: 0,
        toString: function (newline) {
            newline = typeof newline === 'string' ? newline : '\n';
            var string = "";
            // tslint:disable-next-line:no-for-in
            for (var name_1 in this) {
                if (typeof this[name_1] !== 'function' && typeof this[name_1] !== 'object') {
                    string += name_1 + ': ' + this[name_1] + newline;
                }
            }
            return string;
        }
    };

    /** @internal */
    var now = function () {
        return Date.now();
    };
    /** @internal */
    var diff = function (time) {
        return Date.now() - time;
    };
    /** @internal */
    var Timer = {
        now: now,
        diff: diff,
    };

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_max$4 = Math.max;
    /** @internal */ var temp$5 = vec2(0, 0);
    /** @internal */ var normal$4 = vec2(0, 0);
    /** @internal */ var e12 = vec2(0, 0);
    /** @internal */ var e13 = vec2(0, 0);
    /** @internal */ var e23 = vec2(0, 0);
    /** @internal */ var temp1 = vec2(0, 0);
    /** @internal */ var temp2 = vec2(0, 0);
    /**
     * GJK using Voronoi regions (Christer Ericson) and Barycentric coordinates.
     */
    stats.gjkCalls = 0;
    stats.gjkIters = 0;
    stats.gjkMaxIters = 0;
    /**
     * Input for Distance. You have to option to use the shape radii in the
     * computation. Even
     */
    var DistanceInput = /** @class */ (function () {
        function DistanceInput() {
            this.proxyA = new DistanceProxy();
            this.proxyB = new DistanceProxy();
            this.transformA = Transform.identity();
            this.transformB = Transform.identity();
            this.useRadii = false;
        }
        DistanceInput.prototype.recycle = function () {
            this.proxyA.recycle();
            this.proxyB.recycle();
            this.transformA.setIdentity();
            this.transformB.setIdentity();
            this.useRadii = false;
        };
        return DistanceInput;
    }());
    /**
     * Output for Distance.
     */
    var DistanceOutput = /** @class */ (function () {
        function DistanceOutput() {
            /** closest point on shapeA */
            this.pointA = vec2(0, 0);
            /** closest point on shapeB */
            this.pointB = vec2(0, 0);
            this.distance = 0;
            /** iterations number of GJK iterations used */
            this.iterations = 0;
        }
        DistanceOutput.prototype.recycle = function () {
            zeroVec2(this.pointA);
            zeroVec2(this.pointB);
            this.distance = 0;
            this.iterations = 0;
        };
        return DistanceOutput;
    }());
    /**
     * Used to warm start Distance. Set count to zero on first call.
     */
    var SimplexCache = /** @class */ (function () {
        function SimplexCache() {
            /** length or area */
            this.metric = 0;
            /** vertices on shape A */
            this.indexA = [];
            /** vertices on shape B */
            this.indexB = [];
            this.count = 0;
        }
        SimplexCache.prototype.recycle = function () {
            this.metric = 0;
            this.indexA.length = 0;
            this.indexB.length = 0;
            this.count = 0;
        };
        return SimplexCache;
    }());
    /**
     * Compute the closest points between two shapes. Supports any combination of:
     * CircleShape, PolygonShape, EdgeShape. The simplex cache is input/output. On
     * the first call set SimplexCache.count to zero.
     */
    var Distance = function (output, cache, input) {
        ++stats.gjkCalls;
        var proxyA = input.proxyA;
        var proxyB = input.proxyB;
        var xfA = input.transformA;
        var xfB = input.transformB;
        // Initialize the simplex.
        // const simplex = new Simplex();
        simplex.recycle();
        simplex.readCache(cache, proxyA, xfA, proxyB, xfB);
        // Get simplex vertices as an array.
        var vertices = simplex.m_v;
        var k_maxIters = SettingsInternal.maxDistanceIterations;
        // These store the vertices of the last simplex so that we
        // can check for duplicates and prevent cycling.
        var saveA = [];
        var saveB = []; // int[3]
        var saveCount = 0;
        // Main iteration loop.
        var iter = 0;
        while (iter < k_maxIters) {
            // Copy simplex so we can identify duplicates.
            saveCount = simplex.m_count;
            for (var i = 0; i < saveCount; ++i) {
                saveA[i] = vertices[i].indexA;
                saveB[i] = vertices[i].indexB;
            }
            simplex.solve();
            // If we have 3 points, then the origin is in the corresponding triangle.
            if (simplex.m_count === 3) {
                break;
            }
            // Get search direction.
            var d = simplex.getSearchDirection();
            // Ensure the search direction is numerically fit.
            if (lengthSqrVec2(d) < EPSILON * EPSILON) {
                // The origin is probably contained by a line segment
                // or triangle. Thus the shapes are overlapped.
                // We can't return zero here even though there may be overlap.
                // In case the simplex is a point, segment, or triangle it is difficult
                // to determine if the origin is contained in the CSO or very close to it.
                break;
            }
            // Compute a tentative new simplex vertex using support points.
            var vertex = vertices[simplex.m_count]; // SimplexVertex
            vertex.indexA = proxyA.getSupport(invRotVec2(temp$5, xfA.q, setMulVec2(temp$5, -1, d)));
            transformVec2(vertex.wA, xfA, proxyA.getVertex(vertex.indexA));
            vertex.indexB = proxyB.getSupport(invRotVec2(temp$5, xfB.q, d));
            transformVec2(vertex.wB, xfB, proxyB.getVertex(vertex.indexB));
            diffVec2(vertex.w, vertex.wB, vertex.wA);
            // Iteration count is equated to the number of support point calls.
            ++iter;
            ++stats.gjkIters;
            // Check for duplicate support points. This is the main termination
            // criteria.
            var duplicate = false;
            for (var i = 0; i < saveCount; ++i) {
                if (vertex.indexA === saveA[i] && vertex.indexB === saveB[i]) {
                    duplicate = true;
                    break;
                }
            }
            // If we found a duplicate support point we must exit to avoid cycling.
            if (duplicate) {
                break;
            }
            // New vertex is ok and needed.
            ++simplex.m_count;
        }
        stats.gjkMaxIters = math_max$4(stats.gjkMaxIters, iter);
        // Prepare output.
        simplex.getWitnessPoints(output.pointA, output.pointB);
        output.distance = distVec2(output.pointA, output.pointB);
        output.iterations = iter;
        // Cache the simplex.
        simplex.writeCache(cache);
        // Apply radii if requested.
        if (input.useRadii) {
            var rA = proxyA.m_radius;
            var rB = proxyB.m_radius;
            if (output.distance > rA + rB && output.distance > EPSILON) {
                // Shapes are still no overlapped.
                // Move the witness points to the outer surface.
                output.distance -= rA + rB;
                diffVec2(normal$4, output.pointB, output.pointA);
                normalizeVec2(normal$4);
                addMulVec2(output.pointA, rA, normal$4);
                subMulVec2(output.pointB, rB, normal$4);
            }
            else {
                // Shapes are overlapped when radii are considered.
                // Move the witness points to the middle.
                var p = diffVec2(temp$5, output.pointA, output.pointB);
                copyVec2(output.pointA, p);
                copyVec2(output.pointB, p);
                output.distance = 0.0;
            }
        }
    };
    /**
     * A distance proxy is used by the GJK algorithm. It encapsulates any shape.
     */
    var DistanceProxy = /** @class */ (function () {
        function DistanceProxy() {
            /** @internal */ this.m_vertices = [];
            // todo: remove this?
            /** @internal */ this.m_count = 0;
            /** @internal */ this.m_radius = 0;
        }
        DistanceProxy.prototype.recycle = function () {
            this.m_vertices.length = 0;
            this.m_count = 0;
            this.m_radius = 0;
        };
        /**
         * Get the vertex count.
         */
        DistanceProxy.prototype.getVertexCount = function () {
            return this.m_count;
        };
        /**
         * Get a vertex by index. Used by Distance.
         */
        DistanceProxy.prototype.getVertex = function (index) {
            return this.m_vertices[index];
        };
        /**
         * Get the supporting vertex index in the given direction.
         */
        DistanceProxy.prototype.getSupport = function (d) {
            var bestIndex = -1;
            var bestValue = -Infinity;
            for (var i = 0; i < this.m_count; ++i) {
                var value = dotVec2(this.m_vertices[i], d);
                if (value > bestValue) {
                    bestIndex = i;
                    bestValue = value;
                }
            }
            return bestIndex;
        };
        /**
         * Get the supporting vertex in the given direction.
         */
        DistanceProxy.prototype.getSupportVertex = function (d) {
            return this.m_vertices[this.getSupport(d)];
        };
        /**
         * Initialize the proxy using the given shape. The shape must remain in scope
         * while the proxy is in use.
         */
        DistanceProxy.prototype.set = function (shape, index) {
            shape.computeDistanceProxy(this, index);
        };
        /**
         * Initialize the proxy using a vertex cloud and radius. The vertices
         * must remain in scope while the proxy is in use.
         */
        DistanceProxy.prototype.setVertices = function (vertices, count, radius) {
            this.m_vertices = vertices;
            this.m_count = count;
            this.m_radius = radius;
        };
        return DistanceProxy;
    }());
    var SimplexVertex = /** @class */ (function () {
        function SimplexVertex() {
            /** support point in proxyA */
            this.wA = vec2(0, 0);
            /** wA index */
            this.indexA = 0;
            /** support point in proxyB */
            this.wB = vec2(0, 0);
            /** wB index */
            this.indexB = 0;
            /** wB - wA; */
            this.w = vec2(0, 0);
            /** barycentric coordinate for closest point */
            this.a = 0;
        }
        SimplexVertex.prototype.recycle = function () {
            this.indexA = 0;
            this.indexB = 0;
            zeroVec2(this.wA);
            zeroVec2(this.wB);
            zeroVec2(this.w);
            this.a = 0;
        };
        SimplexVertex.prototype.set = function (v) {
            this.indexA = v.indexA;
            this.indexB = v.indexB;
            copyVec2(this.wA, v.wA);
            copyVec2(this.wB, v.wB);
            copyVec2(this.w, v.w);
            this.a = v.a;
        };
        return SimplexVertex;
    }());
    /** @internal */ var searchDirection_reuse = vec2(0, 0);
    /** @internal */ var closestPoint_reuse = vec2(0, 0);
    var Simplex = /** @class */ (function () {
        function Simplex() {
            this.m_v1 = new SimplexVertex();
            this.m_v2 = new SimplexVertex();
            this.m_v3 = new SimplexVertex();
            this.m_v = [this.m_v1, this.m_v2, this.m_v3];
        }
        Simplex.prototype.recycle = function () {
            this.m_v1.recycle();
            this.m_v2.recycle();
            this.m_v3.recycle();
            this.m_count = 0;
        };
        /** @internal */ Simplex.prototype.toString = function () {
            if (this.m_count === 3) {
                return ["+" + this.m_count,
                    this.m_v1.a, this.m_v1.wA.x, this.m_v1.wA.y, this.m_v1.wB.x, this.m_v1.wB.y,
                    this.m_v2.a, this.m_v2.wA.x, this.m_v2.wA.y, this.m_v2.wB.x, this.m_v2.wB.y,
                    this.m_v3.a, this.m_v3.wA.x, this.m_v3.wA.y, this.m_v3.wB.x, this.m_v3.wB.y
                ].toString();
            }
            else if (this.m_count === 2) {
                return ["+" + this.m_count,
                    this.m_v1.a, this.m_v1.wA.x, this.m_v1.wA.y, this.m_v1.wB.x, this.m_v1.wB.y,
                    this.m_v2.a, this.m_v2.wA.x, this.m_v2.wA.y, this.m_v2.wB.x, this.m_v2.wB.y
                ].toString();
            }
            else if (this.m_count === 1) {
                return ["+" + this.m_count,
                    this.m_v1.a, this.m_v1.wA.x, this.m_v1.wA.y, this.m_v1.wB.x, this.m_v1.wB.y
                ].toString();
            }
            else {
                return "+" + this.m_count;
            }
        };
        Simplex.prototype.readCache = function (cache, proxyA, transformA, proxyB, transformB) {
            // Copy data from cache.
            this.m_count = cache.count;
            for (var i = 0; i < this.m_count; ++i) {
                var v = this.m_v[i];
                v.indexA = cache.indexA[i];
                v.indexB = cache.indexB[i];
                var wALocal = proxyA.getVertex(v.indexA);
                var wBLocal = proxyB.getVertex(v.indexB);
                transformVec2(v.wA, transformA, wALocal);
                transformVec2(v.wB, transformB, wBLocal);
                diffVec2(v.w, v.wB, v.wA);
                v.a = 0.0;
            }
            // Compute the new simplex metric, if it is substantially different than
            // old metric then flush the simplex.
            if (this.m_count > 1) {
                var metric1 = cache.metric;
                var metric2 = this.getMetric();
                if (metric2 < 0.5 * metric1 || 2.0 * metric1 < metric2 || metric2 < EPSILON) {
                    // Reset the simplex.
                    this.m_count = 0;
                }
            }
            // If the cache is empty or invalid...
            if (this.m_count === 0) {
                var v = this.m_v[0];
                v.indexA = 0;
                v.indexB = 0;
                var wALocal = proxyA.getVertex(0);
                var wBLocal = proxyB.getVertex(0);
                transformVec2(v.wA, transformA, wALocal);
                transformVec2(v.wB, transformB, wBLocal);
                diffVec2(v.w, v.wB, v.wA);
                v.a = 1.0;
                this.m_count = 1;
            }
        };
        Simplex.prototype.writeCache = function (cache) {
            cache.metric = this.getMetric();
            cache.count = this.m_count;
            for (var i = 0; i < this.m_count; ++i) {
                cache.indexA[i] = this.m_v[i].indexA;
                cache.indexB[i] = this.m_v[i].indexB;
            }
        };
        Simplex.prototype.getSearchDirection = function () {
            var v1 = this.m_v1;
            var v2 = this.m_v2;
            this.m_v3;
            switch (this.m_count) {
                case 1:
                    return setVec2(searchDirection_reuse, -v1.w.x, -v1.w.y);
                case 2: {
                    diffVec2(e12, v2.w, v1.w);
                    var sgn = -crossVec2Vec2(e12, v1.w);
                    if (sgn > 0.0) {
                        // Origin is left of e12.
                        return setVec2(searchDirection_reuse, -e12.y, e12.x);
                    }
                    else {
                        // Origin is right of e12.
                        return setVec2(searchDirection_reuse, e12.y, -e12.x);
                    }
                }
                default:
                    return zeroVec2(searchDirection_reuse);
            }
        };
        Simplex.prototype.getClosestPoint = function () {
            var v1 = this.m_v1;
            var v2 = this.m_v2;
            this.m_v3;
            switch (this.m_count) {
                case 0:
                    return zeroVec2(closestPoint_reuse);
                case 1:
                    return copyVec2(closestPoint_reuse, v1.w);
                case 2:
                    return combineVec2(closestPoint_reuse, v1.a, v1.w, v2.a, v2.w);
                case 3:
                    return zeroVec2(closestPoint_reuse);
                default:
                    return zeroVec2(closestPoint_reuse);
            }
        };
        Simplex.prototype.getWitnessPoints = function (pA, pB) {
            var v1 = this.m_v1;
            var v2 = this.m_v2;
            var v3 = this.m_v3;
            switch (this.m_count) {
                case 0:
                    break;
                case 1:
                    copyVec2(pA, v1.wA);
                    copyVec2(pB, v1.wB);
                    break;
                case 2:
                    combineVec2(pA, v1.a, v1.wA, v2.a, v2.wA);
                    combineVec2(pB, v1.a, v1.wB, v2.a, v2.wB);
                    break;
                case 3:
                    pB.x = pA.x = v1.a * v1.wA.x + v2.a * v2.wA.x + v3.a * v3.wA.x;
                    pB.y = pA.y = v1.a * v1.wA.y + v2.a * v2.wA.y + v3.a * v3.wA.y;
                    break;
            }
        };
        Simplex.prototype.getMetric = function () {
            switch (this.m_count) {
                case 0:
                    return 0.0;
                case 1:
                    return 0.0;
                case 2:
                    return distVec2(this.m_v1.w, this.m_v2.w);
                case 3:
                    return crossVec2Vec2(diffVec2(temp1, this.m_v2.w, this.m_v1.w), diffVec2(temp2, this.m_v3.w, this.m_v1.w));
                default:
                    return 0.0;
            }
        };
        Simplex.prototype.solve = function () {
            switch (this.m_count) {
                case 1:
                    break;
                case 2:
                    this.solve2();
                    break;
                case 3:
                    this.solve3();
                    break;
            }
        };
        // Solve a line segment using barycentric coordinates.
        //
        // p = a1 * w1 + a2 * w2
        // a1 + a2 = 1
        //
        // The vector from the origin to the closest point on the line is
        // perpendicular to the line.
        // e12 = w2 - w1
        // dot(p, e) = 0
        // a1 * dot(w1, e) + a2 * dot(w2, e) = 0
        //
        // 2-by-2 linear system
        // [1 1 ][a1] = [1]
        // [w1.e12 w2.e12][a2] = [0]
        //
        // Define
        // d12_1 = dot(w2, e12)
        // d12_2 = -dot(w1, e12)
        // d12 = d12_1 + d12_2
        //
        // Solution
        // a1 = d12_1 / d12
        // a2 = d12_2 / d12
        Simplex.prototype.solve2 = function () {
            var w1 = this.m_v1.w;
            var w2 = this.m_v2.w;
            diffVec2(e12, w2, w1);
            // w1 region
            var d12_2 = -dotVec2(w1, e12);
            if (d12_2 <= 0.0) {
                // a2 <= 0, so we clamp it to 0
                this.m_v1.a = 1.0;
                this.m_count = 1;
                return;
            }
            // w2 region
            var d12_1 = dotVec2(w2, e12);
            if (d12_1 <= 0.0) {
                // a1 <= 0, so we clamp it to 0
                this.m_v2.a = 1.0;
                this.m_count = 1;
                this.m_v1.set(this.m_v2);
                return;
            }
            // Must be in e12 region.
            var inv_d12 = 1.0 / (d12_1 + d12_2);
            this.m_v1.a = d12_1 * inv_d12;
            this.m_v2.a = d12_2 * inv_d12;
            this.m_count = 2;
        };
        // Possible regions:
        // - points[2]
        // - edge points[0]-points[2]
        // - edge points[1]-points[2]
        // - inside the triangle
        Simplex.prototype.solve3 = function () {
            var w1 = this.m_v1.w;
            var w2 = this.m_v2.w;
            var w3 = this.m_v3.w;
            // Edge12
            // [1 1 ][a1] = [1]
            // [w1.e12 w2.e12][a2] = [0]
            // a3 = 0
            diffVec2(e12, w2, w1);
            var w1e12 = dotVec2(w1, e12);
            var w2e12 = dotVec2(w2, e12);
            var d12_1 = w2e12;
            var d12_2 = -w1e12;
            // Edge13
            // [1 1 ][a1] = [1]
            // [w1.e13 w3.e13][a3] = [0]
            // a2 = 0
            diffVec2(e13, w3, w1);
            var w1e13 = dotVec2(w1, e13);
            var w3e13 = dotVec2(w3, e13);
            var d13_1 = w3e13;
            var d13_2 = -w1e13;
            // Edge23
            // [1 1 ][a2] = [1]
            // [w2.e23 w3.e23][a3] = [0]
            // a1 = 0
            diffVec2(e23, w3, w2);
            var w2e23 = dotVec2(w2, e23);
            var w3e23 = dotVec2(w3, e23);
            var d23_1 = w3e23;
            var d23_2 = -w2e23;
            // Triangle123
            var n123 = crossVec2Vec2(e12, e13);
            var d123_1 = n123 * crossVec2Vec2(w2, w3);
            var d123_2 = n123 * crossVec2Vec2(w3, w1);
            var d123_3 = n123 * crossVec2Vec2(w1, w2);
            // w1 region
            if (d12_2 <= 0.0 && d13_2 <= 0.0) {
                this.m_v1.a = 1.0;
                this.m_count = 1;
                return;
            }
            // e12
            if (d12_1 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
                var inv_d12 = 1.0 / (d12_1 + d12_2);
                this.m_v1.a = d12_1 * inv_d12;
                this.m_v2.a = d12_2 * inv_d12;
                this.m_count = 2;
                return;
            }
            // e13
            if (d13_1 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
                var inv_d13 = 1.0 / (d13_1 + d13_2);
                this.m_v1.a = d13_1 * inv_d13;
                this.m_v3.a = d13_2 * inv_d13;
                this.m_count = 2;
                this.m_v2.set(this.m_v3);
                return;
            }
            // w2 region
            if (d12_1 <= 0.0 && d23_2 <= 0.0) {
                this.m_v2.a = 1.0;
                this.m_count = 1;
                this.m_v1.set(this.m_v2);
                return;
            }
            // w3 region
            if (d13_1 <= 0.0 && d23_1 <= 0.0) {
                this.m_v3.a = 1.0;
                this.m_count = 1;
                this.m_v1.set(this.m_v3);
                return;
            }
            // e23
            if (d23_1 > 0.0 && d23_2 > 0.0 && d123_1 <= 0.0) {
                var inv_d23 = 1.0 / (d23_1 + d23_2);
                this.m_v2.a = d23_1 * inv_d23;
                this.m_v3.a = d23_2 * inv_d23;
                this.m_count = 2;
                this.m_v1.set(this.m_v3);
                return;
            }
            // Must be in triangle123
            var inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
            this.m_v1.a = d123_1 * inv_d123;
            this.m_v2.a = d123_2 * inv_d123;
            this.m_v3.a = d123_3 * inv_d123;
            this.m_count = 3;
        };
        return Simplex;
    }());
    /** @internal */ var simplex = new Simplex();
    /** @internal */ var input$1 = new DistanceInput();
    /** @internal */ var cache$1 = new SimplexCache();
    /** @internal */ var output$1 = new DistanceOutput();
    /**
     * Determine if two generic shapes overlap.
     */
    var testOverlap = function (shapeA, indexA, shapeB, indexB, xfA, xfB) {
        input$1.recycle();
        input$1.proxyA.set(shapeA, indexA);
        input$1.proxyB.set(shapeB, indexB);
        copyTransform(input$1.transformA, xfA);
        copyTransform(input$1.transformB, xfB);
        input$1.useRadii = true;
        output$1.recycle();
        cache$1.recycle();
        Distance(output$1, cache$1, input$1);
        return output$1.distance < 10.0 * EPSILON;
    };
    // legacy exports
    Distance.testOverlap = testOverlap;
    Distance.Input = DistanceInput;
    Distance.Output = DistanceOutput;
    Distance.Proxy = DistanceProxy;
    Distance.Cache = SimplexCache;
    /**
     * Input parameters for ShapeCast
     */
    var ShapeCastInput = /** @class */ (function () {
        function ShapeCastInput() {
            this.proxyA = new DistanceProxy();
            this.proxyB = new DistanceProxy();
            this.transformA = Transform.identity();
            this.transformB = Transform.identity();
            this.translationB = Vec2.zero();
        }
        ShapeCastInput.prototype.recycle = function () {
            this.proxyA.recycle();
            this.proxyB.recycle();
            this.transformA.setIdentity();
            this.transformB.setIdentity();
            zeroVec2(this.translationB);
        };
        return ShapeCastInput;
    }());
    /**
     * Output results for b2ShapeCast
     */
    var ShapeCastOutput = /** @class */ (function () {
        function ShapeCastOutput() {
            this.point = Vec2.zero();
            this.normal = Vec2.zero();
            this.lambda = 1.0;
            this.iterations = 0;
        }
        return ShapeCastOutput;
    }());
    /**
     * Perform a linear shape cast of shape B moving and shape A fixed. Determines
     * the hit point, normal, and translation fraction.
     *
     * @returns true if hit, false if there is no hit or an initial overlap
     */
    //
    // GJK-raycast
    // Algorithm by Gino van den Bergen.
    // "Smooth Mesh Contacts with GJK" in Game Physics Pearls. 2010
    var ShapeCast = function (output, input) {
        output.iterations = 0;
        output.lambda = 1.0;
        output.normal.setZero();
        output.point.setZero();
        var proxyA = input.proxyA;
        var proxyB = input.proxyB;
        var radiusA = math_max$4(proxyA.m_radius, SettingsInternal.polygonRadius);
        var radiusB = math_max$4(proxyB.m_radius, SettingsInternal.polygonRadius);
        var radius = radiusA + radiusB;
        var xfA = input.transformA;
        var xfB = input.transformB;
        var r = input.translationB;
        var n = Vec2.zero();
        var lambda = 0.0;
        // Initial simplex
        var simplex = new Simplex();
        simplex.m_count = 0;
        // Get simplex vertices as an array.
        var vertices = simplex.m_v;
        // Get support point in -r direction
        var indexA = proxyA.getSupport(Rot.mulTVec2(xfA.q, Vec2.neg(r)));
        var wA = Transform.mulVec2(xfA, proxyA.getVertex(indexA));
        var indexB = proxyB.getSupport(Rot.mulTVec2(xfB.q, r));
        var wB = Transform.mulVec2(xfB, proxyB.getVertex(indexB));
        var v = Vec2.sub(wA, wB);
        // Sigma is the target distance between polygons
        var sigma = math_max$4(SettingsInternal.polygonRadius, radius - SettingsInternal.polygonRadius);
        var tolerance = 0.5 * SettingsInternal.linearSlop;
        // Main iteration loop.
        var k_maxIters = 20;
        var iter = 0;
        while (iter < k_maxIters && v.length() - sigma > tolerance) {
            output.iterations += 1;
            // Support in direction -v (A - B)
            indexA = proxyA.getSupport(Rot.mulTVec2(xfA.q, Vec2.neg(v)));
            wA = Transform.mulVec2(xfA, proxyA.getVertex(indexA));
            indexB = proxyB.getSupport(Rot.mulTVec2(xfB.q, v));
            wB = Transform.mulVec2(xfB, proxyB.getVertex(indexB));
            var p = Vec2.sub(wA, wB);
            // -v is a normal at p
            v.normalize();
            // Intersect ray with plane
            var vp = Vec2.dot(v, p);
            var vr = Vec2.dot(v, r);
            if (vp - sigma > lambda * vr) {
                if (vr <= 0.0) {
                    return false;
                }
                lambda = (vp - sigma) / vr;
                if (lambda > 1.0) {
                    return false;
                }
                n.setMul(-1, v);
                simplex.m_count = 0;
            }
            // Reverse simplex since it works with B - A.
            // Shift by lambda * r because we want the closest point to the current clip point.
            // Note that the support point p is not shifted because we want the plane equation
            // to be formed in unshifted space.
            var vertex = vertices[simplex.m_count];
            vertex.indexA = indexB;
            vertex.wA = Vec2.combine(1, wB, lambda, r);
            vertex.indexB = indexA;
            vertex.wB = wA;
            vertex.w = Vec2.sub(vertex.wB, vertex.wA);
            vertex.a = 1.0;
            simplex.m_count += 1;
            switch (simplex.m_count) {
                case 1:
                    break;
                case 2:
                    simplex.solve2();
                    break;
                case 3:
                    simplex.solve3();
                    break;
            }
            // If we have 3 points, then the origin is in the corresponding triangle.
            if (simplex.m_count == 3) {
                // Overlap
                return false;
            }
            // Get search direction.
            v.setVec2(simplex.getClosestPoint());
            // Iteration count is equated to the number of support point calls.
            ++iter;
        }
        if (iter == 0) {
            // Initial overlap
            return false;
        }
        // Prepare output.
        var pointA = Vec2.zero();
        var pointB = Vec2.zero();
        simplex.getWitnessPoints(pointB, pointA);
        if (v.lengthSquared() > 0.0) {
            n.setMul(-1, v);
            n.normalize();
        }
        output.point = Vec2.combine(1, pointA, radiusA, n);
        output.normal = n;
        output.lambda = lambda;
        output.iterations = iter;
        return true;
    };

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_abs$7 = Math.abs;
    /** @internal */ var math_max$3 = Math.max;
    /**
     * Input parameters for TimeOfImpact.
     */
    var TOIInput = /** @class */ (function () {
        function TOIInput() {
            this.proxyA = new DistanceProxy();
            this.proxyB = new DistanceProxy();
            this.sweepA = new Sweep();
            this.sweepB = new Sweep();
        }
        TOIInput.prototype.recycle = function () {
            this.proxyA.recycle();
            this.proxyB.recycle();
            this.sweepA.recycle();
            this.sweepB.recycle();
            this.tMax = -1;
        };
        return TOIInput;
    }());
    exports.TOIOutputState = void 0;
    (function (TOIOutputState) {
        TOIOutputState[TOIOutputState["e_unset"] = -1] = "e_unset";
        TOIOutputState[TOIOutputState["e_unknown"] = 0] = "e_unknown";
        TOIOutputState[TOIOutputState["e_failed"] = 1] = "e_failed";
        TOIOutputState[TOIOutputState["e_overlapped"] = 2] = "e_overlapped";
        TOIOutputState[TOIOutputState["e_touching"] = 3] = "e_touching";
        TOIOutputState[TOIOutputState["e_separated"] = 4] = "e_separated";
    })(exports.TOIOutputState || (exports.TOIOutputState = {}));
    /**
     * Output parameters for TimeOfImpact.
     */
    var TOIOutput = /** @class */ (function () {
        function TOIOutput() {
            this.state = exports.TOIOutputState.e_unset;
            this.t = -1;
        }
        TOIOutput.prototype.recycle = function () {
            this.state = exports.TOIOutputState.e_unset;
            this.t = -1;
        };
        return TOIOutput;
    }());
    stats.toiTime = 0;
    stats.toiMaxTime = 0;
    stats.toiCalls = 0;
    stats.toiIters = 0;
    stats.toiMaxIters = 0;
    stats.toiRootIters = 0;
    stats.toiMaxRootIters = 0;
    /** @internal */ var distanceInput = new DistanceInput();
    /** @internal */ var distanceOutput = new DistanceOutput();
    // this is passed to Distance and SeparationFunction
    /** @internal */ var cache = new SimplexCache();
    /** @internal */ var xfA$1 = transform(0, 0, 0);
    /** @internal */ var xfB$1 = transform(0, 0, 0);
    /** @internal */ var temp$4 = vec2(0, 0);
    /** @internal */ var pointA$2 = vec2(0, 0);
    /** @internal */ var pointB$2 = vec2(0, 0);
    /** @internal */ var normal$3 = vec2(0, 0);
    /** @internal */ var axisA = vec2(0, 0);
    /** @internal */ var axisB = vec2(0, 0);
    /** @internal */ var localPointA = vec2(0, 0);
    /** @internal */ var localPointB = vec2(0, 0);
    /**
     * Compute the upper bound on time before two shapes penetrate. Time is
     * represented as a fraction between [0,tMax]. This uses a swept separating axis
     * and may miss some intermediate, non-tunneling collisions. If you change the
     * time interval, you should call this function again.
     *
     * Note: use Distance to compute the contact point and normal at the time of
     * impact.
     *
     * CCD via the local separating axis method. This seeks progression by computing
     * the largest time at which separation is maintained.
     */
    var TimeOfImpact = function (output, input) {
        var timer = Timer.now();
        ++stats.toiCalls;
        output.state = exports.TOIOutputState.e_unknown;
        output.t = input.tMax;
        var proxyA = input.proxyA; // DistanceProxy
        var proxyB = input.proxyB; // DistanceProxy
        var sweepA = input.sweepA; // Sweep
        var sweepB = input.sweepB; // Sweep
        // Large rotations can make the root finder fail, so we normalize the
        // sweep angles.
        sweepA.normalize();
        sweepB.normalize();
        var tMax = input.tMax;
        var totalRadius = proxyA.m_radius + proxyB.m_radius;
        var target = math_max$3(SettingsInternal.linearSlop, totalRadius - 3.0 * SettingsInternal.linearSlop);
        var tolerance = 0.25 * SettingsInternal.linearSlop;
        var t1 = 0.0;
        var k_maxIterations = SettingsInternal.maxTOIIterations;
        var iter = 0;
        // Prepare input for distance query.
        // const cache = new SimplexCache();
        cache.recycle();
        distanceInput.proxyA.setVertices(proxyA.m_vertices, proxyA.m_count, proxyA.m_radius);
        distanceInput.proxyB.setVertices(proxyB.m_vertices, proxyB.m_count, proxyB.m_radius);
        distanceInput.useRadii = false;
        // The outer loop progressively attempts to compute new separating axes.
        // This loop terminates when an axis is repeated (no progress is made).
        while (true) {
            sweepA.getTransform(xfA$1, t1);
            sweepB.getTransform(xfB$1, t1);
            // Get the distance between shapes. We can also use the results
            // to get a separating axis.
            copyTransform(distanceInput.transformA, xfA$1);
            copyTransform(distanceInput.transformB, xfB$1);
            Distance(distanceOutput, cache, distanceInput);
            // If the shapes are overlapped, we give up on continuous collision.
            if (distanceOutput.distance <= 0.0) {
                // Failure!
                output.state = exports.TOIOutputState.e_overlapped;
                output.t = 0.0;
                break;
            }
            if (distanceOutput.distance < target + tolerance) {
                // Victory!
                output.state = exports.TOIOutputState.e_touching;
                output.t = t1;
                break;
            }
            // Initialize the separating axis.
            separationFunction.initialize(cache, proxyA, sweepA, proxyB, sweepB, t1);
            // if (false) {
            //   // Dump the curve seen by the root finder
            //   const N = 100;
            //   const dx = 1.0 / N;
            //   const xs = []; // [ N + 1 ];
            //   const fs = []; // [ N + 1 ];
            //   const x = 0.0;
            //   for (const i = 0; i <= N; ++i) {
            //     sweepA.getTransform(xfA, x);
            //     sweepB.getTransform(xfB, x);
            //     const f = fcn.evaluate(xfA, xfB) - target;
            //     printf("%g %g\n", x, f);
            //     xs[i] = x;
            //     fs[i] = f;
            //     x += dx;
            //   }
            // }
            // Compute the TOI on the separating axis. We do this by successively
            // resolving the deepest point. This loop is bounded by the number of
            // vertices.
            var done = false;
            var t2 = tMax;
            var pushBackIter = 0;
            while (true) {
                // Find the deepest point at t2. Store the witness point indices.
                var s2 = separationFunction.findMinSeparation(t2);
                // Is the final configuration separated?
                if (s2 > target + tolerance) {
                    // Victory!
                    output.state = exports.TOIOutputState.e_separated;
                    output.t = tMax;
                    done = true;
                    break;
                }
                // Has the separation reached tolerance?
                if (s2 > target - tolerance) {
                    // Advance the sweeps
                    t1 = t2;
                    break;
                }
                // Compute the initial separation of the witness points.
                var s1 = separationFunction.evaluate(t1);
                // Check for initial overlap. This might happen if the root finder
                // runs out of iterations.
                if (s1 < target - tolerance) {
                    output.state = exports.TOIOutputState.e_failed;
                    output.t = t1;
                    done = true;
                    break;
                }
                // Check for touching
                if (s1 <= target + tolerance) {
                    // Victory! t1 should hold the TOI (could be 0.0).
                    output.state = exports.TOIOutputState.e_touching;
                    output.t = t1;
                    done = true;
                    break;
                }
                // Compute 1D root of: f(x) - target = 0
                var rootIterCount = 0;
                var a1 = t1;
                var a2 = t2;
                while (true) {
                    // Use a mix of the secant rule and bisection.
                    var t = void 0;
                    if (rootIterCount & 1) {
                        // Secant rule to improve convergence.
                        t = a1 + (target - s1) * (a2 - a1) / (s2 - s1);
                    }
                    else {
                        // Bisection to guarantee progress.
                        t = 0.5 * (a1 + a2);
                    }
                    ++rootIterCount;
                    ++stats.toiRootIters;
                    var s = separationFunction.evaluate(t);
                    if (math_abs$7(s - target) < tolerance) {
                        // t2 holds a tentative value for t1
                        t2 = t;
                        break;
                    }
                    // Ensure we continue to bracket the root.
                    if (s > target) {
                        a1 = t;
                        s1 = s;
                    }
                    else {
                        a2 = t;
                        s2 = s;
                    }
                    if (rootIterCount === 50) {
                        break;
                    }
                }
                stats.toiMaxRootIters = math_max$3(stats.toiMaxRootIters, rootIterCount);
                ++pushBackIter;
                if (pushBackIter === SettingsInternal.maxPolygonVertices) {
                    break;
                }
            }
            ++iter;
            ++stats.toiIters;
            if (done) {
                break;
            }
            if (iter === k_maxIterations) {
                // Root finder got stuck. Semi-victory.
                output.state = exports.TOIOutputState.e_failed;
                output.t = t1;
                break;
            }
        }
        stats.toiMaxIters = math_max$3(stats.toiMaxIters, iter);
        var time = Timer.diff(timer);
        stats.toiMaxTime = math_max$3(stats.toiMaxTime, time);
        stats.toiTime += time;
        separationFunction.recycle();
    };
    var SeparationFunctionType;
    (function (SeparationFunctionType) {
        SeparationFunctionType[SeparationFunctionType["e_unset"] = -1] = "e_unset";
        SeparationFunctionType[SeparationFunctionType["e_points"] = 1] = "e_points";
        SeparationFunctionType[SeparationFunctionType["e_faceA"] = 2] = "e_faceA";
        SeparationFunctionType[SeparationFunctionType["e_faceB"] = 3] = "e_faceB";
    })(SeparationFunctionType || (SeparationFunctionType = {}));
    var SeparationFunction = /** @class */ (function () {
        function SeparationFunction() {
            // input cache
            // todo: maybe assign by copy instead of reference?
            this.m_proxyA = null;
            this.m_proxyB = null;
            this.m_sweepA = null;
            this.m_sweepB = null;
            // initialize cache
            this.m_type = SeparationFunctionType.e_unset;
            this.m_localPoint = vec2(0, 0);
            this.m_axis = vec2(0, 0);
            // compute output
            this.indexA = -1;
            this.indexB = -1;
        }
        SeparationFunction.prototype.recycle = function () {
            this.m_proxyA = null;
            this.m_proxyB = null;
            this.m_sweepA = null;
            this.m_sweepB = null;
            this.m_type = SeparationFunctionType.e_unset;
            zeroVec2(this.m_localPoint);
            zeroVec2(this.m_axis);
            this.indexA = -1;
            this.indexB = -1;
        };
        // TODO_ERIN might not need to return the separation
        SeparationFunction.prototype.initialize = function (cache, proxyA, sweepA, proxyB, sweepB, t1) {
            var count = cache.count;
            this.m_proxyA = proxyA;
            this.m_proxyB = proxyB;
            this.m_sweepA = sweepA;
            this.m_sweepB = sweepB;
            this.m_sweepA.getTransform(xfA$1, t1);
            this.m_sweepB.getTransform(xfB$1, t1);
            if (count === 1) {
                this.m_type = SeparationFunctionType.e_points;
                var localPointA_1 = this.m_proxyA.getVertex(cache.indexA[0]);
                var localPointB_1 = this.m_proxyB.getVertex(cache.indexB[0]);
                transformVec2(pointA$2, xfA$1, localPointA_1);
                transformVec2(pointB$2, xfB$1, localPointB_1);
                diffVec2(this.m_axis, pointB$2, pointA$2);
                var s = normalizeVec2Length(this.m_axis);
                return s;
            }
            else if (cache.indexA[0] === cache.indexA[1]) {
                // Two points on B and one on A.
                this.m_type = SeparationFunctionType.e_faceB;
                var localPointB1 = proxyB.getVertex(cache.indexB[0]);
                var localPointB2 = proxyB.getVertex(cache.indexB[1]);
                crossVec2Num(this.m_axis, diffVec2(temp$4, localPointB2, localPointB1), 1.0);
                normalizeVec2(this.m_axis);
                rotVec2(normal$3, xfB$1.q, this.m_axis);
                combineVec2(this.m_localPoint, 0.5, localPointB1, 0.5, localPointB2);
                transformVec2(pointB$2, xfB$1, this.m_localPoint);
                var localPointA_2 = proxyA.getVertex(cache.indexA[0]);
                var pointA_1 = Transform.mulVec2(xfA$1, localPointA_2);
                var s = dotVec2(pointA_1, normal$3) - dotVec2(pointB$2, normal$3);
                if (s < 0.0) {
                    negVec2(this.m_axis);
                    s = -s;
                }
                return s;
            }
            else {
                // Two points on A and one or two points on B.
                this.m_type = SeparationFunctionType.e_faceA;
                var localPointA1 = this.m_proxyA.getVertex(cache.indexA[0]);
                var localPointA2 = this.m_proxyA.getVertex(cache.indexA[1]);
                crossVec2Num(this.m_axis, diffVec2(temp$4, localPointA2, localPointA1), 1.0);
                normalizeVec2(this.m_axis);
                rotVec2(normal$3, xfA$1.q, this.m_axis);
                combineVec2(this.m_localPoint, 0.5, localPointA1, 0.5, localPointA2);
                transformVec2(pointA$2, xfA$1, this.m_localPoint);
                var localPointB_2 = this.m_proxyB.getVertex(cache.indexB[0]);
                transformVec2(pointB$2, xfB$1, localPointB_2);
                var s = dotVec2(pointB$2, normal$3) - dotVec2(pointA$2, normal$3);
                if (s < 0.0) {
                    negVec2(this.m_axis);
                    s = -s;
                }
                return s;
            }
        };
        SeparationFunction.prototype.compute = function (find, t) {
            // It was findMinSeparation and evaluate
            this.m_sweepA.getTransform(xfA$1, t);
            this.m_sweepB.getTransform(xfB$1, t);
            switch (this.m_type) {
                case SeparationFunctionType.e_points: {
                    if (find) {
                        invRotVec2(axisA, xfA$1.q, this.m_axis);
                        invRotVec2(axisB, xfB$1.q, setMulVec2(temp$4, -1, this.m_axis));
                        this.indexA = this.m_proxyA.getSupport(axisA);
                        this.indexB = this.m_proxyB.getSupport(axisB);
                    }
                    copyVec2(localPointA, this.m_proxyA.getVertex(this.indexA));
                    copyVec2(localPointB, this.m_proxyB.getVertex(this.indexB));
                    transformVec2(pointA$2, xfA$1, localPointA);
                    transformVec2(pointB$2, xfB$1, localPointB);
                    var sep = dotVec2(pointB$2, this.m_axis) - dotVec2(pointA$2, this.m_axis);
                    return sep;
                }
                case SeparationFunctionType.e_faceA: {
                    rotVec2(normal$3, xfA$1.q, this.m_axis);
                    transformVec2(pointA$2, xfA$1, this.m_localPoint);
                    if (find) {
                        invRotVec2(axisB, xfB$1.q, setMulVec2(temp$4, -1, normal$3));
                        this.indexA = -1;
                        this.indexB = this.m_proxyB.getSupport(axisB);
                    }
                    copyVec2(localPointB, this.m_proxyB.getVertex(this.indexB));
                    transformVec2(pointB$2, xfB$1, localPointB);
                    var sep = dotVec2(pointB$2, normal$3) - dotVec2(pointA$2, normal$3);
                    return sep;
                }
                case SeparationFunctionType.e_faceB: {
                    rotVec2(normal$3, xfB$1.q, this.m_axis);
                    transformVec2(pointB$2, xfB$1, this.m_localPoint);
                    if (find) {
                        invRotVec2(axisA, xfA$1.q, setMulVec2(temp$4, -1, normal$3));
                        this.indexB = -1;
                        this.indexA = this.m_proxyA.getSupport(axisA);
                    }
                    copyVec2(localPointA, this.m_proxyA.getVertex(this.indexA));
                    transformVec2(pointA$2, xfA$1, localPointA);
                    var sep = dotVec2(pointA$2, normal$3) - dotVec2(pointB$2, normal$3);
                    return sep;
                }
                default:
                    if (find) {
                        this.indexA = -1;
                        this.indexB = -1;
                    }
                    return 0.0;
            }
        };
        SeparationFunction.prototype.findMinSeparation = function (t) {
            return this.compute(true, t);
        };
        SeparationFunction.prototype.evaluate = function (t) {
            return this.compute(false, t);
        };
        return SeparationFunction;
    }());
    /** @internal */ var separationFunction = new SeparationFunction();
    // legacy exports
    TimeOfImpact.Input = TOIInput;
    TimeOfImpact.Output = TOIOutput;

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_abs$6 = Math.abs;
    /** @internal */ var math_sqrt$3 = Math.sqrt;
    /** @internal */ var math_min$5 = Math.min;
    var TimeStep = /** @class */ (function () {
        function TimeStep() {
            /** time step */
            this.dt = 0;
            /** inverse time step (0 if dt == 0) */
            this.inv_dt = 0;
            this.velocityIterations = 0;
            this.positionIterations = 0;
            this.warmStarting = false;
            this.blockSolve = true;
            /** timestep ratio for variable timestep */
            this.inv_dt0 = 0.0;
            /** dt * inv_dt0 */
            this.dtRatio = 1;
        }
        TimeStep.prototype.reset = function (dt) {
            if (this.dt > 0.0) {
                this.inv_dt0 = this.inv_dt;
            }
            this.dt = dt;
            this.inv_dt = dt == 0 ? 0 : 1 / dt;
            this.dtRatio = dt * this.inv_dt0;
        };
        return TimeStep;
    }());
    // reuse
    /** @internal */ var s_subStep = new TimeStep();
    /** @internal */ var c = vec2(0, 0);
    /** @internal */ var v = vec2(0, 0);
    /** @internal */ var translation = vec2(0, 0);
    /** @internal */ var input = new TOIInput();
    /** @internal */ var output = new TOIOutput();
    /** @internal */ var backup = new Sweep();
    /** @internal */ var backup1 = new Sweep();
    /** @internal */ var backup2 = new Sweep();
    /**
     * Contact impulses for reporting. Impulses are used instead of forces because
     * sub-step forces may approach infinity for rigid body collisions. These match
     * up one-to-one with the contact points in Manifold.
     */
    var ContactImpulse = /** @class */ (function () {
        function ContactImpulse(contact) {
            this.contact = contact;
            this.normals = [];
            this.tangents = [];
        }
        ContactImpulse.prototype.recycle = function () {
            this.normals.length = 0;
            this.tangents.length = 0;
        };
        Object.defineProperty(ContactImpulse.prototype, "normalImpulses", {
            get: function () {
                var contact = this.contact;
                var normals = this.normals;
                normals.length = 0;
                for (var p = 0; p < contact.v_points.length; ++p) {
                    normals.push(contact.v_points[p].normalImpulse);
                }
                return normals;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ContactImpulse.prototype, "tangentImpulses", {
            get: function () {
                var contact = this.contact;
                var tangents = this.tangents;
                tangents.length = 0;
                for (var p = 0; p < contact.v_points.length; ++p) {
                    tangents.push(contact.v_points[p].tangentImpulse);
                }
                return tangents;
            },
            enumerable: false,
            configurable: true
        });
        return ContactImpulse;
    }());
    /**
     * Finds and solves islands. An island is a connected subset of the world.
     */
    var Solver = /** @class */ (function () {
        function Solver(world) {
            this.m_world = world;
            this.m_stack = [];
            this.m_bodies = [];
            this.m_contacts = [];
            this.m_joints = [];
        }
        Solver.prototype.clear = function () {
            this.m_stack.length = 0;
            this.m_bodies.length = 0;
            this.m_contacts.length = 0;
            this.m_joints.length = 0;
        };
        Solver.prototype.addBody = function (body) {
            this.m_bodies.push(body);
            // why?
            // body.c_position.c.setZero();
            // body.c_position.a = 0;
            // body.c_velocity.v.setZero();
            // body.c_velocity.w = 0;
        };
        Solver.prototype.addContact = function (contact) {
            // false && console.assert(contact instanceof Contact, 'Not a Contact!', contact);
            this.m_contacts.push(contact);
        };
        Solver.prototype.addJoint = function (joint) {
            this.m_joints.push(joint);
        };
        Solver.prototype.solveWorld = function (step) {
            var world = this.m_world;
            // Clear all the island flags.
            for (var b = world.m_bodyList; b; b = b.m_next) {
                b.m_islandFlag = false;
            }
            for (var c_1 = world.m_contactList; c_1; c_1 = c_1.m_next) {
                c_1.m_islandFlag = false;
            }
            for (var j = world.m_jointList; j; j = j.m_next) {
                j.m_islandFlag = false;
            }
            // Build and simulate all awake islands.
            var stack = this.m_stack;
            for (var seed = world.m_bodyList; seed; seed = seed.m_next) {
                if (seed.m_islandFlag) {
                    continue;
                }
                if (seed.isAwake() == false || seed.isActive() == false) {
                    continue;
                }
                // The seed can be dynamic or kinematic.
                if (seed.isStatic()) {
                    continue;
                }
                // Reset island and stack.
                this.clear();
                stack.push(seed);
                seed.m_islandFlag = true;
                // Perform a depth first search (DFS) on the constraint graph.
                while (stack.length > 0) {
                    // Grab the next body off the stack and add it to the island.
                    var b = stack.pop();
                    this.addBody(b);
                    // Make sure the body is awake (without resetting sleep timer).
                    b.m_awakeFlag = true;
                    // To keep islands as small as possible, we don't
                    // propagate islands across static bodies.
                    if (b.isStatic()) {
                        continue;
                    }
                    // Search all contacts connected to this body.
                    for (var ce = b.m_contactList; ce; ce = ce.next) {
                        var contact = ce.contact;
                        // Has this contact already been added to an island?
                        if (contact.m_islandFlag) {
                            continue;
                        }
                        // Is this contact solid and touching?
                        if (contact.isEnabled() == false || contact.isTouching() == false) {
                            continue;
                        }
                        // Skip sensors.
                        var sensorA = contact.m_fixtureA.m_isSensor;
                        var sensorB = contact.m_fixtureB.m_isSensor;
                        if (sensorA || sensorB) {
                            continue;
                        }
                        this.addContact(contact);
                        contact.m_islandFlag = true;
                        var other = ce.other;
                        // Was the other body already added to this island?
                        if (other.m_islandFlag) {
                            continue;
                        }
                        // false && console.assert(stack.length < world.m_bodyCount);
                        stack.push(other);
                        other.m_islandFlag = true;
                    }
                    // Search all joints connect to this body.
                    for (var je = b.m_jointList; je; je = je.next) {
                        if (je.joint.m_islandFlag == true) {
                            continue;
                        }
                        var other = je.other;
                        // Don't simulate joints connected to inactive bodies.
                        if (other.isActive() == false) {
                            continue;
                        }
                        this.addJoint(je.joint);
                        je.joint.m_islandFlag = true;
                        if (other.m_islandFlag) {
                            continue;
                        }
                        // false && console.assert(stack.length < world.m_bodyCount);
                        stack.push(other);
                        other.m_islandFlag = true;
                    }
                }
                this.solveIsland(step);
                // Post solve cleanup.
                for (var i = 0; i < this.m_bodies.length; ++i) {
                    // Allow static bodies to participate in other islands.
                    // TODO: are they added at all?
                    var b = this.m_bodies[i];
                    if (b.isStatic()) {
                        b.m_islandFlag = false;
                    }
                }
            }
        };
        Solver.prototype.solveIsland = function (step) {
            // B2: Island Solve
            var world = this.m_world;
            var gravity = world.m_gravity;
            var allowSleep = world.m_allowSleep;
            var h = step.dt;
            // Integrate velocities and apply damping. Initialize the body state.
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                copyVec2(c, body.m_sweep.c);
                var a = body.m_sweep.a;
                copyVec2(v, body.m_linearVelocity);
                var w = body.m_angularVelocity;
                // Store positions for continuous collision.
                copyVec2(body.m_sweep.c0, body.m_sweep.c);
                body.m_sweep.a0 = body.m_sweep.a;
                if (body.isDynamic()) {
                    // Integrate velocities.
                    addMulVec2(v, h * body.m_gravityScale, gravity);
                    addMulVec2(v, h * body.m_invMass, body.m_force);
                    w += h * body.m_invI * body.m_torque;
                    /**
                     * <pre>
                     * Apply damping.
                     * ODE: dv/dt + c * v = 0
                     * Solution: v(t) = v0 * exp(-c * t)
                     * Time step: v(t + dt) = v0 * exp(-c * (t + dt)) = v0 * exp(-c * t) * exp(-c * dt) = v * exp(-c * dt)
                     * v2 = exp(-c * dt) * v1
                     * Pade approximation:
                     * v2 = v1 * 1 / (1 + c * dt)
                     * </pre>
                     */
                    setMulVec2(v, 1.0 / (1.0 + h * body.m_linearDamping), v);
                    w *= 1.0 / (1.0 + h * body.m_angularDamping);
                }
                copyVec2(body.c_position.c, c);
                body.c_position.a = a;
                copyVec2(body.c_velocity.v, v);
                body.c_velocity.w = w;
            }
            for (var i = 0; i < this.m_contacts.length; ++i) {
                var contact = this.m_contacts[i];
                contact.initConstraint(step);
            }
            for (var i = 0; i < this.m_contacts.length; ++i) {
                var contact = this.m_contacts[i];
                contact.initVelocityConstraint(step);
            }
            if (step.warmStarting) {
                // Warm start.
                for (var i = 0; i < this.m_contacts.length; ++i) {
                    var contact = this.m_contacts[i];
                    contact.warmStartConstraint(step);
                }
            }
            for (var i = 0; i < this.m_joints.length; ++i) {
                var joint = this.m_joints[i];
                joint.initVelocityConstraints(step);
            }
            // Solve velocity constraints
            for (var i = 0; i < step.velocityIterations; ++i) {
                for (var j = 0; j < this.m_joints.length; ++j) {
                    var joint = this.m_joints[j];
                    joint.solveVelocityConstraints(step);
                }
                for (var j = 0; j < this.m_contacts.length; ++j) {
                    var contact = this.m_contacts[j];
                    contact.solveVelocityConstraint(step);
                }
            }
            // Store impulses for warm starting
            for (var i = 0; i < this.m_contacts.length; ++i) {
                var contact = this.m_contacts[i];
                contact.storeConstraintImpulses(step);
            }
            // Integrate positions
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                copyVec2(c, body.c_position.c);
                var a = body.c_position.a;
                copyVec2(v, body.c_velocity.v);
                var w = body.c_velocity.w;
                // Check for large velocities
                setMulVec2(translation, h, v);
                var translationLengthSqr = lengthSqrVec2(translation);
                if (translationLengthSqr > SettingsInternal.maxTranslationSquared) {
                    var ratio = SettingsInternal.maxTranslation / math_sqrt$3(translationLengthSqr);
                    scaleVec2(v, ratio);
                }
                var rotation = h * w;
                if (rotation * rotation > SettingsInternal.maxRotationSquared) {
                    var ratio = SettingsInternal.maxRotation / math_abs$6(rotation);
                    w *= ratio;
                }
                // Integrate
                addMulVec2(c, h, v);
                a += h * w;
                copyVec2(body.c_position.c, c);
                body.c_position.a = a;
                copyVec2(body.c_velocity.v, v);
                body.c_velocity.w = w;
            }
            // Solve position constraints
            var positionSolved = false;
            for (var i = 0; i < step.positionIterations; ++i) {
                var minSeparation = 0.0;
                for (var j = 0; j < this.m_contacts.length; ++j) {
                    var contact = this.m_contacts[j];
                    var separation = contact.solvePositionConstraint(step);
                    minSeparation = math_min$5(minSeparation, separation);
                }
                // We can't expect minSpeparation >= -Settings.linearSlop because we don't
                // push the separation above -Settings.linearSlop.
                var contactsOkay = minSeparation >= -3.0 * SettingsInternal.linearSlop;
                var jointsOkay = true;
                for (var j = 0; j < this.m_joints.length; ++j) {
                    var joint = this.m_joints[j];
                    var jointOkay = joint.solvePositionConstraints(step);
                    jointsOkay = jointsOkay && jointOkay;
                }
                if (contactsOkay && jointsOkay) {
                    // Exit early if the position errors are small.
                    positionSolved = true;
                    break;
                }
            }
            // Copy state buffers back to the bodies
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                copyVec2(body.m_sweep.c, body.c_position.c);
                body.m_sweep.a = body.c_position.a;
                copyVec2(body.m_linearVelocity, body.c_velocity.v);
                body.m_angularVelocity = body.c_velocity.w;
                body.synchronizeTransform();
            }
            this.postSolveIsland();
            if (allowSleep) {
                var minSleepTime = Infinity;
                var linTolSqr = SettingsInternal.linearSleepToleranceSqr;
                var angTolSqr = SettingsInternal.angularSleepToleranceSqr;
                for (var i = 0; i < this.m_bodies.length; ++i) {
                    var body = this.m_bodies[i];
                    if (body.isStatic()) {
                        continue;
                    }
                    if ((body.m_autoSleepFlag == false)
                        || (body.m_angularVelocity * body.m_angularVelocity > angTolSqr)
                        || (lengthSqrVec2(body.m_linearVelocity) > linTolSqr)) {
                        body.m_sleepTime = 0.0;
                        minSleepTime = 0.0;
                    }
                    else {
                        body.m_sleepTime += h;
                        minSleepTime = math_min$5(minSleepTime, body.m_sleepTime);
                    }
                }
                if (minSleepTime >= SettingsInternal.timeToSleep && positionSolved) {
                    for (var i = 0; i < this.m_bodies.length; ++i) {
                        var body = this.m_bodies[i];
                        body.setAwake(false);
                    }
                }
            }
        };
        /**
         * Find TOI contacts and solve them.
         */
        Solver.prototype.solveWorldTOI = function (step) {
            var world = this.m_world;
            if (world.m_stepComplete) {
                for (var b = world.m_bodyList; b; b = b.m_next) {
                    b.m_islandFlag = false;
                    b.m_sweep.alpha0 = 0.0;
                }
                for (var c_2 = world.m_contactList; c_2; c_2 = c_2.m_next) {
                    // Invalidate TOI
                    c_2.m_toiFlag = false;
                    c_2.m_islandFlag = false;
                    c_2.m_toiCount = 0;
                    c_2.m_toi = 1.0;
                }
            }
            // Find TOI events and solve them.
            while (true) {
                // Find the first TOI.
                var minContact = null;
                var minAlpha = 1.0;
                for (var c_3 = world.m_contactList; c_3; c_3 = c_3.m_next) {
                    // Is this contact disabled?
                    if (c_3.isEnabled() == false) {
                        continue;
                    }
                    // Prevent excessive sub-stepping.
                    if (c_3.m_toiCount > SettingsInternal.maxSubSteps) {
                        continue;
                    }
                    var alpha = 1.0;
                    if (c_3.m_toiFlag) {
                        // This contact has a valid cached TOI.
                        alpha = c_3.m_toi;
                    }
                    else {
                        var fA_1 = c_3.getFixtureA();
                        var fB_1 = c_3.getFixtureB();
                        // Is there a sensor?
                        if (fA_1.isSensor() || fB_1.isSensor()) {
                            continue;
                        }
                        var bA_1 = fA_1.getBody();
                        var bB_1 = fB_1.getBody();
                        var activeA = bA_1.isAwake() && !bA_1.isStatic();
                        var activeB = bB_1.isAwake() && !bB_1.isStatic();
                        // Is at least one body active (awake and dynamic or kinematic)?
                        if (activeA == false && activeB == false) {
                            continue;
                        }
                        var collideA = bA_1.isBullet() || !bA_1.isDynamic();
                        var collideB = bB_1.isBullet() || !bB_1.isDynamic();
                        // Are these two non-bullet dynamic bodies?
                        if (collideA == false && collideB == false) {
                            continue;
                        }
                        // Compute the TOI for this contact.
                        // Put the sweeps onto the same time interval.
                        var alpha0 = bA_1.m_sweep.alpha0;
                        if (bA_1.m_sweep.alpha0 < bB_1.m_sweep.alpha0) {
                            alpha0 = bB_1.m_sweep.alpha0;
                            bA_1.m_sweep.advance(alpha0);
                        }
                        else if (bB_1.m_sweep.alpha0 < bA_1.m_sweep.alpha0) {
                            alpha0 = bA_1.m_sweep.alpha0;
                            bB_1.m_sweep.advance(alpha0);
                        }
                        var indexA = c_3.getChildIndexA();
                        var indexB = c_3.getChildIndexB();
                        bA_1.m_sweep;
                        bB_1.m_sweep;
                        // Compute the time of impact in interval [0, minTOI]
                        input.proxyA.set(fA_1.getShape(), indexA);
                        input.proxyB.set(fB_1.getShape(), indexB);
                        input.sweepA.set(bA_1.m_sweep);
                        input.sweepB.set(bB_1.m_sweep);
                        input.tMax = 1.0;
                        TimeOfImpact(output, input);
                        // Beta is the fraction of the remaining portion of the [time?].
                        var beta = output.t;
                        if (output.state == exports.TOIOutputState.e_touching) {
                            alpha = math_min$5(alpha0 + (1.0 - alpha0) * beta, 1.0);
                        }
                        else {
                            alpha = 1.0;
                        }
                        c_3.m_toi = alpha;
                        c_3.m_toiFlag = true;
                    }
                    if (alpha < minAlpha) {
                        // This is the minimum TOI found so far.
                        minContact = c_3;
                        minAlpha = alpha;
                    }
                }
                if (minContact == null || 1.0 - 10.0 * EPSILON < minAlpha) {
                    // No more TOI events. Done!
                    world.m_stepComplete = true;
                    break;
                }
                // Advance the bodies to the TOI.
                var fA = minContact.getFixtureA();
                var fB = minContact.getFixtureB();
                var bA = fA.getBody();
                var bB = fB.getBody();
                backup1.set(bA.m_sweep);
                backup2.set(bB.m_sweep);
                bA.advance(minAlpha);
                bB.advance(minAlpha);
                // The TOI contact likely has some new contact points.
                minContact.update(world);
                minContact.m_toiFlag = false;
                ++minContact.m_toiCount;
                // Is the contact solid?
                if (minContact.isEnabled() == false || minContact.isTouching() == false) {
                    // Restore the sweeps.
                    minContact.setEnabled(false);
                    bA.m_sweep.set(backup1);
                    bB.m_sweep.set(backup2);
                    bA.synchronizeTransform();
                    bB.synchronizeTransform();
                    continue;
                }
                bA.setAwake(true);
                bB.setAwake(true);
                // Build the island
                this.clear();
                this.addBody(bA);
                this.addBody(bB);
                this.addContact(minContact);
                bA.m_islandFlag = true;
                bB.m_islandFlag = true;
                minContact.m_islandFlag = true;
                // Get contacts on bodyA and bodyB.
                var bodies = [bA, bB];
                for (var i = 0; i < bodies.length; ++i) {
                    var body = bodies[i];
                    if (body.isDynamic()) {
                        for (var ce = body.m_contactList; ce; ce = ce.next) {
                            // if (this.m_bodyCount == this.m_bodyCapacity) { break; }
                            // if (this.m_contactCount == this.m_contactCapacity) { break; }
                            var contact = ce.contact;
                            // Has this contact already been added to the island?
                            if (contact.m_islandFlag) {
                                continue;
                            }
                            // Only add if either is static, kinematic or bullet.
                            var other = ce.other;
                            if (other.isDynamic() && !body.isBullet() && !other.isBullet()) {
                                continue;
                            }
                            // Skip sensors.
                            var sensorA = contact.m_fixtureA.m_isSensor;
                            var sensorB = contact.m_fixtureB.m_isSensor;
                            if (sensorA || sensorB) {
                                continue;
                            }
                            // Tentatively advance the body to the TOI.
                            backup.set(other.m_sweep);
                            if (other.m_islandFlag == false) {
                                other.advance(minAlpha);
                            }
                            // Update the contact points
                            contact.update(world);
                            // Was the contact disabled by the user?
                            // Are there contact points?
                            if (contact.isEnabled() == false || contact.isTouching() == false) {
                                other.m_sweep.set(backup);
                                other.synchronizeTransform();
                                continue;
                            }
                            // Add the contact to the island
                            contact.m_islandFlag = true;
                            this.addContact(contact);
                            // Has the other body already been added to the island?
                            if (other.m_islandFlag) {
                                continue;
                            }
                            // Add the other body to the island.
                            other.m_islandFlag = true;
                            if (!other.isStatic()) {
                                other.setAwake(true);
                            }
                            this.addBody(other);
                        }
                    }
                }
                s_subStep.reset((1.0 - minAlpha) * step.dt);
                s_subStep.dtRatio = 1.0;
                s_subStep.positionIterations = 20;
                s_subStep.velocityIterations = step.velocityIterations;
                s_subStep.warmStarting = false;
                this.solveIslandTOI(s_subStep, bA, bB);
                // Reset island flags and synchronize broad-phase proxies.
                for (var i = 0; i < this.m_bodies.length; ++i) {
                    var body = this.m_bodies[i];
                    body.m_islandFlag = false;
                    if (!body.isDynamic()) {
                        continue;
                    }
                    body.synchronizeFixtures();
                    // Invalidate all contact TOIs on this displaced body.
                    for (var ce = body.m_contactList; ce; ce = ce.next) {
                        ce.contact.m_toiFlag = false;
                        ce.contact.m_islandFlag = false;
                    }
                }
                // Commit fixture proxy movements to the broad-phase so that new contacts
                // are created.
                // Also, some contacts can be destroyed.
                world.findNewContacts();
                if (world.m_subStepping) {
                    world.m_stepComplete = false;
                    break;
                }
            }
        };
        Solver.prototype.solveIslandTOI = function (subStep, toiA, toiB) {
            // Initialize the body state.
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                copyVec2(body.c_position.c, body.m_sweep.c);
                body.c_position.a = body.m_sweep.a;
                copyVec2(body.c_velocity.v, body.m_linearVelocity);
                body.c_velocity.w = body.m_angularVelocity;
            }
            for (var i = 0; i < this.m_contacts.length; ++i) {
                var contact = this.m_contacts[i];
                contact.initConstraint(subStep);
            }
            // Solve position constraints.
            for (var i = 0; i < subStep.positionIterations; ++i) {
                var minSeparation = 0.0;
                for (var j = 0; j < this.m_contacts.length; ++j) {
                    var contact = this.m_contacts[j];
                    var separation = contact.solvePositionConstraintTOI(subStep, toiA, toiB);
                    minSeparation = math_min$5(minSeparation, separation);
                }
                // We can't expect minSpeparation >= -Settings.linearSlop because we don't
                // push the separation above -Settings.linearSlop.
                var contactsOkay = minSeparation >= -1.5 * SettingsInternal.linearSlop;
                if (contactsOkay) {
                    break;
                }
            }
            var i; 
            // Leap of faith to new safe state.
            copyVec2(toiA.m_sweep.c0, toiA.c_position.c);
            toiA.m_sweep.a0 = toiA.c_position.a;
            copyVec2(toiB.m_sweep.c0, toiB.c_position.c);
            toiB.m_sweep.a0 = toiB.c_position.a;
            // No warm starting is needed for TOI events because warm
            // starting impulses were applied in the discrete solver.
            for (var i = 0; i < this.m_contacts.length; ++i) {
                var contact = this.m_contacts[i];
                contact.initVelocityConstraint(subStep);
            }
            // Solve velocity constraints.
            for (var i = 0; i < subStep.velocityIterations; ++i) {
                for (var j = 0; j < this.m_contacts.length; ++j) {
                    var contact = this.m_contacts[j];
                    contact.solveVelocityConstraint(subStep);
                }
            }
            // Don't store the TOI contact forces for warm starting
            // because they can be quite large.
            var h = subStep.dt;
            // Integrate positions
            for (var i = 0; i < this.m_bodies.length; ++i) {
                var body = this.m_bodies[i];
                copyVec2(c, body.c_position.c);
                var a = body.c_position.a;
                copyVec2(v, body.c_velocity.v);
                var w = body.c_velocity.w;
                // Check for large velocities
                setMulVec2(translation, h, v);
                var translationLengthSqr = lengthSqrVec2(translation);
                if (translationLengthSqr > SettingsInternal.maxTranslationSquared) {
                    var ratio = SettingsInternal.maxTranslation / math_sqrt$3(translationLengthSqr);
                    scaleVec2(v, ratio);
                }
                var rotation = h * w;
                if (rotation * rotation > SettingsInternal.maxRotationSquared) {
                    var ratio = SettingsInternal.maxRotation / math_abs$6(rotation);
                    w *= ratio;
                }
                // Integrate
                addMulVec2(c, h, v);
                a += h * w;
                copyVec2(body.c_position.c, c);
                body.c_position.a = a;
                copyVec2(body.c_velocity.v, v);
                body.c_velocity.w = w;
                // Sync bodies
                copyVec2(body.m_sweep.c, c);
                body.m_sweep.a = a;
                copyVec2(body.m_linearVelocity, v);
                body.m_angularVelocity = w;
                body.synchronizeTransform();
            }
            this.postSolveIsland();
        };
        /** @internal */
        Solver.prototype.postSolveIsland = function () {
            for (var c_5 = 0; c_5 < this.m_contacts.length; ++c_5) {
                var contact = this.m_contacts[c_5];
                this.m_world.postSolve(contact, contact.m_impulse);
            }
        };
        return Solver;
    }());
    // @ts-ignore
    Solver.TimeStep = TimeStep;

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /**
     * A 2-by-2 matrix. Stored in column-major order.
     */
    var Mat22 = /** @class */ (function () {
        function Mat22(a, b, c, d) {
            if (typeof a === 'object' && a !== null) {
                this.ex = Vec2.clone(a);
                this.ey = Vec2.clone(b);
            }
            else if (typeof a === 'number') {
                this.ex = Vec2.neo(a, c);
                this.ey = Vec2.neo(b, d);
            }
            else {
                this.ex = Vec2.zero();
                this.ey = Vec2.zero();
            }
        }
        /** @internal */
        Mat22.prototype.toString = function () {
            return JSON.stringify(this);
        };
        Mat22.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return Vec2.isValid(obj.ex) && Vec2.isValid(obj.ey);
        };
        Mat22.assert = function (o) {
        };
        Mat22.prototype.set = function (a, b, c, d) {
            if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number'
                && typeof d === 'number') {
                this.ex.setNum(a, c);
                this.ey.setNum(b, d);
            }
            else if (typeof a === 'object' && typeof b === 'object') {
                this.ex.setVec2(a);
                this.ey.setVec2(b);
            }
            else if (typeof a === 'object') {
                this.ex.setVec2(a.ex);
                this.ey.setVec2(a.ey);
            }
            else ;
        };
        Mat22.prototype.setIdentity = function () {
            this.ex.x = 1.0;
            this.ey.x = 0.0;
            this.ex.y = 0.0;
            this.ey.y = 1.0;
        };
        Mat22.prototype.setZero = function () {
            this.ex.x = 0.0;
            this.ey.x = 0.0;
            this.ex.y = 0.0;
            this.ey.y = 0.0;
        };
        Mat22.prototype.getInverse = function () {
            var a = this.ex.x;
            var b = this.ey.x;
            var c = this.ex.y;
            var d = this.ey.y;
            var det = a * d - b * c;
            if (det !== 0.0) {
                det = 1.0 / det;
            }
            var imx = new Mat22();
            imx.ex.x = det * d;
            imx.ey.x = -det * b;
            imx.ex.y = -det * c;
            imx.ey.y = det * a;
            return imx;
        };
        /**
         * Solve A * x = b, where b is a column vector. This is more efficient than
         * computing the inverse in one-shot cases.
         */
        Mat22.prototype.solve = function (v) {
            var a = this.ex.x;
            var b = this.ey.x;
            var c = this.ex.y;
            var d = this.ey.y;
            var det = a * d - b * c;
            if (det !== 0.0) {
                det = 1.0 / det;
            }
            var w = Vec2.zero();
            w.x = det * (d * v.x - b * v.y);
            w.y = det * (a * v.y - c * v.x);
            return w;
        };
        Mat22.mul = function (mx, v) {
            if (v && 'x' in v && 'y' in v) {
                var x = mx.ex.x * v.x + mx.ey.x * v.y;
                var y = mx.ex.y * v.x + mx.ey.y * v.y;
                return Vec2.neo(x, y);
            }
            else if (v && 'ex' in v && 'ey' in v) { // Mat22
                // return new Mat22(Vec2.mul(mx, v.ex), Vec2.mul(mx, v.ey));
                var a = mx.ex.x * v.ex.x + mx.ey.x * v.ex.y;
                var b = mx.ex.x * v.ey.x + mx.ey.x * v.ey.y;
                var c = mx.ex.y * v.ex.x + mx.ey.y * v.ex.y;
                var d = mx.ex.y * v.ey.x + mx.ey.y * v.ey.y;
                return new Mat22(a, b, c, d);
            }
        };
        Mat22.mulVec2 = function (mx, v) {
            var x = mx.ex.x * v.x + mx.ey.x * v.y;
            var y = mx.ex.y * v.x + mx.ey.y * v.y;
            return Vec2.neo(x, y);
        };
        Mat22.mulMat22 = function (mx, v) {
            // return new Mat22(Vec2.mul(mx, v.ex), Vec2.mul(mx, v.ey));
            var a = mx.ex.x * v.ex.x + mx.ey.x * v.ex.y;
            var b = mx.ex.x * v.ey.x + mx.ey.x * v.ey.y;
            var c = mx.ex.y * v.ex.x + mx.ey.y * v.ex.y;
            var d = mx.ex.y * v.ey.x + mx.ey.y * v.ey.y;
            return new Mat22(a, b, c, d);
        };
        Mat22.mulT = function (mx, v) {
            if (v && 'x' in v && 'y' in v) { // Vec2
                return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));
            }
            else if (v && 'ex' in v && 'ey' in v) { // Mat22
                var c1 = Vec2.neo(Vec2.dot(mx.ex, v.ex), Vec2.dot(mx.ey, v.ex));
                var c2 = Vec2.neo(Vec2.dot(mx.ex, v.ey), Vec2.dot(mx.ey, v.ey));
                return new Mat22(c1, c2);
            }
        };
        Mat22.mulTVec2 = function (mx, v) {
            return Vec2.neo(Vec2.dot(v, mx.ex), Vec2.dot(v, mx.ey));
        };
        Mat22.mulTMat22 = function (mx, v) {
            var c1 = Vec2.neo(Vec2.dot(mx.ex, v.ex), Vec2.dot(mx.ey, v.ex));
            var c2 = Vec2.neo(Vec2.dot(mx.ex, v.ey), Vec2.dot(mx.ey, v.ey));
            return new Mat22(c1, c2);
        };
        Mat22.abs = function (mx) {
            return new Mat22(Vec2.abs(mx.ex), Vec2.abs(mx.ey));
        };
        Mat22.add = function (mx1, mx2) {
            return new Mat22(Vec2.add(mx1.ex, mx2.ex), Vec2.add(mx1.ey, mx2.ey));
        };
        return Mat22;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_sqrt$2 = Math.sqrt;
    /** @internal */ var pointA$1 = vec2(0, 0);
    /** @internal */ var pointB$1 = vec2(0, 0);
    /** @internal */ var temp$3 = vec2(0, 0);
    /** @internal */ var cA$1 = vec2(0, 0);
    /** @internal */ var cB$1 = vec2(0, 0);
    /** @internal */ var dist = vec2(0, 0);
    /** @internal */ var planePoint$2 = vec2(0, 0);
    /** @internal */ var clipPoint$1 = vec2(0, 0);
    exports.ManifoldType = void 0;
    (function (ManifoldType) {
        ManifoldType[ManifoldType["e_unset"] = -1] = "e_unset";
        ManifoldType[ManifoldType["e_circles"] = 0] = "e_circles";
        ManifoldType[ManifoldType["e_faceA"] = 1] = "e_faceA";
        ManifoldType[ManifoldType["e_faceB"] = 2] = "e_faceB";
    })(exports.ManifoldType || (exports.ManifoldType = {}));
    exports.ContactFeatureType = void 0;
    (function (ContactFeatureType) {
        ContactFeatureType[ContactFeatureType["e_unset"] = -1] = "e_unset";
        ContactFeatureType[ContactFeatureType["e_vertex"] = 0] = "e_vertex";
        ContactFeatureType[ContactFeatureType["e_face"] = 1] = "e_face";
    })(exports.ContactFeatureType || (exports.ContactFeatureType = {}));
    /**
     * This is used for determining the state of contact points.
     */
    exports.PointState = void 0;
    (function (PointState) {
        /** Point does not exist */
        PointState[PointState["nullState"] = 0] = "nullState";
        /** Point was added in the update */
        PointState[PointState["addState"] = 1] = "addState";
        /** Point persisted across the update */
        PointState[PointState["persistState"] = 2] = "persistState";
        /** Point was removed in the update */
        PointState[PointState["removeState"] = 3] = "removeState";
    })(exports.PointState || (exports.PointState = {}));
    /**
     * Used for computing contact manifolds.
     */
    var ClipVertex = /** @class */ (function () {
        function ClipVertex() {
            this.v = vec2(0, 0);
            this.id = new ContactID();
        }
        ClipVertex.prototype.set = function (o) {
            copyVec2(this.v, o.v);
            this.id.set(o.id);
        };
        ClipVertex.prototype.recycle = function () {
            zeroVec2(this.v);
            this.id.recycle();
        };
        return ClipVertex;
    }());
    /**
     * A manifold for two touching convex shapes. Manifolds are created in `evaluate`
     * method of Contact subclasses.
     *
     * Supported manifold types are e_faceA or e_faceB for clip point versus plane
     * with radius and e_circles point versus point with radius.
     *
     * We store contacts in this way so that position correction can account for
     * movement, which is critical for continuous physics. All contact scenarios
     * must be expressed in one of these types. This structure is stored across time
     * steps, so we keep it small.
     */
    var Manifold = /** @class */ (function () {
        function Manifold() {
            /**
             * Usage depends on manifold type:
             * - circles: not used
             * - faceA: the normal on polygonA
             * - faceB: the normal on polygonB
             */
            this.localNormal = vec2(0, 0);
            /**
             * Usage depends on manifold type:
             * - circles: the local center of circleA
             * - faceA: the center of faceA
             * - faceB: the center of faceB
             */
            this.localPoint = vec2(0, 0);
            /** The points of contact */
            this.points = [new ManifoldPoint(), new ManifoldPoint()];
            /** The number of manifold points */
            this.pointCount = 0;
        }
        Manifold.prototype.set = function (that) {
            this.type = that.type;
            copyVec2(this.localNormal, that.localNormal);
            copyVec2(this.localPoint, that.localPoint);
            this.pointCount = that.pointCount;
            this.points[0].set(that.points[0]);
            this.points[1].set(that.points[1]);
        };
        Manifold.prototype.recycle = function () {
            this.type = exports.ManifoldType.e_unset;
            zeroVec2(this.localNormal);
            zeroVec2(this.localPoint);
            this.pointCount = 0;
            this.points[0].recycle();
            this.points[1].recycle();
        };
        /**
         * Evaluate the manifold with supplied transforms. This assumes modest motion
         * from the original state. This does not change the point count, impulses, etc.
         * The radii must come from the shapes that generated the manifold.
         */
        Manifold.prototype.getWorldManifold = function (wm, xfA, radiusA, xfB, radiusB) {
            if (this.pointCount == 0) {
                return wm;
            }
            wm = wm || new WorldManifold();
            wm.pointCount = this.pointCount;
            var normal = wm.normal;
            var points = wm.points;
            var separations = wm.separations;
            switch (this.type) {
                case exports.ManifoldType.e_circles: {
                    setVec2(normal, 1.0, 0.0);
                    var manifoldPoint = this.points[0];
                    transformVec2(pointA$1, xfA, this.localPoint);
                    transformVec2(pointB$1, xfB, manifoldPoint.localPoint);
                    diffVec2(dist, pointB$1, pointA$1);
                    var lengthSqr = lengthSqrVec2(dist);
                    if (lengthSqr > EPSILON * EPSILON) {
                        var length_1 = math_sqrt$2(lengthSqr);
                        setMulVec2(normal, 1 / length_1, dist);
                    }
                    combineVec2(cA$1, 1, pointA$1, radiusA, normal);
                    combineVec2(cB$1, 1, pointB$1, -radiusB, normal);
                    combineVec2(points[0], 0.5, cA$1, 0.5, cB$1);
                    separations[0] = dotVec2(diffVec2(temp$3, cB$1, cA$1), normal);
                    break;
                }
                case exports.ManifoldType.e_faceA: {
                    rotVec2(normal, xfA.q, this.localNormal);
                    transformVec2(planePoint$2, xfA, this.localPoint);
                    for (var i = 0; i < this.pointCount; ++i) {
                        var manifoldPoint = this.points[i];
                        transformVec2(clipPoint$1, xfB, manifoldPoint.localPoint);
                        combineVec2(cA$1, 1, clipPoint$1, radiusA - dotVec2(diffVec2(temp$3, clipPoint$1, planePoint$2), normal), normal);
                        combineVec2(cB$1, 1, clipPoint$1, -radiusB, normal);
                        combineVec2(points[i], 0.5, cA$1, 0.5, cB$1);
                        separations[i] = dotVec2(diffVec2(temp$3, cB$1, cA$1), normal);
                    }
                    break;
                }
                case exports.ManifoldType.e_faceB: {
                    rotVec2(normal, xfB.q, this.localNormal);
                    transformVec2(planePoint$2, xfB, this.localPoint);
                    for (var i = 0; i < this.pointCount; ++i) {
                        var manifoldPoint = this.points[i];
                        transformVec2(clipPoint$1, xfA, manifoldPoint.localPoint);
                        combineVec2(cB$1, 1, clipPoint$1, radiusB - dotVec2(diffVec2(temp$3, clipPoint$1, planePoint$2), normal), normal);
                        combineVec2(cA$1, 1, clipPoint$1, -radiusA, normal);
                        combineVec2(points[i], 0.5, cA$1, 0.5, cB$1);
                        separations[i] = dotVec2(diffVec2(temp$3, cA$1, cB$1), normal);
                    }
                    // Ensure normal points from A to B.
                    negVec2(normal);
                    break;
                }
            }
            return wm;
        };
        Manifold.clipSegmentToLine = clipSegmentToLine;
        Manifold.ClipVertex = ClipVertex;
        Manifold.getPointStates = getPointStates;
        Manifold.PointState = exports.PointState;
        return Manifold;
    }());
    /**
     * A manifold point is a contact point belonging to a contact manifold. It holds
     * details related to the geometry and dynamics of the contact points.
     *
     * This structure is stored across time steps, so we keep it small.
     *
     * Note: impulses are used for internal caching and may not provide reliable
     * contact forces, especially for high speed collisions.
     */
    var ManifoldPoint = /** @class */ (function () {
        function ManifoldPoint() {
            /**
             * Usage depends on manifold type:
             * - circles: the local center of circleB
             * - faceA: the local center of circleB or the clip point of polygonB
             * - faceB: the clip point of polygonA
             */
            this.localPoint = vec2(0, 0);
            /**
             * The non-penetration impulse
             */
            this.normalImpulse = 0;
            /**
             * The friction impulse
             */
            this.tangentImpulse = 0;
            /**
             * Uniquely identifies a contact point between two shapes to facilitate warm starting
             */
            this.id = new ContactID();
        }
        ManifoldPoint.prototype.set = function (that) {
            copyVec2(this.localPoint, that.localPoint);
            this.normalImpulse = that.normalImpulse;
            this.tangentImpulse = that.tangentImpulse;
            this.id.set(that.id);
        };
        ManifoldPoint.prototype.recycle = function () {
            zeroVec2(this.localPoint);
            this.normalImpulse = 0;
            this.tangentImpulse = 0;
            this.id.recycle();
        };
        return ManifoldPoint;
    }());
    /**
     * Contact ids to facilitate warm starting.
     *
     * ContactFeature: The features that intersect to form the contact point.
     */
    var ContactID = /** @class */ (function () {
        function ContactID() {
            /**
             * Used to quickly compare contact ids.
             */
            this.key = -1;
            /** ContactFeature index on shapeA */
            this.indexA = -1;
            /** ContactFeature index on shapeB */
            this.indexB = -1;
            /** ContactFeature type on shapeA */
            this.typeA = exports.ContactFeatureType.e_unset;
            /** ContactFeature type on shapeB */
            this.typeB = exports.ContactFeatureType.e_unset;
        }
        ContactID.prototype.setFeatures = function (indexA, typeA, indexB, typeB) {
            this.indexA = indexA;
            this.indexB = indexB;
            this.typeA = typeA;
            this.typeB = typeB;
            this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64;
        };
        ContactID.prototype.set = function (that) {
            this.indexA = that.indexA;
            this.indexB = that.indexB;
            this.typeA = that.typeA;
            this.typeB = that.typeB;
            this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64;
        };
        ContactID.prototype.swapFeatures = function () {
            var indexA = this.indexA;
            var indexB = this.indexB;
            var typeA = this.typeA;
            var typeB = this.typeB;
            this.indexA = indexB;
            this.indexB = indexA;
            this.typeA = typeB;
            this.typeB = typeA;
            this.key = this.indexA + this.indexB * 4 + this.typeA * 16 + this.typeB * 64;
        };
        ContactID.prototype.recycle = function () {
            this.indexA = 0;
            this.indexB = 0;
            this.typeA = exports.ContactFeatureType.e_unset;
            this.typeB = exports.ContactFeatureType.e_unset;
            this.key = -1;
        };
        return ContactID;
    }());
    /**
     * This is used to compute the current state of a contact manifold.
     */
    var WorldManifold = /** @class */ (function () {
        function WorldManifold() {
            /** World vector pointing from A to B */
            this.normal = vec2(0, 0);
            /** World contact point (point of intersection) */
            this.points = [vec2(0, 0), vec2(0, 0)]; // [maxManifoldPoints]
            /** A negative value indicates overlap, in meters */
            this.separations = [0, 0]; // [maxManifoldPoints]
            /** The number of manifold points */
            this.pointCount = 0;
        }
        WorldManifold.prototype.recycle = function () {
            zeroVec2(this.normal);
            zeroVec2(this.points[0]);
            zeroVec2(this.points[1]);
            this.separations[0] = 0;
            this.separations[1] = 0;
            this.pointCount = 0;
        };
        return WorldManifold;
    }());
    /**
     * Compute the point states given two manifolds. The states pertain to the
     * transition from manifold1 to manifold2. So state1 is either persist or remove
     * while state2 is either add or persist.
     */
    function getPointStates(state1, state2, manifold1, manifold2) {
        // state1, state2: PointState[Settings.maxManifoldPoints]
        // for (var i = 0; i < Settings.maxManifoldPoints; ++i) {
        // state1[i] = PointState.nullState;
        // state2[i] = PointState.nullState;
        // }
        // Detect persists and removes.
        for (var i = 0; i < manifold1.pointCount; ++i) {
            var id = manifold1.points[i].id;
            state1[i] = exports.PointState.removeState;
            for (var j = 0; j < manifold2.pointCount; ++j) {
                if (manifold2.points[j].id.key === id.key) {
                    state1[i] = exports.PointState.persistState;
                    break;
                }
            }
        }
        // Detect persists and adds.
        for (var i = 0; i < manifold2.pointCount; ++i) {
            var id = manifold2.points[i].id;
            state2[i] = exports.PointState.addState;
            for (var j = 0; j < manifold1.pointCount; ++j) {
                if (manifold1.points[j].id.key === id.key) {
                    state2[i] = exports.PointState.persistState;
                    break;
                }
            }
        }
    }
    /**
     * Clipping for contact manifolds. Sutherland-Hodgman clipping.
     */
    function clipSegmentToLine(vOut, vIn, normal, offset, vertexIndexA) {
        // Start with no output points
        var numOut = 0;
        // Calculate the distance of end points to the line
        var distance0 = dotVec2(normal, vIn[0].v) - offset;
        var distance1 = dotVec2(normal, vIn[1].v) - offset;
        // If the points are behind the plane
        if (distance0 <= 0.0)
            vOut[numOut++].set(vIn[0]);
        if (distance1 <= 0.0)
            vOut[numOut++].set(vIn[1]);
        // If the points are on different sides of the plane
        if (distance0 * distance1 < 0.0) {
            // Find intersection point of edge and plane
            var interp = distance0 / (distance0 - distance1);
            combineVec2(vOut[numOut].v, 1 - interp, vIn[0].v, interp, vIn[1].v);
            // VertexA is hitting edgeB.
            vOut[numOut].id.setFeatures(vertexIndexA, exports.ContactFeatureType.e_vertex, vIn[0].id.indexB, exports.ContactFeatureType.e_face);
            ++numOut;
        }
        return numOut;
    }

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_sqrt$1 = Math.sqrt;
    /** @internal */ var math_max$2 = Math.max;
    /** @internal */ var math_min$4 = Math.min;
    /** @internal */ var contactPool = new Pool({
        create: function () {
            return new Contact();
        },
        release: function (contact) {
            contact.recycle();
        }
    });
    /** @internal */ var oldManifold = new Manifold();
    /** @internal */ var worldManifold = new WorldManifold();
    /**
     * A contact edge is used to connect bodies and contacts together in a contact
     * graph where each body is a node and each contact is an edge. A contact edge
     * belongs to a doubly linked list maintained in each attached body. Each
     * contact has two contact nodes, one for each attached body.
     */
    var ContactEdge = /** @class */ (function () {
        function ContactEdge(contact) {
            this.prev = null;
            this.next = null;
            this.other = null;
            this.contact = contact;
        }
        /** @internal */
        ContactEdge.prototype.recycle = function () {
            this.prev = null;
            this.next = null;
            this.other = null;
        };
        return ContactEdge;
    }());
    /**
     * Friction mixing law. The idea is to allow either fixture to drive the
     * friction to zero. For example, anything slides on ice.
     */
    function mixFriction(friction1, friction2) {
        return math_sqrt$1(friction1 * friction2);
    }
    /**
     * Restitution mixing law. The idea is allow for anything to bounce off an
     * inelastic surface. For example, a superball bounces on anything.
     */
    function mixRestitution(restitution1, restitution2) {
        return restitution1 > restitution2 ? restitution1 : restitution2;
    }
    // TODO: move this to Settings?
    /** @internal */ var s_registers = [];
    // TODO: merge with ManifoldPoint?
    var VelocityConstraintPoint = /** @class */ (function () {
        function VelocityConstraintPoint() {
            this.rA = vec2(0, 0);
            this.rB = vec2(0, 0);
            this.normalImpulse = 0;
            this.tangentImpulse = 0;
            this.normalMass = 0;
            this.tangentMass = 0;
            this.velocityBias = 0;
        }
        VelocityConstraintPoint.prototype.recycle = function () {
            zeroVec2(this.rA);
            zeroVec2(this.rB);
            this.normalImpulse = 0;
            this.tangentImpulse = 0;
            this.normalMass = 0;
            this.tangentMass = 0;
            this.velocityBias = 0;
        };
        return VelocityConstraintPoint;
    }());
    /** @internal */ var cA = vec2(0, 0);
    /** @internal */ var vA = vec2(0, 0);
    /** @internal */ var cB = vec2(0, 0);
    /** @internal */ var vB = vec2(0, 0);
    /** @internal */ var tangent$1 = vec2(0, 0);
    /** @internal */ var xfA = transform(0, 0, 0);
    /** @internal */ var xfB = transform(0, 0, 0);
    /** @internal */ var pointA = vec2(0, 0);
    /** @internal */ var pointB = vec2(0, 0);
    /** @internal */ var clipPoint = vec2(0, 0);
    /** @internal */ var planePoint$1 = vec2(0, 0);
    /** @internal */ var rA = vec2(0, 0);
    /** @internal */ var rB = vec2(0, 0);
    /** @internal */ var P$1 = vec2(0, 0);
    /** @internal */ var normal$2 = vec2(0, 0);
    /** @internal */ var point = vec2(0, 0);
    /** @internal */ var dv = vec2(0, 0);
    /** @internal */ var dv1 = vec2(0, 0);
    /** @internal */ var dv2 = vec2(0, 0);
    /** @internal */ var b = vec2(0, 0);
    /** @internal */ var a = vec2(0, 0);
    /** @internal */ var x = vec2(0, 0);
    /** @internal */ var d = vec2(0, 0);
    /** @internal */ var P1 = vec2(0, 0);
    /** @internal */ var P2 = vec2(0, 0);
    /** @internal */ var temp$2 = vec2(0, 0);
    /**
     * The class manages contact between two shapes. A contact exists for each
     * overlapping AABB in the broad-phase (except if filtered). Therefore a contact
     * object may exist that has no contact points.
     */
    var Contact = /** @class */ (function () {
        function Contact() {
            // Nodes for connecting bodies.
            /** @internal */
            this.m_nodeA = new ContactEdge(this);
            /** @internal */
            this.m_nodeB = new ContactEdge(this);
            /** @internal */
            this.m_fixtureA = null;
            /** @internal */
            this.m_fixtureB = null;
            /** @internal */
            this.m_indexA = -1;
            /** @internal */
            this.m_indexB = -1;
            /** @internal */
            this.m_evaluateFcn = null;
            /** @internal */
            this.m_manifold = new Manifold();
            /** @internal */
            this.m_prev = null;
            /** @internal */
            this.m_next = null;
            /** @internal */
            this.m_toi = 1.0;
            /** @internal */
            this.m_toiCount = 0;
            /** @internal This contact has a valid TOI in m_toi */
            this.m_toiFlag = false;
            /** @internal */
            this.m_friction = 0.0;
            /** @internal */
            this.m_restitution = 0.0;
            /** @internal */
            this.m_tangentSpeed = 0.0;
            /** @internal This contact can be disabled (by user) */
            this.m_enabledFlag = true;
            /** @internal Used when crawling contact graph when forming islands. */
            this.m_islandFlag = false;
            /** @internal Set when the shapes are touching. */
            this.m_touchingFlag = false;
            /** @internal This contact needs filtering because a fixture filter was changed. */
            this.m_filterFlag = false;
            /** @internal This bullet contact had a TOI event */
            this.m_bulletHitFlag = false;
            /** @internal Contact reporting impulse object cache */
            this.m_impulse = new ContactImpulse(this);
            // VelocityConstraint
            /** @internal */
            this.v_points = [new VelocityConstraintPoint(), new VelocityConstraintPoint()]; // [maxManifoldPoints];
            /** @internal */
            this.v_normal = vec2(0, 0);
            /** @internal */ this.v_normalMass = new Mat22();
            /** @internal */ this.v_K = new Mat22();
            /** @internal */ this.v_pointCount = 0;
            /** @internal */ this.v_tangentSpeed = 0;
            /** @internal */ this.v_friction = 0;
            /** @internal */ this.v_restitution = 0;
            /** @internal */ this.v_invMassA = 0;
            /** @internal */ this.v_invMassB = 0;
            /** @internal */ this.v_invIA = 0;
            /** @internal */ this.v_invIB = 0;
            // PositionConstraint
            /** @internal */ this.p_localPoints = [vec2(0, 0), vec2(0, 0)]; // [maxManifoldPoints];
            /** @internal */ this.p_localNormal = vec2(0, 0);
            /** @internal */ this.p_localPoint = vec2(0, 0);
            /** @internal */ this.p_localCenterA = vec2(0, 0);
            /** @internal */ this.p_localCenterB = vec2(0, 0);
            /** @internal */ this.p_type = exports.ManifoldType.e_unset;
            /** @internal */ this.p_radiusA = 0;
            /** @internal */ this.p_radiusB = 0;
            /** @internal */ this.p_pointCount = 0;
            /** @internal */ this.p_invMassA = 0;
            /** @internal */ this.p_invMassB = 0;
            /** @internal */ this.p_invIA = 0;
            /** @internal */ this.p_invIB = 0;
        }
        /** @internal */
        Contact.prototype.initialize = function (fA, indexA, fB, indexB, evaluateFcn) {
            this.m_fixtureA = fA;
            this.m_fixtureB = fB;
            this.m_indexA = indexA;
            this.m_indexB = indexB;
            this.m_evaluateFcn = evaluateFcn;
            this.m_friction = mixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction);
            this.m_restitution = mixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution);
        };
        /** @internal */
        Contact.prototype.recycle = function () {
            this.m_nodeA.recycle();
            this.m_nodeB.recycle();
            this.m_fixtureA = null;
            this.m_fixtureB = null;
            this.m_indexA = -1;
            this.m_indexB = -1;
            this.m_evaluateFcn = null;
            this.m_manifold.recycle();
            this.m_prev = null;
            this.m_next = null;
            this.m_toi = 1;
            this.m_toiCount = 0;
            this.m_toiFlag = false;
            this.m_friction = 0;
            this.m_restitution = 0;
            this.m_tangentSpeed = 0;
            this.m_enabledFlag = true;
            this.m_islandFlag = false;
            this.m_touchingFlag = false;
            this.m_filterFlag = false;
            this.m_bulletHitFlag = false;
            this.m_impulse.recycle();
            // VelocityConstraint
            for (var _i = 0, _a = this.v_points; _i < _a.length; _i++) {
                var point_1 = _a[_i];
                point_1.recycle();
            }
            zeroVec2(this.v_normal);
            this.v_normalMass.setZero();
            this.v_K.setZero();
            this.v_pointCount = 0;
            this.v_tangentSpeed = 0;
            this.v_friction = 0;
            this.v_restitution = 0;
            this.v_invMassA = 0;
            this.v_invMassB = 0;
            this.v_invIA = 0;
            this.v_invIB = 0;
            // PositionConstraint
            for (var _b = 0, _c = this.p_localPoints; _b < _c.length; _b++) {
                var point_2 = _c[_b];
                zeroVec2(point_2);
            }
            zeroVec2(this.p_localNormal);
            zeroVec2(this.p_localPoint);
            zeroVec2(this.p_localCenterA);
            zeroVec2(this.p_localCenterB);
            this.p_type = exports.ManifoldType.e_unset;
            this.p_radiusA = 0;
            this.p_radiusB = 0;
            this.p_pointCount = 0;
            this.p_invMassA = 0;
            this.p_invMassB = 0;
            this.p_invIA = 0;
            this.p_invIB = 0;
        };
        Contact.prototype.initConstraint = function (step) {
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            if (fixtureA === null || fixtureB === null)
                return;
            var bodyA = fixtureA.m_body;
            var bodyB = fixtureB.m_body;
            if (bodyA === null || bodyB === null)
                return;
            var shapeA = fixtureA.m_shape;
            var shapeB = fixtureB.m_shape;
            if (shapeA === null || shapeB === null)
                return;
            var manifold = this.m_manifold;
            var pointCount = manifold.pointCount;
            this.v_invMassA = bodyA.m_invMass;
            this.v_invMassB = bodyB.m_invMass;
            this.v_invIA = bodyA.m_invI;
            this.v_invIB = bodyB.m_invI;
            this.v_friction = this.m_friction;
            this.v_restitution = this.m_restitution;
            this.v_tangentSpeed = this.m_tangentSpeed;
            this.v_pointCount = pointCount;
            this.v_K.setZero();
            this.v_normalMass.setZero();
            this.p_invMassA = bodyA.m_invMass;
            this.p_invMassB = bodyB.m_invMass;
            this.p_invIA = bodyA.m_invI;
            this.p_invIB = bodyB.m_invI;
            copyVec2(this.p_localCenterA, bodyA.m_sweep.localCenter);
            copyVec2(this.p_localCenterB, bodyB.m_sweep.localCenter);
            this.p_radiusA = shapeA.m_radius;
            this.p_radiusB = shapeB.m_radius;
            this.p_type = manifold.type;
            copyVec2(this.p_localNormal, manifold.localNormal);
            copyVec2(this.p_localPoint, manifold.localPoint);
            this.p_pointCount = pointCount;
            for (var j = 0; j < SettingsInternal.maxManifoldPoints; ++j) {
                this.v_points[j].recycle();
                zeroVec2(this.p_localPoints[j]);
            }
            for (var j = 0; j < pointCount; ++j) {
                var cp = manifold.points[j];
                var vcp = this.v_points[j];
                if (step.warmStarting) {
                    vcp.normalImpulse = step.dtRatio * cp.normalImpulse;
                    vcp.tangentImpulse = step.dtRatio * cp.tangentImpulse;
                }
                copyVec2(this.p_localPoints[j], cp.localPoint);
            }
        };
        /**
         * Get the contact manifold. Do not modify the manifold unless you understand
         * the internals of the library.
         */
        Contact.prototype.getManifold = function () {
            return this.m_manifold;
        };
        /**
         * Get the world manifold.
         */
        Contact.prototype.getWorldManifold = function (worldManifold) {
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            if (fixtureA === null || fixtureB === null)
                return;
            var bodyA = fixtureA.m_body;
            var bodyB = fixtureB.m_body;
            if (bodyA === null || bodyB === null)
                return;
            var shapeA = fixtureA.m_shape;
            var shapeB = fixtureB.m_shape;
            if (shapeA === null || shapeB === null)
                return;
            return this.m_manifold.getWorldManifold(worldManifold, bodyA.getTransform(), shapeA.m_radius, bodyB.getTransform(), shapeB.m_radius);
        };
        /**
         * Enable/disable this contact. This can be used inside the pre-solve contact
         * listener. The contact is only disabled for the current time step (or sub-step
         * in continuous collisions).
         */
        Contact.prototype.setEnabled = function (flag) {
            this.m_enabledFlag = !!flag;
        };
        /**
         * Has this contact been disabled?
         */
        Contact.prototype.isEnabled = function () {
            return this.m_enabledFlag;
        };
        /**
         * Is this contact touching?
         */
        Contact.prototype.isTouching = function () {
            return this.m_touchingFlag;
        };
        /**
         * Get the next contact in the world's contact list.
         */
        Contact.prototype.getNext = function () {
            return this.m_next;
        };
        /**
         * Get fixture A in this contact.
         */
        Contact.prototype.getFixtureA = function () {
            return this.m_fixtureA;
        };
        /**
         * Get fixture B in this contact.
         */
        Contact.prototype.getFixtureB = function () {
            return this.m_fixtureB;
        };
        /**
         * Get the child primitive index for fixture A.
         */
        Contact.prototype.getChildIndexA = function () {
            return this.m_indexA;
        };
        /**
         * Get the child primitive index for fixture B.
         */
        Contact.prototype.getChildIndexB = function () {
            return this.m_indexB;
        };
        /**
         * Flag this contact for filtering. Filtering will occur the next time step.
         */
        Contact.prototype.flagForFiltering = function () {
            this.m_filterFlag = true;
        };
        /**
         * Override the default friction mixture. You can call this in
         * ContactListener.preSolve. This value persists until set or reset.
         */
        Contact.prototype.setFriction = function (friction) {
            this.m_friction = friction;
        };
        /**
         * Get the friction.
         */
        Contact.prototype.getFriction = function () {
            return this.m_friction;
        };
        /**
         * Reset the friction mixture to the default value.
         */
        Contact.prototype.resetFriction = function () {
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            if (fixtureA === null || fixtureB === null)
                return;
            this.m_friction = mixFriction(fixtureA.m_friction, fixtureB.m_friction);
        };
        /**
         * Override the default restitution mixture. You can call this in
         * ContactListener.preSolve. The value persists until you set or reset.
         */
        Contact.prototype.setRestitution = function (restitution) {
            this.m_restitution = restitution;
        };
        /**
         * Get the restitution.
         */
        Contact.prototype.getRestitution = function () {
            return this.m_restitution;
        };
        /**
         * Reset the restitution to the default value.
         */
        Contact.prototype.resetRestitution = function () {
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            if (fixtureA === null || fixtureB === null)
                return;
            this.m_restitution = mixRestitution(fixtureA.m_restitution, fixtureB.m_restitution);
        };
        /**
         * Set the desired tangent speed for a conveyor belt behavior. In meters per
         * second.
         */
        Contact.prototype.setTangentSpeed = function (speed) {
            this.m_tangentSpeed = speed;
        };
        /**
         * Get the desired tangent speed. In meters per second.
         */
        Contact.prototype.getTangentSpeed = function () {
            return this.m_tangentSpeed;
        };
        /**
         * Called by Update method, and implemented by subclasses.
         */
        Contact.prototype.evaluate = function (manifold, xfA, xfB) {
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            if (fixtureA === null || fixtureB === null)
                return;
            this.m_evaluateFcn(manifold, xfA, fixtureA, this.m_indexA, xfB, fixtureB, this.m_indexB);
        };
        /**
         * Updates the contact manifold and touching status.
         *
         * Note: do not assume the fixture AABBs are overlapping or are valid.
         *
         * @param listener.beginContact
         * @param listener.endContact
         * @param listener.preSolve
         */
        Contact.prototype.update = function (listener) {
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            if (fixtureA === null || fixtureB === null)
                return;
            var bodyA = fixtureA.m_body;
            var bodyB = fixtureB.m_body;
            if (bodyA === null || bodyB === null)
                return;
            var shapeA = fixtureA.m_shape;
            var shapeB = fixtureB.m_shape;
            if (shapeA === null || shapeB === null)
                return;
            // Re-enable this contact.
            this.m_enabledFlag = true;
            var touching = false;
            var wasTouching = this.m_touchingFlag;
            var sensorA = fixtureA.m_isSensor;
            var sensorB = fixtureB.m_isSensor;
            var sensor = sensorA || sensorB;
            var xfA = bodyA.m_xf;
            var xfB = bodyB.m_xf;
            // Is this contact a sensor?
            if (sensor) {
                touching = testOverlap(shapeA, this.m_indexA, shapeB, this.m_indexB, xfA, xfB);
                // Sensors don't generate manifolds.
                this.m_manifold.pointCount = 0;
            }
            else {
                oldManifold.recycle();
                oldManifold.set(this.m_manifold);
                this.m_manifold.recycle();
                this.evaluate(this.m_manifold, xfA, xfB);
                touching = this.m_manifold.pointCount > 0;
                // Match old contact ids to new contact ids and copy the
                // stored impulses to warm start the solver.
                for (var i = 0; i < this.m_manifold.pointCount; ++i) {
                    var nmp = this.m_manifold.points[i];
                    nmp.normalImpulse = 0.0;
                    nmp.tangentImpulse = 0.0;
                    for (var j = 0; j < oldManifold.pointCount; ++j) {
                        var omp = oldManifold.points[j];
                        if (omp.id.key === nmp.id.key) {
                            nmp.normalImpulse = omp.normalImpulse;
                            nmp.tangentImpulse = omp.tangentImpulse;
                            break;
                        }
                    }
                }
                if (touching !== wasTouching) {
                    bodyA.setAwake(true);
                    bodyB.setAwake(true);
                }
            }
            this.m_touchingFlag = touching;
            var hasListener = typeof listener === 'object' && listener !== null;
            if (!wasTouching && touching && hasListener) {
                listener.beginContact(this);
            }
            if (wasTouching && !touching && hasListener) {
                listener.endContact(this);
            }
            if (!sensor && touching && hasListener && oldManifold) {
                listener.preSolve(this, oldManifold);
            }
        };
        Contact.prototype.solvePositionConstraint = function (step) {
            return this._solvePositionConstraint(step, null, null);
        };
        Contact.prototype.solvePositionConstraintTOI = function (step, toiA, toiB) {
            return this._solvePositionConstraint(step, toiA, toiB);
        };
        Contact.prototype._solvePositionConstraint = function (step, toiA, toiB) {
            var toi = toiA !== null && toiB !== null ? true : false;
            var minSeparation = 0.0;
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            if (fixtureA === null || fixtureB === null)
                return minSeparation;
            var bodyA = fixtureA.m_body;
            var bodyB = fixtureB.m_body;
            if (bodyA === null || bodyB === null)
                return minSeparation;
            bodyA.c_velocity;
            bodyB.c_velocity;
            var positionA = bodyA.c_position;
            var positionB = bodyB.c_position;
            var localCenterA = this.p_localCenterA;
            var localCenterB = this.p_localCenterB;
            var mA = 0.0;
            var iA = 0.0;
            if (!toi || (bodyA === toiA || bodyA === toiB)) {
                mA = this.p_invMassA;
                iA = this.p_invIA;
            }
            var mB = 0.0;
            var iB = 0.0;
            if (!toi || (bodyB === toiA || bodyB === toiB)) {
                mB = this.p_invMassB;
                iB = this.p_invIB;
            }
            copyVec2(cA, positionA.c);
            var aA = positionA.a;
            copyVec2(cB, positionB.c);
            var aB = positionB.a;
            // Solve normal constraints
            for (var j = 0; j < this.p_pointCount; ++j) {
                getTransform(xfA, localCenterA, cA, aA);
                getTransform(xfB, localCenterB, cB, aB);
                // PositionSolverManifold
                var separation = void 0;
                switch (this.p_type) {
                    case exports.ManifoldType.e_circles: {
                        transformVec2(pointA, xfA, this.p_localPoint);
                        transformVec2(pointB, xfB, this.p_localPoints[0]);
                        diffVec2(normal$2, pointB, pointA);
                        normalizeVec2(normal$2);
                        combineVec2(point, 0.5, pointA, 0.5, pointB);
                        separation = dotVec2(pointB, normal$2) - dotVec2(pointA, normal$2) - this.p_radiusA - this.p_radiusB;
                        break;
                    }
                    case exports.ManifoldType.e_faceA: {
                        rotVec2(normal$2, xfA.q, this.p_localNormal);
                        transformVec2(planePoint$1, xfA, this.p_localPoint);
                        transformVec2(clipPoint, xfB, this.p_localPoints[j]);
                        separation = dotVec2(clipPoint, normal$2) - dotVec2(planePoint$1, normal$2) - this.p_radiusA - this.p_radiusB;
                        copyVec2(point, clipPoint);
                        break;
                    }
                    case exports.ManifoldType.e_faceB: {
                        rotVec2(normal$2, xfB.q, this.p_localNormal);
                        transformVec2(planePoint$1, xfB, this.p_localPoint);
                        transformVec2(clipPoint, xfA, this.p_localPoints[j]);
                        separation = dotVec2(clipPoint, normal$2) - dotVec2(planePoint$1, normal$2) - this.p_radiusA - this.p_radiusB;
                        copyVec2(point, clipPoint);
                        // Ensure normal points from A to B
                        negVec2(normal$2);
                        break;
                    }
                    // todo: what should we do here?
                    default: {
                        return minSeparation;
                    }
                }
                diffVec2(rA, point, cA);
                diffVec2(rB, point, cB);
                // Track max constraint error.
                minSeparation = math_min$4(minSeparation, separation);
                var baumgarte = toi ? SettingsInternal.toiBaugarte : SettingsInternal.baumgarte;
                var linearSlop = SettingsInternal.linearSlop;
                var maxLinearCorrection = SettingsInternal.maxLinearCorrection;
                // Prevent large corrections and allow slop.
                var C = clamp(baumgarte * (separation + linearSlop), -maxLinearCorrection, 0.0);
                // Compute the effective mass.
                var rnA = crossVec2Vec2(rA, normal$2);
                var rnB = crossVec2Vec2(rB, normal$2);
                var K = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
                // Compute normal impulse
                var impulse = K > 0.0 ? -C / K : 0.0;
                setMulVec2(P$1, impulse, normal$2);
                subMulVec2(cA, mA, P$1);
                aA -= iA * crossVec2Vec2(rA, P$1);
                addMulVec2(cB, mB, P$1);
                aB += iB * crossVec2Vec2(rB, P$1);
            }
            copyVec2(positionA.c, cA);
            positionA.a = aA;
            copyVec2(positionB.c, cB);
            positionB.a = aB;
            return minSeparation;
        };
        Contact.prototype.initVelocityConstraint = function (step) {
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            if (fixtureA === null || fixtureB === null)
                return;
            var bodyA = fixtureA.m_body;
            var bodyB = fixtureB.m_body;
            if (bodyA === null || bodyB === null)
                return;
            var velocityA = bodyA.c_velocity;
            var velocityB = bodyB.c_velocity;
            var positionA = bodyA.c_position;
            var positionB = bodyB.c_position;
            var radiusA = this.p_radiusA;
            var radiusB = this.p_radiusB;
            var manifold = this.m_manifold;
            var mA = this.v_invMassA;
            var mB = this.v_invMassB;
            var iA = this.v_invIA;
            var iB = this.v_invIB;
            var localCenterA = this.p_localCenterA;
            var localCenterB = this.p_localCenterB;
            copyVec2(cA, positionA.c);
            var aA = positionA.a;
            copyVec2(vA, velocityA.v);
            var wA = velocityA.w;
            copyVec2(cB, positionB.c);
            var aB = positionB.a;
            copyVec2(vB, velocityB.v);
            var wB = velocityB.w;
            getTransform(xfA, localCenterA, cA, aA);
            getTransform(xfB, localCenterB, cB, aB);
            worldManifold.recycle();
            manifold.getWorldManifold(worldManifold, xfA, radiusA, xfB, radiusB);
            copyVec2(this.v_normal, worldManifold.normal);
            for (var j = 0; j < this.v_pointCount; ++j) {
                var vcp = this.v_points[j]; // VelocityConstraintPoint
                var wmp = worldManifold.points[j];
                diffVec2(vcp.rA, wmp, cA);
                diffVec2(vcp.rB, wmp, cB);
                var rnA = crossVec2Vec2(vcp.rA, this.v_normal);
                var rnB = crossVec2Vec2(vcp.rB, this.v_normal);
                var kNormal = mA + mB + iA * rnA * rnA + iB * rnB * rnB;
                vcp.normalMass = kNormal > 0.0 ? 1.0 / kNormal : 0.0;
                crossVec2Num(tangent$1, this.v_normal, 1.0);
                var rtA = crossVec2Vec2(vcp.rA, tangent$1);
                var rtB = crossVec2Vec2(vcp.rB, tangent$1);
                var kTangent = mA + mB + iA * rtA * rtA + iB * rtB * rtB;
                vcp.tangentMass = kTangent > 0.0 ? 1.0 / kTangent : 0.0;
                // Setup a velocity bias for restitution.
                vcp.velocityBias = 0.0;
                var vRel = 0;
                vRel += dotVec2(this.v_normal, vB);
                vRel += dotVec2(this.v_normal, crossNumVec2(temp$2, wB, vcp.rB));
                vRel -= dotVec2(this.v_normal, vA);
                vRel -= dotVec2(this.v_normal, crossNumVec2(temp$2, wA, vcp.rA));
                if (vRel < -SettingsInternal.velocityThreshold) {
                    vcp.velocityBias = -this.v_restitution * vRel;
                }
            }
            // If we have two points, then prepare the block solver.
            if (this.v_pointCount == 2 && step.blockSolve) {
                var vcp1 = this.v_points[0]; // VelocityConstraintPoint
                var vcp2 = this.v_points[1]; // VelocityConstraintPoint
                var rn1A = crossVec2Vec2(vcp1.rA, this.v_normal);
                var rn1B = crossVec2Vec2(vcp1.rB, this.v_normal);
                var rn2A = crossVec2Vec2(vcp2.rA, this.v_normal);
                var rn2B = crossVec2Vec2(vcp2.rB, this.v_normal);
                var k11 = mA + mB + iA * rn1A * rn1A + iB * rn1B * rn1B;
                var k22 = mA + mB + iA * rn2A * rn2A + iB * rn2B * rn2B;
                var k12 = mA + mB + iA * rn1A * rn2A + iB * rn1B * rn2B;
                // Ensure a reasonable condition number.
                var k_maxConditionNumber = 1000.0;
                if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
                    // K is safe to invert.
                    this.v_K.ex.setNum(k11, k12);
                    this.v_K.ey.setNum(k12, k22);
                    // this.v_normalMass.set(this.v_K.getInverse());
                    var a_1 = this.v_K.ex.x;
                    var b_1 = this.v_K.ey.x;
                    var c = this.v_K.ex.y;
                    var d_1 = this.v_K.ey.y;
                    var det = a_1 * d_1 - b_1 * c;
                    if (det !== 0.0) {
                        det = 1.0 / det;
                    }
                    this.v_normalMass.ex.x = det * d_1;
                    this.v_normalMass.ey.x = -det * b_1;
                    this.v_normalMass.ex.y = -det * c;
                    this.v_normalMass.ey.y = det * a_1;
                }
                else {
                    // The constraints are redundant, just use one.
                    // TODO_ERIN use deepest?
                    this.v_pointCount = 1;
                }
            }
            copyVec2(positionA.c, cA);
            positionA.a = aA;
            copyVec2(velocityA.v, vA);
            velocityA.w = wA;
            copyVec2(positionB.c, cB);
            positionB.a = aB;
            copyVec2(velocityB.v, vB);
            velocityB.w = wB;
        };
        Contact.prototype.warmStartConstraint = function (step) {
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            if (fixtureA === null || fixtureB === null)
                return;
            var bodyA = fixtureA.m_body;
            var bodyB = fixtureB.m_body;
            if (bodyA === null || bodyB === null)
                return;
            var velocityA = bodyA.c_velocity;
            var velocityB = bodyB.c_velocity;
            bodyA.c_position;
            bodyB.c_position;
            var mA = this.v_invMassA;
            var iA = this.v_invIA;
            var mB = this.v_invMassB;
            var iB = this.v_invIB;
            copyVec2(vA, velocityA.v);
            var wA = velocityA.w;
            copyVec2(vB, velocityB.v);
            var wB = velocityB.w;
            copyVec2(normal$2, this.v_normal);
            crossVec2Num(tangent$1, normal$2, 1.0);
            for (var j = 0; j < this.v_pointCount; ++j) {
                var vcp = this.v_points[j]; // VelocityConstraintPoint
                combineVec2(P$1, vcp.normalImpulse, normal$2, vcp.tangentImpulse, tangent$1);
                wA -= iA * crossVec2Vec2(vcp.rA, P$1);
                subMulVec2(vA, mA, P$1);
                wB += iB * crossVec2Vec2(vcp.rB, P$1);
                addMulVec2(vB, mB, P$1);
            }
            copyVec2(velocityA.v, vA);
            velocityA.w = wA;
            copyVec2(velocityB.v, vB);
            velocityB.w = wB;
        };
        Contact.prototype.storeConstraintImpulses = function (step) {
            var manifold = this.m_manifold;
            for (var j = 0; j < this.v_pointCount; ++j) {
                manifold.points[j].normalImpulse = this.v_points[j].normalImpulse;
                manifold.points[j].tangentImpulse = this.v_points[j].tangentImpulse;
            }
        };
        Contact.prototype.solveVelocityConstraint = function (step) {
            var fixtureA = this.m_fixtureA;
            var fixtureB = this.m_fixtureB;
            if (fixtureA === null || fixtureB === null)
                return;
            var bodyA = fixtureA.m_body;
            var bodyB = fixtureB.m_body;
            if (bodyA === null || bodyB === null)
                return;
            var velocityA = bodyA.c_velocity;
            bodyA.c_position;
            var velocityB = bodyB.c_velocity;
            bodyB.c_position;
            var mA = this.v_invMassA;
            var iA = this.v_invIA;
            var mB = this.v_invMassB;
            var iB = this.v_invIB;
            copyVec2(vA, velocityA.v);
            var wA = velocityA.w;
            copyVec2(vB, velocityB.v);
            var wB = velocityB.w;
            copyVec2(normal$2, this.v_normal);
            crossVec2Num(tangent$1, normal$2, 1.0);
            var friction = this.v_friction;
            // Solve tangent constraints first because non-penetration is more important
            // than friction.
            for (var j = 0; j < this.v_pointCount; ++j) {
                var vcp = this.v_points[j]; // VelocityConstraintPoint
                // Relative velocity at contact
                zeroVec2(dv);
                addVec2(dv, vB);
                addVec2(dv, crossNumVec2(temp$2, wB, vcp.rB));
                subVec2(dv, vA);
                subVec2(dv, crossNumVec2(temp$2, wA, vcp.rA));
                // Compute tangent force
                var vt = dotVec2(dv, tangent$1) - this.v_tangentSpeed;
                var lambda = vcp.tangentMass * (-vt);
                // Clamp the accumulated force
                var maxFriction = friction * vcp.normalImpulse;
                var newImpulse = clamp(vcp.tangentImpulse + lambda, -maxFriction, maxFriction);
                lambda = newImpulse - vcp.tangentImpulse;
                vcp.tangentImpulse = newImpulse;
                // Apply contact impulse
                setMulVec2(P$1, lambda, tangent$1);
                subMulVec2(vA, mA, P$1);
                wA -= iA * crossVec2Vec2(vcp.rA, P$1);
                addMulVec2(vB, mB, P$1);
                wB += iB * crossVec2Vec2(vcp.rB, P$1);
            }
            // Solve normal constraints
            if (this.v_pointCount == 1 || step.blockSolve == false) {
                for (var i = 0; i < this.v_pointCount; ++i) {
                    var vcp = this.v_points[i]; // VelocityConstraintPoint
                    // Relative velocity at contact
                    zeroVec2(dv);
                    addVec2(dv, vB);
                    addVec2(dv, crossNumVec2(temp$2, wB, vcp.rB));
                    subVec2(dv, vA);
                    subVec2(dv, crossNumVec2(temp$2, wA, vcp.rA));
                    // Compute normal impulse
                    var vn = dotVec2(dv, normal$2);
                    var lambda = -vcp.normalMass * (vn - vcp.velocityBias);
                    // Clamp the accumulated impulse
                    var newImpulse = math_max$2(vcp.normalImpulse + lambda, 0.0);
                    lambda = newImpulse - vcp.normalImpulse;
                    vcp.normalImpulse = newImpulse;
                    // Apply contact impulse
                    setMulVec2(P$1, lambda, normal$2);
                    subMulVec2(vA, mA, P$1);
                    wA -= iA * crossVec2Vec2(vcp.rA, P$1);
                    addMulVec2(vB, mB, P$1);
                    wB += iB * crossVec2Vec2(vcp.rB, P$1);
                }
            }
            else {
                // Block solver developed in collaboration with Dirk Gregorius (back in
                // 01/07 on Box2D_Lite).
                // Build the mini LCP for this contact patch
                //
                // vn = A * x + b, vn >= 0, x >= 0 and vn_i * x_i = 0 with i = 1..2
                //
                // A = J * W * JT and J = ( -n, -r1 x n, n, r2 x n )
                // b = vn0 - velocityBias
                //
                // The system is solved using the "Total enumeration method" (s. Murty).
                // The complementary constraint vn_i * x_i
                // implies that we must have in any solution either vn_i = 0 or x_i = 0.
                // So for the 2D contact problem the cases
                // vn1 = 0 and vn2 = 0, x1 = 0 and x2 = 0, x1 = 0 and vn2 = 0, x2 = 0 and
                // vn1 = 0 need to be tested. The first valid
                // solution that satisfies the problem is chosen.
                //
                // In order to account of the accumulated impulse 'a' (because of the
                // iterative nature of the solver which only requires
                // that the accumulated impulse is clamped and not the incremental
                // impulse) we change the impulse variable (x_i).
                //
                // Substitute:
                //
                // x = a + d
                //
                // a := old total impulse
                // x := new total impulse
                // d := incremental impulse
                //
                // For the current iteration we extend the formula for the incremental
                // impulse
                // to compute the new total impulse:
                //
                // vn = A * d + b
                // = A * (x - a) + b
                // = A * x + b - A * a
                // = A * x + b'
                // b' = b - A * a;
                var vcp1 = this.v_points[0]; // VelocityConstraintPoint
                var vcp2 = this.v_points[1]; // VelocityConstraintPoint
                setVec2(a, vcp1.normalImpulse, vcp2.normalImpulse);
                // Relative velocity at contact
                // let dv1 = Vec2.zero().add(vB).add(Vec2.crossNumVec2(wB, vcp1.rB)).sub(vA).sub(Vec2.crossNumVec2(wA, vcp1.rA));
                zeroVec2(dv1);
                addVec2(dv1, vB);
                addVec2(dv1, crossNumVec2(temp$2, wB, vcp1.rB));
                subVec2(dv1, vA);
                subVec2(dv1, crossNumVec2(temp$2, wA, vcp1.rA));
                // let dv2 = Vec2.zero().add(vB).add(Vec2.crossNumVec2(wB, vcp2.rB)).sub(vA).sub(Vec2.crossNumVec2(wA, vcp2.rA));
                zeroVec2(dv2);
                addVec2(dv2, vB);
                addVec2(dv2, crossNumVec2(temp$2, wB, vcp2.rB));
                subVec2(dv2, vA);
                subVec2(dv2, crossNumVec2(temp$2, wA, vcp2.rA));
                // Compute normal velocity
                var vn1 = dotVec2(dv1, normal$2);
                var vn2 = dotVec2(dv2, normal$2);
                setVec2(b, vn1 - vcp1.velocityBias, vn2 - vcp2.velocityBias);
                // Compute b'
                // b.sub(Mat22.mulVec2(this.v_K, a));
                b.x -= this.v_K.ex.x * a.x + this.v_K.ey.x * a.y;
                b.y -= this.v_K.ex.y * a.x + this.v_K.ey.y * a.y;
                // NOT_USED(k_errorTol);
                while (true) {
                    //
                    // Case 1: vn = 0
                    //
                    // 0 = A * x + b'
                    //
                    // Solve for x:
                    //
                    // x = - inv(A) * b'
                    //
                    // const x = Mat22.mulVec2(this.v_normalMass, b).neg();
                    zeroVec2(x);
                    x.x = -(this.v_normalMass.ex.x * b.x + this.v_normalMass.ey.x * b.y);
                    x.y = -(this.v_normalMass.ex.y * b.x + this.v_normalMass.ey.y * b.y);
                    if (x.x >= 0.0 && x.y >= 0.0) {
                        // Get the incremental impulse
                        diffVec2(d, x, a);
                        // Apply incremental impulse
                        setMulVec2(P1, d.x, normal$2);
                        setMulVec2(P2, d.y, normal$2);
                        // vA.subCombine(mA, P1, mA, P2);
                        subMulVec2(vA, mA, P1);
                        subMulVec2(vA, mA, P2);
                        wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
                        // vB.addCombine(mB, P1, mB, P2);
                        addMulVec2(vB, mB, P1);
                        addMulVec2(vB, mB, P2);
                        wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
                        // Accumulate
                        vcp1.normalImpulse = x.x;
                        vcp2.normalImpulse = x.y;
                        break;
                    }
                    //
                    // Case 2: vn1 = 0 and x2 = 0
                    //
                    // 0 = a11 * x1 + a12 * 0 + b1'
                    // vn2 = a21 * x1 + a22 * 0 + b2'
                    //
                    x.x = -vcp1.normalMass * b.x;
                    x.y = 0.0;
                    vn1 = 0.0;
                    vn2 = this.v_K.ex.y * x.x + b.y;
                    if (x.x >= 0.0 && vn2 >= 0.0) {
                        // Get the incremental impulse
                        diffVec2(d, x, a);
                        // Apply incremental impulse
                        setMulVec2(P1, d.x, normal$2);
                        setMulVec2(P2, d.y, normal$2);
                        // vA.subCombine(mA, P1, mA, P2);
                        subMulVec2(vA, mA, P1);
                        subMulVec2(vA, mA, P2);
                        wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
                        // vB.addCombine(mB, P1, mB, P2);
                        addMulVec2(vB, mB, P1);
                        addMulVec2(vB, mB, P2);
                        wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
                        // Accumulate
                        vcp1.normalImpulse = x.x;
                        vcp2.normalImpulse = x.y;
                        break;
                    }
                    //
                    // Case 3: vn2 = 0 and x1 = 0
                    //
                    // vn1 = a11 * 0 + a12 * x2 + b1'
                    // 0 = a21 * 0 + a22 * x2 + b2'
                    //
                    x.x = 0.0;
                    x.y = -vcp2.normalMass * b.y;
                    vn1 = this.v_K.ey.x * x.y + b.x;
                    vn2 = 0.0;
                    if (x.y >= 0.0 && vn1 >= 0.0) {
                        // Resubstitute for the incremental impulse
                        diffVec2(d, x, a);
                        // Apply incremental impulse
                        setMulVec2(P1, d.x, normal$2);
                        setMulVec2(P2, d.y, normal$2);
                        // vA.subCombine(mA, P1, mA, P2);
                        subMulVec2(vA, mA, P1);
                        subMulVec2(vA, mA, P2);
                        wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
                        // vB.addCombine(mB, P1, mB, P2);
                        addMulVec2(vB, mB, P1);
                        addMulVec2(vB, mB, P2);
                        wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
                        // Accumulate
                        vcp1.normalImpulse = x.x;
                        vcp2.normalImpulse = x.y;
                        break;
                    }
                    //
                    // Case 4: x1 = 0 and x2 = 0
                    //
                    // vn1 = b1
                    // vn2 = b2;
                    //
                    x.x = 0.0;
                    x.y = 0.0;
                    vn1 = b.x;
                    vn2 = b.y;
                    if (vn1 >= 0.0 && vn2 >= 0.0) {
                        // Resubstitute for the incremental impulse
                        diffVec2(d, x, a);
                        // Apply incremental impulse
                        setMulVec2(P1, d.x, normal$2);
                        setMulVec2(P2, d.y, normal$2);
                        // vA.subCombine(mA, P1, mA, P2);
                        subMulVec2(vA, mA, P1);
                        subMulVec2(vA, mA, P2);
                        wA -= iA * (crossVec2Vec2(vcp1.rA, P1) + crossVec2Vec2(vcp2.rA, P2));
                        // vB.addCombine(mB, P1, mB, P2);
                        addMulVec2(vB, mB, P1);
                        addMulVec2(vB, mB, P2);
                        wB += iB * (crossVec2Vec2(vcp1.rB, P1) + crossVec2Vec2(vcp2.rB, P2));
                        // Accumulate
                        vcp1.normalImpulse = x.x;
                        vcp2.normalImpulse = x.y;
                        break;
                    }
                    // No solution, give up. This is hit sometimes, but it doesn't seem to
                    // matter.
                    break;
                }
            }
            copyVec2(velocityA.v, vA);
            velocityA.w = wA;
            copyVec2(velocityB.v, vB);
            velocityB.w = wB;
        };
        /** @internal */
        Contact.addType = function (type1, type2, callback) {
            s_registers[type1] = s_registers[type1] || {};
            s_registers[type1][type2] = callback;
        };
        /** @internal */
        Contact.create = function (fixtureA, indexA, fixtureB, indexB) {
            var typeA = fixtureA.m_shape.m_type;
            var typeB = fixtureB.m_shape.m_type;
            var contact = contactPool.allocate();
            var evaluateFcn;
            if (evaluateFcn = s_registers[typeA] && s_registers[typeA][typeB]) {
                contact.initialize(fixtureA, indexA, fixtureB, indexB, evaluateFcn);
            }
            else if (evaluateFcn = s_registers[typeB] && s_registers[typeB][typeA]) {
                contact.initialize(fixtureB, indexB, fixtureA, indexA, evaluateFcn);
            }
            else {
                return null;
            }
            // Contact creation may swap fixtures.
            fixtureA = contact.m_fixtureA;
            fixtureB = contact.m_fixtureB;
            indexA = contact.getChildIndexA();
            indexB = contact.getChildIndexB();
            var bodyA = fixtureA.m_body;
            var bodyB = fixtureB.m_body;
            // Connect to body A
            contact.m_nodeA.contact = contact;
            contact.m_nodeA.other = bodyB;
            contact.m_nodeA.prev = null;
            contact.m_nodeA.next = bodyA.m_contactList;
            if (bodyA.m_contactList != null) {
                bodyA.m_contactList.prev = contact.m_nodeA;
            }
            bodyA.m_contactList = contact.m_nodeA;
            // Connect to body B
            contact.m_nodeB.contact = contact;
            contact.m_nodeB.other = bodyA;
            contact.m_nodeB.prev = null;
            contact.m_nodeB.next = bodyB.m_contactList;
            if (bodyB.m_contactList != null) {
                bodyB.m_contactList.prev = contact.m_nodeB;
            }
            bodyB.m_contactList = contact.m_nodeB;
            // Wake up the bodies
            if (fixtureA.isSensor() == false && fixtureB.isSensor() == false) {
                bodyA.setAwake(true);
                bodyB.setAwake(true);
            }
            return contact;
        };
        /** @internal */
        Contact.destroy = function (contact, listener) {
            var fixtureA = contact.m_fixtureA;
            var fixtureB = contact.m_fixtureB;
            if (fixtureA === null || fixtureB === null)
                return;
            var bodyA = fixtureA.m_body;
            var bodyB = fixtureB.m_body;
            if (bodyA === null || bodyB === null)
                return;
            if (contact.isTouching()) {
                listener.endContact(contact);
            }
            // Remove from body 1
            if (contact.m_nodeA.prev) {
                contact.m_nodeA.prev.next = contact.m_nodeA.next;
            }
            if (contact.m_nodeA.next) {
                contact.m_nodeA.next.prev = contact.m_nodeA.prev;
            }
            if (contact.m_nodeA == bodyA.m_contactList) {
                bodyA.m_contactList = contact.m_nodeA.next;
            }
            // Remove from body 2
            if (contact.m_nodeB.prev) {
                contact.m_nodeB.prev.next = contact.m_nodeB.next;
            }
            if (contact.m_nodeB.next) {
                contact.m_nodeB.next.prev = contact.m_nodeB.prev;
            }
            if (contact.m_nodeB == bodyB.m_contactList) {
                bodyB.m_contactList = contact.m_nodeB.next;
            }
            if (contact.m_manifold.pointCount > 0 && !fixtureA.m_isSensor && !fixtureB.m_isSensor) {
                bodyA.setAwake(true);
                bodyB.setAwake(true);
            }
            // const typeA = fixtureA.getType();
            // const typeB = fixtureB.getType();
            // const destroyFcn = s_registers[typeA][typeB].destroyFcn;
            // if (typeof destroyFcn === 'function') {
            //   destroyFcn(contact);
            // }
            contactPool.release(contact);
        };
        return Contact;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var WorldDefDefault = {
        gravity: Vec2.zero(),
        allowSleep: true,
        warmStarting: true,
        continuousPhysics: true,
        subStepping: false,
        blockSolve: true,
        velocityIterations: 8,
        positionIterations: 3
    };
    var World = /** @class */ (function () {
        /**
         * @param def World definition or gravity vector.
         */
        function World(def) {
            if (!(this instanceof World)) {
                return new World(def);
            }
            this.s_step = new TimeStep();
            if (def && Vec2.isValid(def)) {
                def = { gravity: def };
            }
            def = options(def, WorldDefDefault);
            this.m_solver = new Solver(this);
            this.m_broadPhase = new BroadPhase();
            this.m_contactList = null;
            this.m_contactCount = 0;
            this.m_bodyList = null;
            this.m_bodyCount = 0;
            this.m_jointList = null;
            this.m_jointCount = 0;
            this.m_stepComplete = true;
            this.m_allowSleep = def.allowSleep;
            this.m_gravity = Vec2.clone(def.gravity);
            this.m_clearForces = true;
            this.m_newFixture = false;
            this.m_locked = false;
            // These are for debugging the solver.
            this.m_warmStarting = def.warmStarting;
            this.m_continuousPhysics = def.continuousPhysics;
            this.m_subStepping = def.subStepping;
            this.m_blockSolve = def.blockSolve;
            this.m_velocityIterations = def.velocityIterations;
            this.m_positionIterations = def.positionIterations;
            this.m_t = 0;
        }
        /** @internal */
        World.prototype._serialize = function () {
            var bodies = [];
            var joints = [];
            for (var b = this.getBodyList(); b; b = b.getNext()) {
                bodies.push(b);
            }
            for (var j = this.getJointList(); j; j = j.getNext()) {
                // @ts-ignore
                if (typeof j._serialize === 'function') {
                    joints.push(j);
                }
            }
            return {
                gravity: this.m_gravity,
                bodies: bodies,
                joints: joints,
            };
        };
        /** @internal */
        World._deserialize = function (data, context, restore) {
            if (!data) {
                return new World();
            }
            var world = new World(data.gravity);
            if (data.bodies) {
                for (var i = data.bodies.length - 1; i >= 0; i -= 1) {
                    world._addBody(restore(Body, data.bodies[i], world));
                }
            }
            if (data.joints) {
                for (var i = data.joints.length - 1; i >= 0; i--) {
                    world.createJoint(restore(Joint, data.joints[i], world));
                }
            }
            return world;
        };
        /**
         * Get the world body list. With the returned body, use Body.getNext to get the
         * next body in the world list. A null body indicates the end of the list.
         *
         * @return the head of the world body list.
         */
        World.prototype.getBodyList = function () {
            return this.m_bodyList;
        };
        /**
         * Get the world joint list. With the returned joint, use Joint.getNext to get
         * the next joint in the world list. A null joint indicates the end of the list.
         *
         * @return the head of the world joint list.
         */
        World.prototype.getJointList = function () {
            return this.m_jointList;
        };
        /**
         * Get the world contact list. With the returned contact, use Contact.getNext to
         * get the next contact in the world list. A null contact indicates the end of
         * the list.
         *
         * Warning: contacts are created and destroyed in the middle of a time step.
         * Use ContactListener to avoid missing contacts.
         *
         * @return the head of the world contact list.
         */
        World.prototype.getContactList = function () {
            return this.m_contactList;
        };
        World.prototype.getBodyCount = function () {
            return this.m_bodyCount;
        };
        World.prototype.getJointCount = function () {
            return this.m_jointCount;
        };
        /**
         * Get the number of contacts (each may have 0 or more contact points).
         */
        World.prototype.getContactCount = function () {
            return this.m_contactCount;
        };
        /**
         * Change the global gravity vector.
         */
        World.prototype.setGravity = function (gravity) {
            this.m_gravity = gravity;
        };
        /**
         * Get the global gravity vector.
         */
        World.prototype.getGravity = function () {
            return this.m_gravity;
        };
        /**
         * Is the world locked (in the middle of a time step).
         */
        World.prototype.isLocked = function () {
            return this.m_locked;
        };
        /**
         * Enable/disable sleep.
         */
        World.prototype.setAllowSleeping = function (flag) {
            if (flag == this.m_allowSleep) {
                return;
            }
            this.m_allowSleep = flag;
            if (this.m_allowSleep == false) {
                for (var b = this.m_bodyList; b; b = b.m_next) {
                    b.setAwake(true);
                }
            }
        };
        World.prototype.getAllowSleeping = function () {
            return this.m_allowSleep;
        };
        /**
         * Enable/disable warm starting. For testing.
         */
        World.prototype.setWarmStarting = function (flag) {
            this.m_warmStarting = flag;
        };
        World.prototype.getWarmStarting = function () {
            return this.m_warmStarting;
        };
        /**
         * Enable/disable continuous physics. For testing.
         */
        World.prototype.setContinuousPhysics = function (flag) {
            this.m_continuousPhysics = flag;
        };
        World.prototype.getContinuousPhysics = function () {
            return this.m_continuousPhysics;
        };
        /**
         * Enable/disable single stepped continuous physics. For testing.
         */
        World.prototype.setSubStepping = function (flag) {
            this.m_subStepping = flag;
        };
        World.prototype.getSubStepping = function () {
            return this.m_subStepping;
        };
        /**
         * Set flag to control automatic clearing of forces after each time step.
         */
        World.prototype.setAutoClearForces = function (flag) {
            this.m_clearForces = flag;
        };
        /**
         * Get the flag that controls automatic clearing of forces after each time step.
         */
        World.prototype.getAutoClearForces = function () {
            return this.m_clearForces;
        };
        /**
         * Manually clear the force buffer on all bodies. By default, forces are cleared
         * automatically after each call to step. The default behavior is modified by
         * calling setAutoClearForces. The purpose of this function is to support
         * sub-stepping. Sub-stepping is often used to maintain a fixed sized time step
         * under a variable frame-rate. When you perform sub-stepping you will disable
         * auto clearing of forces and instead call clearForces after all sub-steps are
         * complete in one pass of your game loop.
         *
         * See {@link World.setAutoClearForces}
         */
        World.prototype.clearForces = function () {
            for (var body = this.m_bodyList; body; body = body.getNext()) {
                body.m_force.setZero();
                body.m_torque = 0.0;
            }
        };
        /**
         * Query the world for all fixtures that potentially overlap the provided AABB.
         *
         * @param aabb The query box.
         * @param callback Called for each fixture found in the query AABB. It may return `false` to terminate the query.
         */
        World.prototype.queryAABB = function (aabb, callback) {
            var broadPhase = this.m_broadPhase;
            this.m_broadPhase.query(aabb, function (proxyId) {
                var proxy = broadPhase.getUserData(proxyId);
                return callback(proxy.fixture);
            });
        };
        /**
         * Ray-cast the world for all fixtures in the path of the ray. Your callback
         * controls whether you get the closest point, any point, or n-points. The
         * ray-cast ignores shapes that contain the starting point.
         *
         * @param point1 The ray starting point
         * @param point2 The ray ending point
         * @param callback A user implemented callback function.
         */
        World.prototype.rayCast = function (point1, point2, callback) {
            var broadPhase = this.m_broadPhase;
            this.m_broadPhase.rayCast({
                maxFraction: 1.0,
                p1: point1,
                p2: point2
            }, function (input, proxyId) {
                var proxy = broadPhase.getUserData(proxyId);
                var fixture = proxy.fixture;
                var index = proxy.childIndex;
                // @ts-ignore
                var output = {}; // TODO GC
                var hit = fixture.rayCast(output, input, index);
                if (hit) {
                    var fraction = output.fraction;
                    var point = Vec2.add(Vec2.mulNumVec2((1.0 - fraction), input.p1), Vec2.mulNumVec2(fraction, input.p2));
                    return callback(fixture, point, output.normal, fraction);
                }
                return input.maxFraction;
            });
        };
        /**
         * Get the number of broad-phase proxies.
         */
        World.prototype.getProxyCount = function () {
            return this.m_broadPhase.getProxyCount();
        };
        /**
         * Get the height of broad-phase dynamic tree.
         */
        World.prototype.getTreeHeight = function () {
            return this.m_broadPhase.getTreeHeight();
        };
        /**
         * Get the balance of broad-phase dynamic tree.
         */
        World.prototype.getTreeBalance = function () {
            return this.m_broadPhase.getTreeBalance();
        };
        /**
         * Get the quality metric of broad-phase dynamic tree. The smaller the better.
         * The minimum is 1.
         */
        World.prototype.getTreeQuality = function () {
            return this.m_broadPhase.getTreeQuality();
        };
        /**
         * Shift the world origin. Useful for large worlds. The body shift formula is:
         * position -= newOrigin
         *
         * @param newOrigin The new origin with respect to the old origin
         */
        World.prototype.shiftOrigin = function (newOrigin) {
            if (this.m_locked) {
                return;
            }
            for (var b = this.m_bodyList; b; b = b.m_next) {
                b.m_xf.p.sub(newOrigin);
                b.m_sweep.c0.sub(newOrigin);
                b.m_sweep.c.sub(newOrigin);
            }
            for (var j = this.m_jointList; j; j = j.m_next) {
                j.shiftOrigin(newOrigin);
            }
            this.m_broadPhase.shiftOrigin(newOrigin);
        };
        /** @internal Used for deserialize. */
        World.prototype._addBody = function (body) {
            if (this.isLocked()) {
                return;
            }
            // Add to world doubly linked list.
            body.m_prev = null;
            body.m_next = this.m_bodyList;
            if (this.m_bodyList) {
                this.m_bodyList.m_prev = body;
            }
            this.m_bodyList = body;
            ++this.m_bodyCount;
        };
        // tslint:disable-next-line:typedef
        /** @internal */ World.prototype.createBody = function (arg1, arg2) {
            if (this.isLocked()) {
                return null;
            }
            var def = {};
            if (!arg1) ;
            else if (Vec2.isValid(arg1)) {
                def = { position: arg1, angle: arg2 };
            }
            else if (typeof arg1 === 'object') {
                def = arg1;
            }
            var body = new Body(this, def);
            this._addBody(body);
            return body;
        };
        // tslint:disable-next-line:typedef
        /** @internal */ World.prototype.createDynamicBody = function (arg1, arg2) {
            var def = {};
            if (!arg1) ;
            else if (Vec2.isValid(arg1)) {
                def = { position: arg1, angle: arg2 };
            }
            else if (typeof arg1 === 'object') {
                def = arg1;
            }
            def.type = 'dynamic';
            return this.createBody(def);
        };
        // tslint:disable-next-line:typedef
        World.prototype.createKinematicBody = function (arg1, arg2) {
            var def = {};
            if (!arg1) ;
            else if (Vec2.isValid(arg1)) {
                def = { position: arg1, angle: arg2 };
            }
            else if (typeof arg1 === 'object') {
                def = arg1;
            }
            def.type = 'kinematic';
            return this.createBody(def);
        };
        /**
         * Destroy a rigid body given a definition. No reference to the definition is
         * retained.
         *
         * Warning: This automatically deletes all associated shapes and joints.
         *
         * Warning: This function is locked during callbacks.
         */
        World.prototype.destroyBody = function (b) {
            if (this.isLocked()) {
                return;
            }
            if (b.m_destroyed) {
                return false;
            }
            // Delete the attached joints.
            var je = b.m_jointList;
            while (je) {
                var je0 = je;
                je = je.next;
                this.publish('remove-joint', je0.joint);
                this.destroyJoint(je0.joint);
                b.m_jointList = je;
            }
            b.m_jointList = null;
            // Delete the attached contacts.
            var ce = b.m_contactList;
            while (ce) {
                var ce0 = ce;
                ce = ce.next;
                this.destroyContact(ce0.contact);
                b.m_contactList = ce;
            }
            b.m_contactList = null;
            // Delete the attached fixtures. This destroys broad-phase proxies.
            var f = b.m_fixtureList;
            while (f) {
                var f0 = f;
                f = f.m_next;
                this.publish('remove-fixture', f0);
                f0.destroyProxies(this.m_broadPhase);
                b.m_fixtureList = f;
            }
            b.m_fixtureList = null;
            // Remove world body list.
            if (b.m_prev) {
                b.m_prev.m_next = b.m_next;
            }
            if (b.m_next) {
                b.m_next.m_prev = b.m_prev;
            }
            if (b == this.m_bodyList) {
                this.m_bodyList = b.m_next;
            }
            b.m_destroyed = true;
            --this.m_bodyCount;
            this.publish('remove-body', b);
            return true;
        };
        /**
         * Create a joint to constrain bodies together. No reference to the definition
         * is retained. This may cause the connected bodies to cease colliding.
         *
         * Warning: This function is locked during callbacks.
         */
        World.prototype.createJoint = function (joint) {
            if (this.isLocked()) {
                return null;
            }
            // Connect to the world list.
            joint.m_prev = null;
            joint.m_next = this.m_jointList;
            if (this.m_jointList) {
                this.m_jointList.m_prev = joint;
            }
            this.m_jointList = joint;
            ++this.m_jointCount;
            // Connect to the bodies' doubly linked lists.
            joint.m_edgeA.joint = joint;
            joint.m_edgeA.other = joint.m_bodyB;
            joint.m_edgeA.prev = null;
            joint.m_edgeA.next = joint.m_bodyA.m_jointList;
            if (joint.m_bodyA.m_jointList)
                joint.m_bodyA.m_jointList.prev = joint.m_edgeA;
            joint.m_bodyA.m_jointList = joint.m_edgeA;
            joint.m_edgeB.joint = joint;
            joint.m_edgeB.other = joint.m_bodyA;
            joint.m_edgeB.prev = null;
            joint.m_edgeB.next = joint.m_bodyB.m_jointList;
            if (joint.m_bodyB.m_jointList)
                joint.m_bodyB.m_jointList.prev = joint.m_edgeB;
            joint.m_bodyB.m_jointList = joint.m_edgeB;
            // If the joint prevents collisions, then flag any contacts for filtering.
            if (joint.m_collideConnected == false) {
                for (var edge = joint.m_bodyB.getContactList(); edge; edge = edge.next) {
                    if (edge.other == joint.m_bodyA) {
                        // Flag the contact for filtering at the next time step (where either
                        // body is awake).
                        edge.contact.flagForFiltering();
                    }
                }
            }
            // Note: creating a joint doesn't wake the bodies.
            return joint;
        };
        /**
         * Destroy a joint. This may cause the connected bodies to begin colliding.
         * Warning: This function is locked during callbacks.
         */
        World.prototype.destroyJoint = function (joint) {
            if (this.isLocked()) {
                return;
            }
            // Remove from the doubly linked list.
            if (joint.m_prev) {
                joint.m_prev.m_next = joint.m_next;
            }
            if (joint.m_next) {
                joint.m_next.m_prev = joint.m_prev;
            }
            if (joint == this.m_jointList) {
                this.m_jointList = joint.m_next;
            }
            // Disconnect from bodies.
            var bodyA = joint.m_bodyA;
            var bodyB = joint.m_bodyB;
            // Wake up connected bodies.
            bodyA.setAwake(true);
            bodyB.setAwake(true);
            // Remove from body 1.
            if (joint.m_edgeA.prev) {
                joint.m_edgeA.prev.next = joint.m_edgeA.next;
            }
            if (joint.m_edgeA.next) {
                joint.m_edgeA.next.prev = joint.m_edgeA.prev;
            }
            if (joint.m_edgeA == bodyA.m_jointList) {
                bodyA.m_jointList = joint.m_edgeA.next;
            }
            joint.m_edgeA.prev = null;
            joint.m_edgeA.next = null;
            // Remove from body 2
            if (joint.m_edgeB.prev) {
                joint.m_edgeB.prev.next = joint.m_edgeB.next;
            }
            if (joint.m_edgeB.next) {
                joint.m_edgeB.next.prev = joint.m_edgeB.prev;
            }
            if (joint.m_edgeB == bodyB.m_jointList) {
                bodyB.m_jointList = joint.m_edgeB.next;
            }
            joint.m_edgeB.prev = null;
            joint.m_edgeB.next = null;
            --this.m_jointCount;
            // If the joint prevents collisions, then flag any contacts for filtering.
            if (joint.m_collideConnected == false) {
                var edge = bodyB.getContactList();
                while (edge) {
                    if (edge.other == bodyA) {
                        // Flag the contact for filtering at the next time step (where either
                        // body is awake).
                        edge.contact.flagForFiltering();
                    }
                    edge = edge.next;
                }
            }
            this.publish('remove-joint', joint);
        };
        /**
         * Take a time step. This performs collision detection, integration, and
         * constraint solution.
         *
         * Broad-phase, narrow-phase, solve and solve time of impacts.
         *
         * @param timeStep Time step, this should not vary.
         */
        World.prototype.step = function (timeStep, velocityIterations, positionIterations) {
            this.publish('pre-step', timeStep);
            if ((velocityIterations | 0) !== velocityIterations) {
                // TODO: remove this in future
                velocityIterations = 0;
            }
            velocityIterations = velocityIterations || this.m_velocityIterations;
            positionIterations = positionIterations || this.m_positionIterations;
            // If new fixtures were added, we need to find the new contacts.
            if (this.m_newFixture) {
                this.findNewContacts();
                this.m_newFixture = false;
            }
            this.m_locked = true;
            this.s_step.reset(timeStep);
            this.s_step.velocityIterations = velocityIterations;
            this.s_step.positionIterations = positionIterations;
            this.s_step.warmStarting = this.m_warmStarting;
            this.s_step.blockSolve = this.m_blockSolve;
            // Update contacts. This is where some contacts are destroyed.
            this.updateContacts();
            // Integrate velocities, solve velocity constraints, and integrate positions.
            if (this.m_stepComplete && timeStep > 0.0) {
                this.m_solver.solveWorld(this.s_step);
                // Synchronize fixtures, check for out of range bodies.
                for (var b = this.m_bodyList; b; b = b.getNext()) {
                    // If a body was not in an island then it did not move.
                    if (b.m_islandFlag == false) {
                        continue;
                    }
                    if (b.isStatic()) {
                        continue;
                    }
                    // Update fixtures (for broad-phase).
                    b.synchronizeFixtures();
                }
                // Look for new contacts.
                this.findNewContacts();
            }
            // Handle TOI events.
            if (this.m_continuousPhysics && timeStep > 0.0) {
                this.m_solver.solveWorldTOI(this.s_step);
            }
            if (this.m_clearForces) {
                this.clearForces();
            }
            this.m_locked = false;
            this.publish('post-step', timeStep);
        };
        /**
         * @internal
         * Call this method to find new contacts.
         */
        World.prototype.findNewContacts = function () {
            var _this = this;
            this.m_broadPhase.updatePairs(function (proxyA, proxyB) { return _this.createContact(proxyA, proxyB); });
        };
        /**
         * @internal
         * Callback for broad-phase.
         */
        World.prototype.createContact = function (proxyA, proxyB) {
            var fixtureA = proxyA.fixture;
            var fixtureB = proxyB.fixture;
            var indexA = proxyA.childIndex;
            var indexB = proxyB.childIndex;
            var bodyA = fixtureA.getBody();
            var bodyB = fixtureB.getBody();
            // Are the fixtures on the same body?
            if (bodyA == bodyB) {
                return;
            }
            // TODO_ERIN use a hash table to remove a potential bottleneck when both
            // bodies have a lot of contacts.
            // Does a contact already exist?
            var edge = bodyB.getContactList(); // ContactEdge
            while (edge) {
                if (edge.other == bodyA) {
                    var fA = edge.contact.getFixtureA();
                    var fB = edge.contact.getFixtureB();
                    var iA = edge.contact.getChildIndexA();
                    var iB = edge.contact.getChildIndexB();
                    if (fA == fixtureA && fB == fixtureB && iA == indexA && iB == indexB) {
                        // A contact already exists.
                        return;
                    }
                    if (fA == fixtureB && fB == fixtureA && iA == indexB && iB == indexA) {
                        // A contact already exists.
                        return;
                    }
                }
                edge = edge.next;
            }
            if (bodyB.shouldCollide(bodyA) == false) {
                return;
            }
            if (fixtureB.shouldCollide(fixtureA) == false) {
                return;
            }
            // Call the factory.
            var contact = Contact.create(fixtureA, indexA, fixtureB, indexB);
            if (contact == null) {
                return;
            }
            // Insert into the world.
            contact.m_prev = null;
            if (this.m_contactList != null) {
                contact.m_next = this.m_contactList;
                this.m_contactList.m_prev = contact;
            }
            this.m_contactList = contact;
            ++this.m_contactCount;
        };
        /**
         * @internal
         * Removes old non-overlapping contacts, applies filters and updates contacts.
         */
        World.prototype.updateContacts = function () {
            // Update awake contacts.
            var c;
            var next_c = this.m_contactList;
            while (c = next_c) {
                next_c = c.getNext();
                var fixtureA = c.getFixtureA();
                var fixtureB = c.getFixtureB();
                var indexA = c.getChildIndexA();
                var indexB = c.getChildIndexB();
                var bodyA = fixtureA.getBody();
                var bodyB = fixtureB.getBody();
                // Is this contact flagged for filtering?
                if (c.m_filterFlag) {
                    if (bodyB.shouldCollide(bodyA) == false) {
                        this.destroyContact(c);
                        continue;
                    }
                    if (fixtureB.shouldCollide(fixtureA) == false) {
                        this.destroyContact(c);
                        continue;
                    }
                    // Clear the filtering flag.
                    c.m_filterFlag = false;
                }
                var activeA = bodyA.isAwake() && !bodyA.isStatic();
                var activeB = bodyB.isAwake() && !bodyB.isStatic();
                // At least one body must be awake and it must be dynamic or kinematic.
                if (activeA == false && activeB == false) {
                    continue;
                }
                var proxyIdA = fixtureA.m_proxies[indexA].proxyId;
                var proxyIdB = fixtureB.m_proxies[indexB].proxyId;
                var overlap = this.m_broadPhase.testOverlap(proxyIdA, proxyIdB);
                // Here we destroy contacts that cease to overlap in the broad-phase.
                if (overlap == false) {
                    this.destroyContact(c);
                    continue;
                }
                // The contact persists.
                c.update(this);
            }
        };
        /** @internal */
        World.prototype.destroyContact = function (contact) {
            // Remove from the world.
            if (contact.m_prev) {
                contact.m_prev.m_next = contact.m_next;
            }
            if (contact.m_next) {
                contact.m_next.m_prev = contact.m_prev;
            }
            if (contact == this.m_contactList) {
                this.m_contactList = contact.m_next;
            }
            Contact.destroy(contact, this);
            --this.m_contactCount;
        };
        /**
         * Register an event listener.
         */
        // tslint:disable-next-line:typedef
        World.prototype.on = function (name, listener) {
            if (typeof name !== 'string' || typeof listener !== 'function') {
                return this;
            }
            if (!this._listeners) {
                this._listeners = {};
            }
            if (!this._listeners[name]) {
                this._listeners[name] = [];
            }
            this._listeners[name].push(listener);
            return this;
        };
        /**
         * Remove an event listener.
         */
        // tslint:disable-next-line:typedef
        World.prototype.off = function (name, listener) {
            if (typeof name !== 'string' || typeof listener !== 'function') {
                return this;
            }
            var listeners = this._listeners && this._listeners[name];
            if (!listeners || !listeners.length) {
                return this;
            }
            var index = listeners.indexOf(listener);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
            return this;
        };
        World.prototype.publish = function (name, arg1, arg2, arg3) {
            var listeners = this._listeners && this._listeners[name];
            if (!listeners || !listeners.length) {
                return 0;
            }
            for (var l = 0; l < listeners.length; l++) {
                listeners[l].call(this, arg1, arg2, arg3);
            }
            return listeners.length;
        };
        /** @internal */
        World.prototype.beginContact = function (contact) {
            this.publish('begin-contact', contact);
        };
        /** @internal */
        World.prototype.endContact = function (contact) {
            this.publish('end-contact', contact);
        };
        /** @internal */
        World.prototype.preSolve = function (contact, oldManifold) {
            this.publish('pre-solve', contact, oldManifold);
        };
        /** @internal */
        World.prototype.postSolve = function (contact, impulse) {
            this.publish('post-solve', contact, impulse);
        };
        return World;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    var Vec3 = /** @class */ (function () {
        function Vec3(x, y, z) {
            if (!(this instanceof Vec3)) {
                return new Vec3(x, y, z);
            }
            if (typeof x === 'undefined') {
                this.x = 0;
                this.y = 0;
                this.z = 0;
            }
            else if (typeof x === 'object') {
                this.x = x.x;
                this.y = x.y;
                this.z = x.z;
            }
            else {
                this.x = x;
                this.y = y;
                this.z = z;
            }
        }
        /** @internal */
        Vec3.prototype._serialize = function () {
            return {
                x: this.x,
                y: this.y,
                z: this.z
            };
        };
        /** @internal */
        Vec3._deserialize = function (data) {
            var obj = Object.create(Vec3.prototype);
            obj.x = data.x;
            obj.y = data.y;
            obj.z = data.z;
            return obj;
        };
        /** @internal */
        Vec3.neo = function (x, y, z) {
            var obj = Object.create(Vec3.prototype);
            obj.x = x;
            obj.y = y;
            obj.z = z;
            return obj;
        };
        Vec3.zero = function () {
            var obj = Object.create(Vec3.prototype);
            obj.x = 0;
            obj.y = 0;
            obj.z = 0;
            return obj;
        };
        Vec3.clone = function (v) {
            return Vec3.neo(v.x, v.y, v.z);
        };
        /** @internal */
        Vec3.prototype.toString = function () {
            return JSON.stringify(this);
        };
        /** Does this vector contain finite coordinates? */
        Vec3.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return Number.isFinite(obj.x) && Number.isFinite(obj.y) && Number.isFinite(obj.z);
        };
        Vec3.assert = function (o) {
        };
        Vec3.prototype.setZero = function () {
            this.x = 0.0;
            this.y = 0.0;
            this.z = 0.0;
            return this;
        };
        Vec3.prototype.set = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        };
        Vec3.prototype.add = function (w) {
            this.x += w.x;
            this.y += w.y;
            this.z += w.z;
            return this;
        };
        Vec3.prototype.sub = function (w) {
            this.x -= w.x;
            this.y -= w.y;
            this.z -= w.z;
            return this;
        };
        Vec3.prototype.mul = function (m) {
            this.x *= m;
            this.y *= m;
            this.z *= m;
            return this;
        };
        Vec3.areEqual = function (v, w) {
            return v === w ||
                typeof v === 'object' && v !== null &&
                    typeof w === 'object' && w !== null &&
                    v.x === w.x && v.y === w.y && v.z === w.z;
        };
        /** Dot product on two vectors */
        Vec3.dot = function (v, w) {
            return v.x * w.x + v.y * w.y + v.z * w.z;
        };
        /** Cross product on two vectors */
        Vec3.cross = function (v, w) {
            return new Vec3(v.y * w.z - v.z * w.y, v.z * w.x - v.x * w.z, v.x * w.y - v.y * w.x);
        };
        Vec3.add = function (v, w) {
            return new Vec3(v.x + w.x, v.y + w.y, v.z + w.z);
        };
        Vec3.sub = function (v, w) {
            return new Vec3(v.x - w.x, v.y - w.y, v.z - w.z);
        };
        Vec3.mul = function (v, m) {
            return new Vec3(m * v.x, m * v.y, m * v.z);
        };
        Vec3.prototype.neg = function () {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            return this;
        };
        Vec3.neg = function (v) {
            return new Vec3(-v.x, -v.y, -v.z);
        };
        return Vec3;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var v1$2 = vec2(0, 0);
    /** @internal */ var v2$1 = vec2(0, 0);
    /**
     * A line segment (edge) shape. These can be connected in chains or loops to
     * other edge shapes. The connectivity information is used to ensure correct
     * contact normals.
     */
    var EdgeShape = /** @class */ (function (_super) {
        __extends(EdgeShape, _super);
        function EdgeShape(v1, v2) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof EdgeShape)) {
                return new EdgeShape(v1, v2);
            }
            _this = _super.call(this) || this;
            _this.m_type = EdgeShape.TYPE;
            _this.m_radius = SettingsInternal.polygonRadius;
            _this.m_vertex1 = v1 ? Vec2.clone(v1) : Vec2.zero();
            _this.m_vertex2 = v2 ? Vec2.clone(v2) : Vec2.zero();
            _this.m_vertex0 = Vec2.zero();
            _this.m_vertex3 = Vec2.zero();
            _this.m_hasVertex0 = false;
            _this.m_hasVertex3 = false;
            return _this;
        }
        /** @internal */
        EdgeShape.prototype._serialize = function () {
            return {
                type: this.m_type,
                vertex1: this.m_vertex1,
                vertex2: this.m_vertex2,
                vertex0: this.m_vertex0,
                vertex3: this.m_vertex3,
                hasVertex0: this.m_hasVertex0,
                hasVertex3: this.m_hasVertex3,
            };
        };
        /** @internal */
        EdgeShape._deserialize = function (data) {
            var shape = new EdgeShape(data.vertex1, data.vertex2);
            if (shape.m_hasVertex0) {
                shape.setPrevVertex(data.vertex0);
            }
            if (shape.m_hasVertex3) {
                shape.setNextVertex(data.vertex3);
            }
            return shape;
        };
        /** @internal */
        EdgeShape.prototype._reset = function () {
            // noop
        };
        EdgeShape.prototype.getRadius = function () {
            return this.m_radius;
        };
        EdgeShape.prototype.getType = function () {
            return this.m_type;
        };
        /** @internal @deprecated */
        EdgeShape.prototype.setNext = function (v) {
            return this.setNextVertex(v);
        };
        /**
         * Optional next vertex, used for smooth collision.
         */
        EdgeShape.prototype.setNextVertex = function (v) {
            if (v) {
                this.m_vertex3.setVec2(v);
                this.m_hasVertex3 = true;
            }
            else {
                this.m_vertex3.setZero();
                this.m_hasVertex3 = false;
            }
            return this;
        };
        /**
         * Optional next vertex, used for smooth collision.
         */
        EdgeShape.prototype.getNextVertex = function () {
            return this.m_vertex3;
        };
        /** @internal @deprecated */
        EdgeShape.prototype.setPrev = function (v) {
            return this.setPrevVertex(v);
        };
        /**
         * Optional prev vertex, used for smooth collision.
         */
        EdgeShape.prototype.setPrevVertex = function (v) {
            if (v) {
                this.m_vertex0.setVec2(v);
                this.m_hasVertex0 = true;
            }
            else {
                this.m_vertex0.setZero();
                this.m_hasVertex0 = false;
            }
            return this;
        };
        /**
         * Optional prev vertex, used for smooth collision.
         */
        EdgeShape.prototype.getPrevVertex = function () {
            return this.m_vertex0;
        };
        /**
         * Set this as an isolated edge.
         */
        EdgeShape.prototype._set = function (v1, v2) {
            this.m_vertex1.setVec2(v1);
            this.m_vertex2.setVec2(v2);
            this.m_hasVertex0 = false;
            this.m_hasVertex3 = false;
            return this;
        };
        /**
         * @internal @deprecated Shapes should be treated as immutable.
         *
         * clone the concrete shape.
         */
        EdgeShape.prototype._clone = function () {
            var clone = new EdgeShape();
            clone.m_type = this.m_type;
            clone.m_radius = this.m_radius;
            clone.m_vertex1.setVec2(this.m_vertex1);
            clone.m_vertex2.setVec2(this.m_vertex2);
            clone.m_vertex0.setVec2(this.m_vertex0);
            clone.m_vertex3.setVec2(this.m_vertex3);
            clone.m_hasVertex0 = this.m_hasVertex0;
            clone.m_hasVertex3 = this.m_hasVertex3;
            return clone;
        };
        /**
         * Get the number of child primitives.
         */
        EdgeShape.prototype.getChildCount = function () {
            return 1;
        };
        /**
         * Test a point for containment in this shape. This only works for convex
         * shapes.
         *
         * @param xf The shape world transform.
         * @param p A point in world coordinates.
         */
        EdgeShape.prototype.testPoint = function (xf, p) {
            return false;
        };
        /**
         * Cast a ray against a child shape.
         *
         * @param output The ray-cast results.
         * @param input The ray-cast input parameters.
         * @param xf The transform to be applied to the shape.
         * @param childIndex The child shape index
         */
        EdgeShape.prototype.rayCast = function (output, input, xf, childIndex) {
            // p = p1 + t * d
            // v = v1 + s * e
            // p1 + t * d = v1 + s * e
            // s * e - t * d = p1 - v1
            // NOT_USED(childIndex);
            // Put the ray into the edge's frame of reference.
            var p1 = Rot.mulTVec2(xf.q, Vec2.sub(input.p1, xf.p));
            var p2 = Rot.mulTVec2(xf.q, Vec2.sub(input.p2, xf.p));
            var d = Vec2.sub(p2, p1);
            var v1 = this.m_vertex1;
            var v2 = this.m_vertex2;
            var e = Vec2.sub(v2, v1);
            var normal = Vec2.neo(e.y, -e.x);
            normal.normalize();
            // q = p1 + t * d
            // dot(normal, q - v1) = 0
            // dot(normal, p1 - v1) + t * dot(normal, d) = 0
            var numerator = Vec2.dot(normal, Vec2.sub(v1, p1));
            var denominator = Vec2.dot(normal, d);
            if (denominator == 0.0) {
                return false;
            }
            var t = numerator / denominator;
            if (t < 0.0 || input.maxFraction < t) {
                return false;
            }
            var q = Vec2.add(p1, Vec2.mulNumVec2(t, d));
            // q = v1 + s * r
            // s = dot(q - v1, r) / dot(r, r)
            var r = Vec2.sub(v2, v1);
            var rr = Vec2.dot(r, r);
            if (rr == 0.0) {
                return false;
            }
            var s = Vec2.dot(Vec2.sub(q, v1), r) / rr;
            if (s < 0.0 || 1.0 < s) {
                return false;
            }
            output.fraction = t;
            if (numerator > 0.0) {
                output.normal = Rot.mulVec2(xf.q, normal).neg();
            }
            else {
                output.normal = Rot.mulVec2(xf.q, normal);
            }
            return true;
        };
        /**
         * Given a transform, compute the associated axis aligned bounding box for a
         * child shape.
         *
         * @param aabb Returns the axis aligned box.
         * @param xf The world transform of the shape.
         * @param childIndex The child shape
         */
        EdgeShape.prototype.computeAABB = function (aabb, xf, childIndex) {
            transformVec2(v1$2, xf, this.m_vertex1);
            transformVec2(v2$1, xf, this.m_vertex2);
            AABB.combinePoints(aabb, v1$2, v2$1);
            AABB.extend(aabb, this.m_radius);
        };
        /**
         * Compute the mass properties of this shape using its dimensions and density.
         * The inertia tensor is computed about the local origin.
         *
         * @param massData Returns the mass data for this shape.
         * @param density The density in kilograms per meter squared.
         */
        EdgeShape.prototype.computeMass = function (massData, density) {
            massData.mass = 0.0;
            combineVec2(massData.center, 0.5, this.m_vertex1, 0.5, this.m_vertex2);
            massData.I = 0.0;
        };
        EdgeShape.prototype.computeDistanceProxy = function (proxy) {
            proxy.m_vertices[0] = this.m_vertex1;
            proxy.m_vertices[1] = this.m_vertex2;
            proxy.m_vertices.length = 2;
            proxy.m_count = 2;
            proxy.m_radius = this.m_radius;
        };
        EdgeShape.TYPE = 'edge';
        return EdgeShape;
    }(Shape));
    var Edge = EdgeShape;

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var v1$1 = vec2(0, 0);
    /** @internal */ var v2 = vec2(0, 0);
    /**
     * A chain shape is a free form sequence of line segments. The chain has
     * two-sided collision, so you can use inside and outside collision. Therefore,
     * you may use any winding order. Connectivity information is used to create
     * smooth collisions.
     *
     * WARNING: The chain will not collide properly if there are self-intersections.
     */
    var ChainShape = /** @class */ (function (_super) {
        __extends(ChainShape, _super);
        function ChainShape(vertices, loop) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof ChainShape)) {
                return new ChainShape(vertices, loop);
            }
            _this = _super.call(this) || this;
            _this.m_type = ChainShape.TYPE;
            _this.m_radius = SettingsInternal.polygonRadius;
            _this.m_vertices = [];
            _this.m_count = 0;
            _this.m_prevVertex = null;
            _this.m_nextVertex = null;
            _this.m_hasPrevVertex = false;
            _this.m_hasNextVertex = false;
            _this.m_isLoop = !!loop;
            if (vertices && vertices.length) {
                if (loop) {
                    _this._createLoop(vertices);
                }
                else {
                    _this._createChain(vertices);
                }
            }
            return _this;
        }
        /** @internal */
        ChainShape.prototype._serialize = function () {
            var data = {
                type: this.m_type,
                vertices: this.m_vertices,
                isLoop: this.m_isLoop,
                hasPrevVertex: this.m_hasPrevVertex,
                hasNextVertex: this.m_hasNextVertex,
                prevVertex: null,
                nextVertex: null,
            };
            if (this.m_prevVertex) {
                data.prevVertex = this.m_prevVertex;
            }
            if (this.m_nextVertex) {
                data.nextVertex = this.m_nextVertex;
            }
            return data;
        };
        /** @internal */
        ChainShape._deserialize = function (data, fixture, restore) {
            var vertices = [];
            if (data.vertices) {
                for (var i = 0; i < data.vertices.length; i++) {
                    vertices.push(restore(Vec2, data.vertices[i]));
                }
            }
            var shape = new ChainShape(vertices, data.isLoop);
            if (data.prevVertex) {
                shape.setPrevVertex(data.prevVertex);
            }
            if (data.nextVertex) {
                shape.setNextVertex(data.nextVertex);
            }
            return shape;
        };
        // clear() {
        //   this.m_vertices.length = 0;
        //   this.m_count = 0;
        // }
        ChainShape.prototype.getType = function () {
            return this.m_type;
        };
        ChainShape.prototype.getRadius = function () {
            return this.m_radius;
        };
        /**
         * @internal
         * Create a loop. This automatically adjusts connectivity.
         *
         * @param vertices an array of vertices, these are copied
         * @param count the vertex count
         */
        ChainShape.prototype._createLoop = function (vertices) {
            if (vertices.length < 3) {
                return;
            }
            for (var i = 1; i < vertices.length; ++i) {
                vertices[i - 1];
                vertices[i];
            }
            this.m_vertices = [];
            this.m_count = vertices.length + 1;
            for (var i = 0; i < vertices.length; ++i) {
                this.m_vertices[i] = Vec2.clone(vertices[i]);
            }
            this.m_vertices[vertices.length] = Vec2.clone(vertices[0]);
            this.m_prevVertex = this.m_vertices[this.m_count - 2];
            this.m_nextVertex = this.m_vertices[1];
            this.m_hasPrevVertex = true;
            this.m_hasNextVertex = true;
            return this;
        };
        /**
         * @internal
         * Create a chain with isolated end vertices.
         *
         * @param vertices an array of vertices, these are copied
         */
        ChainShape.prototype._createChain = function (vertices) {
            for (var i = 1; i < vertices.length; ++i) {
                // If the code crashes here, it means your vertices are too close together.
                vertices[i - 1];
                vertices[i];
            }
            this.m_count = vertices.length;
            for (var i = 0; i < vertices.length; ++i) {
                this.m_vertices[i] = Vec2.clone(vertices[i]);
            }
            this.m_hasPrevVertex = false;
            this.m_hasNextVertex = false;
            this.m_prevVertex = null;
            this.m_nextVertex = null;
            return this;
        };
        /** @internal */
        ChainShape.prototype._reset = function () {
            if (this.m_isLoop) {
                this._createLoop(this.m_vertices);
            }
            else {
                this._createChain(this.m_vertices);
            }
        };
        /**
         * Establish connectivity to a vertex that precedes the first vertex. Don't call
         * this for loops.
         */
        ChainShape.prototype.setPrevVertex = function (prevVertex) {
            this.m_prevVertex = prevVertex;
            this.m_hasPrevVertex = true;
        };
        ChainShape.prototype.getPrevVertex = function () {
            return this.m_prevVertex;
        };
        /**
         * Establish connectivity to a vertex that follows the last vertex. Don't call
         * this for loops.
         */
        ChainShape.prototype.setNextVertex = function (nextVertex) {
            this.m_nextVertex = nextVertex;
            this.m_hasNextVertex = true;
        };
        ChainShape.prototype.getNextVertex = function () {
            return this.m_nextVertex;
        };
        /**
         * @internal @deprecated Shapes should be treated as immutable.
         *
         * clone the concrete shape.
         */
        ChainShape.prototype._clone = function () {
            var clone = new ChainShape();
            clone._createChain(this.m_vertices);
            clone.m_type = this.m_type;
            clone.m_radius = this.m_radius;
            clone.m_prevVertex = this.m_prevVertex;
            clone.m_nextVertex = this.m_nextVertex;
            clone.m_hasPrevVertex = this.m_hasPrevVertex;
            clone.m_hasNextVertex = this.m_hasNextVertex;
            return clone;
        };
        /**
         * Get the number of child primitives.
         */
        ChainShape.prototype.getChildCount = function () {
            // edge count = vertex count - 1
            return this.m_count - 1;
        };
        // Get a child edge.
        ChainShape.prototype.getChildEdge = function (edge, childIndex) {
            edge.m_type = EdgeShape.TYPE;
            edge.m_radius = this.m_radius;
            edge.m_vertex1 = this.m_vertices[childIndex];
            edge.m_vertex2 = this.m_vertices[childIndex + 1];
            if (childIndex > 0) {
                edge.m_vertex0 = this.m_vertices[childIndex - 1];
                edge.m_hasVertex0 = true;
            }
            else {
                edge.m_vertex0 = this.m_prevVertex;
                edge.m_hasVertex0 = this.m_hasPrevVertex;
            }
            if (childIndex < this.m_count - 2) {
                edge.m_vertex3 = this.m_vertices[childIndex + 2];
                edge.m_hasVertex3 = true;
            }
            else {
                edge.m_vertex3 = this.m_nextVertex;
                edge.m_hasVertex3 = this.m_hasNextVertex;
            }
        };
        ChainShape.prototype.getVertex = function (index) {
            if (index < this.m_count) {
                return this.m_vertices[index];
            }
            else {
                return this.m_vertices[0];
            }
        };
        ChainShape.prototype.isLoop = function () {
            return this.m_isLoop;
        };
        /**
         * Test a point for containment in this shape. This only works for convex
         * shapes.
         *
         * This always return false.
         *
         * @param xf The shape world transform.
         * @param p A point in world coordinates.
         */
        ChainShape.prototype.testPoint = function (xf, p) {
            return false;
        };
        /**
         * Cast a ray against a child shape.
         *
         * @param output The ray-cast results.
         * @param input The ray-cast input parameters.
         * @param xf The transform to be applied to the shape.
         * @param childIndex The child shape index
         */
        ChainShape.prototype.rayCast = function (output, input, xf, childIndex) {
            var edgeShape = new EdgeShape(this.getVertex(childIndex), this.getVertex(childIndex + 1));
            return edgeShape.rayCast(output, input, xf, 0);
        };
        /**
         * Given a transform, compute the associated axis aligned bounding box for a
         * child shape.
         *
         * @param aabb Returns the axis aligned box.
         * @param xf The world transform of the shape.
         * @param childIndex The child shape
         */
        ChainShape.prototype.computeAABB = function (aabb, xf, childIndex) {
            transformVec2(v1$1, xf, this.getVertex(childIndex));
            transformVec2(v2, xf, this.getVertex(childIndex + 1));
            AABB.combinePoints(aabb, v1$1, v2);
        };
        /**
         * Compute the mass properties of this shape using its dimensions and density.
         * The inertia tensor is computed about the local origin.
         *
         * Chains have zero mass.
         *
         * @param massData Returns the mass data for this shape.
         * @param density The density in kilograms per meter squared.
         */
        ChainShape.prototype.computeMass = function (massData, density) {
            massData.mass = 0.0;
            zeroVec2(massData.center);
            massData.I = 0.0;
        };
        ChainShape.prototype.computeDistanceProxy = function (proxy, childIndex) {
            proxy.m_vertices[0] = this.getVertex(childIndex);
            proxy.m_vertices[1] = this.getVertex(childIndex + 1);
            proxy.m_count = 2;
            proxy.m_radius = this.m_radius;
        };
        ChainShape.TYPE = 'chain';
        return ChainShape;
    }(Shape));
    var Chain = ChainShape;

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_max$1 = Math.max;
    /** @internal */ var math_min$3 = Math.min;
    /** @internal */ var temp$1 = vec2(0, 0);
    /** @internal */ var e$1 = vec2(0, 0);
    /** @internal */ var e1$1 = vec2(0, 0);
    /** @internal */ var e2$1 = vec2(0, 0);
    /** @internal */ var center = vec2(0, 0);
    /** @internal */ var s = vec2(0, 0);
    /**
     * A convex polygon. It is assumed that the interior of the polygon is to the
     * left of each edge. Polygons have a maximum number of vertices equal to
     * Settings.maxPolygonVertices. In most cases you should not need many vertices
     * for a convex polygon. extends Shape
     */
    var PolygonShape = /** @class */ (function (_super) {
        __extends(PolygonShape, _super);
        function PolygonShape(vertices) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof PolygonShape)) {
                return new PolygonShape(vertices);
            }
            _this = _super.call(this) || this;
            _this.m_type = PolygonShape.TYPE;
            _this.m_radius = SettingsInternal.polygonRadius;
            _this.m_centroid = Vec2.zero();
            _this.m_vertices = [];
            _this.m_normals = [];
            _this.m_count = 0;
            if (vertices && vertices.length) {
                _this._set(vertices);
            }
            return _this;
        }
        /** @internal */
        PolygonShape.prototype._serialize = function () {
            return {
                type: this.m_type,
                vertices: this.m_vertices,
            };
        };
        /** @internal */
        PolygonShape._deserialize = function (data, fixture, restore) {
            var vertices = [];
            if (data.vertices) {
                for (var i = 0; i < data.vertices.length; i++) {
                    vertices.push(restore(Vec2, data.vertices[i]));
                }
            }
            var shape = new PolygonShape(vertices);
            return shape;
        };
        PolygonShape.prototype.getType = function () {
            return this.m_type;
        };
        PolygonShape.prototype.getRadius = function () {
            return this.m_radius;
        };
        /**
         * @internal @deprecated Shapes should be treated as immutable.
         *
         * clone the concrete shape.
         */
        PolygonShape.prototype._clone = function () {
            var clone = new PolygonShape();
            clone.m_type = this.m_type;
            clone.m_radius = this.m_radius;
            clone.m_count = this.m_count;
            clone.m_centroid.setVec2(this.m_centroid);
            for (var i = 0; i < this.m_count; i++) {
                clone.m_vertices.push(this.m_vertices[i].clone());
            }
            for (var i = 0; i < this.m_normals.length; i++) {
                clone.m_normals.push(this.m_normals[i].clone());
            }
            return clone;
        };
        /**
         * Get the number of child primitives.
         */
        PolygonShape.prototype.getChildCount = function () {
            return 1;
        };
        /** @internal */ PolygonShape.prototype._reset = function () {
            this._set(this.m_vertices);
        };
        /**
         * @internal
         *
         * Create a convex hull from the given array of local points. The count must be
         * in the range [3, Settings.maxPolygonVertices].
         *
         * Warning: the points may be re-ordered, even if they form a convex polygon
         * Warning: collinear points are handled but not removed. Collinear points may
         * lead to poor stacking behavior.
         */
        PolygonShape.prototype._set = function (vertices) {
            if (vertices.length < 3) {
                this._setAsBox(1.0, 1.0);
                return;
            }
            var n = math_min$3(vertices.length, SettingsInternal.maxPolygonVertices);
            // Perform welding and copy vertices into local buffer.
            var ps = []; // [Settings.maxPolygonVertices];
            for (var i = 0; i < n; ++i) {
                var v = vertices[i];
                var unique = true;
                for (var j = 0; j < ps.length; ++j) {
                    if (Vec2.distanceSquared(v, ps[j]) < 0.25 * SettingsInternal.linearSlopSquared) {
                        unique = false;
                        break;
                    }
                }
                if (unique) {
                    ps.push(Vec2.clone(v));
                }
            }
            n = ps.length;
            if (n < 3) {
                this._setAsBox(1.0, 1.0);
                return;
            }
            // Create the convex hull using the Gift wrapping algorithm
            // http://en.wikipedia.org/wiki/Gift_wrapping_algorithm
            // Find the right most point on the hull (in case of multiple points bottom most is used)
            var i0 = 0;
            var x0 = ps[0].x;
            for (var i = 1; i < n; ++i) {
                var x = ps[i].x;
                if (x > x0 || (x === x0 && ps[i].y < ps[i0].y)) {
                    i0 = i;
                    x0 = x;
                }
            }
            var hull = []; // [Settings.maxPolygonVertices];
            var m = 0;
            var ih = i0;
            while (true) {
                hull[m] = ih;
                var ie = 0;
                for (var j = 1; j < n; ++j) {
                    if (ie === ih) {
                        ie = j;
                        continue;
                    }
                    var r = Vec2.sub(ps[ie], ps[hull[m]]);
                    var v = Vec2.sub(ps[j], ps[hull[m]]);
                    var c = Vec2.crossVec2Vec2(r, v);
                    // c < 0 means counter-clockwise wrapping, c > 0 means clockwise wrapping
                    if (c < 0.0) {
                        ie = j;
                    }
                    // Collinearity check
                    if (c === 0.0 && v.lengthSquared() > r.lengthSquared()) {
                        ie = j;
                    }
                }
                ++m;
                ih = ie;
                if (ie === i0) {
                    break;
                }
            }
            if (m < 3) {
                this._setAsBox(1.0, 1.0);
                return;
            }
            this.m_count = m;
            // Copy vertices.
            this.m_vertices = [];
            for (var i = 0; i < m; ++i) {
                this.m_vertices[i] = ps[hull[i]];
            }
            // Compute normals. Ensure the edges have non-zero length.
            for (var i = 0; i < m; ++i) {
                var i1 = i;
                var i2 = i + 1 < m ? i + 1 : 0;
                var edge = Vec2.sub(this.m_vertices[i2], this.m_vertices[i1]);
                this.m_normals[i] = Vec2.crossVec2Num(edge, 1.0);
                this.m_normals[i].normalize();
            }
            // Compute the polygon centroid.
            this.m_centroid = computeCentroid(this.m_vertices, m);
        };
        /** @internal */ PolygonShape.prototype._setAsBox = function (hx, hy, center, angle) {
            // start with right-bottom, counter-clockwise, as in Gift wrapping algorithm in PolygonShape._set()
            this.m_vertices[0] = Vec2.neo(hx, -hy);
            this.m_vertices[1] = Vec2.neo(hx, hy);
            this.m_vertices[2] = Vec2.neo(-hx, hy);
            this.m_vertices[3] = Vec2.neo(-hx, -hy);
            this.m_normals[0] = Vec2.neo(1.0, 0.0);
            this.m_normals[1] = Vec2.neo(0.0, 1.0);
            this.m_normals[2] = Vec2.neo(-1.0, 0.0);
            this.m_normals[3] = Vec2.neo(0.0, -1.0);
            this.m_count = 4;
            if (center && Vec2.isValid(center)) {
                angle = angle || 0;
                copyVec2(this.m_centroid, center);
                var xf = Transform.identity();
                xf.p.setVec2(center);
                xf.q.setAngle(angle);
                // Transform vertices and normals.
                for (var i = 0; i < this.m_count; ++i) {
                    this.m_vertices[i] = Transform.mulVec2(xf, this.m_vertices[i]);
                    this.m_normals[i] = Rot.mulVec2(xf.q, this.m_normals[i]);
                }
            }
        };
        /**
         * Test a point for containment in this shape. This only works for convex
         * shapes.
         *
         * @param xf The shape world transform.
         * @param p A point in world coordinates.
         */
        PolygonShape.prototype.testPoint = function (xf, p) {
            var pLocal = invTransformVec2(temp$1, xf, p);
            for (var i = 0; i < this.m_count; ++i) {
                var dot = dotVec2(this.m_normals[i], pLocal) - dotVec2(this.m_normals[i], this.m_vertices[i]);
                if (dot > 0.0) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Cast a ray against a child shape.
         *
         * @param output The ray-cast results.
         * @param input The ray-cast input parameters.
         * @param xf The transform to be applied to the shape.
         * @param childIndex The child shape index
         */
        PolygonShape.prototype.rayCast = function (output, input, xf, childIndex) {
            // Put the ray into the polygon's frame of reference.
            var p1 = Rot.mulTVec2(xf.q, Vec2.sub(input.p1, xf.p));
            var p2 = Rot.mulTVec2(xf.q, Vec2.sub(input.p2, xf.p));
            var d = Vec2.sub(p2, p1);
            var lower = 0.0;
            var upper = input.maxFraction;
            var index = -1;
            for (var i = 0; i < this.m_count; ++i) {
                // p = p1 + a * d
                // dot(normal, p - v) = 0
                // dot(normal, p1 - v) + a * dot(normal, d) = 0
                var numerator = Vec2.dot(this.m_normals[i], Vec2.sub(this.m_vertices[i], p1));
                var denominator = Vec2.dot(this.m_normals[i], d);
                if (denominator == 0.0) {
                    if (numerator < 0.0) {
                        return false;
                    }
                }
                else {
                    // Note: we want this predicate without division:
                    // lower < numerator / denominator, where denominator < 0
                    // Since denominator < 0, we have to flip the inequality:
                    // lower < numerator / denominator <==> denominator * lower > numerator.
                    if (denominator < 0.0 && numerator < lower * denominator) {
                        // Increase lower.
                        // The segment enters this half-space.
                        lower = numerator / denominator;
                        index = i;
                    }
                    else if (denominator > 0.0 && numerator < upper * denominator) {
                        // Decrease upper.
                        // The segment exits this half-space.
                        upper = numerator / denominator;
                    }
                }
                // The use of epsilon here causes the assert on lower to trip
                // in some cases. Apparently the use of epsilon was to make edge
                // shapes work, but now those are handled separately.
                // if (upper < lower - matrix.EPSILON)
                if (upper < lower) {
                    return false;
                }
            }
            if (index >= 0) {
                output.fraction = lower;
                output.normal = Rot.mulVec2(xf.q, this.m_normals[index]);
                return true;
            }
            return false;
        };
        /**
         * Given a transform, compute the associated axis aligned bounding box for a
         * child shape.
         *
         * @param aabb Returns the axis aligned box.
         * @param xf The world transform of the shape.
         * @param childIndex The child shape
         */
        PolygonShape.prototype.computeAABB = function (aabb, xf, childIndex) {
            var minX = Infinity;
            var minY = Infinity;
            var maxX = -Infinity;
            var maxY = -Infinity;
            for (var i = 0; i < this.m_count; ++i) {
                var v = transformVec2(temp$1, xf, this.m_vertices[i]);
                minX = math_min$3(minX, v.x);
                maxX = math_max$1(maxX, v.x);
                minY = math_min$3(minY, v.y);
                maxY = math_max$1(maxY, v.y);
            }
            setVec2(aabb.lowerBound, minX - this.m_radius, minY - this.m_radius);
            setVec2(aabb.upperBound, maxX + this.m_radius, maxY + this.m_radius);
        };
        /**
         * Compute the mass properties of this shape using its dimensions and density.
         * The inertia tensor is computed about the local origin.
         *
         * @param massData Returns the mass data for this shape.
         * @param density The density in kilograms per meter squared.
         */
        PolygonShape.prototype.computeMass = function (massData, density) {
            zeroVec2(center);
            var area = 0.0;
            var I = 0.0;
            // s is the reference point for forming triangles.
            // It's location doesn't change the result (except for rounding error).
            zeroVec2(s);
            // This code would put the reference point inside the polygon.
            for (var i = 0; i < this.m_count; ++i) {
                addVec2(s, this.m_vertices[i]);
            }
            setMulVec2(s, 1.0 / this.m_count, s);
            var k_inv3 = 1.0 / 3.0;
            for (var i = 0; i < this.m_count; ++i) {
                // Triangle vertices.
                diffVec2(e1$1, this.m_vertices[i], s);
                if (i + 1 < this.m_count) {
                    diffVec2(e2$1, this.m_vertices[i + 1], s);
                }
                else {
                    diffVec2(e2$1, this.m_vertices[0], s);
                }
                var D = crossVec2Vec2(e1$1, e2$1);
                var triangleArea = 0.5 * D;
                area += triangleArea;
                // Area weighted centroid
                combineVec2(center, 1, center, triangleArea * k_inv3, e1$1);
                combineVec2(center, 1, center, triangleArea * k_inv3, e2$1);
                var ex1 = e1$1.x;
                var ey1 = e1$1.y;
                var ex2 = e2$1.x;
                var ey2 = e2$1.y;
                var intx2 = ex1 * ex1 + ex2 * ex1 + ex2 * ex2;
                var inty2 = ey1 * ey1 + ey2 * ey1 + ey2 * ey2;
                I += (0.25 * k_inv3 * D) * (intx2 + inty2);
            }
            // Total mass
            massData.mass = density * area;
            setMulVec2(center, 1.0 / area, center);
            sumVec2(massData.center, center, s);
            // Inertia tensor relative to the local origin (point s).
            massData.I = density * I;
            // Shift to center of mass then to original body origin.
            massData.I += massData.mass * (dotVec2(massData.center, massData.center) - dotVec2(center, center));
        };
        /**
         * Validate convexity. This is a very time consuming operation.
         * @returns true if valid
         */
        PolygonShape.prototype.validate = function () {
            for (var i = 0; i < this.m_count; ++i) {
                var i1 = i;
                var i2 = i < this.m_count - 1 ? i1 + 1 : 0;
                var p = this.m_vertices[i1];
                diffVec2(e$1, this.m_vertices[i2], p);
                for (var j = 0; j < this.m_count; ++j) {
                    if (j == i1 || j == i2) {
                        continue;
                    }
                    var c = crossVec2Vec2(e$1, diffVec2(temp$1, this.m_vertices[j], p));
                    if (c < 0.0) {
                        return false;
                    }
                }
            }
            return true;
        };
        PolygonShape.prototype.computeDistanceProxy = function (proxy) {
            for (var i = 0; i < this.m_count; ++i) {
                proxy.m_vertices[i] = this.m_vertices[i];
            }
            proxy.m_vertices.length = this.m_count;
            proxy.m_count = this.m_count;
            proxy.m_radius = this.m_radius;
        };
        PolygonShape.TYPE = 'polygon';
        return PolygonShape;
    }(Shape));
    /** @internal */ function computeCentroid(vs, count) {
        var c = Vec2.zero();
        var area = 0.0;
        // pRef is the reference point for forming triangles.
        // It's location doesn't change the result (except for rounding error).
        var pRef = Vec2.zero();
        var i; 
        var inv3 = 1.0 / 3.0;
        for (var i = 0; i < count; ++i) {
            // Triangle vertices.
            var p1 = pRef;
            var p2 = vs[i];
            var p3 = i + 1 < count ? vs[i + 1] : vs[0];
            var e1_1 = Vec2.sub(p2, p1);
            var e2_1 = Vec2.sub(p3, p1);
            var D = Vec2.crossVec2Vec2(e1_1, e2_1);
            var triangleArea = 0.5 * D;
            area += triangleArea;
            // Area weighted centroid
            c.addMul(triangleArea * inv3, p1);
            c.addMul(triangleArea * inv3, p2);
            c.addMul(triangleArea * inv3, p3);
        }
        c.mul(1.0 / area);
        return c;
    }
    var Polygon = PolygonShape;

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /**
     * A rectangle polygon which extend PolygonShape.
     */
    var BoxShape = /** @class */ (function (_super) {
        __extends(BoxShape, _super);
        function BoxShape(hx, hy, center, angle) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof BoxShape)) {
                return new BoxShape(hx, hy, center, angle);
            }
            _this = _super.call(this) || this;
            _this._setAsBox(hx, hy, center, angle);
            return _this;
        }
        BoxShape.TYPE = 'polygon';
        return BoxShape;
    }(PolygonShape));
    var Box = BoxShape;

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_sqrt = Math.sqrt;
    /** @internal */ var math_PI$4 = Math.PI;
    /** @internal */ var temp = vec2(0, 0);
    var CircleShape = /** @class */ (function (_super) {
        __extends(CircleShape, _super);
        function CircleShape(a, b) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof CircleShape)) {
                return new CircleShape(a, b);
            }
            _this = _super.call(this) || this;
            _this.m_type = CircleShape.TYPE;
            _this.m_p = Vec2.zero();
            _this.m_radius = 1;
            if (typeof a === 'object' && Vec2.isValid(a)) {
                _this.m_p.setVec2(a);
                if (typeof b === 'number') {
                    _this.m_radius = b;
                }
            }
            else if (typeof a === 'number') {
                _this.m_radius = a;
            }
            return _this;
        }
        /** @internal */
        CircleShape.prototype._serialize = function () {
            return {
                type: this.m_type,
                p: this.m_p,
                radius: this.m_radius,
            };
        };
        /** @internal */
        CircleShape._deserialize = function (data) {
            return new CircleShape(data.p, data.radius);
        };
        /** @internal */
        CircleShape.prototype._reset = function () {
            // noop
        };
        CircleShape.prototype.getType = function () {
            return this.m_type;
        };
        CircleShape.prototype.getRadius = function () {
            return this.m_radius;
        };
        CircleShape.prototype.getCenter = function () {
            return this.m_p;
        };
        /**
         * @internal @deprecated Shapes should be treated as immutable.
         *
         * clone the concrete shape.
         */
        CircleShape.prototype._clone = function () {
            var clone = new CircleShape();
            clone.m_type = this.m_type;
            clone.m_radius = this.m_radius;
            clone.m_p = this.m_p.clone();
            return clone;
        };
        /**
         * Get the number of child primitives.
         */
        CircleShape.prototype.getChildCount = function () {
            return 1;
        };
        /**
         * Test a point for containment in this shape. This only works for convex
         * shapes.
         *
         * @param xf The shape world transform.
         * @param p A point in world coordinates.
         */
        CircleShape.prototype.testPoint = function (xf, p) {
            var center = transformVec2(temp, xf, this.m_p);
            return distSqrVec2(p, center) <= this.m_radius * this.m_radius;
        };
        /**
         * Cast a ray against a child shape.
         *
         * @param output The ray-cast results.
         * @param input The ray-cast input parameters.
         * @param xf The transform to be applied to the shape.
         * @param childIndex The child shape index
         */
        CircleShape.prototype.rayCast = function (output, input, xf, childIndex) {
            // Collision Detection in Interactive 3D Environments by Gino van den Bergen
            // From Section 3.1.2
            // x = s + a * r
            // norm(x) = radius
            var position = Vec2.add(xf.p, Rot.mulVec2(xf.q, this.m_p));
            var s = Vec2.sub(input.p1, position);
            var b = Vec2.dot(s, s) - this.m_radius * this.m_radius;
            // Solve quadratic equation.
            var r = Vec2.sub(input.p2, input.p1);
            var c = Vec2.dot(s, r);
            var rr = Vec2.dot(r, r);
            var sigma = c * c - rr * b;
            // Check for negative discriminant and short segment.
            if (sigma < 0.0 || rr < EPSILON) {
                return false;
            }
            // Find the point of intersection of the line with the circle.
            var a = -(c + math_sqrt(sigma));
            // Is the intersection point on the segment?
            if (0.0 <= a && a <= input.maxFraction * rr) {
                a /= rr;
                output.fraction = a;
                output.normal = Vec2.add(s, Vec2.mulNumVec2(a, r));
                output.normal.normalize();
                return true;
            }
            return false;
        };
        /**
         * Given a transform, compute the associated axis aligned bounding box for a
         * child shape.
         *
         * @param aabb Returns the axis aligned box.
         * @param xf The world transform of the shape.
         * @param childIndex The child shape
         */
        CircleShape.prototype.computeAABB = function (aabb, xf, childIndex) {
            var p = transformVec2(temp, xf, this.m_p);
            setVec2(aabb.lowerBound, p.x - this.m_radius, p.y - this.m_radius);
            setVec2(aabb.upperBound, p.x + this.m_radius, p.y + this.m_radius);
        };
        /**
         * Compute the mass properties of this shape using its dimensions and density.
         * The inertia tensor is computed about the local origin.
         *
         * @param massData Returns the mass data for this shape.
         * @param density The density in kilograms per meter squared.
         */
        CircleShape.prototype.computeMass = function (massData, density) {
            massData.mass = density * math_PI$4 * this.m_radius * this.m_radius;
            copyVec2(massData.center, this.m_p);
            // inertia about the local origin
            massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + lengthSqrVec2(this.m_p));
        };
        CircleShape.prototype.computeDistanceProxy = function (proxy) {
            proxy.m_vertices[0] = this.m_p;
            proxy.m_vertices.length = 1;
            proxy.m_count = 1;
            proxy.m_radius = this.m_radius;
        };
        CircleShape.TYPE = 'circle';
        return CircleShape;
    }(Shape));
    var Circle = CircleShape;

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_abs$5 = Math.abs;
    /** @internal */ var math_PI$3 = Math.PI;
    /** @internal */ var DEFAULTS$a = {
        frequencyHz: 0.0,
        dampingRatio: 0.0
    };
    /**
     * A distance joint constrains two points on two bodies to remain at a fixed
     * distance from each other. You can view this as a massless, rigid rod.
     */
    var DistanceJoint = /** @class */ (function (_super) {
        __extends(DistanceJoint, _super);
        function DistanceJoint(def, bodyA, bodyB, anchorA, anchorB) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof DistanceJoint)) {
                return new DistanceJoint(def, bodyA, bodyB, anchorA, anchorB);
            }
            // order of constructor arguments is changed in v0.2
            if (bodyB && anchorA && ('m_type' in anchorA) && ('x' in bodyB) && ('y' in bodyB)) {
                var temp = bodyB;
                bodyB = anchorA;
                anchorA = temp;
            }
            def = options(def, DEFAULTS$a);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = DistanceJoint.TYPE;
            // Solver shared
            _this.m_localAnchorA = Vec2.clone(anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.zero());
            _this.m_localAnchorB = Vec2.clone(anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.zero());
            _this.m_length = Number.isFinite(def.length) ? def.length :
                Vec2.distance(bodyA.getWorldPoint(_this.m_localAnchorA), bodyB.getWorldPoint(_this.m_localAnchorB));
            _this.m_frequencyHz = def.frequencyHz;
            _this.m_dampingRatio = def.dampingRatio;
            _this.m_impulse = 0.0;
            _this.m_gamma = 0.0;
            _this.m_bias = 0.0;
            return _this;
            // 1-D constrained system
            // m (v2 - v1) = lambda
            // v2 + (beta/h) * x1 + gamma * lambda = 0, gamma has units of inverse mass.
            // x2 = x1 + h * v2
            // 1-D mass-damper-spring system
            // m (v2 - v1) + h * d * v2 + h * k *
            // C = norm(p2 - p1) - L
            // u = (p2 - p1) / norm(p2 - p1)
            // Cdot = dot(u, v2 + cross(w2, r2) - v1 - cross(w1, r1))
            // J = [-u -cross(r1, u) u cross(r2, u)]
            // K = J * invM * JT
            // = invMass1 + invI1 * cross(r1, u)^2 + invMass2 + invI2 * cross(r2, u)^2
        }
        /** @internal */
        DistanceJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                frequencyHz: this.m_frequencyHz,
                dampingRatio: this.m_dampingRatio,
                localAnchorA: this.m_localAnchorA,
                localAnchorB: this.m_localAnchorB,
                length: this.m_length,
                impulse: this.m_impulse,
                gamma: this.m_gamma,
                bias: this.m_bias,
            };
        };
        /** @internal */
        DistanceJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new DistanceJoint(data);
            return joint;
        };
        /** @internal */
        DistanceJoint.prototype._setAnchors = function (def) {
            if (def.anchorA) {
                this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
            }
            else if (def.localAnchorA) {
                this.m_localAnchorA.setVec2(def.localAnchorA);
            }
            if (def.anchorB) {
                this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
            }
            else if (def.localAnchorB) {
                this.m_localAnchorB.setVec2(def.localAnchorB);
            }
            if (def.length > 0) {
                this.m_length = +def.length;
            }
            else if (def.length < 0) ;
            else if (def.anchorA || def.anchorA || def.anchorA || def.anchorA) {
                this.m_length = Vec2.distance(this.m_bodyA.getWorldPoint(this.m_localAnchorA), this.m_bodyB.getWorldPoint(this.m_localAnchorB));
            }
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        DistanceJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        DistanceJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * Set the natural length. Manipulating the length can lead to non-physical
         * behavior when the frequency is zero.
         */
        DistanceJoint.prototype.setLength = function (length) {
            this.m_length = length;
        };
        /**
         * Get the natural length.
         */
        DistanceJoint.prototype.getLength = function () {
            return this.m_length;
        };
        DistanceJoint.prototype.setFrequency = function (hz) {
            this.m_frequencyHz = hz;
        };
        DistanceJoint.prototype.getFrequency = function () {
            return this.m_frequencyHz;
        };
        DistanceJoint.prototype.setDampingRatio = function (ratio) {
            this.m_dampingRatio = ratio;
        };
        DistanceJoint.prototype.getDampingRatio = function () {
            return this.m_dampingRatio;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        DistanceJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        DistanceJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        DistanceJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(this.m_impulse, this.m_u).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        DistanceJoint.prototype.getReactionTorque = function (inv_dt) {
            return 0.0;
        };
        DistanceJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            this.m_u = Vec2.sub(Vec2.add(cB, this.m_rB), Vec2.add(cA, this.m_rA));
            // Handle singularity.
            var length = this.m_u.length();
            if (length > SettingsInternal.linearSlop) {
                this.m_u.mul(1.0 / length);
            }
            else {
                this.m_u.setNum(0.0, 0.0);
            }
            var crAu = Vec2.crossVec2Vec2(this.m_rA, this.m_u);
            var crBu = Vec2.crossVec2Vec2(this.m_rB, this.m_u);
            var invMass = this.m_invMassA + this.m_invIA * crAu * crAu + this.m_invMassB + this.m_invIB * crBu * crBu;
            // Compute the effective mass matrix.
            this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
            if (this.m_frequencyHz > 0.0) {
                var C = length - this.m_length;
                // Frequency
                var omega = 2.0 * math_PI$3 * this.m_frequencyHz;
                // Damping coefficient
                var d = 2.0 * this.m_mass * this.m_dampingRatio * omega;
                // Spring stiffness
                var k = this.m_mass * omega * omega;
                // magic formulas
                var h = step.dt;
                this.m_gamma = h * (d + h * k);
                this.m_gamma = this.m_gamma != 0.0 ? 1.0 / this.m_gamma : 0.0;
                this.m_bias = C * h * k * this.m_gamma;
                invMass += this.m_gamma;
                this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
            }
            else {
                this.m_gamma = 0.0;
                this.m_bias = 0.0;
            }
            if (step.warmStarting) {
                // Scale the impulse to support a variable time step.
                this.m_impulse *= step.dtRatio;
                var P = Vec2.mulNumVec2(this.m_impulse, this.m_u);
                vA.subMul(this.m_invMassA, P);
                wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P);
                vB.addMul(this.m_invMassB, P);
                wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P);
            }
            else {
                this.m_impulse = 0.0;
            }
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
        };
        DistanceJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            // Cdot = dot(u, v + cross(w, r))
            var vpA = Vec2.add(vA, Vec2.crossNumVec2(wA, this.m_rA));
            var vpB = Vec2.add(vB, Vec2.crossNumVec2(wB, this.m_rB));
            var Cdot = Vec2.dot(this.m_u, vpB) - Vec2.dot(this.m_u, vpA);
            var impulse = -this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
            this.m_impulse += impulse;
            var P = Vec2.mulNumVec2(impulse, this.m_u);
            vA.subMul(this.m_invMassA, P);
            wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P);
            vB.addMul(this.m_invMassB, P);
            wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P);
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        DistanceJoint.prototype.solvePositionConstraints = function (step) {
            if (this.m_frequencyHz > 0.0) {
                // There is no position correction for soft distance constraints.
                return true;
            }
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
            var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
            var u = Vec2.sub(Vec2.add(cB, rB), Vec2.add(cA, rA));
            var length = u.normalize();
            var C = clamp(length - this.m_length, -SettingsInternal.maxLinearCorrection, SettingsInternal.maxLinearCorrection);
            var impulse = -this.m_mass * C;
            var P = Vec2.mulNumVec2(impulse, u);
            cA.subMul(this.m_invMassA, P);
            aA -= this.m_invIA * Vec2.crossVec2Vec2(rA, P);
            cB.addMul(this.m_invMassB, P);
            aB += this.m_invIB * Vec2.crossVec2Vec2(rB, P);
            this.m_bodyA.c_position.c.setVec2(cA);
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c.setVec2(cB);
            this.m_bodyB.c_position.a = aB;
            return math_abs$5(C) < SettingsInternal.linearSlop;
        };
        DistanceJoint.TYPE = 'distance-joint';
        return DistanceJoint;
    }(Joint));

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var DEFAULTS$9 = {
        maxForce: 0.0,
        maxTorque: 0.0,
    };
    /**
     * Friction joint. This is used for top-down friction. It provides 2D
     * translational friction and angular friction.
     */
    var FrictionJoint = /** @class */ (function (_super) {
        __extends(FrictionJoint, _super);
        function FrictionJoint(def, bodyA, bodyB, anchor) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof FrictionJoint)) {
                return new FrictionJoint(def, bodyA, bodyB, anchor);
            }
            def = options(def, DEFAULTS$9);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = FrictionJoint.TYPE;
            _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
            _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
            // Solver shared
            _this.m_linearImpulse = Vec2.zero();
            _this.m_angularImpulse = 0.0;
            _this.m_maxForce = def.maxForce;
            _this.m_maxTorque = def.maxTorque;
            return _this;
            // Point-to-point constraint
            // Cdot = v2 - v1
            // = v2 + cross(w2, r2) - v1 - cross(w1, r1)
            // J = [-I -r1_skew I r2_skew ]
            // Identity used:
            // w k % (rx i + ry j) = w * (-ry i + rx j)
            // Angle constraint
            // Cdot = w2 - w1
            // J = [0 0 -1 0 0 1]
            // K = invI1 + invI2
        }
        /** @internal */
        FrictionJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                maxForce: this.m_maxForce,
                maxTorque: this.m_maxTorque,
                localAnchorA: this.m_localAnchorA,
                localAnchorB: this.m_localAnchorB,
            };
        };
        /** @internal */
        FrictionJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new FrictionJoint(data);
            return joint;
        };
        /** @internal */
        FrictionJoint.prototype._setAnchors = function (def) {
            if (def.anchorA) {
                this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
            }
            else if (def.localAnchorA) {
                this.m_localAnchorA.setVec2(def.localAnchorA);
            }
            if (def.anchorB) {
                this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
            }
            else if (def.localAnchorB) {
                this.m_localAnchorB.setVec2(def.localAnchorB);
            }
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        FrictionJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        FrictionJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * Set the maximum friction force in N.
         */
        FrictionJoint.prototype.setMaxForce = function (force) {
            this.m_maxForce = force;
        };
        /**
         * Get the maximum friction force in N.
         */
        FrictionJoint.prototype.getMaxForce = function () {
            return this.m_maxForce;
        };
        /**
         * Set the maximum friction torque in N*m.
         */
        FrictionJoint.prototype.setMaxTorque = function (torque) {
            this.m_maxTorque = torque;
        };
        /**
         * Get the maximum friction torque in N*m.
         */
        FrictionJoint.prototype.getMaxTorque = function () {
            return this.m_maxTorque;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        FrictionJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        FrictionJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        FrictionJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(inv_dt, this.m_linearImpulse);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        FrictionJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * this.m_angularImpulse;
        };
        FrictionJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            // Compute the effective mass matrix.
            this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            // J = [-I -r1_skew I r2_skew]
            // [ 0 -1 0 1]
            // r_skew = [-ry; rx]
            // Matlab
            // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
            // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
            // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var K = new Mat22();
            K.ex.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y
                * this.m_rB.y;
            K.ex.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
            K.ey.x = K.ex.y;
            K.ey.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x
                * this.m_rB.x;
            this.m_linearMass = K.getInverse();
            this.m_angularMass = iA + iB;
            if (this.m_angularMass > 0.0) {
                this.m_angularMass = 1.0 / this.m_angularMass;
            }
            if (step.warmStarting) {
                // Scale impulses to support a variable time step.
                this.m_linearImpulse.mul(step.dtRatio);
                this.m_angularImpulse *= step.dtRatio;
                var P = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);
                vA.subMul(mA, P);
                wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + this.m_angularImpulse);
                vB.addMul(mB, P);
                wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + this.m_angularImpulse);
            }
            else {
                this.m_linearImpulse.setZero();
                this.m_angularImpulse = 0.0;
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        FrictionJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var h = step.dt;
            // Solve angular friction
            {
                var Cdot = wB - wA;
                var impulse = -this.m_angularMass * Cdot;
                var oldImpulse = this.m_angularImpulse;
                var maxImpulse = h * this.m_maxTorque;
                this.m_angularImpulse = clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
                impulse = this.m_angularImpulse - oldImpulse;
                wA -= iA * impulse;
                wB += iB * impulse;
            }
            // Solve linear friction
            {
                var Cdot = Vec2.sub(Vec2.add(vB, Vec2.crossNumVec2(wB, this.m_rB)), Vec2.add(vA, Vec2.crossNumVec2(wA, this.m_rA)));
                var impulse = Vec2.neg(Mat22.mulVec2(this.m_linearMass, Cdot));
                var oldImpulse = this.m_linearImpulse;
                this.m_linearImpulse.add(impulse);
                var maxImpulse = h * this.m_maxForce;
                if (this.m_linearImpulse.lengthSquared() > maxImpulse * maxImpulse) {
                    this.m_linearImpulse.normalize();
                    this.m_linearImpulse.mul(maxImpulse);
                }
                impulse = Vec2.sub(this.m_linearImpulse, oldImpulse);
                vA.subMul(mA, impulse);
                wA -= iA * Vec2.crossVec2Vec2(this.m_rA, impulse);
                vB.addMul(mB, impulse);
                wB += iB * Vec2.crossVec2Vec2(this.m_rB, impulse);
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        FrictionJoint.prototype.solvePositionConstraints = function (step) {
            return true;
        };
        FrictionJoint.TYPE = 'friction-joint';
        return FrictionJoint;
    }(Joint));

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /**
     * A 3-by-3 matrix. Stored in column-major order.
     */
    var Mat33 = /** @class */ (function () {
        function Mat33(a, b, c) {
            if (typeof a === 'object' && a !== null) {
                this.ex = Vec3.clone(a);
                this.ey = Vec3.clone(b);
                this.ez = Vec3.clone(c);
            }
            else {
                this.ex = Vec3.zero();
                this.ey = Vec3.zero();
                this.ez = Vec3.zero();
            }
        }
        /** @internal */
        Mat33.prototype.toString = function () {
            return JSON.stringify(this);
        };
        Mat33.isValid = function (obj) {
            if (obj === null || typeof obj === 'undefined') {
                return false;
            }
            return Vec3.isValid(obj.ex) && Vec3.isValid(obj.ey) && Vec3.isValid(obj.ez);
        };
        Mat33.assert = function (o) {
        };
        /**
         * Set this matrix to all zeros.
         */
        Mat33.prototype.setZero = function () {
            this.ex.setZero();
            this.ey.setZero();
            this.ez.setZero();
            return this;
        };
        /**
         * Solve A * x = b, where b is a column vector. This is more efficient than
         * computing the inverse in one-shot cases.
         */
        Mat33.prototype.solve33 = function (v) {
            // let det = matrix.dotVec3(this.ex, matrix.newCrossVec3(this.ey, this.ez));
            var cross_x = this.ey.y * this.ez.z - this.ey.z * this.ez.y;
            var cross_y = this.ey.z * this.ez.x - this.ey.x * this.ez.z;
            var cross_z = this.ey.x * this.ez.y - this.ey.y * this.ez.x;
            var det = this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z;
            if (det !== 0.0) {
                det = 1.0 / det;
            }
            var r = new Vec3();
            // r.x = det * matrix.dotVec3(v, matrix.newCrossVec3(this.ey, this.ez));
            cross_x = this.ey.y * this.ez.z - this.ey.z * this.ez.y;
            cross_y = this.ey.z * this.ez.x - this.ey.x * this.ez.z;
            cross_z = this.ey.x * this.ez.y - this.ey.y * this.ez.x;
            r.x = det * (v.x * cross_x + v.y * cross_y + v.z * cross_z);
            // r.y = det * matrix.dotVec3(this.ex, matrix.newCrossVec3(v, this.ez));
            cross_x = v.y * this.ez.z - v.z * this.ez.y;
            cross_y = v.z * this.ez.x - v.x * this.ez.z;
            cross_z = v.x * this.ez.y - v.y * this.ez.x;
            r.y = det * (this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z);
            // r.z = det * matrix.dotVec3(this.ex, matrix.newCrossVec3(this.ey, v));
            cross_x = this.ey.y * v.z - this.ey.z * v.y;
            cross_y = this.ey.z * v.x - this.ey.x * v.z;
            cross_z = this.ey.x * v.y - this.ey.y * v.x;
            r.z = det * (this.ex.x * cross_x + this.ex.y * cross_y + this.ex.z * cross_z);
            return r;
        };
        /**
         * Solve A * x = b, where b is a column vector. This is more efficient than
         * computing the inverse in one-shot cases. Solve only the upper 2-by-2 matrix
         * equation.
         */
        Mat33.prototype.solve22 = function (v) {
            var a11 = this.ex.x;
            var a12 = this.ey.x;
            var a21 = this.ex.y;
            var a22 = this.ey.y;
            var det = a11 * a22 - a12 * a21;
            if (det !== 0.0) {
                det = 1.0 / det;
            }
            var r = Vec2.zero();
            r.x = det * (a22 * v.x - a12 * v.y);
            r.y = det * (a11 * v.y - a21 * v.x);
            return r;
        };
        /**
         * Get the inverse of this matrix as a 2-by-2. Returns the zero matrix if
         * singular.
         */
        Mat33.prototype.getInverse22 = function (M) {
            var a = this.ex.x;
            var b = this.ey.x;
            var c = this.ex.y;
            var d = this.ey.y;
            var det = a * d - b * c;
            if (det !== 0.0) {
                det = 1.0 / det;
            }
            M.ex.x = det * d;
            M.ey.x = -det * b;
            M.ex.z = 0.0;
            M.ex.y = -det * c;
            M.ey.y = det * a;
            M.ey.z = 0.0;
            M.ez.x = 0.0;
            M.ez.y = 0.0;
            M.ez.z = 0.0;
        };
        /**
         * Get the symmetric inverse of this matrix as a 3-by-3. Returns the zero matrix
         * if singular.
         */
        Mat33.prototype.getSymInverse33 = function (M) {
            var det = Vec3.dot(this.ex, Vec3.cross(this.ey, this.ez));
            if (det !== 0.0) {
                det = 1.0 / det;
            }
            var a11 = this.ex.x;
            var a12 = this.ey.x;
            var a13 = this.ez.x;
            var a22 = this.ey.y;
            var a23 = this.ez.y;
            var a33 = this.ez.z;
            M.ex.x = det * (a22 * a33 - a23 * a23);
            M.ex.y = det * (a13 * a23 - a12 * a33);
            M.ex.z = det * (a12 * a23 - a13 * a22);
            M.ey.x = M.ex.y;
            M.ey.y = det * (a11 * a33 - a13 * a13);
            M.ey.z = det * (a13 * a12 - a11 * a23);
            M.ez.x = M.ex.z;
            M.ez.y = M.ey.z;
            M.ez.z = det * (a11 * a22 - a12 * a12);
        };
        Mat33.mul = function (a, b) {
            if (b && 'z' in b && 'y' in b && 'x' in b) {
                var x = a.ex.x * b.x + a.ey.x * b.y + a.ez.x * b.z;
                var y = a.ex.y * b.x + a.ey.y * b.y + a.ez.y * b.z;
                var z = a.ex.z * b.x + a.ey.z * b.y + a.ez.z * b.z;
                return new Vec3(x, y, z);
            }
            else if (b && 'y' in b && 'x' in b) {
                var x = a.ex.x * b.x + a.ey.x * b.y;
                var y = a.ex.y * b.x + a.ey.y * b.y;
                return Vec2.neo(x, y);
            }
        };
        Mat33.mulVec3 = function (a, b) {
            var x = a.ex.x * b.x + a.ey.x * b.y + a.ez.x * b.z;
            var y = a.ex.y * b.x + a.ey.y * b.y + a.ez.y * b.z;
            var z = a.ex.z * b.x + a.ey.z * b.y + a.ez.z * b.z;
            return new Vec3(x, y, z);
        };
        Mat33.mulVec2 = function (a, b) {
            var x = a.ex.x * b.x + a.ey.x * b.y;
            var y = a.ex.y * b.x + a.ey.y * b.y;
            return Vec2.neo(x, y);
        };
        Mat33.add = function (a, b) {
            return new Mat33(Vec3.add(a.ex, b.ex), Vec3.add(a.ey, b.ey), Vec3.add(a.ez, b.ez));
        };
        return Mat33;
    }());

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_abs$4 = Math.abs;
    // todo: use string?
    /** @internal */ var LimitState$2;
    (function (LimitState) {
        LimitState[LimitState["inactiveLimit"] = 0] = "inactiveLimit";
        LimitState[LimitState["atLowerLimit"] = 1] = "atLowerLimit";
        LimitState[LimitState["atUpperLimit"] = 2] = "atUpperLimit";
        LimitState[LimitState["equalLimits"] = 3] = "equalLimits";
    })(LimitState$2 || (LimitState$2 = {}));
    /** @internal */ var DEFAULTS$8 = {
        lowerAngle: 0.0,
        upperAngle: 0.0,
        maxMotorTorque: 0.0,
        motorSpeed: 0.0,
        enableLimit: false,
        enableMotor: false
    };
    /**
     * A revolute joint constrains two bodies to share a common point while they are
     * free to rotate about the point. The relative rotation about the shared point
     * is the joint angle. You can limit the relative rotation with a joint limit
     * that specifies a lower and upper angle. You can use a motor to drive the
     * relative rotation about the shared point. A maximum motor torque is provided
     * so that infinite forces are not generated.
     */
    var RevoluteJoint = /** @class */ (function (_super) {
        __extends(RevoluteJoint, _super);
        function RevoluteJoint(def, bodyA, bodyB, anchor) {
            var _a, _b, _c, _d, _e, _f;
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof RevoluteJoint)) {
                return new RevoluteJoint(def, bodyA, bodyB, anchor);
            }
            def = def !== null && def !== void 0 ? def : {};
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_mass = new Mat33();
            _this.m_limitState = LimitState$2.inactiveLimit;
            _this.m_type = RevoluteJoint.TYPE;
            if (Vec2.isValid(anchor)) {
                _this.m_localAnchorA = bodyA.getLocalPoint(anchor);
            }
            else if (Vec2.isValid(def.localAnchorA)) {
                _this.m_localAnchorA = Vec2.clone(def.localAnchorA);
            }
            else {
                _this.m_localAnchorA = Vec2.zero();
            }
            if (Vec2.isValid(anchor)) {
                _this.m_localAnchorB = bodyB.getLocalPoint(anchor);
            }
            else if (Vec2.isValid(def.localAnchorB)) {
                _this.m_localAnchorB = Vec2.clone(def.localAnchorB);
            }
            else {
                _this.m_localAnchorB = Vec2.zero();
            }
            if (Number.isFinite(def.referenceAngle)) {
                _this.m_referenceAngle = def.referenceAngle;
            }
            else {
                _this.m_referenceAngle = bodyB.getAngle() - bodyA.getAngle();
            }
            _this.m_impulse = new Vec3();
            _this.m_motorImpulse = 0.0;
            _this.m_lowerAngle = (_a = def.lowerAngle) !== null && _a !== void 0 ? _a : DEFAULTS$8.lowerAngle;
            _this.m_upperAngle = (_b = def.upperAngle) !== null && _b !== void 0 ? _b : DEFAULTS$8.upperAngle;
            _this.m_maxMotorTorque = (_c = def.maxMotorTorque) !== null && _c !== void 0 ? _c : DEFAULTS$8.maxMotorTorque;
            _this.m_motorSpeed = (_d = def.motorSpeed) !== null && _d !== void 0 ? _d : DEFAULTS$8.motorSpeed;
            _this.m_enableLimit = (_e = def.enableLimit) !== null && _e !== void 0 ? _e : DEFAULTS$8.enableLimit;
            _this.m_enableMotor = (_f = def.enableMotor) !== null && _f !== void 0 ? _f : DEFAULTS$8.enableMotor;
            return _this;
            // Point-to-point constraint
            // C = p2 - p1
            // Cdot = v2 - v1
            // = v2 + cross(w2, r2) - v1 - cross(w1, r1)
            // J = [-I -r1_skew I r2_skew ]
            // Identity used:
            // w k % (rx i + ry j) = w * (-ry i + rx j)
            // Motor constraint
            // Cdot = w2 - w1
            // J = [0 0 -1 0 0 1]
            // K = invI1 + invI2
        }
        /** @internal */
        RevoluteJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                lowerAngle: this.m_lowerAngle,
                upperAngle: this.m_upperAngle,
                maxMotorTorque: this.m_maxMotorTorque,
                motorSpeed: this.m_motorSpeed,
                enableLimit: this.m_enableLimit,
                enableMotor: this.m_enableMotor,
                localAnchorA: this.m_localAnchorA,
                localAnchorB: this.m_localAnchorB,
                referenceAngle: this.m_referenceAngle,
            };
        };
        /** @internal */
        RevoluteJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new RevoluteJoint(data);
            return joint;
        };
        /** @internal */
        RevoluteJoint.prototype._setAnchors = function (def) {
            if (def.anchorA) {
                this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
            }
            else if (def.localAnchorA) {
                this.m_localAnchorA.setVec2(def.localAnchorA);
            }
            if (def.anchorB) {
                this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
            }
            else if (def.localAnchorB) {
                this.m_localAnchorB.setVec2(def.localAnchorB);
            }
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        RevoluteJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        RevoluteJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * Get the reference angle.
         */
        RevoluteJoint.prototype.getReferenceAngle = function () {
            return this.m_referenceAngle;
        };
        /**
         * Get the current joint angle in radians.
         */
        RevoluteJoint.prototype.getJointAngle = function () {
            var bA = this.m_bodyA;
            var bB = this.m_bodyB;
            return bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
        };
        /**
         * Get the current joint angle speed in radians per second.
         */
        RevoluteJoint.prototype.getJointSpeed = function () {
            var bA = this.m_bodyA;
            var bB = this.m_bodyB;
            return bB.m_angularVelocity - bA.m_angularVelocity;
        };
        /**
         * Is the joint motor enabled?
         */
        RevoluteJoint.prototype.isMotorEnabled = function () {
            return this.m_enableMotor;
        };
        /**
         * Enable/disable the joint motor.
         */
        RevoluteJoint.prototype.enableMotor = function (flag) {
            if (flag == this.m_enableMotor)
                return;
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_enableMotor = flag;
        };
        /**
         * Get the current motor torque given the inverse time step. Unit is N*m.
         */
        RevoluteJoint.prototype.getMotorTorque = function (inv_dt) {
            return inv_dt * this.m_motorImpulse;
        };
        /**
         * Set the motor speed in radians per second.
         */
        RevoluteJoint.prototype.setMotorSpeed = function (speed) {
            if (speed == this.m_motorSpeed)
                return;
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_motorSpeed = speed;
        };
        /**
         * Get the motor speed in radians per second.
         */
        RevoluteJoint.prototype.getMotorSpeed = function () {
            return this.m_motorSpeed;
        };
        /**
         * Set the maximum motor torque, usually in N-m.
         */
        RevoluteJoint.prototype.setMaxMotorTorque = function (torque) {
            if (torque == this.m_maxMotorTorque)
                return;
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_maxMotorTorque = torque;
        };
        RevoluteJoint.prototype.getMaxMotorTorque = function () {
            return this.m_maxMotorTorque;
        };
        /**
         * Is the joint limit enabled?
         */
        RevoluteJoint.prototype.isLimitEnabled = function () {
            return this.m_enableLimit;
        };
        /**
         * Enable/disable the joint limit.
         */
        RevoluteJoint.prototype.enableLimit = function (flag) {
            if (flag != this.m_enableLimit) {
                this.m_bodyA.setAwake(true);
                this.m_bodyB.setAwake(true);
                this.m_enableLimit = flag;
                this.m_impulse.z = 0.0;
            }
        };
        /**
         * Get the lower joint limit in radians.
         */
        RevoluteJoint.prototype.getLowerLimit = function () {
            return this.m_lowerAngle;
        };
        /**
         * Get the upper joint limit in radians.
         */
        RevoluteJoint.prototype.getUpperLimit = function () {
            return this.m_upperAngle;
        };
        /**
         * Set the joint limits in radians.
         */
        RevoluteJoint.prototype.setLimits = function (lower, upper) {
            if (lower != this.m_lowerAngle || upper != this.m_upperAngle) {
                this.m_bodyA.setAwake(true);
                this.m_bodyB.setAwake(true);
                this.m_impulse.z = 0.0;
                this.m_lowerAngle = lower;
                this.m_upperAngle = upper;
            }
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        RevoluteJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        RevoluteJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force given the inverse time step. Unit is N.
         */
        RevoluteJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
        };
        /**
         * Get the reaction torque due to the joint limit given the inverse time step.
         * Unit is N*m.
         */
        RevoluteJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * this.m_impulse.z;
        };
        RevoluteJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            // J = [-I -r1_skew I r2_skew]
            // [ 0 -1 0 1]
            // r_skew = [-ry; rx]
            // Matlab
            // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
            // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
            // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var fixedRotation = (iA + iB === 0.0);
            this.m_mass.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y * iB;
            this.m_mass.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
            this.m_mass.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
            this.m_mass.ex.y = this.m_mass.ey.x;
            this.m_mass.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x * iB;
            this.m_mass.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
            this.m_mass.ex.z = this.m_mass.ez.x;
            this.m_mass.ey.z = this.m_mass.ez.y;
            this.m_mass.ez.z = iA + iB;
            this.m_motorMass = iA + iB;
            if (this.m_motorMass > 0.0) {
                this.m_motorMass = 1.0 / this.m_motorMass;
            }
            if (this.m_enableMotor == false || fixedRotation) {
                this.m_motorImpulse = 0.0;
            }
            if (this.m_enableLimit && fixedRotation == false) {
                var jointAngle = aB - aA - this.m_referenceAngle;
                if (math_abs$4(this.m_upperAngle - this.m_lowerAngle) < 2.0 * SettingsInternal.angularSlop) {
                    this.m_limitState = LimitState$2.equalLimits;
                }
                else if (jointAngle <= this.m_lowerAngle) {
                    if (this.m_limitState != LimitState$2.atLowerLimit) {
                        this.m_impulse.z = 0.0;
                    }
                    this.m_limitState = LimitState$2.atLowerLimit;
                }
                else if (jointAngle >= this.m_upperAngle) {
                    if (this.m_limitState != LimitState$2.atUpperLimit) {
                        this.m_impulse.z = 0.0;
                    }
                    this.m_limitState = LimitState$2.atUpperLimit;
                }
                else {
                    this.m_limitState = LimitState$2.inactiveLimit;
                    this.m_impulse.z = 0.0;
                }
            }
            else {
                this.m_limitState = LimitState$2.inactiveLimit;
            }
            if (step.warmStarting) {
                // Scale impulses to support a variable time step.
                this.m_impulse.mul(step.dtRatio);
                this.m_motorImpulse *= step.dtRatio;
                var P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
                vA.subMul(mA, P);
                wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + this.m_motorImpulse + this.m_impulse.z);
                vB.addMul(mB, P);
                wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + this.m_motorImpulse + this.m_impulse.z);
            }
            else {
                this.m_impulse.setZero();
                this.m_motorImpulse = 0.0;
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        RevoluteJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var fixedRotation = (iA + iB === 0.0);
            // Solve motor constraint.
            if (this.m_enableMotor && this.m_limitState != LimitState$2.equalLimits && fixedRotation == false) {
                var Cdot = wB - wA - this.m_motorSpeed;
                var impulse = -this.m_motorMass * Cdot;
                var oldImpulse = this.m_motorImpulse;
                var maxImpulse = step.dt * this.m_maxMotorTorque;
                this.m_motorImpulse = clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
                impulse = this.m_motorImpulse - oldImpulse;
                wA -= iA * impulse;
                wB += iB * impulse;
            }
            // Solve limit constraint.
            if (this.m_enableLimit && this.m_limitState != LimitState$2.inactiveLimit && fixedRotation == false) {
                var Cdot1 = Vec2.zero();
                Cdot1.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
                Cdot1.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
                var Cdot2 = wB - wA;
                var Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);
                var impulse = Vec3.neg(this.m_mass.solve33(Cdot));
                if (this.m_limitState == LimitState$2.equalLimits) {
                    this.m_impulse.add(impulse);
                }
                else if (this.m_limitState == LimitState$2.atLowerLimit) {
                    var newImpulse = this.m_impulse.z + impulse.z;
                    if (newImpulse < 0.0) {
                        var rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y));
                        var reduced = this.m_mass.solve22(rhs);
                        impulse.x = reduced.x;
                        impulse.y = reduced.y;
                        impulse.z = -this.m_impulse.z;
                        this.m_impulse.x += reduced.x;
                        this.m_impulse.y += reduced.y;
                        this.m_impulse.z = 0.0;
                    }
                    else {
                        this.m_impulse.add(impulse);
                    }
                }
                else if (this.m_limitState == LimitState$2.atUpperLimit) {
                    var newImpulse = this.m_impulse.z + impulse.z;
                    if (newImpulse > 0.0) {
                        var rhs = Vec2.combine(-1, Cdot1, this.m_impulse.z, Vec2.neo(this.m_mass.ez.x, this.m_mass.ez.y));
                        var reduced = this.m_mass.solve22(rhs);
                        impulse.x = reduced.x;
                        impulse.y = reduced.y;
                        impulse.z = -this.m_impulse.z;
                        this.m_impulse.x += reduced.x;
                        this.m_impulse.y += reduced.y;
                        this.m_impulse.z = 0.0;
                    }
                    else {
                        this.m_impulse.add(impulse);
                    }
                }
                var P = Vec2.neo(impulse.x, impulse.y);
                vA.subMul(mA, P);
                wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + impulse.z);
                vB.addMul(mB, P);
                wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + impulse.z);
            }
            else {
                // Solve point-to-point constraint
                var Cdot = Vec2.zero();
                Cdot.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
                Cdot.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
                var impulse = this.m_mass.solve22(Vec2.neg(Cdot));
                this.m_impulse.x += impulse.x;
                this.m_impulse.y += impulse.y;
                vA.subMul(mA, impulse);
                wA -= iA * Vec2.crossVec2Vec2(this.m_rA, impulse);
                vB.addMul(mB, impulse);
                wB += iB * Vec2.crossVec2Vec2(this.m_rB, impulse);
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        RevoluteJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var angularError = 0.0;
            var positionError = 0.0;
            var fixedRotation = (this.m_invIA + this.m_invIB == 0.0);
            // Solve angular limit constraint.
            if (this.m_enableLimit && this.m_limitState != LimitState$2.inactiveLimit && fixedRotation == false) {
                var angle = aB - aA - this.m_referenceAngle;
                var limitImpulse = 0.0;
                if (this.m_limitState == LimitState$2.equalLimits) {
                    // Prevent large angular corrections
                    var C = clamp(angle - this.m_lowerAngle, -SettingsInternal.maxAngularCorrection, SettingsInternal.maxAngularCorrection);
                    limitImpulse = -this.m_motorMass * C;
                    angularError = math_abs$4(C);
                }
                else if (this.m_limitState == LimitState$2.atLowerLimit) {
                    var C = angle - this.m_lowerAngle;
                    angularError = -C;
                    // Prevent large angular corrections and allow some slop.
                    C = clamp(C + SettingsInternal.angularSlop, -SettingsInternal.maxAngularCorrection, 0.0);
                    limitImpulse = -this.m_motorMass * C;
                }
                else if (this.m_limitState == LimitState$2.atUpperLimit) {
                    var C = angle - this.m_upperAngle;
                    angularError = C;
                    // Prevent large angular corrections and allow some slop.
                    C = clamp(C - SettingsInternal.angularSlop, 0.0, SettingsInternal.maxAngularCorrection);
                    limitImpulse = -this.m_motorMass * C;
                }
                aA -= this.m_invIA * limitImpulse;
                aB += this.m_invIB * limitImpulse;
            }
            // Solve point-to-point constraint.
            {
                qA.setAngle(aA);
                qB.setAngle(aB);
                var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
                var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
                var C = Vec2.zero();
                C.addCombine(1, cB, 1, rB);
                C.subCombine(1, cA, 1, rA);
                positionError = C.length();
                var mA = this.m_invMassA;
                var mB = this.m_invMassB;
                var iA = this.m_invIA;
                var iB = this.m_invIB;
                var K = new Mat22();
                K.ex.x = mA + mB + iA * rA.y * rA.y + iB * rB.y * rB.y;
                K.ex.y = -iA * rA.x * rA.y - iB * rB.x * rB.y;
                K.ey.x = K.ex.y;
                K.ey.y = mA + mB + iA * rA.x * rA.x + iB * rB.x * rB.x;
                var impulse = Vec2.neg(K.solve(C));
                cA.subMul(mA, impulse);
                aA -= iA * Vec2.crossVec2Vec2(rA, impulse);
                cB.addMul(mB, impulse);
                aB += iB * Vec2.crossVec2Vec2(rB, impulse);
            }
            this.m_bodyA.c_position.c.setVec2(cA);
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c.setVec2(cB);
            this.m_bodyB.c_position.a = aB;
            return positionError <= SettingsInternal.linearSlop && angularError <= SettingsInternal.angularSlop;
        };
        RevoluteJoint.TYPE = 'revolute-joint';
        return RevoluteJoint;
    }(Joint));

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_abs$3 = Math.abs;
    /** @internal */ var math_max = Math.max;
    /** @internal */ var math_min$2 = Math.min;
    /** @internal */ var LimitState$1;
    (function (LimitState) {
        LimitState[LimitState["inactiveLimit"] = 0] = "inactiveLimit";
        LimitState[LimitState["atLowerLimit"] = 1] = "atLowerLimit";
        LimitState[LimitState["atUpperLimit"] = 2] = "atUpperLimit";
        LimitState[LimitState["equalLimits"] = 3] = "equalLimits";
    })(LimitState$1 || (LimitState$1 = {}));
    /** @internal */ var DEFAULTS$7 = {
        enableLimit: false,
        lowerTranslation: 0.0,
        upperTranslation: 0.0,
        enableMotor: false,
        maxMotorForce: 0.0,
        motorSpeed: 0.0
    };
    /**
     * A prismatic joint. This joint provides one degree of freedom: translation
     * along an axis fixed in bodyA. Relative rotation is prevented. You can use a
     * joint limit to restrict the range of motion and a joint motor to drive the
     * motion or to model joint friction.
     */
    var PrismaticJoint = /** @class */ (function (_super) {
        __extends(PrismaticJoint, _super);
        function PrismaticJoint(def, bodyA, bodyB, anchor, axis) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof PrismaticJoint)) {
                return new PrismaticJoint(def, bodyA, bodyB, anchor, axis);
            }
            def = options(def, DEFAULTS$7);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = PrismaticJoint.TYPE;
            _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
            _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
            _this.m_localXAxisA = Vec2.clone(axis ? bodyA.getLocalVector(axis) : def.localAxisA || Vec2.neo(1.0, 0.0));
            _this.m_localXAxisA.normalize();
            _this.m_localYAxisA = Vec2.crossNumVec2(1.0, _this.m_localXAxisA);
            _this.m_referenceAngle = Number.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();
            _this.m_impulse = new Vec3();
            _this.m_motorMass = 0.0;
            _this.m_motorImpulse = 0.0;
            _this.m_lowerTranslation = def.lowerTranslation;
            _this.m_upperTranslation = def.upperTranslation;
            _this.m_maxMotorForce = def.maxMotorForce;
            _this.m_motorSpeed = def.motorSpeed;
            _this.m_enableLimit = def.enableLimit;
            _this.m_enableMotor = def.enableMotor;
            _this.m_limitState = LimitState$1.inactiveLimit;
            _this.m_axis = Vec2.zero();
            _this.m_perp = Vec2.zero();
            _this.m_K = new Mat33();
            return _this;
            // Linear constraint (point-to-line)
            // d = p2 - p1 = x2 + r2 - x1 - r1
            // C = dot(perp, d)
            // Cdot = dot(d, cross(w1, perp)) + dot(perp, v2 + cross(w2, r2) - v1 -
            // cross(w1, r1))
            // = -dot(perp, v1) - dot(cross(d + r1, perp), w1) + dot(perp, v2) +
            // dot(cross(r2, perp), v2)
            // J = [-perp, -cross(d + r1, perp), perp, cross(r2,perp)]
            //
            // Angular constraint
            // C = a2 - a1 + a_initial
            // Cdot = w2 - w1
            // J = [0 0 -1 0 0 1]
            //
            // K = J * invM * JT
            //
            // J = [-a -s1 a s2]
            // [0 -1 0 1]
            // a = perp
            // s1 = cross(d + r1, a) = cross(p2 - x1, a)
            // s2 = cross(r2, a) = cross(p2 - x2, a)
            // Motor/Limit linear constraint
            // C = dot(ax1, d)
            // Cdot = = -dot(ax1, v1) - dot(cross(d + r1, ax1), w1) + dot(ax1, v2) +
            // dot(cross(r2, ax1), v2)
            // J = [-ax1 -cross(d+r1,ax1) ax1 cross(r2,ax1)]
            // Block Solver
            // We develop a block solver that includes the joint limit. This makes the
            // limit stiff (inelastic) even
            // when the mass has poor distribution (leading to large torques about the
            // joint anchor points).
            //
            // The Jacobian has 3 rows:
            // J = [-uT -s1 uT s2] // linear
            // [0 -1 0 1] // angular
            // [-vT -a1 vT a2] // limit
            //
            // u = perp
            // v = axis
            // s1 = cross(d + r1, u), s2 = cross(r2, u)
            // a1 = cross(d + r1, v), a2 = cross(r2, v)
            // M * (v2 - v1) = JT * df
            // J * v2 = bias
            //
            // v2 = v1 + invM * JT * df
            // J * (v1 + invM * JT * df) = bias
            // K * df = bias - J * v1 = -Cdot
            // K = J * invM * JT
            // Cdot = J * v1 - bias
            //
            // Now solve for f2.
            // df = f2 - f1
            // K * (f2 - f1) = -Cdot
            // f2 = invK * (-Cdot) + f1
            //
            // Clamp accumulated limit impulse.
            // lower: f2(3) = max(f2(3), 0)
            // upper: f2(3) = min(f2(3), 0)
            //
            // Solve for correct f2(1:2)
            // K(1:2, 1:2) * f2(1:2) = -Cdot(1:2) - K(1:2,3) * f2(3) + K(1:2,1:3) * f1
            // = -Cdot(1:2) - K(1:2,3) * f2(3) + K(1:2,1:2) * f1(1:2) + K(1:2,3) * f1(3)
            // K(1:2, 1:2) * f2(1:2) = -Cdot(1:2) - K(1:2,3) * (f2(3) - f1(3)) +
            // K(1:2,1:2) * f1(1:2)
            // f2(1:2) = invK(1:2,1:2) * (-Cdot(1:2) - K(1:2,3) * (f2(3) - f1(3))) +
            // f1(1:2)
            //
            // Now compute impulse to be applied:
            // df = f2 - f1
        }
        /** @internal */
        PrismaticJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                lowerTranslation: this.m_lowerTranslation,
                upperTranslation: this.m_upperTranslation,
                maxMotorForce: this.m_maxMotorForce,
                motorSpeed: this.m_motorSpeed,
                enableLimit: this.m_enableLimit,
                enableMotor: this.m_enableMotor,
                localAnchorA: this.m_localAnchorA,
                localAnchorB: this.m_localAnchorB,
                localAxisA: this.m_localXAxisA,
                referenceAngle: this.m_referenceAngle,
            };
        };
        /** @internal */
        PrismaticJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            data.localAxisA = Vec2.clone(data.localAxisA);
            var joint = new PrismaticJoint(data);
            return joint;
        };
        /** @internal */
        PrismaticJoint.prototype._setAnchors = function (def) {
            if (def.anchorA) {
                this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
            }
            else if (def.localAnchorA) {
                this.m_localAnchorA.setVec2(def.localAnchorA);
            }
            if (def.anchorB) {
                this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
            }
            else if (def.localAnchorB) {
                this.m_localAnchorB.setVec2(def.localAnchorB);
            }
            if (def.localAxisA) {
                this.m_localXAxisA.setVec2(def.localAxisA);
                this.m_localYAxisA.setVec2(Vec2.crossNumVec2(1.0, def.localAxisA));
            }
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        PrismaticJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        PrismaticJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * The local joint axis relative to bodyA.
         */
        PrismaticJoint.prototype.getLocalAxisA = function () {
            return this.m_localXAxisA;
        };
        /**
         * Get the reference angle.
         */
        PrismaticJoint.prototype.getReferenceAngle = function () {
            return this.m_referenceAngle;
        };
        /**
         * Get the current joint translation, usually in meters.
         */
        PrismaticJoint.prototype.getJointTranslation = function () {
            var pA = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
            var pB = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
            var d = Vec2.sub(pB, pA);
            var axis = this.m_bodyA.getWorldVector(this.m_localXAxisA);
            var translation = Vec2.dot(d, axis);
            return translation;
        };
        /**
         * Get the current joint translation speed, usually in meters per second.
         */
        PrismaticJoint.prototype.getJointSpeed = function () {
            var bA = this.m_bodyA;
            var bB = this.m_bodyB;
            var rA = Rot.mulVec2(bA.m_xf.q, Vec2.sub(this.m_localAnchorA, bA.m_sweep.localCenter));
            var rB = Rot.mulVec2(bB.m_xf.q, Vec2.sub(this.m_localAnchorB, bB.m_sweep.localCenter));
            var p1 = Vec2.add(bA.m_sweep.c, rA);
            var p2 = Vec2.add(bB.m_sweep.c, rB);
            var d = Vec2.sub(p2, p1);
            var axis = Rot.mulVec2(bA.m_xf.q, this.m_localXAxisA);
            var vA = bA.m_linearVelocity;
            var vB = bB.m_linearVelocity;
            var wA = bA.m_angularVelocity;
            var wB = bB.m_angularVelocity;
            var speed = Vec2.dot(d, Vec2.crossNumVec2(wA, axis)) + Vec2.dot(axis, Vec2.sub(Vec2.addCrossNumVec2(vB, wB, rB), Vec2.addCrossNumVec2(vA, wA, rA)));
            return speed;
        };
        /**
         * Is the joint limit enabled?
         */
        PrismaticJoint.prototype.isLimitEnabled = function () {
            return this.m_enableLimit;
        };
        /**
         * Enable/disable the joint limit.
         */
        PrismaticJoint.prototype.enableLimit = function (flag) {
            if (flag != this.m_enableLimit) {
                this.m_bodyA.setAwake(true);
                this.m_bodyB.setAwake(true);
                this.m_enableLimit = flag;
                this.m_impulse.z = 0.0;
            }
        };
        /**
         * Get the lower joint limit, usually in meters.
         */
        PrismaticJoint.prototype.getLowerLimit = function () {
            return this.m_lowerTranslation;
        };
        /**
         * Get the upper joint limit, usually in meters.
         */
        PrismaticJoint.prototype.getUpperLimit = function () {
            return this.m_upperTranslation;
        };
        /**
         * Set the joint limits, usually in meters.
         */
        PrismaticJoint.prototype.setLimits = function (lower, upper) {
            if (lower != this.m_lowerTranslation || upper != this.m_upperTranslation) {
                this.m_bodyA.setAwake(true);
                this.m_bodyB.setAwake(true);
                this.m_lowerTranslation = lower;
                this.m_upperTranslation = upper;
                this.m_impulse.z = 0.0;
            }
        };
        /**
         * Is the joint motor enabled?
         */
        PrismaticJoint.prototype.isMotorEnabled = function () {
            return this.m_enableMotor;
        };
        /**
         * Enable/disable the joint motor.
         */
        PrismaticJoint.prototype.enableMotor = function (flag) {
            if (flag == this.m_enableMotor)
                return;
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_enableMotor = flag;
        };
        /**
         * Set the motor speed, usually in meters per second.
         */
        PrismaticJoint.prototype.setMotorSpeed = function (speed) {
            if (speed == this.m_motorSpeed)
                return;
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_motorSpeed = speed;
        };
        /**
         * Set the maximum motor force, usually in N.
         */
        PrismaticJoint.prototype.setMaxMotorForce = function (force) {
            if (force == this.m_maxMotorForce)
                return;
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_maxMotorForce = force;
        };
        PrismaticJoint.prototype.getMaxMotorForce = function () {
            return this.m_maxMotorForce;
        };
        /**
         * Get the motor speed, usually in meters per second.
         */
        PrismaticJoint.prototype.getMotorSpeed = function () {
            return this.m_motorSpeed;
        };
        /**
         * Get the current motor force given the inverse time step, usually in N.
         */
        PrismaticJoint.prototype.getMotorForce = function (inv_dt) {
            return inv_dt * this.m_motorImpulse;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        PrismaticJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        PrismaticJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        PrismaticJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.combine(this.m_impulse.x, this.m_perp, this.m_motorImpulse + this.m_impulse.z, this.m_axis).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        PrismaticJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * this.m_impulse.y;
        };
        PrismaticJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            // Compute the effective masses.
            var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            var d = Vec2.zero();
            d.addCombine(1, cB, 1, rB);
            d.subCombine(1, cA, 1, rA);
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            // Compute motor Jacobian and effective mass.
            {
                this.m_axis = Rot.mulVec2(qA, this.m_localXAxisA);
                this.m_a1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_axis);
                this.m_a2 = Vec2.crossVec2Vec2(rB, this.m_axis);
                this.m_motorMass = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2
                    * this.m_a2;
                if (this.m_motorMass > 0.0) {
                    this.m_motorMass = 1.0 / this.m_motorMass;
                }
            }
            // Prismatic constraint.
            {
                this.m_perp = Rot.mulVec2(qA, this.m_localYAxisA);
                this.m_s1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_perp);
                this.m_s2 = Vec2.crossVec2Vec2(rB, this.m_perp);
                Vec2.crossVec2Vec2(rA, this.m_perp);
                var k11 = mA + mB + iA * this.m_s1 * this.m_s1 + iB * this.m_s2 * this.m_s2;
                var k12 = iA * this.m_s1 + iB * this.m_s2;
                var k13 = iA * this.m_s1 * this.m_a1 + iB * this.m_s2 * this.m_a2;
                var k22 = iA + iB;
                if (k22 == 0.0) {
                    // For bodies with fixed rotation.
                    k22 = 1.0;
                }
                var k23 = iA * this.m_a1 + iB * this.m_a2;
                var k33 = mA + mB + iA * this.m_a1 * this.m_a1 + iB * this.m_a2 * this.m_a2;
                this.m_K.ex.set(k11, k12, k13);
                this.m_K.ey.set(k12, k22, k23);
                this.m_K.ez.set(k13, k23, k33);
            }
            // Compute motor and limit terms.
            if (this.m_enableLimit) {
                var jointTranslation = Vec2.dot(this.m_axis, d);
                if (math_abs$3(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * SettingsInternal.linearSlop) {
                    this.m_limitState = LimitState$1.equalLimits;
                }
                else if (jointTranslation <= this.m_lowerTranslation) {
                    if (this.m_limitState != LimitState$1.atLowerLimit) {
                        this.m_limitState = LimitState$1.atLowerLimit;
                        this.m_impulse.z = 0.0;
                    }
                }
                else if (jointTranslation >= this.m_upperTranslation) {
                    if (this.m_limitState != LimitState$1.atUpperLimit) {
                        this.m_limitState = LimitState$1.atUpperLimit;
                        this.m_impulse.z = 0.0;
                    }
                }
                else {
                    this.m_limitState = LimitState$1.inactiveLimit;
                    this.m_impulse.z = 0.0;
                }
            }
            else {
                this.m_limitState = LimitState$1.inactiveLimit;
                this.m_impulse.z = 0.0;
            }
            if (this.m_enableMotor == false) {
                this.m_motorImpulse = 0.0;
            }
            if (step.warmStarting) {
                // Account for variable time step.
                this.m_impulse.mul(step.dtRatio);
                this.m_motorImpulse *= step.dtRatio;
                var P = Vec2.combine(this.m_impulse.x, this.m_perp, this.m_motorImpulse
                    + this.m_impulse.z, this.m_axis);
                var LA = this.m_impulse.x * this.m_s1 + this.m_impulse.y
                    + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
                var LB = this.m_impulse.x * this.m_s2 + this.m_impulse.y
                    + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
                vA.subMul(mA, P);
                wA -= iA * LA;
                vB.addMul(mB, P);
                wB += iB * LB;
            }
            else {
                this.m_impulse.setZero();
                this.m_motorImpulse = 0.0;
            }
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
        };
        PrismaticJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            // Solve linear motor constraint.
            if (this.m_enableMotor && this.m_limitState != LimitState$1.equalLimits) {
                var Cdot = Vec2.dot(this.m_axis, Vec2.sub(vB, vA)) + this.m_a2 * wB
                    - this.m_a1 * wA;
                var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
                var oldImpulse = this.m_motorImpulse;
                var maxImpulse = step.dt * this.m_maxMotorForce;
                this.m_motorImpulse = clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
                impulse = this.m_motorImpulse - oldImpulse;
                var P = Vec2.mulNumVec2(impulse, this.m_axis);
                var LA = impulse * this.m_a1;
                var LB = impulse * this.m_a2;
                vA.subMul(mA, P);
                wA -= iA * LA;
                vB.addMul(mB, P);
                wB += iB * LB;
            }
            var Cdot1 = Vec2.zero();
            Cdot1.x += Vec2.dot(this.m_perp, vB) + this.m_s2 * wB;
            Cdot1.x -= Vec2.dot(this.m_perp, vA) + this.m_s1 * wA;
            Cdot1.y = wB - wA;
            if (this.m_enableLimit && this.m_limitState != LimitState$1.inactiveLimit) {
                // Solve prismatic and limit constraint in block form.
                var Cdot2 = 0;
                Cdot2 += Vec2.dot(this.m_axis, vB) + this.m_a2 * wB;
                Cdot2 -= Vec2.dot(this.m_axis, vA) + this.m_a1 * wA;
                var Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);
                var f1 = Vec3.clone(this.m_impulse);
                var df = this.m_K.solve33(Vec3.neg(Cdot));
                this.m_impulse.add(df);
                if (this.m_limitState == LimitState$1.atLowerLimit) {
                    this.m_impulse.z = math_max(this.m_impulse.z, 0.0);
                }
                else if (this.m_limitState == LimitState$1.atUpperLimit) {
                    this.m_impulse.z = math_min$2(this.m_impulse.z, 0.0);
                }
                // f2(1:2) = invK(1:2,1:2) * (-Cdot(1:2) - K(1:2,3) * (f2(3) - f1(3))) +
                // f1(1:2)
                var b = Vec2.combine(-1, Cdot1, -(this.m_impulse.z - f1.z), Vec2.neo(this.m_K.ez.x, this.m_K.ez.y));
                var f2r = Vec2.add(this.m_K.solve22(b), Vec2.neo(f1.x, f1.y));
                this.m_impulse.x = f2r.x;
                this.m_impulse.y = f2r.y;
                df = Vec3.sub(this.m_impulse, f1);
                var P = Vec2.combine(df.x, this.m_perp, df.z, this.m_axis);
                var LA = df.x * this.m_s1 + df.y + df.z * this.m_a1;
                var LB = df.x * this.m_s2 + df.y + df.z * this.m_a2;
                vA.subMul(mA, P);
                wA -= iA * LA;
                vB.addMul(mB, P);
                wB += iB * LB;
            }
            else {
                // Limit is inactive, just solve the prismatic constraint in block form.
                var df = this.m_K.solve22(Vec2.neg(Cdot1));
                this.m_impulse.x += df.x;
                this.m_impulse.y += df.y;
                var P = Vec2.mulNumVec2(df.x, this.m_perp);
                var LA = df.x * this.m_s1 + df.y;
                var LB = df.x * this.m_s2 + df.y;
                vA.subMul(mA, P);
                wA -= iA * LA;
                vB.addMul(mB, P);
                wB += iB * LB;
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        PrismaticJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            // Compute fresh Jacobians
            var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            var d = Vec2.sub(Vec2.add(cB, rB), Vec2.add(cA, rA));
            var axis = Rot.mulVec2(qA, this.m_localXAxisA);
            var a1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), axis);
            var a2 = Vec2.crossVec2Vec2(rB, axis);
            var perp = Rot.mulVec2(qA, this.m_localYAxisA);
            var s1 = Vec2.crossVec2Vec2(Vec2.add(d, rA), perp);
            var s2 = Vec2.crossVec2Vec2(rB, perp);
            var impulse = new Vec3();
            var C1 = Vec2.zero();
            C1.x = Vec2.dot(perp, d);
            C1.y = aB - aA - this.m_referenceAngle;
            var linearError = math_abs$3(C1.x);
            var angularError = math_abs$3(C1.y);
            var linearSlop = SettingsInternal.linearSlop;
            var maxLinearCorrection = SettingsInternal.maxLinearCorrection;
            var active = false; // bool
            var C2 = 0.0;
            if (this.m_enableLimit) {
                var translation = Vec2.dot(axis, d);
                if (math_abs$3(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * linearSlop) {
                    // Prevent large angular corrections
                    C2 = clamp(translation, -maxLinearCorrection, maxLinearCorrection);
                    linearError = math_max(linearError, math_abs$3(translation));
                    active = true;
                }
                else if (translation <= this.m_lowerTranslation) {
                    // Prevent large linear corrections and allow some slop.
                    C2 = clamp(translation - this.m_lowerTranslation + linearSlop, -maxLinearCorrection, 0.0);
                    linearError = Math
                        .max(linearError, this.m_lowerTranslation - translation);
                    active = true;
                }
                else if (translation >= this.m_upperTranslation) {
                    // Prevent large linear corrections and allow some slop.
                    C2 = clamp(translation - this.m_upperTranslation - linearSlop, 0.0, maxLinearCorrection);
                    linearError = Math
                        .max(linearError, translation - this.m_upperTranslation);
                    active = true;
                }
            }
            if (active) {
                var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
                var k12 = iA * s1 + iB * s2;
                var k13 = iA * s1 * a1 + iB * s2 * a2;
                var k22 = iA + iB;
                if (k22 == 0.0) {
                    // For fixed rotation
                    k22 = 1.0;
                }
                var k23 = iA * a1 + iB * a2;
                var k33 = mA + mB + iA * a1 * a1 + iB * a2 * a2;
                var K = new Mat33();
                K.ex.set(k11, k12, k13);
                K.ey.set(k12, k22, k23);
                K.ez.set(k13, k23, k33);
                var C = new Vec3();
                C.x = C1.x;
                C.y = C1.y;
                C.z = C2;
                impulse = K.solve33(Vec3.neg(C));
            }
            else {
                var k11 = mA + mB + iA * s1 * s1 + iB * s2 * s2;
                var k12 = iA * s1 + iB * s2;
                var k22 = iA + iB;
                if (k22 == 0.0) {
                    k22 = 1.0;
                }
                var K = new Mat22();
                K.ex.setNum(k11, k12);
                K.ey.setNum(k12, k22);
                var impulse1 = K.solve(Vec2.neg(C1));
                impulse.x = impulse1.x;
                impulse.y = impulse1.y;
                impulse.z = 0.0;
            }
            var P = Vec2.combine(impulse.x, perp, impulse.z, axis);
            var LA = impulse.x * s1 + impulse.y + impulse.z * a1;
            var LB = impulse.x * s2 + impulse.y + impulse.z * a2;
            cA.subMul(mA, P);
            aA -= iA * LA;
            cB.addMul(mB, P);
            aB += iB * LB;
            this.m_bodyA.c_position.c = cA;
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c = cB;
            this.m_bodyB.c_position.a = aB;
            return linearError <= SettingsInternal.linearSlop
                && angularError <= SettingsInternal.angularSlop;
        };
        PrismaticJoint.TYPE = 'prismatic-joint';
        return PrismaticJoint;
    }(Joint));

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var DEFAULTS$6 = {
        ratio: 1.0
    };
    /**
     * A gear joint is used to connect two joints together. Either joint can be a
     * revolute or prismatic joint. You specify a gear ratio to bind the motions
     * together: coordinate1 + ratio * coordinate2 = constant
     *
     * The ratio can be negative or positive. If one joint is a revolute joint and
     * the other joint is a prismatic joint, then the ratio will have units of
     * length or units of 1/length. Warning: You have to manually destroy the gear
     * joint if joint1 or joint2 is destroyed.
     *
     * This definition requires two existing revolute or prismatic joints (any
     * combination will work).
     */
    var GearJoint = /** @class */ (function (_super) {
        __extends(GearJoint, _super);
        function GearJoint(def, bodyA, bodyB, joint1, joint2, ratio) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof GearJoint)) {
                return new GearJoint(def, bodyA, bodyB, joint1, joint2, ratio);
            }
            def = options(def, DEFAULTS$6);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = GearJoint.TYPE;
            _this.m_joint1 = joint1 ? joint1 : def.joint1;
            _this.m_joint2 = joint2 ? joint2 : def.joint2;
            _this.m_ratio = Number.isFinite(ratio) ? ratio : def.ratio;
            _this.m_type1 = _this.m_joint1.getType();
            _this.m_type2 = _this.m_joint2.getType();
            // joint1 connects body A to body C
            // joint2 connects body B to body D
            var coordinateA;
            var coordinateB;
            // TODO_ERIN there might be some problem with the joint edges in Joint.
            _this.m_bodyC = _this.m_joint1.getBodyA();
            _this.m_bodyA = _this.m_joint1.getBodyB();
            // Get geometry of joint1
            var xfA = _this.m_bodyA.m_xf;
            var aA = _this.m_bodyA.m_sweep.a;
            var xfC = _this.m_bodyC.m_xf;
            var aC = _this.m_bodyC.m_sweep.a;
            if (_this.m_type1 === RevoluteJoint.TYPE) {
                var revolute = _this.m_joint1;
                _this.m_localAnchorC = revolute.m_localAnchorA;
                _this.m_localAnchorA = revolute.m_localAnchorB;
                _this.m_referenceAngleA = revolute.m_referenceAngle;
                _this.m_localAxisC = Vec2.zero();
                coordinateA = aA - aC - _this.m_referenceAngleA;
            }
            else {
                var prismatic = _this.m_joint1;
                _this.m_localAnchorC = prismatic.m_localAnchorA;
                _this.m_localAnchorA = prismatic.m_localAnchorB;
                _this.m_referenceAngleA = prismatic.m_referenceAngle;
                _this.m_localAxisC = prismatic.m_localXAxisA;
                var pC = _this.m_localAnchorC;
                var pA = Rot.mulTVec2(xfC.q, Vec2.add(Rot.mulVec2(xfA.q, _this.m_localAnchorA), Vec2.sub(xfA.p, xfC.p)));
                coordinateA = Vec2.dot(pA, _this.m_localAxisC) - Vec2.dot(pC, _this.m_localAxisC);
            }
            _this.m_bodyD = _this.m_joint2.getBodyA();
            _this.m_bodyB = _this.m_joint2.getBodyB();
            // Get geometry of joint2
            var xfB = _this.m_bodyB.m_xf;
            var aB = _this.m_bodyB.m_sweep.a;
            var xfD = _this.m_bodyD.m_xf;
            var aD = _this.m_bodyD.m_sweep.a;
            if (_this.m_type2 === RevoluteJoint.TYPE) {
                var revolute = _this.m_joint2;
                _this.m_localAnchorD = revolute.m_localAnchorA;
                _this.m_localAnchorB = revolute.m_localAnchorB;
                _this.m_referenceAngleB = revolute.m_referenceAngle;
                _this.m_localAxisD = Vec2.zero();
                coordinateB = aB - aD - _this.m_referenceAngleB;
            }
            else {
                var prismatic = _this.m_joint2;
                _this.m_localAnchorD = prismatic.m_localAnchorA;
                _this.m_localAnchorB = prismatic.m_localAnchorB;
                _this.m_referenceAngleB = prismatic.m_referenceAngle;
                _this.m_localAxisD = prismatic.m_localXAxisA;
                var pD = _this.m_localAnchorD;
                var pB = Rot.mulTVec2(xfD.q, Vec2.add(Rot.mulVec2(xfB.q, _this.m_localAnchorB), Vec2.sub(xfB.p, xfD.p)));
                coordinateB = Vec2.dot(pB, _this.m_localAxisD) - Vec2.dot(pD, _this.m_localAxisD);
            }
            _this.m_constant = coordinateA + _this.m_ratio * coordinateB;
            _this.m_impulse = 0.0;
            return _this;
            // Gear Joint:
            // C0 = (coordinate1 + ratio * coordinate2)_initial
            // C = (coordinate1 + ratio * coordinate2) - C0 = 0
            // J = [J1 ratio * J2]
            // K = J * invM * JT
            // = J1 * invM1 * J1T + ratio * ratio * J2 * invM2 * J2T
            //
            // Revolute:
            // coordinate = rotation
            // Cdot = angularVelocity
            // J = [0 0 1]
            // K = J * invM * JT = invI
            //
            // Prismatic:
            // coordinate = dot(p - pg, ug)
            // Cdot = dot(v + cross(w, r), ug)
            // J = [ug cross(r, ug)]
            // K = J * invM * JT = invMass + invI * cross(r, ug)^2
        }
        /** @internal */
        GearJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                joint1: this.m_joint1,
                joint2: this.m_joint2,
                ratio: this.m_ratio,
                // _constant: this.m_constant,
            };
        };
        /** @internal */
        GearJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            data.joint1 = restore(Joint, data.joint1, world);
            data.joint2 = restore(Joint, data.joint2, world);
            var joint = new GearJoint(data);
            // if (data._constant) joint.m_constant = data._constant;
            return joint;
        };
        /**
         * Get the first joint.
         */
        GearJoint.prototype.getJoint1 = function () {
            return this.m_joint1;
        };
        /**
         * Get the second joint.
         */
        GearJoint.prototype.getJoint2 = function () {
            return this.m_joint2;
        };
        /**
         * Set the gear ratio.
         */
        GearJoint.prototype.setRatio = function (ratio) {
            this.m_ratio = ratio;
        };
        /**
         * Get the gear ratio.
         */
        GearJoint.prototype.getRatio = function () {
            return this.m_ratio;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        GearJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        GearJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        GearJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(this.m_impulse, this.m_JvAC).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        GearJoint.prototype.getReactionTorque = function (inv_dt) {
            var L = this.m_impulse * this.m_JwA;
            return inv_dt * L;
        };
        GearJoint.prototype.initVelocityConstraints = function (step) {
            this.m_lcA = this.m_bodyA.m_sweep.localCenter;
            this.m_lcB = this.m_bodyB.m_sweep.localCenter;
            this.m_lcC = this.m_bodyC.m_sweep.localCenter;
            this.m_lcD = this.m_bodyD.m_sweep.localCenter;
            this.m_mA = this.m_bodyA.m_invMass;
            this.m_mB = this.m_bodyB.m_invMass;
            this.m_mC = this.m_bodyC.m_invMass;
            this.m_mD = this.m_bodyD.m_invMass;
            this.m_iA = this.m_bodyA.m_invI;
            this.m_iB = this.m_bodyB.m_invI;
            this.m_iC = this.m_bodyC.m_invI;
            this.m_iD = this.m_bodyD.m_invI;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var aC = this.m_bodyC.c_position.a;
            var vC = this.m_bodyC.c_velocity.v;
            var wC = this.m_bodyC.c_velocity.w;
            var aD = this.m_bodyD.c_position.a;
            var vD = this.m_bodyD.c_velocity.v;
            var wD = this.m_bodyD.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var qC = Rot.neo(aC);
            var qD = Rot.neo(aD);
            this.m_mass = 0.0;
            if (this.m_type1 == RevoluteJoint.TYPE) {
                this.m_JvAC = Vec2.zero();
                this.m_JwA = 1.0;
                this.m_JwC = 1.0;
                this.m_mass += this.m_iA + this.m_iC;
            }
            else {
                var u = Rot.mulVec2(qC, this.m_localAxisC);
                var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC);
                var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA);
                this.m_JvAC = u;
                this.m_JwC = Vec2.crossVec2Vec2(rC, u);
                this.m_JwA = Vec2.crossVec2Vec2(rA, u);
                this.m_mass += this.m_mC + this.m_mA + this.m_iC * this.m_JwC * this.m_JwC + this.m_iA * this.m_JwA * this.m_JwA;
            }
            if (this.m_type2 == RevoluteJoint.TYPE) {
                this.m_JvBD = Vec2.zero();
                this.m_JwB = this.m_ratio;
                this.m_JwD = this.m_ratio;
                this.m_mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
            }
            else {
                var u = Rot.mulVec2(qD, this.m_localAxisD);
                var rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
                var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
                this.m_JvBD = Vec2.mulNumVec2(this.m_ratio, u);
                this.m_JwD = this.m_ratio * Vec2.crossVec2Vec2(rD, u);
                this.m_JwB = this.m_ratio * Vec2.crossVec2Vec2(rB, u);
                this.m_mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * this.m_JwD * this.m_JwD + this.m_iB * this.m_JwB * this.m_JwB;
            }
            // Compute effective mass.
            this.m_mass = this.m_mass > 0.0 ? 1.0 / this.m_mass : 0.0;
            if (step.warmStarting) {
                vA.addMul(this.m_mA * this.m_impulse, this.m_JvAC);
                wA += this.m_iA * this.m_impulse * this.m_JwA;
                vB.addMul(this.m_mB * this.m_impulse, this.m_JvBD);
                wB += this.m_iB * this.m_impulse * this.m_JwB;
                vC.subMul(this.m_mC * this.m_impulse, this.m_JvAC);
                wC -= this.m_iC * this.m_impulse * this.m_JwC;
                vD.subMul(this.m_mD * this.m_impulse, this.m_JvBD);
                wD -= this.m_iD * this.m_impulse * this.m_JwD;
            }
            else {
                this.m_impulse = 0.0;
            }
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
            this.m_bodyC.c_velocity.v.setVec2(vC);
            this.m_bodyC.c_velocity.w = wC;
            this.m_bodyD.c_velocity.v.setVec2(vD);
            this.m_bodyD.c_velocity.w = wD;
        };
        GearJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var vC = this.m_bodyC.c_velocity.v;
            var wC = this.m_bodyC.c_velocity.w;
            var vD = this.m_bodyD.c_velocity.v;
            var wD = this.m_bodyD.c_velocity.w;
            var Cdot = Vec2.dot(this.m_JvAC, vA) - Vec2.dot(this.m_JvAC, vC) + Vec2.dot(this.m_JvBD, vB) - Vec2.dot(this.m_JvBD, vD);
            Cdot += (this.m_JwA * wA - this.m_JwC * wC) + (this.m_JwB * wB - this.m_JwD * wD);
            var impulse = -this.m_mass * Cdot;
            this.m_impulse += impulse;
            vA.addMul(this.m_mA * impulse, this.m_JvAC);
            wA += this.m_iA * impulse * this.m_JwA;
            vB.addMul(this.m_mB * impulse, this.m_JvBD);
            wB += this.m_iB * impulse * this.m_JwB;
            vC.subMul(this.m_mC * impulse, this.m_JvAC);
            wC -= this.m_iC * impulse * this.m_JwC;
            vD.subMul(this.m_mD * impulse, this.m_JvBD);
            wD -= this.m_iD * impulse * this.m_JwD;
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
            this.m_bodyC.c_velocity.v.setVec2(vC);
            this.m_bodyC.c_velocity.w = wC;
            this.m_bodyD.c_velocity.v.setVec2(vD);
            this.m_bodyD.c_velocity.w = wD;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        GearJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var cC = this.m_bodyC.c_position.c;
            var aC = this.m_bodyC.c_position.a;
            var cD = this.m_bodyD.c_position.c;
            var aD = this.m_bodyD.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var qC = Rot.neo(aC);
            var qD = Rot.neo(aD);
            var linearError = 0.0;
            var coordinateA;
            var coordinateB;
            var JvAC;
            var JvBD;
            var JwA;
            var JwB;
            var JwC;
            var JwD;
            var mass = 0.0;
            if (this.m_type1 == RevoluteJoint.TYPE) {
                JvAC = Vec2.zero();
                JwA = 1.0;
                JwC = 1.0;
                mass += this.m_iA + this.m_iC;
                coordinateA = aA - aC - this.m_referenceAngleA;
            }
            else {
                var u = Rot.mulVec2(qC, this.m_localAxisC);
                var rC = Rot.mulSub(qC, this.m_localAnchorC, this.m_lcC);
                var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_lcA);
                JvAC = u;
                JwC = Vec2.crossVec2Vec2(rC, u);
                JwA = Vec2.crossVec2Vec2(rA, u);
                mass += this.m_mC + this.m_mA + this.m_iC * JwC * JwC + this.m_iA * JwA * JwA;
                var pC = Vec2.sub(this.m_localAnchorC, this.m_lcC);
                var pA = Rot.mulTVec2(qC, Vec2.add(rA, Vec2.sub(cA, cC)));
                coordinateA = Vec2.dot(Vec2.sub(pA, pC), this.m_localAxisC);
            }
            if (this.m_type2 == RevoluteJoint.TYPE) {
                JvBD = Vec2.zero();
                JwB = this.m_ratio;
                JwD = this.m_ratio;
                mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
                coordinateB = aB - aD - this.m_referenceAngleB;
            }
            else {
                var u = Rot.mulVec2(qD, this.m_localAxisD);
                var rD = Rot.mulSub(qD, this.m_localAnchorD, this.m_lcD);
                var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_lcB);
                JvBD = Vec2.mulNumVec2(this.m_ratio, u);
                JwD = this.m_ratio * Vec2.crossVec2Vec2(rD, u);
                JwB = this.m_ratio * Vec2.crossVec2Vec2(rB, u);
                mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * JwD * JwD + this.m_iB * JwB * JwB;
                var pD = Vec2.sub(this.m_localAnchorD, this.m_lcD);
                var pB = Rot.mulTVec2(qD, Vec2.add(rB, Vec2.sub(cB, cD)));
                coordinateB = Vec2.dot(pB, this.m_localAxisD) - Vec2.dot(pD, this.m_localAxisD);
            }
            var C = (coordinateA + this.m_ratio * coordinateB) - this.m_constant;
            var impulse = 0.0;
            if (mass > 0.0) {
                impulse = -C / mass;
            }
            cA.addMul(this.m_mA * impulse, JvAC);
            aA += this.m_iA * impulse * JwA;
            cB.addMul(this.m_mB * impulse, JvBD);
            aB += this.m_iB * impulse * JwB;
            cC.subMul(this.m_mC * impulse, JvAC);
            aC -= this.m_iC * impulse * JwC;
            cD.subMul(this.m_mD * impulse, JvBD);
            aD -= this.m_iD * impulse * JwD;
            this.m_bodyA.c_position.c.setVec2(cA);
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c.setVec2(cB);
            this.m_bodyB.c_position.a = aB;
            this.m_bodyC.c_position.c.setVec2(cC);
            this.m_bodyC.c_position.a = aC;
            this.m_bodyD.c_position.c.setVec2(cD);
            this.m_bodyD.c_position.a = aD;
            // TODO_ERIN not implemented
            return linearError < SettingsInternal.linearSlop;
        };
        GearJoint.TYPE = 'gear-joint';
        return GearJoint;
    }(Joint));

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var DEFAULTS$5 = {
        maxForce: 1.0,
        maxTorque: 1.0,
        correctionFactor: 0.3
    };
    /**
     * A motor joint is used to control the relative motion between two bodies. A
     * typical usage is to control the movement of a dynamic body with respect to
     * the ground.
     */
    var MotorJoint = /** @class */ (function (_super) {
        __extends(MotorJoint, _super);
        function MotorJoint(def, bodyA, bodyB) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof MotorJoint)) {
                return new MotorJoint(def, bodyA, bodyB);
            }
            def = options(def, DEFAULTS$5);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = MotorJoint.TYPE;
            _this.m_linearOffset = Number.isFinite(def.linearOffset) ? Vec2.clone(def.linearOffset) : bodyA.getLocalPoint(bodyB.getPosition());
            _this.m_angularOffset = Number.isFinite(def.angularOffset) ? def.angularOffset : bodyB.getAngle() - bodyA.getAngle();
            _this.m_linearImpulse = Vec2.zero();
            _this.m_angularImpulse = 0.0;
            _this.m_maxForce = def.maxForce;
            _this.m_maxTorque = def.maxTorque;
            _this.m_correctionFactor = def.correctionFactor;
            return _this;
            // Point-to-point constraint
            // Cdot = v2 - v1
            // = v2 + cross(w2, r2) - v1 - cross(w1, r1)
            // J = [-I -r1_skew I r2_skew ]
            // Identity used:
            // w k % (rx i + ry j) = w * (-ry i + rx j)
            //
            // r1 = offset - c1
            // r2 = -c2
            // Angle constraint
            // Cdot = w2 - w1
            // J = [0 0 -1 0 0 1]
            // K = invI1 + invI2
        }
        /** @internal */
        MotorJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                maxForce: this.m_maxForce,
                maxTorque: this.m_maxTorque,
                correctionFactor: this.m_correctionFactor,
                linearOffset: this.m_linearOffset,
                angularOffset: this.m_angularOffset,
            };
        };
        /** @internal */
        MotorJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new MotorJoint(data);
            return joint;
        };
        /** @internal */
        MotorJoint.prototype._setAnchors = function (def) {
        };
        /**
         * Set the maximum friction force in N.
         */
        MotorJoint.prototype.setMaxForce = function (force) {
            this.m_maxForce = force;
        };
        /**
         * Get the maximum friction force in N.
         */
        MotorJoint.prototype.getMaxForce = function () {
            return this.m_maxForce;
        };
        /**
         * Set the maximum friction torque in N*m.
         */
        MotorJoint.prototype.setMaxTorque = function (torque) {
            this.m_maxTorque = torque;
        };
        /**
         * Get the maximum friction torque in N*m.
         */
        MotorJoint.prototype.getMaxTorque = function () {
            return this.m_maxTorque;
        };
        /**
         * Set the position correction factor in the range [0,1].
         */
        MotorJoint.prototype.setCorrectionFactor = function (factor) {
            this.m_correctionFactor = factor;
        };
        /**
         * Get the position correction factor in the range [0,1].
         */
        MotorJoint.prototype.getCorrectionFactor = function () {
            return this.m_correctionFactor;
        };
        /**
         * Set/get the target linear offset, in frame A, in meters.
         */
        MotorJoint.prototype.setLinearOffset = function (linearOffset) {
            if (linearOffset.x != this.m_linearOffset.x || linearOffset.y != this.m_linearOffset.y) {
                this.m_bodyA.setAwake(true);
                this.m_bodyB.setAwake(true);
                this.m_linearOffset.set(linearOffset);
            }
        };
        MotorJoint.prototype.getLinearOffset = function () {
            return this.m_linearOffset;
        };
        /**
         * Set/get the target angular offset, in radians.
         */
        MotorJoint.prototype.setAngularOffset = function (angularOffset) {
            if (angularOffset != this.m_angularOffset) {
                this.m_bodyA.setAwake(true);
                this.m_bodyB.setAwake(true);
                this.m_angularOffset = angularOffset;
            }
        };
        MotorJoint.prototype.getAngularOffset = function () {
            return this.m_angularOffset;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        MotorJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getPosition();
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        MotorJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getPosition();
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        MotorJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(inv_dt, this.m_linearImpulse);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        MotorJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * this.m_angularImpulse;
        };
        MotorJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            // Compute the effective mass matrix.
            this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_linearOffset, this.m_localCenterA));
            this.m_rB = Rot.mulVec2(qB, Vec2.neg(this.m_localCenterB));
            // J = [-I -r1_skew I r2_skew]
            // r_skew = [-ry; rx]
            // Matlab
            // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
            // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
            // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            // Upper 2 by 2 of K for point to point
            var K = new Mat22();
            K.ex.x = mA + mB + iA * this.m_rA.y * this.m_rA.y + iB * this.m_rB.y * this.m_rB.y;
            K.ex.y = -iA * this.m_rA.x * this.m_rA.y - iB * this.m_rB.x * this.m_rB.y;
            K.ey.x = K.ex.y;
            K.ey.y = mA + mB + iA * this.m_rA.x * this.m_rA.x + iB * this.m_rB.x * this.m_rB.x;
            this.m_linearMass = K.getInverse();
            this.m_angularMass = iA + iB;
            if (this.m_angularMass > 0.0) {
                this.m_angularMass = 1.0 / this.m_angularMass;
            }
            this.m_linearError = Vec2.zero();
            this.m_linearError.addCombine(1, cB, 1, this.m_rB);
            this.m_linearError.subCombine(1, cA, 1, this.m_rA);
            this.m_angularError = aB - aA - this.m_angularOffset;
            if (step.warmStarting) {
                // Scale impulses to support a variable time step.
                this.m_linearImpulse.mul(step.dtRatio);
                this.m_angularImpulse *= step.dtRatio;
                var P = Vec2.neo(this.m_linearImpulse.x, this.m_linearImpulse.y);
                vA.subMul(mA, P);
                wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + this.m_angularImpulse);
                vB.addMul(mB, P);
                wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + this.m_angularImpulse);
            }
            else {
                this.m_linearImpulse.setZero();
                this.m_angularImpulse = 0.0;
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        MotorJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var h = step.dt;
            var inv_h = step.inv_dt;
            // Solve angular friction
            {
                var Cdot = wB - wA + inv_h * this.m_correctionFactor * this.m_angularError;
                var impulse = -this.m_angularMass * Cdot;
                var oldImpulse = this.m_angularImpulse;
                var maxImpulse = h * this.m_maxTorque;
                this.m_angularImpulse = clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
                impulse = this.m_angularImpulse - oldImpulse;
                wA -= iA * impulse;
                wB += iB * impulse;
            }
            // Solve linear friction
            {
                var Cdot = Vec2.zero();
                Cdot.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
                Cdot.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
                Cdot.addMul(inv_h * this.m_correctionFactor, this.m_linearError);
                var impulse = Vec2.neg(Mat22.mulVec2(this.m_linearMass, Cdot));
                var oldImpulse = Vec2.clone(this.m_linearImpulse);
                this.m_linearImpulse.add(impulse);
                var maxImpulse = h * this.m_maxForce;
                this.m_linearImpulse.clamp(maxImpulse);
                impulse = Vec2.sub(this.m_linearImpulse, oldImpulse);
                vA.subMul(mA, impulse);
                wA -= iA * Vec2.crossVec2Vec2(this.m_rA, impulse);
                vB.addMul(mB, impulse);
                wB += iB * Vec2.crossVec2Vec2(this.m_rB, impulse);
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        MotorJoint.prototype.solvePositionConstraints = function (step) {
            return true;
        };
        MotorJoint.TYPE = 'motor-joint';
        return MotorJoint;
    }(Joint));

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_PI$2 = Math.PI;
    /** @internal */ var DEFAULTS$4 = {
        maxForce: 0.0,
        frequencyHz: 5.0,
        dampingRatio: 0.7
    };
    /**
     * A mouse joint is used to make a point on a body track a specified world
     * point. This a soft constraint with a maximum force. This allows the
     * constraint to stretch and without applying huge forces.
     *
     * You need to call setTarget(target) every time that mouse is
     * moved, to track the new location of the mouse.
     *
     * NOTE: this joint is not documented in the manual because it was developed to
     * be used in the testbed. If you want to learn how to use the mouse joint, look
     * at the testbed.
     */
    var MouseJoint = /** @class */ (function (_super) {
        __extends(MouseJoint, _super);
        function MouseJoint(def, bodyA, bodyB, target) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof MouseJoint)) {
                return new MouseJoint(def, bodyA, bodyB, target);
            }
            def = options(def, DEFAULTS$4);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = MouseJoint.TYPE;
            if (Vec2.isValid(target)) {
                _this.m_targetA = Vec2.clone(target);
            }
            else if (Vec2.isValid(def.target)) {
                _this.m_targetA = Vec2.clone(def.target);
            }
            else {
                _this.m_targetA = Vec2.zero();
            }
            _this.m_localAnchorB = Transform.mulTVec2(bodyB.getTransform(), _this.m_targetA);
            _this.m_maxForce = def.maxForce;
            _this.m_impulse = Vec2.zero();
            _this.m_frequencyHz = def.frequencyHz;
            _this.m_dampingRatio = def.dampingRatio;
            _this.m_beta = 0.0;
            _this.m_gamma = 0.0;
            // Solver temp
            _this.m_rB = Vec2.zero();
            _this.m_localCenterB = Vec2.zero();
            _this.m_invMassB = 0.0;
            _this.m_invIB = 0.0;
            _this.m_mass = new Mat22();
            _this.m_C = Vec2.zero();
            return _this;
            // p = attached point, m = mouse point
            // C = p - m
            // Cdot = v
            // = v + cross(w, r)
            // J = [I r_skew]
            // Identity used:
            // w k % (rx i + ry j) = w * (-ry i + rx j)
        }
        /** @internal */
        MouseJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                target: this.m_targetA,
                maxForce: this.m_maxForce,
                frequencyHz: this.m_frequencyHz,
                dampingRatio: this.m_dampingRatio,
                _localAnchorB: this.m_localAnchorB,
            };
        };
        /** @internal */
        MouseJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            data.target = Vec2.clone(data.target);
            var joint = new MouseJoint(data);
            if (data._localAnchorB) {
                joint.m_localAnchorB = data._localAnchorB;
            }
            return joint;
        };
        /**
         * Use this to update the target point.
         */
        MouseJoint.prototype.setTarget = function (target) {
            if (Vec2.areEqual(target, this.m_targetA))
                return;
            this.m_bodyB.setAwake(true);
            this.m_targetA.set(target);
        };
        MouseJoint.prototype.getTarget = function () {
            return this.m_targetA;
        };
        /**
         * Set the maximum force in Newtons.
         */
        MouseJoint.prototype.setMaxForce = function (force) {
            this.m_maxForce = force;
        };
        /**
         * Get the maximum force in Newtons.
         */
        MouseJoint.prototype.getMaxForce = function () {
            return this.m_maxForce;
        };
        /**
         * Set the frequency in Hertz.
         */
        MouseJoint.prototype.setFrequency = function (hz) {
            this.m_frequencyHz = hz;
        };
        /**
         * Get the frequency in Hertz.
         */
        MouseJoint.prototype.getFrequency = function () {
            return this.m_frequencyHz;
        };
        /**
         * Set the damping ratio (dimensionless).
         */
        MouseJoint.prototype.setDampingRatio = function (ratio) {
            this.m_dampingRatio = ratio;
        };
        /**
         * Get the damping ratio (dimensionless).
         */
        MouseJoint.prototype.getDampingRatio = function () {
            return this.m_dampingRatio;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        MouseJoint.prototype.getAnchorA = function () {
            return Vec2.clone(this.m_targetA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        MouseJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        MouseJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(inv_dt, this.m_impulse);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        MouseJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * 0.0;
        };
        /**
         * Shift the origin for any points stored in world coordinates.
         */
        MouseJoint.prototype.shiftOrigin = function (newOrigin) {
            this.m_targetA.sub(newOrigin);
        };
        MouseJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIB = this.m_bodyB.m_invI;
            var position = this.m_bodyB.c_position;
            var velocity = this.m_bodyB.c_velocity;
            var cB = position.c;
            var aB = position.a;
            var vB = velocity.v;
            var wB = velocity.w;
            var qB = Rot.neo(aB);
            var mass = this.m_bodyB.getMass();
            // Frequency
            var omega = 2.0 * math_PI$2 * this.m_frequencyHz;
            // Damping coefficient
            var d = 2.0 * mass * this.m_dampingRatio * omega;
            // Spring stiffness
            var k = mass * (omega * omega);
            // magic formulas
            // gamma has units of inverse mass.
            // beta has units of inverse time.
            var h = step.dt;
            this.m_gamma = h * (d + h * k);
            if (this.m_gamma != 0.0) {
                this.m_gamma = 1.0 / this.m_gamma;
            }
            this.m_beta = h * k * this.m_gamma;
            // Compute the effective mass matrix.
            this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            // K = [(1/m1 + 1/m2) * eye(2) - skew(r1) * invI1 * skew(r1) - skew(r2) *
            // invI2 * skew(r2)]
            // = [1/m1+1/m2 0 ] + invI1 * [r1.y*r1.y -r1.x*r1.y] + invI2 * [r1.y*r1.y
            // -r1.x*r1.y]
            // [ 0 1/m1+1/m2] [-r1.x*r1.y r1.x*r1.x] [-r1.x*r1.y r1.x*r1.x]
            var K = new Mat22();
            K.ex.x = this.m_invMassB + this.m_invIB * this.m_rB.y * this.m_rB.y
                + this.m_gamma;
            K.ex.y = -this.m_invIB * this.m_rB.x * this.m_rB.y;
            K.ey.x = K.ex.y;
            K.ey.y = this.m_invMassB + this.m_invIB * this.m_rB.x * this.m_rB.x
                + this.m_gamma;
            this.m_mass = K.getInverse();
            this.m_C.setVec2(cB);
            this.m_C.addCombine(1, this.m_rB, -1, this.m_targetA);
            this.m_C.mul(this.m_beta);
            // Cheat with some damping
            wB *= 0.98;
            if (step.warmStarting) {
                this.m_impulse.mul(step.dtRatio);
                vB.addMul(this.m_invMassB, this.m_impulse);
                wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, this.m_impulse);
            }
            else {
                this.m_impulse.setZero();
            }
            velocity.v.setVec2(vB);
            velocity.w = wB;
        };
        MouseJoint.prototype.solveVelocityConstraints = function (step) {
            var velocity = this.m_bodyB.c_velocity;
            var vB = Vec2.clone(velocity.v);
            var wB = velocity.w;
            // Cdot = v + cross(w, r)
            var Cdot = Vec2.crossNumVec2(wB, this.m_rB);
            Cdot.add(vB);
            Cdot.addCombine(1, this.m_C, this.m_gamma, this.m_impulse);
            Cdot.neg();
            var impulse = Mat22.mulVec2(this.m_mass, Cdot);
            var oldImpulse = Vec2.clone(this.m_impulse);
            this.m_impulse.add(impulse);
            var maxImpulse = step.dt * this.m_maxForce;
            this.m_impulse.clamp(maxImpulse);
            impulse = Vec2.sub(this.m_impulse, oldImpulse);
            vB.addMul(this.m_invMassB, impulse);
            wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, impulse);
            velocity.v.setVec2(vB);
            velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        MouseJoint.prototype.solvePositionConstraints = function (step) {
            return true;
        };
        MouseJoint.TYPE = 'mouse-joint';
        return MouseJoint;
    }(Joint));

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_abs$2 = Math.abs;
    /** @internal */ var DEFAULTS$3 = {
        collideConnected: true
    };
    /**
     * The pulley joint is connected to two bodies and two fixed ground points. The
     * pulley supports a ratio such that: length1 + ratio * length2 <= constant
     *
     * Yes, the force transmitted is scaled by the ratio.
     *
     * Warning: the pulley joint can get a bit squirrelly by itself. They often work
     * better when combined with prismatic joints. You should also cover the the
     * anchor points with static shapes to prevent one side from going to zero
     * length.
     */
    var PulleyJoint = /** @class */ (function (_super) {
        __extends(PulleyJoint, _super);
        function PulleyJoint(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof PulleyJoint)) {
                return new PulleyJoint(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio);
            }
            def = options(def, DEFAULTS$3);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = PulleyJoint.TYPE;
            _this.m_groundAnchorA = Vec2.clone(groundA ? groundA : def.groundAnchorA || Vec2.neo(-1.0, 1.0));
            _this.m_groundAnchorB = Vec2.clone(groundB ? groundB : def.groundAnchorB || Vec2.neo(1.0, 1.0));
            _this.m_localAnchorA = Vec2.clone(anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.neo(-1.0, 0.0));
            _this.m_localAnchorB = Vec2.clone(anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.neo(1.0, 0.0));
            _this.m_lengthA = Number.isFinite(def.lengthA) ? def.lengthA : Vec2.distance(anchorA, groundA);
            _this.m_lengthB = Number.isFinite(def.lengthB) ? def.lengthB : Vec2.distance(anchorB, groundB);
            _this.m_ratio = Number.isFinite(ratio) ? ratio : def.ratio;
            _this.m_constant = _this.m_lengthA + _this.m_ratio * _this.m_lengthB;
            _this.m_impulse = 0.0;
            return _this;
            // Pulley:
            // length1 = norm(p1 - s1)
            // length2 = norm(p2 - s2)
            // C0 = (length1 + ratio * length2)_initial
            // C = C0 - (length1 + ratio * length2)
            // u1 = (p1 - s1) / norm(p1 - s1)
            // u2 = (p2 - s2) / norm(p2 - s2)
            // Cdot = -dot(u1, v1 + cross(w1, r1)) - ratio * dot(u2, v2 + cross(w2, r2))
            // J = -[u1 cross(r1, u1) ratio * u2 ratio * cross(r2, u2)]
            // K = J * invM * JT
            // = invMass1 + invI1 * cross(r1, u1)^2 + ratio^2 * (invMass2 + invI2 *
            // cross(r2, u2)^2)
        }
        PulleyJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                groundAnchorA: this.m_groundAnchorA,
                groundAnchorB: this.m_groundAnchorB,
                localAnchorA: this.m_localAnchorA,
                localAnchorB: this.m_localAnchorB,
                lengthA: this.m_lengthA,
                lengthB: this.m_lengthB,
                ratio: this.m_ratio,
            };
        };
        /** @internal */
        PulleyJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new PulleyJoint(data);
            return joint;
        };
        /**
         * Get the first ground anchor.
         */
        PulleyJoint.prototype.getGroundAnchorA = function () {
            return this.m_groundAnchorA;
        };
        /**
         * Get the second ground anchor.
         */
        PulleyJoint.prototype.getGroundAnchorB = function () {
            return this.m_groundAnchorB;
        };
        /**
         * Get the current length of the segment attached to bodyA.
         */
        PulleyJoint.prototype.getLengthA = function () {
            return this.m_lengthA;
        };
        /**
         * Get the current length of the segment attached to bodyB.
         */
        PulleyJoint.prototype.getLengthB = function () {
            return this.m_lengthB;
        };
        /**
         * Get the pulley ratio.
         */
        PulleyJoint.prototype.getRatio = function () {
            return this.m_ratio;
        };
        /**
         * Get the current length of the segment attached to bodyA.
         */
        PulleyJoint.prototype.getCurrentLengthA = function () {
            var p = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
            var s = this.m_groundAnchorA;
            return Vec2.distance(p, s);
        };
        /**
         * Get the current length of the segment attached to bodyB.
         */
        PulleyJoint.prototype.getCurrentLengthB = function () {
            var p = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
            var s = this.m_groundAnchorB;
            return Vec2.distance(p, s);
        };
        /**
         * Shift the origin for any points stored in world coordinates.
         *
         * @param newOrigin
         */
        PulleyJoint.prototype.shiftOrigin = function (newOrigin) {
            this.m_groundAnchorA.sub(newOrigin);
            this.m_groundAnchorB.sub(newOrigin);
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        PulleyJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        PulleyJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        PulleyJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(this.m_impulse, this.m_uB).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        PulleyJoint.prototype.getReactionTorque = function (inv_dt) {
            return 0.0;
        };
        PulleyJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            // Get the pulley axes.
            this.m_uA = Vec2.sub(Vec2.add(cA, this.m_rA), this.m_groundAnchorA);
            this.m_uB = Vec2.sub(Vec2.add(cB, this.m_rB), this.m_groundAnchorB);
            var lengthA = this.m_uA.length();
            var lengthB = this.m_uB.length();
            if (lengthA > 10.0 * SettingsInternal.linearSlop) {
                this.m_uA.mul(1.0 / lengthA);
            }
            else {
                this.m_uA.setZero();
            }
            if (lengthB > 10.0 * SettingsInternal.linearSlop) {
                this.m_uB.mul(1.0 / lengthB);
            }
            else {
                this.m_uB.setZero();
            }
            // Compute effective mass.
            var ruA = Vec2.crossVec2Vec2(this.m_rA, this.m_uA);
            var ruB = Vec2.crossVec2Vec2(this.m_rB, this.m_uB);
            var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
            var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
            this.m_mass = mA + this.m_ratio * this.m_ratio * mB;
            if (this.m_mass > 0.0) {
                this.m_mass = 1.0 / this.m_mass;
            }
            if (step.warmStarting) {
                // Scale impulses to support variable time steps.
                this.m_impulse *= step.dtRatio;
                // Warm starting.
                var PA = Vec2.mulNumVec2(-this.m_impulse, this.m_uA);
                var PB = Vec2.mulNumVec2(-this.m_ratio * this.m_impulse, this.m_uB);
                vA.addMul(this.m_invMassA, PA);
                wA += this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, PA);
                vB.addMul(this.m_invMassB, PB);
                wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, PB);
            }
            else {
                this.m_impulse = 0.0;
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        PulleyJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var vpA = Vec2.add(vA, Vec2.crossNumVec2(wA, this.m_rA));
            var vpB = Vec2.add(vB, Vec2.crossNumVec2(wB, this.m_rB));
            var Cdot = -Vec2.dot(this.m_uA, vpA) - this.m_ratio * Vec2.dot(this.m_uB, vpB);
            var impulse = -this.m_mass * Cdot;
            this.m_impulse += impulse;
            var PA = Vec2.mulNumVec2(-impulse, this.m_uA);
            var PB = Vec2.mulNumVec2(-this.m_ratio * impulse, this.m_uB);
            vA.addMul(this.m_invMassA, PA);
            wA += this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, PA);
            vB.addMul(this.m_invMassB, PB);
            wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, PB);
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        PulleyJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            // Get the pulley axes.
            var uA = Vec2.sub(Vec2.add(cA, this.m_rA), this.m_groundAnchorA);
            var uB = Vec2.sub(Vec2.add(cB, this.m_rB), this.m_groundAnchorB);
            var lengthA = uA.length();
            var lengthB = uB.length();
            if (lengthA > 10.0 * SettingsInternal.linearSlop) {
                uA.mul(1.0 / lengthA);
            }
            else {
                uA.setZero();
            }
            if (lengthB > 10.0 * SettingsInternal.linearSlop) {
                uB.mul(1.0 / lengthB);
            }
            else {
                uB.setZero();
            }
            // Compute effective mass.
            var ruA = Vec2.crossVec2Vec2(rA, uA);
            var ruB = Vec2.crossVec2Vec2(rB, uB);
            var mA = this.m_invMassA + this.m_invIA * ruA * ruA;
            var mB = this.m_invMassB + this.m_invIB * ruB * ruB;
            var mass = mA + this.m_ratio * this.m_ratio * mB;
            if (mass > 0.0) {
                mass = 1.0 / mass;
            }
            var C = this.m_constant - lengthA - this.m_ratio * lengthB;
            var linearError = math_abs$2(C);
            var impulse = -mass * C;
            var PA = Vec2.mulNumVec2(-impulse, uA);
            var PB = Vec2.mulNumVec2(-this.m_ratio * impulse, uB);
            cA.addMul(this.m_invMassA, PA);
            aA += this.m_invIA * Vec2.crossVec2Vec2(rA, PA);
            cB.addMul(this.m_invMassB, PB);
            aB += this.m_invIB * Vec2.crossVec2Vec2(rB, PB);
            this.m_bodyA.c_position.c = cA;
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c = cB;
            this.m_bodyB.c_position.a = aB;
            return linearError < SettingsInternal.linearSlop;
        };
        PulleyJoint.TYPE = 'pulley-joint';
        return PulleyJoint;
    }(Joint));

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_min$1 = Math.min;
    /** @internal */ var LimitState;
    (function (LimitState) {
        LimitState[LimitState["inactiveLimit"] = 0] = "inactiveLimit";
        LimitState[LimitState["atLowerLimit"] = 1] = "atLowerLimit";
        LimitState[LimitState["atUpperLimit"] = 2] = "atUpperLimit";
        LimitState[LimitState["equalLimits"] = 3] = "equalLimits";
    })(LimitState || (LimitState = {}));
    /** @internal */ var DEFAULTS$2 = {
        maxLength: 0.0,
    };
    /**
     * A rope joint enforces a maximum distance between two points on two bodies. It
     * has no other effect.
     *
     * Warning: if you attempt to change the maximum length during the simulation
     * you will get some non-physical behavior.
     *
     * A model that would allow you to dynamically modify the length would have some
     * sponginess, so I chose not to implement it that way. See {@link DistanceJoint} if you
     * want to dynamically control length.
     */
    var RopeJoint = /** @class */ (function (_super) {
        __extends(RopeJoint, _super);
        function RopeJoint(def, bodyA, bodyB, anchor) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof RopeJoint)) {
                return new RopeJoint(def, bodyA, bodyB, anchor);
            }
            def = options(def, DEFAULTS$2);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = RopeJoint.TYPE;
            _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.neo(-1.0, 0.0));
            _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.neo(1.0, 0.0));
            _this.m_maxLength = def.maxLength;
            _this.m_mass = 0.0;
            _this.m_impulse = 0.0;
            _this.m_length = 0.0;
            _this.m_state = LimitState.inactiveLimit;
            return _this;
            // Limit:
            // C = norm(pB - pA) - L
            // u = (pB - pA) / norm(pB - pA)
            // Cdot = dot(u, vB + cross(wB, rB) - vA - cross(wA, rA))
            // J = [-u -cross(rA, u) u cross(rB, u)]
            // K = J * invM * JT
            // = invMassA + invIA * cross(rA, u)^2 + invMassB + invIB * cross(rB, u)^2
        }
        /** @internal */
        RopeJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                localAnchorA: this.m_localAnchorA,
                localAnchorB: this.m_localAnchorB,
                maxLength: this.m_maxLength,
            };
        };
        /** @internal */
        RopeJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new RopeJoint(data);
            return joint;
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        RopeJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        RopeJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * Set the maximum length of the rope.
         */
        RopeJoint.prototype.setMaxLength = function (length) {
            this.m_maxLength = length;
        };
        /**
         * Get the maximum length of the rope.
         */
        RopeJoint.prototype.getMaxLength = function () {
            return this.m_maxLength;
        };
        RopeJoint.prototype.getLimitState = function () {
            // TODO LimitState
            return this.m_state;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        RopeJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        RopeJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        RopeJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.mulNumVec2(this.m_impulse, this.m_u).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        RopeJoint.prototype.getReactionTorque = function (inv_dt) {
            return 0.0;
        };
        RopeJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            this.m_rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
            this.m_rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
            this.m_u = Vec2.zero();
            this.m_u.addCombine(1, cB, 1, this.m_rB);
            this.m_u.subCombine(1, cA, 1, this.m_rA);
            this.m_length = this.m_u.length();
            var C = this.m_length - this.m_maxLength;
            if (C > 0.0) {
                this.m_state = LimitState.atUpperLimit;
            }
            else {
                this.m_state = LimitState.inactiveLimit;
            }
            if (this.m_length > SettingsInternal.linearSlop) {
                this.m_u.mul(1.0 / this.m_length);
            }
            else {
                this.m_u.setZero();
                this.m_mass = 0.0;
                this.m_impulse = 0.0;
                return;
            }
            // Compute effective mass.
            var crA = Vec2.crossVec2Vec2(this.m_rA, this.m_u);
            var crB = Vec2.crossVec2Vec2(this.m_rB, this.m_u);
            var invMass = this.m_invMassA + this.m_invIA * crA * crA + this.m_invMassB + this.m_invIB * crB * crB;
            this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
            if (step.warmStarting) {
                // Scale the impulse to support a variable time step.
                this.m_impulse *= step.dtRatio;
                var P = Vec2.mulNumVec2(this.m_impulse, this.m_u);
                vA.subMul(this.m_invMassA, P);
                wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P);
                vB.addMul(this.m_invMassB, P);
                wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P);
            }
            else {
                this.m_impulse = 0.0;
            }
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
        };
        RopeJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            // Cdot = dot(u, v + cross(w, r))
            var vpA = Vec2.addCrossNumVec2(vA, wA, this.m_rA);
            var vpB = Vec2.addCrossNumVec2(vB, wB, this.m_rB);
            var C = this.m_length - this.m_maxLength;
            var Cdot = Vec2.dot(this.m_u, Vec2.sub(vpB, vpA));
            // Predictive constraint.
            if (C < 0.0) {
                Cdot += step.inv_dt * C;
            }
            var impulse = -this.m_mass * Cdot;
            var oldImpulse = this.m_impulse;
            this.m_impulse = math_min$1(0.0, this.m_impulse + impulse);
            impulse = this.m_impulse - oldImpulse;
            var P = Vec2.mulNumVec2(impulse, this.m_u);
            vA.subMul(this.m_invMassA, P);
            wA -= this.m_invIA * Vec2.crossVec2Vec2(this.m_rA, P);
            vB.addMul(this.m_invMassB, P);
            wB += this.m_invIB * Vec2.crossVec2Vec2(this.m_rB, P);
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        RopeJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
            var rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
            var u = Vec2.zero();
            u.addCombine(1, cB, 1, rB);
            u.subCombine(1, cA, 1, rA);
            var length = u.normalize();
            var C = length - this.m_maxLength;
            C = clamp(C, 0.0, SettingsInternal.maxLinearCorrection);
            var impulse = -this.m_mass * C;
            var P = Vec2.mulNumVec2(impulse, u);
            cA.subMul(this.m_invMassA, P);
            aA -= this.m_invIA * Vec2.crossVec2Vec2(rA, P);
            cB.addMul(this.m_invMassB, P);
            aB += this.m_invIB * Vec2.crossVec2Vec2(rB, P);
            this.m_bodyA.c_position.c.setVec2(cA);
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c.setVec2(cB);
            this.m_bodyB.c_position.a = aB;
            return length - this.m_maxLength < SettingsInternal.linearSlop;
        };
        RopeJoint.TYPE = 'rope-joint';
        return RopeJoint;
    }(Joint));

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_abs$1 = Math.abs;
    /** @internal */ var math_PI$1 = Math.PI;
    /** @internal */ var DEFAULTS$1 = {
        frequencyHz: 0.0,
        dampingRatio: 0.0,
    };
    /**
     * A weld joint essentially glues two bodies together. A weld joint may distort
     * somewhat because the island constraint solver is approximate.
     */
    var WeldJoint = /** @class */ (function (_super) {
        __extends(WeldJoint, _super);
        function WeldJoint(def, bodyA, bodyB, anchor) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof WeldJoint)) {
                return new WeldJoint(def, bodyA, bodyB, anchor);
            }
            def = options(def, DEFAULTS$1);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_type = WeldJoint.TYPE;
            _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
            _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
            _this.m_referenceAngle = Number.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();
            _this.m_frequencyHz = def.frequencyHz;
            _this.m_dampingRatio = def.dampingRatio;
            _this.m_impulse = new Vec3();
            _this.m_bias = 0.0;
            _this.m_gamma = 0.0;
            // Solver temp
            _this.m_rA;
            _this.m_rB;
            _this.m_localCenterA;
            _this.m_localCenterB;
            _this.m_invMassA;
            _this.m_invMassB;
            _this.m_invIA;
            _this.m_invIB;
            _this.m_mass = new Mat33();
            return _this;
            // Point-to-point constraint
            // C = p2 - p1
            // Cdot = v2 - v1
            // / = v2 + cross(w2, r2) - v1 - cross(w1, r1)
            // J = [-I -r1_skew I r2_skew ]
            // Identity used:
            // w k % (rx i + ry j) = w * (-ry i + rx j)
            // Angle constraint
            // C = angle2 - angle1 - referenceAngle
            // Cdot = w2 - w1
            // J = [0 0 -1 0 0 1]
            // K = invI1 + invI2
        }
        /** @internal */
        WeldJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                frequencyHz: this.m_frequencyHz,
                dampingRatio: this.m_dampingRatio,
                localAnchorA: this.m_localAnchorA,
                localAnchorB: this.m_localAnchorB,
                referenceAngle: this.m_referenceAngle,
            };
        };
        /** @internal */
        WeldJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new WeldJoint(data);
            return joint;
        };
        /** @internal */
        WeldJoint.prototype._setAnchors = function (def) {
            if (def.anchorA) {
                this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
            }
            else if (def.localAnchorA) {
                this.m_localAnchorA.setVec2(def.localAnchorA);
            }
            if (def.anchorB) {
                this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
            }
            else if (def.localAnchorB) {
                this.m_localAnchorB.setVec2(def.localAnchorB);
            }
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        WeldJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        WeldJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * Get the reference angle.
         */
        WeldJoint.prototype.getReferenceAngle = function () {
            return this.m_referenceAngle;
        };
        /**
         * Set frequency in Hz.
         */
        WeldJoint.prototype.setFrequency = function (hz) {
            this.m_frequencyHz = hz;
        };
        /**
         * Get frequency in Hz.
         */
        WeldJoint.prototype.getFrequency = function () {
            return this.m_frequencyHz;
        };
        /**
         * Set damping ratio.
         */
        WeldJoint.prototype.setDampingRatio = function (ratio) {
            this.m_dampingRatio = ratio;
        };
        /**
         * Get damping ratio.
         */
        WeldJoint.prototype.getDampingRatio = function () {
            return this.m_dampingRatio;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        WeldJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        WeldJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        WeldJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        WeldJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * this.m_impulse.z;
        };
        WeldJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            // J = [-I -r1_skew I r2_skew]
            // [ 0 -1 0 1]
            // r_skew = [-ry; rx]
            // Matlab
            // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
            // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
            // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var K = new Mat33();
            K.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y
                * iB;
            K.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
            K.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
            K.ex.y = K.ey.x;
            K.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x
                * iB;
            K.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
            K.ex.z = K.ez.x;
            K.ey.z = K.ez.y;
            K.ez.z = iA + iB;
            if (this.m_frequencyHz > 0.0) {
                K.getInverse22(this.m_mass);
                var invM = iA + iB;
                var m = invM > 0.0 ? 1.0 / invM : 0.0;
                var C = aB - aA - this.m_referenceAngle;
                // Frequency
                var omega = 2.0 * math_PI$1 * this.m_frequencyHz;
                // Damping coefficient
                var d = 2.0 * m * this.m_dampingRatio * omega;
                // Spring stiffness
                var k = m * omega * omega;
                // magic formulas
                var h = step.dt;
                this.m_gamma = h * (d + h * k);
                this.m_gamma = this.m_gamma != 0.0 ? 1.0 / this.m_gamma : 0.0;
                this.m_bias = C * h * k * this.m_gamma;
                invM += this.m_gamma;
                this.m_mass.ez.z = invM != 0.0 ? 1.0 / invM : 0.0;
            }
            else if (K.ez.z == 0.0) {
                K.getInverse22(this.m_mass);
                this.m_gamma = 0.0;
                this.m_bias = 0.0;
            }
            else {
                K.getSymInverse33(this.m_mass);
                this.m_gamma = 0.0;
                this.m_bias = 0.0;
            }
            if (step.warmStarting) {
                // Scale impulses to support a variable time step.
                this.m_impulse.mul(step.dtRatio);
                var P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);
                vA.subMul(mA, P);
                wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + this.m_impulse.z);
                vB.addMul(mB, P);
                wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + this.m_impulse.z);
            }
            else {
                this.m_impulse.setZero();
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        WeldJoint.prototype.solveVelocityConstraints = function (step) {
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            if (this.m_frequencyHz > 0.0) {
                var Cdot2 = wB - wA;
                var impulse2 = -this.m_mass.ez.z * (Cdot2 + this.m_bias + this.m_gamma * this.m_impulse.z);
                this.m_impulse.z += impulse2;
                wA -= iA * impulse2;
                wB += iB * impulse2;
                var Cdot1 = Vec2.zero();
                Cdot1.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
                Cdot1.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
                var impulse1 = Vec2.neg(Mat33.mulVec2(this.m_mass, Cdot1));
                this.m_impulse.x += impulse1.x;
                this.m_impulse.y += impulse1.y;
                var P = Vec2.clone(impulse1);
                vA.subMul(mA, P);
                wA -= iA * Vec2.crossVec2Vec2(this.m_rA, P);
                vB.addMul(mB, P);
                wB += iB * Vec2.crossVec2Vec2(this.m_rB, P);
            }
            else {
                var Cdot1 = Vec2.zero();
                Cdot1.addCombine(1, vB, 1, Vec2.crossNumVec2(wB, this.m_rB));
                Cdot1.subCombine(1, vA, 1, Vec2.crossNumVec2(wA, this.m_rA));
                var Cdot2 = wB - wA;
                var Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2);
                var impulse = Vec3.neg(Mat33.mulVec3(this.m_mass, Cdot));
                this.m_impulse.add(impulse);
                var P = Vec2.neo(impulse.x, impulse.y);
                vA.subMul(mA, P);
                wA -= iA * (Vec2.crossVec2Vec2(this.m_rA, P) + impulse.z);
                vB.addMul(mB, P);
                wB += iB * (Vec2.crossVec2Vec2(this.m_rB, P) + impulse.z);
            }
            this.m_bodyA.c_velocity.v = vA;
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v = vB;
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        WeldJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            var positionError;
            var angularError;
            var K = new Mat33();
            K.ex.x = mA + mB + rA.y * rA.y * iA + rB.y * rB.y * iB;
            K.ey.x = -rA.y * rA.x * iA - rB.y * rB.x * iB;
            K.ez.x = -rA.y * iA - rB.y * iB;
            K.ex.y = K.ey.x;
            K.ey.y = mA + mB + rA.x * rA.x * iA + rB.x * rB.x * iB;
            K.ez.y = rA.x * iA + rB.x * iB;
            K.ex.z = K.ez.x;
            K.ey.z = K.ez.y;
            K.ez.z = iA + iB;
            if (this.m_frequencyHz > 0.0) {
                var C1 = Vec2.zero();
                C1.addCombine(1, cB, 1, rB);
                C1.subCombine(1, cA, 1, rA);
                positionError = C1.length();
                angularError = 0.0;
                var P = Vec2.neg(K.solve22(C1));
                cA.subMul(mA, P);
                aA -= iA * Vec2.crossVec2Vec2(rA, P);
                cB.addMul(mB, P);
                aB += iB * Vec2.crossVec2Vec2(rB, P);
            }
            else {
                var C1 = Vec2.zero();
                C1.addCombine(1, cB, 1, rB);
                C1.subCombine(1, cA, 1, rA);
                var C2 = aB - aA - this.m_referenceAngle;
                positionError = C1.length();
                angularError = math_abs$1(C2);
                var C = new Vec3(C1.x, C1.y, C2);
                var impulse = new Vec3();
                if (K.ez.z > 0.0) {
                    impulse = Vec3.neg(K.solve33(C));
                }
                else {
                    var impulse2 = Vec2.neg(K.solve22(C1));
                    impulse.set(impulse2.x, impulse2.y, 0.0);
                }
                var P = Vec2.neo(impulse.x, impulse.y);
                cA.subMul(mA, P);
                aA -= iA * (Vec2.crossVec2Vec2(rA, P) + impulse.z);
                cB.addMul(mB, P);
                aB += iB * (Vec2.crossVec2Vec2(rB, P) + impulse.z);
            }
            this.m_bodyA.c_position.c = cA;
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c = cB;
            this.m_bodyB.c_position.a = aB;
            return positionError <= SettingsInternal.linearSlop && angularError <= SettingsInternal.angularSlop;
        };
        WeldJoint.TYPE = 'weld-joint';
        return WeldJoint;
    }(Joint));

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_abs = Math.abs;
    /** @internal */ var math_PI = Math.PI;
    /** @internal */ var DEFAULTS = {
        enableMotor: false,
        maxMotorTorque: 0.0,
        motorSpeed: 0.0,
        frequencyHz: 2.0,
        dampingRatio: 0.7,
    };
    /**
     * A wheel joint. This joint provides two degrees of freedom: translation along
     * an axis fixed in bodyA and rotation in the plane. In other words, it is a
     * point to line constraint with a rotational motor and a linear spring/damper.
     * This joint is designed for vehicle suspensions.
     */
    var WheelJoint = /** @class */ (function (_super) {
        __extends(WheelJoint, _super);
        function WheelJoint(def, bodyA, bodyB, anchor, axis) {
            var _this = this;
            // @ts-ignore
            if (!(_this instanceof WheelJoint)) {
                return new WheelJoint(def, bodyA, bodyB, anchor, axis);
            }
            def = options(def, DEFAULTS);
            _this = _super.call(this, def, bodyA, bodyB) || this;
            bodyA = _this.m_bodyA;
            bodyB = _this.m_bodyB;
            _this.m_ax = Vec2.zero();
            _this.m_ay = Vec2.zero();
            _this.m_type = WheelJoint.TYPE;
            _this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
            _this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
            if (Vec2.isValid(axis)) {
                _this.m_localXAxisA = bodyA.getLocalVector(axis);
            }
            else if (Vec2.isValid(def.localAxisA)) {
                _this.m_localXAxisA = Vec2.clone(def.localAxisA);
            }
            else if (Vec2.isValid(def.localAxis)) {
                // localAxis is renamed to localAxisA, this is for backward compatibility
                _this.m_localXAxisA = Vec2.clone(def.localAxis);
            }
            else {
                _this.m_localXAxisA = Vec2.neo(1.0, 0.0);
            }
            _this.m_localYAxisA = Vec2.crossNumVec2(1.0, _this.m_localXAxisA);
            _this.m_mass = 0.0;
            _this.m_impulse = 0.0;
            _this.m_motorMass = 0.0;
            _this.m_motorImpulse = 0.0;
            _this.m_springMass = 0.0;
            _this.m_springImpulse = 0.0;
            _this.m_maxMotorTorque = def.maxMotorTorque;
            _this.m_motorSpeed = def.motorSpeed;
            _this.m_enableMotor = def.enableMotor;
            _this.m_frequencyHz = def.frequencyHz;
            _this.m_dampingRatio = def.dampingRatio;
            _this.m_bias = 0.0;
            _this.m_gamma = 0.0;
            return _this;
            // Linear constraint (point-to-line)
            // d = pB - pA = xB + rB - xA - rA
            // C = dot(ay, d)
            // Cdot = dot(d, cross(wA, ay)) + dot(ay, vB + cross(wB, rB) - vA - cross(wA,
            // rA))
            // = -dot(ay, vA) - dot(cross(d + rA, ay), wA) + dot(ay, vB) + dot(cross(rB,
            // ay), vB)
            // J = [-ay, -cross(d + rA, ay), ay, cross(rB, ay)]
            // Spring linear constraint
            // C = dot(ax, d)
            // Cdot = = -dot(ax, vA) - dot(cross(d + rA, ax), wA) + dot(ax, vB) +
            // dot(cross(rB, ax), vB)
            // J = [-ax -cross(d+rA, ax) ax cross(rB, ax)]
            // Motor rotational constraint
            // Cdot = wB - wA
            // J = [0 0 -1 0 0 1]
        }
        /** @internal */
        WheelJoint.prototype._serialize = function () {
            return {
                type: this.m_type,
                bodyA: this.m_bodyA,
                bodyB: this.m_bodyB,
                collideConnected: this.m_collideConnected,
                enableMotor: this.m_enableMotor,
                maxMotorTorque: this.m_maxMotorTorque,
                motorSpeed: this.m_motorSpeed,
                frequencyHz: this.m_frequencyHz,
                dampingRatio: this.m_dampingRatio,
                localAnchorA: this.m_localAnchorA,
                localAnchorB: this.m_localAnchorB,
                localAxisA: this.m_localXAxisA,
            };
        };
        /** @internal */
        WheelJoint._deserialize = function (data, world, restore) {
            data = __assign({}, data);
            data.bodyA = restore(Body, data.bodyA, world);
            data.bodyB = restore(Body, data.bodyB, world);
            var joint = new WheelJoint(data);
            return joint;
        };
        /** @internal */
        WheelJoint.prototype._setAnchors = function (def) {
            if (def.anchorA) {
                this.m_localAnchorA.setVec2(this.m_bodyA.getLocalPoint(def.anchorA));
            }
            else if (def.localAnchorA) {
                this.m_localAnchorA.setVec2(def.localAnchorA);
            }
            if (def.anchorB) {
                this.m_localAnchorB.setVec2(this.m_bodyB.getLocalPoint(def.anchorB));
            }
            else if (def.localAnchorB) {
                this.m_localAnchorB.setVec2(def.localAnchorB);
            }
            if (def.localAxisA) {
                this.m_localXAxisA.setVec2(def.localAxisA);
                this.m_localYAxisA.setVec2(Vec2.crossNumVec2(1.0, def.localAxisA));
            }
        };
        /**
         * The local anchor point relative to bodyA's origin.
         */
        WheelJoint.prototype.getLocalAnchorA = function () {
            return this.m_localAnchorA;
        };
        /**
         * The local anchor point relative to bodyB's origin.
         */
        WheelJoint.prototype.getLocalAnchorB = function () {
            return this.m_localAnchorB;
        };
        /**
         * The local joint axis relative to bodyA.
         */
        WheelJoint.prototype.getLocalAxisA = function () {
            return this.m_localXAxisA;
        };
        /**
         * Get the current joint translation, usually in meters.
         */
        WheelJoint.prototype.getJointTranslation = function () {
            var bA = this.m_bodyA;
            var bB = this.m_bodyB;
            var pA = bA.getWorldPoint(this.m_localAnchorA);
            var pB = bB.getWorldPoint(this.m_localAnchorB);
            var d = Vec2.sub(pB, pA);
            var axis = bA.getWorldVector(this.m_localXAxisA);
            var translation = Vec2.dot(d, axis);
            return translation;
        };
        /**
         * Get the current joint translation speed, usually in meters per second.
         */
        WheelJoint.prototype.getJointSpeed = function () {
            var wA = this.m_bodyA.m_angularVelocity;
            var wB = this.m_bodyB.m_angularVelocity;
            return wB - wA;
        };
        /**
         * Is the joint motor enabled?
         */
        WheelJoint.prototype.isMotorEnabled = function () {
            return this.m_enableMotor;
        };
        /**
         * Enable/disable the joint motor.
         */
        WheelJoint.prototype.enableMotor = function (flag) {
            if (flag == this.m_enableMotor)
                return;
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_enableMotor = flag;
        };
        /**
         * Set the motor speed, usually in radians per second.
         */
        WheelJoint.prototype.setMotorSpeed = function (speed) {
            if (speed == this.m_motorSpeed)
                return;
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_motorSpeed = speed;
        };
        /**
         * Get the motor speed, usually in radians per second.
         */
        WheelJoint.prototype.getMotorSpeed = function () {
            return this.m_motorSpeed;
        };
        /**
         * Set/Get the maximum motor force, usually in N-m.
         */
        WheelJoint.prototype.setMaxMotorTorque = function (torque) {
            if (torque == this.m_maxMotorTorque)
                return;
            this.m_bodyA.setAwake(true);
            this.m_bodyB.setAwake(true);
            this.m_maxMotorTorque = torque;
        };
        WheelJoint.prototype.getMaxMotorTorque = function () {
            return this.m_maxMotorTorque;
        };
        /**
         * Get the current motor torque given the inverse time step, usually in N-m.
         */
        WheelJoint.prototype.getMotorTorque = function (inv_dt) {
            return inv_dt * this.m_motorImpulse;
        };
        /**
         * Set/Get the spring frequency in hertz. Setting the frequency to zero disables
         * the spring.
         */
        WheelJoint.prototype.setSpringFrequencyHz = function (hz) {
            this.m_frequencyHz = hz;
        };
        WheelJoint.prototype.getSpringFrequencyHz = function () {
            return this.m_frequencyHz;
        };
        /**
         * Set/Get the spring damping ratio
         */
        WheelJoint.prototype.setSpringDampingRatio = function (ratio) {
            this.m_dampingRatio = ratio;
        };
        WheelJoint.prototype.getSpringDampingRatio = function () {
            return this.m_dampingRatio;
        };
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        WheelJoint.prototype.getAnchorA = function () {
            return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
        };
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        WheelJoint.prototype.getAnchorB = function () {
            return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
        };
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        WheelJoint.prototype.getReactionForce = function (inv_dt) {
            return Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax).mul(inv_dt);
        };
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        WheelJoint.prototype.getReactionTorque = function (inv_dt) {
            return inv_dt * this.m_motorImpulse;
        };
        WheelJoint.prototype.initVelocityConstraints = function (step) {
            this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
            this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
            this.m_invMassA = this.m_bodyA.m_invMass;
            this.m_invMassB = this.m_bodyB.m_invMass;
            this.m_invIA = this.m_bodyA.m_invI;
            this.m_invIB = this.m_bodyB.m_invI;
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            // Compute the effective masses.
            var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            var d = Vec2.zero();
            d.addCombine(1, cB, 1, rB);
            d.subCombine(1, cA, 1, rA);
            // Point to line constraint
            {
                this.m_ay = Rot.mulVec2(qA, this.m_localYAxisA);
                this.m_sAy = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_ay);
                this.m_sBy = Vec2.crossVec2Vec2(rB, this.m_ay);
                this.m_mass = mA + mB + iA * this.m_sAy * this.m_sAy + iB * this.m_sBy
                    * this.m_sBy;
                if (this.m_mass > 0.0) {
                    this.m_mass = 1.0 / this.m_mass;
                }
            }
            // Spring constraint
            this.m_springMass = 0.0;
            this.m_bias = 0.0;
            this.m_gamma = 0.0;
            if (this.m_frequencyHz > 0.0) {
                this.m_ax = Rot.mulVec2(qA, this.m_localXAxisA);
                this.m_sAx = Vec2.crossVec2Vec2(Vec2.add(d, rA), this.m_ax);
                this.m_sBx = Vec2.crossVec2Vec2(rB, this.m_ax);
                var invMass = mA + mB + iA * this.m_sAx * this.m_sAx + iB * this.m_sBx
                    * this.m_sBx;
                if (invMass > 0.0) {
                    this.m_springMass = 1.0 / invMass;
                    var C = Vec2.dot(d, this.m_ax);
                    // Frequency
                    var omega = 2.0 * math_PI * this.m_frequencyHz;
                    // Damping coefficient
                    var damp = 2.0 * this.m_springMass * this.m_dampingRatio * omega;
                    // Spring stiffness
                    var k = this.m_springMass * omega * omega;
                    // magic formulas
                    var h = step.dt;
                    this.m_gamma = h * (damp + h * k);
                    if (this.m_gamma > 0.0) {
                        this.m_gamma = 1.0 / this.m_gamma;
                    }
                    this.m_bias = C * h * k * this.m_gamma;
                    this.m_springMass = invMass + this.m_gamma;
                    if (this.m_springMass > 0.0) {
                        this.m_springMass = 1.0 / this.m_springMass;
                    }
                }
            }
            else {
                this.m_springImpulse = 0.0;
            }
            // Rotational motor
            if (this.m_enableMotor) {
                this.m_motorMass = iA + iB;
                if (this.m_motorMass > 0.0) {
                    this.m_motorMass = 1.0 / this.m_motorMass;
                }
            }
            else {
                this.m_motorMass = 0.0;
                this.m_motorImpulse = 0.0;
            }
            if (step.warmStarting) {
                // Account for variable time step.
                this.m_impulse *= step.dtRatio;
                this.m_springImpulse *= step.dtRatio;
                this.m_motorImpulse *= step.dtRatio;
                var P = Vec2.combine(this.m_impulse, this.m_ay, this.m_springImpulse, this.m_ax);
                var LA = this.m_impulse * this.m_sAy + this.m_springImpulse * this.m_sAx + this.m_motorImpulse;
                var LB = this.m_impulse * this.m_sBy + this.m_springImpulse * this.m_sBx + this.m_motorImpulse;
                vA.subMul(this.m_invMassA, P);
                wA -= this.m_invIA * LA;
                vB.addMul(this.m_invMassB, P);
                wB += this.m_invIB * LB;
            }
            else {
                this.m_impulse = 0.0;
                this.m_springImpulse = 0.0;
                this.m_motorImpulse = 0.0;
            }
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
        };
        WheelJoint.prototype.solveVelocityConstraints = function (step) {
            var mA = this.m_invMassA;
            var mB = this.m_invMassB;
            var iA = this.m_invIA;
            var iB = this.m_invIB;
            var vA = this.m_bodyA.c_velocity.v;
            var wA = this.m_bodyA.c_velocity.w;
            var vB = this.m_bodyB.c_velocity.v;
            var wB = this.m_bodyB.c_velocity.w;
            // Solve spring constraint
            {
                var Cdot = Vec2.dot(this.m_ax, vB) - Vec2.dot(this.m_ax, vA) + this.m_sBx * wB - this.m_sAx * wA;
                var impulse = -this.m_springMass * (Cdot + this.m_bias + this.m_gamma * this.m_springImpulse);
                this.m_springImpulse += impulse;
                var P = Vec2.mulNumVec2(impulse, this.m_ax);
                var LA = impulse * this.m_sAx;
                var LB = impulse * this.m_sBx;
                vA.subMul(mA, P);
                wA -= iA * LA;
                vB.addMul(mB, P);
                wB += iB * LB;
            }
            // Solve rotational motor constraint
            {
                var Cdot = wB - wA - this.m_motorSpeed;
                var impulse = -this.m_motorMass * Cdot;
                var oldImpulse = this.m_motorImpulse;
                var maxImpulse = step.dt * this.m_maxMotorTorque;
                this.m_motorImpulse = clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
                impulse = this.m_motorImpulse - oldImpulse;
                wA -= iA * impulse;
                wB += iB * impulse;
            }
            // Solve point to line constraint
            {
                var Cdot = Vec2.dot(this.m_ay, vB) - Vec2.dot(this.m_ay, vA) + this.m_sBy * wB - this.m_sAy * wA;
                var impulse = -this.m_mass * Cdot;
                this.m_impulse += impulse;
                var P = Vec2.mulNumVec2(impulse, this.m_ay);
                var LA = impulse * this.m_sAy;
                var LB = impulse * this.m_sBy;
                vA.subMul(mA, P);
                wA -= iA * LA;
                vB.addMul(mB, P);
                wB += iB * LB;
            }
            this.m_bodyA.c_velocity.v.setVec2(vA);
            this.m_bodyA.c_velocity.w = wA;
            this.m_bodyB.c_velocity.v.setVec2(vB);
            this.m_bodyB.c_velocity.w = wB;
        };
        /**
         * This returns true if the position errors are within tolerance.
         */
        WheelJoint.prototype.solvePositionConstraints = function (step) {
            var cA = this.m_bodyA.c_position.c;
            var aA = this.m_bodyA.c_position.a;
            var cB = this.m_bodyB.c_position.c;
            var aB = this.m_bodyB.c_position.a;
            var qA = Rot.neo(aA);
            var qB = Rot.neo(aB);
            var rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
            var rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));
            var d = Vec2.zero();
            d.addCombine(1, cB, 1, rB);
            d.subCombine(1, cA, 1, rA);
            var ay = Rot.mulVec2(qA, this.m_localYAxisA);
            var sAy = Vec2.crossVec2Vec2(Vec2.add(d, rA), ay);
            var sBy = Vec2.crossVec2Vec2(rB, ay);
            var C = Vec2.dot(d, ay);
            var k = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy;
            var impulse = k != 0.0 ? -C / k : 0.0;
            var P = Vec2.mulNumVec2(impulse, ay);
            var LA = impulse * sAy;
            var LB = impulse * sBy;
            cA.subMul(this.m_invMassA, P);
            aA -= this.m_invIA * LA;
            cB.addMul(this.m_invMassB, P);
            aB += this.m_invIB * LB;
            this.m_bodyA.c_position.c.setVec2(cA);
            this.m_bodyA.c_position.a = aA;
            this.m_bodyB.c_position.c.setVec2(cB);
            this.m_bodyB.c_position.a = aB;
            return math_abs(C) <= SettingsInternal.linearSlop;
        };
        WheelJoint.TYPE = 'wheel-joint';
        return WheelJoint;
    }(Joint));

    var SID = 0;
    function Serializer(opts) {
        var _a;
        opts = opts || {};
        var rootClass = opts.rootClass || World;
        var preSerialize = opts.preSerialize || function (obj) { return obj; };
        var postSerialize = opts.postSerialize || function (data, obj) { return data; };
        var preDeserialize = opts.preDeserialize || function (data) { return data; };
        var postDeserialize = opts.postDeserialize || function (obj, data) { return obj; };
        // This is used to create ref objects during serialize
        var refTypes = {
            World: World,
            Body: Body,
            Joint: Joint,
            Fixture: Fixture,
            Shape: Shape,
        };
        // This is used by restore to deserialize objects and refs
        var restoreTypes = __assign({ Vec2: Vec2,
            Vec3: Vec3 }, refTypes);
        var CLASS_BY_TYPE_PROP = (_a = {},
            _a[Body.STATIC] = Body,
            _a[Body.DYNAMIC] = Body,
            _a[Body.KINEMATIC] = Body,
            _a[ChainShape.TYPE] = ChainShape,
            _a[BoxShape.TYPE] = BoxShape,
            _a[EdgeShape.TYPE] = EdgeShape,
            _a[PolygonShape.TYPE] = PolygonShape,
            _a[CircleShape.TYPE] = CircleShape,
            _a[DistanceJoint.TYPE] = DistanceJoint,
            _a[FrictionJoint.TYPE] = FrictionJoint,
            _a[GearJoint.TYPE] = GearJoint,
            _a[MotorJoint.TYPE] = MotorJoint,
            _a[MouseJoint.TYPE] = MouseJoint,
            _a[PrismaticJoint.TYPE] = PrismaticJoint,
            _a[PulleyJoint.TYPE] = PulleyJoint,
            _a[RevoluteJoint.TYPE] = RevoluteJoint,
            _a[RopeJoint.TYPE] = RopeJoint,
            _a[WeldJoint.TYPE] = WeldJoint,
            _a[WheelJoint.TYPE] = WheelJoint,
            _a);
        this.toJson = function (root) {
            var json = [];
            var queue = [root];
            var refMap = {};
            function storeRef(value, typeName) {
                value.__sid = value.__sid || ++SID;
                if (!refMap[value.__sid]) {
                    queue.push(value);
                    var index = json.length + queue.length;
                    var ref = {
                        refIndex: index,
                        refType: typeName
                    };
                    refMap[value.__sid] = ref;
                }
                return refMap[value.__sid];
            }
            function serialize(obj) {
                obj = preSerialize(obj);
                var data = obj._serialize();
                data = postSerialize(data, obj);
                return data;
            }
            function toJson(value, top) {
                if (typeof value !== 'object' || value === null) {
                    return value;
                }
                if (typeof value._serialize === 'function') {
                    if (value !== top) {
                        // tslint:disable-next-line:no-for-in
                        for (var typeName in refTypes) {
                            if (value instanceof refTypes[typeName]) {
                                return storeRef(value, typeName);
                            }
                        }
                    }
                    value = serialize(value);
                }
                if (Array.isArray(value)) {
                    var newValue = [];
                    for (var key = 0; key < value.length; key++) {
                        newValue[key] = toJson(value[key]);
                    }
                    value = newValue;
                }
                else {
                    var newValue = {};
                    // tslint:disable-next-line:no-for-in
                    for (var key in value) {
                        if (value.hasOwnProperty(key)) {
                            newValue[key] = toJson(value[key]);
                        }
                    }
                    value = newValue;
                }
                return value;
            }
            while (queue.length) {
                var obj = queue.shift();
                var str = toJson(obj, obj);
                json.push(str);
            }
            return json;
        };
        this.fromJson = function (json) {
            var refMap = {};
            function findDeserilizer(data, cls) {
                if (!cls || !cls._deserialize) {
                    cls = CLASS_BY_TYPE_PROP[data.type];
                }
                return cls && cls._deserialize;
            }
            /**
             * Deserialize a data object.
             */
            function deserialize(cls, data, ctx) {
                var deserializer = findDeserilizer(data, cls);
                if (!deserializer) {
                    return;
                }
                data = preDeserialize(data);
                var obj = deserializer(data, ctx, restoreRef);
                obj = postDeserialize(obj, data);
                return obj;
            }
            /**
             * Restore a ref object or deserialize a data object.
             *
             * This is passed as callback to class deserializers.
             */
            function restoreRef(cls, ref, ctx) {
                if (!ref.refIndex) {
                    return cls && cls._deserialize && deserialize(cls, ref, ctx);
                }
                cls = restoreTypes[ref.refType] || cls;
                var index = ref.refIndex;
                if (!refMap[index]) {
                    var data = json[index];
                    var obj = deserialize(cls, data, ctx);
                    refMap[index] = obj;
                }
                return refMap[index];
            }
            var root = rootClass._deserialize(json[0], null, restoreRef);
            return root;
        };
    }
    var serializer = new Serializer();
    Serializer.toJson = serializer.toJson;
    Serializer.fromJson = serializer.fromJson;

    var Testbed = /** @class */ (function () {
        function Testbed() {
            /** World viewbox width. */
            this.width = 80;
            /** World viewbox height. */
            this.height = 60;
            /** World viewbox center vertical offset. */
            this.x = 0;
            /** World viewbox center horizontal offset. */
            this.y = -10;
            this.scaleY = -1;
            /** World simulation step frequency */
            this.hz = 60;
            /** World simulation speed, default is 1 */
            this.speed = 1;
            this.ratio = 16;
            this.background = '#222222';
            this.activeKeys = {};
            /** callback, to be implemented by user */
            this.step = function (dt, t) {
                return;
            };
            /** callback, to be implemented by user */
            this.keydown = function (keyCode, label) {
                return;
            };
            /** callback, to be implemented by user */
            this.keyup = function (keyCode, label) {
                return;
            };
            this.statusText = '';
            this.statusMap = {};
        }
        Testbed.mount = function (options) {
            throw new Error('Not implemented');
        };
        Testbed.prototype.status = function (a, b) {
            if (typeof b !== 'undefined') {
                var key_1 = a;
                var value_1 = b;
                if (typeof value_1 !== 'function' && typeof value_1 !== 'object') {
                    this.statusMap[key_1] = value_1;
                }
            }
            else if (a && typeof a === 'object') {
                // tslint:disable-next-line:no-for-in
                for (var key_2 in a) {
                    var value_2 = a[key_2];
                    if (typeof value_2 !== 'function' && typeof value_2 !== 'object') {
                        this.statusMap[key_2] = value_2;
                    }
                }
            }
            else if (typeof a === 'string') {
                this.statusText = a;
            }
            var newline = '\n';
            var text = this.statusText || '';
            for (var key in this.statusMap) {
                var value = this.statusMap[key];
                if (typeof value === 'function')
                    continue;
                text += (text && newline) + key + ': ' + value;
            }
            this._status(text);
        };
        Testbed.prototype.info = function (text) {
            this._info(text);
        };
        Testbed.prototype.color = function (r, g, b) {
            r = r * 256 | 0;
            g = g * 256 | 0;
            b = b * 256 | 0;
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        };
        return Testbed;
    }());
    /** @internal */
    function testbed(a, b) {
        var callback;
        var options;
        if (typeof a === 'function') {
            callback = a;
            options = b;
        }
        else if (typeof b === 'function') {
            callback = b;
            options = a;
        }
        else {
            options = a !== null && a !== void 0 ? a : b;
        }
        var testbed = Testbed.mount(options);
        if (callback) {
            // this is for backwards compatibility
            var world = callback(testbed) || testbed.world;
            testbed.start(world);
        }
        else {
            return testbed;
        }
    }

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    Contact.addType(CircleShape.TYPE, CircleShape.TYPE, CircleCircleContact);
    /** @internal */ function CircleCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
        CollideCircles(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(), xfB);
    }
    /** @internal */ var pA = vec2(0, 0);
    /** @internal */ var pB = vec2(0, 0);
    var CollideCircles = function (manifold, circleA, xfA, circleB, xfB) {
        manifold.pointCount = 0;
        transformVec2(pA, xfA, circleA.m_p);
        transformVec2(pB, xfB, circleB.m_p);
        var distSqr = distSqrVec2(pB, pA);
        var rA = circleA.m_radius;
        var rB = circleB.m_radius;
        var radius = rA + rB;
        if (distSqr > radius * radius) {
            return;
        }
        manifold.type = exports.ManifoldType.e_circles;
        copyVec2(manifold.localPoint, circleA.m_p);
        zeroVec2(manifold.localNormal);
        manifold.pointCount = 1;
        copyVec2(manifold.points[0].localPoint, circleB.m_p);
        // manifold.points[0].id.key = 0;
        manifold.points[0].id.setFeatures(0, exports.ContactFeatureType.e_vertex, 0, exports.ContactFeatureType.e_vertex);
    };

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    Contact.addType(EdgeShape.TYPE, CircleShape.TYPE, EdgeCircleContact);
    Contact.addType(ChainShape.TYPE, CircleShape.TYPE, ChainCircleContact);
    /** @internal */ function EdgeCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
        var shapeA = fixtureA.getShape();
        var shapeB = fixtureB.getShape();
        CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
    }
    function ChainCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
        var chain = fixtureA.getShape();
        var edge = new EdgeShape();
        chain.getChildEdge(edge, indexA);
        var shapeA = edge;
        var shapeB = fixtureB.getShape();
        CollideEdgeCircle(manifold, shapeA, xfA, shapeB, xfB);
    }
    /** @internal */ var e = vec2(0, 0);
    /** @internal */ var e1 = vec2(0, 0);
    /** @internal */ var e2 = vec2(0, 0);
    /** @internal */ var Q = vec2(0, 0);
    /** @internal */ var P = vec2(0, 0);
    /** @internal */ var n$2 = vec2(0, 0);
    // Compute contact points for edge versus circle.
    // This accounts for edge connectivity.
    var CollideEdgeCircle = function (manifold, edgeA, xfA, circleB, xfB) {
        manifold.pointCount = 0;
        // Compute circle in frame of edge
        retransformVec2(Q, xfB, xfA, circleB.m_p);
        var A = edgeA.m_vertex1;
        var B = edgeA.m_vertex2;
        diffVec2(e, B, A);
        // Barycentric coordinates
        var u = dotVec2(e, B) - dotVec2(e, Q);
        var v = dotVec2(e, Q) - dotVec2(e, A);
        var radius = edgeA.m_radius + circleB.m_radius;
        // Region A
        if (v <= 0.0) {
            copyVec2(P, A);
            var dd_1 = distSqrVec2(Q, A);
            if (dd_1 > radius * radius) {
                return;
            }
            // Is there an edge connected to A?
            if (edgeA.m_hasVertex0) {
                var A1 = edgeA.m_vertex0;
                var B1 = A;
                diffVec2(e1, B1, A1);
                var u1 = dotVec2(e1, B1) - dotVec2(e1, Q);
                // Is the circle in Region AB of the previous edge?
                if (u1 > 0.0) {
                    return;
                }
            }
            manifold.type = exports.ManifoldType.e_circles;
            zeroVec2(manifold.localNormal);
            copyVec2(manifold.localPoint, P);
            manifold.pointCount = 1;
            copyVec2(manifold.points[0].localPoint, circleB.m_p);
            // manifold.points[0].id.key = 0;
            manifold.points[0].id.setFeatures(0, exports.ContactFeatureType.e_vertex, 0, exports.ContactFeatureType.e_vertex);
            return;
        }
        // Region B
        if (u <= 0.0) {
            copyVec2(P, B);
            var dd_2 = distSqrVec2(Q, P);
            if (dd_2 > radius * radius) {
                return;
            }
            // Is there an edge connected to B?
            if (edgeA.m_hasVertex3) {
                var B2 = edgeA.m_vertex3;
                var A2 = B;
                diffVec2(e2, B2, A2);
                var v2 = dotVec2(e2, Q) - dotVec2(e2, A2);
                // Is the circle in Region AB of the next edge?
                if (v2 > 0.0) {
                    return;
                }
            }
            manifold.type = exports.ManifoldType.e_circles;
            zeroVec2(manifold.localNormal);
            copyVec2(manifold.localPoint, P);
            manifold.pointCount = 1;
            copyVec2(manifold.points[0].localPoint, circleB.m_p);
            // manifold.points[0].id.key = 0;
            manifold.points[0].id.setFeatures(1, exports.ContactFeatureType.e_vertex, 0, exports.ContactFeatureType.e_vertex);
            return;
        }
        // Region AB
        var den = lengthSqrVec2(e);
        combineVec2(P, u / den, A, v / den, B);
        var dd = distSqrVec2(Q, P);
        if (dd > radius * radius) {
            return;
        }
        crossNumVec2(n$2, 1, e);
        if (dotVec2(n$2, Q) - dotVec2(n$2, A) < 0.0) {
            negVec2(n$2);
        }
        normalizeVec2(n$2);
        manifold.type = exports.ManifoldType.e_faceA;
        copyVec2(manifold.localNormal, n$2);
        copyVec2(manifold.localPoint, A);
        manifold.pointCount = 1;
        copyVec2(manifold.points[0].localPoint, circleB.m_p);
        // manifold.points[0].id.key = 0;
        manifold.points[0].id.setFeatures(0, exports.ContactFeatureType.e_face, 0, exports.ContactFeatureType.e_vertex);
    };

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var incidentEdge = [new ClipVertex(), new ClipVertex()];
    /** @internal */ var clipPoints1$1 = [new ClipVertex(), new ClipVertex()];
    /** @internal */ var clipPoints2$1 = [new ClipVertex(), new ClipVertex()];
    /** @internal */ var clipSegmentToLineNormal = vec2(0, 0);
    /** @internal */ var v1 = vec2(0, 0);
    /** @internal */ var n$1 = vec2(0, 0);
    /** @internal */ var xf$1 = transform(0, 0, 0);
    /** @internal */ var v11 = vec2(0, 0);
    /** @internal */ var v12 = vec2(0, 0);
    /** @internal */ var localTangent = vec2(0, 0);
    /** @internal */ var localNormal = vec2(0, 0);
    /** @internal */ var planePoint = vec2(0, 0);
    /** @internal */ var tangent = vec2(0, 0);
    /** @internal */ var normal$1 = vec2(0, 0);
    /** @internal */ var normal1$1 = vec2(0, 0);
    Contact.addType(PolygonShape.TYPE, PolygonShape.TYPE, PolygonContact);
    /** @internal */ function PolygonContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
        CollidePolygons(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(), xfB);
    }
    /**
     * Find the max separation between poly1 and poly2 using edge normals from
     * poly1.
     */
    /** @internal */ function findMaxSeparation(poly1, xf1, poly2, xf2, output) {
        var count1 = poly1.m_count;
        var count2 = poly2.m_count;
        var n1s = poly1.m_normals;
        var v1s = poly1.m_vertices;
        var v2s = poly2.m_vertices;
        invTransformTransform(xf$1, xf2, xf1);
        var bestIndex = 0;
        var maxSeparation = -Infinity;
        for (var i = 0; i < count1; ++i) {
            // Get poly1 normal in frame2.
            rotVec2(n$1, xf$1.q, n1s[i]);
            transformVec2(v1, xf$1, v1s[i]);
            // Find deepest point for normal i.
            var si = Infinity;
            for (var j = 0; j < count2; ++j) {
                var sij = dotVec2(n$1, v2s[j]) - dotVec2(n$1, v1);
                if (sij < si) {
                    si = sij;
                }
            }
            if (si > maxSeparation) {
                maxSeparation = si;
                bestIndex = i;
            }
        }
        // used to keep last FindMaxSeparation call values
        output.maxSeparation = maxSeparation;
        output.bestIndex = bestIndex;
    }
    /** @internal */ function findIncidentEdge(clipVertex, poly1, xf1, edge1, poly2, xf2) {
        var normals1 = poly1.m_normals;
        var count2 = poly2.m_count;
        var vertices2 = poly2.m_vertices;
        var normals2 = poly2.m_normals;
        // Get the normal of the reference edge in poly2's frame.
        rerotVec2(normal1$1, xf2.q, xf1.q, normals1[edge1]);
        // Find the incident edge on poly2.
        var index = 0;
        var minDot = Infinity;
        for (var i = 0; i < count2; ++i) {
            var dot = dotVec2(normal1$1, normals2[i]);
            if (dot < minDot) {
                minDot = dot;
                index = i;
            }
        }
        // Build the clip vertices for the incident edge.
        var i1 = index;
        var i2 = i1 + 1 < count2 ? i1 + 1 : 0;
        transformVec2(clipVertex[0].v, xf2, vertices2[i1]);
        clipVertex[0].id.setFeatures(edge1, exports.ContactFeatureType.e_face, i1, exports.ContactFeatureType.e_vertex);
        transformVec2(clipVertex[1].v, xf2, vertices2[i2]);
        clipVertex[1].id.setFeatures(edge1, exports.ContactFeatureType.e_face, i2, exports.ContactFeatureType.e_vertex);
    }
    /** @internal */ var maxSeparation = {
        maxSeparation: 0,
        bestIndex: 0,
    };
    /**
     *
     * Find edge normal of max separation on A - return if separating axis is found<br>
     * Find edge normal of max separation on B - return if separation axis is found<br>
     * Choose reference edge as min(minA, minB)<br>
     * Find incident edge<br>
     * Clip
     *
     * The normal points from 1 to 2
     */
    var CollidePolygons = function (manifold, polyA, xfA, polyB, xfB) {
        manifold.pointCount = 0;
        var totalRadius = polyA.m_radius + polyB.m_radius;
        findMaxSeparation(polyA, xfA, polyB, xfB, maxSeparation);
        var edgeA = maxSeparation.bestIndex;
        var separationA = maxSeparation.maxSeparation;
        if (separationA > totalRadius)
            return;
        findMaxSeparation(polyB, xfB, polyA, xfA, maxSeparation);
        var edgeB = maxSeparation.bestIndex;
        var separationB = maxSeparation.maxSeparation;
        if (separationB > totalRadius)
            return;
        var poly1; // reference polygon
        var poly2; // incident polygon
        var xf1;
        var xf2;
        var edge1; // reference edge
        var flip;
        var k_tol = 0.1 * SettingsInternal.linearSlop;
        if (separationB > separationA + k_tol) {
            poly1 = polyB;
            poly2 = polyA;
            xf1 = xfB;
            xf2 = xfA;
            edge1 = edgeB;
            manifold.type = exports.ManifoldType.e_faceB;
            flip = true;
        }
        else {
            poly1 = polyA;
            poly2 = polyB;
            xf1 = xfA;
            xf2 = xfB;
            edge1 = edgeA;
            manifold.type = exports.ManifoldType.e_faceA;
            flip = false;
        }
        incidentEdge[0].recycle(), incidentEdge[1].recycle();
        findIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
        var count1 = poly1.m_count;
        var vertices1 = poly1.m_vertices;
        var iv1 = edge1;
        var iv2 = edge1 + 1 < count1 ? edge1 + 1 : 0;
        copyVec2(v11, vertices1[iv1]);
        copyVec2(v12, vertices1[iv2]);
        diffVec2(localTangent, v12, v11);
        normalizeVec2(localTangent);
        crossVec2Num(localNormal, localTangent, 1.0);
        combineVec2(planePoint, 0.5, v11, 0.5, v12);
        rotVec2(tangent, xf1.q, localTangent);
        crossVec2Num(normal$1, tangent, 1.0);
        transformVec2(v11, xf1, v11);
        transformVec2(v12, xf1, v12);
        // Face offset.
        var frontOffset = dotVec2(normal$1, v11);
        // Side offsets, extended by polytope skin thickness.
        var sideOffset1 = -dotVec2(tangent, v11) + totalRadius;
        var sideOffset2 = dotVec2(tangent, v12) + totalRadius;
        // Clip incident edge against extruded edge1 side edges.
        clipPoints1$1[0].recycle(), clipPoints1$1[1].recycle();
        clipPoints2$1[0].recycle(), clipPoints2$1[1].recycle();
        // Clip to box side 1
        setVec2(clipSegmentToLineNormal, -tangent.x, -tangent.y);
        var np1 = clipSegmentToLine(clipPoints1$1, incidentEdge, clipSegmentToLineNormal, sideOffset1, iv1);
        if (np1 < 2) {
            return;
        }
        // Clip to negative box side 1
        setVec2(clipSegmentToLineNormal, tangent.x, tangent.y);
        var np2 = clipSegmentToLine(clipPoints2$1, clipPoints1$1, clipSegmentToLineNormal, sideOffset2, iv2);
        if (np2 < 2) {
            return;
        }
        // Now clipPoints2 contains the clipped points.
        copyVec2(manifold.localNormal, localNormal);
        copyVec2(manifold.localPoint, planePoint);
        var pointCount = 0;
        for (var i = 0; i < clipPoints2$1.length /* maxManifoldPoints */; ++i) {
            var separation = dotVec2(normal$1, clipPoints2$1[i].v) - frontOffset;
            if (separation <= totalRadius) {
                var cp = manifold.points[pointCount];
                invTransformVec2(cp.localPoint, xf2, clipPoints2$1[i].v);
                cp.id.set(clipPoints2$1[i].id);
                if (flip) {
                    // Swap features
                    cp.id.swapFeatures();
                }
                ++pointCount;
            }
        }
        manifold.pointCount = pointCount;
    };

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    Contact.addType(PolygonShape.TYPE, CircleShape.TYPE, PolygonCircleContact);
    /** @internal */ function PolygonCircleContact(manifold, xfA, fixtureA, indexA, xfB, fixtureB, indexB) {
        CollidePolygonCircle(manifold, fixtureA.getShape(), xfA, fixtureB.getShape(), xfB);
    }
    /** @internal */ var cLocal = vec2(0, 0);
    /** @internal */ var faceCenter = vec2(0, 0);
    var CollidePolygonCircle = function (manifold, polygonA, xfA, circleB, xfB) {
        manifold.pointCount = 0;
        // Compute circle position in the frame of the polygon.
        retransformVec2(cLocal, xfB, xfA, circleB.m_p);
        // Find the min separating edge.
        var normalIndex = 0;
        var separation = -Infinity;
        var radius = polygonA.m_radius + circleB.m_radius;
        var vertexCount = polygonA.m_count;
        var vertices = polygonA.m_vertices;
        var normals = polygonA.m_normals;
        for (var i = 0; i < vertexCount; ++i) {
            var s = dotVec2(normals[i], cLocal) - dotVec2(normals[i], vertices[i]);
            if (s > radius) {
                // Early out.
                return;
            }
            if (s > separation) {
                separation = s;
                normalIndex = i;
            }
        }
        // Vertices that subtend the incident face.
        var vertIndex1 = normalIndex;
        var vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
        var v1 = vertices[vertIndex1];
        var v2 = vertices[vertIndex2];
        // If the center is inside the polygon ...
        if (separation < EPSILON) {
            manifold.pointCount = 1;
            manifold.type = exports.ManifoldType.e_faceA;
            copyVec2(manifold.localNormal, normals[normalIndex]);
            combineVec2(manifold.localPoint, 0.5, v1, 0.5, v2);
            copyVec2(manifold.points[0].localPoint, circleB.m_p);
            // manifold.points[0].id.key = 0;
            manifold.points[0].id.setFeatures(0, exports.ContactFeatureType.e_vertex, 0, exports.ContactFeatureType.e_vertex);
            return;
        }
        // Compute barycentric coordinates
        // u1 = (cLocal - v1) dot (v2 - v1))
        var u1 = dotVec2(cLocal, v2) - dotVec2(cLocal, v1) - dotVec2(v1, v2) + dotVec2(v1, v1);
        // u2 = (cLocal - v2) dot (v1 - v2)
        var u2 = dotVec2(cLocal, v1) - dotVec2(cLocal, v2) - dotVec2(v2, v1) + dotVec2(v2, v2);
        if (u1 <= 0.0) {
            if (distSqrVec2(cLocal, v1) > radius * radius) {
                return;
            }
            manifold.pointCount = 1;
            manifold.type = exports.ManifoldType.e_faceA;
            diffVec2(manifold.localNormal, cLocal, v1);
            normalizeVec2(manifold.localNormal);
            copyVec2(manifold.localPoint, v1);
            copyVec2(manifold.points[0].localPoint, circleB.m_p);
            // manifold.points[0].id.key = 0;
            manifold.points[0].id.setFeatures(0, exports.ContactFeatureType.e_vertex, 0, exports.ContactFeatureType.e_vertex);
        }
        else if (u2 <= 0.0) {
            if (distSqrVec2(cLocal, v2) > radius * radius) {
                return;
            }
            manifold.pointCount = 1;
            manifold.type = exports.ManifoldType.e_faceA;
            diffVec2(manifold.localNormal, cLocal, v2);
            normalizeVec2(manifold.localNormal);
            copyVec2(manifold.localPoint, v2);
            copyVec2(manifold.points[0].localPoint, circleB.m_p);
            // manifold.points[0].id.key = 0;
            manifold.points[0].id.setFeatures(0, exports.ContactFeatureType.e_vertex, 0, exports.ContactFeatureType.e_vertex);
        }
        else {
            combineVec2(faceCenter, 0.5, v1, 0.5, v2);
            var separation_1 = dotVec2(cLocal, normals[vertIndex1]) - dotVec2(faceCenter, normals[vertIndex1]);
            if (separation_1 > radius) {
                return;
            }
            manifold.pointCount = 1;
            manifold.type = exports.ManifoldType.e_faceA;
            copyVec2(manifold.localNormal, normals[vertIndex1]);
            copyVec2(manifold.localPoint, faceCenter);
            copyVec2(manifold.points[0].localPoint, circleB.m_p);
            // manifold.points[0].id.key = 0;
            manifold.points[0].id.setFeatures(0, exports.ContactFeatureType.e_vertex, 0, exports.ContactFeatureType.e_vertex);
        }
    };

    /*
     * Planck.js
     * The MIT License
     * Copyright (c) 2021 Erin Catto, Ali Shakiba
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    /** @internal */ var math_min = Math.min;
    Contact.addType(EdgeShape.TYPE, PolygonShape.TYPE, EdgePolygonContact);
    Contact.addType(ChainShape.TYPE, PolygonShape.TYPE, ChainPolygonContact);
    /** @internal */ function EdgePolygonContact(manifold, xfA, fA, indexA, xfB, fB, indexB) {
        CollideEdgePolygon(manifold, fA.getShape(), xfA, fB.getShape(), xfB);
    }
    // reused
    /** @internal */ var edge_reuse = new EdgeShape();
    /** @internal */ function ChainPolygonContact(manifold, xfA, fA, indexA, xfB, fB, indexB) {
        var chain = fA.getShape();
        chain.getChildEdge(edge_reuse, indexA);
        CollideEdgePolygon(manifold, edge_reuse, xfA, fB.getShape(), xfB);
    }
    /** @internal */ var EPAxisType;
    (function (EPAxisType) {
        EPAxisType[EPAxisType["e_unknown"] = -1] = "e_unknown";
        EPAxisType[EPAxisType["e_edgeA"] = 1] = "e_edgeA";
        EPAxisType[EPAxisType["e_edgeB"] = 2] = "e_edgeB";
    })(EPAxisType || (EPAxisType = {}));
    // unused?
    /** @internal */ var VertexType;
    (function (VertexType) {
        VertexType[VertexType["e_isolated"] = 0] = "e_isolated";
        VertexType[VertexType["e_concave"] = 1] = "e_concave";
        VertexType[VertexType["e_convex"] = 2] = "e_convex";
    })(VertexType || (VertexType = {}));
    /**
     * This structure is used to keep track of the best separating axis.
     */
    /** @internal */ var EPAxis = /** @class */ (function () {
        function EPAxis() {
        }
        return EPAxis;
    }());
    /**
     * This holds polygon B expressed in frame A.
     */
    /** @internal */ var TempPolygon = /** @class */ (function () {
        function TempPolygon() {
            this.vertices = []; // [Settings.maxPolygonVertices]
            this.normals = []; // [Settings.maxPolygonVertices];
            this.count = 0;
            for (var i = 0; i < SettingsInternal.maxPolygonVertices; i++) {
                this.vertices.push(vec2(0, 0));
                this.normals.push(vec2(0, 0));
            }
        }
        return TempPolygon;
    }());
    /**
     * Reference face used for clipping
     */
    /** @internal */ var ReferenceFace = /** @class */ (function () {
        function ReferenceFace() {
            this.v1 = vec2(0, 0);
            this.v2 = vec2(0, 0);
            this.normal = vec2(0, 0);
            this.sideNormal1 = vec2(0, 0);
            this.sideNormal2 = vec2(0, 0);
        }
        ReferenceFace.prototype.recycle = function () {
            zeroVec2(this.v1);
            zeroVec2(this.v2);
            zeroVec2(this.normal);
            zeroVec2(this.sideNormal1);
            zeroVec2(this.sideNormal2);
        };
        return ReferenceFace;
    }());
    // reused
    /** @internal */ var clipPoints1 = [new ClipVertex(), new ClipVertex()];
    /** @internal */ var clipPoints2 = [new ClipVertex(), new ClipVertex()];
    /** @internal */ var ie = [new ClipVertex(), new ClipVertex()];
    /** @internal */ var edgeAxis = new EPAxis();
    /** @internal */ var polygonAxis = new EPAxis();
    /** @internal */ var polygonBA = new TempPolygon();
    /** @internal */ var rf = new ReferenceFace();
    /** @internal */ var centroidB = vec2(0, 0);
    /** @internal */ var edge0 = vec2(0, 0);
    /** @internal */ var edge1 = vec2(0, 0);
    /** @internal */ var edge2 = vec2(0, 0);
    /** @internal */ var xf = transform(0, 0, 0);
    /** @internal */ var normal = vec2(0, 0);
    /** @internal */ var normal0 = vec2(0, 0);
    /** @internal */ var normal1 = vec2(0, 0);
    /** @internal */ var normal2 = vec2(0, 0);
    /** @internal */ var lowerLimit = vec2(0, 0);
    /** @internal */ var upperLimit = vec2(0, 0);
    /** @internal */ var perp = vec2(0, 0);
    /** @internal */ var n = vec2(0, 0);
    /**
     * This function collides and edge and a polygon, taking into account edge
     * adjacency.
     */
    var CollideEdgePolygon = function (manifold, edgeA, xfA, polygonB, xfB) {
        // Algorithm:
        // 1. Classify v1 and v2
        // 2. Classify polygon centroid as front or back
        // 3. Flip normal if necessary
        // 4. Initialize normal range to [-pi, pi] about face normal
        // 5. Adjust normal range according to adjacent edges
        // 6. Visit each separating axes, only accept axes within the range
        // 7. Return if _any_ axis indicates separation
        // 8. Clip
        // let m_type1: VertexType;
        // let m_type2: VertexType;
        invTransformTransform(xf, xfA, xfB);
        transformVec2(centroidB, xf, polygonB.m_centroid);
        var v0 = edgeA.m_vertex0;
        var v1 = edgeA.m_vertex1;
        var v2 = edgeA.m_vertex2;
        var v3 = edgeA.m_vertex3;
        var hasVertex0 = edgeA.m_hasVertex0;
        var hasVertex3 = edgeA.m_hasVertex3;
        diffVec2(edge1, v2, v1);
        normalizeVec2(edge1);
        setVec2(normal1, edge1.y, -edge1.x);
        var offset1 = dotVec2(normal1, centroidB) - dotVec2(normal1, v1);
        var offset0 = 0.0;
        var offset2 = 0.0;
        var convex1 = false;
        var convex2 = false;
        zeroVec2(normal0);
        zeroVec2(normal2);
        // Is there a preceding edge?
        if (hasVertex0) {
            diffVec2(edge0, v1, v0);
            normalizeVec2(edge0);
            setVec2(normal0, edge0.y, -edge0.x);
            convex1 = crossVec2Vec2(edge0, edge1) >= 0.0;
            offset0 = Vec2.dot(normal0, centroidB) - Vec2.dot(normal0, v0);
        }
        // Is there a following edge?
        if (hasVertex3) {
            diffVec2(edge2, v3, v2);
            normalizeVec2(edge2);
            setVec2(normal2, edge2.y, -edge2.x);
            convex2 = Vec2.crossVec2Vec2(edge1, edge2) > 0.0;
            offset2 = Vec2.dot(normal2, centroidB) - Vec2.dot(normal2, v2);
        }
        var front;
        zeroVec2(normal);
        zeroVec2(lowerLimit);
        zeroVec2(upperLimit);
        // Determine front or back collision. Determine collision normal limits.
        if (hasVertex0 && hasVertex3) {
            if (convex1 && convex2) {
                front = offset0 >= 0.0 || offset1 >= 0.0 || offset2 >= 0.0;
                if (front) {
                    copyVec2(normal, normal1);
                    copyVec2(lowerLimit, normal0);
                    copyVec2(upperLimit, normal2);
                }
                else {
                    setMulVec2(normal, -1, normal1);
                    setMulVec2(lowerLimit, -1, normal1);
                    setMulVec2(upperLimit, -1, normal1);
                }
            }
            else if (convex1) {
                front = offset0 >= 0.0 || (offset1 >= 0.0 && offset2 >= 0.0);
                if (front) {
                    copyVec2(normal, normal1);
                    copyVec2(lowerLimit, normal0);
                    copyVec2(upperLimit, normal1);
                }
                else {
                    setMulVec2(normal, -1, normal1);
                    setMulVec2(lowerLimit, -1, normal2);
                    setMulVec2(upperLimit, -1, normal1);
                }
            }
            else if (convex2) {
                front = offset2 >= 0.0 || (offset0 >= 0.0 && offset1 >= 0.0);
                if (front) {
                    copyVec2(normal, normal1);
                    copyVec2(lowerLimit, normal1);
                    copyVec2(upperLimit, normal2);
                }
                else {
                    setMulVec2(normal, -1, normal1);
                    setMulVec2(lowerLimit, -1, normal1);
                    setMulVec2(upperLimit, -1, normal0);
                }
            }
            else {
                front = offset0 >= 0.0 && offset1 >= 0.0 && offset2 >= 0.0;
                if (front) {
                    copyVec2(normal, normal1);
                    copyVec2(lowerLimit, normal1);
                    copyVec2(upperLimit, normal1);
                }
                else {
                    setMulVec2(normal, -1, normal1);
                    setMulVec2(lowerLimit, -1, normal2);
                    setMulVec2(upperLimit, -1, normal0);
                }
            }
        }
        else if (hasVertex0) {
            if (convex1) {
                front = offset0 >= 0.0 || offset1 >= 0.0;
                if (front) {
                    copyVec2(normal, normal1);
                    copyVec2(lowerLimit, normal0);
                    setMulVec2(upperLimit, -1, normal1);
                }
                else {
                    setMulVec2(normal, -1, normal1);
                    copyVec2(lowerLimit, normal1);
                    setMulVec2(upperLimit, -1, normal1);
                }
            }
            else {
                front = offset0 >= 0.0 && offset1 >= 0.0;
                if (front) {
                    copyVec2(normal, normal1);
                    copyVec2(lowerLimit, normal1);
                    setMulVec2(upperLimit, -1, normal1);
                }
                else {
                    setMulVec2(normal, -1, normal1);
                    copyVec2(lowerLimit, normal1);
                    setMulVec2(upperLimit, -1, normal0);
                }
            }
        }
        else if (hasVertex3) {
            if (convex2) {
                front = offset1 >= 0.0 || offset2 >= 0.0;
                if (front) {
                    copyVec2(normal, normal1);
                    setMulVec2(lowerLimit, -1, normal1);
                    copyVec2(upperLimit, normal2);
                }
                else {
                    setMulVec2(normal, -1, normal1);
                    setMulVec2(lowerLimit, -1, normal1);
                    copyVec2(upperLimit, normal1);
                }
            }
            else {
                front = offset1 >= 0.0 && offset2 >= 0.0;
                if (front) {
                    copyVec2(normal, normal1);
                    setMulVec2(lowerLimit, -1, normal1);
                    copyVec2(upperLimit, normal1);
                }
                else {
                    setMulVec2(normal, -1, normal1);
                    setMulVec2(lowerLimit, -1, normal2);
                    copyVec2(upperLimit, normal1);
                }
            }
        }
        else {
            front = offset1 >= 0.0;
            if (front) {
                copyVec2(normal, normal1);
                setMulVec2(lowerLimit, -1, normal1);
                setMulVec2(upperLimit, -1, normal1);
            }
            else {
                setMulVec2(normal, -1, normal1);
                copyVec2(lowerLimit, normal1);
                copyVec2(upperLimit, normal1);
            }
        }
        // Get polygonB in frameA
        polygonBA.count = polygonB.m_count;
        for (var i = 0; i < polygonB.m_count; ++i) {
            transformVec2(polygonBA.vertices[i], xf, polygonB.m_vertices[i]);
            rotVec2(polygonBA.normals[i], xf.q, polygonB.m_normals[i]);
        }
        var radius = polygonB.m_radius + edgeA.m_radius;
        manifold.pointCount = 0;
        { // ComputeEdgeSeparation
            edgeAxis.type = EPAxisType.e_edgeA;
            edgeAxis.index = front ? 0 : 1;
            edgeAxis.separation = Infinity;
            for (var i = 0; i < polygonBA.count; ++i) {
                var v = polygonBA.vertices[i];
                var s = dotVec2(normal, v) - dotVec2(normal, v1);
                if (s < edgeAxis.separation) {
                    edgeAxis.separation = s;
                }
            }
        }
        // If no valid normal can be found than this edge should not collide.
        // @ts-ignore todo: why we need this if here?
        if (edgeAxis.type == EPAxisType.e_unknown) {
            return;
        }
        if (edgeAxis.separation > radius) {
            return;
        }
        { // ComputePolygonSeparation
            polygonAxis.type = EPAxisType.e_unknown;
            polygonAxis.index = -1;
            polygonAxis.separation = -Infinity;
            setVec2(perp, -normal.y, normal.x);
            for (var i = 0; i < polygonBA.count; ++i) {
                setMulVec2(n, -1, polygonBA.normals[i]);
                var s1 = dotVec2(n, polygonBA.vertices[i]) - dotVec2(n, v1);
                var s2 = dotVec2(n, polygonBA.vertices[i]) - dotVec2(n, v2);
                var s = math_min(s1, s2);
                if (s > radius) {
                    // No collision
                    polygonAxis.type = EPAxisType.e_edgeB;
                    polygonAxis.index = i;
                    polygonAxis.separation = s;
                    break;
                }
                // Adjacency
                if (dotVec2(n, perp) >= 0.0) {
                    if (dotVec2(n, normal) - dotVec2(upperLimit, normal) < -SettingsInternal.angularSlop) {
                        continue;
                    }
                }
                else {
                    if (dotVec2(n, normal) - dotVec2(lowerLimit, normal) < -SettingsInternal.angularSlop) {
                        continue;
                    }
                }
                if (s > polygonAxis.separation) {
                    polygonAxis.type = EPAxisType.e_edgeB;
                    polygonAxis.index = i;
                    polygonAxis.separation = s;
                }
            }
        }
        if (polygonAxis.type != EPAxisType.e_unknown && polygonAxis.separation > radius) {
            return;
        }
        // Use hysteresis for jitter reduction.
        var k_relativeTol = 0.98;
        var k_absoluteTol = 0.001;
        var primaryAxis;
        if (polygonAxis.type == EPAxisType.e_unknown) {
            primaryAxis = edgeAxis;
        }
        else if (polygonAxis.separation > k_relativeTol * edgeAxis.separation + k_absoluteTol) {
            primaryAxis = polygonAxis;
        }
        else {
            primaryAxis = edgeAxis;
        }
        ie[0].recycle(), ie[1].recycle();
        if (primaryAxis.type == EPAxisType.e_edgeA) {
            manifold.type = exports.ManifoldType.e_faceA;
            // Search for the polygon normal that is most anti-parallel to the edge
            // normal.
            var bestIndex = 0;
            var bestValue = dotVec2(normal, polygonBA.normals[0]);
            for (var i = 1; i < polygonBA.count; ++i) {
                var value = dotVec2(normal, polygonBA.normals[i]);
                if (value < bestValue) {
                    bestValue = value;
                    bestIndex = i;
                }
            }
            var i1 = bestIndex;
            var i2 = i1 + 1 < polygonBA.count ? i1 + 1 : 0;
            copyVec2(ie[0].v, polygonBA.vertices[i1]);
            ie[0].id.setFeatures(0, exports.ContactFeatureType.e_face, i1, exports.ContactFeatureType.e_vertex);
            copyVec2(ie[1].v, polygonBA.vertices[i2]);
            ie[1].id.setFeatures(0, exports.ContactFeatureType.e_face, i2, exports.ContactFeatureType.e_vertex);
            if (front) {
                rf.i1 = 0;
                rf.i2 = 1;
                copyVec2(rf.v1, v1);
                copyVec2(rf.v2, v2);
                copyVec2(rf.normal, normal1);
            }
            else {
                rf.i1 = 1;
                rf.i2 = 0;
                copyVec2(rf.v1, v2);
                copyVec2(rf.v2, v1);
                setMulVec2(rf.normal, -1, normal1);
            }
        }
        else {
            manifold.type = exports.ManifoldType.e_faceB;
            copyVec2(ie[0].v, v1);
            ie[0].id.setFeatures(0, exports.ContactFeatureType.e_vertex, primaryAxis.index, exports.ContactFeatureType.e_face);
            copyVec2(ie[1].v, v2);
            ie[1].id.setFeatures(0, exports.ContactFeatureType.e_vertex, primaryAxis.index, exports.ContactFeatureType.e_face);
            rf.i1 = primaryAxis.index;
            rf.i2 = rf.i1 + 1 < polygonBA.count ? rf.i1 + 1 : 0;
            copyVec2(rf.v1, polygonBA.vertices[rf.i1]);
            copyVec2(rf.v2, polygonBA.vertices[rf.i2]);
            copyVec2(rf.normal, polygonBA.normals[rf.i1]);
        }
        setVec2(rf.sideNormal1, rf.normal.y, -rf.normal.x);
        setVec2(rf.sideNormal2, -rf.sideNormal1.x, -rf.sideNormal1.y);
        rf.sideOffset1 = dotVec2(rf.sideNormal1, rf.v1);
        rf.sideOffset2 = dotVec2(rf.sideNormal2, rf.v2);
        // Clip incident edge against extruded edge1 side edges.
        clipPoints1[0].recycle(), clipPoints1[1].recycle();
        clipPoints2[0].recycle(), clipPoints2[1].recycle();
        // Clip to box side 1
        var np1 = clipSegmentToLine(clipPoints1, ie, rf.sideNormal1, rf.sideOffset1, rf.i1);
        if (np1 < SettingsInternal.maxManifoldPoints) {
            return;
        }
        // Clip to negative box side 1
        var np2 = clipSegmentToLine(clipPoints2, clipPoints1, rf.sideNormal2, rf.sideOffset2, rf.i2);
        if (np2 < SettingsInternal.maxManifoldPoints) {
            return;
        }
        // Now clipPoints2 contains the clipped points.
        if (primaryAxis.type == EPAxisType.e_edgeA) {
            copyVec2(manifold.localNormal, rf.normal);
            copyVec2(manifold.localPoint, rf.v1);
        }
        else {
            copyVec2(manifold.localNormal, polygonB.m_normals[rf.i1]);
            copyVec2(manifold.localPoint, polygonB.m_vertices[rf.i1]);
        }
        var pointCount = 0;
        for (var i = 0; i < SettingsInternal.maxManifoldPoints; ++i) {
            var separation = dotVec2(rf.normal, clipPoints2[i].v) - dotVec2(rf.normal, rf.v1);
            if (separation <= radius) {
                var cp = manifold.points[pointCount]; // ManifoldPoint
                if (primaryAxis.type == EPAxisType.e_edgeA) {
                    invTransformVec2(cp.localPoint, xf, clipPoints2[i].v);
                    cp.id.set(clipPoints2[i].id);
                }
                else {
                    copyVec2(cp.localPoint, clipPoints2[i].v);
                    cp.id.set(clipPoints2[i].id);
                    cp.id.swapFeatures();
                }
                ++pointCount;
            }
        }
        manifold.pointCount = pointCount;
    };

    /** @deprecated Merged with main namespace */
    var internal = {
        CollidePolygons: CollidePolygons,
        Settings: SettingsInternal,
        Sweep: Sweep,
        Manifold: Manifold,
        Distance: Distance,
        TimeOfImpact: TimeOfImpact,
        DynamicTree: DynamicTree,
        stats: stats
    };

    var planck = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Math: math,
        Serializer: Serializer,
        Testbed: Testbed,
        testbed: testbed,
        Vec2: Vec2,
        Vec3: Vec3,
        Mat22: Mat22,
        Mat33: Mat33,
        Transform: Transform,
        Rot: Rot,
        AABB: AABB,
        Shape: Shape,
        FixtureProxy: FixtureProxy,
        Fixture: Fixture,
        Body: Body,
        ContactEdge: ContactEdge,
        mixFriction: mixFriction,
        mixRestitution: mixRestitution,
        VelocityConstraintPoint: VelocityConstraintPoint,
        Contact: Contact,
        JointEdge: JointEdge,
        Joint: Joint,
        World: World,
        CircleShape: CircleShape,
        Circle: Circle,
        EdgeShape: EdgeShape,
        Edge: Edge,
        PolygonShape: PolygonShape,
        Polygon: Polygon,
        ChainShape: ChainShape,
        Chain: Chain,
        BoxShape: BoxShape,
        Box: Box,
        CollideCircles: CollideCircles,
        CollideEdgeCircle: CollideEdgeCircle,
        CollidePolygons: CollidePolygons,
        CollidePolygonCircle: CollidePolygonCircle,
        CollideEdgePolygon: CollideEdgePolygon,
        DistanceJoint: DistanceJoint,
        FrictionJoint: FrictionJoint,
        GearJoint: GearJoint,
        MotorJoint: MotorJoint,
        MouseJoint: MouseJoint,
        PrismaticJoint: PrismaticJoint,
        PulleyJoint: PulleyJoint,
        RevoluteJoint: RevoluteJoint,
        RopeJoint: RopeJoint,
        WeldJoint: WeldJoint,
        WheelJoint: WheelJoint,
        Settings: Settings,
        SettingsInternal: SettingsInternal,
        Sweep: Sweep,
        get ManifoldType () { return exports.ManifoldType; },
        get ContactFeatureType () { return exports.ContactFeatureType; },
        get PointState () { return exports.PointState; },
        ClipVertex: ClipVertex,
        Manifold: Manifold,
        ManifoldPoint: ManifoldPoint,
        ContactID: ContactID,
        WorldManifold: WorldManifold,
        getPointStates: getPointStates,
        clipSegmentToLine: clipSegmentToLine,
        DistanceInput: DistanceInput,
        DistanceOutput: DistanceOutput,
        SimplexCache: SimplexCache,
        Distance: Distance,
        DistanceProxy: DistanceProxy,
        testOverlap: testOverlap,
        ShapeCastInput: ShapeCastInput,
        ShapeCastOutput: ShapeCastOutput,
        ShapeCast: ShapeCast,
        TOIInput: TOIInput,
        get TOIOutputState () { return exports.TOIOutputState; },
        TOIOutput: TOIOutput,
        TimeOfImpact: TimeOfImpact,
        TreeNode: TreeNode,
        DynamicTree: DynamicTree,
        stats: stats,
        internal: internal
    });

    exports.AABB = AABB;
    exports.Body = Body;
    exports.Box = Box;
    exports.BoxShape = BoxShape;
    exports.Chain = Chain;
    exports.ChainShape = ChainShape;
    exports.Circle = Circle;
    exports.CircleShape = CircleShape;
    exports.ClipVertex = ClipVertex;
    exports.CollideCircles = CollideCircles;
    exports.CollideEdgeCircle = CollideEdgeCircle;
    exports.CollideEdgePolygon = CollideEdgePolygon;
    exports.CollidePolygonCircle = CollidePolygonCircle;
    exports.CollidePolygons = CollidePolygons;
    exports.Contact = Contact;
    exports.ContactEdge = ContactEdge;
    exports.ContactID = ContactID;
    exports.Distance = Distance;
    exports.DistanceInput = DistanceInput;
    exports.DistanceJoint = DistanceJoint;
    exports.DistanceOutput = DistanceOutput;
    exports.DistanceProxy = DistanceProxy;
    exports.DynamicTree = DynamicTree;
    exports.Edge = Edge;
    exports.EdgeShape = EdgeShape;
    exports.Fixture = Fixture;
    exports.FixtureProxy = FixtureProxy;
    exports.FrictionJoint = FrictionJoint;
    exports.GearJoint = GearJoint;
    exports.Joint = Joint;
    exports.JointEdge = JointEdge;
    exports.Manifold = Manifold;
    exports.ManifoldPoint = ManifoldPoint;
    exports.Mat22 = Mat22;
    exports.Mat33 = Mat33;
    exports.Math = math;
    exports.MotorJoint = MotorJoint;
    exports.MouseJoint = MouseJoint;
    exports.Polygon = Polygon;
    exports.PolygonShape = PolygonShape;
    exports.PrismaticJoint = PrismaticJoint;
    exports.PulleyJoint = PulleyJoint;
    exports.RevoluteJoint = RevoluteJoint;
    exports.RopeJoint = RopeJoint;
    exports.Rot = Rot;
    exports.Serializer = Serializer;
    exports.Settings = Settings;
    exports.SettingsInternal = SettingsInternal;
    exports.Shape = Shape;
    exports.ShapeCast = ShapeCast;
    exports.ShapeCastInput = ShapeCastInput;
    exports.ShapeCastOutput = ShapeCastOutput;
    exports.SimplexCache = SimplexCache;
    exports.Sweep = Sweep;
    exports.TOIInput = TOIInput;
    exports.TOIOutput = TOIOutput;
    exports.Testbed = Testbed;
    exports.TimeOfImpact = TimeOfImpact;
    exports.Transform = Transform;
    exports.TreeNode = TreeNode;
    exports.Vec2 = Vec2;
    exports.Vec3 = Vec3;
    exports.VelocityConstraintPoint = VelocityConstraintPoint;
    exports.WeldJoint = WeldJoint;
    exports.WheelJoint = WheelJoint;
    exports.World = World;
    exports.WorldManifold = WorldManifold;
    exports.clipSegmentToLine = clipSegmentToLine;
    exports["default"] = planck;
    exports.getPointStates = getPointStates;
    exports.internal = internal;
    exports.mixFriction = mixFriction;
    exports.mixRestitution = mixRestitution;
    exports.stats = stats;
    exports.testOverlap = testOverlap;
    exports.testbed = testbed;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=planck.js.map
