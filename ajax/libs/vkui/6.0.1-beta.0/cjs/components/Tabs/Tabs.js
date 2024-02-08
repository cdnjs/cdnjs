"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Tabs: function() {
        return Tabs;
    },
    TabsModeContext: function() {
        return TabsModeContext;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
const _usePlatform = require("../../hooks/usePlatform");
const _accessibility = require("../../lib/accessibility");
const _dom = require("../../lib/dom");
const _RootComponent = require("../RootComponent/RootComponent");
const TabsModeContext = /*#__PURE__*/ _react.createContext({
    mode: 'default',
    withGaps: false,
    layoutFillMode: 'auto',
    withScrollToSelectedTab: false,
    scrollBehaviorToSelectedTab: 'nearest'
});
const Tabs = (_param)=>{
    var { children, mode = 'default', role = 'tablist', withScrollToSelectedTab, scrollBehaviorToSelectedTab = 'nearest', layoutFillMode = 'auto' } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "mode",
        "role",
        "withScrollToSelectedTab",
        "scrollBehaviorToSelectedTab",
        "layoutFillMode"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const { document } = (0, _dom.useDOM)();
    const isTabFlow = role === 'tablist';
    const tabsRef = _react.useRef(null);
    const withGaps = mode === 'accent' || mode === 'secondary';
    const getTabEls = ()=>{
        if (!tabsRef.current) {
            return [];
        }
        return Array.from(// eslint-disable-next-line no-restricted-properties
        tabsRef.current.querySelectorAll('[role=tab]:not([disabled])'));
    };
    const handleDocumentKeydown = (event)=>{
        if (!document || !tabsRef.current || !isTabFlow) {
            return;
        }
        const key = (0, _accessibility.pressedKey)(event);
        switch(key){
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'End':
            case 'Home':
                {
                    const tabEls = getTabEls();
                    const currentFocusedElIndex = tabEls.findIndex((el)=>document.activeElement === el);
                    if (currentFocusedElIndex === -1) {
                        return;
                    }
                    let nextIndex = 0;
                    if (key === 'Home') {
                        nextIndex = 0;
                    } else if (key === 'End') {
                        nextIndex = tabEls.length - 1;
                    } else {
                        const offset = key === 'ArrowRight' ? 1 : -1;
                        nextIndex = currentFocusedElIndex + offset;
                    }
                    const nextTabEl = tabEls[nextIndex];
                    if (nextTabEl) {
                        event.preventDefault();
                        nextTabEl.focus();
                    }
                    break;
                }
            /*
       В JAWS и NVDA стрелка вниз активирует контент.
       Это не прописано в стандартах, но по ссылке ниже это рекомендуется делать.
       https://inclusive-components.design/tabbed-interfaces/
      */ case 'ArrowDown':
                {
                    const tabEls = getTabEls();
                    const currentFocusedEl = tabEls.find((el)=>document.activeElement === el);
                    if (!currentFocusedEl || currentFocusedEl.getAttribute('aria-selected') !== 'true') {
                        return;
                    }
                    const relatedContentElId = currentFocusedEl.getAttribute('aria-controls');
                    if (!relatedContentElId) {
                        return;
                    }
                    // eslint-disable-next-line no-restricted-properties
                    const relatedContentEl = document.getElementById(relatedContentElId);
                    if (!relatedContentEl) {
                        return;
                    }
                    event.preventDefault();
                    relatedContentEl.focus();
                    break;
                }
            case 'Space':
            case 'Enter':
                {
                    const tabEls = getTabEls();
                    const currentFocusedEl = tabEls.find((el)=>document.activeElement === el);
                    if (currentFocusedEl) {
                        currentFocusedEl.click();
                    }
                }
        }
    };
    (0, _useGlobalEventListener.useGlobalEventListener)(document, 'keydown', handleDocumentKeydown, {
        capture: true
    });
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiTabs", 'vkuiInternalTabs', platform === 'vkcom' && 'vkuiInternalTabs--vkcom', withGaps && (0, _vkjs.classNames)("vkuiTabs--withGaps", 'vkuiInternalTabs--withGaps'), mode === 'default' && "vkuiTabs--mode-default"),
        role: role
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTabs__in",
        ref: tabsRef
    }, /*#__PURE__*/ _react.createElement(TabsModeContext.Provider, {
        value: {
            mode,
            withGaps,
            layoutFillMode,
            withScrollToSelectedTab,
            scrollBehaviorToSelectedTab
        }
    }, children)));
};

//# sourceMappingURL=Tabs.js.map