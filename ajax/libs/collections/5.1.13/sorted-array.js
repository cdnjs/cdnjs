"use strict";

module.exports = SortedArray;

var Shim = require("./shim");
var GenericCollection = require("./generic-collection");
var PropertyChanges = require("./listen/property-changes");
var RangeChanges = require("./listen/range-changes");

function SortedArray(values, equals, compare, getDefault) {
    if (!(this instanceof SortedArray)) {
        return new SortedArray(values, equals, compare, getDefault);
    }
    if (Array.isArray(values)) {
        this.array = values;
        values = values.splice(0, values.length);
    } else {
        this.array = [];
    }
    this.contentEquals = equals || Object.equals;
    this.contentCompare = compare || Object.compare;
    this.getDefault = getDefault || Function.noop;

    this.length = 0;
    this.addEach(values);
}

// hack so require("sorted-array").SortedArray will work in MontageJS
SortedArray.SortedArray = SortedArray;

SortedArray.from = GenericCollection.from;

Object.addEach(SortedArray.prototype, GenericCollection.prototype);
Object.addEach(SortedArray.prototype, PropertyChanges.prototype);
Object.addEach(SortedArray.prototype, RangeChanges.prototype);

SortedArray.prototype.isSorted = true;

function search(array, value, compare) {
    var first = 0;
    var last = array.length - 1;
    while (first <= last) {
        var middle = (first + last) >> 1; // Math.floor( / 2)
        var comparison = compare(value, array[middle]);
        if (comparison > 0) {
            first = middle + 1;
        } else if (comparison < 0) {
            last = middle - 1;
        } else {
            return middle;
        }
    }
    return -(first + 1);
}

function determineIncomparableRange(index, array, value, compare, equals) {
    // Return the inclusive start and end indices of the incomparable streak containing value.
    var start = index;
    var end = index;

    while (start > 0 && compare(value, array[start - 1]) === 0) {
        start--;
    }

    while (end < array.length - 1 && compare(value, array[end + 1]) === 0) {
        end++;
    }

    return {start: start, end: end};
}

function searchFirst(array, value, compare, equals) {
    var index = search(array, value, compare);
    if (index < 0) {
        return -1;
    } else {
        var range = determineIncomparableRange(index, array, value, compare, equals);

        for (var i = range.start; i <= range.end; i++) {
            if (equals(value, array[i])) {
                return i;
            }
        }

        return -1;
    }
}

function searchLast(array, value, compare, equals) {
    var index = search(array, value, compare);
    if (index < 0) {
        return -1;
    } else {
        var range = determineIncomparableRange(index, array, value, compare, equals);

        for (var i = range.end; i >= range.start; i--) {
            if (equals(value, array[i])) {
                return i;
            }
        }

        return -1;
    }
}

function searchForInsertionIndex(array, value, compare) {
    var index = search(array, value, compare);
    if (index < 0) {
        return -index - 1;
    } else {
        var last = array.length - 1;
        while (index < last && compare(value, array[index + 1]) === 0) {
            index++;
        }
        return index;
    }
}

SortedArray.prototype.constructClone = function (values) {
    return new this.constructor(
        values,
        this.contentEquals,
        this.contentCompare,
        this.getDefault
    );
};

SortedArray.prototype.has = function (value, equals) {
    if (equals) {
        throw new Error("SortedSet#has does not support second argument: equals");
    }
    var index = searchFirst(this.array, value, this.contentCompare, this.contentEquals);
    return index !== -1;
};

SortedArray.prototype.get = function (value, equals) {
    if (equals) {
        throw new Error("SortedArray#get does not support second argument: equals");
    }
    var index = searchFirst(this.array, value, this.contentCompare, this.contentEquals);
    if (index !== -1) {
        return this.array[index];
    } else {
        return this.getDefault(value);
    }
};

SortedArray.prototype.add = function (value) {
    var index = searchForInsertionIndex(this.array, value, this.contentCompare);
    if (this.dispatchesRangeChanges) {
        this.dispatchBeforeRangeChange([value], Array.empty, index);
    }
    this.array.splice(index, 0, value);
    this.length++;
    if (this.dispatchesRangeChanges) {
        this.dispatchRangeChange([value], Array.empty, index);
    }
    return true;
};

SortedArray.prototype["delete"] = function (value, equals) {
    if (equals) {
        throw new Error("SortedArray#delete does not support second argument: equals");
    }
    var index = searchFirst(this.array, value, this.contentCompare, this.contentEquals);
    if (index !== -1) {
        if (this.dispatchesRangeChanges) {
            this.dispatchBeforeRangeChange(Array.empty, [value], index);
        }
        this.array.spliceOne(index);
        this.length--;
        if (this.dispatchesRangeChanges) {
            this.dispatchRangeChange(Array.empty, [value], index);
        }
        return true;
    } else {
        return false;
    }
};

SortedArray.prototype.deleteAll = function (value, equals) {
    if (equals) {
        var count = this.array.deleteAll(value, equals);
        this.length -= count;
        return count;
    } else {
        var start = searchFirst(this.array, value, this.contentCompare, this.contentEquals);
        if (start !== -1) {
            var end = start;
            while (this.contentEquals(value, this.array[end])) {
                end++;
            }
            var minus = this.slice(start, end);
            if (this.dispatchesRangeChanges) {
                this.dispatchBeforeRangeChange(Array.empty, minus, start);
            }
            this.array.splice(start, minus.length);
            this.length -= minus.length;
            if (this.dispatchesRangeChanges) {
                this.dispatchRangeChange(Array.empty, minus, start);
            }
            return minus.length;
        } else {
            return 0;
        }
    }
};

