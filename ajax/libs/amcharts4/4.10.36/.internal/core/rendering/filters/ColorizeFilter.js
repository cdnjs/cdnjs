/**
 * Module for "Colorize" filter.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Filter } from "./Filter";
import { registry } from "../../Registry";
;
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a "Colorize" filter.
 */
var ColorizeFilter = /** @class */ (function (_super) {
    __extends(ColorizeFilter, _super);
    /**
     * Constructor
     */
    function ColorizeFilter() {
        var _this = _super.call(this) || this;
        _this.className = "ColorizeFilter";
        // Create elements
        // NOTE: we do not need to add each individual element to `_disposers`
        // because `filterPrimitives` has an event handler which automatically adds
        // anything added to it to `_disposers`
        _this.feColorMatrix = _this.paper.add("feColorMatrix");
        _this.feColorMatrix.attr({ "type": "matrix" });
        //this.feColorMatrix.setAttribute("in", "SourceAlpha");
        _this.filterPrimitives.push(_this.feColorMatrix);
        // Set default properties
        _this.intensity = 1;
        _this.applyTheme();
        return _this;
    }
    /**
     * (Re)applies colors to the already existing filter by modifying filyer's
     * color matrix element.
     *
     * @ignore Exclude from docs
     */
    ColorizeFilter.prototype.applyFilter = function () {
        var i = this.intensity;
        var ii = 1 - i;
        var r;
        var g;
        var b;
        var color = this.color;
        if (color && color.rgb) {
            r = color.rgb.r / 255 * i;
            g = color.rgb.g / 255 * i;
            b = color.rgb.b / 255 * i;
        }
        else {
            r = 0;
            g = 0;
            b = 0;
        }
        this.feColorMatrix.attr({ "values": ii + " 0 0 0 " + r + " 0 " + ii + " 0 0 " + g + " 0 0 " + ii + " 0 " + b + " 0 0 0 1 0" });
    };
    Object.defineProperty(ColorizeFilter.prototype, "color", {
        /**
         * @return Color
         */
        get: function () {
            return this.properties["color"];
        },
        /**
         * Target color to apply to the element.
         *
         * Depending on the `intensity`, all colors of the target element will steer
         * towards this color.
         *
         * E.g. setting to `am4core.color("greener")` will make all colors greener.
         *
         * @param value  Color
         */
        set: function (value) {
            this.properties["color"] = value;
            this.applyFilter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorizeFilter.prototype, "intensity", {
        /**
         * @return Intensity (0-1)
         */
        get: function () {
            return this.properties.intensity;
        },
        /**
         * Intensity of the color (0-1).
         *
         * The bigger the number the more of a `color` target's colors will become.
         *
         * 0 means the colors will remain as they are.
         * 1 means all colors will become the target `color`.
         *
         * @default 1
         * @param value  Intensity (0-1)
         */
        set: function (value) {
            this.properties.intensity = value;
            this.applyFilter();
        },
        enumerable: true,
        configurable: true
    });
    return ColorizeFilter;
}(Filter));
export { ColorizeFilter };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ColorizeFilter"] = ColorizeFilter;
//# sourceMappingURL=ColorizeFilter.js.map