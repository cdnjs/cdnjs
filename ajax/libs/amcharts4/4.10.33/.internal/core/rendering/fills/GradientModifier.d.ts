/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColorModifier } from "./ColorModifier";
import { LinearGradient } from "./LinearGradient";
import { RadialGradient } from "./RadialGradient";
import { Color } from "../../utils/Color";
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
export declare class GradientModifier extends ColorModifier {
    /**
     * A reference to the gradient instance that this modifier is used for.
     */
    gradient: LinearGradient | RadialGradient;
    /**
     * An array of lightness values for each step.
     */
    protected _lightnesses: number[];
    /**
     * An array of brightness values for each step.
     */
    protected _brightnesses: number[];
    /**
     * An array of opacity values for each step.
     */
    protected _opacities: number[];
    /**
     * An array of relative position (0-1) for each step.
     *
     * If not set, all steps will be of equal relative length.
     */
    protected _offsets: number[];
    /**
     * Constructor.
     */
    constructor();
    /**
     * An array of lightness values for each step.
     *
     * @param value  Lightness values
     */
    /**
    * @return Lightness values
    */
    lightnesses: number[];
    /**
     * An array of brightness values for each step.
     *
     * @param value  Brightness values
     */
    /**
    * @return Brightness values
    */
    brightnesses: number[];
    /**
     * An array of opacity values for each step.
     *
     * @param value  Opacity values
     */
    /**
    * @return Opacity values
    */
    opacities: number[];
    /**
     * An array of relative position (0-1) for each step.
     *
     * If not set, all steps will be of equal relative length.
     *
     * @param value  Offsets
     */
    /**
    * @return Offsets
    */
    offsets: number[];
    /**
     * Modifies the color based on step setting.
     *
     * @ignore Exclude from docs
     * @param value  Source color
     * @return A gradient that matches set modification rules
     */
    modify(value: Color): Color | LinearGradient | RadialGradient;
    copyFrom(source: this): void;
}
