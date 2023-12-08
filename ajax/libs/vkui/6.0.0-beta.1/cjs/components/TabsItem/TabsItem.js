"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TabsItem", {
    enumerable: true,
    get: function() {
        return TabsItem;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useExternRef = require("../../hooks/useExternRef");
const _usePrevious = require("../../hooks/usePrevious");
const _dom = require("../../lib/dom");
const _warnOnce = require("../../lib/warnOnce");
const _Tabs = require("../Tabs/Tabs");
const _Tappable = require("../Tappable/Tappable");
const _Headline = require("../Typography/Headline/Headline");
const _Subhead = require("../Typography/Subhead/Subhead");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const sizeYClassNames = {
    none: "vkuiTabsItem--sizeY-none",
    ['compact']: "vkuiTabsItem--sizeY-compact"
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
const warn = (0, _warnOnce.warnOnce)('TabsItem');
const TabsItem = (_param)=>{
    var { before, children, status, after, selected = false, className, role = 'tab', tabIndex: tabIndexProp, getRootRef } = _param, restProps = _object_without_properties._(_param, [
        "before",
        "children",
        "status",
        "after",
        "selected",
        "className",
        "role",
        "tabIndex",
        "getRootRef"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const { mode, withGaps, layoutFillMode, scrollBehaviorToSelectedTab, withScrollToSelectedTab } = _react.useContext(_Tabs.TabsModeContext);
    let statusComponent = null;
    const isTabFlow = role === 'tab';
    if ((0, _vkjs.hasReactNode)(status)) {
        statusComponent = typeof status === 'number' ? /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
            Component: "span",
            className: (0, _vkjs.classNames)("vkuiTabsItem__status", "vkuiTabsItem__status--count"),
            weight: "2"
        }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, " "), status) : /*#__PURE__*/ _react.createElement("span", {
            className: "vkuiTabsItem__status"
        }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, " "), status);
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
    const rootRef = (0, _useExternRef.useExternRef)(getRootRef);
    const prevSelected = (0, _usePrevious.usePrevious)(selected);
    const isInitialRender = prevSelected === undefined;
    const shouldScrollToSelected = withScrollToSelectedTab && !isInitialRender && prevSelected !== selected && selected;
    const { document } = (0, _dom.useDOM)();
    _react.useEffect(function scrollToSelectedItem() {
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
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, restProps), {
        getRootRef: rootRef,
        className: (0, _vkjs.classNames)("vkuiTabsItem", mode && stylesMode[mode], selected && "vkuiTabsItem--selected", sizeY !== 'regular' && sizeYClassNames[sizeY], withGaps && "vkuiTabsItem--withGaps", layoutFillMode !== 'auto' && fillModeClassNames[layoutFillMode], className),
        hoverMode: "vkuiTabsItem--hover",
        activeMode: "",
        focusVisibleMode: "inside",
        hasActive: false,
        role: role,
        "aria-selected": selected,
        tabIndex: tabIndex
    }), before && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTabsItem__before"
    }, before), /*#__PURE__*/ _react.createElement(_Headline.Headline, {
        Component: "span",
        className: "vkuiTabsItem__label",
        level: mode === 'default' ? '1' : '2',
        weight: "2"
    }, children), statusComponent, after && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTabsItem__after"
    }, after), mode === 'default' && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTabsItem__underline",
        "aria-hidden": true,
        "data-selected": selected
    }));
};

//# sourceMappingURL=TabsItem.js.map