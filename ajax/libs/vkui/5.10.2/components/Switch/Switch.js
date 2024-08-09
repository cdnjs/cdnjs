import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useFocusVisible } from "../../hooks/useFocusVisible";
import { useFocusVisibleClassName } from "../../hooks/useFocusVisibleClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { callMultiple } from "../../lib/callMultiple";
import { Platform } from "../../lib/platform";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden";
var sizeYClassNames = _define_property({
    none: "vkuiSwitch--sizeY-none"
}, SizeType.COMPACT, "vkuiSwitch--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/Switch
 */ export var Switch = function(_param) {
    var style = _param.style, className = _param.className, getRootRef = _param.getRootRef, getRef = _param.getRef, checkedProp = _param.checked, restProps = _object_without_properties(_param, [
        "style",
        "className",
        "getRootRef",
        "getRef",
        "checked"
    ]);
    var platform = usePlatform();
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var _useFocusVisible = useFocusVisible(), focusVisible = _useFocusVisible.focusVisible, onBlur = _useFocusVisible.onBlur, onFocus = _useFocusVisible.onFocus;
    var focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible: focusVisible,
        mode: "outside"
    });
    var _React_useState = _sliced_to_array(React.useState(Boolean(restProps.defaultChecked)), 2), localUncontrolledChecked = _React_useState[0], setLocalUncontrolledChecked = _React_useState[1];
    var isControlled = checkedProp !== undefined;
    var syncUncontrolledCheckedStateOnClick = React.useCallback(function(e) {
        if (isControlled) {
            return;
        }
        var switchTarget = e.target;
        setLocalUncontrolledChecked(switchTarget.checked);
    }, [
        isControlled
    ]);
    var ariaCheckedState = isControlled ? checkedProp : localUncontrolledChecked;
    return /*#__PURE__*/ React.createElement("label", {
        className: classNames("vkuiSwitch", platform === Platform.IOS && "vkuiSwitch--ios", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], restProps.disabled && "vkuiSwitch--disabled", focusVisibleClassNames, className),
        style: style,
        ref: getRootRef,
        onBlur: callMultiple(onBlur, restProps.onBlur),
        onFocus: callMultiple(onFocus, restProps.onFocus)
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, _object_spread_props(_object_spread({}, restProps, isControlled && {
        checked: checkedProp
    }), {
        Component: "input",
        getRootRef: getRef,
        onClick: callMultiple(syncUncontrolledCheckedStateOnClick, restProps.onClick),
        type: "checkbox",
        role: "switch",
        "aria-checked": ariaCheckedState ? "true" : "false",
        className: "vkuiSwitch__self"
    })), /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: "vkuiSwitch__pseudo"
    }));
};

//# sourceMappingURL=Switch.js.map