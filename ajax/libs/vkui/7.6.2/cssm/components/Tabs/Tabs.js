'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useTabsNavigation } from "../../hooks/useTabsNavigation.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { useTabsController } from "./TabsController.js";
import { TabsControllerContext } from "./TabsControllerContext.js";
import { TabsModeContext } from "./TabsModeContext.js";
import styles from "./Tabs.module.css";
/**
 * @see https://vkui.io/components/tabs
 */ export const Tabs = ({ children, mode = 'default', role = 'tablist', withScrollToSelectedTab, scrollBehaviorToSelectedTab = 'nearest', layoutFillMode = 'auto', selectedId, defaultSelectedId, onSelectedIdChange, ...restProps })=>{
    const controller = useTabsController({
        selectedId,
        defaultSelectedId,
        onSelectedIdChange
    });
    const platform = usePlatform();
    const direction = useConfigDirection();
    const isTabFlow = role === 'tablist';
    const withGaps = mode === 'accent' || mode === 'secondary';
    const { tabsRef } = useTabsNavigation(isTabFlow, direction === 'rtl');
    const tabsModeContext = React.useMemo(()=>({
            mode,
            withGaps,
            layoutFillMode,
            withScrollToSelectedTab,
            scrollBehaviorToSelectedTab
        }), [
        mode,
        withGaps,
        layoutFillMode,
        withScrollToSelectedTab,
        scrollBehaviorToSelectedTab
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles.host, 'vkuiInternalTabs', platform === 'vkcom' && 'vkuiInternalTabs--vkcom', withGaps && classNames(styles.withGaps, 'vkuiInternalTabs--withGaps'), mode === 'default' && styles.modeDefault),
        role: role,
        children: /*#__PURE__*/ _jsx("div", {
            className: styles.in,
            ref: tabsRef,
            children: /*#__PURE__*/ _jsx(TabsModeContext.Provider, {
                value: tabsModeContext,
                children: /*#__PURE__*/ _jsx(TabsControllerContext.Provider, {
                    value: controller,
                    children: children
                })
            })
        })
    });
};

//# sourceMappingURL=Tabs.js.map