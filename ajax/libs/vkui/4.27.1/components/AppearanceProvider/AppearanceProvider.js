import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { AppearanceProviderContext } from "./AppearanceProviderContext";
import { getScheme } from "../../helpers/getScheme";
import { classNamesString } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
export var generateVKUITokensClassName = function generateVKUITokensClassName(platform, appearance) {
  var tokensPlatform;

  switch (platform) {
    case Platform.ANDROID:
      tokensPlatform = "vkBase";
      break;

    case Platform.IOS:
      tokensPlatform = "vkIOS";
      break;

    case Platform.VKCOM:
      tokensPlatform = "vkCom";
      break;

    default:
      tokensPlatform = platform;
  }

  return "vkui--".concat(tokensPlatform, "--").concat(appearance);
};
export var AppearanceProvider = function AppearanceProvider(_ref) {
  var children = _ref.children,
      _ref$appearance = _ref.appearance,
      appearance = _ref$appearance === void 0 ? "light" : _ref$appearance;
  var platform = usePlatform();
  var scheme = getScheme({
    platform: platform,
    appearance: appearance
  });
  return createScopedElement(AppearanceProviderContext.Provider, {
    value: appearance
  }, React.Children.map(children, function (child) {
    if ( /*#__PURE__*/React.isValidElement(child)) {
      return /*#__PURE__*/React.cloneElement(child, {
        className: classNamesString(child.props.className, "vkui".concat(scheme), generateVKUITokensClassName(platform, appearance))
      });
    }

    return child;
  }));
};
//# sourceMappingURL=AppearanceProvider.js.map