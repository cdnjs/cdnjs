'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode, noop } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { COMMON_WARNINGS, warnOnce } from "../../lib/warnOnce.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
const warn = warnOnce('TabbarItem');
/**
 * @see https://vkcom.github.io/VKUI/#/TabbarItem
 */ export const TabbarItem = (_param)=>{
    var { children, selected, indicator, label, href, Component = href ? 'a' : 'button', disabled } = _param, restProps = _object_without_properties(_param, [
        "children",
        "selected",
        "indicator",
        "label",
        "href",
        "Component",
        "disabled"
    ]);
    const platform = usePlatform();
    if (process.env.NODE_ENV === 'development') {
        const hasAccessibleName = label || restProps['aria-label'] || restProps['aria-labelledby'];
        if (!hasAccessibleName) {
            warn(COMMON_WARNINGS.a11y[Component === 'a' ? 'link-name' : 'button-name'], 'error');
        }
    }
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        Component: Component
    }, restProps), {
        disabled: disabled,
        href: href,
        baseClassName: classNames("TabbarItem__host--uUz6M", platform === 'ios' && "TabbarItem__ios---NXjA", platform === 'android' && "TabbarItem__android--X8i34", selected && "TabbarItem__selected--yBwYz"),
        children: [
            /*#__PURE__*/ _jsx(Tappable, {
                role: "presentation",
                disabled: disabled,
                activeMode: platform === 'ios' ? "TabbarItem__tappableActive--8melb" : 'background',
                activeEffectDelay: platform === 'ios' ? 0 : 300,
                hasHover: false,
                className: "TabbarItem__tappable--jxCsT",
                onClick: noop
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "TabbarItem__in--LrXma",
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: "TabbarItem__icon--9uGS8",
                        children: [
                            children,
                            /*#__PURE__*/ _jsx("div", {
                                className: "vkuiInternalTabbarItem__label",
                                children: hasReactNode(indicator) && indicator
                            })
                        ]
                    }),
                    label && /*#__PURE__*/ _jsx(Footnote, {
                        Component: "div",
                        className: "TabbarItem__label--BH47O",
                        weight: "2",
                        children: label
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=TabbarItem.js.map