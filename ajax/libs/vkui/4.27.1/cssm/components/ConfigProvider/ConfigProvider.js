import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
var _excluded = ["children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { canUseDOM, useDOM } from "../../lib/dom";
import { ConfigProviderContext, defaultConfigProviderProps } from "./ConfigProviderContext";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useObjectMemo } from "../../hooks/useObjectMemo";
import { noop } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";
import { normalizeScheme, Scheme } from "../../helpers/scheme";
import { AppearanceProvider, generateVKUITokensClassName } from "../AppearanceProvider/AppearanceProvider";
var warn = warnOnce("ConfigProvider");

function useSchemeDetector(node, _scheme) {
  var inherit = _scheme === "inherit";
  var getScheme = React.useCallback(function () {
    if (!inherit || !canUseDOM || !node) {
      return undefined;
    }

    return node.getAttribute("scheme");
  }, [inherit, node]);

  var _React$useState = React.useState(getScheme()),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      resolvedScheme = _React$useState2[0],
      setScheme = _React$useState2[1];

  React.useEffect(function () {
    if (!inherit || !node) {
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
  }, [getScheme, inherit, node]);
  return _scheme === "inherit" ? resolvedScheme : _scheme;
}

var deriveAppearance = function deriveAppearance(scheme) {
  return scheme === Scheme.SPACE_GRAY || scheme === Scheme.VKCOM_DARK ? "dark" : "light";
};

var ConfigProvider = function ConfigProvider(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  var config = _objectSpread(_objectSpread({}, defaultConfigProviderProps), props);

  var platform = config.platform,
      appearance = config.appearance;
  var scheme = normalizeScheme({
    scheme: config.scheme,
    platform: platform,
    appearance: appearance
  });

  var _useDOM = useDOM(),
      document = _useDOM.document;

  var target = document === null || document === void 0 ? void 0 : document.body;
  useIsomorphicLayoutEffect(function () {
    if (scheme === "inherit") {
      return noop;
    }

    if (process.env.NODE_ENV === "development" && target !== null && target !== void 0 && target.hasAttribute("scheme")) {
      warn('<body scheme> was set before VKUI mount - did you forget scheme="inherit"?');
    }

    target === null || target === void 0 ? void 0 : target.setAttribute("scheme", scheme);
    return function () {
      return target === null || target === void 0 ? void 0 : target.removeAttribute("scheme");
    };
  }, [scheme]);
  var realScheme = useSchemeDetector(target, scheme);
  var derivedAppearance = deriveAppearance(realScheme);
  useIsomorphicLayoutEffect(function () {
    var VKUITokensClassName = generateVKUITokensClassName(platform, derivedAppearance);
    target === null || target === void 0 ? void 0 : target.classList.add(VKUITokensClassName);
    return function () {
      target === null || target === void 0 ? void 0 : target.classList.remove(VKUITokensClassName);
    };
  }, [platform, derivedAppearance]);
  var configContext = useObjectMemo(_objectSpread({
    appearance: derivedAppearance
  }, config));
  return createScopedElement(ConfigProviderContext.Provider, {
    value: configContext
  }, createScopedElement(AppearanceProvider, {
    appearance: configContext.appearance
  }, children));
}; // eslint-disable-next-line import/no-default-export


export default ConfigProvider;
//# sourceMappingURL=ConfigProvider.js.map