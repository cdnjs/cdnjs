import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { LinearGradient } from "./LinearGradient";
import { GradientModifier } from "./GradientModifier";
import { registry } from "../../Registry";
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
 * let fillModifier = new am4core.LinearGradientModifier();
 * fillModifier.opacities = [1, 1, 0];
 * fillModifier.offsets = [0, 0.8, 1];
 * columnSeries.columns.template.fillModifier = fillModifier;
 * ```
 * ```JavaScript
 * var fillModifier = new am4core.LinearGradientModifier();
 * fillModifier.opacities = [1, 1, 0];
 * fillModifier.offsets = [0, 0.8, 1];
 * columnSeries.columns.template.fillModifier = fillModifier;
 * ```
 * ```JSON
 * "series": [{
 *   "type": "ColumnSeries",
 *   "columns": {
 *     "fillModifier": {
 *       "type": "LinearGradientModifier",
 *       "opacities": [1, 1, 0],
 *       "offsets": [0, 0.8, 1]
 *     }
 *   }
 * }]
 * ```
 */
var LinearGradientModifier = /** @class */ (function (_super) {
    __extends(LinearGradientModifier, _super);
    /**
     * Constructor.
     */
    function LinearGradientModifier() {
        var _this = _super.call(this) || this;
        _this.className = "LinearGradientModifier";
        _this.gradient = new LinearGradient();
        _this.applyTheme();
        return _this;
    }
    LinearGradientModifier.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.gradient = source.gradient.clone();
    };
    return LinearGradientModifier;
}(GradientModifier));
export { LinearGradientModifier };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["LinearGradientModifier"] = LinearGradientModifier;
//# sourceMappingURL=LinearGradientModifier.js.map