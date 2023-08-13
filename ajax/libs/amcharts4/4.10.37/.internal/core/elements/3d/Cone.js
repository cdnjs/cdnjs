/**
 * Cone module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../Container";
import { Sprite, visualProperties } from "../../Sprite";
import { Ellipse } from "../../elements/Ellipse";
import { LinearGradientModifier } from "../../rendering/fills/LinearGradientModifier";
import { percent } from "../../utils/Percent";
import * as $object from "../../utils/Object";
import * as $path from "../../rendering/Path";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Builds a round cone/cylinder.
 *
 * @see {@link IConeEvents} for a list of available events
 * @see {@link IConeAdapters} for a list of available Adapters
 */
var Cone = /** @class */ (function (_super) {
    __extends(Cone, _super);
    /**
     * Constructor
     */
    function Cone() {
        var _this = _super.call(this) || this;
        _this.className = "Cone";
        _this.angle = 30;
        _this.radius = percent(100);
        _this.topRadius = percent(100);
        _this.top = _this.createChild(Ellipse);
        _this.top.shouldClone = false;
        _this.bottom = _this.createChild(Ellipse);
        _this.bottom.shouldClone = false;
        _this.body = _this.createChild(Sprite);
        _this.body.shouldClone = false;
        _this.body.setElement(_this.paper.add("path"));
        _this.layout = "none";
        _this.bodyFillModifier = new LinearGradientModifier();
        _this.bodyFillModifier.lightnesses = [0, -0.25, 0];
        _this.body.fillModifier = _this.bodyFillModifier;
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    Cone.prototype.draw = function () {
        _super.prototype.draw.call(this);
        $object.copyProperties(this, this.top, visualProperties);
        $object.copyProperties(this, this.bottom, visualProperties);
        $object.copyProperties(this, this.body, visualProperties);
        var w = this.innerWidth;
        var h = this.innerHeight;
        var bottom = this.bottom;
        var top = this.top;
        var angle = this.angle;
        var radiusBase;
        var dx;
        var dy;
        if (this.orientation == "horizontal") {
            radiusBase = h / 2;
            bottom.y = h / 2;
            bottom.x = 0;
            top.y = h / 2;
            top.x = w;
            dx = (90 - angle) / 90;
            dy = 0;
            this.bodyFillModifier.gradient.rotation = 90;
        }
        else {
            dx = 0;
            dy = (90 - angle) / 90;
            radiusBase = w / 2;
            bottom.y = h;
            bottom.x = w / 2;
            top.x = w / 2;
            this.bodyFillModifier.gradient.rotation = 0;
        }
        var radius = this.radius.value * radiusBase;
        var topRadius = this.topRadius.value * radiusBase;
        bottom.radius = radius - radius * dx;
        bottom.radiusY = radius - radius * dy;
        top.radius = topRadius - topRadius * dx;
        top.radiusY = topRadius - topRadius * dy;
        var path;
        if (this.orientation == "horizontal") {
            path = $path.moveTo({ x: 0, y: h / 2 - bottom.radiusY }) + $path.arcTo(-90, -180, bottom.radius, bottom.radiusY) + $path.lineTo({ x: w, y: h / 2 + top.radiusY }) + $path.arcTo(90, 180, top.radius, top.radiusY) + $path.closePath();
        }
        else {
            path = $path.moveTo({ x: w / 2 - top.radius, y: 0 }) + $path.arcTo(180, -180, top.radius, top.radiusY) + $path.lineTo({ x: w / 2 + bottom.radius, y: h }) + $path.arcTo(0, 180, bottom.radius, bottom.radiusY) + $path.closePath();
        }
        this.body.path = path;
    };
    Object.defineProperty(Cone.prototype, "angle", {
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
    Object.defineProperty(Cone.prototype, "radius", {
        /**
         * @return Bottom radius
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * A relative radius of the cone's bottom (base).
         *
         * It is relevant to the inner width or height of the element.
         *
         * @default Percent(100)
         * @param value  Bottom radius
         */
        set: function (value) {
            this.setPropertyValue("radius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cone.prototype, "topRadius", {
        /**
         * @return Top radius
         */
        get: function () {
            return this.getPropertyValue("topRadius");
        },
        /**
         * A relative radius of the cone's top (tip).
         *
         * It is relevant to the inner width or height of the element.
         *
         * @default Percent(0)
         * @param value  Top radius
         */
        set: function (value) {
            this.setPropertyValue("topRadius", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cone.prototype, "orientation", {
        /**
         * Orientation
         */
        get: function () {
            return this.getPropertyValue("orientation");
        },
        /**
         * Orientation of the cone
         *
         * @default "vertical"
         * @param value  Orientation
         */
        set: function (value) {
            this.setPropertyValue("orientation", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return Cone;
}(Container));
export { Cone };
//# sourceMappingURL=Cone.js.map