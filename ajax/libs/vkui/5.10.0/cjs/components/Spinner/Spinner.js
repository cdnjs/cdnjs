"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Spinner", {
    enumerable: true,
    get: function() {
        return Spinner;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _warnOnce = require("../../lib/warnOnce");
var _RootComponent = require("../RootComponent/RootComponent");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
var warn = (0, _warnOnce.warnOnce)("Spinner");
var Spinner = /*#__PURE__*/ _react.memo(function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "regular" : _param_size, _param_children = _param.children, children = _param_children === void 0 ? "Загружается..." : _param_children, tmp = _param[// TODO [>=6]: Удалить автоматическое приведение aria-label
    "aria-label"], ariaLabel = tmp === void 0 ? "Загружается..." : tmp, disableAnimation = _param.disableAnimation, restProps = _object_without_properties._(_param, [
        "size",
        "children",
        "aria-label",
        "disableAnimation"
    ]);
    var SpinnerIcon = {
        small: _icons.Icon16Spinner,
        regular: _icons.Icon24Spinner,
        medium: _icons.Icon32Spinner,
        large: _icons.Icon44Spinner
    }[size];
    var center = {
        small: 8,
        regular: 12,
        medium: 16,
        large: 22
    }[size];
    // TODO [>=6]: Удалить варнинг
    if (process.env.NODE_ENV === "development") {
        if (ariaLabel && !children) {
            warn("a11y: Пожалуйста, передавайте ваш текст для ассистивных технологий в children вместо aria-label.");
        }
    }
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: "span",
        role: "status"
    }, restProps), {
        baseClassName: "vkuiSpinner"
    }), /*#__PURE__*/ _react.createElement(SpinnerIcon, null, !disableAnimation && // TODO [a11y]: use reduced motion hook?
    //              https://github.com/VKCOM/VKUI/pull/4673
    /*#__PURE__*/ _react.createElement("animateTransform", {
        attributeName: "transform",
        attributeType: "XML",
        type: "rotate",
        from: "0 ".concat(center, " ").concat(center),
        to: "360 ".concat(center, " ").concat(center),
        dur: "0.7s",
        repeatCount: "indefinite"
    })), /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, children !== null && children !== void 0 ? children : ariaLabel));
});
Spinner.displayName = "Spinner";

//# sourceMappingURL=Spinner.js.map