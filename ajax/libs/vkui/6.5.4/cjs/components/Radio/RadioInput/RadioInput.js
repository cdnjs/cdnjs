"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RadioInput", {
    enumerable: true,
    get: function() {
        return RadioInput;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _AdaptiveIconRenderer = require("../../AdaptiveIconRenderer/AdaptiveIconRenderer");
const _RootComponent = require("../../RootComponent/RootComponent");
const _VisuallyHidden = require("../../VisuallyHidden/VisuallyHidden");
function RadioIcon24(props) {
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("svg", _object_spread_props._(_object_spread._({
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        "aria-hidden": true
    }, props), {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth: "2",
                fill: "none"
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)("circle", {
                cx: "12",
                cy: "12",
                r: "7",
                className: "vkuiRadioInput__pin",
                fill: "currentColor"
            })
        ]
    }));
}
function RadioIcon20(props) {
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("svg", _object_spread_props._(_object_spread._({
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        "aria-hidden": true
    }, props), {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)("circle", {
                cx: "10",
                cy: "10",
                r: "7.75",
                stroke: "currentColor",
                strokeWidth: "1.5",
                fill: "none"
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)("circle", {
                cx: "10",
                cy: "10",
                r: "5.5",
                className: "vkuiRadioInput__pin",
                fill: "currentColor"
            })
        ]
    }));
}
function RadioIcon() {
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
        className: "vkuiRadioInput__icon",
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
            IconCompact: RadioIcon20,
            IconRegular: RadioIcon24
        })
    });
}
function RadioInput(_param) {
    var { className, style, getRootRef, getRef } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "style",
        "getRootRef",
        "getRef"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, {
        className: className,
        style: style,
        getRootRef: getRootRef,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({}, restProps), {
                Component: "input",
                type: "radio",
                baseClassName: "vkuiRadioInput__input",
                getRootRef: getRef
            })),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(RadioIcon, {})
        ]
    });
}

//# sourceMappingURL=RadioInput.js.map