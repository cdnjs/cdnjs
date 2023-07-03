import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useFocusVisible } from "../../../hooks/useFocusVisible";
import { FocusVisible } from "../../FocusVisible/FocusVisible";
export var SliderThumb = function(_param) {
    var className = _param.className, getRootRef = _param.getRootRef, inputProps = _param.inputProps, restProps = _object_without_properties(_param, [
        "className",
        "getRootRef",
        "inputProps"
    ]);
    var _useFocusVisible = useFocusVisible(false), focusVisible = _useFocusVisible.focusVisible, onBlur = _useFocusVisible.onBlur, onFocus = _useFocusVisible.onFocus;
    return /*#__PURE__*/ React.createElement("span", _object_spread({
        ref: getRootRef,
        className: classNames("vkuiSliderThumb", focusVisible && "vkuiSliderThumb--focused", className)
    }, restProps), /*#__PURE__*/ React.createElement("input", _object_spread_props(_object_spread({}, inputProps), {
        type: "range",
        className: "vkuiSliderThumb__nativeInput",
        "aria-orientation": "horizontal",
        onBlur: onBlur,
        onFocus: onFocus
    })), /*#__PURE__*/ React.createElement(FocusVisible, {
        visible: focusVisible,
        mode: "outside"
    }));
};

//# sourceMappingURL=SliderThumb.js.map