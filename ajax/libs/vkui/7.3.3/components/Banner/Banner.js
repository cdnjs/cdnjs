'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
/**
 * @see https://vkcom.github.io/VKUI/#/Banner
 */ export const Banner = (_param)=>{
    var { mode = 'tint', imageTheme = 'dark', size = 's', before, after: afterProp, title, subtitle, extraSubtitle, children, background, actions, onDismiss, dismissLabel = 'Скрыть', Component } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "imageTheme",
        "size",
        "before",
        "after",
        "title",
        "subtitle",
        "extraSubtitle",
        "children",
        "background",
        "actions",
        "onDismiss",
        "dismissLabel",
        "Component"
    ]);
    const platform = usePlatform();
    const HeaderTypography = size === 'm' ? Title : Headline;
    const SubheadTypography = size === 'm' ? Text : Subhead;
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
                    hasReactNode(title) && /*#__PURE__*/ _jsx(HeaderTypography, {
                        Component: "div",
                        weight: "2",
                        level: size === 'm' ? '2' : '1',
                        children: title
                    }),
                    hasReactNode(subtitle) && /*#__PURE__*/ _jsx(SubheadTypography, {
                        Component: "div",
                        className: "vkuiBanner__subtitle",
                        children: subtitle
                    }),
                    hasReactNode(extraSubtitle) && /*#__PURE__*/ _jsx(Text, {
                        Component: "div",
                        className: "vkuiBanner__extraSubtitle",
                        children: extraSubtitle
                    }),
                    hasReactNode(actions) && React.Children.count(actions) > 0 && /*#__PURE__*/ _jsx("div", {
                        className: "vkuiBanner__actions",
                        children: actions
                    })
                ]
            })
        ]
    });
    const afterMap = {
        chevron: /*#__PURE__*/ _jsx(Icon24Chevron, {
            className: "vkuiBanner__chevron"
        }),
        dismiss: /*#__PURE__*/ _jsx(IconButton, {
            label: dismissLabel,
            className: "vkuiBanner__dismiss",
            onClick: onDismiss,
            hoverMode: "opacity",
            hasActive: false,
            children: platform === 'ios' ? /*#__PURE__*/ _jsx(IconDismissIOS, {}) : /*#__PURE__*/ _jsx(Icon24Cancel, {})
        })
    };
    const after = afterProp && /*#__PURE__*/ _jsx("div", {
        className: "vkuiBanner__after",
        children: typeof afterProp === 'string' ? afterMap[afterProp] : afterProp
    });
    const isClickable = restProps.onClick || restProps.onClickCapture || restProps.href;
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
        Component: Component || (!isClickable ? 'section' : undefined),
        activeMode: platform === 'ios' ? 'opacity' : 'background',
        baseClassName: classNames("vkuiBanner__host", platform === 'ios' && "vkuiBanner__ios", mode === 'image' && "vkuiBanner__modeImage", size === 'm' && "vkuiBanner__sizeM", mode === 'image' && imageTheme === 'dark' && "vkuiBanner__inverted")
    }, restProps), {
        children: [
            content,
            after
        ]
    }));
};

//# sourceMappingURL=Banner.js.map