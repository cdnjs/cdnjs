import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import "./RadioGroup.css";
/**
 * @see https://vkcom.github.io/VKUI/#/RadioGroup
 */
export var RadioGroup = function RadioGroup(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "vertical" : _ref$mode,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return createScopedElement("div", _extends({
    vkuiClass: classNames("RadioGroup", "RadioGroup--".concat(mode))
  }, restProps), children);
};
//# sourceMappingURL=RadioGroup.js.map