import * as React from 'react';
import { Icon24Cancel, Icon24Chevron, Icon24Dismiss, Icon24DismissDark } from '@vkontakte/icons';
import { classNames, hasReactNode, noop } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { IconButton } from '../IconButton/IconButton';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import { Headline } from '../Typography/Headline/Headline';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Text } from '../Typography/Text/Text';
import { Title } from '../Typography/Title/Title';
import styles from './Banner.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Banner
 */ export const Banner = ({ mode = 'tint', imageTheme = 'dark', size = 's', before, asideMode, header, subheader, text, children, background, actions, onDismiss, dismissLabel = 'Скрыть', ...restProps })=>{
    const platform = usePlatform();
    const HeaderTypography = size === 'm' ? Title : Headline;
    const SubheaderTypography = size === 'm' ? Text : Subhead;
    const IconDismissIOS = mode === 'image' ? Icon24DismissDark : Icon24Dismiss;
    const content = /*#__PURE__*/ React.createElement(React.Fragment, null, mode === 'image' && background && /*#__PURE__*/ React.createElement("div", {
        "aria-hidden": true,
        className: styles['Banner__bg']
    }, background), before && /*#__PURE__*/ React.createElement("div", {
        className: styles['Banner__before']
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: styles['Banner__content']
    }, hasReactNode(header) && /*#__PURE__*/ React.createElement(HeaderTypography, {
        Component: "div",
        weight: "2",
        level: size === 'm' ? '2' : '1'
    }, header), hasReactNode(subheader) && /*#__PURE__*/ React.createElement(SubheaderTypography, {
        Component: "div",
        className: styles['Banner__subheader']
    }, subheader), hasReactNode(text) && /*#__PURE__*/ React.createElement(Text, {
        Component: "div",
        className: styles['Banner__text']
    }, text), hasReactNode(actions) && React.Children.count(actions) > 0 && /*#__PURE__*/ React.createElement("div", {
        className: styles['Banner__actions']
    }, actions)));
    return /*#__PURE__*/ React.createElement(RootComponent, {
        Component: "section",
        ...restProps,
        baseClassName: classNames(styles['Banner'], platform === 'ios' && styles['Banner--ios'], mode === 'image' && styles['Banner--mode-image'], size === 'm' && styles['Banner--size-m'], mode === 'image' && imageTheme === 'dark' && styles['Banner--inverted'])
    }, asideMode === 'expand' ? /*#__PURE__*/ React.createElement(Tappable, {
        className: styles['Banner__in'],
        activeMode: platform === 'ios' ? 'opacity' : 'background',
        onClick: noop
    }, content, /*#__PURE__*/ React.createElement("div", {
        className: styles['Banner__aside']
    }, /*#__PURE__*/ React.createElement(Icon24Chevron, {
        className: styles['Banner__expand']
    }))) : /*#__PURE__*/ React.createElement("div", {
        className: styles['Banner__in']
    }, content, asideMode === 'dismiss' && /*#__PURE__*/ React.createElement("div", {
        className: styles['Banner__aside']
    }, /*#__PURE__*/ React.createElement(IconButton, {
        label: dismissLabel,
        className: styles['Banner__dismiss'],
        onClick: onDismiss,
        hoverMode: "opacity",
        hasActive: false
    }, platform === 'ios' ? /*#__PURE__*/ React.createElement(IconDismissIOS, null) : /*#__PURE__*/ React.createElement(Icon24Cancel, null)))));
};

//# sourceMappingURL=Banner.js.map