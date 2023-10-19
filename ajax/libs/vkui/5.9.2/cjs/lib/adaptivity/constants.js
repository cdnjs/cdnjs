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
    BREAKPOINTS: function() {
        return _breakpoints.BREAKPOINTS;
    },
    MEDIA_QUERIES: function() {
        return _breakpoints.MEDIA_QUERIES;
    },
    SizeType: function() {
        return SizeType;
    },
    VIEW_WIDTH_TO_CSS_BREAKPOINT_MAP: function() {
        return VIEW_WIDTH_TO_CSS_BREAKPOINT_MAP;
    },
    ViewHeight: function() {
        return ViewHeight;
    },
    ViewWidth: function() {
        return ViewWidth;
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
var VIEW_WIDTH_TO_CSS_BREAKPOINT_MAP = (_obj = {}, _define_property._(_obj, 1, "smallMobileMinus"), _define_property._(_obj, 2, "mobile"), _define_property._(_obj, 3, "smallTablet"), _define_property._(_obj, 4, "tablet"), _define_property._(_obj, 5, "desktopPlus"), _obj);

//# sourceMappingURL=constants.js.map