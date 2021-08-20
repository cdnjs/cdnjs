/**
 * Functionality for drawing rectangles.
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
import * as $math from "../utils/Math";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a rectangle.
 *
 * @see {@link IRectangleEvents} for a list of available events
 * @see {@link IRectangleAdapters} for a list of available Adapters
 */
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    /**
     * Constructor
     * * Creates a `<rect>` element
     * * Creates default state
     */
    function Rectangle() {
        var _this = _super.call(this) || this;
        _this.className = "Rectangle";
        _this.element = _this.paper.add("rect");
        //this.pixelPerfect = false;
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    Rectangle.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var precision = this._positionPrecision;
        if (this.pixelPerfect) {
            precision = 0;
        }
        var w = $math.round(this.innerWidth, precision);
        var h = $math.round(this.innerHeight, precision);
        this.element.attr({
            "width": w,
            "height": h
        });
    };
    /**
     * Measures the element.
     *
     * @ignore Exclude from docs
     */
    Rectangle.prototype.measureElement = function () {
    };
    Object.defineProperty(Rectangle.prototype, "bbox", {
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
                return {
                    x: 0,
                    y: 0,
                    width: this.innerWidth,
                    height: this.innerHeight
                };
            }
            else {
                return { x: 0, y: 0, width: 0, height: 0 };
            }
        },
        enumerable: true,
        configurable: true
    });
    return Rectangle;
}(Sprite));
export { Rectangle };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Rectangle"] = Rectangle;
//# sourceMappingURL=Rectangle.js.map