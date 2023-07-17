"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ViewWidth: function() {
        return ViewWidth;
    },
    ViewHeight: function() {
        return ViewHeight;
    },
    SizeType: function() {
        return SizeType;
    },
    BREAKPOINTS: function() {
        return _breakpoints.BREAKPOINTS;
    },
    MEDIA_QUERIES: function() {
        return _breakpoints.MEDIA_QUERIES;
    },
    VIEW_WIDTH_TO_CSS_BREAKPOINT_MAP: function() {
        return VIEW_WIDTH_TO_CSS_BREAKPOINT_MAP;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _breakpoints = require("../../shared/breakpoints");
var ViewWidth;
(function(ViewWidth) {
    ViewWidth[ViewWidth["SMALL_MOBILE"] = 1] = "SMALL_MOBILE";
    ViewWidth[ViewWidth["MOBILE"] = 2] = "MOBILE";
    ViewWidth[ViewWidth["SMALL_TABLET"] = 3] = "SMALL_TABLET";
    ViewWidth[ViewWidth["TABLET"] = 4] = "TABLET";
    ViewWidth[ViewWidth["DESKTOP"] = 5] = "DESKTOP";
})(ViewWidth || (ViewWidth = {}));
var ViewHeight;
(function(ViewHeight) {
    ViewHeight[ViewHeight["EXTRA_SMALL"] = 1] = "EXTRA_SMALL";
    ViewHeight[ViewHeight["SMALL"] = 2] = "SMALL";
    ViewHeight[ViewHeight["MEDIUM"] = 3] = "MEDIUM";
})(ViewHeight || (ViewHeight = {}));
var SizeType;
(function(SizeType) {
    SizeType["COMPACT"] = "compact";
    SizeType["REGULAR"] = "regular";
})(SizeType || (SizeType = {}));
var _obj;
var VIEW_WIDTH_TO_CSS_BREAKPOINT_MAP = (_obj = {}, _define_property._(_obj, ViewWidth.SMALL_MOBILE, "smallMobileMinus"), _define_property._(_obj, ViewWidth.MOBILE, "mobile"), _define_property._(_obj, ViewWidth.SMALL_TABLET, "smallTablet"), _define_property._(_obj, ViewWidth.TABLET, "tablet"), _define_property._(_obj, ViewWidth.DESKTOP, "desktopPlus"), _obj);

//# sourceMappingURL=constants.js.map