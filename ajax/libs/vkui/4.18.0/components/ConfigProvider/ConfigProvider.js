import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
var _excluded = ["children", "schemeTarget"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { canUseDOM, useDOM } from "../../lib/dom";
import { ConfigProviderContext, Scheme, defaultConfigProviderProps, ExternalScheme } from "./ConfigProviderContext";
import { VKCOM } from "../../lib/platform";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useObjectMemo } from "../../hooks/useObjectMemo";
import { noop } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";

function useSchemeDetector(node, _scheme) {
  var inherit = _scheme === 'inherit';

  var getScheme = function getScheme() {
    if (!inherit || !canUseDOM) {
      return undefined;
    }

    return node.getAttribute('scheme');
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
      attributeFilter: ['scheme']
    });
    return function () {
      return observer.disconnect();
    };
  }, [inherit]);
  return _scheme === 'inherit' ? resolvedScheme : _scheme;
}

var deriveAppearance = function deriveAppearance(scheme) {
  return scheme === Scheme.SPACE_GRAY || scheme === ExternalScheme.VKCOM_DARK ? 'dark' : 'light';
};

function normalizeScheme(scheme, platform) {
  if (scheme === 'inherit') {
    return scheme;
  }

  if (platform === VKCOM) {
    return Scheme.VKCOM;
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

var warn = warnOnce('ConfigProvider');

var ConfigProvider = function ConfigProvider(_ref) {
  var children = _ref.children,
      schemeTarget = _ref.schemeTarget,
      config = _objectWithoutProperties(_ref, _excluded);

  var scheme = normalizeScheme(config.scheme, config.platform);

  var _useDOM = useDOM(),
      document = _useDOM.document;

  var target = schemeTarget || (document === null || document === void 0 ? void 0 : document.body);
  useIsomorphicLayoutEffect(function () {
    if (scheme === 'inherit') {
      return noop;
    }

    if (process.env.NODE_ENV === 'development' && target.hasAttribute('scheme')) {
      warn('<body scheme> was set before VKUI mount - did you forget scheme="inherit"?');
    }

    target.setAttribute('scheme', scheme);
    return function () {
      return target.removeAttribute('scheme');
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