"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = require("@riim/is");
var mixin_1 = require("@riim/mixin");
var symbol_polyfill_1 = require("@riim/symbol-polyfill");
var EventEmitter_1 = require("../EventEmitter");
var FreezableCollection_1 = require("./FreezableCollection");
var splice = Array.prototype.splice;
function defaultComparator(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
var ObservableList = /** @class */ (function (_super) {
    __extends(ObservableList, _super);
    function ObservableList(items, options) {
        var _this = _super.call(this) || this;
        _this._items = [];
        FreezableCollection_1.FreezableCollection.call(_this);
        if (options && (options.sorted || (options.comparator && options.sorted !== false))) {
            _this._comparator = options.comparator || defaultComparator;
            _this._sorted = true;
        }
        else {
            _this._comparator = null;
            _this._sorted = false;
        }
        if (items) {
            if (_this._sorted) {
                if (items instanceof ObservableList) {
                    items = items._items.slice();
                }
                for (var i = 0, l = items.length; i < l; i++) {
                    _this._insertSortedValue(items[i]);
                }
            }
            else {
                // [,].slice() // => [empty]
                // [].push.apply(a = [], [,]), a // => [undefined]
                _this._items.push.apply(_this._items, items instanceof ObservableList ? items._items : items);
            }
        }
        return _this;
    }
    Object.defineProperty(ObservableList.prototype, "length", {
        get: function () {
            return this._items.length;
        },
        enumerable: true,
        configurable: true
    });
    ObservableList.prototype._validateIndex = function (index, allowEndIndex) {
        if (index === undefined) {
            return index;
        }
        if (index < 0) {
            index += this._items.length;
            if (index < 0) {
                throw new RangeError('Index out of valid range');
            }
        }
        else if (index > this._items.length - (allowEndIndex ? 0 : 1)) {
            throw new RangeError('Index out of valid range');
        }
        return index;
    };
    ObservableList.prototype.contains = function (value) {
        return this._items.indexOf(value) != -1;
    };
    ObservableList.prototype.indexOf = function (value, fromIndex) {
        return this._items.indexOf(value, this._validateIndex(fromIndex, true));
    };
    ObservableList.prototype.lastIndexOf = function (value, fromIndex) {
        return this._items.lastIndexOf(value, fromIndex === undefined ? -1 : this._validateIndex(fromIndex, true));
    };
    ObservableList.prototype.get = function (index) {
        return this._items[this._validateIndex(index, true)];
    };
    ObservableList.prototype.getRange = function (index, count) {
        index = this._validateIndex(index, true);
        if (count === undefined) {
            return this._items.slice(index);
        }
        if (index + count > this._items.length) {
            throw new RangeError('Sum of "index" and "count" out of valid range');
        }
        return this._items.slice(index, index + count);
    };
    ObservableList.prototype.set = function (index, value) {
        if (this._sorted) {
            throw new TypeError('Cannot set to sorted list');
        }
        index = this._validateIndex(index, true);
        if (!is_1.is(value, this._items[index])) {
            this._throwIfFrozen();
            this._items[index] = value;
            this.emit('change');
        }
        return this;
    };
    ObservableList.prototype.setRange = function (index, values) {
        if (this._sorted) {
            throw new TypeError('Cannot set to sorted list');
        }
        index = this._validateIndex(index, true);
        if (values instanceof ObservableList) {
            values = values._items.slice();
        }
        var valueCount = values.length;
        if (!valueCount) {
            return this;
        }
        if (index + valueCount > this._items.length) {
            throw new RangeError('Sum of "index" and "values.length" out of valid range');
        }
        var items = this._items;
        var changed = false;
        for (var i = index + valueCount; i > index;) {
            var value = values[--i - index];
            if (!is_1.is(value, items[i])) {
                if (!changed) {
                    this._throwIfFrozen();
                }
                items[i] = value;
                changed = true;
            }
        }
        if (changed) {
            this.emit('change');
        }
        return this;
    };
    ObservableList.prototype.add = function (value) {
        this._throwIfFrozen();
        if (this._sorted) {
            this._insertSortedValue(value);
        }
        else {
            this._items.push(value);
        }
        this.emit('change');
        return this;
    };
    ObservableList.prototype.addRange = function (values) {
        if (values instanceof ObservableList) {
            values = values._items.slice();
        }
        if (values.length) {
            this._throwIfFrozen();
            if (this._sorted) {
                for (var i = 0, l = values.length; i < l; i++) {
                    this._insertSortedValue(values[i]);
                }
            }
            else {
                this._items.push.apply(this._items, values);
            }
            this.emit('change');
        }
        return this;
    };
    ObservableList.prototype.insert = function (index, value) {
        if (this._sorted) {
            throw new TypeError('Cannot insert to sorted list');
        }
        index = this._validateIndex(index, true);
        this._throwIfFrozen();
        this._items.splice(index, 0, value);
        this.emit('change');
        return this;
    };
    ObservableList.prototype.insertRange = function (index, values) {
        if (this._sorted) {
            throw new TypeError('Cannot insert to sorted list');
        }
        index = this._validateIndex(index, true);
        if (values instanceof ObservableList) {
            values = values._items;
        }
        if (values.length) {
            this._throwIfFrozen();
            splice.apply(this._items, [index, 0].concat(values));
            this.emit('change');
        }
        return this;
    };
    ObservableList.prototype.remove = function (value, fromIndex) {
        var index = this._items.indexOf(value, this._validateIndex(fromIndex, true));
        if (index == -1) {
            return false;
        }
        this._throwIfFrozen();
        this._items.splice(index, 1);
        this.emit('change');
        return true;
    };
    ObservableList.prototype.removeAll = function (value, fromIndex) {
        var index = this._validateIndex(fromIndex, true);
        var items = this._items;
        var changed = false;
        while ((index = items.indexOf(value, index)) != -1) {
            if (!changed) {
                this._throwIfFrozen();
            }
            items.splice(index, 1);
            changed = true;
        }
        if (changed) {
            this.emit('change');
        }
        return changed;
    };
    ObservableList.prototype.removeEach = function (values, fromIndex) {
        fromIndex = this._validateIndex(fromIndex, true);
        if (values instanceof ObservableList) {
            values = values._items.slice();
        }
        var items = this._items;
        var changed = false;
        for (var i = 0, l = values.length; i < l; i++) {
            var index = items.indexOf(values[i], fromIndex);
            if (index != -1) {
                if (!changed) {
                    this._throwIfFrozen();
                }
                items.splice(index, 1);
                changed = true;
            }
        }
        if (changed) {
            this.emit('change');
        }
        return changed;
    };
    ObservableList.prototype.removeAllEach = function (values, fromIndex) {
        fromIndex = this._validateIndex(fromIndex, true);
        if (values instanceof ObservableList) {
            values = values._items.slice();
        }
        var items = this._items;
        var changed = false;
        for (var i = 0, l = values.length; i < l; i++) {
            var value = values[i];
            for (var index = fromIndex; (index = items.indexOf(value, index)) != -1;) {
                if (!changed) {
                    this._throwIfFrozen();
                }
                items.splice(index, 1);
                changed = true;
            }
        }
        if (changed) {
            this.emit('change');
        }
        return changed;
    };
    ObservableList.prototype.removeAt = function (index) {
        index = this._validateIndex(index);
        this._throwIfFrozen();
        var value = this._items.splice(index, 1)[0];
        this.emit('change');
        return value;
    };
    ObservableList.prototype.removeRange = function (index, count) {
        index = this._validateIndex(index, true);
        if (count === undefined) {
            count = this._items.length - index;
            if (!count) {
                return [];
            }
        }
        else {
            if (!count) {
                return [];
            }
            if (index + count > this._items.length) {
                throw new RangeError('Sum of "index" and "count" out of valid range');
            }
        }
        this._throwIfFrozen();
        var values = this._items.splice(index, count);
        this.emit('change');
        return values;
    };
    ObservableList.prototype.clear = function () {
        if (this._items.length) {
            this._throwIfFrozen();
            this._items.length = 0;
            this.emit('change', { subtype: 'clear' });
        }
        return this;
    };
    ObservableList.prototype.join = function (separator) {
        return this._items.join(separator);
    };
    ObservableList.prototype.find = function (callback, context) {
        var items = this._items;
        for (var i = 0, l = items.length; i < l; i++) {
            var item = items[i];
            if (callback.call(context, item, i, this)) {
                return item;
            }
        }
        return;
    };
    ObservableList.prototype.findIndex = function (callback, context) {
        var items = this._items;
        for (var i = 0, l = items.length; i < l; i++) {
            if (callback.call(context, items[i], i, this)) {
                return i;
            }
        }
        return -1;
    };
    ObservableList.prototype.clone = function (deep) {
        return new this.constructor(deep
            ? this._items.map(function (item) { return (item && item.clone ? item.clone(true) : item); })
            : this, {
            comparator: this._comparator || undefined,
            sorted: this._sorted
        });
    };
    ObservableList.prototype.toArray = function () {
        return this._items.slice();
    };
    ObservableList.prototype.toString = function () {
        return this._items.join();
    };
    ObservableList.prototype._insertSortedValue = function (value) {
        var items = this._items;
        var comparator = this._comparator;
        var low = 0;
        var high = items.length;
        while (low != high) {
            var mid = (low + high) >> 1;
            if (comparator(value, items[mid]) < 0) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        items.splice(low, 0, value);
    };
    return ObservableList;
}(EventEmitter_1.EventEmitter));
exports.ObservableList = ObservableList;
['forEach', 'map', 'filter', 'every', 'some'].forEach(function (name) {
    ObservableList.prototype[name] = function (callback, context) {
        return this._items[name](function (item, index) {
            return callback.call(context, item, index, this);
        }, this);
    };
});
['reduce', 'reduceRight'].forEach(function (name) {
    ObservableList.prototype[name] = function (callback, initialValue) {
        var list = this;
        function wrapper(accumulator, item, index) {
            return callback(accumulator, item, index, list);
        }
        return arguments.length >= 2
            ? this._items[name](wrapper, initialValue)
            : this._items[name](wrapper);
    };
});
[
    ['keys', function (index) { return index; }],
    ['values', function (index, item) { return item; }],
    ['entries', function (index, item) { return [index, item]; }]
].forEach(function (settings) {
    var getStepValue = settings[1];
    ObservableList.prototype[settings[0]] = function () {
        var items = this._items;
        var index = 0;
        var done = false;
        return {
            next: function () {
                if (!done) {
                    if (index < items.length) {
                        return {
                            value: getStepValue(index, items[index++]),
                            done: false
                        };
                    }
                    done = true;
                }
                return {
                    value: undefined,
                    done: true
                };
            }
        };
    };
});
mixin_1.mixin(ObservableList.prototype, FreezableCollection_1.FreezableCollection.prototype, ['constructor']);
ObservableList.prototype[symbol_polyfill_1.Symbol.iterator] = ObservableList.prototype.values;
