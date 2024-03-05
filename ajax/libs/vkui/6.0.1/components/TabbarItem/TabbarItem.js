import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames, hasReactNode, noop } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { COMMON_WARNINGS, warnOnce } from '../../lib/warnOnce';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import { Footnote } from '../Typography/Footnote/Footnote';
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
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({
        Component: Component
    }, restProps), {
        disabled: disabled,
        href: href,
        baseClassName: classNames("vkuiTabbarItem", platform === 'ios' && "vkuiTabbarItem--ios", platform === 'android' && "vkuiTabbarItem--android", selected && "vkuiTabbarItem--selected")
    }), /*#__PURE__*/ React.createElement(Tappable, {
        role: "presentation",
        disabled: disabled,
        activeMode: platform === 'ios' ? "vkuiTabbarItem__tappable--active" : 'background',
        activeEffectDelay: platform === 'ios' ? 0 : 300,
        hasHover: false,
        className: "vkuiTabbarItem__tappable",
        onClick: noop
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiTabbarItem__in"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiTabbarItem__icon"
    }, children, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiInternalTabbarItem__label"
    }, hasReactNode(indicator) && indicator)), text && /*#__PURE__*/ React.createElement(Footnote, {
        Component: "div",
        className: "vkuiTabbarItem__text",
        weight: "2"
    }, text)));
};

//# sourceMappingURL=TabbarItem.js.map