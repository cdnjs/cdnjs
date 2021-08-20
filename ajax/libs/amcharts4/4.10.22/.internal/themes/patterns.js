import { is } from "../core/Registry";
import { PatternSet } from "../core/utils/PatternSet";
import { InterfaceColorSet } from "../core/utils/InterfaceColorSet";
var theme = function (object) {
    // Create PatternSet
    if (is(object, "XYChart") || is(object, "PercentSeries")) {
        object.patterns = new PatternSet();
    }
    // Set up compatible series
    if (is(object, "XYSeries") || is(object, "PercentSeries")) {
        // Set up fill for series' tooltip
        if (object.tooltip) {
            var ic = new InterfaceColorSet;
            object.tooltip.getFillFromObject = false;
            object.tooltip.fill = ic.getFor("alternativeBackground");
            object.tooltip.label.fill = ic.getFor("text");
            object.tooltip.background.stroke = ic.getFor("alternativeBackground");
        }
    }
    if (is(object, "Pattern")) {
        object.backgroundOpacity = 1;
    }
};
export default theme;
//# sourceMappingURL=patterns.js.map