/**
 * DateAxisBreak includes functionality to add breaks on a [[DateAxis]].
 *
 * A "break" can be used to "cut out" specific ranges of the axis scale, e.g.
 * weekends and holidays out of the Date-based axis.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ValueAxisBreak } from "./ValueAxisBreak";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to define breaks for [[DateAxis]].
 *
 * A "break" can be used to "cut out" specific ranges of the axis scale, e.g.
 * weekends and holidays out of the Date-based axis.
 *
 * @see {@link IDateAxisBreakEvents} for a list of available events
 * @see {@link IDateAxisBreakAdapters} for a list of available Adapters
 * @important
 */
var DateAxisBreak = /** @class */ (function (_super) {
    __extends(DateAxisBreak, _super);
    /**
     * Constructor
     */
    function DateAxisBreak() {
        var _this = _super.call(this) || this;
        _this.className = "DateAxisBreak";
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(DateAxisBreak.prototype, "startDate", {
        /**
         * @return Start date
         */
        get: function () {
            return this.getPropertyValue("startDate");
        },
        /**
         * Starting date for the break.
         *
         * @param value Start date
         */
        set: function (value) {
            if (this.setPropertyValue("startDate", value)) {
                this.startValue = value.getTime();
                if (this.axis) {
                    this.axis.invalidate();
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxisBreak.prototype, "endDate", {
        /**
         * @return End date
         */
        get: function () {
            return this.getPropertyValue("endDate");
        },
        /**
         * Ending date for the break.
         *
         * @param value End date
         */
        set: function (value) {
            if (this.setPropertyValue("endDate", value)) {
                this.endValue = value.getTime();
                if (this.axis) {
                    this.axis.invalidate();
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return DateAxisBreak;
}(ValueAxisBreak));
export { DateAxisBreak };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["DateAxisBreak"] = DateAxisBreak;
//# sourceMappingURL=DateAxisBreak.js.map