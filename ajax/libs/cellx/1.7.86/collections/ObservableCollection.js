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
var map_set_polyfill_1 = require("@riim/map-set-polyfill");
var EventEmitter_1 = require("../EventEmitter");
var ObservableCollection = /** @class */ (function (_super) {
    __extends(ObservableCollection, _super);
    function ObservableCollection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._valueCounts = new map_set_polyfill_1.Map();
        return _this;
    }
    Object.defineProperty(ObservableCollection.prototype, "adoptsValueChanges", {
        get: function () {
            return this._adoptsValueChanges;
        },
        enumerable: true,
        configurable: true
    });
    ObservableCollection.prototype._onItemChange = function (evt) {
        this.handleEvent(evt);
    };
    ObservableCollection.prototype._registerValue = function (value) {
        var valueCounts = this._valueCounts;
        var valueCount = valueCounts.get(value);
        if (valueCount) {
            valueCounts.set(value, valueCount + 1);
        }
        else {
            valueCounts.set(value, 1);
            if (this._adoptsValueChanges && value instanceof EventEmitter_1.EventEmitter) {
                value.on('change', this._onItemChange, this);
            }
        }
        return value;
    };
    ObservableCollection.prototype._unregisterValue = function (value) {
        var valueCounts = this._valueCounts;
        var valueCount = valueCounts.get(value);
        if (valueCount == 1) {
            valueCounts.delete(value);
            if (this._adoptsValueChanges && value instanceof EventEmitter_1.EventEmitter) {
                value.off('change', this._onItemChange, this);
            }
        }
        else {
            valueCounts.set(value, valueCount - 1);
        }
    };
    return ObservableCollection;
}(EventEmitter_1.EventEmitter));
exports.ObservableCollection = ObservableCollection;
