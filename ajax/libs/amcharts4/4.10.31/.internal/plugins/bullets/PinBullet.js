/**
 * Bullet module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Bullet } from "../../charts/elements/Bullet";
import { Circle } from "../../core/elements/Circle";
import { PointedCircle } from "./PointedCircle";
import { registry } from "../../core/Registry";
import * as $math from "../../core/utils/Math";
import { percent, Percent } from "../../core/utils/Percent";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a pin-shaped bullet with an optional text label and/or image inside
 * it.
 *
 * The background/body of the flag is a [[PointedCircle]] element. Most of
 * its the visual appearance is configured via `background` property.
 *
 * Uses [[Label]] instance to draw the label, so the label itself is
 * configurable.
 *
 * Example:
 *
 * ```TypeScript
 * let series = chart.series.push(new am4charts.LineSeries());
 * // ...
 * let pinBullet = series.bullets.push(new am4plugins_bullets.PinBullet());
 * pinBullet.poleHeight = 15;
 * pinBullet.label.text = "{valueY}";
 * ```
 * ```JavaScript
 * var series = chart.series.push(new am4charts.LineSeries());
 * // ...
 * var pinBullet = series.bullets.push(new am4plugins_bullets.PinBullet());
 * pinBullet.poleHeight = 15;
 * pinBullet.label.text = "{valueY}";
 * ```
 * ```JSON
 * {
 *   // ...
 *   "series": [{
 *     // ...
 *     "bullets": [{
 *       "type": "PinBullet",
 *       "poleHeight": 15,
 *       "label": {
 *         "text": "{valueY}"
 *       }
 *     }]
 *   }]
 * }
 * ```
 *
 * @since 4.5.7
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/plugin-bullets/} for usage instructions.
 * @see {@link IBulletEvents} for a list of available events
 * @see {@link IBulletAdapters} for a list of available Adapters
 */
var PinBullet = /** @class */ (function (_super) {
    __extends(PinBullet, _super);
    /**
     * Constructor
     */
    function PinBullet() {
        var _this = _super.call(this) || this;
        _this.className = "PinBullet";
        var interfaceColors = new InterfaceColorSet();
        var circle = _this.createChild(Circle);
        circle.shouldClone = false;
        circle.isMeasured = false;
        circle.fill = interfaceColors.getFor("background");
        circle.radius = percent(85);
        _this.circle = circle;
        var background = _this.background;
        background.fill = interfaceColors.getFor("alternativeBackground");
        background.fillOpacity = 1;
        background.pointerBaseWidth = 20;
        background.pointerLength = 20;
        background.radius = 25;
        background.events.on("propertychanged", _this.invalidate, _this, false);
        _this.applyTheme();
        return _this;
    }
    /**
     * Validates element:
     * * Triggers events
     * * Redraws the element
     *
     * @ignore Exclude from docs
     */
    PinBullet.prototype.validate = function () {
        _super.prototype.validate.call(this);
        var background = this.background;
        var px = background.pointerX;
        var py = background.pointerY;
        var pl = background.pointerLength;
        var pw = background.pointerBaseWidth;
        var pa = background.pointerAngle + 180;
        var r = background.radius;
        if (pw > 2 * r) {
            pw = 2 * r;
        }
        var da = $math.DEGREES * Math.atan(pw / 2 / pl);
        if (da <= 0.001) {
            da = 0.001;
        }
        var a1 = pa - da;
        var a2 = pa + da;
        var p1 = { x: px + pl * $math.cos(a1), y: py + pl * $math.sin(a1) };
        var p2 = { x: px + pl * $math.cos(a2), y: py + pl * $math.sin(a2) };
        var x1 = p1.x;
        var x2 = p2.x;
        var y1 = p1.y;
        var y2 = p2.y;
        var radsq = r * r;
        var q = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        var x3 = (x1 + x2) / 2;
        var cx = x3 - Math.sqrt(radsq - ((q / 2) * (q / 2))) * ((y1 - y2) / q);
        var y3 = (y1 + y2) / 2;
        var cy = y3 - Math.sqrt(radsq - ((q / 2) * (q / 2))) * ((x2 - x1) / q);
        if (this.circle) {
            var circleRadius = this.circle.radius;
            if (circleRadius instanceof Percent) {
                this.circle.width = r * 2;
                this.circle.height = r * 2;
            }
        }
        var image = this.image;
        if (image) {
            image.x = cx;
            image.y = cy;
            image.width = r * 2;
            image.height = r * 2;
            image.element.attr({ preserveAspectRatio: "xMidYMid slice" });
            if (this.circle) {
                this.circle.scale = 1 / image.scale;
            }
        }
        else {
            if (this.circle) {
                this.circle.x = cx;
                this.circle.y = cy;
            }
        }
        var label = this.label;
        if (label) {
            label.x = cx;
            label.y = cy;
        }
    };
    Object.defineProperty(PinBullet.prototype, "image", {
        /**
         * @return Image
         */
        get: function () {
            return this._image;
        },
        /**
         * An element of type [[Image]] to show inside pin's circle.
         *
         * @param  image  Image
         */
        set: function (image) {
            if (image) {
                this._image = image;
                this._disposers.push(image);
                image.shouldClone = false;
                image.parent = this;
                image.horizontalCenter = "middle";
                image.verticalCenter = "middle";
                if (this.circle) {
                    image.mask = this.circle;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinBullet.prototype, "label", {
        /**
         * @return Label
         */
        get: function () {
            return this._label;
        },
        /**
         * A [[Label]] element for displaying within flag.
         *
         * Use it's `text` property to set actual text, e.g.:
         *
         * ```TypeScript
         * pinBullet.text = "Hello";
         * ```
         * ```JavaScript
         * pinBullet.text = "Hello";
         * ```
         * ```JSON
         * {
         *   // ...
         *   "series": [{
         *     // ...
         *     "bullets": [{
         *       "type": "PinBullet",
         *       "label": {
         *         "text": "Hello"
         *       }
         *     }]
         *   }]
         * }
         * ```
         * @param  label  Label
         */
        set: function (label) {
            if (label) {
                this._label = label;
                this._disposers.push(label);
                label.shouldClone = false;
                label.parent = this;
                label.horizontalCenter = "middle";
                label.verticalCenter = "middle";
                label.textAlign = "middle";
                label.dy = 2;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies all proprities and related stuff from another instance of
     * [[PinBullet]].
     *
     * @param source  Source element
     */
    PinBullet.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        if (source.image) {
            if (!this._image) {
                this.image = source.image.clone();
            }
            this._image.copyFrom(source.image);
        }
        if (this.circle && source.circle) {
            this.circle.copyFrom(source.circle);
        }
        if (source.label) {
            if (!this._label) {
                this.label = source.label.clone();
            }
            this._label.copyFrom(source.label);
        }
    };
    /**
     * Creates and returns a background element.
     *
     * @ignore Exclude from docs
     * @return Background
     */
    PinBullet.prototype.createBackground = function () {
        return new PointedCircle();
    };
    return PinBullet;
}(Bullet));
export { PinBullet };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["PinBullet"] = PinBullet;
//# sourceMappingURL=PinBullet.js.map