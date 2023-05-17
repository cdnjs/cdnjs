import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "direction", "onClick"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Icon24Chevron, Icon24ChevronCompactLeft, Icon16Chevron, Icon16ChevronLeft } from "@vkontakte/icons";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { IOS } from "../../lib/platform";
import { Tappable } from "../Tappable/Tappable";
import "./HorizontalScrollArrow.css";
export var HorizontalScrollArrow = function HorizontalScrollArrow(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? "l" : _ref$size,
    direction = _ref.direction,
    onClick = _ref.onClick,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var ArrowIcon;
  if (size === "m") {
    ArrowIcon = direction === "left" ? Icon16ChevronLeft : Icon16Chevron;
  } else {
    ArrowIcon = direction === "left" ? Icon24ChevronCompactLeft : Icon24Chevron;
  }
  return createScopedElement(Tappable, _extends({}, restProps, {
    Component: "button",
    hasHover: false,
    hasActive: false,
    vkuiClass: classNames("HorizontalScrollArrow", "HorizontalScrollArrow--".concat(size), "HorizontalScrollArrow--".concat(direction), platform === IOS && "HorizontalScrollArrow--ios"),
    onClick: onClick
  }), createScopedElement("span", {
    vkuiClass: "HorizontalScrollArrow__icon"
  }, createScopedElement(ArrowIcon, null)));
};
//# sourceMappingURL=HorizontalScrollArrow.js.map