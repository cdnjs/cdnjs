'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { usePrevious } from "../../hooks/usePrevious.js";
import { useDOM } from "../../lib/dom.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { TabsControllerContext } from "../Tabs/TabsControllerContext.js";
import { TabsModeContext } from "../Tabs/TabsModeContext.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./TabsItem.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
const stylesMode = {
    default: styles.modeDefault,
    accent: styles.modeAccent,
    secondary: styles.modeSecondary
};
const fillModeClassNames = {
    stretched: styles.stretched,
    shrinked: styles.shrinked
};
const warn = warnOnce('TabsItem');
/**
 * @see https://vkui.io/components/tabs#tabs-item
 */ export const TabsItem = ({ before, children, status, after, selected: selectedProp = false, role = 'tab', tabIndex: tabIndexProp, getRootRef, hoverMode = styles.hover, activeMode = '', hasActive = false, focusVisibleMode = 'inside', id, onClick, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const { mode, withGaps, layoutFillMode, scrollBehaviorToSelectedTab, withScrollToSelectedTab } = React.useContext(TabsModeContext);
    const controller = React.useContext(TabsControllerContext);
    let statusComponent = null;
    const isTabFlow = role === 'tab';
    const selected = selectedProp || !!id && controller?.selectedTab === id;
    if (hasReactNode(status)) {
        statusComponent = typeof status === 'number' ? /*#__PURE__*/ _jsxs(Subhead, {
            Component: "span",
            className: classNames(styles.status, styles.statusCount),
            weight: "2",
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: " "
                }),
                status
            ]
        }) : /*#__PURE__*/ _jsxs("span", {
            className: styles.status,
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
        } else if (!id) {
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
        } catch  {
        /* Вызывать scrollIntoView с булевым аргументом не следует, потому что это повлечёт
         * вертикальный скролл.
         **/ }
    }, [
        rootRef,
        document,
        shouldScrollToSelected,
        scrollBehaviorToSelectedTab
    ]);
    const _onClick = React.useCallback((e)=>{
        onClick?.(e);
        if (id) {
            controller?.onChange(id);
        }
    }, [
        id,
        onClick,
        controller
    ]);
    return /*#__PURE__*/ _jsxs(Tappable, {
        getRootRef: rootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode,
        role: role,
        "aria-selected": selected,
        tabIndex: tabIndex,
        baseClassName: classNames(styles.host, mode && stylesMode[mode], selected && styles.selected, sizeY !== 'regular' && sizeYClassNames[sizeY], withGaps && styles.withGaps, layoutFillMode !== 'auto' && fillModeClassNames[layoutFillMode]),
        onClick: controller ? _onClick : onClick,
        id: id,
        ...restProps,
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: styles.before,
                children: before
            }),
            /*#__PURE__*/ _jsx(Headline, {
                Component: "span",
                className: styles.label,
                level: mode === 'default' ? '1' : '2',
                weight: "2",
                children: children
            }),
            statusComponent,
            after && /*#__PURE__*/ _jsx("div", {
                className: styles.after,
                children: after
            }),
            mode === 'default' && /*#__PURE__*/ _jsx("div", {
                className: styles.underline,
                "aria-hidden": true,
                "data-selected": selected
            })
        ]
    });
};

//# sourceMappingURL=TabsItem.js.map