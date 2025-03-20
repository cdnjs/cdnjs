import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { usePrevious } from '../../hooks/usePrevious';
import { useDOM } from '../../lib/dom';
import { warnOnce } from '../../lib/warnOnce';
import { TabsModeContext } from '../Tabs/Tabs';
import { Tappable } from '../Tappable/Tappable';
import { Headline } from '../Typography/Headline/Headline';
import { Subhead } from '../Typography/Subhead/Subhead';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
const sizeYClassNames = {
    none: "vkuiTabsItem--sizeY-none",
    compact: "vkuiTabsItem--sizeY-compact"
};
const stylesMode = {
    default: "vkuiTabsItem--mode-default",
    accent: "vkuiTabsItem--mode-accent",
    secondary: "vkuiTabsItem--mode-secondary"
};
const fillModeClassNames = {
    stretched: "vkuiTabsItem--stretched",
    shrinked: "vkuiTabsItem--shrinked"
};
const warn = warnOnce('TabsItem');
/**
 * @see https://vkcom.github.io/VKUI/#/TabsItem
 */ export const TabsItem = (_param)=>{
    var { before, children, status, after, selected = false, className, role = 'tab', tabIndex: tabIndexProp, getRootRef, hoverMode = "vkuiTabsItem--hover", activeMode = '', hovered, activated, hasHover, hasActive = false, focusVisibleMode = 'inside' } = _param, restProps = _object_without_properties(_param, [
        "before",
        "children",
        "status",
        "after",
        "selected",
        "className",
        "role",
        "tabIndex",
        "getRootRef",
        "hoverMode",
        "activeMode",
        "hovered",
        "activated",
        "hasHover",
        "hasActive",
        "focusVisibleMode"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const { mode, withGaps, layoutFillMode, scrollBehaviorToSelectedTab, withScrollToSelectedTab } = React.useContext(TabsModeContext);
    let statusComponent = null;
    const isTabFlow = role === 'tab';
    if (hasReactNode(status)) {
        statusComponent = typeof status === 'number' ? /*#__PURE__*/ _jsxs(Subhead, {
            Component: "span",
            className: classNames("vkuiTabsItem__status", "vkuiTabsItem__status--count"),
            weight: "2",
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: " "
                }),
                status
            ]
        }) : /*#__PURE__*/ _jsxs("span", {
            className: "vkuiTabsItem__status",
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: " "
                }),
                status
            ]
        });
    }
    if (process.env.NODE_ENV === 'development' && isTabFlow) {
        if (!restProps['aria-controls']) {
            warn(`Передайте в "aria-controls" id контролируемого блока`, 'warn');
        } else if (!restProps['id']) {
            warn(`Передайте "id" компоненту для использования в "aria-labelledby" контролируемого блока`, 'warn');
        }
    }
    let tabIndex = tabIndexProp;
    if (isTabFlow && tabIndex === undefined) {
        tabIndex = selected ? 0 : -1;
    }
    const rootRef = useExternRef(getRootRef);
    const prevSelected = usePrevious(selected);
    const isInitialRender = prevSelected === undefined;
    const shouldScrollToSelected = withScrollToSelectedTab && !isInitialRender && prevSelected !== selected && selected;
    const { document } = useDOM();
    React.useEffect(function scrollToSelectedItem() {
        if (!shouldScrollToSelected || !rootRef.current || !document) {
            return;
        }
        const tabDOMRect = rootRef.current.getBoundingClientRect();
        const isTabVerticallyOutsideOfViewport = tabDOMRect.top < 0 || tabDOMRect.bottom > document.documentElement.clientHeight;
        /* проверяем, возможен ли вертикальный скролл, а он возможен для scrollIntoView если
       * элемент вертикально вне зоны видимости */ if (isTabVerticallyOutsideOfViewport) {
            return;
        }
        /* Не все браузеры поддерживают используемые нами опции. */ try {
            rootRef.current.scrollIntoView({
                inline: scrollBehaviorToSelectedTab,
                block: 'nearest',
                behavior: 'smooth'
            });
        } catch (e) {
        /* Вызывать scrollIntoView с булевым аргументом не следует, потому что это повлечёт
         * вертикальный скролл.
         **/ }
    }, [
        rootRef,
        document,
        shouldScrollToSelected,
        scrollBehaviorToSelectedTab
    ]);
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({}, restProps), {
        getRootRef: rootRef,
        className: classNames("vkuiTabsItem", mode && stylesMode[mode], selected && "vkuiTabsItem--selected", sizeY !== 'regular' && sizeYClassNames[sizeY], withGaps && "vkuiTabsItem--withGaps", layoutFillMode !== 'auto' && fillModeClassNames[layoutFillMode], className),
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        hovered: hovered,
        activated: activated,
        focusVisibleMode: focusVisibleMode,
        role: role,
        "aria-selected": selected,
        tabIndex: tabIndex,
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: "vkuiTabsItem__before",
                children: before
            }),
            /*#__PURE__*/ _jsx(Headline, {
                Component: "span",
                className: "vkuiTabsItem__label",
                level: mode === 'default' ? '1' : '2',
                weight: "2",
                children: children
            }),
            statusComponent,
            after && /*#__PURE__*/ _jsx("div", {
                className: "vkuiTabsItem__after",
                children: after
            }),
            mode === 'default' && /*#__PURE__*/ _jsx("div", {
                className: "vkuiTabsItem__underline",
                "aria-hidden": true,
                "data-selected": selected
            })
        ]
    }));
};

//# sourceMappingURL=TabsItem.js.map