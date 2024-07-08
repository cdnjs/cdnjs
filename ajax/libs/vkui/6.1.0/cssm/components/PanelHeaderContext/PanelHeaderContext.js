import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import styles from './PanelHeaderContext.module.css';
const sizeXClassNames = {
    none: styles['PanelHeaderContext--sizeX-none'],
    ['compact']: styles['PanelHeaderContext--sizeX-compact'],
    ['regular']: styles['PanelHeaderContext--sizeX-regular']
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderContext
 */ export const PanelHeaderContext = ({ children, onClose, opened = false, className, ...restProps })=>{
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
    return /*#__PURE__*/ _jsxs(FixedLayout, {
        ...restProps,
        className: classNames(styles['PanelHeaderContext'], platform === 'ios' && styles['PanelHeaderContext--ios'], opened && styles['PanelHeaderContext--opened'], closing && styles['PanelHeaderContext--closing'], sizeXClassNames[sizeX], className),
        vertical: "top",
        children: [
            visible && /*#__PURE__*/ _jsx("div", {
                onClick: (event)=>{
                    event.stopPropagation();
                    onClose();
                },
                className: styles['PanelHeaderContext__fade']
            }),
            /*#__PURE__*/ _jsx("div", {
                className: styles['PanelHeaderContext__in'],
                ref: elementRef,
                onAnimationEnd: closing ? onAnimationEnd : undefined,
                children: visible && /*#__PURE__*/ _jsx("div", {
                    className: styles['PanelHeaderContext__content'],
                    children: children
                })
            })
        ]
    });
};

//# sourceMappingURL=PanelHeaderContext.js.map