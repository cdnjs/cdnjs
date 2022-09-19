import { __extends, __generator } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { EventDispatcher } from "./EventDispatcher";
import * as $array from "./Array";
import * as $iter from "./Iterator";
import * as $type from "./Type";
/**
 * Ordered list contains values of any type in an indexed array.
 */
var OrderedList = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param initial  Inital list of values to add to list
     */
    function OrderedList(initial) {
        /**
         * Holds list values.
         */
        this._values = [];
        /**
         * Event dispatcher.
         */
        this.events = new EventDispatcher();
        if (initial != null) {
            this.setAll(initial);
        }
    }
    Object.defineProperty(OrderedList.prototype, "values", {
        /**
         * All items of the list.
         *
         * Do not modify the list directly. Rather use `insert()` and `remove()`
         * methods.
         *
         * @return List values
         */
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Inserts a value into list item array.
     *
     * @param value  Value
     */
    OrderedList.prototype._insert = function (value) {
        this._values.push(value);
        return this._values.length - 1;
    };
    Object.defineProperty(OrderedList.prototype, "length", {
        /**
         * Number of items in the list.
         *
         * @readonly
         * @return Length
         */
        get: function () {
            return this._values.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the index of the specific `value`.
     *
     * -1 if not found.
     *
     * @param value  Value
     * @return Index
     */
    OrderedList.prototype.indexOf = function (value) {
        return $array.indexOf(this._values, value);
    };
    /**
     * Checks if list contains the `value`.
     *
     * @param value  Value
     * @return In the list?
     */
    OrderedList.prototype.contains = function (value) {
        return this.indexOf(value) !== -1;
    };
    /**
     * Returns an item at specific `index`.
     *
     * @param index  Index
     * @return Item
     */
    OrderedList.prototype.getIndex = function (index) {
        return this._values[index];
    };
    Object.defineProperty(OrderedList.prototype, "first", {
        /**
         * First item in the list.
         *
         * @return Item
         */
        get: function () {
            return this._values[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderedList.prototype, "last", {
        /**
         * Last item in the list.
         *
         * @return Item
         */
        get: function () {
            return this._values[this._values.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Inserts a value into list.
     *
     * @param value  Value
     */
    OrderedList.prototype.insert = function (value) {
        var index = this._insert(value);
        if (this.events.isEnabled("inserted")) {
            this.events.dispatchImmediately("inserted", {
                type: "inserted",
                target: this,
                index: index,
                newValue: value
            });
        }
    };
    /**
     * Removes an item with the `value` from the list.
     *
     * @param value  Value
     */
    OrderedList.prototype.remove = function (value) {
        var index = this.indexOf(value);
        if (index !== -1) {
            var oldValue = this._values[index];
            $array.removeIndex(this._values, index);
            if (this.events.isEnabled("removed")) {
                this.events.dispatchImmediately("removed", {
                    type: "removed",
                    target: this,
                    index: index,
                    oldValue: oldValue,
                });
            }
        }
    };
    /**
     * Sets multiple items to the list.
     *
     * All current items are removed.
     *
     * @param newArray  New items
     */
    OrderedList.prototype.setAll = function (newArray) {
        var _this = this;
        $array.eachReverse(this._values, function (x, i) {
            _this._values.pop();
            if (_this.events.isEnabled("removed")) {
                _this.events.dispatchImmediately("removed", {
                    type: "removed",
                    target: _this,
                    index: i,
                    oldValue: x
                });
            }
        });
        $array.each(newArray, function (value) {
            _this.insert(value);
        });
    };
    /**
     * Removes all items from the list.
     */
    OrderedList.prototype.clear = function () {
        this.setAll([]);
    };
    /**
     * Returns part of the list between `start` and `end` indexes, as a new
     * [[OrderedList]].
     *
     * @param start  Start index
     * @param end    End index
     * @return Items in range
     */
    OrderedList.prototype.slice = function (start, end) {
        var out = new OrderedList();
        out._values = this._values.slice(start, end);
        return out;
    };
    /**
     * Finds a closest available index to the `value` in specified direction.
     *
     * @ignore exclude from docs
     * @param value      value to search for
     * @param fn         A callback function that returns value of the item
     * @param direction  Direciton
     * @return Index
     */
    OrderedList.prototype.findClosestIndex = function (value, fn, direction) {
        if (direction === void 0) { direction = "any"; }
        // Init temporary values
        var closestIndex = -1;
        var closestValue;
        var closestDifference;
        var i = 0;
        $iter.eachContinue(this.iterator(), function (element) {
            var item = fn(element);
            // Calc difference
            if (direction === "any") {
                // Exact match?
                if (item === value) {
                    // Found exact value - don't bother searching further
                    closestIndex = i;
                    return false;
                }
                var difference = Math.abs(value - item);
                if (!$type.hasValue(closestDifference) || (closestDifference > difference)) {
                    closestIndex = i;
                    closestValue = item;
                    closestDifference = difference;
                }
            }
            else if (direction === "left" && (item < value)) {
                if (!$type.hasValue(closestValue) || (closestValue < item)) {
                    closestIndex = i;
                    closestValue = item;
                }
            }
            else if (direction === "right" && (item >= value)) {
                if (!$type.hasValue(closestValue) || (closestValue >= item)) {
                    closestIndex = i;
                    closestValue = item;
                }
            }
            ++i;
            return true;
        });
        // Found nothing?
        if (closestIndex === -1) {
            if (direction === "left") {
                // Use First one
                closestIndex = 0;
            }
            else if (direction === "right") {
                // Use last item
                closestIndex = this.length - 1;
            }
        }
        return closestIndex;
    };
    /**
     * Returns a list iterator.
     *
     * @return Iterator
     */
    OrderedList.prototype.iterator = function () {
        return $iter.fromArray(this._values);
    };
    /**
     * Returns an ES6 iterator for the list.
     */
    OrderedList.prototype[Symbol.iterator] = function () {
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
     */
    OrderedList.prototype.each = function (f) {
        $array.each(this._values, f);
    };
    return OrderedList;
}());
export { OrderedList };
/**
 * A list where all items are ordered according to specific ordering function,
 * which is passed in via constructor parameter, when creating an instance of
 * [[SortedList]].
 */
var SortedList = /** @class */ (function (_super) {
    __extends(SortedList, _super);
    /**
     * Constructor.
     *
     * @param sort  Ordering function
     */
    function SortedList(sort) {
        var _this = _super.call(this) || this;
        _this._ordering = sort;
        return _this;
    }
    /**
     * Inserts item into the list.
     *
     * @param value  Item
     */
    SortedList.prototype._insert = function (value) {
        var index = $array.getSortedIndex(this._values, this._ordering, value).index;
        $array.insertIndex(this._values, index, value);
        return index;
    };
    /**
     * Returns index of the item in list if found.
     *
     * -1 if item is not in the list.
     *
     * @param value  Item to search for
     * @return Index
     */
    SortedList.prototype.indexOf = function (value) {
        var _a = $array.getSortedIndex(this._values, this._ordering, value), found = _a.found, index = _a.index;
        if (found) {
            return index;
        }
        else {
            return -1;
        }
    };
    /**
     * [udpate description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param value [description]
     */
    SortedList.prototype.update = function (value) {
        // @todo test this
        var index = $array.indexOf(this._values, value);
        // @todo throw an error if it doesn't exist ?
        if (index !== -1) {
            var last = this._values.length - 1;
            // Check if the current ordering is correct
            if (!((index === 0 || this._ordering(this._values[index - 1], value) < 0) &&
                (index === last || this._ordering(value, this._values[index + 1]) < 0))) {
                // TODO send remove/insert/move events
                $array.removeIndex(this._values, index);
                this._insert(value);
            }
        }
    };
    return SortedList;
}(OrderedList));
export { SortedList };
/**
 * A version of a [[OrderedList]] that has a "template".
 *
 * A template is an instance of an object, that can be used to create new
 * elements in the list without actually needing to create instances for those.
 *
 * When new element is created in the list, e.g. by calling its `create()`
 * method, an exact copy of the element is created (including properties and
 * other attributes), inserted into the list and returned.
 */
var OrderedListTemplate = /** @class */ (function (_super) {
    __extends(OrderedListTemplate, _super);
    /**
     * Constructor
     *
     * @param t Template object
     */
    function OrderedListTemplate(t) {
        var _this = _super.call(this) || this;
        _this.template = t;
        return _this;
    }
    Object.defineProperty(OrderedListTemplate.prototype, "template", {
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
    OrderedListTemplate.prototype.copyFrom = function (source) {
        var _this = this;
        $iter.each(source.iterator(), function (value) {
            _this.insert(value.clone());
        });
    };
    /**
     * Returns part of the list, starting at `start` and ending at `end` indexes,
     * as a new [[OrderedListTemplate]].
     *
     * @param start  Start index
     * @param end    End index
     * @return New list
     */
    OrderedListTemplate.prototype.slice = function (start, end) {
        var out = new OrderedListTemplate(this.template);
        out._values = this._values.slice(start, end);
        return out;
    };
    OrderedListTemplate.prototype.create = function (make) {
        var clone = (make != null
            ? new make()
            : this.template.clone());
        this.insert(clone);
        return clone;
    };
    return OrderedListTemplate;
}(OrderedList));
export { OrderedListTemplate };
/**
 * A version of a [[SortedList]] that has a "template".
 *
 * A template is an instance of an object, that can be used to create new
 * elements in the list without actually needing to create instances for those.
 *
 * When new element is created in the list, e.g. by calling its `create()`
 * method, an exact copy of the element is created (including properties and
 * other attributes), inserted into the list and returned.
 */
var SortedListTemplate = /** @class */ (function (_super) {
    __extends(SortedListTemplate, _super);
    /**
     * Constructor
     *
     * @param t     Template object
     * @param sort  Ordering function
     */
    function SortedListTemplate(t, sort) {
        var _this = _super.call(this, sort) || this;
        _this.template = t;
        return _this;
    }
    Object.defineProperty(SortedListTemplate.prototype, "template", {
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
    SortedListTemplate.prototype.copyFrom = function (source) {
        var _this = this;
        $iter.each(source.iterator(), function (value) {
            _this.insert(value.clone());
        });
    };
    SortedListTemplate.prototype.create = function (make) {
        var clone = (make != null
            ? new make()
            : this.template.clone());
        this.insert(clone);
        return clone;
    };
    return SortedListTemplate;
}(SortedList));
export { SortedListTemplate };
//# sourceMappingURL=SortedList.js.map