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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _usePlatform = require("../../hooks/usePlatform");
var _accessibility = require("../../lib/accessibility");
var _dom = require("../../lib/dom");
var _platform = require("../../lib/platform");
var _RootComponent = require("../RootComponent/RootComponent");
var TabsModeContext = /*#__PURE__*/ _react.createContext({
    mode: "default",
    withGaps: false,
    layoutFillMode: "auto",
    withScrollToSelectedTab: false,
    scrollBehaviorToSelectedTab: "nearest"
});
var Tabs = function(_param) {
    var children = _param.children, _param_mode = _param.mode, mode = _param_mode === void 0 ? "default" : _param_mode, _param_role = _param.role, role = _param_role === void 0 ? "tablist" : _param_role, withScrollToSelectedTab = _param.withScrollToSelectedTab, _param_scrollBehaviorToSelectedTab = _param.scrollBehaviorToSelectedTab, scrollBehaviorToSelectedTab = _param_scrollBehaviorToSelectedTab === void 0 ? "nearest" : _param_scrollBehaviorToSelectedTab, _param_layoutFillMode = _param.layoutFillMode, layoutFillMode = _param_layoutFillMode === void 0 ? "auto" : _param_layoutFillMode, restProps = _object_without_properties._(_param, [
        "children",
        "mode",
        "role",
        "withScrollToSelectedTab",
        "scrollBehaviorToSelectedTab",
        "layoutFillMode"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var document = (0, _dom.useDOM)().document;
    var isTabFlow = role === "tablist";
    var tabsRef = _react.useRef(null);
    var withGaps = mode === "accent" || mode === "secondary";
    var getTabEls = function() {
        if (!tabsRef.current) {
            return [];
        }
        return Array.from(// eslint-disable-next-line no-restricted-properties
        tabsRef.current.querySelectorAll("[role=tab]:not([disabled])"));
    };
    var handleDocumentKeydown = function(event) {
        if (!document || !tabsRef.current || !isTabFlow) {
            return;
        }
        var key = (0, _accessibility.pressedKey)(event);
        switch(key){
            case "ArrowLeft":
            case "ArrowRight":
            case "End":
            case "Home":
                {
                    var tabEls = getTabEls();
                    var currentFocusedElIndex = tabEls.findIndex(function(el) {
                        return document.activeElement === el;
                    });
                    if (currentFocusedElIndex === -1) {
                        return;
                    }
                    var nextIndex = 0;
                    if (key === "Home") {
                        nextIndex = 0;
                    } else if (key === "End") {
                        nextIndex = tabEls.length - 1;
                    } else {
                        var offset = key === "ArrowRight" ? 1 : -1;
                        nextIndex = currentFocusedElIndex + offset;
                    }
                    var nextTabEl = tabEls[nextIndex];
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
      */ case "ArrowDown":
                {
                    var tabEls1 = getTabEls();
                    var currentFocusedEl = tabEls1.find(function(el) {
                        return document.activeElement === el;
                    });
                    if (!currentFocusedEl || currentFocusedEl.getAttribute("aria-selected") !== "true") {
                        return;
                    }
                    var relatedContentElId = currentFocusedEl.getAttribute("aria-controls");
                    if (!relatedContentElId) {
                        return;
                    }
                    // eslint-disable-next-line no-restricted-properties
                    var relatedContentEl = document.getElementById(relatedContentElId);
                    if (!relatedContentEl) {
                        return;
                    }
                    event.preventDefault();
                    relatedContentEl.focus();
                    break;
                }
            case "Space":
            case "Enter":
                {
                    var tabEls2 = getTabEls();
                    var currentFocusedEl1 = tabEls2.find(function(el) {
                        return document.activeElement === el;
                    });
                    if (currentFocusedEl1) {
                        currentFocusedEl1.click();
                    }
                }
        }
    };
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "keydown", handleDocumentKeydown, {
        capture: true
    });
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiTabs", "vkuiInternalTabs", platform === _platform.Platform.VKCOM && "vkuiInternalTabs--vkcom", withGaps && (0, _vkjs.classNames)("vkuiTabs--withGaps", "vkuiInternalTabs--withGaps"), mode === "default" && "vkuiTabs--mode-default"),
        role: role
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTabs__in",
        ref: tabsRef
    }, /*#__PURE__*/ _react.createElement(TabsModeContext.Provider, {
        value: {
            mode: mode,
            withGaps: withGaps,
            layoutFillMode: layoutFillMode,
            withScrollToSelectedTab: withScrollToSelectedTab,
            scrollBehaviorToSelectedTab: scrollBehaviorToSelectedTab
        }
    }, children)));
};

//# sourceMappingURL=Tabs.js.map