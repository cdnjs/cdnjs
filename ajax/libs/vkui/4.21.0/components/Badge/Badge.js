import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
export var Badge = function Badge(_ref) {
  var mode = _ref.mode,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement("span", _extends({
    vkuiClass: classNames(getClassName('Badge', platform), "Badge--".concat(mode))
  }, restProps));
};
Badge.defaultProps = {
  mode: 'new'
};
//# sourceMappingURL=Badge.js.map