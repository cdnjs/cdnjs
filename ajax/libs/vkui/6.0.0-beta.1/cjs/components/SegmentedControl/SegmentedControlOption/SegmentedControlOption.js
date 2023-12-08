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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useFocusVisible = require("../../../hooks/useFocusVisible");
const _useFocusVisibleClassName = require("../../../hooks/useFocusVisibleClassName");
const _callMultiple = require("../../../lib/callMultiple");
const _Headline = require("../../Typography/Headline/Headline");
const _VisuallyHidden = require("../../VisuallyHidden/VisuallyHidden");
const SegmentedControlOption = (_param)=>{
    var { getRef, className, style, children, getRootRef, before } = _param, restProps = _object_without_properties._(_param, [
        "getRef",
        "className",
        "style",
        "children",
        "getRootRef",
        "before"
    ]);
    const { focusVisible, onBlur, onFocus } = (0, _useFocusVisible.useFocusVisible)();
    const focusVisibleClassNames = (0, _useFocusVisibleClassName.useFocusVisibleClassName)({
        focusVisible
    });
    return /*#__PURE__*/ _react.createElement("label", {
        className: (0, _vkjs.classNames)("vkuiSegmentedControlOption", restProps.checked && "vkuiSegmentedControlOption--checked", focusVisibleClassNames, className),
        ref: getRootRef,
        style: style
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "input",
        getRootRef: getRef,
        type: "radio",
        onBlur: (0, _callMultiple.callMultiple)(onBlur, restProps.onBlur),
        onFocus: (0, _callMultiple.callMultiple)(onFocus, restProps.onFocus)
    })), (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSegmentedControlOption__before"
    }, before), /*#__PURE__*/ _react.createElement(_Headline.Headline, {
        level: "2",
        weight: "2"
    }, children));
};

//# sourceMappingURL=SegmentedControlOption.js.map