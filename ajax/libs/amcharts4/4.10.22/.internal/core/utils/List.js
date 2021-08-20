import { __extends, __generator } from "tslib";
import { Disposer, MultiDisposer } from "./Disposer";
import { EventDispatcher } from "./EventDispatcher";
import * as $array from "./Array";
import * as $iter from "./Iterator";
/**
 * @todo Description
 */
var IndexedIterable = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param array  List items
     * @param start  Start index
     * @param end    End index
     */
    function IndexedIterable(array, start, end) {
        this._array = array;
        this._start = start;
        this._end = end;
    }
    /**
     * Returns a list item iterator.
     *
     * @return Iterator
     */
    IndexedIterable.prototype.iterator = function () {
        var _this = this;
        return function (push) {
            if (_this._start !== _this._end) {
                if (_this._start < _this._end) {
                    for (var i = _this._start; i < _this._end; ++i) {
                        if (!push(_this._array[i])) {
                            break;
                        }
                    }
                }
                else {
                    for (var i = _this._start - 1; i >= _this._end; --i) {
                        if (!push(_this._array[i])) {
                            break;
                        }
                    }
                }
            }
        };
    };
    /**
     * Returns an interable list sorted backwards than current list.
     *
     * @return List
     */
    IndexedIterable.prototype.backwards = function () {
        return new IndexedIterable(this._array, this._end, this._start);
    };
    /**
     * Returns a new list consisting only of specific range of items between
     * `start` and `end` indexes.
     *
     * @param start  Start index
     * @param end    End index
     * @return List
     */
    IndexedIterable.prototype.range = function (start, end) {
        if (start <= end) {
            if (this._start === this._end) {
                return this;
            }
            else if (this._start < this._end) {
                var diff = end - start;
                start = Math.max(this._start + start, this._start);
                end = Math.min(start + diff, this._end);
                return new IndexedIterable(this._array, start, end);
            }
            else {
                var diff = end - start;
                start = Math.max(this._start - start, this._end);
                end = Math.max(start - diff, this._end);
                return new IndexedIterable(this._array, start, end);
            }
        }
        else {
            throw new Error("Start index must be lower than end index");
        }
    };
    return IndexedIterable;
}());
export { IndexedIterable };
/**
 * ListGrouper organizes [[List]] items into groups.
 *
 * @ignore Exclude from docs
 */
var ListGrouper = /** @class */ (function (_super) {
    __extends(ListGrouper, _super);
    /**
     * Constructor.
     */
    function ListGrouper(list, getKey, sort) {
        var _this = _super.call(this, [
            list.events.on("inserted", function (x) {
                var value = x.newValue;
                var key = _this._getKey(value);
                var index = 0;
                $iter.eachContinue(list.iterator(), function (x) {
                    if (x === value) {
                        return false;
                    }
                    else if (_this._getKey(x) === key) {
                        ++index;
                    }
                    return true;
                });
                _this._insert(value, key, index);
            }, undefined, false),
            list.events.on("removed", function (x) {
                _this._remove(x.oldValue);
            }, undefined, false)
        ]) || this;
        /**
         * Grouping keys.
         */
        _this._keys = [];
        /**
         * List item groups.
         */
        _this._groups = {};
        _this._getKey = getKey;
        _this._sort = sort;
        $iter.each(list.iterator(), function (x) {
            _this._insert(x, getKey(x));
        });
        return _this;
    }
    /**
     * Inserts an item (`x`) to a specific group (`key`) and specific `index`.
     *
     * @param x      Item
     * @param key    Group name
     * @param index  Index
     */
    ListGrouper.prototype._insert = function (x, key, index) {
        if (this._groups[key] == null) {
            this._groups[key] = [];
            // TODO code duplication with SortedList
            var _a = $array.getSortedIndex(this._keys, this._sort, key), found = _a.found, index_1 = _a.index;
            if (found) {
                throw new Error("Key already exists: " + key);
            }
            else {
                $array.insertIndex(this._keys, index_1, key);
            }
        }
        if (index == null) {
            this._groups[key].push(x);
        }
        else {
            $array.insertIndex(this._groups[key], index, x);
        }
    };
    /**
     * Removes an item from the list.
     *
     * @param x Item to remove
     */
    ListGrouper.prototype._remove = function (x) {
        var key = this._getKey(x);
        var values = this._groups[key];
        if (values != null) {
            $array.remove(values, x);
            if (values.length === 0) {
                delete this._groups[key];
                var _a = $array.getSortedIndex(this._keys, this._sort, key), found = _a.found, index = _a.index;
                if (found) {
                    $array.removeIndex(this._keys, index);
                }
                else {
                    throw new Error("Key doesn't exist: " + key);
                }
            }
        }
    };
    /**
     * Returns an iterator for the list.
     *
     * The iterator will iterate through all items in all groups.
     *
     * @return Iterator
     */
    ListGrouper.prototype.iterator = function () {
        var _this = this;
        return $iter.flatten($iter.map($iter.fromArray(this._keys), function (key) {
            return $iter.fromArray(_this._groups[key]);
        }));
    };
    return ListGrouper;
}(MultiDisposer));
export { ListGrouper };
/**
 * A disposable list, which when disposed itself will call `dispose()` method
 * on all its items.
 */
