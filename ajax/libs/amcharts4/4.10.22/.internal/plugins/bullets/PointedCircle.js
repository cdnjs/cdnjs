/**
 * Pointed rectangle module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PointedShape } from "../../core/elements/PointedShape";
import { registry } from "../../core/Registry";
import * as $path from "../../core/rendering/Path";
import * as $math from "../../core/utils/Math";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a circle with a pointer.
 *
 * @since 4.5.7
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/plugin-bullets/} for usage instructions.
 * @see {@link IPointedCircleEvents} for a list of available events
 * @see {@link IPointedCircleAdapters} for a list of available Adapters
 */
var PointedCircle = /** @class */ (function (_super) {
    __extends(PointedCircle, _super);
    /**
     * Constructor
     */
    function PointedCircle() {
        var _this = _super.call(this) || this;
        _this.className = "PointedCircle";
        _this.element = _this.paper.add("path");
        _this.radius = 18;
        _this.pointerAngle = 90;
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    PointedCircle.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var pw = this.pointerBaseWidth;
        var pl = this.pointerLength;
        if (pl <= 0.001) {
            pl = 0.001;
        }
        var angle = this.pointerAngle + 180;
        var radius = this.radius;
        if (pw > 2 * radius) {
            pw = 2 * radius;
        }
        var x = this.pointerX;
        var y = this.pointerY;
        var path = $path.moveTo({ x: x, y: x });
        var da = $math.DEGREES * Math.atan(pw / 2 / pl);
        if (da <= 0.001) {
            da = 0.001;
        }
        var a1 = angle - da;
        var a2 = angle + da;
        path += $path.lineTo({ x: x + pl * $math.cos(a1), y: y + pl * $math.sin(a1) });
        path += $path.arcToPoint({ x: x + pl * $math.cos(a2), y: y + pl * $math.sin(a2) }, radius, radius, true, true);
        path += $path.lineTo({ x: x, y: x });
        this.path = path;
    };
    Object.defineProperty(PointedCircle.prototype, "radius", {
        /**
         * @return Radius (px)
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * Radius of a circle in pixels.
         *
         * @default 18
         * @param  value  Radius (px)
         */
        set: function (value) {
            this.setPropertyValue("radius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointedCircle.prototype, "pointerAngle", {
        /**
         * @return Angle of a pointer, in degrees.
         */
        get: function () {
            return this.getPropertyValue("pointerAngle");
        },
        /**
         * Angle of a pointer, in degrees.
         *
         * @default 90
         * @param  value Angle (degrees)
         */
        set: function (value) {
            this.setPropertyValue("pointerAngle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    PointedCircle.prototype.getTooltipY = function () {
        return $math.sin(this.pointerAngle) * (-this.pointerLength * 0.8 - this.radius) - this.radius;
    };
    PointedCircle.prototype.getTooltipX = function () {
        return $math.cos(this.pointerAngle) * (-this.pointerLength * 0.8 - this.radius);
    };
    return PointedCircle;
}(PointedShape));
export { PointedCircle };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["PointerCircle"] = PointedCircle;
//# sourceMappingURL=PointedCircle.js.map