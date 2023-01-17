import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "mode", "getRootRef", "className", "role"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { useDOM } from '../../lib/dom';
import { pressedKey } from '../../lib/accessibility';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { getSizeXClassName } from '../../helpers/getSizeXClassName';
import "./Tabs.module.css";
export var TabsModeContext = /*#__PURE__*/React.createContext({
  mode: 'default',
  withGaps: false
});

/**
 * @see https://vkcom.github.io/VKUI/#/Tabs
 */
export var Tabs = function Tabs(_ref) {
  var children = _ref.children,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'default' : _ref$mode,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    _ref$role = _ref.role,
    role = _ref$role === void 0 ? 'tablist' : _ref$role,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    sizeX = _useAdaptivity.sizeX;
  var _useDOM = useDOM(),
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
    var key = pressedKey(event);
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
  useGlobalEventListener(document, 'keydown', handleDocumentKeydown, {
    capture: true
  });
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    ref: getRootRef,
    className: classNames("vkuiTabs", platform === Platform.VKCOM && styles["Tabs--".concat(platform)], getSizeXClassName("vkuiTabs", sizeX), withGaps && "vkuiTabs--withGaps", styles["Tabs--mode-".concat(mode)], className),
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