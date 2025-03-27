/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import ApproximationRegistry from './ApproximationRegistry.js';
import U from '../../Core/Utilities.js';
const { arrayMax, arrayMin, correctFloat, extend, isNumber } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function average(arr) {
    const len = arr.length;
    let ret = sum(arr);
    // If we have a number, return it divided by the length. If not,
    // return null or undefined based on what the sum method finds.
    if (isNumber(ret) && len) {
        ret = correctFloat(ret / len);
    }
    return ret;
}
/**
 * The same as average, but for series with multiple values, like area ranges.
 * @private
 */
function averages() {
    const ret = [];
    [].forEach.call(arguments, function (arr) {
        ret.push(average(arr));
    });
    // Return undefined when first elem. is undefined and let
    // sum method handle null (#7377)
    return typeof ret[0] === 'undefined' ? void 0 : ret;
}
/**
 * @private
 */
function close(arr) {
    return arr.length ?
        arr[arr.length - 1] :
        (arr.hasNulls ? null : void 0);
}
/**
 * @private
 */
function high(arr) {
    return arr.length ?
        arrayMax(arr) :
        (arr.hasNulls ? null : void 0);
}
/**
 * HLC, OHLC and range are special cases where a multidimensional array is input
 * and an array is output.
 * @private
 */
function hlc(high, low, close) {
    high = ApproximationRegistry.high(high);
    low = ApproximationRegistry.low(low);
    close = ApproximationRegistry.close(close);
    if (isNumber(high) ||
        isNumber(low) ||
        isNumber(close)) {
        return [high, low, close];
    }
}
/**
 * @private
 */
function low(arr) {
    return arr.length ?
        arrayMin(arr) :
        (arr.hasNulls ? null : void 0);
}
/**
 * @private
 */
function ohlc(open, high, low, close) {
    open = ApproximationRegistry.open(open);
    high = ApproximationRegistry.high(high);
    low = ApproximationRegistry.low(low);
    close = ApproximationRegistry.close(close);
    if (isNumber(open) ||
        isNumber(high) ||
        isNumber(low) ||
        isNumber(close)) {
        return [open, high, low, close];
    }
}
/**
 * @private
 */
function open(arr) {
    return arr.length ? arr[0] : (arr.hasNulls ? null : void 0);
}
/**
 * @private
 */
function range(low, high) {
    low = ApproximationRegistry.low(low);
    high = ApproximationRegistry.high(high);
    if (isNumber(low) || isNumber(high)) {
        return [low, high];
    }
    if (low === null && high === null) {
        return null;
    }
    // Else, return is undefined
}
/**
 * @private
 */
function sum(arr) {
    let len = arr.length, ret;
    // 1. it consists of nulls exclusive
    if (!len && arr.hasNulls) {
        ret = null;
        // 2. it has a length and real values
    }
    else if (len) {
        ret = 0;
        while (len--) {
            ret += arr[len];
        }
    }
    // 3. it has zero length, so just return undefined
    // => doNothing()
    return ret;
}
/* *
 *
 *  Default Export
 *
 * */
const ApproximationDefaults = {
    average,
    averages,
    close,
    high,
    hlc,
    low,
    ohlc,
    open,
    range,
    sum
};
extend(ApproximationRegistry, ApproximationDefaults);
export default ApproximationDefaults;
