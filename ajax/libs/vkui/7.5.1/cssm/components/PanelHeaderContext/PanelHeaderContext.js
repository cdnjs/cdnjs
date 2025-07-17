'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useGlobalOnClickOutside } from "../../hooks/useGlobalOnClickOutside.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useCSSKeyframesAnimationController } from "../../lib/animation/index.js";
import { useScrollLock } from "../AppRoot/ScrollContext.js";
import { FixedLayout } from "../FixedLayout/FixedLayout.js";
import styles from "./PanelHeaderContext.module.css";
const sizeXClassNames = {
    none: styles.sizeXNone,
    compact: styles.sizeXCompact,
    regular: styles.sizeXRegular
};
/**
 * @see https://vkui.io/components/panel-header-context
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
        className: classNames(styles.host, platform === 'ios' && styles.ios, opened ? styles.opened : styles.closing, sizeXClassNames[sizeX], className),
        vertical: "top",
        children: [
            /*#__PURE__*/ _jsx("div", {
                onClick: (event)=>{
                    event.stopPropagation();
                    onClose();
                },
                className: styles.fade
            }),
            /*#__PURE__*/ _jsx("div", {
                "data-testid": process.env.NODE_ENV === 'test' ? 'content' : undefined,
                className: styles.in,
                ref: elementRef,
                ...animationHandlers,
                children: /*#__PURE__*/ _jsx("div", {
                    className: styles.content,
                    children: children
                })
            })
        ]
    });
};

//# sourceMappingURL=PanelHeaderContext.js.map