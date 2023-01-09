import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "shadow", "itemsLayout", "mode"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
var getItemsLayout = function getItemsLayout(itemsLayout, children) {
  switch (itemsLayout) {
    case "horizontal":
    case "vertical":
      return itemsLayout;
    default:
      return React.Children.count(children) > 2 ? "vertical" : "horizontal";
  }
};

/**
 * @see https://vkcom.github.io/VKUI/#/Tabbar
 */
export var Tabbar = function Tabbar(_ref) {
  var children = _ref.children,
    _ref$shadow = _ref.shadow,
    shadow = _ref$shadow === void 0 ? true : _ref$shadow,
    itemsLayout = _ref.itemsLayout,
    mode = _ref.mode,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  return createScopedElement("div", _extends({
    vkuiClass: classNames("Tabbar", platform === Platform.IOS && "Tabbar--ios", "Tabbar--l-".concat(getItemsLayout(itemsLayout !== null && itemsLayout !== void 0 ? itemsLayout : mode, children)), shadow && "Tabbar--shadow")
  }, restProps), createScopedElement("div", {
    vkuiClass: "Tabbar__in"
  }, children));
};
//# sourceMappingURL=Tabbar.js.map