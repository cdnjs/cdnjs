"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Badge", {
    enumerable: true,
    get: function() {
        return Badge;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _RootComponent = require("../RootComponent/RootComponent");
var stylesMode = {
    new: "vkuiBadge--mode-new",
    prominent: "vkuiBadge--mode-prominent"
};
var Badge = function(_param) /*#__PURE__*/ {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "new" : _param_mode, restProps = _object_without_properties._(_param, [
        "mode"
    ]);
    return _react.createElement(_RootComponent.RootComponent, _object_spread._({
        Component: "span",
        baseClassName: (0, _vkjs.classNames)("vkuiBadge", stylesMode[mode])
    }, restProps));
};

//# sourceMappingURL=Badge.js.map