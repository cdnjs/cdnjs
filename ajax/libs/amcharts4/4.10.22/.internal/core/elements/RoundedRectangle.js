/**
 * Rounded rectangle module.
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
import * as $type from "../utils/Type";
import * as $utils from "../utils/Utils";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a rectangle with rounded corners.
 *
 * @see {@link IRoundedRectangleEvents} for a list of available events
 * @see {@link IRoundedRectangleAdapters} for a list of available Adapters
 */
var RoundedRectangle = /** @class */ (function (_super) {
    __extends(RoundedRectangle, _super);
    /**
     * Constructor
     */
    function RoundedRectangle() {
        var _this = _super.call(this) || this;
        _this.className = "RoundedRectangle";
        _this.element = _this.paper.add("path");
        _this.cornerRadius(3, 3, 3, 3);
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    RoundedRectangle.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var w = this.innerWidth;
        var h = this.innerHeight;
        if ($type.isNumber(w) && $type.isNumber(h)) {
            var minSide = $math.min(w, h) / 2;
            var cornerRadiusTopLeft = $utils.relativeToValue(this.cornerRadiusTopLeft, minSide);
            var cornerRadiusTopRight = $utils.relativeToValue(this.cornerRadiusTopRight, minSide);
            var cornerRadiusBottomRight = $utils.relativeToValue(this.cornerRadiusBottomRight, minSide);
            var cornerRadiusBottomLeft = $utils.relativeToValue(this.cornerRadiusBottomLeft, minSide);
            var maxcr = $math.min(Math.abs(w / 2), Math.abs(h / 2));
            var crtl = $math.fitToRange(cornerRadiusTopLeft, 0, maxcr);
            var crtr = $math.fitToRange(cornerRadiusTopRight, 0, maxcr);
            var crbr = $math.fitToRange(cornerRadiusBottomRight, 0, maxcr);
            var crbl = $math.fitToRange(cornerRadiusBottomLeft, 0, maxcr);
            var lineT = "M" + crtl + ",0 L" + (w - crtr) + ",0";
            var lineB = " L" + crbl + "," + h;
            var lineL = " L0," + crtl;
            var lineR = " L" + w + "," + (h - crbr);
            var arcTR = " a" + crtr + "," + crtr + " 0 0 1 " + crtr + "," + crtr;
            var arcBR = " a" + crbr + "," + crbr + " 0 0 1 -" + crbr + "," + crbr;
            var arcBL = " a" + crbl + "," + crbl + " 0 0 1 -" + crbl + ",-" + crbl;
            var arcTL = " a" + crtl + "," + crtl + " 0 0 1 " + crtl + ",-" + crtl;
            var path = lineT + arcTR + lineR + arcBR + lineB + arcBL + lineL + arcTL + " Z";
            this.path = path;
        }
    };
    /**
     * Sets radius for all four corners at ones.
     *
     * All numbers are in pixels.
     *
     * @param tl  Top-left corner
     * @param tr  Top-right corner
     * @param bl  Bottom-left corner
     * @param br  Bottom-right corner
     */
    RoundedRectangle.prototype.cornerRadius = function (tl, tr, bl, br) {
        this.cornerRadiusTopLeft = tl;
        this.cornerRadiusTopRight = tr;
        this.cornerRadiusBottomLeft = bl;
        this.cornerRadiusBottomRight = br;
    };
    Object.defineProperty(RoundedRectangle.prototype, "cornerRadiusTopLeft", {
        /**
         * @return Radius (px or Percent)
         */
        get: function () {
            return this.getPropertyValue("cornerRadiusTopLeft");
        },
        /**
         * Radius of the top-left corner in pixels.
         *
         * @default 3
         * @param value  Radius (px or Percent)
         */
        set: function (value) {
            this.setPercentProperty("cornerRadiusTopLeft", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoundedRectangle.prototype, "cornerRadiusTopRight", {
        /**
         * @return Radius (px or Percent)
         */
        get: function () {
            return this.getPropertyValue("cornerRadiusTopRight");
        },
        /**
         * Radius of the top-right corner in pixels.
         *
         * @default 3
         * @param value  Radius (px or Percent)
         */
        set: function (value) {
            this.setPercentProperty("cornerRadiusTopRight", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoundedRectangle.prototype, "cornerRadiusBottomRight", {
        /**
         * @return Radius (px or Percent)
         */
        get: function () {
            return this.getPropertyValue("cornerRadiusBottomRight");
        },
        /**
         * Radius of the bottom-right corner in pixels.
         *
         * @default 3
         * @param value  Radius (px or Percent)
         */
        set: function (value) {
            this.setPercentProperty("cornerRadiusBottomRight", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoundedRectangle.prototype, "cornerRadiusBottomLeft", {
        /**
         * @return Radius (px or Percent)
         */
        get: function () {
            return this.getPropertyValue("cornerRadiusBottomLeft");
        },
        /**
         * Radius of the bottom-left corner in pixels.
         *
         * @default 3
         * @param value  Radius (px or Percent)
         */
        set: function (value) {
            this.setPercentProperty("cornerRadiusBottomLeft", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Measures the element.
     *
     * @ignore Exclude from docs
     */
    RoundedRectangle.prototype.measureElement = function () {
    };
    Object.defineProperty(RoundedRectangle.prototype, "bbox", {
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
    return RoundedRectangle;
}(Sprite));
export { RoundedRectangle };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["RoundedRectangle"] = RoundedRectangle;
//# sourceMappingURL=RoundedRectangle.js.map