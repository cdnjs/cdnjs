import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Icon24Cancel, Icon24Chevron, Icon24Dismiss, Icon24DismissDark } from "@vkontakte/icons";
import { classNames, hasReactNode, noop } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { IconButton } from "../IconButton/IconButton.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { Text } from "../Typography/Text/Text.js";
import { Title } from "../Typography/Title/Title.js";
import styles from "./Banner.module.css";
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
                className: styles.bg,
                children: background
            }),
            before && /*#__PURE__*/ _jsx("div", {
                className: styles.before,
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles.content,
                children: [
                    hasReactNode(header) && /*#__PURE__*/ _jsx(HeaderTypography, {
                        Component: "div",
                        weight: "2",
                        level: size === 'm' ? '2' : '1',
                        children: header
                    }),
                    hasReactNode(subheader) && /*#__PURE__*/ _jsx(SubheaderTypography, {
                        Component: "div",
                        className: styles.subheader,
                        children: subheader
                    }),
                    hasReactNode(text) && /*#__PURE__*/ _jsx(Text, {
                        Component: "div",
                        className: styles.text,
                        children: text
                    }),
                    hasReactNode(actions) && React.Children.count(actions) > 0 && /*#__PURE__*/ _jsx("div", {
                        className: styles.actions,
                        children: actions
                    })
                ]
            })
        ]
    });
    return /*#__PURE__*/ _jsx(RootComponent, {
        Component: "section",
        ...restProps,
        baseClassName: classNames(styles.host, platform === 'ios' && styles.ios, mode === 'image' && styles.modeImage, size === 'm' && styles.sizeM, mode === 'image' && imageTheme === 'dark' && styles.inverted),
        children: asideMode === 'expand' ? /*#__PURE__*/ _jsxs(Tappable, {
            className: styles.in,
            activeMode: platform === 'ios' ? 'opacity' : 'background',
            onClick: noop,
            children: [
                content,
                /*#__PURE__*/ _jsx("div", {
                    className: styles.aside,
                    children: /*#__PURE__*/ _jsx(Icon24Chevron, {
                        className: styles.expand
                    })
                })
            ]
        }) : /*#__PURE__*/ _jsxs("div", {
            className: styles.in,
            children: [
                content,
                asideMode === 'dismiss' && /*#__PURE__*/ _jsx("div", {
                    className: styles.aside,
                    children: /*#__PURE__*/ _jsx(IconButton, {
                        label: dismissLabel,
                        className: styles.dismiss,
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