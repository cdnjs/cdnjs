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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useFocusVisible = require("../../../hooks/useFocusVisible");
var _callMultiple = require("../../../lib/callMultiple");
var _FocusVisible = require("../../FocusVisible/FocusVisible");
var _Headline = require("../../Typography/Headline/Headline");
var _VisuallyHidden = require("../../VisuallyHidden/VisuallyHidden");
var SegmentedControlOption = function(_param) {
    var getRef = _param.getRef, className = _param.className, style = _param.style, children = _param.children, getRootRef = _param.getRootRef, restProps = _object_without_properties._(_param, [
        "getRef",
        "className",
        "style",
        "children",
        "getRootRef"
    ]);
    var _useFocusVisible1 = (0, _useFocusVisible.useFocusVisible)(), focusVisible = _useFocusVisible1.focusVisible, onBlur = _useFocusVisible1.onBlur, onFocus = _useFocusVisible1.onFocus;
    return /*#__PURE__*/ _react.createElement("label", {
        className: (0, _vkjs.classNames)("vkuiSegmentedControlOption", restProps.checked && "vkuiSegmentedControlOption--checked", className),
        ref: getRootRef,
        style: style
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "input",
        getRootRef: getRef,
        type: "radio",
        onBlur: (0, _callMultiple.callMultiple)(onBlur, restProps.onBlur),
        onFocus: (0, _callMultiple.callMultiple)(onFocus, restProps.onFocus)
    })), /*#__PURE__*/ _react.createElement(_Headline.Headline, {
        className: "vkuiSegmentedControlOption__content",
        level: "2",
        weight: "2"
    }, children), /*#__PURE__*/ _react.createElement(_FocusVisible.FocusVisible, {
        visible: focusVisible,
        mode: "inside"
    }));
};

//# sourceMappingURL=SegmentedControlOption.js.map