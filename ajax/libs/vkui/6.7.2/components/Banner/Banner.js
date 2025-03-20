import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
/**
 * @see https://vkcom.github.io/VKUI/#/Banner
 */ export const Banner = (_param)=>{
    var { mode = 'tint', imageTheme = 'dark', size = 's', before, asideMode, header, subheader, text, children, background, actions, onDismiss, dismissLabel = 'Скрыть' } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "imageTheme",
        "size",
        "before",
        "asideMode",
        "header",
        "subheader",
        "text",
        "children",
        "background",
        "actions",
        "onDismiss",
        "dismissLabel"
    ]);
    const platform = usePlatform();
    const HeaderTypography = size === 'm' ? Title : Headline;
    const SubheaderTypography = size === 'm' ? Text : Subhead;
    const IconDismissIOS = mode === 'image' ? Icon24DismissDark : Icon24Dismiss;
    const content = /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            mode === 'image' && background && /*#__PURE__*/ _jsx("div", {
                "aria-hidden": true,
                className: "vkuiBanner__bg",
                children: background
            }),
            before && /*#__PURE__*/ _jsx("div", {
                className: "vkuiBanner__before",
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiBanner__content",
                children: [
                    hasReactNode(header) && /*#__PURE__*/ _jsx(HeaderTypography, {
                        Component: "div",
                        weight: "2",
                        level: size === 'm' ? '2' : '1',
                        children: header
                    }),
                    hasReactNode(subheader) && /*#__PURE__*/ _jsx(SubheaderTypography, {
                        Component: "div",
                        className: "vkuiBanner__subheader",
                        children: subheader
                    }),
                    hasReactNode(text) && /*#__PURE__*/ _jsx(Text, {
                        Component: "div",
                        className: "vkuiBanner__text",
                        children: text
                    }),
                    hasReactNode(actions) && React.Children.count(actions) > 0 && /*#__PURE__*/ _jsx("div", {
                        className: "vkuiBanner__actions",
                        children: actions
                    })
                ]
            })
        ]
    });
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        Component: "section"
    }, restProps), {
        baseClassName: classNames("vkuiBanner", platform === 'ios' && "vkuiBanner--ios", mode === 'image' && "vkuiBanner--mode-image", size === 'm' && "vkuiBanner--size-m", mode === 'image' && imageTheme === 'dark' && "vkuiBanner--inverted"),
        children: asideMode === 'expand' ? /*#__PURE__*/ _jsxs(Tappable, {
            className: "vkuiBanner__in",
            activeMode: platform === 'ios' ? 'opacity' : 'background',
            onClick: noop,
            children: [
                content,
                /*#__PURE__*/ _jsx("div", {
                    className: "vkuiBanner__aside",
                    children: /*#__PURE__*/ _jsx(Icon24Chevron, {
                        className: "vkuiBanner__expand"
                    })
                })
            ]
        }) : /*#__PURE__*/ _jsxs("div", {
            className: "vkuiBanner__in",
            children: [
                content,
                asideMode === 'dismiss' && /*#__PURE__*/ _jsx("div", {
                    className: "vkuiBanner__aside",
                    children: /*#__PURE__*/ _jsx(IconButton, {
                        label: dismissLabel,
                        className: "vkuiBanner__dismiss",
                        onClick: onDismiss,
                        hoverMode: "opacity",
                        hasActive: false,
                        children: platform === 'ios' ? /*#__PURE__*/ _jsx(IconDismissIOS, {}) : /*#__PURE__*/ _jsx(Icon24Cancel, {})
                    })
                })
            ]
        })
    }));
};

//# sourceMappingURL=Banner.js.map