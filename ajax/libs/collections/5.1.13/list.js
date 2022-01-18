"use strict";


var _List = require("./_list");
var PropertyChanges = require("./listen/property-changes");
var RangeChanges = require("./listen/range-changes");

module.exports = List;

function List(values, equals, getDefault) {
    return _List._init(List, this, values, equals, getDefault);
}
List.prototype = new _List();
List.prototype.constructor = List;
List.List = List; // hack so require("list").List will work in MontageJS
List.from = _List.from;

Object.addEach(List.prototype, PropertyChanges.prototype);
Object.addEach(List.prototype, RangeChanges.prototype);

List.prototype.makeObservable = function () {
    this.head.index = -1;
    this.updateIndexes(this.head.next, 0);
    this.dispatchesRangeChanges = true;
};

Object.defineProperties(List.prototype, {
    "_dispatchEmptyArray": {
        value: []
    }
});

/*
var list_clear = _List.prototype.clear,
    set_add = GlobalSet.prototype.add,
    set_delete = GlobalSet.prototype.delete;
*/

// LIFO (delete removes the most recently added equivalent value)
List.prototype["delete"] = function (value, equals) {
    var found = this.findLast(value, equals);
    if (found) {
        if (this.dispatchesRangeChanges) {
            var plus = [];
            var minus = [value];
            this.dispatchBeforeRangeChange(plus, minus, found.index);
        }
        found["delete"]();
        this.length--;
        if (this.dispatchesRangeChanges) {
            this.updateIndexes(found.next, found.index);
            this.dispatchRangeChange(plus, minus, found.index);
        }
        return true;
    }
    return false;
};

Object.defineProperty(List.prototype, "superClear", {
    value: _List.prototype.clear,
    enumerable: false,
    configurable: true,
    writable:true
});
List.prototype.clear = function () {
    var plus, minus;
    if (this.dispatchesRangeChanges) {
        minus = this.toArray();
        plus = [];
        this.dispatchBeforeRangeChange(plus, minus, 0);
    }
    this.superClear();
    if (this.dispatchesRangeChanges) {
        this.dispatchRangeChange(plus, minus, 0);
    }
};

List.prototype.add = function (value) {
    var node = new this.Node(value)
    if (this.dispatchesRangeChanges) {
        node.index = this.length;
        this.dispatchBeforeRangeChange([value], [], node.index);
    }

    this._addNode(node);

    if (this.dispatchesRangeChanges) {
        this.dispatchRangeChange([value], [], node.index);
    }
    return true;
};

Object.defineProperty(List.prototype, "superPush", {
    value: _List.prototype.push,
    enumerable: false,
    configurable: true,
    writable:true
});

List.prototype.push = function () {
    if (this.dispatchesRangeChanges) {
        var plus = Array.prototype.slice.call(arguments);
        var minus = []
        var index = this.length;
        this.dispatchBeforeRangeChange(plus, minus, index);
        var start = this.head.prev;
    }

    arguments.length === 1
    ? this.superPush.call(this, arguments[0])
    : (arguments.length === 2)
        ? this.superPush.call(this, arguments[0],  arguments[1])
        : this.superPush.apply(this, arguments);

    if (this.dispatchesRangeChanges) {
        this.updateIndexes(start.next, start.index === undefined ? 0 : start.index + 1);
        this.dispatchRangeChange(plus, minus, index);
    }
};

Object.defineProperty(List.prototype, "superUnshift", {
    value: _List.prototype.unshift,
    enumerable: false,
    configurable: true,
    writable:true
});

List.prototype.unshift = function () {
    if (this.dispatchesRangeChanges) {
        var plus = Array.prototype.slice.call(arguments);
        var minus = [];
        this.dispatchBeforeRangeChange(plus, minus, 0);
    }

    arguments.length === 1
    ? this.superUnshift.call(this, arguments[0])
    : (arguments.length === 2)
        ? this.superUnshift.call(this, arguments[0],  arguments[1])
        : this.superUnshift.apply(this, arguments);

    if (this.dispatchesRangeChanges) {
        this.updateIndexes(this.head.next, 0);
        this.dispatchRangeChange(plus, minus, 0);
    }
};

