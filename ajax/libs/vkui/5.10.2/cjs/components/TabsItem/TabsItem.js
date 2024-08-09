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
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useExternRef = require("../../hooks/useExternRef");
var _usePlatform = require("../../hooks/usePlatform");
var _usePrevious = require("../../hooks/usePrevious");
var _adaptivity = require("../../lib/adaptivity");
var _dom = require("../../lib/dom");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _Tabs = require("../Tabs/Tabs");
var _Tappable = require("../Tappable/Tappable");
var _Headline = require("../Typography/Headline/Headline");
var _Subhead = require("../Typography/Subhead/Subhead");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
var sizeYClassNames = _define_property._({
    none: "vkuiTabsItem--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiTabsItem--sizeY-compact");
var stylesMode = {
    default: "vkuiTabsItem--mode-default",
    accent: "vkuiTabsItem--mode-accent",
    secondary: "vkuiTabsItem--mode-secondary"
};
var fillModeClassNames = {
    stretched: "vkuiTabsItem--stretched",
    shrinked: "vkuiTabsItem--shrinked"
};
var warn = (0, _warnOnce.warnOnce)("TabsItem");
var TabsItem = function(_param) {
    var before = _param.before, children = _param.children, status = _param.status, after = _param.after, _param_selected = _param.selected, selected = _param_selected === void 0 ? false : _param_selected, className = _param.className, _param_role = _param.role, role = _param_role === void 0 ? "tab" : _param_role, tabIndexProp = _param.tabIndex, getRootRef = _param.getRootRef, restProps = _object_without_properties._(_param, [
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
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var _React_useContext = _react.useContext(_Tabs.TabsModeContext), mode = _React_useContext.mode, withGaps = _React_useContext.withGaps, layoutFillMode = _React_useContext.layoutFillMode, scrollBehaviorToSelectedTab = _React_useContext.scrollBehaviorToSelectedTab, withScrollToSelectedTab = _React_useContext.withScrollToSelectedTab;
    var statusComponent = null;
    var platform = (0, _usePlatform.usePlatform)();
    var isTabFlow = role === "tab";
    if ((0, _vkjs.hasReactNode)(status)) {
        statusComponent = typeof status === "number" ? /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
            Component: "span",
            className: (0, _vkjs.classNames)("vkuiTabsItem__status", "vkuiTabsItem__status--count"),
            weight: "2"
        }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, "\xa0"), status) : /*#__PURE__*/ _react.createElement("span", {
            className: "vkuiTabsItem__status"
        }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, "\xa0"), status);
    }
    if (process.env.NODE_ENV === "development" && isTabFlow) {
        if (!restProps["aria-controls"]) {
            warn('Передайте в "aria-controls" id контролируемого блока', "warn");
        } else if (!restProps["id"]) {
            warn('Передайте "id" компоненту для использования в "aria-labelledby" контролируемого блока', "warn");
        }
    }
    var tabIndex = tabIndexProp;
    if (isTabFlow && tabIndex === undefined) {
        tabIndex = selected ? 0 : -1;
    }
    var rootRef = (0, _useExternRef.useExternRef)(getRootRef);
    var prevSelected = (0, _usePrevious.usePrevious)(selected);
    var isInitialRender = prevSelected === undefined;
    var shouldScrollToSelected = withScrollToSelectedTab && !isInitialRender && prevSelected !== selected && selected;
    var document = (0, _dom.useDOM)().document;
    _react.useEffect(function scrollToSelectedItem() {
        if (!shouldScrollToSelected || !rootRef.current || !document) {
            return;
        }
        var tabDOMRect = rootRef.current.getBoundingClientRect();
        var isTabVerticallyOutsideOfViewport = tabDOMRect.top < 0 || tabDOMRect.bottom > document.documentElement.clientHeight;
        /* проверяем, возможен ли вертикальный скролл, а он возможен для scrollIntoView если
       * элемент вертикально вне зоны видимости */ if (isTabVerticallyOutsideOfViewport) {
            return;
        }
        /* Не все браузеры поддерживают используемые нами опции. */ try {
            rootRef.current.scrollIntoView({
                inline: scrollBehaviorToSelectedTab,
                block: "nearest",
                behavior: "smooth"
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
        className: (0, _vkjs.classNames)("vkuiTabsItem", mode && stylesMode[mode], selected && "vkuiTabsItem--selected", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], withGaps && "vkuiTabsItem--withGaps", layoutFillMode !== "auto" && fillModeClassNames[layoutFillMode], className),
        hoverMode: platform === _platform.Platform.IOS ? "" : "vkuiTabsItem--hover",
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
        level: mode === "default" ? "1" : "2",
        weight: "2"
    }, children), statusComponent, after && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTabsItem__after"
    }, after), mode === "default" && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTabsItem__underline",
        "aria-hidden": true,
        "data-selected": selected
    }));
};

//# sourceMappingURL=TabsItem.js.map