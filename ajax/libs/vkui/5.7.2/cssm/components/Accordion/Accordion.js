import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { AccordionSummary } from './AccordionSummary';
import styles from './Accordion.module.css';
/**
 * Компонент, позволяет отображать несколько разделов контента в ограниченном
 * пространстве и сворачивать или разворачивать их пользователем.
 *
 * Обертка над details.
 *
 * @since 5.3.0
 * @see https://vkcom.github.io/VKUI/#/Accordion
 */ export const Accordion = ({ getRootRef, className, ...restProps })=>/*#__PURE__*/ React.createElement("details", {
        className: classNames(styles['Accordion'], className),
        ref: getRootRef,
        ...restProps
    });
Accordion.Summary = AccordionSummary;

//# sourceMappingURL=Accordion.js.map