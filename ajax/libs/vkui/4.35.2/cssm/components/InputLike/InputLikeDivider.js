import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import "./InputLikeDivider.css";
export var InputLikeDivider = function InputLikeDivider(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement("span", _extends({
    vkuiClass: "InputLikeDivider"
  }, props), children);
};
//# sourceMappingURL=InputLikeDivider.js.map