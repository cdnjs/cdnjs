/**
 * Axis Tick module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Tick } from "../elements/Tick";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws an axis tick
 * @see {@link IAxisTickEvents} for a list of available events
 * @see {@link IAxisTickAdapters} for a list of available Adapters
 */
var AxisTick = /** @class */ (function (_super) {
    __extends(AxisTick, _super);
    function AxisTick() {
        var _this = _super.call(this) || this;
        _this.className = "AxisTick";
        _this.element = _this.paper.add("path");
        _this.location = 0.5;
        _this.above = false;
        _this.isMeasured = false;
        _this.pixelPerfect = true;
        _this.strokeOpacity = 0;
        _this.length = 5;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(AxisTick.prototype, "location", {
        /**
         * @return Location (0-1)
         */
        get: function () {
            return this.getPropertyValue("location");
        },
        /**
         * Relative location of the tick. (0-1)
         *
         * @param value  Location (0-1)
         */
        set: function (value) {
            this.setPropertyValue("location", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisTick.prototype, "inside", {
        /**
         * Returns if label is set to be drawn inside axis.
         *
         * @return Inside?
         */
        get: function () {
            return this.getPropertyValue("inside");
        },
        /**
         * Sets if tick should be drawn inside axis.
         *
         * @param value  Inside?
         */
        set: function (value) {
            this.setPropertyValue("inside", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisTick.prototype, "above", {
        /**
         * @return Draw above series?
         */
        get: function () {
            return this.getPropertyValue("above");
        },
        /**
         * Normally tick goes below series. Set this to `true` to go above.
         *
         * @default false
         * @since 4.5.9
         * @param  value  Draw above series?
         */
        set: function (value) {
            this.setPropertyValue("above", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     */
    AxisTick.prototype.setDisabled = function (value) {
        var changed = _super.prototype.setDisabled.call(this, value);
        if (this.axis) {
            this.axis.invalidateDataItems();
        }
        return changed;
    };
    return AxisTick;
}(Tick));
export { AxisTick };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisTick"] = AxisTick;
//# sourceMappingURL=AxisTick.js.map