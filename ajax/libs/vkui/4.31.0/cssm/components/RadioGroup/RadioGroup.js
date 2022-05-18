import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { classNames } from "../../lib/classNames";
import "./RadioGroup.css";
export var RadioGroup = function RadioGroup(_ref) {
  var _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "vertical" : _ref$mode,
      children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement("div", _extends({
    vkuiClass: classNames(getClassName("RadioGroup", platform), "RadioGroup--".concat(mode))
  }, restProps), children);
};
//# sourceMappingURL=RadioGroup.js.map