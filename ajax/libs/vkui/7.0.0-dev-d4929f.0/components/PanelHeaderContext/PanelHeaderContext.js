'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useGlobalOnClickOutside } from "../../hooks/useGlobalOnClickOutside.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useCSSKeyframesAnimationController } from "../../lib/animation/index.js";
import { useScrollLock } from "../AppRoot/ScrollContext.js";
import { FixedLayout } from "../FixedLayout/FixedLayout.js";
const sizeXClassNames = {
    none: "PanelHeaderContext__sizeXNone--MwDLw",
    compact: "PanelHeaderContext__sizeXCompact--Rs88b",
    regular: "PanelHeaderContext__sizeXRegular--g-KrM"
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderContext
 */ export const PanelHeaderContext = (_param)=>{
    var { children, opened = false, className, onClose } = _param, restProps = _object_without_properties(_param, [
        "children",
        "opened",
        "className",
        "onClose"
    ]);
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
    return /*#__PURE__*/ _jsxs(FixedLayout, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("PanelHeaderContext__host--tf3u9", platform === 'ios' && "PanelHeaderContext__ios--ryBUy", opened ? "PanelHeaderContext__opened--gu3Nz" : "PanelHeaderContext__closing--YQDBO", sizeXClassNames[sizeX], className),
        vertical: "top",
        children: [
            /*#__PURE__*/ _jsx("div", {
                onClick: (event)=>{
                    event.stopPropagation();
                    onClose();
                },
                className: "PanelHeaderContext__fade--pt-da"
            }),
            /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({
                "data-testid": process.env.NODE_ENV === 'test' ? 'content' : undefined,
                className: "PanelHeaderContext__in--qTgzG",
                ref: elementRef
            }, animationHandlers), {
                children: /*#__PURE__*/ _jsx("div", {
                    className: "PanelHeaderContext__content--S8QZq",
                    children: children
                })
            }))
        ]
    }));
};

//# sourceMappingURL=PanelHeaderContext.js.map