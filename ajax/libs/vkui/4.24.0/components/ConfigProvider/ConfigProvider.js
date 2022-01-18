import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
var _excluded = ["children", "schemeTarget"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { canUseDOM, useDOM } from "../../lib/dom";
import { ConfigProviderContext, defaultConfigProviderProps, Scheme } from "./ConfigProviderContext";
import { VKCOM } from "../../lib/platform";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useObjectMemo } from "../../hooks/useObjectMemo";
import { noop } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";
var warn = warnOnce("ConfigProvider");

function useSchemeDetector(node, _scheme) {
  var inherit = _scheme === "inherit";

  var getScheme = function getScheme() {
    if (!inherit || !canUseDOM) {
      return undefined;
    }

    return node.getAttribute("scheme");
  };

  var _React$useState = React.useState(getScheme()),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      resolvedScheme = _React$useState2[0],
      setScheme = _React$useState2[1];

  React.useEffect(function () {
    if (!inherit) {
      return noop;
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
  return scheme === Scheme.SPACE_GRAY || scheme === Scheme.VKCOM_DARK ? "dark" : "light";
};

function normalizeScheme(scheme, platform) {
  if (scheme === "inherit") {
    return scheme;
  }

  if (scheme === Scheme.VKCOM) {
    process.env.NODE_ENV === "development" && warn("\u0421\u0445\u0435\u043C\u0430 \"".concat(Scheme.VKCOM, "\" \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u0430 \u0438 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u0430 5.0.0. \u0412\u043C\u0435\u0441\u0442\u043E \u043D\u0435\u0451 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \"").concat(Scheme.VKCOM_LIGHT, "\""));
    return Scheme.VKCOM_LIGHT;
  }

  if (platform === VKCOM && (scheme === Scheme.BRIGHT_LIGHT || scheme === Scheme.SPACE_GRAY)) {
    process.env.NODE_ENV === "development" && warn("\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \"vkcom\" \u0438 \u0441\u0445\u0435\u043C\u0430 \"".concat(scheme, "\" \u043D\u0435\u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u044B. \u0421 \u044D\u0442\u043E\u0439 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u043E\u0439 \u043C\u043E\u0436\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0445\u0435\u043C\u044B \"").concat(Scheme.VKCOM_LIGHT, "\" \u0438\u043B\u0438 \"").concat(Scheme.VKCOM_DARK, "\""));
    return Scheme.VKCOM_LIGHT;
  }

  switch (scheme) {
    case Scheme.DEPRECATED_CLIENT_LIGHT:
      return Scheme.BRIGHT_LIGHT;

    case Scheme.DEPRECATED_CLIENT_DARK:
      return Scheme.SPACE_GRAY;

    default:
      return scheme;
  }
}

var ConfigProvider = function ConfigProvider(_ref) {
  var children = _ref.children,
      schemeTarget = _ref.schemeTarget,
      config = _objectWithoutProperties(_ref, _excluded);

  var scheme = normalizeScheme(config.scheme, config.platform);

  var _useDOM = useDOM(),
      document = _useDOM.document;

  var target = schemeTarget || (document === null || document === void 0 ? void 0 : document.body);
  useIsomorphicLayoutEffect(function () {
    if (scheme === "inherit") {
      return noop;
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
  var configContext = useObjectMemo(_objectSpread({
    appearance: deriveAppearance(realScheme)
  }, config));
  return createScopedElement(ConfigProviderContext.Provider, {
    value: configContext
  }, children);
}; // Деструктуризация нужна из бага в react-docgen-typescript
// https://github.com/styleguidist/react-docgen-typescript/issues/195


ConfigProvider.defaultProps = _objectSpread({}, defaultConfigProviderProps);
export default ConfigProvider;
//# sourceMappingURL=ConfigProvider.js.map