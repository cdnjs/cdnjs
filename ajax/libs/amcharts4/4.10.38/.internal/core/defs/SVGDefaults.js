/**
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { color } from "../utils/Color";
/**
 * Defines a class that holds default properties for new SVG elements
 */
var SVGDefaults = /** @class */ (function () {
    function SVGDefaults() {
    }
    SVGDefaults.opacity = 1;
    SVGDefaults.strokeOpacity = 1;
    SVGDefaults.strokeWidth = 1;
    SVGDefaults.fillOpacity = 1;
    SVGDefaults.fill = color("#000000");
    SVGDefaults.stroke = color("#000000");
    SVGDefaults.focusable = undefined;
    SVGDefaults.tabindex = 0;
    return SVGDefaults;
}());
export { SVGDefaults };
//# sourceMappingURL=SVGDefaults.js.map