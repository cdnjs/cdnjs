import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import { Headline } from '../Typography/Headline/Headline';
import { Title } from '../Typography/Title/Title';
import styles from './Placeholder.module.css';
const PlaceholderContainer = ({ stretched, noPadding = false, ...restProps })=>/*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: classNames(styles['Placeholder'], stretched && styles['Placeholder--stretched'], !noPadding && styles['Placeholder--withPadding']),
        ...restProps
    });
const PlaceholderIcon = (props)=>/*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: styles['Placeholder__icon'],
        ...props
    });
const PlaceholderHeader = ({ className, ...restProps })=>/*#__PURE__*/ React.createElement(Title, {
        level: "2",
        weight: "2",
        className: classNames(className, styles['Placeholder__header']),
        ...restProps
    });
const PlaceholderText = ({ className, ...restProps })=>/*#__PURE__*/ React.createElement(Headline, {
        weight: "3",
        className: classNames(className, styles['Placeholder__text']),
        ...restProps
    });
const PlaceholderActions = (props)=>/*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: styles['Placeholder__action'],
        ...props
    });
/**
 * @see https://vkcom.github.io/VKUI/#/Placeholder
 */ export const Placeholder = ({ icon, header, children, action, noPadding = false, ...restProps })=>/*#__PURE__*/ React.createElement(PlaceholderContainer, {
        noPadding: noPadding,
        ...restProps
    }, hasReactNode(icon) && /*#__PURE__*/ React.createElement(PlaceholderIcon, null, icon), hasReactNode(header) && /*#__PURE__*/ React.createElement(PlaceholderHeader, null, header), hasReactNode(children) && /*#__PURE__*/ React.createElement(PlaceholderText, null, children), hasReactNode(action) && /*#__PURE__*/ React.createElement(PlaceholderActions, null, action));
Placeholder.Container = PlaceholderContainer;
Placeholder.Icon = PlaceholderIcon;
Placeholder.Header = PlaceholderHeader;
Placeholder.Text = PlaceholderText;
Placeholder.Actions = PlaceholderActions;

//# sourceMappingURL=Placeholder.js.map