'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { Tappable } from "../../Tappable/Tappable.js";
import { CheckboxInput } from "../CheckboxInput/CheckboxInput.js";
import styles from "./CheckboxSimple.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
export function CheckboxSimple({ children, className, style, getRootRef, description, hoverMode: hoverModeProp, activeMode: activeModeProp, hasHover, hasActive, focusVisibleMode, titleAfter, noPadding, ...restProps }) {
    const { sizeY = 'none' } = useAdaptivity();
    const hoverMode = hoverModeProp || (noPadding ? 'opacity' : 'background');
    const activeMode = activeModeProp || (noPadding ? 'opacity' : 'background');
    return /*#__PURE__*/ _jsx(Tappable, {
        className: classNames(className, styles.host, !noPadding && styles.withPadding, sizeY !== 'regular' && sizeYClassNames[sizeY]),
        style: style,
        disabled: restProps.disabled,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode,
        Component: "label",
        children: /*#__PURE__*/ _jsx(CheckboxInput, {
            ...restProps
        })
    });
}

//# sourceMappingURL=CheckboxSimple.js.map