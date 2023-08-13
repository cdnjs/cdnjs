import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColorModifier } from "./ColorModifier";
import { registry } from "../../Registry";
import * as $math from "../../utils/Math";
import * as $type from "../../utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This class can be used to modify linear gradient steps, changing visual
 * properties like lightness, brightness, opacity of each set.
 *
 * It can also set offsets for each gradient step.
 *
 * E.g. if I want to fill a columns in a column series to be a solid fill from
 * top to 80% of height, then gradually fades out, I can use the following
 * gradient modifier as a `fillModifier`:
 *
 * ```TypeScript
 * let fillModifier = new am4core.GradientModifier();
 * fillModifier.opacities = [1, 1, 0];
 * fillModifier.offsets = [0, 0.8, 1];
 * columnSeries.columns.template.fillModifier = fillModifier;
 * ```
 * ```JavaScript
 * var fillModifier = new am4core.GradientModifier();
 * fillModifier.opacities = [1, 1, 0];
 * fillModifier.offsets = [0, 0.8, 1];
 * columnSeries.columns.template.fillModifier = fillModifier;
 * ```
 * ```JSON
 * "series": [{
 *   "type": "ColumnSeries",
 *   "columns": {
 *     "fillModifier": {
 *       "type": "GradientModifier",
 *       "opacities": [1, 1, 0],
 *       "offsets": [0, 0.8, 1]
 *     }
 *   }
 * }]
 * ```
 */
var GradientModifier = /** @class */ (function (_super) {
    __extends(GradientModifier, _super);
    /**
     * Constructor.
     */
    function GradientModifier() {
        var _this = _super.call(this) || this;
        _this.lightnesses = [];
        _this.brightnesses = [];
        _this.opacities = [];
        _this.offsets = [];
        _this.className = "GradientModifier";
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(GradientModifier.prototype, "lightnesses", {
        /**
         * @return Lightness values
         */
        get: function () {
            return this._lightnesses;
        },
        /**
         * An array of lightness values for each step.
         *
         * @param value  Lightness values
         */
        set: function (value) {
            this._lightnesses = value;
            this._brightnesses = [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GradientModifier.prototype, "brightnesses", {
        /**
         * @return Brightness values
         */
        get: function () {
            return this._brightnesses;
        },
        /**
         * An array of brightness values for each step.
         *
         * @param value  Brightness values
         */
        set: function (value) {
            this._brightnesses = value;
            this._lightnesses = [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GradientModifier.prototype, "opacities", {
        /**
         * @return Opacity values
         */
        get: function () {
            return this._opacities;
        },
        /**
         * An array of opacity values for each step.
         *
         * @param value  Opacity values
         */
        set: function (value) {
            this._opacities = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GradientModifier.prototype, "offsets", {
        /**
         * @return Offsets
         */
        get: function () {
            return this._offsets;
        },
        /**
         * An array of relative position (0-1) for each step.
         *
         * If not set, all steps will be of equal relative length.
         *
         * @param value  Offsets
         */
        set: function (value) {
            this._offsets = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Modifies the color based on step setting.
     *
     * @ignore Exclude from docs
     * @param value  Source color
     * @return A gradient that matches set modification rules
     */
    GradientModifier.prototype.modify = function (value) {
        // Clear current gradient
        this.gradient.clear();
        // Get step count
        var count = 0;
        if (this.opacities) {
            count = $math.max(count, this.opacities.length);
        }
        if (this.lightnesses) {
            count = $math.max(count, this.lightnesses.length);
        }
        if (this.brightnesses) {
            count = $math.max(count, this.brightnesses.length);
        }
        // Init step values
        var opacity = 1, lightness, brightness;
        // Apply steps
        for (var i = 0; i < count; i++) {
            // Take base color
            var color = value;
            // Check if there are any parameters for this step
            if (this.opacities && $type.isNumber(this.opacities[i])) {
                opacity = this.opacities[i];
            }
            if (this.lightnesses && $type.isNumber(this.lightnesses[i])) {
                lightness = this.lightnesses[i];
                brightness = undefined;
            }
            if (this.brightnesses && $type.isNumber(this.brightnesses[i])) {
                brightness = this.brightnesses[i];
                lightness = undefined;
            }
            // Check if we need to brighten/lighten color
            if ($type.isNumber(brightness)) {
                color = value.brighten(this.brightnesses[i]);
            }
            else if ($type.isNumber(lightness)) {
                color = value.lighten(this.lightnesses[i]);
            }
            // Get offset (it's OK if it's undefined)
            var offset = this.offsets[i];
            // Apply step
            this.gradient.addColor(color, opacity, offset);
        }
        return this.gradient;
    };
    GradientModifier.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this._offsets = source.offsets;
        this._brightnesses = source.brightnesses;
        this._lightnesses = source.lightnesses;
        this._opacities = source.opacities;
    };
    return GradientModifier;
}(ColorModifier));
export { GradientModifier };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["GradientModifier"] = GradientModifier;
//# sourceMappingURL=GradientModifier.js.map