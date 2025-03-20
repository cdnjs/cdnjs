"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SegmentedControlOption", {
    enumerable: true,
    get: function() {
        return SegmentedControlOption;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Clickable = require("../../Clickable/Clickable");
const _Headline = require("../../Typography/Headline/Headline");
const _VisuallyHidden = require("../../VisuallyHidden/VisuallyHidden");
const SegmentedControlOption = (_param)=>{
    var { getRef, className, style, children, getRootRef, before } = _param, restProps = _object_without_properties._(_param, [
        "getRef",
        "className",
        "style",
        "children",
        "getRootRef",
        "before"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Clickable.Clickable, {
        Component: "label",
        baseClassName: "vkuiSegmentedControlOption",
        hoverClassName: "vkuiSegmentedControlOption--hover",
        activeClassName: "vkuiSegmentedControlOption--hover",
        className: className,
        getRootRef: getRootRef,
        style: style,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({}, restProps), {
                Component: "input",
                getRootRef: getRef,
                type: "radio"
            })),
            (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: "vkuiSegmentedControlOption__before",
                children: before
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Headline.Headline, {
                level: "2",
                weight: "2",
                children: children
            })
        ]
    });
};

//# sourceMappingURL=SegmentedControlOption.js.map