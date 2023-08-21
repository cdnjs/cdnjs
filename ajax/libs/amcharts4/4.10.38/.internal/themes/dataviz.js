/**
 * A color scheme inspired by {@link https://datavizproject.com/}
 */
import { is } from "../core/Registry";
import { color } from "../core/utils/Color";
var theme = function (object) {
    if (is(object, "ColorSet")) {
        object.list = [
            color("#283250"),
            color("#902c2d"),
            color("#d5433d"),
            color("#f05440")
        ];
        object.reuse = false;
        object.stepOptions = {
            lightness: 0.05,
            hue: 0
        };
        object.passOptions = {};
    }
};
export default theme;
//# sourceMappingURL=dataviz.js.map