"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Input", {
    enumerable: true,
    get: function() {
        return Input;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _FormField = require("../FormField/FormField");
const _UnstyledTextField = require("../UnstyledTextField/UnstyledTextField");
const sizeYClassNames = {
    none: "vkuiInput--sizeY-none",
    compact: "vkuiInput--sizeY-compact"
};
const Input = (_param)=>{
    var { type = 'text', align = 'left', getRef, className, getRootRef, style, before, after, status, mode } = _param, restProps = _object_without_properties._(_param, [
        "type",
        "align",
        "getRef",
        "className",
        "getRootRef",
        "style",
        "before",
        "after",
        "status",
        "mode"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_FormField.FormField, {
        style: style,
        className: (0, _vkjs.classNames)("vkuiInput", align === 'right' && "vkuiInput--align-right", align === 'center' && "vkuiInput--align-center", sizeY !== 'regular' && sizeYClassNames[sizeY], before && "vkuiInput--hasBefore", after && "vkuiInput--hasAfter", className),
        getRootRef: getRootRef,
        before: before,
        after: after,
        disabled: restProps.disabled,
        mode: mode,
        status: status,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_UnstyledTextField.UnstyledTextField, _object_spread_props._(_object_spread._({}, restProps), {
            as: "input",
            type: type,
            className: "vkuiInput__el",
            getRootRef: getRef
        }))
    });
};

//# sourceMappingURL=Input.js.map