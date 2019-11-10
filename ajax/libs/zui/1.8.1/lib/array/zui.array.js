/*!
 * ZUI: 数组辅助方法 - v1.8.1 - 2018-01-18
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2018 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: array.js
 * Array Polyfill.
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */

// Some polyfills copy from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

(function() {
    'use strict';

    var STR_FUNCTION = 'function';

    /**
     *  Calls a function for each element in the array.
     */
    if(!Array.prototype.forEach) {
        Array.prototype.forEach = function(fun /*, thisp*/ ) {
            var len = this.length;
            if(typeof fun != STR_FUNCTION)
                throw new TypeError();

            var thisp = arguments[1];
            for(var i = 0; i < len; i++) {
                if(i in this) {
                    fun.call(thisp, this[i], i, this);
                }
            }
        };
    }

    /**
     * Judge an object is an real array
     */
    if(!Array.isArray) {
        Array.isArray = function(obj) {
            return Object.toString.call(obj) === '[object Array]';
        };
    }

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

    /**
     * Returns true if at least one element in this array satisfies the provided testing conditions.
     * @param  {function or plain object}  conditions
     * @return {Boolean}
     */
    if(!Array.prototype.has) {
        Array.prototype.has = function(conditions) {
            var result = false,
                cdt, ok, objVal;
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
                if(ok) {
                    result = true;
                    return false;
                }
            });

            return result;
        };
    }
}());
