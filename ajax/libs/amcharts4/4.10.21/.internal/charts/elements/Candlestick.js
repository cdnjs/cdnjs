/**
 * Module that defines everything related to building Candlesticks.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Column } from "./Column";
import { Line } from "../../core/elements/Line";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to creates Candlesticks.
 *
 * @see {@link ICandlestickEvents} for a list of available events
 * @see {@link ICandlestickAdapters} for a list of available Adapters
 * @todo Usage example
 * @important
 */
var Candlestick = /** @class */ (function (_super) {
    __extends(Candlestick, _super);
    /**
     * Constructor
     */
    function Candlestick() {
        var _this = _super.call(this) || this;
        _this.className = "Candlestick";
        _this.layout = "none";
        return _this;
    }
    /**
     * @ignore
     */
    Candlestick.prototype.createAssets = function () {
        _super.prototype.createAssets.call(this);
        this.lowLine = this.createChild(Line);
        this.lowLine.shouldClone = false;
        this.highLine = this.createChild(Line);
        this.highLine.shouldClone = false;
    };
    /**
     * Copies all parameters from another [[Candlestick]].
     *
     * @param source Source Candlestick
     */
    Candlestick.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        if (this.lowLine) {
            this.lowLine.copyFrom(source.lowLine);
        }
        if (this.highLine) {
            this.highLine.copyFrom(source.highLine);
        }
    };
    return Candlestick;
}(Column));
export { Candlestick };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Candlestick"] = Candlestick;
//# sourceMappingURL=Candlestick.js.map