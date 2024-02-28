"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Card", {
    enumerable: true,
    get: function() {
        return Card;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _RootComponent = require("../RootComponent/RootComponent");
var Card = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "tint" : _param_mode, restProps = _object_without_properties._(_param, [
        "mode"
    ]);
    var withBorder = mode === "outline" || mode === "outline-tint";
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiCard", mode === "outline" && "vkuiCard--mode-outline", mode === "shadow" && "vkuiCard--mode-shadow", withBorder && "vkuiCard--withBorder")
    }));
};

//# sourceMappingURL=Card.js.map