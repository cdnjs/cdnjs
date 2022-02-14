import { is } from "../core/Registry";
var theme = function (object) {
    if (is(object, "Sprite")) {
        object.showSystemTooltip = false;
    }
    if (is(object, "Chart")) {
        object.padding(0, 0, 0, 0);
    }
    if (is(object, "Scrollbar")) {
        object.startGrip.disabled = true;
        object.endGrip.disabled = true;
    }
    if (is(object, "AxisLabel") || is(object, "AxisLine") || is(object, "Grid")) {
        object.disabled = true;
    }
    if (is(object, "Axis")) {
        object.cursorTooltipEnabled = false;
    }
    if (is(object, "PercentSeries")) {
        object.labels.template.disabled = true;
        object.ticks.template.disabled = true;
    }
    if (is(object, "ZoomOutButton")) {
        object.padding(1, 1, 1, 1);
    }
    if (is(object, "Container")) {
        if (object.minHeight) {
            object.minHeight = undefined;
        }
        if (object.minWidth) {
            object.minWidth = undefined;
        }
    }
};
export default theme;
//# sourceMappingURL=microchart.js.map