/**
 * A module which defines functionality related to Value Axis Break.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisBreak } from "./AxisBreak";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Base class to define "breaks" on value axis.
 *
 * A "break" can be used to "cut out" specific ranges of the axis scale, e.g.
 * when comparing columns with relatively similar values, it would make sense
 * to cut out their mid section, so that their tip differences are more
 * prominent.
 *
 * @see {@link IValueAxisBreakEvents} for a list of available events
 * @see {@link IValueAxisBreakAdapters} for a list of available Adapters
 * @important
 */
var ValueAxisBreak = /** @class */ (function (_super) {
    __extends(ValueAxisBreak, _super);
    /**
     * Constructor
     */
    function ValueAxisBreak() {
        var _this = _super.call(this) || this;
        _this.className = "ValueAxisBreak";
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(ValueAxisBreak.prototype, "startPosition", {
        /**
         * Pixel position of the break's start.
         *
         * @return Position (px)
         * @readonly
         */
        get: function () {
            if (this.axis) {
                return this.axis.valueToPosition(this.adjustedStartValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueAxisBreak.prototype, "endPosition", {
        /**
         * Pixel position of the break's end.
         *
         * @return Position (px)
         * @readonly
         */
        get: function () {
            if (this.axis) {
                return this.axis.valueToPosition(this.adjustedEndValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    return ValueAxisBreak;
}(AxisBreak));
export { ValueAxisBreak };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ValueAxisBreak"] = ValueAxisBreak;
//# sourceMappingURL=ValueAxisBreak.js.map