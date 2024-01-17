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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _AdaptiveIconRenderer = require("../../../AdaptiveIconRenderer/AdaptiveIconRenderer");
const _RootComponent = require("../../../RootComponent/RootComponent");
const _VisuallyHidden = require("../../../VisuallyHidden/VisuallyHidden");
const adaptiveIcon = /*#__PURE__*/ _react.createElement(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
    IconCompact: _icons.Icon20CheckCircleOn,
    IconRegular: _icons.Icon24CheckCircleOn
});
const Radio = (_param)=>{
    var { children = adaptiveIcon, getRootRef, getRef, className, style } = _param, restProps = _object_without_properties._(_param, [
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