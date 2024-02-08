import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Headline } from '../Typography/Headline/Headline';
import { Subhead } from '../Typography/Subhead/Subhead';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './InfoRow.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/InfoRow
 */ export const InfoRow = ({ header, children, className, ...restProps })=>/*#__PURE__*/ React.createElement(Headline, {
        ...restProps,
        Component: "span",
        className: classNames(styles['InfoRow'], className),
        weight: "3"
    }, hasReactNode(header) && /*#__PURE__*/ React.createElement(Subhead, {
        Component: "strong",
        className: styles['InfoRow__header']
    }, header, /*#__PURE__*/ React.createElement(VisuallyHidden, null, " ")), children);

//# sourceMappingURL=InfoRow.js.map