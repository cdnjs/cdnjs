/**
 * Functionality for drawing triangles.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../Sprite";
import { registry } from "../Registry";
import * as $path from "../rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a triangle.
 *
 * @see {@link ITriangleEvents} for a list of available events
 * @see {@link ITriangleAdapters} for a list of available Adapters
 */
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    /**
     * Constructor
     */
    function Triangle() {
        var _this = _super.call(this) || this;
        _this.className = "Triangle";
        _this.element = _this.paper.add("path");
        _this.direction = "top";
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    Triangle.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var w = this.pixelWidth;
        var h = this.pixelHeight;
        var path;
        switch (this.direction) {
            case "right":
                path = $path.moveTo({ x: 0, y: 0 })
                    + $path.lineTo({ x: w, y: h / 2 })
                    + $path.lineTo({ x: 0, y: h })
                    + $path.closePath();
                break;
            case "left":
                path = $path.moveTo({ x: w, y: 0 })
                    + $path.lineTo({ x: 0, y: h / 2 })
                    + $path.lineTo({ x: w, y: h })
                    + $path.closePath();
                break;
            case "bottom":
                path = $path.moveTo({ x: 0, y: 0 })
                    + $path.lineTo({ x: w, y: 0 })
                    + $path.lineTo({ x: w / 2, y: h })
                    + $path.closePath();
                break;
            case "top":
                path = $path.moveTo({ x: w / 2, y: 0 })
                    + $path.lineTo({ x: w, y: h })
                    + $path.lineTo({ x: 0, y: h })
                    + $path.closePath();
                break;
        }
        this.path = path;
    };
    Object.defineProperty(Triangle.prototype, "direction", {
        /**
         * Returns direction of a triangle
         *
         * @return value
         */
        get: function () {
            return this.getPropertyValue("direction");
        },
        /**
         * Sets direction of a triangle
         *
         * @param value
         */
        set: function (value) {
            this.setPropertyValue("direction", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return Triangle;
}(Sprite));
export { Triangle };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Triangle"] = Triangle;
//# sourceMappingURL=Triangle.js.map