import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "mode", "getRootRef", "sizeX", "role"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { IOS, VKCOM } from "../../lib/platform";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { warnOnce } from "../../lib/warnOnce";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { useDOM } from "../../lib/dom";
import { pressedKey } from "../../lib/accessibility";
var warn = warnOnce("Tabs");
export var TabsModeContext = /*#__PURE__*/React.createContext({
  mode: "default",
  withGaps: false
});
var TabsComponent = function TabsComponent(_ref) {
  var children = _ref.children,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "default" : _ref$mode,
    getRootRef = _ref.getRootRef,
    sizeX = _ref.sizeX,
    _ref$role = _ref.role,
    role = _ref$role === void 0 ? "tablist" : _ref$role,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useDOM = useDOM(),
    document = _useDOM.document;
  var isTabFlow = role === "tablist";
  var tabsRef = React.useRef(null);
  if ((mode === "buttons" || mode === "segmented") && process.env.NODE_ENV === "development") {
    var expectedValueText = mode === "buttons" ? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \"secondary\"" : "компонент SegmentedControl";
    warn("mode=\"".concat(mode, "\" \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u043E \u0438 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E \u0432 5.0.0. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 ").concat(expectedValueText));
  }
  if (platform !== IOS && mode === "segmented") {
    mode = "default";
  }
  if (mode === "buttons") {
    mode = "secondary";
  }
  var withGaps = mode === "accent" || mode === "secondary";
  var getTabEls = function getTabEls() {
    if (!tabsRef.current) {
      return [];
    }
    return Array.from(
    // eslint-disable-next-line no-restricted-properties
    tabsRef.current.querySelectorAll("[role=tab]:not([disabled])"));
  };
  var handleDocumentKeydown = function handleDocumentKeydown(event) {
    if (!document || !tabsRef.current || !isTabFlow) {
      return;
    }
    var key = pressedKey(event);
    switch (key) {
      case "ArrowLeft":
      case "ArrowRight":
      case "End":
      case "Home":
        {
          var tabEls = getTabEls();
          var currentFocusedElIndex = tabEls.findIndex(function (el) {
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
      */
      case "ArrowDown":
        {
          var _tabEls = getTabEls();
          var currentFocusedEl = _tabEls.find(function (el) {
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
          var _tabEls2 = getTabEls();
          var _currentFocusedEl = _tabEls2.find(function (el) {
            return document.activeElement === el;
          });
          if (_currentFocusedEl) {
            _currentFocusedEl.click();
          }
        }
    }
  };
  useGlobalEventListener(document, "keydown", handleDocumentKeydown, {
    capture: true
  });
  return createScopedElement("div", _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames("Tabs", (platform === IOS || platform === VKCOM) && "Tabs--".concat(platform), "Tabs--".concat(mode), withGaps && "Tabs--withGaps", // TODO v5.0.0 новая адаптивность
    "Tabs--sizeX-".concat(sizeX)),
    role: role
  }), createScopedElement("div", {
    vkuiClass: "Tabs__in",
    ref: tabsRef
  }, createScopedElement(TabsModeContext.Provider, {
    value: {
      mode: mode,
      withGaps: withGaps
    }
  }, children)));
};

/**
 * @see https://vkcom.github.io/VKUI/#/Tabs
 */
export var Tabs = withAdaptivity(TabsComponent, {
  sizeX: true
});
Tabs.displayName = "Tabs";
//# sourceMappingURL=Tabs.js.map