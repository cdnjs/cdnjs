import { EventEmitter } from '../EventEmitter';
const push = Array.prototype.push;
const splice = Array.prototype.splice;
const defaultComparator = (a, b) => {
    return a < b ? -1 : a > b ? 1 : 0;
};
export class ObservableList extends EventEmitter {
    constructor(items, options) {
        super();
        this._items = [];
        if (options && (options.sorted || (options.comparator && options.sorted !== false))) {
            this._comparator = options.comparator || defaultComparator;
            this._sorted = true;
        }
        else {
            this._comparator = null;
            this._sorted = false;
        }
        if (items) {
            if (this._sorted) {
                if (items instanceof ObservableList) {
                    items = items._items;
                }
                for (let i = 0, l = items.length; i < l; i++) {
                    this._insertSortedValue(items[i]);
                }
            }
            else {
                push.apply(this._items, items instanceof ObservableList ? items._items : items);
            }
        }
    }
    get length() {
        return this._items.length;
    }
    set length(value) {
        if (this._items.length != value) {
            if (value > this._items.length) {
                throw RangeError('Length out of valid range');
            }
            this.emit(ObservableList.EVENT_CHANGE);
            this._items.length = value;
        }
    }
    onChange(listener, context) {
        return this.on(ObservableList.EVENT_CHANGE, listener, context);
    }
    offChange(listener, context) {
        return this.off(ObservableList.EVENT_CHANGE, listener, context);
    }
    _validateIndex(index, allowEndIndex) {
        if (index === undefined) {
            return index;
        }
        if (index < 0) {
            index += this._items.length;
            if (index < 0) {
                throw RangeError('Index out of valid range');
            }
        }
        else if (index > this._items.length - (allowEndIndex ? 0 : 1)) {
            throw RangeError('Index out of valid range');
        }
        return index;
    }
    contains(value) {
        return this._items.indexOf(value) != -1;
    }
    indexOf(value, fromIndex) {
        return this._items.indexOf(value, this._validateIndex(fromIndex, true));
    }
    lastIndexOf(value, fromIndex) {
        return this._items.lastIndexOf(value, fromIndex === undefined ? -1 : this._validateIndex(fromIndex, true));
    }
    get(index) {
        return this._items[this._validateIndex(index, true)];
    }
    getRange(index, count) {
        index = this._validateIndex(index, true);
        if (count === undefined) {
            return this._items.slice(index);
        }
        if (index + count > this._items.length) {
            throw RangeError('Sum of "index" and "count" out of valid range');
        }
        return this._items.slice(index, index + count);
    }
    set(index, value) {
        if (this._sorted) {
            throw TypeError('Cannot set to sorted list');
        }
        index = this._validateIndex(index, true);
        if (!Object.is(value, this._items[index])) {
            this._items[index] = value;
            this.emit(ObservableList.EVENT_CHANGE);
        }
        return this;
    }
    setRange(index, values) {
        if (this._sorted) {
            throw TypeError('Cannot set to sorted list');
        }
        index = this._validateIndex(index, true);
        if (values instanceof ObservableList) {
            values = values._items;
        }
        let valueCount = values.length;
        if (!valueCount) {
            return this;
        }
        let items = this._items;
        if (index + valueCount > items.length) {
            throw RangeError('Sum of "index" and "values.length" out of valid range');
        }
        let changed = false;
        for (let i = index + valueCount; i > index;) {
            let value = values[--i - index];
            if (!Object.is(value, items[i])) {
                items[i] = value;
                changed = true;
            }
        }
        if (changed) {
            this.emit(ObservableList.EVENT_CHANGE);
        }
        return this;
    }
    add(value, unique) {
        if (unique && this._items.indexOf(value) != -1) {
            return this;
        }
        if (this._sorted) {
            this._insertSortedValue(value);
        }
        else {
            this._items.push(value);
        }
        this.emit(ObservableList.EVENT_CHANGE);
        return this;
    }
    addRange(values, unique) {
        if (values instanceof ObservableList) {
            values = values._items;
        }
        if (values.length) {
            if (unique) {
                let items = this._items;
                let sorted = this._sorted;
                let changed = false;
                for (let value of values) {
                    if (items.indexOf(value) == -1) {
                        if (sorted) {
                            this._insertSortedValue(value);
                        }
                        else {
                            items.push(value);
                        }
                        changed = true;
                    }
                }
                if (changed) {
                    this.emit(ObservableList.EVENT_CHANGE);
                }
            }
            else {
                if (this._sorted) {
                    for (let i = 0, l = values.length; i < l; i++) {
                        this._insertSortedValue(values[i]);
                    }
                }
                else {
                    push.apply(this._items, values);
                }
                this.emit(ObservableList.EVENT_CHANGE);
            }
        }
        return this;
    }
    insert(index, value) {
        if (this._sorted) {
            throw TypeError('Cannot insert to sorted list');
        }
        this._items.splice(this._validateIndex(index, true), 0, value);
        this.emit(ObservableList.EVENT_CHANGE);
        return this;
    }
    insertRange(index, values) {
        if (this._sorted) {
            throw TypeError('Cannot insert to sorted list');
        }
        index = this._validateIndex(index, true);
        if (values instanceof ObservableList) {
            values = values._items;
        }
        if (values.length) {
            splice.apply(this._items, [index, 0].concat(values));
            this.emit(ObservableList.EVENT_CHANGE);
        }
        return this;
    }
    remove(value, fromIndex) {
        let index = this._items.indexOf(value, this._validateIndex(fromIndex, true));
        if (index == -1) {
            return false;
        }
        this._items.splice(index, 1);
        this.emit(ObservableList.EVENT_CHANGE);
        return true;
    }
    removeAll(value, fromIndex) {
        let index = this._validateIndex(fromIndex, true);
        let items = this._items;
        let changed = false;
        while ((index = items.indexOf(value, index)) != -1) {
            items.splice(index, 1);
            changed = true;
        }
        if (changed) {
            this.emit(ObservableList.EVENT_CHANGE);
        }
        return changed;
    }
    removeEach(values, fromIndex) {
        fromIndex = this._validateIndex(fromIndex, true);
        if (values instanceof ObservableList) {
            values = values._items.slice();
        }
        let items = this._items;
        let changed = false;
        for (let i = 0, l = values.length; i < l; i++) {
            let index = items.indexOf(values[i], fromIndex);
            if (index != -1) {
                items.splice(index, 1);
                changed = true;
            }
        }
        if (changed) {
            this.emit(ObservableList.EVENT_CHANGE);
        }
        return changed;
    }
    removeAt(index) {
        let value = this._items.splice(this._validateIndex(index), 1)[0];
        this.emit(ObservableList.EVENT_CHANGE);
        return value;
    }
    removeRange(index, count) {
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
                throw RangeError('Sum of "index" and "count" out of valid range');
            }
        }
        let values = this._items.splice(index, count);
        this.emit(ObservableList.EVENT_CHANGE);
        return values;
    }
    replace(oldValue, newValue) {
        if (this._sorted) {
            throw TypeError('Cannot replace in sorted list');
        }
        let index = this._items.indexOf(oldValue);
        if (index != -1) {
            this._items[index] = newValue;
            this.emit(ObservableList.EVENT_CHANGE);
            return true;
        }
        return false;
    }
    clear() {
        if (this._items.length) {
            this._items.length = 0;
            this.emit(ObservableList.EVENT_CHANGE);
        }
        return this;
    }
    equals(that) {
        if (!(that instanceof ObservableList)) {
            return false;
        }
        let items = this._items;
        let thatItems = that._items;
        if (items.length != thatItems.length) {
            return false;
        }
        for (let i = items.length; i;) {
            if (items[--i] !== thatItems[i]) {
                return false;
            }
        }
        return true;
    }
    join(separator) {
        return this._items.join(separator);
    }
    find(cb, context) {
        let items = this._items;
        for (let i = 0, l = items.length; i < l; i++) {
            let item = items[i];
            if (cb.call(context, item, i, this)) {
                return item;
            }
        }
        return;
    }
    findIndex(cb, context) {
        let items = this._items;
        for (let i = 0, l = items.length; i < l; i++) {
            if (cb.call(context, items[i], i, this)) {
                return i;
            }
        }
        return -1;
    }
    clone(deep) {
        return new this.constructor(deep
            ? this._items.map(item => item && typeof item == 'object' && item.clone
                ? item.clone.length
                    ? item.clone(true)
                    : item.clone()
                : item)
            : this, {
            comparator: this._comparator || undefined,
            sorted: this._sorted
        });
    }
    absorbFrom(that) {
        if (!(that instanceof ObservableList)) {
            throw TypeError('"that" must be instance of ObservableList');
        }
        let items = this._items;
        let thatItems = that._items;
        let changed = false;
        if (items.length != that.length) {
            items.length = that.length;
            changed = true;
        }
        for (let i = items.length; i;) {
            let item = items[--i];
            let thatItem = thatItems[i];
            if (item !== thatItem) {
                if (item &&
                    thatItem &&
                    typeof item == 'object' &&
                    typeof thatItem == 'object' &&
                    item.absorbFrom &&
                    item.absorbFrom === thatItem.absorbFrom) {
                    if (item.absorbFrom(thatItem)) {
                        changed = true;
                    }
                }
                else {
                    items[i] = thatItem;
                    changed = true;
                }
            }
        }
        if (changed) {
            this.emit(ObservableList.EVENT_CHANGE);
        }
        return changed;
    }
    toArray() {
        return this._items.slice();
    }
    toString() {
        return this._items.join();
    }
    _insertSortedValue(value) {
        let items = this._items;
        let comparator = this._comparator;
        let low = 0;
        let high = items.length;
        while (low != high) {
            let mid = (low + high) >> 1;
            if (comparator(value, items[mid]) < 0) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        items.splice(low, 0, value);
    }
}
ObservableList.EVENT_CHANGE = 'change';
['forEach', 'map', 'filter', 'every', 'some'].forEach(name => {
    ObservableList.prototype[name] = function (cb, context) {
        return this._items[name](function (item, index) {
            return cb.call(context, item, index, this);
        }, this);
    };
});
['reduce', 'reduceRight'].forEach(name => {
    ObservableList.prototype[name] = function (cb, initialValue) {
        let list = this;
        function wrapper(accumulator, item, index) {
            return cb(accumulator, item, index, list);
        }
        return arguments.length >= 2
            ? this._items[name](wrapper, initialValue)
            : this._items[name](wrapper);
    };
});
[
    ['keys', (index) => index],
    ['values', (_index, item) => item],
    ['entries', (index, item) => [index, item]]
].forEach((settings) => {
    let getStepValue = settings[1];
    ObservableList.prototype[settings[0]] = function () {
        let items = this._items;
        let index = 0;
        let done = false;
        return {
            next() {
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
ObservableList.prototype[Symbol.iterator] = ObservableList.prototype.values;
