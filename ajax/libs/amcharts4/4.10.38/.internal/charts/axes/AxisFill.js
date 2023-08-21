import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../../core/Sprite";
import { registry } from "../../core/Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * AxisFill is a base class used to defines fill shapes for various
 * type-specific Axes.
 *
 * Axis fills are used to add fills to specific ranges of those axes.
 *
 * @see {@link IAxisFillEvents} for a list of available events
 * @see {@link IAxisFillAdapters} for a list of available Adapters
 * @important
 */
var AxisFill = /** @class */ (function (_super) {
    __extends(AxisFill, _super);
    /**
     * Constructor.
     *
     * @param axis Axis
     */
    function AxisFill(axis) {
        var _this = _super.call(this) || this;
        _this.axis = axis;
        _this.element = _this.paper.add("path");
        _this.className = "AxisFill";
        _this.isMeasured = false;
        _this.location = 0;
        _this.above = false;
        var interfaceColors = new InterfaceColorSet();
        _this.fill = interfaceColors.getFor("alternativeBackground");
        _this.fillOpacity = 0;
        _this.applyTheme();
        return _this;
    }
    /**
     * @ignore
     */
    AxisFill.prototype.setDisabled = function (value) {
        var changed = _super.prototype.setDisabled.call(this, value);
        if (this.axis) {
            this.axis.invalidateDataItems();
        }
        return changed;
    };
    /**
     * Draws the fill element.
     *
     * @ignore Exclude from docs
     */
    AxisFill.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.__disabled || this.disabled) {
            return;
        }
        if (this.axis && $type.isNumber(this.startPosition) && $type.isNumber(this.endPosition)) {
            this.fillPath = this.axis.getPositionRangePath(this.startPosition, this.endPosition);
            this.path = this.fillPath;
            if (this.isMeasured) {
                this.measure();
            }
        }
    };
    Object.defineProperty(AxisFill.prototype, "startPosition", {
        /**
         * @return Start position
         */
        get: function () {
            return this.getPropertyValue("startPosition");
        },
        /**
         * An actual starting position of the fill.
         *
         * @param value  Starting position
         */
        set: function (value) {
            this.setPropertyValue("startPosition", value);
            this.invalidate(); // this is needed as relative position might not change when zooming
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisFill.prototype, "endPosition", {
        /**
         * @return End position
         */
        get: function () {
            return this.getPropertyValue("endPosition");
        },
        /**
         * An actual end position of the fill.
         *
         * @param value End position
         */
        set: function (value) {
            this.setPropertyValue("endPosition", value);
            this.invalidate(); // this is needed as relative position might not change when zooming
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisFill.prototype, "location", {
        /**
         * @return Location (0-1)
         */
        get: function () {
            return this.getPropertyValue("location");
        },
        /**
         * Relative location of the fill. (0-1)
         *
         * @param value Location (0-1)
         */
        set: function (value) {
            this.setPropertyValue("location", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     */
    AxisFill.prototype.setPath = function (value) {
        if (this.setPropertyValue("path", value)) {
            this.element.attr({ "d": value });
            return true;
        }
        return false;
    };
    Object.defineProperty(AxisFill.prototype, "above", {
        /**
         * @return Draw above series?
         */
        get: function () {
            return this.getPropertyValue("above");
        },
        /**
         * Normally fill goes below series. Set this to `true` to go above.
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
    return AxisFill;
}(Sprite));
export { AxisFill };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisFill"] = AxisFill;
//# sourceMappingURL=AxisFill.js.map