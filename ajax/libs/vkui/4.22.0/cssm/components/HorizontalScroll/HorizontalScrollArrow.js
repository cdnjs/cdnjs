import { createScopedElement } from "../../lib/jsxRuntime";
import { Icon24Chevron } from '@vkontakte/icons';
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import Tappable from "../Tappable/Tappable";
import "./HorizontalScrollArrow.css";

var HorizontalScrollArrow = function HorizontalScrollArrow(_ref) {
  var onClick = _ref.onClick,
      direction = _ref.direction;
  var platform = usePlatform();
  return createScopedElement(Tappable, {
    Component: "button",
    hasHover: false,
    hasActive: false,
    vkuiClass: classNames(getClassName('HorizontalScrollArrow', platform), "HorizontalScrollArrow--".concat(direction)),
    onClick: onClick
  }, createScopedElement("span", {
    vkuiClass: "HorizontalScrollArrow__icon"
  }, createScopedElement(Icon24Chevron, null)));
};

export default HorizontalScrollArrow;
//# sourceMappingURL=HorizontalScrollArrow.js.map