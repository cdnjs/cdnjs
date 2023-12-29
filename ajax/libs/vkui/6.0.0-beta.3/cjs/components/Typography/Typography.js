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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const stylesWeight = {
    '1': "vkuiTypography--weight-1",
    '2': "vkuiTypography--weight-2",
    '3': "vkuiTypography--weight-3"
};
const Typography = (_param)=>{
    var { weight, Component = 'span', normalize } = _param, restProps = _object_without_properties._(_param, [
        "weight",
        "Component",
        "normalize"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        Component: Component,
        baseClassName: (0, _vkjs.classNames)("vkuiTypography", normalize && "vkuiTypography--normalize", weight && stylesWeight[weight])
    }, restProps));
};

//# sourceMappingURL=Typography.js.map