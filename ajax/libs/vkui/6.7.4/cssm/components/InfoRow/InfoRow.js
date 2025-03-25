import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Headline } from '../Typography/Headline/Headline';
import { Subhead } from '../Typography/Subhead/Subhead';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './InfoRow.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/InfoRow
 */ export const InfoRow = ({ header, children, className, ...restProps })=>/*#__PURE__*/ _jsxs(Headline, {
        ...restProps,
        Component: "span",
        className: classNames(styles['InfoRow'], className),
        weight: "3",
        children: [
            hasReactNode(header) && /*#__PURE__*/ _jsxs(Subhead, {
                Component: "strong",
                className: styles['InfoRow__header'],
                children: [
                    header,
                    /*#__PURE__*/ _jsx(VisuallyHidden, {
                        children: " "
                    })
                ]
            }),
            children
        ]
    });

//# sourceMappingURL=InfoRow.js.map