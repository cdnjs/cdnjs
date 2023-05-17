import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import "./Div.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Div
 */
export var Div = function Div(_ref) {
  var children = _ref.children,
    getRootRef = _ref.getRootRef,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return createScopedElement("div", _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: "Div"
  }), children);
};
//# sourceMappingURL=Div.js.map