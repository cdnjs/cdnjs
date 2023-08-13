import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import * as $array from "./Array";
import * as $type from "./Type";
/**
 * A base class for disposable objects.
 *
 * @ignore Exclude from docs
 */
var Disposer = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param dispose  Function that disposes object
     */
    function Disposer(dispose) {
        this._disposed = false;
        this._dispose = dispose;
    }
    /**
     * Checks if object is disposed.
     *
     * @return Disposed?
     */
    Disposer.prototype.isDisposed = function () {
        return this._disposed;
    };
    /**
     * Disposes the object.
     */
    Disposer.prototype.dispose = function () {
        if (!this._disposed) {
            this._disposed = true;
            this._dispose();
        }
    };
    return Disposer;
}());
export { Disposer };
/**
 * A collection of related disposers that can be disposed in one go.
 *
 * @ignore Exclude from docs
 */
var MultiDisposer = /** @class */ (function (_super) {
    __extends(MultiDisposer, _super);
    function MultiDisposer(disposers) {
        return _super.call(this, function () {
            $array.each(disposers, function (x) {
                x.dispose();
            });
        }) || this;
    }
    return MultiDisposer;
}(Disposer));
export { MultiDisposer };
/**
 * A special kind of Disposer that has attached value set.
 *
 * If a new value is set using `set()` method, the old disposer value is
 * disposed.
 *
 * @ignore Exclude from docs
 * @todo Description
 */
var MutableValueDisposer = /** @class */ (function (_super) {
    __extends(MutableValueDisposer, _super);
    /**
     * Constructor.
     */
    function MutableValueDisposer() {
        var _this = _super.call(this, function () {
            if ($type.hasValue(_this._disposer)) {
                _this._disposer.dispose();
                _this._disposer = undefined;
            }
        }) || this;
        return _this;
    }
    /**
     * Returns current value.
     *
     * @return Value
     */
    MutableValueDisposer.prototype.get = function () {
        return this._value;
    };
    /**
     * Sets value and disposes previous disposer if it was set.
     *
     * @param value     New value
     * @param disposer  Disposer
     */
    MutableValueDisposer.prototype.set = function (value, disposer) {
        if ($type.hasValue(this._disposer)) {
            this._disposer.dispose();
        }
        this._disposer = disposer;
        this._value = value;
    };
    /**
     * Resets the disposer value.
     */
    MutableValueDisposer.prototype.reset = function () {
        this.set(undefined, undefined);
    };
    return MutableValueDisposer;
}(Disposer));
export { MutableValueDisposer };
/**
 * @ignore Exclude from docs
 * @todo Description
 */
var CounterDisposer = /** @class */ (function (_super) {
    __extends(CounterDisposer, _super);
    function CounterDisposer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * [_counter description]
         *
         * @todo Description
         */
        _this._counter = 0;
        return _this;
    }
    /**
     * [increment description]
     *
     * @todo Description
     */
    CounterDisposer.prototype.increment = function () {
        var _this = this;
        // TODO throw an error if it is disposed
        ++this._counter;
        // TODO make this more efficient
        return new Disposer(function () {
            --_this._counter;
            if (_this._counter === 0) {
                _this.dispose();
            }
        });
    };
    return CounterDisposer;
}(Disposer));
export { CounterDisposer };
//# sourceMappingURL=Disposer.js.map