import _define_property from "@swc/helpers/src/_define_property.mjs";
import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity";
import { useFocusVisible } from "../../../hooks/useFocusVisible";
import { SizeType } from "../../../lib/adaptivity";
import { callMultiple } from "../../../lib/callMultiple";
import { FocusVisible } from "../../FocusVisible/FocusVisible";
import { VisuallyHiddenInput } from "../../VisuallyHiddenInput/VisuallyHiddenInput";
var sizeYClassNames = _define_property({
    none: "vkuiSegmentedControlOption__content--sizeY-none"
}, SizeType.COMPACT, "vkuiSegmentedControlOption__content--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export var SegmentedControlOption = function(_param) {
    var className = _param.className, style = _param.style, children = _param.children, restProps = _object_without_properties(_param, [
        "className",
        "style",
        "children"
    ]);
    var _useFocusVisible = useFocusVisible(), onBlur = _useFocusVisible.onBlur, onFocus = _useFocusVisible.onFocus;
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ React.createElement("label", {
        className: classNames("vkuiSegmentedControlOption", restProps.checked && "vkuiSegmentedControlOption--checked", className),
        style: style
    }, /*#__PURE__*/ React.createElement(VisuallyHiddenInput, _object_spread_props(_object_spread({}, restProps), {
        type: "radio",
        onBlur: callMultiple(onBlur, restProps.onBlur),
        onFocus: callMultiple(onFocus, restProps.onFocus)
    })), /*#__PURE__*/ React.createElement("span", {
        className: classNames("vkuiSegmentedControlOption__content", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY])
    }, children), /*#__PURE__*/ React.createElement(FocusVisible, {
        mode: "inside"
    }));
};

//# sourceMappingURL=SegmentedControlOption.js.map