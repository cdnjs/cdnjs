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
    var { children, selected, indicator, text, href, Component = href ? 'a' : 'button', disabled } = _param, restProps = _object_without_properties(_param, [
        "children",
        "selected",
        "indicator",
        "text",
        "href",
        "Component",
        "disabled"
    ]);
    const platform = usePlatform();
    if (process.env.NODE_ENV === 'development') {
        const hasAccessibleName = text || restProps['aria-label'] || restProps['aria-labelledby'];
        if (!hasAccessibleName) {
            warn(COMMON_WARNINGS.a11y[Component === 'a' ? 'link-name' : 'button-name'], 'error');
        }
    }
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        Component: Component
    }, restProps), {
        disabled: disabled,
        href: href,
        baseClassName: classNames("vkuiTabbarItem__host", platform === 'ios' && "vkuiTabbarItem__ios", platform === 'android' && "vkuiTabbarItem__android", selected && "vkuiTabbarItem__selected"),
        children: [
            /*#__PURE__*/ _jsx(Tappable, {
                role: "presentation",
                disabled: disabled,
                activeMode: platform === 'ios' ? "vkuiTabbarItem__tappableActive" : 'background',
                activeEffectDelay: platform === 'ios' ? 0 : 300,
                hasHover: false,
                className: "vkuiTabbarItem__tappable",
                onClick: noop
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiTabbarItem__in",
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: "vkuiTabbarItem__icon",
                        children: [
                            children,
                            /*#__PURE__*/ _jsx("div", {
                                className: "vkuiInternalTabbarItem__label",
                                children: hasReactNode(indicator) && indicator
                            })
                        ]
                    }),
                    text && /*#__PURE__*/ _jsx(Footnote, {
                        Component: "div",
                        className: "vkuiTabbarItem__text",
                        weight: "2",
                        children: text
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=TabbarItem.js.map