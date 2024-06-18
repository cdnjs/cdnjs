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
    ['compact']: "vkuiSwitch--sizeY-compact"
};
const Switch = (_param)=>{
    var { style, className, getRootRef, getRef, checked: checkedProp } = _param, restProps = _object_without_properties._(_param, [
        "style",
        "className",
        "getRootRef",
        "getRef",
        "checked"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const { focusVisible, onBlur, onFocus } = (0, _useFocusVisible.useFocusVisible)();
    const focusVisibleClassNames = (0, _useFocusVisibleClassName.useFocusVisibleClassName)({
        focusVisible,
        mode: 'outside'
    });
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
    const ariaCheckedState = isControlled ? checkedProp : localUncontrolledChecked;
    return /*#__PURE__*/ _react.createElement("label", {
        className: (0, _vkjs.classNames)("vkuiSwitch", platform === 'ios' && "vkuiSwitch--ios", sizeY !== 'regular' && sizeYClassNames[sizeY], restProps.disabled && "vkuiSwitch--disabled", focusVisibleClassNames, className),
        style: style,
        ref: getRootRef,
        onBlur: (0, _callMultiple.callMultiple)(onBlur, restProps.onBlur),
        onFocus: (0, _callMultiple.callMultiple)(onFocus, restProps.onFocus)
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({}, restProps, isControlled && {
        checked: checkedProp
    }), {
        Component: "input",
        getRootRef: getRef,
        onClick: (0, _callMultiple.callMultiple)(syncUncontrolledCheckedStateOnClick, restProps.onClick),
        type: "checkbox",
        role: "switch",
        "aria-checked": ariaCheckedState ? 'true' : 'false',
        className: "vkuiSwitch__self"
    })), /*#__PURE__*/ _react.createElement("span", {
        "aria-hidden": true,
        className: "vkuiSwitch__pseudo"
    }));
};

//# sourceMappingURL=Switch.js.map