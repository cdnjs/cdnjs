import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children", "to"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
export var Gradient = function Gradient(_ref) {
  var _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "tint" : _ref$mode,
      children = _ref.children,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? "top" : _ref$to,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement("div", _extends({
    role: "presentation"
  }, restProps, {
    vkuiClass: classNames("Gradient", "Gradient--md-".concat(mode), "Gradient--to-".concat(to))
  }), children);
};
//# sourceMappingURL=Gradient.js.map