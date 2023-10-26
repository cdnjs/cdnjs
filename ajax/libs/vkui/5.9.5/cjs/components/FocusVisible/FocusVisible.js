"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FocusVisible", {
    enumerable: true,
    get: function() {
        return FocusVisible;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _RootComponent = require("../RootComponent/RootComponent");
var stylesMode = {
    inside: "vkuiFocusVisible--mode-inside",
    outside: "vkuiFocusVisible--mode-outside",
    outline: "vkuiFocusVisible--mode-outline"
};
var FocusVisible = function(_param) /*#__PURE__*/ {
    var visible = _param.visible, mode = _param.mode, thin = _param.thin, restProps = _object_without_properties._(_param, [
        "visible",
        "mode",
        "thin"
    ]);
    return _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        "aria-hidden": true,
        baseClassName: (0, _vkjs.classNames)("vkuiFocusVisible", visible && "vkuiFocusVisible--visible", thin && "vkuiFocusVisible--thin", stylesMode[mode])
    }));
};

//# sourceMappingURL=FocusVisible.js.map