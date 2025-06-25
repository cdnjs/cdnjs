'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
const warn = warnOnce('ActionSheet');
function getEl(ref) {
    return ref && 'current' in ref ? ref.current : ref;
}
export const ActionSheetDropdownMenu = (_param)=>{
    var { children, toggleRef, closing, onClose, className, style, popupOffsetDistance = 0, placement, onAnimationStart, onAnimationEnd, allowClickPropagation = false, onClick } = _param, restProps = _object_without_properties(_param, [
        "children",
        "toggleRef",
        "closing",
        "onClose",
        "className",
        "style",
        "popupOffsetDistance",
        "placement",
        "onAnimationStart",
        "onAnimationEnd",
        "allowClickPropagation",
        "onClick"
    ]);
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
        const dropdownElement = elementRef === null || elementRef === void 0 ? void 0 : elementRef.current;
        if (dropdownElement && !dropdownElement.contains(e.target)) {
            onClose === null || onClose === void 0 ? void 0 : onClose();
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
        onClick === null || onClick === void 0 ? void 0 : onClick(event);
    };
    return /*#__PURE__*/ _jsx(Popper, {
        targetRef: targetRef,
        offsetByMainAxis: popupOffsetDistance,
        placement: placement,
        className: classNames("vkuiActionSheet__host", platform === 'ios' && "vkuiActionSheet__ios", "vkuiActionSheet__menu", closing ? "vkuiActionSheet__closing" : "vkuiActionSheet__opening", sizeY === 'compact' && "vkuiActionSheet__sizeYCompact", className),
        style: style,
        getRootRef: elementRef,
        usePortal: false,
        onAnimationStart: onAnimationStart,
        onAnimationEnd: onAnimationEnd,
        children: /*#__PURE__*/ _jsx(FocusTrap, _object_spread_props(_object_spread({
            onClose: onClose
        }, restProps), {
            onClick: handleClick,
            children: children
        }))
    });
};

//# sourceMappingURL=ActionSheetDropdownMenu.js.map