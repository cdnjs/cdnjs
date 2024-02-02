import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { usePlatform } from "../../hooks/usePlatform";
import { pressedKey } from "../../lib/accessibility";
import { useDOM } from "../../lib/dom";
import { Platform } from "../../lib/platform";
import { RootComponent } from "../RootComponent/RootComponent";
export var TabsModeContext = /*#__PURE__*/ React.createContext({
    mode: "default",
    withGaps: false,
    layoutFillMode: "auto",
    withScrollToSelectedTab: false,
    scrollBehaviorToSelectedTab: "nearest"
});
/**
 * @see https://vkcom.github.io/VKUI/#/Tabs
 */ export var Tabs = function(_param) {
    var children = _param.children, _param_mode = _param.mode, mode = _param_mode === void 0 ? "default" : _param_mode, _param_role = _param.role, role = _param_role === void 0 ? "tablist" : _param_role, withScrollToSelectedTab = _param.withScrollToSelectedTab, _param_scrollBehaviorToSelectedTab = _param.scrollBehaviorToSelectedTab, scrollBehaviorToSelectedTab = _param_scrollBehaviorToSelectedTab === void 0 ? "nearest" : _param_scrollBehaviorToSelectedTab, _param_layoutFillMode = _param.layoutFillMode, layoutFillMode = _param_layoutFillMode === void 0 ? "auto" : _param_layoutFillMode, restProps = _object_without_properties(_param, [
        "children",
        "mode",
        "role",
        "withScrollToSelectedTab",
        "scrollBehaviorToSelectedTab",
        "layoutFillMode"
    ]);
    var platform = usePlatform();
    var document = useDOM().document;
    var isTabFlow = role === "tablist";
    var tabsRef = React.useRef(null);
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
        var key = pressedKey(event);
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
    useGlobalEventListener(document, "keydown", handleDocumentKeydown, {
        capture: true
    });
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiTabs", "vkuiInternalTabs", platform === Platform.VKCOM && "vkuiInternalTabs--vkcom", withGaps && classNames("vkuiTabs--withGaps", "vkuiInternalTabs--withGaps"), mode === "default" && "vkuiTabs--mode-default"),
        role: role
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiTabs__in",
        ref: tabsRef
    }, /*#__PURE__*/ React.createElement(TabsModeContext.Provider, {
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