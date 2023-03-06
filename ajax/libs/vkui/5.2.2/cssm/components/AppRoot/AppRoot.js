import _extends from "@babel/runtime/helpers/extends";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["children", "mode", "scroll", "portalRoot", "disablePortal", "className"];
import * as React from 'react';
import { IconSettingsProvider } from '@vkontakte/icons';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAppearance } from '../../hooks/useAppearance';
import { useInsets } from '../../hooks/useInsets';
import { useKeyboardInputTracker } from '../../hooks/useKeyboardInputTracker';
import { SizeType } from '../../lib/adaptivity';
import { useDOM } from '../../lib/dom';
import { isRefObject } from '../../lib/isRefObject';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { AppRootContext } from './AppRootContext';
import { ElementScrollController, GlobalScrollController } from './ScrollContext';
import "./AppRoot.module.css";
var vkuiSizeXClassNames = _defineProperty({
  none: 'vkui--sizeX-none'
}, SizeType.REGULAR, 'vkui--sizeX-regular');
var INSET_CUSTOM_PROPERTY_PREFIX = "--vkui_internal--safe_area_inset_";

// Используйте classList, но будьте осторожны
/* eslint-disable no-restricted-properties */

/**
 * @see https://vkcom.github.io/VKUI/#/AppRoot
 */
export var AppRoot = function AppRoot(_ref) {
  var children = _ref.children,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'full' : _ref$mode,
    _ref$scroll = _ref.scroll,
    scroll = _ref$scroll === void 0 ? 'global' : _ref$scroll,
    _ref$portalRoot = _ref.portalRoot,
    portalRootProp = _ref$portalRoot === void 0 ? null : _ref$portalRoot,
    disablePortal = _ref.disablePortal,
    className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded);
  var isKeyboardInputActive = useKeyboardInputTracker();
  var rootRef = React.useRef(null);
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    portalRoot = _React$useState2[0],
    setPortalRoot = _React$useState2[1];
  var _useDOM = useDOM(),
    document = _useDOM.document;
  var insets = useInsets();
  var appearance = useAppearance();
  var _useAdaptivity = useAdaptivity(),
    hasPointer = _useAdaptivity.hasPointer,
    _useAdaptivity$sizeX = _useAdaptivity.sizeX,
    sizeX = _useAdaptivity$sizeX === void 0 ? 'none' : _useAdaptivity$sizeX;

  // setup portal
  useIsomorphicLayoutEffect(function () {
    var portal = null;
    if (portalRootProp) {
      if (isRefObject(portalRootProp)) {
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
  useIsomorphicLayoutEffect(function () {
    var _rootRef$current, _parent$classList;
    if (mode === 'partial') {
      return noop;
    }
    var parent = (_rootRef$current = rootRef.current) === null || _rootRef$current === void 0 ? void 0 : _rootRef$current.parentElement;
    var classes = ['vkui__root'].concat(mode === 'embedded' ? 'vkui__root--embedded' : []);
    parent === null || parent === void 0 ? void 0 : (_parent$classList = parent.classList).add.apply(_parent$classList, _toConsumableArray(classes));
    return function () {
      var _parent$classList2;
      parent === null || parent === void 0 ? void 0 : (_parent$classList2 = parent.classList).remove.apply(_parent$classList2, _toConsumableArray(classes));
    };
  }, []);
  useIsomorphicLayoutEffect(function () {
    if (mode === 'full') {
      document.documentElement.classList.add('vkui');
      return function () {
        document.documentElement.classList.remove('vkui');
      };
    }
    return undefined;
  }, [document, mode]);

  // setup insets
  useIsomorphicLayoutEffect(function () {
    var _rootRef$current2;
    if (mode === 'partial' || !((_rootRef$current2 = rootRef.current) !== null && _rootRef$current2 !== void 0 && _rootRef$current2.parentElement)) {
      return noop;
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
  useIsomorphicLayoutEffect(function () {
    var _rootRef$current3;
    if (mode === 'partial') {
      return noop;
    }
    var className = sizeX !== SizeType.COMPACT ? vkuiSizeXClassNames[sizeX] : null;
    var container = mode === 'embedded' ? (_rootRef$current3 = rootRef.current) === null || _rootRef$current3 === void 0 ? void 0 : _rootRef$current3.parentElement : document.body;
    if (className === null || !container) {
      return noop;
    }
    container.classList.add(className);
    return function () {
      container.classList.remove(className);
    };
  }, [sizeX]);
  useIsomorphicLayoutEffect(function () {
    if (mode !== 'full' || appearance === undefined) {
      return noop;
    }
    document.documentElement.style.setProperty('color-scheme', appearance);
    return function () {
      return document.documentElement.style.removeProperty('color-scheme');
    };
  }, [appearance]);
  var ScrollController = React.useMemo(function () {
    return scroll === 'contain' ? ElementScrollController : GlobalScrollController;
  }, [scroll]);
  var content = /*#__PURE__*/React.createElement(AppRootContext.Provider, {
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
  }, /*#__PURE__*/React.createElement(IconSettingsProvider, {
    classPrefix: "vkui"
  }, children)));
  return mode === 'partial' ? content : /*#__PURE__*/React.createElement("div", _extends({
    ref: rootRef,
    className: classNames("vkuiAppRoot", hasPointer === undefined ? "vkuiAppRoot--pointer-none" : !hasPointer && "vkuiAppRoot--pointer-has-not", className)
  }, props), content);
};
//# sourceMappingURL=AppRoot.js.map