var ListDisposer = /** @class */ (function (_super) {
    __extends(ListDisposer, _super);
    function ListDisposer(list, disposeOnRemove) {
        if (disposeOnRemove === void 0) { disposeOnRemove = true; }
        var _this = this;
        if (disposeOnRemove) {
            var disposer_1 = list.events.on("removed", function (x) {
                x.oldValue.dispose();
            }, undefined, false);
            _this = _super.call(this, function () {
                disposer_1.dispose();
                // TODO clear the list ?
                $iter.each(list.iterator(), function (x) {
                    x.dispose();
                });
            }) || this;
        }
        else {
            _this = _super.call(this, function () {
                // TODO clear the list ?
                $iter.each(list.iterator(), function (x) {
                    x.dispose();
                });
            }) || this;
        }
        return _this;
    }
    return ListDisposer;
}(Disposer));
export { ListDisposer };
/**
 * Checks if specific index fits into length.
 *
 * @param index  Index
 * @param len    Length
 */
function checkBounds(index, len) {
    if (!(index >= 0 && index < len)) {
        throw new Error("Index out of bounds: " + index);
    }
}
/**
 * A List class is used to hold a number of indexed items of the same type.
 */
var List = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param initial  Inital list of values to add to list
     */
    function List(initial) {
        if (initial === void 0) { initial = []; }
        /**
         * Event dispatcher.
         */
        this.events = new EventDispatcher();
        this._values = initial;
    }
    Object.defineProperty(List.prototype, "values", {
        /**
         * An array of values in the list.
         *
         * Do not use this property to add values. Rather use dedicated methods, like
         * `push()`, `removeIndex()`, etc.
         *
         * @readonly
         * @return List values
         */
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if list contains specific item reference.
     *
     * @param item  Item to search for
     * @return `true` if found, `false` if not found
     */
    List.prototype.contains = function (value) {
        return this._values.indexOf(value) !== -1;
    };
    /**
     * Removes specific item from the list.
     *
     * @param item An item to remove
     */
    List.prototype.removeValue = function (value) {
        var i = 0;
        var length = this._values.length;
        while (i < length) {
            // TODO handle NaN
            if (this._values[i] === value) {
                this.removeIndex(i);
                --length;
            }
            else {
                ++i;
            }
        }
    };
    /**
     * Searches the list for specific item and returns its index.
     *
     * @param item  An item to search for
     * @return Index or -1 if not found
     */
    List.prototype.indexOf = function (value) {
        return $array.indexOf(this._values, value);
    };
    Object.defineProperty(List.prototype, "length", {
        /**
         * Number of items in list.
         *
         * @readonly
         * @return Number of items
         */
        get: function () {
            return this._values.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if there's a value at specific index.
     *
     * @param index  Index
     * @return Value exists?
     */
    List.prototype.hasIndex = function (index) {
        return index >= 0 && index < this._values.length;
    };
    /**
     * Returns an item at specified index.
     *
     * @param index  Index
     * @return List item
     */
    List.prototype.getIndex = function (index) {
        return this._values[index];
    };
    /**
     * Sets value at specific index.
     *
     * If there's already a value at the index, it is overwritten.
     *
     * @param index  Index
     * @param value  New value
     * @return New value
     */
    List.prototype.setIndex = function (index, value) {
        checkBounds(index, this._values.length);
        var oldValue = this._values[index];
        // Do nothing if the old value and the new value are the same
        if (oldValue !== value) {
            this._values[index] = value;
            if (this.events.isEnabled("setIndex")) {
                this.events.dispatchImmediately("setIndex", {
                    type: "setIndex",
                    target: this,
                    index: index,
                    oldValue: oldValue,
                    newValue: value
                });
            }
            if (this.events.isEnabled("removed")) {
                this.events.dispatchImmediately("removed", {
                    type: "removed",
                    target: this,
                    oldValue: oldValue
                });
            }
            if (this.events.isEnabled("inserted")) {
                this.events.dispatchImmediately("inserted", {
                    type: "inserted",
                    target: this,
                    newValue: value
                });
            }
        }
        return oldValue;
    };
    /**
     * Adds an item to the list at a specific index, which pushes all the other
     * items further down the list.
     *
     * @param index Index
     * @param item  An item to add
     */
    List.prototype.insertIndex = function (index, value) {
        checkBounds(index, this._values.length + 1);
        $array.insertIndex(this._values, index, value);
        if (this.events.isEnabled("insertIndex")) {
            this.events.dispatchImmediately("insertIndex", {
                type: "insertIndex",
                target: this,
                index: index,
                newValue: value
            });
        }
        if (this.events.isEnabled("inserted")) {
            this.events.dispatchImmediately("inserted", {
                type: "inserted",
                target: this,
                newValue: value
            });
        }
    };
    /**
     * [_sortQuicksort description]
     *
     * @todo Description
     * @param low    [description]
     * @param high   [description]
     * @param order  [description]
     */
    List.prototype._sortQuicksort = function (low, high, order) {
        if (low < high) {
            var p = this._sortPartition(low, high, order);
            this._sortQuicksort(low, p, order);
            this._sortQuicksort(p + 1, high, order);
        }
    };
    /**
     * [_sortPartition description]
     *
     * @todo Description
     * @param low    [description]
     * @param high   [description]
     * @param order  [description]
     * @return [description]
     */
    List.prototype._sortPartition = function (low, high, order) {
        var values = this._values;
        var pivot = values[low];
        var i = low - 1;
        var j = high + 1;
        for (;;) {
            do {
                ++i;
            } while (order(values[i], pivot) < 0);
            do {
                --j;
            } while (order(values[j], pivot) > 0);
            if (i >= j) {
                return j;
            }
            else {
                this.swap(i, j);
            }
        }
    };
    /**
     * Reorders list items according to specific ordering function.
     *
     * @param order  Ordering function
     */
    List.prototype.sort = function (order) {
        // https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme
        // @todo faster implementation of this
        // @todo test this
        this._sortQuicksort(0, this._values.length - 1, order);
    };
    /**
     * Swaps indexes of two items in the list.
     *
     * @param a  Item 1
     * @param b  Item 2
     */
    List.prototype.swap = function (a, b) {
        var len = this._values.length;
        checkBounds(a, len);
        checkBounds(b, len);
        if (a !== b) {
            var value_a = this._values[a];
            var value_b = this._values[b];
            this._values[a] = value_b;
            if (this.events.isEnabled("setIndex")) {
                this.events.dispatchImmediately("setIndex", {
                    type: "setIndex",
                    target: this,
                    index: a,
                    oldValue: value_a,
                    newValue: value_b
                });
            }
            this._values[b] = value_a;
            if (this.events.isEnabled("setIndex")) {
                this.events.dispatchImmediately("setIndex", {
                    type: "setIndex",
                    target: this,
                    index: b,
                    oldValue: value_b,
                    newValue: value_a
                });
            }
        }
    };
    /**
     * Removes a value at specific index.
     *
     * @param index  Index of value to remove
     * @return Removed value
     */
    List.prototype.removeIndex = function (index) {
        checkBounds(index, this._values.length);
        var oldValue = this._values[index];
        $array.removeIndex(this._values, index);
        if (this.events.isEnabled("removeIndex")) {
            this.events.dispatchImmediately("removeIndex", {
                type: "removeIndex",
                target: this,
                index: index,
                oldValue: oldValue
            });
        }
        if (this.events.isEnabled("removed")) {
            this.events.dispatchImmediately("removed", {
                type: "removed",
                target: this,
                oldValue: oldValue
            });
        }
        return oldValue;
    };
    /**
     * Moves an item to a specific index within the list.
     *
     * If the index is not specified it will move the item to the end of the
     * list.
     *
     * @param value  Item to move
     * @param index  Index to place item at
     */
    List.prototype.moveValue = function (value, toIndex) {
        // TODO don't do anything if the desired index is the same as the current index
        var index = this.indexOf(value);
        // TODO remove all old values rather than only the first ?
        if (index !== -1) {
            var oldValue = this._values[index];
            $array.removeIndex(this._values, index);
            if (this.events.isEnabled("removeIndex")) {
                this.events.dispatchImmediately("removeIndex", {
                    type: "removeIndex",
                    target: this,
                    index: index,
                    oldValue: oldValue
                });
            }
        }
        if (toIndex == null) {
            toIndex = this._values.length;
            this._values.push(value);
        }
        else {
            $array.insertIndex(this._values, toIndex, value);
        }
        if (this.events.isEnabled("insertIndex")) {
            this.events.dispatchImmediately("insertIndex", {
                type: "insertIndex",
                target: this,
                index: toIndex,
                newValue: value
            });
        }
        if (index === -1) {
            if (this.events.isEnabled("inserted")) {
                this.events.dispatchImmediately("inserted", {
                    type: "inserted",
                    target: this,
                    newValue: value
                });
            }
        }
    };
    /**
     * Adds an item to the end of the list.
     *
     * @param item  An item to add
     */
    List.prototype.push = function (value) {
        var index = this._values.push(value) - 1;
        if (this.events.isEnabled("insertIndex")) {
            this.events.dispatchImmediately("insertIndex", {
                type: "insertIndex",
                target: this,
                index: index,
                newValue: value
            });
        }
        if (this.events.isEnabled("inserted")) {
            this.events.dispatchImmediately("inserted", {
                type: "inserted",
                target: this,
                newValue: value
            });
        }
        return value;
    };
    /**
     * Adds an item as a first item in the list.
     *
     * @param item  An item to add
     */
    List.prototype.unshift = function (value) {
        this.insertIndex(0, value);
    };
    /**
     * Adds multiple items to the list.
     *
     * @param items  An Array of items to add
     */
    List.prototype.pushAll = function (values) {
        var _this = this;
        $array.each(values, function (value) {
            _this.push(value);
        });
    };
    /**
     * Copies and adds items from abother list.
     *
     * @param source  A list top copy items from
     */
    List.prototype.copyFrom = function (source) {
        this.pushAll(source._values);
    };
    /**
     * Returns the last item from the list, and removes it.
     *
     * @return Item
     */
    List.prototype.pop = function () {
        var index = this._values.length - 1;
        return index < 0 ? undefined : this.removeIndex(this._values.length - 1);
    };
    /**
     * Returns the first item from the list, and removes it.
     *
     * @return Item
     */
    List.prototype.shift = function () {
        return this._values.length ? this.removeIndex(0) : undefined;
    };
    /**
     * Sets multiple items to the list.
     *
     * All current items are removed.
     *
     * @param newArray  New items
     */
    List.prototype.setAll = function (newArray) {
        var _this = this;
        // @tod if a value exists in both the new and old arrays, don't send remove/insert events
        var oldArray = $array.copy(this._values);
        this._values.length = 0;
        $array.each(newArray, function (value) {
            _this._values.push(value);
        });
        if (this.events.isEnabled("setAll")) {
            this.events.dispatchImmediately("setAll", {
                type: "setAll",
                target: this,
                oldArray: oldArray,
                newArray: this._values // TODO make a copy ?
            });
        }
        if (this.events.isEnabled("removed")) {
            $array.each(oldArray, function (x) {
                _this.events.dispatchImmediately("removed", {
                    type: "removed",
                    target: _this,
                    oldValue: x
                });
            });
        }
        if (this.events.isEnabled("inserted")) {
            $array.each(this._values, function (x) {
                _this.events.dispatchImmediately("inserted", {
                    type: "inserted",
                    target: _this,
                    newValue: x
                });
            });
        }
    };
    /**
     * Removes all items from the list.
     */
    List.prototype.clear = function () {
        this.setAll([]);
    };
    /**
     * Returns a list iterator.
     *
     * @return Iterator
     */
    List.prototype.iterator = function () {
        return $iter.fromArray(this._values);
    };
    /**
     * Returns an ES6 iterator for the list.
     */
    List.prototype[Symbol.iterator] = function () {
        var length, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    length = this._values.length;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, this._values[i]];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    ++i;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    /**
     * Calls `f` for each element in the list.
     *
     * `f` should have at least one parameter defined which will get a current
     * item, with optional second argument - index.
     */
    List.prototype.each = function (f) {
        $array.each(this._values, f);
    };
    /**
     * Returns a specific range of list items, which can be iterated.
     *
     * @ignore Exclude from docs
     * @todo Code duplication with IndexedIterable
     * @param start  Start index
     * @param end    End index
     * @return Range
     */
    List.prototype.range = function (start, end) {
        if (start <= end) {
            var diff = end - start;
            start = Math.max(start, 0);
            end = Math.min(start + diff, this._values.length);
            return new IndexedIterable(this._values, start, end);
        }
        else {
            throw new Error("Start index must be lower than end index");
        }
    };
    /**
     * Returns an iterator that has list items sorted backwards.
     *
     * @ignore Exclude from docs
     * @return List
     */
    List.prototype.backwards = function () {
        return new IndexedIterable(this._values, this._values.length, 0);
    };
    return List;
}());
export { List };
/**
 * A version of a [[List]] that has a "template".
 *
 * A template is an instance of an object, that can be used to create new
 * elements in the list without actually needing to create instances for those.
 *
 * When new element is created in the list, e.g. by calling its `create()`
 * method, an exact copy of the element is created (including properties and
 * other attributes), inserted into the list and returned.
 */
var ListTemplate = /** @class */ (function (_super) {
    __extends(ListTemplate, _super);
    /**
     * Constructor
     *
     * @param t Template object
     */
    function ListTemplate(t) {
        var _this = _super.call(this) || this;
        _this.template = t;
        return _this;
    }
    Object.defineProperty(ListTemplate.prototype, "template", {
        /**
         * @return Template object
         */
        get: function () {
            return this._template;
        },
        /**
         * A "template" object to copy all properties from when creating new list
         * items.
         *
         * @param v  Template object
         */
        set: function (v) {
            v.isTemplate = true;
            this._template = v;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies all elements from other list.
     *
     * @param source  Source list
     */
    ListTemplate.prototype.copyFrom = function (source) {
        var _this = this;
        $iter.each(source.iterator(), function (value) {
            _this.push(value.clone());
        });
    };
    ListTemplate.prototype.create = function (make) {
        var clone = (make != null
            ? new make()
            : this.template.clone());
        this.push(clone);
        return clone;
    };
    /**
     * Creates an exact clone of the list, including its items and template.
     *
     * @return New list
     */
    ListTemplate.prototype.clone = function () {
        var out = new ListTemplate(this.template);
        var values = this.values;
        var length = values.length;
        for (var i = 0; i < length; ++i) {
            out.push(values[i].clone());
        }
        return out;
    };
    return ListTemplate;
}(List));
export { ListTemplate };
//# sourceMappingURL=List.js.map