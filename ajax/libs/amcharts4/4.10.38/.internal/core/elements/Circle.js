/**
 * Functionality for drawing circles.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../Sprite";
import { percent } from "../utils/Percent";
import { registry } from "../Registry";
import * as $utils from "../utils/Utils";
import * as $math from "../utils/Math";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to create a circle
 * @see {@link ICircleEvents} for a list of available events
 * @see {@link ICircleAdapters} for a list of available Adapters
 */
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    /**
     * Constructor
     */
    function Circle() {
        var _this = _super.call(this) || this;
        _this.className = "Circle";
        _this.element = _this.paper.add("circle");
        _this.setPercentProperty("radius", percent(100));
        _this.setPropertyValue("horizontalCenter", "middle");
        _this.setPropertyValue("verticalCenter", "middle");
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the circle.
     */
    Circle.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.element.attr({ "r": this.pixelRadius });
    };
    Object.defineProperty(Circle.prototype, "radius", {
        /**
         * @return Radius
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * Radius of the circle.
         *
         * Can be either absolute (pixels) or relative ([Percent]).
         *
         * @param value  Radius
         */
        set: function (value) {
            this.setPercentProperty("radius", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "pixelRadius", {
        /**
         * Radius of the circle in pixels.
         *
         * This is a read-only property. To set radius in pixels, use `radius`
         * property.
         *
         * @readonly
         * @return Radius (px)
         */
        get: function () {
            return $utils.relativeToValue(this.radius, $math.min(this.innerWidth / 2, this.innerHeight / 2));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates bounding box.
     *
     * @ignore Exclude from docs
     */
    Circle.prototype.measureElement = function () {
        var pixelRadius = this.pixelRadius;
        this._bbox = {
            x: -pixelRadius,
            y: -pixelRadius,
            width: pixelRadius * 2,
            height: pixelRadius * 2
        };
    };
    return Circle;
}(Sprite));
export { Circle };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Circle"] = Circle;
//# sourceMappingURL=Circle.js.map