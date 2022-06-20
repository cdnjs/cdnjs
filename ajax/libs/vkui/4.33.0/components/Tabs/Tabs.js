import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "mode", "getRootRef", "sizeX"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { IOS } from "../../lib/platform";
import { withAdaptivity } from "../../hoc/withAdaptivity";
export var TabsModeContext = /*#__PURE__*/React.createContext("default");

var TabsComponent = function TabsComponent(_ref) {
  var children = _ref.children,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "default" : _ref$mode,
      getRootRef = _ref.getRootRef,
      sizeX = _ref.sizeX,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  if (platform !== IOS && mode === "segmented") {
    mode = "default";
  }

  return createScopedElement("div", _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames(getClassName("Tabs", platform), "Tabs--".concat(mode), "Tabs--sizeX-".concat(sizeX))
  }), createScopedElement("div", {
    vkuiClass: "Tabs__in"
  }, createScopedElement(TabsModeContext.Provider, {
    value: mode
  }, children)));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Tabs
 */


export var Tabs = withAdaptivity(TabsComponent, {
  sizeX: true
});
Tabs.displayName = "Tabs";
//# sourceMappingURL=Tabs.js.map