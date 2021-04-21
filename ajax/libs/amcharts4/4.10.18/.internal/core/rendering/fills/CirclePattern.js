/**
 * Rectangular pattern module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Pattern } from "./Pattern";
import { registry } from "../../Registry";
;
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Circular pattern
 */
var CirclePattern = /** @class */ (function (_super) {
    __extends(CirclePattern, _super);
    /**
     * Constructor
     */
    function CirclePattern() {
        var _this = _super.call(this) || this;
        _this.properties["radius"] = 2;
        _this._circle = _this.paper.add("circle");
        _this.addElement(_this._circle);
        _this.shapeRendering = "auto";
        return _this;
    }
    /**
     * Draws the circle element.
     */
    CirclePattern.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this._circle) {
            this._circle.attr({ "r": this.radius, "cx": this.width / 2, "cy": this.height / 2 });
        }
    };
    Object.defineProperty(CirclePattern.prototype, "radius", {
        /**
         * @return Radius (px)
         */
        get: function () {
            return this.properties["radius"];
        },
        /**
         * Circle radius in pixels.
         *
         * @param value Radius (px)
         */
        set: function (value) {
            this.properties["radius"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    return CirclePattern;
}(Pattern));
export { CirclePattern };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["CirclePattern"] = CirclePattern;
//# sourceMappingURL=CirclePattern.js.map