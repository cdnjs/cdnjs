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
 * Rectangular pattern
 */
var RectPattern = /** @class */ (function (_super) {
    __extends(RectPattern, _super);
    /**
     * Constructor
     */
    function RectPattern() {
        var _this = _super.call(this) || this;
        _this.rectHeight = 1;
        _this.rectWidth = 1;
        _this._rect = _this.paper.add("rect");
        _this.addElement(_this._rect);
        return _this;
    }
    /**
     * Draws the rectangular element.
     */
    RectPattern.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.properties["rotationX"] = this.width / 2;
        this.properties["rotationY"] = this.height / 2;
        if (this._rect) {
            this._rect.attr({ "width": this.rectWidth, "height": this.rectHeight, "x": (this.width - this.rectWidth) / 2, "y": (this.height - this.rectHeight) / 2 });
        }
    };
    Object.defineProperty(RectPattern.prototype, "rectWidth", {
        /**
         * @return Width (px)
         */
        get: function () {
            return this.properties["rectWidth"];
        },
        /**
         * Rectangle width in pixels.
         *
         * @param value Width (px)
         */
        set: function (value) {
            this.properties["rectWidth"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectPattern.prototype, "rectHeight", {
        /**
         * @return Height (px)
         */
        get: function () {
            return this.properties["rectHeight"];
        },
        /**
         * Rectangle height in pixels.
         *
         * @param value Height (px)
         */
        set: function (value) {
            this.properties["rectHeight"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    return RectPattern;
}(Pattern));
export { RectPattern };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["RectPattern"] = RectPattern;
//# sourceMappingURL=RectPattern.js.map