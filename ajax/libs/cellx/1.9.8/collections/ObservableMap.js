import { EventEmitter } from '../EventEmitter';
const hasOwn = Object.prototype.hasOwnProperty;
export class ObservableMap extends EventEmitter {
    constructor(entries) {
        super();
        this._entries = new Map();
        if (entries) {
            let mapEntries = this._entries;
            if (entries instanceof Map || entries instanceof ObservableMap) {
                (entries instanceof Map ? entries : entries._entries).forEach((value, key) => {
                    mapEntries.set(key, value);
                });
            }
            else if (Array.isArray(entries)) {
                for (let i = 0, l = entries.length; i < l; i++) {
                    mapEntries.set(entries[i][0], entries[i][1]);
                }
            }
            else {
                for (let key in entries) {
                    if (hasOwn.call(entries, key)) {
                        mapEntries.set(key, entries[key]);
                    }
                }
            }
        }
    }
    get size() {
        return this._entries.size;
    }
    onChange(listener, context) {
        return this.on(ObservableMap.EVENT_CHANGE, listener, context);
    }
    offChange(listener, context) {
        return this.off(ObservableMap.EVENT_CHANGE, listener, context);
    }
    has(key) {
        return this._entries.has(key);
    }
    get(key) {
        return this._entries.get(key);
    }
    set(key, value) {
        let entries = this._entries;
        let hasKey = entries.has(key);
        let prev;
        if (hasKey) {
            prev = entries.get(key);
            if (Object.is(value, prev)) {
                return this;
            }
        }
        entries.set(key, value);
        this.emit(ObservableMap.EVENT_CHANGE, {
            subtype: hasKey ? 'update' : 'add',
            key,
            prevValue: prev,
            value
        });
        return this;
    }
    delete(key) {
        let entries = this._entries;
        if (entries.has(key)) {
            let value = entries.get(key);
            entries.delete(key);
            this.emit(ObservableMap.EVENT_CHANGE, {
                subtype: 'delete',
                key,
                value
            });
            return true;
        }
        return false;
    }
    clear() {
        if (this._entries.size) {
            this._entries.clear();
            this.emit(ObservableMap.EVENT_CHANGE, { subtype: 'clear' });
        }
        return this;
    }
    equals(that) {
        if (!(that instanceof ObservableMap)) {
            return false;
        }
        if (this.size != that.size) {
            return false;
        }
        for (let entry of this) {
            if (entry[1] !== that.get(entry[0])) {
                return false;
            }
        }
        return true;
    }
    forEach(cb, context) {
        this._entries.forEach(function (value, key) {
            cb.call(context, value, key, this);
        }, this);
    }
    keys() {
        return this._entries.keys();
    }
    values() {
        return this._entries.values();
    }
    entries() {
        return this._entries.entries();
    }
    clone(deep) {
        let entries;
        if (deep) {
            entries = [];
            this._entries.forEach((value, key) => {
                entries.push([
                    key,
                    value && value.clone ? value.clone(true) : value
                ]);
            });
        }
        return new this.constructor(entries || this);
    }
    absorbFrom(that) {
        if (!(that instanceof ObservableMap)) {
            throw TypeError('"that" must be instance of ObservableMap');
        }
        let entries = this._entries;
        let changed = false;
        for (let [key, value] of entries) {
            if (that.has(key)) {
                let thatValue = that.get(key);
                if (value !== thatValue) {
                    if (value &&
                        thatValue &&
                        value.absorbFrom &&
                        value.absorbFrom ===
                            thatValue.absorbFrom) {
                        if (value.absorbFrom(thatValue)) {
                            changed = true;
                        }
                    }
                    else {
                        entries.set(key, thatValue);
                        changed = true;
                    }
                }
            }
            else {
                entries.delete(key);
                changed = true;
            }
        }
        for (let [key, value] of that) {
            if (!entries.has(key)) {
                entries.set(key, value);
                changed = true;
            }
        }
        if (changed) {
            this.emit(ObservableMap.EVENT_CHANGE, { subtype: 'absorbFrom' });
        }
        return changed;
    }
}
ObservableMap.EVENT_CHANGE = 'change';
ObservableMap.prototype[Symbol.iterator] = ObservableMap.prototype.entries;
