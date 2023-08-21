/**
 * Module that defines everything related to building OHLCs.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Candlestick } from "./Candlestick";
import { Line } from "../../core/elements/Line";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to creates OHLCs.
 *
 * @see {@link IOHLCEvents} for a list of available events
 * @see {@link IOHLCAdapters} for a list of available Adapters
 * @todo Usage example
 * @important
 */
var OHLC = /** @class */ (function (_super) {
    __extends(OHLC, _super);
    /**
     * Constructor
     */
    function OHLC() {
        var _this = _super.call(this) || this;
        _this.className = "OHLC";
        _this.layout = "none";
        return _this;
    }
    /**
     * @ignore
     */
    OHLC.prototype.createAssets = function () {
        //super.createAssets();
        this.openLine = this.createChild(Line);
        this.openLine.shouldClone = false;
        this.highLowLine = this.createChild(Line);
        this.highLowLine.shouldClone = false;
        this.closeLine = this.createChild(Line);
        this.closeLine.shouldClone = false;
    };
    /**
     * Copies all parameters from another [[OHLC]].
     *
     * @param source Source OHLC
     */
    OHLC.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        if (this.openLine) {
            this.openLine.copyFrom(source.openLine);
        }
        if (this.highLowLine) {
            this.highLowLine.copyFrom(source.highLowLine);
        }
        if (this.closeLine) {
            this.closeLine.copyFrom(source.closeLine);
        }
    };
    return OHLC;
}(Candlestick));
export { OHLC };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["OHLC"] = OHLC;
//# sourceMappingURL=OHLC.js.map