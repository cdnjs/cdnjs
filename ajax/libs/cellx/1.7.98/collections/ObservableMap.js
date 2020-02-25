"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@riim/is");
const map_set_polyfill_1 = require("@riim/map-set-polyfill");
const symbol_polyfill_1 = require("@riim/symbol-polyfill");
const EventEmitter_1 = require("../EventEmitter");
const hasOwn = Object.prototype.hasOwnProperty;
class ObservableMap extends EventEmitter_1.EventEmitter {
    constructor(entries) {
        super();
        this._entries = new map_set_polyfill_1.Map();
        if (entries) {
            let mapEntries = this._entries;
            if (entries instanceof map_set_polyfill_1.Map || entries instanceof ObservableMap) {
                (entries instanceof map_set_polyfill_1.Map ? entries : entries._entries).forEach((value, key) => {
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
            if (is_1.is(value, prev)) {
                return this;
            }
        }
        entries.set(key, value);
        this.emit('change', {
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
            this.emit('change', {
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
            this.emit('change', { subtype: 'clear' });
        }
        return this;
    }
    forEach(callback, context) {
        this._entries.forEach(function (value, key) {
            callback.call(context, value, key, this);
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
}
exports.ObservableMap = ObservableMap;
ObservableMap.prototype[symbol_polyfill_1.Symbol.iterator] = ObservableMap.prototype.entries;
