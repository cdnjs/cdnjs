import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    const content = /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            mode === 'image' && background && /*#__PURE__*/ _jsx("div", {
                "aria-hidden": true,
                className: styles['Banner__bg'],
                children: background
            }),
            before && /*#__PURE__*/ _jsx("div", {
                className: styles['Banner__before'],
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles['Banner__content'],
                children: [
                    hasReactNode(header) && /*#__PURE__*/ _jsx(HeaderTypography, {
                        Component: "div",
                        weight: "2",
                        level: size === 'm' ? '2' : '1',
                        children: header
                    }),
                    hasReactNode(subheader) && /*#__PURE__*/ _jsx(SubheaderTypography, {
                        Component: "div",
                        className: styles['Banner__subheader'],
                        children: subheader
                    }),
                    hasReactNode(text) && /*#__PURE__*/ _jsx(Text, {
                        Component: "div",
                        className: styles['Banner__text'],
                        children: text
                    }),
                    hasReactNode(actions) && React.Children.count(actions) > 0 && /*#__PURE__*/ _jsx("div", {
                        className: styles['Banner__actions'],
                        children: actions
                    })
                ]
            })
        ]
    });
    return /*#__PURE__*/ _jsx(RootComponent, {
        Component: "section",
        ...restProps,
        baseClassName: classNames(styles['Banner'], platform === 'ios' && styles['Banner--ios'], mode === 'image' && styles['Banner--mode-image'], size === 'm' && styles['Banner--size-m'], mode === 'image' && imageTheme === 'dark' && styles['Banner--inverted']),
        children: asideMode === 'expand' ? /*#__PURE__*/ _jsxs(Tappable, {
            className: styles['Banner__in'],
            activeMode: platform === 'ios' ? 'opacity' : 'background',
            onClick: noop,
            children: [
                content,
                /*#__PURE__*/ _jsx("div", {
                    className: styles['Banner__aside'],
                    children: /*#__PURE__*/ _jsx(Icon24Chevron, {
                        className: styles['Banner__expand']
                    })
                })
            ]
        }) : /*#__PURE__*/ _jsxs("div", {
            className: styles['Banner__in'],
            children: [
                content,
                asideMode === 'dismiss' && /*#__PURE__*/ _jsx("div", {
                    className: styles['Banner__aside'],
                    children: /*#__PURE__*/ _jsx(IconButton, {
                        label: dismissLabel,
                        className: styles['Banner__dismiss'],
                        onClick: onDismiss,
                        hoverMode: "opacity",
                        hasActive: false,
                        children: platform === 'ios' ? /*#__PURE__*/ _jsx(IconDismissIOS, {}) : /*#__PURE__*/ _jsx(Icon24Cancel, {})
                    })
                })
            ]
        })
    });
};

//# sourceMappingURL=Banner.js.map