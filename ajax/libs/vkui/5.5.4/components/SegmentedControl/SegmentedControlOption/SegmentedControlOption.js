import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity";
import { useFocusVisible } from "../../../hooks/useFocusVisible";
import { SizeType } from "../../../lib/adaptivity";
import { callMultiple } from "../../../lib/callMultiple";
import { FocusVisible } from "../../FocusVisible/FocusVisible";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden";
var sizeYClassNames = _define_property({
    none: "vkuiSegmentedControlOption__content--sizeY-none"
}, SizeType.COMPACT, "vkuiSegmentedControlOption__content--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export var SegmentedControlOption = function(_param) {
    var getRef = _param.getRef, className = _param.className, style = _param.style, children = _param.children, restProps = _object_without_properties(_param, [
        "getRef",
        "className",
        "style",
        "children"
    ]);
    var _useFocusVisible = useFocusVisible(), focusVisible = _useFocusVisible.focusVisible, onBlur = _useFocusVisible.onBlur, onFocus = _useFocusVisible.onFocus;
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ React.createElement("label", {
        className: classNames("vkuiSegmentedControlOption", restProps.checked && "vkuiSegmentedControlOption--checked", className),
        style: style
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, _object_spread_props(_object_spread({}, restProps), {
        Component: "input",
        getRootRef: getRef,
        type: "radio",
        onBlur: callMultiple(onBlur, restProps.onBlur),
        onFocus: callMultiple(onFocus, restProps.onFocus)
    })), /*#__PURE__*/ React.createElement("span", {
        className: classNames("vkuiSegmentedControlOption__content", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY])
    }, children), /*#__PURE__*/ React.createElement(FocusVisible, {
        visible: focusVisible,
        mode: "inside"
    }));
};

//# sourceMappingURL=SegmentedControlOption.js.map