"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppearanceProvider = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var React = _interopRequireWildcard(require("react"));

var _AppearanceProviderContext = require("./AppearanceProviderContext");

var _getScheme = require("../../helpers/getScheme");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var AppearanceProvider = function AppearanceProvider(_ref) {
  var children = _ref.children,
      _ref$appearance = _ref.appearance,
      appearance = _ref$appearance === void 0 ? "light" : _ref$appearance;
  var platform = (0, _usePlatform.usePlatform)();
  var appearanceContext = React.useMemo(function () {
    return {
      scheme: (0, _getScheme.getScheme)({
        platform: platform,
        appearance: appearance
      }),
      appearance: appearance
    };
  }, [appearance, platform]);
  return (0, _jsxRuntime.createScopedElement)(_AppearanceProviderContext.AppearanceProviderContext.Provider, {
    value: appearanceContext
  }, React.Children.map(children, function (child) {
    if ( /*#__PURE__*/React.isValidElement(child)) {
      return /*#__PURE__*/React.cloneElement(child, {
        className: (0, _classNames.classNames)(child.props.className, "vkui".concat(appearanceContext.scheme))
      });
    }

    return child;
  }));
};

exports.AppearanceProvider = AppearanceProvider;
//# sourceMappingURL=AppearanceProvider.js.map