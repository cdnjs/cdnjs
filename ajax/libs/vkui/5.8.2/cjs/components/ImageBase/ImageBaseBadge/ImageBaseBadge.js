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
var _RootComponent = require("../../RootComponent/RootComponent");
var _context = require("../context");
var _validators = require("../validators");
var backgroundStyles = {
    stroke: "vkuiImageBaseBadge--background-stroke",
    shadow: "vkuiImageBaseBadge--background-shadow"
};
var ImageBaseBadge = function(_param) {
    var _param_background = _param.background, background = _param_background === void 0 ? "shadow" : _param_background, restProps = _object_without_properties._(_param, [
        "background"
    ]);
    if (process.env.NODE_ENV === "development") {
        if (restProps.children) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            var size = _react.useContext(_context.ImageBaseContext).size;
            (0, _validators.validateBadgeIcon)(size, {
                name: "children",
                value: restProps.children
            });
        }
    }
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiImageBaseBadge", backgroundStyles[background])
    }));
};

//# sourceMappingURL=ImageBaseBadge.js.map