/**
 * Slice module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../Container";
import { Sprite } from "../Sprite";
import { registry } from "../Registry";
import * as $math from "../utils/Math";
import * as $path from "../rendering/Path";
import * as $type from "../utils/Type";
import * as $utils from "../utils/Utils";
import { Percent } from "../utils/Percent";
import { RadialGradient } from "../rendering/fills/RadialGradient";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a wedged semi-circle - slice. Usually used for Pie/Donut charts.
 *
 * @see {@link ISliceEvents} for a list of available events
 * @see {@link ISliceAdapters} for a list of available Adapters
 */
var Slice = /** @class */ (function (_super) {
    __extends(Slice, _super);
    /**
     * Constructor
     */
    function Slice() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "Slice";
        // Set defaults
        _this.setPropertyValue("cornerRadius", 0);
        _this.setPropertyValue("startAngle", 0);
        _this.setPercentProperty("innerRadius", 0);
        _this.setPercentProperty("radius", 0);
        _this.setPropertyValue("arc", 0);
        _this.setPropertyValue("shiftRadius", 0);
        _this.strokeOpacity = 1;
        _this.setPropertyValue("layout", "none");
        // Create a slice wedge element
        _this.slice = _this.createChild(Sprite);
        _this.slice.isMeasured = false;
        _this._disposers.push(_this.slice);
        //this.element.attr({ "stroke-linejoin": "round" });
        //this.element.attr({ "stroke-linecap": "round" });
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    Slice.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var radiusY = this.radiusY;
        if (this.radius > 0 && radiusY == 0) {
            radiusY = 0.01;
        }
        this.slice.path = $path.arc(this.startAngle, this.arc, this.radius, this.pixelInnerRadius, radiusY, this.cornerRadius, this.innerCornerRadius);
        this.slice.invalidate();
        this.shiftRadius = this.shiftRadius;
        if (this.realFill instanceof RadialGradient) {
            this.updateGradient(this.realFill);
        }
        if (this.realStroke instanceof RadialGradient) {
            this.updateGradient(this.realStroke);
        }
    };
    Slice.prototype.updateGradient = function (gradient) {
        gradient.element.attr({ "gradientUnits": "userSpaceOnUse" });
        gradient.element.attr({ "r": this.radius });
        gradient.cx = 0;
        gradient.cy = 0;
        gradient.element.attr({ radius: this.radius });
    };
    Object.defineProperty(Slice.prototype, "bbox", {
        /**
         * Returns bounding box (square) for this element.
         *
         * @ignore Exclude from docs
         */
        get: function () {
            if (this.definedBBox) {
                return this.definedBBox;
            }
            if (this.isMeasured) {
                var innerRect = $math.getArcRect(this.startAngle, this.startAngle + this.arc, this.pixelInnerRadius);
                var outerRect = $math.getArcRect(this.startAngle, this.startAngle + this.arc, this.radius);
                return $math.getCommonRectangle([innerRect, outerRect]);
            }
            else {
                return { x: 0, y: 0, width: 0, height: 0 };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slice.prototype, "startAngle", {
        /**
         * @return Angle (0-360)
         */
        get: function () {
            return this.getPropertyValue("startAngle");
        },
        /**
         * The angle at which left edge of the slice is drawn. (0-360)
         *
         * 0 is to the right of the center.
         *
         * @param value  Angle (0-360)
         */
        set: function (value) {
            this.setPropertyValue("startAngle", $math.normalizeAngle(value), true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slice.prototype, "arc", {
        /**
         * @return [description]
         */
        get: function () {
            return this.getPropertyValue("arc");
        },
        /**
         * [arc description]
         *
         * @todo Description
         * @param value [description]
         */
        set: function (value) {
            if (!$type.isNumber(value)) {
                value = 0;
            }
            this.setPropertyValue("arc", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slice.prototype, "radius", {
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
         * Radius of the slice in pixels.
         *
         * @param value  Radius (px)
         */
        set: function (value) {
            this.setPropertyValue("radius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slice.prototype, "radiusY", {
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
         * Vertical radius for creating skewed slices.
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
    Object.defineProperty(Slice.prototype, "innerRadius", {
        /**
         * @return Radius (px or %)
         */
        get: function () {
            return this.getPropertyValue("innerRadius");
        },
        /**
         * Inner radius of the slice for creating cut out (donut) slices.
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
    Object.defineProperty(Slice.prototype, "pixelInnerRadius", {
        /**
         * @return Radius px
         */
        get: function () {
            return $utils.relativeToValue(this.innerRadius, this.radius);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slice.prototype, "cornerRadius", {
        /**
         * @return Radius (px)
         */
        get: function () {
            return this.getPropertyValue("cornerRadius");
        },
        /**
         * Radius of slice's outer corners in pixels.
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
    Object.defineProperty(Slice.prototype, "innerCornerRadius", {
        /**
         * @return Radius (px)
         */
        get: function () {
            return this.getPropertyValue("innerCornerRadius");
        },
        /**
         * Radius of slice's inner corners in pixels.
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
    Object.defineProperty(Slice.prototype, "shiftRadius", {
        /**
         * @return Radius shift
         */
        get: function () {
            return this.getPropertyValue("shiftRadius");
        },
        /**
         * Indicates how far (relatively to center) a slice should be moved.
         *
         * The value is relative to the radius of the slice. Meaning 0 no shift,
         * 1 - slice shifted outside by whole of its radius.
         *
         * @param  value  Radius shift
         */
        set: function (value) {
            this.setPropertyValue("shiftRadius", value);
            value = this.getPropertyValue("shiftRadius");
            this.dx = value * this.radius * this.ix;
            this.dy = value * this.radiusY * this.iy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slice.prototype, "ix", {
        /**
         * [ix description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @return [description]
         */
        get: function () {
            return $math.cos(this.middleAngle);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slice.prototype, "iy", {
        /**
         * [iy description]
         *
         * @ignore Exclude from docs
         * @todo Description
         * @return [description]
         */
        get: function () {
            return $math.sin(this.middleAngle);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slice.prototype, "middleAngle", {
        /**
         * An angle of the slice's middle.
         *
         * @ignore Exclude from docs
         * @return Angle
         */
        get: function () {
            return this.startAngle + this.arc / 2;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * X coordinate for the slice tooltip.
     *
     * @return X
     */
    Slice.prototype.getTooltipX = function () {
        var value = this.getPropertyValue("tooltipX");
        if ($type.isNumber(value)) {
            return value;
        }
        var p = 0.5;
        if (value instanceof Percent) {
            p = value.value;
        }
        var innerRadius = $utils.relativeToValue(this.innerRadius, this.radius);
        return this.ix * (innerRadius + (this.radius - innerRadius) * p);
    };
    /**
     * Y coordinate for the slice tooltip.
     *
     * @return Y
     */
    Slice.prototype.getTooltipY = function () {
        var value = this.getPropertyValue("tooltipY");
        if ($type.isNumber(value)) {
            return value;
        }
        var p = 0.5;
        if (value instanceof Percent) {
            p = value.value;
        }
        var innerRadius = $utils.relativeToValue(this.innerRadius, this.radius);
        return this.iy * (innerRadius + (this.radius - innerRadius) * p) + this.slice.dy;
    };
    return Slice;
}(Container));
export { Slice };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Slice"] = Slice;
//# sourceMappingURL=Slice.js.map