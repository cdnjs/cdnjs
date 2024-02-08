import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { useDOM } from '../../lib/dom';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { AccordionContext } from './AccordionContext';
import styles from './Accordion.module.css';
/**
 * Функция расчета max-height, для скрытия или раскрытия контента.
 */ function calcMaxHeight(expanded, el) {
    if (!expanded) {
        return '0px';
    }
    // В первый рендеринг нельзя узнать высоту элемента
    if (el === null) {
        return 'inherit';
    }
    return `${el.scrollHeight}px`;
}
/**
 * Хук для отслеживания изменения высоты контента.
 */ function useResizeContent(expanded, inRef) {
    const resize = ()=>{
        inRef.current.style.maxHeight = calcMaxHeight(expanded, inRef.current);
    };
    const { window } = useDOM();
    useGlobalEventListener(window, 'resize', resize);
    useIsomorphicLayoutEffect(resize, []);
}
/**
 * Хук для скрывания или раскрывания контента. Возвращает стили для in элемента.
 */ function useAccordionContent(expanded, inRef) {
    const maxHeight = calcMaxHeight(expanded, inRef.current);
    useResizeContent(expanded, inRef);
    return {
        maxHeight
    };
}
export const AccordionContent = ({ getRootRef, getRef, className, children, ...restProps })=>{
    const inRef = useExternRef(getRef);
    const { expanded, labelId, contentId } = React.useContext(AccordionContext);
    const inStyle = useAccordionContent(expanded, inRef);
    return /*#__PURE__*/ React.createElement("div", {
        ref: getRootRef,
        id: contentId,
        role: "region",
        "aria-labelledby": labelId,
        "aria-hidden": !expanded,
        className: classNames(styles['AccordionContent'], className),
        ...restProps
    }, /*#__PURE__*/ React.createElement("div", {
        ref: inRef,
        className: styles['AccordionContent__in'],
        style: inStyle
    }, children));
};

//# sourceMappingURL=AccordionContent.js.map