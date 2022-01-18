"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _dom = require("../../lib/dom");

var _ConfigProviderContext = require("./ConfigProviderContext");

var _platform = require("../../lib/platform");

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _useObjectMemo = require("../../hooks/useObjectMemo");

var _utils = require("../../lib/utils");

var _warnOnce = require("../../lib/warnOnce");

var _excluded = ["children", "schemeTarget"];
var warn = (0, _warnOnce.warnOnce)("ConfigProvider");

function useSchemeDetector(node, _scheme) {
  var inherit = _scheme === "inherit";

  var getScheme = function getScheme() {
    if (!inherit || !_dom.canUseDOM) {
      return undefined;
    }

    return node.getAttribute("scheme");
  };

  var _React$useState = React.useState(getScheme()),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      resolvedScheme = _React$useState2[0],
      setScheme = _React$useState2[1];

  React.useEffect(function () {
    if (!inherit) {
      return _utils.noop;
    }

    setScheme(getScheme());
    var observer = new MutationObserver(function () {
      return setScheme(getScheme());
    });
    observer.observe(node, {
      attributes: true,
      attributeFilter: ["scheme"]
    });
    return function () {
      return observer.disconnect();
    };
  }, [inherit]);
  return _scheme === "inherit" ? resolvedScheme : _scheme;
}

var deriveAppearance = function deriveAppearance(scheme) {
  return scheme === _ConfigProviderContext.Scheme.SPACE_GRAY || scheme === _ConfigProviderContext.Scheme.VKCOM_DARK ? "dark" : "light";
};

function normalizeScheme(scheme, platform) {
  if (scheme === "inherit") {
    return scheme;
  }

  if (scheme === _ConfigProviderContext.Scheme.VKCOM) {
    process.env.NODE_ENV === "development" && warn("\u0421\u0445\u0435\u043C\u0430 \"".concat(_ConfigProviderContext.Scheme.VKCOM, "\" \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u0430 \u0438 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u0430 5.0.0. \u0412\u043C\u0435\u0441\u0442\u043E \u043D\u0435\u0451 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \"").concat(_ConfigProviderContext.Scheme.VKCOM_LIGHT, "\""));
    return _ConfigProviderContext.Scheme.VKCOM_LIGHT;
  }

  if (platform === _platform.VKCOM && (scheme === _ConfigProviderContext.Scheme.BRIGHT_LIGHT || scheme === _ConfigProviderContext.Scheme.SPACE_GRAY)) {
    process.env.NODE_ENV === "development" && warn("\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \"vkcom\" \u0438 \u0441\u0445\u0435\u043C\u0430 \"".concat(scheme, "\" \u043D\u0435\u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u044B. \u0421 \u044D\u0442\u043E\u0439 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u043E\u0439 \u043C\u043E\u0436\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0445\u0435\u043C\u044B \"").concat(_ConfigProviderContext.Scheme.VKCOM_LIGHT, "\" \u0438\u043B\u0438 \"").concat(_ConfigProviderContext.Scheme.VKCOM_DARK, "\""));
    return _ConfigProviderContext.Scheme.VKCOM_LIGHT;
  }

  switch (scheme) {
    case _ConfigProviderContext.Scheme.DEPRECATED_CLIENT_LIGHT:
      return _ConfigProviderContext.Scheme.BRIGHT_LIGHT;

    case _ConfigProviderContext.Scheme.DEPRECATED_CLIENT_DARK:
      return _ConfigProviderContext.Scheme.SPACE_GRAY;

    default:
      return scheme;
  }
}

var ConfigProvider = function ConfigProvider(_ref) {
  var children = _ref.children,
      schemeTarget = _ref.schemeTarget,
      config = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var scheme = normalizeScheme(config.scheme, config.platform);

  var _useDOM = (0, _dom.useDOM)(),
      document = _useDOM.document;

  var target = schemeTarget || (document === null || document === void 0 ? void 0 : document.body);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (scheme === "inherit") {
      return _utils.noop;
    }

    if (process.env.NODE_ENV === "development" && target.hasAttribute("scheme")) {
      warn('<body scheme> was set before VKUI mount - did you forget scheme="inherit"?');
    }

    target.setAttribute("scheme", scheme);
    return function () {
      return target.removeAttribute("scheme");
    };
  }, [scheme]);
  var realScheme = useSchemeDetector(target, scheme);
  var configContext = (0, _useObjectMemo.useObjectMemo)((0, _objectSpread2.default)({
    appearance: deriveAppearance(realScheme)
  }, config));
  return (0, _jsxRuntime.createScopedElement)(_ConfigProviderContext.ConfigProviderContext.Provider, {
    value: configContext
  }, children);
}; // Деструктуризация нужна из бага в react-docgen-typescript
// https://github.com/styleguidist/react-docgen-typescript/issues/195


ConfigProvider.defaultProps = (0, _objectSpread2.default)({}, _ConfigProviderContext.defaultConfigProviderProps);
var _default = ConfigProvider;
exports.default = _default;
//# sourceMappingURL=ConfigProvider.js.map