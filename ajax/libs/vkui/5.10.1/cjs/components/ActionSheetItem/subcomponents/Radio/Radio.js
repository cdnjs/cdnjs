"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Radio", {
    enumerable: true,
    get: function() {
        return Radio;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _AdaptiveIconRenderer = require("../../../AdaptiveIconRenderer/AdaptiveIconRenderer");
var _RootComponent = require("../../../RootComponent/RootComponent");
var _VisuallyHidden = require("../../../VisuallyHidden/VisuallyHidden");
var adaptiveIcon = /*#__PURE__*/ _react.createElement(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
    IconCompact: _icons.Icon20CheckCircleOn,
    IconRegular: _icons.Icon24CheckCircleOn
});
var Radio = function(_param) {
    var _param_children = _param.children, children = _param_children === void 0 ? adaptiveIcon : _param_children, getRootRef = _param.getRootRef, getRef = _param.getRef, className = _param.className, style = _param.style, restProps = _object_without_properties._(_param, [
        "children",
        "getRootRef",
        "getRef",
        "className",
        "style"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, {
        getRootRef: getRootRef,
        className: className,
        style: style
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, _object_spread._({
        Component: "input",
        getRootRef: getRef,
        type: "radio",
        className: "vkuiActionSheetItemRadio__input"
    }, restProps)), children);
};

//# sourceMappingURL=Radio.js.map