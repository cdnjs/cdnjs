"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppRoot = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _dom = require("../../lib/dom");
var _vkjs = require("@vkontakte/vkjs");
var _AppRootContext = require("./AppRootContext");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _icons = require("@vkontakte/icons");
var _ScrollContext = require("./ScrollContext");
var _useKeyboardInputTracker = require("../../hooks/useKeyboardInputTracker");
var _useInsets = require("../../hooks/useInsets");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _useAppearance = require("../../hooks/useAppearance");
var _isRefObject = require("../../lib/isRefObject");
var _getSizeXClassName = require("../../helpers/getSizeXClassName");
var _excluded = ["children", "mode", "scroll", "portalRoot", "disablePortal", "className"];
var INSET_CUSTOM_PROPERTY_PREFIX = "--vkui_internal--safe_area_inset_";

// Используйте classList, но будьте осторожны
/* eslint-disable no-restricted-properties */

/**
 * @see https://vkcom.github.io/VKUI/#/AppRoot
 */
var AppRoot = function AppRoot(_ref) {
  var children = _ref.children,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'full' : _ref$mode,
    _ref$scroll = _ref.scroll,
    scroll = _ref$scroll === void 0 ? 'global' : _ref$scroll,
    _ref$portalRoot = _ref.portalRoot,
    portalRootProp = _ref$portalRoot === void 0 ? null : _ref$portalRoot,
    disablePortal = _ref.disablePortal,
    className = _ref.className,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var isKeyboardInputActive = (0, _useKeyboardInputTracker.useKeyboardInputTracker)();
  var rootRef = React.useRef(null);
  var _React$useState = React.useState(null),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    portalRoot = _React$useState2[0],
    setPortalRoot = _React$useState2[1];
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  var insets = (0, _useInsets.useInsets)();
  var appearance = (0, _useAppearance.useAppearance)();
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    hasPointer = _useAdaptivity.hasPointer,
    sizeX = _useAdaptivity.sizeX;

  // setup portal
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var portal = null;
    if (portalRootProp) {
      if ((0, _isRefObject.isRefObject)(portalRootProp)) {
        portal = portalRootProp.current;
      } else {
        portal = portalRootProp;
      }
    }
    if (!portal) {
      portal = document.createElement('div');
      document.body.appendChild(portal);
    }
    setPortalRoot(portal);
    return function () {
      var _portal, _portal$parentElement;
      (_portal = portal) === null || _portal === void 0 ? void 0 : (_portal$parentElement = _portal.parentElement) === null || _portal$parentElement === void 0 ? void 0 : _portal$parentElement.removeChild(portal);
    };
  }, [portalRootProp]);

  // setup root classes
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var _rootRef$current;
    if (mode !== 'embedded') {
      return _vkjs.noop;
    }
    var parent = (_rootRef$current = rootRef.current) === null || _rootRef$current === void 0 ? void 0 : _rootRef$current.parentElement;
    parent === null || parent === void 0 ? void 0 : parent.classList.add('vkui__root--embedded');
    return function () {
      parent === null || parent === void 0 ? void 0 : parent.classList.remove('vkui__root--embedded');
    };
  }, []);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (mode === 'full') {
      document.documentElement.classList.add('vkui');
      return function () {
        document.documentElement.classList.remove('vkui');
      };
    }
    return undefined;
  }, [document, mode]);

  // setup insets
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var _rootRef$current2;
    if (mode === 'partial' || !((_rootRef$current2 = rootRef.current) !== null && _rootRef$current2 !== void 0 && _rootRef$current2.parentElement)) {
      return _vkjs.noop;
    }
    var parent = rootRef.current.parentElement;
    var key;
    for (key in insets) {
      if (insets.hasOwnProperty(key) && typeof insets[key] === 'number') {
        var inset = insets[key];
        parent.style.setProperty(INSET_CUSTOM_PROPERTY_PREFIX + key, "".concat(inset, "px"));
        portalRoot && portalRoot.style.setProperty(INSET_CUSTOM_PROPERTY_PREFIX + key, "".concat(inset, "px"));
      }
    }
    return function () {
      var key;
      for (key in insets) {
        if (insets.hasOwnProperty(key)) {
          parent.style.removeProperty(INSET_CUSTOM_PROPERTY_PREFIX + key);
          portalRoot && portalRoot.style.removeProperty(INSET_CUSTOM_PROPERTY_PREFIX + key);
        }
      }
    };
  }, [insets, portalRoot]);

  // adaptivity handler
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var _rootRef$current3;
    if (mode === 'partial') {
      return _vkjs.noop;
    }
    var className = (0, _getSizeXClassName.getSizeXClassName)('vkui', sizeX);
    var container = mode === 'embedded' ? (_rootRef$current3 = rootRef.current) === null || _rootRef$current3 === void 0 ? void 0 : _rootRef$current3.parentElement : document.body;
    container === null || container === void 0 ? void 0 : container.classList.add(className);
    return function () {
      return container === null || container === void 0 ? void 0 : container.classList.remove(className);
    };
  }, [sizeX]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (mode !== 'full' || appearance === undefined) {
      return _vkjs.noop;
    }
    document.documentElement.style.setProperty('color-scheme', appearance);
    return function () {
      return document.documentElement.style.removeProperty('color-scheme');
    };
  }, [appearance]);
  var ScrollController = React.useMemo(function () {
    return scroll === 'contain' ? _ScrollContext.ElementScrollController : _ScrollContext.GlobalScrollController;
  }, [scroll]);
  var content = /*#__PURE__*/React.createElement(_AppRootContext.AppRootContext.Provider, {
    value: {
      appRoot: rootRef,
      portalRoot: portalRoot,
      embedded: mode === 'embedded',
      keyboardInput: isKeyboardInputActive,
      mode: mode,
      disablePortal: disablePortal
    }
  }, /*#__PURE__*/React.createElement(ScrollController, {
    elRef: rootRef
  }, /*#__PURE__*/React.createElement(_icons.IconSettingsProvider, {
    classPrefix: "vkui"
  }, children)));
  return mode === 'partial' ? content : /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    ref: rootRef,
    className: (0, _vkjs.classNames)("vkuiAppRoot", hasPointer === undefined ? "vkuiAppRoot--pointer-none" : !hasPointer && "vkuiAppRoot--pointer-has-not", className)
  }, props), content);
};
exports.AppRoot = AppRoot;
//# sourceMappingURL=AppRoot.js.map