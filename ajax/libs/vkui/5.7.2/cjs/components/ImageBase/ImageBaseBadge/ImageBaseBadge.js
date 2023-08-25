"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImageBaseBadge", {
    enumerable: true,
    get: function() {
        return ImageBaseBadge;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _context = require("../context");
var _validators = require("../validators");
var backgroundStyles = {
    stroke: "vkuiImageBaseBadge--background-stroke",
    shadow: "vkuiImageBaseBadge--background-shadow"
};
var ImageBaseBadge = function(_param) {
    var _param_background = _param.background, background = _param_background === void 0 ? "shadow" : _param_background, children = _param.children, className = _param.className, restProps = _object_without_properties._(_param, [
        "background",
        "children",
        "className"
    ]);
    if (process.env.NODE_ENV === "development") {
        if (children) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            var size = _react.useContext(_context.ImageBaseContext).size;
            (0, _validators.validateBadgeIcon)(size, {
                name: "children",
                value: children
            });
        }
    }
    return /*#__PURE__*/ _react.createElement("div", _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiImageBaseBadge", backgroundStyles[background], className)
    }), children);
};

//# sourceMappingURL=ImageBaseBadge.js.map