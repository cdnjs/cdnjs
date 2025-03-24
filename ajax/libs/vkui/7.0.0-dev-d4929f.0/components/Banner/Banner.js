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
    var { mode = 'tint', imageTheme = 'dark', size = 's', before, after: afterProp, title, subtitle, extraSubtitle, children, background, actions, onDismiss, dismissLabel = 'Скрыть', className, Component } = _param, restProps = _object_without_properties(_param, [
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
        "className",
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
                className: "Banner__bg--wfxmR",
                children: background
            }),
            before && /*#__PURE__*/ _jsx("div", {
                className: "Banner__before--DKz96",
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "Banner__content--Qs3ta",
                children: [
                    hasReactNode(title) && /*#__PURE__*/ _jsx(HeaderTypography, {
                        Component: "div",
                        weight: "2",
                        level: size === 'm' ? '2' : '1',
                        children: title
                    }),
                    hasReactNode(subtitle) && /*#__PURE__*/ _jsx(SubheadTypography, {
                        Component: "div",
                        className: "Banner__subtitle--Uxvfc",
                        children: subtitle
                    }),
                    hasReactNode(extraSubtitle) && /*#__PURE__*/ _jsx(Text, {
                        Component: "div",
                        className: "Banner__extraSubtitle--Q6Hh8",
                        children: extraSubtitle
                    }),
                    hasReactNode(actions) && React.Children.count(actions) > 0 && /*#__PURE__*/ _jsx("div", {
                        className: "Banner__actions--ueZpu",
                        children: actions
                    })
                ]
            })
        ]
    });
    const afterMap = {
        chevron: /*#__PURE__*/ _jsx(Icon24Chevron, {
            className: "Banner__chevron--Gj-FD"
        }),
        dismiss: /*#__PURE__*/ _jsx(IconButton, {
            label: dismissLabel,
            className: "Banner__dismiss--K2bzH",
            onClick: onDismiss,
            hoverMode: "opacity",
            hasActive: false,
            children: platform === 'ios' ? /*#__PURE__*/ _jsx(IconDismissIOS, {}) : /*#__PURE__*/ _jsx(Icon24Cancel, {})
        })
    };
    const after = afterProp && /*#__PURE__*/ _jsx("div", {
        className: "Banner__after--YP95V",
        children: typeof afterProp === 'string' ? afterMap[afterProp] : afterProp
    });
    const isClickable = restProps.onClick || restProps.onClickCapture || restProps.href;
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
        Component: Component || (!isClickable ? 'section' : undefined),
        activeMode: platform === 'ios' ? 'opacity' : 'background',
        baseClassName: classNames("Banner__host--j3xCP", platform === 'ios' && "Banner__ios--zv-J0", mode === 'image' && "Banner__modeImage--mtYjW", size === 'm' && "Banner__sizeM--nvXdF", mode === 'image' && imageTheme === 'dark' && "Banner__inverted--9ZyQ3", className)
    }, restProps), {
        children: [
            content,
            after
        ]
    }));
};

//# sourceMappingURL=Banner.js.map