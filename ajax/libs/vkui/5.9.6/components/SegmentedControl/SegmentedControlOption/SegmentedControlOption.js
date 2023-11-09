import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useFocusVisible } from "../../../hooks/useFocusVisible";
import { callMultiple } from "../../../lib/callMultiple";
import { FocusVisible } from "../../FocusVisible/FocusVisible";
import { Headline } from "../../Typography/Headline/Headline";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden";
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export var SegmentedControlOption = function(_param) {
    var getRef = _param.getRef, className = _param.className, style = _param.style, children = _param.children, getRootRef = _param.getRootRef, restProps = _object_without_properties(_param, [
        "getRef",
        "className",
        "style",
        "children",
        "getRootRef"
    ]);
    var _useFocusVisible = useFocusVisible(), focusVisible = _useFocusVisible.focusVisible, onBlur = _useFocusVisible.onBlur, onFocus = _useFocusVisible.onFocus;
    return /*#__PURE__*/ React.createElement("label", {
        className: classNames("vkuiSegmentedControlOption", restProps.checked && "vkuiSegmentedControlOption--checked", className),
        ref: getRootRef,
        style: style
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, _object_spread_props(_object_spread({}, restProps), {
        Component: "input",
        getRootRef: getRef,
        type: "radio",
        onBlur: callMultiple(onBlur, restProps.onBlur),
        onFocus: callMultiple(onFocus, restProps.onFocus)
    })), /*#__PURE__*/ React.createElement(Headline, {
        className: "vkuiSegmentedControlOption__content",
        level: "2",
        weight: "2"
    }, children), /*#__PURE__*/ React.createElement(FocusVisible, {
        visible: focusVisible,
        mode: "inside"
    }));
};

//# sourceMappingURL=SegmentedControlOption.js.map