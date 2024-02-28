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
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useFocusVisible = require("../../hooks/useFocusVisible");
var _useFocusVisibleClassName = require("../../hooks/useFocusVisibleClassName");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _callMultiple = require("../../lib/callMultiple");
var _platform = require("../../lib/platform");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
var sizeYClassNames = _define_property._({
    none: "vkuiSwitch--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSwitch--sizeY-compact");
var Switch = function(_param) {
    var style = _param.style, className = _param.className, getRootRef = _param.getRootRef, getRef = _param.getRef, checkedProp = _param.checked, restProps = _object_without_properties._(_param, [
        "style",
        "className",
        "getRootRef",
        "getRef",
        "checked"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var _useFocusVisible1 = (0, _useFocusVisible.useFocusVisible)(), focusVisible = _useFocusVisible1.focusVisible, onBlur = _useFocusVisible1.onBlur, onFocus = _useFocusVisible1.onFocus;
    var focusVisibleClassNames = (0, _useFocusVisibleClassName.useFocusVisibleClassName)({
        focusVisible: focusVisible,
        mode: "outside"
    });
    var _React_useState = _sliced_to_array._(_react.useState(Boolean(restProps.defaultChecked)), 2), localUncontrolledChecked = _React_useState[0], setLocalUncontrolledChecked = _React_useState[1];
    var isControlled = checkedProp !== undefined;
    var syncUncontrolledCheckedStateOnClick = _react.useCallback(function(e) {
        if (isControlled) {
            return;
        }
        var switchTarget = e.target;
        setLocalUncontrolledChecked(switchTarget.checked);
    }, [
        isControlled
    ]);
    var ariaCheckedState = isControlled ? checkedProp : localUncontrolledChecked;
    return /*#__PURE__*/ _react.createElement("label", {
        className: (0, _vkjs.classNames)("vkuiSwitch", platform === _platform.Platform.IOS && "vkuiSwitch--ios", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], restProps.disabled && "vkuiSwitch--disabled", focusVisibleClassNames, className),
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
        "aria-checked": ariaCheckedState ? "true" : "false",
        className: "vkuiSwitch__self"
    })), /*#__PURE__*/ _react.createElement("span", {
        "aria-hidden": true,
        className: "vkuiSwitch__pseudo"
    }));
};

//# sourceMappingURL=Switch.js.map