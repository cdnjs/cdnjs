import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { useCSSKeyframesAnimationController } from '../../lib/animation';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { AccordionContext } from './AccordionContext';
import styles from './Accordion.module.css';
const CUSTOM_PROPERTY_ACCORDION_CONTENT_HEIGHT = '--vkui_internal--AccordionContent_height';
const stateClassNames = {
    enter: styles['AccordionContent__in--enter'],
    entering: styles['AccordionContent__in--enter'],
    entered: styles['AccordionContent__in--entered'],
    exit: styles['AccordionContent__in--exit'],
    exiting: styles['AccordionContent__in--exit'],
    exited: styles['AccordionContent__in--exited']
};
export const AccordionContent = ({ getRootRef, getRef, className, children, ...restProps })=>{
    const { expanded, labelId, contentId } = React.useContext(AccordionContext);
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
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        id: contentId,
        role: "region",
        "aria-labelledby": labelId,
        "aria-hidden": !expanded,
        className: classNames(styles['AccordionContent'], className),
        ...restProps,
        children: /*#__PURE__*/ _jsx("div", {
            ref: inRef,
            className: classNames(styles['AccordionContent__in'], stateClassNames[animationState]),
            ...animationHandlers,
            children: children
        })
    });
};
AccordionContent.displayName = 'AccordionContent';

//# sourceMappingURL=AccordionContent.js.map