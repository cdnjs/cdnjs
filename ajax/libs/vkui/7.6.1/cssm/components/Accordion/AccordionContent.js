'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useCSSKeyframesAnimationController } from "../../lib/animation/index.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { AccordionContext } from "./AccordionContext.js";
import styles from "./Accordion.module.css";
const CUSTOM_PROPERTY_ACCORDION_CONTENT_HEIGHT = '--vkui_internal--AccordionContent_height';
const stateClassNames = {
    enter: styles.inEnter,
    entering: styles.inEnter,
    entered: styles.inEntered,
    exit: styles.inExit,
    exiting: styles.inExit,
    exited: styles.inExited
};
export const AccordionContent = ({ getRootRef, getRef, className, children, ...restProps })=>{
    const { expanded, labelId, contentId, unmountOnCollapsed } = React.useContext(AccordionContext);
    const inRef = useExternRef(getRef);
    const [animationState, animationHandlers] = useCSSKeyframesAnimationController(expanded ? 'enter' : 'exit', undefined, true);
    useIsomorphicLayoutEffect(()=>{
        const inEl = inRef.current;
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (!inEl) {
            return;
        }
        switch(animationState){
            case 'enter':
            case 'exit':
                inEl.style.setProperty(CUSTOM_PROPERTY_ACCORDION_CONTENT_HEIGHT, `${inEl.scrollHeight}px`);
                break;
            case 'entered':
            case 'exited':
                inEl.style.removeProperty(CUSTOM_PROPERTY_ACCORDION_CONTENT_HEIGHT);
                break;
        }
    }, [
        animationState,
        inRef
    ]);
    if (unmountOnCollapsed && animationState === 'exited') {
        return null;
    }
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        id: contentId,
        role: "region",
        "aria-labelledby": labelId,
        "aria-hidden": !expanded,
        className: classNames(styles.host, className),
        ...restProps,
        children: /*#__PURE__*/ _jsx("div", {
            ref: inRef,
            className: classNames(styles.in, stateClassNames[animationState]),
            ...animationHandlers,
            children: children
        })
    });
};

//# sourceMappingURL=AccordionContent.js.map