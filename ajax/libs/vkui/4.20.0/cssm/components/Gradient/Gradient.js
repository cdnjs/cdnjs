import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children", "to"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import "./Gradient.css";

var Gradient = function Gradient(_ref) {
  var mode = _ref.mode,
      children = _ref.children,
      to = _ref.to,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement("div", _extends({
    role: "presentation"
  }, restProps, {
    vkuiClass: classNames('Gradient', "Gradient--md-".concat(mode), "Gradient--to-".concat(to))
  }), children);
};

Gradient.defaultProps = {
  mode: 'tint',
  to: 'top'
};
export default Gradient;
//# sourceMappingURL=Gradient.js.map