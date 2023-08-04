import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Headline } from '../Typography/Headline/Headline';
import { Title } from '../Typography/Title/Title';
import styles from './Placeholder.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Placeholder
 */ export const Placeholder = ({ icon, header, action, children, stretched, getRootRef, className, withPadding = true, ...restProps })=>/*#__PURE__*/ React.createElement("div", {
        ...restProps,
        ref: getRootRef,
        className: classNames(styles['Placeholder'], stretched && styles['Placeholder--stretched'], withPadding && styles['Placeholder--withPadding'], className)
    }, hasReactNode(icon) && /*#__PURE__*/ React.createElement("div", {
        className: styles['Placeholder__icon']
    }, icon), hasReactNode(header) && /*#__PURE__*/ React.createElement(Title, {
        level: "2",
        weight: "2",
        className: styles['Placeholder__header']
    }, header), hasReactNode(children) && /*#__PURE__*/ React.createElement(Headline, {
        weight: "3",
        className: styles['Placeholder__text']
    }, children), hasReactNode(action) && /*#__PURE__*/ React.createElement("div", {
        className: styles['Placeholder__action']
    }, action));

//# sourceMappingURL=Placeholder.js.map