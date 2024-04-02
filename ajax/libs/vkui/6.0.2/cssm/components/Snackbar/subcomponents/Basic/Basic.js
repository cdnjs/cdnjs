import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../../../RootComponent/RootComponent';
import { Paragraph } from '../../../Typography/Paragraph/Paragraph';
import { Subhead } from '../../../Typography/Subhead/Subhead';
import styles from './Basic.module.css';
const stylesLayout = {
    vertical: styles['Snackbar--layout-vertical'],
    horizontal: styles['Snackbar--layout-horizontal']
};
export function Basic({ layout: layoutProps, action, after, before, mode, subtitle, children, ...restProps }) {
    const layout = layoutProps || (after || subtitle ? 'vertical' : 'horizontal');
    return /*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: classNames(styles['Snackbar__body'], stylesLayout[layout], mode === 'dark' && styles['Snackbar--mode-dark']),
        ...restProps
    }, before && /*#__PURE__*/ React.createElement("div", {
        className: styles['Snackbar__before']
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: styles['Snackbar__content']
    }, /*#__PURE__*/ React.createElement(Paragraph, {
        className: styles['Snackbar__content-text']
    }, children), subtitle && !action && /*#__PURE__*/ React.createElement(Subhead, {
        className: styles['Snackbar__content-subtitle']
    }, subtitle), action && !subtitle && /*#__PURE__*/ React.createElement("div", {
        className: styles['Snackbar__action']
    }, action)), after && /*#__PURE__*/ React.createElement("div", {
        className: styles['Snackbar__after']
    }, after));
}

//# sourceMappingURL=Basic.js.map