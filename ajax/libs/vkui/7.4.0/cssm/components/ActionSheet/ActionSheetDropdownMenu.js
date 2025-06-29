'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { useEffectDev } from "../../hooks/useEffectDev.js";
import { useEventListener } from "../../hooks/useEventListener.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useDOM } from "../../lib/dom.js";
import { isRefObject } from "../../lib/isRefObject.js";
import { stopPropagation } from "../../lib/utils.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { FocusTrap } from "../FocusTrap/FocusTrap.js";
import { Popper } from "../Popper/Popper.js";
import styles from "./ActionSheet.module.css";
const warn = warnOnce('ActionSheet');
function getEl(ref) {
    return ref && 'current' in ref ? ref.current : ref;
}
export const ActionSheetDropdownMenu = ({ children, toggleRef, closing, onClose, className, style, popupOffsetDistance = 0, placement, onAnimationStart, onAnimationEnd, allowClickPropagation = false, onClick, ...restProps })=>{
    const { document } = useDOM();
    const platform = usePlatform();
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    const elementRef = React.useRef(null);
    useEffectDev(()=>{
        const toggleEl = getEl(toggleRef);
        if (!toggleEl) {
            warn(`Свойство "toggleRef" не передано`, 'error');
        }
    }, [
        toggleRef
    ]);
    const bodyClickListener = useEventListener('click', (e)=>{
        const dropdownElement = elementRef?.current;
        if (dropdownElement && !dropdownElement.contains(e.target)) {
            onClose?.();
        }
    });
    React.useEffect(()=>{
        setTimeout(()=>{
            bodyClickListener.add(document.body);
        });
    }, [
        bodyClickListener,
        document
    ]);
    const targetRef = React.useMemo(()=>{
        if (isRefObject(toggleRef)) {
            return toggleRef;
        }
        return {
            current: toggleRef
        };
    }, [
        toggleRef
    ]);
    const handleClick = allowClickPropagation ? onClick : (event)=>{
        stopPropagation(event);
        onClick?.(event);
    };
    return /*#__PURE__*/ _jsx(Popper, {
        targetRef: targetRef,
        offsetByMainAxis: popupOffsetDistance,
        placement: placement,
        className: classNames(styles.host, platform === 'ios' && styles.ios, styles.menu, closing ? styles.closing : styles.opening, sizeY === 'compact' && styles.sizeYCompact, className),
        style: style,
        getRootRef: elementRef,
        usePortal: false,
        onAnimationStart: onAnimationStart,
        onAnimationEnd: onAnimationEnd,
        children: /*#__PURE__*/ _jsx(FocusTrap, {
            onClose: onClose,
            ...restProps,
            onClick: handleClick,
            children: children
        })
    });
};

//# sourceMappingURL=ActionSheetDropdownMenu.js.map