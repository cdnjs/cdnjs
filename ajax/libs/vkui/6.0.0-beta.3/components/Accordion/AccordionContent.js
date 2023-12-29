import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { useDOM } from '../../lib/dom';
import { AccordionContext } from './AccordionContext';
/**
 * Функция расчета отрицательного margin, для скрытия контента.
 */ function calcMarginTop(expanded, el) {
    if (expanded) {
        return `0px`;
    }
    // В первый рендеринг нельзя узнать высоту элемента, поэтому прячем таким образом
    if (el === null) {
        return '-100%';
    }
    return `${-el.clientHeight}px`;
}
/**
 * В первый рендеринг отключаем анимации.
 */ function calcTransition(el) {
    return el === null ? 'none' : undefined;
}
/**
 * Хук для отслеживания изменения высоты контента.
 */ function useResizeContent(expanded, inRef) {
    const resize = ()=>{
        inRef.current.style.marginTop = calcMarginTop(expanded, inRef.current);
    };
    const { window } = useDOM();
    useGlobalEventListener(window, 'resize', resize);
}
/**
 * Хук для скрывания или раскрывания контента. Возвращает стили для in элемента.
 */ function useAccordionContent(expanded, inRef) {
    const marginTop = calcMarginTop(expanded, inRef.current);
    const transition = calcTransition(inRef.current);
    useResizeContent(expanded, inRef);
    return {
        marginTop,
        transition
    };
}
export const AccordionContent = (_param)=>{
    var { getRootRef, getRef, className, children } = _param, restProps = _object_without_properties(_param, [
        "getRootRef",
        "getRef",
        "className",
        "children"
    ]);
    const inRef = useExternRef(getRef);
    const { expanded, labelId, contentId } = React.useContext(AccordionContext);
    const inStyle = useAccordionContent(expanded, inRef);
    return /*#__PURE__*/ React.createElement("div", _object_spread({
        ref: getRootRef,
        id: contentId,
        role: "region",
        "aria-labelledby": labelId,
        "aria-hidden": !expanded,
        className: classNames("vkuiAccordionContent", className)
    }, restProps), /*#__PURE__*/ React.createElement("div", {
        ref: inRef,
        className: "vkuiAccordionContent__in",
        style: inStyle
    }, children));
};

//# sourceMappingURL=AccordionContent.js.map