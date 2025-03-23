import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { Tappable } from '../../Tappable/Tappable';
import { CheckboxInput } from '../CheckboxInput/CheckboxInput';
const sizeYClassNames = {
    none: "vkuiCheckboxSimple--sizeY-none",
    compact: "vkuiCheckboxSimple--sizeY-compact"
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
        className: classNames(className, "vkuiCheckboxSimple", sizeY !== 'regular' && sizeYClassNames[sizeY]),
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