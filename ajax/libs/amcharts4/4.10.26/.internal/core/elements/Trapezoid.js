/**
 * Functionality for drawing a trapezoid.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../Sprite";
import { percent } from "../../core/utils/Percent";
import { registry } from "../Registry";
import * as $utils from "../utils/Utils";
import * as $type from "../utils/Type";
import * as $path from "../rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a Trapezoid.
 *
 * @see {@link ITrapezoidEvents} for a list of available events
 * @see {@link ITrapezoidAdapters} for a list of available Adapters
 */
var Trapezoid = /** @class */ (function (_super) {
    __extends(Trapezoid, _super);
    /**
     * Constructor
     */
    function Trapezoid() {
        var _this = _super.call(this) || this;
        _this.className = "Trapezoid";
        _this.element = _this.paper.add("path");
        _this.topSide = percent(100);
        _this.bottomSide = percent(100);
        _this.leftSide = percent(100);
        _this.rightSide = percent(100);
        _this.isMeasured = false; // todo: add measureElement
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    Trapezoid.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var w = this.pixelWidth;
        var h = this.pixelHeight;
        var ts = $utils.relativeToValue(this.topSide, w);
        var bs = $utils.relativeToValue(this.bottomSide, w);
        var ls = $utils.relativeToValue(this.leftSide, h);
        var rs = $utils.relativeToValue(this.rightSide, h);
        // 1----2
        // |    |
        // 4----3
        var x0 = (w - ts) / 2;
        var y0 = (h - ls) / 2;
        var x1 = w - (w - ts) / 2;
        var y1 = (h - rs) / 2;
        var x2 = w - (w - bs) / 2;
        var y2 = h - (h - rs) / 2;
        var x3 = (w - bs) / 2;
        var y3 = h - (h - ls) / 2;
        var mt = "";
        var mr = "";
        var mb = "";
        var ml = "";
        if ($type.hasValue(this.horizontalNeck)) {
            var hn = this.horizontalNeck.value;
            mt = $path.lineTo({ x: w * hn, y: Math.max(y0, y1) });
            mb = $path.lineTo({ x: w * hn, y: Math.min(y2, y3) });
        }
        if ($type.hasValue(this.verticalNeck)) {
            var vn = this.verticalNeck.value;
            mr = $path.lineTo({ x: Math.min(x1, x2), y: h * vn });
            ml = $path.lineTo({ x: Math.max(x0, x3), y: h * vn });
        }
        var path = $path.moveTo({ x: x0, y: y0 })
            + mt
            + $path.lineTo({ x: x1, y: y1 })
            + mr
            + $path.lineTo({ x: x2, y: y2 })
            + mb
            + $path.lineTo({ x: x3, y: y3 })
            + ml;
        this.path = path;
    };
    Object.defineProperty(Trapezoid.prototype, "topSide", {
        /**
         * @return Width
         */
        get: function () {
            return this.getPropertyValue("topSide");
        },
        /**
         * Wdith of the top side. Absolute (px) or relative ([[Percent]]).
         *
         * @default Percent(100)
         * @param value  Width
         */
        set: function (value) {
            this.setPercentProperty("topSide", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trapezoid.prototype, "bottomSide", {
        /**
         * @return Width
         */
        get: function () {
            return this.getPropertyValue("bottomSide");
        },
        /**
         * Wdith of the bottom side. Absolute (px) or relative ([[Percent]]).
         *
         * @default Percent(100)
         * @param value  Width
         */
        set: function (value) {
            this.setPercentProperty("bottomSide", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trapezoid.prototype, "leftSide", {
        /**
         * @return Height
         */
        get: function () {
            return this.getPropertyValue("leftSide");
        },
        /**
         * Height of the left side. Absolute (px) or relative ([[Percent]]).
         *
         * @default Percent(100)
         * @param value  Height
         */
        set: function (value) {
            this.setPercentProperty("leftSide", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trapezoid.prototype, "rightSide", {
        /**
         * @return Height
         */
        get: function () {
            return this.getPropertyValue("rightSide");
        },
        /**
         * Height of the right side. Absolute (px) or relative ([[Percent]]).
         *
         * @default Percent(100)
         * @param value  Height
         */
        set: function (value) {
            this.setPercentProperty("rightSide", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trapezoid.prototype, "horizontalNeck", {
        /**
         * @return Horizontal neck position
         */
        get: function () {
            return this.getPropertyValue("horizontalNeck");
        },
        /**
         * A relative vertical position of the "neck". If the top and bottom sides
         * are of different width, and `horizontalNeck` is set, a choke point
         * will be created at that position, creating a funnel shape.
         *
         * @param value  Horizontal neck position
         */
        set: function (value) {
            this.setPropertyValue("horizontalNeck", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trapezoid.prototype, "verticalNeck", {
        /**
         * @return Vertical neck position
         */
        get: function () {
            return this.getPropertyValue("verticalNeck");
        },
        /**
         * A relative horizontal position of the "neck". If the left and right sides
         * are of different height, and `verticalNeck` is set, a choke point
         * will be created at that position, creating a funnel shape.
         *
         * @param value  Vertical neck position
         */
        set: function (value) {
            this.setPropertyValue("verticalNeck", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return Trapezoid;
}(Sprite));
export { Trapezoid };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Trapezoid"] = Trapezoid;
//# sourceMappingURL=Trapezoid.js.map