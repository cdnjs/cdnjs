"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Chip", {
    enumerable: true,
    get: function() {
        return Chip;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../../hooks/useAdaptivity");
const _useFocusVisible = require("../../../hooks/useFocusVisible");
const _useFocusVisibleClassName = require("../../../hooks/useFocusVisibleClassName");
const _RootComponent = require("../../RootComponent/RootComponent");
const _Footnote = require("../../Typography/Footnote/Footnote");
const _VisuallyHidden = require("../../VisuallyHidden/VisuallyHidden");
const sizeYClassNames = {
    none: "vkuiChip--sizeY-none",
    compact: "vkuiChip--sizeY-compact"
};
const Chip = (_param)=>{
    var { Component = 'span', value = '', removable = true, onRemove, removeLabel = 'Удалить', before, after, disabled, readOnly, children, className, onFocus: onFocusProp, onBlur: onBlurProp } = _param, restProps = _object_without_properties._(_param, [
        "Component",
        "value",
        "removable",
        "onRemove",
        "removeLabel",
        "before",
        "after",
        "disabled",
        "readOnly",
        "children",
        "className",
        "onFocus",
        "onBlur"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const { focusVisible, onFocus, onBlur } = (0, _useFocusVisible.useFocusVisible)();
    const focusVisibleClassName = (0, _useFocusVisibleClassName.useFocusVisibleClassName)({
        focusVisible
    });
    const handleFocus = (event)=>{
        if (onFocusProp) {
            onFocusProp(event);
        }
        onFocus(event);
    };
    const handleBlur = (event)=>{
        if (onBlurProp) {
            onBlurProp(event);
        }
        onBlur(event);
    };
    const onRemoveWrapper = _react.useCallback((event)=>{
        onRemove === null || onRemove === void 0 ? void 0 : onRemove(event, value);
    }, [
        onRemove,
        value
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        Component: Component,
        className: (0, _vkjs.classNames)("vkuiChip", sizeY !== 'regular' && sizeYClassNames[sizeY], focusVisibleClassName, className),
        "aria-readonly": readOnly,
        "aria-disabled": disabled,
        onFocus: disabled ? undefined : handleFocus,
        onBlur: disabled ? undefined : handleBlur,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: "vkuiChip__in",
                children: [
                    (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiChip__before",
                        children: before
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, {
                        className: "vkuiChip__content",
                        children: children
                    }),
                    (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiChip__after",
                        children: after
                    })
                ]
            }),
            !readOnly && removable && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: "vkuiChip__removable",
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)("button", {
                    tabIndex: -1,
                    disabled: disabled,
                    className: "vkuiChip__remove",
                    onClick: disabled ? undefined : onRemoveWrapper,
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsxs)(_VisuallyHidden.VisuallyHidden, {
                            children: [
                                "  ",
                                removeLabel,
                                " ",
                                children
                            ]
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon16Cancel, {})
                    ]
                })
            })
        ]
    }));
};

//# sourceMappingURL=Chip.js.map