/**
 * This module contains a version of ColorSet that can (and should) be used for
 * coloring UI elements.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../Base";
import { registry } from "../Registry";
import { color } from "./Color";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This module contains a version of ColorSet that can (and should) be used for
 * coloring UI elements.
 *
 * The main difference from the basic [[ColorSet]] is that instead of sequenced
 * colors, it uses a concept of named colors.
 *
 * This way, every element in the UI can extract an exact color theme author
 * meant for the specific purpose, like strokes, backgrounds, etc.
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/colors/} for color-related info
 */
var InterfaceColorSet = /** @class */ (function (_super) {
    __extends(InterfaceColorSet, _super);
    /**
     * Constructor
     */
    function InterfaceColorSet() {
        var _this = _super.call(this) || this;
        /**
         * Maps the list of purposes (like "stroke") to an index of color of the
         * color set.
         */
        _this._purposes = {
            stroke: color("#e5e5e5"),
            fill: color("#f3f3f3"),
            primaryButton: color("#6794dc"),
            primaryButtonHover: color("#6771dc"),
            primaryButtonDown: color("#68dc75"),
            primaryButtonActive: color("#68dc75"),
            primaryButtonText: color("#FFFFFF"),
            primaryButtonStroke: color("#FFFFFF"),
            secondaryButton: color("#d9d9d9"),
            secondaryButtonHover: color("#d9d9d9").brighten(-0.25),
            secondaryButtonDown: color("#d9d9d9").brighten(-0.35),
            secondaryButtonActive: color("#d9d9d9").brighten(0.35),
            secondaryButtonText: color("#000000"),
            secondaryButtonStroke: color("#FFFFFF"),
            grid: color("#000000"),
            background: color("#ffffff"),
            alternativeBackground: color("#000000"),
            text: color("#000000"),
            alternativeText: color("#FFFFFF"),
            disabledBackground: color("#999999"),
            positive: color("#67dc75"),
            negative: color("#dc6788")
        };
        _this.className = "InterfaceColorSet";
        _this.applyTheme();
        return _this;
    }
    InterfaceColorSet.prototype.debug = function () { };
    /**
     * Returns a color to be used for the specific purpose.
     *
     * ```TypeScript
     * let uicolors = new am4core.InterfaceColorSet();
     * console.log(uicolors.getFor("stroke"));
     * ```
     * ```JavaScript
     * var uicolors = new am4core.InterfaceColorSet();
     * console.log(uicolors.getFor("stroke"));
     * ```
     *
     * @param purpose  Color use purpuse
     * @return Color
     */
    InterfaceColorSet.prototype.getFor = function (purpose) {
        return this._purposes[purpose];
    };
    /**
     * Sets color to be used for the specific purpose.
     *
     * @param purpose  Color use purpose
     * @param color    Color
     */
    InterfaceColorSet.prototype.setFor = function (purpose, color) {
        this._purposes[purpose] = color;
    };
    return InterfaceColorSet;
}(BaseObject));
export { InterfaceColorSet };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["InterfaceColorSet"] = InterfaceColorSet;
//# sourceMappingURL=InterfaceColorSet.js.map