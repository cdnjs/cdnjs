import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["icon", "sizeY", "children", "Component"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Tappable } from "../Tappable/Tappable";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { IOS } from "../../lib/platform";
import { warnOnce } from "../../lib/warnOnce";
var warn = warnOnce("IconButton");

var IconButtonComponent = function IconButtonComponent(_ref) {
  var icon = _ref.icon,
      sizeY = _ref.sizeY,
      children = _ref.children,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "button" : _ref$Component,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  if (icon && process.env.NODE_ENV === "development") {
    warn("Свойство icon устарело и будет удалено в 5.0.0. Используйте children");
  }

  return createScopedElement(Tappable, _extends({}, restProps, {
    Component: restProps.href ? "a" : Component,
    activeEffectDelay: 200,
    activeMode: "background",
    vkuiClass: classNames("IconButton", "IconButton--sizeY-".concat(sizeY), platform === IOS && "IconButton--ios")
  }), icon || children);
};
/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */


export var IconButton = withAdaptivity(IconButtonComponent, {
  sizeY: true
});
IconButton.displayName = "IconButton";
//# sourceMappingURL=IconButton.js.map