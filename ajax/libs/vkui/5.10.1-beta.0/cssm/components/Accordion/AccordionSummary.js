import * as React from 'react';
import { Icon24ChevronDown, Icon24ChevronUp } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { SimpleCell } from '../SimpleCell/SimpleCell';
import styles from './Accordion.module.css';
/**
 * Обертка над summary.
 *
 * @since 5.3.0
 * @see  https://vkcom.github.io/VKUI/#/Accordion
 */ export const AccordionSummary = ({ className, after, before, ExpandIcon = Icon24ChevronDown, CollapseIcon = Icon24ChevronUp, iconPosition = 'after', children, ...restProps })=>{
    const accordionIcon = // Обертка нужна для правильной работы с отступами в SimpleCell
    // Без обертки на AccordionSummary__icon--collapse не будет действовать правило `last-child`
    /*#__PURE__*/ React.createElement("span", {
        className: "vkuiIcon"
    }, /*#__PURE__*/ React.createElement(ExpandIcon, {
        className: classNames(styles['AccordionSummary__icon'], styles['AccordionSummary__icon--expand'])
    }), /*#__PURE__*/ React.createElement(CollapseIcon, {
        className: classNames(styles['AccordionSummary__icon'], styles['AccordionSummary__icon--collapse'])
    }));
    return /*#__PURE__*/ React.createElement(SimpleCell, {
        className: classNames(styles['AccordionSummary'], className),
        Component: "summary",
        before: /*#__PURE__*/ React.createElement(React.Fragment, null, iconPosition === 'before' && accordionIcon, before),
        after: /*#__PURE__*/ React.createElement(React.Fragment, null, after, iconPosition === 'after' && accordionIcon),
        ...restProps
    }, children);
};

//# sourceMappingURL=AccordionSummary.js.map