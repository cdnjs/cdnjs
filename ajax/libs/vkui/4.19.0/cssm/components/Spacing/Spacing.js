import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "separator", "style"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import "./Spacing.css";
export var Spacing = function Spacing(_ref) {
  var size = _ref.size,
      separator = _ref.separator,
      style = _ref.style,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platfrom = usePlatform();

  var styles = _objectSpread({
    height: size
  }, style);

  return createScopedElement("div", _extends({}, restProps, {
    "aria-hidden": "true",
    vkuiClass: classNames(getClassName('Spacing', platfrom), {
      'Spacing--separator': !!separator,
      'Spacing--separator-center': separator === true || separator === 'center',
      'Spacing--separator-top': separator === 'top',
      'Spacing--separator-bottom': separator === 'bottom'
    }),
    style: styles
  }));
};
Spacing.defaultProps = {
  size: 8
};
//# sourceMappingURL=Spacing.js.map