import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../../hooks/useAdaptivity';
import { RootComponent } from '../../../RootComponent/RootComponent';
import { Paragraph } from '../../../Typography/Paragraph/Paragraph';
import { Subhead } from '../../../Typography/Subhead/Subhead';
import styles from './Basic.module.css';
const stylesLayout = {
    none: styles['Snackbar--layout-none'],
    vertical: styles['Snackbar--layout-vertical'],
    horizontal: styles['Snackbar--layout-horizontal']
};
const sizeYClassNames = {
    none: styles['Snackbar--sizeY-none'],
    regular: styles['Snackbar--sizeY-regular']
};
export function Basic({ layout: layoutProps, action, after, before, mode, subtitle, children, ...restProps }) {
    const { sizeY = 'none' } = useAdaptivity();
    const layout = after || subtitle ? 'vertical' : 'none';
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['Snackbar__body'], stylesLayout[layoutProps || layout], sizeY !== 'compact' && sizeYClassNames[sizeY], mode === 'dark' && styles['Snackbar--mode-dark']),
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: styles['Snackbar__before'],
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles['Snackbar__content'],
                children: [
                    /*#__PURE__*/ _jsx(Paragraph, {
                        className: styles['Snackbar__content-text'],
                        children: children
                    }),
                    subtitle && !action && /*#__PURE__*/ _jsx(Subhead, {
                        className: styles['Snackbar__content-subtitle'],
                        children: subtitle
                    }),
                    action && !subtitle && /*#__PURE__*/ _jsx("div", {
                        className: styles['Snackbar__action'],
                        children: action
                    })
                ]
            }),
            after && /*#__PURE__*/ _jsx("div", {
                className: styles['Snackbar__after'],
                children: after
            })
        ]
    });
}

//# sourceMappingURL=Basic.js.map