Object.defineProperty(List.prototype, "_beforePop", {
    value: function(value, index) {
        var popDispatchValueArray;
        if (this.dispatchesRangeChanges) {
            popDispatchValueArray = [value];
            this.dispatchBeforeRangeChange(/*plus*/this._dispatchEmptyArray, /*minus*/popDispatchValueArray, index);
        }
        return popDispatchValueArray;
    },
    enumerable: false,
    configurable: true,
    writable:true
});
Object.defineProperty(List.prototype, "_afterPop", {
    value: function(value, index, popDispatchValueArray) {
        if (this.dispatchesRangeChanges) {
            this.dispatchRangeChange(/*plus*/this._dispatchEmptyArray, /*minus*/popDispatchValueArray, index);
        }
    },
    enumerable: false,
    configurable: true,
    writable:true
});
Object.defineProperty(List.prototype, "superPop", {
    value: _List.prototype.pop,
    enumerable: false,
    configurable: true,
    writable:true
});

List.prototype.pop = function () {
    return this.superPop(this._beforePop,this._afterPop);
};

Object.defineProperty(List.prototype, "_beforeShift", {
    value: function(value, index) {
        var dispatchValueArray;
        if (this.dispatchesRangeChanges) {
            dispatchValueArray = [value];
            this.dispatchBeforeRangeChange(/*plus*/this._dispatchEmptyArray, /*minus*/dispatchValueArray, index);
        }
        return dispatchValueArray;
    },
    enumerable: false,
    configurable: true,
    writable:true
});
Object.defineProperty(List.prototype, "_afterShift", {
    value: function(value, index, dispatchValueArray) {
        if (this.dispatchesRangeChanges) {
            this.updateIndexes(this.head.next, index);
            this.dispatchRangeChange(/*plus*/this._dispatchEmptyArray, /*minus*/dispatchValueArray, index);
        }
    },
    enumerable: false,
    configurable: true,
    writable:true
});
Object.defineProperty(List.prototype, "superShift", {
    value: _List.prototype.shift,
    enumerable: false,
    configurable: true,
    writable:true
});
List.prototype.shift = function () {
    return this.superShift(this._beforeShift,this._afterShift);
};

Object.defineProperty(List.prototype, "superSwap", {
    value: _List.prototype.swap,
    enumerable: false,
    configurable: true,
    writable:true
});
List.prototype.swap = function (start, length, plus) {

    // before range change
    var index, startNode;
    var _beforeSwap = function(start, plus, minus) {
        if (this.dispatchesRangeChanges) {
            if (start === this.head) {
                index = this.length;
            } else if (start.prev === this.head) {
                index = 0;
            } else {
                index = start.index;
            }
            startNode = start.prev;
            this.dispatchBeforeRangeChange(plus, minus, index);
        }
    };
    var _afterSwap = function(start, plus, minus) {
        // after range change
        if (this.dispatchesRangeChanges) {
            if (start === this.head) {
                this.updateIndexes(this.head.next, 0);
            } else {
                this.updateIndexes(startNode.next, startNode.index + 1);
            }
            this.dispatchRangeChange(plus, minus, index);
        }
    };

    return this.superSwap(start, length, plus, _beforeSwap, _afterSwap);
};

Object.defineProperty(List.prototype, "superReverse", {
    value: _List.prototype.reverse,
    enumerable: false,
    configurable: true,
    writable:true
});
List.prototype.reverse = function () {
    if (this.dispatchesRangeChanges) {
        var minus = this.toArray();
        var plus = minus.reversed();
        this.dispatchBeforeRangeChange(plus, minus, 0);
    }
    this.superReverse();
    if (this.dispatchesRangeChanges) {
        this.dispatchRangeChange(plus, minus, 0);
    }
    return this;
};
