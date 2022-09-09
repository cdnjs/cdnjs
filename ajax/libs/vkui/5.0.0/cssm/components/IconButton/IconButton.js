import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "Component"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Tappable } from "../Tappable/Tappable";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import "./IconButton.css";

/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */
export var IconButton = function IconButton(_ref) {
  var children = _ref.children,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "button" : _ref$Component,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  return createScopedElement(Tappable, _extends({
    activeEffectDelay: 200,
    activeMode: "background"
  }, restProps, {
    Component: restProps.href ? "a" : Component,
    vkuiClass: classNames("IconButton", getSizeYClassName("IconButton", sizeY), platform === Platform.IOS && "IconButton--ios")
  }), children);
};
//# sourceMappingURL=IconButton.js.map