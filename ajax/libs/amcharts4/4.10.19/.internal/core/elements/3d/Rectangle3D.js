/**
 * Creates a 3D rectangle.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../Container";
import { Sprite } from "../../Sprite";
import * as $math from "../../utils/Math";
import * as $path from "../../rendering/Path";
import { Color, color, toColor } from "../../utils/Color";
import { RadialGradient } from "../../rendering/fills/RadialGradient";
import { LinearGradient } from "../../rendering/fills/LinearGradient";
import { LightenFilter } from "../../rendering/filters/LightenFilter";
import * as $type from "../../utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Builds a 3D rectangle
 * @see {@link IRectangle3DEvents} for a list of available events
 * @see {@link IRectangle3DAdapters} for a list of available Adapters
 */
var Rectangle3D = /** @class */ (function (_super) {
    __extends(Rectangle3D, _super);
    /**
     * Constructor
     */
    function Rectangle3D() {
        var _this = _super.call(this) || this;
        _this.angle = 30;
        _this.depth = 30;
        _this.className = "Rectangle3D";
        _this.layout = "none";
        var sideBack = _this.createChild(Sprite);
        sideBack.shouldClone = false;
        sideBack.setElement(_this.paper.add("path"));
        sideBack.isMeasured = false;
        _this.sideBack = sideBack;
        _this._disposers.push(_this.sideBack);
        var sideBottom = _this.createChild(Sprite);
        sideBottom.shouldClone = false;
        sideBottom.setElement(_this.paper.add("path"));
        sideBottom.isMeasured = false;
        _this.sideBottom = sideBottom;
        _this._disposers.push(_this.sideBottom);
        var sideLeft = _this.createChild(Sprite);
        sideLeft.shouldClone = false;
        sideLeft.setElement(_this.paper.add("path"));
        sideLeft.isMeasured = false;
        _this.sideLeft = sideLeft;
        _this._disposers.push(_this.sideLeft);
        var sideRight = _this.createChild(Sprite);
        sideRight.shouldClone = false;
        sideRight.setElement(_this.paper.add("path"));
        sideRight.isMeasured = false;
        _this.sideRight = sideRight;
        _this._disposers.push(_this.sideRight);
        var sideTop = _this.createChild(Sprite);
        sideTop.shouldClone = false;
        sideTop.setElement(_this.paper.add("path"));
        sideTop.isMeasured = false;
        _this.sideTop = sideTop;
        _this._disposers.push(_this.sideTop);
        var sideFront = _this.createChild(Sprite);
        sideFront.shouldClone = false;
        sideFront.setElement(_this.paper.add("path"));
        sideFront.isMeasured = false;
        _this.sideFront = sideFront;
        _this._disposers.push(_this.sideFront);
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    Rectangle3D.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var w = this.innerWidth;
        var h = this.innerHeight;
        var depth = this.depth;
        var angle = this.angle;
        var sin = $math.sin(angle);
        var cos = $math.cos(angle);
        var a = { x: 0, y: 0 };
        var b = { x: w, y: 0 };
        var c = { x: w, y: h };
        var d = { x: 0, y: h };
        var ah = { x: depth * cos, y: -depth * sin };
        var bh = { x: depth * cos + w, y: -depth * sin };
        var ch = { x: depth * cos + w, y: -depth * sin + h };
        var dh = { x: depth * cos, y: -depth * sin + h };
        this.sideFront.path = $path.moveTo(a) + $path.lineTo(b) + $path.lineTo(c) + $path.lineTo(d) + $path.closePath();
        this.sideBack.path = $path.moveTo(ah) + $path.lineTo(bh) + $path.lineTo(ch) + $path.lineTo(dh) + $path.closePath();
        this.sideLeft.path = $path.moveTo(a) + $path.lineTo(ah) + $path.lineTo(dh) + $path.lineTo(d) + $path.closePath();
        this.sideRight.path = $path.moveTo(b) + $path.lineTo(bh) + $path.lineTo(ch) + $path.lineTo(c) + $path.closePath();
        this.sideBottom.path = $path.moveTo(d) + $path.lineTo(dh) + $path.lineTo(ch) + $path.lineTo(c) + $path.closePath();
        this.sideTop.path = $path.moveTo(a) + $path.lineTo(ah) + $path.lineTo(bh) + $path.lineTo(b) + $path.closePath();
    };
    Object.defineProperty(Rectangle3D.prototype, "depth", {
        /**
         * @return Depth (px)
         */
        get: function () {
            return this.getPropertyValue("depth");
        },
        /**
         * Depth (Z dimension) of the 3D rectangle in pixels.
         *
         * @default 30
         * @param value  Depth (px)
         */
        set: function (value) {
            this.setPropertyValue("depth", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle3D.prototype, "angle", {
        /**
         * @return Angle
         */
        get: function () {
            return this.getPropertyValue("angle");
        },
        /**
         * Angle of the point of view to the 3D element. (0-360)
         *
         * @default 30
         * @param value  Angle
         */
        set: function (value) {
            this.setPropertyValue("angle", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets actual `fill` property on the SVG element, including applicable color
     * modifiers.
     *
     * @ignore Exclude from docs
     * @param value  Fill
     */
    Rectangle3D.prototype.setFill = function (value) {
        _super.prototype.setFill.call(this, value);
        if (!$type.isObject(value) || "r" in value) {
            value = toColor(value);
        }
        var colorStr;
        if (value instanceof Color) {
            colorStr = value.hex;
        }
        else if (value instanceof LinearGradient || value instanceof RadialGradient) {
            colorStr = value.stops.getIndex(0).color.hex;
        }
        else {
            var filter = new LightenFilter();
            filter.lightness = -0.2;
            this.sideBack.filters.push(filter);
            var filter2 = filter.clone();
            filter2.lightness = -0.4;
            this.sideLeft.filters.push(filter2);
            var filter3 = filter.clone();
            filter3.lightness = -0.2;
            this.sideRight.filters.push(filter3);
            var filter4 = filter.clone();
            filter4.lightness = -0.1;
            this.sideTop.filters.push(filter4);
            var filter5 = filter.clone();
            filter5.lightness = -0.5;
            this.sideBottom.filters.push(filter5);
        }
        if (colorStr) {
            this.sideBack.fill = color(colorStr).lighten(-0.2);
            this.sideLeft.fill = color(colorStr).lighten(-0.4);
            this.sideRight.fill = color(colorStr).lighten(-0.2);
            this.sideTop.fill = color(colorStr).lighten(-0.1);
            this.sideBottom.fill = color(colorStr).lighten(-0.5);
        }
    };
    /**
     * Copies all properties and related data from a different instance of Rectangle3D.
     *
     * @param source Source Rectangle3D
     */
    Rectangle3D.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.sideBack.copyFrom(source.sideBack);
        this.sideLeft.copyFrom(source.sideLeft);
        this.sideRight.copyFrom(source.sideRight);
        this.sideTop.copyFrom(source.sideTop);
        this.sideBottom.copyFrom(source.sideBottom);
    };
    return Rectangle3D;
}(Container));
export { Rectangle3D };
//# sourceMappingURL=Rectangle3D.js.map