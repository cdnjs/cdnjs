import _extends from "@babel/runtime/helpers/extends";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "mode", "embedded", "sizeX", "hasMouse", "noLegacyClasses", "scroll"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { useDOM } from "../../lib/dom";
import { classNames } from "../../lib/classNames";
import { AppRootContext } from "./AppRootContext";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { classScopingMode } from "../../lib/classScopingMode";
import { IconSettingsProvider } from "@vkontakte/icons";
import { elementScrollController, globalScrollController, ScrollContext } from "./ScrollContext";
import { noop } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";
import { useKeyboardInputTracker } from "../../hooks/useKeyboardInputTracker";
import { useInsets } from "../../hooks/useInsets";
var warn = warnOnce("AppRoot");
export var AppRoot = withAdaptivity(function (_ref) {
  var children = _ref.children,
      _mode = _ref.mode,
      _embedded = _ref.embedded,
      sizeX = _ref.sizeX,
      hasMouse = _ref.hasMouse,
      _ref$noLegacyClasses = _ref.noLegacyClasses,
      noLegacyClasses = _ref$noLegacyClasses === void 0 ? false : _ref$noLegacyClasses,
      _ref$scroll = _ref.scroll,
      scroll = _ref$scroll === void 0 ? "global" : _ref$scroll,
      props = _objectWithoutProperties(_ref, _excluded);

  // normalize mode
  var mode = _mode || (_embedded ? "embedded" : "full");
  var isKeyboardInputActive = useKeyboardInputTracker();
  var rootRef = React.useRef(null);

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      portalRoot = _React$useState2[0],
      setPortalRoot = _React$useState2[1];

  var _useDOM = useDOM(),
      window = _useDOM.window,
      document = _useDOM.document;

  var insets = useInsets();
  var initialized = React.useRef(false);

  if (!initialized.current) {
    if (document && mode === "full") {
      document.documentElement.classList.add("vkui");
    }

    classScopingMode.noConflict = noLegacyClasses;
    initialized.current = true;
  }

  if (process.env.NODE_ENV === "development") {
    if (scroll !== "global" && mode !== "embedded") {
      warn("Scroll modes only supported in embedded mode");
    }

    if (_mode && _embedded) {
      warn("mode=\"".concat(mode, "\" overrides embedded"));
    }
  } // setup portal


  useIsomorphicLayoutEffect(function () {
    var portal = document.createElement("div");
    portal.classList.add("vkui__portal-root");
    document.body.appendChild(portal);
    setPortalRoot(portal);
    return function () {
      var _portal$parentElement;

      (_portal$parentElement = portal.parentElement) === null || _portal$parentElement === void 0 ? void 0 : _portal$parentElement.removeChild(portal);
    };
  }, []); // setup root classes

  useIsomorphicLayoutEffect(function () {
    var _rootRef$current, _parent$classList;

    if (mode === "partial") {
      return noop;
    }

    var parent = (_rootRef$current = rootRef.current) === null || _rootRef$current === void 0 ? void 0 : _rootRef$current.parentElement;
    var classes = ["vkui__root"].concat(mode === "embedded" ? "vkui__root--embedded" : []);
    parent === null || parent === void 0 ? void 0 : (_parent$classList = parent.classList).add.apply(_parent$classList, _toConsumableArray(classes));
    return function () {
      var _parent$classList2;

      parent === null || parent === void 0 ? void 0 : (_parent$classList2 = parent.classList).remove.apply(_parent$classList2, _toConsumableArray(classes));

      if (mode === "full") {
        document === null || document === void 0 ? void 0 : document.documentElement.classList.remove("vkui");
      }
    };
  }, []); // setup insets

  useIsomorphicLayoutEffect(function () {
    var _rootRef$current2;

    if (mode === "partial" || !((_rootRef$current2 = rootRef.current) !== null && _rootRef$current2 !== void 0 && _rootRef$current2.parentElement)) {
      return noop;
    }

    var parent = rootRef.current.parentElement;

    for (var key in insets) {
      if (insets.hasOwnProperty(key) && typeof insets[key] === "number") {
        var inset = insets[key];
        parent.style.setProperty("--safe-area-inset-".concat(key), "".concat(inset, "px"));
        portalRoot && portalRoot.style.setProperty("--safe-area-inset-".concat(key), "".concat(inset, "px"));
      }
    }

    return function () {
      for (var _key in insets) {
        if (insets.hasOwnProperty(_key)) {
          parent.style.removeProperty("--safe-area-inset-".concat(_key));
          portalRoot && portalRoot.style.removeProperty("--safe-area-inset-".concat(_key));
        }
      }
    };
  }, [insets, portalRoot]); // adaptivity handler

  useIsomorphicLayoutEffect(function () {
    var _rootRef$current3;

    if (mode === "partial" || sizeX !== SizeType.REGULAR) {
      return noop;
    }

    var container = mode === "embedded" ? (_rootRef$current3 = rootRef.current) === null || _rootRef$current3 === void 0 ? void 0 : _rootRef$current3.parentElement : document.body;
    container === null || container === void 0 ? void 0 : container.classList.add("vkui--sizeX-regular");
    return function () {
      return container === null || container === void 0 ? void 0 : container.classList.remove("vkui--sizeX-regular");
    };
  }, [sizeX]);
  var scrollController = React.useMemo(function () {
    return scroll === "contain" ? elementScrollController(rootRef) : globalScrollController(window, document);
  }, [document, scroll, window]);
  var content = createScopedElement(AppRootContext.Provider, {
    value: {
      appRoot: rootRef,
      portalRoot: portalRoot,
      embedded: mode === "embedded",
      keyboardInput: isKeyboardInputActive,
      mode: mode
    }
  }, createScopedElement(ScrollContext.Provider, {
    value: scrollController
  }, createScopedElement(IconSettingsProvider, {
    classPrefix: "vkui",
    globalClasses: !noLegacyClasses
  }, children)));
  return mode === "partial" ? content : createScopedElement("div", _extends({
    ref: rootRef,
    vkuiClass: classNames("AppRoot", {
      "AppRoot--no-mouse": !hasMouse
    })
  }, props), content);
}, {
  sizeX: true,
  hasMouse: true
});
//# sourceMappingURL=AppRoot.js.map