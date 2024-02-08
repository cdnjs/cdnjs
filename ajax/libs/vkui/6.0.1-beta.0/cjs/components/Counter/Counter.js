"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Counter", {
    enumerable: true,
    get: function() {
        return Counter;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Caption = require("../Typography/Caption/Caption");
const _Headline = require("../Typography/Headline/Headline");
const modeClassNames = {
    secondary: "vkuiCounter--mode-secondary",
    primary: "vkuiCounter--mode-primary",
    prominent: "vkuiCounter--mode-prominent",
    contrast: "vkuiCounter--mode-contrast",
    inherit: "vkuiCounter--mode-inherit"
};
const sizeClassNames = {
    s: "vkuiCounter--size-s",
    m: "vkuiCounter--size-m"
};
const Counter = (_param)=>{
    var { mode = 'inherit', size = 'm', children, className } = _param, restProps = _object_without_properties._(_param, [
        "mode",
        "size",
        "children",
        "className"
    ]);
    if (_react.Children.count(children) === 0) {
        return null;
    }
    const CounterTypography = size === 's' ? _Caption.Caption : _Headline.Headline;
    const counterLevel = size === 's' ? '1' : '2';
    return /*#__PURE__*/ _react.createElement(CounterTypography, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "span",
        className: (0, _vkjs.classNames)('vkuiInternalCounter', "vkuiCounter", modeClassNames[mode], sizeClassNames[size], className),
        level: counterLevel
    }), children);
};

//# sourceMappingURL=Counter.js.map