/**
 * Flag bullet module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Bullet } from "../../charts/elements/Bullet";
import { registry } from "../../core/Registry";
import { Label } from "../../core/elements/Label";
import { WavedRectangle } from "../../core/elements/WavedRectangle";
import { Line } from "../../core/elements/Line";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a flag-shaped bullet with an optional text label inside it.
 *
 * The background/body of the flag is a [[WavedRectangle]] element. Most of
 * its the visual appearance is configured via `background` property.
 *
 * The size of a background adopts to the size of a label automatically. If
 * you don't want a label to be shown at all, you can set it to `undefined`. In
 * this case flag size will be of the `width`/`height` set directly on the
 * [[FlagBullet]].
 *
 * Uses [[Label]] instance to draw the label, so the label itself is
 * configurable.
 *
 * Example:
 *
 * ```TypeScript
 * let series = chart.series.push(new am4charts.LineSeries());
 * // ...
 * let flagBullet = series.bullets.push(new am4plugins_bullets.FlagBullet());
 * flagBullet.poleHeight = 15;
 * flagBullet.label.text = "{valueY}";
 * ```
 * ```JavaScript
 * var series = chart.series.push(new am4charts.LineSeries());
 * // ...
 * var flagBullet = series.bullets.push(new am4plugins_bullets.FlagBullet());
 * flagBullet.poleHeight = 15;
 * flagBullet.label.text = "{valueY}";
 * ```
 * ```JSON
 * {
 *   // ...
 *   "series": [{
 *     // ...
 *     "bullets": [{
 *       "type": "FlagBullet",
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
var FlagBullet = /** @class */ (function (_super) {
    __extends(FlagBullet, _super);
    /**
     * Constructor
     */
    function FlagBullet() {
        var _this = _super.call(this) || this;
        _this.className = "FlagBullet";
        var background = _this.background;
        background.fillOpacity = 1;
        background.events.on("propertychanged", _this.invalidate, _this, false);
        background.waveHeight = 1.5;
        background.waveLength = 7;
        background.setWavedSides(true, false, true, false);
        background.strokeOpacity = 1;
        var interfaceColors = new InterfaceColorSet();
        _this.stroke = interfaceColors.getFor("alternativeBackground");
        _this.pole = _this.createChild(Line);
        _this.pole.strokeOpacity = 1;
        _this.width = 22;
        _this.height = 16;
        var label = new Label();
        label.padding(3, 5, 3, 5);
        label.dy = 1;
        label.events.on("propertychanged", _this.invalidate, _this, false);
        label.events.on("positionchanged", _this.invalidate, _this, false);
        label.strokeOpacity = 0;
        _this.label = label;
        _this.poleHeight = 10;
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
    FlagBullet.prototype.validate = function () {
        _super.prototype.validate.call(this);
        this.updateBackground();
        var background = this.background;
        this.pole.y1 = 0;
        var poleHeight = this.poleHeight;
        var label = this.label;
        var bgHeight = background.pixelHeight;
        if (poleHeight > 0) {
            this.pole.y2 = -poleHeight - bgHeight;
            if (label) {
                label.y = -poleHeight - bgHeight;
            }
        }
        else {
            this.pole.y2 = -poleHeight + bgHeight;
            if (label) {
                label.y = -poleHeight;
            }
        }
        if (label && label.horizontalCenter == "middle") {
            this.pole.y2 = -poleHeight;
        }
    };
    /**
     * Update the background to fit into specific dimensions.
     *
     * @ignore Exclude from docs
     * @todo Make it protected?
     */
    FlagBullet.prototype.updateBackground = function () {
        var background = this._background; // accessing protected, as getter creates instance if it doesn't exist
        if (background) {
            var label = this.label;
            if (label) {
                background.x = label.maxLeft;
                background.width = label.measuredWidth;
                background.height = label.measuredHeight;
            }
            else {
                background.width = Math.abs(this.maxRight - this.maxLeft);
                background.height = Math.abs(this.maxBottom - this.maxTop);
            }
            var poleHeight = this.poleHeight;
            if (poleHeight > 0) {
                background.y = -poleHeight - background.pixelHeight;
            }
            else {
                background.y = -poleHeight;
            }
        }
    };
    Object.defineProperty(FlagBullet.prototype, "label", {
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
         * flagBullet.text = "Hello";
         * ```
         * ```JavaScript
         * flagBullet.text = "Hello";
         * ```
         * ```JSON
         * {
         *   // ...
         *   "series": [{
         *     // ...
         *     "bullets": [{
         *       "type": "FlagBullet",
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
                label.parent = this;
                label.shouldClone = false;
            }
            else {
                if (this._label) {
                    this._label.dispose();
                }
                this._label = label;
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies all proprities and related stuff from another instance of
     * [[FlagBullet]].
     *
     * @param source  Source element
     */
    FlagBullet.prototype.copyFrom = function (source) {
        if (source.label) {
            this.label = source.label.clone();
        }
        if (source.pole) {
            this.pole.copyFrom(source.pole);
        }
        _super.prototype.copyFrom.call(this, source);
    };
    /**
     * Creates and returns a background element.
     *
     * @ignore Exclude from docs
     * @return Background
     */
    FlagBullet.prototype.createBackground = function () {
        return new WavedRectangle();
    };
    Object.defineProperty(FlagBullet.prototype, "poleHeight", {
        /**
         * @return Height (px)
         */
        get: function () {
            return this.getPropertyValue("poleHeight");
        },
        /**
         * Flag pole height in pixels.
         *
         * @default 10
         * @param  value  Height (px)
         */
        set: function (value) {
            this.setPropertyValue("poleHeight", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return FlagBullet;
}(Bullet));
export { FlagBullet };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["FlagBullet"] = FlagBullet;
//# sourceMappingURL=FlagBullet.js.map