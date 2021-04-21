import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisFill } from "./AxisFill";
import { percent } from "../../core/utils/Percent";
import { registry } from "../../core/Registry";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Provides fill element functionality for circular Axes.
 *
 * @see {@link IAxisFillCircularEvents} for a list of available events
 * @see {@link IAxisFillCircularAdapters} for a list of available Adapters
 * @todo Needs description
 */
var AxisFillCircular = /** @class */ (function (_super) {
    __extends(AxisFillCircular, _super);
    /**
     * Constructor.
     *
     * @param axis Axis
     */
    function AxisFillCircular(axis) {
        var _this = _super.call(this, axis) || this;
        _this.className = "AxisFillCircular";
        _this.element = _this.paper.add("path");
        _this.radius = percent(100);
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the fill element.
     *
     * @ignore Exclude from docs
     */
    AxisFillCircular.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.__disabled || this.disabled) {
            return;
        }
        if (this.axis) {
            var renderer = this.axis.renderer;
            this.fillPath = renderer.getPositionRangePath(this.startPosition, this.endPosition, this.radius, $type.hasValue(this.innerRadius) ? this.innerRadius : renderer.innerRadius, this.cornerRadius);
            this.path = this.fillPath;
        }
    };
    Object.defineProperty(AxisFillCircular.prototype, "innerRadius", {
        /**
         * @return Inner radius
         */
        get: function () {
            return this.getPropertyValue("innerRadius");
        },
        /**
         * Inner radius of the fill. Relative ([[Percent]]) or absolute (pixels).
         *
         * @param value  Inner radius
         */
        set: function (value) {
            this.setPercentProperty("innerRadius", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisFillCircular.prototype, "radius", {
        /**
         * @return Outer radius
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * Outer radius of the fill. Relative ([[Percent]]) or absolute (pixels).
         *
         * @param value  Outer radius
         */
        set: function (value) {
            this.setPercentProperty("radius", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AxisFillCircular.prototype, "cornerRadius", {
        /**
         * @return Corner radius (px)
         */
        get: function () {
            return this.getPropertyValue("cornerRadius");
        },
        /**
         * Corner radius for the fill. In pixels.
         *
         * @param value  Corner radius (px)
         */
        set: function (value) {
            this.setPropertyValue("cornerRadius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return AxisFillCircular;
}(AxisFill));
export { AxisFillCircular };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["AxisFillCircular"] = AxisFillCircular;
//# sourceMappingURL=AxisFillCircular.js.map