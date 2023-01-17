"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsModeContext = exports.Tabs = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _dom = require("../../lib/dom");
var _accessibility = require("../../lib/accessibility");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _getSizeXClassName = require("../../helpers/getSizeXClassName");
var _excluded = ["children", "mode", "getRootRef", "className", "role"];
var TabsModeContext = /*#__PURE__*/React.createContext({
  mode: 'default',
  withGaps: false
});

/**
 * @see https://vkcom.github.io/VKUI/#/Tabs
 */
exports.TabsModeContext = TabsModeContext;
var Tabs = function Tabs(_ref) {
  var children = _ref.children,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'default' : _ref$mode,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    _ref$role = _ref.role,
    role = _ref$role === void 0 ? 'tablist' : _ref$role,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeX = _useAdaptivity.sizeX;
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  var isTabFlow = role === 'tablist';
  var tabsRef = React.useRef(null);
  var withGaps = mode === 'accent' || mode === 'secondary';
  var getTabEls = function getTabEls() {
    if (!tabsRef.current) {
      return [];
    }
    return Array.from(
    // eslint-disable-next-line no-restricted-properties
    tabsRef.current.querySelectorAll('[role=tab]:not([disabled])'));
  };
  var handleDocumentKeydown = function handleDocumentKeydown(event) {
    if (!document || !tabsRef.current || !isTabFlow) {
      return;
    }
    var key = (0, _accessibility.pressedKey)(event);
    switch (key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'End':
      case 'Home':
        {
          var tabEls = getTabEls();
          var currentFocusedElIndex = tabEls.findIndex(function (el) {
            return document.activeElement === el;
          });
          if (currentFocusedElIndex === -1) {
            return;
          }
          var nextIndex = 0;
          if (key === 'Home') {
            nextIndex = 0;
          } else if (key === 'End') {
            nextIndex = tabEls.length - 1;
          } else {
            var offset = key === 'ArrowRight' ? 1 : -1;
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
      case 'ArrowDown':
        {
          var _tabEls = getTabEls();
          var currentFocusedEl = _tabEls.find(function (el) {
            return document.activeElement === el;
          });
          if (!currentFocusedEl || currentFocusedEl.getAttribute('aria-selected') !== 'true') {
            return;
          }
          var relatedContentElId = currentFocusedEl.getAttribute('aria-controls');
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
      case 'Space':
      case 'Enter':
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
  (0, _useGlobalEventListener.useGlobalEventListener)(document, 'keydown', handleDocumentKeydown, {
    capture: true
  });
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    className: (0, _vkjs.classNames)("vkuiTabs", platform === _platform.Platform.VKCOM && styles["Tabs--".concat(platform)], (0, _getSizeXClassName.getSizeXClassName)("vkuiTabs", sizeX), withGaps && "vkuiTabs--withGaps", styles["Tabs--mode-".concat(mode)], className),
    role: role
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiTabs__in",
    ref: tabsRef
  }, /*#__PURE__*/React.createElement(TabsModeContext.Provider, {
    value: {
      mode: mode,
      withGaps: withGaps
    }
  }, children)));
};
exports.Tabs = Tabs;
var styles = {
  "Tabs--withGaps": "vkuiTabs--withGaps",
  "Tabs--mode-default": "vkuiTabs--mode-default",
  "Tabs--buttons": "vkuiTabs--buttons",
  "Tabs--sizeX-compact": "vkuiTabs--sizeX-compact",
  "Tabs--sizeX-none": "vkuiTabs--sizeX-none",
  "Tabs--mode-accent": "vkuiTabs--mode-accent",
  "Tabs--mode-secondary": "vkuiTabs--mode-secondary",
  "Tabs--vkcom": "vkuiTabs--vkcom"
};
//# sourceMappingURL=Tabs.js.map