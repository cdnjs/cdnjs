/**
 * A module which defines functionality related to Category Axis Break.
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
 * Base class to define "breaks" in axes
 * @see {@link ICategoryAxisBreakEvents} for a list of available events
 * @see {@link ICategoryAxisBreakAdapters} for a list of available Adapters
 */
var CategoryAxisBreak = /** @class */ (function (_super) {
    __extends(CategoryAxisBreak, _super);
    /**
     * Constructor
     */
    function CategoryAxisBreak() {
        var _this = _super.call(this) || this;
        _this.className = "CategoryAxisBreak";
        _this.properties.startLocation = 0.5;
        _this.properties.endLocation = 0.5;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(CategoryAxisBreak.prototype, "startPosition", {
        /**
         * Pixel position of the break's start.
         *
         * @return Position (px)
         * @readonly
         */
        get: function () {
            if (this.axis) {
                return this.axis.indexToPosition(this.adjustedStartValue, this.startLocation);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryAxisBreak.prototype, "endPosition", {
        /**
         * Pixel position of the break's end.
         *
         * @return Position (px)
         * @readonly
         */
        get: function () {
            if (this.axis) {
                return this.axis.indexToPosition(this.adjustedEndValue, this.endLocation);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryAxisBreak.prototype, "startCategory", {
        /**
         * @return Start category
         */
        get: function () {
            return this.getPropertyValue("startCategory");
        },
        /**
         * A category break starts on.
         *
         * @param value Start category
         */
        set: function (value) {
            if (this.setPropertyValue("startCategory", value)) {
                if (this.axis) {
                    this.axis.invalidateDataItems();
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryAxisBreak.prototype, "endCategory", {
        /**
         * @return End category
         */
        get: function () {
            return this.getPropertyValue("endCategory");
        },
        /**
         * A category break ends on.
         *
         * @param value  End category
         */
        set: function (value) {
            if (this.setPropertyValue("endCategory", value)) {
                if (this.axis) {
                    this.axis.invalidateDataItems();
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryAxisBreak.prototype, "startValue", {
        /**
         * @return Value
         */
        get: function () {
            var category = this.getPropertyValue("startCategory");
            if (category) {
                return this.axis.categoryToIndex(category);
            }
            else {
                return this.getPropertyValue("startValue");
            }
        },
        /**
         * An index of start category.
         *
         * @param value  Value
         */
        set: function (value) {
            if (this.setPropertyValue("startValue", value)) {
                if (this.axis) {
                    this.axis.invalidateDataItems();
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryAxisBreak.prototype, "endValue", {
        /**
         * @return Value
         */
        get: function () {
            var category = this.getPropertyValue("endCategory");
            if (category) {
                return this.axis.categoryToIndex(category);
            }
            else {
                return this.getPropertyValue("endValue");
            }
        },
        /**
         * An index of end category or a end value.
         *
         * @param value  Value
         */
        set: function (value) {
            if (this.setPropertyValue("endValue", value)) {
                if (this.axis) {
                    this.axis.invalidateDataItems();
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryAxisBreak.prototype, "startLocation", {
        /**
         * @return Break start location
         */
        get: function () {
            return this.getPropertyValue("startLocation");
        },
        /**
         * Indicates where within starting category break should begin.
         *
         * Values range from `0` (start) to `1` (end), with default being `0.5` (middle).
         *
         * E.g. if you want to a break to fully encompass start and end categories,
         * you should set `startLocation = 0` and `endLocation = 1`.
         *
         * @since 4.9.17
         * @default 0.5
         * @param  value  Break start location
         */
        set: function (value) {
            if (this.setPropertyValue("startLocation", value)) {
                if (this.axis) {
                    this.axis.invalidateDataItems();
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryAxisBreak.prototype, "endLocation", {
        /**
         * @return Break end location
         */
        get: function () {
            return this.getPropertyValue("endLocation");
        },
        /**
         * Indicates where within ending category break should end.
         *
         * Values range from `0` (start) to `1` (end), with default being `0.5` (middle).
         *
         * E.g. if you want to a break to fully encompass start and end categories,
         * you should set `startLocation = 0` and `endLocation = 1`.
         *
         * @since 4.9.17
         * @default 0.5
         * @param  value  Break end location
         */
        set: function (value) {
            if (this.setPropertyValue("endLocation", value)) {
                if (this.axis) {
                    this.axis.invalidateDataItems();
                    this.axis.invalidateSeries();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return CategoryAxisBreak;
}(AxisBreak));
export { CategoryAxisBreak };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["CategoryAxisBreak"] = CategoryAxisBreak;
//# sourceMappingURL=CategoryAxisBreak.js.map