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
import { PointedShape } from "./PointedShape";
import * as $math from "../utils/Math";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a rectangle with a pointer.
 *
 * @see {@link IPointedRectangleEvents} for a list of available events
 * @see {@link IPointedRectangleAdapters} for a list of available Adapters
 */
var PointedRectangle = /** @class */ (function (_super) {
    __extends(PointedRectangle, _super);
    /**
     * Constructor
     */
    function PointedRectangle() {
        var _this = _super.call(this) || this;
        _this.className = "PointedRectangle";
        _this.element = _this.paper.add("path");
        _this.cornerRadius = 6;
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    PointedRectangle.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var cr = this.cornerRadius;
        var w = this.innerWidth;
        var h = this.innerHeight;
        if (w > 0 && h > 0) {
            var x = this.pointerX;
            var y = this.pointerY;
            var bwh = this.pointerBaseWidth / 2;
            var maxcr = $math.min(w / 2, h / 2);
            var crtl = $math.fitToRange(cr, 0, maxcr);
            var crtr = $math.fitToRange(cr, 0, maxcr);
            var crbr = $math.fitToRange(cr, 0, maxcr);
            var crbl = $math.fitToRange(cr, 0, maxcr);
            // corner coordinates
            // top left
            var xtl = 0;
            var ytl = 0;
            // top right
            var xtr = w;
            var ytr = 0;
            // bottom right
            var xbr = w;
            var ybr = h;
            // bottom left
            var xbl = 0;
            var ybl = h;
            var lineT = void 0;
            var lineR = void 0;
            var lineB = void 0;
            var lineL = void 0;
            // find stem base side: http://$math.stackexchange.com/questions/274712/calculate-on-which-side-of-straign-line-is-dot-located
            // d=(x−x1)(y2−y1)−(y−y1)(x2−x1)
            var d1 = (x - xtl) * (ybr - ytl) - (y - ytl) * (xbr - xtl);
            var d2 = (x - xbl) * (ytr - ybl) - (y - ybl) * (xtr - xbl);
            // top
            if (d1 > 0 && d2 > 0) {
                var stemX = $math.fitToRange(x, crtl + bwh, w - bwh - crtr);
                y = $math.fitToRange(y, -Infinity, 0);
                lineT = "M" + crtl + ",0 L" + (stemX - bwh) + ",0 L" + x + "," + y + " L" + (stemX + bwh) + ",0 L" + (w - crtr) + ",0";
            }
            else {
                lineT = "M" + crtl + ",0 L" + (w - crtr) + ",0";
            }
            // bottom
            if (d1 < 0 && d2 < 0) {
                var stemX = $math.fitToRange(x, crbl + bwh, w - bwh - crbr);
                y = $math.fitToRange(y, h, Infinity);
                lineB = " L" + (w - crbr) + "," + h + " L" + (stemX + bwh) + "," + h + " L" + x + "," + y + " L" + (stemX - bwh) + "," + h + " L" + crbl + "," + h;
            }
            else {
                lineB = " L" + crbl + "," + h;
            }
            // left
            if (d1 < 0 && d2 > 0) {
                var stemY = $math.fitToRange(y, crtl + bwh, h - crbl - bwh);
                x = $math.fitToRange(x, -Infinity, 0);
                lineL = " L0," + (h - crbl) + " L0," + (stemY + bwh) + " L" + x + "," + y + " L0," + (stemY - bwh) + " L0," + crtl;
            }
            else {
                lineL = " L0," + crtl;
            }
            // right
            if (d1 > 0 && d2 < 0) {
                var stemY = $math.fitToRange(y, crtr + bwh, h - bwh - crbr);
                x = $math.fitToRange(x, w, Infinity);
                lineR = " L" + w + "," + crtr + " L" + w + "," + (stemY - bwh) + " L" + x + "," + y + " L" + w + "," + (stemY + bwh) + " L" + w + "," + (h - crbr);
            }
            else {
                lineR = " L" + w + "," + (h - crbr);
            }
            var arcTR = " a" + crtr + "," + crtr + " 0 0 1 " + crtr + "," + crtr;
            var arcBR = " a" + crbr + "," + crbr + " 0 0 1 -" + crbr + "," + crbr;
            var arcBL = " a" + crbl + "," + crbl + " 0 0 1 -" + crbl + ",-" + crbl;
            var arcTL = " a" + crtl + "," + crtl + " 0 0 1 " + crtl + ",-" + crtl;
            this.path = lineT + arcTR + lineR + arcBR + lineB + arcBL + lineL + arcTL;
        }
    };
    Object.defineProperty(PointedRectangle.prototype, "cornerRadius", {
        /**
         * @return Corner radius (px)
         */
        get: function () {
            return this.getPropertyValue("cornerRadius");
        },
        /**
         * Radius of rectangle's border in pixels.
         *
         * @default 0
         * @param value  Corner radius (px)
         */
        set: function (value) {
            this.setPropertyValue("cornerRadius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return PointedRectangle;
}(PointedShape));
export { PointedRectangle };
//# sourceMappingURL=PointedRectangle.js.map