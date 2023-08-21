/**
 * Axis Label module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Label } from "../../core/elements/Label";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Use to create labels on Axis.
 *
 * @see {@link IAxisLabelEvents} for a list of available events
 * @see {@link IAxisLabelAdapters} for a list of available Adapters
 * @important
 */
var AxisLabel = /** @class */ (function (_super) {
    __extends(AxisLabel, _super);
    /**
     * Constructor
     */
    function AxisLabel() {
        var _this = _super.call(this) || this;
        _this.className = "AxisLabel";
        _this.isMeasured = false;
        _this.padding(10, 10, 10, 10);
        _this.location = 0.5;
        //this.nonScaling = true; // not good for perf
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(AxisLabel.prototype, "location", {
        /**
         * @return Location (0-1)
         */
        get: function () {
            return this.getPropertyValue("location");
        },
        /**
         * Relative location of the label. (0-1)
         *
         * @param value  Location (0-1)
         */
        set: function (value) {
            this.setPropertyValue("location", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisLabel.prototype, "inside", {
        /**
         * Returns if label is set to be drawn inside axis.
         *
         * @return Inside?
         */
        get: function () {
            return this.getPropertyValue("inside");
        },
        /**
         * Sets if label should be drawn inside axis.
         *
         * @param value  Inside?
         */
        set: function (value) {
            this.setPropertyValue("inside", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     */
    AxisLabel.prototype.setDisabled = function (value) {
        var changed = _super.prototype.setDisabled.call(this, value);
        if (this.axis) {
            this.axis.invalidateDataItems();
        }
        return changed;
    };
    return AxisLabel;
}(Label));
export { AxisLabel };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisLabel"] = AxisLabel;
//# sourceMappingURL=AxisLabel.js.map