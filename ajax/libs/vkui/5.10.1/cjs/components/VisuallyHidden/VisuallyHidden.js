"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VisuallyHidden", {
    enumerable: true,
    get: function() {
        return VisuallyHidden;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _RootComponent = require("../RootComponent/RootComponent");
var VisuallyHidden = function(_param) /*#__PURE__*/ {
    var _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, restProps = _object_without_properties._(_param, [
        "Component"
    ]);
    return _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: Component
    }, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiVisuallyHidden", Component === "input" && "vkuiVisuallyHidden--focusable-input")
    }));
};

//# sourceMappingURL=VisuallyHidden.js.map