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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _caption = require("../Typography/Caption/Caption");
var _headline = require("../Typography/Headline/Headline");
var modeClassNames = {
    secondary: "vkuiCounter--mode-secondary",
    primary: "vkuiCounter--mode-primary",
    prominent: "vkuiCounter--mode-prominent",
    contrast: "vkuiCounter--mode-contrast",
    inherit: "vkuiCounter--mode-inherit"
};
var sizeClassNames = {
    s: "vkuiCounter--size-s",
    m: "vkuiCounter--size-m"
};
var Counter = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "inherit" : _param_mode, _param_size = _param.size, size = _param_size === void 0 ? "m" : _param_size, children = _param.children, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "mode",
        "size",
        "children",
        "className"
    ]);
    if (_react.Children.count(children) === 0) {
        return null;
    }
    var CounterTypography = size === "s" ? _caption.Caption : _headline.Headline;
    var counterLevel = size === "s" ? "1" : "2";
    return /*#__PURE__*/ _react.createElement(CounterTypography, _objectSpreadProps(_objectSpread({}, restProps), {
        Component: "span",
        className: (0, _vkjs.classNames)("vkuiInternalCounter", "vkuiCounter", modeClassNames[mode], sizeClassNames[size], className),
        level: counterLevel
    }), children);
};

//# sourceMappingURL=Counter.js.map