/**
 * Color set from Moonrise kingdom movie borrowed from https://twitter.com/CINEMAPALETTES
 */
import { is } from "../core/Registry";
import { color } from "../core/utils/Color";
var theme = function (object) {
    if (is(object, "ColorSet")) {
        object.list = [
            color("#3a1302"),
            color("#601205"),
            color("#8a2b0d"),
            color("#c75e24"),
            color("#c79f59"),
            color("#a4956a"),
            color("#868569"),
            color("#756f61"),
            color("#586160"),
            color("#617983")
        ];
        object.minLightness = 0.2;
        object.maxLightness = 0.7;
        object.reuse = true;
    }
};
export default theme;
//# sourceMappingURL=moonrisekingdom.js.map