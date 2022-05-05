"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateVKUITokensClassName = exports.AppearanceProvider = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var React = _interopRequireWildcard(require("react"));

var _AppearanceProviderContext = require("./AppearanceProviderContext");

var _getScheme = require("../../helpers/getScheme");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _platform = require("../../lib/platform");

var generateVKUITokensClassName = function generateVKUITokensClassName(platform, appearance) {
  var tokensPlatform;

  switch (platform) {
    case _platform.Platform.ANDROID:
      tokensPlatform = "vkBase";
      break;

    case _platform.Platform.IOS:
      tokensPlatform = "vkIOS";
      break;

    case _platform.Platform.VKCOM:
      tokensPlatform = "vkCom";
      break;

    default:
      tokensPlatform = platform;
  }

  return "vkui--".concat(tokensPlatform, "--").concat(appearance);
};

exports.generateVKUITokensClassName = generateVKUITokensClassName;

var AppearanceProvider = function AppearanceProvider(_ref) {
  var children = _ref.children,
      _ref$appearance = _ref.appearance,
      appearance = _ref$appearance === void 0 ? "light" : _ref$appearance;
  var platform = (0, _usePlatform.usePlatform)();
  var scheme = (0, _getScheme.getScheme)({
    platform: platform,
    appearance: appearance
  });
  return (0, _jsxRuntime.createScopedElement)(_AppearanceProviderContext.AppearanceProviderContext.Provider, {
    value: appearance
  }, React.Children.map(children, function (child) {
    if ( /*#__PURE__*/React.isValidElement(child)) {
      return /*#__PURE__*/React.cloneElement(child, {
        className: (0, _classNames.classNamesString)(child.props.className, "vkui".concat(scheme), generateVKUITokensClassName(platform, appearance))
      });
    }

    return child;
  }));
};

exports.AppearanceProvider = AppearanceProvider;
//# sourceMappingURL=AppearanceProvider.js.map