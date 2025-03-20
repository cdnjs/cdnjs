"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Switch", {
    enumerable: true,
    get: function() {
        return Switch;
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
const _useFocusVisible = require("../../hooks/useFocusVisible");
const _useFocusVisibleClassName = require("../../hooks/useFocusVisibleClassName");
const _usePlatform = require("../../hooks/usePlatform");
const _callMultiple = require("../../lib/callMultiple");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const sizeYClassNames = {
    none: "vkuiSwitch--sizeY-none",
    compact: "vkuiSwitch--sizeY-compact"
};
const Switch = (_param)=>{
    var { style, className, getRootRef, getRef, checked: checkedProp, disabled, onBlur: onBlurProp, onFocus: onFocusProp, onClick } = _param, restProps = _object_without_properties._(_param, [
        "style",
        "className",
        "getRootRef",
        "getRef",
        "checked",
        "disabled",
        "onBlur",
        "onFocus",
        "onClick"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const { focusVisible, onBlur, onFocus } = (0, _useFocusVisible.useFocusVisible)();
    const focusVisibleClassNames = (0, _useFocusVisibleClassName.useFocusVisibleClassName)({
        focusVisible,
        mode: 'outside'
    });
    const handleBlur = (0, _callMultiple.callMultiple)(onBlur, onBlurProp);
    const handleFocus = (0, _callMultiple.callMultiple)(onFocus, onFocusProp);
    const [localUncontrolledChecked, setLocalUncontrolledChecked] = _react.useState(Boolean(restProps.defaultChecked));
    const isControlled = checkedProp !== undefined;
    const syncUncontrolledCheckedStateOnClick = _react.useCallback((e)=>{
        if (isControlled) {
            return;
        }
        const switchTarget = e.target;
        setLocalUncontrolledChecked(switchTarget.checked);
    }, [
        isControlled
    ]);
    const inputProps = _object_spread_props._(_object_spread._({}, restProps), {
        Component: 'input',
        getRootRef: getRef,
        type: 'checkbox',
        role: 'switch',
        disabled: disabled,
        onBlur: onBlurProp,
        onFocus: onFocusProp,
        onClick: (0, _callMultiple.callMultiple)(syncUncontrolledCheckedStateOnClick, onClick)
    });
    if (isControlled) {
        inputProps.checked = checkedProp;
        inputProps['aria-checked'] = checkedProp ? 'true' : 'false';
    } else {
        inputProps['aria-checked'] = localUncontrolledChecked ? 'true' : 'false';
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("label", {
        className: (0, _vkjs.classNames)("vkuiSwitch", sizeY !== 'regular' && sizeYClassNames[sizeY], platform === 'ios' ? "vkuiSwitch--ios" : "vkuiSwitch--default", disabled && "vkuiSwitch--disabled", focusVisibleClassNames, className),
        style: style,
        ref: getRootRef,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({}, inputProps), {
                className: "vkuiSwitch__inputNative",
                onBlur: handleBlur,
                onFocus: handleFocus
            })),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("span", {
                "aria-hidden": true,
                className: "vkuiSwitch__inputFake",
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                        className: "vkuiSwitch__track"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                        "aria-hidden": true,
                        className: (0, _vkjs.classNames)("vkuiSwitch__handle", platform !== 'ios' && !disabled && "vkuiSwitch__handle--withRipple")
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=Switch.js.map