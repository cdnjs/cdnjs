"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Gradient", {
    enumerable: true,
    get: function() {
        return Gradient;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _warnOnce = require("../../lib/warnOnce");
var _RootComponent = require("../RootComponent/RootComponent");
var stylesMode = {
    tint: "vkuiGradient--mode-tint",
    black: "vkuiGradient--mode-black",
    white: "vkuiGradient--mode-white"
};
var warn = (0, _warnOnce.warnOnce)("UsersStack");
var Gradient = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "tint" : _param_mode, _param_to = _param.to, to = _param_to === void 0 ? "top" : _param_to, restProps = _object_without_properties._(_param, [
        "mode",
        "to"
    ]);
    if (process.env.NODE_ENV === "development" && (mode === "black" || mode === "white")) {
        // TODO [>=6]: Удалить
        warn('Значения "black" и "white" свойства "mode" будут удалены в v6. Используйте "tint" или "default"');
    }
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        role: "presentation"
    }, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiGradient", mode !== "default" && stylesMode[mode], to === "bottom" && "vkuiGradient--to-bottom")
    }));
};

//# sourceMappingURL=Gradient.js.map