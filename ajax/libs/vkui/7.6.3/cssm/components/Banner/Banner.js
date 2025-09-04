'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Icon24Cancel, Icon24Chevron, Icon24Dismiss, Icon24DismissDark } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { IconButton } from "../IconButton/IconButton.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { Text } from "../Typography/Text/Text.js";
import { Title } from "../Typography/Title/Title.js";
import styles from "./Banner.module.css";
/**
 * @see https://vkui.io/components/banner
 */ export const Banner = ({ mode = 'tint', imageTheme = 'dark', size = 's', before, after: afterProp, title, subtitle, extraSubtitle, children, background, actions, onDismiss, dismissLabel = 'Скрыть', Component, ...restProps })=>{
    const platform = usePlatform();
    const HeaderTypography = size === 'm' ? Title : Headline;
    const SubheadTypography = size === 'm' ? Text : Subhead;
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
                    hasReactNode(title) && /*#__PURE__*/ _jsx(HeaderTypography, {
                        Component: "div",
                        weight: "2",
                        level: size === 'm' ? '2' : '1',
                        children: title
                    }),
                    hasReactNode(subtitle) && /*#__PURE__*/ _jsx(SubheadTypography, {
                        Component: "div",
                        className: styles.subtitle,
                        children: subtitle
                    }),
                    hasReactNode(extraSubtitle) && /*#__PURE__*/ _jsx(Text, {
                        Component: "div",
                        className: styles.extraSubtitle,
                        children: extraSubtitle
                    }),
                    hasReactNode(actions) && React.Children.count(actions) > 0 && /*#__PURE__*/ _jsx("div", {
                        className: styles.actions,
                        children: actions
                    })
                ]
            })
        ]
    });
    const afterMap = {
        chevron: /*#__PURE__*/ _jsx(Icon24Chevron, {
            className: styles.chevron
        }),
        dismiss: /*#__PURE__*/ _jsx(IconButton, {
            label: dismissLabel,
            className: styles.dismiss,
            onClick: onDismiss,
            hoverMode: "opacity",
            hasActive: false,
            children: platform === 'ios' ? /*#__PURE__*/ _jsx(IconDismissIOS, {}) : /*#__PURE__*/ _jsx(Icon24Cancel, {})
        })
    };
    const after = afterProp && /*#__PURE__*/ _jsx("div", {
        className: styles.after,
        children: typeof afterProp === 'string' ? afterMap[afterProp] : afterProp
    });
    const isClickable = restProps.onClick || restProps.onClickCapture || restProps.href;
    return /*#__PURE__*/ _jsxs(Tappable, {
        Component: Component || (!isClickable ? 'section' : undefined),
        activeMode: platform === 'ios' ? 'opacity' : 'background',
        baseClassName: classNames(styles.host, platform === 'ios' && styles.ios, mode === 'image' && styles.modeImage, size === 'm' && styles.sizeM, mode === 'image' && imageTheme === 'dark' && styles.inverted),
        ...restProps,
        children: [
            content,
            after
        ]
    });
};

//# sourceMappingURL=Banner.js.map