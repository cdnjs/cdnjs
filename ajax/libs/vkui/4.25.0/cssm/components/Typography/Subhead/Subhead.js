import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "weight", "Component"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { usePlatform } from "../../../hooks/usePlatform";
import { classNames } from "../../../lib/classNames";
import { getClassName } from "../../../helpers/getClassName";
import "./Subhead.css";

var Subhead = function Subhead(_ref) {
  var children = _ref.children,
      _ref$weight = _ref.weight,
      weight = _ref$weight === void 0 ? "regular" : _ref$weight,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "h4" : _ref$Component,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(Component, _extends({}, restProps, {
    vkuiClass: classNames(getClassName("Subhead", platform), "Subhead--w-".concat(weight))
  }), children);
}; // eslint-disable-next-line import/no-default-export


export default Subhead;
//# sourceMappingURL=Subhead.js.map