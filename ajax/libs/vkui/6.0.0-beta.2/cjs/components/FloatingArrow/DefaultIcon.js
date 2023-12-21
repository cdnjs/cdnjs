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
    DEFAULT_ARROW_HEIGHT: function() {
        return DEFAULT_ARROW_HEIGHT;
    },
    DEFAULT_ARROW_PADDING: function() {
        return DEFAULT_ARROW_PADDING;
    },
    DEFAULT_ARROW_WIDTH: function() {
        return DEFAULT_ARROW_WIDTH;
    },
    DefaultIcon: function() {
        return DefaultIcon;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const DEFAULT_ARROW_WIDTH = 20;
const DEFAULT_ARROW_HEIGHT = 8;
const DEFAULT_ARROW_PADDING = 10;
const PLATFORM_HEIGHT = 1;
const ARROW_HEIGHT_WITH_WHITE_SPACE = DEFAULT_ARROW_HEIGHT + PLATFORM_HEIGHT;
const DefaultIcon = (props)=>{
    return /*#__PURE__*/ _react.createElement("svg", _object_spread._({
        width: DEFAULT_ARROW_WIDTH,
        height: ARROW_HEIGHT_WITH_WHITE_SPACE,
        viewBox: `0 0 ${DEFAULT_ARROW_WIDTH} ${ARROW_HEIGHT_WITH_WHITE_SPACE}`,
        xmlns: "http://www.w3.org/2000/svg"
    }, props), /*#__PURE__*/ _react.createElement("path", {
        d: "M10 0c3 0 6 8 10 8v1H0V8c3.975 0 7-8 10-8Z",
        fill: "currentColor"
    }));
};

//# sourceMappingURL=DefaultIcon.js.map