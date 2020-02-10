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
var map_set_polyfill_1 = require("@riim/map-set-polyfill");
var mixin_1 = require("@riim/mixin");
var symbol_polyfill_1 = require("@riim/symbol-polyfill");
var EventEmitter_1 = require("../EventEmitter");
var FreezableCollection_1 = require("./FreezableCollection");
var ObservableCollection_1 = require("./ObservableCollection");
var ObservableMap = /** @class */ (function (_super) {
    __extends(ObservableMap, _super);
    function ObservableMap(entries, opts) {
        var _this = _super.call(this) || this;
        _this._entries = new map_set_polyfill_1.Map();
        FreezableCollection_1.FreezableCollection.call(_this);
        ObservableCollection_1.ObservableCollection.call(_this);
        if (typeof opts == 'boolean') {
            opts = { adoptsValueChanges: opts };
        }
        _this._adoptsValueChanges = !!(opts && opts.adoptsValueChanges);
        if (entries) {
            var mapEntries_1 = _this._entries;
            if (entries instanceof map_set_polyfill_1.Map || entries instanceof ObservableMap) {
                (entries instanceof map_set_polyfill_1.Map ? entries : entries._entries).forEach(function (value, key) {
                    mapEntries_1.set(key, this._registerValue(value));
                }, _this);
            }
            else if (Array.isArray(entries)) {
                for (var i = 0, l = entries.length; i < l; i++) {
                    mapEntries_1.set(entries[i][0], _this._registerValue(entries[i][1]));
                }
            }
            else {
                for (var key in entries) {
                    mapEntries_1.set(key, _this._registerValue(entries[key]));
                }
            }
            _this._size = mapEntries_1.size;
        }
        else {
            _this._size = 0;
        }
        return _this;
    }
    Object.defineProperty(ObservableMap.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    ObservableMap.prototype.has = function (key) {
        return this._entries.has(key);
    };
    ObservableMap.prototype.contains = function (value) {
        return this._valueCounts.has(value);
    };
    ObservableMap.prototype.get = function (key) {
        return this._entries.get(key);
    };
    ObservableMap.prototype.set = function (key, value) {
        var entries = this._entries;
        var hasKey = entries.has(key);
        var prev;
        if (hasKey) {
            prev = entries.get(key);
            if (is_1.is(value, prev)) {
                return this;
            }
            this._throwIfFrozen();
            this._unregisterValue(prev);
        }
        else {
            this._throwIfFrozen();
        }
        entries.set(key, this._registerValue(value));
        if (!hasKey) {
            this._size++;
        }
        this.emit('change', {
            subtype: hasKey ? 'update' : 'add',
            key: key,
            prevValue: prev,
            value: value
        });
        return this;
    };
    ObservableMap.prototype.delete = function (key) {
        var entries = this._entries;
        if (!entries.has(key)) {
            return false;
        }
        this._throwIfFrozen();
        var value = entries.get(key);
        this._unregisterValue(value);
        entries.delete(key);
        this._size--;
        this.emit('change', {
            subtype: 'delete',
            key: key,
            value: value
        });
        return true;
    };
    ObservableMap.prototype.clear = function () {
        if (!this._size) {
            return this;
        }
        this._throwIfFrozen();
        if (this._adoptsValueChanges) {
            this._valueCounts.forEach(function (valueCount, value) {
                if (value instanceof EventEmitter_1.EventEmitter) {
                    value.off('change', this._onItemChange, this);
                }
            }, this);
        }
        this._entries.clear();
        this._valueCounts.clear();
        this._size = 0;
        this.emit('change', {
            subtype: 'clear'
        });
        return this;
    };
    ObservableMap.prototype.forEach = function (callback, context) {
        this._entries.forEach(function (value, key) {
            callback.call(context, value, key, this);
        }, this);
    };
    ObservableMap.prototype.keys = function () {
        return this._entries.keys();
    };
    ObservableMap.prototype.values = function () {
        return this._entries.values();
    };
    ObservableMap.prototype.entries = function () {
        return this._entries.entries();
    };
    ObservableMap.prototype.clone = function (deep) {
        var entries;
        if (deep) {
            entries = [];
            this._entries.forEach(function (value, key) {
                entries.push([key, value.clone ? value.clone() : value]);
            });
        }
        return new this.constructor(entries || this, this._adoptsValueChanges);
    };
    Object.defineProperty(ObservableMap.prototype, "isFrozen", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    ObservableMap.prototype.freeze = function () {
        return this;
    };
    ObservableMap.prototype.unfreeze = function () {
        return this;
    };
    ObservableMap.prototype._throwIfFrozen = function (msg) { };
    Object.defineProperty(ObservableMap.prototype, "adoptsValueChanges", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    ObservableMap.prototype._onItemChange = function (evt) { };
    ObservableMap.prototype._registerValue = function (value) { };
    ObservableMap.prototype._unregisterValue = function (value) { };
    return ObservableMap;
}(EventEmitter_1.EventEmitter));
exports.ObservableMap = ObservableMap;
mixin_1.mixin(ObservableMap.prototype, FreezableCollection_1.FreezableCollection.prototype, ['constructor']);
mixin_1.mixin(ObservableMap.prototype, ObservableCollection_1.ObservableCollection.prototype, ['constructor']);
ObservableMap.prototype[symbol_polyfill_1.Symbol.iterator] = ObservableMap.prototype.entries;
