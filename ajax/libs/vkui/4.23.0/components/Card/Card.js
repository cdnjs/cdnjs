import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";

var Card = function Card(_ref) {
  var mode = _ref.mode,
      children = _ref.children,
      getRootRef = _ref.getRootRef,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement("div", _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames(getClassName('Card', platform), "Card--md-".concat(mode))
  }), createScopedElement("div", {
    vkuiClass: "Card__in"
  }, children));
};

Card.defaultProps = {
  mode: 'tint'
};
export default Card;
//# sourceMappingURL=Card.js.map