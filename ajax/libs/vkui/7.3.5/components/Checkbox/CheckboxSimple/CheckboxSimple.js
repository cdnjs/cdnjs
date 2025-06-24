'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { Tappable } from "../../Tappable/Tappable.js";
import { CheckboxInput } from "../CheckboxInput/CheckboxInput.js";
const sizeYClassNames = {
    none: "vkuiCheckboxSimple__sizeYNone",
    compact: "vkuiCheckboxSimple__sizeYCompact"
};
export function CheckboxSimple(_param) {
    var { children, className, style, getRootRef, description, hoverMode, activeMode, hasHover, hasActive, focusVisibleMode, titleAfter } = _param, restProps = _object_without_properties(_param, [
        "children",
        "className",
        "style",
        "getRootRef",
        "description",
        "hoverMode",
        "activeMode",
        "hasHover",
        "hasActive",
        "focusVisibleMode",
        "titleAfter"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Tappable, {
        className: classNames(className, "vkuiCheckboxSimple__host", sizeY !== 'regular' && sizeYClassNames[sizeY]),
        style: style,
        disabled: restProps.disabled,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode,
        Component: "label",
        children: /*#__PURE__*/ _jsx(CheckboxInput, _object_spread({}, restProps))
    });
}

//# sourceMappingURL=CheckboxSimple.js.map