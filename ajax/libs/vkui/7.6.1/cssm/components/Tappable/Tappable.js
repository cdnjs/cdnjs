'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { SizeType } from "../../lib/adaptivity/index.js";
import { mergeCalls } from "../../lib/mergeCalls.js";
import { checkClickable, Clickable } from "../Clickable/Clickable.js";
import { Ripple, useMaybeNeedRipple, useRipple } from "./Ripple.js";
import { activeClass, DEFAULT_STATE_MODE, hoverClass } from "./state.js";
import styles from "./Tappable.module.css";
const sizeXClassNames = {
    none: styles.sizeXNone,
    compact: styles.sizeXCompact
};
function hasPointerClassName(hasPointer) {
    switch(hasPointer){
        case undefined:
            return styles.hasPointerNone;
        case false:
            return styles.hasPointerFalse;
    }
    return undefined;
}
export const Tappable = ({ baseClassName, borderRadiusMode = 'auto', children, hoverMode = DEFAULT_STATE_MODE, activeMode = DEFAULT_STATE_MODE, onPointerDown, onPointerCancel, ...restProps })=>{
    const isClickable = checkClickable(restProps);
    const { sizeX = 'none', hasPointer } = useAdaptivity();
    const needRipple = useMaybeNeedRipple(activeMode, hasPointer);
    const { clicks, ...rippleEvents } = useRipple(needRipple, hasPointer);
    const handlers = mergeCalls(rippleEvents, {
        onPointerDown,
        onPointerCancel
    });
    const typeProps = restProps.Component === 'button' ? {
        type: 'button'
    } : {};
    return /*#__PURE__*/ _jsxs(Clickable, {
        baseClassName: classNames('vkuiInternalTappable', baseClassName, styles.host, sizeX !== SizeType.REGULAR && sizeXClassNames[sizeX], borderRadiusMode === 'inherit' && styles.borderRadiusInherit, hasPointerClassName(hasPointer)),
        hoverClassName: hoverClass(hoverMode),
        activeClassName: activeClass(activeMode),
        ...typeProps,
        ...handlers,
        ...restProps,
        children: [
            children,
            isClickable && (hoverMode === 'background' || activeMode === 'background') && /*#__PURE__*/ _jsx(Ripple, {
                needRipple: needRipple,
                clicks: clicks
            })
        ]
    });
};

//# sourceMappingURL=Tappable.js.map