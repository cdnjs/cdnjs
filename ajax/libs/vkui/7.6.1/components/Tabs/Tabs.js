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
import { useTabsController } from "./TabsController.js";
import { TabsControllerContext } from "./TabsControllerContext.js";
import { TabsModeContext } from "./TabsModeContext.js";
/**
 * @see https://vkui.io/components/tabs
 */ export const Tabs = (_param)=>{
    var { children, mode = 'default', role = 'tablist', withScrollToSelectedTab, scrollBehaviorToSelectedTab = 'nearest', layoutFillMode = 'auto', selectedId, defaultSelectedId, onSelectedIdChange } = _param, restProps = _object_without_properties(_param, [
        "children",
        "mode",
        "role",
        "withScrollToSelectedTab",
        "scrollBehaviorToSelectedTab",
        "layoutFillMode",
        "selectedId",
        "defaultSelectedId",
        "onSelectedIdChange"
    ]);
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
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiTabs__host", 'vkuiInternalTabs', platform === 'vkcom' && 'vkuiInternalTabs--vkcom', withGaps && classNames("vkuiTabs__withGaps", 'vkuiInternalTabs--withGaps'), mode === 'default' && "vkuiTabs__modeDefault"),
        role: role,
        children: /*#__PURE__*/ _jsx("div", {
            className: "vkuiTabs__in",
            ref: tabsRef,
            children: /*#__PURE__*/ _jsx(TabsModeContext.Provider, {
                value: tabsModeContext,
                children: /*#__PURE__*/ _jsx(TabsControllerContext.Provider, {
                    value: controller,
                    children: children
                })
            })
        })
    }));
};

//# sourceMappingURL=Tabs.js.map