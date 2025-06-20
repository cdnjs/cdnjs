'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useTabsNavigation } from "../../hooks/useTabsNavigation.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
export const TabsModeContext = /*#__PURE__*/ React.createContext({
    mode: 'default',
    withGaps: false,
    layoutFillMode: 'auto',
    withScrollToSelectedTab: false,
    scrollBehaviorToSelectedTab: 'nearest'
});
/**
 * @see https://vkcom.github.io/VKUI/#/Tabs
 */ export const Tabs = (_param)=>{
    var { children, mode = 'default', role = 'tablist', withScrollToSelectedTab, scrollBehaviorToSelectedTab = 'nearest', layoutFillMode = 'auto' } = _param, restProps = _object_without_properties(_param, [
        "children",
        "mode",
        "role",
        "withScrollToSelectedTab",
        "scrollBehaviorToSelectedTab",
        "layoutFillMode"
    ]);
    const platform = usePlatform();
    const direction = useConfigDirection();
    const isTabFlow = role === 'tablist';
    const withGaps = mode === 'accent' || mode === 'secondary';
    const { tabsRef } = useTabsNavigation(isTabFlow, direction === 'rtl');
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiTabs__host", 'vkuiInternalTabs', platform === 'vkcom' && 'vkuiInternalTabs--vkcom', withGaps && classNames("vkuiTabs__withGaps", 'vkuiInternalTabs--withGaps'), mode === 'default' && "vkuiTabs__modeDefault"),
        role: role,
        children: /*#__PURE__*/ _jsx("div", {
            className: "vkuiTabs__in",
            ref: tabsRef,
            children: /*#__PURE__*/ _jsx(TabsModeContext.Provider, {
                value: {
                    mode,
                    withGaps,
                    layoutFillMode,
                    withScrollToSelectedTab,
                    scrollBehaviorToSelectedTab
                },
                children: children
            })
        })
    }));
};
// чтобы styleguidist не путал компонент
// с другими именованными экспортами
Tabs.displayName = 'Tabs';

//# sourceMappingURL=Tabs.js.map