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
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _SelectionControl = require("../SelectionControl/SelectionControl");
const _SelectionControlLabel = require("../SelectionControl/SelectionControlLabel/SelectionControlLabel");
const _RadioInput = require("./RadioInput/RadioInput");
const Radio = (_param)=>{
    var { children, description, style, className, getRootRef, titleAfter, getRef, labelProps, hoverMode, activeMode, hasHover, hasActive, focusVisibleMode } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "description",
        "style",
        "className",
        "getRootRef",
        "titleAfter",
        "getRef",
        "labelProps",
        "hoverMode",
        "activeMode",
        "hasHover",
        "hasActive",
        "focusVisibleMode"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_SelectionControl.SelectionControl, _object_spread_props._(_object_spread._({
        style: style,
        className: (0, _vkjs.classNames)("vkuiRadio", className),
        disabled: restProps.disabled,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode
    }, labelProps), {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_RadioInput.RadioInput, _object_spread_props._(_object_spread._({}, restProps), {
                getRef: getRef
            })),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_SelectionControlLabel.SelectionControlLabel, {
                titleAfter: titleAfter,
                description: description,
                children: children
            })
        ]
    }));
};
Radio.Input = _RadioInput.RadioInput;

//# sourceMappingURL=Radio.js.map