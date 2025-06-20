'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useTabsNavigation } from "../../hooks/useTabsNavigation.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./Tabs.module.css";
export const TabsModeContext = /*#__PURE__*/ React.createContext({
    mode: 'default',
    withGaps: false,
    layoutFillMode: 'auto',
    withScrollToSelectedTab: false,
    scrollBehaviorToSelectedTab: 'nearest'
});
/**
 * @see https://vkcom.github.io/VKUI/#/Tabs
 */ export const Tabs = ({ children, mode = 'default', role = 'tablist', withScrollToSelectedTab, scrollBehaviorToSelectedTab = 'nearest', layoutFillMode = 'auto', ...restProps })=>{
    const platform = usePlatform();
    const direction = useConfigDirection();
    const isTabFlow = role === 'tablist';
    const withGaps = mode === 'accent' || mode === 'secondary';
    const { tabsRef } = useTabsNavigation(isTabFlow, direction === 'rtl');
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles.host, 'vkuiInternalTabs', platform === 'vkcom' && 'vkuiInternalTabs--vkcom', withGaps && classNames(styles.withGaps, 'vkuiInternalTabs--withGaps'), mode === 'default' && styles.modeDefault),
        role: role,
        children: /*#__PURE__*/ _jsx("div", {
            className: styles.in,
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
    });
};
// чтобы styleguidist не путал компонент
// с другими именованными экспортами
Tabs.displayName = 'Tabs';

//# sourceMappingURL=Tabs.js.map