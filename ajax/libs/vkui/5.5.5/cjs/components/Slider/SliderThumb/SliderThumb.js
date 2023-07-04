"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SliderThumb", {
    enumerable: true,
    get: function() {
        return SliderThumb;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useFocusVisible = require("../../../hooks/useFocusVisible");
var _FocusVisible = require("../../FocusVisible/FocusVisible");
var SliderThumb = function(_param) {
    var className = _param.className, getRootRef = _param.getRootRef, inputProps = _param.inputProps, restProps = _object_without_properties._(_param, [
        "className",
        "getRootRef",
        "inputProps"
    ]);
    var _useFocusVisible1 = (0, _useFocusVisible.useFocusVisible)(false), focusVisible = _useFocusVisible1.focusVisible, onBlur = _useFocusVisible1.onBlur, onFocus = _useFocusVisible1.onFocus;
    return /*#__PURE__*/ _react.createElement("span", _object_spread._({
        ref: getRootRef,
        className: (0, _vkjs.classNames)("vkuiSliderThumb", focusVisible && "vkuiSliderThumb--focused", className)
    }, restProps), /*#__PURE__*/ _react.createElement("input", _object_spread_props._(_object_spread._({}, inputProps), {
        type: "range",
        className: "vkuiSliderThumb__nativeInput",
        "aria-orientation": "horizontal",
        onBlur: onBlur,
        onFocus: onFocus
    })), /*#__PURE__*/ _react.createElement(_FocusVisible.FocusVisible, {
        visible: focusVisible,
        mode: "outside"
    }));
};

//# sourceMappingURL=SliderThumb.js.map