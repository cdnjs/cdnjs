"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FormField", {
    enumerable: true,
    get: function() {
        return FormField;
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
const _useExternRef = require("../../hooks/useExternRef");
const _useFocusVisibleClassName = require("../../hooks/useFocusVisibleClassName");
const _useFocusWithin = require("../../hooks/useFocusWithin");
const sizeYClassNames = {
    none: "vkuiFormField--sizeY-none",
    compact: "vkuiFormField--sizeY-compact"
};
const stylesStatus = {
    error: "vkuiFormField--status-error",
    valid: "vkuiFormField--status-valid"
};
const iconAlignClassNames = {
    center: undefined,
    start: "vkuiFormField__icon--align-start",
    end: "vkuiFormField__icon--align-end"
};
const renderIcon = (icon, align, className)=>{
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
        className: "vkuiFormField__iconWrapper",
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
            className: (0, _vkjs.classNames)(iconAlignClassNames[align], className),
            children: icon
        })
    });
};
const FormField = (_param)=>{
    var { Component = 'span', status = 'default', children, getRootRef, before, after, beforeAlign = 'center', afterAlign = 'center', disabled, mode = 'default', className, maxHeight, style } = _param, restProps = _object_without_properties._(_param, [
        "Component",
        "status",
        "children",
        "getRootRef",
        "before",
        "after",
        "beforeAlign",
        "afterAlign",
        "disabled",
        "mode",
        "className",
        "maxHeight",
        "style"
    ]);
    const elRef = (0, _useExternRef.useExternRef)(getRootRef);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const [hover, setHover] = _react.useState(false);
    const focusWithin = (0, _useFocusWithin.useFocusWithin)(elRef);
    const focusVisibleClassNames = (0, _useFocusVisibleClassName.useFocusVisibleClassName)({
        focusVisible: focusWithin,
        mode: "vkuiFormField--focus-visible"
    });
    const handleMouseEnter = (e)=>{
        e.stopPropagation();
        setHover(true);
    };
    const handleMouseLeave = (e)=>{
        e.stopPropagation();
        setHover(false);
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(Component, _object_spread_props._(_object_spread._({}, restProps), {
        ref: elRef,
        style: maxHeight !== undefined ? _object_spread_props._(_object_spread._({}, style), {
            maxHeight
        }) : style,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        className: (0, _vkjs.classNames)("vkuiFormField", mode === 'default' && "vkuiFormField--mode-default", status !== 'default' && stylesStatus[status], sizeY !== 'regular' && sizeYClassNames[sizeY], disabled && "vkuiFormField--disabled", !disabled && hover && "vkuiFormField--hover", focusVisibleClassNames, className),
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: "vkuiFormField_scrollContainer",
                children: [
                    before && renderIcon(before, beforeAlign, "vkuiFormField__before"),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiFormField__content",
                        children: children
                    }),
                    after && renderIcon(after, afterAlign, (0, _vkjs.classNames)("vkuiFormField__after", 'vkuiInternalFormField__after'))
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                "aria-hidden": true,
                className: "vkuiFormField__border"
            })
        ]
    }));
};

//# sourceMappingURL=FormField.js.map