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
const _breakpoints = require("../../shared/breakpoints");
const ViewWidth = {
    SMALL_MOBILE: 1,
    MOBILE: 2,
    SMALL_TABLET: 3,
    TABLET: 4,
    DESKTOP: 5
};
const ViewHeight = {
    EXTRA_SMALL: 1,
    SMALL: 2,
    MEDIUM: 3
};
const SizeType = {
    COMPACT: 'compact',
    REGULAR: 'regular'
};
const VIEW_WIDTH_TO_CSS_BREAKPOINT_MAP = {
    [ViewWidth.SMALL_MOBILE]: 'smallMobileMinus',
    [ViewWidth.MOBILE]: 'mobile',
    [ViewWidth.SMALL_TABLET]: 'smallTablet',
    [ViewWidth.TABLET]: 'tablet',
    [ViewWidth.DESKTOP]: 'desktopPlus'
};

//# sourceMappingURL=constants.js.map