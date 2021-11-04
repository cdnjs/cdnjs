/*!
 * ZUI: 数组辅助方法 - v1.10.0 - 2021-11-04
 * http://openzui.com
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2021 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: array.js
 * Array polyfills.
 * http://openzui.com
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */

// Some polyfills copy from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

(function() {
    'use strict';

    var STR_FUNCTION = 'function';

    /**
     * Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found.
     */
    if(!Array.prototype.lastIndexOf) {
        Array.prototype.lastIndexOf = function(elt /*, from*/ ) {
            var len = this.length;

            var from = Number(arguments[1]);
            if(isNaN(from)) {
                from = len - 1;
            } else {
                from = (from < 0) ? Math.ceil(from) : Math.floor(from);
                if(from < 0)
                    from += len;
                else if(from >= len)
                    from = len - 1;
            }

            for(; from > -1; from--) {
                if(from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

    /**
     * Returns true if every element in this array satisfies the provided testing function.
     */
    if(!Array.prototype.every) {
        Array.prototype.every = function(fun /*, thisp*/ ) {
            var len = this.length;
            if(typeof fun != STR_FUNCTION)
                throw new TypeError();

            var thisp = arguments[1];
            for(var i = 0; i < len; i++) {
                if(i in this &&
                    !fun.call(thisp, this[i], i, this))
                    return false;
            }

            return true;
        };
    }

    /**
     * Creates a new array with all of the elements of this array for which the provided filtering function returns true.
     */
    if(!Array.prototype.filter) {
        Array.prototype.filter = function(fun /*, thisp*/ ) {
            var len = this.length;
            if(typeof fun != STR_FUNCTION)
                throw new TypeError();

            var res = [];
            var thisp = arguments[1];
            for(var i = 0; i < len; i++) {
                if(i in this) {
                    var val = this[i]; // in case fun mutates this
                    if(fun.call(thisp, val, i, this))
                        res.push(val);
                }
            }

            return res;
        };
    }

    /**
     * Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
     */
    if(!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt /*, from*/ ) {
            var len = this.length;

            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if(from < 0)
                from += len;

            for(; from < len; from++) {
                if(from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

    /**
     * Creates a new array with the results of calling a provided function on every element in this array.
     */
    if(!Array.prototype.map) {
        Array.prototype.map = function(fun /*, thisp*/ ) {
            var len = this.length;
            if(typeof fun != STR_FUNCTION)
                throw new TypeError();

            var res = new Array(len);
            var thisp = arguments[1];
            for(var i = 0; i < len; i++) {
                if(i in this)
                    res[i] = fun.call(thisp, this[i], i, this);
            }

            return res;
        };
    }

    /**
     * Creates a new array with the results match the condistions
     * @param  {plain object or function} conditions
     * @param  {array} result
     * @return {array}
     */
    if(!Array.prototype.where) {
        Array.prototype.where = function(conditions, result) {
            result = result || [];
            var cdt, ok, objVal;
            this.forEach(function(val) {
                ok = true;
                for(var key in conditions) {
                    cdt = conditions[key];
                    if(typeof cdt === STR_FUNCTION) {
                        ok = cdt(val);
                    } else {
                        objVal = val[key];
                        ok = (objVal && objVal === cdt);
                    }
                    if(!ok) break;
                }
                if(ok) result.push(val);
            });

            return result;
        };
    }

    /**
     * Return a object contains grouped result as object key
     * @param  {string} key
     * @return {Object}
     */
    if(!Array.prototype.groupBy) {
        Array.prototype.groupBy = function(key) {
            var result = {};
            this.forEach(function(val) {
                var keyName = val[key];
                if(!keyName) {
                    keyName = 'unkown';
                }

                if(!result[keyName]) {
                    result[keyName] = [];
                }
                result[keyName].push(val);
            });
            return result;
        };
    }

    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function (predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return undefined.
                return undefined;
            }
        });
    }

    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function (predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return -1.
                return -1;
            }
        });
    }
}());
