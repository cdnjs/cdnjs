import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { useCSSKeyframesAnimationController } from '../../lib/animation';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { AccordionContext } from './AccordionContext';
const CUSTOM_PROPERTY_ACCORDION_CONTENT_HEIGHT = '--vkui_internal--AccordionContent_height';
const stateClassNames = {
    enter: "vkuiAccordionContent__in--enter",
    entering: "vkuiAccordionContent__in--enter",
    entered: "vkuiAccordionContent__in--entered",
    exit: "vkuiAccordionContent__in--exit",
    exiting: "vkuiAccordionContent__in--exit",
    exited: "vkuiAccordionContent__in--exited"
};
export const AccordionContent = (_param)=>{
    var { getRootRef, getRef, className, children } = _param, restProps = _object_without_properties(_param, [
        "getRootRef",
        "getRef",
        "className",
        "children"
    ]);
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
    return /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({
        ref: getRootRef,
        id: contentId,
        role: "region",
        "aria-labelledby": labelId,
        "aria-hidden": !expanded,
        className: classNames("vkuiAccordionContent", className)
    }, restProps), {
        children: /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({
            ref: inRef,
            className: classNames("vkuiAccordionContent__in", stateClassNames[animationState])
        }, animationHandlers), {
            children: children
        }))
    }));
};
AccordionContent.displayName = 'AccordionContent';

//# sourceMappingURL=AccordionContent.js.map