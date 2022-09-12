import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "mode", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getSizeXClassName } from "../../helpers/getSizeXClassName";
export var TabsModeContext = /*#__PURE__*/React.createContext({
  mode: "default",
  withGaps: false
});
/**
 * @see https://vkcom.github.io/VKUI/#/Tabs
 */

export var Tabs = function Tabs(_ref) {
  var children = _ref.children,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "default" : _ref$mode,
      getRootRef = _ref.getRootRef,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeX = _useAdaptivity.sizeX;

  var withGaps = mode === "accent" || mode === "secondary";
  return createScopedElement("div", _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames("Tabs", (platform === Platform.IOS || platform === Platform.VKCOM) && "Tabs--".concat(platform), getSizeXClassName("Tabs", sizeX), withGaps && "Tabs--withGaps", "Tabs--mode-".concat(mode))
  }), createScopedElement("div", {
    vkuiClass: "Tabs__in"
  }, createScopedElement(TabsModeContext.Provider, {
    value: {
      mode: mode,
      withGaps: withGaps
    }
  }, children)));
};
//# sourceMappingURL=Tabs.js.map