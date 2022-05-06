import { createScopedElement } from "../../lib/jsxRuntime";
import { Icon24Chevron } from "@vkontakte/icons";
import { classNames } from "../../lib/classNames";
import Tappable from "../Tappable/Tappable";
import "./HorizontalScrollArrow.css";

var HorizontalScrollArrow = function HorizontalScrollArrow(_ref) {
  var onClick = _ref.onClick,
      direction = _ref.direction;
  return createScopedElement(Tappable, {
    Component: "button",
    hasHover: false,
    hasActive: false,
    vkuiClass: classNames("HorizontalScrollArrow", "HorizontalScrollArrow--".concat(direction)),
    onClick: onClick
  }, createScopedElement("span", {
    vkuiClass: "HorizontalScrollArrow__icon"
  }, createScopedElement(Icon24Chevron, null)));
}; // eslint-disable-next-line import/no-default-export


export default HorizontalScrollArrow;
//# sourceMappingURL=HorizontalScrollArrow.js.map