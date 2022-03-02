"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppRoot = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _dom = require("../../lib/dom");

var _classNames = require("../../lib/classNames");

var _AppRootContext = require("./AppRootContext");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _classScopingMode = require("../../lib/classScopingMode");

var _icons = require("@vkontakte/icons");

var _ScrollContext = require("./ScrollContext");

var _utils = require("../../lib/utils");

var _warnOnce = require("../../lib/warnOnce");

var _useKeyboardInputTracker = require("../../hooks/useKeyboardInputTracker");

var _useInsets = require("../../hooks/useInsets");

var _excluded = ["children", "mode", "embedded", "sizeX", "hasMouse", "noLegacyClasses", "scroll"];
var warn = (0, _warnOnce.warnOnce)("AppRoot");
var AppRoot = (0, _withAdaptivity.withAdaptivity)(function (_ref) {
  var children = _ref.children,
      _mode = _ref.mode,
      _embedded = _ref.embedded,
      sizeX = _ref.sizeX,
      hasMouse = _ref.hasMouse,
      _ref$noLegacyClasses = _ref.noLegacyClasses,
      noLegacyClasses = _ref$noLegacyClasses === void 0 ? false : _ref$noLegacyClasses,
      _ref$scroll = _ref.scroll,
      scroll = _ref$scroll === void 0 ? "global" : _ref$scroll,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  // normalize mode
  var mode = _mode || (_embedded ? "embedded" : "full");
  var isKeyboardInputActive = (0, _useKeyboardInputTracker.useKeyboardInputTracker)();
  var rootRef = React.useRef(null);

  var _React$useState = React.useState(null),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      portalRoot = _React$useState2[0],
      setPortalRoot = _React$useState2[1];

  var _useDOM = (0, _dom.useDOM)(),
      window = _useDOM.window,
      document = _useDOM.document;

  var insets = (0, _useInsets.useInsets)();
  var initialized = React.useRef(false);

  if (!initialized.current) {
    if (document && mode === "full") {
      document.documentElement.classList.add("vkui");
    }

    _classScopingMode.classScopingMode.noConflict = noLegacyClasses;
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


  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var portal = document.createElement("div");
    portal.classList.add("vkui__portal-root");
    document.body.appendChild(portal);
    setPortalRoot(portal);
    return function () {
      var _portal$parentElement;

      (_portal$parentElement = portal.parentElement) === null || _portal$parentElement === void 0 ? void 0 : _portal$parentElement.removeChild(portal);
    };
  }, []); // setup root classes

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var _rootRef$current, _parent$classList;

    if (mode === "partial") {
      return _utils.noop;
    }

    var parent = (_rootRef$current = rootRef.current) === null || _rootRef$current === void 0 ? void 0 : _rootRef$current.parentElement;
    var classes = ["vkui__root"].concat(mode === "embedded" ? "vkui__root--embedded" : []);
    parent === null || parent === void 0 ? void 0 : (_parent$classList = parent.classList).add.apply(_parent$classList, (0, _toConsumableArray2.default)(classes));
    return function () {
      var _parent$classList2;

      parent === null || parent === void 0 ? void 0 : (_parent$classList2 = parent.classList).remove.apply(_parent$classList2, (0, _toConsumableArray2.default)(classes));

      if (mode === "full") {
        document === null || document === void 0 ? void 0 : document.documentElement.classList.remove("vkui");
      }
    };
  }, []); // setup insets

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var _rootRef$current2;

    if (mode === "partial" || !((_rootRef$current2 = rootRef.current) !== null && _rootRef$current2 !== void 0 && _rootRef$current2.parentElement)) {
      return _utils.noop;
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

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var _rootRef$current3;

    if (mode === "partial" || sizeX !== _withAdaptivity.SizeType.REGULAR) {
      return _utils.noop;
    }

    var container = mode === "embedded" ? (_rootRef$current3 = rootRef.current) === null || _rootRef$current3 === void 0 ? void 0 : _rootRef$current3.parentElement : document.body;
    container === null || container === void 0 ? void 0 : container.classList.add("vkui--sizeX-regular");
    return function () {
      return container === null || container === void 0 ? void 0 : container.classList.remove("vkui--sizeX-regular");
    };
  }, [sizeX]);
  var scrollController = React.useMemo(function () {
    return scroll === "contain" ? (0, _ScrollContext.elementScrollController)(rootRef) : (0, _ScrollContext.globalScrollController)(window, document);
  }, [document, scroll, window]);
  var content = (0, _jsxRuntime.createScopedElement)(_AppRootContext.AppRootContext.Provider, {
    value: {
      appRoot: rootRef,
      portalRoot: portalRoot,
      embedded: mode === "embedded",
      keyboardInput: isKeyboardInputActive,
      mode: mode
    }
  }, (0, _jsxRuntime.createScopedElement)(_ScrollContext.ScrollContext.Provider, {
    value: scrollController
  }, (0, _jsxRuntime.createScopedElement)(_icons.IconSettingsProvider, {
    classPrefix: "vkui",
    globalClasses: !noLegacyClasses
  }, children)));
  return mode === "partial" ? content : (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    ref: rootRef,
    vkuiClass: (0, _classNames.classNames)("AppRoot", {
      "AppRoot--no-mouse": !hasMouse
    })
  }, props), content);
}, {
  sizeX: true,
  hasMouse: true
});
exports.AppRoot = AppRoot;
//# sourceMappingURL=AppRoot.js.map