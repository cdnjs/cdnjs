"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsModeContext = exports.Tabs = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _classNames = require("../../lib/classNames");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _warnOnce = require("../../lib/warnOnce");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _dom = require("../../lib/dom");
var _accessibility = require("../../lib/accessibility");
var _excluded = ["children", "mode", "getRootRef", "sizeX", "role"];
var warn = (0, _warnOnce.warnOnce)("Tabs");
var TabsModeContext = /*#__PURE__*/React.createContext({
  mode: "default",
  withGaps: false
});
exports.TabsModeContext = TabsModeContext;
var TabsComponent = function TabsComponent(_ref) {
  var children = _ref.children,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "default" : _ref$mode,
    getRootRef = _ref.getRootRef,
    sizeX = _ref.sizeX,
    _ref$role = _ref.role,
    role = _ref$role === void 0 ? "tablist" : _ref$role,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  var isTabFlow = role === "tablist";
  var tabsRef = React.useRef(null);
  if ((mode === "buttons" || mode === "segmented") && process.env.NODE_ENV === "development") {
    var expectedValueText = mode === "buttons" ? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \"secondary\"" : "компонент SegmentedControl";
    warn("mode=\"".concat(mode, "\" \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u043E \u0438 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E \u0432 5.0.0. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 ").concat(expectedValueText));
  }
  if (platform !== _platform.IOS && mode === "segmented") {
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
    var key = (0, _accessibility.pressedKey)(event);
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
  (0, _useGlobalEventListener.useGlobalEventListener)(document, "keydown", handleDocumentKeydown, {
    capture: true
  });
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)("Tabs", (platform === _platform.IOS || platform === _platform.VKCOM) && "Tabs--".concat(platform), "Tabs--".concat(mode), withGaps && "Tabs--withGaps", // TODO v5.0.0 новая адаптивность
    "Tabs--sizeX-".concat(sizeX)),
    role: role
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Tabs__in",
    ref: tabsRef
  }, (0, _jsxRuntime.createScopedElement)(TabsModeContext.Provider, {
    value: {
      mode: mode,
      withGaps: withGaps
    }
  }, children)));
};

/**
 * @see https://vkcom.github.io/VKUI/#/Tabs
 */
var Tabs = (0, _withAdaptivity.withAdaptivity)(TabsComponent, {
  sizeX: true
});
exports.Tabs = Tabs;
Tabs.displayName = "Tabs";
//# sourceMappingURL=Tabs.js.map