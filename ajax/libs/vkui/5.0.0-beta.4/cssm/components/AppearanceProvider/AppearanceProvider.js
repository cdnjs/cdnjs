import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { ConfigProviderOverride } from "../ConfigProvider/ConfigProviderOverride";
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

/**
 * @see https://vkcom.github.io/VKUI/#/AppearanceProvider
 */
export var AppearanceProvider = function AppearanceProvider(_ref) {
  var appearance = _ref.appearance,
    children = _ref.children;
  var platform = usePlatform();
  return /*#__PURE__*/React.createElement(ConfigProviderOverride, {
    appearance: appearance
  }, React.Children.map(children, function (child) {
    if ( /*#__PURE__*/React.isValidElement(child)) {
      return /*#__PURE__*/React.cloneElement(child, {
        className: classNamesString(child.props.className, generateVKUITokensClassName(platform, appearance))
      });
    }
    return child;
  }));
};
//# sourceMappingURL=AppearanceProvider.js.map