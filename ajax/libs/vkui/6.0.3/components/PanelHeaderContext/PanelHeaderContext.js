import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { usePlatform } from '../../hooks/usePlatform';
import { useTimeout } from '../../hooks/useTimeout';
import { useDOM } from '../../lib/dom';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { FixedLayout } from '../FixedLayout/FixedLayout';
const sizeXClassNames = {
    none: "vkuiPanelHeaderContext--sizeX-none",
    ['compact']: "vkuiPanelHeaderContext--sizeX-compact",
    ['regular']: "vkuiPanelHeaderContext--sizeX-regular"
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderContext
 */ export const PanelHeaderContext = (_param)=>{
    var { children, onClose, opened = false, className } = _param, restProps = _object_without_properties(_param, [
        "children",
        "onClose",
        "opened",
        "className"
    ]);
    const { document } = useDOM();
    const platform = usePlatform();
    const [visible, setVisible] = React.useState(opened);
    const closing = visible && !opened;
    const { sizeX = 'none' } = useAdaptivity();
    const elementRef = React.useRef(null);
    useIsomorphicLayoutEffect(()=>{
        opened && setVisible(true);
    }, [
        opened
    ]);
    useScrollLock(platform !== 'vkcom' && opened);
    // start closing on outer click
    useGlobalEventListener(document, 'click', opened && !closing && ((event)=>{
        if (elementRef.current && !elementRef.current.contains(event.target)) {
            event.stopPropagation();
            onClose();
        }
    }), {
        capture: true
    });
    // fallback onAnimationEnd when animationend not supported
    const onAnimationEnd = ()=>setVisible(false);
    const animationFallback = useTimeout(onAnimationEnd, 200);
    React.useEffect(()=>closing ? animationFallback.set() : animationFallback.clear(), [
        animationFallback,
        closing
    ]);
    return /*#__PURE__*/ React.createElement(FixedLayout, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiPanelHeaderContext", platform === 'ios' && "vkuiPanelHeaderContext--ios", opened && "vkuiPanelHeaderContext--opened", closing && "vkuiPanelHeaderContext--closing", sizeXClassNames[sizeX], className),
        vertical: "top"
    }), visible && /*#__PURE__*/ React.createElement("div", {
        onClick: (event)=>{
            event.stopPropagation();
            onClose();
        },
        className: "vkuiPanelHeaderContext__fade"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanelHeaderContext__in",
        ref: elementRef,
        onAnimationEnd: closing ? onAnimationEnd : undefined
    }, visible && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanelHeaderContext__content"
    }, children)));
};

//# sourceMappingURL=PanelHeaderContext.js.map