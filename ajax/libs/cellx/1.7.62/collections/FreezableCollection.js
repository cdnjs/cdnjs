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
var EventEmitter_1 = require("../EventEmitter");
var FreezableCollection = /** @class */ (function (_super) {
    __extends(FreezableCollection, _super);
    function FreezableCollection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isFrozen = false;
        return _this;
    }
    Object.defineProperty(FreezableCollection.prototype, "isFrozen", {
        get: function () {
            return this._isFrozen;
        },
        enumerable: true,
        configurable: true
    });
    FreezableCollection.prototype.freeze = function () {
        this._isFrozen = true;
        return this;
    };
    FreezableCollection.prototype.unfreeze = function () {
        this._isFrozen = false;
        return this;
    };
    FreezableCollection.prototype._throwIfFrozen = function (msg) {
        if (this._isFrozen) {
            throw new TypeError(msg || 'Frozen collection cannot be mutated');
        }
    };
    return FreezableCollection;
}(EventEmitter_1.EventEmitter));
exports.FreezableCollection = FreezableCollection;
