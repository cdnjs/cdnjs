import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useGlobalOnClickOutside } from '../../hooks/useGlobalOnClickOutside';
import { usePlatform } from '../../hooks/usePlatform';
import { useCSSKeyframesAnimationController } from '../../lib/animation';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { FixedLayout } from '../FixedLayout/FixedLayout';
import styles from './PanelHeaderContext.module.css';
const sizeXClassNames = {
    none: styles['PanelHeaderContext--sizeX-none'],
    compact: styles['PanelHeaderContext--sizeX-compact'],
    regular: styles['PanelHeaderContext--sizeX-regular']
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderContext
 */ export const PanelHeaderContext = ({ children, opened = false, className, onClose, ...restProps })=>{
    const platform = usePlatform();
    const { sizeX = 'none' } = useAdaptivity();
    const elementRef = React.useRef(null);
    const [animationState, animationHandlers] = useCSSKeyframesAnimationController(opened ? 'enter' : 'exit', undefined, true);
    const visible = animationState !== 'exited';
    useScrollLock(platform !== 'vkcom' && visible);
    const handleGlobalOnClickOutside = React.useCallback((event)=>{
        if (opened) {
            event.stopPropagation();
            onClose();
        }
    }, [
        opened,
        onClose
    ]);
    useGlobalOnClickOutside(handleGlobalOnClickOutside, visible ? elementRef : null);
    if (!visible) {
        return null;
    }
    return /*#__PURE__*/ _jsxs(FixedLayout, {
        ...restProps,
        className: classNames(styles['PanelHeaderContext'], platform === 'ios' && styles['PanelHeaderContext--ios'], opened ? styles['PanelHeaderContext--opened'] : styles['PanelHeaderContext--closing'], sizeXClassNames[sizeX], className),
        vertical: "top",
        children: [
            /*#__PURE__*/ _jsx("div", {
                onClick: (event)=>{
                    event.stopPropagation();
                    onClose();
                },
                className: styles['PanelHeaderContext__fade']
            }),
            /*#__PURE__*/ _jsx("div", {
                "data-testid": process.env.NODE_ENV === 'test' ? 'content' : undefined,
                className: styles['PanelHeaderContext__in'],
                ref: elementRef,
                ...animationHandlers,
                children: /*#__PURE__*/ _jsx("div", {
                    className: styles['PanelHeaderContext__content'],
                    children: children
                })
            })
        ]
    });
};

//# sourceMappingURL=PanelHeaderContext.js.map