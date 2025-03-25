"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Checkbox", {
    enumerable: true,
    get: function() {
        return Checkbox;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _SelectionControl = require("../SelectionControl/SelectionControl");
const _SelectionControlLabel = require("../SelectionControl/SelectionControlLabel/SelectionControlLabel");
const _CheckboxInput = require("./CheckboxInput/CheckboxInput");
const _CheckboxSimple = require("./CheckboxSimple/CheckboxSimple");
const CheckboxComponent = (_param)=>{
    var { children, className, style, getRootRef, description, hoverMode, activeMode, hasHover, hasActive, focusVisibleMode, titleAfter } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "className",
        "style",
        "getRootRef",
        "description",
        "hoverMode",
        "activeMode",
        "hasHover",
        "hasActive",
        "focusVisibleMode",
        "titleAfter"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_SelectionControl.SelectionControl, {
        className: className,
        style: style,
        disabled: restProps.disabled,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_CheckboxInput.CheckboxInput, _object_spread._({}, restProps)),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_SelectionControlLabel.SelectionControlLabel, {
                titleAfter: titleAfter,
                description: description,
                children: children
            })
        ]
    });
};
const Checkbox = (props)=>{
    const simple = !((0, _vkjs.hasReactNode)(props.children) || (0, _vkjs.hasReactNode)(props.description));
    if (simple) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_CheckboxSimple.CheckboxSimple, _object_spread._({}, props));
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(CheckboxComponent, _object_spread._({}, props));
};
Checkbox.Input = _CheckboxInput.CheckboxInput;

//# sourceMappingURL=Checkbox.js.map