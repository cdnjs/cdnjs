/**
 * Color set from Spirited away movie borrowed from https://twitter.com/CINEMAPALETTES
 */
import { is } from "../core/Registry";
import { color } from "../core/utils/Color";
var theme = function (object) {
    if (is(object, "ColorSet")) {
        object.list = [
            color("#65738e"),
            color("#766c91"),
            color("#78566f"),
            color("#523b58"),
            color("#813b3d"),
            color("#bc5e52"),
            color("#ee8b78"),
            color("#f9c885"),
            color("#eba05c"),
            color("#9b5134")
        ];
        object.minLightness = 0.2;
        object.maxLightness = 0.7;
        object.reuse = true;
    }
};
export default theme;
//# sourceMappingURL=spiritedaway.js.map