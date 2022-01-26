import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { AppearanceProviderContext } from "./AppearanceProviderContext";
import { getScheme } from "../../helpers/getScheme";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
export var AppearanceProvider = function AppearanceProvider(_ref) {
  var children = _ref.children,
      _ref$appearance = _ref.appearance,
      appearance = _ref$appearance === void 0 ? "light" : _ref$appearance;
  var platform = usePlatform();
  var appearanceContext = React.useMemo(function () {
    return {
      scheme: getScheme({
        platform: platform,
        appearance: appearance
      }),
      appearance: appearance
    };
  }, [appearance, platform]);
  return createScopedElement(AppearanceProviderContext.Provider, {
    value: appearanceContext
  }, React.Children.map(children, function (child) {
    if ( /*#__PURE__*/React.isValidElement(child)) {
      return /*#__PURE__*/React.cloneElement(child, {
        className: classNames(child.props.className, "vkui".concat(appearanceContext.scheme))
      });
    }

    return child;
  }));
};
//# sourceMappingURL=AppearanceProvider.js.map