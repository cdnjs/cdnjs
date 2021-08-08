import { is } from "../core/Registry";
import { color } from "../core/utils/Color";
var theme = function (object) {
    if (is(object, "InterfaceColorSet")) {
        object.setFor("stroke", color("#000000"));
        object.setFor("fill", color("#2b2b2b"));
        object.setFor("primaryButton", color("#6794dc").lighten(-0.2));
        object.setFor("primaryButtonHover", color("#6771dc").lighten(-0.2));
        object.setFor("primaryButtonDown", color("#68dc75").lighten(-0.2));
        object.setFor("primaryButtonActive", color("#68dc75").lighten(-0.2));
        object.setFor("primaryButtonText", color("#FFFFFF"));
        object.setFor("primaryButtonStroke", color("#6794dc"));
        object.setFor("secondaryButton", color("#3b3b3b"));
        object.setFor("secondaryButtonHover", color("#3b3b3b").lighten(0.1));
        object.setFor("secondaryButtonDown", color("#3b3b3b").lighten(0.15));
        object.setFor("secondaryButtonActive", color("#3b3b3b").lighten(0.15));
        object.setFor("secondaryButtonText", color("#bbbbbb"));
        object.setFor("secondaryButtonStroke", color("#3b3b3b").lighten(-0.2));
        object.setFor("grid", color("#bbbbbb"));
        object.setFor("background", color("#000000"));
        object.setFor("alternativeBackground", color("#ffffff"));
        object.setFor("text", color("#ffffff"));
        object.setFor("alternativeText", color("#000000"));
        object.setFor("disabledBackground", color("#bbbbbb"));
    }
    if (is(object, "Scrollbar")) {
        object.background.fillOpacity = 0.4;
        object.thumb.background.fillOpacity = 0.5;
    }
};
export default theme;
//# sourceMappingURL=dark.js.map