import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "shadow", "itemsLayout"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import "./Tabbar.css";

/**
 * @see https://vkcom.github.io/VKUI/#/Tabbar
 */
export var Tabbar = function Tabbar(_ref) {
  var children = _ref.children,
      _ref$shadow = _ref.shadow,
      shadow = _ref$shadow === void 0 ? true : _ref$shadow,
      itemsLayout = _ref.itemsLayout,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var getItemsLayout = function getItemsLayout() {
    switch (itemsLayout) {
      case "horizontal":
      case "vertical":
        return itemsLayout;

      default:
        return React.Children.count(children) > 2 ? "vertical" : "horizontal";
    }
  };

  return createScopedElement("div", _extends({
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
    vkuiClass: classNames(getClassName("Tabbar", platform), "Tabbar--l-".concat(getItemsLayout()), {
      "Tabbar--shadow": shadow
    })
  }, restProps), createScopedElement("div", {
    vkuiClass: "Tabbar__in"
  }, children));
};
//# sourceMappingURL=Tabbar.js.map