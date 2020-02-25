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
var symbol_polyfill_1 = require("@riim/symbol-polyfill");
var EventEmitter_1 = require("../EventEmitter");
var ObservableMap = /** @class */ (function (_super) {
    __extends(ObservableMap, _super);
    function ObservableMap(entries) {
        var _this = _super.call(this) || this;
        _this._entries = new map_set_polyfill_1.Map();
        if (entries) {
            var mapEntries_1 = _this._entries;
            if (entries instanceof map_set_polyfill_1.Map || entries instanceof ObservableMap) {
                (entries instanceof map_set_polyfill_1.Map ? entries : entries._entries).forEach(function (value, key) {
                    mapEntries_1.set(key, value);
                });
            }
            else if (Array.isArray(entries)) {
                for (var i = 0, l = entries.length; i < l; i++) {
                    mapEntries_1.set(entries[i][0], entries[i][1]);
                }
            }
            else {
                for (var key in entries) {
                    mapEntries_1.set(key, entries[key]);
                }
            }
        }
        return _this;
    }
    Object.defineProperty(ObservableMap.prototype, "size", {
        get: function () {
            return this._entries.size;
        },
        enumerable: true,
        configurable: true
    });
    ObservableMap.prototype.has = function (key) {
        return this._entries.has(key);
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
        }
        entries.set(key, value);
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
        if (entries.has(key)) {
            var value = entries.get(key);
            entries.delete(key);
            this.emit('change', {
                subtype: 'delete',
                key: key,
                value: value
            });
            return true;
        }
        return false;
    };
    ObservableMap.prototype.clear = function () {
        if (this._entries.size) {
            this._entries.clear();
            this.emit('change', { subtype: 'clear' });
        }
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
                entries.push([
                    key,
                    value && value.clone ? value.clone(true) : value
                ]);
            });
        }
        return new this.constructor(entries || this);
    };
    return ObservableMap;
}(EventEmitter_1.EventEmitter));
exports.ObservableMap = ObservableMap;
ObservableMap.prototype[symbol_polyfill_1.Symbol.iterator] = ObservableMap.prototype.entries;
