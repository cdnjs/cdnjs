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
export var VIEW_WIDTH_TO_CSS_BREAKPOINT_MAP = (_obj = {}, _define_property(_obj, ViewWidth.SMALL_MOBILE, "smallMobileMinus"), _define_property(_obj, ViewWidth.MOBILE, "mobile"), _define_property(_obj, ViewWidth.SMALL_TABLET, "smallTablet"), _define_property(_obj, ViewWidth.TABLET, "tablet"), _define_property(_obj, ViewWidth.DESKTOP, "desktopPlus"), _obj);

//# sourceMappingURL=constants.js.map