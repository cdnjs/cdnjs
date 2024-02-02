import { _ as _define_property } from "@swc/helpers/_/_define_property";
export { BREAKPOINTS, MEDIA_QUERIES } from "../../shared/breakpoints";
export var ViewWidth;
(function(ViewWidth) {
    ViewWidth[ViewWidth["SMALL_MOBILE"] = 1] = "SMALL_MOBILE";
    ViewWidth[ViewWidth["MOBILE"] = 2] = "MOBILE";
    ViewWidth[ViewWidth["SMALL_TABLET"] = 3] = "SMALL_TABLET";
    ViewWidth[ViewWidth["TABLET"] = 4] = "TABLET";
    ViewWidth[ViewWidth["DESKTOP"] = 5] = "DESKTOP";
})(ViewWidth || (ViewWidth = {}));
export var ViewHeight;
(function(ViewHeight) {
    ViewHeight[ViewHeight["EXTRA_SMALL"] = 1] = "EXTRA_SMALL";
    ViewHeight[ViewHeight["SMALL"] = 2] = "SMALL";
    ViewHeight[ViewHeight["MEDIUM"] = 3] = "MEDIUM";
})(ViewHeight || (ViewHeight = {}));
export var SizeType;
(function(SizeType) {
    SizeType["COMPACT"] = "compact";
    SizeType["REGULAR"] = "regular";
})(SizeType || (SizeType = {}));
var _obj;
export var VIEW_WIDTH_TO_CSS_BREAKPOINT_MAP = (_obj = {}, _define_property(_obj, 1, "smallMobileMinus"), _define_property(_obj, 2, "mobile"), _define_property(_obj, 3, "smallTablet"), _define_property(_obj, 4, "tablet"), _define_property(_obj, 5, "desktopPlus"), _obj);

//# sourceMappingURL=constants.js.map