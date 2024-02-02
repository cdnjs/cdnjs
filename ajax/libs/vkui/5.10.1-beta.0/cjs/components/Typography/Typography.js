"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Typography", {
    enumerable: true,
    get: function() {
        return Typography;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _RootComponent = require("../RootComponent/RootComponent");
var stylesWeight = {
    "1": "vkuiTypography--weight-1",
    "2": "vkuiTypography--weight-2",
    "3": "vkuiTypography--weight-3"
};
var Typography = function(_param) /*#__PURE__*/ {
    var weight = _param.weight, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, normalize = _param.normalize, restProps = _object_without_properties._(_param, [
        "weight",
        "Component",
        "normalize"
    ]);
    return _react.createElement(_RootComponent.RootComponent, _object_spread._({
        Component: Component,
        baseClassName: (0, _vkjs.classNames)("vkuiTypography", normalize && "vkuiTypography--normalize", weight && stylesWeight[weight])
    }, restProps));
};

//# sourceMappingURL=Typography.js.map