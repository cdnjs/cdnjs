/**
 * Functionality for drawing Stars.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../../core/Sprite";
import { registry } from "../../core/Registry";
import * as $path from "../../core/rendering/Path";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
import * as $utils from "../../core/utils/Utils";
import { percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a Star shape.
 *
 * @since 4.5.7
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/plugin-bullets/} for usage instructions.
 * @see {@link IStarEvents} for a list of available events
 * @see {@link IStarAdapters} for a list of available Adapters
 */
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    /**
     * Constructor
     */
    function Star() {
        var _this = _super.call(this) || this;
        _this.className = "Star";
        _this.pointCount = 5;
        _this.arc = 360;
        _this.radius = 100;
        _this.innerRadius = percent(30);
        _this.cornerRadius = 0;
        _this.innerCornerRadius = 0;
        _this.startAngle = -90;
        _this.element = _this.paper.add("path");
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    Star.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var startAngle = this.startAngle;
        var arc = this.arc;
        var pointCount = this.pointCount;
        var radius = this.radius;
        var innerRadius = this.pixelInnerRadius;
        var cornerRadius = this.cornerRadius;
        if (cornerRadius > radius - innerRadius) {
            cornerRadius = radius - innerRadius;
        }
        var innerCornerRadius = this.innerCornerRadius;
        if (innerCornerRadius > radius - cornerRadius - innerRadius) {
            innerCornerRadius = radius - cornerRadius - innerRadius;
        }
        var halfAngle = arc / pointCount / 2;
        var path = "";
        for (var i = 0; i < pointCount; i++) {
            var angle = startAngle + i * arc / pointCount;
            if (cornerRadius > 0) {
                var p0 = { x: innerRadius * $math.cos(angle - halfAngle), y: innerRadius * $math.sin(angle - halfAngle) };
                var p1 = { x: radius * $math.cos(angle), y: radius * $math.sin(angle) };
                var p2 = { x: innerRadius * $math.cos(angle + halfAngle), y: innerRadius * $math.sin(angle + halfAngle) };
                var a1 = $math.getAngle(p1, p0);
                var a2 = $math.getAngle(p1, p2);
                var x1 = p1.x + cornerRadius * $math.cos(a1);
                var y1 = p1.y + cornerRadius * $math.sin(a1);
                var x2 = p1.x + cornerRadius * $math.cos(a2);
                var y2 = p1.y + cornerRadius * $math.sin(a2);
                path += $path.lineTo({ x: x1, y: y1 });
                path += " Q" + p1.x + "," + p1.y + " " + x2 + "," + y2;
            }
            else {
                path += $path.lineTo({ x: radius * $math.cos(angle), y: radius * $math.sin(angle) });
            }
            angle += halfAngle;
            if (innerCornerRadius > 0) {
                var p0 = { x: radius * $math.cos(angle - halfAngle), y: radius * $math.sin(angle - halfAngle) };
                var p1 = { x: innerRadius * $math.cos(angle), y: innerRadius * $math.sin(angle) };
                var p2 = { x: radius * $math.cos(angle + halfAngle), y: radius * $math.sin(angle + halfAngle) };
                var a1 = $math.getAngle(p1, p0);
                var a2 = $math.getAngle(p1, p2);
                var x1 = p1.x + innerCornerRadius * $math.cos(a1);
                var y1 = p1.y + innerCornerRadius * $math.sin(a1);
                var x2 = p1.x + innerCornerRadius * $math.cos(a2);
                var y2 = p1.y + innerCornerRadius * $math.sin(a2);
                path += $path.lineTo({ x: x1, y: y1 });
                path += " Q" + p1.x + "," + p1.y + " " + x2 + "," + y2;
            }
            else {
                path += $path.lineTo({ x: innerRadius * $math.cos(angle), y: innerRadius * $math.sin(angle) });
            }
        }
        if (this.arc < 360) {
            path += $path.lineTo({ x: 0, y: 0 });
        }
        path += $path.closePath();
        path = path.replace("L", "M");
        this.path = path;
    };
    Object.defineProperty(Star.prototype, "startAngle", {
        /**
         * @return Angle (0-360)
         */
        get: function () {
            return this.getPropertyValue("startAngle");
        },
        /**
         * The angle at which left edge of the star is drawn. (0-360)
         *
         * 0 is to the right of the center.
         *
         * @default -90
         * @param value  Angle (0-360)
         */
        set: function (value) {
            this.setPropertyValue("startAngle", $math.normalizeAngle(value), true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Star.prototype, "arc", {
        /**
         * @return Arc scope
         */
        get: function () {
            return this.getPropertyValue("arc");
        },
        /**
         * How much of a complete circle the star will complete.
         *
         * A complete circle is 350 degrees. If set to 180, only half a star will
         * be drawn
         *
         * @default 360
         * @param  value  Arc scope
         */
        set: function (value) {
            if (!$type.isNumber(value)) {
                value = 360;
            }
            this.setPropertyValue("arc", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Star.prototype, "radius", {
        /**
         * @return Radius (px)
         */
        get: function () {
            var radius = this.getPropertyValue("radius");
            if (!$type.isNumber(radius)) {
                radius = 0;
            }
            return radius;
        },
        /**
         * Radius of the star in pixels.
         *
         * @default 100
         * @param value  Radius (px)
         */
        set: function (value) {
            this.setPropertyValue("radius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Star.prototype, "radiusY", {
        /**
         * @return Vertical radius (0-1)
         */
        get: function () {
            var value = this.getPropertyValue("radiusY");
            if (!$type.isNumber(value)) {
                value = this.radius;
            }
            return value;
        },
        /**
         * Vertical radius for creating skewed star shapes.
         *
         * This is relevant to `radius`, e.g. 0.5 will set vertical radius to half
         * the `radius`.
         *
         * @param value Vertical radius (0-1)
         */
        set: function (value) {
            this.setPropertyValue("radiusY", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Star.prototype, "innerRadius", {
        /**
         * @return Radius (px or %)
         */
        get: function () {
            return this.getPropertyValue("innerRadius");
        },
        /**
         * Inner radius of the star (cutout).
         *
         * It can be set either by absolute pixel value or relative to radius in
         * percent.
         *
         * @default 0
         * @param value  Radius (px or %)
         */
        set: function (value) {
            this.setPercentProperty("innerRadius", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Star.prototype, "pixelInnerRadius", {
        /**
         * @return Radius px
         */
        get: function () {
            return $utils.relativeToValue(this.innerRadius, this.radius);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Star.prototype, "cornerRadius", {
        /**
         * @return Radius (px)
         */
        get: function () {
            return this.getPropertyValue("cornerRadius");
        },
        /**
         * Radius of star's outer corners in pixels.
         *
         * @default 0
         * @param value  Radius (px)
         */
        set: function (value) {
            this.setPropertyValue("cornerRadius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Star.prototype, "innerCornerRadius", {
        /**
         * @return Radius (px)
         */
        get: function () {
            return this.getPropertyValue("innerCornerRadius");
        },
        /**
         * Radius of star's inner corners in pixels.
         *
         * @default 0
         * @param value  Radius (px)
         */
        set: function (value) {
            this.setPropertyValue("innerCornerRadius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Star.prototype, "pointCount", {
        /**
         * @return Number of star points
         */
        get: function () {
            var value = this.getPropertyValue("pointCount");
            return $math.max(3, value);
        },
        /**
         * Number of start points
         *
         * @default 5
         * @param value
         */
        set: function (value) {
            this.setPropertyValue("pointCount", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return Star;
}(Sprite));
export { Star };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Star"] = Star;
//# sourceMappingURL=Star.js.map