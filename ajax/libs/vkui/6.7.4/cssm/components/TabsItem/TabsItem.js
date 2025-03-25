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
import styles from './TabsItem.module.css';
const sizeYClassNames = {
    none: styles['TabsItem--sizeY-none'],
    compact: styles['TabsItem--sizeY-compact']
};
const stylesMode = {
    default: styles['TabsItem--mode-default'],
    accent: styles['TabsItem--mode-accent'],
    secondary: styles['TabsItem--mode-secondary']
};
const fillModeClassNames = {
    stretched: styles['TabsItem--stretched'],
    shrinked: styles['TabsItem--shrinked']
};
const warn = warnOnce('TabsItem');
/**
 * @see https://vkcom.github.io/VKUI/#/TabsItem
 */ export const TabsItem = ({ before, children, status, after, selected = false, className, role = 'tab', tabIndex: tabIndexProp, getRootRef, hoverMode = styles['TabsItem--hover'], activeMode = '', hovered, activated, hasHover, hasActive = false, focusVisibleMode = 'inside', ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const { mode, withGaps, layoutFillMode, scrollBehaviorToSelectedTab, withScrollToSelectedTab } = React.useContext(TabsModeContext);
    let statusComponent = null;
    const isTabFlow = role === 'tab';
    if (hasReactNode(status)) {
        statusComponent = typeof status === 'number' ? /*#__PURE__*/ _jsxs(Subhead, {
            Component: "span",
            className: classNames(styles['TabsItem__status'], styles['TabsItem__status--count']),
            weight: "2",
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: " "
                }),
                status
            ]
        }) : /*#__PURE__*/ _jsxs("span", {
            className: styles['TabsItem__status'],
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
    return /*#__PURE__*/ _jsxs(Tappable, {
        ...restProps,
        getRootRef: rootRef,
        className: classNames(styles['TabsItem'], mode && stylesMode[mode], selected && styles['TabsItem--selected'], sizeY !== 'regular' && sizeYClassNames[sizeY], withGaps && styles['TabsItem--withGaps'], layoutFillMode !== 'auto' && fillModeClassNames[layoutFillMode], className),
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
                className: styles['TabsItem__before'],
                children: before
            }),
            /*#__PURE__*/ _jsx(Headline, {
                Component: "span",
                className: styles['TabsItem__label'],
                level: mode === 'default' ? '1' : '2',
                weight: "2",
                children: children
            }),
            statusComponent,
            after && /*#__PURE__*/ _jsx("div", {
                className: styles['TabsItem__after'],
                children: after
            }),
            mode === 'default' && /*#__PURE__*/ _jsx("div", {
                className: styles['TabsItem__underline'],
                "aria-hidden": true,
                "data-selected": selected
            })
        ]
    });
};

//# sourceMappingURL=TabsItem.js.map