SortedArray.prototype.indexOf = function (value) {
    // TODO throw error if provided a start index
    return searchFirst(this.array, value, this.contentCompare, this.contentEquals);
};

SortedArray.prototype.lastIndexOf = function (value) {
    // TODO throw error if provided a start index
    return searchLast(this.array, value, this.contentCompare, this.contentEquals);
};

var deprecatedWarnNonce = {};
function deprecatedWarn(msg, notOnce) {
    if (
        typeof console !== 'undefined' &&
            typeof console.warn === 'function' &&
                (notOnce !== true && deprecatedWarnNonce.hasOwnProperty(msg) === false)
    ) {
        console.warn(msg);
        deprecatedWarnNonce[msg]++;
    }
}

// TODO remove in v6 (not present in v2)
SortedArray.prototype.find = function (value, equals, index) {
    deprecatedWarn('This SortedArray#find usage is deprecated please use SortedArray#findValue');
    return this.findValue.apply(this, arguments);
};

SortedArray.prototype.findValue = function (value, equals, index) {
    // TODO throw error if provided a start index
    if (equals) {
        throw new Error("SortedArray#findValue does not support second argument: equals");
    }
    if (index) {
        throw new Error("SortedArray#findValue does not support third argument: index");
    }
    // TODO support initial partition index
    return searchFirst(this.array, value, this.contentCompare, this.contentEquals);
};

// TODO remove in v6 (not present in v2)
SortedArray.prototype.findLast = function (value, equals, index) {
    deprecatedWarn('This SortedArray#findLast usage is deprecated please use SortedArray#findLastValue');
    return this.findLastValue.apply(this, arguments);
};

SortedArray.prototype.findLastValue = function (value, equals, index) {
    if (equals) {
        throw new Error("SortedArray#findLastValue does not support second argument: equals");
    }
    if (index) {
        throw new Error("SortedArray#findLastValue does not support third argument: index");
    }
    // TODO support initial partition index
    return searchLast(this.array, value, this.contentCompare, this.contentEquals);
};

SortedArray.prototype.push = function () {
    this.addEach(arguments);
};

SortedArray.prototype.unshift = function () {
    this.addEach(arguments);
};

SortedArray.prototype.pop = function () {
    var val = this.array.pop();
    this.length = this.array.length;
    return val;
};

SortedArray.prototype.shift = function () {
    var val = this.array.shift();
    this.length = this.array.length;
    return val;
};

SortedArray.prototype.slice = function () {
    return this.array.slice.apply(this.array, arguments);
};

SortedArray.prototype.splice = function (index, length /*...plus*/) {
    return this.swap(index, length, Array.prototype.slice.call(arguments, 2));
};

SortedArray.prototype.swap = function (index, length, plus) {
    if (index === undefined && length === undefined) {
        return Array.empty;
    }
    index = index || 0;
    if (index < 0) {
        index += this.length;
    }
    if (length === undefined) {
        length = Infinity;
    }
    var minus = this.slice(index, index + length);
    if (this.dispatchesRangeChanges) {
        this.dispatchBeforeRangeChange(plus, minus, index);
    }
    this.array.splice(index, length);
    this.length -= minus.length;
    if (this.dispatchesRangeChanges) {
        this.dispatchRangeChange(Array.empty, minus, index);
    }
    this.addEach(plus);
    return minus;
};

SortedArray.prototype.reduce = function (callback, basis /*, thisp*/) {
    var thisp = arguments[2];
    return this.array.reduce(function (basis, value, key) {
        return callback.call(thisp, basis, value, key, this);
    }, basis, this);
};

SortedArray.prototype.reduceRight = function () {
    var thisp = arguments[2];
    return this.array.reduceRight(function (basis, value, key) {
        return callback.call(thisp, basis, value, key, this);
    }, basis, this);
};

SortedArray.prototype.min = function () {
    if (this.length) {
        return this.array[0];
    }
};

SortedArray.prototype.max = function () {
    if (this.length) {
        return this.array[this.length - 1];
    }
};

SortedArray.prototype.one = function () {
    return this.array.one();
};

SortedArray.prototype.clear = function () {
    var minus;
    if (this.dispatchesRangeChanges) {
        minus = this.array.slice();
        this.dispatchBeforeRangeChange(Array.empty, minus, 0);
    }
    this.length = 0;
    this.array.clear();
    if (this.dispatchesRangeChanges) {
        this.dispatchRangeChange(Array.empty, minus, 0);
    }
};

SortedArray.prototype.equals = function (that, equals) {
    return this.array.equals(that, equals);
};

SortedArray.prototype.compare = function (that, compare) {
    return this.array.compare(that, compare);
};

SortedArray.prototype.iterate = function (start, end) {
    return new this.Iterator(this.array, start, end);
};

SortedArray.prototype.toJSON = function () {
    return this.toArray();
};

SortedArray.prototype.Iterator = Array.prototype.Iterator;
